"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
function isEvent(action) {
    // @ts-ignore
    return constants_1.EVENT[action] !== undefined;
}
var Logger = /** @class */ (function () {
    function Logger(emitter) {
        this.emitter = emitter;
    }
    Logger.prototype.warn = function (message, event, meta) {
        var warnMessage = "Warning: " + message_constants_1.TOPIC[message.topic];
        var action = message.action;
        if (action) {
            warnMessage += " (" + message_constants_1.ACTIONS[message.topic][action] + ")";
        }
        if (event) {
            warnMessage += ": " + constants_1.EVENT[event];
        }
        if (meta) {
            warnMessage += " \u2013 " + (typeof meta === 'string' ? meta : JSON.stringify(meta));
        }
        // tslint:disable-next-line:no-console
        console.warn(warnMessage);
    };
    Logger.prototype.error = function (message, event, meta) {
        if (isEvent(event)) {
            if (event === constants_1.EVENT.IS_CLOSED) {
                this.emitter.emit('error', meta, constants_1.EVENT[event], message_constants_1.TOPIC[message_constants_1.TOPIC.CONNECTION]);
            }
            else if (event === constants_1.EVENT.CONNECTION_ERROR) {
                this.emitter.emit('error', meta, constants_1.EVENT[event], message_constants_1.TOPIC[message_constants_1.TOPIC.CONNECTION]);
            }
        }
        else {
            var action = event ? event : message.action;
            this.emitter.emit('error', meta, message_constants_1.ACTIONS[message.topic][action], message_constants_1.TOPIC[message.topic]);
        }
    };
    return Logger;
}());
exports.Logger = Logger;
