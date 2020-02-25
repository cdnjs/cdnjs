"use strict";
/* tslint:disable:no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c;
var message_constants_1 = require("./message-constants");
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var message_validator_1 = require("./message-validator");
function isError(message) {
    return (message.action >= 0x50 && message.action < 0x70) || message.topic === message_constants_1.TOPIC.PARSER;
}
exports.isError = isError;
var BULK_ACTIONS = (_a = {},
    _a[message_constants_1.TOPIC.RECORD] = (_b = {},
        _b[message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK] = message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD,
        _b[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK] = message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD,
        _b[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD_BULK] = message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD,
        _b),
    _a[message_constants_1.TOPIC.EVENT] = (_c = {},
        _c[message_constants_1.EVENT_ACTIONS.SUBSCRIBE_BULK] = message_constants_1.EVENT_ACTIONS.SUBSCRIBE,
        _c[message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE_BULK] = message_constants_1.EVENT_ACTIONS.UNSUBSCRIBE,
        _c),
    _a);
var uuid = 0;
function parse(buffer, queue) {
    if (queue === void 0) { queue = []; }
    var offset = 0;
    var messages = [];
    var _loop_1 = function () {
        var _a = readBinary(buffer, offset), bytesConsumed = _a.bytesConsumed, rawMessage = _a.rawMessage;
        if (!rawMessage) {
            return "break";
        }
        queue.push(rawMessage);
        offset += bytesConsumed;
        if (rawMessage.fin) {
            var joinedMessage = joinMessages(queue);
            var message_1 = parseMessage(joinedMessage);
            // @ts-ignore
            if (message_1.parseError === undefined && !message_1.isAck && BULK_ACTIONS[message_1.topic] && BULK_ACTIONS[message_1.topic][message_1.action]) {
                // @ts-ignore
                var action_1 = BULK_ACTIONS[message_1.topic][message_1.action];
                uuid++;
                message_1.names.forEach(function (name) {
                    messages.push({
                        topic: message_1.topic,
                        action: action_1,
                        name: name,
                        correlationId: message_1.correlationId,
                        isBulk: true,
                        bulkId: uuid,
                        bulkAction: message_1.action
                    });
                });
            }
            else {
                messages.push(message_1);
            }
            queue.length = 0;
        }
    };
    do {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    } while (offset < buffer.length);
    return messages;
}
exports.parse = parse;
function parseData(message) {
    if (message.parsedData !== undefined || message.data === undefined) {
        return true;
    }
    if (message.payloadEncoding && message.payloadEncoding !== message_constants_1.PAYLOAD_ENCODING.JSON) {
        return new Error("unable to parse data of type '" + message.payloadEncoding + "'");
    }
    if (typeof message.data === 'string') {
        return new Error('tried to parse string data with binary parser');
    }
    message.parsedData = parseJSON(message.data);
    if (message.parsedData === undefined) {
        return new Error("unable to parse data " + message.data);
    }
    return true;
}
exports.parseData = parseData;
function readBinary(buff, offset) {
    if (buff.length < (offset + constants_1.HEADER_LENGTH)) {
        return { bytesConsumed: 0 };
    }
    var fin = !!(buff[offset] & 0x80);
    var topic = buff[offset] & 0x7F;
    var action = buff[offset + 1];
    var metaLength = buff.readUIntBE(offset + 2, 3);
    var payloadLength = buff.readUIntBE(offset + 5, 3);
    var messageLength = constants_1.HEADER_LENGTH + metaLength + payloadLength;
    if (buff.length < (offset + messageLength)) {
        return { bytesConsumed: 0 };
    }
    var rawHeader = buff.slice(offset, offset + constants_1.HEADER_LENGTH);
    var rawMessage = { fin: fin, topic: topic, action: action, rawHeader: rawHeader };
    if (metaLength > 0) {
        rawMessage.meta = buff.slice(offset + constants_1.HEADER_LENGTH, offset + constants_1.HEADER_LENGTH + metaLength);
    }
    if (payloadLength > 0) {
        rawMessage.payload = buff.slice(offset + constants_1.HEADER_LENGTH + metaLength, offset + messageLength);
    }
    return {
        bytesConsumed: messageLength,
        rawMessage: rawMessage,
    };
}
function joinMessages(rawMessages) {
    if (rawMessages.length === 0) {
        throw new Error('parseMessage must not be called with an empty message queue');
    }
    if (rawMessages.length === 1) {
        return rawMessages[0];
    }
    var _a = rawMessages[0], topic = _a.topic, action = _a.action, rawHeader = _a.rawHeader;
    var payloadSections = [];
    var metaSections = [];
    rawMessages.forEach(function (_a) {
        var payloadSection = _a.payload, metaSection = _a.meta;
        if (payloadSection) {
            payloadSections.push(payloadSection);
        }
        if (metaSection) {
            metaSections.push(metaSection);
        }
    });
    var payload = Buffer.concat(payloadSections);
    var meta = Buffer.concat(metaSections);
    return { fin: true, topic: topic, action: action, rawHeader: rawHeader, meta: meta, payload: payload };
}
function parseMessage(rawMessage) {
    var rawTopic = rawMessage.topic, rawAction = rawMessage.action, rawHeader = rawMessage.rawHeader;
    if (message_constants_1.TOPIC[rawTopic] === undefined) {
        return {
            parseError: true,
            action: message_constants_1.PARSER_ACTIONS.UNKNOWN_TOPIC,
            parsedMessage: {
                topic: rawTopic,
                action: rawAction
            },
            description: "unknown topic " + rawTopic,
            raw: rawHeader
        };
    }
    var topic = rawTopic;
    if (message_constants_1.ACTIONS[topic][rawAction] === undefined) {
        return {
            parseError: true,
            action: message_constants_1.PARSER_ACTIONS.UNKNOWN_ACTION,
            parsedMessage: {
                topic: topic,
                action: rawAction
            },
            description: "unknown " + message_constants_1.TOPIC[topic] + " action " + rawAction,
            raw: rawHeader
        };
    }
    // mask out uppermost bit(ACK)
    var action = rawAction & 0x7F;
    var message = { topic: topic, action: action };
    if (rawMessage.meta && rawMessage.meta.length > 0) {
        var meta = parseJSON(rawMessage.meta);
        if (!meta || typeof meta !== 'object') {
            return {
                parseError: true,
                action: message_constants_1.PARSER_ACTIONS.MESSAGE_PARSE_ERROR,
                parsedMessage: message,
                description: "invalid meta field " + rawMessage.meta.toString(),
                raw: rawHeader
            };
        }
        var metaError = message_validator_1.validateMeta(topic, rawAction, meta);
        if (metaError) {
            throw new Error("invalid meta " + message_constants_1.TOPIC[message.topic] + " " + message_constants_1.ACTIONS[message.topic][message.action] + ": " + metaError);
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
    if (!message.isAck && rawAction >= 0x70) {
        // Only add onto message if it's true
        message.isBulk = true;
    }
    message.isError = isError(message);
    if (message.topic === message_constants_1.TOPIC.RECORD && utils_1.isWriteAck(rawAction)) {
        message.isWriteAck = true;
    }
    return message;
}
function addMetadataToMessage(meta, message) {
    for (var key in message_constants_1.META_KEYS) {
        var value = meta[message_constants_1.META_KEYS[key]];
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
