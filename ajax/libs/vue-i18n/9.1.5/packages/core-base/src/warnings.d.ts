export declare const enum CoreWarnCodes {
    NOT_FOUND_KEY = 0,
    FALLBACK_TO_TRANSLATE = 1,
    CANNOT_FORMAT_NUMBER = 2,
    FALLBACK_TO_NUMBER_FORMAT = 3,
    CANNOT_FORMAT_DATE = 4,
    FALLBACK_TO_DATE_FORMAT = 5,
    __EXTEND_POINT__ = 6
}
/** @internal */
export declare const warnMessages: {
    [code: number]: string;
};
export declare function getWarnMessage(code: CoreWarnCodes, ...args: unknown[]): string;
//# sourceMappingURL=warnings.d.ts.map