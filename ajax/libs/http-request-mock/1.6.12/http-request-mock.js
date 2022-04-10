(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HttpRequestMock"] = factory();
	else
		root["HttpRequestMock"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 176:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Bypass = /** @class */ (function () {
    function Bypass() {
        this.flag = 'yes';
    }
    return Bypass;
}());
exports["default"] = Bypass;


/***/ }),

/***/ 571:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNodejs = exports.currentDatetime = exports.currentTime = exports.currentDate = exports.isArrayBuffer = exports.str2arrayBuffer = exports.sleep = exports.tryToParseObject = exports.isObject = exports.queryObject2String = exports.getQuery = void 0;
/**
 * Get query parameters from the specified request url.
 * @param {string} reqUrl
 */
function getQuery(reqUrl) {
    return /\?/.test(reqUrl)
        ? reqUrl
            .replace(/.*?\?/g, '') // no protocol, domain and path
            .replace(/#.*$/g, '') // no hash tag
            .split('&')
            .reduce(function (res, item) {
            var _a = item.split('='), k = _a[0], v = _a[1];
            res[k] = (v || '').trim();
            return res;
        }, {})
        : {};
}
exports.getQuery = getQuery;
/**
 * Convert query object to search string.
 * @param {object} queryObj
 */
function queryObject2String(queryObj) {
    var str = [];
    for (var key in queryObj) {
        str.push(key + '=' + queryObj[key]);
    }
    return str.join('&');
}
exports.queryObject2String = queryObject2String;
/**
 * Check whether or not the specified obj is an object.
 * @param {unknown} obj
 */
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
exports.isObject = isObject;
/**
 * Try to convert an object like string to an object.
 * @param {unknown} body
 */
function tryToParseObject(body) {
    if (typeof body === 'string' && body[0] === '{' && body[body.length - 1] === '}') {
        try {
            return JSON.parse(body);
        }
        catch (e) {
            return body;
        }
    }
    else {
        return body;
    }
}
exports.tryToParseObject = tryToParseObject;
/**
 * Sleep the specified number of milliseconds.
 * @param {number} ms
 */
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
/**
 * Convert string to arraybuffer.
 * @param {string} str
 */
function str2arrayBuffer(str) {
    if (typeof TextEncoder === 'function') {
        return new TextEncoder().encode(str);
    }
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
exports.str2arrayBuffer = str2arrayBuffer;
/**
 * Whether or not the specified data is arraybuffer.
 * @param {unknown} data
 */
function isArrayBuffer(data) {
    if (typeof ArrayBuffer === 'function' && data instanceof ArrayBuffer) {
        return true;
    }
    if (typeof Int32Array === 'function' && (data instanceof Int32Array)) {
        return true;
    }
    if (typeof Int16Array === 'function' && (data instanceof Int16Array)) {
        return true;
    }
    if (typeof Int8Array === 'function' && (data instanceof Int8Array)) {
        return true;
    }
    return false;
}
exports.isArrayBuffer = isArrayBuffer;
/**
 * Get current date.
 */
function currentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var two = function (num) { return num < 10 ? "0".concat(num) : "".concat(num); };
    return "".concat(two(year), "-").concat(two(month), "-").concat(two(date));
}
exports.currentDate = currentDate;
/**
 * Get current time.
 */
function currentTime() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var two = function (num) { return num < 10 ? "0".concat(num) : "".concat(num); };
    return "".concat(two(hour), ":").concat(two(minute), ":").concat(two(second));
}
exports.currentTime = currentTime;
/**
 * Get current datetime.
 */
function currentDatetime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var two = function (num) { return num < 10 ? "0".concat(num) : "".concat(num); };
    return "".concat(two(year), "-").concat(two(month), "-").concat(two(date), " ").concat(two(hour), ":").concat(two(minute), ":").concat(two(second));
}
exports.currentDatetime = currentDatetime;
/**
 * Check current envrioment: nodejs or not.
 * Note: arrow function is required.
 */
function isNodejs() {
    return (typeof process !== 'undefined')
        && (Object.prototype.toString.call(process) === '[object process]')
        && (!!(process.versions && process.versions.node));
}
exports.isNodejs = isNodejs;


/***/ }),

/***/ 913:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HTTPStatusCodes = void 0;
exports.HTTPStatusCodes = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    103: 'Early Hints',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a Teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    509: 'Bandwidth Limit Exceeded',
    510: 'Not Extended',
    511: 'Network Authentication Required'
};


