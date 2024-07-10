# Conflux DevKit
## Overview
Conflux DevKit provides an easy-to-setup development environment for the Conflux blockchain spaces (Core Space and ESpace EVM). It leverages Docker to create a devcontainer with all necessary tools, dependencies, and configurations pre-installed, ensuring a seamless and consistent development experience. This repository provides a minimal setup and serves as a foundation for creating more task-specific repositories, such as a Hardhat repository or a frontend template repository.
## Features
- Pre-configured development environment for Conflux Core, ESpace, and PoS.
- Simplified setup with all dependencies installed and utilities.
- Consistent and isolated development environment.
- Integrated OpenVSCode server for a web-based development experience.
- Compatibility with GitHub Codespaces and VS Code's devcontainer feature.
## What is available in this dev environment
Using the following [Dockerfile](.devcontainer/conflux/Dockerfile) and [develop.toml.template](.devcontainer/conflux/templates/develop.toml.template), the Docker instance will create an [independent chain](https://doc.confluxnetwork.org/docs/general/run-a-node/advanced-topics/running-independent-chain).
The `independent chain` will be reachable with the following RPC that can be added to [Fluent](https://fluentwallet.com/) or [Metamask](https://metamask.io/) wallet:

- Core:  http://localhost:12537 (or Codespace host instead of localhost)
- Espace: http://localhost:8545 (or Codespace host instead of localhost)

During the image build process the official [conflux-rust](https://hub.docker.com/r/confluxchain/conflux-rust/tags) image will be used to install the precompiled binary, and all relevant configuration and data directories will be located in the `/opt/conflux/` folder and accessible to a Non-Root user.

Five genesis account private keys will be created in the same folder using the following script: [genesis_secrets.js](.devcontainer/conflux/utils/genesis_secrets.js).

The genesis account will be funded with 10000 CFX and the details can be found in `/opt/conflux/genesis_secrets.txt` or you can use the `genesis_list` command. You can import these accounts into your wallet, or you can add your development private key to this file before starting the Conflux node.

If you are using the devcontainer setup, to start the `independent chain`, open the terminal in the VS Code interface (this is the same for the locally installed VS Code or the web-based one in Codespaces or OpenVSCode-Server) and use this command:

```sh
dev_node
```
`dev_node` is a shell script located in `/usr/bin/dev_node` with the following content:
```sh
#/bin/bash
ulimit -n 10000
export RUST_BACKTRACE=1
conflux --config /opt/conflux/develop.toml
```
Once the `independent chain` is running, you can open another terminal and transfer funds from the genesis Core addresses to their ESpace addresses with the following command:
```sh
genesis_espace
```
This command executes the [genesis_espace](.devcontainer/conflux/utils/genesis_espace.js) script that reads the genesis private keys and uses them to call the [crossSpaceCall](https://doc.confluxnetwork.org/docs/core/core-space-basics/internal-contracts/crossSpaceCall) internal contract.
Or you can send CFX to a Core or Espace address with the [faucet](.devcontainer/conflux/utils/faucet.js) script that will use the miner account to fund the faucet. You can check the faucet availability by invoking the script with the following command in the terminal:
```
faucet
```
If the amount available is 0, you need to wait a few seconds for the mining rewards to reach the account. Once there are enough funds to send, you can invoke the script in the following way:
`faucet` `<amount>` `<address>`
For example, for Core:
```
faucet 100 net2029:aarphdvpx0b2xyfg56rn0b6m237cjmbkkjre6fcdby
```
For ESpace:
```
faucet 100 0xAAC38E2c9D8389D0a6df1abB078aC67a2428294a
```
The script will recognize the type of address and do a simple transfer or call the internal contract for cross space call.
## Getting Started
### Prerequisites
- Docker installed on your machine (if used locally).
### Run as independent docker image
If you don't need the devcontainer functionality, but you want to use the devkit setup, you can quickly run a development node with the following command:
```bash
docker run -it -p 12537:12537 -p 8535:8535 --rm --name devkit spcfxda/conflux-devkit
```
This command will run the devkit container and expose the necessary ports.
Once the devkit container is running, you can execute the utility scripts described above with exec:
```bash
docker exec -it devkit genesis_list
docker exec -it devkit faucet 100 0xf1428162e14ec7a29b50210fbaefdb45050ee4dd
docker exec -it devkit genesis_espace
```
### Run in GitHub Codespaces
You can open this repository in Codespaces using the Codespaces tab under the `CODE` button:

![alt text](README/codespace_tab.png)

After the build and download of the layers are completed, the environment will be ready to use.
### Run in VS Code devcontainer
After opening the repository folder with VS Code, a popup will appear in the bottom right corner:

![alt text](README/vscode.png)

Click on the `Reopen in Container` button. After the build and download of the layers are completed, your VS Code instance will be inside the devcontainer. You can confirm this from the status in the bottom left corner that should look like this:

![alt text](README/vscode_devcontainer.png)
### Run the Docker Container with OpenVSCode Server
TO quickly execute the devkit-server you can use the following command:
```bash
docker run -it -p 12537:12537 -p 8535:8535 -v "$(pwd):/workspaces:cached" --rm --name devkit-server spcfxda/conflux-devkit-server
```

Explanation of -v "$(pwd):/workspaces:cached":
The -v "$(pwd):/workspaces:cached" option in the Docker run command mounts the current working directory (retrieved by $(pwd)) to the /workspaces directory inside the Docker container. This allows you to share files between your local environment and the container. The :cached option improves performance by caching the contents of the mounted directory, reducing the number of times Docker needs to check for changes.

consider that $(pwd) is a linux command, in windows you will have to substitute it with the full path of the directory you want to map.

If you need to customize the Dockerfile or some of its configuration you can follow these steps:
1. Clone the repository:
```sh
git clone https://github.com/your-repo/conflux-devkit.git
cd conflux-devkit
```
2. After you saved the changes you needed, to start the container with the Conflux node and OpenVSCode server, use the `start_server.sh` script located in the root of the repository:
```sh
/start_server.sh
```
The content of the script will build and run the Docker instance. This is the content of the shell script for reference:
```sh
#/bin/bash
docker build .devcontainer/conflux --tag "conflux-devkit-server"
docker run -it -p 5000:5000 -p 12537:12537 -p 8545:8545 -v "$(pwd):/workspaces:cached" -d conflux-devkit-server --name conflux-devkit-server
```
### Access the OpenVSCode Server
Open your browser and navigate to `http://localhost:5000` to access the OpenVSCode server.
## Configuration
### Environment Variables
- `CONFLUX_NODE_ROOT`: Specifies the location of the node files. The default value is `/opt/conflux`
- `CONFIG_PATH`: Specifies the location of the TOML for the node main configuration file.
- `USERNAME`: The preconfigured user is `node` with UID:GUI 1000:1000 from the `node:20-slim`, 
- `USER_UID`: If a new user needs to be created, `USERNAME`, `USER_UID`, `USER_GID`
- `USER_GID`: needs to be changed accordingly
- `SERVER_VERSION`: Specifies the version of OpenVSCode server to use (default is `1.90.0`).
- `OPENVSCODE_SERVER_ROOT`: Specifies the location where openvscode release will be installed, (default is `/opt/openvscode-server`)
### Ports
- `3000`: Default port for Node application.
- `12535`: Core WebSocket RPC.
- `12537`: Core HTTP RPC (Endpoint port for Fluent wallet).
- `8545`: ESpace HTTP RPC (Endpoint port for Fluent/MetaMask wallet).
- `8546`: ESpace WebSocket RPC.
- `5000`: Port for OpenVSCode server.
## Advanced Usage
### Custom User
To enable the creation of a custom user, uncomment the following lines in the [devcontainer.json](.devcontainer/devcontainer.json):
```json
			// "USERNAME": "conflux",
			// "USER_UID": "1001"
			// "USER_GID": "1001"
```
Ensure you set the correct `USERNAME`, `USER_UID`, and `USER_GID` values for your system. The default user is `node`, with `1000:1000` as the UID:GID, which already exists in the base `node:20-slim` image. On Linux systems, the first user typically starts with the `1000:1000` UID:GID. If you have multiple users on your system, you may need to change the Docker user to avoid read/write permission issues between the local filesystem and the Docker image.
### Passwordless Sudo
Passwordless sudo is configured for the user specified by `USERNAME`. This allows the user to execute commands with root privileges without entering a password.
## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any changes.
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Conflux](https://confluxnetwork.org/)
- [Conflux-Rust](https://github.com/Conflux-Chain/conflux-rust/releases)
- [Conflux-Docker](https://github.com/Conflux-Chain/conflux-docker/tree/master)
- [Fluent](https://fluentwallet.com/)
- [OpenVSCode Server](https://github.com/gitpod-io/openvscode-server)

For more information, visit the [official documentation](https://doc.confluxnetwork.org/).
