/*! airbrake-js v0.9.4 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Client"] = factory();
	else
		root["airbrakeJs"] = root["airbrakeJs"] || {}, root["airbrakeJs"]["Client"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// jsonifyNotice serializes notice to JSON and truncates params,
// environment and session keys.
function jsonifyNotice(notice, maxLength) {
    if (maxLength === void 0) { maxLength = 64000; }
    var s = '';
    for (var level = 0; level < 8; level++) {
        notice.context = truncateObj(notice.context, level);
        notice.params = truncateObj(notice.params, level);
        notice.environment = truncateObj(notice.environment, level);
        notice.session = truncateObj(notice.session, level);
        s = JSON.stringify(notice);
        if (s.length < maxLength) {
            return s;
        }
    }
    var err = new Error("airbrake-js: cannot jsonify notice (length=" + s.length + " maxLength=" + maxLength + ")");
    err.params = {
        json: s.slice(0, Math.floor(maxLength / 2)) + '...',
    };
    throw err;
}
exports.default = jsonifyNotice;
// truncateObj truncates each key in the object separately, which is
// useful for handling circular references.
function truncateObj(obj, level) {
    var dst = {};
    for (var attr in obj) {
        dst[attr] = truncate(obj[attr], level);
    }
    return dst;
}
var Truncator = (function () {
    function Truncator(level) {
        if (level === void 0) { level = 0; }
        this.maxStringLength = 1024;
        this.maxObjectLength = 128;
        this.maxArrayLength = 32;
        this.maxDepth = 8;
        this.keys = [];
        this.seen = [];
        this.maxStringLength = (this.maxStringLength >> level) || 1;
        this.maxObjectLength = (this.maxObjectLength >> level) || 1;
        this.maxArrayLength = (this.maxArrayLength >> level) || 1;
        this.maxDepth = (this.maxDepth >> level) || 1;
    }
    Truncator.prototype.truncate = function (value, key, depth) {
        if (key === void 0) { key = ''; }
        if (depth === void 0) { depth = 0; }
        if (value === null || value === undefined) {
            return value;
        }
        switch (typeof value) {
            case 'boolean':
            case 'number':
            case 'function':
                return value;
            case 'string':
                return this.truncateString(value);
            case 'object':
                break;
            default:
                return String(value);
        }
        if (value instanceof String) {
            return this.truncateString(value.toString());
        }
        if (value instanceof Boolean ||
            value instanceof Number ||
            value instanceof Date ||
            value instanceof RegExp) {
            return value;
        }
        if (value instanceof Error) {
            return value.toString();
        }
        if (this.seen.indexOf(value) >= 0) {
            return "[Circular " + this.getPath(value) + "]";
        }
        var type = objectType(value);
        depth++;
        if (depth > this.maxDepth) {
            return "[Truncated " + type + "]";
        }
        this.keys.push(key);
        this.seen.push(value);
        switch (type) {
            case 'Array':
                return this.truncateArray(value, depth);
            case 'Object':
                return this.truncateObject(value, depth);
            default:
                var saved = this.maxDepth;
                this.maxDepth = 0;
                var obj = this.truncateObject(value, depth);
                obj.__type = type;
                this.maxDepth = saved;
                return obj;
        }
    };
    Truncator.prototype.getPath = function (value) {
        var index = this.seen.indexOf(value);
        var path = [this.keys[index]];
        for (var i = index; i >= 0; i--) {
            var sub = this.seen[i];
            if (sub && getAttr(sub, path[0]) === value) {
                value = sub;
                path.unshift(this.keys[i]);
            }
        }
        return '~' + path.join('.');
    };
    Truncator.prototype.truncateString = function (s) {
        if (s.length > this.maxStringLength) {
            return s.slice(0, this.maxStringLength) + '...';
        }
        return s;
    };
    Truncator.prototype.truncateArray = function (arr, depth) {
        var length = 0;
        var dst = [];
        for (var i in arr) {
            var el = arr[i];
            length++;
            if (length >= this.maxArrayLength) {
                break;
            }
            dst.push(this.truncate(el, i, depth));
        }
        return dst;
    };
    Truncator.prototype.truncateObject = function (obj, depth) {
        var length = 0;
        var dst = {};
        for (var attr in obj) {
            var value = getAttr(obj, attr);
            if (value === undefined || typeof value === 'function') {
                continue;
            }
            length++;
            if (length >= this.maxObjectLength) {
                break;
            }
            dst[attr] = this.truncate(value, attr, depth);
        }
        return dst;
    };
    return Truncator;
}());
function truncate(value, level) {
    var t = new Truncator(level);
    return t.truncate(value);
}
exports.truncate = truncate;
function getAttr(obj, attr) {
    // Ignore browser specific exception trying to read attribute (#79).
    try {
        return obj[attr];
    }
    catch (_) {
        return;
    }
}
function objectType(obj) {
    var s = Object.prototype.toString.apply(obj);
    return s.slice('[object '.length, -1);
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

if (!Object.assign) {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return target[key] = source[key]; });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var promise_1 = __webpack_require__(4);
var stacktracejs_1 = __webpack_require__(5);
var ignore_1 = __webpack_require__(8);
var debounce_1 = __webpack_require__(9);
var uncaught_message_1 = __webpack_require__(10);
var angular_message_1 = __webpack_require__(11);
var window_1 = __webpack_require__(12);
var node_1 = __webpack_require__(13);
var reporter_1 = __webpack_require__(14);
var fetch_1 = __webpack_require__(15);
var node_2 = __webpack_require__(16);
var xhr_1 = __webpack_require__(17);
var jsonp_1 = __webpack_require__(18);
var historian_1 = __webpack_require__(19);
var Client = (function () {
    function Client(opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        this.opts = {};
        this.reporters = [];
        this.filters = [];
        this.offline = false;
        this.errors = [];
        this.opts = opts;
        this.opts.host = this.opts.host || 'https://api.airbrake.io';
        this.opts.timeout = this.opts.timeout || 10000;
        this.processor = opts.processor || stacktracejs_1.default;
        this.addReporter(opts.reporter || reporter_1.detectReporter(opts));
        this.addFilter(ignore_1.default);
        this.addFilter(debounce_1.default());
        this.addFilter(uncaught_message_1.default);
        this.addFilter(angular_message_1.default);
        if (typeof window === 'object') {
            this.addFilter(window_1.default);
            if (typeof window.addEventListener === 'function') {
                window.addEventListener('online', this.onOnline.bind(this));
                window.addEventListener('offline', function () { return _this.offline = true; });
            }
        }
        else {
            this.addFilter(node_1.default);
        }
        historian_1.historian.registerNotifier(this);
    }
    Client.prototype.setProject = function (id, key) {
        this.opts.projectId = id;
        this.opts.projectKey = key;
    };
    Client.prototype.setHost = function (host) {
        this.opts.host = host;
    };
    Client.prototype.addReporter = function (name) {
        var reporter;
        switch (name) {
            case 'fetch':
                reporter = fetch_1.default;
                break;
            case 'node':
                reporter = node_2.default;
                break;
            case 'xhr':
                reporter = xhr_1.default;
                break;
            case 'jsonp':
                reporter = jsonp_1.default;
                break;
            default:
                reporter = name;
        }
        this.reporters.push(reporter);
    };
    Client.prototype.addFilter = function (filter) {
        this.filters.push(filter);
    };
    Client.prototype.notify = function (err) {
        var _this = this;
        if (typeof err !== 'object' || err.error === undefined) {
            err = { error: err };
        }
        var promise = err.promise || new promise_1.default();
        if (!err.error) {
            var reason = new Error("airbrake-js: got err=" + JSON.stringify(err.error) + ", wanted an Error");
            promise.reject(reason);
            return promise;
        }
        if (this.opts.ignoreWindowError && err.context && err.context.windowError) {
            var reason = new Error('airbrake-js: window error is ignored');
            promise.reject(reason);
            return promise;
        }
        if (this.offline) {
            err.promise = promise;
            this.errors.push(err);
            if (this.errors.length > 100) {
                this.errors.slice(-100);
            }
            return promise;
        }
        var notice = {
            id: '',
            errors: [],
            context: Object.assign({
                language: 'JavaScript',
                severity: 'error',
                notifier: {
                    name: 'airbrake-js',
                    version: "0.9.4",
                    url: 'https://github.com/airbrake/airbrake-js',
                },
            }, err.context),
            params: err.params || {},
            environment: err.environment || {},
            session: err.session || {},
        };
        var history = historian_1.getHistory();
        if (history.length > 0) {
            notice.context.history = history;
        }
        this.processor(err.error, function (_, error) {
            notice.errors.push(error);
            for (var _i = 0, _a = _this.filters; _i < _a.length; _i++) {
                var filter = _a[_i];
                var r = filter(notice);
                if (r === null) {
                    promise.reject(new Error('airbrake-js: error is filtered'));
                    return;
                }
                notice = r;
            }
            for (var _b = 0, _c = _this.reporters; _b < _c.length; _b++) {
                var reporter = _c[_b];
                reporter(notice, _this.opts, promise);
            }
        });
        return promise;
    };
    Client.prototype.wrap = function (fn) {
        if (fn._airbrake) {
            return fn;
        }
        var client = this;
        var airbrakeWrapper = function () {
            var fnArgs = Array.prototype.slice.call(arguments);
            var wrappedArgs = client.wrapArguments(fnArgs);
            try {
                return fn.apply(this, wrappedArgs);
            }
            catch (err) {
                client.notify({ error: err, params: { arguments: fnArgs } });
                historian_1.historian.ignoreNextWindowError();
                throw err;
            }
        };
        for (var prop in fn) {
            if (fn.hasOwnProperty(prop)) {
                airbrakeWrapper[prop] = fn[prop];
            }
        }
        airbrakeWrapper._airbrake = true;
        airbrakeWrapper.inner = fn;
        return airbrakeWrapper;
    };
    Client.prototype.wrapArguments = function (args) {
        for (var i in args) {
            var arg = args[i];
            if (typeof arg === 'function') {
                args[i] = this.wrap(arg);
            }
        }
        return args;
    };
    Client.prototype.call = function (fn) {
        var _args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _args[_i - 1] = arguments[_i];
        }
        var wrapper = this.wrap(fn);
        return wrapper.apply(this, Array.prototype.slice.call(arguments, 1));
    };
    Client.prototype.onerror = function () {
        historian_1.historian.onerror.apply(historian_1.historian, arguments);
    };
    Client.prototype.onOnline = function () {
        this.offline = false;
        for (var _i = 0, _a = this.errors; _i < _a.length; _i++) {
            var err = _a[_i];
            this.notify(err);
        }
        this.errors = [];
    };
    return Client;
}());
module.exports = Client;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Promise = (function () {
    function Promise(executor) {
        this.onResolved = [];
        this.onRejected = [];
        if (executor) {
            executor(this.resolve.bind(this), this.reject.bind(this));
        }
    }
    Promise.prototype.then = function (onResolved, onRejected) {
        if (onResolved) {
            if (this.resolvedWith) {
                onResolved(this.resolvedWith);
            }
            else {
                this.onResolved.push(onResolved);
            }
        }
        if (onRejected) {
            if (this.rejectedWith) {
                onRejected(this.rejectedWith);
            }
            else {
                this.onRejected.push(onRejected);
            }
        }
        return this;
    };
    Promise.prototype.catch = function (onRejected) {
        if (this.rejectedWith) {
            onRejected(this.rejectedWith);
        }
        else {
            this.onRejected.push(onRejected);
        }
        return this;
    };
    Promise.prototype.resolve = function (value) {
        if (this.resolvedWith || this.rejectedWith) {
            throw new Error('Promise is already resolved or rejected');
        }
        this.resolvedWith = value;
        for (var _i = 0, _a = this.onResolved; _i < _a.length; _i++) {
            var fn = _a[_i];
            fn(value);
        }
        return this;
    };
    Promise.prototype.reject = function (reason) {
        if (this.resolvedWith || this.rejectedWith) {
            throw new Error('Promise is already resolved or rejected');
        }
        this.rejectedWith = reason;
        for (var _i = 0, _a = this.onRejected; _i < _a.length; _i++) {
            var fn = _a[_i];
            fn(reason);
        }
        return this;
    };
    return Promise;
}());
exports.default = Promise;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ErrorStackParser = __webpack_require__(6);
var hasConsole = typeof console === 'object' && console.warn;
function parse(err) {
    try {
        return ErrorStackParser.parse(err);
    }
    catch (parseErr) {
        if (hasConsole && err.stack) {
            console.warn('ErrorStackParser:', parseErr.toString(), err.stack);
        }
    }
    if (err.fileName) {
        return [err];
    }
    return [];
}
function processor(err, cb) {
    var backtrace = [];
    if (!err.noStack) {
        var frames_1 = parse(err);
        if (frames_1.length === 0) {
            try {
                throw new Error('fake');
            }
            catch (fakeErr) {
                frames_1 = parse(fakeErr);
                frames_1.shift();
                frames_1.shift();
            }
        }
        for (var _i = 0, frames_2 = frames_1; _i < frames_2.length; _i++) {
            var frame = frames_2[_i];
            backtrace.push({
                function: frame.functionName || '',
                file: frame.fileName || '<anonymous>',
                line: frame.lineNumber || 0,
                column: frame.columnNumber || 0,
            });
        }
    }
    var type;
    if (err.name) {
        type = err.name;
    }
    else {
        type = '';
    }
    var msg;
    if (err.message) {
        msg = String(err.message);
    }
    else {
        msg = String(err);
    }
    cb('stacktracejs', {
        type: type,
        message: msg,
        backtrace: backtrace,
    });
}
exports.default = processor;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define('error-stack-parser', ['stackframe'], factory);
    } else if (true) {
        module.exports = factory(__webpack_require__(7));
    } else {
        root.ErrorStackParser = factory(root.StackFrame);
    }
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return filtered.map(function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame({
                    functionName: functionName,
                    fileName: fileName,
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return filtered.map(function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame({
                        functionName: line
                    });
                } else {
                    var tokens = line.split('@');
                    var locationParts = this.extractLocation(tokens.pop());
                    var functionName = tokens.join('@') || undefined;

                    return new StackFrame({
                        functionName: functionName,
                        fileName: locationParts[0],
                        lineNumber: locationParts[1],
                        columnNumber: locationParts[2],
                        source: line
                    });
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i]
                    }));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame({
                            functionName: match[3] || undefined,
                            fileName: match[2],
                            lineNumber: match[1],
                            source: lines[i]
                        })
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return filtered.map(function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');

                return new StackFrame({
                    functionName: functionName,
                    args: args,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        }
    };
}));



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define('stackframe', [], factory);
    } else if (true) {
        module.exports = factory();
    } else {
        root.StackFrame = factory();
    }
}(this, function() {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
        return str[0].toUpperCase() + str.substring(1);
    }

    function _getter(p) {
        return function() {
            return this[p];
        };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];

    var props = booleanProps.concat(numericProps, stringProps, arrayProps);

    function StackFrame(obj) {
        if (obj instanceof Object) {
            for (var i = 0; i < props.length; i++) {
                if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
                    this['set' + _capitalize(props[i])](obj[props[i]]);
                }
            }
        }
    }

    StackFrame.prototype = {
        getArgs: function() {
            return this.args;
        },
        setArgs: function(v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        getEvalOrigin: function() {
            return this.evalOrigin;
        },
        setEvalOrigin: function(v) {
            if (v instanceof StackFrame) {
                this.evalOrigin = v;
            } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
            } else {
                throw new TypeError('Eval Origin must be an Object or StackFrame');
            }
        },

        toString: function() {
            var functionName = this.getFunctionName() || '{anonymous}';
            var args = '(' + (this.getArgs() || []).join(',') + ')';
            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
            return functionName + args + fileName + lineNumber + columnNumber;
        }
    };

    for (var i = 0; i < booleanProps.length; i++) {
        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function(p) {
            return function(v) {
                this[p] = Boolean(v);
            };
        })(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function(p) {
            return function(v) {
                if (!_isNumber(v)) {
                    throw new TypeError(p + ' must be a Number');
                }
                this[p] = Number(v);
            };
        })(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function(p) {
            return function(v) {
                this[p] = String(v);
            };
        })(stringProps[k]);
    }

    return StackFrame;
}));



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IGNORED_MESSAGES = [
    'Script error',
    'Script error.',
    'InvalidAccessError',
];
function filter(notice) {
    var err = notice.errors[0];
    if (err.type === '' && IGNORED_MESSAGES.indexOf(err.message) !== -1) {
        return null;
    }
    if (err.backtrace) {
        var frame = err.backtrace[0];
        if (frame.file === '<anonymous>') {
            return null;
        }
    }
    return notice;
}
exports.default = filter;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function makeFilter() {
    var lastNoticeJSON;
    var timeout;
    return function (notice) {
        var s = JSON.stringify(notice.errors);
        if (s === lastNoticeJSON) {
            return null;
        }
        if (timeout) {
            clearTimeout(timeout);
        }
        lastNoticeJSON = s;
        timeout = setTimeout(function () {
            lastNoticeJSON = '';
        }, 1000);
        return notice;
    };
}
exports.default = makeFilter;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp([
    '^',
    'Uncaught\\s',
    '(.+?)',
    ':\\s',
    '(.+)',
    '$',
].join(''));
function filter(notice) {
    var err = notice.errors[0];
    if (err.type !== '' && err.type !== 'Error') {
        return notice;
    }
    var m = err.message.match(re);
    if (m !== null) {
        err.type = m[1];
        err.message = m[2];
    }
    return notice;
}
exports.default = filter;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var re = new RegExp([
    '^',
    '\\[(\\$.+)\\]',
    '\\s',
    '([\\s\\S]+)',
    '$',
].join(''));
function filter(notice) {
    var err = notice.errors[0];
    if (err.type !== '' && err.type !== 'Error') {
        return notice;
    }
    var m = err.message.match(re);
    if (m !== null) {
        err.type = m[1];
        err.message = m[2];
    }
    return notice;
}
exports.default = filter;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function filter(notice) {
    if (window.navigator && window.navigator.userAgent) {
        notice.context.userAgent = window.navigator.userAgent;
    }
    if (window.location) {
        notice.context.url = String(window.location);
        // Set root directory to group errors on different subdomains together.
        notice.context.rootDirectory = window.location.protocol + '//' + window.location.host;
    }
    return notice;
}
exports.default = filter;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var myProcess, os;
try {
    // Use eval to hide import from Webpack and browserify.
    myProcess = eval('process');
    os = eval('require')('os');
}
catch (_) { }
function filter(notice) {
    if (os) {
        notice.context.os = os.type() + "/" + os.release();
        notice.context.architecture = os.arch();
        notice.context.hostname = os.hostname();
    }
    notice.context.platform = myProcess.platform;
    if (!notice.context.rootDirectory) {
        notice.context.rootDirectory = myProcess.cwd();
    }
    if (myProcess.env.NODE_ENV) {
        notice.context.environment = myProcess.env.NODE_ENV;
    }
    notice.params.process = {
        pid: myProcess.pid,
        cwd: myProcess.cwd(),
        execPath: myProcess.execPath,
        argv: myProcess.argv,
    };
    for (var name_1 in ['uptime', 'cpuUsage', 'memoryUsage']) {
        if (myProcess[name_1]) {
            notice.params.process[name_1] = myProcess[name_1]();
        }
    }
    if (os) {
        notice.params.os = {
            homedir: os.homedir(),
            uptime: os.uptime(),
            freemem: os.freemem(),
            totalmem: os.totalmem(),
            loadavg: os.loadavg(),
        };
    }
    return notice;
}
exports.default = filter;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function detectReporter(_opts) {
    if (typeof fetch === 'function') {
        return 'fetch';
    }
    if (typeof XMLHttpRequest === 'function') {
        return 'xhr';
    }
    if (typeof window === 'object') {
        return 'jsonp';
    }
    return 'node';
}
exports.detectReporter = detectReporter;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonify_notice_1 = __webpack_require__(0);
function report(notice, opts, promise) {
    var url = opts.host + "/api/v3/projects/" + opts.projectId + "/notices?key=" + opts.projectKey;
    var payload = jsonify_notice_1.default(notice);
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: payload,
    }).then(function (req) {
        if (req.status >= 200 && req.status < 500) {
            req.json().then(function (resp) {
                if (resp.id) {
                    notice.id = resp.id;
                    promise.resolve(notice);
                    return;
                }
                if (resp.error) {
                    var err = new Error(resp.error);
                    promise.reject(err);
                    return;
                }
            });
            return;
        }
        req.text().then(function (body) {
            var err = new Error("airbrake: fetch: unexpected response: code=" + req.status + " body='" + body + "'");
            promise.reject(err);
        });
    }).catch(function (err) {
        promise.reject(err);
    });
}
exports.default = report;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonify_notice_1 = __webpack_require__(0);
var request;
try {
    // Use eval to hide import from Webpack.
    request = eval('require')('request');
}
catch (_) { }
function report(notice, opts, promise) {
    var url = opts.host + "/api/v3/projects/" + opts.projectId + "/notices?key=" + opts.projectKey;
    var payload = jsonify_notice_1.default(notice);
    request({
        url: url,
        method: 'POST',
        body: payload,
        headers: {
            'content-type': 'application/json'
        },
        timeout: opts.timeout,
    }, function (error, response, body) {
        if (error) {
            promise.reject(error);
            return;
        }
        if (response.statusCode >= 200 && response.statusCode < 500) {
            var resp = JSON.parse(body);
            if (resp.id) {
                notice.id = resp.id;
                promise.resolve(notice);
                return;
            }
            if (resp.error) {
                var err_1 = new Error(resp.error);
                promise.reject(err_1);
                return;
            }
        }
        body = body.trim();
        var err = new Error("airbrake: node: unexpected response: code=" + response.statusCode + " body='" + body + "'");
        promise.reject(err);
    });
}
exports.default = report;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonify_notice_1 = __webpack_require__(0);
function report(notice, opts, promise) {
    var url = opts.host + "/api/v3/projects/" + opts.projectId + "/notices?key=" + opts.projectKey;
    var payload = jsonify_notice_1.default(notice);
    var req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.timeout = opts.timeout;
    req.setRequestHeader('Content-Type', 'application/json');
    req.onreadystatechange = function () {
        if (req.readyState !== 4) {
            return;
        }
        if (req.status >= 200 && req.status < 500) {
            var resp = JSON.parse(req.responseText);
            if (resp.id) {
                notice.id = resp.id;
                promise.resolve(notice);
                return;
            }
            if (resp.error) {
                var err_1 = new Error(resp.error);
                promise.reject(err_1);
                return;
            }
        }
        var body = req.responseText.trim();
        var err = new Error("airbrake: xhr: unexpected response: code=" + req.status + " body='" + body + "'");
        promise.reject(err);
    };
    req.send(payload);
}
exports.default = report;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsonify_notice_1 = __webpack_require__(0);
var cbCount = 0;
function report(notice, opts, promise) {
    cbCount++;
    var cbName = 'airbrakeCb' + String(cbCount);
    window[cbName] = function (resp) {
        try {
            delete window[cbName];
        }
        catch (_) {
            window[cbName] = undefined;
        }
        if (resp.id) {
            notice.id = resp.id;
            promise.resolve(notice);
            return;
        }
        if (resp.error) {
            var err_1 = new Error(resp.error);
            promise.reject(err_1);
            return;
        }
        var err = new Error(resp);
        promise.reject(err);
    };
    var payload = encodeURIComponent(jsonify_notice_1.default(notice));
    var url = opts.host + "/api/v3/projects/" + opts.projectId + "/create-notice?key=" + opts.projectKey + "&callback=" + cbName + "&body=" + payload;
    var document = window.document;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = url;
    script.onload = function () { return head.removeChild(script); };
    script.onerror = function () {
        head.removeChild(script);
        var err = new Error('airbrake: JSONP script error');
        promise.reject(err);
    };
    head.appendChild(script);
}
exports.default = report;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(20);
var Historian = (function () {
    function Historian() {
        var _this = this;
        this.historyMaxLen = 20;
        this.notifiers = [];
        this.errors = [];
        this.ignoreWindowError = 0;
        this.history = [];
        this.ignoreNextXHR = 0;
        if (typeof window === 'object') {
            var self_1 = this;
            var oldHandler_1 = window.onerror;
            window.onerror = function () {
                if (oldHandler_1) {
                    oldHandler_1.apply(this, arguments);
                }
                self_1.onerror.apply(self_1, arguments);
            };
        }
        else {
            // Use eval to hide process usage from Webpack and Browserify.
            var p = eval('process');
            p.on('uncaughtException', function (err) {
                // TODO: add wait for async notify
                _this.notify(err);
                throw err;
            });
            p.on('unhandledRejection', function (reason, _p) {
                _this.notify(reason);
            });
        }
        if (typeof document === 'object') {
            this.dom();
        }
        if (typeof console === 'object') {
            this.console();
        }
        if (typeof fetch === 'function') {
            this.fetch();
        }
        if (typeof XMLHttpRequest !== 'undefined') {
            this.xhr();
        }
        if (typeof history === 'object') {
            this.location();
        }
    }
    Historian.prototype.registerNotifier = function (n) {
        this.notifiers.push(n);
        for (var _i = 0, _a = this.errors; _i < _a.length; _i++) {
            var err = _a[_i];
            this.notifyNotifiers(err);
        }
        this.errors = [];
    };
    Historian.prototype.notify = function (err) {
        if (this.notifiers.length > 0) {
            this.notifyNotifiers(err);
            return;
        }
        this.errors.push(err);
        if (this.errors.length > this.historyMaxLen) {
            this.errors = this.errors.slice(-this.historyMaxLen);
        }
    };
    Historian.prototype.notifyNotifiers = function (err) {
        for (var _i = 0, _a = this.notifiers; _i < _a.length; _i++) {
            var notifier = _a[_i];
            notifier.notify(err);
        }
    };
    Historian.prototype.onerror = function (message, filename, line, column, err) {
        if (this.ignoreWindowError > 0) {
            return;
        }
        if (err) {
            this.notify({
                error: err,
                context: {
                    windowError: true,
                },
            });
            return;
        }
        // Ignore errors without file or line.
        if (!filename || !line) {
            return;
        }
        this.notify({
            error: {
                message: message,
                fileName: filename,
                lineNumber: line,
                columnNumber: column,
                noStack: true,
            },
            context: {
                windowError: true,
            },
        });
    };
    Historian.prototype.ignoreNextWindowError = function () {
        var _this = this;
        this.ignoreWindowError++;
        setTimeout(function () { return _this.ignoreWindowError--; });
    };
    Historian.prototype.getHistory = function () {
        return this.history;
    };
    Historian.prototype.pushHistory = function (state) {
        if (this.isDupState(state)) {
            if (this.lastState.num) {
                this.lastState.num++;
            }
            else {
                this.lastState.num = 2;
            }
            return;
        }
        if (!state.date) {
            state.date = new Date();
        }
        this.history.push(state);
        this.lastState = state;
        if (this.history.length > this.historyMaxLen) {
            this.history = this.history.slice(-this.historyMaxLen);
        }
    };
    Historian.prototype.isDupState = function (state) {
        if (!this.lastState) {
            return false;
        }
        for (var key in state) {
            if (key === 'date') {
                continue;
            }
            if (state[key] !== this.lastState[key]) {
                return false;
            }
        }
        return true;
    };
    Historian.prototype.dom = function () {
        var handler = dom_1.makeEventHandler(this);
        document.addEventListener('DOMContentLoaded', handler);
        window.addEventListener('load', handler);
        document.addEventListener('click', handler);
        document.addEventListener('keypress', handler);
        window.addEventListener('error', function (event) {
            if ('error' in event) {
                return;
            }
            handler(event);
        }, true);
    };
    Historian.prototype.console = function () {
        var client = this;
        var methods = ['debug', 'log', 'info', 'warn', 'error'];
        var _loop_1 = function (m) {
            if (!(m in console)) {
                return "continue";
            }
            var oldFn = console[m];
            var newFn = function () {
                oldFn.apply(console, arguments);
                client.pushHistory({
                    type: 'log',
                    severity: m,
                    arguments: Array.prototype.slice.call(arguments),
                });
            };
            newFn.inner = oldFn;
            console[m] = newFn;
        };
        for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
            var m = methods_1[_i];
            _loop_1(m);
        }
    };
    Historian.prototype.fetch = function () {
        var client = this;
        var oldFetch = fetch;
        window.fetch = function (input, init) {
            var state = {
                type: 'xhr',
                date: new Date(),
            };
            if (typeof input === 'string') {
                state.url = input;
            }
            else {
                state.url = input.url;
            }
            if (init && init.method) {
                state.method = init.method;
            }
            else {
                state.method = 'GET';
            }
            // Some platforms (e.g. react-native) implement fetch via XHR.
            client.ignoreNextXHR++;
            setTimeout(function () { return client.ignoreNextXHR--; });
            var promise = oldFetch.apply(this, arguments);
            promise.then(function (req) {
                state.statusCode = req.status;
                state.duration = new Date().getTime() - state.date.getTime();
                client.pushHistory(state);
            });
            return promise;
        };
    };
    Historian.prototype.xhr = function () {
        var client = this;
        var oldOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url, _async, _user, _password) {
            if (client.ignoreNextXHR === 0) {
                this.__state = {
                    type: 'xhr',
                    method: method,
                    url: url,
                };
            }
            oldOpen.apply(this, arguments);
        };
        var oldSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function (_data) {
            var oldFn = this.onreadystatechange;
            this.onreadystatechange = function (_ev) {
                if (this.readyState === 4 && this.__state) {
                    client.recordReq(this);
                }
                if (oldFn) {
                    return oldFn.apply(this, arguments);
                }
            };
            if (this.__state) {
                this.__state.date = new Date();
            }
            return oldSend.apply(this, arguments);
        };
    };
    Historian.prototype.recordReq = function (req) {
        var state = req.__state;
        state.statusCode = req.status;
        state.duration = new Date().getTime() - state.date.getTime();
        this.pushHistory(state);
    };
    Historian.prototype.location = function () {
        this.lastLocation = document.location.pathname;
        var client = this;
        var oldFn = window.onpopstate;
        window.onpopstate = function (_event) {
            client.recordLocation(document.location.pathname);
            if (oldFn) {
                return oldFn.apply(this, arguments);
            }
        };
        var oldPushState = history.pushState;
        history.pushState = function (_state, _title, url) {
            if (url) {
                client.recordLocation(url.toString());
            }
            oldPushState.apply(this, arguments);
        };
    };
    Historian.prototype.recordLocation = function (url) {
        var index = url.indexOf('://');
        if (index >= 0) {
            url = url.slice(index + 3);
            index = url.indexOf('/');
            if (index >= 0) {
                url = url.slice(index);
            }
            else {
                url = '/';
            }
        }
        else if (url.charAt(0) !== '/') {
            url = '/' + url;
        }
        this.pushHistory({
            type: 'location',
            from: this.lastLocation,
            to: url,
        });
        this.lastLocation = url;
    };
    return Historian;
}());
exports.default = Historian;
exports.historian = new Historian();
function getHistory() {
    return exports.historian.getHistory();
}
exports.getHistory = getHistory;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var elemAttrs = ['type', 'name', 'src'];
function elemName(elem) {
    if (!elem) {
        return '';
    }
    var s = [];
    if (elem.tagName) {
        s.push(elem.tagName.toLowerCase());
    }
    if (elem.id) {
        s.push('#');
        s.push(elem.id);
    }
    if (elem.className) {
        s.push('.');
        s.push(elem.className.split(' ').join('.'));
    }
    if (elem.getAttribute) {
        for (var _i = 0, elemAttrs_1 = elemAttrs; _i < elemAttrs_1.length; _i++) {
            var attr = elemAttrs_1[_i];
            var value = elem.getAttribute(attr);
            if (value) {
                s.push("[" + attr + "=\"" + value + "\"]");
            }
        }
    }
    return s.join('');
}
function elemPath(elem) {
    var maxLen = 10;
    var path = [];
    var parent = elem;
    while (parent) {
        var name_1 = elemName(parent);
        if (name_1 !== '') {
            path.push(name_1);
            if (path.length > maxLen) {
                break;
            }
        }
        parent = parent.parentNode;
    }
    if (path.length === 0) {
        return String(elem);
    }
    return path.reverse().join(' > ');
}
function makeEventHandler(client) {
    return function (event) {
        var target;
        try {
            target = event.target;
        }
        catch (_) {
            return;
        }
        if (!target) {
            return;
        }
        var state = { type: event.type };
        try {
            state.target = elemPath(target);
        }
        catch (err) {
            state.target = "<" + err.toString() + ">";
        }
        client.pushHistory(state);
    };
}
exports.makeEventHandler = makeEventHandler;


/***/ })
/******/ ]);
});
//# sourceMappingURL=client.js.map