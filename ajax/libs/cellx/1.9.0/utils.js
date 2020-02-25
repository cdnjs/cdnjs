"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
function logError(...args) {
    config_1.config.logError(...args);
}
exports.logError = logError;
