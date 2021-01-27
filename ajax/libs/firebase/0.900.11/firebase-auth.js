(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase.auth = global.firebase.auth || {}), global.firebase.app));
}(this, (function (exports, app) { 'use strict';

    try {
                (function() {

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var stringToByteArray = function (str) {
        // TODO(user): Use native implementations if/when available
        var out = [];
        var p = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c < 128) {
                out[p++] = c;
            }
            else if (c < 2048) {
                out[p++] = (c >> 6) | 192;
                out[p++] = (c & 63) | 128;
            }
            else if ((c & 0xfc00) === 0xd800 &&
                i + 1 < str.length &&
                (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
                // Surrogate Pair
                c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
                out[p++] = (c >> 18) | 240;
                out[p++] = ((c >> 12) & 63) | 128;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
            else {
                out[p++] = (c >> 12) | 224;
                out[p++] = ((c >> 6) & 63) | 128;
                out[p++] = (c & 63) | 128;
            }
        }
        return out;
    };
    /**
     * Turns an array of numbers into the string given by the concatenation of the
     * characters to which the numbers correspond.
     * @param bytes Array of numbers representing characters.
     * @return Stringification of the array.
     */
    var byteArrayToString = function (bytes) {
        // TODO(user): Use native implementations if/when available
        var out = [];
        var pos = 0, c = 0;
        while (pos < bytes.length) {
            var c1 = bytes[pos++];
            if (c1 < 128) {
                out[c++] = String.fromCharCode(c1);
            }
            else if (c1 > 191 && c1 < 224) {
                var c2 = bytes[pos++];
                out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            }
            else if (c1 > 239 && c1 < 365) {
                // Surrogate Pair
                var c2 = bytes[pos++];
                var c3 = bytes[pos++];
                var c4 = bytes[pos++];
                var u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                    0x10000;
                out[c++] = String.fromCharCode(0xd800 + (u >> 10));
                out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
            }
            else {
                var c2 = bytes[pos++];
                var c3 = bytes[pos++];
                out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            }
        }
        return out.join('');
    };
    // We define it as an object literal instead of a class because a class compiled down to es5 can't
    // be treeshaked. https://github.com/rollup/rollup/issues/1691
    // Static lookup maps, lazily populated by init_()
    var base64 = {
        /**
         * Maps bytes to characters.
         */
        byteToCharMap_: null,
        /**
         * Maps characters to bytes.
         */
        charToByteMap_: null,
        /**
         * Maps bytes to websafe characters.
         * @private
         */
        byteToCharMapWebSafe_: null,
        /**
         * Maps websafe characters to bytes.
         * @private
         */
        charToByteMapWebSafe_: null,
        /**
         * Our default alphabet, shared between
         * ENCODED_VALS and ENCODED_VALS_WEBSAFE
         */
        ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
        /**
         * Our default alphabet. Value 64 (=) is special; it means "nothing."
         */
        get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + '+/=';
        },
        /**
         * Our websafe alphabet.
         */
        get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + '-_.';
        },
        /**
         * Whether this browser supports the atob and btoa functions. This extension
         * started at Mozilla but is now implemented by many browsers. We use the
         * ASSUME_* variables to avoid pulling in the full useragent detection library
         * but still allowing the standard per-browser compilations.
         *
         */
        HAS_NATIVE_SUPPORT: typeof atob === 'function',
        /**
         * Base64-encode an array of bytes.
         *
         * @param input An array of bytes (numbers with
         *     value in [0, 255]) to encode.
         * @param webSafe Boolean indicating we should use the
         *     alternative alphabet.
         * @return The base64 encoded string.
         */
        encodeByteArray: function (input, webSafe) {
            if (!Array.isArray(input)) {
                throw Error('encodeByteArray takes an array as a parameter');
            }
            this.init_();
            var byteToCharMap = webSafe
                ? this.byteToCharMapWebSafe_
                : this.byteToCharMap_;
            var output = [];
            for (var i = 0; i < input.length; i += 3) {
                var byte1 = input[i];
                var haveByte2 = i + 1 < input.length;
                var byte2 = haveByte2 ? input[i + 1] : 0;
                var haveByte3 = i + 2 < input.length;
                var byte3 = haveByte3 ? input[i + 2] : 0;
                var outByte1 = byte1 >> 2;
                var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
                var outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
                var outByte4 = byte3 & 0x3f;
                if (!haveByte3) {
                    outByte4 = 64;
                    if (!haveByte2) {
                        outByte3 = 64;
                    }
                }
                output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
            }
            return output.join('');
        },
        /**
         * Base64-encode a string.
         *
         * @param input A string to encode.
         * @param webSafe If true, we should use the
         *     alternative alphabet.
         * @return The base64 encoded string.
         */
        encodeString: function (input, webSafe) {
            // Shortcut for Mozilla browsers that implement
            // a native base64 encoder in the form of "btoa/atob"
            if (this.HAS_NATIVE_SUPPORT && !webSafe) {
                return btoa(input);
            }
            return this.encodeByteArray(stringToByteArray(input), webSafe);
        },
        /**
         * Base64-decode a string.
         *
         * @param input to decode.
         * @param webSafe True if we should use the
         *     alternative alphabet.
         * @return string representing the decoded value.
         */
        decodeString: function (input, webSafe) {
            // Shortcut for Mozilla browsers that implement
            // a native base64 encoder in the form of "btoa/atob"
            if (this.HAS_NATIVE_SUPPORT && !webSafe) {
                return atob(input);
            }
            return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
        },
        /**
         * Base64-decode a string.
         *
         * In base-64 decoding, groups of four characters are converted into three
         * bytes.  If the encoder did not apply padding, the input length may not
         * be a multiple of 4.
         *
         * In this case, the last group will have fewer than 4 characters, and
         * padding will be inferred.  If the group has one or two characters, it decodes
         * to one byte.  If the group has three characters, it decodes to two bytes.
         *
         * @param input Input to decode.
         * @param webSafe True if we should use the web-safe alphabet.
         * @return bytes representing the decoded value.
         */
        decodeStringToByteArray: function (input, webSafe) {
            this.init_();
            var charToByteMap = webSafe
                ? this.charToByteMapWebSafe_
                : this.charToByteMap_;
            var output = [];
            for (var i = 0; i < input.length;) {
                var byte1 = charToByteMap[input.charAt(i++)];
                var haveByte2 = i < input.length;
                var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
                ++i;
                var haveByte3 = i < input.length;
                var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
                ++i;
                var haveByte4 = i < input.length;
                var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
                ++i;
                if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                    throw Error();
                }
                var outByte1 = (byte1 << 2) | (byte2 >> 4);
                output.push(outByte1);
                if (byte3 !== 64) {
                    var outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                    output.push(outByte2);
                    if (byte4 !== 64) {
                        var outByte3 = ((byte3 << 6) & 0xc0) | byte4;
                        output.push(outByte3);
                    }
                }
            }
            return output;
        },
        /**
         * Lazy static initialization function. Called before
         * accessing any of the static map variables.
         * @private
         */
        init_: function () {
            if (!this.byteToCharMap_) {
                this.byteToCharMap_ = {};
                this.charToByteMap_ = {};
                this.byteToCharMapWebSafe_ = {};
                this.charToByteMapWebSafe_ = {};
                // We want quick mappings back and forth, so we precompute two maps.
                for (var i = 0; i < this.ENCODED_VALS.length; i++) {
                    this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
                    this.charToByteMap_[this.byteToCharMap_[i]] = i;
                    this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
                    this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
                    // Be forgiving when decoding and correctly decode both encodings.
                    if (i >= this.ENCODED_VALS_BASE.length) {
                        this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                        this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
                    }
                }
            }
        }
    };
    /**
     * URL-safe base64 decoding
     *
     * NOTE: DO NOT use the global atob() function - it does NOT support the
     * base64Url variant encoding.
     *
     * @param str To be decoded
     * @return Decoded result, if possible
     */
    var base64Decode = function (str) {
        try {
            return base64.decodeString(str, true);
        }
        catch (e) {
            console.error('base64Decode failed: ', e);
        }
        return null;
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns navigator.userAgent string or '' if it's not defined.
     * @return user agent string
     */
    function getUA() {
        if (typeof navigator !== 'undefined' &&
            typeof navigator['userAgent'] === 'string') {
            return navigator['userAgent'];
        }
        else {
            return '';
        }
    }
    /**
     * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
     *
     * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
     * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
     * wait for a callback.
     */
    function isMobileCordova() {
        return (typeof window !== 'undefined' &&
            // @ts-ignore Setting up an broadly applicable index signature for Window
            // just to deal with this case would probably be a bad idea.
            !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
            /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
    }
    function isBrowserExtension() {
        var runtime = typeof chrome === 'object'
            ? chrome.runtime
            : typeof browser === 'object'
                ? browser.runtime
                : undefined;
        return typeof runtime === 'object' && runtime.id !== undefined;
    }
    /**
     * Detect React Native.
     *
     * @return true if ReactNative environment is detected.
     */
    function isReactNative() {
        return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
    }
    /** Detects Internet Explorer. */
    function isIE() {
        var ua = getUA();
        return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var ERROR_NAME = 'FirebaseError';
    // Based on code from:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
    var FirebaseError = /** @class */ (function (_super) {
        __extends(FirebaseError, _super);
        function FirebaseError(code, message, customData) {
            var _this = _super.call(this, message) || this;
            _this.code = code;
            _this.customData = customData;
            _this.name = ERROR_NAME;
            // Fix For ES5
            // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(_this, FirebaseError.prototype);
            // Maintains proper stack trace for where our error was thrown.
            // Only available on V8.
            if (Error.captureStackTrace) {
                Error.captureStackTrace(_this, ErrorFactory.prototype.create);
            }
            return _this;
        }
        return FirebaseError;
    }(Error));
    var ErrorFactory = /** @class */ (function () {
        function ErrorFactory(service, serviceName, errors) {
            this.service = service;
            this.serviceName = serviceName;
            this.errors = errors;
        }
        ErrorFactory.prototype.create = function (code) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            var customData = data[0] || {};
            var fullCode = this.service + "/" + code;
            var template = this.errors[code];
            var message = template ? replaceTemplate(template, customData) : 'Error';
            // Service Name: Error message (service/code).
            var fullMessage = this.serviceName + ": " + message + " (" + fullCode + ").";
            var error = new FirebaseError(fullCode, fullMessage, customData);
            return error;
        };
        return ErrorFactory;
    }());
    function replaceTemplate(template, data) {
        return template.replace(PATTERN, function (_, key) {
            var value = data[key];
            return value != null ? String(value) : "<" + key + "?>";
        });
    }
    var PATTERN = /\{\$([^}]+)}/g;
    function isEmpty(obj) {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
     * params object (e.g. {arg: 'val', arg2: 'val2'})
     * Note: You must prepend it with ? when adding it to a URL.
     */
    function querystring(querystringParams) {
        var params = [];
        var _loop_1 = function (key, value) {
            if (Array.isArray(value)) {
                value.forEach(function (arrayVal) {
                    params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
                });
            }
            else {
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            }
        };
        for (var _i = 0, _a = Object.entries(querystringParams); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            _loop_1(key, value);
        }
        return params.length ? '&' + params.join('&') : '';
    }

    /**
     * Helper to make a Subscribe function (just like Promise helps make a
     * Thenable).
     *
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    function createSubscribe(executor, onNoObservers) {
        var proxy = new ObserverProxy(executor, onNoObservers);
        return proxy.subscribe.bind(proxy);
    }
    /**
     * Implement fan-out for any number of Observers attached via a subscribe
     * function.
     */
    var ObserverProxy = /** @class */ (function () {
        /**
         * @param executor Function which can make calls to a single Observer
         *     as a proxy.
         * @param onNoObservers Callback when count of Observers goes to zero.
         */
        function ObserverProxy(executor, onNoObservers) {
            var _this = this;
            this.observers = [];
            this.unsubscribes = [];
            this.observerCount = 0;
            // Micro-task scheduling by calling task.then().
            this.task = Promise.resolve();
            this.finalized = false;
            this.onNoObservers = onNoObservers;
            // Call the executor asynchronously so subscribers that are called
            // synchronously after the creation of the subscribe function
            // can still receive the very first value generated in the executor.
            this.task
                .then(function () {
                executor(_this);
            })
                .catch(function (e) {
                _this.error(e);
            });
        }
        ObserverProxy.prototype.next = function (value) {
            this.forEachObserver(function (observer) {
                observer.next(value);
            });
        };
        ObserverProxy.prototype.error = function (error) {
            this.forEachObserver(function (observer) {
                observer.error(error);
            });
            this.close(error);
        };
        ObserverProxy.prototype.complete = function () {
            this.forEachObserver(function (observer) {
                observer.complete();
            });
            this.close();
        };
        /**
         * Subscribe function that can be used to add an Observer to the fan-out list.
         *
         * - We require that no event is sent to a subscriber sychronously to their
         *   call to subscribe().
         */
        ObserverProxy.prototype.subscribe = function (nextOrObserver, error, complete) {
            var _this = this;
            var observer;
            if (nextOrObserver === undefined &&
                error === undefined &&
                complete === undefined) {
                throw new Error('Missing Observer.');
            }
            // Assemble an Observer object when passed as callback functions.
            if (implementsAnyMethods(nextOrObserver, [
                'next',
                'error',
                'complete'
            ])) {
                observer = nextOrObserver;
            }
            else {
                observer = {
                    next: nextOrObserver,
                    error: error,
                    complete: complete
                };
            }
            if (observer.next === undefined) {
                observer.next = noop;
            }
            if (observer.error === undefined) {
                observer.error = noop;
            }
            if (observer.complete === undefined) {
                observer.complete = noop;
            }
            var unsub = this.unsubscribeOne.bind(this, this.observers.length);
            // Attempt to subscribe to a terminated Observable - we
            // just respond to the Observer with the final error or complete
            // event.
            if (this.finalized) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this.task.then(function () {
                    try {
                        if (_this.finalError) {
                            observer.error(_this.finalError);
                        }
                        else {
                            observer.complete();
                        }
                    }
                    catch (e) {
                        // nothing
                    }
                    return;
                });
            }
            this.observers.push(observer);
            return unsub;
        };
        // Unsubscribe is synchronous - we guarantee that no events are sent to
        // any unsubscribed Observer.
        ObserverProxy.prototype.unsubscribeOne = function (i) {
            if (this.observers === undefined || this.observers[i] === undefined) {
                return;
            }
            delete this.observers[i];
            this.observerCount -= 1;
            if (this.observerCount === 0 && this.onNoObservers !== undefined) {
                this.onNoObservers(this);
            }
        };
        ObserverProxy.prototype.forEachObserver = function (fn) {
            if (this.finalized) {
                // Already closed by previous event....just eat the additional values.
                return;
            }
            // Since sendOne calls asynchronously - there is no chance that
            // this.observers will become undefined.
            for (var i = 0; i < this.observers.length; i++) {
                this.sendOne(i, fn);
            }
        };
        // Call the Observer via one of it's callback function. We are careful to
        // confirm that the observe has not been unsubscribed since this asynchronous
        // function had been queued.
        ObserverProxy.prototype.sendOne = function (i, fn) {
            var _this = this;
            // Execute the callback asynchronously
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.task.then(function () {
                if (_this.observers !== undefined && _this.observers[i] !== undefined) {
                    try {
                        fn(_this.observers[i]);
                    }
                    catch (e) {
                        // Ignore exceptions raised in Observers or missing methods of an
                        // Observer.
                        // Log error to console. b/31404806
                        if (typeof console !== 'undefined' && console.error) {
                            console.error(e);
                        }
                    }
                }
            });
        };
        ObserverProxy.prototype.close = function (err) {
            var _this = this;
            if (this.finalized) {
                return;
            }
            this.finalized = true;
            if (err !== undefined) {
                this.finalError = err;
            }
            // Proxy is no longer needed - garbage collect references
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.task.then(function () {
                _this.observers = undefined;
                _this.onNoObservers = undefined;
            });
        };
        return ObserverProxy;
    }());
    /**
     * Return true if the object passed in implements any of the named methods.
     */
    function implementsAnyMethods(obj, methods) {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }
        for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
            var method = methods_1[_i];
            if (method in obj && typeof obj[method] === 'function') {
                return true;
            }
        }
        return false;
    }
    function noop() {
        // do nothing
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArrays$1() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var _a;
    /**
     * The JS SDK supports 5 log levels and also allows a user the ability to
     * silence the logs altogether.
     *
     * The order is a follows:
     * DEBUG < VERBOSE < INFO < WARN < ERROR
     *
     * All of the log types above the current log level will be captured (i.e. if
     * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
     * `VERBOSE` logs will not)
     */
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
        LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["WARN"] = 3] = "WARN";
        LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
        LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
    })(LogLevel || (LogLevel = {}));
    var levelStringToEnum = {
        'debug': LogLevel.DEBUG,
        'verbose': LogLevel.VERBOSE,
        'info': LogLevel.INFO,
        'warn': LogLevel.WARN,
        'error': LogLevel.ERROR,
        'silent': LogLevel.SILENT
    };
    /**
     * The default log level
     */
    var defaultLogLevel = LogLevel.INFO;
    /**
     * By default, `console.debug` is not displayed in the developer console (in
     * chrome). To avoid forcing users to have to opt-in to these logs twice
     * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
     * logs to the `console.log` function.
     */
    var ConsoleMethod = (_a = {},
        _a[LogLevel.DEBUG] = 'log',
        _a[LogLevel.VERBOSE] = 'log',
        _a[LogLevel.INFO] = 'info',
        _a[LogLevel.WARN] = 'warn',
        _a[LogLevel.ERROR] = 'error',
        _a);
    /**
     * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
     * messages on to their corresponding console counterparts (if the log method
     * is supported by the current log level)
     */
    var defaultLogHandler = function (instance, logType) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (logType < instance.logLevel) {
            return;
        }
        var now = new Date().toISOString();
        var method = ConsoleMethod[logType];
        if (method) {
            console[method].apply(console, __spreadArrays$1(["[" + now + "]  " + instance.name + ":"], args));
        }
        else {
            throw new Error("Attempted to log a message with an invalid logType (value: " + logType + ")");
        }
    };
    var Logger = /** @class */ (function () {
        /**
         * Gives you an instance of a Logger to capture messages according to
         * Firebase's logging scheme.
         *
         * @param name The name that the logs will be associated with
         */
        function Logger(name) {
            this.name = name;
            /**
             * The log level of the given Logger instance.
             */
            this._logLevel = defaultLogLevel;
            /**
             * The main (internal) log handler for the Logger instance.
             * Can be set to a new function in internal package code but not by user.
             */
            this._logHandler = defaultLogHandler;
            /**
             * The optional, additional, user-defined log handler for the Logger instance.
             */
            this._userLogHandler = null;
        }
        Object.defineProperty(Logger.prototype, "logLevel", {
            get: function () {
                return this._logLevel;
            },
            set: function (val) {
                if (!(val in LogLevel)) {
                    throw new TypeError("Invalid value \"" + val + "\" assigned to `logLevel`");
                }
                this._logLevel = val;
            },
            enumerable: false,
            configurable: true
        });
        // Workaround for setter/getter having to be the same type.
        Logger.prototype.setLogLevel = function (val) {
            this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
        };
        Object.defineProperty(Logger.prototype, "logHandler", {
            get: function () {
                return this._logHandler;
            },
            set: function (val) {
                if (typeof val !== 'function') {
                    throw new TypeError('Value assigned to `logHandler` must be a function');
                }
                this._logHandler = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Logger.prototype, "userLogHandler", {
            get: function () {
                return this._userLogHandler;
            },
            set: function (val) {
                this._userLogHandler = val;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * The functions below are all based on the `console` interface
         */
        Logger.prototype.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays$1([this, LogLevel.DEBUG], args));
            this._logHandler.apply(this, __spreadArrays$1([this, LogLevel.DEBUG], args));
        };
        Logger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays$1([this, LogLevel.VERBOSE], args));
            this._logHandler.apply(this, __spreadArrays$1([this, LogLevel.VERBOSE], args));
        };
        Logger.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays$1([this, LogLevel.INFO], args));
            this._logHandler.apply(this, __spreadArrays$1([this, LogLevel.INFO], args));
        };
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays$1([this, LogLevel.WARN], args));
            this._logHandler.apply(this, __spreadArrays$1([this, LogLevel.WARN], args));
        };
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays$1([this, LogLevel.ERROR], args));
            this._logHandler.apply(this, __spreadArrays$1([this, LogLevel.ERROR], args));
        };
        return Logger;
    }());

    /**
     * Component for service name T, e.g. `auth`, `auth-internal`
     */
    var Component = /** @class */ (function () {
        /**
         *
         * @param name The public service name, e.g. app, auth, firestore, database
         * @param instanceFactory Service factory responsible for creating the public interface
         * @param type whether the service provided by the component is public or private
         */
        function Component(name, instanceFactory, type) {
            this.name = name;
            this.instanceFactory = instanceFactory;
            this.type = type;
            this.multipleInstances = false;
            /**
             * Properties to be added to the service namespace
             */
            this.serviceProps = {};
            this.instantiationMode = "LAZY" /* LAZY */;
        }
        Component.prototype.setInstantiationMode = function (mode) {
            this.instantiationMode = mode;
            return this;
        };
        Component.prototype.setMultipleInstances = function (multipleInstances) {
            this.multipleInstances = multipleInstances;
            return this;
        };
        Component.prototype.setServiceProps = function (props) {
            this.serviceProps = props;
            return this;
        };
        return Component;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _debugErrorMap() {
        var _a;
        return _a = {},
            _a["admin-restricted-operation" /* ADMIN_ONLY_OPERATION */] = 'This operation is restricted to administrators only.',
            _a["argument-error" /* ARGUMENT_ERROR */] = '',
            _a["app-not-authorized" /* APP_NOT_AUTHORIZED */] = "This app, identified by the domain where it's hosted, is not " +
                'authorized to use Firebase Authentication with the provided API key. ' +
                'Review your key configuration in the Google API console.',
            _a["app-not-installed" /* APP_NOT_INSTALLED */] = 'The requested mobile application corresponding to the identifier (' +
                'Android package name or iOS bundle ID) provided is not installed on ' +
                'this device.',
            _a["captcha-check-failed" /* CAPTCHA_CHECK_FAILED */] = 'The reCAPTCHA response token provided is either invalid, expired, ' +
                'already used or the domain associated with it does not match the list ' +
                'of whitelisted domains.',
            _a["code-expired" /* CODE_EXPIRED */] = 'The SMS code has expired. Please re-send the verification code to try ' +
                'again.',
            _a["cordova-not-ready" /* CORDOVA_NOT_READY */] = 'Cordova framework is not ready.',
            _a["cors-unsupported" /* CORS_UNSUPPORTED */] = 'This browser is not supported.',
            _a["credential-already-in-use" /* CREDENTIAL_ALREADY_IN_USE */] = 'This credential is already associated with a different user account.',
            _a["custom-token-mismatch" /* CREDENTIAL_MISMATCH */] = 'The custom token corresponds to a different audience.',
            _a["requires-recent-login" /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */] = 'This operation is sensitive and requires recent authentication. Log in ' +
                'again before retrying this request.',
            _a["dynamic-link-not-activated" /* DYNAMIC_LINK_NOT_ACTIVATED */] = 'Please activate Dynamic Links in the Firebase Console and agree to the terms and ' +
                'conditions.',
            _a["email-change-needs-verification" /* EMAIL_CHANGE_NEEDS_VERIFICATION */] = 'Multi-factor users must always have a verified email.',
            _a["email-already-in-use" /* EMAIL_EXISTS */] = 'The email address is already in use by another account.',
            _a["emulator-config-failed" /* EMULATOR_CONFIG_FAILED */] = 'Auth instance has already been used to make a network call. Auth can ' +
                'no longer be configured to use the emulator. Try calling ' +
                '"useEmulator()" sooner.',
            _a["expired-action-code" /* EXPIRED_OOB_CODE */] = 'The action code has expired.',
            _a["cancelled-popup-request" /* EXPIRED_POPUP_REQUEST */] = 'This operation has been cancelled due to another conflicting popup being opened.',
            _a["internal-error" /* INTERNAL_ERROR */] = 'An internal AuthError has occurred.',
            _a["invalid-app-credential" /* INVALID_APP_CREDENTIAL */] = 'The phone verification request contains an invalid application verifier.' +
                ' The reCAPTCHA token response is either invalid or expired.',
            _a["invalid-app-id" /* INVALID_APP_ID */] = 'The mobile app identifier is not registed for the current project.',
            _a["invalid-user-token" /* INVALID_AUTH */] = "This user's credential isn't valid for this project. This can happen " +
                "if the user's token has been tampered with, or if the user isn't for " +
                'the project associated with this API key.',
            _a["invalid-auth-event" /* INVALID_AUTH_EVENT */] = 'An internal AuthError has occurred.',
            _a["invalid-verification-code" /* INVALID_CODE */] = 'The SMS verification code used to create the phone auth credential is ' +
                'invalid. Please resend the verification code sms and be sure use the ' +
                'verification code provided by the user.',
            _a["invalid-continue-uri" /* INVALID_CONTINUE_URI */] = 'The continue URL provided in the request is invalid.',
            _a["invalid-cordova-configuration" /* INVALID_CORDOVA_CONFIGURATION */] = 'The following Cordova plugins must be installed to enable OAuth sign-in: ' +
                'cordova-plugin-buildinfo, cordova-universal-links-plugin, ' +
                'cordova-plugin-browsertab, cordova-plugin-inappbrowser and ' +
                'cordova-plugin-customurlscheme.',
            _a["invalid-custom-token" /* INVALID_CUSTOM_TOKEN */] = 'The custom token format is incorrect. Please check the documentation.',
            _a["invalid-dynamic-link-domain" /* INVALID_DYNAMIC_LINK_DOMAIN */] = 'The provided dynamic link domain is not configured or authorized for the current project.',
            _a["invalid-email" /* INVALID_EMAIL */] = 'The email address is badly formatted.',
            _a["invalid-emulator-scheme" /* INVALID_EMULATOR_SCHEME */] = 'Emulator URL must start with a valid scheme (http:// or https://).',
            _a["invalid-api-key" /* INVALID_API_KEY */] = 'Your API key is invalid, please check you have copied it correctly.',
            _a["invalid-cert-hash" /* INVALID_CERT_HASH */] = 'The SHA-1 certificate hash provided is invalid.',
            _a["invalid-credential" /* INVALID_IDP_RESPONSE */] = 'The supplied auth credential is malformed or has expired.',
            _a["invalid-message-payload" /* INVALID_MESSAGE_PAYLOAD */] = 'The email template corresponding to this action contains invalid characters in its message. ' +
                'Please fix by going to the Auth email templates section in the Firebase Console.',
            _a["invalid-multi-factor-session" /* INVALID_MFA_SESSION */] = 'The request does not contain a valid proof of first factor successful sign-in.',
            _a["invalid-oauth-provider" /* INVALID_OAUTH_PROVIDER */] = 'EmailAuthProvider is not supported for this operation. This operation ' +
                'only supports OAuth providers.',
            _a["invalid-oauth-client-id" /* INVALID_OAUTH_CLIENT_ID */] = 'The OAuth client ID provided is either invalid or does not match the ' +
                'specified API key.',
            _a["unauthorized-domain" /* INVALID_ORIGIN */] = 'This domain is not authorized for OAuth operations for your Firebase ' +
                'project. Edit the list of authorized domains from the Firebase console.',
            _a["invalid-action-code" /* INVALID_OOB_CODE */] = 'The action code is invalid. This can happen if the code is malformed, ' +
                'expired, or has already been used.',
            _a["wrong-password" /* INVALID_PASSWORD */] = 'The password is invalid or the user does not have a password.',
            _a["invalid-persistence-type" /* INVALID_PERSISTENCE */] = 'The specified persistence type is invalid. It can only be local, session or none.',
            _a["invalid-phone-number" /* INVALID_PHONE_NUMBER */] = 'The format of the phone number provided is incorrect. Please enter the ' +
                'phone number in a format that can be parsed into E.164 format. E.164 ' +
                'phone numbers are written in the format [+][country code][subscriber ' +
                'number including area code].',
            _a["invalid-provider-id" /* INVALID_PROVIDER_ID */] = 'The specified provider ID is invalid.',
            _a["invalid-recipient-email" /* INVALID_RECIPIENT_EMAIL */] = 'The email corresponding to this action failed to send as the provided ' +
                'recipient email address is invalid.',
            _a["invalid-sender" /* INVALID_SENDER */] = 'The email template corresponding to this action contains an invalid sender email or name. ' +
                'Please fix by going to the Auth email templates section in the Firebase Console.',
            _a["invalid-verification-id" /* INVALID_SESSION_INFO */] = 'The verification ID used to create the phone auth credential is invalid.',
            _a["invalid-tenant-id" /* INVALID_TENANT_ID */] = "The Auth instance's tenant ID is invalid.",
            _a["missing-android-pkg-name" /* MISSING_ANDROID_PACKAGE_NAME */] = 'An Android Package Name must be provided if the Android App is required to be installed.',
            _a["auth-domain-config-required" /* MISSING_AUTH_DOMAIN */] = 'Be sure to include authDomain when calling firebase.initializeApp(), ' +
                'by following the instructions in the Firebase console.',
            _a["missing-app-credential" /* MISSING_APP_CREDENTIAL */] = 'The phone verification request is missing an application verifier ' +
                'assertion. A reCAPTCHA response token needs to be provided.',
            _a["missing-verification-code" /* MISSING_CODE */] = 'The phone auth credential was created with an empty SMS verification code.',
            _a["missing-continue-uri" /* MISSING_CONTINUE_URI */] = 'A continue URL must be provided in the request.',
            _a["missing-iframe-start" /* MISSING_IFRAME_START */] = 'An internal AuthError has occurred.',
            _a["missing-ios-bundle-id" /* MISSING_IOS_BUNDLE_ID */] = 'An iOS Bundle ID must be provided if an App Store ID is provided.',
            _a["missing-or-invalid-nonce" /* MISSING_OR_INVALID_NONCE */] = 'The request does not contain a valid nonce. This can occur if the ' +
                'SHA-256 hash of the provided raw nonce does not match the hashed nonce ' +
                'in the ID token payload.',
            _a["missing-multi-factor-info" /* MISSING_MFA_INFO */] = 'No second factor identifier is provided.',
            _a["missing-multi-factor-session" /* MISSING_MFA_SESSION */] = 'The request is missing proof of first factor successful sign-in.',
            _a["missing-phone-number" /* MISSING_PHONE_NUMBER */] = 'To send verification codes, provide a phone number for the recipient.',
            _a["missing-verification-id" /* MISSING_SESSION_INFO */] = 'The phone auth credential was created with an empty verification ID.',
            _a["app-deleted" /* MODULE_DESTROYED */] = 'This instance of FirebaseApp has been deleted.',
            _a["multi-factor-info-not-found" /* MFA_INFO_NOT_FOUND */] = 'The user does not have a second factor matching the identifier provided.',
            _a["multi-factor-auth-required" /* MFA_REQUIRED */] = 'Proof of ownership of a second factor is required to complete sign-in.',
            _a["account-exists-with-different-credential" /* NEED_CONFIRMATION */] = 'An account already exists with the same email address but different ' +
                'sign-in credentials. Sign in using a provider associated with this ' +
                'email address.',
            _a["network-request-failed" /* NETWORK_REQUEST_FAILED */] = 'A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.',
            _a["no-auth-event" /* NO_AUTH_EVENT */] = 'An internal AuthError has occurred.',
            _a["no-such-provider" /* NO_SUCH_PROVIDER */] = 'User was not linked to an account with the given provider.',
            _a["null-user" /* NULL_USER */] = 'A null user object was provided as the argument for an operation which ' +
                'requires a non-null user object.',
            _a["operation-not-allowed" /* OPERATION_NOT_ALLOWED */] = 'The given sign-in provider is disabled for this Firebase project. ' +
                'Enable it in the Firebase console, under the sign-in method tab of the ' +
                'Auth section.',
            _a["operation-not-supported-in-this-environment" /* OPERATION_NOT_SUPPORTED */] = 'This operation is not supported in the environment this application is ' +
                'running on. "location.protocol" must be http, https or chrome-extension' +
                ' and web storage must be enabled.',
            _a["popup-blocked" /* POPUP_BLOCKED */] = 'Unable to establish a connection with the popup. It may have been blocked by the browser.',
            _a["popup-closed-by-user" /* POPUP_CLOSED_BY_USER */] = 'The popup has been closed by the user before finalizing the operation.',
            _a["provider-already-linked" /* PROVIDER_ALREADY_LINKED */] = 'User can only be linked to one identity for the given provider.',
            _a["quota-exceeded" /* QUOTA_EXCEEDED */] = "The project's quota for this operation has been exceeded.",
            _a["redirect-cancelled-by-user" /* REDIRECT_CANCELLED_BY_USER */] = 'The redirect operation has been cancelled by the user before finalizing.',
            _a["redirect-operation-pending" /* REDIRECT_OPERATION_PENDING */] = 'A redirect sign-in operation is already pending.',
            _a["rejected-credential" /* REJECTED_CREDENTIAL */] = 'The request contains malformed or mismatching credentials.',
            _a["second-factor-already-in-use" /* SECOND_FACTOR_ALREADY_ENROLLED */] = 'The second factor is already enrolled on this account.',
            _a["maximum-second-factor-count-exceeded" /* SECOND_FACTOR_LIMIT_EXCEEDED */] = 'The maximum allowed number of second factors on a user has been exceeded.',
            _a["tenant-id-mismatch" /* TENANT_ID_MISMATCH */] = "The provided tenant ID does not match the Auth instance's tenant ID",
            _a["timeout" /* TIMEOUT */] = 'The operation has timed out.',
            _a["user-token-expired" /* TOKEN_EXPIRED */] = "The user's credential is no longer valid. The user must sign in again.",
            _a["too-many-requests" /* TOO_MANY_ATTEMPTS_TRY_LATER */] = 'We have blocked all requests from this device due to unusual activity. ' +
                'Try again later.',
            _a["unauthorized-continue-uri" /* UNAUTHORIZED_DOMAIN */] = 'The domain of the continue URL is not whitelisted.  Please whitelist ' +
                'the domain in the Firebase console.',
            _a["unsupported-first-factor" /* UNSUPPORTED_FIRST_FACTOR */] = 'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',
            _a["unsupported-persistence-type" /* UNSUPPORTED_PERSISTENCE */] = 'The current environment does not support the specified persistence type.',
            _a["unsupported-tenant-operation" /* UNSUPPORTED_TENANT_OPERATION */] = 'This operation is not supported in a multi-tenant context.',
            _a["unverified-email" /* UNVERIFIED_EMAIL */] = 'The operation requires a verified email.',
            _a["user-cancelled" /* USER_CANCELLED */] = 'The user did not grant your application the permissions it requested.',
            _a["user-not-found" /* USER_DELETED */] = 'There is no user record corresponding to this identifier. The user may ' +
                'have been deleted.',
            _a["user-disabled" /* USER_DISABLED */] = 'The user account has been disabled by an administrator.',
            _a["user-mismatch" /* USER_MISMATCH */] = 'The supplied credentials do not correspond to the previously signed in user.',
            _a["user-signed-out" /* USER_SIGNED_OUT */] = '',
            _a["weak-password" /* WEAK_PASSWORD */] = 'The password must be 6 characters long or more.',
            _a["web-storage-unsupported" /* WEB_STORAGE_UNSUPPORTED */] = 'This browser is not supported or 3rd party cookies and data may be disabled.',
            _a;
    }
    function _prodErrorMap() {
        return {};
    }
    /**
     * A verbose error map with detailed descriptions for most error codes.
     *
     * See discussion at {@link @firebase/auth-types#AuthErrorMap}
     *
     * @public
     */
    var debugErrorMap = _debugErrorMap;
    /**
     * A minimal error map with all verbose error messages stripped.
     *
     * See discussion at {@link @firebase/auth-types#AuthErrorMap}
     *
     * @public
     */
    var prodErrorMap = _prodErrorMap;
    var _DEFAULT_AUTH_ERROR_FACTORY = new ErrorFactory('auth', 'Firebase', _prodErrorMap());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var logClient = new Logger('@firebase/auth-exp');
    function _logError(msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (logClient.logLevel <= LogLevel.ERROR) {
            logClient.error.apply(logClient, __spreadArrays(["Auth (" + app.SDK_VERSION + "): " + msg], args));
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _fail(authOrCode) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        throw createErrorInternal.apply(void 0, __spreadArrays([authOrCode], rest));
    }
    function _createError(authOrCode) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return createErrorInternal.apply(void 0, __spreadArrays([authOrCode], rest));
    }
    function createErrorInternal(authOrCode) {
        var _a;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        if (typeof authOrCode !== 'string') {
            var code = rest[0];
            var fullParams = __spreadArrays(rest.slice(1));
            if (fullParams[0]) {
                fullParams[0].appName = authOrCode.name;
            }
            return (_a = authOrCode._errorFactory).create.apply(_a, __spreadArrays([code], fullParams));
        }
        return _DEFAULT_AUTH_ERROR_FACTORY.create.apply(_DEFAULT_AUTH_ERROR_FACTORY, __spreadArrays([authOrCode], rest));
    }
    function _assert(assertion, authOrCode) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        if (!assertion) {
            throw createErrorInternal.apply(void 0, __spreadArrays([authOrCode], rest));
        }
    }
    /**
     * Unconditionally fails, throwing an internal error with the given message.
     *
     * @param failure type of failure encountered
     * @throws Error
     */
    function debugFail(failure) {
        // Log the failure in addition to throw an exception, just in case the
        // exception is swallowed.
        var message = "INTERNAL ASSERTION FAILED: " + failure;
        _logError(message);
        // NOTE: We don't use FirebaseError here because these are internal failures
        // that cannot be handled by the user. (Also it would create a circular
        // dependency between the error and assert modules which doesn't work.)
        throw new Error(message);
    }
    /**
     * Fails if the given assertion condition is false, throwing an Error with the
     * given message if it did.
     *
     * @param assertion
     * @param message
     */
    function debugAssert(assertion, message) {
        if (!assertion) {
            debugFail(message);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var instanceCache = new Map();
    function _getInstance(cls) {
        debugAssert(cls instanceof Function, 'Expected a class definition');
        var instance = instanceCache.get(cls);
        if (instance) {
            debugAssert(instance instanceof cls, 'Instance stored in cache mismatched with class');
            return instance;
        }
        instance = new cls();
        instanceCache.set(cls, instance);
        return instance;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** @public */
    function initializeAuth(app$1, deps) {
        var auth = app._getProvider(app$1, 'auth-exp').getImmediate();
        _initializeAuthInstance(auth, deps);
        return auth;
    }
    function _initializeAuthInstance(auth, deps) {
        var persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
        var hierarchy = (Array.isArray(persistence)
            ? persistence
            : [persistence]).map(_getInstance);
        if (deps === null || deps === void 0 ? void 0 : deps.errorMap) {
            auth._updateErrorMap(deps.errorMap);
        }
        // This promise is intended to float; auth initialization happens in the
        // background, meanwhile the auth object may be used by the app.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        auth._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * {@inheritdoc @firebase/auth-types#AuthCredential}
     *
     * @public
     */
    var AuthCredential = /** @class */ (function () {
        /** @internal */
        function AuthCredential(providerId, signInMethod) {
            this.providerId = providerId;
            this.signInMethod = signInMethod;
        }
        /** {@inheritdoc @firebase/auth-types#AuthCredential.toJSON} */
        AuthCredential.prototype.toJSON = function () {
            return debugFail('not implemented');
        };
        /** @internal */
        AuthCredential.prototype._getIdTokenResponse = function (_auth) {
            return debugFail('not implemented');
        };
        /** @internal */
        AuthCredential.prototype._linkToIdToken = function (_auth, _idToken) {
            return debugFail('not implemented');
        };
        /** @internal */
        AuthCredential.prototype._getReauthenticationResolver = function (_auth) {
            return debugFail('not implemented');
        };
        return AuthCredential;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _getCurrentUrl() {
        var _a;
        return (typeof self !== 'undefined' && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href)) || '';
    }
    function _isHttpOrHttps() {
        return _getCurrentScheme() === 'http:' || _getCurrentScheme() === 'https:';
    }
    function _getCurrentScheme() {
        var _a;
        return (typeof self !== 'undefined' && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol)) || null;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Determine whether the browser is working online
     */
    function _isOnline() {
        if (typeof navigator !== 'undefined' &&
            navigator &&
            'onLine' in navigator &&
            typeof navigator.onLine === 'boolean' &&
            // Apply only for traditional web apps and Chrome extensions.
            // This is especially true for Cordova apps which have unreliable
            // navigator.onLine behavior unless cordova-plugin-network-information is
            // installed which overwrites the native navigator.onLine value and
            // defines navigator.connection.
            (_isHttpOrHttps() || isBrowserExtension() || 'connection' in navigator)) {
            return navigator.onLine;
        }
        // If we can't determine the state, assume it is online.
        return true;
    }
    function _getUserLanguage() {
        if (typeof navigator === 'undefined') {
            return null;
        }
        var navigatorLanguage = navigator;
        return (
        // Most reliable, but only supported in Chrome/Firefox.
        (navigatorLanguage.languages && navigatorLanguage.languages[0]) ||
            // Supported in most browsers, but returns the language of the browser
            // UI, not the language set in browser settings.
            navigatorLanguage.language ||
            // Couldn't determine language.
            null);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A structure to help pick between a range of long and short delay durations
     * depending on the current environment. In general, the long delay is used for
     * mobile environments whereas short delays are used for desktop environments.
     */
    var Delay = /** @class */ (function () {
        function Delay(shortDelay, longDelay) {
            this.shortDelay = shortDelay;
            this.longDelay = longDelay;
            // Internal error when improperly initialized.
            debugAssert(longDelay > shortDelay, 'Short delay should be less than long delay!');
            this.isMobile = isMobileCordova() || isReactNative();
        }
        Delay.prototype.get = function () {
            if (!_isOnline()) {
                // Pick the shorter timeout.
                return Math.min(5000 /* OFFLINE */, this.shortDelay);
            }
            // If running in a mobile environment, return the long delay, otherwise
            // return the short delay.
            // This could be improved in the future to dynamically change based on other
            // variables instead of just reading the current environment.
            return this.isMobile ? this.longDelay : this.shortDelay;
        };
        return Delay;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _emulatorUrl(config, path) {
        debugAssert(config.emulator, 'Emulator should always be set here');
        var url = config.emulator.url;
        var emulatorHost = new URL(url).toString();
        if (!path) {
            return emulatorHost;
        }
        return "" + emulatorHost + (path.startsWith('/') ? path.slice(1) : path);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var FetchProvider = /** @class */ (function () {
        function FetchProvider() {
        }
        FetchProvider.initialize = function (fetchImpl, headersImpl, responseImpl) {
            this.fetchImpl = fetchImpl;
            if (headersImpl) {
                this.headersImpl = headersImpl;
            }
            if (responseImpl) {
                this.responseImpl = responseImpl;
            }
        };
        FetchProvider.fetch = function () {
            if (this.fetchImpl) {
                return this.fetchImpl;
            }
            if (typeof self !== 'undefined' && 'fetch' in self) {
                return self.fetch;
            }
            debugFail('Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
        };
        FetchProvider.headers = function () {
            if (this.headersImpl) {
                return this.headersImpl;
            }
            if (typeof self !== 'undefined' && 'Headers' in self) {
                return self.Headers;
            }
            debugFail('Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
        };
        FetchProvider.response = function () {
            if (this.responseImpl) {
                return this.responseImpl;
            }
            if (typeof self !== 'undefined' && 'Response' in self) {
                return self.Response;
            }
            debugFail('Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
        };
        return FetchProvider;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var _a$1;
    /**
     * Map from errors returned by the server to errors to developer visible errors
     */
    var SERVER_ERROR_MAP = (_a$1 = {},
        // Custom token errors.
        _a$1["CREDENTIAL_MISMATCH" /* CREDENTIAL_MISMATCH */] = "custom-token-mismatch" /* CREDENTIAL_MISMATCH */,
        // This can only happen if the SDK sends a bad request.
        _a$1["MISSING_CUSTOM_TOKEN" /* MISSING_CUSTOM_TOKEN */] = "internal-error" /* INTERNAL_ERROR */,
        // Create Auth URI errors.
        _a$1["INVALID_IDENTIFIER" /* INVALID_IDENTIFIER */] = "invalid-email" /* INVALID_EMAIL */,
        // This can only happen if the SDK sends a bad request.
        _a$1["MISSING_CONTINUE_URI" /* MISSING_CONTINUE_URI */] = "internal-error" /* INTERNAL_ERROR */,
        // Sign in with email and password errors (some apply to sign up too).
        _a$1["INVALID_PASSWORD" /* INVALID_PASSWORD */] = "wrong-password" /* INVALID_PASSWORD */,
        // This can only happen if the SDK sends a bad request.
        _a$1["MISSING_PASSWORD" /* MISSING_PASSWORD */] = "internal-error" /* INTERNAL_ERROR */,
        // Sign up with email and password errors.
        _a$1["EMAIL_EXISTS" /* EMAIL_EXISTS */] = "email-already-in-use" /* EMAIL_EXISTS */,
        _a$1["PASSWORD_LOGIN_DISABLED" /* PASSWORD_LOGIN_DISABLED */] = "operation-not-allowed" /* OPERATION_NOT_ALLOWED */,
        // Verify assertion for sign in with credential errors:
        _a$1["INVALID_IDP_RESPONSE" /* INVALID_IDP_RESPONSE */] = "invalid-credential" /* INVALID_IDP_RESPONSE */,
        _a$1["INVALID_PENDING_TOKEN" /* INVALID_PENDING_TOKEN */] = "invalid-credential" /* INVALID_IDP_RESPONSE */,
        _a$1["FEDERATED_USER_ID_ALREADY_LINKED" /* FEDERATED_USER_ID_ALREADY_LINKED */] = "credential-already-in-use" /* CREDENTIAL_ALREADY_IN_USE */,
        // This can only happen if the SDK sends a bad request.
        _a$1["MISSING_REQ_TYPE" /* MISSING_REQ_TYPE */] = "internal-error" /* INTERNAL_ERROR */,
        // Send Password reset email errors:
        _a$1["EMAIL_NOT_FOUND" /* EMAIL_NOT_FOUND */] = "user-not-found" /* USER_DELETED */,
        _a$1["RESET_PASSWORD_EXCEED_LIMIT" /* RESET_PASSWORD_EXCEED_LIMIT */] = "too-many-requests" /* TOO_MANY_ATTEMPTS_TRY_LATER */,
        _a$1["EXPIRED_OOB_CODE" /* EXPIRED_OOB_CODE */] = "expired-action-code" /* EXPIRED_OOB_CODE */,
        _a$1["INVALID_OOB_CODE" /* INVALID_OOB_CODE */] = "invalid-action-code" /* INVALID_OOB_CODE */,
        // This can only happen if the SDK sends a bad request.
        _a$1["MISSING_OOB_CODE" /* MISSING_OOB_CODE */] = "internal-error" /* INTERNAL_ERROR */,
        // Operations that require ID token in request:
        _a$1["CREDENTIAL_TOO_OLD_LOGIN_AGAIN" /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */] = "requires-recent-login" /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */,
        _a$1["INVALID_ID_TOKEN" /* INVALID_ID_TOKEN */] = "invalid-user-token" /* INVALID_AUTH */,
        _a$1["TOKEN_EXPIRED" /* TOKEN_EXPIRED */] = "user-token-expired" /* TOKEN_EXPIRED */,
        _a$1["USER_NOT_FOUND" /* USER_NOT_FOUND */] = "user-token-expired" /* TOKEN_EXPIRED */,
        // Other errors.
        _a$1["TOO_MANY_ATTEMPTS_TRY_LATER" /* TOO_MANY_ATTEMPTS_TRY_LATER */] = "too-many-requests" /* TOO_MANY_ATTEMPTS_TRY_LATER */,
        // Phone Auth related errors.
        _a$1["INVALID_CODE" /* INVALID_CODE */] = "invalid-verification-code" /* INVALID_CODE */,
        _a$1["INVALID_SESSION_INFO" /* INVALID_SESSION_INFO */] = "invalid-verification-id" /* INVALID_SESSION_INFO */,
        _a$1["INVALID_TEMPORARY_PROOF" /* INVALID_TEMPORARY_PROOF */] = "invalid-credential" /* INVALID_IDP_RESPONSE */,
        _a$1["MISSING_SESSION_INFO" /* MISSING_SESSION_INFO */] = "missing-verification-id" /* MISSING_SESSION_INFO */,
        _a$1["SESSION_EXPIRED" /* SESSION_EXPIRED */] = "code-expired" /* CODE_EXPIRED */,
        // Other action code errors when additional settings passed.
        // MISSING_CONTINUE_URI is getting mapped to INTERNAL_ERROR above.
        // This is OK as this error will be caught by client side validation.
        _a$1["MISSING_ANDROID_PACKAGE_NAME" /* MISSING_ANDROID_PACKAGE_NAME */] = "missing-android-pkg-name" /* MISSING_ANDROID_PACKAGE_NAME */,
        _a$1["UNAUTHORIZED_DOMAIN" /* UNAUTHORIZED_DOMAIN */] = "unauthorized-continue-uri" /* UNAUTHORIZED_DOMAIN */,
        // getProjectConfig errors when clientId is passed.
        _a$1["INVALID_OAUTH_CLIENT_ID" /* INVALID_OAUTH_CLIENT_ID */] = "invalid-oauth-client-id" /* INVALID_OAUTH_CLIENT_ID */,
        // User actions (sign-up or deletion) disabled errors.
        _a$1["ADMIN_ONLY_OPERATION" /* ADMIN_ONLY_OPERATION */] = "admin-restricted-operation" /* ADMIN_ONLY_OPERATION */,
        // Multi factor related errors.
        _a$1["INVALID_MFA_PENDING_CREDENTIAL" /* INVALID_MFA_PENDING_CREDENTIAL */] = "invalid-multi-factor-session" /* INVALID_MFA_SESSION */,
        _a$1["MFA_ENROLLMENT_NOT_FOUND" /* MFA_ENROLLMENT_NOT_FOUND */] = "multi-factor-info-not-found" /* MFA_INFO_NOT_FOUND */,
        _a$1["MISSING_MFA_ENROLLMENT_ID" /* MISSING_MFA_ENROLLMENT_ID */] = "missing-multi-factor-info" /* MISSING_MFA_INFO */,
        _a$1["MISSING_MFA_PENDING_CREDENTIAL" /* MISSING_MFA_PENDING_CREDENTIAL */] = "missing-multi-factor-session" /* MISSING_MFA_SESSION */,
        _a$1["SECOND_FACTOR_EXISTS" /* SECOND_FACTOR_EXISTS */] = "second-factor-already-in-use" /* SECOND_FACTOR_ALREADY_ENROLLED */,
        _a$1["SECOND_FACTOR_LIMIT_EXCEEDED" /* SECOND_FACTOR_LIMIT_EXCEEDED */] = "maximum-second-factor-count-exceeded" /* SECOND_FACTOR_LIMIT_EXCEEDED */,
        _a$1);

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var DEFAULT_API_TIMEOUT_MS = new Delay(30000, 60000);
    function _performApiRequest(auth, method, path, request, customErrorMap) {
        if (customErrorMap === void 0) { customErrorMap = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performFetchWithErrorHandling(auth, customErrorMap, function () {
                        var body = {};
                        var params = {};
                        if (request) {
                            if (method === "GET" /* GET */) {
                                params = request;
                            }
                            else {
                                body = {
                                    body: JSON.stringify(request)
                                };
                            }
                        }
                        var query = querystring(__assign({ key: auth.config.apiKey }, params)).slice(1);
                        var headers = new (FetchProvider.headers())();
                        headers.set("Content-Type" /* CONTENT_TYPE */, 'application/json');
                        headers.set("X-Client-Version" /* X_CLIENT_VERSION */, auth.config.sdkClientVersion);
                        if (auth.languageCode) {
                            headers.set("X-Firebase-Locale" /* X_FIREBASE_LOCALE */, auth.languageCode);
                        }
                        return FetchProvider.fetch()(_getFinalTarget(auth, auth.config.apiHost, path, query), __assign({ method: method,
                            headers: headers, referrerPolicy: 'no-referrer' }, body));
                    })];
            });
        });
    }
    function _performFetchWithErrorHandling(auth, customErrorMap, fetchFn) {
        return __awaiter(this, void 0, void 0, function () {
            var errorMap, networkTimeout, response, json, serverErrorCode, authError, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth._canInitEmulator = false;
                        errorMap = __assign(__assign({}, SERVER_ERROR_MAP), customErrorMap);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        networkTimeout = new NetworkTimeout(auth);
                        return [4 /*yield*/, Promise.race([
                                fetchFn(),
                                networkTimeout.promise
                            ])];
                    case 2:
                        response = _a.sent();
                        // If we've reached this point, the fetch succeeded and the networkTimeout
                        // didn't throw; clear the network timeout delay so that Node won't hang
                        networkTimeout.clearNetworkTimeout();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        json = _a.sent();
                        if ('needConfirmation' in json) {
                            throw makeTaggedError(auth, "account-exists-with-different-credential" /* NEED_CONFIRMATION */, json);
                        }
                        if (response.ok) {
                            return [2 /*return*/, json];
                        }
                        else {
                            serverErrorCode = json.error.message.split(' : ')[0];
                            if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED" /* FEDERATED_USER_ID_ALREADY_LINKED */) {
                                throw makeTaggedError(auth, "credential-already-in-use" /* CREDENTIAL_ALREADY_IN_USE */, json);
                            }
                            else if (serverErrorCode === "EMAIL_EXISTS" /* EMAIL_EXISTS */) {
                                throw makeTaggedError(auth, "email-already-in-use" /* EMAIL_EXISTS */, json);
                            }
                            authError = errorMap[serverErrorCode] ||
                                serverErrorCode
                                    .toLowerCase()
                                    .replace(/[_\s]+/g, '-');
                            _fail(auth, authError);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (e_1 instanceof FirebaseError) {
                            throw e_1;
                        }
                        _fail(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function _performSignInRequest(auth, method, path, request, customErrorMap) {
        if (customErrorMap === void 0) { customErrorMap = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var serverResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _performApiRequest(auth, method, path, request, customErrorMap)];
                    case 1:
                        serverResponse = (_a.sent());
                        if ('mfaPendingCredential' in serverResponse) {
                            _fail(auth, "multi-factor-auth-required" /* MFA_REQUIRED */, {
                                serverResponse: serverResponse
                            });
                        }
                        return [2 /*return*/, serverResponse];
                }
            });
        });
    }
    function _getFinalTarget(auth, host, path, query) {
        var base = "" + host + path + "?" + query;
        if (!auth.config.emulator) {
            return auth.config.apiScheme + "://" + base;
        }
        return _emulatorUrl(auth.config, base);
    }
    var NetworkTimeout = /** @class */ (function () {
        function NetworkTimeout(auth) {
            var _this = this;
            this.auth = auth;
            // Node timers and browser timers are fundamentally incompatible, but we
            // don't care about the value here
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.timer = null;
            this.promise = new Promise(function (_, reject) {
                _this.timer = setTimeout(function () {
                    return reject(_createError(_this.auth, "timeout" /* TIMEOUT */));
                }, DEFAULT_API_TIMEOUT_MS.get());
            });
        }
        NetworkTimeout.prototype.clearNetworkTimeout = function () {
            clearTimeout(this.timer);
        };
        return NetworkTimeout;
    }());
    function makeTaggedError(auth, code, response) {
        var errorParams = {
            appName: auth.name
        };
        if (response.email) {
            errorParams.email = response.email;
        }
        if (response.phoneNumber) {
            errorParams.phoneNumber = response.phoneNumber;
        }
        var error = _createError(auth, code, errorParams);
        // We know customData is defined on error because errorParams is defined
        error.customData._tokenResponse = response;
        return error;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function resetPassword(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:resetPassword" /* RESET_PASSWORD */, request)];
            });
        });
    }
    function updateEmailPassword(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:update" /* SET_ACCOUNT_INFO */, request)];
            });
        });
    }
    function applyActionCode(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:update" /* SET_ACCOUNT_INFO */, request)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function signInWithPassword(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithPassword" /* SIGN_IN_WITH_PASSWORD */, request)];
            });
        });
    }
    function sendOobCode(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:sendOobCode" /* SEND_OOB_CODE */, request)];
            });
        });
    }
    function sendEmailVerification(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, sendOobCode(auth, request)];
            });
        });
    }
    function sendPasswordResetEmail(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, sendOobCode(auth, request)];
            });
        });
    }
    function sendSignInLinkToEmail(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, sendOobCode(auth, request)];
            });
        });
    }
    function verifyAndChangeEmail(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, sendOobCode(auth, request)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function signInWithEmailLink(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithEmailLink" /* SIGN_IN_WITH_EMAIL_LINK */, request)];
            });
        });
    }
    function signInWithEmailLinkForLinking(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithEmailLink" /* SIGN_IN_WITH_EMAIL_LINK */, request)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Interface that represents the credentials returned by {@link EmailAuthProvider} for
     * {@link @firebase/auth-types#ProviderId.PASSWORD}
     *
     * @remarks
     * Covers both {@link @firebase/auth-types#SignInMethod.EMAIL_PASSWORD} and
     * {@link @firebase/auth-types#SignInMethod.EMAIL_LINK}.
     *
     * @public
     */
    var EmailAuthCredential = /** @class */ (function (_super) {
        __extends(EmailAuthCredential, _super);
        /** @internal */
        function EmailAuthCredential(email, password, signInMethod, tenantId) {
            if (tenantId === void 0) { tenantId = null; }
            var _this = _super.call(this, "password" /* PASSWORD */, signInMethod) || this;
            _this.email = email;
            _this.password = password;
            _this.tenantId = tenantId;
            return _this;
        }
        /** @internal */
        EmailAuthCredential._fromEmailAndPassword = function (email, password) {
            return new EmailAuthCredential(email, password, "password" /* EMAIL_PASSWORD */);
        };
        /** @internal */
        EmailAuthCredential._fromEmailAndCode = function (email, oobCode, tenantId) {
            if (tenantId === void 0) { tenantId = null; }
            return new EmailAuthCredential(email, oobCode, "emailLink" /* EMAIL_LINK */, tenantId);
        };
        /** {@inheritdoc @firebase/auth-types#AuthCredential.toJSON} */
        EmailAuthCredential.prototype.toJSON = function () {
            return {
                email: this.email,
                password: this.password,
                signInMethod: this.signInMethod,
                tenantId: this.tenantId
            };
        };
        /** {@inheritdoc @firebase/auth-types#AuthCredential.fromJSON} */
        EmailAuthCredential.fromJSON = function (json) {
            var obj = typeof json === 'string' ? JSON.parse(json) : json;
            if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
                if (obj.signInMethod === "password" /* EMAIL_PASSWORD */) {
                    return this._fromEmailAndPassword(obj.email, obj.password);
                }
                else if (obj.signInMethod === "emailLink" /* EMAIL_LINK */) {
                    return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
                }
            }
            return null;
        };
        /** @internal */
        EmailAuthCredential.prototype._getIdTokenResponse = function (auth) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (this.signInMethod) {
                        case "password" /* EMAIL_PASSWORD */:
                            return [2 /*return*/, signInWithPassword(auth, {
                                    returnSecureToken: true,
                                    email: this.email,
                                    password: this.password
                                })];
                        case "emailLink" /* EMAIL_LINK */:
                            return [2 /*return*/, signInWithEmailLink(auth, {
                                    email: this.email,
                                    oobCode: this.password
                                })];
                        default:
                            _fail(auth, "internal-error" /* INTERNAL_ERROR */);
                    }
                    return [2 /*return*/];
                });
            });
        };
        /** @internal */
        EmailAuthCredential.prototype._linkToIdToken = function (auth, idToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (this.signInMethod) {
                        case "password" /* EMAIL_PASSWORD */:
                            return [2 /*return*/, updateEmailPassword(auth, {
                                    idToken: idToken,
                                    returnSecureToken: true,
                                    email: this.email,
                                    password: this.password
                                })];
                        case "emailLink" /* EMAIL_LINK */:
                            return [2 /*return*/, signInWithEmailLinkForLinking(auth, {
                                    idToken: idToken,
                                    email: this.email,
                                    oobCode: this.password
                                })];
                        default:
                            _fail(auth, "internal-error" /* INTERNAL_ERROR */);
                    }
                    return [2 /*return*/];
                });
            });
        };
        /** @internal */
        EmailAuthCredential.prototype._getReauthenticationResolver = function (auth) {
            return this._getIdTokenResponse(auth);
        };
        return EmailAuthCredential;
    }(AuthCredential));

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function signInWithIdp(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithIdp" /* SIGN_IN_WITH_IDP */, request)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var IDP_REQUEST_URI = 'http://localhost';
    /**
     * {@inheritdoc @firebase/auth-types#OAuthCredential}
     *
     * @public
     */
    var OAuthCredential = /** @class */ (function (_super) {
        __extends(OAuthCredential, _super);
        function OAuthCredential() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.pendingToken = null;
            return _this;
        }
        /** @internal */
        OAuthCredential._fromParams = function (params) {
            var cred = new OAuthCredential(params.providerId, params.signInMethod);
            if (params.idToken || params.accessToken) {
                // OAuth 2 and either ID token or access token.
                if (params.idToken) {
                    cred.idToken = params.idToken;
                }
                if (params.accessToken) {
                    cred.accessToken = params.accessToken;
                }
                // Add nonce if available and no pendingToken is present.
                if (params.nonce && !params.pendingToken) {
                    cred.nonce = params.nonce;
                }
                if (params.pendingToken) {
                    cred.pendingToken = params.pendingToken;
                }
            }
            else if (params.oauthToken && params.oauthTokenSecret) {
                // OAuth 1 and OAuth token with token secret
                cred.accessToken = params.oauthToken;
                cred.secret = params.oauthTokenSecret;
            }
            else {
                _fail("argument-error" /* ARGUMENT_ERROR */);
            }
            return cred;
        };
        /** {@inheritdoc @firebase/auth-types#OAuthCredential.toJSON}  */
        OAuthCredential.prototype.toJSON = function () {
            return {
                idToken: this.idToken,
                accessToken: this.accessToken,
                secret: this.secret,
                nonce: this.nonce,
                pendingToken: this.pendingToken,
                providerId: this.providerId,
                signInMethod: this.signInMethod
            };
        };
        /** {@inheritdoc @firebase/auth-types#OAuthCredential.fromJSON} */
        OAuthCredential.fromJSON = function (json) {
            var obj = typeof json === 'string' ? JSON.parse(json) : json;
            var providerId = obj.providerId, signInMethod = obj.signInMethod, rest = __rest(obj, ["providerId", "signInMethod"]);
            if (!providerId || !signInMethod) {
                return null;
            }
            var cred = new OAuthCredential(providerId, signInMethod);
            Object.assign(cred, rest);
            return cred;
        };
        /** @internal */
        OAuthCredential.prototype._getIdTokenResponse = function (auth) {
            var request = this.buildRequest();
            return signInWithIdp(auth, request);
        };
        /** @internal */
        OAuthCredential.prototype._linkToIdToken = function (auth, idToken) {
            var request = this.buildRequest();
            request.idToken = idToken;
            return signInWithIdp(auth, request);
        };
        /** @internal */
        OAuthCredential.prototype._getReauthenticationResolver = function (auth) {
            var request = this.buildRequest();
            request.autoCreate = false;
            return signInWithIdp(auth, request);
        };
        OAuthCredential.prototype.buildRequest = function () {
            var request = {
                requestUri: IDP_REQUEST_URI,
                returnSecureToken: true,
                postBody: null
            };
            if (this.pendingToken) {
                request.pendingToken = this.pendingToken;
            }
            else {
                var postBody = {};
                if (this.idToken) {
                    postBody['id_token'] = this.idToken;
                }
                if (this.accessToken) {
                    postBody['access_token'] = this.accessToken;
                }
                if (this.secret) {
                    postBody['oauth_token_secret'] = this.secret;
                }
                postBody['providerId'] = this.providerId;
                if (this.nonce && !this.pendingToken) {
                    postBody['nonce'] = this.nonce;
                }
                request.postBody = querystring(postBody);
            }
            return request;
        };
        return OAuthCredential;
    }(AuthCredential));

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var _a$1$1;
    function sendPhoneVerificationCode(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:sendVerificationCode" /* SEND_VERIFICATION_CODE */, request)];
            });
        });
    }
    function signInWithPhoneNumber(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithPhoneNumber" /* SIGN_IN_WITH_PHONE_NUMBER */, request)];
            });
        });
    }
    function linkWithPhoneNumber(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithPhoneNumber" /* SIGN_IN_WITH_PHONE_NUMBER */, request)];
            });
        });
    }
    var VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_ = (_a$1$1 = {},
        _a$1$1["USER_NOT_FOUND" /* USER_NOT_FOUND */] = "user-not-found" /* USER_DELETED */,
        _a$1$1);
    function verifyPhoneNumberForExisting(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            var apiRequest;
            return __generator(this, function (_a) {
                apiRequest = __assign(__assign({}, request), { operation: 'REAUTH' });
                return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithPhoneNumber" /* SIGN_IN_WITH_PHONE_NUMBER */, apiRequest, VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * {@inheritdoc @firebase/auth-types#PhoneAuthCredential}
     *
     * @public
     */
    var PhoneAuthCredential = /** @class */ (function (_super) {
        __extends(PhoneAuthCredential, _super);
        function PhoneAuthCredential(params) {
            var _this = _super.call(this, "phone" /* PHONE */, "phone" /* PHONE */) || this;
            _this.params = params;
            return _this;
        }
        /** @internal */
        PhoneAuthCredential._fromVerification = function (verificationId, verificationCode) {
            return new PhoneAuthCredential({ verificationId: verificationId, verificationCode: verificationCode });
        };
        /** @internal */
        PhoneAuthCredential._fromTokenResponse = function (phoneNumber, temporaryProof) {
            return new PhoneAuthCredential({ phoneNumber: phoneNumber, temporaryProof: temporaryProof });
        };
        /** @internal */
        PhoneAuthCredential.prototype._getIdTokenResponse = function (auth) {
            return signInWithPhoneNumber(auth, this._makeVerificationRequest());
        };
        /** @internal */
        PhoneAuthCredential.prototype._linkToIdToken = function (auth, idToken) {
            return linkWithPhoneNumber(auth, __assign({ idToken: idToken }, this._makeVerificationRequest()));
        };
        /** @internal */
        PhoneAuthCredential.prototype._getReauthenticationResolver = function (auth) {
            return verifyPhoneNumberForExisting(auth, this._makeVerificationRequest());
        };
        /** @internal */
        PhoneAuthCredential.prototype._makeVerificationRequest = function () {
            var _a = this.params, temporaryProof = _a.temporaryProof, phoneNumber = _a.phoneNumber, verificationId = _a.verificationId, verificationCode = _a.verificationCode;
            if (temporaryProof && phoneNumber) {
                return { temporaryProof: temporaryProof, phoneNumber: phoneNumber };
            }
            return {
                sessionInfo: verificationId,
                code: verificationCode
            };
        };
        /** {@inheritdoc @firebase/auth-types#toJSON} */
        PhoneAuthCredential.prototype.toJSON = function () {
            var obj = {
                providerId: this.providerId
            };
            if (this.params.phoneNumber) {
                obj.phoneNumber = this.params.phoneNumber;
            }
            if (this.params.temporaryProof) {
                obj.temporaryProof = this.params.temporaryProof;
            }
            if (this.params.verificationCode) {
                obj.verificationCode = this.params.verificationCode;
            }
            if (this.params.verificationId) {
                obj.verificationId = this.params.verificationId;
            }
            return obj;
        };
        /** {@inheritdoc @firebase/auth-types#fromJSON} */
        PhoneAuthCredential.fromJSON = function (json) {
            if (typeof json === 'string') {
                json = JSON.parse(json);
            }
            var _a = json, verificationId = _a.verificationId, verificationCode = _a.verificationCode, phoneNumber = _a.phoneNumber, temporaryProof = _a.temporaryProof;
            if (!verificationCode &&
                !verificationId &&
                !phoneNumber &&
                !temporaryProof) {
                return null;
            }
            return new PhoneAuthCredential({
                verificationId: verificationId,
                verificationCode: verificationCode,
                phoneNumber: phoneNumber,
                temporaryProof: temporaryProof
            });
        };
        return PhoneAuthCredential;
    }(AuthCredential));

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var InMemoryPersistence = /** @class */ (function () {
        function InMemoryPersistence() {
            this.type = "NONE" /* NONE */;
            this.storage = {};
        }
        InMemoryPersistence.prototype._isAvailable = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, true];
                });
            });
        };
        InMemoryPersistence.prototype._set = function (key, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.storage[key] = value;
                    return [2 /*return*/];
                });
            });
        };
        InMemoryPersistence.prototype._get = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    value = this.storage[key];
                    return [2 /*return*/, value === undefined ? null : value];
                });
            });
        };
        InMemoryPersistence.prototype._remove = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    delete this.storage[key];
                    return [2 /*return*/];
                });
            });
        };
        InMemoryPersistence.prototype._addListener = function (_key, _listener) {
            // Listeners are not supported for in-memory storage since it cannot be shared across windows/workers
            return;
        };
        InMemoryPersistence.prototype._removeListener = function (_key, _listener) {
            // Listeners are not supported for in-memory storage since it cannot be shared across windows/workers
            return;
        };
        InMemoryPersistence.type = 'NONE';
        return InMemoryPersistence;
    }());
    /**
     * An implementation of {@link @firebase/auth-types#Persistence} of type 'NONE'.
     *
     * @public
     */
    var inMemoryPersistence = InMemoryPersistence;

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Maps the mode string in action code URL to Action Code Info operation.
     *
     * @param mode
     * @internal
     */
    function parseMode(mode) {
        switch (mode) {
            case 'recoverEmail':
                return "RECOVER_EMAIL" /* RECOVER_EMAIL */;
            case 'resetPassword':
                return "PASSWORD_RESET" /* PASSWORD_RESET */;
            case 'signIn':
                return "EMAIL_SIGNIN" /* EMAIL_SIGNIN */;
            case 'verifyEmail':
                return "VERIFY_EMAIL" /* VERIFY_EMAIL */;
            case 'verifyAndChangeEmail':
                return "VERIFY_AND_CHANGE_EMAIL" /* VERIFY_AND_CHANGE_EMAIL */;
            case 'revertSecondFactorAddition':
                return "REVERT_SECOND_FACTOR_ADDITION" /* REVERT_SECOND_FACTOR_ADDITION */;
            default:
                return null;
        }
    }
    /**
     * Helper to parse FDL links
     *
     * @param url
     * @internal
     */
    function parseDeepLink(url) {
        var uri = new URL(url);
        var link = uri.searchParams.get('link');
        // Double link case (automatic redirect).
        var doubleDeepLink = link ? new URL(link).searchParams.get('link') : null;
        // iOS custom scheme links.
        var iOSDeepLink = uri.searchParams.get('deep_link_id');
        var iOSDoubleDeepLink = iOSDeepLink
            ? new URL(iOSDeepLink).searchParams.get('link')
            : null;
        return iOSDoubleDeepLink || iOSDeepLink || doubleDeepLink || link || url;
    }
    /**
     * {@inheritDoc @firebase/auth-types#ActionCodeURL}
     *
     * @public
     */
    var ActionCodeURL = /** @class */ (function () {
        /**
         * @param actionLink - The link from which to extract the URL.
         * @returns The ActionCodeURL object, or null if the link is invalid.
         *
         * @internal
         */
        function ActionCodeURL(actionLink) {
            var uri = new URL(actionLink);
            var apiKey = uri.searchParams.get("apiKey" /* API_KEY */);
            var code = uri.searchParams.get("oobCode" /* CODE */);
            var operation = parseMode(uri.searchParams.get("mode" /* MODE */));
            // Validate API key, code and mode.
            _assert(apiKey && code && operation, "argument-error" /* ARGUMENT_ERROR */);
            this.apiKey = apiKey;
            this.operation = operation;
            this.code = code;
            this.continueUrl = uri.searchParams.get("continueUrl" /* CONTINUE_URL */);
            this.languageCode = uri.searchParams.get("languageCode" /* LANGUAGE_CODE */);
            this.tenantId = uri.searchParams.get("tenantId" /* TENANT_ID */);
        }
        /** {@inheritDoc @firebase/auth-types#ActionCodeURL.parseLink} */
        ActionCodeURL.parseLink = function (link) {
            var actionLink = parseDeepLink(link);
            try {
                return new ActionCodeURL(actionLink);
            }
            catch (_a) {
                return null;
            }
        };
        return ActionCodeURL;
    }());
    /**
     * {@inheritDoc @firebase/auth-types#ActionCodeURL.parseLink}
     *
     * @public
     */
    function parseActionCodeURL(link) {
        return ActionCodeURL.parseLink(link);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * {@inheritdoc @firebase/auth-types#EmailAuthProvider}
     *
     * @public
     */
    var EmailAuthProvider = /** @class */ (function () {
        function EmailAuthProvider() {
            /** {@inheritdoc @firebase/auth-types#EmailAuthProvider.providerId} */
            this.providerId = EmailAuthProvider.PROVIDER_ID;
        }
        /** {@inheritdoc @firebase/auth-types#EmailAuthProvider.credential} */
        EmailAuthProvider.credential = function (email, password) {
            return EmailAuthCredential._fromEmailAndPassword(email, password);
        };
        /** {@inheritdoc @firebase/auth-types#EmailAuthProvider.credentialWithLink} */
        EmailAuthProvider.credentialWithLink = function (email, emailLink) {
            var actionCodeUrl = ActionCodeURL.parseLink(emailLink);
            _assert(actionCodeUrl, "argument-error" /* ARGUMENT_ERROR */);
            return EmailAuthCredential._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
        };
        /** {@inheritdoc @firebase/auth-types#EmailAuthProvider.PROVIDER_ID} */
        EmailAuthProvider.PROVIDER_ID = "password" /* PASSWORD */;
        /** {@inheritdoc @firebase/auth-types#EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD} */
        EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password" /* EMAIL_PASSWORD */;
        /** {@inheritdoc @firebase/auth-types#EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD} */
        EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink" /* EMAIL_LINK */;
        return EmailAuthProvider;
    }());

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for generating generic {@link OAuthCredential}.
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new OAuthProvider('google.com');
     * // Start a sign in process for an unauthenticated user.
     * provider.addScope('profile');
     * provider.addScope('email');
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a OAuth Access Token for the provider.
     *   const credential = provider.credentialFromResult(auth, result);
     *   const token = credential.accessToken;
     * }
     * ```
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new OAuthProvider('google.com');
     * provider.addScope('profile');
     * provider.addScope('email');
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a OAuth Access Token for the provider.
     * const credential = provider.credentialFromResult(auth, result);
     * const token = credential.accessToken;
     * ```
     * @public
     */
    var OAuthProvider = /** @class */ (function () {
        /**
         * Constructor for generic OAuth providers.
         *
         * @param providerId - Provider for which credentials should be generated.
         */
        function OAuthProvider(providerId) {
            this.providerId = providerId;
            /** @internal */
            this.defaultLanguageCode = null;
            /** @internal */
            this.scopes = [];
            /** @internal */
            this.customParameters = {};
        }
        OAuthProvider.credentialFromJSON = function (json) {
            var obj = typeof json === 'string' ? JSON.parse(json) : json;
            _assert('providerId' in obj && 'signInMethod' in obj, "argument-error" /* ARGUMENT_ERROR */);
            return OAuthCredential._fromParams(obj);
        };
        /**
         * Creates a {@link OAuthCredential} from a generic OAuth provider's access token or ID token.
         *
         * @remarks
         * The raw nonce is required when an ID token with a nonce field is provided. The SHA-256 hash of
         * the raw nonce must match the nonce field in the ID token.
         *
         * @example
         * ```javascript
         * // `googleUser` from the onsuccess Google Sign In callback.
         * // Initialize a generate OAuth provider with a `google.com` providerId.
         * const provider = new OAuthProvider('google.com');
         * const credential = provider.credential({
         *   idToken: googleUser.getAuthResponse().id_token,
         * });
         * const result = await signInWithCredential(credential);
         * ```
         *
         * @param params - Either the options object containing the ID token, access token and raw nonce
         * or the ID token string.
         */
        OAuthProvider.prototype.credential = function (params) {
            _assert(params.idToken && params.accessToken, "argument-error" /* ARGUMENT_ERROR */);
            // For OAuthCredential, sign in method is same as providerId.
            return OAuthCredential._fromParams(__assign({ providerId: this.providerId, signInMethod: this.providerId }, params));
        };
        /**
         * Set the language gode.
         *
         * @param languageCode - language code
         */
        OAuthProvider.prototype.setDefaultLanguage = function (languageCode) {
            this.defaultLanguageCode = languageCode;
        };
        /**
         * Sets the OAuth custom parameters to pass in an OAuth request for popup and redirect sign-in
         * operations.
         *
         * @remarks
         * For a detailed list, check the reserved required OAuth 2.0 parameters such as `client_id`,
         * `redirect_uri`, `scope`, `response_type`, and `state` are not allowed and will be ignored.
         *
         * @param customOAuthParameters - The custom OAuth parameters to pass in the OAuth request.
         */
        OAuthProvider.prototype.setCustomParameters = function (customOAuthParameters) {
            this.customParameters = customOAuthParameters;
            return this;
        };
        /**
         * Retrieve the current list of {@link CustomParameters}.
         */
        OAuthProvider.prototype.getCustomParameters = function () {
            return this.customParameters;
        };
        /**
         * Add an OAuth scope to the credential.
         *
         * @param scope - Provider OAuth scope to add.
         */
        OAuthProvider.prototype.addScope = function (scope) {
            // If not already added, add scope to list.
            if (!this.scopes.includes(scope)) {
                this.scopes.push(scope);
            }
            return this;
        };
        /**
         * Retrieve the current list of OAuth scopes.
         */
        OAuthProvider.prototype.getScopes = function () {
            return __spreadArrays(this.scopes);
        };
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link @firebase/auth-types#UserCredential}.
         *
         * @param userCredential - The user credential.
         */
        OAuthProvider.credentialFromResult = function (userCredential) {
            return OAuthProvider.oauthCredentialFromTaggedObject(userCredential);
        };
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link @firebase/auth-types#AuthError} which was
         * thrown during a sign-in, link, or reauthenticate operation.
         *
         * @param userCredential - The user credential.
         */
        OAuthProvider.credentialFromError = function (error) {
            return OAuthProvider.oauthCredentialFromTaggedObject((error.customData || {}));
        };
        // This needs to have a different name so it doesn't conflict with the
        // subclasses
        OAuthProvider.oauthCredentialFromTaggedObject = function (_a) {
            var tokenResponse = _a._tokenResponse;
            if (!tokenResponse) {
                return null;
            }
            var _b = tokenResponse, oauthIdToken = _b.oauthIdToken, oauthAccessToken = _b.oauthAccessToken, oauthTokenSecret = _b.oauthTokenSecret, pendingToken = _b.pendingToken, nonce = _b.nonce, providerId = _b.providerId;
            if (!oauthAccessToken &&
                !oauthTokenSecret &&
                !oauthIdToken &&
                !pendingToken) {
                return null;
            }
            if (!providerId) {
                return null;
            }
            try {
                return new OAuthProvider(providerId).credential({
                    idToken: oauthIdToken,
                    accessToken: oauthAccessToken,
                    rawNonce: nonce
                });
            }
            catch (e) {
                return null;
            }
        };
        return OAuthProvider;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for generating an {@link OAuthCredential} for {@link @firebase/auth-types#ProviderId.FACEBOOK}.
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new FacebookAuthProvider();
     * // Start a sign in process for an unauthenticated user.
     * provider.addScope('user_birthday');
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a Facebook Access Token.
     *   const credential = provider.credentialFromResult(auth, result);
     *   const token = credential.accessToken;
     * }
     * ```
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new FacebookAuthProvider();
     * provider.addScope('user_birthday');
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a Facebook Access Token.
     * const credential = provider.credentialFromResult(auth, result);
     * const token = credential.accessToken;
     * ```
     *
     * @public
     */
    var FacebookAuthProvider = /** @class */ (function (_super) {
        __extends(FacebookAuthProvider, _super);
        function FacebookAuthProvider() {
            return _super.call(this, "facebook.com" /* FACEBOOK */) || this;
        }
        /**
         * Creates a credential for Facebook.
         *
         * @example
         * ```javascript
         * // `event` from the Facebook auth.authResponseChange callback.
         * const credential = FacebookAuthProvider.credential(event.authResponse.accessToken);
         * const result = await signInWithCredential(credential);
         * ```
         *
         * @param accessToken - Facebook access token.
         */
        FacebookAuthProvider.credential = function (accessToken) {
            return OAuthCredential._fromParams({
                providerId: FacebookAuthProvider.PROVIDER_ID,
                signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
                accessToken: accessToken
            });
        };
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link @firebase/auth-types#UserCredential}.
         *
         * @param userCredential - The user credential.
         */
        FacebookAuthProvider.credentialFromResult = function (userCredential) {
            return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
        };
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link @firebase/auth-types#AuthError} which was
         * thrown during a sign-in, link, or reauthenticate operation.
         *
         * @param userCredential - The user credential.
         */
        FacebookAuthProvider.credentialFromError = function (error) {
            return FacebookAuthProvider.credentialFromTaggedObject((error.customData || {}));
        };
        FacebookAuthProvider.credentialFromTaggedObject = function (_a) {
            var tokenResponse = _a._tokenResponse;
            if (!tokenResponse || !('oauthAccessToken' in tokenResponse)) {
                return null;
            }
            if (!tokenResponse.oauthAccessToken) {
                return null;
            }
            try {
                return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
            }
            catch (_b) {
                return null;
            }
        };
        /** Always set to {@link @firebase/auth-types#SignInMethod.FACEBOOK}. */
        FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com" /* FACEBOOK */;
        /** Always set to {@link @firebase/auth-types#ProviderId.FACEBOOK}. */
        FacebookAuthProvider.PROVIDER_ID = "facebook.com" /* FACEBOOK */;
        return FacebookAuthProvider;
    }(OAuthProvider));

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for generating an an {@link OAuthCredential} for {@link @firebase/auth-types#ProviderId.GOOGLE}.
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new GoogleAuthProvider();
     * // Start a sign in process for an unauthenticated user.
     * provider.addScope('profile');
     * provider.addScope('email');
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a Google Access Token.
     *   const credential = provider.credentialFromResult(auth, result);
     *   const token = credential.accessToken;
     * }
     * ```
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new GoogleAuthProvider();
     * provider.addScope('profile');
     * provider.addScope('email');
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a Google Access Token.
     * const credential = provider.credentialFromResult(auth, result);
     * const token = credential.accessToken;
     * ```
     *
     * @public
     */
    var GoogleAuthProvider = /** @class */ (function (_super) {
        __extends(GoogleAuthProvider, _super);
        function GoogleAuthProvider() {
            var _this = _super.call(this, "google.com" /* GOOGLE */) || this;
            _this.addScope('profile');
            return _this;
        }
        /**
         * Creates a credential for Google. At least one of ID token and access token is required.
         *
         * @example
         * ```javascript
         * // \`googleUser\` from the onsuccess Google Sign In callback.
         * const credential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
         * const result = await signInWithCredential(credential);
         * ```
         *
         * @param idToken - Google ID token.
         * @param accessToken - Google access token.
         */
        GoogleAuthProvider.credential = function (idToken, accessToken) {
            return OAuthCredential._fromParams({
                providerId: GoogleAuthProvider.PROVIDER_ID,
                signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
                idToken: idToken,
                accessToken: accessToken
            });
        };
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link @firebase/auth-types#UserCredential}.
         *
         * @param userCredential - The user credential.
         */
        GoogleAuthProvider.credentialFromResult = function (userCredential) {
            return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
        };
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link @firebase/auth-types#AuthError} which was
         * thrown during a sign-in, link, or reauthenticate operation.
         *
         * @param userCredential - The user credential.
         */
        GoogleAuthProvider.credentialFromError = function (error) {
            return GoogleAuthProvider.credentialFromTaggedObject((error.customData || {}));
        };
        GoogleAuthProvider.credentialFromTaggedObject = function (_a) {
            var tokenResponse = _a._tokenResponse;
            if (!tokenResponse) {
                return null;
            }
            var _b = tokenResponse, oauthIdToken = _b.oauthIdToken, oauthAccessToken = _b.oauthAccessToken;
            if (!oauthIdToken && !oauthAccessToken) {
                // This could be an oauth 1 credential or a phone credential
                return null;
            }
            try {
                return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
            }
            catch (_c) {
                return null;
            }
        };
        /** Always set to {@link @firebase/auth-types#SignInMethod.GOOGLE}. */
        GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com" /* GOOGLE */;
        /** Always set to {@link @firebase/auth-types#ProviderId.GOOGLE}. */
        GoogleAuthProvider.PROVIDER_ID = "google.com" /* GOOGLE */;
        return GoogleAuthProvider;
    }(OAuthProvider));

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for generating an {@link OAuthCredential} for {@link @firebase/auth-types#ProviderId.GITHUB}.
     *
     * @remarks
     * GitHub requires an OAuth 2.0 redirect, so you can either handle the redirect directly, or use
     * the {@link signInWithPopup} handler:
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new GithubAuthProvider();
     * // Start a sign in process for an unauthenticated user.
     * provider.addScope('repo');
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a Github Access Token.
     *   const credential = provider.credentialFromResult(auth, result);
     *   const token = credential.accessToken;
     * }
     * ```
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new GithubAuthProvider();
     * provider.addScope('repo');
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a Github Access Token.
     * const credential = provider.credentialFromResult(auth, result);
     * const token = credential.accessToken;
     * ```
     * @public
     */
    var GithubAuthProvider = /** @class */ (function (_super) {
        __extends(GithubAuthProvider, _super);
        function GithubAuthProvider() {
            return _super.call(this, "github.com" /* GITHUB */) || this;
        }
        /**
         * Creates a credential for Github.
         *
         * @param accessToken - Github access token.
         */
        GithubAuthProvider.credential = function (accessToken) {
            return OAuthCredential._fromParams({
                providerId: GithubAuthProvider.PROVIDER_ID,
                signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
                accessToken: accessToken
            });
        };
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link @firebase/auth-types#UserCredential}.
         *
         * @param userCredential - The user credential.
         */
        GithubAuthProvider.credentialFromResult = function (userCredential) {
            return GithubAuthProvider.credentialFromTaggedObject(userCredential);
        };
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link @firebase/auth-types#AuthError} which was
         * thrown during a sign-in, link, or reauthenticate operation.
         *
         * @param userCredential - The user credential.
         */
        GithubAuthProvider.credentialFromError = function (error) {
            return GithubAuthProvider.credentialFromTaggedObject((error.customData || {}));
        };
        GithubAuthProvider.credentialFromTaggedObject = function (_a) {
            var tokenResponse = _a._tokenResponse;
            if (!tokenResponse || !('oauthAccessToken' in tokenResponse)) {
                return null;
            }
            if (!tokenResponse.oauthAccessToken) {
                return null;
            }
            try {
                return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
            }
            catch (_b) {
                return null;
            }
        };
        /** Always set to {@link @firebase/auth-types#SignInMethod.GITHUB}. */
        GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com" /* GITHUB */;
        /** Always set to {@link @firebase/auth-types#ProviderId.GITHUB}. */
        GithubAuthProvider.PROVIDER_ID = "github.com" /* GITHUB */;
        return GithubAuthProvider;
    }(OAuthProvider));

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provider for generating an {@link OAuthCredential} for {@link @firebase/auth-types#ProviderId.TWITTER}.
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new TwitterAuthProvider();
     * // Start a sign in process for an unauthenticated user.
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a Twitter Access Token and Secret.
     *   const credential = provider.credentialFromResult(auth, result);
     *   const token = credential.accessToken;
     *   const secret = credential.secret;
     * }
     * ```
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new TwitterAuthProvider();
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a Twitter Access Token and Secret.
     * const credential = provider.credentialFromResult(auth, result);
     * const token = credential.accessToken;
     * const secret = credential.secret;
     * ```
     *
     * @public
     */
    var TwitterAuthProvider = /** @class */ (function (_super) {
        __extends(TwitterAuthProvider, _super);
        function TwitterAuthProvider() {
            return _super.call(this, "twitter.com" /* TWITTER */) || this;
        }
        /**
         * Creates a credential for Twitter.
         *
         * @param token - Twitter access token.
         * @param secret - Twitter secret.
         */
        TwitterAuthProvider.credential = function (token, secret) {
            return OAuthCredential._fromParams({
                providerId: TwitterAuthProvider.PROVIDER_ID,
                signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
                oauthToken: token,
                oauthTokenSecret: secret
            });
        };
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link @firebase/auth-types#UserCredential}.
         *
         * @param userCredential - The user credential.
         */
        TwitterAuthProvider.credentialFromResult = function (userCredential) {
            return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
        };
        /**
         * Used to extract the underlying {@link OAuthCredential} from a {@link @firebase/auth-types#AuthError} which was
         * thrown during a sign-in, link, or reauthenticate operation.
         *
         * @param userCredential - The user credential.
         */
        TwitterAuthProvider.credentialFromError = function (error) {
            return TwitterAuthProvider.credentialFromTaggedObject((error.customData || {}));
        };
        TwitterAuthProvider.credentialFromTaggedObject = function (_a) {
            var tokenResponse = _a._tokenResponse;
            if (!tokenResponse) {
                return null;
            }
            var _b = tokenResponse, oauthAccessToken = _b.oauthAccessToken, oauthTokenSecret = _b.oauthTokenSecret;
            if (!oauthAccessToken || !oauthTokenSecret) {
                return null;
            }
            try {
                return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
            }
            catch (_c) {
                return null;
            }
        };
        TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com" /* TWITTER */;
        TwitterAuthProvider.PROVIDER_ID = "twitter.com" /* TWITTER */;
        return TwitterAuthProvider;
    }(OAuthProvider));

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function signUp(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signUp" /* SIGN_UP */, request)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function deleteAccount(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:delete" /* DELETE_ACCOUNT */, request)];
            });
        });
    }
    function deleteLinkedAccounts(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:update" /* SET_ACCOUNT_INFO */, request)];
            });
        });
    }
    function getAccountInfo(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:lookup" /* GET_ACCOUNT_INFO */, request)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function utcTimestampToDateString(utcTimestamp) {
        if (!utcTimestamp) {
            return undefined;
        }
        try {
            // Convert to date object.
            var date = new Date(Number(utcTimestamp));
            // Test date is valid.
            if (!isNaN(date.getTime())) {
                // Convert to UTC date string.
                return date.toUTCString();
            }
        }
        catch (e) {
            // Do nothing. undefined will be returned.
        }
        return undefined;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
     *
     * @remarks
     * Returns the current token if it has not expired or if it will not expire in the next five
     * minutes. Otherwise, this will refresh the token and return a new one.
     *
     * @param user - The user.
     * @param forceRefresh - Force refresh regardless of token expiration.
     *
     * @public
     */
    function getIdToken(user, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        return user.getIdToken(forceRefresh);
    }
    /**
     * Returns a deserialized JSON Web Token (JWT) used to identitfy the user to a Firebase service.
     *
     * @remarks
     * Returns the current token if it has not expired or if it will not expire in the next five
     * minutes. Otherwise, this will refresh the token and return a new one.
     *
     * @param user - The user.
     * @param forceRefresh - Force refresh regardless of token expiration.
     *
     * @public
     */
    function getIdTokenResult(user, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, token, claims, firebase, signInProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInternal = user;
                        return [4 /*yield*/, user.getIdToken(forceRefresh)];
                    case 1:
                        token = _a.sent();
                        claims = _parseToken(token);
                        _assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error" /* INTERNAL_ERROR */);
                        firebase = typeof claims.firebase === 'object' ? claims.firebase : undefined;
                        signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase['sign_in_provider'];
                        return [2 /*return*/, {
                                claims: claims,
                                token: token,
                                authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
                                issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
                                expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
                                signInProvider: signInProvider || null,
                                signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase['sign_in_second_factor']) || null
                            }];
                }
            });
        });
    }
    function secondsStringToMilliseconds(seconds) {
        return Number(seconds) * 1000;
    }
    /** @internal */
    function _parseToken(token) {
        var _a = token.split('.'), algorithm = _a[0], payload = _a[1], signature = _a[2];
        if (algorithm === undefined ||
            payload === undefined ||
            signature === undefined) {
            _logError('JWT malformed, contained fewer than 3 sections');
            return null;
        }
        try {
            var decoded = base64Decode(payload);
            if (!decoded) {
                _logError('Failed to decode base64 JWT payload');
                return null;
            }
            return JSON.parse(decoded);
        }
        catch (e) {
            _logError('Caught error parsing JWT payload as JSON', e);
            return null;
        }
    }
    /**
     * Extract expiresIn TTL from a token by subtracting the expiration from the issuance.
     *
     * @internal
     */
    function _tokenExpiresIn(token) {
        var parsedToken = _parseToken(token);
        _assert(parsedToken, "internal-error" /* INTERNAL_ERROR */);
        _assert(typeof parsedToken.exp !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
        _assert(typeof parsedToken.iat !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
        return Number(parsedToken.exp) - Number(parsedToken.iat);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _logoutIfInvalidated(user, promise, bypassAuthState) {
        if (bypassAuthState === void 0) { bypassAuthState = false; }
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (bypassAuthState) {
                            return [2 /*return*/, promise];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 6]);
                        return [4 /*yield*/, promise];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_1 = _a.sent();
                        if (!(e_1 instanceof FirebaseError && isUserInvalidated(e_1))) return [3 /*break*/, 5];
                        if (!(user.auth.currentUser === user)) return [3 /*break*/, 5];
                        return [4 /*yield*/, user.auth.signOut()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function isUserInvalidated(_a) {
        var code = _a.code;
        return (code === "auth/" + "user-disabled" /* USER_DISABLED */ ||
            code === "auth/" + "user-token-expired" /* TOKEN_EXPIRED */);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var ProactiveRefresh = /** @class */ (function () {
        function ProactiveRefresh(user) {
            this.user = user;
            this.isRunning = false;
            // Node timers and browser timers return fundamentally different types.
            // We don't actually care what the value is but TS won't accept unknown and
            // we can't cast properly in both environments.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.timerId = null;
            this.errorBackoff = 30000 /* RETRY_BACKOFF_MIN */;
        }
        ProactiveRefresh.prototype._start = function () {
            if (this.isRunning) {
                return;
            }
            this.isRunning = true;
            this.schedule();
        };
        ProactiveRefresh.prototype._stop = function () {
            if (!this.isRunning) {
                return;
            }
            this.isRunning = false;
            if (this.timerId !== null) {
                clearTimeout(this.timerId);
            }
        };
        ProactiveRefresh.prototype.getInterval = function (wasError) {
            var _a;
            if (wasError) {
                var interval = this.errorBackoff;
                this.errorBackoff = Math.min(this.errorBackoff * 2, 960000 /* RETRY_BACKOFF_MAX */);
                return interval;
            }
            else {
                // Reset the error backoff
                this.errorBackoff = 30000 /* RETRY_BACKOFF_MIN */;
                var expTime = (_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0;
                var interval = expTime - Date.now() - 300000 /* OFFSET */;
                return Math.max(0, interval);
            }
        };
        ProactiveRefresh.prototype.schedule = function (wasError) {
            var _this = this;
            if (wasError === void 0) { wasError = false; }
            if (!this.isRunning) {
                // Just in case...
                return;
            }
            var interval = this.getInterval(wasError);
            this.timerId = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.iteration()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, interval);
        };
        ProactiveRefresh.prototype.iteration = function () {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.user.getIdToken(true)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            // Only retry on network errors
                            if (e_1.code === "auth/" + "network-request-failed" /* NETWORK_REQUEST_FAILED */) {
                                this.schedule(/* wasError */ true);
                            }
                            return [2 /*return*/];
                        case 3:
                            this.schedule();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ProactiveRefresh;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var UserMetadata = /** @class */ (function () {
        function UserMetadata(createdAt, lastLoginAt) {
            this.createdAt = createdAt;
            this.lastLoginAt = lastLoginAt;
            this._initializeTime();
        }
        UserMetadata.prototype._initializeTime = function () {
            this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
            this.creationTime = utcTimestampToDateString(this.createdAt);
        };
        UserMetadata.prototype._copy = function (metadata) {
            this.createdAt = metadata.createdAt;
            this.lastLoginAt = metadata.lastLoginAt;
            this._initializeTime();
        };
        UserMetadata.prototype.toJSON = function () {
            return {
                createdAt: this.createdAt,
                lastLoginAt: this.lastLoginAt
            };
        };
        return UserMetadata;
    }());

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _reloadWithoutSaving(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var auth, idToken, response, coreAccount, newProviderData, providerData, oldIsAnonymous, newIsAnonymous, isAnonymous, updates;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        auth = user.auth;
                        return [4 /*yield*/, user.getIdToken()];
                    case 1:
                        idToken = _b.sent();
                        return [4 /*yield*/, _logoutIfInvalidated(user, getAccountInfo(auth, { idToken: idToken }))];
                    case 2:
                        response = _b.sent();
                        _assert(response === null || response === void 0 ? void 0 : response.users.length, auth, "internal-error" /* INTERNAL_ERROR */);
                        coreAccount = response.users[0];
                        user._notifyReloadListener(coreAccount);
                        newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length) ? extractProviderData(coreAccount.providerUserInfo)
                            : [];
                        providerData = mergeProviderData(user.providerData, newProviderData);
                        oldIsAnonymous = user.isAnonymous;
                        newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
                        isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
                        updates = {
                            uid: coreAccount.localId,
                            displayName: coreAccount.displayName || null,
                            photoURL: coreAccount.photoUrl || null,
                            email: coreAccount.email || null,
                            emailVerified: coreAccount.emailVerified || false,
                            phoneNumber: coreAccount.phoneNumber || null,
                            tenantId: coreAccount.tenantId || null,
                            providerData: providerData,
                            metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
                            isAnonymous: isAnonymous
                        };
                        Object.assign(user, updates);
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Reloads user account data, if signed in.
     *
     * @param user - The user.
     *
     * @public
     */
    function reload(user) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInternal = user;
                        return [4 /*yield*/, _reloadWithoutSaving(userInternal)];
                    case 1:
                        _a.sent();
                        // Even though the current user hasn't changed, update
                        // current user will trigger a persistence update w/ the
                        // new info.
                        return [4 /*yield*/, userInternal.auth._persistUserIfCurrent(userInternal)];
                    case 2:
                        // Even though the current user hasn't changed, update
                        // current user will trigger a persistence update w/ the
                        // new info.
                        _a.sent();
                        userInternal.auth._notifyListenersIfCurrent(userInternal);
                        return [2 /*return*/];
                }
            });
        });
    }
    function mergeProviderData(original, newData) {
        var deduped = original.filter(function (o) { return !newData.some(function (n) { return n.providerId === o.providerId; }); });
        return __spreadArrays(deduped, newData);
    }
    function extractProviderData(providers) {
        return providers.map(function (_a) {
            var providerId = _a.providerId, provider = __rest(_a, ["providerId"]);
            return {
                providerId: providerId,
                uid: provider.rawId || '',
                displayName: provider.displayName || null,
                email: provider.email || null,
                phoneNumber: provider.phoneNumber || null,
                photoURL: provider.photoUrl || null
            };
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function requestStsToken(auth, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _performFetchWithErrorHandling(auth, {}, function () {
                            var body = querystring({
                                'grant_type': 'refresh_token',
                                'refresh_token': refreshToken
                            }).slice(1);
                            var _a = auth.config, tokenApiHost = _a.tokenApiHost, apiKey = _a.apiKey, sdkClientVersion = _a.sdkClientVersion;
                            var url = _getFinalTarget(auth, tokenApiHost, "/v1/token" /* TOKEN */, "key=" + apiKey);
                            return FetchProvider.fetch()(url, {
                                method: "POST" /* POST */,
                                headers: {
                                    'X-Client-Version': sdkClientVersion,
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: body
                            });
                        })];
                    case 1:
                        response = _a.sent();
                        // The response comes back in snake_case. Convert to camel:
                        return [2 /*return*/, {
                                accessToken: response.access_token,
                                expiresIn: response.expires_in,
                                refreshToken: response.refresh_token
                            }];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var StsTokenManager = /** @class */ (function () {
        function StsTokenManager() {
            this.refreshToken = null;
            this.accessToken = null;
            this.expirationTime = null;
        }
        Object.defineProperty(StsTokenManager.prototype, "isExpired", {
            get: function () {
                return (!this.expirationTime ||
                    Date.now() > this.expirationTime - 30000 /* TOKEN_REFRESH */);
            },
            enumerable: false,
            configurable: true
        });
        StsTokenManager.prototype.updateFromServerResponse = function (response) {
            _assert(response.idToken, "internal-error" /* INTERNAL_ERROR */);
            _assert(typeof response.idToken !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
            _assert(typeof response.refreshToken !== 'undefined', "internal-error" /* INTERNAL_ERROR */);
            var expiresIn = 'expiresIn' in response && typeof response.expiresIn !== 'undefined'
                ? Number(response.expiresIn)
                : _tokenExpiresIn(response.idToken);
            this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
        };
        StsTokenManager.prototype.getToken = function (auth, forceRefresh) {
            if (forceRefresh === void 0) { forceRefresh = false; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _assert(!this.accessToken || this.refreshToken, auth, "user-token-expired" /* TOKEN_EXPIRED */);
                            if (!forceRefresh && this.accessToken && !this.isExpired) {
                                return [2 /*return*/, this.accessToken];
                            }
                            if (!this.refreshToken) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.refresh(auth, this.refreshToken)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.accessToken];
                        case 2: return [2 /*return*/, null];
                    }
                });
            });
        };
        StsTokenManager.prototype.clearRefreshToken = function () {
            this.refreshToken = null;
        };
        StsTokenManager.prototype.refresh = function (auth, oldToken) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, accessToken, refreshToken, expiresIn;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, requestStsToken(auth, oldToken)];
                        case 1:
                            _a = _b.sent(), accessToken = _a.accessToken, refreshToken = _a.refreshToken, expiresIn = _a.expiresIn;
                            this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
                            return [2 /*return*/];
                    }
                });
            });
        };
        StsTokenManager.prototype.updateTokensAndExpiration = function (accessToken, refreshToken, expiresInSec) {
            this.refreshToken = refreshToken || null;
            this.accessToken = accessToken || null;
            this.expirationTime = Date.now() + expiresInSec * 1000;
        };
        StsTokenManager.fromJSON = function (appName, object) {
            var refreshToken = object.refreshToken, accessToken = object.accessToken, expirationTime = object.expirationTime;
            var manager = new StsTokenManager();
            if (refreshToken) {
                _assert(typeof refreshToken === 'string', "internal-error" /* INTERNAL_ERROR */, {
                    appName: appName
                });
                manager.refreshToken = refreshToken;
            }
            if (accessToken) {
                _assert(typeof accessToken === 'string', "internal-error" /* INTERNAL_ERROR */, {
                    appName: appName
                });
                manager.accessToken = accessToken;
            }
            if (expirationTime) {
                _assert(typeof expirationTime === 'number', "internal-error" /* INTERNAL_ERROR */, {
                    appName: appName
                });
                manager.expirationTime = expirationTime;
            }
            return manager;
        };
        StsTokenManager.prototype.toJSON = function () {
            return {
                refreshToken: this.refreshToken,
                accessToken: this.accessToken,
                expirationTime: this.expirationTime
            };
        };
        StsTokenManager.prototype._assign = function (stsTokenManager) {
            this.accessToken = stsTokenManager.accessToken;
            this.refreshToken = stsTokenManager.refreshToken;
            this.expirationTime = stsTokenManager.expirationTime;
        };
        StsTokenManager.prototype._clone = function () {
            return Object.assign(new StsTokenManager(), this.toJSON());
        };
        StsTokenManager.prototype._performRefresh = function () {
            return debugFail('not implemented');
        };
        return StsTokenManager;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function assertStringOrUndefined(assertion, appName) {
        _assert(typeof assertion === 'string' || typeof assertion === 'undefined', "internal-error" /* INTERNAL_ERROR */, { appName: appName });
    }
    var UserImpl = /** @class */ (function () {
        function UserImpl(_a) {
            var uid = _a.uid, auth = _a.auth, stsTokenManager = _a.stsTokenManager, opt = __rest(_a, ["uid", "auth", "stsTokenManager"]);
            // For the user object, provider is always Firebase.
            this.providerId = "firebase" /* FIREBASE */;
            this.emailVerified = false;
            this.isAnonymous = false;
            this.tenantId = null;
            this.providerData = [];
            this.proactiveRefresh = new ProactiveRefresh(this);
            this.reloadUserInfo = null;
            this.reloadListener = null;
            this.uid = uid;
            this.auth = auth;
            this.stsTokenManager = stsTokenManager;
            this.accessToken = stsTokenManager.accessToken;
            this.displayName = opt.displayName || null;
            this.email = opt.email || null;
            this.phoneNumber = opt.phoneNumber || null;
            this.photoURL = opt.photoURL || null;
            this.isAnonymous = opt.isAnonymous || false;
            this.metadata = new UserMetadata(opt.createdAt || undefined, opt.lastLoginAt || undefined);
        }
        UserImpl.prototype.getIdToken = function (forceRefresh) {
            return __awaiter(this, void 0, void 0, function () {
                var accessToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh))];
                        case 1:
                            accessToken = _a.sent();
                            _assert(accessToken, this.auth, "internal-error" /* INTERNAL_ERROR */);
                            if (!(this.accessToken !== accessToken)) return [3 /*break*/, 3];
                            this.accessToken = accessToken;
                            return [4 /*yield*/, this.auth._persistUserIfCurrent(this)];
                        case 2:
                            _a.sent();
                            this.auth._notifyListenersIfCurrent(this);
                            _a.label = 3;
                        case 3: return [2 /*return*/, accessToken];
                    }
                });
            });
        };
        UserImpl.prototype.getIdTokenResult = function (forceRefresh) {
            return getIdTokenResult(this, forceRefresh);
        };
        UserImpl.prototype.reload = function () {
            return reload(this);
        };
        UserImpl.prototype._assign = function (user) {
            if (this === user) {
                return;
            }
            _assert(this.uid === user.uid, this.auth, "internal-error" /* INTERNAL_ERROR */);
            this.displayName = user.displayName;
            this.photoURL = user.photoURL;
            this.email = user.email;
            this.emailVerified = user.emailVerified;
            this.phoneNumber = user.phoneNumber;
            this.isAnonymous = user.isAnonymous;
            this.tenantId = user.tenantId;
            this.providerData = user.providerData.map(function (userInfo) { return (__assign({}, userInfo)); });
            this.metadata._copy(user.metadata);
            this.stsTokenManager._assign(user.stsTokenManager);
        };
        UserImpl.prototype._clone = function () {
            return new UserImpl(__assign(__assign({}, this), { stsTokenManager: this.stsTokenManager._clone() }));
        };
        UserImpl.prototype._onReload = function (callback) {
            // There should only ever be one listener, and that is a single instance of MultiFactorUser
            _assert(!this.reloadListener, this.auth, "internal-error" /* INTERNAL_ERROR */);
            this.reloadListener = callback;
            if (this.reloadUserInfo) {
                this._notifyReloadListener(this.reloadUserInfo);
                this.reloadUserInfo = null;
            }
        };
        UserImpl.prototype._notifyReloadListener = function (userInfo) {
            if (this.reloadListener) {
                this.reloadListener(userInfo);
            }
            else {
                // If no listener is subscribed yet, save the result so it's available when they do subscribe
                this.reloadUserInfo = userInfo;
            }
        };
        UserImpl.prototype._startProactiveRefresh = function () {
            this.proactiveRefresh._start();
        };
        UserImpl.prototype._stopProactiveRefresh = function () {
            this.proactiveRefresh._stop();
        };
        UserImpl.prototype._updateTokensIfNecessary = function (response, reload) {
            if (reload === void 0) { reload = false; }
            return __awaiter(this, void 0, void 0, function () {
                var tokensRefreshed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tokensRefreshed = false;
                            if (response.idToken &&
                                response.idToken !== this.stsTokenManager.accessToken) {
                                this.stsTokenManager.updateFromServerResponse(response);
                                tokensRefreshed = true;
                            }
                            if (!reload) return [3 /*break*/, 2];
                            return [4 /*yield*/, _reloadWithoutSaving(this)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, this.auth._persistUserIfCurrent(this)];
                        case 3:
                            _a.sent();
                            if (tokensRefreshed) {
                                this.auth._notifyListenersIfCurrent(this);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        UserImpl.prototype.delete = function () {
            return __awaiter(this, void 0, void 0, function () {
                var idToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getIdToken()];
                        case 1:
                            idToken = _a.sent();
                            return [4 /*yield*/, _logoutIfInvalidated(this, deleteAccount(this.auth, { idToken: idToken }))];
                        case 2:
                            _a.sent();
                            this.stsTokenManager.clearRefreshToken();
                            // TODO: Determine if cancellable-promises are necessary to use in this class so that delete()
                            //       cancels pending actions...
                            return [2 /*return*/, this.auth.signOut()];
                    }
                });
            });
        };
        UserImpl.prototype.toJSON = function () {
            return __assign({ uid: this.uid, email: this.email || undefined, emailVerified: this.emailVerified, displayName: this.displayName || undefined, isAnonymous: this.isAnonymous, photoURL: this.photoURL || undefined, phoneNumber: this.phoneNumber || undefined, tenantId: this.tenantId || undefined, providerData: this.providerData.map(function (userInfo) { return (__assign({}, userInfo)); }), stsTokenManager: this.stsTokenManager.toJSON(), 
                // Redirect event ID must be maintained in case there is a pending
                // redirect event.
                _redirectEventId: this._redirectEventId }, this.metadata.toJSON());
        };
        Object.defineProperty(UserImpl.prototype, "refreshToken", {
            get: function () {
                return this.stsTokenManager.refreshToken || '';
            },
            enumerable: false,
            configurable: true
        });
        UserImpl._fromJSON = function (auth, object) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            var displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : undefined;
            var email = (_b = object.email) !== null && _b !== void 0 ? _b : undefined;
            var phoneNumber = (_c = object.phoneNumber) !== null && _c !== void 0 ? _c : undefined;
            var photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : undefined;
            var tenantId = (_e = object.tenantId) !== null && _e !== void 0 ? _e : undefined;
            var _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : undefined;
            var createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : undefined;
            var lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : undefined;
            var uid = object.uid, emailVerified = object.emailVerified, isAnonymous = object.isAnonymous, providerData = object.providerData, plainObjectTokenManager = object.stsTokenManager;
            _assert(uid && plainObjectTokenManager, auth, "internal-error" /* INTERNAL_ERROR */);
            var stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
            _assert(typeof uid === 'string', auth, "internal-error" /* INTERNAL_ERROR */);
            assertStringOrUndefined(displayName, auth.name);
            assertStringOrUndefined(email, auth.name);
            _assert(typeof emailVerified === 'boolean', auth, "internal-error" /* INTERNAL_ERROR */);
            _assert(typeof isAnonymous === 'boolean', auth, "internal-error" /* INTERNAL_ERROR */);
            assertStringOrUndefined(phoneNumber, auth.name);
            assertStringOrUndefined(photoURL, auth.name);
            assertStringOrUndefined(tenantId, auth.name);
            assertStringOrUndefined(_redirectEventId, auth.name);
            assertStringOrUndefined(createdAt, auth.name);
            assertStringOrUndefined(lastLoginAt, auth.name);
            var user = new UserImpl({
                uid: uid,
                auth: auth,
                email: email,
                emailVerified: emailVerified,
                displayName: displayName,
                isAnonymous: isAnonymous,
                photoURL: photoURL,
                phoneNumber: phoneNumber,
                tenantId: tenantId,
                stsTokenManager: stsTokenManager,
                createdAt: createdAt,
                lastLoginAt: lastLoginAt
            });
            if (providerData && Array.isArray(providerData)) {
                user.providerData = providerData.map(function (userInfo) { return (__assign({}, userInfo)); });
            }
            if (_redirectEventId) {
                user._redirectEventId = _redirectEventId;
            }
            return user;
        };
        /**
         * Initialize a User from an idToken server response
         * @param auth
         * @param idTokenResponse
         */
        UserImpl._fromIdTokenResponse = function (auth, idTokenResponse, isAnonymous) {
            if (isAnonymous === void 0) { isAnonymous = false; }
            return __awaiter(this, void 0, void 0, function () {
                var stsTokenManager, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stsTokenManager = new StsTokenManager();
                            stsTokenManager.updateFromServerResponse(idTokenResponse);
                            user = new UserImpl({
                                uid: idTokenResponse.localId,
                                auth: auth,
                                stsTokenManager: stsTokenManager,
                                isAnonymous: isAnonymous
                            });
                            // Updates the user info and data and resolves with a user instance.
                            return [4 /*yield*/, _reloadWithoutSaving(user)];
                        case 1:
                            // Updates the user info and data and resolves with a user instance.
                            _a.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        return UserImpl;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var UserCredentialImpl = /** @class */ (function () {
        function UserCredentialImpl(params) {
            this.user = params.user;
            this.providerId = params.providerId;
            this._tokenResponse = params._tokenResponse;
            this.operationType = params.operationType;
        }
        UserCredentialImpl._fromIdTokenResponse = function (auth, operationType, idTokenResponse, isAnonymous) {
            if (isAnonymous === void 0) { isAnonymous = false; }
            return __awaiter(this, void 0, void 0, function () {
                var user, providerId, userCred;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, UserImpl._fromIdTokenResponse(auth, idTokenResponse, isAnonymous)];
                        case 1:
                            user = _a.sent();
                            providerId = providerIdForResponse(idTokenResponse);
                            userCred = new UserCredentialImpl({
                                user: user,
                                providerId: providerId,
                                _tokenResponse: idTokenResponse,
                                operationType: operationType
                            });
                            return [2 /*return*/, userCred];
                    }
                });
            });
        };
        UserCredentialImpl._forOperation = function (user, operationType, response) {
            return __awaiter(this, void 0, void 0, function () {
                var providerId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, user._updateTokensIfNecessary(response, /* reload */ true)];
                        case 1:
                            _a.sent();
                            providerId = providerIdForResponse(response);
                            return [2 /*return*/, new UserCredentialImpl({
                                    user: user,
                                    providerId: providerId,
                                    _tokenResponse: response,
                                    operationType: operationType
                                })];
                    }
                });
            });
        };
        return UserCredentialImpl;
    }());
    function providerIdForResponse(response) {
        if (response.providerId) {
            return response.providerId;
        }
        if ('phoneNumber' in response) {
            return "phone" /* PHONE */;
        }
        return null;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _persistenceKeyName(key, apiKey, appName) {
        return "firebase" /* PERSISTENCE */ + ":" + key + ":" + apiKey + ":" + appName;
    }
    var PersistenceUserManager = /** @class */ (function () {
        function PersistenceUserManager(persistence, auth, userKey) {
            this.persistence = persistence;
            this.auth = auth;
            this.userKey = userKey;
            var _a = this.auth, config = _a.config, name = _a.name;
            this.fullUserKey = _persistenceKeyName(this.userKey, config.apiKey, name);
            this.fullPersistenceKey = _persistenceKeyName("persistence" /* PERSISTENCE_USER */, config.apiKey, name);
            this.boundEventHandler = auth._onStorageEvent.bind(auth);
            this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
        }
        PersistenceUserManager.prototype.setCurrentUser = function (user) {
            return this.persistence._set(this.fullUserKey, user.toJSON());
        };
        PersistenceUserManager.prototype.getCurrentUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                var blob;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.persistence._get(this.fullUserKey)];
                        case 1:
                            blob = _a.sent();
                            return [2 /*return*/, blob ? UserImpl._fromJSON(this.auth, blob) : null];
                    }
                });
            });
        };
        PersistenceUserManager.prototype.removeCurrentUser = function () {
            return this.persistence._remove(this.fullUserKey);
        };
        PersistenceUserManager.prototype.savePersistenceForRedirect = function () {
            return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
        };
        PersistenceUserManager.prototype.setPersistence = function (newPersistence) {
            return __awaiter(this, void 0, void 0, function () {
                var currentUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.persistence.type === newPersistence.type) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.getCurrentUser()];
                        case 1:
                            currentUser = _a.sent();
                            return [4 /*yield*/, this.removeCurrentUser()];
                        case 2:
                            _a.sent();
                            this.persistence = newPersistence;
                            if (currentUser) {
                                return [2 /*return*/, this.setCurrentUser(currentUser)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        PersistenceUserManager.prototype.delete = function () {
            this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
        };
        PersistenceUserManager.create = function (auth, persistenceHierarchy, userKey) {
            if (userKey === void 0) { userKey = "authUser" /* AUTH_USER */; }
            return __awaiter(this, void 0, void 0, function () {
                var key, _i, persistenceHierarchy_1, persistence;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!persistenceHierarchy.length) {
                                return [2 /*return*/, new PersistenceUserManager(_getInstance(inMemoryPersistence), auth, userKey)];
                            }
                            key = _persistenceKeyName(userKey, auth.config.apiKey, auth.name);
                            _i = 0, persistenceHierarchy_1 = persistenceHierarchy;
                            _a.label = 1;
                        case 1:
                            if (!(_i < persistenceHierarchy_1.length)) return [3 /*break*/, 4];
                            persistence = persistenceHierarchy_1[_i];
                            return [4 /*yield*/, persistence._get(key)];
                        case 2:
                            if (_a.sent()) {
                                return [2 /*return*/, new PersistenceUserManager(persistence, auth, userKey)];
                            }
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: 
                        // Check all the available storage options.
                        // TODO: Migrate from local storage to indexedDB
                        // TODO: Clear other forms once one is found
                        // All else failed, fall back to zeroth persistence
                        // TODO: Modify this to support non-browser devices
                        return [2 /*return*/, new PersistenceUserManager(persistenceHierarchy[0], auth, userKey)];
                    }
                });
            });
        };
        return PersistenceUserManager;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var AuthImpl = /** @class */ (function () {
        function AuthImpl(app, config) {
            this.app = app;
            this.config = config;
            this.currentUser = null;
            this.operations = Promise.resolve();
            this.authStateSubscription = new Subscription(this);
            this.idTokenSubscription = new Subscription(this);
            this.redirectUser = null;
            this.isProactiveRefreshEnabled = false;
            this.redirectInitializerError = null;
            // Any network calls will set this to true and prevent subsequent emulator
            // initialization
            this._canInitEmulator = true;
            this._isInitialized = false;
            this._deleted = false;
            this._initializationPromise = null;
            this._popupRedirectResolver = null;
            this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
            // Tracks the last notified UID for state change listeners to prevent
            // repeated calls to the callbacks. Undefined means it's never been
            // called, whereas null means it's been called with a signed out user
            this.lastNotifiedUid = undefined;
            this.languageCode = null;
            this.tenantId = null;
            this.settings = { appVerificationDisabledForTesting: false };
            this.name = app.name;
        }
        AuthImpl.prototype._initializeWithPersistence = function (persistenceHierarchy, popupRedirectResolver) {
            var _this = this;
            // Have to check for app deletion throughout initialization (after each
            // promise resolution)
            this._initializationPromise = this.queue(function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this._deleted) {
                                return [2 /*return*/];
                            }
                            if (popupRedirectResolver) {
                                this._popupRedirectResolver = _getInstance(popupRedirectResolver);
                            }
                            _a = this;
                            return [4 /*yield*/, PersistenceUserManager.create(this, persistenceHierarchy)];
                        case 1:
                            _a.persistenceManager = _b.sent();
                            if (this._deleted) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.initializeCurrentUser(popupRedirectResolver)];
                        case 2:
                            _b.sent();
                            if (this._deleted) {
                                return [2 /*return*/];
                            }
                            this._isInitialized = true;
                            return [2 /*return*/];
                    }
                });
            }); });
            // After initialization completes, throw any error caused by redirect flow
            return this._initializationPromise.then(function () {
                if (_this.redirectInitializerError) {
                    throw _this.redirectInitializerError;
                }
            });
        };
        /**
         * If the persistence is changed in another window, the user manager will let us know
         */
        AuthImpl.prototype._onStorageEvent = function () {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._deleted) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.assertedPersistence.getCurrentUser()];
                        case 1:
                            user = _a.sent();
                            if (!this.currentUser && !user) {
                                // No change, do nothing (was signed out and remained signed out).
                                return [2 /*return*/];
                            }
                            if (!(this.currentUser && user && this.currentUser.uid === user.uid)) return [3 /*break*/, 3];
                            // Data update, simply copy data changes.
                            this._currentUser._assign(user);
                            // If tokens changed from previous user tokens, this will trigger
                            // notifyAuthListeners_.
                            return [4 /*yield*/, this.currentUser.getIdToken()];
                        case 2:
                            // If tokens changed from previous user tokens, this will trigger
                            // notifyAuthListeners_.
                            _a.sent();
                            return [2 /*return*/];
                        case 3: 
                        // Update current Auth state. Either a new login or logout.
                        return [4 /*yield*/, this._updateCurrentUser(user)];
                        case 4:
                            // Update current Auth state. Either a new login or logout.
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthImpl.prototype.initializeCurrentUser = function (popupRedirectResolver) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var storedUser, redirectUserEventId, storedUserEventId, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.assertedPersistence.getCurrentUser()];
                        case 1:
                            storedUser = (_b.sent());
                            if (!(popupRedirectResolver && this.config.authDomain)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.getOrInitRedirectPersistenceManager()];
                        case 2:
                            _b.sent();
                            redirectUserEventId = (_a = this.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
                            storedUserEventId = storedUser === null || storedUser === void 0 ? void 0 : storedUser._redirectEventId;
                            return [4 /*yield*/, this.tryRedirectSignIn(popupRedirectResolver)];
                        case 3:
                            result = _b.sent();
                            // If the stored user (i.e. the old "currentUser") has a redirectId that
                            // matches the redirect user, then we want to initially sign in with the
                            // new user object from result.
                            // TODO(samgho): More thoroughly test all of this
                            if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) && (result === null || result === void 0 ? void 0 : result.user)) {
                                storedUser = result.user;
                            }
                            _b.label = 4;
                        case 4:
                            // If no user in persistence, there is no current user. Set to null.
                            if (!storedUser) {
                                return [2 /*return*/, this.directlySetCurrentUser(null)];
                            }
                            if (!storedUser._redirectEventId) {
                                // This isn't a redirect user, we can reload and bail
                                // This will also catch the redirected user, if available, as that method
                                // strips the _redirectEventId
                                return [2 /*return*/, this.reloadAndSetCurrentUserOrClear(storedUser)];
                            }
                            _assert(this._popupRedirectResolver, this, "argument-error" /* ARGUMENT_ERROR */);
                            return [4 /*yield*/, this.getOrInitRedirectPersistenceManager()];
                        case 5:
                            _b.sent();
                            // If the redirect user's event ID matches the current user's event ID,
                            // DO NOT reload the current user, otherwise they'll be cleared from storage.
                            // This is important for the reauthenticateWithRedirect() flow.
                            if (this.redirectUser &&
                                this.redirectUser._redirectEventId === storedUser._redirectEventId) {
                                return [2 /*return*/, this.directlySetCurrentUser(storedUser)];
                            }
                            return [2 /*return*/, this.reloadAndSetCurrentUserOrClear(storedUser)];
                    }
                });
            });
        };
        AuthImpl.prototype.tryRedirectSignIn = function (redirectResolver) {
            return __awaiter(this, void 0, void 0, function () {
                var result, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = null;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 5]);
                            return [4 /*yield*/, this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true)];
                        case 2:
                            // We know this._popupRedirectResolver is set since redirectResolver
                            // is passed in. The _completeRedirectFn expects the unwrapped extern.
                            result = _a.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _a.sent();
                            this.redirectInitializerError = e_1;
                            return [4 /*yield*/, this._setRedirectUser(null)];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthImpl.prototype.reloadAndSetCurrentUserOrClear = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, _reloadWithoutSaving(user)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_2 = _a.sent();
                            if (e_2.code !== "auth/" + "network-request-failed" /* NETWORK_REQUEST_FAILED */) {
                                // Something's wrong with the user's token. Log them out and remove
                                // them from storage
                                return [2 /*return*/, this.directlySetCurrentUser(null)];
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/, this.directlySetCurrentUser(user)];
                    }
                });
            });
        };
        AuthImpl.prototype.useDeviceLanguage = function () {
            this.languageCode = _getUserLanguage();
        };
        AuthImpl.prototype.useEmulator = function (url, options) {
            _assert(this._canInitEmulator, this, "emulator-config-failed" /* EMULATOR_CONFIG_FAILED */);
            _assert(/^https?:\/\//.test(url), this, "invalid-emulator-scheme" /* INVALID_EMULATOR_SCHEME */);
            this.config.emulator = { url: url };
            this.settings.appVerificationDisabledForTesting = true;
            emitEmulatorWarning(!!(options === null || options === void 0 ? void 0 : options.disableWarnings));
        };
        AuthImpl.prototype._delete = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._deleted = true;
                    return [2 /*return*/];
                });
            });
        };
        AuthImpl.prototype.updateCurrentUser = function (userExtern) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    user = userExtern;
                    _assert(!user || user.auth.name === this.name, this, "argument-error" /* ARGUMENT_ERROR */);
                    return [2 /*return*/, this._updateCurrentUser(user && user._clone())];
                });
            });
        };
        AuthImpl.prototype._updateCurrentUser = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (this._deleted) {
                        return [2 /*return*/];
                    }
                    if (user) {
                        _assert(this.tenantId === user.tenantId, this, "tenant-id-mismatch" /* TENANT_ID_MISMATCH */);
                    }
                    return [2 /*return*/, this.queue(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.directlySetCurrentUser(user)];
                                    case 1:
                                        _a.sent();
                                        this.notifyAuthListeners();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                });
            });
        };
        AuthImpl.prototype.signOut = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.redirectPersistenceManager || this._popupRedirectResolver)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._setRedirectUser(null)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/, this._updateCurrentUser(null)];
                    }
                });
            });
        };
        AuthImpl.prototype.setPersistence = function (persistence) {
            var _this = this;
            return this.queue(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.assertedPersistence.setPersistence(_getInstance(persistence))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        AuthImpl.prototype._getPersistence = function () {
            return this.assertedPersistence.persistence.type;
        };
        AuthImpl.prototype._updateErrorMap = function (errorMap) {
            this._errorFactory = new ErrorFactory('auth', 'Firebase', errorMap());
        };
        AuthImpl.prototype.onAuthStateChanged = function (nextOrObserver, error, completed) {
            return this.registerStateListener(this.authStateSubscription, nextOrObserver, error, completed);
        };
        AuthImpl.prototype.onIdTokenChanged = function (nextOrObserver, error, completed) {
            return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error, completed);
        };
        AuthImpl.prototype.toJSON = function () {
            var _a;
            return {
                apiKey: this.config.apiKey,
                authDomain: this.config.authDomain,
                appName: this.name,
                currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
            };
        };
        AuthImpl.prototype._setRedirectUser = function (user, popupRedirectResolver) {
            return __awaiter(this, void 0, void 0, function () {
                var redirectManager;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrInitRedirectPersistenceManager(popupRedirectResolver)];
                        case 1:
                            redirectManager = _a.sent();
                            return [2 /*return*/, user === null
                                    ? redirectManager.removeCurrentUser()
                                    : redirectManager.setCurrentUser(user)];
                    }
                });
            });
        };
        AuthImpl.prototype.getOrInitRedirectPersistenceManager = function (popupRedirectResolver) {
            return __awaiter(this, void 0, void 0, function () {
                var resolver, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!!this.redirectPersistenceManager) return [3 /*break*/, 3];
                            resolver = (popupRedirectResolver && _getInstance(popupRedirectResolver)) ||
                                this._popupRedirectResolver;
                            _assert(resolver, this, "argument-error" /* ARGUMENT_ERROR */);
                            _a = this;
                            return [4 /*yield*/, PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser" /* REDIRECT_USER */)];
                        case 1:
                            _a.redirectPersistenceManager = _c.sent();
                            _b = this;
                            return [4 /*yield*/, this.redirectPersistenceManager.getCurrentUser()];
                        case 2:
                            _b.redirectUser = _c.sent();
                            _c.label = 3;
                        case 3: return [2 /*return*/, this.redirectPersistenceManager];
                    }
                });
            });
        };
        AuthImpl.prototype._redirectUserForId = function (id) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!this._isInitialized) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.queue(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    return [2 /*return*/];
                                }); }); })];
                        case 1:
                            _c.sent();
                            _c.label = 2;
                        case 2:
                            if (((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id) {
                                return [2 /*return*/, this._currentUser];
                            }
                            if (((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id) {
                                return [2 /*return*/, this.redirectUser];
                            }
                            return [2 /*return*/, null];
                    }
                });
            });
        };
        AuthImpl.prototype._persistUserIfCurrent = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (user === this.currentUser) {
                        return [2 /*return*/, this.queue(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, this.directlySetCurrentUser(user)];
                            }); }); })];
                    }
                    return [2 /*return*/];
                });
            });
        };
        /** Notifies listeners only if the user is current */
        AuthImpl.prototype._notifyListenersIfCurrent = function (user) {
            if (user === this.currentUser) {
                this.notifyAuthListeners();
            }
        };
        AuthImpl.prototype._key = function () {
            return this.config.authDomain + ":" + this.config.apiKey + ":" + this.name;
        };
        AuthImpl.prototype._startProactiveRefresh = function () {
            this.isProactiveRefreshEnabled = true;
            if (this.currentUser) {
                this._currentUser._startProactiveRefresh();
            }
        };
        AuthImpl.prototype._stopProactiveRefresh = function () {
            this.isProactiveRefreshEnabled = false;
            if (this.currentUser) {
                this._currentUser._stopProactiveRefresh();
            }
        };
        Object.defineProperty(AuthImpl.prototype, "_currentUser", {
            /** Returns the current user cast as the internal type */
            get: function () {
                return this.currentUser;
            },
            enumerable: false,
            configurable: true
        });
        AuthImpl.prototype.notifyAuthListeners = function () {
            var _a, _b;
            if (!this._isInitialized) {
                return;
            }
            this.idTokenSubscription.next(this.currentUser);
            var currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;
            if (this.lastNotifiedUid !== currentUid) {
                this.lastNotifiedUid = currentUid;
                this.authStateSubscription.next(this.currentUser);
            }
        };
        AuthImpl.prototype.registerStateListener = function (subscription, nextOrObserver, error, completed) {
            var _this = this;
            if (this._deleted) {
                return function () { };
            }
            var cb = typeof nextOrObserver === 'function'
                ? nextOrObserver
                : nextOrObserver.next;
            var promise = this._isInitialized
                ? Promise.resolve()
                : this._initializationPromise;
            _assert(promise, this, "internal-error" /* INTERNAL_ERROR */);
            // The callback needs to be called asynchronously per the spec.
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            promise.then(function () { return cb(_this.currentUser); });
            if (typeof nextOrObserver === 'function') {
                return subscription.addObserver(nextOrObserver, error, completed);
            }
            else {
                return subscription.addObserver(nextOrObserver);
            }
        };
        /**
         * Unprotected (from race conditions) method to set the current user. This
         * should only be called from within a queued callback. This is necessary
         * because the queue shouldn't rely on another queued callback.
         */
        AuthImpl.prototype.directlySetCurrentUser = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.currentUser && this.currentUser !== user) {
                                this._currentUser._stopProactiveRefresh();
                                if (user && this.isProactiveRefreshEnabled) {
                                    user._startProactiveRefresh();
                                }
                            }
                            this.currentUser = user;
                            if (!user) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.assertedPersistence.setCurrentUser(user)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.assertedPersistence.removeCurrentUser()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AuthImpl.prototype.queue = function (action) {
            // In case something errors, the callback still should be called in order
            // to keep the promise chain alive
            this.operations = this.operations.then(action, action);
            return this.operations;
        };
        Object.defineProperty(AuthImpl.prototype, "assertedPersistence", {
            get: function () {
                _assert(this.persistenceManager, this, "internal-error" /* INTERNAL_ERROR */);
                return this.persistenceManager;
            },
            enumerable: false,
            configurable: true
        });
        return AuthImpl;
    }());
    /**
     * Method to be used to cast down to our private implmentation of Auth
     *
     * @param auth Auth object passed in from developer
     */
    function _castAuth(auth) {
        return auth;
    }
    /** Helper class to wrap subscriber logic */
    var Subscription = /** @class */ (function () {
        function Subscription(auth) {
            var _this = this;
            this.auth = auth;
            this.observer = null;
            this.addObserver = createSubscribe(function (observer) { return (_this.observer = observer); });
        }
        Object.defineProperty(Subscription.prototype, "next", {
            get: function () {
                _assert(this.observer, this.auth, "internal-error" /* INTERNAL_ERROR */);
                return this.observer.next.bind(this.observer);
            },
            enumerable: false,
            configurable: true
        });
        return Subscription;
    }());
    function emitEmulatorWarning(disableBanner) {
        function attachBanner() {
            var el = document.createElement('p');
            var sty = el.style;
            el.innerText =
                'Running in emulator mode. Do not use with production credentials.';
            sty.position = 'fixed';
            sty.width = '100%';
            sty.backgroundColor = '#ffffff';
            sty.border = '.1em solid #000000';
            sty.color = '#ff0000';
            sty.bottom = '0px';
            sty.left = '0px';
            sty.margin = '0px';
            sty.zIndex = '10000';
            sty.textAlign = 'center';
            el.classList.add('firebase-emulator-warning');
            document.body.appendChild(el);
        }
        if (typeof console !== 'undefined' && typeof console.info === 'function') {
            console.info('WARNING: You are using the Auth Emulator,' +
                ' which is intended for local testing only.  Do not use with' +
                ' production credentials.');
        }
        if (typeof window !== 'undefined' &&
            typeof document !== 'undefined' &&
            !disableBanner) {
            if (document.readyState === 'loading') {
                window.addEventListener('DOMContentLoaded', attachBanner);
            }
            else {
                attachBanner();
            }
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Asynchronously signs in as an anonymous user.
     *
     * @remarks
     * If there is already an anonymous user signed in, that user will be returned; otherwise, a
     * new anonymous user identity will be created and returned.
     *
     * @param auth - The Auth instance.
     *
     * @public
     */
    function signInAnonymously(auth) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var authInternal, response, userCredential;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        authInternal = _castAuth(auth);
                        if ((_a = authInternal.currentUser) === null || _a === void 0 ? void 0 : _a.isAnonymous) {
                            // If an anonymous user is already signed in, no need to sign them in again.
                            return [2 /*return*/, new UserCredentialImpl({
                                    user: authInternal.currentUser,
                                    providerId: null,
                                    operationType: "signIn" /* SIGN_IN */
                                })];
                        }
                        return [4 /*yield*/, signUp(authInternal, {
                                returnSecureToken: true
                            })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn" /* SIGN_IN */, response, true)];
                    case 2:
                        userCredential = _b.sent();
                        return [4 /*yield*/, authInternal._updateCurrentUser(userCredential.user)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, userCredential];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var MultiFactorError = /** @class */ (function (_super) {
        __extends(MultiFactorError, _super);
        function MultiFactorError(auth, error, operationType, user) {
            var _a;
            var _this = _super.call(this, error.code, error.message) || this;
            _this.operationType = operationType;
            _this.user = user;
            _this.name = 'FirebaseError';
            // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(_this, MultiFactorError.prototype);
            _this.appName = auth.name;
            _this.code = error.code;
            _this.tenantId = (_a = auth.tenantId) !== null && _a !== void 0 ? _a : undefined;
            _this.serverResponse = error.customData
                .serverResponse;
            return _this;
        }
        MultiFactorError._fromErrorAndOperation = function (auth, error, operationType, user) {
            return new MultiFactorError(auth, error, operationType, user);
        };
        return MultiFactorError;
    }(FirebaseError));
    function _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user) {
        var idTokenProvider = operationType === "reauthenticate" /* REAUTHENTICATE */
            ? credential._getReauthenticationResolver(auth)
            : credential._getIdTokenResponse(auth);
        return idTokenProvider.catch(function (error) {
            if (error.code === "auth/" + "multi-factor-auth-required" /* MFA_REQUIRED */) {
                throw MultiFactorError._fromErrorAndOperation(auth, error, operationType, user);
            }
            throw error;
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Takes a set of UserInfo provider data and converts it to a set of names
     */
    function providerDataAsNames(providerData) {
        return new Set(providerData
            .map(function (_a) {
            var providerId = _a.providerId;
            return providerId;
        })
            .filter(function (pid) { return !!pid; }));
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Unlinks a provider from a user account.
     *
     * @param user - The user.
     * @param providerId - The provider to unlink.
     *
     * @public
     */
    function unlink(user, providerId) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, providerUserInfo, _a, _b, providersLeft;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        userInternal = user;
                        return [4 /*yield*/, _assertLinkedStatus(true, userInternal, providerId)];
                    case 1:
                        _d.sent();
                        _a = deleteLinkedAccounts;
                        _b = [userInternal.auth];
                        _c = {};
                        return [4 /*yield*/, user.getIdToken()];
                    case 2: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_c.idToken = _d.sent(),
                                _c.deleteProvider = [providerId],
                                _c)]))];
                    case 3:
                        providerUserInfo = (_d.sent()).providerUserInfo;
                        providersLeft = providerDataAsNames(providerUserInfo || []);
                        userInternal.providerData = user.providerData.filter(function (pd) {
                            return providersLeft.has(pd.providerId);
                        });
                        if (!providersLeft.has("phone" /* PHONE */)) {
                            userInternal.phoneNumber = null;
                        }
                        return [4 /*yield*/, userInternal.auth._persistUserIfCurrent(userInternal)];
                    case 4:
                        _d.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    }
    /** @internal */
    function _link(user, credential, bypassAuthState) {
        if (bypassAuthState === void 0) { bypassAuthState = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = _logoutIfInvalidated;
                        _b = [user];
                        _d = (_c = credential)._linkToIdToken;
                        _e = [user.auth];
                        return [4 /*yield*/, user.getIdToken()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_d.apply(_c, _e.concat([_f.sent()])), bypassAuthState]))];
                    case 2:
                        response = _f.sent();
                        return [2 /*return*/, UserCredentialImpl._forOperation(user, "link" /* LINK */, response)];
                }
            });
        });
    }
    /** @internal */
    function _assertLinkedStatus(expected, user, provider) {
        return __awaiter(this, void 0, void 0, function () {
            var providerIds, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _reloadWithoutSaving(user)];
                    case 1:
                        _a.sent();
                        providerIds = providerDataAsNames(user.providerData);
                        code = expected === false
                            ? "provider-already-linked" /* PROVIDER_ALREADY_LINKED */
                            : "no-such-provider" /* NO_SUCH_PROVIDER */;
                        _assert(providerIds.has(provider) === expected, user.auth, code);
                        return [2 /*return*/];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _reauthenticate(user, credential, bypassAuthState) {
        if (bypassAuthState === void 0) { bypassAuthState = false; }
        return __awaiter(this, void 0, void 0, function () {
            var auth, operationType, response, parsed, localId, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = user.auth;
                        operationType = "reauthenticate" /* REAUTHENTICATE */;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user), bypassAuthState)];
                    case 2:
                        response = _a.sent();
                        _assert(response.idToken, auth, "internal-error" /* INTERNAL_ERROR */);
                        parsed = _parseToken(response.idToken);
                        _assert(parsed, auth, "internal-error" /* INTERNAL_ERROR */);
                        localId = parsed.sub;
                        _assert(user.uid === localId, auth, "user-mismatch" /* USER_MISMATCH */);
                        return [2 /*return*/, UserCredentialImpl._forOperation(user, operationType, response)];
                    case 3:
                        e_1 = _a.sent();
                        // Convert user deleted error into user mismatch
                        if ((e_1 === null || e_1 === void 0 ? void 0 : e_1.code) === "auth/" + "user-not-found" /* USER_DELETED */) {
                            _fail(auth, "user-mismatch" /* USER_MISMATCH */);
                        }
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** @internal */
    function _signInWithCredential(auth, credential, bypassAuthState) {
        if (bypassAuthState === void 0) { bypassAuthState = false; }
        return __awaiter(this, void 0, void 0, function () {
            var operationType, response, userCredential;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operationType = "signIn" /* SIGN_IN */;
                        return [4 /*yield*/, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, UserCredentialImpl._fromIdTokenResponse(auth, operationType, response)];
                    case 2:
                        userCredential = _a.sent();
                        if (!!bypassAuthState) return [3 /*break*/, 4];
                        return [4 /*yield*/, auth._updateCurrentUser(userCredential.user)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, userCredential];
                }
            });
        });
    }
    /**
     * Asynchronously signs in with the given credentials.
     *
     * @remarks
     * An {@link @firebase/auth-types#AuthProvider} can be used to generate the credential.
     *
     * @param auth - The Auth instance.
     * @param credential - The auth credential.
     *
     * @public
     */
    function signInWithCredential(auth, credential) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _signInWithCredential(_castAuth(auth), credential)];
            });
        });
    }
    /**
     * Links the user account with the given credentials.
     *
     * @remarks
     * An {@link @firebase/auth-types#AuthProvider} can be used to generate the credential.
     *
     * @param user - The user.
     * @param credential - The auth credential.
     *
     * @public
     */
    function linkWithCredential(user, credential) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInternal = user;
                        return [4 /*yield*/, _assertLinkedStatus(false, userInternal, credential.providerId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, _link(userInternal, credential)];
                }
            });
        });
    }
    /**
     * Re-authenticates a user using a fresh credential.
     *
     * @remarks
     * Use before operations such as {@link updatePassword} that require tokens from recent sign-in
     * attempts. This method can be used to recover from a
     * {@link AuthErrorCode.CREDENTIAL_TOO_OLD_LOGIN_AGAIN} error.
     *
     * @param user - The user.
     * @param credential - The auth credential.
     *
     * @public
     */
    function reauthenticateWithCredential(user, credential) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _reauthenticate(user, credential)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function signInWithCustomToken(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performSignInRequest(auth, "POST" /* POST */, "/v1/accounts:signInWithCustomToken" /* SIGN_IN_WITH_CUSTOM_TOKEN */, request)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Asynchronously signs in using a custom token.
     *
     * @remarks
     * Custom tokens are used to integrate Firebase Auth with existing auth systems, and must
     * be generated by an auth backend using the
     * {@link https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#createcustomtoken | createCustomToken}
     * method in the {@link https://firebase.google.com/docs/auth/admin | Admin SDK} .
     *
     * Fails with an error if the token is invalid, expired, or not accepted by the Firebase Auth service.
     *
     * @param auth - The Auth instance.
     * @param customToken - The custom token to sign in with.
     *
     * @public
     */
    function signInWithCustomToken$1(auth, customToken) {
        return __awaiter(this, void 0, void 0, function () {
            var response, authInternal, cred;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, signInWithCustomToken(auth, {
                            token: customToken,
                            returnSecureToken: true
                        })];
                    case 1:
                        response = _a.sent();
                        authInternal = _castAuth(auth);
                        return [4 /*yield*/, UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn" /* SIGN_IN */, response)];
                    case 2:
                        cred = _a.sent();
                        return [4 /*yield*/, authInternal._updateCurrentUser(cred.user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, cred];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var MultiFactorInfo = /** @class */ (function () {
        function MultiFactorInfo(factorId, response) {
            this.factorId = factorId;
            this.uid = response.mfaEnrollmentId;
            this.enrollmentTime = new Date(response.enrolledAt).toUTCString();
            this.displayName = response.displayName;
        }
        MultiFactorInfo._fromServerResponse = function (auth, enrollment) {
            if ('phoneInfo' in enrollment) {
                return PhoneMultiFactorInfo._fromServerResponse(auth, enrollment);
            }
            return _fail(auth, "internal-error" /* INTERNAL_ERROR */);
        };
        return MultiFactorInfo;
    }());
    var PhoneMultiFactorInfo = /** @class */ (function (_super) {
        __extends(PhoneMultiFactorInfo, _super);
        function PhoneMultiFactorInfo(response) {
            var _this = _super.call(this, "phone" /* PHONE */, response) || this;
            _this.phoneNumber = response.phoneInfo;
            return _this;
        }
        PhoneMultiFactorInfo._fromServerResponse = function (_auth, enrollment) {
            return new PhoneMultiFactorInfo(enrollment);
        };
        return PhoneMultiFactorInfo;
    }(MultiFactorInfo));

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _setActionCodeSettingsOnRequest(auth, request, actionCodeSettings) {
        var _a;
        _assert(((_a = actionCodeSettings.url) === null || _a === void 0 ? void 0 : _a.length) > 0, auth, "invalid-continue-uri" /* INVALID_CONTINUE_URI */);
        _assert(typeof actionCodeSettings.dynamicLinkDomain === 'undefined' ||
            actionCodeSettings.dynamicLinkDomain.length > 0, auth, "invalid-dynamic-link-domain" /* INVALID_DYNAMIC_LINK_DOMAIN */);
        request.continueUrl = actionCodeSettings.url;
        request.dynamicLinkDomain = actionCodeSettings.dynamicLinkDomain;
        request.canHandleCodeInApp = actionCodeSettings.handleCodeInApp;
        if (actionCodeSettings.iOS) {
            _assert(actionCodeSettings.iOS.bundleId.length > 0, auth, "missing-ios-bundle-id" /* MISSING_IOS_BUNDLE_ID */);
            request.iosBundleId = actionCodeSettings.iOS.bundleId;
        }
        if (actionCodeSettings.android) {
            _assert(actionCodeSettings.android.packageName.length > 0, auth, "missing-android-pkg-name" /* MISSING_ANDROID_PACKAGE_NAME */);
            request.androidInstallApp = actionCodeSettings.android.installApp;
            request.androidMinimumVersionCode =
                actionCodeSettings.android.minimumVersion;
            request.androidPackageName = actionCodeSettings.android.packageName;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Sends a password reset email to the given email address.
     *
     * @remarks
     * To complete the password reset, call {@link confirmPasswordReset} with the code supplied in
     * the email sent to the user, along with the new password specified by the user.
     *
     * @example
     * ```javascript
     * const actionCodeSettings = {
     *   url: 'https://www.example.com/?email=user@example.com',
     *   iOS: {
     *      bundleId: 'com.example.ios'
     *   },
     *   android: {
     *     packageName: 'com.example.android',
     *     installApp: true,
     *     minimumVersion: '12'
     *   },
     *   handleCodeInApp: true
     * };
     * await sendPasswordResetEmail(auth, 'user@example.com', actionCodeSettings);
     * // Obtain code from user.
     * await confirmPasswordReset('user@example.com', code);
     * ```
     *
     * @param auth - The Auth instance.
     * @param email - The user's email address.
     * @param actionCodeSettings - The {@link @firebase/auth-types#ActionCodeSettings}.
     *
     * @public
     */
    function sendPasswordResetEmail$1(auth, email, actionCodeSettings) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {
                            requestType: "PASSWORD_RESET" /* PASSWORD_RESET */,
                            email: email
                        };
                        if (actionCodeSettings) {
                            _setActionCodeSettingsOnRequest(auth, request, actionCodeSettings);
                        }
                        return [4 /*yield*/, sendPasswordResetEmail(auth, request)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Completes the password reset process, given a confirmation code and new password.
     *
     * @param auth - The Auth instance.
     * @param oobCode - A confirmation code sent to the user.
     * @param newPassword - The new password.
     *
     * @public
     */
    function confirmPasswordReset(auth, oobCode, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resetPassword(auth, {
                            oobCode: oobCode,
                            newPassword: newPassword
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Applies a verification code sent to the user by email or other out-of-band mechanism.
     *
     * @param auth - The Auth instance.
     * @param oobCode - A verification code sent to the user.
     *
     * @public
     */
    function applyActionCode$1(auth, oobCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, applyActionCode(auth, { oobCode: oobCode })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Checks a verification code sent to the user by email or other out-of-band mechanism.
     *
     * @returns metadata about the code.
     *
     * @param auth - The Auth instance.
     * @param oobCode - A verification code sent to the user.
     *
     * @public
     */
    function checkActionCode(auth, oobCode) {
        return __awaiter(this, void 0, void 0, function () {
            var response, operation, multiFactorInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, resetPassword(auth, { oobCode: oobCode })];
                    case 1:
                        response = _a.sent();
                        operation = response.requestType;
                        _assert(operation, auth, "internal-error" /* INTERNAL_ERROR */);
                        switch (operation) {
                            case "EMAIL_SIGNIN" /* EMAIL_SIGNIN */:
                                break;
                            case "VERIFY_AND_CHANGE_EMAIL" /* VERIFY_AND_CHANGE_EMAIL */:
                                _assert(response.newEmail, auth, "internal-error" /* INTERNAL_ERROR */);
                                break;
                            case "REVERT_SECOND_FACTOR_ADDITION" /* REVERT_SECOND_FACTOR_ADDITION */:
                                _assert(response.mfaInfo, auth, "internal-error" /* INTERNAL_ERROR */);
                            // fall through
                            default:
                                _assert(response.email, auth, "internal-error" /* INTERNAL_ERROR */);
                        }
                        multiFactorInfo = null;
                        if (response.mfaInfo) {
                            multiFactorInfo = MultiFactorInfo._fromServerResponse(_castAuth(auth), response.mfaInfo);
                        }
                        return [2 /*return*/, {
                                data: {
                                    email: (response.requestType ===
                                        "VERIFY_AND_CHANGE_EMAIL" /* VERIFY_AND_CHANGE_EMAIL */
                                        ? response.newEmail
                                        : response.email) || null,
                                    previousEmail: (response.requestType ===
                                        "VERIFY_AND_CHANGE_EMAIL" /* VERIFY_AND_CHANGE_EMAIL */
                                        ? response.email
                                        : response.newEmail) || null,
                                    multiFactorInfo: multiFactorInfo
                                },
                                operation: operation
                            }];
                }
            });
        });
    }
    /**
     * Checks a password reset code sent to the user by email or other out-of-band mechanism.
     *
     * @returns the user's email address if valid.
     *
     * @param auth - The Auth instance.
     * @param code - A verification code sent to the user.
     *
     * @public
     */
    function verifyPasswordResetCode(auth, code) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, checkActionCode(auth, code)];
                    case 1:
                        data = (_a.sent()).data;
                        // Email should always be present since a code was sent to it
                        return [2 /*return*/, data.email];
                }
            });
        });
    }
    /**
     * Creates a new user account associated with the specified email address and password.
     *
     * @remarks
     * On successful creation of the user account, this user will also be signed in to your application.
     *
     * User account creation can fail if the account already exists or the password is invalid.
     *
     * Note: The email address acts as a unique identifier for the user and enables an email-based
     * password reset. This function will create a new user account and set the initial user password.
     *
     * @param auth - The Auth instance.
     * @param email - The user's email address.
     * @param password - The user's chosen password.
     *
     * @public
     */
    function createUserWithEmailAndPassword(auth, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var authInternal, response, userCredential;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authInternal = _castAuth(auth);
                        return [4 /*yield*/, signUp(auth, {
                                returnSecureToken: true,
                                email: email,
                                password: password
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn" /* SIGN_IN */, response)];
                    case 2:
                        userCredential = _a.sent();
                        return [4 /*yield*/, authInternal._updateCurrentUser(userCredential.user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, userCredential];
                }
            });
        });
    }
    /**
     * Asynchronously signs in using an email and password.
     *
     * @remarks
     * Fails with an error if the email address and password do not match.
     *
     * Note: The user's password is NOT the password used to access the user's email account. The
     * email address serves as a unique identifier for the user, and the password is used to access
     * the user's account in your Firebase project. See also: {@link createUserWithEmailAndPassword}.
     *
     * @param auth - The Auth instance.
     * @param email - The users email address.
     * @param password - The users password.
     *
     * @public
     */
    function signInWithEmailAndPassword(auth, email, password) {
        return signInWithCredential(auth, EmailAuthProvider.credential(email, password));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Sends a sign-in email link to the user with the specified email.
     *
     * @remarks
     * The sign-in operation has to always be completed in the app unlike other out of band email
     * actions (password reset and email verifications). This is because, at the end of the flow,
     * the user is expected to be signed in and their Auth state persisted within the app.
     *
     * To complete sign in with the email link, call {@link signInWithEmailLink} with the email
     * address and the email link supplied in the email sent to the user.
     *
     * @example
     * ```javascript
     * const actionCodeSettings = {
     *   url: 'https://www.example.com/?email=user@example.com',
     *   iOS: {
     *      bundleId: 'com.example.ios'
     *   },
     *   android: {
     *     packageName: 'com.example.android',
     *     installApp: true,
     *     minimumVersion: '12'
     *   },
     *   handleCodeInApp: true
     * };
     * await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
     * // Obtain emailLink from the user.
     * if(isSignInWithEmailLink(auth, emailLink)) {
     *   await signInWithEmailLink('user@example.com', 'user@example.com', emailLink);
     * }
     * ```
     *
     * @param auth - The Auth instance.
     * @param email - The user's email address.
     * @param actionCodeSettings - The {@link @firebase/auth-types#ActionCodeSettings}.
     *
     * @public
     */
    function sendSignInLinkToEmail$1(auth, email, actionCodeSettings) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {
                            requestType: "EMAIL_SIGNIN" /* EMAIL_SIGNIN */,
                            email: email
                        };
                        _assert(actionCodeSettings === null || actionCodeSettings === void 0 ? void 0 : actionCodeSettings.handleCodeInApp, auth, "argument-error" /* ARGUMENT_ERROR */);
                        if (actionCodeSettings) {
                            _setActionCodeSettingsOnRequest(auth, request, actionCodeSettings);
                        }
                        return [4 /*yield*/, sendSignInLinkToEmail(auth, request)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Checks if an incoming link is a sign-in with email link suitable for {@link signInWithEmailLink}.
     *
     * @param auth - The Auth instance.
     * @param emailLink - The link sent to the user's email address.
     *
     * @public
     */
    function isSignInWithEmailLink(auth, emailLink) {
        var actionCodeUrl = ActionCodeURL.parseLink(emailLink);
        return (actionCodeUrl === null || actionCodeUrl === void 0 ? void 0 : actionCodeUrl.operation) === "EMAIL_SIGNIN" /* EMAIL_SIGNIN */;
    }
    /**
     * Asynchronously signs in using an email and sign-in email link.
     *
     * @remarks
     * If no link is passed, the link is inferred from the current URL.
     *
     * Fails with an error if the email address is invalid or OTP in email link expires.
     *
     * Note: Confirm the link is a sign-in email link before calling this method firebase.auth.Auth.isSignInWithEmailLink.
     *
     * @example
     * ```javascript
     * const actionCodeSettings = {
     *   url: 'https://www.example.com/?email=user@example.com',
     *   iOS: {
     *      bundleId: 'com.example.ios'
     *   },
     *   android: {
     *     packageName: 'com.example.android',
     *     installApp: true,
     *     minimumVersion: '12'
     *   },
     *   handleCodeInApp: true
     * };
     * await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
     * // Obtain emailLink from the user.
     * if(isSignInWithEmailLink(auth, emailLink)) {
     *   await signInWithEmailLink('user@example.com', 'user@example.com', emailLink);
     * }
     * ```
     *
     * @param auth - The Auth instance.
     * @param email - The user's email address.
     * @param emailLink - The link sent to the user's email address.
     *
     * @public
     */
    function signInWithEmailLink$1(auth, email, emailLink) {
        return __awaiter(this, void 0, void 0, function () {
            var credential;
            return __generator(this, function (_a) {
                credential = EmailAuthProvider.credentialWithLink(email, emailLink || _getCurrentUrl());
                // Check if the tenant ID in the email link matches the tenant ID on Auth
                // instance.
                _assert(credential.tenantId === (auth.tenantId || null), auth, "tenant-id-mismatch" /* TENANT_ID_MISMATCH */);
                return [2 /*return*/, signInWithCredential(auth, credential)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function createAuthUri(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:createAuthUri" /* CREATE_AUTH_URI */, request)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Gets the list of possible sign in methods for the given email address.
     *
     * @remarks
     * This is useful to differentiate methods of sign-in for the same provider, eg.
     * {@link EmailAuthProvider} which has 2 methods of sign-in,
     * {@link @firebase/auth-types#SignInMethod.EMAIL_PASSWORD} and
     * {@link @firebase/auth-types#SignInMethod.EMAIL_LINK} .
     *
     * @param auth - The Auth instance.
     * @param email - The user's email address.
     *
     * @public
     */
    function fetchSignInMethodsForEmail(auth, email) {
        return __awaiter(this, void 0, void 0, function () {
            var continueUri, request, signinMethods;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        continueUri = _isHttpOrHttps() ? _getCurrentUrl() : 'http://localhost';
                        request = {
                            identifier: email,
                            continueUri: continueUri
                        };
                        return [4 /*yield*/, createAuthUri(auth, request)];
                    case 1:
                        signinMethods = (_a.sent()).signinMethods;
                        return [2 /*return*/, signinMethods || []];
                }
            });
        });
    }
    /**
     * Sends a verification email to a user.
     *
     * @remarks
     * The verification process is completed by calling {@link applyActionCode}.
     *
     * @example
     * ```javascript
     * const actionCodeSettings = {
     *   url: 'https://www.example.com/?email=user@example.com',
     *   iOS: {
     *      bundleId: 'com.example.ios'
     *   },
     *   android: {
     *     packageName: 'com.example.android',
     *     installApp: true,
     *     minimumVersion: '12'
     *   },
     *   handleCodeInApp: true
     * };
     * await sendEmailVerification(user, actionCodeSettings);
     * // Obtain code from the user.
     * await applyActionCode(auth, code);
     * ```
     *
     * @param user - The user.
     * @param actionCodeSettings - The {@link @firebase/auth-types#ActionCodeSettings}.
     *
     * @public
     */
    function sendEmailVerification$1(user, actionCodeSettings) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, idToken, request, email;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInternal = user;
                        return [4 /*yield*/, user.getIdToken()];
                    case 1:
                        idToken = _a.sent();
                        request = {
                            requestType: "VERIFY_EMAIL" /* VERIFY_EMAIL */,
                            idToken: idToken
                        };
                        if (actionCodeSettings) {
                            _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
                        }
                        return [4 /*yield*/, sendEmailVerification(userInternal.auth, request)];
                    case 2:
                        email = (_a.sent()).email;
                        if (!(email !== user.email)) return [3 /*break*/, 4];
                        return [4 /*yield*/, user.reload()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Sends a verification email to a new email address.
     *
     * @remarks
     * The user's email will be updated to the new one after being verified.
     *
     * If you have a custom email action handler, you can complete the verification process by calling
     * {@link applyActionCode}.
     *
     * @example
     * ```javascript
     * const actionCodeSettings = {
     *   url: 'https://www.example.com/?email=user@example.com',
     *   iOS: {
     *      bundleId: 'com.example.ios'
     *   },
     *   android: {
     *     packageName: 'com.example.android',
     *     installApp: true,
     *     minimumVersion: '12'
     *   },
     *   handleCodeInApp: true
     * };
     * await verifyBeforeUpdateEmail(user, 'newemail@example.com', actionCodeSettings);
     * // Obtain code from the user.
     * await applyActionCode(auth, code);
     * ```
     *
     * @param user - The user.
     * @param newEmail - The new email address to be verified before update.
     * @param actionCodeSettings - The {@link @firebase/auth-types#ActionCodeSettings}.
     *
     * @public
     */
    function verifyBeforeUpdateEmail(user, newEmail, actionCodeSettings) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, idToken, request, email;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInternal = user;
                        return [4 /*yield*/, user.getIdToken()];
                    case 1:
                        idToken = _a.sent();
                        request = {
                            requestType: "VERIFY_AND_CHANGE_EMAIL" /* VERIFY_AND_CHANGE_EMAIL */,
                            idToken: idToken,
                            newEmail: newEmail
                        };
                        if (actionCodeSettings) {
                            _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
                        }
                        return [4 /*yield*/, verifyAndChangeEmail(userInternal.auth, request)];
                    case 2:
                        email = (_a.sent()).email;
                        if (!(email !== user.email)) return [3 /*break*/, 4];
                        // If the local copy of the email on user is outdated, reload the
                        // user.
                        return [4 /*yield*/, user.reload()];
                    case 3:
                        // If the local copy of the email on user is outdated, reload the
                        // user.
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function updateProfile(auth, request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "POST" /* POST */, "/v1/accounts:update" /* SET_ACCOUNT_INFO */, request)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Updates a user's profile data.
     *
     * @param user - The user.
     * @param profile - The profile's `displayName` and `photoURL` to update.
     *
     * @public
     */
    function updateProfile$1(user, _a) {
        var displayName = _a.displayName, photoUrl = _a.photoURL;
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, idToken, profileRequest, response, passwordProvider;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (displayName === undefined && photoUrl === undefined) {
                            return [2 /*return*/];
                        }
                        userInternal = user;
                        return [4 /*yield*/, user.getIdToken()];
                    case 1:
                        idToken = _b.sent();
                        profileRequest = {
                            idToken: idToken,
                            displayName: displayName,
                            photoUrl: photoUrl,
                            returnSecureToken: true
                        };
                        return [4 /*yield*/, _logoutIfInvalidated(userInternal, updateProfile(userInternal.auth, profileRequest))];
                    case 2:
                        response = _b.sent();
                        userInternal.displayName = response.displayName || null;
                        userInternal.photoURL = response.photoUrl || null;
                        passwordProvider = userInternal.providerData.find(function (_a) {
                            var providerId = _a.providerId;
                            return providerId === "password" /* PASSWORD */;
                        });
                        if (passwordProvider) {
                            passwordProvider.displayName = user.displayName;
                            passwordProvider.photoURL = user.photoURL;
                        }
                        return [4 /*yield*/, userInternal._updateTokensIfNecessary(response)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Updates the user's email address.
     *
     * @remarks
     * An email will be sent to the original email address (if it was set) that allows to revoke the
     * email address change, in order to protect them from account hijacking.
     *
     * Important: this is a security sensitive operation that requires the user to have recently signed
     * in. If this requirement isn't met, ask the user to authenticate again and then call
     * {@link reauthenticateWithCredential}.
     *
     * @param user - The user.
     * @param newEmail - The new email address.
     *
     * @public
     */
    function updateEmail(user, newEmail) {
        return updateEmailOrPassword(user, newEmail, null);
    }
    /**
     * Updates the user's password.
     *
     * @remarks
     * Important: this is a security sensitive operation that requires the user to have recently signed
     * in. If this requirement isn't met, ask the user to authenticate again and then call
     * {@link reauthenticateWithCredential}.
     *
     * @param user - The user.
     * @param newPassword - The new password.
     *
     * @public
     */
    function updatePassword(user, newPassword) {
        return updateEmailOrPassword(user, null, newPassword);
    }
    /** @internal */
    function updateEmailOrPassword(user, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, idToken, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auth = user.auth;
                        return [4 /*yield*/, user.getIdToken()];
                    case 1:
                        idToken = _a.sent();
                        request = {
                            idToken: idToken,
                            returnSecureToken: true
                        };
                        if (email) {
                            request.email = email;
                        }
                        if (password) {
                            request.password = password;
                        }
                        return [4 /*yield*/, _logoutIfInvalidated(user, updateEmailPassword(auth, request))];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, user._updateTokensIfNecessary(response, /* reload */ true)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Parse the `AdditionalUserInfo` from the ID token response.
     *
     * @internal
     */
    function _fromIdTokenResponse(idTokenResponse) {
        var _a, _b;
        if (!idTokenResponse) {
            return null;
        }
        var providerId = idTokenResponse.providerId;
        var profile = idTokenResponse.rawUserInfo
            ? JSON.parse(idTokenResponse.rawUserInfo)
            : {};
        var isNewUser = idTokenResponse.isNewUser ||
            idTokenResponse.kind === "identitytoolkit#SignupNewUserResponse" /* SignupNewUser */;
        if (!providerId && (idTokenResponse === null || idTokenResponse === void 0 ? void 0 : idTokenResponse.idToken)) {
            var signInProvider = (_b = (_a = _parseToken(idTokenResponse.idToken)) === null || _a === void 0 ? void 0 : _a.firebase) === null || _b === void 0 ? void 0 : _b['sign_in_provider'];
            if (signInProvider) {
                var filteredProviderId = signInProvider !== "anonymous" /* ANONYMOUS */ &&
                    signInProvider !== "custom" /* CUSTOM */
                    ? signInProvider
                    : null;
                // Uses generic class in accordance with the legacy SDK.
                return new GenericAdditionalUserInfo(isNewUser, filteredProviderId);
            }
        }
        if (!providerId) {
            return null;
        }
        switch (providerId) {
            case "facebook.com" /* FACEBOOK */:
                return new FacebookAdditionalUserInfo(isNewUser, profile);
            case "github.com" /* GITHUB */:
                return new GithubAdditionalUserInfo(isNewUser, profile);
            case "google.com" /* GOOGLE */:
                return new GoogleAdditionalUserInfo(isNewUser, profile);
            case "twitter.com" /* TWITTER */:
                return new TwitterAdditionalUserInfo(isNewUser, profile, idTokenResponse.screenName || null);
            case "custom" /* CUSTOM */:
            case "anonymous" /* ANONYMOUS */:
                return new GenericAdditionalUserInfo(isNewUser, null);
            default:
                return new GenericAdditionalUserInfo(isNewUser, providerId, profile);
        }
    }
    var GenericAdditionalUserInfo = /** @class */ (function () {
        function GenericAdditionalUserInfo(isNewUser, providerId, profile) {
            if (profile === void 0) { profile = {}; }
            this.isNewUser = isNewUser;
            this.providerId = providerId;
            this.profile = profile;
        }
        return GenericAdditionalUserInfo;
    }());
    var FederatedAdditionalUserInfoWithUsername = /** @class */ (function (_super) {
        __extends(FederatedAdditionalUserInfoWithUsername, _super);
        function FederatedAdditionalUserInfoWithUsername(isNewUser, providerId, profile, username) {
            var _this = _super.call(this, isNewUser, providerId, profile) || this;
            _this.username = username;
            return _this;
        }
        return FederatedAdditionalUserInfoWithUsername;
    }(GenericAdditionalUserInfo));
    var FacebookAdditionalUserInfo = /** @class */ (function (_super) {
        __extends(FacebookAdditionalUserInfo, _super);
        function FacebookAdditionalUserInfo(isNewUser, profile) {
            return _super.call(this, isNewUser, "facebook.com" /* FACEBOOK */, profile) || this;
        }
        return FacebookAdditionalUserInfo;
    }(GenericAdditionalUserInfo));
    var GithubAdditionalUserInfo = /** @class */ (function (_super) {
        __extends(GithubAdditionalUserInfo, _super);
        function GithubAdditionalUserInfo(isNewUser, profile) {
            return _super.call(this, isNewUser, "github.com" /* GITHUB */, profile, typeof (profile === null || profile === void 0 ? void 0 : profile.login) === 'string' ? profile === null || profile === void 0 ? void 0 : profile.login : null) || this;
        }
        return GithubAdditionalUserInfo;
    }(FederatedAdditionalUserInfoWithUsername));
    var GoogleAdditionalUserInfo = /** @class */ (function (_super) {
        __extends(GoogleAdditionalUserInfo, _super);
        function GoogleAdditionalUserInfo(isNewUser, profile) {
            return _super.call(this, isNewUser, "google.com" /* GOOGLE */, profile) || this;
        }
        return GoogleAdditionalUserInfo;
    }(GenericAdditionalUserInfo));
    var TwitterAdditionalUserInfo = /** @class */ (function (_super) {
        __extends(TwitterAdditionalUserInfo, _super);
        function TwitterAdditionalUserInfo(isNewUser, profile, screenName) {
            return _super.call(this, isNewUser, "twitter.com" /* TWITTER */, profile, screenName) || this;
        }
        return TwitterAdditionalUserInfo;
    }(FederatedAdditionalUserInfoWithUsername));
    /**
     * Extracts provider specific {@link @firebase/auth-types#AdditionalUserInfo} for the given credential.
     *
     * @param userCredential - The user credential.
     *
     * @public
     */
    function getAdditionalUserInfo(userCredential) {
        var _a = userCredential, user = _a.user, _tokenResponse = _a._tokenResponse;
        if (user.isAnonymous && !_tokenResponse) {
            // Handle the special case where signInAnonymously() gets called twice.
            // No network call is made so there's nothing to actually fill this in
            return {
                providerId: null,
                isNewUser: false,
                profile: null
            };
        }
        return _fromIdTokenResponse(_tokenResponse);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Non-optional auth methods.
    /**
     * Changes the type of persistence on the Auth instance for the currently saved
     * Auth session and applies this type of persistence for future sign-in requests, including
     * sign-in with redirect requests.
     *
     * @remarks
     * This makes it easy for a user signing in to specify whether their session should be
     * remembered or not. It also makes it easier to never persist the Auth state for applications
     * that are shared by other users or have sensitive data.
     *
     * @example
     * ```javascript
     * setPersistence(auth, browserSessionPersistence);
     * ```
     *
     * @param auth - The Auth instance.
     * @param persistence - The {@link @firebase/auth-types#Persistence} to use.
     * @returns A promise that resolves once the persistence change has completed
     *
     * @public
     */
    function setPersistence(auth, persistence) {
        return auth.setPersistence(persistence);
    }
    /**
     * Adds an observer for changes to the signed-in user's ID token, which includes sign-in,
     * sign-out, and token refresh events.
     *
     * @param auth - The Auth instance.
     * @param nextOrObserver - callback triggered on change.
     * @param error - callback triggered on error.
     * @param completed - callback triggered when observer is removed.
     *
     * @public
     */
    function onIdTokenChanged(auth, nextOrObserver, error, completed) {
        return auth.onIdTokenChanged(nextOrObserver, error, completed);
    }
    /**
     * Adds an observer for changes to the user's sign-in state.
     *
     * @remarks
     * To keep the old behavior, see {@link onIdTokenChanged}.
     *
     * @param auth - The Auth instance.
     * @param nextOrObserver - callback triggered on change.
     * @param error - callback triggered on error.
     * @param completed - callback triggered when observer is removed.
     *
     * @public
     */
    function onAuthStateChanged(auth, nextOrObserver, error, completed) {
        return auth.onAuthStateChanged(nextOrObserver, error, completed);
    }
    /**
     * Sets the current language to the default device/browser preference.
     *
     * @param auth - The Auth instanec.
     *
     * @public
     */
    function useDeviceLanguage(auth) {
        auth.useDeviceLanguage();
    }
    /**
     * Asynchronously sets the provided user as {@link @firebase/auth-types#Auth.currentUser} on the
     * {@link @firebase/auth-types#Auth} instance.
     *
     * @remarks
     * A new instance copy of the user provided will be made and set as currentUser.
     *
     * This will trigger {@link onAuthStateChanged} and {@link onIdTokenChanged} listeners
     * like other sign in methods.
     *
     * The operation fails with an error if the user to be updated belongs to a different Firebase
     * project.
     *
     * @param auth - The Auth instance.
     * @param user - The new {@link @firebase/auth-types#User}.
     *
     * @public
     */
    function updateCurrentUser(auth, user) {
        return auth.updateCurrentUser(user);
    }
    /**
     * Signs out the current user.
     *
     * @param auth - The Auth instance.
     *
     * @public
     */
    function signOut(auth) {
        return auth.signOut();
    }
    /**
     * Deletes and signs out the user.
     *
     * @remarks
     * Important: this is a security-sensitive operation that requires the user to have recently
     * signed in. If this requirement isn't met, ask the user to authenticate again and then call
     * {@link reauthenticateWithCredential}.
     *
     * @param user - The user.
     *
     * @public
     */
    function deleteUser(user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, user.delete()];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var MultiFactorSession = /** @class */ (function () {
        function MultiFactorSession(type, credential) {
            this.type = type;
            this.credential = credential;
        }
        MultiFactorSession._fromIdtoken = function (idToken) {
            return new MultiFactorSession("enroll" /* ENROLL */, idToken);
        };
        MultiFactorSession._fromMfaPendingCredential = function (mfaPendingCredential) {
            return new MultiFactorSession("signin" /* SIGN_IN */, mfaPendingCredential);
        };
        MultiFactorSession.prototype.toJSON = function () {
            var _a;
            var key = this.type === "enroll" /* ENROLL */
                ? 'idToken'
                : 'pendingCredential';
            return {
                multiFactorSession: (_a = {},
                    _a[key] = this.credential,
                    _a)
            };
        };
        MultiFactorSession.fromJSON = function (obj) {
            var _a, _b;
            if (obj === null || obj === void 0 ? void 0 : obj.multiFactorSession) {
                if ((_a = obj.multiFactorSession) === null || _a === void 0 ? void 0 : _a.pendingCredential) {
                    return MultiFactorSession._fromMfaPendingCredential(obj.multiFactorSession.pendingCredential);
                }
                else if ((_b = obj.multiFactorSession) === null || _b === void 0 ? void 0 : _b.idToken) {
                    return MultiFactorSession._fromIdtoken(obj.multiFactorSession.idToken);
                }
            }
            return null;
        };
        return MultiFactorSession;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var MultiFactorResolver = /** @class */ (function () {
        function MultiFactorResolver(session, hints, signInResolver) {
            this.session = session;
            this.hints = hints;
            this.signInResolver = signInResolver;
        }
        /** @internal */
        MultiFactorResolver._fromError = function (authExtern, error) {
            var _this = this;
            var auth = _castAuth(authExtern);
            var hints = (error.serverResponse.mfaInfo || []).map(function (enrollment) {
                return MultiFactorInfo._fromServerResponse(auth, enrollment);
            });
            _assert(error.serverResponse.mfaPendingCredential, auth, "internal-error" /* INTERNAL_ERROR */);
            var session = MultiFactorSession._fromMfaPendingCredential(error.serverResponse.mfaPendingCredential);
            return new MultiFactorResolver(session, hints, function (assertion) { return __awaiter(_this, void 0, void 0, function () {
                var mfaResponse, idTokenResponse, _a, userCredential;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, assertion._process(auth, session)];
                        case 1:
                            mfaResponse = _b.sent();
                            // Clear out the unneeded fields from the old login response
                            delete error.serverResponse.mfaInfo;
                            delete error.serverResponse.mfaPendingCredential;
                            idTokenResponse = __assign(__assign({}, error.serverResponse), { idToken: mfaResponse.idToken, refreshToken: mfaResponse.refreshToken });
                            _a = error.operationType;
                            switch (_a) {
                                case "signIn" /* SIGN_IN */: return [3 /*break*/, 2];
                                case "reauthenticate" /* REAUTHENTICATE */: return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 6];
                        case 2: return [4 /*yield*/, UserCredentialImpl._fromIdTokenResponse(auth, error.operationType, idTokenResponse)];
                        case 3:
                            userCredential = _b.sent();
                            return [4 /*yield*/, auth._updateCurrentUser(userCredential.user)];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, userCredential];
                        case 5:
                            _assert(error.user, auth, "internal-error" /* INTERNAL_ERROR */);
                            return [2 /*return*/, UserCredentialImpl._forOperation(error.user, error.operationType, idTokenResponse)];
                        case 6:
                            _fail(auth, "internal-error" /* INTERNAL_ERROR */);
                            _b.label = 7;
                        case 7: return [2 /*return*/];
                    }
                });
            }); });
        };
        MultiFactorResolver.prototype.resolveSignIn = function (assertionExtern) {
            return __awaiter(this, void 0, void 0, function () {
                var assertion;
                return __generator(this, function (_a) {
                    assertion = assertionExtern;
                    return [2 /*return*/, this.signInResolver(assertion)];
                });
            });
        };
        return MultiFactorResolver;
    }());
    /**
     * Provides a {@link @firebase/auth-types#MultiFactorResolver} suitable for completion of a
     * multi-factor flow.
     *
     * @param auth - The auth instance.
     * @param error - The {@link @firebase/auth-types#MultiFactorError} raised during a sign-in, or
     * reauthentication operation.
     *
     * @public
     */
    function getMultiFactorResolver(auth, error) {
        var _a;
        var errorInternal = error;
        _assert(error.operationType, auth, "argument-error" /* ARGUMENT_ERROR */);
        _assert((_a = errorInternal.serverResponse) === null || _a === void 0 ? void 0 : _a.mfaPendingCredential, auth, "argument-error" /* ARGUMENT_ERROR */);
        return MultiFactorResolver._fromError(auth, errorInternal);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function startEnrollPhoneMfa(auth, request) {
        return _performApiRequest(auth, "POST" /* POST */, "/v2/accounts/mfaEnrollment:start" /* START_PHONE_MFA_ENROLLMENT */, __assign({ tenantId: auth.tenantId }, request));
    }
    function finalizeEnrollPhoneMfa(auth, request) {
        return _performApiRequest(auth, "POST" /* POST */, "/v2/accounts/mfaEnrollment:finalize" /* FINALIZE_PHONE_MFA_ENROLLMENT */, __assign({ tenantId: auth.tenantId }, request));
    }
    function withdrawMfa(auth, request) {
        return _performApiRequest(auth, "POST" /* POST */, "/v2/accounts/mfaEnrollment:withdraw" /* WITHDRAW_MFA */, __assign({ tenantId: auth.tenantId }, request));
    }

    var MultiFactorUser = /** @class */ (function () {
        function MultiFactorUser(user) {
            var _this = this;
            this.user = user;
            this.enrolledFactors = [];
            user._onReload(function (userInfo) {
                if (userInfo.mfaInfo) {
                    _this.enrolledFactors = userInfo.mfaInfo.map(function (enrollment) {
                        return MultiFactorInfo._fromServerResponse(user.auth, enrollment);
                    });
                }
            });
        }
        MultiFactorUser._fromUser = function (user) {
            return new MultiFactorUser(user);
        };
        MultiFactorUser.prototype.getSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = MultiFactorSession)._fromIdtoken;
                            return [4 /*yield*/, this.user.getIdToken()];
                        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                    }
                });
            });
        };
        MultiFactorUser.prototype.enroll = function (assertionExtern, displayName) {
            return __awaiter(this, void 0, void 0, function () {
                var assertion, session, finalizeMfaResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            assertion = assertionExtern;
                            return [4 /*yield*/, this.getSession()];
                        case 1:
                            session = (_a.sent());
                            return [4 /*yield*/, _logoutIfInvalidated(this.user, assertion._process(this.user.auth, session, displayName))];
                        case 2:
                            finalizeMfaResponse = _a.sent();
                            // New tokens will be issued after enrollment of the new second factors.
                            // They need to be updated on the user.
                            return [4 /*yield*/, this.user._updateTokensIfNecessary(finalizeMfaResponse)];
                        case 3:
                            // New tokens will be issued after enrollment of the new second factors.
                            // They need to be updated on the user.
                            _a.sent();
                            // The user needs to be reloaded to get the new multi-factor information
                            // from server. USER_RELOADED event will be triggered and `enrolledFactors`
                            // will be updated.
                            return [2 /*return*/, this.user.reload()];
                    }
                });
            });
        };
        MultiFactorUser.prototype.unenroll = function (infoOrUid) {
            return __awaiter(this, void 0, void 0, function () {
                var mfaEnrollmentId, idToken, idTokenResponse, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mfaEnrollmentId = typeof infoOrUid === 'string' ? infoOrUid : infoOrUid.uid;
                            return [4 /*yield*/, this.user.getIdToken()];
                        case 1:
                            idToken = _a.sent();
                            return [4 /*yield*/, _logoutIfInvalidated(this.user, withdrawMfa(this.user.auth, {
                                    idToken: idToken,
                                    mfaEnrollmentId: mfaEnrollmentId
                                }))];
                        case 2:
                            idTokenResponse = _a.sent();
                            // Remove the second factor from the user's list.
                            this.enrolledFactors = this.enrolledFactors.filter(function (_a) {
                                var uid = _a.uid;
                                return uid !== mfaEnrollmentId;
                            });
                            // Depending on whether the backend decided to revoke the user's session,
                            // the tokenResponse may be empty. If the tokens were not updated (and they
                            // are now invalid), reloading the user will discover this and invalidate
                            // the user's state accordingly.
                            return [4 /*yield*/, this.user._updateTokensIfNecessary(idTokenResponse)];
                        case 3:
                            // Depending on whether the backend decided to revoke the user's session,
                            // the tokenResponse may be empty. If the tokens were not updated (and they
                            // are now invalid), reloading the user will discover this and invalidate
                            // the user's state accordingly.
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.user.reload()];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            e_1 = _a.sent();
                            if (e_1.code !== "auth/" + "user-token-expired" /* TOKEN_EXPIRED */) {
                                throw e_1;
                            }
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        return MultiFactorUser;
    }());
    var multiFactorUserCache = new WeakMap();
    /**
     * The {@link @firebase/auth-types#MultiFactorUser} corresponding to the user.
     *
     * @remarks
     * This is used to access all multi-factor properties and operations related to the user.
     *
     * @param user - The user.
     *
     * @public
     */
    function multiFactor(user) {
        if (!multiFactorUserCache.has(user)) {
            multiFactorUserCache.set(user, MultiFactorUser._fromUser(user));
        }
        return multiFactorUserCache.get(user);
    }

    var version = "0.0.900";

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Determine the browser for the purposes of reporting usage to the API
     */
    function _getBrowserName(userAgent) {
        var ua = userAgent.toLowerCase();
        if (ua.includes('opera/') || ua.includes('opr/') || ua.includes('opios/')) {
            return "Opera" /* OPERA */;
        }
        else if (_isIEMobile(ua)) {
            // Windows phone IEMobile browser.
            return "IEMobile" /* IEMOBILE */;
        }
        else if (ua.includes('msie') || ua.includes('trident/')) {
            return "IE" /* IE */;
        }
        else if (ua.includes('edge/')) {
            return "Edge" /* EDGE */;
        }
        else if (_isFirefox(ua)) {
            return "Firefox" /* FIREFOX */;
        }
        else if (ua.includes('silk/')) {
            return "Silk" /* SILK */;
        }
        else if (_isBlackBerry(ua)) {
            // Blackberry browser.
            return "Blackberry" /* BLACKBERRY */;
        }
        else if (_isWebOS(ua)) {
            // WebOS default browser.
            return "Webos" /* WEBOS */;
        }
        else if (_isSafari(ua)) {
            return "Safari" /* SAFARI */;
        }
        else if ((ua.includes('chrome/') || _isChromeIOS(ua)) &&
            !ua.includes('edge/')) {
            return "Chrome" /* CHROME */;
        }
        else if (_isAndroid(ua)) {
            // Android stock browser.
            return "Android" /* ANDROID */;
        }
        else {
            // Most modern browsers have name/version at end of user agent string.
            var re = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;
            var matches = userAgent.match(re);
            if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) {
                return matches[1];
            }
        }
        return "Other" /* OTHER */;
    }
    function _isFirefox(ua) {
        return /firefox\//i.test(ua);
    }
    function _isSafari(userAgent) {
        var ua = userAgent.toLowerCase();
        return (ua.includes('safari/') &&
            !ua.includes('chrome/') &&
            !ua.includes('crios/') &&
            !ua.includes('android'));
    }
    function _isChromeIOS(ua) {
        return /crios\//i.test(ua);
    }
    function _isIEMobile(ua) {
        return /iemobile/i.test(ua);
    }
    function _isAndroid(ua) {
        return /android/i.test(ua);
    }
    function _isBlackBerry(ua) {
        return /blackberry/i.test(ua);
    }
    function _isWebOS(ua) {
        return /webos/i.test(ua);
    }
    function _isIOS(ua) {
        return /iphone|ipad|ipod/i.test(ua);
    }
    function _isIOSStandalone(ua) {
        var _a;
        return _isIOS(ua) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
    }
    function _isIE10() {
        return isIE() && document.documentMode === 10;
    }
    function _isMobileBrowser(ua) {
        if (ua === void 0) { ua = getUA(); }
        // TODO: implement getBrowserName equivalent for OS.
        return (_isIOS(ua) ||
            _isAndroid(ua) ||
            _isWebOS(ua) ||
            _isBlackBerry(ua) ||
            /windows phone/i.test(ua) ||
            _isIEMobile(ua));
    }
    function _isIframe() {
        try {
            // Check that the current window is not the top window.
            // If so, return true.
            return !!(window && window !== window.top);
        }
        catch (e) {
            return false;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /*
     * Determine the SDK version string
     *
     * TODO: This should be set on the Auth object during initialization
     */
    function _getClientVersion(clientPlatform) {
        var reportedPlatform;
        switch (clientPlatform) {
            case "Browser" /* BROWSER */:
                // In a browser environment, report the browser name.
                reportedPlatform = _getBrowserName(getUA());
                break;
            case "Worker" /* WORKER */:
                // Technically a worker runs from a browser but we need to differentiate a
                // worker from a browser.
                // For example: Chrome-Worker/JsCore/4.9.1/FirebaseCore-web.
                reportedPlatform = _getBrowserName(getUA()) + "-" + clientPlatform;
                break;
            default:
                reportedPlatform = clientPlatform;
        }
        return reportedPlatform + "/" + "JsCore" /* CORE */ + "/" + app.SDK_VERSION + "/" + "FirebaseCore-web" /* DEFAULT */;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var AuthInternal = /** @class */ (function () {
        function AuthInternal(auth) {
            this.auth = auth;
            this.internalListeners = new Map();
        }
        AuthInternal.prototype.getUid = function () {
            var _a;
            return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
        };
        AuthInternal.prototype.getToken = function (forceRefresh) {
            return __awaiter(this, void 0, void 0, function () {
                var accessToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auth._initializationPromise];
                        case 1:
                            _a.sent();
                            if (!this.auth.currentUser) {
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, this.auth.currentUser.getIdToken(forceRefresh)];
                        case 2:
                            accessToken = _a.sent();
                            return [2 /*return*/, { accessToken: accessToken }];
                    }
                });
            });
        };
        AuthInternal.prototype.addAuthTokenListener = function (listener) {
            if (this.internalListeners.has(listener)) {
                return;
            }
            var unsubscribe = this.auth.onIdTokenChanged(function (user) {
                var _a;
                listener(((_a = user) === null || _a === void 0 ? void 0 : _a.stsTokenManager.accessToken) || null);
            });
            this.internalListeners.set(listener, unsubscribe);
            this.updateProactiveRefresh();
        };
        AuthInternal.prototype.removeAuthTokenListener = function (listener) {
            var unsubscribe = this.internalListeners.get(listener);
            if (!unsubscribe) {
                return;
            }
            this.internalListeners.delete(listener);
            unsubscribe();
            this.updateProactiveRefresh();
        };
        AuthInternal.prototype.updateProactiveRefresh = function () {
            if (this.internalListeners.size > 0) {
                this.auth._startProactiveRefresh();
            }
            else {
                this.auth._stopProactiveRefresh();
            }
        };
        return AuthInternal;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function getVersionForPlatform(clientPlatform) {
        switch (clientPlatform) {
            case "Node" /* NODE */:
                return 'node';
            case "ReactNative" /* REACT_NATIVE */:
                return 'rn';
            case "Worker" /* WORKER */:
                return 'webworker';
            default:
                return undefined;
        }
    }
    /** @internal */
    function registerAuth(clientPlatform) {
        app._registerComponent(new Component("auth-exp" /* AUTH */, function (container) {
            var app = container.getProvider('app-exp').getImmediate();
            var _a = app.options, apiKey = _a.apiKey, authDomain = _a.authDomain;
            return (function (app) {
                _assert(apiKey, "invalid-api-key" /* INVALID_API_KEY */, { appName: app.name });
                var config = {
                    apiKey: apiKey,
                    authDomain: authDomain,
                    apiHost: "identitytoolkit.googleapis.com" /* API_HOST */,
                    tokenApiHost: "securetoken.googleapis.com" /* TOKEN_API_HOST */,
                    apiScheme: "https" /* API_SCHEME */,
                    sdkClientVersion: _getClientVersion(clientPlatform)
                };
                return new AuthImpl(app, config);
            })(app);
        }, "PUBLIC" /* PUBLIC */));
        app._registerComponent(new Component("auth-internal" /* AUTH_INTERNAL */, function (container) {
            var auth = _castAuth(container.getProvider("auth-exp" /* AUTH */).getImmediate());
            return (function (auth) { return new AuthInternal(auth); })(auth);
        }, "PRIVATE" /* PRIVATE */));
        app.registerVersion("auth-exp" /* AUTH */, version, getVersionForPlatform(clientPlatform));
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var STORAGE_AVAILABLE_KEY = '__sak';

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // There are two different browser persistence types: local and session.
    // Both have the same implementation but use a different underlying storage
    // object.
    var BrowserPersistenceClass = /** @class */ (function () {
        function BrowserPersistenceClass(storage, type) {
            this.storage = storage;
            this.type = type;
        }
        BrowserPersistenceClass.prototype._isAvailable = function () {
            try {
                if (!this.storage) {
                    return Promise.resolve(false);
                }
                this.storage.setItem(STORAGE_AVAILABLE_KEY, '1');
                this.storage.removeItem(STORAGE_AVAILABLE_KEY);
                return Promise.resolve(true);
            }
            catch (_a) {
                return Promise.resolve(false);
            }
        };
        BrowserPersistenceClass.prototype._set = function (key, value) {
            this.storage.setItem(key, JSON.stringify(value));
            return Promise.resolve();
        };
        BrowserPersistenceClass.prototype._get = function (key) {
            var json = this.storage.getItem(key);
            return Promise.resolve(json ? JSON.parse(json) : null);
        };
        BrowserPersistenceClass.prototype._remove = function (key) {
            this.storage.removeItem(key);
            return Promise.resolve();
        };
        return BrowserPersistenceClass;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _iframeCannotSyncWebStorage() {
        var ua = getUA();
        return _isSafari(ua) || _isIOS(ua);
    }
    // The polling period in case events are not supported
    var _POLLING_INTERVAL_MS = 1000;
    // The IE 10 localStorage cross tab synchronization delay in milliseconds
    var IE10_LOCAL_STORAGE_SYNC_DELAY = 10;
    var BrowserLocalPersistence = /** @class */ (function (_super) {
        __extends(BrowserLocalPersistence, _super);
        function BrowserLocalPersistence() {
            var _this = _super.call(this, localStorage, "LOCAL" /* LOCAL */) || this;
            _this.listeners = {};
            _this.localCache = {};
            // setTimeout return value is platform specific
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _this.pollTimer = null;
            // Safari or iOS browser and embedded in an iframe.
            _this.safariLocalStorageNotSynced = _iframeCannotSyncWebStorage() && _isIframe();
            // Whether to use polling instead of depending on window events
            _this.fallbackToPolling = _isMobileBrowser();
            _this.boundEventHandler = _this.onStorageEvent.bind(_this);
            return _this;
        }
        BrowserLocalPersistence.prototype.forAllChangedKeys = function (cb) {
            // Check all keys with listeners on them.
            for (var _i = 0, _a = Object.keys(this.listeners); _i < _a.length; _i++) {
                var key = _a[_i];
                // Get value from localStorage.
                var newValue = this.storage.getItem(key);
                var oldValue = this.localCache[key];
                // If local map value does not match, trigger listener with storage event.
                // Differentiate this simulated event from the real storage event.
                if (newValue !== oldValue) {
                    cb(key, oldValue, newValue);
                }
            }
        };
        BrowserLocalPersistence.prototype.onStorageEvent = function (event, poll) {
            var _this = this;
            if (poll === void 0) { poll = false; }
            // Key would be null in some situations, like when localStorage is cleared
            if (!event.key) {
                this.forAllChangedKeys(function (key, _oldValue, newValue) {
                    _this.notifyListeners(key, newValue);
                });
                return;
            }
            var key = event.key;
            // Ignore keys that have no listeners.
            if (!this.listeners[key]) {
                return;
            }
            // Check the mechanism how this event was detected.
            // The first event will dictate the mechanism to be used.
            if (poll) {
                // Environment detects storage changes via polling.
                // Remove storage event listener to prevent possible event duplication.
                this.detachListener();
            }
            else {
                // Environment detects storage changes via storage event listener.
                // Remove polling listener to prevent possible event duplication.
                this.stopPolling();
            }
            // Safari embedded iframe. Storage event will trigger with the delta
            // changes but no changes will be applied to the iframe localStorage.
            if (this.safariLocalStorageNotSynced) {
                // Get current iframe page value.
                var storedValue_1 = this.storage.getItem(key);
                // Value not synchronized, synchronize manually.
                if (event.newValue !== storedValue_1) {
                    if (event.newValue !== null) {
                        // Value changed from current value.
                        this.storage.setItem(key, event.newValue);
                    }
                    else {
                        // Current value deleted.
                        this.storage.removeItem(key);
                    }
                }
                else if (this.localCache[key] === event.newValue && !poll) {
                    // Already detected and processed, do not trigger listeners again.
                    return;
                }
            }
            var triggerListeners = function () {
                // Keep local map up to date in case storage event is triggered before
                // poll.
                var storedValue = _this.storage.getItem(key);
                if (!poll && _this.localCache[key] === storedValue) {
                    // Real storage event which has already been detected, do nothing.
                    // This seems to trigger in some IE browsers for some reason.
                    return;
                }
                _this.notifyListeners(key, storedValue);
            };
            var storedValue = this.storage.getItem(key);
            if (_isIE10() &&
                storedValue !== event.newValue &&
                event.newValue !== event.oldValue) {
                // IE 10 has this weird bug where a storage event would trigger with the
                // correct key, oldValue and newValue but localStorage.getItem(key) does
                // not yield the updated value until a few milliseconds. This ensures
                // this recovers from that situation.
                setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
            }
            else {
                triggerListeners();
            }
        };
        BrowserLocalPersistence.prototype.notifyListeners = function (key, value) {
            if (!this.listeners[key]) {
                return;
            }
            this.localCache[key] = value;
            for (var _i = 0, _a = Array.from(this.listeners[key]); _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(value ? JSON.parse(value) : value);
            }
        };
        BrowserLocalPersistence.prototype.startPolling = function () {
            var _this = this;
            this.stopPolling();
            this.pollTimer = setInterval(function () {
                _this.forAllChangedKeys(function (key, oldValue, newValue) {
                    _this.onStorageEvent(new StorageEvent('storage', {
                        key: key,
                        oldValue: oldValue,
                        newValue: newValue
                    }), 
                    /* poll */ true);
                });
            }, _POLLING_INTERVAL_MS);
        };
        BrowserLocalPersistence.prototype.stopPolling = function () {
            if (this.pollTimer) {
                clearInterval(this.pollTimer);
                this.pollTimer = null;
            }
        };
        BrowserLocalPersistence.prototype.attachListener = function () {
            window.addEventListener('storage', this.boundEventHandler);
        };
        BrowserLocalPersistence.prototype.detachListener = function () {
            window.removeEventListener('storage', this.boundEventHandler);
        };
        BrowserLocalPersistence.prototype._addListener = function (key, listener) {
            this.localCache[key] = this.storage.getItem(key);
            if (Object.keys(this.listeners).length === 0) {
                // Whether browser can detect storage event when it had already been pushed to the background.
                // This may happen in some mobile browsers. A localStorage change in the foreground window
                // will not be detected in the background window via the storage event.
                // This was detected in iOS 7.x mobile browsers
                if (this.fallbackToPolling) {
                    this.startPolling();
                }
                else {
                    this.attachListener();
                }
            }
            this.listeners[key] = this.listeners[key] || new Set();
            this.listeners[key].add(listener);
        };
        BrowserLocalPersistence.prototype._removeListener = function (key, listener) {
            if (this.listeners[key]) {
                this.listeners[key].delete(listener);
                if (this.listeners[key].size === 0) {
                    delete this.listeners[key];
                    delete this.localCache[key];
                }
            }
            if (Object.keys(this.listeners).length === 0) {
                this.detachListener();
                this.stopPolling();
            }
        };
        BrowserLocalPersistence.type = 'LOCAL';
        return BrowserLocalPersistence;
    }(BrowserPersistenceClass));
    /**
     * An implementation of {@link @firebase/auth-types#Persistence} of type 'LOCAL' using `localStorage`
     * for the underlying storage.
     *
     * @public
     */
    var browserLocalPersistence = BrowserLocalPersistence;

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Shim for Promise.allSettled, note the slightly different format of `fulfilled` vs `status`.
     *
     * @param promises - Array of promises to wait on.
     */
    function _allSettled(promises) {
        var _this = this;
        return Promise.all(promises.map(function (promise) { return __awaiter(_this, void 0, void 0, function () {
            var value, reason_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, promise];
                    case 1:
                        value = _a.sent();
                        return [2 /*return*/, {
                                fulfilled: true,
                                value: value
                            }];
                    case 2:
                        reason_1 = _a.sent();
                        return [2 /*return*/, {
                                fulfilled: false,
                                reason: reason_1
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        }); }));
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Interface class for receiving messages.
     *
     * @internal
     */
    var Receiver = /** @class */ (function () {
        function Receiver(eventTarget) {
            this.eventTarget = eventTarget;
            this.handlersMap = {};
            this.boundEventHandler = this.handleEvent.bind(this);
        }
        /**
         * Obtain an instance of a Receiver for a given event target, if none exists it will be created.
         *
         * @param eventTarget - An event target (such as window or self) through which the underlying
         * messages will be received.
         */
        Receiver._getInstance = function (eventTarget) {
            // The results are stored in an array since objects can't be keys for other
            // objects. In addition, setting a unique property on an event target as a
            // hash map key may not be allowed due to CORS restrictions.
            var existingInstance = this.receivers.find(function (receiver) {
                return receiver.isListeningto(eventTarget);
            });
            if (existingInstance) {
                return existingInstance;
            }
            var newInstance = new Receiver(eventTarget);
            this.receivers.push(newInstance);
            return newInstance;
        };
        Receiver.prototype.isListeningto = function (eventTarget) {
            return this.eventTarget === eventTarget;
        };
        /**
         * Fans out a MessageEvent to the appropriate listeners.
         *
         * @remarks
         * Sends an {@link Status.ACK} upon receipt and a {@link Status.DONE} once all handlers have
         * finished processing.
         *
         * @param event - The MessageEvent.
         *
         * @internal
         */
        Receiver.prototype.handleEvent = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var messageEvent, _a, eventId, eventType, data, handlers, promises, response;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            messageEvent = event;
                            _a = messageEvent.data, eventId = _a.eventId, eventType = _a.eventType, data = _a.data;
                            handlers = this.handlersMap[eventType];
                            if (!(handlers === null || handlers === void 0 ? void 0 : handlers.size)) {
                                return [2 /*return*/];
                            }
                            messageEvent.ports[0].postMessage({
                                status: "ack" /* ACK */,
                                eventId: eventId,
                                eventType: eventType
                            });
                            promises = Array.from(handlers).map(function (handler) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, handler(messageEvent.origin, data)];
                            }); }); });
                            return [4 /*yield*/, _allSettled(promises)];
                        case 1:
                            response = _b.sent();
                            messageEvent.ports[0].postMessage({
                                status: "done" /* DONE */,
                                eventId: eventId,
                                eventType: eventType,
                                response: response
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Subscribe an event handler for a particular event.
         *
         * @param eventType - Event name to subscribe to.
         * @param eventHandler - The event handler which should receive the events.
         *
         * @internal
         */
        Receiver.prototype._subscribe = function (eventType, eventHandler) {
            if (Object.keys(this.handlersMap).length === 0) {
                this.eventTarget.addEventListener('message', this.boundEventHandler);
            }
            if (!this.handlersMap[eventType]) {
                this.handlersMap[eventType] = new Set();
            }
            this.handlersMap[eventType].add(eventHandler);
        };
        /**
         * Unsubscribe an event handler from a particular event.
         *
         * @param eventType - Event name to unsubscribe from.
         * @param eventHandler - Optinoal event handler, if none provided, unsubscribe all handlers on this event.
         *
         * @internal
         */
        Receiver.prototype._unsubscribe = function (eventType, eventHandler) {
            if (this.handlersMap[eventType] && eventHandler) {
                this.handlersMap[eventType].delete(eventHandler);
            }
            if (!eventHandler || this.handlersMap[eventType].size === 0) {
                delete this.handlersMap[eventType];
            }
            if (Object.keys(this.handlersMap).length === 0) {
                this.eventTarget.removeEventListener('message', this.boundEventHandler);
            }
        };
        Receiver.receivers = [];
        return Receiver;
    }());

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function generateEventId(prefix, digits) {
        if (prefix === void 0) { prefix = ''; }
        if (digits === void 0) { digits = 20; }
        return "" + prefix + Math.floor(Math.random() * Math.pow(10, digits));
    }
    /**
     * Interface for sending messages and waiting for a completion response.
     *
     * @internal
     */
    var Sender = /** @class */ (function () {
        function Sender(target) {
            this.target = target;
            this.handlers = new Set();
        }
        /**
         * Unsubscribe the handler and remove it from our tracking Set.
         *
         * @param handler - The handler to unsubscribe.
         */
        Sender.prototype.removeMessageHandler = function (handler) {
            if (handler.messageChannel) {
                handler.messageChannel.port1.removeEventListener('message', handler.onMessage);
                handler.messageChannel.port1.close();
            }
            this.handlers.delete(handler);
        };
        /**
         * Send a message to the Receiver located at {@link target}.
         *
         * @remarks
         * We'll first wait a bit for an ACK , if we get one we will wait significantly longer until the
         * receiver has had a chance to fully process the event.
         *
         * @param eventType - Type of event to send.
         * @param data - The payload of the event.
         * @param timeout - Timeout for waiting on an ACK from the receiver.
         *
         * @returns An array of settled promises from all the handlers that were listening on the receiver.
         */
        Sender.prototype._send = function (eventType, data, timeout) {
            if (timeout === void 0) { timeout = 50 /* ACK */; }
            return __awaiter(this, void 0, void 0, function () {
                var messageChannel, completionTimer, handler;
                var _this = this;
                return __generator(this, function (_a) {
                    messageChannel = typeof MessageChannel !== 'undefined' ? new MessageChannel() : null;
                    if (!messageChannel) {
                        throw new Error("connection_unavailable" /* CONNECTION_UNAVAILABLE */);
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var eventId = generateEventId();
                            messageChannel.port1.start();
                            var ackTimer = setTimeout(function () {
                                reject(new Error("unsupported_event" /* UNSUPPORTED_EVENT */));
                            }, timeout);
                            handler = {
                                messageChannel: messageChannel,
                                onMessage: function (event) {
                                    var messageEvent = event;
                                    if (messageEvent.data.eventId !== eventId) {
                                        return;
                                    }
                                    switch (messageEvent.data.status) {
                                        case "ack" /* ACK */:
                                            // The receiver should ACK first.
                                            clearTimeout(ackTimer);
                                            completionTimer = setTimeout(function () {
                                                reject(new Error("timeout" /* TIMEOUT */));
                                            }, 3000 /* COMPLETION */);
                                            break;
                                        case "done" /* DONE */:
                                            // Once the receiver's handlers are finished we will get the results.
                                            clearTimeout(completionTimer);
                                            resolve(messageEvent.data.response);
                                            break;
                                        default:
                                            clearTimeout(ackTimer);
                                            clearTimeout(completionTimer);
                                            reject(new Error("invalid_response" /* INVALID_RESPONSE */));
                                            break;
                                    }
                                }
                            };
                            _this.handlers.add(handler);
                            messageChannel.port1.addEventListener('message', handler.onMessage);
                            _this.target.postMessage({
                                eventType: eventType,
                                eventId: eventId,
                                data: data
                            }, [messageChannel.port2]);
                        }).finally(function () {
                            if (handler) {
                                _this.removeMessageHandler(handler);
                            }
                        })];
                });
            });
        };
        return Sender;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Lazy accessor for window, since the compat layer won't tree shake this out,
     * we need to make sure not to mess with window unless we have to
     */
    function _window() {
        return window;
    }
    function _setWindowLocation(url) {
        _window().location.href = url;
    }

    /**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _isWorker() {
        return (typeof _window()['WorkerGlobalScope'] !== 'undefined' &&
            typeof _window()['importScripts'] === 'function');
    }
    function _getActiveServiceWorker() {
        return __awaiter(this, void 0, void 0, function () {
            var registration, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) {
                            return [2 /*return*/, null];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.serviceWorker.ready];
                    case 2:
                        registration = _b.sent();
                        return [2 /*return*/, registration.active];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function _getServiceWorkerController() {
        var _a;
        return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
    }
    function _getWorkerGlobalScope() {
        return _isWorker() ? self : null;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var DB_NAME = 'firebaseLocalStorageDb';
    var DB_VERSION = 1;
    var DB_OBJECTSTORE_NAME = 'firebaseLocalStorage';
    var DB_DATA_KEYPATH = 'fbase_key';
    /**
     * Promise wrapper for IDBRequest
     *
     * Unfortunately we can't cleanly extend Promise<T> since promises are not callable in ES6
     *
     * @internal
     */
    var DBPromise = /** @class */ (function () {
        function DBPromise(request) {
            this.request = request;
        }
        DBPromise.prototype.toPromise = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.request.addEventListener('success', function () {
                    resolve(_this.request.result);
                });
                _this.request.addEventListener('error', function () {
                    reject(_this.request.error);
                });
            });
        };
        return DBPromise;
    }());
    function getObjectStore(db, isReadWrite) {
        return db
            .transaction([DB_OBJECTSTORE_NAME], isReadWrite ? 'readwrite' : 'readonly')
            .objectStore(DB_OBJECTSTORE_NAME);
    }
    /** @internal */
    function _deleteDatabase() {
        var request = indexedDB.deleteDatabase(DB_NAME);
        return new DBPromise(request).toPromise();
    }
    /** @internal */
    function _openDatabase() {
        var _this = this;
        var request = indexedDB.open(DB_NAME, DB_VERSION);
        return new Promise(function (resolve, reject) {
            request.addEventListener('error', function () {
                reject(request.error);
            });
            request.addEventListener('upgradeneeded', function () {
                var db = request.result;
                try {
                    db.createObjectStore(DB_OBJECTSTORE_NAME, { keyPath: DB_DATA_KEYPATH });
                }
                catch (e) {
                    reject(e);
                }
            });
            request.addEventListener('success', function () { return __awaiter(_this, void 0, void 0, function () {
                var db;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            db = request.result;
                            if (!!db.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) return [3 /*break*/, 2];
                            return [4 /*yield*/, _deleteDatabase()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, _openDatabase()];
                        case 2:
                            resolve(db);
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        });
    }
    /** @internal */
    function _putObject(db, key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var getRequest, data, request, request;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        getRequest = getObjectStore(db, false).get(key);
                        return [4 /*yield*/, new DBPromise(getRequest).toPromise()];
                    case 1:
                        data = _b.sent();
                        if (data) {
                            // Force an index signature on the user object
                            data.value = value;
                            request = getObjectStore(db, true).put(data);
                            return [2 /*return*/, new DBPromise(request).toPromise()];
                        }
                        else {
                            request = getObjectStore(db, true).add((_a = {},
                                _a[DB_DATA_KEYPATH] = key,
                                _a.value = value,
                                _a));
                            return [2 /*return*/, new DBPromise(request).toPromise()];
                        }
                }
            });
        });
    }
    function getObject(db, key) {
        return __awaiter(this, void 0, void 0, function () {
            var request, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = getObjectStore(db, false).get(key);
                        return [4 /*yield*/, new DBPromise(request).toPromise()];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data === undefined ? null : data.value];
                }
            });
        });
    }
    function deleteObject(db, key) {
        var request = getObjectStore(db, true).delete(key);
        return new DBPromise(request).toPromise();
    }
    /** @internal */
    var _POLLING_INTERVAL_MS$1 = 800;
    /** @internal */
    var _TRANSACTION_RETRY_COUNT = 3;
    var IndexedDBLocalPersistence = /** @class */ (function () {
        function IndexedDBLocalPersistence() {
            this.type = "LOCAL" /* LOCAL */;
            this.listeners = {};
            this.localCache = {};
            // setTimeout return value is platform specific
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.pollTimer = null;
            this.pendingWrites = 0;
            this.receiver = null;
            this.sender = null;
            this.serviceWorkerReceiverAvailable = false;
            this.activeServiceWorker = null;
            // Fire & forget the service worker registration as it may never resolve
            this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(function () { }, function () { });
        }
        IndexedDBLocalPersistence.prototype._openDb = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.db) {
                                return [2 /*return*/, this.db];
                            }
                            _a = this;
                            return [4 /*yield*/, _openDatabase()];
                        case 1:
                            _a.db = _b.sent();
                            return [2 /*return*/, this.db];
                    }
                });
            });
        };
        IndexedDBLocalPersistence.prototype._withRetries = function (op) {
            return __awaiter(this, void 0, void 0, function () {
                var numAttempts, db, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            numAttempts = 0;
                            _a.label = 1;
                        case 1:
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            return [4 /*yield*/, this._openDb()];
                        case 3:
                            db = _a.sent();
                            return [4 /*yield*/, op(db)];
                        case 4: return [2 /*return*/, _a.sent()];
                        case 5:
                            e_1 = _a.sent();
                            if (numAttempts++ > _TRANSACTION_RETRY_COUNT) {
                                throw e_1;
                            }
                            if (this.db) {
                                this.db.close();
                                this.db = undefined;
                            }
                            return [3 /*break*/, 6];
                        case 6: return [3 /*break*/, 1];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * IndexedDB events do not propagate from the main window to the worker context.  We rely on a
         * postMessage interface to send these events to the worker ourselves.
         */
        IndexedDBLocalPersistence.prototype.initializeServiceWorkerMessaging = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, _isWorker() ? this.initializeReceiver() : this.initializeSender()];
                });
            });
        };
        /**
         * As the worker we should listen to events from the main window.
         */
        IndexedDBLocalPersistence.prototype.initializeReceiver = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.receiver = Receiver._getInstance(_getWorkerGlobalScope());
                    // Refresh from persistence if we receive a KeyChanged message.
                    this.receiver._subscribe("keyChanged" /* KEY_CHANGED */, function (_origin, data) { return __awaiter(_this, void 0, void 0, function () {
                        var keys;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this._poll()];
                                case 1:
                                    keys = _a.sent();
                                    return [2 /*return*/, {
                                            keyProcessed: keys.includes(data.key)
                                        }];
                            }
                        });
                    }); });
                    // Let the sender know that we are listening so they give us more timeout.
                    this.receiver._subscribe("ping" /* PING */, function (_origin, _data) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, ["keyChanged" /* KEY_CHANGED */]];
                        });
                    }); });
                    return [2 /*return*/];
                });
            });
        };
        /**
         * As the main window, we should let the worker know when keys change (set and remove).
         *
         * @remarks
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready | ServiceWorkerContainer.ready}
         * may not resolve.
         */
        IndexedDBLocalPersistence.prototype.initializeSender = function () {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var _c, results;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            // Check to see if there's an active service worker.
                            _c = this;
                            return [4 /*yield*/, _getActiveServiceWorker()];
                        case 1:
                            // Check to see if there's an active service worker.
                            _c.activeServiceWorker = _d.sent();
                            if (!this.activeServiceWorker) {
                                return [2 /*return*/];
                            }
                            this.sender = new Sender(this.activeServiceWorker);
                            return [4 /*yield*/, this.sender._send("ping" /* PING */, {}, 800 /* LONG_ACK */)];
                        case 2:
                            results = _d.sent();
                            if (!results) {
                                return [2 /*return*/];
                            }
                            if (((_a = results[0]) === null || _a === void 0 ? void 0 : _a.fulfilled) && ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged" /* KEY_CHANGED */))) {
                                this.serviceWorkerReceiverAvailable = true;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Let the worker know about a changed key, the exact key doesn't technically matter since the
         * worker will just trigger a full sync anyway.
         *
         * @remarks
         * For now, we only support one service worker per page.
         *
         * @param key - Storage key which changed.
         */
        IndexedDBLocalPersistence.prototype.notifyServiceWorker = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.sender ||
                                !this.activeServiceWorker ||
                                _getServiceWorkerController() !== this.activeServiceWorker) {
                                return [2 /*return*/];
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.sender._send("keyChanged" /* KEY_CHANGED */, { key: key }, 
                                // Use long timeout if receiver has previously responded to a ping from us.
                                this.serviceWorkerReceiverAvailable
                                    ? 800 /* LONG_ACK */
                                    : 50 /* ACK */)];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a = _b.sent();
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        IndexedDBLocalPersistence.prototype._isAvailable = function () {
            return __awaiter(this, void 0, void 0, function () {
                var db, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            if (!indexedDB) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, _openDatabase()];
                        case 1:
                            db = _b.sent();
                            return [4 /*yield*/, _putObject(db, STORAGE_AVAILABLE_KEY, '1')];
                        case 2:
                            _b.sent();
                            return [4 /*yield*/, deleteObject(db, STORAGE_AVAILABLE_KEY)];
                        case 3:
                            _b.sent();
                            return [2 /*return*/, true];
                        case 4:
                            _a = _b.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, false];
                    }
                });
            });
        };
        IndexedDBLocalPersistence.prototype._withPendingWrite = function (write) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.pendingWrites++;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            return [4 /*yield*/, write()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            this.pendingWrites--;
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        IndexedDBLocalPersistence.prototype._set = function (key, value) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._withPendingWrite(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._withRetries(function (db) { return _putObject(db, key, value); })];
                                    case 1:
                                        _a.sent();
                                        this.localCache[key] = value;
                                        return [2 /*return*/, this.notifyServiceWorker(key)];
                                }
                            });
                        }); })];
                });
            });
        };
        IndexedDBLocalPersistence.prototype._get = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._withRetries(function (db) {
                                return getObject(db, key);
                            })];
                        case 1:
                            obj = (_a.sent());
                            this.localCache[key] = obj;
                            return [2 /*return*/, obj];
                    }
                });
            });
        };
        IndexedDBLocalPersistence.prototype._remove = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._withPendingWrite(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._withRetries(function (db) { return deleteObject(db, key); })];
                                    case 1:
                                        _a.sent();
                                        delete this.localCache[key];
                                        return [2 /*return*/, this.notifyServiceWorker(key)];
                                }
                            });
                        }); })];
                });
            });
        };
        IndexedDBLocalPersistence.prototype._poll = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result, keys, _i, result_1, _a, key, value;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this._withRetries(function (db) {
                                var getAllRequest = getObjectStore(db, false).getAll();
                                return new DBPromise(getAllRequest).toPromise();
                            })];
                        case 1:
                            result = _b.sent();
                            if (!result) {
                                return [2 /*return*/, []];
                            }
                            // If we have pending writes in progress abort, we'll get picked up on the next poll
                            if (this.pendingWrites !== 0) {
                                return [2 /*return*/, []];
                            }
                            keys = [];
                            for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                                _a = result_1[_i], key = _a.fbase_key, value = _a.value;
                                if (JSON.stringify(this.localCache[key]) !== JSON.stringify(value)) {
                                    this.notifyListeners(key, value);
                                    keys.push(key);
                                }
                            }
                            return [2 /*return*/, keys];
                    }
                });
            });
        };
        IndexedDBLocalPersistence.prototype.notifyListeners = function (key, newValue) {
            if (!this.listeners[key]) {
                return;
            }
            this.localCache[key] = newValue;
            for (var _i = 0, _a = Array.from(this.listeners[key]); _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(newValue);
            }
        };
        IndexedDBLocalPersistence.prototype.startPolling = function () {
            var _this = this;
            this.stopPolling();
            this.pollTimer = setInterval(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this._poll()];
            }); }); }, _POLLING_INTERVAL_MS$1);
        };
        IndexedDBLocalPersistence.prototype.stopPolling = function () {
            if (this.pollTimer) {
                clearInterval(this.pollTimer);
                this.pollTimer = null;
            }
        };
        IndexedDBLocalPersistence.prototype._addListener = function (key, listener) {
            if (Object.keys(this.listeners).length === 0) {
                this.startPolling();
            }
            this.listeners[key] = this.listeners[key] || new Set();
            this.listeners[key].add(listener);
        };
        IndexedDBLocalPersistence.prototype._removeListener = function (key, listener) {
            if (this.listeners[key]) {
                this.listeners[key].delete(listener);
                if (this.listeners[key].size === 0) {
                    delete this.listeners[key];
                    delete this.localCache[key];
                }
            }
            if (Object.keys(this.listeners).length === 0) {
                this.stopPolling();
            }
        };
        IndexedDBLocalPersistence.type = 'LOCAL';
        return IndexedDBLocalPersistence;
    }());
    /**
     * An implementation of {@link @firebase/auth-types#Persistence} of type 'LOCAL' using `indexedDB`
     * for the underlying storage.
     *
     * @public
     */
    var indexedDBLocalPersistence = IndexedDBLocalPersistence;

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // The amount of time to store the UIDs of seen events; this is
    // set to 10 min by default
    var EVENT_DUPLICATION_CACHE_DURATION_MS = 10 * 60 * 1000;
    var AuthEventManager = /** @class */ (function () {
        function AuthEventManager(auth) {
            this.auth = auth;
            this.cachedEventUids = new Set();
            this.consumers = new Set();
            this.queuedRedirectEvent = null;
            this.hasHandledPotentialRedirect = false;
            this.lastProcessedEventTime = Date.now();
        }
        AuthEventManager.prototype.registerConsumer = function (authEventConsumer) {
            this.consumers.add(authEventConsumer);
            if (this.queuedRedirectEvent &&
                this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
                this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
                this.saveEventToCache(this.queuedRedirectEvent);
                this.queuedRedirectEvent = null;
            }
        };
        AuthEventManager.prototype.unregisterConsumer = function (authEventConsumer) {
            this.consumers.delete(authEventConsumer);
        };
        AuthEventManager.prototype.onEvent = function (event) {
            var _this = this;
            // Check if the event has already been handled
            if (this.hasEventBeenHandled(event)) {
                return false;
            }
            var handled = false;
            this.consumers.forEach(function (consumer) {
                if (_this.isEventForConsumer(event, consumer)) {
                    handled = true;
                    _this.sendToConsumer(event, consumer);
                    _this.saveEventToCache(event);
                }
            });
            if (this.hasHandledPotentialRedirect || !isRedirectEvent(event)) {
                // If we've already seen a redirect before, or this is a popup event,
                // bail now
                return handled;
            }
            this.hasHandledPotentialRedirect = true;
            // If the redirect wasn't handled, hang on to it
            if (!handled) {
                this.queuedRedirectEvent = event;
                handled = true;
            }
            return handled;
        };
        AuthEventManager.prototype.sendToConsumer = function (event, consumer) {
            var _a;
            if (event.error && !isNullRedirectEvent(event)) {
                var code = ((_a = event.error.code) === null || _a === void 0 ? void 0 : _a.split('auth/')[1]) ||
                    "internal-error" /* INTERNAL_ERROR */;
                consumer.onError(_createError(this.auth, code));
            }
            else {
                consumer.onAuthEvent(event);
            }
        };
        AuthEventManager.prototype.isEventForConsumer = function (event, consumer) {
            var eventIdMatches = consumer.eventId === null ||
                (!!event.eventId && event.eventId === consumer.eventId);
            return consumer.filter.includes(event.type) && eventIdMatches;
        };
        AuthEventManager.prototype.hasEventBeenHandled = function (event) {
            if (Date.now() - this.lastProcessedEventTime >=
                EVENT_DUPLICATION_CACHE_DURATION_MS) {
                this.cachedEventUids.clear();
            }
            return this.cachedEventUids.has(eventUid(event));
        };
        AuthEventManager.prototype.saveEventToCache = function (event) {
            this.cachedEventUids.add(eventUid(event));
            this.lastProcessedEventTime = Date.now();
        };
        return AuthEventManager;
    }());
    function eventUid(e) {
        return [e.type, e.eventId, e.sessionId, e.tenantId].filter(function (v) { return v; }).join('-');
    }
    function isNullRedirectEvent(_a) {
        var type = _a.type, error = _a.error;
        return (type === "unknown" /* UNKNOWN */ &&
            (error === null || error === void 0 ? void 0 : error.code) === "auth/" + "no-auth-event" /* NO_AUTH_EVENT */);
    }
    function isRedirectEvent(event) {
        switch (event.type) {
            case "signInViaRedirect" /* SIGN_IN_VIA_REDIRECT */:
            case "linkViaRedirect" /* LINK_VIA_REDIRECT */:
            case "reauthViaRedirect" /* REAUTH_VIA_REDIRECT */:
                return true;
            case "unknown" /* UNKNOWN */:
                return isNullRedirectEvent(event);
            default:
                return false;
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _generateEventId(prefix) {
        return "" + (prefix ? prefix : '') + Math.floor(Math.random() * 1000000000);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function _getProjectConfig(auth) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _performApiRequest(auth, "GET" /* GET */, "/v1/projects" /* GET_PROJECT_CONFIG */, {})];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    var HTTP_REGEX = /^https?/;
    function _validateOrigin(auth) {
        return __awaiter(this, void 0, void 0, function () {
            var authorizedDomains, _i, authorizedDomains_1, domain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Skip origin validation if we are in an emulated environment
                        if (auth.config.emulator) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, _getProjectConfig(auth)];
                    case 1:
                        authorizedDomains = (_a.sent()).authorizedDomains;
                        for (_i = 0, authorizedDomains_1 = authorizedDomains; _i < authorizedDomains_1.length; _i++) {
                            domain = authorizedDomains_1[_i];
                            try {
                                if (matchDomain(domain)) {
                                    return [2 /*return*/];
                                }
                            }
                            catch (_b) {
                                // Do nothing if there's a URL error; just continue searching
                            }
                        }
                        // In the old SDK, this error also provides helpful messages.
                        _fail(auth, "unauthorized-domain" /* INVALID_ORIGIN */);
                        return [2 /*return*/];
                }
            });
        });
    }
    function matchDomain(expected) {
        var currentUrl = _getCurrentUrl();
        var _a = new URL(currentUrl), protocol = _a.protocol, hostname = _a.hostname;
        if (expected.startsWith('chrome-extension://')) {
            var ceUrl = new URL(expected);
            if (ceUrl.hostname === '' && hostname === '') {
                // For some reason we're not parsing chrome URLs properly
                return (protocol === 'chrome-extension:' &&
                    expected.replace('chrome-extension://', '') ===
                        currentUrl.replace('chrome-extension://', ''));
            }
            return protocol === 'chrome-extension:' && ceUrl.hostname === hostname;
        }
        if (!HTTP_REGEX.test(protocol)) {
            return false;
        }
        if (IP_ADDRESS_REGEX.test(expected)) {
            // The domain has to be exactly equal to the pattern, as an IP domain will
            // only contain the IP, no extra character.
            return hostname === expected;
        }
        // Dots in pattern should be escaped.
        var escapedDomainPattern = expected.replace(/\./g, '\\.');
        // Non ip address domains.
        // domain.com = *.domain.com OR domain.com
        var re = new RegExp('^(.+\\.' + escapedDomainPattern + '|' + escapedDomainPattern + ')$', 'i');
        return re.test(hostname);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function getScriptParentElement() {
        var _a, _b;
        return (_b = (_a = document.getElementsByTagName('head')) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
    }
    function _loadJS(url) {
        // TODO: consider adding timeout support & cancellation
        return new Promise(function (resolve, reject) {
            var el = document.createElement('script');
            el.setAttribute('src', url);
            el.onload = resolve;
            el.onerror = reject;
            el.type = 'text/javascript';
            el.charset = 'UTF-8';
            getScriptParentElement().appendChild(el);
        });
    }
    function _generateCallbackName(prefix) {
        return "__" + prefix + Math.floor(Math.random() * 1000000);
    }

    /**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var NETWORK_TIMEOUT = new Delay(30000, 60000);
    /**
     * Reset unlaoded GApi modules. If gapi.load fails due to a network error,
     * it will stop working after a retrial. This is a hack to fix this issue.
     */
    function resetUnloadedGapiModules() {
        // Clear last failed gapi.load state to force next gapi.load to first
        // load the failed gapi.iframes module.
        // Get gapix.beacon context.
        var beacon = _window().___jsl;
        // Get current hint.
        if (beacon === null || beacon === void 0 ? void 0 : beacon.H) {
            // Get gapi hint.
            for (var _i = 0, _a = Object.keys(beacon.H); _i < _a.length; _i++) {
                var hint = _a[_i];
                // Requested modules.
                beacon.H[hint].r = beacon.H[hint].r || [];
                // Loaded modules.
                beacon.H[hint].L = beacon.H[hint].L || [];
                // Set requested modules to a copy of the loaded modules.
                beacon.H[hint].r = __spreadArrays(beacon.H[hint].L);
                // Clear pending callbacks.
                if (beacon.CP) {
                    for (var i = 0; i < beacon.CP.length; i++) {
                        // Remove all failed pending callbacks.
                        beacon.CP[i] = null;
                    }
                }
            }
        }
    }
    function loadGapi(auth) {
        return new Promise(function (resolve, reject) {
            var _a, _b, _c;
            // Function to run when gapi.load is ready.
            function loadGapiIframe() {
                // The developer may have tried to previously run gapi.load and failed.
                // Run this to fix that.
                resetUnloadedGapiModules();
                gapi.load('gapi.iframes', {
                    callback: function () {
                        resolve(gapi.iframes.getContext());
                    },
                    ontimeout: function () {
                        // The above reset may be sufficient, but having this reset after
                        // failure ensures that if the developer calls gapi.load after the
                        // connection is re-established and before another attempt to embed
                        // the iframe, it would work and would not be broken because of our
                        // failed attempt.
                        // Timeout when gapi.iframes.Iframe not loaded.
                        resetUnloadedGapiModules();
                        reject(_createError(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */));
                    },
                    timeout: NETWORK_TIMEOUT.get()
                });
            }
            if ((_b = (_a = _window().gapi) === null || _a === void 0 ? void 0 : _a.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) {
                // If gapi.iframes.Iframe available, resolve.
                resolve(gapi.iframes.getContext());
            }
            else if (!!((_c = _window().gapi) === null || _c === void 0 ? void 0 : _c.load)) {
                // Gapi loader ready, load gapi.iframes.
                loadGapiIframe();
            }
            else {
                // Create a new iframe callback when this is called so as not to overwrite
                // any previous defined callback. This happens if this method is called
                // multiple times in parallel and could result in the later callback
                // overwriting the previous one. This would end up with a iframe
                // timeout.
                var cbName = _generateCallbackName('iframefcb');
                // GApi loader not available, dynamically load platform.js.
                _window()[cbName] = function () {
                    // GApi loader should be ready.
                    if (!!gapi.load) {
                        loadGapiIframe();
                    }
                    else {
                        // Gapi loader failed, throw error.
                        reject(_createError(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */));
                    }
                };
                // Load GApi loader.
                return _loadJS("https://apis.google.com/js/api.js?onload=" + cbName);
            }
        }).catch(function (error) {
            // Reset cached promise to allow for retrial.
            cachedGApiLoader = null;
            throw error;
        });
    }
    var cachedGApiLoader = null;
    function _loadGapi(auth) {
        cachedGApiLoader = cachedGApiLoader || loadGapi(auth);
        return cachedGApiLoader;
    }

    /**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var PING_TIMEOUT = new Delay(5000, 15000);
    var IFRAME_PATH = '__/auth/iframe';
    var EMULATED_IFRAME_PATH = 'emulator/auth/iframe';
    var IFRAME_ATTRIBUTES = {
        style: {
            position: 'absolute',
            top: '-100px',
            width: '1px',
            height: '1px'
        }
    };
    function getIframeUrl(auth) {
        var config = auth.config;
        _assert(config.authDomain, auth, "auth-domain-config-required" /* MISSING_AUTH_DOMAIN */);
        var url = config.emulator
            ? _emulatorUrl(config, EMULATED_IFRAME_PATH)
            : "https://" + auth.config.authDomain + "/" + IFRAME_PATH;
        var params = {
            apiKey: config.apiKey,
            appName: auth.name,
            v: app.SDK_VERSION
        };
        // Can pass 'eid' as one of 'p' (production), 's' (staging), or 't' (test)
        // TODO: do we care about frameworks? pass them as fw=
        return url + "?" + querystring(params).slice(1);
    }
    function _openIframe(auth) {
        return __awaiter(this, void 0, void 0, function () {
            var context, gapi;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _loadGapi(auth)];
                    case 1:
                        context = _a.sent();
                        gapi = _window().gapi;
                        _assert(gapi, auth, "internal-error" /* INTERNAL_ERROR */);
                        return [2 /*return*/, context.open({
                                where: document.body,
                                url: getIframeUrl(auth),
                                messageHandlersFilter: gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
                                attributes: IFRAME_ATTRIBUTES,
                                dontclear: true
                            }, function (iframe) {
                                return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                    // Clear timer and resolve pending iframe ready promise.
                                    function clearTimerAndResolve() {
                                        _window().clearTimeout(networkErrorTimer);
                                        resolve(iframe);
                                    }
                                    var networkError, networkErrorTimer;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, iframe.restyle({
                                                    // Prevent iframe from closing on mouse out.
                                                    setHideOnLeave: false
                                                })];
                                            case 1:
                                                _a.sent();
                                                networkError = _createError(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */);
                                                networkErrorTimer = _window().setTimeout(function () {
                                                    reject(networkError);
                                                }, PING_TIMEOUT.get());
                                                // This returns an IThenable. However the reject part does not call
                                                // when the iframe is not loaded.
                                                iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, function () {
                                                    reject(networkError);
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            })];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var BrowserSessionPersistence = /** @class */ (function (_super) {
        __extends(BrowserSessionPersistence, _super);
        function BrowserSessionPersistence() {
            return _super.call(this, sessionStorage, "SESSION" /* SESSION */) || this;
        }
        BrowserSessionPersistence.prototype._addListener = function (_key, _listener) {
            // Listeners are not supported for session storage since it cannot be shared across windows
            return;
        };
        BrowserSessionPersistence.prototype._removeListener = function (_key, _listener) {
            // Listeners are not supported for session storage since it cannot be shared across windows
            return;
        };
        BrowserSessionPersistence.type = 'SESSION';
        return BrowserSessionPersistence;
    }(BrowserPersistenceClass));
    /**
     * An implementation of {@link @firebase/auth-types#Persistence} of 'SESSION' using `sessionStorage`
     * for the underlying storage.
     *
     * @public
     */
    var browserSessionPersistence = BrowserSessionPersistence;

    /**
     * @license
     * Copyright 2020 Google LLC.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var BASE_POPUP_OPTIONS = {
        location: 'yes',
        resizable: 'yes',
        statusbar: 'yes',
        toolbar: 'no'
    };
    var DEFAULT_WIDTH = 500;
    var DEFAULT_HEIGHT = 600;
    var TARGET_BLANK = '_blank';
    var FIREFOX_EMPTY_URL = 'http://localhost';
    var AuthPopup = /** @class */ (function () {
        function AuthPopup(window) {
            this.window = window;
            this.associatedEvent = null;
        }
        AuthPopup.prototype.close = function () {
            if (this.window) {
                try {
                    this.window.close();
                }
                catch (e) { }
            }
        };
        return AuthPopup;
    }());
    function _open(auth, url, name, width, height) {
        if (width === void 0) { width = DEFAULT_WIDTH; }
        if (height === void 0) { height = DEFAULT_HEIGHT; }
        var top = Math.min((window.screen.availHeight - height) / 2, 0).toString();
        var left = Math.min((window.screen.availWidth - width) / 2, 0).toString();
        var target = '';
        var options = __assign(__assign({}, BASE_POPUP_OPTIONS), { width: width.toString(), height: height.toString(), top: top,
            left: left });
        // Chrome iOS 7 and 8 is returning an undefined popup win when target is
        // specified, even though the popup is not necessarily blocked.
        var ua = getUA().toLowerCase();
        if (name) {
            target = _isChromeIOS(ua) ? TARGET_BLANK : name;
        }
        if (_isFirefox(ua)) {
            // Firefox complains when invalid URLs are popped out. Hacky way to bypass.
            url = url || FIREFOX_EMPTY_URL;
            // Firefox disables by default scrolling on popup windows, which can create
            // issues when the user has many Google accounts, for instance.
            options.scrollbars = 'yes';
        }
        var optionsString = Object.entries(options).reduce(function (accum, _a) {
            var key = _a[0], value = _a[1];
            return "" + accum + key + "=" + value + ",";
        }, '');
        if (_isIOSStandalone(ua) && target !== '_self') {
            openAsNewWindowIOS(url || '', target);
            return new AuthPopup(null);
        }
        // about:blank getting sanitized causing browsers like IE/Edge to display
        // brief error message before redirecting to handler.
        var newWin = window.open(url || '', target, optionsString);
        _assert(newWin, auth, "popup-blocked" /* POPUP_BLOCKED */);
        // Flaky on IE edge, encapsulate with a try and catch.
        try {
            newWin.focus();
        }
        catch (e) { }
        return new AuthPopup(newWin);
    }
    function openAsNewWindowIOS(url, target) {
        var el = document.createElement('a');
        el.href = url;
        el.target = target;
        var click = document.createEvent('MouseEvent');
        click.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
        el.dispatchEvent(click);
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** @internal */
    var IdpCredential = /** @class */ (function (_super) {
        __extends(IdpCredential, _super);
        function IdpCredential(params) {
            var _this = _super.call(this, "custom" /* CUSTOM */, "custom" /* CUSTOM */) || this;
            _this.params = params;
            return _this;
        }
        IdpCredential.prototype._getIdTokenResponse = function (auth) {
            return signInWithIdp(auth, this._buildIdpRequest());
        };
        IdpCredential.prototype._linkToIdToken = function (auth, idToken) {
            return signInWithIdp(auth, this._buildIdpRequest(idToken));
        };
        IdpCredential.prototype._getReauthenticationResolver = function (auth) {
            return signInWithIdp(auth, this._buildIdpRequest());
        };
        IdpCredential.prototype._buildIdpRequest = function (idToken) {
            var request = {
                requestUri: this.params.requestUri,
                sessionId: this.params.sessionId,
                postBody: this.params.postBody || null,
                tenantId: this.params.tenantId,
                pendingToken: this.params.pendingToken,
                returnSecureToken: true
            };
            if (idToken) {
                request.idToken = idToken;
            }
            return request;
        };
        return IdpCredential;
    }(AuthCredential));
    /** @internal */
    function _signIn(params) {
        return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
    }
    /** @internal */
    function _reauth(params) {
        var auth = params.auth, user = params.user;
        _assert(user, auth, "internal-error" /* INTERNAL_ERROR */);
        return _reauthenticate(user, new IdpCredential(params), params.bypassAuthState);
    }
    /** @internal */
    function _link$1(params) {
        return __awaiter(this, void 0, void 0, function () {
            var auth, user;
            return __generator(this, function (_a) {
                auth = params.auth, user = params.user;
                _assert(user, auth, "internal-error" /* INTERNAL_ERROR */);
                return [2 /*return*/, _link(user, new IdpCredential(params), params.bypassAuthState)];
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Popup event manager. Handles the popup's entire lifecycle; listens to auth
     * events
     */
    var AbstractPopupRedirectOperation = /** @class */ (function () {
        function AbstractPopupRedirectOperation(auth, filter, resolver, user, bypassAuthState) {
            if (bypassAuthState === void 0) { bypassAuthState = false; }
            this.auth = auth;
            this.resolver = resolver;
            this.user = user;
            this.bypassAuthState = bypassAuthState;
            this.pendingPromise = null;
            this.eventManager = null;
            this.filter = Array.isArray(filter) ? filter : [filter];
        }
        AbstractPopupRedirectOperation.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var _a, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.pendingPromise = { resolve: resolve, reject: reject };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            _a = this;
                            return [4 /*yield*/, this.resolver._initialize(this.auth)];
                        case 2:
                            _a.eventManager = _b.sent();
                            return [4 /*yield*/, this.onExecution()];
                        case 3:
                            _b.sent();
                            this.eventManager.registerConsumer(this);
                            return [3 /*break*/, 5];
                        case 4:
                            e_1 = _b.sent();
                            this.reject(e_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
        };
        AbstractPopupRedirectOperation.prototype.onAuthEvent = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var urlResponse, sessionId, postBody, tenantId, error, type, params, _a, e_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            urlResponse = event.urlResponse, sessionId = event.sessionId, postBody = event.postBody, tenantId = event.tenantId, error = event.error, type = event.type;
                            if (error) {
                                this.reject(error);
                                return [2 /*return*/];
                            }
                            params = {
                                auth: this.auth,
                                requestUri: urlResponse,
                                sessionId: sessionId,
                                tenantId: tenantId || undefined,
                                postBody: postBody || undefined,
                                user: this.user,
                                bypassAuthState: this.bypassAuthState
                            };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            _a = this.resolve;
                            return [4 /*yield*/, this.getIdpTask(type)(params)];
                        case 2:
                            _a.apply(this, [_b.sent()]);
                            return [3 /*break*/, 4];
                        case 3:
                            e_2 = _b.sent();
                            this.reject(e_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AbstractPopupRedirectOperation.prototype.onError = function (error) {
            this.reject(error);
        };
        AbstractPopupRedirectOperation.prototype.getIdpTask = function (type) {
            switch (type) {
                case "signInViaPopup" /* SIGN_IN_VIA_POPUP */:
                case "signInViaRedirect" /* SIGN_IN_VIA_REDIRECT */:
                    return _signIn;
                case "linkViaPopup" /* LINK_VIA_POPUP */:
                case "linkViaRedirect" /* LINK_VIA_REDIRECT */:
                    return _link$1;
                case "reauthViaPopup" /* REAUTH_VIA_POPUP */:
                case "reauthViaRedirect" /* REAUTH_VIA_REDIRECT */:
                    return _reauth;
                default:
                    _fail(this.auth, "internal-error" /* INTERNAL_ERROR */);
            }
        };
        AbstractPopupRedirectOperation.prototype.resolve = function (cred) {
            debugAssert(this.pendingPromise, 'Pending promise was never set');
            this.pendingPromise.resolve(cred);
            this.unregisterAndCleanUp();
        };
        AbstractPopupRedirectOperation.prototype.reject = function (error) {
            debugAssert(this.pendingPromise, 'Pending promise was never set');
            this.pendingPromise.reject(error);
            this.unregisterAndCleanUp();
        };
        AbstractPopupRedirectOperation.prototype.unregisterAndCleanUp = function () {
            if (this.eventManager) {
                this.eventManager.unregisterConsumer(this);
            }
            this.pendingPromise = null;
            this.cleanUp();
        };
        return AbstractPopupRedirectOperation;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Authenticates a Firebase client using a full-page redirect flow.
     *
     * @remarks
     * To handle the results and errors for this operation, refer to {@link getRedirectResult}.
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new FacebookAuthProvider();
     * // You can add additional scopes to the provider:
     * provider.addScope('user_birthday');
     * // Start a sign in process for an unauthenticated user.
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a Facebook Access Token.
     *   const credential = provider.credentialFromResult(auth, result);
     *   const token = credential.accessToken;
     * }
     * // As this API can be used for sign-in, linking and reauthentication,
     * // check the operationType to determine what triggered this redirect
     * // operation.
     * const operationType = result.operationType;
     * ```
     *
     * @param auth - The Auth instance.
     * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
     * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
     * @param resolver - An instance of {@link @firebase/auth-types#PopupRedirectResolver}, optional
     * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
     *
     * @public
     */
    function signInWithRedirect(auth, provider, resolver) {
        return __awaiter(this, void 0, void 0, function () {
            var authInternal;
            return __generator(this, function (_a) {
                authInternal = _castAuth(auth);
                _assert(provider instanceof OAuthProvider, auth, "argument-error" /* ARGUMENT_ERROR */);
                return [2 /*return*/, _withDefaultResolver(authInternal, resolver)._openRedirect(authInternal, provider, "signInViaRedirect" /* SIGN_IN_VIA_REDIRECT */)];
            });
        });
    }
    /**
     * Reauthenticates the current user with the specified {@link OAuthProvider} using a full-page redirect flow.
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new FacebookAuthProvider();
     * const result = await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * // Link using a redirect.
     * await linkWithRedirect(result.user, provider);
     * // This will again trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * ```
     *
     * @param user - The user.
     * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
     * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
     * @param resolver - An instance of {@link @firebase/auth-types#PopupRedirectResolver}, optional
     * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
     *
     * @public
     */
    function reauthenticateWithRedirect(user, provider, resolver) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, resolverInternal, eventId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInternal = user;
                        _assert(provider instanceof OAuthProvider, userInternal.auth, "argument-error" /* ARGUMENT_ERROR */);
                        resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
                        return [4 /*yield*/, prepareUserForRedirect(userInternal)];
                    case 1:
                        eventId = _a.sent();
                        return [2 /*return*/, resolverInternal._openRedirect(userInternal.auth, provider, "reauthViaRedirect" /* REAUTH_VIA_REDIRECT */, eventId)];
                }
            });
        });
    }
    /**
     * Links the {@link OAuthProvider} to the user account using a full-page redirect flow.
     *
     * @example
     * ```javascript
     * // Sign in using some other provider.
     * const result = await signInWithEmailAndPassword(auth, email, password);
     * // Link using a redirect.
     * const provider = new FacebookAuthProvider();
     * await linkWithRedirect(result.user, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * ```
     *
     * @param user - The user.
     * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
     * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
     * @param resolver - An instance of {@link @firebase/auth-types#PopupRedirectResolver}, optional
     * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
     *
     *
     * @public
     */
    function linkWithRedirect(user, provider, resolver) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, resolverInternal, eventId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInternal = user;
                        _assert(provider instanceof OAuthProvider, userInternal.auth, "argument-error" /* ARGUMENT_ERROR */);
                        resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
                        return [4 /*yield*/, _assertLinkedStatus(false, userInternal, provider.providerId)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prepareUserForRedirect(userInternal)];
                    case 2:
                        eventId = _a.sent();
                        return [2 /*return*/, resolverInternal._openRedirect(userInternal.auth, provider, "linkViaRedirect" /* LINK_VIA_REDIRECT */, eventId)];
                }
            });
        });
    }
    /**
     * Returns a {@link @firebase/auth-types#UserCredential} from the redirect-based sign-in flow.
     *
     * @remarks
     * If sign-in succeeded, returns the signed in user. If sign-in was unsuccessful, fails with an
     * error. If no redirect operation was called, returns a {@link @firebase/auth-types#UserCredential}
     * with a null `user`.
     *
     * @example
     * ```javascript
     * // Sign in using a redirect.
     * const provider = new FacebookAuthProvider();
     * // You can add additional scopes to the provider:
     * provider.addScope('user_birthday');
     * // Start a sign in process for an unauthenticated user.
     * await signInWithRedirect(auth, provider);
     * // This will trigger a full page redirect away from your app
     *
     * // After returning from the redirect when your app initializes you can obtain the result
     * const result = await getRedirectResult(auth);
     * if (result) {
     *   // This is the signed-in user
     *   const user = result.user;
     *   // This gives you a Facebook Access Token.
     *   const credential = provider.credentialFromResult(auth, result);
     *   const token = credential.accessToken;
     * }
     * // As this API can be used for sign-in, linking and reauthentication,
     * // check the operationType to determine what triggered this redirect
     * // operation.
     * const operationType = result.operationType;
     * ```
     *
     * @param auth - The Auth instance.
     * @param resolver - An instance of {@link @firebase/auth-types#PopupRedirectResolver}, optional
     * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
     *
     * @public
     */
    function getRedirectResult(auth, resolver) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _castAuth(auth)._initializationPromise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, _getRedirectResult(auth, resolver, false)];
                }
            });
        });
    }
    function _getRedirectResult(auth, resolverExtern, bypassAuthState) {
        if (bypassAuthState === void 0) { bypassAuthState = false; }
        return __awaiter(this, void 0, void 0, function () {
            var authInternal, resolver, action, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authInternal = _castAuth(auth);
                        resolver = _withDefaultResolver(authInternal, resolverExtern);
                        action = new RedirectAction(authInternal, resolver, bypassAuthState);
                        return [4 /*yield*/, action.execute()];
                    case 1:
                        result = _a.sent();
                        if (!(result && !bypassAuthState)) return [3 /*break*/, 4];
                        delete result.user._redirectEventId;
                        return [4 /*yield*/, authInternal._persistUserIfCurrent(result.user)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, authInternal._setRedirectUser(null, resolverExtern)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    }
    /** @internal */
    function prepareUserForRedirect(user) {
        return __awaiter(this, void 0, void 0, function () {
            var eventId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventId = _generateEventId(user.uid + ":::");
                        user._redirectEventId = eventId;
                        return [4 /*yield*/, user.auth._setRedirectUser(user)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, user.auth._persistUserIfCurrent(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, eventId];
                }
            });
        });
    }
    // We only get one redirect outcome for any one auth, so just store it
    // in here.
    var redirectOutcomeMap = new Map();
    var RedirectAction = /** @class */ (function (_super) {
        __extends(RedirectAction, _super);
        function RedirectAction(auth, resolver, bypassAuthState) {
            if (bypassAuthState === void 0) { bypassAuthState = false; }
            var _this = _super.call(this, auth, [
                "signInViaRedirect" /* SIGN_IN_VIA_REDIRECT */,
                "linkViaRedirect" /* LINK_VIA_REDIRECT */,
                "reauthViaRedirect" /* REAUTH_VIA_REDIRECT */,
                "unknown" /* UNKNOWN */
            ], resolver, undefined, bypassAuthState) || this;
            _this.eventId = null;
            return _this;
        }
        /**
         * Override the execute function; if we already have a redirect result, then
         * just return it.
         */
        RedirectAction.prototype.execute = function () {
            return __awaiter(this, void 0, void 0, function () {
                var readyOutcome, result_1, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            readyOutcome = redirectOutcomeMap.get(this.auth._key());
                            if (!!readyOutcome) return [3 /*break*/, 5];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, _super.prototype.execute.call(this)];
                        case 2:
                            result_1 = _a.sent();
                            readyOutcome = function () { return Promise.resolve(result_1); };
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            readyOutcome = function () { return Promise.reject(e_1); };
                            return [3 /*break*/, 4];
                        case 4:
                            redirectOutcomeMap.set(this.auth._key(), readyOutcome);
                            _a.label = 5;
                        case 5: return [2 /*return*/, readyOutcome()];
                    }
                });
            });
        };
        RedirectAction.prototype.onAuthEvent = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (event.type === "signInViaRedirect" /* SIGN_IN_VIA_REDIRECT */) {
                                return [2 /*return*/, _super.prototype.onAuthEvent.call(this, event)];
                            }
                            else if (event.type === "unknown" /* UNKNOWN */) {
                                // This is a sentinel value indicating there's no pending redirect
                                this.resolve(null);
                                return [2 /*return*/];
                            }
                            if (!event.eventId) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.auth._redirectUserForId(event.eventId)];
                        case 1:
                            user = _a.sent();
                            if (user) {
                                this.user = user;
                                return [2 /*return*/, _super.prototype.onAuthEvent.call(this, event)];
                            }
                            else {
                                this.resolve(null);
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        RedirectAction.prototype.onExecution = function () {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        };
        RedirectAction.prototype.cleanUp = function () { };
        return RedirectAction;
    }(AbstractPopupRedirectOperation));

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * URL for Authentication widget which will initiate the OAuth handshake
     *
     * @internal
     */
    var WIDGET_PATH = '__/auth/handler';
    /**
     * URL for emulated environment
     *
     * @internal
     */
    var EMULATOR_WIDGET_PATH = 'emulator/auth/handler';
    /**
     * The special web storage event
     *
     * @internal
     */
    var WEB_STORAGE_SUPPORT_KEY = 'webStorageSupport';
    /**
     * Chooses a popup/redirect resolver to use. This prefers the override (which
     * is directly passed in), and falls back to the property set on the auth
     * object. If neither are available, this function errors w/ an argument error.
     *
     * @internal
     */
    function _withDefaultResolver(auth, resolverOverride) {
        if (resolverOverride) {
            return _getInstance(resolverOverride);
        }
        _assert(auth._popupRedirectResolver, auth, "argument-error" /* ARGUMENT_ERROR */);
        return auth._popupRedirectResolver;
    }
    var BrowserPopupRedirectResolver = /** @class */ (function () {
        function BrowserPopupRedirectResolver() {
            this.eventManagers = {};
            this.iframes = {};
            this.originValidationPromises = {};
            this._redirectPersistence = browserSessionPersistence;
            this._completeRedirectFn = _getRedirectResult;
        }
        // Wrapping in async even though we don't await anywhere in order
        // to make sure errors are raised as promise rejections
        BrowserPopupRedirectResolver.prototype._openPopup = function (auth, provider, authType, eventId) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            debugAssert((_a = this.eventManagers[auth._key()]) === null || _a === void 0 ? void 0 : _a.manager, '_initialize() not called before _openPopup()');
                            return [4 /*yield*/, this.originValidation(auth)];
                        case 1:
                            _b.sent();
                            url = getRedirectUrl(auth, provider, authType, eventId);
                            return [2 /*return*/, _open(auth, url, _generateEventId())];
                    }
                });
            });
        };
        BrowserPopupRedirectResolver.prototype._openRedirect = function (auth, provider, authType, eventId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.originValidation(auth)];
                        case 1:
                            _a.sent();
                            _setWindowLocation(getRedirectUrl(auth, provider, authType, eventId));
                            return [2 /*return*/, new Promise(function () { })];
                    }
                });
            });
        };
        BrowserPopupRedirectResolver.prototype._initialize = function (auth) {
            var key = auth._key();
            if (this.eventManagers[key]) {
                var _a = this.eventManagers[key], manager = _a.manager, promise_1 = _a.promise;
                if (manager) {
                    return Promise.resolve(manager);
                }
                else {
                    debugAssert(promise_1, 'If manager is not set, promise should be');
                    return promise_1;
                }
            }
            var promise = this.initAndGetManager(auth);
            this.eventManagers[key] = { promise: promise };
            return promise;
        };
        BrowserPopupRedirectResolver.prototype.initAndGetManager = function (auth) {
            return __awaiter(this, void 0, void 0, function () {
                var iframe, manager;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _openIframe(auth)];
                        case 1:
                            iframe = _a.sent();
                            manager = new AuthEventManager(auth);
                            iframe.register('authEvent', function (iframeEvent) {
                                _assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth, "invalid-auth-event" /* INVALID_AUTH_EVENT */);
                                // TODO: Consider splitting redirect and popup events earlier on
                                var handled = manager.onEvent(iframeEvent.authEvent);
                                return { status: handled ? "ACK" /* ACK */ : "ERROR" /* ERROR */ };
                            }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
                            this.eventManagers[auth._key()] = { manager: manager };
                            this.iframes[auth._key()] = iframe;
                            return [2 /*return*/, manager];
                    }
                });
            });
        };
        BrowserPopupRedirectResolver.prototype._isIframeWebStorageSupported = function (auth, cb) {
            var iframe = this.iframes[auth._key()];
            iframe.send(WEB_STORAGE_SUPPORT_KEY, { type: WEB_STORAGE_SUPPORT_KEY }, function (result) {
                var _a;
                var isSupported = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a[WEB_STORAGE_SUPPORT_KEY];
                if (isSupported !== undefined) {
                    cb(!!isSupported);
                }
                _fail(auth, "internal-error" /* INTERNAL_ERROR */);
            }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
        };
        BrowserPopupRedirectResolver.prototype.originValidation = function (auth) {
            var key = auth._key();
            if (!this.originValidationPromises[key]) {
                this.originValidationPromises[key] = _validateOrigin(auth);
            }
            return this.originValidationPromises[key];
        };
        return BrowserPopupRedirectResolver;
    }());
    /**
     * An implementation of {@link @firebase/auth-types#PopupRedirectResolver} suitable for browser
     * based applications.
     *
     * @public
     */
    var browserPopupRedirectResolver = BrowserPopupRedirectResolver;
    function getRedirectUrl(auth, provider, authType, eventId) {
        _assert(auth.config.authDomain, auth, "auth-domain-config-required" /* MISSING_AUTH_DOMAIN */);
        _assert(auth.config.apiKey, auth, "invalid-api-key" /* INVALID_API_KEY */);
        var params = {
            apiKey: auth.config.apiKey,
            appName: auth.name,
            authType: authType,
            redirectUrl: _getCurrentUrl(),
            v: app.SDK_VERSION,
            eventId: eventId
        };
        if (provider instanceof OAuthProvider) {
            provider.setDefaultLanguage(auth.languageCode);
            params.providerId = provider.providerId || '';
            if (!isEmpty(provider.getCustomParameters())) {
                params.customParameters = JSON.stringify(provider.getCustomParameters());
            }
            var scopes = provider.getScopes().filter(function (scope) { return scope !== ''; });
            if (scopes.length > 0) {
                params.scopes = scopes.join(',');
            }
            // TODO set additionalParams?
            // let additionalParams = provider.getAdditionalParams();
            // for (let key in additionalParams) {
            //   if (!params.hasOwnProperty(key)) {
            //     params[key] = additionalParams[key]
            //   }
            // }
        }
        if (auth.tenantId) {
            params.tid = auth.tenantId;
        }
        for (var _i = 0, _a = Object.keys(params); _i < _a.length; _i++) {
            var key = _a[_i];
            if (params[key] === undefined) {
                delete params[key];
            }
        }
        // TODO: maybe set eid as endipointId
        // TODO: maybe set fw as Frameworks.join(",")
        var url = new URL(getHandlerBase(auth) + "?" + querystring(params).slice(1));
        return url.toString();
    }
    function getHandlerBase(_a) {
        var config = _a.config;
        if (!config.emulator) {
            return "https://" + config.authDomain + "/" + WIDGET_PATH;
        }
        return _emulatorUrl(config, EMULATOR_WIDGET_PATH);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function startSignInPhoneMfa(auth, request) {
        return _performApiRequest(auth, "POST" /* POST */, "/v2/accounts/mfaSignIn:start" /* START_PHONE_MFA_SIGN_IN */, __assign({ tenantId: auth.tenantId }, request));
    }
    function finalizeSignInPhoneMfa(auth, request) {
        return _performApiRequest(auth, "POST" /* POST */, "/v2/accounts/mfaSignIn:finalize" /* FINALIZE_PHONE_MFA_SIGN_IN */, __assign({ tenantId: auth.tenantId }, request));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function getRecaptchaParams(auth) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _performApiRequest(auth, "GET" /* GET */, "/v1/recaptchaParams" /* GET_RECAPTCHA_PARAM */)];
                    case 1: return [2 /*return*/, ((_a.sent()).recaptchaSiteKey || '')];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var _SOLVE_TIME_MS = 500;
    var _EXPIRATION_TIME_MS = 60000;
    var _WIDGET_ID_START = 1000000000000;
    var MockReCaptcha = /** @class */ (function () {
        function MockReCaptcha(auth) {
            this.auth = auth;
            this.counter = _WIDGET_ID_START;
            this._widgets = new Map();
        }
        MockReCaptcha.prototype.render = function (container, parameters) {
            var id = this.counter;
            this._widgets.set(id, new MockWidget(container, this.auth.name, parameters || {}));
            this.counter++;
            return id;
        };
        MockReCaptcha.prototype.reset = function (optWidgetId) {
            var _a;
            var id = optWidgetId || _WIDGET_ID_START;
            void ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.delete());
            this._widgets.delete(id);
        };
        MockReCaptcha.prototype.getResponse = function (optWidgetId) {
            var _a;
            var id = optWidgetId || _WIDGET_ID_START;
            return ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.getResponse()) || '';
        };
        MockReCaptcha.prototype.execute = function (optWidgetId) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_b) {
                    id = optWidgetId || _WIDGET_ID_START;
                    void ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.execute());
                    return [2 /*return*/, ''];
                });
            });
        };
        return MockReCaptcha;
    }());
    var MockWidget = /** @class */ (function () {
        function MockWidget(containerOrId, appName, params) {
            var _this = this;
            this.params = params;
            this.timerId = null;
            this.deleted = false;
            this.responseToken = null;
            this.clickHandler = function () {
                _this.execute();
            };
            var container = typeof containerOrId === 'string'
                ? document.getElementById(containerOrId)
                : containerOrId;
            _assert(container, "argument-error" /* ARGUMENT_ERROR */, { appName: appName });
            this.container = container;
            this.isVisible = this.params.size !== 'invisible';
            if (this.isVisible) {
                this.execute();
            }
            else {
                this.container.addEventListener('click', this.clickHandler);
            }
        }
        MockWidget.prototype.getResponse = function () {
            this.checkIfDeleted();
            return this.responseToken;
        };
        MockWidget.prototype.delete = function () {
            this.checkIfDeleted();
            this.deleted = true;
            if (this.timerId) {
                clearTimeout(this.timerId);
                this.timerId = null;
            }
            this.container.removeEventListener('click', this.clickHandler);
        };
        MockWidget.prototype.execute = function () {
            var _this = this;
            this.checkIfDeleted();
            if (this.timerId) {
                return;
            }
            this.timerId = window.setTimeout(function () {
                _this.responseToken = generateRandomAlphaNumericString(50);
                var _a = _this.params, callback = _a.callback, expiredCallback = _a["expired-callback"];
                if (callback) {
                    try {
                        callback(_this.responseToken);
                    }
                    catch (e) { }
                }
                _this.timerId = window.setTimeout(function () {
                    _this.timerId = null;
                    _this.responseToken = null;
                    if (expiredCallback) {
                        try {
                            expiredCallback();
                        }
                        catch (e) { }
                    }
                    if (_this.isVisible) {
                        _this.execute();
                    }
                }, _EXPIRATION_TIME_MS);
            }, _SOLVE_TIME_MS);
        };
        MockWidget.prototype.checkIfDeleted = function () {
            if (this.deleted) {
                throw new Error('reCAPTCHA mock was already deleted!');
            }
        };
        return MockWidget;
    }());
    function generateRandomAlphaNumericString(len) {
        var chars = [];
        var allowedChars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < len; i++) {
            chars.push(allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)));
        }
        return chars.join('');
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // ReCaptcha will load using the same callback, so the callback function needs
    // to be kept around
    var _JSLOAD_CALLBACK = _generateCallbackName('rcb');
    var NETWORK_TIMEOUT_DELAY = new Delay(30000, 60000);
    var RECAPTCHA_BASE = 'https://www.google.com/recaptcha/api.js?';
    /**
     * Loader for the GReCaptcha library. There should only ever be one of this.
     */
    var ReCaptchaLoaderImpl = /** @class */ (function () {
        function ReCaptchaLoaderImpl() {
            this.hostLanguage = '';
            this.counter = 0;
            this.librarySeparatelyLoaded = !!_window().grecaptcha;
        }
        ReCaptchaLoaderImpl.prototype.load = function (auth, hl) {
            var _this = this;
            if (hl === void 0) { hl = ''; }
            _assert(isHostLanguageValid(hl), auth, "argument-error" /* ARGUMENT_ERROR */);
            if (this.shouldResolveImmediately(hl)) {
                return Promise.resolve(_window().grecaptcha);
            }
            return new Promise(function (resolve, reject) {
                var networkTimeout = _window().setTimeout(function () {
                    reject(_createError(auth, "network-request-failed" /* NETWORK_REQUEST_FAILED */));
                }, NETWORK_TIMEOUT_DELAY.get());
                _window()[_JSLOAD_CALLBACK] = function () {
                    _window().clearTimeout(networkTimeout);
                    delete _window()[_JSLOAD_CALLBACK];
                    var recaptcha = _window().grecaptcha;
                    if (!recaptcha) {
                        reject(_createError(auth, "internal-error" /* INTERNAL_ERROR */));
                        return;
                    }
                    // Wrap the greptcha render function so that we know if the developer has
                    // called it separately
                    var render = recaptcha.render;
                    recaptcha.render = function (container, params) {
                        var widgetId = render(container, params);
                        _this.counter++;
                        return widgetId;
                    };
                    _this.hostLanguage = hl;
                    resolve(recaptcha);
                };
                var url = RECAPTCHA_BASE + "?" + querystring({
                    onload: _JSLOAD_CALLBACK,
                    render: 'explicit',
                    hl: hl
                });
                _loadJS(url).catch(function () {
                    clearTimeout(networkTimeout);
                    reject(_createError(auth, "internal-error" /* INTERNAL_ERROR */));
                });
            });
        };
        ReCaptchaLoaderImpl.prototype.clearedOneInstance = function () {
            this.counter--;
        };
        ReCaptchaLoaderImpl.prototype.shouldResolveImmediately = function (hl) {
            // We can resolve immediately if:
            //   • grecaptcha is already defined AND (
            //     1. the requested language codes are the same OR
            //     2. there exists already a ReCaptcha on the page
            //     3. the library was already loaded by the app
            // In cases (2) and (3), we _can't_ reload as it would break the recaptchas
            // that are already in the page
            return (!!_window().grecaptcha &&
                (hl === this.hostLanguage ||
                    this.counter > 0 ||
                    this.librarySeparatelyLoaded));
        };
        return ReCaptchaLoaderImpl;
    }());
    function isHostLanguageValid(hl) {
        return hl.length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(hl);
    }
    var MockReCaptchaLoaderImpl = /** @class */ (function () {
        function MockReCaptchaLoaderImpl() {
        }
        MockReCaptchaLoaderImpl.prototype.load = function (auth) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new MockReCaptcha(auth)];
                });
            });
        };
        MockReCaptchaLoaderImpl.prototype.clearedOneInstance = function () { };
        return MockReCaptchaLoaderImpl;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var RECAPTCHA_VERIFIER_TYPE = 'recaptcha';
    var DEFAULT_PARAMS = {
        theme: 'light',
        type: 'image'
    };
    /**
     * {@inheritdoc @firebase/auth-types#RecaptchaVerifier}
     * @public
     */
    var RecaptchaVerifier = /** @class */ (function () {
        function RecaptchaVerifier(containerOrId, parameters, authExtern) {
            if (parameters === void 0) { parameters = __assign({}, DEFAULT_PARAMS); }
            this.parameters = parameters;
            this.type = RECAPTCHA_VERIFIER_TYPE;
            this.destroyed = false;
            this.widgetId = null;
            this.tokenChangeListeners = new Set();
            this.renderPromise = null;
            this.recaptcha = null;
            this.auth = _castAuth(authExtern);
            this.isInvisible = this.parameters.size === 'invisible';
            _assert(typeof document !== 'undefined', this.auth, "operation-not-supported-in-this-environment" /* OPERATION_NOT_SUPPORTED */);
            var container = typeof containerOrId === 'string'
                ? document.getElementById(containerOrId)
                : containerOrId;
            _assert(container, this.auth, "argument-error" /* ARGUMENT_ERROR */);
            this.container = container;
            this.parameters.callback = this.makeTokenCallback(this.parameters.callback);
            this._recaptchaLoader = this.auth.settings.appVerificationDisabledForTesting
                ? new MockReCaptchaLoaderImpl()
                : new ReCaptchaLoaderImpl();
            this.validateStartingState();
            // TODO: Figure out if sdk version is needed
        }
        /** {@inheritdoc @firebase/auth-types#RecaptchaVerifier.verify} */
        RecaptchaVerifier.prototype.verify = function () {
            return __awaiter(this, void 0, void 0, function () {
                var id, recaptcha, response;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.assertNotDestroyed();
                            return [4 /*yield*/, this.render()];
                        case 1:
                            id = _a.sent();
                            recaptcha = this.getAssertedRecaptcha();
                            response = recaptcha.getResponse(id);
                            if (response) {
                                return [2 /*return*/, response];
                            }
                            return [2 /*return*/, new Promise(function (resolve) {
                                    var tokenChange = function (token) {
                                        if (!token) {
                                            return; // Ignore token expirations.
                                        }
                                        _this.tokenChangeListeners.delete(tokenChange);
                                        resolve(token);
                                    };
                                    _this.tokenChangeListeners.add(tokenChange);
                                    if (_this.isInvisible) {
                                        recaptcha.execute(id);
                                    }
                                })];
                    }
                });
            });
        };
        /** {@inheritdoc @firebase/auth-types#RecaptchaVerifier.render} */
        RecaptchaVerifier.prototype.render = function () {
            var _this = this;
            try {
                this.assertNotDestroyed();
            }
            catch (e) {
                // This method returns a promise. Since it's not async (we want to return the
                // _same_ promise if rendering is still occurring), the API surface should
                // reject with the error rather than just throw
                return Promise.reject(e);
            }
            if (this.renderPromise) {
                return this.renderPromise;
            }
            this.renderPromise = this.makeRenderPromise().catch(function (e) {
                _this.renderPromise = null;
                throw e;
            });
            return this.renderPromise;
        };
        /** @internal */
        RecaptchaVerifier.prototype._reset = function () {
            this.assertNotDestroyed();
            if (this.widgetId !== null) {
                this.getAssertedRecaptcha().reset(this.widgetId);
            }
        };
        /** {@inheritdoc @firebase/auth-types#RecaptchaVerifier.clear} */
        RecaptchaVerifier.prototype.clear = function () {
            var _this = this;
            this.assertNotDestroyed();
            this.destroyed = true;
            this._recaptchaLoader.clearedOneInstance();
            if (!this.isInvisible) {
                this.container.childNodes.forEach(function (node) {
                    _this.container.removeChild(node);
                });
            }
        };
        RecaptchaVerifier.prototype.validateStartingState = function () {
            _assert(!this.parameters.sitekey, this.auth, "argument-error" /* ARGUMENT_ERROR */);
            _assert(this.isInvisible || !this.container.hasChildNodes(), this.auth, "argument-error" /* ARGUMENT_ERROR */);
        };
        RecaptchaVerifier.prototype.makeTokenCallback = function (existing) {
            var _this = this;
            return function (token) {
                _this.tokenChangeListeners.forEach(function (listener) { return listener(token); });
                if (typeof existing === 'function') {
                    existing(token);
                }
                else if (typeof existing === 'string') {
                    var globalFunc = _window()[existing];
                    if (typeof globalFunc === 'function') {
                        globalFunc(token);
                    }
                }
            };
        };
        RecaptchaVerifier.prototype.assertNotDestroyed = function () {
            _assert(!this.destroyed, this.auth, "internal-error" /* INTERNAL_ERROR */);
        };
        RecaptchaVerifier.prototype.makeRenderPromise = function () {
            return __awaiter(this, void 0, void 0, function () {
                var container, guaranteedEmpty;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.init()];
                        case 1:
                            _a.sent();
                            if (!this.widgetId) {
                                container = this.container;
                                if (!this.isInvisible) {
                                    guaranteedEmpty = document.createElement('div');
                                    container.appendChild(guaranteedEmpty);
                                    container = guaranteedEmpty;
                                }
                                this.widgetId = this.getAssertedRecaptcha().render(container, this.parameters);
                            }
                            return [2 /*return*/, this.widgetId];
                    }
                });
            });
        };
        RecaptchaVerifier.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, siteKey;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _assert(_isHttpOrHttps() && !_isWorker(), this.auth, "internal-error" /* INTERNAL_ERROR */);
                            return [4 /*yield*/, domReady()];
                        case 1:
                            _b.sent();
                            _a = this;
                            return [4 /*yield*/, this._recaptchaLoader.load(this.auth, this.auth.languageCode || undefined)];
                        case 2:
                            _a.recaptcha = _b.sent();
                            return [4 /*yield*/, getRecaptchaParams(this.auth)];
                        case 3:
                            siteKey = _b.sent();
                            _assert(siteKey, this.auth, "internal-error" /* INTERNAL_ERROR */);
                            this.parameters.sitekey = siteKey;
                            return [2 /*return*/];
                    }
                });
            });
        };
        RecaptchaVerifier.prototype.getAssertedRecaptcha = function () {
            _assert(this.recaptcha, this.auth, "internal-error" /* INTERNAL_ERROR */);
            return this.recaptcha;
        };
        return RecaptchaVerifier;
    }());
    function domReady() {
        var resolver = null;
        return new Promise(function (resolve) {
            if (document.readyState === 'complete') {
                resolve();
                return;
            }
            // Document not ready, wait for load before resolving.
            // Save resolver, so we can remove listener in case it was externally
            // cancelled.
            resolver = function () { return resolve(); };
            window.addEventListener('load', resolver);
        }).catch(function (e) {
            if (resolver) {
                window.removeEventListener('load', resolver);
            }
            throw e;
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var ConfirmationResult = /** @class */ (function () {
        function ConfirmationResult(verificationId, onConfirmation) {
            this.verificationId = verificationId;
            this.onConfirmation = onConfirmation;
        }
        ConfirmationResult.prototype.confirm = function (verificationCode) {
            var authCredential = PhoneAuthCredential._fromVerification(this.verificationId, verificationCode);
            return this.onConfirmation(authCredential);
        };
        return ConfirmationResult;
    }());
    /**
     * Asynchronously signs in using a phone number.
     *
     * @remarks
     * This method sends a code via SMS to the given
     * phone number, and returns a {@link @firebase/auth-types#ConfirmationResult}. After the user
     * provides the code sent to their phone, call {@link @firebase/auth-types#ConfirmationResult.confirm}
     * with the code to sign the user in.
     *
     * For abuse prevention, this method also requires a {@link @firebase/auth-types#ApplicationVerifier}.
     * This SDK includes a reCAPTCHA-based implementation, {@link RecaptchaVerifier}.
     *
     * @example
     * ```javascript
     * // 'recaptcha-container' is the ID of an element in the DOM.
     * const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
     * const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
     * // Obtain a verificationCode from the user.
     * const credential = await confirmationResult.confirm(verificationCode);
     * ```
     *
     * @param auth - The Auth instance.
     * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
     * @param appVerifier - The {@link @firebase/auth-types#ApplicationVerifier}.
     *
     * @public
     */
    function signInWithPhoneNumber$1(auth, phoneNumber, appVerifier) {
        return __awaiter(this, void 0, void 0, function () {
            var verificationId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _verifyPhoneNumber(_castAuth(auth), phoneNumber, appVerifier)];
                    case 1:
                        verificationId = _a.sent();
                        return [2 /*return*/, new ConfirmationResult(verificationId, function (cred) {
                                return signInWithCredential(auth, cred);
                            })];
                }
            });
        });
    }
    /**
     * Links the user account with the given phone number.
     *
     * @param user - The user.
     * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
     * @param appVerifier - The {@link @firebase/auth-types#ApplicationVerifier}.
     *
     * @public
     */
    function linkWithPhoneNumber$1(user, phoneNumber, appVerifier) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, verificationId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInternal = user;
                        return [4 /*yield*/, _assertLinkedStatus(false, userInternal, "phone" /* PHONE */)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, _verifyPhoneNumber(userInternal.auth, phoneNumber, appVerifier)];
                    case 2:
                        verificationId = _a.sent();
                        return [2 /*return*/, new ConfirmationResult(verificationId, function (cred) {
                                return linkWithCredential(user, cred);
                            })];
                }
            });
        });
    }
    /**
     * Re-authenticates a user using a fresh phne credential.
     *
     * @remarks Use before operations such as {@link updatePassword} that require tokens from recent sign-in attempts.
     *
     * @param user - The user.
     * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
     * @param appVerifier - The {@link @firebase/auth-types#ApplicationVerifier}.
     *
     * @public
     */
    function reauthenticateWithPhoneNumber(user, phoneNumber, appVerifier) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, verificationId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userInternal = user;
                        return [4 /*yield*/, _verifyPhoneNumber(userInternal.auth, phoneNumber, appVerifier)];
                    case 1:
                        verificationId = _a.sent();
                        return [2 /*return*/, new ConfirmationResult(verificationId, function (cred) {
                                return reauthenticateWithCredential(user, cred);
                            })];
                }
            });
        });
    }
    /**
     * Returns a verification ID to be used in conjunction with the SMS code that is sent.
     *
     * @internal
     */
    function _verifyPhoneNumber(auth, options, verifier) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var recaptchaToken, phoneInfoOptions, session, response, mfaEnrollmentId, response, sessionInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, verifier.verify()];
                    case 1:
                        recaptchaToken = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, , 10, 11]);
                        _assert(typeof recaptchaToken === 'string', auth, "argument-error" /* ARGUMENT_ERROR */);
                        _assert(verifier.type === RECAPTCHA_VERIFIER_TYPE, auth, "argument-error" /* ARGUMENT_ERROR */);
                        phoneInfoOptions = void 0;
                        if (typeof options === 'string') {
                            phoneInfoOptions = {
                                phoneNumber: options
                            };
                        }
                        else {
                            phoneInfoOptions = options;
                        }
                        if (!('session' in phoneInfoOptions)) return [3 /*break*/, 7];
                        session = phoneInfoOptions.session;
                        if (!('phoneNumber' in phoneInfoOptions)) return [3 /*break*/, 4];
                        _assert(session.type === "enroll" /* ENROLL */, auth, "internal-error" /* INTERNAL_ERROR */);
                        return [4 /*yield*/, startEnrollPhoneMfa(auth, {
                                idToken: session.credential,
                                phoneEnrollmentInfo: {
                                    phoneNumber: phoneInfoOptions.phoneNumber,
                                    recaptchaToken: recaptchaToken
                                }
                            })];
                    case 3:
                        response = _b.sent();
                        return [2 /*return*/, response.phoneSessionInfo.sessionInfo];
                    case 4:
                        _assert(session.type === "signin" /* SIGN_IN */, auth, "internal-error" /* INTERNAL_ERROR */);
                        mfaEnrollmentId = ((_a = phoneInfoOptions.multiFactorHint) === null || _a === void 0 ? void 0 : _a.uid) ||
                            phoneInfoOptions.multiFactorUid;
                        _assert(mfaEnrollmentId, auth, "missing-multi-factor-info" /* MISSING_MFA_INFO */);
                        return [4 /*yield*/, startSignInPhoneMfa(auth, {
                                mfaPendingCredential: session.credential,
                                mfaEnrollmentId: mfaEnrollmentId,
                                phoneSignInInfo: {
                                    recaptchaToken: recaptchaToken
                                }
                            })];
                    case 5:
                        response = _b.sent();
                        return [2 /*return*/, response.phoneResponseInfo.sessionInfo];
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, sendPhoneVerificationCode(auth, {
                            phoneNumber: phoneInfoOptions.phoneNumber,
                            recaptchaToken: recaptchaToken
                        })];
                    case 8:
                        sessionInfo = (_b.sent()).sessionInfo;
                        return [2 /*return*/, sessionInfo];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        verifier._reset();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Updates the user's phone number.
     *
     * @example
     * ```
     * // 'recaptcha-container' is the ID of an element in the DOM.
     * const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
     * const provider = new PhoneAuthProvider(auth);
     * const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
     * // Obtain the verificationCode from the user.
     * const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
     * await updatePhoneNumber(user, phoneCredential);
     * ```
     *
     * @param user - The user.
     * @param credential - A credential authenticating the new phone number.
     *
     * @public
     */
    function updatePhoneNumber(user, credential) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _link(user, credential)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * {@inheritdoc @firebase/auth-types#PhoneAuthProvider}
     * @public
     */
    var PhoneAuthProvider = /** @class */ (function () {
        function PhoneAuthProvider(auth) {
            /** {@inheritdoc @firebase/auth-types#PhoneAuthProvider.providerId} */
            this.providerId = PhoneAuthProvider.PROVIDER_ID;
            this.auth = _castAuth(auth);
        }
        /** {@inheritdoc @firebase/auth-types#PhoneAuthProvider.verifyPhoneNumber} */
        PhoneAuthProvider.prototype.verifyPhoneNumber = function (phoneOptions, applicationVerifier) {
            return _verifyPhoneNumber(this.auth, phoneOptions, applicationVerifier);
        };
        /** {@inheritdoc @firebase/auth-types#PhoneAuthProvider.credential} */
        PhoneAuthProvider.credential = function (verificationId, verificationCode) {
            return PhoneAuthCredential._fromVerification(verificationId, verificationCode);
        };
        PhoneAuthProvider.credentialFromResult = function (userCredential) {
            var credential = userCredential;
            _assert(credential._tokenResponse, credential.user.auth, "argument-error" /* ARGUMENT_ERROR */);
            var _a = credential._tokenResponse, phoneNumber = _a.phoneNumber, temporaryProof = _a.temporaryProof;
            if (phoneNumber && temporaryProof) {
                return PhoneAuthCredential._fromTokenResponse(phoneNumber, temporaryProof);
            }
            _fail(credential.user.auth, "argument-error" /* ARGUMENT_ERROR */);
        };
        /** {@inheritdoc @firebase/auth-types#PhoneAuthProvider.PROVIDER_ID} */
        PhoneAuthProvider.PROVIDER_ID = "phone" /* PHONE */;
        /** {@inheritdoc @firebase/auth-types#PhoneAuthProvider.PHONE_SIGN_IN_METHOD} */
        PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone" /* PHONE */;
        return PhoneAuthProvider;
    }());

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2000, 10000);
    /**
     * Authenticates a Firebase client using a popup-based OAuth authentication flow.
     *
     * @remarks
     * If succeeds, returns the signed in user along with the provider's credential. If sign in was
     * unsuccessful, returns an error object containing additional information about the error.
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new FacebookAuthProvider();
     * const result = await signInWithPopup(auth, provider);
     *
     * // The signed-in user info.
     * const user = result.user;
     * // This gives you a Facebook Access Token.
     * const credential = provider.credentialFromResult(auth, result);
     * const token = credential.accessToken;
     * ```
     *
     * @param auth - The Auth instance.
     * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
     * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
     * @param resolver - An instance of {@link @firebase/auth-types#PopupRedirectResolver}, optional
     * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
     *
     *
     * @public
     */
    function signInWithPopup(auth, provider, resolver) {
        return __awaiter(this, void 0, void 0, function () {
            var authInternal, resolverInternal, action;
            return __generator(this, function (_a) {
                authInternal = _castAuth(auth);
                _assert(provider instanceof OAuthProvider, auth, "argument-error" /* ARGUMENT_ERROR */);
                resolverInternal = _withDefaultResolver(authInternal, resolver);
                action = new PopupOperation(authInternal, "signInViaPopup" /* SIGN_IN_VIA_POPUP */, provider, resolverInternal);
                return [2 /*return*/, action.executeNotNull()];
            });
        });
    }
    /**
     * Reauthenticates the current user with the specified {@link OAuthProvider} using a pop-up based
     * OAuth flow.
     *
     * @remarks
     * If the reauthentication is successful, the returned result will contain the user and the
     * provider's credential.
     *
     * @example
     * ```javascript
     * // Sign in using a popup.
     * const provider = new FacebookAuthProvider();
     * const result = await signInWithPopup(auth, provider);
     * // Reauthenticate using a popup.
     * await reauthenticateWithPopup(result.user, provider);
     * ```
     *
     * @param user - The user.
     * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
     * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
     * @param resolver - An instance of {@link @firebase/auth-types#PopupRedirectResolver}, optional
     * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
     *
     * @public
     */
    function reauthenticateWithPopup(user, provider, resolver) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, resolverInternal, action;
            return __generator(this, function (_a) {
                userInternal = user;
                _assert(provider instanceof OAuthProvider, userInternal.auth, "argument-error" /* ARGUMENT_ERROR */);
                resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
                action = new PopupOperation(userInternal.auth, "reauthViaPopup" /* REAUTH_VIA_POPUP */, provider, resolverInternal, userInternal);
                return [2 /*return*/, action.executeNotNull()];
            });
        });
    }
    /**
     * Links the authenticated provider to the user account using a pop-up based OAuth flow.
     *
     * @remarks
     * If the linking is successful, the returned result will contain the user and the provider's credential.
     *
     *
     * @example
     * ```javascript
     * // Sign in using some other provider.
     * const result = await signInWithEmailAndPassword(auth, email, password);
     * // Link using a popup.
     * const provider = new FacebookAuthProvider();
     * await linkWithPopup(result.user, provider);
     * ```
     *
     * @param user - The user.
     * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
     * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
     * @param resolver - An instance of {@link @firebase/auth-types#PopupRedirectResolver}, optional
     * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
     *
     * @public
     */
    function linkWithPopup(user, provider, resolver) {
        return __awaiter(this, void 0, void 0, function () {
            var userInternal, resolverInternal, action;
            return __generator(this, function (_a) {
                userInternal = user;
                _assert(provider instanceof OAuthProvider, userInternal.auth, "argument-error" /* ARGUMENT_ERROR */);
                resolverInternal = _withDefaultResolver(userInternal.auth, resolver);
                action = new PopupOperation(userInternal.auth, "linkViaPopup" /* LINK_VIA_POPUP */, provider, resolverInternal, userInternal);
                return [2 /*return*/, action.executeNotNull()];
            });
        });
    }
    /**
     * Popup event manager. Handles the popup's entire lifecycle; listens to auth
     * events
     *
     * @internal
     */
    var PopupOperation = /** @class */ (function (_super) {
        __extends(PopupOperation, _super);
        function PopupOperation(auth, filter, provider, resolver, user) {
            var _this = _super.call(this, auth, filter, resolver, user) || this;
            _this.provider = provider;
            _this.authWindow = null;
            _this.pollId = null;
            if (PopupOperation.currentPopupAction) {
                PopupOperation.currentPopupAction.cancel();
            }
            PopupOperation.currentPopupAction = _this;
            return _this;
        }
        PopupOperation.prototype.executeNotNull = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            result = _a.sent();
                            _assert(result, this.auth, "internal-error" /* INTERNAL_ERROR */);
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        PopupOperation.prototype.onExecution = function () {
            return __awaiter(this, void 0, void 0, function () {
                var eventId, _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            debugAssert(this.filter.length === 1, 'Popup operations only handle one event');
                            eventId = _generateEventId();
                            _a = this;
                            return [4 /*yield*/, this.resolver._openPopup(this.auth, this.provider, this.filter[0], // There's always one, see constructor
                                eventId)];
                        case 1:
                            _a.authWindow = _b.sent();
                            this.authWindow.associatedEvent = eventId;
                            // Check for web storage support _after_ the popup is loaded. Checking for
                            // web storage is slow (on the order of a second or so). Rather than
                            // waiting on that before opening the window, optimistically open the popup
                            // and check for storage support at the same time. If storage support is
                            // not available, this will cause the whole thing to reject properly. It
                            // will also close the popup, but since the promise has already rejected,
                            // the popup closed by user poll will reject into the void.
                            this.resolver._isIframeWebStorageSupported(this.auth, function (isSupported) {
                                if (!isSupported) {
                                    _this.reject(_createError(_this.auth, "web-storage-unsupported" /* WEB_STORAGE_UNSUPPORTED */));
                                }
                            });
                            // Handle user closure. Notice this does *not* use await
                            this.pollUserCancellation();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(PopupOperation.prototype, "eventId", {
            get: function () {
                var _a;
                return ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.associatedEvent) || null;
            },
            enumerable: false,
            configurable: true
        });
        PopupOperation.prototype.cancel = function () {
            this.reject(_createError(this.auth, "cancelled-popup-request" /* EXPIRED_POPUP_REQUEST */));
        };
        PopupOperation.prototype.cleanUp = function () {
            if (this.authWindow) {
                this.authWindow.close();
            }
            if (this.pollId) {
                window.clearTimeout(this.pollId);
            }
            this.authWindow = null;
            this.pollId = null;
            PopupOperation.currentPopupAction = null;
        };
        PopupOperation.prototype.pollUserCancellation = function () {
            var _this = this;
            var poll = function () {
                var _a, _b;
                if ((_b = (_a = _this.authWindow) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.closed) {
                    // Make sure that there is sufficient time for whatever action to
                    // complete. The window could have closed but the sign in network
                    // call could still be in flight.
                    _this.pollId = window.setTimeout(function () {
                        _this.pollId = null;
                        _this.reject(_createError(_this.auth, "popup-closed-by-user" /* POPUP_CLOSED_BY_USER */));
                    }, 2000 /* AUTH_EVENT */);
                    return;
                }
                _this.pollId = window.setTimeout(poll, _POLL_WINDOW_CLOSE_TIMEOUT.get());
            };
            poll();
        };
        // Only one popup is ever shown at once. The lifecycle of the current popup
        // can be managed / cancelled by the constructor.
        PopupOperation.currentPopupAction = null;
        return PopupOperation;
    }(AbstractPopupRedirectOperation));

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var MultiFactorAssertion = /** @class */ (function () {
        function MultiFactorAssertion(factorId) {
            this.factorId = factorId;
        }
        MultiFactorAssertion.prototype._process = function (auth, session, displayName) {
            switch (session.type) {
                case "enroll" /* ENROLL */:
                    return this._finalizeEnroll(auth, session.credential, displayName);
                case "signin" /* SIGN_IN */:
                    return this._finalizeSignIn(auth, session.credential);
                default:
                    return debugFail('unexpected MultiFactorSessionType');
            }
        };
        return MultiFactorAssertion;
    }());

    /**
     * {@inheritdoc @firebase/auth-types#PhoneMultiFactorAssertion}
     *
     * @public
     */
    var PhoneMultiFactorAssertion = /** @class */ (function (_super) {
        __extends(PhoneMultiFactorAssertion, _super);
        function PhoneMultiFactorAssertion(credential) {
            var _this = _super.call(this, "phone" /* PHONE */) || this;
            _this.credential = credential;
            return _this;
        }
        /** @internal */
        PhoneMultiFactorAssertion._fromCredential = function (credential) {
            return new PhoneMultiFactorAssertion(credential);
        };
        /** @internal */
        PhoneMultiFactorAssertion.prototype._finalizeEnroll = function (auth, idToken, displayName) {
            return finalizeEnrollPhoneMfa(auth, {
                idToken: idToken,
                displayName: displayName,
                phoneVerificationInfo: this.credential._makeVerificationRequest()
            });
        };
        /** @internal */
        PhoneMultiFactorAssertion.prototype._finalizeSignIn = function (auth, mfaPendingCredential) {
            return finalizeSignInPhoneMfa(auth, {
                mfaPendingCredential: mfaPendingCredential,
                phoneVerificationInfo: this.credential._makeVerificationRequest()
            });
        };
        return PhoneMultiFactorAssertion;
    }(MultiFactorAssertion));
    /**
     * {@inheritdoc @firebase/auth-types#PhoneMultiFactorGenerator}
     * @public
     */
    var PhoneMultiFactorGenerator = /** @class */ (function () {
        function PhoneMultiFactorGenerator() {
        }
        /** {@inheritdoc @firebase/auth-types#PhoneMultiFactorGenerator.assertion} */
        PhoneMultiFactorGenerator.assertion = function (credential) {
            return PhoneMultiFactorAssertion._fromCredential(credential);
        };
        return PhoneMultiFactorGenerator;
    }());

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Initializes an Auth instance with platform specific default dependencies.
     *
     * @param app - The Firebase App.
     *
     * @public
     */
    function getAuth(app) {
        return initializeAuth(app, {
            popupRedirectResolver: browserPopupRedirectResolver,
            persistence: [indexedDBLocalPersistence, browserLocalPersistence]
        });
    }
    registerAuth("Browser" /* BROWSER */);

    exports.ActionCodeURL = ActionCodeURL;
    exports.AuthCredential = AuthCredential;
    exports.EmailAuthCredential = EmailAuthCredential;
    exports.EmailAuthProvider = EmailAuthProvider;
    exports.FacebookAuthProvider = FacebookAuthProvider;
    exports.GithubAuthProvider = GithubAuthProvider;
    exports.GoogleAuthProvider = GoogleAuthProvider;
    exports.OAuthCredential = OAuthCredential;
    exports.OAuthProvider = OAuthProvider;
    exports.PhoneAuthCredential = PhoneAuthCredential;
    exports.PhoneAuthProvider = PhoneAuthProvider;
    exports.PhoneMultiFactorGenerator = PhoneMultiFactorGenerator;
    exports.RecaptchaVerifier = RecaptchaVerifier;
    exports.TwitterAuthProvider = TwitterAuthProvider;
    exports.applyActionCode = applyActionCode$1;
    exports.browserLocalPersistence = browserLocalPersistence;
    exports.browserPopupRedirectResolver = browserPopupRedirectResolver;
    exports.browserSessionPersistence = browserSessionPersistence;
    exports.checkActionCode = checkActionCode;
    exports.confirmPasswordReset = confirmPasswordReset;
    exports.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
    exports.debugErrorMap = debugErrorMap;
    exports.deleteUser = deleteUser;
    exports.fetchSignInMethodsForEmail = fetchSignInMethodsForEmail;
    exports.getAdditionalUserInfo = getAdditionalUserInfo;
    exports.getAuth = getAuth;
    exports.getIdToken = getIdToken;
    exports.getIdTokenResult = getIdTokenResult;
    exports.getMultiFactorResolver = getMultiFactorResolver;
    exports.getRedirectResult = getRedirectResult;
    exports.inMemoryPersistence = inMemoryPersistence;
    exports.indexedDBLocalPersistence = indexedDBLocalPersistence;
    exports.initializeAuth = initializeAuth;
    exports.isSignInWithEmailLink = isSignInWithEmailLink;
    exports.linkWithCredential = linkWithCredential;
    exports.linkWithPhoneNumber = linkWithPhoneNumber$1;
    exports.linkWithPopup = linkWithPopup;
    exports.linkWithRedirect = linkWithRedirect;
    exports.multiFactor = multiFactor;
    exports.onAuthStateChanged = onAuthStateChanged;
    exports.onIdTokenChanged = onIdTokenChanged;
    exports.parseActionCodeURL = parseActionCodeURL;
    exports.prodErrorMap = prodErrorMap;
    exports.reauthenticateWithCredential = reauthenticateWithCredential;
    exports.reauthenticateWithPhoneNumber = reauthenticateWithPhoneNumber;
    exports.reauthenticateWithPopup = reauthenticateWithPopup;
    exports.reauthenticateWithRedirect = reauthenticateWithRedirect;
    exports.reload = reload;
    exports.sendEmailVerification = sendEmailVerification$1;
    exports.sendPasswordResetEmail = sendPasswordResetEmail$1;
    exports.sendSignInLinkToEmail = sendSignInLinkToEmail$1;
    exports.setPersistence = setPersistence;
    exports.signInAnonymously = signInAnonymously;
    exports.signInWithCredential = signInWithCredential;
    exports.signInWithCustomToken = signInWithCustomToken$1;
    exports.signInWithEmailAndPassword = signInWithEmailAndPassword;
    exports.signInWithEmailLink = signInWithEmailLink$1;
    exports.signInWithPhoneNumber = signInWithPhoneNumber$1;
    exports.signInWithPopup = signInWithPopup;
    exports.signInWithRedirect = signInWithRedirect;
    exports.signOut = signOut;
    exports.unlink = unlink;
    exports.updateCurrentUser = updateCurrentUser;
    exports.updateEmail = updateEmail;
    exports.updatePassword = updatePassword;
    exports.updatePhoneNumber = updatePhoneNumber;
    exports.updateProfile = updateProfile$1;
    exports.useDeviceLanguage = useDeviceLanguage;
    exports.verifyBeforeUpdateEmail = verifyBeforeUpdateEmail;
    exports.verifyPasswordResetCode = verifyPasswordResetCode;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-auth.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-auth.js.map
