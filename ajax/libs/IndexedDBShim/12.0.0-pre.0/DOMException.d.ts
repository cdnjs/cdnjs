export type ErrorLike = {
    message: string | DOMString;
};
export type ArbitraryValue = any;
export type Code = "IndexSizeError" | "HierarchyRequestError" | "WrongDocumentError" | "InvalidCharacterError" | "NoModificationAllowedError" | "NotFoundError" | "NotSupportedError" | "InUseAttributeError" | "InvalidStateError" | "SyntaxError" | "InvalidModificationError" | "NamespaceError" | "InvalidAccessError" | "TypeMismatchError" | "SecurityError" | "NetworkError" | "AbortError" | "URLMismatchError" | "QuotaExceededError" | "TimeoutError" | "InvalidNodeTypeError" | "DataCloneError" | "EncodingError" | "NotReadableError" | "UnknownError" | "ConstraintError" | "DataError" | "TransactionInactiveError" | "ReadOnlyError" | "VersionError" | "OperationError" | "NotAllowedError";
export type LegacyCode = "INDEX_SIZE_ERR" | "DOMSTRING_SIZE_ERR" | "HIERARCHY_REQUEST_ERR" | "WRONG_DOCUMENT_ERR" | "INVALID_CHARACTER_ERR" | "NO_DATA_ALLOWED_ERR" | "NO_MODIFICATION_ALLOWED_ERR" | "NOT_FOUND_ERR" | "NOT_SUPPORTED_ERR" | "INUSE_ATTRIBUTE_ERR" | "INVALID_STATE_ERR" | "SYNTAX_ERR" | "INVALID_MODIFICATION_ERR" | "NAMESPACE_ERR" | "INVALID_ACCESS_ERR" | "VALIDATION_ERR" | "TYPE_MISMATCH_ERR" | "SECURITY_ERR" | "NETWORK_ERR" | "ABORT_ERR" | "URL_MISMATCH_ERR" | "QUOTA_EXCEEDED_ERR" | "TIMEOUT_ERR" | "INVALID_NODE_TYPE_ERR" | "DATA_CLONE_ERR";
/**
 * @typedef {{
 *   message: string|DOMString
 * }} ErrorLike
 */
/**
 * Logs detailed error information to the console.
 * @param {string} name
 * @param {string} message
 * @param {string|ErrorLike|boolean|null} [error]
 * @returns {void}
 */
export function logError(name: string, message: string, error?: string | boolean | ErrorLike | null | undefined): void;
/**
 * Finds the error argument.  This is useful because some WebSQL callbacks
 * pass the error as the first argument, and some pass it as the second
 * argument.
 * @param {(Error|{message?: string, name?: string}|any)[]} args
 * @returns {Error|DOMException|undefined}
 */
export function findError(args: (Error | {
    message?: string;
    name?: string;
} | any)[]): Error | DOMException | undefined;
export const ShimDOMException: {
    new (message?: string | undefined, name?: string | undefined): DOMException;
    prototype: DOMException;
    readonly INDEX_SIZE_ERR: 1;
    readonly DOMSTRING_SIZE_ERR: 2;
    readonly HIERARCHY_REQUEST_ERR: 3;
    readonly WRONG_DOCUMENT_ERR: 4;
    readonly INVALID_CHARACTER_ERR: 5;
    readonly NO_DATA_ALLOWED_ERR: 6;
    readonly NO_MODIFICATION_ALLOWED_ERR: 7;
    readonly NOT_FOUND_ERR: 8;
    readonly NOT_SUPPORTED_ERR: 9;
    readonly INUSE_ATTRIBUTE_ERR: 10;
    readonly INVALID_STATE_ERR: 11;
    readonly SYNTAX_ERR: 12;
    readonly INVALID_MODIFICATION_ERR: 13;
    readonly NAMESPACE_ERR: 14;
    readonly INVALID_ACCESS_ERR: 15;
    readonly VALIDATION_ERR: 16;
    readonly TYPE_MISMATCH_ERR: 17;
    readonly SECURITY_ERR: 18;
    readonly NETWORK_ERR: 19;
    readonly ABORT_ERR: 20;
    readonly URL_MISMATCH_ERR: 21;
    readonly QUOTA_EXCEEDED_ERR: 22;
    readonly TIMEOUT_ERR: 23;
    readonly INVALID_NODE_TYPE_ERR: 24;
    readonly DATA_CLONE_ERR: 25;
};
export const createDOMException: ((name: string, message: string, error?: ErrorLike | undefined) => DOMException) | ((name: string, message: string, error?: ErrorLike | undefined) => Error);
/**
 *
 * @param {SQLError} webSQLErr
 * @returns {(DOMException|Error) & {
 *   sqlError: SQLError
 * }}
 */
export function webSQLErrback(webSQLErr: SQLError): (DOMException | Error) & {
    sqlError: SQLError;
};
//# sourceMappingURL=DOMException.d.ts.map