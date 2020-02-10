"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocks_1 = require("../mocks");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const client_options_1 = require("../../src/client-options");
const rpc_response_1 = require("../../src/rpc/rpc-response");
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
    it('doesn\'t accept automatically when autoAccept == false', done => {
        services.connectionMock
            .expects('sendMessage')
            .never();
        process.nextTick(done);
    });
    it('sends an accept message automatically when autoAccept == true ', done => {
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
        process.nextTick(done);
    });
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
//# sourceMappingURL=rpc-responseSpec.js.map