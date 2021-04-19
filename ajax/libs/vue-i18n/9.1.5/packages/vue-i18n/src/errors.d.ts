import { CompileError } from '@intlify/core-base';
export interface I18nError extends CompileError {
    code: I18nErrorCodes;
}
export declare const enum I18nErrorCodes {
    UNEXPECTED_RETURN_TYPE = 14,
    INVALID_ARGUMENT = 15,
    MUST_BE_CALL_SETUP_TOP = 16,
    NOT_INSLALLED = 17,
    NOT_AVAILABLE_IN_LEGACY_MODE = 18,
    REQUIRED_VALUE = 19,
    INVALID_VALUE = 20,
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN = 21,
    UNEXPECTED_ERROR = 22,
    __EXTEND_POINT__ = 23
}
export declare function createI18nError(code: I18nErrorCodes, ...args: unknown[]): I18nError;
export declare const errorMessages: {
    [code: number]: string;
};
//# sourceMappingURL=errors.d.ts.map