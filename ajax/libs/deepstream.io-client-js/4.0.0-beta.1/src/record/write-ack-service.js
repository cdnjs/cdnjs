"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const utils_1 = require("../../binary-protocol/src/utils");
const client_1 = require("../client");
/**
 * @param {Services} services
 *
 * @constructor
 */
class WriteAcknowledgementService {
    constructor(services) {
        this.services = services;
        this.responses = new Map();
        this.count = 1;
        this.services.connection.onLost(this.onConnectionLost.bind(this));
    }
    /**
   * Send message with write ack callback.
   *
   * @param {Message} message
   * @param {Function} callback
   *
   * @public
   * @returns {void}
   */
    send(message, callback) {
        if (this.services.connection.isConnected === false) {
            this.services.timerRegistry.requestIdleCallback(callback.bind(this, client_1.EVENT.CLIENT_OFFLINE));
            return;
        }
        const correlationId = this.count.toString();
        this.responses.set(correlationId, callback);
        this.services.connection.sendMessage(Object.assign({}, message, { correlationId, action: utils_1.ACTION_TO_WRITE_ACK[message.action] }));
        this.count++;
    }
    recieve(message) {
        const id = message.correlationId;
        const response = this.responses.get(id);
        if (!response ||
            (message.action !== message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT && !message.isError)) {
            return;
        }
        message.isError
            ? response(message_constants_1.RECORD_ACTIONS[message.action])
            : response(null);
        this.responses.delete(id);
    }
    onConnectionLost() {
        this.responses.forEach(response => {
            response(client_1.EVENT.CLIENT_OFFLINE);
        });
        this.responses.clear();
    }
}
exports.WriteAcknowledgementService = WriteAcknowledgementService;
//# sourceMappingURL=write-ack-service.js.map