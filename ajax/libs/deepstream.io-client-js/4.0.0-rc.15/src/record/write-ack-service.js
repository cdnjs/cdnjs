"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var utils_1 = require("../../binary-protocol/src/utils");
var constants_1 = require("../constants");
var WriteAcknowledgementService = /** @class */ (function () {
    function WriteAcknowledgementService(services) {
        this.services = services;
        this.responses = new Map();
        this.count = 1;
        this.services.connection.onLost(this.onConnectionLost.bind(this));
    }
    /**
     * Send message with write ack callback.
     */
    WriteAcknowledgementService.prototype.send = function (message, callback) {
        if (this.services.connection.isConnected === false) {
            this.services.timerRegistry.requestIdleCallback(callback.bind(this, constants_1.EVENT.CLIENT_OFFLINE));
            return;
        }
        var correlationId = this.count.toString();
        this.responses.set(correlationId, callback);
        this.services.connection.sendMessage(Object.assign({}, message, { correlationId: correlationId, action: utils_1.ACTION_TO_WRITE_ACK[message.action] }));
        this.count++;
    };
    WriteAcknowledgementService.prototype.recieve = function (message) {
        var id = message.correlationId;
        var response = this.responses.get(id);
        if (!response ||
            (message.action !== message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT && !message.isError)) {
            return;
        }
        message.isError
            ? response(message_constants_1.RECORD_ACTIONS[message.action])
            : response(null);
        this.responses.delete(id);
    };
    WriteAcknowledgementService.prototype.onConnectionLost = function () {
        this.responses.forEach(function (response) { return response(constants_1.EVENT.CLIENT_OFFLINE); });
        this.responses.clear();
    };
    return WriteAcknowledgementService;
}());
exports.WriteAcknowledgementService = WriteAcknowledgementService;
