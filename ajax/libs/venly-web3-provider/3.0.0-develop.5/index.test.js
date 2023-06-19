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
const connect_1 = require("@venly/connect");
const index_1 = require("./index");
const json_rpc_engine_1 = require("json-rpc-engine");
const eth_json_rpc_middleware_1 = require("@metamask/eth-json-rpc-middleware");
require('isomorphic-fetch');
var venly;
var engine;
// var provider: any;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    venly = new index_1.VenlyProvider();
    mockApiCalls();
    let options = {
        clientId: 'Testaccount',
        environment: 'qa',
        secretType: connect_1.SecretType.ETHEREUM,
        skipAuthentication: true
    };
    var provider = yield venly.createProviderEngine(options);
    engine = new json_rpc_engine_1.JsonRpcEngine();
    engine.push((0, eth_json_rpc_middleware_1.providerAsMiddleware)(provider));
}));
function mockApiCalls() {
    venly.venlyController.getAccounts = jest.fn().mockResolvedValue(['0xb60e8dd61c5d32be8058bb8eb970870f07233155']);
    venly.venlyController.processTransaction = jest.fn().mockResolvedValue('');
    venly.venlyController.processSignTransaction = jest.fn().mockResolvedValue('');
    venly.venlyController.processEthSignMessage = jest.fn().mockResolvedValue('');
    venly.venlyController.processTypedMessage = jest.fn().mockResolvedValue('');
    venly.venlyController.processPersonalMessage = jest.fn().mockResolvedValue('');
}
describe('Static Middleware', () => {
    test('web3_clientVersion returns VenlyProviderEngine/v0.21.0/javascript', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'web3_clientVersion'
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toStrictEqual('VenlyProviderEngine/v0.21.0/javascript');
        });
    });
    test('eth_hashrate returns 0x00', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_hashrate'
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toStrictEqual('0x00');
        });
    });
    test('eth_mining returns false', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_mining'
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toStrictEqual(false);
        });
    });
    test('eth_syncing returns true', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_syncing'
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toStrictEqual(true);
        });
    });
});
describe('Network Middleware', () => {
    test('eth_chainId returns 0x5', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_chainId'
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toStrictEqual(0x5);
        });
    });
    test('eth_blockNumber returns valid block number', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_blockNumber'
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toMatch(/0x.*/);
        });
    });
    test('eth_gasPrice returns valid gas price', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_gasPrice'
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toMatch(/0x.*/);
        });
    });
    test('eth_getBalance returns valid account balance', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toMatch(/0x.*/);
        });
    });
    test('eth_getTransactionCount returns valid transaction count', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getTransactionCount',
            params: ["0x779F85503e1d4f38AB1B203820Dd7C633f931b99", "latest"]
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toMatch(/0x.*/);
        });
    });
    test('eth_getBlockTransactionCountByNumber returns valid transaction count', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getBlockTransactionCountByNumber',
            params: ["0xe8"]
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toMatch(/0x.*/);
        });
    });
    test('eth_getCode returns valid code', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getCode',
            params: ["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "latest"]
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toMatch(/0x.*/);
        });
    });
});
describe('Filter Middleware', () => {
    var filterId;
    test('eth_newFilter returns valid filter id', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_newFilter',
            params: [{
                    fromBlock: "0x1",
                    toBlock: "0x2",
                    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
                    topics: [
                        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
                        null,
                        [
                            "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
                            "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
                        ],
                    ],
                }]
        };
        return engine.handle(req).then((res) => {
            filterId = res.result;
            expect(res.result).toMatch(/0x.*/);
        });
    });
    test('eth_newBlockFilter returns valid filter id', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_newBlockFilter'
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toMatch(/0x.*/);
        });
    });
    test('eth_newPendingTransactionFilter returns valid filter id', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_newPendingTransactionFilter'
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toMatch(/0x.*/);
        });
    });
    test('eth_getFilterChanges returns an array', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getFilterChanges',
            params: [filterId]
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toBeInstanceOf(Array);
        });
    });
    test('eth_getFilterLogs returns an array', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_getFilterLogs',
            params: [filterId]
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toBeInstanceOf(Array);
        });
    });
    test('eth_uninstallFilter returns true', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_uninstallFilter',
            params: [filterId]
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toStrictEqual(true);
        });
    });
});
describe('Wallet Middleware', () => {
    test('eth_coinbase calls getAccounts() with correct params', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_coinbase'
        };
        return engine.handle(req).then((res) => {
            expect(venly.venlyController.getAccounts).lastCalledWith(req);
        });
    });
    test('eth_accounts calls getAccounts() with correct params', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_accounts'
        };
        return engine.handle(req).then((res) => {
            expect(venly.venlyController.getAccounts).lastCalledWith(req);
        });
    });
    test('eth_requestAccounts calls getAccounts() with correct params', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_requestAccounts'
        };
        return engine.handle(req).then((res) => {
            expect(venly.venlyController.getAccounts).lastCalledWith();
        });
    });
    test('eth_sendTransaction calls processTransaction() with correct params', () => {
        const params = {
            from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
            to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
            gas: "0x76c0",
            gasPrice: "0x9184e72a000",
            value: "0x9184e72a",
            data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
        };
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_sendTransaction',
            params: [params]
        };
        return engine.handle(req).then((res) => {
            expect(venly.venlyController.processTransaction).lastCalledWith(params, req);
        });
    });
    test('eth_signTransaction calls processSignTransaction() with correct params', () => {
        const params = {
            data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
            from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
            gas: "0x76c0",
            gasPrice: "0x9184e72a000",
            to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
            value: "0x9184e72a"
        };
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_signTransaction',
            params: [params]
        };
        return engine.handle(req).then((res) => {
            expect(venly.venlyController.processSignTransaction).lastCalledWith(params, req);
        });
    });
    test('eth_sign calls processEthSignMessage() with correct params', () => {
        const params = {
            data: "0xdeadbeaf",
            from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        };
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_sign',
            params: [params.from, params.data]
        };
        return engine.handle(req).then((res) => {
            expect(venly.venlyController.processEthSignMessage).lastCalledWith(params, req);
        });
    });
    test('eth_signTypedData calls processTypedMessage() with correct params', () => {
        const params = {
            data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
            from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155"
        };
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_signTypedData',
            params: [params.data, params.from]
        };
        return engine.handle(req).then((res) => {
            expect(venly.venlyController.processTypedMessage).lastCalledWith(params, req, 'V1');
        });
    });
    test('eth_signTypedData_v3 calls processTypedMessage() with correct params', () => {
        const params = {
            data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
            from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
            version: "V3"
        };
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_signTypedData_v3',
            params: [params.from, params.data]
        };
        return engine.handle(req).then((res) => {
            expect(venly.venlyController.processTypedMessage).lastCalledWith(params, req, 'V3');
        });
    });
    test('eth_signTypedData_v4 calls processTypedMessage() with correct params', () => {
        const params = {
            data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
            from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
            version: "V4"
        };
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'eth_signTypedData_v4',
            params: [params.from, params.data]
        };
        return engine.handle(req).then((res) => {
            expect(venly.venlyController.processTypedMessage).lastCalledWith(params, req, 'V4');
        });
    });
    test('personal_sign calls processPersonalMessage() with correct params', () => {
        const params = {
            data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
            from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155"
        };
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'personal_sign',
            params: [params.from, params.data]
        };
        return engine.handle(req).then((res) => {
            expect(venly.venlyController.processPersonalMessage).lastCalledWith(params, req);
        });
    });
    test('wallet_switchEthereumChain calls changeSecretType() and returns null', () => {
        const req = {
            id: 1,
            jsonrpc: '2.0',
            method: 'wallet_switchEthereumChain',
            params: [{
                    chainId: "0x89"
                }]
        };
        return engine.handle(req).then((res) => {
            expect(res.result).toBeNull;
            expect(venly.venlyController.options.secretType).toEqual('MATIC');
            expect(venly.venlyController.options.environment).toEqual('prod');
        });
    });
});
