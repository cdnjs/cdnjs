"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timeout_registry_1 = require("./timeout-registry");
var sinon = require("sinon");
var mocks_1 = require("../test/mocks");
var client_options_1 = require("../client-options");
var constants_1 = require("../constants");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
describe('timeout registry', function () {
    var timeoutRegistry;
    var services;
    var options;
    var timeoutId;
    var name = 'event';
    var message = {
        topic: message_constants_1.TOPIC.EVENT,
        action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
        name: name
    };
    beforeEach(function () {
        options = Object.assign({}, client_options_1.DefaultOptions);
        options.subscriptionTimeout = 10;
        services = mocks_1.getServicesMock();
        services.connection.getConnectionState.returns(constants_1.CONNECTION_STATE.OPEN);
        timeoutRegistry = new timeout_registry_1.TimeoutRegistry(services, options);
        services.connection.onLost(timeoutRegistry.onConnectionLost.bind(timeoutRegistry));
    });
    afterEach(function () {
        services.loggerMock.verify();
    });
    describe('adding timeout when connection down', function () {
        beforeEach(function () {
            services.connection.isConnected = false;
            timeoutId = timeoutRegistry.add({ message: message });
        });
        it('does not invoke an error', function (done) {
            setTimeout(done, 20);
        });
    });
    describe('generic timeout', function () {
        beforeEach(function () {
            timeoutId = timeoutRegistry.add({ message: message });
        });
        it('invokes the error callback once the timeout has occured', function (done) {
            services.loggerMock
                .expects('warn')
                .once()
                .withExactArgs(message, constants_1.EVENT.ACK_TIMEOUT);
            setTimeout(done, 20);
        });
        it('adding an entry twice does not throw error', function () {
            timeoutRegistry.add({ message: message });
            // no error is thrown in afterEach
        });
        it('receives an ACK message clears timeout', function (done) {
            timeoutRegistry.remove(message);
            setTimeout(done, 10);
        });
        it('clearing timer id clears timeout', function (done) {
            timeoutRegistry.clear(timeoutId);
            setTimeout(done, 10);
        });
        it('clears timeout when connection lost', function (done) {
            services.simulateConnectionLost();
            setTimeout(done, 10);
        });
    });
    describe('custom timeout and event', function () {
        var spy;
        beforeEach(function () {
            spy = sinon.spy();
            timeoutId = timeoutRegistry.add({
                message: message,
                event: message_constants_1.RPC_ACTIONS.RESPONSE_TIMEOUT,
                duration: 25,
                callback: spy
            });
        });
        it('doesnt trigger timeout after generic subscriptionTimeout', function (done) {
            setTimeout(function () {
                sinon.assert.callCount(spy, 0);
                done();
            }, 20);
        });
        it('triggers timeout with custom attributes', function (done) {
            setTimeout(function () {
                sinon.assert.calledOnce(spy);
                sinon.assert.calledWithExactly(spy, message_constants_1.RPC_ACTIONS.RESPONSE_TIMEOUT, message);
                done();
            }, 50);
        });
        it('receives an ACK message clears timeout', function (done) {
            timeoutRegistry.remove(message);
            setTimeout(function () {
                sinon.assert.callCount(spy, 0);
                done();
            }, 50);
        });
        it('clearing timer id clears timeout', function (done) {
            timeoutRegistry.clear(timeoutId);
            setTimeout(function () {
                sinon.assert.callCount(spy, 0);
                done();
            }, 50);
        });
        it('clears timeout when connection lost', function (done) {
            services.simulateConnectionLost();
            setTimeout(done, 10);
        });
    });
});
