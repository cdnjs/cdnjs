"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var constants_1 = require("../constants");
var rpc_1 = require("../rpc/rpc");
var rpc_response_1 = require("../rpc/rpc-response");
var utils_1 = require("../util/utils");
var RPCHandler = /** @class */ (function () {
    function RPCHandler(services, options) {
        this.services = services;
        this.options = options;
        this.rpcs = new Map();
        this.providers = new Map();
        this.limboQueue = [];
        this.services.connection.registerHandler(message_constants_1.TOPIC.RPC, this.handle.bind(this));
        this.services.connection.onReestablished(this.onConnectionReestablished.bind(this));
        this.services.connection.onExitLimbo(this.onExitLimbo.bind(this));
        this.services.connection.onLost(this.onConnectionLost.bind(this));
    }
    /**
     * Registers a callback function as a RPC provider. If another connected client calls
     * client.rpc.make() the request will be routed to this method
     *
     * The callback will be invoked with two arguments:
     *     {Mixed} data The data passed to the client.rpc.make function
     *     {RpcResponse} rpcResponse An object with methods to response,
     *                               acknowledge or reject the request
     *
     * Only one callback can be registered for a RPC at a time
     *
     * Please note: Deepstream tries to deliver data in its original format.
     * Data passed to client.rpc.make as a String will arrive as a String,
     * numbers or implicitly JSON serialized objects will arrive in their
     * respective format as well
     */
    RPCHandler.prototype.provide = function (name, callback) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (this.providers.has(name)) {
            throw new Error("RPC " + name + " already registered");
        }
        if (typeof callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        this.providers.set(name, callback);
        if (this.services.connection.isConnected) {
            this.sendProvide(name);
        }
    };
    /**
     * Unregisters this client as a provider for a remote procedure call
     */
    RPCHandler.prototype.unprovide = function (name) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (!this.providers.has(name)) {
            this.services.logger.warn({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.NOT_PROVIDED,
                name: name
            });
            return;
        }
        this.providers.delete(name);
        if (this.services.connection.isConnected) {
            var message = { topic: message_constants_1.TOPIC.RPC, action: message_constants_1.RPC_ACTIONS.UNPROVIDE, name: name };
            this.services.timeoutRegistry.add({ message: message });
            this.services.connection.sendMessage(message);
            return;
        }
    };
    RPCHandler.prototype.make = function (name, data, callback) {
        var _this = this;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (callback && typeof callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        var correlationId = utils_1.getUid();
        if (this.services.connection.isConnected) {
            if (callback) {
                this.rpcs.set(correlationId, new rpc_1.RPC(name, correlationId, data, callback, this.options, this.services));
                return;
            }
            return new Promise(function (resolve, reject) {
                _this.rpcs.set(correlationId, new rpc_1.RPC(name, correlationId, data, function (error, result) { return error ? reject(error) : resolve(result); }, _this.options, _this.services));
            });
        }
        else if (this.services.connection.isInLimbo) {
            if (callback) {
                this.limboQueue.push({ correlationId: correlationId, name: name, data: data, callback: callback });
            }
            else {
                return new Promise(function (resolve, reject) {
                    _this.limboQueue.push({ correlationId: correlationId, name: name, data: data, callback: function (error, result) { return error ? reject(error) : resolve(result); } });
                });
            }
        }
        else {
            if (callback) {
                callback(constants_1.EVENT.CLIENT_OFFLINE);
            }
            else {
                return Promise.reject(constants_1.EVENT.CLIENT_OFFLINE);
            }
        }
    };
    /**
     * Handles incoming rpc REQUEST messages. Instantiates a new response object
     * and invokes the provider callback or rejects the request if no rpc provider
     * is present (which shouldn't really happen, but might be the result of a race condition
     * if this client sends a unprovide message whilst an incoming request is already in flight)
     */
    RPCHandler.prototype.respondToRpc = function (message) {
        var provider = this.providers.get(message.name);
        if (provider) {
            provider(message.parsedData, new rpc_response_1.RPCResponse(message, this.options, this.services));
        }
        else {
            this.services.connection.sendMessage({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.REJECT,
                name: message.name,
                correlationId: message.correlationId
            });
        }
    };
    /**
     * Distributes incoming messages from the server
     * based on their action
     */
    RPCHandler.prototype.handle = function (message) {
        // RPC Requests
        if (message.action === message_constants_1.RPC_ACTIONS.REQUEST) {
            this.respondToRpc(message);
            return;
        }
        // RPC subscription Acks
        if (message.isAck) {
            this.services.timeoutRegistry.remove(message);
            return;
        }
        // handle auth/denied subscription errors
        if (message.action === message_constants_1.RPC_ACTIONS.MESSAGE_PERMISSION_ERROR || message.action === message_constants_1.RPC_ACTIONS.MESSAGE_DENIED) {
            if (message.originalAction === message_constants_1.RPC_ACTIONS.PROVIDE || message.originalAction === message_constants_1.RPC_ACTIONS.UNPROVIDE) {
                this.services.timeoutRegistry.remove(message);
                this.providers.delete(message.name);
                this.services.logger.error(message);
                return;
            }
            if (message.originalAction === message_constants_1.RPC_ACTIONS.REQUEST) {
                var invalidRPC = this.getRPC(message);
                if (invalidRPC) {
                    invalidRPC.error(message_constants_1.RPC_ACTIONS[message.action]);
                    this.rpcs.delete(message.correlationId);
                    return;
                }
            }
        }
        // RPC Responses
        var rpc = this.getRPC(message);
        if (rpc) {
            if (message.action === message_constants_1.RPC_ACTIONS.ACCEPT) {
                rpc.accept();
                return;
            }
            if (message.action === message_constants_1.RPC_ACTIONS.RESPONSE) {
                rpc.respond(message.parsedData);
            }
            else if (message.action === message_constants_1.RPC_ACTIONS.REQUEST_ERROR) {
                rpc.error(message.parsedData);
            }
            else if (message.action === message_constants_1.RPC_ACTIONS.RESPONSE_TIMEOUT ||
                message.action === message_constants_1.RPC_ACTIONS.NO_RPC_PROVIDER) {
                rpc.error(message_constants_1.RPC_ACTIONS[message.action]);
            }
            this.rpcs.delete(message.correlationId);
        }
    };
    RPCHandler.prototype.getRPC = function (message) {
        var rpc = this.rpcs.get(message.correlationId);
        if (rpc === undefined) {
            this.services.logger.error(message, constants_1.EVENT.UNKNOWN_CORRELATION_ID);
        }
        return rpc;
    };
    RPCHandler.prototype.sendProvide = function (name) {
        var message = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.PROVIDE,
            name: name
        };
        this.services.timeoutRegistry.add({ message: message });
        this.services.connection.sendMessage(message);
    };
    RPCHandler.prototype.onConnectionReestablished = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.providers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 1), name_1 = _d[0];
                this.sendProvide(name_1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        for (var i = 0; i < this.limboQueue.length; i++) {
            var _e = this.limboQueue[i], correlationId = _e.correlationId, name_2 = _e.name, data = _e.data, callback = _e.callback;
            this.rpcs.set(correlationId, new rpc_1.RPC(name_2, correlationId, data, callback, this.options, this.services));
        }
        this.limboQueue = [];
    };
    RPCHandler.prototype.onExitLimbo = function () {
        for (var i = 0; i < this.limboQueue.length; i++) {
            this.limboQueue[i].callback(constants_1.EVENT.CLIENT_OFFLINE);
        }
        this.limboQueue = [];
    };
    RPCHandler.prototype.onConnectionLost = function () {
        this.rpcs.forEach(function (rpc) {
            rpc.error(constants_1.EVENT.CLIENT_OFFLINE);
        });
        this.rpcs.clear();
    };
    return RPCHandler;
}());
exports.RPCHandler = RPCHandler;
