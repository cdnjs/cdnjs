(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase.analytics = global.firebase.analytics || {}), global.firebase.app));
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

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
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

    function isBrowserExtension() {
        var runtime = typeof chrome === 'object'
            ? chrome.runtime
            : typeof browser === 'object'
                ? browser.runtime
                : undefined;
        return typeof runtime === 'object' && runtime.id !== undefined;
    }
    /**
     * This method checks if indexedDB is supported by current browser/service worker context
     * @return true if indexedDB is supported by current browser/service worker context
     */
    function isIndexedDBAvailable() {
        return 'indexedDB' in self && indexedDB != null;
    }
    /**
     * This method validates browser context for indexedDB by opening a dummy indexedDB database and reject
     * if errors occur during the database open operation.
     */
    function validateIndexedDBOpenable() {
        return new Promise(function (resolve, reject) {
            try {
                var preExist_1 = true;
                var DB_CHECK_NAME_1 = 'validate-browser-context-for-indexeddb-analytics-module';
                var request_1 = window.indexedDB.open(DB_CHECK_NAME_1);
                request_1.onsuccess = function () {
                    request_1.result.close();
                    // delete database only when it doesn't pre-exist
                    if (!preExist_1) {
                        window.indexedDB.deleteDatabase(DB_CHECK_NAME_1);
                    }
                    resolve(true);
                };
                request_1.onupgradeneeded = function () {
                    preExist_1 = false;
                };
                request_1.onerror = function () {
                    var _a;
                    reject(((_a = request_1.error) === null || _a === void 0 ? void 0 : _a.message) || '');
                };
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     *
     * This method checks whether cookie is enabled within current browser
     * @return true if cookie is enabled within current browser
     */
    function areCookiesEnabled() {
        if (!navigator || !navigator.cookieEnabled) {
            return false;
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

    function toArray(arr) {
      return Array.prototype.slice.call(arr);
    }

    function promisifyRequest(request) {
      return new Promise(function(resolve, reject) {
        request.onsuccess = function() {
          resolve(request.result);
        };

        request.onerror = function() {
          reject(request.error);
        };
      });
    }

    function promisifyRequestCall(obj, method, args) {
      var request;
      var p = new Promise(function(resolve, reject) {
        request = obj[method].apply(obj, args);
        promisifyRequest(request).then(resolve, reject);
      });

      p.request = request;
      return p;
    }

    function promisifyCursorRequestCall(obj, method, args) {
      var p = promisifyRequestCall(obj, method, args);
      return p.then(function(value) {
        if (!value) return;
        return new Cursor(value, p.request);
      });
    }

    function proxyProperties(ProxyClass, targetProp, properties) {
      properties.forEach(function(prop) {
        Object.defineProperty(ProxyClass.prototype, prop, {
          get: function() {
            return this[targetProp][prop];
          },
          set: function(val) {
            this[targetProp][prop] = val;
          }
        });
      });
    }

    function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
      properties.forEach(function(prop) {
        if (!(prop in Constructor.prototype)) return;
        ProxyClass.prototype[prop] = function() {
          return promisifyRequestCall(this[targetProp], prop, arguments);
        };
      });
    }

    function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
      properties.forEach(function(prop) {
        if (!(prop in Constructor.prototype)) return;
        ProxyClass.prototype[prop] = function() {
          return this[targetProp][prop].apply(this[targetProp], arguments);
        };
      });
    }

    function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
      properties.forEach(function(prop) {
        if (!(prop in Constructor.prototype)) return;
        ProxyClass.prototype[prop] = function() {
          return promisifyCursorRequestCall(this[targetProp], prop, arguments);
        };
      });
    }

    function Index(index) {
      this._index = index;
    }

    proxyProperties(Index, '_index', [
      'name',
      'keyPath',
      'multiEntry',
      'unique'
    ]);

    proxyRequestMethods(Index, '_index', IDBIndex, [
      'get',
      'getKey',
      'getAll',
      'getAllKeys',
      'count'
    ]);

    proxyCursorRequestMethods(Index, '_index', IDBIndex, [
      'openCursor',
      'openKeyCursor'
    ]);

    function Cursor(cursor, request) {
      this._cursor = cursor;
      this._request = request;
    }

    proxyProperties(Cursor, '_cursor', [
      'direction',
      'key',
      'primaryKey',
      'value'
    ]);

    proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
      'update',
      'delete'
    ]);

    // proxy 'next' methods
    ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
      if (!(methodName in IDBCursor.prototype)) return;
      Cursor.prototype[methodName] = function() {
        var cursor = this;
        var args = arguments;
        return Promise.resolve().then(function() {
          cursor._cursor[methodName].apply(cursor._cursor, args);
          return promisifyRequest(cursor._request).then(function(value) {
            if (!value) return;
            return new Cursor(value, cursor._request);
          });
        });
      };
    });

    function ObjectStore(store) {
      this._store = store;
    }

    ObjectStore.prototype.createIndex = function() {
      return new Index(this._store.createIndex.apply(this._store, arguments));
    };

    ObjectStore.prototype.index = function() {
      return new Index(this._store.index.apply(this._store, arguments));
    };

    proxyProperties(ObjectStore, '_store', [
      'name',
      'keyPath',
      'indexNames',
      'autoIncrement'
    ]);

    proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
      'put',
      'add',
      'delete',
      'clear',
      'get',
      'getAll',
      'getKey',
      'getAllKeys',
      'count'
    ]);

    proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
      'openCursor',
      'openKeyCursor'
    ]);

    proxyMethods(ObjectStore, '_store', IDBObjectStore, [
      'deleteIndex'
    ]);

    function Transaction(idbTransaction) {
      this._tx = idbTransaction;
      this.complete = new Promise(function(resolve, reject) {
        idbTransaction.oncomplete = function() {
          resolve();
        };
        idbTransaction.onerror = function() {
          reject(idbTransaction.error);
        };
        idbTransaction.onabort = function() {
          reject(idbTransaction.error);
        };
      });
    }

    Transaction.prototype.objectStore = function() {
      return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
    };

    proxyProperties(Transaction, '_tx', [
      'objectStoreNames',
      'mode'
    ]);

    proxyMethods(Transaction, '_tx', IDBTransaction, [
      'abort'
    ]);

    function UpgradeDB(db, oldVersion, transaction) {
      this._db = db;
      this.oldVersion = oldVersion;
      this.transaction = new Transaction(transaction);
    }

    UpgradeDB.prototype.createObjectStore = function() {
      return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
    };

    proxyProperties(UpgradeDB, '_db', [
      'name',
      'version',
      'objectStoreNames'
    ]);

    proxyMethods(UpgradeDB, '_db', IDBDatabase, [
      'deleteObjectStore',
      'close'
    ]);

    function DB(db) {
      this._db = db;
    }

    DB.prototype.transaction = function() {
      return new Transaction(this._db.transaction.apply(this._db, arguments));
    };

    proxyProperties(DB, '_db', [
      'name',
      'version',
      'objectStoreNames'
    ]);

    proxyMethods(DB, '_db', IDBDatabase, [
      'close'
    ]);

    // Add cursor iterators
    // TODO: remove this once browsers do the right thing with promises
    ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
      [ObjectStore, Index].forEach(function(Constructor) {
        // Don't create iterateKeyCursor if openKeyCursor doesn't exist.
        if (!(funcName in Constructor.prototype)) return;

        Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
          var args = toArray(arguments);
          var callback = args[args.length - 1];
          var nativeObject = this._store || this._index;
          var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
          request.onsuccess = function() {
            callback(request.result);
          };
        };
      });
    });

    // polyfill getAll
    [Index, ObjectStore].forEach(function(Constructor) {
      if (Constructor.prototype.getAll) return;
      Constructor.prototype.getAll = function(query, count) {
        var instance = this;
        var items = [];

        return new Promise(function(resolve) {
          instance.iterateCursor(query, function(cursor) {
            if (!cursor) {
              resolve(items);
              return;
            }
            items.push(cursor.value);

            if (count !== undefined && items.length == count) {
              resolve(items);
              return;
            }
            cursor.continue();
          });
        });
      };
    });

    function openDb(name, version, upgradeCallback) {
      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
      var request = p.request;

      if (request) {
        request.onupgradeneeded = function(event) {
          if (upgradeCallback) {
            upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
          }
        };
      }

      return p.then(function(db) {
        return new DB(db);
      });
    }

    var name = "@firebase/installations-exp";
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
    var PENDING_TIMEOUT_MS = 10000;
    var PACKAGE_VERSION = "w:" + version;
    var INTERNAL_AUTH_VERSION = 'FIS_v2';
    var INSTALLATIONS_API_URL = 'https://firebaseinstallations.googleapis.com/v1';
    var TOKEN_EXPIRATION_BUFFER = 60 * 60 * 1000; // One hour
    var SERVICE = 'installations';
    var SERVICE_NAME = 'Installations';

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
        _a$1["missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */] = 'Missing App configuration value: "{$valueName}"',
        _a$1["not-registered" /* NOT_REGISTERED */] = 'Firebase Installation is not registered.',
        _a$1["installation-not-found" /* INSTALLATION_NOT_FOUND */] = 'Firebase Installation not found.',
        _a$1["request-failed" /* REQUEST_FAILED */] = '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
        _a$1["app-offline" /* APP_OFFLINE */] = 'Could not process request. Application offline.',
        _a$1["delete-pending-registration" /* DELETE_PENDING_REGISTRATION */] = "Can't delete installation while there is a pending registration request.",
        _a$1);
    var ERROR_FACTORY = new ErrorFactory(SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);
    /** Returns true if error is a FirebaseError that is based on an error from the server. */
    function isServerError(error) {
        return (error instanceof FirebaseError &&
            error.code.includes("request-failed" /* REQUEST_FAILED */));
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
    function getInstallationsEndpoint(_a) {
        var projectId = _a.projectId;
        return INSTALLATIONS_API_URL + "/projects/" + projectId + "/installations";
    }
    function extractAuthTokenInfoFromResponse(response) {
        return {
            token: response.token,
            requestStatus: 2 /* COMPLETED */,
            expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
            creationTime: Date.now()
        };
    }
    function getErrorFromResponse(requestName, response) {
        return __awaiter(this, void 0, void 0, function () {
            var responseJson, errorData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.json()];
                    case 1:
                        responseJson = _a.sent();
                        errorData = responseJson.error;
                        return [2 /*return*/, ERROR_FACTORY.create("request-failed" /* REQUEST_FAILED */, {
                                requestName: requestName,
                                serverCode: errorData.code,
                                serverMessage: errorData.message,
                                serverStatus: errorData.status
                            })];
                }
            });
        });
    }
    function getHeaders(_a) {
        var apiKey = _a.apiKey;
        return new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'x-goog-api-key': apiKey
        });
    }
    function getHeadersWithAuth(appConfig, _a) {
        var refreshToken = _a.refreshToken;
        var headers = getHeaders(appConfig);
        headers.append('Authorization', getAuthorizationHeader(refreshToken));
        return headers;
    }
    /**
     * Calls the passed in fetch wrapper and returns the response.
     * If the returned response has a status of 5xx, re-runs the function once and
     * returns the response.
     */
    function retryIfServerError(fn) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fn()];
                    case 1:
                        result = _a.sent();
                        if (result.status >= 500 && result.status < 600) {
                            // Internal Server Error. Retry request.
                            return [2 /*return*/, fn()];
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    }
    function getExpiresInFromResponseExpiresIn(responseExpiresIn) {
        // This works because the server will never respond with fractions of a second.
        return Number(responseExpiresIn.replace('s', '000'));
    }
    function getAuthorizationHeader(refreshToken) {
        return INTERNAL_AUTH_VERSION + " " + refreshToken;
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
    function createInstallationRequest(appConfig, _a) {
        var fid = _a.fid;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headers, body, request, response, responseValue, registeredInstallationEntry;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        endpoint = getInstallationsEndpoint(appConfig);
                        headers = getHeaders(appConfig);
                        body = {
                            fid: fid,
                            authVersion: INTERNAL_AUTH_VERSION,
                            appId: appConfig.appId,
                            sdkVersion: PACKAGE_VERSION
                        };
                        request = {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(body)
                        };
                        return [4 /*yield*/, retryIfServerError(function () { return fetch(endpoint, request); })];
                    case 1:
                        response = _b.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseValue = _b.sent();
                        registeredInstallationEntry = {
                            fid: responseValue.fid || fid,
                            registrationStatus: 2 /* COMPLETED */,
                            refreshToken: responseValue.refreshToken,
                            authToken: extractAuthTokenInfoFromResponse(responseValue.authToken)
                        };
                        return [2 /*return*/, registeredInstallationEntry];
                    case 3: return [4 /*yield*/, getErrorFromResponse('Create Installation', response)];
                    case 4: throw _b.sent();
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
    /** Returns a promise that resolves after given time passes. */
    function sleep(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
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
    function bufferToBase64UrlSafe(array) {
        var b64 = btoa(String.fromCharCode.apply(String, __spread(array)));
        return b64.replace(/\+/g, '-').replace(/\//g, '_');
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
    var VALID_FID_PATTERN = /^[cdef][\w-]{21}$/;
    var INVALID_FID = '';
    /**
     * Generates a new FID using random values from Web Crypto API.
     * Returns an empty string if FID generation fails for any reason.
     */
    function generateFid() {
        try {
            // A valid FID has exactly 22 base64 characters, which is 132 bits, or 16.5
            // bytes. our implementation generates a 17 byte array instead.
            var fidByteArray = new Uint8Array(17);
            var crypto_1 = self.crypto || self.msCrypto;
            crypto_1.getRandomValues(fidByteArray);
            // Replace the first 4 random bits with the constant FID header of 0b0111.
            fidByteArray[0] = 112 + (fidByteArray[0] % 16);
            var fid = encode(fidByteArray);
            return VALID_FID_PATTERN.test(fid) ? fid : INVALID_FID;
        }
        catch (_a) {
            // FID generation errored
            return INVALID_FID;
        }
    }
    /** Converts a FID Uint8Array to a base64 string representation. */
    function encode(fidByteArray) {
        var b64String = bufferToBase64UrlSafe(fidByteArray);
        // Remove the 23rd character that was added because of the extra 4 bits at the
        // end of our 17 byte array, and the '=' padding.
        return b64String.substr(0, 22);
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
    /** Returns a string key that can be used to identify the app. */
    function getKey(appConfig) {
        return appConfig.appName + "!" + appConfig.appId;
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
    var fidChangeCallbacks = new Map();
    /**
     * Calls the onIdChange callbacks with the new FID value, and broadcasts the
     * change to other tabs.
     */
    function fidChanged(appConfig, fid) {
        var key = getKey(appConfig);
        callFidChangeCallbacks(key, fid);
        broadcastFidChange(key, fid);
    }
    function callFidChangeCallbacks(key, fid) {
        var e_1, _a;
        var callbacks = fidChangeCallbacks.get(key);
        if (!callbacks) {
            return;
        }
        try {
            for (var callbacks_1 = __values(callbacks), callbacks_1_1 = callbacks_1.next(); !callbacks_1_1.done; callbacks_1_1 = callbacks_1.next()) {
                var callback = callbacks_1_1.value;
                callback(fid);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (callbacks_1_1 && !callbacks_1_1.done && (_a = callbacks_1.return)) _a.call(callbacks_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    function broadcastFidChange(key, fid) {
        var channel = getBroadcastChannel();
        if (channel) {
            channel.postMessage({ key: key, fid: fid });
        }
        closeBroadcastChannel();
    }
    var broadcastChannel = null;
    /** Opens and returns a BroadcastChannel if it is supported by the browser. */
    function getBroadcastChannel() {
        if (!broadcastChannel && 'BroadcastChannel' in self) {
            broadcastChannel = new BroadcastChannel('[Firebase] FID Change');
            broadcastChannel.onmessage = function (e) {
                callFidChangeCallbacks(e.data.key, e.data.fid);
            };
        }
        return broadcastChannel;
    }
    function closeBroadcastChannel() {
        if (fidChangeCallbacks.size === 0 && broadcastChannel) {
            broadcastChannel.close();
            broadcastChannel = null;
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
    var DATABASE_NAME = 'firebase-installations-database';
    var DATABASE_VERSION = 1;
    var OBJECT_STORE_NAME = 'firebase-installations-store';
    var dbPromise = null;
    function getDbPromise() {
        if (!dbPromise) {
            dbPromise = openDb(DATABASE_NAME, DATABASE_VERSION, function (upgradeDB) {
                // We don't use 'break' in this switch statement, the fall-through
                // behavior is what we want, because if there are multiple versions between
                // the old version and the current version, we want ALL the migrations
                // that correspond to those versions to run, not only the last one.
                // eslint-disable-next-line default-case
                switch (upgradeDB.oldVersion) {
                    case 0:
                        upgradeDB.createObjectStore(OBJECT_STORE_NAME);
                }
            });
        }
        return dbPromise;
    }
    /** Assigns or overwrites the record for the given key with the given value. */
    function set(appConfig, value) {
        return __awaiter(this, void 0, void 0, function () {
            var key, db, tx, objectStore, oldValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = getKey(appConfig);
                        return [4 /*yield*/, getDbPromise()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                        objectStore = tx.objectStore(OBJECT_STORE_NAME);
                        return [4 /*yield*/, objectStore.get(key)];
                    case 2:
                        oldValue = _a.sent();
                        return [4 /*yield*/, objectStore.put(value, key)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, tx.complete];
                    case 4:
                        _a.sent();
                        if (!oldValue || oldValue.fid !== value.fid) {
                            fidChanged(appConfig, value.fid);
                        }
                        return [2 /*return*/, value];
                }
            });
        });
    }
    /** Removes record(s) from the objectStore that match the given key. */
    function remove(appConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var key, db, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = getKey(appConfig);
                        return [4 /*yield*/, getDbPromise()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                        return [4 /*yield*/, tx.objectStore(OBJECT_STORE_NAME).delete(key)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, tx.complete];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Atomically updates a record with the result of updateFn, which gets
     * called with the current value. If newValue is undefined, the record is
     * deleted instead.
     * @return Updated value
     */
    function update(appConfig, updateFn) {
        return __awaiter(this, void 0, void 0, function () {
            var key, db, tx, store, oldValue, newValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = getKey(appConfig);
                        return [4 /*yield*/, getDbPromise()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                        store = tx.objectStore(OBJECT_STORE_NAME);
                        return [4 /*yield*/, store.get(key)];
                    case 2:
                        oldValue = _a.sent();
                        newValue = updateFn(oldValue);
                        if (!(newValue === undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, store.delete(key)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, store.put(newValue, key)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [4 /*yield*/, tx.complete];
                    case 7:
                        _a.sent();
                        if (newValue && (!oldValue || oldValue.fid !== newValue.fid)) {
                            fidChanged(appConfig, newValue.fid);
                        }
                        return [2 /*return*/, newValue];
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
     * Updates and returns the InstallationEntry from the database.
     * Also triggers a registration request if it is necessary and possible.
     */
    function getInstallationEntry(appConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var registrationPromise, installationEntry;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, update(appConfig, function (oldEntry) {
                            var installationEntry = updateOrCreateInstallationEntry(oldEntry);
                            var entryWithPromise = triggerRegistrationIfNecessary(appConfig, installationEntry);
                            registrationPromise = entryWithPromise.registrationPromise;
                            return entryWithPromise.installationEntry;
                        })];
                    case 1:
                        installationEntry = _b.sent();
                        if (!(installationEntry.fid === INVALID_FID)) return [3 /*break*/, 3];
                        _a = {};
                        return [4 /*yield*/, registrationPromise];
                    case 2: 
                    // FID generation failed. Waiting for the FID from the server.
                    return [2 /*return*/, (_a.installationEntry = _b.sent(), _a)];
                    case 3: return [2 /*return*/, {
                            installationEntry: installationEntry,
                            registrationPromise: registrationPromise
                        }];
                }
            });
        });
    }
    /**
     * Creates a new Installation Entry if one does not exist.
     * Also clears timed out pending requests.
     */
    function updateOrCreateInstallationEntry(oldEntry) {
        var entry = oldEntry || {
            fid: generateFid(),
            registrationStatus: 0 /* NOT_STARTED */
        };
        return clearTimedOutRequest(entry);
    }
    /**
     * If the Firebase Installation is not registered yet, this will trigger the
     * registration and return an InProgressInstallationEntry.
     *
     * If registrationPromise does not exist, the installationEntry is guaranteed
     * to be registered.
     */
    function triggerRegistrationIfNecessary(appConfig, installationEntry) {
        if (installationEntry.registrationStatus === 0 /* NOT_STARTED */) {
            if (!navigator.onLine) {
                // Registration required but app is offline.
                var registrationPromiseWithError = Promise.reject(ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */));
                return {
                    installationEntry: installationEntry,
                    registrationPromise: registrationPromiseWithError
                };
            }
            // Try registering. Change status to IN_PROGRESS.
            var inProgressEntry = {
                fid: installationEntry.fid,
                registrationStatus: 1 /* IN_PROGRESS */,
                registrationTime: Date.now()
            };
            var registrationPromise = registerInstallation(appConfig, inProgressEntry);
            return { installationEntry: inProgressEntry, registrationPromise: registrationPromise };
        }
        else if (installationEntry.registrationStatus === 1 /* IN_PROGRESS */) {
            return {
                installationEntry: installationEntry,
                registrationPromise: waitUntilFidRegistration(appConfig)
            };
        }
        else {
            return { installationEntry: installationEntry };
        }
    }
    /** This will be executed only once for each new Firebase Installation. */
    function registerInstallation(appConfig, installationEntry) {
        return __awaiter(this, void 0, void 0, function () {
            var registeredInstallationEntry, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, createInstallationRequest(appConfig, installationEntry)];
                    case 1:
                        registeredInstallationEntry = _a.sent();
                        return [2 /*return*/, set(appConfig, registeredInstallationEntry)];
                    case 2:
                        e_1 = _a.sent();
                        if (!(isServerError(e_1) && e_1.customData.serverCode === 409)) return [3 /*break*/, 4];
                        // Server returned a "FID can not be used" error.
                        // Generate a new ID next time.
                        return [4 /*yield*/, remove(appConfig)];
                    case 3:
                        // Server returned a "FID can not be used" error.
                        // Generate a new ID next time.
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: 
                    // Registration failed. Set FID as not registered.
                    return [4 /*yield*/, set(appConfig, {
                            fid: installationEntry.fid,
                            registrationStatus: 0 /* NOT_STARTED */
                        })];
                    case 5:
                        // Registration failed. Set FID as not registered.
                        _a.sent();
                        _a.label = 6;
                    case 6: throw e_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    /** Call if FID registration is pending in another request. */
    function waitUntilFidRegistration(appConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, _a, installationEntry, registrationPromise;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, updateInstallationRequest(appConfig)];
                    case 1:
                        entry = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(entry.registrationStatus === 1 /* IN_PROGRESS */)) return [3 /*break*/, 5];
                        // createInstallation request still in progress.
                        return [4 /*yield*/, sleep(100)];
                    case 3:
                        // createInstallation request still in progress.
                        _b.sent();
                        return [4 /*yield*/, updateInstallationRequest(appConfig)];
                    case 4:
                        entry = _b.sent();
                        return [3 /*break*/, 2];
                    case 5:
                        if (!(entry.registrationStatus === 0 /* NOT_STARTED */)) return [3 /*break*/, 7];
                        return [4 /*yield*/, getInstallationEntry(appConfig)];
                    case 6:
                        _a = _b.sent(), installationEntry = _a.installationEntry, registrationPromise = _a.registrationPromise;
                        if (registrationPromise) {
                            return [2 /*return*/, registrationPromise];
                        }
                        else {
                            // if there is no registrationPromise, entry is registered.
                            return [2 /*return*/, installationEntry];
                        }
                    case 7: return [2 /*return*/, entry];
                }
            });
        });
    }
    /**
     * Called only if there is a CreateInstallation request in progress.
     *
     * Updates the InstallationEntry in the DB based on the status of the
     * CreateInstallation request.
     *
     * Returns the updated InstallationEntry.
     */
    function updateInstallationRequest(appConfig) {
        return update(appConfig, function (oldEntry) {
            if (!oldEntry) {
                throw ERROR_FACTORY.create("installation-not-found" /* INSTALLATION_NOT_FOUND */);
            }
            return clearTimedOutRequest(oldEntry);
        });
    }
    function clearTimedOutRequest(entry) {
        if (hasInstallationRequestTimedOut(entry)) {
            return {
                fid: entry.fid,
                registrationStatus: 0 /* NOT_STARTED */
            };
        }
        return entry;
    }
    function hasInstallationRequestTimedOut(installationEntry) {
        return (installationEntry.registrationStatus === 1 /* IN_PROGRESS */ &&
            installationEntry.registrationTime + PENDING_TIMEOUT_MS < Date.now());
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
    function generateAuthTokenRequest(_a, installationEntry) {
        var appConfig = _a.appConfig, platformLoggerProvider = _a.platformLoggerProvider;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, headers, platformLogger, body, request, response, responseValue, completedAuthToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        endpoint = getGenerateAuthTokenEndpoint(appConfig, installationEntry);
                        headers = getHeadersWithAuth(appConfig, installationEntry);
                        platformLogger = platformLoggerProvider.getImmediate({
                            optional: true
                        });
                        if (platformLogger) {
                            headers.append('x-firebase-client', platformLogger.getPlatformInfoString());
                        }
                        body = {
                            installation: {
                                sdkVersion: PACKAGE_VERSION
                            }
                        };
                        request = {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(body)
                        };
                        return [4 /*yield*/, retryIfServerError(function () { return fetch(endpoint, request); })];
                    case 1:
                        response = _b.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseValue = _b.sent();
                        completedAuthToken = extractAuthTokenInfoFromResponse(responseValue);
                        return [2 /*return*/, completedAuthToken];
                    case 3: return [4 /*yield*/, getErrorFromResponse('Generate Auth Token', response)];
                    case 4: throw _b.sent();
                }
            });
        });
    }
    function getGenerateAuthTokenEndpoint(appConfig, _a) {
        var fid = _a.fid;
        return getInstallationsEndpoint(appConfig) + "/" + fid + "/authTokens:generate";
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
     * Returns a valid authentication token for the installation. Generates a new
     * token if one doesn't exist, is expired or about to expire.
     *
     * Should only be called if the Firebase Installation is registered.
     */
    function refreshAuthToken(installations, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var tokenPromise, entry, authToken, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, update(installations.appConfig, function (oldEntry) {
                            if (!isEntryRegistered(oldEntry)) {
                                throw ERROR_FACTORY.create("not-registered" /* NOT_REGISTERED */);
                            }
                            var oldAuthToken = oldEntry.authToken;
                            if (!forceRefresh && isAuthTokenValid(oldAuthToken)) {
                                // There is a valid token in the DB.
                                return oldEntry;
                            }
                            else if (oldAuthToken.requestStatus === 1 /* IN_PROGRESS */) {
                                // There already is a token request in progress.
                                tokenPromise = waitUntilAuthTokenRequest(installations, forceRefresh);
                                return oldEntry;
                            }
                            else {
                                // No token or token expired.
                                if (!navigator.onLine) {
                                    throw ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */);
                                }
                                var inProgressEntry = makeAuthTokenRequestInProgressEntry(oldEntry);
                                tokenPromise = fetchAuthTokenFromServer(installations, inProgressEntry);
                                return inProgressEntry;
                            }
                        })];
                    case 1:
                        entry = _b.sent();
                        if (!tokenPromise) return [3 /*break*/, 3];
                        return [4 /*yield*/, tokenPromise];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = entry.authToken;
                        _b.label = 4;
                    case 4:
                        authToken = _a;
                        return [2 /*return*/, authToken];
                }
            });
        });
    }
    /**
     * Call only if FID is registered and Auth Token request is in progress.
     *
     * Waits until the current pending request finishes. If the request times out,
     * tries once in this thread as well.
     */
    function waitUntilAuthTokenRequest(installations, forceRefresh) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, authToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, updateAuthTokenRequest(installations.appConfig)];
                    case 1:
                        entry = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(entry.authToken.requestStatus === 1 /* IN_PROGRESS */)) return [3 /*break*/, 5];
                        // generateAuthToken still in progress.
                        return [4 /*yield*/, sleep(100)];
                    case 3:
                        // generateAuthToken still in progress.
                        _a.sent();
                        return [4 /*yield*/, updateAuthTokenRequest(installations.appConfig)];
                    case 4:
                        entry = _a.sent();
                        return [3 /*break*/, 2];
                    case 5:
                        authToken = entry.authToken;
                        if (authToken.requestStatus === 0 /* NOT_STARTED */) {
                            // The request timed out or failed in a different call. Try again.
                            return [2 /*return*/, refreshAuthToken(installations, forceRefresh)];
                        }
                        else {
                            return [2 /*return*/, authToken];
                        }
                }
            });
        });
    }
    /**
     * Called only if there is a GenerateAuthToken request in progress.
     *
     * Updates the InstallationEntry in the DB based on the status of the
     * GenerateAuthToken request.
     *
     * Returns the updated InstallationEntry.
     */
    function updateAuthTokenRequest(appConfig) {
        return update(appConfig, function (oldEntry) {
            if (!isEntryRegistered(oldEntry)) {
                throw ERROR_FACTORY.create("not-registered" /* NOT_REGISTERED */);
            }
            var oldAuthToken = oldEntry.authToken;
            if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
                return __assign(__assign({}, oldEntry), { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
            }
            return oldEntry;
        });
    }
    function fetchAuthTokenFromServer(installations, installationEntry) {
        return __awaiter(this, void 0, void 0, function () {
            var authToken, updatedInstallationEntry, e_1, updatedInstallationEntry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 8]);
                        return [4 /*yield*/, generateAuthTokenRequest(installations, installationEntry)];
                    case 1:
                        authToken = _a.sent();
                        updatedInstallationEntry = __assign(__assign({}, installationEntry), { authToken: authToken });
                        return [4 /*yield*/, set(installations.appConfig, updatedInstallationEntry)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, authToken];
                    case 3:
                        e_1 = _a.sent();
                        if (!(isServerError(e_1) &&
                            (e_1.customData.serverCode === 401 || e_1.customData.serverCode === 404))) return [3 /*break*/, 5];
                        // Server returned a "FID not found" or a "Invalid authentication" error.
                        // Generate a new ID next time.
                        return [4 /*yield*/, remove(installations.appConfig)];
                    case 4:
                        // Server returned a "FID not found" or a "Invalid authentication" error.
                        // Generate a new ID next time.
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        updatedInstallationEntry = __assign(__assign({}, installationEntry), { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
                        return [4 /*yield*/, set(installations.appConfig, updatedInstallationEntry)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: throw e_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
    function isEntryRegistered(installationEntry) {
        return (installationEntry !== undefined &&
            installationEntry.registrationStatus === 2 /* COMPLETED */);
    }
    function isAuthTokenValid(authToken) {
        return (authToken.requestStatus === 2 /* COMPLETED */ &&
            !isAuthTokenExpired(authToken));
    }
    function isAuthTokenExpired(authToken) {
        var now = Date.now();
        return (now < authToken.creationTime ||
            authToken.creationTime + authToken.expiresIn < now + TOKEN_EXPIRATION_BUFFER);
    }
    /** Returns an updated InstallationEntry with an InProgressAuthToken. */
    function makeAuthTokenRequestInProgressEntry(oldEntry) {
        var inProgressAuthToken = {
            requestStatus: 1 /* IN_PROGRESS */,
            requestTime: Date.now()
        };
        return __assign(__assign({}, oldEntry), { authToken: inProgressAuthToken });
    }
    function hasAuthTokenRequestTimedOut(authToken) {
        return (authToken.requestStatus === 1 /* IN_PROGRESS */ &&
            authToken.requestTime + PENDING_TIMEOUT_MS < Date.now());
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
     * Creates a Firebase Installation if there isn't one for the app and
     * returns the Installation ID.
     *
     * @public
     */
    function getId(installations) {
        return __awaiter(this, void 0, void 0, function () {
            var installationsImpl, _a, installationEntry, registrationPromise;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        installationsImpl = installations;
                        return [4 /*yield*/, getInstallationEntry(installationsImpl.appConfig)];
                    case 1:
                        _a = _b.sent(), installationEntry = _a.installationEntry, registrationPromise = _a.registrationPromise;
                        if (registrationPromise) {
                            registrationPromise.catch(console.error);
                        }
                        else {
                            // If the installation is already registered, update the authentication
                            // token if needed.
                            refreshAuthToken(installationsImpl).catch(console.error);
                        }
                        return [2 /*return*/, installationEntry.fid];
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
     * Returns an Installation auth token, identifying the current Firebase Installation.
     *
     * @public
     */
    function getToken(installations, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var installationsImpl, authToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        installationsImpl = installations;
                        return [4 /*yield*/, completeInstallationRegistration(installationsImpl.appConfig)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, refreshAuthToken(installationsImpl, forceRefresh)];
                    case 2:
                        authToken = _a.sent();
                        return [2 /*return*/, authToken.token];
                }
            });
        });
    }
    function completeInstallationRegistration(appConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var registrationPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getInstallationEntry(appConfig)];
                    case 1:
                        registrationPromise = (_a.sent()).registrationPromise;
                        if (!registrationPromise) return [3 /*break*/, 3];
                        // A createInstallation request is in progress. Wait until it finishes.
                        return [4 /*yield*/, registrationPromise];
                    case 2:
                        // A createInstallation request is in progress. Wait until it finishes.
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
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
    function extractAppConfig(app) {
        var e_1, _a;
        if (!app || !app.options) {
            throw getMissingValueError('App Configuration');
        }
        if (!app.name) {
            throw getMissingValueError('App Name');
        }
        // Required app config keys
        var configKeys = [
            'projectId',
            'apiKey',
            'appId'
        ];
        try {
            for (var configKeys_1 = __values(configKeys), configKeys_1_1 = configKeys_1.next(); !configKeys_1_1.done; configKeys_1_1 = configKeys_1.next()) {
                var keyName = configKeys_1_1.value;
                if (!app.options[keyName]) {
                    throw getMissingValueError(keyName);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (configKeys_1_1 && !configKeys_1_1.done && (_a = configKeys_1.return)) _a.call(configKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return {
            appName: app.name,
            projectId: app.options.projectId,
            apiKey: app.options.apiKey,
            appId: app.options.appId
        };
    }
    function getMissingValueError(valueName) {
        return ERROR_FACTORY.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */, {
            valueName: valueName
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
    var INSTALLATIONS_NAME = 'installations-exp';
    var INSTALLATIONS_NAME_INTERNAL = 'installations-exp-internal';
    var publicFactory = function (container) {
        var app$1 = container.getProvider('app-exp').getImmediate();
        // Throws if app isn't configured properly.
        var appConfig = extractAppConfig(app$1);
        var platformLoggerProvider = app._getProvider(app$1, 'platform-logger');
        var installationsImpl = {
            app: app$1,
            appConfig: appConfig,
            platformLoggerProvider: platformLoggerProvider,
            _delete: function () { return Promise.resolve(); }
        };
        return installationsImpl;
    };
    var internalFactory = function (container) {
        var app$1 = container.getProvider('app-exp').getImmediate();
        // Internal FIS instance relies on public FIS instance.
        var installations = app._getProvider(app$1, INSTALLATIONS_NAME).getImmediate();
        var installationsInternal = {
            getId: function () { return getId(installations); },
            getToken: function (forceRefresh) { return getToken(installations, forceRefresh); }
        };
        return installationsInternal;
    };
    function registerInstallations() {
        app._registerComponent(new Component(INSTALLATIONS_NAME, publicFactory, "PUBLIC" /* PUBLIC */));
        app._registerComponent(new Component(INSTALLATIONS_NAME_INTERNAL, internalFactory, "PRIVATE" /* PRIVATE */));
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
    registerInstallations();
    app.registerVersion(name, version);

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
     * Type constant for Firebase Analytics.
     */
    var ANALYTICS_TYPE = 'analytics-exp';
    // Key to attach FID to in gtag params.
    var GA_FID_KEY = 'firebase_id';
    var ORIGIN_KEY = 'origin';
    var FETCH_TIMEOUT_MILLIS = 60 * 1000;
    var DYNAMIC_CONFIG_URL = 'https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig';
    var GTAG_URL = 'https://www.googletagmanager.com/gtag/js';

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
    var logger = new Logger('@firebase/analytics');

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
     * Makeshift polyfill for Promise.allSettled(). Resolves when all promises
     * have either resolved or rejected.
     *
     * @param promises Array of promises to wait for.
     */
    function promiseAllSettled(promises) {
        return Promise.all(promises.map(function (promise) { return promise.catch(function (e) { return e; }); }));
    }
    /**
     * Inserts gtag script tag into the page to asynchronously download gtag.
     * @param dataLayerName Name of datalayer (most often the default, "_dataLayer").
     */
    function insertScriptTag(dataLayerName) {
        var script = document.createElement('script');
        // We are not providing an analyticsId in the URL because it would trigger a `page_view`
        // without fid. We will initialize ga-id using gtag (config) command together with fid.
        script.src = GTAG_URL + "?l=" + dataLayerName;
        script.async = true;
        document.head.appendChild(script);
    }
    /**
     * Get reference to, or create, global datalayer.
     * @param dataLayerName Name of datalayer (most often the default, "_dataLayer").
     */
    function getOrCreateDataLayer(dataLayerName) {
        // Check for existing dataLayer and create if needed.
        var dataLayer = [];
        if (Array.isArray(window[dataLayerName])) {
            dataLayer = window[dataLayerName];
        }
        else {
            window[dataLayerName] = dataLayer;
        }
        return dataLayer;
    }
    /**
     * Wrapped gtag logic when gtag is called with 'config' command.
     *
     * @param gtagCore Basic gtag function that just appends to dataLayer.
     * @param initializationPromisesMap Map of appIds to their initialization promises.
     * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
     * @param measurementIdToAppId Map of GA measurementIDs to corresponding Firebase appId.
     * @param measurementId GA Measurement ID to set config for.
     * @param gtagParams Gtag config params to set.
     */
    function gtagOnConfig(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, measurementId, gtagParams) {
        return __awaiter(this, void 0, void 0, function () {
            var correspondingAppId, dynamicConfigResults, foundConfig, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        correspondingAppId = measurementIdToAppId[measurementId];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        if (!correspondingAppId) return [3 /*break*/, 3];
                        return [4 /*yield*/, initializationPromisesMap[correspondingAppId]];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, promiseAllSettled(dynamicConfigPromisesList)];
                    case 4:
                        dynamicConfigResults = _a.sent();
                        foundConfig = dynamicConfigResults.find(function (config) { return config.measurementId === measurementId; });
                        if (!foundConfig) return [3 /*break*/, 6];
                        return [4 /*yield*/, initializationPromisesMap[foundConfig.appId]];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        logger.error(e_1);
                        return [3 /*break*/, 8];
                    case 8:
                        gtagCore("config" /* CONFIG */, measurementId, gtagParams);
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Wrapped gtag logic when gtag is called with 'event' command.
     *
     * @param gtagCore Basic gtag function that just appends to dataLayer.
     * @param initializationPromisesMap Map of appIds to their initialization promises.
     * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
     * @param measurementId GA Measurement ID to log event to.
     * @param gtagParams Params to log with this event.
     */
    function gtagOnEvent(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementId, gtagParams) {
        return __awaiter(this, void 0, void 0, function () {
            var initializationPromisesToWaitFor, gaSendToList, dynamicConfigResults, _loop_1, _i, gaSendToList_1, sendToId, state_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        initializationPromisesToWaitFor = [];
                        if (!(gtagParams && gtagParams['send_to'])) return [3 /*break*/, 2];
                        gaSendToList = gtagParams['send_to'];
                        // Make it an array if is isn't, so it can be dealt with the same way.
                        if (!Array.isArray(gaSendToList)) {
                            gaSendToList = [gaSendToList];
                        }
                        return [4 /*yield*/, promiseAllSettled(dynamicConfigPromisesList)];
                    case 1:
                        dynamicConfigResults = _a.sent();
                        _loop_1 = function (sendToId) {
                            // Any fetched dynamic measurement ID that matches this 'send_to' ID
                            var foundConfig = dynamicConfigResults.find(function (config) { return config.measurementId === sendToId; });
                            var initializationPromise = foundConfig && initializationPromisesMap[foundConfig.appId];
                            if (initializationPromise) {
                                initializationPromisesToWaitFor.push(initializationPromise);
                            }
                            else {
                                // Found an item in 'send_to' that is not associated
                                // directly with an FID, possibly a group.  Empty this array,
                                // exit the loop early, and let it get populated below.
                                initializationPromisesToWaitFor = [];
                                return "break";
                            }
                        };
                        for (_i = 0, gaSendToList_1 = gaSendToList; _i < gaSendToList_1.length; _i++) {
                            sendToId = gaSendToList_1[_i];
                            state_1 = _loop_1(sendToId);
                            if (state_1 === "break")
                                break;
                        }
                        _a.label = 2;
                    case 2:
                        // This will be unpopulated if there was no 'send_to' field , or
                        // if not all entries in the 'send_to' field could be mapped to
                        // a FID. In these cases, wait on all pending initialization promises.
                        if (initializationPromisesToWaitFor.length === 0) {
                            initializationPromisesToWaitFor = Object.values(initializationPromisesMap);
                        }
                        // Run core gtag function with args after all relevant initialization
                        // promises have been resolved.
                        return [4 /*yield*/, Promise.all(initializationPromisesToWaitFor)];
                    case 3:
                        // Run core gtag function with args after all relevant initialization
                        // promises have been resolved.
                        _a.sent();
                        // Workaround for http://b/141370449 - third argument cannot be undefined.
                        gtagCore("event" /* EVENT */, measurementId, gtagParams || {});
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        logger.error(e_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Wraps a standard gtag function with extra code to wait for completion of
     * relevant initialization promises before sending requests.
     *
     * @param gtagCore Basic gtag function that just appends to dataLayer.
     * @param initializationPromisesMap Map of appIds to their initialization promises.
     * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
     * @param measurementIdToAppId Map of GA measurementIDs to corresponding Firebase appId.
     */
    function wrapGtag(gtagCore, 
    /**
     * Allows wrapped gtag calls to wait on whichever intialization promises are required,
     * depending on the contents of the gtag params' `send_to` field, if any.
     */
    initializationPromisesMap, 
    /**
     * Wrapped gtag calls sometimes require all dynamic config fetches to have returned
     * before determining what initialization promises (which include FIDs) to wait for.
     */
    dynamicConfigPromisesList, 
    /**
     * Wrapped gtag config calls can narrow down which initialization promise (with FID)
     * to wait for if the measurementId is already fetched, by getting the corresponding appId,
     * which is the key for the initialization promises map.
     */
    measurementIdToAppId) {
        /**
         * Wrapper around gtag that ensures FID is sent with gtag calls.
         * @param command Gtag command type.
         * @param idOrNameOrParams Measurement ID if command is EVENT/CONFIG, params if command is SET.
         * @param gtagParams Params if event is EVENT/CONFIG.
         */
        function gtagWrapper(command, idOrNameOrParams, gtagParams) {
            return __awaiter(this, void 0, void 0, function () {
                var e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            if (!(command === "event" /* EVENT */)) return [3 /*break*/, 2];
                            // If EVENT, second arg must be measurementId.
                            return [4 /*yield*/, gtagOnEvent(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, idOrNameOrParams, gtagParams)];
                        case 1:
                            // If EVENT, second arg must be measurementId.
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 2:
                            if (!(command === "config" /* CONFIG */)) return [3 /*break*/, 4];
                            // If CONFIG, second arg must be measurementId.
                            return [4 /*yield*/, gtagOnConfig(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, idOrNameOrParams, gtagParams)];
                        case 3:
                            // If CONFIG, second arg must be measurementId.
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            // If SET, second arg must be params.
                            gtagCore("set" /* SET */, idOrNameOrParams);
                            _a.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            e_3 = _a.sent();
                            logger.error(e_3);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        return gtagWrapper;
    }
    /**
     * Creates global gtag function or wraps existing one if found.
     * This wrapped function attaches Firebase instance ID (FID) to gtag 'config' and
     * 'event' calls that belong to the GAID associated with this Firebase instance.
     *
     * @param initializationPromisesMap Map of appIds to their initialization promises.
     * @param dynamicConfigPromisesList Array of dynamic config fetch promises.
     * @param measurementIdToAppId Map of GA measurementIDs to corresponding Firebase appId.
     * @param dataLayerName Name of global GA datalayer array.
     * @param gtagFunctionName Name of global gtag function ("gtag" if not user-specified).
     */
    function wrapOrCreateGtag(initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, dataLayerName, gtagFunctionName) {
        // Create a basic core gtag function
        var gtagCore = function () {
            var _args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _args[_i] = arguments[_i];
            }
            // Must push IArguments object, not an array.
            window[dataLayerName].push(arguments);
        };
        // Replace it with existing one if found
        if (window[gtagFunctionName] &&
            typeof window[gtagFunctionName] === 'function') {
            // @ts-ignore
            gtagCore = window[gtagFunctionName];
        }
        window[gtagFunctionName] = wrapGtag(gtagCore, initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId);
        return {
            gtagCore: gtagCore,
            wrappedGtag: window[gtagFunctionName]
        };
    }
    /**
     * Returns first script tag in DOM matching our gtag url pattern.
     */
    function findGtagScriptOnPage() {
        var scriptTags = window.document.getElementsByTagName('script');
        for (var _i = 0, _a = Object.values(scriptTags); _i < _a.length; _i++) {
            var tag = _a[_i];
            if (tag.src && tag.src.includes(GTAG_URL)) {
                return tag;
            }
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
    var _a$2;
    var ERRORS = (_a$2 = {},
        _a$2["already-exists" /* ALREADY_EXISTS */] = 'A Firebase Analytics instance with the appId {$id} ' +
            ' already exists. ' +
            'Only one Firebase Analytics instance can be created for each appId.',
        _a$2["already-initialized" /* ALREADY_INITIALIZED */] = 'Firebase Analytics has already been initialized.' +
            'settings() must be called before initializing any Analytics instance' +
            'or it will have no effect.',
        _a$2["interop-component-reg-failed" /* INTEROP_COMPONENT_REG_FAILED */] = 'Firebase Analytics Interop Component failed to instantiate: {$reason}',
        _a$2["invalid-analytics-context" /* INVALID_ANALYTICS_CONTEXT */] = 'Firebase Analytics is not supported in this environment. ' +
            'Wrap initialization of analytics in analytics.isSupported() ' +
            'to prevent initialization in unsupported environments. Details: {$errorInfo}',
        _a$2["indexeddb-unavailable" /* INDEXEDDB_UNAVAILABLE */] = 'IndexedDB unavailable or restricted in this environment. ' +
            'Wrap initialization of analytics in analytics.isSupported() ' +
            'to prevent initialization in unsupported environments. Details: {$errorInfo}',
        _a$2["fetch-throttle" /* FETCH_THROTTLE */] = 'The config fetch request timed out while in an exponential backoff state.' +
            ' Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',
        _a$2["config-fetch-failed" /* CONFIG_FETCH_FAILED */] = 'Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}',
        _a$2["no-api-key" /* NO_API_KEY */] = 'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field to' +
            'contain a valid API key.',
        _a$2["no-app-id" /* NO_APP_ID */] = 'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field to' +
            'contain a valid app ID.',
        _a$2);
    var ERROR_FACTORY$1 = new ErrorFactory('analytics', 'Analytics', ERRORS);

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
     * Backoff factor for 503 errors, which we want to be conservative about
     * to avoid overloading servers. Each retry interval will be
     * BASE_INTERVAL_MILLIS * LONG_RETRY_FACTOR ^ retryCount, so the second one
     * will be ~30 seconds (with fuzzing).
     */
    var LONG_RETRY_FACTOR = 30;
    /**
     * Base wait interval to multiplied by backoffFactor^backoffCount.
     */
    var BASE_INTERVAL_MILLIS = 1000;
    /**
     * Stubbable retry data storage class.
     */
    var RetryData = /** @class */ (function () {
        function RetryData(throttleMetadata, intervalMillis) {
            if (throttleMetadata === void 0) { throttleMetadata = {}; }
            if (intervalMillis === void 0) { intervalMillis = BASE_INTERVAL_MILLIS; }
            this.throttleMetadata = throttleMetadata;
            this.intervalMillis = intervalMillis;
        }
        RetryData.prototype.getThrottleMetadata = function (appId) {
            return this.throttleMetadata[appId];
        };
        RetryData.prototype.setThrottleMetadata = function (appId, metadata) {
            this.throttleMetadata[appId] = metadata;
        };
        RetryData.prototype.deleteThrottleMetadata = function (appId) {
            delete this.throttleMetadata[appId];
        };
        return RetryData;
    }());
    var defaultRetryData = new RetryData();
    /**
     * Set GET request headers.
     * @param apiKey App API key.
     */
    function getHeaders$1(apiKey) {
        return new Headers({
            Accept: 'application/json',
            'x-goog-api-key': apiKey
        });
    }
    /**
     * Fetches dynamic config from backend.
     * @param app Firebase app to fetch config for.
     */
    function fetchDynamicConfig(appFields) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var appId, apiKey, request, appUrl, response, errorMessage, jsonResponse, _ignored_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        appId = appFields.appId, apiKey = appFields.apiKey;
                        request = {
                            method: 'GET',
                            headers: getHeaders$1(apiKey)
                        };
                        appUrl = DYNAMIC_CONFIG_URL.replace('{app-id}', appId);
                        return [4 /*yield*/, fetch(appUrl, request)];
                    case 1:
                        response = _b.sent();
                        if (!(response.status !== 200 && response.status !== 304)) return [3 /*break*/, 6];
                        errorMessage = '';
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, response.json()];
                    case 3:
                        jsonResponse = (_b.sent());
                        if ((_a = jsonResponse.error) === null || _a === void 0 ? void 0 : _a.message) {
                            errorMessage = jsonResponse.error.message;
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        _ignored_1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: throw ERROR_FACTORY$1.create("config-fetch-failed" /* CONFIG_FETCH_FAILED */, {
                        httpStatus: response.status,
                        responseMessage: errorMessage
                    });
                    case 6: return [2 /*return*/, response.json()];
                }
            });
        });
    }
    /**
     * Fetches dynamic config from backend, retrying if failed.
     * @param app Firebase app to fetch config for.
     */
    function fetchDynamicConfigWithRetry(app, 
    // retryData and timeoutMillis are parameterized to allow passing a different value for testing.
    retryData, timeoutMillis) {
        if (retryData === void 0) { retryData = defaultRetryData; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, appId, apiKey, measurementId, throttleMetadata, signal;
            var _this = this;
            return __generator(this, function (_b) {
                _a = app.options, appId = _a.appId, apiKey = _a.apiKey, measurementId = _a.measurementId;
                if (!appId) {
                    throw ERROR_FACTORY$1.create("no-app-id" /* NO_APP_ID */);
                }
                if (!apiKey) {
                    if (measurementId) {
                        return [2 /*return*/, {
                                measurementId: measurementId,
                                appId: appId
                            }];
                    }
                    throw ERROR_FACTORY$1.create("no-api-key" /* NO_API_KEY */);
                }
                throttleMetadata = retryData.getThrottleMetadata(appId) || {
                    backoffCount: 0,
                    throttleEndTimeMillis: Date.now()
                };
                signal = new AnalyticsAbortSignal();
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        // Note a very low delay, eg < 10ms, can elapse before listeners are initialized.
                        signal.abort();
                        return [2 /*return*/];
                    });
                }); }, timeoutMillis !== undefined ? timeoutMillis : FETCH_TIMEOUT_MILLIS);
                return [2 /*return*/, attemptFetchDynamicConfigWithRetry({ appId: appId, apiKey: apiKey, measurementId: measurementId }, throttleMetadata, signal, retryData)];
            });
        });
    }
    /**
     * Runs one retry attempt.
     * @param appFields Necessary app config fields.
     * @param throttleMetadata Ongoing metadata to determine throttling times.
     * @param signal Abort signal.
     */
    function attemptFetchDynamicConfigWithRetry(appFields, _a, signal, retryData // for testing
    ) {
        var throttleEndTimeMillis = _a.throttleEndTimeMillis, backoffCount = _a.backoffCount;
        if (retryData === void 0) { retryData = defaultRetryData; }
        return __awaiter(this, void 0, void 0, function () {
            var appId, measurementId, e_1, response, e_2, backoffMillis, throttleMetadata;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        appId = appFields.appId, measurementId = appFields.measurementId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, setAbortableTimeout(signal, throttleEndTimeMillis)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        if (measurementId) {
                            logger.warn("Timed out fetching this Firebase app's measurement ID from the server." +
                                (" Falling back to the measurement ID " + measurementId) +
                                (" provided in the \"measurementId\" field in the local Firebase config. [" + e_1.message + "]"));
                            return [2 /*return*/, { appId: appId, measurementId: measurementId }];
                        }
                        throw e_1;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, fetchDynamicConfig(appFields)];
                    case 5:
                        response = _b.sent();
                        // Note the SDK only clears throttle state if response is success or non-retriable.
                        retryData.deleteThrottleMetadata(appId);
                        return [2 /*return*/, response];
                    case 6:
                        e_2 = _b.sent();
                        if (!isRetriableError(e_2)) {
                            retryData.deleteThrottleMetadata(appId);
                            if (measurementId) {
                                logger.warn("Failed to fetch this Firebase app's measurement ID from the server." +
                                    (" Falling back to the measurement ID " + measurementId) +
                                    (" provided in the \"measurementId\" field in the local Firebase config. [" + e_2.message + "]"));
                                return [2 /*return*/, { appId: appId, measurementId: measurementId }];
                            }
                            else {
                                throw e_2;
                            }
                        }
                        backoffMillis = Number(e_2.customData.httpStatus) === 503
                            ? calculateBackoffMillis(backoffCount, retryData.intervalMillis, LONG_RETRY_FACTOR)
                            : calculateBackoffMillis(backoffCount, retryData.intervalMillis);
                        throttleMetadata = {
                            throttleEndTimeMillis: Date.now() + backoffMillis,
                            backoffCount: backoffCount + 1
                        };
                        // Persists state.
                        retryData.setThrottleMetadata(appId, throttleMetadata);
                        logger.debug("Calling attemptFetch again in " + backoffMillis + " millis");
                        return [2 /*return*/, attemptFetchDynamicConfigWithRetry(appFields, throttleMetadata, signal, retryData)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
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
                reject(ERROR_FACTORY$1.create("fetch-throttle" /* FETCH_THROTTLE */, {
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
     * Shims a minimal AbortSignal (copied from Remote Config).
     *
     * <p>AbortController's AbortSignal conveniently decouples fetch timeout logic from other aspects
     * of networking, such as retries. Firebase doesn't use AbortController enough to justify a
     * polyfill recommendation, like we do with the Fetch API, but this minimal shim can easily be
     * swapped out if/when we do.
     */
    var AnalyticsAbortSignal = /** @class */ (function () {
        function AnalyticsAbortSignal() {
            this.listeners = [];
        }
        AnalyticsAbortSignal.prototype.addEventListener = function (listener) {
            this.listeners.push(listener);
        };
        AnalyticsAbortSignal.prototype.abort = function () {
            this.listeners.forEach(function (listener) { return listener(); });
        };
        return AnalyticsAbortSignal;
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
    function validateIndexedDB() {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!isIndexedDBAvailable()) return [3 /*break*/, 1];
                        logger.warn(ERROR_FACTORY$1.create("indexeddb-unavailable" /* INDEXEDDB_UNAVAILABLE */, {
                            errorInfo: 'IndexedDB is not available in this environment.'
                        }).message);
                        return [2 /*return*/, false];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, validateIndexedDBOpenable()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        logger.warn(ERROR_FACTORY$1.create("indexeddb-unavailable" /* INDEXEDDB_UNAVAILABLE */, {
                            errorInfo: e_1
                        }).message);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    }
    /**
     * Initialize the analytics instance in gtag.js by calling config command with fid.
     *
     * NOTE: We combine analytics initialization and setting fid together because we want fid to be
     * part of the `page_view` event that's sent during the initialization
     * @param app Firebase app
     * @param gtagCore The gtag function that's not wrapped.
     * @param dynamicConfigPromisesList Array of all dynamic config promises.
     * @param measurementIdToAppId Maps measurementID to appID.
     * @param installations _FirebaseInstallationsInternal instance.
     *
     * @returns Measurement ID.
     */
    function initializeAnalytics(app, dynamicConfigPromisesList, measurementIdToAppId, installations, gtagCore) {
        return __awaiter(this, void 0, void 0, function () {
            var dynamicConfigPromise, fidPromise, _a, dynamicConfig, fid, configProperties;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        dynamicConfigPromise = fetchDynamicConfigWithRetry(app);
                        // Once fetched, map measurementIds to appId, for ease of lookup in wrapped gtag function.
                        dynamicConfigPromise
                            .then(function (config) {
                            measurementIdToAppId[config.measurementId] = config.appId;
                            if (app.options.measurementId &&
                                config.measurementId !== app.options.measurementId) {
                                logger.warn("The measurement ID in the local Firebase config (" + app.options.measurementId + ")" +
                                    (" does not match the measurement ID fetched from the server (" + config.measurementId + ").") +
                                    " To ensure analytics events are always sent to the correct Analytics property," +
                                    " update the" +
                                    " measurement ID field in the local config or remove it from the local config.");
                            }
                        })
                            .catch(function (e) { return logger.error(e); });
                        // Add to list to track state of all dynamic config promises.
                        dynamicConfigPromisesList.push(dynamicConfigPromise);
                        fidPromise = validateIndexedDB().then(function (envIsValid) {
                            if (envIsValid) {
                                return installations.getId();
                            }
                            else {
                                return undefined;
                            }
                        });
                        return [4 /*yield*/, Promise.all([
                                dynamicConfigPromise,
                                fidPromise
                            ])];
                    case 1:
                        _a = _c.sent(), dynamicConfig = _a[0], fid = _a[1];
                        // This command initializes gtag.js and only needs to be called once for the entire web app,
                        // but since it is idempotent, we can call it multiple times.
                        // We keep it together with other initialization logic for better code structure.
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        gtagCore('js', new Date());
                        configProperties = (_b = {},
                            // guard against developers accidentally setting properties with prefix `firebase_`
                            _b[ORIGIN_KEY] = 'firebase',
                            _b.update = true,
                            _b);
                        if (fid != null) {
                            configProperties[GA_FID_KEY] = fid;
                        }
                        // It should be the first config command called on this GA-ID
                        // Initialize this GA-ID and set FID on it using the gtag config API.
                        gtagCore("config" /* CONFIG */, dynamicConfig.measurementId, configProperties);
                        return [2 /*return*/, dynamicConfig.measurementId];
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
     * Analytics Service class.
     */
    var AnalyticsService = /** @class */ (function () {
        function AnalyticsService(app) {
            this.app = app;
        }
        AnalyticsService.prototype._delete = function () {
            delete initializationPromisesMap[this.app.options.appId];
            return Promise.resolve();
        };
        return AnalyticsService;
    }());
    /**
     * Maps appId to full initialization promise. Wrapped gtag calls must wait on
     * all or some of these, depending on the call's `send_to` param and the status
     * of the dynamic config fetches (see below).
     */
    var initializationPromisesMap = {};
    /**
     * List of dynamic config fetch promises. In certain cases, wrapped gtag calls
     * wait on all these to be complete in order to determine if it can selectively
     * wait for only certain initialization (FID) promises or if it must wait for all.
     */
    var dynamicConfigPromisesList = [];
    /**
     * Maps fetched measurementIds to appId. Populated when the app's dynamic config
     * fetch completes. If already populated, gtag config calls can use this to
     * selectively wait for only this app's initialization promise (FID) instead of all
     * initialization promises.
     */
    var measurementIdToAppId = {};
    /**
     * Name for window global data layer array used by GA: defaults to 'dataLayer'.
     */
    var dataLayerName = 'dataLayer';
    /**
     * Name for window global gtag function used by GA: defaults to 'gtag'.
     */
    var gtagName = 'gtag';
    /**
     * Reproduction of standard gtag function or reference to existing
     * gtag function on window object.
     */
    var gtagCoreFunction;
    /**
     * Wrapper around gtag function that ensures FID is sent with all
     * relevant event and config calls.
     */
    var wrappedGtagFunction;
    /**
     * Flag to ensure page initialization steps (creation or wrapping of
     * dataLayer and gtag script) are only run once per page load.
     */
    var globalInitDone = false;
    /**
     * Configures Firebase Analytics to use custom `gtag` or `dataLayer` names.
     * Intended to be used if `gtag.js` script has been installed on
     * this page independently of Firebase Analytics, and is using non-default
     * names for either the `gtag` function or for `dataLayer`.
     * Must be called before calling `getAnalytics()` or it won't
     * have any effect.
     *
     * @public
     *
     * @param options - Custom gtag and dataLayer names.
     */
    function settings(options) {
        if (globalInitDone) {
            throw ERROR_FACTORY$1.create("already-initialized" /* ALREADY_INITIALIZED */);
        }
        if (options.dataLayerName) {
            dataLayerName = options.dataLayerName;
        }
        if (options.gtagName) {
            gtagName = options.gtagName;
        }
    }
    /**
     * Returns true if no environment mismatch is found.
     * If environment mismatches are found, throws an INVALID_ANALYTICS_CONTEXT
     * error that also lists details for each mismatch found.
     */
    function warnOnBrowserContextMismatch() {
        var mismatchedEnvMessages = [];
        if (isBrowserExtension()) {
            mismatchedEnvMessages.push('This is a browser extension environment.');
        }
        if (!areCookiesEnabled()) {
            mismatchedEnvMessages.push('Cookies are not available.');
        }
        if (mismatchedEnvMessages.length > 0) {
            var details = mismatchedEnvMessages
                .map(function (message, index) { return "(" + (index + 1) + ") " + message; })
                .join(' ');
            var err = ERROR_FACTORY$1.create("invalid-analytics-context" /* INVALID_ANALYTICS_CONTEXT */, {
                errorInfo: details
            });
            logger.warn(err.message);
        }
    }
    /**
     * Analytics instance factory.
     * @internal
     */
    function factory(app, installations) {
        warnOnBrowserContextMismatch();
        var appId = app.options.appId;
        if (!appId) {
            throw ERROR_FACTORY$1.create("no-app-id" /* NO_APP_ID */);
        }
        if (!app.options.apiKey) {
            if (app.options.measurementId) {
                logger.warn("The \"apiKey\" field is empty in the local Firebase config. This is needed to fetch the latest" +
                    (" measurement ID for this Firebase app. Falling back to the measurement ID " + app.options.measurementId) +
                    " provided in the \"measurementId\" field in the local Firebase config.");
            }
            else {
                throw ERROR_FACTORY$1.create("no-api-key" /* NO_API_KEY */);
            }
        }
        if (initializationPromisesMap[appId] != null) {
            throw ERROR_FACTORY$1.create("already-exists" /* ALREADY_EXISTS */, {
                id: appId
            });
        }
        if (!globalInitDone) {
            // Steps here should only be done once per page: creation or wrapping
            // of dataLayer and global gtag function.
            // Detect if user has already put the gtag <script> tag on this page.
            if (!findGtagScriptOnPage()) {
                insertScriptTag(dataLayerName);
            }
            getOrCreateDataLayer(dataLayerName);
            var _a = wrapOrCreateGtag(initializationPromisesMap, dynamicConfigPromisesList, measurementIdToAppId, dataLayerName, gtagName), wrappedGtag = _a.wrappedGtag, gtagCore = _a.gtagCore;
            wrappedGtagFunction = wrappedGtag;
            gtagCoreFunction = gtagCore;
            globalInitDone = true;
        }
        // Async but non-blocking.
        // This map reflects the completion state of all promises for each appId.
        initializationPromisesMap[appId] = initializeAnalytics(app, dynamicConfigPromisesList, measurementIdToAppId, installations, gtagCoreFunction);
        var analyticsInstance = new AnalyticsService(app);
        return analyticsInstance;
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
     * Logs an analytics event through the Firebase SDK.
     *
     * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
     * @param eventName Google Analytics event name, choose from standard list or use a custom string.
     * @param eventParams Analytics event parameters.
     */
    function logEvent(gtagFunction, initializationPromise, eventName, eventParams, options) {
        return __awaiter(this, void 0, void 0, function () {
            var measurementId, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(options && options.global)) return [3 /*break*/, 1];
                        gtagFunction("event" /* EVENT */, eventName, eventParams);
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, initializationPromise];
                    case 2:
                        measurementId = _a.sent();
                        params = __assign(__assign({}, eventParams), { 'send_to': measurementId });
                        gtagFunction("event" /* EVENT */, eventName, params);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Set screen_name parameter for this Google Analytics ID.
     *
     * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
     * @param screenName Screen name string to set.
     */
    function setCurrentScreen(gtagFunction, initializationPromise, screenName, options) {
        return __awaiter(this, void 0, void 0, function () {
            var measurementId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(options && options.global)) return [3 /*break*/, 1];
                        gtagFunction("set" /* SET */, { 'screen_name': screenName });
                        return [2 /*return*/, Promise.resolve()];
                    case 1: return [4 /*yield*/, initializationPromise];
                    case 2:
                        measurementId = _a.sent();
                        gtagFunction("config" /* CONFIG */, measurementId, {
                            update: true,
                            'screen_name': screenName
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Set user_id parameter for this Google Analytics ID.
     *
     * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
     * @param id User ID string to set
     */
    function setUserId(gtagFunction, initializationPromise, id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var measurementId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(options && options.global)) return [3 /*break*/, 1];
                        gtagFunction("set" /* SET */, { 'user_id': id });
                        return [2 /*return*/, Promise.resolve()];
                    case 1: return [4 /*yield*/, initializationPromise];
                    case 2:
                        measurementId = _a.sent();
                        gtagFunction("config" /* CONFIG */, measurementId, {
                            update: true,
                            'user_id': id
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Set all other user properties other than user_id and screen_name.
     *
     * @param gtagFunction Wrapped gtag function that waits for fid to be set before sending an event
     * @param properties Map of user properties to set
     */
    function setUserProperties(gtagFunction, initializationPromise, properties, options) {
        return __awaiter(this, void 0, void 0, function () {
            var flatProperties, _i, _a, key, measurementId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(options && options.global)) return [3 /*break*/, 1];
                        flatProperties = {};
                        for (_i = 0, _a = Object.keys(properties); _i < _a.length; _i++) {
                            key = _a[_i];
                            // use dot notation for merge behavior in gtag.js
                            flatProperties["user_properties." + key] = properties[key];
                        }
                        gtagFunction("set" /* SET */, flatProperties);
                        return [2 /*return*/, Promise.resolve()];
                    case 1: return [4 /*yield*/, initializationPromise];
                    case 2:
                        measurementId = _b.sent();
                        gtagFunction("config" /* CONFIG */, measurementId, {
                            update: true,
                            'user_properties': properties
                        });
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Set whether collection is enabled for this ID.
     *
     * @param enabled If true, collection is enabled for this ID.
     */
    function setAnalyticsCollectionEnabled(initializationPromise, enabled) {
        return __awaiter(this, void 0, void 0, function () {
            var measurementId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, initializationPromise];
                    case 1:
                        measurementId = _a.sent();
                        window["ga-disable-" + measurementId] = !enabled;
                        return [2 /*return*/];
                }
            });
        });
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    /**
     * Returns a Firebase Analytics instance for the given app.
     *
     * @public
     *
     * @param app - The FirebaseApp to use.
     */
    function getAnalytics(app$1) {
        // Dependencies
        var analyticsProvider = app._getProvider(app$1, ANALYTICS_TYPE);
        var analyticsInstance = analyticsProvider.getImmediate();
        return analyticsInstance;
    }
    /**
     * This is a public static method provided to users that wraps four different checks:
     *
     * 1. Check if it's not a browser extension environment.
     * 2. Check if cookies are enabled in current browser.
     * 3. Check if IndexedDB is supported by the browser environment.
     * 4. Check if the current browser context is valid for using IndexedDB.open().
     *
     * @public
     *
     */
    function isSupported() {
        return __awaiter(this, void 0, void 0, function () {
            var isDBOpenable, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isBrowserExtension()) {
                            return [2 /*return*/, false];
                        }
                        if (!areCookiesEnabled()) {
                            return [2 /*return*/, false];
                        }
                        if (!isIndexedDBAvailable()) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, validateIndexedDBOpenable()];
                    case 2:
                        isDBOpenable = _a.sent();
                        return [2 /*return*/, isDBOpenable];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Use gtag 'config' command to set 'screen_name'.
     *
     * @public
     *
     * @param analyticsInstance - Firebase Analytics instance.
     * @param screenName - Screen name to set.
     */
    function setCurrentScreen$1(analyticsInstance, screenName, options) {
        setCurrentScreen(wrappedGtagFunction, initializationPromisesMap[analyticsInstance.app.options.appId], screenName, options).catch(function (e) { return logger.error(e); });
    }
    /**
     * Use gtag 'config' command to set 'user_id'.
     *
     * @public
     *
     * @param analyticsInstance - Firebase Analytics instance.
     * @param id - User ID to set.
     */
    function setUserId$1(analyticsInstance, id, options) {
        setUserId(wrappedGtagFunction, initializationPromisesMap[analyticsInstance.app.options.appId], id, options).catch(function (e) { return logger.error(e); });
    }
    /**
     * Use gtag 'config' command to set all params specified.
     *
     * @public
     */
    function setUserProperties$1(analyticsInstance, properties, options) {
        setUserProperties(wrappedGtagFunction, initializationPromisesMap[analyticsInstance.app.options.appId], properties, options).catch(function (e) { return logger.error(e); });
    }
    /**
     * Sets whether analytics collection is enabled for this app on this device.
     * window['ga-disable-analyticsId'] = true;
     *
     * @public
     *
     * @param analyticsInstance - Firebase Analytics instance.
     * @param enabled - If true, enables collection, if false, disables it.
     */
    function setAnalyticsCollectionEnabled$1(analyticsInstance, enabled) {
        setAnalyticsCollectionEnabled(initializationPromisesMap[analyticsInstance.app.options.appId], enabled).catch(function (e) { return logger.error(e); });
    }
    /**
     * Sends analytics event with given `eventParams`. This method
     * automatically associates this logged event with this Firebase web
     * app instance on this device.
     * List of official event parameters can be found in the gtag.js
     * reference documentation:
     * {@link https://developers.google.com/gtagjs/reference/event
     * | the gtag.js reference documentation}.
     *
     * @public
     */
    function logEvent$1(analyticsInstance, eventName, eventParams, options) {
        logEvent(wrappedGtagFunction, initializationPromisesMap[analyticsInstance.app.options.appId], eventName, eventParams, options).catch(function (e) { return logger.error(e); });
    }

    var name$1 = "@firebase/analytics-exp";
    var version$1 = "0.0.900";

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
    function registerAnalytics() {
        app._registerComponent(new Component(ANALYTICS_TYPE, function (container) {
            // getImmediate for FirebaseApp will always succeed
            var app = container.getProvider('app-exp').getImmediate();
            var installations = container
                .getProvider('installations-exp-internal')
                .getImmediate();
            return factory(app, installations);
        }, "PUBLIC" /* PUBLIC */));
        app._registerComponent(new Component('analytics-internal', internalFactory, "PRIVATE" /* PRIVATE */));
        app.registerVersion(name$1, version$1);
        function internalFactory(container) {
            try {
                var analytics_1 = container.getProvider(ANALYTICS_TYPE).getImmediate();
                return {
                    logEvent: function (eventName, eventParams, options) { return logEvent$1(analytics_1, eventName, eventParams, options); }
                };
            }
            catch (e) {
                throw ERROR_FACTORY$1.create("interop-component-reg-failed" /* INTEROP_COMPONENT_REG_FAILED */, {
                    reason: e
                });
            }
        }
    }
    registerAnalytics();

    exports.getAnalytics = getAnalytics;
    exports.isSupported = isSupported;
    exports.logEvent = logEvent$1;
    exports.setAnalyticsCollectionEnabled = setAnalyticsCollectionEnabled$1;
    exports.setCurrentScreen = setCurrentScreen$1;
    exports.setUserId = setUserId$1;
    exports.setUserProperties = setUserProperties$1;
    exports.settings = settings;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-analytics.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-analytics.js.map
