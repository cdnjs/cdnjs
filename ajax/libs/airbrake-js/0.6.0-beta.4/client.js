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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var truncate_1 = __webpack_require__(8);
// truncateObj truncates each key in the object separately, which is
// useful for handling circular references.
function truncateObj(obj, n) {
    if (n === void 0) { n = 1000; }
    var dst = {};
    for (var key in obj) {
        dst[key] = truncate_1.default(obj[key], n);
    }
    return dst;
}
// jsonifyNotice serializes notice to JSON and truncates params,
// environment and session keys.
function jsonifyNotice(notice, n, maxLength) {
    if (n === void 0) { n = 1000; }
    if (maxLength === void 0) { maxLength = 64000; }
    var s;
    while (true) {
        notice.params = truncateObj(notice.params, n);
        notice.environment = truncateObj(notice.environment, n);
        notice.session = truncateObj(notice.session, n);
        s = JSON.stringify(notice);
        if (s.length < maxLength) {
            return s;
        }
        if (n === 0) {
            break;
        }
        n = Math.floor(n / 2);
    }
    var err = new Error("airbrake-js: cannot jsonify notice (length=" + s.length + " maxLength=" + maxLength + ")");
    err.params = {
        json: s.slice(0, Math.floor(n / 2)) + '...',
    };
    throw err;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = jsonifyNotice;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var promise_1 = __webpack_require__(10);
var stacktracejs_1 = __webpack_require__(9);
var script_error_1 = __webpack_require__(6);
var uncaught_message_1 = __webpack_require__(7);
var angular_message_1 = __webpack_require__(5);
var reporter_1 = __webpack_require__(13);
var compat_1 = __webpack_require__(11);
var xhr_1 = __webpack_require__(14);
var jsonp_1 = __webpack_require__(12);
// Creates window.onerror handler for notifier. See
// https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onerror.
function makeOnErrorHandler(notifier) {
    return function (message, filename, line, column, error) {
        if (error) {
            notifier.notify(error);
            return;
        }
        notifier.notify({ error: {
                message: message,
                fileName: filename,
                lineNumber: line,
                columnNumber: column,
            } });
    };
}
var Client = (function () {
    function Client(opts) {
        if (opts === void 0) { opts = {}; }
        this.opts = {};
        this.reporters = [];
        this.filters = [];
        this.opts.projectId = opts.projectId;
        this.opts.projectKey = opts.projectKey;
        if (opts.host) {
            this.opts.host = opts.host;
        }
        else {
            this.opts.host = 'https://api.airbrake.io';
        }
        if (opts.processor) {
            this.processor = opts.processor;
        }
        else {
            this.processor = stacktracejs_1.default;
        }
        if (opts.reporter) {
            this.addReporter(opts.reporter);
        }
        else {
            this.addReporter(reporter_1.detectReporter(opts));
        }
        this.addFilter(script_error_1.default);
        this.addFilter(uncaught_message_1.default);
        this.addFilter(angular_message_1.default);
        this.onerror = makeOnErrorHandler(this);
        if (!window.onerror && opts.onerror !== false) {
            window.onerror = this.onerror;
        }
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
            case 'compat':
                reporter = compat_1.default;
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
        var context = {
            language: 'JavaScript',
            notifier: {
                name: 'airbrake-js',
                version: "0.6.0-beta.4",
                url: 'https://github.com/airbrake/airbrake-js',
            },
        };
        if (window.navigator && window.navigator.userAgent) {
            context.userAgent = window.navigator.userAgent;
        }
        if (window.location) {
            context.url = String(window.location);
            // Set root directory to group errors on different subdomains together.
            context.rootDirectory = window.location.protocol + '//' + window.location.host;
        }
        var promise = new promise_1.default();
        this.processor(err.error || err, function (_, errInfo) {
            var notice = {
                id: '',
                errors: [errInfo],
                context: Object.assign(context, err.context),
                params: err.params || {},
                environment: err.environment || {},
                session: err.session || {},
            };
            for (var _i = 0, _a = _this.filters; _i < _a.length; _i++) {
                var filter = _a[_i];
                notice = filter(notice);
                if (notice === null || notice === false) {
                    return;
                }
            }
            for (var _b = 0, _c = _this.reporters; _b < _c.length; _b++) {
                var reporter = _c[_b];
                reporter(notice, _this.opts, promise);
            }
        });
        return promise;
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
    Client.prototype.wrap = function (fn) {
        if (fn.__airbrake__) {
            return fn;
        }
        var self = this;
        var airbrakeWrapper = function () {
            var fnArgs = Array.prototype.slice.call(arguments);
            var wrappedArgs = self.wrapArguments(fnArgs);
            try {
                return fn.apply(this, wrappedArgs);
            }
            catch (exc) {
                self.notify({ error: exc, params: { arguments: fnArgs } });
                return;
            }
        };
        for (var prop in fn) {
            if (fn.hasOwnProperty(prop)) {
                airbrakeWrapper[prop] = fn[prop];
            }
        }
        airbrakeWrapper.__airbrake__ = true;
        airbrakeWrapper.__inner__ = fn;
        return airbrakeWrapper;
    };
    Client.prototype.call = function (fn) {
        var wrapper = this.wrap(fn);
        return wrapper.apply(this, Array.prototype.slice.call(arguments, 1));
    };
    return Client;
}());
module.exports = Client;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        if (start === void 0) { start = 0; }
        for (var i = start; i < this.length; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    };
}
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

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory(require('stackframe'));
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.StackFrame = factory();
    }
}(this, function () {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
        return str[0].toUpperCase() + str.substring(1);
    }

    function _getter(p) {
        return function () {
            return this[p];
        };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];

    function StackFrame(obj) {
        if (obj instanceof Object) {
            var props = booleanProps.concat(numericProps.concat(stringProps.concat(arrayProps)));
            for (var i = 0; i < props.length; i++) {
                if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
                    this['set' + _capitalize(props[i])](obj[props[i]]);
                }
            }
        }
    }

    StackFrame.prototype = {
        getArgs: function () {
            return this.args;
        },
        setArgs: function (v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        getEvalOrigin: function () {
            return this.evalOrigin;
        },
        setEvalOrigin: function (v) {
            if (v instanceof StackFrame) {
                this.evalOrigin = v;
            } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
            } else {
                throw new TypeError('Eval Origin must be an Object or StackFrame');
            }
        },

        toString: function () {
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
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function (p) {
            return function (v) {
                this[p] = Boolean(v);
            };
        })(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function (p) {
            return function (v) {
                if (!_isNumber(v)) {
                    throw new TypeError(p + ' must be a Number');
                }
                this[p] = Number(v);
            };
        })(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function (p) {
            return function (v) {
                this[p] = String(v);
            };
        })(stringProps[k]);
    }

    return StackFrame;
}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var re = new RegExp([
    '^',
    '\\[(\\$.+)\\]',
    '\\s',
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filter;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IGNORED_MESSAGES = [
    'Script error',
    'Script error.',
];
function filter(notice) {
    var msg = notice.errors[0].message;
    if (IGNORED_MESSAGES.indexOf(msg) > -1) {
        return null;
    }
    return notice;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filter;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filter;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function getAttr(obj, attr) {
    // Ignore browser specific exceptions trying to read attribute (#79).
    try {
        return obj[attr];
    }
    catch (exc) {
        return undefined;
    }
}
function truncate(value, n, depth) {
    if (n === void 0) { n = 1000; }
    if (depth === void 0) { depth = 5; }
    var nn = 0;
    var keys = [];
    var seen = [];
    function getPath(value) {
        var index = seen.indexOf(value);
        var path = [keys[index]];
        for (var i = index; i >= 0; i--) {
            if (seen[i] && getAttr(seen[i], path[0]) === value) {
                value = seen[i];
                path.unshift(keys[i]);
            }
        }
        return '~' + path.join('.');
    }
    function fn(value, key, dd) {
        if (key === void 0) { key = ''; }
        if (dd === void 0) { dd = 0; }
        nn++;
        if (nn > n) {
            return '[Truncated]';
        }
        if (value === null || value === undefined) {
            return value;
        }
        switch (typeof value) {
            case 'boolean':
            case 'number':
            case 'string':
            case 'function':
                return value;
            case 'object':
                break;
            default:
                return String(value);
        }
        if (value instanceof Boolean ||
            value instanceof Number ||
            value instanceof String ||
            value instanceof Date ||
            value instanceof RegExp) {
            return value;
        }
        if (seen.indexOf(value) >= 0) {
            return "[Circular " + getPath(value) + "]";
        }
        // At this point value can be either array or object. Check maximum depth.
        dd++;
        if (dd > depth) {
            return '[Truncated]';
        }
        keys.push(key);
        seen.push(value);
        nn--; // nn was increased above for primitives.
        if (Object.prototype.toString.apply(value) === '[object Array]') {
            var dst_1 = [];
            for (var i in value) {
                var el = value[i];
                nn++;
                if (nn >= n) {
                    break;
                }
                dst_1.push(fn(el, i, dd));
            }
            return dst_1;
        }
        var dst = {};
        for (key in value) {
            if (!Object.prototype.hasOwnProperty.call(value, key)) {
                continue;
            }
            nn++;
            if (nn >= n) {
                break;
            }
            var val = getAttr(value, key);
            if (val !== undefined) {
                dst[key] = fn(val, key, dd);
            }
        }
        return dst;
    }
    return fn(value);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = truncate;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ErrorStackParser = __webpack_require__(3);
function processor(err, cb) {
    var frames;
    try {
        frames = ErrorStackParser.parse(err);
    }
    catch (err) {
        if (console && console.warn) {
            console.warn('airbrake-js: error-stack-parser failed', err);
        }
        frames = [];
    }
    var backtrace = [];
    for (var _i = 0, frames_1 = frames; _i < frames_1.length; _i++) {
        var frame = frames_1[_i];
        backtrace.push({
            function: frame.functionName || '',
            file: frame.fileName,
            line: frame.lineNumber,
            column: frame.columnNumber,
        });
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
    if (type === '' && msg === '' && backtrace.length === 0) {
        if (console && console.warn) {
            console.warn('airbrake: can not process error', err);
        }
        return;
    }
    cb('stacktracejs', {
        type: type,
        message: msg,
        backtrace: backtrace,
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = processor;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Promise;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var jsonify_notice_1 = __webpack_require__(0);
function report(notice, opts, promise) {
    var url = opts.host + "/api/v3/projects/" + opts.projectId + "/create-notice?key=" + opts.projectKey;
    var payload = jsonify_notice_1.default(notice);
    var req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.send(payload);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var resp = JSON.parse(req.responseText);
            notice.id = resp.id;
            promise.resolve(notice);
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = report;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var jsonify_notice_1 = __webpack_require__(0);
var cbCount = 0;
function report(notice, opts, promise) {
    cbCount++;
    var cbName = 'airbrakeCb' + String(cbCount);
    window[cbName] = function (resp) {
        notice.id = resp.id;
        promise.resolve(notice);
        try {
            delete window[cbName];
        }
        catch (_) {
            window[cbName] = undefined;
        }
    };
    var payload = encodeURIComponent(jsonify_notice_1.default(notice));
    var url = opts.host + "/api/v3/projects/" + opts.projectId + "/create-notice?key=" + opts.projectKey + "&callback=" + cbName + "&body=" + payload;
    var document = window.document;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = url;
    var removeScript = function () { return head.removeChild(script); };
    script.onload = removeScript;
    script.onerror = removeScript;
    head.appendChild(script);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = report;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function detectReporter(opts) {
    var hasXhr = XMLHttpRequest;
    if (!opts.host && hasXhr) {
        return 'compat';
    }
    if (hasXhr) {
        return 'xhr';
    }
    return 'jsonp';
}
exports.detectReporter = detectReporter;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var jsonify_notice_1 = __webpack_require__(0);
function report(notice, opts, promise) {
    var url = opts.host + "/api/v3/projects/" + opts.projectId + "/notices?key=" + opts.projectKey;
    var payload = jsonify_notice_1.default(notice);
    var req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(payload);
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 201) {
            var resp = JSON.parse(req.responseText);
            notice.id = resp.id;
            promise.resolve(notice);
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = report;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
});
//# sourceMappingURL=client.js.map