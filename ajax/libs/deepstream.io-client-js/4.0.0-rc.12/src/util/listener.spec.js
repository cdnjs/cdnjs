"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon = require("sinon");
var mocks_1 = require("../test/mocks");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var constants_1 = require("../constants");
var listener_1 = require("./listener");
describe('listener', function () {
    var services;
    var listener;
    var listenCallback;
    var pattern = '.*';
    var subscription = 'subscription';
    beforeEach(function () {
        listenCallback = sinon.stub();
        services = mocks_1.getServicesMock();
        listener = new listener_1.Listener(message_constants_1.TOPIC.EVENT, services);
    });
    afterEach(function () {
        services.connectionMock.verify();
        services.loggerMock.verify();
        services.timeoutRegistryMock.verify();
    });
    it('validates parameters on listen and unlisten', function () {
        chai_1.expect(listener.listen.bind(listener, '', listenCallback)).to.throw();
        chai_1.expect(listener.unlisten.bind(listener, '')).to.throw();
    });
    it('sends event listen message', function () {
        var message = {
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.LISTEN,
            name: pattern
        };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(message);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message: message });
        listener.listen(pattern, listenCallback);
    });
    it('sends record listen message', function () {
        listener = new listener_1.Listener(message_constants_1.TOPIC.RECORD, services);
        var message = {
            topic: message_constants_1.TOPIC.RECORD,
            action: message_constants_1.RECORD_ACTIONS.LISTEN,
            name: pattern
        };
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs(message);
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({ message: message });
        listener.listen(pattern, listenCallback);
    });
    it('resubscribes all patterns when connection reestablished', function () {
        listener = new listener_1.Listener(message_constants_1.TOPIC.RECORD, services);
        var message = {
            topic: message_constants_1.TOPIC.RECORD,
            action: message_constants_1.RECORD_ACTIONS.LISTEN,
            name: pattern
        };
        services.connectionMock
            .expects('sendMessage')
            .twice()
            .withExactArgs(message);
        services.timeoutRegistryMock
            .expects('add')
            .twice()
            .withExactArgs({ message: message });
        listener.listen(pattern, listenCallback);
        services.simulateConnectionReestablished();
    });
    describe('when a pattern is listened to', function () {
        beforeEach(function () {
            listener.listen(pattern, listenCallback);
            services.connectionMock.restore();
            services.timeoutRegistryMock.restore();
        });
        it('warns if listen invoked more than once', function () {
            services.loggerMock
                .expects('warn')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.EVENT,
                action: constants_1.EVENT.LISTENER_EXISTS,
                name: pattern
            });
            listener.listen(pattern, listenCallback);
        });
        it('sends unlisten message when unlistened', function () {
            var message = {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.UNLISTEN,
                name: pattern
            };
            services.connectionMock
                .expects('sendMessage')
                .once()
                .withExactArgs(message);
            services.timeoutRegistryMock
                .expects('add')
                .once()
                .withExactArgs({ message: message });
            listener.unlisten(pattern);
        });
        it('warns if unlisten invoked more than once', function () {
            services.loggerMock
                .expects('warn')
                .once()
                .withExactArgs({
                topic: message_constants_1.TOPIC.EVENT,
                action: constants_1.EVENT.NOT_LISTENING,
                name: pattern
            });
            listener.unlisten(pattern);
            listener.unlisten(pattern);
        });
        it('logs unsolicited message if an unknown message is recieved', function () {
            var message = {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.EMIT,
                name: pattern,
                subscription: subscription
            };
            services.loggerMock
                .expects('error')
                .once()
                .withExactArgs(message, constants_1.EVENT.UNSOLICITED_MESSAGE);
            listener.handle(message);
        });
        describe('gets a subscription for pattern found', function () {
            var response;
            beforeEach(function () {
                listener.handle({
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND,
                    name: pattern,
                    subscription: subscription
                });
                response = listenCallback.lastCall.args[1];
            });
            it('calls the listen callback', function () {
                sinon.assert.calledOnce(listenCallback);
                sinon.assert.calledWithExactly(listenCallback, subscription, sinon.match.any);
            });
            it('responds with accept', function () {
                services.connectionMock
                    .expects('sendMessage')
                    .once()
                    .withExactArgs({
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.LISTEN_ACCEPT,
                    name: pattern,
                    subscription: subscription
                });
                response.accept();
            });
            it('responds with reject', function () {
                services.connectionMock
                    .expects('sendMessage')
                    .once()
                    .withExactArgs({
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.LISTEN_REJECT,
                    name: pattern,
                    subscription: subscription
                });
                response.reject();
            });
            it('calls onStop subscription for pattern removed', function () {
                var closeSpy = sinon.spy();
                response.onStop(closeSpy);
                response.accept();
                listener.handle({
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED,
                    name: pattern,
                    subscription: subscription
                });
                sinon.assert.calledOnce(closeSpy);
                sinon.assert.calledWithExactly(closeSpy, subscription);
            });
            it('deletes onStop callback once called', function () {
                var closeSpy = sinon.spy();
                response.onStop(closeSpy);
                response.accept();
                listener.handle({
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED,
                    name: pattern,
                    subscription: subscription
                });
                sinon.assert.calledOnce(closeSpy);
                sinon.assert.calledWithExactly(closeSpy, subscription);
            });
            it('triggers all stop callbacks when connection lost', function () {
                var closeSpy = sinon.spy();
                response.onStop(closeSpy);
                response.accept();
                services.simulateConnectionLost();
                sinon.assert.calledOnce(closeSpy);
                sinon.assert.calledWithExactly(closeSpy, subscription);
            });
        });
    });
});
