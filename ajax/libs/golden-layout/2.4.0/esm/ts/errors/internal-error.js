/** @internal */
class InternalError extends Error {
    constructor(type, code, message) {
        super(`${type}: ${code}${message === undefined ? '' : ': ' + message}`);
    }
}
/** @internal */
export class AssertError extends InternalError {
    constructor(code, message) {
        super('Assert', code, message);
    }
}
/** @internal */
export class UnreachableCaseError extends InternalError {
    constructor(code, variableValue, message) {
        super('UnreachableCase', code, `${variableValue}${message === undefined ? '' : ': ' + message}`);
    }
}
/** @internal */
export class UnexpectedNullError extends InternalError {
    constructor(code, message) {
        super('UnexpectedNull', code, message);
    }
}
/** @internal */
export class UnexpectedUndefinedError extends InternalError {
    constructor(code, message) {
        super('UnexpectedUndefined', code, message);
    }
}
//# sourceMappingURL=internal-error.js.map