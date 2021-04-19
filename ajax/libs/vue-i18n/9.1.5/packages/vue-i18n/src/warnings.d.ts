export declare const enum I18nWarnCodes {
    FALLBACK_TO_ROOT = 6,
    NOT_SUPPORTED_PRESERVE = 7,
    NOT_SUPPORTED_FORMATTER = 8,
    NOT_SUPPORTED_PRESERVE_DIRECTIVE = 9,
    NOT_SUPPORTED_GET_CHOICE_INDEX = 10,
    COMPONENT_NAME_LEGACY_COMPATIBLE = 11,
    NOT_FOUND_PARENT_SCOPE = 12
}
export declare const warnMessages: {
    [code: number]: string;
};
export declare function getWarnMessage(code: I18nWarnCodes, ...args: unknown[]): string;
//# sourceMappingURL=warnings.d.ts.map