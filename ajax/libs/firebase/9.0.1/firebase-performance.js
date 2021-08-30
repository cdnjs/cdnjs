import { registerVersion, _registerComponent, _getProvider, getApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';

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
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */
function isIndexedDBAvailable() {
    return 'indexedDB' in self && indexedDB != null;
}
/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */
function validateIndexedDBOpenable() {
    return new Promise(function (resolve, reject) {
        try {
            var preExist_1 = true;
            var DB_CHECK_NAME_1 = 'validate-browser-context-for-indexeddb-analytics-module';
            var request_1 = self.indexedDB.open(DB_CHECK_NAME_1);
            request_1.onsuccess = function () {
                request_1.result.close();
                // delete database only when it doesn't pre-exist
                if (!preExist_1) {
                    self.indexedDB.deleteDatabase(DB_CHECK_NAME_1);
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
/**
 * Deep equal two objects. Support Arrays and Objects.
 */
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    for (var _i = 0, aKeys_1 = aKeys; _i < aKeys_1.length; _i++) {
        var k = aKeys_1[_i];
        if (!bKeys.includes(k)) {
            return false;
        }
        var aProp = a[k];
        var bProp = b[k];
        if (isObject(aProp) && isObject(bProp)) {
            if (!deepEqual(aProp, bProp)) {
                return false;
            }
        }
        else if (aProp !== bProp) {
            return false;
        }
    }
    for (var _a = 0, bKeys_1 = bKeys; _a < bKeys_1.length; _a++) {
        var k = bKeys_1[_a];
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
        console[method].apply(console, __spreadArray(["[" + now + "]  " + instance.name + ":"], args));
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
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArray([this, LogLevel.DEBUG], args));
        this._logHandler.apply(this, __spreadArray([this, LogLevel.DEBUG], args));
    };
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArray([this, LogLevel.VERBOSE], args));
        this._logHandler.apply(this, __spreadArray([this, LogLevel.VERBOSE], args));
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArray([this, LogLevel.INFO], args));
        this._logHandler.apply(this, __spreadArray([this, LogLevel.INFO], args));
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArray([this, LogLevel.WARN], args));
        this._logHandler.apply(this, __spreadArray([this, LogLevel.WARN], args));
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._userLogHandler && this._userLogHandler.apply(this, __spreadArray([this, LogLevel.ERROR], args));
        this._logHandler.apply(this, __spreadArray([this, LogLevel.ERROR], args));
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
        this.onInstanceCreated = null;
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
    Component.prototype.setInstanceCreatedCallback = function (callback) {
        this.onInstanceCreated = callback;
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

const name$1 = "@firebase/installations";
const version$1 = "0.5.0";

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
const PENDING_TIMEOUT_MS = 10000;
const PACKAGE_VERSION = `w:${version$1}`;
const INTERNAL_AUTH_VERSION = 'FIS_v2';
const INSTALLATIONS_API_URL = 'https://firebaseinstallations.googleapis.com/v1';
const TOKEN_EXPIRATION_BUFFER = 60 * 60 * 1000; // One hour
const SERVICE$1 = 'installations';
const SERVICE_NAME$1 = 'Installations';

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
const ERROR_DESCRIPTION_MAP$1 = {
    ["missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */]: 'Missing App configuration value: "{$valueName}"',
    ["not-registered" /* NOT_REGISTERED */]: 'Firebase Installation is not registered.',
    ["installation-not-found" /* INSTALLATION_NOT_FOUND */]: 'Firebase Installation not found.',
    ["request-failed" /* REQUEST_FAILED */]: '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    ["app-offline" /* APP_OFFLINE */]: 'Could not process request. Application offline.',
    ["delete-pending-registration" /* DELETE_PENDING_REGISTRATION */]: "Can't delete installation while there is a pending registration request."
};
const ERROR_FACTORY$1 = new ErrorFactory(SERVICE$1, SERVICE_NAME$1, ERROR_DESCRIPTION_MAP$1);
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
function getInstallationsEndpoint({ projectId }) {
    return `${INSTALLATIONS_API_URL}/projects/${projectId}/installations`;
}
function extractAuthTokenInfoFromResponse(response) {
    return {
        token: response.token,
        requestStatus: 2 /* COMPLETED */,
        expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
        creationTime: Date.now()
    };
}
async function getErrorFromResponse(requestName, response) {
    const responseJson = await response.json();
    const errorData = responseJson.error;
    return ERROR_FACTORY$1.create("request-failed" /* REQUEST_FAILED */, {
        requestName,
        serverCode: errorData.code,
        serverMessage: errorData.message,
        serverStatus: errorData.status
    });
}
function getHeaders({ apiKey }) {
    return new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-goog-api-key': apiKey
    });
}
function getHeadersWithAuth(appConfig, { refreshToken }) {
    const headers = getHeaders(appConfig);
    headers.append('Authorization', getAuthorizationHeader(refreshToken));
    return headers;
}
/**
 * Calls the passed in fetch wrapper and returns the response.
 * If the returned response has a status of 5xx, re-runs the function once and
 * returns the response.
 */
async function retryIfServerError(fn) {
    const result = await fn();
    if (result.status >= 500 && result.status < 600) {
        // Internal Server Error. Retry request.
        return fn();
    }
    return result;
}
function getExpiresInFromResponseExpiresIn(responseExpiresIn) {
    // This works because the server will never respond with fractions of a second.
    return Number(responseExpiresIn.replace('s', '000'));
}
function getAuthorizationHeader(refreshToken) {
    return `${INTERNAL_AUTH_VERSION} ${refreshToken}`;
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
async function createInstallationRequest(appConfig, { fid }) {
    const endpoint = getInstallationsEndpoint(appConfig);
    const headers = getHeaders(appConfig);
    const body = {
        fid,
        authVersion: INTERNAL_AUTH_VERSION,
        appId: appConfig.appId,
        sdkVersion: PACKAGE_VERSION
    };
    const request = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    };
    const response = await retryIfServerError(() => fetch(endpoint, request));
    if (response.ok) {
        const responseValue = await response.json();
        const registeredInstallationEntry = {
            fid: responseValue.fid || fid,
            registrationStatus: 2 /* COMPLETED */,
            refreshToken: responseValue.refreshToken,
            authToken: extractAuthTokenInfoFromResponse(responseValue.authToken)
        };
        return registeredInstallationEntry;
    }
    else {
        throw await getErrorFromResponse('Create Installation', response);
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
/** Returns a promise that resolves after given time passes. */
function sleep(ms) {
    return new Promise(resolve => {
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
    const b64 = btoa(String.fromCharCode(...array));
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
const VALID_FID_PATTERN = /^[cdef][\w-]{21}$/;
const INVALID_FID = '';
/**
 * Generates a new FID using random values from Web Crypto API.
 * Returns an empty string if FID generation fails for any reason.
 */
function generateFid() {
    try {
        // A valid FID has exactly 22 base64 characters, which is 132 bits, or 16.5
        // bytes. our implementation generates a 17 byte array instead.
        const fidByteArray = new Uint8Array(17);
        const crypto = self.crypto || self.msCrypto;
        crypto.getRandomValues(fidByteArray);
        // Replace the first 4 random bits with the constant FID header of 0b0111.
        fidByteArray[0] = 0b01110000 + (fidByteArray[0] % 0b00010000);
        const fid = encode(fidByteArray);
        return VALID_FID_PATTERN.test(fid) ? fid : INVALID_FID;
    }
    catch (_a) {
        // FID generation errored
        return INVALID_FID;
    }
}
/** Converts a FID Uint8Array to a base64 string representation. */
function encode(fidByteArray) {
    const b64String = bufferToBase64UrlSafe(fidByteArray);
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
    return `${appConfig.appName}!${appConfig.appId}`;
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
const fidChangeCallbacks = new Map();
/**
 * Calls the onIdChange callbacks with the new FID value, and broadcasts the
 * change to other tabs.
 */
function fidChanged(appConfig, fid) {
    const key = getKey(appConfig);
    callFidChangeCallbacks(key, fid);
    broadcastFidChange(key, fid);
}
function callFidChangeCallbacks(key, fid) {
    const callbacks = fidChangeCallbacks.get(key);
    if (!callbacks) {
        return;
    }
    for (const callback of callbacks) {
        callback(fid);
    }
}
function broadcastFidChange(key, fid) {
    const channel = getBroadcastChannel();
    if (channel) {
        channel.postMessage({ key, fid });
    }
    closeBroadcastChannel();
}
let broadcastChannel = null;
/** Opens and returns a BroadcastChannel if it is supported by the browser. */
function getBroadcastChannel() {
    if (!broadcastChannel && 'BroadcastChannel' in self) {
        broadcastChannel = new BroadcastChannel('[Firebase] FID Change');
        broadcastChannel.onmessage = e => {
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
const DATABASE_NAME = 'firebase-installations-database';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'firebase-installations-store';
let dbPromise = null;
function getDbPromise() {
    if (!dbPromise) {
        dbPromise = openDb(DATABASE_NAME, DATABASE_VERSION, upgradeDB => {
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
async function set(appConfig, value) {
    const key = getKey(appConfig);
    const db = await getDbPromise();
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const objectStore = tx.objectStore(OBJECT_STORE_NAME);
    const oldValue = await objectStore.get(key);
    await objectStore.put(value, key);
    await tx.complete;
    if (!oldValue || oldValue.fid !== value.fid) {
        fidChanged(appConfig, value.fid);
    }
    return value;
}
/** Removes record(s) from the objectStore that match the given key. */
async function remove(appConfig) {
    const key = getKey(appConfig);
    const db = await getDbPromise();
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    await tx.objectStore(OBJECT_STORE_NAME).delete(key);
    await tx.complete;
}
/**
 * Atomically updates a record with the result of updateFn, which gets
 * called with the current value. If newValue is undefined, the record is
 * deleted instead.
 * @return Updated value
 */
async function update(appConfig, updateFn) {
    const key = getKey(appConfig);
    const db = await getDbPromise();
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const oldValue = await store.get(key);
    const newValue = updateFn(oldValue);
    if (newValue === undefined) {
        await store.delete(key);
    }
    else {
        await store.put(newValue, key);
    }
    await tx.complete;
    if (newValue && (!oldValue || oldValue.fid !== newValue.fid)) {
        fidChanged(appConfig, newValue.fid);
    }
    return newValue;
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
async function getInstallationEntry(appConfig) {
    let registrationPromise;
    const installationEntry = await update(appConfig, oldEntry => {
        const installationEntry = updateOrCreateInstallationEntry(oldEntry);
        const entryWithPromise = triggerRegistrationIfNecessary(appConfig, installationEntry);
        registrationPromise = entryWithPromise.registrationPromise;
        return entryWithPromise.installationEntry;
    });
    if (installationEntry.fid === INVALID_FID) {
        // FID generation failed. Waiting for the FID from the server.
        return { installationEntry: await registrationPromise };
    }
    return {
        installationEntry,
        registrationPromise
    };
}
/**
 * Creates a new Installation Entry if one does not exist.
 * Also clears timed out pending requests.
 */
function updateOrCreateInstallationEntry(oldEntry) {
    const entry = oldEntry || {
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
            const registrationPromiseWithError = Promise.reject(ERROR_FACTORY$1.create("app-offline" /* APP_OFFLINE */));
            return {
                installationEntry,
                registrationPromise: registrationPromiseWithError
            };
        }
        // Try registering. Change status to IN_PROGRESS.
        const inProgressEntry = {
            fid: installationEntry.fid,
            registrationStatus: 1 /* IN_PROGRESS */,
            registrationTime: Date.now()
        };
        const registrationPromise = registerInstallation(appConfig, inProgressEntry);
        return { installationEntry: inProgressEntry, registrationPromise };
    }
    else if (installationEntry.registrationStatus === 1 /* IN_PROGRESS */) {
        return {
            installationEntry,
            registrationPromise: waitUntilFidRegistration(appConfig)
        };
    }
    else {
        return { installationEntry };
    }
}
/** This will be executed only once for each new Firebase Installation. */
async function registerInstallation(appConfig, installationEntry) {
    try {
        const registeredInstallationEntry = await createInstallationRequest(appConfig, installationEntry);
        return set(appConfig, registeredInstallationEntry);
    }
    catch (e) {
        if (isServerError(e) && e.customData.serverCode === 409) {
            // Server returned a "FID can not be used" error.
            // Generate a new ID next time.
            await remove(appConfig);
        }
        else {
            // Registration failed. Set FID as not registered.
            await set(appConfig, {
                fid: installationEntry.fid,
                registrationStatus: 0 /* NOT_STARTED */
            });
        }
        throw e;
    }
}
/** Call if FID registration is pending in another request. */
async function waitUntilFidRegistration(appConfig) {
    // Unfortunately, there is no way of reliably observing when a value in
    // IndexedDB changes (yet, see https://github.com/WICG/indexed-db-observers),
    // so we need to poll.
    let entry = await updateInstallationRequest(appConfig);
    while (entry.registrationStatus === 1 /* IN_PROGRESS */) {
        // createInstallation request still in progress.
        await sleep(100);
        entry = await updateInstallationRequest(appConfig);
    }
    if (entry.registrationStatus === 0 /* NOT_STARTED */) {
        // The request timed out or failed in a different call. Try again.
        const { installationEntry, registrationPromise } = await getInstallationEntry(appConfig);
        if (registrationPromise) {
            return registrationPromise;
        }
        else {
            // if there is no registrationPromise, entry is registered.
            return installationEntry;
        }
    }
    return entry;
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
    return update(appConfig, oldEntry => {
        if (!oldEntry) {
            throw ERROR_FACTORY$1.create("installation-not-found" /* INSTALLATION_NOT_FOUND */);
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
async function generateAuthTokenRequest({ appConfig, platformLoggerProvider }, installationEntry) {
    const endpoint = getGenerateAuthTokenEndpoint(appConfig, installationEntry);
    const headers = getHeadersWithAuth(appConfig, installationEntry);
    // If platform logger exists, add the platform info string to the header.
    const platformLogger = platformLoggerProvider.getImmediate({
        optional: true
    });
    if (platformLogger) {
        headers.append('x-firebase-client', platformLogger.getPlatformInfoString());
    }
    const body = {
        installation: {
            sdkVersion: PACKAGE_VERSION
        }
    };
    const request = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    };
    const response = await retryIfServerError(() => fetch(endpoint, request));
    if (response.ok) {
        const responseValue = await response.json();
        const completedAuthToken = extractAuthTokenInfoFromResponse(responseValue);
        return completedAuthToken;
    }
    else {
        throw await getErrorFromResponse('Generate Auth Token', response);
    }
}
function getGenerateAuthTokenEndpoint(appConfig, { fid }) {
    return `${getInstallationsEndpoint(appConfig)}/${fid}/authTokens:generate`;
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
async function refreshAuthToken(installations, forceRefresh = false) {
    let tokenPromise;
    const entry = await update(installations.appConfig, oldEntry => {
        if (!isEntryRegistered(oldEntry)) {
            throw ERROR_FACTORY$1.create("not-registered" /* NOT_REGISTERED */);
        }
        const oldAuthToken = oldEntry.authToken;
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
                throw ERROR_FACTORY$1.create("app-offline" /* APP_OFFLINE */);
            }
            const inProgressEntry = makeAuthTokenRequestInProgressEntry(oldEntry);
            tokenPromise = fetchAuthTokenFromServer(installations, inProgressEntry);
            return inProgressEntry;
        }
    });
    const authToken = tokenPromise
        ? await tokenPromise
        : entry.authToken;
    return authToken;
}
/**
 * Call only if FID is registered and Auth Token request is in progress.
 *
 * Waits until the current pending request finishes. If the request times out,
 * tries once in this thread as well.
 */
async function waitUntilAuthTokenRequest(installations, forceRefresh) {
    // Unfortunately, there is no way of reliably observing when a value in
    // IndexedDB changes (yet, see https://github.com/WICG/indexed-db-observers),
    // so we need to poll.
    let entry = await updateAuthTokenRequest(installations.appConfig);
    while (entry.authToken.requestStatus === 1 /* IN_PROGRESS */) {
        // generateAuthToken still in progress.
        await sleep(100);
        entry = await updateAuthTokenRequest(installations.appConfig);
    }
    const authToken = entry.authToken;
    if (authToken.requestStatus === 0 /* NOT_STARTED */) {
        // The request timed out or failed in a different call. Try again.
        return refreshAuthToken(installations, forceRefresh);
    }
    else {
        return authToken;
    }
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
    return update(appConfig, oldEntry => {
        if (!isEntryRegistered(oldEntry)) {
            throw ERROR_FACTORY$1.create("not-registered" /* NOT_REGISTERED */);
        }
        const oldAuthToken = oldEntry.authToken;
        if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
            return Object.assign(Object.assign({}, oldEntry), { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
        }
        return oldEntry;
    });
}
async function fetchAuthTokenFromServer(installations, installationEntry) {
    try {
        const authToken = await generateAuthTokenRequest(installations, installationEntry);
        const updatedInstallationEntry = Object.assign(Object.assign({}, installationEntry), { authToken });
        await set(installations.appConfig, updatedInstallationEntry);
        return authToken;
    }
    catch (e) {
        if (isServerError(e) &&
            (e.customData.serverCode === 401 || e.customData.serverCode === 404)) {
            // Server returned a "FID not found" or a "Invalid authentication" error.
            // Generate a new ID next time.
            await remove(installations.appConfig);
        }
        else {
            const updatedInstallationEntry = Object.assign(Object.assign({}, installationEntry), { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
            await set(installations.appConfig, updatedInstallationEntry);
        }
        throw e;
    }
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
    const now = Date.now();
    return (now < authToken.creationTime ||
        authToken.creationTime + authToken.expiresIn < now + TOKEN_EXPIRATION_BUFFER);
}
/** Returns an updated InstallationEntry with an InProgressAuthToken. */
function makeAuthTokenRequestInProgressEntry(oldEntry) {
    const inProgressAuthToken = {
        requestStatus: 1 /* IN_PROGRESS */,
        requestTime: Date.now()
    };
    return Object.assign(Object.assign({}, oldEntry), { authToken: inProgressAuthToken });
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
 * @param installations - The `Installations` instance.
 *
 * @public
 */
async function getId(installations) {
    const installationsImpl = installations;
    const { installationEntry, registrationPromise } = await getInstallationEntry(installationsImpl.appConfig);
    if (registrationPromise) {
        registrationPromise.catch(console.error);
    }
    else {
        // If the installation is already registered, update the authentication
        // token if needed.
        refreshAuthToken(installationsImpl).catch(console.error);
    }
    return installationEntry.fid;
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
 * Returns a Firebase Installations auth token, identifying the current
 * Firebase Installation.
 * @param installations - The `Installations` instance.
 * @param forceRefresh - Force refresh regardless of token expiration.
 *
 * @public
 */
async function getToken(installations, forceRefresh = false) {
    const installationsImpl = installations;
    await completeInstallationRegistration(installationsImpl.appConfig);
    // At this point we either have a Registered Installation in the DB, or we've
    // already thrown an error.
    const authToken = await refreshAuthToken(installationsImpl, forceRefresh);
    return authToken.token;
}
async function completeInstallationRegistration(appConfig) {
    const { registrationPromise } = await getInstallationEntry(appConfig);
    if (registrationPromise) {
        // A createInstallation request is in progress. Wait until it finishes.
        await registrationPromise;
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
function extractAppConfig(app) {
    if (!app || !app.options) {
        throw getMissingValueError('App Configuration');
    }
    if (!app.name) {
        throw getMissingValueError('App Name');
    }
    // Required app config keys
    const configKeys = [
        'projectId',
        'apiKey',
        'appId'
    ];
    for (const keyName of configKeys) {
        if (!app.options[keyName]) {
            throw getMissingValueError(keyName);
        }
    }
    return {
        appName: app.name,
        projectId: app.options.projectId,
        apiKey: app.options.apiKey,
        appId: app.options.appId
    };
}
function getMissingValueError(valueName) {
    return ERROR_FACTORY$1.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */, {
        valueName
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
const INSTALLATIONS_NAME = 'installations';
const INSTALLATIONS_NAME_INTERNAL = 'installations-internal';
const publicFactory = (container) => {
    const app = container.getProvider('app').getImmediate();
    // Throws if app isn't configured properly.
    const appConfig = extractAppConfig(app);
    const platformLoggerProvider = _getProvider(app, 'platform-logger');
    const installationsImpl = {
        app,
        appConfig,
        platformLoggerProvider,
        _delete: () => Promise.resolve()
    };
    return installationsImpl;
};
const internalFactory = (container) => {
    const app = container.getProvider('app').getImmediate();
    // Internal FIS instance relies on public FIS instance.
    const installations = _getProvider(app, INSTALLATIONS_NAME).getImmediate();
    const installationsInternal = {
        getId: () => getId(installations),
        getToken: (forceRefresh) => getToken(installations, forceRefresh)
    };
    return installationsInternal;
};
function registerInstallations() {
    _registerComponent(new Component(INSTALLATIONS_NAME, publicFactory, "PUBLIC" /* PUBLIC */));
    _registerComponent(new Component(INSTALLATIONS_NAME_INTERNAL, internalFactory, "PRIVATE" /* PRIVATE */));
}

/**
 * Firebase Installations
 *
 * @packageDocumentation
 */
registerInstallations();
registerVersion(name$1, version$1);

const name = "@firebase/performance";
const version = "0.5.0";

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
const SDK_VERSION = version;
/** The prefix for start User Timing marks used for creating Traces. */
const TRACE_START_MARK_PREFIX = 'FB-PERF-TRACE-START';
/** The prefix for stop User Timing marks used for creating Traces. */
const TRACE_STOP_MARK_PREFIX = 'FB-PERF-TRACE-STOP';
/** The prefix for User Timing measure used for creating Traces. */
const TRACE_MEASURE_PREFIX = 'FB-PERF-TRACE-MEASURE';
/** The prefix for out of the box page load Trace name. */
const OOB_TRACE_PAGE_LOAD_PREFIX = '_wt_';
const FIRST_PAINT_COUNTER_NAME = '_fp';
const FIRST_CONTENTFUL_PAINT_COUNTER_NAME = '_fcp';
const FIRST_INPUT_DELAY_COUNTER_NAME = '_fid';
const CONFIG_LOCAL_STORAGE_KEY = '@firebase/performance/config';
const CONFIG_EXPIRY_LOCAL_STORAGE_KEY = '@firebase/performance/configexpire';
const SERVICE = 'performance';
const SERVICE_NAME = 'Performance';

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
const ERROR_DESCRIPTION_MAP = {
    ["trace started" /* TRACE_STARTED_BEFORE */]: 'Trace {$traceName} was started before.',
    ["trace stopped" /* TRACE_STOPPED_BEFORE */]: 'Trace {$traceName} is not running.',
    ["nonpositive trace startTime" /* NONPOSITIVE_TRACE_START_TIME */]: 'Trace {$traceName} startTime should be positive.',
    ["nonpositive trace duration" /* NONPOSITIVE_TRACE_DURATION */]: 'Trace {$traceName} duration should be positive.',
    ["no window" /* NO_WINDOW */]: 'Window is not available.',
    ["no app id" /* NO_APP_ID */]: 'App id is not available.',
    ["no project id" /* NO_PROJECT_ID */]: 'Project id is not available.',
    ["no api key" /* NO_API_KEY */]: 'Api key is not available.',
    ["invalid cc log" /* INVALID_CC_LOG */]: 'Attempted to queue invalid cc event',
    ["FB not default" /* FB_NOT_DEFAULT */]: 'Performance can only start when Firebase app instance is the default one.',
    ["RC response not ok" /* RC_NOT_OK */]: 'RC response is not ok',
    ["invalid attribute name" /* INVALID_ATTRIBUTE_NAME */]: 'Attribute name {$attributeName} is invalid.',
    ["invalid attribute value" /* INVALID_ATTRIBUTE_VALUE */]: 'Attribute value {$attributeValue} is invalid.',
    ["invalid custom metric name" /* INVALID_CUSTOM_METRIC_NAME */]: 'Custom metric name {$customMetricName} is invalid',
    ["invalid String merger input" /* INVALID_STRING_MERGER_PARAMETER */]: 'Input for String merger is invalid, contact support team to resolve.',
    ["already initialized" /* ALREADY_INITIALIZED */]: 'initializePerformance() has already been called with ' +
        'different options. To avoid this error, call initializePerformance() with the ' +
        'same options as when it was originally called, or call getPerformance() to return the' +
        ' already initialized instance.'
};
const ERROR_FACTORY = new ErrorFactory(SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);

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
const consoleLogger = new Logger(SERVICE_NAME);
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
let apiInstance;
let windowInstance;
/**
 * This class holds a reference to various browser related objects injected by
 * set methods.
 */
class Api {
    constructor(window) {
        this.window = window;
        if (!window) {
            throw ERROR_FACTORY.create("no window" /* NO_WINDOW */);
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
    getUrl() {
        // Do not capture the string query part of url.
        return this.windowLocation.href.split('?')[0];
    }
    mark(name) {
        if (!this.performance || !this.performance.mark) {
            return;
        }
        this.performance.mark(name);
    }
    measure(measureName, mark1, mark2) {
        if (!this.performance || !this.performance.measure) {
            return;
        }
        this.performance.measure(measureName, mark1, mark2);
    }
    getEntriesByType(type) {
        if (!this.performance || !this.performance.getEntriesByType) {
            return [];
        }
        return this.performance.getEntriesByType(type);
    }
    getEntriesByName(name) {
        if (!this.performance || !this.performance.getEntriesByName) {
            return [];
        }
        return this.performance.getEntriesByName(name);
    }
    getTimeOrigin() {
        // Polyfill the time origin with performance.timing.navigationStart.
        return (this.performance &&
            (this.performance.timeOrigin || this.performance.timing.navigationStart));
    }
    requiredApisAvailable() {
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
    }
    setupObserver(entryType, callback) {
        if (!this.PerformanceObserver) {
            return;
        }
        const observer = new this.PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
                // `entry` is a PerformanceEntry instance.
                callback(entry);
            }
        });
        // Start observing the entry types you care about.
        observer.observe({ entryTypes: [entryType] });
    }
    static getInstance() {
        if (apiInstance === undefined) {
            apiInstance = new Api(windowInstance);
        }
        return apiInstance;
    }
}
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
let iid;
function getIidPromise(installationsService) {
    const iidPromise = installationsService.getId();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    iidPromise.then((iidVal) => {
        iid = iidVal;
    });
    return iidPromise;
}
// This method should be used after the iid is retrieved by getIidPromise method.
function getIid() {
    return iid;
}
function getAuthTokenPromise(installationsService) {
    const authTokenPromise = installationsService.getToken();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    authTokenPromise.then((authTokenVal) => {
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
    const sizeDiff = part1.length - part2.length;
    if (sizeDiff < 0 || sizeDiff > 1) {
        throw ERROR_FACTORY.create("invalid String merger input" /* INVALID_STRING_MERGER_PARAMETER */);
    }
    const resultArray = [];
    for (let i = 0; i < part1.length; i++) {
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
let settingsServiceInstance;
class SettingsService {
    constructor() {
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
    getFlTransportFullUrl() {
        return this.flTransportEndpointUrl.concat('?key=', this.transportKey);
    }
    static getInstance() {
        if (settingsServiceInstance === undefined) {
            settingsServiceInstance = new SettingsService();
        }
        return settingsServiceInstance;
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
var VisibilityState;
(function (VisibilityState) {
    VisibilityState[VisibilityState["UNKNOWN"] = 0] = "UNKNOWN";
    VisibilityState[VisibilityState["VISIBLE"] = 1] = "VISIBLE";
    VisibilityState[VisibilityState["HIDDEN"] = 2] = "HIDDEN";
})(VisibilityState || (VisibilityState = {}));
const RESERVED_ATTRIBUTE_PREFIXES = ['firebase_', 'google_', 'ga_'];
const ATTRIBUTE_FORMAT_REGEX = new RegExp('^[a-zA-Z]\\w*$');
const MAX_ATTRIBUTE_NAME_LENGTH = 40;
const MAX_ATTRIBUTE_VALUE_LENGTH = 100;
function getServiceWorkerStatus() {
    const navigator = Api.getInstance().navigator;
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
    const document = Api.getInstance().document;
    const visibilityState = document.visibilityState;
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
    const navigator = Api.getInstance().navigator;
    const navigatorConnection = navigator.connection;
    const effectiveType = navigatorConnection && navigatorConnection.effectiveType;
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
    const matchesReservedPrefix = RESERVED_ATTRIBUTE_PREFIXES.some(prefix => name.startsWith(prefix));
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
    const appId = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.appId;
    if (!appId) {
        throw ERROR_FACTORY.create("no app id" /* NO_APP_ID */);
    }
    return appId;
}
function getProjectId(firebaseApp) {
    var _a;
    const projectId = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.projectId;
    if (!projectId) {
        throw ERROR_FACTORY.create("no project id" /* NO_PROJECT_ID */);
    }
    return projectId;
}
function getApiKey(firebaseApp) {
    var _a;
    const apiKey = (_a = firebaseApp.options) === null || _a === void 0 ? void 0 : _a.apiKey;
    if (!apiKey) {
        throw ERROR_FACTORY.create("no api key" /* NO_API_KEY */);
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
const REMOTE_CONFIG_SDK_VERSION = '0.0.1';
// These values will be used if the remote config object is successfully
// retrieved, but the template does not have these fields.
const DEFAULT_CONFIGS = {
    loggingEnabled: true
};
const FIS_AUTH_PREFIX = 'FIREBASE_INSTALLATIONS_AUTH';
function getConfig(performanceController, iid) {
    const config = getStoredConfig();
    if (config) {
        processConfig(config);
        return Promise.resolve();
    }
    return getRemoteConfig(performanceController, iid)
        .then(processConfig)
        .then(config => storeConfig(config), 
    /** Do nothing for error, use defaults set in settings service. */
    () => { });
}
function getStoredConfig() {
    const localStorage = Api.getInstance().localStorage;
    if (!localStorage) {
        return;
    }
    const expiryString = localStorage.getItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY);
    if (!expiryString || !configValid(expiryString)) {
        return;
    }
    const configStringified = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY);
    if (!configStringified) {
        return;
    }
    try {
        const configResponse = JSON.parse(configStringified);
        return configResponse;
    }
    catch (_a) {
        return;
    }
}
function storeConfig(config) {
    const localStorage = Api.getInstance().localStorage;
    if (!config || !localStorage) {
        return;
    }
    localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(config));
    localStorage.setItem(CONFIG_EXPIRY_LOCAL_STORAGE_KEY, String(Date.now() +
        SettingsService.getInstance().configTimeToLive * 60 * 60 * 1000));
}
const COULD_NOT_GET_CONFIG_MSG = 'Could not fetch config, will use default configs';
function getRemoteConfig(performanceController, iid) {
    // Perf needs auth token only to retrieve remote config.
    return getAuthTokenPromise(performanceController.installations)
        .then(authToken => {
        const projectId = getProjectId(performanceController.app);
        const apiKey = getApiKey(performanceController.app);
        const configEndPoint = `https://firebaseremoteconfig.googleapis.com/v1/projects/${projectId}/namespaces/fireperf:fetch?key=${apiKey}`;
        const request = new Request(configEndPoint, {
            method: 'POST',
            headers: { Authorization: `${FIS_AUTH_PREFIX} ${authToken}` },
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
        return fetch(request).then(response => {
            if (response.ok) {
                return response.json();
            }
            // In case response is not ok. This will be caught by catch.
            throw ERROR_FACTORY.create("RC response not ok" /* RC_NOT_OK */);
        });
    })
        .catch(() => {
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
    const settingsServiceInstance = SettingsService.getInstance();
    const entries = config.entries || {};
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
let initializationStatus = 1 /* notInitialized */;
let initializationPromise;
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
        .then(() => getIidPromise(performanceController.installations))
        .then(iid => getConfig(performanceController, iid))
        .then(() => changeInitializationStatus(), () => changeInitializationStatus());
}
/**
 * Returns a promise which resolves whenever the document readystate is complete or
 * immediately if it is called after page load complete.
 */
function getDocumentReadyComplete() {
    const document = Api.getInstance().document;
    return new Promise(resolve => {
        if (document && document.readyState !== 'complete') {
            const handler = () => {
                if (document.readyState === 'complete') {
                    document.removeEventListener('readystatechange', handler);
                    resolve();
                }
            };
            document.addEventListener('readystatechange', handler);
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
const DEFAULT_SEND_INTERVAL_MS = 10 * 1000;
const INITIAL_SEND_TIME_DELAY_MS = 5.5 * 1000;
// If end point does not work, the call will be tried for these many times.
const DEFAULT_REMAINING_TRIES = 3;
const MAX_EVENT_COUNT_PER_REQUEST = 1000;
let remainingTries = DEFAULT_REMAINING_TRIES;
/* eslint-enable camelcase */
let queue = [];
let isTransportSetup = false;
function setupTransportService() {
    if (!isTransportSetup) {
        processQueue(INITIAL_SEND_TIME_DELAY_MS);
        isTransportSetup = true;
    }
}
function processQueue(timeOffset) {
    setTimeout(() => {
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
    const staged = queue.splice(0, MAX_EVENT_COUNT_PER_REQUEST);
    /* eslint-disable camelcase */
    // We will pass the JSON serialized event to the backend.
    const log_event = staged.map(evt => ({
        source_extension_json_proto3: evt.message,
        event_time_ms: String(evt.eventTime)
    }));
    const data = {
        request_time_ms: String(Date.now()),
        client_info: {
            client_type: 1,
            js_client_info: {}
        },
        log_source: SettingsService.getInstance().logSource,
        log_event
    };
    /* eslint-enable camelcase */
    sendEventsToFl(data, staged).catch(() => {
        // If the request fails for some reason, add the events that were attempted
        // back to the primary queue to retry later.
        queue = [...staged, ...queue];
        remainingTries--;
        consoleLogger.info(`Tries left: ${remainingTries}.`);
        processQueue(DEFAULT_SEND_INTERVAL_MS);
    });
}
function sendEventsToFl(data, staged) {
    return postToFlEndpoint(data)
        .then(res => {
        if (!res.ok) {
            consoleLogger.info('Call to Firebase backend failed.');
        }
        return res.json();
    })
        .then(res => {
        // Find the next call wait time from the response.
        const transportWait = Number(res.nextRequestWaitMillis);
        let requestOffset = DEFAULT_SEND_INTERVAL_MS;
        if (!isNaN(transportWait)) {
            requestOffset = Math.max(transportWait, requestOffset);
        }
        // Delete request if response include RESPONSE_ACTION_UNKNOWN or DELETE_REQUEST action.
        // Otherwise, retry request using normal scheduling if response include RETRY_REQUEST_LATER.
        const logResponseDetails = res.logResponseDetails;
        if (Array.isArray(logResponseDetails) &&
            logResponseDetails.length > 0 &&
            logResponseDetails[0].responseAction === 'RETRY_REQUEST_LATER') {
            queue = [...staged, ...queue];
            consoleLogger.info(`Retry transport request later.`);
        }
        remainingTries = DEFAULT_REMAINING_TRIES;
        // Schedule the next process.
        processQueue(requestOffset);
    });
}
function postToFlEndpoint(data) {
    const flTransportFullUrl = SettingsService.getInstance().getFlTransportFullUrl();
    return fetch(flTransportFullUrl, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}
function addToQueue(evt) {
    if (!evt.eventTime || !evt.message) {
        throw ERROR_FACTORY.create("invalid cc log" /* INVALID_CC_LOG */);
    }
    // Add the new event to the queue.
    queue = [...queue, evt];
}
/** Log handler for cc service to send the performance logs to the server. */
function transportHandler(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
serializer) {
    return (...args) => {
        const message = serializer(...args);
        addToQueue({
            message,
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
let logger;
// This method is not called before initialization.
function sendLog(resource, resourceType) {
    if (!logger) {
        logger = transportHandler(serializer);
    }
    logger(resource, resourceType);
}
function logTrace(trace) {
    const settingsService = SettingsService.getInstance();
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
        getInitializationPromise(trace.performanceController).then(() => sendTraceLog(trace), () => sendTraceLog(trace));
    }
}
function sendTraceLog(trace) {
    if (!getIid()) {
        return;
    }
    const settingsService = SettingsService.getInstance();
    if (!settingsService.loggingEnabled ||
        !settingsService.logTraceAfterSampling) {
        return;
    }
    setTimeout(() => sendLog(trace, 1 /* Trace */), 0);
}
function logNetworkRequest(networkRequest) {
    const settingsService = SettingsService.getInstance();
    // Do not log network requests if instrumentation is disabled.
    if (!settingsService.instrumentationEnabled) {
        return;
    }
    // Do not log the js sdk's call to transport service domain to avoid unnecessary cycle.
    // Need to blacklist both old and new endpoints to avoid migration gap.
    const networkRequestUrl = networkRequest.url;
    // Blacklist old log endpoint and new transport endpoint.
    // Because Performance SDK doesn't instrument requests sent from SDK itself.
    const logEndpointUrl = settingsService.logEndPointUrl.split('?')[0];
    const flEndpointUrl = settingsService.flTransportEndpointUrl.split('?')[0];
    if (networkRequestUrl === logEndpointUrl ||
        networkRequestUrl === flEndpointUrl) {
        return;
    }
    if (!settingsService.loggingEnabled ||
        !settingsService.logNetworkAfterSampling) {
        return;
    }
    setTimeout(() => sendLog(networkRequest, 0 /* NetworkRequest */), 0);
}
function serializer(resource, resourceType) {
    if (resourceType === 0 /* NetworkRequest */) {
        return serializeNetworkRequest(resource);
    }
    return serializeTrace(resource);
}
function serializeNetworkRequest(networkRequest) {
    const networkRequestMetric = {
        url: networkRequest.url,
        http_method: networkRequest.httpMethod || 0,
        http_response_code: 200,
        response_payload_bytes: networkRequest.responsePayloadBytes,
        client_start_time_us: networkRequest.startTimeUs,
        time_to_response_initiated_us: networkRequest.timeToResponseInitiatedUs,
        time_to_response_completed_us: networkRequest.timeToResponseCompletedUs
    };
    const perfMetric = {
        application_info: getApplicationInfo(networkRequest.performanceController.app),
        network_request_metric: networkRequestMetric
    };
    return JSON.stringify(perfMetric);
}
function serializeTrace(trace) {
    const traceMetric = {
        name: trace.name,
        is_auto: trace.isAuto,
        client_start_time_us: trace.startTimeUs,
        duration_us: trace.durationUs
    };
    if (Object.keys(trace.counters).length !== 0) {
        traceMetric.counters = trace.counters;
    }
    const customAttributes = trace.getAttributes();
    if (Object.keys(customAttributes).length !== 0) {
        traceMetric.custom_attributes = customAttributes;
    }
    const perfMetric = {
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
const MAX_METRIC_NAME_LENGTH = 100;
const RESERVED_AUTO_PREFIX = '_';
const oobMetrics = [
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
    const valueAsInteger = Math.floor(providedValue);
    if (valueAsInteger < providedValue) {
        consoleLogger.info(`Metric value should be an Integer, setting the value as : ${valueAsInteger}.`);
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
class Trace {
    /**
     * @param performanceController The performance controller running.
     * @param name The name of the trace.
     * @param isAuto If the trace is auto-instrumented.
     * @param traceMeasureName The name of the measure marker in user timing specification. This field
     * is only set when the trace is built for logging when the user directly uses the user timing
     * api (performance.mark and performance.measure).
     */
    constructor(performanceController, name, isAuto = false, traceMeasureName) {
        this.performanceController = performanceController;
        this.name = name;
        this.isAuto = isAuto;
        this.state = 1 /* UNINITIALIZED */;
        this.customAttributes = {};
        this.counters = {};
        this.api = Api.getInstance();
        this.randomId = Math.floor(Math.random() * 1000000);
        if (!this.isAuto) {
            this.traceStartMark = `${TRACE_START_MARK_PREFIX}-${this.randomId}-${this.name}`;
            this.traceStopMark = `${TRACE_STOP_MARK_PREFIX}-${this.randomId}-${this.name}`;
            this.traceMeasure =
                traceMeasureName ||
                    `${TRACE_MEASURE_PREFIX}-${this.randomId}-${this.name}`;
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
    start() {
        if (this.state !== 1 /* UNINITIALIZED */) {
            throw ERROR_FACTORY.create("trace started" /* TRACE_STARTED_BEFORE */, {
                traceName: this.name
            });
        }
        this.api.mark(this.traceStartMark);
        this.state = 2 /* RUNNING */;
    }
    /**
     * Stops the trace. The measurement of the duration of the trace stops at this point and trace
     * is logged.
     */
    stop() {
        if (this.state !== 2 /* RUNNING */) {
            throw ERROR_FACTORY.create("trace stopped" /* TRACE_STOPPED_BEFORE */, {
                traceName: this.name
            });
        }
        this.state = 3 /* TERMINATED */;
        this.api.mark(this.traceStopMark);
        this.api.measure(this.traceMeasure, this.traceStartMark, this.traceStopMark);
        this.calculateTraceMetrics();
        logTrace(this);
    }
    /**
     * Records a trace with predetermined values. If this method is used a trace is created and logged
     * directly. No need to use start and stop methods.
     * @param startTime Trace start time since epoch in millisec
     * @param duration The duraction of the trace in millisec
     * @param options An object which can optionally hold maps of custom metrics and custom attributes
     */
    record(startTime, duration, options) {
        if (startTime <= 0) {
            throw ERROR_FACTORY.create("nonpositive trace startTime" /* NONPOSITIVE_TRACE_START_TIME */, {
                traceName: this.name
            });
        }
        if (duration <= 0) {
            throw ERROR_FACTORY.create("nonpositive trace duration" /* NONPOSITIVE_TRACE_DURATION */, {
                traceName: this.name
            });
        }
        this.durationUs = Math.floor(duration * 1000);
        this.startTimeUs = Math.floor(startTime * 1000);
        if (options && options.attributes) {
            this.customAttributes = Object.assign({}, options.attributes);
        }
        if (options && options.metrics) {
            for (const metric of Object.keys(options.metrics)) {
                if (!isNaN(Number(options.metrics[metric]))) {
                    this.counters[metric] = Number(Math.floor(options.metrics[metric]));
                }
            }
        }
        logTrace(this);
    }
    /**
     * Increments a custom metric by a certain number or 1 if number not specified. Will create a new
     * custom metric if one with the given name does not exist. The value will be floored down to an
     * integer.
     * @param counter Name of the custom metric
     * @param numAsInteger Increment by value
     */
    incrementMetric(counter, numAsInteger = 1) {
        if (this.counters[counter] === undefined) {
            this.putMetric(counter, numAsInteger);
        }
        else {
            this.putMetric(counter, this.counters[counter] + numAsInteger);
        }
    }
    /**
     * Sets a custom metric to a specified value. Will create a new custom metric if one with the
     * given name does not exist. The value will be floored down to an integer.
     * @param counter Name of the custom metric
     * @param numAsInteger Set custom metric to this value
     */
    putMetric(counter, numAsInteger) {
        if (isValidMetricName(counter, this.name)) {
            this.counters[counter] = convertMetricValueToInteger(numAsInteger);
        }
        else {
            throw ERROR_FACTORY.create("invalid custom metric name" /* INVALID_CUSTOM_METRIC_NAME */, {
                customMetricName: counter
            });
        }
    }
    /**
     * Returns the value of the custom metric by that name. If a custom metric with that name does
     * not exist will return zero.
     * @param counter
     */
    getMetric(counter) {
        return this.counters[counter] || 0;
    }
    /**
     * Sets a custom attribute of a trace to a certain value.
     * @param attr
     * @param value
     */
    putAttribute(attr, value) {
        const isValidName = isValidCustomAttributeName(attr);
        const isValidValue = isValidCustomAttributeValue(value);
        if (isValidName && isValidValue) {
            this.customAttributes[attr] = value;
            return;
        }
        // Throw appropriate error when the attribute name or value is invalid.
        if (!isValidName) {
            throw ERROR_FACTORY.create("invalid attribute name" /* INVALID_ATTRIBUTE_NAME */, {
                attributeName: attr
            });
        }
        if (!isValidValue) {
            throw ERROR_FACTORY.create("invalid attribute value" /* INVALID_ATTRIBUTE_VALUE */, {
                attributeValue: value
            });
        }
    }
    /**
     * Retrieves the value a custom attribute of a trace is set to.
     * @param attr
     */
    getAttribute(attr) {
        return this.customAttributes[attr];
    }
    removeAttribute(attr) {
        if (this.customAttributes[attr] === undefined) {
            return;
        }
        delete this.customAttributes[attr];
    }
    getAttributes() {
        return Object.assign({}, this.customAttributes);
    }
    setStartTime(startTime) {
        this.startTimeUs = startTime;
    }
    setDuration(duration) {
        this.durationUs = duration;
    }
    /**
     * Calculates and assigns the duration and start time of the trace using the measure performance
     * entry.
     */
    calculateTraceMetrics() {
        const perfMeasureEntries = this.api.getEntriesByName(this.traceMeasure);
        const perfMeasureEntry = perfMeasureEntries && perfMeasureEntries[0];
        if (perfMeasureEntry) {
            this.durationUs = Math.floor(perfMeasureEntry.duration * 1000);
            this.startTimeUs = Math.floor((perfMeasureEntry.startTime + this.api.getTimeOrigin()) * 1000);
        }
    }
    /**
     * @param navigationTimings A single element array which contains the navigationTIming object of
     * the page load
     * @param paintTimings A array which contains paintTiming object of the page load
     * @param firstInputDelay First input delay in millisec
     */
    static createOobTrace(performanceController, navigationTimings, paintTimings, firstInputDelay) {
        const route = Api.getInstance().getUrl();
        if (!route) {
            return;
        }
        const trace = new Trace(performanceController, OOB_TRACE_PAGE_LOAD_PREFIX + route, true);
        const timeOriginUs = Math.floor(Api.getInstance().getTimeOrigin() * 1000);
        trace.setStartTime(timeOriginUs);
        // navigationTimings includes only one element.
        if (navigationTimings && navigationTimings[0]) {
            trace.setDuration(Math.floor(navigationTimings[0].duration * 1000));
            trace.putMetric('domInteractive', Math.floor(navigationTimings[0].domInteractive * 1000));
            trace.putMetric('domContentLoadedEventEnd', Math.floor(navigationTimings[0].domContentLoadedEventEnd * 1000));
            trace.putMetric('loadEventEnd', Math.floor(navigationTimings[0].loadEventEnd * 1000));
        }
        const FIRST_PAINT = 'first-paint';
        const FIRST_CONTENTFUL_PAINT = 'first-contentful-paint';
        if (paintTimings) {
            const firstPaint = paintTimings.find(paintObject => paintObject.name === FIRST_PAINT);
            if (firstPaint && firstPaint.startTime) {
                trace.putMetric(FIRST_PAINT_COUNTER_NAME, Math.floor(firstPaint.startTime * 1000));
            }
            const firstContentfulPaint = paintTimings.find(paintObject => paintObject.name === FIRST_CONTENTFUL_PAINT);
            if (firstContentfulPaint && firstContentfulPaint.startTime) {
                trace.putMetric(FIRST_CONTENTFUL_PAINT_COUNTER_NAME, Math.floor(firstContentfulPaint.startTime * 1000));
            }
            if (firstInputDelay) {
                trace.putMetric(FIRST_INPUT_DELAY_COUNTER_NAME, Math.floor(firstInputDelay * 1000));
            }
        }
        logTrace(trace);
    }
    static createUserTimingTrace(performanceController, measureName) {
        const trace = new Trace(performanceController, measureName, false, measureName);
        logTrace(trace);
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
function createNetworkRequestEntry(performanceController, entry) {
    const performanceEntry = entry;
    if (!performanceEntry || performanceEntry.responseStart === undefined) {
        return;
    }
    const timeOrigin = Api.getInstance().getTimeOrigin();
    const startTimeUs = Math.floor((performanceEntry.startTime + timeOrigin) * 1000);
    const timeToResponseInitiatedUs = performanceEntry.responseStart
        ? Math.floor((performanceEntry.responseStart - performanceEntry.startTime) * 1000)
        : undefined;
    const timeToResponseCompletedUs = Math.floor((performanceEntry.responseEnd - performanceEntry.startTime) * 1000);
    // Remove the query params from logged network request url.
    const url = performanceEntry.name && performanceEntry.name.split('?')[0];
    const networkRequest = {
        performanceController,
        url,
        responsePayloadBytes: performanceEntry.transferSize,
        startTimeUs,
        timeToResponseInitiatedUs,
        timeToResponseCompletedUs
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
const FID_WAIT_TIME_MS = 5000;
function setupOobResources(performanceController) {
    // Do not initialize unless iid is available.
    if (!getIid()) {
        return;
    }
    // The load event might not have fired yet, and that means performance navigation timing
    // object has a duration of 0. The setup should run after all current tasks in js queue.
    setTimeout(() => setupOobTraces(performanceController), 0);
    setTimeout(() => setupNetworkRequests(performanceController), 0);
    setTimeout(() => setupUserTimingTraces(performanceController), 0);
}
function setupNetworkRequests(performanceController) {
    const api = Api.getInstance();
    const resources = api.getEntriesByType('resource');
    for (const resource of resources) {
        createNetworkRequestEntry(performanceController, resource);
    }
    api.setupObserver('resource', entry => createNetworkRequestEntry(performanceController, entry));
}
function setupOobTraces(performanceController) {
    const api = Api.getInstance();
    const navigationTimings = api.getEntriesByType('navigation');
    const paintTimings = api.getEntriesByType('paint');
    // If First Input Desly polyfill is added to the page, report the fid value.
    // https://github.com/GoogleChromeLabs/first-input-delay
    if (api.onFirstInputDelay) {
        // If the fid call back is not called for certain time, continue without it.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let timeoutId = setTimeout(() => {
            Trace.createOobTrace(performanceController, navigationTimings, paintTimings);
            timeoutId = undefined;
        }, FID_WAIT_TIME_MS);
        api.onFirstInputDelay((fid) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                Trace.createOobTrace(performanceController, navigationTimings, paintTimings, fid);
            }
        });
    }
    else {
        Trace.createOobTrace(performanceController, navigationTimings, paintTimings);
    }
}
function setupUserTimingTraces(performanceController) {
    const api = Api.getInstance();
    // Run through the measure performance entries collected up to this point.
    const measures = api.getEntriesByType('measure');
    for (const measure of measures) {
        createUserTimingTrace(performanceController, measure);
    }
    // Setup an observer to capture the measures from this point on.
    api.setupObserver('measure', entry => createUserTimingTrace(performanceController, entry));
}
function createUserTimingTrace(performanceController, measure) {
    const measureName = measure.name;
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
class PerformanceController {
    constructor(app, installations) {
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
    _init(settings) {
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
                .then(isAvailable => {
                if (isAvailable) {
                    setupTransportService();
                    getInitializationPromise(this).then(() => setupOobResources(this), () => setupOobResources(this));
                    this.initialized = true;
                }
            })
                .catch(error => {
                consoleLogger.info(`Environment doesn't support IndexedDB: ${error}`);
            });
        }
        else {
            consoleLogger.info('Firebase Performance cannot start if the browser does not support ' +
                '"Fetch" and "Promise", or cookies are disabled.');
        }
    }
    set instrumentationEnabled(val) {
        SettingsService.getInstance().instrumentationEnabled = val;
    }
    get instrumentationEnabled() {
        return SettingsService.getInstance().instrumentationEnabled;
    }
    set dataCollectionEnabled(val) {
        SettingsService.getInstance().dataCollectionEnabled = val;
    }
    get dataCollectionEnabled() {
        return SettingsService.getInstance().dataCollectionEnabled;
    }
}

/**
 * Firebase Performance Monitoring
 *
 * @packageDocumentation
 */
const DEFAULT_ENTRY_NAME = '[DEFAULT]';
/**
 * Returns a {@link FirebasePerformance} instance for the given app.
 * @param app - The {@link https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js#FirebaseApp} to use.
 * @public
 */
function getPerformance(app = getApp()) {
    app = getModularInstance(app);
    const provider = _getProvider(app, 'performance');
    const perfInstance = provider.getImmediate();
    return perfInstance;
}
/**
 * Returns a {@link FirebasePerformance} instance for the given app. Can only be called once.
 * @param app - The {@link https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js#FirebaseApp} to use.
 * @param settings - Optional settings for the {@link FirebasePerformance} instance.
 * @public
 */
function initializePerformance(app, settings) {
    app = getModularInstance(app);
    const provider = _getProvider(app, 'performance');
    // throw if an instance was already created.
    // It could happen if initializePerformance() is called more than once, or getPerformance() is called first.
    if (provider.isInitialized()) {
        const existingInstance = provider.getImmediate();
        const initialSettings = provider.getOptions();
        if (deepEqual(initialSettings, settings !== null && settings !== void 0 ? settings : {})) {
            return existingInstance;
        }
        else {
            throw ERROR_FACTORY.create("already initialized" /* ALREADY_INITIALIZED */);
        }
    }
    const perfInstance = provider.initialize({
        options: settings
    });
    return perfInstance;
}
/**
 * Returns a new `PerformanceTrace` instance.
 * @param performance - The {@link FirebasePerformance} instance to use.
 * @param name - The name of the trace.
 * @public
 */
function trace(performance, name) {
    performance = getModularInstance(performance);
    return new Trace(performance, name);
}
const factory = (container, { options: settings }) => {
    // Dependencies
    const app = container.getProvider('app').getImmediate();
    const installations = container
        .getProvider('installations-internal')
        .getImmediate();
    if (app.name !== DEFAULT_ENTRY_NAME) {
        throw ERROR_FACTORY.create("FB not default" /* FB_NOT_DEFAULT */);
    }
    if (typeof window === 'undefined') {
        throw ERROR_FACTORY.create("no window" /* NO_WINDOW */);
    }
    setupApi(window);
    const perfInstance = new PerformanceController(app, installations);
    perfInstance._init(settings);
    return perfInstance;
};
function registerPerformance() {
    _registerComponent(new Component('performance', factory, "PUBLIC" /* PUBLIC */));
}
registerPerformance();
registerVersion(name, version);

export { getPerformance, initializePerformance, trace };

//# sourceMappingURL=firebase-performance.js.map
