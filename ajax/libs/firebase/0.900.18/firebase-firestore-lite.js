(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase['firestore-lite'] = global.firebase['firestore-lite'] || {}), global.firebase.app));
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
    class u {
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

    /** A user with a null UID. */ u.UNAUTHENTICATED = new u(null), 
    // TODO(mikelehen): Look into getting a proper uid-equivalent for
    // non-FirebaseAuth providers.
    u.GOOGLE_CREDENTIALS = new u("google-credentials-uid"), u.FIRST_PARTY = new u("first-party-uid");

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
    const c = new Logger("@firebase/firestore");

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
     */ function a(t) {
        c.setLogLevel(t);
    }

    function h(t, ...n) {
        if (c.logLevel <= LogLevel.DEBUG) {
            const e = n.map(d);
            c.debug(`Firestore (8.3.0): ${t}`, ...e);
        }
    }

    function l(t, ...n) {
        if (c.logLevel <= LogLevel.ERROR) {
            const e = n.map(d);
            c.error(`Firestore (8.3.0): ${t}`, ...e);
        }
    }

    function f(t, ...n) {
        if (c.logLevel <= LogLevel.WARN) {
            const e = n.map(d);
            c.warn(`Firestore (8.3.0): ${t}`, ...e);
        }
    }

    /**
     * Converts an additional log parameter to a string representation.
     */ function d(t) {
        if ("string" == typeof t) return t;
        try {
            return n = t, JSON.stringify(n);
        } catch (n) {
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
        var n;
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
     */ function w(t = "Unexpected state") {
        // Log the failure in addition to throw an exception, just in case the
        // exception is swallowed.
        const n = "FIRESTORE (8.3.0) INTERNAL ASSERTION FAILED: " + t;
        // NOTE: We don't use FirestoreError here because these are internal failures
        // that cannot be handled by the user. (Also it would create a circular
        // dependency between the error and assert modules which doesn't work.)
        throw l(n), new Error(n);
    }

    /**
     * Fails if the given assertion condition is false, throwing an Error with the
     * given message if it did.
     *
     * Messages are stripped in production builds.
     */ function m(t, n) {
        t || w();
    }

    /**
     * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
     * instance of `T` before casting.
     */ function p(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n) {
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
     */ const y = "ok", _ = "cancelled", g = "unknown", b = "invalid-argument", v = "deadline-exceeded", E = "not-found", I = "already-exists", T = "permission-denied", A = "unauthenticated", P = "resource-exhausted", R = "failed-precondition", V = "aborted", N = "out-of-range", $ = "unimplemented", D = "internal", F = "unavailable", S = "data-loss";

    /** An error returned by a Firestore operation. */ class x extends Error {
        /** @hideconstructor */
        constructor(t, n) {
            super(n), this.code = t, this.message = n, this.name = "FirebaseError", 
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
     */ class q {
        constructor(t, n) {
            this.user = n, this.type = "OAuth", this.authHeaders = {}, 
            // Set the headers using Object Literal notation to avoid minification
            this.authHeaders.Authorization = `Bearer ${t}`;
        }
    }

    /** A CredentialsProvider that always yields an empty token. */ class O {
        constructor() {
            /**
             * Stores the listener registered with setChangeListener()
             * This isn't actually necessary since the UID never changes, but we use this
             * to verify the listen contract is adhered to in tests.
             */
            this.changeListener = null;
        }
        getToken() {
            return Promise.resolve(null);
        }
        invalidateToken() {}
        setChangeListener(t) {
            this.changeListener = t, 
            // Fire with initial user.
            t(u.UNAUTHENTICATED);
        }
        removeChangeListener() {
            this.changeListener = null;
        }
    }

    class C {
        constructor(t) {
            /**
             * The auth token listener registered with FirebaseApp, retained here so we
             * can unregister it.
             */
            this.t = null, 
            /** Tracks the current User. */
            this.currentUser = u.UNAUTHENTICATED, this.receivedInitialUser = !1, 
            /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
            this.i = 0, 
            /** The listener registered with setChangeListener(). */
            this.changeListener = null, this.forceRefresh = !1, this.t = () => {
                this.i++, this.currentUser = this.o(), this.receivedInitialUser = !0, this.changeListener && this.changeListener(this.currentUser);
            }, this.i = 0, this.auth = t.getImmediate({
                optional: !0
            }), this.auth ? this.auth.addAuthTokenListener(this.t) : (
            // if auth is not available, invoke tokenListener once with null token
            this.t(null), t.get().then((t => {
                this.auth = t, this.t && 
                // tokenListener can be removed by removeChangeListener()
                this.auth.addAuthTokenListener(this.t);
            }), (() => {})));
        }
        getToken() {
            // Take note of the current value of the tokenCounter so that this method
            // can fail (with an ABORTED error) if there is a token change while the
            // request is outstanding.
            const t = this.i, n = this.forceRefresh;
            return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then((n => 
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            this.i !== t ? (h("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            this.getToken()) : n ? (m("string" == typeof n.accessToken), new q(n.accessToken, this.currentUser)) : null)) : Promise.resolve(null);
        }
        invalidateToken() {
            this.forceRefresh = !0;
        }
        setChangeListener(t) {
            this.changeListener = t, 
            // Fire the initial event
            this.receivedInitialUser && t(this.currentUser);
        }
        removeChangeListener() {
            this.auth && this.auth.removeAuthTokenListener(this.t), this.t = null, this.changeListener = null;
        }
        // Auth.getUid() can return null even with a user logged in. It is because
        // getUid() is synchronous, but the auth code populating Uid is asynchronous.
        // This method should only be called in the AuthTokenListener callback
        // to guarantee to get the actual user.
        o() {
            const t = this.auth && this.auth.getUid();
            return m(null === t || "string" == typeof t), new u(t);
        }
    }

    /*
     * FirstPartyToken provides a fresh token each time its value
     * is requested, because if the token is too old, requests will be rejected.
     * Technically this may no longer be necessary since the SDK should gracefully
     * recover from unauthenticated errors (see b/33147818 for context), but it's
     * safer to keep the implementation as-is.
     */ class L {
        constructor(t, n) {
            this.u = t, this.h = n, this.type = "FirstParty", this.user = u.FIRST_PARTY;
        }
        get authHeaders() {
            const t = {
                "X-Goog-AuthUser": this.h
            }, n = this.u.auth.getAuthHeaderValueForFirstParty([]);
            // Use array notation to prevent minification
                    return n && (t.Authorization = n), t;
        }
    }

    /*
     * Provides user credentials required for the Firestore JavaScript SDK
     * to authenticate the user, using technique that is only available
     * to applications hosted by Google.
     */ class U {
        constructor(t, n) {
            this.u = t, this.h = n;
        }
        getToken() {
            return Promise.resolve(new L(this.u, this.h));
        }
        setChangeListener(t) {
            // Fire with initial uid.
            t(u.FIRST_PARTY);
        }
        removeChangeListener() {}
        invalidateToken() {}
    }

    /**
     * Builds a CredentialsProvider depending on the type of
     * the credentials passed in.
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
    class j {
        /**
         * Constructs a DatabaseInfo using the provided host, databaseId and
         * persistenceKey.
         *
         * @param databaseId - The database to use.
         * @param persistenceKey - A unique identifier for this Firestore's local
         * storage (used in conjunction with the databaseId).
         * @param host - The Firestore backend host to connect to.
         * @param ssl - Whether to use SSL when connecting.
         * @param forceLongPolling - Whether to use the forceLongPolling option
         * when using WebChannel as the network transport.
         * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
         * option when using WebChannel as the network transport.
         */
        constructor(t, n, e, s, r, i) {
            this.databaseId = t, this.persistenceKey = n, this.host = e, this.ssl = s, this.forceLongPolling = r, 
            this.autoDetectLongPolling = i;
        }
    }

    /** The default database name for a project. */
    /** Represents the database ID a Firestore client is associated with. */
    class M {
        constructor(t, n) {
            this.projectId = t, this.database = n || "(default)";
        }
        get isDefaultDatabase() {
            return "(default)" === this.database;
        }
        isEqual(t) {
            return t instanceof M && t.projectId === this.projectId && t.database === this.database;
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
     * Path represents an ordered sequence of string segments.
     */
    class B {
        constructor(t, n, e) {
            void 0 === n ? n = 0 : n > t.length && w(), void 0 === e ? e = t.length - n : e > t.length - n && w(), 
            this.segments = t, this.offset = n, this.len = e;
        }
        get length() {
            return this.len;
        }
        isEqual(t) {
            return 0 === B.comparator(this, t);
        }
        child(t) {
            const n = this.segments.slice(this.offset, this.limit());
            return t instanceof B ? t.forEach((t => {
                n.push(t);
            })) : n.push(t), this.construct(n);
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
            for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1;
            return !0;
        }
        isImmediateParentOf(t) {
            if (this.length + 1 !== t.length) return !1;
            for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1;
            return !0;
        }
        forEach(t) {
            for (let n = this.offset, e = this.limit(); n < e; n++) t(this.segments[n]);
        }
        toArray() {
            return this.segments.slice(this.offset, this.limit());
        }
        static comparator(t, n) {
            const e = Math.min(t.length, n.length);
            for (let s = 0; s < e; s++) {
                const e = t.get(s), r = n.get(s);
                if (e < r) return -1;
                if (e > r) return 1;
            }
            return t.length < n.length ? -1 : t.length > n.length ? 1 : 0;
        }
    }

    /**
     * A slash-separated path for navigating resources (documents and collections)
     * within Firestore.
     */ class k extends B {
        construct(t, n, e) {
            return new k(t, n, e);
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
            const n = [];
            for (const e of t) {
                if (e.indexOf("//") >= 0) throw new x(b, `Invalid segment (${e}). Paths must not contain // in them.`);
                // Strip leading and traling slashed.
                            n.push(...e.split("/").filter((t => t.length > 0)));
            }
            return new k(n);
        }
        static emptyPath() {
            return new k([]);
        }
    }

    const Q = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

    /** A dot-separated path for navigating sub-objects within a document. */ class W extends B {
        construct(t, n, e) {
            return new W(t, n, e);
        }
        /**
         * Returns true if the string could be used as a segment in a field path
         * without escaping.
         */    static isValidIdentifier(t) {
            return Q.test(t);
        }
        canonicalString() {
            return this.toArray().map((t => (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), 
            W.isValidIdentifier(t) || (t = "`" + t + "`"), t))).join(".");
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
            return new W([ "__name__" ]);
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
            const n = [];
            let e = "", s = 0;
            const r = () => {
                if (0 === e.length) throw new x(b, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                n.push(e), e = "";
            };
            let i = !1;
            for (;s < t.length; ) {
                const n = t[s];
                if ("\\" === n) {
                    if (s + 1 === t.length) throw new x(b, "Path has trailing escape character: " + t);
                    const n = t[s + 1];
                    if ("\\" !== n && "." !== n && "`" !== n) throw new x(b, "Path has invalid escape sequence: " + t);
                    e += n, s += 2;
                } else "`" === n ? (i = !i, s++) : "." !== n || i ? (e += n, s++) : (r(), s++);
            }
            if (r(), i) throw new x(b, "Unterminated ` in path: " + t);
            return new W(n);
        }
        static emptyPath() {
            return new W([]);
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
     */ class z {
        constructor(t) {
            this.path = t;
        }
        static fromPath(t) {
            return new z(k.fromString(t));
        }
        static fromName(t) {
            return new z(k.fromString(t).popFirst(5));
        }
        /** Returns true if the document is in the specified collectionId. */    hasCollectionId(t) {
            return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
        }
        isEqual(t) {
            return null !== t && 0 === k.comparator(this.path, t.path);
        }
        toString() {
            return this.path.toString();
        }
        static comparator(t, n) {
            return k.comparator(t.path, n.path);
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
            return new z(new k(t.slice()));
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
     */ function G(t, n, e) {
        if (!e) throw new x(b, `Function ${t}() cannot be called with an empty ${n}.`);
    }

    /**
     * Validates that two boolean options are not set at the same time.
     */
    /**
     * Validates that `path` refers to a document (indicated by the fact it contains
     * an even numbers of segments).
     */
    function Y(t) {
        if (!z.isDocumentKey(t)) throw new x(b, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Validates that `path` refers to a collection (indicated by the fact it
     * contains an odd numbers of segments).
     */ function H(t) {
        if (z.isDocumentKey(t)) throw new x(b, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Returns true if it's a non-null object without a custom prototype
     * (i.e. excludes Array, Date, etc.).
     */
    /** Returns a string describing the type / value of the provided input. */
    function K(t) {
        if (void 0 === t) return "undefined";
        if (null === t) return "null";
        if ("string" == typeof t) return t.length > 20 && (t = `${t.substring(0, 20)}...`), 
        JSON.stringify(t);
        if ("number" == typeof t || "boolean" == typeof t) return "" + t;
        if ("object" == typeof t) {
            if (t instanceof Array) return "an array";
            {
                const n = 
                /** Hacky method to try to get the constructor name for an object. */
                function(t) {
                    if (t.constructor) {
                        const n = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
                        if (n && n.length > 1) return n[1];
                    }
                    return null;
                }
                /**
     * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
     * underlying instance. Throws if  `obj` is not an instance of `T`.
     *
     * This cast is used in the Lite and Full SDK to verify instance types for
     * arguments passed to the public API.
     */ (t);
                return n ? `a custom ${n} object` : "an object";
            }
        }
        return "function" == typeof t ? "a function" : w();
    }

    function J(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n) {
        if ("_delegate" in t && (
        // Unwrap Compat types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        t = t._delegate), !(t instanceof n)) {
            if (n.name === t.constructor.name) throw new x(b, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
            {
                const e = K(t);
                throw new x(b, `Expected type '${n.name}', but it was: ${e}`);
            }
        }
        return t;
    }

    function Z(t, n) {
        if (n <= 0) throw new x(b, `Function ${t}() requires a positive number, but it was: ${n}.`);
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
     * Returns whether a variable is either undefined or null.
     */ function X(t) {
        return null == t;
    }

    /** Returns whether the value represents -0. */ function tt(t) {
        // Detect if the value is -0.0. Based on polyfill from
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
        return 0 === t && 1 / t == -1 / 0;
    }

    /**
     * Returns whether a value is an integer and in the safe integer range
     * @param value - The value to test for being an integer and in the safe range
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
    const nt = {
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
     * Error Codes describing the different ways GRPC can fail. These are copied
     * directly from GRPC's sources here:
     *
     * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
     *
     * Important! The names of these identifiers matter because the string forms
     * are used for reverse lookups from the webchannel stream. Do NOT change the
     * names of these identifiers or change this into a const enum.
     */
    var et, st;

    /**
     * Converts an HTTP Status Code to the equivalent error code.
     *
     * @param status - An HTTP Status Code, like 200, 404, 503, etc.
     * @returns The equivalent Code. Unknown status codes are mapped to
     *     Code.UNKNOWN.
     */
    function rt(t) {
        if (void 0 === t) return l("RPC_ERROR", "HTTP error has no status"), g;
        // The canonical error codes for Google APIs [1] specify mapping onto HTTP
        // status codes but the mapping is not bijective. In each case of ambiguity
        // this function chooses a primary error.
        
        // [1]
        // https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
            switch (t) {
          case 200:
            // OK
            return y;

          case 400:
            // Bad Request
            return R;

            // Other possibilities based on the forward mapping
            // return Code.INVALID_ARGUMENT;
            // return Code.OUT_OF_RANGE;
                  case 401:
            // Unauthorized
            return A;

          case 403:
            // Forbidden
            return T;

          case 404:
            // Not Found
            return E;

          case 409:
            // Conflict
            return V;

            // Other possibilities:
            // return Code.ALREADY_EXISTS;
                  case 416:
            // Range Not Satisfiable
            return N;

          case 429:
            // Too Many Requests
            return P;

          case 499:
            // Client Closed Request
            return _;

          case 500:
            // Internal Server Error
            return g;

            // Other possibilities:
            // return Code.INTERNAL;
            // return Code.DATA_LOSS;
                  case 501:
            // Unimplemented
            return $;

          case 503:
            // Service Unavailable
            return F;

          case 504:
            // Gateway Timeout
            return v;

          default:
            return t >= 200 && t < 300 ? y : t >= 400 && t < 500 ? R : t >= 500 && t < 600 ? D : g;
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
     * A Rest-based connection that relies on the native HTTP stack
     * (e.g. `fetch` or a polyfill).
     */ (st = et || (et = {}))[st.OK = 0] = "OK", st[st.CANCELLED = 1] = "CANCELLED", 
    st[st.UNKNOWN = 2] = "UNKNOWN", st[st.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
    st[st.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", st[st.NOT_FOUND = 5] = "NOT_FOUND", 
    st[st.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", st[st.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
    st[st.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", st[st.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
    st[st.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", st[st.ABORTED = 10] = "ABORTED", 
    st[st.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", st[st.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
    st[st.INTERNAL = 13] = "INTERNAL", st[st.UNAVAILABLE = 14] = "UNAVAILABLE", st[st.DATA_LOSS = 15] = "DATA_LOSS";

    class it extends 
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    class {
        constructor(t) {
            this.databaseInfo = t, this.databaseId = t.databaseId;
            const n = t.ssl ? "https" : "http";
            this.l = n + "://" + t.host, this.m = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
        }
        p(t, n, e, s) {
            const r = this.g(t, n);
            h("RestConnection", "Sending: ", r, e);
            const i = {};
            return this.v(i, s), this.I(t, r, i, e).then((t => (h("RestConnection", "Received: ", t), 
            t)), (n => {
                throw f("RestConnection", `${t} failed with error: `, n, "url: ", r, "request:", e), 
                n;
            }));
        }
        T(t, n, e, s) {
            // The REST API automatically aggregates all of the streamed results, so we
            // can just use the normal invoke() method.
            return this.p(t, n, e, s);
        }
        /**
         * Modifies the headers for a request, adding any authorization token if
         * present and any additional headers for the request.
         */    v(t, n) {
            if (t["X-Goog-Api-Client"] = "gl-js/ fire/8.3.0", 
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the $httpOverwrite
            // parameter supported by ESF to avoid triggering preflight requests.
            t["Content-Type"] = "text/plain", n) for (const e in n.authHeaders) n.authHeaders.hasOwnProperty(e) && (t[e] = n.authHeaders[e]);
        }
        g(t, n) {
            const e = nt[t];
            return `${this.l}/v1/${n}:${e}`;
        }
    } {
        /**
         * @param databaseInfo - The connection info.
         * @param fetchImpl - `fetch` or a Polyfill that implements the fetch API.
         */
        constructor(t, n) {
            super(t), this.A = n;
        }
        P(t, n) {
            throw new Error("Not supported by FetchConnection");
        }
        async I(t, n, e, s) {
            const r = JSON.stringify(s);
            let i;
            try {
                i = await this.A(n, {
                    method: "POST",
                    headers: e,
                    body: r
                });
            } catch (t) {
                throw new x(rt(t.status), "Request failed with error: " + t.statusText);
            }
            if (!i.ok) throw new x(rt(i.status), "Request failed with error: " + i.statusText);
            return i.json();
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
     */ class ot {
        constructor() {
            this.promise = new Promise(((t, n) => {
                this.resolve = t, this.reject = n;
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
    /** Initializes the HTTP connection for the REST API. */
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
    function ut(t) {
        // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
        const n = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "undefined" != typeof self && (self.crypto || self.msCrypto), e = new Uint8Array(t);
        if (n && "function" == typeof n.getRandomValues) n.getRandomValues(e); else 
        // Falls back to Math.random
        for (let n = 0; n < t; n++) e[n] = Math.floor(256 * Math.random());
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
     */ class ct {
        static R() {
            // Alphanumeric characters
            const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = Math.floor(256 / t.length) * t.length;
            // The largest byte value that is a multiple of `char.length`.
                    let e = "";
            for (;e.length < 20; ) {
                const s = ut(40);
                for (let r = 0; r < s.length; ++r) 
                // Only accept values that are [0, maxMultiple), this ensures they can
                // be evenly mapped to indices of `chars` via a modulo operation.
                e.length < 20 && s[r] < n && (e += t.charAt(s[r] % t.length));
            }
            return e;
        }
    }

    function at(t, n) {
        return t < n ? -1 : t > n ? 1 : 0;
    }

    /** Helper to compare arrays using isEqual(). */ function ht(t, n, e) {
        return t.length === n.length && t.every(((t, s) => e(t, n[s])));
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
     */ function lt(t) {
        let n = 0;
        for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && n++;
        return n;
    }

    function ft(t, n) {
        for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && n(e, t[e]);
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
     */
    class dt {
        constructor(t) {
            this.binaryString = t;
        }
        static fromBase64String(t) {
            const n = atob(t);
            return new dt(n);
        }
        static fromUint8Array(t) {
            const n = 
            /**
     * Helper function to convert an Uint8array to a binary string.
     */
            function(t) {
                let n = "";
                for (let e = 0; e < t.length; ++e) n += String.fromCharCode(t[e]);
                return n;
            }
            /**
     * Helper function to convert a binary string to an Uint8Array.
     */ (t);
            return new dt(n);
        }
        toBase64() {
            return t = this.binaryString, btoa(t);
            /** Converts a binary string to a Base64 encoded string. */
            var t;
        }
        toUint8Array() {
            return function(t) {
                const n = new Uint8Array(t.length);
                for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
                return n;
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
            return at(this.binaryString, t.binaryString);
        }
        isEqual(t) {
            return this.binaryString === t.binaryString;
        }
    }

    dt.EMPTY_BYTE_STRING = new dt("");

    const wt = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

    /**
     * Converts the possible Proto values for a timestamp value into a "seconds and
     * nanos" representation.
     */ function mt(t) {
        // The json interface (for the browser) will return an iso timestamp string,
        // while the proto js library (for node) will return a
        // google.protobuf.Timestamp instance.
        if (m(!!t), "string" == typeof t) {
            // The date string can have higher precision (nanos) than the Date class
            // (millis), so we do some custom parsing here.
            // Parse the nanos right out of the string.
            let n = 0;
            const e = wt.exec(t);
            if (m(!!e), e[1]) {
                // Pad the fraction out to 9 digits (nanos).
                let t = e[1];
                t = (t + "000000000").substr(0, 9), n = Number(t);
            }
            // Parse the date to get the seconds.
                    const s = new Date(t);
            return {
                seconds: Math.floor(s.getTime() / 1e3),
                nanos: n
            };
        }
        return {
            seconds: pt(t.seconds),
            nanos: pt(t.nanos)
        };
    }

    /**
     * Converts the possible Proto types for numbers into a JavaScript number.
     * Returns 0 if the value is not numeric.
     */ function pt(t) {
        // TODO(bjornick): Handle int64 greater than 53 bits.
        return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
    }

    /** Converts the possible Proto types for Blobs into a ByteString. */ function yt(t) {
        return "string" == typeof t ? dt.fromBase64String(t) : dt.fromUint8Array(t);
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
    class _t {
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
        constructor(t, n) {
            if (this.seconds = t, this.nanoseconds = n, n < 0) throw new x(b, "Timestamp nanoseconds out of range: " + n);
            if (n >= 1e9) throw new x(b, "Timestamp nanoseconds out of range: " + n);
            if (t < -62135596800) throw new x(b, "Timestamp seconds out of range: " + t);
            // This will break in the year 10,000.
                    if (t >= 253402300800) throw new x(b, "Timestamp seconds out of range: " + t);
        }
        /**
         * Creates a new timestamp with the current date, with millisecond precision.
         *
         * @returns a new timestamp representing the current date.
         */    static now() {
            return _t.fromMillis(Date.now());
        }
        /**
         * Creates a new timestamp from the given date.
         *
         * @param date - The date to initialize the `Timestamp` from.
         * @returns A new `Timestamp` representing the same point in time as the given
         *     date.
         */    static fromDate(t) {
            return _t.fromMillis(t.getTime());
        }
        /**
         * Creates a new timestamp from the given number of milliseconds.
         *
         * @param milliseconds - Number of milliseconds since Unix epoch
         *     1970-01-01T00:00:00Z.
         * @returns A new `Timestamp` representing the same point in time as the given
         *     number of milliseconds.
         */    static fromMillis(t) {
            const n = Math.floor(t / 1e3);
            return new _t(n, 1e6 * (t - 1e3 * n));
        }
        /**
         * Converts a `Timestamp` to a JavaScript `Date` object. This conversion causes
         * a loss of precision since `Date` objects only support millisecond precision.
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
            return this.seconds === t.seconds ? at(this.nanoseconds, t.nanoseconds) : at(this.seconds, t.seconds);
        }
        /**
         * Returns true if this `Timestamp` is equal to the provided one.
         *
         * @param other - The `Timestamp` to compare against.
         * @returns true if this `Timestamp` is equal to the provided one.
         */    isEqual(t) {
            return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
        }
        toString() {
            return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
        }
        toJSON() {
            return {
                seconds: this.seconds,
                nanoseconds: this.nanoseconds
            };
        }
        /**
         * Converts this object to a primitive string, which allows Timestamp objects to be compared
         * using the `>`, `<=`, `>=` and `>` operators.
         */    valueOf() {
            // This method returns a string of the form <seconds>.<nanoseconds> where <seconds> is
            // translated to have a non-negative value and both <seconds> and <nanoseconds> are left-padded
            // with zeroes to be a consistent length. Strings with this format then have a lexiographical
            // ordering that matches the expected ordering. The <seconds> translation is done to avoid
            // having a leading negative sign (i.e. a leading '-' character) in its string representation,
            // which would affect its lexiographical ordering.
            const t = this.seconds - -62135596800;
            // Note: Up to 12 decimal digits are required to represent all valid 'seconds' values.
                    return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
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
     */ function gt(t) {
        var n, e;
        return "server_timestamp" === (null === (e = ((null === (n = null == t ? void 0 : t.mapValue) || void 0 === n ? void 0 : n.fields) || {}).__type__) || void 0 === e ? void 0 : e.stringValue);
    }

    /**
     * Returns the value of the field before this ServerTimestamp was set.
     *
     * Preserving the previous values allows the user to display the last resoled
     * value until the backend responds with the timestamp.
     */ function bt(t) {
        const n = t.mapValue.fields.__previous_value__;
        return gt(n) ? bt(n) : n;
    }

    /**
     * Returns the local time at which this timestamp was first set.
     */ function vt(t) {
        const n = mt(t.mapValue.fields.__local_write_time__.timestampValue);
        return new _t(n.seconds, n.nanos);
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
    /** Extracts the backend's type order for the provided value. */ function Et(t) {
        return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? gt(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : w();
    }

    /** Tests `left` and `right` for equality based on the backend semantics. */ function It(t, n) {
        const e = Et(t);
        if (e !== Et(n)) return !1;
        switch (e) {
          case 0 /* NullValue */ :
            return !0;

          case 1 /* BooleanValue */ :
            return t.booleanValue === n.booleanValue;

          case 4 /* ServerTimestampValue */ :
            return vt(t).isEqual(vt(n));

          case 3 /* TimestampValue */ :
            return function(t, n) {
                if ("string" == typeof t.timestampValue && "string" == typeof n.timestampValue && t.timestampValue.length === n.timestampValue.length) 
                // Use string equality for ISO 8601 timestamps
                return t.timestampValue === n.timestampValue;
                const e = mt(t.timestampValue), s = mt(n.timestampValue);
                return e.seconds === s.seconds && e.nanos === s.nanos;
            }(t, n);

          case 5 /* StringValue */ :
            return t.stringValue === n.stringValue;

          case 6 /* BlobValue */ :
            return function(t, n) {
                return yt(t.bytesValue).isEqual(yt(n.bytesValue));
            }(t, n);

          case 7 /* RefValue */ :
            return t.referenceValue === n.referenceValue;

          case 8 /* GeoPointValue */ :
            return function(t, n) {
                return pt(t.geoPointValue.latitude) === pt(n.geoPointValue.latitude) && pt(t.geoPointValue.longitude) === pt(n.geoPointValue.longitude);
            }(t, n);

          case 2 /* NumberValue */ :
            return function(t, n) {
                if ("integerValue" in t && "integerValue" in n) return pt(t.integerValue) === pt(n.integerValue);
                if ("doubleValue" in t && "doubleValue" in n) {
                    const e = pt(t.doubleValue), s = pt(n.doubleValue);
                    return e === s ? tt(e) === tt(s) : isNaN(e) && isNaN(s);
                }
                return !1;
            }(t, n);

          case 9 /* ArrayValue */ :
            return ht(t.arrayValue.values || [], n.arrayValue.values || [], It);

          case 10 /* ObjectValue */ :
            return function(t, n) {
                const e = t.mapValue.fields || {}, s = n.mapValue.fields || {};
                if (lt(e) !== lt(s)) return !1;
                for (const t in e) if (e.hasOwnProperty(t) && (void 0 === s[t] || !It(e[t], s[t]))) return !1;
                return !0;
            }
            /** Returns true if the ArrayValue contains the specified element. */ (t, n);

          default:
            return w();
        }
    }

    function Tt(t, n) {
        return void 0 !== (t.values || []).find((t => It(t, n)));
    }

    function At(t, n) {
        const e = Et(t), s = Et(n);
        if (e !== s) return at(e, s);
        switch (e) {
          case 0 /* NullValue */ :
            return 0;

          case 1 /* BooleanValue */ :
            return at(t.booleanValue, n.booleanValue);

          case 2 /* NumberValue */ :
            return function(t, n) {
                const e = pt(t.integerValue || t.doubleValue), s = pt(n.integerValue || n.doubleValue);
                return e < s ? -1 : e > s ? 1 : e === s ? 0 : 
                // one or both are NaN.
                isNaN(e) ? isNaN(s) ? 0 : -1 : 1;
            }(t, n);

          case 3 /* TimestampValue */ :
            return Pt(t.timestampValue, n.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return Pt(vt(t), vt(n));

          case 5 /* StringValue */ :
            return at(t.stringValue, n.stringValue);

          case 6 /* BlobValue */ :
            return function(t, n) {
                const e = yt(t), s = yt(n);
                return e.compareTo(s);
            }(t.bytesValue, n.bytesValue);

          case 7 /* RefValue */ :
            return function(t, n) {
                const e = t.split("/"), s = n.split("/");
                for (let t = 0; t < e.length && t < s.length; t++) {
                    const n = at(e[t], s[t]);
                    if (0 !== n) return n;
                }
                return at(e.length, s.length);
            }(t.referenceValue, n.referenceValue);

          case 8 /* GeoPointValue */ :
            return function(t, n) {
                const e = at(pt(t.latitude), pt(n.latitude));
                if (0 !== e) return e;
                return at(pt(t.longitude), pt(n.longitude));
            }(t.geoPointValue, n.geoPointValue);

          case 9 /* ArrayValue */ :
            return function(t, n) {
                const e = t.values || [], s = n.values || [];
                for (let t = 0; t < e.length && t < s.length; ++t) {
                    const n = At(e[t], s[t]);
                    if (n) return n;
                }
                return at(e.length, s.length);
            }(t.arrayValue, n.arrayValue);

          case 10 /* ObjectValue */ :
            return function(t, n) {
                const e = t.fields || {}, s = Object.keys(e), r = n.fields || {}, i = Object.keys(r);
                // Even though MapValues are likely sorted correctly based on their insertion
                // order (e.g. when received from the backend), local modifications can bring
                // elements out of order. We need to re-sort the elements to ensure that
                // canonical IDs are independent of insertion order.
                s.sort(), i.sort();
                for (let t = 0; t < s.length && t < i.length; ++t) {
                    const n = at(s[t], i[t]);
                    if (0 !== n) return n;
                    const o = At(e[s[t]], r[i[t]]);
                    if (0 !== o) return o;
                }
                return at(s.length, i.length);
            }
            /** Returns a reference value for the provided database and key. */ (t.mapValue, n.mapValue);

          default:
            throw w();
        }
    }

    function Pt(t, n) {
        if ("string" == typeof t && "string" == typeof n && t.length === n.length) return at(t, n);
        const e = mt(t), s = mt(n), r = at(e.seconds, s.seconds);
        return 0 !== r ? r : at(e.nanos, s.nanos);
    }

    function Rt(t, n) {
        return {
            referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${n.path.canonicalString()}`
        };
    }

    /** Returns true if `value` is an ArrayValue. */ function Vt(t) {
        return !!t && "arrayValue" in t;
    }

    /** Returns true if `value` is a NullValue. */ function Nt(t) {
        return !!t && "nullValue" in t;
    }

    /** Returns true if `value` is NaN. */ function $t(t) {
        return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
    }

    /** Returns true if `value` is a MapValue. */ function Dt(t) {
        return !!t && "mapValue" in t;
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
     * The result of a lookup for a given path may be an existing document or a
     * marker that this document does not exist at a given version.
     */ class Ft {
        constructor(t, n) {
            this.key = t, this.version = n;
        }
    }

    /**
     * Represents a document in Firestore with a key, version, data and whether the
     * data has local mutations applied to it.
     */ class St extends Ft {
        constructor(t, n, e, s) {
            super(t, n), this.objectValue = e, this.hasLocalMutations = !!s.hasLocalMutations, 
            this.hasCommittedMutations = !!s.hasCommittedMutations;
        }
        field(t) {
            return this.objectValue.field(t);
        }
        data() {
            return this.objectValue;
        }
        toProto() {
            return this.objectValue.proto;
        }
        isEqual(t) {
            return t instanceof St && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.hasLocalMutations === t.hasLocalMutations && this.hasCommittedMutations === t.hasCommittedMutations && this.objectValue.isEqual(t.objectValue);
        }
        toString() {
            return `Document(${this.key}, ${this.version}, ${this.objectValue.toString()}, {hasLocalMutations: ${this.hasLocalMutations}}), {hasCommittedMutations: ${this.hasCommittedMutations}})`;
        }
        get hasPendingWrites() {
            return this.hasLocalMutations || this.hasCommittedMutations;
        }
    }

    /**
     * A class representing a deleted document.
     * Version is set to 0 if we don't point to any specific time, otherwise it
     * denotes time we know it didn't exist at.
     */ class xt extends Ft {
        constructor(t, n, e) {
            super(t, n), this.hasCommittedMutations = !(!e || !e.hasCommittedMutations);
        }
        toString() {
            return `NoDocument(${this.key}, ${this.version})`;
        }
        get hasPendingWrites() {
            return this.hasCommittedMutations;
        }
        isEqual(t) {
            return t instanceof xt && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key);
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
    class qt {
        constructor(t, n = null, e = [], s = [], r = null, i = null, o = null) {
            this.path = t, this.collectionGroup = n, this.orderBy = e, this.filters = s, this.limit = r, 
            this.startAt = i, this.endAt = o, this.V = null;
        }
    }

    /**
     * Initializes a Target with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     *
     * NOTE: you should always construct `Target` from `Query.toTarget` instead of
     * using this factory method, because `Query` provides an implicit `orderBy`
     * property.
     */ function Ot(t, n = null, e = [], s = [], r = null, i = null, o = null) {
        return new qt(t, n, e, s, r, i, o);
    }

    class Ct extends class {} {
        constructor(t, n, e) {
            super(), this.field = t, this.op = n, this.value = e;
        }
        /**
         * Creates a filter based on the provided arguments.
         */    static create(t, n, e) {
            return t.isKeyField() ? "in" /* IN */ === n || "not-in" /* NOT_IN */ === n ? this.N(t, n, e) : new Lt(t, n, e) : "array-contains" /* ARRAY_CONTAINS */ === n ? new Bt(t, e) : "in" /* IN */ === n ? new kt(t, e) : "not-in" /* NOT_IN */ === n ? new Qt(t, e) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === n ? new Wt(t, e) : new Ct(t, n, e);
        }
        static N(t, n, e) {
            return "in" /* IN */ === n ? new Ut(t, e) : new jt(t, e);
        }
        matches(t) {
            const n = t.field(this.field);
            // Types do not have to match in NOT_EQUAL filters.
                    return "!=" /* NOT_EQUAL */ === this.op ? null !== n && this.$(At(n, this.value)) : null !== n && Et(this.value) === Et(n) && this.$(At(n, this.value));
            // Only compare types with matching backend order (such as double and int).
            }
        $(t) {
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
                return w();
            }
        }
        D() {
            return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
        }
    }

    /** Filter that matches on key fields (i.e. '__name__'). */
    class Lt extends Ct {
        constructor(t, n, e) {
            super(t, n, e), this.key = z.fromName(e.referenceValue);
        }
        matches(t) {
            const n = z.comparator(t.key, this.key);
            return this.$(n);
        }
    }

    /** Filter that matches on key fields within an array. */ class Ut extends Ct {
        constructor(t, n) {
            super(t, "in" /* IN */ , n), this.keys = Mt("in" /* IN */ , n);
        }
        matches(t) {
            return this.keys.some((n => n.isEqual(t.key)));
        }
    }

    /** Filter that matches on key fields not present within an array. */ class jt extends Ct {
        constructor(t, n) {
            super(t, "not-in" /* NOT_IN */ , n), this.keys = Mt("not-in" /* NOT_IN */ , n);
        }
        matches(t) {
            return !this.keys.some((n => n.isEqual(t.key)));
        }
    }

    function Mt(t, n) {
        var e;
        return ((null === (e = n.arrayValue) || void 0 === e ? void 0 : e.values) || []).map((t => z.fromName(t.referenceValue)));
    }

    /** A Filter that implements the array-contains operator. */ class Bt extends Ct {
        constructor(t, n) {
            super(t, "array-contains" /* ARRAY_CONTAINS */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return Vt(n) && Tt(n.arrayValue, this.value);
        }
    }

    /** A Filter that implements the IN operator. */ class kt extends Ct {
        constructor(t, n) {
            super(t, "in" /* IN */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return null !== n && Tt(this.value.arrayValue, n);
        }
    }

    /** A Filter that implements the not-in operator. */ class Qt extends Ct {
        constructor(t, n) {
            super(t, "not-in" /* NOT_IN */ , n);
        }
        matches(t) {
            if (Tt(this.value.arrayValue, {
                nullValue: "NULL_VALUE"
            })) return !1;
            const n = t.field(this.field);
            return null !== n && !Tt(this.value.arrayValue, n);
        }
    }

    /** A Filter that implements the array-contains-any operator. */ class Wt extends Ct {
        constructor(t, n) {
            super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return !(!Vt(n) || !n.arrayValue.values) && n.arrayValue.values.some((t => Tt(this.value.arrayValue, t)));
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
     */ class zt {
        constructor(t, n) {
            this.position = t, this.before = n;
        }
    }

    /**
     * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
     */ class Gt {
        constructor(t, n = "asc" /* ASCENDING */) {
            this.field = t, this.dir = n;
        }
    }

    function Yt(t, n) {
        return t.dir === n.dir && t.field.isEqual(n.field);
    }

    function Ht(t, n) {
        if (null === t) return null === n;
        if (null === n) return !1;
        if (t.before !== n.before || t.position.length !== n.position.length) return !1;
        for (let e = 0; e < t.position.length; e++) {
            if (!It(t.position[e], n.position[e])) return !1;
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
     */ class Kt {
        /**
         * Initializes a Query with a path and optional additional query constraints.
         * Path must currently be empty if this is a collection group query.
         */
        constructor(t, n = null, e = [], s = [], r = null, i = "F" /* First */ , o = null, u = null) {
            this.path = t, this.collectionGroup = n, this.explicitOrderBy = e, this.filters = s, 
            this.limit = r, this.limitType = i, this.startAt = o, this.endAt = u, this.F = null, 
            // The corresponding `Target` of this `Query` instance.
            this.S = null, this.startAt, this.endAt;
        }
    }

    /** Creates a new Query for a query that matches all documents at `path` */ function Jt(t) {
        return !X(t.limit) && "L" /* Last */ === t.limitType;
    }

    function Zt(t) {
        return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
    }

    function Xt(t) {
        for (const n of t.filters) if (n.D()) return n.field;
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
    function tn(t) {
        return null !== t.collectionGroup;
    }

    /**
     * Returns the implicit order by constraint that is used to execute the Query,
     * which can be different from the order by constraints the user provided (e.g.
     * the SDK and backend always orders by `__name__`).
     */ function nn(t) {
        const n = p(t);
        if (null === n.F) {
            n.F = [];
            const t = Xt(n), e = Zt(n);
            if (null !== t && null === e) 
            // In order to implicitly add key ordering, we must also add the
            // inequality filter field for it to be a valid query.
            // Note that the default inequality field and key ordering is ascending.
            t.isKeyField() || n.F.push(new Gt(t)), n.F.push(new Gt(W.keyField(), "asc" /* ASCENDING */)); else {
                let t = !1;
                for (const e of n.explicitOrderBy) n.F.push(e), e.field.isKeyField() && (t = !0);
                if (!t) {
                    // The order of the implicit key ordering always matches the last
                    // explicit order by
                    const t = n.explicitOrderBy.length > 0 ? n.explicitOrderBy[n.explicitOrderBy.length - 1].dir : "asc" /* ASCENDING */;
                    n.F.push(new Gt(W.keyField(), t));
                }
            }
        }
        return n.F;
    }

    /**
     * Converts this `Query` instance to it's corresponding `Target` representation.
     */ function en(t) {
        const n = p(t);
        if (!n.S) if ("F" /* First */ === n.limitType) n.S = Ot(n.path, n.collectionGroup, nn(n), n.filters, n.limit, n.startAt, n.endAt); else {
            // Flip the orderBy directions since we want the last results
            const t = [];
            for (const e of nn(n)) {
                const n = "desc" /* DESCENDING */ === e.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new Gt(e.field, n));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                    const e = n.endAt ? new zt(n.endAt.position, !n.endAt.before) : null, s = n.startAt ? new zt(n.startAt.position, !n.startAt.before) : null;
            // Now return as a LimitType.First query.
            n.S = Ot(n.path, n.collectionGroup, t, n.filters, n.limit, e, s);
        }
        return n.S;
    }

    function sn(t, n) {
        return function(t, n) {
            if (t.limit !== n.limit) return !1;
            if (t.orderBy.length !== n.orderBy.length) return !1;
            for (let e = 0; e < t.orderBy.length; e++) if (!Yt(t.orderBy[e], n.orderBy[e])) return !1;
            if (t.filters.length !== n.filters.length) return !1;
            for (let r = 0; r < t.filters.length; r++) if (e = t.filters[r], s = n.filters[r], 
            e.op !== s.op || !e.field.isEqual(s.field) || !It(e.value, s.value)) return !1;
            var e, s;
            return t.collectionGroup === n.collectionGroup && !!t.path.isEqual(n.path) && !!Ht(t.startAt, n.startAt) && Ht(t.endAt, n.endAt);
        }(en(t), en(n)) && t.limitType === n.limitType;
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
     */ class rn {
        constructor(t) {
            this.timestamp = t;
        }
        static fromTimestamp(t) {
            return new rn(t);
        }
        static min() {
            return new rn(new _t(0, 0));
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
     */ class on {
        constructor(t) {
            this.fields = t, 
            // TODO(dimond): validation of FieldMask
            // Sort the field mask to support `FieldMask.isEqual()` and assert below.
            t.sort(W.comparator);
        }
        /**
         * Verifies that `fieldPath` is included by at least one field in this field
         * mask.
         *
         * This is an O(n) operation, where `n` is the size of the field mask.
         */    covers(t) {
            for (const n of this.fields) if (n.isPrefixOf(t)) return !0;
            return !1;
        }
        isEqual(t) {
            return ht(this.fields, t.fields, ((t, n) => t.isEqual(n)));
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
     * An ObjectValue represents a MapValue in the Firestore Proto and offers the
     * ability to add and remove fields (via the ObjectValueBuilder).
     */ class un {
        constructor(t) {
            this.proto = t;
        }
        static empty() {
            return new un({
                mapValue: {}
            });
        }
        /**
         * Returns the value at the given path or null.
         *
         * @param path - the path to search
         * @returns The value at the path or if there it doesn't exist.
         */    field(t) {
            if (t.isEmpty()) return this.proto;
            {
                let n = this.proto;
                for (let e = 0; e < t.length - 1; ++e) {
                    if (!n.mapValue.fields) return null;
                    if (n = n.mapValue.fields[t.get(e)], !Dt(n)) return null;
                }
                return n = (n.mapValue.fields || {})[t.lastSegment()], n || null;
            }
        }
        isEqual(t) {
            return It(this.proto, t.proto);
        }
    }

    /**
     * An ObjectValueBuilder provides APIs to set and delete fields from an
     * ObjectValue.
     */ class cn {
        /**
         * @param baseObject - The object to mutate.
         */
        constructor(t = un.empty()) {
            this.q = t, 
            /** A map that contains the accumulated changes in this builder. */
            this.O = new Map;
        }
        /**
         * Sets the field to the provided value.
         *
         * @param path - The field path to set.
         * @param value - The value to set.
         * @returns The current Builder instance.
         */    set(t, n) {
            return this.C(t, n), this;
        }
        /**
         * Removes the field at the specified path. If there is no field at the
         * specified path, nothing is changed.
         *
         * @param path - The field path to remove.
         * @returns The current Builder instance.
         */    delete(t) {
            return this.C(t, null), this;
        }
        /**
         * Adds `value` to the overlay map at `path`. Creates nested map entries if
         * needed.
         */    C(t, n) {
            let e = this.O;
            for (let n = 0; n < t.length - 1; ++n) {
                const s = t.get(n);
                let r = e.get(s);
                r instanceof Map ? 
                // Re-use a previously created map
                e = r : r && 10 /* ObjectValue */ === Et(r) ? (
                // Convert the existing Protobuf MapValue into a map
                r = new Map(Object.entries(r.mapValue.fields || {})), e.set(s, r), e = r) : (
                // Create an empty map to represent the current nesting level
                r = new Map, e.set(s, r), e = r);
            }
            e.set(t.lastSegment(), n);
        }
        /** Returns an ObjectValue with all mutations applied. */    L() {
            const t = this.U(W.emptyPath(), this.O);
            return null != t ? new un(t) : this.q;
        }
        /**
         * Applies any overlays from `currentOverlays` that exist at `currentPath`
         * and returns the merged data at `currentPath` (or null if there were no
         * changes).
         *
         * @param currentPath - The path at the current nesting level. Can be set to
         * FieldValue.emptyPath() to represent the root.
         * @param currentOverlays - The overlays at the current nesting level in the
         * same format as `overlayMap`.
         * @returns The merged data at `currentPath` or null if no modifications
         * were applied.
         */    U(t, n) {
            let e = !1;
            const s = this.q.field(t), r = Dt(s) ? // If there is already data at the current path, base our
            Object.assign({}, s.mapValue.fields) : {};
            return n.forEach(((n, s) => {
                if (n instanceof Map) {
                    const i = this.U(t.child(s), n);
                    null != i && (r[s] = i, e = !0);
                } else null !== n ? (r[s] = n, e = !0) : r.hasOwnProperty(s) && (delete r[s], e = !0);
            })), e ? {
                mapValue: {
                    fields: r
                }
            } : null;
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
     */
    /**
     * Returns a value for a number that's appropriate to put into a proto.
     * The return value is an IntegerValue if it can safely represent the value,
     * otherwise a DoubleValue is returned.
     */
    function an(t, n) {
        return function(t) {
            return "number" == typeof t && Number.isInteger(t) && !tt(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
        }(n) ? 
        /**
     * Returns an IntegerValue for `value`.
     */
        function(t) {
            return {
                integerValue: "" + t
            };
        }(n) : function(t, n) {
            if (t.j) {
                if (isNaN(n)) return {
                    doubleValue: "NaN"
                };
                if (n === 1 / 0) return {
                    doubleValue: "Infinity"
                };
                if (n === -1 / 0) return {
                    doubleValue: "-Infinity"
                };
            }
            return {
                doubleValue: tt(n) ? "-0" : n
            };
        }(t, n);
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
    /** Used to represent a field transform on a mutation. */ class hn {
        constructor() {
            // Make sure that the structural type of `TransformOperation` is unique.
            // See https://github.com/microsoft/TypeScript/issues/5451
            this._ = void 0;
        }
    }

    /** Transforms a value into a server-generated timestamp. */ class ln extends hn {}

    /** Transforms an array value via a union operation. */ class fn extends hn {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    /** Transforms an array value via a remove operation. */ class dn extends hn {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    /**
     * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
     * transforms. Converts all field values to integers or doubles, but unlike the
     * backend does not cap integer values at 2^63. Instead, JavaScript number
     * arithmetic is used and precision loss can occur for values greater than 2^53.
     */ class wn extends hn {
        constructor(t, n) {
            super(), this.M = t, this.B = n;
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
    /** A field path and the TransformOperation to perform upon it. */ class mn {
        constructor(t, n) {
            this.field = t, this.transform = n;
        }
    }

    /**
     * Encodes a precondition for a mutation. This follows the model that the
     * backend accepts with the special case of an explicit "empty" precondition
     * (meaning no precondition).
     */ class pn {
        constructor(t, n) {
            this.updateTime = t, this.exists = n;
        }
        /** Creates a new empty Precondition. */    static none() {
            return new pn;
        }
        /** Creates a new Precondition with an exists flag. */    static exists(t) {
            return new pn(void 0, t);
        }
        /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
            return new pn(t);
        }
        /** Returns whether this Precondition is empty. */    get isNone() {
            return void 0 === this.updateTime && void 0 === this.exists;
        }
        isEqual(t) {
            return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
        }
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
     * SetMutation        null                  Document(v0)
     * PatchMutation      Document(v3)          Document(v3)
     * PatchMutation      NoDocument(v3)        NoDocument(v3)
     * PatchMutation      null                  null
     * DeleteMutation     Document(v3)          NoDocument(v0)
     * DeleteMutation     NoDocument(v3)        NoDocument(v0)
     * DeleteMutation     null                  NoDocument(v0)
     *
     * For acknowledged mutations, we use the updateTime of the WriteResponse as
     * the resulting version for Set and Patch mutations. As deletes have no
     * explicit update time, we use the commitTime of the WriteResponse for
     * Delete mutations.
     *
     * If a mutation is acknowledged by the backend but fails the precondition check
     * locally, we return an `UnknownDocument` and rely on Watch to send us the
     * updated version.
     *
     * Field transforms are used only with Patch and Set Mutations. We use the
     * `updateTransforms` message to store transforms, rather than the `transforms`s
     * messages.
     *
     * ## Subclassing Notes
     *
     * Subclasses of Mutation need to implement applyToRemoteDocument() and
     * applyToLocalView() to implement the actual behavior of applying the mutation
     * to some source document.
     */ class yn {}

    /**
     * A mutation that creates or replaces the document at the given key with the
     * object value contents.
     */ class _n extends yn {
        constructor(t, n, e, s = []) {
            super(), this.key = t, this.value = n, this.precondition = e, this.fieldTransforms = s, 
            this.type = 0 /* Set */;
        }
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
     */ class gn extends yn {
        constructor(t, n, e, s, r = []) {
            super(), this.key = t, this.data = n, this.fieldMask = e, this.precondition = s, 
            this.fieldTransforms = r, this.type = 1 /* Patch */;
        }
    }

    /** A mutation that deletes the document at the given key. */ class bn extends yn {
        constructor(t, n) {
            super(), this.key = t, this.precondition = n, this.type = 2 /* Delete */ , this.fieldTransforms = [];
        }
    }

    /**
     * A mutation that verifies the existence of the document at the given key with
     * the provided precondition.
     *
     * The `verify` operation is only used in Transactions, and this class serves
     * primarily to facilitate serialization into protos.
     */ class vn extends yn {
        constructor(t, n) {
            super(), this.key = t, this.precondition = n, this.type = 3 /* Verify */ , this.fieldTransforms = [];
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
     */ const En = (() => {
        const t = {
            asc: "ASCENDING",
            desc: "DESCENDING"
        };
        return t;
    })(), In = (() => {
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
    class Tn {
        constructor(t, n) {
            this.databaseId = t, this.j = n;
        }
    }

    /**
     * Returns a value for a number (or null) that's appropriate to put into
     * a google.protobuf.Int32Value proto.
     * DO NOT USE THIS FOR ANYTHING ELSE.
     * This method cheats. It's typed as returning "number" because that's what
     * our generated proto interfaces say Int32Value must be. But GRPC actually
     * expects a { value: <number> } struct.
     */
    /**
     * Returns a value for a Date that's appropriate to put into a proto.
     */
    function An(t, n) {
        if (t.j) {
            return `${new Date(1e3 * n.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + n.nanoseconds).slice(-9)}Z`;
        }
        return {
            seconds: "" + n.seconds,
            nanos: n.nanoseconds
        };
    }

    /**
     * Returns a value for bytes that's appropriate to put in a proto.
     *
     * Visible for testing.
     */
    function Pn(t, n) {
        return t.j ? n.toBase64() : n.toUint8Array();
    }

    function Rn(t, n) {
        return An(t, n.toTimestamp());
    }

    function Vn(t) {
        return m(!!t), rn.fromTimestamp(function(t) {
            const n = mt(t);
            return new _t(n.seconds, n.nanos);
        }(t));
    }

    function Nn(t, n) {
        return function(t) {
            return new k([ "projects", t.projectId, "databases", t.database ]);
        }(t).child("documents").child(n).canonicalString();
    }

    function $n(t, n) {
        return Nn(t.databaseId, n.path);
    }

    function Dn(t, n) {
        const e = function(t) {
            const n = k.fromString(t);
            return m(kn(n)), n;
        }(n);
        if (e.get(1) !== t.databaseId.projectId) throw new x(b, "Tried to deserialize key from different project: " + e.get(1) + " vs " + t.databaseId.projectId);
        if (e.get(3) !== t.databaseId.database) throw new x(b, "Tried to deserialize key from different database: " + e.get(3) + " vs " + t.databaseId.database);
        return new z((m((s = e).length > 4 && "documents" === s.get(4)), s.popFirst(5)));
        var s;
        /** Creates a Document proto from key and fields (but no create/update time) */}

    function Fn(t, n) {
        return Nn(t.databaseId, n);
    }

    function Sn(t) {
        return new k([ "projects", t.databaseId.projectId, "databases", t.databaseId.database ]).canonicalString();
    }

    function xn(t, n, e) {
        return {
            name: $n(t, n),
            fields: e.proto.mapValue.fields
        };
    }

    function qn(t, n) {
        return "found" in n ? function(t, n) {
            m(!!n.found), n.found.name, n.found.updateTime;
            const e = Dn(t, n.found.name), s = Vn(n.found.updateTime), r = new un({
                mapValue: {
                    fields: n.found.fields
                }
            });
            return new St(e, s, r, {});
        }(t, n) : "missing" in n ? function(t, n) {
            m(!!n.missing), m(!!n.readTime);
            const e = Dn(t, n.missing), s = Vn(n.readTime);
            return new xt(e, s);
        }(t, n) : w();
    }

    function On(t, n) {
        let e;
        if (n instanceof _n) e = {
            update: xn(t, n.key, n.value)
        }; else if (n instanceof bn) e = {
            delete: $n(t, n.key)
        }; else if (n instanceof gn) e = {
            update: xn(t, n.key, n.data),
            updateMask: Bn(n.fieldMask)
        }; else {
            if (!(n instanceof vn)) return w();
            e = {
                verify: $n(t, n.key)
            };
        }
        return n.fieldTransforms.length > 0 && (e.updateTransforms = n.fieldTransforms.map((t => function(t, n) {
            const e = n.transform;
            if (e instanceof ln) return {
                fieldPath: n.field.canonicalString(),
                setToServerValue: "REQUEST_TIME"
            };
            if (e instanceof fn) return {
                fieldPath: n.field.canonicalString(),
                appendMissingElements: {
                    values: e.elements
                }
            };
            if (e instanceof dn) return {
                fieldPath: n.field.canonicalString(),
                removeAllFromArray: {
                    values: e.elements
                }
            };
            if (e instanceof wn) return {
                fieldPath: n.field.canonicalString(),
                increment: e.B
            };
            throw w();
        }(0, t)))), n.precondition.isNone || (e.currentDocument = function(t, n) {
            return void 0 !== n.updateTime ? {
                updateTime: Rn(t, n.updateTime)
            } : void 0 !== n.exists ? {
                exists: n.exists
            } : w();
        }(t, n.precondition)), e;
    }

    function Cn(t, n) {
        // Dissect the path into parent, collectionId, and optional key filter.
        const e = {
            structuredQuery: {}
        }, s = n.path;
        null !== n.collectionGroup ? (e.parent = Fn(t, s), e.structuredQuery.from = [ {
            collectionId: n.collectionGroup,
            allDescendants: !0
        } ]) : (e.parent = Fn(t, s.popLast()), e.structuredQuery.from = [ {
            collectionId: s.lastSegment()
        } ]);
        const r = function(t) {
            if (0 === t.length) return;
            const n = t.map((t => 
            // visible for testing
            function(t) {
                if ("==" /* EQUAL */ === t.op) {
                    if ($t(t.value)) return {
                        unaryFilter: {
                            field: Mn(t.field),
                            op: "IS_NAN"
                        }
                    };
                    if (Nt(t.value)) return {
                        unaryFilter: {
                            field: Mn(t.field),
                            op: "IS_NULL"
                        }
                    };
                } else if ("!=" /* NOT_EQUAL */ === t.op) {
                    if ($t(t.value)) return {
                        unaryFilter: {
                            field: Mn(t.field),
                            op: "IS_NOT_NAN"
                        }
                    };
                    if (Nt(t.value)) return {
                        unaryFilter: {
                            field: Mn(t.field),
                            op: "IS_NOT_NULL"
                        }
                    };
                }
                return {
                    fieldFilter: {
                        field: Mn(t.field),
                        op: jn(t.op),
                        value: t.value
                    }
                };
            }(t)));
            if (1 === n.length) return n[0];
            return {
                compositeFilter: {
                    op: "AND",
                    filters: n
                }
            };
        }(n.filters);
        r && (e.structuredQuery.where = r);
        const i = function(t) {
            if (0 === t.length) return;
            return t.map((t => 
            // visible for testing
            function(t) {
                return {
                    field: Mn(t.field),
                    direction: Un(t.dir)
                };
            }(t)));
        }(n.orderBy);
        i && (e.structuredQuery.orderBy = i);
        const o = function(t, n) {
            return t.j || X(n) ? n : {
                value: n
            };
        }(t, n.limit);
        return null !== o && (e.structuredQuery.limit = o), n.startAt && (e.structuredQuery.startAt = Ln(n.startAt)), 
        n.endAt && (e.structuredQuery.endAt = Ln(n.endAt)), e;
    }

    function Ln(t) {
        return {
            before: t.before,
            values: t.position
        };
    }

    // visible for testing
    function Un(t) {
        return En[t];
    }

    // visible for testing
    function jn(t) {
        return In[t];
    }

    function Mn(t) {
        return {
            fieldPath: t.canonicalString()
        };
    }

    function Bn(t) {
        const n = [];
        return t.fields.forEach((t => n.push(t.canonicalString()))), {
            fieldPaths: n
        };
    }

    function kn(t) {
        // Resource names have at least 4 components (project ID, database ID)
        return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
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
     */ function Qn(t) {
        return new Tn(t, /* useProto3Json= */ !0);
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
     * A helper for running delayed tasks following an exponential backoff curve
     * between attempts.
     *
     * Each delay is made up of a "base" delay which follows the exponential
     * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
     * base delay. This prevents clients from accidentally synchronizing their
     * delays causing spikes of load to the backend.
     */
    class Wn {
        constructor(
        /**
         * The AsyncQueue to run backoff operations on.
         */
        t, 
        /**
         * The ID to use when scheduling backoff operations on the AsyncQueue.
         */
        n, 
        /**
         * The initial delay (used as the base delay on the first retry attempt).
         * Note that jitter will still be applied, so the actual delay could be as
         * little as 0.5*initialDelayMs.
         */
        e = 1e3
        /**
         * The multiplier to use to determine the extended base delay after each
         * attempt.
         */ , s = 1.5
        /**
         * The maximum base delay after which no further backoff is performed.
         * Note that jitter will still be applied, so the actual delay could be as
         * much as 1.5*maxDelayMs.
         */ , r = 6e4) {
            this.k = t, this.timerId = n, this.W = e, this.G = s, this.Y = r, this.H = 0, this.K = null, 
            /** The last backoff attempt, as epoch milliseconds. */
            this.J = Date.now(), this.reset();
        }
        /**
         * Resets the backoff delay.
         *
         * The very next backoffAndWait() will have no delay. If it is called again
         * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
         * subsequent ones will increase according to the backoffFactor.
         */    reset() {
            this.H = 0;
        }
        /**
         * Resets the backoff delay to the maximum delay (e.g. for use after a
         * RESOURCE_EXHAUSTED error).
         */    Z() {
            this.H = this.Y;
        }
        /**
         * Returns a promise that resolves after currentDelayMs, and increases the
         * delay for any subsequent attempts. If there was a pending backoff operation
         * already, it will be canceled.
         */    X(t) {
            // Cancel any pending backoff operation.
            this.cancel();
            // First schedule using the current base (which may be 0 and should be
            // honored as such).
            const n = Math.floor(this.H + this.tt()), e = Math.max(0, Date.now() - this.J), s = Math.max(0, n - e);
            // Guard against lastAttemptTime being in the future due to a clock change.
                    s > 0 && h("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.H} ms, delay with jitter: ${n} ms, last attempt: ${e} ms ago)`), 
            this.K = this.k.enqueueAfterDelay(this.timerId, s, (() => (this.J = Date.now(), 
            t()))), 
            // Apply backoff factor to determine next delay and ensure it is within
            // bounds.
            this.H *= this.G, this.H < this.W && (this.H = this.W), this.H > this.Y && (this.H = this.Y);
        }
        nt() {
            null !== this.K && (this.K.skipDelay(), this.K = null);
        }
        cancel() {
            null !== this.K && (this.K.cancel(), this.K = null);
        }
        /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    tt() {
            return (Math.random() - .5) * this.H;
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
    class zn extends class {} {
        constructor(t, n, e) {
            super(), this.credentials = t, this.et = n, this.M = e, this.st = !1;
        }
        rt() {
            if (this.st) throw new x(R, "The client has already been terminated.");
        }
        /** Gets an auth token and invokes the provided RPC. */    p(t, n, e) {
            return this.rt(), this.credentials.getToken().then((s => this.et.p(t, n, e, s))).catch((t => {
                throw t.code === A && this.credentials.invalidateToken(), t;
            }));
        }
        /** Gets an auth token and invokes the provided RPC with streamed results. */    T(t, n, e) {
            return this.rt(), this.credentials.getToken().then((s => this.et.T(t, n, e, s))).catch((t => {
                throw t.code === A && this.credentials.invalidateToken(), t;
            }));
        }
        terminate() {
            this.st = !1;
        }
    }

    // TODO(firestorexp): Make sure there is only one Datastore instance per
    // firestore-exp client.
    async function Gn(t, n) {
        const e = p(t), s = Sn(e.M) + "/documents", r = {
            writes: n.map((t => On(e.M, t)))
        };
        await e.p("Commit", s, r);
    }

    async function Yn(t, n) {
        const e = p(t), s = Sn(e.M) + "/documents", r = {
            documents: n.map((t => $n(e.M, t)))
        }, i = await e.T("BatchGetDocuments", s, r), o = new Map;
        i.forEach((t => {
            const n = qn(e.M, t);
            o.set(n.key.toString(), n);
        }));
        const u = [];
        return n.forEach((t => {
            const n = o.get(t.toString());
            m(!!n), u.push(n);
        })), u;
    }

    async function Hn(t, n) {
        const e = p(t), s = Cn(e.M, en(n));
        return (await e.T("RunQuery", s.parent, {
            structuredQuery: s.structuredQuery
        })).filter((t => !!t.document)).map((t => function(t, n, e) {
            const s = Dn(t, n.name), r = Vn(n.updateTime), i = new un({
                mapValue: {
                    fields: n.fields
                }
            });
            return new St(s, r, i, {
                hasCommittedMutations: !!e
            });
        }(e.M, t.document, void 0)));
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
     */ const Kn = new Map;

    /**
     * An instance map that ensures only one Datastore exists per Firestore
     * instance.
     */
    /**
     * Returns an initialized and started Datastore for the given Firestore
     * instance. Callers must invoke removeComponents() when the Firestore
     * instance is terminated.
     */
    function Jn(t) {
        if (t._terminated) throw new x(R, "The client has already been terminated.");
        if (!Kn.has(t)) {
            h("ComponentProvider", "Initializing Datastore");
            const r = function(t) {
                return new it(t, fetch.bind(null));
            }((n = t._databaseId, e = t._persistenceKey, s = t._freezeSettings(), new j(n, e, s.host, s.ssl, s.experimentalForceLongPolling, s.experimentalAutoDetectLongPolling))), i = Qn(t._databaseId), o = function(t, n, e) {
                return new zn(t, n, e);
            }(t._credentials, r, i);
            Kn.set(t, o);
        }
        var n, e, s;
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
     */    return Kn.get(t);
    }

    /**
     * Removes all components associated with the provided instance. Must be called
     * when the `Firestore` instance is terminated.
     */
    /**
     * A concrete type describing all the values that can be applied via a
     * user-supplied firestore.Settings object. This is a separate type so that
     * defaults can be supplied and the value can be checked for equality.
     */
    class Zn {
        constructor(t) {
            var n;
            if (void 0 === t.host) {
                if (void 0 !== t.ssl) throw new x(b, "Can't provide ssl option if host option is not set");
                this.host = "firestore.googleapis.com", this.ssl = true;
            } else this.host = t.host, this.ssl = null === (n = t.ssl) || void 0 === n || n;
            if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
            void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
                if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new x(b, "cacheSizeBytes must be at least 1048576");
                this.cacheSizeBytes = t.cacheSizeBytes;
            }
            this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
            function(t, n, e, s) {
                if (!0 === n && !0 === s) throw new x(b, `${t} and ${e} cannot be used together.`);
            }("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
        }
        isEqual(t) {
            return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties;
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
     */ class Xn {
        /** @hideconstructor */
        constructor(t, n) {
            this._persistenceKey = "(lite)", this._settings = new Zn({}), this._settingsFrozen = !1, 
            t instanceof M ? (this._databaseId = t, this._credentials = new O) : (this._app = t, 
            this._databaseId = function(t) {
                if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new x(b, '"projectId" not provided in firebase.initializeApp.');
                return new M(t.options.projectId);
            }
            /**
     * Initializes a new instance of Cloud Firestore with the provided settings.
     * Can only be called before any other functions, including
     * {@link getFirestore}. If the custom settings are empty, this function is
     * equivalent to calling {@link getFirestore}.
     *
     * @param app - The {@link FirebaseApp} with which the `Firestore` instance will
     * be associated.
     * @param settings - A settings object to configure the `Firestore` instance.
     * @returns A newly initialized Firestore instance.
     */ (t), this._credentials = new C(n));
        }
        /**
         * The {@link FirebaseApp} associated with this `Firestore` service
         * instance.
         */    get app() {
            if (!this._app) throw new x(R, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this._app;
        }
        get _initialized() {
            return this._settingsFrozen;
        }
        get _terminated() {
            return void 0 !== this._terminateTask;
        }
        _setSettings(t) {
            if (this._settingsFrozen) throw new x(R, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
            this._settings = new Zn(t), void 0 !== t.credentials && (this._credentials = function(t) {
                if (!t) return new O;
                switch (t.type) {
                  case "gapi":
                    const n = t.client;
                    // Make sure this really is a Gapi client.
                                    return m(!("object" != typeof n || null === n || !n.auth || !n.auth.getAuthHeaderValueForFirstParty)), 
                    new U(n, t.sessionIndex || "0");

                  case "provider":
                    return t.client;

                  default:
                    throw new x(b, "makeCredentialsProvider failed due to invalid credential type");
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
        toJSON() {
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
            return function(t) {
                const n = Kn.get(t);
                n && (h("ComponentProvider", "Removing Datastore"), Kn.delete(t), n.terminate());
            }(this), Promise.resolve();
        }
    }

    function te(n, e) {
        const s = app._getProvider(n, "firestore/lite");
        if (s.isInitialized()) throw new x(R, "Firestore can only be initialized once per app.");
        return s.initialize({
            options: e
        });
    }

    /**
     * Returns the existing instance of Firestore that is associated with the
     * provided {@link FirebaseApp}. If no instance exists, initializes a new
     * instance with default settings.
     *
     * @param app - The {@link FirebaseApp} instance that the returned Firestore
     * instance is associated with.
     * @returns The `Firestore` instance of the provided app.
     */ function ne(n) {
        return app._getProvider(n, "firestore/lite").getImmediate();
    }

    /**
     * Modify this instance to communicate with the Cloud Firestore emulator.
     *
     * Note: This must be called before this instance has been used to do any
     * operations.
     *
     * @param firestore - The Firestore instance to configure to connect to the
     * emulator.
     * @param host - the emulator host (ex: localhost).
     * @param port - the emulator port (ex: 9000).
     */ function ee(t, n, e) {
        const s = (t = J(t, Xn))._getSettings();
        "firestore.googleapis.com" !== s.host && s.host !== n && f("Host has been set in both settings() and useEmulator(), emulator host will be used"), 
        t._setSettings(Object.assign(Object.assign({}, s), {
            host: `${n}:${e}`,
            ssl: !1
        }));
    }

    /**
     * Terminates the provided Firestore instance.
     *
     * After calling `terminate()` only the `clearIndexedDbPersistence()` functions
     * may be used. Any other function will throw a `FirestoreError`. Termination
     * does not cancel any pending writes, and any promises that are awaiting a
     * response from the server will not be resolved.
     *
     * To restart after termination, create a new instance of FirebaseFirestore with
     * {@link getFirestore}.
     *
     * Note: Under normal circumstances, calling `terminate()` is not required. This
     * function is useful only when you want to force this instance to release all of
     * its resources or in combination with {@link clearIndexedDbPersistence} to
     * ensure that all local state is destroyed between test runs.
     *
     * @param firestore - The Firestore instance to terminate.
     * @returns A promise that is resolved when the instance has been successfully
     * terminated.
     */ function se(t) {
        return t = J(t, Xn), app._removeServiceInstance(t.app, "firestore/lite"), t._delete();
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
     * A class implemented by all API types of the legacy Firestore API which
     * contains a reference to the API type in the firestore-exp API. All internal
     * code unwraps these references, which allows us to only use firestore-exp
     * types in the SDK.
     */
    class re {
        constructor(t) {
            this._delegate = t;
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
     */ class ie {
        /** @hideconstructor */
        constructor(t, n, e) {
            this._converter = n, this._key = e, 
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
            return new ue(this.firestore, this._converter, this._key.path.popLast());
        }
        withConverter(t) {
            return new ie(this.firestore, t, this._key);
        }
    }

    /**
     * A `Query` refers to a Query which you can read or listen to. You can also
     * construct refined `Query` objects by adding filters and ordering.
     */ class oe {
        // This is the lite version of the Query class in the main SDK.
        /** @hideconstructor protected */
        constructor(t, n, e) {
            this._converter = n, this._query = e, 
            /** The type of this Firestore reference. */
            this.type = "query", this.firestore = t;
        }
        withConverter(t) {
            return new oe(this.firestore, t, this._query);
        }
    }

    /**
     * A `CollectionReference` object can be used for adding documents, getting
     * document references, and querying for documents (using {@link query}).
     */ class ue extends oe {
        /** @hideconstructor */
        constructor(t, n, e) {
            super(t, n, new Kt(e)), this.firestore = t, this._path = e, this.type = "collection";
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
            return t.isEmpty() ? null : new ie(this.firestore, 
            /* converter= */ null, new z(t));
        }
        withConverter(t) {
            return new ue(this.firestore, t, this._path);
        }
    }

    function ce(t, n, ...e) {
        if (t instanceof re && (t = t._delegate), G("collection", "path", n), t instanceof Xn) {
            const s = k.fromString(n, ...e);
            return H(s), new ue(t, /* converter= */ null, s);
        }
        {
            if (!(t instanceof ie || t instanceof ue)) throw new x(b, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = k.fromString(t.path, ...e).child(k.fromString(n));
            return H(s), new ue(t.firestore, 
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
     * @param firestore - A reference to the root Firestore instance.
     * @param collectionId - Identifies the collections to query over. Every
     * collection or subcollection with this ID as the last segment of its path
     * will be included. Cannot contain a slash.
     * @returns The created `Query`.
     */ function ae(t, n) {
        if (t = J(t, Xn), G("collectionGroup", "collection id", n), n.indexOf("/") >= 0) throw new x(b, `Invalid collection ID '${n}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
        return new oe(t, 
        /* converter= */ null, 
        /**
     * Creates a new Query for a collection group query that matches all documents
     * within the provided collection group.
     */
        function(t) {
            return new Kt(k.emptyPath(), t);
        }(n));
    }

    function he(t, n, ...e) {
        if (t instanceof re && (t = t._delegate), 
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        1 === arguments.length && (n = ct.R()), G("doc", "path", n), t instanceof Xn) {
            const s = k.fromString(n, ...e);
            return Y(s), new ie(t, 
            /* converter= */ null, new z(s));
        }
        {
            if (!(t instanceof ie || t instanceof ue)) throw new x(b, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = t._path.child(k.fromString(n, ...e));
            return Y(s), new ie(t.firestore, t instanceof ue ? t._converter : null, new z(s));
        }
    }

    /**
     * Returns true if the provided references are equal.
     *
     * @param left - A reference to compare.
     * @param right - A reference to compare.
     * @returns true if the references point to the same location in the same
     * Firestore database.
     */ function le(t, n) {
        return t instanceof re && (t = t._delegate), n instanceof re && (n = n._delegate), 
        (t instanceof ie || t instanceof ue) && (n instanceof ie || n instanceof ue) && (t.firestore === n.firestore && t.path === n.path && t._converter === n._converter);
    }

    /**
     * Returns true if the provided queries point to the same collection and apply
     * the same constraints.
     *
     * @param left - A `Query` to compare.
     * @param right - A `Query` to compare.
     * @returns true if the references point to the same location in the same
     * Firestore database.
     */ function fe(t, n) {
        return t instanceof re && (t = t._delegate), n instanceof re && (n = n._delegate), 
        t instanceof oe && n instanceof oe && (t.firestore === n.firestore && sn(t._query, n._query) && t._converter === n._converter);
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
     */ class de {
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
                return new de(dt.fromBase64String(t));
            } catch (t) {
                throw new x(b, "Failed to construct data from Base64 string: " + t);
            }
        }
        /**
         * Creates a new `Bytes` object from the given Uint8Array.
         *
         * @param array - The Uint8Array used to create the `Bytes` object.
         */    static fromUint8Array(t) {
            return new de(dt.fromUint8Array(t));
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
     * A `FieldPath` refers to a field in a document. The path may consist of a
     * single field name (referring to a top-level field in the document), or a
     * list of field names (referring to a nested field in the document).
     *
     * Create a `FieldPath` by providing field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     */ class we {
        /**
         * Creates a FieldPath from the provided field names. If more than one field
         * name is provided, the path will point to a nested field in a document.
         *
         * @param fieldNames - A list of field names.
         */
        constructor(...t) {
            for (let n = 0; n < t.length; ++n) if (0 === t[n].length) throw new x(b, "Invalid field name at argument $(i + 1). Field names must not be empty.");
            this._internalPath = new W(t);
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
     */ function me() {
        return new we("__name__");
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
     */ class pe {
        /**
         * @param _methodName - The public API endpoint that returns this class.
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
     */ class ye {
        /**
         * Creates a new immutable `GeoPoint` object with the provided latitude and
         * longitude values.
         * @param latitude - The latitude as number between -90 and 90.
         * @param longitude - The longitude as number between -180 and 180.
         */
        constructor(t, n) {
            if (!isFinite(t) || t < -90 || t > 90) throw new x(b, "Latitude must be a number between -90 and 90, but was: " + t);
            if (!isFinite(n) || n < -180 || n > 180) throw new x(b, "Longitude must be a number between -180 and 180, but was: " + n);
            this._lat = t, this._long = n;
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
        toJSON() {
            return {
                latitude: this._lat,
                longitude: this._long
            };
        }
        /**
         * Actually private to JS consumers of our API, so this function is prefixed
         * with an underscore.
         */    _compareTo(t) {
            return at(this._lat, t._lat) || at(this._long, t._long);
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
     */ const _e = /^__.*__$/;

    /** The result of parsing document data (e.g. for a setData call). */ class ge {
        constructor(t, n, e) {
            this.data = t, this.fieldMask = n, this.fieldTransforms = e;
        }
        toMutation(t, n) {
            return null !== this.fieldMask ? new gn(t, this.data, this.fieldMask, n, this.fieldTransforms) : new _n(t, this.data, n, this.fieldTransforms);
        }
    }

    /** The result of parsing "update" data (i.e. for an updateData call). */ class be {
        constructor(t, 
        // The fieldMask does not include document transforms.
        n, e) {
            this.data = t, this.fieldMask = n, this.fieldTransforms = e;
        }
        toMutation(t, n) {
            return new gn(t, this.data, this.fieldMask, n, this.fieldTransforms);
        }
    }

    function ve(t) {
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
            throw w();
        }
    }

    /** A "context" object passed around while parsing user data. */ class Ee {
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
        constructor(t, n, e, s, r, i) {
            this.settings = t, this.databaseId = n, this.M = e, this.ignoreUndefinedProperties = s, 
            // Minor hack: If fieldTransforms is undefined, we assume this is an
            // external call and we need to validate the entire path.
            void 0 === r && this.it(), this.fieldTransforms = r || [], this.fieldMask = i || [];
        }
        get path() {
            return this.settings.path;
        }
        get ot() {
            return this.settings.ot;
        }
        /** Returns a new context with the specified settings overwritten. */    ut(t) {
            return new Ee(Object.assign(Object.assign({}, this.settings), t), this.databaseId, this.M, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
        }
        ct(t) {
            var n;
            const e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t), s = this.ut({
                path: e,
                at: !1
            });
            return s.ht(t), s;
        }
        lt(t) {
            var n;
            const e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t), s = this.ut({
                path: e,
                at: !1
            });
            return s.it(), s;
        }
        ft(t) {
            // TODO(b/34871131): We don't support array paths right now; so make path
            // undefined.
            return this.ut({
                path: void 0,
                at: !0
            });
        }
        dt(t) {
            return Be(t, this.settings.methodName, this.settings.wt || !1, this.path, this.settings.yt);
        }
        /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
            return void 0 !== this.fieldMask.find((n => t.isPrefixOf(n))) || void 0 !== this.fieldTransforms.find((n => t.isPrefixOf(n.field)));
        }
        it() {
            // TODO(b/34871131): Remove null check once we have proper paths for fields
            // within arrays.
            if (this.path) for (let t = 0; t < this.path.length; t++) this.ht(this.path.get(t));
        }
        ht(t) {
            if (0 === t.length) throw this.dt("Document fields must not be empty");
            if (ve(this.ot) && _e.test(t)) throw this.dt('Document fields cannot begin and end with "__"');
        }
    }

    /**
     * Helper for parsing raw user input (provided via the API) into internal model
     * classes.
     */ class Ie {
        constructor(t, n, e) {
            this.databaseId = t, this.ignoreUndefinedProperties = n, this.M = e || Qn(t);
        }
        /** Creates a new top-level parse context. */    _t(t, n, e, s = !1) {
            return new Ee({
                ot: t,
                methodName: n,
                yt: e,
                path: W.emptyPath(),
                at: !1,
                wt: s
            }, this.databaseId, this.M, this.ignoreUndefinedProperties);
        }
    }

    function Te(t) {
        const n = t._freezeSettings(), e = Qn(t._databaseId);
        return new Ie(t._databaseId, !!n.ignoreUndefinedProperties, e);
    }

    /** Parse document data from a set() call. */ function Ae(t, n, e, s, r, i = {}) {
        const o = t._t(i.merge || i.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , n, e, r);
        Le("Data must be an object, but it was:", o, s);
        const u = Oe(s, o);
        let c, a;
        if (i.merge) c = new on(o.fieldMask), a = o.fieldTransforms; else if (i.mergeFields) {
            const t = [];
            for (const s of i.mergeFields) {
                const r = Ue(n, s, e);
                if (!o.contains(r)) throw new x(b, `Field '${r}' is specified in your field mask but missing from your input data.`);
                ke(t, r) || t.push(r);
            }
            c = new on(t), a = o.fieldTransforms.filter((t => c.covers(t.field)));
        } else c = null, a = o.fieldTransforms;
        return new ge(new un(u), c, a);
    }

    class Pe extends pe {
        _toFieldTransform(t) {
            if (2 /* MergeSet */ !== t.ot) throw 1 /* Update */ === t.ot ? t.dt(`${this._methodName}() can only appear at the top level of your update data`) : t.dt(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
            // No transform to add for a delete, but we need to add it to our
            // fieldMask so it gets deleted.
            return t.fieldMask.push(t.path), null;
        }
        isEqual(t) {
            return t instanceof Pe;
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
     */ function Re(t, n, e) {
        return new Ee({
            ot: 3 /* Argument */ ,
            yt: n.settings.yt,
            methodName: t._methodName,
            at: e
        }, n.databaseId, n.M, n.ignoreUndefinedProperties);
    }

    class Ve extends pe {
        _toFieldTransform(t) {
            return new mn(t.path, new ln);
        }
        isEqual(t) {
            return t instanceof Ve;
        }
    }

    class Ne extends pe {
        constructor(t, n) {
            super(t), this.gt = n;
        }
        _toFieldTransform(t) {
            const n = Re(this, t, 
            /*array=*/ !0), e = this.gt.map((t => qe(t, n))), s = new fn(e);
            return new mn(t.path, s);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class $e extends pe {
        constructor(t, n) {
            super(t), this.gt = n;
        }
        _toFieldTransform(t) {
            const n = Re(this, t, 
            /*array=*/ !0), e = this.gt.map((t => qe(t, n))), s = new dn(e);
            return new mn(t.path, s);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class De extends pe {
        constructor(t, n) {
            super(t), this.bt = n;
        }
        _toFieldTransform(t) {
            const n = new wn(t.M, an(t.M, this.bt));
            return new mn(t.path, n);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    /** Parse update data from an update() call. */ function Fe(t, n, e, s) {
        const r = t._t(1 /* Update */ , n, e);
        Le("Data must be an object, but it was:", r, s);
        const i = [], o = new cn;
        ft(s, ((t, s) => {
            const u = Me(n, t, e);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    s instanceof re && (s = s._delegate);
            const c = r.lt(u);
            if (s instanceof Pe) 
            // Add it to the field mask, but don't add anything to updateData.
            i.push(u); else {
                const t = qe(s, c);
                null != t && (i.push(u), o.set(u, t));
            }
        }));
        const u = new on(i);
        return new be(o.L(), u, r.fieldTransforms);
    }

    /** Parse update data from a list of field/value arguments. */ function Se(t, n, e, s, r, i) {
        const o = t._t(1 /* Update */ , n, e), u = [ Ue(n, s, e) ], c = [ r ];
        if (i.length % 2 != 0) throw new x(b, `Function ${n}() needs to be called with an even number of arguments that alternate between field names and values.`);
        for (let t = 0; t < i.length; t += 2) u.push(Ue(n, i[t])), c.push(i[t + 1]);
        const a = [], h = new cn;
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (let t = u.length - 1; t >= 0; --t) if (!ke(a, u[t])) {
            const n = u[t];
            let e = c[t];
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    e instanceof re && (e = e._delegate);
            const s = o.lt(n);
            if (e instanceof Pe) 
            // Add it to the field mask, but don't add anything to updateData.
            a.push(n); else {
                const t = qe(e, s);
                null != t && (a.push(n), h.set(n, t));
            }
        }
        const l = new on(a);
        return new be(h.L(), l, o.fieldTransforms);
    }

    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays - Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */ function xe(t, n, e, s = !1) {
        return qe(e, t._t(s ? 4 /* ArrayArgument */ : 3 /* Argument */ , n));
    }

    /**
     * Parses user data to Protobuf Values.
     *
     * @param input - Data to be parsed.
     * @param context - A context object representing the current path being parsed,
     * the source of the data being parsed, etc.
     * @returns The parsed value, or null if the value was a FieldValue sentinel
     * that should not be included in the resulting parsed data.
     */ function qe(t, n) {
        if (
        // Unwrap the API type from the Compat SDK. This will return the API type
        // from firestore-exp.
        t instanceof re && (t = t._delegate), Ce(t)) return Le("Unsupported field value:", n, t), 
        Oe(t, n);
        if (t instanceof pe) 
        // FieldValues usually parse into transforms (except FieldValue.delete())
        // in which case we do not want to include this field in our parsed data
        // (as doing so will overwrite the field directly prior to the transform
        // trying to transform it). So we don't add this location to
        // context.fieldMask and we return null as our parsing result.
        /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
        return function(t, n) {
            // Sentinels are only supported with writes, and not within arrays.
            if (!ve(n.ot)) throw n.dt(`${t._methodName}() can only be used with update() and set()`);
            if (!n.path) throw n.dt(`${t._methodName}() is not currently supported inside arrays`);
            const e = t._toFieldTransform(n);
            e && n.fieldTransforms.push(e);
        }
        /**
     * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
     *
     * @returns The parsed value
     */ (t, n), null;
        if (void 0 === t && n.ignoreUndefinedProperties) 
        // If the input is undefined it can never participate in the fieldMask, so
        // don't handle this below. If `ignoreUndefinedProperties` is false,
        // `parseScalarValue` will reject an undefined value.
        return null;
        if (
        // If context.path is null we are inside an array and we don't support
        // field mask paths more granular than the top-level array.
        n.path && n.fieldMask.push(n.path), t instanceof Array) {
            // TODO(b/34871131): Include the path containing the array in the error
            // message.
            // In the case of IN queries, the parsed data is an array (representing
            // the set of values to be included for the IN query) that may directly
            // contain additional arrays (each representing an individual field
            // value), so we disable this validation.
            if (n.settings.at && 4 /* ArrayArgument */ !== n.ot) throw n.dt("Nested arrays are not supported");
            return function(t, n) {
                const e = [];
                let s = 0;
                for (const r of t) {
                    let t = qe(r, n.ft(s));
                    null == t && (
                    // Just include nulls in the array for fields being replaced with a
                    // sentinel.
                    t = {
                        nullValue: "NULL_VALUE"
                    }), e.push(t), s++;
                }
                return {
                    arrayValue: {
                        values: e
                    }
                };
            }(t, n);
        }
        return function(t, n) {
            t instanceof re && (t = t._delegate);
            if (null === t) return {
                nullValue: "NULL_VALUE"
            };
            if ("number" == typeof t) return an(n.M, t);
            if ("boolean" == typeof t) return {
                booleanValue: t
            };
            if ("string" == typeof t) return {
                stringValue: t
            };
            if (t instanceof Date) {
                const e = _t.fromDate(t);
                return {
                    timestampValue: An(n.M, e)
                };
            }
            if (t instanceof _t) {
                // Firestore backend truncates precision down to microseconds. To ensure
                // offline mode works the same with regards to truncation, perform the
                // truncation immediately without waiting for the backend to do that.
                const e = new _t(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
                return {
                    timestampValue: An(n.M, e)
                };
            }
            if (t instanceof ye) return {
                geoPointValue: {
                    latitude: t.latitude,
                    longitude: t.longitude
                }
            };
            if (t instanceof de) return {
                bytesValue: Pn(n.M, t._byteString)
            };
            if (t instanceof ie) {
                const e = n.databaseId, s = t.firestore._databaseId;
                if (!s.isEqual(e)) throw n.dt(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${e.projectId}/${e.database}`);
                return {
                    referenceValue: Nn(t.firestore._databaseId || n.databaseId, t._key.path)
                };
            }
            throw n.dt(`Unsupported field value: ${K(t)}`);
        }
        /**
     * Checks whether an object looks like a JSON object that should be converted
     * into a struct. Normal class/prototype instances are considered to look like
     * JSON objects since they should be converted to a struct value. Arrays, Dates,
     * GeoPoints, etc. are not considered to look like JSON objects since they map
     * to specific FieldValue types other than ObjectValue.
     */ (t, n);
    }

    function Oe(t, n) {
        const e = {};
        return !function(t) {
            for (const n in t) if (Object.prototype.hasOwnProperty.call(t, n)) return !1;
            return !0;
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
        /** Converts a Base64 encoded string to a binary string. */ (t) ? ft(t, ((t, s) => {
            const r = qe(s, n.ct(t));
            null != r && (e[t] = r);
        })) : 
        // If we encounter an empty object, we explicitly add it to the update
        // mask to ensure that the server creates a map entry.
        n.path && n.path.length > 0 && n.fieldMask.push(n.path), {
            mapValue: {
                fields: e
            }
        };
    }

    function Ce(t) {
        return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof _t || t instanceof ye || t instanceof de || t instanceof ie || t instanceof pe);
    }

    function Le(t, n, e) {
        if (!Ce(e) || !function(t) {
            return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
        }(e)) {
            const s = K(e);
            throw "an object" === s ? n.dt(t + " a custom object") : n.dt(t + " " + s);
        }
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function Ue(t, n, e) {
        if (
        // If required, replace the FieldPath Compat class with with the firestore-exp
        // FieldPath.
        n instanceof re && (n = n._delegate), n instanceof we) return n._internalPath;
        if ("string" == typeof n) return Me(t, n);
        throw Be("Field path arguments must be of type string or FieldPath.", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, e);
    }

    /**
     * Matches any characters in a field path string that are reserved.
     */ const je = new RegExp("[~\\*/\\[\\]]");

    /**
     * Wraps fromDotSeparatedString with an error message about the method that
     * was thrown.
     * @param methodName - The publicly visible method name
     * @param path - The dot-separated string form of a field path which will be
     * split on dots.
     * @param targetDoc - The document against which the field path will be
     * evaluated.
     */ function Me(t, n, e) {
        if (n.search(je) >= 0) throw Be(`Invalid field path (${n}). Paths must not contain '~', '*', '/', '[', or ']'`, t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, e);
        try {
            return new we(...n.split("."))._internalPath;
        } catch (s) {
            throw Be(`Invalid field path (${n}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t, 
            /* hasConverter= */ !1, 
            /* path= */ void 0, e);
        }
    }

    function Be(t, n, e, s, r) {
        const i = s && !s.isEmpty(), o = void 0 !== r;
        let u = `Function ${n}() called with invalid data`;
        e && (u += " (via `toFirestore()`)"), u += ". ";
        let c = "";
        return (i || o) && (c += " (found", i && (c += ` in field ${s}`), o && (c += ` in document ${r}`), 
        c += ")"), new x(b, u + t + c);
    }

    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */ function ke(t, n) {
        return t.some((t => t.isEqual(n)));
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
     */ class Qe {
        // Note: This class is stripped down version of the DocumentSnapshot in
        // the legacy SDK. The changes are:
        // - No support for SnapshotMetadata.
        // - No support for SnapshotOptions.
        /** @hideconstructor protected */
        constructor(t, n, e, s, r) {
            this._firestore = t, this._userDataWriter = n, this._key = e, this._document = s, 
            this._converter = r;
        }
        /** Property of the `DocumentSnapshot` that provides the document's ID. */    get id() {
            return this._key.path.lastSegment();
        }
        /**
         * The `DocumentReference` for the document included in the `DocumentSnapshot`.
         */    get ref() {
            return new ie(this._firestore, this._converter, this._key);
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
                    const t = new We(this._firestore, this._userDataWriter, this._key, this._document, 
                    /* converter= */ null);
                    return this._converter.fromFirestore(t);
                }
                return this._userDataWriter.convertValue(this._document.toProto());
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
                const n = this._document.data().field(Ye("DocumentSnapshot.get", t));
                if (null !== n) return this._userDataWriter.convertValue(n);
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
     */ class We extends Qe {
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
     * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
     * representing the results of a query. The documents can be accessed as an
     * array via the `docs` property or enumerated using the `forEach` method. The
     * number of documents can be determined via the `empty` and `size`
     * properties.
     */ class ze {
        /** @hideconstructor */
        constructor(t, n) {
            this._docs = n, this.query = t;
        }
        /** An array of all the documents in the `QuerySnapshot`. */    get docs() {
            return [ ...this._docs ];
        }
        /** The number of documents in the `QuerySnapshot`. */    get size() {
            return this.docs.length;
        }
        /** True if there are no documents in the `QuerySnapshot`. */    get empty() {
            return 0 === this.docs.length;
        }
        /**
         * Enumerates all of the documents in the `QuerySnapshot`.
         *
         * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
         * each document in the snapshot.
         * @param thisArg - The `this` binding for the callback.
         */    forEach(t, n) {
            this._docs.forEach(t, n);
        }
    }

    /**
     * Returns true if the provided snapshots are equal.
     *
     * @param left - A snapshot to compare.
     * @param right - A snapshot to compare.
     * @returns true if the snapshots are equal.
     */ function Ge(t, n) {
        return t instanceof re && (t = t._delegate), n instanceof re && (n = n._delegate), 
        t instanceof Qe && n instanceof Qe ? t._firestore === n._firestore && t._key.isEqual(n._key) && (null === t._document ? null === n._document : t._document.isEqual(n._document)) && t._converter === n._converter : t instanceof ze && n instanceof ze && (fe(t.query, n.query) && ht(t.docs, n.docs, Ge));
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function Ye(t, n) {
        return "string" == typeof n ? Me(t, n) : n instanceof re ? n._delegate._internalPath : n._internalPath;
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
     * A `QueryConstraint` is used to narrow the set of documents returned by a
     * Firestore query. `QueryConstraint`s are created by invoking {@link where},
     * {@link orderBy}, {@link startAt}, {@link startAfter}, {@link
     * endBefore}, {@link endAt}, {@link limit} or {@link limitToLast} and
     * can then be passed to {@link query} to create a new query instance that
     * also contains this `QueryConstraint`.
     */
    class He {}

    /**
     * Creates a new immutable instance of `query` that is extended to also include
     * additional query constraints.
     *
     * @param query - The query instance to use as a base for the new constraints.
     * @param queryConstraints - The list of `QueryConstraint`s to apply.
     * @throws if any of the provided query constraints cannot be combined with the
     * existing or new constraints.
     */ function Ke(t, ...n) {
        for (const e of n) t = e._apply(t);
        return t;
    }

    class Je extends He {
        constructor(t, n, e) {
            super(), this.vt = t, this.Et = n, this.It = e, this.type = "where";
        }
        _apply(t) {
            const n = Te(t.firestore), e = function(t, n, e, s, r, i, o) {
                let u;
                if (r.isKeyField()) {
                    if ("array-contains" /* ARRAY_CONTAINS */ === i || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === i) throw new x(b, `Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);
                    if ("in" /* IN */ === i || "not-in" /* NOT_IN */ === i) {
                        fs(o, i);
                        const n = [];
                        for (const e of o) n.push(ls(s, t, e));
                        u = {
                            arrayValue: {
                                values: n
                            }
                        };
                    } else u = ls(s, t, o);
                } else "in" /* IN */ !== i && "not-in" /* NOT_IN */ !== i && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== i || fs(o, i), 
                u = xe(e, n, o, 
                /* allowArrays= */ "in" /* IN */ === i || "not-in" /* NOT_IN */ === i);
                const c = Ct.create(r, i, u);
                return function(t, n) {
                    if (n.D()) {
                        const e = Xt(t);
                        if (null !== e && !e.isEqual(n.field)) throw new x(b, `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${e.toString()}' and '${n.field.toString()}'`);
                        const s = Zt(t);
                        null !== s && ds(t, n.field, s);
                    }
                    const e = function(t, n) {
                        for (const e of t.filters) if (n.indexOf(e.op) >= 0) return e.op;
                        return null;
                    }(t, 
                    /**
     * Given an operator, returns the set of operators that cannot be used with it.
     *
     * Operators in a query must adhere to the following set of rules:
     * 1. Only one array operator is allowed.
     * 2. Only one disjunctive operator is allowed.
     * 3. NOT_EQUAL cannot be used with another NOT_EQUAL operator.
     * 4. NOT_IN cannot be used with array, disjunctive, or NOT_EQUAL operators.
     *
     * Array operators: ARRAY_CONTAINS, ARRAY_CONTAINS_ANY
     * Disjunctive operators: IN, ARRAY_CONTAINS_ANY, NOT_IN
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
                    }(n.op));
                    if (null !== e) 
                    // Special case when it's a duplicate op to give a slightly clearer error message.
                    throw e === n.op ? new x(b, `Invalid query. You cannot use more than one '${n.op.toString()}' filter.`) : new x(b, `Invalid query. You cannot use '${n.op.toString()}' filters with '${e.toString()}' filters.`);
                }(t, c), c;
            }(t._query, "where", n, t.firestore._databaseId, this.vt, this.Et, this.It);
            return new oe(t.firestore, t._converter, function(t, n) {
                const e = t.filters.concat([ n ]);
                return new Kt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), e, t.limit, t.limitType, t.startAt, t.endAt);
            }(t._query, e));
        }
    }

    /**
     * Creates a `QueryConstraint` that enforces that documents must contain the
     * specified field and that the value should satisfy the relation constraint
     * provided.
     *
     * @param fieldPath - The path to compare
     * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
     *   "&lt;=", "!=").
     * @param value - The value for comparison
     * @returns The created `Query`.
     */ function Ze(t, n, e) {
        const s = n, r = Ye("where", t);
        return new Je(r, s, e);
    }

    class Xe extends He {
        constructor(t, n) {
            super(), this.vt = t, this.Tt = n, this.type = "orderBy";
        }
        _apply(t) {
            const n = function(t, n, e) {
                if (null !== t.startAt) throw new x(b, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
                if (null !== t.endAt) throw new x(b, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
                const s = new Gt(n, e);
                return function(t, n) {
                    if (null === Zt(t)) {
                        // This is the first order by. It must match any inequality.
                        const e = Xt(t);
                        null !== e && ds(t, e, n.field);
                    }
                }(t, s), s;
            }
            /**
     * Create a Bound from a query and a document.
     *
     * Note that the Bound will always include the key of the document
     * and so only the provided document will compare equal to the returned
     * position.
     *
     * Will throw if the document does not contain all fields of the order by
     * of the query or if any of the fields in the order by are an uncommitted
     * server timestamp.
     */ (t._query, this.vt, this.Tt);
            return new oe(t.firestore, t._converter, function(t, n) {
                // TODO(dimond): validate that orderBy does not list the same key twice.
                const e = t.explicitOrderBy.concat([ n ]);
                return new Kt(t.path, t.collectionGroup, e, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
            }(t._query, n));
        }
    }

    /**
     * Creates a `QueryConstraint` that sorts the query result by the
     * specified field, optionally in descending order instead of ascending.
     *
     * @param fieldPath - The field to sort by.
     * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
     * not specified, order will be ascending.
     * @returns The created `Query`.
     */ function ts(t, n = "asc") {
        const e = n, s = Ye("orderBy", t);
        return new Xe(s, e);
    }

    class ns extends He {
        constructor(t, n, e) {
            super(), this.type = t, this.At = n, this.Pt = e;
        }
        _apply(t) {
            return new oe(t.firestore, t._converter, function(t, n, e) {
                return new Kt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), n, e, t.startAt, t.endAt);
            }(t._query, this.At, this.Pt));
        }
    }

    /**
     * Creates a `QueryConstraint` that only returns the first matching documents.
     *
     * @param limit - The maximum number of items to return.
     * @returns The created `Query`.
     */ function es(t) {
        return Z("limit", t), new ns("limit", t, "F" /* First */);
    }

    /**
     * Creates a `QueryConstraint` that only returns the last matching documents.
     *
     * You must specify at least one `orderBy` clause for `limitToLast` queries,
     * otherwise an exception will be thrown during execution.
     *
     * @param limit - The maximum number of items to return.
     * @returns The created `Query`.
     */ function ss(t) {
        return Z("limitToLast", t), new ns("limitToLast", t, "L" /* Last */);
    }

    class rs extends He {
        constructor(t, n, e) {
            super(), this.type = t, this.Rt = n, this.Vt = e;
        }
        _apply(t) {
            const n = hs(t, this.type, this.Rt, this.Vt);
            return new oe(t.firestore, t._converter, function(t, n) {
                return new Kt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, n, t.endAt);
            }(t._query, n));
        }
    }

    function is(...t) {
        return new rs("startAt", t, /*before=*/ !0);
    }

    function os(...t) {
        return new rs("startAfter", t, 
        /*before=*/ !1);
    }

    class us extends He {
        constructor(t, n, e) {
            super(), this.type = t, this.Rt = n, this.Vt = e;
        }
        _apply(t) {
            const n = hs(t, this.type, this.Rt, this.Vt);
            return new oe(t.firestore, t._converter, function(t, n) {
                return new Kt(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, n);
            }(t._query, n));
        }
    }

    function cs(...t) {
        return new us("endBefore", t, /*before=*/ !0);
    }

    function as(...t) {
        return new us("endAt", t, /*before=*/ !1);
    }

    /** Helper function to create a bound from a document or fields */ function hs(t, n, e, s) {
        if (e[0] instanceof re && (e[0] = e[0]._delegate), e[0] instanceof Qe) return function(t, n, e, s, r) {
            if (!s) throw new x(E, `Can't use a DocumentSnapshot that doesn't exist for ${e}().`);
            const i = [];
            // Because people expect to continue/end a query at the exact document
            // provided, we need to use the implicit sort order rather than the explicit
            // sort order, because it's guaranteed to contain the document key. That way
            // the position becomes unambiguous and the query continues/ends exactly at
            // the provided document. Without the key (by using the explicit sort
            // orders), multiple documents could match the position, yielding duplicate
            // results.
                    for (const e of nn(t)) if (e.field.isKeyField()) i.push(Rt(n, s.key)); else {
                const t = s.field(e.field);
                if (gt(t)) throw new x(b, 'Invalid query. You are trying to start or end a query using a document for which the field "' + e.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === t) {
                    const t = e.field.canonicalString();
                    throw new x(b, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`);
                }
                i.push(t);
            }
            return new zt(i, r);
        }
        /**
     * Converts a list of field values to a Bound for the given query.
     */ (t._query, t.firestore._databaseId, n, e[0]._document, s);
        {
            const r = Te(t.firestore);
            return function(t, n, e, s, r, i) {
                // Use explicit order by's because it has to match the query the user made
                const o = t.explicitOrderBy;
                if (r.length > o.length) throw new x(b, `Too many arguments provided to ${s}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
                const u = [];
                for (let i = 0; i < r.length; i++) {
                    const c = r[i];
                    if (o[i].field.isKeyField()) {
                        if ("string" != typeof c) throw new x(b, `Invalid query. Expected a string for document ID in ${s}(), but got a ${typeof c}`);
                        if (!tn(t) && -1 !== c.indexOf("/")) throw new x(b, `Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${s}() must be a plain document ID, but '${c}' contains a slash.`);
                        const e = t.path.child(k.fromString(c));
                        if (!z.isDocumentKey(e)) throw new x(b, `Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${s}() must result in a valid document path, but '${e}' is not because it contains an odd number of segments.`);
                        const r = new z(e);
                        u.push(Rt(n, r));
                    } else {
                        const t = xe(e, s, c);
                        u.push(t);
                    }
                }
                return new zt(u, i);
            }
            /**
     * Parses the given documentIdValue into a ReferenceValue, throwing
     * appropriate errors if the value is anything other than a DocumentReference
     * or String, or if the string is malformed.
     */ (t._query, t.firestore._databaseId, r, n, e, s);
        }
    }

    function ls(t, n, e) {
        if (e instanceof re && (e = e._delegate), "string" == typeof e) {
            if ("" === e) throw new x(b, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!tn(n) && -1 !== e.indexOf("/")) throw new x(b, `Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);
            const s = n.path.child(k.fromString(e));
            if (!z.isDocumentKey(s)) throw new x(b, `Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);
            return Rt(t, new z(s));
        }
        if (e instanceof ie) return Rt(t, e._key);
        throw new x(b, `Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ${K(e)}.`);
    }

    /**
     * Validates that the value passed into a disjunctive filter satisfies all
     * array requirements.
     */ function fs(t, n) {
        if (!Array.isArray(t) || 0 === t.length) throw new x(b, `Invalid Query. A non-empty array is required for '${n.toString()}' filters.`);
        if (t.length > 10) throw new x(b, `Invalid Query. '${n.toString()}' filters support a maximum of 10 elements in the value array.`);
    }

    function ds(t, n, e) {
        if (!e.isEqual(n)) throw new x(b, `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${n.toString()}' and so you must also use '${n.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${e.toString()}' instead.`);
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
     * Converts custom model object of type T into DocumentData by applying the
     * converter if it exists.
     *
     * This function is used when converting user objects to DocumentData
     * because we want to provide the user with a more specific error message if
     * their set() or fails due to invalid data originating from a toFirestore()
     * call.
     */
    function ws(t, n, e) {
        let s;
        // Cast to `any` in order to satisfy the union type constraint on
        // toFirestore().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return s = t ? e && (e.merge || e.mergeFields) ? t.toFirestore(n, e) : t.toFirestore(n) : n, 
        s;
    }

    class ms extends class {
        convertValue(t, n = "none") {
            switch (Et(t)) {
              case 0 /* NullValue */ :
                return null;

              case 1 /* BooleanValue */ :
                return t.booleanValue;

              case 2 /* NumberValue */ :
                return pt(t.integerValue || t.doubleValue);

              case 3 /* TimestampValue */ :
                return this.convertTimestamp(t.timestampValue);

              case 4 /* ServerTimestampValue */ :
                return this.convertServerTimestamp(t, n);

              case 5 /* StringValue */ :
                return t.stringValue;

              case 6 /* BlobValue */ :
                return this.convertBytes(yt(t.bytesValue));

              case 7 /* RefValue */ :
                return this.convertReference(t.referenceValue);

              case 8 /* GeoPointValue */ :
                return this.convertGeoPoint(t.geoPointValue);

              case 9 /* ArrayValue */ :
                return this.convertArray(t.arrayValue, n);

              case 10 /* ObjectValue */ :
                return this.convertObject(t.mapValue, n);

              default:
                throw w();
            }
        }
        convertObject(t, n) {
            const e = {};
            return ft(t.fields || {}, ((t, s) => {
                e[t] = this.convertValue(s, n);
            })), e;
        }
        convertGeoPoint(t) {
            return new ye(pt(t.latitude), pt(t.longitude));
        }
        convertArray(t, n) {
            return (t.values || []).map((t => this.convertValue(t, n)));
        }
        convertServerTimestamp(t, n) {
            switch (n) {
              case "previous":
                const e = bt(t);
                return null == e ? null : this.convertValue(e, n);

              case "estimate":
                return this.convertTimestamp(vt(t));

              default:
                return null;
            }
        }
        convertTimestamp(t) {
            const n = mt(t);
            return new _t(n.seconds, n.nanos);
        }
        convertDocumentKey(t, n) {
            const e = k.fromString(t);
            m(kn(e));
            const s = new M(e.get(1), e.get(3)), r = new z(e.popFirst(5));
            return s.isEqual(n) || 
            // TODO(b/64130202): Somehow support foreign references.
            l(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`), 
            r;
        }
    } {
        constructor(t) {
            super(), this.firestore = t;
        }
        convertBytes(t) {
            return new de(t);
        }
        convertReference(t) {
            const n = this.convertDocumentKey(t, this.firestore._databaseId);
            return new ie(this.firestore, /* converter= */ null, n);
        }
    }

    /**
     * Reads the document referred to by the specified document reference.
     *
     * All documents are directly fetched from the server, even if the document was
     * previously read or modified. Recent modifications are only reflected in the
     * retrieved `DocumentSnapshot` if they have already been applied by the
     * backend. If the client is offline, the read fails. If you like to use
     * caching or see local modifications, please use the full Firestore SDK.
     *
     * @param reference - The reference of the document to fetch.
     * @returns A Promise resolved with a `DocumentSnapshot` containing the current
     * document contents.
     */ function ps(t) {
        const n = Jn((t = J(t, ie)).firestore), e = new ms(t.firestore);
        return Yn(n, [ t._key ]).then((n => {
            m(1 === n.length);
            const s = n[0];
            return new Qe(t.firestore, e, t._key, s instanceof St ? s : null, t._converter);
        }));
    }

    /**
     * Executes the query and returns the results as a {@link QuerySnapshot}.
     *
     * All queries are executed directly by the server, even if the the query was
     * previously executed. Recent modifications are only reflected in the retrieved
     * results if they have already been applied by the backend. If the client is
     * offline, the operation fails. To see previously cached result and local
     * modifications, use the full Firestore SDK.
     *
     * @param query - The `Query` to execute.
     * @returns A Promise that will be resolved with the results of the query.
     */ function ys(t) {
        !function(t) {
            if (Jt(t) && 0 === t.explicitOrderBy.length) throw new x($, "limitToLast() queries require specifying at least one orderBy() clause");
        }((t = J(t, oe))._query);
        const n = Jn(t.firestore), e = new ms(t.firestore);
        return Hn(n, t._query).then((n => {
            const s = n.map((n => new We(t.firestore, e, n.key, n, t._converter)));
            return Jt(t._query) && 
            // Limit to last queries reverse the orderBy constraint that was
            // specified by the user. As such, we need to reverse the order of the
            // results to return the documents in the expected order.
            s.reverse(), new ze(t, s);
        }));
    }

    function _s(t, n, e) {
        const s = ws((t = J(t, ie))._converter, n, e), r = Ae(Te(t.firestore), "setDoc", t._key, s, null !== t._converter, e);
        return Gn(Jn(t.firestore), [ r.toMutation(t._key, pn.none()) ]);
    }

    function gs(t, n, e, ...s) {
        const r = Te((t = J(t, ie)).firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
            let i;
        n instanceof re && (n = n._delegate), i = "string" == typeof n || n instanceof we ? Se(r, "updateDoc", t._key, n, e, s) : Fe(r, "updateDoc", t._key, n);
        return Gn(Jn(t.firestore), [ i.toMutation(t._key, pn.exists(!0)) ]);
    }

    /**
     * Deletes the document referred to by the specified `DocumentReference`.
     *
     * The deletion will only be reflected in document reads that occur after the
     * returned Promise resolves. If the client is offline, the
     * delete fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @param reference - A reference to the document to delete.
     * @returns A Promise resolved once the document has been successfully
     * deleted from the backend.
     */ function bs(t) {
        return Gn(Jn((t = J(t, ie)).firestore), [ new bn(t._key, pn.none()) ]);
    }

    /**
     * Add a new document to specified `CollectionReference` with the given data,
     * assigning it a document ID automatically.
     *
     * The result of this write will only be reflected in document reads that occur
     * after the returned Promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @param reference - A reference to the collection to add this document to.
     * @param data - An Object containing the data for the new document.
     * @returns A Promise resolved with a `DocumentReference` pointing to the
     * newly created document after it has been written to the backend.
     */ function vs(t, n) {
        const e = he(t = J(t, ue)), s = ws(t._converter, n), r = Ae(Te(t.firestore), "addDoc", e._key, s, null !== e._converter, {});
        return Gn(Jn(t.firestore), [ r.toMutation(e._key, pn.exists(!1)) ]).then((() => e));
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
     * Returns a sentinel for use with {@link updateDoc} or
     * {@link setDoc} with `{merge: true}` to mark a field for deletion.
     */ function Es() {
        return new Pe("deleteField");
    }

    /**
     * Returns a sentinel used with {@link setDoc} or {@link updateDoc} to
     * include a server-generated timestamp in the written data.
     */ function Is() {
        return new Ve("serverTimestamp");
    }

    /**
     * Returns a special value that can be used with {@link setDoc} or {@link
     * updateDoc} that tells the server to union the given elements with any array
     * value that already exists on the server. Each specified element that doesn't
     * already exist in the array will be added to the end. If the field being
     * modified is not already an array it will be overwritten with an array
     * containing exactly the specified elements.
     *
     * @param elements - The elements to union into the array.
     * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`.
     */ function Ts(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return new Ne("arrayUnion", t);
    }

    /**
     * Returns a special value that can be used with {@link (setDoc:1)} or {@link
     * updateDoc} that tells the server to remove the given elements from any
     * array value that already exists on the server. All instances of each element
     * specified will be removed from the array. If the field being modified is not
     * already an array it will be overwritten with an empty array.
     *
     * @param elements - The elements to remove from the array.
     * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`
     */ function As(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return new $e("arrayRemove", t);
    }

    /**
     * Returns a special value that can be used with {@link setDoc} or {@link
     * updateDoc} that tells the server to increment the field's current value by
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
     */ function Ps(t) {
        return new De("increment", t);
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
     * will be committed (or visible locally) until {@link WriteBatch#commit} is
     * called.
     */ class Rs {
        /** @hideconstructor */
        constructor(t, n) {
            this._firestore = t, this._commitHandler = n, this._mutations = [], this._committed = !1, 
            this._dataReader = Te(t);
        }
        set(t, n, e) {
            this._verifyNotCommitted();
            const s = Vs(t, this._firestore), r = ws(s._converter, n, e), i = Ae(this._dataReader, "WriteBatch.set", s._key, r, null !== s._converter, e);
            return this._mutations.push(i.toMutation(s._key, pn.none())), this;
        }
        update(t, n, e, ...s) {
            this._verifyNotCommitted();
            const r = Vs(t, this._firestore);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    let i;
            return n instanceof re && (n = n._delegate), i = "string" == typeof n || n instanceof we ? Se(this._dataReader, "WriteBatch.update", r._key, n, e, s) : Fe(this._dataReader, "WriteBatch.update", r._key, n), 
            this._mutations.push(i.toMutation(r._key, pn.exists(!0))), this;
        }
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be deleted.
         * @returns This `WriteBatch` instance. Used for chaining method calls.
         */    delete(t) {
            this._verifyNotCommitted();
            const n = Vs(t, this._firestore);
            return this._mutations = this._mutations.concat(new bn(n._key, pn.none())), this;
        }
        /**
         * Commits all of the writes in this write batch as a single atomic unit.
         *
         * The result of these writes will only be reflected in document reads that
         * occur after the returned Promise resolves. If the client is offline, the
         * write fails. If you would like to see local modifications or buffer writes
         * until the client is online, use the full Firestore SDK.
         *
         * @returns A Promise resolved once all of the writes in the batch have been
         * successfully written to the backend as an atomic unit (note that it won't
         * resolve while you're offline).
         */    commit() {
            return this._verifyNotCommitted(), this._committed = !0, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
        }
        _verifyNotCommitted() {
            if (this._committed) throw new x(R, "A write batch can no longer be used after commit() has been called.");
        }
    }

    function Vs(t, n) {
        if (t instanceof re && (t = t._delegate), t.firestore !== n) throw new x(b, "Provided document reference is from a different Firestore instance.");
        return t;
    }

    /**
     * Creates a write batch, used for performing multiple writes as a single
     * atomic operation. The maximum number of writes allowed in a single WriteBatch
     * is 500.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned Promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A `WriteBatch` that can be used to atomically execute multiple
     * writes.
     */ function Ns(t) {
        const n = Jn(t = J(t, Xn));
        return new Rs(t, (t => Gn(n, t)));
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
     */ class $s {
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
            if (this.ensureCommitNotCalled(), this.mutations.length > 0) throw new x(b, "Firestore transactions require all reads to be executed before all writes.");
            const n = await Yn(this.datastore, t);
            return n.forEach((t => {
                t instanceof xt || t instanceof St ? this.recordVersion(t) : w();
            })), n;
        }
        set(t, n) {
            this.write(n.toMutation(t, this.precondition(t))), this.writtenDocs.add(t.toString());
        }
        update(t, n) {
            try {
                this.write(n.toMutation(t, this.preconditionForUpdate(t)));
            } catch (t) {
                this.lastWriteError = t;
            }
            this.writtenDocs.add(t.toString());
        }
        delete(t) {
            this.write(new bn(t, this.precondition(t))), this.writtenDocs.add(t.toString());
        }
        async commit() {
            if (this.ensureCommitNotCalled(), this.lastWriteError) throw this.lastWriteError;
            const t = this.readVersions;
            // For each mutation, note that the doc was written.
                    this.mutations.forEach((n => {
                t.delete(n.key.toString());
            })), 
            // For each document that was read but not written to, we want to perform
            // a `verify` operation.
            t.forEach(((t, n) => {
                const e = z.fromPath(n);
                this.mutations.push(new vn(e, this.precondition(e)));
            })), await Gn(this.datastore, this.mutations), this.committed = !0;
        }
        recordVersion(t) {
            let n;
            if (t instanceof St) n = t.version; else {
                if (!(t instanceof xt)) throw w();
                // For deleted docs, we must use baseVersion 0 when we overwrite them.
                n = rn.min();
            }
            const e = this.readVersions.get(t.key.toString());
            if (e) {
                if (!n.isEqual(e)) 
                // This transaction will fail no matter what.
                throw new x(V, "Document version changed between two reads.");
            } else this.readVersions.set(t.key.toString(), n);
        }
        /**
         * Returns the version of this document when it was read in this transaction,
         * as a precondition, or no precondition if it was not read.
         */    precondition(t) {
            const n = this.readVersions.get(t.toString());
            return !this.writtenDocs.has(t.toString()) && n ? pn.updateTime(n) : pn.none();
        }
        /**
         * Returns the precondition for a document if the operation is an update.
         */    preconditionForUpdate(t) {
            const n = this.readVersions.get(t.toString());
            // The first time a document is written, we want to take into account the
            // read time and existence
                    if (!this.writtenDocs.has(t.toString()) && n) {
                if (n.isEqual(rn.min())) 
                // The document doesn't exist, so fail the transaction.
                // This has to be validated locally because you can't send a
                // precondition that a document does not exist without changing the
                // semantics of the backend write to be an insert. This is the reverse
                // of what we want, since we want to assert that the document doesn't
                // exist but then send the update and have it fail. Since we can't
                // express that to the backend, we have to validate locally.
                // Note: this can change once we can send separate verify writes in the
                // transaction.
                throw new x(b, "Can't update a document that doesn't exist.");
                // Document exists, base precondition on document update time.
                            return pn.updateTime(n);
            }
            // Document was not read, so we just use the preconditions for a blind
            // update.
            return pn.exists(!0);
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
    class Ds {
        constructor(t, n, e, s) {
            this.asyncQueue = t, this.datastore = n, this.updateFunction = e, this.deferred = s, 
            this.Nt = 5, this.$t = new Wn(this.asyncQueue, "transaction_retry" /* TransactionRetry */);
        }
        /** Runs the transaction and sets the result on deferred. */    run() {
            this.Dt();
        }
        Dt() {
            this.$t.X((async () => {
                const t = new $s(this.datastore), n = this.Ft(t);
                n && n.then((n => {
                    this.asyncQueue.enqueueAndForget((() => t.commit().then((() => {
                        this.deferred.resolve(n);
                    })).catch((t => {
                        this.St(t);
                    }))));
                })).catch((t => {
                    this.St(t);
                }));
            }));
        }
        Ft(t) {
            try {
                const n = this.updateFunction(t);
                return !X(n) && n.catch && n.then ? n : (this.deferred.reject(Error("Transaction callback must return a Promise")), 
                null);
            } catch (t) {
                // Do not retry errors thrown by user provided updateFunction.
                return this.deferred.reject(t), null;
            }
        }
        St(t) {
            this.Nt > 0 && this.xt(t) ? (this.Nt -= 1, this.asyncQueue.enqueueAndForget((() => (this.Dt(), 
            Promise.resolve())))) : this.deferred.reject(t);
        }
        xt(t) {
            if ("FirebaseError" === t.name) {
                // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
                // non-matching document versions with ABORTED. These errors should be retried.
                const n = t.code;
                return "aborted" === n || "failed-precondition" === n || !
                /**
     * Determines whether an error code represents a permanent error when received
     * in response to a non-write operation.
     *
     * See isPermanentWriteError for classifying write errors.
     */
                function(t) {
                    switch (t) {
                      case y:
                        return w();

                      case _:
                      case g:
                      case v:
                      case P:
                      case D:
                      case F:
     // Unauthenticated means something went wrong with our token and we need
                        // to retry with new credentials which will happen automatically.
                                          case A:
                        return !1;

                      case b:
                      case E:
                      case I:
                      case T:
                      case R:
     // Aborted might be retried in some scenarios, but that is dependant on
                        // the context and should handled individually by the calling code.
                        // See https://cloud.google.com/apis/design/errors.
                                          case V:
                      case N:
                      case $:
                      case S:
                        return !0;

                      default:
                        return w();
                    }
                }(n);
            }
            return !1;
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
    /** The Platform's 'document' implementation or null if not available. */ function Fs() {
        // `document` is not always available, e.g. in ReactNative and WebWorkers.
        // eslint-disable-next-line no-restricted-globals
        return "undefined" != typeof document ? document : null;
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
     */ class Ss {
        constructor(t, n, e, s, r) {
            this.asyncQueue = t, this.timerId = n, this.targetTimeMs = e, this.op = s, this.removalCallback = r, 
            this.deferred = new ot, this.then = this.deferred.promise.then.bind(this.deferred.promise), 
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
         */    static createAndSchedule(t, n, e, s, r) {
            const i = Date.now() + e, o = new Ss(t, n, i, s, r);
            return o.start(e), o;
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
            null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new x(_, "Operation cancelled" + (t ? ": " + t : ""))));
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
     */ class xs {
        constructor() {
            // The last promise in the queue.
            this.qt = Promise.resolve(), 
            // A list of retryable operations. Retryable operations are run in order and
            // retried with backoff.
            this.Ot = [], 
            // Is this AsyncQueue being shut down? Once it is set to true, it will not
            // be changed again.
            this.Ct = !1, 
            // Operations scheduled to be queued in the future. Operations are
            // automatically removed after they are run or canceled.
            this.Lt = [], 
            // visible for testing
            this.Ut = null, 
            // Flag set while there's an outstanding AsyncQueue operation, used for
            // assertion sanity-checks.
            this.jt = !1, 
            // List of TimerIds to fast-forward delays for.
            this.Mt = [], 
            // Backoff timer used to schedule retries for retryable operations
            this.$t = new Wn(this, "async_queue_retry" /* AsyncQueueRetry */), 
            // Visibility handler that triggers an immediate retry of all retryable
            // operations. Meant to speed up recovery when we regain file system access
            // after page comes into foreground.
            this.Bt = () => {
                const t = Fs();
                t && h("AsyncQueue", "Visibility state changed to " + t.visibilityState), this.$t.nt();
            };
            const t = Fs();
            t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.Bt);
        }
        get isShuttingDown() {
            return this.Ct;
        }
        /**
         * Adds a new operation to the queue without waiting for it to complete (i.e.
         * we ignore the Promise result).
         */    enqueueAndForget(t) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.enqueue(t);
        }
        enqueueAndForgetEvenWhileRestricted(t) {
            this.kt(), 
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.Qt(t);
        }
        enterRestrictedMode() {
            if (!this.Ct) {
                this.Ct = !0;
                const t = Fs();
                t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.Bt);
            }
        }
        enqueue(t) {
            return this.kt(), this.Ct ? new Promise((t => {})) : this.Qt(t);
        }
        enqueueRetryable(t) {
            this.enqueueAndForget((() => (this.Ot.push(t), this.Wt())));
        }
        /**
         * Runs the next operation from the retryable queue. If the operation fails,
         * reschedules with backoff.
         */    async Wt() {
            if (0 !== this.Ot.length) {
                try {
                    await this.Ot[0](), this.Ot.shift(), this.$t.reset();
                } catch (t) {
                    if (!
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
                    /** Verifies whether `e` is an IndexedDbTransactionError. */
                    function(t) {
                        // Use name equality, as instanceof checks on errors don't work with errors
                        // that wrap other errors.
                        return "IndexedDbTransactionError" === t.name;
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
     */ (t)) throw t;
     // Failure will be handled by AsyncQueue
                                    h("AsyncQueue", "Operation failed with retryable error: " + t);
                }
                this.Ot.length > 0 && 
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
                this.$t.X((() => this.Wt()));
            }
        }
        Qt(t) {
            const n = this.qt.then((() => (this.jt = !0, t().catch((t => {
                this.Ut = t, this.jt = !1;
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw l("INTERNAL UNHANDLED ERROR: ", 
                /**
     * Chrome includes Error.message in Error.stack. Other browsers do not.
     * This returns expected output of message + stack when available.
     * @param error - Error or FirestoreError
     */
                function(t) {
                    let n = t.message || "";
                    t.stack && (n = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack);
                    return n;
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
     */ (t)), t;
            })).then((t => (this.jt = !1, t))))));
            return this.qt = n, n;
        }
        enqueueAfterDelay(t, n, e) {
            this.kt(), 
            // Fast-forward delays for timerIds that have been overriden.
            this.Mt.indexOf(t) > -1 && (n = 0);
            const s = Ss.createAndSchedule(this, t, n, e, (t => this.zt(t)));
            return this.Lt.push(s), s;
        }
        kt() {
            this.Ut && w();
        }
        verifyOperationInProgress() {}
        /**
         * Waits until all currently queued tasks are finished executing. Delayed
         * operations are not run.
         */    async Gt() {
            // Operations in the queue prior to draining may have enqueued additional
            // operations. Keep draining the queue until the tail is no longer advanced,
            // which indicates that no more new operations were enqueued and that all
            // operations were executed.
            let t;
            do {
                t = this.qt, await t;
            } while (t !== this.qt);
        }
        /**
         * For Tests: Determine if a delayed operation with a particular TimerId
         * exists.
         */    Yt(t) {
            for (const n of this.Lt) if (n.timerId === t) return !0;
            return !1;
        }
        /**
         * For Tests: Runs some or all delayed operations early.
         *
         * @param lastTimerId - Delayed operations up to and including this TimerId
         * will be drained. Pass TimerId.All to run all delayed operations.
         * @returns a Promise that resolves once all operations have been run.
         */    Ht(t) {
            // Note that draining may generate more delayed ops, so we do that first.
            return this.Gt().then((() => {
                // Run ops in the same order they'd run if they ran naturally.
                this.Lt.sort(((t, n) => t.targetTimeMs - n.targetTimeMs));
                for (const n of this.Lt) if (n.skipDelay(), "all" /* All */ !== t && n.timerId === t) break;
                return this.Gt();
            }));
        }
        /**
         * For Tests: Skip all subsequent delays for a timer id.
         */    Kt(t) {
            this.Mt.push(t);
        }
        /** Called once a DelayedOperation is run or canceled. */    zt(t) {
            // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
            const n = this.Lt.indexOf(t);
            this.Lt.splice(n, 1);
        }
    }

    class qs {
        /** @hideconstructor */
        constructor(t, n) {
            this._firestore = t, this._transaction = n, this._dataReader = Te(t);
        }
        /**
         * Reads the document referenced by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be read.
         * @returns A `DocumentSnapshot` with the read data.
         */    get(t) {
            const n = Vs(t, this._firestore), e = new ms(this._firestore);
            return this._transaction.lookup([ n._key ]).then((t => {
                if (!t || 1 !== t.length) return w();
                const s = t[0];
                if (s instanceof xt) return new Qe(this._firestore, e, n._key, null, n._converter);
                if (s instanceof St) return new Qe(this._firestore, e, s.key, s, n._converter);
                throw w();
            }));
        }
        set(t, n, e) {
            const s = Vs(t, this._firestore), r = ws(s._converter, n, e), i = Ae(this._dataReader, "Transaction.set", s._key, r, null !== s._converter, e);
            return this._transaction.set(s._key, i), this;
        }
        update(t, n, e, ...s) {
            const r = Vs(t, this._firestore);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    let i;
            return n instanceof re && (n = n._delegate), i = "string" == typeof n || n instanceof we ? Se(this._dataReader, "Transaction.update", r._key, n, e, s) : Fe(this._dataReader, "Transaction.update", r._key, n), 
            this._transaction.update(r._key, i), this;
        }
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be deleted.
         * @returns This `Transaction` instance. Used for chaining method calls.
         */    delete(t) {
            const n = Vs(t, this._firestore);
            return this._transaction.delete(n._key), this;
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
     */ function Os(t, n) {
        const e = Jn(t = J(t, Xn)), s = new ot;
        return new Ds(new xs, e, (e => n(new qs(t, e))), s).run(), s.promise;
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
     */ app._registerComponent(new Component("firestore/lite", ((t, {options: n}) => {
        const e = t.getProvider("app-exp").getImmediate(), s = new Xn(e, t.getProvider("auth-internal"));
        return n && s._setSettings(n), s;
    }), "PUBLIC" /* PUBLIC */)), app.registerVersion("firestore-lite", "0.0.900", "node");

    exports.Bytes = de;
    exports.CollectionReference = ue;
    exports.DocumentReference = ie;
    exports.DocumentSnapshot = Qe;
    exports.FieldPath = we;
    exports.FieldValue = pe;
    exports.FirebaseFirestore = Xn;
    exports.FirestoreError = x;
    exports.GeoPoint = ye;
    exports.Query = oe;
    exports.QueryConstraint = He;
    exports.QueryDocumentSnapshot = We;
    exports.QuerySnapshot = ze;
    exports.Timestamp = _t;
    exports.Transaction = qs;
    exports.WriteBatch = Rs;
    exports.addDoc = vs;
    exports.arrayRemove = As;
    exports.arrayUnion = Ts;
    exports.collection = ce;
    exports.collectionGroup = ae;
    exports.deleteDoc = bs;
    exports.deleteField = Es;
    exports.doc = he;
    exports.documentId = me;
    exports.endAt = as;
    exports.endBefore = cs;
    exports.getDoc = ps;
    exports.getDocs = ys;
    exports.getFirestore = ne;
    exports.increment = Ps;
    exports.initializeFirestore = te;
    exports.limit = es;
    exports.limitToLast = ss;
    exports.orderBy = ts;
    exports.query = Ke;
    exports.queryEqual = fe;
    exports.refEqual = le;
    exports.runTransaction = Os;
    exports.serverTimestamp = Is;
    exports.setDoc = _s;
    exports.setLogLevel = a;
    exports.snapshotEqual = Ge;
    exports.startAfter = os;
    exports.startAt = is;
    exports.terminate = se;
    exports.updateDoc = gs;
    exports.useFirestoreEmulator = ee;
    exports.where = Ze;
    exports.writeBatch = Ns;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-firestore-lite.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-firestore-lite.js.map
