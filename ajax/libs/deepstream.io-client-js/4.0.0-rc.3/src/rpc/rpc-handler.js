"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const constants_1 = require("../constants");
const rpc_1 = require("../rpc/rpc");
const rpc_response_1 = require("../rpc/rpc-response");
const utils_1 = require("../util/utils");
class RPCHandler {
    constructor(services, options) {
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
    provide(name, callback) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (this.providers.has(name)) {
            throw new Error(`RPC ${name} already registered`);
        }
        if (typeof callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        this.providers.set(name, callback);
        if (this.services.connection.isConnected) {
            this.sendProvide(name);
        }
    }
    /**
     * Unregisters this client as a provider for a remote procedure call
     */
    unprovide(name) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (!this.providers.has(name)) {
            this.services.logger.warn({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.NOT_PROVIDED,
                name
            });
            return;
        }
        this.providers.delete(name);
        if (this.services.connection.isConnected) {
            const message = { topic: message_constants_1.TOPIC.RPC, action: message_constants_1.RPC_ACTIONS.UNPROVIDE, name };
            this.services.timeoutRegistry.add({ message });
            this.services.connection.sendMessage(message);
            return;
        }
    }
    make(name, data, callback) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        if (callback && typeof callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        const correlationId = utils_1.getUid();
        if (this.services.connection.isConnected) {
            if (callback) {
                this.rpcs.set(correlationId, new rpc_1.RPC(name, correlationId, data, callback, this.options, this.services));
                return;
            }
            return new Promise((resolve, reject) => {
                this.rpcs.set(correlationId, new rpc_1.RPC(name, correlationId, data, (error, result) => error ? reject(error) : resolve(result), this.options, this.services));
            });
        }
        else if (this.services.connection.isInLimbo) {
            if (callback) {
                this.limboQueue.push({ correlationId, name, data, callback });
            }
            else {
                return new Promise((resolve, reject) => {
                    this.limboQueue.push({ correlationId, name, data, callback: (error, result) => error ? reject(error) : resolve(result) });
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
    }
    /**
     * Handles incoming rpc REQUEST messages. Instantiates a new response object
     * and invokes the provider callback or rejects the request if no rpc provider
     * is present (which shouldn't really happen, but might be the result of a race condition
     * if this client sends a unprovide message whilst an incoming request is already in flight)
     */
    respondToRpc(message) {
        const provider = this.providers.get(message.name);
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
    }
    /**
     * Distributes incoming messages from the server
     * based on their action
     */
    handle(message) {
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
                const invalidRPC = this.getRPC(message);
                if (invalidRPC) {
                    invalidRPC.error(message_constants_1.RPC_ACTIONS[message.action]);
                    this.rpcs.delete(message.correlationId);
                    return;
                }
            }
        }
        // RPC Responses
        const rpc = this.getRPC(message);
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
    }
    getRPC(message) {
        const rpc = this.rpcs.get(message.correlationId);
        if (rpc === undefined) {
            this.services.logger.error(message, constants_1.EVENT.UNKNOWN_CORRELATION_ID);
        }
        return rpc;
    }
    sendProvide(name) {
        const message = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.PROVIDE,
            name
        };
        this.services.timeoutRegistry.add({ message });
        this.services.connection.sendMessage(message);
    }
    onConnectionReestablished() {
        for (const [name] of this.providers) {
            this.sendProvide(name);
        }
        for (let i = 0; i < this.limboQueue.length; i++) {
            const { correlationId, name, data, callback } = this.limboQueue[i];
            this.rpcs.set(correlationId, new rpc_1.RPC(name, correlationId, data, callback, this.options, this.services));
        }
        this.limboQueue = [];
    }
    onExitLimbo() {
        for (let i = 0; i < this.limboQueue.length; i++) {
            this.limboQueue[i].callback(constants_1.EVENT.CLIENT_OFFLINE);
        }
        this.limboQueue = [];
    }
    onConnectionLost() {
        this.rpcs.forEach(rpc => {
            rpc.error(constants_1.EVENT.CLIENT_OFFLINE);
        });
        this.rpcs.clear();
    }
}
exports.RPCHandler = RPCHandler;
//# sourceMappingURL=rpc-handler.js.map