/**
 * @internal
 */
export declare function htmlEscape(string?: string): string;
/**
 * @internal
 */
export declare function getJSON<T>(url: string, params: Record<string, unknown>): Promise<T>;
/**
 * @internal
 */
export declare function template(str: string, data: Record<string, any>): string;
