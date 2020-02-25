"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = {
    logError: (...args) => {
        console.error(...args);
    }
};
function configure(config) {
    Object.assign(exports.configuration, config);
    return exports.configuration;
}
exports.configure = configure;
