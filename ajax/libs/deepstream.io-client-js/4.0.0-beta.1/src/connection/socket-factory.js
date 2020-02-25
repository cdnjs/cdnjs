"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_parser_1 = require("../../binary-protocol/src/message-parser");
const message_builder_1 = require("../../binary-protocol/src/message-builder");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const NodeWebSocket = require("ws");
exports.socketFactory = (url, options) => {
    const socket = new NodeWebSocket(url, options);
    // tslint:disable-next-line:no-empty
    socket.onparsedmessage = () => { };
    socket.onmessage = (raw) => {
        const parseResults = message_parser_1.parse(raw.data);
        // parseResults.forEach(element => {
        //     const msg = element as Message
        //     if (msg.action !== CONNECTION_ACTIONS.PONG && msg.action !== CONNECTION_ACTIONS.PING) {
        //         console.log('<<<', TOPIC[msg.topic], (ACTIONS as any)[msg.topic][msg.action], msg.parsedData, msg.data, msg.name)
        //     }
        // })
        socket.onparsedmessages(parseResults);
    };
    socket.sendParsedMessage = (message) => {
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
    return socket;
};
//# sourceMappingURL=socket-factory.js.map