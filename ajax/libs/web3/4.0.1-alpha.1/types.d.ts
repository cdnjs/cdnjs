/// <reference types="node" />
import { EthExecutionAPI, SupportedProviders, Address, Bytes, Transaction } from 'web3-types';
import Eth from 'web3-eth';
import { ContractAbi, decodeLog, decodeParameter, decodeParameters, encodeFunctionCall, encodeFunctionSignature, encodeParameter, encodeParameters } from 'web3-eth-abi';
import { encrypt, hashMessage, recover, recoverTransaction, sign, signTransaction, Wallet, Web3Account } from 'web3-eth-accounts';
import Contract, { ContractInitOptions } from 'web3-eth-contract';
import { ENS } from 'web3-eth-ens';
import Net from 'web3-net';
import { Iban } from 'web3-eth-iban';
export declare type Web3ContractConstructor<Abi extends ContractAbi> = Omit<typeof Contract, 'new'> & {
    new (jsonInterface: Abi, address?: Address, options?: ContractInitOptions): Contract<Abi>;
    setProvider: (provider: SupportedProviders<EthExecutionAPI>) => void;
};
export interface Web3EthInterface extends Eth {
    Contract: Web3ContractConstructor<any>;
    Iban: typeof Iban;
    net: Net;
    ens: ENS;
    abi: {
        encodeEventSignature: typeof encodeFunctionSignature;
        encodeFunctionCall: typeof encodeFunctionCall;
        encodeFunctionSignature: typeof encodeFunctionSignature;
        encodeParameter: typeof encodeParameter;
        encodeParameters: typeof encodeParameters;
        decodeParameter: typeof decodeParameter;
        decodeParameters: typeof decodeParameters;
        decodeLog: typeof decodeLog;
    };
    accounts: {
        create: () => Web3Account;
        privateKeyToAccount: (privateKey: Buffer | string) => Web3Account;
        signTransaction: (transaction: Transaction, privateKey: Bytes) => ReturnType<typeof signTransaction>;
        recoverTransaction: typeof recoverTransaction;
        hashMessage: typeof hashMessage;
        sign: typeof sign;
        recover: typeof recover;
        encrypt: typeof encrypt;
        decrypt: (keystore: string, password: string, options?: Record<string, unknown>) => Promise<Web3Account>;
        wallet: Wallet;
    };
}
//# sourceMappingURL=types.d.ts.map