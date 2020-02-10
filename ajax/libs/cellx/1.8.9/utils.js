"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("./configuration");
function logError(...args) {
    configuration_1.configuration.logError(...args);
}
exports.logError = logError;
