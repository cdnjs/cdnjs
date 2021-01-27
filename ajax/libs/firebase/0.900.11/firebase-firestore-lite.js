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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
        t() {
            return null != this.uid;
        }
        /**
         * Returns a key representing this user, suitable for inclusion in a
         * dictionary.
         */    i() {
            return this.t() ? "uid:" + this.uid : "anonymous-user";
        }
        isEqual(t) {
            return t.uid === this.uid;
        }
    }

    /** A user with a null UID. */ u.UNAUTHENTICATED = new u(null), 
    // TODO(mikelehen): Look into getting a proper uid-equivalent for
    // non-FirebaseAuth providers.
    u.o = new u("google-credentials-uid"), u.u = new u("first-party-uid");

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
            c.debug("Firestore (8.2.4): " + t, ...e);
        }
    }

    function l(t, ...n) {
        if (c.logLevel <= LogLevel.ERROR) {
            const e = n.map(d);
            c.error("Firestore (8.2.4): " + t, ...e);
        }
    }

    function f(t, ...n) {
        if (c.logLevel <= LogLevel.WARN) {
            const e = n.map(d);
            c.warn("Firestore (8.2.4): " + t, ...e);
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
     */ function _(t = "Unexpected state") {
        // Log the failure in addition to throw an exception, just in case the
        // exception is swallowed.
        const n = "FIRESTORE (8.2.4) INTERNAL ASSERTION FAILED: " + t;
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
     */ function w(t, n) {
        t || _();
    }

    /**
     * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
     * instance of `T` before casting.
     */ function m(t, 
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
     */ const p = "ok", y = "cancelled", E = "unknown", I = "invalid-argument", T = "deadline-exceeded", A = "not-found", P = "already-exists", R = "permission-denied", V = "unauthenticated", g = "resource-exhausted", v = "failed-precondition", b = "aborted", N = "out-of-range", D = "unimplemented", F = "internal", $ = "unavailable", S = "data-loss";

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
            this.user = n, this.type = "OAuth", this.h = {}, 
            // Set the headers using Object Literal notation to avoid minification
            this.h.Authorization = "Bearer " + t;
        }
    }

    /** A CredentialsProvider that always yields an empty token. */ class O {
        constructor() {
            /**
             * Stores the listener registered with setChangeListener()
             * This isn't actually necessary since the UID never changes, but we use this
             * to verify the listen contract is adhered to in tests.
             */
            this.l = null;
        }
        getToken() {
            return Promise.resolve(null);
        }
        _() {}
        m(t) {
            this.l = t, 
            // Fire with initial user.
            t(u.UNAUTHENTICATED);
        }
        p() {
            this.l = null;
        }
    }

    class C {
        constructor(t) {
            /**
             * The auth token listener registered with FirebaseApp, retained here so we
             * can unregister it.
             */
            this.I = null, 
            /** Tracks the current User. */
            this.currentUser = u.UNAUTHENTICATED, this.T = !1, 
            /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
            this.A = 0, 
            /** The listener registered with setChangeListener(). */
            this.l = null, this.forceRefresh = !1, this.I = () => {
                this.A++, this.currentUser = this.P(), this.T = !0, this.l && this.l(this.currentUser);
            }, this.A = 0, this.auth = t.getImmediate({
                optional: !0
            }), this.auth ? this.auth.addAuthTokenListener(this.I) : (
            // if auth is not available, invoke tokenListener once with null token
            this.I(null), t.get().then((t => {
                this.auth = t, this.I && 
                // tokenListener can be removed by removeChangeListener()
                this.auth.addAuthTokenListener(this.I);
            }), (() => {})));
        }
        getToken() {
            // Take note of the current value of the tokenCounter so that this method
            // can fail (with an ABORTED error) if there is a token change while the
            // request is outstanding.
            const t = this.A, n = this.forceRefresh;
            return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then((n => 
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            this.A !== t ? (h("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            this.getToken()) : n ? (w("string" == typeof n.accessToken), new q(n.accessToken, this.currentUser)) : null)) : Promise.resolve(null);
        }
        _() {
            this.forceRefresh = !0;
        }
        m(t) {
            this.l = t, 
            // Fire the initial event
            this.T && t(this.currentUser);
        }
        p() {
            this.auth && this.auth.removeAuthTokenListener(this.I), this.I = null, this.l = null;
        }
        // Auth.getUid() can return null even with a user logged in. It is because
        // getUid() is synchronous, but the auth code populating Uid is asynchronous.
        // This method should only be called in the AuthTokenListener callback
        // to guarantee to get the actual user.
        P() {
            const t = this.auth && this.auth.getUid();
            return w(null === t || "string" == typeof t), new u(t);
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
            this.R = t, this.V = n, this.type = "FirstParty", this.user = u.u;
        }
        get h() {
            const t = {
                "X-Goog-AuthUser": this.V
            }, n = this.R.auth.getAuthHeaderValueForFirstParty([]);
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
            this.R = t, this.V = n;
        }
        getToken() {
            return Promise.resolve(new L(this.R, this.V));
        }
        m(t) {
            // Fire with initial uid.
            t(u.u);
        }
        p() {}
        _() {}
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
            this.g = t, this.persistenceKey = n, this.host = e, this.ssl = s, this.forceLongPolling = r, 
            this.v = i;
        }
    }

    /** The default database name for a project. */
    /** Represents the database ID a Firestore client is associated with. */
    class M {
        constructor(t, n) {
            this.projectId = t, this.database = n || "(default)";
        }
        get N() {
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
            void 0 === n ? n = 0 : n > t.length && _(), void 0 === e ? e = t.length - n : e > t.length - n && _(), 
            this.segments = t, this.offset = n, this.D = e;
        }
        get length() {
            return this.D;
        }
        isEqual(t) {
            return 0 === B.F(this, t);
        }
        child(t) {
            const n = this.segments.slice(this.offset, this.limit());
            return t instanceof B ? t.forEach((t => {
                n.push(t);
            })) : n.push(t), this.$(n);
        }
        /** The index of one past the last segment of the path. */    limit() {
            return this.offset + this.length;
        }
        S(t) {
            return t = void 0 === t ? 1 : t, this.$(this.segments, this.offset + t, this.length - t);
        }
        q() {
            return this.$(this.segments, this.offset, this.length - 1);
        }
        O() {
            return this.segments[this.offset];
        }
        C() {
            return this.get(this.length - 1);
        }
        get(t) {
            return this.segments[this.offset + t];
        }
        L() {
            return 0 === this.length;
        }
        U(t) {
            if (t.length < this.length) return !1;
            for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1;
            return !0;
        }
        j(t) {
            if (this.length + 1 !== t.length) return !1;
            for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1;
            return !0;
        }
        forEach(t) {
            for (let n = this.offset, e = this.limit(); n < e; n++) t(this.segments[n]);
        }
        M() {
            return this.segments.slice(this.offset, this.limit());
        }
        static F(t, n) {
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
        $(t, n, e) {
            return new k(t, n, e);
        }
        B() {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            return this.M().join("/");
        }
        toString() {
            return this.B();
        }
        /**
         * Creates a resource path from the given slash-delimited string. If multiple
         * arguments are provided, all components are combined. Leading and trailing
         * slashes from all components are ignored.
         */    static k(...t) {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            const n = [];
            for (const e of t) {
                if (e.indexOf("//") >= 0) throw new x(I, `Invalid segment (${e}). Paths must not contain // in them.`);
                // Strip leading and traling slashed.
                            n.push(...e.split("/").filter((t => t.length > 0)));
            }
            return new k(n);
        }
        static W() {
            return new k([]);
        }
    }

    const Q = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

    /** A dot-separated path for navigating sub-objects within a document. */ class W extends B {
        $(t, n, e) {
            return new W(t, n, e);
        }
        /**
         * Returns true if the string could be used as a segment in a field path
         * without escaping.
         */    static G(t) {
            return Q.test(t);
        }
        B() {
            return this.M().map((t => (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), W.G(t) || (t = "`" + t + "`"), 
            t))).join(".");
        }
        toString() {
            return this.B();
        }
        /**
         * Returns true if this field references the key of a document.
         */    Y() {
            return 1 === this.length && "__name__" === this.get(0);
        }
        /**
         * The field designating the key of a document.
         */    static H() {
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
         */    static K(t) {
            const n = [];
            let e = "", s = 0;
            const r = () => {
                if (0 === e.length) throw new x(I, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                n.push(e), e = "";
            };
            let i = !1;
            for (;s < t.length; ) {
                const n = t[s];
                if ("\\" === n) {
                    if (s + 1 === t.length) throw new x(I, "Path has trailing escape character: " + t);
                    const n = t[s + 1];
                    if ("\\" !== n && "." !== n && "`" !== n) throw new x(I, "Path has invalid escape sequence: " + t);
                    e += n, s += 2;
                } else "`" === n ? (i = !i, s++) : "." !== n || i ? (e += n, s++) : (r(), s++);
            }
            if (r(), i) throw new x(I, "Unterminated ` in path: " + t);
            return new W(n);
        }
        static W() {
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
        static J(t) {
            return new z(k.k(t));
        }
        static Z(t) {
            return new z(k.k(t).S(5));
        }
        /** Returns true if the document is in the specified collectionId. */    X(t) {
            return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
        }
        isEqual(t) {
            return null !== t && 0 === k.F(this.path, t.path);
        }
        toString() {
            return this.path.toString();
        }
        static F(t, n) {
            return k.F(t.path, n.path);
        }
        static tt(t) {
            return t.length % 2 == 0;
        }
        /**
         * Creates and returns a new document key with the given segments.
         *
         * @param segments - The segments of the path to the document
         * @returns A new instance of DocumentKey
         */    static nt(t) {
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
        if (!e) throw new x(I, `Function ${t}() cannot be called with an empty ${n}.`);
    }

    /**
     * Validates that two boolean options are not set at the same time.
     */
    /**
     * Validates that `path` refers to a document (indicated by the fact it contains
     * an even numbers of segments).
     */
    function Y(t) {
        if (!z.tt(t)) throw new x(I, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Validates that `path` refers to a collection (indicated by the fact it
     * contains an odd numbers of segments).
     */ function H(t) {
        if (z.tt(t)) throw new x(I, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Returns true if it's a non-null object without a custom prototype
     * (i.e. excludes Array, Date, etc.).
     */
    /** Returns a string describing the type / value of the provided input. */
    function K(t) {
        if (void 0 === t) return "undefined";
        if (null === t) return "null";
        if ("string" == typeof t) return t.length > 20 && (t = t.substring(0, 20) + "..."), 
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
        return "function" == typeof t ? "a function" : _();
    }

    function J(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n) {
        if ("_delegate" in t && (
        // Unwrap Compat types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        t = t.et), !(t instanceof n)) {
            if (n.name === t.constructor.name) throw new x(I, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
            {
                const e = K(t);
                throw new x(I, `Expected type '${n.name}', but it was: ${e}`);
            }
        }
        return t;
    }

    function Z(t, n) {
        if (n <= 0) throw new x(I, `Function ${t}() requires a positive number, but it was: ${n}.`);
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
        if (void 0 === t) return l("RPC_ERROR", "HTTP error has no status"), E;
        // The canonical error codes for Google APIs [1] specify mapping onto HTTP
        // status codes but the mapping is not bijective. In each case of ambiguity
        // this function chooses a primary error.
        
        // [1]
        // https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
            switch (t) {
          case 200:
            // OK
            return p;

          case 400:
            // Bad Request
            return v;

            // Other possibilities based on the forward mapping
            // return Code.INVALID_ARGUMENT;
            // return Code.OUT_OF_RANGE;
                  case 401:
            // Unauthorized
            return V;

          case 403:
            // Forbidden
            return R;

          case 404:
            // Not Found
            return A;

          case 409:
            // Conflict
            return b;

            // Other possibilities:
            // return Code.ALREADY_EXISTS;
                  case 416:
            // Range Not Satisfiable
            return N;

          case 429:
            // Too Many Requests
            return g;

          case 499:
            // Client Closed Request
            return y;

          case 500:
            // Internal Server Error
            return E;

            // Other possibilities:
            // return Code.INTERNAL;
            // return Code.DATA_LOSS;
                  case 501:
            // Unimplemented
            return D;

          case 503:
            // Service Unavailable
            return $;

          case 504:
            // Gateway Timeout
            return T;

          default:
            return t >= 200 && t < 300 ? p : t >= 400 && t < 500 ? v : t >= 500 && t < 600 ? F : E;
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
            this.st = t, this.g = t.g;
            const n = t.ssl ? "https" : "http";
            this.rt = n + "://" + t.host, this.it = "projects/" + this.g.projectId + "/databases/" + this.g.database + "/documents";
        }
        ot(t, n, e, s) {
            const r = this.ut(t, n);
            h("RestConnection", "Sending: ", r, e);
            const i = {};
            return this.ct(i, s), this.at(t, r, i, e).then((t => (h("RestConnection", "Received: ", t), 
            t)), (n => {
                throw f("RestConnection", t + " failed with error: ", n, "url: ", r, "request:", e), 
                n;
            }));
        }
        ht(t, n, e, s) {
            // The REST API automatically aggregates all of the streamed results, so we
            // can just use the normal invoke() method.
            return this.ot(t, n, e, s);
        }
        /**
         * Modifies the headers for a request, adding any authorization token if
         * present and any additional headers for the request.
         */    ct(t, n) {
            if (t["X-Goog-Api-Client"] = "gl-js/ fire/8.2.4", 
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the $httpOverwrite
            // parameter supported by ESF to avoid triggering preflight requests.
            t["Content-Type"] = "text/plain", n) for (const e in n.h) n.h.hasOwnProperty(e) && (t[e] = n.h[e]);
        }
        ut(t, n) {
            const e = nt[t];
            return `${this.rt}/v1/${n}:${e}`;
        }
    } {
        /**
         * @param databaseInfo - The connection info.
         * @param fetchImpl - `fetch` or a Polyfill that implements the fetch API.
         */
        constructor(t, n) {
            super(t), this.lt = n;
        }
        ft(t, n) {
            throw new Error("Not supported by FetchConnection");
        }
        async at(t, n, e, s) {
            const r = JSON.stringify(s);
            let i;
            try {
                i = await this.lt(n, {
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
        static dt() {
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
     * @see https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto
     */
    class lt {
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
            if (this.seconds = t, this.nanoseconds = n, n < 0) throw new x(I, "Timestamp nanoseconds out of range: " + n);
            if (n >= 1e9) throw new x(I, "Timestamp nanoseconds out of range: " + n);
            if (t < -62135596800) throw new x(I, "Timestamp seconds out of range: " + t);
            // This will break in the year 10,000.
                    if (t >= 253402300800) throw new x(I, "Timestamp seconds out of range: " + t);
        }
        /**
         * Creates a new timestamp with the current date, with millisecond precision.
         *
         * @returns a new timestamp representing the current date.
         */    static now() {
            return lt.fromMillis(Date.now());
        }
        /**
         * Creates a new timestamp from the given date.
         *
         * @param date - The date to initialize the `Timestamp` from.
         * @returns A new `Timestamp` representing the same point in time as the given
         *     date.
         */    static fromDate(t) {
            return lt.fromMillis(t.getTime());
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
            return new lt(n, 1e6 * (t - 1e3 * n));
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
        _t(t) {
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
     */ class ft {
        constructor(t) {
            this.timestamp = t;
        }
        static wt(t) {
            return new ft(t);
        }
        static min() {
            return new ft(new lt(0, 0));
        }
        yt(t) {
            return this.timestamp._t(t.timestamp);
        }
        isEqual(t) {
            return this.timestamp.isEqual(t.timestamp);
        }
        /** Returns a number representation of the version for use in spec tests. */    Et() {
            // Convert to microseconds.
            return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
        }
        toString() {
            return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        It() {
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
     */ function dt(t) {
        let n = 0;
        for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && n++;
        return n;
    }

    function _t(t, n) {
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
     * Provides a set of fields that can be used to partially patch a document.
     * FieldMask is used in conjunction with ObjectValue.
     * Examples:
     *   foo - Overwrites foo entirely with the provided value. If foo is not
     *         present in the companion ObjectValue, the field is deleted.
     *   foo.bar - Overwrites only the field bar of the object foo.
     *             If foo is not an object, foo is replaced with an object
     *             containing foo
     */
    class wt {
        constructor(t) {
            this.fields = t, 
            // TODO(dimond): validation of FieldMask
            // Sort the field mask to support `FieldMask.isEqual()` and assert below.
            t.sort(W.F);
        }
        /**
         * Verifies that `fieldPath` is included by at least one field in this field
         * mask.
         *
         * This is an O(n) operation, where `n` is the size of the field mask.
         */    Tt(t) {
            for (const n of this.fields) if (n.U(t)) return !0;
            return !1;
        }
        isEqual(t) {
            return ht(this.fields, t.fields, ((t, n) => t.isEqual(n)));
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
    class mt {
        constructor(t) {
            this.At = t;
        }
        static fromBase64String(t) {
            const n = atob(t);
            return new mt(n);
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
            return new mt(n);
        }
        toBase64() {
            return t = this.At, btoa(t);
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
            (this.At);
        }
        Pt() {
            return 2 * this.At.length;
        }
        yt(t) {
            return at(this.At, t.At);
        }
        isEqual(t) {
            return this.At === t.At;
        }
    }

    mt.Rt = new mt("");

    const pt = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

    /**
     * Converts the possible Proto values for a timestamp value into a "seconds and
     * nanos" representation.
     */ function yt(t) {
        // The json interface (for the browser) will return an iso timestamp string,
        // while the proto js library (for node) will return a
        // google.protobuf.Timestamp instance.
        if (w(!!t), "string" == typeof t) {
            // The date string can have higher precision (nanos) than the Date class
            // (millis), so we do some custom parsing here.
            // Parse the nanos right out of the string.
            let n = 0;
            const e = pt.exec(t);
            if (w(!!e), e[1]) {
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

    /** Converts the possible Proto types for Blobs into a ByteString. */ function It(t) {
        return "string" == typeof t ? mt.fromBase64String(t) : mt.fromUint8Array(t);
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
     */ function Tt(t) {
        var n, e;
        return "server_timestamp" === (null === (e = ((null === (n = null == t ? void 0 : t.mapValue) || void 0 === n ? void 0 : n.fields) || {}).__type__) || void 0 === e ? void 0 : e.stringValue);
    }

    /**
     * Returns the value of the field before this ServerTimestamp was set.
     *
     * Preserving the previous values allows the user to display the last resoled
     * value until the backend responds with the timestamp.
     */ function At(t) {
        const n = t.mapValue.fields.__previous_value__;
        return Tt(n) ? At(n) : n;
    }

    /**
     * Returns the local time at which this timestamp was first set.
     */ function Pt(t) {
        const n = yt(t.mapValue.fields.__local_write_time__.timestampValue);
        return new lt(n.seconds, n.nanos);
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
    /** Extracts the backend's type order for the provided value. */ function Rt(t) {
        return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? Tt(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : _();
    }

    /** Tests `left` and `right` for equality based on the backend semantics. */ function Vt(t, n) {
        const e = Rt(t);
        if (e !== Rt(n)) return !1;
        switch (e) {
          case 0 /* NullValue */ :
            return !0;

          case 1 /* BooleanValue */ :
            return t.booleanValue === n.booleanValue;

          case 4 /* ServerTimestampValue */ :
            return Pt(t).isEqual(Pt(n));

          case 3 /* TimestampValue */ :
            return function(t, n) {
                if ("string" == typeof t.timestampValue && "string" == typeof n.timestampValue && t.timestampValue.length === n.timestampValue.length) 
                // Use string equality for ISO 8601 timestamps
                return t.timestampValue === n.timestampValue;
                const e = yt(t.timestampValue), s = yt(n.timestampValue);
                return e.seconds === s.seconds && e.nanos === s.nanos;
            }(t, n);

          case 5 /* StringValue */ :
            return t.stringValue === n.stringValue;

          case 6 /* BlobValue */ :
            return function(t, n) {
                return It(t.bytesValue).isEqual(It(n.bytesValue));
            }(t, n);

          case 7 /* RefValue */ :
            return t.referenceValue === n.referenceValue;

          case 8 /* GeoPointValue */ :
            return function(t, n) {
                return Et(t.geoPointValue.latitude) === Et(n.geoPointValue.latitude) && Et(t.geoPointValue.longitude) === Et(n.geoPointValue.longitude);
            }(t, n);

          case 2 /* NumberValue */ :
            return function(t, n) {
                if ("integerValue" in t && "integerValue" in n) return Et(t.integerValue) === Et(n.integerValue);
                if ("doubleValue" in t && "doubleValue" in n) {
                    const e = Et(t.doubleValue), s = Et(n.doubleValue);
                    return e === s ? tt(e) === tt(s) : isNaN(e) && isNaN(s);
                }
                return !1;
            }(t, n);

          case 9 /* ArrayValue */ :
            return ht(t.arrayValue.values || [], n.arrayValue.values || [], Vt);

          case 10 /* ObjectValue */ :
            return function(t, n) {
                const e = t.mapValue.fields || {}, s = n.mapValue.fields || {};
                if (dt(e) !== dt(s)) return !1;
                for (const t in e) if (e.hasOwnProperty(t) && (void 0 === s[t] || !Vt(e[t], s[t]))) return !1;
                return !0;
            }
            /** Returns true if the ArrayValue contains the specified element. */ (t, n);

          default:
            return _();
        }
    }

    function gt(t, n) {
        return void 0 !== (t.values || []).find((t => Vt(t, n)));
    }

    function vt(t, n) {
        const e = Rt(t), s = Rt(n);
        if (e !== s) return at(e, s);
        switch (e) {
          case 0 /* NullValue */ :
            return 0;

          case 1 /* BooleanValue */ :
            return at(t.booleanValue, n.booleanValue);

          case 2 /* NumberValue */ :
            return function(t, n) {
                const e = Et(t.integerValue || t.doubleValue), s = Et(n.integerValue || n.doubleValue);
                return e < s ? -1 : e > s ? 1 : e === s ? 0 : 
                // one or both are NaN.
                isNaN(e) ? isNaN(s) ? 0 : -1 : 1;
            }(t, n);

          case 3 /* TimestampValue */ :
            return bt(t.timestampValue, n.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return bt(Pt(t), Pt(n));

          case 5 /* StringValue */ :
            return at(t.stringValue, n.stringValue);

          case 6 /* BlobValue */ :
            return function(t, n) {
                const e = It(t), s = It(n);
                return e.yt(s);
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
                const e = at(Et(t.latitude), Et(n.latitude));
                if (0 !== e) return e;
                return at(Et(t.longitude), Et(n.longitude));
            }(t.geoPointValue, n.geoPointValue);

          case 9 /* ArrayValue */ :
            return function(t, n) {
                const e = t.values || [], s = n.values || [];
                for (let t = 0; t < e.length && t < s.length; ++t) {
                    const n = vt(e[t], s[t]);
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
                    const o = vt(e[s[t]], r[i[t]]);
                    if (0 !== o) return o;
                }
                return at(s.length, i.length);
            }
            /** Returns a reference value for the provided database and key. */ (t.mapValue, n.mapValue);

          default:
            throw _();
        }
    }

    function bt(t, n) {
        if ("string" == typeof t && "string" == typeof n && t.length === n.length) return at(t, n);
        const e = yt(t), s = yt(n), r = at(e.seconds, s.seconds);
        return 0 !== r ? r : at(e.nanos, s.nanos);
    }

    function Nt(t, n) {
        return {
            referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${n.path.B()}`
        };
    }

    /** Returns true if `value` is an ArrayValue. */ function Dt(t) {
        return !!t && "arrayValue" in t;
    }

    /** Returns true if `value` is a NullValue. */ function Ft(t) {
        return !!t && "nullValue" in t;
    }

    /** Returns true if `value` is NaN. */ function $t(t) {
        return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
    }

    /** Returns true if `value` is a MapValue. */ function St(t) {
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
     * An ObjectValue represents a MapValue in the Firestore Proto and offers the
     * ability to add and remove fields (via the ObjectValueBuilder).
     */ class xt {
        constructor(t) {
            this.proto = t;
        }
        static empty() {
            return new xt({
                mapValue: {}
            });
        }
        /**
         * Returns the value at the given path or null.
         *
         * @param path - the path to search
         * @returns The value at the path or if there it doesn't exist.
         */    field(t) {
            if (t.L()) return this.proto;
            {
                let n = this.proto;
                for (let e = 0; e < t.length - 1; ++e) {
                    if (!n.mapValue.fields) return null;
                    if (n = n.mapValue.fields[t.get(e)], !St(n)) return null;
                }
                return n = (n.mapValue.fields || {})[t.C()], n || null;
            }
        }
        isEqual(t) {
            return Vt(this.proto, t.proto);
        }
    }

    /**
     * An ObjectValueBuilder provides APIs to set and delete fields from an
     * ObjectValue.
     */ class qt {
        /**
         * @param baseObject - The object to mutate.
         */
        constructor(t = xt.empty()) {
            this.Vt = t, 
            /** A map that contains the accumulated changes in this builder. */
            this.gt = new Map;
        }
        /**
         * Sets the field to the provided value.
         *
         * @param path - The field path to set.
         * @param value - The value to set.
         * @returns The current Builder instance.
         */    set(t, n) {
            return this.vt(t, n), this;
        }
        /**
         * Removes the field at the specified path. If there is no field at the
         * specified path, nothing is changed.
         *
         * @param path - The field path to remove.
         * @returns The current Builder instance.
         */    delete(t) {
            return this.vt(t, null), this;
        }
        /**
         * Adds `value` to the overlay map at `path`. Creates nested map entries if
         * needed.
         */    vt(t, n) {
            let e = this.gt;
            for (let n = 0; n < t.length - 1; ++n) {
                const s = t.get(n);
                let r = e.get(s);
                r instanceof Map ? 
                // Re-use a previously created map
                e = r : r && 10 /* ObjectValue */ === Rt(r) ? (
                // Convert the existing Protobuf MapValue into a map
                r = new Map(Object.entries(r.mapValue.fields || {})), e.set(s, r), e = r) : (
                // Create an empty map to represent the current nesting level
                r = new Map, e.set(s, r), e = r);
            }
            e.set(t.C(), n);
        }
        /** Returns an ObjectValue with all mutations applied. */    bt() {
            const t = this.Nt(W.W(), this.gt);
            return null != t ? new xt(t) : this.Vt;
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
         */    Nt(t, n) {
            let e = !1;
            const s = this.Vt.field(t), r = St(s) ? // If there is already data at the current path, base our
            Object.assign({}, s.mapValue.fields) : {};
            return n.forEach(((n, s) => {
                if (n instanceof Map) {
                    const i = this.Nt(t.child(s), n);
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
     */ class Ot {
        constructor(t, n) {
            this.key = t, this.version = n;
        }
    }

    /**
     * Represents a document in Firestore with a key, version, data and whether the
     * data has local mutations applied to it.
     */ class Ct extends Ot {
        constructor(t, n, e, s) {
            super(t, n), this.Dt = e, this.Ft = !!s.Ft, this.hasCommittedMutations = !!s.hasCommittedMutations;
        }
        field(t) {
            return this.Dt.field(t);
        }
        data() {
            return this.Dt;
        }
        $t() {
            return this.Dt.proto;
        }
        isEqual(t) {
            return t instanceof Ct && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.Ft === t.Ft && this.hasCommittedMutations === t.hasCommittedMutations && this.Dt.isEqual(t.Dt);
        }
        toString() {
            return `Document(${this.key}, ${this.version}, ${this.Dt.toString()}, {hasLocalMutations: ${this.Ft}}), {hasCommittedMutations: ${this.hasCommittedMutations}})`;
        }
        get hasPendingWrites() {
            return this.Ft || this.hasCommittedMutations;
        }
    }

    /**
     * A class representing a deleted document.
     * Version is set to 0 if we don't point to any specific time, otherwise it
     * denotes time we know it didn't exist at.
     */ class Lt extends Ot {
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
            return t instanceof Lt && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key);
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
    class Ut {
        constructor(t, n = null, e = [], s = [], r = null, i = null, o = null) {
            this.path = t, this.collectionGroup = n, this.orderBy = e, this.filters = s, this.limit = r, 
            this.startAt = i, this.endAt = o, this.St = null;
        }
    }

    /**
     * Initializes a Target with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     *
     * NOTE: you should always construct `Target` from `Query.toTarget` instead of
     * using this factory method, because `Query` provides an implicit `orderBy`
     * property.
     */ function jt(t, n = null, e = [], s = [], r = null, i = null, o = null) {
        return new Ut(t, n, e, s, r, i, o);
    }

    class Mt extends class {} {
        constructor(t, n, e) {
            super(), this.field = t, this.op = n, this.value = e;
        }
        /**
         * Creates a filter based on the provided arguments.
         */    static create(t, n, e) {
            return t.Y() ? "in" /* IN */ === n || "not-in" /* NOT_IN */ === n ? this.xt(t, n, e) : new Bt(t, n, e) : "array-contains" /* ARRAY_CONTAINS */ === n ? new zt(t, e) : "in" /* IN */ === n ? new Gt(t, e) : "not-in" /* NOT_IN */ === n ? new Yt(t, e) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === n ? new Ht(t, e) : new Mt(t, n, e);
        }
        static xt(t, n, e) {
            return "in" /* IN */ === n ? new kt(t, e) : new Qt(t, e);
        }
        matches(t) {
            const n = t.field(this.field);
            // Types do not have to match in NOT_EQUAL filters.
                    return "!=" /* NOT_EQUAL */ === this.op ? null !== n && this.qt(vt(n, this.value)) : null !== n && Rt(this.value) === Rt(n) && this.qt(vt(n, this.value));
            // Only compare types with matching backend order (such as double and int).
            }
        qt(t) {
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
                return _();
            }
        }
        Ot() {
            return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
        }
    }

    /** Filter that matches on key fields (i.e. '__name__'). */
    class Bt extends Mt {
        constructor(t, n, e) {
            super(t, n, e), this.key = z.Z(e.referenceValue);
        }
        matches(t) {
            const n = z.F(t.key, this.key);
            return this.qt(n);
        }
    }

    /** Filter that matches on key fields within an array. */ class kt extends Mt {
        constructor(t, n) {
            super(t, "in" /* IN */ , n), this.keys = Wt("in" /* IN */ , n);
        }
        matches(t) {
            return this.keys.some((n => n.isEqual(t.key)));
        }
    }

    /** Filter that matches on key fields not present within an array. */ class Qt extends Mt {
        constructor(t, n) {
            super(t, "not-in" /* NOT_IN */ , n), this.keys = Wt("not-in" /* NOT_IN */ , n);
        }
        matches(t) {
            return !this.keys.some((n => n.isEqual(t.key)));
        }
    }

    function Wt(t, n) {
        var e;
        return ((null === (e = n.arrayValue) || void 0 === e ? void 0 : e.values) || []).map((t => z.Z(t.referenceValue)));
    }

    /** A Filter that implements the array-contains operator. */ class zt extends Mt {
        constructor(t, n) {
            super(t, "array-contains" /* ARRAY_CONTAINS */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return Dt(n) && gt(n.arrayValue, this.value);
        }
    }

    /** A Filter that implements the IN operator. */ class Gt extends Mt {
        constructor(t, n) {
            super(t, "in" /* IN */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return null !== n && gt(this.value.arrayValue, n);
        }
    }

    /** A Filter that implements the not-in operator. */ class Yt extends Mt {
        constructor(t, n) {
            super(t, "not-in" /* NOT_IN */ , n);
        }
        matches(t) {
            if (gt(this.value.arrayValue, {
                nullValue: "NULL_VALUE"
            })) return !1;
            const n = t.field(this.field);
            return null !== n && !gt(this.value.arrayValue, n);
        }
    }

    /** A Filter that implements the array-contains-any operator. */ class Ht extends Mt {
        constructor(t, n) {
            super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return !(!Dt(n) || !n.arrayValue.values) && n.arrayValue.values.some((t => gt(this.value.arrayValue, t)));
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
     */ class Kt {
        constructor(t, n) {
            this.position = t, this.before = n;
        }
    }

    /**
     * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
     */ class Jt {
        constructor(t, n = "asc" /* ASCENDING */) {
            this.field = t, this.dir = n;
        }
    }

    function Zt(t, n) {
        return t.dir === n.dir && t.field.isEqual(n.field);
    }

    function Xt(t, n) {
        if (null === t) return null === n;
        if (null === n) return !1;
        if (t.before !== n.before || t.position.length !== n.position.length) return !1;
        for (let e = 0; e < t.position.length; e++) {
            if (!Vt(t.position[e], n.position[e])) return !1;
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
     */ class tn {
        /**
         * Initializes a Query with a path and optional additional query constraints.
         * Path must currently be empty if this is a collection group query.
         */
        constructor(t, n = null, e = [], s = [], r = null, i = "F" /* First */ , o = null, u = null) {
            this.path = t, this.collectionGroup = n, this.Ct = e, this.filters = s, this.limit = r, 
            this.limitType = i, this.startAt = o, this.endAt = u, this.Lt = null, 
            // The corresponding `Target` of this `Query` instance.
            this.Ut = null, this.startAt, this.endAt;
        }
    }

    /** Creates a new Query for a query that matches all documents at `path` */ function nn(t) {
        return !X(t.limit) && "L" /* Last */ === t.limitType;
    }

    function en(t) {
        return t.Ct.length > 0 ? t.Ct[0].field : null;
    }

    function sn(t) {
        for (const n of t.filters) if (n.Ot()) return n.field;
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
    function rn(t) {
        return null !== t.collectionGroup;
    }

    /**
     * Returns the implicit order by constraint that is used to execute the Query,
     * which can be different from the order by constraints the user provided (e.g.
     * the SDK and backend always orders by `__name__`).
     */ function on(t) {
        const n = m(t);
        if (null === n.Lt) {
            n.Lt = [];
            const t = sn(n), e = en(n);
            if (null !== t && null === e) 
            // In order to implicitly add key ordering, we must also add the
            // inequality filter field for it to be a valid query.
            // Note that the default inequality field and key ordering is ascending.
            t.Y() || n.Lt.push(new Jt(t)), n.Lt.push(new Jt(W.H(), "asc" /* ASCENDING */)); else {
                let t = !1;
                for (const e of n.Ct) n.Lt.push(e), e.field.Y() && (t = !0);
                if (!t) {
                    // The order of the implicit key ordering always matches the last
                    // explicit order by
                    const t = n.Ct.length > 0 ? n.Ct[n.Ct.length - 1].dir : "asc" /* ASCENDING */;
                    n.Lt.push(new Jt(W.H(), t));
                }
            }
        }
        return n.Lt;
    }

    /**
     * Converts this `Query` instance to it's corresponding `Target` representation.
     */ function un(t) {
        const n = m(t);
        if (!n.Ut) if ("F" /* First */ === n.limitType) n.Ut = jt(n.path, n.collectionGroup, on(n), n.filters, n.limit, n.startAt, n.endAt); else {
            // Flip the orderBy directions since we want the last results
            const t = [];
            for (const e of on(n)) {
                const n = "desc" /* DESCENDING */ === e.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new Jt(e.field, n));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                    const e = n.endAt ? new Kt(n.endAt.position, !n.endAt.before) : null, s = n.startAt ? new Kt(n.startAt.position, !n.startAt.before) : null;
            // Now return as a LimitType.First query.
            n.Ut = jt(n.path, n.collectionGroup, t, n.filters, n.limit, e, s);
        }
        return n.Ut;
    }

    function cn(t, n) {
        return function(t, n) {
            if (t.limit !== n.limit) return !1;
            if (t.orderBy.length !== n.orderBy.length) return !1;
            for (let e = 0; e < t.orderBy.length; e++) if (!Zt(t.orderBy[e], n.orderBy[e])) return !1;
            if (t.filters.length !== n.filters.length) return !1;
            for (let r = 0; r < t.filters.length; r++) if (e = t.filters[r], s = n.filters[r], 
            e.op !== s.op || !e.field.isEqual(s.field) || !Vt(e.value, s.value)) return !1;
            var e, s;
            return t.collectionGroup === n.collectionGroup && !!t.path.isEqual(n.path) && !!Xt(t.startAt, n.startAt) && Xt(t.endAt, n.endAt);
        }(un(t), un(n)) && t.limitType === n.limitType;
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
            if (t.jt) {
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
            this.Mt = void 0;
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
     */ class _n extends hn {
        constructor(t, n) {
            super(), this.Bt = t, this.kt = n;
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
    /** A field path and the TransformOperation to perform upon it. */ class wn {
        constructor(t, n) {
            this.field = t, this.transform = n;
        }
    }

    /**
     * Encodes a precondition for a mutation. This follows the model that the
     * backend accepts with the special case of an explicit "empty" precondition
     * (meaning no precondition).
     */ class mn {
        constructor(t, n) {
            this.updateTime = t, this.exists = n;
        }
        /** Creates a new empty Precondition. */    static Qt() {
            return new mn;
        }
        /** Creates a new Precondition with an exists flag. */    static exists(t) {
            return new mn(void 0, t);
        }
        /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
            return new mn(t);
        }
        /** Returns whether this Precondition is empty. */    get Wt() {
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
     */ class pn {}

    /**
     * A mutation that creates or replaces the document at the given key with the
     * object value contents.
     */ class yn extends pn {
        constructor(t, n, e, s = []) {
            super(), this.key = t, this.value = n, this.zt = e, this.fieldTransforms = s, this.type = 0 /* Set */;
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
     */ class En extends pn {
        constructor(t, n, e, s, r = []) {
            super(), this.key = t, this.data = n, this.Gt = e, this.zt = s, this.fieldTransforms = r, 
            this.type = 1 /* Patch */;
        }
    }

    /** A mutation that deletes the document at the given key. */ class In extends pn {
        constructor(t, n) {
            super(), this.key = t, this.zt = n, this.type = 2 /* Delete */ , this.fieldTransforms = [];
        }
    }

    /**
     * A mutation that verifies the existence of the document at the given key with
     * the provided precondition.
     *
     * The `verify` operation is only used in Transactions, and this class serves
     * primarily to facilitate serialization into protos.
     */ class Tn extends pn {
        constructor(t, n) {
            super(), this.key = t, this.zt = n, this.type = 3 /* Verify */ , this.fieldTransforms = [];
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
     */ const An = (() => {
        const t = {
            asc: "ASCENDING",
            desc: "DESCENDING"
        };
        return t;
    })(), Pn = (() => {
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
    class Rn {
        constructor(t, n) {
            this.g = t, this.jt = n;
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
    function Vn(t, n) {
        if (t.jt) {
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
    function gn(t, n) {
        return t.jt ? n.toBase64() : n.toUint8Array();
    }

    function vn(t, n) {
        return Vn(t, n.It());
    }

    function bn(t) {
        return w(!!t), ft.wt(function(t) {
            const n = yt(t);
            return new lt(n.seconds, n.nanos);
        }(t));
    }

    function Nn(t, n) {
        return function(t) {
            return new k([ "projects", t.projectId, "databases", t.database ]);
        }(t).child("documents").child(n).B();
    }

    function Dn(t, n) {
        return Nn(t.g, n.path);
    }

    function Fn(t, n) {
        const e = function(t) {
            const n = k.k(t);
            return w(kn(n)), n;
        }(n);
        if (e.get(1) !== t.g.projectId) throw new x(I, "Tried to deserialize key from different project: " + e.get(1) + " vs " + t.g.projectId);
        if (e.get(3) !== t.g.database) throw new x(I, "Tried to deserialize key from different database: " + e.get(3) + " vs " + t.g.database);
        return new z((w((s = e).length > 4 && "documents" === s.get(4)), s.S(5)));
        var s;
        /** Creates a Document proto from key and fields (but no create/update time) */}

    function $n(t, n) {
        return Nn(t.g, n);
    }

    function Sn(t) {
        return new k([ "projects", t.g.projectId, "databases", t.g.database ]).B();
    }

    function xn(t, n, e) {
        return {
            name: Dn(t, n),
            fields: e.proto.mapValue.fields
        };
    }

    function qn(t, n) {
        return "found" in n ? function(t, n) {
            w(!!n.found), n.found.name, n.found.updateTime;
            const e = Fn(t, n.found.name), s = bn(n.found.updateTime), r = new xt({
                mapValue: {
                    fields: n.found.fields
                }
            });
            return new Ct(e, s, r, {});
        }(t, n) : "missing" in n ? function(t, n) {
            w(!!n.missing), w(!!n.readTime);
            const e = Fn(t, n.missing), s = bn(n.readTime);
            return new Lt(e, s);
        }(t, n) : _();
    }

    function On(t, n) {
        let e;
        if (n instanceof yn) e = {
            update: xn(t, n.key, n.value)
        }; else if (n instanceof In) e = {
            delete: Dn(t, n.key)
        }; else if (n instanceof En) e = {
            update: xn(t, n.key, n.data),
            updateMask: Bn(n.Gt)
        }; else {
            if (!(n instanceof Tn)) return _();
            e = {
                verify: Dn(t, n.key)
            };
        }
        return n.fieldTransforms.length > 0 && (e.updateTransforms = n.fieldTransforms.map((t => function(t, n) {
            const e = n.transform;
            if (e instanceof ln) return {
                fieldPath: n.field.B(),
                setToServerValue: "REQUEST_TIME"
            };
            if (e instanceof fn) return {
                fieldPath: n.field.B(),
                appendMissingElements: {
                    values: e.elements
                }
            };
            if (e instanceof dn) return {
                fieldPath: n.field.B(),
                removeAllFromArray: {
                    values: e.elements
                }
            };
            if (e instanceof _n) return {
                fieldPath: n.field.B(),
                increment: e.kt
            };
            throw _();
        }(0, t)))), n.zt.Wt || (e.currentDocument = function(t, n) {
            return void 0 !== n.updateTime ? {
                updateTime: vn(t, n.updateTime)
            } : void 0 !== n.exists ? {
                exists: n.exists
            } : _();
        }(t, n.zt)), e;
    }

    function Cn(t, n) {
        // Dissect the path into parent, collectionId, and optional key filter.
        const e = {
            structuredQuery: {}
        }, s = n.path;
        null !== n.collectionGroup ? (e.parent = $n(t, s), e.structuredQuery.from = [ {
            collectionId: n.collectionGroup,
            allDescendants: !0
        } ]) : (e.parent = $n(t, s.q()), e.structuredQuery.from = [ {
            collectionId: s.C()
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
                    if (Ft(t.value)) return {
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
                    if (Ft(t.value)) return {
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
            return t.jt || X(n) ? n : {
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
        return An[t];
    }

    // visible for testing
    function jn(t) {
        return Pn[t];
    }

    function Mn(t) {
        return {
            fieldPath: t.B()
        };
    }

    function Bn(t) {
        const n = [];
        return t.fields.forEach((t => n.push(t.B()))), {
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
        return new Rn(t, /* useProto3Json= */ !0);
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
    /** Verifies whether `e` is an IndexedDbTransactionError. */
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
    class Wn {
        constructor(t, n, e, s, r) {
            this.Yt = t, this.Ht = n, this.Kt = e, this.op = s, this.Jt = r, this.Zt = new ot, 
            this.then = this.Zt.promise.then.bind(this.Zt.promise), 
            // It's normal for the deferred promise to be canceled (due to cancellation)
            // and so we attach a dummy catch callback to avoid
            // 'UnhandledPromiseRejectionWarning' log spam.
            this.Zt.promise.catch((t => {}));
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
         */    static Xt(t, n, e, s, r) {
            const i = Date.now() + e, o = new Wn(t, n, i, s, r);
            return o.start(e), o;
        }
        /**
         * Starts the timer. This is called immediately after construction by
         * createAndSchedule().
         */    start(t) {
            this.tn = setTimeout((() => this.nn()), t);
        }
        /**
         * Queues the operation to run immediately (if it hasn't already been run or
         * canceled).
         */    en() {
            return this.nn();
        }
        /**
         * Cancels the operation if it hasn't already been executed or canceled. The
         * promise will be rejected.
         *
         * As long as the operation has not yet been run, calling cancel() provides a
         * guarantee that the operation will not be run.
         */    cancel(t) {
            null !== this.tn && (this.clearTimeout(), this.Zt.reject(new x(y, "Operation cancelled" + (t ? ": " + t : ""))));
        }
        nn() {
            this.Yt.sn((() => null !== this.tn ? (this.clearTimeout(), this.op().then((t => this.Zt.resolve(t)))) : Promise.resolve()));
        }
        clearTimeout() {
            null !== this.tn && (this.Jt(this), clearTimeout(this.tn), this.tn = null);
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
     * A helper for running delayed tasks following an exponential backoff curve
     * between attempts.
     *
     * Each delay is made up of a "base" delay which follows the exponential
     * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
     * base delay. This prevents clients from accidentally synchronizing their
     * delays causing spikes of load to the backend.
     */
    class zn {
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
            this.rn = t, this.Ht = n, this.on = e, this.un = s, this.cn = r, this.an = 0, this.hn = null, 
            /** The last backoff attempt, as epoch milliseconds. */
            this.ln = Date.now(), this.reset();
        }
        /**
         * Resets the backoff delay.
         *
         * The very next backoffAndWait() will have no delay. If it is called again
         * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
         * subsequent ones will increase according to the backoffFactor.
         */    reset() {
            this.an = 0;
        }
        /**
         * Resets the backoff delay to the maximum delay (e.g. for use after a
         * RESOURCE_EXHAUSTED error).
         */    fn() {
            this.an = this.cn;
        }
        /**
         * Returns a promise that resolves after currentDelayMs, and increases the
         * delay for any subsequent attempts. If there was a pending backoff operation
         * already, it will be canceled.
         */    dn(t) {
            // Cancel any pending backoff operation.
            this.cancel();
            // First schedule using the current base (which may be 0 and should be
            // honored as such).
            const n = Math.floor(this.an + this._n()), e = Math.max(0, Date.now() - this.ln), s = Math.max(0, n - e);
            // Guard against lastAttemptTime being in the future due to a clock change.
                    s > 0 && h("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.an} ms, delay with jitter: ${n} ms, last attempt: ${e} ms ago)`), 
            this.hn = this.rn.wn(this.Ht, s, (() => (this.ln = Date.now(), t()))), 
            // Apply backoff factor to determine next delay and ensure it is within
            // bounds.
            this.an *= this.un, this.an < this.on && (this.an = this.on), this.an > this.cn && (this.an = this.cn);
        }
        mn() {
            null !== this.hn && (this.hn.en(), this.hn = null);
        }
        cancel() {
            null !== this.hn && (this.hn.cancel(), this.hn = null);
        }
        /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    _n() {
            return (Math.random() - .5) * this.an;
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
    class Gn extends class {} {
        constructor(t, n, e) {
            super(), this.credentials = t, this.pn = n, this.Bt = e, this.yn = !1;
        }
        En() {
            if (this.yn) throw new x(v, "The client has already been terminated.");
        }
        /** Gets an auth token and invokes the provided RPC. */    ot(t, n, e) {
            return this.En(), this.credentials.getToken().then((s => this.pn.ot(t, n, e, s))).catch((t => {
                throw t.code === V && this.credentials._(), t;
            }));
        }
        /** Gets an auth token and invokes the provided RPC with streamed results. */    ht(t, n, e) {
            return this.En(), this.credentials.getToken().then((s => this.pn.ht(t, n, e, s))).catch((t => {
                throw t.code === V && this.credentials._(), t;
            }));
        }
        terminate() {
            this.yn = !1;
        }
    }

    // TODO(firestorexp): Make sure there is only one Datastore instance per
    // firestore-exp client.
    async function Yn(t, n) {
        const e = m(t), s = Sn(e.Bt) + "/documents", r = {
            writes: n.map((t => On(e.Bt, t)))
        };
        await e.ot("Commit", s, r);
    }

    async function Hn(t, n) {
        const e = m(t), s = Sn(e.Bt) + "/documents", r = {
            documents: n.map((t => Dn(e.Bt, t)))
        }, i = await e.ht("BatchGetDocuments", s, r), o = new Map;
        i.forEach((t => {
            const n = qn(e.Bt, t);
            o.set(n.key.toString(), n);
        }));
        const u = [];
        return n.forEach((t => {
            const n = o.get(t.toString());
            w(!!n), u.push(n);
        })), u;
    }

    async function Kn(t, n) {
        const e = m(t), s = Cn(e.Bt, un(n));
        return (await e.ht("RunQuery", s.parent, {
            structuredQuery: s.structuredQuery
        })).filter((t => !!t.document)).map((t => function(t, n, e) {
            const s = Fn(t, n.name), r = bn(n.updateTime), i = new xt({
                mapValue: {
                    fields: n.fields
                }
            });
            return new Ct(s, r, i, {
                hasCommittedMutations: !!e
            });
        }(e.Bt, t.document, void 0)));
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
    /**
     * A concrete type describing all the values that can be applied via a
     * user-supplied firestore.Settings object. This is a separate type so that
     * defaults can be supplied and the value can be checked for equality.
     */
    class Jn {
        constructor(t) {
            var n;
            if (void 0 === t.host) {
                if (void 0 !== t.ssl) throw new x(I, "Can't provide ssl option if host option is not set");
                this.host = "firestore.googleapis.com", this.ssl = true;
            } else this.host = t.host, this.ssl = null === (n = t.ssl) || void 0 === n || n;
            if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
            void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
                if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new x(I, "cacheSizeBytes must be at least 1048576");
                this.cacheSizeBytes = t.cacheSizeBytes;
            }
            this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
            function(t, n, e, s) {
                if (!0 === n && !0 === s) throw new x(I, `${t} and ${e} cannot be used together.`);
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
     */ const Zn = new Map;

    /**
     * An instance map that ensures only one Datastore exists per Firestore
     * instance.
     */
    /**
     * Returns an initialized and started Datastore for the given Firestore
     * instance. Callers must invoke removeComponents() when the Firestore
     * instance is terminated.
     */
    function Xn(t) {
        if (t.In) throw new x(v, "The client has already been terminated.");
        if (!Zn.has(t)) {
            h("ComponentProvider", "Initializing Datastore");
            const r = function(t) {
                return new it(t, fetch.bind(null));
            }((n = t.Tn, e = t.An, s = t.Pn(), new j(n, e, s.host, s.ssl, s.experimentalForceLongPolling, s.experimentalAutoDetectLongPolling))), i = Qn(t.Tn), o = function(t, n, e) {
                return new Gn(t, n, e);
            }(t.Rn, r, i);
            Zn.set(t, o);
        }
        var n, e, s;
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
     */    return Zn.get(t);
    }

    /**
     * Removes all components associated with the provided instance. Must be called
     * when the `Firestore` instance is terminated.
     */ class te {
        /** @hideconstructor */
        constructor(t, n) {
            this.An = "(lite)", this.Vn = new Jn({}), this.gn = !1, t instanceof M ? (this.Tn = t, 
            this.Rn = new O) : (this.vn = t, this.Tn = function(t) {
                if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new x(I, '"projectId" not provided in firebase.initializeApp.');
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
     */ (t), this.Rn = new C(n));
        }
        /**
         * The {@link FirebaseApp} associated with this `Firestore` service
         * instance.
         */    get app() {
            if (!this.vn) throw new x(v, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this.vn;
        }
        get bn() {
            return this.gn;
        }
        get In() {
            return void 0 !== this.Nn;
        }
        Dn(t) {
            if (this.gn) throw new x(v, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
            this.Vn = new Jn(t), void 0 !== t.credentials && (this.Rn = function(t) {
                if (!t) return new O;
                switch (t.type) {
                  case "gapi":
                    const n = t.client;
                    // Make sure this really is a Gapi client.
                                    return w(!("object" != typeof n || null === n || !n.auth || !n.auth.getAuthHeaderValueForFirstParty)), 
                    new U(n, t.sessionIndex || "0");

                  case "provider":
                    return t.client;

                  default:
                    throw new x(I, "makeCredentialsProvider failed due to invalid credential type");
                }
            }(t.credentials));
        }
        Fn() {
            return this.Vn;
        }
        Pn() {
            return this.gn = !0, this.Vn;
        }
        _delete() {
            return this.Nn || (this.Nn = this.$n()), this.Nn;
        }
        toJSON() {
            return {
                app: this.vn,
                g: this.Tn,
                settings: this.Vn
            };
        }
        /**
         * Terminates all components used by this client. Subclasses can override
         * this method to clean up their own dependencies, but must also call this
         * method.
         *
         * Only ever called once.
         */    $n() {
            return function(t) {
                const n = Zn.get(t);
                n && (h("ComponentProvider", "Removing Datastore"), Zn.delete(t), n.terminate());
            }(this), Promise.resolve();
        }
    }

    function ne(n, e) {
        const s = app._getProvider(n, "firestore/lite").getImmediate();
        return s.Dn(e), s;
    }

    /**
     * Returns the existing instance of Firestore that is associated with the
     * provided {@link FirebaseApp}. If no instance exists, initializes a new
     * instance with default settings.
     *
     * @param app - The {@link FirebaseApp} instance that the returned Firestore
     * instance is associated with.
     * @returns The `Firestore` instance of the provided app.
     */ function ee(n) {
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
     */ function se(t, n, e) {
        const s = (t = J(t, te)).Fn();
        "firestore.googleapis.com" !== s.host && s.host !== n && f("Host has been set in both settings() and useEmulator(), emulator host will be used"), 
        t.Dn(Object.assign(Object.assign({}, s), {
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
     */ function re(t) {
        return t = J(t, te), app._removeServiceInstance(t.app, "firestore/lite"), t._delete();
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
    class ie {
        constructor(t) {
            this.et = t;
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
     */ class oe {
        /** @hideconstructor */
        constructor(t, n, e) {
            this.Sn = n, this.xn = e, 
            /** The type of this Firestore reference. */
            this.type = "document", this.firestore = t;
        }
        get qn() {
            return this.xn.path;
        }
        /**
         * The document's identifier within its collection.
         */    get id() {
            return this.xn.path.C();
        }
        /**
         * A string representing the path of the referenced document (relative
         * to the root of the database).
         */    get path() {
            return this.xn.path.B();
        }
        /**
         * The collection this `DocumentReference` belongs to.
         */    get parent() {
            return new ce(this.firestore, this.Sn, this.xn.path.q());
        }
        /**
         * Applies a custom data converter to this `DocumentReference`, allowing you
         * to use your own custom model objects with Firestore. When you call {@link
         * setDoc}, {@link getDoc}, etc. with the returned `DocumentReference`
         * instance, the provided converter will convert between Firestore data and
         * your custom type `U`.
         *
         * @param converter - Converts objects to and from Firestore.
         * @returns A `DocumentReference<U>` that uses the provided converter.
         */    withConverter(t) {
            return new oe(this.firestore, t, this.xn);
        }
    }

    /**
     * A `Query` refers to a Query which you can read or listen to. You can also
     * construct refined `Query` objects by adding filters and ordering.
     */ class ue {
        // This is the lite version of the Query class in the main SDK.
        /** @hideconstructor protected */
        constructor(t, n, e) {
            this.Sn = n, this.On = e, 
            /** The type of this Firestore reference. */
            this.type = "query", this.firestore = t;
        }
        /**
         * Applies a custom data converter to this query, allowing you to use your own
         * custom model objects with Firestore. When you call {@link getDocs} with
         * the returned query, the provided converter will convert between Firestore
         * data and your custom type `U`.
         *
         * @param converter - Converts objects to and from Firestore.
         * @returns A `Query<U>` that uses the provided converter.
         */    withConverter(t) {
            return new ue(this.firestore, t, this.On);
        }
    }

    /**
     * A `CollectionReference` object can be used for adding documents, getting
     * document references, and querying for documents (using {@link query}).
     */ class ce extends ue {
        /** @hideconstructor */
        constructor(t, n, e) {
            super(t, n, new tn(e)), this.firestore = t, this.qn = e, this.type = "collection";
        }
        /** The collection's identifier. */    get id() {
            return this.On.path.C();
        }
        /**
         * A string representing the path of the referenced collection (relative
         * to the root of the database).
         */    get path() {
            return this.On.path.B();
        }
        /**
         * A reference to the containing `DocumentReference` if this is a
         * subcollection. If this isn't a subcollection, the reference is null.
         */    get parent() {
            const t = this.qn.q();
            return t.L() ? null : new oe(this.firestore, 
            /* converter= */ null, new z(t));
        }
        /**
         * Applies a custom data converter to this CollectionReference, allowing you
         * to use your own custom model objects with Firestore. When you call {@link
         * addDoc} with the returned `CollectionReference` instance, the provided
         * converter will convert between Firestore data and your custom type `U`.
         *
         * @param converter - Converts objects to and from Firestore.
         * @returns A `CollectionReference<U>` that uses the provided converter.
         */    withConverter(t) {
            return new ce(this.firestore, t, this.qn);
        }
    }

    function ae(t, n, ...e) {
        if (t instanceof ie && (t = t.et), G("collection", "path", n), t instanceof te) {
            const s = k.k(n, ...e);
            return H(s), new ce(t, /* converter= */ null, s);
        }
        {
            if (!(t instanceof oe || t instanceof ce)) throw new x(I, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = k.k(t.path, ...e).child(k.k(n));
            return H(s), new ce(t.firestore, 
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
     */ function he(t, n) {
        if (t = J(t, te), G("collectionGroup", "collection id", n), n.indexOf("/") >= 0) throw new x(I, `Invalid collection ID '${n}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
        return new ue(t, 
        /* converter= */ null, 
        /**
     * Creates a new Query for a collection group query that matches all documents
     * within the provided collection group.
     */
        function(t) {
            return new tn(k.W(), t);
        }(n));
    }

    function le(t, n, ...e) {
        if (t instanceof ie && (t = t.et), 
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        1 === arguments.length && (n = ct.dt()), G("doc", "path", n), t instanceof te) {
            const s = k.k(n, ...e);
            return Y(s), new oe(t, 
            /* converter= */ null, new z(s));
        }
        {
            if (!(t instanceof oe || t instanceof ce)) throw new x(I, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = t.qn.child(k.k(n, ...e));
            return Y(s), new oe(t.firestore, t instanceof ce ? t.Sn : null, new z(s));
        }
    }

    /**
     * Returns true if the provided references are equal.
     *
     * @param left - A reference to compare.
     * @param right - A reference to compare.
     * @returns true if the references point to the same location in the same
     * Firestore database.
     */ function fe(t, n) {
        return t instanceof ie && (t = t.et), n instanceof ie && (n = n.et), (t instanceof oe || t instanceof ce) && (n instanceof oe || n instanceof ce) && (t.firestore === n.firestore && t.path === n.path && t.Sn === n.Sn);
    }

    /**
     * Returns true if the provided queries point to the same collection and apply
     * the same constraints.
     *
     * @param left - A `Query` to compare.
     * @param right - A `Query` to compare.
     * @returns true if the references point to the same location in the same
     * Firestore database.
     */ function de(t, n) {
        return t instanceof ie && (t = t.et), n instanceof ie && (n = n.et), t instanceof ue && n instanceof ue && (t.firestore === n.firestore && cn(t.On, n.On) && t.Sn === n.Sn);
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
     */ class _e {
        /** @hideconstructor */
        constructor(t) {
            this.Cn = t;
        }
        /**
         * Creates a new `Bytes` object from the given Base64 string, converting it to
         * bytes.
         *
         * @param base64 - The Base64 string used to create the `Bytes` object.
         */    static fromBase64String(t) {
            try {
                return new _e(mt.fromBase64String(t));
            } catch (t) {
                throw new x(I, "Failed to construct data from Base64 string: " + t);
            }
        }
        /**
         * Creates a new `Bytes` object from the given Uint8Array.
         *
         * @param array - The Uint8Array used to create the `Bytes` object.
         */    static fromUint8Array(t) {
            return new _e(mt.fromUint8Array(t));
        }
        /**
         * Returns the underlying bytes as a Base64-encoded string.
         *
         * @returns The Base64-encoded string created from the `Bytes` object.
         */    toBase64() {
            return this.Cn.toBase64();
        }
        /**
         * Returns the underlying bytes in a new `Uint8Array`.
         *
         * @returns The Uint8Array created from the `Bytes` object.
         */    toUint8Array() {
            return this.Cn.toUint8Array();
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
            return this.Cn.isEqual(t.Cn);
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
            for (let n = 0; n < t.length; ++n) if (0 === t[n].length) throw new x(I, "Invalid field name at argument $(i + 1). Field names must not be empty.");
            this.Ln = new W(t);
        }
        /**
         * Returns true if this `FieldPath` is equal to the provided one.
         *
         * @param other - The `FieldPath` to compare against.
         * @returns true if this `FieldPath` is equal to the provided one.
         */    isEqual(t) {
            return this.Ln.isEqual(t.Ln);
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
            if (!isFinite(t) || t < -90 || t > 90) throw new x(I, "Latitude must be a number between -90 and 90, but was: " + t);
            if (!isFinite(n) || n < -180 || n > 180) throw new x(I, "Longitude must be a number between -180 and 180, but was: " + n);
            this.Un = t, this.jn = n;
        }
        /**
         * The latitude of this `GeoPoint` instance.
         */    get latitude() {
            return this.Un;
        }
        /**
         * The longitude of this `GeoPoint` instance.
         */    get longitude() {
            return this.jn;
        }
        /**
         * Returns true if this `GeoPoint` is equal to the provided one.
         *
         * @param other - The `GeoPoint` to compare against.
         * @returns true if this `GeoPoint` is equal to the provided one.
         */    isEqual(t) {
            return this.Un === t.Un && this.jn === t.jn;
        }
        toJSON() {
            return {
                latitude: this.Un,
                longitude: this.jn
            };
        }
        /**
         * Actually private to JS consumers of our API, so this function is prefixed
         * with an underscore.
         */    _t(t) {
            return at(this.Un, t.Un) || at(this.jn, t.jn);
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
     */ const Ee = /^__.*__$/;

    /** The result of parsing document data (e.g. for a setData call). */ class Ie {
        constructor(t, n, e) {
            this.data = t, this.Gt = n, this.fieldTransforms = e;
        }
        Mn(t, n) {
            return null !== this.Gt ? new En(t, this.data, this.Gt, n, this.fieldTransforms) : new yn(t, this.data, n, this.fieldTransforms);
        }
    }

    /** The result of parsing "update" data (i.e. for an updateData call). */ class Te {
        constructor(t, 
        // The fieldMask does not include document transforms.
        n, e) {
            this.data = t, this.Gt = n, this.fieldTransforms = e;
        }
        Mn(t, n) {
            return new En(t, this.data, this.Gt, n, this.fieldTransforms);
        }
    }

    function Ae(t) {
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
            throw _();
        }
    }

    /** A "context" object passed around while parsing user data. */ class Pe {
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
            this.settings = t, this.g = n, this.Bt = e, this.ignoreUndefinedProperties = s, 
            // Minor hack: If fieldTransforms is undefined, we assume this is an
            // external call and we need to validate the entire path.
            void 0 === r && this.Bn(), this.fieldTransforms = r || [], this.Gt = i || [];
        }
        get path() {
            return this.settings.path;
        }
        get kn() {
            return this.settings.kn;
        }
        /** Returns a new context with the specified settings overwritten. */    Qn(t) {
            return new Pe(Object.assign(Object.assign({}, this.settings), t), this.g, this.Bt, this.ignoreUndefinedProperties, this.fieldTransforms, this.Gt);
        }
        Wn(t) {
            var n;
            const e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t), s = this.Qn({
                path: e,
                zn: !1
            });
            return s.Gn(t), s;
        }
        Yn(t) {
            var n;
            const e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t), s = this.Qn({
                path: e,
                zn: !1
            });
            return s.Bn(), s;
        }
        Hn(t) {
            // TODO(b/34871131): We don't support array paths right now; so make path
            // undefined.
            return this.Qn({
                path: void 0,
                zn: !0
            });
        }
        Kn(t) {
            return ke(t, this.settings.methodName, this.settings.Jn || !1, this.path, this.settings.Zn);
        }
        /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
            return void 0 !== this.Gt.find((n => t.U(n))) || void 0 !== this.fieldTransforms.find((n => t.U(n.field)));
        }
        Bn() {
            // TODO(b/34871131): Remove null check once we have proper paths for fields
            // within arrays.
            if (this.path) for (let t = 0; t < this.path.length; t++) this.Gn(this.path.get(t));
        }
        Gn(t) {
            if (0 === t.length) throw this.Kn("Document fields must not be empty");
            if (Ae(this.kn) && Ee.test(t)) throw this.Kn('Document fields cannot begin and end with "__"');
        }
    }

    /**
     * Helper for parsing raw user input (provided via the API) into internal model
     * classes.
     */ class Re {
        constructor(t, n, e) {
            this.g = t, this.ignoreUndefinedProperties = n, this.Bt = e || Qn(t);
        }
        /** Creates a new top-level parse context. */    Xn(t, n, e, s = !1) {
            return new Pe({
                kn: t,
                methodName: n,
                Zn: e,
                path: W.W(),
                zn: !1,
                Jn: s
            }, this.g, this.Bt, this.ignoreUndefinedProperties);
        }
    }

    function Ve(t) {
        const n = t.Pn(), e = Qn(t.Tn);
        return new Re(t.Tn, !!n.ignoreUndefinedProperties, e);
    }

    /** Parse document data from a set() call. */ function ge(t, n, e, s, r, i = {}) {
        const o = t.Xn(i.merge || i.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , n, e, r);
        Ue("Data must be an object, but it was:", o, s);
        const u = Ce(s, o);
        let c, a;
        if (i.merge) c = new wt(o.Gt), a = o.fieldTransforms; else if (i.mergeFields) {
            const t = [];
            for (const s of i.mergeFields) {
                const r = je(n, s, e);
                if (!o.contains(r)) throw new x(I, `Field '${r}' is specified in your field mask but missing from your input data.`);
                Qe(t, r) || t.push(r);
            }
            c = new wt(t), a = o.fieldTransforms.filter((t => c.Tt(t.field)));
        } else c = null, a = o.fieldTransforms;
        return new Ie(new xt(u), c, a);
    }

    class ve extends pe {
        te(t) {
            if (2 /* MergeSet */ !== t.kn) throw 1 /* Update */ === t.kn ? t.Kn(this._methodName + "() can only appear at the top level of your update data") : t.Kn(this._methodName + "() cannot be used with set() unless you pass {merge:true}");
            // No transform to add for a delete, but we need to add it to our
            // fieldMask so it gets deleted.
            return t.Gt.push(t.path), null;
        }
        isEqual(t) {
            return t instanceof ve;
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
     */ function be(t, n, e) {
        return new Pe({
            kn: 3 /* Argument */ ,
            Zn: n.settings.Zn,
            methodName: t._methodName,
            zn: e
        }, n.g, n.Bt, n.ignoreUndefinedProperties);
    }

    class Ne extends pe {
        te(t) {
            return new wn(t.path, new ln);
        }
        isEqual(t) {
            return t instanceof Ne;
        }
    }

    class De extends pe {
        constructor(t, n) {
            super(t), this.ne = n;
        }
        te(t) {
            const n = be(this, t, 
            /*array=*/ !0), e = this.ne.map((t => Oe(t, n))), s = new fn(e);
            return new wn(t.path, s);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class Fe extends pe {
        constructor(t, n) {
            super(t), this.ne = n;
        }
        te(t) {
            const n = be(this, t, 
            /*array=*/ !0), e = this.ne.map((t => Oe(t, n))), s = new dn(e);
            return new wn(t.path, s);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class $e extends pe {
        constructor(t, n) {
            super(t), this.ee = n;
        }
        te(t) {
            const n = new _n(t.Bt, an(t.Bt, this.ee));
            return new wn(t.path, n);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    /** Parse update data from an update() call. */ function Se(t, n, e, s) {
        const r = t.Xn(1 /* Update */ , n, e);
        Ue("Data must be an object, but it was:", r, s);
        const i = [], o = new qt;
        _t(s, ((t, s) => {
            const u = Be(n, t, e);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    s instanceof ie && (s = s.et);
            const c = r.Yn(u);
            if (s instanceof ve) 
            // Add it to the field mask, but don't add anything to updateData.
            i.push(u); else {
                const t = Oe(s, c);
                null != t && (i.push(u), o.set(u, t));
            }
        }));
        const u = new wt(i);
        return new Te(o.bt(), u, r.fieldTransforms);
    }

    /** Parse update data from a list of field/value arguments. */ function xe(t, n, e, s, r, i) {
        const o = t.Xn(1 /* Update */ , n, e), u = [ je(n, s, e) ], c = [ r ];
        if (i.length % 2 != 0) throw new x(I, `Function ${n}() needs to be called with an even number of arguments that alternate between field names and values.`);
        for (let t = 0; t < i.length; t += 2) u.push(je(n, i[t])), c.push(i[t + 1]);
        const a = [], h = new qt;
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (let t = u.length - 1; t >= 0; --t) if (!Qe(a, u[t])) {
            const n = u[t];
            let e = c[t];
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    e instanceof ie && (e = e.et);
            const s = o.Yn(n);
            if (e instanceof ve) 
            // Add it to the field mask, but don't add anything to updateData.
            a.push(n); else {
                const t = Oe(e, s);
                null != t && (a.push(n), h.set(n, t));
            }
        }
        const l = new wt(a);
        return new Te(h.bt(), l, o.fieldTransforms);
    }

    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays - Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */ function qe(t, n, e, s = !1) {
        return Oe(e, t.Xn(s ? 4 /* ArrayArgument */ : 3 /* Argument */ , n));
    }

    /**
     * Parses user data to Protobuf Values.
     *
     * @param input - Data to be parsed.
     * @param context - A context object representing the current path being parsed,
     * the source of the data being parsed, etc.
     * @returns The parsed value, or null if the value was a FieldValue sentinel
     * that should not be included in the resulting parsed data.
     */ function Oe(t, n) {
        if (
        // Unwrap the API type from the Compat SDK. This will return the API type
        // from firestore-exp.
        t instanceof ie && (t = t.et), Le(t)) return Ue("Unsupported field value:", n, t), 
        Ce(t, n);
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
            if (!Ae(n.kn)) throw n.Kn(t._methodName + "() can only be used with update() and set()");
            if (!n.path) throw n.Kn(t._methodName + "() is not currently supported inside arrays");
            const e = t.te(n);
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
        n.path && n.Gt.push(n.path), t instanceof Array) {
            // TODO(b/34871131): Include the path containing the array in the error
            // message.
            // In the case of IN queries, the parsed data is an array (representing
            // the set of values to be included for the IN query) that may directly
            // contain additional arrays (each representing an individual field
            // value), so we disable this validation.
            if (n.settings.zn && 4 /* ArrayArgument */ !== n.kn) throw n.Kn("Nested arrays are not supported");
            return function(t, n) {
                const e = [];
                let s = 0;
                for (const r of t) {
                    let t = Oe(r, n.Hn(s));
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
            t instanceof ie && (t = t.et);
            if (null === t) return {
                nullValue: "NULL_VALUE"
            };
            if ("number" == typeof t) return an(n.Bt, t);
            if ("boolean" == typeof t) return {
                booleanValue: t
            };
            if ("string" == typeof t) return {
                stringValue: t
            };
            if (t instanceof Date) {
                const e = lt.fromDate(t);
                return {
                    timestampValue: Vn(n.Bt, e)
                };
            }
            if (t instanceof lt) {
                // Firestore backend truncates precision down to microseconds. To ensure
                // offline mode works the same with regards to truncation, perform the
                // truncation immediately without waiting for the backend to do that.
                const e = new lt(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
                return {
                    timestampValue: Vn(n.Bt, e)
                };
            }
            if (t instanceof ye) return {
                geoPointValue: {
                    latitude: t.latitude,
                    longitude: t.longitude
                }
            };
            if (t instanceof _e) return {
                bytesValue: gn(n.Bt, t.Cn)
            };
            if (t instanceof oe) {
                const e = n.g, s = t.firestore.Tn;
                if (!s.isEqual(e)) throw n.Kn(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${e.projectId}/${e.database}`);
                return {
                    referenceValue: Nn(t.firestore.Tn || n.g, t.xn.path)
                };
            }
            throw n.Kn("Unsupported field value: " + K(t));
        }
        /**
     * Checks whether an object looks like a JSON object that should be converted
     * into a struct. Normal class/prototype instances are considered to look like
     * JSON objects since they should be converted to a struct value. Arrays, Dates,
     * GeoPoints, etc. are not considered to look like JSON objects since they map
     * to specific FieldValue types other than ObjectValue.
     */ (t, n);
    }

    function Ce(t, n) {
        const e = {};
        return !function(t) {
            for (const n in t) if (Object.prototype.hasOwnProperty.call(t, n)) return !1;
            return !0;
        }(t) ? _t(t, ((t, s) => {
            const r = Oe(s, n.Wn(t));
            null != r && (e[t] = r);
        })) : 
        // If we encounter an empty object, we explicitly add it to the update
        // mask to ensure that the server creates a map entry.
        n.path && n.path.length > 0 && n.Gt.push(n.path), {
            mapValue: {
                fields: e
            }
        };
    }

    function Le(t) {
        return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof lt || t instanceof ye || t instanceof _e || t instanceof oe || t instanceof pe);
    }

    function Ue(t, n, e) {
        if (!Le(e) || !function(t) {
            return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
        }(e)) {
            const s = K(e);
            throw "an object" === s ? n.Kn(t + " a custom object") : n.Kn(t + " " + s);
        }
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function je(t, n, e) {
        if (
        // If required, replace the FieldPath Compat class with with the firestore-exp
        // FieldPath.
        n instanceof ie && (n = n.et), n instanceof we) return n.Ln;
        if ("string" == typeof n) return Be(t, n);
        throw ke("Field path arguments must be of type string or FieldPath.", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, e);
    }

    /**
     * Matches any characters in a field path string that are reserved.
     */ const Me = new RegExp("[~\\*/\\[\\]]");

    /**
     * Wraps fromDotSeparatedString with an error message about the method that
     * was thrown.
     * @param methodName - The publicly visible method name
     * @param path - The dot-separated string form of a field path which will be
     * split on dots.
     * @param targetDoc - The document against which the field path will be
     * evaluated.
     */ function Be(t, n, e) {
        if (n.search(Me) >= 0) throw ke(`Invalid field path (${n}). Paths must not contain '~', '*', '/', '[', or ']'`, t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, e);
        try {
            return new we(...n.split(".")).Ln;
        } catch (s) {
            throw ke(`Invalid field path (${n}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t, 
            /* hasConverter= */ !1, 
            /* path= */ void 0, e);
        }
    }

    function ke(t, n, e, s, r) {
        const i = s && !s.L(), o = void 0 !== r;
        let u = `Function ${n}() called with invalid data`;
        e && (u += " (via `toFirestore()`)"), u += ". ";
        let c = "";
        return (i || o) && (c += " (found", i && (c += " in field " + s), o && (c += " in document " + r), 
        c += ")"), new x(I, u + t + c);
    }

    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */ function Qe(t, n) {
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
     * Converts Firestore's internal types to the JavaScript types that we expose
     * to the user.
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
     * A `DocumentSnapshot` contains data read from a document in your Firestore
     * database. The data can be extracted with `.data()` or `.get(<field>)` to
     * get a specific field.
     *
     * For a `DocumentSnapshot` that points to a non-existing document, any data
     * access will return 'undefined'. You can use the `exists()` method to
     * explicitly verify a document's existence.
     */
    class We {
        // Note: This class is stripped down version of the DocumentSnapshot in
        // the legacy SDK. The changes are:
        // - No support for SnapshotMetadata.
        // - No support for SnapshotOptions.
        /** @hideconstructor protected */
        constructor(t, n, e, s, r) {
            this.se = t, this.re = n, this.xn = e, this.ie = s, this.Sn = r;
        }
        /** Property of the `DocumentSnapshot` that provides the document's ID. */    get id() {
            return this.xn.path.C();
        }
        /**
         * The `DocumentReference` for the document included in the `DocumentSnapshot`.
         */    get ref() {
            return new oe(this.se, this.Sn, this.xn);
        }
        /**
         * Signals whether or not the document at the snapshot's location exists.
         *
         * @returns true if the document exists.
         */    exists() {
            return null !== this.ie;
        }
        /**
         * Retrieves all fields in the document as an `Object`. Returns `undefined` if
         * the document doesn't exist.
         *
         * @returns An `Object` containing all fields in the document or `undefined`
         * if the document doesn't exist.
         */    data() {
            if (this.ie) {
                if (this.Sn) {
                    // We only want to use the converter and create a new DocumentSnapshot
                    // if a converter has been provided.
                    const t = new ze(this.se, this.re, this.xn, this.ie, 
                    /* converter= */ null);
                    return this.Sn.fromFirestore(t);
                }
                return this.re.oe(this.ie.$t());
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
            if (this.ie) {
                const n = this.ie.data().field(He("DocumentSnapshot.get", t));
                if (null !== n) return this.re.oe(n);
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
     */ class ze extends We {
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
     */ class Ge {
        /** @hideconstructor */
        constructor(t, n) {
            this.ue = n, this.query = t;
        }
        /** An array of all the documents in the `QuerySnapshot`. */    get docs() {
            return [ ...this.ue ];
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
            this.ue.forEach(t, n);
        }
    }

    /**
     * Returns true if the provided snapshots are equal.
     *
     * @param left - A snapshot to compare.
     * @param right - A snapshot to compare.
     * @returns true if the snapshots are equal.
     */ function Ye(t, n) {
        return t instanceof ie && (t = t.et), n instanceof ie && (n = n.et), t instanceof We && n instanceof We ? t.se === n.se && t.xn.isEqual(n.xn) && (null === t.ie ? null === n.ie : t.ie.isEqual(n.ie)) && t.Sn === n.Sn : t instanceof Ge && n instanceof Ge && (de(t.query, n.query) && ht(t.docs, n.docs, Ye));
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function He(t, n) {
        return "string" == typeof n ? Be(t, n) : n instanceof ie ? n.et.Ln : n.Ln;
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
    class Ke {}

    /**
     * Creates a new immutable instance of `query` that is extended to also include
     * additional query constraints.
     *
     * @param query - The query instance to use as a base for the new constraints.
     * @param queryConstraints - The list of `QueryConstraint`s to apply.
     * @throws if any of the provided query constraints cannot be combined with the
     * existing or new constraints.
     */ function Je(t, ...n) {
        for (const e of n) t = e.ce(t);
        return t;
    }

    class Ze extends Ke {
        constructor(t, n, e) {
            super(), this.ae = t, this.he = n, this.le = e, this.type = "where";
        }
        ce(t) {
            const n = Ve(t.firestore), e = function(t, n, e, s, r, i, o) {
                let u;
                if (r.Y()) {
                    if ("array-contains" /* ARRAY_CONTAINS */ === i || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === i) throw new x(I, `Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);
                    if ("in" /* IN */ === i || "not-in" /* NOT_IN */ === i) {
                        ds(o, i);
                        const n = [];
                        for (const e of o) n.push(fs(s, t, e));
                        u = {
                            arrayValue: {
                                values: n
                            }
                        };
                    } else u = fs(s, t, o);
                } else "in" /* IN */ !== i && "not-in" /* NOT_IN */ !== i && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== i || ds(o, i), 
                u = qe(e, n, o, 
                /* allowArrays= */ "in" /* IN */ === i || "not-in" /* NOT_IN */ === i);
                const c = Mt.create(r, i, u);
                return function(t, n) {
                    if (n.Ot()) {
                        const e = sn(t);
                        if (null !== e && !e.isEqual(n.field)) throw new x(I, `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${e.toString()}' and '${n.field.toString()}'`);
                        const s = en(t);
                        null !== s && _s(t, n.field, s);
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
                    throw e === n.op ? new x(I, `Invalid query. You cannot use more than one '${n.op.toString()}' filter.`) : new x(I, `Invalid query. You cannot use '${n.op.toString()}' filters with '${e.toString()}' filters.`);
                }(t, c), c;
            }(t.On, "where", n, t.firestore.Tn, this.ae, this.he, this.le);
            return new ue(t.firestore, t.Sn, function(t, n) {
                const e = t.filters.concat([ n ]);
                return new tn(t.path, t.collectionGroup, t.Ct.slice(), e, t.limit, t.limitType, t.startAt, t.endAt);
            }(t.On, e));
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
     */ function Xe(t, n, e) {
        const s = n, r = He("where", t);
        return new Ze(r, s, e);
    }

    class ts extends Ke {
        constructor(t, n) {
            super(), this.ae = t, this.fe = n, this.type = "orderBy";
        }
        ce(t) {
            const n = function(t, n, e) {
                if (null !== t.startAt) throw new x(I, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
                if (null !== t.endAt) throw new x(I, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
                const s = new Jt(n, e);
                return function(t, n) {
                    if (null === en(t)) {
                        // This is the first order by. It must match any inequality.
                        const e = sn(t);
                        null !== e && _s(t, e, n.field);
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
     */ (t.On, this.ae, this.fe);
            return new ue(t.firestore, t.Sn, function(t, n) {
                // TODO(dimond): validate that orderBy does not list the same key twice.
                const e = t.Ct.concat([ n ]);
                return new tn(t.path, t.collectionGroup, e, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
            }(t.On, n));
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
     */ function ns(t, n = "asc") {
        const e = n, s = He("orderBy", t);
        return new ts(s, e);
    }

    class es extends Ke {
        constructor(t, n, e) {
            super(), this.type = t, this.de = n, this._e = e;
        }
        ce(t) {
            return new ue(t.firestore, t.Sn, function(t, n, e) {
                return new tn(t.path, t.collectionGroup, t.Ct.slice(), t.filters.slice(), n, e, t.startAt, t.endAt);
            }(t.On, this.de, this._e));
        }
    }

    /**
     * Creates a `QueryConstraint` that only returns the first matching documents.
     *
     * @param limit - The maximum number of items to return.
     * @returns The created `Query`.
     */ function ss(t) {
        return Z("limit", t), new es("limit", t, "F" /* First */);
    }

    /**
     * Creates a `QueryConstraint` that only returns the last matching documents.
     *
     * You must specify at least one `orderBy` clause for `limitToLast` queries,
     * otherwise an exception will be thrown during execution.
     *
     * @param limit - The maximum number of items to return.
     * @returns The created `Query`.
     */ function rs(t) {
        return Z("limitToLast", t), new es("limitToLast", t, "L" /* Last */);
    }

    class is extends Ke {
        constructor(t, n, e) {
            super(), this.type = t, this.we = n, this.me = e;
        }
        ce(t) {
            const n = ls(t, this.type, this.we, this.me);
            return new ue(t.firestore, t.Sn, function(t, n) {
                return new tn(t.path, t.collectionGroup, t.Ct.slice(), t.filters.slice(), t.limit, t.limitType, n, t.endAt);
            }(t.On, n));
        }
    }

    function os(...t) {
        return new is("startAt", t, /*before=*/ !0);
    }

    function us(...t) {
        return new is("startAfter", t, 
        /*before=*/ !1);
    }

    class cs extends Ke {
        constructor(t, n, e) {
            super(), this.type = t, this.we = n, this.me = e;
        }
        ce(t) {
            const n = ls(t, this.type, this.we, this.me);
            return new ue(t.firestore, t.Sn, function(t, n) {
                return new tn(t.path, t.collectionGroup, t.Ct.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, n);
            }(t.On, n));
        }
    }

    function as(...t) {
        return new cs("endBefore", t, /*before=*/ !0);
    }

    function hs(...t) {
        return new cs("endAt", t, /*before=*/ !1);
    }

    /** Helper function to create a bound from a document or fields */ function ls(t, n, e, s) {
        if (e[0] instanceof ie && (e[0] = e[0].et), e[0] instanceof We) return function(t, n, e, s, r) {
            if (!s) throw new x(A, "Can't use a DocumentSnapshot that doesn't exist for " + e + "().");
            const i = [];
            // Because people expect to continue/end a query at the exact document
            // provided, we need to use the implicit sort order rather than the explicit
            // sort order, because it's guaranteed to contain the document key. That way
            // the position becomes unambiguous and the query continues/ends exactly at
            // the provided document. Without the key (by using the explicit sort
            // orders), multiple documents could match the position, yielding duplicate
            // results.
                    for (const e of on(t)) if (e.field.Y()) i.push(Nt(n, s.key)); else {
                const t = s.field(e.field);
                if (Tt(t)) throw new x(I, 'Invalid query. You are trying to start or end a query using a document for which the field "' + e.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === t) {
                    const t = e.field.B();
                    throw new x(I, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`);
                }
                i.push(t);
            }
            return new Kt(i, r);
        }
        /**
     * Converts a list of field values to a Bound for the given query.
     */ (t.On, t.firestore.Tn, n, e[0].ie, s);
        {
            const r = Ve(t.firestore);
            return function(t, n, e, s, r, i) {
                // Use explicit order by's because it has to match the query the user made
                const o = t.Ct;
                if (r.length > o.length) throw new x(I, `Too many arguments provided to ${s}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
                const u = [];
                for (let i = 0; i < r.length; i++) {
                    const c = r[i];
                    if (o[i].field.Y()) {
                        if ("string" != typeof c) throw new x(I, `Invalid query. Expected a string for document ID in ${s}(), but got a ${typeof c}`);
                        if (!rn(t) && -1 !== c.indexOf("/")) throw new x(I, `Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${s}() must be a plain document ID, but '${c}' contains a slash.`);
                        const e = t.path.child(k.k(c));
                        if (!z.tt(e)) throw new x(I, `Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${s}() must result in a valid document path, but '${e}' is not because it contains an odd number of segments.`);
                        const r = new z(e);
                        u.push(Nt(n, r));
                    } else {
                        const t = qe(e, s, c);
                        u.push(t);
                    }
                }
                return new Kt(u, i);
            }
            /**
     * Parses the given documentIdValue into a ReferenceValue, throwing
     * appropriate errors if the value is anything other than a DocumentReference
     * or String, or if the string is malformed.
     */ (t.On, t.firestore.Tn, r, n, e, s);
        }
    }

    function fs(t, n, e) {
        if (e instanceof ie && (e = e.et), "string" == typeof e) {
            if ("" === e) throw new x(I, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!rn(n) && -1 !== e.indexOf("/")) throw new x(I, `Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);
            const s = n.path.child(k.k(e));
            if (!z.tt(s)) throw new x(I, `Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);
            return Nt(t, new z(s));
        }
        if (e instanceof oe) return Nt(t, e.xn);
        throw new x(I, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + K(e) + ".");
    }

    /**
     * Validates that the value passed into a disjunctive filter satisfies all
     * array requirements.
     */ function ds(t, n) {
        if (!Array.isArray(t) || 0 === t.length) throw new x(I, `Invalid Query. A non-empty array is required for '${n.toString()}' filters.`);
        if (t.length > 10) throw new x(I, `Invalid Query. '${n.toString()}' filters support a maximum of 10 elements in the value array.`);
    }

    function _s(t, n, e) {
        if (!e.isEqual(n)) throw new x(I, `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${n.toString()}' and so you must also use '${n.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${e.toString()}' instead.`);
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
     * Converts custom model object of type T into DocumentData by applying the
     * converter if it exists.
     *
     * This function is used when converting user objects to DocumentData
     * because we want to provide the user with a more specific error message if
     * their set() or fails due to invalid data originating from a toFirestore()
     * call.
     */ function ws(t, n, e) {
        let s;
        // Cast to `any` in order to satisfy the union type constraint on
        // toFirestore().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return s = t ? e && (e.merge || e.mergeFields) ? t.toFirestore(n, e) : t.toFirestore(n) : n, 
        s;
    }

    class ms extends class {
        oe(t, n = "none") {
            switch (Rt(t)) {
              case 0 /* NullValue */ :
                return null;

              case 1 /* BooleanValue */ :
                return t.booleanValue;

              case 2 /* NumberValue */ :
                return Et(t.integerValue || t.doubleValue);

              case 3 /* TimestampValue */ :
                return this.pe(t.timestampValue);

              case 4 /* ServerTimestampValue */ :
                return this.ye(t, n);

              case 5 /* StringValue */ :
                return t.stringValue;

              case 6 /* BlobValue */ :
                return this.Ee(It(t.bytesValue));

              case 7 /* RefValue */ :
                return this.Ie(t.referenceValue);

              case 8 /* GeoPointValue */ :
                return this.Te(t.geoPointValue);

              case 9 /* ArrayValue */ :
                return this.Ae(t.arrayValue, n);

              case 10 /* ObjectValue */ :
                return this.Pe(t.mapValue, n);

              default:
                throw _();
            }
        }
        Pe(t, n) {
            const e = {};
            return _t(t.fields || {}, ((t, s) => {
                e[t] = this.oe(s, n);
            })), e;
        }
        Te(t) {
            return new ye(Et(t.latitude), Et(t.longitude));
        }
        Ae(t, n) {
            return (t.values || []).map((t => this.oe(t, n)));
        }
        ye(t, n) {
            switch (n) {
              case "previous":
                const e = At(t);
                return null == e ? null : this.oe(e, n);

              case "estimate":
                return this.pe(Pt(t));

              default:
                return null;
            }
        }
        pe(t) {
            const n = yt(t);
            return new lt(n.seconds, n.nanos);
        }
        Re(t, n) {
            const e = k.k(t);
            w(kn(e));
            const s = new M(e.get(1), e.get(3)), r = new z(e.S(5));
            return s.isEqual(n) || 
            // TODO(b/64130202): Somehow support foreign references.
            l(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`), 
            r;
        }
    } {
        constructor(t) {
            super(), this.firestore = t;
        }
        Ee(t) {
            return new _e(t);
        }
        Ie(t) {
            const n = this.Re(t, this.firestore.Tn);
            return new oe(this.firestore, /* converter= */ null, n);
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
        const n = Xn((t = J(t, oe)).firestore), e = new ms(t.firestore);
        return Hn(n, [ t.xn ]).then((n => {
            w(1 === n.length);
            const s = n[0];
            return new We(t.firestore, e, t.xn, s instanceof Ct ? s : null, t.Sn);
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
            if (nn(t) && 0 === t.Ct.length) throw new x(D, "limitToLast() queries require specifying at least one orderBy() clause");
        }((t = J(t, ue)).On);
        const n = Xn(t.firestore), e = new ms(t.firestore);
        return Kn(n, t.On).then((n => {
            const s = n.map((n => new ze(t.firestore, e, n.key, n, t.Sn)));
            return nn(t.On) && 
            // Limit to last queries reverse the orderBy constraint that was
            // specified by the user. As such, we need to reverse the order of the
            // results to return the documents in the expected order.
            s.reverse(), new Ge(t, s);
        }));
    }

    function Es(t, n, e) {
        const s = ws((t = J(t, oe)).Sn, n, e), r = ge(Ve(t.firestore), "setDoc", t.xn, s, null !== t.Sn, e);
        return Yn(Xn(t.firestore), [ r.Mn(t.xn, mn.Qt()) ]);
    }

    function Is(t, n, e, ...s) {
        const r = Ve((t = J(t, oe)).firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
            let i;
        n instanceof ie && (n = n.et), i = "string" == typeof n || n instanceof we ? xe(r, "updateDoc", t.xn, n, e, s) : Se(r, "updateDoc", t.xn, n);
        return Yn(Xn(t.firestore), [ i.Mn(t.xn, mn.exists(!0)) ]);
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
     */ function Ts(t) {
        return Yn(Xn((t = J(t, oe)).firestore), [ new In(t.xn, mn.Qt()) ]);
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
     */ function As(t, n) {
        const e = le(t = J(t, ce)), s = ws(t.Sn, n), r = ge(Ve(t.firestore), "addDoc", e.xn, s, null !== e.Sn, {});
        return Yn(Xn(t.firestore), [ r.Mn(e.xn, mn.exists(!1)) ]).then((() => e));
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
     */ function Ps() {
        return new ve("deleteField");
    }

    /**
     * Returns a sentinel used with {@link setDoc} or {@link updateDoc} to
     * include a server-generated timestamp in the written data.
     */ function Rs() {
        return new Ne("serverTimestamp");
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
     */ function Vs(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return new De("arrayUnion", t);
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
     */ function gs(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return new Fe("arrayRemove", t);
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
     */ function vs(t) {
        return new $e("increment", t);
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
     */ class bs {
        /** @hideconstructor */
        constructor(t, n) {
            this.se = t, this.Ve = n, this.ge = [], this.ve = !1, this.be = Ve(t);
        }
        set(t, n, e) {
            this.Ne();
            const s = Ns(t, this.se), r = ws(s.Sn, n, e), i = ge(this.be, "WriteBatch.set", s.xn, r, null !== s.Sn, e);
            return this.ge.push(i.Mn(s.xn, mn.Qt())), this;
        }
        update(t, n, e, ...s) {
            this.Ne();
            const r = Ns(t, this.se);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    let i;
            return n instanceof ie && (n = n.et), i = "string" == typeof n || n instanceof we ? xe(this.be, "WriteBatch.update", r.xn, n, e, s) : Se(this.be, "WriteBatch.update", r.xn, n), 
            this.ge.push(i.Mn(r.xn, mn.exists(!0))), this;
        }
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be deleted.
         * @returns This `WriteBatch` instance. Used for chaining method calls.
         */    delete(t) {
            this.Ne();
            const n = Ns(t, this.se);
            return this.ge = this.ge.concat(new In(n.xn, mn.Qt())), this;
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
            return this.Ne(), this.ve = !0, this.ge.length > 0 ? this.Ve(this.ge) : Promise.resolve();
        }
        Ne() {
            if (this.ve) throw new x(v, "A write batch can no longer be used after commit() has been called.");
        }
    }

    function Ns(t, n) {
        if (t instanceof ie && (t = t.et), t.firestore !== n) throw new x(I, "Provided document reference is from a different Firestore instance.");
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
     */ function Ds(t) {
        const n = Xn(t = J(t, te));
        return new bs(t, (t => Yn(n, t)));
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
     */ class Fs {
        constructor(t) {
            this.De = t, 
            // The version of each document that was read during this transaction.
            this.Fe = new Map, this.mutations = [], this.$e = !1, 
            /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
            this.Se = null, 
            /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
            this.xe = new Set;
        }
        async qe(t) {
            if (this.Oe(), this.mutations.length > 0) throw new x(I, "Firestore transactions require all reads to be executed before all writes.");
            const n = await Hn(this.De, t);
            return n.forEach((t => {
                t instanceof Lt || t instanceof Ct ? this.Ce(t) : _();
            })), n;
        }
        set(t, n) {
            this.write(n.Mn(t, this.zt(t))), this.xe.add(t.toString());
        }
        update(t, n) {
            try {
                this.write(n.Mn(t, this.Le(t)));
            } catch (t) {
                this.Se = t;
            }
            this.xe.add(t.toString());
        }
        delete(t) {
            this.write(new In(t, this.zt(t))), this.xe.add(t.toString());
        }
        async commit() {
            if (this.Oe(), this.Se) throw this.Se;
            const t = this.Fe;
            // For each mutation, note that the doc was written.
                    this.mutations.forEach((n => {
                t.delete(n.key.toString());
            })), 
            // For each document that was read but not written to, we want to perform
            // a `verify` operation.
            t.forEach(((t, n) => {
                const e = z.J(n);
                this.mutations.push(new Tn(e, this.zt(e)));
            })), await Yn(this.De, this.mutations), this.$e = !0;
        }
        Ce(t) {
            let n;
            if (t instanceof Ct) n = t.version; else {
                if (!(t instanceof Lt)) throw _();
                // For deleted docs, we must use baseVersion 0 when we overwrite them.
                n = ft.min();
            }
            const e = this.Fe.get(t.key.toString());
            if (e) {
                if (!n.isEqual(e)) 
                // This transaction will fail no matter what.
                throw new x(b, "Document version changed between two reads.");
            } else this.Fe.set(t.key.toString(), n);
        }
        /**
         * Returns the version of this document when it was read in this transaction,
         * as a precondition, or no precondition if it was not read.
         */    zt(t) {
            const n = this.Fe.get(t.toString());
            return !this.xe.has(t.toString()) && n ? mn.updateTime(n) : mn.Qt();
        }
        /**
         * Returns the precondition for a document if the operation is an update.
         */    Le(t) {
            const n = this.Fe.get(t.toString());
            // The first time a document is written, we want to take into account the
            // read time and existence
                    if (!this.xe.has(t.toString()) && n) {
                if (n.isEqual(ft.min())) 
                // The document doesn't exist, so fail the transaction.
                // This has to be validated locally because you can't send a
                // precondition that a document does not exist without changing the
                // semantics of the backend write to be an insert. This is the reverse
                // of what we want, since we want to assert that the document doesn't
                // exist but then send the update and have it fail. Since we can't
                // express that to the backend, we have to validate locally.
                // Note: this can change once we can send separate verify writes in the
                // transaction.
                throw new x(I, "Can't update a document that doesn't exist.");
                // Document exists, base precondition on document update time.
                            return mn.updateTime(n);
            }
            // Document was not read, so we just use the preconditions for a blind
            // update.
            return mn.exists(!0);
        }
        write(t) {
            this.Oe(), this.mutations.push(t);
        }
        Oe() {}
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
    class $s {
        constructor(t, n, e, s) {
            this.Yt = t, this.De = n, this.updateFunction = e, this.Zt = s, this.Ue = 5, this.je = new zn(this.Yt, "transaction_retry" /* TransactionRetry */);
        }
        /** Runs the transaction and sets the result on deferred. */    run() {
            this.Me();
        }
        Me() {
            this.je.dn((async () => {
                const t = new Fs(this.De), n = this.Be(t);
                n && n.then((n => {
                    this.Yt.sn((() => t.commit().then((() => {
                        this.Zt.resolve(n);
                    })).catch((t => {
                        this.ke(t);
                    }))));
                })).catch((t => {
                    this.ke(t);
                }));
            }));
        }
        Be(t) {
            try {
                const n = this.updateFunction(t);
                return !X(n) && n.catch && n.then ? n : (this.Zt.reject(Error("Transaction callback must return a Promise")), 
                null);
            } catch (t) {
                // Do not retry errors thrown by user provided updateFunction.
                return this.Zt.reject(t), null;
            }
        }
        ke(t) {
            this.Ue > 0 && this.Qe(t) ? (this.Ue -= 1, this.Yt.sn((() => (this.Me(), Promise.resolve())))) : this.Zt.reject(t);
        }
        Qe(t) {
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
                      case p:
                        return _();

                      case y:
                      case E:
                      case T:
                      case g:
                      case F:
                      case $:
     // Unauthenticated means something went wrong with our token and we need
                        // to retry with new credentials which will happen automatically.
                                          case V:
                        return !1;

                      case I:
                      case A:
                      case P:
                      case R:
                      case v:
     // Aborted might be retried in some scenarios, but that is dependant on
                        // the context and should handled individually by the calling code.
                        // See https://cloud.google.com/apis/design/errors.
                                          case b:
                      case N:
                      case D:
                      case S:
                        return !0;

                      default:
                        return _();
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
    /** The Platform's 'document' implementation or null if not available. */ function Ss() {
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
     */ class xs {
        constructor() {
            // The last promise in the queue.
            this.We = Promise.resolve(), 
            // A list of retryable operations. Retryable operations are run in order and
            // retried with backoff.
            this.ze = [], 
            // Is this AsyncQueue being shut down? Once it is set to true, it will not
            // be changed again.
            this.Ge = !1, 
            // Operations scheduled to be queued in the future. Operations are
            // automatically removed after they are run or canceled.
            this.Ye = [], 
            // visible for testing
            this.He = null, 
            // Flag set while there's an outstanding AsyncQueue operation, used for
            // assertion sanity-checks.
            this.Ke = !1, 
            // List of TimerIds to fast-forward delays for.
            this.Je = [], 
            // Backoff timer used to schedule retries for retryable operations
            this.je = new zn(this, "async_queue_retry" /* AsyncQueueRetry */), 
            // Visibility handler that triggers an immediate retry of all retryable
            // operations. Meant to speed up recovery when we regain file system access
            // after page comes into foreground.
            this.Ze = () => {
                const t = Ss();
                t && h("AsyncQueue", "Visibility state changed to " + t.visibilityState), this.je.mn();
            };
            const t = Ss();
            t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.Ze);
        }
        get Xe() {
            return this.Ge;
        }
        /**
         * Adds a new operation to the queue without waiting for it to complete (i.e.
         * we ignore the Promise result).
         */    sn(t) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.enqueue(t);
        }
        ts(t) {
            this.ns(), 
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.es(t);
        }
        ss() {
            if (!this.Ge) {
                this.Ge = !0;
                const t = Ss();
                t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.Ze);
            }
        }
        enqueue(t) {
            return this.ns(), this.Ge ? new Promise((t => {})) : this.es(t);
        }
        rs(t) {
            this.sn((() => (this.ze.push(t), this.os())));
        }
        /**
         * Runs the next operation from the retryable queue. If the operation fails,
         * reschedules with backoff.
         */    async os() {
            if (0 !== this.ze.length) {
                try {
                    await this.ze[0](), this.ze.shift(), this.je.reset();
                } catch (t) {
                    if (!function(t) {
                        // Use name equality, as instanceof checks on errors don't work with errors
                        // that wrap other errors.
                        return "IndexedDbTransactionError" === t.name;
                    }(t)) throw t;
     // Failure will be handled by AsyncQueue
                                    h("AsyncQueue", "Operation failed with retryable error: " + t);
                }
                this.ze.length > 0 && 
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
                this.je.dn((() => this.os()));
            }
        }
        es(t) {
            const n = this.We.then((() => (this.Ke = !0, t().catch((t => {
                this.He = t, this.Ke = !1;
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
            })).then((t => (this.Ke = !1, t))))));
            return this.We = n, n;
        }
        wn(t, n, e) {
            this.ns(), 
            // Fast-forward delays for timerIds that have been overriden.
            this.Je.indexOf(t) > -1 && (n = 0);
            const s = Wn.Xt(this, t, n, e, (t => this.us(t)));
            return this.Ye.push(s), s;
        }
        ns() {
            this.He && _();
        }
        cs() {}
        /**
         * Waits until all currently queued tasks are finished executing. Delayed
         * operations are not run.
         */    async hs() {
            // Operations in the queue prior to draining may have enqueued additional
            // operations. Keep draining the queue until the tail is no longer advanced,
            // which indicates that no more new operations were enqueued and that all
            // operations were executed.
            let t;
            do {
                t = this.We, await t;
            } while (t !== this.We);
        }
        /**
         * For Tests: Determine if a delayed operation with a particular TimerId
         * exists.
         */    ls(t) {
            for (const n of this.Ye) if (n.Ht === t) return !0;
            return !1;
        }
        /**
         * For Tests: Runs some or all delayed operations early.
         *
         * @param lastTimerId - Delayed operations up to and including this TimerId
         * will be drained. Pass TimerId.All to run all delayed operations.
         * @returns a Promise that resolves once all operations have been run.
         */    fs(t) {
            // Note that draining may generate more delayed ops, so we do that first.
            return this.hs().then((() => {
                // Run ops in the same order they'd run if they ran naturally.
                this.Ye.sort(((t, n) => t.Kt - n.Kt));
                for (const n of this.Ye) if (n.en(), "all" /* All */ !== t && n.Ht === t) break;
                return this.hs();
            }));
        }
        /**
         * For Tests: Skip all subsequent delays for a timer id.
         */    ds(t) {
            this.Je.push(t);
        }
        /** Called once a DelayedOperation is run or canceled. */    us(t) {
            // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
            const n = this.Ye.indexOf(t);
            this.Ye.splice(n, 1);
        }
    }

    class qs {
        /** @hideconstructor */
        constructor(t, n) {
            this.se = t, this._s = n, this.be = Ve(t);
        }
        /**
         * Reads the document referenced by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be read.
         * @returns A `DocumentSnapshot` with the read data.
         */    get(t) {
            const n = Ns(t, this.se), e = new ms(this.se);
            return this._s.qe([ n.xn ]).then((t => {
                if (!t || 1 !== t.length) return _();
                const s = t[0];
                if (s instanceof Lt) return new We(this.se, e, n.xn, null, n.Sn);
                if (s instanceof Ct) return new We(this.se, e, s.key, s, n.Sn);
                throw _();
            }));
        }
        set(t, n, e) {
            const s = Ns(t, this.se), r = ws(s.Sn, n, e), i = ge(this.be, "Transaction.set", s.xn, r, null !== s.Sn, e);
            return this._s.set(s.xn, i), this;
        }
        update(t, n, e, ...s) {
            const r = Ns(t, this.se);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    let i;
            return n instanceof ie && (n = n.et), i = "string" == typeof n || n instanceof we ? xe(this.be, "Transaction.update", r.xn, n, e, s) : Se(this.be, "Transaction.update", r.xn, n), 
            this._s.update(r.xn, i), this;
        }
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be deleted.
         * @returns This `Transaction` instance. Used for chaining method calls.
         */    delete(t) {
            const n = Ns(t, this.se);
            return this._s.delete(n.xn), this;
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
        const e = Xn(t = J(t, te)), s = new ot;
        return new $s(new xs, e, (e => n(new qs(t, e))), s).run(), s.promise;
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
     */ app._registerComponent(new Component("firestore/lite", (t => ((t, n) => new te(t, n))(t.getProvider("app-exp").getImmediate(), t.getProvider("auth-internal"))), "PUBLIC" /* PUBLIC */)), 
    app.registerVersion("firestore-lite", "0.0.900", "node");

    exports.Bytes = _e;
    exports.CollectionReference = ce;
    exports.DocumentReference = oe;
    exports.DocumentSnapshot = We;
    exports.FieldPath = we;
    exports.FieldValue = pe;
    exports.FirebaseFirestore = te;
    exports.FirestoreError = x;
    exports.GeoPoint = ye;
    exports.Query = ue;
    exports.QueryConstraint = Ke;
    exports.QueryDocumentSnapshot = ze;
    exports.QuerySnapshot = Ge;
    exports.Timestamp = lt;
    exports.Transaction = qs;
    exports.WriteBatch = bs;
    exports.addDoc = As;
    exports.arrayRemove = gs;
    exports.arrayUnion = Vs;
    exports.collection = ae;
    exports.collectionGroup = he;
    exports.deleteDoc = Ts;
    exports.deleteField = Ps;
    exports.doc = le;
    exports.documentId = me;
    exports.endAt = hs;
    exports.endBefore = as;
    exports.getDoc = ps;
    exports.getDocs = ys;
    exports.getFirestore = ee;
    exports.increment = vs;
    exports.initializeFirestore = ne;
    exports.limit = ss;
    exports.limitToLast = rs;
    exports.orderBy = ns;
    exports.query = Je;
    exports.queryEqual = de;
    exports.refEqual = fe;
    exports.runTransaction = Os;
    exports.serverTimestamp = Rs;
    exports.setDoc = Es;
    exports.setLogLevel = a;
    exports.snapshotEqual = Ye;
    exports.startAfter = us;
    exports.startAt = os;
    exports.terminate = re;
    exports.updateDoc = Is;
    exports.useFirestoreEmulator = se;
    exports.where = Xe;
    exports.writeBatch = Ds;

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
