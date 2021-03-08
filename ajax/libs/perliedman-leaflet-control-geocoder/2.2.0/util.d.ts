/**
 * @internal
 */
export declare function htmlEscape(string?: string): string;
/**
 * @internal
 */
export declare function jsonp(url: string, params: Record<string, any>, callback: (message: any) => void, context: any, jsonpParam?: string): void;
/**
 * @internal
 */
export declare function getJSON(url: string, params: Record<string, unknown>, callback: (message: any) => void): void;
/**
 * @internal
 */
export declare function template(str: string, data: Record<string, any>): string;
/**
 * @internal
 */
export declare function getParamString(obj: Record<string, unknown | unknown[]>, existingUrl?: string, uppercase?: boolean): string;