/***/ }),

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var utils_1 = __webpack_require__(571);
var fetch_1 = __importDefault(__webpack_require__(843));
var wx_request_1 = __importDefault(__webpack_require__(556));
var xml_http_request_1 = __importDefault(__webpack_require__(507));
var mocker_1 = __importDefault(__webpack_require__(755));
var Index = /** @class */ (function () {
    function Index() {
    }
    /**
     * Auto detect request environment and setup request mock for wx.request, fetch and XHR.
     * @param {string} proxyServer A proxy server which is used by proxy mode.
     */
    Index.setup = function (proxyServer) {
        if (proxyServer === void 0) { proxyServer = ''; }
        var mocker = new mocker_1.default(proxyServer);
        if (this.isEnabled && typeof wx !== 'undefined' && typeof wx.request === 'function') {
            wx_request_1.default.setup(mocker, proxyServer);
        }
        if (this.isEnabled && typeof window !== 'undefined' && typeof window.XMLHttpRequest === 'function') {
            xml_http_request_1.default.setup(mocker, proxyServer);
        }
        if (this.isEnabled && typeof window !== 'undefined' && typeof window.fetch === 'function') {
            fetch_1.default.setup(mocker, proxyServer);
        }
        // for http.get, https.get, http.request, https.request in node environment
        if (this.isEnabled && (0, utils_1.isNodejs)()) {
            // use require here to avoid static analysis
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            Object(function webpackMissingModule() { var e = new Error("Cannot find module './interceptor/node/http-and-https'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(mocker, proxyServer);
        }
        return mocker;
    };
    /**
     * Setup request mock for wx.request.
     * @param {string} proxyServer A proxy server which is used by proxy mode.
     */
    Index.setupForWx = function (proxyServer) {
        if (proxyServer === void 0) { proxyServer = ''; }
        var mocker = new mocker_1.default(proxyServer);
        this.isEnabled && wx_request_1.default.setup(mocker, proxyServer);
        return mocker;
    };
    /**
     * Setup request mock for XMLHttpRequest.
     * @param {string} proxyServer A proxy server which is used by proxy mode.
     */
    Index.setupForXhr = function (proxyServer) {
        if (proxyServer === void 0) { proxyServer = ''; }
        var mocker = new mocker_1.default(proxyServer);
        this.isEnabled && xml_http_request_1.default.setup(mocker, proxyServer);
        return mocker;
    };
    /**
     * Setup request mock for fetch.
     * @param {string} proxyServer A proxy server which is used by proxy mode.
     */
    Index.setupForFetch = function (proxyServer) {
        if (proxyServer === void 0) { proxyServer = ''; }
        var mocker = new mocker_1.default(proxyServer);
        this.isEnabled && fetch_1.default.setup(mocker, proxyServer);
        return mocker;
    };
    /**
     * Setup request mock for node http/https request.
     * For http.get, https.get, http.request, https.request in nodejs environment
     * @param {string} proxyServer A proxy server which is used by proxy mode.
     */
    Index.setupForNode = function (proxyServer) {
        if (proxyServer === void 0) { proxyServer = ''; }
        var mocker = new mocker_1.default(proxyServer);
        // use require here to avoid static analysis
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.isEnabled && Object(function webpackMissingModule() { var e = new Error("Cannot find module './interceptor/node/http-and-https'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(mocker, proxyServer);
        return mocker;
    };
    /**
     * Enable mock function temporarily.
     * Not available in proxy mode.
     */
    Index.enable = function () {
        this.isEnabled = true;
        return mocker_1.default.getInstance().enable();
    };
    /**
     * Disable mock function temporarily.
     * Not available in proxy mode.
     */
    Index.disable = function () {
        this.isEnabled = false;
        return mocker_1.default.getInstance().disable();
    };
    /**
     * Enable verbose log.
     * Not available in proxy mode.
     */
    Index.enableLog = function () {
        return mocker_1.default.getInstance().enableLog();
    };
    /**
     * Disable verbose log.
     * Not available in proxy mode.
     */
    Index.disableLog = function () {
        return mocker_1.default.getInstance().disableLog();
    };
    /**
     * Setup request mock for unit test.
     * @param {string} type
     */
    Index.setupForUnitTest = function (type) {
        if (!(0, utils_1.isNodejs)()) {
            throw new Error('"setupForUnitTest" is only for nodejs envrioment.');
        }
        if (!['wx', 'xhr', 'fetch', 'node', 'all'].includes(type)) {
            throw new Error('Invalid type, valid types are "wx", "xhr", "fetch", "node" and "all".');
        }
        var mocker = new mocker_1.default();
        if (type === 'wx' || type === 'all') {
            wx_request_1.default.initDummyWxRequestForUnitTest(mocker);
        }
        if (type === 'xhr' || type === 'all') {
            xml_http_request_1.default.initDummyXHRForUnitTest(mocker);
        }
        if (type === 'fetch' || type === 'all') {
            fetch_1.default.initDummyFetchForUnitTest(mocker);
        }
        if (type === 'node' || type === 'all') {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            Object(function webpackMissingModule() { var e = new Error("Cannot find module './interceptor/node/http-and-https'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(mocker);
        }
        return mocker;
    };
    Index.isEnabled = true;
    Index.default = Index; // for backward compatibility
    return Index;
}());
exports["default"] = Index;
module.exports = Index; // without 'default' property


/***/ }),

/***/ 985:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var utils_1 = __webpack_require__(571);
var BaseInterceptor = /** @class */ (function () {
    function BaseInterceptor(mocker, proxyServer) {
        var _a;
        if (proxyServer === void 0) { proxyServer = ''; }
        this.proxyServer = '';
        this.proxyMode = '';
        this.mocker = mocker;
        if (/^(matched|marked)@localhost:\d+$/.test(proxyServer)) {
            _a = proxyServer.split('@'), this.proxyMode = _a[0], this.proxyServer = _a[1];
        }
        this.global = BaseInterceptor.getGlobal();
    }
    /**
     * Setup request mocker.
     * @param {Mocker} mocker
     */
    BaseInterceptor.setup = function (mocker, proxyServer) {
        if (proxyServer === void 0) { proxyServer = ''; }
        return new this(mocker, proxyServer);
    };
    /**
     * return global variable
     */
    BaseInterceptor.getGlobal = function () {
        if (typeof window !== 'undefined') {
            return window;
        }
        else if (typeof __webpack_require__.g !== 'undefined') {
            return __webpack_require__.g;
        }
        throw new Error('Detect global variable error');
    };
    /**
     * Check whether the specified request url matchs a defined mock item.
     * If a match is found, return mock meta information, otherwise a null is returned.
     * @param {string} reqUrl
     * @param {string} reqMethod
     */
    BaseInterceptor.prototype.matchMockRequest = function (reqUrl, reqMethod) {
        // ignore matching when it is a server mode
        if (this.proxyServer && reqUrl.indexOf("http://".concat(this.proxyServer)) === 0) {
            return null;
        }
        var mockItem = this.mocker.matchMockItem(reqUrl, reqMethod);
        if (mockItem && mockItem.times !== undefined) {
            mockItem.times -= 1;
        }
        return mockItem;
    };
    BaseInterceptor.prototype.getRequestInfo = function (mixedRequestInfo) {
        var info = {
            url: mixedRequestInfo.url,
            method: mixedRequestInfo.method || 'GET',
            query: (0, utils_1.getQuery)(mixedRequestInfo.url),
        };
        if (mixedRequestInfo.headers || mixedRequestInfo.header) {
            info.headers = mixedRequestInfo.headers || mixedRequestInfo.header;
        }
        if (mixedRequestInfo.body !== undefined) {
            info.body = (0, utils_1.tryToParseObject)(mixedRequestInfo.body);
        }
        return info;
    };
    /**
     * Get full request url.
     * @param {string} url
     */
    BaseInterceptor.prototype.getFullRequestUrl = function (url, method) {
        if (/^https?:\/\//i.test(url)) {
            return this.checkProxyUrl(url, method);
        }
        if (typeof URL === 'function' && typeof window === 'object' && window) {
            return this.checkProxyUrl(new URL(url, window.location.href).href, method);
        }
        if (typeof document === 'object' && document && typeof document.createElement === 'function') {
            var elemA = document.createElement('a');
            elemA.href = url;
            return this.checkProxyUrl(elemA.href, method);
        }
        return this.checkProxyUrl(url, method);
    };
    /**
     * Return a proxy url if in a proxy mode otherwise return the original url.
     * @param {string} url
     */
    BaseInterceptor.prototype.checkProxyUrl = function (url, method) {
        if (!['matched', 'marked'].includes(this.proxyMode) || !this.proxyServer) {
            return url;
        }
        var mockItem = this.mocker.matchMockItem(url, method);
        if (!mockItem) {
            return url;
        }
        var remoteInfo = mockItem === null || mockItem === void 0 ? void 0 : mockItem.getRemoteInfo(url);
        var target = remoteInfo ? remoteInfo.url : url;
        var proxyUrl = "http://".concat(this.proxyServer) + target.replace(/^(https?):\/\//, '/$1/');
        if (this.proxyMode === 'marked') {
            return mockItem.proxy ? proxyUrl : url;
        }
        return proxyUrl;
    };
    return BaseInterceptor;
}());
exports["default"] = BaseInterceptor;


/***/ }),

/***/ 843:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable @typescript-eslint/ban-types */
var bypass_1 = __importDefault(__webpack_require__(176));
var utils_1 = __webpack_require__(571);
var config_1 = __webpack_require__(913);
var base_1 = __importDefault(__webpack_require__(985));
var FetchInterceptor = /** @class */ (function (_super) {
    __extends(FetchInterceptor, _super);
    function FetchInterceptor(mocker, proxyServer) {
        if (proxyServer === void 0) { proxyServer = ''; }
        var _this = _super.call(this, mocker, proxyServer) || this;
        if (FetchInterceptor.instance) {
            return FetchInterceptor.instance;
        }
        FetchInterceptor.instance = _this;
        _this.fetch = _this.global.fetch.bind(_this.global);
        _this.intercept();
        return _this;
    }
    /**
     * Initialize a dummy 'fetch' object if 'fetch' is not existent in the context.
     * @param {Mocker} mocker
     */
    FetchInterceptor.initDummyFetchForUnitTest = function (mocker) {
        var global = base_1.default.getGlobal();
        if (!global.fetch) {
            // use require here to avoid static analysis
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            global.fetch = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../dummy/fetch'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
        }
        return new FetchInterceptor(mocker);
    };
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
     * Intercept fetch object.
     */
    FetchInterceptor.prototype.intercept = function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var me = this;
        this.global.fetch = function (input, init) {
            var url;
            var params;
            // https://developer.mozilla.org/en-US/docs/Web/API/Request
            // Note: the first argument of fetch maybe a Request object.
            if (typeof input === 'object') {
                url = input.url;
                params = input;
            }
            else {
                url = input;
                params = init || {};
            }
            var method = (params && params.method ? params.method : 'GET');
            var requestUrl = me.getFullRequestUrl(url, method);
            return new Promise(function (resolve, reject) {
                var mockItem = me.matchMockRequest(requestUrl, method);
                var remoteInfo = mockItem === null || mockItem === void 0 ? void 0 : mockItem.getRemoteInfo(requestUrl);
                if (remoteInfo) {
                    params.method = remoteInfo.method || method;
                    me.fetch(remoteInfo.url, params).then(resolve).catch(reject);
                }
                else if (mockItem) {
                    var requestInfo = me.getRequestInfo(__assign({ url: requestUrl, method: method }, params));
                    me.doMockRequest(mockItem, requestInfo, resolve).then(function (isBypassed) {
                        if (isBypassed) {
                            me.fetch(requestUrl, params).then(resolve).catch(reject);
                        }
                    });
                }
                else {
                    me.fetch(requestUrl, params).then(resolve).catch(reject);
                }
            });
        };
        return this;
    };
    /**
     * Make mock request.
     * @param {MockItem} mockItem
     * @param {RequestInfo} requestInfo
     * @param {Function} resolve
     */
    FetchInterceptor.prototype.doMockRequest = function (mockItem, requestInfo, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var isBypassed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isBypassed = false;
                        if (!(mockItem.delay && mockItem.delay > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1.sleep)(+mockItem.delay)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.doMockResponse(mockItem, requestInfo, resolve)];
                    case 2:
                        isBypassed = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.doMockResponse(mockItem, requestInfo, resolve)];
                    case 4:
                        isBypassed = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, isBypassed];
                }
            });
        });
    };
    /**
     * Make mock request.
     * @param {MockItem} mockItem
     * @param {RequestInfo} requestInfo
     * @param {Function} resolve
     */
    FetchInterceptor.prototype.doMockResponse = function (mockItem, requestInfo, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var body, now, spent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mockItem.sendBody(requestInfo)];
                    case 1:
                        body = _a.sent();
                        now = Date.now();
                        if (body instanceof bypass_1.default) {
                            return [2 /*return*/, true];
                        }
                        spent = (Date.now() - now) + (mockItem.delay || 0);
                        this.mocker.sendResponseLog(spent, body, requestInfo, mockItem);
                        resolve(this.getFetchResponse(body, mockItem, requestInfo));
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Response
     * Format mock data.
     * @param {unknown} responseBody
     * @param {MockItem} mockItem
     * @param {RequestInfo} requestInfo
     */
    FetchInterceptor.prototype.getFetchResponse = function (responseBody, mockItem, requestInfo) {
        var data = responseBody;
        var status = mockItem.status;
        var statusText = config_1.HTTPStatusCodes[status] || '';
        var headers = typeof Headers === 'function'
            ? new Headers(__assign(__assign({}, mockItem.header), { 'x-powered-by': 'http-request-mock' }))
            : __assign(__assign({}, mockItem.header), { 'x-powered-by': 'http-request-mock' });
        var body = typeof Blob === 'function'
            ? new Blob([typeof data === 'string' ? data : JSON.stringify(data)])
            : data;
        if (typeof Response === 'function') {
            var response_1 = new Response(body, { status: status, statusText: statusText, headers: headers });
            Object.defineProperty(response_1, 'url', { value: requestInfo.url });
            return response_1;
        }
        var response = {
            body: body,
            bodyUsed: false,
            headers: headers,
            ok: true,
            redirected: false,
            status: status,
            statusText: statusText,
            url: requestInfo.url,
            type: 'basic',
            // response data depends on prepared data
            json: function () { return Promise.resolve(data); },
            arrayBuffer: function () { return Promise.resolve(data); },
            blob: function () { return Promise.resolve(body); },
            formData: function () { return Promise.resolve(data); },
            text: function () { return Promise.resolve(typeof data === 'string' ? data : JSON.stringify(data)); },
            // other methods that may be used
            clone: function () { return response; },
            error: function () { return response; },
            redirect: function () { return response; },
        };
        return response;
    };
    return FetchInterceptor;
}(base_1.default));
exports["default"] = FetchInterceptor;


