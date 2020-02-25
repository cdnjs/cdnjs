"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  Choose the server's state over the client's
**/
exports.REMOTE_WINS = (record, remoteValue, remoteVersion, callback) => {
    callback(null, remoteValue);
};
/**
 *  Choose the local state over the server's
**/
exports.LOCAL_WINS = (record, remoteValue, remoteVersion, callback) => {
    callback(null, record.get());
};
//# sourceMappingURL=merge-strategy.js.map