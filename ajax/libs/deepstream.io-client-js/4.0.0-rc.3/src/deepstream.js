"use strict";
const client_1 = require("./client");
const constants_1 = require("./constants");
const C = require("../binary-protocol/src/message-constants");
const client = (url, options) => {
    return new client_1.Client(url, options);
};
module.exports = Object.assign(client, {
    CONNECTION_STATE: constants_1.CONNECTION_STATE,
    C,
    EVENT: constants_1.EVENT,
    deepstream: client
});
//# sourceMappingURL=deepstream.js.map