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
exports.initAccountsForContext = void 0;
const web3_utils_1 = require("web3-utils");
const web3_eth_1 = require("web3-eth");
const web3_eth_accounts_1 = require("web3-eth-accounts");
const initAccountsForContext = (context) => {
    const signTransactionWithContext = (transaction, privateKey) => __awaiter(void 0, void 0, void 0, function* () {
        const tx = yield (0, web3_eth_1.prepareTransactionForSigning)(transaction, context);
        const privateKeyBytes = (0, web3_utils_1.format)({ eth: 'bytes' }, privateKey, web3_utils_1.ETH_DATA_FORMAT);
        return (0, web3_eth_accounts_1.signTransaction)(tx, privateKeyBytes);
    });
    const privateKeyToAccountWithContext = (privateKey) => {
        const account = (0, web3_eth_accounts_1.privateKeyToAccount)(privateKey);
        return Object.assign(Object.assign({}, account), { signTransaction: (transaction) => __awaiter(void 0, void 0, void 0, function* () { return signTransactionWithContext(transaction, account.privateKey); }) });
    };
    const decryptWithContext = (keystore, password, options) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const account = yield (0, web3_eth_accounts_1.decrypt)(keystore, password, (_a = options === null || options === void 0 ? void 0 : options.nonStrict) !== null && _a !== void 0 ? _a : true);
        return Object.assign(Object.assign({}, account), { signTransaction: (transaction) => __awaiter(void 0, void 0, void 0, function* () { return signTransactionWithContext(transaction, account.privateKey); }) });
    });
    const createWithContext = () => {
        const account = (0, web3_eth_accounts_1.create)();
        return Object.assign(Object.assign({}, account), { signTransaction: (transaction) => __awaiter(void 0, void 0, void 0, function* () { return signTransactionWithContext(transaction, account.privateKey); }) });
    };
    const wallet = new web3_eth_accounts_1.Wallet({
        create: createWithContext,
        privateKeyToAccount: privateKeyToAccountWithContext,
        decrypt: decryptWithContext,
    });
    return {
        signTransaction: signTransactionWithContext,
        create: createWithContext,
        privateKeyToAccount: privateKeyToAccountWithContext,
        decrypt: decryptWithContext,
        recoverTransaction: web3_eth_accounts_1.recoverTransaction,
        hashMessage: web3_eth_accounts_1.hashMessage,
        sign: web3_eth_accounts_1.sign,
        recover: web3_eth_accounts_1.recover,
        encrypt: web3_eth_accounts_1.encrypt,
        wallet,
    };
};
exports.initAccountsForContext = initAccountsForContext;
//# sourceMappingURL=accounts.js.map