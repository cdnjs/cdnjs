"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTxMetaForRpcResult = void 0;
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
