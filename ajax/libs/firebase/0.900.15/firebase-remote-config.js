(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase['remote-config'] = global.firebase['remote-config'] || {}), global.firebase.app));
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
    var DEFAULT_INTERVAL_MILLIS = 1000;
    /**
     * The factor to backoff by.
     * Should be a number greater than 1.
     */
    var DEFAULT_BACKOFF_FACTOR = 2;
    /**
     * The maximum milliseconds to increase to.
     *
     * <p>Visible for testing
     */
    var MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.
    /**
     * The percentage of backoff time to randomize by.
     * See
     * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
     * for context.
     *
     * <p>Visible for testing
     */
    var RANDOM_FACTOR = 0.5;
    /**
     * Based on the backoff method from
     * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
     * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
     */
    function calculateBackoffMillis(backoffCount, intervalMillis, backoffFactor) {
        if (intervalMillis === void 0) { intervalMillis = DEFAULT_INTERVAL_MILLIS; }
        if (backoffFactor === void 0) { backoffFactor = DEFAULT_BACKOFF_FACTOR; }
        // Calculates an exponentially increasing value.
        // Deviation: calculates value from count and a constant interval, so we only need to save value
        // and count to restore state.
        var currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount);
        // A random "fuzz" to avoid waves of retries.
        // Deviation: randomFactor is required.
        var randomWait = Math.round(
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
            console[method].apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
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
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
        };
        Logger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
        };
        Logger.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
        };
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
        };
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
        };
        return Logger;
    }());

    var name = "@firebase/remote-config-exp";
    var version = "0.0.900";

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
     * Shims a minimal AbortSignal.
     *
     * <p>AbortController's AbortSignal conveniently decouples fetch timeout logic from other aspects
     * of networking, such as retries. Firebase doesn't use AbortController enough to justify a
     * polyfill recommendation, like we do with the Fetch API, but this minimal shim can easily be
     * swapped out if/when we do.
     */
    var RemoteConfigAbortSignal = /** @class */ (function () {
        function RemoteConfigAbortSignal() {
            this.listeners = [];
        }
        RemoteConfigAbortSignal.prototype.addEventListener = function (listener) {
            this.listeners.push(listener);
        };
        RemoteConfigAbortSignal.prototype.abort = function () {
            this.listeners.forEach(function (listener) { return listener(); });
        };
        return RemoteConfigAbortSignal;
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
    var RC_COMPONENT_NAME = 'remote-config-exp';

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
    var _a$1;
    var ERROR_DESCRIPTION_MAP = (_a$1 = {},
        _a$1["registration-window" /* REGISTRATION_WINDOW */] = 'Undefined window object. This SDK only supports usage in a browser environment.',
        _a$1["registration-project-id" /* REGISTRATION_PROJECT_ID */] = 'Undefined project identifier. Check Firebase app initialization.',
        _a$1["registration-api-key" /* REGISTRATION_API_KEY */] = 'Undefined API key. Check Firebase app initialization.',
        _a$1["registration-app-id" /* REGISTRATION_APP_ID */] = 'Undefined app identifier. Check Firebase app initialization.',
        _a$1["storage-open" /* STORAGE_OPEN */] = 'Error thrown when opening storage. Original error: {$originalErrorMessage}.',
        _a$1["storage-get" /* STORAGE_GET */] = 'Error thrown when reading from storage. Original error: {$originalErrorMessage}.',
        _a$1["storage-set" /* STORAGE_SET */] = 'Error thrown when writing to storage. Original error: {$originalErrorMessage}.',
        _a$1["storage-delete" /* STORAGE_DELETE */] = 'Error thrown when deleting from storage. Original error: {$originalErrorMessage}.',
        _a$1["fetch-client-network" /* FETCH_NETWORK */] = 'Fetch client failed to connect to a network. Check Internet connection.' +
            ' Original error: {$originalErrorMessage}.',
        _a$1["fetch-timeout" /* FETCH_TIMEOUT */] = 'The config fetch request timed out. ' +
            ' Configure timeout using "fetchTimeoutMillis" SDK setting.',
        _a$1["fetch-throttle" /* FETCH_THROTTLE */] = 'The config fetch request timed out while in an exponential backoff state.' +
            ' Configure timeout using "fetchTimeoutMillis" SDK setting.' +
            ' Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',
        _a$1["fetch-client-parse" /* FETCH_PARSE */] = 'Fetch client could not parse response.' +
            ' Original error: {$originalErrorMessage}.',
        _a$1["fetch-status" /* FETCH_STATUS */] = 'Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.',
        _a$1);
    var ERROR_FACTORY = new ErrorFactory('remoteconfig' /* service */, 'Remote Config' /* service name */, ERROR_DESCRIPTION_MAP);
    // Note how this is like typeof/instanceof, but for ErrorCode.
    function hasErrorCode(e, errorCode) {
        return e instanceof FirebaseError && e.code.indexOf(errorCode) !== -1;
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
    var DEFAULT_VALUE_FOR_BOOLEAN = false;
    var DEFAULT_VALUE_FOR_STRING = '';
    var DEFAULT_VALUE_FOR_NUMBER = 0;
    var BOOLEAN_TRUTHY_VALUES = ['1', 'true', 't', 'yes', 'y', 'on'];
    var Value = /** @class */ (function () {
        function Value(_source, _value) {
            if (_value === void 0) { _value = DEFAULT_VALUE_FOR_STRING; }
            this._source = _source;
            this._value = _value;
        }
        Value.prototype.asString = function () {
            return this._value;
        };
        Value.prototype.asBoolean = function () {
            if (this._source === 'static') {
                return DEFAULT_VALUE_FOR_BOOLEAN;
            }
            return BOOLEAN_TRUTHY_VALUES.indexOf(this._value.toLowerCase()) >= 0;
        };
        Value.prototype.asNumber = function () {
            if (this._source === 'static') {
                return DEFAULT_VALUE_FOR_NUMBER;
            }
            var num = Number(this._value);
            if (isNaN(num)) {
                num = DEFAULT_VALUE_FOR_NUMBER;
            }
            return num;
        };
        Value.prototype.getSource = function () {
            return this._source;
        };
        return Value;
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
     *
     * @param app - the firebase app instance
     * @returns a remote config instance
     *
     * @public
     */
    function getRemoteConfig(app$1) {
        var rcProvider = app._getProvider(app$1, RC_COMPONENT_NAME);
        return rcProvider.getImmediate();
    }
    /**
     * Makes the last fetched config available to the getters.
     * @param remoteConfig - the remote config instance
     * @returns A promise which resolves to true if the current call activated the fetched configs.
     * If the fetched configs were already activated, the promise will resolve to false.
     *
     * @public
     */
    function activate(remoteConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var rc, _a, lastSuccessfulFetchResponse, activeConfigEtag;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        rc = remoteConfig;
                        return [4 /*yield*/, Promise.all([
                                rc._storage.getLastSuccessfulFetchResponse(),
                                rc._storage.getActiveConfigEtag()
                            ])];
                    case 1:
                        _a = _b.sent(), lastSuccessfulFetchResponse = _a[0], activeConfigEtag = _a[1];
                        if (!lastSuccessfulFetchResponse ||
                            !lastSuccessfulFetchResponse.config ||
                            !lastSuccessfulFetchResponse.eTag ||
                            lastSuccessfulFetchResponse.eTag === activeConfigEtag) {
                            // Either there is no successful fetched config, or is the same as current active
                            // config.
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, Promise.all([
                                rc._storageCache.setActiveConfig(lastSuccessfulFetchResponse.config),
                                rc._storage.setActiveConfigEtag(lastSuccessfulFetchResponse.eTag)
                            ])];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    }
    /**
     * Ensures the last activated config are available to the getters.
     * @param remoteConfig - the remote config instance
     *
     * @returns A promise that resolves when the last activated config is available to the getters
     * @public
     */
    function ensureInitialized(remoteConfig) {
        var rc = remoteConfig;
        if (!rc._initializePromise) {
            rc._initializePromise = rc._storageCache.loadFromStorage().then(function () {
                rc._isInitializationComplete = true;
            });
        }
        return rc._initializePromise;
    }
    /**
     * Fetches and caches configuration from the Remote Config service.
     * @param remoteConfig - the remote config instance
     * @public
     */
    function fetchConfig(remoteConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var rc, abortSignal, e_1, lastFetchStatus;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rc = remoteConfig;
                        abortSignal = new RemoteConfigAbortSignal();
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                // Note a very low delay, eg < 10ms, can elapse before listeners are initialized.
                                abortSignal.abort();
                                return [2 /*return*/];
                            });
                        }); }, rc.settings.fetchTimeoutMillis);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, rc._client.fetch({
                                cacheMaxAgeMillis: rc.settings.minimumFetchIntervalMillis,
                                signal: abortSignal
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, rc._storageCache.setLastFetchStatus('success')];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        e_1 = _a.sent();
                        lastFetchStatus = hasErrorCode(e_1, "fetch-throttle" /* FETCH_THROTTLE */)
                            ? 'throttle'
                            : 'failure';
                        return [4 /*yield*/, rc._storageCache.setLastFetchStatus(lastFetchStatus)];
                    case 5:
                        _a.sent();
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Gets all config.
     *
     * @param remoteConfig - the remote config instance
     * @returns all config
     *
     * @public
     */
    function getAll(remoteConfig) {
        var rc = remoteConfig;
        return getAllKeys(rc._storageCache.getActiveConfig(), rc.defaultConfig).reduce(function (allConfigs, key) {
            allConfigs[key] = getValue(remoteConfig, key);
            return allConfigs;
        }, {});
    }
    /**
     * Gets the value for the given key as a boolean.
     *
     * Convenience method for calling <code>remoteConfig.getValue(key).asBoolean()</code>.
     *
     * @param remoteConfig - the remote config instance
     * @param key - the name of the parameter
     *
     * @returns the value for the given key as a boolean
     * @public
     */
    function getBoolean(remoteConfig, key) {
        return getValue(remoteConfig, key).asBoolean();
    }
    /**
     * Gets the value for the given key as a number.
     *
     * Convenience method for calling <code>remoteConfig.getValue(key).asNumber()</code>.
     *
     * @param remoteConfig - the remote config instance
     * @param key - the name of the parameter
     *
     * @returns the value for the given key as a number
     *
     * @public
     */
    function getNumber(remoteConfig, key) {
        return getValue(remoteConfig, key).asNumber();
    }
    /**
     * Gets the value for the given key as a String.
     * Convenience method for calling <code>remoteConfig.getValue(key).asString()</code>.
     *
     * @param remoteConfig - the remote config instance
     * @param key - the name of the parameter
     *
     * @returns the value for the given key as a String
     *
     * @public
     */
    function getString(remoteConfig, key) {
        return getValue(remoteConfig, key).asString();
    }
    /**
     * Gets the {@link @firebase/remote-config-types#Value} for the given key.
     *
     * @param remoteConfig - the remote config instance
     * @param key - the name of the parameter
     *
     * @returns the value for the given key
     *
     * @public
     */
    function getValue(remoteConfig, key) {
        var rc = remoteConfig;
        if (!rc._isInitializationComplete) {
            rc._logger.debug("A value was requested for key \"" + key + "\" before SDK initialization completed." +
                ' Await on ensureInitialized if the intent was to get a previously activated value.');
        }
        var activeConfig = rc._storageCache.getActiveConfig();
        if (activeConfig && activeConfig[key] !== undefined) {
            return new Value('remote', activeConfig[key]);
        }
        else if (rc.defaultConfig && rc.defaultConfig[key] !== undefined) {
            return new Value('default', String(rc.defaultConfig[key]));
        }
        rc._logger.debug("Returning static value for key \"" + key + "\"." +
            ' Define a default or remote value if this is unintentional.');
        return new Value('static');
    }
    /**
     * Defines the log level to use.
     *
     * @param remoteConfig - the remote config instance
     * @param logLevel - the log level to set
     *
     * @public
     */
    function setLogLevel(remoteConfig, logLevel) {
        var rc = remoteConfig;
        switch (logLevel) {
            case 'debug':
                rc._logger.logLevel = LogLevel.DEBUG;
                break;
            case 'silent':
                rc._logger.logLevel = LogLevel.SILENT;
                break;
            default:
                rc._logger.logLevel = LogLevel.ERROR;
        }
    }
    /**
     * Dedupes and returns an array of all the keys of the received objects.
     */
    function getAllKeys(obj1, obj2) {
        if (obj1 === void 0) { obj1 = {}; }
        if (obj2 === void 0) { obj2 = {}; }
        return Object.keys(__assign(__assign({}, obj1), obj2));
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
     * Implements the {@link RemoteConfigClient} abstraction with success response caching.
     *
     * <p>Comparable to the browser's Cache API for responses, but the Cache API requires a Service
     * Worker, which requires HTTPS, which would significantly complicate SDK installation. Also, the
     * Cache API doesn't support matching entries by time.
     */
    var CachingClient = /** @class */ (function () {
        function CachingClient(client, storage, storageCache, logger) {
            this.client = client;
            this.storage = storage;
            this.storageCache = storageCache;
            this.logger = logger;
        }
        /**
         * Returns true if the age of the cached fetched configs is less than or equal to
         * {@link Settings#minimumFetchIntervalInSeconds}.
         *
         * <p>This is comparable to passing `headers = { 'Cache-Control': max-age <maxAge> }` to the
         * native Fetch API.
         *
         * <p>Visible for testing.
         */
        CachingClient.prototype.isCachedDataFresh = function (cacheMaxAgeMillis, lastSuccessfulFetchTimestampMillis) {
            // Cache can only be fresh if it's populated.
            if (!lastSuccessfulFetchTimestampMillis) {
                this.logger.debug('Config fetch cache check. Cache unpopulated.');
                return false;
            }
            // Calculates age of cache entry.
            var cacheAgeMillis = Date.now() - lastSuccessfulFetchTimestampMillis;
            var isCachedDataFresh = cacheAgeMillis <= cacheMaxAgeMillis;
            this.logger.debug('Config fetch cache check.' +
                (" Cache age millis: " + cacheAgeMillis + ".") +
                (" Cache max age millis (minimumFetchIntervalMillis setting): " + cacheMaxAgeMillis + ".") +
                (" Is cache hit: " + isCachedDataFresh + "."));
            return isCachedDataFresh;
        };
        CachingClient.prototype.fetch = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, lastSuccessfulFetchTimestampMillis, lastSuccessfulFetchResponse, response, storageOperations;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.storage.getLastSuccessfulFetchTimestampMillis(),
                                this.storage.getLastSuccessfulFetchResponse()
                            ])];
                        case 1:
                            _a = _b.sent(), lastSuccessfulFetchTimestampMillis = _a[0], lastSuccessfulFetchResponse = _a[1];
                            // Exits early on cache hit.
                            if (lastSuccessfulFetchResponse &&
                                this.isCachedDataFresh(request.cacheMaxAgeMillis, lastSuccessfulFetchTimestampMillis)) {
                                return [2 /*return*/, lastSuccessfulFetchResponse];
                            }
                            // Deviates from pure decorator by not honoring a passed ETag since we don't have a public API
                            // that allows the caller to pass an ETag.
                            request.eTag =
                                lastSuccessfulFetchResponse && lastSuccessfulFetchResponse.eTag;
                            return [4 /*yield*/, this.client.fetch(request)];
                        case 2:
                            response = _b.sent();
                            storageOperations = [
                                // Uses write-through cache for consistency with synchronous public API.
                                this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())
                            ];
                            if (response.status === 200) {
                                // Caches response only if it has changed, ie non-304 responses.
                                storageOperations.push(this.storage.setLastSuccessfulFetchResponse(response));
                            }
                            return [4 /*yield*/, Promise.all(storageOperations)];
                        case 3:
                            _b.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        return CachingClient;
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
     * Attempts to get the most accurate browser language setting.
     *
     * <p>Adapted from getUserLanguage in packages/auth/src/utils.js for TypeScript.
     *
     * <p>Defers default language specification to server logic for consistency.
     *
     * @param navigatorLanguage Enables tests to override read-only {@link NavigatorLanguage}.
     */
    function getUserLanguage(navigatorLanguage) {
        if (navigatorLanguage === void 0) { navigatorLanguage = navigator; }
        return (
        // Most reliable, but only supported in Chrome/Firefox.
        (navigatorLanguage.languages && navigatorLanguage.languages[0]) ||
            // Supported in most browsers, but returns the language of the browser
            // UI, not the language set in browser settings.
            navigatorLanguage.language
        // Polyfill otherwise.
        );
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
     * Implements the Client abstraction for the Remote Config REST API.
     */
    var RestClient = /** @class */ (function () {
        function RestClient(firebaseInstallations, sdkVersion, namespace, projectId, apiKey, appId) {
            this.firebaseInstallations = firebaseInstallations;
            this.sdkVersion = sdkVersion;
            this.namespace = namespace;
            this.projectId = projectId;
            this.apiKey = apiKey;
            this.appId = appId;
        }
        /**
         * Fetches from the Remote Config REST API.
         *
         * @throws a {@link ErrorCode.FETCH_NETWORK} error if {@link GlobalFetch#fetch} can't
         * connect to the network.
         * @throws a {@link ErrorCode.FETCH_PARSE} error if {@link Response#json} can't parse the
         * fetch response.
         * @throws a {@link ErrorCode.FETCH_STATUS} error if the service returns an HTTP error status.
         */
        RestClient.prototype.fetch = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, installationId, installationToken, urlBase, url, headers, requestBody, options, fetchPromise, timeoutPromise, response, originalError_1, errorCode, status, responseEtag, config, state, responseBody, originalError_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.firebaseInstallations.getId(),
                                this.firebaseInstallations.getToken()
                            ])];
                        case 1:
                            _a = _b.sent(), installationId = _a[0], installationToken = _a[1];
                            urlBase = window.FIREBASE_REMOTE_CONFIG_URL_BASE ||
                                'https://firebaseremoteconfig.googleapis.com';
                            url = urlBase + "/v1/projects/" + this.projectId + "/namespaces/" + this.namespace + ":fetch?key=" + this.apiKey;
                            headers = {
                                'Content-Type': 'application/json',
                                'Content-Encoding': 'gzip',
                                // Deviates from pure decorator by not passing max-age header since we don't currently have
                                // service behavior using that header.
                                'If-None-Match': request.eTag || '*'
                            };
                            requestBody = {
                                /* eslint-disable camelcase */
                                sdk_version: this.sdkVersion,
                                app_instance_id: installationId,
                                app_instance_id_token: installationToken,
                                app_id: this.appId,
                                language_code: getUserLanguage()
                                /* eslint-enable camelcase */
                            };
                            options = {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify(requestBody)
                            };
                            fetchPromise = fetch(url, options);
                            timeoutPromise = new Promise(function (_resolve, reject) {
                                // Maps async event listener to Promise API.
                                request.signal.addEventListener(function () {
                                    // Emulates https://heycam.github.io/webidl/#aborterror
                                    var error = new Error('The operation was aborted.');
                                    error.name = 'AbortError';
                                    reject(error);
                                });
                            });
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 5, , 6]);
                            return [4 /*yield*/, Promise.race([fetchPromise, timeoutPromise])];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, fetchPromise];
                        case 4:
                            response = _b.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            originalError_1 = _b.sent();
                            errorCode = "fetch-client-network" /* FETCH_NETWORK */;
                            if (originalError_1.name === 'AbortError') {
                                errorCode = "fetch-timeout" /* FETCH_TIMEOUT */;
                            }
                            throw ERROR_FACTORY.create(errorCode, {
                                originalErrorMessage: originalError_1.message
                            });
                        case 6:
                            status = response.status;
                            responseEtag = response.headers.get('ETag') || undefined;
                            if (!(response.status === 200)) return [3 /*break*/, 11];
                            responseBody = void 0;
                            _b.label = 7;
                        case 7:
                            _b.trys.push([7, 9, , 10]);
                            return [4 /*yield*/, response.json()];
                        case 8:
                            responseBody = _b.sent();
                            return [3 /*break*/, 10];
                        case 9:
                            originalError_2 = _b.sent();
                            throw ERROR_FACTORY.create("fetch-client-parse" /* FETCH_PARSE */, {
                                originalErrorMessage: originalError_2.message
                            });
                        case 10:
                            config = responseBody['entries'];
                            state = responseBody['state'];
                            _b.label = 11;
                        case 11:
                            // Normalizes based on legacy state.
                            if (state === 'INSTANCE_STATE_UNSPECIFIED') {
                                status = 500;
                            }
                            else if (state === 'NO_CHANGE') {
                                status = 304;
                            }
                            else if (state === 'NO_TEMPLATE' || state === 'EMPTY_CONFIG') {
                                // These cases can be fixed remotely, so normalize to safe value.
                                config = {};
                            }
                            // Normalize to exception-based control flow for non-success cases.
                            // Encapsulates HTTP specifics in this class as much as possible. Status is still the best for
                            // differentiating success states (200 from 304; the state body param is undefined in a
                            // standard 304).
                            if (status !== 304 && status !== 200) {
                                throw ERROR_FACTORY.create("fetch-status" /* FETCH_STATUS */, {
                                    httpStatus: status
                                });
                            }
                            return [2 /*return*/, { status: status, eTag: responseEtag, config: config }];
                    }
                });
            });
        };
        return RestClient;
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
     * Supports waiting on a backoff by:
     *
     * <ul>
     *   <li>Promisifying setTimeout, so we can set a timeout in our Promise chain</li>
     *   <li>Listening on a signal bus for abort events, just like the Fetch API</li>
     *   <li>Failing in the same way the Fetch API fails, so timing out a live request and a throttled
     *       request appear the same.</li>
     * </ul>
     *
     * <p>Visible for testing.
     */
    function setAbortableTimeout(signal, throttleEndTimeMillis) {
        return new Promise(function (resolve, reject) {
            // Derives backoff from given end time, normalizing negative numbers to zero.
            var backoffMillis = Math.max(throttleEndTimeMillis - Date.now(), 0);
            var timeout = setTimeout(resolve, backoffMillis);
            // Adds listener, rather than sets onabort, because signal is a shared object.
            signal.addEventListener(function () {
                clearTimeout(timeout);
                // If the request completes before this timeout, the rejection has no effect.
                reject(ERROR_FACTORY.create("fetch-throttle" /* FETCH_THROTTLE */, {
                    throttleEndTimeMillis: throttleEndTimeMillis
                }));
            });
        });
    }
    /**
     * Returns true if the {@link Error} indicates a fetch request may succeed later.
     */
    function isRetriableError(e) {
        if (!(e instanceof FirebaseError) || !e.customData) {
            return false;
        }
        // Uses string index defined by ErrorData, which FirebaseError implements.
        var httpStatus = Number(e.customData['httpStatus']);
        return (httpStatus === 429 ||
            httpStatus === 500 ||
            httpStatus === 503 ||
            httpStatus === 504);
    }
    /**
     * Decorates a Client with retry logic.
     *
     * <p>Comparable to CachingClient, but uses backoff logic instead of cache max age and doesn't cache
     * responses (because the SDK has no use for error responses).
     */
    var RetryingClient = /** @class */ (function () {
        function RetryingClient(client, storage) {
            this.client = client;
            this.storage = storage;
        }
        RetryingClient.prototype.fetch = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var throttleMetadata;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.storage.getThrottleMetadata()];
                        case 1:
                            throttleMetadata = (_a.sent()) || {
                                backoffCount: 0,
                                throttleEndTimeMillis: Date.now()
                            };
                            return [2 /*return*/, this.attemptFetch(request, throttleMetadata)];
                    }
                });
            });
        };
        /**
         * A recursive helper for attempting a fetch request repeatedly.
         *
         * @throws any non-retriable errors.
         */
        RetryingClient.prototype.attemptFetch = function (request, _a) {
            var throttleEndTimeMillis = _a.throttleEndTimeMillis, backoffCount = _a.backoffCount;
            return __awaiter(this, void 0, void 0, function () {
                var response, e_1, throttleMetadata;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: 
                        // Starts with a (potentially zero) timeout to support resumption from stored state.
                        // Ensures the throttle end time is honored if the last attempt timed out.
                        // Note the SDK will never make a request if the fetch timeout expires at this point.
                        return [4 /*yield*/, setAbortableTimeout(request.signal, throttleEndTimeMillis)];
                        case 1:
                            // Starts with a (potentially zero) timeout to support resumption from stored state.
                            // Ensures the throttle end time is honored if the last attempt timed out.
                            // Note the SDK will never make a request if the fetch timeout expires at this point.
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 5, , 7]);
                            return [4 /*yield*/, this.client.fetch(request)];
                        case 3:
                            response = _b.sent();
                            // Note the SDK only clears throttle state if response is success or non-retriable.
                            return [4 /*yield*/, this.storage.deleteThrottleMetadata()];
                        case 4:
                            // Note the SDK only clears throttle state if response is success or non-retriable.
                            _b.sent();
                            return [2 /*return*/, response];
                        case 5:
                            e_1 = _b.sent();
                            if (!isRetriableError(e_1)) {
                                throw e_1;
                            }
                            throttleMetadata = {
                                throttleEndTimeMillis: Date.now() + calculateBackoffMillis(backoffCount),
                                backoffCount: backoffCount + 1
                            };
                            // Persists state.
                            return [4 /*yield*/, this.storage.setThrottleMetadata(throttleMetadata)];
                        case 6:
                            // Persists state.
                            _b.sent();
                            return [2 /*return*/, this.attemptFetch(request, throttleMetadata)];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        return RetryingClient;
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
    var DEFAULT_FETCH_TIMEOUT_MILLIS = 60 * 1000; // One minute
    var DEFAULT_CACHE_MAX_AGE_MILLIS = 12 * 60 * 60 * 1000; // Twelve hours.
    /**
     * Encapsulates business logic mapping network and storage dependencies to the public SDK API.
     *
     * See {@link https://github.com/FirebasePrivate/firebase-js-sdk/blob/master/packages/firebase/index.d.ts|interface documentation} for method descriptions.
     */
    var RemoteConfig = /** @class */ (function () {
        function RemoteConfig(
        // Required by FirebaseServiceFactory interface.
        app, 
        // JS doesn't support private yet
        // (https://github.com/tc39/proposal-class-fields#private-fields), so we hint using an
        // underscore prefix.
        /**
         * @internal
         */
        _client, 
        /**
         * @internal
         */
        _storageCache, 
        /**
         * @internal
         */
        _storage, 
        /**
         * @internal
         */
        _logger) {
            this.app = app;
            this._client = _client;
            this._storageCache = _storageCache;
            this._storage = _storage;
            this._logger = _logger;
            /**
             * Tracks completion of initialization promise.
             * @internal
             */
            this._isInitializationComplete = false;
            this.settings = {
                fetchTimeoutMillis: DEFAULT_FETCH_TIMEOUT_MILLIS,
                minimumFetchIntervalMillis: DEFAULT_CACHE_MAX_AGE_MILLIS
            };
            this.defaultConfig = {};
        }
        Object.defineProperty(RemoteConfig.prototype, "fetchTimeMillis", {
            get: function () {
                return this._storageCache.getLastSuccessfulFetchTimestampMillis() || -1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RemoteConfig.prototype, "lastFetchStatus", {
            get: function () {
                return this._storageCache.getLastFetchStatus() || 'no-fetch-yet';
            },
            enumerable: false,
            configurable: true
        });
        return RemoteConfig;
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
     * Converts an error event associated with a {@link IDBRequest} to a {@link FirebaseError}.
     */
    function toFirebaseError(event, errorCode) {
        var originalError = event.target.error || undefined;
        return ERROR_FACTORY.create(errorCode, {
            originalErrorMessage: originalError && originalError.message
        });
    }
    /**
     * A general-purpose store keyed by app + namespace + {@link
     * ProjectNamespaceKeyFieldValue}.
     *
     * <p>The Remote Config SDK can be used with multiple app installations, and each app can interact
     * with multiple namespaces, so this store uses app (ID + name) and namespace as common parent keys
     * for a set of key-value pairs. See {@link Storage#createCompositeKey}.
     *
     * <p>Visible for testing.
     */
    var APP_NAMESPACE_STORE = 'app_namespace_store';
    var DB_NAME = 'firebase_remote_config';
    var DB_VERSION = 1;
    // Visible for testing.
    function openDatabase() {
        return new Promise(function (resolve, reject) {
            var request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = function (event) {
                reject(toFirebaseError(event, "storage-open" /* STORAGE_OPEN */));
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
            request.onupgradeneeded = function (event) {
                var db = event.target.result;
                // We don't use 'break' in this switch statement, the fall-through
                // behavior is what we want, because if there are multiple versions between
                // the old version and the current version, we want ALL the migrations
                // that correspond to those versions to run, not only the last one.
                // eslint-disable-next-line default-case
                switch (event.oldVersion) {
                    case 0:
                        db.createObjectStore(APP_NAMESPACE_STORE, {
                            keyPath: 'compositeKey'
                        });
                }
            };
        });
    }
    /**
     * Abstracts data persistence.
     */
    var Storage = /** @class */ (function () {
        /**
         * @param appId enables storage segmentation by app (ID + name).
         * @param appName enables storage segmentation by app (ID + name).
         * @param namespace enables storage segmentation by namespace.
         */
        function Storage(appId, appName, namespace, openDbPromise) {
            if (openDbPromise === void 0) { openDbPromise = openDatabase(); }
            this.appId = appId;
            this.appName = appName;
            this.namespace = namespace;
            this.openDbPromise = openDbPromise;
        }
        Storage.prototype.getLastFetchStatus = function () {
            return this.get('last_fetch_status');
        };
        Storage.prototype.setLastFetchStatus = function (status) {
            return this.set('last_fetch_status', status);
        };
        // This is comparable to a cache entry timestamp. If we need to expire other data, we could
        // consider adding timestamp to all storage records and an optional max age arg to getters.
        Storage.prototype.getLastSuccessfulFetchTimestampMillis = function () {
            return this.get('last_successful_fetch_timestamp_millis');
        };
        Storage.prototype.setLastSuccessfulFetchTimestampMillis = function (timestamp) {
            return this.set('last_successful_fetch_timestamp_millis', timestamp);
        };
        Storage.prototype.getLastSuccessfulFetchResponse = function () {
            return this.get('last_successful_fetch_response');
        };
        Storage.prototype.setLastSuccessfulFetchResponse = function (response) {
            return this.set('last_successful_fetch_response', response);
        };
        Storage.prototype.getActiveConfig = function () {
            return this.get('active_config');
        };
        Storage.prototype.setActiveConfig = function (config) {
            return this.set('active_config', config);
        };
        Storage.prototype.getActiveConfigEtag = function () {
            return this.get('active_config_etag');
        };
        Storage.prototype.setActiveConfigEtag = function (etag) {
            return this.set('active_config_etag', etag);
        };
        Storage.prototype.getThrottleMetadata = function () {
            return this.get('throttle_metadata');
        };
        Storage.prototype.setThrottleMetadata = function (metadata) {
            return this.set('throttle_metadata', metadata);
        };
        Storage.prototype.deleteThrottleMetadata = function () {
            return this.delete('throttle_metadata');
        };
        Storage.prototype.get = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var db;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openDbPromise];
                        case 1:
                            db = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    var transaction = db.transaction([APP_NAMESPACE_STORE], 'readonly');
                                    var objectStore = transaction.objectStore(APP_NAMESPACE_STORE);
                                    var compositeKey = _this.createCompositeKey(key);
                                    try {
                                        var request = objectStore.get(compositeKey);
                                        request.onerror = function (event) {
                                            reject(toFirebaseError(event, "storage-get" /* STORAGE_GET */));
                                        };
                                        request.onsuccess = function (event) {
                                            var result = event.target.result;
                                            if (result) {
                                                resolve(result.value);
                                            }
                                            else {
                                                resolve(undefined);
                                            }
                                        };
                                    }
                                    catch (e) {
                                        reject(ERROR_FACTORY.create("storage-get" /* STORAGE_GET */, {
                                            originalErrorMessage: e && e.message
                                        }));
                                    }
                                })];
                    }
                });
            });
        };
        Storage.prototype.set = function (key, value) {
            return __awaiter(this, void 0, void 0, function () {
                var db;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openDbPromise];
                        case 1:
                            db = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    var transaction = db.transaction([APP_NAMESPACE_STORE], 'readwrite');
                                    var objectStore = transaction.objectStore(APP_NAMESPACE_STORE);
                                    var compositeKey = _this.createCompositeKey(key);
                                    try {
                                        var request = objectStore.put({
                                            compositeKey: compositeKey,
                                            value: value
                                        });
                                        request.onerror = function (event) {
                                            reject(toFirebaseError(event, "storage-set" /* STORAGE_SET */));
                                        };
                                        request.onsuccess = function () {
                                            resolve();
                                        };
                                    }
                                    catch (e) {
                                        reject(ERROR_FACTORY.create("storage-set" /* STORAGE_SET */, {
                                            originalErrorMessage: e && e.message
                                        }));
                                    }
                                })];
                    }
                });
            });
        };
        Storage.prototype.delete = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var db;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openDbPromise];
                        case 1:
                            db = _a.sent();
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    var transaction = db.transaction([APP_NAMESPACE_STORE], 'readwrite');
                                    var objectStore = transaction.objectStore(APP_NAMESPACE_STORE);
                                    var compositeKey = _this.createCompositeKey(key);
                                    try {
                                        var request = objectStore.delete(compositeKey);
                                        request.onerror = function (event) {
                                            reject(toFirebaseError(event, "storage-delete" /* STORAGE_DELETE */));
                                        };
                                        request.onsuccess = function () {
                                            resolve();
                                        };
                                    }
                                    catch (e) {
                                        reject(ERROR_FACTORY.create("storage-delete" /* STORAGE_DELETE */, {
                                            originalErrorMessage: e && e.message
                                        }));
                                    }
                                })];
                    }
                });
            });
        };
        // Facilitates composite key functionality (which is unsupported in IE).
        Storage.prototype.createCompositeKey = function (key) {
            return [this.appId, this.appName, this.namespace, key].join();
        };
        return Storage;
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
     * A memory cache layer over storage to support the SDK's synchronous read requirements.
     */
    var StorageCache = /** @class */ (function () {
        function StorageCache(storage) {
            this.storage = storage;
        }
        /**
         * Memory-only getters
         */
        StorageCache.prototype.getLastFetchStatus = function () {
            return this.lastFetchStatus;
        };
        StorageCache.prototype.getLastSuccessfulFetchTimestampMillis = function () {
            return this.lastSuccessfulFetchTimestampMillis;
        };
        StorageCache.prototype.getActiveConfig = function () {
            return this.activeConfig;
        };
        /**
         * Read-ahead getter
         */
        StorageCache.prototype.loadFromStorage = function () {
            return __awaiter(this, void 0, void 0, function () {
                var lastFetchStatusPromise, lastSuccessfulFetchTimestampMillisPromise, activeConfigPromise, lastFetchStatus, lastSuccessfulFetchTimestampMillis, activeConfig;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            lastFetchStatusPromise = this.storage.getLastFetchStatus();
                            lastSuccessfulFetchTimestampMillisPromise = this.storage.getLastSuccessfulFetchTimestampMillis();
                            activeConfigPromise = this.storage.getActiveConfig();
                            return [4 /*yield*/, lastFetchStatusPromise];
                        case 1:
                            lastFetchStatus = _a.sent();
                            if (lastFetchStatus) {
                                this.lastFetchStatus = lastFetchStatus;
                            }
                            return [4 /*yield*/, lastSuccessfulFetchTimestampMillisPromise];
                        case 2:
                            lastSuccessfulFetchTimestampMillis = _a.sent();
                            if (lastSuccessfulFetchTimestampMillis) {
                                this.lastSuccessfulFetchTimestampMillis = lastSuccessfulFetchTimestampMillis;
                            }
                            return [4 /*yield*/, activeConfigPromise];
                        case 3:
                            activeConfig = _a.sent();
                            if (activeConfig) {
                                this.activeConfig = activeConfig;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Write-through setters
         */
        StorageCache.prototype.setLastFetchStatus = function (status) {
            this.lastFetchStatus = status;
            return this.storage.setLastFetchStatus(status);
        };
        StorageCache.prototype.setLastSuccessfulFetchTimestampMillis = function (timestampMillis) {
            this.lastSuccessfulFetchTimestampMillis = timestampMillis;
            return this.storage.setLastSuccessfulFetchTimestampMillis(timestampMillis);
        };
        StorageCache.prototype.setActiveConfig = function (activeConfig) {
            this.activeConfig = activeConfig;
            return this.storage.setActiveConfig(activeConfig);
        };
        return StorageCache;
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
    function registerRemoteConfig() {
        app._registerComponent(new Component(RC_COMPONENT_NAME, remoteConfigFactory, "PUBLIC" /* PUBLIC */).setMultipleInstances(true));
        app.registerVersion(name, version);
        function remoteConfigFactory(container, namespace) {
            /* Dependencies */
            // getImmediate for FirebaseApp will always succeed
            var app$1 = container.getProvider('app-exp').getImmediate();
            // The following call will always succeed because rc has `import '@firebase/installations'`
            var installations = container
                .getProvider('installations-exp-internal')
                .getImmediate();
            // Guards against the SDK being used in non-browser environments.
            if (typeof window === 'undefined') {
                throw ERROR_FACTORY.create("registration-window" /* REGISTRATION_WINDOW */);
            }
            // Normalizes optional inputs.
            var _a = app$1.options, projectId = _a.projectId, apiKey = _a.apiKey, appId = _a.appId;
            if (!projectId) {
                throw ERROR_FACTORY.create("registration-project-id" /* REGISTRATION_PROJECT_ID */);
            }
            if (!apiKey) {
                throw ERROR_FACTORY.create("registration-api-key" /* REGISTRATION_API_KEY */);
            }
            if (!appId) {
                throw ERROR_FACTORY.create("registration-app-id" /* REGISTRATION_APP_ID */);
            }
            namespace = namespace || 'firebase';
            var storage = new Storage(appId, app$1.name, namespace);
            var storageCache = new StorageCache(storage);
            var logger = new Logger(name);
            // Sets ERROR as the default log level.
            // See RemoteConfig#setLogLevel for corresponding normalization to ERROR log level.
            logger.logLevel = LogLevel.ERROR;
            var restClient = new RestClient(installations, 
            // Uses the JS SDK version, by which the RC package version can be deduced, if necessary.
            app.SDK_VERSION, namespace, projectId, apiKey, appId);
            var retryingClient = new RetryingClient(restClient, storage);
            var cachingClient = new CachingClient(retryingClient, storage, storageCache, logger);
            var remoteConfigInstance = new RemoteConfig(app$1, cachingClient, storageCache, storage, logger);
            // Starts warming cache.
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            ensureInitialized(remoteConfigInstance);
            return remoteConfigInstance;
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
    // This API is put in a separate file, so we can stub fetchConfig and activate in tests.
    // It's not possible to stub standalone functions from the same module.
    /**
     *
     * Performs fetch and activate operations, as a convenience.
     *
     * @param remoteConfig - the remote config instance
     *
     * @returns A promise which resolves to true if the current call activated the fetched configs.
     * If the fetched configs were already activated, the promise will resolve to false.
     *
     * @public
     */
    function fetchAndActivate(remoteConfig) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetchConfig(remoteConfig)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, activate(remoteConfig)];
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
    /** register component and version */
    registerRemoteConfig();

    exports.activate = activate;
    exports.ensureInitialized = ensureInitialized;
    exports.fetchAndActivate = fetchAndActivate;
    exports.fetchConfig = fetchConfig;
    exports.getAll = getAll;
    exports.getBoolean = getBoolean;
    exports.getNumber = getNumber;
    exports.getRemoteConfig = getRemoteConfig;
    exports.getString = getString;
    exports.getValue = getValue;
    exports.setLogLevel = setLogLevel;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-remote-config.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-remote-config.js.map
