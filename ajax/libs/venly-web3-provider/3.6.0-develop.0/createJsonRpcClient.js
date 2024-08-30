"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_rpc_engine_1 = require("@metamask/json-rpc-engine");
const eth_json_rpc_middleware_1 = require("@metamask/eth-json-rpc-middleware");
const createFetchMiddleware_1 = require("./createFetchMiddleware");
const eth_json_rpc_provider_1 = require("@metamask/eth-json-rpc-provider");
const eth_block_tracker_1 = require("eth-block-tracker");
const MILLISECOND = 1;
const SECOND = MILLISECOND * 1000;
function createJsonRpcClient({ rpcUrl, chainId, venlyConnect }) {
    const blockTrackerOpts = {};
    const fetchMiddleware = (0, createFetchMiddleware_1.createFetchMiddleware)({ btoa, fetch, rpcUrl, venlyConnect });
    const blockProvider = (0, eth_json_rpc_provider_1.providerFromMiddleware)(fetchMiddleware);
    const blockTracker = new eth_block_tracker_1.PollingBlockTracker(Object.assign(Object.assign({}, blockTrackerOpts), { provider: blockProvider }));
    const networkMiddleware = (0, json_rpc_engine_1.mergeMiddleware)([
        createChainIdMiddleware(chainId),
        (0, eth_json_rpc_middleware_1.createBlockRefRewriteMiddleware)({ blockTracker }),
        (0, eth_json_rpc_middleware_1.createBlockCacheMiddleware)({ blockTracker }),
        (0, eth_json_rpc_middleware_1.createInflightCacheMiddleware)(),
        (0, eth_json_rpc_middleware_1.createBlockTrackerInspectorMiddleware)({ blockTracker }),
        fetchMiddleware,
    ]);
    return { networkMiddleware, blockTracker };
}
exports.default = createJsonRpcClient;
function createChainIdMiddleware(chainId) {
    return (req, res, next, end) => {
        if (req.method === 'eth_chainId') {
            res.result = chainId;
            return end();
        }
        return next();
    };
}
/**
 * For use in tests only.
 * Adds a delay to `eth_estimateGas` calls.
 */
function createEstimateGasDelayTestMiddleware() {
    return (0, json_rpc_engine_1.createAsyncMiddleware)((req, _, next) => __awaiter(this, void 0, void 0, function* () {
        if (req.method === 'eth_estimateGas') {
            yield new Promise((resolve) => setTimeout(resolve, SECOND * 2));
        }
        return next();
    }));
}
