"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var constants_1 = require("../constants");
var listener_1 = require("../util/listener");
var Emitter = require("component-emitter2");
var bulk_subscription_service_1 = require("../util/bulk-subscription-service");
var EventHandler = /** @class */ (function () {
    function EventHandler(services, options, listeners) {
        this.services = services;
        this.emitter = new Emitter();
        this.limboQueue = [];
        this.bulkSubscription = new bulk_subscription_service_1.BulkSubscriptionService(this.services, options.subscriptionInterval, message_constants_1.TOPIC.EVENT, message_constants_1.EVENT_ACTIONS.SUBSCRIBE_BULK, message_constants_1.EVENT_ACTIONS.SUBSCRIBE, message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE_BULK, message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE, this.onBulkSubscriptionSent.bind(this));
        this.listeners = listeners || new listener_1.Listener(message_constants_1.TOPIC.EVENT, services);
        this.services.connection.registerHandler(message_constants_1.TOPIC.EVENT, this.handle.bind(this));
        this.services.connection.onExitLimbo(this.onExitLimbo.bind(this));
        this.services.connection.onReestablished(this.onConnectionReestablished.bind(this));
    }
    /**
    * Subscribe to an event. This will receive both locally emitted events
    * as well as events emitted by other connected clients.
    */
    EventHandler.prototype.subscribe = function (name, callback) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (typeof callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        if (!this.emitter.hasListeners(name)) {
            if (this.services.connection.isConnected) {
                this.bulkSubscription.subscribe(name);
            }
        }
        this.emitter.on(name, callback);
    };
    /**
     * Removes a callback for a specified event. If all callbacks
     * for an event have been removed, the server will be notified
     * that the client is unsubscribed as a listener
     */
    EventHandler.prototype.unsubscribe = function (name, callback) {
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
                name: name
            });
            return;
        }
        this.emitter.off(name, callback);
        if (!this.emitter.hasListeners(name)) {
            this.bulkSubscription.unsubscribe(name);
        }
    };
    /**
     * Emits an event locally and sends a message to the server to
     * broadcast the event to the other connected clients
     */
    EventHandler.prototype.emit = function (name, data) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        var message = {
            topic: message_constants_1.TOPIC.EVENT,
            action: message_constants_1.EVENT_ACTIONS.EMIT,
            name: name,
            parsedData: data
        };
        if (this.services.connection.isConnected) {
            this.services.connection.sendMessage(message);
        }
        else if (this.services.connection.isInLimbo) {
            this.limboQueue.push(message);
        }
        this.emitter.emit(name, data);
    };
    /**
   * Allows to listen for event subscriptions made by this or other clients. This
   * is useful to create "active" data providers, e.g. providers that only provide
   * data for a particular event if a user is actually interested in it
   */
    EventHandler.prototype.listen = function (pattern, callback) {
        this.listeners.listen(pattern, callback);
    };
    /**
     * Removes a listener that was previously registered
     */
    EventHandler.prototype.unlisten = function (pattern) {
        this.listeners.unlisten(pattern);
    };
    /**
   * Handles incoming messages from the server
   */
    EventHandler.prototype.handle = function (message) {
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
    };
    /**
     * Resubscribes to events when connection is lost
     */
    EventHandler.prototype.onConnectionReestablished = function () {
        this.bulkSubscription.subscribeList(this.emitter.eventNames());
        for (var i = 0; i < this.limboQueue.length; i++) {
            this.services.connection.sendMessage(this.limboQueue[i]);
        }
        this.limboQueue = [];
    };
    EventHandler.prototype.onExitLimbo = function () {
        this.limboQueue = [];
    };
    EventHandler.prototype.onBulkSubscriptionSent = function (message) {
        if (!message.names) {
            this.services.timeoutRegistry.add({ message: message });
        }
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