/***/ }),

/***/ 556:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable @typescript-eslint/no-empty-function */
var bypass_1 = __importDefault(__webpack_require__(176));
var utils_1 = __webpack_require__(571);
var base_1 = __importDefault(__webpack_require__(985));
var WxRequestInterceptor = /** @class */ (function (_super) {
    __extends(WxRequestInterceptor, _super);
    function WxRequestInterceptor(mocker, proxyServer) {
        if (proxyServer === void 0) { proxyServer = ''; }
        var _this = _super.call(this, mocker, proxyServer) || this;
        if (WxRequestInterceptor.instance) {
            return WxRequestInterceptor.instance;
        }
        WxRequestInterceptor.instance = _this;
        // Note: this.global has no wx object
        _this.wxRequest = wx.request.bind(wx);
        _this.intercept();
        return _this;
    }
    /**
     * Initialize a dummy 'wx.request' object if 'wx.request' is not existent in the context.
     * @param {Mocker} mocker
     */
    WxRequestInterceptor.initDummyWxRequestForUnitTest = function (mocker) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var global = base_1.default.getGlobal();
        global.wx = global.wx || {};
        if (!global.wx.request) {
            // use require here to avoid static analysis
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            global.wx.request = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../dummy/wx-request'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(global.wx);
        }
        return new WxRequestInterceptor(mocker);
    };
    /**
     * https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
     * Intercept wx.request object.
     */
    WxRequestInterceptor.prototype.intercept = function () {
        var _this = this;
        Object.defineProperty(wx, 'request', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function (wxRequestOpts) {
                if (!wxRequestOpts || !wxRequestOpts.url) {
                    return;
                }
                wxRequestOpts.url = _this.getFullRequestUrl(wxRequestOpts.url, wxRequestOpts.method);
                var mockItem = _this.matchMockRequest(wxRequestOpts.url, wxRequestOpts.method);
                var remoteInfo = mockItem === null || mockItem === void 0 ? void 0 : mockItem.getRemoteInfo(wxRequestOpts.url);
                if (remoteInfo) {
                    wxRequestOpts.url = remoteInfo.url;
                    wxRequestOpts.method = remoteInfo.method || wxRequestOpts.method;
                    return _this.wxRequest(wxRequestOpts); // fallback to original wx.request
                }
                var requestInfo = _this.getRequestInfo(wxRequestOpts);
                if (/^get$/i.test(wxRequestOpts.method) && (0, utils_1.isObject)(wxRequestOpts.data)) {
                    requestInfo.query = __assign(__assign({}, requestInfo.query), wxRequestOpts.data);
                }
                else {
                    requestInfo.body = wxRequestOpts.data;
                }
                if (mockItem) {
                    _this.doMockRequest(mockItem, requestInfo, wxRequestOpts).then(function (isBypassed) {
                        if (isBypassed) {
                            _this.wxRequest(wxRequestOpts); // fallback to original wx.request
                        }
                    });
                    return _this.getRequstTask();
                }
                else {
                    wxRequestOpts.url = wxRequestOpts.url;
                    return _this.wxRequest(wxRequestOpts); // fallback to original wx.request
                }
            }
        });
        return this;
    };
    WxRequestInterceptor.prototype.getRequstTask = function () {
        return {
            abort: function () { },
            onHeadersReceived: function () { },
            offHeadersReceived: function () { }
        };
    };
    /**
     * Make mock request.
     * @param {MockItem} mockItem
     * @param {RequestInfo} requestInfo
     * @param {WxRequestOpts} wxRequestOpts
     */
    WxRequestInterceptor.prototype.doMockRequest = function (mockItem, requestInfo, wxRequestOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var isBypassed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isBypassed = false;
                        if (!(mockItem.delay && mockItem.delay > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1.sleep)(+mockItem.delay)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.doMockResponse(mockItem, requestInfo, wxRequestOpts)];
                    case 2:
                        isBypassed = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.doMockResponse(mockItem, requestInfo, wxRequestOpts)];
                    case 4:
                        isBypassed = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, isBypassed];
                }
            });
        });
    };
    /**
     * Make mock response.
     * @param {MockItem} mockItem
     * @param {RequestInfo} requestInfo
     * @param {WxRequestOpts} wxRequestOpts
     */
    WxRequestInterceptor.prototype.doMockResponse = function (mockItem, requestInfo, wxRequestOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var now, body, spent, wxResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Date.now();
                        return [4 /*yield*/, mockItem.sendBody(requestInfo)];
                    case 1:
                        body = _a.sent();
                        if (body instanceof bypass_1.default) {
                            return [2 /*return*/, true];
                        }
                        spent = (Date.now() - now) + (mockItem.delay || 0);
                        wxResponse = this.getWxResponse(body, mockItem);
                        this.mocker.sendResponseLog(spent, body, requestInfo, mockItem);
                        this.sendResult(wxRequestOpts, wxResponse);
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Get WX mock response data.
     * @param {unknown} responseBody
     * @param {MockItem} mockItem
     */
    WxRequestInterceptor.prototype.getWxResponse = function (responseBody, mockItem) {
        var _a;
        // https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
        var setCookieHeader = [].concat((((_a = mockItem.header) === null || _a === void 0 ? void 0 : _a['set-cookie']) || []));
        return {
            data: responseBody,
            statusCode: mockItem.status || 200,
            header: __assign(__assign({}, mockItem.header), { 'x-powered-by': 'http-request-mock' }),
            cookies: setCookieHeader,
            profile: {},
        };
    };
    /**
     * Call some necessary callbacks if specified.
     * @param {WxRequestOpts} wxRequestOpts
     * @param {WxRequestOpts} response
     */
    WxRequestInterceptor.prototype.sendResult = function (wxRequestOpts, wxResponse) {
        if (typeof wxRequestOpts.success === 'function') {
            wxRequestOpts.success(wxResponse);
        }
        if (typeof wxRequestOpts.complete === 'function') {
            wxRequestOpts.complete(wxResponse);
        }
    };
    return WxRequestInterceptor;
}(base_1.default));
exports["default"] = WxRequestInterceptor;


