(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase.messaging = global.firebase.messaging || {}), global.firebase.app));
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

    function deleteDb(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
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
    var _a;
    var ERROR_DESCRIPTION_MAP = (_a = {},
        _a["missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */] = 'Missing App configuration value: "{$valueName}"',
        _a["not-registered" /* NOT_REGISTERED */] = 'Firebase Installation is not registered.',
        _a["installation-not-found" /* INSTALLATION_NOT_FOUND */] = 'Firebase Installation not found.',
        _a["request-failed" /* REQUEST_FAILED */] = '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
        _a["app-offline" /* APP_OFFLINE */] = 'Could not process request. Application offline.',
        _a["delete-pending-registration" /* DELETE_PENDING_REGISTRATION */] = "Can't delete installation while there is a pending registration request.",
        _a);
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
    var _a$1;
    var ERROR_MAP = (_a$1 = {},
        _a$1["missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */] = 'Missing App configuration value: "{$valueName}"',
        _a$1["only-available-in-window" /* AVAILABLE_IN_WINDOW */] = 'This method is available in a Window context.',
        _a$1["only-available-in-sw" /* AVAILABLE_IN_SW */] = 'This method is available in a service worker context.',
        _a$1["permission-default" /* PERMISSION_DEFAULT */] = 'The notification permission was not granted and dismissed instead.',
        _a$1["permission-blocked" /* PERMISSION_BLOCKED */] = 'The notification permission was not granted and blocked instead.',
        _a$1["unsupported-browser" /* UNSUPPORTED_BROWSER */] = "This browser doesn't support the API's required to use the firebase SDK.",
        _a$1["failed-service-worker-registration" /* FAILED_DEFAULT_REGISTRATION */] = 'We are unable to register the default service worker. {$browserErrorMessage}',
        _a$1["token-subscribe-failed" /* TOKEN_SUBSCRIBE_FAILED */] = 'A problem occurred while subscribing the user to FCM: {$errorInfo}',
        _a$1["token-subscribe-no-token" /* TOKEN_SUBSCRIBE_NO_TOKEN */] = 'FCM returned no token when subscribing the user to push.',
        _a$1["token-unsubscribe-failed" /* TOKEN_UNSUBSCRIBE_FAILED */] = 'A problem occurred while unsubscribing the ' +
            'user from FCM: {$errorInfo}',
        _a$1["token-update-failed" /* TOKEN_UPDATE_FAILED */] = 'A problem occurred while updating the user from FCM: {$errorInfo}',
        _a$1["token-update-no-token" /* TOKEN_UPDATE_NO_TOKEN */] = 'FCM returned no token when updating the user to push.',
        _a$1["use-sw-after-get-token" /* USE_SW_AFTER_GET_TOKEN */] = 'The useServiceWorker() method may only be called once and must be ' +
            'called before calling getToken() to ensure your service worker is used.',
        _a$1["invalid-sw-registration" /* INVALID_SW_REGISTRATION */] = 'The input to useServiceWorker() must be a ServiceWorkerRegistration.',
        _a$1["invalid-bg-handler" /* INVALID_BG_HANDLER */] = 'The input to setBackgroundMessageHandler() must be a function.',
        _a$1["invalid-vapid-key" /* INVALID_VAPID_KEY */] = 'The public VAPID key must be a string.',
        _a$1["use-vapid-key-after-get-token" /* USE_VAPID_KEY_AFTER_GET_TOKEN */] = 'The usePublicVapidKey() method may only be called once and must be ' +
            'called before calling getToken() to ensure your VAPID key is used.',
        _a$1);
    var ERROR_FACTORY$1 = new ErrorFactory('messaging', 'Messaging', ERROR_MAP);

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
    function extractAppConfig$1(app) {
        var e_1, _a;
        if (!app || !app.options) {
            throw getMissingValueError$1('App Configuration Object');
        }
        if (!app.name) {
            throw getMissingValueError$1('App Name');
        }
        // Required app config keys
        var configKeys = [
            'projectId',
            'apiKey',
            'appId',
            'messagingSenderId'
        ];
        var options = app.options;
        try {
            for (var configKeys_1 = __values(configKeys), configKeys_1_1 = configKeys_1.next(); !configKeys_1_1.done; configKeys_1_1 = configKeys_1.next()) {
                var keyName = configKeys_1_1.value;
                if (!options[keyName]) {
                    throw getMissingValueError$1(keyName);
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
            projectId: options.projectId,
            apiKey: options.apiKey,
            appId: options.appId,
            senderId: options.messagingSenderId
        };
    }
    function getMissingValueError$1(valueName) {
        return ERROR_FACTORY$1.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */, {
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
    var MessagingService = /** @class */ (function () {
        function MessagingService(app, installations, analyticsProvider) {
            this.onBackgroundMessageHandler = null;
            this.onMessageHandler = null;
            var appConfig = extractAppConfig$1(app);
            this.firebaseDependencies = {
                app: app,
                appConfig: appConfig,
                installations: installations,
                analyticsProvider: analyticsProvider
            };
        }
        MessagingService.prototype._delete = function () {
            return this.deleteService();
        };
        return MessagingService;
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
    function isSupported() {
        if (self && 'ServiceWorkerGlobalScope' in self) {
            // Running in ServiceWorker context
            return isSWControllerSupported();
        }
        else {
            // Assume we are in the window context.
            return isWindowControllerSupported();
        }
    }
    /**
     * Checks to see if the required APIs exist.
     */
    function isWindowControllerSupported() {
        return ('indexedDB' in window &&
            indexedDB !== null &&
            navigator.cookieEnabled &&
            'serviceWorker' in navigator &&
            'PushManager' in window &&
            'Notification' in window &&
            'fetch' in window &&
            ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') &&
            PushSubscription.prototype.hasOwnProperty('getKey'));
    }
    /**
     * Checks to see if the required APIs exist within SW Context.
     */
    function isSWControllerSupported() {
        return ('indexedDB' in self &&
            indexedDB !== null &&
            'PushManager' in self &&
            'Notification' in self &&
            ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') &&
            PushSubscription.prototype.hasOwnProperty('getKey'));
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
    var messagingFactory = function (container) {
        if (!isSupported()) {
            throw ERROR_FACTORY$1.create("unsupported-browser" /* UNSUPPORTED_BROWSER */);
        }
        return new MessagingService(container.getProvider('app-exp').getImmediate(), container.getProvider('installations-exp-internal').getImmediate(), container.getProvider('analytics-internal'));
    };
    function registerMessaging() {
        app._registerComponent(new Component('messaging-exp', messagingFactory, "PUBLIC" /* PUBLIC */));
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
    function arrayToBase64(array) {
        var uint8Array = new Uint8Array(array);
        var base64String = btoa(String.fromCharCode.apply(String, __spread(uint8Array)));
        return base64String.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    }
    function base64ToArray(base64String) {
        var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
        var rawData = atob(base64);
        var outputArray = new Uint8Array(rawData.length);
        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
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
    var OLD_DB_NAME = 'fcm_token_details_db';
    /**
     * The last DB version of 'fcm_token_details_db' was 4. This is one higher, so that the upgrade
     * callback is called for all versions of the old DB.
     */
    var OLD_DB_VERSION = 5;
    var OLD_OBJECT_STORE_NAME = 'fcm_token_object_Store';
    function migrateOldDatabase(senderId) {
        return __awaiter(this, void 0, void 0, function () {
            var databases, dbNames, tokenDetails, db;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!('databases' in indexedDB)) return [3 /*break*/, 2];
                        return [4 /*yield*/, indexedDB.databases()];
                    case 1:
                        databases = _a.sent();
                        dbNames = databases.map(function (db) { return db.name; });
                        if (!dbNames.includes(OLD_DB_NAME)) {
                            // old DB didn't exist, no need to open.
                            return [2 /*return*/, null];
                        }
                        _a.label = 2;
                    case 2:
                        tokenDetails = null;
                        return [4 /*yield*/, openDb(OLD_DB_NAME, OLD_DB_VERSION, function (db) { return __awaiter(_this, void 0, void 0, function () {
                                var objectStore, value, oldDetails, oldDetails, oldDetails;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (db.oldVersion < 2) {
                                                // Database too old, skip migration.
                                                return [2 /*return*/];
                                            }
                                            if (!db.objectStoreNames.contains(OLD_OBJECT_STORE_NAME)) {
                                                // Database did not exist. Nothing to do.
                                                return [2 /*return*/];
                                            }
                                            objectStore = db.transaction.objectStore(OLD_OBJECT_STORE_NAME);
                                            return [4 /*yield*/, objectStore.index('fcmSenderId').get(senderId)];
                                        case 1:
                                            value = _b.sent();
                                            return [4 /*yield*/, objectStore.clear()];
                                        case 2:
                                            _b.sent();
                                            if (!value) {
                                                // No entry in the database, nothing to migrate.
                                                return [2 /*return*/];
                                            }
                                            if (db.oldVersion === 2) {
                                                oldDetails = value;
                                                if (!oldDetails.auth || !oldDetails.p256dh || !oldDetails.endpoint) {
                                                    return [2 /*return*/];
                                                }
                                                tokenDetails = {
                                                    token: oldDetails.fcmToken,
                                                    createTime: (_a = oldDetails.createTime) !== null && _a !== void 0 ? _a : Date.now(),
                                                    subscriptionOptions: {
                                                        auth: oldDetails.auth,
                                                        p256dh: oldDetails.p256dh,
                                                        endpoint: oldDetails.endpoint,
                                                        swScope: oldDetails.swScope,
                                                        vapidKey: typeof oldDetails.vapidKey === 'string'
                                                            ? oldDetails.vapidKey
                                                            : arrayToBase64(oldDetails.vapidKey)
                                                    }
                                                };
                                            }
                                            else if (db.oldVersion === 3) {
                                                oldDetails = value;
                                                tokenDetails = {
                                                    token: oldDetails.fcmToken,
                                                    createTime: oldDetails.createTime,
                                                    subscriptionOptions: {
                                                        auth: arrayToBase64(oldDetails.auth),
                                                        p256dh: arrayToBase64(oldDetails.p256dh),
                                                        endpoint: oldDetails.endpoint,
                                                        swScope: oldDetails.swScope,
                                                        vapidKey: arrayToBase64(oldDetails.vapidKey)
                                                    }
                                                };
                                            }
                                            else if (db.oldVersion === 4) {
                                                oldDetails = value;
                                                tokenDetails = {
                                                    token: oldDetails.fcmToken,
                                                    createTime: oldDetails.createTime,
                                                    subscriptionOptions: {
                                                        auth: arrayToBase64(oldDetails.auth),
                                                        p256dh: arrayToBase64(oldDetails.p256dh),
                                                        endpoint: oldDetails.endpoint,
                                                        swScope: oldDetails.swScope,
                                                        vapidKey: arrayToBase64(oldDetails.vapidKey)
                                                    }
                                                };
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        db = _a.sent();
                        db.close();
                        // Delete all old databases.
                        return [4 /*yield*/, deleteDb(OLD_DB_NAME)];
                    case 4:
                        // Delete all old databases.
                        _a.sent();
                        return [4 /*yield*/, deleteDb('fcm_vapid_details_db')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, deleteDb('undefined')];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, checkTokenDetails(tokenDetails) ? tokenDetails : null];
                }
            });
        });
    }
    function checkTokenDetails(tokenDetails) {
        if (!tokenDetails || !tokenDetails.subscriptionOptions) {
            return false;
        }
        var subscriptionOptions = tokenDetails.subscriptionOptions;
        return (typeof tokenDetails.createTime === 'number' &&
            tokenDetails.createTime > 0 &&
            typeof tokenDetails.token === 'string' &&
            tokenDetails.token.length > 0 &&
            typeof subscriptionOptions.auth === 'string' &&
            subscriptionOptions.auth.length > 0 &&
            typeof subscriptionOptions.p256dh === 'string' &&
            subscriptionOptions.p256dh.length > 0 &&
            typeof subscriptionOptions.endpoint === 'string' &&
            subscriptionOptions.endpoint.length > 0 &&
            typeof subscriptionOptions.swScope === 'string' &&
            subscriptionOptions.swScope.length > 0 &&
            typeof subscriptionOptions.vapidKey === 'string' &&
            subscriptionOptions.vapidKey.length > 0);
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
    // Exported for tests.
    var DATABASE_NAME$1 = 'firebase-messaging-database';
    var DATABASE_VERSION$1 = 1;
    var OBJECT_STORE_NAME$1 = 'firebase-messaging-store';
    var dbPromise$1 = null;
    function getDbPromise$1() {
        if (!dbPromise$1) {
            dbPromise$1 = openDb(DATABASE_NAME$1, DATABASE_VERSION$1, function (upgradeDb) {
                // We don't use 'break' in this switch statement, the fall-through behavior is what we want,
                // because if there are multiple versions between the old version and the current version, we
                // want ALL the migrations that correspond to those versions to run, not only the last one.
                // eslint-disable-next-line default-case
                switch (upgradeDb.oldVersion) {
                    case 0:
                        upgradeDb.createObjectStore(OBJECT_STORE_NAME$1);
                }
            });
        }
        return dbPromise$1;
    }
    /** Gets record(s) from the objectStore that match the given key. */
    function dbGet(firebaseDependencies) {
        return __awaiter(this, void 0, void 0, function () {
            var key, db, tokenDetails, oldTokenDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = getKey$1(firebaseDependencies);
                        return [4 /*yield*/, getDbPromise$1()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db
                                .transaction(OBJECT_STORE_NAME$1)
                                .objectStore(OBJECT_STORE_NAME$1)
                                .get(key)];
                    case 2:
                        tokenDetails = _a.sent();
                        if (!tokenDetails) return [3 /*break*/, 3];
                        return [2 /*return*/, tokenDetails];
                    case 3: return [4 /*yield*/, migrateOldDatabase(firebaseDependencies.appConfig.senderId)];
                    case 4:
                        oldTokenDetails = _a.sent();
                        if (!oldTokenDetails) return [3 /*break*/, 6];
                        return [4 /*yield*/, dbSet(firebaseDependencies, oldTokenDetails)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, oldTokenDetails];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    /** Assigns or overwrites the record for the given key with the given value. */
    function dbSet(firebaseDependencies, tokenDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var key, db, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = getKey$1(firebaseDependencies);
                        return [4 /*yield*/, getDbPromise$1()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(OBJECT_STORE_NAME$1, 'readwrite');
                        return [4 /*yield*/, tx.objectStore(OBJECT_STORE_NAME$1).put(tokenDetails, key)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, tx.complete];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, tokenDetails];
                }
            });
        });
    }
    /** Removes record(s) from the objectStore that match the given key. */
    function dbRemove(firebaseDependencies) {
        return __awaiter(this, void 0, void 0, function () {
            var key, db, tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = getKey$1(firebaseDependencies);
                        return [4 /*yield*/, getDbPromise$1()];
                    case 1:
                        db = _a.sent();
                        tx = db.transaction(OBJECT_STORE_NAME$1, 'readwrite');
                        return [4 /*yield*/, tx.objectStore(OBJECT_STORE_NAME$1).delete(key)];
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
    function getKey$1(_a) {
        var appConfig = _a.appConfig;
        return appConfig.appId;
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
    var DEFAULT_SW_PATH = '/firebase-messaging-sw.js';
    var DEFAULT_SW_SCOPE = '/firebase-cloud-messaging-push-scope';
    var DEFAULT_VAPID_KEY = 'BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4';
    var ENDPOINT = 'https://fcmregistrations.googleapis.com/v1';
    var CONSOLE_CAMPAIGN_ID = 'google.c.a.c_id';
    var CONSOLE_CAMPAIGN_NAME = 'google.c.a.c_l';
    var CONSOLE_CAMPAIGN_TIME = 'google.c.a.ts';
    /** Set to '1' if Analytics is enabled for the campaign */
    var CONSOLE_CAMPAIGN_ANALYTICS_ENABLED = 'google.c.a.e';

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
    function requestGetToken(firebaseDependencies, subscriptionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, body, subscribeOptions, responseData, response, err_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getHeaders$1(firebaseDependencies)];
                    case 1:
                        headers = _a.sent();
                        body = getBody(subscriptionOptions);
                        subscribeOptions = {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(body)
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, fetch(getEndpoint(firebaseDependencies.appConfig), subscribeOptions)];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        responseData = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        throw ERROR_FACTORY$1.create("token-subscribe-failed" /* TOKEN_SUBSCRIBE_FAILED */, {
                            errorInfo: err_1
                        });
                    case 6:
                        if (responseData.error) {
                            message = responseData.error.message;
                            throw ERROR_FACTORY$1.create("token-subscribe-failed" /* TOKEN_SUBSCRIBE_FAILED */, {
                                errorInfo: message
                            });
                        }
                        if (!responseData.token) {
                            throw ERROR_FACTORY$1.create("token-subscribe-no-token" /* TOKEN_SUBSCRIBE_NO_TOKEN */);
                        }
                        return [2 /*return*/, responseData.token];
                }
            });
        });
    }
    function requestUpdateToken(firebaseDependencies, tokenDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, body, updateOptions, responseData, response, err_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getHeaders$1(firebaseDependencies)];
                    case 1:
                        headers = _a.sent();
                        body = getBody(tokenDetails.subscriptionOptions);
                        updateOptions = {
                            method: 'PATCH',
                            headers: headers,
                            body: JSON.stringify(body)
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, fetch(getEndpoint(firebaseDependencies.appConfig) + "/" + tokenDetails.token, updateOptions)];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        responseData = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        throw ERROR_FACTORY$1.create("token-update-failed" /* TOKEN_UPDATE_FAILED */, {
                            errorInfo: err_2
                        });
                    case 6:
                        if (responseData.error) {
                            message = responseData.error.message;
                            throw ERROR_FACTORY$1.create("token-update-failed" /* TOKEN_UPDATE_FAILED */, {
                                errorInfo: message
                            });
                        }
                        if (!responseData.token) {
                            throw ERROR_FACTORY$1.create("token-update-no-token" /* TOKEN_UPDATE_NO_TOKEN */);
                        }
                        return [2 /*return*/, responseData.token];
                }
            });
        });
    }
    function requestDeleteToken(firebaseDependencies, token) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, unsubscribeOptions, response, responseData, message, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getHeaders$1(firebaseDependencies)];
                    case 1:
                        headers = _a.sent();
                        unsubscribeOptions = {
                            method: 'DELETE',
                            headers: headers
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, fetch(getEndpoint(firebaseDependencies.appConfig) + "/" + token, unsubscribeOptions)];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        responseData = _a.sent();
                        if (responseData.error) {
                            message = responseData.error.message;
                            throw ERROR_FACTORY$1.create("token-unsubscribe-failed" /* TOKEN_UNSUBSCRIBE_FAILED */, {
                                errorInfo: message
                            });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        throw ERROR_FACTORY$1.create("token-unsubscribe-failed" /* TOKEN_UNSUBSCRIBE_FAILED */, {
                            errorInfo: err_3
                        });
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function getEndpoint(_a) {
        var projectId = _a.projectId;
        return ENDPOINT + "/projects/" + projectId + "/registrations";
    }
    function getHeaders$1(_a) {
        var appConfig = _a.appConfig, installations = _a.installations;
        return __awaiter(this, void 0, void 0, function () {
            var authToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, installations.getToken()];
                    case 1:
                        authToken = _b.sent();
                        return [2 /*return*/, new Headers({
                                'Content-Type': 'application/json',
                                Accept: 'application/json',
                                'x-goog-api-key': appConfig.apiKey,
                                'x-goog-firebase-installations-auth': "FIS " + authToken
                            })];
                }
            });
        });
    }
    function getBody(_a) {
        var p256dh = _a.p256dh, auth = _a.auth, endpoint = _a.endpoint, vapidKey = _a.vapidKey;
        var body = {
            web: {
                endpoint: endpoint,
                auth: auth,
                p256dh: p256dh
            }
        };
        if (vapidKey !== DEFAULT_VAPID_KEY) {
            body.web.applicationPubKey = vapidKey;
        }
        return body;
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
    // UpdateRegistration will be called once every week.
    var TOKEN_EXPIRATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
    function getTokenInternal(messaging) {
        return __awaiter(this, void 0, void 0, function () {
            var pushSubscription, subscriptionOptions, tokenDetails, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getPushSubscription(messaging.swRegistration, messaging.vapidKey)];
                    case 1:
                        pushSubscription = _a.sent();
                        subscriptionOptions = {
                            vapidKey: messaging.vapidKey,
                            swScope: messaging.swRegistration.scope,
                            endpoint: pushSubscription.endpoint,
                            auth: arrayToBase64(pushSubscription.getKey('auth')),
                            p256dh: arrayToBase64(pushSubscription.getKey('p256dh'))
                        };
                        return [4 /*yield*/, dbGet(messaging.firebaseDependencies)];
                    case 2:
                        tokenDetails = _a.sent();
                        if (!!tokenDetails) return [3 /*break*/, 3];
                        // No token, get a new one.
                        return [2 /*return*/, getNewToken(messaging.firebaseDependencies, subscriptionOptions)];
                    case 3:
                        if (!!isTokenValid(tokenDetails.subscriptionOptions, subscriptionOptions)) return [3 /*break*/, 8];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, requestDeleteToken(messaging.firebaseDependencies, tokenDetails.token)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        // Suppress errors because of #2364
                        console.warn(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, getNewToken(messaging.firebaseDependencies, subscriptionOptions)];
                    case 8:
                        if (Date.now() >= tokenDetails.createTime + TOKEN_EXPIRATION_MS) {
                            // Weekly token refresh
                            return [2 /*return*/, updateToken(messaging, {
                                    token: tokenDetails.token,
                                    createTime: Date.now(),
                                    subscriptionOptions: subscriptionOptions
                                })];
                        }
                        else {
                            // Valid token, nothing to do.
                            return [2 /*return*/, tokenDetails.token];
                        }
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * This method deletes the token from the database, unsubscribes the token from FCM, and unregisters
     * the push subscription if it exists.
     */
    function deleteTokenInternal(messaging) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenDetails, pushSubscription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbGet(messaging.firebaseDependencies)];
                    case 1:
                        tokenDetails = _a.sent();
                        if (!tokenDetails) return [3 /*break*/, 4];
                        return [4 /*yield*/, requestDeleteToken(messaging.firebaseDependencies, tokenDetails.token)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, dbRemove(messaging.firebaseDependencies)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, messaging.swRegistration.pushManager.getSubscription()];
                    case 5:
                        pushSubscription = _a.sent();
                        if (pushSubscription) {
                            return [2 /*return*/, pushSubscription.unsubscribe()];
                        }
                        // If there's no SW, consider it a success.
                        return [2 /*return*/, true];
                }
            });
        });
    }
    function updateToken(messaging, tokenDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedToken, updatedTokenDetails, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        return [4 /*yield*/, requestUpdateToken(messaging.firebaseDependencies, tokenDetails)];
                    case 1:
                        updatedToken = _a.sent();
                        updatedTokenDetails = __assign(__assign({}, tokenDetails), { token: updatedToken, createTime: Date.now() });
                        return [4 /*yield*/, dbSet(messaging.firebaseDependencies, updatedTokenDetails)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, updatedToken];
                    case 3:
                        e_2 = _a.sent();
                        return [4 /*yield*/, deleteTokenInternal(messaging)];
                    case 4:
                        _a.sent();
                        throw e_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function getNewToken(firebaseDependencies, subscriptionOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var token, tokenDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, requestGetToken(firebaseDependencies, subscriptionOptions)];
                    case 1:
                        token = _a.sent();
                        tokenDetails = {
                            token: token,
                            createTime: Date.now(),
                            subscriptionOptions: subscriptionOptions
                        };
                        return [4 /*yield*/, dbSet(firebaseDependencies, tokenDetails)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, tokenDetails.token];
                }
            });
        });
    }
    /**
     * Gets a PushSubscription for the current user.
     */
    function getPushSubscription(swRegistration, vapidKey) {
        return __awaiter(this, void 0, void 0, function () {
            var subscription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, swRegistration.pushManager.getSubscription()];
                    case 1:
                        subscription = _a.sent();
                        if (subscription) {
                            return [2 /*return*/, subscription];
                        }
                        return [2 /*return*/, swRegistration.pushManager.subscribe({
                                userVisibleOnly: true,
                                // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
                                // submitted to pushManager#subscribe must be of type Uint8Array.
                                applicationServerKey: base64ToArray(vapidKey)
                            })];
                }
            });
        });
    }
    /**
     * Checks if the saved tokenDetails object matches the configuration provided.
     */
    function isTokenValid(dbOptions, currentOptions) {
        var isVapidKeyEqual = currentOptions.vapidKey === dbOptions.vapidKey;
        var isEndpointEqual = currentOptions.endpoint === dbOptions.endpoint;
        var isAuthEqual = currentOptions.auth === dbOptions.auth;
        var isP256dhEqual = currentOptions.p256dh === dbOptions.p256dh;
        return isVapidKeyEqual && isEndpointEqual && isAuthEqual && isP256dhEqual;
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
    function registerDefaultSw(messaging) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = messaging;
                        return [4 /*yield*/, navigator.serviceWorker.register(DEFAULT_SW_PATH, {
                                scope: DEFAULT_SW_SCOPE
                            })];
                    case 1:
                        _a.swRegistration = _b.sent();
                        // The timing when browser updates sw when sw has an update is unreliable from experiment. It
                        // leads to version conflict when the SDK upgrades to a newer version in the main page, but sw
                        // is stuck with the old version. For example,
                        // https://github.com/firebase/firebase-js-sdk/issues/2590 The following line reliably updates
                        // sw if there was an update.
                        messaging.swRegistration.update().catch(function () {
                            /* it is non blocking and we don't care if it failed */
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        throw ERROR_FACTORY$1.create("failed-service-worker-registration" /* FAILED_DEFAULT_REGISTRATION */, {
                            browserErrorMessage: e_1.message
                        });
                    case 3: return [2 /*return*/];
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
    function deleteToken(messaging) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!navigator) {
                            throw ERROR_FACTORY$1.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
                        }
                        if (!!messaging.swRegistration) return [3 /*break*/, 2];
                        return [4 /*yield*/, registerDefaultSw(messaging)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, deleteTokenInternal(messaging)];
                }
            });
        });
    }

    /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
     * in compliance with the License. You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software distributed under the License
     * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
     * or implied. See the License for the specific language governing permissions and limitations under
     * the License.
     */
    var MessageType;
    (function (MessageType) {
        MessageType["PUSH_RECEIVED"] = "push-received";
        MessageType["NOTIFICATION_CLICKED"] = "notification-clicked";
    })(MessageType || (MessageType = {}));

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
    function externalizePayload(internalPayload) {
        var payload = {
            from: internalPayload.from,
            // eslint-disable-next-line camelcase
            collapseKey: internalPayload.collapse_key
        };
        propagateNotificationPayload(payload, internalPayload);
        propagateDataPayload(payload, internalPayload);
        propagateFcmOptions(payload, internalPayload);
        return payload;
    }
    function propagateNotificationPayload(payload, messagePayloadInternal) {
        if (!messagePayloadInternal.notification) {
            return;
        }
        payload.notification = {};
        var title = messagePayloadInternal.notification.title;
        if (!!title) {
            payload.notification.title = title;
        }
        var body = messagePayloadInternal.notification.body;
        if (!!body) {
            payload.notification.body = body;
        }
        var image = messagePayloadInternal.notification.image;
        if (!!image) {
            payload.notification.image = image;
        }
    }
    function propagateDataPayload(payload, messagePayloadInternal) {
        if (!messagePayloadInternal.data) {
            return;
        }
        payload.data = messagePayloadInternal.data;
    }
    function propagateFcmOptions(payload, messagePayloadInternal) {
        if (!messagePayloadInternal.fcmOptions) {
            return;
        }
        payload.fcmOptions = {};
        var link = messagePayloadInternal.fcmOptions.link;
        if (!!link) {
            payload.fcmOptions.link = link;
        }
        // eslint-disable-next-line camelcase
        var analyticsLabel = messagePayloadInternal.fcmOptions.analytics_label;
        if (!!analyticsLabel) {
            payload.fcmOptions.analyticsLabel = analyticsLabel;
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
    function isConsoleMessage(data) {
        // This message has a campaign ID, meaning it was sent using the Firebase Console.
        return typeof data === 'object' && !!data && CONSOLE_CAMPAIGN_ID in data;
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
    function logToScion(messaging, messageType, data) {
        return __awaiter(this, void 0, void 0, function () {
            var eventType, analytics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventType = getEventType(messageType);
                        return [4 /*yield*/, messaging.firebaseDependencies.analyticsProvider.get()];
                    case 1:
                        analytics = _a.sent();
                        analytics.logEvent(eventType, {
                            /* eslint-disable camelcase */
                            message_id: data[CONSOLE_CAMPAIGN_ID],
                            message_name: data[CONSOLE_CAMPAIGN_NAME],
                            message_time: data[CONSOLE_CAMPAIGN_TIME],
                            message_device_time: Math.floor(Date.now() / 1000)
                            /* eslint-enable camelcase */
                        });
                        return [2 /*return*/];
                }
            });
        });
    }
    function getEventType(messageType) {
        switch (messageType) {
            case MessageType.NOTIFICATION_CLICKED:
                return 'notification_open';
            case MessageType.PUSH_RECEIVED:
                return 'notification_foreground';
            default:
                throw new Error();
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
    function messageEventListener(messaging, event) {
        return __awaiter(this, void 0, void 0, function () {
            var internalPayload, dataPayload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        internalPayload = event.data;
                        if (!internalPayload.isFirebaseMessaging) {
                            return [2 /*return*/];
                        }
                        if (messaging.onMessageHandler &&
                            internalPayload.messageType === MessageType.PUSH_RECEIVED) {
                            if (typeof messaging.onMessageHandler === 'function') {
                                messaging.onMessageHandler(externalizePayload(internalPayload));
                            }
                            else {
                                messaging.onMessageHandler.next(externalizePayload(internalPayload));
                            }
                        }
                        dataPayload = internalPayload.data;
                        if (!(isConsoleMessage(dataPayload) &&
                            dataPayload[CONSOLE_CAMPAIGN_ANALYTICS_ENABLED] === '1')) return [3 /*break*/, 2];
                        return [4 /*yield*/, logToScion(messaging, internalPayload.messageType, dataPayload)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
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
    function updateSwReg(messaging, swRegistration) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!swRegistration && !messaging.swRegistration)) return [3 /*break*/, 2];
                        return [4 /*yield*/, registerDefaultSw(messaging)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!swRegistration && !!messaging.swRegistration) {
                            return [2 /*return*/];
                        }
                        if (!(swRegistration instanceof ServiceWorkerRegistration)) {
                            throw ERROR_FACTORY$1.create("invalid-sw-registration" /* INVALID_SW_REGISTRATION */);
                        }
                        messaging.swRegistration = swRegistration;
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
    function updateVapidKey(messaging, vapidKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!!vapidKey) {
                    messaging.vapidKey = vapidKey;
                }
                else if (!messaging.vapidKey) {
                    messaging.vapidKey = DEFAULT_VAPID_KEY;
                }
                return [2 /*return*/];
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
    function getToken$1(messaging, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!navigator) {
                            throw ERROR_FACTORY$1.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
                        }
                        navigator.serviceWorker.addEventListener('message', function (e) {
                            return messageEventListener(messaging, e);
                        });
                        if (!(Notification.permission === 'default')) return [3 /*break*/, 2];
                        return [4 /*yield*/, Notification.requestPermission()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (Notification.permission !== 'granted') {
                            throw ERROR_FACTORY$1.create("permission-blocked" /* PERMISSION_BLOCKED */);
                        }
                        return [4 /*yield*/, updateVapidKey(messaging, options === null || options === void 0 ? void 0 : options.vapidKey)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, updateSwReg(messaging, options === null || options === void 0 ? void 0 : options.serviceWorkerRegistration)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, getTokenInternal(messaging)];
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
    function onMessage(messaging, nextOrObserver) {
        if (!navigator) {
            throw ERROR_FACTORY$1.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
        }
        navigator.serviceWorker.addEventListener('message', function (e) {
            return messageEventListener(messaging, e);
        });
        messaging.onMessageHandler = nextOrObserver;
        return function () {
            messaging.onMessageHandler = null;
        };
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
     * Retrieves a firebase messaging instance.
     *
     * @return the firebase messaging instance associated with the provided firebase app.
     */
    function getMessaging(app$1) {
        var messagingProvider = app._getProvider(app$1, 'messaging-exp');
        return messagingProvider.getImmediate();
    }
    /**
     * Subscribes the messaging instance to push notifications. Returns an FCM registration token
     * that can be used to send push messages to that messaging instance.
     *
     * If a notification permission isn't already granted, this method asks the user for permission.
     * The returned promise rejects if the user does not allow the app to show notifications.
     *
     * @param messaging: the messaging instance.
     * @param options.vapidKey The public server key provided to push services. It is used to
     * authenticate the push subscribers to receive push messages only from sending servers that
     * hold the corresponding private key. If it is not provided, a default VAPID key is used. Note
     * that some push services (Chrome Push Service) require a non-default VAPID key. Therefore, it
     * is recommended to generate and import a VAPID key for your project with
     * {@link https://firebase.google.com/docs/cloud-messaging/js/client#configure_web_credentials_with_fcm Configure Web Credentials with FCM}.
     * See
     * {@link https://developers.google.com/web/fundamentals/push-notifications/web-push-protocol The Web Push Protocol}
     * for details on web push services.}
     *
     * @param options.serviceWorkerRegistration The service worker registration for receiving push
     * messaging. If the registration is not provided explicitly, you need to have a
     * `firebase-messaging-sw.js` at your root location. See
     * {@link https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token Retrieve the current registration token}
     * for more details.
     *
     * @return The promise resolves with an FCM registration token.
     *
     */
    function getToken$1$1(messaging, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getToken$1(messaging, options)];
            });
        });
    }
    /**
     * Deletes the registration token associated with this messaging instance and unsubscribes the
     * messaging instance from the push subscription.
     *
     * @param messaging: the messaging instance.
     *
     * @return The promise resolves when the token has been successfully deleted.
     */
    function deleteToken$1(messaging) {
        return deleteToken(messaging);
    }
    /**
     * When a push message is received and the user is currently on a page for your origin, the
     * message is passed to the page and an `onMessage()` event is dispatched with the payload of
     * the push message.
     *
     *
     * @param messaging: the messaging instance.
     * @param
     *     nextOrObserver This function, or observer object with `next` defined,
     *     is called when a message is received and the user is currently viewing your page.
     * @return To stop listening for messages execute this returned function.
     */
    function onMessage$1(messaging, nextOrObserver) {
        return onMessage(messaging, nextOrObserver);
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
    registerMessaging();

    exports.deleteToken = deleteToken$1;
    exports.getMessaging = getMessaging;
    exports.getToken = getToken$1$1;
    exports.onMessage = onMessage$1;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-messaging.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-messaging.js.map
