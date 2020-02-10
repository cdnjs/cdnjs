"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
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
        this.options = options;
        this.services = services;
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
            return -1;
        }
        this.remove(timeout.message);
        const internalTimeout = Object.assign({}, {
            timerId: -1,
            uniqueName: this.getUniqueName(timeout.message),
            event: timeout.event
        }, { timeout });
        internalTimeout.timerId = this.services.timerRegistry.add({
            context: this,
            callback: this.onTimeout,
            duration: timeout.duration,
            data: internalTimeout
        });
        this.register.set(internalTimeout.timerId, internalTimeout);
        return internalTimeout.timerId;
    }
    /**
     * Remove an entry
     */
    remove(message) {
        const uniqueName = this.getUniqueName(message);
        for (const [timerId, timeout] of this.register) {
            if (timeout.uniqueName === uniqueName) {
                clearTimeout(timerId);
                this.register.delete(timerId);
            }
        }
    }
    /**
     * Processes an incoming ACK-message and removes the corresponding subscription
     */
    clear(timerId) {
        this.services.timerRegistry.remove(timerId);
        this.register.delete(timerId);
    }
    /**
     * Will be invoked if the timeout has occured before the ack message was received
     */
    onTimeout(internalTimeout) {
        this.register.delete(internalTimeout.timerId);
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
        for (const [timerId, timer] of this.register) {
            clearTimeout(timer.timerId);
            this.register.delete(timer.timerId);
        }
    }
}
exports.TimeoutRegistry = TimeoutRegistry;
//# sourceMappingURL=timeout-registry.js.map