/***/ }),

/***/ 507:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var bypass_1 = __importDefault(__webpack_require__(176));
var utils_1 = __webpack_require__(571);
var config_1 = __webpack_require__(913);
var base_1 = __importDefault(__webpack_require__(985));
var XMLHttpRequestInterceptor = /** @class */ (function (_super) {
    __extends(XMLHttpRequestInterceptor, _super);
    function XMLHttpRequestInterceptor(mocker, proxyServer) {
        if (proxyServer === void 0) { proxyServer = ''; }
        var _this = _super.call(this, mocker, proxyServer) || this;
        if (XMLHttpRequestInterceptor.instance) {
            return XMLHttpRequestInterceptor.instance;
        }
        XMLHttpRequestInterceptor.instance = _this;
        _this.xhr = _this.global.XMLHttpRequest.prototype;
        _this.intercept();
        return _this;
    }
    /**
     * Initialize a dummy 'XMLHttpRequest' object if 'XMLHttpRequest' is not existent in the context.
     * @param {Mocker} mocker
     */
    XMLHttpRequestInterceptor.initDummyXHRForUnitTest = function (mocker) {
        // use require here to avoid static analysis
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        __webpack_require__.g.XMLHttpRequest = __webpack_require__.g.XMLHttpRequest || Object(function webpackMissingModule() { var e = new Error("Cannot find module '../dummy/xhr'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
        return new XMLHttpRequestInterceptor(mocker);
    };
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
     * Logic of intercepting XMLHttpRequest object.
     */
    XMLHttpRequestInterceptor.prototype.intercept = function () {
        // intercept methods
        this.interceptOpen();
        this.interceptSend();
        this.interceptSetRequestHeader();
        this.interceptGetAllResponseHeaders();
        this.interceptGetResponseHeader();
        // intercept getters
        this.interceptReadyState();
        this.interceptStatus();
        this.interceptStatusText();
        this.interceptResponseText();
        this.interceptResponse();
        this.interceptResponseURL();
        this.interceptResponseXML();
        return this;
    };
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
     * Logic of intercepting XMLHttpRequest.open method.
     */
    XMLHttpRequestInterceptor.prototype.interceptOpen = function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var me = this;
        var original = this.xhr.open;
        Object.defineProperty(this.xhr, 'open', {
            get: function () {
                var _this = this;
                return function (method, url, async, user, password) {
                    if (async === void 0) { async = true; }
                    if (user === void 0) { user = null; }
                    if (password === void 0) { password = null; }
                    var requestUrl = me.getFullRequestUrl(url, method);
                    var mockItem = me.matchMockRequest(requestUrl, method);
                    // remoteInfo has a higher priority than BypassMock
                    var remoteInfo = mockItem === null || mockItem === void 0 ? void 0 : mockItem.getRemoteInfo(requestUrl);
                    if (remoteInfo) {
                        return original.call(_this, remoteInfo.method || method, remoteInfo.url, async, user, password);
                    }
                    if (!_this.bypassMock) {
                        if (mockItem) {
                            // 'this' points XMLHttpRequest instance.
                            _this.isMockRequest = true;
                            _this.mockItem = mockItem;
                            _this.mockResponse = new NotResolved();
                            _this.requestInfo = me.getRequestInfo({ url: requestUrl, method: method, });
                            _this.requestArgs = [method, requestUrl, async, user, password];
                            return;
                        }
                    }
                    return original.call(_this, method, requestUrl, async, user, password);
                };
            }
        });
        return this;
    };
    /**
     * Logic of intercepting XMLHttpRequest.send method.
     */
    XMLHttpRequestInterceptor.prototype.interceptSend = function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var me = this;
        var original = this.xhr.send;
        Object.defineProperty(this.xhr, 'send', {
            get: function () {
                var _this = this;
                return function (body) {
                    if (_this.isMockRequest) {
                        if (body !== null && body !== undefined) {
                            _this.requestInfo.body = (0, utils_1.tryToParseObject)(body);
                        }
                        return me.doMockRequest(_this).then(function (isBypassed) {
                            if (isBypassed) {
                                _this.isMockRequest = false;
                                _this.bypassMock = true;
                                _this.open.apply(_this, _this.requestArgs);
                                return original.call(_this, body);
                            }
                        });
                    }
                    return original.call(_this, body);
                };
            }
        });
        return this;
    };
    /**
     * Make mock request.
     * @param {XMLHttpRequestInstance} xhr
     * @param {MockItemInfo} mockItem
     * @param {RequestInfo} requestInfo
     */
    XMLHttpRequestInterceptor.prototype.doMockRequest = function (xhr) {
        return __awaiter(this, void 0, void 0, function () {
            var isBypassed, mockItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isBypassed = false;
                        mockItem = xhr.mockItem;
                        if (!(mockItem.delay && mockItem.delay > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, utils_1.sleep)(+mockItem.delay)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.doMockResponse(xhr)];
                    case 2:
                        isBypassed = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.doMockResponse(xhr)];
                    case 4:
                        isBypassed = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, isBypassed];
                }
            });
        });
    };
    /**
     * Make mock response.
     * @param {XMLHttpRequestInstance} xhr
     * @param {MockItemInfo} mockItem
     * @param {RequestInfo} requestInfo
     */
    XMLHttpRequestInterceptor.prototype.doMockResponse = function (xhr) {
        return __awaiter(this, void 0, void 0, function () {
            var mockItem, requestInfo, now, body, spent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockItem = xhr.mockItem, requestInfo = xhr.requestInfo;
                        now = Date.now();
                        return [4 /*yield*/, mockItem.sendBody(requestInfo)];
                    case 1:
                        body = _a.sent();
                        if (body instanceof bypass_1.default) {
                            return [2 /*return*/, true];
                        }
                        spent = (Date.now() - now) + (mockItem.delay || 0);
                        xhr.mockResponse = body;
                        this.mocker.sendResponseLog(spent, body, xhr.requestInfo, mockItem);
                        this.sendResult(xhr);
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#event_handlers
     * Call some necessary callbacks if specified. Trigger some necessary events.
     * 'onreadystatechange' as a property of the XMLHttpRequest instance is supported in all browsers.
     * Since then, a number of additional on* event handler properties have been implemented in various
     * browsers (onload, onerror, onprogress, etc.). See Using XMLHttpRequest. More recent browsers,
     * including Firefox, also support listening to the XMLHttpRequest events via standard addEventListener() APIs
     * in addition to setting on* properties to a handler function.
     * @param {XMLHttpRequest} xhr
     */
    XMLHttpRequestInterceptor.prototype.sendResult = function (xhr) {
        var isEventReady = typeof Event !== 'undefined' && typeof xhr.dispatchEvent === 'function';
        if (typeof xhr.onreadystatechange === 'function') {
            xhr.onreadystatechange(this.event('readystatechange'));
        }
        else if (isEventReady) {
            xhr.dispatchEvent(new Event('readystatechange'));
        }
        if (typeof xhr.onload === 'function') {
            xhr.onload(this.event('load'));
        }
        else if (isEventReady) {
            xhr.dispatchEvent(new Event('load'));
        }
        if (typeof xhr.onloadend === 'function') {
            xhr.onloadend(this.event('loadend'));
        }
        else if (isEventReady) {
            xhr.dispatchEvent(new Event('loadend'));
        }
    };
    XMLHttpRequestInterceptor.prototype.event = function (type) {
        return {
            type: type,
            target: null,
            currentTarget: null,
            eventPhase: 0,
            bubbles: false,
            cancelable: false,
            defaultPrevented: false,
            composed: false,
            timeStamp: 294973.8000000119,
            srcElement: null,
            returnValue: true,
            cancelBubble: false,
            path: [],
            NONE: 0,
            CAPTURING_PHASE: 0,
            AT_TARGET: 0,
            BUBBLING_PHASE: 0,
            composedPath: function () { return []; },
            initEvent: function () { return void (0); },
            preventDefault: function () { return void (0); },
            stopImmediatePropagation: function () { return void (0); },
            stopPropagation: function () { return void (0); },
            isTrusted: false,
            lengthComputable: false,
            loaded: 1,
            total: 1
        };
    };
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
     * Logic of intercepting XMLHttpRequest.getAllResponseHeaders method.
     */
    XMLHttpRequestInterceptor.prototype.interceptGetAllResponseHeaders = function () {
        var original = this.xhr.getAllResponseHeaders;
        Object.defineProperty(this.xhr, 'getAllResponseHeaders', {
            get: function () {
                var _this = this;
                return function () {
                    if (_this.isMockRequest) {
                        return Object.entries(__assign(__assign({}, _this.mockItem.header), { 'x-powered-by': 'http-request-mock' }))
                            .map(function (_a) {
                            var key = _a[0], val = _a[1];
                            return key.toLowerCase() + ': ' + val;
                        })
                            .join('\r\n');
                    }
                    return original.call(_this);
                };
            }
        });
        return this;
    };
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/getResponseHeader
     * Logic of intercepting XMLHttpRequest.getResponseHeader method.
     */
    XMLHttpRequestInterceptor.prototype.interceptGetResponseHeader = function () {
        var original = this.xhr.getResponseHeader;
        Object.defineProperty(this.xhr, 'getResponseHeader', {
            get: function () {
                var _this = this;
                return function (field) {
                    if (_this.isMockRequest) {
                        if (/^x-powered-by$/i.test(field)) {
                            return 'http-request-mock';
                        }
                        var item = Object.entries(_this.mockItem.header).find(function (_a) {
                            var key = _a[0];
                            return key.toLowerCase() === field;
                        });
                        return item ? item[1] : null;
                    }
                    return original.call(_this, field);
                };
            }
        });
        return this;
    };
    /**
     * Logic of intercepting XMLHttpRequest.interceptSetRequestHeader method.
     */
    XMLHttpRequestInterceptor.prototype.interceptSetRequestHeader = function () {
        var original = this.xhr.setRequestHeader;
        Object.defineProperty(this.xhr, 'setRequestHeader', {
            get: function () {
                var _this = this;
                return function (header, value) {
                    if (_this.isMockRequest) {
                        _this.requestInfo.headers = _this.requestInfo.headers || {};
                        _this.requestInfo.headers[header] = value;
                        return;
                    }
                    return original.call(_this, header, value);
                };
            }
        });
        return this;
    };
    /**
     * Get getter function by key.
     * @param {string} key
     */
    XMLHttpRequestInterceptor.prototype.getGetter = function (key) {
        var descriptor = Object.getOwnPropertyDescriptor(this.xhr, key);
        if (descriptor) {
            return descriptor.get;
        }
        // when XMLHttpRequest is not a standard implement.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.xhr[key];
    };
    /**
     * Logic of intercepting XMLHttpRequest.readyState getter.
     * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
     */
    XMLHttpRequestInterceptor.prototype.interceptReadyState = function () {
        var original = this.getGetter('readyState');
        Object.defineProperty(this.xhr, 'readyState', {
            get: function () {
                if (this.isMockRequest) {
                    if (this.mockResponse instanceof NotResolved)
                        return 1; // OPENED
                    return 4;
                }
                return typeof original === 'function' ? original.call(this) : original;
            }
        });
        return this;
    };
    /**
     * Logic of intercepting XMLHttpRequest.status getter.
     * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
     */
    XMLHttpRequestInterceptor.prototype.interceptStatus = function () {
        var original = this.getGetter('status');
        Object.defineProperty(this.xhr, 'status', {
            get: function () {
                if (this.isMockRequest) {
                    if (this.mockResponse instanceof NotResolved)
                        return 0;
                    return this.mockItem.status;
                }
                return typeof original === 'function' ? original.call(this) : original;
            }
        });
        return this;
    };
    /**
     * Logic of intercepting XMLHttpRequest.statusText getter.
     * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/statusText
     */
    XMLHttpRequestInterceptor.prototype.interceptStatusText = function () {
        var original = this.getGetter('statusText');
        Object.defineProperty(this.xhr, 'statusText', {
            get: function () {
                if (this.isMockRequest) {
                    if (this.mockResponse instanceof NotResolved)
                        return '';
                    return config_1.HTTPStatusCodes[this.mockItem.status] || '';
                }
                return typeof original === 'function' ? original.call(this) : original;
            }
        });
        return this;
    };
    /**
     * Logic of intercepting XMLHttpRequest.responseText getter.
     */
    XMLHttpRequestInterceptor.prototype.interceptResponseText = function () {
        var original = this.getGetter('responseText');
        Object.defineProperty(this.xhr, 'responseText', {
            get: function () {
                if (this.isMockRequest) {
                    if (this.mockResponse instanceof NotResolved)
                        return '';
                    var data = this.mockResponse;
                    return typeof data === 'string' ? data : JSON.stringify(data);
                }
                return typeof original === 'function' ? original.call(this) : original;
            }
        });
        return this;
    };
    /**
     * Logic of intercepting XMLHttpRequest.response getter.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
     * When setting responseType to a particular value, the author should make
     * sure that the server is actually sending a response compatible with that
     * format. If the server returns data that is not compatible with the
     * responseType that was set, the value of response will be null.
     */
    XMLHttpRequestInterceptor.prototype.interceptResponse = function () {
        var original = this.getGetter('response');
        Object.defineProperty(this.xhr, 'response', {
            get: function () {
                // console.log('interceptResponse', this.getAllResponseHeaders());
                if (this.isMockRequest) {
                    if (this.mockResponse instanceof NotResolved)
                        return null;
                    var type = this.responseType;
                    // An empty responseType string is the same as "text", the default type.
                    if (type === 'text' || type === '') {
                        return this.responseText;
                    }
                    // The response is a JavaScript ArrayBuffer containing binary data.
                    if (type === 'arraybuffer' && typeof ArrayBuffer === 'function') {
                        return (this.mockResponse instanceof ArrayBuffer) ? this.mockResponse : null;
                    }
                    // The response is a Blob object containing the binary data.
                    if (type === 'blob' && typeof Blob === 'function') {
                        return (this.mockResponse instanceof Blob) ? this.mockResponse : null;
                    }
                    // The response is an HTML Document or XML XMLDocument, as appropriate based on the MIME type of
                    // the received data. See HTML in XMLHttpRequest to learn more about using XHR to fetch HTML content.
                    if (type === 'document' && (typeof Document === 'function' || typeof XMLDocument === 'function')) {
                        return ((this.mockResponse instanceof Document) || (this.mockResponse instanceof XMLDocument))
                            ? this.mockResponse
                            : null;
                    }
                    // The response is a JavaScript object created by parsing the contents of received data as JSON.
                    if (type === 'json') {
                        if (typeof this.mockResponse === 'object') {
                            return this.mockResponse;
                        }
                        if (typeof this.mockResponse === 'string') {
                            try {
                                return JSON.parse(this.mockResponse);
                            }
                            catch (err) { // eslint-disable-line
                                // console.warn('The mock response is not compatible with the responseType json: ' + err.message);
                                return null;
                            }
                        }
                        return null;
                    }
                    return this.mockResponse;
                }
                return typeof original === 'function' ? original.call(this) : original;
            }
        });
        return this;
    };
    /**
     * Logic of intercepting XMLHttpRequest.responseURL getter.
     */
    XMLHttpRequestInterceptor.prototype.interceptResponseURL = function () {
        var original = this.getGetter('responseURL');
        Object.defineProperty(this.xhr, 'responseURL', {
            get: function () {
                if (this.isMockRequest) {
                    return this.requestInfo.url;
                }
                return typeof original === 'function' ? original.call(this) : original;
            }
        });
        return this;
    };
    /**
     * Logic of intercepting XMLHttpRequest.responseXML getter.
     */
    XMLHttpRequestInterceptor.prototype.interceptResponseXML = function () {
        var original = this.getGetter('responseXML');
        Object.defineProperty(this.xhr, 'responseXML', {
            get: function () {
                if (this.isMockRequest) {
                    return this.responseType === 'document' ? this.response : null;
                }
                return typeof original === 'function' ? original.call(this) : original;
            }
        });
        return this;
    };
    return XMLHttpRequestInterceptor;
}(base_1.default));
exports["default"] = XMLHttpRequestInterceptor;
var NotResolved = /** @class */ (function () {
    function NotResolved() {
    }
    return NotResolved;
}());


/***/ }),

