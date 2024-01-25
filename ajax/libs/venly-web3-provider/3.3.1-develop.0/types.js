"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_TYPES = exports.SECRET_TYPES = exports.CHAIN_IDS = void 0;
exports.CHAIN_IDS = {
    AVAC: {
        production: '0xA86A',
        sandbox: '0xA869',
        staging: '0xA869',
        qa: '0xA869'
    },
    BSC: {
        production: '0x38',
        sandbox: '0x61',
        staging: '0x61',
        qa: '0x61'
    },
    ETHEREUM: {
        production: '0x1',
        sandbox: '0x5',
        staging: '0x5',
        qa: '0x5'
    },
    GOCHAIN: {
        production: '0x3c',
        sandbox: '0x7a69',
        staging: '0x7a69',
        qa: '0x7a69'
    },
    MATIC: {
        production: '0x89',
        sandbox: '0x13881',
        staging: '0x13881',
        qa: '0x13881'
    },
};
exports.SECRET_TYPES = {
    0xA86A: {
        env: 'production',
        secretType: 'AVAC',
    },
    0xA869: {
        env: 'sandbox',
        secretType: 'AVAC',
    },
    0x38: {
        env: 'production',
        secretType: 'BSC',
    },
    0x61: {
        env: 'sandbox',
        secretType: 'BSC',
    },
    0x1: {
        env: 'production',
        secretType: 'ETHEREUM',
    },
    0x5: {
        env: 'sandbox',
        secretType: 'ETHEREUM',
    },
    0x3c: {
        env: 'production',
        secretType: 'GOCHAIN',
    },
    0x7a69: {
        env: 'sandbox',
        secretType: 'GOCHAIN',
    },
    0x89: {
        env: 'production',
        secretType: 'MATIC',
    },
    0x13881: {
        env: 'sandbox',
        secretType: 'MATIC',
    },
};
exports.REQUEST_TYPES = {
    AVAC: {
        transaction: 'AVAC_TRANSACTION',
        signature: 'AVAC_TRANSACTION',
    },
    BSC: {
        transaction: 'BSC_TRANSACTION',
        signature: 'BSC_TRANSACTION',
    },
    ETHEREUM: {
        transaction: 'ETH_TRANSACTION',
        signature: 'ETHEREUM_TRANSACTION',
    },
    GOCHAIN: {
        transaction: 'GO_TRANSACTION',
        signature: 'GOCHAIN_TRANSACTION',
    },
    MATIC: {
        transaction: 'MATIC_TRANSACTION',
        signature: 'MATIC_TRANSACTION',
    },
};
