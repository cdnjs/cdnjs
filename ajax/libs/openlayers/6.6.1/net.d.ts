/**
 * Simple JSONP helper. Supports error callbacks and a custom callback param.
 * The error callback will be called when no JSONP is executed after 10 seconds.
 *
 * @param {string} url Request url. A 'callback' query parameter will be
 *     appended.
 * @param {Function} callback Callback on success.
 * @param {Function} [opt_errback] Callback on error.
 * @param {string} [opt_callbackParam] Custom query parameter for the JSONP
 *     callback. Default is 'callback'.
 */
export function jsonp(url: string, callback: Function, opt_errback?: Function, opt_callbackParam?: string): void;
//# sourceMappingURL=net.d.ts.map