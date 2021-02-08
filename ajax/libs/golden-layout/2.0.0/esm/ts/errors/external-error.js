/** @public */
export class ExternalError extends Error {
    constructor(type, message) {
        super(message);
        this.type = type;
    }
}
/** @public */
export class ConfigurationError extends ExternalError {
    constructor(message, node) {
        super('Configuration', message);
        this.node = node;
    }
}
/** @public */
export class PopoutBlockedError extends ExternalError {
    constructor(message) {
        super('PopoutBlocked', message);
    }
}
/** @public */
export class ApiError extends ExternalError {
    constructor(message) {
        super('API', message);
    }
}
//# sourceMappingURL=external-error.js.map