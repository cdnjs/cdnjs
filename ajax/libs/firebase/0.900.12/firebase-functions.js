(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase.functions = global.firebase.functions || {}), global.firebase.app));
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
    var LONG_TYPE = 'type.googleapis.com/google.protobuf.Int64Value';
    var UNSIGNED_LONG_TYPE = 'type.googleapis.com/google.protobuf.UInt64Value';
    function mapValues(
    // { [k: string]: unknown } is no longer a wildcard assignment target after typescript 3.5
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    o, f) {
        var result = {};
        for (var key in o) {
            if (o.hasOwnProperty(key)) {
                result[key] = f(o[key]);
            }
        }
        return result;
    }
    /**
     * Takes data and encodes it in a JSON-friendly way, such that types such as
     * Date are preserved.
     * @internal
     * @param data - Data to encode.
     */
    function encode(data) {
        if (data == null) {
            return null;
        }
        if (data instanceof Number) {
            data = data.valueOf();
        }
        if (typeof data === 'number' && isFinite(data)) {
            // Any number in JS is safe to put directly in JSON and parse as a double
            // without any loss of precision.
            return data;
        }
        if (data === true || data === false) {
            return data;
        }
        if (Object.prototype.toString.call(data) === '[object String]') {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map(function (x) { return encode(x); });
        }
        if (typeof data === 'function' || typeof data === 'object') {
            return mapValues(data, function (x) { return encode(x); });
        }
        // If we got this far, the data is not encodable.
        throw new Error('Data cannot be encoded in JSON: ' + data);
    }
    /**
     * Takes data that's been encoded in a JSON-friendly form and returns a form
     * with richer datatypes, such as Dates, etc.
     * @internal
     * @param json - JSON to convert.
     */
    function decode(json) {
        if (json == null) {
            return json;
        }
        if (json['@type']) {
            switch (json['@type']) {
                case LONG_TYPE:
                // Fall through and handle this the same as unsigned.
                case UNSIGNED_LONG_TYPE: {
                    // Technically, this could work return a valid number for malformed
                    // data if there was a number followed by garbage. But it's just not
                    // worth all the extra code to detect that case.
                    var value = Number(json['value']);
                    if (isNaN(value)) {
                        throw new Error('Data cannot be decoded from JSON: ' + json);
                    }
                    return value;
                }
                default: {
                    throw new Error('Data cannot be decoded from JSON: ' + json);
                }
            }
        }
        if (Array.isArray(json)) {
            return json.map(function (x) { return decode(x); });
        }
        if (typeof json === 'function' || typeof json === 'object') {
            return mapValues(json, function (x) { return decode(x); });
        }
        // Anything else is safe to return.
        return json;
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
     * Type constant for Firebase Functions.
     */
    var FUNCTIONS_TYPE = 'functions';

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
     * Standard error codes for different ways a request can fail, as defined by:
     * https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
     *
     * This map is used primarily to convert from a backend error code string to
     * a client SDK error code string, and make sure it's in the supported set.
     */
    var errorCodeMap = {
        OK: 'ok',
        CANCELLED: 'cancelled',
        UNKNOWN: 'unknown',
        INVALID_ARGUMENT: 'invalid-argument',
        DEADLINE_EXCEEDED: 'deadline-exceeded',
        NOT_FOUND: 'not-found',
        ALREADY_EXISTS: 'already-exists',
        PERMISSION_DENIED: 'permission-denied',
        UNAUTHENTICATED: 'unauthenticated',
        RESOURCE_EXHAUSTED: 'resource-exhausted',
        FAILED_PRECONDITION: 'failed-precondition',
        ABORTED: 'aborted',
        OUT_OF_RANGE: 'out-of-range',
        UNIMPLEMENTED: 'unimplemented',
        INTERNAL: 'internal',
        UNAVAILABLE: 'unavailable',
        DATA_LOSS: 'data-loss'
    };
    /**
     * An explicit error that can be thrown from a handler to send an error to the
     * client that called the function.
     */
    var FunctionsError = /** @class */ (function (_super) {
        __extends(FunctionsError, _super);
        function FunctionsError(
        /**
         * A standard error code that will be returned to the client. This also
         * determines the HTTP status code of the response, as defined in code.proto.
         */
        code, message, 
        /**
         * Extra data to be converted to JSON and included in the error response.
         */
        details) {
            var _this = _super.call(this, FUNCTIONS_TYPE + "/" + code, message || '') || this;
            _this.details = details;
            return _this;
        }
        return FunctionsError;
    }(FirebaseError));
    /**
     * Takes an HTTP status code and returns the corresponding ErrorCode.
     * This is the standard HTTP status code -> error mapping defined in:
     * https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
     *
     * @param status An HTTP status code.
     * @return The corresponding ErrorCode, or ErrorCode.UNKNOWN if none.
     */
    function codeForHTTPStatus(status) {
        // Make sure any successful status is OK.
        if (status >= 200 && status < 300) {
            return 'ok';
        }
        switch (status) {
            case 0:
                // This can happen if the server returns 500.
                return 'internal';
            case 400:
                return 'invalid-argument';
            case 401:
                return 'unauthenticated';
            case 403:
                return 'permission-denied';
            case 404:
                return 'not-found';
            case 409:
                return 'aborted';
            case 429:
                return 'resource-exhausted';
            case 499:
                return 'cancelled';
            case 500:
                return 'internal';
            case 501:
                return 'unimplemented';
            case 503:
                return 'unavailable';
            case 504:
                return 'deadline-exceeded';
        }
        return 'unknown';
    }
    /**
     * Takes an HTTP response and returns the corresponding Error, if any.
     */
    function _errorForResponse(status, bodyJSON) {
        var code = codeForHTTPStatus(status);
        // Start with reasonable defaults from the status code.
        var description = code;
        var details = undefined;
        // Then look through the body for explicit details.
        try {
            var errorJSON = bodyJSON && bodyJSON.error;
            if (errorJSON) {
                var status_1 = errorJSON.status;
                if (typeof status_1 === 'string') {
                    if (!errorCodeMap[status_1]) {
                        // They must've included an unknown error code in the body.
                        return new FunctionsError('internal', 'internal');
                    }
                    code = errorCodeMap[status_1];
                    // TODO(klimt): Add better default descriptions for error enums.
                    // The default description needs to be updated for the new code.
                    description = status_1;
                }
                var message = errorJSON.message;
                if (typeof message === 'string') {
                    description = message;
                }
                details = errorJSON.details;
                if (details !== undefined) {
                    details = decode(details);
                }
            }
        }
        catch (e) {
            // If we couldn't parse explicit error data, that's fine.
        }
        if (code === 'ok') {
            // Technically, there's an edge case where a developer could explicitly
            // return an error code of OK, and we will treat it as success, but that
            // seems reasonable.
            return null;
        }
        return new FunctionsError(code, description, details);
    }

    /**
     * Helper class to get metadata that should be included with a function call.
     * @internal
     */
    var ContextProvider = /** @class */ (function () {
        function ContextProvider(authProvider, messagingProvider) {
            var _this = this;
            this.auth = null;
            this.messaging = null;
            this.auth = authProvider.getImmediate({ optional: true });
            this.messaging = messagingProvider.getImmediate({
                optional: true
            });
            if (!this.auth) {
                authProvider.get().then(function (auth) { return (_this.auth = auth); }, function () {
                    /* get() never rejects */
                });
            }
            if (!this.messaging) {
                messagingProvider.get().then(function (messaging) { return (_this.messaging = messaging); }, function () {
                    /* get() never rejects */
                });
            }
        }
        ContextProvider.prototype.getAuthToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.auth) {
                                return [2 /*return*/, undefined];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.auth.getToken()];
                        case 2:
                            token = _a.sent();
                            return [2 /*return*/, token === null || token === void 0 ? void 0 : token.accessToken];
                        case 3:
                            e_1 = _a.sent();
                            // If there's any error when trying to get the auth token, leave it off.
                            return [2 /*return*/, undefined];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        ContextProvider.prototype.getMessagingToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.messaging ||
                        !('Notification' in self) ||
                        Notification.permission !== 'granted') {
                        return [2 /*return*/, undefined];
                    }
                    try {
                        return [2 /*return*/, this.messaging.getToken()];
                    }
                    catch (e) {
                        // We don't warn on this, because it usually means messaging isn't set up.
                        // console.warn('Failed to retrieve instance id token.', e);
                        // If there's any error when trying to get the token, leave it off.
                        return [2 /*return*/, undefined];
                    }
                    return [2 /*return*/];
                });
            });
        };
        ContextProvider.prototype.getContext = function () {
            return __awaiter(this, void 0, void 0, function () {
                var authToken, messagingToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getAuthToken()];
                        case 1:
                            authToken = _a.sent();
                            return [4 /*yield*/, this.getMessagingToken()];
                        case 2:
                            messagingToken = _a.sent();
                            return [2 /*return*/, { authToken: authToken, messagingToken: messagingToken }];
                    }
                });
            });
        };
        return ContextProvider;
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
    var DEFAULT_REGION = 'us-central1';
    /**
     * Returns a Promise that will be rejected after the given duration.
     * The error will be of type FunctionsError.
     *
     * @param millis Number of milliseconds to wait before rejecting.
     */
    function failAfter(millis) {
        return new Promise(function (_, reject) {
            setTimeout(function () {
                reject(new FunctionsError('deadline-exceeded', 'deadline-exceeded'));
            }, millis);
        });
    }
    /**
     * The main class for the Firebase Functions SDK.
     * @internal
     */
    var FunctionsService = /** @class */ (function () {
        /**
         * Creates a new Functions service for the given app.
         * @param app - The FirebaseApp to use.
         */
        function FunctionsService(app, authProvider, messagingProvider, regionOrCustomDomain, fetchImpl) {
            var _this = this;
            if (regionOrCustomDomain === void 0) { regionOrCustomDomain = DEFAULT_REGION; }
            this.app = app;
            this.fetchImpl = fetchImpl;
            this.emulatorOrigin = null;
            this.contextProvider = new ContextProvider(authProvider, messagingProvider);
            // Cancels all ongoing requests when resolved.
            this.cancelAllRequests = new Promise(function (resolve) {
                _this.deleteService = function () {
                    return Promise.resolve(resolve());
                };
            });
            // Resolve the region or custom domain overload by attempting to parse it.
            try {
                var url = new URL(regionOrCustomDomain);
                this.customDomain = url.origin;
                this.region = DEFAULT_REGION;
            }
            catch (e) {
                this.customDomain = null;
                this.region = regionOrCustomDomain;
            }
        }
        FunctionsService.prototype._delete = function () {
            return this.deleteService();
        };
        /**
         * Returns the URL for a callable with the given name.
         * @param name - The name of the callable.
         * @internal
         */
        FunctionsService.prototype._url = function (name) {
            var projectId = this.app.options.projectId;
            if (this.emulatorOrigin !== null) {
                var origin_1 = this.emulatorOrigin;
                return origin_1 + "/" + projectId + "/" + this.region + "/" + name;
            }
            if (this.customDomain !== null) {
                return this.customDomain + "/" + name;
            }
            return "https://" + this.region + "-" + projectId + ".cloudfunctions.net/" + name;
        };
        return FunctionsService;
    }());
    /**
     * Modify this instance to communicate with the Cloud Functions emulator.
     *
     * Note: this must be called before this instance has been used to do any operations.
     *
     * @param host The emulator host (ex: localhost)
     * @param port The emulator port (ex: 5001)
     * @public
     */
    function useFunctionsEmulator(functionsInstance, host, port) {
        functionsInstance.emulatorOrigin = "http://" + host + ":" + port;
    }
    /**
     * Returns a reference to the callable https trigger with the given name.
     * @param name - The name of the trigger.
     * @public
     */
    function httpsCallable(functionsInstance, name, options) {
        return function (data) {
            return call(functionsInstance, name, data, options || {});
        };
    }
    /**
     * Does an HTTP POST and returns the completed response.
     * @param url The url to post to.
     * @param body The JSON body of the post.
     * @param headers The HTTP headers to include in the request.
     * @return A Promise that will succeed when the request finishes.
     */
    function postJSON(url, body, headers, fetchImpl) {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1, json, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers['Content-Type'] = 'application/json';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetchImpl(url, {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: headers
                            })];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        // This could be an unhandled error on the backend, or it could be a
                        // network error. There's no way to know, since an unhandled error on the
                        // backend will fail to set the proper CORS header, and thus will be
                        // treated as a network error by fetch.
                        return [2 /*return*/, {
                                status: 0,
                                json: null
                            }];
                    case 4:
                        json = null;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, response.json()];
                    case 6:
                        json = _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, {
                            status: response.status,
                            json: json
                        }];
                }
            });
        });
    }
    /**
     * Calls a callable function asynchronously and returns the result.
     * @param name The name of the callable trigger.
     * @param data The data to pass as params to the function.s
     */
    function call(functionsInstance, name, data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, headers, context, timeout, response, error, responseData, decodedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = functionsInstance._url(name);
                        // Encode any special types, such as dates, in the input data.
                        data = encode(data);
                        body = { data: data };
                        headers = {};
                        return [4 /*yield*/, functionsInstance.contextProvider.getContext()];
                    case 1:
                        context = _a.sent();
                        if (context.authToken) {
                            headers['Authorization'] = 'Bearer ' + context.authToken;
                        }
                        if (context.messagingToken) {
                            headers['Firebase-Instance-ID-Token'] = context.messagingToken;
                        }
                        timeout = options.timeout || 70000;
                        return [4 /*yield*/, Promise.race([
                                postJSON(url, body, headers, functionsInstance.fetchImpl),
                                failAfter(timeout),
                                functionsInstance.cancelAllRequests
                            ])];
                    case 2:
                        response = _a.sent();
                        // If service was deleted, interrupted response throws an error.
                        if (!response) {
                            throw new FunctionsError('cancelled', 'Firebase Functions instance was deleted.');
                        }
                        error = _errorForResponse(response.status, response.json);
                        if (error) {
                            throw error;
                        }
                        if (!response.json) {
                            throw new FunctionsError('internal', 'Response is not valid JSON object.');
                        }
                        responseData = response.json.data;
                        // TODO(klimt): For right now, allow "result" instead of "data", for
                        // backwards compatibility.
                        if (typeof responseData === 'undefined') {
                            responseData = response.json.result;
                        }
                        if (typeof responseData === 'undefined') {
                            // Consider the response malformed.
                            throw new FunctionsError('internal', 'Response is missing data field.');
                        }
                        decodedData = decode(responseData);
                        return [2 /*return*/, { data: decodedData }];
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
    function registerFunctions(fetchImpl) {
        var factory = function (container, regionOrCustomDomain) {
            // Dependencies
            var app = container.getProvider('app-exp').getImmediate();
            var authProvider = container.getProvider('auth-internal');
            var messagingProvider = container.getProvider('messaging');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return new FunctionsService(app, authProvider, messagingProvider, regionOrCustomDomain, fetchImpl);
        };
        app._registerComponent(new Component(FUNCTIONS_TYPE, factory, "PUBLIC" /* PUBLIC */).setMultipleInstances(true));
    }

    var name = "@firebase/functions-exp";
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
     * Returns a Functions instance for the given app.
     * @param app - The FirebaseApp to use.
     * @param regionOrCustomDomain - one of:
     *   a) The region the callable functions are located in (ex: us-central1)
     *   b) A custom domain hosting the callable functions (ex: https://mydomain.com)
     * @public
     */
    function getFunctions(app$1, regionOrCustomDomain) {
        if (regionOrCustomDomain === void 0) { regionOrCustomDomain = DEFAULT_REGION; }
        // Dependencies
        var functionsProvider = app._getProvider(app$1, FUNCTIONS_TYPE);
        var functionsInstance = functionsProvider.getImmediate({
            identifier: regionOrCustomDomain
        });
        return functionsInstance;
    }
    /**
     * Modify this instance to communicate with the Cloud Functions emulator.
     *
     * Note: this must be called before this instance has been used to do any operations.
     *
     * @param host The emulator host (ex: localhost)
     * @param port The emulator port (ex: 5001)
     * @public
     */
    function useFunctionsEmulator$1(functionsInstance, host, port) {
        useFunctionsEmulator(functionsInstance, host, port);
    }
    /**
     * Returns a reference to the callable https trigger with the given name.
     * @param name - The name of the trigger.
     * @public
     */
    function httpsCallable$1(functionsInstance, name, options) {
        return httpsCallable(functionsInstance, name, options);
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
    registerFunctions(fetch.bind(self));
    app.registerVersion(name, version);

    exports.getFunctions = getFunctions;
    exports.httpsCallable = httpsCallable$1;
    exports.useFunctionsEmulator = useFunctionsEmulator$1;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-functions.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-functions.js.map
