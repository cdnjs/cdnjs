"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocks_1 = require("../test/mocks");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const client_options_1 = require("../client-options");
const rpc_response_1 = require("./rpc-response");
const bluebird_1 = require("bluebird");
describe('RPC response', () => {
    let services;
    let rpcResponse;
    const name = 'myRPC';
    const correlationId = 'correlationId';
    beforeEach(() => {
        services = mocks_1.getServicesMock();
        rpcResponse = new rpc_response_1.RPCResponse({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REQUEST,
            name,
            correlationId
        }, client_options_1.DefaultOptions, services);
        rpcResponse.autoAccept = false;
    });
    afterEach(() => {
        services.connectionMock.verify();
    });
    it('doesn\'t accept automatically when autoAccept == false', () => __awaiter(this, void 0, void 0, function* () {
        services.connectionMock
            .expects('sendMessage')
            .never();
        yield bluebird_1.Promise.delay(2);
    }));
    it('sends an accept message automatically when autoAccept == true ', () => __awaiter(this, void 0, void 0, function* () {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.ACCEPT,
            name,
            correlationId
        });
        rpcResponse.autoAccept = true;
        yield bluebird_1.Promise.delay(2);
    }));
    it('sends an accept message manually', () => {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.ACCEPT,
            name,
            correlationId
        });
        rpcResponse.accept();
    });
    it('sends the response message but accepts the rpc before when it is not accepted yet', () => {
        const data = { foo: 'bar' };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.ACCEPT,
            name,
            correlationId
        });
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.RESPONSE,
            name,
            correlationId,
            parsedData: data
        });
        rpcResponse.send(data);
    });
    it('throws when trying to send a completed response', () => {
        const data = { foo: 'bar' };
        /**
         * 1st call: accept message
         * 2nd call: response message
         */
        services.connectionMock
            .expects('sendMessage')
            .twice();
        rpcResponse.send(data);
        chai_1.expect(rpcResponse.send.bind(rpcResponse, data)).to.throw(`Rpc ${name} already completed`);
    });
    it('doesn\'t send multiple accept messages', () => {
        services.connectionMock
            .expects('sendMessage')
            .once();
        rpcResponse.accept();
        rpcResponse.accept();
    });
    it('sends reject message', () => {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REJECT,
            name,
            correlationId
        });
        rpcResponse.reject();
    });
    it('doesn\'t send reject message twice and throws error', () => {
        services.connectionMock
            .expects('sendMessage')
            .once();
        rpcResponse.reject();
        chai_1.expect(rpcResponse.reject.bind(rpcResponse)).to.throw(`Rpc ${name} already completed`);
    });
    it('sends error message', () => {
        const error = 'error';
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REQUEST_ERROR,
            name,
            correlationId,
            parsedData: error
        });
        rpcResponse.error(error);
    });
    it('doesn\'t send error message twice and throws error', () => {
        const error = 'error';
        services.connectionMock
            .expects('sendMessage')
            .once();
        rpcResponse.error(error);
        chai_1.expect(rpcResponse.error.bind(rpcResponse, error)).to.throw(`Rpc ${name} already completed`);
    });
});
//# sourceMappingURL=rpc-response.spec.js.map