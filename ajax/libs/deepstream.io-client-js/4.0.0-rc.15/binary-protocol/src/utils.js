"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c, _d, _e;
var message_constants_1 = require("./message-constants");
function isWriteAck(action) {
    return action === message_constants_1.RECORD_ACTIONS.CREATEANDPATCH_WITH_WRITE_ACK
        || action === message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK
        || action === message_constants_1.RECORD_ACTIONS.PATCH_WITH_WRITE_ACK
        || action === message_constants_1.RECORD_ACTIONS.UPDATE_WITH_WRITE_ACK
        || action === message_constants_1.RECORD_ACTIONS.ERASE_WITH_WRITE_ACK
        || action === message_constants_1.RECORD_ACTIONS.WRITE_ACKNOWLEDGEMENT;
}
exports.isWriteAck = isWriteAck;
exports.ACTION_TO_WRITE_ACK = (_a = {},
    _a[message_constants_1.RECORD_ACTIONS.CREATEANDPATCH] = message_constants_1.RECORD_ACTIONS.CREATEANDPATCH_WITH_WRITE_ACK,
    _a[message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE] = message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE_WITH_WRITE_ACK,
    _a[message_constants_1.RECORD_ACTIONS.PATCH] = message_constants_1.RECORD_ACTIONS.PATCH_WITH_WRITE_ACK,
    _a[message_constants_1.RECORD_ACTIONS.UPDATE] = message_constants_1.RECORD_ACTIONS.UPDATE_WITH_WRITE_ACK,
    _a[message_constants_1.RECORD_ACTIONS.ERASE] = message_constants_1.RECORD_ACTIONS.ERASE_WITH_WRITE_ACK,
    _a);
/**
 * Like reverseMap but the values will be cast using Number(k)
 */
function reverseMapNumeric(map) {
    var reversedMap = {};
    for (var key in map) {
        reversedMap[map[key]] = Number(key);
    }
    return reversedMap;
}
exports.reverseMapNumeric = reverseMapNumeric;
exports.WRITE_ACK_TO_ACTION = reverseMapNumeric(exports.ACTION_TO_WRITE_ACK);
exports.RESPONSE_TO_REQUEST = (_b = {},
    _b[message_constants_1.TOPIC.RECORD] = (_c = {},
        _c[message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE] = message_constants_1.RECORD_ACTIONS.HEAD,
        _c[message_constants_1.RECORD_ACTIONS.READ_RESPONSE] = message_constants_1.RECORD_ACTIONS.READ,
        _c[message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS] = message_constants_1.RECORD_ACTIONS.DELETE,
        _c),
    _b[message_constants_1.TOPIC.PRESENCE] = (_d = {},
        _d[message_constants_1.PRESENCE_ACTIONS.QUERY_RESPONSE] = message_constants_1.PRESENCE_ACTIONS.QUERY,
        _d[message_constants_1.PRESENCE_ACTIONS.QUERY_ALL_RESPONSE] = message_constants_1.PRESENCE_ACTIONS.QUERY_ALL,
        _d),
    _b[message_constants_1.TOPIC.RPC] = (_e = {},
        _e[message_constants_1.RPC_ACTIONS.ACCEPT] = message_constants_1.RPC_ACTIONS.REQUEST,
        _e[message_constants_1.RPC_ACTIONS.ERROR] = message_constants_1.RPC_ACTIONS.REQUEST,
        _e),
    _b[message_constants_1.TOPIC.EVENT] = {},
    _b);
