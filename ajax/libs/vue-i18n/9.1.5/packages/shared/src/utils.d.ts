/**
 * Original Utilities
 * written by kazuya kawaguchi
 */
export declare const inBrowser: boolean;
export declare let mark: (tag: string) => void | undefined;
export declare let measure: (name: string, startTag: string, endTag: string) => void | undefined;
export declare function format(message: string, ...args: any): string;
export declare const makeSymbol: (name: string) => symbol | string;
export declare const generateFormatCacheKey: (locale: string, key: string, source: string) => string;
export declare const friendlyJSONstringify: (json: unknown) => string;
export declare const isNumber: (val: unknown) => val is number;
export declare const isDate: (val: unknown) => val is Date;
export declare const isRegExp: (val: unknown) => val is RegExp;
export declare const isEmptyObject: (val: unknown) => val is boolean;
export declare function warn(msg: string, err?: Error): void;
export declare const assign: {
    <T, U>(target: T, source: U): T & U;
    <T_1, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};
export declare const getGlobalThis: () => any;
export declare function escapeHtml(rawText: string): string;
export declare function hasOwn(obj: object | Array<any>, key: string): boolean;
/**
 * Useful Utilities By Evan you
 * Modified by kazuya kawaguchi
 * MIT License
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
 */
export declare const isArray: (arg: any) => arg is any[];
export declare const isFunction: (val: unknown) => val is Function;
export declare const isString: (val: unknown) => val is string;
export declare const isBoolean: (val: unknown) => val is boolean;
export declare const isSymbol: (val: unknown) => val is symbol;
export declare const isObject: (val: unknown) => val is Record<any, any>;
export declare const isPromise: <T = any>(val: unknown) => val is Promise<T>;
export declare const objectToString: () => string;
export declare const toTypeString: (value: unknown) => string;
export declare const isPlainObject: (val: unknown) => val is object;
export declare const toDisplayString: (val: unknown) => string;
export declare function generateCodeFrame(source: string, start?: number, end?: number): string;
//# sourceMappingURL=utils.d.ts.map