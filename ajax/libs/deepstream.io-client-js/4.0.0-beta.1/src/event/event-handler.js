"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const constants_1 = require("../constants");
const listener_1 = require("../util/listener");
const Emitter = require("component-emitter2");
class EventHandler {
    constructor(services, options, listeners) {
        this.options = options;
        this.services = services;
        this.listeners = listeners || new listener_1.Listener(message_constants_1.TOPIC.EVENT, services);
        this.emitter = new Emitter();
        this.services.connection.registerHandler(message_constants_1.TOPIC.EVENT, this.handle.bind(this));
        this.services.connection.onReestablished(this.resubscribe.bind(this));
    }
    /**
    * Subscribe to an event. This will receive both locally emitted events
    * as well as events emitted by other connected clients.
    */
    subscribe(name, callback) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (typeof callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        if (!this.emitter.hasListeners(name)) {
            this.sendSubscriptionMessage(name);
        }
        this.emitter.on(name, callback);
    }
    /**
     * Removes a callback for a specified event. If all callbacks
     * for an event have been removed, the server will be notified
     * that the client is unsubscribed as a listener
     */
    unsubscribe(name, callback) {
        if (!name || typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        if (!this.emitter.hasListeners(name)) {
            this.services.logger.warn({
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.NOT_SUBSCRIBED,
                name
            });
            return;
        }
        this.emitter.off(name, callback);
        if (!this.emitter.hasListeners(name)) {
            const message = {
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
                name
            };
            this.services.timeoutRegistry.add({ message });
            this.services.connection.sendMessage(message);
        }
    }
    /**
     * Emits an event locally and sends a message to the server to
     * broadcast the event to the other connected clients
     */
    emit(name, data) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (this.services.connection.isConnected) {
            this.services.connection.sendMessage({
                topic: message_constants_1.TOPIC.EVENT,
                action: message_constants_1.EVENT_ACTIONS.EMIT,
                name,
                parsedData: data
            });
        }
        this.emitter.emit(name, data);
    }
    /**
   * Allows to listen for event subscriptions made by this or other clients. This
   * is useful to create "active" data providers, e.g. providers that only provide
   * data for a particular event if a user is actually interested in it
   */
    listen(pattern, callback) {
        this.listeners.listen(pattern, callback);
    }
    /**
     * Removes a listener that was previously registered
     */
    unlisten(pattern) {
        this.listeners.unlisten(pattern);
    }
    /**
   * Handles incoming messages from the server
   */
    handle(message) {
        if (message.isAck) {
            this.services.timeoutRegistry.remove(message);
            return;
        }
        if (message.action === message_constants_1.EVENT_ACTIONS.EMIT) {
            if (message.parsedData !== undefined) {
                this.emitter.emit(message.name, message.parsedData);
            }
            else {
                this.emitter.emit(message.name, undefined);
            }
            return;
        }
        if (message.action === message_constants_1.EVENT_ACTIONS.MESSAGE_DENIED) {
            this.services.logger.error({ topic: message_constants_1.TOPIC.EVENT }, message_constants_1.EVENT_ACTIONS.MESSAGE_DENIED);
            this.services.timeoutRegistry.remove(message);
            if (message.originalAction === message_constants_1.EVENT_ACTIONS.SUBSCRIBE) {
                this.emitter.off(message.name);
            }
            return;
        }
        if (message.action === message_constants_1.EVENT_ACTIONS.MULTIPLE_SUBSCRIPTIONS) {
            this.services.timeoutRegistry.remove(Object.assign({}, message, {
                action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE
            }));
            this.services.logger.warn(message);
            return;
        }
        if (message.action === message_constants_1.EVENT_ACTIONS.NOT_SUBSCRIBED) {
            this.services.timeoutRegistry.remove(Object.assign({}, message, {
                action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE
            }));
            this.services.logger.warn(message);
            return;
        }
        if (message.action === message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND ||
            message.action === message_constants_1.EVENT_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
            this.listeners.handle(message);
            return;
        }
        if (message.action === message_constants_1.EVENT_ACTIONS.INVALID_LISTEN_REGEX) {
            this.services.logger.error(message);
            return;
        }
        this.services.logger.error(message, constants_1.EVENT.UNSOLICITED_MESSAGE);
    }
    /**
     * Resubscribes to events when connection is lost
     */
    resubscribe() {
        const callbacks = this.emitter.eventNames();
        for (const name of callbacks) {
            this.sendSubscriptionMessage(name);
        }
    }
    sendSubscriptionMessage(name) {
        const message = {
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
            name
        };
        this.services.timeoutRegistry.add({ message });
        this.services.connection.sendMessage(message);
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=event-handler.js.map