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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _VenlyProvider_instances, _VenlyProvider_getRpcUrl, _VenlyProvider_createEngine;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenlyProvider = exports.SECRET_TYPES = exports.WindowMode = exports.SecretType = void 0;
const connect_1 = require("@venly/connect");
const venlyController_1 = require("./venlyController");
const types_1 = require("./types");
const json_rpc_engine_1 = require("@metamask/json-rpc-engine");
const eth_json_rpc_provider_1 = require("@metamask/eth-json-rpc-provider");
const providerFromEngine_1 = __importDefault(require("./providerFromEngine"));
const createVenlyMiddleware_1 = __importDefault(require("./middleware/createVenlyMiddleware"));
const createJsonRpcClient_1 = __importDefault(require("./createJsonRpcClient"));
const eth_json_rpc_filters_1 = __importDefault(require("eth-json-rpc-filters"));
const subscriptionManager_1 = __importDefault(require("eth-json-rpc-filters/subscriptionManager"));
var connect_2 = require("@venly/connect");
Object.defineProperty(exports, "SecretType", { enumerable: true, get: function () { return connect_2.SecretType; } });
Object.defineProperty(exports, "WindowMode", { enumerable: true, get: function () { return connect_2.WindowMode; } });
var types_2 = require("./types");
Object.defineProperty(exports, "SECRET_TYPES", { enumerable: true, get: function () { return types_2.SECRET_TYPES; } });
class VenlyProvider {
    constructor() {
        _VenlyProvider_instances.add(this);
    }
    get connect() {
        var _a;
        return (_a = this.venlyController) === null || _a === void 0 ? void 0 : _a.venlyConnect;
    }
    changeSecretType(secretType = connect_1.SecretType.ETHEREUM, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._provider)
                throw new Error('Please initialise provider first (Venly.createProvider)');
            const options = Object.assign(Object.assign(Object.assign({}, this.venlyController.options), { secretType: secretType }), chainId && { environment: types_1.SECRET_TYPES[Number(chainId)].env });
            this._provider.engine = __classPrivateFieldGet(this, _VenlyProvider_instances, "m", _VenlyProvider_createEngine).call(this, options);
            this._provider.emit('chainChanged', chainId);
            this._provider.emit('accountsChanged', yield this.venlyController.getAccounts());
            return this._provider;
        });
    }
    checkAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._provider)
                throw new Error('Please initialise provider first (Venly.createProvider)');
            return this.venlyController.checkAuthenticated();
        });
    }
    authenticate(authenticationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._provider)
                throw new Error('Please initialise provider first (Venly.createProvider)');
            return this.venlyController.authenticate(authenticationOptions);
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._provider)
                throw new Error('Please initialise provider first (Venly.createProvider)');
            yield this.venlyController.logout();
            this._provider.emit('disconnect', { message: 'disconnect', code: 1000 });
        });
    }
    createProvider(options) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = options.environment) !== null && _a !== void 0 ? _a : (options.environment = 'production');
            (_b = options.windowMode) !== null && _b !== void 0 ? _b : (options.windowMode = connect_1.WindowMode.POPUP);
            (_c = options.secretType) !== null && _c !== void 0 ? _c : (options.secretType = connect_1.SecretType.ETHEREUM);
            (_d = options.skipAuthentication) !== null && _d !== void 0 ? _d : (options.skipAuthentication = false);
            const engine = __classPrivateFieldGet(this, _VenlyProvider_instances, "m", _VenlyProvider_createEngine).call(this, options);
            const provider = (0, providerFromEngine_1.default)(engine);
            this._provider = provider;
            if (!options.skipAuthentication)
                yield this.venlyController.getAccounts();
            return this._provider;
        });
    }
}
exports.VenlyProvider = VenlyProvider;
_VenlyProvider_instances = new WeakSet(), _VenlyProvider_getRpcUrl = function _VenlyProvider_getRpcUrl(options) {
    const secretType = options.secretType.toLowerCase();
    let environment = options.environment.replace('-local', '');
    return environment.startsWith('prod') ? `https://${secretType}-node.venly.io` : `https://${secretType}-node-${environment}.venly.io`;
}, _VenlyProvider_createEngine = function _VenlyProvider_createEngine(options) {
    if (!this.venlyController || this.venlyController.options.environment != options.environment)
        this.venlyController = new venlyController_1.VenlyController(options);
    else {
        this.venlyController.options = options;
        this.venlyController.resetWallets();
    }
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
        getPendingNonce: this.venlyController.getPendingNonce.bind(this.venlyController),
        changeSecretType: this.changeSecretType.bind(this)
    });
    engine.push(venlyMiddleware);
    const rpcUrl = __classPrivateFieldGet(this, _VenlyProvider_instances, "m", _VenlyProvider_getRpcUrl).call(this, options);
    const chainId = types_1.CHAIN_IDS[options.secretType][options.environment];
    const { networkMiddleware, blockTracker } = (0, createJsonRpcClient_1.default)({ rpcUrl, chainId, venlyConnect: this.venlyController.venlyConnect });
    this._blockTracker = blockTracker;
    const networkProvider = (0, eth_json_rpc_provider_1.providerFromMiddleware)(networkMiddleware);
    const filterMiddleware = (0, eth_json_rpc_filters_1.default)({
        provider: networkProvider,
        blockTracker,
    });
    const subscriptionManager = (0, subscriptionManager_1.default)({
        provider: networkProvider,
        blockTracker,
    });
    subscriptionManager.events.on('notification', (message) => engine.emit('notification', message));
    engine.push(filterMiddleware);
    engine.push(subscriptionManager.middleware);
    engine.push(networkMiddleware);
    return engine;
};
globalThis.Venly = new VenlyProvider();
