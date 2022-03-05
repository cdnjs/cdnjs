import { _registerComponent, registerVersion, _getProvider, getApp, _removeServiceInstance, SDK_VERSION } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

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
 * URL-safe base64 encoding
 */
const base64Encode = function (str) {
    const utf8Bytes = stringToByteArray$1(str);
    return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 encoding (without "." padding in the end).
 * e.g. Used in JSON Web Token (JWT) parts.
 */
const base64urlEncodeWithoutPadding = function (str) {
    // Use base64url encoding and remove padding in the end (dot characters).
    return base64Encode(str).replace(/\./g, '');
};

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
function createMockUserToken(token, projectId) {
    if (token.uid) {
        throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
    }
    // Unsecured JWTs use "none" as the algorithm.
    const header = {
        alg: 'none',
        type: 'JWT'
    };
    const project = projectId || 'demo-project';
    const iat = token.iat || 0;
    const sub = token.sub || token.user_id;
    if (!sub) {
        throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
    }
    const payload = Object.assign({ 
        // Set all required fields to decent defaults
        iss: `https://securetoken.google.com/${project}`, aud: project, iat, exp: iat + 3600, auth_time: iat, sub, user_id: sub, firebase: {
            sign_in_provider: 'custom',
            identities: {}
        } }, token);
    // Unsecured JWTs use the empty string as a signature.
    const signature = '';
    return [
        base64urlEncodeWithoutPadding(JSON.stringify(header)),
        base64urlEncodeWithoutPadding(JSON.stringify(payload)),
        signature
    ].join('.');
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
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/
function isNode() {
    try {
        return (Object.prototype.toString.call(global.process) === '[object process]');
    }
    catch (e) {
        return false;
    }
}
function isBrowserExtension() {
    const runtime = typeof chrome === 'object'
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
/** Detects Electron apps. */
function isElectron() {
    return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */
function isIE() {
    const ua = getUA();
    return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */
function isUWP() {
    return getUA().indexOf('MSAppHost/') >= 0;
}
/** Returns true if we are running in Safari. */
function isSafari() {
    return (!isNode() &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome'));
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */
function isIndexedDBAvailable() {
    return typeof indexedDB === 'object';
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
 * Deep equal two objects. Support Arrays and Objects.
 */
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    for (const k of aKeys) {
        if (!bKeys.includes(k)) {
            return false;
        }
        const aProp = a[k];
        const bProp = b[k];
        if (isObject(aProp) && isObject(bProp)) {
            if (!deepEqual(aProp, bProp)) {
                return false;
            }
        }
        else if (aProp !== bProp) {
            return false;
        }
    }
    for (const k of bKeys) {
        if (!aKeys.includes(k)) {
            return false;
        }
    }
    return true;
}
function isObject(thing) {
    return thing !== null && typeof thing === 'object';
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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var k$1,goog=goog||{},l=commonjsGlobal||self;function aa$1(){}function ba$1(a){var b=typeof a;b="object"!=b?b:a?Array.isArray(a)?"array":b:"null";return "array"==b||"object"==b&&"number"==typeof a.length}function p(a){var b=typeof a;return "object"==b&&null!=a||"function"==b}function da$1(a){return Object.prototype.hasOwnProperty.call(a,ea$1)&&a[ea$1]||(a[ea$1]=++fa$1)}var ea$1="closure_uid_"+(1E9*Math.random()>>>0),fa$1=0;function ha$1(a,b,c){return a.call.apply(a.bind,arguments)}
function ia$1(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}function q$1(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?q$1=ha$1:q$1=ia$1;return q$1.apply(null,arguments)}
function ja$1(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}function t(a,b){function c(){}c.prototype=b.prototype;a.Z=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Vb=function(d,e,f){for(var h=Array(arguments.length-2),n=2;n<arguments.length;n++)h[n-2]=arguments[n];return b.prototype[e].apply(d,h)};}function v(){this.s=this.s;this.o=this.o;}var ka$1=0,la$1={};v.prototype.s=!1;v.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),0!=ka$1)){var a=da$1(this);delete la$1[a];}};v.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()();};const ma$1=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return "string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);for(let c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return -1},na$1=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c);}:function(a,b,c){const d=a.length,e="string"===typeof a?a.split(""):a;for(let f=0;f<d;f++)f in e&&b.call(c,e[f],f,a);};
function oa$1(a){a:{var b=pa$1;const c=a.length,d="string"===typeof a?a.split(""):a;for(let e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1;}return 0>b?null:"string"===typeof a?a.charAt(b):a[b]}function qa$1(a){return Array.prototype.concat.apply([],arguments)}function ra$1(a){const b=a.length;if(0<b){const c=Array(b);for(let d=0;d<b;d++)c[d]=a[d];return c}return []}function sa$1(a){return /^[\s\xa0]*$/.test(a)}var ta$1=String.prototype.trim?function(a){return a.trim()}:function(a){return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};function w(a,b){return -1!=a.indexOf(b)}function ua$1(a,b){return a<b?-1:a>b?1:0}var x$1;a:{var va$1=l.navigator;if(va$1){var wa$1=va$1.userAgent;if(wa$1){x$1=wa$1;break a}}x$1="";}function xa$1(a,b,c){for(const d in a)b.call(c,a[d],d,a);}function ya$1(a){const b={};for(const c in a)b[c]=a[c];return b}var za$1="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Aa$1(a,b){let c,d;for(let e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(let f=0;f<za$1.length;f++)c=za$1[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c]);}}function Ca$1(a){Ca$1[" "](a);return a}Ca$1[" "]=aa$1;function Fa$1(a){var b=Ga$1;return Object.prototype.hasOwnProperty.call(b,9)?b[9]:b[9]=a(9)}var Ha$1=w(x$1,"Opera"),y=w(x$1,"Trident")||w(x$1,"MSIE"),Ia$1=w(x$1,"Edge"),Ja$1=Ia$1||y,Ka$1=w(x$1,"Gecko")&&!(w(x$1.toLowerCase(),"webkit")&&!w(x$1,"Edge"))&&!(w(x$1,"Trident")||w(x$1,"MSIE"))&&!w(x$1,"Edge"),La$1=w(x$1.toLowerCase(),"webkit")&&!w(x$1,"Edge");function Ma$1(){var a=l.document;return a?a.documentMode:void 0}var Na$1;
a:{var Oa$1="",Pa$1=function(){var a=x$1;if(Ka$1)return /rv:([^\);]+)(\)|;)/.exec(a);if(Ia$1)return /Edge\/([\d\.]+)/.exec(a);if(y)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(La$1)return /WebKit\/(\S+)/.exec(a);if(Ha$1)return /(?:Version)[ \/]?(\S+)/.exec(a)}();Pa$1&&(Oa$1=Pa$1?Pa$1[1]:"");if(y){var Qa$1=Ma$1();if(null!=Qa$1&&Qa$1>parseFloat(Oa$1)){Na$1=String(Qa$1);break a}}Na$1=Oa$1;}var Ga$1={};
function Ra$1(){return Fa$1(function(){let a=0;const b=ta$1(String(Na$1)).split("."),c=ta$1("9").split("."),d=Math.max(b.length,c.length);for(let h=0;0==a&&h<d;h++){var e=b[h]||"",f=c[h]||"";do{e=/(\d*)(\D*)(.*)/.exec(e)||["","","",""];f=/(\d*)(\D*)(.*)/.exec(f)||["","","",""];if(0==e[0].length&&0==f[0].length)break;a=ua$1(0==e[1].length?0:parseInt(e[1],10),0==f[1].length?0:parseInt(f[1],10))||ua$1(0==e[2].length,0==f[2].length)||ua$1(e[2],f[2]);e=e[3];f=f[3];}while(0==a)}return 0<=a})}var Sa$1;
if(l.document&&y){var Ta$1=Ma$1();Sa$1=Ta$1?Ta$1:parseInt(Na$1,10)||void 0;}else Sa$1=void 0;var Ua$1=Sa$1;var Va$1=function(){if(!l.addEventListener||!Object.defineProperty)return !1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0;}});try{l.addEventListener("test",aa$1,b),l.removeEventListener("test",aa$1,b);}catch(c){}return a}();function z$1(a,b){this.type=a;this.g=this.target=b;this.defaultPrevented=!1;}z$1.prototype.h=function(){this.defaultPrevented=!0;};function A(a,b){z$1.call(this,a?a.type:"");this.relatedTarget=this.g=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.i=null;if(a){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.g=b;if(b=a.relatedTarget){if(Ka$1){a:{try{Ca$1(b.nodeName);var e=!0;break a}catch(f){}e=
!1;}e||(b=null);}}else "mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.key=a.key||"";this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=
a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:Wa$1[a.pointerType]||"";this.state=a.state;this.i=a;a.defaultPrevented&&A.Z.h.call(this);}}t(A,z$1);var Wa$1={2:"touch",3:"pen",4:"mouse"};A.prototype.h=function(){A.Z.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1;};var B$1="closure_listenable_"+(1E6*Math.random()|0);var Xa$1=0;function Ya$1(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.ia=e;this.key=++Xa$1;this.ca=this.fa=!1;}function Za$1(a){a.ca=!0;a.listener=null;a.proxy=null;a.src=null;a.ia=null;}function $a$1(a){this.src=a;this.g={};this.h=0;}$a$1.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.g[f];a||(a=this.g[f]=[],this.h++);var h=ab(a,b,d,e);-1<h?(b=a[h],c||(b.fa=!1)):(b=new Ya$1(b,this.src,f,!!d,e),b.fa=c,a.push(b));return b};function bb(a,b){var c=b.type;if(c in a.g){var d=a.g[c],e=ma$1(d,b),f;(f=0<=e)&&Array.prototype.splice.call(d,e,1);f&&(Za$1(b),0==a.g[c].length&&(delete a.g[c],a.h--));}}
function ab(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.ca&&f.listener==b&&f.capture==!!c&&f.ia==d)return e}return -1}var cb="closure_lm_"+(1E6*Math.random()|0),db={};function fb(a,b,c,d,e){if(d&&d.once)return gb(a,b,c,d,e);if(Array.isArray(b)){for(var f=0;f<b.length;f++)fb(a,b[f],c,d,e);return null}c=hb(c);return a&&a[B$1]?a.N(b,c,p(d)?!!d.capture:!!d,e):ib(a,b,c,!1,d,e)}
function ib(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var h=p(e)?!!e.capture:!!e,n=jb(a);n||(a[cb]=n=new $a$1(a));c=n.add(b,c,d,h,f);if(c.proxy)return c;d=kb();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)Va$1||(e=h),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(lb(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return c}
function kb(){function a(c){return b.call(a.src,a.listener,c)}var b=mb;return a}function gb(a,b,c,d,e){if(Array.isArray(b)){for(var f=0;f<b.length;f++)gb(a,b[f],c,d,e);return null}c=hb(c);return a&&a[B$1]?a.O(b,c,p(d)?!!d.capture:!!d,e):ib(a,b,c,!0,d,e)}
function nb(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)nb(a,b[f],c,d,e);else (d=p(d)?!!d.capture:!!d,c=hb(c),a&&a[B$1])?(a=a.i,b=String(b).toString(),b in a.g&&(f=a.g[b],c=ab(f,c,d,e),-1<c&&(Za$1(f[c]),Array.prototype.splice.call(f,c,1),0==f.length&&(delete a.g[b],a.h--)))):a&&(a=jb(a))&&(b=a.g[b.toString()],a=-1,b&&(a=ab(b,c,d,e)),(c=-1<a?b[a]:null)&&ob(c));}
function ob(a){if("number"!==typeof a&&a&&!a.ca){var b=a.src;if(b&&b[B$1])bb(b.i,a);else {var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(lb(c),d):b.addListener&&b.removeListener&&b.removeListener(d);(c=jb(b))?(bb(c,a),0==c.h&&(c.src=null,b[cb]=null)):Za$1(a);}}}function lb(a){return a in db?db[a]:db[a]="on"+a}function mb(a,b){if(a.ca)a=!0;else {b=new A(b,this);var c=a.listener,d=a.ia||a.src;a.fa&&ob(a);a=c.call(d,b);}return a}
function jb(a){a=a[cb];return a instanceof $a$1?a:null}var pb="__closure_events_fn_"+(1E9*Math.random()>>>0);function hb(a){if("function"===typeof a)return a;a[pb]||(a[pb]=function(b){return a.handleEvent(b)});return a[pb]}function C$1(){v.call(this);this.i=new $a$1(this);this.P=this;this.I=null;}t(C$1,v);C$1.prototype[B$1]=!0;C$1.prototype.removeEventListener=function(a,b,c,d){nb(this,a,b,c,d);};
function D$1(a,b){var c,d=a.I;if(d)for(c=[];d;d=d.I)c.push(d);a=a.P;d=b.type||b;if("string"===typeof b)b=new z$1(b,a);else if(b instanceof z$1)b.target=b.target||a;else {var e=b;b=new z$1(d,a);Aa$1(b,e);}e=!0;if(c)for(var f=c.length-1;0<=f;f--){var h=b.g=c[f];e=qb(h,d,!0,b)&&e;}h=b.g=a;e=qb(h,d,!0,b)&&e;e=qb(h,d,!1,b)&&e;if(c)for(f=0;f<c.length;f++)h=b.g=c[f],e=qb(h,d,!1,b)&&e;}
C$1.prototype.M=function(){C$1.Z.M.call(this);if(this.i){var a=this.i,c;for(c in a.g){for(var d=a.g[c],e=0;e<d.length;e++)Za$1(d[e]);delete a.g[c];a.h--;}}this.I=null;};C$1.prototype.N=function(a,b,c,d){return this.i.add(String(a),b,!1,c,d)};C$1.prototype.O=function(a,b,c,d){return this.i.add(String(a),b,!0,c,d)};
function qb(a,b,c,d){b=a.i.g[String(b)];if(!b)return !0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var h=b[f];if(h&&!h.ca&&h.capture==c){var n=h.listener,u=h.ia||h.src;h.fa&&bb(a.i,h);e=!1!==n.call(u,d)&&e;}}return e&&!d.defaultPrevented}var rb=l.JSON.stringify;function sb(){var a=tb;let b=null;a.g&&(b=a.g,a.g=a.g.next,a.g||(a.h=null),b.next=null);return b}class ub{constructor(){this.h=this.g=null;}add(a,b){const c=vb.get();c.set(a,b);this.h?this.h.next=c:this.g=c;this.h=c;}}var vb=new class{constructor(a,b){this.i=a;this.j=b;this.h=0;this.g=null;}get(){let a;0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i();return a}}(()=>new wb,a=>a.reset());
class wb{constructor(){this.next=this.g=this.h=null;}set(a,b){this.h=a;this.g=b;this.next=null;}reset(){this.next=this.g=this.h=null;}}function yb(a){l.setTimeout(()=>{throw a;},0);}function zb(a,b){Ab||Bb();Cb||(Ab(),Cb=!0);tb.add(a,b);}var Ab;function Bb(){var a=l.Promise.resolve(void 0);Ab=function(){a.then(Db);};}var Cb=!1,tb=new ub;function Db(){for(var a;a=sb();){try{a.h.call(a.g);}catch(c){yb(c);}var b=vb;b.j(a);100>b.h&&(b.h++,a.next=b.g,b.g=a);}Cb=!1;}function Eb(a,b){C$1.call(this);this.h=a||1;this.g=b||l;this.j=q$1(this.kb,this);this.l=Date.now();}t(Eb,C$1);k$1=Eb.prototype;k$1.da=!1;k$1.S=null;k$1.kb=function(){if(this.da){var a=Date.now()-this.l;0<a&&a<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-a):(this.S&&(this.g.clearTimeout(this.S),this.S=null),D$1(this,"tick"),this.da&&(Fb(this),this.start()));}};k$1.start=function(){this.da=!0;this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now());};
function Fb(a){a.da=!1;a.S&&(a.g.clearTimeout(a.S),a.S=null);}k$1.M=function(){Eb.Z.M.call(this);Fb(this);delete this.g;};function Gb(a,b,c){if("function"===typeof a)c&&(a=q$1(a,c));else if(a&&"function"==typeof a.handleEvent)a=q$1(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:l.setTimeout(a,b||0)}function Hb(a){a.g=Gb(()=>{a.g=null;a.i&&(a.i=!1,Hb(a));},a.j);const b=a.h;a.h=null;a.m.apply(null,b);}class Ib extends v{constructor(a,b){super();this.m=a;this.j=b;this.h=null;this.i=!1;this.g=null;}l(a){this.h=arguments;this.g?this.i=!0:Hb(this);}M(){super.M();this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null);}}function E(a){v.call(this);this.h=a;this.g={};}t(E,v);var Jb=[];function Kb(a,b,c,d){Array.isArray(c)||(c&&(Jb[0]=c.toString()),c=Jb);for(var e=0;e<c.length;e++){var f=fb(b,c[e],d||a.handleEvent,!1,a.h||a);if(!f)break;a.g[f.key]=f;}}function Lb(a){xa$1(a.g,function(b,c){this.g.hasOwnProperty(c)&&ob(b);},a);a.g={};}E.prototype.M=function(){E.Z.M.call(this);Lb(this);};E.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};function Mb(){this.g=!0;}Mb.prototype.Aa=function(){this.g=!1;};function Nb(a,b,c,d,e,f){a.info(function(){if(a.g)if(f){var h="";for(var n=f.split("&"),u=0;u<n.length;u++){var m=n[u].split("=");if(1<m.length){var r=m[0];m=m[1];var G=r.split("_");h=2<=G.length&&"type"==G[1]?h+(r+"="+m+"&"):h+(r+"=redacted&");}}}else h=null;else h=f;return "XMLHTTP REQ ("+d+") [attempt "+e+"]: "+b+"\n"+c+"\n"+h});}
function Ob(a,b,c,d,e,f,h){a.info(function(){return "XMLHTTP RESP ("+d+") [ attempt "+e+"]: "+b+"\n"+c+"\n"+f+" "+h});}function F$1(a,b,c,d){a.info(function(){return "XMLHTTP TEXT ("+b+"): "+Pb(a,c)+(d?" "+d:"")});}function Qb(a,b){a.info(function(){return "TIMEOUT: "+b});}Mb.prototype.info=function(){};
function Pb(a,b){if(!a.g)return b;if(!b)return null;try{var c=JSON.parse(b);if(c)for(a=0;a<c.length;a++)if(Array.isArray(c[a])){var d=c[a];if(!(2>d.length)){var e=d[1];if(Array.isArray(e)&&!(1>e.length)){var f=e[0];if("noop"!=f&&"stop"!=f&&"close"!=f)for(var h=1;h<e.length;h++)e[h]="";}}}return rb(c)}catch(n){return b}}var H$1={},Rb=null;function Sb(){return Rb=Rb||new C$1}H$1.Ma="serverreachability";function Tb(a){z$1.call(this,H$1.Ma,a);}t(Tb,z$1);function I(a){const b=Sb();D$1(b,new Tb(b,a));}H$1.STAT_EVENT="statevent";function Ub(a,b){z$1.call(this,H$1.STAT_EVENT,a);this.stat=b;}t(Ub,z$1);function J$1(a){const b=Sb();D$1(b,new Ub(b,a));}H$1.Na="timingevent";function Vb(a,b){z$1.call(this,H$1.Na,a);this.size=b;}t(Vb,z$1);
function K$1(a,b){if("function"!==typeof a)throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a();},b)}var Wb={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9};var Xb={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Yb(){}Yb.prototype.h=null;function Zb(a){return a.h||(a.h=a.i())}function $b(){}var L$1={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function ac$1(){z$1.call(this,"d");}t(ac$1,z$1);function bc$1(){z$1.call(this,"c");}t(bc$1,z$1);var cc$1;function dc$1(){}t(dc$1,Yb);dc$1.prototype.g=function(){return new XMLHttpRequest};dc$1.prototype.i=function(){return {}};cc$1=new dc$1;function M$1(a,b,c,d){this.l=a;this.j=b;this.m=c;this.X=d||1;this.V=new E(this);this.P=ec$1;a=Ja$1?125:void 0;this.W=new Eb(a);this.H=null;this.i=!1;this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null;this.D=[];this.g=null;this.C=0;this.o=this.u=null;this.N=-1;this.I=!1;this.O=0;this.L=null;this.aa=this.J=this.$=this.U=!1;this.h=new fc$1;}function fc$1(){this.i=null;this.g="";this.h=!1;}var ec$1=45E3,gc$1={},hc$1={};k$1=M$1.prototype;k$1.setTimeout=function(a){this.P=a;};
function ic$1(a,b,c){a.K=1;a.v=jc$1(N$1(b));a.s=c;a.U=!0;kc$1(a,null);}function kc$1(a,b){a.F=Date.now();lc$1(a);a.A=N$1(a.v);var c=a.A,d=a.X;Array.isArray(d)||(d=[String(d)]);mc$1(c.h,"t",d);a.C=0;c=a.l.H;a.h=new fc$1;a.g=nc$1(a.l,c?b:null,!a.s);0<a.O&&(a.L=new Ib(q$1(a.Ia,a,a.g),a.O));Kb(a.V,a.g,"readystatechange",a.gb);b=a.H?ya$1(a.H):{};a.s?(a.u||(a.u="POST"),b["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.s,b)):(a.u="GET",a.g.ea(a.A,a.u,null,b));I(1);Nb(a.j,a.u,a.A,a.m,a.X,a.s);}
k$1.gb=function(a){a=a.target;const b=this.L;b&&3==O$1(a)?b.l():this.Ia(a);};
k$1.Ia=function(a){try{if(a==this.g)a:{const r=O$1(this.g);var b=this.g.Da();const G=this.g.ba();if(!(3>r)&&(3!=r||Ja$1||this.g&&(this.h.h||this.g.ga()||oc$1(this.g)))){this.I||4!=r||7==b||(8==b||0>=G?I(3):I(2));pc$1(this);var c=this.g.ba();this.N=c;b:if(qc$1(this)){var d=oc$1(this.g);a="";var e=d.length,f=4==O$1(this.g);if(!this.h.i){if("undefined"===typeof TextDecoder){P(this);rc$1(this);var h="";break b}this.h.i=new l.TextDecoder;}for(b=0;b<e;b++)this.h.h=!0,a+=this.h.i.decode(d[b],{stream:f&&b==e-1});d.splice(0,
e);this.h.g+=a;this.C=0;h=this.h.g;}else h=this.g.ga();this.i=200==c;Ob(this.j,this.u,this.A,this.m,this.X,r,c);if(this.i){if(this.$&&!this.J){b:{if(this.g){var n,u=this.g;if((n=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!sa$1(n)){var m=n;break b}}m=null;}if(c=m)F$1(this.j,this.m,c,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,sc$1(this,c);else {this.i=!1;this.o=3;J$1(12);P(this);rc$1(this);break a}}this.U?(tc$1(this,r,h),Ja$1&&this.i&&3==r&&(Kb(this.V,this.W,"tick",this.fb),
this.W.start())):(F$1(this.j,this.m,h,null),sc$1(this,h));4==r&&P(this);this.i&&!this.I&&(4==r?uc$1(this.l,this):(this.i=!1,lc$1(this)));}else 400==c&&0<h.indexOf("Unknown SID")?(this.o=3,J$1(12)):(this.o=0,J$1(13)),P(this),rc$1(this);}}}catch(r){}finally{}};function qc$1(a){return a.g?"GET"==a.u&&2!=a.K&&a.l.Ba:!1}
function tc$1(a,b,c){let d=!0,e;for(;!a.I&&a.C<c.length;)if(e=vc$1(a,c),e==hc$1){4==b&&(a.o=4,J$1(14),d=!1);F$1(a.j,a.m,null,"[Incomplete Response]");break}else if(e==gc$1){a.o=4;J$1(15);F$1(a.j,a.m,c,"[Invalid Chunk]");d=!1;break}else F$1(a.j,a.m,e,null),sc$1(a,e);qc$1(a)&&e!=hc$1&&e!=gc$1&&(a.h.g="",a.C=0);4!=b||0!=c.length||a.h.h||(a.o=1,J$1(16),d=!1);a.i=a.i&&d;d?0<c.length&&!a.aa&&(a.aa=!0,b=a.l,b.g==a&&b.$&&!b.L&&(b.h.info("Great, no buffering proxy detected. Bytes received: "+c.length),wc$1(b),b.L=!0,J$1(11))):(F$1(a.j,a.m,
c,"[Invalid Chunked Response]"),P(a),rc$1(a));}k$1.fb=function(){if(this.g){var a=O$1(this.g),b=this.g.ga();this.C<b.length&&(pc$1(this),tc$1(this,a,b),this.i&&4!=a&&lc$1(this));}};function vc$1(a,b){var c=a.C,d=b.indexOf("\n",c);if(-1==d)return hc$1;c=Number(b.substring(c,d));if(isNaN(c))return gc$1;d+=1;if(d+c>b.length)return hc$1;b=b.substr(d,c);a.C=d+c;return b}k$1.cancel=function(){this.I=!0;P(this);};function lc$1(a){a.Y=Date.now()+a.P;xc$1(a,a.P);}
function xc$1(a,b){if(null!=a.B)throw Error("WatchDog timer not null");a.B=K$1(q$1(a.eb,a),b);}function pc$1(a){a.B&&(l.clearTimeout(a.B),a.B=null);}k$1.eb=function(){this.B=null;const a=Date.now();0<=a-this.Y?(Qb(this.j,this.A),2!=this.K&&(I(3),J$1(17)),P(this),this.o=2,rc$1(this)):xc$1(this,this.Y-a);};function rc$1(a){0==a.l.G||a.I||uc$1(a.l,a);}function P(a){pc$1(a);var b=a.L;b&&"function"==typeof b.na&&b.na();a.L=null;Fb(a.W);Lb(a.V);a.g&&(b=a.g,a.g=null,b.abort(),b.na());}
function sc$1(a,b){try{var c=a.l;if(0!=c.G&&(c.g==a||yc$1(c.i,a)))if(c.I=a.N,!a.J&&yc$1(c.i,a)&&3==c.G){try{var d=c.Ca.g.parse(b);}catch(m){d=null;}if(Array.isArray(d)&&3==d.length){var e=d;if(0==e[0])a:{if(!c.u){if(c.g)if(c.g.F+3E3<a.F)zc$1(c),Ac$1(c);else break a;Bc$1(c);J$1(18);}}else c.ta=e[1],0<c.ta-c.U&&37500>e[2]&&c.N&&0==c.A&&!c.v&&(c.v=K$1(q$1(c.ab,c),6E3));if(1>=Cc$1(c.i)&&c.ka){try{c.ka();}catch(m){}c.ka=void 0;}}else Q$1(c,11);}else if((a.J||c.g==a)&&zc$1(c),!sa$1(b))for(e=c.Ca.g.parse(b),b=0;b<e.length;b++){let m=e[b];
c.U=m[0];m=m[1];if(2==c.G)if("c"==m[0]){c.J=m[1];c.la=m[2];const r=m[3];null!=r&&(c.ma=r,c.h.info("VER="+c.ma));const G=m[4];null!=G&&(c.za=G,c.h.info("SVER="+c.za));const Da=m[5];null!=Da&&"number"===typeof Da&&0<Da&&(d=1.5*Da,c.K=d,c.h.info("backChannelRequestTimeoutMs_="+d));d=c;const ca=a.g;if(ca){const Ea=ca.g?ca.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ea){var f=d.i;!f.g&&(w(Ea,"spdy")||w(Ea,"quic")||w(Ea,"h2"))&&(f.j=f.l,f.g=new Set,f.h&&(Dc$1(f,f.h),f.h=null));}if(d.D){const xb=
ca.g?ca.g.getResponseHeader("X-HTTP-Session-Id"):null;xb&&(d.sa=xb,R(d.F,d.D,xb));}}c.G=3;c.j&&c.j.xa();c.$&&(c.O=Date.now()-a.F,c.h.info("Handshake RTT: "+c.O+"ms"));d=c;var h=a;d.oa=Ec$1(d,d.H?d.la:null,d.W);if(h.J){Fc$1(d.i,h);var n=h,u=d.K;u&&n.setTimeout(u);n.B&&(pc$1(n),lc$1(n));d.g=h;}else Gc$1(d);0<c.l.length&&Hc$1(c);}else "stop"!=m[0]&&"close"!=m[0]||Q$1(c,7);else 3==c.G&&("stop"==m[0]||"close"==m[0]?"stop"==m[0]?Q$1(c,7):Ic$1(c):"noop"!=m[0]&&c.j&&c.j.wa(m),c.A=0);}I(4);}catch(m){}}function Jc$1(a){if(a.R&&"function"==typeof a.R)return a.R();if("string"===typeof a)return a.split("");if(ba$1(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}b=[];c=0;for(d in a)b[c++]=a[d];return b}
function Kc$1(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(ba$1(a)||"string"===typeof a)na$1(a,b,void 0);else {if(a.T&&"function"==typeof a.T)var c=a.T();else if(a.R&&"function"==typeof a.R)c=void 0;else if(ba$1(a)||"string"===typeof a){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e);}else for(e in c=[],d=0,a)c[d++]=e;d=Jc$1(a);e=d.length;for(var f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a);}}function S(a,b){this.h={};this.g=[];this.i=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1]);}else if(a)if(a instanceof S)for(c=a.T(),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d]);}k$1=S.prototype;k$1.R=function(){Lc$1(this);for(var a=[],b=0;b<this.g.length;b++)a.push(this.h[this.g[b]]);return a};k$1.T=function(){Lc$1(this);return this.g.concat()};
function Lc$1(a){if(a.i!=a.g.length){for(var b=0,c=0;b<a.g.length;){var d=a.g[b];T(a.h,d)&&(a.g[c++]=d);b++;}a.g.length=c;}if(a.i!=a.g.length){var e={};for(c=b=0;b<a.g.length;)d=a.g[b],T(e,d)||(a.g[c++]=d,e[d]=1),b++;a.g.length=c;}}k$1.get=function(a,b){return T(this.h,a)?this.h[a]:b};k$1.set=function(a,b){T(this.h,a)||(this.i++,this.g.push(a));this.h[a]=b;};k$1.forEach=function(a,b){for(var c=this.T(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this);}};
function T(a,b){return Object.prototype.hasOwnProperty.call(a,b)}var Mc$1=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Nc$1(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e=null;if(0<=d){var f=a[c].substring(0,d);e=a[c].substring(d+1);}else f=a[c];b(f,e?decodeURIComponent(e.replace(/\+/g," ")):"");}}}function U$1(a,b){this.i=this.s=this.j="";this.m=null;this.o=this.l="";this.g=!1;if(a instanceof U$1){this.g=void 0!==b?b:a.g;Oc$1(this,a.j);this.s=a.s;Pc$1(this,a.i);Qc$1(this,a.m);this.l=a.l;b=a.h;var c=new Rc$1;c.i=b.i;b.g&&(c.g=new S(b.g),c.h=b.h);Sc$1(this,c);this.o=a.o;}else a&&(c=String(a).match(Mc$1))?(this.g=!!b,Oc$1(this,c[1]||"",!0),this.s=Tc$1(c[2]||""),Pc$1(this,c[3]||"",!0),Qc$1(this,c[4]),this.l=Tc$1(c[5]||"",!0),Sc$1(this,c[6]||"",!0),this.o=Tc$1(c[7]||"")):(this.g=!!b,this.h=new Rc$1(null,this.g));}
U$1.prototype.toString=function(){var a=[],b=this.j;b&&a.push(Uc$1(b,Vc$1,!0),":");var c=this.i;if(c||"file"==b)a.push("//"),(b=this.s)&&a.push(Uc$1(b,Vc$1,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.m,null!=c&&a.push(":",String(c));if(c=this.l)this.i&&"/"!=c.charAt(0)&&a.push("/"),a.push(Uc$1(c,"/"==c.charAt(0)?Wc$1:Xc$1,!0));(c=this.h.toString())&&a.push("?",c);(c=this.o)&&a.push("#",Uc$1(c,Yc$1));return a.join("")};function N$1(a){return new U$1(a)}
function Oc$1(a,b,c){a.j=c?Tc$1(b,!0):b;a.j&&(a.j=a.j.replace(/:$/,""));}function Pc$1(a,b,c){a.i=c?Tc$1(b,!0):b;}function Qc$1(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.m=b;}else a.m=null;}function Sc$1(a,b,c){b instanceof Rc$1?(a.h=b,Zc$1(a.h,a.g)):(c||(b=Uc$1(b,$c$1)),a.h=new Rc$1(b,a.g));}function R(a,b,c){a.h.set(b,c);}function jc$1(a){R(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36));return a}
function ad(a){return a instanceof U$1?N$1(a):new U$1(a,void 0)}function bd(a,b,c,d){var e=new U$1(null,void 0);a&&Oc$1(e,a);b&&Pc$1(e,b);c&&Qc$1(e,c);d&&(e.l=d);return e}function Tc$1(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Uc$1(a,b,c){return "string"===typeof a?(a=encodeURI(a).replace(b,cd),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function cd(a){a=a.charCodeAt(0);return "%"+(a>>4&15).toString(16)+(a&15).toString(16)}
var Vc$1=/[#\/\?@]/g,Xc$1=/[#\?:]/g,Wc$1=/[#\?]/g,$c$1=/[#\?@]/g,Yc$1=/#/g;function Rc$1(a,b){this.h=this.g=null;this.i=a||null;this.j=!!b;}function V(a){a.g||(a.g=new S,a.h=0,a.i&&Nc$1(a.i,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c);}));}k$1=Rc$1.prototype;k$1.add=function(a,b){V(this);this.i=null;a=W$1(this,a);var c=this.g.get(a);c||this.g.set(a,c=[]);c.push(b);this.h+=1;return this};
function dd(a,b){V(a);b=W$1(a,b);T(a.g.h,b)&&(a.i=null,a.h-=a.g.get(b).length,a=a.g,T(a.h,b)&&(delete a.h[b],a.i--,a.g.length>2*a.i&&Lc$1(a)));}function ed(a,b){V(a);b=W$1(a,b);return T(a.g.h,b)}k$1.forEach=function(a,b){V(this);this.g.forEach(function(c,d){na$1(c,function(e){a.call(b,e,d,this);},this);},this);};k$1.T=function(){V(this);for(var a=this.g.R(),b=this.g.T(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
k$1.R=function(a){V(this);var b=[];if("string"===typeof a)ed(this,a)&&(b=qa$1(b,this.g.get(W$1(this,a))));else {a=this.g.R();for(var c=0;c<a.length;c++)b=qa$1(b,a[c]);}return b};k$1.set=function(a,b){V(this);this.i=null;a=W$1(this,a);ed(this,a)&&(this.h-=this.g.get(a).length);this.g.set(a,[b]);this.h+=1;return this};k$1.get=function(a,b){if(!a)return b;a=this.R(a);return 0<a.length?String(a[0]):b};function mc$1(a,b,c){dd(a,b);0<c.length&&(a.i=null,a.g.set(W$1(a,b),ra$1(c)),a.h+=c.length);}
k$1.toString=function(){if(this.i)return this.i;if(!this.g)return "";for(var a=[],b=this.g.T(),c=0;c<b.length;c++){var d=b[c],e=encodeURIComponent(String(d));d=this.R(d);for(var f=0;f<d.length;f++){var h=e;""!==d[f]&&(h+="="+encodeURIComponent(String(d[f])));a.push(h);}}return this.i=a.join("&")};function W$1(a,b){b=String(b);a.j&&(b=b.toLowerCase());return b}function Zc$1(a,b){b&&!a.j&&(V(a),a.i=null,a.g.forEach(function(c,d){var e=d.toLowerCase();d!=e&&(dd(this,d),mc$1(this,e,c));},a));a.j=b;}var fd=class{constructor(a,b){this.h=a;this.g=b;}};function gd(a){this.l=a||hd;l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&("hq"==a[0].nextHopProtocol||"h2"==a[0].nextHopProtocol)):a=!!(l.g&&l.g.Ea&&l.g.Ea()&&l.g.Ea().Zb);this.j=a?this.l:1;this.g=null;1<this.j&&(this.g=new Set);this.h=null;this.i=[];}var hd=10;function id(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Cc$1(a){return a.h?1:a.g?a.g.size:0}function yc$1(a,b){return a.h?a.h==b:a.g?a.g.has(b):!1}function Dc$1(a,b){a.g?a.g.add(b):a.h=b;}
function Fc$1(a,b){a.h&&a.h==b?a.h=null:a.g&&a.g.has(b)&&a.g.delete(b);}gd.prototype.cancel=function(){this.i=jd(this);if(this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const a of this.g.values())a.cancel();this.g.clear();}};function jd(a){if(null!=a.h)return a.i.concat(a.h.D);if(null!=a.g&&0!==a.g.size){let b=a.i;for(const c of a.g.values())b=b.concat(c.D);return b}return ra$1(a.i)}function kd(){}kd.prototype.stringify=function(a){return l.JSON.stringify(a,void 0)};kd.prototype.parse=function(a){return l.JSON.parse(a,void 0)};function ld(){this.g=new kd;}function md(a,b,c){const d=c||"";try{Kc$1(a,function(e,f){let h=e;p(e)&&(h=rb(e));b.push(d+f+"="+encodeURIComponent(h));});}catch(e){throw b.push(d+"type="+encodeURIComponent("_badmap")),e;}}function nd(a,b){const c=new Mb;if(l.Image){const d=new Image;d.onload=ja$1(od,c,d,"TestLoadImage: loaded",!0,b);d.onerror=ja$1(od,c,d,"TestLoadImage: error",!1,b);d.onabort=ja$1(od,c,d,"TestLoadImage: abort",!1,b);d.ontimeout=ja$1(od,c,d,"TestLoadImage: timeout",!1,b);l.setTimeout(function(){if(d.ontimeout)d.ontimeout();},1E4);d.src=a;}else b(!1);}function od(a,b,c,d,e){try{b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null,e(d);}catch(f){}}function pd(a){this.l=a.$b||null;this.j=a.ib||!1;}t(pd,Yb);pd.prototype.g=function(){return new qd(this.l,this.j)};pd.prototype.i=function(a){return function(){return a}}({});function qd(a,b){C$1.call(this);this.D=a;this.u=b;this.m=void 0;this.readyState=rd;this.status=0;this.responseType=this.responseText=this.response=this.statusText="";this.onreadystatechange=null;this.v=new Headers;this.h=null;this.C="GET";this.B="";this.g=!1;this.A=this.j=this.l=null;}t(qd,C$1);var rd=0;k$1=qd.prototype;
k$1.open=function(a,b){if(this.readyState!=rd)throw this.abort(),Error("Error reopening a connection");this.C=a;this.B=b;this.readyState=1;sd(this);};k$1.send=function(a){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const b={headers:this.v,method:this.C,credentials:this.m,cache:void 0};a&&(b.body=a);(this.D||l).fetch(new Request(this.B,b)).then(this.Va.bind(this),this.ha.bind(this));};
k$1.abort=function(){this.response=this.responseText="";this.v=new Headers;this.status=0;this.j&&this.j.cancel("Request was aborted.");1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,td(this));this.readyState=rd;};
k$1.Va=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,sd(this)),this.g&&(this.readyState=3,sd(this),this.g)))if("arraybuffer"===this.responseType)a.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if("undefined"!==typeof l.ReadableStream&&"body"in a){this.j=a.body.getReader();if(this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=
[];}else this.response=this.responseText="",this.A=new TextDecoder;ud(this);}else a.text().then(this.Ua.bind(this),this.ha.bind(this));};function ud(a){a.j.read().then(a.Sa.bind(a)).catch(a.ha.bind(a));}k$1.Sa=function(a){if(this.g){if(this.u&&a.value)this.response.push(a.value);else if(!this.u){var b=a.value?a.value:new Uint8Array(0);if(b=this.A.decode(b,{stream:!a.done}))this.response=this.responseText+=b;}a.done?td(this):sd(this);3==this.readyState&&ud(this);}};
k$1.Ua=function(a){this.g&&(this.response=this.responseText=a,td(this));};k$1.Ta=function(a){this.g&&(this.response=a,td(this));};k$1.ha=function(){this.g&&td(this);};function td(a){a.readyState=4;a.l=null;a.j=null;a.A=null;sd(a);}k$1.setRequestHeader=function(a,b){this.v.append(a,b);};k$1.getResponseHeader=function(a){return this.h?this.h.get(a.toLowerCase())||"":""};
k$1.getAllResponseHeaders=function(){if(!this.h)return "";const a=[],b=this.h.entries();for(var c=b.next();!c.done;)c=c.value,a.push(c[0]+": "+c[1]),c=b.next();return a.join("\r\n")};function sd(a){a.onreadystatechange&&a.onreadystatechange.call(a);}Object.defineProperty(qd.prototype,"withCredentials",{get:function(){return "include"===this.m},set:function(a){this.m=a?"include":"same-origin";}});var vd=l.JSON.parse;function X$1(a){C$1.call(this);this.headers=new S;this.u=a||null;this.h=!1;this.C=this.g=null;this.H="";this.m=0;this.j="";this.l=this.F=this.v=this.D=!1;this.B=0;this.A=null;this.J=wd;this.K=this.L=!1;}t(X$1,C$1);var wd="",xd=/^https?$/i,yd=["POST","PUT"];k$1=X$1.prototype;
k$1.ea=function(a,b,c,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+a);b=b?b.toUpperCase():"GET";this.H=a;this.j="";this.m=0;this.D=!1;this.h=!0;this.g=this.u?this.u.g():cc$1.g();this.C=this.u?Zb(this.u):Zb(cc$1);this.g.onreadystatechange=q$1(this.Fa,this);try{this.F=!0,this.g.open(b,String(a),!0),this.F=!1;}catch(f){zd(this,f);return}a=c||"";const e=new S(this.headers);d&&Kc$1(d,function(f,h){e.set(h,f);});d=oa$1(e.T());c=l.FormData&&a instanceof l.FormData;
!(0<=ma$1(yd,b))||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(f,h){this.g.setRequestHeader(h,f);},this);this.J&&(this.g.responseType=this.J);"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{Ad(this),0<this.B&&((this.K=Bd(this.g))?(this.g.timeout=this.B,this.g.ontimeout=q$1(this.pa,this)):this.A=Gb(this.pa,this.B,this)),this.v=!0,this.g.send(a),this.v=!1;}catch(f){zd(this,f);}};
function Bd(a){return y&&Ra$1()&&"number"===typeof a.timeout&&void 0!==a.ontimeout}function pa$1(a){return "content-type"==a.toLowerCase()}k$1.pa=function(){"undefined"!=typeof goog&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,D$1(this,"timeout"),this.abort(8));};function zd(a,b){a.h=!1;a.g&&(a.l=!0,a.g.abort(),a.l=!1);a.j=b;a.m=5;Cd(a);Dd(a);}function Cd(a){a.D||(a.D=!0,D$1(a,"complete"),D$1(a,"error"));}
k$1.abort=function(a){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=a||7,D$1(this,"complete"),D$1(this,"abort"),Dd(this));};k$1.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Dd(this,!0));X$1.Z.M.call(this);};k$1.Fa=function(){this.s||(this.F||this.v||this.l?Ed(this):this.cb());};k$1.cb=function(){Ed(this);};
function Ed(a){if(a.h&&"undefined"!=typeof goog&&(!a.C[1]||4!=O$1(a)||2!=a.ba()))if(a.v&&4==O$1(a))Gb(a.Fa,0,a);else if(D$1(a,"readystatechange"),4==O$1(a)){a.h=!1;try{const n=a.ba();a:switch(n){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var b=!0;break a;default:b=!1;}var c;if(!(c=b)){var d;if(d=0===n){var e=String(a.H).match(Mc$1)[1]||null;if(!e&&l.self&&l.self.location){var f=l.self.location.protocol;e=f.substr(0,f.length-1);}d=!xd.test(e?e.toLowerCase():"");}c=d;}if(c)D$1(a,"complete"),D$1(a,
"success");else {a.m=6;try{var h=2<O$1(a)?a.g.statusText:"";}catch(u){h="";}a.j=h+" ["+a.ba()+"]";Cd(a);}}finally{Dd(a);}}}function Dd(a,b){if(a.g){Ad(a);const c=a.g,d=a.C[0]?aa$1:null;a.g=null;a.C=null;b||D$1(a,"ready");try{c.onreadystatechange=d;}catch(e){}}}function Ad(a){a.g&&a.K&&(a.g.ontimeout=null);a.A&&(l.clearTimeout(a.A),a.A=null);}function O$1(a){return a.g?a.g.readyState:0}k$1.ba=function(){try{return 2<O$1(this)?this.g.status:-1}catch(a){return -1}};
k$1.ga=function(){try{return this.g?this.g.responseText:""}catch(a){return ""}};k$1.Qa=function(a){if(this.g){var b=this.g.responseText;a&&0==b.indexOf(a)&&(b=b.substring(a.length));return vd(b)}};function oc$1(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.J){case wd:case "text":return a.g.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch(b){return null}}k$1.Da=function(){return this.m};
k$1.La=function(){return "string"===typeof this.j?this.j:String(this.j)};function Fd(a){let b="";xa$1(a,function(c,d){b+=d;b+=":";b+=c;b+="\r\n";});return b}function Gd(a,b,c){a:{for(d in c){var d=!1;break a}d=!0;}d||(c=Fd(c),"string"===typeof a?(null!=c&&encodeURIComponent(String(c))):R(a,b,c));}function Hd(a,b,c){return c&&c.internalChannelParams?c.internalChannelParams[a]||b:b}
function Id(a){this.za=0;this.l=[];this.h=new Mb;this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null;this.Za=this.V=0;this.Xa=Hd("failFast",!1,a);this.N=this.v=this.u=this.m=this.j=null;this.X=!0;this.I=this.ta=this.U=-1;this.Y=this.A=this.C=0;this.Pa=Hd("baseRetryDelayMs",5E3,a);this.$a=Hd("retryDelaySeedMs",1E4,a);this.Ya=Hd("forwardChannelMaxRetries",2,a);this.ra=Hd("forwardChannelRequestTimeoutMs",2E4,a);this.qa=a&&a.xmlHttpFactory||void 0;this.Ba=a&&a.Yb||!1;
this.K=void 0;this.H=a&&a.supportsCrossDomainXhr||!1;this.J="";this.i=new gd(a&&a.concurrentRequestLimit);this.Ca=new ld;this.ja=a&&a.fastHandshake||!1;this.Ra=a&&a.Wb||!1;a&&a.Aa&&this.h.Aa();a&&a.forceLongPolling&&(this.X=!1);this.$=!this.ja&&this.X&&a&&a.detectBufferingProxy||!1;this.ka=void 0;this.O=0;this.L=!1;this.B=null;this.Wa=!a||!1!==a.Xb;}k$1=Id.prototype;k$1.ma=8;k$1.G=1;
function Ic$1(a){Jd(a);if(3==a.G){var b=a.V++,c=N$1(a.F);R(c,"SID",a.J);R(c,"RID",b);R(c,"TYPE","terminate");Kd(a,c);b=new M$1(a,a.h,b,void 0);b.K=2;b.v=jc$1(N$1(c));c=!1;l.navigator&&l.navigator.sendBeacon&&(c=l.navigator.sendBeacon(b.v.toString(),""));!c&&l.Image&&((new Image).src=b.v,c=!0);c||(b.g=nc$1(b.l,null),b.g.ea(b.v));b.F=Date.now();lc$1(b);}Ld(a);}k$1.hb=function(a){try{this.h.info("Origin Trials invoked: "+a);}catch(b){}};function Ac$1(a){a.g&&(wc$1(a),a.g.cancel(),a.g=null);}
function Jd(a){Ac$1(a);a.u&&(l.clearTimeout(a.u),a.u=null);zc$1(a);a.i.cancel();a.m&&("number"===typeof a.m&&l.clearTimeout(a.m),a.m=null);}function Md(a,b){a.l.push(new fd(a.Za++,b));3==a.G&&Hc$1(a);}function Hc$1(a){id(a.i)||a.m||(a.m=!0,zb(a.Ha,a),a.C=0);}function Nd(a,b){if(Cc$1(a.i)>=a.i.j-(a.m?1:0))return !1;if(a.m)return a.l=b.D.concat(a.l),!0;if(1==a.G||2==a.G||a.C>=(a.Xa?0:a.Ya))return !1;a.m=K$1(q$1(a.Ha,a,b),Od(a,a.C));a.C++;return !0}
k$1.Ha=function(a){if(this.m)if(this.m=null,1==this.G){if(!a){this.V=Math.floor(1E5*Math.random());a=this.V++;const e=new M$1(this,this.h,a,void 0);let f=this.s;this.P&&(f?(f=ya$1(f),Aa$1(f,this.P)):f=this.P);null===this.o&&(e.H=f);if(this.ja)a:{var b=0;for(var c=0;c<this.l.length;c++){b:{var d=this.l[c];if("__data__"in d.g&&(d=d.g.__data__,"string"===typeof d)){d=d.length;break b}d=void 0;}if(void 0===d)break;b+=d;if(4096<b){b=c;break a}if(4096===b||c===this.l.length-1){b=c+1;break a}}b=1E3;}else b=1E3;b=
Pd(this,e,b);c=N$1(this.F);R(c,"RID",a);R(c,"CVER",22);this.D&&R(c,"X-HTTP-Session-Id",this.D);Kd(this,c);this.o&&f&&Gd(c,this.o,f);Dc$1(this.i,e);this.Ra&&R(c,"TYPE","init");this.ja?(R(c,"$req",b),R(c,"SID","null"),e.$=!0,ic$1(e,c,null)):ic$1(e,c,b);this.G=2;}}else 3==this.G&&(a?Qd(this,a):0==this.l.length||id(this.i)||Qd(this));};
function Qd(a,b){var c;b?c=b.m:c=a.V++;const d=N$1(a.F);R(d,"SID",a.J);R(d,"RID",c);R(d,"AID",a.U);Kd(a,d);a.o&&a.s&&Gd(d,a.o,a.s);c=new M$1(a,a.h,c,a.C+1);null===a.o&&(c.H=a.s);b&&(a.l=b.D.concat(a.l));b=Pd(a,c,1E3);c.setTimeout(Math.round(.5*a.ra)+Math.round(.5*a.ra*Math.random()));Dc$1(a.i,c);ic$1(c,d,b);}function Kd(a,b){a.j&&Kc$1({},function(c,d){R(b,d,c);});}
function Pd(a,b,c){c=Math.min(a.l.length,c);var d=a.j?q$1(a.j.Oa,a.j,a):null;a:{var e=a.l;let f=-1;for(;;){const h=["count="+c];-1==f?0<c?(f=e[0].h,h.push("ofs="+f)):f=0:h.push("ofs="+f);let n=!0;for(let u=0;u<c;u++){let m=e[u].h;const r=e[u].g;m-=f;if(0>m)f=Math.max(0,e[u].h-100),n=!1;else try{md(r,h,"req"+m+"_");}catch(G){d&&d(r);}}if(n){d=h.join("&");break a}}}a=a.l.splice(0,c);b.D=a;return d}function Gc$1(a){a.g||a.u||(a.Y=1,zb(a.Ga,a),a.A=0);}
function Bc$1(a){if(a.g||a.u||3<=a.A)return !1;a.Y++;a.u=K$1(q$1(a.Ga,a),Od(a,a.A));a.A++;return !0}k$1.Ga=function(){this.u=null;Rd(this);if(this.$&&!(this.L||null==this.g||0>=this.O)){var a=2*this.O;this.h.info("BP detection timer enabled: "+a);this.B=K$1(q$1(this.bb,this),a);}};k$1.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,J$1(10),Ac$1(this),Rd(this));};
function wc$1(a){null!=a.B&&(l.clearTimeout(a.B),a.B=null);}function Rd(a){a.g=new M$1(a,a.h,"rpc",a.Y);null===a.o&&(a.g.H=a.s);a.g.O=0;var b=N$1(a.oa);R(b,"RID","rpc");R(b,"SID",a.J);R(b,"CI",a.N?"0":"1");R(b,"AID",a.U);Kd(a,b);R(b,"TYPE","xmlhttp");a.o&&a.s&&Gd(b,a.o,a.s);a.K&&a.g.setTimeout(a.K);var c=a.g;a=a.la;c.K=1;c.v=jc$1(N$1(b));c.s=null;c.U=!0;kc$1(c,a);}k$1.ab=function(){null!=this.v&&(this.v=null,Ac$1(this),Bc$1(this),J$1(19));};function zc$1(a){null!=a.v&&(l.clearTimeout(a.v),a.v=null);}
function uc$1(a,b){var c=null;if(a.g==b){zc$1(a);wc$1(a);a.g=null;var d=2;}else if(yc$1(a.i,b))c=b.D,Fc$1(a.i,b),d=1;else return;a.I=b.N;if(0!=a.G)if(b.i)if(1==d){c=b.s?b.s.length:0;b=Date.now()-b.F;var e=a.C;d=Sb();D$1(d,new Vb(d,c,b,e));Hc$1(a);}else Gc$1(a);else if(e=b.o,3==e||0==e&&0<a.I||!(1==d&&Nd(a,b)||2==d&&Bc$1(a)))switch(c&&0<c.length&&(b=a.i,b.i=b.i.concat(c)),e){case 1:Q$1(a,5);break;case 4:Q$1(a,10);break;case 3:Q$1(a,6);break;default:Q$1(a,2);}}
function Od(a,b){let c=a.Pa+Math.floor(Math.random()*a.$a);a.j||(c*=2);return c*b}function Q$1(a,b){a.h.info("Error code "+b);if(2==b){var c=null;a.j&&(c=null);var d=q$1(a.jb,a);c||(c=new U$1("//www.google.com/images/cleardot.gif"),l.location&&"http"==l.location.protocol||Oc$1(c,"https"),jc$1(c));nd(c.toString(),d);}else J$1(2);a.G=0;a.j&&a.j.va(b);Ld(a);Jd(a);}k$1.jb=function(a){a?(this.h.info("Successfully pinged google.com"),J$1(2)):(this.h.info("Failed to ping google.com"),J$1(1));};
function Ld(a){a.G=0;a.I=-1;if(a.j){if(0!=jd(a.i).length||0!=a.l.length)a.i.i.length=0,ra$1(a.l),a.l.length=0;a.j.ua();}}function Ec$1(a,b,c){let d=ad(c);if(""!=d.i)b&&Pc$1(d,b+"."+d.i),Qc$1(d,d.m);else {const e=l.location;d=bd(e.protocol,b?b+"."+e.hostname:e.hostname,+e.port,c);}a.aa&&xa$1(a.aa,function(e,f){R(d,f,e);});b=a.D;c=a.sa;b&&c&&R(d,b,c);R(d,"VER",a.ma);Kd(a,d);return d}
function nc$1(a,b,c){if(b&&!a.H)throw Error("Can't create secondary domain capable XhrIo object.");b=c&&a.Ba&&!a.qa?new X$1(new pd({ib:!0})):new X$1(a.qa);b.L=a.H;return b}function Sd(){}k$1=Sd.prototype;k$1.xa=function(){};k$1.wa=function(){};k$1.va=function(){};k$1.ua=function(){};k$1.Oa=function(){};function Td(){if(y&&!(10<=Number(Ua$1)))throw Error("Environmental error: no available transport.");}Td.prototype.g=function(a,b){return new Y$1(a,b)};
function Y$1(a,b){C$1.call(this);this.g=new Id(b);this.l=a;this.h=b&&b.messageUrlParams||null;a=b&&b.messageHeaders||null;b&&b.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"});this.g.s=a;a=b&&b.initMessageHeaders||null;b&&b.messageContentType&&(a?a["X-WebChannel-Content-Type"]=b.messageContentType:a={"X-WebChannel-Content-Type":b.messageContentType});b&&b.ya&&(a?a["X-WebChannel-Client-Profile"]=b.ya:a={"X-WebChannel-Client-Profile":b.ya});this.g.P=
a;(a=b&&b.httpHeadersOverwriteParam)&&!sa$1(a)&&(this.g.o=a);this.A=b&&b.supportsCrossDomainXhr||!1;this.v=b&&b.sendRawJson||!1;(b=b&&b.httpSessionIdParam)&&!sa$1(b)&&(this.g.D=b,a=this.h,null!==a&&b in a&&(a=this.h,b in a&&delete a[b]));this.j=new Z$1(this);}t(Y$1,C$1);Y$1.prototype.m=function(){this.g.j=this.j;this.A&&(this.g.H=!0);var a=this.g,b=this.l,c=this.h||void 0;a.Wa&&(a.h.info("Origin Trials enabled."),zb(q$1(a.hb,a,b)));J$1(0);a.W=b;a.aa=c||{};a.N=a.X;a.F=Ec$1(a,null,a.W);Hc$1(a);};Y$1.prototype.close=function(){Ic$1(this.g);};
Y$1.prototype.u=function(a){if("string"===typeof a){var b={};b.__data__=a;Md(this.g,b);}else this.v?(b={},b.__data__=rb(a),Md(this.g,b)):Md(this.g,a);};Y$1.prototype.M=function(){this.g.j=null;delete this.j;Ic$1(this.g);delete this.g;Y$1.Z.M.call(this);};function Ud(a){ac$1.call(this);var b=a.__sm__;if(b){a:{for(const c in b){a=c;break a}a=void 0;}if(this.i=a)a=this.i,b=null!==b&&a in b?b[a]:void 0;this.data=b;}else this.data=a;}t(Ud,ac$1);function Vd(){bc$1.call(this);this.status=1;}t(Vd,bc$1);function Z$1(a){this.g=a;}
t(Z$1,Sd);Z$1.prototype.xa=function(){D$1(this.g,"a");};Z$1.prototype.wa=function(a){D$1(this.g,new Ud(a));};Z$1.prototype.va=function(a){D$1(this.g,new Vd(a));};Z$1.prototype.ua=function(){D$1(this.g,"b");};/*

 Copyright 2017 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
Td.prototype.createWebChannel=Td.prototype.g;Y$1.prototype.send=Y$1.prototype.u;Y$1.prototype.open=Y$1.prototype.m;Y$1.prototype.close=Y$1.prototype.close;Wb.NO_ERROR=0;Wb.TIMEOUT=8;Wb.HTTP_ERROR=6;Xb.COMPLETE="complete";$b.EventType=L$1;L$1.OPEN="a";L$1.CLOSE="b";L$1.ERROR="c";L$1.MESSAGE="d";C$1.prototype.listen=C$1.prototype.N;X$1.prototype.listenOnce=X$1.prototype.O;X$1.prototype.getLastError=X$1.prototype.La;X$1.prototype.getLastErrorCode=X$1.prototype.Da;X$1.prototype.getStatus=X$1.prototype.ba;X$1.prototype.getResponseJson=X$1.prototype.Qa;
X$1.prototype.getResponseText=X$1.prototype.ga;X$1.prototype.send=X$1.prototype.ea;var createWebChannelTransport = function(){return new Td};var getStatEventTarget = function(){return Sb()};var ErrorCode = Wb;var EventType = Xb;var Event = H$1;var Stat = {rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20};var FetchXmlHttpFactory = pd;var WebChannel = $b;
var XhrIo = X$1;

const D = "@firebase/firestore";

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
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
class C {
    constructor(t) {
        this.uid = t;
    }
    isAuthenticated() {
        return null != this.uid;
    }
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */    toKey() {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
    }
    isEqual(t) {
        return t.uid === this.uid;
    }
}

/** A user with a null UID. */ C.UNAUTHENTICATED = new C(null), 
// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
C.GOOGLE_CREDENTIALS = new C("google-credentials-uid"), C.FIRST_PARTY = new C("first-party-uid"), 
C.MOCK_USER = new C("mock-user");

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
let x = "9.6.8";

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
const N = new Logger("@firebase/firestore");

// Helper methods are needed because variables can't be exported as read/write
function k() {
    return N.logLevel;
}

/**
 * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
 *
 * @param logLevel - The verbosity you set for activity and error logging. Can
 *   be any of the following values:
 *
 *   <ul>
 *     <li>`debug` for the most verbose logging level, primarily for
 *     debugging.</li>
 *     <li>`error` to log errors only.</li>
 *     <li><code>`silent` to turn off logging.</li>
 *   </ul>
 */ function M(t) {
    N.setLogLevel(t);
}

function O(t, ...e) {
    if (N.logLevel <= LogLevel.DEBUG) {
        const n = e.map(B);
        N.debug(`Firestore (${x}): ${t}`, ...n);
    }
}

function $(t, ...e) {
    if (N.logLevel <= LogLevel.ERROR) {
        const n = e.map(B);
        N.error(`Firestore (${x}): ${t}`, ...n);
    }
}

/**
 * @internal
 */ function F(t, ...e) {
    if (N.logLevel <= LogLevel.WARN) {
        const n = e.map(B);
        N.warn(`Firestore (${x}): ${t}`, ...n);
    }
}

/**
 * Converts an additional log parameter to a string representation.
 */ function B(t) {
    if ("string" == typeof t) return t;
    try {
        return e = t, JSON.stringify(e);
    } catch (e) {
        // Converting to JSON failed, just log the object directly
        return t;
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
    /** Formats an object as a JSON string, suitable for logging. */
    var e;
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
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */ function L(t = "Unexpected state") {
    // Log the failure in addition to throw an exception, just in case the
    // exception is swallowed.
    const e = `FIRESTORE (${x}) INTERNAL ASSERTION FAILED: ` + t;
    // NOTE: We don't use FirestoreError here because these are internal failures
    // that cannot be handled by the user. (Also it would create a circular
    // dependency between the error and assert modules which doesn't work.)
    throw $(e), new Error(e);
}

/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */ function q(t, e) {
    t || L();
}

/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * The code of callsites invoking this function are stripped out in production
 * builds. Any side-effects of code within the debugAssert() invocation will not
 * happen in this case.
 *
 * @internal
 */ function U(t, e) {
    t || L();
}

/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */ function K(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    return t;
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
 */ const G = {
    // Causes are copied from:
    // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
    /** Not an error; returned on success. */
    OK: "ok",
    /** The operation was cancelled (typically by the caller). */
    CANCELLED: "cancelled",
    /** Unknown error or an error from a different error domain. */
    UNKNOWN: "unknown",
    /**
     * Client specified an invalid argument. Note that this differs from
     * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
     * problematic regardless of the state of the system (e.g., a malformed file
     * name).
     */
    INVALID_ARGUMENT: "invalid-argument",
    /**
     * Deadline expired before operation could complete. For operations that
     * change the state of the system, this error may be returned even if the
     * operation has completed successfully. For example, a successful response
     * from a server could have been delayed long enough for the deadline to
     * expire.
     */
    DEADLINE_EXCEEDED: "deadline-exceeded",
    /** Some requested entity (e.g., file or directory) was not found. */
    NOT_FOUND: "not-found",
    /**
     * Some entity that we attempted to create (e.g., file or directory) already
     * exists.
     */
    ALREADY_EXISTS: "already-exists",
    /**
     * The caller does not have permission to execute the specified operation.
     * PERMISSION_DENIED must not be used for rejections caused by exhausting
     * some resource (use RESOURCE_EXHAUSTED instead for those errors).
     * PERMISSION_DENIED must not be used if the caller can not be identified
     * (use UNAUTHENTICATED instead for those errors).
     */
    PERMISSION_DENIED: "permission-denied",
    /**
     * The request does not have valid authentication credentials for the
     * operation.
     */
    UNAUTHENTICATED: "unauthenticated",
    /**
     * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
     * entire file system is out of space.
     */
    RESOURCE_EXHAUSTED: "resource-exhausted",
    /**
     * Operation was rejected because the system is not in a state required for
     * the operation's execution. For example, directory to be deleted may be
     * non-empty, an rmdir operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
     *  (a) Use UNAVAILABLE if the client can retry just the failing call.
     *  (b) Use ABORTED if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FAILED_PRECONDITION if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FAILED_PRECONDITION
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FAILED_PRECONDITION if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     */
    FAILED_PRECONDITION: "failed-precondition",
    /**
     * The operation was aborted, typically due to a concurrency issue like
     * sequencer check failures, transaction aborts, etc.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    ABORTED: "aborted",
    /**
     * Operation was attempted past the valid range. E.g., seeking or reading
     * past end of file.
     *
     * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
     * if the system state changes. For example, a 32-bit file system will
     * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
     * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
     * an offset past the current file size.
     *
     * There is a fair bit of overlap between FAILED_PRECONDITION and
     * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
     * when it applies so that callers who are iterating through a space can
     * easily look for an OUT_OF_RANGE error to detect when they are done.
     */
    OUT_OF_RANGE: "out-of-range",
    /** Operation is not implemented or not supported/enabled in this service. */
    UNIMPLEMENTED: "unimplemented",
    /**
     * Internal errors. Means some invariants expected by underlying System has
     * been broken. If you see one of these errors, Something is very broken.
     */
    INTERNAL: "internal",
    /**
     * The service is currently unavailable. This is a most likely a transient
     * condition and may be corrected by retrying with a backoff.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */
    UNAVAILABLE: "unavailable",
    /** Unrecoverable data loss or corruption. */
    DATA_LOSS: "data-loss"
};

/** An error returned by a Firestore operation. */ class Q extends FirebaseError {
    /** @hideconstructor */
    constructor(
    /**
     * The backend error code associated with this error.
     */
    t, 
    /**
     * A custom error description.
     */
    e) {
        super(t, e), this.code = t, this.message = e, 
        // HACK: We write a toString property directly because Error is not a real
        // class and so inheritance does not work correctly. We could alternatively
        // do the same "back-door inheritance" trick that FirebaseError does.
        this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
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
 */ class j {
    constructor() {
        this.promise = new Promise(((t, e) => {
            this.resolve = t, this.reject = e;
        }));
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
 */ class W {
    constructor(t, e) {
        this.user = e, this.type = "OAuth", this.headers = new Map, this.headers.set("Authorization", `Bearer ${t}`);
    }
}

/**
 * A CredentialsProvider that always yields an empty token.
 * @internal
 */ class z {
    getToken() {
        return Promise.resolve(null);
    }
    invalidateToken() {}
    start(t, e) {
        // Fire with initial user.
        t.enqueueRetryable((() => e(C.UNAUTHENTICATED)));
    }
    shutdown() {}
}

/**
 * A CredentialsProvider that always returns a constant token. Used for
 * emulator token mocking.
 */ class H {
    constructor(t) {
        this.token = t, 
        /**
         * Stores the listener registered with setChangeListener()
         * This isn't actually necessary since the UID never changes, but we use this
         * to verify the listen contract is adhered to in tests.
         */
        this.changeListener = null;
    }
    getToken() {
        return Promise.resolve(this.token);
    }
    invalidateToken() {}
    start(t, e) {
        this.changeListener = e, 
        // Fire with initial user.
        t.enqueueRetryable((() => e(this.token.user)));
    }
    shutdown() {
        this.changeListener = null;
    }
}

class J {
    constructor(t) {
        this.t = t, 
        /** Tracks the current User. */
        this.currentUser = C.UNAUTHENTICATED, 
        /**
         * Counter used to detect if the token changed while a getToken request was
         * outstanding.
         */
        this.i = 0, this.forceRefresh = !1, this.auth = null;
    }
    start(t, e) {
        let n = this.i;
        // A change listener that prevents double-firing for the same token change.
                const s = t => this.i !== n ? (n = this.i, e(t)) : Promise.resolve();
        // A promise that can be waited on to block on the next token change.
        // This promise is re-created after each change.
                let i = new j;
        this.o = () => {
            this.i++, this.currentUser = this.u(), i.resolve(), i = new j, t.enqueueRetryable((() => s(this.currentUser)));
        };
        const r = () => {
            const e = i;
            t.enqueueRetryable((async () => {
                await e.promise, await s(this.currentUser);
            }));
        }, o = t => {
            O("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = t, this.auth.addAuthTokenListener(this.o), 
            r();
        };
        this.t.onInit((t => o(t))), 
        // Our users can initialize Auth right after Firestore, so we give it
        // a chance to register itself with the component framework before we
        // determine whether to start up in unauthenticated mode.
        setTimeout((() => {
            if (!this.auth) {
                const t = this.t.getImmediate({
                    optional: !0
                });
                t ? o(t) : (
                // If auth is still not available, proceed with `null` user
                O("FirebaseAuthCredentialsProvider", "Auth not yet detected"), i.resolve(), i = new j);
            }
        }), 0), r();
    }
    getToken() {
        // Take note of the current value of the tokenCounter so that this method
        // can fail (with an ABORTED error) if there is a token change while the
        // request is outstanding.
        const t = this.i, e = this.forceRefresh;
        return this.forceRefresh = !1, this.auth ? this.auth.getToken(e).then((e => 
        // Cancel the request since the token changed while the request was
        // outstanding so the response is potentially for a previous user (which
        // user, we can't be sure).
        this.i !== t ? (O("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), 
        this.getToken()) : e ? (q("string" == typeof e.accessToken), new W(e.accessToken, this.currentUser)) : null)) : Promise.resolve(null);
    }
    invalidateToken() {
        this.forceRefresh = !0;
    }
    shutdown() {
        this.auth && this.auth.removeAuthTokenListener(this.o);
    }
    // Auth.getUid() can return null even with a user logged in. It is because
    // getUid() is synchronous, but the auth code populating Uid is asynchronous.
    // This method should only be called in the AuthTokenListener callback
    // to guarantee to get the actual user.
    u() {
        const t = this.auth && this.auth.getUid();
        return q(null === t || "string" == typeof t), new C(t);
    }
}

/*
 * FirstPartyToken provides a fresh token each time its value
 * is requested, because if the token is too old, requests will be rejected.
 * Technically this may no longer be necessary since the SDK should gracefully
 * recover from unauthenticated errors (see b/33147818 for context), but it's
 * safer to keep the implementation as-is.
 */ class Y {
    constructor(t, e, n) {
        this.type = "FirstParty", this.user = C.FIRST_PARTY, this.headers = new Map, this.headers.set("X-Goog-AuthUser", e);
        const s = t.auth.getAuthHeaderValueForFirstParty([]);
        s && this.headers.set("Authorization", s), n && this.headers.set("X-Goog-Iam-Authorization-Token", n);
    }
}

/*
 * Provides user credentials required for the Firestore JavaScript SDK
 * to authenticate the user, using technique that is only available
 * to applications hosted by Google.
 */ class X {
    constructor(t, e, n) {
        this.h = t, this.l = e, this.m = n;
    }
    getToken() {
        return Promise.resolve(new Y(this.h, this.l, this.m));
    }
    start(t, e) {
        // Fire with initial uid.
        t.enqueueRetryable((() => e(C.FIRST_PARTY)));
    }
    shutdown() {}
    invalidateToken() {}
}

class Z {
    constructor(t) {
        this.value = t, this.type = "AppCheck", this.headers = new Map, t && t.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
    }
}

class tt {
    constructor(t) {
        this.g = t, this.forceRefresh = !1, this.appCheck = null, this.p = null;
    }
    start(t, e) {
        const n = t => {
            null != t.error && O("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);
            const n = t.token !== this.p;
            return this.p = t.token, O("FirebaseAppCheckTokenProvider", `Received ${n ? "new" : "existing"} token.`), 
            n ? e(t.token) : Promise.resolve();
        };
        this.o = e => {
            t.enqueueRetryable((() => n(e)));
        };
        const s = t => {
            O("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = t, this.appCheck.addTokenListener(this.o);
        };
        this.g.onInit((t => s(t))), 
        // Our users can initialize AppCheck after Firestore, so we give it
        // a chance to register itself with the component framework.
        setTimeout((() => {
            if (!this.appCheck) {
                const t = this.g.getImmediate({
                    optional: !0
                });
                t ? s(t) : 
                // If AppCheck is still not available, proceed without it.
                O("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
            }
        }), 0);
    }
    getToken() {
        const t = this.forceRefresh;
        return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(t).then((t => t ? (q("string" == typeof t.token), 
        this.p = t.token, new Z(t.token)) : null)) : Promise.resolve(null);
    }
    invalidateToken() {
        this.forceRefresh = !0;
    }
    shutdown() {
        this.appCheck && this.appCheck.removeTokenListener(this.o);
    }
}

/**
 * An AppCheck token provider that always yields an empty token.
 * @internal
 */ class et {
    getToken() {
        return Promise.resolve(new Z(""));
    }
    invalidateToken() {}
    start(t, e) {}
    shutdown() {}
}

/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */
/**
 * @license
 * Copyright 2018 Google LLC
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
 * `ListenSequence` is a monotonic sequence. It is initialized with a minimum value to
 * exceed. All subsequent calls to next will return increasing values. If provided with a
 * `SequenceNumberSyncer`, it will additionally bump its next value when told of a new value, as
 * well as write out sequence numbers that it produces via `next()`.
 */
class nt {
    constructor(t, e) {
        this.previousValue = t, e && (e.sequenceNumberHandler = t => this.I(t), this.T = t => e.writeSequenceNumber(t));
    }
    I(t) {
        return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
    }
    next() {
        const t = ++this.previousValue;
        return this.T && this.T(t), t;
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
 * Generates `nBytes` of random bytes.
 *
 * If `nBytes < 0` , an error will be thrown.
 */
function st(t) {
    // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
    const e = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
    if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n); else 
    // Falls back to Math.random
    for (let e = 0; e < t; e++) n[e] = Math.floor(256 * Math.random());
    return n;
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
 */ nt.A = -1;

class it {
    static R() {
        // Alphanumeric characters
        const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length;
        // The largest byte value that is a multiple of `char.length`.
                let n = "";
        for (;n.length < 20; ) {
            const s = st(40);
            for (let i = 0; i < s.length; ++i) 
            // Only accept values that are [0, maxMultiple), this ensures they can
            // be evenly mapped to indices of `chars` via a modulo operation.
            n.length < 20 && s[i] < e && (n += t.charAt(s[i] % t.length));
        }
        return n;
    }
}

function rt(t, e) {
    return t < e ? -1 : t > e ? 1 : 0;
}

/** Helper to compare arrays using isEqual(). */ function ot(t, e, n) {
    return t.length === e.length && t.every(((t, s) => n(t, e[s])));
}

/**
 * Returns the immediate lexicographically-following string. This is useful to
 * construct an inclusive range for indexeddb iterators.
 */ function at(t) {
    // Return the input string, with an additional NUL byte appended.
    return t + "\0";
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
// The earliest date supported by Firestore timestamps (0001-01-01T00:00:00Z).
/**
 * A `Timestamp` represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * It is encoded using the Proleptic Gregorian Calendar which extends the
 * Gregorian calendar backwards to year one. It is encoded assuming all minutes
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999999Z.
 *
 * For examples and further specifications, refer to the
 * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
 */
class ut {
    /**
     * Creates a new timestamp.
     *
     * @param seconds - The number of seconds of UTC time since Unix epoch
     *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
     *     9999-12-31T23:59:59Z inclusive.
     * @param nanoseconds - The non-negative fractions of a second at nanosecond
     *     resolution. Negative second values with fractions must still have
     *     non-negative nanoseconds values that count forward in time. Must be
     *     from 0 to 999,999,999 inclusive.
     */
    constructor(
    /**
     * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
     */
    t, 
    /**
     * The fractions of a second at nanosecond resolution.*
     */
    e) {
        if (this.seconds = t, this.nanoseconds = e, e < 0) throw new Q(G.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9) throw new Q(G.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800) throw new Q(G.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        // This will break in the year 10,000.
                if (t >= 253402300800) throw new Q(G.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
    }
    /**
     * Creates a new timestamp with the current date, with millisecond precision.
     *
     * @returns a new timestamp representing the current date.
     */    static now() {
        return ut.fromMillis(Date.now());
    }
    /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */    static fromDate(t) {
        return ut.fromMillis(t.getTime());
    }
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */    static fromMillis(t) {
        const e = Math.floor(t / 1e3), n = Math.floor(1e6 * (t - 1e3 * e));
        return new ut(e, n);
    }
    /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */    toDate() {
        return new Date(this.toMillis());
    }
    /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */    toMillis() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }
    _compareTo(t) {
        return this.seconds === t.seconds ? rt(this.nanoseconds, t.nanoseconds) : rt(this.seconds, t.seconds);
    }
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */    isEqual(t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
    }
    /** Returns a textual representation of this `Timestamp`. */    toString() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }
    /** Returns a JSON-serializable representation of this `Timestamp`. */    toJSON() {
        return {
            seconds: this.seconds,
            nanoseconds: this.nanoseconds
        };
    }
    /**
     * Converts this object to a primitive string, which allows `Timestamp` objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */    valueOf() {
        // This method returns a string of the form <seconds>.<nanoseconds> where
        // <seconds> is translated to have a non-negative value and both <seconds>
        // and <nanoseconds> are left-padded with zeroes to be a consistent length.
        // Strings with this format then have a lexiographical ordering that matches
        // the expected ordering. The <seconds> translation is done to avoid having
        // a leading negative sign (i.e. a leading '-' character) in its string
        // representation, which would affect its lexiographical ordering.
        const t = this.seconds - -62135596800;
        // Note: Up to 12 decimal digits are required to represent all valid
        // 'seconds' values.
                return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
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
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */ class ct {
    constructor(t) {
        this.timestamp = t;
    }
    static fromTimestamp(t) {
        return new ct(t);
    }
    static min() {
        return new ct(new ut(0, 0));
    }
    compareTo(t) {
        return this.timestamp._compareTo(t.timestamp);
    }
    isEqual(t) {
        return this.timestamp.isEqual(t.timestamp);
    }
    /** Returns a number representation of the version for use in spec tests. */    toMicroseconds() {
        // Convert to microseconds.
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }
    toString() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }
    toTimestamp() {
        return this.timestamp;
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
 */ function ht(t) {
    let e = 0;
    for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
    return e;
}

function lt(t, e) {
    for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
}

function ft(t) {
    for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
    return !0;
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
 * Path represents an ordered sequence of string segments.
 */
class dt {
    constructor(t, e, n) {
        void 0 === e ? e = 0 : e > t.length && L(), void 0 === n ? n = t.length - e : n > t.length - e && L(), 
        this.segments = t, this.offset = e, this.len = n;
    }
    get length() {
        return this.len;
    }
    isEqual(t) {
        return 0 === dt.comparator(this, t);
    }
    child(t) {
        const e = this.segments.slice(this.offset, this.limit());
        return t instanceof dt ? t.forEach((t => {
            e.push(t);
        })) : e.push(t), this.construct(e);
    }
    /** The index of one past the last segment of the path. */    limit() {
        return this.offset + this.length;
    }
    popFirst(t) {
        return t = void 0 === t ? 1 : t, this.construct(this.segments, this.offset + t, this.length - t);
    }
    popLast() {
        return this.construct(this.segments, this.offset, this.length - 1);
    }
    firstSegment() {
        return this.segments[this.offset];
    }
    lastSegment() {
        return this.get(this.length - 1);
    }
    get(t) {
        return this.segments[this.offset + t];
    }
    isEmpty() {
        return 0 === this.length;
    }
    isPrefixOf(t) {
        if (t.length < this.length) return !1;
        for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }
    isImmediateParentOf(t) {
        if (this.length + 1 !== t.length) return !1;
        for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
        return !0;
    }
    forEach(t) {
        for (let e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
    }
    toArray() {
        return this.segments.slice(this.offset, this.limit());
    }
    static comparator(t, e) {
        const n = Math.min(t.length, e.length);
        for (let s = 0; s < n; s++) {
            const n = t.get(s), i = e.get(s);
            if (n < i) return -1;
            if (n > i) return 1;
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
    }
}

/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 *
 * @internal
 */ class _t extends dt {
    construct(t, e, n) {
        return new _t(t, e, n);
    }
    canonicalString() {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        return this.toArray().join("/");
    }
    toString() {
        return this.canonicalString();
    }
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */    static fromString(...t) {
        // NOTE: The client is ignorant of any path segments containing escape
        // sequences (e.g. __id123__) and just passes them through raw (they exist
        // for legacy reasons and should not be used frequently).
        const e = [];
        for (const n of t) {
            if (n.indexOf("//") >= 0) throw new Q(G.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
            // Strip leading and traling slashed.
                        e.push(...n.split("/").filter((t => t.length > 0)));
        }
        return new _t(e);
    }
    static emptyPath() {
        return new _t([]);
    }
}

const wt = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

/**
 * A dot-separated path for navigating sub-objects within a document.
 * @internal
 */ class mt extends dt {
    construct(t, e, n) {
        return new mt(t, e, n);
    }
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */    static isValidIdentifier(t) {
        return wt.test(t);
    }
    canonicalString() {
        return this.toArray().map((t => (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), 
        mt.isValidIdentifier(t) || (t = "`" + t + "`"), t))).join(".");
    }
    toString() {
        return this.canonicalString();
    }
    /**
     * Returns true if this field references the key of a document.
     */    isKeyField() {
        return 1 === this.length && "__name__" === this.get(0);
    }
    /**
     * The field designating the key of a document.
     */    static keyField() {
        return new mt([ "__name__" ]);
    }
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */    static fromServerFormat(t) {
        const e = [];
        let n = "", s = 0;
        const i = () => {
            if (0 === n.length) throw new Q(G.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
            e.push(n), n = "";
        };
        let r = !1;
        for (;s < t.length; ) {
            const e = t[s];
            if ("\\" === e) {
                if (s + 1 === t.length) throw new Q(G.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                const e = t[s + 1];
                if ("\\" !== e && "." !== e && "`" !== e) throw new Q(G.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                n += e, s += 2;
            } else "`" === e ? (r = !r, s++) : "." !== e || r ? (n += e, s++) : (i(), s++);
        }
        if (i(), r) throw new Q(G.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
        return new mt(e);
    }
    static emptyPath() {
        return new mt([]);
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
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */ class gt {
    constructor(t) {
        this.fields = t, 
        // TODO(dimond): validation of FieldMask
        // Sort the field mask to support `FieldMask.isEqual()` and assert below.
        t.sort(mt.comparator);
    }
    /**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */    covers(t) {
        for (const e of this.fields) if (e.isPrefixOf(t)) return !0;
        return !1;
    }
    isEqual(t) {
        return ot(this.fields, t.fields, ((t, e) => t.isEqual(e)));
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
/** Converts a Base64 encoded string to a binary string. */
/** True if and only if the Base64 conversion functions are available. */
function yt() {
    return "undefined" != typeof atob;
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
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 * @internal
 */ class pt {
    constructor(t) {
        this.binaryString = t;
    }
    static fromBase64String(t) {
        const e = atob(t);
        return new pt(e);
    }
    static fromUint8Array(t) {
        // TODO(indexing); Remove the copy of the byte string here as this method
        // is frequently called during indexing.
        const e = 
        /**
 * Helper function to convert an Uint8array to a binary string.
 */
        function(t) {
            let e = "";
            for (let n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
            return e;
        }
        /**
 * Helper function to convert a binary string to an Uint8Array.
 */ (t);
        return new pt(e);
    }
    [Symbol.iterator]() {
        let t = 0;
        return {
            next: () => t < this.binaryString.length ? {
                value: this.binaryString.charCodeAt(t++),
                done: !1
            } : {
                value: void 0,
                done: !0
            }
        };
    }
    toBase64() {
        return t = this.binaryString, btoa(t);
        /** Converts a binary string to a Base64 encoded string. */
        var t;
    }
    toUint8Array() {
        return function(t) {
            const e = new Uint8Array(t.length);
            for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
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
        // A RegExp matching ISO 8601 UTC timestamps with optional fraction.
        (this.binaryString);
    }
    approximateByteSize() {
        return 2 * this.binaryString.length;
    }
    compareTo(t) {
        return rt(this.binaryString, t.binaryString);
    }
    isEqual(t) {
        return this.binaryString === t.binaryString;
    }
}

pt.EMPTY_BYTE_STRING = new pt("");

const It = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */ function Tt(t) {
    // The json interface (for the browser) will return an iso timestamp string,
    // while the proto js library (for node) will return a
    // google.protobuf.Timestamp instance.
    if (q(!!t), "string" == typeof t) {
        // The date string can have higher precision (nanos) than the Date class
        // (millis), so we do some custom parsing here.
        // Parse the nanos right out of the string.
        let e = 0;
        const n = It.exec(t);
        if (q(!!n), n[1]) {
            // Pad the fraction out to 9 digits (nanos).
            let t = n[1];
            t = (t + "000000000").substr(0, 9), e = Number(t);
        }
        // Parse the date to get the seconds.
                const s = new Date(t);
        return {
            seconds: Math.floor(s.getTime() / 1e3),
            nanos: e
        };
    }
    return {
        seconds: Et(t.seconds),
        nanos: Et(t.nanos)
    };
}

/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */ function Et(t) {
    // TODO(bjornick): Handle int64 greater than 53 bits.
    return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}

/** Converts the possible Proto types for Blobs into a ByteString. */ function At(t) {
    return "string" == typeof t ? pt.fromBase64String(t) : pt.fromUint8Array(t);
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
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   transform. They can only exist in the local view of a document. Therefore
 *   they do not need to be parsed or serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */ function Rt(t) {
    var e, n;
    return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}

/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */
/**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */
function bt(t) {
    const e = t.mapValue.fields.__previous_value__;
    return Rt(e) ? bt(e) : e;
}

/**
 * Returns the local time at which this timestamp was first set.
 */ function Pt(t) {
    const e = Tt(t.mapValue.fields.__local_write_time__.timestampValue);
    return new ut(e.seconds, e.nanos);
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
 */ class Vt {
    /**
     * Constructs a DatabaseInfo using the provided host, databaseId and
     * persistenceKey.
     *
     * @param databaseId - The database to use.
     * @param appId - The Firebase App Id.
     * @param persistenceKey - A unique identifier for this Firestore's local
     * storage (used in conjunction with the databaseId).
     * @param host - The Firestore backend host to connect to.
     * @param ssl - Whether to use SSL when connecting.
     * @param forceLongPolling - Whether to use the forceLongPolling option
     * when using WebChannel as the network transport.
     * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
     * option when using WebChannel as the network transport.
     * @param useFetchStreams Whether to use the Fetch API instead of
     * XMLHTTPRequest
     */
    constructor(t, e, n, s, i, r, o, a) {
        this.databaseId = t, this.appId = e, this.persistenceKey = n, this.host = s, this.ssl = i, 
        this.forceLongPolling = r, this.autoDetectLongPolling = o, this.useFetchStreams = a;
    }
}

/** The default database name for a project. */
/**
 * Represents the database ID a Firestore client is associated with.
 * @internal
 */
class vt {
    constructor(t, e) {
        this.projectId = t, this.database = e || "(default)";
    }
    static empty() {
        return new vt("", "");
    }
    get isDefaultDatabase() {
        return "(default)" === this.database;
    }
    isEqual(t) {
        return t instanceof vt && t.projectId === this.projectId && t.database === this.database;
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
/** Sentinel value that sorts before any Mutation Batch ID. */
/**
 * Returns whether a variable is either undefined or null.
 */
function St(t) {
    return null == t;
}

/** Returns whether the value represents -0. */ function Dt(t) {
    // Detect if the value is -0.0. Based on polyfill from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    return 0 === t && 1 / t == -1 / 0;
}

/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */ function Ct(t) {
    return "number" == typeof t && Number.isInteger(t) && !Dt(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
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
 * @internal
 */ class xt {
    constructor(t) {
        this.path = t;
    }
    static fromPath(t) {
        return new xt(_t.fromString(t));
    }
    static fromName(t) {
        return new xt(_t.fromString(t).popFirst(5));
    }
    static empty() {
        return new xt(_t.emptyPath());
    }
    get collectionGroup() {
        return this.path.popLast().lastSegment();
    }
    /** Returns true if the document is in the specified collectionId. */    hasCollectionId(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }
    /** Returns the collection group (i.e. the name of the parent collection) for this key. */    getCollectionGroup() {
        return this.path.get(this.path.length - 2);
    }
    /** Returns the fully qualified path to the parent collection. */    getCollectionPath() {
        return this.path.popLast();
    }
    isEqual(t) {
        return null !== t && 0 === _t.comparator(this.path, t.path);
    }
    toString() {
        return this.path.toString();
    }
    static comparator(t, e) {
        return _t.comparator(t.path, e.path);
    }
    static isDocumentKey(t) {
        return t.length % 2 == 0;
    }
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */    static fromSegments(t) {
        return new xt(new _t(t.slice()));
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
 */ const Nt = {
    mapValue: {
        fields: {
            __type__: {
                stringValue: "__max__"
            }
        }
    }
}, kt = {
    nullValue: "NULL_VALUE"
};

/** Extracts the backend's type order for the provided value. */
function Mt(t) {
    return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? Rt(t) ? 4 /* ServerTimestampValue */ : Ht(t) ? 9 /* ArrayValue */ : 10 /* ObjectValue */ : L();
}

/** Tests `left` and `right` for equality based on the backend semantics. */ function Ot(t, e) {
    if (t === e) return !0;
    const n = Mt(t);
    if (n !== Mt(e)) return !1;
    switch (n) {
      case 0 /* NullValue */ :
      case 9007199254740991 /* MaxValue */ :
        return !0;

      case 1 /* BooleanValue */ :
        return t.booleanValue === e.booleanValue;

      case 4 /* ServerTimestampValue */ :
        return Pt(t).isEqual(Pt(e));

      case 3 /* TimestampValue */ :
        return function(t, e) {
            if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
            // Use string equality for ISO 8601 timestamps
            return t.timestampValue === e.timestampValue;
            const n = Tt(t.timestampValue), s = Tt(e.timestampValue);
            return n.seconds === s.seconds && n.nanos === s.nanos;
        }(t, e);

      case 5 /* StringValue */ :
        return t.stringValue === e.stringValue;

      case 6 /* BlobValue */ :
        return function(t, e) {
            return At(t.bytesValue).isEqual(At(e.bytesValue));
        }(t, e);

      case 7 /* RefValue */ :
        return t.referenceValue === e.referenceValue;

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            return Et(t.geoPointValue.latitude) === Et(e.geoPointValue.latitude) && Et(t.geoPointValue.longitude) === Et(e.geoPointValue.longitude);
        }(t, e);

      case 2 /* NumberValue */ :
        return function(t, e) {
            if ("integerValue" in t && "integerValue" in e) return Et(t.integerValue) === Et(e.integerValue);
            if ("doubleValue" in t && "doubleValue" in e) {
                const n = Et(t.doubleValue), s = Et(e.doubleValue);
                return n === s ? Dt(n) === Dt(s) : isNaN(n) && isNaN(s);
            }
            return !1;
        }(t, e);

      case 9 /* ArrayValue */ :
        return ot(t.arrayValue.values || [], e.arrayValue.values || [], Ot);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            const n = t.mapValue.fields || {}, s = e.mapValue.fields || {};
            if (ht(n) !== ht(s)) return !1;
            for (const t in n) if (n.hasOwnProperty(t) && (void 0 === s[t] || !Ot(n[t], s[t]))) return !1;
            return !0;
        }
        /** Returns true if the ArrayValue contains the specified element. */ (t, e);

      default:
        return L();
    }
}

function $t(t, e) {
    return void 0 !== (t.values || []).find((t => Ot(t, e)));
}

function Ft(t, e) {
    if (t === e) return 0;
    const n = Mt(t), s = Mt(e);
    if (n !== s) return rt(n, s);
    switch (n) {
      case 0 /* NullValue */ :
      case 9007199254740991 /* MaxValue */ :
        return 0;

      case 1 /* BooleanValue */ :
        return rt(t.booleanValue, e.booleanValue);

      case 2 /* NumberValue */ :
        return function(t, e) {
            const n = Et(t.integerValue || t.doubleValue), s = Et(e.integerValue || e.doubleValue);
            return n < s ? -1 : n > s ? 1 : n === s ? 0 : 
            // one or both are NaN.
            isNaN(n) ? isNaN(s) ? 0 : -1 : 1;
        }(t, e);

      case 3 /* TimestampValue */ :
        return Bt(t.timestampValue, e.timestampValue);

      case 4 /* ServerTimestampValue */ :
        return Bt(Pt(t), Pt(e));

      case 5 /* StringValue */ :
        return rt(t.stringValue, e.stringValue);

      case 6 /* BlobValue */ :
        return function(t, e) {
            const n = At(t), s = At(e);
            return n.compareTo(s);
        }(t.bytesValue, e.bytesValue);

      case 7 /* RefValue */ :
        return function(t, e) {
            const n = t.split("/"), s = e.split("/");
            for (let t = 0; t < n.length && t < s.length; t++) {
                const e = rt(n[t], s[t]);
                if (0 !== e) return e;
            }
            return rt(n.length, s.length);
        }(t.referenceValue, e.referenceValue);

      case 8 /* GeoPointValue */ :
        return function(t, e) {
            const n = rt(Et(t.latitude), Et(e.latitude));
            if (0 !== n) return n;
            return rt(Et(t.longitude), Et(e.longitude));
        }(t.geoPointValue, e.geoPointValue);

      case 9 /* ArrayValue */ :
        return function(t, e) {
            const n = t.values || [], s = e.values || [];
            for (let t = 0; t < n.length && t < s.length; ++t) {
                const e = Ft(n[t], s[t]);
                if (e) return e;
            }
            return rt(n.length, s.length);
        }(t.arrayValue, e.arrayValue);

      case 10 /* ObjectValue */ :
        return function(t, e) {
            const n = t.fields || {}, s = Object.keys(n), i = e.fields || {}, r = Object.keys(i);
            // Even though MapValues are likely sorted correctly based on their insertion
            // order (e.g. when received from the backend), local modifications can bring
            // elements out of order. We need to re-sort the elements to ensure that
            // canonical IDs are independent of insertion order.
            s.sort(), r.sort();
            for (let t = 0; t < s.length && t < r.length; ++t) {
                const e = rt(s[t], r[t]);
                if (0 !== e) return e;
                const o = Ft(n[s[t]], i[r[t]]);
                if (0 !== o) return o;
            }
            return rt(s.length, r.length);
        }
        /**
 * Generates the canonical ID for the provided field value (as used in Target
 * serialization).
 */ (t.mapValue, e.mapValue);

      default:
        throw L();
    }
}

function Bt(t, e) {
    if ("string" == typeof t && "string" == typeof e && t.length === e.length) return rt(t, e);
    const n = Tt(t), s = Tt(e), i = rt(n.seconds, s.seconds);
    return 0 !== i ? i : rt(n.nanos, s.nanos);
}

function Lt(t) {
    return qt(t);
}

function qt(t) {
    return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
        const e = Tt(t);
        return `time(${e.seconds},${e.nanos})`;
    }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? At(t.bytesValue).toBase64() : "referenceValue" in t ? (n = t.referenceValue, 
    xt.fromName(n).toString()) : "geoPointValue" in t ? `geo(${(e = t.geoPointValue).latitude},${e.longitude})` : "arrayValue" in t ? function(t) {
        let e = "[", n = !0;
        for (const s of t.values || []) n ? n = !1 : e += ",", e += qt(s);
        return e + "]";
    }
    /** Returns a reference value for the provided database and key. */ (t.arrayValue) : "mapValue" in t ? function(t) {
        // Iteration order in JavaScript is not guaranteed. To ensure that we generate
        // matching canonical IDs for identical maps, we need to sort the keys.
        const e = Object.keys(t.fields || {}).sort();
        let n = "{", s = !0;
        for (const i of e) s ? s = !1 : n += ",", n += `${i}:${qt(t.fields[i])}`;
        return n + "}";
    }(t.mapValue) : L();
    var e, n;
}

function Ut(t, e) {
    return {
        referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`
    };
}

/** Returns true if `value` is an IntegerValue . */ function Kt(t) {
    return !!t && "integerValue" in t;
}

/** Returns true if `value` is a DoubleValue. */
/** Returns true if `value` is an ArrayValue. */
function Gt(t) {
    return !!t && "arrayValue" in t;
}

/** Returns true if `value` is a NullValue. */ function Qt(t) {
    return !!t && "nullValue" in t;
}

/** Returns true if `value` is NaN. */ function jt(t) {
    return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}

/** Returns true if `value` is a MapValue. */ function Wt(t) {
    return !!t && "mapValue" in t;
}

/** Creates a deep copy of `source`. */ function zt(t) {
    if (t.geoPointValue) return {
        geoPointValue: Object.assign({}, t.geoPointValue)
    };
    if (t.timestampValue && "object" == typeof t.timestampValue) return {
        timestampValue: Object.assign({}, t.timestampValue)
    };
    if (t.mapValue) {
        const e = {
            mapValue: {
                fields: {}
            }
        };
        return lt(t.mapValue.fields, ((t, n) => e.mapValue.fields[t] = zt(n))), e;
    }
    if (t.arrayValue) {
        const e = {
            arrayValue: {
                values: []
            }
        };
        for (let n = 0; n < (t.arrayValue.values || []).length; ++n) e.arrayValue.values[n] = zt(t.arrayValue.values[n]);
        return e;
    }
    return Object.assign({}, t);
}

/** Returns true if the Value represents the canonical {@link #MAX_VALUE} . */ function Ht(t) {
    return "__max__" === (((t.mapValue || {}).fields || {}).__type__ || {}).stringValue;
}

/** Returns the lowest value for the given value type (inclusive). */ function Jt(t, e) {
    return void 0 === t ? e : void 0 === e || Ft(t, e) > 0 ? t : e;
}

function Yt(t, e) {
    return void 0 === t ? e : void 0 === e || Ft(t, e) < 0 ? t : e;
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
 * An ObjectValue represents a MapValue in the Firestore Proto and offers the
 * ability to add and remove fields (via the ObjectValueBuilder).
 */ class Xt {
    constructor(t) {
        this.value = t;
    }
    static empty() {
        return new Xt({
            mapValue: {}
        });
    }
    /**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */    field(t) {
        if (t.isEmpty()) return this.value;
        {
            let e = this.value;
            for (let n = 0; n < t.length - 1; ++n) if (e = (e.mapValue.fields || {})[t.get(n)], 
            !Wt(e)) return null;
            return e = (e.mapValue.fields || {})[t.lastSegment()], e || null;
        }
    }
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */    set(t, e) {
        this.getFieldsMap(t.popLast())[t.lastSegment()] = zt(e);
    }
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */    setAll(t) {
        let e = mt.emptyPath(), n = {}, s = [];
        t.forEach(((t, i) => {
            if (!e.isImmediateParentOf(i)) {
                // Insert the accumulated changes at this parent location
                const t = this.getFieldsMap(e);
                this.applyChanges(t, n, s), n = {}, s = [], e = i.popLast();
            }
            t ? n[i.lastSegment()] = zt(t) : s.push(i.lastSegment());
        }));
        const i = this.getFieldsMap(e);
        this.applyChanges(i, n, s);
    }
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */    delete(t) {
        const e = this.field(t.popLast());
        Wt(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()];
    }
    isEqual(t) {
        return Ot(this.value, t.value);
    }
    /**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */    getFieldsMap(t) {
        let e = this.value;
        e.mapValue.fields || (e.mapValue = {
            fields: {}
        });
        for (let n = 0; n < t.length; ++n) {
            let s = e.mapValue.fields[t.get(n)];
            Wt(s) && s.mapValue.fields || (s = {
                mapValue: {
                    fields: {}
                }
            }, e.mapValue.fields[t.get(n)] = s), e = s;
        }
        return e.mapValue.fields;
    }
    /**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */    applyChanges(t, e, n) {
        lt(e, ((e, n) => t[e] = n));
        for (const e of n) delete t[e];
    }
    clone() {
        return new Xt(zt(this.value));
    }
}

/**
 * Returns a FieldMask built from all fields in a MapValue.
 */ function Zt(t) {
    const e = [];
    return lt(t.fields, ((t, n) => {
        const s = new mt([ t ]);
        if (Wt(n)) {
            const t = Zt(n.mapValue).fields;
            if (0 === t.length) 
            // Preserve the empty map by adding it to the FieldMask.
            e.push(s); else 
            // For nested and non-empty ObjectValues, add the FieldPath of the
            // leaf nodes.
            for (const n of t) e.push(s.child(n));
        } else 
        // For nested and non-empty ObjectValues, add the FieldPath of the leaf
        // nodes.
        e.push(s);
    })), new gt(e);
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
 * Represents a document in Firestore with a key, version, data and whether it
 * has local mutations applied to it.
 *
 * Documents can transition between states via `convertToFoundDocument()`,
 * `convertToNoDocument()` and `convertToUnknownDocument()`. If a document does
 * not transition to one of these states even after all mutations have been
 * applied, `isValidDocument()` returns false and the document should be removed
 * from all views.
 */ class te {
    constructor(t, e, n, s, i, r) {
        this.key = t, this.documentType = e, this.version = n, this.readTime = s, this.data = i, 
        this.documentState = r;
    }
    /**
     * Creates a document with no known version or data, but which can serve as
     * base document for mutations.
     */    static newInvalidDocument(t) {
        return new te(t, 0 /* INVALID */ , ct.min(), ct.min(), Xt.empty(), 0 /* SYNCED */);
    }
    /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */    static newFoundDocument(t, e, n) {
        return new te(t, 1 /* FOUND_DOCUMENT */ , e, ct.min(), n, 0 /* SYNCED */);
    }
    /** Creates a new document that is known to not exist at the given version. */    static newNoDocument(t, e) {
        return new te(t, 2 /* NO_DOCUMENT */ , e, ct.min(), Xt.empty(), 0 /* SYNCED */);
    }
    /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */    static newUnknownDocument(t, e) {
        return new te(t, 3 /* UNKNOWN_DOCUMENT */ , e, ct.min(), Xt.empty(), 2 /* HAS_COMMITTED_MUTATIONS */);
    }
    /**
     * Changes the document type to indicate that it exists and that its version
     * and data are known.
     */    convertToFoundDocument(t, e) {
        return this.version = t, this.documentType = 1 /* FOUND_DOCUMENT */ , this.data = e, 
        this.documentState = 0 /* SYNCED */ , this;
    }
    /**
     * Changes the document type to indicate that it doesn't exist at the given
     * version.
     */    convertToNoDocument(t) {
        return this.version = t, this.documentType = 2 /* NO_DOCUMENT */ , this.data = Xt.empty(), 
        this.documentState = 0 /* SYNCED */ , this;
    }
    /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */    convertToUnknownDocument(t) {
        return this.version = t, this.documentType = 3 /* UNKNOWN_DOCUMENT */ , this.data = Xt.empty(), 
        this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */ , this;
    }
    setHasCommittedMutations() {
        return this.documentState = 2 /* HAS_COMMITTED_MUTATIONS */ , this;
    }
    setHasLocalMutations() {
        return this.documentState = 1 /* HAS_LOCAL_MUTATIONS */ , this;
    }
    setReadTime(t) {
        return this.readTime = t, this;
    }
    get hasLocalMutations() {
        return 1 /* HAS_LOCAL_MUTATIONS */ === this.documentState;
    }
    get hasCommittedMutations() {
        return 2 /* HAS_COMMITTED_MUTATIONS */ === this.documentState;
    }
    get hasPendingWrites() {
        return this.hasLocalMutations || this.hasCommittedMutations;
    }
    isValidDocument() {
        return 0 /* INVALID */ !== this.documentType;
    }
    isFoundDocument() {
        return 1 /* FOUND_DOCUMENT */ === this.documentType;
    }
    isNoDocument() {
        return 2 /* NO_DOCUMENT */ === this.documentType;
    }
    isUnknownDocument() {
        return 3 /* UNKNOWN_DOCUMENT */ === this.documentType;
    }
    isEqual(t) {
        return t instanceof te && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.documentType === t.documentType && this.documentState === t.documentState && this.data.isEqual(t.data);
    }
    mutableCopy() {
        return new te(this.key, this.documentType, this.version, this.readTime, this.data.clone(), this.documentState);
    }
    toString() {
        return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
    }
}

/**
 * Compares the value for field `field` in the provided documents. Throws if
 * the field does not exist in both documents.
 */
/**
 * An index definition for field indexes in Firestore.
 *
 * Every index is associated with a collection. The definition contains a list
 * of fields and their index kind (which can be `ASCENDING`, `DESCENDING` or
 * `CONTAINS` for ArrayContains/ArrayContainsAny queries).
 *
 * Unlike the backend, the SDK does not differentiate between collection or
 * collection group-scoped indices. Every index can be used for both single
 * collection and collection group queries.
 */
class ee {
    constructor(
    /**
     * The index ID. Returns -1 if the index ID is not available (e.g. the index
     * has not yet been persisted).
     */
    t, 
    /** The collection ID this index applies to. */
    e, 
    /** The field segments for this index. */
    n, 
    /** Shows how up-to-date the index is for the current user. */
    s) {
        this.indexId = t, this.collectionGroup = e, this.fields = n, this.indexState = s;
    }
}

/** An ID for an index that has not yet been added to persistence.  */
/** Returns the ArrayContains/ArrayContainsAny segment for this index. */
function ne(t) {
    return t.fields.find((t => 2 /* CONTAINS */ === t.kind));
}

/** Returns all directional (ascending/descending) segments for this index. */ function se(t) {
    return t.fields.filter((t => 2 /* CONTAINS */ !== t.kind));
}

/** Returns a debug representation of the field index */ ee.UNKNOWN_ID = -1;

/** An index component consisting of field path and index type.  */
class ie {
    constructor(
    /** The field path of the component. */
    t, 
    /** The fields sorting order. */
    e) {
        this.fieldPath = t, this.kind = e;
    }
}

/**
 * Stores the "high water mark" that indicates how updated the Index is for the
 * current user.
 */ class re {
    constructor(
    /**
     * Indicates when the index was last updated (relative to other indexes).
     */
    t, 
    /** The the latest indexed read time, document and batch id. */
    e) {
        this.sequenceNumber = t, this.offset = e;
    }
    /** The state of an index that has not yet been backfilled. */    static empty() {
        return new re(0, oe.min());
    }
}

/**
 * Stores the latest read time, document and batch ID that were processed for an
 * index.
 */ class oe {
    constructor(
    /**
     * The latest read time version that has been indexed by Firestore for this
     * field index.
     */
    t, 
    /**
     * The key of the last document that was indexed for this query. Use
     * `DocumentKey.empty()` if no document has been indexed.
     */
    e, 
    /*
     * The largest mutation batch id that's been processed by Firestore.
     */
    n) {
        this.readTime = t, this.documentKey = e, this.largestBatchId = n;
    }
    /** The state of an index that has not yet been backfilled. */    static min() {
        return new oe(ct.min(), xt.empty(), -1);
    }
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
// Visible for testing
class ae {
    constructor(t, e = null, n = [], s = [], i = null, r = null, o = null) {
        this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = s, this.limit = i, 
        this.startAt = r, this.endAt = o, this.P = null;
    }
}

/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */ function ue(t, e = null, n = [], s = [], i = null, r = null, o = null) {
    return new ae(t, e, n, s, i, r, o);
}

function ce(t) {
    const e = K(t);
    if (null === e.P) {
        let t = e.path.canonicalString();
        null !== e.collectionGroup && (t += "|cg:" + e.collectionGroup), t += "|f:", t += e.filters.map((t => {
            return (e = t).field.canonicalString() + e.op.toString() + Lt(e.value);
            var e;
        })).join(","), t += "|ob:", t += e.orderBy.map((t => function(t) {
            // TODO(b/29183165): Make this collision robust.
            return t.field.canonicalString() + t.dir;
        }(t))).join(","), St(e.limit) || (t += "|l:", t += e.limit), e.startAt && (t += "|lb:", 
        t += e.startAt.inclusive ? "b:" : "a:", t += e.startAt.position.map((t => Lt(t))).join(",")), 
        e.endAt && (t += "|ub:", t += e.endAt.inclusive ? "a:" : "b:", t += e.endAt.position.map((t => Lt(t))).join(",")), 
        e.P = t;
    }
    return e.P;
}

function he(t) {
    let e = t.path.canonicalString();
    return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
    t.filters.length > 0 && (e += `, filters: [${t.filters.map((t => {
        return `${(e = t).field.canonicalString()} ${e.op} ${Lt(e.value)}`;
        /** Returns a debug description for `filter`. */
        var e;
        /** Filter that matches on key fields (i.e. '__name__'). */    })).join(", ")}]`), 
    St(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += `, orderBy: [${t.orderBy.map((t => function(t) {
        return `${t.field.canonicalString()} (${t.dir})`;
    }(t))).join(", ")}]`), t.startAt && (e += ", startAt: ", e += t.startAt.inclusive ? "b:" : "a:", 
    e += t.startAt.position.map((t => Lt(t))).join(",")), t.endAt && (e += ", endAt: ", 
    e += t.endAt.inclusive ? "a:" : "b:", e += t.endAt.position.map((t => Lt(t))).join(",")), 
    `Target(${e})`;
}

function le(t, e) {
    if (t.limit !== e.limit) return !1;
    if (t.orderBy.length !== e.orderBy.length) return !1;
    for (let n = 0; n < t.orderBy.length; n++) if (!be(t.orderBy[n], e.orderBy[n])) return !1;
    if (t.filters.length !== e.filters.length) return !1;
    for (let i = 0; i < t.filters.length; i++) if (n = t.filters[i], s = e.filters[i], 
    n.op !== s.op || !n.field.isEqual(s.field) || !Ot(n.value, s.value)) return !1;
    var n, s;
    return t.collectionGroup === e.collectionGroup && (!!t.path.isEqual(e.path) && (!!Ve(t.startAt, e.startAt) && Ve(t.endAt, e.endAt)));
}

function fe(t) {
    return xt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
}

/** Returns the field filters that target the given field path. */ function de(t, e) {
    return t.filters.filter((t => t instanceof _e && t.field.isEqual(e)));
}

/**
 * Returns the values that are used in ARRAY_CONTAINS or ARRAY_CONTAINS_ANY
 * filters. Returns `null` if there are no such filters.
 */ class _e extends class {} {
    constructor(t, e, n) {
        super(), this.field = t, this.op = e, this.value = n;
    }
    /**
     * Creates a filter based on the provided arguments.
     */    static create(t, e, n) {
        return t.isKeyField() ? "in" /* IN */ === e || "not-in" /* NOT_IN */ === e ? this.V(t, e, n) : new we(t, e, n) : "array-contains" /* ARRAY_CONTAINS */ === e ? new pe(t, n) : "in" /* IN */ === e ? new Ie(t, n) : "not-in" /* NOT_IN */ === e ? new Te(t, n) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Ee(t, n) : new _e(t, e, n);
    }
    static V(t, e, n) {
        return "in" /* IN */ === e ? new me(t, n) : new ge(t, n);
    }
    matches(t) {
        const e = t.data.field(this.field);
        // Types do not have to match in NOT_EQUAL filters.
                return "!=" /* NOT_EQUAL */ === this.op ? null !== e && this.v(Ft(e, this.value)) : null !== e && Mt(this.value) === Mt(e) && this.v(Ft(e, this.value));
        // Only compare types with matching backend order (such as double and int).
        }
    v(t) {
        switch (this.op) {
          case "<" /* LESS_THAN */ :
            return t < 0;

          case "<=" /* LESS_THAN_OR_EQUAL */ :
            return t <= 0;

          case "==" /* EQUAL */ :
            return 0 === t;

          case "!=" /* NOT_EQUAL */ :
            return 0 !== t;

          case ">" /* GREATER_THAN */ :
            return t > 0;

          case ">=" /* GREATER_THAN_OR_EQUAL */ :
            return t >= 0;

          default:
            return L();
        }
    }
    S() {
        return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
    }
}

class we extends _e {
    constructor(t, e, n) {
        super(t, e, n), this.key = xt.fromName(n.referenceValue);
    }
    matches(t) {
        const e = xt.comparator(t.key, this.key);
        return this.v(e);
    }
}

/** Filter that matches on key fields within an array. */ class me extends _e {
    constructor(t, e) {
        super(t, "in" /* IN */ , e), this.keys = ye("in" /* IN */ , e);
    }
    matches(t) {
        return this.keys.some((e => e.isEqual(t.key)));
    }
}

/** Filter that matches on key fields not present within an array. */ class ge extends _e {
    constructor(t, e) {
        super(t, "not-in" /* NOT_IN */ , e), this.keys = ye("not-in" /* NOT_IN */ , e);
    }
    matches(t) {
        return !this.keys.some((e => e.isEqual(t.key)));
    }
}

function ye(t, e) {
    var n;
    return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((t => xt.fromName(t.referenceValue)));
}

/** A Filter that implements the array-contains operator. */ class pe extends _e {
    constructor(t, e) {
        super(t, "array-contains" /* ARRAY_CONTAINS */ , e);
    }
    matches(t) {
        const e = t.data.field(this.field);
        return Gt(e) && $t(e.arrayValue, this.value);
    }
}

/** A Filter that implements the IN operator. */ class Ie extends _e {
    constructor(t, e) {
        super(t, "in" /* IN */ , e);
    }
    matches(t) {
        const e = t.data.field(this.field);
        return null !== e && $t(this.value.arrayValue, e);
    }
}

/** A Filter that implements the not-in operator. */ class Te extends _e {
    constructor(t, e) {
        super(t, "not-in" /* NOT_IN */ , e);
    }
    matches(t) {
        if ($t(this.value.arrayValue, {
            nullValue: "NULL_VALUE"
        })) return !1;
        const e = t.data.field(this.field);
        return null !== e && !$t(this.value.arrayValue, e);
    }
}

/** A Filter that implements the array-contains-any operator. */ class Ee extends _e {
    constructor(t, e) {
        super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , e);
    }
    matches(t) {
        const e = t.data.field(this.field);
        return !(!Gt(e) || !e.arrayValue.values) && e.arrayValue.values.some((t => $t(this.value.arrayValue, t)));
    }
}

/**
 * Represents a bound of a query.
 *
 * The bound is specified with the given components representing a position and
 * whether it's just before or just after the position (relative to whatever the
 * query order is).
 *
 * The position represents a logical index position for a query. It's a prefix
 * of values for the (potentially implicit) order by clauses of a query.
 *
 * Bound provides a function to determine whether a document comes before or
 * after a bound. This is influenced by whether the position is just before or
 * just after the provided values.
 */ class Ae {
    constructor(t, e) {
        this.position = t, this.inclusive = e;
    }
}

/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */ class Re {
    constructor(t, e = "asc" /* ASCENDING */) {
        this.field = t, this.dir = e;
    }
}

function be(t, e) {
    return t.dir === e.dir && t.field.isEqual(e.field);
}

function Pe(t, e, n) {
    let s = 0;
    for (let i = 0; i < t.position.length; i++) {
        const r = e[i], o = t.position[i];
        if (r.field.isKeyField()) s = xt.comparator(xt.fromName(o.referenceValue), n.key); else {
            s = Ft(o, n.data.field(r.field));
        }
        if ("desc" /* DESCENDING */ === r.dir && (s *= -1), 0 !== s) break;
    }
    return s;
}

/**
 * Returns true if a document sorts after a bound using the provided sort
 * order.
 */ function Ve(t, e) {
    if (null === t) return null === e;
    if (null === e) return !1;
    if (t.inclusive !== e.inclusive || t.position.length !== e.position.length) return !1;
    for (let n = 0; n < t.position.length; n++) {
        if (!Ot(t.position[n], e.position[n])) return !1;
    }
    return !0;
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
 * Query encapsulates all the query attributes we support in the SDK. It can
 * be run against the LocalStore, as well as be converted to a `Target` to
 * query the RemoteStore results.
 *
 * Visible for testing.
 */ class ve {
    /**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */
    constructor(t, e = null, n = [], s = [], i = null, r = "F" /* First */ , o = null, a = null) {
        this.path = t, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = s, 
        this.limit = i, this.limitType = r, this.startAt = o, this.endAt = a, this.D = null, 
        // The corresponding `Target` of this `Query` instance.
        this.C = null, this.startAt, this.endAt;
    }
}

/** Creates a new Query instance with the options provided. */ function Se(t, e, n, s, i, r, o, a) {
    return new ve(t, e, n, s, i, r, o, a);
}

/** Creates a new Query for a query that matches all documents at `path` */ function De(t) {
    return new ve(t);
}

/**
 * Helper to convert a collection group query into a collection query at a
 * specific path. This is used when executing collection group queries, since
 * we have to split the query into a set of collection queries at multiple
 * paths.
 */ function Ce(t) {
    return !St(t.limit) && "F" /* First */ === t.limitType;
}

function xe(t) {
    return !St(t.limit) && "L" /* Last */ === t.limitType;
}

function Ne(t) {
    return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
}

function ke(t) {
    for (const e of t.filters) if (e.S()) return e.field;
    return null;
}

/**
 * Checks if any of the provided Operators are included in the query and
 * returns the first one that is, or null if none are.
 */
/**
 * Returns whether the query matches a collection group rather than a specific
 * collection.
 */
function Me(t) {
    return null !== t.collectionGroup;
}

/**
 * Returns the implicit order by constraint that is used to execute the Query,
 * which can be different from the order by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`).
 */ function Oe(t) {
    const e = K(t);
    if (null === e.D) {
        e.D = [];
        const t = ke(e), n = Ne(e);
        if (null !== t && null === n) 
        // In order to implicitly add key ordering, we must also add the
        // inequality filter field for it to be a valid query.
        // Note that the default inequality field and key ordering is ascending.
        t.isKeyField() || e.D.push(new Re(t)), e.D.push(new Re(mt.keyField(), "asc" /* ASCENDING */)); else {
            let t = !1;
            for (const n of e.explicitOrderBy) e.D.push(n), n.field.isKeyField() && (t = !0);
            if (!t) {
                // The order of the implicit key ordering always matches the last
                // explicit order by
                const t = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc" /* ASCENDING */;
                e.D.push(new Re(mt.keyField(), t));
            }
        }
    }
    return e.D;
}

/**
 * Converts this `Query` instance to it's corresponding `Target` representation.
 */ function $e(t) {
    const e = K(t);
    if (!e.C) if ("F" /* First */ === e.limitType) e.C = ue(e.path, e.collectionGroup, Oe(e), e.filters, e.limit, e.startAt, e.endAt); else {
        // Flip the orderBy directions since we want the last results
        const t = [];
        for (const n of Oe(e)) {
            const e = "desc" /* DESCENDING */ === n.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
            t.push(new Re(n.field, e));
        }
        // We need to swap the cursors to match the now-flipped query ordering.
                const n = e.endAt ? new Ae(e.endAt.position, !e.endAt.inclusive) : null, s = e.startAt ? new Ae(e.startAt.position, !e.startAt.inclusive) : null;
        // Now return as a LimitType.First query.
        e.C = ue(e.path, e.collectionGroup, t, e.filters, e.limit, n, s);
    }
    return e.C;
}

function Fe(t, e, n) {
    return new ve(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
}

function Be(t, e) {
    return le($e(t), $e(e)) && t.limitType === e.limitType;
}

// TODO(b/29183165): This is used to get a unique string from a query to, for
// example, use as a dictionary key, but the implementation is subject to
// collisions. Make it collision-free.
function Le(t) {
    return `${ce($e(t))}|lt:${t.limitType}`;
}

function qe(t) {
    return `Query(target=${he($e(t))}; limitType=${t.limitType})`;
}

/** Returns whether `doc` matches the constraints of `query`. */ function Ue(t, e) {
    return e.isFoundDocument() && function(t, e) {
        const n = e.key.path;
        return null !== t.collectionGroup ? e.key.hasCollectionId(t.collectionGroup) && t.path.isPrefixOf(n) : xt.isDocumentKey(t.path) ? t.path.isEqual(n) : t.path.isImmediateParentOf(n);
    }
    /**
 * A document must have a value for every ordering clause in order to show up
 * in the results.
 */ (t, e) && function(t, e) {
        for (const n of t.explicitOrderBy) 
        // order by key always matches
        if (!n.field.isKeyField() && null === e.data.field(n.field)) return !1;
        return !0;
    }(t, e) && function(t, e) {
        for (const n of t.filters) if (!n.matches(e)) return !1;
        return !0;
    }
    /** Makes sure a document is within the bounds, if provided. */ (t, e) && function(t, e) {
        if (t.startAt && !
        /**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */
        function(t, e, n) {
            const s = Pe(t, e, n);
            return t.inclusive ? s <= 0 : s < 0;
        }(t.startAt, Oe(t), e)) return !1;
        if (t.endAt && !function(t, e, n) {
            const s = Pe(t, e, n);
            return t.inclusive ? s >= 0 : s > 0;
        }(t.endAt, Oe(t), e)) return !1;
        return !0;
    }
    /**
 * Returns a new comparator function that can be used to compare two documents
 * based on the Query's ordering constraint.
 */ (t, e);
}

function Ke(t) {
    return (e, n) => {
        let s = !1;
        for (const i of Oe(t)) {
            const t = Ge(i, e, n);
            if (0 !== t) return t;
            s = s || i.field.isKeyField();
        }
        return 0;
    };
}

function Ge(t, e, n) {
    const s = t.field.isKeyField() ? xt.comparator(e.key, n.key) : function(t, e, n) {
        const s = e.data.field(t), i = n.data.field(t);
        return null !== s && null !== i ? Ft(s, i) : L();
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
 * The initial mutation batch id for each index. Gets updated during index
 * backfill.
 */ (t.field, e, n);
    switch (t.dir) {
      case "asc" /* ASCENDING */ :
        return s;

      case "desc" /* DESCENDING */ :
        return -1 * s;

      default:
        return L();
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
 * Returns an DoubleValue for `value` that is encoded based the serializer's
 * `useProto3Json` setting.
 */ function Qe(t, e) {
    if (t.N) {
        if (isNaN(e)) return {
            doubleValue: "NaN"
        };
        if (e === 1 / 0) return {
            doubleValue: "Infinity"
        };
        if (e === -1 / 0) return {
            doubleValue: "-Infinity"
        };
    }
    return {
        doubleValue: Dt(e) ? "-0" : e
    };
}

/**
 * Returns an IntegerValue for `value`.
 */ function je(t) {
    return {
        integerValue: "" + t
    };
}

/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */ function We(t, e) {
    return Ct(e) ? je(e) : Qe(t, e);
}

/**
 * @license
 * Copyright 2018 Google LLC
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
/** Used to represent a field transform on a mutation. */ class ze {
    constructor() {
        // Make sure that the structural type of `TransformOperation` is unique.
        // See https://github.com/microsoft/TypeScript/issues/5451
        this._ = void 0;
    }
}

/**
 * Computes the local transform result against the provided `previousValue`,
 * optionally using the provided localWriteTime.
 */ function He(t, e, n) {
    return t instanceof Xe ? function(t, e) {
        const n = {
            fields: {
                __type__: {
                    stringValue: "server_timestamp"
                },
                __local_write_time__: {
                    timestampValue: {
                        seconds: t.seconds,
                        nanos: t.nanoseconds
                    }
                }
            }
        };
        return e && (n.fields.__previous_value__ = e), {
            mapValue: n
        };
    }(n, e) : t instanceof Ze ? tn(t, e) : t instanceof en ? nn(t, e) : function(t, e) {
        // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
        // precision and resolves overflows by reducing precision, we do not
        // manually cap overflows at 2^63.
        const n = Ye(t, e), s = rn(n) + rn(t.k);
        return Kt(n) && Kt(t.k) ? je(s) : Qe(t.M, s);
    }(t, e);
}

/**
 * Computes a final transform result after the transform has been acknowledged
 * by the server, potentially using the server-provided transformResult.
 */ function Je(t, e, n) {
    // The server just sends null as the transform result for array operations,
    // so we have to calculate a result the same as we do for local
    // applications.
    return t instanceof Ze ? tn(t, e) : t instanceof en ? nn(t, e) : n;
}

/**
 * If this transform operation is not idempotent, returns the base value to
 * persist for this transform. If a base value is returned, the transform
 * operation is always applied to this base value, even if document has
 * already been updated.
 *
 * Base values provide consistent behavior for non-idempotent transforms and
 * allow us to return the same latency-compensated value even if the backend
 * has already applied the transform operation. The base value is null for
 * idempotent transforms, as they can be re-played even if the backend has
 * already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent transforms.
 */ function Ye(t, e) {
    return t instanceof sn ? Kt(n = e) || function(t) {
        return !!t && "doubleValue" in t;
    }
    /** Returns true if `value` is either an IntegerValue or a DoubleValue. */ (n) ? e : {
        integerValue: 0
    } : null;
    var n;
}

/** Transforms a value into a server-generated timestamp. */
class Xe extends ze {}

/** Transforms an array value via a union operation. */ class Ze extends ze {
    constructor(t) {
        super(), this.elements = t;
    }
}

function tn(t, e) {
    const n = on(e);
    for (const e of t.elements) n.some((t => Ot(t, e))) || n.push(e);
    return {
        arrayValue: {
            values: n
        }
    };
}

/** Transforms an array value via a remove operation. */ class en extends ze {
    constructor(t) {
        super(), this.elements = t;
    }
}

function nn(t, e) {
    let n = on(e);
    for (const e of t.elements) n = n.filter((t => !Ot(t, e)));
    return {
        arrayValue: {
            values: n
        }
    };
}

/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */ class sn extends ze {
    constructor(t, e) {
        super(), this.M = t, this.k = e;
    }
}

function rn(t) {
    return Et(t.integerValue || t.doubleValue);
}

function on(t) {
    return Gt(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
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
/** A field path and the TransformOperation to perform upon it. */ class an {
    constructor(t, e) {
        this.field = t, this.transform = e;
    }
}

function un(t, e) {
    return t.field.isEqual(e.field) && function(t, e) {
        return t instanceof Ze && e instanceof Ze || t instanceof en && e instanceof en ? ot(t.elements, e.elements, Ot) : t instanceof sn && e instanceof sn ? Ot(t.k, e.k) : t instanceof Xe && e instanceof Xe;
    }(t.transform, e.transform);
}

/** The result of successfully applying a mutation to the backend. */
class cn {
    constructor(
    /**
     * The version at which the mutation was committed:
     *
     * - For most operations, this is the updateTime in the WriteResult.
     * - For deletes, the commitTime of the WriteResponse (because deletes are
     *   not stored and have no updateTime).
     *
     * Note that these versions can be different: No-op writes will not change
     * the updateTime even though the commitTime advances.
     */
    t, 
    /**
     * The resulting fields returned from the backend after a mutation
     * containing field transforms has been committed. Contains one FieldValue
     * for each FieldTransform that was in the mutation.
     *
     * Will be empty if the mutation did not contain any field transforms.
     */
    e) {
        this.version = t, this.transformResults = e;
    }
}

/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */ class hn {
    constructor(t, e) {
        this.updateTime = t, this.exists = e;
    }
    /** Creates a new empty Precondition. */    static none() {
        return new hn;
    }
    /** Creates a new Precondition with an exists flag. */    static exists(t) {
        return new hn(void 0, t);
    }
    /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
        return new hn(t);
    }
    /** Returns whether this Precondition is empty. */    get isNone() {
        return void 0 === this.updateTime && void 0 === this.exists;
    }
    isEqual(t) {
        return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
    }
}

/** Returns true if the preconditions is valid for the given document. */ function ln(t, e) {
    return void 0 !== t.updateTime ? e.isFoundDocument() && e.version.isEqual(t.updateTime) : void 0 === t.exists || t.exists === e.isFoundDocument();
}

/**
 * A mutation describes a self-contained change to a document. Mutations can
 * create, replace, delete, and update subsets of documents.
 *
 * Mutations not only act on the value of the document but also its version.
 *
 * For local mutations (mutations that haven't been committed yet), we preserve
 * the existing version for Set and Patch mutations. For Delete mutations, we
 * reset the version to 0.
 *
 * Here's the expected transition table.
 *
 * MUTATION           APPLIED TO            RESULTS IN
 *
 * SetMutation        Document(v3)          Document(v3)
 * SetMutation        NoDocument(v3)        Document(v0)
 * SetMutation        InvalidDocument(v0)   Document(v0)
 * PatchMutation      Document(v3)          Document(v3)
 * PatchMutation      NoDocument(v3)        NoDocument(v3)
 * PatchMutation      InvalidDocument(v0)   UnknownDocument(v3)
 * DeleteMutation     Document(v3)          NoDocument(v0)
 * DeleteMutation     NoDocument(v3)        NoDocument(v0)
 * DeleteMutation     InvalidDocument(v0)   NoDocument(v0)
 *
 * For acknowledged mutations, we use the updateTime of the WriteResponse as
 * the resulting version for Set and Patch mutations. As deletes have no
 * explicit update time, we use the commitTime of the WriteResponse for
 * Delete mutations.
 *
 * If a mutation is acknowledged by the backend but fails the precondition check
 * locally, we transition to an `UnknownDocument` and rely on Watch to send us
 * the updated version.
 *
 * Field transforms are used only with Patch and Set Mutations. We use the
 * `updateTransforms` message to store transforms, rather than the `transforms`s
 * messages.
 *
 * ## Subclassing Notes
 *
 * Every type of mutation needs to implement its own applyToRemoteDocument() and
 * applyToLocalView() to implement the actual behavior of applying the mutation
 * to some source document (see `setMutationApplyToRemoteDocument()` for an
 * example).
 */ class fn {}

/**
 * Applies this mutation to the given document for the purposes of computing a
 * new remote document. If the input document doesn't match the expected state
 * (e.g. it is invalid or outdated), the document type may transition to
 * unknown.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param mutationResult - The result of applying the mutation from the backend.
 */ function dn(t, e, n) {
    t instanceof yn ? function(t, e, n) {
        // Unlike setMutationApplyToLocalView, if we're applying a mutation to a
        // remote document the server has accepted the mutation so the precondition
        // must have held.
        const s = t.value.clone(), i = Tn(t.fieldTransforms, e, n.transformResults);
        s.setAll(i), e.convertToFoundDocument(n.version, s).setHasCommittedMutations();
    }(t, e, n) : t instanceof pn ? function(t, e, n) {
        if (!ln(t.precondition, e)) 
        // Since the mutation was not rejected, we know that the precondition
        // matched on the backend. We therefore must not have the expected version
        // of the document in our cache and convert to an UnknownDocument with a
        // known updateTime.
        return void e.convertToUnknownDocument(n.version);
        const s = Tn(t.fieldTransforms, e, n.transformResults), i = e.data;
        i.setAll(In(t)), i.setAll(s), e.convertToFoundDocument(n.version, i).setHasCommittedMutations();
    }(t, e, n) : function(t, e, n) {
        // Unlike applyToLocalView, if we're applying a mutation to a remote
        // document the server has accepted the mutation so the precondition must
        // have held.
        e.convertToNoDocument(n.version).setHasCommittedMutations();
    }(0, e, n);
}

/**
 * Applies this mutation to the given document for the purposes of computing
 * the new local view of a document. If the input document doesn't match the
 * expected state, the document is not modified.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param localWriteTime - A timestamp indicating the local write time of the
 *     batch this mutation is a part of.
 */ function _n(t, e, n) {
    t instanceof yn ? function(t, e, n) {
        if (!ln(t.precondition, e)) 
        // The mutation failed to apply (e.g. a document ID created with add()
        // caused a name collision).
        return;
        const s = t.value.clone(), i = En(t.fieldTransforms, n, e);
        s.setAll(i), e.convertToFoundDocument(gn(e), s).setHasLocalMutations();
    }
    /**
 * A mutation that modifies fields of the document at the given key with the
 * given values. The values are applied through a field mask:
 *
 *  * When a field is in both the mask and the values, the corresponding field
 *    is updated.
 *  * When a field is in neither the mask nor the values, the corresponding
 *    field is unmodified.
 *  * When a field is in the mask but not in the values, the corresponding field
 *    is deleted.
 *  * When a field is not in the mask but is in the values, the values map is
 *    ignored.
 */ (t, e, n) : t instanceof pn ? function(t, e, n) {
        if (!ln(t.precondition, e)) return;
        const s = En(t.fieldTransforms, n, e), i = e.data;
        i.setAll(In(t)), i.setAll(s), e.convertToFoundDocument(gn(e), i).setHasLocalMutations();
    }
    /**
 * Returns a FieldPath/Value map with the content of the PatchMutation.
 */ (t, e, n) : function(t, e) {
        ln(t.precondition, e) && 
        // We don't call `setHasLocalMutations()` since we want to be backwards
        // compatible with the existing SDK behavior.
        e.convertToNoDocument(ct.min());
    }
    /**
 * A mutation that verifies the existence of the document at the given key with
 * the provided precondition.
 *
 * The `verify` operation is only used in Transactions, and this class serves
 * primarily to facilitate serialization into protos.
 */ (t, e);
}

/**
 * If this mutation is not idempotent, returns the base value to persist with
 * this mutation. If a base value is returned, the mutation is always applied
 * to this base value, even if document has already been updated.
 *
 * The base value is a sparse object that consists of only the document
 * fields for which this mutation contains a non-idempotent transformation
 * (e.g. a numeric increment). The provided value guarantees consistent
 * behavior for non-idempotent transforms and allow us to return the same
 * latency-compensated value even if the backend has already applied the
 * mutation. The base value is null for idempotent mutations, as they can be
 * re-played even if the backend has already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent mutations.
 */ function wn(t, e) {
    let n = null;
    for (const s of t.fieldTransforms) {
        const t = e.data.field(s.field), i = Ye(s.transform, t || null);
        null != i && (null == n && (n = Xt.empty()), n.set(s.field, i));
    }
    return n || null;
}

function mn(t, e) {
    return t.type === e.type && (!!t.key.isEqual(e.key) && (!!t.precondition.isEqual(e.precondition) && (!!function(t, e) {
        return void 0 === t && void 0 === e || !(!t || !e) && ot(t, e, ((t, e) => un(t, e)));
    }(t.fieldTransforms, e.fieldTransforms) && (0 /* Set */ === t.type ? t.value.isEqual(e.value) : 1 /* Patch */ !== t.type || t.data.isEqual(e.data) && t.fieldMask.isEqual(e.fieldMask)))));
}

/**
 * Returns the version from the given document for use as the result of a
 * mutation. Mutations are defined to return the version of the base document
 * only if it is an existing document. Deleted and unknown documents have a
 * post-mutation version of SnapshotVersion.min().
 */ function gn(t) {
    return t.isFoundDocument() ? t.version : ct.min();
}

/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */ class yn extends fn {
    constructor(t, e, n, s = []) {
        super(), this.key = t, this.value = e, this.precondition = n, this.fieldTransforms = s, 
        this.type = 0 /* Set */;
    }
}

class pn extends fn {
    constructor(t, e, n, s, i = []) {
        super(), this.key = t, this.data = e, this.fieldMask = n, this.precondition = s, 
        this.fieldTransforms = i, this.type = 1 /* Patch */;
    }
}

function In(t) {
    const e = new Map;
    return t.fieldMask.fields.forEach((n => {
        if (!n.isEmpty()) {
            const s = t.data.field(n);
            e.set(n, s);
        }
    })), e;
}

/**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use after a mutation
 * containing transforms has been acknowledged by the server.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param mutableDocument - The current state of the document after applying all
 * previous mutations.
 * @param serverTransformResults - The transform results received by the server.
 * @returns The transform results list.
 */ function Tn(t, e, n) {
    const s = new Map;
    q(t.length === n.length);
    for (let i = 0; i < n.length; i++) {
        const r = t[i], o = r.transform, a = e.data.field(r.field);
        s.set(r.field, Je(o, a, n[i]));
    }
    return s;
}

/**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use when applying a
 * transform locally.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param localWriteTime - The local time of the mutation (used to
 *     generate ServerTimestampValues).
 * @param mutableDocument - The current state of the document after applying all
 *     previous mutations.
 * @returns The transform results list.
 */ function En(t, e, n) {
    const s = new Map;
    for (const i of t) {
        const t = i.transform, r = n.data.field(i.field);
        s.set(i.field, He(t, r, e));
    }
    return s;
}

/** A mutation that deletes the document at the given key. */ class An extends fn {
    constructor(t, e) {
        super(), this.key = t, this.precondition = e, this.type = 2 /* Delete */ , this.fieldTransforms = [];
    }
}

class Rn extends fn {
    constructor(t, e) {
        super(), this.key = t, this.precondition = e, this.type = 3 /* Verify */ , this.fieldTransforms = [];
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
 */ class bn {
    // TODO(b/33078163): just use simplest form of existence filter for now
    constructor(t) {
        this.count = t;
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
 * Error Codes describing the different ways GRPC can fail. These are copied
 * directly from GRPC's sources here:
 *
 * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
 *
 * Important! The names of these identifiers matter because the string forms
 * are used for reverse lookups from the webchannel stream. Do NOT change the
 * names of these identifiers or change this into a const enum.
 */ var Pn, Vn;

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a non-write operation.
 *
 * See isPermanentWriteError for classifying write errors.
 */
function vn(t) {
    switch (t) {
      default:
        return L();

      case G.CANCELLED:
      case G.UNKNOWN:
      case G.DEADLINE_EXCEEDED:
      case G.RESOURCE_EXHAUSTED:
      case G.INTERNAL:
      case G.UNAVAILABLE:
 // Unauthenticated means something went wrong with our token and we need
        // to retry with new credentials which will happen automatically.
              case G.UNAUTHENTICATED:
        return !1;

      case G.INVALID_ARGUMENT:
      case G.NOT_FOUND:
      case G.ALREADY_EXISTS:
      case G.PERMISSION_DENIED:
      case G.FAILED_PRECONDITION:
 // Aborted might be retried in some scenarios, but that is dependant on
        // the context and should handled individually by the calling code.
        // See https://cloud.google.com/apis/design/errors.
              case G.ABORTED:
      case G.OUT_OF_RANGE:
      case G.UNIMPLEMENTED:
      case G.DATA_LOSS:
        return !0;
    }
}

/**
 * Determines whether an error code represents a permanent error when received
 * in response to a write operation.
 *
 * Write operations must be handled specially because as of b/119437764, ABORTED
 * errors on the write stream should be retried too (even though ABORTED errors
 * are not generally retryable).
 *
 * Note that during the initial handshake on the write stream an ABORTED error
 * signals that we should discard our stream token (i.e. it is permanent). This
 * means a handshake error should be classified with isPermanentError, above.
 */
/**
 * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
 * are not the same as HTTP status codes.
 *
 * @returns The Code equivalent to the given GRPC status code. Fails if there
 *     is no match.
 */
function Sn(t) {
    if (void 0 === t) 
    // This shouldn't normally happen, but in certain error cases (like trying
    // to send invalid proto messages) we may get an error with no GRPC code.
    return $("GRPC error has no .code"), G.UNKNOWN;
    switch (t) {
      case Pn.OK:
        return G.OK;

      case Pn.CANCELLED:
        return G.CANCELLED;

      case Pn.UNKNOWN:
        return G.UNKNOWN;

      case Pn.DEADLINE_EXCEEDED:
        return G.DEADLINE_EXCEEDED;

      case Pn.RESOURCE_EXHAUSTED:
        return G.RESOURCE_EXHAUSTED;

      case Pn.INTERNAL:
        return G.INTERNAL;

      case Pn.UNAVAILABLE:
        return G.UNAVAILABLE;

      case Pn.UNAUTHENTICATED:
        return G.UNAUTHENTICATED;

      case Pn.INVALID_ARGUMENT:
        return G.INVALID_ARGUMENT;

      case Pn.NOT_FOUND:
        return G.NOT_FOUND;

      case Pn.ALREADY_EXISTS:
        return G.ALREADY_EXISTS;

      case Pn.PERMISSION_DENIED:
        return G.PERMISSION_DENIED;

      case Pn.FAILED_PRECONDITION:
        return G.FAILED_PRECONDITION;

      case Pn.ABORTED:
        return G.ABORTED;

      case Pn.OUT_OF_RANGE:
        return G.OUT_OF_RANGE;

      case Pn.UNIMPLEMENTED:
        return G.UNIMPLEMENTED;

      case Pn.DATA_LOSS:
        return G.DATA_LOSS;

      default:
        return L();
    }
}

/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status - An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */ (Vn = Pn || (Pn = {}))[Vn.OK = 0] = "OK", Vn[Vn.CANCELLED = 1] = "CANCELLED", 
Vn[Vn.UNKNOWN = 2] = "UNKNOWN", Vn[Vn.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
Vn[Vn.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Vn[Vn.NOT_FOUND = 5] = "NOT_FOUND", 
Vn[Vn.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Vn[Vn.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
Vn[Vn.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Vn[Vn.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
Vn[Vn.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Vn[Vn.ABORTED = 10] = "ABORTED", 
Vn[Vn.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Vn[Vn.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
Vn[Vn.INTERNAL = 13] = "INTERNAL", Vn[Vn.UNAVAILABLE = 14] = "UNAVAILABLE", Vn[Vn.DATA_LOSS = 15] = "DATA_LOSS";

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
 * A map implementation that uses objects as keys. Objects must have an
 * associated equals function and must be immutable. Entries in the map are
 * stored together with the key being produced from the mapKeyFn. This map
 * automatically handles collisions of keys.
 */
class Dn {
    constructor(t, e) {
        this.mapKeyFn = t, this.equalsFn = e, 
        /**
         * The inner map for a key/value pair. Due to the possibility of collisions we
         * keep a list of entries that we do a linear search through to find an actual
         * match. Note that collisions should be rare, so we still expect near
         * constant time lookups in practice.
         */
        this.inner = {}, 
        /** The number of entries stored in the map */
        this.innerSize = 0;
    }
    /** Get a value for this key, or undefined if it does not exist. */    get(t) {
        const e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 !== n) for (const [e, s] of n) if (this.equalsFn(e, t)) return s;
    }
    has(t) {
        return void 0 !== this.get(t);
    }
    /** Put this key and value in the map. */    set(t, e) {
        const n = this.mapKeyFn(t), s = this.inner[n];
        if (void 0 === s) return this.inner[n] = [ [ t, e ] ], void this.innerSize++;
        for (let n = 0; n < s.length; n++) if (this.equalsFn(s[n][0], t)) 
        // This is updating an existing entry and does not increase `innerSize`.
        return void (s[n] = [ t, e ]);
        s.push([ t, e ]), this.innerSize++;
    }
    /**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */    delete(t) {
        const e = this.mapKeyFn(t), n = this.inner[e];
        if (void 0 === n) return !1;
        for (let s = 0; s < n.length; s++) if (this.equalsFn(n[s][0], t)) return 1 === n.length ? delete this.inner[e] : n.splice(s, 1), 
        this.innerSize--, !0;
        return !1;
    }
    forEach(t) {
        lt(this.inner, ((e, n) => {
            for (const [e, s] of n) t(e, s);
        }));
    }
    isEmpty() {
        return ft(this.inner);
    }
    size() {
        return this.innerSize;
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
// An immutable sorted map implementation, based on a Left-leaning Red-Black
// tree.
class Cn {
    constructor(t, e) {
        this.comparator = t, this.root = e || Nn.EMPTY;
    }
    // Returns a copy of the map, with the specified key/value added or replaced.
    insert(t, e) {
        return new Cn(this.comparator, this.root.insert(t, e, this.comparator).copy(null, null, Nn.BLACK, null, null));
    }
    // Returns a copy of the map, with the specified key removed.
    remove(t) {
        return new Cn(this.comparator, this.root.remove(t, this.comparator).copy(null, null, Nn.BLACK, null, null));
    }
    // Returns the value of the node with the given key, or null.
    get(t) {
        let e = this.root;
        for (;!e.isEmpty(); ) {
            const n = this.comparator(t, e.key);
            if (0 === n) return e.value;
            n < 0 ? e = e.left : n > 0 && (e = e.right);
        }
        return null;
    }
    // Returns the index of the element in this sorted map, or -1 if it doesn't
    // exist.
    indexOf(t) {
        // Number of nodes that were pruned when descending right
        let e = 0, n = this.root;
        for (;!n.isEmpty(); ) {
            const s = this.comparator(t, n.key);
            if (0 === s) return e + n.left.size;
            s < 0 ? n = n.left : (
            // Count all nodes left of the node plus the node itself
            e += n.left.size + 1, n = n.right);
        }
        // Node not found
                return -1;
    }
    isEmpty() {
        return this.root.isEmpty();
    }
    // Returns the total number of nodes in the map.
    get size() {
        return this.root.size;
    }
    // Returns the minimum key in the map.
    minKey() {
        return this.root.minKey();
    }
    // Returns the maximum key in the map.
    maxKey() {
        return this.root.maxKey();
    }
    // Traverses the map in key order and calls the specified action function
    // for each key/value pair. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    inorderTraversal(t) {
        return this.root.inorderTraversal(t);
    }
    forEach(t) {
        this.inorderTraversal(((e, n) => (t(e, n), !1)));
    }
    toString() {
        const t = [];
        return this.inorderTraversal(((e, n) => (t.push(`${e}:${n}`), !1))), `{${t.join(", ")}}`;
    }
    // Traverses the map in reverse key order and calls the specified action
    // function for each key/value pair. If action returns true, traversal is
    // aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    reverseTraversal(t) {
        return this.root.reverseTraversal(t);
    }
    // Returns an iterator over the SortedMap.
    getIterator() {
        return new xn(this.root, null, this.comparator, !1);
    }
    getIteratorFrom(t) {
        return new xn(this.root, t, this.comparator, !1);
    }
    getReverseIterator() {
        return new xn(this.root, null, this.comparator, !0);
    }
    getReverseIteratorFrom(t) {
        return new xn(this.root, t, this.comparator, !0);
    }
}

 // end SortedMap
// An iterator over an LLRBNode.
class xn {
    constructor(t, e, n, s) {
        this.isReverse = s, this.nodeStack = [];
        let i = 1;
        for (;!t.isEmpty(); ) if (i = e ? n(t.key, e) : 1, 
        // flip the comparison if we're going in reverse
        e && s && (i *= -1), i < 0) 
        // This node is less than our start key. ignore it
        t = this.isReverse ? t.left : t.right; else {
            if (0 === i) {
                // This node is exactly equal to our start key. Push it on the stack,
                // but stop iterating;
                this.nodeStack.push(t);
                break;
            }
            // This node is greater than our start key, add it to the stack and move
            // to the next one
            this.nodeStack.push(t), t = this.isReverse ? t.right : t.left;
        }
    }
    getNext() {
        let t = this.nodeStack.pop();
        const e = {
            key: t.key,
            value: t.value
        };
        if (this.isReverse) for (t = t.left; !t.isEmpty(); ) this.nodeStack.push(t), t = t.right; else for (t = t.right; !t.isEmpty(); ) this.nodeStack.push(t), 
        t = t.left;
        return e;
    }
    hasNext() {
        return this.nodeStack.length > 0;
    }
    peek() {
        if (0 === this.nodeStack.length) return null;
        const t = this.nodeStack[this.nodeStack.length - 1];
        return {
            key: t.key,
            value: t.value
        };
    }
}

 // end SortedMapIterator
// Represents a node in a Left-leaning Red-Black tree.
class Nn {
    constructor(t, e, n, s, i) {
        this.key = t, this.value = e, this.color = null != n ? n : Nn.RED, this.left = null != s ? s : Nn.EMPTY, 
        this.right = null != i ? i : Nn.EMPTY, this.size = this.left.size + 1 + this.right.size;
    }
    // Returns a copy of the current node, optionally replacing pieces of it.
    copy(t, e, n, s, i) {
        return new Nn(null != t ? t : this.key, null != e ? e : this.value, null != n ? n : this.color, null != s ? s : this.left, null != i ? i : this.right);
    }
    isEmpty() {
        return !1;
    }
    // Traverses the tree in key order and calls the specified action function
    // for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    inorderTraversal(t) {
        return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t);
    }
    // Traverses the tree in reverse key order and calls the specified action
    // function for each node. If action returns true, traversal is aborted.
    // Returns the first truthy value returned by action, or the last falsey
    // value returned by action.
    reverseTraversal(t) {
        return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t);
    }
    // Returns the minimum node in the tree.
    min() {
        return this.left.isEmpty() ? this : this.left.min();
    }
    // Returns the maximum key in the tree.
    minKey() {
        return this.min().key;
    }
    // Returns the maximum key in the tree.
    maxKey() {
        return this.right.isEmpty() ? this.key : this.right.maxKey();
    }
    // Returns new tree, with the key/value added.
    insert(t, e, n) {
        let s = this;
        const i = n(t, s.key);
        return s = i < 0 ? s.copy(null, null, null, s.left.insert(t, e, n), null) : 0 === i ? s.copy(null, e, null, null, null) : s.copy(null, null, null, null, s.right.insert(t, e, n)), 
        s.fixUp();
    }
    removeMin() {
        if (this.left.isEmpty()) return Nn.EMPTY;
        let t = this;
        return t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()), t = t.copy(null, null, null, t.left.removeMin(), null), 
        t.fixUp();
    }
    // Returns new tree, with the specified item removed.
    remove(t, e) {
        let n, s = this;
        if (e(t, s.key) < 0) s.left.isEmpty() || s.left.isRed() || s.left.left.isRed() || (s = s.moveRedLeft()), 
        s = s.copy(null, null, null, s.left.remove(t, e), null); else {
            if (s.left.isRed() && (s = s.rotateRight()), s.right.isEmpty() || s.right.isRed() || s.right.left.isRed() || (s = s.moveRedRight()), 
            0 === e(t, s.key)) {
                if (s.right.isEmpty()) return Nn.EMPTY;
                n = s.right.min(), s = s.copy(n.key, n.value, null, null, s.right.removeMin());
            }
            s = s.copy(null, null, null, null, s.right.remove(t, e));
        }
        return s.fixUp();
    }
    isRed() {
        return this.color;
    }
    // Returns new tree after performing any needed rotations.
    fixUp() {
        let t = this;
        return t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()), t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()), 
        t.left.isRed() && t.right.isRed() && (t = t.colorFlip()), t;
    }
    moveRedLeft() {
        let t = this.colorFlip();
        return t.right.left.isRed() && (t = t.copy(null, null, null, null, t.right.rotateRight()), 
        t = t.rotateLeft(), t = t.colorFlip()), t;
    }
    moveRedRight() {
        let t = this.colorFlip();
        return t.left.left.isRed() && (t = t.rotateRight(), t = t.colorFlip()), t;
    }
    rotateLeft() {
        const t = this.copy(null, null, Nn.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, t, null);
    }
    rotateRight() {
        const t = this.copy(null, null, Nn.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, t);
    }
    colorFlip() {
        const t = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t, e);
    }
    // For testing.
    checkMaxDepth() {
        const t = this.check();
        return Math.pow(2, t) <= this.size + 1;
    }
    // In a balanced RB tree, the black-depth (number of black nodes) from root to
    // leaves is equal on both sides.  This function verifies that or asserts.
    check() {
        if (this.isRed() && this.left.isRed()) throw L();
        if (this.right.isRed()) throw L();
        const t = this.left.check();
        if (t !== this.right.check()) throw L();
        return t + (this.isRed() ? 0 : 1);
    }
}

 // end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Nn.EMPTY = null, Nn.RED = !0, Nn.BLACK = !1;

// end LLRBEmptyNode
Nn.EMPTY = new 
// Represents an empty node (a leaf node in the Red-Black Tree).
class {
    constructor() {
        this.size = 0;
    }
    get key() {
        throw L();
    }
    get value() {
        throw L();
    }
    get color() {
        throw L();
    }
    get left() {
        throw L();
    }
    get right() {
        throw L();
    }
    // Returns a copy of the current node.
    copy(t, e, n, s, i) {
        return this;
    }
    // Returns a copy of the tree, with the specified key/value added.
    insert(t, e, n) {
        return new Nn(t, e);
    }
    // Returns a copy of the tree, with the specified key removed.
    remove(t, e) {
        return this;
    }
    isEmpty() {
        return !0;
    }
    inorderTraversal(t) {
        return !1;
    }
    reverseTraversal(t) {
        return !1;
    }
    minKey() {
        return null;
    }
    maxKey() {
        return null;
    }
    isRed() {
        return !1;
    }
    // For testing.
    checkMaxDepth() {
        return !0;
    }
    check() {
        return 0;
    }
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
 * SortedSet is an immutable (copy-on-write) collection that holds elements
 * in order specified by the provided comparator.
 *
 * NOTE: if provided comparator returns 0 for two elements, we consider them to
 * be equal!
 */
class kn {
    constructor(t) {
        this.comparator = t, this.data = new Cn(this.comparator);
    }
    has(t) {
        return null !== this.data.get(t);
    }
    first() {
        return this.data.minKey();
    }
    last() {
        return this.data.maxKey();
    }
    get size() {
        return this.data.size;
    }
    indexOf(t) {
        return this.data.indexOf(t);
    }
    /** Iterates elements in order defined by "comparator" */    forEach(t) {
        this.data.inorderTraversal(((e, n) => (t(e), !1)));
    }
    /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */    forEachInRange(t, e) {
        const n = this.data.getIteratorFrom(t[0]);
        for (;n.hasNext(); ) {
            const s = n.getNext();
            if (this.comparator(s.key, t[1]) >= 0) return;
            e(s.key);
        }
    }
    /**
     * Iterates over `elem`s such that: start &lt;= elem until false is returned.
     */    forEachWhile(t, e) {
        let n;
        for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext(); ) {
            if (!t(n.getNext().key)) return;
        }
    }
    /** Finds the least element greater than or equal to `elem`. */    firstAfterOrEqual(t) {
        const e = this.data.getIteratorFrom(t);
        return e.hasNext() ? e.getNext().key : null;
    }
    getIterator() {
        return new Mn(this.data.getIterator());
    }
    getIteratorFrom(t) {
        return new Mn(this.data.getIteratorFrom(t));
    }
    /** Inserts or updates an element */    add(t) {
        return this.copy(this.data.remove(t).insert(t, !0));
    }
    /** Deletes an element */    delete(t) {
        return this.has(t) ? this.copy(this.data.remove(t)) : this;
    }
    isEmpty() {
        return this.data.isEmpty();
    }
    unionWith(t) {
        let e = this;
        // Make sure `result` always refers to the larger one of the two sets.
                return e.size < t.size && (e = t, t = this), t.forEach((t => {
            e = e.add(t);
        })), e;
    }
    isEqual(t) {
        if (!(t instanceof kn)) return !1;
        if (this.size !== t.size) return !1;
        const e = this.data.getIterator(), n = t.data.getIterator();
        for (;e.hasNext(); ) {
            const t = e.getNext().key, s = n.getNext().key;
            if (0 !== this.comparator(t, s)) return !1;
        }
        return !0;
    }
    toArray() {
        const t = [];
        return this.forEach((e => {
            t.push(e);
        })), t;
    }
    toString() {
        const t = [];
        return this.forEach((e => t.push(e))), "SortedSet(" + t.toString() + ")";
    }
    copy(t) {
        const e = new kn(this.comparator);
        return e.data = t, e;
    }
}

class Mn {
    constructor(t) {
        this.iter = t;
    }
    getNext() {
        return this.iter.getNext().key;
    }
    hasNext() {
        return this.iter.hasNext();
    }
}

/**
 * Compares two sorted sets for equality using their natural ordering. The
 * method computes the intersection and invokes `onAdd` for every element that
 * is in `after` but not `before`. `onRemove` is invoked for every element in
 * `before` but missing from `after`.
 *
 * The method creates a copy of both `before` and `after` and runs in O(n log
 * n), where n is the size of the two lists.
 *
 * @param before - The elements that exist in the original set.
 * @param after - The elements to diff against the original set.
 * @param comparator - The comparator for the elements in before and after.
 * @param onAdd - A function to invoke for every element that is part of `
 * after` but not `before`.
 * @param onRemove - A function to invoke for every element that is part of
 * `before` but not `after`.
 */
/**
 * Returns the next element from the iterator or `undefined` if none available.
 */
function On(t) {
    return t.hasNext() ? t.getNext() : void 0;
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
 */ const $n = new Cn(xt.comparator);

function Fn() {
    return $n;
}

const Bn = new Cn(xt.comparator);

function Ln() {
    return Bn;
}

function qn() {
    return new Dn((t => t.toString()), ((t, e) => t.isEqual(e)));
}

const Un = new Cn(xt.comparator);

const Kn = new kn(xt.comparator);

function Gn(...t) {
    let e = Kn;
    for (const n of t) e = e.add(n);
    return e;
}

const Qn = new kn(rt);

function jn() {
    return Qn;
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
 * An event from the RemoteStore. It is split into targetChanges (changes to the
 * state or the set of documents in our watched targets) and documentUpdates
 * (changes to the actual documents).
 */ class Wn {
    constructor(
    /**
     * The snapshot version this event brings us up to, or MIN if not set.
     */
    t, 
    /**
     * A map from target to changes to the target. See TargetChange.
     */
    e, 
    /**
     * A set of targets that is known to be inconsistent. Listens for these
     * targets should be re-established without resume tokens.
     */
    n, 
    /**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */
    s, 
    /**
     * A set of which document updates are due only to limbo resolution targets.
     */
    i) {
        this.snapshotVersion = t, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = s, 
        this.resolvedLimboDocuments = i;
    }
    /**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */
    // PORTING NOTE: Multi-tab only
    static createSynthesizedRemoteEventForCurrentChange(t, e) {
        const n = new Map;
        return n.set(t, zn.createSynthesizedTargetChangeForCurrentChange(t, e)), new Wn(ct.min(), n, jn(), Fn(), Gn());
    }
}

/**
 * A TargetChange specifies the set of changes for a specific target as part of
 * a RemoteEvent. These changes track which documents are added, modified or
 * removed, as well as the target's resume token and whether the target is
 * marked CURRENT.
 * The actual changes *to* documents are not part of the TargetChange since
 * documents may be part of multiple targets.
 */ class zn {
    constructor(
    /**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */
    t, 
    /**
     * The "current" (synced) status of this target. Note that "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */
    e, 
    /**
     * The set of documents that were newly assigned to this target as part of
     * this remote event.
     */
    n, 
    /**
     * The set of documents that were already assigned to this target but received
     * an update during this remote event.
     */
    s, 
    /**
     * The set of documents that were removed from this target as part of this
     * remote event.
     */
    i) {
        this.resumeToken = t, this.current = e, this.addedDocuments = n, this.modifiedDocuments = s, 
        this.removedDocuments = i;
    }
    /**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */    static createSynthesizedTargetChangeForCurrentChange(t, e) {
        return new zn(pt.EMPTY_BYTE_STRING, e, Gn(), Gn(), Gn());
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
 * Represents a changed document and a list of target ids to which this change
 * applies.
 *
 * If document has been deleted NoDocument will be provided.
 */ class Hn {
    constructor(
    /** The new document applies to all of these targets. */
    t, 
    /** The new document is removed from all of these targets. */
    e, 
    /** The key of the document for this change. */
    n, 
    /**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */
    s) {
        this.O = t, this.removedTargetIds = e, this.key = n, this.$ = s;
    }
}

class Jn {
    constructor(t, e) {
        this.targetId = t, this.F = e;
    }
}

class Yn {
    constructor(
    /** What kind of change occurred to the watch target. */
    t, 
    /** The target IDs that were added/removed/set. */
    e, 
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */
    n = pt.EMPTY_BYTE_STRING
    /** An RPC error indicating why the watch failed. */ , s = null) {
        this.state = t, this.targetIds = e, this.resumeToken = n, this.cause = s;
    }
}

/** Tracks the internal state of a Watch target. */ class Xn {
    constructor() {
        /**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */
        this.B = 0, 
        /**
         * Keeps track of the document changes since the last raised snapshot.
         *
         * These changes are continuously updated as we receive document updates and
         * always reflect the current set of changes against the last issued snapshot.
         */
        this.L = es(), 
        /** See public getters for explanations of these fields. */
        this.q = pt.EMPTY_BYTE_STRING, this.U = !1, 
        /**
         * Whether this target state should be included in the next snapshot. We
         * initialize to true so that newly-added targets are included in the next
         * RemoteEvent.
         */
        this.K = !0;
    }
    /**
     * Whether this target has been marked 'current'.
     *
     * 'Current' has special meaning in the RPC protocol: It implies that the
     * Watch backend has sent us all changes up to the point at which the target
     * was added and that the target is consistent with the rest of the watch
     * stream.
     */    get current() {
        return this.U;
    }
    /** The last resume token sent to us for this target. */    get resumeToken() {
        return this.q;
    }
    /** Whether this target has pending target adds or target removes. */    get G() {
        return 0 !== this.B;
    }
    /** Whether we have modified any state that should trigger a snapshot. */    get j() {
        return this.K;
    }
    /**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */    W(t) {
        t.approximateByteSize() > 0 && (this.K = !0, this.q = t);
    }
    /**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */    H() {
        let t = Gn(), e = Gn(), n = Gn();
        return this.L.forEach(((s, i) => {
            switch (i) {
              case 0 /* Added */ :
                t = t.add(s);
                break;

              case 2 /* Modified */ :
                e = e.add(s);
                break;

              case 1 /* Removed */ :
                n = n.add(s);
                break;

              default:
                L();
            }
        })), new zn(this.q, this.U, t, e, n);
    }
    /**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */    J() {
        this.K = !1, this.L = es();
    }
    Y(t, e) {
        this.K = !0, this.L = this.L.insert(t, e);
    }
    X(t) {
        this.K = !0, this.L = this.L.remove(t);
    }
    Z() {
        this.B += 1;
    }
    tt() {
        this.B -= 1;
    }
    et() {
        this.K = !0, this.U = !0;
    }
}

/**
 * A helper class to accumulate watch changes into a RemoteEvent.
 */
class Zn {
    constructor(t) {
        this.nt = t, 
        /** The internal state of all tracked targets. */
        this.st = new Map, 
        /** Keeps track of the documents to update since the last raised snapshot. */
        this.it = Fn(), 
        /** A mapping of document keys to their set of target IDs. */
        this.rt = ts(), 
        /**
         * A list of targets with existence filter mismatches. These targets are
         * known to be inconsistent and their listens needs to be re-established by
         * RemoteStore.
         */
        this.ot = new kn(rt);
    }
    /**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */    at(t) {
        for (const e of t.O) t.$ && t.$.isFoundDocument() ? this.ut(e, t.$) : this.ct(e, t.key, t.$);
        for (const e of t.removedTargetIds) this.ct(e, t.key, t.$);
    }
    /** Processes and adds the WatchTargetChange to the current set of changes. */    ht(t) {
        this.forEachTarget(t, (e => {
            const n = this.lt(e);
            switch (t.state) {
              case 0 /* NoChange */ :
                this.ft(e) && n.W(t.resumeToken);
                break;

              case 1 /* Added */ :
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                n.tt(), n.G || 
                // We have a freshly added target, so we need to reset any state
                // that we had previously. This can happen e.g. when remove and add
                // back a target for existence filter mismatches.
                n.J(), n.W(t.resumeToken);
                break;

              case 2 /* Removed */ :
                // We need to keep track of removed targets to we can post-filter and
                // remove any target changes.
                // We need to decrement the number of pending acks needed from watch
                // for this targetId.
                n.tt(), n.G || this.removeTarget(e);
                break;

              case 3 /* Current */ :
                this.ft(e) && (n.et(), n.W(t.resumeToken));
                break;

              case 4 /* Reset */ :
                this.ft(e) && (
                // Reset the target and synthesizes removes for all existing
                // documents. The backend will re-add any documents that still
                // match the target before it sends the next global snapshot.
                this.dt(e), n.W(t.resumeToken));
                break;

              default:
                L();
            }
        }));
    }
    /**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */    forEachTarget(t, e) {
        t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.st.forEach(((t, n) => {
            this.ft(n) && e(n);
        }));
    }
    /**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */    _t(t) {
        const e = t.targetId, n = t.F.count, s = this.wt(e);
        if (s) {
            const t = s.target;
            if (fe(t)) if (0 === n) {
                // The existence filter told us the document does not exist. We deduce
                // that this document does not exist and apply a deleted document to
                // our updates. Without applying this deleted document there might be
                // another query that will raise this document as part of a snapshot
                // until it is resolved, essentially exposing inconsistency between
                // queries.
                const n = new xt(t.path);
                this.ct(e, n, te.newNoDocument(n, ct.min()));
            } else q(1 === n); else {
                this.gt(e) !== n && (
                // Existence filter mismatch: We reset the mapping and raise a new
                // snapshot with `isFromCache:true`.
                this.dt(e), this.ot = this.ot.add(e));
            }
        }
    }
    /**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */    yt(t) {
        const e = new Map;
        this.st.forEach(((n, s) => {
            const i = this.wt(s);
            if (i) {
                if (n.current && fe(i.target)) {
                    // Document queries for document that don't exist can produce an empty
                    // result set. To update our local cache, we synthesize a document
                    // delete if we have not previously received the document. This
                    // resolves the limbo state of the document, removing it from
                    // limboDocumentRefs.
                    // TODO(dimond): Ideally we would have an explicit lookup target
                    // instead resulting in an explicit delete message and we could
                    // remove this special logic.
                    const e = new xt(i.target.path);
                    null !== this.it.get(e) || this.It(s, e) || this.ct(s, e, te.newNoDocument(e, t));
                }
                n.j && (e.set(s, n.H()), n.J());
            }
        }));
        let n = Gn();
        // We extract the set of limbo-only document updates as the GC logic
        // special-cases documents that do not appear in the target cache.
        
        // TODO(gsoltis): Expand on this comment once GC is available in the JS
        // client.
                this.rt.forEach(((t, e) => {
            let s = !0;
            e.forEachWhile((t => {
                const e = this.wt(t);
                return !e || 2 /* LimboResolution */ === e.purpose || (s = !1, !1);
            })), s && (n = n.add(t));
        })), this.it.forEach(((e, n) => n.setReadTime(t)));
        const s = new Wn(t, e, this.ot, this.it, n);
        return this.it = Fn(), this.rt = ts(), this.ot = new kn(rt), s;
    }
    /**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */
    // Visible for testing.
    ut(t, e) {
        if (!this.ft(t)) return;
        const n = this.It(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
        this.lt(t).Y(e.key, n), this.it = this.it.insert(e.key, e), this.rt = this.rt.insert(e.key, this.Tt(e.key).add(t));
    }
    /**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */
    // Visible for testing.
    ct(t, e, n) {
        if (!this.ft(t)) return;
        const s = this.lt(t);
        this.It(t, e) ? s.Y(e, 1 /* Removed */) : 
        // The document may have entered and left the target before we raised a
        // snapshot, so we can just ignore the change.
        s.X(e), this.rt = this.rt.insert(e, this.Tt(e).delete(t)), n && (this.it = this.it.insert(e, n));
    }
    removeTarget(t) {
        this.st.delete(t);
    }
    /**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */    gt(t) {
        const e = this.lt(t).H();
        return this.nt.getRemoteKeysForTarget(t).size + e.addedDocuments.size - e.removedDocuments.size;
    }
    /**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */    Z(t) {
        this.lt(t).Z();
    }
    lt(t) {
        let e = this.st.get(t);
        return e || (e = new Xn, this.st.set(t, e)), e;
    }
    Tt(t) {
        let e = this.rt.get(t);
        return e || (e = new kn(rt), this.rt = this.rt.insert(t, e)), e;
    }
    /**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */    ft(t) {
        const e = null !== this.wt(t);
        return e || O("WatchChangeAggregator", "Detected inactive target", t), e;
    }
    /**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */    wt(t) {
        const e = this.st.get(t);
        return e && e.G ? null : this.nt.Et(t);
    }
    /**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */    dt(t) {
        this.st.set(t, new Xn);
        this.nt.getRemoteKeysForTarget(t).forEach((e => {
            this.ct(t, e, /*updatedDocument=*/ null);
        }));
    }
    /**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */    It(t, e) {
        return this.nt.getRemoteKeysForTarget(t).has(e);
    }
}

function ts() {
    return new Cn(xt.comparator);
}

function es() {
    return new Cn(xt.comparator);
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
 */ const ns = (() => {
    const t = {
        asc: "ASCENDING",
        desc: "DESCENDING"
    };
    return t;
})(), ss = (() => {
    const t = {
        "<": "LESS_THAN",
        "<=": "LESS_THAN_OR_EQUAL",
        ">": "GREATER_THAN",
        ">=": "GREATER_THAN_OR_EQUAL",
        "==": "EQUAL",
        "!=": "NOT_EQUAL",
        "array-contains": "ARRAY_CONTAINS",
        in: "IN",
        "not-in": "NOT_IN",
        "array-contains-any": "ARRAY_CONTAINS_ANY"
    };
    return t;
})();

/**
 * This class generates JsonObject values for the Datastore API suitable for
 * sending to either GRPC stub methods or via the JSON/HTTP REST API.
 *
 * The serializer supports both Protobuf.js and Proto3 JSON formats. By
 * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
 * format.
 *
 * For a description of the Proto3 JSON format check
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 *
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */
class is {
    constructor(t, e) {
        this.databaseId = t, this.N = e;
    }
}

/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */
function rs(t, e) {
    if (t.N) {
        return `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`;
    }
    return {
        seconds: "" + e.seconds,
        nanos: e.nanoseconds
    };
}

/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */
function os(t, e) {
    return t.N ? e.toBase64() : e.toUint8Array();
}

/**
 * Returns a ByteString based on the proto string value.
 */ function as(t, e) {
    return rs(t, e.toTimestamp());
}

function us(t) {
    return q(!!t), ct.fromTimestamp(function(t) {
        const e = Tt(t);
        return new ut(e.seconds, e.nanos);
    }(t));
}

function cs(t, e) {
    return function(t) {
        return new _t([ "projects", t.projectId, "databases", t.database ]);
    }(t).child("documents").child(e).canonicalString();
}

function hs(t) {
    const e = _t.fromString(t);
    return q(Os(e)), e;
}

function ls(t, e) {
    return cs(t.databaseId, e.path);
}

function fs(t, e) {
    const n = hs(e);
    if (n.get(1) !== t.databaseId.projectId) throw new Q(G.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t.databaseId.projectId);
    if (n.get(3) !== t.databaseId.database) throw new Q(G.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t.databaseId.database);
    return new xt(ms(n));
}

function ds(t, e) {
    return cs(t.databaseId, e);
}

function _s(t) {
    const e = hs(t);
    // In v1beta1 queries for collections at the root did not have a trailing
    // "/documents". In v1 all resource paths contain "/documents". Preserve the
    // ability to read the v1beta1 form for compatibility with queries persisted
    // in the local target cache.
        return 4 === e.length ? _t.emptyPath() : ms(e);
}

function ws(t) {
    return new _t([ "projects", t.databaseId.projectId, "databases", t.databaseId.database ]).canonicalString();
}

function ms(t) {
    return q(t.length > 4 && "documents" === t.get(4)), t.popFirst(5);
}

/** Creates a Document proto from key and fields (but no create/update time) */ function gs(t, e, n) {
    return {
        name: ls(t, e),
        fields: n.value.mapValue.fields
    };
}

function ys(t, e, n) {
    const s = fs(t, e.name), i = us(e.updateTime), r = new Xt({
        mapValue: {
            fields: e.fields
        }
    }), o = te.newFoundDocument(s, i, r);
    return n && o.setHasCommittedMutations(), n ? o.setHasCommittedMutations() : o;
}

function ps(t, e) {
    return "found" in e ? function(t, e) {
        q(!!e.found), e.found.name, e.found.updateTime;
        const n = fs(t, e.found.name), s = us(e.found.updateTime), i = new Xt({
            mapValue: {
                fields: e.found.fields
            }
        });
        return te.newFoundDocument(n, s, i);
    }(t, e) : "missing" in e ? function(t, e) {
        q(!!e.missing), q(!!e.readTime);
        const n = fs(t, e.missing), s = us(e.readTime);
        return te.newNoDocument(n, s);
    }(t, e) : L();
}

function Is(t, e) {
    let n;
    if ("targetChange" in e) {
        e.targetChange;
        // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
        // if unset
        const s = function(t) {
            return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : L();
        }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], r = function(t, e) {
            return t.N ? (q(void 0 === e || "string" == typeof e), pt.fromBase64String(e || "")) : (q(void 0 === e || e instanceof Uint8Array), 
            pt.fromUint8Array(e || new Uint8Array));
        }(t, e.targetChange.resumeToken), o = e.targetChange.cause, a = o && function(t) {
            const e = void 0 === t.code ? G.UNKNOWN : Sn(t.code);
            return new Q(e, t.message || "");
        }
        /**
 * Returns a value for a number (or null) that's appropriate to put into
 * a google.protobuf.Int32Value proto.
 * DO NOT USE THIS FOR ANYTHING ELSE.
 * This method cheats. It's typed as returning "number" because that's what
 * our generated proto interfaces say Int32Value must be. But GRPC actually
 * expects a { value: <number> } struct.
 */ (o);
        n = new Yn(s, i, r, a || null);
    } else if ("documentChange" in e) {
        e.documentChange;
        const s = e.documentChange;
        s.document, s.document.name, s.document.updateTime;
        const i = fs(t, s.document.name), r = us(s.document.updateTime), o = new Xt({
            mapValue: {
                fields: s.document.fields
            }
        }), a = te.newFoundDocument(i, r, o), u = s.targetIds || [], c = s.removedTargetIds || [];
        n = new Hn(u, c, a.key, a);
    } else if ("documentDelete" in e) {
        e.documentDelete;
        const s = e.documentDelete;
        s.document;
        const i = fs(t, s.document), r = s.readTime ? us(s.readTime) : ct.min(), o = te.newNoDocument(i, r), a = s.removedTargetIds || [];
        n = new Hn([], a, o.key, o);
    } else if ("documentRemove" in e) {
        e.documentRemove;
        const s = e.documentRemove;
        s.document;
        const i = fs(t, s.document), r = s.removedTargetIds || [];
        n = new Hn([], r, i, null);
    } else {
        if (!("filter" in e)) return L();
        {
            e.filter;
            const t = e.filter;
            t.targetId;
            const s = t.count || 0, i = new bn(s), r = t.targetId;
            n = new Jn(r, i);
        }
    }
    return n;
}

function Ts(t, e) {
    let n;
    if (e instanceof yn) n = {
        update: gs(t, e.key, e.value)
    }; else if (e instanceof An) n = {
        delete: ls(t, e.key)
    }; else if (e instanceof pn) n = {
        update: gs(t, e.key, e.data),
        updateMask: Ms(e.fieldMask)
    }; else {
        if (!(e instanceof Rn)) return L();
        n = {
            verify: ls(t, e.key)
        };
    }
    return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((t => function(t, e) {
        const n = e.transform;
        if (n instanceof Xe) return {
            fieldPath: e.field.canonicalString(),
            setToServerValue: "REQUEST_TIME"
        };
        if (n instanceof Ze) return {
            fieldPath: e.field.canonicalString(),
            appendMissingElements: {
                values: n.elements
            }
        };
        if (n instanceof en) return {
            fieldPath: e.field.canonicalString(),
            removeAllFromArray: {
                values: n.elements
            }
        };
        if (n instanceof sn) return {
            fieldPath: e.field.canonicalString(),
            increment: n.k
        };
        throw L();
    }(0, t)))), e.precondition.isNone || (n.currentDocument = function(t, e) {
        return void 0 !== e.updateTime ? {
            updateTime: as(t, e.updateTime)
        } : void 0 !== e.exists ? {
            exists: e.exists
        } : L();
    }(t, e.precondition)), n;
}

function Es(t, e) {
    const n = e.currentDocument ? function(t) {
        return void 0 !== t.updateTime ? hn.updateTime(us(t.updateTime)) : void 0 !== t.exists ? hn.exists(t.exists) : hn.none();
    }(e.currentDocument) : hn.none(), s = e.updateTransforms ? e.updateTransforms.map((e => function(t, e) {
        let n = null;
        if ("setToServerValue" in e) q("REQUEST_TIME" === e.setToServerValue), n = new Xe; else if ("appendMissingElements" in e) {
            const t = e.appendMissingElements.values || [];
            n = new Ze(t);
        } else if ("removeAllFromArray" in e) {
            const t = e.removeAllFromArray.values || [];
            n = new en(t);
        } else "increment" in e ? n = new sn(t, e.increment) : L();
        const s = mt.fromServerFormat(e.fieldPath);
        return new an(s, n);
    }(t, e))) : [];
    if (e.update) {
        e.update.name;
        const i = fs(t, e.update.name), r = new Xt({
            mapValue: {
                fields: e.update.fields
            }
        });
        if (e.updateMask) {
            const t = function(t) {
                const e = t.fieldPaths || [];
                return new gt(e.map((t => mt.fromServerFormat(t))));
            }(e.updateMask);
            return new pn(i, r, t, n, s);
        }
        return new yn(i, r, n, s);
    }
    if (e.delete) {
        const s = fs(t, e.delete);
        return new An(s, n);
    }
    if (e.verify) {
        const s = fs(t, e.verify);
        return new Rn(s, n);
    }
    return L();
}

function As(t, e) {
    return t && t.length > 0 ? (q(void 0 !== e), t.map((t => function(t, e) {
        // NOTE: Deletes don't have an updateTime.
        let n = t.updateTime ? us(t.updateTime) : us(e);
        return n.isEqual(ct.min()) && (
        // The Firestore Emulator currently returns an update time of 0 for
        // deletes of non-existing documents (rather than null). This breaks the
        // test "get deleted doc while offline with source=cache" as NoDocuments
        // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
        // TODO(#2149): Remove this when Emulator is fixed
        n = us(e)), new cn(n, t.transformResults || []);
    }(t, e)))) : [];
}

function Rs(t, e) {
    return {
        documents: [ ds(t, e.path) ]
    };
}

function bs(t, e) {
    // Dissect the path into parent, collectionId, and optional key filter.
    const n = {
        structuredQuery: {}
    }, s = e.path;
    null !== e.collectionGroup ? (n.parent = ds(t, s), n.structuredQuery.from = [ {
        collectionId: e.collectionGroup,
        allDescendants: !0
    } ]) : (n.parent = ds(t, s.popLast()), n.structuredQuery.from = [ {
        collectionId: s.lastSegment()
    } ]);
    const i = function(t) {
        if (0 === t.length) return;
        const e = t.map((t => 
        // visible for testing
        function(t) {
            if ("==" /* EQUAL */ === t.op) {
                if (jt(t.value)) return {
                    unaryFilter: {
                        field: Cs(t.field),
                        op: "IS_NAN"
                    }
                };
                if (Qt(t.value)) return {
                    unaryFilter: {
                        field: Cs(t.field),
                        op: "IS_NULL"
                    }
                };
            } else if ("!=" /* NOT_EQUAL */ === t.op) {
                if (jt(t.value)) return {
                    unaryFilter: {
                        field: Cs(t.field),
                        op: "IS_NOT_NAN"
                    }
                };
                if (Qt(t.value)) return {
                    unaryFilter: {
                        field: Cs(t.field),
                        op: "IS_NOT_NULL"
                    }
                };
            }
            return {
                fieldFilter: {
                    field: Cs(t.field),
                    op: Ds(t.op),
                    value: t.value
                }
            };
        }(t)));
        if (1 === e.length) return e[0];
        return {
            compositeFilter: {
                op: "AND",
                filters: e
            }
        };
    }(e.filters);
    i && (n.structuredQuery.where = i);
    const r = function(t) {
        if (0 === t.length) return;
        return t.map((t => 
        // visible for testing
        function(t) {
            return {
                field: Cs(t.field),
                direction: Ss(t.dir)
            };
        }(t)));
    }(e.orderBy);
    r && (n.structuredQuery.orderBy = r);
    const o = function(t, e) {
        return t.N || St(e) ? e : {
            value: e
        };
    }
    /**
 * Returns a number (or null) from a google.protobuf.Int32Value proto.
 */ (t, e.limit);
    var a;
    return null !== o && (n.structuredQuery.limit = o), e.startAt && (n.structuredQuery.startAt = {
        before: (a = e.startAt).inclusive,
        values: a.position
    }), e.endAt && (n.structuredQuery.endAt = function(t) {
        return {
            before: !t.inclusive,
            values: t.position
        };
    }(e.endAt)), n;
}

function Ps(t) {
    let e = _s(t.parent);
    const n = t.structuredQuery, s = n.from ? n.from.length : 0;
    let i = null;
    if (s > 0) {
        q(1 === s);
        const t = n.from[0];
        t.allDescendants ? i = t.collectionId : e = e.child(t.collectionId);
    }
    let r = [];
    n.where && (r = vs(n.where));
    let o = [];
    n.orderBy && (o = n.orderBy.map((t => function(t) {
        return new Re(xs(t.field), 
        // visible for testing
        function(t) {
            switch (t) {
              case "ASCENDING":
                return "asc" /* ASCENDING */;

              case "DESCENDING":
                return "desc" /* DESCENDING */;

              default:
                return;
            }
        }
        // visible for testing
        (t.direction));
    }(t))));
    let a = null;
    n.limit && (a = function(t) {
        let e;
        return e = "object" == typeof t ? t.value : t, St(e) ? null : e;
    }(n.limit));
    let u = null;
    n.startAt && (u = function(t) {
        const e = !!t.before, n = t.values || [];
        return new Ae(n, e);
    }(n.startAt));
    let c = null;
    return n.endAt && (c = function(t) {
        const e = !t.before, n = t.values || [];
        return new Ae(n, e);
    }
    // visible for testing
    (n.endAt)), Se(e, i, o, r, a, "F" /* First */ , u, c);
}

function Vs(t, e) {
    const n = function(t, e) {
        switch (e) {
          case 0 /* Listen */ :
            return null;

          case 1 /* ExistenceFilterMismatch */ :
            return "existence-filter-mismatch";

          case 2 /* LimboResolution */ :
            return "limbo-document";

          default:
            return L();
        }
    }(0, e.purpose);
    return null == n ? null : {
        "goog-listen-tags": n
    };
}

function vs(t) {
    return t ? void 0 !== t.unaryFilter ? [ ks(t) ] : void 0 !== t.fieldFilter ? [ Ns(t) ] : void 0 !== t.compositeFilter ? t.compositeFilter.filters.map((t => vs(t))).reduce(((t, e) => t.concat(e))) : L() : [];
}

function Ss(t) {
    return ns[t];
}

function Ds(t) {
    return ss[t];
}

function Cs(t) {
    return {
        fieldPath: t.canonicalString()
    };
}

function xs(t) {
    return mt.fromServerFormat(t.fieldPath);
}

function Ns(t) {
    return _e.create(xs(t.fieldFilter.field), function(t) {
        switch (t) {
          case "EQUAL":
            return "==" /* EQUAL */;

          case "NOT_EQUAL":
            return "!=" /* NOT_EQUAL */;

          case "GREATER_THAN":
            return ">" /* GREATER_THAN */;

          case "GREATER_THAN_OR_EQUAL":
            return ">=" /* GREATER_THAN_OR_EQUAL */;

          case "LESS_THAN":
            return "<" /* LESS_THAN */;

          case "LESS_THAN_OR_EQUAL":
            return "<=" /* LESS_THAN_OR_EQUAL */;

          case "ARRAY_CONTAINS":
            return "array-contains" /* ARRAY_CONTAINS */;

          case "IN":
            return "in" /* IN */;

          case "NOT_IN":
            return "not-in" /* NOT_IN */;

          case "ARRAY_CONTAINS_ANY":
            return "array-contains-any" /* ARRAY_CONTAINS_ANY */;

          default:
            return L();
        }
    }(t.fieldFilter.op), t.fieldFilter.value);
}

function ks(t) {
    switch (t.unaryFilter.op) {
      case "IS_NAN":
        const e = xs(t.unaryFilter.field);
        return _e.create(e, "==" /* EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NULL":
        const n = xs(t.unaryFilter.field);
        return _e.create(n, "==" /* EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      case "IS_NOT_NAN":
        const s = xs(t.unaryFilter.field);
        return _e.create(s, "!=" /* NOT_EQUAL */ , {
            doubleValue: NaN
        });

      case "IS_NOT_NULL":
        const i = xs(t.unaryFilter.field);
        return _e.create(i, "!=" /* NOT_EQUAL */ , {
            nullValue: "NULL_VALUE"
        });

      default:
        return L();
    }
}

function Ms(t) {
    const e = [];
    return t.fields.forEach((t => e.push(t.canonicalString()))), {
        fieldPaths: e
    };
}

function Os(t) {
    // Resource names have at least 4 components (project ID, database ID)
    return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
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
 * Encodes a resource path into a IndexedDb-compatible string form.
 */
function $s(t) {
    let e = "";
    for (let n = 0; n < t.length; n++) e.length > 0 && (e = Bs(e)), e = Fs(t.get(n), e);
    return Bs(e);
}

/** Encodes a single segment of a resource path into the given result */ function Fs(t, e) {
    let n = e;
    const s = t.length;
    for (let e = 0; e < s; e++) {
        const s = t.charAt(e);
        switch (s) {
          case "\0":
            n += "";
            break;

          case "":
            n += "";
            break;

          default:
            n += s;
        }
    }
    return n;
}

/** Encodes a path separator into the given result */ function Bs(t) {
    return t + "";
}

/**
 * Decodes the given IndexedDb-compatible string form of a resource path into
 * a ResourcePath instance. Note that this method is not suitable for use with
 * decoding resource names from the server; those are One Platform format
 * strings.
 */ function Ls(t) {
    // Event the empty path must encode as a path of at least length 2. A path
    // with exactly 2 must be the empty path.
    const e = t.length;
    if (q(e >= 2), 2 === e) return q("" === t.charAt(0) && "" === t.charAt(1)), _t.emptyPath();
    // Escape characters cannot exist past the second-to-last position in the
    // source value.
        const n = e - 2, s = [];
    let i = "";
    for (let r = 0; r < e; ) {
        // The last two characters of a valid encoded path must be a separator, so
        // there must be an end to this segment.
        const e = t.indexOf("", r);
        (e < 0 || e > n) && L();
        switch (t.charAt(e + 1)) {
          case "":
            const n = t.substring(r, e);
            let o;
            0 === i.length ? 
            // Avoid copying for the common case of a segment that excludes \0
            // and \001
            o = n : (i += n, o = i, i = ""), s.push(o);
            break;

          case "":
            i += t.substring(r, e), i += "\0";
            break;

          case "":
            // The escape character can be used in the output to encode itself.
            i += t.substring(r, e + 1);
            break;

          default:
            L();
        }
        r = e + 2;
    }
    return new _t(s);
}

/**
 * @license
 * Copyright 2022 Google LLC
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
 * Name of the IndexedDb object store.
 *
 * Note that the name 'owner' is chosen to ensure backwards compatibility with
 * older clients that only supported single locked access to the persistence
 * layer.
 */ const qs = [ "userId", "batchId" ];

/**
 * The key string used for the single object that exists in the
 * DbPrimaryClient store.
 */
/**
 * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
 * index to iterate over all at document mutations for a given path or lower.
 */
function Us(t, e) {
    return [ t, $s(e) ];
}

/**
 * Creates a full index key of [userId, encodedPath, batchId] for inserting
 * and deleting into the DbDocumentMutations index.
 */ function Ks(t, e, n) {
    return [ t, $s(e), n ];
}

/**
 * Because we store all the useful information for this store in the key,
 * there is no useful information to store as the value. The raw (unencoded)
 * path cannot be stored because IndexedDb doesn't store prototype
 * information.
 */ const Gs = {}, Qs = [ "parentPath", "readTime" ], js = [ "canonicalId", "targetId" ], Ws = [ "targetId", "path" ], zs = [ "path", "targetId" ], Hs = [ "collectionId", "parent" ], Js = [ "indexId", "uid" ], Ys = [ "uid", "sequenceNumber" ], Xs = [ "indexId", "uid", "arrayValue", "directionalValue", "documentKey" ], Zs = [ "indexId", "uid", "documentKey" ], ti = [ "userId", "collectionPath", "documentId" ], ei = [ "userId", "collectionPath", "largestBatchId" ], ni = [ "userId", "collectionGroup", "largestBatchId" ], si = [ ...[ ...[ ...[ ...[ "mutationQueues", "mutations", "documentMutations", "remoteDocuments", "targets", "owner", "targetGlobal", "targetDocuments" ], "clientMetadata" ], "remoteDocumentGlobal" ], "collectionParents" ], "bundles", "namedQueries" ], ii = [ ...si, "documentOverlays" ], ri = [ ...ii, "indexConfiguration", "indexState", "indexEntries" ];

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
const oi = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";

/**
 * A base class representing a persistence transaction, encapsulating both the
 * transaction's sequence numbers as well as a list of onCommitted listeners.
 *
 * When you call Persistence.runTransaction(), it will create a transaction and
 * pass it to your callback. You then pass it to any method that operates
 * on persistence.
 */ class ai {
    constructor() {
        this.onCommittedListeners = [];
    }
    addOnCommittedListener(t) {
        this.onCommittedListeners.push(t);
    }
    raiseOnCommittedEvent() {
        this.onCommittedListeners.forEach((t => t()));
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
 * PersistencePromise is essentially a re-implementation of Promise except
 * it has a .next() method instead of .then() and .next() and .catch() callbacks
 * are executed synchronously when a PersistencePromise resolves rather than
 * asynchronously (Promise implementations use setImmediate() or similar).
 *
 * This is necessary to interoperate with IndexedDB which will automatically
 * commit transactions if control is returned to the event loop without
 * synchronously initiating another operation on the transaction.
 *
 * NOTE: .then() and .catch() only allow a single consumer, unlike normal
 * Promises.
 */ class ui {
    constructor(t) {
        // NOTE: next/catchCallback will always point to our own wrapper functions,
        // not the user's raw next() or catch() callbacks.
        this.nextCallback = null, this.catchCallback = null, 
        // When the operation resolves, we'll set result or error and mark isDone.
        this.result = void 0, this.error = void 0, this.isDone = !1, 
        // Set to true when .then() or .catch() are called and prevents additional
        // chaining.
        this.callbackAttached = !1, t((t => {
            this.isDone = !0, this.result = t, this.nextCallback && 
            // value should be defined unless T is Void, but we can't express
            // that in the type system.
            this.nextCallback(t);
        }), (t => {
            this.isDone = !0, this.error = t, this.catchCallback && this.catchCallback(t);
        }));
    }
    catch(t) {
        return this.next(void 0, t);
    }
    next(t, e) {
        return this.callbackAttached && L(), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(e, this.error) : this.wrapSuccess(t, this.result) : new ui(((n, s) => {
            this.nextCallback = e => {
                this.wrapSuccess(t, e).next(n, s);
            }, this.catchCallback = t => {
                this.wrapFailure(e, t).next(n, s);
            };
        }));
    }
    toPromise() {
        return new Promise(((t, e) => {
            this.next(t, e);
        }));
    }
    wrapUserFunction(t) {
        try {
            const e = t();
            return e instanceof ui ? e : ui.resolve(e);
        } catch (t) {
            return ui.reject(t);
        }
    }
    wrapSuccess(t, e) {
        return t ? this.wrapUserFunction((() => t(e))) : ui.resolve(e);
    }
    wrapFailure(t, e) {
        return t ? this.wrapUserFunction((() => t(e))) : ui.reject(e);
    }
    static resolve(t) {
        return new ui(((e, n) => {
            e(t);
        }));
    }
    static reject(t) {
        return new ui(((e, n) => {
            n(t);
        }));
    }
    static waitFor(
    // Accept all Promise types in waitFor().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t) {
        return new ui(((e, n) => {
            let s = 0, i = 0, r = !1;
            t.forEach((t => {
                ++s, t.next((() => {
                    ++i, r && i === s && e();
                }), (t => n(t)));
            })), r = !0, i === s && e();
        }));
    }
    /**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */    static or(t) {
        let e = ui.resolve(!1);
        for (const n of t) e = e.next((t => t ? ui.resolve(t) : n()));
        return e;
    }
    static forEach(t, e) {
        const n = [];
        return t.forEach(((t, s) => {
            n.push(e.call(this, t, s));
        })), this.waitFor(n);
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
// References to `window` are guarded by SimpleDb.isAvailable()
/* eslint-disable no-restricted-globals */
/**
 * Wraps an IDBTransaction and exposes a store() method to get a handle to a
 * specific object store.
 */
class ci {
    constructor(t, e) {
        this.action = t, this.transaction = e, this.aborted = !1, 
        /**
         * A `Promise` that resolves with the result of the IndexedDb transaction.
         */
        this.At = new j, this.transaction.oncomplete = () => {
            this.At.resolve();
        }, this.transaction.onabort = () => {
            e.error ? this.At.reject(new fi(t, e.error)) : this.At.resolve();
        }, this.transaction.onerror = e => {
            const n = gi(e.target.error);
            this.At.reject(new fi(t, n));
        };
    }
    static open(t, e, n, s) {
        try {
            return new ci(e, t.transaction(s, n));
        } catch (t) {
            throw new fi(e, t);
        }
    }
    get Rt() {
        return this.At.promise;
    }
    abort(t) {
        t && this.At.reject(t), this.aborted || (O("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), 
        this.aborted = !0, this.transaction.abort());
    }
    bt() {
        // If the browser supports V3 IndexedDB, we invoke commit() explicitly to
        // speed up index DB processing if the event loop remains blocks.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const t = this.transaction;
        this.aborted || "function" != typeof t.commit || t.commit();
    }
    /**
     * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
     * operations performed on the SimpleDbStore happen within the context of this
     * transaction and it cannot be used anymore once the transaction is
     * completed.
     *
     * Note that we can't actually enforce that the KeyType and ValueType are
     * correct, but they allow type safety through the rest of the consuming code.
     */    store(t) {
        const e = this.transaction.objectStore(t);
        return new _i(e);
    }
}

/**
 * Provides a wrapper around IndexedDb with a simplified interface that uses
 * Promise-like return values to chain operations. Real promises cannot be used
 * since .then() continuations are executed asynchronously (e.g. via
 * .setImmediate), which would cause IndexedDB to end the transaction.
 * See PersistencePromise for more details.
 */ class hi {
    /*
     * Creates a new SimpleDb wrapper for IndexedDb database `name`.
     *
     * Note that `version` must not be a downgrade. IndexedDB does not support
     * downgrading the schema version. We currently do not support any way to do
     * versioning outside of IndexedDB's versioning mechanism, as only
     * version-upgrade transactions are allowed to do things like create
     * objectstores.
     */
    constructor(t, e, n) {
        this.name = t, this.version = e, this.Pt = n;
        // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
        // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
        // whatever reason it's much harder to hit after 12.2 so we only proactively
        // log on 12.2.
        12.2 === hi.Vt(getUA()) && $("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
    }
    /** Deletes the specified database. */    static delete(t) {
        return O("SimpleDb", "Removing database:", t), wi(window.indexedDB.deleteDatabase(t)).toPromise();
    }
    /** Returns true if IndexedDB is available in the current environment. */    static vt() {
        if (!isIndexedDBAvailable()) return !1;
        if (hi.St()) return !0;
        // We extensively use indexed array values and compound keys,
        // which IE and Edge do not support. However, they still have indexedDB
        // defined on the window, so we need to check for them here and make sure
        // to return that persistence is not enabled for those browsers.
        // For tracking support of this feature, see here:
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
        // Check the UA string to find out the browser.
                const t = getUA(), e = hi.Vt(t), n = 0 < e && e < 10, s = hi.Dt(t), i = 0 < s && s < 4.5;
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // Edge
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
        // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // iOS Safari: Disable for users running iOS version < 10.
                return !(t.indexOf("MSIE ") > 0 || t.indexOf("Trident/") > 0 || t.indexOf("Edge/") > 0 || n || i);
    }
    /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */    static St() {
        var t;
        return "undefined" != typeof process && "YES" === (null === (t = process.env) || void 0 === t ? void 0 : t.Ct);
    }
    /** Helper to get a typed SimpleDbStore from a transaction. */    static xt(t, e) {
        return t.store(e);
    }
    // visible for testing
    /** Parse User Agent to determine iOS version. Returns -1 if not found. */
    static Vt(t) {
        const e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
        return Number(n);
    }
    // visible for testing
    /** Parse User Agent to determine Android version. Returns -1 if not found. */
    static Dt(t) {
        const e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
        return Number(n);
    }
    /**
     * Opens the specified database, creating or upgrading it if necessary.
     */    async Nt(t) {
        return this.db || (O("SimpleDb", "Opening database:", this.name), this.db = await new Promise(((e, n) => {
            // TODO(mikelehen): Investigate browser compatibility.
            // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
            // suggests IE9 and older WebKit browsers handle upgrade
            // differently. They expect setVersion, as described here:
            // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeRequest/setVersion
            const s = indexedDB.open(this.name, this.version);
            s.onsuccess = t => {
                const n = t.target.result;
                e(n);
            }, s.onblocked = () => {
                n(new fi(t, "Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
            }, s.onerror = e => {
                const s = e.target.error;
                "VersionError" === s.name ? n(new Q(G.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : "InvalidStateError" === s.name ? n(new Q(G.FAILED_PRECONDITION, "Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: " + s)) : n(new fi(t, s));
            }, s.onupgradeneeded = t => {
                O("SimpleDb", 'Database "' + this.name + '" requires upgrade from version:', t.oldVersion);
                const e = t.target.result;
                this.Pt.kt(e, s.transaction, t.oldVersion, this.version).next((() => {
                    O("SimpleDb", "Database upgrade to version " + this.version + " complete");
                }));
            };
        }))), this.Mt && (this.db.onversionchange = t => this.Mt(t)), this.db;
    }
    Ot(t) {
        this.Mt = t, this.db && (this.db.onversionchange = e => t(e));
    }
    async runTransaction(t, e, n, s) {
        const i = "readonly" === e;
        let r = 0;
        for (;;) {
            ++r;
            try {
                this.db = await this.Nt(t);
                const e = ci.open(this.db, t, i ? "readonly" : "readwrite", n), r = s(e).next((t => (e.bt(), 
                t))).catch((t => (
                // Abort the transaction if there was an error.
                e.abort(t), ui.reject(t)))).toPromise();
                // As noted above, errors are propagated by aborting the transaction. So
                // we swallow any error here to avoid the browser logging it as unhandled.
                return r.catch((() => {})), 
                // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                // fire), but still return the original transactionFnResult back to the
                // caller.
                await e.Rt, r;
            } catch (t) {
                // TODO(schmidt-sebastian): We could probably be smarter about this and
                // not retry exceptions that are likely unrecoverable (such as quota
                // exceeded errors).
                // Note: We cannot use an instanceof check for FirestoreException, since the
                // exception is wrapped in a generic error by our async/await handling.
                const e = "FirebaseError" !== t.name && r < 3;
                if (O("SimpleDb", "Transaction failed with error:", t.message, "Retrying:", e), 
                this.close(), !e) return Promise.reject(t);
            }
        }
    }
    close() {
        this.db && this.db.close(), this.db = void 0;
    }
}

/**
 * A controller for iterating over a key range or index. It allows an iterate
 * callback to delete the currently-referenced object, or jump to a new key
 * within the key range or index.
 */ class li {
    constructor(t) {
        this.$t = t, this.Ft = !1, this.Bt = null;
    }
    get isDone() {
        return this.Ft;
    }
    get Lt() {
        return this.Bt;
    }
    set cursor(t) {
        this.$t = t;
    }
    /**
     * This function can be called to stop iteration at any point.
     */    done() {
        this.Ft = !0;
    }
    /**
     * This function can be called to skip to that next key, which could be
     * an index or a primary key.
     */    qt(t) {
        this.Bt = t;
    }
    /**
     * Delete the current cursor value from the object store.
     *
     * NOTE: You CANNOT do this with a keysOnly query.
     */    delete() {
        return wi(this.$t.delete());
    }
}

/** An error that wraps exceptions that thrown during IndexedDB execution. */ class fi extends Q {
    constructor(t, e) {
        super(G.UNAVAILABLE, `IndexedDB transaction '${t}' failed: ${e}`), this.name = "IndexedDbTransactionError";
    }
}

/** Verifies whether `e` is an IndexedDbTransactionError. */ function di(t) {
    // Use name equality, as instanceof checks on errors don't work with errors
    // that wrap other errors.
    return "IndexedDbTransactionError" === t.name;
}

/**
 * A wrapper around an IDBObjectStore providing an API that:
 *
 * 1) Has generic KeyType / ValueType parameters to provide strongly-typed
 * methods for acting against the object store.
 * 2) Deals with IndexedDB's onsuccess / onerror event callbacks, making every
 * method return a PersistencePromise instead.
 * 3) Provides a higher-level API to avoid needing to do excessive wrapping of
 * intermediate IndexedDB types (IDBCursorWithValue, etc.)
 */ class _i {
    constructor(t) {
        this.store = t;
    }
    put(t, e) {
        let n;
        return void 0 !== e ? (O("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (O("SimpleDb", "PUT", this.store.name, "<auto-key>", t), 
        n = this.store.put(t)), wi(n);
    }
    /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value - The object to write.
     * @returns The key of the value to add.
     */    add(t) {
        O("SimpleDb", "ADD", this.store.name, t, t);
        return wi(this.store.add(t));
    }
    /**
     * Gets the object with the specified key from the specified store, or null
     * if no object exists with the specified key.
     *
     * @key The key of the object to get.
     * @returns The object with the specified key or null if no object exists.
     */    get(t) {
        // We're doing an unsafe cast to ValueType.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return wi(this.store.get(t)).next((e => (
        // Normalize nonexistence to null.
        void 0 === e && (e = null), O("SimpleDb", "GET", this.store.name, t, e), e)));
    }
    delete(t) {
        O("SimpleDb", "DELETE", this.store.name, t);
        return wi(this.store.delete(t));
    }
    /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */    count() {
        O("SimpleDb", "COUNT", this.store.name);
        return wi(this.store.count());
    }
    Ut(t, e) {
        const n = this.options(t, e);
        // Use `getAll()` if the browser supports IndexedDB v3, as it is roughly
        // 20% faster. Unfortunately, getAll() does not support custom indices.
                if (n.index || "function" != typeof this.store.getAll) {
            const t = this.cursor(n), e = [];
            return this.Kt(t, ((t, n) => {
                e.push(n);
            })).next((() => e));
        }
        {
            const t = this.store.getAll(n.range);
            return new ui(((e, n) => {
                t.onerror = t => {
                    n(t.target.error);
                }, t.onsuccess = t => {
                    e(t.target.result);
                };
            }));
        }
    }
    /**
     * Loads the first `count` elements from the provided index range. Loads all
     * elements if no limit is provided.
     */    Gt(t, e) {
        const n = this.store.getAll(t, null === e ? void 0 : e);
        return new ui(((t, e) => {
            n.onerror = t => {
                e(t.target.error);
            }, n.onsuccess = e => {
                t(e.target.result);
            };
        }));
    }
    Qt(t, e) {
        O("SimpleDb", "DELETE ALL", this.store.name);
        const n = this.options(t, e);
        n.jt = !1;
        const s = this.cursor(n);
        return this.Kt(s, ((t, e, n) => n.delete()));
    }
    Wt(t, e) {
        let n;
        e ? n = t : (n = {}, e = t);
        const s = this.cursor(n);
        return this.Kt(s, e);
    }
    /**
     * Iterates over a store, but waits for the given callback to complete for
     * each entry before iterating the next entry. This allows the callback to do
     * asynchronous work to determine if this iteration should continue.
     *
     * The provided callback should return `true` to continue iteration, and
     * `false` otherwise.
     */    zt(t) {
        const e = this.cursor({});
        return new ui(((n, s) => {
            e.onerror = t => {
                const e = gi(t.target.error);
                s(e);
            }, e.onsuccess = e => {
                const s = e.target.result;
                s ? t(s.primaryKey, s.value).next((t => {
                    t ? s.continue() : n();
                })) : n();
            };
        }));
    }
    Kt(t, e) {
        const n = [];
        return new ui(((s, i) => {
            t.onerror = t => {
                i(t.target.error);
            }, t.onsuccess = t => {
                const i = t.target.result;
                if (!i) return void s();
                const r = new li(i), o = e(i.primaryKey, i.value, r);
                if (o instanceof ui) {
                    const t = o.catch((t => (r.done(), ui.reject(t))));
                    n.push(t);
                }
                r.isDone ? s() : null === r.Lt ? i.continue() : i.continue(r.Lt);
            };
        })).next((() => ui.waitFor(n)));
    }
    options(t, e) {
        let n;
        return void 0 !== t && ("string" == typeof t ? n = t : e = t), {
            index: n,
            range: e
        };
    }
    cursor(t) {
        let e = "next";
        if (t.reverse && (e = "prev"), t.index) {
            const n = this.store.index(t.index);
            return t.jt ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
        }
        return this.store.openCursor(t.range, e);
    }
}

/**
 * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
 * handlers to resolve / reject the PersistencePromise as appropriate.
 */ function wi(t) {
    return new ui(((e, n) => {
        t.onsuccess = t => {
            const n = t.target.result;
            e(n);
        }, t.onerror = t => {
            const e = gi(t.target.error);
            n(e);
        };
    }));
}

// Guard so we only report the error once.
let mi = !1;

function gi(t) {
    const e = hi.Vt(getUA());
    if (e >= 12.2 && e < 13) {
        const e = "An internal error was encountered in the Indexed Database server";
        if (t.message.indexOf(e) >= 0) {
            // Wrap error in a more descriptive one.
            const t = new Q("internal", `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);
            return mi || (mi = !0, 
            // Throw a global exception outside of this promise chain, for the user to
            // potentially catch.
            setTimeout((() => {
                throw t;
            }), 0)), t;
        }
    }
    return t;
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
 */ class yi extends ai {
    constructor(t, e) {
        super(), this.Ht = t, this.currentSequenceNumber = e;
    }
}

function pi(t, e) {
    const n = K(t);
    return hi.xt(n.Ht, e);
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
 * A batch of mutations that will be sent as one unit to the backend.
 */ class Ii {
    /**
     * @param batchId - The unique ID of this mutation batch.
     * @param localWriteTime - The original write time of this mutation.
     * @param baseMutations - Mutations that are used to populate the base
     * values when this mutation is applied locally. This can be used to locally
     * overwrite values that are persisted in the remote document cache. Base
     * mutations are never sent to the backend.
     * @param mutations - The user-provided mutations in this mutation batch.
     * User-provided mutations are applied both locally and remotely on the
     * backend.
     */
    constructor(t, e, n, s) {
        this.batchId = t, this.localWriteTime = e, this.baseMutations = n, this.mutations = s;
    }
    /**
     * Applies all the mutations in this MutationBatch to the specified document
     * to compute the state of the remote document
     *
     * @param document - The document to apply mutations to.
     * @param batchResult - The result of applying the MutationBatch to the
     * backend.
     */    applyToRemoteDocument(t, e) {
        const n = e.mutationResults;
        for (let e = 0; e < this.mutations.length; e++) {
            const s = this.mutations[e];
            if (s.key.isEqual(t.key)) {
                dn(s, t, n[e]);
            }
        }
    }
    /**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param document - The document to apply mutations to.
     */    applyToLocalView(t) {
        // First, apply the base state. This allows us to apply non-idempotent
        // transform against a consistent set of values.
        for (const e of this.baseMutations) e.key.isEqual(t.key) && _n(e, t, this.localWriteTime);
        // Second, apply all user-provided mutations.
                for (const e of this.mutations) e.key.isEqual(t.key) && _n(e, t, this.localWriteTime);
    }
    /**
     * Computes the local view for all provided documents given the mutations in
     * this batch.
     */    applyToLocalDocumentSet(t) {
        // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
        // directly (as done in `applyToLocalView()`), we can reduce the complexity
        // to O(n).
        this.mutations.forEach((e => {
            const n = t.get(e.key), s = n;
            // TODO(mutabledocuments): This method should take a MutableDocumentMap
            // and we should remove this cast.
                        this.applyToLocalView(s), n.isValidDocument() || s.convertToNoDocument(ct.min());
        }));
    }
    keys() {
        return this.mutations.reduce(((t, e) => t.add(e.key)), Gn());
    }
    isEqual(t) {
        return this.batchId === t.batchId && ot(this.mutations, t.mutations, ((t, e) => mn(t, e))) && ot(this.baseMutations, t.baseMutations, ((t, e) => mn(t, e)));
    }
}

/** The result of applying a mutation batch to the backend. */ class Ti {
    constructor(t, e, n, 
    /**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */
    s) {
        this.batch = t, this.commitVersion = e, this.mutationResults = n, this.docVersions = s;
    }
    /**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=&gt;version mapping (docVersions).
     */    static from(t, e, n) {
        q(t.mutations.length === n.length);
        let s = Un;
        const i = t.mutations;
        for (let t = 0; t < i.length; t++) s = s.insert(i[t].key, n[t].version);
        return new Ti(t, e, n, s);
    }
}

/**
 * @license
 * Copyright 2022 Google LLC
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
 * Representation of an overlay computed by Firestore.
 *
 * Holds information about a mutation and the largest batch id in Firestore when
 * the mutation was created.
 */ class Ei {
    constructor(t, e) {
        this.largestBatchId = t, this.mutation = e;
    }
    getKey() {
        return this.mutation.key;
    }
    isEqual(t) {
        return null !== t && this.mutation === t.mutation;
    }
    toString() {
        return `Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`;
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
 * An immutable set of metadata that the local store tracks for each target.
 */ class Ai {
    constructor(
    /** The target being listened to. */
    t, 
    /**
     * The target ID to which the target corresponds; Assigned by the
     * LocalStore for user listens and by the SyncEngine for limbo watches.
     */
    e, 
    /** The purpose of the target. */
    n, 
    /**
     * The sequence number of the last transaction during which this target data
     * was modified.
     */
    s, 
    /** The latest snapshot version seen for this target. */
    i = ct.min()
    /**
     * The maximum snapshot version at which the associated view
     * contained no limbo documents.
     */ , r = ct.min()
    /**
     * An opaque, server-assigned token that allows watching a target to be
     * resumed after disconnecting without retransmitting all the data that
     * matches the target. The resume token essentially identifies a point in
     * time from which the server should resume sending results.
     */ , o = pt.EMPTY_BYTE_STRING) {
        this.target = t, this.targetId = e, this.purpose = n, this.sequenceNumber = s, this.snapshotVersion = i, 
        this.lastLimboFreeSnapshotVersion = r, this.resumeToken = o;
    }
    /** Creates a new target data instance with an updated sequence number. */    withSequenceNumber(t) {
        return new Ai(this.target, this.targetId, this.purpose, t, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken);
    }
    /**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */    withResumeToken(t, e) {
        return new Ai(this.target, this.targetId, this.purpose, this.sequenceNumber, e, this.lastLimboFreeSnapshotVersion, t);
    }
    /**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */    withLastLimboFreeSnapshotVersion(t) {
        return new Ai(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, t, this.resumeToken);
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
/** Serializer for values stored in the LocalStore. */ class Ri {
    constructor(t) {
        this.Jt = t;
    }
}

/** Decodes a remote document from storage locally to a Document. */ function bi(t, e) {
    let n;
    if (e.document) n = ys(t.Jt, e.document, !!e.hasCommittedMutations); else if (e.noDocument) {
        const t = xt.fromSegments(e.noDocument.path), s = Di(e.noDocument.readTime);
        n = te.newNoDocument(t, s), e.hasCommittedMutations && n.setHasCommittedMutations();
    } else {
        if (!e.unknownDocument) return L();
        {
            const t = xt.fromSegments(e.unknownDocument.path), s = Di(e.unknownDocument.version);
            n = te.newUnknownDocument(t, s);
        }
    }
    return e.readTime && n.setReadTime(vi(e.readTime)), n;
}

/** Encodes a document for storage locally. */ function Pi(t, e) {
    const n = e.key.path.popLast().toArray(), s = Vi(e.readTime);
    if (e.isFoundDocument()) {
        const i = function(t, e) {
            return {
                name: ls(t, e.key),
                fields: e.data.value.mapValue.fields,
                updateTime: rs(t, e.version.toTimestamp())
            };
        }(t.Jt, e);
        return {
            document: i,
            hasCommittedMutations: e.hasCommittedMutations,
            readTime: s,
            parentPath: n
        };
    }
    if (e.isNoDocument()) {
        const t = e.key.path.toArray(), i = e.hasCommittedMutations;
        return {
            noDocument: {
                path: t,
                readTime: Si(e.version)
            },
            hasCommittedMutations: i,
            readTime: s,
            parentPath: n
        };
    }
    if (e.isUnknownDocument()) {
        return {
            unknownDocument: {
                path: e.key.path.toArray(),
                version: Si(e.version)
            },
            hasCommittedMutations: !0,
            readTime: s,
            parentPath: n
        };
    }
    return L();
}

function Vi(t) {
    const e = t.toTimestamp();
    return [ e.seconds, e.nanoseconds ];
}

function vi(t) {
    const e = new ut(t[0], t[1]);
    return ct.fromTimestamp(e);
}

function Si(t) {
    const e = t.toTimestamp();
    return {
        seconds: e.seconds,
        nanoseconds: e.nanoseconds
    };
}

function Di(t) {
    const e = new ut(t.seconds, t.nanoseconds);
    return ct.fromTimestamp(e);
}

/** Encodes a batch of mutations into a DbMutationBatch for local storage. */
/** Decodes a DbMutationBatch into a MutationBatch */
function Ci(t, e) {
    const n = (e.baseMutations || []).map((e => Es(t.Jt, e)));
    // Squash old transform mutations into existing patch or set mutations.
    // The replacement of representing `transforms` with `update_transforms`
    // on the SDK means that old `transform` mutations stored in IndexedDB need
    // to be updated to `update_transforms`.
    // TODO(b/174608374): Remove this code once we perform a schema migration.
        for (let t = 0; t < e.mutations.length - 1; ++t) {
        const n = e.mutations[t];
        if (t + 1 < e.mutations.length && void 0 !== e.mutations[t + 1].transform) {
            const s = e.mutations[t + 1];
            n.updateTransforms = s.transform.fieldTransforms, e.mutations.splice(t + 1, 1), 
            ++t;
        }
    }
    const s = e.mutations.map((e => Es(t.Jt, e))), i = ut.fromMillis(e.localWriteTimeMs);
    return new Ii(e.batchId, i, n, s);
}

/** Decodes a DbTarget into TargetData */ function xi(t) {
    const e = Di(t.readTime), n = void 0 !== t.lastLimboFreeSnapshotVersion ? Di(t.lastLimboFreeSnapshotVersion) : ct.min();
    let s;
    var i;
    return void 0 !== t.query.documents ? (q(1 === (i = t.query).documents.length), 
    s = $e(De(_s(i.documents[0])))) : s = function(t) {
        return $e(Ps(t));
    }(t.query), new Ai(s, t.targetId, 0 /* Listen */ , t.lastListenSequenceNumber, e, n, pt.fromBase64String(t.resumeToken));
}

/** Encodes TargetData into a DbTarget for storage locally. */ function Ni(t, e) {
    const n = Si(e.snapshotVersion), s = Si(e.lastLimboFreeSnapshotVersion);
    let i;
    i = fe(e.target) ? Rs(t.Jt, e.target) : bs(t.Jt, e.target);
    // We can't store the resumeToken as a ByteString in IndexedDb, so we
    // convert it to a base64 string for storage.
        const r = e.resumeToken.toBase64();
    // lastListenSequenceNumber is always 0 until we do real GC.
        return {
        targetId: e.targetId,
        canonicalId: ce(e.target),
        readTime: n,
        resumeToken: r,
        lastListenSequenceNumber: e.sequenceNumber,
        lastLimboFreeSnapshotVersion: s,
        query: i
    };
}

/**
 * A helper function for figuring out what kind of query has been stored.
 */
/**
 * Encodes a `BundledQuery` from bundle proto to a Query object.
 *
 * This reconstructs the original query used to build the bundle being loaded,
 * including features exists only in SDKs (for example: limit-to-last).
 */
function ki(t) {
    const e = Ps({
        parent: t.parent,
        structuredQuery: t.structuredQuery
    });
    return "LAST" === t.limitType ? Fe(e, e.limit, "L" /* Last */) : e;
}

/** Encodes a NamedQuery proto object to a NamedQuery model object. */
/** Encodes a DbDocumentOverlay object to an Overlay model object. */
function Mi(t, e) {
    return new Ei(e.largestBatchId, Es(t.Jt, e.overlayMutation));
}

/** Decodes an Overlay model object into a DbDocumentOverlay object. */
/**
 * Returns the DbDocumentOverlayKey corresponding to the given user and
 * document key.
 */
function Oi(t, e) {
    const n = e.path.lastSegment();
    return [ t, $s(e.path.popLast()), n ];
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
class $i {
    getBundleMetadata(t, e) {
        return Fi(t).get(e).next((t => {
            if (t) return {
                id: (e = t).bundleId,
                createTime: Di(e.createTime),
                version: e.version
            };
            /** Encodes a DbBundle to a BundleMetadata object. */
            var e;
            /** Encodes a BundleMetadata to a DbBundle. */        }));
    }
    saveBundleMetadata(t, e) {
        return Fi(t).put({
            bundleId: (n = e).id,
            createTime: Si(us(n.createTime)),
            version: n.version
        });
        var n;
        /** Encodes a DbNamedQuery to a NamedQuery. */    }
    getNamedQuery(t, e) {
        return Bi(t).get(e).next((t => {
            if (t) return {
                name: (e = t).name,
                query: ki(e.bundledQuery),
                readTime: Di(e.readTime)
            };
            var e;
            /** Encodes a NamedQuery from a bundle proto to a DbNamedQuery. */        }));
    }
    saveNamedQuery(t, e) {
        return Bi(t).put(function(t) {
            return {
                name: t.name,
                readTime: Si(us(t.readTime)),
                bundledQuery: t.bundledQuery
            };
        }(e));
    }
}

/**
 * Helper to get a typed SimpleDbStore for the bundles object store.
 */ function Fi(t) {
    return pi(t, "bundles");
}

/**
 * Helper to get a typed SimpleDbStore for the namedQueries object store.
 */ function Bi(t) {
    return pi(t, "namedQueries");
}

/**
 * @license
 * Copyright 2022 Google LLC
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
 * Implementation of DocumentOverlayCache using IndexedDb.
 */ class Li {
    /**
     * @param serializer - The document serializer.
     * @param userId - The userId for which we are accessing overlays.
     */
    constructor(t, e) {
        this.M = t, this.userId = e;
    }
    static Yt(t, e) {
        const n = e.uid || "";
        return new Li(t, n);
    }
    getOverlay(t, e) {
        return qi(t).get(Oi(this.userId, e)).next((t => t ? Mi(this.M, t) : null));
    }
    saveOverlays(t, e, n) {
        const s = [];
        return n.forEach(((n, i) => {
            const r = new Ei(e, i);
            s.push(this.Xt(t, r));
        })), ui.waitFor(s);
    }
    removeOverlaysForBatchId(t, e, n) {
        const s = new Set;
        // Get the set of unique collection paths.
                e.forEach((t => s.add($s(t.getCollectionPath()))));
        const i = [];
        return s.forEach((e => {
            const s = IDBKeyRange.bound([ this.userId, e, n ], [ this.userId, e, n + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0);
            i.push(qi(t).Qt("collectionPathOverlayIndex", s));
        })), ui.waitFor(i);
    }
    getOverlaysForCollection(t, e, n) {
        const s = qn(), i = $s(e), r = IDBKeyRange.bound([ this.userId, i, n ], [ this.userId, i, Number.POSITIVE_INFINITY ], 
        /*lowerOpen=*/ !0);
        return qi(t).Ut("collectionPathOverlayIndex", r).next((t => {
            for (const e of t) {
                const t = Mi(this.M, e);
                s.set(t.getKey(), t);
            }
            return s;
        }));
    }
    getOverlaysForCollectionGroup(t, e, n, s) {
        const i = qn();
        let r;
        // We want batch IDs larger than `sinceBatchId`, and so the lower bound
        // is not inclusive.
                const o = IDBKeyRange.bound([ this.userId, e, n ], [ this.userId, e, Number.POSITIVE_INFINITY ], 
        /*lowerOpen=*/ !0);
        return qi(t).Wt({
            index: "collectionGroupOverlayIndex",
            range: o
        }, ((t, e, n) => {
            // We do not want to return partial batch overlays, even if the size
            // of the result set exceeds the given `count` argument. Therefore, we
            // continue to aggregate results even after the result size exceeds
            // `count` if there are more overlays from the `currentBatchId`.
            const o = Mi(this.M, e);
            i.size() < s || o.largestBatchId === r ? (i.set(o.getKey(), o), r = o.largestBatchId) : n.done();
        })).next((() => i));
    }
    Xt(t, e) {
        return qi(t).put(function(t, e, n) {
            const [s, i, r] = Oi(e, n.mutation.key);
            return {
                userId: e,
                collectionPath: i,
                documentId: r,
                collectionGroup: n.mutation.key.getCollectionGroup(),
                largestBatchId: n.largestBatchId,
                overlayMutation: Ts(t.Jt, n.mutation)
            };
        }(this.M, this.userId, e));
    }
}

/**
 * Helper to get a typed SimpleDbStore for the document overlay object store.
 */ function qi(t) {
    return pi(t, "documentOverlays");
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
// Note: This code is copied from the backend. Code that is not used by
// Firestore was removed.
/** Firestore index value writer.  */
class Ui {
    constructor() {}
    // The write methods below short-circuit writing terminators for values
    // containing a (terminating) truncated value.
    // As an example, consider the resulting encoding for:
    // ["bar", [2, "foo"]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TERM, TERM, TERM)
    // ["bar", [2, truncated("foo")]] -> (STRING, "bar", TERM, ARRAY, NUMBER, 2, STRING, "foo", TRUNC)
    // ["bar", truncated(["foo"])] -> (STRING, "bar", TERM, ARRAY. STRING, "foo", TERM, TRUNC)
    /** Writes an index value.  */
    Zt(t, e) {
        this.te(t, e), 
        // Write separator to split index values
        // (see go/firestore-storage-format#encodings).
        e.ee();
    }
    te(t, e) {
        if ("nullValue" in t) this.ne(e, 5); else if ("booleanValue" in t) this.ne(e, 10), 
        e.se(t.booleanValue ? 1 : 0); else if ("integerValue" in t) this.ne(e, 15), e.se(Et(t.integerValue)); else if ("doubleValue" in t) {
            const n = Et(t.doubleValue);
            isNaN(n) ? this.ne(e, 13) : (this.ne(e, 15), Dt(n) ? 
            // -0.0, 0 and 0.0 are all considered the same
            e.se(0) : e.se(n));
        } else if ("timestampValue" in t) {
            const n = t.timestampValue;
            this.ne(e, 20), "string" == typeof n ? e.ie(n) : (e.ie(`${n.seconds || ""}`), e.se(n.nanos || 0));
        } else if ("stringValue" in t) this.re(t.stringValue, e), this.oe(e); else if ("bytesValue" in t) this.ne(e, 30), 
        e.ae(At(t.bytesValue)), this.oe(e); else if ("referenceValue" in t) this.ue(t.referenceValue, e); else if ("geoPointValue" in t) {
            const n = t.geoPointValue;
            this.ne(e, 45), e.se(n.latitude || 0), e.se(n.longitude || 0);
        } else "mapValue" in t ? Ht(t) ? this.ne(e, Number.MAX_SAFE_INTEGER) : (this.ce(t.mapValue, e), 
        this.oe(e)) : "arrayValue" in t ? (this.he(t.arrayValue, e), this.oe(e)) : L();
    }
    re(t, e) {
        this.ne(e, 25), this.le(t, e);
    }
    le(t, e) {
        e.ie(t);
    }
    ce(t, e) {
        const n = t.fields || {};
        this.ne(e, 55);
        for (const t of Object.keys(n)) this.re(t, e), this.te(n[t], e);
    }
    he(t, e) {
        const n = t.values || [];
        this.ne(e, 50);
        for (const t of n) this.te(t, e);
    }
    ue(t, e) {
        this.ne(e, 37);
        xt.fromName(t).path.forEach((t => {
            this.ne(e, 60), this.le(t, e);
        }));
    }
    ne(t, e) {
        t.se(e);
    }
    oe(t) {
        // While the SDK does not implement truncation, the truncation marker is
        // used to terminate all variable length values (which are strings, bytes,
        // references, arrays and maps).
        t.se(2);
    }
}

Ui.fe = new Ui;

/**
 * Counts the number of zeros in a byte.
 *
 * Visible for testing.
 */
function Ki(t) {
    if (0 === t) return 8;
    let e = 0;
    return t >> 4 == 0 && (
    // Test if the first four bits are zero.
    e += 4, t <<= 4), t >> 6 == 0 && (
    // Test if the first two (or next two) bits are zero.
    e += 2, t <<= 2), t >> 7 == 0 && (
    // Test if the remaining bit is zero.
    e += 1), e;
}

/** Counts the number of leading zeros in the given byte array. */
/**
 * Returns the number of bytes required to store "value". Leading zero bytes
 * are skipped.
 */
function Gi(t) {
    // This is just the number of bytes for the unsigned representation of the number.
    const e = 64 - function(t) {
        let e = 0;
        for (let n = 0; n < 8; ++n) {
            const s = Ki(255 & t[n]);
            if (e += s, 8 !== s) break;
        }
        return e;
    }(t);
    return Math.ceil(e / 8);
}

/**
 * OrderedCodeWriter is a minimal-allocation implementation of the writing
 * behavior defined by the backend.
 *
 * The code is ported from its Java counterpart.
 */ class Qi {
    constructor() {
        this.buffer = new Uint8Array(1024), this.position = 0;
    }
    de(t) {
        const e = t[Symbol.iterator]();
        let n = e.next();
        for (;!n.done; ) this._e(n.value), n = e.next();
        this.we();
    }
    me(t) {
        const e = t[Symbol.iterator]();
        let n = e.next();
        for (;!n.done; ) this.ge(n.value), n = e.next();
        this.ye();
    }
    /** Writes utf8 bytes into this byte sequence, ascending. */    pe(t) {
        for (const e of t) {
            const t = e.charCodeAt(0);
            if (t < 128) this._e(t); else if (t < 2048) this._e(960 | t >>> 6), this._e(128 | 63 & t); else if (e < "\ud800" || "\udbff" < e) this._e(480 | t >>> 12), 
            this._e(128 | 63 & t >>> 6), this._e(128 | 63 & t); else {
                const t = e.codePointAt(0);
                this._e(240 | t >>> 18), this._e(128 | 63 & t >>> 12), this._e(128 | 63 & t >>> 6), 
                this._e(128 | 63 & t);
            }
        }
        this.we();
    }
    /** Writes utf8 bytes into this byte sequence, descending */    Ie(t) {
        for (const e of t) {
            const t = e.charCodeAt(0);
            if (t < 128) this.ge(t); else if (t < 2048) this.ge(960 | t >>> 6), this.ge(128 | 63 & t); else if (e < "\ud800" || "\udbff" < e) this.ge(480 | t >>> 12), 
            this.ge(128 | 63 & t >>> 6), this.ge(128 | 63 & t); else {
                const t = e.codePointAt(0);
                this.ge(240 | t >>> 18), this.ge(128 | 63 & t >>> 12), this.ge(128 | 63 & t >>> 6), 
                this.ge(128 | 63 & t);
            }
        }
        this.ye();
    }
    Te(t) {
        // Values are encoded with a single byte length prefix, followed by the
        // actual value in big-endian format with leading 0 bytes dropped.
        const e = this.Ee(t), n = Gi(e);
        this.Ae(1 + n), this.buffer[this.position++] = 255 & n;
        // Write the length
        for (let t = e.length - n; t < e.length; ++t) this.buffer[this.position++] = 255 & e[t];
    }
    Re(t) {
        // Values are encoded with a single byte length prefix, followed by the
        // inverted value in big-endian format with leading 0 bytes dropped.
        const e = this.Ee(t), n = Gi(e);
        this.Ae(1 + n), this.buffer[this.position++] = ~(255 & n);
        // Write the length
        for (let t = e.length - n; t < e.length; ++t) this.buffer[this.position++] = ~(255 & e[t]);
    }
    /**
     * Writes the "infinity" byte sequence that sorts after all other byte
     * sequences written in ascending order.
     */    be() {
        this.Pe(255), this.Pe(255);
    }
    /**
     * Writes the "infinity" byte sequence that sorts before all other byte
     * sequences written in descending order.
     */    Ve() {
        this.ve(255), this.ve(255);
    }
    /**
     * Resets the buffer such that it is the same as when it was newly
     * constructed.
     */    reset() {
        this.position = 0;
    }
    seed(t) {
        this.Ae(t.length), this.buffer.set(t, this.position), this.position += t.length;
    }
    /** Makes a copy of the encoded bytes in this buffer.  */    Se() {
        return this.buffer.slice(0, this.position);
    }
    /**
     * Encodes `val` into an encoding so that the order matches the IEEE 754
     * floating-point comparison results with the following exceptions:
     *   -0.0 < 0.0
     *   all non-NaN < NaN
     *   NaN = NaN
     */    Ee(t) {
        const e = 
        /** Converts a JavaScript number to a byte array (using big endian encoding). */
        function(t) {
            const e = new DataView(new ArrayBuffer(8));
            return e.setFloat64(0, t, /* littleEndian= */ !1), new Uint8Array(e.buffer);
        }(t), n = 0 != (128 & e[0]);
        // Check if the first bit is set. We use a bit mask since value[0] is
        // encoded as a number from 0 to 255.
                // Revert the two complement to get natural ordering
        e[0] ^= n ? 255 : 128;
        for (let t = 1; t < e.length; ++t) e[t] ^= n ? 255 : 0;
        return e;
    }
    /** Writes a single byte ascending to the buffer. */    _e(t) {
        const e = 255 & t;
        0 === e ? (this.Pe(0), this.Pe(255)) : 255 === e ? (this.Pe(255), this.Pe(0)) : this.Pe(e);
    }
    /** Writes a single byte descending to the buffer.  */    ge(t) {
        const e = 255 & t;
        0 === e ? (this.ve(0), this.ve(255)) : 255 === e ? (this.ve(255), this.ve(0)) : this.ve(t);
    }
    we() {
        this.Pe(0), this.Pe(1);
    }
    ye() {
        this.ve(0), this.ve(1);
    }
    Pe(t) {
        this.Ae(1), this.buffer[this.position++] = t;
    }
    ve(t) {
        this.Ae(1), this.buffer[this.position++] = ~t;
    }
    Ae(t) {
        const e = t + this.position;
        if (e <= this.buffer.length) return;
        // Try doubling.
                let n = 2 * this.buffer.length;
        // Still not big enough? Just allocate the right size.
                n < e && (n = e);
        // Create the new buffer.
                const s = new Uint8Array(n);
        s.set(this.buffer), // copy old data
        this.buffer = s;
    }
}

class ji {
    constructor(t) {
        this.De = t;
    }
    ae(t) {
        this.De.de(t);
    }
    ie(t) {
        this.De.pe(t);
    }
    se(t) {
        this.De.Te(t);
    }
    ee() {
        this.De.be();
    }
}

class Wi {
    constructor(t) {
        this.De = t;
    }
    ae(t) {
        this.De.me(t);
    }
    ie(t) {
        this.De.Ie(t);
    }
    se(t) {
        this.De.Re(t);
    }
    ee() {
        this.De.Ve();
    }
}

/**
 * Implements `DirectionalIndexByteEncoder` using `OrderedCodeWriter` for the
 * actual encoding.
 */ class zi {
    constructor() {
        this.De = new Qi, this.Ce = new ji(this.De), this.xe = new Wi(this.De);
    }
    seed(t) {
        this.De.seed(t);
    }
    Ne(t) {
        return 0 /* ASCENDING */ === t ? this.Ce : this.xe;
    }
    Se() {
        return this.De.Se();
    }
    reset() {
        this.De.reset();
    }
}

/**
 * @license
 * Copyright 2022 Google LLC
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
/** Represents an index entry saved by the SDK in persisted storage. */ class Hi {
    constructor(t, e, n, s) {
        this.indexId = t, this.documentKey = e, this.arrayValue = n, this.directionalValue = s;
    }
    /**
     * Returns an IndexEntry entry that sorts immediately after the current
     * directional value.
     */    ke() {
        const t = this.directionalValue.length, e = 0 === t || 255 === this.directionalValue[t - 1] ? t + 1 : t, n = new Uint8Array(e);
        return n.set(this.directionalValue, 0), e !== t ? n.set([ 0 ], this.directionalValue.length) : ++n[n.length - 1], 
        new Hi(this.indexId, this.documentKey, this.arrayValue, n);
    }
}

function Ji(t, e) {
    let n = t.indexId - e.indexId;
    return 0 !== n ? n : (n = Yi(t.arrayValue, e.arrayValue), 0 !== n ? n : (n = Yi(t.directionalValue, e.directionalValue), 
    0 !== n ? n : xt.comparator(t.documentKey, e.documentKey)));
}

function Yi(t, e) {
    for (let n = 0; n < t.length && n < e.length; ++n) {
        const s = t[n] - e[n];
        if (0 !== s) return s;
    }
    return t.length - e.length;
}

/**
 * @license
 * Copyright 2022 Google LLC
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
 * A light query planner for Firestore.
 *
 * This class matches a `FieldIndex` against a Firestore Query `Target`. It
 * determines whether a given index can be used to serve the specified target.
 *
 * The following table showcases some possible index configurations:
 *
 * Query                                               | Index
 * -----------------------------------------------------------------------------
 * where('a', '==', 'a').where('b', '==', 'b')         | a ASC, b DESC
 * where('a', '==', 'a').where('b', '==', 'b')         | a ASC
 * where('a', '==', 'a').where('b', '==', 'b')         | b DESC
 * where('a', '>=', 'a').orderBy('a')                  | a ASC
 * where('a', '>=', 'a').orderBy('a', 'desc')          | a DESC
 * where('a', '>=', 'a').orderBy('a').orderBy('b')     | a ASC, b ASC
 * where('a', '>=', 'a').orderBy('a').orderBy('b')     | a ASC
 * where('a', 'array-contains', 'a').orderBy('b')      | a CONTAINS, b ASCENDING
 * where('a', 'array-contains', 'a').orderBy('b')      | a CONTAINS
 */ class Xi {
    constructor(t) {
        this.collectionId = null != t.collectionGroup ? t.collectionGroup : t.path.lastSegment(), 
        this.Me = t.orderBy, this.Oe = [];
        for (const e of t.filters) {
            const t = e;
            t.S() ? this.$e = t : this.Oe.push(t);
        }
    }
    /**
     * Returns whether the index can be used to serve the TargetIndexMatcher's
     * target.
     *
     * An index is considered capable of serving the target when:
     * - The target uses all index segments for its filters and orderBy clauses.
     *   The target can have additional filter and orderBy clauses, but not
     *   fewer.
     * - If an ArrayContains/ArrayContainsAnyfilter is used, the index must also
     *   have a corresponding `CONTAINS` segment.
     * - All directional index segments can be mapped to the target as a series of
     *   equality filters, a single inequality filter and a series of orderBy
     *   clauses.
     * - The segments that represent the equality filters may appear out of order.
     * - The optional segment for the inequality filter must appear after all
     *   equality segments.
     * - The segments that represent that orderBy clause of the target must appear
     *   in order after all equality and inequality segments. Single orderBy
     *   clauses cannot be skipped, but a continuous orderBy suffix may be
     *   omitted.
     */    Fe(t) {
        // If there is an array element, find a matching filter.
        const e = ne(t);
        if (void 0 !== e && !this.Be(e)) return !1;
        const n = se(t);
        let s = 0, i = 0;
        // Process all equalities first. Equalities can appear out of order.
        for (;s < n.length && this.Be(n[s]); ++s) ;
        // If we already have processed all segments, all segments are used to serve
        // the equality filters and we do not need to map any segments to the
        // target's inequality and orderBy clauses.
                if (s === n.length) return !0;
        // If there is an inequality filter, the next segment must match both the
        // filter and the first orderBy clause.
                if (void 0 !== this.$e) {
            const t = n[s];
            if (!this.Le(this.$e, t) || !this.qe(this.Me[i++], t)) return !1;
            ++s;
        }
        // All remaining segments need to represent the prefix of the target's
        // orderBy.
                for (;s < n.length; ++s) {
            const t = n[s];
            if (i >= this.Me.length || !this.qe(this.Me[i++], t)) return !1;
        }
        return !0;
    }
    Be(t) {
        for (const e of this.Oe) if (this.Le(e, t)) return !0;
        return !1;
    }
    Le(t, e) {
        if (void 0 === t || !t.field.isEqual(e.fieldPath)) return !1;
        const n = "array-contains" /* ARRAY_CONTAINS */ === t.op || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === t.op;
        return 2 /* CONTAINS */ === e.kind === n;
    }
    qe(t, e) {
        return !!t.field.isEqual(e.fieldPath) && (0 /* ASCENDING */ === e.kind && "asc" /* ASCENDING */ === t.dir || 1 /* DESCENDING */ === e.kind && "desc" /* DESCENDING */ === t.dir);
    }
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
 * An in-memory implementation of IndexManager.
 */ class Zi {
    constructor() {
        this.Ue = new tr;
    }
    addToCollectionParentIndex(t, e) {
        return this.Ue.add(e), ui.resolve();
    }
    getCollectionParents(t, e) {
        return ui.resolve(this.Ue.getEntries(e));
    }
    addFieldIndex(t, e) {
        // Field indices are not supported with memory persistence.
        return ui.resolve();
    }
    deleteFieldIndex(t, e) {
        // Field indices are not supported with memory persistence.
        return ui.resolve();
    }
    getDocumentsMatchingTarget(t, e) {
        // Field indices are not supported with memory persistence.
        return ui.resolve(null);
    }
    getFieldIndex(t, e) {
        // Field indices are not supported with memory persistence.
        return ui.resolve(null);
    }
    getFieldIndexes(t, e) {
        // Field indices are not supported with memory persistence.
        return ui.resolve([]);
    }
    getNextCollectionGroupToUpdate(t) {
        // Field indices are not supported with memory persistence.
        return ui.resolve(null);
    }
    updateCollectionGroup(t, e, n) {
        // Field indices are not supported with memory persistence.
        return ui.resolve();
    }
    updateIndexEntries(t, e) {
        // Field indices are not supported with memory persistence.
        return ui.resolve();
    }
}

/**
 * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
 * Also used for in-memory caching by IndexedDbIndexManager and initial index population
 * in indexeddb_schema.ts
 */ class tr {
    constructor() {
        this.index = {};
    }
    // Returns false if the entry already existed.
    add(t) {
        const e = t.lastSegment(), n = t.popLast(), s = this.index[e] || new kn(_t.comparator), i = !s.has(n);
        return this.index[e] = s.add(n), i;
    }
    has(t) {
        const e = t.lastSegment(), n = t.popLast(), s = this.index[e];
        return s && s.has(n);
    }
    getEntries(t) {
        return (this.index[t] || new kn(_t.comparator)).toArray();
    }
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
 */ const er = new Uint8Array(0);

/**
 * A persisted implementation of IndexManager.
 *
 * PORTING NOTE: Unlike iOS and Android, the Web SDK does not memoize index
 * data as it supports multi-tab access.
 */
class nr {
    constructor(t) {
        this.user = t, 
        /**
         * An in-memory copy of the index entries we've already written since the SDK
         * launched. Used to avoid re-writing the same entry repeatedly.
         *
         * This is *NOT* a complete cache of what's in persistence and so can never be
         * used to satisfy reads.
         */
        this.Ke = new tr, 
        /**
         * Maps from a target to its equivalent list of sub-targets. Each sub-target
         * contains only one term from the target's disjunctive normal form (DNF).
         */
        this.Ge = new Dn((t => ce(t)), ((t, e) => le(t, e))), this.uid = t.uid || "";
    }
    /**
     * Adds a new entry to the collection parent index.
     *
     * Repeated calls for the same collectionPath should be avoided within a
     * transaction as IndexedDbIndexManager only caches writes once a transaction
     * has been committed.
     */    addToCollectionParentIndex(t, e) {
        if (!this.Ke.has(e)) {
            const n = e.lastSegment(), s = e.popLast();
            t.addOnCommittedListener((() => {
                // Add the collection to the in memory cache only if the transaction was
                // successfully committed.
                this.Ke.add(e);
            }));
            const i = {
                collectionId: n,
                parent: $s(s)
            };
            return sr(t).put(i);
        }
        return ui.resolve();
    }
    getCollectionParents(t, e) {
        const n = [], s = IDBKeyRange.bound([ e, "" ], [ at(e), "" ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return sr(t).Ut(s).next((t => {
            for (const s of t) {
                // This collectionId guard shouldn't be necessary (and isn't as long
                // as we're running in a real browser), but there's a bug in
                // indexeddbshim that breaks our range in our tests running in node:
                // https://github.com/axemclion/IndexedDBShim/issues/334
                if (s.collectionId !== e) break;
                n.push(Ls(s.parent));
            }
            return n;
        }));
    }
    addFieldIndex(t, e) {
        // TODO(indexing): Verify that the auto-incrementing index ID works in
        // Safari & Firefox.
        const n = rr(t), s = function(t) {
            return {
                indexId: t.indexId,
                collectionGroup: t.collectionGroup,
                fields: t.fields.map((t => [ t.fieldPath.canonicalString(), t.kind ]))
            };
        }(e);
        // `indexId` is auto-populated by IndexedDb
        return delete s.indexId, n.add(s).next();
    }
    deleteFieldIndex(t, e) {
        const n = rr(t), s = or(t), i = ir(t);
        return n.delete(e.indexId).next((() => s.delete(IDBKeyRange.bound([ e.indexId ], [ e.indexId + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0)))).next((() => i.delete(IDBKeyRange.bound([ e.indexId ], [ e.indexId + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0))));
    }
    getDocumentsMatchingTarget(t, e) {
        const n = ir(t);
        let s = !0;
        const i = new Map;
        return ui.forEach(this.Qe(e), (e => this.getFieldIndex(t, e).next((t => {
            s && (s = !!t), i.set(e, t);
        })))).next((() => {
            if (s) {
                let t = Gn();
                return ui.forEach(i, ((s, i) => {
                    var r;
                    O("IndexedDbIndexManager", `Using index ${r = s, `id=${r.indexId}|cg=${r.collectionGroup}|f=${r.fields.map((t => `${t.fieldPath}:${t.kind}`)).join(",")}`} to execute ${ce(e)}`);
                    const o = function(t, e) {
                        const n = ne(e);
                        if (void 0 === n) return null;
                        for (const e of de(t, n.fieldPath)) switch (e.op) {
                          case "array-contains-any" /* ARRAY_CONTAINS_ANY */ :
                            return e.value.arrayValue.values || [];

                          case "array-contains" /* ARRAY_CONTAINS */ :
                            return [ e.value ];
                            // Remaining filters are not array filters.
                                                }
                        return null;
                    }
                    /**
 * Returns the list of values that are used in != or NOT_IN filters. Returns
 * `null` if there are no such filters.
 */ (i, s), a = function(t, e) {
                        const n = new Map;
                        for (const s of se(e)) for (const e of de(t, s.fieldPath)) switch (e.op) {
                          case "==" /* EQUAL */ :
                          case "in" /* IN */ :
                            // Encode equality prefix, which is encoded in the index value before
                            // the inequality (e.g. `a == 'a' && b != 'b'` is encoded to
                            // `value != 'ab'`).
                            n.set(s.fieldPath.canonicalString(), e.value);
                            break;

                          case "not-in" /* NOT_IN */ :
                          case "!=" /* NOT_EQUAL */ :
                            // NotIn/NotEqual is always a suffix. There cannot be any remaining
                            // segments and hence we can return early here.
                            return n.set(s.fieldPath.canonicalString(), e.value), Array.from(n.values());
                            // Remaining filters cannot be used as notIn bounds.
                                                }
                        return null;
                    }
                    /**
 * Returns a lower bound of field values that can be used as a starting point to
 * scan the index defined by `fieldIndex`. Returns `null` if no lower bound
 * exists.
 */ (i, s), u = function(t, e) {
                        const n = [];
                        let s = !0;
                        // For each segment, retrieve a lower bound if there is a suitable filter or
                        // startAt.
                                                for (const r of se(e)) {
                            let e, o = !0;
                            // Process all filters to find a value for the current field segment
                            for (const n of de(t, r.fieldPath)) {
                                let t, s = !0;
                                switch (n.op) {
                                  case "<" /* LESS_THAN */ :
                                  case "<=" /* LESS_THAN_OR_EQUAL */ :
                                    t = "nullValue" in (i = n.value) ? kt : "booleanValue" in i ? {
                                        booleanValue: !1
                                    } : "integerValue" in i || "doubleValue" in i ? {
                                        doubleValue: NaN
                                    } : "timestampValue" in i ? {
                                        timestampValue: {
                                            seconds: Number.MIN_SAFE_INTEGER
                                        }
                                    } : "stringValue" in i ? {
                                        stringValue: ""
                                    } : "bytesValue" in i ? {
                                        bytesValue: ""
                                    } : "referenceValue" in i ? Ut(vt.empty(), xt.empty()) : "geoPointValue" in i ? {
                                        geoPointValue: {
                                            latitude: -90,
                                            longitude: -180
                                        }
                                    } : "arrayValue" in i ? {
                                        arrayValue: {}
                                    } : "mapValue" in i ? {
                                        mapValue: {}
                                    } : L();
                                    break;

                                  case "==" /* EQUAL */ :
                                  case "in" /* IN */ :
                                  case ">=" /* GREATER_THAN_OR_EQUAL */ :
                                    t = n.value;
                                    break;

                                  case ">" /* GREATER_THAN */ :
                                    t = n.value, s = !1;
                                    break;

                                  case "!=" /* NOT_EQUAL */ :
                                  case "not-in" /* NOT_IN */ :
                                    t = kt;
 // Remaining filters cannot be used as lower bounds.
                                                                }
                                Jt(e, t) === t && (e = t, o = s);
                            }
                            // If there is a startAt bound, compare the values against the existing
                            // boundary to see if we can narrow the scope.
                                                        if (null !== t.startAt) for (let n = 0; n < t.orderBy.length; ++n) if (t.orderBy[n].field.isEqual(r.fieldPath)) {
                                const s = t.startAt.position[n];
                                Jt(e, s) === s && (e = s, o = t.startAt.inclusive);
                                break;
                            }
                            if (void 0 === e) 
                            // No lower bound exists
                            return null;
                            n.push(e), s && (s = o);
                        }
                        var i;
                        /** Returns the largest value for the given value type (exclusive). */                        return new Ae(n, s);
                    }
                    /**
 * Returns an upper bound of field values that can be used as an ending point
 * when scanning the index defined by `fieldIndex`. Returns `null` if no
 * upper bound exists.
 */ (i, s), c = function(t, e) {
                        const n = [];
                        let s = !0;
                        // For each segment, retrieve an upper bound if there is a suitable filter or
                        // endAt.
                                                for (const r of se(e)) {
                            let e, o = !0;
                            // Process all filters to find a value for the current field segment
                            for (const n of de(t, r.fieldPath)) {
                                let t, s = !0;
                                switch (n.op) {
                                  case ">=" /* GREATER_THAN_OR_EQUAL */ :
                                  case ">" /* GREATER_THAN */ :
                                    t = "nullValue" in (i = n.value) ? {
                                        booleanValue: !1
                                    } : "booleanValue" in i ? {
                                        doubleValue: NaN
                                    } : "integerValue" in i || "doubleValue" in i ? {
                                        timestampValue: {
                                            seconds: Number.MIN_SAFE_INTEGER
                                        }
                                    } : "timestampValue" in i ? {
                                        stringValue: ""
                                    } : "stringValue" in i ? {
                                        bytesValue: ""
                                    } : "bytesValue" in i ? Ut(vt.empty(), xt.empty()) : "referenceValue" in i ? {
                                        geoPointValue: {
                                            latitude: -90,
                                            longitude: -180
                                        }
                                    } : "geoPointValue" in i ? {
                                        arrayValue: {}
                                    } : "arrayValue" in i ? {
                                        mapValue: {}
                                    } : "mapValue" in i ? Nt : L(), s = !1;
                                    break;

                                  case "==" /* EQUAL */ :
                                  case "in" /* IN */ :
                                  case "<=" /* LESS_THAN_OR_EQUAL */ :
                                    t = n.value;
                                    break;

                                  case "<" /* LESS_THAN */ :
                                    t = n.value, s = !1;
                                    break;

                                  case "!=" /* NOT_EQUAL */ :
                                  case "not-in" /* NOT_IN */ :
                                    t = Nt;
 // Remaining filters cannot be used as upper bounds.
                                                                }
                                Yt(e, t) === t && (e = t, o = s);
                            }
                            // If there is a endAt bound, compare the values against the existing
                            // boundary to see if we can narrow the scope.
                                                        if (null !== t.endAt) for (let n = 0; n < t.orderBy.length; ++n) if (t.orderBy[n].field.isEqual(r.fieldPath)) {
                                const s = t.endAt.position[n];
                                Yt(e, s) === s && (e = s, o = t.endAt.inclusive);
                                break;
                            }
                            if (void 0 === e) 
                            // No upper bound exists
                            return null;
                            n.push(e), s && (s = o);
                        }
                        var i;
                        return new Ae(n, s);
                    }(i, s), h = this.je(s, i, u), l = this.je(s, i, c), f = this.We(s, i, a), d = this.ze(s.indexId, o, h, !!u && u.inclusive, l, !!c && c.inclusive, f);
                    return ui.forEach(d, (s => n.Gt(s, e.limit).next((e => {
                        e.forEach((e => {
                            t = t.add(new xt(Ls(e.documentKey)));
                        }));
                    }))));
                })).next((() => t));
            }
            return ui.resolve(null);
        }));
    }
    Qe(t) {
        let e = this.Ge.get(t);
        return e || (
        // TODO(orquery): Implement DNF transform
        e = [ t ], this.Ge.set(t, e), e);
    }
    /**
     * Constructs a key range query on `DbIndexEntryStore` that unions all
     * bounds.
     */    ze(t, e, n, s, i, r, o) {
        // The number of total index scans we union together. This is similar to a
        // distributed normal form, but adapted for array values. We create a single
        // index range per value in an ARRAY_CONTAINS or ARRAY_CONTAINS_ANY filter
        // combined with the values from the query bounds.
        const a = (null != e ? e.length : 1) * Math.max(null != n ? n.length : 1, null != i ? i.length : 1), u = a / (null != e ? e.length : 1), c = [];
        for (let h = 0; h < a; ++h) {
            const a = e ? this.He(e[h / u]) : er, l = n ? this.Je(t, a, n[h % u], s) : this.Ye(t), f = i ? this.Xe(t, a, i[h % u], r) : this.Ye(t + 1);
            c.push(...this.createRange(l, f, o.map((e => this.Je(t, a, e, 
            /* inclusive= */ !0)))));
        }
        return c;
    }
    /** Generates the lower bound for `arrayValue` and `directionalValue`. */    Je(t, e, n, s) {
        const i = new Hi(t, xt.empty(), e, n);
        return s ? i : i.ke();
    }
    /** Generates the upper bound for `arrayValue` and `directionalValue`. */    Xe(t, e, n, s) {
        const i = new Hi(t, xt.empty(), e, n);
        return s ? i.ke() : i;
    }
    /**
     * Generates an empty bound that scopes the index scan to the current index
     * and user.
     */    Ye(t) {
        return new Hi(t, xt.empty(), er, er);
    }
    getFieldIndex(t, e) {
        const n = new Xi(e), s = null != e.collectionGroup ? e.collectionGroup : e.path.lastSegment();
        return this.getFieldIndexes(t, s).next((t => {
            const e = t.filter((t => n.Fe(t)));
            // Return the index that matches the most number of segments.
                        return e.sort(((t, e) => e.fields.length - t.fields.length)), e.length > 0 ? e[0] : null;
        }));
    }
    /**
     * Returns the byte encoded form of the directional values in the field index.
     * Returns `null` if the document does not have all fields specified in the
     * index.
     */    Ze(t, e) {
        const n = new zi;
        for (const s of se(t)) {
            const t = e.data.field(s.fieldPath);
            if (null == t) return null;
            const i = n.Ne(s.kind);
            Ui.fe.Zt(t, i);
        }
        return n.Se();
    }
    /** Encodes a single value to the ascending index format. */    He(t) {
        const e = new zi;
        return Ui.fe.Zt(t, e.Ne(0 /* ASCENDING */)), e.Se();
    }
    /**
     * Encodes the given field values according to the specification in `target`.
     * For IN queries, a list of possible values is returned.
     */    We(t, e, n) {
        if (null === n) return [];
        let s = [];
        s.push(new zi);
        let i = 0;
        for (const r of se(t)) {
            const t = n[i++];
            for (const n of s) if (this.tn(e, r.fieldPath) && Gt(t)) s = this.en(s, r, t); else {
                const e = n.Ne(r.kind);
                Ui.fe.Zt(t, e);
            }
        }
        return this.nn(s);
    }
    /**
     * Encodes the given bounds according to the specification in `target`. For IN
     * queries, a list of possible values is returned.
     */    je(t, e, n) {
        return null == n ? null : this.We(t, e, n.position);
    }
    /** Returns the byte representation for the provided encoders. */    nn(t) {
        const e = [];
        for (let n = 0; n < t.length; ++n) e[n] = t[n].Se();
        return e;
    }
    /**
     * Creates a separate encoder for each element of an array.
     *
     * The method appends each value to all existing encoders (e.g. filter("a",
     * "==", "a1").filter("b", "in", ["b1", "b2"]) becomes ["a1,b1", "a1,b2"]). A
     * list of new encoders is returned.
     */    en(t, e, n) {
        const s = [ ...t ], i = [];
        for (const t of n.arrayValue.values || []) for (const n of s) {
            const s = new zi;
            s.seed(n.Se()), Ui.fe.Zt(t, s.Ne(e.kind)), i.push(s);
        }
        return i;
    }
    tn(t, e) {
        return !!t.filters.find((t => t instanceof _e && t.field.isEqual(e) && ("in" /* IN */ === t.op || "not-in" /* NOT_IN */ === t.op)));
    }
    getFieldIndexes(t, e) {
        const n = rr(t), s = or(t);
        return (e ? n.Ut("collectionGroupIndex", IDBKeyRange.bound(e, e)) : n.Ut()).next((t => {
            const e = [];
            return ui.forEach(t, (t => s.get([ t.indexId, this.uid ]).next((n => {
                e.push(function(t, e) {
                    const n = e ? new re(e.sequenceNumber, new oe(Di(e.readTime), new xt(Ls(e.documentKey)), e.largestBatchId)) : re.empty(), s = t.fields.map((([t, e]) => new ie(mt.fromServerFormat(t), e)));
                    return new ee(t.indexId, t.collectionGroup, s, n);
                }(t, n));
            })))).next((() => e));
        }));
    }
    getNextCollectionGroupToUpdate(t) {
        return this.getFieldIndexes(t).next((t => 0 === t.length ? null : (t.sort(((t, e) => {
            const n = t.indexState.sequenceNumber - e.indexState.sequenceNumber;
            return 0 !== n ? n : rt(t.collectionGroup, e.collectionGroup);
        })), t[0].collectionGroup)));
    }
    updateCollectionGroup(t, e, n) {
        const s = rr(t), i = or(t);
        return this.sn(t).next((t => s.Ut("collectionGroupIndex", IDBKeyRange.bound(e, e)).next((e => ui.forEach(e, (e => i.put(function(t, e, n, s) {
            return {
                indexId: t,
                uid: e.uid || "",
                sequenceNumber: n,
                readTime: Si(s.readTime),
                documentKey: $s(s.documentKey.path),
                largestBatchId: s.largestBatchId
            };
        }(e.indexId, this.user, t, n))))))));
    }
    updateIndexEntries(t, e) {
        // Porting Note: `getFieldIndexes()` on Web does not cache index lookups as
        // it could be used across different IndexedDB transactions. As any cached
        // data might be invalidated by other multi-tab clients, we can only trust
        // data within a single IndexedDB transaction. We therefore add a cache
        // here.
        const n = new Map;
        return ui.forEach(e, ((e, s) => {
            const i = n.get(e.collectionGroup);
            return (i ? ui.resolve(i) : this.getFieldIndexes(t, e.collectionGroup)).next((i => (n.set(e.collectionGroup, i), 
            ui.forEach(i, (n => this.rn(t, e, n).next((e => {
                const i = this.on(s, n);
                return e.isEqual(i) ? ui.resolve() : this.an(t, s, e, i);
            })))))));
        }));
    }
    un(t, e, n) {
        return ir(t).put({
            indexId: n.indexId,
            uid: this.uid,
            arrayValue: n.arrayValue,
            directionalValue: n.directionalValue,
            documentKey: $s(e.key.path)
        });
    }
    cn(t, e, n) {
        return ir(t).delete([ n.indexId, this.uid, n.arrayValue, n.directionalValue, $s(e.key.path) ]);
    }
    rn(t, e, n) {
        const s = ir(t);
        let i = new kn(Ji);
        return s.Wt({
            index: "documentKeyIndex",
            range: IDBKeyRange.only([ n.indexId, this.uid, $s(e.path) ])
        }, ((t, s) => {
            i = i.add(new Hi(n.indexId, e, s.arrayValue, s.directionalValue));
        })).next((() => i));
    }
    /** Creates the index entries for the given document. */    on(t, e) {
        let n = new kn(Ji);
        const s = this.Ze(e, t);
        if (null == s) return n;
        const i = ne(e);
        if (null != i) {
            const r = t.data.field(i.fieldPath);
            if (Gt(r)) for (const i of r.arrayValue.values || []) n = n.add(new Hi(e.indexId, t.key, this.He(i), s));
        } else n = n.add(new Hi(e.indexId, t.key, er, s));
        return n;
    }
    /**
     * Updates the index entries for the provided document by deleting entries
     * that are no longer referenced in `newEntries` and adding all newly added
     * entries.
     */    an(t, e, n, s) {
        O("IndexedDbIndexManager", "Updating index entries for document '%s'", e.key);
        const i = [];
        return function(t, e, n, s, i) {
            const r = t.getIterator(), o = e.getIterator();
            let a = On(r), u = On(o);
            // Walk through the two sets at the same time, using the ordering defined by
            // `comparator`.
            for (;a || u; ) {
                let t = !1, e = !1;
                if (a && u) {
                    const s = n(a, u);
                    s < 0 ? 
                    // The element was removed if the next element in our ordered
                    // walkthrough is only in `before`.
                    e = !0 : s > 0 && (
                    // The element was added if the next element in our ordered walkthrough
                    // is only in `after`.
                    t = !0);
                } else null != a ? e = !0 : t = !0;
                t ? (s(u), u = On(o)) : e ? (i(a), a = On(r)) : (a = On(r), u = On(o));
            }
        }(n, s, Ji, (
        /* onAdd= */ n => {
            i.push(this.un(t, e, n));
        }), (
        /* onRemove= */ n => {
            i.push(this.cn(t, e, n));
        })), ui.waitFor(i);
    }
    sn(t) {
        let e = 1;
        return or(t).Wt({
            index: "sequenceNumberIndex",
            reverse: !0,
            range: IDBKeyRange.upperBound([ this.uid, Number.MAX_SAFE_INTEGER ])
        }, ((t, n, s) => {
            s.done(), e = n.sequenceNumber + 1;
        })).next((() => e));
    }
    /**
     * Returns a new set of IDB ranges that splits the existing range and excludes
     * any values that match the `notInValue` from these ranges. As an example,
     * '[foo > 2 && foo != 3]` becomes  `[foo > 2 && < 3, foo > 3]`.
     */    createRange(t, e, n) {
        // The notIb values need to be sorted and unique so that we can return a
        // sorted set of non-overlapping ranges.
        n = n.sort(((t, e) => Ji(t, e))).filter(((t, e, n) => !e || 0 !== Ji(t, n[e - 1])));
        const s = [];
        s.push(t);
        for (const i of n) {
            const n = Ji(i, t), r = Ji(i, e);
            if (0 === n) 
            // `notInValue` is the lower bound. We therefore need to raise the bound
            // to the next value.
            s[0] = t.ke(); else if (n > 0 && r < 0) 
            // `notInValue` is in the middle of the range
            s.push(i), s.push(i.ke()); else if (r > 0) 
            // `notInValue` (and all following values) are out of the range
            break;
        }
        s.push(e);
        const i = [];
        for (let t = 0; t < s.length; t += 2) i.push(IDBKeyRange.bound([ s[t].indexId, this.uid, s[t].arrayValue, s[t].directionalValue, "" ], [ s[t + 1].indexId, this.uid, s[t + 1].arrayValue, s[t + 1].directionalValue, "" ]));
        return i;
    }
}

/**
 * Helper to get a typed SimpleDbStore for the collectionParents
 * document store.
 */ function sr(t) {
    return pi(t, "collectionParents");
}

/**
 * Helper to get a typed SimpleDbStore for the index entry object store.
 */ function ir(t) {
    return pi(t, "indexEntries");
}

/**
 * Helper to get a typed SimpleDbStore for the index configuration object store.
 */ function rr(t) {
    return pi(t, "indexConfiguration");
}

/**
 * Helper to get a typed SimpleDbStore for the index state object store.
 */ function or(t) {
    return pi(t, "indexState");
}

/**
 * @license
 * Copyright 2018 Google LLC
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
 */ const ar = {
    didRun: !1,
    sequenceNumbersCollected: 0,
    targetsRemoved: 0,
    documentsRemoved: 0
};

class ur {
    constructor(
    // When we attempt to collect, we will only do so if the cache size is greater than this
    // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
    t, 
    // The percentage of sequence numbers that we will attempt to collect
    e, 
    // A cap on the total number of sequence numbers that will be collected. This prevents
    // us from collecting a huge number of sequence numbers if the cache has grown very large.
    n) {
        this.cacheSizeCollectionThreshold = t, this.percentileToCollect = e, this.maximumSequenceNumbersToCollect = n;
    }
    static withCacheSize(t) {
        return new ur(t, ur.DEFAULT_COLLECTION_PERCENTILE, ur.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
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
 * Delete a mutation batch and the associated document mutations.
 * @returns A PersistencePromise of the document mutations that were removed.
 */
function cr(t, e, n) {
    const s = t.store("mutations"), i = t.store("documentMutations"), r = [], o = IDBKeyRange.only(n.batchId);
    let a = 0;
    const u = s.Wt({
        range: o
    }, ((t, e, n) => (a++, n.delete())));
    r.push(u.next((() => {
        q(1 === a);
    })));
    const c = [];
    for (const t of n.mutations) {
        const s = Ks(e, t.key.path, n.batchId);
        r.push(i.delete(s)), c.push(t.key);
    }
    return ui.waitFor(r).next((() => c));
}

/**
 * Returns an approximate size for the given document.
 */ function hr(t) {
    if (!t) return 0;
    let e;
    if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
        if (!t.noDocument) throw L();
        e = t.noDocument;
    }
    return JSON.stringify(e).length;
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
/** A mutation queue for a specific user, backed by IndexedDB. */ ur.DEFAULT_COLLECTION_PERCENTILE = 10, 
ur.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, ur.DEFAULT = new ur(41943040, ur.DEFAULT_COLLECTION_PERCENTILE, ur.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), 
ur.DISABLED = new ur(-1, 0, 0);

class lr {
    constructor(
    /**
     * The normalized userId (e.g. null UID => "" userId) used to store /
     * retrieve mutations.
     */
    t, e, n, s) {
        this.userId = t, this.M = e, this.indexManager = n, this.referenceDelegate = s, 
        /**
         * Caches the document keys for pending mutation batches. If the mutation
         * has been removed from IndexedDb, the cached value may continue to
         * be used to retrieve the batch's document keys. To remove a cached value
         * locally, `removeCachedMutationKeys()` should be invoked either directly
         * or through `removeMutationBatches()`.
         *
         * With multi-tab, when the primary client acknowledges or rejects a mutation,
         * this cache is used by secondary clients to invalidate the local
         * view of the documents that were previously affected by the mutation.
         */
        // PORTING NOTE: Multi-tab only.
        this.hn = {};
    }
    /**
     * Creates a new mutation queue for the given user.
     * @param user - The user for which to create a mutation queue.
     * @param serializer - The serializer to use when persisting to IndexedDb.
     */    static Yt(t, e, n, s) {
        // TODO(mcg): Figure out what constraints there are on userIDs
        // In particular, are there any reserved characters? are empty ids allowed?
        // For the moment store these together in the same mutations table assuming
        // that empty userIDs aren't allowed.
        q("" !== t.uid);
        const i = t.isAuthenticated() ? t.uid : "";
        return new lr(i, e, n, s);
    }
    checkEmpty(t) {
        let e = !0;
        const n = IDBKeyRange.bound([ this.userId, Number.NEGATIVE_INFINITY ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return dr(t).Wt({
            index: "userMutationsIndex",
            range: n
        }, ((t, n, s) => {
            e = !1, s.done();
        })).next((() => e));
    }
    addMutationBatch(t, e, n, s) {
        const i = _r(t), r = dr(t);
        // The IndexedDb implementation in Chrome (and Firefox) does not handle
        // compound indices that include auto-generated keys correctly. To ensure
        // that the index entry is added correctly in all browsers, we perform two
        // writes: The first write is used to retrieve the next auto-generated Batch
        // ID, and the second write populates the index and stores the actual
        // mutation batch.
        // See: https://bugs.chromium.org/p/chromium/issues/detail?id=701972
        // We write an empty object to obtain key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return r.add({}).next((o => {
            q("number" == typeof o);
            const a = new Ii(o, e, n, s), u = function(t, e, n) {
                const s = n.baseMutations.map((e => Ts(t.Jt, e))), i = n.mutations.map((e => Ts(t.Jt, e)));
                return {
                    userId: e,
                    batchId: n.batchId,
                    localWriteTimeMs: n.localWriteTime.toMillis(),
                    baseMutations: s,
                    mutations: i
                };
            }(this.M, this.userId, a), c = [];
            let h = new kn(((t, e) => rt(t.canonicalString(), e.canonicalString())));
            for (const t of s) {
                const e = Ks(this.userId, t.key.path, o);
                h = h.add(t.key.path.popLast()), c.push(r.put(u)), c.push(i.put(e, Gs));
            }
            return h.forEach((e => {
                c.push(this.indexManager.addToCollectionParentIndex(t, e));
            })), t.addOnCommittedListener((() => {
                this.hn[o] = a.keys();
            })), ui.waitFor(c).next((() => a));
        }));
    }
    lookupMutationBatch(t, e) {
        return dr(t).get(e).next((t => t ? (q(t.userId === this.userId), Ci(this.M, t)) : null));
    }
    /**
     * Returns the document keys for the mutation batch with the given batchId.
     * For primary clients, this method returns `null` after
     * `removeMutationBatches()` has been called. Secondary clients return a
     * cached result until `removeCachedMutationKeys()` is invoked.
     */
    // PORTING NOTE: Multi-tab only.
    ln(t, e) {
        return this.hn[e] ? ui.resolve(this.hn[e]) : this.lookupMutationBatch(t, e).next((t => {
            if (t) {
                const n = t.keys();
                return this.hn[e] = n, n;
            }
            return null;
        }));
    }
    getNextMutationBatchAfterBatchId(t, e) {
        const n = e + 1, s = IDBKeyRange.lowerBound([ this.userId, n ]);
        let i = null;
        return dr(t).Wt({
            index: "userMutationsIndex",
            range: s
        }, ((t, e, s) => {
            e.userId === this.userId && (q(e.batchId >= n), i = Ci(this.M, e)), s.done();
        })).next((() => i));
    }
    getHighestUnacknowledgedBatchId(t) {
        const e = IDBKeyRange.upperBound([ this.userId, Number.POSITIVE_INFINITY ]);
        let n = -1;
        return dr(t).Wt({
            index: "userMutationsIndex",
            range: e,
            reverse: !0
        }, ((t, e, s) => {
            n = e.batchId, s.done();
        })).next((() => n));
    }
    getAllMutationBatches(t) {
        const e = IDBKeyRange.bound([ this.userId, -1 ], [ this.userId, Number.POSITIVE_INFINITY ]);
        return dr(t).Ut("userMutationsIndex", e).next((t => t.map((t => Ci(this.M, t)))));
    }
    getAllMutationBatchesAffectingDocumentKey(t, e) {
        // Scan the document-mutation index starting with a prefix starting with
        // the given documentKey.
        const n = Us(this.userId, e.path), s = IDBKeyRange.lowerBound(n), i = [];
        return _r(t).Wt({
            range: s
        }, ((n, s, r) => {
            const [o, a, u] = n, c = Ls(a);
            // Only consider rows matching exactly the specific key of
            // interest. Note that because we order by path first, and we
            // order terminators before path separators, we'll encounter all
            // the index rows for documentKey contiguously. In particular, all
            // the rows for documentKey will occur before any rows for
            // documents nested in a subcollection beneath documentKey so we
            // can stop as soon as we hit any such row.
                        if (o === this.userId && e.path.isEqual(c)) 
            // Look up the mutation batch in the store.
            return dr(t).get(u).next((t => {
                if (!t) throw L();
                q(t.userId === this.userId), i.push(Ci(this.M, t));
            }));
            r.done();
        })).next((() => i));
    }
    getAllMutationBatchesAffectingDocumentKeys(t, e) {
        let n = new kn(rt);
        const s = [];
        return e.forEach((e => {
            const i = Us(this.userId, e.path), r = IDBKeyRange.lowerBound(i), o = _r(t).Wt({
                range: r
            }, ((t, s, i) => {
                const [r, o, a] = t, u = Ls(o);
                // Only consider rows matching exactly the specific key of
                // interest. Note that because we order by path first, and we
                // order terminators before path separators, we'll encounter all
                // the index rows for documentKey contiguously. In particular, all
                // the rows for documentKey will occur before any rows for
                // documents nested in a subcollection beneath documentKey so we
                // can stop as soon as we hit any such row.
                                r === this.userId && e.path.isEqual(u) ? n = n.add(a) : i.done();
            }));
            s.push(o);
        })), ui.waitFor(s).next((() => this.fn(t, n)));
    }
    getAllMutationBatchesAffectingQuery(t, e) {
        const n = e.path, s = n.length + 1, i = Us(this.userId, n), r = IDBKeyRange.lowerBound(i);
        // Collect up unique batchIDs encountered during a scan of the index. Use a
        // SortedSet to accumulate batch IDs so they can be traversed in order in a
        // scan of the main table.
        let o = new kn(rt);
        return _r(t).Wt({
            range: r
        }, ((t, e, i) => {
            const [r, a, u] = t, c = Ls(a);
            r === this.userId && n.isPrefixOf(c) ? 
            // Rows with document keys more than one segment longer than the
            // query path can't be matches. For example, a query on 'rooms'
            // can't match the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            c.length === s && (o = o.add(u)) : i.done();
        })).next((() => this.fn(t, o)));
    }
    fn(t, e) {
        const n = [], s = [];
        // TODO(rockwood): Implement this using iterate.
        return e.forEach((e => {
            s.push(dr(t).get(e).next((t => {
                if (null === t) throw L();
                q(t.userId === this.userId), n.push(Ci(this.M, t));
            })));
        })), ui.waitFor(s).next((() => n));
    }
    removeMutationBatch(t, e) {
        return cr(t.Ht, this.userId, e).next((n => (t.addOnCommittedListener((() => {
            this.dn(e.batchId);
        })), ui.forEach(n, (e => this.referenceDelegate.markPotentiallyOrphaned(t, e))))));
    }
    /**
     * Clears the cached keys for a mutation batch. This method should be
     * called by secondary clients after they process mutation updates.
     *
     * Note that this method does not have to be called from primary clients as
     * the corresponding cache entries are cleared when an acknowledged or
     * rejected batch is removed from the mutation queue.
     */
    // PORTING NOTE: Multi-tab only
    dn(t) {
        delete this.hn[t];
    }
    performConsistencyCheck(t) {
        return this.checkEmpty(t).next((e => {
            if (!e) return ui.resolve();
            // Verify that there are no entries in the documentMutations index if
            // the queue is empty.
                        const n = IDBKeyRange.lowerBound([ this.userId ]);
            const s = [];
            return _r(t).Wt({
                range: n
            }, ((t, e, n) => {
                if (t[0] === this.userId) {
                    const e = Ls(t[1]);
                    s.push(e);
                } else n.done();
            })).next((() => {
                q(0 === s.length);
            }));
        }));
    }
    containsKey(t, e) {
        return fr(t, this.userId, e);
    }
    // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
    /** Returns the mutation queue's metadata from IndexedDb. */
    _n(t) {
        return wr(t).get(this.userId).next((t => t || {
            userId: this.userId,
            lastAcknowledgedBatchId: -1,
            lastStreamToken: ""
        }));
    }
}

/**
 * @returns true if the mutation queue for the given user contains a pending
 *         mutation for the given key.
 */ function fr(t, e, n) {
    const s = Us(e, n.path), i = s[1], r = IDBKeyRange.lowerBound(s);
    let o = !1;
    return _r(t).Wt({
        range: r,
        jt: !0
    }, ((t, n, s) => {
        const [r, a, /*batchID*/ u] = t;
        r === e && a === i && (o = !0), s.done();
    })).next((() => o));
}

/** Returns true if any mutation queue contains the given document. */
/**
 * Helper to get a typed SimpleDbStore for the mutations object store.
 */
function dr(t) {
    return pi(t, "mutations");
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function _r(t) {
    return pi(t, "documentMutations");
}

/**
 * Helper to get a typed SimpleDbStore for the mutationQueues object store.
 */ function wr(t) {
    return pi(t, "mutationQueues");
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
/** Offset to ensure non-overlapping target ids. */
/**
 * Generates monotonically increasing target IDs for sending targets to the
 * watch stream.
 *
 * The client constructs two generators, one for the target cache, and one for
 * for the sync engine (to generate limbo documents targets). These
 * generators produce non-overlapping IDs (by using even and odd IDs
 * respectively).
 *
 * By separating the target ID space, the query cache can generate target IDs
 * that persist across client restarts, while sync engine can independently
 * generate in-memory target IDs that are transient and can be reused after a
 * restart.
 */
class mr {
    constructor(t) {
        this.wn = t;
    }
    next() {
        return this.wn += 2, this.wn;
    }
    static mn() {
        // The target cache generator must return '2' in its first call to `next()`
        // as there is no differentiation in the protocol layer between an unset
        // number and the number '0'. If we were to sent a target with target ID
        // '0', the backend would consider it unset and replace it with its own ID.
        return new mr(0);
    }
    static gn() {
        // Sync engine assigns target IDs for limbo document detection.
        return new mr(-1);
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
 */ class gr {
    constructor(t, e) {
        this.referenceDelegate = t, this.M = e;
    }
    // PORTING NOTE: We don't cache global metadata for the target cache, since
    // some of it (in particular `highestTargetId`) can be modified by secondary
    // tabs. We could perhaps be more granular (and e.g. still cache
    // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
    // to IndexedDb whenever we need to read metadata. We can revisit if it turns
    // out to have a meaningful performance impact.
    allocateTargetId(t) {
        return this.yn(t).next((e => {
            const n = new mr(e.highestTargetId);
            return e.highestTargetId = n.next(), this.pn(t, e).next((() => e.highestTargetId));
        }));
    }
    getLastRemoteSnapshotVersion(t) {
        return this.yn(t).next((t => ct.fromTimestamp(new ut(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds))));
    }
    getHighestSequenceNumber(t) {
        return this.yn(t).next((t => t.highestListenSequenceNumber));
    }
    setTargetsMetadata(t, e, n) {
        return this.yn(t).next((s => (s.highestListenSequenceNumber = e, n && (s.lastRemoteSnapshotVersion = n.toTimestamp()), 
        e > s.highestListenSequenceNumber && (s.highestListenSequenceNumber = e), this.pn(t, s))));
    }
    addTargetData(t, e) {
        return this.In(t, e).next((() => this.yn(t).next((n => (n.targetCount += 1, this.Tn(e, n), 
        this.pn(t, n))))));
    }
    updateTargetData(t, e) {
        return this.In(t, e);
    }
    removeTargetData(t, e) {
        return this.removeMatchingKeysForTargetId(t, e.targetId).next((() => yr(t).delete(e.targetId))).next((() => this.yn(t))).next((e => (q(e.targetCount > 0), 
        e.targetCount -= 1, this.pn(t, e))));
    }
    /**
     * Drops any targets with sequence number less than or equal to the upper bound, excepting those
     * present in `activeTargetIds`. Document associations for the removed targets are also removed.
     * Returns the number of targets removed.
     */    removeTargets(t, e, n) {
        let s = 0;
        const i = [];
        return yr(t).Wt(((r, o) => {
            const a = xi(o);
            a.sequenceNumber <= e && null === n.get(a.targetId) && (s++, i.push(this.removeTargetData(t, a)));
        })).next((() => ui.waitFor(i))).next((() => s));
    }
    /**
     * Call provided function with each `TargetData` that we have cached.
     */    forEachTarget(t, e) {
        return yr(t).Wt(((t, n) => {
            const s = xi(n);
            e(s);
        }));
    }
    yn(t) {
        return pr(t).get("targetGlobalKey").next((t => (q(null !== t), t)));
    }
    pn(t, e) {
        return pr(t).put("targetGlobalKey", e);
    }
    In(t, e) {
        return yr(t).put(Ni(this.M, e));
    }
    /**
     * In-place updates the provided metadata to account for values in the given
     * TargetData. Saving is done separately. Returns true if there were any
     * changes to the metadata.
     */    Tn(t, e) {
        let n = !1;
        return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), 
        t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, 
        n = !0), n;
    }
    getTargetCount(t) {
        return this.yn(t).next((t => t.targetCount));
    }
    getTargetData(t, e) {
        // Iterating by the canonicalId may yield more than one result because
        // canonicalId values are not required to be unique per target. This query
        // depends on the queryTargets index to be efficient.
        const n = ce(e), s = IDBKeyRange.bound([ n, Number.NEGATIVE_INFINITY ], [ n, Number.POSITIVE_INFINITY ]);
        let i = null;
        return yr(t).Wt({
            range: s,
            index: "queryTargetsIndex"
        }, ((t, n, s) => {
            const r = xi(n);
            // After finding a potential match, check that the target is
            // actually equal to the requested target.
                        le(e, r.target) && (i = r, s.done());
        })).next((() => i));
    }
    addMatchingKeys(t, e, n) {
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
        const s = [], i = Ir(t);
        return e.forEach((e => {
            const r = $s(e.path);
            s.push(i.put({
                targetId: n,
                path: r
            })), s.push(this.referenceDelegate.addReference(t, n, e));
        })), ui.waitFor(s);
    }
    removeMatchingKeys(t, e, n) {
        // PORTING NOTE: The reverse index (documentsTargets) is maintained by
        // IndexedDb.
        const s = Ir(t);
        return ui.forEach(e, (e => {
            const i = $s(e.path);
            return ui.waitFor([ s.delete([ n, i ]), this.referenceDelegate.removeReference(t, n, e) ]);
        }));
    }
    removeMatchingKeysForTargetId(t, e) {
        const n = Ir(t), s = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        return n.delete(s);
    }
    getMatchingKeysForTargetId(t, e) {
        const n = IDBKeyRange.bound([ e ], [ e + 1 ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0), s = Ir(t);
        let i = Gn();
        return s.Wt({
            range: n,
            jt: !0
        }, ((t, e, n) => {
            const s = Ls(t[1]), r = new xt(s);
            i = i.add(r);
        })).next((() => i));
    }
    containsKey(t, e) {
        const n = $s(e.path), s = IDBKeyRange.bound([ n ], [ at(n) ], 
        /*lowerOpen=*/ !1, 
        /*upperOpen=*/ !0);
        let i = 0;
        return Ir(t).Wt({
            index: "documentTargetsIndex",
            jt: !0,
            range: s
        }, (([t, e], n, s) => {
            // Having a sentinel row for a document does not count as containing that document;
            // For the target cache, containing the document means the document is part of some
            // target.
            0 !== t && (i++, s.done());
        })).next((() => i > 0));
    }
    /**
     * Looks up a TargetData entry by target ID.
     *
     * @param targetId - The target ID of the TargetData entry to look up.
     * @returns The cached TargetData entry, or null if the cache has no entry for
     * the target.
     */
    // PORTING NOTE: Multi-tab only.
    Et(t, e) {
        return yr(t).get(e).next((t => t ? xi(t) : null));
    }
}

/**
 * Helper to get a typed SimpleDbStore for the queries object store.
 */ function yr(t) {
    return pi(t, "targets");
}

/**
 * Helper to get a typed SimpleDbStore for the target globals object store.
 */ function pr(t) {
    return pi(t, "targetGlobal");
}

/**
 * Helper to get a typed SimpleDbStore for the document target object store.
 */ function Ir(t) {
    return pi(t, "targetDocuments");
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
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err - An error returned by a LocalStore operation.
 * @returns A Promise that resolves after we recovered, or the original error.
 */ async function Tr(t) {
    if (t.code !== G.FAILED_PRECONDITION || t.message !== oi) throw t;
    O("LocalStore", "Unexpectedly lost primary lease");
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
 */ function Er([t, e], [n, s]) {
    const i = rt(t, n);
    return 0 === i ? rt(e, s) : i;
}

/**
 * Used to calculate the nth sequence number. Keeps a rolling buffer of the
 * lowest n values passed to `addElement`, and finally reports the largest of
 * them in `maxValue`.
 */ class Ar {
    constructor(t) {
        this.En = t, this.buffer = new kn(Er), this.An = 0;
    }
    Rn() {
        return ++this.An;
    }
    bn(t) {
        const e = [ t, this.Rn() ];
        if (this.buffer.size < this.En) this.buffer = this.buffer.add(e); else {
            const t = this.buffer.last();
            Er(e, t) < 0 && (this.buffer = this.buffer.delete(t).add(e));
        }
    }
    get maxValue() {
        // Guaranteed to be non-empty. If we decide we are not collecting any
        // sequence numbers, nthSequenceNumber below short-circuits. If we have
        // decided that we are collecting n sequence numbers, it's because n is some
        // percentage of the existing sequence numbers. That means we should never
        // be in a situation where we are collecting sequence numbers but don't
        // actually have any.
        return this.buffer.last()[0];
    }
}

/**
 * This class is responsible for the scheduling of LRU garbage collection. It handles checking
 * whether or not GC is enabled, as well as which delay to use before the next run.
 */ class Rr {
    constructor(t, e) {
        this.garbageCollector = t, this.asyncQueue = e, this.Pn = !1, this.Vn = null;
    }
    start(t) {
        -1 !== this.garbageCollector.params.cacheSizeCollectionThreshold && this.vn(t);
    }
    stop() {
        this.Vn && (this.Vn.cancel(), this.Vn = null);
    }
    get started() {
        return null !== this.Vn;
    }
    vn(t) {
        const e = this.Pn ? 3e5 : 6e4;
        O("LruGarbageCollector", `Garbage collection scheduled in ${e}ms`), this.Vn = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection" /* LruGarbageCollection */ , e, (async () => {
            this.Vn = null, this.Pn = !0;
            try {
                await t.collectGarbage(this.garbageCollector);
            } catch (t) {
                di(t) ? O("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", t) : await Tr(t);
            }
            await this.vn(t);
        }));
    }
}

/** Implements the steps for LRU garbage collection. */ class br {
    constructor(t, e) {
        this.Sn = t, this.params = e;
    }
    calculateTargetCount(t, e) {
        return this.Sn.Dn(t).next((t => Math.floor(e / 100 * t)));
    }
    nthSequenceNumber(t, e) {
        if (0 === e) return ui.resolve(nt.A);
        const n = new Ar(e);
        return this.Sn.forEachTarget(t, (t => n.bn(t.sequenceNumber))).next((() => this.Sn.Cn(t, (t => n.bn(t))))).next((() => n.maxValue));
    }
    removeTargets(t, e, n) {
        return this.Sn.removeTargets(t, e, n);
    }
    removeOrphanedDocuments(t, e) {
        return this.Sn.removeOrphanedDocuments(t, e);
    }
    collect(t, e) {
        return -1 === this.params.cacheSizeCollectionThreshold ? (O("LruGarbageCollector", "Garbage collection skipped; disabled"), 
        ui.resolve(ar)) : this.getCacheSize(t).next((n => n < this.params.cacheSizeCollectionThreshold ? (O("LruGarbageCollector", `Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`), 
        ar) : this.xn(t, e)));
    }
    getCacheSize(t) {
        return this.Sn.getCacheSize(t);
    }
    xn(t, e) {
        let n, s, i, r, o, u, c;
        const h = Date.now();
        return this.calculateTargetCount(t, this.params.percentileToCollect).next((e => (
        // Cap at the configured max
        e > this.params.maximumSequenceNumbersToCollect ? (O("LruGarbageCollector", `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${e}`), 
        s = this.params.maximumSequenceNumbersToCollect) : s = e, r = Date.now(), this.nthSequenceNumber(t, s)))).next((s => (n = s, 
        o = Date.now(), this.removeTargets(t, n, e)))).next((e => (i = e, u = Date.now(), 
        this.removeOrphanedDocuments(t, n)))).next((t => {
            if (c = Date.now(), k() <= LogLevel.DEBUG) {
                O("LruGarbageCollector", `LRU Garbage Collection\n\tCounted targets in ${r - h}ms\n\tDetermined least recently used ${s} in ` + (o - r) + "ms\n" + `\tRemoved ${i} targets in ` + (u - o) + "ms\n" + `\tRemoved ${t} documents in ` + (c - u) + "ms\n" + `Total Duration: ${c - h}ms`);
            }
            return ui.resolve({
                didRun: !0,
                sequenceNumbersCollected: s,
                targetsRemoved: i,
                documentsRemoved: t
            });
        }));
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
/** Provides LRU functionality for IndexedDB persistence. */
class Pr {
    constructor(t, e) {
        this.db = t, this.garbageCollector = function(t, e) {
            return new br(t, e);
        }(this, e);
    }
    Dn(t) {
        const e = this.Nn(t);
        return this.db.getTargetCache().getTargetCount(t).next((t => e.next((e => t + e))));
    }
    Nn(t) {
        let e = 0;
        return this.Cn(t, (t => {
            e++;
        })).next((() => e));
    }
    forEachTarget(t, e) {
        return this.db.getTargetCache().forEachTarget(t, e);
    }
    Cn(t, e) {
        return this.kn(t, ((t, n) => e(n)));
    }
    addReference(t, e, n) {
        return Vr(t, n);
    }
    removeReference(t, e, n) {
        return Vr(t, n);
    }
    removeTargets(t, e, n) {
        return this.db.getTargetCache().removeTargets(t, e, n);
    }
    markPotentiallyOrphaned(t, e) {
        return Vr(t, e);
    }
    /**
     * Returns true if anything would prevent this document from being garbage
     * collected, given that the document in question is not present in any
     * targets and has a sequence number less than or equal to the upper bound for
     * the collection run.
     */    Mn(t, e) {
        return function(t, e) {
            let n = !1;
            return wr(t).zt((s => fr(t, s, e).next((t => (t && (n = !0), ui.resolve(!t)))))).next((() => n));
        }(t, e);
    }
    removeOrphanedDocuments(t, e) {
        const n = this.db.getRemoteDocumentCache().newChangeBuffer(), s = [];
        let i = 0;
        return this.kn(t, ((r, o) => {
            if (o <= e) {
                const e = this.Mn(t, r).next((e => {
                    if (!e) 
                    // Our size accounting requires us to read all documents before
                    // removing them.
                    return i++, n.getEntry(t, r).next((() => (n.removeEntry(r, ct.min()), Ir(t).delete([ 0, $s(r.path) ]))));
                }));
                s.push(e);
            }
        })).next((() => ui.waitFor(s))).next((() => n.apply(t))).next((() => i));
    }
    removeTarget(t, e) {
        const n = e.withSequenceNumber(t.currentSequenceNumber);
        return this.db.getTargetCache().updateTargetData(t, n);
    }
    updateLimboDocument(t, e) {
        return Vr(t, e);
    }
    /**
     * Call provided function for each document in the cache that is 'orphaned'. Orphaned
     * means not a part of any target, so the only entry in the target-document index for
     * that document will be the sentinel row (targetId 0), which will also have the sequence
     * number for the last time the document was accessed.
     */    kn(t, e) {
        const n = Ir(t);
        let s, i = nt.A;
        return n.Wt({
            index: "documentTargetsIndex"
        }, (([t, n], {path: r, sequenceNumber: o}) => {
            0 === t ? (
            // if nextToReport is valid, report it, this is a new key so the
            // last one must not be a member of any targets.
            i !== nt.A && e(new xt(Ls(s)), i), 
            // set nextToReport to be this sequence number. It's the next one we
            // might report, if we don't find any targets for this document.
            // Note that the sequence number must be defined when the targetId
            // is 0.
            i = o, s = r) : 
            // set nextToReport to be invalid, we know we don't need to report
            // this one since we found a target for it.
            i = nt.A;
        })).next((() => {
            // Since we report sequence numbers after getting to the next key, we
            // need to check if the last key we iterated over was an orphaned
            // document and report it.
            i !== nt.A && e(new xt(Ls(s)), i);
        }));
    }
    getCacheSize(t) {
        return this.db.getRemoteDocumentCache().getSize(t);
    }
}

function Vr(t, e) {
    return Ir(t).put(
    /**
 * @returns A value suitable for writing a sentinel row in the target-document
 * store.
 */
    function(t, e) {
        return {
            targetId: 0,
            path: $s(t.path),
            sequenceNumber: e
        };
    }(e, t.currentSequenceNumber));
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
 * An in-memory buffer of entries to be written to a RemoteDocumentCache.
 * It can be used to batch up a set of changes to be written to the cache, but
 * additionally supports reading entries back with the `getEntry()` method,
 * falling back to the underlying RemoteDocumentCache if no entry is
 * buffered.
 *
 * Entries added to the cache *must* be read first. This is to facilitate
 * calculating the size delta of the pending changes.
 *
 * PORTING NOTE: This class was implemented then removed from other platforms.
 * If byte-counting ends up being needed on the other platforms, consider
 * porting this class as part of that implementation work.
 */ class vr {
    constructor() {
        // A mapping of document key to the new cache entry that should be written.
        this.changes = new Dn((t => t.toString()), ((t, e) => t.isEqual(e))), this.changesApplied = !1;
    }
    /**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */    addEntry(t) {
        this.assertNotApplied(), this.changes.set(t.key, t);
    }
    /**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */    removeEntry(t, e) {
        this.assertNotApplied(), this.changes.set(t, te.newInvalidDocument(t).setReadTime(e));
    }
    /**
     * Looks up an entry in the cache. The buffered changes will first be checked,
     * and if no buffered change applies, this will forward to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document or an invalid document if we have nothing
     * cached.
     */    getEntry(t, e) {
        this.assertNotApplied();
        const n = this.changes.get(e);
        return void 0 !== n ? ui.resolve(n) : this.getFromCache(t, e);
    }
    /**
     * Looks up several entries in the cache, forwarding to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKeys - The keys of the entries to look up.
     * @returns A map of cached documents, indexed by key. If an entry cannot be
     *     found, the corresponding key will be mapped to an invalid document.
     */    getEntries(t, e) {
        return this.getAllFromCache(t, e);
    }
    /**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */    apply(t) {
        return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(t);
    }
    /** Helper to assert this.changes is not null  */    assertNotApplied() {}
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
 * The RemoteDocumentCache for IndexedDb. To construct, invoke
 * `newIndexedDbRemoteDocumentCache()`.
 */ class Sr {
    constructor(t) {
        this.M = t;
    }
    setIndexManager(t) {
        this.indexManager = t;
    }
    /**
     * Adds the supplied entries to the cache.
     *
     * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */    addEntry(t, e, n) {
        return xr(t).put(Nr(e), n);
    }
    /**
     * Removes a document from the cache.
     *
     * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
     */    removeEntry(t, e) {
        const n = xr(t), s = Nr(e);
        return n.delete(s);
    }
    /**
     * Updates the current cache size.
     *
     * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
     * cache's metadata.
     */    updateMetadata(t, e) {
        return this.getMetadata(t).next((n => (n.byteSize += e, this.On(t, n))));
    }
    getEntry(t, e) {
        return xr(t).get(Nr(e)).next((t => this.$n(e, t)));
    }
    /**
     * Looks up an entry in the cache.
     *
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document entry and its size.
     */    Fn(t, e) {
        return xr(t).get(Nr(e)).next((t => ({
            document: this.$n(e, t),
            size: hr(t)
        })));
    }
    getEntries(t, e) {
        let n = Fn();
        return this.Bn(t, e, ((t, e) => {
            const s = this.$n(t, e);
            n = n.insert(t, s);
        })).next((() => n));
    }
    /**
     * Looks up several entries in the cache.
     *
     * @param documentKeys - The set of keys entries to look up.
     * @returns A map of documents indexed by key and a map of sizes indexed by
     *     key (zero if the document does not exist).
     */    Ln(t, e) {
        let n = Fn(), s = new Cn(xt.comparator);
        return this.Bn(t, e, ((t, e) => {
            const i = this.$n(t, e);
            n = n.insert(t, i), s = s.insert(t, hr(e));
        })).next((() => ({
            documents: n,
            qn: s
        })));
    }
    Bn(t, e, n) {
        if (e.isEmpty()) return ui.resolve();
        const s = IDBKeyRange.bound(e.first().path.toArray(), e.last().path.toArray()), i = e.getIterator();
        let r = i.getNext();
        return xr(t).Wt({
            range: s
        }, ((t, e, s) => {
            const o = xt.fromSegments(t);
            // Go through keys not found in cache.
                        for (;r && xt.comparator(r, o) < 0; ) n(r, null), r = i.getNext();
            r && r.isEqual(o) && (
            // Key found in cache.
            n(r, e), r = i.hasNext() ? i.getNext() : null), 
            // Skip to the next key (if there is one).
            r ? s.qt(r.path.toArray()) : s.done();
        })).next((() => {
            // The rest of the keys are not in the cache. One case where `iterate`
            // above won't go through them is when the cache is empty.
            for (;r; ) n(r, null), r = i.hasNext() ? i.getNext() : null;
        }));
    }
    getAll(t, e, n) {
        let s = Fn();
        const i = e.length + 1, r = {};
        if (n.isEqual(ct.min())) {
            // Documents are ordered by key, so we can use a prefix scan to narrow
            // down the documents we need to match the query against.
            const t = e.toArray();
            r.range = IDBKeyRange.lowerBound(t);
        } else {
            // Execute an index-free query and filter by read time. This is safe
            // since all document changes to queries that have a
            // lastLimboFreeSnapshotVersion (`sinceReadTime`) have a read time set.
            const t = e.toArray(), s = Vi(n);
            r.range = IDBKeyRange.lowerBound([ t, s ], 
            /* open= */ !0), r.index = "collectionReadTimeIndex";
        }
        return xr(t).Wt(r, ((t, n, r) => {
            // The query is actually returning any path that starts with the query
            // path prefix which may include documents in subcollections. For
            // example, a query on 'rooms' will return rooms/abc/messages/xyx but we
            // shouldn't match it. Fix this by discarding rows with document keys
            // more than one segment longer than the query path.
            if (t.length !== i) return;
            const o = this.$n(xt.fromSegments(t), n);
            e.isPrefixOf(o.key.path) ? s = s.insert(o.key, o) : r.done();
        })).next((() => s));
    }
    newChangeBuffer(t) {
        return new Dr(this, !!t && t.trackRemovals);
    }
    getSize(t) {
        return this.getMetadata(t).next((t => t.byteSize));
    }
    getMetadata(t) {
        return Cr(t).get("remoteDocumentGlobalKey").next((t => (q(!!t), t)));
    }
    On(t, e) {
        return Cr(t).put("remoteDocumentGlobalKey", e);
    }
    /**
     * Decodes `dbRemoteDoc` and returns the document (or an invalid document if
     * the document corresponds to the format used for sentinel deletes).
     */    $n(t, e) {
        if (e) {
            const t = bi(this.M, e);
            // Whether the document is a sentinel removal and should only be used in the
            // `getNewDocumentChanges()`
                        if (!(t.isNoDocument() && t.version.isEqual(ct.min()))) return t;
        }
        return te.newInvalidDocument(t);
    }
}

/** Creates a new IndexedDbRemoteDocumentCache. */
/**
 * Handles the details of adding and updating documents in the IndexedDbRemoteDocumentCache.
 *
 * Unlike the MemoryRemoteDocumentChangeBuffer, the IndexedDb implementation computes the size
 * delta for all submitted changes. This avoids having to re-read all documents from IndexedDb
 * when we apply the changes.
 */
class Dr extends vr {
    /**
     * @param documentCache - The IndexedDbRemoteDocumentCache to apply the changes to.
     * @param trackRemovals - Whether to create sentinel deletes that can be tracked by
     * `getNewDocumentChanges()`.
     */
    constructor(t, e) {
        super(), this.Un = t, this.trackRemovals = e, 
        // A map of document sizes prior to applying the changes in this buffer.
        this.Kn = new Dn((t => t.toString()), ((t, e) => t.isEqual(e)));
    }
    applyChanges(t) {
        const e = [];
        let n = 0, s = new kn(((t, e) => rt(t.canonicalString(), e.canonicalString())));
        return this.changes.forEach(((i, r) => {
            const o = this.Kn.get(i);
            if (r.isValidDocument()) {
                const a = Pi(this.Un.M, r);
                s = s.add(i.path.popLast());
                const u = hr(a);
                n += u - o, e.push(this.Un.addEntry(t, i, a));
            } else if (n -= o, this.trackRemovals) {
                // In order to track removals, we store a "sentinel delete" in the
                // RemoteDocumentCache. This entry is represented by a NoDocument
                // with a version of 0 and ignored by `maybeDecodeDocument()` but
                // preserved in `getNewDocumentChanges()`.
                const n = Pi(this.Un.M, r.convertToNoDocument(ct.min()));
                e.push(this.Un.addEntry(t, i, n));
            } else e.push(this.Un.removeEntry(t, i));
        })), s.forEach((n => {
            e.push(this.Un.indexManager.addToCollectionParentIndex(t, n));
        })), e.push(this.Un.updateMetadata(t, n)), ui.waitFor(e);
    }
    getFromCache(t, e) {
        // Record the size of everything we load from the cache so we can compute a delta later.
        return this.Un.Fn(t, e).next((t => (this.Kn.set(e, t.size), t.document)));
    }
    getAllFromCache(t, e) {
        // Record the size of everything we load from the cache so we can compute
        // a delta later.
        return this.Un.Ln(t, e).next((({documents: t, qn: e}) => (
        // Note: `getAllFromCache` returns two maps instead of a single map from
        // keys to `DocumentSizeEntry`s. This is to allow returning the
        // `MutableDocumentMap` directly, without a conversion.
        e.forEach(((t, e) => {
            this.Kn.set(t, e);
        })), t)));
    }
}

function Cr(t) {
    return pi(t, "remoteDocumentGlobal");
}

/**
 * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
 */ function xr(t) {
    return pi(t, "remoteDocuments");
}

function Nr(t) {
    return t.path.toArray();
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
// TODO(indexing): Remove this constant
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
/** Performs database creation and schema upgrades. */
class kr {
    constructor(t) {
        this.M = t;
    }
    /**
     * Performs database creation and schema upgrades.
     *
     * Note that in production, this method is only ever used to upgrade the schema
     * to SCHEMA_VERSION. Different values of toVersion are only used for testing
     * and local feature development.
     */    kt(t, e, n, s) {
        const i = new ci("createOrUpgrade", e);
        n < 1 && s >= 1 && (function(t) {
            t.createObjectStore("owner");
        }(t), function(t) {
            t.createObjectStore("mutationQueues", {
                keyPath: "userId"
            });
            t.createObjectStore("mutations", {
                keyPath: "batchId",
                autoIncrement: !0
            }).createIndex("userMutationsIndex", qs, {
                unique: !0
            }), t.createObjectStore("documentMutations");
        }
        /**
 * Upgrade function to migrate the 'mutations' store from V1 to V3. Loads
 * and rewrites all data.
 */ (t), Mr(t), function(t) {
            t.createObjectStore("remoteDocuments");
        }(t));
        // Migration 2 to populate the targetGlobal object no longer needed since
        // migration 3 unconditionally clears it.
                let r = ui.resolve();
        return n < 3 && s >= 3 && (
        // Brand new clients don't need to drop and recreate--only clients that
        // potentially have corrupt data.
        0 !== n && (!function(t) {
            t.deleteObjectStore("targetDocuments"), t.deleteObjectStore("targets"), t.deleteObjectStore("targetGlobal");
        }(t), Mr(t)), r = r.next((() => 
        /**
 * Creates the target global singleton row.
 *
 * @param txn - The version upgrade transaction for indexeddb
 */
        function(t) {
            const e = t.store("targetGlobal"), n = {
                highestTargetId: 0,
                highestListenSequenceNumber: 0,
                lastRemoteSnapshotVersion: ct.min().toTimestamp(),
                targetCount: 0
            };
            return e.put("targetGlobalKey", n);
        }
        /**
 * Creates indices on the RemoteDocuments store used for both multi-tab
 * and Index-Free queries.
 */ (i)))), n < 4 && s >= 4 && (0 !== n && (
        // Schema version 3 uses auto-generated keys to generate globally unique
        // mutation batch IDs (this was previously ensured internally by the
        // client). To migrate to the new schema, we have to read all mutations
        // and write them back out. We preserve the existing batch IDs to guarantee
        // consistency with other object stores. Any further mutation batch IDs will
        // be auto-generated.
        r = r.next((() => function(t, e) {
            return e.store("mutations").Ut().next((n => {
                t.deleteObjectStore("mutations");
                t.createObjectStore("mutations", {
                    keyPath: "batchId",
                    autoIncrement: !0
                }).createIndex("userMutationsIndex", qs, {
                    unique: !0
                });
                const s = e.store("mutations"), i = n.map((t => s.put(t)));
                return ui.waitFor(i);
            }));
        }(t, i)))), r = r.next((() => {
            !function(t) {
                t.createObjectStore("clientMetadata", {
                    keyPath: "clientId"
                });
            }(t);
        }))), n < 5 && s >= 5 && (r = r.next((() => this.Gn(i)))), n < 6 && s >= 6 && (r = r.next((() => (function(t) {
            t.createObjectStore("remoteDocumentGlobal");
        }(t), this.Qn(i))))), n < 7 && s >= 7 && (r = r.next((() => this.jn(i)))), n < 8 && s >= 8 && (r = r.next((() => this.Wn(t, i)))), 
        n < 9 && s >= 9 && (r = r.next((() => {
            // Multi-Tab used to manage its own changelog, but this has been moved
            // to the DbRemoteDocument object store itself. Since the previous change
            // log only contained transient data, we can drop its object store.
            !function(t) {
                t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges");
            }(t), function(t) {
                const e = t.objectStore("remoteDocuments");
                e.createIndex("readTimeIndex", "readTime", {
                    unique: !1
                }), e.createIndex("collectionReadTimeIndex", Qs, {
                    unique: !1
                });
            }(e);
        }))), n < 10 && s >= 10 && (r = r.next((() => this.zn(i)))), n < 11 && s >= 11 && (r = r.next((() => {
            !function(t) {
                t.createObjectStore("bundles", {
                    keyPath: "bundleId"
                });
            }(t), function(t) {
                t.createObjectStore("namedQueries", {
                    keyPath: "name"
                });
            }(t);
        }))), n < 12 && s >= 12 && (r = r.next((() => {
            !function(t) {
                const e = t.createObjectStore("documentOverlays", {
                    keyPath: ti
                });
                e.createIndex("collectionPathOverlayIndex", ei, {
                    unique: !1
                }), e.createIndex("collectionGroupOverlayIndex", ni, {
                    unique: !1
                });
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
 */ (t);
        }))), n < 13 && s >= 13 && (r = r.next((() => {
            !function(t) {
                t.createObjectStore("indexConfiguration", {
                    keyPath: "indexId",
                    autoIncrement: !0
                }).createIndex("collectionGroupIndex", "collectionGroup", {
                    unique: !1
                });
                t.createObjectStore("indexState", {
                    keyPath: Js
                }).createIndex("sequenceNumberIndex", Ys, {
                    unique: !1
                });
                t.createObjectStore("indexEntries", {
                    keyPath: Xs
                }).createIndex("documentKeyIndex", Zs, {
                    unique: !1
                });
            }(t);
        }))), r;
    }
    Qn(t) {
        let e = 0;
        return t.store("remoteDocuments").Wt(((t, n) => {
            e += hr(n);
        })).next((() => {
            const n = {
                byteSize: e
            };
            return t.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey", n);
        }));
    }
    Gn(t) {
        const e = t.store("mutationQueues"), n = t.store("mutations");
        return e.Ut().next((e => ui.forEach(e, (e => {
            const s = IDBKeyRange.bound([ e.userId, -1 ], [ e.userId, e.lastAcknowledgedBatchId ]);
            return n.Ut("userMutationsIndex", s).next((n => ui.forEach(n, (n => {
                q(n.userId === e.userId);
                const s = Ci(this.M, n);
                return cr(t, e.userId, s).next((() => {}));
            }))));
        }))));
    }
    /**
     * Ensures that every document in the remote document cache has a corresponding sentinel row
     * with a sequence number. Missing rows are given the most recently used sequence number.
     */    jn(t) {
        const e = t.store("targetDocuments"), n = t.store("remoteDocuments");
        return t.store("targetGlobal").get("targetGlobalKey").next((t => {
            const s = [];
            return n.Wt(((n, i) => {
                const r = new _t(n), o = function(t) {
                    return [ 0, $s(t) ];
                }(r);
                s.push(e.get(o).next((n => n ? ui.resolve() : (n => e.put({
                    targetId: 0,
                    path: $s(n),
                    sequenceNumber: t.highestListenSequenceNumber
                }))(r))));
            })).next((() => ui.waitFor(s)));
        }));
    }
    Wn(t, e) {
        // Create the index.
        t.createObjectStore("collectionParents", {
            keyPath: Hs
        });
        const n = e.store("collectionParents"), s = new tr, i = t => {
            if (s.add(t)) {
                const e = t.lastSegment(), s = t.popLast();
                return n.put({
                    collectionId: e,
                    parent: $s(s)
                });
            }
        };
        // Helper to add an index entry iff we haven't already written it.
                // Index existing remote documents.
        return e.store("remoteDocuments").Wt({
            jt: !0
        }, ((t, e) => {
            const n = new _t(t);
            return i(n.popLast());
        })).next((() => e.store("documentMutations").Wt({
            jt: !0
        }, (([t, e, n], s) => {
            const r = Ls(e);
            return i(r.popLast());
        }))));
    }
    zn(t) {
        const e = t.store("targets");
        return e.Wt(((t, n) => {
            const s = xi(n), i = Ni(this.M, s);
            return e.put(i);
        }));
    }
}

function Mr(t) {
    t.createObjectStore("targetDocuments", {
        keyPath: Ws
    }).createIndex("documentTargetsIndex", zs, {
        unique: !0
    });
    // NOTE: This is unique only because the TargetId is the suffix.
    t.createObjectStore("targets", {
        keyPath: "targetId"
    }).createIndex("queryTargetsIndex", js, {
        unique: !0
    }), t.createObjectStore("targetGlobal");
}

const Or = "Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";

/**
 * Oldest acceptable age in milliseconds for client metadata before the client
 * is considered inactive and its associated data is garbage collected.
 */
/**
 * An IndexedDB-backed instance of Persistence. Data is stored persistently
 * across sessions.
 *
 * On Web only, the Firestore SDKs support shared access to its persistence
 * layer. This allows multiple browser tabs to read and write to IndexedDb and
 * to synchronize state even without network connectivity. Shared access is
 * currently optional and not enabled unless all clients invoke
 * `enablePersistence()` with `{synchronizeTabs:true}`.
 *
 * In multi-tab mode, if multiple clients are active at the same time, the SDK
 * will designate one client as the “primary client”. An effort is made to pick
 * a visible, network-connected and active client, and this client is
 * responsible for letting other clients know about its presence. The primary
 * client writes a unique client-generated identifier (the client ID) to
 * IndexedDb’s “owner” store every 4 seconds. If the primary client fails to
 * update this entry, another client can acquire the lease and take over as
 * primary.
 *
 * Some persistence operations in the SDK are designated as primary-client only
 * operations. This includes the acknowledgment of mutations and all updates of
 * remote documents. The effects of these operations are written to persistence
 * and then broadcast to other tabs via LocalStorage (see
 * `WebStorageSharedClientState`), which then refresh their state from
 * persistence.
 *
 * Similarly, the primary client listens to notifications sent by secondary
 * clients to discover persistence changes written by secondary clients, such as
 * the addition of new mutations and query targets.
 *
 * If multi-tab is not enabled and another tab already obtained the primary
 * lease, IndexedDbPersistence enters a failed state and all subsequent
 * operations will automatically fail.
 *
 * Additionally, there is an optimization so that when a tab is closed, the
 * primary lease is released immediately (this is especially important to make
 * sure that a refreshed tab is able to immediately re-acquire the primary
 * lease). Unfortunately, IndexedDB cannot be reliably used in window.unload
 * since it is an asynchronous API. So in addition to attempting to give up the
 * lease, the leaseholder writes its client ID to a "zombiedClient" entry in
 * LocalStorage which acts as an indicator that another tab should go ahead and
 * take the primary lease immediately regardless of the current lease timestamp.
 *
 * TODO(b/114226234): Remove `synchronizeTabs` section when multi-tab is no
 * longer optional.
 */
class $r {
    constructor(
    /**
     * Whether to synchronize the in-memory state of multiple tabs and share
     * access to local persistence.
     */
    t, e, n, s, i, r, o, a, u, 
    /**
     * If set to true, forcefully obtains database access. Existing tabs will
     * no longer be able to access IndexedDB.
     */
    c, h = 12) {
        if (this.allowTabSynchronization = t, this.persistenceKey = e, this.clientId = n, 
        this.Hn = i, this.window = r, this.document = o, this.Jn = u, this.Yn = c, this.Xn = h, 
        this.Zn = null, this.ts = !1, this.isPrimary = !1, this.networkEnabled = !0, 
        /** Our window.unload handler, if registered. */
        this.es = null, this.inForeground = !1, 
        /** Our 'visibilitychange' listener if registered. */
        this.ns = null, 
        /** The client metadata refresh task. */
        this.ss = null, 
        /** The last time we garbage collected the client metadata object store. */
        this.rs = Number.NEGATIVE_INFINITY, 
        /** A listener to notify on primary state changes. */
        this.os = t => Promise.resolve(), !$r.vt()) throw new Q(G.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
        this.referenceDelegate = new Pr(this, s), this.us = e + "main", this.M = new Ri(a), 
        this.cs = new hi(this.us, this.Xn, new kr(this.M)), this.hs = new gr(this.referenceDelegate, this.M), 
        this.ls = function(t) {
            return new Sr(t);
        }
        /**
 * Returns the set of documents that have changed since the specified read
 * time.
 */
        // PORTING NOTE: This is only used for multi-tab synchronization.
        (this.M), this.fs = new $i, this.window && this.window.localStorage ? this.ds = this.window.localStorage : (this.ds = null, 
        !1 === c && $("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."));
    }
    /**
     * Attempt to start IndexedDb persistence.
     *
     * @returns Whether persistence was enabled.
     */    start() {
        // NOTE: This is expected to fail sometimes (in the case of another tab
        // already having the persistence lock), so it's the first thing we should
        // do.
        return this._s().then((() => {
            if (!this.isPrimary && !this.allowTabSynchronization) 
            // Fail `start()` if `synchronizeTabs` is disabled and we cannot
            // obtain the primary lease.
            throw new Q(G.FAILED_PRECONDITION, Or);
            return this.ws(), this.gs(), this.ys(), this.runTransaction("getHighestListenSequenceNumber", "readonly", (t => this.hs.getHighestSequenceNumber(t)));
        })).then((t => {
            this.Zn = new nt(t, this.Jn);
        })).then((() => {
            this.ts = !0;
        })).catch((t => (this.cs && this.cs.close(), Promise.reject(t))));
    }
    /**
     * Registers a listener that gets called when the primary state of the
     * instance changes. Upon registering, this listener is invoked immediately
     * with the current primary state.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */    ps(t) {
        return this.os = async e => {
            if (this.started) return t(e);
        }, t(this.isPrimary);
    }
    /**
     * Registers a listener that gets called when the database receives a
     * version change event indicating that it has deleted.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */    setDatabaseDeletedListener(t) {
        this.cs.Ot((async e => {
            // Check if an attempt is made to delete IndexedDB.
            null === e.newVersion && await t();
        }));
    }
    /**
     * Adjusts the current network state in the client's metadata, potentially
     * affecting the primary lease.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */    setNetworkEnabled(t) {
        this.networkEnabled !== t && (this.networkEnabled = t, 
        // Schedule a primary lease refresh for immediate execution. The eventual
        // lease update will be propagated via `primaryStateListener`.
        this.Hn.enqueueAndForget((async () => {
            this.started && await this._s();
        })));
    }
    /**
     * Updates the client metadata in IndexedDb and attempts to either obtain or
     * extend the primary lease for the local client. Asynchronously notifies the
     * primary state listener if the client either newly obtained or released its
     * primary lease.
     */    _s() {
        return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", (t => Br(t).put({
            clientId: this.clientId,
            updateTimeMs: Date.now(),
            networkEnabled: this.networkEnabled,
            inForeground: this.inForeground
        }).next((() => {
            if (this.isPrimary) return this.Is(t).next((t => {
                t || (this.isPrimary = !1, this.Hn.enqueueRetryable((() => this.os(!1))));
            }));
        })).next((() => this.Ts(t))).next((e => this.isPrimary && !e ? this.Es(t).next((() => !1)) : !!e && this.As(t).next((() => !0)))))).catch((t => {
            if (di(t)) 
            // Proceed with the existing state. Any subsequent access to
            // IndexedDB will verify the lease.
            return O("IndexedDbPersistence", "Failed to extend owner lease: ", t), this.isPrimary;
            if (!this.allowTabSynchronization) throw t;
            return O("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", t), 
            /* isPrimary= */ !1;
        })).then((t => {
            this.isPrimary !== t && this.Hn.enqueueRetryable((() => this.os(t))), this.isPrimary = t;
        }));
    }
    Is(t) {
        return Fr(t).get("owner").next((t => ui.resolve(this.Rs(t))));
    }
    bs(t) {
        return Br(t).delete(this.clientId);
    }
    /**
     * If the garbage collection threshold has passed, prunes the
     * RemoteDocumentChanges and the ClientMetadata store based on the last update
     * time of all clients.
     */    async Ps() {
        if (this.isPrimary && !this.Vs(this.rs, 18e5)) {
            this.rs = Date.now();
            const t = await this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", (t => {
                const e = pi(t, "clientMetadata");
                return e.Ut().next((t => {
                    const n = this.vs(t, 18e5), s = t.filter((t => -1 === n.indexOf(t)));
                    // Delete metadata for clients that are no longer considered active.
                    return ui.forEach(s, (t => e.delete(t.clientId))).next((() => s));
                }));
            })).catch((() => []));
            // Delete potential leftover entries that may continue to mark the
            // inactive clients as zombied in LocalStorage.
            // Ideally we'd delete the IndexedDb and LocalStorage zombie entries for
            // the client atomically, but we can't. So we opt to delete the IndexedDb
            // entries first to avoid potentially reviving a zombied client.
                        if (this.ds) for (const e of t) this.ds.removeItem(this.Ss(e.clientId));
        }
    }
    /**
     * Schedules a recurring timer to update the client metadata and to either
     * extend or acquire the primary lease if the client is eligible.
     */    ys() {
        this.ss = this.Hn.enqueueAfterDelay("client_metadata_refresh" /* ClientMetadataRefresh */ , 4e3, (() => this._s().then((() => this.Ps())).then((() => this.ys()))));
    }
    /** Checks whether `client` is the local client. */    Rs(t) {
        return !!t && t.ownerId === this.clientId;
    }
    /**
     * Evaluate the state of all active clients and determine whether the local
     * client is or can act as the holder of the primary lease. Returns whether
     * the client is eligible for the lease, but does not actually acquire it.
     * May return 'false' even if there is no active leaseholder and another
     * (foreground) client should become leaseholder instead.
     */    Ts(t) {
        if (this.Yn) return ui.resolve(!0);
        return Fr(t).get("owner").next((e => {
            // A client is eligible for the primary lease if:
            // - its network is enabled and the client's tab is in the foreground.
            // - its network is enabled and no other client's tab is in the
            //   foreground.
            // - every clients network is disabled and the client's tab is in the
            //   foreground.
            // - every clients network is disabled and no other client's tab is in
            //   the foreground.
            // - the `forceOwningTab` setting was passed in.
            if (null !== e && this.Vs(e.leaseTimestampMs, 5e3) && !this.Ds(e.ownerId)) {
                if (this.Rs(e) && this.networkEnabled) return !0;
                if (!this.Rs(e)) {
                    if (!e.allowTabSynchronization) 
                    // Fail the `canActAsPrimary` check if the current leaseholder has
                    // not opted into multi-tab synchronization. If this happens at
                    // client startup, we reject the Promise returned by
                    // `enablePersistence()` and the user can continue to use Firestore
                    // with in-memory persistence.
                    // If this fails during a lease refresh, we will instead block the
                    // AsyncQueue from executing further operations. Note that this is
                    // acceptable since mixing & matching different `synchronizeTabs`
                    // settings is not supported.
                    // TODO(b/114226234): Remove this check when `synchronizeTabs` can
                    // no longer be turned off.
                    throw new Q(G.FAILED_PRECONDITION, Or);
                    return !1;
                }
            }
            return !(!this.networkEnabled || !this.inForeground) || Br(t).Ut().next((t => void 0 === this.vs(t, 5e3).find((t => {
                if (this.clientId !== t.clientId) {
                    const e = !this.networkEnabled && t.networkEnabled, n = !this.inForeground && t.inForeground, s = this.networkEnabled === t.networkEnabled;
                    if (e || n && s) return !0;
                }
                return !1;
            }))));
        })).next((t => (this.isPrimary !== t && O("IndexedDbPersistence", `Client ${t ? "is" : "is not"} eligible for a primary lease.`), 
        t)));
    }
    async shutdown() {
        // The shutdown() operations are idempotent and can be called even when
        // start() aborted (e.g. because it couldn't acquire the persistence lease).
        this.ts = !1, this.Cs(), this.ss && (this.ss.cancel(), this.ss = null), this.xs(), 
        this.Ns(), 
        // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
        // has obtained the primary lease.
        await this.cs.runTransaction("shutdown", "readwrite", [ "owner", "clientMetadata" ], (t => {
            const e = new yi(t, nt.A);
            return this.Es(e).next((() => this.bs(e)));
        })), this.cs.close(), 
        // Remove the entry marking the client as zombied from LocalStorage since
        // we successfully deleted its metadata from IndexedDb.
        this.ks();
    }
    /**
     * Returns clients that are not zombied and have an updateTime within the
     * provided threshold.
     */    vs(t, e) {
        return t.filter((t => this.Vs(t.updateTimeMs, e) && !this.Ds(t.clientId)));
    }
    /**
     * Returns the IDs of the clients that are currently active. If multi-tab
     * is not supported, returns an array that only contains the local client's
     * ID.
     *
     * PORTING NOTE: This is only used for Web multi-tab.
     */    Ms() {
        return this.runTransaction("getActiveClients", "readonly", (t => Br(t).Ut().next((t => this.vs(t, 18e5).map((t => t.clientId))))));
    }
    get started() {
        return this.ts;
    }
    getMutationQueue(t, e) {
        return lr.Yt(t, this.M, e, this.referenceDelegate);
    }
    getTargetCache() {
        return this.hs;
    }
    getRemoteDocumentCache() {
        return this.ls;
    }
    getIndexManager(t) {
        return new nr(t);
    }
    getDocumentOverlayCache(t) {
        return Li.Yt(this.M, t);
    }
    getBundleCache() {
        return this.fs;
    }
    runTransaction(t, e, n) {
        O("IndexedDbPersistence", "Starting transaction:", t);
        const s = "readonly" === e ? "readonly" : "readwrite", i = 13 === (r = this.Xn) ? ri : 12 === r ? ii : 11 === r ? si : void L();
        /** Returns the object stores for the provided schema. */
        var r;
        let o;
        // Do all transactions as readwrite against all object stores, since we
        // are the only reader/writer.
                return this.cs.runTransaction(t, s, i, (s => (o = new yi(s, this.Zn ? this.Zn.next() : nt.A), 
        "readwrite-primary" === e ? this.Is(o).next((t => !!t || this.Ts(o))).next((e => {
            if (!e) throw $(`Failed to obtain primary lease for action '${t}'.`), this.isPrimary = !1, 
            this.Hn.enqueueRetryable((() => this.os(!1))), new Q(G.FAILED_PRECONDITION, oi);
            return n(o);
        })).next((t => this.As(o).next((() => t)))) : this.Os(o).next((() => n(o)))))).then((t => (o.raiseOnCommittedEvent(), 
        t)));
    }
    /**
     * Verifies that the current tab is the primary leaseholder or alternatively
     * that the leaseholder has opted into multi-tab synchronization.
     */
    // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
    // be turned off.
    Os(t) {
        return Fr(t).get("owner").next((t => {
            if (null !== t && this.Vs(t.leaseTimestampMs, 5e3) && !this.Ds(t.ownerId) && !this.Rs(t) && !(this.Yn || this.allowTabSynchronization && t.allowTabSynchronization)) throw new Q(G.FAILED_PRECONDITION, Or);
        }));
    }
    /**
     * Obtains or extends the new primary lease for the local client. This
     * method does not verify that the client is eligible for this lease.
     */    As(t) {
        const e = {
            ownerId: this.clientId,
            allowTabSynchronization: this.allowTabSynchronization,
            leaseTimestampMs: Date.now()
        };
        return Fr(t).put("owner", e);
    }
    static vt() {
        return hi.vt();
    }
    /** Checks the primary lease and removes it if we are the current primary. */    Es(t) {
        const e = Fr(t);
        return e.get("owner").next((t => this.Rs(t) ? (O("IndexedDbPersistence", "Releasing primary lease."), 
        e.delete("owner")) : ui.resolve()));
    }
    /** Verifies that `updateTimeMs` is within `maxAgeMs`. */    Vs(t, e) {
        const n = Date.now();
        return !(t < n - e) && (!(t > n) || ($(`Detected an update time that is in the future: ${t} > ${n}`), 
        !1));
    }
    ws() {
        null !== this.document && "function" == typeof this.document.addEventListener && (this.ns = () => {
            this.Hn.enqueueAndForget((() => (this.inForeground = "visible" === this.document.visibilityState, 
            this._s())));
        }, this.document.addEventListener("visibilitychange", this.ns), this.inForeground = "visible" === this.document.visibilityState);
    }
    xs() {
        this.ns && (this.document.removeEventListener("visibilitychange", this.ns), this.ns = null);
    }
    /**
     * Attaches a window.unload handler that will synchronously write our
     * clientId to a "zombie client id" location in LocalStorage. This can be used
     * by tabs trying to acquire the primary lease to determine that the lease
     * is no longer valid even if the timestamp is recent. This is particularly
     * important for the refresh case (so the tab correctly re-acquires the
     * primary lease). LocalStorage is used for this rather than IndexedDb because
     * it is a synchronous API and so can be used reliably from  an unload
     * handler.
     */    gs() {
        var t;
        "function" == typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) && (this.es = () => {
            // Note: In theory, this should be scheduled on the AsyncQueue since it
            // accesses internal state. We execute this code directly during shutdown
            // to make sure it gets a chance to run.
            this.Cs(), isSafari() && navigator.appVersion.match(/Version\/1[45]/) && 
            // On Safari 14 and 15, we do not run any cleanup actions as it might
            // trigger a bug that prevents Safari from re-opening IndexedDB during
            // the next page load.
            // See https://bugs.webkit.org/show_bug.cgi?id=226547
            this.Hn.enterRestrictedMode(/* purgeExistingTasks= */ !0), this.Hn.enqueueAndForget((() => this.shutdown()));
        }, this.window.addEventListener("pagehide", this.es));
    }
    Ns() {
        this.es && (this.window.removeEventListener("pagehide", this.es), this.es = null);
    }
    /**
     * Returns whether a client is "zombied" based on its LocalStorage entry.
     * Clients become zombied when their tab closes without running all of the
     * cleanup logic in `shutdown()`.
     */    Ds(t) {
        var e;
        try {
            const n = null !== (null === (e = this.ds) || void 0 === e ? void 0 : e.getItem(this.Ss(t)));
            return O("IndexedDbPersistence", `Client '${t}' ${n ? "is" : "is not"} zombied in LocalStorage`), 
            n;
        } catch (t) {
            // Gracefully handle if LocalStorage isn't working.
            return $("IndexedDbPersistence", "Failed to get zombied client id.", t), !1;
        }
    }
    /**
     * Record client as zombied (a client that had its tab closed). Zombied
     * clients are ignored during primary tab selection.
     */    Cs() {
        if (this.ds) try {
            this.ds.setItem(this.Ss(this.clientId), String(Date.now()));
        } catch (t) {
            // Gracefully handle if LocalStorage isn't available / working.
            $("Failed to set zombie client id.", t);
        }
    }
    /** Removes the zombied client entry if it exists. */    ks() {
        if (this.ds) try {
            this.ds.removeItem(this.Ss(this.clientId));
        } catch (t) {
            // Ignore
        }
    }
    Ss(t) {
        return `firestore_zombie_${this.persistenceKey}_${t}`;
    }
}

/**
 * Helper to get a typed SimpleDbStore for the primary client object store.
 */ function Fr(t) {
    return pi(t, "owner");
}

/**
 * Helper to get a typed SimpleDbStore for the client metadata object store.
 */ function Br(t) {
    return pi(t, "clientMetadata");
}

/**
 * Generates a string used as a prefix when storing data in IndexedDB and
 * LocalStorage.
 */ function Lr(t, e) {
    // Use two different prefix formats:
    //   * firestore / persistenceKey / projectID . databaseID / ...
    //   * firestore / persistenceKey / projectID / ...
    // projectIDs are DNS-compatible names and cannot contain dots
    // so there's no danger of collisions.
    let n = t.projectId;
    return t.isDefaultDatabase || (n += "." + t.database), "firestore/" + e + "/" + n + "/";
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
class qr {
    constructor(t, e) {
        this.progress = t, this.$s = e;
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
 * A readonly view of the local state of all documents we're tracking (i.e. we
 * have a cached version in remoteDocumentCache or local mutations for the
 * document). The view is computed by applying the mutations in the
 * MutationQueue to the RemoteDocumentCache.
 */ class Ur {
    constructor(t, e, n) {
        this.ls = t, this.Fs = e, this.indexManager = n;
    }
    /**
     * Get the local view of the document identified by `key`.
     *
     * @returns Local view of the document or null if we don't have any cached
     * state for it.
     */    Bs(t, e) {
        return this.Fs.getAllMutationBatchesAffectingDocumentKey(t, e).next((n => this.Ls(t, e, n)));
    }
    /** Internal version of `getDocument` that allows reusing batches. */    Ls(t, e, n) {
        return this.ls.getEntry(t, e).next((t => {
            for (const e of n) e.applyToLocalView(t);
            return t;
        }));
    }
    // Returns the view of the given `docs` as they would appear after applying
    // all mutations in the given `batches`.
    qs(t, e) {
        t.forEach(((t, n) => {
            for (const t of e) t.applyToLocalView(n);
        }));
    }
    /**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */    Us(t, e) {
        return this.ls.getEntries(t, e).next((e => this.Ks(t, e).next((() => e))));
    }
    /**
     * Applies the local view the given `baseDocs` without retrieving documents
     * from the local store.
     */    Ks(t, e) {
        return this.Fs.getAllMutationBatchesAffectingDocumentKeys(t, e).next((t => this.qs(e, t)));
    }
    /**
     * Performs a query against the local view of all documents.
     *
     * @param transaction - The persistence transaction.
     * @param query - The query to match documents against.
     * @param sinceReadTime - If not set to SnapshotVersion.min(), return only
     *     documents that have been read since this snapshot version (exclusive).
     */    Gs(t, e, n) {
        /**
 * Returns whether the query matches a single document by path (rather than a
 * collection).
 */
        return function(t) {
            return xt.isDocumentKey(t.path) && null === t.collectionGroup && 0 === t.filters.length;
        }(e) ? this.Qs(t, e.path) : Me(e) ? this.js(t, e, n) : this.Ws(t, e, n);
    }
    Qs(t, e) {
        // Just do a simple document lookup.
        return this.Bs(t, new xt(e)).next((t => {
            let e = Ln();
            return t.isFoundDocument() && (e = e.insert(t.key, t)), e;
        }));
    }
    js(t, e, n) {
        const s = e.collectionGroup;
        let i = Ln();
        return this.indexManager.getCollectionParents(t, s).next((r => ui.forEach(r, (r => {
            const o = function(t, e) {
                return new ve(e, 
                /*collectionGroup=*/ null, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
            }
            /**
 * Returns true if this query does not specify any query constraints that
 * could remove results.
 */ (e, r.child(s));
            return this.Ws(t, o, n).next((t => {
                t.forEach(((t, e) => {
                    i = i.insert(t, e);
                }));
            }));
        })).next((() => i))));
    }
    Ws(t, e, n) {
        // Query the remote documents and overlay mutations.
        let s;
        return this.ls.getAll(t, e.path, n).next((n => (s = n, this.Fs.getAllMutationBatchesAffectingQuery(t, e)))).next((t => {
            for (const e of t) for (const t of e.mutations) {
                const n = t.key;
                let i = s.get(n);
                null == i && (
                // Create invalid document to apply mutations on top of
                i = te.newInvalidDocument(n), s = s.insert(n, i)), _n(t, i, e.localWriteTime), i.isFoundDocument() || (s = s.remove(n));
            }
        })).next((() => (
        // Finally, filter out any documents that don't actually match
        // the query.
        s.forEach(((t, n) => {
            Ue(e, n) || (s = s.remove(t));
        })), s)));
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
 * A set of changes to what documents are currently in view and out of view for
 * a given query. These changes are sent to the LocalStore by the View (via
 * the SyncEngine) and are used to pin / unpin documents as appropriate.
 */ class Kr {
    constructor(t, e, n, s) {
        this.targetId = t, this.fromCache = e, this.zs = n, this.Hs = s;
    }
    static Js(t, e) {
        let n = Gn(), s = Gn();
        for (const t of e.docChanges) switch (t.type) {
          case 0 /* Added */ :
            n = n.add(t.doc.key);
            break;

          case 1 /* Removed */ :
            s = s.add(t.doc.key);
 // do nothing
                }
        return new Kr(t, e.fromCache, n, s);
    }
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
 * A query engine that takes advantage of the target document mapping in the
 * QueryCache. Query execution is optimized by only reading the documents that
 * previously matched a query plus any documents that were edited after the
 * query was last listened to.
 *
 * There are some cases when this optimization is not guaranteed to produce
 * the same results as full collection scans. In these cases, query
 * processing falls back to full scans. These cases are:
 *
 * - Limit queries where a document that matched the query previously no longer
 *   matches the query.
 *
 * - Limit queries where a document edit may cause the document to sort below
 *   another document that is in the local cache.
 *
 * - Queries that have never been CURRENT or free of limbo documents.
 */ class Gr {
    /** Sets the document view to query against. */
    Ys(t) {
        this.Xs = t;
    }
    /** Returns all local documents matching the specified query. */    Gs(t, e, n, s) {
        // Queries that match all documents don't benefit from using
        // key-based lookups. It is more efficient to scan all documents in a
        // collection, rather than to perform individual lookups.
        return function(t) {
            return 0 === t.filters.length && null === t.limit && null == t.startAt && null == t.endAt && (0 === t.explicitOrderBy.length || 1 === t.explicitOrderBy.length && t.explicitOrderBy[0].field.isKeyField());
        }(e) || n.isEqual(ct.min()) ? this.Zs(t, e) : this.Xs.Us(t, s).next((i => {
            const r = this.ti(e, i);
            return (Ce(e) || xe(e)) && this.ei(e.limitType, r, s, n) ? this.Zs(t, e) : (k() <= LogLevel.DEBUG && O("QueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), qe(e)), 
            this.Xs.Gs(t, e, n).next((t => (
            // We merge `previousResults` into `updateResults`, since
            // `updateResults` is already a DocumentMap. If a document is
            // contained in both lists, then its contents are the same.
            r.forEach((e => {
                t = t.insert(e.key, e);
            })), t))));
        }));
        // Queries that have never seen a snapshot without limbo free documents
        // should also be run as a full collection scan.
        }
    /** Applies the query filter and sorting to the provided documents.  */    ti(t, e) {
        // Sort the documents and re-apply the query filter since previously
        // matching documents do not necessarily still match the query.
        let n = new kn(Ke(t));
        return e.forEach(((e, s) => {
            Ue(t, s) && (n = n.add(s));
        })), n;
    }
    /**
     * Determines if a limit query needs to be refilled from cache, making it
     * ineligible for index-free execution.
     *
     * @param sortedPreviousResults - The documents that matched the query when it
     * was last synchronized, sorted by the query's comparator.
     * @param remoteKeys - The document keys that matched the query at the last
     * snapshot.
     * @param limboFreeSnapshotVersion - The version of the snapshot when the
     * query was last synchronized.
     */    ei(t, e, n, s) {
        // The query needs to be refilled if a previously matching document no
        // longer matches.
        if (n.size !== e.size) return !0;
        // Limit queries are not eligible for index-free query execution if there is
        // a potential that an older document from cache now sorts before a document
        // that was previously part of the limit. This, however, can only happen if
        // the document at the edge of the limit goes out of limit.
        // If a document that is not the limit boundary sorts differently,
        // the boundary of the limit itself did not change and documents from cache
        // will continue to be "rejected" by this boundary. Therefore, we can ignore
        // any modifications that don't affect the last document.
                const i = "F" /* First */ === t ? e.last() : e.first();
        return !!i && (i.hasPendingWrites || i.version.compareTo(s) > 0);
    }
    Zs(t, e) {
        return k() <= LogLevel.DEBUG && O("QueryEngine", "Using full collection scan to execute query:", qe(e)), 
        this.Xs.Gs(t, e, ct.min());
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
 * Implements `LocalStore` interface.
 *
 * Note: some field defined in this class might have public access level, but
 * the class is not exported so they are only accessible from this module.
 * This is useful to implement optional features (like bundles) in free
 * functions, such that they are tree-shakeable.
 */
class Qr {
    constructor(
    /** Manages our in-memory or durable persistence. */
    t, e, n, s) {
        this.persistence = t, this.ni = e, this.M = s, 
        /**
         * Maps a targetID to data about its target.
         *
         * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
         * of `applyRemoteEvent()` idempotent.
         */
        this.si = new Cn(rt), 
        /** Maps a target to its targetID. */
        // TODO(wuandy): Evaluate if TargetId can be part of Target.
        this.ii = new Dn((t => ce(t)), le), 
        /**
         * The read time of the last entry processed by `getNewDocumentChanges()`.
         *
         * PORTING NOTE: This is only used for multi-tab synchronization.
         */
        this.ri = ct.min(), this.oi = t.getRemoteDocumentCache(), this.hs = t.getTargetCache(), 
        this.fs = t.getBundleCache(), this.ai(n);
    }
    ai(t) {
        // TODO(indexing): Add spec tests that test these components change after a
        // user change
        this.indexManager = this.persistence.getIndexManager(t), this.Fs = this.persistence.getMutationQueue(t, this.indexManager), 
        this.ui = new Ur(this.oi, this.Fs, this.indexManager), this.oi.setIndexManager(this.indexManager), 
        this.ni.Ys(this.ui);
    }
    collectGarbage(t) {
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (e => t.collect(e, this.si)));
    }
}

function jr(
/** Manages our in-memory or durable persistence. */
t, e, n, s) {
    return new Qr(t, e, n, s);
}

/**
 * Tells the LocalStore that the currently authenticated user has changed.
 *
 * In response the local store switches the mutation queue to the new user and
 * returns any resulting document changes.
 */
// PORTING NOTE: Android and iOS only return the documents affected by the
// change.
async function Wr(t, e) {
    const n = K(t);
    return await n.persistence.runTransaction("Handle user change", "readonly", (t => {
        // Swap out the mutation queue, grabbing the pending mutation batches
        // before and after.
        let s;
        return n.Fs.getAllMutationBatches(t).next((i => (s = i, n.ai(e), n.Fs.getAllMutationBatches(t)))).next((e => {
            const i = [], r = [];
            // Union the old/new changed keys.
            let o = Gn();
            for (const t of s) {
                i.push(t.batchId);
                for (const e of t.mutations) o = o.add(e.key);
            }
            for (const t of e) {
                r.push(t.batchId);
                for (const e of t.mutations) o = o.add(e.key);
            }
            // Return the set of all (potentially) changed documents and the list
            // of mutation batch IDs that were affected by change.
                        return n.ui.Us(t, o).next((t => ({
                ci: t,
                removedBatchIds: i,
                addedBatchIds: r
            })));
        }));
    }));
}

/* Accepts locally generated Mutations and commit them to storage. */
/**
 * Acknowledges the given batch.
 *
 * On the happy path when a batch is acknowledged, the local store will
 *
 *  + remove the batch from the mutation queue;
 *  + apply the changes to the remote document cache;
 *  + recalculate the latency compensated view implied by those changes (there
 *    may be mutations in the queue that affect the documents but haven't been
 *    acknowledged yet); and
 *  + give the changed documents back the sync engine
 *
 * @returns The resulting (modified) documents.
 */
function zr(t, e) {
    const n = K(t);
    return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (t => {
        const s = e.batch.keys(), i = n.oi.newChangeBuffer({
            trackRemovals: !0
        });
        return function(t, e, n, s) {
            const i = n.batch, r = i.keys();
            let o = ui.resolve();
            return r.forEach((t => {
                o = o.next((() => s.getEntry(e, t))).next((e => {
                    const r = n.docVersions.get(t);
                    q(null !== r), e.version.compareTo(r) < 0 && (i.applyToRemoteDocument(e, n), e.isValidDocument() && (
                    // We use the commitVersion as the readTime rather than the
                    // document's updateTime since the updateTime is not advanced
                    // for updates that do not modify the underlying document.
                    e.setReadTime(n.commitVersion), s.addEntry(e)));
                }));
            })), o.next((() => t.Fs.removeMutationBatch(e, i)));
        }
        /** Returns the local view of the documents affected by a mutation batch. */
        // PORTING NOTE: Multi-Tab only.
        (n, t, e, i).next((() => i.apply(t))).next((() => n.Fs.performConsistencyCheck(t))).next((() => n.ui.Us(t, s)));
    }));
}

/**
 * Removes mutations from the MutationQueue for the specified batch;
 * LocalDocuments will be recalculated.
 *
 * @returns The resulting modified documents.
 */
/**
 * Returns the last consistent snapshot processed (used by the RemoteStore to
 * determine whether to buffer incoming snapshots from the backend).
 */
function Hr(t) {
    const e = K(t);
    return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (t => e.hs.getLastRemoteSnapshotVersion(t)));
}

/**
 * Updates the "ground-state" (remote) documents. We assume that the remote
 * event reflects any write batches that have been acknowledged or rejected
 * (i.e. we do not re-apply local mutations to updates from this event).
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */ function Jr(t, e) {
    const n = K(t), s = e.snapshotVersion;
    let i = n.si;
    return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (t => {
        const r = n.oi.newChangeBuffer({
            trackRemovals: !0
        });
        // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                i = n.si;
        const o = [];
        e.targetChanges.forEach(((r, a) => {
            const u = i.get(a);
            if (!u) return;
            // Only update the remote keys if the target is still active. This
            // ensures that we can persist the updated target data along with
            // the updated assignment.
                        o.push(n.hs.removeMatchingKeys(t, r.removedDocuments, a).next((() => n.hs.addMatchingKeys(t, r.addedDocuments, a))));
            let c = u.withSequenceNumber(t.currentSequenceNumber);
            e.targetMismatches.has(a) ? c = c.withResumeToken(pt.EMPTY_BYTE_STRING, ct.min()).withLastLimboFreeSnapshotVersion(ct.min()) : r.resumeToken.approximateByteSize() > 0 && (c = c.withResumeToken(r.resumeToken, s)), 
            i = i.insert(a, c), 
            // Update the target data if there are target changes (or if
            // sufficient time has passed since the last update).
            /**
 * Returns true if the newTargetData should be persisted during an update of
 * an active target. TargetData should always be persisted when a target is
 * being released and should not call this function.
 *
 * While the target is active, TargetData updates can be omitted when nothing
 * about the target has changed except metadata like the resume token or
 * snapshot version. Occasionally it's worth the extra write to prevent these
 * values from getting too stale after a crash, but this doesn't have to be
 * too frequent.
 */
            function(t, e, n) {
                // Always persist target data if we don't already have a resume token.
                if (0 === t.resumeToken.approximateByteSize()) return !0;
                // Don't allow resume token changes to be buffered indefinitely. This
                // allows us to be reasonably up-to-date after a crash and avoids needing
                // to loop over all active queries on shutdown. Especially in the browser
                // we may not get time to do anything interesting while the current tab is
                // closing.
                                if (e.snapshotVersion.toMicroseconds() - t.snapshotVersion.toMicroseconds() >= 3e8) return !0;
                // Otherwise if the only thing that has changed about a target is its resume
                // token it's not worth persisting. Note that the RemoteStore keeps an
                // in-memory view of the currently active targets which includes the current
                // resume token, so stream failure or user changes will still use an
                // up-to-date resume token regardless of what we do here.
                                return n.addedDocuments.size + n.modifiedDocuments.size + n.removedDocuments.size > 0;
            }
            /**
 * Notifies local store of the changed views to locally pin documents.
 */ (u, c, r) && o.push(n.hs.updateTargetData(t, c));
        }));
        let a = Fn();
        // HACK: The only reason we allow a null snapshot version is so that we
        // can synthesize remote events when we get permission denied errors while
        // trying to resolve the state of a locally cached document that is in
        // limbo.
        if (e.documentUpdates.forEach((s => {
            e.resolvedLimboDocuments.has(s) && o.push(n.persistence.referenceDelegate.updateLimboDocument(t, s));
        })), 
        // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
        // documents in advance in a single call.
        o.push(Yr(t, r, e.documentUpdates).next((t => {
            a = t;
        }))), !s.isEqual(ct.min())) {
            const e = n.hs.getLastRemoteSnapshotVersion(t).next((e => n.hs.setTargetsMetadata(t, t.currentSequenceNumber, s)));
            o.push(e);
        }
        return ui.waitFor(o).next((() => r.apply(t))).next((() => n.ui.Ks(t, a))).next((() => a));
    })).then((t => (n.si = i, t)));
}

/**
 * Populates document change buffer with documents from backend or a bundle.
 * Returns the document changes resulting from applying those documents.
 *
 * @param txn - Transaction to use to read existing documents from storage.
 * @param documentBuffer - Document buffer to collect the resulted changes to be
 *        applied to storage.
 * @param documents - Documents to be applied.
 * @param globalVersion - A `SnapshotVersion` representing the read time if all
 *        documents have the same read time.
 * @param documentVersions - A DocumentKey-to-SnapshotVersion map if documents
 *        have their own read time.
 *
 * Note: this function will use `documentVersions` if it is defined;
 * when it is not defined, resorts to `globalVersion`.
 */ function Yr(t, e, n) {
    let s = Gn();
    return n.forEach((t => s = s.add(t))), e.getEntries(t, s).next((t => {
        let s = Fn();
        return n.forEach(((n, i) => {
            const r = t.get(n);
            // Note: The order of the steps below is important, since we want
            // to ensure that rejected limbo resolutions (which fabricate
            // NoDocuments with SnapshotVersion.min()) never add documents to
            // cache.
                        i.isNoDocument() && i.version.isEqual(ct.min()) ? (
            // NoDocuments with SnapshotVersion.min() are used in manufactured
            // events. We remove these documents from cache since we lost
            // access.
            e.removeEntry(n, i.readTime), s = s.insert(n, i)) : !r.isValidDocument() || i.version.compareTo(r.version) > 0 || 0 === i.version.compareTo(r.version) && r.hasPendingWrites ? (e.addEntry(i), 
            s = s.insert(n, i)) : O("LocalStore", "Ignoring outdated watch update for ", n, ". Current version:", r.version, " Watch version:", i.version);
        })), s;
    }));
}

/**
 * Gets the mutation batch after the passed in batchId in the mutation queue
 * or null if empty.
 * @param afterBatchId - If provided, the batch to search after.
 * @returns The next mutation or null if there wasn't one.
 */
function Xr(t, e) {
    const n = K(t);
    return n.persistence.runTransaction("Get next mutation batch", "readonly", (t => (void 0 === e && (e = -1), 
    n.Fs.getNextMutationBatchAfterBatchId(t, e))));
}

/**
 * Reads the current value of a Document with a given key or null if not
 * found - used for testing.
 */
/**
 * Assigns the given target an internal ID so that its results can be pinned so
 * they don't get GC'd. A target must be allocated in the local store before
 * the store can be used to manage its view.
 *
 * Allocating an already allocated `Target` will return the existing `TargetData`
 * for that `Target`.
 */
function Zr(t, e) {
    const n = K(t);
    return n.persistence.runTransaction("Allocate target", "readwrite", (t => {
        let s;
        return n.hs.getTargetData(t, e).next((i => i ? (
        // This target has been listened to previously, so reuse the
        // previous targetID.
        // TODO(mcg): freshen last accessed date?
        s = i, ui.resolve(s)) : n.hs.allocateTargetId(t).next((i => (s = new Ai(e, i, 0 /* Listen */ , t.currentSequenceNumber), 
        n.hs.addTargetData(t, s).next((() => s)))))));
    })).then((t => {
        // If Multi-Tab is enabled, the existing target data may be newer than
        // the in-memory data
        const s = n.si.get(t.targetId);
        return (null === s || t.snapshotVersion.compareTo(s.snapshotVersion) > 0) && (n.si = n.si.insert(t.targetId, t), 
        n.ii.set(e, t.targetId)), t;
    }));
}

/**
 * Returns the TargetData as seen by the LocalStore, including updates that may
 * have not yet been persisted to the TargetCache.
 */
// Visible for testing.
/**
 * Unpins all the documents associated with the given target. If
 * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
 * directly removes the associated target data from the target cache.
 *
 * Releasing a non-existing `Target` is a no-op.
 */
// PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
async function to(t, e, n) {
    const s = K(t), i = s.si.get(e), r = n ? "readwrite" : "readwrite-primary";
    try {
        n || await s.persistence.runTransaction("Release target", r, (t => s.persistence.referenceDelegate.removeTarget(t, i)));
    } catch (t) {
        if (!di(t)) throw t;
        // All `releaseTarget` does is record the final metadata state for the
        // target, but we've been recording this periodically during target
        // activity. If we lose this write this could cause a very slight
        // difference in the order of target deletion during GC, but we
        // don't define exact LRU semantics so this is acceptable.
        O("LocalStore", `Failed to update sequence numbers for target ${e}: ${t}`);
    }
    s.si = s.si.remove(e), s.ii.delete(i.target);
}

/**
 * Runs the specified query against the local store and returns the results,
 * potentially taking advantage of query data from previous executions (such
 * as the set of remote keys).
 *
 * @param usePreviousResults - Whether results from previous executions can
 * be used to optimize this query execution.
 */ function eo(t, e, n) {
    const s = K(t);
    let i = ct.min(), r = Gn();
    return s.persistence.runTransaction("Execute query", "readonly", (t => function(t, e, n) {
        const s = K(t), i = s.ii.get(n);
        return void 0 !== i ? ui.resolve(s.si.get(i)) : s.hs.getTargetData(e, n);
    }(s, t, $e(e)).next((e => {
        if (e) return i = e.lastLimboFreeSnapshotVersion, s.hs.getMatchingKeysForTargetId(t, e.targetId).next((t => {
            r = t;
        }));
    })).next((() => s.ni.Gs(t, e, n ? i : ct.min(), n ? r : Gn()))).next((t => ({
        documents: t,
        hi: r
    })))));
}

// PORTING NOTE: Multi-Tab only.
function no(t, e) {
    const n = K(t), s = K(n.hs), i = n.si.get(e);
    return i ? Promise.resolve(i.target) : n.persistence.runTransaction("Get target data", "readonly", (t => s.Et(t, e).next((t => t ? t.target : null))));
}

/**
 * Returns the set of documents that have been updated since the last call.
 * If this is the first call, returns the set of changes since client
 * initialization. Further invocations will return document that have changed
 * since the prior call.
 */
// PORTING NOTE: Multi-Tab only.
function so(t) {
    const e = K(t);
    return e.persistence.runTransaction("Get new document changes", "readonly", (t => function(t, e, n) {
        const s = K(t);
        let i = Fn(), r = Vi(n);
        const o = xr(e), a = IDBKeyRange.lowerBound(r, !0);
        return o.Wt({
            index: "readTimeIndex",
            range: a
        }, ((t, e) => {
            // Unlike `getEntry()` and others, `getNewDocumentChanges()` parses
            // the documents directly since we want to keep sentinel deletes.
            const n = bi(s.M, e);
            i = i.insert(n.key, n), r = e.readTime;
        })).next((() => ({
            $s: i,
            readTime: vi(r)
        })));
    }
    /**
 * Returns the read time of the most recently read document in the cache, or
 * SnapshotVersion.min() if not available.
 */
    // PORTING NOTE: This is only used for multi-tab synchronization.
    (e.oi, t, e.ri))).then((({$s: t, readTime: n}) => (e.ri = n, t)));
}

/**
 * Reads the newest document change from persistence and moves the internal
 * synchronization marker forward so that calls to `getNewDocumentChanges()`
 * only return changes that happened after client initialization.
 */
// PORTING NOTE: Multi-Tab only.
async function io(t) {
    const e = K(t);
    return e.persistence.runTransaction("Synchronize last document change read time", "readonly", (t => function(t) {
        const e = xr(t);
        // If there are no existing entries, we return SnapshotVersion.min().
                let n = ct.min();
        return e.Wt({
            index: "readTimeIndex",
            reverse: !0
        }, ((t, e, s) => {
            e.readTime && (n = vi(e.readTime)), s.done();
        })).next((() => n));
    }(t))).then((t => {
        e.ri = t;
    }));
}

/**
 * Creates a new target using the given bundle name, which will be used to
 * hold the keys of all documents from the bundle in query-document mappings.
 * This ensures that the loaded documents do not get garbage collected
 * right away.
 */
/**
 * Applies the documents from a bundle to the "ground-state" (remote)
 * documents.
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */
async function ro(t, e, n, s) {
    const i = K(t);
    let r = Gn(), o = Fn();
    for (const t of n) {
        const n = e.li(t.metadata.name);
        t.document && (r = r.add(n));
        const s = e.fi(t);
        s.setReadTime(e.di(t.metadata.readTime)), o = o.insert(n, s);
    }
    const a = i.oi.newChangeBuffer({
        trackRemovals: !0
    }), u = await Zr(i, function(t) {
        // It is OK that the path used for the query is not valid, because this will
        // not be read and queried.
        return $e(De(_t.fromString(`__bundle__/docs/${t}`)));
    }(s));
    // Allocates a target to hold all document keys from the bundle, such that
    // they will not get garbage collected right away.
        return i.persistence.runTransaction("Apply bundle documents", "readwrite", (t => Yr(t, a, o).next((e => (a.apply(t), 
    e))).next((e => i.hs.removeMatchingKeysForTargetId(t, u.targetId).next((() => i.hs.addMatchingKeys(t, r, u.targetId))).next((() => i.ui.Ks(t, e))).next((() => e))))));
}

/**
 * Returns a promise of a boolean to indicate if the given bundle has already
 * been loaded and the create time is newer than the current loading bundle.
 */
/**
 * Saves the given `NamedQuery` to local persistence.
 */
async function oo(t, e, n = Gn()) {
    // Allocate a target for the named query such that it can be resumed
    // from associated read time if users use it to listen.
    // NOTE: this also means if no corresponding target exists, the new target
    // will remain active and will not get collected, unless users happen to
    // unlisten the query somehow.
    const s = await Zr(t, $e(ki(e.bundledQuery))), i = K(t);
    return i.persistence.runTransaction("Save named query", "readwrite", (t => {
        const r = us(e.readTime);
        // Simply save the query itself if it is older than what the SDK already
        // has.
                if (s.snapshotVersion.compareTo(r) >= 0) return i.fs.saveNamedQuery(t, e);
        // Update existing target data because the query from the bundle is newer.
                const o = s.withResumeToken(pt.EMPTY_BYTE_STRING, r);
        return i.si = i.si.insert(o.targetId, o), i.hs.updateTargetData(t, o).next((() => i.hs.removeMatchingKeysForTargetId(t, s.targetId))).next((() => i.hs.addMatchingKeys(t, n, s.targetId))).next((() => i.fs.saveNamedQuery(t, e)));
    }));
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
 */ class ao {
    constructor(t) {
        this.M = t, this._i = new Map, this.wi = new Map;
    }
    getBundleMetadata(t, e) {
        return ui.resolve(this._i.get(e));
    }
    saveBundleMetadata(t, e) {
        /** Decodes a BundleMetadata proto into a BundleMetadata object. */
        var n;
        return this._i.set(e.id, {
            id: (n = e).id,
            version: n.version,
            createTime: us(n.createTime)
        }), ui.resolve();
    }
    getNamedQuery(t, e) {
        return ui.resolve(this.wi.get(e));
    }
    saveNamedQuery(t, e) {
        return this.wi.set(e.name, function(t) {
            return {
                name: t.name,
                query: ki(t.bundledQuery),
                readTime: us(t.readTime)
            };
        }(e)), ui.resolve();
    }
}

/**
 * @license
 * Copyright 2022 Google LLC
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
 * An in-memory implementation of DocumentOverlayCache.
 */ class uo {
    constructor() {
        // A map sorted by DocumentKey, whose value is a pair of the largest batch id
        // for the overlay and the overlay itself.
        this.overlays = new Cn(xt.comparator), this.mi = new Map;
    }
    getOverlay(t, e) {
        return ui.resolve(this.overlays.get(e));
    }
    saveOverlays(t, e, n) {
        return n.forEach(((n, s) => {
            this.Xt(t, e, s);
        })), ui.resolve();
    }
    removeOverlaysForBatchId(t, e, n) {
        const s = this.mi.get(n);
        return void 0 !== s && (s.forEach((t => this.overlays = this.overlays.remove(t))), 
        this.mi.delete(n)), ui.resolve();
    }
    getOverlaysForCollection(t, e, n) {
        const s = qn(), i = e.length + 1, r = new xt(e.child("")), o = this.overlays.getIteratorFrom(r);
        for (;o.hasNext(); ) {
            const t = o.getNext().value, r = t.getKey();
            if (!e.isPrefixOf(r.path)) break;
            // Documents from sub-collections
                        r.path.length === i && (t.largestBatchId > n && s.set(t.getKey(), t));
        }
        return ui.resolve(s);
    }
    getOverlaysForCollectionGroup(t, e, n, s) {
        let i = new Cn(((t, e) => t - e));
        const r = this.overlays.getIterator();
        for (;r.hasNext(); ) {
            const t = r.getNext().value;
            if (t.getKey().getCollectionGroup() === e && t.largestBatchId > n) {
                let e = i.get(t.largestBatchId);
                null === e && (e = qn(), i = i.insert(t.largestBatchId, e)), e.set(t.getKey(), t);
            }
        }
        const o = qn(), a = i.getIterator();
        for (;a.hasNext(); ) {
            if (a.getNext().value.forEach(((t, e) => o.set(t, e))), o.size() >= s) break;
        }
        return ui.resolve(o);
    }
    Xt(t, e, n) {
        if (null === n) return;
        // Remove the association of the overlay to its batch id.
                const s = this.overlays.get(n.key);
        if (null !== s) {
            const t = this.mi.get(s.largestBatchId).delete(n.key);
            this.mi.set(s.largestBatchId, t);
        }
        this.overlays = this.overlays.insert(n.key, new Ei(e, n));
        // Create the association of this overlay to the given largestBatchId.
        let i = this.mi.get(e);
        void 0 === i && (i = Gn(), this.mi.set(e, i)), this.mi.set(e, i.add(n.key));
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
 * A collection of references to a document from some kind of numbered entity
 * (either a target ID or batch ID). As references are added to or removed from
 * the set corresponding events are emitted to a registered garbage collector.
 *
 * Each reference is represented by a DocumentReference object. Each of them
 * contains enough information to uniquely identify the reference. They are all
 * stored primarily in a set sorted by key. A document is considered garbage if
 * there's no references in that set (this can be efficiently checked thanks to
 * sorting by key).
 *
 * ReferenceSet also keeps a secondary set that contains references sorted by
 * IDs. This one is used to efficiently implement removal of all references by
 * some target ID.
 */ class co {
    constructor() {
        // A set of outstanding references to a document sorted by key.
        this.gi = new kn(ho.yi), 
        // A set of outstanding references to a document sorted by target id.
        this.pi = new kn(ho.Ii);
    }
    /** Returns true if the reference set contains no references. */    isEmpty() {
        return this.gi.isEmpty();
    }
    /** Adds a reference to the given document key for the given ID. */    addReference(t, e) {
        const n = new ho(t, e);
        this.gi = this.gi.add(n), this.pi = this.pi.add(n);
    }
    /** Add references to the given document keys for the given ID. */    Ti(t, e) {
        t.forEach((t => this.addReference(t, e)));
    }
    /**
     * Removes a reference to the given document key for the given
     * ID.
     */    removeReference(t, e) {
        this.Ei(new ho(t, e));
    }
    Ai(t, e) {
        t.forEach((t => this.removeReference(t, e)));
    }
    /**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */    Ri(t) {
        const e = new xt(new _t([])), n = new ho(e, t), s = new ho(e, t + 1), i = [];
        return this.pi.forEachInRange([ n, s ], (t => {
            this.Ei(t), i.push(t.key);
        })), i;
    }
    bi() {
        this.gi.forEach((t => this.Ei(t)));
    }
    Ei(t) {
        this.gi = this.gi.delete(t), this.pi = this.pi.delete(t);
    }
    Pi(t) {
        const e = new xt(new _t([])), n = new ho(e, t), s = new ho(e, t + 1);
        let i = Gn();
        return this.pi.forEachInRange([ n, s ], (t => {
            i = i.add(t.key);
        })), i;
    }
    containsKey(t) {
        const e = new ho(t, 0), n = this.gi.firstAfterOrEqual(e);
        return null !== n && t.isEqual(n.key);
    }
}

class ho {
    constructor(t, e) {
        this.key = t, this.Vi = e;
    }
    /** Compare by key then by ID */    static yi(t, e) {
        return xt.comparator(t.key, e.key) || rt(t.Vi, e.Vi);
    }
    /** Compare by ID then by key */    static Ii(t, e) {
        return rt(t.Vi, e.Vi) || xt.comparator(t.key, e.key);
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
 */ class lo {
    constructor(t, e) {
        this.indexManager = t, this.referenceDelegate = e, 
        /**
         * The set of all mutations that have been sent but not yet been applied to
         * the backend.
         */
        this.Fs = [], 
        /** Next value to use when assigning sequential IDs to each mutation batch. */
        this.vi = 1, 
        /** An ordered mapping between documents and the mutations batch IDs. */
        this.Si = new kn(ho.yi);
    }
    checkEmpty(t) {
        return ui.resolve(0 === this.Fs.length);
    }
    addMutationBatch(t, e, n, s) {
        const i = this.vi;
        this.vi++, this.Fs.length > 0 && this.Fs[this.Fs.length - 1];
        const r = new Ii(i, e, n, s);
        this.Fs.push(r);
        // Track references by document key and index collection parents.
        for (const e of s) this.Si = this.Si.add(new ho(e.key, i)), this.indexManager.addToCollectionParentIndex(t, e.key.path.popLast());
        return ui.resolve(r);
    }
    lookupMutationBatch(t, e) {
        return ui.resolve(this.Di(e));
    }
    getNextMutationBatchAfterBatchId(t, e) {
        const n = e + 1, s = this.Ci(n), i = s < 0 ? 0 : s;
        // The requested batchId may still be out of range so normalize it to the
        // start of the queue.
                return ui.resolve(this.Fs.length > i ? this.Fs[i] : null);
    }
    getHighestUnacknowledgedBatchId() {
        return ui.resolve(0 === this.Fs.length ? -1 : this.vi - 1);
    }
    getAllMutationBatches(t) {
        return ui.resolve(this.Fs.slice());
    }
    getAllMutationBatchesAffectingDocumentKey(t, e) {
        const n = new ho(e, 0), s = new ho(e, Number.POSITIVE_INFINITY), i = [];
        return this.Si.forEachInRange([ n, s ], (t => {
            const e = this.Di(t.Vi);
            i.push(e);
        })), ui.resolve(i);
    }
    getAllMutationBatchesAffectingDocumentKeys(t, e) {
        let n = new kn(rt);
        return e.forEach((t => {
            const e = new ho(t, 0), s = new ho(t, Number.POSITIVE_INFINITY);
            this.Si.forEachInRange([ e, s ], (t => {
                n = n.add(t.Vi);
            }));
        })), ui.resolve(this.xi(n));
    }
    getAllMutationBatchesAffectingQuery(t, e) {
        // Use the query path as a prefix for testing if a document matches the
        // query.
        const n = e.path, s = n.length + 1;
        // Construct a document reference for actually scanning the index. Unlike
        // the prefix the document key in this reference must have an even number of
        // segments. The empty segment can be used a suffix of the query path
        // because it precedes all other segments in an ordered traversal.
        let i = n;
        xt.isDocumentKey(i) || (i = i.child(""));
        const r = new ho(new xt(i), 0);
        // Find unique batchIDs referenced by all documents potentially matching the
        // query.
                let o = new kn(rt);
        return this.Si.forEachWhile((t => {
            const e = t.key.path;
            return !!n.isPrefixOf(e) && (
            // Rows with document keys more than one segment longer than the query
            // path can't be matches. For example, a query on 'rooms' can't match
            // the document /rooms/abc/messages/xyx.
            // TODO(mcg): we'll need a different scanner when we implement
            // ancestor queries.
            e.length === s && (o = o.add(t.Vi)), !0);
        }), r), ui.resolve(this.xi(o));
    }
    xi(t) {
        // Construct an array of matching batches, sorted by batchID to ensure that
        // multiple mutations affecting the same document key are applied in order.
        const e = [];
        return t.forEach((t => {
            const n = this.Di(t);
            null !== n && e.push(n);
        })), e;
    }
    removeMutationBatch(t, e) {
        q(0 === this.Ni(e.batchId, "removed")), this.Fs.shift();
        let n = this.Si;
        return ui.forEach(e.mutations, (s => {
            const i = new ho(s.key, e.batchId);
            return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(t, s.key);
        })).next((() => {
            this.Si = n;
        }));
    }
    dn(t) {
        // No-op since the memory mutation queue does not maintain a separate cache.
    }
    containsKey(t, e) {
        const n = new ho(e, 0), s = this.Si.firstAfterOrEqual(n);
        return ui.resolve(e.isEqual(s && s.key));
    }
    performConsistencyCheck(t) {
        return this.Fs.length, ui.resolve();
    }
    /**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId - The batchId to search for
     * @param action - A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */    Ni(t, e) {
        return this.Ci(t);
    }
    /**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @returns The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */    Ci(t) {
        if (0 === this.Fs.length) 
        // As an index this is past the end of the queue
        return 0;
        // Examine the front of the queue to figure out the difference between the
        // batchId and indexes in the array. Note that since the queue is ordered
        // by batchId, if the first batch has a larger batchId then the requested
        // batchId doesn't exist in the queue.
                return t - this.Fs[0].batchId;
    }
    /**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */    Di(t) {
        const e = this.Ci(t);
        if (e < 0 || e >= this.Fs.length) return null;
        return this.Fs[e];
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
 * The memory-only RemoteDocumentCache for IndexedDb. To construct, invoke
 * `newMemoryRemoteDocumentCache()`.
 */
class fo {
    /**
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */
    constructor(t) {
        this.ki = t, 
        /** Underlying cache of documents and their read times. */
        this.docs = new Cn(xt.comparator), 
        /** Size of all cached documents. */
        this.size = 0;
    }
    setIndexManager(t) {
        this.indexManager = t;
    }
    /**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */    addEntry(t, e) {
        const n = e.key, s = this.docs.get(n), i = s ? s.size : 0, r = this.ki(e);
        return this.docs = this.docs.insert(n, {
            document: e.mutableCopy(),
            size: r
        }), this.size += r - i, this.indexManager.addToCollectionParentIndex(t, n.path.popLast());
    }
    /**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */    removeEntry(t) {
        const e = this.docs.get(t);
        e && (this.docs = this.docs.remove(t), this.size -= e.size);
    }
    getEntry(t, e) {
        const n = this.docs.get(e);
        return ui.resolve(n ? n.document.mutableCopy() : te.newInvalidDocument(e));
    }
    getEntries(t, e) {
        let n = Fn();
        return e.forEach((t => {
            const e = this.docs.get(t);
            n = n.insert(t, e ? e.document.mutableCopy() : te.newInvalidDocument(t));
        })), ui.resolve(n);
    }
    getAll(t, e, n) {
        let s = Fn();
        // Documents are ordered by key, so we can use a prefix scan to narrow down
        // the documents we need to match the query against.
                const i = new xt(e.child("")), r = this.docs.getIteratorFrom(i);
        for (;r.hasNext(); ) {
            const {key: t, value: {document: i}} = r.getNext();
            if (!e.isPrefixOf(t.path)) break;
            t.path.length > e.length + 1 || (i.readTime.compareTo(n) <= 0 || (s = s.insert(i.key, i.mutableCopy())));
        }
        return ui.resolve(s);
    }
    Mi(t, e) {
        return ui.forEach(this.docs, (t => e(t)));
    }
    newChangeBuffer(t) {
        // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
        // a separate changelog and does not need special handling for removals.
        return new _o(this);
    }
    getSize(t) {
        return ui.resolve(this.size);
    }
}

/**
 * Creates a new memory-only RemoteDocumentCache.
 *
 * @param sizer - Used to assess the size of a document. For eager GC, this is
 * expected to just return 0 to avoid unnecessarily doing the work of
 * calculating the size.
 */
/**
 * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
 */
class _o extends vr {
    constructor(t) {
        super(), this.Un = t;
    }
    applyChanges(t) {
        const e = [];
        return this.changes.forEach(((n, s) => {
            s.isValidDocument() ? e.push(this.Un.addEntry(t, s)) : this.Un.removeEntry(n);
        })), ui.waitFor(e);
    }
    getFromCache(t, e) {
        return this.Un.getEntry(t, e);
    }
    getAllFromCache(t, e) {
        return this.Un.getEntries(t, e);
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
 */ class wo {
    constructor(t) {
        this.persistence = t, 
        /**
         * Maps a target to the data about that target
         */
        this.Oi = new Dn((t => ce(t)), le), 
        /** The last received snapshot version. */
        this.lastRemoteSnapshotVersion = ct.min(), 
        /** The highest numbered target ID encountered. */
        this.highestTargetId = 0, 
        /** The highest sequence number encountered. */
        this.$i = 0, 
        /**
         * A ordered bidirectional mapping between documents and the remote target
         * IDs.
         */
        this.Fi = new co, this.targetCount = 0, this.Bi = mr.mn();
    }
    forEachTarget(t, e) {
        return this.Oi.forEach(((t, n) => e(n))), ui.resolve();
    }
    getLastRemoteSnapshotVersion(t) {
        return ui.resolve(this.lastRemoteSnapshotVersion);
    }
    getHighestSequenceNumber(t) {
        return ui.resolve(this.$i);
    }
    allocateTargetId(t) {
        return this.highestTargetId = this.Bi.next(), ui.resolve(this.highestTargetId);
    }
    setTargetsMetadata(t, e, n) {
        return n && (this.lastRemoteSnapshotVersion = n), e > this.$i && (this.$i = e), 
        ui.resolve();
    }
    In(t) {
        this.Oi.set(t.target, t);
        const e = t.targetId;
        e > this.highestTargetId && (this.Bi = new mr(e), this.highestTargetId = e), t.sequenceNumber > this.$i && (this.$i = t.sequenceNumber);
    }
    addTargetData(t, e) {
        return this.In(e), this.targetCount += 1, ui.resolve();
    }
    updateTargetData(t, e) {
        return this.In(e), ui.resolve();
    }
    removeTargetData(t, e) {
        return this.Oi.delete(e.target), this.Fi.Ri(e.targetId), this.targetCount -= 1, 
        ui.resolve();
    }
    removeTargets(t, e, n) {
        let s = 0;
        const i = [];
        return this.Oi.forEach(((r, o) => {
            o.sequenceNumber <= e && null === n.get(o.targetId) && (this.Oi.delete(r), i.push(this.removeMatchingKeysForTargetId(t, o.targetId)), 
            s++);
        })), ui.waitFor(i).next((() => s));
    }
    getTargetCount(t) {
        return ui.resolve(this.targetCount);
    }
    getTargetData(t, e) {
        const n = this.Oi.get(e) || null;
        return ui.resolve(n);
    }
    addMatchingKeys(t, e, n) {
        return this.Fi.Ti(e, n), ui.resolve();
    }
    removeMatchingKeys(t, e, n) {
        this.Fi.Ai(e, n);
        const s = this.persistence.referenceDelegate, i = [];
        return s && e.forEach((e => {
            i.push(s.markPotentiallyOrphaned(t, e));
        })), ui.waitFor(i);
    }
    removeMatchingKeysForTargetId(t, e) {
        return this.Fi.Ri(e), ui.resolve();
    }
    getMatchingKeysForTargetId(t, e) {
        const n = this.Fi.Pi(e);
        return ui.resolve(n);
    }
    containsKey(t, e) {
        return ui.resolve(this.Fi.containsKey(e));
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
 * A memory-backed instance of Persistence. Data is stored only in RAM and
 * not persisted across sessions.
 */
class mo {
    /**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */
    constructor(t, e) {
        this.Li = {}, this.overlays = {}, this.Zn = new nt(0), this.ts = !1, this.ts = !0, 
        this.referenceDelegate = t(this), this.hs = new wo(this);
        this.indexManager = new Zi, this.ls = function(t) {
            return new fo(t);
        }((t => this.referenceDelegate.qi(t))), this.M = new Ri(e), this.fs = new ao(this.M);
    }
    start() {
        return Promise.resolve();
    }
    shutdown() {
        // No durable state to ensure is closed on shutdown.
        return this.ts = !1, Promise.resolve();
    }
    get started() {
        return this.ts;
    }
    setDatabaseDeletedListener() {
        // No op.
    }
    setNetworkEnabled() {
        // No op.
    }
    getIndexManager(t) {
        // We do not currently support indices for memory persistence, so we can
        // return the same shared instance of the memory index manager.
        return this.indexManager;
    }
    getDocumentOverlayCache(t) {
        let e = this.overlays[t.toKey()];
        return e || (e = new uo, this.overlays[t.toKey()] = e), e;
    }
    getMutationQueue(t, e) {
        let n = this.Li[t.toKey()];
        return n || (n = new lo(e, this.referenceDelegate), this.Li[t.toKey()] = n), n;
    }
    getTargetCache() {
        return this.hs;
    }
    getRemoteDocumentCache() {
        return this.ls;
    }
    getBundleCache() {
        return this.fs;
    }
    runTransaction(t, e, n) {
        O("MemoryPersistence", "Starting transaction:", t);
        const s = new go(this.Zn.next());
        return this.referenceDelegate.Ui(), n(s).next((t => this.referenceDelegate.Ki(s).next((() => t)))).toPromise().then((t => (s.raiseOnCommittedEvent(), 
        t)));
    }
    Gi(t, e) {
        return ui.or(Object.values(this.Li).map((n => () => n.containsKey(t, e))));
    }
}

/**
 * Memory persistence is not actually transactional, but future implementations
 * may have transaction-scoped state.
 */ class go extends ai {
    constructor(t) {
        super(), this.currentSequenceNumber = t;
    }
}

class yo {
    constructor(t) {
        this.persistence = t, 
        /** Tracks all documents that are active in Query views. */
        this.Qi = new co, 
        /** The list of documents that are potentially GCed after each transaction. */
        this.ji = null;
    }
    static Wi(t) {
        return new yo(t);
    }
    get zi() {
        if (this.ji) return this.ji;
        throw L();
    }
    addReference(t, e, n) {
        return this.Qi.addReference(n, e), this.zi.delete(n.toString()), ui.resolve();
    }
    removeReference(t, e, n) {
        return this.Qi.removeReference(n, e), this.zi.add(n.toString()), ui.resolve();
    }
    markPotentiallyOrphaned(t, e) {
        return this.zi.add(e.toString()), ui.resolve();
    }
    removeTarget(t, e) {
        this.Qi.Ri(e.targetId).forEach((t => this.zi.add(t.toString())));
        const n = this.persistence.getTargetCache();
        return n.getMatchingKeysForTargetId(t, e.targetId).next((t => {
            t.forEach((t => this.zi.add(t.toString())));
        })).next((() => n.removeTargetData(t, e)));
    }
    Ui() {
        this.ji = new Set;
    }
    Ki(t) {
        // Remove newly orphaned documents.
        const e = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        return ui.forEach(this.zi, (n => {
            const s = xt.fromPath(n);
            return this.Hi(t, s).next((t => {
                t || e.removeEntry(s, ct.min());
            }));
        })).next((() => (this.ji = null, e.apply(t))));
    }
    updateLimboDocument(t, e) {
        return this.Hi(t, e).next((t => {
            t ? this.zi.delete(e.toString()) : this.zi.add(e.toString());
        }));
    }
    qi(t) {
        // For eager GC, we don't care about the document size, there are no size thresholds.
        return 0;
    }
    Hi(t, e) {
        return ui.or([ () => ui.resolve(this.Qi.containsKey(e)), () => this.persistence.getTargetCache().containsKey(t, e), () => this.persistence.Gi(t, e) ]);
    }
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
// The format of the LocalStorage key that stores the client state is:
//     firestore_clients_<persistence_prefix>_<instance_key>
/** Assembles the key for a client state in WebStorage */
function po(t, e) {
    return `firestore_clients_${t}_${e}`;
}

// The format of the WebStorage key that stores the mutation state is:
//     firestore_mutations_<persistence_prefix>_<batch_id>
//     (for unauthenticated users)
// or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>

// 'user_uid' is last to avoid needing to escape '_' characters that it might
// contain.
/** Assembles the key for a mutation batch in WebStorage */
function Io(t, e, n) {
    let s = `firestore_mutations_${t}_${n}`;
    return e.isAuthenticated() && (s += `_${e.uid}`), s;
}

// The format of the WebStorage key that stores a query target's metadata is:
//     firestore_targets_<persistence_prefix>_<target_id>
/** Assembles the key for a query state in WebStorage */
function To(t, e) {
    return `firestore_targets_${t}_${e}`;
}

// The WebStorage prefix that stores the primary tab's online state. The
// format of the key is:
//     firestore_online_state_<persistence_prefix>
/**
 * Holds the state of a mutation batch, including its user ID, batch ID and
 * whether the batch is 'pending', 'acknowledged' or 'rejected'.
 */
// Visible for testing
class Eo {
    constructor(t, e, n, s) {
        this.user = t, this.batchId = e, this.state = n, this.error = s;
    }
    /**
     * Parses a MutationMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */    static Ji(t, e, n) {
        const s = JSON.parse(n);
        let i, r = "object" == typeof s && -1 !== [ "pending", "acknowledged", "rejected" ].indexOf(s.state) && (void 0 === s.error || "object" == typeof s.error);
        return r && s.error && (r = "string" == typeof s.error.message && "string" == typeof s.error.code, 
        r && (i = new Q(s.error.code, s.error.message))), r ? new Eo(t, e, s.state, i) : ($("SharedClientState", `Failed to parse mutation state for ID '${e}': ${n}`), 
        null);
    }
    Yi() {
        const t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }
}

/**
 * Holds the state of a query target, including its target ID and whether the
 * target is 'not-current', 'current' or 'rejected'.
 */
// Visible for testing
class Ao {
    constructor(t, e, n) {
        this.targetId = t, this.state = e, this.error = n;
    }
    /**
     * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */    static Ji(t, e) {
        const n = JSON.parse(e);
        let s, i = "object" == typeof n && -1 !== [ "not-current", "current", "rejected" ].indexOf(n.state) && (void 0 === n.error || "object" == typeof n.error);
        return i && n.error && (i = "string" == typeof n.error.message && "string" == typeof n.error.code, 
        i && (s = new Q(n.error.code, n.error.message))), i ? new Ao(t, n.state, s) : ($("SharedClientState", `Failed to parse target state for ID '${t}': ${e}`), 
        null);
    }
    Yi() {
        const t = {
            state: this.state,
            updateTimeMs: Date.now()
        };
        return this.error && (t.error = {
            code: this.error.code,
            message: this.error.message
        }), JSON.stringify(t);
    }
}

/**
 * This class represents the immutable ClientState for a client read from
 * WebStorage, containing the list of active query targets.
 */ class Ro {
    constructor(t, e) {
        this.clientId = t, this.activeTargetIds = e;
    }
    /**
     * Parses a RemoteClientState from the JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */    static Ji(t, e) {
        const n = JSON.parse(e);
        let s = "object" == typeof n && n.activeTargetIds instanceof Array, i = jn();
        for (let t = 0; s && t < n.activeTargetIds.length; ++t) s = Ct(n.activeTargetIds[t]), 
        i = i.add(n.activeTargetIds[t]);
        return s ? new Ro(t, i) : ($("SharedClientState", `Failed to parse client data for instance '${t}': ${e}`), 
        null);
    }
}

/**
 * This class represents the online state for all clients participating in
 * multi-tab. The online state is only written to by the primary client, and
 * used in secondary clients to update their query views.
 */ class bo {
    constructor(t, e) {
        this.clientId = t, this.onlineState = e;
    }
    /**
     * Parses a SharedOnlineState from its JSON representation in WebStorage.
     * Logs a warning and returns null if the format of the data is not valid.
     */    static Ji(t) {
        const e = JSON.parse(t);
        return "object" == typeof e && -1 !== [ "Unknown", "Online", "Offline" ].indexOf(e.onlineState) && "string" == typeof e.clientId ? new bo(e.clientId, e.onlineState) : ($("SharedClientState", `Failed to parse online state: ${t}`), 
        null);
    }
}

/**
 * Metadata state of the local client. Unlike `RemoteClientState`, this class is
 * mutable and keeps track of all pending mutations, which allows us to
 * update the range of pending mutation batch IDs as new mutations are added or
 * removed.
 *
 * The data in `LocalClientState` is not read from WebStorage and instead
 * updated via its instance methods. The updated state can be serialized via
 * `toWebStorageJSON()`.
 */
// Visible for testing.
class Po {
    constructor() {
        this.activeTargetIds = jn();
    }
    Xi(t) {
        this.activeTargetIds = this.activeTargetIds.add(t);
    }
    Zi(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t);
    }
    /**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */    Yi() {
        const t = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now()
        };
        return JSON.stringify(t);
    }
}

/**
 * `WebStorageSharedClientState` uses WebStorage (window.localStorage) as the
 * backing store for the SharedClientState. It keeps track of all active
 * clients and supports modifications of the local client's data.
 */ class Vo {
    constructor(t, e, n, s, i) {
        this.window = t, this.Hn = e, this.persistenceKey = n, this.tr = s, this.syncEngine = null, 
        this.onlineStateHandler = null, this.sequenceNumberHandler = null, this.er = this.nr.bind(this), 
        this.sr = new Cn(rt), this.started = !1, 
        /**
         * Captures WebStorage events that occur before `start()` is called. These
         * events are replayed once `WebStorageSharedClientState` is started.
         */
        this.ir = [];
        // Escape the special characters mentioned here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        const r = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        this.storage = this.window.localStorage, this.currentUser = i, this.rr = po(this.persistenceKey, this.tr), 
        this.ar = 
        /** Assembles the key for the current sequence number. */
        function(t) {
            return `firestore_sequence_number_${t}`;
        }
        /**
 * @license
 * Copyright 2018 Google LLC
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
 */ (this.persistenceKey), this.sr = this.sr.insert(this.tr, new Po), this.ur = new RegExp(`^firestore_clients_${r}_([^_]*)$`), 
        this.cr = new RegExp(`^firestore_mutations_${r}_(\\d+)(?:_(.*))?$`), this.hr = new RegExp(`^firestore_targets_${r}_(\\d+)$`), 
        this.lr = 
        /** Assembles the key for the online state of the primary tab. */
        function(t) {
            return `firestore_online_state_${t}`;
        }
        // The WebStorage prefix that plays as a event to indicate the remote documents
        // might have changed due to some secondary tabs loading a bundle.
        // format of the key is:
        //     firestore_bundle_loaded_<persistenceKey>
        (this.persistenceKey), this.dr = function(t) {
            return `firestore_bundle_loaded_${t}`;
        }
        // The WebStorage key prefix for the key that stores the last sequence number allocated. The key
        // looks like 'firestore_sequence_number_<persistence_prefix>'.
        (this.persistenceKey), 
        // Rather than adding the storage observer during start(), we add the
        // storage observer during initialization. This ensures that we collect
        // events before other components populate their initial state (during their
        // respective start() calls). Otherwise, we might for example miss a
        // mutation that is added after LocalStore's start() processed the existing
        // mutations but before we observe WebStorage events.
        this.window.addEventListener("storage", this.er);
    }
    /** Returns 'true' if WebStorage is available in the current environment. */    static vt(t) {
        return !(!t || !t.localStorage);
    }
    async start() {
        // Retrieve the list of existing clients to backfill the data in
        // SharedClientState.
        const t = await this.syncEngine.Ms();
        for (const e of t) {
            if (e === this.tr) continue;
            const t = this.getItem(po(this.persistenceKey, e));
            if (t) {
                const n = Ro.Ji(e, t);
                n && (this.sr = this.sr.insert(n.clientId, n));
            }
        }
        this._r();
        // Check if there is an existing online state and call the callback handler
        // if applicable.
        const e = this.storage.getItem(this.lr);
        if (e) {
            const t = this.wr(e);
            t && this.mr(t);
        }
        for (const t of this.ir) this.nr(t);
        this.ir = [], 
        // Register a window unload hook to remove the client metadata entry from
        // WebStorage even if `shutdown()` was not called.
        this.window.addEventListener("pagehide", (() => this.shutdown())), this.started = !0;
    }
    writeSequenceNumber(t) {
        this.setItem(this.ar, JSON.stringify(t));
    }
    getAllActiveQueryTargets() {
        return this.gr(this.sr);
    }
    isActiveQueryTarget(t) {
        let e = !1;
        return this.sr.forEach(((n, s) => {
            s.activeTargetIds.has(t) && (e = !0);
        })), e;
    }
    addPendingMutation(t) {
        this.yr(t, "pending");
    }
    updateMutationState(t, e, n) {
        this.yr(t, e, n), 
        // Once a final mutation result is observed by other clients, they no longer
        // access the mutation's metadata entry. Since WebStorage replays events
        // in order, it is safe to delete the entry right after updating it.
        this.pr(t);
    }
    addLocalQueryTarget(t) {
        let e = "not-current";
        // Lookup an existing query state if the target ID was already registered
        // by another tab
                if (this.isActiveQueryTarget(t)) {
            const n = this.storage.getItem(To(this.persistenceKey, t));
            if (n) {
                const s = Ao.Ji(t, n);
                s && (e = s.state);
            }
        }
        return this.Ir.Xi(t), this._r(), e;
    }
    removeLocalQueryTarget(t) {
        this.Ir.Zi(t), this._r();
    }
    isLocalQueryTarget(t) {
        return this.Ir.activeTargetIds.has(t);
    }
    clearQueryState(t) {
        this.removeItem(To(this.persistenceKey, t));
    }
    updateQueryState(t, e, n) {
        this.Tr(t, e, n);
    }
    handleUserChange(t, e, n) {
        e.forEach((t => {
            this.pr(t);
        })), this.currentUser = t, n.forEach((t => {
            this.addPendingMutation(t);
        }));
    }
    setOnlineState(t) {
        this.Er(t);
    }
    notifyBundleLoaded() {
        this.Ar();
    }
    shutdown() {
        this.started && (this.window.removeEventListener("storage", this.er), this.removeItem(this.rr), 
        this.started = !1);
    }
    getItem(t) {
        const e = this.storage.getItem(t);
        return O("SharedClientState", "READ", t, e), e;
    }
    setItem(t, e) {
        O("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
    }
    removeItem(t) {
        O("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
    }
    nr(t) {
        // Note: The function is typed to take Event to be interface-compatible with
        // `Window.addEventListener`.
        const e = t;
        if (e.storageArea === this.storage) {
            if (O("SharedClientState", "EVENT", e.key, e.newValue), e.key === this.rr) return void $("Received WebStorage notification for local change. Another client might have garbage-collected our state");
            this.Hn.enqueueRetryable((async () => {
                if (this.started) {
                    if (null !== e.key) if (this.ur.test(e.key)) {
                        if (null == e.newValue) {
                            const t = this.Rr(e.key);
                            return this.br(t, null);
                        }
                        {
                            const t = this.Pr(e.key, e.newValue);
                            if (t) return this.br(t.clientId, t);
                        }
                    } else if (this.cr.test(e.key)) {
                        if (null !== e.newValue) {
                            const t = this.Vr(e.key, e.newValue);
                            if (t) return this.vr(t);
                        }
                    } else if (this.hr.test(e.key)) {
                        if (null !== e.newValue) {
                            const t = this.Sr(e.key, e.newValue);
                            if (t) return this.Dr(t);
                        }
                    } else if (e.key === this.lr) {
                        if (null !== e.newValue) {
                            const t = this.wr(e.newValue);
                            if (t) return this.mr(t);
                        }
                    } else if (e.key === this.ar) {
                        const t = function(t) {
                            let e = nt.A;
                            if (null != t) try {
                                const n = JSON.parse(t);
                                q("number" == typeof n), e = n;
                            } catch (t) {
                                $("SharedClientState", "Failed to read sequence number from WebStorage", t);
                            }
                            return e;
                        }
                        /**
 * `MemorySharedClientState` is a simple implementation of SharedClientState for
 * clients using memory persistence. The state in this class remains fully
 * isolated and no synchronization is performed.
 */ (e.newValue);
                        t !== nt.A && this.sequenceNumberHandler(t);
                    } else if (e.key === this.dr) return this.syncEngine.Cr();
                } else this.ir.push(e);
            }));
        }
    }
    get Ir() {
        return this.sr.get(this.tr);
    }
    _r() {
        this.setItem(this.rr, this.Ir.Yi());
    }
    yr(t, e, n) {
        const s = new Eo(this.currentUser, t, e, n), i = Io(this.persistenceKey, this.currentUser, t);
        this.setItem(i, s.Yi());
    }
    pr(t) {
        const e = Io(this.persistenceKey, this.currentUser, t);
        this.removeItem(e);
    }
    Er(t) {
        const e = {
            clientId: this.tr,
            onlineState: t
        };
        this.storage.setItem(this.lr, JSON.stringify(e));
    }
    Tr(t, e, n) {
        const s = To(this.persistenceKey, t), i = new Ao(t, e, n);
        this.setItem(s, i.Yi());
    }
    Ar() {
        this.setItem(this.dr, "value-not-used");
    }
    /**
     * Parses a client state key in WebStorage. Returns null if the key does not
     * match the expected key format.
     */    Rr(t) {
        const e = this.ur.exec(t);
        return e ? e[1] : null;
    }
    /**
     * Parses a client state in WebStorage. Returns 'null' if the value could not
     * be parsed.
     */    Pr(t, e) {
        const n = this.Rr(t);
        return Ro.Ji(n, e);
    }
    /**
     * Parses a mutation batch state in WebStorage. Returns 'null' if the value
     * could not be parsed.
     */    Vr(t, e) {
        const n = this.cr.exec(t), s = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
        return Eo.Ji(new C(i), s, e);
    }
    /**
     * Parses a query target state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */    Sr(t, e) {
        const n = this.hr.exec(t), s = Number(n[1]);
        return Ao.Ji(s, e);
    }
    /**
     * Parses an online state from WebStorage. Returns 'null' if the value
     * could not be parsed.
     */    wr(t) {
        return bo.Ji(t);
    }
    async vr(t) {
        if (t.user.uid === this.currentUser.uid) return this.syncEngine.Nr(t.batchId, t.state, t.error);
        O("SharedClientState", `Ignoring mutation for non-active user ${t.user.uid}`);
    }
    Dr(t) {
        return this.syncEngine.kr(t.targetId, t.state, t.error);
    }
    br(t, e) {
        const n = e ? this.sr.insert(t, e) : this.sr.remove(t), s = this.gr(this.sr), i = this.gr(n), r = [], o = [];
        return i.forEach((t => {
            s.has(t) || r.push(t);
        })), s.forEach((t => {
            i.has(t) || o.push(t);
        })), this.syncEngine.Mr(r, o).then((() => {
            this.sr = n;
        }));
    }
    mr(t) {
        // We check whether the client that wrote this online state is still active
        // by comparing its client ID to the list of clients kept active in
        // IndexedDb. If a client does not update their IndexedDb client state
        // within 5 seconds, it is considered inactive and we don't emit an online
        // state event.
        this.sr.get(t.clientId) && this.onlineStateHandler(t.onlineState);
    }
    gr(t) {
        let e = jn();
        return t.forEach(((t, n) => {
            e = e.unionWith(n.activeTargetIds);
        })), e;
    }
}

class vo {
    constructor() {
        this.Or = new Po, this.$r = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
    }
    addPendingMutation(t) {
        // No op.
    }
    updateMutationState(t, e, n) {
        // No op.
    }
    addLocalQueryTarget(t) {
        return this.Or.Xi(t), this.$r[t] || "not-current";
    }
    updateQueryState(t, e, n) {
        this.$r[t] = e;
    }
    removeLocalQueryTarget(t) {
        this.Or.Zi(t);
    }
    isLocalQueryTarget(t) {
        return this.Or.activeTargetIds.has(t);
    }
    clearQueryState(t) {
        delete this.$r[t];
    }
    getAllActiveQueryTargets() {
        return this.Or.activeTargetIds;
    }
    isActiveQueryTarget(t) {
        return this.Or.activeTargetIds.has(t);
    }
    start() {
        return this.Or = new Po, Promise.resolve();
    }
    handleUserChange(t, e, n) {
        // No op.
    }
    setOnlineState(t) {
        // No op.
    }
    shutdown() {}
    writeSequenceNumber(t) {}
    notifyBundleLoaded() {
        // No op.
    }
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
 */ class So {
    Fr(t) {
        // No-op.
    }
    shutdown() {
        // No-op.
    }
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
// References to `window` are guarded by BrowserConnectivityMonitor.isAvailable()
/* eslint-disable no-restricted-globals */
/**
 * Browser implementation of ConnectivityMonitor.
 */
class Do {
    constructor() {
        this.Br = () => this.Lr(), this.qr = () => this.Ur(), this.Kr = [], this.Gr();
    }
    Fr(t) {
        this.Kr.push(t);
    }
    shutdown() {
        window.removeEventListener("online", this.Br), window.removeEventListener("offline", this.qr);
    }
    Gr() {
        window.addEventListener("online", this.Br), window.addEventListener("offline", this.qr);
    }
    Lr() {
        O("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (const t of this.Kr) t(0 /* AVAILABLE */);
    }
    Ur() {
        O("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (const t of this.Kr) t(1 /* UNAVAILABLE */);
    }
    // TODO(chenbrian): Consider passing in window either into this component or
    // here for testing via FakeWindow.
    /** Checks that all used attributes of window are available. */
    static vt() {
        return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
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
 */ const Co = {
    BatchGetDocuments: "batchGet",
    Commit: "commit",
    RunQuery: "runQuery"
};

/**
 * Maps RPC names to the corresponding REST endpoint name.
 *
 * We use array notation to avoid mangling.
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
/**
 * Provides a simple helper class that implements the Stream interface to
 * bridge to other implementations that are streams but do not implement the
 * interface. The stream callbacks are invoked with the callOn... methods.
 */
class xo {
    constructor(t) {
        this.Qr = t.Qr, this.jr = t.jr;
    }
    Wr(t) {
        this.zr = t;
    }
    Hr(t) {
        this.Jr = t;
    }
    onMessage(t) {
        this.Yr = t;
    }
    close() {
        this.jr();
    }
    send(t) {
        this.Qr(t);
    }
    Xr() {
        this.zr();
    }
    Zr(t) {
        this.Jr(t);
    }
    eo(t) {
        this.Yr(t);
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
 */ class No extends 
/**
 * Base class for all Rest-based connections to the backend (WebChannel and
 * HTTP).
 */
class {
    constructor(t) {
        this.databaseInfo = t, this.databaseId = t.databaseId;
        const e = t.ssl ? "https" : "http";
        this.no = e + "://" + t.host, this.so = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
    }
    io(t, e, n, s, i) {
        const r = this.ro(t, e);
        O("RestConnection", "Sending: ", r, n);
        const o = {};
        return this.oo(o, s, i), this.ao(t, r, o, n).then((t => (O("RestConnection", "Received: ", t), 
        t)), (e => {
            throw F("RestConnection", `${t} failed with error: `, e, "url: ", r, "request:", n), 
            e;
        }));
    }
    uo(t, e, n, s, i) {
        // The REST API automatically aggregates all of the streamed results, so we
        // can just use the normal invoke() method.
        return this.io(t, e, n, s, i);
    }
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */    oo(t, e, n) {
        t["X-Goog-Api-Client"] = "gl-js/ fire/" + x, 
        // Content-Type: text/plain will avoid preflight requests which might
        // mess with CORS and redirects by proxies. If we add custom headers
        // we will need to change this code to potentially use the $httpOverwrite
        // parameter supported by ESF to avoid triggering preflight requests.
        t["Content-Type"] = "text/plain", this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId), 
        e && e.headers.forEach(((e, n) => t[n] = e)), n && n.headers.forEach(((e, n) => t[n] = e));
    }
    ro(t, e) {
        const n = Co[t];
        return `${this.no}/v1/${e}:${n}`;
    }
} {
    constructor(t) {
        super(t), this.forceLongPolling = t.forceLongPolling, this.autoDetectLongPolling = t.autoDetectLongPolling, 
        this.useFetchStreams = t.useFetchStreams;
    }
    ao(t, e, n, s) {
        return new Promise(((i, r) => {
            const o = new XhrIo;
            o.listenOnce(EventType.COMPLETE, (() => {
                try {
                    switch (o.getLastErrorCode()) {
                      case ErrorCode.NO_ERROR:
                        const e = o.getResponseJson();
                        O("Connection", "XHR received:", JSON.stringify(e)), i(e);
                        break;

                      case ErrorCode.TIMEOUT:
                        O("Connection", 'RPC "' + t + '" timed out'), r(new Q(G.DEADLINE_EXCEEDED, "Request time out"));
                        break;

                      case ErrorCode.HTTP_ERROR:
                        const n = o.getStatus();
                        if (O("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", o.getResponseText()), 
                        n > 0) {
                            const t = o.getResponseJson().error;
                            if (t && t.status && t.message) {
                                const e = function(t) {
                                    const e = t.toLowerCase().replace(/_/g, "-");
                                    return Object.values(G).indexOf(e) >= 0 ? e : G.UNKNOWN;
                                }(t.status);
                                r(new Q(e, t.message));
                            } else r(new Q(G.UNKNOWN, "Server responded with status " + o.getStatus()));
                        } else 
                        // If we received an HTTP_ERROR but there's no status code,
                        // it's most probably a connection issue
                        r(new Q(G.UNAVAILABLE, "Connection failed."));
                        break;

                      default:
                        L();
                    }
                } finally {
                    O("Connection", 'RPC "' + t + '" completed.');
                }
            }));
            const a = JSON.stringify(s);
            o.send(e, "POST", a, n, 15);
        }));
    }
    co(t, e, n) {
        const s = [ this.no, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], i = createWebChannelTransport(), r = getStatEventTarget(), o = {
            // Required for backend stickiness, routing behavior is based on this
            // parameter.
            httpSessionIdParam: "gsessionid",
            initMessageHeaders: {},
            messageUrlParams: {
                // This param is used to improve routing and project isolation by the
                // backend and must be included in every request.
                database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
            },
            sendRawJson: !0,
            supportsCrossDomainXhr: !0,
            internalChannelParams: {
                // Override the default timeout (randomized between 10-20 seconds) since
                // a large write batch on a slow internet connection may take a long
                // time to send to the backend. Rather than have WebChannel impose a
                // tight timeout which could lead to infinite timeouts and retries, we
                // set it very large (5-10 minutes) and rely on the browser's builtin
                // timeouts to kick in if the request isn't working.
                forwardChannelRequestTimeoutMs: 6e5
            },
            forceLongPolling: this.forceLongPolling,
            detectBufferingProxy: this.autoDetectLongPolling
        };
        this.useFetchStreams && (o.xmlHttpFactory = new FetchXmlHttpFactory({})), this.oo(o.initMessageHeaders, e, n), 
        // Sending the custom headers we just added to request.initMessageHeaders
        // (Authorization, etc.) will trigger the browser to make a CORS preflight
        // request because the XHR will no longer meet the criteria for a "simple"
        // CORS request:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
        // Therefore to avoid the CORS preflight request (an extra network
        // roundtrip), we use the httpHeadersOverwriteParam option to specify that
        // the headers should instead be encoded into a special "$httpHeaders" query
        // parameter, which is recognized by the webchannel backend. This is
        // formally defined here:
        // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
        // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
        // doesn't have an Origin header. So we have to exclude a few browser environments that are
        // known to (sometimes) not include an Origin. See
        // https://github.com/firebase/firebase-js-sdk/issues/1491.
        isMobileCordova() || isReactNative() || isElectron() || isIE() || isUWP() || isBrowserExtension() || (o.httpHeadersOverwriteParam = "$httpHeaders");
        const a = s.join("");
        O("Connection", "Creating WebChannel: " + a, o);
        const u = i.createWebChannel(a, o);
        // WebChannel supports sending the first message with the handshake - saving
        // a network round trip. However, it will have to call send in the same
        // JS event loop as open. In order to enforce this, we delay actually
        // opening the WebChannel until send is called. Whether we have called
        // open is tracked with this variable.
                let c = !1, h = !1;
        // A flag to determine whether the stream was closed (by us or through an
        // error/close event) to avoid delivering multiple close events or sending
        // on a closed stream
                const l = new xo({
            Qr: t => {
                h ? O("Connection", "Not sending because WebChannel is closed:", t) : (c || (O("Connection", "Opening WebChannel transport."), 
                u.open(), c = !0), O("Connection", "WebChannel sending:", t), u.send(t));
            },
            jr: () => u.close()
        }), y = (t, e, n) => {
            // TODO(dimond): closure typing seems broken because WebChannel does
            // not implement goog.events.Listenable
            t.listen(e, (t => {
                try {
                    n(t);
                } catch (t) {
                    setTimeout((() => {
                        throw t;
                    }), 0);
                }
            }));
        };
        // Closure events are guarded and exceptions are swallowed, so catch any
        // exception and rethrow using a setTimeout so they become visible again.
        // Note that eventually this function could go away if we are confident
        // enough the code is exception free.
                return y(u, WebChannel.EventType.OPEN, (() => {
            h || O("Connection", "WebChannel transport opened.");
        })), y(u, WebChannel.EventType.CLOSE, (() => {
            h || (h = !0, O("Connection", "WebChannel transport closed"), l.Zr());
        })), y(u, WebChannel.EventType.ERROR, (t => {
            h || (h = !0, F("Connection", "WebChannel transport errored:", t), l.Zr(new Q(G.UNAVAILABLE, "The operation could not be completed")));
        })), y(u, WebChannel.EventType.MESSAGE, (t => {
            var e;
            if (!h) {
                const n = t.data[0];
                q(!!n);
                // TODO(b/35143891): There is a bug in One Platform that caused errors
                // (and only errors) to be wrapped in an extra array. To be forward
                // compatible with the bug we need to check either condition. The latter
                // can be removed once the fix has been rolled out.
                // Use any because msgData.error is not typed.
                const s = n, i = s.error || (null === (e = s[0]) || void 0 === e ? void 0 : e.error);
                if (i) {
                    O("Connection", "WebChannel received error:", i);
                    // error.status will be a string like 'OK' or 'NOT_FOUND'.
                    const t = i.status;
                    let e = 
                    /**
 * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
 *
 * @returns The Code equivalent to the given status string or undefined if
 *     there is no match.
 */
                    function(t) {
                        // lookup by string
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const e = Pn[t];
                        if (void 0 !== e) return Sn(e);
                    }(t), n = i.message;
                    void 0 === e && (e = G.INTERNAL, n = "Unknown error status: " + t + " with message " + i.message), 
                    // Mark closed so no further events are propagated
                    h = !0, l.Zr(new Q(e, n)), u.close();
                } else O("Connection", "WebChannel received:", n), l.eo(n);
            }
        })), y(r, Event.STAT_EVENT, (t => {
            t.stat === Stat.PROXY ? O("Connection", "Detected buffering proxy") : t.stat === Stat.NOPROXY && O("Connection", "Detected no buffering proxy");
        })), setTimeout((() => {
            // Technically we could/should wait for the WebChannel opened event,
            // but because we want to send the first message with the WebChannel
            // handshake we pretend the channel opened here (asynchronously), and
            // then delay the actual open until the first message is sent.
            l.Xr();
        }), 0), l;
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
/** Initializes the WebChannelConnection for the browser. */
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
/** The Platform's 'window' implementation or null if not available. */
function ko() {
    // `window` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof window ? window : null;
}

/** The Platform's 'document' implementation or null if not available. */ function Mo() {
    // `document` is not always available, e.g. in ReactNative and WebWorkers.
    // eslint-disable-next-line no-restricted-globals
    return "undefined" != typeof document ? document : null;
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
 */ function Oo(t) {
    return new is(t, /* useProto3Json= */ !0);
}

/**
 * An instance of the Platform's 'TextEncoder' implementation.
 */
/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */
class $o {
    constructor(
    /**
     * The AsyncQueue to run backoff operations on.
     */
    t, 
    /**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */
    e, 
    /**
     * The initial delay (used as the base delay on the first retry attempt).
     * Note that jitter will still be applied, so the actual delay could be as
     * little as 0.5*initialDelayMs.
     */
    n = 1e3
    /**
     * The multiplier to use to determine the extended base delay after each
     * attempt.
     */ , s = 1.5
    /**
     * The maximum base delay after which no further backoff is performed.
     * Note that jitter will still be applied, so the actual delay could be as
     * much as 1.5*maxDelayMs.
     */ , i = 6e4) {
        this.Hn = t, this.timerId = e, this.ho = n, this.lo = s, this.fo = i, this._o = 0, 
        this.wo = null, 
        /** The last backoff attempt, as epoch milliseconds. */
        this.mo = Date.now(), this.reset();
    }
    /**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */    reset() {
        this._o = 0;
    }
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */    yo() {
        this._o = this.fo;
    }
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */    po(t) {
        // Cancel any pending backoff operation.
        this.cancel();
        // First schedule using the current base (which may be 0 and should be
        // honored as such).
        const e = Math.floor(this._o + this.Io()), n = Math.max(0, Date.now() - this.mo), s = Math.max(0, e - n);
        // Guard against lastAttemptTime being in the future due to a clock change.
                s > 0 && O("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this._o} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`), 
        this.wo = this.Hn.enqueueAfterDelay(this.timerId, s, (() => (this.mo = Date.now(), 
        t()))), 
        // Apply backoff factor to determine next delay and ensure it is within
        // bounds.
        this._o *= this.lo, this._o < this.ho && (this._o = this.ho), this._o > this.fo && (this._o = this.fo);
    }
    To() {
        null !== this.wo && (this.wo.skipDelay(), this.wo = null);
    }
    cancel() {
        null !== this.wo && (this.wo.cancel(), this.wo = null);
    }
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    Io() {
        return (Math.random() - .5) * this._o;
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
 * A PersistentStream is an abstract base class that represents a streaming RPC
 * to the Firestore backend. It's built on top of the connections own support
 * for streaming RPCs, and adds several critical features for our clients:
 *
 *   - Exponential backoff on failure
 *   - Authentication via CredentialsProvider
 *   - Dispatching all callbacks into the shared worker queue
 *   - Closing idle streams after 60 seconds of inactivity
 *
 * Subclasses of PersistentStream implement serialization of models to and
 * from the JSON representation of the protocol buffers for a specific
 * streaming RPC.
 *
 * ## Starting and Stopping
 *
 * Streaming RPCs are stateful and need to be start()ed before messages can
 * be sent and received. The PersistentStream will call the onOpen() function
 * of the listener once the stream is ready to accept requests.
 *
 * Should a start() fail, PersistentStream will call the registered onClose()
 * listener with a FirestoreError indicating what went wrong.
 *
 * A PersistentStream can be started and stopped repeatedly.
 *
 * Generic types:
 *  SendType: The type of the outgoing message of the underlying
 *    connection stream
 *  ReceiveType: The type of the incoming message of the underlying
 *    connection stream
 *  ListenerType: The type of the listener that will be used for callbacks
 */
class Fo {
    constructor(t, e, n, s, i, r, o, a) {
        this.Hn = t, this.Eo = n, this.Ao = s, this.Ro = i, this.authCredentialsProvider = r, 
        this.appCheckCredentialsProvider = o, this.listener = a, this.state = 0 /* Initial */ , 
        /**
         * A close count that's incremented every time the stream is closed; used by
         * getCloseGuardedDispatcher() to invalidate callbacks that happen after
         * close.
         */
        this.bo = 0, this.Po = null, this.Vo = null, this.stream = null, this.vo = new $o(t, e);
    }
    /**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */    So() {
        return 1 /* Starting */ === this.state || 5 /* Backoff */ === this.state || this.Do();
    }
    /**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */    Do() {
        return 2 /* Open */ === this.state || 3 /* Healthy */ === this.state;
    }
    /**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */    start() {
        4 /* Error */ !== this.state ? this.auth() : this.Co();
    }
    /**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */    async stop() {
        this.So() && await this.close(0 /* Initial */);
    }
    /**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */    xo() {
        this.state = 0 /* Initial */ , this.vo.reset();
    }
    /**
     * Marks this stream as idle. If no further actions are performed on the
     * stream for one minute, the stream will automatically close itself and
     * notify the stream's onClose() handler with Status.OK. The stream will then
     * be in a !isStarted() state, requiring the caller to start the stream again
     * before further use.
     *
     * Only streams that are in state 'Open' can be marked idle, as all other
     * states imply pending network operations.
     */    No() {
        // Starts the idle time if we are in state 'Open' and are not yet already
        // running a timer (in which case the previous idle timeout still applies).
        this.Do() && null === this.Po && (this.Po = this.Hn.enqueueAfterDelay(this.Eo, 6e4, (() => this.ko())));
    }
    /** Sends a message to the underlying stream. */    Mo(t) {
        this.Oo(), this.stream.send(t);
    }
    /** Called by the idle timer when the stream should close due to inactivity. */    async ko() {
        if (this.Do()) 
        // When timing out an idle stream there's no reason to force the stream into backoff when
        // it restarts so set the stream state to Initial instead of Error.
        return this.close(0 /* Initial */);
    }
    /** Marks the stream as active again. */    Oo() {
        this.Po && (this.Po.cancel(), this.Po = null);
    }
    /** Cancels the health check delayed operation. */    $o() {
        this.Vo && (this.Vo.cancel(), this.Vo = null);
    }
    /**
     * Closes the stream and cleans up as necessary:
     *
     * * closes the underlying GRPC stream;
     * * calls the onClose handler with the given 'error';
     * * sets internal stream state to 'finalState';
     * * adjusts the backoff timer based on the error
     *
     * A new stream can be opened by calling start().
     *
     * @param finalState - the intended state of the stream after closing.
     * @param error - the error the connection was closed with.
     */    async close(t, e) {
        // Cancel any outstanding timers (they're guaranteed not to execute).
        this.Oo(), this.$o(), this.vo.cancel(), 
        // Invalidates any stream-related callbacks (e.g. from auth or the
        // underlying stream), guaranteeing they won't execute.
        this.bo++, 4 /* Error */ !== t ? 
        // If this is an intentional close ensure we don't delay our next connection attempt.
        this.vo.reset() : e && e.code === G.RESOURCE_EXHAUSTED ? (
        // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
        $(e.toString()), $("Using maximum backoff delay to prevent overloading the backend."), 
        this.vo.yo()) : e && e.code === G.UNAUTHENTICATED && 3 /* Healthy */ !== this.state && (
        // "unauthenticated" error means the token was rejected. This should rarely
        // happen since both Auth and AppCheck ensure a sufficient TTL when we
        // request a token. If a user manually resets their system clock this can
        // fail, however. In this case, we should get a Code.UNAUTHENTICATED error
        // before we received the first message and we need to invalidate the token
        // to ensure that we fetch a new token.
        this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), 
        // Clean up the underlying stream because we are no longer interested in events.
        null !== this.stream && (this.Fo(), this.stream.close(), this.stream = null), 
        // This state must be assigned before calling onClose() to allow the callback to
        // inhibit backoff or otherwise manipulate the state in its non-started state.
        this.state = t, 
        // Notify the listener that the stream closed.
        await this.listener.Hr(e);
    }
    /**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */    Fo() {}
    auth() {
        this.state = 1 /* Starting */;
        const t = this.Bo(this.bo), e = this.bo;
        // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                Promise.all([ this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken() ]).then((([t, n]) => {
            // Stream can be stopped while waiting for authentication.
            // TODO(mikelehen): We really should just use dispatchIfNotClosed
            // and let this dispatch onto the queue, but that opened a spec test can
            // of worms that I don't want to deal with in this PR.
            this.bo === e && 
            // Normally we'd have to schedule the callback on the AsyncQueue.
            // However, the following calls are safe to be called outside the
            // AsyncQueue since they don't chain asynchronous calls
            this.Lo(t, n);
        }), (e => {
            t((() => {
                const t = new Q(G.UNKNOWN, "Fetching auth token failed: " + e.message);
                return this.qo(t);
            }));
        }));
    }
    Lo(t, e) {
        const n = this.Bo(this.bo);
        this.stream = this.Uo(t, e), this.stream.Wr((() => {
            n((() => (this.state = 2 /* Open */ , this.Vo = this.Hn.enqueueAfterDelay(this.Ao, 1e4, (() => (this.Do() && (this.state = 3 /* Healthy */), 
            Promise.resolve()))), this.listener.Wr())));
        })), this.stream.Hr((t => {
            n((() => this.qo(t)));
        })), this.stream.onMessage((t => {
            n((() => this.onMessage(t)));
        }));
    }
    Co() {
        this.state = 5 /* Backoff */ , this.vo.po((async () => {
            this.state = 0 /* Initial */ , this.start();
        }));
    }
    // Visible for tests
    qo(t) {
        // In theory the stream could close cleanly, however, in our current model
        // we never expect this to happen because if we stop a stream ourselves,
        // this callback will never be called. To prevent cases where we retry
        // without a backoff accidentally, we set the stream to error in all cases.
        return O("PersistentStream", `close with error: ${t}`), this.stream = null, this.close(4 /* Error */ , t);
    }
    /**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */    Bo(t) {
        return e => {
            this.Hn.enqueueAndForget((() => this.bo === t ? e() : (O("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
            Promise.resolve())));
        };
    }
}

/**
 * A PersistentStream that implements the Listen RPC.
 *
 * Once the Listen stream has called the onOpen() listener, any number of
 * listen() and unlisten() calls can be made to control what changes will be
 * sent from the server for ListenResponses.
 */ class Bo extends Fo {
    constructor(t, e, n, s, i, r) {
        super(t, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , "health_check_timeout" /* HealthCheckTimeout */ , e, n, s, r), 
        this.M = i;
    }
    Uo(t, e) {
        return this.Ro.co("Listen", t, e);
    }
    onMessage(t) {
        // A successful response means the stream is healthy
        this.vo.reset();
        const e = Is(this.M, t), n = function(t) {
            // We have only reached a consistent snapshot for the entire stream if there
            // is a read_time set and it applies to all targets (i.e. the list of
            // targets is empty). The backend is guaranteed to send such responses.
            if (!("targetChange" in t)) return ct.min();
            const e = t.targetChange;
            return e.targetIds && e.targetIds.length ? ct.min() : e.readTime ? us(e.readTime) : ct.min();
        }(t);
        return this.listener.Ko(e, n);
    }
    /**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */    Go(t) {
        const e = {};
        e.database = ws(this.M), e.addTarget = function(t, e) {
            let n;
            const s = e.target;
            return n = fe(s) ? {
                documents: Rs(t, s)
            } : {
                query: bs(t, s)
            }, n.targetId = e.targetId, e.resumeToken.approximateByteSize() > 0 ? n.resumeToken = os(t, e.resumeToken) : e.snapshotVersion.compareTo(ct.min()) > 0 && (
            // TODO(wuandy): Consider removing above check because it is most likely true.
            // Right now, many tests depend on this behaviour though (leaving min() out
            // of serialization).
            n.readTime = rs(t, e.snapshotVersion.toTimestamp())), n;
        }(this.M, t);
        const n = Vs(this.M, t);
        n && (e.labels = n), this.Mo(e);
    }
    /**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */    Qo(t) {
        const e = {};
        e.database = ws(this.M), e.removeTarget = t, this.Mo(e);
    }
}

/**
 * A Stream that implements the Write RPC.
 *
 * The Write RPC requires the caller to maintain special streamToken
 * state in between calls, to help the server understand which responses the
 * client has processed by the time the next request is made. Every response
 * will contain a streamToken; this value must be passed to the next
 * request.
 *
 * After calling start() on this stream, the next request must be a handshake,
 * containing whatever streamToken is on hand. Once a response to this
 * request is received, all pending mutations may be submitted. When
 * submitting multiple batches of mutations at the same time, it's
 * okay to use the same streamToken for the calls to writeMutations.
 *
 * TODO(b/33271235): Use proto types
 */ class Lo extends Fo {
    constructor(t, e, n, s, i, r) {
        super(t, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , "health_check_timeout" /* HealthCheckTimeout */ , e, n, s, r), 
        this.M = i, this.jo = !1;
    }
    /**
     * Tracks whether or not a handshake has been successfully exchanged and
     * the stream is ready to accept mutations.
     */    get Wo() {
        return this.jo;
    }
    // Override of PersistentStream.start
    start() {
        this.jo = !1, this.lastStreamToken = void 0, super.start();
    }
    Fo() {
        this.jo && this.zo([]);
    }
    Uo(t, e) {
        return this.Ro.co("Write", t, e);
    }
    onMessage(t) {
        if (
        // Always capture the last stream token.
        q(!!t.streamToken), this.lastStreamToken = t.streamToken, this.jo) {
            // A successful first write response means the stream is healthy,
            // Note, that we could consider a successful handshake healthy, however,
            // the write itself might be causing an error we want to back off from.
            this.vo.reset();
            const e = As(t.writeResults, t.commitTime), n = us(t.commitTime);
            return this.listener.Ho(n, e);
        }
        // The first response is always the handshake response
        return q(!t.writeResults || 0 === t.writeResults.length), this.jo = !0, this.listener.Jo();
    }
    /**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */    Yo() {
        // TODO(dimond): Support stream resumption. We intentionally do not set the
        // stream token on the handshake, ignoring any stream token we might have.
        const t = {};
        t.database = ws(this.M), this.Mo(t);
    }
    /** Sends a group of mutations to the Firestore backend to apply. */    zo(t) {
        const e = {
            streamToken: this.lastStreamToken,
            writes: t.map((t => Ts(this.M, t)))
        };
        this.Mo(e);
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
 * Datastore and its related methods are a wrapper around the external Google
 * Cloud Datastore grpc API, which provides an interface that is more convenient
 * for the rest of the client SDK architecture to consume.
 */
/**
 * An implementation of Datastore that exposes additional state for internal
 * consumption.
 */
class qo extends class {} {
    constructor(t, e, n, s) {
        super(), this.authCredentials = t, this.appCheckCredentials = e, this.Ro = n, this.M = s, 
        this.Xo = !1;
    }
    Zo() {
        if (this.Xo) throw new Q(G.FAILED_PRECONDITION, "The client has already been terminated.");
    }
    /** Invokes the provided RPC with auth and AppCheck tokens. */    io(t, e, n) {
        return this.Zo(), Promise.all([ this.authCredentials.getToken(), this.appCheckCredentials.getToken() ]).then((([s, i]) => this.Ro.io(t, e, n, s, i))).catch((t => {
            throw "FirebaseError" === t.name ? (t.code === G.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), 
            this.appCheckCredentials.invalidateToken()), t) : new Q(G.UNKNOWN, t.toString());
        }));
    }
    /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */    uo(t, e, n) {
        return this.Zo(), Promise.all([ this.authCredentials.getToken(), this.appCheckCredentials.getToken() ]).then((([s, i]) => this.Ro.uo(t, e, n, s, i))).catch((t => {
            throw "FirebaseError" === t.name ? (t.code === G.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), 
            this.appCheckCredentials.invalidateToken()), t) : new Q(G.UNKNOWN, t.toString());
        }));
    }
    terminate() {
        this.Xo = !0;
    }
}

// TODO(firestorexp): Make sure there is only one Datastore instance per
// firestore-exp client.
/**
 * A component used by the RemoteStore to track the OnlineState (that is,
 * whether or not the client as a whole should be considered to be online or
 * offline), implementing the appropriate heuristics.
 *
 * In particular, when the client is trying to connect to the backend, we
 * allow up to MAX_WATCH_STREAM_FAILURES within ONLINE_STATE_TIMEOUT_MS for
 * a connection to succeed. If we have too many failures or the timeout elapses,
 * then we set the OnlineState to Offline, and the client will behave as if
 * it is offline (get()s will return cached data, etc.).
 */
class Uo {
    constructor(t, e) {
        this.asyncQueue = t, this.onlineStateHandler = e, 
        /** The current OnlineState. */
        this.state = "Unknown" /* Unknown */ , 
        /**
         * A count of consecutive failures to open the stream. If it reaches the
         * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
         * Offline.
         */
        this.ta = 0, 
        /**
         * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
         * transition from OnlineState.Unknown to OnlineState.Offline without waiting
         * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
         */
        this.ea = null, 
        /**
         * Whether the client should log a warning message if it fails to connect to
         * the backend (initially true, cleared after a successful stream, or if we've
         * logged the message already).
         */
        this.na = !0;
    }
    /**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */    sa() {
        0 === this.ta && (this.ia("Unknown" /* Unknown */), this.ea = this.asyncQueue.enqueueAfterDelay("online_state_timeout" /* OnlineStateTimeout */ , 1e4, (() => (this.ea = null, 
        this.ra("Backend didn't respond within 10 seconds."), this.ia("Offline" /* Offline */), 
        Promise.resolve()))));
    }
    /**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */    oa(t) {
        "Online" /* Online */ === this.state ? this.ia("Unknown" /* Unknown */) : (this.ta++, 
        this.ta >= 1 && (this.aa(), this.ra(`Connection failed 1 times. Most recent error: ${t.toString()}`), 
        this.ia("Offline" /* Offline */)));
    }
    /**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */    set(t) {
        this.aa(), this.ta = 0, "Online" /* Online */ === t && (
        // We've connected to watch at least once. Don't warn the developer
        // about being offline going forward.
        this.na = !1), this.ia(t);
    }
    ia(t) {
        t !== this.state && (this.state = t, this.onlineStateHandler(t));
    }
    ra(t) {
        const e = `Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
        this.na ? ($(e), this.na = !1) : O("OnlineStateTracker", e);
    }
    aa() {
        null !== this.ea && (this.ea.cancel(), this.ea = null);
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
 */ class Ko {
    constructor(
    /**
     * The local store, used to fill the write pipeline with outbound mutations.
     */
    t, 
    /** The client-side proxy for interacting with the backend. */
    e, n, s, i) {
        this.localStore = t, this.datastore = e, this.asyncQueue = n, this.remoteSyncer = {}, 
        /**
         * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
         * LocalStore via fillWritePipeline() and have or will send to the write
         * stream.
         *
         * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
         * restart the write stream. When the stream is established the writes in the
         * pipeline will be sent in order.
         *
         * Writes remain in writePipeline until they are acknowledged by the backend
         * and thus will automatically be re-sent if the stream is interrupted /
         * restarted before they're acknowledged.
         *
         * Write responses from the backend are linked to their originating request
         * purely based on order, and so we can just shift() writes from the front of
         * the writePipeline as we receive responses.
         */
        this.ua = [], 
        /**
         * A mapping of watched targets that the client cares about tracking and the
         * user has explicitly called a 'listen' for this target.
         *
         * These targets may or may not have been sent to or acknowledged by the
         * server. On re-establishing the listen stream, these targets should be sent
         * to the server. The targets removed with unlistens are removed eagerly
         * without waiting for confirmation from the listen stream.
         */
        this.ca = new Map, 
        /**
         * A set of reasons for why the RemoteStore may be offline. If empty, the
         * RemoteStore may start its network connections.
         */
        this.ha = new Set, 
        /**
         * Event handlers that get called when the network is disabled or enabled.
         *
         * PORTING NOTE: These functions are used on the Web client to create the
         * underlying streams (to support tree-shakeable streams). On Android and iOS,
         * the streams are created during construction of RemoteStore.
         */
        this.la = [], this.fa = i, this.fa.Fr((t => {
            n.enqueueAndForget((async () => {
                // Porting Note: Unlike iOS, `restartNetwork()` is called even when the
                // network becomes unreachable as we don't have any other way to tear
                // down our streams.
                Xo(this) && (O("RemoteStore", "Restarting streams for network reachability change."), 
                await async function(t) {
                    const e = K(t);
                    e.ha.add(4 /* ConnectivityChange */), await Qo(e), e.da.set("Unknown" /* Unknown */), 
                    e.ha.delete(4 /* ConnectivityChange */), await Go(e);
                }(this));
            }));
        })), this.da = new Uo(n, s);
    }
}

async function Go(t) {
    if (Xo(t)) for (const e of t.la) await e(/* enabled= */ !0);
}

/**
 * Temporarily disables the network. The network can be re-enabled using
 * enableNetwork().
 */ async function Qo(t) {
    for (const e of t.la) await e(/* enabled= */ !1);
}

/**
 * Starts new listen for the given target. Uses resume token if provided. It
 * is a no-op if the target of given `TargetData` is already being listened to.
 */
function jo(t, e) {
    const n = K(t);
    n.ca.has(e.targetId) || (
    // Mark this as something the client is currently listening for.
    n.ca.set(e.targetId, e), Yo(n) ? 
    // The listen will be sent in onWatchStreamOpen
    Jo(n) : ma(n).Do() && zo(n, e));
}

/**
 * Removes the listen from server. It is a no-op if the given target id is
 * not being listened to.
 */ function Wo(t, e) {
    const n = K(t), s = ma(n);
    n.ca.delete(e), s.Do() && Ho(n, e), 0 === n.ca.size && (s.Do() ? s.No() : Xo(n) && 
    // Revert to OnlineState.Unknown if the watch stream is not open and we
    // have no listeners, since without any listens to send we cannot
    // confirm if the stream is healthy and upgrade to OnlineState.Online.
    n.da.set("Unknown" /* Unknown */));
}

/**
 * We need to increment the the expected number of pending responses we're due
 * from watch so we wait for the ack to process any messages from this target.
 */ function zo(t, e) {
    t._a.Z(e.targetId), ma(t).Go(e);
}

/**
 * We need to increment the expected number of pending responses we're due
 * from watch so we wait for the removal on the server before we process any
 * messages from this target.
 */ function Ho(t, e) {
    t._a.Z(e), ma(t).Qo(e);
}

function Jo(t) {
    t._a = new Zn({
        getRemoteKeysForTarget: e => t.remoteSyncer.getRemoteKeysForTarget(e),
        Et: e => t.ca.get(e) || null
    }), ma(t).start(), t.da.sa();
}

/**
 * Returns whether the watch stream should be started because it's necessary
 * and has not yet been started.
 */ function Yo(t) {
    return Xo(t) && !ma(t).So() && t.ca.size > 0;
}

function Xo(t) {
    return 0 === K(t).ha.size;
}

function Zo(t) {
    t._a = void 0;
}

async function ta(t) {
    t.ca.forEach(((e, n) => {
        zo(t, e);
    }));
}

async function ea(t, e) {
    Zo(t), 
    // If we still need the watch stream, retry the connection.
    Yo(t) ? (t.da.oa(e), Jo(t)) : 
    // No need to restart watch stream because there are no active targets.
    // The online state is set to unknown because there is no active attempt
    // at establishing a connection
    t.da.set("Unknown" /* Unknown */);
}

async function na(t, e, n) {
    if (
    // Mark the client as online since we got a message from the server
    t.da.set("Online" /* Online */), e instanceof Yn && 2 /* Removed */ === e.state && e.cause) 
    // There was an error on a target, don't wait for a consistent snapshot
    // to raise events
    try {
        await 
        /** Handles an error on a target */
        async function(t, e) {
            const n = e.cause;
            for (const s of e.targetIds) 
            // A watched target might have been removed already.
            t.ca.has(s) && (await t.remoteSyncer.rejectListen(s, n), t.ca.delete(s), t._a.removeTarget(s));
        }
        /**
 * Attempts to fill our write pipeline with writes from the LocalStore.
 *
 * Called internally to bootstrap or refill the write pipeline and by
 * SyncEngine whenever there are new mutations to process.
 *
 * Starts the write stream if necessary.
 */ (t, e);
    } catch (n) {
        O("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), n), 
        await sa(t, n);
    } else if (e instanceof Hn ? t._a.at(e) : e instanceof Jn ? t._a._t(e) : t._a.ht(e), 
    !n.isEqual(ct.min())) try {
        const e = await Hr(t.localStore);
        n.compareTo(e) >= 0 && 
        // We have received a target change with a global snapshot if the snapshot
        // version is not equal to SnapshotVersion.min().
        await 
        /**
 * Takes a batch of changes from the Datastore, repackages them as a
 * RemoteEvent, and passes that on to the listener, which is typically the
 * SyncEngine.
 */
        function(t, e) {
            const n = t._a.yt(e);
            // Update in-memory resume tokens. LocalStore will update the
            // persistent view of these when applying the completed RemoteEvent.
                        return n.targetChanges.forEach(((n, s) => {
                if (n.resumeToken.approximateByteSize() > 0) {
                    const i = t.ca.get(s);
                    // A watched target might have been removed already.
                                        i && t.ca.set(s, i.withResumeToken(n.resumeToken, e));
                }
            })), 
            // Re-establish listens for the targets that have been invalidated by
            // existence filter mismatches.
            n.targetMismatches.forEach((e => {
                const n = t.ca.get(e);
                if (!n) 
                // A watched target might have been removed already.
                return;
                // Clear the resume token for the target, since we're in a known mismatch
                // state.
                                t.ca.set(e, n.withResumeToken(pt.EMPTY_BYTE_STRING, n.snapshotVersion)), 
                // Cause a hard reset by unwatching and rewatching immediately, but
                // deliberately don't send a resume token so that we get a full update.
                Ho(t, e);
                // Mark the target we send as being on behalf of an existence filter
                // mismatch, but don't actually retain that in listenTargets. This ensures
                // that we flag the first re-listen this way without impacting future
                // listens of this target (that might happen e.g. on reconnect).
                const s = new Ai(n.target, e, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                zo(t, s);
            })), t.remoteSyncer.applyRemoteEvent(n);
        }(t, n);
    } catch (e) {
        O("RemoteStore", "Failed to raise snapshot:", e), await sa(t, e);
    }
}

/**
 * Recovery logic for IndexedDB errors that takes the network offline until
 * `op` succeeds. Retries are scheduled with backoff using
 * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
 * validated via a generic operation.
 *
 * The returned Promise is resolved once the network is disabled and before
 * any retry attempt.
 */ async function sa(t, e, n) {
    if (!di(e)) throw e;
    t.ha.add(1 /* IndexedDbFailed */), 
    // Disable network and raise offline snapshots
    await Qo(t), t.da.set("Offline" /* Offline */), n || (
    // Use a simple read operation to determine if IndexedDB recovered.
    // Ideally, we would expose a health check directly on SimpleDb, but
    // RemoteStore only has access to persistence through LocalStore.
    n = () => Hr(t.localStore)), 
    // Probe IndexedDB periodically and re-enable network
    t.asyncQueue.enqueueRetryable((async () => {
        O("RemoteStore", "Retrying IndexedDB access"), await n(), t.ha.delete(1 /* IndexedDbFailed */), 
        await Go(t);
    }));
}

/**
 * Executes `op`. If `op` fails, takes the network offline until `op`
 * succeeds. Returns after the first attempt.
 */ function ia(t, e) {
    return e().catch((n => sa(t, n, e)));
}

async function ra(t) {
    const e = K(t), n = ga(e);
    let s = e.ua.length > 0 ? e.ua[e.ua.length - 1].batchId : -1;
    for (;oa(e); ) try {
        const t = await Xr(e.localStore, s);
        if (null === t) {
            0 === e.ua.length && n.No();
            break;
        }
        s = t.batchId, aa(e, t);
    } catch (t) {
        await sa(e, t);
    }
    ua(e) && ca(e);
}

/**
 * Returns true if we can add to the write pipeline (i.e. the network is
 * enabled and the write pipeline is not full).
 */ function oa(t) {
    return Xo(t) && t.ua.length < 10;
}

/**
 * Queues additional writes to be sent to the write stream, sending them
 * immediately if the write stream is established.
 */ function aa(t, e) {
    t.ua.push(e);
    const n = ga(t);
    n.Do() && n.Wo && n.zo(e.mutations);
}

function ua(t) {
    return Xo(t) && !ga(t).So() && t.ua.length > 0;
}

function ca(t) {
    ga(t).start();
}

async function ha(t) {
    ga(t).Yo();
}

async function la(t) {
    const e = ga(t);
    // Send the write pipeline now that the stream is established.
        for (const n of t.ua) e.zo(n.mutations);
}

async function fa(t, e, n) {
    const s = t.ua.shift(), i = Ti.from(s, e, n);
    await ia(t, (() => t.remoteSyncer.applySuccessfulWrite(i))), 
    // It's possible that with the completion of this mutation another
    // slot has freed up.
    await ra(t);
}

async function da(t, e) {
    // If the write stream closed after the write handshake completes, a write
    // operation failed and we fail the pending operation.
    e && ga(t).Wo && 
    // This error affects the actual write.
    await async function(t, e) {
        // Only handle permanent errors here. If it's transient, just let the retry
        // logic kick in.
        if (n = e.code, vn(n) && n !== G.ABORTED) {
            // This was a permanent error, the request itself was the problem
            // so it's not going to succeed if we resend it.
            const n = t.ua.shift();
            // In this case it's also unlikely that the server itself is melting
            // down -- this was just a bad request so inhibit backoff on the next
            // restart.
                        ga(t).xo(), await ia(t, (() => t.remoteSyncer.rejectFailedWrite(n.batchId, e))), 
            // It's possible that with the completion of this mutation
            // another slot has freed up.
            await ra(t);
        }
        var n;
    }(t, e), 
    // The write stream might have been started by refilling the write
    // pipeline for failed writes
    ua(t) && ca(t);
}

async function _a(t, e) {
    const n = K(t);
    n.asyncQueue.verifyOperationInProgress(), O("RemoteStore", "RemoteStore received new credentials");
    const s = Xo(n);
    // Tear down and re-create our network streams. This will ensure we get a
    // fresh auth token for the new user and re-fill the write pipeline with
    // new mutations from the LocalStore (since mutations are per-user).
        n.ha.add(3 /* CredentialChange */), await Qo(n), s && 
    // Don't set the network status to Unknown if we are offline.
    n.da.set("Unknown" /* Unknown */), await n.remoteSyncer.handleCredentialChange(e), 
    n.ha.delete(3 /* CredentialChange */), await Go(n);
}

/**
 * Toggles the network state when the client gains or loses its primary lease.
 */ async function wa(t, e) {
    const n = K(t);
    e ? (n.ha.delete(2 /* IsSecondary */), await Go(n)) : e || (n.ha.add(2 /* IsSecondary */), 
    await Qo(n), n.da.set("Unknown" /* Unknown */));
}

/**
 * If not yet initialized, registers the WatchStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WatchStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */ function ma(t) {
    return t.wa || (
    // Create stream (but note that it is not started yet).
    t.wa = function(t, e, n) {
        const s = K(t);
        return s.Zo(), new Bo(e, s.Ro, s.authCredentials, s.appCheckCredentials, s.M, n);
    }
    /**
 * @license
 * Copyright 2018 Google LLC
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
 */ (t.datastore, t.asyncQueue, {
        Wr: ta.bind(null, t),
        Hr: ea.bind(null, t),
        Ko: na.bind(null, t)
    }), t.la.push((async e => {
        e ? (t.wa.xo(), Yo(t) ? Jo(t) : t.da.set("Unknown" /* Unknown */)) : (await t.wa.stop(), 
        Zo(t));
    }))), t.wa;
}

/**
 * If not yet initialized, registers the WriteStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */ function ga(t) {
    return t.ma || (
    // Create stream (but note that it is not started yet).
    t.ma = function(t, e, n) {
        const s = K(t);
        return s.Zo(), new Lo(e, s.Ro, s.authCredentials, s.appCheckCredentials, s.M, n);
    }(t.datastore, t.asyncQueue, {
        Wr: ha.bind(null, t),
        Hr: da.bind(null, t),
        Jo: la.bind(null, t),
        Ho: fa.bind(null, t)
    }), t.la.push((async e => {
        e ? (t.ma.xo(), 
        // This will start the write stream if necessary.
        await ra(t)) : (await t.ma.stop(), t.ua.length > 0 && (O("RemoteStore", `Stopping write stream with ${t.ua.length} pending writes`), 
        t.ua = []));
    }))), t.ma;
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
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */
class ya {
    constructor(t, e, n, s, i) {
        this.asyncQueue = t, this.timerId = e, this.targetTimeMs = n, this.op = s, this.removalCallback = i, 
        this.deferred = new j, this.then = this.deferred.promise.then.bind(this.deferred.promise), 
        // It's normal for the deferred promise to be canceled (due to cancellation)
        // and so we attach a dummy catch callback to avoid
        // 'UnhandledPromiseRejectionWarning' log spam.
        this.deferred.promise.catch((t => {}));
    }
    /**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue - The queue to schedule the operation on.
     * @param id - A Timer ID identifying the type of operation this is.
     * @param delayMs - The delay (ms) before the operation should be scheduled.
     * @param op - The operation to run.
     * @param removalCallback - A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */    static createAndSchedule(t, e, n, s, i) {
        const r = Date.now() + n, o = new ya(t, e, r, s, i);
        return o.start(n), o;
    }
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */    start(t) {
        this.timerHandle = setTimeout((() => this.handleDelayElapsed()), t);
    }
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */    skipDelay() {
        return this.handleDelayElapsed();
    }
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */    cancel(t) {
        null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new Q(G.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
    }
    handleDelayElapsed() {
        this.asyncQueue.enqueueAndForget((() => null !== this.timerHandle ? (this.clearTimeout(), 
        this.op().then((t => this.deferred.resolve(t)))) : Promise.resolve()));
    }
    clearTimeout() {
        null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), 
        this.timerHandle = null);
    }
}

/**
 * Returns a FirestoreError that can be surfaced to the user if the provided
 * error is an IndexedDbTransactionError. Re-throws the error otherwise.
 */ function pa(t, e) {
    if ($("AsyncQueue", `${e}: ${t}`), di(t)) return new Q(G.UNAVAILABLE, `${e}: ${t}`);
    throw t;
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
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */ class Ia {
    /** The default ordering is by key if the comparator is omitted */
    constructor(t) {
        // We are adding document key comparator to the end as it's the only
        // guaranteed unique property of a document.
        this.comparator = t ? (e, n) => t(e, n) || xt.comparator(e.key, n.key) : (t, e) => xt.comparator(t.key, e.key), 
        this.keyedMap = Ln(), this.sortedSet = new Cn(this.comparator);
    }
    /**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */    static emptySet(t) {
        return new Ia(t.comparator);
    }
    has(t) {
        return null != this.keyedMap.get(t);
    }
    get(t) {
        return this.keyedMap.get(t);
    }
    first() {
        return this.sortedSet.minKey();
    }
    last() {
        return this.sortedSet.maxKey();
    }
    isEmpty() {
        return this.sortedSet.isEmpty();
    }
    /**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */    indexOf(t) {
        const e = this.keyedMap.get(t);
        return e ? this.sortedSet.indexOf(e) : -1;
    }
    get size() {
        return this.sortedSet.size;
    }
    /** Iterates documents in order defined by "comparator" */    forEach(t) {
        this.sortedSet.inorderTraversal(((e, n) => (t(e), !1)));
    }
    /** Inserts or updates a document with the same key */    add(t) {
        // First remove the element if we have it.
        const e = this.delete(t.key);
        return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null));
    }
    /** Deletes a document with a given key */    delete(t) {
        const e = this.get(t);
        return e ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e)) : this;
    }
    isEqual(t) {
        if (!(t instanceof Ia)) return !1;
        if (this.size !== t.size) return !1;
        const e = this.sortedSet.getIterator(), n = t.sortedSet.getIterator();
        for (;e.hasNext(); ) {
            const t = e.getNext().key, s = n.getNext().key;
            if (!t.isEqual(s)) return !1;
        }
        return !0;
    }
    toString() {
        const t = [];
        return this.forEach((e => {
            t.push(e.toString());
        })), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
    }
    copy(t, e) {
        const n = new Ia;
        return n.comparator = this.comparator, n.keyedMap = t, n.sortedSet = e, n;
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
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */ class Ta {
    constructor() {
        this.ga = new Cn(xt.comparator);
    }
    track(t) {
        const e = t.doc.key, n = this.ga.get(e);
        n ? 
        // Merge the new change with the existing change.
        0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.ga = this.ga.insert(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.ga = this.ga.insert(e, {
            type: n.type,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.ga = this.ga.insert(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.ga = this.ga.insert(e, {
            type: 0 /* Added */ ,
            doc: t.doc
        }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.ga = this.ga.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.ga = this.ga.insert(e, {
            type: 1 /* Removed */ ,
            doc: n.doc
        }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.ga = this.ga.insert(e, {
            type: 2 /* Modified */ ,
            doc: t.doc
        }) : 
        // This includes these cases, which don't make sense:
        // Added->Added
        // Removed->Removed
        // Modified->Added
        // Removed->Modified
        // Metadata->Added
        // Removed->Metadata
        L() : this.ga = this.ga.insert(e, t);
    }
    ya() {
        const t = [];
        return this.ga.inorderTraversal(((e, n) => {
            t.push(n);
        })), t;
    }
}

class Ea {
    constructor(t, e, n, s, i, r, o, a) {
        this.query = t, this.docs = e, this.oldDocs = n, this.docChanges = s, this.mutatedKeys = i, 
        this.fromCache = r, this.syncStateChanged = o, this.excludesMetadataChanges = a;
    }
    /** Returns a view snapshot as if all documents in the snapshot were added. */    static fromInitialDocuments(t, e, n, s) {
        const i = [];
        return e.forEach((t => {
            i.push({
                type: 0 /* Added */ ,
                doc: t
            });
        })), new Ea(t, e, Ia.emptySet(e), i, n, s, 
        /* syncStateChanged= */ !0, 
        /* excludesMetadataChanges= */ !1);
    }
    get hasPendingWrites() {
        return !this.mutatedKeys.isEmpty();
    }
    isEqual(t) {
        if (!(this.fromCache === t.fromCache && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && Be(this.query, t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs))) return !1;
        const e = this.docChanges, n = t.docChanges;
        if (e.length !== n.length) return !1;
        for (let t = 0; t < e.length; t++) if (e[t].type !== n[t].type || !e[t].doc.isEqual(n[t].doc)) return !1;
        return !0;
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
 * Holds the listeners and the last received ViewSnapshot for a query being
 * tracked by EventManager.
 */ class Aa {
    constructor() {
        this.pa = void 0, this.listeners = [];
    }
}

class Ra {
    constructor() {
        this.queries = new Dn((t => Le(t)), Be), this.onlineState = "Unknown" /* Unknown */ , 
        this.Ia = new Set;
    }
}

async function ba(t, e) {
    const n = K(t), s = e.query;
    let i = !1, r = n.queries.get(s);
    if (r || (i = !0, r = new Aa), i) try {
        r.pa = await n.onListen(s);
    } catch (t) {
        const n = pa(t, `Initialization of query '${qe(e.query)}' failed`);
        return void e.onError(n);
    }
    if (n.queries.set(s, r), r.listeners.push(e), 
    // Run global snapshot listeners if a consistent snapshot has been emitted.
    e.Ta(n.onlineState), r.pa) {
        e.Ea(r.pa) && Sa(n);
    }
}

async function Pa(t, e) {
    const n = K(t), s = e.query;
    let i = !1;
    const r = n.queries.get(s);
    if (r) {
        const t = r.listeners.indexOf(e);
        t >= 0 && (r.listeners.splice(t, 1), i = 0 === r.listeners.length);
    }
    if (i) return n.queries.delete(s), n.onUnlisten(s);
}

function Va(t, e) {
    const n = K(t);
    let s = !1;
    for (const t of e) {
        const e = t.query, i = n.queries.get(e);
        if (i) {
            for (const e of i.listeners) e.Ea(t) && (s = !0);
            i.pa = t;
        }
    }
    s && Sa(n);
}

function va(t, e, n) {
    const s = K(t), i = s.queries.get(e);
    if (i) for (const t of i.listeners) t.onError(n);
    // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
    // after an error.
        s.queries.delete(e);
}

// Call all global snapshot listeners that have been set.
function Sa(t) {
    t.Ia.forEach((t => {
        t.next();
    }));
}

/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */ class Da {
    constructor(t, e, n) {
        this.query = t, this.Aa = e, 
        /**
         * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
         * observer. This flag is set to true once we've actually raised an event.
         */
        this.Ra = !1, this.ba = null, this.onlineState = "Unknown" /* Unknown */ , this.options = n || {};
    }
    /**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */    Ea(t) {
        if (!this.options.includeMetadataChanges) {
            // Remove the metadata only changes.
            const e = [];
            for (const n of t.docChanges) 3 /* Metadata */ !== n.type && e.push(n);
            t = new Ea(t.query, t.docs, t.oldDocs, e, t.mutatedKeys, t.fromCache, t.syncStateChanged, 
            /* excludesMetadataChanges= */ !0);
        }
        let e = !1;
        return this.Ra ? this.Pa(t) && (this.Aa.next(t), e = !0) : this.Va(t, this.onlineState) && (this.va(t), 
        e = !0), this.ba = t, e;
    }
    onError(t) {
        this.Aa.error(t);
    }
    /** Returns whether a snapshot was raised. */    Ta(t) {
        this.onlineState = t;
        let e = !1;
        return this.ba && !this.Ra && this.Va(this.ba, t) && (this.va(this.ba), e = !0), 
        e;
    }
    Va(t, e) {
        // Always raise the first event when we're synced
        if (!t.fromCache) return !0;
        // NOTE: We consider OnlineState.Unknown as online (it should become Offline
        // or Online if we wait long enough).
                const n = "Offline" /* Offline */ !== e;
        // Don't raise the event if we're online, aren't synced yet (checked
        // above) and are waiting for a sync.
                return (!this.options.Sa || !n) && (!t.docs.isEmpty() || "Offline" /* Offline */ === e);
        // Raise data from cache if we have any documents or we are offline
        }
    Pa(t) {
        // We don't need to handle includeDocumentMetadataChanges here because
        // the Metadata only changes have already been stripped out if needed.
        // At this point the only changes we will see are the ones we should
        // propagate.
        if (t.docChanges.length > 0) return !0;
        const e = this.ba && this.ba.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.syncStateChanged && !e) && !0 === this.options.includeMetadataChanges;
        // Generally we should have hit one of the cases above, but it's possible
        // to get here if there were only metadata docChanges and they got
        // stripped out.
        }
    va(t) {
        t = Ea.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache), this.Ra = !0, 
        this.Aa.next(t);
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
 * A complete element in the bundle stream, together with the byte length it
 * occupies in the stream.
 */ class Ca {
    constructor(t, 
    // How many bytes this element takes to store in the bundle.
    e) {
        this.payload = t, this.byteLength = e;
    }
    Da() {
        return "metadata" in this.payload;
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
 * Helper to convert objects from bundles to model objects in the SDK.
 */ class xa {
    constructor(t) {
        this.M = t;
    }
    li(t) {
        return fs(this.M, t);
    }
    /**
     * Converts a BundleDocument to a MutableDocument.
     */    fi(t) {
        return t.metadata.exists ? ys(this.M, t.document, !1) : te.newNoDocument(this.li(t.metadata.name), this.di(t.metadata.readTime));
    }
    di(t) {
        return us(t);
    }
}

/**
 * A class to process the elements from a bundle, load them into local
 * storage and provide progress update while loading.
 */ class Na {
    constructor(t, e, n) {
        this.Ca = t, this.localStore = e, this.M = n, 
        /** Batched queries to be saved into storage */
        this.queries = [], 
        /** Batched documents to be saved into storage */
        this.documents = [], this.progress = ka(t);
    }
    /**
     * Adds an element from the bundle to the loader.
     *
     * Returns a new progress if adding the element leads to a new progress,
     * otherwise returns null.
     */    xa(t) {
        this.progress.bytesLoaded += t.byteLength;
        let e = this.progress.documentsLoaded;
        return t.payload.namedQuery ? this.queries.push(t.payload.namedQuery) : t.payload.documentMetadata ? (this.documents.push({
            metadata: t.payload.documentMetadata
        }), t.payload.documentMetadata.exists || ++e) : t.payload.document && (this.documents[this.documents.length - 1].document = t.payload.document, 
        ++e), e !== this.progress.documentsLoaded ? (this.progress.documentsLoaded = e, 
        Object.assign({}, this.progress)) : null;
    }
    Na(t) {
        const e = new Map, n = new xa(this.M);
        for (const s of t) if (s.metadata.queries) {
            const t = n.li(s.metadata.name);
            for (const n of s.metadata.queries) {
                const s = (e.get(n) || Gn()).add(t);
                e.set(n, s);
            }
        }
        return e;
    }
    /**
     * Update the progress to 'Success' and return the updated progress.
     */    async complete() {
        const t = await ro(this.localStore, new xa(this.M), this.documents, this.Ca.id), e = this.Na(this.documents);
        for (const t of this.queries) await oo(this.localStore, t, e.get(t.name));
        return this.progress.taskState = "Success", new qr(Object.assign({}, this.progress), t);
    }
}

/**
 * Returns a `LoadBundleTaskProgress` representing the initial progress of
 * loading a bundle.
 */ function ka(t) {
    return {
        taskState: "Running",
        documentsLoaded: 0,
        bytesLoaded: 0,
        totalDocuments: t.totalDocuments,
        totalBytes: t.totalBytes
    };
}

/**
 * Returns a `LoadBundleTaskProgress` representing the progress that the loading
 * has succeeded.
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
class Ma {
    constructor(t) {
        this.key = t;
    }
}

class Oa {
    constructor(t) {
        this.key = t;
    }
}

/**
 * View is responsible for computing the final merged truth of what docs are in
 * a query. It gets notified of local and remote changes to docs, and applies
 * the query filters and limits to determine the most correct possible results.
 */ class $a {
    constructor(t, 
    /** Documents included in the remote target */
    e) {
        this.query = t, this.ka = e, this.Ma = null, 
        /**
         * A flag whether the view is current with the backend. A view is considered
         * current after it has seen the current flag from the backend and did not
         * lose consistency within the watch stream (e.g. because of an existence
         * filter mismatch).
         */
        this.current = !1, 
        /** Documents in the view but not in the remote target */
        this.Oa = Gn(), 
        /** Document Keys that have local changes */
        this.mutatedKeys = Gn(), this.$a = Ke(t), this.Fa = new Ia(this.$a);
    }
    /**
     * The set of remote documents that the server has told us belongs to the target associated with
     * this view.
     */    get Ba() {
        return this.ka;
    }
    /**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges - The doc changes to apply to this view.
     * @param previousChanges - If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @returns a new set of docs, changes, and refill flag.
     */    La(t, e) {
        const n = e ? e.qa : new Ta, s = e ? e.Fa : this.Fa;
        let i = e ? e.mutatedKeys : this.mutatedKeys, r = s, o = !1;
        // Track the last doc in a (full) limit. This is necessary, because some
        // update (a delete, or an update moving a doc past the old limit) might
        // mean there is some other document in the local cache that either should
        // come (1) between the old last limit doc and the new last document, in the
        // case of updates, or (2) after the new last document, in the case of
        // deletes. So we keep this doc at the old limit to compare the updates to.
        // Note that this should never get used in a refill (when previousChanges is
        // set), because there will only be adds -- no deletes or updates.
        const a = Ce(this.query) && s.size === this.query.limit ? s.last() : null, u = xe(this.query) && s.size === this.query.limit ? s.first() : null;
        // Drop documents out to meet limit/limitToLast requirement.
        if (t.inorderTraversal(((t, e) => {
            const c = s.get(t), h = Ue(this.query, e) ? e : null, l = !!c && this.mutatedKeys.has(c.key), f = !!h && (h.hasLocalMutations || 
            // We only consider committed mutations for documents that were
            // mutated during the lifetime of the view.
            this.mutatedKeys.has(h.key) && h.hasCommittedMutations);
            let d = !1;
            // Calculate change
                        if (c && h) {
                c.data.isEqual(h.data) ? l !== f && (n.track({
                    type: 3 /* Metadata */ ,
                    doc: h
                }), d = !0) : this.Ua(c, h) || (n.track({
                    type: 2 /* Modified */ ,
                    doc: h
                }), d = !0, (a && this.$a(h, a) > 0 || u && this.$a(h, u) < 0) && (
                // This doc moved from inside the limit to outside the limit.
                // That means there may be some other doc in the local cache
                // that should be included instead.
                o = !0));
            } else !c && h ? (n.track({
                type: 0 /* Added */ ,
                doc: h
            }), d = !0) : c && !h && (n.track({
                type: 1 /* Removed */ ,
                doc: c
            }), d = !0, (a || u) && (
            // A doc was removed from a full limit query. We'll need to
            // requery from the local cache to see if we know about some other
            // doc that should be in the results.
            o = !0));
            d && (h ? (r = r.add(h), i = f ? i.add(t) : i.delete(t)) : (r = r.delete(t), i = i.delete(t)));
        })), Ce(this.query) || xe(this.query)) for (;r.size > this.query.limit; ) {
            const t = Ce(this.query) ? r.last() : r.first();
            r = r.delete(t.key), i = i.delete(t.key), n.track({
                type: 1 /* Removed */ ,
                doc: t
            });
        }
        return {
            Fa: r,
            qa: n,
            ei: o,
            mutatedKeys: i
        };
    }
    Ua(t, e) {
        // We suppress the initial change event for documents that were modified as
        // part of a write acknowledgment (e.g. when the value of a server transform
        // is applied) as Watch will send us the same document again.
        // By suppressing the event, we only raise two user visible events (one with
        // `hasPendingWrites` and the final state of the document) instead of three
        // (one with `hasPendingWrites`, the modified document with
        // `hasPendingWrites` and the final state of the document).
        return t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations;
    }
    /**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges - The set of changes to make to the view's docs.
     * @param updateLimboDocuments - Whether to update limbo documents based on
     *        this change.
     * @param targetChange - A target change to apply for computing limbo docs and
     *        sync state.
     * @returns A new ViewChange with the given docs, changes, and sync state.
     */
    // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
    applyChanges(t, e, n) {
        const s = this.Fa;
        this.Fa = t.Fa, this.mutatedKeys = t.mutatedKeys;
        // Sort changes based on type and query comparator
        const i = t.qa.ya();
        i.sort(((t, e) => function(t, e) {
            const n = t => {
                switch (t) {
                  case 0 /* Added */ :
                    return 1;

                  case 2 /* Modified */ :
                  case 3 /* Metadata */ :
                    // A metadata change is converted to a modified change at the public
                    // api layer.  Since we sort by document key and then change type,
                    // metadata and modified changes must be sorted equivalently.
                    return 2;

                  case 1 /* Removed */ :
                    return 0;

                  default:
                    return L();
                }
            };
            return n(t) - n(e);
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
 */ (t.type, e.type) || this.$a(t.doc, e.doc))), this.Ka(n);
        const r = e ? this.Ga() : [], o = 0 === this.Oa.size && this.current ? 1 /* Synced */ : 0 /* Local */ , a = o !== this.Ma;
        if (this.Ma = o, 0 !== i.length || a) {
            return {
                snapshot: new Ea(this.query, t.Fa, s, i, t.mutatedKeys, 0 /* Local */ === o, a, 
                /* excludesMetadataChanges= */ !1),
                Qa: r
            };
        }
        // no changes
        return {
            Qa: r
        };
    }
    /**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */    Ta(t) {
        return this.current && "Offline" /* Offline */ === t ? (
        // If we're offline, set `current` to false and then call applyChanges()
        // to refresh our syncState and generate a ViewChange as appropriate. We
        // are guaranteed to get a new TargetChange that sets `current` back to
        // true once the client is back online.
        this.current = !1, this.applyChanges({
            Fa: this.Fa,
            qa: new Ta,
            mutatedKeys: this.mutatedKeys,
            ei: !1
        }, 
        /* updateLimboDocuments= */ !1)) : {
            Qa: []
        };
    }
    /**
     * Returns whether the doc for the given key should be in limbo.
     */    ja(t) {
        // If the remote end says it's part of this query, it's not in limbo.
        return !this.ka.has(t) && (
        // The local store doesn't think it's a result, so it shouldn't be in limbo.
        !!this.Fa.has(t) && !this.Fa.get(t).hasLocalMutations);
    }
    /**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */    Ka(t) {
        t && (t.addedDocuments.forEach((t => this.ka = this.ka.add(t))), t.modifiedDocuments.forEach((t => {})), 
        t.removedDocuments.forEach((t => this.ka = this.ka.delete(t))), this.current = t.current);
    }
    Ga() {
        // We can only determine limbo documents when we're in-sync with the server.
        if (!this.current) return [];
        // TODO(klimt): Do this incrementally so that it's not quadratic when
        // updating many documents.
                const t = this.Oa;
        this.Oa = Gn(), this.Fa.forEach((t => {
            this.ja(t.key) && (this.Oa = this.Oa.add(t.key));
        }));
        // Diff the new limbo docs with the old limbo docs.
        const e = [];
        return t.forEach((t => {
            this.Oa.has(t) || e.push(new Oa(t));
        })), this.Oa.forEach((n => {
            t.has(n) || e.push(new Ma(n));
        })), e;
    }
    /**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @returns The ViewChange that resulted from this synchronization.
     */
    // PORTING NOTE: Multi-tab only.
    Wa(t) {
        this.ka = t.hi, this.Oa = Gn();
        const e = this.La(t.documents);
        return this.applyChanges(e, /*updateLimboDocuments=*/ !0);
    }
    /**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */
    // PORTING NOTE: Multi-tab only.
    za() {
        return Ea.fromInitialDocuments(this.query, this.Fa, this.mutatedKeys, 0 /* Local */ === this.Ma);
    }
}

/**
 * QueryView contains all of the data that SyncEngine needs to keep track of for
 * a particular query.
 */
class Fa {
    constructor(
    /**
     * The query itself.
     */
    t, 
    /**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */
    e, 
    /**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */
    n) {
        this.query = t, this.targetId = e, this.view = n;
    }
}

/** Tracks a limbo resolution. */ class Ba {
    constructor(t) {
        this.key = t, 
        /**
         * Set to true once we've received a document. This is used in
         * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
         * decide whether it needs to manufacture a delete event for the target once
         * the target is CURRENT.
         */
        this.Ha = !1;
    }
}

/**
 * An implementation of `SyncEngine` coordinating with other parts of SDK.
 *
 * The parts of SyncEngine that act as a callback to RemoteStore need to be
 * registered individually. This is done in `syncEngineWrite()` and
 * `syncEngineListen()` (as well as `applyPrimaryState()`) as these methods
 * serve as entry points to RemoteStore's functionality.
 *
 * Note: some field defined in this class might have public access level, but
 * the class is not exported so they are only accessible from this module.
 * This is useful to implement optional features (like bundles) in free
 * functions, such that they are tree-shakeable.
 */ class La {
    constructor(t, e, n, 
    // PORTING NOTE: Manages state synchronization in multi-tab environments.
    s, i, r) {
        this.localStore = t, this.remoteStore = e, this.eventManager = n, this.sharedClientState = s, 
        this.currentUser = i, this.maxConcurrentLimboResolutions = r, this.Ja = {}, this.Ya = new Dn((t => Le(t)), Be), 
        this.Xa = new Map, 
        /**
         * The keys of documents that are in limbo for which we haven't yet started a
         * limbo resolution query. The strings in this set are the result of calling
         * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
         *
         * The `Set` type was chosen because it provides efficient lookup and removal
         * of arbitrary elements and it also maintains insertion order, providing the
         * desired queue-like FIFO semantics.
         */
        this.Za = new Set, 
        /**
         * Keeps track of the target ID for each document that is in limbo with an
         * active target.
         */
        this.tu = new Cn(xt.comparator), 
        /**
         * Keeps track of the information about an active limbo resolution for each
         * active target ID that was started for the purpose of limbo resolution.
         */
        this.eu = new Map, this.nu = new co, 
        /** Stores user completion handlers, indexed by User and BatchId. */
        this.su = {}, 
        /** Stores user callbacks waiting for all pending writes to be acknowledged. */
        this.iu = new Map, this.ru = mr.gn(), this.onlineState = "Unknown" /* Unknown */ , 
        // The primary state is set to `true` or `false` immediately after Firestore
        // startup. In the interim, a client should only be considered primary if
        // `isPrimary` is true.
        this.ou = void 0;
    }
    get isPrimaryClient() {
        return !0 === this.ou;
    }
}

/**
 * Initiates the new listen, resolves promise when listen enqueued to the
 * server. All the subsequent view snapshots or errors are sent to the
 * subscribed handlers. Returns the initial snapshot.
 */
async function qa(t, e) {
    const n = mu(t);
    let s, i;
    const r = n.Ya.get(e);
    if (r) 
    // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
    // already exists when EventManager calls us for the first time. This
    // happens when the primary tab is already listening to this query on
    // behalf of another tab and the user of the primary also starts listening
    // to the query. EventManager will not have an assigned target ID in this
    // case and calls `listen` to obtain this ID.
    s = r.targetId, n.sharedClientState.addLocalQueryTarget(s), i = r.view.za(); else {
        const t = await Zr(n.localStore, $e(e));
        n.isPrimaryClient && jo(n.remoteStore, t);
        const r = n.sharedClientState.addLocalQueryTarget(t.targetId);
        s = t.targetId, i = await Ua(n, e, s, "current" === r);
    }
    return i;
}

/**
 * Registers a view for a previously unknown query and computes its initial
 * snapshot.
 */ async function Ua(t, e, n, s) {
    // PORTING NOTE: On Web only, we inject the code that registers new Limbo
    // targets based on view changes. This allows us to only depend on Limbo
    // changes when user code includes queries.
    t.au = (e, n, s) => async function(t, e, n, s) {
        let i = e.view.La(n);
        i.ei && (
        // The query has a limit and some docs were removed, so we need
        // to re-run the query against the local store to make sure we
        // didn't lose any good docs that had been past the limit.
        i = await eo(t.localStore, e.query, 
        /* usePreviousResults= */ !1).then((({documents: t}) => e.view.La(t, i))));
        const r = s && s.targetChanges.get(e.targetId), o = e.view.applyChanges(i, 
        /* updateLimboDocuments= */ t.isPrimaryClient, r);
        return eu(t, e.targetId, o.Qa), o.snapshot;
    }(t, e, n, s);
    const i = await eo(t.localStore, e, 
    /* usePreviousResults= */ !0), r = new $a(e, i.hi), o = r.La(i.documents), a = zn.createSynthesizedTargetChangeForCurrentChange(n, s && "Offline" /* Offline */ !== t.onlineState), u = r.applyChanges(o, 
    /* updateLimboDocuments= */ t.isPrimaryClient, a);
    eu(t, n, u.Qa);
    const c = new Fa(e, n, r);
    return t.Ya.set(e, c), t.Xa.has(n) ? t.Xa.get(n).push(e) : t.Xa.set(n, [ e ]), u.snapshot;
}

/** Stops listening to the query. */ async function Ka(t, e) {
    const n = K(t), s = n.Ya.get(e), i = n.Xa.get(s.targetId);
    if (i.length > 1) return n.Xa.set(s.targetId, i.filter((t => !Be(t, e)))), void n.Ya.delete(e);
    // No other queries are mapped to the target, clean up the query and the target.
        if (n.isPrimaryClient) {
        // We need to remove the local query target first to allow us to verify
        // whether any other client is still interested in this target.
        n.sharedClientState.removeLocalQueryTarget(s.targetId);
        n.sharedClientState.isActiveQueryTarget(s.targetId) || await to(n.localStore, s.targetId, 
        /*keepPersistedTargetData=*/ !1).then((() => {
            n.sharedClientState.clearQueryState(s.targetId), Wo(n.remoteStore, s.targetId), 
            Za(n, s.targetId);
        })).catch(Tr);
    } else Za(n, s.targetId), await to(n.localStore, s.targetId, 
    /*keepPersistedTargetData=*/ !0);
}

/**
 * Initiates the write of local mutation batch which involves adding the
 * writes to the mutation queue, notifying the remote store about new
 * mutations and raising events for any changes this write caused.
 *
 * The promise returned by this call is resolved when the above steps
 * have completed, *not* when the write was acked by the backend. The
 * userCallback is resolved once the write was acked/rejected by the
 * backend (or failed locally for any other reason).
 */ async function Ga(t, e, n) {
    const s = gu(t);
    try {
        const t = await function(t, e) {
            const n = K(t), s = ut.now(), i = e.reduce(((t, e) => t.add(e.key)), Gn());
            let r;
            return n.persistence.runTransaction("Locally write mutations", "readwrite", (t => n.ui.Us(t, i).next((i => {
                r = i;
                // For non-idempotent mutations (such as `FieldValue.increment()`),
                // we record the base state in a separate patch mutation. This is
                // later used to guarantee consistent values and prevents flicker
                // even if the backend sends us an update that already includes our
                // transform.
                const o = [];
                for (const t of e) {
                    const e = wn(t, r.get(t.key));
                    null != e && 
                    // NOTE: The base state should only be applied if there's some
                    // existing document to override, so use a Precondition of
                    // exists=true
                    o.push(new pn(t.key, e, Zt(e.value.mapValue), hn.exists(!0)));
                }
                return n.Fs.addMutationBatch(t, s, o, e);
            })))).then((t => (t.applyToLocalDocumentSet(r), {
                batchId: t.batchId,
                changes: r
            })));
        }(s.localStore, e);
        s.sharedClientState.addPendingMutation(t.batchId), function(t, e, n) {
            let s = t.su[t.currentUser.toKey()];
            s || (s = new Cn(rt));
            s = s.insert(e, n), t.su[t.currentUser.toKey()] = s;
        }
        /**
 * Resolves or rejects the user callback for the given batch and then discards
 * it.
 */ (s, t.batchId, n), await iu(s, t.changes), await ra(s.remoteStore);
    } catch (t) {
        // If we can't persist the mutation, we reject the user callback and
        // don't send the mutation. The user can then retry the write.
        const e = pa(t, "Failed to persist write");
        n.reject(e);
    }
}

/**
 * Applies one remote event to the sync engine, notifying any views of the
 * changes, and releasing any pending mutation batches that would become
 * visible because of the snapshot version the remote event contains.
 */ async function Qa(t, e) {
    const n = K(t);
    try {
        const t = await Jr(n.localStore, e);
        // Update `receivedDocument` as appropriate for any limbo targets.
                e.targetChanges.forEach(((t, e) => {
            const s = n.eu.get(e);
            s && (
            // Since this is a limbo resolution lookup, it's for a single document
            // and it could be added, modified, or removed, but not a combination.
            q(t.addedDocuments.size + t.modifiedDocuments.size + t.removedDocuments.size <= 1), 
            t.addedDocuments.size > 0 ? s.Ha = !0 : t.modifiedDocuments.size > 0 ? q(s.Ha) : t.removedDocuments.size > 0 && (q(s.Ha), 
            s.Ha = !1));
        })), await iu(n, t, e);
    } catch (t) {
        await Tr(t);
    }
}

/**
 * Applies an OnlineState change to the sync engine and notifies any views of
 * the change.
 */ function ja(t, e, n) {
    const s = K(t);
    // If we are the secondary client, we explicitly ignore the remote store's
    // online state (the local client may go offline, even though the primary
    // tab remains online) and only apply the primary tab's online state from
    // SharedClientState.
        if (s.isPrimaryClient && 0 /* RemoteStore */ === n || !s.isPrimaryClient && 1 /* SharedClientState */ === n) {
        const t = [];
        s.Ya.forEach(((n, s) => {
            const i = s.view.Ta(e);
            i.snapshot && t.push(i.snapshot);
        })), function(t, e) {
            const n = K(t);
            n.onlineState = e;
            let s = !1;
            n.queries.forEach(((t, n) => {
                for (const t of n.listeners) 
                // Run global snapshot listeners if a consistent snapshot has been emitted.
                t.Ta(e) && (s = !0);
            })), s && Sa(n);
        }(s.eventManager, e), t.length && s.Ja.Ko(t), s.onlineState = e, s.isPrimaryClient && s.sharedClientState.setOnlineState(e);
    }
}

/**
 * Rejects the listen for the given targetID. This can be triggered by the
 * backend for any active target.
 *
 * @param syncEngine - The sync engine implementation.
 * @param targetId - The targetID corresponds to one previously initiated by the
 * user as part of TargetData passed to listen() on RemoteStore.
 * @param err - A description of the condition that has forced the rejection.
 * Nearly always this will be an indication that the user is no longer
 * authorized to see the data matching the target.
 */ async function Wa(t, e, n) {
    const s = K(t);
    // PORTING NOTE: Multi-tab only.
        s.sharedClientState.updateQueryState(e, "rejected", n);
    const i = s.eu.get(e), r = i && i.key;
    if (r) {
        // TODO(klimt): We really only should do the following on permission
        // denied errors, but we don't have the cause code here.
        // It's a limbo doc. Create a synthetic event saying it was deleted.
        // This is kind of a hack. Ideally, we would have a method in the local
        // store to purge a document. However, it would be tricky to keep all of
        // the local store's invariants with another method.
        let t = new Cn(xt.comparator);
        // TODO(b/217189216): This limbo document should ideally have a read time,
        // so that it is picked up by any read-time based scans. The backend,
        // however, does not send a read time for target removals.
                t = t.insert(r, te.newNoDocument(r, ct.min()));
        const n = Gn().add(r), i = new Wn(ct.min(), 
        /* targetChanges= */ new Map, 
        /* targetMismatches= */ new kn(rt), t, n);
        await Qa(s, i), 
        // Since this query failed, we won't want to manually unlisten to it.
        // We only remove it from bookkeeping after we successfully applied the
        // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
        // this query when the RemoteStore restarts the Watch stream, which should
        // re-trigger the target failure.
        s.tu = s.tu.remove(r), s.eu.delete(e), su(s);
    } else await to(s.localStore, e, 
    /* keepPersistedTargetData */ !1).then((() => Za(s, e, n))).catch(Tr);
}

async function za(t, e) {
    const n = K(t), s = e.batch.batchId;
    try {
        const t = await zr(n.localStore, e);
        // The local store may or may not be able to apply the write result and
        // raise events immediately (depending on whether the watcher is caught
        // up), so we raise user callbacks first so that they consistently happen
        // before listen events.
                Xa(n, s, /*error=*/ null), Ya(n, s), n.sharedClientState.updateMutationState(s, "acknowledged"), 
        await iu(n, t);
    } catch (t) {
        await Tr(t);
    }
}

async function Ha(t, e, n) {
    const s = K(t);
    try {
        const t = await function(t, e) {
            const n = K(t);
            return n.persistence.runTransaction("Reject batch", "readwrite-primary", (t => {
                let s;
                return n.Fs.lookupMutationBatch(t, e).next((e => (q(null !== e), s = e.keys(), n.Fs.removeMutationBatch(t, e)))).next((() => n.Fs.performConsistencyCheck(t))).next((() => n.ui.Us(t, s)));
            }));
        }
        /**
 * Returns the largest (latest) batch id in mutation queue that is pending
 * server response.
 *
 * Returns `BATCHID_UNKNOWN` if the queue is empty.
 */ (s.localStore, e);
        // The local store may or may not be able to apply the write result and
        // raise events immediately (depending on whether the watcher is caught up),
        // so we raise user callbacks first so that they consistently happen before
        // listen events.
                Xa(s, e, n), Ya(s, e), s.sharedClientState.updateMutationState(e, "rejected", n), 
        await iu(s, t);
    } catch (n) {
        await Tr(n);
    }
}

/**
 * Registers a user callback that resolves when all pending mutations at the moment of calling
 * are acknowledged .
 */ async function Ja(t, e) {
    const n = K(t);
    Xo(n.remoteStore) || O("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");
    try {
        const t = await function(t) {
            const e = K(t);
            return e.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", (t => e.Fs.getHighestUnacknowledgedBatchId(t)));
        }(n.localStore);
        if (-1 === t) 
        // Trigger the callback right away if there is no pending writes at the moment.
        return void e.resolve();
        const s = n.iu.get(t) || [];
        s.push(e), n.iu.set(t, s);
    } catch (t) {
        const n = pa(t, "Initialization of waitForPendingWrites() operation failed");
        e.reject(n);
    }
}

/**
 * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
 * if there are any.
 */ function Ya(t, e) {
    (t.iu.get(e) || []).forEach((t => {
        t.resolve();
    })), t.iu.delete(e);
}

/** Reject all outstanding callbacks waiting for pending writes to complete. */ function Xa(t, e, n) {
    const s = K(t);
    let i = s.su[s.currentUser.toKey()];
    // NOTE: Mutations restored from persistence won't have callbacks, so it's
    // okay for there to be no callback for this ID.
        if (i) {
        const t = i.get(e);
        t && (n ? t.reject(n) : t.resolve(), i = i.remove(e)), s.su[s.currentUser.toKey()] = i;
    }
}

function Za(t, e, n = null) {
    t.sharedClientState.removeLocalQueryTarget(e);
    for (const s of t.Xa.get(e)) t.Ya.delete(s), n && t.Ja.uu(s, n);
    if (t.Xa.delete(e), t.isPrimaryClient) {
        t.nu.Ri(e).forEach((e => {
            t.nu.containsKey(e) || 
            // We removed the last reference for this key
            tu(t, e);
        }));
    }
}

function tu(t, e) {
    t.Za.delete(e.path.canonicalString());
    // It's possible that the target already got removed because the query failed. In that case,
    // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
    const n = t.tu.get(e);
    null !== n && (Wo(t.remoteStore, n), t.tu = t.tu.remove(e), t.eu.delete(n), su(t));
}

function eu(t, e, n) {
    for (const s of n) if (s instanceof Ma) t.nu.addReference(s.key, e), nu(t, s); else if (s instanceof Oa) {
        O("SyncEngine", "Document no longer in limbo: " + s.key), t.nu.removeReference(s.key, e);
        t.nu.containsKey(s.key) || 
        // We removed the last reference for this key
        tu(t, s.key);
    } else L();
}

function nu(t, e) {
    const n = e.key, s = n.path.canonicalString();
    t.tu.get(n) || t.Za.has(s) || (O("SyncEngine", "New document in limbo: " + n), t.Za.add(s), 
    su(t));
}

/**
 * Starts listens for documents in limbo that are enqueued for resolution,
 * subject to a maximum number of concurrent resolutions.
 *
 * Without bounding the number of concurrent resolutions, the server can fail
 * with "resource exhausted" errors which can lead to pathological client
 * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
 */ function su(t) {
    for (;t.Za.size > 0 && t.tu.size < t.maxConcurrentLimboResolutions; ) {
        const e = t.Za.values().next().value;
        t.Za.delete(e);
        const n = new xt(_t.fromString(e)), s = t.ru.next();
        t.eu.set(s, new Ba(n)), t.tu = t.tu.insert(n, s), jo(t.remoteStore, new Ai($e(De(n.path)), s, 2 /* LimboResolution */ , nt.A));
    }
}

async function iu(t, e, n) {
    const s = K(t), i = [], r = [], o = [];
    s.Ya.isEmpty() || (s.Ya.forEach(((t, a) => {
        o.push(s.au(a, e, n).then((t => {
            if (t) {
                s.isPrimaryClient && s.sharedClientState.updateQueryState(a.targetId, t.fromCache ? "not-current" : "current"), 
                i.push(t);
                const e = Kr.Js(a.targetId, t);
                r.push(e);
            }
        })));
    })), await Promise.all(o), s.Ja.Ko(i), await async function(t, e) {
        const n = K(t);
        try {
            await n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (t => ui.forEach(e, (e => ui.forEach(e.zs, (s => n.persistence.referenceDelegate.addReference(t, e.targetId, s))).next((() => ui.forEach(e.Hs, (s => n.persistence.referenceDelegate.removeReference(t, e.targetId, s)))))))));
        } catch (t) {
            if (!di(t)) throw t;
            // If `notifyLocalViewChanges` fails, we did not advance the sequence
            // number for the documents that were included in this transaction.
            // This might trigger them to be deleted earlier than they otherwise
            // would have, but it should not invalidate the integrity of the data.
            O("LocalStore", "Failed to update sequence numbers: " + t);
        }
        for (const t of e) {
            const e = t.targetId;
            if (!t.fromCache) {
                const t = n.si.get(e), s = t.snapshotVersion, i = t.withLastLimboFreeSnapshotVersion(s);
                // Advance the last limbo free snapshot version
                                n.si = n.si.insert(e, i);
            }
        }
    }(s.localStore, r));
}

async function ru(t, e) {
    const n = K(t);
    if (!n.currentUser.isEqual(e)) {
        O("SyncEngine", "User change. New user:", e.toKey());
        const t = await Wr(n.localStore, e);
        n.currentUser = e, 
        // Fails tasks waiting for pending writes requested by previous user.
        function(t, e) {
            t.iu.forEach((t => {
                t.forEach((t => {
                    t.reject(new Q(G.CANCELLED, e));
                }));
            })), t.iu.clear();
        }(n, "'waitForPendingWrites' promise is rejected due to a user change."), 
        // TODO(b/114226417): Consider calling this only in the primary tab.
        n.sharedClientState.handleUserChange(e, t.removedBatchIds, t.addedBatchIds), await iu(n, t.ci);
    }
}

function ou(t, e) {
    const n = K(t), s = n.eu.get(e);
    if (s && s.Ha) return Gn().add(s.key);
    {
        let t = Gn();
        const s = n.Xa.get(e);
        if (!s) return t;
        for (const e of s) {
            const s = n.Ya.get(e);
            t = t.unionWith(s.view.Ba);
        }
        return t;
    }
}

/**
 * Reconcile the list of synced documents in an existing view with those
 * from persistence.
 */ async function au(t, e) {
    const n = K(t), s = await eo(n.localStore, e.query, 
    /* usePreviousResults= */ !0), i = e.view.Wa(s);
    return n.isPrimaryClient && eu(n, e.targetId, i.Qa), i;
}

/**
 * Retrieves newly changed documents from remote document cache and raises
 * snapshots if needed.
 */
// PORTING NOTE: Multi-Tab only.
async function uu(t) {
    const e = K(t);
    return so(e.localStore).then((t => iu(e, t)));
}

/** Applies a mutation state to an existing batch.  */
// PORTING NOTE: Multi-Tab only.
async function cu(t, e, n, s) {
    const i = K(t), r = await function(t, e) {
        const n = K(t), s = K(n.Fs);
        return n.persistence.runTransaction("Lookup mutation documents", "readonly", (t => s.ln(t, e).next((e => e ? n.ui.Us(t, e) : ui.resolve(null)))));
    }
    // PORTING NOTE: Multi-Tab only.
    (i.localStore, e);
    null !== r ? ("pending" === n ? 
    // If we are the primary client, we need to send this write to the
    // backend. Secondary clients will ignore these writes since their remote
    // connection is disabled.
    await ra(i.remoteStore) : "acknowledged" === n || "rejected" === n ? (
    // NOTE: Both these methods are no-ops for batches that originated from
    // other clients.
    Xa(i, e, s || null), Ya(i, e), function(t, e) {
        K(K(t).Fs).dn(e);
    }
    // PORTING NOTE: Multi-Tab only.
    (i.localStore, e)) : L(), await iu(i, r)) : 
    // A throttled tab may not have seen the mutation before it was completed
    // and removed from the mutation queue, in which case we won't have cached
    // the affected documents. In this case we can safely ignore the update
    // since that means we didn't apply the mutation locally at all (if we
    // had, we would have cached the affected documents), and so we will just
    // see any resulting document changes via normal remote document updates
    // as applicable.
    O("SyncEngine", "Cannot apply mutation batch with id: " + e);
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
async function hu(t, e) {
    const n = K(t);
    if (mu(n), gu(n), !0 === e && !0 !== n.ou) {
        // Secondary tabs only maintain Views for their local listeners and the
        // Views internal state may not be 100% populated (in particular
        // secondary tabs don't track syncedDocuments, the set of documents the
        // server considers to be in the target). So when a secondary becomes
        // primary, we need to need to make sure that all views for all targets
        // match the state on disk.
        const t = n.sharedClientState.getAllActiveQueryTargets(), e = await lu(n, t.toArray());
        n.ou = !0, await wa(n.remoteStore, !0);
        for (const t of e) jo(n.remoteStore, t);
    } else if (!1 === e && !1 !== n.ou) {
        const t = [];
        let e = Promise.resolve();
        n.Xa.forEach(((s, i) => {
            n.sharedClientState.isLocalQueryTarget(i) ? t.push(i) : e = e.then((() => (Za(n, i), 
            to(n.localStore, i, 
            /*keepPersistedTargetData=*/ !0)))), Wo(n.remoteStore, i);
        })), await e, await lu(n, t), 
        // PORTING NOTE: Multi-Tab only.
        function(t) {
            const e = K(t);
            e.eu.forEach(((t, n) => {
                Wo(e.remoteStore, n);
            })), e.nu.bi(), e.eu = new Map, e.tu = new Cn(xt.comparator);
        }
        /**
 * Reconcile the query views of the provided query targets with the state from
 * persistence. Raises snapshots for any changes that affect the local
 * client and returns the updated state of all target's query data.
 *
 * @param syncEngine - The sync engine implementation
 * @param targets - the list of targets with views that need to be recomputed
 * @param transitionToPrimary - `true` iff the tab transitions from a secondary
 * tab to a primary tab
 */
        // PORTING NOTE: Multi-Tab only.
        (n), n.ou = !1, await wa(n.remoteStore, !1);
    }
}

async function lu(t, e, n) {
    const s = K(t), i = [], r = [];
    for (const t of e) {
        let e;
        const n = s.Xa.get(t);
        if (n && 0 !== n.length) {
            // For queries that have a local View, we fetch their current state
            // from LocalStore (as the resume token and the snapshot version
            // might have changed) and reconcile their views with the persisted
            // state (the list of syncedDocuments may have gotten out of sync).
            e = await Zr(s.localStore, $e(n[0]));
            for (const t of n) {
                const e = s.Ya.get(t), n = await au(s, e);
                n.snapshot && r.push(n.snapshot);
            }
        } else {
            // For queries that never executed on this client, we need to
            // allocate the target in LocalStore and initialize a new View.
            const n = await no(s.localStore, t);
            e = await Zr(s.localStore, n), await Ua(s, fu(n), t, 
            /*current=*/ !1);
        }
        i.push(e);
    }
    return s.Ja.Ko(r), i;
}

/**
 * Creates a `Query` object from the specified `Target`. There is no way to
 * obtain the original `Query`, so we synthesize a `Query` from the `Target`
 * object.
 *
 * The synthesized result might be different from the original `Query`, but
 * since the synthesized `Query` should return the same results as the
 * original one (only the presentation of results might differ), the potential
 * difference will not cause issues.
 */
// PORTING NOTE: Multi-Tab only.
function fu(t) {
    return Se(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F" /* First */ , t.startAt, t.endAt);
}

/** Returns the IDs of the clients that are currently active. */
// PORTING NOTE: Multi-Tab only.
function du(t) {
    const e = K(t);
    return K(K(e.localStore).persistence).Ms();
}

/** Applies a query target change from a different tab. */
// PORTING NOTE: Multi-Tab only.
async function _u(t, e, n, s) {
    const i = K(t);
    if (i.ou) 
    // If we receive a target state notification via WebStorage, we are
    // either already secondary or another tab has taken the primary lease.
    O("SyncEngine", "Ignoring unexpected query state notification."); else if (i.Xa.has(e)) switch (n) {
      case "current":
      case "not-current":
        {
            const t = await so(i.localStore), s = Wn.createSynthesizedRemoteEventForCurrentChange(e, "current" === n);
            await iu(i, t, s);
            break;
        }

      case "rejected":
        await to(i.localStore, e, 
        /* keepPersistedTargetData */ !0), Za(i, e, s);
        break;

      default:
        L();
    }
}

/** Adds or removes Watch targets for queries from different tabs. */ async function wu(t, e, n) {
    const s = mu(t);
    if (s.ou) {
        for (const t of e) {
            if (s.Xa.has(t)) {
                // A target might have been added in a previous attempt
                O("SyncEngine", "Adding an already active target " + t);
                continue;
            }
            const e = await no(s.localStore, t), n = await Zr(s.localStore, e);
            await Ua(s, fu(e), n.targetId, 
            /*current=*/ !1), jo(s.remoteStore, n);
        }
        for (const t of n) 
        // Check that the target is still active since the target might have been
        // removed if it has been rejected by the backend.
        s.Xa.has(t) && 
        // Release queries that are still active.
        await to(s.localStore, t, 
        /* keepPersistedTargetData */ !1).then((() => {
            Wo(s.remoteStore, t), Za(s, t);
        })).catch(Tr);
    }
}

function mu(t) {
    const e = K(t);
    return e.remoteStore.remoteSyncer.applyRemoteEvent = Qa.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = ou.bind(null, e), 
    e.remoteStore.remoteSyncer.rejectListen = Wa.bind(null, e), e.Ja.Ko = Va.bind(null, e.eventManager), 
    e.Ja.uu = va.bind(null, e.eventManager), e;
}

function gu(t) {
    const e = K(t);
    return e.remoteStore.remoteSyncer.applySuccessfulWrite = za.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = Ha.bind(null, e), 
    e;
}

/**
 * Loads a Firestore bundle into the SDK. The returned promise resolves when
 * the bundle finished loading.
 *
 * @param syncEngine - SyncEngine to use.
 * @param bundleReader - Bundle to load into the SDK.
 * @param task - LoadBundleTask used to update the loading progress to public API.
 */ function yu(t, e, n) {
    const s = K(t);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async function(t, e, n) {
        try {
            const s = await e.getMetadata();
            if (await function(t, e) {
                const n = K(t), s = us(e.createTime);
                return n.persistence.runTransaction("hasNewerBundle", "readonly", (t => n.fs.getBundleMetadata(t, e.id))).then((t => !!t && t.createTime.compareTo(s) >= 0));
            }
            /**
 * Saves the given `BundleMetadata` to local persistence.
 */ (t.localStore, s)) return await e.close(), void n._completeWith(function(t) {
                return {
                    taskState: "Success",
                    documentsLoaded: t.totalDocuments,
                    bytesLoaded: t.totalBytes,
                    totalDocuments: t.totalDocuments,
                    totalBytes: t.totalBytes
                };
            }(s));
            n._updateProgress(ka(s));
            const i = new Na(s, t.localStore, e.M);
            let r = await e.cu();
            for (;r; ) {
                const t = await i.xa(r);
                t && n._updateProgress(t), r = await e.cu();
            }
            const o = await i.complete();
            // TODO(b/160876443): This currently raises snapshots with
            // `fromCache=false` if users already listen to some queries and bundles
            // has newer version.
                        await iu(t, o.$s, 
            /* remoteEvent */ void 0), 
            // Save metadata, so loading the same bundle will skip.
            await function(t, e) {
                const n = K(t);
                return n.persistence.runTransaction("Save bundle", "readwrite", (t => n.fs.saveBundleMetadata(t, e)));
            }
            /**
 * Returns a promise of a `NamedQuery` associated with given query name. Promise
 * resolves to undefined if no persisted data can be found.
 */ (t.localStore, s), n._completeWith(o.progress);
        } catch (t) {
            F("SyncEngine", `Loading bundle failed with ${t}`), n._failWith(t);
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
 * Provides all components needed for Firestore with in-memory persistence.
 * Uses EagerGC garbage collection.
 */)(s, e, n).then((() => {
        s.sharedClientState.notifyBundleLoaded();
    }));
}

class pu {
    constructor() {
        this.synchronizeTabs = !1;
    }
    async initialize(t) {
        this.M = Oo(t.databaseInfo.databaseId), this.sharedClientState = this.hu(t), this.persistence = this.lu(t), 
        await this.persistence.start(), this.gcScheduler = this.fu(t), this.localStore = this.du(t);
    }
    fu(t) {
        return null;
    }
    du(t) {
        return jr(this.persistence, new Gr, t.initialUser, this.M);
    }
    lu(t) {
        return new mo(yo.Wi, this.M);
    }
    hu(t) {
        return new vo;
    }
    async terminate() {
        this.gcScheduler && this.gcScheduler.stop(), await this.sharedClientState.shutdown(), 
        await this.persistence.shutdown();
    }
}

/**
 * Provides all components needed for Firestore with IndexedDB persistence.
 */ class Iu extends pu {
    constructor(t, e, n) {
        super(), this._u = t, this.cacheSizeBytes = e, this.forceOwnership = n, this.synchronizeTabs = !1;
    }
    async initialize(t) {
        await super.initialize(t), await io(this.localStore), await this._u.initialize(this, t), 
        // Enqueue writes from a previous session
        await gu(this._u.syncEngine), await ra(this._u.remoteStore), 
        // NOTE: This will immediately call the listener, so we make sure to
        // set it after localStore / remoteStore are started.
        await this.persistence.ps((() => (this.gcScheduler && !this.gcScheduler.started && this.gcScheduler.start(this.localStore), 
        Promise.resolve())));
    }
    du(t) {
        return jr(this.persistence, new Gr, t.initialUser, this.M);
    }
    fu(t) {
        const e = this.persistence.referenceDelegate.garbageCollector;
        return new Rr(e, t.asyncQueue);
    }
    lu(t) {
        const e = Lr(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey), n = void 0 !== this.cacheSizeBytes ? ur.withCacheSize(this.cacheSizeBytes) : ur.DEFAULT;
        return new $r(this.synchronizeTabs, e, t.clientId, n, t.asyncQueue, ko(), Mo(), this.M, this.sharedClientState, !!this.forceOwnership);
    }
    hu(t) {
        return new vo;
    }
}

/**
 * Provides all components needed for Firestore with multi-tab IndexedDB
 * persistence.
 *
 * In the legacy client, this provider is used to provide both multi-tab and
 * non-multi-tab persistence since we cannot tell at build time whether
 * `synchronizeTabs` will be enabled.
 */ class Tu extends Iu {
    constructor(t, e) {
        super(t, e, /* forceOwnership= */ !1), this._u = t, this.cacheSizeBytes = e, this.synchronizeTabs = !0;
    }
    async initialize(t) {
        await super.initialize(t);
        const e = this._u.syncEngine;
        this.sharedClientState instanceof Vo && (this.sharedClientState.syncEngine = {
            Nr: cu.bind(null, e),
            kr: _u.bind(null, e),
            Mr: wu.bind(null, e),
            Ms: du.bind(null, e),
            Cr: uu.bind(null, e)
        }, await this.sharedClientState.start()), 
        // NOTE: This will immediately call the listener, so we make sure to
        // set it after localStore / remoteStore are started.
        await this.persistence.ps((async t => {
            await hu(this._u.syncEngine, t), this.gcScheduler && (t && !this.gcScheduler.started ? this.gcScheduler.start(this.localStore) : t || this.gcScheduler.stop());
        }));
    }
    hu(t) {
        const e = ko();
        if (!Vo.vt(e)) throw new Q(G.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
        const n = Lr(t.databaseInfo.databaseId, t.databaseInfo.persistenceKey);
        return new Vo(e, t.asyncQueue, n, t.clientId, t.initialUser);
    }
}

/**
 * Initializes and wires the components that are needed to interface with the
 * network.
 */ class Eu {
    async initialize(t, e) {
        this.localStore || (this.localStore = t.localStore, this.sharedClientState = t.sharedClientState, 
        this.datastore = this.createDatastore(e), this.remoteStore = this.createRemoteStore(e), 
        this.eventManager = this.createEventManager(e), this.syncEngine = this.createSyncEngine(e, 
        /* startAsPrimary=*/ !t.synchronizeTabs), this.sharedClientState.onlineStateHandler = t => ja(this.syncEngine, t, 1 /* SharedClientState */), 
        this.remoteStore.remoteSyncer.handleCredentialChange = ru.bind(null, this.syncEngine), 
        await wa(this.remoteStore, this.syncEngine.isPrimaryClient));
    }
    createEventManager(t) {
        return new Ra;
    }
    createDatastore(t) {
        const e = Oo(t.databaseInfo.databaseId), n = (s = t.databaseInfo, new No(s));
        var s;
        /** Return the Platform-specific connectivity monitor. */        return function(t, e, n, s) {
            return new qo(t, e, n, s);
        }(t.authCredentials, t.appCheckCredentials, n, e);
    }
    createRemoteStore(t) {
        return e = this.localStore, n = this.datastore, s = t.asyncQueue, i = t => ja(this.syncEngine, t, 0 /* RemoteStore */), 
        r = Do.vt() ? new Do : new So, new Ko(e, n, s, i, r);
        var e, n, s, i, r;
        /** Re-enables the network. Idempotent. */    }
    createSyncEngine(t, e) {
        return function(t, e, n, 
        // PORTING NOTE: Manages state synchronization in multi-tab environments.
        s, i, r, o) {
            const a = new La(t, e, n, s, i, r);
            return o && (a.ou = !0), a;
        }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t.initialUser, t.maxConcurrentLimboResolutions, e);
    }
    terminate() {
        return async function(t) {
            const e = K(t);
            O("RemoteStore", "RemoteStore shutting down."), e.ha.add(5 /* Shutdown */), await Qo(e), 
            e.fa.shutdown(), 
            // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
            // triggering spurious listener events with cached data, etc.
            e.da.set("Unknown" /* Unknown */);
        }(this.remoteStore);
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
 * How many bytes to read each time when `ReadableStreamReader.read()` is
 * called. Only applicable for byte streams that we control (e.g. those backed
 * by an UInt8Array).
 */
/**
 * Builds a `ByteStreamReader` from a UInt8Array.
 * @param source - The data source to use.
 * @param bytesPerRead - How many bytes each `read()` from the returned reader
 *        will read.
 */
function Au(t, e = 10240) {
    let n = 0;
    // The TypeScript definition for ReadableStreamReader changed. We use
    // `any` here to allow this code to compile with different versions.
    // See https://github.com/microsoft/TypeScript/issues/42970
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async read() {
            if (n < t.byteLength) {
                const s = {
                    value: t.slice(n, n + e),
                    done: !1
                };
                return n += e, s;
            }
            return {
                done: !0
            };
        },
        async cancel() {},
        releaseLock() {},
        closed: Promise.reject("unimplemented")
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
 * On web, a `ReadableStream` is wrapped around by a `ByteStreamReader`.
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
/*
 * A wrapper implementation of Observer<T> that will dispatch events
 * asynchronously. To allow immediate silencing, a mute call is added which
 * causes events scheduled to no longer be raised.
 */
class Ru {
    constructor(t) {
        this.observer = t, 
        /**
         * When set to true, will not raise future events. Necessary to deal with
         * async detachment of listener.
         */
        this.muted = !1;
    }
    next(t) {
        this.observer.next && this.wu(this.observer.next, t);
    }
    error(t) {
        this.observer.error ? this.wu(this.observer.error, t) : console.error("Uncaught Error in snapshot listener:", t);
    }
    mu() {
        this.muted = !0;
    }
    wu(t, e) {
        this.muted || setTimeout((() => {
            this.muted || t(e);
        }), 0);
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
 * A class representing a bundle.
 *
 * Takes a bundle stream or buffer, and presents abstractions to read bundled
 * elements out of the underlying content.
 */ class bu {
    constructor(
    /** The reader to read from underlying binary bundle data source. */
    t, e) {
        this.gu = t, this.M = e, 
        /** Cached bundle metadata. */
        this.metadata = new j, 
        /**
         * Internal buffer to hold bundle content, accumulating incomplete element
         * content.
         */
        this.buffer = new Uint8Array, this.yu = new TextDecoder("utf-8"), 
        // Read the metadata (which is the first element).
        this.pu().then((t => {
            t && t.Da() ? this.metadata.resolve(t.payload.metadata) : this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is\n             ${JSON.stringify(null == t ? void 0 : t.payload)}`));
        }), (t => this.metadata.reject(t)));
    }
    close() {
        return this.gu.cancel();
    }
    async getMetadata() {
        return this.metadata.promise;
    }
    async cu() {
        // Makes sure metadata is read before proceeding.
        return await this.getMetadata(), this.pu();
    }
    /**
     * Reads from the head of internal buffer, and pulling more data from
     * underlying stream if a complete element cannot be found, until an
     * element(including the prefixed length and the JSON string) is found.
     *
     * Once a complete element is read, it is dropped from internal buffer.
     *
     * Returns either the bundled element, or null if we have reached the end of
     * the stream.
     */    async pu() {
        const t = await this.Iu();
        if (null === t) return null;
        const e = this.yu.decode(t), n = Number(e);
        isNaN(n) && this.Tu(`length string (${e}) is not valid number`);
        const s = await this.Eu(n);
        return new Ca(JSON.parse(s), t.length + n);
    }
    /** First index of '{' from the underlying buffer. */    Au() {
        return this.buffer.findIndex((t => t === "{".charCodeAt(0)));
    }
    /**
     * Reads from the beginning of the internal buffer, until the first '{', and
     * return the content.
     *
     * If reached end of the stream, returns a null.
     */    async Iu() {
        for (;this.Au() < 0; ) {
            if (await this.Ru()) break;
        }
        // Broke out of the loop because underlying stream is closed, and there
        // happens to be no more data to process.
                if (0 === this.buffer.length) return null;
        const t = this.Au();
        // Broke out of the loop because underlying stream is closed, but still
        // cannot find an open bracket.
                t < 0 && this.Tu("Reached the end of bundle when a length string is expected.");
        const e = this.buffer.slice(0, t);
        // Update the internal buffer to drop the read length.
                return this.buffer = this.buffer.slice(t), e;
    }
    /**
     * Reads from a specified position from the internal buffer, for a specified
     * number of bytes, pulling more data from the underlying stream if needed.
     *
     * Returns a string decoded from the read bytes.
     */    async Eu(t) {
        for (;this.buffer.length < t; ) {
            await this.Ru() && this.Tu("Reached the end of bundle when more is expected.");
        }
        const e = this.yu.decode(this.buffer.slice(0, t));
        // Update the internal buffer to drop the read json string.
                return this.buffer = this.buffer.slice(t), e;
    }
    Tu(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        throw this.gu.cancel(), new Error(`Invalid bundle format: ${t}`);
    }
    /**
     * Pulls more data from underlying stream to internal buffer.
     * Returns a boolean indicating whether the stream is finished.
     */    async Ru() {
        const t = await this.gu.read();
        if (!t.done) {
            const e = new Uint8Array(this.buffer.length + t.value.length);
            e.set(this.buffer), e.set(t.value, this.buffer.length), this.buffer = e;
        }
        return t.done;
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
 * Internal transaction object responsible for accumulating the mutations to
 * perform and the base versions for any documents read.
 */
class Pu {
    constructor(t) {
        this.datastore = t, 
        // The version of each document that was read during this transaction.
        this.readVersions = new Map, this.mutations = [], this.committed = !1, 
        /**
         * A deferred usage error that occurred previously in this transaction that
         * will cause the transaction to fail once it actually commits.
         */
        this.lastWriteError = null, 
        /**
         * Set of documents that have been written in the transaction.
         *
         * When there's more than one write to the same key in a transaction, any
         * writes after the first are handled differently.
         */
        this.writtenDocs = new Set;
    }
    async lookup(t) {
        if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw new Q(G.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
        const e = await async function(t, e) {
            const n = K(t), s = ws(n.M) + "/documents", i = {
                documents: e.map((t => ls(n.M, t)))
            }, r = await n.uo("BatchGetDocuments", s, i), o = new Map;
            r.forEach((t => {
                const e = ps(n.M, t);
                o.set(e.key.toString(), e);
            }));
            const a = [];
            return e.forEach((t => {
                const e = o.get(t.toString());
                q(!!e), a.push(e);
            })), a;
        }(this.datastore, t);
        return e.forEach((t => this.recordVersion(t))), e;
    }
    set(t, e) {
        this.write(e.toMutation(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }
    update(t, e) {
        try {
            this.write(e.toMutation(t, this.preconditionForUpdate(t)));
        } catch (t) {
            this.lastWriteError = t;
        }
        this.writtenDocs.add(t.toString());
    }
    delete(t) {
        this.write(new An(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }
    async commit() {
        if (this.ensureCommitNotCalled(), this.lastWriteError) throw this.lastWriteError;
        const t = this.readVersions;
        // For each mutation, note that the doc was written.
                this.mutations.forEach((e => {
            t.delete(e.key.toString());
        })), 
        // For each document that was read but not written to, we want to perform
        // a `verify` operation.
        t.forEach(((t, e) => {
            const n = xt.fromPath(e);
            this.mutations.push(new Rn(n, this.precondition(n)));
        })), await async function(t, e) {
            const n = K(t), s = ws(n.M) + "/documents", i = {
                writes: e.map((t => Ts(n.M, t)))
            };
            await n.io("Commit", s, i);
        }(this.datastore, this.mutations), this.committed = !0;
    }
    recordVersion(t) {
        let e;
        if (t.isFoundDocument()) e = t.version; else {
            if (!t.isNoDocument()) throw L();
            // For deleted docs, we must use baseVersion 0 when we overwrite them.
            e = ct.min();
        }
        const n = this.readVersions.get(t.key.toString());
        if (n) {
            if (!e.isEqual(n)) 
            // This transaction will fail no matter what.
            throw new Q(G.ABORTED, "Document version changed between two reads.");
        } else this.readVersions.set(t.key.toString(), e);
    }
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */    precondition(t) {
        const e = this.readVersions.get(t.toString());
        return !this.writtenDocs.has(t.toString()) && e ? hn.updateTime(e) : hn.none();
    }
    /**
     * Returns the precondition for a document if the operation is an update.
     */    preconditionForUpdate(t) {
        const e = this.readVersions.get(t.toString());
        // The first time a document is written, we want to take into account the
        // read time and existence
                if (!this.writtenDocs.has(t.toString()) && e) {
            if (e.isEqual(ct.min())) 
            // The document doesn't exist, so fail the transaction.
            // This has to be validated locally because you can't send a
            // precondition that a document does not exist without changing the
            // semantics of the backend write to be an insert. This is the reverse
            // of what we want, since we want to assert that the document doesn't
            // exist but then send the update and have it fail. Since we can't
            // express that to the backend, we have to validate locally.
            // Note: this can change once we can send separate verify writes in the
            // transaction.
            throw new Q(G.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
            // Document exists, base precondition on document update time.
                        return hn.updateTime(e);
        }
        // Document was not read, so we just use the preconditions for a blind
        // update.
        return hn.exists(!0);
    }
    write(t) {
        this.ensureCommitNotCalled(), this.mutations.push(t);
    }
    ensureCommitNotCalled() {}
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
 * TransactionRunner encapsulates the logic needed to run and retry transactions
 * with backoff.
 */
class Vu {
    constructor(t, e, n, s) {
        this.asyncQueue = t, this.datastore = e, this.updateFunction = n, this.deferred = s, 
        this.bu = 5, this.vo = new $o(this.asyncQueue, "transaction_retry" /* TransactionRetry */);
    }
    /** Runs the transaction and sets the result on deferred. */    run() {
        this.bu -= 1, this.Pu();
    }
    Pu() {
        this.vo.po((async () => {
            const t = new Pu(this.datastore), e = this.Vu(t);
            e && e.then((e => {
                this.asyncQueue.enqueueAndForget((() => t.commit().then((() => {
                    this.deferred.resolve(e);
                })).catch((t => {
                    this.vu(t);
                }))));
            })).catch((t => {
                this.vu(t);
            }));
        }));
    }
    Vu(t) {
        try {
            const e = this.updateFunction(t);
            return !St(e) && e.catch && e.then ? e : (this.deferred.reject(Error("Transaction callback must return a Promise")), 
            null);
        } catch (t) {
            // Do not retry errors thrown by user provided updateFunction.
            return this.deferred.reject(t), null;
        }
    }
    vu(t) {
        this.bu > 0 && this.Su(t) ? (this.bu -= 1, this.asyncQueue.enqueueAndForget((() => (this.Pu(), 
        Promise.resolve())))) : this.deferred.reject(t);
    }
    Su(t) {
        if ("FirebaseError" === t.name) {
            // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
            // non-matching document versions with ABORTED. These errors should be retried.
            const e = t.code;
            return "aborted" === e || "failed-precondition" === e || !vn(e);
        }
        return !1;
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
 * FirestoreClient is a top-level class that constructs and owns all of the
 * pieces of the client SDK architecture. It is responsible for creating the
 * async queue that is shared by all of the other components in the system.
 */
class vu {
    constructor(t, e, 
    /**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */
    n, s) {
        this.authCredentials = t, this.appCheckCredentials = e, this.asyncQueue = n, this.databaseInfo = s, 
        this.user = C.UNAUTHENTICATED, this.clientId = it.R(), this.authCredentialListener = () => Promise.resolve(), 
        this.appCheckCredentialListener = () => Promise.resolve(), this.authCredentials.start(n, (async t => {
            O("FirestoreClient", "Received user=", t.uid), await this.authCredentialListener(t), 
            this.user = t;
        })), this.appCheckCredentials.start(n, (t => (O("FirestoreClient", "Received new app check token=", t), 
        this.appCheckCredentialListener(t, this.user))));
    }
    async getConfiguration() {
        return {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            authCredentials: this.authCredentials,
            appCheckCredentials: this.appCheckCredentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: 100
        };
    }
    setCredentialChangeListener(t) {
        this.authCredentialListener = t;
    }
    setAppCheckTokenChangeListener(t) {
        this.appCheckCredentialListener = t;
    }
    /**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */    verifyNotTerminated() {
        if (this.asyncQueue.isShuttingDown) throw new Q(G.FAILED_PRECONDITION, "The client has already been terminated.");
    }
    terminate() {
        this.asyncQueue.enterRestrictedMode();
        const t = new j;
        return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async () => {
            try {
                this.onlineComponents && await this.onlineComponents.terminate(), this.offlineComponents && await this.offlineComponents.terminate(), 
                // The credentials provider must be terminated after shutting down the
                // RemoteStore as it will prevent the RemoteStore from retrieving auth
                // tokens.
                this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), t.resolve();
            } catch (e) {
                const n = pa(e, "Failed to shutdown persistence");
                t.reject(n);
            }
        })), t.promise;
    }
}

async function Su(t, e) {
    t.asyncQueue.verifyOperationInProgress(), O("FirestoreClient", "Initializing OfflineComponentProvider");
    const n = await t.getConfiguration();
    await e.initialize(n);
    let s = n.initialUser;
    t.setCredentialChangeListener((async t => {
        s.isEqual(t) || (await Wr(e.localStore, t), s = t);
    })), 
    // When a user calls clearPersistence() in one client, all other clients
    // need to be terminated to allow the delete to succeed.
    e.persistence.setDatabaseDeletedListener((() => t.terminate())), t.offlineComponents = e;
}

async function Du(t, e) {
    t.asyncQueue.verifyOperationInProgress();
    const n = await Cu(t);
    O("FirestoreClient", "Initializing OnlineComponentProvider");
    const s = await t.getConfiguration();
    await e.initialize(n, s), 
    // The CredentialChangeListener of the online component provider takes
    // precedence over the offline component provider.
    t.setCredentialChangeListener((t => _a(e.remoteStore, t))), t.setAppCheckTokenChangeListener(((t, n) => _a(e.remoteStore, n))), 
    t.onlineComponents = e;
}

async function Cu(t) {
    return t.offlineComponents || (O("FirestoreClient", "Using default OfflineComponentProvider"), 
    await Su(t, new pu)), t.offlineComponents;
}

async function xu(t) {
    return t.onlineComponents || (O("FirestoreClient", "Using default OnlineComponentProvider"), 
    await Du(t, new Eu)), t.onlineComponents;
}

function Nu(t) {
    return Cu(t).then((t => t.persistence));
}

function ku(t) {
    return Cu(t).then((t => t.localStore));
}

function Mu(t) {
    return xu(t).then((t => t.remoteStore));
}

function Ou(t) {
    return xu(t).then((t => t.syncEngine));
}

async function $u(t) {
    const e = await xu(t), n = e.eventManager;
    return n.onListen = qa.bind(null, e.syncEngine), n.onUnlisten = Ka.bind(null, e.syncEngine), 
    n;
}

/** Enables the network connection and re-enqueues all pending operations. */ function Fu(t) {
    return t.asyncQueue.enqueue((async () => {
        const e = await Nu(t), n = await Mu(t);
        return e.setNetworkEnabled(!0), function(t) {
            const e = K(t);
            return e.ha.delete(0 /* UserDisabled */), Go(e);
        }(n);
    }));
}

/** Disables the network connection. Pending operations will not complete. */ function Bu(t) {
    return t.asyncQueue.enqueue((async () => {
        const e = await Nu(t), n = await Mu(t);
        return e.setNetworkEnabled(!1), async function(t) {
            const e = K(t);
            e.ha.add(0 /* UserDisabled */), await Qo(e), 
            // Set the OnlineState to Offline so get()s return from cache, etc.
            e.da.set("Offline" /* Offline */);
        }(n);
    }));
}

/**
 * Returns a Promise that resolves when all writes that were pending at the time
 * this method was called received server acknowledgement. An acknowledgement
 * can be either acceptance or rejection.
 */ function Lu(t, e) {
    const n = new j;
    return t.asyncQueue.enqueueAndForget((async () => async function(t, e, n) {
        try {
            const s = await function(t, e) {
                const n = K(t);
                return n.persistence.runTransaction("read document", "readonly", (t => n.ui.Bs(t, e)));
            }(t, e);
            s.isFoundDocument() ? n.resolve(s) : s.isNoDocument() ? n.resolve(null) : n.reject(new Q(G.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"));
        } catch (t) {
            const s = pa(t, `Failed to get document '${e} from cache`);
            n.reject(s);
        }
    }
    /**
 * Retrieves a latency-compensated document from the backend via a
 * SnapshotListener.
 */ (await ku(t), e, n))), n.promise;
}

function qu(t, e, n = {}) {
    const s = new j;
    return t.asyncQueue.enqueueAndForget((async () => function(t, e, n, s, i) {
        const r = new Ru({
            next: r => {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                e.enqueueAndForget((() => Pa(t, o)));
                const a = r.docs.has(n);
                !a && r.fromCache ? 
                // TODO(dimond): If we're online and the document doesn't
                // exist then we resolve with a doc.exists set to false. If
                // we're offline however, we reject the Promise in this
                // case. Two options: 1) Cache the negative response from
                // the server so we can deliver that even when you're
                // offline 2) Actually reject the Promise in the online case
                // if the document doesn't exist.
                i.reject(new Q(G.UNAVAILABLE, "Failed to get document because the client is offline.")) : a && r.fromCache && s && "server" === s.source ? i.reject(new Q(G.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(r);
            },
            error: t => i.reject(t)
        }), o = new Da(De(n.path), r, {
            includeMetadataChanges: !0,
            Sa: !0
        });
        return ba(t, o);
    }(await $u(t), t.asyncQueue, e, n, s))), s.promise;
}

function Uu(t, e) {
    const n = new j;
    return t.asyncQueue.enqueueAndForget((async () => async function(t, e, n) {
        try {
            const s = await eo(t, e, 
            /* usePreviousResults= */ !0), i = new $a(e, s.hi), r = i.La(s.documents), o = i.applyChanges(r, 
            /* updateLimboDocuments= */ !1);
            n.resolve(o.snapshot);
        } catch (t) {
            const s = pa(t, `Failed to execute query '${e} against cache`);
            n.reject(s);
        }
    }
    /**
 * Retrieves a latency-compensated query snapshot from the backend via a
 * SnapshotListener.
 */ (await ku(t), e, n))), n.promise;
}

function Ku(t, e, n = {}) {
    const s = new j;
    return t.asyncQueue.enqueueAndForget((async () => function(t, e, n, s, i) {
        const r = new Ru({
            next: n => {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                e.enqueueAndForget((() => Pa(t, o))), n.fromCache && "server" === s.source ? i.reject(new Q(G.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n);
            },
            error: t => i.reject(t)
        }), o = new Da(n, r, {
            includeMetadataChanges: !0,
            Sa: !0
        });
        return ba(t, o);
    }(await $u(t), t.asyncQueue, e, n, s))), s.promise;
}

function Gu(t, e) {
    const n = new Ru(e);
    return t.asyncQueue.enqueueAndForget((async () => function(t, e) {
        K(t).Ia.add(e), 
        // Immediately fire an initial event, indicating all existing listeners
        // are in-sync.
        e.next();
    }(await $u(t), n))), () => {
        n.mu(), t.asyncQueue.enqueueAndForget((async () => function(t, e) {
            K(t).Ia.delete(e);
        }(await $u(t), n)));
    };
}

/**
 * Takes an updateFunction in which a set of reads and writes can be performed
 * atomically. In the updateFunction, the client can read and write values
 * using the supplied transaction object. After the updateFunction, all
 * changes will be committed. If a retryable error occurs (ex: some other
 * client has changed any of the data referenced), then the updateFunction
 * will be called again after a backoff. If the updateFunction still fails
 * after all retries, then the transaction will be rejected.
 *
 * The transaction object passed to the updateFunction contains methods for
 * accessing documents and collections. Unlike other datastore access, data
 * accessed with the transaction will not reflect local changes that have not
 * been committed. For this reason, it is required that all reads are
 * performed before any writes. Transactions must be performed while online.
 */ function Qu(t, e) {
    const n = new j;
    return t.asyncQueue.enqueueAndForget((async () => {
        const s = await function(t) {
            return xu(t).then((t => t.datastore));
        }(t);
        new Vu(t.asyncQueue, s, e, n).run();
    })), n.promise;
}

function ju(t, e, n, s) {
    const i = function(t, e) {
        let n;
        n = "string" == typeof t ? (new TextEncoder).encode(t) : t;
        return function(t, e) {
            return new bu(t, e);
        }(function(t, e) {
            if (t instanceof Uint8Array) return Au(t, e);
            if (t instanceof ArrayBuffer) return Au(new Uint8Array(t), e);
            if (t instanceof ReadableStream) return t.getReader();
            throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream");
        }(n), e);
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
 */ (n, Oo(e));
    t.asyncQueue.enqueueAndForget((async () => {
        yu(await Ou(t), i, s);
    }));
}

function Wu(t, e) {
    return t.asyncQueue.enqueue((async () => function(t, e) {
        const n = K(t);
        return n.persistence.runTransaction("Get named query", "readonly", (t => n.fs.getNamedQuery(t, e)));
    }(await ku(t), e)));
}

const zu = new Map;

/**
 * An instance map that ensures only one Datastore exists per Firestore
 * instance.
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
function Hu(t, e, n) {
    if (!n) throw new Q(G.INVALID_ARGUMENT, `Function ${t}() cannot be called with an empty ${e}.`);
}

/**
 * Validates that two boolean options are not set at the same time.
 * @internal
 */ function Ju(t, e, n, s) {
    if (!0 === e && !0 === s) throw new Q(G.INVALID_ARGUMENT, `${t} and ${n} cannot be used together.`);
}

/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */ function Yu(t) {
    if (!xt.isDocumentKey(t)) throw new Q(G.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
}

/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */ function Xu(t) {
    if (xt.isDocumentKey(t)) throw new Q(G.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
}

/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */
/** Returns a string describing the type / value of the provided input. */
function Zu(t) {
    if (void 0 === t) return "undefined";
    if (null === t) return "null";
    if ("string" == typeof t) return t.length > 20 && (t = `${t.substring(0, 20)}...`), 
    JSON.stringify(t);
    if ("number" == typeof t || "boolean" == typeof t) return "" + t;
    if ("object" == typeof t) {
        if (t instanceof Array) return "an array";
        {
            const e = 
            /** try to get the constructor name for an object. */
            function(t) {
                if (t.constructor) return t.constructor.name;
                return null;
            }
            /**
 * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
 * underlying instance. Throws if  `obj` is not an instance of `T`.
 *
 * This cast is used in the Lite and Full SDK to verify instance types for
 * arguments passed to the public API.
 * @internal
 */ (t);
            return e ? `a custom ${e} object` : "an object";
        }
    }
    return "function" == typeof t ? "a function" : L();
}

function tc(t, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
e) {
    if ("_delegate" in t && (
    // Unwrap Compat types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t = t._delegate), !(t instanceof e)) {
        if (e.name === t.constructor.name) throw new Q(G.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
        {
            const n = Zu(t);
            throw new Q(G.INVALID_ARGUMENT, `Expected type '${e.name}', but it was: ${n}`);
        }
    }
    return t;
}

function ec(t, e) {
    if (e <= 0) throw new Q(G.INVALID_ARGUMENT, `Function ${t}() requires a positive number, but it was: ${e}.`);
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
// settings() defaults:
/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied `FirestoreSettings` object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */
class nc {
    constructor(t) {
        var e;
        if (void 0 === t.host) {
            if (void 0 !== t.ssl) throw new Q(G.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com", this.ssl = true;
        } else this.host = t.host, this.ssl = null === (e = t.ssl) || void 0 === e || e;
        if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
        void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
            if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new Q(G.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
            this.cacheSizeBytes = t.cacheSizeBytes;
        }
        this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
        this.useFetchStreams = !!t.useFetchStreams, Ju("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
    }
    isEqual(t) {
        return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams;
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
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */ class sc {
    /** @hideconstructor */
    constructor(t, e, n) {
        this._authCredentials = e, this._appCheckCredentials = n, 
        /**
         * Whether it's a Firestore or Firestore Lite instance.
         */
        this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new nc({}), 
        this._settingsFrozen = !1, t instanceof vt ? this._databaseId = t : (this._app = t, 
        this._databaseId = function(t) {
            if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new Q(G.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
            return new vt(t.options.projectId);
        }
        /**
 * Modify this instance to communicate with the Cloud Firestore emulator.
 *
 * Note: This must be called before this instance has been used to do any
 * operations.
 *
 * @param firestore - The `Firestore` instance to configure to connect to the
 * emulator.
 * @param host - the emulator host (ex: localhost).
 * @param port - the emulator port (ex: 9000).
 * @param options.mockUserToken - the mock auth token to use for unit testing
 * Security Rules.
 */ (t));
    }
    /**
     * The {@link https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js#FirebaseApp} associated with this `Firestore` service
     * instance.
     */    get app() {
        if (!this._app) throw new Q(G.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
        return this._app;
    }
    get _initialized() {
        return this._settingsFrozen;
    }
    get _terminated() {
        return void 0 !== this._terminateTask;
    }
    _setSettings(t) {
        if (this._settingsFrozen) throw new Q(G.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
        this._settings = new nc(t), void 0 !== t.credentials && (this._authCredentials = function(t) {
            if (!t) return new z;
            switch (t.type) {
              case "gapi":
                const e = t.client;
                // Make sure this really is a Gapi client.
                                return q(!("object" != typeof e || null === e || !e.auth || !e.auth.getAuthHeaderValueForFirstParty)), 
                new X(e, t.sessionIndex || "0", t.iamToken || null);

              case "provider":
                return t.client;

              default:
                throw new Q(G.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
            }
        }(t.credentials));
    }
    _getSettings() {
        return this._settings;
    }
    _freezeSettings() {
        return this._settingsFrozen = !0, this._settings;
    }
    _delete() {
        return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
    }
    /** Returns a JSON-serializable representation of this `Firestore` instance. */    toJSON() {
        return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings
        };
    }
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */    _terminate() {
        /**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */
        return function(t) {
            const e = zu.get(t);
            e && (O("ComponentProvider", "Removing Datastore"), zu.delete(t), e.terminate());
        }(this), Promise.resolve();
    }
}

function ic(t, e, n, s = {}) {
    var i;
    const r = (t = tc(t, sc))._getSettings();
    if ("firestore.googleapis.com" !== r.host && r.host !== e && F("Host has been set in both settings() and useEmulator(), emulator host will be used"), 
    t._setSettings(Object.assign(Object.assign({}, r), {
        host: `${e}:${n}`,
        ssl: !1
    })), s.mockUserToken) {
        let e, n;
        if ("string" == typeof s.mockUserToken) e = s.mockUserToken, n = C.MOCK_USER; else {
            // Let createMockUserToken validate first (catches common mistakes like
            // invalid field "uid" and missing field "sub" / "user_id".)
            e = createMockUserToken(s.mockUserToken, null === (i = t._app) || void 0 === i ? void 0 : i.options.projectId);
            const r = s.mockUserToken.sub || s.mockUserToken.user_id;
            if (!r) throw new Q(G.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
            n = new C(r);
        }
        t._authCredentials = new H(new W(e, n));
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
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */ class rc {
    /** @hideconstructor */
    constructor(t, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    e, n) {
        this.converter = e, this._key = n, 
        /** The type of this Firestore reference. */
        this.type = "document", this.firestore = t;
    }
    get _path() {
        return this._key.path;
    }
    /**
     * The document's identifier within its collection.
     */    get id() {
        return this._key.path.lastSegment();
    }
    /**
     * A string representing the path of the referenced document (relative
     * to the root of the database).
     */    get path() {
        return this._key.path.canonicalString();
    }
    /**
     * The collection this `DocumentReference` belongs to.
     */    get parent() {
        return new ac(this.firestore, this.converter, this._key.path.popLast());
    }
    withConverter(t) {
        return new rc(this.firestore, t, this._key);
    }
}

/**
 * A `Query` refers to a query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */ class oc {
    // This is the lite version of the Query class in the main SDK.
    /** @hideconstructor protected */
    constructor(t, 
    /**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */
    e, n) {
        this.converter = e, this._query = n, 
        /** The type of this Firestore reference. */
        this.type = "query", this.firestore = t;
    }
    withConverter(t) {
        return new oc(this.firestore, t, this._query);
    }
}

/**
 * A `CollectionReference` object can be used for adding documents, getting
 * document references, and querying for documents (using {@link query}).
 */ class ac extends oc {
    /** @hideconstructor */
    constructor(t, e, n) {
        super(t, e, De(n)), this._path = n, 
        /** The type of this Firestore reference. */
        this.type = "collection";
    }
    /** The collection's identifier. */    get id() {
        return this._query.path.lastSegment();
    }
    /**
     * A string representing the path of the referenced collection (relative
     * to the root of the database).
     */    get path() {
        return this._query.path.canonicalString();
    }
    /**
     * A reference to the containing `DocumentReference` if this is a
     * subcollection. If this isn't a subcollection, the reference is null.
     */    get parent() {
        const t = this._path.popLast();
        return t.isEmpty() ? null : new rc(this.firestore, 
        /* converter= */ null, new xt(t));
    }
    withConverter(t) {
        return new ac(this.firestore, t, this._path);
    }
}

function uc(t, e, ...n) {
    if (t = getModularInstance(t), Hu("collection", "path", e), t instanceof sc) {
        const s = _t.fromString(e, ...n);
        return Xu(s), new ac(t, /* converter= */ null, s);
    }
    {
        if (!(t instanceof rc || t instanceof ac)) throw new Q(G.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
        const s = t._path.child(_t.fromString(e, ...n));
        return Xu(s), new ac(t.firestore, 
        /* converter= */ null, s);
    }
}

// TODO(firestorelite): Consider using ErrorFactory -
// https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106
/**
 * Creates and returns a new `Query` instance that includes all documents in the
 * database that are contained in a collection or subcollection with the
 * given `collectionId`.
 *
 * @param firestore - A reference to the root `Firestore` instance.
 * @param collectionId - Identifies the collections to query over. Every
 * collection or subcollection with this ID as the last segment of its path
 * will be included. Cannot contain a slash.
 * @returns The created `Query`.
 */ function cc(t, e) {
    if (t = tc(t, sc), Hu("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new Q(G.INVALID_ARGUMENT, `Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
    return new oc(t, 
    /* converter= */ null, 
    /**
 * Creates a new Query for a collection group query that matches all documents
 * within the provided collection group.
 */
    function(t) {
        return new ve(_t.emptyPath(), t);
    }(e));
}

function hc(t, e, ...n) {
    if (t = getModularInstance(t), 
    // We allow omission of 'pathString' but explicitly prohibit passing in both
    // 'undefined' and 'null'.
    1 === arguments.length && (e = it.R()), Hu("doc", "path", e), t instanceof sc) {
        const s = _t.fromString(e, ...n);
        return Yu(s), new rc(t, 
        /* converter= */ null, new xt(s));
    }
    {
        if (!(t instanceof rc || t instanceof ac)) throw new Q(G.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
        const s = t._path.child(_t.fromString(e, ...n));
        return Yu(s), new rc(t.firestore, t instanceof ac ? t.converter : null, new xt(s));
    }
}

/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ function lc(t, e) {
    return t = getModularInstance(t), e = getModularInstance(e), (t instanceof rc || t instanceof ac) && (e instanceof rc || e instanceof ac) && (t.firestore === e.firestore && t.path === e.path && t.converter === e.converter);
}

/**
 * Returns true if the provided queries point to the same collection and apply
 * the same constraints.
 *
 * @param left - A `Query` to compare.
 * @param right - A `Query` to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */ function fc(t, e) {
    return t = getModularInstance(t), e = getModularInstance(e), t instanceof oc && e instanceof oc && (t.firestore === e.firestore && Be(t._query, e._query) && t.converter === e.converter);
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
 */ class dc {
    constructor() {
        // The last promise in the queue.
        this.Du = Promise.resolve(), 
        // A list of retryable operations. Retryable operations are run in order and
        // retried with backoff.
        this.Cu = [], 
        // Is this AsyncQueue being shut down? Once it is set to true, it will not
        // be changed again.
        this.xu = !1, 
        // Operations scheduled to be queued in the future. Operations are
        // automatically removed after they are run or canceled.
        this.Nu = [], 
        // visible for testing
        this.ku = null, 
        // Flag set while there's an outstanding AsyncQueue operation, used for
        // assertion sanity-checks.
        this.Mu = !1, 
        // Enabled during shutdown on Safari to prevent future access to IndexedDB.
        this.Ou = !1, 
        // List of TimerIds to fast-forward delays for.
        this.$u = [], 
        // Backoff timer used to schedule retries for retryable operations
        this.vo = new $o(this, "async_queue_retry" /* AsyncQueueRetry */), 
        // Visibility handler that triggers an immediate retry of all retryable
        // operations. Meant to speed up recovery when we regain file system access
        // after page comes into foreground.
        this.Fu = () => {
            const t = Mo();
            t && O("AsyncQueue", "Visibility state changed to " + t.visibilityState), this.vo.To();
        };
        const t = Mo();
        t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.Fu);
    }
    get isShuttingDown() {
        return this.xu;
    }
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */    enqueueAndForget(t) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.enqueue(t);
    }
    enqueueAndForgetEvenWhileRestricted(t) {
        this.Bu(), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.Lu(t);
    }
    enterRestrictedMode(t) {
        if (!this.xu) {
            this.xu = !0, this.Ou = t || !1;
            const e = Mo();
            e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.Fu);
        }
    }
    enqueue(t) {
        if (this.Bu(), this.xu) 
        // Return a Promise which never resolves.
        return new Promise((() => {}));
        // Create a deferred Promise that we can return to the callee. This
        // allows us to return a "hanging Promise" only to the callee and still
        // advance the queue even when the operation is not run.
                const e = new j;
        return this.Lu((() => this.xu && this.Ou ? Promise.resolve() : (t().then(e.resolve, e.reject), 
        e.promise))).then((() => e.promise));
    }
    enqueueRetryable(t) {
        this.enqueueAndForget((() => (this.Cu.push(t), this.qu())));
    }
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */    async qu() {
        if (0 !== this.Cu.length) {
            try {
                await this.Cu[0](), this.Cu.shift(), this.vo.reset();
            } catch (t) {
                if (!di(t)) throw t;
 // Failure will be handled by AsyncQueue
                                O("AsyncQueue", "Operation failed with retryable error: " + t);
            }
            this.Cu.length > 0 && 
            // If there are additional operations, we re-schedule `retryNextOp()`.
            // This is necessary to run retryable operations that failed during
            // their initial attempt since we don't know whether they are already
            // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
            // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
            // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
            // call scheduled here.
            // Since `backoffAndRun()` cancels an existing backoff and schedules a
            // new backoff on every call, there is only ever a single additional
            // operation in the queue.
            this.vo.po((() => this.qu()));
        }
    }
    Lu(t) {
        const e = this.Du.then((() => (this.Mu = !0, t().catch((t => {
            this.ku = t, this.Mu = !1;
            const e = 
            /**
 * Chrome includes Error.message in Error.stack. Other browsers do not.
 * This returns expected output of message + stack when available.
 * @param error - Error or FirestoreError
 */
            function(t) {
                let e = t.message || "";
                t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack);
                return e;
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
 */ (t);
            // Re-throw the error so that this.tail becomes a rejected Promise and
            // all further attempts to chain (via .then) will just short-circuit
            // and return the rejected Promise.
            throw $("INTERNAL UNHANDLED ERROR: ", e), t;
        })).then((t => (this.Mu = !1, t))))));
        return this.Du = e, e;
    }
    enqueueAfterDelay(t, e, n) {
        this.Bu(), 
        // Fast-forward delays for timerIds that have been overriden.
        this.$u.indexOf(t) > -1 && (e = 0);
        const s = ya.createAndSchedule(this, t, e, n, (t => this.Uu(t)));
        return this.Nu.push(s), s;
    }
    Bu() {
        this.ku && L();
    }
    verifyOperationInProgress() {}
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */    async Ku() {
        // Operations in the queue prior to draining may have enqueued additional
        // operations. Keep draining the queue until the tail is no longer advanced,
        // which indicates that no more new operations were enqueued and that all
        // operations were executed.
        let t;
        do {
            t = this.Du, await t;
        } while (t !== this.Du);
    }
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */    Gu(t) {
        for (const e of this.Nu) if (e.timerId === t) return !0;
        return !1;
    }
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */    Qu(t) {
        // Note that draining may generate more delayed ops, so we do that first.
        return this.Ku().then((() => {
            // Run ops in the same order they'd run if they ran naturally.
            this.Nu.sort(((t, e) => t.targetTimeMs - e.targetTimeMs));
            for (const e of this.Nu) if (e.skipDelay(), "all" /* All */ !== t && e.timerId === t) break;
            return this.Ku();
        }));
    }
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */    ju(t) {
        this.$u.push(t);
    }
    /** Called once a DelayedOperation is run or canceled. */    Uu(t) {
        // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
        const e = this.Nu.indexOf(t);
        this.Nu.splice(e, 1);
    }
}

function _c(t) {
    /**
 * Returns true if obj is an object and contains at least one of the specified
 * methods.
 */
    return function(t, e) {
        if ("object" != typeof t || null === t) return !1;
        const n = t;
        for (const t of e) if (t in n && "function" == typeof n[t]) return !0;
        return !1;
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
 * Represents the task of loading a Firestore bundle. It provides progress of bundle
 * loading, as well as task completion and error events.
 *
 * The API is compatible with `Promise<LoadBundleTaskProgress>`.
 */ (t, [ "next", "error", "complete" ]);
}

class wc {
    constructor() {
        this._progressObserver = {}, this._taskCompletionResolver = new j, this._lastProgress = {
            taskState: "Running",
            totalBytes: 0,
            totalDocuments: 0,
            bytesLoaded: 0,
            documentsLoaded: 0
        };
    }
    /**
     * Registers functions to listen to bundle loading progress events.
     * @param next - Called when there is a progress update from bundle loading. Typically `next` calls occur
     *   each time a Firestore document is loaded from the bundle.
     * @param error - Called when an error occurs during bundle loading. The task aborts after reporting the
     *   error, and there should be no more updates after this.
     * @param complete - Called when the loading task is complete.
     */    onProgress(t, e, n) {
        this._progressObserver = {
            next: t,
            error: e,
            complete: n
        };
    }
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.catch` interface.
     *
     * @param onRejected - Called when an error occurs during bundle loading.
     */    catch(t) {
        return this._taskCompletionResolver.promise.catch(t);
    }
    /**
     * Implements the `Promise<LoadBundleTaskProgress>.then` interface.
     *
     * @param onFulfilled - Called on the completion of the loading task with a final `LoadBundleTaskProgress` update.
     *   The update will always have its `taskState` set to `"Success"`.
     * @param onRejected - Called when an error occurs during bundle loading.
     */    then(t, e) {
        return this._taskCompletionResolver.promise.then(t, e);
    }
    /**
     * Notifies all observers that bundle loading has completed, with a provided
     * `LoadBundleTaskProgress` object.
     *
     * @private
     */    _completeWith(t) {
        this._updateProgress(t), this._progressObserver.complete && this._progressObserver.complete(), 
        this._taskCompletionResolver.resolve(t);
    }
    /**
     * Notifies all observers that bundle loading has failed, with a provided
     * `Error` as the reason.
     *
     * @private
     */    _failWith(t) {
        this._lastProgress.taskState = "Error", this._progressObserver.next && this._progressObserver.next(this._lastProgress), 
        this._progressObserver.error && this._progressObserver.error(t), this._taskCompletionResolver.reject(t);
    }
    /**
     * Notifies a progress update of loading a bundle.
     * @param progress - The new progress.
     *
     * @private
     */    _updateProgress(t) {
        this._lastProgress = t, this._progressObserver.next && this._progressObserver.next(t);
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
/** DOMException error code constants. */ const mc = -1;

/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */
class gc extends sc {
    /** @hideconstructor */
    constructor(t, e, n) {
        super(t, e, n), 
        /**
         * Whether it's a {@link Firestore} or Firestore Lite instance.
         */
        this.type = "firestore", this._queue = new dc, this._persistenceKey = "name" in t ? t.name : "[DEFAULT]";
    }
    _terminate() {
        return this._firestoreClient || 
        // The client must be initialized to ensure that all subsequent API
        // usage throws an exception.
        Tc(this), this._firestoreClient.terminate();
    }
}

/**
 * Initializes a new instance of {@link Firestore} with the provided settings.
 * Can only be called before any other function, including
 * {@link getFirestore}. If the custom settings are empty, this function is
 * equivalent to calling {@link getFirestore}.
 *
 * @param app - The {@link https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js#FirebaseApp} with which the {@link Firestore} instance will
 * be associated.
 * @param settings - A settings object to configure the {@link Firestore} instance.
 * @returns A newly initialized {@link Firestore} instance.
 */ function yc(t, e) {
    const n = _getProvider(t, "firestore");
    if (n.isInitialized()) {
        const t = n.getImmediate(), s = n.getOptions();
        if (deepEqual(s, e)) return t;
        throw new Q(G.FAILED_PRECONDITION, "initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.");
    }
    if (void 0 !== e.cacheSizeBytes && -1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576) throw new Q(G.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
    return n.initialize({
        options: e
    });
}

/**
 * Returns the existing {@link Firestore} instance that is associated with the
 * provided {@link https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js#FirebaseApp}. If no instance exists, initializes a new
 * instance with default settings.
 *
 * @param app - The {@link https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js#FirebaseApp} instance that the returned {@link Firestore}
 * instance is associated with.
 * @returns The {@link Firestore} instance of the provided app.
 */ function pc(e = getApp()) {
    return _getProvider(e, "firestore").getImmediate();
}

/**
 * @internal
 */ function Ic(t) {
    return t._firestoreClient || Tc(t), t._firestoreClient.verifyNotTerminated(), t._firestoreClient;
}

function Tc(t) {
    var e;
    const n = t._freezeSettings(), s = function(t, e, n, s) {
        return new Vt(t, e, n, s.host, s.ssl, s.experimentalForceLongPolling, s.experimentalAutoDetectLongPolling, s.useFetchStreams);
    }(t._databaseId, (null === (e = t._app) || void 0 === e ? void 0 : e.options.appId) || "", t._persistenceKey, n);
    t._firestoreClient = new vu(t._authCredentials, t._appCheckCredentials, t._queue, s);
}

/**
 * Attempts to enable persistent storage, if possible.
 *
 * Must be called before any other functions (other than
 * {@link initializeFirestore}, {@link getFirestore} or
 * {@link clearIndexedDbPersistence}.
 *
 * If this fails, `enableIndexedDbPersistence()` will reject the promise it
 * returns. Note that even after this failure, the {@link Firestore} instance will
 * remain usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @param firestore - The {@link Firestore} instance to enable persistence for.
 * @param persistenceSettings - Optional settings object to configure
 * persistence.
 * @returns A `Promise` that represents successfully enabling persistent storage.
 */ function Ec(t, e) {
    xc(t = tc(t, gc));
    const n = Ic(t), s = t._freezeSettings(), i = new Eu;
    return Rc(n, i, new Iu(i, s.cacheSizeBytes, null == e ? void 0 : e.forceOwnership));
}

/**
 * Attempts to enable multi-tab persistent storage, if possible. If enabled
 * across all tabs, all operations share access to local persistence, including
 * shared execution of queries and latency-compensated local document updates
 * across all connected instances.
 *
 * If this fails, `enableMultiTabIndexedDbPersistence()` will reject the promise
 * it returns. Note that even after this failure, the {@link Firestore} instance will
 * remain usable, however offline persistence will be disabled.
 *
 * There are several reasons why this can fail, which can be identified by
 * the `code` on the error.
 *
 *   * failed-precondition: The app is already open in another browser tab and
 *     multi-tab is not enabled.
 *   * unimplemented: The browser is incompatible with the offline
 *     persistence implementation.
 *
 * @param firestore - The {@link Firestore} instance to enable persistence for.
 * @returns A `Promise` that represents successfully enabling persistent
 * storage.
 */ function Ac(t) {
    xc(t = tc(t, gc));
    const e = Ic(t), n = t._freezeSettings(), s = new Eu;
    return Rc(e, s, new Tu(s, n.cacheSizeBytes));
}

/**
 * Registers both the `OfflineComponentProvider` and `OnlineComponentProvider`.
 * If the operation fails with a recoverable error (see
 * `canRecoverFromIndexedDbError()` below), the returned Promise is rejected
 * but the client remains usable.
 */ function Rc(t, e, n) {
    const s = new j;
    return t.asyncQueue.enqueue((async () => {
        try {
            await Su(t, n), await Du(t, e), s.resolve();
        } catch (t) {
            if (!
            /**
 * Decides whether the provided error allows us to gracefully disable
 * persistence (as opposed to crashing the client).
 */
            function(t) {
                if ("FirebaseError" === t.name) return t.code === G.FAILED_PRECONDITION || t.code === G.UNIMPLEMENTED;
                if ("undefined" != typeof DOMException && t instanceof DOMException) 
                // There are a few known circumstances where we can open IndexedDb but
                // trying to read/write will fail (e.g. quota exceeded). For
                // well-understood cases, we attempt to detect these and then gracefully
                // fall back to memory persistence.
                // NOTE: Rather than continue to add to this list, we could decide to
                // always fall back, with the risk that we might accidentally hide errors
                // representing actual SDK bugs.
                // When the browser is out of quota we could get either quota exceeded
                // or an aborted error depending on whether the error happened during
                // schema migration.
                return 22 === t.code || 20 === t.code || 
                // Firefox Private Browsing mode disables IndexedDb and returns
                // INVALID_STATE for any usage.
                11 === t.code;
                return !0;
            }
            /**
 * Clears the persistent storage. This includes pending writes and cached
 * documents.
 *
 * Must be called while the {@link Firestore} instance is not started (after the app is
 * terminated or when the app is first initialized). On startup, this function
 * must be called before other functions (other than {@link
 * initializeFirestore} or {@link getFirestore})). If the {@link Firestore}
 * instance is still running, the promise will be rejected with the error code
 * of `failed-precondition`.
 *
 * Note: `clearIndexedDbPersistence()` is primarily intended to help write
 * reliable tests that use Cloud Firestore. It uses an efficient mechanism for
 * dropping existing data but does not attempt to securely overwrite or
 * otherwise make cached data unrecoverable. For applications that are sensitive
 * to the disclosure of cached data in between user sessions, we strongly
 * recommend not enabling persistence at all.
 *
 * @param firestore - The {@link Firestore} instance to clear persistence for.
 * @returns A `Promise` that is resolved when the persistent storage is
 * cleared. Otherwise, the promise is rejected with an error.
 */ (t)) throw t;
            console.warn("Error enabling offline persistence. Falling back to persistence disabled: " + t), 
            s.reject(t);
        }
    })).then((() => s.promise));
}

function bc(t) {
    if (t._initialized && !t._terminated) throw new Q(G.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
    const e = new j;
    return t._queue.enqueueAndForgetEvenWhileRestricted((async () => {
        try {
            await async function(t) {
                if (!hi.vt()) return Promise.resolve();
                const e = t + "main";
                await hi.delete(e);
            }(Lr(t._databaseId, t._persistenceKey)), e.resolve();
        } catch (t) {
            e.reject(t);
        }
    })), e.promise;
}

/**
 * Waits until all currently pending writes for the active user have been
 * acknowledged by the backend.
 *
 * The returned promise resolves immediately if there are no outstanding writes.
 * Otherwise, the promise waits for all previously issued writes (including
 * those written in a previous app session), but it does not wait for writes
 * that were added after the function is called. If you want to wait for
 * additional writes, call `waitForPendingWrites()` again.
 *
 * Any outstanding `waitForPendingWrites()` promises are rejected during user
 * changes.
 *
 * @returns A `Promise` which resolves when all currently pending writes have been
 * acknowledged by the backend.
 */ function Pc(t) {
    return function(t) {
        const e = new j;
        return t.asyncQueue.enqueueAndForget((async () => Ja(await Ou(t), e))), e.promise;
    }(Ic(t = tc(t, gc)));
}

/**
 * Re-enables use of the network for this {@link Firestore} instance after a prior
 * call to {@link disableNetwork}.
 *
 * @returns A `Promise` that is resolved once the network has been enabled.
 */ function Vc(t) {
    return Fu(Ic(t = tc(t, gc)));
}

/**
 * Disables network usage for this instance. It can be re-enabled via {@link
 * enableNetwork}. While the network is disabled, any snapshot listeners,
 * `getDoc()` or `getDocs()` calls will return results from cache, and any write
 * operations will be queued until the network is restored.
 *
 * @returns A `Promise` that is resolved once the network has been disabled.
 */ function vc(t) {
    return Bu(Ic(t = tc(t, gc)));
}

/**
 * Terminates the provided {@link Firestore} instance.
 *
 * After calling `terminate()` only the `clearIndexedDbPersistence()` function
 * may be used. Any other function will throw a `FirestoreError`.
 *
 * To restart after termination, create a new instance of FirebaseFirestore with
 * {@link getFirestore}.
 *
 * Termination does not cancel any pending writes, and any promises that are
 * awaiting a response from the server will not be resolved. If you have
 * persistence enabled, the next time you start this instance, it will resume
 * sending these writes to the server.
 *
 * Note: Under normal circumstances, calling `terminate()` is not required. This
 * function is useful only when you want to force this instance to release all
 * of its resources or in combination with `clearIndexedDbPersistence()` to
 * ensure that all local state is destroyed between test runs.
 *
 * @returns A `Promise` that is resolved when the instance has been successfully
 * terminated.
 */ function Sc(t) {
    return _removeServiceInstance(t.app, "firestore"), t._delete();
}

/**
 * Loads a Firestore bundle into the local cache.
 *
 * @param firestore - The {@link Firestore} instance to load bundles for.
 * @param bundleData - An object representing the bundle to be loaded. Valid
 * objects are `ArrayBuffer`, `ReadableStream<Uint8Array>` or `string`.
 *
 * @returns A `LoadBundleTask` object, which notifies callers with progress
 * updates, and completion or error events. It can be used as a
 * `Promise<LoadBundleTaskProgress>`.
 */ function Dc(t, e) {
    const n = Ic(t = tc(t, gc)), s = new wc;
    return ju(n, t._databaseId, e, s), s;
}

/**
 * Reads a Firestore {@link Query} from local cache, identified by the given
 * name.
 *
 * The named queries are packaged  into bundles on the server side (along
 * with resulting documents), and loaded to local cache using `loadBundle`. Once
 * in local cache, use this method to extract a {@link Query} by name.
 *
 * @param firestore - The {@link Firestore} instance to read the query from.
 * @param name - The name of the query.
 * @returns A `Promise` that is resolved with the Query or `null`.
 */ function Cc(t, e) {
    return Wu(Ic(t = tc(t, gc)), e).then((e => e ? new oc(t, null, e.query) : null));
}

function xc(t) {
    if (t._initialized || t._terminated) throw new Q(G.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
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
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a `FieldPath` by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 */
class Nc {
    /**
     * Creates a `FieldPath` from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */
    constructor(...t) {
        for (let e = 0; e < t.length; ++e) if (0 === t[e].length) throw new Q(G.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new mt(t);
    }
    /**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */    isEqual(t) {
        return this._internalPath.isEqual(t._internalPath);
    }
}

/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 */ function kc() {
    return new Nc("__name__");
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
 * An immutable object representing an array of bytes.
 */ class Mc {
    /** @hideconstructor */
    constructor(t) {
        this._byteString = t;
    }
    /**
     * Creates a new `Bytes` object from the given Base64 string, converting it to
     * bytes.
     *
     * @param base64 - The Base64 string used to create the `Bytes` object.
     */    static fromBase64String(t) {
        try {
            return new Mc(pt.fromBase64String(t));
        } catch (t) {
            throw new Q(G.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + t);
        }
    }
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */    static fromUint8Array(t) {
        return new Mc(pt.fromUint8Array(t));
    }
    /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */    toBase64() {
        return this._byteString.toBase64();
    }
    /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */    toUint8Array() {
        return this._byteString.toUint8Array();
    }
    /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */    toString() {
        return "Bytes(base64: " + this.toBase64() + ")";
    }
    /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */    isEqual(t) {
        return this._byteString.isEqual(t._byteString);
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
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */ class Oc {
    /**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */
    constructor(t) {
        this._methodName = t;
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
 * An immutable object representing a geographic location in Firestore. The
 * location is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */ class $c {
    /**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */
    constructor(t, e) {
        if (!isFinite(t) || t < -90 || t > 90) throw new Q(G.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180) throw new Q(G.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
        this._lat = t, this._long = e;
    }
    /**
     * The latitude of this `GeoPoint` instance.
     */    get latitude() {
        return this._lat;
    }
    /**
     * The longitude of this `GeoPoint` instance.
     */    get longitude() {
        return this._long;
    }
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */    isEqual(t) {
        return this._lat === t._lat && this._long === t._long;
    }
    /** Returns a JSON-serializable representation of this GeoPoint. */    toJSON() {
        return {
            latitude: this._lat,
            longitude: this._long
        };
    }
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */    _compareTo(t) {
        return rt(this._lat, t._lat) || rt(this._long, t._long);
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
 */ const Fc = /^__.*__$/;

/** The result of parsing document data (e.g. for a setData call). */ class Bc {
    constructor(t, e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    toMutation(t, e) {
        return null !== this.fieldMask ? new pn(t, this.data, this.fieldMask, e, this.fieldTransforms) : new yn(t, this.data, e, this.fieldTransforms);
    }
}

/** The result of parsing "update" data (i.e. for an updateData call). */ class Lc {
    constructor(t, 
    // The fieldMask does not include document transforms.
    e, n) {
        this.data = t, this.fieldMask = e, this.fieldTransforms = n;
    }
    toMutation(t, e) {
        return new pn(t, this.data, this.fieldMask, e, this.fieldTransforms);
    }
}

function qc(t) {
    switch (t) {
      case 0 /* Set */ :
 // fall through
              case 2 /* MergeSet */ :
 // fall through
              case 1 /* Update */ :
        return !0;

      case 3 /* Argument */ :
      case 4 /* ArrayArgument */ :
        return !1;

      default:
        throw L();
    }
}

/** A "context" object passed around while parsing user data. */ class Uc {
    /**
     * Initializes a ParseContext with the given source and path.
     *
     * @param settings - The settings for the parser.
     * @param databaseId - The database ID of the Firestore instance.
     * @param serializer - The serializer to use to generate the Value proto.
     * @param ignoreUndefinedProperties - Whether to ignore undefined properties
     * rather than throw.
     * @param fieldTransforms - A mutable list of field transforms encountered
     * while parsing the data.
     * @param fieldMask - A mutable list of field paths encountered while parsing
     * the data.
     *
     * TODO(b/34871131): We don't support array paths right now, so path can be
     * null to indicate the context represents any location within an array (in
     * which case certain features will not work and errors will be somewhat
     * compromised).
     */
    constructor(t, e, n, s, i, r) {
        this.settings = t, this.databaseId = e, this.M = n, this.ignoreUndefinedProperties = s, 
        // Minor hack: If fieldTransforms is undefined, we assume this is an
        // external call and we need to validate the entire path.
        void 0 === i && this.Wu(), this.fieldTransforms = i || [], this.fieldMask = r || [];
    }
    get path() {
        return this.settings.path;
    }
    get zu() {
        return this.settings.zu;
    }
    /** Returns a new context with the specified settings overwritten. */    Hu(t) {
        return new Uc(Object.assign(Object.assign({}, this.settings), t), this.databaseId, this.M, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
    }
    Ju(t) {
        var e;
        const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), s = this.Hu({
            path: n,
            Yu: !1
        });
        return s.Xu(t), s;
    }
    Zu(t) {
        var e;
        const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), s = this.Hu({
            path: n,
            Yu: !1
        });
        return s.Wu(), s;
    }
    tc(t) {
        // TODO(b/34871131): We don't support array paths right now; so make path
        // undefined.
        return this.Hu({
            path: void 0,
            Yu: !0
        });
    }
    ec(t) {
        return uh(t, this.settings.methodName, this.settings.nc || !1, this.path, this.settings.sc);
    }
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
        return void 0 !== this.fieldMask.find((e => t.isPrefixOf(e))) || void 0 !== this.fieldTransforms.find((e => t.isPrefixOf(e.field)));
    }
    Wu() {
        // TODO(b/34871131): Remove null check once we have proper paths for fields
        // within arrays.
        if (this.path) for (let t = 0; t < this.path.length; t++) this.Xu(this.path.get(t));
    }
    Xu(t) {
        if (0 === t.length) throw this.ec("Document fields must not be empty");
        if (qc(this.zu) && Fc.test(t)) throw this.ec('Document fields cannot begin and end with "__"');
    }
}

/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */ class Kc {
    constructor(t, e, n) {
        this.databaseId = t, this.ignoreUndefinedProperties = e, this.M = n || Oo(t);
    }
    /** Creates a new top-level parse context. */    ic(t, e, n, s = !1) {
        return new Uc({
            zu: t,
            methodName: e,
            sc: n,
            path: mt.emptyPath(),
            Yu: !1,
            nc: s
        }, this.databaseId, this.M, this.ignoreUndefinedProperties);
    }
}

function Gc(t) {
    const e = t._freezeSettings(), n = Oo(t._databaseId);
    return new Kc(t._databaseId, !!e.ignoreUndefinedProperties, n);
}

/** Parse document data from a set() call. */ function Qc(t, e, n, s, i, r = {}) {
    const o = t.ic(r.merge || r.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , e, n, i);
    ih("Data must be an object, but it was:", o, s);
    const a = nh(s, o);
    let u, c;
    if (r.merge) u = new gt(o.fieldMask), c = o.fieldTransforms; else if (r.mergeFields) {
        const t = [];
        for (const s of r.mergeFields) {
            const i = rh(e, s, n);
            if (!o.contains(i)) throw new Q(G.INVALID_ARGUMENT, `Field '${i}' is specified in your field mask but missing from your input data.`);
            ch(t, i) || t.push(i);
        }
        u = new gt(t), c = o.fieldTransforms.filter((t => u.covers(t.field)));
    } else u = null, c = o.fieldTransforms;
    return new Bc(new Xt(a), u, c);
}

class jc extends Oc {
    _toFieldTransform(t) {
        if (2 /* MergeSet */ !== t.zu) throw 1 /* Update */ === t.zu ? t.ec(`${this._methodName}() can only appear at the top level of your update data`) : t.ec(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
        // No transform to add for a delete, but we need to add it to our
        // fieldMask so it gets deleted.
        return t.fieldMask.push(t.path), null;
    }
    isEqual(t) {
        return t instanceof jc;
    }
}

/**
 * Creates a child context for parsing SerializableFieldValues.
 *
 * This is different than calling `ParseContext.contextWith` because it keeps
 * the fieldTransforms and fieldMask separate.
 *
 * The created context has its `dataSource` set to `UserDataSource.Argument`.
 * Although these values are used with writes, any elements in these FieldValues
 * are not considered writes since they cannot contain any FieldValue sentinels,
 * etc.
 *
 * @param fieldValue - The sentinel FieldValue for which to create a child
 *     context.
 * @param context - The parent context.
 * @param arrayElement - Whether or not the FieldValue has an array.
 */ function Wc(t, e, n) {
    return new Uc({
        zu: 3 /* Argument */ ,
        sc: e.settings.sc,
        methodName: t._methodName,
        Yu: n
    }, e.databaseId, e.M, e.ignoreUndefinedProperties);
}

class zc extends Oc {
    _toFieldTransform(t) {
        return new an(t.path, new Xe);
    }
    isEqual(t) {
        return t instanceof zc;
    }
}

class Hc extends Oc {
    constructor(t, e) {
        super(t), this.rc = e;
    }
    _toFieldTransform(t) {
        const e = Wc(this, t, 
        /*array=*/ !0), n = this.rc.map((t => eh(t, e))), s = new Ze(n);
        return new an(t.path, s);
    }
    isEqual(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }
}

class Jc extends Oc {
    constructor(t, e) {
        super(t), this.rc = e;
    }
    _toFieldTransform(t) {
        const e = Wc(this, t, 
        /*array=*/ !0), n = this.rc.map((t => eh(t, e))), s = new en(n);
        return new an(t.path, s);
    }
    isEqual(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }
}

class Yc extends Oc {
    constructor(t, e) {
        super(t), this.oc = e;
    }
    _toFieldTransform(t) {
        const e = new sn(t.M, We(t.M, this.oc));
        return new an(t.path, e);
    }
    isEqual(t) {
        // TODO(mrschmidt): Implement isEquals
        return this === t;
    }
}

/** Parse update data from an update() call. */ function Xc(t, e, n, s) {
    const i = t.ic(1 /* Update */ , e, n);
    ih("Data must be an object, but it was:", i, s);
    const r = [], o = Xt.empty();
    lt(s, ((t, s) => {
        const a = ah(e, t, n);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                s = getModularInstance(s);
        const u = i.Zu(a);
        if (s instanceof jc) 
        // Add it to the field mask, but don't add anything to updateData.
        r.push(a); else {
            const t = eh(s, u);
            null != t && (r.push(a), o.set(a, t));
        }
    }));
    const a = new gt(r);
    return new Lc(o, a, i.fieldTransforms);
}

/** Parse update data from a list of field/value arguments. */ function Zc(t, e, n, s, i, r) {
    const o = t.ic(1 /* Update */ , e, n), a = [ rh(e, s, n) ], u = [ i ];
    if (r.length % 2 != 0) throw new Q(G.INVALID_ARGUMENT, `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);
    for (let t = 0; t < r.length; t += 2) a.push(rh(e, r[t])), u.push(r[t + 1]);
    const c = [], h = Xt.empty();
    // We iterate in reverse order to pick the last value for a field if the
    // user specified the field multiple times.
    for (let t = a.length - 1; t >= 0; --t) if (!ch(c, a[t])) {
        const e = a[t];
        let n = u[t];
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                n = getModularInstance(n);
        const s = o.Zu(e);
        if (n instanceof jc) 
        // Add it to the field mask, but don't add anything to updateData.
        c.push(e); else {
            const t = eh(n, s);
            null != t && (c.push(e), h.set(e, t));
        }
    }
    const l = new gt(c);
    return new Lc(h, l, o.fieldTransforms);
}

/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */ function th(t, e, n, s = !1) {
    return eh(n, t.ic(s ? 4 /* ArrayArgument */ : 3 /* Argument */ , e));
}

/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */ function eh(t, e) {
    if (sh(
    // Unwrap the API type from the Compat SDK. This will return the API type
    // from firestore-exp.
    t = getModularInstance(t))) return ih("Unsupported field value:", e, t), nh(t, e);
    if (t instanceof Oc) 
    // FieldValues usually parse into transforms (except deleteField())
    // in which case we do not want to include this field in our parsed data
    // (as doing so will overwrite the field directly prior to the transform
    // trying to transform it). So we don't add this location to
    // context.fieldMask and we return null as our parsing result.
    /**
 * "Parses" the provided FieldValueImpl, adding any necessary transforms to
 * context.fieldTransforms.
 */
    return function(t, e) {
        // Sentinels are only supported with writes, and not within arrays.
        if (!qc(e.zu)) throw e.ec(`${t._methodName}() can only be used with update() and set()`);
        if (!e.path) throw e.ec(`${t._methodName}() is not currently supported inside arrays`);
        const n = t._toFieldTransform(e);
        n && e.fieldTransforms.push(n);
    }
    /**
 * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
 *
 * @returns The parsed value
 */ (t, e), null;
    if (void 0 === t && e.ignoreUndefinedProperties) 
    // If the input is undefined it can never participate in the fieldMask, so
    // don't handle this below. If `ignoreUndefinedProperties` is false,
    // `parseScalarValue` will reject an undefined value.
    return null;
    if (
    // If context.path is null we are inside an array and we don't support
    // field mask paths more granular than the top-level array.
    e.path && e.fieldMask.push(e.path), t instanceof Array) {
        // TODO(b/34871131): Include the path containing the array in the error
        // message.
        // In the case of IN queries, the parsed data is an array (representing
        // the set of values to be included for the IN query) that may directly
        // contain additional arrays (each representing an individual field
        // value), so we disable this validation.
        if (e.settings.Yu && 4 /* ArrayArgument */ !== e.zu) throw e.ec("Nested arrays are not supported");
        return function(t, e) {
            const n = [];
            let s = 0;
            for (const i of t) {
                let t = eh(i, e.tc(s));
                null == t && (
                // Just include nulls in the array for fields being replaced with a
                // sentinel.
                t = {
                    nullValue: "NULL_VALUE"
                }), n.push(t), s++;
            }
            return {
                arrayValue: {
                    values: n
                }
            };
        }(t, e);
    }
    return function(t, e) {
        if (null === (t = getModularInstance(t))) return {
            nullValue: "NULL_VALUE"
        };
        if ("number" == typeof t) return We(e.M, t);
        if ("boolean" == typeof t) return {
            booleanValue: t
        };
        if ("string" == typeof t) return {
            stringValue: t
        };
        if (t instanceof Date) {
            const n = ut.fromDate(t);
            return {
                timestampValue: rs(e.M, n)
            };
        }
        if (t instanceof ut) {
            // Firestore backend truncates precision down to microseconds. To ensure
            // offline mode works the same with regards to truncation, perform the
            // truncation immediately without waiting for the backend to do that.
            const n = new ut(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
            return {
                timestampValue: rs(e.M, n)
            };
        }
        if (t instanceof $c) return {
            geoPointValue: {
                latitude: t.latitude,
                longitude: t.longitude
            }
        };
        if (t instanceof Mc) return {
            bytesValue: os(e.M, t._byteString)
        };
        if (t instanceof rc) {
            const n = e.databaseId, s = t.firestore._databaseId;
            if (!s.isEqual(n)) throw e.ec(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);
            return {
                referenceValue: cs(t.firestore._databaseId || e.databaseId, t._key.path)
            };
        }
        throw e.ec(`Unsupported field value: ${Zu(t)}`);
    }
    /**
 * Checks whether an object looks like a JSON object that should be converted
 * into a struct. Normal class/prototype instances are considered to look like
 * JSON objects since they should be converted to a struct value. Arrays, Dates,
 * GeoPoints, etc. are not considered to look like JSON objects since they map
 * to specific FieldValue types other than ObjectValue.
 */ (t, e);
}

function nh(t, e) {
    const n = {};
    return ft(t) ? 
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.fieldMask.push(e.path) : lt(t, ((t, s) => {
        const i = eh(s, e.Ju(t));
        null != i && (n[t] = i);
    })), {
        mapValue: {
            fields: n
        }
    };
}

function sh(t) {
    return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof ut || t instanceof $c || t instanceof Mc || t instanceof rc || t instanceof Oc);
}

function ih(t, e, n) {
    if (!sh(n) || !function(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
    }(n)) {
        const s = Zu(n);
        throw "an object" === s ? e.ec(t + " a custom object") : e.ec(t + " " + s);
    }
}

/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */ function rh(t, e, n) {
    if ((
    // If required, replace the FieldPath Compat class with with the firestore-exp
    // FieldPath.
    e = getModularInstance(e)) instanceof Nc) return e._internalPath;
    if ("string" == typeof e) return ah(t, e);
    throw uh("Field path arguments must be of type string or ", t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
}

/**
 * Matches any characters in a field path string that are reserved.
 */ const oh = new RegExp("[~\\*/\\[\\]]");

/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */ function ah(t, e, n) {
    if (e.search(oh) >= 0) throw uh(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`, t, 
    /* hasConverter= */ !1, 
    /* path= */ void 0, n);
    try {
        return new Nc(...e.split("."))._internalPath;
    } catch (s) {
        throw uh(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, n);
    }
}

function uh(t, e, n, s, i) {
    const r = s && !s.isEmpty(), o = void 0 !== i;
    let a = `Function ${e}() called with invalid data`;
    n && (a += " (via `toFirestore()`)"), a += ". ";
    let u = "";
    return (r || o) && (u += " (found", r && (u += ` in field ${s}`), o && (u += ` in document ${i}`), 
    u += ")"), new Q(G.INVALID_ARGUMENT, a + t + u);
}

/** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */ function ch(t, e) {
    return t.some((t => t.isEqual(e)));
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
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ class hh {
    // Note: This class is stripped down version of the DocumentSnapshot in
    // the legacy SDK. The changes are:
    // - No support for SnapshotMetadata.
    // - No support for SnapshotOptions.
    /** @hideconstructor protected */
    constructor(t, e, n, s, i) {
        this._firestore = t, this._userDataWriter = e, this._key = n, this._document = s, 
        this._converter = i;
    }
    /** Property of the `DocumentSnapshot` that provides the document's ID. */    get id() {
        return this._key.path.lastSegment();
    }
    /**
     * The `DocumentReference` for the document included in the `DocumentSnapshot`.
     */    get ref() {
        return new rc(this._firestore, this._converter, this._key);
    }
    /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */    exists() {
        return null !== this._document;
    }
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */    data() {
        if (this._document) {
            if (this._converter) {
                // We only want to use the converter and create a new DocumentSnapshot
                // if a converter has been provided.
                const t = new lh(this._firestore, this._userDataWriter, this._key, this._document, 
                /* converter= */ null);
                return this._converter.fromFirestore(t);
            }
            return this._userDataWriter.convertValue(this._document.data.value);
        }
    }
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(t) {
        if (this._document) {
            const e = this._document.data.field(fh("DocumentSnapshot.get", t));
            if (null !== e) return this._userDataWriter.convertValue(e);
        }
    }
}

/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */ class lh extends hh {
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * @override
     * @returns An `Object` containing all fields in the document.
     */
    data() {
        return super.data();
    }
}

/**
 * Helper that calls `fromDotSeparatedString()` but wraps any error thrown.
 */ function fh(t, e) {
    return "string" == typeof e ? ah(t, e) : e instanceof Nc ? e._internalPath : e._delegate._internalPath;
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
 * Metadata about a snapshot, describing the state of the snapshot.
 */ class dh {
    /** @hideconstructor */
    constructor(t, e) {
        this.hasPendingWrites = t, this.fromCache = e;
    }
    /**
     * Returns true if this `SnapshotMetadata` is equal to the provided one.
     *
     * @param other - The `SnapshotMetadata` to compare against.
     * @returns true if this `SnapshotMetadata` is equal to the provided one.
     */    isEqual(t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
    }
}

/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */ class _h extends hh {
    /** @hideconstructor protected */
    constructor(t, e, n, s, i, r) {
        super(t, e, n, s, r), this._firestore = t, this._firestoreImpl = t, this.metadata = i;
    }
    /**
     * Returns whether or not the data exists. True if the document exists.
     */    exists() {
        return super.exists();
    }
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * By default, `serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document or `undefined` if
     * the document doesn't exist.
     */    data(t = {}) {
        if (this._document) {
            if (this._converter) {
                // We only want to use the converter and create a new DocumentSnapshot
                // if a converter has been provided.
                const e = new wh(this._firestore, this._userDataWriter, this._key, this._document, this.metadata, 
                /* converter= */ null);
                return this._converter.fromFirestore(e, t);
            }
            return this._userDataWriter.convertValue(this._document.data.value, t.serverTimestamps);
        }
    }
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * By default, a `serverTimestamp()` that has not yet been set to
     * its final value will be returned as `null`. You can override this by
     * passing an options object.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @param options - An options object to configure how the field is retrieved
     * from the snapshot (for example the desired behavior for server timestamps
     * that have not yet been set to their final value).
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(t, e = {}) {
        if (this._document) {
            const n = this._document.data.field(fh("DocumentSnapshot.get", t));
            if (null !== n) return this._userDataWriter.convertValue(n, e.serverTimestamps);
        }
    }
}

/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */ class wh extends _h {
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * By default, `serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @override
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document.
     */
    data(t = {}) {
        return super.data(t);
    }
}

/**
 * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
 * representing the results of a query. The documents can be accessed as an
 * array via the `docs` property or enumerated using the `forEach` method. The
 * number of documents can be determined via the `empty` and `size`
 * properties.
 */ class mh {
    /** @hideconstructor */
    constructor(t, e, n, s) {
        this._firestore = t, this._userDataWriter = e, this._snapshot = s, this.metadata = new dh(s.hasPendingWrites, s.fromCache), 
        this.query = n;
    }
    /** An array of all the documents in the `QuerySnapshot`. */    get docs() {
        const t = [];
        return this.forEach((e => t.push(e))), t;
    }
    /** The number of documents in the `QuerySnapshot`. */    get size() {
        return this._snapshot.docs.size;
    }
    /** True if there are no documents in the `QuerySnapshot`. */    get empty() {
        return 0 === this.size;
    }
    /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */    forEach(t, e) {
        this._snapshot.docs.forEach((n => {
            t.call(e, new wh(this._firestore, this._userDataWriter, n.key, n, new dh(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter));
        }));
    }
    /**
     * Returns an array of the documents changes since the last snapshot. If this
     * is the first snapshot, all documents will be in the list as 'added'
     * changes.
     *
     * @param options - `SnapshotListenOptions` that control whether metadata-only
     * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
     * snapshot events.
     */    docChanges(t = {}) {
        const e = !!t.includeMetadataChanges;
        if (e && this._snapshot.excludesMetadataChanges) throw new Q(G.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = 
        /** Calculates the array of `DocumentChange`s for a given `ViewSnapshot`. */
        function(t, e) {
            if (t._snapshot.oldDocs.isEmpty()) {
                let e = 0;
                return t._snapshot.docChanges.map((n => ({
                    type: "added",
                    doc: new wh(t._firestore, t._userDataWriter, n.doc.key, n.doc, new dh(t._snapshot.mutatedKeys.has(n.doc.key), t._snapshot.fromCache), t.query.converter),
                    oldIndex: -1,
                    newIndex: e++
                })));
            }
            {
                // A `DocumentSet` that is updated incrementally as changes are applied to use
                // to lookup the index of a document.
                let n = t._snapshot.oldDocs;
                return t._snapshot.docChanges.filter((t => e || 3 /* Metadata */ !== t.type)).map((e => {
                    const s = new wh(t._firestore, t._userDataWriter, e.doc.key, e.doc, new dh(t._snapshot.mutatedKeys.has(e.doc.key), t._snapshot.fromCache), t.query.converter);
                    let i = -1, r = -1;
                    return 0 /* Added */ !== e.type && (i = n.indexOf(e.doc.key), n = n.delete(e.doc.key)), 
                    1 /* Removed */ !== e.type && (n = n.add(e.doc), r = n.indexOf(e.doc.key)), {
                        type: gh(e.type),
                        doc: s,
                        oldIndex: i,
                        newIndex: r
                    };
                }));
            }
        }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
    }
}

function gh(t) {
    switch (t) {
      case 0 /* Added */ :
        return "added";

      case 2 /* Modified */ :
      case 3 /* Metadata */ :
        return "modified";

      case 1 /* Removed */ :
        return "removed";

      default:
        return L();
    }
}

// TODO(firestoreexp): Add tests for snapshotEqual with different snapshot
// metadata
/**
 * Returns true if the provided snapshots are equal.
 *
 * @param left - A snapshot to compare.
 * @param right - A snapshot to compare.
 * @returns true if the snapshots are equal.
 */ function yh(t, e) {
    return t instanceof _h && e instanceof _h ? t._firestore === e._firestore && t._key.isEqual(e._key) && (null === t._document ? null === e._document : t._document.isEqual(e._document)) && t._converter === e._converter : t instanceof mh && e instanceof mh && (t._firestore === e._firestore && fc(t.query, e.query) && t.metadata.isEqual(e.metadata) && t._snapshot.isEqual(e._snapshot));
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
 */ function ph(t) {
    if (xe(t) && 0 === t.explicitOrderBy.length) throw new Q(G.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */ class Ih {}

/**
 * Creates a new immutable instance of {@link Query} that is extended to also include
 * additional query constraints.
 *
 * @param query - The {@link Query} instance to use as a base for the new constraints.
 * @param queryConstraints - The list of {@link QueryConstraint}s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */ function Th(t, ...e) {
    for (const n of e) t = n._apply(t);
    return t;
}

class Eh extends Ih {
    constructor(t, e, n) {
        super(), this.ac = t, this.uc = e, this.cc = n, this.type = "where";
    }
    _apply(t) {
        const e = Gc(t.firestore), n = function(t, e, n, s, i, r, o) {
            let a;
            if (i.isKeyField()) {
                if ("array-contains" /* ARRAY_CONTAINS */ === r || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === r) throw new Q(G.INVALID_ARGUMENT, `Invalid Query. You can't perform '${r}' queries on documentId().`);
                if ("in" /* IN */ === r || "not-in" /* NOT_IN */ === r) {
                    $h(o, r);
                    const e = [];
                    for (const n of o) e.push(Oh(s, t, n));
                    a = {
                        arrayValue: {
                            values: e
                        }
                    };
                } else a = Oh(s, t, o);
            } else "in" /* IN */ !== r && "not-in" /* NOT_IN */ !== r && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== r || $h(o, r), 
            a = th(n, e, o, 
            /* allowArrays= */ "in" /* IN */ === r || "not-in" /* NOT_IN */ === r);
            const u = _e.create(i, r, a);
            return function(t, e) {
                if (e.S()) {
                    const n = ke(t);
                    if (null !== n && !n.isEqual(e.field)) throw new Q(G.INVALID_ARGUMENT, `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);
                    const s = Ne(t);
                    null !== s && Fh(t, e.field, s);
                }
                const n = function(t, e) {
                    for (const n of t.filters) if (e.indexOf(n.op) >= 0) return n.op;
                    return null;
                }(t, 
                /**
 * Given an operator, returns the set of operators that cannot be used with it.
 *
 * Operators in a query must adhere to the following set of rules:
 * 1. Only one array operator is allowed.
 * 2. Only one disjunctive operator is allowed.
 * 3. `NOT_EQUAL` cannot be used with another `NOT_EQUAL` operator.
 * 4. `NOT_IN` cannot be used with array, disjunctive, or `NOT_EQUAL` operators.
 *
 * Array operators: `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ANY`
 * Disjunctive operators: `IN`, `ARRAY_CONTAINS_ANY`, `NOT_IN`
 */
                function(t) {
                    switch (t) {
                      case "!=" /* NOT_EQUAL */ :
                        return [ "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ];

                      case "array-contains" /* ARRAY_CONTAINS */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "not-in" /* NOT_IN */ ];

                      case "in" /* IN */ :
                        return [ "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                      case "array-contains-any" /* ARRAY_CONTAINS_ANY */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                      case "not-in" /* NOT_IN */ :
                        return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ , "!=" /* NOT_EQUAL */ ];

                      default:
                        return [];
                    }
                }(e.op));
                if (null !== n) 
                // Special case when it's a duplicate op to give a slightly clearer error message.
                throw n === e.op ? new Q(G.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`) : new Q(G.INVALID_ARGUMENT, `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`);
            }(t, u), u;
        }(t._query, "where", e, t.firestore._databaseId, this.ac, this.uc, this.cc);
        return new oc(t.firestore, t.converter, function(t, e) {
            const n = t.filters.concat([ e ]);
            return new ve(t.path, t.collectionGroup, t.explicitOrderBy.slice(), n, t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, n));
    }
}

/**
 * Creates a {@link QueryConstraint} that enforces that documents must contain the
 * specified field and that the value should satisfy the relation constraint
 * provided.
 *
 * @param fieldPath - The path to compare
 * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
 *   "&lt;=", "!=").
 * @param value - The value for comparison
 * @returns The created {@link Query}.
 */ function Ah(t, e, n) {
    const s = e, i = fh("where", t);
    return new Eh(i, s, n);
}

class Rh extends Ih {
    constructor(t, e) {
        super(), this.ac = t, this.hc = e, this.type = "orderBy";
    }
    _apply(t) {
        const e = function(t, e, n) {
            if (null !== t.startAt) throw new Q(G.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
            if (null !== t.endAt) throw new Q(G.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
            const s = new Re(e, n);
            return function(t, e) {
                if (null === Ne(t)) {
                    // This is the first order by. It must match any inequality.
                    const n = ke(t);
                    null !== n && Fh(t, n, e.field);
                }
            }(t, s), s;
        }
        /**
 * Create a `Bound` from a query and a document.
 *
 * Note that the `Bound` will always include the key of the document
 * and so only the provided document will compare equal to the returned
 * position.
 *
 * Will throw if the document does not contain all fields of the order by
 * of the query or if any of the fields in the order by are an uncommitted
 * server timestamp.
 */ (t._query, this.ac, this.hc);
        return new oc(t.firestore, t.converter, function(t, e) {
            // TODO(dimond): validate that orderBy does not list the same key twice.
            const n = t.explicitOrderBy.concat([ e ]);
            return new ve(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
        }(t._query, e));
    }
}

/**
 * Creates a {@link QueryConstraint} that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created {@link Query}.
 */ function bh(t, e = "asc") {
    const n = e, s = fh("orderBy", t);
    return new Rh(s, n);
}

class Ph extends Ih {
    constructor(t, e, n) {
        super(), this.type = t, this.lc = e, this.fc = n;
    }
    _apply(t) {
        return new oc(t.firestore, t.converter, Fe(t._query, this.lc, this.fc));
    }
}

/**
 * Creates a {@link QueryConstraint} that only returns the first matching documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */ function Vh(t) {
    return ec("limit", t), new Ph("limit", t, "F" /* First */);
}

/**
 * Creates a {@link QueryConstraint} that only returns the last matching documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */ function vh(t) {
    return ec("limitToLast", t), new Ph("limitToLast", t, "L" /* Last */);
}

class Sh extends Ih {
    constructor(t, e, n) {
        super(), this.type = t, this.dc = e, this._c = n;
    }
    _apply(t) {
        const e = Mh(t, this.type, this.dc, this._c);
        return new oc(t.firestore, t.converter, function(t, e) {
            return new ve(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, e, t.endAt);
        }(t._query, e));
    }
}

function Dh(...t) {
    return new Sh("startAt", t, 
    /*inclusive=*/ !0);
}

function Ch(...t) {
    return new Sh("startAfter", t, 
    /*inclusive=*/ !1);
}

class xh extends Ih {
    constructor(t, e, n) {
        super(), this.type = t, this.dc = e, this._c = n;
    }
    _apply(t) {
        const e = Mh(t, this.type, this.dc, this._c);
        return new oc(t.firestore, t.converter, function(t, e) {
            return new ve(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, e);
        }(t._query, e));
    }
}

function Nh(...t) {
    return new xh("endBefore", t, 
    /*inclusive=*/ !1);
}

function kh(...t) {
    return new xh("endAt", t, /*inclusive=*/ !0);
}

/** Helper function to create a bound from a document or fields */ function Mh(t, e, n, s) {
    if (n[0] = getModularInstance(n[0]), n[0] instanceof hh) return function(t, e, n, s, i) {
        if (!s) throw new Q(G.NOT_FOUND, `Can't use a DocumentSnapshot that doesn't exist for ${n}().`);
        const r = [];
        // Because people expect to continue/end a query at the exact document
        // provided, we need to use the implicit sort order rather than the explicit
        // sort order, because it's guaranteed to contain the document key. That way
        // the position becomes unambiguous and the query continues/ends exactly at
        // the provided document. Without the key (by using the explicit sort
        // orders), multiple documents could match the position, yielding duplicate
        // results.
                for (const n of Oe(t)) if (n.field.isKeyField()) r.push(Ut(e, s.key)); else {
            const t = s.data.field(n.field);
            if (Rt(t)) throw new Q(G.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + n.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
            if (null === t) {
                const t = n.field.canonicalString();
                throw new Q(G.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`);
            }
            r.push(t);
        }
        return new Ae(r, i);
    }
    /**
 * Converts a list of field values to a `Bound` for the given query.
 */ (t._query, t.firestore._databaseId, e, n[0]._document, s);
    {
        const i = Gc(t.firestore);
        return function(t, e, n, s, i, r) {
            // Use explicit order by's because it has to match the query the user made
            const o = t.explicitOrderBy;
            if (i.length > o.length) throw new Q(G.INVALID_ARGUMENT, `Too many arguments provided to ${s}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
            const a = [];
            for (let r = 0; r < i.length; r++) {
                const u = i[r];
                if (o[r].field.isKeyField()) {
                    if ("string" != typeof u) throw new Q(G.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ${s}(), but got a ${typeof u}`);
                    if (!Me(t) && -1 !== u.indexOf("/")) throw new Q(G.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by documentId(), the value passed to ${s}() must be a plain document ID, but '${u}' contains a slash.`);
                    const n = t.path.child(_t.fromString(u));
                    if (!xt.isDocumentKey(n)) throw new Q(G.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${s}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);
                    const i = new xt(n);
                    a.push(Ut(e, i));
                } else {
                    const t = th(n, s, u);
                    a.push(t);
                }
            }
            return new Ae(a, r);
        }
        /**
 * Parses the given `documentIdValue` into a `ReferenceValue`, throwing
 * appropriate errors if the value is anything other than a `DocumentReference`
 * or `string`, or if the string is malformed.
 */ (t._query, t.firestore._databaseId, i, e, n, s);
    }
}

function Oh(t, e, n) {
    if ("string" == typeof (n = getModularInstance(n))) {
        if ("" === n) throw new Q(G.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
        if (!Me(e) && -1 !== n.indexOf("/")) throw new Q(G.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
        const s = e.path.child(_t.fromString(n));
        if (!xt.isDocumentKey(s)) throw new Q(G.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);
        return Ut(t, new xt(s));
    }
    if (n instanceof rc) return Ut(t, n._key);
    throw new Q(G.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Zu(n)}.`);
}

/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */ function $h(t, e) {
    if (!Array.isArray(t) || 0 === t.length) throw new Q(G.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
    if (t.length > 10) throw new Q(G.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`);
}

function Fh(t, e, n) {
    if (!n.isEqual(e)) throw new Q(G.INVALID_ARGUMENT, `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`);
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
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */ class Bh {
    convertValue(t, e = "none") {
        switch (Mt(t)) {
          case 0 /* NullValue */ :
            return null;

          case 1 /* BooleanValue */ :
            return t.booleanValue;

          case 2 /* NumberValue */ :
            return Et(t.integerValue || t.doubleValue);

          case 3 /* TimestampValue */ :
            return this.convertTimestamp(t.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return this.convertServerTimestamp(t, e);

          case 5 /* StringValue */ :
            return t.stringValue;

          case 6 /* BlobValue */ :
            return this.convertBytes(At(t.bytesValue));

          case 7 /* RefValue */ :
            return this.convertReference(t.referenceValue);

          case 8 /* GeoPointValue */ :
            return this.convertGeoPoint(t.geoPointValue);

          case 9 /* ArrayValue */ :
            return this.convertArray(t.arrayValue, e);

          case 10 /* ObjectValue */ :
            return this.convertObject(t.mapValue, e);

          default:
            throw L();
        }
    }
    convertObject(t, e) {
        const n = {};
        return lt(t.fields, ((t, s) => {
            n[t] = this.convertValue(s, e);
        })), n;
    }
    convertGeoPoint(t) {
        return new $c(Et(t.latitude), Et(t.longitude));
    }
    convertArray(t, e) {
        return (t.values || []).map((t => this.convertValue(t, e)));
    }
    convertServerTimestamp(t, e) {
        switch (e) {
          case "previous":
            const n = bt(t);
            return null == n ? null : this.convertValue(n, e);

          case "estimate":
            return this.convertTimestamp(Pt(t));

          default:
            return null;
        }
    }
    convertTimestamp(t) {
        const e = Tt(t);
        return new ut(e.seconds, e.nanos);
    }
    convertDocumentKey(t, e) {
        const n = _t.fromString(t);
        q(Os(n));
        const s = new vt(n.get(1), n.get(3)), i = new xt(n.popFirst(5));
        return s.isEqual(e) || 
        // TODO(b/64130202): Somehow support foreign references.
        $(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`), 
        i;
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
 * Converts custom model object of type T into `DocumentData` by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to `DocumentData`
 * because we want to provide the user with a more specific error message if
 * their `set()` or fails due to invalid data originating from a `toFirestore()`
 * call.
 */ function Lh(t, e, n) {
    let s;
    // Cast to `any` in order to satisfy the union type constraint on
    // toFirestore().
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return s = t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e, 
    s;
}

class qh extends Bh {
    constructor(t) {
        super(), this.firestore = t;
    }
    convertBytes(t) {
        return new Mc(t);
    }
    convertReference(t) {
        const e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new rc(this.firestore, /* converter= */ null, e);
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
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */ class Uh {
    /** @hideconstructor */
    constructor(t, e) {
        this._firestore = t, this._commitHandler = e, this._mutations = [], this._committed = !1, 
        this._dataReader = Gc(t);
    }
    set(t, e, n) {
        this._verifyNotCommitted();
        const s = Kh(t, this._firestore), i = Lh(s.converter, e, n), r = Qc(this._dataReader, "WriteBatch.set", s._key, i, null !== s.converter, n);
        return this._mutations.push(r.toMutation(s._key, hn.none())), this;
    }
    update(t, e, n, ...s) {
        this._verifyNotCommitted();
        const i = Kh(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                let r;
        return r = "string" == typeof (e = getModularInstance(e)) || e instanceof Nc ? Zc(this._dataReader, "WriteBatch.update", i._key, e, n, s) : Xc(this._dataReader, "WriteBatch.update", i._key, e), 
        this._mutations.push(r.toMutation(i._key, hn.exists(!0))), this;
    }
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */    delete(t) {
        this._verifyNotCommitted();
        const e = Kh(t, this._firestore);
        return this._mutations = this._mutations.concat(new An(e._key, hn.none())), this;
    }
    /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A `Promise` resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit (note that it won't
     * resolve while you're offline).
     */    commit() {
        return this._verifyNotCommitted(), this._committed = !0, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
    }
    _verifyNotCommitted() {
        if (this._committed) throw new Q(G.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
    }
}

function Kh(t, e) {
    if ((t = getModularInstance(t)).firestore !== e) throw new Q(G.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
    return t;
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
// TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
// legacy SDK.
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */
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
 * Reads the document referred to by this `DocumentReference`.
 *
 * Note: `getDoc()` attempts to provide up-to-date data when possible by waiting
 * for data from the server, but it may return cached data or fail if you are
 * offline and the server cannot be reached. To specify this behavior, invoke
 * {@link getDocFromCache} or {@link getDocFromServer}.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */
function Gh(t) {
    t = tc(t, rc);
    const e = tc(t.firestore, gc);
    return qu(Ic(e), t._key).then((n => il(e, t, n)));
}

class Qh extends Bh {
    constructor(t) {
        super(), this.firestore = t;
    }
    convertBytes(t) {
        return new Mc(t);
    }
    convertReference(t) {
        const e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new rc(this.firestore, /* converter= */ null, e);
    }
}

/**
 * Reads the document referred to by this `DocumentReference` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A `Promise` resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function jh(t) {
    t = tc(t, rc);
    const e = tc(t.firestore, gc), n = Ic(e), s = new Qh(e);
    return Lu(n, t._key).then((n => new _h(e, s, t._key, n, new dh(null !== n && n.hasLocalMutations, 
    /* fromCache= */ !0), t.converter)));
}

/**
 * Reads the document referred to by this `DocumentReference` from the server.
 * Returns an error if the network is not available.
 *
 * @returns A `Promise` resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */ function Wh(t) {
    t = tc(t, rc);
    const e = tc(t.firestore, gc);
    return qu(Ic(e), t._key, {
        source: "server"
    }).then((n => il(e, t, n)));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot`.
 *
 * Note: `getDocs()` attempts to provide up-to-date data when possible by
 * waiting for data from the server, but it may return cached data or fail if
 * you are offline and the server cannot be reached. To specify this behavior,
 * invoke {@link getDocsFromCache} or {@link getDocsFromServer}.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ function zh(t) {
    t = tc(t, oc);
    const e = tc(t.firestore, gc), n = Ic(e), s = new Qh(e);
    return ph(t._query), Ku(n, t._query).then((n => new mh(e, s, t, n)));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot` from cache.
 * Returns an error if the document is not currently cached.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ function Hh(t) {
    t = tc(t, oc);
    const e = tc(t.firestore, gc), n = Ic(e), s = new Qh(e);
    return Uu(n, t._query).then((n => new mh(e, s, t, n)));
}

/**
 * Executes the query and returns the results as a `QuerySnapshot` from the
 * server. Returns an error if the network is not available.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */ function Jh(t) {
    t = tc(t, oc);
    const e = tc(t.firestore, gc), n = Ic(e), s = new Qh(e);
    return Ku(n, t._query, {
        source: "server"
    }).then((n => new mh(e, s, t, n)));
}

function Yh(t, e, n) {
    t = tc(t, rc);
    const s = tc(t.firestore, gc), i = Lh(t.converter, e, n);
    return sl(s, [ Qc(Gc(s), "setDoc", t._key, i, null !== t.converter, n).toMutation(t._key, hn.none()) ]);
}

function Xh(t, e, n, ...s) {
    t = tc(t, rc);
    const i = tc(t.firestore, gc), r = Gc(i);
    let o;
    o = "string" == typeof (
    // For Compat types, we have to "extract" the underlying types before
    // performing validation.
    e = getModularInstance(e)) || e instanceof Nc ? Zc(r, "updateDoc", t._key, e, n, s) : Xc(r, "updateDoc", t._key, e);
    return sl(i, [ o.toMutation(t._key, hn.exists(!0)) ]);
}

/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * @param reference - A reference to the document to delete.
 * @returns A Promise resolved once the document has been successfully
 * deleted from the backend (note that it won't resolve while you're offline).
 */ function Zh(t) {
    return sl(tc(t.firestore, gc), [ new An(t._key, hn.none()) ]);
}

/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A `Promise` resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend (Note that it
 * won't resolve while you're offline).
 */ function tl(t, e) {
    const n = tc(t.firestore, gc), s = hc(t), i = Lh(t.converter, e);
    return sl(n, [ Qc(Gc(t.firestore), "addDoc", s._key, i, null !== t.converter, {}).toMutation(s._key, hn.exists(!1)) ]).then((() => s));
}

function el(t, ...e) {
    var n, s, i;
    t = getModularInstance(t);
    let r = {
        includeMetadataChanges: !1
    }, o = 0;
    "object" != typeof e[o] || _c(e[o]) || (r = e[o], o++);
    const a = {
        includeMetadataChanges: r.includeMetadataChanges
    };
    if (_c(e[o])) {
        const t = e[o];
        e[o] = null === (n = t.next) || void 0 === n ? void 0 : n.bind(t), e[o + 1] = null === (s = t.error) || void 0 === s ? void 0 : s.bind(t), 
        e[o + 2] = null === (i = t.complete) || void 0 === i ? void 0 : i.bind(t);
    }
    let u, c, h;
    if (t instanceof rc) c = tc(t.firestore, gc), h = De(t._key.path), u = {
        next: n => {
            e[o] && e[o](il(c, t, n));
        },
        error: e[o + 1],
        complete: e[o + 2]
    }; else {
        const n = tc(t, oc);
        c = tc(n.firestore, gc), h = n._query;
        const s = new Qh(c);
        u = {
            next: t => {
                e[o] && e[o](new mh(c, s, n, t));
            },
            error: e[o + 1],
            complete: e[o + 2]
        }, ph(t._query);
    }
    return function(t, e, n, s) {
        const i = new Ru(s), r = new Da(e, i, n);
        return t.asyncQueue.enqueueAndForget((async () => ba(await $u(t), r))), () => {
            i.mu(), t.asyncQueue.enqueueAndForget((async () => Pa(await $u(t), r)));
        };
    }(Ic(c), h, a, u);
}

function nl(t, e) {
    return Gu(Ic(t = tc(t, gc)), _c(e) ? e : {
        next: e
    });
}

/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */ function sl(t, e) {
    return function(t, e) {
        const n = new j;
        return t.asyncQueue.enqueueAndForget((async () => Ga(await Ou(t), e, n))), n.promise;
    }(Ic(t), e);
}

/**
 * Converts a {@link ViewSnapshot} that contains the single document specified by `ref`
 * to a {@link DocumentSnapshot}.
 */ function il(t, e, n) {
    const s = n.docs.get(e._key), i = new Qh(t);
    return new _h(t, i, e._key, s, new dh(n.hasPendingWrites, n.fromCache), e.converter);
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
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */ class rl extends class {
    /** @hideconstructor */
    constructor(t, e) {
        this._firestore = t, this._transaction = e, this._dataReader = Gc(t);
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */    get(t) {
        const e = Kh(t, this._firestore), n = new qh(this._firestore);
        return this._transaction.lookup([ e._key ]).then((t => {
            if (!t || 1 !== t.length) return L();
            const s = t[0];
            if (s.isFoundDocument()) return new hh(this._firestore, n, s.key, s, e.converter);
            if (s.isNoDocument()) return new hh(this._firestore, n, e._key, null, e.converter);
            throw L();
        }));
    }
    set(t, e, n) {
        const s = Kh(t, this._firestore), i = Lh(s.converter, e, n), r = Qc(this._dataReader, "Transaction.set", s._key, i, null !== s.converter, n);
        return this._transaction.set(s._key, r), this;
    }
    update(t, e, n, ...s) {
        const i = Kh(t, this._firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
                let r;
        return r = "string" == typeof (e = getModularInstance(e)) || e instanceof Nc ? Zc(this._dataReader, "Transaction.update", i._key, e, n, s) : Xc(this._dataReader, "Transaction.update", i._key, e), 
        this._transaction.update(i._key, r), this;
    }
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */    delete(t) {
        const e = Kh(t, this._firestore);
        return this._transaction.delete(e._key), this;
    }
} {
    // This class implements the same logic as the Transaction API in the Lite SDK
    // but is subclassed in order to return its own DocumentSnapshot types.
    /** @hideconstructor */
    constructor(t, e) {
        super(t, e), this._firestore = t;
    }
    /**
     * Reads the document referenced by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be read.
     * @returns A `DocumentSnapshot` with the read data.
     */    get(t) {
        const e = Kh(t, this._firestore), n = new Qh(this._firestore);
        return super.get(t).then((t => new _h(this._firestore, n, e._key, t._document, new dh(
        /* hasPendingWrites= */ !1, 
        /* fromCache= */ !1), e.converter)));
    }
}

/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * The maximum number of writes allowed in a single transaction is 500.
 *
 * @param firestore - A reference to the Firestore database to run this
 * transaction against.
 * @param updateFunction - The function to execute within the transaction
 * context.
 * @returns If the transaction completed successfully or was explicitly aborted
 * (the `updateFunction` returned a failed promise), the promise returned by the
 * `updateFunction `is returned here. Otherwise, if the transaction failed, a
 * rejected promise with the corresponding failure error is returned.
 */ function ol(t, e) {
    return Qu(Ic(t = tc(t, gc)), (n => e(new rl(t, n))));
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
 * Returns a sentinel for use with {@link @firebase/firestore/lite#(updateDoc:1)} or
 * {@link @firebase/firestore/lite#(setDoc:1)} with `{merge: true}` to mark a field for deletion.
 */ function al() {
    return new jc("deleteField");
}

/**
 * Returns a sentinel used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link @firebase/firestore/lite#(updateDoc:1)} to
 * include a server-generated timestamp in the written data.
 */ function ul() {
    return new zc("serverTimestamp");
}

/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to union the given elements with any array
 * value that already exists on the server. Each specified element that doesn't
 * already exist in the array will be added to the end. If the field being
 * modified is not already an array it will be overwritten with an array
 * containing exactly the specified elements.
 *
 * @param elements - The elements to union into the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`.
 */ function cl(...t) {
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
    return new Hc("arrayUnion", t);
}

/**
 * Returns a special value that can be used with {@link (setDoc:1)} or {@link
 * updateDoc:1} that tells the server to remove the given elements from any
 * array value that already exists on the server. All instances of each element
 * specified will be removed from the array. If the field being modified is not
 * already an array it will be overwritten with an empty array.
 *
 * @param elements - The elements to remove from the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */ function hl(...t) {
    // NOTE: We don't actually parse the data until it's used in set() or
    // update() since we'd need the Firestore instance to do this.
    return new Jc("arrayRemove", t);
}

/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to increment the field's current value by
 * the given value.
 *
 * If either the operand or the current field value uses floating point
 * precision, all arithmetic follows IEEE 754 semantics. If both values are
 * integers, values outside of JavaScript's safe number range
 * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
 * precision loss. Furthermore, once processed by the Firestore backend, all
 * integer operations are capped between -2^63 and 2^63-1.
 *
 * If the current field value is not of type `number`, or if the field does not
 * yet exist, the transformation sets the field to the given value.
 *
 * @param n - The value to increment by.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */ function ll(t) {
    return new Yc("increment", t);
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
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single {@link WriteBatch}
 * is 500.
 *
 * Unlike transactions, write batches are persisted offline and therefore are
 * preferable when you don't need to condition your writes on read data.
 *
 * @returns A {@link WriteBatch} that can be used to atomically execute multiple
 * writes.
 */ function fl(t) {
    return Ic(t = tc(t, gc)), new Uh(t, (e => sl(t, e)));
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
 */ function dl(t, e) {
    Ic(t = tc(t, gc));
    const n = "string" == typeof e ? function(t) {
        try {
            return JSON.parse(t);
        } catch (t) {
            throw new Q(G.INVALID_ARGUMENT, "Failed to parse JSON:" + t.message);
        }
    }(e) : e, s = [];
    // PORTING NOTE: We don't return an error if the user has not enabled
    // persistence since `enableIndexeddbPersistence()` can fail on the Web.
    if (Array.isArray(n.indexes)) for (const t of n.indexes) {
        const e = _l(t, "collectionGroup"), n = [];
        if (Array.isArray(t.fields)) for (const e of t.fields) {
            const t = ah("setIndexConfiguration", _l(e, "fieldPath"));
            "CONTAINS" === e.arrayConfig ? n.push(new ie(t, 2 /* CONTAINS */)) : "ASCENDING" === e.order ? n.push(new ie(t, 0 /* ASCENDING */)) : "DESCENDING" === e.order && n.push(new ie(t, 1 /* DESCENDING */));
        }
        s.push(new ee(ee.UNKNOWN_ID, e, n, re.empty()));
    }
    // TODO(indexing): Configure indexes
        return Promise.resolve();
}

function _l(t, e) {
    if ("string" != typeof t[e]) throw new Q(G.INVALID_ARGUMENT, "Missing string value for: " + e);
    return t[e];
}

/**
 * Cloud Firestore
 *
 * @packageDocumentation
 */ !function(t, e = !0) {
    !function(t) {
        x = t;
    }(SDK_VERSION), _registerComponent(new Component("firestore", ((t, {options: n}) => {
        const s = t.getProvider("app").getImmediate(), i = new gc(s, new J(t.getProvider("auth-internal")), new tt(t.getProvider("app-check-internal")));
        return n = Object.assign({
            useFetchStreams: e
        }, n), i._setSettings(n), i;
    }), "PUBLIC")), registerVersion(D, "3.4.5", t), 
    // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
    registerVersion(D, "3.4.5", "esm2017");
}();

export { Bh as AbstractUserDataWriter, Mc as Bytes, mc as CACHE_SIZE_UNLIMITED, ac as CollectionReference, rc as DocumentReference, _h as DocumentSnapshot, Nc as FieldPath, Oc as FieldValue, gc as Firestore, Q as FirestoreError, $c as GeoPoint, wc as LoadBundleTask, oc as Query, Ih as QueryConstraint, wh as QueryDocumentSnapshot, mh as QuerySnapshot, dh as SnapshotMetadata, ut as Timestamp, rl as Transaction, Uh as WriteBatch, vt as _DatabaseId, xt as _DocumentKey, et as _EmptyAppCheckTokenProvider, z as _EmptyAuthCredentialsProvider, mt as _FieldPath, tc as _cast, U as _debugAssert, yt as _isBase64Available, F as _logWarn, dl as _setIndexConfiguration, Ju as _validateIsNotUsedTogether, tl as addDoc, hl as arrayRemove, cl as arrayUnion, bc as clearIndexedDbPersistence, uc as collection, cc as collectionGroup, ic as connectFirestoreEmulator, Zh as deleteDoc, al as deleteField, vc as disableNetwork, hc as doc, kc as documentId, Ec as enableIndexedDbPersistence, Ac as enableMultiTabIndexedDbPersistence, Vc as enableNetwork, kh as endAt, Nh as endBefore, Ic as ensureFirestoreConfigured, sl as executeWrite, Gh as getDoc, jh as getDocFromCache, Wh as getDocFromServer, zh as getDocs, Hh as getDocsFromCache, Jh as getDocsFromServer, pc as getFirestore, ll as increment, yc as initializeFirestore, Vh as limit, vh as limitToLast, Dc as loadBundle, Cc as namedQuery, el as onSnapshot, nl as onSnapshotsInSync, bh as orderBy, Th as query, fc as queryEqual, lc as refEqual, ol as runTransaction, ul as serverTimestamp, Yh as setDoc, M as setLogLevel, yh as snapshotEqual, Ch as startAfter, Dh as startAt, Sc as terminate, Xh as updateDoc, Pc as waitForPendingWrites, Ah as where, fl as writeBatch };

//# sourceMappingURL=firebase-firestore.js.map
