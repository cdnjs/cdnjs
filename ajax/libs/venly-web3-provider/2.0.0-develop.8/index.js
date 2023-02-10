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
exports.VenlySubProvider = void 0;
const VenlyWalletSubProvider_1 = require("./VenlyWalletSubProvider");
const NonceTracker_1 = require("./NonceTracker");
const SignedVersionedTypedDataSubProvider_1 = require("./SignedVersionedTypedDataSubProvider");
const RequestAccountsSubProvider_1 = require("./RequestAccountsSubProvider");
const connect_1 = require("@venly/connect");
const SignTransactionGasFix_1 = require("./SignTransactionGasFix");
const ProviderEngine = require('@arkane-network/web3-provider-engine');
const CacheSubprovider = require('@arkane-network/web3-provider-engine/subproviders/cache');
const FixtureSubprovider = require('@arkane-network/web3-provider-engine/subproviders/fixture');
const FilterSubprovider = require('@arkane-network/web3-provider-engine/subproviders/filters');
const RpcSubprovider = require('@arkane-network/web3-provider-engine/subproviders/rpc');
const SubscriptionsSubprovider = require('@arkane-network/web3-provider-engine/subproviders/subscriptions');
const SanitizerSubprovider = require('@arkane-network/web3-provider-engine/subproviders/sanitizer');
const InflightCacheSubprovider = require('@arkane-network/web3-provider-engine/subproviders/inflight-cache');
// const WebsocketSubprovider = require('@arkane-network/web3-provider-engine/subproviders/websocket');
class VenlySubProvider {
    connect() {
        return this.venlyConnect;
    }
    changeSecretType(secretType = connect_1.SecretType.ETHEREUM) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.subProvider && this.subProvider.options) {
                this.subProvider.options.secretType = secretType;
                this.subProvider.lastWalletsFetch = undefined;
                this.engine.stop();
                return this.createProviderEngine(this.subProvider.options);
            }
        });
    }
    hasSubProvider() {
        return !!this.subProvider;
    }
    checkAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.subProvider) {
                throw new Error('Please initialise provider first (Venly.createProviderEngine)');
            }
            return this.subProvider.checkAuthenticated();
        });
    }
    authenticate(authenticationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.subProvider) {
                throw new Error('Please initialise provider first (Venly.createProviderEngine)');
            }
            return this.subProvider.startGetAccountFlow(authenticationOptions);
        });
    }
    createProviderEngine(options) {
        let connectionDetails = this.getConnectionDetails(options);
        this.engine = new ProviderEngine({ pollingInterval: options.pollingInterval || 15000 });
        this.engine.addProvider(new FixtureSubprovider({
            web3_clientVersion: 'VenlyProviderEngine/v0.21.0/javascript',
            net_listening: true,
            eth_hashrate: '0x00',
            eth_mining: false,
            eth_syncing: true,
        }));
        if (!this.subProvider)
            this.subProvider = new VenlyWalletSubProvider_1.VenlyWalletSubProvider(options);
        this.engine.addProvider(this.subProvider);
        this.venlyConnect = this.subProvider.connect;
        if (!this.signedVersionedTypedDataSubProvider)
            this.signedVersionedTypedDataSubProvider = new SignedVersionedTypedDataSubProvider_1.SignedVersionedTypedDataSubProvider(this.subProvider);
        this.engine.addProvider(this.signedVersionedTypedDataSubProvider);
        if (!this.requestAccountsSubProvider)
            this.requestAccountsSubProvider = new RequestAccountsSubProvider_1.RequestAccountsSubProvider(this.subProvider);
        this.engine.addProvider(this.requestAccountsSubProvider);
        this.engine.addProvider(new NonceTracker_1.NonceTrackerSubprovider({ rpcUrl: connectionDetails.endpointHttpUrl }));
        this.engine.addProvider(new SignTransactionGasFix_1.SignTransactionGasFix());
        this.engine.addProvider(new CacheSubprovider());
        this.engine.addProvider(new FilterSubprovider());
        this.engine.addProvider(new SanitizerSubprovider());
        this.engine.addProvider(new SubscriptionsSubprovider());
        this.engine.addProvider(new InflightCacheSubprovider());
        this.engine.addProvider(new RpcSubprovider({ rpcUrl: connectionDetails.endpointHttpUrl }));
        return options.skipAuthentication
            ? Promise.resolve(this.startEngine(this.engine))
            : this.subProvider.getAccountsAsync().then(() => this.startEngine(this.engine));
    }
    getConnectionDetails(options) {
        let secretType = options.secretType ? options.secretType : connect_1.SecretType.ETHEREUM;
        let environment = options.environment;
        environment = environment === null || environment === void 0 ? void 0 : environment.replace('-local', '');
        let endpoint = `${secretType.toLowerCase()}-node${environment && !environment.startsWith('prod') ? '-' + environment : ''}.arkane.network`;
        return {
            endpointHttpUrl: 'https://' + endpoint
        };
    }
    startEngine(engine) {
        engine.on('error', (err) => {
            console.error(err.stack);
        });
        engine.start();
        return engine;
    }
}
exports.VenlySubProvider = VenlySubProvider;
class ConnectionDetails {
    constructor(endpointHttpUrl, endpointWsUrl) {
        this.endpointHttpUrl = endpointHttpUrl;
        this.endpointWsUrl = endpointWsUrl;
    }
}
