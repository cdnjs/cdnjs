var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/net
 */
import { getUid } from './util.js';
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
export function jsonp(url, callback, opt_errback, opt_callbackParam) {
    var script = document.createElement('script');
    var key = 'olc_' + getUid(callback);
    function cleanup() {
        delete window[key];
        script.parentNode.removeChild(script);
    }
    script.async = true;
    script.src =
        url +
            (url.indexOf('?') == -1 ? '?' : '&') +
            (opt_callbackParam || 'callback') +
            '=' +
            key;
    var timer = setTimeout(function () {
        cleanup();
        if (opt_errback) {
            opt_errback();
        }
    }, 10000);
    window[key] = function (data) {
        clearTimeout(timer);
        cleanup();
        callback(data);
    };
    document.getElementsByTagName('head')[0].appendChild(script);
}
var ResponseError = /** @class */ (function (_super) {
    __extends(ResponseError, _super);
    /**
     * @param {XMLHttpRequest} response The XHR object.
     */
    function ResponseError(response) {
        var _this = this;
        var message = 'Unexpected response status: ' + response.status;
        _this = _super.call(this, message) || this;
        /**
         * @type {string}
         */
        _this.name = 'ResponseError';
        /**
         * @type {XMLHttpRequest}
         */
        _this.response = response;
        return _this;
    }
    return ResponseError;
}(Error));
export { ResponseError };
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    /**
     * @param {XMLHttpRequest} client The XHR object.
     */
    function ClientError(client) {
        var _this = _super.call(this, 'Failed to issue request') || this;
        /**
         * @type {string}
         */
        _this.name = 'ClientError';
        /**
         * @type {XMLHttpRequest}
         */
        _this.client = client;
        return _this;
    }
    return ClientError;
}(Error));
export { ClientError };
/**
 * @param {string} url The URL.
 * @return {Promise<Object>} A promise that resolves to the JSON response.
 */
export function getJSON(url) {
    return new Promise(function (resolve, reject) {
        /**
         * @param {ProgressEvent<XMLHttpRequest>} event The load event.
         */
        function onLoad(event) {
            var client = event.target;
            // status will be 0 for file:// urls
            if (!client.status || (client.status >= 200 && client.status < 300)) {
                var data = void 0;
                try {
                    data = JSON.parse(client.responseText);
                }
                catch (err) {
                    var message = 'Error parsing response text as JSON: ' + err.message;
                    reject(new Error(message));
                    return;
                }
                resolve(data);
                return;
            }
            reject(new ResponseError(client));
        }
        /**
         * @param {ProgressEvent<XMLHttpRequest>} event The error event.
         */
        function onError(event) {
            reject(new ClientError(event.target));
        }
        var client = new XMLHttpRequest();
        client.addEventListener('load', onLoad);
        client.addEventListener('error', onError);
        client.open('GET', url);
        client.setRequestHeader('Accept', 'application/json');
        client.send();
    });
}
/**
 * @param {string} base The base URL.
 * @param {string} url The potentially relative URL.
 * @return {string} The full URL.
 */
export function resolveUrl(base, url) {
    if (url.indexOf('://') >= 0) {
        return url;
    }
    return new URL(url, base).href;
}
var originalXHR;
export function overrideXHR(xhr) {
    if (typeof XMLHttpRequest !== 'undefined') {
        originalXHR = XMLHttpRequest;
    }
    global.XMLHttpRequest = xhr;
}
export function restoreXHR() {
    global.XMLHttpRequest = originalXHR;
}
//# sourceMappingURL=net.js.map