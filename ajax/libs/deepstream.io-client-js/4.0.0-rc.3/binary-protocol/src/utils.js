"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_constants_1 = require("./message-constants");
function isWriteAck(action) {
    return action === message_constants_1.RECORD_ACTIONS.CREATEANDPATCH_WITH_WRITE_ACK
        || action === message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK
        || action === message_constants_1.RECORD_ACTIONS.PATCH_WITH_WRITE_ACK
        || action === message_constants_1.RECORD_ACTIONS.UPDATE_WITH_WRITE_ACK
        || action === message_constants_1.RECORD_ACTIONS.ERASE_WITH_WRITE_ACK
        || action === message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT;
}
exports.isWriteAck = isWriteAck;
exports.ACTION_TO_WRITE_ACK = {
    [message_constants_1.RECORD_ACTIONS.CREATEANDPATCH]: message_constants_1.RECORD_ACTIONS.CREATEANDPATCH_WITH_WRITE_ACK,
    [message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE]: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK,
    [message_constants_1.RECORD_ACTIONS.PATCH]: message_constants_1.RECORD_ACTIONS.PATCH_WITH_WRITE_ACK,
    [message_constants_1.RECORD_ACTIONS.UPDATE]: message_constants_1.RECORD_ACTIONS.UPDATE_WITH_WRITE_ACK,
    [message_constants_1.RECORD_ACTIONS.ERASE]: message_constants_1.RECORD_ACTIONS.ERASE_WITH_WRITE_ACK,
};
/**
 * Like reverseMap but the values will be cast using Number(k)
 */
function reverseMapNumeric(map) {
    const reversedMap = {};
    for (const key in map) {
        reversedMap[map[key]] = Number(key);
    }
    return reversedMap;
}
exports.reverseMapNumeric = reverseMapNumeric;
exports.WRITE_ACK_TO_ACTION = reverseMapNumeric(exports.ACTION_TO_WRITE_ACK);
exports.RESPONSE_TO_REQUEST = {
    [message_constants_1.TOPIC.RECORD]: {
        [message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE]: message_constants_1.RECORD_ACTIONS.HEAD,
        [message_constants_1.RECORD_ACTIONS.READ_RESPONSE]: message_constants_1.RECORD_ACTIONS.READ,
        [message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS]: message_constants_1.RECORD_ACTIONS.DELETE,
    },
    [message_constants_1.TOPIC.PRESENCE]: {
        [message_constants_1.PRESENCE_ACTIONS.QUERY_RESPONSE]: message_constants_1.PRESENCE_ACTIONS.QUERY,
        [message_constants_1.PRESENCE_ACTIONS.QUERY_ALL_RESPONSE]: message_constants_1.PRESENCE_ACTIONS.QUERY_ALL
    },
    [message_constants_1.TOPIC.RPC]: {
        [message_constants_1.RPC_ACTIONS.ACCEPT]: message_constants_1.RPC_ACTIONS.REQUEST,
        [message_constants_1.RPC_ACTIONS.ERROR]: message_constants_1.RPC_ACTIONS.REQUEST
    },
    [message_constants_1.TOPIC.EVENT]: {}
};
//# sourceMappingURL=utils.js.map