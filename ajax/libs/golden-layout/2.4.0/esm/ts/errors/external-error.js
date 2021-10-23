/** @public */
export class ExternalError extends Error {
    /** @internal */
    constructor(type, message) {
        super(message);
        this.type = type;
    }
}
/** @public */
export class ConfigurationError extends ExternalError {
    /** @internal */
    constructor(message, node) {
        super('Configuration', message);
        this.node = node;
    }
}
/** @public */
export class PopoutBlockedError extends ExternalError {
    /** @internal */
    constructor(message) {
        super('PopoutBlocked', message);
    }
}
/** @public */
export class ApiError extends ExternalError {
    /** @internal */
    constructor(message) {
        super('API', message);
    }
}
/** @public */
export class BindError extends ExternalError {
    /** @internal */
    constructor(message) {
        super('Bind', message);
    }
}
//# sourceMappingURL=external-error.js.map