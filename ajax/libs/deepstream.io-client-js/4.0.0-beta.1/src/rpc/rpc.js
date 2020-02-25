"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_constants_1 = require("../../binary-protocol/src/message-constants");
/**
 * This class represents a single remote procedure
 * call made from the client to the server. It's main function
 * is to encapsulate the logic around timeouts and to convert the
 * incoming response data
 */
class RPC {
    constructor(name, correlationId, response, options, services) {
        this.options = options;
        this.services = services;
        this.name = name;
        this.response = response;
        this.acceptTimeout = this.services.timeoutRegistry.add({
            message: {
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.ACCEPT,
                name,
                correlationId
            },
            event: message_constants_1.RPC_ACTIONS.ACCEPT_TIMEOUT,
            duration: this.options.rpcAcceptTimeout,
            callback: this.onTimeout.bind(this)
        });
        this.responseTimeout = this.services.timeoutRegistry.add({
            message: {
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.REQUEST,
                name,
                correlationId
            },
            event: message_constants_1.RPC_ACTIONS.RESPONSE_TIMEOUT,
            duration: this.options.rpcResponseTimeout,
            callback: this.onTimeout.bind(this)
        });
    }
    /**
     * Called once an ack message is received from the server
     */
    accept() {
        this.services.timeoutRegistry.clear(this.acceptTimeout);
    }
    /**
     * Called once a response message is received from the server.
     */
    respond(data) {
        this.response(null, data);
        this.complete();
    }
    /**
     * Called once an error is received from the server.
     */
    error(data) {
        this.response(data);
        this.complete();
    }
    /**
     * Callback for error messages received from the server. Once
     * an error is received the request is considered completed. Even
     * if a response arrives later on it will be ignored / cause an
     * UNSOLICITED_MESSAGE error
     */
    onTimeout(event, message) {
        this.response(message_constants_1.RPC_ACTIONS[event]);
        this.complete();
    }
    /**
     * Called after either an error or a response
     * was received
    */
    complete() {
        this.services.timeoutRegistry.clear(this.acceptTimeout);
        this.services.timeoutRegistry.clear(this.responseTimeout);
    }
}
exports.RPC = RPC;
//# sourceMappingURL=rpc.js.map