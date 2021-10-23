"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindError = exports.ApiError = exports.PopoutBlockedError = exports.ConfigurationError = exports.ExternalError = void 0;
/** @public */
class ExternalError extends Error {
    /** @internal */
    constructor(type, message) {
        super(message);
        this.type = type;
    }
}
exports.ExternalError = ExternalError;
/** @public */
class ConfigurationError extends ExternalError {
    /** @internal */
    constructor(message, node) {
        super('Configuration', message);
        this.node = node;
    }
}
exports.ConfigurationError = ConfigurationError;
/** @public */
class PopoutBlockedError extends ExternalError {
    /** @internal */
    constructor(message) {
        super('PopoutBlocked', message);
    }
}
exports.PopoutBlockedError = PopoutBlockedError;
/** @public */
class ApiError extends ExternalError {
    /** @internal */
    constructor(message) {
        super('API', message);
    }
}
exports.ApiError = ApiError;
/** @public */
class BindError extends ExternalError {
    /** @internal */
    constructor(message) {
        super('Bind', message);
    }
}
exports.BindError = BindError;
//# sourceMappingURL=external-error.js.map