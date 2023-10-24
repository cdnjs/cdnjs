/**
 * Simple JSONP helper. Supports error callbacks and a custom callback param.
 * The error callback will be called when no JSONP is executed after 10 seconds.
 *
 * @param {string} url Request url. A 'callback' query parameter will be
 *     appended.
 * @param {Function} callback Callback on success.
 * @param {Function} [errback] Callback on error.
 * @param {string} [callbackParam] Custom query parameter for the JSONP
 *     callback. Default is 'callback'.
 */
export function jsonp(url: string, callback: Function, errback?: Function | undefined, callbackParam?: string | undefined): void;
/**
 * @param {string} url The URL.
 * @return {Promise<Object>} A promise that resolves to the JSON response.
 */
export function getJSON(url: string): Promise<any>;
/**
 * @param {string} base The base URL.
 * @param {string} url The potentially relative URL.
 * @return {string} The full URL.
 */
export function resolveUrl(base: string, url: string): string;
export function overrideXHR(xhr: any): void;
export function restoreXHR(): void;
export class ResponseError extends Error {
    /**
     * @param {XMLHttpRequest} response The XHR object.
     */
    constructor(response: XMLHttpRequest);
    /**
     * @type {XMLHttpRequest}
     */
    response: XMLHttpRequest;
}
export class ClientError extends Error {
    /**
     * @param {XMLHttpRequest} client The XHR object.
     */
    constructor(client: XMLHttpRequest);
    /**
     * @type {XMLHttpRequest}
     */
    client: XMLHttpRequest;
}
//# sourceMappingURL=net.d.ts.map