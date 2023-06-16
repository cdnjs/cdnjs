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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenlyProvider = exports.SECRET_TYPES = exports.SecretType = void 0;
const connect_1 = require("@venly/connect");
const venlyController_1 = require("./venlyController");
const types_1 = require("./types");
const json_rpc_engine_1 = require("json-rpc-engine");
const eth_json_rpc_provider_1 = require("@metamask/eth-json-rpc-provider");
const createVenlyMiddleware_1 = __importDefault(require("./middleware/createVenlyMiddleware"));
// import createLoggerMiddleware from './createLoggerMiddleware';
// import createOriginMiddleware from './createOriginMiddleware';
const createJsonRpcClient_1 = __importDefault(require("./createJsonRpcClient"));
const createFilterMiddleware = require('eth-json-rpc-filters');
const createSubscriptionManager = require('eth-json-rpc-filters/subscriptionManager');
var connect_2 = require("@venly/connect");
Object.defineProperty(exports, "SecretType", { enumerable: true, get: function () { return connect_2.SecretType; } });
var types_2 = require("./types");
Object.defineProperty(exports, "SECRET_TYPES", { enumerable: true, get: function () { return types_2.SECRET_TYPES; } });
class VenlyProvider {
    constructor() {
        this.venlyController = new venlyController_1.VenlyController();
    }
    connect() {
        var _a;
        return (_a = this.venlyController) === null || _a === void 0 ? void 0 : _a.venlyConnect;
    }
    changeSecretType(secretType = connect_1.SecretType.ETHEREUM, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._provider)
                throw new Error('Please initialise provider first (Venly.createProviderEngine)');
            this.venlyController.lastWalletsFetch = undefined;
            const options = Object.assign(Object.assign(Object.assign({}, this.venlyController.options), { secretType: secretType }), chainId && { environment: types_1.SECRET_TYPES[Number(chainId)].env });
            this._provider.emit('chainChanged', chainId);
            this._provider = yield this.createProviderEngine(options);
            return this._provider;
        });
    }
    checkAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._provider)
                throw new Error('Please initialise provider first (Venly.createProviderEngine)');
            return this.venlyController.venlyConnect.checkAuthenticated();
        });
    }
    authenticate(authenticationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._provider)
                throw new Error('Please initialise provider first (Venly.createProviderEngine)');
            return this.venlyController.startGetAccountFlow(authenticationOptions);
        });
    }
    createProviderEngine(options) {
        options.environment = options.environment || 'production';
        options.windowMode = options.windowMode || connect_1.WindowMode.POPUP;
        options.secretType = options.secretType || connect_1.SecretType.ETHEREUM;
        this.venlyController.initialize(options);
        const engine = new json_rpc_engine_1.JsonRpcEngine();
        const venlyMiddleware = (0, createVenlyMiddleware_1.default)({
            getAccounts: this.venlyController.getAccounts.bind(this.venlyController),
            processTransaction: this.venlyController.processTransaction.bind(this.venlyController),
            processSignTransaction: this.venlyController.processSignTransaction.bind(this.venlyController),
            processEthSignMessage: this.venlyController.processEthSignMessage.bind(this.venlyController),
            processTypedMessage: this.venlyController.processTypedMessage.bind(this.venlyController),
            processTypedMessageV3: this.venlyController.processTypedMessage.bind(this.venlyController),
            processTypedMessageV4: this.venlyController.processTypedMessage.bind(this.venlyController),
            processPersonalMessage: this.venlyController.processPersonalMessage.bind(this.venlyController),
            getTransactionByHash: this.venlyController.getTransactionByHash.bind(this.venlyController),
            getPendingTransactions: this.venlyController.getPendingTransactions.bind(this.venlyController),
            changeSecretType: this.changeSecretType.bind(this)
        });
        engine.push(venlyMiddleware);
        const rpcUrl = this.getRpcUrl(options);
        const chainId = types_1.CHAIN_IDS[options.secretType][options.environment];
        const { networkMiddleware, blockTracker } = (0, createJsonRpcClient_1.default)({ rpcUrl, chainId });
        const networkProvider = (0, eth_json_rpc_provider_1.providerFromMiddleware)(networkMiddleware);
        const filterMiddleware = createFilterMiddleware({
            provider: networkProvider,
            blockTracker,
        });
        const subscriptionManager = createSubscriptionManager({
            provider: networkProvider,
            blockTracker,
        });
        subscriptionManager.events.on('notification', (message) => engine.emit('notification', message));
        engine.push(filterMiddleware);
        engine.push(subscriptionManager.middleware);
        engine.push(networkMiddleware);
        const provider = (0, eth_json_rpc_provider_1.providerFromEngine)(engine);
        provider.request = function (req) {
            return new Promise((resolve, reject) => {
                provider.send(req, (err, res) => {
                    if (err)
                        reject(res.error);
                    else
                        resolve(res.result);
                });
            });
        };
        this._provider = provider;
        this._provider.emit('connect', { chainId });
        this._blockTracker = blockTracker;
        return Promise.resolve(this._provider);
    }
    getRpcUrl(options) {
        const secretType = options.secretType.toLowerCase();
        let environment = options.environment.replace('-local', '');
        return environment.startsWith('prod') ? `https://${secretType}-node.arkane.network` : `https://${secretType}-node-${environment}.arkane.network`;
    }
}
exports.VenlyProvider = VenlyProvider;
globalThis.Venly = new VenlyProvider();