/***/ 832:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var bypass_1 = __importDefault(__webpack_require__(176));
var utils_1 = __webpack_require__(571);
var MockItem = /** @class */ (function () {
    /**
     * Format specified mock item.
     * @param {MockItemInfo} mockItem
     * @returns false | MockItemInfo
     */
    function MockItem(mockItem) {
        var _a;
        if (!mockItem.url || (typeof mockItem.url !== 'string' && !(mockItem.url instanceof RegExp))) {
            return;
        }
        this.url = mockItem.url;
        this.method = /^(get|post|put|patch|delete|head|any)$/i.test(mockItem.method || '')
            ? (_a = mockItem.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()
            : 'ANY';
        this.header = typeof mockItem.header === 'object' ? mockItem.header : {};
        this.delay = mockItem.delay !== undefined && /^\d{0,15}$/.test(mockItem.delay + '') ? (+mockItem.delay) : 0;
        this.times = mockItem.times !== undefined && /^-?\d{0,15}$/.test(mockItem.times + '') ? +mockItem.times : Infinity;
        this.status = mockItem.status && /^[1-5][0-9][0-9]$/.test(mockItem.status + '') ? +mockItem.status : 200;
        this.disable = (mockItem.disable && /^(yes|true|1)$/.test(mockItem.disable) ? 'YES' : 'NO');
        if ('body' in mockItem) {
            this.body = mockItem.body;
        }
        else if ('response' in mockItem) {
            this.body = mockItem.response;
        }
        else {
            this.body = '';
        }
        if (mockItem.remote && /^((get|post|put|patch|delete|head)\s+)?https?:\/\//i.test(mockItem.remote)) {
            this.remote = mockItem.remote;
        }
        this.proxy = !!mockItem.proxy;
        this.key = "".concat(this.url, "-").concat(this.method);
    }
    MockItem.prototype.bypass = function () {
        return new bypass_1.default;
    };
    MockItem.prototype.sendBody = function (requestInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof this.body === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.body.bind(this)(requestInfo, this)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = this.body;
                        _b.label = 3;
                    case 3:
                        body = _a;
                        return [2 /*return*/, body];
                }
            });
        });
    };
    MockItem.prototype.getRemoteInfo = function (requestUrl) {
        if (!this.remote)
            return false;
        var arr = this.remote.split(/(\s)/);
        var method = '';
        var url = this.remote;
        if (/^(get|post|put|patch|delete|head)$/i.test(arr[0])) {
            method = arr[0];
            url = arr.slice(2).join('');
        }
        var query = (0, utils_1.getQuery)(requestUrl);
        for (var key in query) {
            url = url.replace(new RegExp('\\$query\.' + key, 'g'), query[key]);
        }
        url = url.replace(/\$query/g, (0, utils_1.queryObject2String)(query));
        return { method: method, url: url };
    };
    return MockItem;
}());
exports["default"] = MockItem;


