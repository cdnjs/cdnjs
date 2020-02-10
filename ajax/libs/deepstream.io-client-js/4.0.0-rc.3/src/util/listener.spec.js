"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const mocks_1 = require("../test/mocks");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const constants_1 = require("../constants");
const listener_1 = require("./listener");
describe('listener', () => {
    let services;
    let listener;
    let listenCallback;
    const pattern = '.*';
    const subscription = 'subscription';
    beforeEach(() => {
        listenCallback = sinon.stub();
        services = mocks_1.getServicesMock();
        listener = new listener_1.Listener(message_constants_1.TOPIC.EVENT, services);
    });
    afterEach(() => {
        services.connectionMock.verify();
        services.loggerMock.verify();
        services.timeoutRegistryMock.verify();
    });
    it('validates parameters on listen and unlisten', () => {
        chai_1.expect(listener.listen.bind(listener, '', listenCallback)).to.throw();
        chai_1.expect(listener.unlisten.bind(listener, '')).to.throw();
    });
    it('sends event listen message', () => {
        const message = {
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
            .withExactArgs({ message });
        listener.listen(pattern, listenCallback);
    });
    it('sends record listen message', () => {
        listener = new listener_1.Listener(message_constants_1.TOPIC.RECORD, services);
        const message = {
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
            .withExactArgs({ message });
        listener.listen(pattern, listenCallback);
    });
    it('resubscribes all patterns when connection reestablished', () => {
        listener = new listener_1.Listener(message_constants_1.TOPIC.RECORD, services);
        const message = {
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
            .withExactArgs({ message });
        listener.listen(pattern, listenCallback);
        services.simulateConnectionReestablished();
    });
    describe('when a pattern is listened to', () => {
        beforeEach(() => {
            listener.listen(pattern, listenCallback);
            services.connectionMock.restore();
            services.timeoutRegistryMock.restore();
        });
        it('warns if listen invoked more than once', () => {
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
        it('sends unlisten message when unlistened', () => {
            const message = {
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
                .withExactArgs({ message });
            listener.unlisten(pattern);
        });
        it('warns if unlisten invoked more than once', () => {
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
        it('logs unsolicited message if an unknown message is recieved', () => {
            const message = {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.EMIT,
                name: pattern,
                subscription
            };
            services.loggerMock
                .expects('error')
                .once()
                .withExactArgs(message, constants_1.EVENT.UNSOLICITED_MESSAGE);
            listener.handle(message);
        });
        describe('gets a subscription for pattern found', () => {
            let response;
            beforeEach(() => {
                listener.handle({
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND,
                    name: pattern,
                    subscription
                });
                response = listenCallback.lastCall.args[1];
            });
            it('calls the listen callback', () => {
                sinon.assert.calledOnce(listenCallback);
                sinon.assert.calledWithExactly(listenCallback, subscription, sinon.match.any);
            });
            it('responds with accept', () => {
                services.connectionMock
                    .expects('sendMessage')
                    .once()
                    .withExactArgs({
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.LISTEN_ACCEPT,
                    name: pattern,
                    subscription
                });
                response.accept();
            });
            it('responds with reject', () => {
                services.connectionMock
                    .expects('sendMessage')
                    .once()
                    .withExactArgs({
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.LISTEN_REJECT,
                    name: pattern,
                    subscription
                });
                response.reject();
            });
            it('calls onStop subscription for pattern removed', () => {
                const closeSpy = sinon.spy();
                response.onStop(closeSpy);
                response.accept();
                listener.handle({
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED,
                    name: pattern,
                    subscription
                });
                sinon.assert.calledOnce(closeSpy);
                sinon.assert.calledWithExactly(closeSpy, subscription);
            });
            it('deletes onStop callback once called', () => {
                const closeSpy = sinon.spy();
                response.onStop(closeSpy);
                response.accept();
                listener.handle({
                    topic: message_constants_1.TOPIC.EVENT,
                    action: message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED,
                    name: pattern,
                    subscription
                });
                sinon.assert.calledOnce(closeSpy);
                sinon.assert.calledWithExactly(closeSpy, subscription);
            });
            it('triggers all stop callbacks when connection lost', () => {
                const closeSpy = sinon.spy();
                response.onStop(closeSpy);
                response.accept();
                services.simulateConnectionLost();
                sinon.assert.calledOnce(closeSpy);
                sinon.assert.calledWithExactly(closeSpy, subscription);
            });
        });
    });
});
//# sourceMappingURL=listener.spec.js.map