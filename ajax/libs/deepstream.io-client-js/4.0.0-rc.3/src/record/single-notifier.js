"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const constants_1 = require("../constants");
/**
 * Provides a scaffold for subscriptionless requests to deepstream, such as the SNAPSHOT
 * and HAS functionality. The SingleNotifier multiplexes all the client requests so
 * that they can can be notified at once, and also includes reconnection funcionality
 * incase the connection drops.
 *
 * @param {Services} services          The deepstream client
 * @param {Options} options     Function to call to allow resubscribing
 *
 * @constructor
 */
class SingleNotifier {
    constructor(services, action, timeoutDuration) {
        this.services = services;
        this.action = action;
        this.requests = new Map();
        this.internalRequests = new Map();
        this.limboQueue = [];
        this.services.connection.onLost(this.onConnectionLost.bind(this));
        this.services.connection.onExitLimbo(this.onExitLimbo.bind(this));
        this.services.connection.onReestablished(this.onConnectionReestablished.bind(this));
    }
    /**
     * Add a request. If one has already been made it will skip the server request
     * and multiplex the response
     *
     * @param {String} name An identifier for the request, e.g. a record name
     * @param {Object} response An object with property `callback` or `resolve` and `reject`
     *
     * @public
     * @returns {void}
     */
    request(name, callback) {
        const req = this.requests.get(name);
        if (req) {
            req.push(callback);
            return;
        }
        this.requests.set(name, [callback]);
        const message = {
            topic: message_constants_1.TOPIC.RECORD,
            action: this.action,
            name
        };
        if (this.services.connection.isConnected) {
            this.services.connection.sendMessage(message);
            this.services.timeoutRegistry.add({ message });
        }
        else if (this.services.connection.isInLimbo) {
            this.limboQueue.push(message);
        }
        else {
            callback(constants_1.EVENT.CLIENT_OFFLINE);
        }
    }
    /**
     * Adds a callback to a (possibly) inflight request that will be called
     * on the response.
     */
    register(name, context, callback) {
        const request = this.internalRequests.get(name);
        if (!request) {
            this.internalRequests.set(name, [{ callback, context }]);
        }
        else {
            request.push({ callback, context });
        }
    }
    recieve(message, error, data) {
        this.services.timeoutRegistry.remove(message);
        const name = message.name;
        const responses = this.requests.get(name) || [];
        const internalResponses = this.internalRequests.get(name) || [];
        if (!responses && !internalResponses) {
            return;
        }
        for (let i = 0; i < internalResponses.length; i++) {
            internalResponses[i].callback.call(internalResponses[i].context, message);
        }
        this.internalRequests.delete(name);
        // todo we can clean this up and do cb = (error, data) => error ? reject(error) : resolve()
        for (let i = 0; i < responses.length; i++) {
            responses[i](error, data);
        }
        this.requests.delete(name);
        return;
    }
    onConnectionLost() {
        this.requests.forEach(responses => {
            responses.forEach(response => response(constants_1.EVENT.CLIENT_OFFLINE));
        });
        this.requests.clear();
    }
    onExitLimbo() {
        for (let i = 0; i < this.limboQueue.length; i++) {
            const message = this.limboQueue[i];
            const requests = this.requests.get(message.name);
            if (requests) {
                requests.forEach(cb => cb(constants_1.EVENT.CLIENT_OFFLINE));
            }
        }
        this.requests.clear();
        this.limboQueue = [];
    }
    onConnectionReestablished() {
        for (let i = 0; i < this.limboQueue.length; i++) {
            const message = this.limboQueue[i];
            this.services.connection.sendMessage(message);
            this.services.timeoutRegistry.add({ message });
        }
    }
}
exports.SingleNotifier = SingleNotifier;
//# sourceMappingURL=single-notifier.js.map