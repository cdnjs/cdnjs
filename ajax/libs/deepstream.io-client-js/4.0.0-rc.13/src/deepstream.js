"use strict";
var client_1 = require("./client");
var constants_1 = require("./constants");
var C = require("../binary-protocol/src/message-constants");
var client = function (url, options) {
    return new client_1.Client(url, options);
};
module.exports = Object.assign(client, {
    CONNECTION_STATE: constants_1.CONNECTION_STATE,
    C: C,
    EVENT: constants_1.EVENT,
    deepstream: client
});
