import { EthExecutionAPI, Bytes, Transaction, KeyStore } from 'web3-types';
import { Web3Context } from 'web3-core';
import { Wallet } from 'web3-eth-accounts';
export declare const initAccountsForContext: (context: Web3Context<EthExecutionAPI>) => {
    signTransaction: (transaction: Transaction, privateKey: Bytes) => Promise<import("web3-eth-accounts").SignTransactionResult>;
    create: () => {
        signTransaction: (transaction: Transaction) => Promise<import("web3-eth-accounts").SignTransactionResult>;
        address: string;
        privateKey: string;
        sign: (data: string | Record<string, unknown>) => {
            readonly messageHash: string;
            readonly r: string;
            readonly s: string;
            readonly v: string;
            readonly message?: string | undefined;
            readonly signature: string;
        };
        encrypt: (password: string, options?: Record<string, unknown> | undefined) => Promise<KeyStore>;
    };
    privateKeyToAccount: (privateKey: Buffer | string) => {
        signTransaction: (transaction: Transaction) => Promise<import("web3-eth-accounts").SignTransactionResult>;
        address: string;
        privateKey: string;
        sign: (data: string | Record<string, unknown>) => {
            readonly messageHash: string;
            readonly r: string;
            readonly s: string;
            readonly v: string;
            readonly message?: string | undefined;
            readonly signature: string;
        };
        encrypt: (password: string, options?: Record<string, unknown> | undefined) => Promise<KeyStore>;
    };
    decrypt: (keystore: KeyStore | string, password: string, options?: Record<string, unknown>) => Promise<{
        signTransaction: (transaction: Transaction) => Promise<import("web3-eth-accounts").SignTransactionResult>;
        address: string;
        privateKey: string;
        sign: (data: string | Record<string, unknown>) => {
            readonly messageHash: string;
            readonly r: string;
            readonly s: string;
            readonly v: string;
            readonly message?: string | undefined;
            readonly signature: string;
        };
        encrypt: (password: string, options?: Record<string, unknown> | undefined) => Promise<KeyStore>;
    }>;
    recoverTransaction: (rawTransaction: string) => string;
    hashMessage: (message: string) => string;
    sign: (data: string, privateKey: Bytes) => import("web3-eth-accounts").SignResult;
    recover: (data: string | import("web3-eth-accounts").SignatureObject, signatureOrV?: string | undefined, prefixedOrR?: string | boolean | undefined, s?: string | undefined, prefixed?: boolean | undefined) => string;
    encrypt: (privateKey: Bytes, password: string | Buffer, options?: import("web3-types").CipherOptions | undefined) => Promise<KeyStore>;
    wallet: Wallet<{
        signTransaction: (transaction: Transaction) => Promise<import("web3-eth-accounts").SignTransactionResult>;
        address: string;
        privateKey: string;
        sign: (data: string | Record<string, unknown>) => {
            readonly messageHash: string;
            readonly r: string;
            readonly s: string;
            readonly v: string;
            readonly message?: string | undefined;
            readonly signature: string;
        };
        encrypt: (password: string, options?: Record<string, unknown> | undefined) => Promise<KeyStore>;
    }>;
};
//# sourceMappingURL=accounts.d.ts.map