/***/ }),

/***/ 755:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __filename = "/index.js";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var fs_1 = __importDefault(__webpack_require__(328));
var path_1 = __importDefault(__webpack_require__(304));
var comment_1 = __importDefault(__webpack_require__(141));
var utils_1 = __webpack_require__(571);
var config_1 = __webpack_require__(913);
var types_1 = __webpack_require__(699);
var mock_item_1 = __importDefault(__webpack_require__(832));
var Mocker = /** @class */ (function () {
    function Mocker(proxyServer) {
        var _a;
        if (proxyServer === void 0) { proxyServer = ''; }
        this.disabled = false;
        this.log = false;
        this.proxyServer = '';
        this.proxyMode = 'none';
        if (Mocker.instance) {
            return Mocker.instance;
        }
        if (/^(matched|marked)@localhost:\d+$/.test(proxyServer)) {
            _a = proxyServer.split('@'), this.proxyMode = _a[0], this.proxyServer = _a[1];
        }
        Mocker.instance = this;
        this.log = !(0, utils_1.isNodejs)();
        this.mockConfigData = {};
        this.groupLog([['[http-request-mock] is %cloaded.', 'color:inherit;font-weight:bold;']]);
    }
    Mocker.getInstance = function () {
        return new Mocker();
    };
    /**
     * Set global mock data configuration.
     * @param {object} mockConfigData
     */
    Mocker.prototype.setMockData = function (mockConfigData) {
        for (var key in mockConfigData) {
            this.mock(mockConfigData[key]);
        }
        return this;
    };
    /**
     * Add an mock item to global mock data configuration.
     * @param {string} key
     * @param {MockItem} val
     */
    Mocker.prototype.addMockItem = function (key, val) {
        this.mockConfigData[key] = val;
        return this;
    };
    /**
     * Reset global mock data configuration.
     */
    Mocker.prototype.reset = function () {
        this.mockConfigData = {};
        this.sendMsgToProxyServer('reset');
        return this;
    };
    /**
     * Enable mock function temporarily.
     * Not available in proxy mode.
     */
    Mocker.prototype.enable = function () {
        this.disabled = false;
        this.sendMsgToProxyServer('enable');
        this.groupLog([['[http-request-mock] is %cenabled.', 'color:green;font-weight:bold;']]);
        return this;
    };
    /**
     * Disable mock function temporarily.
     * Not available in proxy mode.
     */
    Mocker.prototype.disable = function () {
        this.disabled = true;
        this.sendMsgToProxyServer('disable');
        this.groupLog([['[http-request-mock] is %cdisabled.', 'color:red;font-weight:bold;']]);
        return this;
    };
    /**
     * Send a message to proxy server if in a proxy mode.
     * @param {string} msg
     */
    Mocker.prototype.sendMsgToProxyServer = function (msg) {
        if (msg === void 0) { msg = ''; }
        if (!this.proxyServer) {
            return;
        }
        if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
            return;
        }
        if (typeof window !== 'undefined' &&
            Object.prototype.toString.call(window) === '[object Window]' &&
            typeof window.fetch === 'function') {
            window.fetch("http://".concat(this.proxyServer, "/__hrm_msg__/") + encodeURIComponent(msg));
        }
    };
    /**
     * Disable logs function temporarily.
     * Not available in proxy mode.
     */
    Mocker.prototype.disableLog = function () {
        this.log = false;
        this.sendMsgToProxyServer('disableLog');
        return this;
    };
    /**
     * Disable logs function temporarily.
     * Not available in proxy mode.
     */
    Mocker.prototype.enableLog = function () {
        this.log = true;
        this.sendMsgToProxyServer('enableLog');
        return this;
    };
    /**
     * Note: this method is only for a nodejs envrioment(test environment).
     * Use a mock file & add it to global mock data configuration.
     * @param {string} file
     */
    Mocker.prototype.use = function (file) {
        var absoluteFile = file;
        if (!path_1.default.isAbsolute(file)) {
            var callerFile = this.getCallerFile();
            if (!callerFile) {
                throw new Error('Expected "file" to be a absolute path.');
            }
            absoluteFile = path_1.default.resolve(callerFile, '..', file);
        }
        if (!fs_1.default.existsSync(absoluteFile)) {
            throw new Error("".concat(absoluteFile, " does not exist."));
        }
        var tags = comment_1.default.parseCommentTags(absoluteFile);
        // To avoid "Critical dependency: the request of a dependency is an expression" error
        tags.body = eval('require')(absoluteFile);
        return this.mock(tags);
    };
    /**
     * Get caller file from error stack
     */
    Mocker.prototype.getCallerFile = function () {
        var oldPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) { return stack; };
        var stack = new Error().stack;
        Error.prepareStackTrace = oldPrepareStackTrace;
        if (stack !== null && typeof stack === 'object') {
            for (var i = 0; i < 50; i++) {
                var file = stack[i] ? stack[i].getFileName() : undefined;
                var next = stack[i + 1] ? stack[i + 1].getFileName() : undefined;
                if (file !== next && file === __filename) {
                    return next;
                }
            }
        }
    };
    /**
     * Check specified mock item & add it to global mock data configuration.
     * @param {MockItem} mockItem
     * @returns false | MockItem
     */
    Mocker.prototype.mock = function (mockItemInfo) {
        if (!(0, utils_1.isObject)(mockItemInfo)) {
            throw new Error('Invalid mock item, a valid mock item must be an object.');
        }
        var mockItem = new mock_item_1.default(mockItemInfo);
        if (!mockItem.key)
            return false;
        this.addMockItem(mockItem.key, mockItem);
        return mockItem;
    };
    /**
     * Make a mock item that matches an HTTP GET request.
     * @param {RegExp | String} url
     * @param {unknown} body
     * @param {MockItemExt} opts {
     *    @param {number} delay
     *    @param {number} status
     *    @param {object} header
     *    @param {number} times
     * }
     */
    Mocker.prototype.get = function (url, body, opts) {
        if (opts === void 0) { opts = {
            delay: 0,
            status: 200,
            times: Infinity,
            header: {}
        }; }
        var delay = opts.delay, status = opts.status, times = opts.times, header = opts.header;
        this.mock({ url: url, method: types_1.Method.GET, body: body, delay: delay, status: status, header: header, times: times });
        return this;
    };
    /**
     * Make a mock item that matches an HTTP POST request.
     * @param {RegExp | String} url
     * @param {any} body
     * @param {MockItemExt} opts {
     *    @param {number} delay
     *    @param {number} status
     *    @param {object} header
     *    @param {number} times
     * }
     */
    Mocker.prototype.post = function (url, body, opts) {
        if (opts === void 0) { opts = {
            delay: 0,
            status: 200,
            times: Infinity,
            header: {}
        }; }
        var delay = opts.delay, status = opts.status, times = opts.times, header = opts.header;
        this.mock({ url: url, method: types_1.Method.POST, body: body, delay: delay, status: status, header: header, times: times });
        return this;
    };
    /**
     * Make a mock item that matches an HTTP PUT request.
     * @param {RegExp | String} url
     * @param {any} body
     * @param {MockItemExt} opts {
     *    @param {number} delay
     *    @param {number} status
     *    @param {object} header
     *    @param {number} times
     * }
     */
    Mocker.prototype.put = function (url, body, opts) {
        if (opts === void 0) { opts = {
            delay: 0,
            status: 200,
            times: Infinity,
            header: {}
        }; }
        var delay = opts.delay, status = opts.status, times = opts.times, header = opts.header;
        this.mock({ url: url, method: types_1.Method.PUT, body: body, delay: delay, status: status, header: header, times: times });
        return this;
    };
    /**
     * Make a mock item that matches an HTTP PATCH request.
     * @param {RegExp | String} url
     * @param {any} body
     * @param {MockItemExt} opts {
     *    @param {number} delay
     *    @param {number} status
     *    @param {object} header
     *    @param {number} times
     * }
     */
    Mocker.prototype.patch = function (url, body, opts) {
        if (opts === void 0) { opts = {
            delay: 0,
            status: 200,
            times: Infinity,
            header: {}
        }; }
        var delay = opts.delay, status = opts.status, times = opts.times, header = opts.header;
        this.mock({ url: url, method: types_1.Method.PATCH, body: body, delay: delay, status: status, header: header, times: times });
        return this;
    };
    /**
     * Make a mock item that matches an HTTP DELETE request.
     * @param {RegExp | String} url
     * @param {any} body
     * @param {MockItemExt} opts {
     *    @param {number} delay
     *    @param {number} status
     *    @param {object} header
     *    @param {number} times
     * }
     */
    Mocker.prototype.delete = function (url, body, opts) {
        if (opts === void 0) { opts = {
            delay: 0,
            status: 200,
            times: Infinity,
            header: {}
        }; }
        var delay = opts.delay, status = opts.status, times = opts.times, header = opts.header;
        this.mock({ url: url, method: types_1.Method.DELETE, body: body, delay: delay, status: status, header: header, times: times });
        return this;
    };
    /**
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD
     * Warning: A response to a HEAD method should not have a body.
     * If it has one anyway, that body must be ignored, any representation
     * headers that might describe the erroneous body are instead assumed
     * to describe the response which a similar GET request would have received.
     *
     * Make a mock item that matches an HTTP HEAD request.
     * @param {RegExp | String} url
     * @param {MockItemExt} opts {
     *    @param {number} delay
     *    @param {number} status
     *    @param {object} header
     *    @param {number} times
     * }
     */
    Mocker.prototype.head = function (url, opts) {
        if (opts === void 0) { opts = {
            delay: 0,
            status: 200,
            times: Infinity,
            header: {}
        }; }
        var delay = opts.delay, status = opts.status, times = opts.times, header = opts.header;
        this.mock({ url: url, method: types_1.Method.HEAD, body: '', delay: delay, status: status, header: header, times: times });
        return this;
    };
    /**
     * Make a mock item that matches an HTTP GET, POST, PUT, PATCH, DELETE or HEAD request.
     * @param {RegExp | String} url
     * @param {unknown} body
     * @param {MockItemExt} opts {
     *    @param {number} delay
     *    @param {number} status
     *    @param {object} header
     *    @param {number} times
     * }
     */
    Mocker.prototype.any = function (url, body, opts) {
        if (opts === void 0) { opts = {
            delay: 0,
            status: 200,
            times: Infinity,
            header: {}
        }; }
        var delay = opts.delay, status = opts.status, times = opts.times, header = opts.header;
        this.mock({ url: url, method: types_1.Method.ANY, body: body, delay: delay, status: status, header: header, times: times });
        return this;
    };
    /**
     * Check whether the specified request url matchs a defined mock item.
     * If a match is found, return the matched mock item, otherwise a null is returned.
     * @param {string} reqUrl
     * @param {string} reqMethod
     * @return null | MockItem
     */
    Mocker.prototype.matchMockItem = function (reqUrl, reqMethod) {
        if (this.disabled) {
            return null;
        }
        var requestMethod = (reqMethod || 'GET').toUpperCase();
        var items = Object.values(this.mockConfigData).filter(function (_a) {
            var disable = _a.disable, times = _a.times, method = _a.method;
            var verb = String(method).toUpperCase();
            return disable !== 'YES' && (times === undefined || times > 0) && (verb === 'ANY' || verb === requestMethod);
        }).sort(function (mockItem1, mockItem2) {
            return String(mockItem2.url).length - String(mockItem1.url).length;
        });
        for (var i = 0; i < 2; i++) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var info = items_1[_i];
                try {
                    if ((info.url instanceof RegExp) && info.url.test(reqUrl)) {
                        return info;
                    }
                    var infoUrl = reqUrl.indexOf('//') === 0
                        // for the request urls which without http protocol
                        ? String(info.url).replace(/^https?:/ig, '')
                        : String(info.url);
                    // [whole matching] takes precedence over partial matching
                    if (i === 0 && reqUrl === infoUrl) {
                        return info;
                    }
                    // whole matching takes precedence over [partial matching]
                    if (i === 1 && reqUrl.indexOf(infoUrl) !== -1) {
                        return info;
                    }
                }
                catch (e) {
                    // ignore match error, normally, user doesn't care it.
                }
            }
        }
        return null;
    };
    /**
     * Set group logs
     * @param {Logs[]} logs
     * @returns
     */
    Mocker.prototype.groupLog = function (logs) {
        if (!this.log)
            return;
        if (typeof console.groupCollapsed !== 'function')
            return;
        if (typeof console.groupEnd !== 'function')
            return;
        if (Array.isArray(logs[0])) {
            console.groupCollapsed.apply(console, logs[0]);
        }
        else {
            console.groupCollapsed(logs[0]);
        }
        for (var i = 1; i < logs.length; i++) {
            if (Array.isArray(logs[i])) {
                console.log.apply(console, logs[i]);
            }
            else {
                console.log(logs[i]);
            }
        }
        console.groupEnd();
    };
    Mocker.prototype.sendResponseLog = function (spent, body, requestInfo, mockItem) {
        var logs = [
            [
                '[http-request-mock] %s %s %s (%c%s%c)',
                "".concat((0, utils_1.currentTime)()),
                requestInfo.method,
                requestInfo.url,
                ('color:' + (mockItem.status < 300 ? 'green' : 'red')),
                mockItem.status,
                'color:inherit',
            ],
            ['Request: ', requestInfo],
            ['Response: ', {
                    body: body,
                    spent: spent,
                    headers: __assign(__assign({}, mockItem.header), { 'x-powered-by': 'http-request-mock' }),
                    status: mockItem.status,
                    statusText: config_1.HTTPStatusCodes[mockItem.status] || ''
                }],
            // ['MockItem: ', mockItem]
        ];
        if ((0, utils_1.isNodejs)()) { // less information for nodejs
            var url = mockItem.url, method = mockItem.method, delay = mockItem.delay, times = mockItem.times, status_1 = mockItem.status, disable = mockItem.disable;
            logs[3] = ['MockItem:', { url: url, method: method, delay: delay, times: times, status: status_1, disable: disable }];
        }
        else {
            logs[3] = ['MockItem: ', mockItem];
        }
        this.groupLog(logs);
    };
    return Mocker;
}());
exports["default"] = Mocker;


