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
const bluebird_1 = require("bluebird");
const chai_1 = require("chai");
const sinon = require("sinon");
const mocks_1 = require("../test/mocks");
const constants_1 = require("../constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const client_options_1 = require("../client-options");
const rpc_handler_1 = require("./rpc-handler");
const rpc_response_1 = require("./rpc-response");
const timeout_registry_1 = require("../util/timeout-registry");
describe('RPC handler', () => {
    let services;
    let rpcHandler;
    let handle;
    let rpcProviderSpy;
    let rpcMakeSpy;
    let data;
    const name = 'myRpc';
    const rpcAcceptTimeout = 10;
    const rpcResponseTimeout = 30;
    const options = Object.assign({}, client_options_1.DefaultOptions, { rpcAcceptTimeout, rpcResponseTimeout });
    beforeEach(() => {
        services = mocks_1.getServicesMock();
        rpcHandler = new rpc_handler_1.RPCHandler(services, options);
        handle = services.getHandle();
        rpcProviderSpy = sinon.spy();
        rpcMakeSpy = sinon.spy();
        data = { foo: 'bar' };
    });
    afterEach(() => {
        services.connectionMock.verify();
        services.timeoutRegistryMock.verify();
        services.loggerMock.verify();
    });
    it('validates parameters on provide, unprovide and make', () => {
        chai_1.expect(rpcHandler.provide.bind(rpcHandler, '', () => { })).to.throw();
        chai_1.expect(rpcHandler.unprovide.bind(rpcHandler, '')).to.throw();
        chai_1.expect(rpcHandler.unprovide.bind(rpcHandler)).to.throw();
        chai_1.expect(rpcHandler.make.bind(rpcHandler, '')).to.throw();
        chai_1.expect(rpcHandler.make.bind(rpcHandler)).to.throw();
    });
    it('registers a provider', () => {
        const message = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.PROVIDE,
            name
        };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(message);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message });
        rpcHandler.provide(name, rpcProviderSpy);
        sinon.assert.notCalled(rpcProviderSpy);
    });
    it('reregisters a provider after a connection reconnection', () => {
        const message = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.PROVIDE,
            name
        };
        services.connectionMock
            .expects('sendMessage')
            .twice()
            .withExactArgs(message);
        services.timeoutRegistryMock
            .expects('add')
            .twice()
            .withExactArgs({ message });
        rpcHandler.provide(name, rpcProviderSpy);
        services.simulateConnectionReestablished();
        sinon.assert.notCalled(rpcProviderSpy);
    });
    it('sends rpc request message on make', () => {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REQUEST,
            name,
            parsedData: data,
            correlationId: sinon.match.any
        });
        rpcHandler.make(name, data, () => { });
    });
    it('returns promise on make when no callback is passed', () => {
        services.connectionMock
            .expects('sendMessage')
            .once();
        const promise = rpcHandler.make(name, data);
        chai_1.expect(promise).to.be.a('promise');
    });
    it('cant\'t make requests when client is offline', () => __awaiter(this, void 0, void 0, function* () {
        const callback = sinon.spy();
        const promisseError = sinon.spy();
        const promisseSuccess = sinon.spy();
        services.connection.isConnected = false;
        rpcHandler.make(name, data, callback);
        const promise = rpcHandler.make(name, data);
        promise.then(promisseSuccess).catch(promisseError);
        yield bluebird_1.Promise.delay(1);
        sinon.assert.calledOnce(callback);
        sinon.assert.calledWithExactly(callback, constants_1.EVENT.CLIENT_OFFLINE);
        sinon.assert.notCalled(promisseSuccess);
        sinon.assert.calledOnce(promisseError);
        sinon.assert.calledWithExactly(promisseError, constants_1.EVENT.CLIENT_OFFLINE);
    }));
    it('doesn\'t reply rpc and sends rejection if no provider exists', () => {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REJECT,
            name,
            correlationId: '123'
        });
        services.timeoutRegistryMock
            .expects('add')
            .never();
        handle({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REQUEST,
            name,
            parsedData: data,
            correlationId: '123'
        });
    });
    it('handles ack messages', () => {
        const message = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.PROVIDE_ACK,
            name,
            isAck: true
        };
        services.timeoutRegistryMock
            .expects('remove')
            .once()
            .withExactArgs(message);
        handle(message);
    });
    it('handles permission and message denied errors for provide and unprovide', () => {
        const expectations = (message) => {
            services.timeoutRegistryMock
                .expects('remove')
                .once()
                .withExactArgs(message);
            services.loggerMock
                .expects('error')
                .once()
                .withExactArgs(message);
        };
        const permissionErrProvidingMsg = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.MESSAGE_PERMISSION_ERROR,
            name,
            originalAction: message_constants_1.RPC_ACTIONS.PROVIDE
        };
        const permissionErrUnprovidingMsg = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.MESSAGE_PERMISSION_ERROR,
            name,
            originalAction: message_constants_1.RPC_ACTIONS.UNPROVIDE
        };
        const msgDeniedProving = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.MESSAGE_DENIED,
            name,
            originalAction: message_constants_1.RPC_ACTIONS.PROVIDE
        };
        const msgDeniedUnproving = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.MESSAGE_DENIED,
            name,
            originalAction: message_constants_1.RPC_ACTIONS.UNPROVIDE
        };
        expectations(permissionErrProvidingMsg);
        expectations(permissionErrUnprovidingMsg);
        expectations(msgDeniedProving);
        expectations(msgDeniedUnproving);
        handle(permissionErrProvidingMsg);
        handle(permissionErrUnprovidingMsg);
        handle(msgDeniedProving);
        handle(msgDeniedUnproving);
    });
    it('logs unknown correlation error when handling unknown rpc response', () => {
        const message = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.ACCEPT,
            name,
            correlationId: '123abc'
        };
        services.loggerMock
            .expects('error')
            .once()
            .withExactArgs(message, constants_1.EVENT.UNKNOWN_CORRELATION_ID);
        handle(message);
    });
    describe('when providing', () => {
        beforeEach(() => {
            rpcHandler.provide(name, rpcProviderSpy);
        });
        it('doesn\'t register provider twice', () => {
            services.connectionMock
                .expects('sendMessage')
                .never();
            services.timeoutRegistryMock
                .expects('add')
                .never();
            chai_1.expect(rpcHandler.provide.bind(rpcHandler, name, rpcProviderSpy))
                .to.throw(`RPC ${name} already registered`);
        });
        it('triggers rpc provider callback in a new request', () => {
            const message = {
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.REQUEST,
                name,
                parsedData: data,
                correlationId: '123'
            };
            const rpcResponse = new rpc_response_1.RPCResponse(message, options, services);
            handle(message);
            sinon.assert.calledOnce(rpcProviderSpy);
            sinon.assert.calledWithExactly(rpcProviderSpy, data, rpcResponse);
        });
        it('deregisters providers', () => {
            const message = {
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.UNPROVIDE,
                name
            };
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs(message);
            services.timeoutRegistryMock
                .expects('add')
                .once()
                .withExactArgs({ message });
            rpcHandler.unprovide(name);
        });
        it('doesn\'t send deregister provider message twice', () => {
            services.connectionMock
                .expects('sendMessage')
                .once();
            services.timeoutRegistryMock
                .expects('add')
                .once();
            services.loggerMock
                .expects('warn')
                .once();
            rpcHandler.unprovide(name);
            rpcHandler.unprovide(name);
        });
    });
    describe('when making', () => {
        let rpcResponseCallback;
        let promise;
        let rpcPromiseResponseSuccess;
        let rpcPromiseResponseFail;
        let correlationIdCallbackRpc;
        let correlationIdPromiseRpc;
        beforeEach(() => {
            services.timeoutRegistry = new timeout_registry_1.TimeoutRegistry(services, options);
            rpcResponseCallback = sinon.spy();
            rpcHandler.make(name, data, rpcResponseCallback);
            correlationIdCallbackRpc = mocks_1.getLastMessageSent().correlationId;
            rpcPromiseResponseSuccess = sinon.spy();
            rpcPromiseResponseFail = sinon.spy();
            promise = rpcHandler.make(name, data);
            promise
                .then(rpcPromiseResponseSuccess)
                .catch(rpcPromiseResponseFail);
            correlationIdPromiseRpc = mocks_1.getLastMessageSent().correlationId;
        });
        it('handles permission errors', () => __awaiter(this, void 0, void 0, function* () {
            const action = message_constants_1.RPC_ACTIONS.MESSAGE_PERMISSION_ERROR;
            const handleMessage = (correlationId) => handle({
                topic: message_constants_1.TOPIC.RPC,
                action,
                name,
                originalAction: message_constants_1.RPC_ACTIONS.REQUEST,
                correlationId
            });
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdPromiseRpc);
            yield bluebird_1.Promise.delay(rpcAcceptTimeout * 2);
            sinon.assert.calledOnce(rpcResponseCallback);
            sinon.assert.calledWithExactly(rpcResponseCallback, message_constants_1.RPC_ACTIONS[action]);
            sinon.assert.notCalled(rpcPromiseResponseSuccess);
            sinon.assert.calledOnce(rpcPromiseResponseFail);
            sinon.assert.calledWithExactly(rpcPromiseResponseFail, message_constants_1.RPC_ACTIONS[action]);
        }));
        it('handles message denied errors', () => __awaiter(this, void 0, void 0, function* () {
            const action = message_constants_1.RPC_ACTIONS.MESSAGE_DENIED;
            const handleMessage = (correlationId) => handle({
                topic: message_constants_1.TOPIC.RPC,
                action,
                name,
                originalAction: message_constants_1.RPC_ACTIONS.REQUEST,
                correlationId
            });
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdPromiseRpc);
            yield bluebird_1.Promise.delay(rpcAcceptTimeout * 2);
            sinon.assert.calledOnce(rpcResponseCallback);
            sinon.assert.calledWithExactly(rpcResponseCallback, message_constants_1.RPC_ACTIONS[action]);
            sinon.assert.notCalled(rpcPromiseResponseSuccess);
            sinon.assert.calledOnce(rpcPromiseResponseFail);
            sinon.assert.calledWithExactly(rpcPromiseResponseFail, message_constants_1.RPC_ACTIONS[action]);
        }));
        it('responds rpc with error when request is not accepted in time', () => __awaiter(this, void 0, void 0, function* () {
            yield bluebird_1.Promise.delay(rpcAcceptTimeout * 2);
            sinon.assert.calledOnce(rpcResponseCallback);
            sinon.assert.calledWithExactly(rpcResponseCallback, message_constants_1.RPC_ACTIONS[message_constants_1.RPC_ACTIONS.ACCEPT_TIMEOUT]);
            sinon.assert.notCalled(rpcPromiseResponseSuccess);
            sinon.assert.calledOnce(rpcPromiseResponseFail);
            sinon.assert.calledWithExactly(rpcPromiseResponseFail, message_constants_1.RPC_ACTIONS[message_constants_1.RPC_ACTIONS.ACCEPT_TIMEOUT]);
        }));
        it('handles the rpc response accepted message', () => __awaiter(this, void 0, void 0, function* () {
            const handleMessage = (correlationId) => handle({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.ACCEPT,
                name,
                correlationId
            });
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdPromiseRpc);
            yield bluebird_1.Promise.delay(rpcAcceptTimeout * 2);
            sinon.assert.notCalled(rpcResponseCallback);
            sinon.assert.notCalled(rpcPromiseResponseFail);
            sinon.assert.notCalled(rpcPromiseResponseSuccess);
        }));
        it('calls rpcResponse with error when response is not sent in time', () => __awaiter(this, void 0, void 0, function* () {
            const handleMessage = (correlationId) => handle({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.ACCEPT,
                name,
                correlationId
            });
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdPromiseRpc);
            yield bluebird_1.Promise.delay(rpcResponseTimeout * 2);
            sinon.assert.calledOnce(rpcResponseCallback);
            sinon.assert.calledWithExactly(rpcResponseCallback, message_constants_1.RPC_ACTIONS[message_constants_1.RPC_ACTIONS.RESPONSE_TIMEOUT]);
            sinon.assert.notCalled(rpcPromiseResponseSuccess);
            sinon.assert.calledOnce(rpcPromiseResponseFail);
            sinon.assert.calledWithExactly(rpcPromiseResponseFail, message_constants_1.RPC_ACTIONS[message_constants_1.RPC_ACTIONS.RESPONSE_TIMEOUT]);
        }));
        it('calls rpcResponse with error when no rpc provider is returned', () => __awaiter(this, void 0, void 0, function* () {
            const handleMessage = (correlationId) => handle({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.ACCEPT,
                name,
                correlationId
            });
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdPromiseRpc);
            handle({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.NO_RPC_PROVIDER,
                name,
                correlationId: correlationIdCallbackRpc
            });
            handle({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.NO_RPC_PROVIDER,
                name,
                correlationId: correlationIdPromiseRpc
            });
            sinon.assert.calledOnce(rpcResponseCallback);
            sinon.assert.calledWithExactly(rpcResponseCallback, message_constants_1.RPC_ACTIONS[message_constants_1.RPC_ACTIONS.NO_RPC_PROVIDER]);
            yield bluebird_1.Promise.delay(0);
            sinon.assert.notCalled(rpcPromiseResponseSuccess);
            sinon.assert.calledOnce(rpcPromiseResponseFail);
            sinon.assert.calledWithExactly(rpcPromiseResponseFail, message_constants_1.RPC_ACTIONS[message_constants_1.RPC_ACTIONS.NO_RPC_PROVIDER]);
        }));
        it('handles the rpc response RESPONSE message', () => __awaiter(this, void 0, void 0, function* () {
            const handleMessage = (correlationId) => handle({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.RESPONSE,
                name,
                correlationId,
                parsedData: data
            });
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdPromiseRpc);
            sinon.assert.calledOnce(rpcResponseCallback);
            sinon.assert.calledWithExactly(rpcResponseCallback, null, data);
            yield bluebird_1.Promise.delay(0);
            sinon.assert.notCalled(rpcPromiseResponseFail);
            sinon.assert.calledOnce(rpcPromiseResponseSuccess);
            sinon.assert.calledWithExactly(rpcPromiseResponseSuccess, data);
        }));
        it('doesn\'t call rpc response callback twice when handling response message', () => __awaiter(this, void 0, void 0, function* () {
            const handleMessage = (correlationId) => handle({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.RESPONSE,
                name,
                correlationId,
                parsedData: data
            });
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdPromiseRpc);
            handleMessage(correlationIdPromiseRpc);
            yield bluebird_1.Promise.delay(rpcResponseTimeout * 2);
            sinon.assert.calledOnce(rpcResponseCallback);
            sinon.assert.notCalled(rpcPromiseResponseFail);
            sinon.assert.calledOnce(rpcPromiseResponseSuccess);
        }));
        it('handles the rpc response error message', () => __awaiter(this, void 0, void 0, function* () {
            const error = 'ERROR';
            const handleMessage = (correlationId) => handle({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.REQUEST_ERROR,
                name,
                correlationId,
                parsedData: error
            });
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdPromiseRpc);
            yield bluebird_1.Promise.delay(rpcResponseTimeout * 2);
            sinon.assert.calledOnce(rpcResponseCallback);
            sinon.assert.calledWithExactly(rpcResponseCallback, error);
            sinon.assert.notCalled(rpcPromiseResponseSuccess);
            sinon.assert.calledOnce(rpcPromiseResponseFail);
            sinon.assert.calledWithExactly(rpcPromiseResponseFail, error);
        }));
        it('doesn\'t call rpc response callback twice when handling error message', () => __awaiter(this, void 0, void 0, function* () {
            const error = 'ERROR';
            const handleMessage = (correlationId) => handle({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.REQUEST_ERROR,
                name,
                correlationId,
                parsedData: error
            });
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdCallbackRpc);
            handleMessage(correlationIdPromiseRpc);
            handleMessage(correlationIdPromiseRpc);
            yield bluebird_1.Promise.delay(rpcResponseTimeout * 2);
            sinon.assert.calledOnce(rpcResponseCallback);
            sinon.assert.notCalled(rpcPromiseResponseSuccess);
            sinon.assert.calledOnce(rpcPromiseResponseFail);
        }));
        it('responds with error when onConnectionLost', () => __awaiter(this, void 0, void 0, function* () {
            services.simulateConnectionLost();
            yield bluebird_1.Promise.delay(1);
            sinon.assert.calledOnce(rpcResponseCallback);
            sinon.assert.calledWithExactly(rpcResponseCallback, constants_1.EVENT.CLIENT_OFFLINE);
            sinon.assert.notCalled(rpcPromiseResponseSuccess);
            sinon.assert.calledOnce(rpcPromiseResponseFail);
            sinon.assert.calledWithExactly(rpcPromiseResponseFail, constants_1.EVENT.CLIENT_OFFLINE);
        }));
    });
    describe('limbo', () => {
        beforeEach(() => {
            services.connection.isConnected = false;
            services.connection.isInLimbo = true;
        });
        it('returns client offline error once limbo state over', () => __awaiter(this, void 0, void 0, function* () {
            rpcHandler.make(name, data, rpcMakeSpy);
            services.simulateExitLimbo();
            yield bluebird_1.Promise.delay(1);
            sinon.assert.calledOnce(rpcMakeSpy);
            sinon.assert.calledWithExactly(rpcMakeSpy, constants_1.EVENT.CLIENT_OFFLINE);
        }));
        it('sends messages once re-established if in limbo', () => __awaiter(this, void 0, void 0, function* () {
            rpcHandler.make(name, data, rpcMakeSpy);
            services.connectionMock
                .expects('sendMessage')
                .once();
            services.timeoutRegistryMock
                .expects('add')
                .twice();
            services.simulateConnectionReestablished();
            yield bluebird_1.Promise.delay(1);
        }));
    });
});
//# sourceMappingURL=rpc-handler.spec.js.map