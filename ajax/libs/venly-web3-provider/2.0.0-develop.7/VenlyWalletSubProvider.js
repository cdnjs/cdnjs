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
exports.VenlyWalletSubProvider = void 0;
const connect_1 = require("@venly/connect");
const BaseWalletSubprovider_1 = require("./BaseWalletSubprovider");
class VenlyWalletSubProvider extends BaseWalletSubprovider_1.BaseWalletSubprovider {
    constructor(options) {
        super();
        this.wallets = [];
        const connectConstructorOptions = {
            environment: options.environment || 'production',
            bearerTokenProvider: options.bearerTokenProvider,
        };
        if (options.signMethod) {
            Object.assign(connectConstructorOptions, { signUsing: options.signMethod == 'POPUP' ? connect_1.SignMethod.POPUP : connect_1.SignMethod.REDIRECT });
        }
        if (options.windowMode) {
            Object.assign(connectConstructorOptions, { windowMode: options.windowMode == 'POPUP' ? connect_1.WindowMode.POPUP : connect_1.WindowMode.REDIRECT });
        }
        this.connect = new connect_1.VenlyConnect(options.clientId, connectConstructorOptions);
        this.options = options;
    }
    startGetAccountFlow(authenticationOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authenticationOptions) {
                this.options.authenticationOptions = authenticationOptions;
            }
            let that = this;
            return this.connect.flows.getAccount(this.options.secretType || connect_1.SecretType.ETHEREUM, this.options.authenticationOptions)
                .then((account) => __awaiter(this, void 0, void 0, function* () {
                return yield new Promise((resolve, reject) => {
                    if (!account.isAuthenticated) {
                        reject('not-authenticated');
                    }
                    else if (account.wallets && account.wallets.length <= 0) {
                        reject('no-wallet-linked');
                    }
                    else {
                        that.wallets = account.wallets;
                        that.lastWalletsFetch = Date.now();
                        resolve(account);
                    }
                });
            }));
        });
    }
    refreshWallets() {
        return __awaiter(this, void 0, void 0, function* () {
            let newWallets = yield this.connect.api.getWallets({ secretType: this.options.secretType || connect_1.SecretType.ETHEREUM, includeBalance: false });
            if (!newWallets || newWallets.length < 1) {
                let account = yield this.connect.flows.getAccount(this.options.secretType || connect_1.SecretType.ETHEREUM, this.options.authenticationOptions);
                newWallets = account.wallets;
            }
            this.wallets = newWallets;
            return newWallets;
        });
    }
    /**
     * Retrieve the accounts associated with the eth-lightwallet instance.
     * This method is implicitly called when issuing a `eth_accounts` JSON RPC request
     * via your providerEngine instance.
     *
     * @return An array of accounts
     */
    getAccountsAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            let promise;
            const authResult = yield this.connect.checkAuthenticated();
            if (!authResult.isAuthenticated) {
                promise = this.startGetAccountFlow();
            }
            else if (this.shouldRefreshWallets()) {
                this.lastWalletsFetch = Date.now();
                promise = this.refreshWallets();
            }
            else {
                promise = Promise.resolve();
            }
            return promise.then(() => {
                return this.wallets.map((wallet) => wallet.address);
            });
        });
    }
    checkAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connect.checkAuthenticated();
        });
    }
    /**
     * Signs a transaction with the account specificed by the `from` field in txParams.
     * If you've added this Subprovider to your app's provider, you can simply send
     * an `eth_sendTransaction` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param txParams Parameters of the transaction to sign
     * @return Signed transaction hex string
     */
    signTransactionAsync(txParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let signer = this.connect.createSigner();
            return signer.signTransaction(this.constructEthereumTransationSignatureRequest(txParams))
                .then((result) => {
                if (result.status === 'SUCCESS') {
                    return result.result.signedTransaction;
                }
                else {
                    throw new Error((result.errors && result.errors.join(', ')));
                }
            });
        });
    }
    /**
     * Sign a personal Ethereum signed message. The signing account will be the account
     * associated with the provided address.
     * If you've added this Subprovider to your app's provider, you can simply send an `eth_sign`
     * or `personal_sign` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param data Hex string message to sign
     * @param address Address of the account to sign with
     * @return Signature hex string (order: rsv)
     */
    signPersonalMessageAsync(data, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const signer = this.connect.createSigner();
            let type = connect_1.SignatureRequestType.ETHEREUM_RAW;
            if (this.options.secretType && this.options.secretType == connect_1.SecretType.ETHEREUM) {
                type = connect_1.SignatureRequestType.ETHEREUM_RAW;
            }
            else if (this.options.secretType && this.options.secretType == connect_1.SecretType.MATIC) {
                type = connect_1.SignatureRequestType.MATIC_RAW;
            }
            else if (this.options.secretType && this.options.secretType == connect_1.SecretType.BSC) {
                type = connect_1.SignatureRequestType.BSC_RAW;
            }
            else if (this.options.secretType && this.options.secretType == connect_1.SecretType.AVAC) {
                type = connect_1.SignatureRequestType.AVAC_RAW;
            }
            return signer.signTransaction({
                type: type,
                walletId: this.getWalletIdFrom(address),
                data: data
            })
                .then((result) => {
                if (result.status === 'SUCCESS') {
                    return result.result.signature;
                }
                else {
                    throw new Error((result.errors && result.errors.join(', ')));
                }
            });
        });
    }
    /**
     * Sign an EIP712 Typed Data message. The signing address will associated with the provided address.
     * If you've added this Subprovider to your app's provider, you can simply send an `eth_signTypedData`
     * JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param address Address of the account to sign with
     * @param data the typed data object
     * @return Signature hex string (order: rsv)
     */
    signTypedDataAsync(address, typedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const signer = this.connect.createSigner();
            if (typeof typedData === 'string') {
                typedData = JSON.parse(typedData);
            }
            const request = {
                data: typedData,
                walletId: this.getWalletIdFrom(address),
                secretType: this.options.secretType || connect_1.SecretType.ETHEREUM
            };
            return signer.signEip712(request)
                .then((result) => {
                if (result.status === 'SUCCESS') {
                    return result.result.signature;
                }
                else {
                    throw new Error((result.errors && result.errors.join(', ')));
                }
            });
        });
    }
    shouldRefreshWallets() {
        return !this.lastWalletsFetch
            || (Date.now() - this.lastWalletsFetch) > 5000;
    }
    constructEthereumTransationSignatureRequest(txParams) {
        let type = connect_1.SignatureRequestType.ETHEREUM_TRANSACTION;
        if (this.options.secretType && this.options.secretType == connect_1.SecretType.ETHEREUM) {
            type = connect_1.SignatureRequestType.ETHEREUM_TRANSACTION;
        }
        else if (this.options.secretType && this.options.secretType == connect_1.SecretType.MATIC) {
            type = connect_1.SignatureRequestType.MATIC_TRANSACTION;
        }
        else if (this.options.secretType && this.options.secretType == connect_1.SecretType.BSC) {
            type = connect_1.SignatureRequestType.BSC_TRANSACTION;
        }
        else if (this.options.secretType && this.options.secretType == connect_1.SecretType.AVAC) {
            type = connect_1.SignatureRequestType.AVAC_TRANSACTION;
        }
        const retVal = {
            gasPrice: txParams.gasPrice ? BigInt(txParams.gasPrice).toString(10) : txParams.gasPrice,
            gas: txParams.gas ? BigInt(txParams.gas).toString(10) : txParams.gas,
            to: txParams.to,
            nonce: txParams.nonce ? BigInt(txParams.nonce).toString(10) : txParams.nonce,
            data: (txParams.data) || '0x',
            value: txParams.value ? BigInt(txParams.value).toString(10) : '0',
            submit: false,
            type: type,
            walletId: this.getWalletIdFrom(txParams.from),
        };
        return retVal;
    }
    getWalletIdFrom(address) {
        let foundWallet = this.wallets.find((wallet) => {
            return wallet.address.toLowerCase() === address.toLowerCase();
        });
        return (foundWallet && foundWallet.id) || '';
    }
}
exports.VenlyWalletSubProvider = VenlyWalletSubProvider;
