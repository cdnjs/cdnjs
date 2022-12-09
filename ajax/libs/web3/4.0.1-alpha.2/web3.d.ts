import { Web3Context } from 'web3-core';
import Web3Eth from 'web3-eth';
import { ENS } from 'web3-eth-ens';
import Iban from 'web3-eth-iban';
import Personal from 'web3-eth-personal';
import Net from 'web3-net';
import * as utils from 'web3-utils';
import { EthExecutionAPI, SupportedProviders } from 'web3-types';
import { Web3EthInterface } from './types';
export declare class Web3 extends Web3Context<EthExecutionAPI> {
    static version: string;
    static utils: typeof utils;
    static modules: {
        Web3Eth: typeof Web3Eth;
        Iban: typeof Iban;
        Net: typeof Net;
        ENS: typeof ENS;
        Personal: typeof Personal;
    };
    utils: typeof utils;
    eth: Web3EthInterface;
    constructor(provider?: SupportedProviders<EthExecutionAPI> | string);
}
export default Web3;
//# sourceMappingURL=web3.d.ts.map