import { _getProvider, getApp, _registerComponent, registerVersion } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';

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
const stringToByteArray$1 = function (str) {
    // TODO(user): Use native implementations if/when available
    const out = [];
    let p = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
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
const byteArrayToString = function (bytes) {
    // TODO(user): Use native implementations if/when available
    const out = [];
    let pos = 0, c = 0;
    while (pos < bytes.length) {
        const c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        }
        else if (c1 > 191 && c1 < 224) {
            const c2 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        }
        else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            const c2 = bytes[pos++];
            const c3 = bytes[pos++];
            const c4 = bytes[pos++];
            const u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                0x10000;
            out[c++] = String.fromCharCode(0xd800 + (u >> 10));
            out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
        }
        else {
            const c2 = bytes[pos++];
            const c3 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        }
    }
    return out.join('');
};
// We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()
const base64 = {
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
    encodeByteArray(input, webSafe) {
        if (!Array.isArray(input)) {
            throw Error('encodeByteArray takes an array as a parameter');
        }
        this.init_();
        const byteToCharMap = webSafe
            ? this.byteToCharMapWebSafe_
            : this.byteToCharMap_;
        const output = [];
        for (let i = 0; i < input.length; i += 3) {
            const byte1 = input[i];
            const haveByte2 = i + 1 < input.length;
            const byte2 = haveByte2 ? input[i + 1] : 0;
            const haveByte3 = i + 2 < input.length;
            const byte3 = haveByte3 ? input[i + 2] : 0;
            const outByte1 = byte1 >> 2;
            const outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
            let outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
            let outByte4 = byte3 & 0x3f;
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
    encodeString(input, webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return btoa(input);
        }
        return this.encodeByteArray(stringToByteArray$1(input), webSafe);
    },
    /**
     * Base64-decode a string.
     *
     * @param input to decode.
     * @param webSafe True if we should use the
     *     alternative alphabet.
     * @return string representing the decoded value.
     */
    decodeString(input, webSafe) {
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
    decodeStringToByteArray(input, webSafe) {
        this.init_();
        const charToByteMap = webSafe
            ? this.charToByteMapWebSafe_
            : this.charToByteMap_;
        const output = [];
        for (let i = 0; i < input.length;) {
            const byte1 = charToByteMap[input.charAt(i++)];
            const haveByte2 = i < input.length;
            const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
            ++i;
            const haveByte3 = i < input.length;
            const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            const haveByte4 = i < input.length;
            const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                throw Error();
            }
            const outByte1 = (byte1 << 2) | (byte2 >> 4);
            output.push(outByte1);
            if (byte3 !== 64) {
                const outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                output.push(outByte2);
                if (byte4 !== 64) {
                    const outByte3 = ((byte3 << 6) & 0xc0) | byte4;
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
    init_() {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {};
            this.charToByteMap_ = {};
            this.byteToCharMapWebSafe_ = {};
            this.charToByteMapWebSafe_ = {};
            // We want quick mappings back and forth, so we precompute two maps.
            for (let i = 0; i < this.ENCODED_VALS.length; i++) {
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
const base64Decode = function (str) {
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
class Deferred {
    constructor() {
        this.reject = () => { };
        this.resolve = () => { };
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
    /**
     * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
     * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
     * and returns a node-style callback which will resolve or reject the Deferred's promise.
     */
    wrapCallback(callback) {
        return (error, value) => {
            if (error) {
                this.reject(error);
            }
            else {
                this.resolve(value);
            }
            if (typeof callback === 'function') {
                // Attaching noop handler just in case developer wasn't expecting
                // promises
                this.promise.catch(() => { });
                // Some of our callbacks don't expect a value and our own tests
                // assert that the parameter length is 1
                if (callback.length === 1) {
                    callback(error);
                }
                else {
                    callback(error, value);
                }
            }
        };
    }
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */
function isIndexedDBAvailable() {
    return typeof indexedDB === 'object';
}
/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 */
function getGlobal() {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('Unable to locate global object.');
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
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // Typescript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if (e.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */
const ERROR_NAME = 'FirebaseError';
// Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
class FirebaseError extends Error {
    constructor(
    /** The error code for this error. */
    code, message, 
    /** Custom data for this error. */
    customData) {
        super(message);
        this.code = code;
        this.customData = customData;
        /** The custom name for all FirebaseErrors. */
        this.name = ERROR_NAME;
        // Fix For ES5
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, FirebaseError.prototype);
        // Maintains proper stack trace for where our error was thrown.
        // Only available on V8.
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorFactory.prototype.create);
        }
    }
}
class ErrorFactory {
    constructor(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
    }
    create(code, ...data) {
        const customData = data[0] || {};
        const fullCode = `${this.service}/${code}`;
        const template = this.errors[code];
        const message = template ? replaceTemplate(template, customData) : 'Error';
        // Service Name: Error message (service/code).
        const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
        const error = new FirebaseError(fullCode, fullMessage, customData);
        return error;
    }
}
function replaceTemplate(template, data) {
    return template.replace(PATTERN, (_, key) => {
        const value = data[key];
        return value != null ? String(value) : `<${key}?>`;
    });
}
const PATTERN = /\{\$([^}]+)}/g;

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
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
    return JSON.parse(str);
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
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const decode = function (token) {
    let header = {}, claims = {}, data = {}, signature = '';
    try {
        const parts = token.split('.');
        header = jsonEval(base64Decode(parts[0]) || '');
        claims = jsonEval(base64Decode(parts[1]) || '');
        signature = parts[2];
        data = claims['d'] || {};
        delete claims['d'];
    }
    catch (e) { }
    return {
        header,
        claims,
        data,
        signature
    };
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const issuedAtTime = function (token) {
    const claims = decode(token).claims;
    if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
        return claims['iat'];
    }
    return null;
};

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
 * The amount of milliseconds to exponentially increase.
 */
const DEFAULT_INTERVAL_MILLIS = 1000;
/**
 * The factor to backoff by.
 * Should be a number greater than 1.
 */
const DEFAULT_BACKOFF_FACTOR = 2;
/**
 * The maximum milliseconds to increase to.
 *
 * <p>Visible for testing
 */
const MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.
/**
 * The percentage of backoff time to randomize by.
 * See
 * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
 * for context.
 *
 * <p>Visible for testing
 */
const RANDOM_FACTOR = 0.5;
/**
 * Based on the backoff method from
 * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
 * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
 */
function calculateBackoffMillis(backoffCount, intervalMillis = DEFAULT_INTERVAL_MILLIS, backoffFactor = DEFAULT_BACKOFF_FACTOR) {
    // Calculates an exponentially increasing value.
    // Deviation: calculates value from count and a constant interval, so we only need to save value
    // and count to restore state.
    const currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount);
    // A random "fuzz" to avoid waves of retries.
    // Deviation: randomFactor is required.
    const randomWait = Math.round(
    // A fraction of the backoff value to add/subtract.
    // Deviation: changes multiplication order to improve readability.
    RANDOM_FACTOR *
        currBaseValue *
        // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
        // if we add or subtract.
        (Math.random() - 0.5) *
        2);
    // Limits backoff to max to avoid effectively permanent backoff.
    return Math.min(MAX_VALUE_MILLIS, currBaseValue + randomWait);
}

/**
 * @license
 * Copyright 2021 Google LLC
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
function getModularInstance(service) {
    if (service && service._delegate) {
        return service._delegate;
    }
    else {
        return service;
    }
}

/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
class Component {
    /**
     *
     * @param name The public service name, e.g. app, auth, firestore, database
     * @param instanceFactory Service factory responsible for creating the public interface
     * @param type whether the service provided by the component is public or private
     */
    constructor(name, instanceFactory, type) {
        this.name = name;
        this.instanceFactory = instanceFactory;
        this.type = type;
        this.multipleInstances = false;
        /**
         * Properties to be added to the service namespace
         */
        this.serviceProps = {};
        this.instantiationMode = "LAZY" /* LAZY */;
        this.onInstanceCreated = null;
    }
    setInstantiationMode(mode) {
        this.instantiationMode = mode;
        return this;
    }
    setMultipleInstances(multipleInstances) {
        this.multipleInstances = multipleInstances;
        return this;
    }
    setServiceProps(props) {
        this.serviceProps = props;
        return this;
    }
    setInstanceCreatedCallback(callback) {
        this.onInstanceCreated = callback;
        return this;
    }
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
const levelStringToEnum = {
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
const defaultLogLevel = LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */
const ConsoleMethod = {
    [LogLevel.DEBUG]: 'log',
    [LogLevel.VERBOSE]: 'log',
    [LogLevel.INFO]: 'info',
    [LogLevel.WARN]: 'warn',
    [LogLevel.ERROR]: 'error'
};
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */
const defaultLogHandler = (instance, logType, ...args) => {
    if (logType < instance.logLevel) {
        return;
    }
    const now = new Date().toISOString();
    const method = ConsoleMethod[logType];
    if (method) {
        console[method](`[${now}]  ${instance.name}:`, ...args);
    }
    else {
        throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
    }
};
class Logger {
    /**
     * Gives you an instance of a Logger to capture messages according to
     * Firebase's logging scheme.
     *
     * @param name The name that the logs will be associated with
     */
    constructor(name) {
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
    get logLevel() {
        return this._logLevel;
    }
    set logLevel(val) {
        if (!(val in LogLevel)) {
            throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
        }
        this._logLevel = val;
    }
    // Workaround for setter/getter having to be the same type.
    setLogLevel(val) {
        this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
    }
    get logHandler() {
        return this._logHandler;
    }
    set logHandler(val) {
        if (typeof val !== 'function') {
            throw new TypeError('Value assigned to `logHandler` must be a function');
        }
        this._logHandler = val;
    }
    get userLogHandler() {
        return this._userLogHandler;
    }
    set userLogHandler(val) {
        this._userLogHandler = val;
    }
    /**
     * The functions below are all based on the `console` interface
     */
    debug(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
        this._logHandler(this, LogLevel.DEBUG, ...args);
    }
    log(...args) {
        this._userLogHandler &&
            this._userLogHandler(this, LogLevel.VERBOSE, ...args);
        this._logHandler(this, LogLevel.VERBOSE, ...args);
    }
    info(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
        this._logHandler(this, LogLevel.INFO, ...args);
    }
    warn(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
        this._logHandler(this, LogLevel.WARN, ...args);
    }
    error(...args) {
        this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
        this._logHandler(this, LogLevel.ERROR, ...args);
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
const APP_CHECK_STATES = new Map();
const DEFAULT_STATE = {
    activated: false,
    tokenObservers: []
};
const DEBUG_STATE = {
    initialized: false,
    enabled: false
};
function getState(app) {
    return APP_CHECK_STATES.get(app) || DEFAULT_STATE;
}
function setState(app, state) {
    APP_CHECK_STATES.set(app, state);
}
function getDebugState() {
    return DEBUG_STATE;
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
const BASE_ENDPOINT = 'https://content-firebaseappcheck.googleapis.com/v1';
const EXCHANGE_RECAPTCHA_TOKEN_METHOD = 'exchangeRecaptchaV3Token';
const EXCHANGE_RECAPTCHA_ENTERPRISE_TOKEN_METHOD = 'exchangeRecaptchaEnterpriseToken';
const EXCHANGE_DEBUG_TOKEN_METHOD = 'exchangeDebugToken';
const TOKEN_REFRESH_TIME = {
    /**
     * The offset time before token natural expiration to run the refresh.
     * This is currently 5 minutes.
     */
    OFFSET_DURATION: 5 * 60 * 1000,
    /**
     * This is the first retrial wait after an error. This is currently
     * 30 seconds.
     */
    RETRIAL_MIN_WAIT: 30 * 1000,
    /**
     * This is the maximum retrial wait, currently 16 minutes.
     */
    RETRIAL_MAX_WAIT: 16 * 60 * 1000
};
/**
 * One day in millis, for certain error code backoffs.
 */
const ONE_DAY = 24 * 60 * 60 * 1000;

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
 * Port from auth proactiverefresh.js
 *
 */
// TODO: move it to @firebase/util?
// TODO: allow to config whether refresh should happen in the background
class Refresher {
    constructor(operation, retryPolicy, getWaitDuration, lowerBound, upperBound) {
        this.operation = operation;
        this.retryPolicy = retryPolicy;
        this.getWaitDuration = getWaitDuration;
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.pending = null;
        this.nextErrorWaitInterval = lowerBound;
        if (lowerBound > upperBound) {
            throw new Error('Proactive refresh lower bound greater than upper bound!');
        }
    }
    start() {
        this.nextErrorWaitInterval = this.lowerBound;
        this.process(true).catch(() => {
            /* we don't care about the result */
        });
    }
    stop() {
        if (this.pending) {
            this.pending.reject('cancelled');
            this.pending = null;
        }
    }
    isRunning() {
        return !!this.pending;
    }
    async process(hasSucceeded) {
        this.stop();
        try {
            this.pending = new Deferred();
            await sleep(this.getNextRun(hasSucceeded));
            // Why do we resolve a promise, then immediate wait for it?
            // We do it to make the promise chain cancellable.
            // We can call stop() which rejects the promise before the following line execute, which makes
            // the code jump to the catch block.
            // TODO: unit test this
            this.pending.resolve();
            await this.pending.promise;
            this.pending = new Deferred();
            await this.operation();
            this.pending.resolve();
            await this.pending.promise;
            this.process(true).catch(() => {
                /* we don't care about the result */
            });
        }
        catch (error) {
            if (this.retryPolicy(error)) {
                this.process(false).catch(() => {
                    /* we don't care about the result */
                });
            }
            else {
                this.stop();
            }
        }
    }
    getNextRun(hasSucceeded) {
        if (hasSucceeded) {
            // If last operation succeeded, reset next error wait interval and return
            // the default wait duration.
            this.nextErrorWaitInterval = this.lowerBound;
            // Return typical wait duration interval after a successful operation.
            return this.getWaitDuration();
        }
        else {
            // Get next error wait interval.
            const currentErrorWaitInterval = this.nextErrorWaitInterval;
            // Double interval for next consecutive error.
            this.nextErrorWaitInterval *= 2;
            // Make sure next wait interval does not exceed the maximum upper bound.
            if (this.nextErrorWaitInterval > this.upperBound) {
                this.nextErrorWaitInterval = this.upperBound;
            }
            return currentErrorWaitInterval;
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
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
const ERRORS = {
    ["already-initialized" /* ALREADY_INITIALIZED */]: 'You have already called initializeAppCheck() for FirebaseApp {$appName} with ' +
        'different options. To avoid this error, call initializeAppCheck() with the ' +
        'same options as when it was originally called. This will return the ' +
        'already initialized instance.',
    ["use-before-activation" /* USE_BEFORE_ACTIVATION */]: 'App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. ' +
        'Call initializeAppCheck() before instantiating other Firebase services.',
    ["fetch-network-error" /* FETCH_NETWORK_ERROR */]: 'Fetch failed to connect to a network. Check Internet connection. ' +
        'Original error: {$originalErrorMessage}.',
    ["fetch-parse-error" /* FETCH_PARSE_ERROR */]: 'Fetch client could not parse response.' +
        ' Original error: {$originalErrorMessage}.',
    ["fetch-status-error" /* FETCH_STATUS_ERROR */]: 'Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.',
    ["storage-open" /* STORAGE_OPEN */]: 'Error thrown when opening storage. Original error: {$originalErrorMessage}.',
    ["storage-get" /* STORAGE_GET */]: 'Error thrown when reading from storage. Original error: {$originalErrorMessage}.',
    ["storage-set" /* STORAGE_WRITE */]: 'Error thrown when writing to storage. Original error: {$originalErrorMessage}.',
    ["recaptcha-error" /* RECAPTCHA_ERROR */]: 'ReCAPTCHA error.',
    ["throttled" /* THROTTLED */]: `Requests throttled due to {$httpStatus} error. Attempts allowed again after {$time}`
};
const ERROR_FACTORY = new ErrorFactory('appCheck', 'AppCheck', ERRORS);

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
function getRecaptcha(isEnterprise = false) {
    var _a;
    if (isEnterprise) {
        return (_a = self.grecaptcha) === null || _a === void 0 ? void 0 : _a.enterprise;
    }
    return self.grecaptcha;
}
function ensureActivated(app) {
    if (!getState(app).activated) {
        throw ERROR_FACTORY.create("use-before-activation" /* USE_BEFORE_ACTIVATION */, {
            appName: app.name
        });
    }
}
/**
 * Copied from https://stackoverflow.com/a/2117523
 */
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function getDurationString(durationInMillis) {
    const totalSeconds = Math.round(durationInMillis / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds - days * 3600 * 24) / 3600);
    const minutes = Math.floor((totalSeconds - days * 3600 * 24 - hours * 3600) / 60);
    const seconds = totalSeconds - days * 3600 * 24 - hours * 3600 - minutes * 60;
    let result = '';
    if (days) {
        result += pad(days) + 'd:';
    }
    if (hours) {
        result += pad(hours) + 'h:';
    }
    result += pad(minutes) + 'm:' + pad(seconds) + 's';
    return result;
}
function pad(value) {
    if (value === 0) {
        return '00';
    }
    return value >= 10 ? value.toString() : '0' + value;
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
async function exchangeToken({ url, body }, heartbeatServiceProvider) {
    const headers = {
        'Content-Type': 'application/json'
    };
    // If heartbeat service exists, add heartbeat header string to the header.
    const heartbeatService = heartbeatServiceProvider.getImmediate({
        optional: true
    });
    if (heartbeatService) {
        const heartbeatsHeader = await heartbeatService.getHeartbeatsHeader();
        if (heartbeatsHeader) {
            headers['X-Firebase-Client'] = heartbeatsHeader;
        }
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers
    };
    let response;
    try {
        response = await fetch(url, options);
    }
    catch (originalError) {
        throw ERROR_FACTORY.create("fetch-network-error" /* FETCH_NETWORK_ERROR */, {
            originalErrorMessage: originalError.message
        });
    }
    if (response.status !== 200) {
        throw ERROR_FACTORY.create("fetch-status-error" /* FETCH_STATUS_ERROR */, {
            httpStatus: response.status
        });
    }
    let responseBody;
    try {
        // JSON parsing throws SyntaxError if the response body isn't a JSON string.
        responseBody = await response.json();
    }
    catch (originalError) {
        throw ERROR_FACTORY.create("fetch-parse-error" /* FETCH_PARSE_ERROR */, {
            originalErrorMessage: originalError.message
        });
    }
    // Protobuf duration format.
    // https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/Duration
    const match = responseBody.ttl.match(/^([\d.]+)(s)$/);
    if (!match || !match[2] || isNaN(Number(match[1]))) {
        throw ERROR_FACTORY.create("fetch-parse-error" /* FETCH_PARSE_ERROR */, {
            originalErrorMessage: `ttl field (timeToLive) is not in standard Protobuf Duration ` +
                `format: ${responseBody.ttl}`
        });
    }
    const timeToLiveAsNumber = Number(match[1]) * 1000;
    const now = Date.now();
    return {
        token: responseBody.token,
        expireTimeMillis: now + timeToLiveAsNumber,
        issuedAtTimeMillis: now
    };
}
function getExchangeRecaptchaV3TokenRequest(app, reCAPTCHAToken) {
    const { projectId, appId, apiKey } = app.options;
    return {
        url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_RECAPTCHA_TOKEN_METHOD}?key=${apiKey}`,
        body: {
            'recaptcha_v3_token': reCAPTCHAToken
        }
    };
}
function getExchangeRecaptchaEnterpriseTokenRequest(app, reCAPTCHAToken) {
    const { projectId, appId, apiKey } = app.options;
    return {
        url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_RECAPTCHA_ENTERPRISE_TOKEN_METHOD}?key=${apiKey}`,
        body: {
            'recaptcha_enterprise_token': reCAPTCHAToken
        }
    };
}
function getExchangeDebugTokenRequest(app, debugToken) {
    const { projectId, appId, apiKey } = app.options;
    return {
        url: `${BASE_ENDPOINT}/projects/${projectId}/apps/${appId}:${EXCHANGE_DEBUG_TOKEN_METHOD}?key=${apiKey}`,
        body: {
            // eslint-disable-next-line
            debug_token: debugToken
        }
    };
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
const DB_NAME = 'firebase-app-check-database';
const DB_VERSION = 1;
const STORE_NAME = 'firebase-app-check-store';
const DEBUG_TOKEN_KEY = 'debug-token';
let dbPromise = null;
function getDBPromise() {
    if (dbPromise) {
        return dbPromise;
    }
    dbPromise = new Promise((resolve, reject) => {
        try {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onsuccess = event => {
                resolve(event.target.result);
            };
            request.onerror = event => {
                var _a;
                reject(ERROR_FACTORY.create("storage-open" /* STORAGE_OPEN */, {
                    originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
                }));
            };
            request.onupgradeneeded = event => {
                const db = event.target.result;
                // We don't use 'break' in this switch statement, the fall-through
                // behavior is what we want, because if there are multiple versions between
                // the old version and the current version, we want ALL the migrations
                // that correspond to those versions to run, not only the last one.
                // eslint-disable-next-line default-case
                switch (event.oldVersion) {
                    case 0:
                        db.createObjectStore(STORE_NAME, {
                            keyPath: 'compositeKey'
                        });
                }
            };
        }
        catch (e) {
            reject(ERROR_FACTORY.create("storage-open" /* STORAGE_OPEN */, {
                originalErrorMessage: e.message
            }));
        }
    });
    return dbPromise;
}
function readTokenFromIndexedDB(app) {
    return read(computeKey(app));
}
function writeTokenToIndexedDB(app, token) {
    return write(computeKey(app), token);
}
function writeDebugTokenToIndexedDB(token) {
    return write(DEBUG_TOKEN_KEY, token);
}
function readDebugTokenFromIndexedDB() {
    return read(DEBUG_TOKEN_KEY);
}
async function write(key, value) {
    const db = await getDBPromise();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({
        compositeKey: key,
        value
    });
    return new Promise((resolve, reject) => {
        request.onsuccess = _event => {
            resolve();
        };
        transaction.onerror = event => {
            var _a;
            reject(ERROR_FACTORY.create("storage-set" /* STORAGE_WRITE */, {
                originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
            }));
        };
    });
}
async function read(key) {
    const db = await getDBPromise();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);
    return new Promise((resolve, reject) => {
        request.onsuccess = event => {
            const result = event.target.result;
            if (result) {
                resolve(result.value);
            }
            else {
                resolve(undefined);
            }
        };
        transaction.onerror = event => {
            var _a;
            reject(ERROR_FACTORY.create("storage-get" /* STORAGE_GET */, {
                originalErrorMessage: (_a = event.target.error) === null || _a === void 0 ? void 0 : _a.message
            }));
        };
    });
}
function computeKey(app) {
    return `${app.options.appId}-${app.name}`;
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
const logger = new Logger('https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js-check');

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
 * Always resolves. In case of an error reading from indexeddb, resolve with undefined
 */
async function readTokenFromStorage(app) {
    if (isIndexedDBAvailable()) {
        let token = undefined;
        try {
            token = await readTokenFromIndexedDB(app);
        }
        catch (e) {
            // swallow the error and return undefined
            logger.warn(`Failed to read token from IndexedDB. Error: ${e}`);
        }
        return token;
    }
    return undefined;
}
/**
 * Always resolves. In case of an error writing to indexeddb, print a warning and resolve the promise
 */
function writeTokenToStorage(app, token) {
    if (isIndexedDBAvailable()) {
        return writeTokenToIndexedDB(app, token).catch(e => {
            // swallow the error and resolve the promise
            logger.warn(`Failed to write token to IndexedDB. Error: ${e}`);
        });
    }
    return Promise.resolve();
}
async function readOrCreateDebugTokenFromStorage() {
    /**
     * Theoretically race condition can happen if we read, then write in 2 separate transactions.
     * But it won't happen here, because this function will be called exactly once.
     */
    let existingDebugToken = undefined;
    try {
        existingDebugToken = await readDebugTokenFromIndexedDB();
    }
    catch (_e) {
        // failed to read from indexeddb. We assume there is no existing debug token, and generate a new one.
    }
    if (!existingDebugToken) {
        // create a new debug token
        const newToken = uuidv4();
        // We don't need to block on writing to indexeddb
        // In case persistence failed, a new debug token will be generated everytime the page is refreshed.
        // It renders the debug token useless because you have to manually register(whitelist) the new token in the firebase console again and again.
        // If you see this error trying to use debug token, it probably means you are using a browser that doesn't support indexeddb.
        // You should switch to a different browser that supports indexeddb
        writeDebugTokenToIndexedDB(newToken).catch(e => logger.warn(`Failed to persist debug token to IndexedDB. Error: ${e}`));
        return newToken;
    }
    else {
        return existingDebugToken;
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
function isDebugMode() {
    const debugState = getDebugState();
    return debugState.enabled;
}
async function getDebugToken() {
    const state = getDebugState();
    if (state.enabled && state.token) {
        return state.token.promise;
    }
    else {
        // should not happen!
        throw Error(`
            Can't get debug token in production mode.
        `);
    }
}
function initializeDebugMode() {
    const globals = getGlobal();
    const debugState = getDebugState();
    // Set to true if this function has been called, whether or not
    // it enabled debug mode.
    debugState.initialized = true;
    if (typeof globals.FIREBASE_APPCHECK_DEBUG_TOKEN !== 'string' &&
        globals.FIREBASE_APPCHECK_DEBUG_TOKEN !== true) {
        return;
    }
    debugState.enabled = true;
    const deferredToken = new Deferred();
    debugState.token = deferredToken;
    if (typeof globals.FIREBASE_APPCHECK_DEBUG_TOKEN === 'string') {
        deferredToken.resolve(globals.FIREBASE_APPCHECK_DEBUG_TOKEN);
    }
    else {
        deferredToken.resolve(readOrCreateDebugTokenFromStorage());
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
// Initial hardcoded value agreed upon across platforms for initial launch.
// Format left open for possible dynamic error values and other fields in the future.
const defaultTokenErrorData = { error: 'UNKNOWN_ERROR' };
/**
 * Stringify and base64 encode token error data.
 *
 * @param tokenError Error data, currently hardcoded.
 */
function formatDummyToken(tokenErrorData) {
    return base64.encodeString(JSON.stringify(tokenErrorData), 
    /* webSafe= */ false);
}
/**
 * This function always resolves.
 * The result will contain an error field if there is any error.
 * In case there is an error, the token field in the result will be populated with a dummy value
 */
async function getToken$2(appCheck, forceRefresh = false) {
    const app = appCheck.app;
    ensureActivated(app);
    const state = getState(app);
    /**
     * First check if there is a token in memory from a previous `getToken()` call.
     */
    let token = state.token;
    let error = undefined;
    /**
     * If there is no token in memory, try to load token from indexedDB.
     */
    if (!token) {
        // cachedTokenPromise contains the token found in IndexedDB or undefined if not found.
        const cachedToken = await state.cachedTokenPromise;
        if (cachedToken && isValid(cachedToken)) {
            token = cachedToken;
        }
    }
    // Return the cached token (from either memory or indexedDB) if it's valid
    if (!forceRefresh && token && isValid(token)) {
        return {
            token: token.token
        };
    }
    // Only set to true if this `getToken()` call is making the actual
    // REST call to the exchange endpoint, versus waiting for an already
    // in-flight call (see debug and regular exchange endpoint paths below)
    let shouldCallListeners = false;
    /**
     * DEBUG MODE
     * If debug mode is set, and there is no cached token, fetch a new App
     * Check token using the debug token, and return it directly.
     */
    if (isDebugMode()) {
        // Avoid making another call to the exchange endpoint if one is in flight.
        if (!state.exchangeTokenPromise) {
            state.exchangeTokenPromise = exchangeToken(getExchangeDebugTokenRequest(app, await getDebugToken()), appCheck.heartbeatServiceProvider).then(token => {
                state.exchangeTokenPromise = undefined;
                return token;
            });
            shouldCallListeners = true;
        }
        const tokenFromDebugExchange = await state.exchangeTokenPromise;
        // Write debug token to indexedDB.
        await writeTokenToStorage(app, tokenFromDebugExchange);
        // Write debug token to state.
        setState(app, Object.assign(Object.assign({}, state), { token: tokenFromDebugExchange }));
        return { token: tokenFromDebugExchange.token };
    }
    /**
     * request a new token
     */
    try {
        // Avoid making another call to the exchange endpoint if one is in flight.
        if (!state.exchangeTokenPromise) {
            // state.provider is populated in initializeAppCheck()
            // ensureActivated() at the top of this function checks that
            // initializeAppCheck() has been called.
            state.exchangeTokenPromise = state.provider.getToken().then(token => {
                state.exchangeTokenPromise = undefined;
                return token;
            });
            shouldCallListeners = true;
        }
        token = await state.exchangeTokenPromise;
    }
    catch (e) {
        if (e.code === `appCheck/${"throttled" /* THROTTLED */}`) {
            // Warn if throttled, but do not treat it as an error.
            logger.warn(e.message);
        }
        else {
            // `getToken()` should never throw, but logging error text to console will aid debugging.
            logger.error(e);
        }
        // Always save error to be added to dummy token.
        error = e;
    }
    let interopTokenResult;
    if (!token) {
        // if token is undefined, there must be an error.
        // we return a dummy token along with the error
        interopTokenResult = makeDummyTokenResult(error);
    }
    else {
        interopTokenResult = {
            token: token.token
        };
        // write the new token to the memory state as well as the persistent storage.
        // Only do it if we got a valid new token
        setState(app, Object.assign(Object.assign({}, state), { token }));
        await writeTokenToStorage(app, token);
    }
    if (shouldCallListeners) {
        notifyTokenListeners(app, interopTokenResult);
    }
    return interopTokenResult;
}
function addTokenListener(appCheck, type, listener, onError) {
    const { app } = appCheck;
    const state = getState(app);
    const tokenObserver = {
        next: listener,
        error: onError,
        type
    };
    setState(app, Object.assign(Object.assign({}, state), { tokenObservers: [...state.tokenObservers, tokenObserver] }));
    // Invoke the listener async immediately if there is a valid token
    // in memory.
    if (state.token && isValid(state.token)) {
        const validToken = state.token;
        Promise.resolve()
            .then(() => {
            listener({ token: validToken.token });
            initTokenRefresher(appCheck);
        })
            .catch(() => {
            /* we don't care about exceptions thrown in listeners */
        });
    }
    /**
     * Wait for any cached token promise to resolve before starting the token
     * refresher. The refresher checks to see if there is an existing token
     * in state and calls the exchange endpoint if not. We should first let the
     * IndexedDB check have a chance to populate state if it can.
     *
     * Listener call isn't needed here because cachedTokenPromise will call any
     * listeners that exist when it resolves.
     */
    // state.cachedTokenPromise is always populated in `activate()`.
    void state.cachedTokenPromise.then(() => initTokenRefresher(appCheck));
}
function removeTokenListener(app, listener) {
    const state = getState(app);
    const newObservers = state.tokenObservers.filter(tokenObserver => tokenObserver.next !== listener);
    if (newObservers.length === 0 &&
        state.tokenRefresher &&
        state.tokenRefresher.isRunning()) {
        state.tokenRefresher.stop();
    }
    setState(app, Object.assign(Object.assign({}, state), { tokenObservers: newObservers }));
}
/**
 * Logic to create and start refresher as needed.
 */
function initTokenRefresher(appCheck) {
    const { app } = appCheck;
    const state = getState(app);
    // Create the refresher but don't start it if `isTokenAutoRefreshEnabled`
    // is not true.
    let refresher = state.tokenRefresher;
    if (!refresher) {
        refresher = createTokenRefresher(appCheck);
        setState(app, Object.assign(Object.assign({}, state), { tokenRefresher: refresher }));
    }
    if (!refresher.isRunning() && state.isTokenAutoRefreshEnabled) {
        refresher.start();
    }
}
function createTokenRefresher(appCheck) {
    const { app } = appCheck;
    return new Refresher(
    // Keep in mind when this fails for any reason other than the ones
    // for which we should retry, it will effectively stop the proactive refresh.
    async () => {
        const state = getState(app);
        // If there is no token, we will try to load it from storage and use it
        // If there is a token, we force refresh it because we know it's going to expire soon
        let result;
        if (!state.token) {
            result = await getToken$2(appCheck);
        }
        else {
            result = await getToken$2(appCheck, true);
        }
        // getToken() always resolves. In case the result has an error field defined, it means the operation failed, and we should retry.
        if (result.error) {
            throw result.error;
        }
    }, () => {
        return true;
    }, () => {
        const state = getState(app);
        if (state.token) {
            // issuedAtTime + (50% * total TTL) + 5 minutes
            let nextRefreshTimeMillis = state.token.issuedAtTimeMillis +
                (state.token.expireTimeMillis - state.token.issuedAtTimeMillis) *
                    0.5 +
                5 * 60 * 1000;
            // Do not allow refresh time to be past (expireTime - 5 minutes)
            const latestAllowableRefresh = state.token.expireTimeMillis - 5 * 60 * 1000;
            nextRefreshTimeMillis = Math.min(nextRefreshTimeMillis, latestAllowableRefresh);
            return Math.max(0, nextRefreshTimeMillis - Date.now());
        }
        else {
            return 0;
        }
    }, TOKEN_REFRESH_TIME.RETRIAL_MIN_WAIT, TOKEN_REFRESH_TIME.RETRIAL_MAX_WAIT);
}
function notifyTokenListeners(app, token) {
    const observers = getState(app).tokenObservers;
    for (const observer of observers) {
        try {
            if (observer.type === "EXTERNAL" /* EXTERNAL */ && token.error != null) {
                // If this listener was added by a 3P call, send any token error to
                // the supplied error handler. A 3P observer always has an error
                // handler.
                observer.error(token.error);
            }
            else {
                // If the token has no error field, always return the token.
                // If this is a 2P listener, return the token, whether or not it
                // has an error field.
                observer.next(token);
            }
        }
        catch (e) {
            // Errors in the listener function itself are always ignored.
        }
    }
}
function isValid(token) {
    return token.expireTimeMillis - Date.now() > 0;
}
function makeDummyTokenResult(error) {
    return {
        token: formatDummyToken(defaultTokenErrorData),
        error
    };
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
 * AppCheck Service class.
 */
class AppCheckService {
    constructor(app, heartbeatServiceProvider) {
        this.app = app;
        this.heartbeatServiceProvider = heartbeatServiceProvider;
    }
    _delete() {
        const { tokenObservers } = getState(this.app);
        for (const tokenObserver of tokenObservers) {
            removeTokenListener(this.app, tokenObserver.next);
        }
        return Promise.resolve();
    }
}
function factory(app, heartbeatServiceProvider) {
    return new AppCheckService(app, heartbeatServiceProvider);
}
function internalFactory(appCheck) {
    return {
        getToken: forceRefresh => getToken$2(appCheck, forceRefresh),
        addTokenListener: listener => addTokenListener(appCheck, "INTERNAL" /* INTERNAL */, listener),
        removeTokenListener: listener => removeTokenListener(appCheck.app, listener)
    };
}

const name = "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js-check";
const version = "0.5.8";

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
const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api.js';
const RECAPTCHA_ENTERPRISE_URL = 'https://www.google.com/recaptcha/enterprise.js';
function initializeV3(app, siteKey) {
    const state = getState(app);
    const initialized = new Deferred();
    setState(app, Object.assign(Object.assign({}, state), { reCAPTCHAState: { initialized } }));
    const divId = makeDiv(app);
    const grecaptcha = getRecaptcha(false);
    if (!grecaptcha) {
        loadReCAPTCHAV3Script(() => {
            const grecaptcha = getRecaptcha(false);
            if (!grecaptcha) {
                // it shouldn't happen.
                throw new Error('no recaptcha');
            }
            queueWidgetRender(app, siteKey, grecaptcha, divId, initialized);
        });
    }
    else {
        queueWidgetRender(app, siteKey, grecaptcha, divId, initialized);
    }
    return initialized.promise;
}
function initializeEnterprise(app, siteKey) {
    const state = getState(app);
    const initialized = new Deferred();
    setState(app, Object.assign(Object.assign({}, state), { reCAPTCHAState: { initialized } }));
    const divId = makeDiv(app);
    const grecaptcha = getRecaptcha(true);
    if (!grecaptcha) {
        loadReCAPTCHAEnterpriseScript(() => {
            const grecaptcha = getRecaptcha(true);
            if (!grecaptcha) {
                // it shouldn't happen.
                throw new Error('no recaptcha');
            }
            queueWidgetRender(app, siteKey, grecaptcha, divId, initialized);
        });
    }
    else {
        queueWidgetRender(app, siteKey, grecaptcha, divId, initialized);
    }
    return initialized.promise;
}
/**
 * Add listener to render the widget and resolve the promise when
 * the grecaptcha.ready() event fires.
 */
function queueWidgetRender(app, siteKey, grecaptcha, container, initialized) {
    grecaptcha.ready(() => {
        // Invisible widgets allow us to set a different siteKey for each widget,
        // so we use them to support multiple apps
        renderInvisibleWidget(app, siteKey, grecaptcha, container);
        initialized.resolve(grecaptcha);
    });
}
/**
 * Add invisible div to page.
 */
function makeDiv(app) {
    const divId = `fire_app_check_${app.name}`;
    const invisibleDiv = document.createElement('div');
    invisibleDiv.id = divId;
    invisibleDiv.style.display = 'none';
    document.body.appendChild(invisibleDiv);
    return divId;
}
async function getToken$1(app) {
    ensureActivated(app);
    // ensureActivated() guarantees that reCAPTCHAState is set
    const reCAPTCHAState = getState(app).reCAPTCHAState;
    const recaptcha = await reCAPTCHAState.initialized.promise;
    return new Promise((resolve, _reject) => {
        // Updated after initialization is complete.
        const reCAPTCHAState = getState(app).reCAPTCHAState;
        recaptcha.ready(() => {
            resolve(
            // widgetId is guaranteed to be available if reCAPTCHAState.initialized.promise resolved.
            recaptcha.execute(reCAPTCHAState.widgetId, {
                action: 'fire_app_check'
            }));
        });
    });
}
/**
 *
 * @param app
 * @param container - Id of a HTML element.
 */
function renderInvisibleWidget(app, siteKey, grecaptcha, container) {
    const widgetId = grecaptcha.render(container, {
        sitekey: siteKey,
        size: 'invisible'
    });
    const state = getState(app);
    setState(app, Object.assign(Object.assign({}, state), { reCAPTCHAState: Object.assign(Object.assign({}, state.reCAPTCHAState), { // state.reCAPTCHAState is set in the initialize()
            widgetId }) }));
}
function loadReCAPTCHAV3Script(onload) {
    const script = document.createElement('script');
    script.src = RECAPTCHA_URL;
    script.onload = onload;
    document.head.appendChild(script);
}
function loadReCAPTCHAEnterpriseScript(onload) {
    const script = document.createElement('script');
    script.src = RECAPTCHA_ENTERPRISE_URL;
    script.onload = onload;
    document.head.appendChild(script);
}

/**
 * @license
 * Copyright 2021 Google LLC
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
 * App Check provider that can obtain a reCAPTCHA V3 token and exchange it
 * for an App Check token.
 *
 * @public
 */
class ReCaptchaV3Provider {
    /**
     * Create a ReCaptchaV3Provider instance.
     * @param siteKey - ReCAPTCHA V3 siteKey.
     */
    constructor(_siteKey) {
        this._siteKey = _siteKey;
        /**
         * Throttle requests on certain error codes to prevent too many retries
         * in a short time.
         */
        this._throttleData = null;
    }
    /**
     * Returns an App Check token.
     * @internal
     */
    async getToken() {
        var _a;
        throwIfThrottled(this._throttleData);
        // Top-level `getToken()` has already checked that App Check is initialized
        // and therefore this._app and this._heartbeatServiceProvider are available.
        const attestedClaimsToken = await getToken$1(this._app).catch(_e => {
            // reCaptcha.execute() throws null which is not very descriptive.
            throw ERROR_FACTORY.create("recaptcha-error" /* RECAPTCHA_ERROR */);
        });
        let result;
        try {
            result = await exchangeToken(getExchangeRecaptchaV3TokenRequest(this._app, attestedClaimsToken), this._heartbeatServiceProvider);
        }
        catch (e) {
            if (e.code === "fetch-status-error" /* FETCH_STATUS_ERROR */) {
                this._throttleData = setBackoff(Number((_a = e.customData) === null || _a === void 0 ? void 0 : _a.httpStatus), this._throttleData);
                throw ERROR_FACTORY.create("throttled" /* THROTTLED */, {
                    time: getDurationString(this._throttleData.allowRequestsAfter - Date.now()),
                    httpStatus: this._throttleData.httpStatus
                });
            }
            else {
                throw e;
            }
        }
        // If successful, clear throttle data.
        this._throttleData = null;
        return result;
    }
    /**
     * @internal
     */
    initialize(app) {
        this._app = app;
        this._heartbeatServiceProvider = _getProvider(app, 'heartbeat');
        initializeV3(app, this._siteKey).catch(() => {
            /* we don't care about the initialization result */
        });
    }
    /**
     * @internal
     */
    isEqual(otherProvider) {
        if (otherProvider instanceof ReCaptchaV3Provider) {
            return this._siteKey === otherProvider._siteKey;
        }
        else {
            return false;
        }
    }
}
/**
 * App Check provider that can obtain a reCAPTCHA Enterprise token and exchange it
 * for an App Check token.
 *
 * @public
 */
class ReCaptchaEnterpriseProvider {
    /**
     * Create a ReCaptchaEnterpriseProvider instance.
     * @param siteKey - reCAPTCHA Enterprise score-based site key.
     */
    constructor(_siteKey) {
        this._siteKey = _siteKey;
        /**
         * Throttle requests on certain error codes to prevent too many retries
         * in a short time.
         */
        this._throttleData = null;
    }
    /**
     * Returns an App Check token.
     * @internal
     */
    async getToken() {
        var _a;
        throwIfThrottled(this._throttleData);
        // Top-level `getToken()` has already checked that App Check is initialized
        // and therefore this._app and this._heartbeatServiceProvider are available.
        const attestedClaimsToken = await getToken$1(this._app).catch(_e => {
            // reCaptcha.execute() throws null which is not very descriptive.
            throw ERROR_FACTORY.create("recaptcha-error" /* RECAPTCHA_ERROR */);
        });
        let result;
        try {
            result = await exchangeToken(getExchangeRecaptchaEnterpriseTokenRequest(this._app, attestedClaimsToken), this._heartbeatServiceProvider);
        }
        catch (e) {
            if (e.code === "fetch-status-error" /* FETCH_STATUS_ERROR */) {
                this._throttleData = setBackoff(Number((_a = e.customData) === null || _a === void 0 ? void 0 : _a.httpStatus), this._throttleData);
                throw ERROR_FACTORY.create("throttled" /* THROTTLED */, {
                    time: getDurationString(this._throttleData.allowRequestsAfter - Date.now()),
                    httpStatus: this._throttleData.httpStatus
                });
            }
            else {
                throw e;
            }
        }
        // If successful, clear throttle data.
        this._throttleData = null;
        return result;
    }
    /**
     * @internal
     */
    initialize(app) {
        this._app = app;
        this._heartbeatServiceProvider = _getProvider(app, 'heartbeat');
        initializeEnterprise(app, this._siteKey).catch(() => {
            /* we don't care about the initialization result */
        });
    }
    /**
     * @internal
     */
    isEqual(otherProvider) {
        if (otherProvider instanceof ReCaptchaEnterpriseProvider) {
            return this._siteKey === otherProvider._siteKey;
        }
        else {
            return false;
        }
    }
}
/**
 * Custom provider class.
 * @public
 */
class CustomProvider {
    constructor(_customProviderOptions) {
        this._customProviderOptions = _customProviderOptions;
    }
    /**
     * @internal
     */
    async getToken() {
        // custom provider
        const customToken = await this._customProviderOptions.getToken();
        // Try to extract IAT from custom token, in case this token is not
        // being newly issued. JWT timestamps are in seconds since epoch.
        const issuedAtTimeSeconds = issuedAtTime(customToken.token);
        // Very basic validation, use current timestamp as IAT if JWT
        // has no `iat` field or value is out of bounds.
        const issuedAtTimeMillis = issuedAtTimeSeconds !== null &&
            issuedAtTimeSeconds < Date.now() &&
            issuedAtTimeSeconds > 0
            ? issuedAtTimeSeconds * 1000
            : Date.now();
        return Object.assign(Object.assign({}, customToken), { issuedAtTimeMillis });
    }
    /**
     * @internal
     */
    initialize(app) {
        this._app = app;
    }
    /**
     * @internal
     */
    isEqual(otherProvider) {
        if (otherProvider instanceof CustomProvider) {
            return (this._customProviderOptions.getToken.toString() ===
                otherProvider._customProviderOptions.getToken.toString());
        }
        else {
            return false;
        }
    }
}
/**
 * Set throttle data to block requests until after a certain time
 * depending on the failed request's status code.
 * @param httpStatus - Status code of failed request.
 * @param throttleData - `ThrottleData` object containing previous throttle
 * data state.
 * @returns Data about current throttle state and expiration time.
 */
function setBackoff(httpStatus, throttleData) {
    /**
     * Block retries for 1 day for the following error codes:
     *
     * 404: Likely malformed URL.
     *
     * 403:
     * - Attestation failed
     * - Wrong API key
     * - Project deleted
     */
    if (httpStatus === 404 || httpStatus === 403) {
        return {
            backoffCount: 1,
            allowRequestsAfter: Date.now() + ONE_DAY,
            httpStatus
        };
    }
    else {
        /**
         * For all other error codes, the time when it is ok to retry again
         * is based on exponential backoff.
         */
        const backoffCount = throttleData ? throttleData.backoffCount : 0;
        const backoffMillis = calculateBackoffMillis(backoffCount, 1000, 2);
        return {
            backoffCount: backoffCount + 1,
            allowRequestsAfter: Date.now() + backoffMillis,
            httpStatus
        };
    }
}
function throwIfThrottled(throttleData) {
    if (throttleData) {
        if (Date.now() - throttleData.allowRequestsAfter <= 0) {
            // If before, throw.
            throw ERROR_FACTORY.create("throttled" /* THROTTLED */, {
                time: getDurationString(throttleData.allowRequestsAfter - Date.now()),
                httpStatus: throttleData.httpStatus
            });
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
 * Activate App Check for the given app. Can be called only once per app.
 * @param app - the {@link https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js#FirebaseApp} to activate App Check for
 * @param options - App Check initialization options
 * @public
 */
function initializeAppCheck(app = getApp(), options) {
    app = getModularInstance(app);
    const provider = _getProvider(app, 'app-check');
    // Ensure initializeDebugMode() is only called once.
    if (!getDebugState().initialized) {
        initializeDebugMode();
    }
    // Log a message containing the debug token when `initializeAppCheck()`
    // is called in debug mode.
    if (isDebugMode()) {
        // Do not block initialization to get the token for the message.
        void getDebugToken().then(token => 
        // Not using logger because I don't think we ever want this accidentally hidden.
        console.log(`App Check debug token: ${token}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`));
    }
    if (provider.isInitialized()) {
        const existingInstance = provider.getImmediate();
        const initialOptions = provider.getOptions();
        if (initialOptions.isTokenAutoRefreshEnabled ===
            options.isTokenAutoRefreshEnabled &&
            initialOptions.provider.isEqual(options.provider)) {
            return existingInstance;
        }
        else {
            throw ERROR_FACTORY.create("already-initialized" /* ALREADY_INITIALIZED */, {
                appName: app.name
            });
        }
    }
    const appCheck = provider.initialize({ options });
    _activate(app, options.provider, options.isTokenAutoRefreshEnabled);
    // If isTokenAutoRefreshEnabled is false, do not send any requests to the
    // exchange endpoint without an explicit call from the user either directly
    // or through another Firebase library (storage, functions, etc.)
    if (getState(app).isTokenAutoRefreshEnabled) {
        // Adding a listener will start the refresher and fetch a token if needed.
        // This gets a token ready and prevents a delay when an internal library
        // requests the token.
        // Listener function does not need to do anything, its base functionality
        // of calling getToken() already fetches token and writes it to memory/storage.
        addTokenListener(appCheck, "INTERNAL" /* INTERNAL */, () => { });
    }
    return appCheck;
}
/**
 * Activate App Check
 * @param app - Firebase app to activate App Check for.
 * @param provider - reCAPTCHA v3 provider or
 * custom token provider.
 * @param isTokenAutoRefreshEnabled - If true, the SDK automatically
 * refreshes App Check tokens as needed. If undefined, defaults to the
 * value of `app.automaticDataCollectionEnabled`, which defaults to
 * false and can be set in the app config.
 */
function _activate(app, provider, isTokenAutoRefreshEnabled) {
    const state = getState(app);
    const newState = Object.assign(Object.assign({}, state), { activated: true });
    newState.provider = provider; // Read cached token from storage if it exists and store it in memory.
    newState.cachedTokenPromise = readTokenFromStorage(app).then(cachedToken => {
        if (cachedToken && isValid(cachedToken)) {
            setState(app, Object.assign(Object.assign({}, getState(app)), { token: cachedToken }));
            // notify all listeners with the cached token
            notifyTokenListeners(app, { token: cachedToken.token });
        }
        return cachedToken;
    });
    // Use value of global `automaticDataCollectionEnabled` (which
    // itself defaults to false if not specified in config) if
    // `isTokenAutoRefreshEnabled` param was not provided by user.
    newState.isTokenAutoRefreshEnabled =
        isTokenAutoRefreshEnabled === undefined
            ? app.automaticDataCollectionEnabled
            : isTokenAutoRefreshEnabled;
    setState(app, newState);
    newState.provider.initialize(app);
}
/**
 * Set whether App Check will automatically refresh tokens as needed.
 *
 * @param appCheckInstance - The App Check service instance.
 * @param isTokenAutoRefreshEnabled - If true, the SDK automatically
 * refreshes App Check tokens as needed. This overrides any value set
 * during `initializeAppCheck()`.
 * @public
 */
function setTokenAutoRefreshEnabled(appCheckInstance, isTokenAutoRefreshEnabled) {
    const app = appCheckInstance.app;
    const state = getState(app);
    // This will exist if any product libraries have called
    // `addTokenListener()`
    if (state.tokenRefresher) {
        if (isTokenAutoRefreshEnabled === true) {
            state.tokenRefresher.start();
        }
        else {
            state.tokenRefresher.stop();
        }
    }
    setState(app, Object.assign(Object.assign({}, state), { isTokenAutoRefreshEnabled }));
}
/**
 * Get the current App Check token. Attaches to the most recent
 * in-flight request if one is present. Returns null if no token
 * is present and no token requests are in-flight.
 *
 * @param appCheckInstance - The App Check service instance.
 * @param forceRefresh - If true, will always try to fetch a fresh token.
 * If false, will use a cached token if found in storage.
 * @public
 */
async function getToken(appCheckInstance, forceRefresh) {
    const result = await getToken$2(appCheckInstance, forceRefresh);
    if (result.error) {
        throw result.error;
    }
    return { token: result.token };
}
/**
 * Wraps `addTokenListener`/`removeTokenListener` methods in an `Observer`
 * pattern for public use.
 */
function onTokenChanged(appCheckInstance, onNextOrObserver, onError, 
/**
 * NOTE: Although an `onCompletion` callback can be provided, it will
 * never be called because the token stream is never-ending.
 * It is added only for API consistency with the observer pattern, which
 * we follow in JS APIs.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
onCompletion) {
    let nextFn = () => { };
    let errorFn = () => { };
    if (onNextOrObserver.next != null) {
        nextFn = onNextOrObserver.next.bind(onNextOrObserver);
    }
    else {
        nextFn = onNextOrObserver;
    }
    if (onNextOrObserver.error != null) {
        errorFn = onNextOrObserver.error.bind(onNextOrObserver);
    }
    else if (onError) {
        errorFn = onError;
    }
    addTokenListener(appCheckInstance, "EXTERNAL" /* EXTERNAL */, nextFn, errorFn);
    return () => removeTokenListener(appCheckInstance.app, nextFn);
}

/**
 * Firebase App Check
 *
 * @packageDocumentation
 */
const APP_CHECK_NAME = 'app-check';
const APP_CHECK_NAME_INTERNAL = 'app-check-internal';
function registerAppCheck() {
    // The public interface
    _registerComponent(new Component(APP_CHECK_NAME, container => {
        // getImmediate for FirebaseApp will always succeed
        const app = container.getProvider('app').getImmediate();
        const heartbeatServiceProvider = container.getProvider('heartbeat');
        return factory(app, heartbeatServiceProvider);
    }, "PUBLIC" /* PUBLIC */)
        .setInstantiationMode("EXPLICIT" /* EXPLICIT */)
        /**
         * Initialize app-check-internal after app-check is initialized to make AppCheck available to
         * other Firebase SDKs
         */
        .setInstanceCreatedCallback((container, _identifier, _appcheckService) => {
        container.getProvider(APP_CHECK_NAME_INTERNAL).initialize();
    }));
    // The internal interface used by other Firebase products
    _registerComponent(new Component(APP_CHECK_NAME_INTERNAL, container => {
        const appCheck = container.getProvider('app-check').getImmediate();
        return internalFactory(appCheck);
    }, "PUBLIC" /* PUBLIC */).setInstantiationMode("EXPLICIT" /* EXPLICIT */));
    registerVersion(name, version);
}
registerAppCheck();

export { CustomProvider, ReCaptchaEnterpriseProvider, ReCaptchaV3Provider, getToken, initializeAppCheck, onTokenChanged, setTokenAutoRefreshEnabled };

//# sourceMappingURL=firebase-app-check.js.map
