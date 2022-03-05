"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedUndefinedError = exports.UnexpectedNullError = exports.UnreachableCaseError = exports.AssertError = void 0;
/** @internal */
class InternalError extends Error {
    constructor(type, code, message) {
        super(`${type}: ${code}${message === undefined ? '' : ': ' + message}`);
    }
}
/** @internal */
class AssertError extends InternalError {
    constructor(code, message) {
        super('Assert', code, message);
    }
}
exports.AssertError = AssertError;
/** @internal */
class UnreachableCaseError extends InternalError {
    constructor(code, variableValue, message) {
        super('UnreachableCase', code, `${variableValue}${message === undefined ? '' : ': ' + message}`);
    }
}
exports.UnreachableCaseError = UnreachableCaseError;
/** @internal */
class UnexpectedNullError extends InternalError {
    constructor(code, message) {
        super('UnexpectedNull', code, message);
    }
}
exports.UnexpectedNullError = UnexpectedNullError;
/** @internal */
class UnexpectedUndefinedError extends InternalError {
    constructor(code, message) {
        super('UnexpectedUndefined', code, message);
    }
}
exports.UnexpectedUndefinedError = UnexpectedUndefinedError;
//# sourceMappingURL=internal-error.js.map