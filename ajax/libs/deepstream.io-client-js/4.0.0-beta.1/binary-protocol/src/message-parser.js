"use strict";
/* tslint:disable:no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
const message_constants_1 = require("./message-constants");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const message_validator_1 = require("./message-validator");
function isError(message) {
    return (message.action >= 0x50 && message.action < 0x70) || message.topic === message_constants_1.TOPIC.PARSER;
}
exports.isError = isError;
function parse(buffer, queue = []) {
    let offset = 0;
    const messages = [];
    do {
        const { bytesConsumed, rawMessage } = readBinary(buffer, offset);
        if (!rawMessage) {
            break;
        }
        queue.push(rawMessage);
        offset += bytesConsumed;
        if (rawMessage.fin) {
            const joinedMessage = joinMessages(queue);
            const message = parseMessage(joinedMessage);
            queue.length = 0;
            messages.push(message);
        }
    } while (offset < buffer.length);
    return messages;
}
exports.parse = parse;
function parseData(message) {
    if (message.parsedData !== undefined || message.data === undefined) {
        return true;
    }
    if (message.payloadEncoding && message.payloadEncoding !== message_constants_1.PAYLOAD_ENCODING.JSON) {
        return new Error(`unable to parse data of type '${message.payloadEncoding}'`);
    }
    if (typeof message.data === 'string') {
        return new Error('tried to parse string data with binary parser');
    }
    message.parsedData = parseJSON(message.data);
    if (message.parsedData === undefined) {
        return new Error(`unable to parse data ${message.data}`);
    }
    return true;
}
exports.parseData = parseData;
function readBinary(buff, offset) {
    if (buff.length < (offset + constants_1.HEADER_LENGTH)) {
        return { bytesConsumed: 0 };
    }
    const fin = !!(buff[offset] & 0x80);
    const topic = buff[offset] & 0x7F;
    const action = buff[offset + 1];
    const metaLength = buff.readUIntBE(offset + 2, 3);
    const payloadLength = buff.readUIntBE(offset + 5, 3);
    const messageLength = constants_1.HEADER_LENGTH + metaLength + payloadLength;
    if (buff.length < (offset + messageLength)) {
        return { bytesConsumed: 0 };
    }
    const rawHeader = buff.slice(offset, offset + constants_1.HEADER_LENGTH);
    const rawMessage = { fin, topic, action, rawHeader };
    if (metaLength > 0) {
        rawMessage.meta = buff.slice(offset + constants_1.HEADER_LENGTH, offset + constants_1.HEADER_LENGTH + metaLength);
    }
    if (payloadLength > 0) {
        rawMessage.payload = buff.slice(offset + constants_1.HEADER_LENGTH + metaLength, offset + messageLength);
    }
    return {
        bytesConsumed: messageLength,
        rawMessage,
    };
}
function joinMessages(rawMessages) {
    if (rawMessages.length === 0) {
        throw new Error('parseMessage must not be called with an empty message queue');
    }
    if (rawMessages.length === 1) {
        return rawMessages[0];
    }
    const { topic, action, rawHeader } = rawMessages[0];
    const payloadSections = [];
    const metaSections = [];
    rawMessages.forEach(({ payload: payloadSection, meta: metaSection }) => {
        if (payloadSection) {
            payloadSections.push(payloadSection);
        }
        if (metaSection) {
            metaSections.push(metaSection);
        }
    });
    const payload = Buffer.concat(payloadSections);
    const meta = Buffer.concat(metaSections);
    return { fin: true, topic, action, rawHeader, meta, payload };
}
function parseMessage(rawMessage) {
    const { topic: rawTopic, action: rawAction, rawHeader } = rawMessage;
    if (message_constants_1.TOPIC[rawTopic] === undefined) {
        return {
            parseError: true,
            action: message_constants_1.PARSER_ACTIONS.UNKNOWN_TOPIC,
            parsedMessage: {
                topic: rawTopic,
                action: rawAction
            },
            description: `unknown topic ${rawTopic}`,
            raw: rawHeader
        };
    }
    const topic = rawTopic;
    if (message_constants_1.ACTIONS[topic][rawAction] === undefined) {
        return {
            parseError: true,
            action: message_constants_1.PARSER_ACTIONS.UNKNOWN_ACTION,
            parsedMessage: {
                topic,
                action: rawAction
            },
            description: `unknown ${message_constants_1.TOPIC[topic]} action ${rawAction}`,
            raw: rawHeader
        };
    }
    // mask out uppermost bit(ACK)
    const action = rawAction & 0x7F;
    const message = { topic, action };
    if (rawMessage.meta && rawMessage.meta.length > 0) {
        const meta = parseJSON(rawMessage.meta);
        if (!meta || typeof meta !== 'object') {
            return {
                parseError: true,
                action: message_constants_1.PARSER_ACTIONS.MESSAGE_PARSE_ERROR,
                parsedMessage: message,
                description: `invalid meta field ${rawMessage.meta.toString()}`,
                raw: rawHeader
            };
        }
        const metaError = message_validator_1.validateMeta(topic, rawAction, meta);
        if (metaError) {
            throw new Error(`invalid meta ${message_constants_1.TOPIC[message.topic]} ${message_constants_1.ACTIONS[message.topic][message.action]}: ${metaError}`);
            // return {
            //   parseError: true,
            //   action: PARSER_ACTIONS.INVALID_META_PARAMS,
            //   parsedMessage: message,
            //   description: 'invalid ack'
            // }
        }
        addMetadataToMessage(meta, message);
    }
    if (rawMessage.payload !== undefined) {
        if (!message_validator_1.hasPayload(message.topic, rawAction)) {
            return {
                parseError: true,
                action: message_constants_1.PARSER_ACTIONS.INVALID_MESSAGE,
                parsedMessage: message,
                description: 'should not have a payload'
            };
        }
        if (!message.payloadEncoding && topic === message_constants_1.TOPIC.PARSER) {
            message.payloadEncoding = message_constants_1.PAYLOAD_ENCODING.BINARY;
        }
        message.data = rawMessage.payload;
    }
    // if (rawMessage.payload && rawMessage.payload.length > 0) {
    //   const payload = parseJSON(rawMessage.payload)
    //   if (payload === undefined) {
    //     return {
    //       parseError: true,
    //       description: `invalid message data ${rawMessage.payload.toString()}`,
    //       parsedMessage: message,
    //       raw: rawHeader
    //     }
    //   }
    //   message.data = payload
    // }
    message.isAck = rawAction >= 0x80;
    message.isError = isError(message);
    if (message.topic === message_constants_1.TOPIC.RECORD && utils_1.isWriteAck(rawAction)) {
        message.isWriteAck = true;
    }
    return message;
}
function addMetadataToMessage(meta, message) {
    for (const key in message_constants_1.META_KEYS) {
        const value = meta[message_constants_1.META_KEYS[key]];
        if (value !== undefined) {
            message[key] = value;
        }
    }
}
function parseJSON(buff) {
    try {
        return JSON.parse(buff.toString());
    }
    catch (err) {
        return undefined;
    }
}
exports.parseJSON = parseJSON;
//# sourceMappingURL=message-parser.js.map