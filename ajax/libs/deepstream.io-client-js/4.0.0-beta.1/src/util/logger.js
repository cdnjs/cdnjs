"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
function isEvent(action) {
    return constants_1.EVENT[action] !== undefined;
}
class Logger {
    constructor(emitter) {
        this.emitter = emitter;
    }
    warn(message, event, meta) {
        // tslint:disable-next-line:no-console
        let warnMessage = `Warning: ${message_constants_1.TOPIC[message.topic]}`;
        const action = message.action;
        if (action) {
            warnMessage += ` (${message_constants_1.ACTIONS[message.topic][action]})`;
        }
        if (event) {
            warnMessage += `: ${constants_1.EVENT[event]}`;
        }
        if (meta) {
            warnMessage += ` – ${typeof meta === 'string' ? meta : JSON.stringify(meta)}`;
        }
        console.warn(warnMessage);
    }
    error(message, event, meta) {
        // tslint:disable-next-line:no-console
        if (isEvent(event)) {
            if (event === constants_1.EVENT.IS_CLOSED) {
                this.emitter.emit('error', meta, constants_1.EVENT[event], message_constants_1.TOPIC[message_constants_1.TOPIC.CONNECTION]);
            }
            else if (event === constants_1.EVENT.CONNECTION_ERROR) {
                this.emitter.emit('error', meta, constants_1.EVENT[event], message_constants_1.TOPIC[message_constants_1.TOPIC.CONNECTION]);
            }
        }
        else {
            const action = event ? event : message.action;
            this.emitter.emit('error', meta, message_constants_1.ACTIONS[message.topic][action], message_constants_1.TOPIC[message.topic]);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map