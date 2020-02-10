"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const utils_1 = require("../../binary-protocol/src/utils");
const EventEmitter = require("component-emitter2");
/**
 * Subscriptions to events are in a pending state until deepstream acknowledges
 * them. This is a pattern that's used by numerour classes. This registry aims
 * to centralise the functionality necessary to keep track of subscriptions and
 * their respective timeouts.
 */
class TimeoutRegistry extends EventEmitter {
    constructor(services, options) {
        super();
        this.services = services;
        this.options = options;
        this.register = new Map();
    }
    /**
     * Add an entry
     */
    add(timeout) {
        if (timeout.duration === undefined) {
            timeout.duration = this.options.subscriptionTimeout;
        }
        if (timeout.event === undefined) {
            timeout.event = constants_1.EVENT.ACK_TIMEOUT;
        }
        /*
        if (timeout.duration < 1) {
          should we throw an error?
          return -1
        }
        */
        if (!this.services.connection.isConnected) {
            return null;
        }
        this.remove(timeout.message);
        const internalTimeout = {
            timerId: -1,
            uniqueName: this.getUniqueName(timeout.message),
            // event: timeout.event,
            timeout
        };
        internalTimeout.timerId = this.services.timerRegistry.add({
            context: this,
            callback: this.onTimeout,
            duration: timeout.duration,
            data: internalTimeout
        });
        this.register.set(internalTimeout.uniqueName, internalTimeout);
        return internalTimeout.uniqueName;
    }
    /**
     * Remove an entry
     */
    remove(message) {
        let requestMsg;
        const action = utils_1.RESPONSE_TO_REQUEST[message.topic][message.action];
        if (!action) {
            requestMsg = message;
        }
        else {
            requestMsg = Object.assign({}, message, { action });
        }
        const uniqueName = this.getUniqueName(requestMsg);
        this.clear(uniqueName);
    }
    /**
     * Processes an incoming ACK-message and removes the corresponding subscription
     */
    clear(uniqueName) {
        const timeout = this.register.get(uniqueName);
        if (timeout) {
            this.register.delete(uniqueName);
            this.services.timerRegistry.remove(timeout.timerId);
        }
    }
    /**
     * Will be invoked if the timeout has occured before the ack message was received
     */
    onTimeout(internalTimeout) {
        this.register.delete(internalTimeout.uniqueName);
        const timeout = internalTimeout.timeout;
        if (timeout.callback) {
            timeout.callback(timeout.event, timeout.message);
        }
        else {
            this.services.logger.warn(timeout.message, timeout.event);
        }
    }
    /**
     * Returns a unique name from the timeout
     */
    getUniqueName(message) {
        const action = message.originalAction || message.action;
        let name = `${message.topic}${action}_`;
        if (message.correlationId) {
            name += message.correlationId;
        }
        else if (message.name) {
            name += message.name;
        }
        return name;
    }
    /**
     * Remote all timeouts when connection disconnects
     */
    onConnectionLost() {
        for (const [uniqueName, timeout] of this.register) {
            this.services.timerRegistry.remove(timeout.timerId);
            this.register.delete(uniqueName);
        }
    }
}
exports.TimeoutRegistry = TimeoutRegistry;
//# sourceMappingURL=timeout-registry.js.map