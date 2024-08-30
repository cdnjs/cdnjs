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
exports.timeout = exports.formatTxMetaForRpcResult = void 0;
const TRANSACTION_ENVELOPE_TYPES = {
    LEGACY: '0x0',
    ACCESS_LIST: '0x1',
    FEE_MARKET: '0x2',
};
function formatTxMetaForRpcResult(txMeta) {
    const { r, s, v, hash, txReceipt, txParams } = txMeta;
    const { to, data, nonce, gas, from, value, gasPrice, accessList, maxFeePerGas, maxPriorityFeePerGas, } = txParams;
    const formattedTxMeta = {
        v,
        r,
        s,
        to,
        gas,
        from,
        hash,
        nonce,
        input: data || '0x',
        value: value || '0x0',
        accessList: accessList || null,
        blockHash: (txReceipt === null || txReceipt === void 0 ? void 0 : txReceipt.blockHash) || null,
        blockNumber: (txReceipt === null || txReceipt === void 0 ? void 0 : txReceipt.blockNumber) || null,
        transactionIndex: (txReceipt === null || txReceipt === void 0 ? void 0 : txReceipt.transactionIndex) || null,
    };
    if (maxFeePerGas && maxPriorityFeePerGas) {
        formattedTxMeta.gasPrice = maxFeePerGas;
        formattedTxMeta.maxFeePerGas = maxFeePerGas;
        formattedTxMeta.maxPriorityFeePerGas = maxPriorityFeePerGas;
        formattedTxMeta.type = TRANSACTION_ENVELOPE_TYPES.FEE_MARKET;
    }
    else {
        formattedTxMeta.gasPrice = gasPrice;
        formattedTxMeta.type = TRANSACTION_ENVELOPE_TYPES.LEGACY;
    }
    return formattedTxMeta;
}
exports.formatTxMetaForRpcResult = formatTxMetaForRpcResult;
/**
 * Wait the specified number of milliseconds.
 *
 * @param duration - The number of milliseconds to wait.
 * @returns A promise that resolves after the specified amount of time.
 */
function timeout(duration) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, duration));
    });
}
exports.timeout = timeout;
