import path from "path";

import { NodeConfig } from "./types";

const CONFLUX_NODE_ROOT = process.env.CONFLUX_NODE_ROOT || "";
const SECRETS_PATH = process.env.SECRETS_PATH || "";

const EVM_CHAIN_ID = process.env.EVM_CHAIN_ID;
const CHAIN_ID = process.env.CHAIN_ID;

export const develop: NodeConfig = {
  //bootnodes is a list of nodes that a conflux node trusts, and will be used to sync the blockchain when a node starts.
  //The value is a string divided by comma without space, and every entry is a node
  //A node is identified by cfxnode://NODEID@PUBLICIP:PORT
  //By default, no bootnodes are provided. What"s provided here is a list of nodes that Conflux Team maintains across the world.

  //bootnodes: "cfxnode://25265e1aa470d9d8667947820c4830a64e9f9678d6cb23ecde91e0447527f4926257b9637923a305ce91e15c929ed28164e6c32b76213764eb4a9624120ae1d7@39.97.180.246:32323,cfxnode://2b72adc3f52a80945db10fa35c3f6d02c73f65ff98b4a9eae4f7b244e8a51f01690e7dcef7a30bfb67fb07fcb2949e67c27487169623d40f6a9e55a8d04ca34f@39.107.143.220:32323,cfxnode://5da942ac58e392e9f68784876a1800ffe5756f8498aa1a7a9a869fe9370c2e838a114dfce33fff9674633700a0094aed8b46722fb6b03619842602a2473223de@39.97.170.199:32323,cfxnode://28d3cdf07b7deb41bb52dee0a952fc599f46f6b89cc513ecfd1020d5a66e73e7cfe68543e64962aefbcae7123a6c390a43144f5900f0bc181c3c89ffdf9ff81b@39.97.225.254:32323,cfxnode://49ff58db6b4c5f92c2145e69ea0625134cbe35885f0e5979191ba9c67e4c9374234ed7fbeb65f82d4d197568110a4f100f078bfbac896f391b362bec77be19ea@39.103.68.228:32323,cfxnode://97497107e94ac463f6bad526d74e0058d46154e97cbf758edaf3d360e2f3347ae5946ca337eb0d201df8f625e7ae5bfc32e8394d2ce37bd2dc35fa5a4bcecd01@8.131.69.64:32323,cfxnode://c22ad0736f5cc2cc3b11ce5f43345213c2e44994dfaa5e3b0cebe8bd9c78cc52e1a22949ff5953aea80476f648e42b502172e04629c172f4400a0af4caf97efb@8.131.68.192:32323,cfxnode://04cee414977f68a0c2f0215199dde4ec1c27350e447ea855ce000054336f4ccb1c43f0c5ebe8172ad51c7d7b88ac98c037a85ae949e79734449ac38a23fd1d60@106.14.64.36:32323,cfxnode://f1750b818c5828fc5f22667f4b45d4a39b17a1cf40f71ae8f74b6195485a93bf16892a3785bda36132ebae64b83b91b216eaccb7a02185a01f37c7ad89c513ad@101.132.133.254:32323,cfxnode://72a21ec3d2d7c5545b4a46656eaca6ab4ec3ac85628f665bd205e7c52273d345d1583efface277b967fca963a81fbf8b7a81ae97f0a46234cd5fb34853c95fd2@47.101.39.91:32323,cfxnode://b7aeba1f1b2b3e5dfdc7ac93df4281a440ccbdc89894444e094f15242ffa1578d90f9fd447b899be89a57542616e26a82180bd2bfb3b81f82a4dffdfe180f44e@8.210.110.149:32323,cfxnode://07faaf8be8bff4243b496363fb02bd0a21be97e291febcd9aabb29996de90d0a10065f3383beff09f05cb0bdfaa9655d90550c8abcbf97be0658ce6efd8f9b64@47.254.67.249:32323,cfxnode://b77e95cb41cae81dd82a29a07b776549ff37d93954b46214aa32036280c412cefee57350f3e1a4e9db21785ee5a4370961a55a856f7fcb664e511f2fb17f7881@35.171.101.208:32323,cfxnode://0f69308d246238e5a5a91769ab1757962e787bbdbf2c478a60cb6aed1cee8c57045d0402cdea5ee0227a884e92d72ede7742c6a3ac6f2eeb283e68ceb9503a7f@52.52.5.142:32323,cfxnode://cac5aed8c474dab7815d53a8c16434893d750455341252590e09353608106a6bc47c5e78409a47f740ca2c88be83140a660d20ceb665e8e6dd8d5ce57851a891@54.94.4.66:32323,cfxnode://e5189aed19303ee171be0a8cc206324fd7a5fe4a2a52a02aba5d869a01ba6a7865e6aeeab32db97b9bbd216e7b7ebc72bb1aed53df659cf13142a65c13cd3dd9@15.184.179.185:32323,cfxnode://70dba74973f9deac76fb6e3987c07f434d8d162cb3f5ae9db4aa717caf02c6f5c5fefac4e21b01635a697127ef9333465eeb5e2f3a539ffbcba786875c075433@18.132.169.41:32323,cfxnode://be27a2f6f4b06919ecc76fa1263b5beb067a1011746371747786ec1c75e1186254f26d7209ac3b7185109db208fcb098032f1d616cb93227bec750226f246f45@13.51.0.234:32323,cfxnode://838ee636dd6ebd18cbc50eb1448dc41b54fb9e7c2de679f2b119ef52df60fa23797d9cba41111c1431693b29aba9a3351c8ae29d3691ddb8261d677d7e1b7cd8@18.158.251.2:32323,cfxnode://b69865a15548528c3734f581294a022dc8f3c8a14e2d1fe82f5cbce63906316c5af321990c984c9ebe2c990b77d7991d389645d278e31e86c64a32b1f41f3a9a@18.136.130.20:32323,cfxnode://e7f13b08d8bd80cf62dff22bd57d423bade2aa8a87c7c5ad7332ccd57d7c642956a3dae898a9d56c3542200de1b696689f1105132196916cd5c82cf3e5a5c2a0@3.114.73.12:32323,cfxnode://c65a039e657bfe5ec6005feca4450a705f43cd36656ae45033d68425edc8c002983a9ec941e6eb2529580888fa7348934ccc9a5396c2fe3d0d5036ed4e806efd@3.37.149.79:32323,cfxnode://6d6d9c474f792bcb7fa68ec04e81831e9cb18407a3b3b37b9140e32f94403b820193920a281c97875717c01c3827429ee3eefef30dc0c65b1436228d065e8179@18.163.95.162:32323"

  //Set the node type to Full node, Archive node, or Light node.
  //Possible values are "full", "archive", or "light".
  //The command line parameter `--full`, `--archive`, or `--light` will overwrite this parameter.
  //
  //node_type: ""

  //Some preset develepment configurations.
  //It should not be set in production environment.
  //
  //For both `test` and `dev` modes, we will
  //    * Set initial difficulty to 4
  //
  //`test` mode is for Conflux testing and debugging, we will
  //    * Add latency to peer connections
  //    * Skip handshake encryption check
  //    * Skip header timestamp verification
  //    * Handle NewBlockHash even in catch-up mode
  //    * Allow data propagation test
  //    * Allow setting genesis accounts and generate tx from secrets
  //
  //`dev` mode is for users to run a single node that automatically
  //    generates blocks with fixed intervals
  //    * You are expected to also set `jsonrpc_ws_port`, `jsonrpc_tcp_port`,
  //      and `jsonrpc_http_port` if you want RPC functionalities.
  //    * generate blocks without PoW (either after receiving a transaction or
  //      in fixed period, see ``dev_block_interval_ms"")
  //    * Skip catch-up mode even there is no peer
  //
  //mode: ""

  //If you want to setup a single node running Conflux for development. You should
  //COMMENT the bootnodes setting and you should use the following parameters:
  //
  mode: "dev",

  //``dev_block_interval_ms"" controls the mining rate in the dev mode.
  //
  //If it"s not set, blocks will only be generated after receiving a transaction.
  //Otherwise, blocks are automatically generated every ``dev_block_interval_ms"" ms.
  //
  dev_block_interval_ms: 250,
  genesis_secrets: SECRETS_PATH!,

  //----------------- Pos Configuration -----------------

  //PoS config file path
  pos_config_path: path.join(
    CONFLUX_NODE_ROOT,
    "pos_config",
    "pos_config.yaml",
  ),
  //PoS initial nodes file path
  pos_initial_nodes_path: path.join(
    CONFLUX_NODE_ROOT,
    "pos_config",
    "initial_nodes.json",
  ),
  //PoS account private key file path
  pos_private_key_path: path.join(CONFLUX_NODE_ROOT, "pos_config", "pos_key"),
  //PoS account private key encryption password
  dev_pos_private_key_encryption_password: "CFXV20",

  //----------------- Mining Configuration -----------------

  //`mining_author` is the address to receive mining rewards.
  //If set, `mining_type` will be "stratum" by default.
  //The value is a 40-digit hex string or a valid CIP-37 base32 address.
  //By default, the value is not set.
  //
  mining_author: "",

  //`mining_type` controls whether the mining process goes through the
  //stratum protocol, uses CPU-mining, or disable mining.
  //Possible values are "stratum", "cpu", and "disable".
  //The default value is "stratum" if `mining_author` is set.
  //If the value is set and not "disable", `mining_author` must be set.
  //
  //mining_type: "stratum"

  //Listen address for stratum
  //
  //stratum_listen_address: "127.0.0.1"

  //Port for stratum.
  //
  //stratum_port: 32525

  //Window size for PoW manager
  //
  //pow_problem_window_size: 1

  //Secret key for stratum.
  //The value is 64-digit hex string.
  //If not set, the RPC subscription will not check the authorization.
  //
  //stratum_secret: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

  //-------------- Log-related Configuration -------------

  //`log_conf` the path of the log4rs configuration file. The configuration in the file will overwrite the value set by `log_level`.
  //By default, the value is not set.
  //
  log_conf: path.join(CONFLUX_NODE_ROOT, "log.yaml"),

  //`log_file` is the path of the log file"
  //If not set, the log will only be printed to stdout, and not persisted to files.
  //By default, the value is not set.
  //
  //log_file: "conflux.log"

  //`log_level` is the printed log level.
  //The value should be one of "error", "warn", "info", "debug", "trace", "off"
  //
  //log_level: "info"

  //-------------- Network Configuration -------------

  //`public_address` is the address of this node used for other nodes to connect to.
  //If not set, the process will try to find out the public IP with best effort, and use `tcp_port` as public port.
  //However, it"s HIGHLY RECOMMENDED to set the value manually, especially for machines with IP translated by NAT.
  //
  //public_address: "1.1.1.1"

  //`tcp_port` is the TCP port that the process listens for P2P messages. The default is 32323.
  //
  //tcp_port:  32323

  //`public_tcp_port` is the public TCP port that other nodes should connect to. It might be different from
  //the tcp_port in case the machine is behind a NAT. The default is as same as `tcp_port`.
  //
  //public_tcp_port:  32323

  //`udp_port` is the UDP port used for node discovery.
  //If not set, it will be the same as `port`.
  //
  //udp_port:  32323

  //`jsonrpc_http_threads` is used to control how many threads to process HTTP rpc requests.
  //
  //jsonrpc_http_threads:  1

  //`jsonrpc_http_keep_alive` is used to control whether to set KeepAlive for rpc HTTP connections.
  //
  //jsonrpc_http_keep_alive:  false

  //`jsonrpc_cors` is used to control the rpc domain validation policies.
  //The value should be "none", "all", or a list string split by commas without space.
  //If not set, domain validation is disabled.
  //By default, the values are not set.
  //
  //jsonrpc_cors: "all"

  //The following parameters are the ports for the node to provide rpc service. If not set,
  //the node will not start rpc services. By default, the `jsonrpc_local_http_port` is set,
  //so as to support the Conflux CLI subcommands. What"s provided here is the recommended
  //value if you want to start rpc services for other front-end applications.
  //Note that to serve transaction-related RPCs, `persist_tx_index` should also be set to `true` or
  //the node will only be able to handle very recent transactions.
  //
  jsonrpc_ws_port: 12535,
  //jsonrpc_tcp_port:  12536
  jsonrpc_http_port: 12537,
  //jsonrpc_local_tcp_port:  12538
  jsonrpc_local_http_port: 12539,
  //jsonrpc_local_ws_port:  12540
  jsonrpc_http_eth_port: 8545,
  jsonrpc_ws_eth_port: 8546,

  //Specify the APIs available through the public JSON-RPC interfaces (HTTP, TCP, WebSocket)
  //using a comma-delimited list of API names.
  //Possible names are: all, safe, cfx, pos, debug, pubsub, test, trace, txpool.
  //`safe` only includes `cfx` and `pubsub`, `txpool`.
  //
  public_rpc_apis: "all",
  public_evm_rpc_apis: "evm,ethdebug",
  //Specify the filter life time in seconds, only this option is set, the filter related RPC methods will be available.
  poll_lifetime_in_seconds: 60,

  //--------------- Performance-related Network Parameters ----------------------

  //Timeout for block-related requests (GetBlock, GetCmpctBlock, GetBlockTxn)
  //
  //blocks_request_timeout_ms: 20_000

  //Time interval to check timeout requests periodically.
  //
  //check_request_period_ms:  5000

  //Chunk size for snapshot retrieval
  //
  //chunk_size_byte: 4194304

  //Control whether to demote peers to unstrusted
  //
  //demote_peer_for_timeout: false

  //Maximum network queue size. When reached, the queue will refuse any new data.
  //The unit is MB.
  //
  //egress_queue_capacity: 256

  //Minimum queue size for throttling in manner of ratio.
  //The unit is MB.
  //
  //egress_min_throttle: 10

  //Maximum queue size for throttling in manner of ratio.
  //The unit is MB.
  //
  //egress_max_throttle: 10

  //Time interval to to garbage-collect not block-graph-ready blocks periodically.
  //
  //expire_block_gc_period_s: 900

  //Timeout for header-related requests (GetBlockHeaders)
  //
  //headers_request_timeout_ms:  10_000

  //Time interval to broadcast Status as heartbeat periodically
  //
  //heartbeat_period_interval_ms: 30_000

  //Time to maintain transaction digests inflight status.
  //
  //inflight_pending_tx_index_maintain_timeout_ms: 30_000

  //Maximum number of timeout allowed in `timeout_observing_period_s`.
  //If the max is reached, the peer will be disconnected.
  //`demote_peer_for_timeout` controls if the peer will be demoted in this case.
  //
  //max_allowed_timeout_in_observing_period: 10

  //Maximum number of peers to download state chunks from.
  //
  //max_download_state_peers: 8

  //Maximum number of handshaking sessions at the same time.
  //
  //max_handshakes: 64

  //Maximum number of incoming connections.
  //
  //max_incoming_peers: 64

  //Maximum number of outgoing connections.
  //
  //max_outgoing_peers: 16

  //Maximum number of outgoing connections to archive nodes. 0 represents
  //not required to connect to archive nodes. E.g. light node or full node
  //need not to connect to archive nodes.
  //
  //max_outgoing_peers_archive: 0

  //Maximum number of inflight requests for each peer.
  //If the max is reached, requests will be buffered until inflight requests are responded or timeout.
  //
  //max_inflight_request_count: 64

  //Maximum number of peers to broadcast transaction digests.
  //
  //max_peers_tx_propagation: 128

  //Maximum cached received block size waiting to be processed.
  //
  //max_unprocessed_block_size_mb: 128

  //Minimum number of peers to broadcast transaction digests.
  //
  //min_peers_tx_propagation: 8

  //Minimum number of normal-phase peers to estimate the current global latest epoch for phase change.
  //
  //min_phase_change_normal_peer_count: 3

  //The time to maintain received transactions to avoid duplicated requests.
  //
  //received_tx_index_maintain_timeout_ms: 300_000

  //Whether to request blocks with public key during catch-up to avoid recovering
  //the public keys for transactions.
  //
  //request_block_with_public: false

  //Time interval to broadcast transaction digests periodically.
  //
  //send_tx_period_ms: 1300

  //Timeout for requesting snapshot candidate.
  //
  //snapshot_candidate_request_timeout_ms: 10_000

  //Timeout for requesting snapshot chunks.
  //
  //snapshot_chunk_request_timeout_ms: 30_000

  //Timeout for requesting snapshot manifests.
  //
  //snapshot_manifest_request_timeout_ms: 30_000

  //`throttling_conf` is configuration file in TOML format to throttle RPCs, P2P messages.
  //Throttling is enabled only when the parameter specified.
  //
  //throttling_conf: "throttling.toml"

  //The time period to observe if a peers has too many timeouts.
  //
  //timeout_observing_period_s: 600

  //Timeout for transaction requests.
  //
  //transaction_request_timeout_ms: 30_000

  //Time to maintain information of sent-out transactions for answering requests.
  //
  //tx_maintained_for_peer_timeout_ms: 600_000

  //--------------- Peer Management Parameters -------------

  //Timeout duration for refreshing discovery protocol when there are NOT enough outgoing connections.
  //
  //discovery_fast_refresh_timeout_ms: 10_000

  //Timeout duration for initiating peer connection management.
  //
  //discovery_housekeeping_timeout_ms: 1_000

  //Period between consecutive rounds of the same current discovery process.
  //
  //discovery_round_timeout_ms: 500

  //`enable_discovery` is used to control whether the node will ask its neighbors for new peers
  //and whether it will respond to other nodes" discovery requests.
  //
  //enable_discovery:  true

  //`netconf_dir` is the directory to store network related persistent data, including `net_key`,
  //a list of trusted nodes and a list of untrusted nodes.
  //
  //By default, it is stored under the directory configured with `conflux_data_dir` with the directory name `net_config`.
  //If set, the directory path will not be related to `conflux_data_dir` anymore.
  //
  //netconf_dir: `${CONFLUX_NODE_ROOT}/blockchain_data/net_config`

  //`net_key` is the 256-bit private key to generate a unique node id for this node.
  //The value is a 64-digit hex string.
  //If not set, the node will try to read from the file "key" under the directory `netconf_dir`.
  //If the file is not found, the node will generate a random key.
  //By default, the value is not set.
  //If a node is restarted, it"s suggested to keep the key unchanged.
  //
  //net_key: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

  //Timeout duration for persisting node table.
  //
  //node_table_timeout_s: 300

  //Connection lifetime threshold for promotion.
  //
  //node_table_promotion_timeout_s: 259200

  //`session_ip_limits` limits the number of TCP connections per IP address or subnet for security consideration.
  //Its format is "n1,n2,n3,n4", where n1 is the quota of TCP connections for a single IP address, and n2/n3/n4
  //are the quotas for subnet a/b/c. The default value is "1,8,4,2", which means:
  //  1) Only 1 TCP connection allowed for a single IP address.
  //  2) 8 TCP connections allowd for subnet a, e.g. 192.xxx.xxx.xxx/8
  //  3) 4 TCP connections allowd for subnet b, e.g. 192.168.xxx.xxx/16
  //  4) 2 TCP connections allowd for subnet c, e.g. 192.169.0.xxx/24
  //Note, 0 represents unlimited.
  //
  //session_ip_limits: "1,8,4,2"

  //`subnet_quota` limits the number of nodes for a subnet B (e.g. 192.168.xxx.xxx/16) stored in database.
  //Nodes in database are used to establish outgoing TCP connections for P2P communications.
  //Note, 0 represents unlimited.
  //
  //subnet_quota:  32

  //---------------- Block number index parameters -----------------

  //Whether to persist block number indices.
  //This only needs to be enabled if you want to use RPCs that take block numbers as an input.
  //
  persist_block_number_index: true,

  //---------------- Transaction Cache Parameters -----------------

  //Whether to persist transaction indices.
  //This only needs to be enabled if you want to reliably answer transaction-related RPCs.
  //
  persist_tx_index: true,

  //Time to keep transactions in in-memory transaction cache.
  //
  //tx_cache_index_maintain_timeout_ms: 300_000

  //Maximum number of transactions allowed in the transaction pool.
  //
  //tx_pool_size: 50_000

  //Minimum allowed transaction gas price for two spaces in the transaction pool.
  //
  //tx_pool_min_native_tx_gas_price: 1_000_000_000
  //tx_pool_min_eth_tx_gas_price: 20_000_000_000

  //------------------ Storage Parameters ----------------------

  //The number of additional snapshot before the current stable checkpoint that we will maintain.
  //If it"s 0, all snapshot before stable genesis will be deleted and the states are unavailable.
  //
  //additional_maintained_snapshot_count: 0

  //The additional number of epochs to keep different kinds of data before the current era genesis checkpoint.
  //For full/light nodes, the default value is 0, meaning all data before the era checkpoint will be removed.
  //For archive nodes, the default behavior is keeping all these data, while setting these parameters manually
  //will overwrite the default behavior of corresponding data types and garbage collect them accordingly.
  //
  //additional_maintained_block_body_epoch_count: 0
  //additional_maintained_execution_result_epoch_count: 0
  //additional_maintained_reward_epoch_count: 0
  //additional_maintained_trace_epoch_count: 0
  //additional_maintained_transaction_index_epoch_count: 0

  //Time interval to evict old data from in-memory data cache.
  //
  //block_cache_gc_period_ms: 5_000

  //Database type to store block-related data.
  //Supported: rocksdb, sqlite.
  //
  //block_db_type: "rocksdb"

  //The root directory of all data (block data, state data, and node database).
  //
  conflux_data_dir: path.join(CONFLUX_NODE_ROOT, "blockchain_data"),

  //The directory to store block-related data.
  //
  //By default, it is stored under the directory configured with `conflux_data_dir` with the directory name `blockchain_db`.
  //If set, the directory path will not be related to `conflux_data_dir` anymore.
  //
  //block_db_dir: `${CONFLUX_NODE_ROOT}/blockchain_data/blockchain_db`

  //Maximum size of cached ledger data (block, receipts, e.t.c.)
  //The unit is MB.
  //
  //ledger_cache_size: 1024

  //Rocksdb cache size.
  //Only applies if `block_db_type: "rocksdb"`.
  //
  //rocksdb_cache_size: 128

  //Rocksdb compaction file path.
  //Only applies if `block_db_type: "rocksdb"`.
  //If not set, compaction configuration will be set automatically by rocksdb.
  //
  //rocksdb_compaction_profile: `${CONFLUX_NODE_ROOT}/compact_file.conf`

  //State storage parameters.
  //Refer to the documentation for details.
  //
  //storage_delta_mpts_cache_recent_lfu_factor:  4.0
  //storage_delta_mpts_cache_size:  20000000
  //storage_delta_mpts_cache_start_size:  1000000
  //storage_delta_mpts_node_map_vec_size:  80000000
  //storage_delta_mpts_slab_idle_size:  200000

  //Configure the maximal open MPT count. Open MPTs are maintained as an LRU cache, and we will close the database handle
  //for the evicted MPT once its usage finishes. Every MPT contains the data written in 2000 epochs.
  //Accessing a state involves opening both its delta MPT and intermediate MPT,
  //so setting this to 4 allows to access two states at the same time. A full node always needs one latest state to
  //process new epochs, so with the default value we can frequently access one old state (by calling state-related RPCs)
  //efficiently without the overhead of opening/closing databases.
  //
  //Idealy, if the RPC working set involves accessing X state ranges frequently (each range has 2000 epochs),
  //this value should be set to 2+2X to avoid thrashing.
  //However, increasing the value may increase the system memory usage by opening more database instances at the same
  //time, and the memory usage of an MPT is affected by `rocksdb_cache_size`.
  //
  //storage_max_open_mpt_count: 4

  //Configure if we strictly check the tx index before garbage collection.
  //Setting it to `false` will improve the performance. But if the value is `false`, it"s possible that although the
  //epoch where a tx is executed should not be garbage collected, the tx index of this tx is removed because it"s packed
  //in an already garbage collected epoch.
  //
  //strict_tx_index_gc: true

  //The epoch number where we want to download the state and start re-executing transactions.
  //For full nodes, if the value is not set, the parameter will not take effects.
  //For archive node, the default value is 0.
  //
  //sync_state_starting_epoch: 0

  //The number of epochs needed between our best_epoch and our neighbours" best_epoch that we want to
  //start downloading states during catching up.
  //
  //sync_state_epoch_gap: 20

  //------------------ Light Node Parameters ----------------------

  //Header sync parameters.
  //ln_header_request_batch_size: 30
  //ln_header_request_timeout_sec: 2
  //ln_max_headers_in_flight: 1000

  //Epoch sync parameters.
  //ln_epoch_request_batch_size: 100
  //ln_epoch_request_timeout_sec: 2
  //ln_max_parallel_epochs_to_request: 10
  //ln_num_epochs_to_request: 200
  //ln_num_waiting_headers_threshold: 1000

  //-------------------- Trace Parameters -------------------

  //Whether to trace EVM execution and records the result in database.
  //
  executive_trace: true,

  //-------------------- Others -------------------

  //Time (in milliseconds) after which accounts are re-read from disk.
  //
  //account_provider_refresh_time_ms: 1000

  //Whether to allow execution without deferring if the execution thread is idle.
  //
  //enable_optimistic_execution: true

  //Maximum number of blocks whose timestamp is in the near future is maintained in memory.
  //
  //future_block_buffer_capacity: 32768

  //Maximum number of log entries returned from cfx_getLogs and eth_getLogs.
  //If not set, cfx_getLogs and eth_getLogs will not limit the number of logs returned.
  //
  get_logs_filter_max_limit: 5000,

  //Epoch batch size used in log filtering.
  //Larger batch sizes may improve performance but might also prevent consensus from making progress under high RPC load.
  //
  //get_logs_epoch_batch_size: 32

  //The maximal allowed number of epochs between `from_epoch` and `to_epoch` in the filter to call `cfx_getLogs`.
  //If not set, there is no limit on the gap.
  //By default it is not set.
  //
  //get_logs_filter_max_epoch_range: 10000

  //The maximal allowed number of blocks between `from_block` and `to_block` in the filter to call `cfx_getLogs`.
  //If not set, there is no limit on the gap.
  //By default it is not set.
  //
  //get_logs_filter_max_block_number_range: 10000

  //Maximum number of transactions allowed for peers to send to a catch-up node.
  //
  //max_trans_count_received_in_catch_up: 60_000

  //The chain ID of Conflux Network (Conflux space)
  //1 for testnet
  //1029 for Mainnet (Hydra)
  //
  chain_id: Number(CHAIN_ID),

  //The EVM chain ID of Conflux Network (EVM space)
  //1030 for Mainnet (Hydra)
  //
  evm_chain_id: Number(EVM_CHAIN_ID),

  node_table_promotion_timeout_s: 9600,

  //cips enable configuration

  //v2.0 cips: pos + espace
  hydra_transition_number: 5,
  hydra_transition_height: 5,
  cip43_init_end_number: 5,
  pos_reference_enable_height: 5,

  //v2.1
  dao_vote_transition_number: 6,
  dao_vote_transition_height: 6,
  cip78_patch_transition_number: 6,
  cip90_transition_height: 6,
  cip90_transition_number: 6,
  cip105_transition_number: 6,
  sigma_fix_transition_number: 6,

  //v2.3
  cip107_transition_number: 7,
  cip112_transition_height: 7,
  cip118_transition_number: 7,
  cip119_transition_number: 7,

  //v2.4 cips: 1559, 137 and others
  cip1559_transition_height: 10,
  cancun_opcodes_transition_number: 10,
  next_hardfork_transition_number: 10, //cip131, cip132, cip133b, cip137, cip144, cip145
  next_hardfork_transition_height: 10, //cip130, cip133
};