/***/ }),

/***/ 699:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Disable = exports.Method = void 0;
// enums
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["PATCH"] = "PATCH";
    Method["DELETE"] = "DELETE";
    Method["HEAD"] = "HEAD";
    Method["ANY"] = "ANY";
})(Method = exports.Method || (exports.Method = {}));
var Disable;
(function (Disable) {
    Disable["YES"] = "YES";
    Disable["NO"] = "NO";
})(Disable = exports.Disable || (exports.Disable = {}));


/***/ }),

/***/ 141:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const fs = __webpack_require__(462);
module.exports = class Comment {
  /**
   * Extract meta information from comments in the specified file.
   * Meta information includes: @url, @method, @disable, @delay, @status and so on.
   * @param {string} file
   */
  static parseCommentTags(file) {
    const tags = this.getFileCommentTags(file);
    const keys = ['url', 'method', 'disable', 'delay', 'status', 'header', 'times', 'remote', 'proxy'];
    const res = {};
    const header = {};

    for(const {tag, info} of tags) {
      if (!keys.includes(tag)) continue;

      if (tag === 'header') {
        if (!/^[\w.-]+\s*:\s*.+$/.test(info)) continue;

        const key = info.slice(0, info.indexOf(':')).trim().toLowerCase();
        const val = info.slice(info.indexOf(':')+1).trim();
        if (!key || !val) continue;
        header[key] = header[key] ? [].concat(header[key], val) : val;
      }
      res[tag] = info;
    }

    // status: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    res.header = Object.keys(header).length > 0 ? header : undefined;
    res.method = /^(get|post|put|patch|delete|head)$/i.test(res.method) ? res.method.toUpperCase() : undefined;
    res.delay = /^\d{0,15}$/.test(res.delay) ? +res.delay : undefined;
    res.times = /^-?\d{0,15}$/.test(res.times) ? +res.times : undefined;
    res.status = /^[1-5][0-9][0-9]$/.test(res.status) ? +res.status : undefined;
    res.disable = res.disable !== undefined && /^(yes|true|1|)$/i.test(res.disable) ? 'yes' : (res.disable || undefined);
    res.remote = /^((get|post|put|patch|delete|head)\s+)?https?:\/\/[^\s]+$/i.test(res.remote) ? res.remote : undefined;
    res.proxy = res.proxy !== undefined ? true : undefined;

    if (this.isRegExp(res.url)) {
      res.regexp = this.str2RegExp(res.url, true);
      res.url = this.str2RegExp(res.url);
    }
    return res;
  }

  /**
   * Parse the first comment block of specified file and return meta tags.
   * @param {string} file
   */
  static getFileCommentTags(file) {
    if (!fs.existsSync(file)) return [];

    const str = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
    // We only parse the first comment block, so no 'g' modifier here
    const match = str.match(/\/\*\*\r?\n.*?\r?\n ?\*\//su);
    if (!match) return [];
    const comment = match[0];

    const tags = [];
    const reg = /^[ \t]*\*[ \t]*@(\w+)(?:[ \t]+(.*))?$/mg;
    let tag = reg.exec(comment);
    while(tag) {
      tags.push({ tag: tag[1], info: (tag[2] || '').trim() });
      tag = reg.exec(comment);
    }
    return tags;
  }

  /**
   * Whether or not 'str' is a RegExp object like string.
   * @param {string} str
   */
  static isRegExp(str) {
    if (/^\/[^/]/.test(str) && /\/[gim]*$/.test(str)) {
      return '/';
    }
    if (/^#[^#]/.test(str) && /#[gim]*$/.test(str)) {
      return '#';
    }
    return false;
  }

  /**
   * Whether or not 'str' is a RegExp object like string.
   * @param {string} str
   * @param {boolean} returnRegStrWithOpts
   */
  static str2RegExp(str, returnRegStrWithOpts = false) {
    let opts = '';
    str = str.replace(/^(#|\/)/g, '').replace(/(#|\/)([gim]*)$/, (match) => {
      opts = match.slice(1);
      return '';
    });

    if (returnRegStrWithOpts) {
      return [new RegExp(str, opts).toString().replace(/^\/|\/\w*$/g, ''), opts];
    }
    return new RegExp(str, opts);
  }
};


/***/ }),

/***/ 462:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 328:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 304:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=http-request-mock.js.map