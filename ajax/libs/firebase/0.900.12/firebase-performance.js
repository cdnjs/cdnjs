(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase.performance = global.firebase.performance || {}), global.firebase.app));
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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
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

    var name$1 = "@firebase/performance-exp";
    var version$1 = "0.0.900";

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
    var SDK_VERSION = version$1;
    /** The prefix for start User Timing marks used for creating Traces. */
    var TRACE_START_MARK_PREFIX = 'FB-PERF-TRACE-START';
    /** The prefix for stop User Timing marks used for creating Traces. */
    var TRACE_STOP_MARK_PREFIX = 'FB-PERF-TRACE-STOP';
    /** The prefix for User Timing measure used for creating Traces. */
    var TRACE_MEASURE_PREFIX = 'FB-PERF-TRACE-MEASURE';
    /** The prefix for out of the box page load Trace name. */
    var OOB_TRACE_PAGE_LOAD_PREFIX = '_wt_';
    var FIRST_PAINT_COUNTER_NAME = '_fp';
    var FIRST_CONTENTFUL_PAINT_COUNTER_NAME = '_fcp';
    var FIRST_INPUT_DELAY_COUNTER_NAME = '_fid';
    var CONFIG_LOCAL_STORAGE_KEY = '@firebase/performance/config';
    var CONFIG_EXPIRY_LOCAL_STORAGE_KEY = '@firebase/performance/configexpire';
    var SERVICE$1 = 'performance';
    var SERVICE_NAME$1 = 'Performance';

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
    var _a$2;
    var ERROR_DESCRIPTION_MAP$1 = (_a$2 = {},
        _a$2["trace started" /* TRACE_STARTED_BEFORE */] = 'Trace {$traceName} was started before.',
        _a$2["trace stopped" /* TRACE_STOPPED_BEFORE */] = 'Trace {$traceName} is not running.',
        _a$2["nonpositive trace startTime" /* NONPOSITIVE_TRACE_START_TIME */] = 'Trace {$traceName} startTime should be positive.',
        _a$2["nonpositive trace duration" /* NONPOSITIVE_TRACE_DURATION */] = 'Trace {$traceName} duration should be positive.',
        _a$2["no window" /* NO_WINDOW */] = 'Window is not available.',
        _a$2["no app id" /* NO_APP_ID */] = 'App id is not available.',
        _a$2["no project id" /* NO_PROJECT_ID */] = 'Project id is not available.',
        _a$2["no api key" /* NO_API_KEY */] = 'Api key is not available.',
        _a$2["invalid cc log" /* INVALID_CC_LOG */] = 'Attempted to queue invalid cc event',
        _a$2["FB not default" /* FB_NOT_DEFAULT */] = 'Performance can only start when Firebase app instance is the default one.',
        _a$2["RC response not ok" /* RC_NOT_OK */] = 'RC response is not ok',
        _a$2["invalid attribute name" /* INVALID_ATTRIBUTE_NAME */] = 'Attribute name {$attributeName} is invalid.',
        _a$2["invalid attribute value" /* INVALID_ATTRIBUTE_VALUE */] = 'Attribute value {$attributeValue} is invalid.',
        _a$2["invalid custom metric name" /* INVALID_CUSTOM_METRIC_NAME */] = 'Custom metric name {$customMetricName} is invalid',
        _a$2["invalid String merger input" /* INVALID_STRING_MERGER_PARAMETER */] = 'Input for String merger is invalid, contact support team to resolve.',
        _a$2);
    var ERROR_FACTORY$1 = new ErrorFactory(SERVICE$1, SERVICE_NAME$1, ERROR_DESCRIPTION_MAP$1);

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
    var consoleLogger = new Logger(SERVICE_NAME$1);
    consoleLogger.logLevel = LogLevel.INFO;

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
    var apiInstance;
    var windowInstance;
    /**
     * This class holds a reference to various browser related objects injected by
     * set methods.
     */
    var Api = /** @class */ (function () {
        function Api(window) {
            this.window = window;
            if (!window) {
                throw ERROR_FACTORY$1.create("no window" /* NO_WINDOW */);
            }
            this.performance = window.performance;
            this.PerformanceObserver = window.PerformanceObserver;
            this.windowLocation = window.location;
            this.navigator = window.navigator;
            this.document = window.document;
            if (this.navigator && this.navigator.cookieEnabled) {
                // If user blocks cookies on the browser, accessing localStorage will
                // throw an exception.
                this.localStorage = window.localStorage;
            }
            if (window.perfMetrics && window.perfMetrics.onFirstInputDelay) {
                this.onFirstInputDelay = window.perfMetrics.onFirstInputDelay;
            }
        }
        Api.prototype.getUrl = function () {
            // Do not capture the string query part of url.
            return this.windowLocation.href.split('?')[0];
        };
        Api.prototype.mark = function (name) {
            if (!this.performance || !this.performance.mark) {
                return;
            }
            this.performance.mark(name);
        };
        Api.prototype.measure = function (measureName, mark1, mark2) {
            if (!this.performance || !this.performance.measure) {
                return;
            }
            this.performance.measure(measureName, mark1, mark2);
        };
        Api.prototype.getEntriesByType = function (type) {
            if (!this.performance || !this.performance.getEntriesByType) {
                return [];
            }
            return this.performance.getEntriesByType(type);
        };
        Api.prototype.getEntriesByName = function (name) {
            if (!this.performance || !this.performance.getEntriesByName) {
                return [];
            }
            return this.performance.getEntriesByName(name);
        };
        Api.prototype.getTimeOrigin = function () {
            // Polyfill the time origin with performance.timing.navigationStart.
            return (this.performance &&
                (this.performance.timeOrigin || this.performance.timing.navigationStart));
        };
        Api.prototype.requiredApisAvailable = function () {
            if (!fetch ||
                !Promise ||
                !this.navigator ||
                !this.navigator.cookieEnabled) {
                consoleLogger.info('Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled.');
                return false;
            }
            if (!isIndexedDBAvailable()) {
                consoleLogger.info('IndexedDB is not supported by current browswer');
                return false;
            }
            return true;
        };
        Api.prototype.setupObserver = function (entryType, callback) {
            if (!this.PerformanceObserver) {
                return;
            }
            var observer = new this.PerformanceObserver(function (list) {
                for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                    var entry = _a[_i];
                    // `entry` is a PerformanceEntry instance.
                    callback(entry);
                }
            });
            // Start observing the entry types you care about.
            observer.observe({ entryTypes: [entryType] });
        };
        Api.getInstance = function () {
            if (apiInstance === undefined) {
                apiInstance = new Api(windowInstance);
            }
            return apiInstance;
        };
        return Api;
    }());
    function setupApi(window) {
        windowInstance = window;
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
    var iid;
    function getIidPromise(installationsService) {
        var iidPromise = installationsService.getId();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        iidPromise.then(function (iidVal) {
            iid = iidVal;
        });
        return iidPromise;
    }
    // This method should be used after the iid is retrieved by getIidPromise method.
    function getIid() {
        return iid;
    }
    function getAuthTokenPromise(installationsService) {
        var authTokenPromise = installationsService.getToken();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        authTokenPromise.then(function (authTokenVal) {
        });
        return authTokenPromise;
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
    function mergeStrings(part1, part2) {
        var sizeDiff = part1.length - part2.length;
        if (sizeDiff < 0 || sizeDiff > 1) {
            throw ERROR_FACTORY$1.create("invalid String merger input" /* INVALID_STRING_MERGER_PARAMETER */);
        }
        var resultArray = [];
        for (var i = 0; i < part1.length; i++) {
            resultArray.push(part1.charAt(i));
            if (part2.length > i) {
                resultArray.push(part2.charAt(i));
            }
        }
        return resultArray.join('');
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
    var settingsServiceInstance;
    var SettingsService = /** @class */ (function () {
        function SettingsService() {
            // The variable which controls logging of automatic traces and HTTP/S network monitoring.
            this.instrumentationEnabled = true;
            // The variable which controls logging of custom traces.
            this.dataCollectionEnabled = true;
            // Configuration flags set through remote config.
            this.loggingEnabled = false;
            // Sampling rate between 0 and 1.
            this.tracesSamplingRate = 1;
            this.networkRequestsSamplingRate = 1;
            // Address of logging service.
            this.logEndPointUrl = 'https://firebaselogging.googleapis.com/v0cc/log?format=json_proto';
            // Performance event transport endpoint URL which should be compatible with proto3.
            // New Address for transport service, not configurable via Remote Config.
            this.flTransportEndpointUrl = mergeStrings('hts/frbslgigp.ogepscmv/ieo/eaylg', 'tp:/ieaeogn-agolai.o/1frlglgc/o');
            this.transportKey = mergeStrings('AzSC8r6ReiGqFMyfvgow', 'Iayx0u-XT3vksVM-pIV');
            // Source type for performance event logs.
            this.logSource = 462;
            // Flags which control per session logging of traces and network requests.
            this.logTraceAfterSampling = false;
            this.logNetworkAfterSampling = false;
            // TTL of config retrieved from remote config in hours.
            this.configTimeToLive = 12;
        }
        SettingsService.prototype.getFlTransportFullUrl = function () {
            return this.flTransportEndpointUrl.concat('?key=', this.transportKey);
        };
        SettingsService.getInstance = function () {
            if (settingsServiceInstance === undefined) {
                settingsServiceInstance = new SettingsService();
            }
            return settingsServiceInstance;
        };
        return SettingsService;
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
    var VisibilityState;
    (function (VisibilityState) {
        VisibilityState[VisibilityState["UNKNOWN"] = 0] = "UNKNOWN";
        VisibilityState[VisibilityState["VISIBLE"] = 1] = "VISIBLE";
        VisibilityState[VisibilityState["HIDDEN"] = 2] = "HIDDEN";
    })(VisibilityState || (VisibilityState = {}));
    var RESERVED_ATTRIBUTE_PREFIXES = ['firebase_', 'google_', 'ga_'];
    var ATTRIBUTE_FORMAT_REGEX = new RegExp('^[a-zA-Z]\\w*$');
    var MAX_ATTRIBUTE_NAME_LENGTH = 40;
    var MAX_ATTRIBUTE_VALUE_LENGTH = 100;
    function getServiceWorkerStatus() {
        var navigator = Api.getInstance().navigator;
        if ('serviceWorker' in navigator) {
            if (navigator.serviceWorker.controller) {
                return 2 /* CONTROLLED */;
            }
            else {
                return 3 /* UNCONTROLLED */;
            }
        }
        else {
            return 1 /* UNSUPPORTED */;
        }
    }
    function getVisibilityState() {
        var document = Api.getInstance().document;
        var visibilityState = document.visibilityState;
        switch (visibilityState) {
            case 'visible':
                return VisibilityState.VISIBLE;
            case 'hidden':
                return VisibilityState.HIDDEN;
            default:
                return VisibilityState.UNKNOWN;
        }
    }
    function getEffectiveConnectionType() {
        var navigator = Api.getInstance().navigator;
        var navigatorConnection = navigator.connection;
        var effectiveType = navigatorConnection && navigatorConnection.effectiveType;
        switch (effectiveType) {
            case 'slow-2g':
                return 1 /* CONNECTION_SLOW_2G */;
            case '2g':
                return 2 /* CONNECTION_2G */;
            case '3g':
                return 3 /* CONNECTION_3G */;
            case '4g':
                return 4 /* CONNECTION_4G */;
            default:
                return 0 /* UNKNOWN */;
        }
    }
    function isValidCustomAttributeName(name) {
        if (name.length === 0 || name.length > MAX_ATTRIBUTE_NAME_LENGTH) {
            return false;
        }
        var matchesReservedPrefix = RESERVED_ATTRIBUTE_PREFIXES.some(function (prefix) {
            return name.startsWith(prefix);
        });
        return !matchesReservedPrefix && !!name.match(ATTRIBUTE_FORMAT_REGEX);
    }
    function isValidCustomAttributeValue(value) {
        return value.length !== 0 && value.length <= MAX_ATTRIBUTE_VALUE_LENGTH;
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
    function getAppId(firebaseApp) {
        var _a;
        var appId = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.appId;
        if (!appId) {
            throw ERROR_FACTORY$1.create("no app id" /* NO_APP_ID */);
        }
        return appId;
    }
    function getProjectId(firebaseApp) {
        var _a;
        var projectId = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.projectId;
        if (!projectId) {
            throw ERROR_FACTORY$1.create("no project id" /* NO_PROJECT_ID */);
        }
        return projectId;
    }
    function getApiKey(firebaseApp) {
        var _a;
        var apiKey = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.apiKey;
        if (!apiKey) {
            throw ERROR_FACTORY$1.create("no api key" /* NO_API_KEY */);
        }
        return apiKey;
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
    var REMOTE_CONFIG_SDK_VERSION = '0.0.1';
    // These values will be used if the remote config object is successfully
    // retrieved, but the template does not have these fields.
    var DEFAULT_CONFIGS = {
        loggingEnabled: true
    };
    var FIS_AUTH_PREFIX = 'FIREBASE_INSTALLATIONS_AUTH';
    function getConfig(performanceController, iid) {
        var config = getStoredConfig();
        if (config) {
            processConfig(config);
            return Promise.resolve();
        }
        return getRemoteConfig(performanceController, iid)
            .then(processConfig)
            .then(function (config) { return storeConfig(config); }, 
        /** Do nothing for error, use defaults set in settings service. */
        function () { });
    }
    function getStoredConfig() {
        var localStorage = Api.getInstance().localStorage;
        if (!localStorage) {
            return;
        }
        var expiryString = localStorage.getItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY);
        if (!expiryString || !configValid(expiryString)) {
            return;
        }
        var configStringified = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY);
        if (!configStringified) {
            return;
        }
        try {
            var configResponse = JSON.parse(configStringified);
            return configResponse;
        }
        catch (_a) {
            return;
        }
    }
    function storeConfig(config) {
        var localStorage = Api.getInstance().localStorage;
        if (!config || !localStorage) {
            return;
        }
        localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(config));
        localStorage.setItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY, String(Date.now() +
            SettingsService.getInstance().configTimeToLive * 60 * 60 * 1000));
    }
    var COULD_NOT_GET_CONFIG_MSG = 'Could not fetch config, will use default configs';
    function getRemoteConfig(performanceController, iid) {
        // Perf needs auth token only to retrieve remote config.
        return getAuthTokenPromise(performanceController.installations)
            .then(function (authToken) {
            var projectId = getProjectId(performanceController.app);
            var apiKey = getApiKey(performanceController.app);
            var configEndPoint = "https://firebaseremoteconfig.googleapis.com/v1/projects/" + projectId + "/namespaces/fireperf:fetch?key=" + apiKey;
            var request = new Request(configEndPoint, {
                method: 'POST',
                headers: { Authorization: FIS_AUTH_PREFIX + " " + authToken },
                /* eslint-disable camelcase */
                body: JSON.stringify({
                    app_instance_id: iid,
                    app_instance_id_token: authToken,
                    app_id: getAppId(performanceController.app),
                    app_version: SDK_VERSION,
                    sdk_version: REMOTE_CONFIG_SDK_VERSION
                })
                /* eslint-enable camelcase */
            });
            return fetch(request).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                // In case response is not ok. This will be caught by catch.
                throw ERROR_FACTORY$1.create("RC response not ok" /* RC_NOT_OK */);
            });
        })
            .catch(function () {
            consoleLogger.info(COULD_NOT_GET_CONFIG_MSG);
            return undefined;
        });
    }
    /**
     * Processes config coming either from calling RC or from local storage.
     * This method only runs if call is successful or config in storage
     * is valid.
     */
    function processConfig(config) {
        if (!config) {
            return config;
        }
        var settingsServiceInstance = SettingsService.getInstance();
        var entries = config.entries || {};
        if (entries.fpr_enabled !== undefined) {
            // TODO: Change the assignment of loggingEnabled once the received type is
            // known.
            settingsServiceInstance.loggingEnabled =
                String(entries.fpr_enabled) === 'true';
        }
        else {
            // Config retrieved successfully, but there is no fpr_enabled in template.
            // Use secondary configs value.
            settingsServiceInstance.loggingEnabled = DEFAULT_CONFIGS.loggingEnabled;
        }
        if (entries.fpr_log_source) {
            settingsServiceInstance.logSource = Number(entries.fpr_log_source);
        }
        if (entries.fpr_log_endpoint_url) {
            settingsServiceInstance.logEndPointUrl = entries.fpr_log_endpoint_url;
        }
        // Key from Remote Config has to be non-empty string, otherwsie use local value.
        if (entries.fpr_log_transport_key) {
            settingsServiceInstance.transportKey = entries.fpr_log_transport_key;
        }
        if (entries.fpr_vc_network_request_sampling_rate !== undefined) {
            settingsServiceInstance.networkRequestsSamplingRate = Number(entries.fpr_vc_network_request_sampling_rate);
        }
        if (entries.fpr_vc_trace_sampling_rate !== undefined) {
            settingsServiceInstance.tracesSamplingRate = Number(entries.fpr_vc_trace_sampling_rate);
        }
        // Set the per session trace and network logging flags.
        settingsServiceInstance.logTraceAfterSampling = shouldLogAfterSampling(settingsServiceInstance.tracesSamplingRate);
        settingsServiceInstance.logNetworkAfterSampling = shouldLogAfterSampling(settingsServiceInstance.networkRequestsSamplingRate);
        return config;
    }
    function configValid(expiry) {
        return Number(expiry) > Date.now();
    }
    function shouldLogAfterSampling(samplingRate) {
        return Math.random() <= samplingRate;
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
    var initializationStatus = 1 /* notInitialized */;
    var initializationPromise;
    function getInitializationPromise(performanceController) {
        initializationStatus = 2 /* initializationPending */;
        initializationPromise =
            initializationPromise || initializePerf(performanceController);
        return initializationPromise;
    }
    function isPerfInitialized() {
        return initializationStatus === 3 /* initialized */;
    }
    function initializePerf(performanceController) {
        return getDocumentReadyComplete()
            .then(function () { return getIidPromise(performanceController.installations); })
            .then(function (iid) { return getConfig(performanceController, iid); })
            .then(function () { return changeInitializationStatus(); }, function () { return changeInitializationStatus(); });
    }
    /**
     * Returns a promise which resolves whenever the document readystate is complete or
     * immediately if it is called after page load complete.
     */
    function getDocumentReadyComplete() {
        var document = Api.getInstance().document;
        return new Promise(function (resolve) {
            if (document && document.readyState !== 'complete') {
                var handler_1 = function () {
                    if (document.readyState === 'complete') {
                        document.removeEventListener('readystatechange', handler_1);
                        resolve();
                    }
                };
                document.addEventListener('readystatechange', handler_1);
            }
            else {
                resolve();
            }
        });
    }
    function changeInitializationStatus() {
        initializationStatus = 3 /* initialized */;
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
    var DEFAULT_SEND_INTERVAL_MS = 10 * 1000;
    var INITIAL_SEND_TIME_DELAY_MS = 5.5 * 1000;
    // If end point does not work, the call will be tried for these many times.
    var DEFAULT_REMAINING_TRIES = 3;
    var MAX_EVENT_COUNT_PER_REQUEST = 1000;
    var remainingTries = DEFAULT_REMAINING_TRIES;
    /* eslint-enable camelcase */
    var queue = [];
    var isTransportSetup = false;
    function setupTransportService() {
        if (!isTransportSetup) {
            processQueue(INITIAL_SEND_TIME_DELAY_MS);
            isTransportSetup = true;
        }
    }
    function processQueue(timeOffset) {
        setTimeout(function () {
            // If there is no remainingTries left, stop retrying.
            if (remainingTries === 0) {
                return;
            }
            // If there are no events to process, wait for DEFAULT_SEND_INTERVAL_MS and try again.
            if (!queue.length) {
                return processQueue(DEFAULT_SEND_INTERVAL_MS);
            }
            dispatchQueueEvents();
        }, timeOffset);
    }
    function dispatchQueueEvents() {
        // Extract events up to the maximum cap of single logRequest from top of "official queue".
        // The staged events will be used for current logRequest attempt, remaining events will be kept
        // for next attempt.
        var staged = queue.splice(0, MAX_EVENT_COUNT_PER_REQUEST);
        /* eslint-disable camelcase */
        // We will pass the JSON serialized event to the backend.
        var log_event = staged.map(function (evt) { return ({
            source_extension_json_proto3: evt.message,
            event_time_ms: String(evt.eventTime)
        }); });
        var data = {
            request_time_ms: String(Date.now()),
            client_info: {
                client_type: 1,
                js_client_info: {}
            },
            log_source: SettingsService.getInstance().logSource,
            log_event: log_event
        };
        /* eslint-enable camelcase */
        sendEventsToFl(data, staged).catch(function () {
            // If the request fails for some reason, add the events that were attempted
            // back to the primary queue to retry later.
            queue = __spreadArrays(staged, queue);
            remainingTries--;
            consoleLogger.info("Tries left: " + remainingTries + ".");
            processQueue(DEFAULT_SEND_INTERVAL_MS);
        });
    }
    function sendEventsToFl(data, staged) {
        return postToFlEndpoint(data)
            .then(function (res) {
            if (!res.ok) {
                consoleLogger.info('Call to Firebase backend failed.');
            }
            return res.json();
        })
            .then(function (res) {
            // Find the next call wait time from the response.
            var transportWait = Number(res.nextRequestWaitMillis);
            var requestOffset = DEFAULT_SEND_INTERVAL_MS;
            if (!isNaN(transportWait)) {
                requestOffset = Math.max(transportWait, requestOffset);
            }
            // Delete request if response include RESPONSE_ACTION_UNKNOWN or DELETE_REQUEST action.
            // Otherwise, retry request using normal scheduling if response include RETRY_REQUEST_LATER.
            var logResponseDetails = res.logResponseDetails;
            if (Array.isArray(logResponseDetails) &&
                logResponseDetails.length > 0 &&
                logResponseDetails[0].responseAction === 'RETRY_REQUEST_LATER') {
                queue = __spreadArrays(staged, queue);
                consoleLogger.info("Retry transport request later.");
            }
            remainingTries = DEFAULT_REMAINING_TRIES;
            // Schedule the next process.
            processQueue(requestOffset);
        });
    }
    function postToFlEndpoint(data) {
        var flTransportFullUrl = SettingsService.getInstance().getFlTransportFullUrl();
        return fetch(flTransportFullUrl, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    function addToQueue(evt) {
        if (!evt.eventTime || !evt.message) {
            throw ERROR_FACTORY$1.create("invalid cc log" /* INVALID_CC_LOG */);
        }
        // Add the new event to the queue.
        queue = __spreadArrays(queue, [evt]);
    }
    /** Log handler for cc service to send the performance logs to the server. */
    function transportHandler(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    serializer) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var message = serializer.apply(void 0, args);
            addToQueue({
                message: message,
                eventTime: Date.now()
            });
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
    /* eslint-enble camelcase */
    var logger;
    // This method is not called before initialization.
    function sendLog(resource, resourceType) {
        if (!logger) {
            logger = transportHandler(serializer);
        }
        logger(resource, resourceType);
    }
    function logTrace(trace) {
        var settingsService = SettingsService.getInstance();
        // Do not log if trace is auto generated and instrumentation is disabled.
        if (!settingsService.instrumentationEnabled && trace.isAuto) {
            return;
        }
        // Do not log if trace is custom and data collection is disabled.
        if (!settingsService.dataCollectionEnabled && !trace.isAuto) {
            return;
        }
        // Do not log if required apis are not available.
        if (!Api.getInstance().requiredApisAvailable()) {
            return;
        }
        // Only log the page load auto traces if page is visible.
        if (trace.isAuto && getVisibilityState() !== VisibilityState.VISIBLE) {
            return;
        }
        if (isPerfInitialized()) {
            sendTraceLog(trace);
        }
        else {
            // Custom traces can be used before the initialization but logging
            // should wait until after.
            getInitializationPromise(trace.performanceController).then(function () { return sendTraceLog(trace); }, function () { return sendTraceLog(trace); });
        }
    }
    function sendTraceLog(trace) {
        if (!getIid()) {
            return;
        }
        var settingsService = SettingsService.getInstance();
        if (!settingsService.loggingEnabled ||
            !settingsService.logTraceAfterSampling) {
            return;
        }
        setTimeout(function () { return sendLog(trace, 1 /* Trace */); }, 0);
    }
    function logNetworkRequest(networkRequest) {
        var settingsService = SettingsService.getInstance();
        // Do not log network requests if instrumentation is disabled.
        if (!settingsService.instrumentationEnabled) {
            return;
        }
        // Do not log the js sdk's call to transport service domain to avoid unnecessary cycle.
        // Need to blacklist both old and new endpoints to avoid migration gap.
        var networkRequestUrl = networkRequest.url;
        // Blacklist old log endpoint and new transport endpoint.
        // Because Performance SDK doesn't instrument requests sent from SDK itself.
        var logEndpointUrl = settingsService.logEndPointUrl.split('?')[0];
        var flEndpointUrl = settingsService.flTransportEndpointUrl.split('?')[0];
        if (networkRequestUrl === logEndpointUrl ||
            networkRequestUrl === flEndpointUrl) {
            return;
        }
        if (!settingsService.loggingEnabled ||
            !settingsService.logNetworkAfterSampling) {
            return;
        }
        setTimeout(function () { return sendLog(networkRequest, 0 /* NetworkRequest */); }, 0);
    }
    function serializer(resource, resourceType) {
        if (resourceType === 0 /* NetworkRequest */) {
            return serializeNetworkRequest(resource);
        }
        return serializeTrace(resource);
    }
    function serializeNetworkRequest(networkRequest) {
        var networkRequestMetric = {
            url: networkRequest.url,
            http_method: networkRequest.httpMethod || 0,
            http_response_code: 200,
            response_payload_bytes: networkRequest.responsePayloadBytes,
            client_start_time_us: networkRequest.startTimeUs,
            time_to_response_initiated_us: networkRequest.timeToResponseInitiatedUs,
            time_to_response_completed_us: networkRequest.timeToResponseCompletedUs
        };
        var perfMetric = {
            application_info: getApplicationInfo(networkRequest.performanceController.app),
            network_request_metric: networkRequestMetric
        };
        return JSON.stringify(perfMetric);
    }
    function serializeTrace(trace) {
        var traceMetric = {
            name: trace.name,
            is_auto: trace.isAuto,
            client_start_time_us: trace.startTimeUs,
            duration_us: trace.durationUs
        };
        if (Object.keys(trace.counters).length !== 0) {
            traceMetric.counters = trace.counters;
        }
        var customAttributes = trace.getAttributes();
        if (Object.keys(customAttributes).length !== 0) {
            traceMetric.custom_attributes = customAttributes;
        }
        var perfMetric = {
            application_info: getApplicationInfo(trace.performanceController.app),
            trace_metric: traceMetric
        };
        return JSON.stringify(perfMetric);
    }
    function getApplicationInfo(firebaseApp) {
        return {
            google_app_id: getAppId(firebaseApp),
            app_instance_id: getIid(),
            web_app_info: {
                sdk_version: SDK_VERSION,
                page_url: Api.getInstance().getUrl(),
                service_worker_status: getServiceWorkerStatus(),
                visibility_state: getVisibilityState(),
                effective_connection_type: getEffectiveConnectionType()
            },
            application_process_state: 0
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
    var MAX_METRIC_NAME_LENGTH = 100;
    var RESERVED_AUTO_PREFIX = '_';
    var oobMetrics = [
        FIRST_PAINT_COUNTER_NAME,
        FIRST_CONTENTFUL_PAINT_COUNTER_NAME,
        FIRST_INPUT_DELAY_COUNTER_NAME
    ];
    /**
     * Returns true if the metric is custom and does not start with reserved prefix, or if
     * the metric is one of out of the box page load trace metrics.
     */
    function isValidMetricName(name, traceName) {
        if (name.length === 0 || name.length > MAX_METRIC_NAME_LENGTH) {
            return false;
        }
        return ((traceName &&
            traceName.startsWith(OOB_TRACE_PAGE_LOAD_PREFIX) &&
            oobMetrics.indexOf(name) > -1) ||
            !name.startsWith(RESERVED_AUTO_PREFIX));
    }
    /**
     * Converts the provided value to an integer value to be used in case of a metric.
     * @param providedValue Provided number value of the metric that needs to be converted to an integer.
     *
     * @returns Converted integer number to be set for the metric.
     */
    function convertMetricValueToInteger(providedValue) {
        var valueAsInteger = Math.floor(providedValue);
        if (valueAsInteger < providedValue) {
            consoleLogger.info("Metric value should be an Integer, setting the value as : " + valueAsInteger + ".");
        }
        return valueAsInteger;
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
    var Trace = /** @class */ (function () {
        /**
         * @param performanceController The performance controller running.
         * @param name The name of the trace.
         * @param isAuto If the trace is auto-instrumented.
         * @param traceMeasureName The name of the measure marker in user timing specification. This field
         * is only set when the trace is built for logging when the user directly uses the user timing
         * api (performance.mark and performance.measure).
         */
        function Trace(performanceController, name, isAuto, traceMeasureName) {
            if (isAuto === void 0) { isAuto = false; }
            this.performanceController = performanceController;
            this.name = name;
            this.isAuto = isAuto;
            this.state = 1 /* UNINITIALIZED */;
            this.customAttributes = {};
            this.counters = {};
            this.api = Api.getInstance();
            this.randomId = Math.floor(Math.random() * 1000000);
            if (!this.isAuto) {
                this.traceStartMark = TRACE_START_MARK_PREFIX + "-" + this.randomId + "-" + this.name;
                this.traceStopMark = TRACE_STOP_MARK_PREFIX + "-" + this.randomId + "-" + this.name;
                this.traceMeasure =
                    traceMeasureName ||
                        TRACE_MEASURE_PREFIX + "-" + this.randomId + "-" + this.name;
                if (traceMeasureName) {
                    // For the case of direct user timing traces, no start stop will happen. The measure object
                    // is already available.
                    this.calculateTraceMetrics();
                }
            }
        }
        /**
         * Starts a trace. The measurement of the duration starts at this point.
         */
        Trace.prototype.start = function () {
            if (this.state !== 1 /* UNINITIALIZED */) {
                throw ERROR_FACTORY$1.create("trace started" /* TRACE_STARTED_BEFORE */, {
                    traceName: this.name
                });
            }
            this.api.mark(this.traceStartMark);
            this.state = 2 /* RUNNING */;
        };
        /**
         * Stops the trace. The measurement of the duration of the trace stops at this point and trace
         * is logged.
         */
        Trace.prototype.stop = function () {
            if (this.state !== 2 /* RUNNING */) {
                throw ERROR_FACTORY$1.create("trace stopped" /* TRACE_STOPPED_BEFORE */, {
                    traceName: this.name
                });
            }
            this.state = 3 /* TERMINATED */;
            this.api.mark(this.traceStopMark);
            this.api.measure(this.traceMeasure, this.traceStartMark, this.traceStopMark);
            this.calculateTraceMetrics();
            logTrace(this);
        };
        /**
         * Records a trace with predetermined values. If this method is used a trace is created and logged
         * directly. No need to use start and stop methods.
         * @param startTime Trace start time since epoch in millisec
         * @param duration The duraction of the trace in millisec
         * @param options An object which can optionally hold maps of custom metrics and custom attributes
         */
        Trace.prototype.record = function (startTime, duration, options) {
            if (startTime <= 0) {
                throw ERROR_FACTORY$1.create("nonpositive trace startTime" /* NONPOSITIVE_TRACE_START_TIME */, {
                    traceName: this.name
                });
            }
            if (duration <= 0) {
                throw ERROR_FACTORY$1.create("nonpositive trace duration" /* NONPOSITIVE_TRACE_DURATION */, {
                    traceName: this.name
                });
            }
            this.durationUs = Math.floor(duration * 1000);
            this.startTimeUs = Math.floor(startTime * 1000);
            if (options && options.attributes) {
                this.customAttributes = __assign({}, options.attributes);
            }
            if (options && options.metrics) {
                for (var _i = 0, _a = Object.keys(options.metrics); _i < _a.length; _i++) {
                    var metric = _a[_i];
                    if (!isNaN(Number(options.metrics[metric]))) {
                        this.counters[metric] = Number(Math.floor(options.metrics[metric]));
                    }
                }
            }
            logTrace(this);
        };
        /**
         * Increments a custom metric by a certain number or 1 if number not specified. Will create a new
         * custom metric if one with the given name does not exist. The value will be floored down to an
         * integer.
         * @param counter Name of the custom metric
         * @param numAsInteger Increment by value
         */
        Trace.prototype.incrementMetric = function (counter, numAsInteger) {
            if (numAsInteger === void 0) { numAsInteger = 1; }
            if (this.counters[counter] === undefined) {
                this.putMetric(counter, numAsInteger);
            }
            else {
                this.putMetric(counter, this.counters[counter] + numAsInteger);
            }
        };
        /**
         * Sets a custom metric to a specified value. Will create a new custom metric if one with the
         * given name does not exist. The value will be floored down to an integer.
         * @param counter Name of the custom metric
         * @param numAsInteger Set custom metric to this value
         */
        Trace.prototype.putMetric = function (counter, numAsInteger) {
            if (isValidMetricName(counter, this.name)) {
                this.counters[counter] = convertMetricValueToInteger(numAsInteger);
            }
            else {
                throw ERROR_FACTORY$1.create("invalid custom metric name" /* INVALID_CUSTOM_METRIC_NAME */, {
                    customMetricName: counter
                });
            }
        };
        /**
         * Returns the value of the custom metric by that name. If a custom metric with that name does
         * not exist will return zero.
         * @param counter
         */
        Trace.prototype.getMetric = function (counter) {
            return this.counters[counter] || 0;
        };
        /**
         * Sets a custom attribute of a trace to a certain value.
         * @param attr
         * @param value
         */
        Trace.prototype.putAttribute = function (attr, value) {
            var isValidName = isValidCustomAttributeName(attr);
            var isValidValue = isValidCustomAttributeValue(value);
            if (isValidName && isValidValue) {
                this.customAttributes[attr] = value;
                return;
            }
            // Throw appropriate error when the attribute name or value is invalid.
            if (!isValidName) {
                throw ERROR_FACTORY$1.create("invalid attribute name" /* INVALID_ATTRIBUTE_NAME */, {
                    attributeName: attr
                });
            }
            if (!isValidValue) {
                throw ERROR_FACTORY$1.create("invalid attribute value" /* INVALID_ATTRIBUTE_VALUE */, {
                    attributeValue: value
                });
            }
        };
        /**
         * Retrieves the value a custom attribute of a trace is set to.
         * @param attr
         */
        Trace.prototype.getAttribute = function (attr) {
            return this.customAttributes[attr];
        };
        Trace.prototype.removeAttribute = function (attr) {
            if (this.customAttributes[attr] === undefined) {
                return;
            }
            delete this.customAttributes[attr];
        };
        Trace.prototype.getAttributes = function () {
            return __assign({}, this.customAttributes);
        };
        Trace.prototype.setStartTime = function (startTime) {
            this.startTimeUs = startTime;
        };
        Trace.prototype.setDuration = function (duration) {
            this.durationUs = duration;
        };
        /**
         * Calculates and assigns the duration and start time of the trace using the measure performance
         * entry.
         */
        Trace.prototype.calculateTraceMetrics = function () {
            var perfMeasureEntries = this.api.getEntriesByName(this.traceMeasure);
            var perfMeasureEntry = perfMeasureEntries && perfMeasureEntries[0];
            if (perfMeasureEntry) {
                this.durationUs = Math.floor(perfMeasureEntry.duration * 1000);
                this.startTimeUs = Math.floor((perfMeasureEntry.startTime + this.api.getTimeOrigin()) * 1000);
            }
        };
        /**
         * @param navigationTimings A single element array which contains the navigationTIming object of
         * the page load
         * @param paintTimings A array which contains paintTiming object of the page load
         * @param firstInputDelay First input delay in millisec
         */
        Trace.createOobTrace = function (performanceController, navigationTimings, paintTimings, firstInputDelay) {
            var route = Api.getInstance().getUrl();
            if (!route) {
                return;
            }
            var trace = new Trace(performanceController, OOB_TRACE_PAGE_LOAD_PREFIX + route, true);
            var timeOriginUs = Math.floor(Api.getInstance().getTimeOrigin() * 1000);
            trace.setStartTime(timeOriginUs);
            // navigationTimings includes only one element.
            if (navigationTimings && navigationTimings[0]) {
                trace.setDuration(Math.floor(navigationTimings[0].duration * 1000));
                trace.putMetric('domInteractive', Math.floor(navigationTimings[0].domInteractive * 1000));
                trace.putMetric('domContentLoadedEventEnd', Math.floor(navigationTimings[0].domContentLoadedEventEnd * 1000));
                trace.putMetric('loadEventEnd', Math.floor(navigationTimings[0].loadEventEnd * 1000));
            }
            var FIRST_PAINT = 'first-paint';
            var FIRST_CONTENTFUL_PAINT = 'first-contentful-paint';
            if (paintTimings) {
                var firstPaint = paintTimings.find(function (paintObject) { return paintObject.name === FIRST_PAINT; });
                if (firstPaint && firstPaint.startTime) {
                    trace.putMetric(FIRST_PAINT_COUNTER_NAME, Math.floor(firstPaint.startTime * 1000));
                }
                var firstContentfulPaint = paintTimings.find(function (paintObject) { return paintObject.name === FIRST_CONTENTFUL_PAINT; });
                if (firstContentfulPaint && firstContentfulPaint.startTime) {
                    trace.putMetric(FIRST_CONTENTFUL_PAINT_COUNTER_NAME, Math.floor(firstContentfulPaint.startTime * 1000));
                }
                if (firstInputDelay) {
                    trace.putMetric(FIRST_INPUT_DELAY_COUNTER_NAME, Math.floor(firstInputDelay * 1000));
                }
            }
            logTrace(trace);
        };
        Trace.createUserTimingTrace = function (performanceController, measureName) {
            var trace = new Trace(performanceController, measureName, false, measureName);
            logTrace(trace);
        };
        return Trace;
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
    function createNetworkRequestEntry(performanceController, entry) {
        var performanceEntry = entry;
        if (!performanceEntry || performanceEntry.responseStart === undefined) {
            return;
        }
        var timeOrigin = Api.getInstance().getTimeOrigin();
        var startTimeUs = Math.floor((performanceEntry.startTime + timeOrigin) * 1000);
        var timeToResponseInitiatedUs = performanceEntry.responseStart
            ? Math.floor((performanceEntry.responseStart - performanceEntry.startTime) * 1000)
            : undefined;
        var timeToResponseCompletedUs = Math.floor((performanceEntry.responseEnd - performanceEntry.startTime) * 1000);
        // Remove the query params from logged network request url.
        var url = performanceEntry.name && performanceEntry.name.split('?')[0];
        var networkRequest = {
            performanceController: performanceController,
            url: url,
            responsePayloadBytes: performanceEntry.transferSize,
            startTimeUs: startTimeUs,
            timeToResponseInitiatedUs: timeToResponseInitiatedUs,
            timeToResponseCompletedUs: timeToResponseCompletedUs
        };
        logNetworkRequest(networkRequest);
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
    var FID_WAIT_TIME_MS = 5000;
    function setupOobResources(performanceController) {
        // Do not initialize unless iid is available.
        if (!getIid()) {
            return;
        }
        // The load event might not have fired yet, and that means performance navigation timing
        // object has a duration of 0. The setup should run after all current tasks in js queue.
        setTimeout(function () { return setupOobTraces(performanceController); }, 0);
        setTimeout(function () { return setupNetworkRequests(performanceController); }, 0);
        setTimeout(function () { return setupUserTimingTraces(performanceController); }, 0);
    }
    function setupNetworkRequests(performanceController) {
        var api = Api.getInstance();
        var resources = api.getEntriesByType('resource');
        for (var _i = 0, resources_1 = resources; _i < resources_1.length; _i++) {
            var resource = resources_1[_i];
            createNetworkRequestEntry(performanceController, resource);
        }
        api.setupObserver('resource', function (entry) {
            return createNetworkRequestEntry(performanceController, entry);
        });
    }
    function setupOobTraces(performanceController) {
        var api = Api.getInstance();
        var navigationTimings = api.getEntriesByType('navigation');
        var paintTimings = api.getEntriesByType('paint');
        // If First Input Desly polyfill is added to the page, report the fid value.
        // https://github.com/GoogleChromeLabs/first-input-delay
        if (api.onFirstInputDelay) {
            // If the fid call back is not called for certain time, continue without it.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var timeoutId_1 = setTimeout(function () {
                Trace.createOobTrace(performanceController, navigationTimings, paintTimings);
                timeoutId_1 = undefined;
            }, FID_WAIT_TIME_MS);
            api.onFirstInputDelay(function (fid) {
                if (timeoutId_1) {
                    clearTimeout(timeoutId_1);
                    Trace.createOobTrace(performanceController, navigationTimings, paintTimings, fid);
                }
            });
        }
        else {
            Trace.createOobTrace(performanceController, navigationTimings, paintTimings);
        }
    }
    function setupUserTimingTraces(performanceController) {
        var api = Api.getInstance();
        // Run through the measure performance entries collected up to this point.
        var measures = api.getEntriesByType('measure');
        for (var _i = 0, measures_1 = measures; _i < measures_1.length; _i++) {
            var measure = measures_1[_i];
            createUserTimingTrace(performanceController, measure);
        }
        // Setup an observer to capture the measures from this point on.
        api.setupObserver('measure', function (entry) {
            return createUserTimingTrace(performanceController, entry);
        });
    }
    function createUserTimingTrace(performanceController, measure) {
        var measureName = measure.name;
        // Do not create a trace, if the user timing marks and measures are created by the sdk itself.
        if (measureName.substring(0, TRACE_MEASURE_PREFIX.length) ===
            TRACE_MEASURE_PREFIX) {
            return;
        }
        Trace.createUserTimingTrace(performanceController, measureName);
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
    var PerformanceController = /** @class */ (function () {
        function PerformanceController(app, installations) {
            this.app = app;
            this.installations = installations;
            this.initialized = false;
        }
        /**
         * This method *must* be called internally as part of creating a
         * PerformanceController instance.
         *
         * Currently it's not possible to pass the settings object through the
         * constructor using Components, so this method exists to be called with the
         * desired settings, to ensure nothing is collected without the user's
         * consent.
         */
        PerformanceController.prototype._init = function (settings) {
            var _this = this;
            if (this.initialized) {
                return;
            }
            if ((settings === null || settings === void 0 ? void 0 : settings.dataCollectionEnabled) !== undefined) {
                this.dataCollectionEnabled = settings.dataCollectionEnabled;
            }
            if ((settings === null || settings === void 0 ? void 0 : settings.instrumentationEnabled) !== undefined) {
                this.instrumentationEnabled = settings.instrumentationEnabled;
            }
            if (Api.getInstance().requiredApisAvailable()) {
                validateIndexedDBOpenable()
                    .then(function (isAvailable) {
                    if (isAvailable) {
                        setupTransportService();
                        getInitializationPromise(_this).then(function () { return setupOobResources(_this); }, function () { return setupOobResources(_this); });
                        _this.initialized = true;
                    }
                })
                    .catch(function (error) {
                    consoleLogger.info("Environment doesn't support IndexedDB: " + error);
                });
            }
            else {
                consoleLogger.info('Firebase Performance cannot start if the browser does not support ' +
                    '"Fetch" and "Promise", or cookies are disabled.');
            }
        };
        Object.defineProperty(PerformanceController.prototype, "instrumentationEnabled", {
            get: function () {
                return SettingsService.getInstance().instrumentationEnabled;
            },
            set: function (val) {
                SettingsService.getInstance().instrumentationEnabled = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PerformanceController.prototype, "dataCollectionEnabled", {
            get: function () {
                return SettingsService.getInstance().dataCollectionEnabled;
            },
            set: function (val) {
                SettingsService.getInstance().dataCollectionEnabled = val;
            },
            enumerable: false,
            configurable: true
        });
        return PerformanceController;
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
    var DEFAULT_ENTRY_NAME = '[DEFAULT]';
    /**
     * Returns a FirebasePerformance instance for the given app.
     * @param app - The FirebaseApp to use.
     * @param settings - Optional settings for the Performance instance.
     * @public
     */
    function getPerformance(app$1, settings) {
        var provider = app._getProvider(app$1, 'performance-exp');
        var perfInstance = provider.getImmediate();
        perfInstance._init(settings);
        return perfInstance;
    }
    /**
     * Returns a new PerformanceTrace instance.
     * @param performance - The FirebasePerformance instance to use.
     * @param name - The name of the trace.
     * @public
     */
    function trace(performance, name) {
        return new Trace(performance, name);
    }
    var factory = function (container) {
        // Dependencies
        var app = container.getProvider('app-exp').getImmediate();
        var installations = container
            .getProvider('installations-exp-internal')
            .getImmediate();
        if (app.name !== DEFAULT_ENTRY_NAME) {
            throw ERROR_FACTORY$1.create("FB not default" /* FB_NOT_DEFAULT */);
        }
        if (typeof window === 'undefined') {
            throw ERROR_FACTORY$1.create("no window" /* NO_WINDOW */);
        }
        setupApi(window);
        return new PerformanceController(app, installations);
    };
    function registerPerformance() {
        app._registerComponent(new Component('performance-exp', factory, "PUBLIC" /* PUBLIC */));
    }
    registerPerformance();
    app.registerVersion(name$1, version$1);

    exports.getPerformance = getPerformance;
    exports.trace = trace;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-performance.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-performance.js.map
