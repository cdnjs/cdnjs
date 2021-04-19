import { SourceLocation } from './location';
export declare type CompileDomain = 'tokenizer' | 'parser' | 'generator' | 'transformer' | 'compiler';
export interface CompileError extends SyntaxError {
    code: number;
    domain?: CompileDomain;
    location?: SourceLocation;
}
export interface CreateCompileErrorOptions {
    domain?: CompileDomain;
    messages?: {
        [code: number]: string;
    };
    args?: unknown[];
}
export declare const enum CompileErrorCodes {
    EXPECTED_TOKEN = 0,
    INVALID_TOKEN_IN_PLACEHOLDER = 1,
    UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER = 2,
    UNKNOWN_ESCAPE_SEQUENCE = 3,
    INVALID_UNICODE_ESCAPE_SEQUENCE = 4,
    UNBALANCED_CLOSING_BRACE = 5,
    UNTERMINATED_CLOSING_BRACE = 6,
    EMPTY_PLACEHOLDER = 7,
    NOT_ALLOW_NEST_PLACEHOLDER = 8,
    INVALID_LINKED_FORMAT = 9,
    MUST_HAVE_MESSAGES_IN_PLURAL = 10,
    UNEXPECTED_EMPTY_LINKED_MODIFIER = 11,
    UNEXPECTED_EMPTY_LINKED_KEY = 12,
    UNEXPECTED_LEXICAL_ANALYSIS = 13,
    __EXTEND_POINT__ = 14
}
/** @internal */
export declare const errorMessages: {
    [code: number]: string;
};
export declare function createCompileError<T extends number>(code: T, loc: SourceLocation | null, options?: CreateCompileErrorOptions): CompileError;
/** @internal */
export declare function defaultOnError(error: CompileError): never;
//# sourceMappingURL=errors.d.ts.map