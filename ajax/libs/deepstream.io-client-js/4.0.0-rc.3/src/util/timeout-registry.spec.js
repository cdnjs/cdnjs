"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timeout_registry_1 = require("./timeout-registry");
const sinon = require("sinon");
const mocks_1 = require("../test/mocks");
const client_options_1 = require("../client-options");
const constants_1 = require("../constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
describe('timeout registry', () => {
    let timeoutRegistry;
    let services;
    let options;
    let timeoutId;
    const name = 'event';
    const message = {
        topic: message_constants_1.TOPIC.EVENT,
        action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
        name
    };
    beforeEach(() => {
        options = Object.assign({}, client_options_1.DefaultOptions);
        options.subscriptionTimeout = 10;
        services = mocks_1.getServicesMock();
        services.connection.getConnectionState.returns(constants_1.CONNECTION_STATE.OPEN);
        timeoutRegistry = new timeout_registry_1.TimeoutRegistry(services, options);
        services.connection.onLost(timeoutRegistry.onConnectionLost.bind(timeoutRegistry));
    });
    afterEach(() => {
        services.loggerMock.verify();
    });
    describe('adding timeout when connection down', () => {
        beforeEach(() => {
            services.connection.isConnected = false;
            timeoutId = timeoutRegistry.add({ message });
        });
        it('does not invoke an error', done => {
            setTimeout(done, 20);
        });
    });
    describe('generic timeout', () => {
        beforeEach(() => {
            timeoutId = timeoutRegistry.add({ message });
        });
        it('invokes the error callback once the timeout has occured', done => {
            services.loggerMock
                .expects('warn')
                .once()
                .withExactArgs(message, constants_1.EVENT.ACK_TIMEOUT);
            setTimeout(done, 20);
        });
        it('adding an entry twice does not throw error', () => {
            timeoutRegistry.add({ message });
            // no error is thrown in afterEach
        });
        it('receives an ACK message clears timeout', done => {
            timeoutRegistry.remove(message);
            setTimeout(done, 10);
        });
        it('clearing timer id clears timeout', done => {
            timeoutRegistry.clear(timeoutId);
            setTimeout(done, 10);
        });
        it('clears timeout when connection lost', done => {
            services.simulateConnectionLost();
            setTimeout(done, 10);
        });
    });
    describe('custom timeout and event', () => {
        let spy;
        beforeEach(() => {
            spy = sinon.spy();
            timeoutId = timeoutRegistry.add({
                message,
                event: message_constants_1.RPC_ACTIONS.RESPONSE_TIMEOUT,
                duration: 25,
                callback: spy
            });
        });
        it('doesnt trigger timeout after generic subscriptionTimeout', done => {
            setTimeout(() => {
                sinon.assert.callCount(spy, 0);
                done();
            }, 20);
        });
        it('triggers timeout with custom attributes', done => {
            setTimeout(() => {
                sinon.assert.calledOnce(spy);
                sinon.assert.calledWithExactly(spy, message_constants_1.RPC_ACTIONS.RESPONSE_TIMEOUT, message);
                done();
            }, 50);
        });
        it('receives an ACK message clears timeout', done => {
            timeoutRegistry.remove(message);
            setTimeout(() => {
                sinon.assert.callCount(spy, 0);
                done();
            }, 50);
        });
        it('clearing timer id clears timeout', done => {
            timeoutRegistry.clear(timeoutId);
            setTimeout(() => {
                sinon.assert.callCount(spy, 0);
                done();
            }, 50);
        });
        it('clears timeout when connection lost', done => {
            services.simulateConnectionLost();
            setTimeout(done, 10);
        });
    });
});
//# sourceMappingURL=timeout-registry.spec.js.map