"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const mocks_1 = require("../mocks");
const constants_1 = require("../../src/constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const client_options_1 = require("../../src/client-options");
const event_handler_1 = require("../../src/event/event-handler");
describe('event handler', () => {
    let services;
    let listener;
    let eventHandler;
    let handle;
    let spy;
    const name = 'myEvent';
    beforeEach(() => {
        services = mocks_1.getServicesMock();
        listener = mocks_1.getListenerMock();
        eventHandler = new event_handler_1.EventHandler(services, client_options_1.DefaultOptions, listener.listener);
        handle = services.getHandle();
        spy = sinon.spy();
    });
    afterEach(() => {
        services.verify();
        listener.listenerMock.verify();
    });
    it('validates parameters on subscribe, unsubscribe and emit', () => {
        chai_1.expect(eventHandler.subscribe.bind(eventHandler, '', () => { })).to.throw();
        chai_1.expect(eventHandler.subscribe.bind(eventHandler, 1, () => { })).to.throw();
        chai_1.expect(eventHandler.subscribe.bind(eventHandler, 'event', null)).to.throw();
        chai_1.expect(eventHandler.unsubscribe.bind(eventHandler, '', () => { })).to.throw();
        chai_1.expect(eventHandler.unsubscribe.bind(eventHandler, 1, () => { })).to.throw();
        chai_1.expect(eventHandler.unsubscribe.bind(eventHandler, 'event', null)).to.throw();
        chai_1.expect(eventHandler.unsubscribe.bind(eventHandler, null)).to.throw();
        chai_1.expect(eventHandler.emit.bind(eventHandler, '', () => { })).to.throw();
        chai_1.expect(eventHandler.emit.bind(eventHandler, 1, () => { })).to.throw();
        chai_1.expect(eventHandler.emit.bind(eventHandler, null, () => { })).to.throw();
    });
    it('emits an event it has no listeners for', () => {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.EMIT,
            name,
            parsedData: 6
        });
        eventHandler.emit(name, 6);
    });
    it('subscribes to an event', () => {
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name
        });
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({
            message: {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
                name
            }
        });
        eventHandler.subscribe(name, spy);
    });
    it('resubscribes to an event when connection reestablished', () => {
        services.connectionMock
            .expects('sendMessage')
            .twice()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name
        });
        services.timeoutRegistryMock
            .expects('add')
            .twice()
            .withExactArgs({
            message: {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
                name
            }
        });
        eventHandler.subscribe(name, spy);
        services.simulateConnectionReestablished();
    });
    it('subscribes to an event twice', () => {
        services.connectionMock
            .expects('sendMessage')
            .once();
        services.timeoutRegistryMock
            .expects('add')
            .once();
        eventHandler.subscribe(name, spy);
        eventHandler.subscribe(name, spy);
    });
    it('unsubscribes to an event after subscribing', () => {
        services.connectionMock
            .expects('sendMessage')
            .once();
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
            name
        });
        services.timeoutRegistryMock
            .expects('add')
            .once();
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({
            message: {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
                name
            }
        });
        eventHandler.subscribe(name, spy);
        eventHandler.unsubscribe(name, spy);
    });
    it('unsubscribes to an event after unsubscribing already', () => {
        services.connectionMock
            .expects('sendMessage')
            .once();
        services.connectionMock
            .expects('sendMessage')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
            name
        });
        services.timeoutRegistryMock
            .expects('add')
            .once();
        services.timeoutRegistryMock
            .expects('add')
            .once()
            .withExactArgs({
            message: {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
                name
            }
        });
        services.loggerMock
            .expects('warn')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.NOT_SUBSCRIBED,
            name
        });
        eventHandler.subscribe(name, spy);
        eventHandler.unsubscribe(name, spy);
        eventHandler.unsubscribe(name, spy);
    });
    it('notifies local listeners for local events', () => {
        eventHandler.subscribe(name, spy);
        eventHandler.emit(name, 8);
        sinon.assert.calledOnce(spy);
        sinon.assert.calledWithExactly(spy, 8);
    });
    it('notifies local listeners for remote events', () => {
        eventHandler.subscribe(name, spy);
        handle({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.EMIT,
            name,
            parsedData: 8
        });
        sinon.assert.calledOnce(spy);
        sinon.assert.calledWithExactly(spy, 8);
    });
    it('removes local listeners', () => {
        eventHandler.subscribe(name, spy);
        eventHandler.unsubscribe(name, spy);
        eventHandler.emit(name, 11);
        sinon.assert.callCount(spy, 0);
    });
    it('notifies local listeners for remote events without data', () => {
        eventHandler.subscribe(name, spy);
        handle({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.EMIT,
            name
        });
        sinon.assert.calledOnce(spy);
        sinon.assert.calledWithExactly(spy, undefined);
    });
    it('unsubscribes locally when it recieves a message denied', () => {
        eventHandler.subscribe(name, spy);
        handle({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.MESSAGE_DENIED,
            originalAction: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name
        });
        eventHandler.emit(name, 11);
        sinon.assert.callCount(spy, 0);
    });
    it('forwards subscribe ack messages', () => {
        services.timeoutRegistryMock
            .expects('remove')
            .once()
            .withExactArgs({
            isAck: true,
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name
        });
        handle({
            isAck: true,
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name
        });
    });
    it('forwards unsubscribe ack messages', () => {
        services.timeoutRegistryMock
            .expects('remove')
            .once()
            .withExactArgs({
            isAck: true,
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
            name
        });
        handle({
            isAck: true,
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
            name
        });
    });
    it('warns when a not subscribed is remotely recieved', () => {
        services.loggerMock
            .expects('warn')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.NOT_SUBSCRIBED,
            name
        });
        handle({
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.NOT_SUBSCRIBED,
            name
        });
    });
    it('listens for pattern', () => {
        const pattern = '.*';
        const callback = () => { };
        listener.listenerMock
            .expects('listen')
            .once()
            .withExactArgs(pattern, callback);
        eventHandler.listen(pattern, callback);
    });
    it('unlistens a pattern', () => {
        const pattern = '.*';
        listener.listenerMock
            .expects('unlisten')
            .once()
            .withExactArgs(pattern);
        eventHandler.unlisten(pattern);
    });
    it('it forwards listeners\' messages to listeners', () => {
        const subscriptionFoundMsg = {
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND,
            name: '.*',
            subscription: 'subscription'
        };
        const subscriptionRemovedMsg = {
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED,
            name: '.*',
            subscription: 'subscription'
        };
        listener.listenerMock
            .expects('handle')
            .once()
            .withExactArgs(subscriptionFoundMsg);
        listener.listenerMock
            .expects('handle')
            .once()
            .withExactArgs(subscriptionRemovedMsg);
        handle(subscriptionFoundMsg);
        handle(subscriptionRemovedMsg);
    });
    it('logs an error event for unsolicited event messages', () => {
        services.loggerMock
            .expects('error')
            .once()
            .withExactArgs({
            topic: message_constants_1.TOPIC.EVENT,
            action: -1
        }, constants_1.EVENT.UNSOLICITED_MESSAGE);
        handle({
            topic: message_constants_1.TOPIC.EVENT,
            action: -1
        });
    });
});
//# sourceMappingURL=event-handlerSpec.js.map