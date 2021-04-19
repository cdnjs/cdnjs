import { CompileError } from './errors';
export declare type CompileErrorHandler = (error: CompileError) => void;
export declare type CompileCacheKeyHandler = (source: string) => string;
export interface TokenizeOptions {
    location?: boolean;
    onError?: CompileErrorHandler;
}
export interface ParserOptions {
    location?: boolean;
    onError?: CompileErrorHandler;
}
export interface TransformOptions {
    onError?: CompileErrorHandler;
}
export interface CodeGenOptions {
    mode?: 'normal' | 'arrow';
    breakLineCode?: '\n' | ';';
    needIndent?: boolean;
    onError?: CompileErrorHandler;
    sourceMap?: boolean;
    filename?: string;
}
export declare type CompileOptions = {
    warnHtmlMessage?: boolean;
    onCacheKey?: CompileCacheKeyHandler;
} & TransformOptions & CodeGenOptions & ParserOptions & TokenizeOptions;
//# sourceMappingURL=options.d.ts.map