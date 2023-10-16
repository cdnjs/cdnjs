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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenlyController = void 0;
const connect_1 = require("@venly/connect");
const types_1 = require("./types");
const bignumber_1 = require("@ethersproject/bignumber");
class VenlyController {
    constructor(options) {
        this.wallets = [];
        this.options = options;
        this.venlyConnect = new connect_1.VenlyConnect(options.clientId, {
            environment: options.environment,
            windowMode: options.windowMode,
            bearerTokenProvider: options.bearerTokenProvider,
            useOverlayWithPopup: false
        });
    }
    resetWallets() {
        this.lastWalletsFetch = undefined;
        this.wallets = [];
    }
    authenticate(authenticationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.authResult || !this.authResult.isAuthenticated)
                this.authResult = yield this.venlyConnect.flows.authenticate(Object.assign(Object.assign({}, authenticationOptions), { forcePopup: true }));
            return this.authResult;
        });
    }
    checkAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authResult = yield this.venlyConnect.checkAuthenticated();
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.authResult = yield this.venlyConnect.logout();
        });
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.authResult || !this.authResult.isAuthenticated)
                this.authResult = yield this.startGetAccountFlow(this.options.authenticationOptions);
            else
                yield this.refreshWallets();
            return this.wallets.map((wallet) => wallet.address);
        });
    }
    processTransaction(params, req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const signer = this.venlyConnect.createSigner();
            const transactionData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ walletId: this.getWalletIdFrom(params.from), type: types_1.REQUEST_TYPES[this.options.secretType].transaction }, params.to && { to: params.to }), params.data && { data: params.data }), params.value && { value: bignumber_1.BigNumber.from(params.value).toString() }), params.gas && { gas: bignumber_1.BigNumber.from(params.gas).toString() }), params.gasPrice && { gasPrice: bignumber_1.BigNumber.from(params.gasPrice).toString() }), params.nonce && { nonce: bignumber_1.BigNumber.from(params.nonce).toString() });
            const res = yield signer.executeNativeTransaction(transactionData);
            if (res.status === 'SUCCESS')
                return res.result.transactionHash;
            else
                throw new Error((_a = res.errors) === null || _a === void 0 ? void 0 : _a.join(', '));
        });
    }
    processSignTransaction(params, req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const signer = this.venlyConnect.createSigner();
            const transactionData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ walletId: this.getWalletIdFrom(params.from), type: types_1.REQUEST_TYPES[this.options.secretType].signature }, params.to && { to: params.to }), params.data && { data: params.data }), params.value && { value: bignumber_1.BigNumber.from(params.value).toString() }), params.gas && { gas: bignumber_1.BigNumber.from(params.gas).toString() }), params.gasPrice && { gasPrice: bignumber_1.BigNumber.from(params.gasPrice).toString() }), params.nonce && { nonce: bignumber_1.BigNumber.from(params.nonce).toString() });
            const res = yield signer.sign(transactionData);
            if (res.status === 'SUCCESS')
                return res.result.signedTransaction;
            else
                throw new Error((_a = res.errors) === null || _a === void 0 ? void 0 : _a.join(', '));
        });
    }
    processEthSignMessage(params, req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const signer = this.venlyConnect.createSigner();
            const res = yield signer.signMessage({
                walletId: this.getWalletIdFrom(params.from),
                secretType: this.options.secretType,
                data: params.data
            });
            if (res.status === 'SUCCESS')
                return res.result.signature;
            else
                throw new Error((_a = res.errors) === null || _a === void 0 ? void 0 : _a.join(', '));
        });
    }
    processTypedMessage(params, req, version) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const signer = this.venlyConnect.createSigner();
            try {
                var typedData = JSON.parse(params.data);
            }
            catch (_c) {
                var typedData = params.data;
            }
            if ((_a = typedData === null || typedData === void 0 ? void 0 : typedData.domain) === null || _a === void 0 ? void 0 : _a.chainId)
                typedData.domain.chainId = bignumber_1.BigNumber.from(typedData.domain.chainId).toString();
            const res = yield signer.signEip712({
                walletId: this.getWalletIdFrom(params.from),
                secretType: this.options.secretType,
                data: typedData
            });
            if (res.status === 'SUCCESS')
                return res.result.signature;
            else
                throw new Error((_b = res.errors) === null || _b === void 0 ? void 0 : _b.join(', '));
        });
    }
    processPersonalMessage(params, req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const signer = this.venlyConnect.createSigner();
            const res = yield signer.signMessage({
                walletId: this.getWalletIdFrom(params.from),
                secretType: this.options.secretType,
                data: params.data
            });
            if (res.status === 'SUCCESS')
                return res.result.signature;
            else
                throw new Error((_a = res.errors) === null || _a === void 0 ? void 0 : _a.join(', '));
        });
    }
    getTransactionByHash(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.venlyConnect.api.getTransactionStatus(hash, this.options.secretType);
            if ((res === null || res === void 0 ? void 0 : res.status) == 'SUCCEEDED') {
                res.value = bignumber_1.BigNumber.from(res.rawValue).toString();
                if (!res.data)
                    res.data = '0x';
                const { rawValue } = res, transaction = __rest(res, ["rawValue"]);
                return transaction;
            }
            else
                return null;
        });
    }
    getPendingTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.venlyConnect.api.getPendingTransactions();
            return res.map((tx) => {
                const _a = tx.transactionRequest, { rawValue, type } = _a, transaction = __rest(_a, ["rawValue", "type"]);
                transaction.value = bignumber_1.BigNumber.from(transaction.value).toString();
                return transaction;
            });
        });
    }
    getPendingNonce(nonce) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.venlyConnect.api.getPendingTransactions();
            const pendingNonce = Number(nonce) + res.length;
            return '0x' + pendingNonce.toString(16);
        });
    }
    refreshWallets() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lastWalletsFetch || (Date.now() - this.lastWalletsFetch) > 5000) {
                let wallets = yield this.venlyConnect.api.getWallets({ secretType: this.options.secretType, includeBalance: false });
                if (!wallets || wallets.length < 1) {
                    let account = yield this.venlyConnect.flows.getAccount(this.options.secretType, this.options.authenticationOptions);
                    wallets = account.wallets;
                }
                this.wallets = wallets;
            }
            this.lastWalletsFetch = Date.now();
            return this.wallets;
        });
    }
    startGetAccountFlow(authenticationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authenticationOptions) {
                this.options.authenticationOptions = authenticationOptions;
            }
            return this.venlyConnect.flows.getAccount(this.options.secretType, this.options.authenticationOptions)
                .then((account) => __awaiter(this, void 0, void 0, function* () {
                return yield new Promise((resolve, reject) => {
                    if (!account.isAuthenticated)
                        reject('not-authenticated');
                    else if (account.wallets && account.wallets.length <= 0)
                        reject('no-wallet-linked');
                    else {
                        this.wallets = account.wallets;
                        this.lastWalletsFetch = Date.now();
                        resolve(account);
                    }
                });
            }));
        });
    }
    getWalletIdFrom(address) {
        let foundWallet = this.wallets.find((wallet) => {
            var _a;
            return ((_a = wallet.address) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === (address === null || address === void 0 ? void 0 : address.toLowerCase());
        });
        return (foundWallet === null || foundWallet === void 0 ? void 0 : foundWallet.id) || '';
    }
}
exports.VenlyController = VenlyController;
