"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    logError: (...args) => {
        console.error(...args);
    }
};
function configure(options) {
    Object.assign(exports.config, options);
    return exports.config;
}
exports.configure = configure;
