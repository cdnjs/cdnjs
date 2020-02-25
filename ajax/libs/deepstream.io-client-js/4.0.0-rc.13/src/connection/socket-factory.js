"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_parser_1 = require("../../binary-protocol/src/message-parser");
var message_builder_1 = require("../../binary-protocol/src/message-builder");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var BrowserWebsocket = (global.WebSocket || global.MozWebSocket);
exports.socketFactory = function (url, options, heartBeatInterval) {
    var socket = BrowserWebsocket
        ? new BrowserWebsocket(url, [], options)
        : new (require('ws'))(url, options);
    if (BrowserWebsocket) {
        socket.binaryType = 'arraybuffer';
    }
    var pingMessage = message_builder_1.getMessage({ topic: message_constants_1.TOPIC.CONNECTION, action: message_constants_1.CONNECTION_ACTIONS.PING }, false);
    var pingInterval = null;
    var lastRecievedMessageTimestamp = -1;
    // tslint:disable-next-line:no-empty
    socket.onparsedmessage = function () { };
    socket.onmessage = function (raw) {
        lastRecievedMessageTimestamp = Date.now();
        var parseResults = message_parser_1.parse(BrowserWebsocket ? new Buffer(new Uint8Array(raw.data)) : raw.data);
        socket.onparsedmessages(parseResults);
    };
    socket.getTimeSinceLastMessage = function () {
        return 0;
        // return Date.now() - lastRecievedMessageTimestamp
    };
    socket.sendParsedMessage = function (message) {
        if (message.topic === message_constants_1.TOPIC.CONNECTION && message.action === message_constants_1.CONNECTION_ACTIONS.CLOSING) {
            socket.onparsedmessages([{ topic: message_constants_1.TOPIC.CONNECTION, action: message_constants_1.CONNECTION_ACTIONS.CLOSED }]);
            socket.close();
            return;
        }
        message.data = JSON.stringify(message.parsedData);
        // if (message.action !== CONNECTION_ACTIONS.PONG && message.action !== CONNECTION_ACTIONS.PING) {
        //     console.log('>>>', TOPIC[message.topic], (ACTIONS as any)[message.topic][message.action], message.parsedData, message.data, message.name)
        // }
        socket.send(message_builder_1.getMessage(message, false));
    };
    socket.onclosed = null;
    socket.onclose = function () {
        clearInterval(pingInterval);
        socket.onclosed();
    };
    socket.onopened = null;
    socket.onopen = function () {
        pingInterval = setInterval(function () {
            if (Date.now() - lastRecievedMessageTimestamp > heartBeatInterval) {
                try {
                    socket.send(pingMessage);
                }
                catch (e) {
                    clearTimeout(pingInterval);
                }
            }
        }, heartBeatInterval);
        socket.onopened();
    };
    return socket;
};
