"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var constants_1 = require("../constants");
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
var SingleNotifier = /** @class */ (function () {
    function SingleNotifier(services, action, timeoutDuration) {
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
    SingleNotifier.prototype.request = function (name, callback) {
        var req = this.requests.get(name);
        if (req) {
            req.push(callback);
            return;
        }
        this.requests.set(name, [callback]);
        var message = {
            topic: message_constants_1.TOPIC.RECORD,
            action: this.action,
            name: name
        };
        if (this.services.connection.isConnected) {
            this.services.connection.sendMessage(message);
            this.services.timeoutRegistry.add({ message: message });
        }
        else if (this.services.connection.isInLimbo) {
            this.limboQueue.push(message);
        }
        else {
            callback(constants_1.EVENT.CLIENT_OFFLINE);
        }
    };
    /**
     * Adds a callback to a (possibly) inflight request that will be called
     * on the response.
     */
    SingleNotifier.prototype.register = function (name, context, callback) {
        var request = this.internalRequests.get(name);
        if (!request) {
            this.internalRequests.set(name, [{ callback: callback, context: context }]);
        }
        else {
            request.push({ callback: callback, context: context });
        }
    };
    SingleNotifier.prototype.recieve = function (message, error, data) {
        this.services.timeoutRegistry.remove(message);
        var name = message.name;
        var responses = this.requests.get(name) || [];
        var internalResponses = this.internalRequests.get(name) || [];
        if (!responses && !internalResponses) {
            return;
        }
        for (var i = 0; i < internalResponses.length; i++) {
            internalResponses[i].callback.call(internalResponses[i].context, message);
        }
        this.internalRequests.delete(name);
        // todo we can clean this up and do cb = (error, data) => error ? reject(error) : resolve()
        for (var i = 0; i < responses.length; i++) {
            responses[i](error, data);
        }
        this.requests.delete(name);
        return;
    };
    SingleNotifier.prototype.onConnectionLost = function () {
        this.requests.forEach(function (responses) {
            responses.forEach(function (response) { return response(constants_1.EVENT.CLIENT_OFFLINE); });
        });
        this.requests.clear();
    };
    SingleNotifier.prototype.onExitLimbo = function () {
        for (var i = 0; i < this.limboQueue.length; i++) {
            var message = this.limboQueue[i];
            var requests = this.requests.get(message.name);
            if (requests) {
                requests.forEach(function (cb) { return cb(constants_1.EVENT.CLIENT_OFFLINE); });
            }
        }
        this.requests.clear();
        this.limboQueue = [];
    };
    SingleNotifier.prototype.onConnectionReestablished = function () {
        for (var i = 0; i < this.limboQueue.length; i++) {
            var message = this.limboQueue[i];
            this.services.connection.sendMessage(message);
            this.services.timeoutRegistry.add({ message: message });
        }
    };
    return SingleNotifier;
}());
exports.SingleNotifier = SingleNotifier;
