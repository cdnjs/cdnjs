import type { CompileError } from '@intlify/message-compiler';
export interface CoreError extends CompileError {
    code: CoreErrorCodes;
}
export declare const enum CoreErrorCodes {
    INVALID_ARGUMENT = 14,
    INVALID_DATE_ARGUMENT = 15,
    INVALID_ISO_DATE_ARGUMENT = 16,
    __EXTEND_POINT__ = 17
}
export declare function createCoreError(code: CoreErrorCodes): CoreError;
/** @internal */
export declare const errorMessages: {
    [code: number]: string;
};
//# sourceMappingURL=errors.d.ts.map