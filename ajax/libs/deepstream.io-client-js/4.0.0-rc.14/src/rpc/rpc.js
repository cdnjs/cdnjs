"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_constants_1 = require("../../binary-protocol/src/message-constants");
/**
 * This class represents a single remote procedure
 * call made from the client to the server. It's main function
 * is to encapsulate the logic around timeouts and to convert the
 * incoming response data
 */
var RPC = /** @class */ (function () {
    function RPC(name, correlationId, data, response, options, services) {
        this.name = name;
        this.correlationId = correlationId;
        this.response = response;
        this.options = options;
        this.services = services;
        this.onTimeout = this.onTimeout.bind(this);
        var message = {
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REQUEST,
            correlationId: correlationId,
            name: name,
            parsedData: data
        };
        this.acceptTimeout = this.services.timeoutRegistry.add({
            message: {
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.ACCEPT,
                name: this.name,
                correlationId: this.correlationId
            },
            event: message_constants_1.RPC_ACTIONS.ACCEPT_TIMEOUT,
            duration: this.options.rpcAcceptTimeout,
            callback: this.onTimeout
        });
        this.responseTimeout = this.services.timeoutRegistry.add({
            message: {
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.REQUEST,
                name: this.name,
                correlationId: this.correlationId
            },
            event: message_constants_1.RPC_ACTIONS.RESPONSE_TIMEOUT,
            duration: this.options.rpcResponseTimeout,
            callback: this.onTimeout
        });
        this.services.connection.sendMessage(message);
    }
    /**
     * Called once an ack message is received from the server
     */
    RPC.prototype.accept = function () {
        this.services.timeoutRegistry.clear(this.acceptTimeout);
    };
    /**
     * Called once a response message is received from the server.
     */
    RPC.prototype.respond = function (data) {
        this.response(null, data);
        this.complete();
    };
    /**
     * Called once an error is received from the server.
     */
    RPC.prototype.error = function (data) {
        this.response(data);
        this.complete();
    };
    /**
     * Callback for error messages received from the server. Once
     * an error is received the request is considered completed. Even
     * if a response arrives later on it will be ignored / cause an
     * UNSOLICITED_MESSAGE error
     */
    RPC.prototype.onTimeout = function (event, message) {
        this.response(message_constants_1.RPC_ACTIONS[event]);
        this.complete();
    };
    /**
     * Called after either an error or a response
     * was received
    */
    RPC.prototype.complete = function () {
        this.services.timeoutRegistry.clear(this.acceptTimeout);
        this.services.timeoutRegistry.clear(this.responseTimeout);
    };
    return RPC;
}());
exports.RPC = RPC;
