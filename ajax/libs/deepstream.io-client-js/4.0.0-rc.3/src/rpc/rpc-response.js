"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_constants_1 = require("../../binary-protocol/src/message-constants");
/**
 * This class represents a single remote procedure
 * call made from the client to the server. It's main function
 * is to encapsulate the logic around timeouts and to convert the
 * incoming response data
 */
class RPCResponse {
    constructor(message, options, services) {
        this.name = message.name;
        this.correlationId = message.correlationId;
        this.services = services;
        this.isAccepted = false;
        this.isComplete = false;
        this.autoAccept = true;
        this.services.timerRegistry.requestIdleCallback(this.performAutoAck.bind(this));
    }
    /**
     * Acknowledges the receipt of the request. This
     * will happen implicitly unless the request callback
     * explicitly sets autoAck to false
     */
    accept() {
        if (this.isAccepted === false) {
            this.services.connection.sendMessage({
                topic: message_constants_1.TOPIC.RPC,
                action: message_constants_1.RPC_ACTIONS.ACCEPT,
                name: this.name,
                correlationId: this.correlationId
            });
            this.isAccepted = true;
        }
    }
    /**
     * Reject the request. This might be necessary if the client
     * is already processing a large number of requests. If deepstream
     * receives a rejection message it will try to route the request to
     * another provider - or return a NO_RPC_PROVIDER error if there are no
     * providers left
     */
    reject() {
        if (this.isComplete === true) {
            throw new Error(`Rpc ${this.name} already completed`);
        }
        this.autoAccept = false;
        this.isComplete = true;
        this.isAccepted = true;
        this.services.connection.sendMessage({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REJECT,
            name: this.name,
            correlationId: this.correlationId
        });
    }
    /**
     * Notifies the server that an error has occured while trying to process the request.
     * This will complete the rpc.
     */
    error(error) {
        if (this.isComplete === true) {
            throw new Error(`Rpc ${this.name} already completed`);
        }
        this.autoAccept = false;
        this.isComplete = true;
        this.isAccepted = true;
        this.services.connection.sendMessage({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.REQUEST_ERROR,
            name: this.name,
            correlationId: this.correlationId,
            parsedData: error
        });
    }
    /**
     * Completes the request by sending the response data
     * to the server. If data is an array or object it will
     * automatically be serialised.
     * If autoAck is disabled and the response is sent before
     * the ack message the request will still be completed and the
     * ack message ignored
     */
    send(data) {
        if (this.isComplete === true) {
            throw new Error(`Rpc ${this.name} already completed`);
        }
        this.accept();
        this.services.connection.sendMessage({
            topic: message_constants_1.TOPIC.RPC,
            action: message_constants_1.RPC_ACTIONS.RESPONSE,
            name: this.name,
            correlationId: this.correlationId,
            parsedData: data
        });
        this.isComplete = true;
    }
    /**
     * Callback for the autoAck timeout. Executes ack
     * if autoAck is not disabled
     */
    performAutoAck() {
        if (this.autoAccept === true) {
            this.accept();
        }
    }
}
exports.RPCResponse = RPCResponse;
//# sourceMappingURL=rpc-response.js.map