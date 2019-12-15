/*! eruda v1.4.0 http://eruda.liriliri.io/ */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["eruda"] = factory();
	else
		root["eruda"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 77);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {// Built by eustia.


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.wrap = exports.viewportScale = exports.unique = exports.uniqId = exports.stripHtmlTag = exports.LocalStore = exports.stringify = exports.type = exports.ajax = exports.Url = exports.query = exports.getFileName = exports.trim = exports.rtrim = exports.detectBrowser = exports.toInt = exports.pxToNum = exports.toNum = exports.perfNow = exports.root = exports.orientation = exports.Store = exports.Logger = exports.Emitter = exports.once = exports.partial = undefined;
exports.restArgs = exports.now = exports.nextTick = exports.meta = exports.safeStorage = exports.memStorage = exports.$ = exports.$class = exports.some = exports.concat = exports.$event = exports.delegate = exports.$show = exports.$remove = exports.$property = exports.$offset = exports.$insert = exports.$css = exports.$data = exports.$attr = exports.$safeEls = exports.Select = exports.Enum = exports.Class = exports.toArr = exports.map = exports.evalCss = exports.filter = exports.safeCb = exports.matcher = exports.ltrim = exports.dateFormat = exports.lpad = exports.repeat = exports.loadJs = exports.isRegExp = exports.isNull = exports.isNative = exports.toSrc = exports.isNil = exports.isNaN = exports.isMobile = exports.memoize = exports.isMatch = exports.isErudaEl = exports.isErr = exports.isEl = exports.isCrossOrig = exports.isBool = exports.isEmpty = exports.isStr = exports.contain = exports.values = exports.extendOwn = exports.clone = exports.extend = exports.cookie = exports.defaults = exports.createAssigner = exports.each = exports.isArrLike = exports.isNum = exports.isFn = exports.isDate = exports.safeGet = exports.castPath = exports.isArr = exports.isArgs = exports.objToStr = exports.identity = exports.getObjType = exports.upperFirst = exports.fullUrl = exports.fileSize = exports.escapeRegExp = exports.escapeJsonStr = exports.escape = exports.endWith = exports.optimizeCb = exports.detectOs = exports.isBrowser = exports.toStr = exports.idxOf = exports.clamp = exports.kebabCase = exports.camelCase = exports.splitCase = exports.before = exports.allKeys = exports.noop = exports.SafeMutationObserver = exports.freeze = exports.keys = exports.slice = exports.has = exports.inherits = exports.startWith = exports.isObj = exports.isUndef = exports.last = undefined;

var _stringify = __webpack_require__(33);

var _stringify2 = _interopRequireDefault(_stringify);

var _setImmediate2 = __webpack_require__(120);

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _defineProperty = __webpack_require__(64);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = __webpack_require__(34);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _freeze = __webpack_require__(127);

var _freeze2 = _interopRequireDefault(_freeze);

var _keys2 = __webpack_require__(54);

var _keys3 = _interopRequireDefault(_keys2);

var _create = __webpack_require__(71);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = {};

/* ------------------------------ last ------------------------------ */

var _last = _.last = function () {
    /* Get the last element of array.
     *
     * |Name  |Type |Desc                     |
     * |------|-----|-------------------------|
     * |arr   |array|The array to query       |
     * |return|*    |The last element of array|
     *
     * ```javascript
     * last([1, 2]); // -> 2
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(arr) {
        var len = arr ? arr.length : 0;

        if (len) return arr[len - 1];
    }

    return exports;
}();

/* ------------------------------ isUndef ------------------------------ */

exports.last = _last;
var isUndef = exports.isUndef = _.isUndef = function () {
    /* Check if value is undefined.
     *
     * |Name  |Type   |Desc                      |
     * |------|-------|--------------------------|
     * |val   |*      |Value to check            |
     * |return|boolean|True if value is undefined|
     *
     * ```javascript
     * isUndef(void 0); // -> true
     * isUndef(null); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val) {
        return val === void 0;
    }

    return exports;
}();

/* ------------------------------ isObj ------------------------------ */

var isObj = exports.isObj = _.isObj = function () {
    /* Check if value is the language type of Object.
     *
     * |Name  |Type   |Desc                      |
     * |------|-------|--------------------------|
     * |val   |*      |Value to check            |
     * |return|boolean|True if value is an object|
     *
     * [Language Spec](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
     *
     * ```javascript
     * isObj({}); // -> true
     * isObj([]); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val) {
        var type = typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val);

        return !!val && (type === 'function' || type === 'object');
    }

    return exports;
}();

/* ------------------------------ startWith ------------------------------ */

var startWith = exports.startWith = _.startWith = function () {
    /* Check if string starts with the given target string.
     *
     * |Name  |Type   |Desc                             |
     * |------|-------|---------------------------------|
     * |str   |string |String to search                 |
     * |prefix|string |String prefix                    |
     * |return|boolean|True if string starts with prefix|
     *
     * ```javascript
     * startWith('ab', 'a'); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(str, prefix) {
        return str.indexOf(prefix) === 0;
    }

    return exports;
}();

/* ------------------------------ inherits ------------------------------ */

var inherits = exports.inherits = _.inherits = function () {
    /* Inherit the prototype methods from one constructor into another.
     *
     * |Name      |Type    |Desc       |
     * |----------|--------|-----------|
     * |Class     |function|Child Class|
     * |SuperClass|function|Super Class|
     *
     * ```javascript
     * function People(name)
     * {
     *     this._name = name;
     * }
     * People.prototype = {
     *     getName: function ()
     *     {
     *         return this._name;
     *     }
     * };
     * function Student(name)
     * {
     *     this._name = name;
     * }
     * inherits(Student, People);
     * var s = new Student('RedHood');
     * s.getName(); // -> 'RedHood'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(Class, SuperClass) {
        if (objCreate) return Class.prototype = objCreate(SuperClass.prototype);

        noop.prototype = SuperClass.prototype;
        Class.prototype = new noop();
    }

    var objCreate = _create2.default;

    function noop() {}

    return exports;
}();

/* ------------------------------ has ------------------------------ */

var has = exports.has = _.has = function () {
    /* Checks if key is a direct property.
     *
     * |Name  |Type   |Desc                            |
     * |------|-------|--------------------------------|
     * |obj   |object |Object to query                 |
     * |key   |string |Path to check                   |
     * |return|boolean|True if key is a direct property|
     *
     * ```javascript
     * has({one: 1}, 'one'); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var hasOwnProp = Object.prototype.hasOwnProperty;

    function exports(obj, key) {
        return hasOwnProp.call(obj, key);
    }

    return exports;
}();

/* ------------------------------ slice ------------------------------ */

var slice = exports.slice = _.slice = function () {
    /* Create slice of source array or array-like object.
     *
     * |Name              |Type  |Desc                      |
     * |------------------|------|--------------------------|
     * |array             |array |Array to slice            |
     * |[start=0]         |number|Start position            |
     * |[end=array.length]|number|End position, not included|
     *
     * ```javascript
     * slice([1, 2, 3, 4], 1, 2); // -> [2]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(arr, start, end) {
        var len = arr.length;

        if (start == null) {
            start = 0;
        } else if (start < 0) {
            start = Math.max(len + start, 0);
        } else {
            start = Math.min(start, len);
        }

        if (end == null) {
            end = len;
        } else if (end < 0) {
            end = Math.max(len + end, 0);
        } else {
            end = Math.min(end, len);
        }

        var ret = [];
        while (start < end) {
            ret.push(arr[start++]);
        }return ret;
    }

    return exports;
}();

/* ------------------------------ keys ------------------------------ */

var keys = exports.keys = _.keys = function (exports) {
    /* Create an array of the own enumerable property names of object.
     *
     * |Name  |Type  |Desc                   |
     * |------|------|-----------------------|
     * |obj   |object|Object to query        |
     * |return|array |Array of property names|
     * 
     * ```javascript
     * keys({a: 1}); // -> ['a']
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * has 
     */

    exports = _keys3.default || function (obj) {
        var ret = [],
            key;

        for (key in obj) {
            if (has(obj, key)) ret.push(key);
        }

        return ret;
    };

    return exports;
}({});

/* ------------------------------ freeze ------------------------------ */

var freeze = exports.freeze = _.freeze = function () {
    /* Shortcut for Object.freeze.
     *
     * Use Object.defineProperties if Object.freeze is not supported.
     * 
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |obj   |object|Object to freeze|
     * |return|object|Object passed in|
     * 
     * ```javascript
     * var a = {b: 1};
     * freeze(a);
     * a.b = 2;
     * console.log(a); // -> {b: 1}
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * keys 
     */

    function exports(obj) {
        if (_freeze2.default) return (0, _freeze2.default)(obj);

        keys(obj).forEach(function (prop) {
            if (!(0, _getOwnPropertyDescriptor2.default)(obj, prop).configurable) return;

            (0, _defineProperty2.default)(obj, prop, {
                writable: false,
                configurable: false
            });
        });

        return obj;
    }

    return exports;
}();

/* ------------------------------ SafeMutationObserver ------------------------------ */

var SafeMutationObserver = exports.SafeMutationObserver = _.SafeMutationObserver = function (exports) {
    /* Safe MutationObserver, does nothing if MutationObserver is not supported.
     * 
     * ```javascript
     * var observer = new DomObserver(function (mutations) 
     * {
     *     // Do something.     
     * });
     * observer.observe(document.htmlElement);
     * observer.disconnect();
     * ```
     */

    exports = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    if (!exports) {
        exports = function () {
            function MutationObserver() {
                (0, _classCallCheck3.default)(this, MutationObserver);
            }

            (0, _createClass3.default)(MutationObserver, [{
                key: 'observe',
                value: function observe() {}
            }, {
                key: 'disconnect',
                value: function disconnect() {}
            }, {
                key: 'takeRecords',
                value: function takeRecords() {}
            }]);
            return MutationObserver;
        }();
    }

    return exports;
}({});

/* ------------------------------ noop ------------------------------ */

var noop = exports.noop = _.noop = function () {
    /* A no-operation function.
     *
     * ```javascript
     * noop(); // Does nothing
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports() {}

    return exports;
}();

/* ------------------------------ allKeys ------------------------------ */

var allKeys = exports.allKeys = _.allKeys = function () {
    /* Retrieve all the names of object's own and inherited properties.
     *
     * |Name  |Type  |Desc                       |
     * |------|------|---------------------------|
     * |obj   |object|Object to query            |
     * |return|array |Array of all property names|
     *
     * > Members of Object's prototype won't be retrieved.
     *
     * ```javascript
     * var obj = Object.create({zero: 0});
     * obj.one = 1;
     * allKeys(obj) // -> ['zero', 'one']
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(obj) {
        var ret = [],
            key;

        for (key in obj) {
            ret.push(key);
        }return ret;
    }

    return exports;
}();

/* ------------------------------ before ------------------------------ */

var before = exports.before = _.before = function () {
    /* Create a function that invokes less than n times.
     *
     * |Name  |Type    |Desc                                            |
     * |------|--------|------------------------------------------------|
     * |n     |number  |Number of calls at which fn is no longer invoked|
     * |fn    |function|Function to restrict                            |
     * |return|function|New restricted function                         |
     *
     * Subsequent calls to the created function return the result of the last fn invocation.
     *
     * ```javascript
     * $(element).on('click', before(5, function() {}));
     * // -> allow function to be call 4 times at last.
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(n, fn) {
        var memo;

        return function () {
            if (--n > 0) memo = fn.apply(this, arguments);
            if (n <= 1) fn = null;

            return memo;
        };
    }

    return exports;
}();

/* ------------------------------ splitCase ------------------------------ */

var splitCase = exports.splitCase = _.splitCase = function () {
    /* Split different string case to an array.
     *
     * |Name  |Type  |Desc           |
     * |------|------|---------------|
     * |str   |string|String to split|
     * |return|array |Result array   |
     *
     * ```javascript
     * splitCase('foo-bar'); // -> ['foo', 'bar']
     * splitCase('foo bar'); // -> ['foo', 'bar']
     * splitCase('foo_bar'); // -> ['foo', 'bar']
     * splitCase('foo.bar'); // -> ['foo', 'bar']
     * splitCase('fooBar'); // -> ['foo', 'bar']
     * splitCase('foo-Bar'); // -> ['foo', 'bar']
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var regUpperCase = /([A-Z])/g,
        regSeparator = /[_.\- ]+/g,
        regTrim = /(^-)|(-$)/g;

    function exports(str) {
        str = str.replace(regUpperCase, '-$1').toLowerCase().replace(regSeparator, '-').replace(regTrim, '');

        return str.split('-');
    }

    return exports;
}();

/* ------------------------------ camelCase ------------------------------ */

var camelCase = exports.camelCase = _.camelCase = function () {
    /* Convert string to "camelCase".
     *
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |str   |string|String to convert |
     * |return|string|Camel cased string|
     *
     * ```javascript
     * camelCase('foo-bar'); // -> fooBar
     * camelCase('foo bar'); // -> fooBar
     * camelCase('foo_bar'); // -> fooBar
     * camelCase('foo.bar'); // -> fooBar
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * splitCase 
     */

    function exports(str) {
        var arr = splitCase(str);

        var ret = arr[0];
        arr.shift();

        arr.forEach(capitalize, arr);
        ret += arr.join('');

        return ret;
    }

    function capitalize(val, idx) {
        this[idx] = val.replace(/\w/, function (match) {
            return match.toUpperCase();
        });
    }

    return exports;
}();

/* ------------------------------ kebabCase ------------------------------ */

var kebabCase = exports.kebabCase = _.kebabCase = function () {
    /* Convert string to "kebabCase".
     *
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |str   |string|String to convert |
     * |return|string|Kebab cased string|
     *
     * ```javascript
     * kebabCase('fooBar'); // -> foo-bar
     * kebabCase('foo bar'); // -> foo-bar
     * kebabCase('foo_bar'); // -> foo-bar
     * kebabCase('foo.bar'); // -> foo-bar
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * splitCase 
     */

    function exports(str) {
        return splitCase(str).join('-');
    }

    return exports;
}();

/* ------------------------------ clamp ------------------------------ */

var clamp = exports.clamp = _.clamp = function () {
    /* Clamp number within the inclusive lower and upper bounds.
     *
     * |Name   |Type  |Desc           |
     * |-------|------|---------------|
     * |n      |number|Number to clamp|
     * |[lower]|number|Lower bound    |
     * |upper  |number|Upper bound    |
     * |return |number|Clamped number |
     *
     * ```javascript
     * clamp(-10, -5, 5); // -> -5
     * clamp(10, -5, 5); // -> 5
     * clamp(2, -5, 5); // -> 2
     * clamp(10, 5); // -> 5
     * clamp(2, 5); // -> 2
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isUndef 
     */

    function exports(n, lower, upper) {
        if (isUndef(upper)) {
            upper = lower;
            lower = undefined;
        }

        if (!isUndef(lower) && n < lower) return lower;

        if (n > upper) return upper;

        return n;
    }

    return exports;
}();

/* ------------------------------ idxOf ------------------------------ */

var idxOf = exports.idxOf = _.idxOf = function () {
    /* Get the index at which the first occurrence of value.
     *
     * |Name       |Type  |Desc                |
     * |-----------|------|--------------------|
     * |arr        |array |Array to search     |
     * |val        |*     |Value to search for |
     * |[fromIdx=0]|number|Index to search from|
     *
     * ```javascript
     * idxOf([1, 2, 1, 2], 2, 2); // -> 3
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(arr, val, fromIdx) {
        return Array.prototype.indexOf.call(arr, val, fromIdx);
    }

    return exports;
}();

/* ------------------------------ toStr ------------------------------ */

var toStr = exports.toStr = _.toStr = function () {
    /* Convert value to a string.
     *
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |val   |*     |Value to convert|
     * |return|string|Resulted string |
     *
     * ```javascript
     * toStr(null); // -> ''
     * toStr(1); // -> '1'
     * toStr(false); // -> 'false'
     * toStr([1, 2, 3]); // -> '1,2,3'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val) {
        return val == null ? '' : val.toString();
    }

    return exports;
}();

/* ------------------------------ isBrowser ------------------------------ */

var isBrowser = exports.isBrowser = _.isBrowser = function (exports) {
    /* Check if running in a browser.
     *
     * ```javascript
     * console.log(isBrowser); // -> true if running in a browser
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    exports = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' && (typeof document === 'undefined' ? 'undefined' : (0, _typeof3.default)(document)) === 'object' && document.nodeType === 9;

    return exports;
}({});

/* ------------------------------ detectOs ------------------------------ */

var detectOs = exports.detectOs = _.detectOs = function () {
    /* Detect operating system using ua.
     * 
     * |Name                    |Type  |Desc                 |
     * |------------------------|------|---------------------|
     * |[ua=navigator.userAgent]|string|Browser userAgent    |
     * |return                  |string|Operating system name|
     * 
     * Supported os: windows, os x, linux, ios, android, windows phone
     * 
     * ```javascript
     * if (detectOs() === 'ios') 
     * {
     *     // Do something about ios...
     * }
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isBrowser 
     */

    function exports(ua) {
        ua = ua || (isBrowser ? navigator.userAgent : '');

        ua = ua.toLowerCase();

        if (detect('windows phone')) return 'windows phone';
        if (detect('win')) return 'windows';
        if (detect('android')) return 'android';
        if (detect('ipad') || detect('iphone') || detect('ipod')) return 'ios';
        if (detect('mac')) return 'os x';
        if (detect('linux')) return 'linux';

        function detect(keyword) {
            return ua.indexOf(keyword) > -1;
        }

        return 'unknown';
    }

    return exports;
}();

/* ------------------------------ optimizeCb ------------------------------ */

var optimizeCb = exports.optimizeCb = _.optimizeCb = function () {
    /* Used for function context binding.
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isUndef 
     */

    function exports(fn, ctx, argCount) {
        if (isUndef(ctx)) return fn;

        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function (val) {
                    return fn.call(ctx, val);
                };
            case 3:
                return function (val, idx, collection) {
                    return fn.call(ctx, val, idx, collection);
                };
            case 4:
                return function (accumulator, val, idx, collection) {
                    return fn.call(ctx, accumulator, val, idx, collection);
                };
        }

        return function () {
            return fn.apply(ctx, arguments);
        };
    }

    return exports;
}();

/* ------------------------------ endWith ------------------------------ */

var endWith = exports.endWith = _.endWith = function () {
    /* Check if string ends with the given target string.
     *
     * |Name  |Type   |Desc                           |
     * |------|-------|-------------------------------|
     * |str   |string |The string to search           |
     * |suffix|string |String suffix                  |
     * |return|boolean|True if string ends with target|
     *
     * ```javascript
     * endWith('ab', 'b'); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(str, suffix) {
        var idx = str.length - suffix.length;

        return idx >= 0 && str.indexOf(suffix, idx) === idx;
    }

    return exports;
}();

/* ------------------------------ escape ------------------------------ */

var escape = exports.escape = _.escape = function () {
    /* Escapes a string for insertion into HTML, replacing &, <, >, ", `, and ' characters.
     *
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |str   |string|String to escape|
     * |return|string|Escaped string  |
     *
     * ```javascript
     * escape('You & Me'); -> // -> 'You &amp; Me'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * keys 
     */

    function exports(str) {
        return regTest.test(str) ? str.replace(regReplace, replaceFn) : str;
    }

    var map = exports.map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#x27;',
        '`': '&#x60;'
    };

    var regSrc = '(?:' + keys(map).join('|') + ')',
        regTest = new RegExp(regSrc),
        regReplace = new RegExp(regSrc, 'g');

    function replaceFn(match) {
        return map[match];
    }

    return exports;
}();

/* ------------------------------ escapeJsonStr ------------------------------ */

var escapeJsonStr = exports.escapeJsonStr = _.escapeJsonStr = function () {
    function exports(str) {
        return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\f|\n|\r|\t/g, '');
    }

    return exports;
}();

/* ------------------------------ escapeRegExp ------------------------------ */

var escapeRegExp = exports.escapeRegExp = _.escapeRegExp = function () {
    /* Escape special chars to be used as literals in RegExp constructors.
     *
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |str   |string|String to escape|
     * |return|string|Escaped string  |
     *
     * ```javascript
     * escapeRegExp('[eris]'); // -> '\\[eris\\]'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(str) {
        return str.replace(/\W/g, '\\$&');
    }

    return exports;
}();

/* ------------------------------ fileSize ------------------------------ */

var fileSize = exports.fileSize = _.fileSize = function () {
    /* Turn bytes into human readable file size.
     * 
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |bytes |number|File bytes        |
     * |return|string|Readable file size|
     * 
     * ```javascript
     * fileSize(5); // -> '5'
     * fileSize(1500); // -> '1.46K'
     * fileSize(1500000); // -> '1.43M'
     * fileSize(1500000000); // -> '1.4G'
     * fileSize(1500000000000); // -> '1.36T'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(bytes) {
        if (bytes <= 0) return '0';

        var suffixIdx = Math.floor(Math.log(bytes) / Math.log(1024)),
            val = bytes / Math.pow(2, suffixIdx * 10);

        return +val.toFixed(2) + suffixList[suffixIdx];
    }

    var suffixList = ['', 'K', 'M', 'G', 'T'];

    return exports;
}();

/* ------------------------------ fullUrl ------------------------------ */

var fullUrl = exports.fullUrl = _.fullUrl = function () {
    /* dependencies
     * startWith 
     */

    var origin = window.location.origin;

    function exports(url) {
        if (startWith(url, 'http')) return url;

        if (!startWith(url, '/')) url = '/' + url;

        return origin + url;
    }

    return exports;
}();

/* ------------------------------ upperFirst ------------------------------ */

var upperFirst = exports.upperFirst = _.upperFirst = function () {
    /* Convert the first character of string to upper case.
     *
     * |Name  |Type  |Desc             |
     * |------|------|-----------------|
     * |str   |string|String to convert|
     * |return|string|Converted string |
     *
     * ```javascript
     * upperFirst('red'); // -> Red
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(str) {
        if (str.length < 1) return str;

        return str[0].toUpperCase() + str.slice(1);
    }

    return exports;
}();

/* ------------------------------ getObjType ------------------------------ */

var getObjType = exports.getObjType = _.getObjType = function () {
    /* dependencies
     * upperFirst 
     */

    function exports(obj) {
        if (obj.constructor && obj.constructor.name) return obj.constructor.name;

        return upperFirst({}.toString.call(obj).replace(/(\[object )|]/g, ''));
    }

    return exports;
}();

/* ------------------------------ identity ------------------------------ */

var identity = exports.identity = _.identity = function () {
    /* Return the first argument given.
     *
     * |Name  |Type|Desc       |
     * |------|----|-----------|
     * |val   |*   |Any value  |
     * |return|*   |Given value|
     *
     * ```javascript
     * identity('a'); // -> 'a'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val) {
        return val;
    }

    return exports;
}();

/* ------------------------------ objToStr ------------------------------ */

var objToStr = exports.objToStr = _.objToStr = function () {
    /* Alias of Object.prototype.toString.
     *
     * |Name  |Type  |Desc                                |
     * |------|------|------------------------------------|
     * |value |*     |Source value                        |
     * |return|string|String representation of given value|
     * 
     * ```javascript
     * objToStr(5); // -> '[object Number]'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var ObjToStr = Object.prototype.toString;

    function exports(val) {
        return ObjToStr.call(val);
    }

    return exports;
}();

/* ------------------------------ isArgs ------------------------------ */

var isArgs = exports.isArgs = _.isArgs = function () {
    /* Check if value is classified as an arguments object.
     *
     * |Name  |Type   |Desc                                |
     * |------|-------|------------------------------------|
     * |value |*      |Value to check                      |
     * |return|boolean|True if value is an arguments object|
     *
     * ```javascript
     * (function () {
     *     isArgs(arguments); // -> true
     * })();
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val) {
        return objToStr(val) === '[object Arguments]';
    }

    return exports;
}();

/* ------------------------------ isArr ------------------------------ */

var isArr = exports.isArr = _.isArr = function (exports) {
    /* Check if value is an `Array` object.
     *
     * |Name  |Type   |Desc                              |
     * |------|-------|----------------------------------|
     * |val   |*      |The value to check                |
     * |return|boolean|True if value is an `Array` object|
     *
     * ```javascript
     * isArr([]); // -> true
     * isArr({}); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    exports = Array.isArray || function (val) {
        return objToStr(val) === '[object Array]';
    };

    return exports;
}({});

/* ------------------------------ castPath ------------------------------ */

var castPath = exports.castPath = _.castPath = function () {
    /* Cast value into a property path array.
     *
     * |Name  |Type  |Desc               |
     * |------|------|-------------------|
     * |str   |*     |Value to inspect   |
     * |[obj] |object|Object to query    |
     * |return|array |Property path array|
     * 
     * ```javascript
     * castPath('a.b.c'); // -> ['a', 'b', 'c']
     * castPath(['a']); // -> ['a']
     * castPath('a[0].b'); // -> ['a', '0', 'b']
     * castPath('a.b.c', {'a.b.c': true}); // -> ['a.b.c']
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * has isArr 
     */

    function exports(str, obj) {
        if (isArr(str)) return str;
        if (obj && has(obj, str)) return [str];

        var ret = [];

        str.replace(regPropName, function (match, number, quote, str) {
            ret.push(quote ? str.replace(regEscapeChar, '$1') : number || match);
        });

        return ret;
    }

    // Lodash _stringToPath
    var regPropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        regEscapeChar = /\\(\\)?/g;

    return exports;
}();

/* ------------------------------ safeGet ------------------------------ */

var safeGet = exports.safeGet = _.safeGet = function () {
    /* Get object property, don't throw undefined error.
     *
     * |Name  |Type        |Desc                     |
     * |------|------------|-------------------------|
     * |obj   |object      |Object to query          |
     * |path  |array string|Path of property to get  |
     * |return|*           |Target value or undefined|
     *
     * ```javascript
     * var obj = {a: {aa: {aaa: 1}}};
     * safeGet(obj, 'a.aa.aaa'); // -> 1
     * safeGet(obj, ['a', 'aa']); // -> {aaa: 1}
     * safeGet(obj, 'a.b'); // -> undefined
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isUndef castPath 
     */

    function exports(obj, path) {
        path = castPath(path, obj);

        var prop;

        /* eslint-disable no-cond-assign */
        while (prop = path.shift()) {
            obj = obj[prop];
            if (isUndef(obj)) return;
        }

        return obj;
    }

    return exports;
}();

/* ------------------------------ isDate ------------------------------ */

var isDate = exports.isDate = _.isDate = function () {
    /* Check if value is classified as a Date object.
     *
     * |Name  |Type   |Desc                          |
     * |------|-------|------------------------------|
     * |val   |*      |value to check                |
     * |return|boolean|True if value is a Date object|
     *
     * ```javascript
     * isDate(new Date()); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val) {
        return objToStr(val) === '[object Date]';
    }

    return exports;
}();

/* ------------------------------ isFn ------------------------------ */

var isFn = exports.isFn = _.isFn = function () {
    /* Check if value is a function.
     *
     * |Name  |Type   |Desc                       |
     * |------|-------|---------------------------|
     * |val   |*      |Value to check             |
     * |return|boolean|True if value is a function|
     *
     * Generator function is also classified as true.
     *
     * ```javascript
     * isFn(function() {}); // -> true
     * isFn(function*() {}); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val) {
        var objStr = objToStr(val);

        return objStr === '[object Function]' || objStr === '[object GeneratorFunction]';
    }

    return exports;
}();

/* ------------------------------ isNum ------------------------------ */

var isNum = exports.isNum = _.isNum = function () {
    /* Check if value is classified as a Number primitive or object.
     *
     * |Name  |Type   |Desc                                 |
     * |------|-------|-------------------------------------|
     * |value |*      |Value to check                       |
     * |return|boolean|True if value is correctly classified|
     * 
     * ```javascript
     * isNum(5); // -> true
     * isNum(5.1); // -> true
     * isNum({}); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val) {
        return objToStr(val) === '[object Number]';
    }

    return exports;
}();

/* ------------------------------ isArrLike ------------------------------ */

var isArrLike = exports.isArrLike = _.isArrLike = function () {
    /* Check if value is array-like.
     *
     * |Name  |Type   |Desc                       |
     * |------|-------|---------------------------|
     * |value |*      |Value to check             |
     * |return|boolean|True if value is array like|
     *
     * > Function returns false.
     *
     * ```javascript
     * isArrLike('test'); // -> true
     * isArrLike(document.body.children); // -> true;
     * isArrLike([1, 2, 3]); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isNum isFn 
     */

    var MAX_ARR_IDX = Math.pow(2, 53) - 1;

    function exports(val) {
        if (!val) return false;

        var len = val.length;

        return isNum(len) && len >= 0 && len <= MAX_ARR_IDX && !isFn(val);
    }

    return exports;
}();

/* ------------------------------ each ------------------------------ */

var _each = _.each = function () {
    /* Iterate over elements of collection and invokes iteratee for each element.
     *
     * |Name    |Type        |Desc                          |
     * |--------|------------|------------------------------|
     * |obj     |object array|Collection to iterate over    |
     * |iteratee|function    |Function invoked per iteration|
     * |[ctx]   |*           |Function context              |
     *
     * ```javascript
     * each({'a': 1, 'b': 2}, function (val, key) {});
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isArrLike keys optimizeCb 
     */

    function exports(obj, iteratee, ctx) {
        iteratee = optimizeCb(iteratee, ctx);

        var i, len;

        if (isArrLike(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var _keys = keys(obj);
            for (i = 0, len = _keys.length; i < len; i++) {
                iteratee(obj[_keys[i]], _keys[i], obj);
            }
        }

        return obj;
    }

    return exports;
}();

/* ------------------------------ createAssigner ------------------------------ */

exports.each = _each;
var createAssigner = exports.createAssigner = _.createAssigner = function () {
    /* Used to create extend, extendOwn and defaults.
     *
     * |Name    |Type    |Desc                          |
     * |--------|--------|------------------------------|
     * |keysFn  |function|Function to get object keys   |
     * |defaults|boolean |No override when set to true  |
     * |return  |function|Result function, extend...    |
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isUndef each 
     */

    function exports(keysFn, defaults) {
        return function (obj) {
            _each(arguments, function (src, idx) {
                if (idx === 0) return;

                var keys = keysFn(src);

                _each(keys, function (key) {
                    if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                });
            });

            return obj;
        };
    }

    return exports;
}();

/* ------------------------------ defaults ------------------------------ */

var defaults = exports.defaults = _.defaults = function (exports) {
    /* Fill in undefined properties in object with the first value present in the following list of defaults objects.
     *
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |obj   |object|Destination object|
     * |*src  |object|Sources objects   |
     * |return|object|Destination object|
     *
     * ```javascript
     * defaults({name: 'RedHood'}, {name: 'Unknown', age: 24}); // -> {name: 'RedHood', age: 24}
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * createAssigner allKeys 
     */

    exports = createAssigner(allKeys, true);

    return exports;
}({});

/* ------------------------------ cookie ------------------------------ */

var cookie = exports.cookie = _.cookie = function (exports) {
    /* Simple api for handling browser cookies.
     *
     * ### get
     *
     * Get cookie value.
     *
     * |Name  |Type  |Desc                      |
     * |------|------|--------------------------|
     * |key   |string|Cookie key                |
     * |return|string|Corresponding cookie value|
     *
     * ### set
     *
     * Set cookie value.
     *
     * |Name     |Type   |Desc          |
     * |---------|-------|--------------|
     * |key      |string |Cookie key    |
     * |val      |string |Cookie value  |
     * |[options]|object |Cookie options|
     * |return   |exports|Module cookie |
     *
     * ### remove
     *
     * Remove cookie value.
     *
     * |Name     |Type   |Desc          |
     * |---------|-------|--------------|
     * |key      |string |Cookie key    |
     * |[options]|object |Cookie options|
     * |return   |exports|Module cookie |
     *
     * ```javascript
     * cookie.set('a', '1', {path: '/'});
     * cookie.get('a'); // -> '1'
     * cookie.remove('a');
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * defaults isNum isUndef 
     */

    var defOpts = { path: '/' };

    function setCookie(key, val, options) {
        if (!isUndef(val)) {
            options = options || {};
            options = defaults(options, defOpts);

            if (isNum(options.expires)) {
                var expires = new Date();
                expires.setMilliseconds(expires.getMilliseconds() + options.expires * 864e+5);
                options.expires = expires;
            }

            val = encodeURIComponent(val);
            key = encodeURIComponent(key);

            document.cookie = [key, '=', val, options.expires && '; expires=' + options.expires.toUTCString(), options.path && '; path=' + options.path, options.domain && '; domain=' + options.domain, options.secure ? '; secure' : ''].join('');

            return exports;
        }

        var cookies = document.cookie ? document.cookie.split('; ') : [],
            result = key ? undefined : {};

        for (var i = 0, len = cookies.length; i < len; i++) {
            var c = cookies[i],
                parts = c.split('='),
                name = decodeURIComponent(parts.shift());

            c = parts.join('=');
            c = decodeURIComponent(c);

            if (key === name) {
                result = c;
                break;
            }

            if (!key) result[name] = c;
        }

        return result;
    }

    exports = {
        get: setCookie,
        set: setCookie,
        remove: function remove(key, options) {
            options = options || {};
            options.expires = -1;

            return setCookie(key, '', options);
        }
    };

    return exports;
}({});

/* ------------------------------ extend ------------------------------ */

var extend = exports.extend = _.extend = function (exports) {
    /* Copy all of the properties in the source objects over to the destination object.
     *
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |obj   |object|Destination object|
     * |...src|object|Sources objects   |
     * |return|object|Destination object|
     *
     * ```javascript
     * extend({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * createAssigner allKeys 
     */

    exports = createAssigner(allKeys);

    return exports;
}({});

/* ------------------------------ clone ------------------------------ */

var clone = exports.clone = _.clone = function () {
    /* Create a shallow-copied clone of the provided plain object.
     *
     * Any nested objects or arrays will be copied by reference, not duplicated.
     *
     * |Name  |Type|Desc          |
     * |------|----|--------------|
     * |val   |*   |Value to clone|
     * |return|*   |Cloned value  |
     *
     * ```javascript
     * clone({name: 'eustia'}); // -> {name: 'eustia'}
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isObj isArr extend 
     */

    function exports(obj) {
        if (!isObj(obj)) return obj;

        return isArr(obj) ? obj.slice() : extend({}, obj);
    }

    return exports;
}();

/* ------------------------------ extendOwn ------------------------------ */

var extendOwn = exports.extendOwn = _.extendOwn = function (exports) {
    /* Like extend, but only copies own properties over to the destination object.
     *
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |obj   |object|Destination object|
     * |*src  |object|Sources objects   |
     * |return|object|Destination object|
     *
     * ```javascript
     * extendOwn({name: 'RedHood'}, {age: 24}); // -> {name: 'RedHood', age: 24}
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * keys createAssigner 
     */

    exports = createAssigner(keys);

    return exports;
}({});

/* ------------------------------ values ------------------------------ */

var values = exports.values = _.values = function () {
    /* Create an array of the own enumerable property values of object.
     *
     * |Name  |Type  |Desc                    |
     * |------|------|------------------------|
     * |obj   |object|Object to query         |
     * |return|array |Array of property values|
     *
     * ```javascript
     * values({one: 1, two: 2}); // -> [1, 2]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * each 
     */

    function exports(obj) {
        var ret = [];

        _each(obj, function (val) {
            ret.push(val);
        });

        return ret;
    }

    return exports;
}();

/* ------------------------------ contain ------------------------------ */

var contain = exports.contain = _.contain = function () {
    /* Check if the value is present in the list.
     *
     * |Name  |Type        |Desc                                |
     * |------|------------|------------------------------------|
     * |array |array object|Target list                         |
     * |value |*           |Value to check                      |
     * |return|boolean     |True if value is present in the list|
     *
     * ```javascript
     * contain([1, 2, 3], 1); // -> true
     * contain({a: 1, b: 2}, 1); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * idxOf isArrLike values 
     */

    function exports(arr, val) {
        if (!isArrLike(arr)) arr = values(arr);

        return idxOf(arr, val) >= 0;
    }

    return exports;
}();

/* ------------------------------ isStr ------------------------------ */

var isStr = exports.isStr = _.isStr = function () {
    /* Check if value is a string primitive.
     *
     * |Name  |Type   |Desc                               |
     * |------|-------|-----------------------------------|
     * |val   |*      |Value to check                     |
     * |return|boolean|True if value is a string primitive|
     *
     * ```javascript
     * isStr('eris'); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val) {
        return objToStr(val) === '[object String]';
    }

    return exports;
}();

/* ------------------------------ isEmpty ------------------------------ */

var isEmpty = exports.isEmpty = _.isEmpty = function () {
    /* Check if value is an empty object or array.
     *
     * |Name  |Type   |Desc                  |
     * |------|-------|----------------------|
     * |val   |*      |Value to check        |
     * |return|boolean|True if value is empty|
     *
     * ```javascript
     * isEmpty([]); // -> true
     * isEmpty({}); // -> true
     * isEmpty(''); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isArrLike isArr isStr isArgs keys 
     */

    function exports(val) {
        if (val == null) return true;

        if (isArrLike(val) && (isArr(val) || isStr(val) || isArgs(val))) {
            return val.length === 0;
        }

        return keys(val).length === 0;
    }

    return exports;
}();

/* ------------------------------ isBool ------------------------------ */

var isBool = exports.isBool = _.isBool = function () {
    /* Check if value is a boolean primitive.
     *
     * |Name  |Type   |Desc                      |
     * |------|-------|--------------------------|
     * |val   |*      |Value to check            |
     * |return|boolean|True if value is a boolean|
     *
     * ```javascript
     * isBool(true); // -> true
     * isBool(false); // -> true
     * isBool(1); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val) {
        return val === true || val === false;
    }

    return exports;
}();

/* ------------------------------ isCrossOrig ------------------------------ */

var isCrossOrig = exports.isCrossOrig = _.isCrossOrig = function () {
    /* dependencies
     * startWith 
     */

    var origin = window.location.origin;

    function exports(url) {
        return !startWith(url, origin);
    }

    return exports;
}();

/* ------------------------------ isEl ------------------------------ */

var isEl = exports.isEl = _.isEl = function () {
    /* Check if value is a DOM element.
     *
     * |Name  |Type   |Desc                          |
     * |------|-------|------------------------------|
     * |val   |*      |Value to check                |
     * |return|boolean|True if value is a DOM element|
     *
     * ```javascript
     * isEl(document.body); // -> true
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    function exports(val) {
        return !!(val && val.nodeType === 1);
    }

    return exports;
}();

/* ------------------------------ isErr ------------------------------ */

var isErr = exports.isErr = _.isErr = function () {
    /* Check if value is an error.
     *
     * |Name  |Type   |Desc                     |
     * |------|-------|-------------------------|
     * |val   |*      |Value to check           |
     * |return|boolean|True if value is an error|
     *
     * ```javascript
     * isErr(new Error()); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val) {
        return objToStr(val) === '[object Error]';
    }

    return exports;
}();

/* ------------------------------ isErudaEl ------------------------------ */

var isErudaEl = exports.isErudaEl = _.isErudaEl = function () {
    function exports(el) {
        var parentNode = el.parentNode;

        if (!parentNode) return false;

        while (parentNode) {
            parentNode = parentNode.parentNode;
            if (parentNode && parentNode.id === 'eruda') return true;
        }

        return false;
    }

    return exports;
}();

/* ------------------------------ isMatch ------------------------------ */

var isMatch = exports.isMatch = _.isMatch = function () {
    /* Check if keys and values in src are contained in obj.
     *
     * |Name  |Type   |Desc                              |
     * |------|-------|----------------------------------|
     * |obj   |object |Object to inspect                 |
     * |src   |object |Object of property values to match|
     * |return|boolean|True if object is match           |
     *
     * ```javascript
     * isMatch({a: 1, b: 2}, {a: 1}); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * keys 
     */

    function exports(obj, src) {
        var _keys = keys(src),
            len = _keys.length;

        if (obj == null) return !len;

        obj = Object(obj);

        for (var i = 0; i < len; i++) {
            var key = _keys[i];
            if (src[key] !== obj[key] || !(key in obj)) return false;
        }

        return true;
    }

    return exports;
}();

/* ------------------------------ memoize ------------------------------ */

var memoize = exports.memoize = _.memoize = function () {
    /* Memoize a given function by caching the computed result.
     *
     * |Name    |Type    |Desc                                |
     * |--------|--------|------------------------------------|
     * |fn      |function|Function to have its output memoized|
     * |[hashFn]|function|Function to create cache key        |
     * |return  |function|New memoized function               |
     *
     * ```javascript
     * var fibonacci = memoize(function(n)
     * {
     *     return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
     * });
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * has 
     */

    function exports(fn, hashFn) {
        var memoize = function memoize(key) {
            var cache = memoize.cache,
                address = '' + (hashFn ? hashFn.apply(this, arguments) : key);

            if (!has(cache, address)) cache[address] = fn.apply(this, arguments);

            return cache[address];
        };

        memoize.cache = {};

        return memoize;
    }

    return exports;
}();

/* ------------------------------ isMobile ------------------------------ */

var isMobile = exports.isMobile = _.isMobile = function (exports) {
    /* Check whether client is using a mobile browser using ua.
     *
     * |Name                    |Type   |Desc                                 |
     * |------------------------|-------|-------------------------------------|
     * |[ua=navigator.userAgent]|string |User agent                           |
     * |return                  |boolean|True if ua belongs to mobile browsers|
     *
     * ```javascript
     * isMobile(navigator.userAgent);
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isBrowser memoize 
     */

    var regMobileAll = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        regMobileFour = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i;

    exports = memoize(function (ua) {
        ua = ua || (isBrowser ? navigator.userAgent : '');

        return regMobileAll.test(ua) || regMobileFour.test(ua.substr(0, 4));
    });

    return exports;
}({});

/* ------------------------------ isNaN ------------------------------ */

var isNaN = exports.isNaN = _.isNaN = function () {
    /* Check if value is an NaN.
     *
     * |Name  |Type   |Desc                   |
     * |------|-------|-----------------------|
     * |val   |*      |Value to check         |
     * |return|boolean|True if value is an NaN|
     *
     * Undefined is not an NaN, different from global isNaN function.
     *
     * ```javascript
     * isNaN(0); // -> false
     * isNaN(NaN); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isNum 
     */

    function exports(val) {
        return isNum(val) && val !== +val;
    }

    return exports;
}();

/* ------------------------------ isNil ------------------------------ */

var isNil = exports.isNil = _.isNil = function () {
    /* Check if value is null or undefined, the same as value == null.
     * 
     * |Name  |Type   |Desc                              |
     * |------|-------|----------------------------------|
     * |value |*      |Value to check                    |
     * |return|boolean|True if value is null or undefined|
     * 
     * ```javascript
     * isNil(null); // -> true
     * isNil(void 0); // -> true
     * isNil(undefined); // -> true
     * isNil(false); // -> false
     * isNil(0); // -> false
     * isNil([]); // -> false
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val) {
        return val == null;
    }

    return exports;
}();

/* ------------------------------ toSrc ------------------------------ */

var toSrc = exports.toSrc = _.toSrc = function () {
    /* Convert function to its source code.
     * 
     * |Name  |Type    |Desc               |
     * |------|--------|-------------------|
     * |fn    |function|Function to convert|
     * |return|string  |Source code        |
     * 
     * ```javascript
     * toSrc(Math.min); // -> 'function min() { [native code] }'
     * toSrc(function () {}) // -> 'function () { }'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isNil 
     */

    function exports(fn) {
        if (isNil(fn)) return '';

        try {
            return fnToStr.call(fn);
            /* eslint-disable no-empty */
        } catch (e) {}

        try {
            return fn + '';
            /* eslint-disable no-empty */
        } catch (e) {}

        return '';
    }

    var fnToStr = Function.prototype.toString;

    return exports;
}();

/* ------------------------------ isNative ------------------------------ */

var isNative = exports.isNative = _.isNative = function () {
    /* Check if value is a native function.
     * 
     * |Name  |Type   |Desc                              |
     * |------|-------|----------------------------------|
     * |value |*      |Value to check                    |
     * |return|boolean|True if value is a native function|
     * 
     * ```javascript
     * isNative(function () {}); // -> false
     * isNative(Math.min); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isObj isFn has toSrc 
     */

    function exports(val) {
        if (!isObj(val)) return false;

        if (isFn(val)) return regIsNative.test(toSrc(val));

        // Detect host constructors (Safari > 4; really typed array specific)
        return regIsHostCtor.test(toSrc(val));
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var regIsNative = new RegExp('^' + toSrc(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

    var regIsHostCtor = /^\[object .+?Constructor\]$/;

    return exports;
}();

/* ------------------------------ isNull ------------------------------ */

var isNull = exports.isNull = _.isNull = function () {
    /* Check if value is an Null.
     *
     * |Name  |Type   |Desc                    |
     * |------|-------|------------------------|
     * |value |*      |Value to check          |
     * |return|boolean|True if value is an Null|
     *
     * ```javascript
     * isNull(null); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(val) {
        return val === null;
    }

    return exports;
}();

/* ------------------------------ isRegExp ------------------------------ */

var isRegExp = exports.isRegExp = _.isRegExp = function () {
    /* Check if value is a regular expression.
     *
     * |Name  |Type   |Desc                                 |
     * |------|-------|-------------------------------------|
     * |val   |*      |Value to check                       |
     * |return|boolean|True if value is a regular expression|
     *
     * ```javascript
     * isRegExp(/a/); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr 
     */

    function exports(val) {
        return objToStr(val) === '[object RegExp]';
    }

    return exports;
}();

/* ------------------------------ loadJs ------------------------------ */

var loadJs = exports.loadJs = _.loadJs = function () {
    /* Inject script tag into page with given src value.
     *
     * |Name|Type    |Desc           |
     * |----|--------|---------------|
     * |src |string  |Script source  |
     * |cb  |function|Onload callback|
     *
     * ```javascript
     * loadJs('main.js', function ()
     * {
     *     // Do something...
     * });
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    function exports(src, cb) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = function () {
            var isNotLoaded = script.readyState && script.readyState != 'complete' && script.readyState != 'loaded';

            cb && cb(!isNotLoaded);
        };
        document.body.appendChild(script);
    }

    return exports;
}();

/* ------------------------------ repeat ------------------------------ */

var repeat = exports.repeat = _.repeat = function (exports) {
    /* Repeat string n-times.
     *
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |str   |string|String to repeat|
     * |n     |number|Repeat times    |
     * |return|string|Repeated string |
     *
     * ```javascript
     * repeat('a', 3); // -> 'aaa'
     * repeat('ab', 2); // -> 'abab'
     * repeat('*', 0); // -> ''
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    exports = function exports(str, n) {
        var ret = '';

        if (n < 1) return '';

        while (n > 0) {
            if (n & 1) ret += str;
            n >>= 1;
            str += str;
        }

        return ret;
    };

    return exports;
}({});

/* ------------------------------ lpad ------------------------------ */

var lpad = exports.lpad = _.lpad = function () {
    /* Pad string on the left side if it's shorter than length.
     *
     * |Name   |Type  |Desc                  |
     * |-------|------|----------------------|
     * |str    |string|String to pad         |
     * |len    |number|Padding length        |
     * |[chars]|string|String used as padding|
     * |return |string|Resulted string       |
     *
     * ```javascript
     * lpad('a', 5); // -> '    a'
     * lpad('a', 5, '-'); // -> '----a'
     * lpad('abc', 3, '-'); // -> 'abc'
     * lpad('abc', 5, 'ab'); // -> 'ababc'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * repeat toStr 
     */

    function exports(str, len, chars) {
        str = toStr(str);

        var strLen = str.length;

        chars = chars || ' ';

        if (strLen < len) str = (repeat(chars, len - strLen) + str).slice(-len);

        return str;
    }

    return exports;
}();

/* ------------------------------ dateFormat ------------------------------ */

var dateFormat = exports.dateFormat = _.dateFormat = function () {
    /* Simple but extremely useful date format function.
     *
     * |Name           |Type   |Desc                 |
     * |---------------|-------|---------------------|
     * |[date=new Date]|Date   |Date object to format|
     * |mask           |string |Format mask          |
     * |[utc=false]    |boolean|UTC or not           |
     * |[gmt=false]    |boolean|GMT or not           |
     *
     * |Mask|Description                                                      |
     * |----|-----------------------------------------------------------------|
     * |d   |Day of the month as digits; no leading zero for single-digit days|
     * |dd  |Day of the month as digits; leading zero for single-digit days   |
     * |ddd |Day of the week as a three-letter abbreviation                   |
     * |dddd|Day of the week as its full name                                 |
     * |m   |Month as digits; no leading zero for single-digit months         |
     * |mm  |Month as digits; leading zero for single-digit months            |
     * |mmm |Month as a three-letter abbreviation                             |
     * |mmmm|Month as its full name                                           |
     * |yy  |Year as last two digits; leading zero for years less than 10     |
     * |yyyy|Year represented by four digits                                  |
     * |h   |Hours; no leading zero for single-digit hours (12-hour clock)    |
     * |hh  |Hours; leading zero for single-digit hours (12-hour clock)       |
     * |H   |Hours; no leading zero for single-digit hours (24-hour clock)    |
     * |HH  |Hours; leading zero for single-digit hours (24-hour clock)       |
     * |M   |Minutes; no leading zero for single-digit minutes                |
     * |MM  |Minutes; leading zero for single-digit minutes                   |
     * |s   |Seconds; no leading zero for single-digit seconds                |
     * |ss  |Seconds; leading zero for single-digit seconds                   |
     * |l L |Milliseconds. l gives 3 digits. L gives 2 digits                 |
     * |t   |Lowercase, single-character time marker string: a or p           |
     * |tt  |Lowercase, two-character time marker string: am or pm            |
     * |T   |Uppercase, single-character time marker string: A or P           |
     * |TT  |Uppercase, two-character time marker string: AM or PM            |
     * |Z   |US timezone abbreviation, e.g. EST or MDT                        |
     * |o   |GMT/UTC timezone offset, e.g. -0500 or +0230                     |
     * |S   |The date's ordinal suffix (st, nd, rd, or th)                    |
     * |UTC:|Must be the first four characters of the mask                    |
     *
     * ```javascript
     * dateFormat('isoDate'); // -> 2016-11-19
     * dateFormat('yyyy-mm-dd HH:MM:ss'); // -> 2016-11-19 19:00:04
     * dateFormat(new Date(), 'yyyy-mm-dd'); // -> 2016-11-19
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isStr isDate toStr lpad 
     */

    function exports(date, mask, utc, gmt) {
        if (arguments.length === 1 && isStr(date) && !regNum.test(date)) {
            mask = date;
            date = undefined;
        }

        date = date || new Date();

        if (!isDate(date)) date = new Date(date);

        mask = toStr(exports.masks[mask] || mask || exports.masks['default']);

        var maskSlice = mask.slice(0, 4);

        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
            mask = mask.slice(4);
            utc = true;
            if (maskSlice === 'GMT:') gmt = true;
        }

        var prefix = utc ? 'getUTC' : 'get',
            d = date[prefix + 'Date'](),
            D = date[prefix + 'Day'](),
            m = date[prefix + 'Month'](),
            y = date[prefix + 'FullYear'](),
            H = date[prefix + 'Hours'](),
            M = date[prefix + 'Minutes'](),
            s = date[prefix + 'Seconds'](),
            L = date[prefix + 'Milliseconds'](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
            d: d,
            dd: padZero(d),
            ddd: exports.i18n.dayNames[D],
            dddd: exports.i18n.dayNames[D + 7],
            m: m + 1,
            mm: padZero(m + 1),
            mmm: exports.i18n.monthNames[m],
            mmmm: exports.i18n.monthNames[m + 12],
            yy: toStr(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: padZero(H % 12 || 12),
            H: H,
            HH: padZero(H),
            M: M,
            MM: padZero(M),
            s: s,
            ss: padZero(s),
            l: padZero(L, 3),
            L: padZero(Math.round(L / 10)),
            t: H < 12 ? 'a' : 'p',
            tt: H < 12 ? 'am' : 'pm',
            T: H < 12 ? 'A' : 'P',
            TT: H < 12 ? 'AM' : 'PM',
            Z: gmt ? 'GMT' : utc ? 'UTC' : (toStr(date).match(regTimezone) || ['']).pop().replace(regTimezoneClip, ''),
            o: (o > 0 ? '-' : '+') + padZero(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };

        return mask.replace(regToken, function (match) {
            if (match in flags) return flags[match];

            return match.slice(1, match.length - 1);
        });
    }

    function padZero(str, len) {
        return lpad(toStr(str), len || 2, '0');
    }

    var regToken = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g,
        regTimezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        regNum = /\d/,
        regTimezoneClip = /[^-+\dA-Z]/g;

    exports.masks = {
        'default': 'ddd mmm dd yyyy HH:MM:ss',
        'shortDate': 'm/d/yy',
        'mediumDate': 'mmm d, yyyy',
        'longDate': 'mmmm d, yyyy',
        'fullDate': 'dddd, mmmm d, yyyy',
        'shortTime': 'h:MM TT',
        'mediumTime': 'h:MM:ss TT',
        'longTime': 'h:MM:ss TT Z',
        'isoDate': 'yyyy-mm-dd',
        'isoTime': 'HH:MM:ss',
        'isoDateTime': 'yyyy-mm-dd\'T\'HH:MM:sso',
        'isoUtcDateTime': 'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
        'expiresHeaderFormat': 'ddd, dd mmm yyyy HH:MM:ss Z'
    };

    exports.i18n = {
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };

    return exports;
}();

/* ------------------------------ ltrim ------------------------------ */

var ltrim = exports.ltrim = _.ltrim = function () {
    /* Remove chars or white-spaces from beginning of string.
     *
     * |Name  |Type        |Desc              |
     * |------|------------|------------------|
     * |str   |string      |String to trim    |
     * |chars |string array|Characters to trim|
     * |return|string      |Trimmed string    |
     *
     * ```javascript
     * ltrim(' abc  '); // -> 'abc  '
     * ltrim('_abc_', '_'); // -> 'abc_'
     * ltrim('_abc_', ['a', '_']); // -> 'bc_'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var regSpace = /^\s+/;

    function exports(str, chars) {
        if (chars == null) return str.replace(regSpace, '');

        var start = 0,
            len = str.length,
            charLen = chars.length,
            found = true,
            i,
            c;

        while (found && start < len) {
            found = false;
            i = -1;
            c = str.charAt(start);

            while (++i < charLen) {
                if (c === chars[i]) {
                    found = true;
                    start++;
                    break;
                }
            }
        }

        return start >= len ? '' : str.substr(start, len);
    }

    return exports;
}();

/* ------------------------------ matcher ------------------------------ */

var matcher = exports.matcher = _.matcher = function () {
    /* Return a predicate function that checks if attrs are contained in an object.
     *
     * |Name  |Type    |Desc                              |
     * |------|--------|----------------------------------|
     * |attrs |object  |Object of property values to match|
     * |return|function|New predicate function            |
     *
     * ```javascript
     * var objects = [
     *     {a: 1, b: 2, c: 3 },
     *     {a: 4, b: 5, c: 6 }
     * ];
     * filter(objects, matcher({a: 4, c: 6 })); // -> [{a: 4, b: 5, c: 6 }]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * extendOwn isMatch 
     */

    function exports(attrs) {
        attrs = extendOwn({}, attrs);

        return function (obj) {
            return isMatch(obj, attrs);
        };
    }

    return exports;
}();

/* ------------------------------ safeCb ------------------------------ */

var safeCb = exports.safeCb = _.safeCb = function (exports) {
    /* Create callback based on input value.
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isFn isObj optimizeCb matcher identity 
     */

    exports = function exports(val, ctx, argCount) {
        if (val == null) return identity;

        if (isFn(val)) return optimizeCb(val, ctx, argCount);

        if (isObj(val)) return matcher(val);

        return function (key) {
            return function (obj) {
                return obj == null ? undefined : obj[key];
            };
        };
    };

    return exports;
}({});

/* ------------------------------ filter ------------------------------ */

var filter = exports.filter = _.filter = function () {
    /* Iterates over elements of collection, returning an array of all the values that pass a truth test.
     *
     * |Name     |Type    |Desc                                   |
     * |---------|--------|---------------------------------------|
     * |obj      |array   |Collection to iterate over             |
     * |predicate|function|Function invoked per iteration         |
     * |[ctx]    |*       |Predicate context                      |
     * |return   |array   |Array of all values that pass predicate|
     *
     * ```javascript
     * filter([1, 2, 3, 4, 5], function (val)
     * {
     *     return val % 2 === 0;
     * }); // -> [2, 4]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * safeCb each 
     */

    function exports(obj, predicate, ctx) {
        var ret = [];

        predicate = safeCb(predicate, ctx);

        _each(obj, function (val, idx, list) {
            if (predicate(val, idx, list)) ret.push(val);
        });

        return ret;
    }

    return exports;
}();

/* ------------------------------ evalCss ------------------------------ */

var evalCss = exports.evalCss = _.evalCss = function () {
    /* dependencies
     * toStr each filter 
     */

    var styleList = [],
        scale = 1;

    function exports(css) {
        css = toStr(css);

        for (var i = 0, len = styleList.length; i < len; i++) {
            if (styleList[i].css === css) return;
        }

        var container = exports.container || document.head,
            el = document.createElement('style');

        el.type = 'text/css';
        container.appendChild(el);

        var style = { css: css, el: el, container: container };
        resetStyle(style);
        styleList.push(style);

        return style;
    }

    exports.setScale = function (s) {
        scale = s;
        _each(styleList, function (style) {
            return resetStyle(style);
        });
    };

    exports.clear = function () {
        _each(styleList, function (_ref) {
            var container = _ref.container,
                el = _ref.el;
            return container.removeChild(el);
        });
        styleList = [];
    };

    exports.remove = function (style) {
        styleList = filter(styleList, function (s) {
            return s !== style;
        });

        style.container.removeChild(style.el);
    };

    function resetStyle(_ref2) {
        var css = _ref2.css,
            el = _ref2.el;

        el.innerText = css.replace(/(\d+)px/g, function ($0, $1) {
            return +$1 * scale + 'px';
        });
    }

    return exports;
}();

/* ------------------------------ map ------------------------------ */

var map = exports.map = _.map = function () {
    /* Create an array of values by running each element in collection through iteratee.
     *
     * |Name    |Type        |Desc                          |
     * |--------|------------|------------------------------|
     * |obj     |array object|Collection to iterate over    |
     * |iteratee|function    |Function invoked per iteration|
     * |[ctx]   |*           |Function context              |
     * |return  |array       |New mapped array              |
     *
     * ```javascript
     * map([4, 8], function (n) { return n * n; }); // -> [16, 64]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * safeCb keys isArrLike 
     */

    function exports(obj, iteratee, ctx) {
        iteratee = safeCb(iteratee, ctx);

        var _keys = !isArrLike(obj) && keys(obj),
            len = (_keys || obj).length,
            results = Array(len);

        for (var i = 0; i < len; i++) {
            var curKey = _keys ? _keys[i] : i;
            results[i] = iteratee(obj[curKey], curKey, obj);
        }

        return results;
    }

    return exports;
}();

/* ------------------------------ toArr ------------------------------ */

var toArr = exports.toArr = _.toArr = function () {
    /* Convert value to an array.
     *
     * |Name  |Type |Desc            |
     * |------|-----|----------------|
     * |val   |*    |Value to convert|
     * |return|array|Converted array |
     *
     * ```javascript
     * toArr({a: 1, b: 2}); // -> [{a: 1, b: 2}]
     * toArr('abc'); // -> ['abc']
     * toArr(1); // -> [1]
     * toArr(null); // -> []
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isArrLike map isArr isStr 
     */

    function exports(val) {
        if (!val) return [];

        if (isArr(val)) return val;

        if (isArrLike(val) && !isStr(val)) return map(val);

        return [val];
    }

    return exports;
}();

/* ------------------------------ Class ------------------------------ */

var Class = exports.Class = _.Class = function () {
    /* Create JavaScript class.
     *
     * |Name     |Type    |Desc                             |
     * |---------|--------|---------------------------------|
     * |methods  |object  |Public methods                   |
     * |[statics]|object  |Static methods                   |
     * |return   |function|Function used to create instances|
     *
     * ```javascript
     * var People = Class({
     *     initialize: function People(name, age)
     *     {
     *         this.name = name;
     *         this.age = age;
     *     },
     *     introduce: function ()
     *     {
     *         return 'I am ' + this.name + ', ' + this.age + ' years old.';
     *     }
     * });
     *
     * var Student = People.extend({
     *     initialize: function Student(name, age, school)
     *     {
     *         this.callSuper(People, 'initialize', arguments);
     *
     *         this.school = school;
     *     },
     *     introduce: function ()
     *     {
     *         return this.callSuper(People, 'introduce') + '\n I study at ' + this.school + '.';
     *     }
     * }, {
     *     is: function (obj)
     *     {
     *         return obj instanceof Student;
     *     }
     * });
     *
     * var a = new Student('allen', 17, 'Hogwarts');
     * a.introduce(); // -> 'I am allen, 17 years old. \n I study at Hogwarts.'
     * Student.is(a); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * extend toArr inherits has safeGet 
     */

    function exports(methods, statics) {
        return Base.extend(methods, statics);
    }

    function makeClass(parent, methods, statics) {
        statics = statics || {};
        var className = methods.className || safeGet(methods, 'initialize.name') || '';
        delete methods.className;

        var ctor = new Function('toArr', 'return function ' + className + '()' + '{' + 'var args = toArr(arguments);' + 'return this.initialize ? this.initialize.apply(this, args) || this : this;' + '};')(toArr);

        inherits(ctor, parent);
        ctor.prototype.constructor = ctor;

        ctor.extend = function (methods, statics) {
            return makeClass(ctor, methods, statics);
        };
        ctor.inherits = function (Class) {
            inherits(ctor, Class);
        };
        ctor.methods = function (methods) {
            extend(ctor.prototype, methods);
            return ctor;
        };
        ctor.statics = function (statics) {
            extend(ctor, statics);
            return ctor;
        };

        ctor.methods(methods).statics(statics);

        return ctor;
    }

    var Base = exports.Base = makeClass(Object, {
        className: 'Base',
        callSuper: function callSuper(parent, name, args) {
            var superMethod = parent.prototype[name];

            return superMethod.apply(this, args);
        },
        toString: function toString() {
            return this.constructor.name;
        }
    });

    return exports;
}();

/* ------------------------------ Enum ------------------------------ */

var Enum = exports.Enum = _.Enum = function (exports) {
    /* Enum type implementation.
     *
     * ### constructor
     *
     * |Name|Type |Desc            |
     * |----|-----|----------------|
     * |arr |array|Array of strings|
     *
     * |Name|Type  |Desc                  |
     * |----|------|----------------------|
     * |obj |object|Pairs of key and value|
     *
     * ```javascript
     * var importance = new Enum([
     *     'NONE', 'TRIVIAL', 'REGULAR', 'IMPORTANT', 'CRITICAL'
     * ]);
     *
     * if (val === importance.CRITICAL)
     * {
     *     // Do something.
     * }
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * Class freeze isArr each keys 
     */

    exports = Class({
        initialize: function Enum(map) {
            if (isArr(map)) {
                this.size = map.length;
                _each(map, function (member, val) {
                    this[member] = val;
                }, this);
            } else {
                this.size = keys(map).length;
                _each(map, function (val, member) {
                    this[member] = val;
                }, this);
            }

            freeze(this);
        }
    });

    return exports;
}({});

/* ------------------------------ Select ------------------------------ */

var Select = exports.Select = _.Select = function (exports) {
    /* Simple wrapper of querySelectorAll to make dom selection easier.
     *
     * ### constructor
     *
     * |Name    |Type  |Desc               |
     * |--------|------|-------------------|
     * |selector|string|Dom selector string|
     *
     * ### find
     *
     * Get desdendants of current matched elements.
     *
     * |Name    |Type  |Desc               |
     * |--------|------|-------------------|
     * |selector|string|Dom selector string|
     *
     * ### each
     *
     * Iterate over matched elements.
     *
     * |Name|Type    |Desc                                |
     * |----|--------|------------------------------------|
     * |fn  |function|Function to execute for each element|
     *
     * ```javascript
     * var $test = new Select('#test');
     * $test.find('.test').each(function (idx, element)
     * {
     *     // Manipulate dom nodes
     * });
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * Class isStr each 
     */

    exports = Class({
        className: 'Select',
        initialize: function initialize(selector) {
            this.length = 0;

            if (!selector) return this;

            if (isStr(selector)) return rootSelect.find(selector);

            if (selector.nodeType) {
                this[0] = selector;
                this.length = 1;
            }
        },
        find: function find(selector) {
            var ret = new Select();

            this.each(function () {
                mergeArr(ret, this.querySelectorAll(selector));
            });

            return ret;
        },
        each: function each(fn) {
            _each(this, function (element, idx) {
                fn.call(element, idx, element);
            });

            return this;
        }
    });

    var rootSelect = new exports(document);

    function mergeArr(first, second) {
        var len = second.length,
            i = first.length;

        for (var j = 0; j < len; j++) {
            first[i++] = second[j];
        }first.length = i;

        return first;
    }

    return exports;
}({});

/* ------------------------------ $safeEls ------------------------------ */

var $safeEls = exports.$safeEls = _.$safeEls = function () {
    /* Convert value into an array, if it's a string, do querySelector.
     *
     * |Name  |Type                |Desc             |
     * |------|--------------------|-----------------|
     * |value |element array string|Value to convert |
     * |return|array               |Array of elements|
     *
     * ```javascript
     * $safeEls('.test'); // -> Array of elements with test class
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * isStr toArr Select 
     */

    function exports(val) {
        return toArr(isStr(val) ? new Select(val) : val);
    }

    return exports;
}();

/* ------------------------------ $attr ------------------------------ */

var $attr = exports.$attr = _.$attr = function () {
    /* Element attribute manipulation.
     *
     * Get the value of an attribute for the first element in the set of matched elements.
     *
     * |Name   |Type                |Desc                            |
     * |-------|--------------------|--------------------------------|
     * |element|string array element|Elements to manipulate          |
     * |name   |string              |Attribute name                  |
     * |return |string              |Attribute value of first element|
     *
     * Set one or more attributes for the set of matched elements.
     *
     * |Name   |Type                |Desc                  |
     * |-------|--------------------|----------------------|
     * |element|string array element|Elements to manipulate|
     * |name   |string              |Attribute name        |
     * |value  |string              |Attribute value       |
     *
     * |Name      |Type                |Desc                                  |
     * |----------|--------------------|--------------------------------------|
     * |element   |string array element|Elements to manipulate                |
     * |attributes|object              |Object of attribute-value pairs to set|
     *
     * ### remove
     *
     * Remove an attribute from each element in the set of matched elements.
     *
     * |Name   |Type                |Desc                  |
     * |-------|--------------------|----------------------|
     * |element|string array element|Elements to manipulate|
     * |name   |string              |Attribute name        |
     *
     * ```javascript
     * $attr('#test', 'attr1', 'test');
     * $attr('#test', 'attr1'); // -> test
     * $attr.remove('#test', 'attr1');
     * $attr('#test', {
     *     'attr1': 'test',
     *     'attr2': 'test'
     * });
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * toArr isObj isStr each isUndef $safeEls 
     */

    function exports(els, name, val) {
        els = $safeEls(els);

        var isGetter = isUndef(val) && isStr(name);
        if (isGetter) return getAttr(els[0], name);

        var attrs = name;
        if (!isObj(attrs)) {
            attrs = {};
            attrs[name] = val;
        }

        setAttr(els, attrs);
    }

    exports.remove = function (els, names) {
        els = $safeEls(els);
        names = toArr(names);

        _each(els, function (node) {
            _each(names, function (name) {
                node.removeAttribute(name);
            });
        });
    };

    function getAttr(el, name) {
        return el.getAttribute(name);
    }

    function setAttr(els, attrs) {
        _each(els, function (el) {
            _each(attrs, function (val, name) {
                el.setAttribute(name, val);
            });
        });
    }

    return exports;
}();

/* ------------------------------ $data ------------------------------ */

var $data = exports.$data = _.$data = function () {
    /* Wrapper of $attr, adds data- prefix to keys.
     *
     * ```javascript
     * $data('#test', 'attr1', 'eustia');
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * $attr isStr isObj each 
     */

    function exports(nodes, name, val) {
        var dataName = name;

        if (isStr(name)) dataName = 'data-' + name;
        if (isObj(name)) {
            dataName = {};
            _each(name, function (val, key) {
                dataName['data-' + key] = val;
            });
        }

        return $attr(nodes, dataName, val);
    }

    return exports;
}();

/* ------------------------------ $css ------------------------------ */

var $css = exports.$css = _.$css = function () {
    /* Element css manipulation.
     *
     * Get the computed style properties for the first element in the set of matched elements.
     *
     * |Name   |Type                |Desc                      |
     * |-------|--------------------|--------------------------|
     * |element|string array element|Elements to manipulate    |
     * |name   |string              |Property name             |
     * |return |string              |Css value of first element|
     *
     * Set one or more CSS properties for the set of matched elements.
     *
     * |Name   |Type                |Desc                  |
     * |-------|--------------------|----------------------|
     * |element|string array element|Elements to manipulate|
     * |name   |string              |Property name         |
     * |value  |string              |Css value             |
     *
     * |Name      |Type                |Desc                            |
     * |----------|--------------------|--------------------------------|
     * |element   |string array element|Elements to manipulate          |
     * |properties|object              |Object of css-value pairs to set|
     *
     * ```javascript
     * $css('#test', {
     *     'color': '#fff',
     *     'background': 'black'
     * });
     * $css('#test', 'display', 'block');
     * $css('#test', 'color'); // -> #fff
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * isStr isObj camelCase kebabCase isUndef contain isNum $safeEls startWith 
     */

    function exports(nodes, name, val) {
        nodes = $safeEls(nodes);

        var isGetter = isUndef(val) && isStr(name);
        if (isGetter) return getCss(nodes[0], name);

        var css = name;
        if (!isObj(css)) {
            css = {};
            css[name] = val;
        }

        setCss(nodes, css);
    }

    function getCss(node, name) {
        return node.style[camelCase(name)] || getComputedStyle(node, '').getPropertyValue(name);
    }

    function setCss(nodes, css) {
        _each(nodes, function (node) {
            var cssText = ';';
            _each(css, function (val, key) {
                key = dasherize(key);
                cssText += key + ':' + addPx(key, val) + ';';
            });
            node.style.cssText += cssText;
        });
    }

    var cssNumProps = ['column-count', 'columns', 'font-weight', 'line-weight', 'opacity', 'z-index', 'zoom'];

    function addPx(key, val) {
        var needPx = isNum(val) && !contain(cssNumProps, kebabCase(key));

        return needPx ? val + 'px' : val;
    }

    function dasherize(str) {
        // -webkit- -o- 
        if (startWith(str, '-')) return str;

        return kebabCase(str);
    }

    return exports;
}();

/* ------------------------------ $insert ------------------------------ */

var $insert = exports.$insert = _.$insert = function (exports) {
    /* Insert html on different position.
     *
     * ### before
     *
     * Insert content before elements.
     *
     * ### after
     *
     * Insert content after elements.
     *
     * ### prepend
     *
     * Insert content to the beginning of elements.
     *
     * ### append
     *
     * Insert content to the end of elements.
     *
     * |Name   |Type                |Desc                  |
     * |-------|--------------------|----------------------|
     * |element|string array element|Elements to manipulate|
     * |content|string              |Html strings          |
     *
     * ```javascript
     * // <div id="test"><div class="mark"></div></div>
     * $insert.before('#test', '<div>eris</div>');
     * // -> <div>eris</div><div id="test"><div class="mark"></div></div>
     * $insert.after('#test', '<div>eris</div>');
     * // -> <div id="test"><div class="mark"></div></div><div>eris</div>
     * $insert.prepend('#test', '<div>eris</div>');
     * // -> <div id="test"><div>eris</div><div class="mark"></div></div>
     * $insert.append('#test', '<div>eris</div>');
     * // -> <div id="test"><div class="mark"></div><div>eris</div></div>
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * each $safeEls 
     */

    exports = {
        before: insertFactory('beforebegin'),
        after: insertFactory('afterend'),
        append: insertFactory('beforeend'),
        prepend: insertFactory('afterbegin')
    };

    function insertFactory(type) {
        return function (nodes, val) {
            nodes = $safeEls(nodes);

            _each(nodes, function (node) {
                node.insertAdjacentHTML(type, val);
            });
        };
    }

    return exports;
}({});

/* ------------------------------ $offset ------------------------------ */

var $offset = exports.$offset = _.$offset = function () {
    /* Get the position of the element in document.
     *
     * |Name   |Type                |Desc                  |
     * |-------|--------------------|----------------------|
     * |element|string array element|Elements to get offset|
     *
     * ```javascript
     * $offset('#test'); // -> {left: 0, top: 0, width: 0, height: 0}
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * $safeEls 
     */

    function exports(els) {
        els = $safeEls(els);

        var el = els[0];

        var clientRect = el.getBoundingClientRect();

        return {
            left: clientRect.left + window.pageXOffset,
            top: clientRect.top + window.pageYOffset,
            width: Math.round(clientRect.width),
            height: Math.round(clientRect.height)
        };
    }

    return exports;
}();

/* ------------------------------ $property ------------------------------ */

var $property = exports.$property = _.$property = function (exports) {
    /* Element property html, text, val getter and setter.
     *
     * ### html
     *
     * Get the HTML contents of the first element in the set of matched elements or
     * set the HTML contents of every matched element.
     *
     * ### text
     *
     * Get the combined text contents of each element in the set of matched
     * elements, including their descendants, or set the text contents of the
     * matched elements.
     *
     * ### val
     *
     * Get the current value of the first element in the set of matched elements or
     * set the value of every matched element.
     *
     * ```javascript
     * $property.html('#test', 'eris');
     * $property.html('#test'); // -> eris
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * isUndef each $safeEls 
     */

    exports = {
        html: propFactory('innerHTML'),
        text: propFactory('textContent'),
        val: propFactory('value')
    };

    function propFactory(name) {
        return function (nodes, val) {
            nodes = $safeEls(nodes);

            if (isUndef(val)) return nodes[0][name];

            _each(nodes, function (node) {
                node[name] = val;
            });
        };
    }

    return exports;
}({});

/* ------------------------------ $remove ------------------------------ */

var $remove = exports.$remove = _.$remove = function () {
    /* Remove the set of matched elements from the DOM.
     *
     * |Name   |Type                |Desc              |
     * |-------|--------------------|------------------|
     * |element|string array element|Elements to delete|
     *
     * ```javascript
     * $remove('#test');
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * each $safeEls 
     */

    function exports(els) {
        els = $safeEls(els);

        _each(els, function (el) {
            var parent = el.parentNode;

            if (parent) parent.removeChild(el);
        });
    }

    return exports;
}();

/* ------------------------------ $show ------------------------------ */

var $show = exports.$show = _.$show = function () {
    /* Show elements.
     *
     * |Name   |Type                |Desc            |
     * |-------|--------------------|----------------|
     * |element|string array element|Elements to show|
     *
     * ```javascript
     * $show('#test');
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * each $safeEls 
     */

    function exports(els) {
        els = $safeEls(els);

        _each(els, function (el) {
            if (isHidden(el)) {
                el.style.display = getDefDisplay(el.nodeName);
            }
        });
    }

    function isHidden(el) {
        return getComputedStyle(el, '').getPropertyValue('display') == 'none';
    }

    var elDisplay = {};

    function getDefDisplay(elName) {
        var el, display;

        if (!elDisplay[elName]) {
            el = document.createElement(elName);
            document.documentElement.appendChild(el);
            display = getComputedStyle(el, '').getPropertyValue('display');
            el.parentNode.removeChild(el);
            display == 'none' && (display = 'block');
            elDisplay[elName] = display;
        }

        return elDisplay[elName];
    }

    return exports;
}();

/* ------------------------------ delegate ------------------------------ */

var delegate = exports.delegate = _.delegate = function (exports) {
    /* Event delegation.
     *
     * ### add
     *
     * Add event delegation.
     *
     * |Name    |Type    |Desc          |
     * |--------|--------|--------------|
     * |el      |element |Parent element|
     * |type    |string  |Event type    |
     * |selector|string  |Match selector|
     * |cb      |function|Event callback|
     *
     * ### remove
     *
     * Remove event delegation.
     *
     * ```javascript
     * var container = document.getElementById('container');
     * function clickHandler()
     * {
     *     // Do something...
     * }
     * delegate.add(container, 'click', '.children', clickHandler);
     * delegate.remove(container, 'click', '.children', clickHandler);
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * Class contain 
     */

    function retTrue() {
        return true;
    }
    function retFalse() {
        return false;
    }

    function trigger(e) {
        var handlers = this.events[e.type],
            handler,
            handlerQueue = formatHandlers.call(this, e, handlers);

        e = new exports.Event(e);

        var i = 0,
            j,
            matched,
            ret;

        while ((matched = handlerQueue[i++]) && !e.isPropagationStopped()) {
            e.curTarget = matched.el;
            j = 0;
            while ((handler = matched.handlers[j++]) && !e.isImmediatePropagationStopped()) {
                ret = handler.handler.apply(matched.el, [e]);

                if (ret === false) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        }
    }

    function formatHandlers(e, handlers) {
        var current = e.target,
            ret = [],
            delegateCount = handlers.delegateCount,
            selector,
            matches,
            handler,
            i;

        if (current.nodeType) {
            for (; current !== this; current = current.parentNode || this) {
                matches = [];
                for (i = 0; i < delegateCount; i++) {
                    handler = handlers[i];
                    selector = handler.selector + ' ';
                    if (matches[selector] === undefined) {
                        matches[selector] = contain(this.querySelectorAll(selector), current);
                    }
                    if (matches[selector]) matches.push(handler);
                }
                if (matches.length) ret.push({ el: current, handlers: matches });
            }
        }

        if (delegateCount < handlers.length) {
            ret.push({
                el: this,
                handlers: handlers.slice(delegateCount)
            });
        }

        return ret;
    }

    exports = {
        add: function add(el, type, selector, fn) {
            var handler = {
                selector: selector,
                handler: fn
            },
                handlers;

            if (!el.events) el.events = {};

            if (!(handlers = el.events[type])) {
                handlers = el.events[type] = [];
                handlers.delegateCount = 0;
                el.addEventListener(type, function (e) {
                    trigger.apply(el, arguments);
                }, false);
            }

            selector ? handlers.splice(handlers.delegateCount++, 0, handler) : handlers.push(handler);
        },
        remove: function remove(el, type, selector, fn) {
            var events = el.events;

            if (!events || !events[type]) return;

            var handlers = events[type],
                i = handlers.length,
                handler;

            while (i--) {
                handler = handlers[i];

                if ((!selector || handler.selector == selector) && handler.handler == fn) {
                    handlers.splice(i, 1);
                    if (handler.selector) {
                        handlers.delegateCount--;
                    }
                }
            }
        },
        Event: Class({
            className: 'Event',
            initialize: function Event(e) {
                this.origEvent = e;
            },
            isDefaultPrevented: retFalse,
            isPropagationStopped: retFalse,
            isImmediatePropagationStopped: retFalse,
            preventDefault: function preventDefault() {
                var e = this.origEvent;

                this.isDefaultPrevented = retTrue;
                if (e && e.preventDefault) e.preventDefault();
            },
            stopPropagation: function stopPropagation() {
                var e = this.origEvent;

                this.isPropagationStopped = retTrue;
                if (e && e.stopPropagation) e.stopPropagation();
            },
            stopImmediatePropagation: function stopImmediatePropagation() {
                var e = this.origEvent;

                this.isImmediatePropagationStopped = retTrue;
                if (e && e.stopImmediatePropagation) e.stopImmediatePropagation();
                this.stopPropagation();
            }
        })
    };

    return exports;
}({});

/* ------------------------------ $event ------------------------------ */

var $event = exports.$event = _.$event = function (exports) {
    /* bind events to certain dom elements.
     *
     * ```javascript
     * function clickHandler()
     * {
     *     // Do something...
     * }
     * $event.on('#test', 'click', clickHandler);
     * $event.off('#test', 'click', clickHandler);
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * delegate isUndef $safeEls 
     */

    exports = {
        on: eventFactory('add'),
        off: eventFactory('remove')
    };

    function eventFactory(type) {
        return function (nodes, event, selector, handler) {
            nodes = $safeEls(nodes);

            if (isUndef(handler)) {
                handler = selector;
                selector = undefined;
            }

            _each(nodes, function (node) {
                delegate[type](node, event, selector, handler);
            });
        };
    }

    return exports;
}({});

/* ------------------------------ concat ------------------------------ */

var concat = exports.concat = _.concat = function () {
    /* Concat multiple arrays into a single array.
     *
     * |Name  |Type |Desc              |
     * |------|-----|------------------|
     * |...arr|array|Arrays to concat  |
     * |return|array|Concatenated array|
     *
     * ```javascript
     * concat([1, 2], [3], [4, 5]); // -> [1, 2, 3, 4, 5]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * toArr 
     */

    function exports() {
        var args = toArr(arguments),
            ret = [];

        for (var i = 0, len = args.length; i < len; i++) {
            ret = ret.concat(toArr(args[i]));
        }

        return ret;
    }

    return exports;
}();

/* ------------------------------ some ------------------------------ */

var some = exports.some = _.some = function () {
    /* Check if predicate return truthy for any element.
     *
     * |Name     |Type        |Desc                                          |
     * |---------|------------|----------------------------------------------|
     * |obj      |array object|Collection to iterate over                    |
     * |predicate|function    |Function to invoked per iteration             |
     * |ctx      |*           |Predicate context                             |
     * |return   |boolean     |True if any element passes the predicate check|
     *
     * ```javascript
     * some([2, 5], function (val)
     * {
     *     return val % 2 === 0;
     * }); // -> true
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * safeCb isArrLike keys 
     */

    function exports(obj, predicate, ctx) {
        predicate = safeCb(predicate, ctx);

        var _keys = !isArrLike(obj) && keys(obj),
            len = (_keys || obj).length;

        for (var i = 0; i < len; i++) {
            var key = _keys ? _keys[i] : i;
            if (predicate(obj[key], key, obj)) return true;
        }

        return false;
    }

    return exports;
}();

/* ------------------------------ $class ------------------------------ */

var $class = exports.$class = _.$class = function (exports) {
    /* Element class manipulations.
     *
     * ### add
     *
     * Add the specified class(es) to each element in the set of matched elements.
     *
     * |Name   |Type                |Desc                  |
     * |-------|--------------------|----------------------|
     * |element|string array element|Elements to manipulate|
     * |names  |string array        |Classes to add        |
     *
     * ### has
     *
     * Determine whether any of the matched elements are assigned the given class.
     *
     * |Name   |Type                |Desc                                 |
     * |-------|--------------------|-------------------------------------|
     * |element|string array element|Elements to manipulate               |
     * |name   |string              |Class name                           |
     * |return |boolean             |True if elements has given class name|
     *
     * ### toggle
     *
     * Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument.
     *
     * |Name   |Type                |Desc                  |
     * |-------|--------------------|----------------------|
     * |element|string array element|Elements to manipulate|
     * |name   |string              |Class name to toggle  |
     *
     * ### remove
     *
     * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
     *
     * |Name   |Type                |Desc                  |
     * |-------|--------------------|----------------------|
     * |element|string array element|Elements to manipulate|
     * |names  |string              |Class names to remove |
     *
     * ```javascript
     * $class.add('#test', 'class1');
     * $class.add('#test', ['class1', 'class2']);
     * $class.has('#test', 'class1'); // -> true
     * $class.remove('#test', 'class1');
     * $class.has('#test', 'class1'); // -> false
     * $class.toggle('#test', 'class1');
     * $class.has('#test', 'class1'); // -> true
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * toArr some $safeEls isStr 
     */

    exports = {
        add: function add(els, name) {
            els = $safeEls(els);
            var names = safeName(name);

            _each(els, function (el) {
                var classList = [];

                _each(names, function (name) {
                    if (!exports.has(el, name)) classList.push(name);
                });

                if (classList.length !== 0) el.className += ' ' + classList.join(' ');
            });
        },
        has: function has(els, name) {
            els = $safeEls(els);

            var regName = new RegExp('(^|\\s)' + name + '(\\s|$)');

            return some(els, function (el) {
                return regName.test(el.className);
            });
        },
        toggle: function toggle(els, name) {
            els = $safeEls(els);

            _each(els, function (el) {
                if (!exports.has(el, name)) return exports.add(el, name);

                exports.remove(el, name);
            });
        },
        remove: function remove(els, name) {
            els = $safeEls(els);
            var names = safeName(name);

            _each(els, function (el) {
                _each(names, function (name) {
                    el.classList.remove(name);
                });
            });
        }
    };

    function safeName(name) {
        return isStr(name) ? name.split(/\s+/) : toArr(name);
    }

    return exports;
}({});

/* ------------------------------ $ ------------------------------ */

var $ = exports.$ = _.$ = function () {
    /* jQuery like style dom manipulator.
     *
     * ### Available methods
     *
     * offset, hide, show, first, last, get, eq, on, off, html, text, val, css, attr,
     * data, rmAttr, remove, addClass, rmClass, toggleClass, hasClass, append, prepend,
     * before, after
     *
     * ```javascript
     * var $btn = $('#btn');
     * $btn.html('eustia');
     * $btn.addClass('btn');
     * $btn.show();
     * $btn.on('click', function ()
     * {
     *     // Do something...
     * });
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * Select $offset $show $css $attr $property last $remove $data $event $class $insert isUndef isStr 
     */

    function exports(selector) {
        return new Select(selector);
    }

    Select.methods({
        offset: function offset() {
            return $offset(this);
        },
        hide: function hide() {
            return this.css('display', 'none');
        },
        show: function show() {
            $show(this);

            return this;
        },
        first: function first() {
            return exports(this[0]);
        },
        last: function last() {
            return exports(_last(this));
        },
        get: function get(idx) {
            return this[idx];
        },
        eq: function eq(idx) {
            return exports(this[idx]);
        },
        on: function on(event, selector, handler) {
            $event.on(this, event, selector, handler);

            return this;
        },
        off: function off(event, selector, handler) {
            $event.off(this, event, selector, handler);

            return this;
        },
        html: function html(val) {
            var result = $property.html(this, val);

            if (isUndef(val)) return result;

            return this;
        },
        text: function text(val) {
            var result = $property.text(this, val);

            if (isUndef(val)) return result;

            return this;
        },
        val: function val(_val) {
            var result = $property.val(this, _val);

            if (isUndef(_val)) return result;

            return this;
        },
        css: function css(name, val) {
            var result = $css(this, name, val);

            if (isGetter(name, val)) return result;

            return this;
        },
        attr: function attr(name, val) {
            var result = $attr(this, name, val);

            if (isGetter(name, val)) return result;

            return this;
        },
        data: function data(name, val) {
            var result = $data(this, name, val);

            if (isGetter(name, val)) return result;

            return this;
        },
        rmAttr: function rmAttr(name) {
            $attr.remove(this, name);

            return this;
        },
        remove: function remove() {
            $remove(this);

            return this;
        },
        addClass: function addClass(name) {
            $class.add(this, name);

            return this;
        },
        rmClass: function rmClass(name) {
            $class.remove(this, name);

            return this;
        },
        toggleClass: function toggleClass(name) {
            $class.toggle(this, name);

            return this;
        },
        hasClass: function hasClass(name) {
            return $class.has(this, name);
        },
        parent: function parent() {
            return exports(this[0].parentNode);
        },
        append: function append(val) {
            $insert.append(this, val);

            return this;
        },
        prepend: function prepend(val) {
            $insert.prepend(this, val);

            return this;
        },
        before: function before(val) {
            $insert.before(this, val);

            return this;
        },
        after: function after(val) {
            $insert.after(this, val);

            return this;
        }
    });

    function isGetter(name, val) {
        return isUndef(val) && isStr(name);
    }

    return exports;
}();

/* ------------------------------ memStorage ------------------------------ */

var memStorage = exports.memStorage = _.memStorage = function (exports) {
    /* Memory-backed implementation of the Web Storage API.
     *
     * A replacement for environments where localStorage or sessionStorage is not available.
     *
     * ```javascript
     * var localStorage = window.localStorage || memStorage;
     * localStorage.setItem('test', 'eris');
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * keys 
     */

    exports = {
        getItem: function getItem(key) {
            return (API_KEYS[key] ? cloak[key] : this[key]) || null;
        },
        setItem: function setItem(key, val) {
            API_KEYS[key] ? cloak[key] = val : this[key] = val;
        },
        removeItem: function removeItem(key) {
            API_KEYS[key] ? delete cloak[key] : delete this[key];
        },
        key: function key(i) {
            var keys = enumerableKeys();

            return i >= 0 && i < keys.length ? keys[i] : null;
        },
        clear: function clear() {
            var keys = uncloakedKeys();

            /* eslint-disable no-cond-assign */
            for (var i = 0, key; key = keys[i]; i++) {
                delete this[key];
            }keys = cloakedKeys();

            /* eslint-disable no-cond-assign */
            for (i = 0; key = keys[i]; i++) {
                delete cloak[key];
            }
        }
    };

    Object.defineProperty(exports, 'length', {
        enumerable: false,
        configurable: true,
        get: function get() {
            return enumerableKeys().length;
        }
    });

    var cloak = {};

    var API_KEYS = {
        getItem: 1,
        setItem: 1,
        removeItem: 1,
        key: 1,
        clear: 1,
        length: 1
    };

    function enumerableKeys() {
        return uncloakedKeys().concat(cloakedKeys());
    }

    function uncloakedKeys() {
        return keys(exports).filter(function (key) {
            return !API_KEYS[key];
        });
    }

    function cloakedKeys() {
        return keys(cloak);
    }

    return exports;
}({});

/* ------------------------------ safeStorage ------------------------------ */

var safeStorage = exports.safeStorage = _.safeStorage = function () {
    /* dependencies
     * isUndef memStorage 
     */

    function exports(type, memReplacement) {
        if (isUndef(memReplacement)) memReplacement = true;

        var ret;

        switch (type) {
            case 'local':
                ret = window.localStorage;break;
            case 'session':
                ret = window.sessionStorage;break;
        }

        try {
            // Safari private browsing
            var x = 'test-localStorage-' + Date.now();
            ret.setItem(x, x);
            var y = ret.getItem(x);
            ret.removeItem(x);
            if (y !== x) throw new Error();
        } catch (e) {
            if (memReplacement) return memStorage;
            return;
        }

        return ret;
    }

    return exports;
}();

/* ------------------------------ meta ------------------------------ */

var meta = exports.meta = _.meta = function () {
    /* Document meta manipulation, turn name and content into key value pairs.
     *
     * Get meta content with given name. If name is omitted, all pairs will be return.
     * 
     * |Name  |Type        |Desc        |
     * |------|------------|------------|
     * |[name]|string array|Meta name   |
     * |return|string      |Meta content|
     * 
     * Set meta content.
     * 
     * |Name   |Type  |Desc        |
     * |-------|------|------------|
     * |name   |string|Meta name   |
     * |content|string|Meta content|
     * 
     * |Name |Type  |Desc                        |
     * |-----|------|----------------------------|
     * |metas|object|Object of name content pairs|
     * 
     * ### remove
     * 
     * Remove metas.
     * 
     * |Name|Type        |Desc     |
     * |----|------------|---------|
     * |name|string array|Meta name|
     * 
     * ```javascript
     * // <meta name="a" content="1"/> <meta name="b" content="2"/> <meta name="c" content="3"/>
     * meta(); // -> {a: '1', b: '2', c: '3'}
     * meta('a'); // -> '1'
     * meta(['a', 'c']); // -> {a: '1', c: '3'}
     * meta('d', '4');
     * meta({
     *     d: '5',
     *     e: '6',
     *     f: '7'
     * });
     * meta.remove('d');
     * meta.remove(['e', 'f']);
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * each isStr isUndef contain isArr isObj toArr 
     */

    function exports(name, content) {
        if (isUndef(name)) return getAllMeta();

        var isGetter = isStr(name) && isUndef(content) || isArr(name);
        if (isGetter) return getMeta(name);

        var metas = name;
        if (!isObj(metas)) {
            metas = {};
            metas[name] = content;
        }
        setMeta(metas);
    }

    exports.remove = function (nameList) {
        nameList = toArr(nameList);

        _each(nameList, function (name) {
            var meta = selectMeta(name);
            if (meta) doc.head.removeChild(meta);
        });
    };

    var doc = document;

    function getAllMeta() {
        var ret = {};

        metaEach(function (name, content) {
            ret[name] = content;
        });

        return ret;
    }

    function getMeta(name) {
        if (isStr(name)) {
            var meta = selectMeta(name);

            if (meta) return meta.getAttribute('content');
        } else {
            var ret = {};

            metaEach(function (key, val) {
                if (contain(name, key)) ret[key] = val;
            });

            return ret;
        }
    }

    function setMeta(metas) {
        _each(metas, function (content, name) {
            var meta = selectMeta(name);
            if (meta) return meta.setAttribute('content', content);

            meta = doc.createElement('meta');
            meta.setAttribute('name', name);
            meta.setAttribute('content', content);
            doc.head.appendChild(meta);
        });
    }

    function metaEach(fn) {
        var metaList = doc.querySelectorAll('meta');

        _each(metaList, function (meta) {
            var name = meta.getAttribute('name'),
                content = meta.getAttribute('content');

            if (!name || !content) return;

            fn(name, content);
        });
    }

    function selectMeta(name) {
        return doc.querySelector('meta[name="' + name + '"]');
    }

    return exports;
}();

/* ------------------------------ nextTick ------------------------------ */

var nextTick = exports.nextTick = _.nextTick = function (exports) {
    /* Next tick for both node and browser.
     *
     * |Name|Type    |Desc            |
     * |----|--------|----------------|
     * |cb  |function|Function to call|
     *
     * Use process.nextTick if available.
     *
     * Otherwise setImmediate or setTimeout is used as fallback.
     *
     * ```javascript
     * nextTick(function ()
     * {
     *     // Do something...
     * });
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    if ((typeof process === 'undefined' ? 'undefined' : (0, _typeof3.default)(process)) === 'object' && process.nextTick) {
        exports = process.nextTick;
    } else if (typeof _setImmediate3.default === 'function') {
        exports = function exports(cb) {
            (0, _setImmediate3.default)(ensureCallable(cb));
        };
    } else {
        exports = function exports(cb) {
            setTimeout(ensureCallable(cb), 0);
        };
    }

    function ensureCallable(fn) {
        if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

        return fn;
    }

    return exports;
}({});

/* ------------------------------ now ------------------------------ */

var now = exports.now = _.now = function (exports) {
    /* Gets the number of milliseconds that have elapsed since the Unix epoch.
     *
     * ```javascript
     * now(); // -> 1468826678701
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    exports = Date.now || function () {
        return new Date().getTime();
    };

    return exports;
}({});

/* ------------------------------ restArgs ------------------------------ */

var restArgs = exports.restArgs = _.restArgs = function () {
    /* This accumulates the arguments passed into an array, after a given index.
     *
     * |Name      |Type    |Desc                                   |
     * |----------|--------|---------------------------------------|
     * |function  |function|Function that needs rest parameters    |
     * |startIndex|number  |The start index to accumulates         |
     * |return    |function|Generated function with rest parameters|
     *
     * ```javascript
     * var paramArr = _.restArgs(function (rest) { return rest });
     * paramArr(1, 2, 3, 4); // -> [1, 2, 3, 4]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    function exports(fn, startIdx) {
        startIdx = startIdx == null ? fn.length - 1 : +startIdx;

        return function () {
            var len = Math.max(arguments.length - startIdx, 0),
                rest = new Array(len),
                i;

            for (i = 0; i < len; i++) {
                rest[i] = arguments[i + startIdx];
            } // Call runs faster than apply.
            switch (startIdx) {
                case 0:
                    return fn.call(this, rest);
                case 1:
                    return fn.call(this, arguments[0], rest);
                case 2:
                    return fn.call(this, arguments[0], arguments[1], rest);
            }

            var args = new Array(startIdx + 1);

            for (i = 0; i < startIdx; i++) {
                args[i] = arguments[i];
            }args[startIdx] = rest;

            return fn.apply(this, args);
        };
    }

    return exports;
}();

/* ------------------------------ partial ------------------------------ */

var partial = exports.partial = _.partial = function (exports) {
    /* Partially apply a function by filling in given arguments.
     *
     * |Name       |Type    |Desc                                    |
     * |-----------|--------|----------------------------------------|
     * |fn         |function|Function to partially apply arguments to|
     * |...partials|*       |Arguments to be partially applied       |
     * |return     |function|New partially applied function          |
     *
     * ```javascript
     * var sub5 = partial(function (a, b) { return b - a }, 5);
     * sub(20); // -> 15
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * restArgs toArr 
     */

    exports = restArgs(function (fn, partials) {
        return function () {
            var args = [];

            args = args.concat(partials);
            args = args.concat(toArr(arguments));

            return fn.apply(this, args);
        };
    });

    return exports;
}({});

/* ------------------------------ once ------------------------------ */

var _once = _.once = function (exports) {
    /* Create a function that invokes once.
     *
     * |Name  |Type    |Desc                   |
     * |------|--------|-----------------------|
     * |fn    |function|Function to restrict   |
     * |return|function|New restricted function|
     *
     * ```javascript
     * function init() {};
     * var initOnce = once(init);
     * initOnce();
     * initOnce(); // -> init is invoked once
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * partial before 
     */

    exports = partial(before, 2);

    return exports;
}({});

/* ------------------------------ Emitter ------------------------------ */

exports.once = _once;
var Emitter = exports.Emitter = _.Emitter = function (exports) {
    /* Event emitter class which provides observer pattern.
     *
     * ### on
     *
     * Bind event.
     *
     * ### off
     *
     * Unbind event.
     *
     * ### once
     *
     * Bind event that trigger once.
     *
     * |Name    |Type    |Desc          |
     * |--------|--------|--------------|
     * |event   |string  |Event name    |
     * |listener|function|Event listener|
     *
     * ### emit
     *
     * Emit event.
     *
     * |Name   |Type  |Desc                        |
     * |-------|------|----------------------------|
     * |event  |string|Event name                  |
     * |...args|*     |Arguments passed to listener|
     *
     * ### mixin
     *
     * [static] Mixin object class methods.
     *
     * |Name|Type  |Desc           |
     * |----|------|---------------|
     * |obj |object|Object to mixin|
     *
     * ```javascript
     * var event = new Emitter();
     * event.on('test', function () { console.log('test') });
     * event.emit('test'); // Logs out 'test'.
     * Emitter.mixin({});
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * Class has each slice once 
     */

    exports = Class({
        initialize: function Emitter() {
            this._events = this._events || {};
        },
        on: function on(event, listener) {
            this._events[event] = this._events[event] || [];
            this._events[event].push(listener);

            return this;
        },
        off: function off(event, listener) {
            if (!has(this._events, event)) return;

            this._events[event].splice(this._events[event].indexOf(listener), 1);

            return this;
        },
        once: function once(event, listener) {
            this.on(event, _once(listener));

            return this;
        },
        emit: function emit(event) {
            if (!has(this._events, event)) return;

            var args = slice(arguments, 1);

            _each(this._events[event], function (val) {
                val.apply(this, args);
            }, this);

            return this;
        }
    }, {
        mixin: function mixin(obj) {
            _each(['on', 'off', 'once', 'emit'], function (val) {
                obj[val] = exports.prototype[val];
            });

            obj._events = obj._events || {};
        }
    });

    return exports;
}({});

/* ------------------------------ Logger ------------------------------ */

var Logger = exports.Logger = _.Logger = function (exports) {
    /* Simple logger with level filter.
     *
     * ### constructor
     * 
     * |Name         |Type  |Desc        |
     * |-------------|------|------------|
     * |name         |string|Logger name |
     * |[level=DEBUG]|number|Logger level|
     * 
     * ### setLevel
     * 
     * |Name |Type         |Desc        |
     * |-----|-------------|------------|
     * |level|number string|Logger level|
     * 
     * ### getLevel
     * 
     * Get current level.
     * 
     * ### trace, debug, info, warn, error
     * 
     * Logging methods.
     * 
     * ### Log Levels
     * 
     * TRACE, DEBUG, INFO, WARN, ERROR and SILENT.
     * 
     * ```javascript
     * var logger = new Logger('eris', logger.level.ERROR);
     * logger.trace('test');
     * 
     * // Format output.
     * logger.formatter = function (type, argList)
     * {
     *     argList.push(new Date().getTime());
     * 
     *     return argList;
     * };
     * 
     * logger.on('all', function (type, argList) 
     * {
     *     // It's not affected by log level.
     * });
     * 
     * logger.on('debug', function (argList) 
     * {
     *     // Affected by log level.
     * });
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * Emitter Enum toArr isUndef clone isStr isNum 
     */

    exports = Emitter.extend({
        initialize: function Logger(name, level) {
            this.name = name;

            this.setLevel(isUndef(level) ? exports.level.DEBUG : level);
            this.callSuper(Emitter, 'initialize', arguments);
        },
        setLevel: function setLevel(level) {
            if (isStr(level)) {
                level = exports.level[level.toUpperCase()];
                if (level) this._level = level;
                return this;
            }
            if (isNum(level)) this._level = level;

            return this;
        },
        getLevel: function getLevel() {
            return this._level;
        },
        formatter: function formatter(type, argList) {
            return argList;
        },
        trace: function trace() {
            return this._log('trace', arguments);
        },
        debug: function debug() {
            return this._log('debug', arguments);
        },
        info: function info() {
            return this._log('info', arguments);
        },
        warn: function warn() {
            return this._log('warn', arguments);
        },
        error: function error() {
            return this._log('error', arguments);
        },
        _log: function _log(type, argList) {
            argList = toArr(argList);
            if (argList.length === 0) return this;

            this.emit('all', type, clone(argList));

            if (exports.level[type.toUpperCase()] < this._level) return this;
            this.emit(type, clone(argList));
            /* eslint-disable no-console */
            var consoleMethod = type === 'debug' ? console.log : console[type];
            consoleMethod.apply(console, this.formatter(type, argList));

            return this;
        }
    }, {
        level: new Enum({
            TRACE: 0,
            DEBUG: 1,
            INFO: 2,
            WARN: 3,
            ERROR: 4,
            SILENT: 5
        })
    });

    return exports;
}({});

/* ------------------------------ Store ------------------------------ */

var Store = exports.Store = _.Store = function (exports) {
    /* Memory storage.
     *
     * Extend from Emitter.
     *
     * ### constructor
     * 
     * |Name|Type  |Desc        |
     * |----|------|------------|
     * |data|object|Initial data|
     * 
     * ### set
     * 
     * Set value.
     * 
     * |Name|Type  |Desc        |
     * |----|------|------------|
     * |key |string|Value key   |
     * |val |*     |Value to set|
     * 
     * Set values.
     * 
     * |Name|Type  |Desc           |
     * |----|------|---------------|
     * |vals|object|Key value pairs|
     * 
     * This emit a change event whenever is called.
     * 
     * ### get
     * 
     * Get value.
     * 
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |key   |string|Value key         |
     * |return|*     |Value of given key|
     * 
     * Get values.
     * 
     * |Name  |Type  |Desc           |
     * |------|------|---------------|
     * |keys  |array |Array of keys  |
     * |return|object|Key value pairs|
     * 
     * ### remove
     * 
     * Remove value.
     * 
     * |Name|Type        |Desc         |
     * |----|------------|-------------|
     * |key |string array|Key to remove|
     * 
     * ### clear
     * 
     * Clear all data.
     * 
     * ### each
     * 
     * Iterate over values.
     * 
     * |Name|Type    |Desc                           |
     * |----|--------|-------------------------------|
     * |fn  |function|Function invoked per interation|
     * 
     * ```javascript
     * var store = new Store('test');
     * store.set('user', {name: 'eris'});
     * store.get('user').name; // -> 'eris'
     * store.clear();
     * store.each(function (val, key) 
     * {
     *     // Do something.
     * });
     * store.on('change', function (key, newVal, oldVal) 
     * {
     *     // It triggers whenever set is called.
     * });
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * Emitter isStr isObj each toArr 
     */

    exports = Emitter.extend({
        initialize: function Store(data) {
            this.callSuper(Emitter, 'initialize', arguments);
            this._data = data || {};
            this.save(this._data);
        },
        set: function set(key, val) {
            var data;

            if (isStr(key)) {
                data = {};
                data[key] = val;
            } else if (isObj(key)) {
                data = key;
            }

            var self = this;

            _each(data, function (val, key) {
                var oldVal = self._data[key];
                self._data[key] = val;
                self.emit('change', key, val, oldVal);
            });

            this.save(this._data);
        },
        get: function get(key) {
            var data = this._data;

            if (isStr(key)) return data[key];

            var ret = {};
            _each(key, function (val) {
                ret[val] = data[val];
            });

            return ret;
        },
        remove: function remove(key) {
            key = toArr(key);

            var data = this._data;

            _each(key, function (val) {
                delete data[val];
            });

            this.save(data);
        },
        clear: function clear() {
            this._data = {};

            this.save(this._data);
        },
        each: function each(fn) {
            _each(this._data, fn);
        },
        // This methods exists to be overwritten.
        save: function save(data) {
            this._data = data;
        }
    });

    return exports;
}({});

/* ------------------------------ orientation ------------------------------ */

var orientation = exports.orientation = _.orientation = function (exports) {
    /* Screen orientation helper.
     *
     * ### on
     *
     * Bind change event.
     *  
     * ### off 
     * 
     * Unbind change event.
     * 
     * ### get
     * 
     * Get current orientation(landscape or portrait).
     * 
     * ```javascript
     * orientation.on('change', function (direction) 
     * {
     *     console.log(direction); // -> 'portrait'
     * });
     * orientation.get(); // -> 'landscape'
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * Emitter safeGet 
     */

    var screen = window.screen;

    exports = {
        get: function get() {
            if (screen) {
                var orientation = safeGet(screen, 'orientation.type');
                if (orientation) return orientation.split('-').shift();
            }

            return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
        }
    };

    Emitter.mixin(exports);

    window.addEventListener('orientationchange', function () {
        setTimeout(function () {
            exports.emit('change', exports.get());
        }, 200);
    }, false);

    return exports;
}({});

/* ------------------------------ root ------------------------------ */

var root = exports.root = _.root = function (exports) {
    /* Root object reference, `global` in nodeJs, `window` in browser. */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isBrowser 
     */

    exports = isBrowser ? window : global;

    return exports;
}({});

/* ------------------------------ perfNow ------------------------------ */

var perfNow = exports.perfNow = _.perfNow = function (exports) {
    /* High resolution time up to microsecond precision.
     *
     * ```javascript
     * var start = perfNow();
     * 
     * // Do something.
     * 
     * console.log(perfNow() - start);
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * now root 
     */

    var performance = root.performance,
        process = root.process,
        loadTime;

    if (performance && performance.now) {
        exports = function exports() {
            return performance.now();
        };
    } else if (process && process.hrtime) {
        var getNanoSeconds = function getNanoSeconds() {
            var hr = process.hrtime();
            return hr[0] * 1e9 + hr[1];
        };
        loadTime = getNanoSeconds() - process.uptime() * 1e9;
        exports = function exports() {
            return (getNanoSeconds() - loadTime) / 1e6;
        };
    } else {
        loadTime = now();
        exports = function exports() {
            return now() - loadTime;
        };
    }

    return exports;
}({});

/* ------------------------------ toNum ------------------------------ */

var toNum = exports.toNum = _.toNum = function (exports) {
    /* Convert value to a number.
     *
     * |Name  |Type  |Desc            |
     * |------|------|----------------|
     * |val   |*     |Value to process|
     * |return|number|Resulted number |
     *
     * ```javascript
     * toNum('5'); // -> 5
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isNum isObj isFn isStr 
     */

    exports = function exports(val) {
        if (isNum(val)) return val;

        if (isObj(val)) {
            var temp = isFn(val.valueOf) ? val.valueOf() : val;
            val = isObj(temp) ? temp + '' : temp;
        }

        if (!isStr(val)) return val === 0 ? val : +val;

        return +val;
    };

    return exports;
}({});

/* ------------------------------ pxToNum ------------------------------ */

var pxToNum = exports.pxToNum = _.pxToNum = function () {
    /* dependencies
     * toNum 
     */

    function exports(str) {
        return toNum(str.replace('px', ''));
    }

    return exports;
}();

/* ------------------------------ toInt ------------------------------ */

var toInt = exports.toInt = _.toInt = function () {
    /* Convert value to an integer.
     *
     * |Name  |Type  |Desc             |
     * |------|------|-----------------|
     * |val   |*     |Value to convert |
     * |return|number|Converted integer|
     *
     * ```javascript
     * toInt(1.1); // -> 1
     * toInt(undefined); // -> 0
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * toNum 
     */

    function exports(val) {
        if (!val) return val === 0 ? val : 0;

        val = toNum(val);

        return val - val % 1;
    }

    return exports;
}();

/* ------------------------------ detectBrowser ------------------------------ */

var detectBrowser = exports.detectBrowser = _.detectBrowser = function () {
    /* Detect browser info using ua.
     *
     * |Name                    |Type  |Desc                              |
     * |------------------------|------|----------------------------------|
     * |[ua=navigator.userAgent]|string|Browser userAgent                 |
     * |return                  |object|Object containing name and version|
     * 
     * Browsers supported: ie, chrome, edge, firefox, opera, safari, ios(mobile safari), android(android browser)
     *
     * ```javascript
     * var browser = detectBrowser();
     * if (browser.name === 'ie' && browser.version < 9) 
     * {
     *     // Do something about old IE...
     * }
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * isBrowser toInt keys 
     */

    function exports(ua) {
        ua = ua || (isBrowser ? navigator.userAgent : '');
        ua = ua.toLowerCase();

        var ieVer = getVer(ua, 'msie ');

        if (ieVer) return {
            version: ieVer,
            name: 'ie'
        };

        if (regIe11.test(ua)) return {
            version: 11,
            name: 'ie'
        };

        for (var i = 0, len = browsers.length; i < len; i++) {
            var name = browsers[i],
                match = ua.match(regBrowsers[name]);

            if (match == null) continue;

            var version = toInt(match[1].split('.')[0]);

            if (name === 'opera') version = getVer(ua, 'version/') || version;

            return {
                name: name,
                version: version
            };
        }

        return {
            name: 'unknown',
            version: -1
        };
    }

    var regBrowsers = {
        'edge': /edge\/([0-9._]+)/,
        'firefox': /firefox\/([0-9.]+)(?:\s|$)/,
        'opera': /opera\/([0-9.]+)(?:\s|$)/,
        'android': /android\s([0-9.]+)/,
        'ios': /version\/([0-9._]+).*mobile.*safari.*/,
        'safari': /version\/([0-9._]+).*safari/,
        'chrome': /(?!chrom.*opr)chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/
    };

    var regIe11 = /trident\/7\./,
        browsers = keys(regBrowsers);

    function getVer(ua, mark) {
        var idx = ua.indexOf(mark);

        if (idx > -1) return toInt(ua.substring(idx + mark.length, ua.indexOf('.', idx)));
    }

    return exports;
}();

/* ------------------------------ rtrim ------------------------------ */

var rtrim = exports.rtrim = _.rtrim = function () {
    /* Remove chars or white-spaces from end of string.
     *
     * |Name  |Type        |Desc              |
     * |------|------------|------------------|
     * |str   |string      |String to trim    |
     * |chars |string array|Characters to trim|
     * |return|string      |Trimmed string    |
     *
     * ```javascript
     * rtrim(' abc  '); // -> ' abc'
     * rtrim('_abc_', '_'); // -> '_abc'
     * rtrim('_abc_', ['c', '_']); // -> '_ab'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var regSpace = /\s+$/;

    function exports(str, chars) {
        if (chars == null) return str.replace(regSpace, '');

        var end = str.length - 1,
            charLen = chars.length,
            found = true,
            i,
            c;

        while (found && end >= 0) {
            found = false;
            i = -1;
            c = str.charAt(end);

            while (++i < charLen) {
                if (c === chars[i]) {
                    found = true;
                    end--;
                    break;
                }
            }
        }

        return end >= 0 ? str.substring(0, end + 1) : '';
    }

    return exports;
}();

/* ------------------------------ trim ------------------------------ */

var trim = exports.trim = _.trim = function () {
    /* Remove chars or white-spaces from beginning end of string.
     *
     * |Name  |Type        |Desc              |
     * |------|------------|------------------|
     * |str   |string      |String to trim    |
     * |chars |string array|Characters to trim|
     * |return|string      |Trimmed string    |
     *
     * ```javascript
     * trim(' abc  '); // -> 'abc'
     * trim('_abc_', '_'); // -> 'abc'
     * trim('_abc_', ['a', 'c', '_']); // -> 'b'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * ltrim rtrim 
     */

    var regSpace = /^\s+|\s+$/g;

    function exports(str, chars) {
        if (chars == null) return str.replace(regSpace, '');

        return ltrim(rtrim(str, chars), chars);
    }

    return exports;
}();

/* ------------------------------ getFileName ------------------------------ */

var getFileName = exports.getFileName = _.getFileName = function () {
    /* dependencies
     * last trim 
     */

    function exports(url) {
        var ret = _last(url.split('/'));

        if (ret.indexOf('?') > -1) ret = trim(ret.split('?')[0]);

        return ret === '' ? 'unknown' : ret;
    }

    return exports;
}();

/* ------------------------------ query ------------------------------ */

var query = exports.query = _.query = function (exports) {
    /* Parse and stringify url query strings.
     *
     * ### parse
     *
     * Parse a query string into an object.
     *
     * |Name  |Type  |Desc        |
     * |------|------|------------|
     * |str   |string|Query string|
     * |return|object|Query object|
     *
     * ### stringify
     *
     * Stringify an object into a query string.
     *
     * |Name  |Type  |Desc        |
     * |------|------|------------|
     * |obj   |object|Query object|
     * |return|string|Query string|
     *
     * ```javascript
     * query.parse('foo=bar&eruda=true'); // -> {foo: 'bar', eruda: 'true'}
     * query.stringify({foo: 'bar', eruda: 'true'}); // -> 'foo=bar&eruda=true'
     * query.parse('name=eruda&name=eustia'); // -> {name: ['eruda', 'eustia']}
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * trim each isUndef isArr map isEmpty filter isObj 
     */

    exports = {
        parse: function parse(str) {
            var ret = {};

            str = trim(str).replace(regIllegalChars, '');

            _each(str.split('&'), function (param) {
                var parts = param.split('=');

                var key = parts.shift(),
                    val = parts.length > 0 ? parts.join('=') : null;

                key = decodeURIComponent(key);
                val = decodeURIComponent(val);

                if (isUndef(ret[key])) {
                    ret[key] = val;
                } else if (isArr(ret[key])) {
                    ret[key].push(val);
                } else {
                    ret[key] = [ret[key], val];
                }
            });

            return ret;
        },
        stringify: function stringify(obj, arrKey) {
            return filter(map(obj, function (val, key) {
                if (isObj(val) && isEmpty(val)) return '';
                if (isArr(val)) return exports.stringify(val, key);

                return (arrKey ? encodeURIComponent(arrKey) : encodeURIComponent(key)) + '=' + encodeURIComponent(val);
            }), function (str) {
                return str.length > 0;
            }).join('&');
        }
    };

    var regIllegalChars = /^(\?|#|&)/g;

    return exports;
}({});

/* ------------------------------ Url ------------------------------ */

var Url = exports.Url = _.Url = function (exports) {
    /* Simple url manipulator.
     *
     * ### constructor
     *
     * |Name                 |Type  |Desc      |
     * |---------------------|------|----------|
     * |[url=window.location]|string|Url string|
     *
     * ### setQuery
     *
     * Set query value.
     *
     * |Name  |Type  |Desc       |
     * |------|------|-----------|
     * |name  |string|Query name |
     * |value |string|Query value|
     * |return|Url   |this       |
     *
     * |Name  |Type  |Desc        |
     * |------|------|------------|
     * |names |object|query object|
     * |return|Url   |this        |
     *
     * ### rmQuery
     *
     * Remove query value.
     *
     * |Name  |Type        |Desc      |
     * |------|------------|----------|
     * |name  |string array|Query name|
     * |return|Url         |this      |
     *
     * ### parse
     *
     * [static] Parse url into an object.
     *
     * |Name  |Type  |Desc      |
     * |------|------|----------|
     * |url   |string|Url string|
     * |return|object|Url object|
     *
     * ### stringify
     *
     * [static] Stringify url object into a string.
     *
     * |Name  |Type  |Desc      |
     * |------|------|----------|
     * |url   |object|Url object|
     * |return|string|Url string|
     *
     * An url object contains the following properties:
     *
     * |Name    |Desc                                                                                  |
     * |--------|--------------------------------------------------------------------------------------|
     * |protocol|The protocol scheme of the URL (e.g. http:)                                           |
     * |slashes |A boolean which indicates whether the protocol is followed by two forward slashes (//)|
     * |auth    |Authentication information portion (e.g. username:password)                           |
     * |hostname|Host name without port number                                                         |
     * |port    |Optional port number                                                                  |
     * |pathname|URL path                                                                              |
     * |query   |Parsed object containing query string                                                 |
     * |hash    |The "fragment" portion of the URL including the pound-sign (#)                        |
     *
     * ```javascript
     * var url = new Url('http://example.com:8080?eruda=true');
     * console.log(url.port); // -> '8080'
     * url.query.foo = 'bar';
     * url.rmQuery('eruda');
     * utl.toString(); // -> 'http://example.com:8080/?foo=bar'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * Class extend trim query isEmpty each isArr toArr 
     */

    exports = Class({
        className: 'Url',
        initialize: function initialize(url) {
            extend(this, exports.parse(url || window.location.href));
        },
        setQuery: function setQuery(name, val) {
            var query = this.query;

            if (isObj(name)) {
                _each(name, function (val, key) {
                    query[key] = val;
                });
            } else {
                query[name] = val;
            }

            return this;
        },
        rmQuery: function rmQuery(name) {
            var query = this.query;

            if (!isArr(name)) name = toArr(name);
            _each(name, function (key) {
                delete query[key];
            });

            return this;
        },
        toString: function toString() {
            return exports.stringify(this);
        }
    }, {
        parse: function parse(url) {
            var ret = {
                protocol: '',
                auth: '',
                hostname: '',
                hash: '',
                query: {},
                port: '',
                pathname: '',
                slashes: false
            },
                rest = trim(url);

            var proto = rest.match(regProto);
            if (proto) {
                proto = proto[0];
                ret.protocol = proto.toLowerCase();
                rest = rest.substr(proto.length);
            }

            if (proto) {
                var slashes = rest.substr(0, 2) === '//';
                if (slashes) {
                    rest = rest.slice(2);
                    ret.slashes = true;
                }
            }

            if (slashes) {
                var hostEnd = -1;
                for (var i = 0, len = hostEndingChars.length; i < len; i++) {
                    var pos = rest.indexOf(hostEndingChars[i]);
                    if (pos !== -1 && (hostEnd === -1 || pos < hostEnd)) hostEnd = pos;
                }

                var host = rest.slice(0, hostEnd);
                rest = rest.slice(hostEnd);

                var atSign = host.lastIndexOf('@');

                if (atSign !== -1) {
                    ret.auth = decodeURIComponent(host.slice(0, atSign));
                    host = host.slice(atSign + 1);
                }

                ret.hostname = host;
                var port = host.match(regPort);
                if (port) {
                    port = port[0];
                    if (port !== ':') ret.port = port.substr(1);
                    ret.hostname = host.substr(0, host.length - port.length);
                }
            }

            var hash = rest.indexOf('#');

            if (hash !== -1) {
                ret.hash = rest.substr(hash);
                rest = rest.slice(0, hash);
            }

            var queryMark = rest.indexOf('?');

            if (queryMark !== -1) {
                ret.query = query.parse(rest.substr(queryMark + 1));
                rest = rest.slice(0, queryMark);
            }

            ret.pathname = rest || '/';

            return ret;
        },
        stringify: function stringify(obj) {
            var ret = obj.protocol + (obj.slashes ? '//' : '') + (obj.auth ? encodeURIComponent(obj.auth) + '@' : '') + obj.hostname + (obj.port ? ':' + obj.port : '') + obj.pathname;

            if (!isEmpty(obj.query)) ret += '?' + query.stringify(obj.query);
            if (obj.hash) ret += obj.hash;

            return ret;
        }
    });

    var regProto = /^([a-z0-9.+-]+:)/i,
        regPort = /:[0-9]*$/,
        hostEndingChars = ['/', '?', '#'];

    return exports;
}({});

/* ------------------------------ ajax ------------------------------ */

var ajax = exports.ajax = _.ajax = function () {
    /* Perform an asynchronous HTTP request.
     *
     * |Name   |Type  |Desc        |
     * |-------|------|------------|
     * |options|object|Ajax options|
     *
     * Available options:
     *
     * |Name         |Type         |Desc                    |
     * |-------------|-------------|------------------------|
     * |url          |string       |Request url             |
     * |data         |string object|Request data            |
     * |dataType=json|string       |Response type(json, xml)|
     * |success      |function     |Success callback        |
     * |error        |function     |Error callback          |
     * |complete     |function     |Callback after request  |
     * |timeout      |number       |Request timeout         |
     *
     * ### get
     *
     * Shortcut for type = GET;
     *
     * ### post
     *
     * Shortcut for type = POST;
     *
     * |Name    |Type         |Desc            |
     * |--------|-------------|----------------|
     * |url     |string       |Request url     |
     * |[data]  |string object|Request data    |
     * |success |function     |Success callback|
     * |dataType|function     |Response type   |
     *
     * ```javascript
     * ajax({
     *     url: 'http://example.com',
     *     data: {test: 'true'},
     *     error: function () {},
     *     success: function (data)
     *     {
     *         // ...
     *     },
     *     dataType: 'json'
     * });
     *
     * ajax.get('http://example.com', {}, function (data)
     * {
     *     // ...
     * });
     * ```
     */

    /* module
     * env: browser
     * test: manual
     */

    /* dependencies
     * isFn noop defaults isObj query 
     */

    function exports(options) {
        defaults(options, exports.setting);

        var type = options.type,
            url = options.url,
            data = options.data,
            dataType = options.dataType,
            success = options.success,
            error = options.error,
            timeout = options.timeout,
            complete = options.complete,
            xhr = options.xhr(),
            abortTimeout;

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;

            clearTimeout(abortTimeout);

            var result;

            var status = xhr.status;
            if (status >= 200 && status < 300 || status === 304) {
                result = xhr.responseText;
                if (dataType === 'xml') result = xhr.responseXML;
                try {
                    if (dataType === 'json') result = JSON.parse(result);
                    /* eslint-disable no-empty */
                } catch (e) {}
                success(result, xhr);
            } else {
                error(xhr);
            }

            complete(xhr);
        };

        if (type === 'GET') {
            data = query.stringify(data);
            url += url.indexOf('?') > -1 ? '&' + data : '?' + data;
        } else {
            if (isObj(data)) data = query.stringify(data);
        }

        xhr.open(type, url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        if (timeout > 0) {
            abortTimeout = setTimeout(function () {
                xhr.onreadystatechange = noop;
                xhr.abort();
                error(xhr, 'timeout');
                complete(xhr);
            }, timeout);
        }
        xhr.send(type === 'GET' ? null : data);

        return xhr;
    }

    exports.setting = {
        type: 'GET',
        success: noop,
        error: noop,
        complete: noop,
        dataType: 'json',
        data: {},
        xhr: function xhr() {
            return new XMLHttpRequest();
        },
        timeout: 0
    };

    exports.get = function () {
        return exports(parseArgs.apply(null, arguments));
    };

    exports.post = function () {
        var options = parseArgs.apply(null, arguments);
        options.type = 'POST';

        return exports(options);
    };

    function parseArgs(url, data, success, dataType) {
        if (isFn(data)) {
            dataType = success;
            success = data;
            data = {};
        }

        return {
            url: url,
            data: data,
            success: success,
            dataType: dataType
        };
    }

    return exports;
}();

/* ------------------------------ type ------------------------------ */

var type = exports.type = _.type = function () {
    /* Determine the internal JavaScript [[Class]] of an object.
     *
     * |Name  |Type  |Desc                      |
     * |------|------|--------------------------|
     * |val   |*     |Value to get type         |
     * |return|string|Type of object, lowercased|
     *
     * ```javascript
     * type(5); // -> 'number'
     * type({}); // -> 'object'
     * type(function () {}); // -> 'function'
     * type([]); // -> 'array'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * objToStr isNaN 
     */

    function exports(val) {
        if (val === null) return 'null';
        if (val === undefined) return 'undefined';
        if (isNaN(val)) return 'nan';

        var ret = objToStr(val).match(regObj);

        if (!ret) return '';

        return ret[1].toLowerCase();
    }

    var regObj = /^\[object\s+(.*?)]$/;

    return exports;
}();

/* ------------------------------ stringify ------------------------------ */

var stringify = exports.stringify = _.stringify = function () {
    /* JSON stringify with support for circular object, function etc.
     *
     * Undefined is treated as null value.
     *  
     * |Name  |Type  |Desc               |
     * |------|------|-------------------|
     * |obj   |object|Object to stringify|
     * |spaces|number|Indent spaces      |
     * |return|string|Stringified object |
     * 
     * ```javascript
     * stringify({a: function () {}}); // -> '{"a":"[Function function () {}]"}'
     * var obj = {a: 1};
     * obj.b = obj;
     * stringify(obj); // -> '{"a":1,"b":"[Circular ~]"}'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * type upperFirst toStr isUndef isFn isRegExp 
     */

    function exports(obj, spaces) {
        return (0, _stringify2.default)(obj, serializer(), spaces);
    }

    function serializer() {
        var stack = [],
            keys = [];

        return function (key, val) {
            if (stack.length > 0) {
                var pos = stack.indexOf(this);
                if (pos > -1) {
                    stack.splice(pos + 1);
                    keys.splice(pos, Infinity, key);
                } else {
                    stack.push(this);
                    keys.push(key);
                }

                var valPos = stack.indexOf(val);
                if (valPos > -1) {
                    if (stack[0] === val) {
                        val = '[Circular ~]';
                    } else {
                        val = '[Circular ~.' + keys.slice(0, valPos).join('.') + ']';
                    }
                }
            } else {
                stack.push(val);
            }

            if (isRegExp(val) || isFn(val)) {
                val = '[' + upperFirst(type(val)) + ' ' + toStr(val) + ']';
            } else if (isUndef(val)) {
                val = null;
            }

            return val;
        };
    }

    return exports;
}();

/* ------------------------------ LocalStore ------------------------------ */

var LocalStore = exports.LocalStore = _.LocalStore = function (exports) {
    /* LocalStorage wrapper.
     * 
     * Extend from Store.
     * 
     * ### constructor
     * 
     * |Name|Type  |Desc                  |
     * |----|------|----------------------|
     * |name|string|LocalStorage item name|
     * |data|object|Default data          |
     * 
     * ```javascript
     * var store = new LocalStore('eris');
     * store.set('name', 'eris');
     * ```
     */

    /* module
     * env: browser
     * test: browser
     */

    /* dependencies
     * Store safeStorage isEmpty stringify defaults isObj 
     */

    var localStorage = safeStorage('local');

    exports = Store.extend({
        initialize: function LocalStore(name, data) {
            this._name = name;

            var localData = localStorage.getItem(name);
            try {
                localData = JSON.parse(localData);
            } catch (e) {
                localData = {};
            }
            if (!isObj(localData)) localData = {};
            data = defaults(localData, data);
            this.callSuper(Store, 'initialize', [data]);
        },
        save: function save(data) {
            if (isEmpty(data)) return localStorage.removeItem(this._name);
            localStorage.setItem(this._name, stringify(data));
        }
    });

    return exports;
}({});

/* ------------------------------ stripHtmlTag ------------------------------ */

var stripHtmlTag = exports.stripHtmlTag = _.stripHtmlTag = function () {
    /* Strip html tags from a string.
     *
     * |Name  |Type  |Desc           |
     * |------|------|---------------|
     * |str   |string|String to strip|
     * |return|string|Resulted string|
     *
     * ```javascript
     * stripHtmlTag('<p>Hello</p>'); // -> 'Hello'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var regHtmlTag = /<[^>]*>/g;

    function exports(str) {
        return str.replace(regHtmlTag, '');
    }

    return exports;
}();

/* ------------------------------ uniqId ------------------------------ */

var uniqId = exports.uniqId = _.uniqId = function () {
    /* Generate a globally-unique id.
     *
     * |Name  |Type  |Desc              |
     * |------|------|------------------|
     * |prefix|string|Id prefix         |
     * |return|string|Globally-unique id|
     *
     * ```javascript
     * uniqId('eusita_'); // -> 'eustia_xxx'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    var idCounter = 0;

    function exports(prefix) {
        var id = ++idCounter + '';

        return prefix ? prefix + id : id;
    }

    return exports;
}();

/* ------------------------------ unique ------------------------------ */

var unique = exports.unique = _.unique = function () {
    /* Create duplicate-free version of an array.
     *
     * |Name     |Type    |Desc                         |
     * |---------|--------|-----------------------------|
     * |arr      |array   |Array to inspect             |
     * |[compare]|function|Function for comparing values|
     * |return   |array   |New duplicate free array     |
     *
     * ```javascript
     * unique([1, 2, 3, 1]); // -> [1, 2, 3]
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * filter 
     */

    function exports(arr, compare) {
        compare = compare || isEqual;

        return filter(arr, function (item, idx, arr) {
            var len = arr.length;

            while (++idx < len) {
                if (compare(item, arr[idx])) return false;
            }

            return true;
        });
    }

    function isEqual(a, b) {
        return a === b;
    }

    return exports;
}();

/* ------------------------------ viewportScale ------------------------------ */

var viewportScale = exports.viewportScale = _.viewportScale = function () {
    /* Get viewport scale.
     * 
     * ```javascript
     * viewportScale(); // -> 3
     * ```
     */

    /* dependencies
     * meta clamp trim each map 
     */

    function exports() {
        var viewport = meta('viewport');

        if (!viewport) return 1;

        viewport = map(viewport.split(','), function (val) {
            return trim(val);
        });

        var minScale = 0.25,
            maxScale = 5,
            initialScale = 1;

        _each(viewport, function (val) {
            val = val.split('=');

            var key = val[0];
            val = val[1];

            if (key === 'initial-scale') initialScale = +val;
            if (key === 'maximum-scale') maxScale = +val;
            if (key === 'minimum-scale') minScale = +val;
        });

        return clamp(initialScale, minScale, maxScale);
    }

    return exports;
}();

/* ------------------------------ wrap ------------------------------ */

var wrap = exports.wrap = _.wrap = function () {
    /* Wrap the function inside a wrapper function, passing it as the first argument.
     *
     * |Name   |Type    |Desc            |
     * |-------|--------|----------------|
     * |fn     |*       |Function to wrap|
     * |wrapper|function|Wrapper function|
     * |return |function|New function    |
     *
     * ```javascript
     * var p = wrap(escape, function(fn, text)
     * {
     *     return '<p>' + fn(text) + '</p>';
     * });
     * p('You & Me'); // -> '<p>You &amp; Me</p>'
     * ```
     */

    /* module
     * env: all
     * test: all
     */

    /* dependencies
     * partial 
     */

    function exports(fn, wrapper) {
        return partial(wrapper, fn);
    }

    return exports;
}();

exports.default = _;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(117), __webpack_require__(118)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(64);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**!

 @license
 handlebars v4.0.11

Copyright (C) 2011-2017 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Handlebars"] = factory();
	else
		root["Handlebars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(1)['default'];

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;

	var _handlebarsBase = __webpack_require__(3);

	var base = _interopRequireWildcard(_handlebarsBase);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _handlebarsSafeString = __webpack_require__(20);

	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

	var _handlebarsException = __webpack_require__(5);

	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

	var _handlebarsUtils = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_handlebarsUtils);

	var _handlebarsRuntime = __webpack_require__(21);

	var runtime = _interopRequireWildcard(_handlebarsRuntime);

	var _handlebarsNoConflict = __webpack_require__(33);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;

	var _utils = __webpack_require__(4);

	var _exception = __webpack_require__(5);

	var _exception2 = _interopRequireDefault(_exception);

	var _helpers = __webpack_require__(9);

	var _decorators = __webpack_require__(17);

	var _logger = __webpack_require__(19);

	var _logger2 = _interopRequireDefault(_logger);

	var VERSION = '4.0.11';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 7;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  }
	};

	var log = _logger2['default'].log;

	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	exports.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	exports.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(6)['default'];

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  try {
	    if (loc) {
	      this.lineNumber = line;

	      // Work around issue under safari where we can't directly set the column value
	      /* istanbul ignore next */
	      if (_Object$defineProperty) {
	        Object.defineProperty(this, 'column', {
	          value: column,
	          enumerable: true
	        });
	      } else {
	        this.column = column;
	      }
	    }
	  } catch (nop) {
	    /* Ignore if the browser is very particular */
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(8);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;

	var _helpersBlockHelperMissing = __webpack_require__(10);

	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

	var _helpersEach = __webpack_require__(11);

	var _helpersEach2 = _interopRequireDefault(_helpersEach);

	var _helpersHelperMissing = __webpack_require__(12);

	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

	var _helpersIf = __webpack_require__(13);

	var _helpersIf2 = _interopRequireDefault(_helpersIf);

	var _helpersLog = __webpack_require__(14);

	var _helpersLog2 = _interopRequireDefault(_helpersLog);

	var _helpersLookup = __webpack_require__(15);

	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

	var _helpersWith = __webpack_require__(16);

	var _helpersWith2 = _interopRequireDefault(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	var _exception = __webpack_require__(5);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey !== undefined) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;

	var _exception = __webpack_require__(5);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;

	var _decoratorsInline = __webpack_require__(18);

	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      if (!console[method]) {
	        // eslint-disable-line no-console
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports['default'] = logger;
	module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	// Build out our basic SafeString type
	'use strict';

	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$seal = __webpack_require__(22)['default'];

	var _interopRequireWildcard = __webpack_require__(1)['default'];

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _utils = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_utils);

	var _exception = __webpack_require__(5);

	var _exception2 = _interopRequireDefault(_exception);

	var _base = __webpack_require__(3);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },
	    // An empty object to use as replacement for null-contexts
	    nullContext: _Object$seal({}),

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }
	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = container.merge(options.decorators, env.decorators);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  // Use the current closure context to save the partial-block if this partial
	  var currentPartialBlock = options.data && options.data['partial-block'];
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    (function () {
	      options.data = _base.createFrame(options.data);
	      // Wrapper function to get access to currentPartialBlock from the closure
	      var fn = options.fn;
	      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        // Restore the partial-block from the closure for the execution of the block
	        // i.e. the part inside the block of the partial call.
	        options.data = _base.createFrame(options.data);
	        options.data['partial-block'] = currentPartialBlock;
	        return fn(context, options);
	      };
	      if (fn.partials) {
	        options.partials = Utils.extend({}, options.partials, fn.partials);
	      }
	    })();
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(24);
	module.exports = __webpack_require__(29).Object.seal;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(25);

	__webpack_require__(26)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(it) : it;
	  };
	});

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(27)
	  , core    = __webpack_require__(29)
	  , fails   = __webpack_require__(32);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(28)
	  , core      = __webpack_require__(29)
	  , ctx       = __webpack_require__(30)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(31);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	exports.__esModule = true;

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ })
/******/ ])
});
;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(106);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(71);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

exports.default = (0, _util.Class)({
    init: function init($el) {
        this._$el = $el;
    },
    show: function show() {
        this._$el.show();

        return this;
    },
    hide: function hide() {
        this._$el.hide();

        return this;
    },
    destroy: function destroy() {
        this._$el.remove();
    }
});

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(43)('wks');
var uid = __webpack_require__(29);
var Symbol = __webpack_require__(10).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var core = __webpack_require__(5);
var ctx = __webpack_require__(37);
var hide = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(14);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Tool2 = __webpack_require__(9);

var _Tool3 = _interopRequireDefault(_Tool2);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Settings = function (_Tool) {
    (0, _inherits3.default)(Settings, _Tool);

    function Settings() {
        (0, _classCallCheck3.default)(this, Settings);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Settings.__proto__ || (0, _getPrototypeOf2.default)(Settings)).call(this));

        _this._style = (0, _util.evalCss)(__webpack_require__(132));

        _this.name = 'settings';
        _this._switchTpl = __webpack_require__(133);
        _this._selectTpl = __webpack_require__(134);
        _this._rangeTpl = __webpack_require__(135);
        _this._colorTpl = __webpack_require__(136);
        _this._settings = [];
        return _this;
    }

    (0, _createClass3.default)(Settings, [{
        key: 'init',
        value: function init($el) {
            (0, _get3.default)(Settings.prototype.__proto__ || (0, _getPrototypeOf2.default)(Settings.prototype), 'init', this).call(this, $el);

            this._bindEvent();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            (0, _get3.default)(Settings.prototype.__proto__ || (0, _getPrototypeOf2.default)(Settings.prototype), 'destroy', this).call(this);

            _util.evalCss.remove(this._style);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this._settings = [];
            this._$el.html('');
        }
    }, {
        key: 'switch',
        value: function _switch(config, key, desc) {
            this._settings.push({ config: config, key: key });

            this._$el.append(this._switchTpl({
                desc: desc, key: key,
                idx: this._settings.length - 1,
                val: config.get(key)
            }));

            return this;
        }
    }, {
        key: 'color',
        value: function color(config, key, desc) {
            var colors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['#2196f3', '#707d8b', '#f44336', '#009688', '#ffc107'];

            this._settings.push({ config: config, key: key });

            this._$el.append(this._colorTpl({
                desc: desc, colors: colors,
                idx: this._settings.length - 1,
                val: config.get(key)
            }));

            return this;
        }
    }, {
        key: 'select',
        value: function select(config, key, desc, selections) {
            this._settings.push({ config: config, key: key });

            this._$el.append(this._selectTpl({
                desc: desc, selections: selections,
                idx: this._settings.length - 1,
                val: config.get(key)
            }));

            return this;
        }
    }, {
        key: 'range',
        value: function range(config, key, desc, _ref) {
            var _ref$min = _ref.min,
                min = _ref$min === undefined ? 0 : _ref$min,
                _ref$max = _ref.max,
                max = _ref$max === undefined ? 1 : _ref$max,
                _ref$step = _ref.step,
                step = _ref$step === undefined ? 0.1 : _ref$step;

            this._settings.push({ config: config, key: key, min: min, max: max, step: step });

            var val = config.get(key);

            this._$el.append(this._rangeTpl({
                desc: desc, min: min, max: max, step: step, val: val,
                progress: progress(val, min, max),
                idx: this._settings.length - 1
            }));

            return this;
        }
    }, {
        key: 'separator',
        value: function separator() {
            this._$el.append('<div class="eruda-separator"></div>');

            return this;
        }
    }, {
        key: 'text',
        value: function text(_text) {
            this._$el.append('<div class="eruda-text">' + _text + '</div>');

            return this;
        }
    }, {
        key: '_closeAll',
        value: function _closeAll() {
            this._$el.find('.eruda-open').rmClass('eruda-open');
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var self = this;

            this._$el.on('click', '.eruda-checkbox', function () {
                var $input = (0, _util.$)(this).find('input'),
                    idx = $input.data('idx'),
                    val = $input.get(0).checked;

                var setting = self._settings[idx];
                setting.config.set(setting.key, val);
            }).on('click', '.eruda-select .eruda-head', function () {
                var $el = (0, _util.$)(this).parent().find('ul'),
                    isOpen = $el.hasClass('eruda-open');

                self._closeAll();
                isOpen ? $el.rmClass('eruda-open') : $el.addClass('eruda-open');
            }).on('click', '.eruda-select li', function () {
                var $this = (0, _util.$)(this),
                    $ul = $this.parent(),
                    val = $this.text(),
                    idx = $ul.data('idx'),
                    setting = self._settings[idx];

                $ul.rmClass('eruda-open');
                $ul.parent().find('.eruda-head span').text(val);

                setting.config.set(setting.key, val);
            }).on('click', '.eruda-range .eruda-head', function () {
                var $el = (0, _util.$)(this).parent().find('.eruda-input-container'),
                    isOpen = $el.hasClass('eruda-open');

                self._closeAll();
                isOpen ? $el.rmClass('eruda-open') : $el.addClass('eruda-open');
            }).on('change', '.eruda-range input', function () {
                var $this = (0, _util.$)(this),
                    $container = $this.parent(),
                    idx = $container.data('idx'),
                    val = +$this.val(),
                    setting = self._settings[idx];

                setting.config.set(setting.key, val);
            }).on('input', '.eruda-range input', function () {
                var $this = (0, _util.$)(this),
                    $container = $this.parent(),
                    idx = $container.data('idx'),
                    val = +$this.val(),
                    setting = self._settings[idx],
                    min = setting.min,
                    max = setting.max;


                $container.parent().find('.eruda-head span').text(val);
                $container.find('.eruda-range-track-progress').css('width', progress(val, min, max) + '%');
            }).on('click', '.eruda-color .eruda-head', function () {
                var $el = (0, _util.$)(this).parent().find('ul'),
                    isOpen = $el.hasClass('eruda-open');

                self._closeAll();
                isOpen ? $el.rmClass('eruda-open') : $el.addClass('eruda-open');
            }).on('click', '.eruda-color li', function () {
                var $this = (0, _util.$)(this),
                    $ul = $this.parent(),
                    val = $this.css('background-color'),
                    idx = $ul.data('idx'),
                    setting = self._settings[idx];

                $ul.rmClass('eruda-open');
                $ul.parent().find('.eruda-head span').css('background-color', val);

                setting.config.set(setting.key, val);
            });
        }
    }], [{
        key: 'createCfg',
        value: function createCfg(name, data) {
            return new _util.LocalStore('eruda-' + name, data);
        }
    }]);
    return Settings;
}(_Tool3.default);

exports.default = Settings;


var progress = function progress(val, min, max) {
    return ((val - min) / (max - min) * 100).toFixed(2);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(34);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(21);
var IE8_DOM_DEFINE = __webpack_require__(60);
var toPrimitive = __webpack_require__(39);
var dP = Object.defineProperty;

exports.f = __webpack_require__(17) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(22)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(62);
var defined = __webpack_require__(40);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(15);
var createDesc = __webpack_require__(27);
module.exports = __webpack_require__(17) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(61);
var enumBugKeys = __webpack_require__(44);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(12);
var core = __webpack_require__(5);
var fails = __webpack_require__(22);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(0);

var emitter = new _util.Emitter();
emitter.ADD = 'ADD';
emitter.SHOW = 'SHOW';
emitter.SCALE = 'SCALE';

module.exports = emitter;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(40);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(90);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(98);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(119), __esModule: true };

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var logger = void 0;

exports.default = logger = new _util.Logger('[Eruda]',  false ? 'warn' : 'debug');


logger.formatter = function (type, argList) {
    argList.unshift(this.name);

    return argList;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(80);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
var document = __webpack_require__(10).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(43)('keys');
var uid = __webpack_require__(29);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 45 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(92)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(65)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(21);
var dPs = __webpack_require__(94);
var enumBugKeys = __webpack_require__(44);
var IE_PROTO = __webpack_require__(42)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(38)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(67).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(15).f;
var has = __webpack_require__(18);
var TAG = __webpack_require__(11)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
var global = __webpack_require__(10);
var hide = __webpack_require__(20);
var Iterators = __webpack_require__(25);
var TO_STRING_TAG = __webpack_require__(11)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(11);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var core = __webpack_require__(5);
var LIBRARY = __webpack_require__(47);
var wksExt = __webpack_require__(51);
var defineProperty = __webpack_require__(15).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(30);
var createDesc = __webpack_require__(27);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(39);
var has = __webpack_require__(18);
var IE8_DOM_DEFINE = __webpack_require__(60);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(17) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(148), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = highlight;

var _util = __webpack_require__(0);

// https://github.com/trentrichardson/jQuery-Litelighter
function highlight(str, lang) {
    lang = lang || 'js';

    str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    lang = language[lang];

    var subLangSi = 0,
        subLangs = [];

    (0, _util.each)(lang, function (val) {
        if (!val.language) return;

        str = str.replace(val.re, function ($1, $2) {
            subLangs[subLangSi++] = highlight($2, val.language);
            return $1.replace($2, '___subtmpl' + (subLangSi - 1) + '___');
        });
    });

    (0, _util.each)(lang, function (val, key) {
        if (language[val.language]) return;

        str = str.replace(val.re, '___' + key + '___$1___end' + key + '___');
    });

    var levels = [];

    str = str.replace(/___(?!subtmpl)\w+?___/g, function ($0) {
        var end = $0.substr(3, 3) === 'end',
            tag = (!end ? $0.substr(3) : $0.substr(6)).replace(/_/g, ''),
            lastTag = levels.length > 0 ? levels[levels.length - 1] : null;

        if (!end && (lastTag == null || tag == lastTag || lastTag != null && lang[lastTag] && lang[lastTag].embed != undefined && lang[lastTag].embed.indexOf(tag) > -1)) {
            levels.push(tag);

            return $0;
        } else if (end && tag == lastTag) {
            levels.pop();

            return $0;
        }

        return '';
    });

    (0, _util.each)(lang, function (val, key) {
        str = str.replace(new RegExp('___end' + key + '___', 'g'), '</span>').replace(new RegExp('___' + key + '___', 'g'), '<span style="' + style[val.style] + '">');
    });

    (0, _util.each)(lang, function (val) {
        if (!val.language) return;

        str = str.replace(/___subtmpl\d+___/g, function ($tmpl) {
            var i = parseInt($tmpl.replace(/___subtmpl(\d+)___/, '$1'), 10);

            return subLangs[i];
        });
    });

    return str;
}

var style = {
    comment: 'color:#63a35c;',
    string: 'color:#183691;',
    number: 'color:#0086b3;',
    keyword: 'color:#a71d5d;',
    operators: 'color:#a71d5d;'
};

var language = {};

language.js = {
    comment: { re: /(\/\/.*|\/\*([\s\S]*?)\*\/)/g, style: 'comment' },
    string: { re: /(('.*?')|(".*?"))/g, style: 'string' },
    numbers: { re: /(-?(\d+|\d+\.\d+|\.\d+))/g, style: 'number' },
    keywords: { re: /(?:\b)(function|for|foreach|while|if|else|elseif|switch|break|as|return|this|class|self|default|var|false|true|null|undefined)(?:\b)/gi, style: 'keyword' },
    operators: { re: /(\+|-|\/|\*|%|=|&lt;|&gt;|\||\?|\.)/g, style: 'operators' }
};

language.html = {
    comment: { re: /(&lt;!--([\s\S]*?)--&gt;)/g, style: 'comment' },
    tag: { re: /(&lt;\/?\w(.|\n)*?\/?&gt;)/g, style: 'keyword', embed: ['string'] },
    string: language.js.string,
    css: { re: /(?:&lt;style.*?&gt;)([\s\S]*)?(?:&lt;\/style&gt;)/gi, language: 'css' },
    script: { re: /(?:&lt;script.*?&gt;)([\s\S]*?)(?:&lt;\/script&gt;)/gi, language: 'js' }
};

language.css = {
    comment: language.js.comment,
    string: language.js.string,
    numbers: { re: /((-?(\d+|\d+\.\d+|\.\d+)(%|px|em|pt|in)?)|#[0-9a-fA-F]{3}[0-9a-fA-F]{3})/g, style: 'number' },
    keywords: { re: /(@\w+|:?:\w+|[a-z-]+:)/g, style: 'keyword' }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/

/**
The following batches are equivalent:

var beautify_js = require('js-beautify');
var beautify_js = require('js-beautify').js;
var beautify_js = require('js-beautify').js_beautify;

var beautify_css = require('js-beautify').css;
var beautify_css = require('js-beautify').css_beautify;

var beautify_html = require('js-beautify').html;
var beautify_html = require('js-beautify').html_beautify;

All methods returned accept two arguments, the source string and an options object.
**/

function get_beautify(js_beautify, css_beautify, html_beautify) {
    // the default is js
    var beautify = function(src, config) {
        return js_beautify.js_beautify(src, config);
    };

    // short aliases
    beautify.js = js_beautify.js_beautify;
    beautify.css = css_beautify.css_beautify;
    beautify.html = html_beautify.html_beautify;

    // legacy aliases
    beautify.js_beautify = js_beautify.js_beautify;
    beautify.css_beautify = css_beautify.css_beautify;
    beautify.html_beautify = html_beautify.html_beautify;

    return beautify;
}

if (true) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(58),
        __webpack_require__(59),
        __webpack_require__(151)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function(js_beautify, css_beautify, html_beautify) {
        return get_beautify(js_beautify, css_beautify, html_beautify);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
    (function(mod) {
        var js_beautify = require('./lib/beautify');
        var css_beautify = require('./lib/beautify-css');
        var html_beautify = require('./lib/beautify-html');

        mod.exports = get_beautify(js_beautify, css_beautify, html_beautify);

    })(module);
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/* see js/src/javascript/index.js */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 JS Beautifier
---------------


  Written by Einar Lielmanis, <einar@jsbeautifier.org>
      http://jsbeautifier.org/

  Originally converted to javascript by Vital, <vital76@gmail.com>
  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>
  Parsing improvements for brace-less statements by Liam Newman <bitwiseman@gmail.com>


  Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4)          - indentation size,
    indent_char (default space)      - character to indent with,
    preserve_newlines (default true) - whether existing line breaks should be preserved,
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

            jslint_happy        !jslint_happy
            ---------------------------------
            function ()         function()

            switch () {         switch() {
            case 1:               case 1:
              break;                break;
            }                   }

    space_after_anon_function (default false) - should the space before an anonymous function's parens be added, "function()" vs "function ()",
          NOTE: This option is overriden by jslint_happy (i.e. if jslint_happy is true, space_after_anon_function is true by design)

    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none" | any of the former + ",preserve-inline"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
            preserve-inline will try to preserve inline blocks of curly braces

    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
                be preserved if it were present.

    end_with_newline (default false)  - end output with a newline


    e.g

    js_beautify(js_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });

*/

(function() {
var legacy_beautify_js =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* jshint curly: false */
// This section of code is taken from acorn.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
    // permit $ (36) and @ (64). @ is used in ES7 decorators.
    if (code < 65) return code === 36 || code === 64;
    // 65 through 91 are uppercase letters.
    if (code < 91) return true;
    // permit _ (95).
    if (code < 97) return code === 95;
    // 97 through 123 are lowercase letters.
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var mergeOpts = __webpack_require__(3).mergeOpts;
var acorn = __webpack_require__(0);
var Output = __webpack_require__(4).Output;
var Tokenizer = __webpack_require__(7).Tokenizer;

function remove_redundant_indentation(output, frame) {
    // This implementation is effective but has some issues:
    //     - can cause line wrap to happen too soon due to indent removal
    //           after wrap points are calculated
    // These issues are minor compared to ugly indentation.

    if (frame.multiline_frame ||
        frame.mode === MODE.ForInitializer ||
        frame.mode === MODE.Conditional) {
        return;
    }

    // remove one indent from each line inside this section
    var start_index = frame.start_line_index;

    output.remove_indent(start_index);
}

function in_array(what, arr) {
    for (var i = 0; i < arr.length; i += 1) {
        if (arr[i] === what) {
            return true;
        }
    }
    return false;
}

function trim(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function ltrim(s) {
    return s.replace(/^\s+/g, '');
}

// function rtrim(s) {
//     return s.replace(/\s+$/g, '');
// }


function generateMapFromStrings(list) {
    var result = {};
    for (var x = 0; x < list.length; x++) {
        // make the mapped names underscored instead of dash
        result[list[x].replace(/-/g, '_')] = list[x];
    }
    return result;
}

function sanitizeOperatorPosition(opPosition) {
    opPosition = opPosition || OPERATOR_POSITION.before_newline;

    if (!in_array(opPosition, validPositionValues)) {
        throw new Error("Invalid Option Value: The option 'operator_position' must be one of the following values\n" +
            validPositionValues +
            "\nYou passed in: '" + opPosition + "'");
    }

    return opPosition;
}

var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];

// Generate map from array
var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);

var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];

var MODE = {
    BlockStatement: 'BlockStatement', // 'BLOCK'
    Statement: 'Statement', // 'STATEMENT'
    ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
    ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
    ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
    Conditional: 'Conditional', //'(COND-EXPRESSION)',
    Expression: 'Expression' //'(EXPRESSION)'
};

function Beautifier(js_source_text, options) {
    "use strict";
    var output;
    var tokens = [],
        token_pos;
    var tokenizer;
    var current_token;
    var last_type, last_last_text, indent_string;
    var flags, previous_flags, flag_store;
    var prefix;

    var handlers, opt;
    var baseIndentString = '';

    handlers = {
        'TK_START_EXPR': handle_start_expr,
        'TK_END_EXPR': handle_end_expr,
        'TK_START_BLOCK': handle_start_block,
        'TK_END_BLOCK': handle_end_block,
        'TK_WORD': handle_word,
        'TK_RESERVED': handle_word,
        'TK_SEMICOLON': handle_semicolon,
        'TK_STRING': handle_string,
        'TK_EQUALS': handle_equals,
        'TK_OPERATOR': handle_operator,
        'TK_COMMA': handle_comma,
        'TK_BLOCK_COMMENT': handle_block_comment,
        'TK_COMMENT': handle_comment,
        'TK_DOT': handle_dot,
        'TK_UNKNOWN': handle_unknown,
        'TK_EOF': handle_eof
    };

    function create_flags(flags_base, mode) {
        var next_indent_level = 0;
        if (flags_base) {
            next_indent_level = flags_base.indentation_level;
            if (!output.just_added_newline() &&
                flags_base.line_indent_level > next_indent_level) {
                next_indent_level = flags_base.line_indent_level;
            }
        }

        var next_flags = {
            mode: mode,
            parent: flags_base,
            last_text: flags_base ? flags_base.last_text : '', // last token text
            last_word: flags_base ? flags_base.last_word : '', // last 'TK_WORD' passed
            declaration_statement: false,
            declaration_assignment: false,
            multiline_frame: false,
            inline_frame: false,
            if_block: false,
            else_block: false,
            do_block: false,
            do_while: false,
            import_block: false,
            in_case_statement: false, // switch(..){ INSIDE HERE }
            in_case: false, // we're on the exact line with "case 0:"
            case_body: false, // the indented case-action block
            indentation_level: next_indent_level,
            line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
            start_line_index: output.get_line_number(),
            ternary_depth: 0
        };
        return next_flags;
    }

    // Some interpreters have unexpected results with foo = baz || bar;
    options = options ? options : {};

    // Allow the setting of language/file-type specific options
    // with inheritance of overall settings
    options = mergeOpts(options, 'js');

    opt = {};

    // compatibility, re
    if (options.brace_style === "expand-strict") { //graceful handling of deprecated option
        options.brace_style = "expand";
    } else if (options.brace_style === "collapse-preserve-inline") { //graceful handling of deprecated option
        options.brace_style = "collapse,preserve-inline";
    } else if (options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
        options.brace_style = options.braces_on_own_line ? "expand" : "collapse";
    } else if (!options.brace_style) { //Nothing exists to set it
        options.brace_style = "collapse";
    }

    //preserve-inline in delimited string will trigger brace_preserve_inline, everything
    //else is considered a brace_style and the last one only will have an effect
    var brace_style_split = options.brace_style.split(/[^a-zA-Z0-9_\-]+/);
    opt.brace_preserve_inline = false; //Defaults in case one or other was not specified in meta-option
    opt.brace_style = "collapse";
    for (var bs = 0; bs < brace_style_split.length; bs++) {
        if (brace_style_split[bs] === "preserve-inline") {
            opt.brace_preserve_inline = true;
        } else {
            opt.brace_style = brace_style_split[bs];
        }
    }

    opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
    opt.indent_char = options.indent_char ? options.indent_char : ' ';
    opt.eol = options.eol ? options.eol : 'auto';
    opt.preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
    opt.unindent_chained_methods = (options.unindent_chained_methods === undefined) ? false : options.unindent_chained_methods;
    opt.break_chained_methods = (options.break_chained_methods === undefined) ? false : options.break_chained_methods;
    opt.max_preserve_newlines = (options.max_preserve_newlines === undefined) ? 0 : parseInt(options.max_preserve_newlines, 10);
    opt.space_in_paren = (options.space_in_paren === undefined) ? false : options.space_in_paren;
    opt.space_in_empty_paren = (options.space_in_empty_paren === undefined) ? false : options.space_in_empty_paren;
    opt.jslint_happy = (options.jslint_happy === undefined) ? false : options.jslint_happy;
    opt.space_after_anon_function = (options.space_after_anon_function === undefined) ? false : options.space_after_anon_function;
    opt.keep_array_indentation = (options.keep_array_indentation === undefined) ? false : options.keep_array_indentation;
    opt.space_before_conditional = (options.space_before_conditional === undefined) ? true : options.space_before_conditional;
    opt.unescape_strings = (options.unescape_strings === undefined) ? false : options.unescape_strings;
    opt.wrap_line_length = (options.wrap_line_length === undefined) ? 0 : parseInt(options.wrap_line_length, 10);
    opt.e4x = (options.e4x === undefined) ? false : options.e4x;
    opt.end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
    opt.comma_first = (options.comma_first === undefined) ? false : options.comma_first;
    opt.operator_position = sanitizeOperatorPosition(options.operator_position);

    // For testing of beautify ignore:start directive
    opt.test_output_raw = (options.test_output_raw === undefined) ? false : options.test_output_raw;

    // force opt.space_after_anon_function to true if opt.jslint_happy
    if (opt.jslint_happy) {
        opt.space_after_anon_function = true;
    }

    if (options.indent_with_tabs) {
        opt.indent_char = '\t';
        opt.indent_size = 1;
    }

    if (opt.eol === 'auto') {
        opt.eol = '\n';
        if (js_source_text && acorn.lineBreak.test(js_source_text || '')) {
            opt.eol = js_source_text.match(acorn.lineBreak)[0];
        }
    }

    opt.eol = opt.eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

    //----------------------------------
    indent_string = '';
    while (opt.indent_size > 0) {
        indent_string += opt.indent_char;
        opt.indent_size -= 1;
    }

    var preindent_index = 0;
    if (js_source_text && js_source_text.length) {
        while ((js_source_text.charAt(preindent_index) === ' ' ||
                js_source_text.charAt(preindent_index) === '\t')) {
            preindent_index += 1;
        }
        baseIndentString = js_source_text.substring(0, preindent_index);
        js_source_text = js_source_text.substring(preindent_index);
    }

    last_type = 'TK_START_BLOCK'; // last token type
    last_last_text = ''; // pre-last token text
    output = new Output(indent_string, baseIndentString);

    // If testing the ignore directive, start with output disable set to true
    output.raw = opt.test_output_raw;


    // Stack of parsing/formatting states, including MODE.
    // We tokenize, parse, and output in an almost purely a forward-only stream of token input
    // and formatted output.  This makes the beautifier less accurate than full parsers
    // but also far more tolerant of syntax errors.
    //
    // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
    // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
    // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
    // most full parsers would die, but the beautifier gracefully falls back to
    // MODE.BlockStatement and continues on.
    flag_store = [];
    set_mode(MODE.BlockStatement);

    this.beautify = function() {

        /*jshint onevar:true */
        var sweet_code;
        tokenizer = new Tokenizer(js_source_text, opt, indent_string);
        tokens = tokenizer.tokenize();
        token_pos = 0;

        current_token = get_token();
        while (current_token) {
            handlers[current_token.type]();

            last_last_text = flags.last_text;
            last_type = current_token.type;
            flags.last_text = current_token.text;

            token_pos += 1;
            current_token = get_token();
        }

        sweet_code = output.get_code(opt.end_with_newline, opt.eol);

        return sweet_code;
    };

    function handle_whitespace_and_comments(local_token, preserve_statement_flags) {
        var newlines = local_token.newlines;
        var keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);
        var temp_token = current_token;

        for (var h = 0; h < local_token.comments_before.length; h++) {
            // The cleanest handling of inline comments is to treat them as though they aren't there.
            // Just continue formatting and the behavior should be logical.
            // Also ignore unknown tokens.  Again, this should result in better behavior.
            current_token = local_token.comments_before[h];
            handle_whitespace_and_comments(current_token, preserve_statement_flags);
            handlers[current_token.type](preserve_statement_flags);
        }
        current_token = temp_token;

        if (keep_whitespace) {
            for (var i = 0; i < newlines; i += 1) {
                print_newline(i > 0, preserve_statement_flags);
            }
        } else {
            if (opt.max_preserve_newlines && newlines > opt.max_preserve_newlines) {
                newlines = opt.max_preserve_newlines;
            }

            if (opt.preserve_newlines) {
                if (local_token.newlines > 1) {
                    print_newline(false, preserve_statement_flags);
                    for (var j = 1; j < newlines; j += 1) {
                        print_newline(true, preserve_statement_flags);
                    }
                }
            }
        }

    }

    // we could use just string.split, but
    // IE doesn't like returning empty strings
    function split_linebreaks(s) {
        //return s.split(/\x0d\x0a|\x0a/);

        s = s.replace(acorn.allLineBreaks, '\n');
        var out = [],
            idx = s.indexOf("\n");
        while (idx !== -1) {
            out.push(s.substring(0, idx));
            s = s.substring(idx + 1);
            idx = s.indexOf("\n");
        }
        if (s.length) {
            out.push(s);
        }
        return out;
    }

    var newline_restricted_tokens = ['break', 'continue', 'return', 'throw', 'yield'];

    function allow_wrap_or_preserved_newline(force_linewrap) {
        force_linewrap = (force_linewrap === undefined) ? false : force_linewrap;

        // Never wrap the first token on a line
        if (output.just_added_newline()) {
            return;
        }

        var shouldPreserveOrForce = (opt.preserve_newlines && current_token.wanted_newline) || force_linewrap;
        var operatorLogicApplies = in_array(flags.last_text, tokenizer.positionable_operators) || in_array(current_token.text, tokenizer.positionable_operators);

        if (operatorLogicApplies) {
            var shouldPrintOperatorNewline = (
                    in_array(flags.last_text, tokenizer.positionable_operators) &&
                    in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)
                ) ||
                in_array(current_token.text, tokenizer.positionable_operators);
            shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
        }

        if (shouldPreserveOrForce) {
            print_newline(false, true);
        } else if (opt.wrap_line_length) {
            if (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens)) {
                // These tokens should never have a newline inserted
                // between them and the following expression.
                return;
            }
            var proposed_line_length = output.current_line.get_character_count() + current_token.text.length +
                (output.space_before_token ? 1 : 0);
            if (proposed_line_length >= opt.wrap_line_length) {
                print_newline(false, true);
            }
        }
    }

    function print_newline(force_newline, preserve_statement_flags) {
        if (!preserve_statement_flags) {
            if (flags.last_text !== ';' && flags.last_text !== ',' && flags.last_text !== '=' && last_type !== 'TK_OPERATOR') {
                var next_token = get_token(1);
                while (flags.mode === MODE.Statement &&
                    !(flags.if_block && next_token && next_token.type === 'TK_RESERVED' && next_token.text === 'else') &&
                    !flags.do_block) {
                    restore_mode();
                }
            }
        }

        if (output.add_new_line(force_newline)) {
            flags.multiline_frame = true;
        }
    }

    function print_token_line_indentation() {
        if (output.just_added_newline()) {
            if (opt.keep_array_indentation && is_array(flags.mode) && current_token.wanted_newline) {
                output.current_line.push(current_token.whitespace_before);
                output.space_before_token = false;
            } else if (output.set_indent(flags.indentation_level)) {
                flags.line_indent_level = flags.indentation_level;
            }
        }
    }

    function print_token(printable_token) {
        if (output.raw) {
            output.add_raw_token(current_token);
            return;
        }

        if (opt.comma_first && last_type === 'TK_COMMA' &&
            output.just_added_newline()) {
            if (output.previous_line.last() === ',') {
                var popped = output.previous_line.pop();
                // if the comma was already at the start of the line,
                // pull back onto that line and reprint the indentation
                if (output.previous_line.is_empty()) {
                    output.previous_line.push(popped);
                    output.trim(true);
                    output.current_line.pop();
                    output.trim();
                }

                // add the comma in front of the next token
                print_token_line_indentation();
                output.add_token(',');
                output.space_before_token = true;
            }
        }

        printable_token = printable_token || current_token.text;
        print_token_line_indentation();
        output.add_token(printable_token);
    }

    function indent() {
        flags.indentation_level += 1;
    }

    function deindent() {
        if (flags.indentation_level > 0 &&
            ((!flags.parent) || flags.indentation_level > flags.parent.indentation_level)) {
            flags.indentation_level -= 1;

        }
    }

    function set_mode(mode) {
        if (flags) {
            flag_store.push(flags);
            previous_flags = flags;
        } else {
            previous_flags = create_flags(null, mode);
        }

        flags = create_flags(previous_flags, mode);
    }

    function is_array(mode) {
        return mode === MODE.ArrayLiteral;
    }

    function is_expression(mode) {
        return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
    }

    function restore_mode() {
        if (flag_store.length > 0) {
            previous_flags = flags;
            flags = flag_store.pop();
            if (previous_flags.mode === MODE.Statement && !opt.unindent_chained_methods) {
                remove_redundant_indentation(output, previous_flags);
            }
        }
    }

    function start_of_object_property() {
        return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && (
            (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set'])));
    }

    function start_of_statement() {
        if (
            (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') ||
            (last_type === 'TK_RESERVED' && flags.last_text === 'do') ||
            (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens) && !current_token.wanted_newline) ||
            (last_type === 'TK_RESERVED' && flags.last_text === 'else' &&
                !(current_token.type === 'TK_RESERVED' && current_token.text === 'if' && !current_token.comments_before.length)) ||
            (last_type === 'TK_END_EXPR' && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional)) ||
            (last_type === 'TK_WORD' && flags.mode === MODE.BlockStatement &&
                !flags.in_case &&
                !(current_token.text === '--' || current_token.text === '++') &&
                last_last_text !== 'function' &&
                current_token.type !== 'TK_WORD' && current_token.type !== 'TK_RESERVED') ||
            (flags.mode === MODE.ObjectLiteral && (
                (flags.last_text === ':' && flags.ternary_depth === 0) || (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set']))))
        ) {

            set_mode(MODE.Statement);
            if (!opt.unindent_chained_methods) {
                indent();
            }

            handle_whitespace_and_comments(current_token, true);

            // Issue #276:
            // If starting a new statement with [if, for, while, do], push to a new line.
            // if (a) if (b) if(c) d(); else e(); else f();
            if (!start_of_object_property()) {
                allow_wrap_or_preserved_newline(
                    current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['do', 'for', 'if', 'while']));
            }

            return true;
        }
        return false;
    }

    function all_lines_start_with(lines, c) {
        for (var i = 0; i < lines.length; i++) {
            var line = trim(lines[i]);
            if (line.charAt(0) !== c) {
                return false;
            }
        }
        return true;
    }

    function each_line_matches_indent(lines, indent) {
        var i = 0,
            len = lines.length,
            line;
        for (; i < len; i++) {
            line = lines[i];
            // allow empty lines to pass through
            if (line && line.indexOf(indent) !== 0) {
                return false;
            }
        }
        return true;
    }

    function is_special_word(word) {
        return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
    }

    function get_token(offset) {
        var index = token_pos + (offset || 0);
        return (index < 0 || index >= tokens.length) ? null : tokens[index];
    }

    function handle_start_expr() {
        // The conditional starts the statement if appropriate.
        if (!start_of_statement()) {
            handle_whitespace_and_comments(current_token);
        }

        var next_mode = MODE.Expression;
        if (current_token.text === '[') {

            if (last_type === 'TK_WORD' || flags.last_text === ')') {
                // this is array index specifier, break immediately
                // a[x], fn()[x]
                if (last_type === 'TK_RESERVED' && in_array(flags.last_text, tokenizer.line_starters)) {
                    output.space_before_token = true;
                }
                set_mode(next_mode);
                print_token();
                indent();
                if (opt.space_in_paren) {
                    output.space_before_token = true;
                }
                return;
            }

            next_mode = MODE.ArrayLiteral;
            if (is_array(flags.mode)) {
                if (flags.last_text === '[' ||
                    (flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}'))) {
                    // ], [ goes to new line
                    // }, [ goes to new line
                    if (!opt.keep_array_indentation) {
                        print_newline();
                    }
                }
            }

        } else {
            if (last_type === 'TK_RESERVED' && flags.last_text === 'for') {
                next_mode = MODE.ForInitializer;
            } else if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['if', 'while'])) {
                next_mode = MODE.Conditional;
            } else {
                // next_mode = MODE.Expression;
            }
        }

        if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
            print_newline();
        } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
            // TODO: Consider whether forcing this is required.  Review failing tests when removed.
            allow_wrap_or_preserved_newline(current_token.wanted_newline);
            // do nothing on (( and )( and ][ and ]( and .(
        } else if (!(last_type === 'TK_RESERVED' && current_token.text === '(') && last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
            output.space_before_token = true;
        } else if ((last_type === 'TK_RESERVED' && (flags.last_word === 'function' || flags.last_word === 'typeof')) ||
            (flags.last_text === '*' &&
                (in_array(last_last_text, ['function', 'yield']) ||
                    (flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))))) {
            // function() vs function ()
            // yield*() vs yield* ()
            // function*() vs function* ()
            if (opt.space_after_anon_function) {
                output.space_before_token = true;
            }
        } else if (last_type === 'TK_RESERVED' && (in_array(flags.last_text, tokenizer.line_starters) || flags.last_text === 'catch')) {
            if (opt.space_before_conditional) {
                output.space_before_token = true;
            }
        }

        // Should be a space between await and an IIFE, or async and an arrow function
        if (current_token.text === '(' && last_type === 'TK_RESERVED' && in_array(flags.last_word, ['await', 'async'])) {
            output.space_before_token = true;
        }

        // Support of this kind of newline preservation.
        // a = (b &&
        //     (c || d));
        if (current_token.text === '(') {
            if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                if (!start_of_object_property()) {
                    allow_wrap_or_preserved_newline();
                }
            }
        }

        // Support preserving wrapped arrow function expressions
        // a.b('c',
        //     () => d.e
        // )
        if (current_token.text === '(' && last_type !== 'TK_WORD' && last_type !== 'TK_RESERVED') {
            allow_wrap_or_preserved_newline();
        }

        set_mode(next_mode);
        print_token();
        if (opt.space_in_paren) {
            output.space_before_token = true;
        }

        // In all cases, if we newline while inside an expression it should be indented.
        indent();
    }

    function handle_end_expr() {
        // statements inside expressions are not valid syntax, but...
        // statements must all be closed when their container closes
        while (flags.mode === MODE.Statement) {
            restore_mode();
        }

        handle_whitespace_and_comments(current_token);

        if (flags.multiline_frame) {
            allow_wrap_or_preserved_newline(current_token.text === ']' && is_array(flags.mode) && !opt.keep_array_indentation);
        }

        if (opt.space_in_paren) {
            if (last_type === 'TK_START_EXPR' && !opt.space_in_empty_paren) {
                // () [] no inner space in empty parens like these, ever, ref #320
                output.trim();
                output.space_before_token = false;
            } else {
                output.space_before_token = true;
            }
        }
        if (current_token.text === ']' && opt.keep_array_indentation) {
            print_token();
            restore_mode();
        } else {
            restore_mode();
            print_token();
        }
        remove_redundant_indentation(output, previous_flags);

        // do {} while () // no statement required after
        if (flags.do_while && previous_flags.mode === MODE.Conditional) {
            previous_flags.mode = MODE.Expression;
            flags.do_block = false;
            flags.do_while = false;

        }
    }

    function handle_start_block() {
        handle_whitespace_and_comments(current_token);

        // Check if this is should be treated as a ObjectLiteral
        var next_token = get_token(1);
        var second_token = get_token(2);
        if (second_token && (
                (in_array(second_token.text, [':', ',']) && in_array(next_token.type, ['TK_STRING', 'TK_WORD', 'TK_RESERVED'])) ||
                (in_array(next_token.text, ['get', 'set', '...']) && in_array(second_token.type, ['TK_WORD', 'TK_RESERVED']))
            )) {
            // We don't support TypeScript,but we didn't break it for a very long time.
            // We'll try to keep not breaking it.
            if (!in_array(last_last_text, ['class', 'interface'])) {
                set_mode(MODE.ObjectLiteral);
            } else {
                set_mode(MODE.BlockStatement);
            }
        } else if (last_type === 'TK_OPERATOR' && flags.last_text === '=>') {
            // arrow function: (param1, paramN) => { statements }
            set_mode(MODE.BlockStatement);
        } else if (in_array(last_type, ['TK_EQUALS', 'TK_START_EXPR', 'TK_COMMA', 'TK_OPERATOR']) ||
            (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['return', 'throw', 'import', 'default']))
        ) {
            // Detecting shorthand function syntax is difficult by scanning forward,
            //     so check the surrounding context.
            // If the block is being returned, imported, export default, passed as arg,
            //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
            set_mode(MODE.ObjectLiteral);
        } else {
            set_mode(MODE.BlockStatement);
        }

        var empty_braces = !next_token.comments_before.length && next_token.text === '}';
        var empty_anonymous_function = empty_braces && flags.last_word === 'function' &&
            last_type === 'TK_END_EXPR';

        if (opt.brace_preserve_inline) // check for inline, set inline_frame if so
        {
            // search forward for a newline wanted inside this block
            var index = 0;
            var check_token = null;
            flags.inline_frame = true;
            do {
                index += 1;
                check_token = get_token(index);
                if (check_token.wanted_newline) {
                    flags.inline_frame = false;
                    break;
                }
            } while (check_token.type !== 'TK_EOF' &&
                !(check_token.type === 'TK_END_BLOCK' && check_token.opened === current_token));
        }

        if ((opt.brace_style === "expand" ||
                (opt.brace_style === "none" && current_token.wanted_newline)) &&
            !flags.inline_frame) {
            if (last_type !== 'TK_OPERATOR' &&
                (empty_anonymous_function ||
                    last_type === 'TK_EQUALS' ||
                    (last_type === 'TK_RESERVED' && is_special_word(flags.last_text) && flags.last_text !== 'else'))) {
                output.space_before_token = true;
            } else {
                print_newline(false, true);
            }
        } else { // collapse || inline_frame
            if (is_array(previous_flags.mode) && (last_type === 'TK_START_EXPR' || last_type === 'TK_COMMA')) {
                if (last_type === 'TK_COMMA' || opt.space_in_paren) {
                    output.space_before_token = true;
                }

                if (last_type === 'TK_COMMA' || (last_type === 'TK_START_EXPR' && flags.inline_frame)) {
                    allow_wrap_or_preserved_newline();
                    previous_flags.multiline_frame = previous_flags.multiline_frame || flags.multiline_frame;
                    flags.multiline_frame = false;
                }
            }
            if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
                if (last_type === 'TK_START_BLOCK' && !flags.inline_frame) {
                    print_newline();
                } else {
                    output.space_before_token = true;
                }
            }
        }
        print_token();
        indent();
    }

    function handle_end_block() {
        // statements must all be closed when their container closes
        handle_whitespace_and_comments(current_token);

        while (flags.mode === MODE.Statement) {
            restore_mode();
        }

        var empty_braces = last_type === 'TK_START_BLOCK';

        if (flags.inline_frame && !empty_braces) { // try inline_frame (only set if opt.braces-preserve-inline) first
            output.space_before_token = true;
        } else if (opt.brace_style === "expand") {
            if (!empty_braces) {
                print_newline();
            }
        } else {
            // skip {}
            if (!empty_braces) {
                if (is_array(flags.mode) && opt.keep_array_indentation) {
                    // we REALLY need a newline here, but newliner would skip that
                    opt.keep_array_indentation = false;
                    print_newline();
                    opt.keep_array_indentation = true;

                } else {
                    print_newline();
                }
            }
        }
        restore_mode();
        print_token();
    }

    function handle_word() {
        if (current_token.type === 'TK_RESERVED') {
            if (in_array(current_token.text, ['set', 'get']) && flags.mode !== MODE.ObjectLiteral) {
                current_token.type = 'TK_WORD';
            } else if (in_array(current_token.text, ['as', 'from']) && !flags.import_block) {
                current_token.type = 'TK_WORD';
            } else if (flags.mode === MODE.ObjectLiteral) {
                var next_token = get_token(1);
                if (next_token.text === ':') {
                    current_token.type = 'TK_WORD';
                }
            }
        }

        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
            if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') {
                flags.declaration_statement = true;
            }
        } else if (current_token.wanted_newline && !is_expression(flags.mode) &&
            (last_type !== 'TK_OPERATOR' || (flags.last_text === '--' || flags.last_text === '++')) &&
            last_type !== 'TK_EQUALS' &&
            (opt.preserve_newlines || !(last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {
            handle_whitespace_and_comments(current_token);
            print_newline();
        } else {
            handle_whitespace_and_comments(current_token);
        }

        if (flags.do_block && !flags.do_while) {
            if (current_token.type === 'TK_RESERVED' && current_token.text === 'while') {
                // do {} ## while ()
                output.space_before_token = true;
                print_token();
                output.space_before_token = true;
                flags.do_while = true;
                return;
            } else {
                // do {} should always have while as the next word.
                // if we don't see the expected while, recover
                print_newline();
                flags.do_block = false;
            }
        }

        // if may be followed by else, or not
        // Bare/inline ifs are tricky
        // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
        if (flags.if_block) {
            if (!flags.else_block && (current_token.type === 'TK_RESERVED' && current_token.text === 'else')) {
                flags.else_block = true;
            } else {
                while (flags.mode === MODE.Statement) {
                    restore_mode();
                }
                flags.if_block = false;
                flags.else_block = false;
            }
        }

        if (current_token.type === 'TK_RESERVED' && (current_token.text === 'case' || (current_token.text === 'default' && flags.in_case_statement))) {
            print_newline();
            if (flags.case_body || opt.jslint_happy) {
                // switch cases following one another
                deindent();
                flags.case_body = false;
            }
            print_token();
            flags.in_case = true;
            flags.in_case_statement = true;
            return;
        }

        if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
            if (!start_of_object_property()) {
                allow_wrap_or_preserved_newline();
            }
        }

        if (current_token.type === 'TK_RESERVED' && current_token.text === 'function') {
            if (in_array(flags.last_text, ['}', ';']) ||
                (output.just_added_newline() && !(in_array(flags.last_text, ['(', '[', '{', ':', '=', ',']) || last_type === 'TK_OPERATOR'))) {
                // make sure there is a nice clean space of at least one blank line
                // before a new function definition
                if (!output.just_added_blankline() && !current_token.comments_before.length) {
                    print_newline();
                    print_newline(true);
                }
            }
            if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
                if (last_type === 'TK_RESERVED' && (
                        in_array(flags.last_text, ['get', 'set', 'new', 'export', 'async']) ||
                        in_array(flags.last_text, newline_restricted_tokens))) {
                    output.space_before_token = true;
                } else if (last_type === 'TK_RESERVED' && flags.last_text === 'default' && last_last_text === 'export') {
                    output.space_before_token = true;
                } else {
                    print_newline();
                }
            } else if (last_type === 'TK_OPERATOR' || flags.last_text === '=') {
                // foo = function
                output.space_before_token = true;
            } else if (!flags.multiline_frame && (is_expression(flags.mode) || is_array(flags.mode))) {
                // (function
            } else {
                print_newline();
            }

            print_token();
            flags.last_word = current_token.text;
            return;
        }

        prefix = 'NONE';

        if (last_type === 'TK_END_BLOCK') {

            if (previous_flags.inline_frame) {
                prefix = 'SPACE';
            } else if (!(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally', 'from']))) {
                prefix = 'NEWLINE';
            } else {
                if (opt.brace_style === "expand" ||
                    opt.brace_style === "end-expand" ||
                    (opt.brace_style === "none" && current_token.wanted_newline)) {
                    prefix = 'NEWLINE';
                } else {
                    prefix = 'SPACE';
                    output.space_before_token = true;
                }
            }
        } else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
            // TODO: Should this be for STATEMENT as well?
            prefix = 'NEWLINE';
        } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
            prefix = 'SPACE';
        } else if (last_type === 'TK_STRING') {
            prefix = 'NEWLINE';
        } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' ||
            (flags.last_text === '*' &&
                (in_array(last_last_text, ['function', 'yield']) ||
                    (flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))))) {
            prefix = 'SPACE';
        } else if (last_type === 'TK_START_BLOCK') {
            if (flags.inline_frame) {
                prefix = 'SPACE';
            } else {
                prefix = 'NEWLINE';
            }
        } else if (last_type === 'TK_END_EXPR') {
            output.space_before_token = true;
            prefix = 'NEWLINE';
        }

        if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
            if (flags.inline_frame || flags.last_text === 'else' || flags.last_text === 'export') {
                prefix = 'SPACE';
            } else {
                prefix = 'NEWLINE';
            }

        }

        if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally'])) {
            if ((!(last_type === 'TK_END_BLOCK' && previous_flags.mode === MODE.BlockStatement) ||
                    opt.brace_style === "expand" ||
                    opt.brace_style === "end-expand" ||
                    (opt.brace_style === "none" && current_token.wanted_newline)) &&
                !flags.inline_frame) {
                print_newline();
            } else {
                output.trim(true);
                var line = output.current_line;
                // If we trimmed and there's something other than a close block before us
                // put a newline back in.  Handles '} // comment' scenario.
                if (line.last() !== '}') {
                    print_newline();
                }
                output.space_before_token = true;
            }
        } else if (prefix === 'NEWLINE') {
            if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
                // no newline between 'return nnn'
                output.space_before_token = true;
            } else if (last_type !== 'TK_END_EXPR') {
                if ((last_type !== 'TK_START_EXPR' || !(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['var', 'let', 'const']))) && flags.last_text !== ':') {
                    // no need to force newline on 'var': for (var x = 0...)
                    if (current_token.type === 'TK_RESERVED' && current_token.text === 'if' && flags.last_text === 'else') {
                        // no newline for } else if {
                        output.space_before_token = true;
                    } else {
                        print_newline();
                    }
                }
            } else if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
                print_newline();
            }
        } else if (flags.multiline_frame && is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
            print_newline(); // }, in lists get a newline treatment
        } else if (prefix === 'SPACE') {
            output.space_before_token = true;
        }
        print_token();
        flags.last_word = current_token.text;

        if (current_token.type === 'TK_RESERVED') {
            if (current_token.text === 'do') {
                flags.do_block = true;
            } else if (current_token.text === 'if') {
                flags.if_block = true;
            } else if (current_token.text === 'import') {
                flags.import_block = true;
            } else if (flags.import_block && current_token.type === 'TK_RESERVED' && current_token.text === 'from') {
                flags.import_block = false;
            }
        }
    }

    function handle_semicolon() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
            // Semicolon can be the start (and end) of a statement
            output.space_before_token = false;
        } else {
            handle_whitespace_and_comments(current_token);
        }

        var next_token = get_token(1);
        while (flags.mode === MODE.Statement &&
            !(flags.if_block && next_token && next_token.type === 'TK_RESERVED' && next_token.text === 'else') &&
            !flags.do_block) {
            restore_mode();
        }

        // hacky but effective for the moment
        if (flags.import_block) {
            flags.import_block = false;
        }
        print_token();
    }

    function handle_string() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
            // One difference - strings want at least a space before
            output.space_before_token = true;
        } else {
            handle_whitespace_and_comments(current_token);
            if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' || flags.inline_frame) {
                output.space_before_token = true;
            } else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                if (!start_of_object_property()) {
                    allow_wrap_or_preserved_newline();
                }
            } else {
                print_newline();
            }
        }
        print_token();
    }

    function handle_equals() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        } else {
            handle_whitespace_and_comments(current_token);
        }

        if (flags.declaration_statement) {
            // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
            flags.declaration_assignment = true;
        }
        output.space_before_token = true;
        print_token();
        output.space_before_token = true;
    }

    function handle_comma() {
        handle_whitespace_and_comments(current_token, true);

        print_token();
        output.space_before_token = true;
        if (flags.declaration_statement) {
            if (is_expression(flags.parent.mode)) {
                // do not break on comma, for(var a = 1, b = 2)
                flags.declaration_assignment = false;
            }

            if (flags.declaration_assignment) {
                flags.declaration_assignment = false;
                print_newline(false, true);
            } else if (opt.comma_first) {
                // for comma-first, we want to allow a newline before the comma
                // to turn into a newline after the comma, which we will fixup later
                allow_wrap_or_preserved_newline();
            }
        } else if (flags.mode === MODE.ObjectLiteral ||
            (flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral)) {
            if (flags.mode === MODE.Statement) {
                restore_mode();
            }

            if (!flags.inline_frame) {
                print_newline();
            }
        } else if (opt.comma_first) {
            // EXPR or DO_BLOCK
            // for comma-first, we want to allow a newline before the comma
            // to turn into a newline after the comma, which we will fixup later
            allow_wrap_or_preserved_newline();
        }
    }

    function handle_operator() {
        var isGeneratorAsterisk = current_token.text === '*' &&
            ((last_type === 'TK_RESERVED' && in_array(flags.last_text, ['function', 'yield'])) ||
                (in_array(last_type, ['TK_START_BLOCK', 'TK_COMMA', 'TK_END_BLOCK', 'TK_SEMICOLON']))
            );
        var isUnary = in_array(current_token.text, ['-', '+']) && (
            in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) ||
            in_array(flags.last_text, tokenizer.line_starters) ||
            flags.last_text === ','
        );

        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        } else {
            var preserve_statement_flags = !isGeneratorAsterisk;
            handle_whitespace_and_comments(current_token, preserve_statement_flags);
        }

        if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
            // "return" had a special handling in TK_WORD. Now we need to return the favor
            output.space_before_token = true;
            print_token();
            return;
        }

        // hack for actionscript's import .*;
        if (current_token.text === '*' && last_type === 'TK_DOT') {
            print_token();
            return;
        }

        if (current_token.text === '::') {
            // no spaces around exotic namespacing syntax operator
            print_token();
            return;
        }

        // Allow line wrapping between operators when operator_position is
        //   set to before or preserve
        if (last_type === 'TK_OPERATOR' && in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
            allow_wrap_or_preserved_newline();
        }

        if (current_token.text === ':' && flags.in_case) {
            flags.case_body = true;
            indent();
            print_token();
            print_newline();
            flags.in_case = false;
            return;
        }

        var space_before = true;
        var space_after = true;
        var in_ternary = false;
        if (current_token.text === ':') {
            if (flags.ternary_depth === 0) {
                // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
                space_before = false;
            } else {
                flags.ternary_depth -= 1;
                in_ternary = true;
            }
        } else if (current_token.text === '?') {
            flags.ternary_depth += 1;
        }

        // let's handle the operator_position option prior to any conflicting logic
        if (!isUnary && !isGeneratorAsterisk && opt.preserve_newlines && in_array(current_token.text, tokenizer.positionable_operators)) {
            var isColon = current_token.text === ':';
            var isTernaryColon = (isColon && in_ternary);
            var isOtherColon = (isColon && !in_ternary);

            switch (opt.operator_position) {
                case OPERATOR_POSITION.before_newline:
                    // if the current token is : and it's not a ternary statement then we set space_before to false
                    output.space_before_token = !isOtherColon;

                    print_token();

                    if (!isColon || isTernaryColon) {
                        allow_wrap_or_preserved_newline();
                    }

                    output.space_before_token = true;
                    return;

                case OPERATOR_POSITION.after_newline:
                    // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
                    //   then print a newline.

                    output.space_before_token = true;

                    if (!isColon || isTernaryColon) {
                        if (get_token(1).wanted_newline) {
                            print_newline(false, true);
                        } else {
                            allow_wrap_or_preserved_newline();
                        }
                    } else {
                        output.space_before_token = false;
                    }

                    print_token();

                    output.space_before_token = true;
                    return;

                case OPERATOR_POSITION.preserve_newline:
                    if (!isOtherColon) {
                        allow_wrap_or_preserved_newline();
                    }

                    // if we just added a newline, or the current token is : and it's not a ternary statement,
                    //   then we set space_before to false
                    space_before = !(output.just_added_newline() || isOtherColon);

                    output.space_before_token = space_before;
                    print_token();
                    output.space_before_token = true;
                    return;
            }
        }

        if (isGeneratorAsterisk) {
            allow_wrap_or_preserved_newline();
            space_before = false;
            var next_token = get_token(1);
            space_after = next_token && in_array(next_token.type, ['TK_WORD', 'TK_RESERVED']);
        } else if (current_token.text === '...') {
            allow_wrap_or_preserved_newline();
            space_before = last_type === 'TK_START_BLOCK';
            space_after = false;
        } else if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
            // unary operators (and binary +/- pretending to be unary) special cases

            space_before = false;
            space_after = false;

            // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
            // if there is a newline between -- or ++ and anything else we should preserve it.
            if (current_token.wanted_newline && (current_token.text === '--' || current_token.text === '++')) {
                print_newline(false, true);
            }

            if (flags.last_text === ';' && is_expression(flags.mode)) {
                // for (;; ++i)
                //        ^^^
                space_before = true;
            }

            if (last_type === 'TK_RESERVED') {
                space_before = true;
            } else if (last_type === 'TK_END_EXPR') {
                space_before = !(flags.last_text === ']' && (current_token.text === '--' || current_token.text === '++'));
            } else if (last_type === 'TK_OPERATOR') {
                // a++ + ++b;
                // a - -b
                space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(flags.last_text, ['--', '-', '++', '+']);
                // + and - are not unary when preceeded by -- or ++ operator
                // a-- + b
                // a * +b
                // a - -b
                if (in_array(current_token.text, ['+', '-']) && in_array(flags.last_text, ['--', '++'])) {
                    space_after = true;
                }
            }


            if (((flags.mode === MODE.BlockStatement && !flags.inline_frame) || flags.mode === MODE.Statement) &&
                (flags.last_text === '{' || flags.last_text === ';')) {
                // { foo; --i }
                // foo(); --bar;
                print_newline();
            }
        }

        output.space_before_token = output.space_before_token || space_before;
        print_token();
        output.space_before_token = space_after;
    }

    function handle_block_comment(preserve_statement_flags) {
        if (output.raw) {
            output.add_raw_token(current_token);
            if (current_token.directives && current_token.directives.preserve === 'end') {
                // If we're testing the raw output behavior, do not allow a directive to turn it off.
                output.raw = opt.test_output_raw;
            }
            return;
        }

        if (current_token.directives) {
            print_newline(false, preserve_statement_flags);
            print_token();
            if (current_token.directives.preserve === 'start') {
                output.raw = true;
            }
            print_newline(false, true);
            return;
        }

        // inline block
        if (!acorn.newline.test(current_token.text) && !current_token.wanted_newline) {
            output.space_before_token = true;
            print_token();
            output.space_before_token = true;
            return;
        }

        var lines = split_linebreaks(current_token.text);
        var j; // iterator for this case
        var javadoc = false;
        var starless = false;
        var lastIndent = current_token.whitespace_before;
        var lastIndentLength = lastIndent.length;

        // block comment starts with a new line
        print_newline(false, preserve_statement_flags);
        if (lines.length > 1) {
            javadoc = all_lines_start_with(lines.slice(1), '*');
            starless = each_line_matches_indent(lines.slice(1), lastIndent);
        }

        // first line always indented
        print_token(lines[0]);
        for (j = 1; j < lines.length; j++) {
            print_newline(false, true);
            if (javadoc) {
                // javadoc: reformat and re-indent
                print_token(' ' + ltrim(lines[j]));
            } else if (starless && lines[j].length > lastIndentLength) {
                // starless: re-indent non-empty content, avoiding trim
                print_token(lines[j].substring(lastIndentLength));
            } else {
                // normal comments output raw
                output.add_token(lines[j]);
            }
        }

        // for comments of more than one line, make sure there's a new line after
        print_newline(false, preserve_statement_flags);
    }

    function handle_comment(preserve_statement_flags) {
        if (current_token.wanted_newline) {
            print_newline(false, preserve_statement_flags);
        } else {
            output.trim(true);
        }

        output.space_before_token = true;
        print_token();
        print_newline(false, preserve_statement_flags);
    }

    function handle_dot() {
        if (start_of_statement()) {
            // The conditional starts the statement if appropriate.
        } else {
            handle_whitespace_and_comments(current_token, true);
        }

        if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
            output.space_before_token = true;
        } else {
            // allow preserved newlines before dots in general
            // force newlines on dots after close paren when break_chained - for bar().baz()
            allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
        }

        print_token();
    }

    function handle_unknown(preserve_statement_flags) {
        print_token();

        if (current_token.text[current_token.text.length - 1] === '\n') {
            print_newline(false, preserve_statement_flags);
        }
    }

    function handle_eof() {
        // Unwind any open statements
        while (flags.mode === MODE.Statement) {
            restore_mode();
        }
        handle_whitespace_and_comments(current_token);
    }
}

module.exports.Beautifier = Beautifier;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function InputScanner(input) {
    var _input = input;
    var _input_length = _input.length;
    var _position = 0;

    this.back = function() {
        _position -= 1;
    };

    this.hasNext = function() {
        return _position < _input_length;
    };

    this.next = function() {
        var val = null;
        if (this.hasNext()) {
            val = _input.charAt(_position);
            _position += 1;
        }
        return val;
    };

    this.peek = function(index) {
        var val = null;
        index = index || 0;
        index += _position;
        if (index >= 0 && index < _input_length) {
            val = _input.charAt(index);
        }
        return val;
    };

    this.peekCharCode = function(index) {
        var val = 0;
        index = index || 0;
        index += _position;
        if (index >= 0 && index < _input_length) {
            val = _input.charCodeAt(index);
        }
        return val;
    };

    this.test = function(pattern, index) {
        index = index || 0;
        pattern.lastIndex = _position + index;
        return pattern.test(_input);
    };

    this.testChar = function(pattern, index) {
        var val = this.peek(index);
        return val !== null && pattern.test(val);
    };

    this.match = function(pattern) {
        pattern.lastIndex = _position;
        var pattern_match = pattern.exec(_input);
        if (pattern_match && pattern_match.index === _position) {
            _position += pattern_match[0].length;
        } else {
            pattern_match = null;
        }
        return pattern_match;
    };
}


module.exports.InputScanner = InputScanner;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function mergeOpts(allOptions, targetType) {
    var finalOpts = {};
    var name;

    for (name in allOptions) {
        if (name !== targetType) {
            finalOpts[name] = allOptions[name];
        }
    }

    //merge in the per type settings for the targetType
    if (targetType in allOptions) {
        for (name in allOptions[targetType]) {
            finalOpts[name] = allOptions[targetType][name];
        }
    }
    return finalOpts;
}

module.exports.mergeOpts = mergeOpts;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function OutputLine(parent) {
    var _character_count = 0;
    // use indent_count as a marker for lines that have preserved indentation
    var _indent_count = -1;

    var _items = [];
    var _empty = true;

    this.set_indent = function(level) {
        _character_count = parent.baseIndentLength + level * parent.indent_length;
        _indent_count = level;
    };

    this.get_character_count = function() {
        return _character_count;
    };

    this.is_empty = function() {
        return _empty;
    };

    this.last = function() {
        if (!this._empty) {
            return _items[_items.length - 1];
        } else {
            return null;
        }
    };

    this.push = function(input) {
        _items.push(input);
        _character_count += input.length;
        _empty = false;
    };

    this.pop = function() {
        var item = null;
        if (!_empty) {
            item = _items.pop();
            _character_count -= item.length;
            _empty = _items.length === 0;
        }
        return item;
    };

    this.remove_indent = function() {
        if (_indent_count > 0) {
            _indent_count -= 1;
            _character_count -= parent.indent_length;
        }
    };

    this.trim = function() {
        while (this.last() === ' ') {
            _items.pop();
            _character_count -= 1;
        }
        _empty = _items.length === 0;
    };

    this.toString = function() {
        var result = '';
        if (!this._empty) {
            if (_indent_count >= 0) {
                result = parent.indent_cache[_indent_count];
            }
            result += _items.join('');
        }
        return result;
    };
}

function Output(indent_string, baseIndentString) {
    baseIndentString = baseIndentString || '';
    this.indent_cache = [baseIndentString];
    this.baseIndentLength = baseIndentString.length;
    this.indent_length = indent_string.length;
    this.raw = false;

    var lines = [];
    this.baseIndentString = baseIndentString;
    this.indent_string = indent_string;
    this.previous_line = null;
    this.current_line = null;
    this.space_before_token = false;

    this.add_outputline = function() {
        this.previous_line = this.current_line;
        this.current_line = new OutputLine(this);
        lines.push(this.current_line);
    };

    // initialize
    this.add_outputline();


    this.get_line_number = function() {
        return lines.length;
    };

    // Using object instead of string to allow for later expansion of info about each line
    this.add_new_line = function(force_newline) {
        if (this.get_line_number() === 1 && this.just_added_newline()) {
            return false; // no newline on start of file
        }

        if (force_newline || !this.just_added_newline()) {
            if (!this.raw) {
                this.add_outputline();
            }
            return true;
        }

        return false;
    };

    this.get_code = function(end_with_newline, eol) {
        var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');

        if (end_with_newline) {
            sweet_code += '\n';
        }

        if (eol !== '\n') {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
        }

        return sweet_code;
    };

    this.set_indent = function(level) {
        // Never indent your first output indent at the start of the file
        if (lines.length > 1) {
            while (level >= this.indent_cache.length) {
                this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
            }

            this.current_line.set_indent(level);
            return true;
        }
        this.current_line.set_indent(0);
        return false;
    };

    this.add_raw_token = function(token) {
        for (var x = 0; x < token.newlines; x++) {
            this.add_outputline();
        }
        this.current_line.push(token.whitespace_before);
        this.current_line.push(token.text);
        this.space_before_token = false;
    };

    this.add_token = function(printable_token) {
        this.add_space_before_token();
        this.current_line.push(printable_token);
    };

    this.add_space_before_token = function() {
        if (this.space_before_token && !this.just_added_newline()) {
            this.current_line.push(' ');
        }
        this.space_before_token = false;
    };

    this.remove_indent = function(index) {
        var output_length = lines.length;
        while (index < output_length) {
            lines[index].remove_indent();
            index++;
        }
    };

    this.trim = function(eat_newlines) {
        eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

        this.current_line.trim(indent_string, baseIndentString);

        while (eat_newlines && lines.length > 1 &&
            this.current_line.is_empty()) {
            lines.pop();
            this.current_line = lines[lines.length - 1];
            this.current_line.trim();
        }

        this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
    };

    this.just_added_newline = function() {
        return this.current_line.is_empty();
    };

    this.just_added_blankline = function() {
        if (this.just_added_newline()) {
            if (lines.length === 1) {
                return true; // start of the file and newline = blank
            }

            var line = lines[lines.length - 2];
            return line.is_empty();
        }
        return false;
    };
}

module.exports.Output = Output;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function Token(type, text, newlines, whitespace_before, parent) {
    this.type = type;
    this.text = text;

    // comments_before are
    // comments that have a new line before them
    // and may or may not have a newline after
    // this is a set of comments before
    this.comments_before = /* inline comment*/ [];


    this.comments_after = []; // no new line before and newline after
    this.newlines = newlines || 0;
    this.wanted_newline = newlines > 0;
    this.whitespace_before = whitespace_before || '';
    this.parent = parent || null;
    this.opened = null;
    this.directives = null;
}

module.exports.Token = Token;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(1).Beautifier;

function js_beautify(js_source_text, options) {
    var beautifier = new Beautifier(js_source_text, options);
    return beautifier.beautify();
}

module.exports = js_beautify;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var InputScanner = __webpack_require__(2).InputScanner;
var Token = __webpack_require__(5).Token;
var acorn = __webpack_require__(0);

function trim(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function in_array(what, arr) {
    for (var i = 0; i < arr.length; i += 1) {
        if (arr[i] === what) {
            return true;
        }
    }
    return false;
}

function Tokenizer(input_string, opts) {

    var whitespace = "\n\r\t ".split('');
    var digit = /[0-9]/;
    var digit_bin = /[01]/;
    var digit_oct = /[01234567]/;
    var digit_hex = /[0123456789abcdefABCDEF]/;

    this.positionable_operators = '!= !== % & && * ** + - / : < << <= == === > >= >> >>> ? ^ | ||'.split(' ');
    var punct = this.positionable_operators.concat(
        // non-positionable operators - these do not follow operator position settings
        '! %= &= *= **= ++ += , -- -= /= :: <<= = => >>= >>>= ^= |= ~ ...'.split(' '));

    // words which should always start on new line.
    this.line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
    var reserved_words = this.line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);

    //  /* ... */ comment ends with nearest */ or end of file
    var block_comment_pattern = /([\s\S]*?)((?:\*\/)|$)/g;

    // comment ends just before nearest linefeed or end of file
    var comment_pattern = /([^\n\r\u2028\u2029]*)/g;

    var directives_block_pattern = /\/\* beautify( \w+[:]\w+)+ \*\//g;
    var directive_pattern = / (\w+)[:](\w+)/g;
    var directives_end_ignore_pattern = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g;

    var template_pattern = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;

    var n_newlines, whitespace_before_token, in_html_comment, tokens;
    var input;

    this.tokenize = function() {
        input = new InputScanner(input_string);
        in_html_comment = false;
        tokens = [];

        var next, last;
        var token_values;
        var open = null;
        var open_stack = [];
        var comments = [];

        while (!(last && last.type === 'TK_EOF')) {
            token_values = tokenize_next();
            next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
            while (next.type === 'TK_COMMENT' || next.type === 'TK_BLOCK_COMMENT' || next.type === 'TK_UNKNOWN') {
                if (next.type === 'TK_BLOCK_COMMENT') {
                    next.directives = token_values[2];
                }
                comments.push(next);
                token_values = tokenize_next();
                next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
            }

            if (comments.length) {
                next.comments_before = comments;
                comments = [];
            }

            if (next.type === 'TK_START_BLOCK' || next.type === 'TK_START_EXPR') {
                next.parent = last;
                open_stack.push(open);
                open = next;
            } else if ((next.type === 'TK_END_BLOCK' || next.type === 'TK_END_EXPR') &&
                (open && (
                    (next.text === ']' && open.text === '[') ||
                    (next.text === ')' && open.text === '(') ||
                    (next.text === '}' && open.text === '{')))) {
                next.parent = open.parent;
                next.opened = open;

                open = open_stack.pop();
            }

            tokens.push(next);
            last = next;
        }

        return tokens;
    };

    function get_directives(text) {
        if (!text.match(directives_block_pattern)) {
            return null;
        }

        var directives = {};
        directive_pattern.lastIndex = 0;
        var directive_match = directive_pattern.exec(text);

        while (directive_match) {
            directives[directive_match[1]] = directive_match[2];
            directive_match = directive_pattern.exec(text);
        }

        return directives;
    }

    function tokenize_next() {
        var resulting_string;
        var whitespace_on_this_line = [];

        n_newlines = 0;
        whitespace_before_token = '';

        var c = input.next();

        if (c === null) {
            return ['', 'TK_EOF'];
        }

        var last_token;
        if (tokens.length) {
            last_token = tokens[tokens.length - 1];
        } else {
            // For the sake of tokenizing we can pretend that there was on open brace to start
            last_token = new Token('TK_START_BLOCK', '{');
        }

        while (in_array(c, whitespace)) {

            if (acorn.newline.test(c)) {
                if (!(c === '\n' && input.peek(-2) === '\r')) {
                    n_newlines += 1;
                    whitespace_on_this_line = [];
                }
            } else {
                whitespace_on_this_line.push(c);
            }

            c = input.next();

            if (c === null) {
                return ['', 'TK_EOF'];
            }
        }

        if (whitespace_on_this_line.length) {
            whitespace_before_token = whitespace_on_this_line.join('');
        }

        if (digit.test(c) || (c === '.' && input.testChar(digit))) {
            var allow_decimal = true;
            var allow_e = true;
            var local_digit = digit;

            if (c === '0' && input.testChar(/[XxOoBb]/)) {
                // switch to hex/oct/bin number, no decimal or e, just hex/oct/bin digits
                allow_decimal = false;
                allow_e = false;
                if (input.testChar(/[Bb]/)) {
                    local_digit = digit_bin;
                } else if (input.testChar(/[Oo]/)) {
                    local_digit = digit_oct;
                } else {
                    local_digit = digit_hex;
                }
                c += input.next();
            } else if (c === '.') {
                // Already have a decimal for this literal, don't allow another
                allow_decimal = false;
            } else {
                // we know this first loop will run.  It keeps the logic simpler.
                c = '';
                input.back();
            }

            // Add the digits
            while (input.testChar(local_digit)) {
                c += input.next();

                if (allow_decimal && input.peek() === '.') {
                    c += input.next();
                    allow_decimal = false;
                }

                // a = 1.e-7 is valid, so we test for . then e in one loop
                if (allow_e && input.testChar(/[Ee]/)) {
                    c += input.next();

                    if (input.testChar(/[+-]/)) {
                        c += input.next();
                    }

                    allow_e = false;
                    allow_decimal = false;
                }
            }

            return [c, 'TK_WORD'];
        }

        if (acorn.isIdentifierStart(input.peekCharCode(-1))) {
            if (input.hasNext()) {
                while (acorn.isIdentifierChar(input.peekCharCode())) {
                    c += input.next();
                    if (!input.hasNext()) {
                        break;
                    }
                }
            }

            if (!(last_token.type === 'TK_DOT' ||
                    (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['set', 'get']))) &&
                in_array(c, reserved_words)) {
                if (c === 'in' || c === 'of') { // hack for 'in' and 'of' operators
                    return [c, 'TK_OPERATOR'];
                }
                return [c, 'TK_RESERVED'];
            }

            return [c, 'TK_WORD'];
        }

        if (c === '(' || c === '[') {
            return [c, 'TK_START_EXPR'];
        }

        if (c === ')' || c === ']') {
            return [c, 'TK_END_EXPR'];
        }

        if (c === '{') {
            return [c, 'TK_START_BLOCK'];
        }

        if (c === '}') {
            return [c, 'TK_END_BLOCK'];
        }

        if (c === ';') {
            return [c, 'TK_SEMICOLON'];
        }

        if (c === '/') {
            var comment = '';
            var comment_match;
            // peek for comment /* ... */
            if (input.peek() === '*') {
                input.next();
                comment_match = input.match(block_comment_pattern);
                comment = '/*' + comment_match[0];
                var directives = get_directives(comment);
                if (directives && directives.ignore === 'start') {
                    comment_match = input.match(directives_end_ignore_pattern);
                    comment += comment_match[0];
                }
                comment = comment.replace(acorn.allLineBreaks, '\n');
                return [comment, 'TK_BLOCK_COMMENT', directives];
            }
            // peek for comment // ...
            if (input.peek() === '/') {
                input.next();
                comment_match = input.match(comment_pattern);
                comment = '//' + comment_match[0];
                return [comment, 'TK_COMMENT'];
            }

        }

        var startXmlRegExp = /<()([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;

        if (c === '`' || c === "'" || c === '"' || // string
            (
                (c === '/') || // regexp
                (opts.e4x && c === "<" && input.test(startXmlRegExp, -1)) // xml
            ) && ( // regex and xml can only appear in specific locations during parsing
                (last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield'])) ||
                (last_token.type === 'TK_END_EXPR' && last_token.text === ')' &&
                    last_token.parent && last_token.parent.type === 'TK_RESERVED' && in_array(last_token.parent.text, ['if', 'while', 'for'])) ||
                (in_array(last_token.type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK',
                    'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA'
                ]))
            )) {

            var sep = c,
                esc = false,
                has_char_escapes = false;

            resulting_string = c;

            if (sep === '/') {
                //
                // handle regexp
                //
                var in_char_class = false;
                while (input.hasNext() &&
                    ((esc || in_char_class || input.peek() !== sep) &&
                        !input.testChar(acorn.newline))) {
                    resulting_string += input.peek();
                    if (!esc) {
                        esc = input.peek() === '\\';
                        if (input.peek() === '[') {
                            in_char_class = true;
                        } else if (input.peek() === ']') {
                            in_char_class = false;
                        }
                    } else {
                        esc = false;
                    }
                    input.next();
                }
            } else if (opts.e4x && sep === '<') {
                //
                // handle e4x xml literals
                //

                var xmlRegExp = /[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;
                input.back();
                var xmlStr = '';
                var match = input.match(startXmlRegExp);
                if (match) {
                    // Trim root tag to attempt to
                    var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
                    var isCurlyRoot = rootTag.indexOf('{') === 0;
                    var depth = 0;
                    while (match) {
                        var isEndTag = !!match[1];
                        var tagName = match[2];
                        var isSingletonTag = (!!match[match.length - 1]) || (tagName.slice(0, 8) === "![CDATA[");
                        if (!isSingletonTag &&
                            (tagName === rootTag || (isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}')))) {
                            if (isEndTag) {
                                --depth;
                            } else {
                                ++depth;
                            }
                        }
                        xmlStr += match[0];
                        if (depth <= 0) {
                            break;
                        }
                        match = input.match(xmlRegExp);
                    }
                    // if we didn't close correctly, keep unformatted.
                    if (!match) {
                        xmlStr += input.match(/[\s\S]*/g)[0];
                    }
                    xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
                    return [xmlStr, "TK_STRING"];
                }
            } else {
                //
                // handle string
                //
                var parse_string = function(delimiter, allow_unescaped_newlines, start_sub) {
                    // Template strings can travers lines without escape characters.
                    // Other strings cannot
                    var current_char;
                    while (input.hasNext()) {
                        current_char = input.peek();
                        if (!(esc || (current_char !== delimiter &&
                                (allow_unescaped_newlines || !acorn.newline.test(current_char))))) {
                            break;
                        }

                        // Handle \r\n linebreaks after escapes or in template strings
                        if ((esc || allow_unescaped_newlines) && acorn.newline.test(current_char)) {
                            if (current_char === '\r' && input.peek(1) === '\n') {
                                input.next();
                                current_char = input.peek();
                            }
                            resulting_string += '\n';
                        } else {
                            resulting_string += current_char;
                        }

                        if (esc) {
                            if (current_char === 'x' || current_char === 'u') {
                                has_char_escapes = true;
                            }
                            esc = false;
                        } else {
                            esc = current_char === '\\';
                        }

                        input.next();

                        if (start_sub && resulting_string.indexOf(start_sub, resulting_string.length - start_sub.length) !== -1) {
                            if (delimiter === '`') {
                                parse_string('}', allow_unescaped_newlines, '`');
                            } else {
                                parse_string('`', allow_unescaped_newlines, '${');
                            }

                            if (input.hasNext()) {
                                resulting_string += input.next();
                            }
                        }
                    }
                };

                if (sep === '`') {
                    parse_string('`', true, '${');
                } else {
                    parse_string(sep);
                }
            }

            if (has_char_escapes && opts.unescape_strings) {
                resulting_string = unescape_string(resulting_string);
            }

            if (input.peek() === sep) {
                resulting_string += sep;
                input.next();

                if (sep === '/') {
                    // regexps may have modifiers /regexp/MOD , so fetch those, too
                    // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
                    while (input.hasNext() && acorn.isIdentifierStart(input.peekCharCode())) {
                        resulting_string += input.next();
                    }
                }
            }
            return [resulting_string, 'TK_STRING'];
        }

        if (c === '#') {

            if (tokens.length === 0 && input.peek() === '!') {
                // shebang
                resulting_string = c;
                while (input.hasNext() && c !== '\n') {
                    c = input.next();
                    resulting_string += c;
                }
                return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
            }



            // Spidermonkey-specific sharp variables for circular references
            // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
            // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
            var sharp = '#';
            if (input.hasNext() && input.testChar(digit)) {
                do {
                    c = input.next();
                    sharp += c;
                } while (input.hasNext() && c !== '#' && c !== '=');
                if (c === '#') {
                    //
                } else if (input.peek() === '[' && input.peek(1) === ']') {
                    sharp += '[]';
                    input.next();
                    input.next();
                } else if (input.peek() === '{' && input.peek(1) === '}') {
                    sharp += '{}';
                    input.next();
                    input.next();
                }
                return [sharp, 'TK_WORD'];
            }
        }

        if (c === '<' && (input.peek() === '?' || input.peek() === '%')) {
            input.back();
            var template_match = input.match(template_pattern);
            if (template_match) {
                c = template_match[0];
                c = c.replace(acorn.allLineBreaks, '\n');
                return [c, 'TK_STRING'];
            }
        }

        if (c === '<' && input.match(/\!--/g)) {
            c = '<!--';
            while (input.hasNext() && !input.testChar(acorn.newline)) {
                c += input.next();
            }
            in_html_comment = true;
            return [c, 'TK_COMMENT'];
        }

        if (c === '-' && in_html_comment && input.match(/->/g)) {
            in_html_comment = false;
            return ['-->', 'TK_COMMENT'];
        }

        if (c === '.') {
            if (input.peek() === '.' && input.peek(1) === '.') {
                c += input.next() + input.next();
                return [c, 'TK_OPERATOR'];
            }
            return [c, 'TK_DOT'];
        }

        if (in_array(c, punct)) {
            while (input.hasNext() && in_array(c + input.peek(), punct)) {
                c += input.next();
                if (!input.hasNext()) {
                    break;
                }
            }

            if (c === ',') {
                return [c, 'TK_COMMA'];
            } else if (c === '=') {
                return [c, 'TK_EQUALS'];
            } else {
                return [c, 'TK_OPERATOR'];
            }
        }

        return [c, 'TK_UNKNOWN'];
    }


    function unescape_string(s) {
        // You think that a regex would work for this
        // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
        //         return String.fromCharCode(parseInt(val, 16));
        //     })
        // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
        var out = '',
            escaped = 0;

        var input_scan = new InputScanner(s);
        var matched = null;

        while (input_scan.hasNext()) {
            // Keep any whitespace, non-slash characters
            // also keep slash pairs.
            matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);

            if (matched) {
                out += matched[0];
            }

            if (input_scan.peek() === '\\') {
                input_scan.next();
                if (input_scan.peek() === 'x') {
                    matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
                } else if (input_scan.peek() === 'u') {
                    matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
                } else {
                    out += '\\';
                    if (input_scan.hasNext()) {
                        out += input_scan.next();
                    }
                    continue;
                }

                // If there's some error decoding, return the original string
                if (!matched) {
                    return s;
                }

                escaped = parseInt(matched[1], 16);

                if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
                    // we bail out on \x7f..\xff,
                    // leaving whole string escaped,
                    // as it's probably completely binary
                    return s;
                } else if (escaped >= 0x00 && escaped < 0x20) {
                    // leave 0x00...0x1f escaped
                    out += '\\' + matched[0];
                    continue;
                } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
                    // single-quote, apostrophe, backslash - escape these
                    out += '\\' + String.fromCharCode(escaped);
                } else {
                    out += String.fromCharCode(escaped);
                }
            }
        }

        return out;
    }
}

module.exports.Tokenizer = Tokenizer;

/***/ })
/******/ ]);
var js_beautify = legacy_beautify_js;
/* Footer */
if (true) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return { js_beautify: js_beautify };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof exports !== "undefined") {
    // Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to `var js_beautify = require("beautify").js_beautify`.
    exports.js_beautify = js_beautify;
} else if (typeof window !== "undefined") {
    // If we're running a web page and don't have either of the above, add our one global
    window.js_beautify = js_beautify;
} else if (typeof global !== "undefined") {
    // If we don't even have window, try global.
    global.js_beautify = js_beautify;
}

}());


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
        http://jsbeautifier.org/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                         — indentation size,
        indent_char (space)                     — character to indent with,
        selector_separator_newline (true)       - separate selectors with newline or
                                                  not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)                - end with a newline
        newline_between_rules (true)            - add a new line after every css rule
        space_around_selector_separator (false) - ensure space around selector separators:
                                                  '>', '+', '~' (e.g. "a>b" -> "a > b")
    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
      'newline_between_rules': true,
      'space_around_selector_separator': true
    });
*/

// http://www.w3.org/TR/CSS21/syndata.html#tokenization
// http://www.w3.org/TR/css3-syntax/

(function() {
var legacy_beautify_css =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var mergeOpts = __webpack_require__(2).mergeOpts;
var acorn = __webpack_require__(1);
var Output = __webpack_require__(3).Output;


var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

function Beautifier(source_text, options) {
    options = options || {};

    // Allow the setting of language/file-type specific options
    // with inheritance of overall settings
    options = mergeOpts(options, 'css');

    source_text = source_text || '';

    var newlinesFromLastWSEat = 0;
    var indentSize = options.indent_size ? parseInt(options.indent_size, 10) : 4;
    var indentCharacter = options.indent_char || ' ';
    var preserve_newlines = (options.preserve_newlines === undefined) ? false : options.preserve_newlines;
    var selectorSeparatorNewline = (options.selector_separator_newline === undefined) ? true : options.selector_separator_newline;
    var end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
    var newline_between_rules = (options.newline_between_rules === undefined) ? true : options.newline_between_rules;
    var space_around_combinator = (options.space_around_combinator === undefined) ? false : options.space_around_combinator;
    space_around_combinator = space_around_combinator || ((options.space_around_selector_separator === undefined) ? false : options.space_around_selector_separator);
    var eol = options.eol ? options.eol : 'auto';

    if (options.indent_with_tabs) {
        indentCharacter = '\t';
        indentSize = 1;
    }

    if (eol === 'auto') {
        eol = '\n';
        if (source_text && lineBreak.test(source_text || '')) {
            eol = source_text.match(lineBreak)[0];
        }
    }

    eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

    // HACK: newline parsing inconsistent. This brute force normalizes the input.
    source_text = source_text.replace(allLineBreaks, '\n');

    // tokenizer
    var whiteRe = /^\s+$/;

    var pos = -1,
        ch;
    var parenLevel = 0;

    function next() {
        ch = source_text.charAt(++pos);
        return ch || '';
    }

    function peek(skipWhitespace) {
        var result = '';
        var prev_pos = pos;
        if (skipWhitespace) {
            eatWhitespace();
        }
        result = source_text.charAt(pos + 1) || '';
        pos = prev_pos - 1;
        next();
        return result;
    }

    function eatString(endChars) {
        var start = pos;
        while (next()) {
            if (ch === "\\") {
                next();
            } else if (endChars.indexOf(ch) !== -1) {
                break;
            } else if (ch === "\n") {
                break;
            }
        }
        return source_text.substring(start, pos + 1);
    }

    function peekString(endChar) {
        var prev_pos = pos;
        var str = eatString(endChar);
        pos = prev_pos - 1;
        next();
        return str;
    }

    function eatWhitespace(preserve_newlines_local) {
        var result = 0;
        while (whiteRe.test(peek())) {
            next();
            if (ch === '\n' && preserve_newlines_local && preserve_newlines) {
                output.add_new_line(true);
                result++;
            }
        }
        newlinesFromLastWSEat = result;
        return result;
    }

    function skipWhitespace() {
        var result = '';
        if (ch && whiteRe.test(ch)) {
            result = ch;
        }
        while (whiteRe.test(next())) {
            result += ch;
        }
        return result;
    }

    function eatComment() {
        var start = pos;
        var singleLine = peek() === "/";
        next();
        while (next()) {
            if (!singleLine && ch === "*" && peek() === "/") {
                next();
                break;
            } else if (singleLine && ch === "\n") {
                return source_text.substring(start, pos);
            }
        }

        return source_text.substring(start, pos) + ch;
    }


    function lookBack(str) {
        return source_text.substring(pos - str.length, pos).toLowerCase() ===
            str;
    }

    // Nested pseudo-class if we are insideRule
    // and the next special character found opens
    // a new block
    function foundNestedPseudoClass() {
        var openParen = 0;
        for (var i = pos + 1; i < source_text.length; i++) {
            var ch = source_text.charAt(i);
            if (ch === "{") {
                return true;
            } else if (ch === '(') {
                // pseudoclasses can contain ()
                openParen += 1;
            } else if (ch === ')') {
                if (openParen === 0) {
                    return false;
                }
                openParen -= 1;
            } else if (ch === ";" || ch === "}") {
                return false;
            }
        }
        return false;
    }

    // printer
    var baseIndentString = '';
    var preindent_index = 0;
    if (source_text && source_text.length) {
        while ((source_text.charAt(preindent_index) === ' ' ||
                source_text.charAt(preindent_index) === '\t')) {
            preindent_index += 1;
        }
        baseIndentString = source_text.substring(0, preindent_index);
        source_text = source_text.substring(preindent_index);
    }


    var singleIndent = new Array(indentSize + 1).join(indentCharacter);
    var indentLevel;
    var nestedLevel;
    var output;

    function print_string(output_string) {
        if (output.just_added_newline()) {
            output.set_indent(indentLevel);
        }
        output.add_token(output_string);
    }

    function preserveSingleSpace(isAfterSpace) {
        if (isAfterSpace) {
            output.space_before_token = true;
        }
    }

    function indent() {
        indentLevel++;
    }

    function outdent() {
        if (indentLevel > 0) {
            indentLevel--;
        }
    }

    /*_____________________--------------------_____________________*/

    this.beautify = function() {
        // reset
        output = new Output(singleIndent, baseIndentString);
        indentLevel = 0;
        nestedLevel = 0;

        pos = -1;
        ch = null;
        parenLevel = 0;

        var insideRule = false;
        var insidePropertyValue = false;
        var enteringConditionalGroup = false;
        var top_ch = '';
        var last_top_ch = '';

        while (true) {
            var whitespace = skipWhitespace();
            var isAfterSpace = whitespace !== '';
            var isAfterNewline = whitespace.indexOf('\n') !== -1;
            last_top_ch = top_ch;
            top_ch = ch;

            if (!ch) {
                break;
            } else if (ch === '/' && peek() === '*') { /* css comment */
                var header = indentLevel === 0;

                if (isAfterNewline || header) {
                    output.add_new_line();
                }

                print_string(eatComment());
                output.add_new_line();
                if (header) {
                    output.add_new_line(true);
                }
            } else if (ch === '/' && peek() === '/') { // single line comment
                if (!isAfterNewline && last_top_ch !== '{') {
                    output.trim(true);
                }
                output.space_before_token = true;
                print_string(eatComment());
                output.add_new_line();
            } else if (ch === '@') {
                preserveSingleSpace(isAfterSpace);

                // deal with less propery mixins @{...}
                if (peek() === '{') {
                    print_string(eatString('}'));
                } else {
                    print_string(ch);

                    // strip trailing space, if present, for hash property checks
                    var variableOrRule = peekString(": ,;{}()[]/='\"");

                    if (variableOrRule.match(/[ :]$/)) {
                        // we have a variable or pseudo-class, add it and insert one space before continuing
                        next();
                        variableOrRule = eatString(": ").replace(/\s$/, '');
                        print_string(variableOrRule);
                        output.space_before_token = true;
                    }

                    variableOrRule = variableOrRule.replace(/\s$/, '');

                    // might be a nesting at-rule
                    if (variableOrRule in this.NESTED_AT_RULE) {
                        nestedLevel += 1;
                        if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                            enteringConditionalGroup = true;
                        }
                    }
                }
            } else if (ch === '#' && peek() === '{') {
                preserveSingleSpace(isAfterSpace);
                print_string(eatString('}'));
            } else if (ch === '{') {
                if (peek(true) === '}') {
                    eatWhitespace();
                    next();
                    output.space_before_token = true;
                    print_string("{}");
                    if (!eatWhitespace(true)) {
                        output.add_new_line();
                    }

                    if (newlinesFromLastWSEat < 2 && newline_between_rules && indentLevel === 0) {
                        output.add_new_line(true);
                    }
                } else {
                    indent();
                    output.space_before_token = true;
                    print_string(ch);
                    if (!eatWhitespace(true)) {
                        output.add_new_line();
                    }

                    // when entering conditional groups, only rulesets are allowed
                    if (enteringConditionalGroup) {
                        enteringConditionalGroup = false;
                        insideRule = (indentLevel > nestedLevel);
                    } else {
                        // otherwise, declarations are also allowed
                        insideRule = (indentLevel >= nestedLevel);
                    }
                }
            } else if (ch === '}') {
                outdent();
                output.add_new_line();
                print_string(ch);
                insideRule = false;
                insidePropertyValue = false;
                if (nestedLevel) {
                    nestedLevel--;
                }

                if (!eatWhitespace(true)) {
                    output.add_new_line();
                }

                if (newlinesFromLastWSEat < 2 && newline_between_rules && indentLevel === 0) {
                    output.add_new_line(true);
                }
            } else if (ch === ":") {
                eatWhitespace();
                if ((insideRule || enteringConditionalGroup) &&
                    !(lookBack("&") || foundNestedPseudoClass()) &&
                    !lookBack("(")) {
                    // 'property: value' delimiter
                    // which could be in a conditional group query
                    print_string(':');
                    if (!insidePropertyValue) {
                        insidePropertyValue = true;
                        output.space_before_token = true;
                    }
                } else {
                    // sass/less parent reference don't use a space
                    // sass nested pseudo-class don't use a space

                    // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
                    if (lookBack(" ")) {
                        output.space_before_token = true;
                    }
                    if (peek() === ":") {
                        // pseudo-element
                        next();
                        print_string("::");
                    } else {
                        // pseudo-class
                        print_string(':');
                    }
                }
            } else if (ch === '"' || ch === '\'') {
                preserveSingleSpace(isAfterSpace);
                print_string(eatString(ch));
            } else if (ch === ';') {
                insidePropertyValue = false;
                print_string(ch);
                if (!eatWhitespace(true)) {
                    output.add_new_line();
                }
            } else if (ch === '(') { // may be a url
                if (lookBack("url")) {
                    print_string(ch);
                    eatWhitespace();
                    if (next()) {
                        if (ch !== ')' && ch !== '"' && ch !== '\'') {
                            print_string(eatString(')'));
                        } else {
                            pos--;
                        }
                    }
                } else {
                    parenLevel++;
                    preserveSingleSpace(isAfterSpace);
                    print_string(ch);
                    eatWhitespace();
                }
            } else if (ch === ')') {
                print_string(ch);
                parenLevel--;
            } else if (ch === ',') {
                print_string(ch);
                if (!eatWhitespace(true) && selectorSeparatorNewline && !insidePropertyValue && parenLevel < 1) {
                    output.add_new_line();
                } else {
                    output.space_before_token = true;
                }
            } else if ((ch === '>' || ch === '+' || ch === '~') &&
                !insidePropertyValue && parenLevel < 1) {
                //handle combinator spacing
                if (space_around_combinator) {
                    output.space_before_token = true;
                    print_string(ch);
                    output.space_before_token = true;
                } else {
                    print_string(ch);
                    eatWhitespace();
                    // squash extra whitespace
                    if (ch && whiteRe.test(ch)) {
                        ch = '';
                    }
                }
            } else if (ch === ']') {
                print_string(ch);
            } else if (ch === '[') {
                preserveSingleSpace(isAfterSpace);
                print_string(ch);
            } else if (ch === '=') { // no whitespace before or after
                eatWhitespace();
                print_string('=');
                if (whiteRe.test(ch)) {
                    ch = '';
                }
            } else if (ch === '!') { // !important
                print_string(' ');
                print_string(ch);
            } else {
                preserveSingleSpace(isAfterSpace);
                print_string(ch);
            }
        }

        var sweetCode = output.get_code(end_with_newline, eol);

        return sweetCode;
    };

    // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
    this.NESTED_AT_RULE = {
        "@page": true,
        "@font-face": true,
        "@keyframes": true,
        // also in CONDITIONAL_GROUP_RULE below
        "@media": true,
        "@supports": true,
        "@document": true
    };
    this.CONDITIONAL_GROUP_RULE = {
        "@media": true,
        "@supports": true,
        "@document": true
    };
}

module.exports.Beautifier = Beautifier;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* jshint curly: false */
// This section of code is taken from acorn.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
    // permit $ (36) and @ (64). @ is used in ES7 decorators.
    if (code < 65) return code === 36 || code === 64;
    // 65 through 91 are uppercase letters.
    if (code < 91) return true;
    // permit _ (95).
    if (code < 97) return code === 95;
    // 97 through 123 are lowercase letters.
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function mergeOpts(allOptions, targetType) {
    var finalOpts = {};
    var name;

    for (name in allOptions) {
        if (name !== targetType) {
            finalOpts[name] = allOptions[name];
        }
    }

    //merge in the per type settings for the targetType
    if (targetType in allOptions) {
        for (name in allOptions[targetType]) {
            finalOpts[name] = allOptions[targetType][name];
        }
    }
    return finalOpts;
}

module.exports.mergeOpts = mergeOpts;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

function OutputLine(parent) {
    var _character_count = 0;
    // use indent_count as a marker for lines that have preserved indentation
    var _indent_count = -1;

    var _items = [];
    var _empty = true;

    this.set_indent = function(level) {
        _character_count = parent.baseIndentLength + level * parent.indent_length;
        _indent_count = level;
    };

    this.get_character_count = function() {
        return _character_count;
    };

    this.is_empty = function() {
        return _empty;
    };

    this.last = function() {
        if (!this._empty) {
            return _items[_items.length - 1];
        } else {
            return null;
        }
    };

    this.push = function(input) {
        _items.push(input);
        _character_count += input.length;
        _empty = false;
    };

    this.pop = function() {
        var item = null;
        if (!_empty) {
            item = _items.pop();
            _character_count -= item.length;
            _empty = _items.length === 0;
        }
        return item;
    };

    this.remove_indent = function() {
        if (_indent_count > 0) {
            _indent_count -= 1;
            _character_count -= parent.indent_length;
        }
    };

    this.trim = function() {
        while (this.last() === ' ') {
            _items.pop();
            _character_count -= 1;
        }
        _empty = _items.length === 0;
    };

    this.toString = function() {
        var result = '';
        if (!this._empty) {
            if (_indent_count >= 0) {
                result = parent.indent_cache[_indent_count];
            }
            result += _items.join('');
        }
        return result;
    };
}

function Output(indent_string, baseIndentString) {
    baseIndentString = baseIndentString || '';
    this.indent_cache = [baseIndentString];
    this.baseIndentLength = baseIndentString.length;
    this.indent_length = indent_string.length;
    this.raw = false;

    var lines = [];
    this.baseIndentString = baseIndentString;
    this.indent_string = indent_string;
    this.previous_line = null;
    this.current_line = null;
    this.space_before_token = false;

    this.add_outputline = function() {
        this.previous_line = this.current_line;
        this.current_line = new OutputLine(this);
        lines.push(this.current_line);
    };

    // initialize
    this.add_outputline();


    this.get_line_number = function() {
        return lines.length;
    };

    // Using object instead of string to allow for later expansion of info about each line
    this.add_new_line = function(force_newline) {
        if (this.get_line_number() === 1 && this.just_added_newline()) {
            return false; // no newline on start of file
        }

        if (force_newline || !this.just_added_newline()) {
            if (!this.raw) {
                this.add_outputline();
            }
            return true;
        }

        return false;
    };

    this.get_code = function(end_with_newline, eol) {
        var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');

        if (end_with_newline) {
            sweet_code += '\n';
        }

        if (eol !== '\n') {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
        }

        return sweet_code;
    };

    this.set_indent = function(level) {
        // Never indent your first output indent at the start of the file
        if (lines.length > 1) {
            while (level >= this.indent_cache.length) {
                this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
            }

            this.current_line.set_indent(level);
            return true;
        }
        this.current_line.set_indent(0);
        return false;
    };

    this.add_raw_token = function(token) {
        for (var x = 0; x < token.newlines; x++) {
            this.add_outputline();
        }
        this.current_line.push(token.whitespace_before);
        this.current_line.push(token.text);
        this.space_before_token = false;
    };

    this.add_token = function(printable_token) {
        this.add_space_before_token();
        this.current_line.push(printable_token);
    };

    this.add_space_before_token = function() {
        if (this.space_before_token && !this.just_added_newline()) {
            this.current_line.push(' ');
        }
        this.space_before_token = false;
    };

    this.remove_indent = function(index) {
        var output_length = lines.length;
        while (index < output_length) {
            lines[index].remove_indent();
            index++;
        }
    };

    this.trim = function(eat_newlines) {
        eat_newlines = (eat_newlines === undefined) ? false : eat_newlines;

        this.current_line.trim(indent_string, baseIndentString);

        while (eat_newlines && lines.length > 1 &&
            this.current_line.is_empty()) {
            lines.pop();
            this.current_line = lines[lines.length - 1];
            this.current_line.trim();
        }

        this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
    };

    this.just_added_newline = function() {
        return this.current_line.is_empty();
    };

    this.just_added_blankline = function() {
        if (this.just_added_newline()) {
            if (lines.length === 1) {
                return true; // start of the file and newline = blank
            }

            var line = lines[lines.length - 2];
            return line.is_empty();
        }
        return false;
    };
}

module.exports.Output = Output;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(0).Beautifier;

function css_beautify(source_text, options) {
    var beautifier = new Beautifier(source_text, options);
    return beautifier.beautify();
}

module.exports = css_beautify;

/***/ })
/******/ ]);
var css_beautify = legacy_beautify_css;
/* Footer */
if (true) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return {
            css_beautify: css_beautify
        };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof exports !== "undefined") {
    // Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to `var html_beautify = require("beautify").html_beautify`.
    exports.css_beautify = css_beautify;
} else if (typeof window !== "undefined") {
    // If we're running a web page and don't have either of the above, add our one global
    window.css_beautify = css_beautify;
} else if (typeof global !== "undefined") {
    // If we don't even have window, try global.
    global.css_beautify = css_beautify;
}

}());


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(17) && !__webpack_require__(22)(function () {
  return Object.defineProperty(__webpack_require__(38)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(18);
var toIObject = __webpack_require__(19);
var arrayIndexOf = __webpack_require__(82)(false);
var IE_PROTO = __webpack_require__(42)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(18);
var toObject = __webpack_require__(31);
var IE_PROTO = __webpack_require__(42)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(47);
var $export = __webpack_require__(12);
var redefine = __webpack_require__(66);
var hide = __webpack_require__(20);
var has = __webpack_require__(18);
var Iterators = __webpack_require__(25);
var $iterCreate = __webpack_require__(93);
var setToStringTag = __webpack_require__(49);
var getPrototypeOf = __webpack_require__(63);
var ITERATOR = __webpack_require__(11)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(10).document;
module.exports = document && document.documentElement;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(29)('meta');
var isObject = __webpack_require__(16);
var has = __webpack_require__(18);
var setDesc = __webpack_require__(15).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(22)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(19);
var gOPN = __webpack_require__(70).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(61);
var hiddenKeys = __webpack_require__(44).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _keys = __webpack_require__(54);

var _keys2 = _interopRequireDefault(_keys);

var _getOwnPropertyNames = __webpack_require__(55);

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _getOwnPropertyDescriptor = __webpack_require__(34);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

exports.default = stringify;

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Modified from: https://jsconsole.com/
function stringify(obj) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$visitor = _ref.visitor,
        visitor = _ref$visitor === undefined ? new Visitor() : _ref$visitor,
        topObj = _ref.topObj,
        _ref$level = _ref.level,
        level = _ref$level === undefined ? 0 : _ref$level,
        _ref$circularMarker = _ref.circularMarker,
        circularMarker = _ref$circularMarker === undefined ? false : _ref$circularMarker,
        _ref$getterVal = _ref.getterVal,
        getterVal = _ref$getterVal === undefined ? false : _ref$getterVal,
        _ref$unenumerable = _ref.unenumerable,
        unenumerable = _ref$unenumerable === undefined ? true : _ref$unenumerable;

    var json = '',
        type = void 0,
        parts = [],
        names = [],
        proto = void 0,
        objAbstract = void 0,
        circularObj = void 0,
        allKeys = void 0,
        keys = void 0,
        id = '';

    topObj = topObj || obj;

    var passOpts = { visitor: visitor, getterVal: getterVal, unenumerable: unenumerable, level: level + 1 },
        passProtoOpts = { visitor: visitor, getterVal: getterVal, topObj: topObj, unenumerable: unenumerable, level: level + 1 };

    var wrapKey = function wrapKey(key) {
        return '"' + (0, _util.escapeJsonStr)(key) + '"';
    },
        wrapStr = function wrapStr(str) {
        return '"' + (0, _util.escapeJsonStr)((0, _util.toStr)(str)) + '"';
    };

    type = getType(obj);

    var isFn = type == '[object Function]',
        isStr = type == '[object String]',
        isArr = type == '[object Array]',
        isObj = type == '[object Object]',
        isNum = type == '[object Number]',
        isSymbol = type == '[object Symbol]',
        isBool = type == '[object Boolean]';

    circularObj = visitor.check(obj);

    if (circularObj) {
        json = stringify(circularObj.abstract, { circularMarker: true });
    } else if (isStr) {
        json = wrapStr(obj);
    } else if (isArr || isObj || isFn) {
        id = visitor.visit(obj);

        if (canBeProto(obj)) {
            obj = (0, _getPrototypeOf2.default)(obj);
            id = visitor.visit(obj);
        }

        names = getKeys(obj);
        keys = names.keys;
        allKeys = names.allKeys;
        names = unenumerable ? allKeys : keys;

        proto = (0, _getPrototypeOf2.default)(obj);
        if (circularMarker && proto === Object.prototype) proto = null;
        if (proto) {
            proto = wrapKey('erudaProto') + ': ' + stringify(proto, passProtoOpts);
        }
        if (isFn) {
            // We don't need these properties to display for functions.
            names = names.filter(function (val) {
                return ['arguments', 'caller'].indexOf(val) < 0;
            });
        }
        json = '{ ';
        objAbstract = getObjAbstract(obj);
        visitor.updateAbstract(id, {
            erudaObjAbstract: objAbstract,
            erudaCircular: id
        });
        parts.push(wrapKey('erudaObjAbstract') + ': ' + wrapStr(objAbstract));
        if (!circularMarker) parts.push('"erudaId": "' + id + '"');
        (0, _util.each)(names, objIteratee);
        if (proto) parts.push(proto);
        json += parts.join(', ') + ' }';
    } else if (isNum) {
        json = obj + '';
        if ((0, _util.endWith)(json, 'Infinity') || json === 'NaN') json = '"' + json + '"';
    } else if (isBool) {
        json = obj ? 'true' : 'false';
    } else if (obj === null) {
        json = 'null';
    } else if (isSymbol) {
        json = wrapStr('Symbol');
    } else if (obj === undefined) {
        json = wrapStr('undefined');
    } else if (type === '[object HTMLAllCollection]') {
        // https://docs.webplatform.org/wiki/dom/HTMLAllCollection
        // Might cause a performance issue when stringify a dom element.
        json = wrapStr('[object HTMLAllCollection]');
    } else if (type === '[object HTMLDocument]' && level > 1) {
        // Same as reason above.
        json = wrapStr('[object HTMLDocument]');
    } else {
        try {
            id = visitor.visit(obj);
            if (canBeProto(obj)) {
                obj = (0, _getPrototypeOf2.default)(obj);
                id = visitor.visit(obj);
            }

            json = '{ ';
            objAbstract = getObjAbstract(obj);
            visitor.updateAbstract(id, {
                erudaObjAbstract: objAbstract,
                erudaCircular: id
            });
            parts.push(wrapKey('erudaObjAbstract') + ': ' + wrapStr(objAbstract));
            if (!circularMarker) parts.push('"erudaId": "' + id + '"');

            names = getKeys(obj);
            keys = names.keys;
            allKeys = names.allKeys;
            names = unenumerable ? allKeys : keys;

            proto = (0, _getPrototypeOf2.default)(obj);
            if (circularMarker && proto === Object.prototype) proto = null;
            if (proto) {
                try {
                    proto = wrapKey('erudaProto') + ': ' + stringify(proto, passProtoOpts);
                } catch (e) {
                    proto = wrapKey('erudaProto') + ': ' + wrapStr(e.message);
                }
            }
            (0, _util.each)(names, objIteratee);
            if (proto) parts.push(proto);
            json += parts.join(', ') + ' }';
        } catch (e) {
            json = wrapStr(obj);
        }
    }

    function objIteratee(name) {
        var unenumerable = !(0, _util.contain)(keys, name) ? 'erudaUnenumerable ' : '',
            key = wrapKey(unenumerable + name),
            getKey = wrapKey(unenumerable + 'get ' + name),
            setKey = wrapKey(unenumerable + 'set ' + name);

        var descriptor = (0, _getOwnPropertyDescriptor2.default)(obj, name),
            hasGetter = descriptor && descriptor.get,
            hasSetter = descriptor && descriptor.set;

        if (!getterVal && hasGetter) {
            parts.push(key + ': "(...)"');
            parts.push(getKey + ': ' + stringify(descriptor.get, passOpts));
        } else {
            var val = void 0;
            try {
                val = topObj[name];
            } catch (e) {
                val = e.message;
            }
            parts.push(key + ': ' + stringify(val, passOpts));
        }
        if (hasSetter) {
            parts.push(setKey + ': ' + stringify(descriptor.set, passOpts));
        }
    }

    return json;
}

function getKeys(obj) {
    var allKeys = (0, _getOwnPropertyNames2.default)(obj),
        keys = (0, _keys2.default)(obj).sort(sortObjName);

    allKeys = keys.concat((0, _util.filter)(allKeys, function (val) {
        return !(0, _util.contain)(keys, val);
    }).sort(sortObjName));

    return { keys: keys, allKeys: allKeys };
}

// $, upperCase, lowerCase, _
function sortObjName(a, b) {
    var lenA = a.length,
        lenB = b.length,
        len = lenA > lenB ? lenB : lenA;

    for (var i = 0; i < len; i++) {
        var codeA = a.charCodeAt(i),
            codeB = b.charCodeAt(i),
            cmpResult = cmpCode(codeA, codeB);

        if (cmpResult !== 0) return cmpResult;
    }

    if (lenA > lenB) return 1;
    if (lenA < lenB) return -1;

    return 0;
}

function cmpCode(a, b) {
    a = transCode(a);
    b = transCode(b);

    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
}

function transCode(code) {
    // _ should be placed after lowercase chars.
    if (code === 95) return 123;
    return code;
}

var regFnHead = /function(.*?)\((.*?)\)/;

function extractFnHead(fn) {
    var str = fn.toString(),
        fnHead = str.match(regFnHead);

    if (fnHead) return fnHead[0];

    return str;
}

function getFnAbstract(fn) {
    var fnStr = fn.toString();
    if (fnStr.length > 500) fnStr = fnStr.slice(0, 500) + '...';

    return extractFnHead(fnStr).replace('function', '');
}

function canBeProto(obj) {
    var emptyObj = (0, _util.isEmpty)((0, _getOwnPropertyNames2.default)(obj)),
        proto = (0, _getPrototypeOf2.default)(obj);

    return emptyObj && proto && proto !== Object.prototype;
}

function getObjAbstract(obj) {
    if ((0, _util.isArr)(obj)) return 'Array[' + obj.length + ']';
    if ((0, _util.isFn)(obj)) return getFnAbstract(obj);
    if ((0, _util.isRegExp)(obj)) return obj.toString();

    var type = getType(obj);

    return type.replace(/(\[object )|]/g, '');
}

function getType(obj) {
    var type = void 0;

    try {
        type = {}.toString.call(obj);
    } catch (e) {
        type = '[object Object]';
    }

    return type;
}

var Visitor = function () {
    function Visitor() {
        (0, _classCallCheck3.default)(this, Visitor);

        this._visited = [];
        this._map = {};
    }

    (0, _createClass3.default)(Visitor, [{
        key: 'visit',
        value: function visit(val) {
            var id = (0, _util.uniqId)('erudaJson');

            this._visited.push({ id: id, val: val, abstract: {} });
            this._map[id] = (0, _util.last)(this._visited);

            return id;
        }
    }, {
        key: 'check',
        value: function check(val) {
            var visited = this._visited;

            for (var i = 0, len = visited.length; i < len; i++) {
                if (val === visited[i].val) return visited[i];
            }

            return false;
        }
    }, {
        key: 'update',
        value: function update(id, data) {
            (0, _util.extend)(this._map[id], data);
        }
    }, {
        key: 'updateAbstract',
        value: function updateAbstract(id, abstract) {
            this.update(id, { abstract: abstract });
        }
    }]);
    return Visitor;
}();

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JsonViewer = function () {
    function JsonViewer(data, $el) {
        (0, _classCallCheck3.default)(this, JsonViewer);

        (0, _util.evalCss)(__webpack_require__(152));

        this._data = [data];
        this._$el = $el;
        this._map = {};

        this._appendTpl();
        this._bindEvent();
    }

    (0, _createClass3.default)(JsonViewer, [{
        key: '_appendTpl',
        value: function _appendTpl() {
            this._$el.html(jsonToHtml(this._data, this._map, true));
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var map = this._map;

            this._$el.on('click', 'li', function (e) {
                var $this = (0, _util.$)(this),
                    circularId = $this.data('object-id'),
                    $firstSpan = (0, _util.$)(this).find('span').eq(0);

                if ($this.data('first-level')) return;
                if (circularId) {
                    $this.find('ul').html(jsonToHtml(map[circularId], map, false));
                    $this.rmAttr('data-object-id');
                }

                e.stopImmediatePropagation();

                if (!$firstSpan.hasClass('eruda-expanded')) return;

                var $ul = $this.find('ul').eq(0);
                if ($firstSpan.hasClass('eruda-collapsed')) {
                    $firstSpan.rmClass('eruda-collapsed');
                    $ul.show();
                } else {
                    $firstSpan.addClass('eruda-collapsed');
                    $ul.hide();
                }
            });
        }
    }]);
    return JsonViewer;
}();

exports.default = JsonViewer;


function jsonToHtml(data, map, firstLevel) {
    var ret = '';

    for (var key in data) {
        var val = data[key];

        if (key === 'erudaObjAbstract' || key === 'erudaCircular' || key === 'erudaId' || (0, _util.isStr)(val) && (0, _util.startWith)(val, 'erudaJson')) continue;

        if (Object.hasOwnProperty.call(data, key)) ret += createEl(key, val, map, firstLevel);
    }

    return ret;
}

function createEl(key, val, map) {
    var firstLevel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var type = 'object',
        isUnenumerable = false,
        id = void 0;

    if (key === 'erudaProto') key = '__proto__';
    if ((0, _util.startWith)(key, 'erudaUnenumerable')) {
        key = (0, _util.trim)(key.replace('erudaUnenumerable', ''));
        isUnenumerable = true;
    }

    if ((0, _util.isArr)(val)) type = 'array';

    function wrapKey(key) {
        if (firstLevel) return '';

        var keyClass = 'eruda-key';
        if (isUnenumerable || (0, _util.contain)(LIGHTER_KEY, key)) keyClass = 'eruda-key-lighter';

        return '<span class="' + keyClass + '">' + encode(key) + '</span>: ';
    }

    if (val === null) {
        return '<li>\n                   ' + wrapKey(key) + '\n                   <span class="eruda-null">null</span>\n               </li>';
    }
    if ((0, _util.isObj)(val)) {
        if (val.erudaId) {
            id = val.erudaId;
        } else {
            id = (0, _util.uniqId)('erudaJson');
            val.erudaId = id;
        }
        var circularId = val.erudaCircular;
        if (id) map[id] = val;
        var objAbstract = val['erudaObjAbstract'] || (0, _util.upperFirst)(type);

        var obj = '<li ' + (firstLevel ? 'data-first-level="true"' : '') + ' ' + ('data-object-id="' + (circularId ? circularId : id) + '"') + '>\n                       <span class="' + (firstLevel ? '' : 'eruda-expanded eruda-collapsed') + '"></span>\n                       ' + wrapKey(key) + '\n                       <span class="eruda-open">' + (firstLevel ? '' : objAbstract) + '</span>\n                       <ul class="eruda-' + type + '" ' + (firstLevel ? '' : 'style="display:none"') + '>';

        var jsonHtml = jsonToHtml(val, map);
        if (firstLevel) obj += jsonHtml;

        return obj + '</ul><span class="eruda-close"></span></li>';
    }
    if ((0, _util.isNum)(val) || (0, _util.isBool)(val)) {
        return '<li>\n                   ' + wrapKey(key) + '\n                   <span class="eruda-' + (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) + '">' + encode(val) + '</span>\n                </li>';
    }
    if ((0, _util.isStr)(val) && (0, _util.startWith)(val, 'function')) {
        return '<li>\n                   ' + wrapKey(key) + '\n                   <span class="eruda-function">' + encode(val).replace('function', '') + '</span>\n                </li>';
    }
    if (val === 'undefined' || val === 'Symbol' || val === '(...)') {
        return '<li>\n                   ' + wrapKey(key) + '\n                   <span class="eruda-special">' + val + '</span>\n                </li>';
    }

    return '<li>\n                ' + wrapKey(key) + '\n                <span class="eruda-' + (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) + '">"' + encode(val) + '"</span>\n            </li>';
}

var LIGHTER_KEY = ['__proto__'];

var encode = function encode(str) {
    return (0, _util.escape)((0, _util.toStr)(str));
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(28);
var TAG = __webpack_require__(11)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(166), __esModule: true };

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getType = getType;
exports.lenToUtf8Bytes = lenToUtf8Bytes;

var _util = __webpack_require__(0);

function getType(contentType) {
    if (!contentType) return 'unknown';

    var type = contentType.split(';')[0].split('/');

    return {
        type: type[0],
        subType: (0, _util.last)(type)
    };
}

function lenToUtf8Bytes(str) {
    var m = encodeURIComponent(str).match(/%[89ABab]/g);

    return str.length + (m ? m.length : 0);
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(36);

var _assign2 = _interopRequireDefault(_assign);

var _EntryBtn = __webpack_require__(85);

var _EntryBtn2 = _interopRequireDefault(_EntryBtn);

var _DevTools = __webpack_require__(139);

var _DevTools2 = _interopRequireDefault(_DevTools);

var _Tool = __webpack_require__(9);

var _Tool2 = _interopRequireDefault(_Tool);

var _Console = __webpack_require__(145);

var _Console2 = _interopRequireDefault(_Console);

var _Network = __webpack_require__(160);

var _Network2 = _interopRequireDefault(_Network);

var _Elements = __webpack_require__(172);

var _Elements2 = _interopRequireDefault(_Elements);

var _Snippets = __webpack_require__(182);

var _Snippets2 = _interopRequireDefault(_Snippets);

var _Resources = __webpack_require__(186);

var _Resources2 = _interopRequireDefault(_Resources);

var _Info = __webpack_require__(189);

var _Info2 = _interopRequireDefault(_Info);

var _Sources = __webpack_require__(193);

var _Sources2 = _interopRequireDefault(_Sources);

var _Settings = __webpack_require__(13);

var _Settings2 = _interopRequireDefault(_Settings);

var _emitter = __webpack_require__(26);

var _emitter2 = _interopRequireDefault(_emitter);

var _config = __webpack_require__(201);

var _config2 = _interopRequireDefault(_config);

var _logger = __webpack_require__(35);

var _logger2 = _interopRequireDefault(_logger);

var _extraUtil = __webpack_require__(203);

var _extraUtil2 = _interopRequireDefault(_extraUtil);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    init: function init() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            container = _ref.container,
            tool = _ref.tool,
            _ref$autoScale = _ref.autoScale,
            autoScale = _ref$autoScale === undefined ? true : _ref$autoScale;

        this._isInit = true;
        this._scale = 1;

        this._initContainer(container);
        this._initStyle();
        this._initDevTools();
        this._initEntryBtn();
        this._initSettings();
        this._initTools(tool);
        this._registerListener();

        if (autoScale) this._autoScale();
    },

    _isInit: false,
    version: "1.4.0",
    config: _config2.default, util: _util2.default,
    Tool: _Tool2.default, Console: _Console2.default, Elements: _Elements2.default, Network: _Network2.default, Sources: _Sources2.default, Resources: _Resources2.default, Info: _Info2.default, Snippets: _Snippets2.default,
    get: function get(name) {
        if (!this._checkInit()) return;

        var devTools = this._devTools;

        return name ? devTools.get(name) : devTools;
    },
    add: function add(tool) {
        if (!this._checkInit()) return;

        if ((0, _util.isFn)(tool)) tool = tool(this);

        this._devTools.add(tool);

        return this;
    },
    remove: function remove(name) {
        this._devTools.remove(name);

        return this;
    },
    show: function show(name) {
        if (!this._checkInit()) return;

        var devTools = this._devTools;

        name ? devTools.showTool(name) : devTools.show();

        return this;
    },
    hide: function hide() {
        if (!this._checkInit()) return;

        this._devTools.hide();

        return this;
    },
    destroy: function destroy() {
        this._devTools.destroy();
        delete this._devTools;
        this._entryBtn.destroy();
        delete this._entryBtn;
        this._unregisterListener();
        this._$el.remove();
        _util.evalCss.clear();
    },
    scale: function scale(s) {
        if ((0, _util.isNum)(s)) {
            this._scale = s;
            _emitter2.default.emit(_emitter2.default.SCALE, s);
            return this;
        }

        return this._scale;
    },
    _autoScale: function _autoScale() {
        if (!(0, _util.isMobile)()) return;

        this.scale(1 / (0, _util.viewportScale)());
    },
    _registerListener: function _registerListener() {
        var _this = this;

        this._addListener = function () {
            return _this.add.apply(_this, arguments);
        };
        this._showListener = function () {
            return _this.show.apply(_this, arguments);
        };

        _emitter2.default.on(_emitter2.default.ADD, this._addListener);
        _emitter2.default.on(_emitter2.default.SHOW, this._showListener);
        _emitter2.default.on(_emitter2.default.SCALE, _util.evalCss.setScale);
    },
    _unregisterListener: function _unregisterListener() {
        _emitter2.default.off(_emitter2.default.ADD, this._addListener);
        _emitter2.default.off(_emitter2.default.SHOW, this._showListener);
        _emitter2.default.off(_emitter2.default.SCALE, _util.evalCss.setScale);
    },
    _checkInit: function _checkInit() {
        if (!this._isInit) _logger2.default.error('Please call "eruda.init()" first');
        return this._isInit;
    },
    _initContainer: function _initContainer(el) {
        if (!el) {
            el = document.createElement('div');
            document.documentElement.appendChild(el);
        }

        (0, _assign2.default)(el, {
            id: 'eruda',
            className: 'eruda-container',
            contentEditable: false
        });

        // http://stackoverflow.com/questions/3885018/active-pseudo-class-doesnt-work-in-mobile-safari
        if ((0, _util.detectBrowser)().name === 'ios') el.setAttribute('ontouchstart', '');

        this._$el = (0, _util.$)(el);
    },
    _initDevTools: function _initDevTools() {
        this._devTools = new _DevTools2.default(this._$el);
    },
    _initStyle: function _initStyle() {
        var className = 'eruda-style-container',
            $el = this._$el;

        $el.append('<div class="' + className + '"></div>');

        _util.evalCss.container = $el.find('.' + className).get(0);
        (0, _util.evalCss)(__webpack_require__(204) + __webpack_require__(205) + __webpack_require__(206));
    },
    _initEntryBtn: function _initEntryBtn() {
        var _this2 = this;

        this._entryBtn = new _EntryBtn2.default(this._$el);
        this._entryBtn.on('click', function () {
            return _this2._devTools.toggle();
        });
    },
    _initSettings: function _initSettings() {
        var devTools = this._devTools,
            settings = new _Settings2.default();

        devTools.add(settings);

        this._entryBtn.initCfg(settings);
        devTools.initCfg(settings);
    },
    _initTools: function _initTools() {
        var _this3 = this;

        var tool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['console', 'elements', 'network', 'resources', 'sources', 'info', 'snippets'];

        tool = (0, _util.toArr)(tool).reverse();

        var devTools = this._devTools;

        tool.forEach(function (name) {
            var Tool = _this3[(0, _util.upperFirst)(name)];
            try {
                if (Tool) devTools.add(new Tool());
            } catch (e) {
                // Use nextTick to make sure it is possible to be caught by console panel.
                (0, _util.nextTick)(function () {
                    _logger2.default.error('Something wrong when initializing tool ' + name + ':', e.message);
                });
            }
        });

        devTools.showTool((0, _util.last)(tool) || 'settings');
    }
};

(0, _extraUtil2.default)(_util2.default);

//# sourceMappingURL=index.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
module.exports = __webpack_require__(5).Object.assign;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(12);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(81) });


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(23);
var gOPS = __webpack_require__(45);
var pIE = __webpack_require__(30);
var toObject = __webpack_require__(31);
var IObject = __webpack_require__(62);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(22)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(83);
var toAbsoluteIndex = __webpack_require__(84);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(41);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(41);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _draggabilly = __webpack_require__(112);

var _draggabilly2 = _interopRequireDefault(_draggabilly);

var _emitter = __webpack_require__(26);

var _emitter2 = _interopRequireDefault(_emitter);

var _Settings = __webpack_require__(13);

var _Settings2 = _interopRequireDefault(_Settings);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntryBtn = function (_Emitter) {
    (0, _inherits3.default)(EntryBtn, _Emitter);

    function EntryBtn($container) {
        (0, _classCallCheck3.default)(this, EntryBtn);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EntryBtn.__proto__ || (0, _getPrototypeOf2.default)(EntryBtn)).call(this));

        _this._style = (0, _util.evalCss)(__webpack_require__(137));

        _this._$container = $container;
        _this._appendTpl();
        _this._makeDraggable();
        _this._bindEvent();
        _this._registerListener();
        return _this;
    }

    (0, _createClass3.default)(EntryBtn, [{
        key: 'hide',
        value: function hide() {
            this._$el.hide();
        }
    }, {
        key: 'show',
        value: function show() {
            this._$el.show();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            _util.evalCss.remove(this._style);
            this._unregisterListener();
            this._$el.remove();
        }
    }, {
        key: '_isOutOfRange',
        value: function _isOutOfRange() {
            var cfg = this.config,
                pos = cfg.get('pos'),
                defPos = this._getDefPos();

            return pos.x > defPos.x + 10 || pos.x < 0 || pos.y < 0 || pos.y > defPos.y + 10;
        }
    }, {
        key: '_registerListener',
        value: function _registerListener() {
            var _this2 = this;

            this._scaleListener = function () {
                return (0, _util.nextTick)(function () {
                    if (_this2._isOutOfRange()) _this2._setPos();
                });
            };
            _emitter2.default.on(_emitter2.default.SCALE, this._scaleListener);
        }
    }, {
        key: '_unregisterListener',
        value: function _unregisterListener() {
            _emitter2.default.off(_emitter2.default.SCALE, this._scaleListener);
        }
    }, {
        key: '_appendTpl',
        value: function _appendTpl() {
            var $container = this._$container;

            $container.append(__webpack_require__(138)());
            this._$el = $container.find('.eruda-entry-btn');
        }
    }, {
        key: '_setPos',
        value: function _setPos(orientationChanged) {
            var cfg = this.config,
                pos = cfg.get('pos'),
                defPos = this._getDefPos();

            if (this._isOutOfRange() || !cfg.get('rememberPos') || orientationChanged) pos = defPos;

            this._$el.css({
                left: pos.x,
                top: pos.y
            });

            cfg.set('pos', pos);
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var _this3 = this;

            var draggabilly = this._draggabilly,
                $el = this._$el;

            draggabilly.on('staticClick', function () {
                return _this3.emit('click');
            }).on('dragStart', function () {
                return $el.addClass('eruda-active');
            });

            draggabilly.on('dragEnd', function () {
                var cfg = _this3.config;

                if (cfg.get('rememberPos')) {
                    cfg.set('pos', {
                        x: (0, _util.pxToNum)(_this3._$el.css('left')),
                        y: (0, _util.pxToNum)(_this3._$el.css('top'))
                    });
                }

                $el.rmClass('eruda-active');
            });

            _util.orientation.on('change', function () {
                return _this3._setPos(true);
            });
            window.addEventListener('resize', function () {
                return _this3._setPos();
            });
        }
    }, {
        key: '_makeDraggable',
        value: function _makeDraggable() {
            this._draggabilly = new _draggabilly2.default(this._$el.get(0), { containment: true });
        }
    }, {
        key: 'initCfg',
        value: function initCfg(settings) {
            var cfg = this.config = _Settings2.default.createCfg('home-button', {
                rememberPos: true,
                pos: this._getDefPos()
            });

            settings.separator().switch(cfg, 'rememberPos', 'Remember Entry Button Position');

            this._setPos();
        }
    }, {
        key: '_getDefPos',
        value: function _getDefPos() {
            var minWidth = this._$el.get(0).offsetWidth + 10;

            return {
                x: window.innerWidth - minWidth,
                y: window.innerHeight - minWidth
            };
        }
    }]);
    return EntryBtn;
}(_util.Emitter);

exports.default = EntryBtn;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
module.exports = __webpack_require__(5).Object.getPrototypeOf;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(31);
var $getPrototypeOf = __webpack_require__(63);

__webpack_require__(24)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(89);
var $Object = __webpack_require__(5).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(12);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(17), 'Object', { defineProperty: __webpack_require__(15).f });


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(46);
__webpack_require__(50);
module.exports = __webpack_require__(51).f('iterator');


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(41);
var defined = __webpack_require__(40);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(48);
var descriptor = __webpack_require__(27);
var setToStringTag = __webpack_require__(49);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(20)(IteratorPrototype, __webpack_require__(11)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(15);
var anObject = __webpack_require__(21);
var getKeys = __webpack_require__(23);

module.exports = __webpack_require__(17) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(96);
var step = __webpack_require__(97);
var Iterators = __webpack_require__(25);
var toIObject = __webpack_require__(19);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(65)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
__webpack_require__(103);
__webpack_require__(104);
__webpack_require__(105);
module.exports = __webpack_require__(5).Symbol;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(10);
var has = __webpack_require__(18);
var DESCRIPTORS = __webpack_require__(17);
var $export = __webpack_require__(12);
var redefine = __webpack_require__(66);
var META = __webpack_require__(68).KEY;
var $fails = __webpack_require__(22);
var shared = __webpack_require__(43);
var setToStringTag = __webpack_require__(49);
var uid = __webpack_require__(29);
var wks = __webpack_require__(11);
var wksExt = __webpack_require__(51);
var wksDefine = __webpack_require__(52);
var enumKeys = __webpack_require__(101);
var isArray = __webpack_require__(102);
var anObject = __webpack_require__(21);
var isObject = __webpack_require__(16);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(39);
var createDesc = __webpack_require__(27);
var _create = __webpack_require__(48);
var gOPNExt = __webpack_require__(69);
var $GOPD = __webpack_require__(53);
var $DP = __webpack_require__(15);
var $keys = __webpack_require__(23);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(70).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(30).f = $propertyIsEnumerable;
  __webpack_require__(45).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(47)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(20)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(23);
var gOPS = __webpack_require__(45);
var pIE = __webpack_require__(30);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(28);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 103 */
/***/ (function(module, exports) {



/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52)('asyncIterator');


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52)('observable');


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
module.exports = __webpack_require__(5).Object.setPrototypeOf;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(12);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(109).set });


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(16);
var anObject = __webpack_require__(21);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(37)(Function.call, __webpack_require__(53).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(111);
var $Object = __webpack_require__(5).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(12);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(48) });


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Draggabilly v2.1.1
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(113),
        __webpack_require__(114)
      ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( getSize, Unidragger ) {
        return factory( window, getSize, Unidragger );
      }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size'),
      require('unidragger')
    );
  } else {
    // browser global
    window.Draggabilly = factory(
      window,
      window.getSize,
      window.Unidragger
    );
  }

}( window, function factory( window, getSize, Unidragger ) {

'use strict';

// vars
var document = window.document;

function noop() {}

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

function isElement( obj ) {
  return obj instanceof HTMLElement;
}

// -------------------------- requestAnimationFrame -------------------------- //

// get rAF, prefixed, if present
var requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

// fallback to setTimeout
var lastTime = 0;
if ( !requestAnimationFrame )  {
  requestAnimationFrame = function( callback ) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
    var id = setTimeout( callback, timeToCall );
    lastTime = currTime + timeToCall;
    return id;
  };
}

// -------------------------- support -------------------------- //

var docElem = document.documentElement;
var transformProperty = typeof docElem.style.transform == 'string' ?
  'transform' : 'WebkitTransform';

var jQuery = window.jQuery;

// --------------------------  -------------------------- //

function Draggabilly( element, options ) {
  // querySelector if string
  this.element = typeof element == 'string' ?
    document.querySelector( element ) : element;

  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = extend( {}, this.constructor.defaults );
  this.option( options );

  this._create();
}

// inherit Unidragger methods
var proto = Draggabilly.prototype = Object.create( Unidragger.prototype );

Draggabilly.defaults = {
};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  extend( this.options, opts );
};

// css position values that don't need to be set
var positionValues = {
  relative: true,
  absolute: true,
  fixed: true
};

proto._create = function() {

  // properties
  this.position = {};
  this._getPosition();

  this.startPoint = { x: 0, y: 0 };
  this.dragPoint = { x: 0, y: 0 };

  this.startPosition = extend( {}, this.position );

  // set relative positioning
  var style = getComputedStyle( this.element );
  if ( !positionValues[ style.position ] ) {
    this.element.style.position = 'relative';
  }

  this.enable();
  this.setHandles();

};

/**
 * set this.handles and bind start events to 'em
 */
proto.setHandles = function() {
  this.handles = this.options.handle ?
    this.element.querySelectorAll( this.options.handle ) : [ this.element ];

  this.bindHandles();
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = [ event ].concat( args );
  this.emitEvent( type, emitArgs );
  var jQuery = window.jQuery;
  // trigger jQuery event
  if ( jQuery && this.$element ) {
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- position -------------------------- //

// get x/y position from style
proto._getPosition = function() {
  var style = getComputedStyle( this.element );
  var x = this._getPositionCoord( style.left, 'width' );
  var y = this._getPositionCoord( style.top, 'height' );
  // clean up 'auto' or other non-integer values
  this.position.x = isNaN( x ) ? 0 : x;
  this.position.y = isNaN( y ) ? 0 : y;

  this._addTransformPosition( style );
};

proto._getPositionCoord = function( styleSide, measure ) {
  if ( styleSide.indexOf('%') != -1 ) {
    // convert percent into pixel for Safari, #75
    var parentSize = getSize( this.element.parentNode );
    // prevent not-in-DOM element throwing bug, #131
    return !parentSize ? 0 :
      ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
  }
  return parseInt( styleSide, 10 );
};

// add transform: translate( x, y ) to position
proto._addTransformPosition = function( style ) {
  var transform = style[ transformProperty ];
  // bail out if value is 'none'
  if ( transform.indexOf('matrix') !== 0 ) {
    return;
  }
  // split matrix(1, 0, 0, 1, x, y)
  var matrixValues = transform.split(',');
  // translate X value is in 12th or 4th position
  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
  var translateX = parseInt( matrixValues[ xIndex ], 10 );
  // translate Y value is in 13th or 5th position
  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
  this.position.x += translateX;
  this.position.y += translateY;
};

// -------------------------- events -------------------------- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  this._dragPointerDown( event, pointer );
  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  if ( focused && focused.blur && focused != document.body ) {
    focused.blur();
  }
  // bind move and end events
  this._bindPostStartEvents( event );
  this.element.classList.add('is-pointer-down');
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

/**
 * drag start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragStart = function( event, pointer ) {
  if ( !this.isEnabled ) {
    return;
  }
  this._getPosition();
  this.measureContainment();
  // position _when_ drag began
  this.startPosition.x = this.position.x;
  this.startPosition.y = this.position.y;
  // reset left/top style
  this.setLeftTop();

  this.dragPoint.x = 0;
  this.dragPoint.y = 0;

  this.element.classList.add('is-dragging');
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
  // start animation
  this.animate();
};

proto.measureContainment = function() {
  var containment = this.options.containment;
  if ( !containment ) {
    return;
  }

  // use element if element
  var container = isElement( containment ) ? containment :
    // fallback to querySelector if string
    typeof containment == 'string' ? document.querySelector( containment ) :
    // otherwise just `true`, use the parent
    this.element.parentNode;

  var elemSize = getSize( this.element );
  var containerSize = getSize( container );
  var elemRect = this.element.getBoundingClientRect();
  var containerRect = container.getBoundingClientRect();

  var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
  var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

  var position = this.relativeStartPosition = {
    x: elemRect.left - ( containerRect.left + containerSize.borderLeftWidth ),
    y: elemRect.top - ( containerRect.top + containerSize.borderTopWidth )
  };

  this.containSize = {
    width: ( containerSize.width - borderSizeX ) - position.x - elemSize.width,
    height: ( containerSize.height - borderSizeY ) - position.y - elemSize.height
  };
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isEnabled ) {
    return;
  }
  var dragX = moveVector.x;
  var dragY = moveVector.y;

  var grid = this.options.grid;
  var gridX = grid && grid[0];
  var gridY = grid && grid[1];

  dragX = applyGrid( dragX, gridX );
  dragY = applyGrid( dragY, gridY );

  dragX = this.containDrag( 'x', dragX, gridX );
  dragY = this.containDrag( 'y', dragY, gridY );

  // constrain to axis
  dragX = this.options.axis == 'y' ? 0 : dragX;
  dragY = this.options.axis == 'x' ? 0 : dragY;

  this.position.x = this.startPosition.x + dragX;
  this.position.y = this.startPosition.y + dragY;
  // set dragPoint properties
  this.dragPoint.x = dragX;
  this.dragPoint.y = dragY;

  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

function applyGrid( value, grid, method ) {
  method = method || 'round';
  return grid ? Math[ method ]( value / grid ) * grid : value;
}

proto.containDrag = function( axis, drag, grid ) {
  if ( !this.options.containment ) {
    return drag;
  }
  var measure = axis == 'x' ? 'width' : 'height';

  var rel = this.relativeStartPosition[ axis ];
  var min = applyGrid( -rel, grid, 'ceil' );
  var max = this.containSize[ measure ];
  max = applyGrid( max, grid, 'floor' );
  return  Math.min( max, Math.max( min, drag ) );
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.element.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

/**
 * drag end
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragEnd = function( event, pointer ) {
  if ( !this.isEnabled ) {
    return;
  }
  // use top left position when complete
  if ( transformProperty ) {
    this.element.style[ transformProperty ] = '';
    this.setLeftTop();
  }
  this.element.classList.remove('is-dragging');
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

// -------------------------- animation -------------------------- //

proto.animate = function() {
  // only render and animate if dragging
  if ( !this.isDragging ) {
    return;
  }

  this.positionDrag();

  var _this = this;
  requestAnimationFrame( function animateFrame() {
    _this.animate();
  });

};

// left/top positioning
proto.setLeftTop = function() {
  this.element.style.left = this.position.x + 'px';
  this.element.style.top  = this.position.y + 'px';
};

proto.positionDrag = function() {
  this.element.style[ transformProperty ] = 'translate3d( ' + this.dragPoint.x +
    'px, ' + this.dragPoint.y + 'px, 0)';
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  this.dispatchEvent( 'staticClick', event, [ pointer ] );
};

// ----- methods ----- //

proto.enable = function() {
  this.isEnabled = true;
};

proto.disable = function() {
  this.isEnabled = false;
  if ( this.isDragging ) {
    this.dragEnd();
  }
};

proto.destroy = function() {
  this.disable();
  // reset styles
  this.element.style[ transformProperty ] = '';
  this.element.style.left = '';
  this.element.style.top = '';
  this.element.style.position = '';
  // unbind handles
  this.unbindHandles();
  // remove jQuery data
  if ( this.$element ) {
    this.$element.removeData('draggabilly');
  }
};

// ----- jQuery bridget ----- //

// required for jQuery bridget
proto._init = noop;

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'draggabilly', Draggabilly );
}

// -----  ----- //

return Draggabilly;

}));


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false, console: false */

( function( window, factory ) {
  'use strict';

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return factory();
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See http://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );

  getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize( style.width ) == 200;
  body.removeChild( div );

}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Unidragger v2.1.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(115)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( Unipointer ) {
      return factory( window, Unipointer );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// -----  ----- //

function noop() {}

// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

var navigator = window.navigator;
/**
 * works as unbinder, as you can .bindHandles( false ) to unbind
 * @param {Boolean} isBind - will unbind if falsey
 */
proto._bindHandles = function( isBind ) {
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  // extra bind logic
  var binderExtra;
  if ( navigator.pointerEnabled ) {
    binderExtra = function( handle ) {
      // disable scrolling on the element
      handle.style.touchAction = isBind ? 'none' : '';
    };
  } else if ( navigator.msPointerEnabled ) {
    binderExtra = function( handle ) {
      // disable scrolling on the element
      handle.style.msTouchAction = isBind ? 'none' : '';
    };
  } else {
    binderExtra = noop;
  }
  // bind each handle
  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isBind );
    binderExtra( handle );
    handle[ bindMethod ]( 'click', this );
  }
};

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  // dismiss range sliders
  if ( event.target.nodeName == 'INPUT' && event.target.type == 'range' ) {
    // reset pointerDown logic
    this.isPointerDown = false;
    delete this.pointerIdentifier;
    return;
  }

  this._dragPointerDown( event, pointer );
  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  if ( focused && focused.blur ) {
    focused.blur();
  }
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// base pointer down logic
proto._dragPointerDown = function( event, pointer ) {
  // track to see when dragging starts
  this.pointerDownPoint = Unipointer.getPointerPoint( pointer );

  var canPreventDefault = this.canPreventDefaultOnPointerDown( event, pointer );
  if ( canPreventDefault ) {
    event.preventDefault();
  }
};

// overwriteable method so Flickity can prevent for scrolling
proto.canPreventDefaultOnPointerDown = function( event ) {
  // prevent default, unless touchstart or <select>
  return event.target.nodeName != 'SELECT';
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var movePoint = Unipointer.getPointerPoint( pointer );
  var moveVector = {
    x: movePoint.x - this.pointerDownPoint.x,
    y: movePoint.y - this.pointerDownPoint.y
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};


// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  this.dragStartPoint = Unipointer.getPointerPoint( pointer );
  // prevent clicks
  this.isPreventingClicks = true;

  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  // allow click in <input>s and <textarea>s
  var nodeName = event.target.nodeName;
  if ( nodeName == 'INPUT' || nodeName == 'TEXTAREA' ) {
    event.target.focus();
  }
  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Unipointer v2.1.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(116)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter ) {
      return factory( window, EvEmitter );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {

'use strict';

function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * works as unbinder, as you can ._bindStart( false ) to unbind
 * @param {Boolean} isBind - will unbind if falsey
 */
proto._bindStartEvent = function( elem, isBind ) {
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';

  if ( window.navigator.pointerEnabled ) {
    // W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
    elem[ bindMethod ]( 'pointerdown', this );
  } else if ( window.navigator.msPointerEnabled ) {
    // IE10 Pointer Events
    elem[ bindMethod ]( 'MSPointerDown', this );
  } else {
    // listen for both, for devices like Chrome Pixel
    elem[ bindMethod ]( 'mousedown', this );
    elem[ bindMethod ]( 'touchstart', this );
  }
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onMSPointerDown =
proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss other pointers
  if ( this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
  MSPointerDown: [ 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel' ]
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onMSPointerMove =
proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onMSPointerUp =
proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
  // remove events
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onMSPointerCancel =
proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.0.3
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var i = 0;
  var listener = listeners[i];
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

return EvEmitter;

}));


/***/ }),
/* 117 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 118 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(5);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(5).setImmediate;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(12);
var $task = __webpack_require__(123);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(37);
var invoke = __webpack_require__(124);
var html = __webpack_require__(67);
var cel = __webpack_require__(38);
var global = __webpack_require__(10);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(28)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 124 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
var $Object = __webpack_require__(5).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(19);
var $getOwnPropertyDescriptor = __webpack_require__(53).f;

__webpack_require__(24)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(128), __esModule: true };

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(129);
module.exports = __webpack_require__(5).Object.freeze;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(16);
var meta = __webpack_require__(68).onFreeze;

__webpack_require__(24)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
module.exports = __webpack_require__(5).Object.keys;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(31);
var $keys = __webpack_require__(23);

__webpack_require__(24)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools .eruda-tools .eruda-settings {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-separator {\n    height: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-text {\n    padding: 10px;\n    color: #263238;\n    font-size: 12px; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-select, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-color {\n    cursor: pointer; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-select .eruda-head, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-head, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-color .eruda-head {\n    padding: 10px;\n    background: #fff;\n    font-size: 14px;\n    border-bottom: 1px solid #eceffe;\n    border-top: 1px solid #eceffe;\n    margin-top: -1px; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-select .eruda-head, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-head, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-color .eruda-head {\n    -webkit-transition: background 0.3s, color 0.3s;\n    transition: background 0.3s, color 0.3s; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-select .eruda-head span, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-head span, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-color .eruda-head span {\n      float: right; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-select .eruda-head:active, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-head:active, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-color .eruda-head:active {\n      background: #2196f3;\n      color: #fff; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-color .eruda-head span {\n    display: inline-block;\n    border: 1px solid #263238;\n    width: 15px;\n    height: 15px; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-select ul {\n    display: none; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-select ul.eruda-open {\n      display: block; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-select ul li {\n      padding: 10px;\n      background: #eceffe;\n      -webkit-transition: background 0.3s, color 0.3s;\n      transition: background 0.3s, color 0.3s; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-select ul li:active {\n        background: #2196f3;\n        color: #fff; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-color ul {\n    display: none;\n    padding: 10px;\n    font-size: 0;\n    background: #eceffe; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-color ul.eruda-open {\n      display: block; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-color ul li {\n      display: inline-block;\n      width: 20px;\n      border: 1px solid #263238;\n      height: 20px;\n      margin-right: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-input-container {\n    display: none;\n    padding: 10px;\n    background: #eceffe;\n    position: relative; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-input-container.eruda-open {\n      display: block; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-input-container .eruda-range-track {\n      height: 4px;\n      width: 100%;\n      padding: 0 10px;\n      position: absolute;\n      left: 0;\n      top: 16px; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-input-container .eruda-range-track .eruda-range-track-bar {\n        background: #707d8b;\n        border-radius: 2px;\n        overflow: hidden;\n        width: 100%;\n        height: 4px; }\n        .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-input-container .eruda-range-track .eruda-range-track-bar .eruda-range-track-progress {\n          height: 100%;\n          background: #263238;\n          width: 50%; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-input-container input {\n      -webkit-appearance: none;\n      background: transparent;\n      height: 4px;\n      width: 100%;\n      position: relative;\n      top: -3px;\n      margin: 0 auto;\n      outline: none;\n      border-radius: 2px; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-range .eruda-input-container input::-webkit-slider-thumb {\n      -webkit-appearance: none;\n      position: relative;\n      top: 0px;\n      z-index: 1;\n      width: 16px;\n      border: none;\n      height: 16px;\n      border-radius: 10px;\n      background: radial-gradient(circle at center, #707d8b 0, #707d8b 15%, #fff 22%, #fff 100%);\n      -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n              box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }\n  .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox {\n    float: right;\n    position: relative;\n    vertical-align: top;\n    width: 46px;\n    height: 20px;\n    padding: 3px;\n    border-radius: 18px;\n    -webkit-box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);\n            box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);\n    cursor: pointer;\n    background-image: linear-gradient(to bottom, #eeeeee, white 25px); }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input {\n      position: absolute;\n      top: 0;\n      left: 0;\n      opacity: 0; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-label {\n      pointer-events: none;\n      position: relative;\n      display: block;\n      height: 14px;\n      font-size: 10px;\n      text-transform: uppercase;\n      background: #eceeef;\n      border-radius: inherit;\n      -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);\n              box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);\n      -webkit-transition: 0.15s ease-out;\n      transition: 0.15s ease-out;\n      -webkit-transition-property: opacity background;\n      transition-property: opacity background; }\n      .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-label:before, .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-label:after {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5em;\n        line-height: 1;\n        -webkit-transition: inherit;\n        transition: inherit; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-label {\n      background: #2196f3;\n      -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 3px rgba(0, 0, 0, 0.2);\n              box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 3px rgba(0, 0, 0, 0.2); }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-label:before {\n      opacity: 0; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-label:after {\n      opacity: 1; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-handle {\n      position: absolute;\n      pointer-events: none;\n      top: 0;\n      left: 0;\n      width: 18px;\n      height: 18px;\n      border-radius: 10px;\n      -webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);\n              box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);\n      background-image: -webkit-gradient(linear, left top, left bottom, color-stop(40%, white), to(#f0f0f0));\n      background-image: linear-gradient(to bottom, white 40%, #f0f0f0);\n      -webkit-transition: left 0.15s ease-out;\n      transition: left 0.15s ease-out; }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-handle:before {\n      content: '';\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      margin: -6px 0 0 -6px;\n      width: 12px;\n      height: 12px;\n      border-radius: 6px;\n      -webkit-box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);\n              box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);\n      background-image: -webkit-gradient(linear, left top, left bottom, from(#eeeeee), to(white));\n      background-image: linear-gradient(to bottom, #eeeeee, white); }\n    .eruda-dev-tools .eruda-tools .eruda-settings .eruda-switch .eruda-checkbox .eruda-input:checked ~ .eruda-handle {\n      left: 30px;\n      -webkit-box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2);\n              box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2); }\n", ""]);

// exports


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"eruda-switch\">\r\n    "
    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
    + "\r\n    <label class=\"eruda-checkbox\">\r\n        <input type=\"checkbox\" class=\"eruda-input\" data-idx=\""
    + alias4(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.val : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n        <span class=\"eruda-label\"></span>\r\n        <span class=\"eruda-handle\"></span>\r\n    </label>\r\n</div>";
},"useData":true});

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "           <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"eruda-select\">\r\n    <div class=\"eruda-head\">\r\n        "
    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
    + "\r\n        <span class=\"eruda-val\">"
    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
    + "</span>\r\n    </div>\r\n    <ul data-idx=\""
    + alias4(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.selections : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</div>";
},"useData":true});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"eruda-range\">\r\n    <div class=\"eruda-head\">\r\n        "
    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
    + "\r\n        <span class=\"eruda-val\">"
    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
    + "</span>\r\n    </div>\r\n    <div class=\"eruda-input-container\" data-idx=\""
    + alias4(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"eruda-range-track\">\r\n            <div class=\"eruda-range-track-bar\">\r\n                <div class=\"eruda-range-track-progress\" style=\"width: "
    + alias4(((helper = (helper = helpers.progress || (depth0 != null ? depth0.progress : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"progress","hash":{},"data":data}) : helper)))
    + "%\"></div>\r\n            </div>\r\n        </div>\r\n        <input type=\"range\" min=\""
    + alias4(((helper = (helper = helpers.min || (depth0 != null ? depth0.min : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"min","hash":{},"data":data}) : helper)))
    + "\" max=\""
    + alias4(((helper = (helper = helpers.max || (depth0 != null ? depth0.max : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"max","hash":{},"data":data}) : helper)))
    + "\" step=\""
    + alias4(((helper = (helper = helpers.step || (depth0 != null ? depth0.step : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"step","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
    + "\"/>\r\n    </div>\r\n</div>";
},"useData":true});

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "           <li style=\"background: "
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\"></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"eruda-color\">\r\n    <div class=\"eruda-head\">\r\n        "
    + alias4(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data}) : helper)))
    + "\r\n        <span class=\"eruda-val\" style=\"background-color: "
    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
    + "\"></span>\r\n    </div>\r\n    <ul data-idx=\""
    + alias4(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</div>";
},"useData":true});

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-container .eruda-entry-btn {\n  width: 40px;\n  height: 40px;\n  background: #000;\n  opacity: 0.3;\n  border-radius: 10px;\n  position: relative;\n  z-index: 1000;\n  -webkit-transition: opacity .3s;\n  transition: opacity .3s;\n  color: #fff;\n  font-size: 25px;\n  text-align: center;\n  line-height: 40px; }\n  .eruda-container .eruda-entry-btn.eruda-active, .eruda-container .eruda-entry-btn:active {\n    opacity: .8; }\n", ""]);

// exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"eruda-entry-btn\">\r\n    <span class=\"eruda-icon-cog\"></span>\r\n</div>";
},"useData":true});

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _NavBar = __webpack_require__(140);

var _NavBar2 = _interopRequireDefault(_NavBar);

var _logger = __webpack_require__(35);

var _logger2 = _interopRequireDefault(_logger);

var _Tool = __webpack_require__(9);

var _Tool2 = _interopRequireDefault(_Tool);

var _emitter = __webpack_require__(26);

var _emitter2 = _interopRequireDefault(_emitter);

var _Settings = __webpack_require__(13);

var _Settings2 = _interopRequireDefault(_Settings);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DevTools = function (_Emitter) {
        (0, _inherits3.default)(DevTools, _Emitter);

        function DevTools($container) {
                (0, _classCallCheck3.default)(this, DevTools);

                var _this = (0, _possibleConstructorReturn3.default)(this, (DevTools.__proto__ || (0, _getPrototypeOf2.default)(DevTools)).call(this));

                if (!(0, _util.isMobile)()) (0, _util.evalCss)(__webpack_require__(142));
                _this._style = (0, _util.evalCss)(__webpack_require__(143));

                _this.$container = $container;
                _this._isShow = false;
                _this._opacity = 1;
                _this._scale = 1;
                _this._tools = {};

                _this._appendTpl();
                _this._initNavBar();
                _this._registerListener();
                return _this;
        }

        (0, _createClass3.default)(DevTools, [{
                key: 'show',
                value: function show() {
                        var _this2 = this;

                        this._isShow = true;

                        this._$el.show();
                        this._navBar.resetStyle();

                        // Need a delay after show to enable transition effect.
                        setTimeout(function () {
                                _this2._$el.css('opacity', _this2._opacity);
                        }, 50);

                        return this;
                }
        }, {
                key: 'hide',
                value: function hide() {
                        var _this3 = this;

                        this._isShow = false;

                        this._$el.css({ opacity: 0 });
                        setTimeout(function () {
                                return _this3._$el.hide();
                        }, 300);

                        return this;
                }
        }, {
                key: 'toggle',
                value: function toggle() {
                        return this._isShow ? this.hide() : this.show();
                }
        }, {
                key: 'add',
                value: function add(tool) {
                        if (!(tool instanceof _Tool2.default)) {
                                var _ref = new _Tool2.default(),
                                    init = _ref.init,
                                    show = _ref.show,
                                    hide = _ref.hide,
                                    destroy = _ref.destroy;

                                (0, _util.defaults)(tool, { init: init, show: show, hide: hide, destroy: destroy });
                        }

                        var name = tool.name;
                        if (!name) return _logger2.default.error('You must specify a name for a tool');
                        name = name.toLowerCase();
                        if (this._tools[name]) return _logger2.default.warn('Tool ' + name + ' already exists');

                        this._$tools.prepend('<div class="eruda-' + name + ' eruda-tool"></div>');
                        tool.init(this._$tools.find('.eruda-' + name), this);
                        tool.active = false;
                        this._tools[name] = tool;

                        this._navBar.add(name);

                        return this;
                }
        }, {
                key: 'remove',
                value: function remove(name) {
                        var tools = this._tools;

                        if (!tools[name]) return _logger2.default.warn('Tool ' + name + ' doesn\'t exist');

                        this._navBar.remove(name);

                        var tool = tools[name];
                        delete tools[name];
                        if (tool.active) {
                                var toolKeys = (0, _util.keys)(tools);
                                if (toolKeys.length > 0) this.showTool(tools[(0, _util.last)(toolKeys)].name);
                        }
                        tool.destroy();

                        return this;
                }
        }, {
                key: 'removeAll',
                value: function removeAll() {
                        var _this4 = this;

                        (0, _util.each)(this._tools, function (tool) {
                                return _this4.remove(tool.name);
                        });

                        return this;
                }
        }, {
                key: 'get',
                value: function get(name) {
                        var tool = this._tools[name];

                        if (tool) return tool;
                }
        }, {
                key: 'showTool',
                value: function showTool(name) {
                        if (this._curTool === name) return this;
                        this._curTool = name;

                        var tools = this._tools;

                        var tool = tools[name];
                        if (!tool) return;

                        var lastTool = {};

                        (0, _util.each)(tools, function (tool) {
                                if (tool.active) {
                                        lastTool = tool;
                                        tool.active = false;
                                        tool.hide();
                                }
                        });

                        tool.active = true;
                        tool.show();

                        this._navBar.activeTool(name);

                        this.emit('showTool', name, lastTool);

                        return this;
                }
        }, {
                key: 'initCfg',
                value: function initCfg(settings) {
                        var _this5 = this;

                        var cfg = this.config = _Settings2.default.createCfg('dev-tools', {
                                transparency: 0.95,
                                displaySize: 80,
                                tinyNavBar: !(0, _util.isMobile)(),
                                activeEruda: false,
                                navBarBgColor: '#2196f3'
                        });

                        this._setTransparency(cfg.get('transparency'));
                        this._setDisplaySize(cfg.get('displaySize'));
                        this.setNavBarHeight(cfg.get('tinyNavBar') ? 30 : 55);
                        this._navBar.setBgColor(cfg.get('navBarBgColor'));

                        cfg.on('change', function (key, val) {
                                switch (key) {
                                        case 'transparency':
                                                return _this5._setTransparency(val);
                                        case 'displaySize':
                                                return _this5._setDisplaySize(val);
                                        case 'activeEruda':
                                                return activeEruda(val);
                                        case 'tinyNavBar':
                                                return _this5.setNavBarHeight(val ? 30 : 55);
                                        case 'navBarBgColor':
                                                return _this5._navBar.setBgColor(val);
                                }
                        });

                        settings.separator().switch(cfg, 'activeEruda', 'Always Activated').switch(cfg, 'tinyNavBar', 'Tiny Navigation Bar').color(cfg, 'navBarBgColor', 'Navigation Bar Background Color').range(cfg, 'transparency', 'Transparency', { min: 0.2, max: 1, step: 0.01 }).range(cfg, 'displaySize', 'Display Size', { min: 40, max: 100, step: 1 }).separator();
                }
        }, {
                key: 'setNavBarHeight',
                value: function setNavBarHeight(height) {
                        this._navBarHeight = height;
                        this._$el.css('paddingTop', height * this._scale);
                        this._navBar.setHeight(height * this._scale);
                }
        }, {
                key: 'destroy',
                value: function destroy() {
                        _util.evalCss.remove(this._style);
                        this._unregisterListener();
                        this.removeAll();
                        this._navBar.destroy();
                        this._$el.remove();
                }
        }, {
                key: '_registerListener',
                value: function _registerListener() {
                        var _this6 = this;

                        this._scaleListener = function (scale) {
                                _this6._scale = scale;
                                _this6.setNavBarHeight(_this6._navBarHeight);
                        };

                        _emitter2.default.on(_emitter2.default.SCALE, this._scaleListener);
                }
        }, {
                key: '_unregisterListener',
                value: function _unregisterListener() {
                        _emitter2.default.off(_emitter2.default.SCALE, this._scaleListener);
                }
        }, {
                key: '_setTransparency',
                value: function _setTransparency(opacity) {
                        if (!(0, _util.isNum)(opacity)) return;

                        this._opacity = opacity;
                        if (this._isShow) this._$el.css({ opacity: opacity });
                }
        }, {
                key: '_setDisplaySize',
                value: function _setDisplaySize(height) {
                        if (!(0, _util.isNum)(height)) return;

                        this._$el.css({ height: height + '%' });
                }
        }, {
                key: '_appendTpl',
                value: function _appendTpl() {
                        var $container = this.$container;

                        $container.append(__webpack_require__(144)());

                        this._$el = $container.find('.eruda-dev-tools');
                        this._$tools = this._$el.find('.eruda-tools');
                }
        }, {
                key: '_initNavBar',
                value: function _initNavBar() {
                        var _this7 = this;

                        this._navBar = new _NavBar2.default(this._$el.find('.eruda-nav-bar'));
                        this._navBar.on('showTool', function (name) {
                                return _this7.showTool(name);
                        });
                }
        }]);
        return DevTools;
}(_util.Emitter);

exports.default = DevTools;


var localStore = (0, _util.safeStorage)('local');

var activeEruda = function activeEruda(flag) {
        return localStore.setItem('active-eruda', flag);
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavBar = function (_Emitter) {
    (0, _inherits3.default)(NavBar, _Emitter);

    function NavBar($el) {
        (0, _classCallCheck3.default)(this, NavBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NavBar.__proto__ || (0, _getPrototypeOf2.default)(NavBar)).call(this));

        _this._style = (0, _util.evalCss)(__webpack_require__(141));

        _this._$el = $el;
        $el.html('<div class="eruda-bottom-bar"></div>');
        _this._$bottomBar = $el.find('.eruda-bottom-bar');
        _this._len = 0;
        _this._height = 55;

        _this._bindEvent();
        return _this;
    }

    (0, _createClass3.default)(NavBar, [{
        key: 'add',
        value: function add(name) {
            this._len++;
            this._$el.prepend('<div class="eruda-nav-bar-item">' + name + '</div>');
            this.resetStyle();
        }
    }, {
        key: 'remove',
        value: function remove(name) {
            this._len--;
            this._$el.find('.eruda-nav-bar-item').each(function () {
                var $this = (0, _util.$)(this);
                if ($this.text().toLowerCase() === name.toLowerCase()) $this.remove();
            });
        }
    }, {
        key: 'setHeight',
        value: function setHeight(height) {
            this._height = height;
            this.resetStyle();
        }
    }, {
        key: 'setBgColor',
        value: function setBgColor(color) {
            this._$el.css('background-color', color);
        }
    }, {
        key: 'activeTool',
        value: function activeTool(name) {
            var self = this;

            this._$el.find('.eruda-nav-bar-item').each(function () {
                var $this = (0, _util.$)(this);

                if ($this.text() === name) {
                    $this.addClass('eruda-active');
                    self._resetBottomBar();
                    self._scrollItemToView();
                } else {
                    $this.rmClass('eruda-active');
                }
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            _util.evalCss.remove(this._style);
            this._$el.remove();
        }
    }, {
        key: '_scrollItemToView',
        value: function _scrollItemToView() {
            var $el = this._$el,
                li = $el.find('.eruda-active').get(0),
                container = $el.get(0);

            var itemLeft = li.offsetLeft,
                itemWidth = li.offsetWidth,
                containerWidth = container.offsetWidth,
                scrollLeft = container.scrollLeft,
                targetScrollLeft = void 0;

            if (itemLeft < scrollLeft) {
                targetScrollLeft = itemLeft;
            } else if (itemLeft + itemWidth > containerWidth + scrollLeft) {
                targetScrollLeft = itemLeft + itemWidth - containerWidth;
            }

            if (!(0, _util.isNum)(targetScrollLeft)) return;

            container.scrollLeft = targetScrollLeft;
        }
    }, {
        key: '_resetBottomBar',
        value: function _resetBottomBar() {
            var $bottomBar = this._$bottomBar;

            var li = this._$el.find('.eruda-active').get(0);

            if (!li) return;

            $bottomBar.css({
                width: li.offsetWidth,
                left: li.offsetLeft
            });
        }
    }, {
        key: 'resetStyle',
        value: function resetStyle() {
            var height = this._height;

            this._$el.css('height', height);

            var $el = this._$el;

            $el.css({
                height: height
            });
            $el.find('.eruda-nav-bar-item').css({
                'height': height,
                'lineHeight': height
            });

            this._resetBottomBar();
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var self = this;

            this._$el.on('click', '.eruda-nav-bar-item', function () {
                self.emit('showTool', (0, _util.$)(this).text());
            });
        }
    }]);
    return NavBar;
}(_util.Emitter);

exports.default = NavBar;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools .eruda-nav-bar {\n  position: absolute;\n  width: 100%;\n  height: 55px;\n  left: 0;\n  top: 0;\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n  z-index: 100;\n  background: #2196f3;\n  font-size: 0;\n  white-space: nowrap; }\n  .eruda-dev-tools .eruda-nav-bar .eruda-nav-bar-item {\n    cursor: pointer;\n    display: inline-block;\n    height: 55px;\n    line-height: 55px;\n    padding: 0 10px;\n    color: #fff;\n    font-size: 12px;\n    text-align: center;\n    text-transform: capitalize;\n    -webkit-transition: all 0.3s;\n    transition: all 0.3s; }\n    .eruda-dev-tools .eruda-nav-bar .eruda-nav-bar-item:active {\n      background: #263238;\n      opacity: 0.5; }\n    .eruda-dev-tools .eruda-nav-bar .eruda-nav-bar-item.eruda-active {\n      background: #eceffe;\n      color: #263238;\n      opacity: 0.5; }\n  .eruda-dev-tools .eruda-nav-bar .eruda-bottom-bar {\n    -webkit-transition: left 0.3s, width 0.3s;\n    transition: left 0.3s, width 0.3s;\n    height: 3px;\n    background: #fff;\n    position: absolute;\n    bottom: 0;\n    left: 0; }\n", ""]);

// exports


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, "::-webkit-scrollbar {\r\n  width: 7px;\r\n  height: 7px;\r\n}\r\n::-webkit-scrollbar-thumb {\r\n  background: rgba(0, 0, 0, 0.4);\r\n}\r\n::-webkit-scrollbar-track {\r\n  background: transparent;\r\n  border: 0px none #ffffff;\r\n  border-radius: 0px;\r\n}\r\n::-webkit-scrollbar-corner {\r\n  background: transparent;\r\n}", ""]);

// exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  bottom: 0;\n  background: #fff;\n  z-index: 500;\n  display: none;\n  opacity: 0;\n  -webkit-transition: opacity 0.3s;\n  transition: opacity 0.3s; }\n  .eruda-dev-tools .eruda-tools {\n    overflow: auto;\n    -webkit-overflow-scrolling: touch;\n    height: 100%;\n    width: 100%;\n    position: relative; }\n    .eruda-dev-tools .eruda-tools .eruda-tool {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      left: 0;\n      top: 0;\n      overflow: hidden;\n      display: none;\n      background: #f8f9fa; }\n", ""]);

// exports


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"eruda-dev-tools\">\r\n    <div class=\"eruda-nav-bar\"></div>\r\n    <div class=\"eruda-tools\"></div>\r\n</div>";
},"useData":true});

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(36);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(14);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Logger = __webpack_require__(146);

var _Logger2 = _interopRequireDefault(_Logger);

var _Tool2 = __webpack_require__(9);

var _Tool3 = _interopRequireDefault(_Tool2);

var _util = __webpack_require__(0);

var _emitter = __webpack_require__(26);

var _emitter2 = _interopRequireDefault(_emitter);

var _Settings = __webpack_require__(13);

var _Settings2 = _interopRequireDefault(_Settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Console = function (_Tool) {
    (0, _inherits3.default)(Console, _Tool);

    function Console() {
        (0, _classCallCheck3.default)(this, Console);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Console.__proto__ || (0, _getPrototypeOf2.default)(Console)).call(this));

        _this.name = 'console';
        _this._scale = 1;

        _this._registerListener();
        return _this;
    }

    (0, _createClass3.default)(Console, [{
        key: 'init',
        value: function init($el, container) {
            var _this2 = this;

            (0, _get3.default)(Console.prototype.__proto__ || (0, _getPrototypeOf2.default)(Console.prototype), 'init', this).call(this, $el);

            this._appendTpl();

            this._initLogger();
            this._exposeLogger();
            this._rejectionHandler = function (e) {
                return _this2._logger.error(e.reason);
            };

            this._initCfg(container);
            this._bindEvent(container);
        }
    }, {
        key: 'show',
        value: function show() {
            (0, _get3.default)(Console.prototype.__proto__ || (0, _getPrototypeOf2.default)(Console.prototype), 'show', this).call(this);

            this._logger.render();
        }
    }, {
        key: 'overrideConsole',
        value: function overrideConsole() {
            var logger = this._logger,
                origConsole = this._origConsole = {},
                winConsole = window.console;

            CONSOLE_METHOD.forEach(function (name) {
                var origin = origConsole[name] = _util.noop;
                if (winConsole[name]) origin = origConsole[name] = winConsole[name].bind(winConsole);

                winConsole[name] = function () {
                    logger[name].apply(logger, arguments);
                    origin.apply(undefined, arguments);
                };
            });

            return this;
        }
    }, {
        key: 'restoreConsole',
        value: function restoreConsole() {
            var _this3 = this;

            if (!this._origConsole) return this;

            CONSOLE_METHOD.forEach(function (name) {
                return window.console[name] = _this3._origConsole[name];
            });
            delete this._origConsole;

            return this;
        }
    }, {
        key: 'catchGlobalErr',
        value: function catchGlobalErr() {
            var _this4 = this;

            this._origOnerror = window.onerror;

            window.onerror = function (errMsg, url, lineNum, column, errObj) {
                return _this4._logger.error(errObj ? errObj : errMsg);
            };
            window.addEventListener('unhandledrejection', this._rejectionHandler);

            return this;
        }
    }, {
        key: 'ignoreGlobalErr',
        value: function ignoreGlobalErr() {
            if (this._origOnerror) {
                window.onerror = this._origOnerror;
                delete this._origOnerror;
            }
            window.removeEventListener('unhandledrejection', this._rejectionHandler);

            return this;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this._logger.destroy();
            (0, _get3.default)(Console.prototype.__proto__ || (0, _getPrototypeOf2.default)(Console.prototype), 'destroy', this).call(this);

            _util.evalCss.remove(this._style);
            this.ignoreGlobalErr();
            this.restoreConsole();
            this._unregisterListener();
        }
    }, {
        key: '_registerListener',
        value: function _registerListener() {
            var _this5 = this;

            this._scaleListener = function (scale) {
                return _this5._scale = scale;
            };

            _emitter2.default.on(_emitter2.default.SCALE, this._scaleListener);
        }
    }, {
        key: '_unregisterListener',
        value: function _unregisterListener() {
            _emitter2.default.off(_emitter2.default.SCALE, this._scaleListener);
        }
    }, {
        key: '_appendTpl',
        value: function _appendTpl() {
            var $el = this._$el;

            this._style = (0, _util.evalCss)(__webpack_require__(158));
            $el.append(__webpack_require__(159)());

            var _$inputContainer = $el.find('.eruda-js-input'),
                _$input = _$inputContainer.find('textarea'),
                _$inputBtns = _$inputContainer.find('.eruda-buttons');

            (0, _assign2.default)(this, {
                _$control: $el.find('.eruda-control'),
                _$logs: $el.find('.eruda-logs'),
                _$inputContainer: _$inputContainer, _$input: _$input, _$inputBtns: _$inputBtns
            });
        }
    }, {
        key: '_initLogger',
        value: function _initLogger() {
            var $filter = this._$control.find('.eruda-filter'),
                logger = this._logger = new _Logger2.default(this._$logs, this);

            logger.on('filter', function (filter) {
                return $filter.each(function () {
                    var $this = (0, _util.$)(this),
                        isMatch = $this.data('filter') === filter;

                    $this[isMatch ? 'addClass' : 'rmClass']('eruda-active');
                });
            });
        }
    }, {
        key: '_exposeLogger',
        value: function _exposeLogger() {
            var _this6 = this;

            var logger = this._logger,
                methods = ['filter', 'html'].concat(CONSOLE_METHOD);

            methods.forEach(function (name) {
                return _this6[name] = function () {
                    logger[name].apply(logger, arguments);

                    return _this6;
                };
            });
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent(container) {
            var _this7 = this;

            var $input = this._$input,
                $inputBtns = this._$inputBtns,
                $control = this._$control,
                logger = this._logger,
                config = this.config;

            $control.on('click', '.eruda-clear-console', function () {
                return logger.clear();
            }).on('click', '.eruda-filter', function () {
                logger.filter((0, _util.$)(this).data('filter'));
            }).on('click', '.eruda-help', function () {
                return logger.help();
            });

            $inputBtns.on('click', '.eruda-cancel', function () {
                return _this7._hideInput();
            }).on('click', '.eruda-execute', function () {
                var jsInput = $input.val().trim();
                if (jsInput === '') return;

                logger.input(jsInput);
                $input.val('').get(0).blur();
                _this7._hideInput();
            });

            $input.on('focusin', function () {
                return _this7._showInput();
            });

            logger.on('viewJson', function (data) {
                var sources = container.get('sources');
                if (!sources) return;

                sources.set('json', data);
                container.showTool('sources');
            }).on('insert', function (log) {
                var autoShow = log.type === 'error' && config.get('displayIfErr');

                if (autoShow) container.showTool('console').show();
            });
        }
    }, {
        key: '_hideInput',
        value: function _hideInput() {
            this._$inputContainer.css({
                paddingTop: 0,
                height: 40 * this._scale
            });

            this._$inputBtns.hide();
        }
    }, {
        key: '_showInput',
        value: function _showInput() {
            this._$inputContainer.css({
                paddingTop: 40 * this._scale,
                height: '100%'
            });

            this._$inputBtns.show();
        }
    }, {
        key: '_initCfg',
        value: function _initCfg(container) {
            var _this8 = this;

            var sources = container.get('sources'),
                logger = this._logger;

            var cfg = this.config = _Settings2.default.createCfg('console', {
                catchGlobalErr: true,
                overrideConsole: true,
                displayExtraInfo: false,
                displayUnenumerable: true,
                displayGetterVal: false,
                viewLogInSources: false,
                displayIfErr: false,
                maxLogNum: 'infinite'
            });

            var maxLogNum = cfg.get('maxLogNum');
            maxLogNum = maxLogNum === 'infinite' ? maxLogNum : +maxLogNum;

            if (cfg.get('catchGlobalErr')) this.catchGlobalErr();
            if (cfg.get('overrideConsole')) this.overrideConsole();
            logger.displayHeader(cfg.get('displayExtraInfo'));
            logger.displayUnenumerable(cfg.get('displayUnenumerable'));
            logger.displayGetterVal(cfg.get('displayGetterVal'));
            if (sources) logger.viewLogInSources(cfg.get('viewLogInSources'));
            logger.maxNum(maxLogNum);

            cfg.on('change', function (key, val) {
                switch (key) {
                    case 'catchGlobalErr':
                        return val ? _this8.catchGlobalErr() : _this8.ignoreGlobalErr();
                    case 'overrideConsole':
                        return val ? _this8.overrideConsole() : _this8.restoreConsole();
                    case 'maxLogNum':
                        return logger.maxNum(val === 'infinite' ? val : +val);
                    case 'displayExtraInfo':
                        return logger.displayHeader(val);
                    case 'displayUnenumerable':
                        return logger.displayUnenumerable(val);
                    case 'displayGetterVal':
                        return logger.displayGetterVal(val);
                    case 'viewLogInSources':
                        return logger.viewLogInSources(val);
                }
            });

            var settings = container.get('settings');

            settings.text('Console').switch(cfg, 'catchGlobalErr', 'Catch Global Errors').switch(cfg, 'overrideConsole', 'Override Console').switch(cfg, 'displayIfErr', 'Auto Display If Error Occurs').switch(cfg, 'displayExtraInfo', 'Display Extra Information').switch(cfg, 'displayUnenumerable', 'Display Unenumerable Properties').switch(cfg, 'displayGetterVal', 'Access Getter Value');

            if (sources) settings.switch(cfg, 'viewLogInSources', 'View Log In Sources Panel');

            settings.select(cfg, 'maxLogNum', 'Max Log Number', ['infinite', '250', '125', '100', '50', '10']).separator();
        }
    }]);
    return Console;
}(_Tool3.default);

exports.default = Console;


var CONSOLE_METHOD = ['log', 'error', 'info', 'warn', 'dir', 'time', 'timeEnd', 'clear', 'table', 'assert', 'count', 'debug'];

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Log = __webpack_require__(147);

var _Log2 = _interopRequireDefault(_Log);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger = function (_Emitter) {
    (0, _inherits3.default)(Logger, _Emitter);

    function Logger($el, container) {
        (0, _classCallCheck3.default)(this, Logger);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Logger.__proto__ || (0, _getPrototypeOf2.default)(Logger)).call(this));

        _this._style = (0, _util.evalCss)(__webpack_require__(154));

        _this._$el = $el;
        _this._container = container;
        _this._logs = [];
        _this._timer = {};
        _this._count = {};
        _this._lastLog = {};
        _this._filter = 'all';
        _this._maxNum = 'infinite';
        _this._displayHeader = false;

        _this._bindEvent();
        return _this;
    }

    (0, _createClass3.default)(Logger, [{
        key: 'displayHeader',
        value: function displayHeader(flag) {
            this._displayHeader = flag;
        }
    }, {
        key: 'maxNum',
        value: function maxNum(val) {
            var logs = this._logs;

            this._maxNum = val;
            if ((0, _util.isNum)(val) && logs.length > val) {
                this._logs = logs.slice(logs.length - val);
                this.render();
            }
        }
    }, {
        key: 'displayUnenumerable',
        value: function displayUnenumerable(flag) {
            _Log2.default.showUnenumerable = flag;
        }
    }, {
        key: 'displayGetterVal',
        value: function displayGetterVal(flag) {
            _Log2.default.showGetterVal = flag;
        }
    }, {
        key: 'viewLogInSources',
        value: function viewLogInSources(flag) {
            _Log2.default.showSrcInSources = flag;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            _util.evalCss.remove(this._style);
        }
    }, {
        key: 'filter',
        value: function filter(val) {
            this._filter = val;
            this.emit('filter', val);

            return this.render();
        }
    }, {
        key: 'count',
        value: function count(label) {
            var count = this._count;

            !(0, _util.isUndef)(count[label]) ? count[label]++ : count[label] = 1;

            return this.html('<div class="eruda-blue">' + label + ': ' + count[label] + '</div>');
        }
    }, {
        key: 'assert',
        value: function assert() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (args.length === 0) return;

            var exp = args.shift();

            if (!exp) {
                args.unshift('Assertion failed: ');
                return this.insert('error', args);
            }
        }
    }, {
        key: 'log',
        value: function log() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            this.insert('log', args);

            return this;
        }
    }, {
        key: 'debug',
        value: function debug() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            this.insert('debug', args);

            return this;
        }
    }, {
        key: 'dir',
        value: function dir() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            this.insert('dir', args);

            return this;
        }
    }, {
        key: 'table',
        value: function table() {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            this.insert('table', args);

            return this;
        }
    }, {
        key: 'time',
        value: function time(name) {
            this._timer[name] = (0, _util.perfNow)();

            return this;
        }
    }, {
        key: 'timeEnd',
        value: function timeEnd(name) {
            var startTime = this._timer[name];

            if (!startTime) return;
            delete this._timer[name];

            return this.html('<div class="eruda-blue">' + name + ': ' + ((0, _util.perfNow)() - startTime) + 'ms</div>');
        }
    }, {
        key: 'clear',
        value: function clear() {
            this._logs = [];
            this._lastLog = {};

            return this.render();
        }
    }, {
        key: 'info',
        value: function info() {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
            }

            return this.insert('info', args);
        }
    }, {
        key: 'error',
        value: function error() {
            for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                args[_key7] = arguments[_key7];
            }

            return this.insert('error', args);
        }
    }, {
        key: 'warn',
        value: function warn() {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                args[_key8] = arguments[_key8];
            }

            return this.insert('warn', args);
        }
    }, {
        key: 'input',
        value: function input(jsCode) {
            if ((0, _util.startWith)(jsCode, ':')) {
                this._runCmd(jsCode.slice(1));

                return this;
            } else if ((0, _util.startWith)(jsCode, '/')) {
                return this.filter(new RegExp((0, _util.escapeRegExp)(jsCode.slice(1))));
            }

            this.insert({
                type: 'input',
                args: [jsCode],
                ignoreFilter: true
            });

            try {
                this.output(evalJs(jsCode));
            } catch (e) {
                this.insert({
                    type: 'error',
                    ignoreFilter: true,
                    args: [e]
                });
            }

            return this;
        }
    }, {
        key: 'output',
        value: function output(val) {
            return this.insert({
                type: 'output',
                args: [val],
                ignoreFilter: true
            });
        }
    }, {
        key: 'html',
        value: function html() {
            for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                args[_key9] = arguments[_key9];
            }

            return this.insert('html', args);
        }
    }, {
        key: 'help',
        value: function help() {
            return this.insert({
                type: 'html',
                args: [helpMsg],
                ignoreFilter: true
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var html = '',
                logs = this._logs;

            logs = this._filterLogs(logs);

            for (var i = 0, len = logs.length; i < len; i++) {
                html += logs[i].formattedMsg;
            }

            this._$el.html(html);
            this.scrollToBottom();

            return this;
        }
    }, {
        key: 'insert',
        value: function insert(type, args) {
            var logs = this._logs,
                $el = this._$el,
                el = $el.get(0);

            var isAtBottom = el.scrollTop === el.scrollHeight - el.offsetHeight;

            var options = (0, _util.isStr)(type) ? { type: type, args: args } : type;
            (0, _util.extend)(options, {
                id: (0, _util.uniqId)('log'),
                displayHeader: this._displayHeader
            });

            var log = new _Log2.default(options);

            var lastLog = this._lastLog;
            if (log.type !== 'html' && lastLog.type === log.type && lastLog.value === log.value) {
                lastLog.addCount();
                if (log.time) lastLog.updateTime(log.time);
                $el.find('li').last().remove();
                log = lastLog;
            } else {
                logs.push(log);
                this._lastLog = log;
            }

            if (this._maxNum !== 'infinite' && logs.length > this._maxNum) {
                $el.find('li').first().remove();
                logs.shift();
            }

            if (this._filterLog(log) && this._container.active) $el.append(log.formattedMsg);

            this.emit('insert', log);

            if (isAtBottom) this.scrollToBottom();

            return this;
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom() {
            var el = this._$el.get(0);

            el.scrollTop = el.scrollHeight - el.offsetHeight;
        }
    }, {
        key: '_filterLogs',
        value: function _filterLogs(logs) {
            var filter = this._filter;

            if (filter === 'all') return logs;

            var isFilterRegExp = (0, _util.isRegExp)(filter),
                isFilterFn = (0, _util.isFn)(filter);

            return logs.filter(function (log) {
                if (log.ignoreFilter) return true;
                if (isFilterFn) return filter(log);
                if (isFilterRegExp) return filter.test((0, _util.stripHtmlTag)(log.formattedMsg));
                return log.type === filter;
            });
        }
    }, {
        key: '_filterLog',
        value: function _filterLog(log) {
            var filter = this._filter;

            if (filter === 'all') return true;

            var isFilterRegExp = (0, _util.isRegExp)(filter),
                isFilterFn = (0, _util.isFn)(filter);

            if (log.ignoreFilter) return true;
            if (isFilterFn) return filter(log);
            if (isFilterRegExp) return filter.test((0, _util.stripHtmlTag)(log.formattedMsg));

            return log.type === filter;
        }
    }, {
        key: '_loadJs',
        value: function _loadJs(name) {
            var _this2 = this;

            (0, _util.loadJs)(libraries[name], function (result) {
                if (result) return _this2.log(name + ' is loaded');

                _this2.warn('Failed to load ' + name);
            });
        }
    }, {
        key: '_runCmd',
        value: function _runCmd(cmd) {
            switch (cmd.trim()) {
                case '$':
                    return this._loadJs('jQuery');
                case '_':
                    return this._loadJs('underscore');
                default:
                    this.warn('Unknown command').help();
            }
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var self = this;

            this._$el.on('click', '.eruda-log-item', function () {
                var $el = (0, _util.$)(this),
                    id = $el.data('id'),
                    type = $el.data('type'),
                    logs = self._logs,
                    log = void 0;

                for (var i = 0, len = logs.length; i < len; i++) {
                    log = logs[i];
                    if (log.id === id) break;
                }
                if (!log) return;

                var action = _Log2.default.click(type, log, $el);

                switch (action) {
                    case 'viewSrc':
                        self.emit('viewJson', log.src);
                        break;
                }
            });
        }
    }]);
    return Logger;
}(_util.Emitter);

exports.default = Logger;


var cmdList = __webpack_require__(155),
    helpMsg = __webpack_require__(156)({ commands: cmdList }),
    libraries = __webpack_require__(157);

var evalJs = function evalJs(jsInput) {
    var ret = void 0;

    try {
        ret = eval.call(window, '(' + jsInput + ')');
    } catch (e) {
        ret = eval.call(window, jsInput);
    }

    return ret;
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getOwnPropertyNames = __webpack_require__(55);

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _stringify = __webpack_require__(72);

var _stringify2 = _interopRequireDefault(_stringify);

var _getAbstract = __webpack_require__(150);

var _getAbstract2 = _interopRequireDefault(_getAbstract);

var _highlight = __webpack_require__(56);

var _highlight2 = _interopRequireDefault(_highlight);

var _jsBeautify = __webpack_require__(57);

var _jsBeautify2 = _interopRequireDefault(_jsBeautify);

var _JsonViewer = __webpack_require__(73);

var _JsonViewer2 = _interopRequireDefault(_JsonViewer);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Log = function () {
    function Log(_ref) {
        var _ref$type = _ref.type,
            type = _ref$type === undefined ? 'log' : _ref$type,
            _ref$args = _ref.args,
            args = _ref$args === undefined ? [] : _ref$args,
            id = _ref.id,
            _ref$displayHeader = _ref.displayHeader,
            displayHeader = _ref$displayHeader === undefined ? false : _ref$displayHeader,
            _ref$ignoreFilter = _ref.ignoreFilter,
            ignoreFilter = _ref$ignoreFilter === undefined ? false : _ref$ignoreFilter;
        (0, _classCallCheck3.default)(this, Log);

        this.type = type;
        this.args = args;
        this.count = 1;
        this.id = id;
        this.displayHeader = displayHeader;
        this.ignoreFilter = ignoreFilter;

        if (displayHeader) {
            this.time = getCurTime();
            this.from = getFrom();
        }

        this._formatMsg();
    }

    (0, _createClass3.default)(Log, [{
        key: 'addCount',
        value: function addCount() {
            this.count++;
            var count = this.count,
                msg = this.formattedMsg;
            if (count === 2) msg = msg.replace('eruda-count eruda-hidden', 'eruda-count');
            msg = msg.replace(/data-mark="count">\d*/, 'data-mark="count">' + count);

            this.formattedMsg = msg;

            return this;
        }
    }, {
        key: 'updateTime',
        value: function updateTime(time) {
            var msg = this.formattedMsg;

            if (this.time) {
                msg = msg.replace(/data-mark="time">(.*?)</, 'data-mark="time">' + time + '<');
                this.time = time;
                this.formattedMsg = msg;
            }

            return this;
        }
    }, {
        key: '_needSrc',
        value: function _needSrc() {
            var type = this.type,
                args = this.args;


            if (type === 'html') return false;

            for (var i = 0, len = args.length; i < len; i++) {
                if ((0, _util.isObj)(args[i])) return true;
            }

            return false;
        }
    }, {
        key: '_formatMsg',
        value: function _formatMsg() {
            var type = this.type,
                id = this.id,
                displayHeader = this.displayHeader,
                time = this.time,
                from = this.from,
                args = this.args;


            if (this._needSrc()) {
                if (type === 'table') {
                    this.src = extractObj(args[0]);
                } else {
                    this.src = extractObj(args.length === 1 && (0, _util.isObj)(args[0]) ? args[0] : args);
                }
            }

            var msg = '',
                icon = void 0,
                err = void 0;

            switch (type) {
                case 'log':
                    msg = formatMsg(args);
                    break;
                case 'debug':
                    msg = formatMsg(args);
                    break;
                case 'dir':
                    msg = formatDir(args);
                    break;
                case 'info':
                    icon = 'info-circle';
                    msg = formatMsg(args);
                    break;
                case 'warn':
                    icon = 'exclamation-triangle';
                    msg = formatMsg(args);
                    break;
                case 'error':
                    if ((0, _util.isStr)(args[0]) && args.length !== 1) args = substituteStr(args);
                    err = args[0];
                    icon = 'times-circle';
                    err = (0, _util.isErr)(err) ? err : new Error(formatMsg(args));
                    this.src = err;
                    msg = formatErr(err);
                    break;
                case 'table':
                    msg = formatTable(args);
                    break;
                case 'html':
                    msg = args[0];
                    break;
                case 'input':
                    msg = formatJs(args[0]);
                    icon = 'chevron-right';
                    break;
                case 'output':
                    msg = formatMsg(args);
                    icon = 'chevron-left';
                    break;
            }

            if (type !== 'error') msg = recognizeUrl(msg);
            this.value = msg;
            msg = render({ msg: msg, type: type, icon: icon, id: id, displayHeader: displayHeader, time: time, from: from });

            delete this.args;
            this.formattedMsg = msg;
        }
    }], [{
        key: 'click',
        value: function click(type, log, $el) {
            switch (type) {
                case 'log':
                case 'warn':
                case 'info':
                case 'debug':
                case 'output':
                case 'table':
                case 'dir':
                    if (log.src) {
                        if (Log.showSrcInSources) return 'viewSrc';
                        var $json = $el.find('.eruda-json');
                        if ($json.hasClass('eruda-hidden')) {
                            if ($json.data('init') !== 'true') {
                                new _JsonViewer2.default(log.src, $json);
                                $json.data('init', 'true');
                            }
                            $json.rmClass('eruda-hidden');
                        } else {
                            $json.addClass('eruda-hidden');
                        }
                    }
                    break;
                case 'error':
                    $el.find('.eruda-stack').toggleClass('eruda-hidden');
                    break;
            }

            return 'handled';
        }
    }]);
    return Log;
}();

// Looks like es6 doesn't support static properties yet.


exports.default = Log;
Log.showGetterVal = false;
Log.showUnenumerable = true;
Log.showSrcInSources = false;

var getAbstract = (0, _util.wrap)(_getAbstract2.default, function (fn, obj) {
    return fn(obj, {
        getterVal: Log.showGetterVal,
        unenumerable: false
    });
});

function formatTable(args) {
    var table = args[0],
        ret = '',
        filter = args[1],
        columns = [];

    if ((0, _util.isStr)(filter)) filter = (0, _util.toArr)(filter);
    if (!(0, _util.isArr)(filter)) filter = null;

    if (!(0, _util.isArr)(table)) return formatMsg(args);

    table.forEach(function (val) {
        if (!(0, _util.isObj)(val)) return;
        columns = columns.concat((0, _getOwnPropertyNames2.default)(val));
    });
    columns = (0, _util.unique)(columns);
    columns.sort();
    if (filter) columns = columns.filter(function (val) {
        return (0, _util.contain)(filter, val);
    });
    if ((0, _util.isEmpty)(columns)) return formatMsg(args);

    ret += '<table><thead><tr><th>(index)</th>';
    columns.forEach(function (val) {
        return ret += '<th>' + val + '</th>';
    });
    ret += '</tr></thead><tbody>';

    table.forEach(function (obj, idx) {
        if (!(0, _util.isObj)(obj)) return;
        ret += '<tr><td>' + idx + '</td>';
        columns.forEach(function (column) {
            var val = obj[column];
            if ((0, _util.isUndef)(val)) {
                val = '';
            } else if ((0, _util.isObj)(val)) {
                val = (0, _util.getObjType)(val);
            }

            ret += '<td>' + val + '</td>';
        });
        ret += '</tr>';
    });

    ret += '</tbody></table>';
    ret += '<div class="eruda-json eruda-hidden"></div>';

    return ret;
}

var regJsUrl = /https?:\/\/([0-9.\-A-Za-z]+)(?::(\d+))?\/[A-Z.a-z0-9/]*\.js/g,
    regErudaJs = /eruda(\.min)?\.js/;

function formatErr(err) {
    var lines = err.stack ? err.stack.split('\n') : [],
        msg = (err.message || lines[0]) + '<br/>';

    lines = lines.filter(function (val) {
        return !regErudaJs.test(val);
    }).map(function (val) {
        return (0, _util.escape)(val);
    });

    var stack = '<div class="eruda-stack eruda-hidden">' + lines.slice(1).join('<br/>') + '</div>';

    return msg + stack.replace(regJsUrl, function (match) {
        return '<a href="' + match + '" target="_blank">' + match + '</a>';
    });
}

function formatJs(code) {
    return (0, _highlight2.default)((0, _jsBeautify2.default)(code), 'js');
}

function formatMsg(args) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$htmlForEl = _ref2.htmlForEl,
        htmlForEl = _ref2$htmlForEl === undefined ? true : _ref2$htmlForEl;

    var needStrSubstitution = (0, _util.isStr)(args[0]) && args.length !== 1;
    if (needStrSubstitution) args = substituteStr(args);

    for (var i = 0, len = args.length; i < len; i++) {
        var val = args[i];

        if ((0, _util.isEl)(val) && htmlForEl) {
            args[i] = formatEl(val);
        } else if ((0, _util.isFn)(val)) {
            args[i] = formatFn(val);
        } else if ((0, _util.isObj)(val)) {
            args[i] = formatObj(val);
        } else if ((0, _util.isUndef)(val)) {
            args[i] = 'undefined';
        } else if ((0, _util.isNull)(val)) {
            args[i] = 'null';
        } else {
            val = (0, _util.toStr)(val);
            if (i !== 0 || !needStrSubstitution) val = (0, _util.escape)(val);
            args[i] = val;
        }
    }

    return args.join(' ') + '<div class="eruda-json eruda-hidden"></div>';
}

var formatDir = function formatDir(args) {
    return formatMsg(args, { htmlForEl: false });
};

function substituteStr(args) {
    var str = (0, _util.escape)(args[0]),
        isInCss = false,
        newStr = '';

    args.shift();

    for (var i = 0, len = str.length; i < len; i++) {
        var c = str[i];

        if (c === '%' && args.length !== 0) {
            i++;
            var arg = args.shift();
            switch (str[i]) {
                case 'i':
                case 'd':
                    newStr += (0, _util.toInt)(arg);
                    break;
                case 'f':
                    newStr += (0, _util.toNum)(arg);
                    break;
                case 's':
                    newStr += (0, _util.toStr)(arg);
                    break;
                case 'O':
                    if ((0, _util.isObj)(arg)) {
                        newStr += getAbstract(arg);
                    }
                    break;
                case 'o':
                    if ((0, _util.isEl)(arg)) {
                        newStr += formatEl(arg);
                    } else if ((0, _util.isObj)(arg)) {
                        newStr += getAbstract(arg);
                    }
                    break;
                case 'c':
                    if (isInCss) newStr += '</span>';
                    isInCss = true;
                    newStr += '<span style="' + arg + '">';
                    break;
                default:
                    i--;
                    args.unshift(arg);
                    newStr += c;
            }
        } else {
            newStr += c;
        }
    }
    if (isInCss) newStr += '</span>';

    args.unshift(newStr);

    return args;
}

function formatObj(val) {
    return (0, _util.getObjType)(val) + ' ' + getAbstract(val);
}

function formatFn(val) {
    return '<pre style="display:inline">' + (0, _highlight2.default)(_jsBeautify2.default.js(val.toString()), 'js') + '</pre>';
}

function formatEl(val) {
    return '<pre style="display:inline">' + (0, _highlight2.default)(_jsBeautify2.default.html(val.outerHTML, { unformatted: [] }), 'html') + '</pre>';
}

var regUrl = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[-A-Z0-9+\u0026\u2019@#/%?=()~_|!:,.;]*[-A-Z0-9+\u0026@#/%=~()_|])/gi;

var recognizeUrl = function recognizeUrl(str) {
    return str.replace(regUrl, '<a href="$2" target="_blank">$2</a>');
};

function getFrom() {
    var e = new Error(),
        ret = '',
        lines = e.stack ? e.stack.split('\n') : '';

    for (var i = 0, len = lines.length; i < len; i++) {
        ret = lines[i];
        if (ret.indexOf('winConsole') > -1 && i < len - 1) {
            ret = lines[i + 1];
            break;
        }
    }

    return ret;
}

var getCurTime = function getCurTime() {
    return (0, _util.dateFormat)('HH:MM:ss');
};

var tpl = __webpack_require__(153);
var render = function render(data) {
    return tpl(data);
};

function extractObj(obj) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _util.defaults)(options, {
        getterVal: Log.showGetterVal,
        unenumerable: Log.showUnenumerable
    });

    return JSON.parse((0, _stringify2.default)(obj, options));
}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
var $Object = __webpack_require__(5).Object;
module.exports = function getOwnPropertyNames(it) {
  return $Object.getOwnPropertyNames(it);
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(24)('getOwnPropertyNames', function () {
  return __webpack_require__(69).f;
});


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__(54);

var _keys2 = _interopRequireDefault(_keys);

var _getOwnPropertyNames = __webpack_require__(55);

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(34);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

exports.default = getAbstract;

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Modified from: https://jsconsole.com/
function getAbstract(obj) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        topObj = _ref.topObj,
        _ref$level = _ref.level,
        level = _ref$level === undefined ? 0 : _ref$level,
        _ref$getterVal = _ref.getterVal,
        getterVal = _ref$getterVal === undefined ? false : _ref$getterVal,
        _ref$unenumerable = _ref.unenumerable,
        unenumerable = _ref$unenumerable === undefined ? true : _ref$unenumerable;

    var json = '',
        type = '',
        keyNum = 5,
        parts = [],
        names = [],
        objEllipsis = '',
        circular = false,
        i = void 0;

    topObj = topObj || obj;

    var passOpts = { getterVal: getterVal, unenumerable: unenumerable, level: level + 1 },
        doStringify = level === 0;

    var keyWrapper = '<span style="color: #a71d5d;">',
        numWrapper = '<span style="color: #0086b3;">',
        nullWrapper = '<span style="color: #0086b3;">',
        strWrapper = '<span style="color: #183691;">',
        boolWrapper = '<span style="color: #0086b3;">',
        specialWrapper = '<span style="color: #707d8b;">',
        strEscape = function strEscape(str) {
        return (0, _util.escape)(str);
    },
        wrapperEnd = '</span>';

    var wrapKey = function wrapKey(key) {
        return keyWrapper + strEscape(key) + wrapperEnd;
    },
        wrapNum = function wrapNum(num) {
        return numWrapper + num + wrapperEnd;
    },
        wrapRegExp = function wrapRegExp(str) {
        return strWrapper + str + wrapperEnd;
    },
        wrapBool = function wrapBool(bool) {
        return boolWrapper + bool + wrapperEnd;
    },
        wrapNull = function wrapNull(str) {
        return nullWrapper + str + wrapperEnd;
    };

    function wrapStr(str) {
        str = (0, _util.toStr)(str);

        str = str.replace(/\\/g, '');

        if ((0, _util.contain)(SPECIAL_VAL, str) || (0, _util.startWith)(str, 'Array[')) {
            return specialWrapper + strEscape(str) + wrapperEnd;
        }

        return strWrapper + strEscape('"' + str + '"') + wrapperEnd;
    }

    function objIteratee(name) {
        if (i > keyNum) {
            objEllipsis = '...';
            return;
        }
        var key = wrapKey((0, _util.escapeJsonStr)(name));

        if (!getterVal) {
            var descriptor = (0, _getOwnPropertyDescriptor2.default)(obj, name);
            if (descriptor.get) {
                parts.push(key + ': ' + wrapStr('(...)'));
                i++;
                return;
            }
        }
        parts.push(key + ': ' + getAbstract(topObj[name], passOpts));
        i++;
    }

    try {
        type = {}.toString.call(obj);
    } catch (e) {
        type = '[object Object]';
    }

    var isStr = type == '[object String]',
        isArr = type == '[object Array]',
        isObj = type == '[object Object]',
        isNum = type == '[object Number]',
        isRegExp = type == '[object RegExp]',
        isSymbol = type == '[object Symbol]',
        isFn = type == '[object Function]',
        isBool = type == '[object Boolean]';

    if (circular) {
        json = wrapStr('[circular]');
    } else if (isStr) {
        json = wrapStr((0, _util.escapeJsonStr)(obj));
    } else if (isRegExp) {
        json = wrapRegExp((0, _util.escapeJsonStr)(obj.toString()));
    } else if (isFn) {
        json = wrapStr('function');
    } else if (isArr) {
        if (doStringify) {
            json = '[';
            (0, _util.each)(obj, function (val) {
                return parts.push('' + getAbstract(val, passOpts));
            });
            json += parts.join(', ') + ']';
        } else {
            json = wrapStr('Array[' + obj.length + ']');
        }
    } else if (isObj) {
        if (canBeProto(obj)) {
            obj = (0, _getPrototypeOf2.default)(obj);
        }

        names = unenumerable ? (0, _getOwnPropertyNames2.default)(obj) : (0, _keys2.default)(obj);
        if (doStringify) {
            i = 1;
            json = '{ ';
            (0, _util.each)(names, objIteratee);
            json += moveFnToTail(parts).join(', ') + objEllipsis + ' }';
        } else {
            json = (0, _util.getObjType)(obj);
        }
    } else if (isNum) {
        json = obj + '';
        if ((0, _util.endWith)(json, 'Infinity') || json === 'NaN') {
            json = '"' + json + '"';
        } else {
            json = wrapNum(json);
        }
    } else if (isBool) {
        json = wrapBool(obj ? 'true' : 'false');
    } else if (obj === null) {
        json = wrapNull('null');
    } else if (isSymbol) {
        json = wrapStr('Symbol');
    } else if (obj === undefined) {
        json = wrapStr('undefined');
    } else {
        try {
            if (canBeProto(obj)) {
                obj = (0, _getPrototypeOf2.default)(obj);
            }

            if (doStringify) {
                i = 1;
                json = '{ ';
                names = unenumerable ? (0, _getOwnPropertyNames2.default)(obj) : (0, _keys2.default)(obj);
                (0, _util.each)(names, objIteratee);
                json += moveFnToTail(parts).join(', ') + objEllipsis + ' }';
            } else {
                json = (0, _util.getObjType)(obj);
            }
        } catch (e) {
            json = wrapStr(obj);
        }
    }

    return json;
} // Simple version for stringify, used for displaying object abstract.


var SPECIAL_VAL = ['(...)', 'undefined', 'Symbol', 'Object', 'function'];

function canBeProto(obj) {
    var emptyObj = (0, _util.isEmpty)((0, _getOwnPropertyNames2.default)(obj)),
        proto = (0, _getPrototypeOf2.default)(obj);

    return emptyObj && proto && proto !== Object.prototype;
}

function moveFnToTail(parts) {
    var front = [],
        tail = [];

    (0, _util.each)(parts, function (val) {
        val.indexOf('function') > -1 ? tail.push(val) : front.push(val);
    });

    return front.concat(tail);
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
    http://jsbeautifier.org/

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_inner_html (default false)  — indent <head> and <body> sections,
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
    content_unformatted (defaults to pre tag) - list of tags, whose content shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"
    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
                                        Only works before elements, not inside tags or for text.
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
    end_with_newline (false)          - end with a newline
    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

    e.g.

    style_html(html_source, {
      'indent_inner_html': false,
      'indent_size': 2,
      'indent_char': ' ',
      'wrap_line_length': 78,
      'brace_style': 'expand',
      'preserve_newlines': true,
      'max_preserve_newlines': 5,
      'indent_handlebars': false,
      'extra_liners': ['/html']
    });
*/

(function() {
var legacy_beautify_html =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

var mergeOpts = __webpack_require__(2).mergeOpts;
var acorn = __webpack_require__(1);


var lineBreak = acorn.lineBreak;
var allLineBreaks = acorn.allLineBreaks;

// function trim(s) {
//     return s.replace(/^\s+|\s+$/g, '');
// }

function ltrim(s) {
    return s.replace(/^\s+/g, '');
}

function rtrim(s) {
    return s.replace(/\s+$/g, '');
}

function Beautifier(html_source, options, js_beautify, css_beautify) {
    //Wrapper function to invoke all the necessary constructors and deal with the output.
    html_source = html_source || '';

    var multi_parser,
        indent_inner_html,
        indent_body_inner_html,
        indent_head_inner_html,
        indent_size,
        indent_character,
        wrap_line_length,
        brace_style,
        unformatted,
        content_unformatted,
        preserve_newlines,
        max_preserve_newlines,
        indent_handlebars,
        wrap_attributes,
        wrap_attributes_indent_size,
        is_wrap_attributes_force,
        is_wrap_attributes_force_expand_multiline,
        is_wrap_attributes_force_aligned,
        end_with_newline,
        extra_liners,
        eol;

    options = options || {};

    // Allow the setting of language/file-type specific options
    // with inheritance of overall settings
    options = mergeOpts(options, 'html');

    // backwards compatibility to 1.3.4
    if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) &&
        (options.max_char !== undefined && parseInt(options.max_char, 10) !== 0)) {
        options.wrap_line_length = options.max_char;
    }

    indent_inner_html = (options.indent_inner_html === undefined) ? false : options.indent_inner_html;
    indent_body_inner_html = (options.indent_body_inner_html === undefined) ? true : options.indent_body_inner_html;
    indent_head_inner_html = (options.indent_head_inner_html === undefined) ? true : options.indent_head_inner_html;
    indent_size = (options.indent_size === undefined) ? 4 : parseInt(options.indent_size, 10);
    indent_character = (options.indent_char === undefined) ? ' ' : options.indent_char;
    brace_style = (options.brace_style === undefined) ? 'collapse' : options.brace_style;
    wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
    unformatted = options.unformatted || [
        // https://www.w3.org/TR/html5/dom.html#phrasing-content
        'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite',
        'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img',
        'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript',
        'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ 'select', 'small',
        'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
        'video', 'wbr', 'text',
        // prexisting - not sure of full effect of removing, leaving in
        'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt',
    ];
    content_unformatted = options.content_unformatted || [
        'pre',
    ];
    preserve_newlines = (options.preserve_newlines === undefined) ? true : options.preserve_newlines;
    max_preserve_newlines = preserve_newlines ?
        (isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10)) :
        0;
    indent_handlebars = (options.indent_handlebars === undefined) ? false : options.indent_handlebars;
    wrap_attributes = (options.wrap_attributes === undefined) ? 'auto' : options.wrap_attributes;
    wrap_attributes_indent_size = (isNaN(parseInt(options.wrap_attributes_indent_size, 10))) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
    is_wrap_attributes_force = wrap_attributes.substr(0, 'force'.length) === 'force';
    is_wrap_attributes_force_expand_multiline = (wrap_attributes === 'force-expand-multiline');
    is_wrap_attributes_force_aligned = (wrap_attributes === 'force-aligned');
    end_with_newline = (options.end_with_newline === undefined) ? false : options.end_with_newline;
    extra_liners = (typeof options.extra_liners === 'object') && options.extra_liners ?
        options.extra_liners.concat() : (typeof options.extra_liners === 'string') ?
        options.extra_liners.split(',') : 'head,body,/html'.split(',');
    eol = options.eol ? options.eol : 'auto';

    if (options.indent_with_tabs) {
        indent_character = '\t';
        indent_size = 1;
    }

    if (eol === 'auto') {
        eol = '\n';
        if (html_source && lineBreak.test(html_source || '')) {
            eol = html_source.match(lineBreak)[0];
        }
    }

    eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

    // HACK: newline parsing inconsistent. This brute force normalizes the input.
    html_source = html_source.replace(allLineBreaks, '\n');

    function Parser() {

        this.pos = 0; //Parser position
        this.token = '';
        this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
        this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
            parent: 'parent1',
            parentcount: 1,
            parent1: ''
        };
        this.tag_type = '';
        this.token_text = this.last_token = this.last_text = this.token_type = '';
        this.newlines = 0;
        this.indent_content = indent_inner_html;
        this.indent_body_inner_html = indent_body_inner_html;
        this.indent_head_inner_html = indent_head_inner_html;

        this.Utils = { //Uilities made available to the various functions
            whitespace: "\n\r\t ".split(''),

            single_token: options.void_elements || [
                // HTLM void elements - aka self-closing tags - aka singletons
                // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
                'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen',
                'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
                // NOTE: Optional tags - are not understood.
                // https://www.w3.org/TR/html5/syntax.html#optional-tags
                // The rules for optional tags are too complex for a simple list
                // Also, the content of these tags should still be indented in many cases.
                // 'li' is a good exmple.

                // Doctype and xml elements
                '!doctype', '?xml',
                // ?php tag
                '?php',
                // other tags that were in this list, keeping just in case
                'basefont', 'isindex'
            ],
            extra_liners: extra_liners, //for tags that need a line of whitespace before them
            in_array: function(what, arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (what === arr[i]) {
                        return true;
                    }
                }
                return false;
            }
        };

        // Return true if the given text is composed entirely of whitespace.
        this.is_whitespace = function(text) {
            for (var n = 0; n < text.length; n++) {
                if (!this.Utils.in_array(text.charAt(n), this.Utils.whitespace)) {
                    return false;
                }
            }
            return true;
        };

        this.traverse_whitespace = function() {
            var input_char = '';

            input_char = this.input.charAt(this.pos);
            if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                this.newlines = 0;
                while (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                    if (preserve_newlines && input_char === '\n' && this.newlines <= max_preserve_newlines) {
                        this.newlines += 1;
                    }

                    this.pos++;
                    input_char = this.input.charAt(this.pos);
                }
                return true;
            }
            return false;
        };

        // Append a space to the given content (string array) or, if we are
        // at the wrap_line_length, append a newline/indentation.
        // return true if a newline was added, false if a space was added
        this.space_or_wrap = function(content) {
            if (this.line_char_count >= this.wrap_line_length) { //insert a line when the wrap_line_length is reached
                this.print_newline(false, content);
                this.print_indentation(content);
                return true;
            } else {
                this.line_char_count++;
                content.push(' ');
                return false;
            }
        };

        this.get_content = function() { //function to capture regular content between tags
            var input_char = '',
                content = [],
                handlebarsStarted = 0;

            while (this.input.charAt(this.pos) !== '<' || handlebarsStarted === 2) {
                if (this.pos >= this.input.length) {
                    return content.length ? content.join('') : ['', 'TK_EOF'];
                }

                if (handlebarsStarted < 2 && this.traverse_whitespace()) {
                    this.space_or_wrap(content);
                    continue;
                }

                input_char = this.input.charAt(this.pos);

                if (indent_handlebars) {
                    if (input_char === '{') {
                        handlebarsStarted += 1;
                    } else if (handlebarsStarted < 2) {
                        handlebarsStarted = 0;
                    }

                    if (input_char === '}' && handlebarsStarted > 0) {
                        if (handlebarsStarted-- === 0) {
                            break;
                        }
                    }
                    // Handlebars parsing is complicated.
                    // {{#foo}} and {{/foo}} are formatted tags.
                    // {{something}} should get treated as content, except:
                    // {{else}} specifically behaves like {{#if}} and {{/if}}
                    var peek3 = this.input.substr(this.pos, 3);
                    if (peek3 === '{{#' || peek3 === '{{/') {
                        // These are tags and not content.
                        break;
                    } else if (peek3 === '{{!') {
                        return [this.get_tag(), 'TK_TAG_HANDLEBARS_COMMENT'];
                    } else if (this.input.substr(this.pos, 2) === '{{') {
                        if (this.get_tag(true) === '{{else}}') {
                            break;
                        }
                    }
                }

                this.pos++;
                this.line_char_count++;
                content.push(input_char); //letter at-a-time (or string) inserted to an array
            }
            return content.length ? content.join('') : '';
        };

        this.get_contents_to = function(name) { //get the full content of a script or style to pass to js_beautify
            if (this.pos === this.input.length) {
                return ['', 'TK_EOF'];
            }
            var content = '';
            var reg_match = new RegExp('</' + name + '\\s*>', 'igm');
            reg_match.lastIndex = this.pos;
            var reg_array = reg_match.exec(this.input);
            var end_script = reg_array ? reg_array.index : this.input.length; //absolute end of script
            if (this.pos < end_script) { //get everything in between the script tags
                content = this.input.substring(this.pos, end_script);
                this.pos = end_script;
            }
            return content;
        };

        this.record_tag = function(tag) { //function to record a tag and its parent in this.tags Object
            if (this.tags[tag + 'count']) { //check for the existence of this tag type
                this.tags[tag + 'count']++;
                this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
            } else { //otherwise initialize this tag type
                this.tags[tag + 'count'] = 1;
                this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
            }
            this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
            this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
        };

        this.retrieve_tag = function(tag) { //function to retrieve the opening tag to the corresponding closer
            if (this.tags[tag + 'count']) { //if the openener is not in the Object we ignore it
                var temp_parent = this.tags.parent; //check to see if it's a closable tag.
                while (temp_parent) { //till we reach '' (the initial value);
                    if (tag + this.tags[tag + 'count'] === temp_parent) { //if this is it use it
                        break;
                    }
                    temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
                }
                if (temp_parent) { //if we caught something
                    this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
                    this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
                }
                delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
                delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
                if (this.tags[tag + 'count'] === 1) {
                    delete this.tags[tag + 'count'];
                } else {
                    this.tags[tag + 'count']--;
                }
            }
        };

        this.indent_to_tag = function(tag) {
            // Match the indentation level to the last use of this tag, but don't remove it.
            if (!this.tags[tag + 'count']) {
                return;
            }
            var temp_parent = this.tags.parent;
            while (temp_parent) {
                if (tag + this.tags[tag + 'count'] === temp_parent) {
                    break;
                }
                temp_parent = this.tags[temp_parent + 'parent'];
            }
            if (temp_parent) {
                this.indent_level = this.tags[tag + this.tags[tag + 'count']];
            }
        };

        this.get_tag = function(peek) { //function to get a full tag and parse its type
            var input_char = '',
                content = [],
                comment = '',
                space = false,
                first_attr = true,
                has_wrapped_attrs = false,
                tag_start, tag_end,
                tag_start_char,
                orig_pos = this.pos,
                orig_line_char_count = this.line_char_count,
                is_tag_closed = false,
                tail;

            peek = peek !== undefined ? peek : false;

            do {
                if (this.pos >= this.input.length) {
                    if (peek) {
                        this.pos = orig_pos;
                        this.line_char_count = orig_line_char_count;
                    }
                    return content.length ? content.join('') : ['', 'TK_EOF'];
                }

                input_char = this.input.charAt(this.pos);
                this.pos++;

                if (this.Utils.in_array(input_char, this.Utils.whitespace)) { //don't want to insert unnecessary space
                    space = true;
                    continue;
                }

                if (input_char === "'" || input_char === '"') {
                    input_char += this.get_unformatted(input_char);
                    space = true;
                }

                if (input_char === '=') { //no space before =
                    space = false;
                }
                tail = this.input.substr(this.pos - 1);
                if (is_wrap_attributes_force_expand_multiline && has_wrapped_attrs && !is_tag_closed && (input_char === '>' || input_char === '/')) {
                    if (tail.match(/^\/?\s*>/)) {
                        space = false;
                        is_tag_closed = true;
                        this.print_newline(false, content);
                        this.print_indentation(content);
                    }
                }
                if (content.length && content[content.length - 1] !== '=' && input_char !== '>' && space) {
                    //no space after = or before >
                    var wrapped = this.space_or_wrap(content);
                    var indentAttrs = wrapped && input_char !== '/' && !is_wrap_attributes_force;
                    space = false;

                    if (is_wrap_attributes_force && input_char !== '/') {
                        var force_first_attr_wrap = false;
                        if (is_wrap_attributes_force_expand_multiline && first_attr) {
                            var is_only_attribute = tail.match(/^\S*(="([^"]|\\")*")?\s*\/?\s*>/) !== null;
                            force_first_attr_wrap = !is_only_attribute;
                        }
                        if (!first_attr || force_first_attr_wrap) {
                            this.print_newline(false, content);
                            this.print_indentation(content);
                            indentAttrs = true;
                        }
                    }
                    if (indentAttrs) {
                        has_wrapped_attrs = true;

                        //indent attributes an auto, forced, or forced-align line-wrap
                        var alignment_size = wrap_attributes_indent_size;
                        if (is_wrap_attributes_force_aligned) {
                            alignment_size = content.indexOf(' ') + 1;
                        }

                        for (var count = 0; count < alignment_size; count++) {
                            // only ever further indent with spaces since we're trying to align characters
                            content.push(' ');
                        }
                    }
                    if (first_attr) {
                        for (var i = 0; i < content.length; i++) {
                            if (content[i] === ' ') {
                                first_attr = false;
                                break;
                            }
                        }
                    }
                }

                if (indent_handlebars && tag_start_char === '<') {
                    // When inside an angle-bracket tag, put spaces around
                    // handlebars not inside of strings.
                    if ((input_char + this.input.charAt(this.pos)) === '{{') {
                        input_char += this.get_unformatted('}}');
                        if (content.length && content[content.length - 1] !== ' ' && content[content.length - 1] !== '<') {
                            input_char = ' ' + input_char;
                        }
                        space = true;
                    }
                }

                if (input_char === '<' && !tag_start_char) {
                    tag_start = this.pos - 1;
                    tag_start_char = '<';
                }

                if (indent_handlebars && !tag_start_char) {
                    if (content.length >= 2 && content[content.length - 1] === '{' && content[content.length - 2] === '{') {
                        if (input_char === '#' || input_char === '/' || input_char === '!') {
                            tag_start = this.pos - 3;
                        } else {
                            tag_start = this.pos - 2;
                        }
                        tag_start_char = '{';
                    }
                }

                this.line_char_count++;
                content.push(input_char); //inserts character at-a-time (or string)

                if (content[1] && (content[1] === '!' || content[1] === '?' || content[1] === '%')) { //if we're in a comment, do something special
                    // We treat all comments as literals, even more than preformatted tags
                    // we just look for the appropriate close tag
                    content = [this.get_comment(tag_start)];
                    break;
                }

                if (indent_handlebars && content[1] && content[1] === '{' && content[2] && content[2] === '!') { //if we're in a comment, do something special
                    // We treat all comments as literals, even more than preformatted tags
                    // we just look for the appropriate close tag
                    content = [this.get_comment(tag_start)];
                    break;
                }

                if (indent_handlebars && tag_start_char === '{' && content.length > 2 && content[content.length - 2] === '}' && content[content.length - 1] === '}') {
                    break;
                }
            } while (input_char !== '>');

            var tag_complete = content.join('');
            var tag_index;
            var tag_offset;

            // must check for space first otherwise the tag could have the first attribute included, and
            // then not un-indent correctly
            if (tag_complete.indexOf(' ') !== -1) { //if there's whitespace, thats where the tag name ends
                tag_index = tag_complete.indexOf(' ');
            } else if (tag_complete.indexOf('\n') !== -1) { //if there's a line break, thats where the tag name ends
                tag_index = tag_complete.indexOf('\n');
            } else if (tag_complete.charAt(0) === '{') {
                tag_index = tag_complete.indexOf('}');
            } else { //otherwise go with the tag ending
                tag_index = tag_complete.indexOf('>');
            }
            if (tag_complete.charAt(0) === '<' || !indent_handlebars) {
                tag_offset = 1;
            } else {
                tag_offset = tag_complete.charAt(2) === '#' ? 3 : 2;
            }
            var tag_check = tag_complete.substring(tag_offset, tag_index).toLowerCase();
            if (tag_complete.charAt(tag_complete.length - 2) === '/' ||
                this.Utils.in_array(tag_check, this.Utils.single_token)) { //if this tag name is a single tag type (either in the list or has a closing /)
                if (!peek) {
                    this.tag_type = 'SINGLE';
                }
            } else if (indent_handlebars && tag_complete.charAt(0) === '{' && tag_check === 'else') {
                if (!peek) {
                    this.indent_to_tag('if');
                    this.tag_type = 'HANDLEBARS_ELSE';
                    this.indent_content = true;
                    this.traverse_whitespace();
                }
            } else if (this.is_unformatted(tag_check, unformatted) ||
                this.is_unformatted(tag_check, content_unformatted)) {
                // do not reformat the "unformatted" or "content_unformatted" tags
                comment = this.get_unformatted('</' + tag_check + '>', tag_complete); //...delegate to get_unformatted function
                content.push(comment);
                tag_end = this.pos - 1;
                this.tag_type = 'SINGLE';
            } else if (tag_check === 'script' &&
                (tag_complete.search('type') === -1 ||
                    (tag_complete.search('type') > -1 &&
                        tag_complete.search(/\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1))) {
                if (!peek) {
                    this.record_tag(tag_check);
                    this.tag_type = 'SCRIPT';
                }
            } else if (tag_check === 'style' &&
                (tag_complete.search('type') === -1 ||
                    (tag_complete.search('type') > -1 && tag_complete.search('text/css') > -1))) {
                if (!peek) {
                    this.record_tag(tag_check);
                    this.tag_type = 'STYLE';
                }
            } else if (tag_check.charAt(0) === '!') { //peek for <! comment
                // for comments content is already correct.
                if (!peek) {
                    this.tag_type = 'SINGLE';
                    this.traverse_whitespace();
                }
            } else if (!peek) {
                if (tag_check.charAt(0) === '/') { //this tag is a double tag so check for tag-ending
                    this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
                    this.tag_type = 'END';
                } else { //otherwise it's a start-tag
                    this.record_tag(tag_check); //push it on the tag stack
                    if (tag_check.toLowerCase() !== 'html') {
                        this.indent_content = true;
                    }
                    this.tag_type = 'START';
                }

                // Allow preserving of newlines after a start or end tag
                if (this.traverse_whitespace()) {
                    this.space_or_wrap(content);
                }

                if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) { //check if this double needs an extra line
                    this.print_newline(false, this.output);
                    if (this.output.length && this.output[this.output.length - 2] !== '\n') {
                        this.print_newline(true, this.output);
                    }
                }
            }

            if (peek) {
                this.pos = orig_pos;
                this.line_char_count = orig_line_char_count;
            }

            return content.join(''); //returns fully formatted tag
        };

        this.get_comment = function(start_pos) { //function to return comment content in its entirety
            // this is will have very poor perf, but will work for now.
            var comment = '',
                delimiter = '>',
                matched = false;

            this.pos = start_pos;
            var input_char = this.input.charAt(this.pos);
            this.pos++;

            while (this.pos <= this.input.length) {
                comment += input_char;

                // only need to check for the delimiter if the last chars match
                if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) &&
                    comment.indexOf(delimiter) !== -1) {
                    break;
                }

                // only need to search for custom delimiter for the first few characters
                if (!matched && comment.length < 10) {
                    if (comment.indexOf('<![if') === 0) { //peek for <![if conditional comment
                        delimiter = '<![endif]>';
                        matched = true;
                    } else if (comment.indexOf('<![cdata[') === 0) { //if it's a <[cdata[ comment...
                        delimiter = ']]>';
                        matched = true;
                    } else if (comment.indexOf('<![') === 0) { // some other ![ comment? ...
                        delimiter = ']>';
                        matched = true;
                    } else if (comment.indexOf('<!--') === 0) { // <!-- comment ...
                        delimiter = '-->';
                        matched = true;
                    } else if (comment.indexOf('{{!--') === 0) { // {{!-- handlebars comment
                        delimiter = '--}}';
                        matched = true;
                    } else if (comment.indexOf('{{!') === 0) { // {{! handlebars comment
                        if (comment.length === 5 && comment.indexOf('{{!--') === -1) {
                            delimiter = '}}';
                            matched = true;
                        }
                    } else if (comment.indexOf('<?') === 0) { // {{! handlebars comment
                        delimiter = '?>';
                        matched = true;
                    } else if (comment.indexOf('<%') === 0) { // {{! handlebars comment
                        delimiter = '%>';
                        matched = true;
                    }
                }

                input_char = this.input.charAt(this.pos);
                this.pos++;
            }

            return comment;
        };

        function tokenMatcher(delimiter) {
            var token = '';

            var add = function(str) {
                var newToken = token + str.toLowerCase();
                token = newToken.length <= delimiter.length ? newToken : newToken.substr(newToken.length - delimiter.length, delimiter.length);
            };

            var doesNotMatch = function() {
                return token.indexOf(delimiter) === -1;
            };

            return {
                add: add,
                doesNotMatch: doesNotMatch
            };
        }

        this.get_unformatted = function(delimiter, orig_tag) { //function to return unformatted content in its entirety
            if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) !== -1) {
                return '';
            }
            var input_char = '';
            var content = '';
            var space = true;

            var delimiterMatcher = tokenMatcher(delimiter);

            do {

                if (this.pos >= this.input.length) {
                    return content;
                }

                input_char = this.input.charAt(this.pos);
                this.pos++;

                if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                    if (!space) {
                        this.line_char_count--;
                        continue;
                    }
                    if (input_char === '\n' || input_char === '\r') {
                        content += '\n';
                        /*  Don't change tab indention for unformatted blocks.  If using code for html editing, this will greatly affect <pre> tags if they are specified in the 'unformatted array'
            for (var i=0; i<this.indent_level; i++) {
              content += this.indent_string;
            }
            space = false; //...and make sure other indentation is erased
            */
                        this.line_char_count = 0;
                        continue;
                    }
                }
                content += input_char;
                delimiterMatcher.add(input_char);
                this.line_char_count++;
                space = true;

                if (indent_handlebars && input_char === '{' && content.length && content.charAt(content.length - 2) === '{') {
                    // Handlebars expressions in strings should also be unformatted.
                    content += this.get_unformatted('}}');
                    // Don't consider when stopping for delimiters.
                }
            } while (delimiterMatcher.doesNotMatch());

            return content;
        };

        this.get_token = function() { //initial handler for token-retrieval
            var token;

            if (this.last_token === 'TK_TAG_SCRIPT' || this.last_token === 'TK_TAG_STYLE') { //check if we need to format javascript
                var type = this.last_token.substr(7);
                token = this.get_contents_to(type);
                if (typeof token !== 'string') {
                    return token;
                }
                return [token, 'TK_' + type];
            }
            if (this.current_mode === 'CONTENT') {
                token = this.get_content();
                if (typeof token !== 'string') {
                    return token;
                } else {
                    return [token, 'TK_CONTENT'];
                }
            }

            if (this.current_mode === 'TAG') {
                token = this.get_tag();
                if (typeof token !== 'string') {
                    return token;
                } else {
                    var tag_name_type = 'TK_TAG_' + this.tag_type;
                    return [token, tag_name_type];
                }
            }
        };

        this.get_full_indent = function(level) {
            level = this.indent_level + level || 0;
            if (level < 1) {
                return '';
            }

            return Array(level + 1).join(this.indent_string);
        };

        this.is_unformatted = function(tag_check, unformatted) {
            //is this an HTML5 block-level link?
            if (!this.Utils.in_array(tag_check, unformatted)) {
                return false;
            }

            if (tag_check.toLowerCase() !== 'a' || !this.Utils.in_array('a', unformatted)) {
                return true;
            }

            //at this point we have an  tag; is its first child something we want to remain
            //unformatted?
            var next_tag = this.get_tag(true /* peek. */ );

            // test next_tag to see if it is just html tag (no external content)
            var tag = (next_tag || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);

            // if next_tag comes back but is not an isolated tag, then
            // let's treat the 'a' tag as having content
            // and respect the unformatted option
            if (!tag || this.Utils.in_array(tag[1], unformatted)) {
                return true;
            } else {
                return false;
            }
        };

        this.printer = function(js_source, indent_character, indent_size, wrap_line_length, brace_style) { //handles input/output and some other printing functions

            this.input = js_source || ''; //gets the input for the Parser

            // HACK: newline parsing inconsistent. This brute force normalizes the input.
            this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

            this.output = [];
            this.indent_character = indent_character;
            this.indent_string = '';
            this.indent_size = indent_size;
            this.brace_style = brace_style;
            this.indent_level = 0;
            this.wrap_line_length = wrap_line_length;
            this.line_char_count = 0; //count to see if wrap_line_length was exceeded

            for (var i = 0; i < this.indent_size; i++) {
                this.indent_string += this.indent_character;
            }

            this.print_newline = function(force, arr) {
                this.line_char_count = 0;
                if (!arr || !arr.length) {
                    return;
                }
                if (force || (arr[arr.length - 1] !== '\n')) { //we might want the extra line
                    if ((arr[arr.length - 1] !== '\n')) {
                        arr[arr.length - 1] = rtrim(arr[arr.length - 1]);
                    }
                    arr.push('\n');
                }
            };

            this.print_indentation = function(arr) {
                for (var i = 0; i < this.indent_level; i++) {
                    arr.push(this.indent_string);
                    this.line_char_count += this.indent_string.length;
                }
            };

            this.print_token = function(text) {
                // Avoid printing initial whitespace.
                if (this.is_whitespace(text) && !this.output.length) {
                    return;
                }
                if (text || text !== '') {
                    if (this.output.length && this.output[this.output.length - 1] === '\n') {
                        this.print_indentation(this.output);
                        text = ltrim(text);
                    }
                }
                this.print_token_raw(text);
            };

            this.print_token_raw = function(text) {
                // If we are going to print newlines, truncate trailing
                // whitespace, as the newlines will represent the space.
                if (this.newlines > 0) {
                    text = rtrim(text);
                }

                if (text && text !== '') {
                    if (text.length > 1 && text.charAt(text.length - 1) === '\n') {
                        // unformatted tags can grab newlines as their last character
                        this.output.push(text.slice(0, -1));
                        this.print_newline(false, this.output);
                    } else {
                        this.output.push(text);
                    }
                }

                for (var n = 0; n < this.newlines; n++) {
                    this.print_newline(n > 0, this.output);
                }
                this.newlines = 0;
            };

            this.indent = function() {
                this.indent_level++;
            };

            this.unindent = function() {
                if (this.indent_level > 0) {
                    this.indent_level--;
                }
            };
        };
        return this;
    }

    /*_____________________--------------------_____________________*/

    this.beautify = function() {
        multi_parser = new Parser(); //wrapping functions Parser
        multi_parser.printer(html_source, indent_character, indent_size, wrap_line_length, brace_style); //initialize starting values
        while (true) {
            var t = multi_parser.get_token();
            multi_parser.token_text = t[0];
            multi_parser.token_type = t[1];

            if (multi_parser.token_type === 'TK_EOF') {
                break;
            }

            switch (multi_parser.token_type) {
                case 'TK_TAG_START':
                    multi_parser.print_newline(false, multi_parser.output);
                    multi_parser.print_token(multi_parser.token_text);
                    if (multi_parser.indent_content) {
                        if ((multi_parser.indent_body_inner_html || !multi_parser.token_text.match(/<body(?:.*)>/)) &&
                            (multi_parser.indent_head_inner_html || !multi_parser.token_text.match(/<head(?:.*)>/))) {

                            multi_parser.indent();
                        }

                        multi_parser.indent_content = false;
                    }
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_STYLE':
                case 'TK_TAG_SCRIPT':
                    multi_parser.print_newline(false, multi_parser.output);
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_END':
                    //Print new line only if the tag has no content and has child
                    if (multi_parser.last_token === 'TK_CONTENT' && multi_parser.last_text === '') {
                        var tag_name = (multi_parser.token_text.match(/\w+/) || [])[0];
                        var tag_extracted_from_last_output = null;
                        if (multi_parser.output.length) {
                            tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length - 1].match(/(?:<|{{#)\s*(\w+)/);
                        }
                        if (tag_extracted_from_last_output === null ||
                            (tag_extracted_from_last_output[1] !== tag_name && !multi_parser.Utils.in_array(tag_extracted_from_last_output[1], unformatted))) {
                            multi_parser.print_newline(false, multi_parser.output);
                        }
                    }
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_SINGLE':
                    // Don't add a newline before elements that should remain unformatted.
                    var tag_check = multi_parser.token_text.match(/^\s*<([a-z-]+)/i);
                    if (!tag_check || !multi_parser.Utils.in_array(tag_check[1], unformatted)) {
                        multi_parser.print_newline(false, multi_parser.output);
                    }
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_HANDLEBARS_ELSE':
                    // Don't add a newline if opening {{#if}} tag is on the current line
                    var foundIfOnCurrentLine = false;
                    for (var lastCheckedOutput = multi_parser.output.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
                        if (multi_parser.output[lastCheckedOutput] === '\n') {
                            break;
                        } else {
                            if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
                                foundIfOnCurrentLine = true;
                                break;
                            }
                        }
                    }
                    if (!foundIfOnCurrentLine) {
                        multi_parser.print_newline(false, multi_parser.output);
                    }
                    multi_parser.print_token(multi_parser.token_text);
                    if (multi_parser.indent_content) {
                        multi_parser.indent();
                        multi_parser.indent_content = false;
                    }
                    multi_parser.current_mode = 'CONTENT';
                    break;
                case 'TK_TAG_HANDLEBARS_COMMENT':
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'TAG';
                    break;
                case 'TK_CONTENT':
                    multi_parser.print_token(multi_parser.token_text);
                    multi_parser.current_mode = 'TAG';
                    break;
                case 'TK_STYLE':
                case 'TK_SCRIPT':
                    if (multi_parser.token_text !== '') {
                        multi_parser.print_newline(false, multi_parser.output);
                        var text = multi_parser.token_text,
                            _beautifier,
                            script_indent_level = 1;
                        if (multi_parser.token_type === 'TK_SCRIPT') {
                            _beautifier = typeof js_beautify === 'function' && js_beautify;
                        } else if (multi_parser.token_type === 'TK_STYLE') {
                            _beautifier = typeof css_beautify === 'function' && css_beautify;
                        }

                        if (options.indent_scripts === "keep") {
                            script_indent_level = 0;
                        } else if (options.indent_scripts === "separate") {
                            script_indent_level = -multi_parser.indent_level;
                        }

                        var indentation = multi_parser.get_full_indent(script_indent_level);
                        if (_beautifier) {

                            // call the Beautifier if avaliable
                            var Child_options = function() {
                                this.eol = '\n';
                            };
                            Child_options.prototype = options;
                            var child_options = new Child_options();
                            text = _beautifier(text.replace(/^\s*/, indentation), child_options);
                        } else {
                            // simply indent the string otherwise
                            var white = text.match(/^\s*/)[0];
                            var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
                            var reindent = multi_parser.get_full_indent(script_indent_level - _level);
                            text = text.replace(/^\s*/, indentation)
                                .replace(/\r\n|\r|\n/g, '\n' + reindent)
                                .replace(/\s+$/, '');
                        }
                        if (text) {
                            multi_parser.print_token_raw(text);
                            multi_parser.print_newline(true, multi_parser.output);
                        }
                    }
                    multi_parser.current_mode = 'TAG';
                    break;
                default:
                    // We should not be getting here but we don't want to drop input on the floor
                    // Just output the text and move on
                    if (multi_parser.token_text !== '') {
                        multi_parser.print_token(multi_parser.token_text);
                    }
                    break;
            }
            multi_parser.last_token = multi_parser.token_type;
            multi_parser.last_text = multi_parser.token_text;
        }
        var sweet_code = multi_parser.output.join('').replace(/[\r\n\t ]+$/, '');

        // establish end_with_newline
        if (end_with_newline) {
            sweet_code += '\n';
        }

        if (eol !== '\n') {
            sweet_code = sweet_code.replace(/[\n]/g, eol);
        }

        return sweet_code;
    };
}

module.exports.Beautifier = Beautifier;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* jshint curly: false */
// This section of code is taken from acorn.
//
// Acorn was written by Marijn Haverbeke and released under an MIT
// license. The Unicode regexps (for identifiers and whitespace) were
// taken from [Esprima](http://esprima.org) by Ariya Hidayat.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/marijnh/acorn.git

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
var nonASCIIidentifierChars = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

// Whether a single character denotes a newline.

exports.newline = /[\n\r\u2028\u2029]/;

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

// in javascript, these two differ
// in python they are the same, different methods are called on them
exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');


// Test whether a given character code starts an identifier.

exports.isIdentifierStart = function(code) {
    // permit $ (36) and @ (64). @ is used in ES7 decorators.
    if (code < 65) return code === 36 || code === 64;
    // 65 through 91 are uppercase letters.
    if (code < 91) return true;
    // permit _ (95).
    if (code < 97) return code === 95;
    // 97 through 123 are lowercase letters.
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
};

// Test whether a given character is part of an identifier.

exports.isIdentifierChar = function(code) {
    if (code < 48) return code === 36;
    if (code < 58) return true;
    if (code < 65) return false;
    if (code < 91) return true;
    if (code < 97) return code === 95;
    if (code < 123) return true;
    return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

function mergeOpts(allOptions, targetType) {
    var finalOpts = {};
    var name;

    for (name in allOptions) {
        if (name !== targetType) {
            finalOpts[name] = allOptions[name];
        }
    }

    //merge in the per type settings for the targetType
    if (targetType in allOptions) {
        for (name in allOptions[targetType]) {
            finalOpts[name] = allOptions[targetType][name];
        }
    }
    return finalOpts;
}

module.exports.mergeOpts = mergeOpts;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var Beautifier = __webpack_require__(0).Beautifier;

function style_html(html_source, options, js_beautify, css_beautify) {
    var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
    return beautifier.beautify();
}

module.exports = style_html;

/***/ })
/******/ ]);
var style_html = legacy_beautify_html;
/* Footer */
if (true) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(58), __webpack_require__(59)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(requireamd) {
        var js_beautify = __webpack_require__(58);
        var css_beautify = __webpack_require__(59);

        return {
            html_beautify: function(html_source, options) {
                return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
            }
        };
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else if (typeof exports !== "undefined") {
    // Add support for CommonJS. Just put this file somewhere on your require.paths
    // and you will be able to `var html_beautify = require("beautify").html_beautify`.
    var js_beautify = require('./beautify.js');
    var css_beautify = require('./beautify-css.js');

    exports.html_beautify = function(html_source, options) {
        return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
    };
} else if (typeof window !== "undefined") {
    // If we're running a web page and don't have either of the above, add our one global
    window.html_beautify = function(html_source, options) {
        return style_html(html_source, options, window.js_beautify, window.css_beautify);
    };
} else if (typeof global !== "undefined") {
    // If we don't even have window, try global.
    global.html_beautify = function(html_source, options) {
        return style_html(html_source, options, global.js_beautify, global.css_beautify);
    };
}

}());


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-container .eruda-json {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  cursor: default;\n  font-family: Consolas, Lucida Console, Monaco, MonoSpace;\n  font-size: 12px;\n  line-height: 1.2;\n  min-height: 100%;\n  color: #263238; }\n  .eruda-container .eruda-json, .eruda-container .eruda-json ul {\n    list-style: none !important; }\n  .eruda-container .eruda-json ul {\n    padding: 0 !important;\n    padding-left: 15px !important;\n    margin: 0 !important; }\n  .eruda-container .eruda-json li {\n    position: relative;\n    white-space: nowrap; }\n  .eruda-container .eruda-json > li > .eruda-key {\n    display: none; }\n  .eruda-container .eruda-json > li {\n    padding: 10px 0; }\n  .eruda-container .eruda-json .eruda-array .eruda-object .eruda-key {\n    display: inline; }\n  .eruda-container .eruda-json .eruda-null {\n    color: #0086b3; }\n  .eruda-container .eruda-json .eruda-string {\n    color: #183691; }\n  .eruda-container .eruda-json .eruda-number {\n    color: #0086b3; }\n  .eruda-container .eruda-json .eruda-boolean {\n    color: #0086b3; }\n  .eruda-container .eruda-json .eruda-special {\n    color: #707d8b; }\n  .eruda-container .eruda-json .eruda-key {\n    color: #a71d5d; }\n  .eruda-container .eruda-json .eruda-key-lighter {\n    color: #d391b5; }\n  .eruda-container .eruda-json .eruda-expanded:before {\n    content: \"\";\n    width: 0;\n    height: 0;\n    border: 4px solid transparent;\n    position: absolute;\n    border-top-color: #707d8b;\n    left: -12px;\n    top: 5px; }\n  .eruda-container .eruda-json .eruda-collapsed:before {\n    content: \"\";\n    border-left-color: #707d8b;\n    border-top-color: transparent;\n    left: -10px;\n    top: 3px; }\n  .eruda-container .eruda-json li .eruda-collapsed ~ .eruda-close:before {\n    color: #999; }\n  .eruda-container .eruda-json .eruda-hidden ~ ul {\n    display: none; }\n  .eruda-container .eruda-json span {\n    position: static !important; }\n", ""]);

// exports


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"eruda-header\">\r\n            <span data-mark=\"time\">"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</span> <span>"
    + alias4(((helper = (helper = helpers.from || (depth0 != null ? depth0.from : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from","hash":{},"data":data}) : helper)))
    + "</span>\r\n        </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"eruda-icon-container\">\r\n                <span class=\"eruda-icon eruda-icon-"
    + container.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></span>\r\n            </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.displayHeader : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"eruda-"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " eruda-log-item\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-type=\""
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <div class=\"eruda-count eruda-hidden\" data-mark=\"count\"></div>\r\n        <div class=\"eruda-log-content-wrapper\">\r\n            <div class=\"eruda-log-content\">"
    + ((stack1 = ((helper = (helper = helpers.msg || (depth0 != null ? depth0.msg : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"msg","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n        </div>\r\n    </div>\r\n</li>";
},"useData":true});

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools .eruda-tools .eruda-console .eruda-logs {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  height: 100%;\n  font-size: 14px;\n  padding-top: 1px; }\n  .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-header {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    white-space: nowrap;\n    margin: 5px 0;\n    padding: 0 10px;\n    font-size: 12px;\n    color: #707d8b; }\n  .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item {\n    position: relative;\n    background: #fff;\n    padding: 10px;\n    border-bottom: 1px solid #eceffe;\n    border-top: 1px solid #eceffe;\n    margin-top: -1px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item:after {\n      content: '';\n      display: block;\n      clear: both; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item a {\n      color: #2196f3 !important; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-count, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-icon-container {\n      float: left;\n      margin-right: 5px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-icon-container .eruda-icon {\n      line-height: 20px;\n      font-size: 12px;\n      color: #263238; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-icon-container .eruda-icon-chevron-right {\n      color: #2196f3; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-icon-container .eruda-icon-info-circle {\n      color: #2196f3; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-icon-container .eruda-icon-times-circle {\n      color: #f44336; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-icon-container .eruda-icon-exclamation-triangle {\n      color: #ff6f00; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-count {\n      background: #2196f3;\n      padding: 2px 4px;\n      color: #fff;\n      border-radius: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-log-content-wrapper {\n      overflow: hidden; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-log-content {\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch;\n      white-space: pre-wrap;\n      -webkit-user-select: text;\n         -moz-user-select: text;\n          -ms-user-select: text;\n              user-select: text;\n      line-height: 20px; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item .eruda-log-content * {\n        -webkit-user-select: text;\n           -moz-user-select: text;\n            -ms-user-select: text;\n                user-select: text; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-input {\n      background: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-html table, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-table table {\n      width: 100%;\n      background: #fff;\n      border-bottom: 1px solid #eceffe;\n      border-collapse: collapse; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-html table th, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-table table th {\n        background: #2196f3;\n        color: #fff; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-html table th, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-html table td, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-table table th, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-table table td {\n        padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-html .eruda-blue, .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-table .eruda-blue {\n      color: #2196f3; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-error {\n      z-index: 50;\n      background: #ffebee;\n      color: #f44336;\n      border-top: 1px solid #f44336;\n      border-bottom: 1px solid #f44336; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-error .eruda-stack {\n        padding-left: 1.2em;\n        white-space: nowrap; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-error .eruda-count {\n        background: #f44336; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-debug {\n      z-index: 20;\n      color: #2196f3; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-warn {\n      z-index: 40;\n      background: #fffbe6;\n      border-top: 1px solid #ffc107;\n      border-bottom: 1px solid #ffc107; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-info {\n      z-index: 30;\n      color: #2196f3; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-logs .eruda-log-item.eruda-output {\n      color: #263238; }\n", ""]);

// exports


/***/ }),
/* 155 */
/***/ (function(module, exports) {

module.exports = {":$":"Load jQuery",":_":"Load underscore","/regexp":"Show logs that match given regexp"}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "            <tr>\r\n                <td>"
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + "</td>\r\n                <td>"
    + alias1(container.lambda(depth0, depth0))
    + "</td>\r\n            </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table>\r\n    <thead>\r\n        <tr>\r\n            <th>Command</th>\r\n            <th>Description</th>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.commands : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\r\n</table>";
},"useData":true});

/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = {"jQuery":"//cdn.bootcss.com/jquery/2.2.1/jquery.js","underscore":"//cdn.bootcss.com/underscore.js/1.8.3/underscore-min.js"}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools .eruda-tools .eruda-console {\n  padding-top: 40px;\n  padding-bottom: 40px; }\n  .eruda-dev-tools .eruda-tools .eruda-console .eruda-control {\n    position: absolute;\n    width: 100%;\n    height: 40px;\n    left: 0;\n    top: 0;\n    cursor: default;\n    padding: 10px 10px 10px 40px;\n    background: #fff;\n    line-height: 20px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-ban, .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-info-circle {\n      display: inline-block;\n      color: #707d8b;\n      padding: 10px;\n      font-size: 16px;\n      position: absolute;\n      top: 1px;\n      cursor: pointer;\n      -webkit-transition: color 0.3s;\n      transition: color 0.3s; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-ban:active, .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-info-circle:active {\n        color: #263238; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-ban {\n      left: 0; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-icon-info-circle {\n      right: 0; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-filter {\n      cursor: pointer;\n      color: #707d8b;\n      margin: 0 1px;\n      font-size: 12px;\n      height: 20px;\n      display: inline-block;\n      padding: 0 4px;\n      line-height: 20px;\n      border-radius: 4px;\n      -webkit-transition: background 0.3s, color 0.3s;\n      transition: background 0.3s, color 0.3s; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-control .eruda-filter.eruda-active {\n        background: #707d8b;\n        color: #fff; }\n  .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    background: #fff;\n    height: 40px; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input .eruda-buttons {\n      display: none;\n      position: absolute;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 40px;\n      color: #707d8b;\n      font-size: 12px;\n      border-bottom: 1px solid #eceffe; }\n      .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input .eruda-buttons .eruda-button {\n        cursor: pointer;\n        width: 50%;\n        display: inline-block;\n        text-align: center;\n        border-right: 1px solid #eceffe;\n        height: 40px;\n        line-height: 40px;\n        float: left;\n        -webkit-transition: background 0.3s, color 0.3s;\n        transition: background 0.3s, color 0.3s; }\n        .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input .eruda-buttons .eruda-button:last-child {\n          border-right: none; }\n        .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input .eruda-buttons .eruda-button:active {\n          background: #2196f3;\n          color: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-console .eruda-js-input textarea {\n      padding: 10px;\n      outline: none;\n      border: none;\n      font-size: 14px;\n      width: 100%;\n      height: 100%;\n      -webkit-user-select: text;\n         -moz-user-select: text;\n          -ms-user-select: text;\n              user-select: text;\n      resize: none; }\n", ""]);

// exports


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"eruda-control\">\r\n    <span class=\"eruda-icon-ban eruda-clear-console\"></span>\r\n    <span class=\"eruda-filter eruda-active\" data-filter=\"all\">All</span>\r\n    <span class=\"eruda-filter\" data-filter=\"error\">Error</span>\r\n    <span class=\"eruda-filter\" data-filter=\"warn\">Warning</span>\r\n    <span class=\"eruda-filter\" data-filter=\"info\">Info</span>\r\n    <span class=\"eruda-filter\" data-filter=\"log\">Log</span>\r\n    <span class=\"eruda-filter\" data-filter=\"debug\">Debug</span>\r\n    <span class=\"eruda-icon-info-circle eruda-help\"></span>\r\n</div>\r\n<ul class=\"eruda-logs\"></ul>\r\n<div class=\"eruda-js-input\">\r\n    <div class=\"eruda-buttons\">\r\n        <div class=\"eruda-button eruda-cancel\">Cancel</div>\r\n        <div class=\"eruda-button eruda-execute\">Execute</div>\r\n    </div>\r\n    <textarea placeholder=\"Type JavaScript here\"></textarea>\r\n</div>\r\n";
},"useData":true});

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(14);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Tool2 = __webpack_require__(9);

var _Tool3 = _interopRequireDefault(_Tool2);

var _XhrRequest = __webpack_require__(161);

var _XhrRequest2 = _interopRequireDefault(_XhrRequest);

var _FetchRequest = __webpack_require__(169);

var _FetchRequest2 = _interopRequireDefault(_FetchRequest);

var _Settings = __webpack_require__(13);

var _Settings2 = _interopRequireDefault(_Settings);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Network = function (_Tool) {
    (0, _inherits3.default)(Network, _Tool);

    function Network() {
        (0, _classCallCheck3.default)(this, Network);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Network.__proto__ || (0, _getPrototypeOf2.default)(Network)).call(this));

        _this._style = (0, _util.evalCss)(__webpack_require__(170));

        _this.name = 'network';
        _this._requests = {};
        _this._tpl = __webpack_require__(171);
        _this._isFetchSupported = false;
        if (window.fetch) _this._isFetchSupported = (0, _util.isNative)(window.fetch);
        return _this;
    }

    (0, _createClass3.default)(Network, [{
        key: 'init',
        value: function init($el, container) {
            (0, _get3.default)(Network.prototype.__proto__ || (0, _getPrototypeOf2.default)(Network.prototype), 'init', this).call(this, $el);

            this._container = container;
            this._bindEvent();
            this._initCfg();
            this.overrideXhr();
        }
    }, {
        key: 'show',
        value: function show() {
            (0, _get3.default)(Network.prototype.__proto__ || (0, _getPrototypeOf2.default)(Network.prototype), 'show', this).call(this);

            this._render();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this._requests = {};
            this._render();
        }
    }, {
        key: 'overrideXhr',
        value: function overrideXhr() {
            var winXhrProto = window.XMLHttpRequest.prototype;

            var origSend = this._origSend = winXhrProto.send,
                origOpen = this._origOpen = winXhrProto.open;

            var self = this;

            winXhrProto.open = function (method, url) {
                var xhr = this;

                var req = xhr.erudaRequest = new _XhrRequest2.default(xhr, method, url);

                req.on('send', function (id, data) {
                    return self._addReq(id, data);
                });
                req.on('update', function (id, data) {
                    return self._updateReq(id, data);
                });

                xhr.addEventListener('readystatechange', function () {
                    switch (xhr.readyState) {
                        case 2:
                            return req.handleHeadersReceived();
                        case 4:
                            return req.handleDone();
                    }
                });

                origOpen.apply(this, arguments);
            };

            winXhrProto.send = function (data) {
                var req = this.erudaRequest;
                if (req) req.handleSend(data);

                origSend.apply(this, arguments);
            };
        }
    }, {
        key: 'restoreXhr',
        value: function restoreXhr() {
            var winXhrProto = window.XMLHttpRequest.prototype;

            if (this._origOpen) winXhrProto.open = this._origOpen;
            if (this._origSend) winXhrProto.send = this._origSend;
        }
    }, {
        key: 'overrideFetch',
        value: function overrideFetch() {
            if (!this._isFetchSupported) return;

            var origFetch = this._origFetch = window.fetch;

            var self = this;

            window.fetch = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var req = new (Function.prototype.bind.apply(_FetchRequest2.default, [null].concat(args)))();
                req.on('send', function (id, data) {
                    return self._addReq(id, data);
                });
                req.on('update', function (id, data) {
                    return self._updateReq(id, data);
                });

                var fetchResult = origFetch.apply(undefined, args);
                req.send(fetchResult);

                return fetchResult;
            };
        }
    }, {
        key: 'restoreFetch',
        value: function restoreFetch() {
            if (!this._isFetchSupported) return;

            if (this._origFetch) window.fetch = this._origFetch;
        }
    }, {
        key: '_addReq',
        value: function _addReq(id, data) {
            (0, _util.defaults)(data, {
                name: '',
                url: '',
                status: 'pending',
                type: 'unknown',
                subType: 'unknown',
                size: 0,
                data: '',
                method: 'GET',
                startTime: (0, _util.now)(),
                time: 0,
                resHeaders: {},
                resTxt: '',
                done: false
            });

            this._requests[id] = data;

            this._render();
        }
    }, {
        key: '_updateReq',
        value: function _updateReq(id, data) {
            var target = this._requests[id];

            if (!target) return;

            (0, _util.extend)(target, data);

            target.time = target.time - target.startTime;
            target.displayTime = formatTime(target.time);

            if (target.done && (target.status < 200 || target >= 300)) target.hasErr = true;

            this._render();
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var _this2 = this;

            var $el = this._$el,
                container = this._container;

            var self = this;

            $el.on('click', '.eruda-request', function () {
                var id = (0, _util.$)(this).data('id'),
                    data = self._requests[id];

                if (!data.done) return;

                showSources('http', {
                    url: data.url,
                    data: data.data,
                    resTxt: data.resTxt,
                    type: data.type,
                    subType: data.subType,
                    resHeaders: data.resHeaders
                });
            }).on('click', '.eruda-clear-request', function () {
                return _this2.clear();
            });

            function showSources(type, data) {
                var sources = container.get('sources');
                if (!sources) return;

                sources.set(type, data);

                container.showTool('sources');
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            (0, _get3.default)(Network.prototype.__proto__ || (0, _getPrototypeOf2.default)(Network.prototype), 'destroy', this).call(this);

            _util.evalCss.remove(this._style);
            this.restoreXhr();
            this.restoreFetch();
        }
    }, {
        key: '_initCfg',
        value: function _initCfg() {
            var _this3 = this;

            var cfg = this.config = _Settings2.default.createCfg('network', {
                overrideFetch: true
            });

            if (cfg.get('overrideFetch')) this.overrideFetch();

            cfg.on('change', function (key, val) {
                switch (key) {
                    case 'overrideFetch':
                        return val ? _this3.overrideFetch() : _this3.restoreFetch();
                }
            });

            var settings = this._container.get('settings');
            settings.text('Network').switch(cfg, 'overrideFetch', 'Catch Fetch Requests').separator();
        }
    }, {
        key: '_render',
        value: function _render() {
            if (!this.active) return;

            var renderData = {};

            if (!(0, _util.isEmpty)(this._requests)) renderData.requests = this._requests;

            this._renderHtml(this._tpl(renderData));
        }
    }, {
        key: '_renderHtml',
        value: function _renderHtml(html) {
            if (html === this._lastHtml) return;
            this._lastHtml = html;
            this._$el.html(html);
        }
    }]);
    return Network;
}(_Tool3.default);

exports.default = Network;


function formatTime(time) {
    time = Math.round(time);

    if (time < 1000) return time + 'ms';

    return (time / 1000).toFixed(1) + 's';
}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = __webpack_require__(162);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _util = __webpack_require__(76);

var _util2 = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XhrRequest = function (_Emitter) {
    (0, _inherits3.default)(XhrRequest, _Emitter);

    function XhrRequest(xhr, method, url) {
        (0, _classCallCheck3.default)(this, XhrRequest);

        var _this = (0, _possibleConstructorReturn3.default)(this, (XhrRequest.__proto__ || (0, _getPrototypeOf2.default)(XhrRequest)).call(this));

        _this._xhr = xhr;
        _this._method = method;
        _this._url = (0, _util2.fullUrl)(url);
        _this._id = (0, _util2.uniqId)('request');
        return _this;
    }

    (0, _createClass3.default)(XhrRequest, [{
        key: 'handleSend',
        value: function handleSend(data) {
            if (!(0, _util2.isStr)(data)) data = '';

            this.emit('send', this._id, {
                name: (0, _util2.getFileName)(this._url),
                url: this._url,
                data: data,
                method: this._method
            });
        }
    }, {
        key: 'handleHeadersReceived',
        value: function handleHeadersReceived() {
            var xhr = this._xhr;

            var type = (0, _util.getType)(xhr.getResponseHeader('Content-Type'));

            this.emit('update', this._id, {
                type: type.type,
                subType: type.subType,
                size: getSize(xhr, true, this._url),
                time: (0, _util2.now)(),
                resHeaders: getHeaders(xhr)
            });
        }
    }, {
        key: 'handleDone',
        value: function handleDone() {
            var xhr = this._xhr,
                resType = xhr.responseType;

            var resTxt = resType === '' || resType === 'text' || resType === 'json' ? xhr.responseText : '';

            this.emit('update', this._id, {
                status: xhr.status,
                done: true,
                size: getSize(xhr, false, this._url),
                time: (0, _util2.now)(),
                resTxt: resTxt
            });

            delete this._xhr;
        }
    }]);
    return XhrRequest;
}(_util2.Emitter);

exports.default = XhrRequest;


function getHeaders(xhr) {
    var raw = xhr.getAllResponseHeaders(),
        lines = raw.split('\n');

    var ret = {};

    (0, _util2.each)(lines, function (line) {
        line = (0, _util2.trim)(line);

        if (line === '') return;

        var _line$split = line.split(':', 2),
            _line$split2 = (0, _slicedToArray3.default)(_line$split, 2),
            key = _line$split2[0],
            val = _line$split2[1];

        ret[key] = (0, _util2.trim)(val);
    });

    return ret;
}

function getSize(xhr, headersOnly, url) {
    var size = 0;

    function getStrSize() {
        if (!headersOnly) {
            var resType = xhr.responseType;
            var resTxt = resType === '' || resType === 'text' || resType === 'json' ? xhr.responseText : '';
            if (resTxt) size = (0, _util.lenToUtf8Bytes)(resTxt);
        }
    }

    if ((0, _util2.isCrossOrig)(url)) {
        getStrSize();
    } else {
        try {
            size = (0, _util2.toNum)(xhr.getResponseHeader('Content-Length'));
        } catch (e) {
            getStrSize();
        }
    }

    if (size === 0) getStrSize();

    return (0, _util2.fileSize)(size) + 'B';
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(163);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(75);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(164), __esModule: true };

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(46);
module.exports = __webpack_require__(165);


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(74);
var ITERATOR = __webpack_require__(11)('iterator');
var Iterators = __webpack_require__(25);
module.exports = __webpack_require__(5).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
__webpack_require__(46);
module.exports = __webpack_require__(167);


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(21);
var get = __webpack_require__(168);
module.exports = __webpack_require__(5).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(74);
var ITERATOR = __webpack_require__(11)('iterator');
var Iterators = __webpack_require__(25);
module.exports = __webpack_require__(5).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _util = __webpack_require__(76);

var _util2 = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FetchRequest = function (_Emitter) {
    (0, _inherits3.default)(FetchRequest, _Emitter);

    function FetchRequest(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        (0, _classCallCheck3.default)(this, FetchRequest);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FetchRequest.__proto__ || (0, _getPrototypeOf2.default)(FetchRequest)).call(this));

        if (url instanceof window.Request) url = url.url;

        _this._url = (0, _util2.fullUrl)(url);
        _this._id = (0, _util2.uniqId)('request');
        _this._options = options;
        _this._method = options.method || 'GET';
        return _this;
    }

    (0, _createClass3.default)(FetchRequest, [{
        key: 'send',
        value: function send(fetchResult) {
            var _this2 = this;

            var options = this._options;

            var data = (0, _util2.isStr)(options.body) ? options.body : '';

            this._fetch = fetchResult;
            this.emit('send', this._id, {
                name: (0, _util2.getFileName)(this._url),
                url: this._url,
                data: data,
                method: this._method
            });

            fetchResult.then(function (res) {
                res = res.clone();

                var type = (0, _util.getType)(res.headers.get('Content-Type'));

                res.text().then(function (resTxt) {
                    _this2.emit('update', _this2._id, {
                        type: type.type,
                        subType: type.subType,
                        time: (0, _util2.now)(),
                        size: getSize(res, resTxt),
                        resTxt: resTxt,
                        resHeaders: getHeaders(res),
                        status: res.status,
                        done: true
                    });
                });

                return res;
            });
        }
    }]);
    return FetchRequest;
}(_util2.Emitter);

exports.default = FetchRequest;


function getSize(res, resTxt) {
    var size = 0;

    var contentLen = res.headers.get('Content-length');

    if (contentLen) {
        size = (0, _util2.toNum)(contentLen);
    } else {
        size = (0, _util.lenToUtf8Bytes)(resTxt);
    }

    return (0, _util2.fileSize)(size) + 'B';
}

function getHeaders(res) {
    var ret = {};

    res.headers.forEach(function (val, key) {
        return ret[key] = val;
    });

    return ret;
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools .eruda-tools .eruda-network {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-network .eruda-title {\n    background: #707d8b;\n    padding: 10px;\n    color: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-network .eruda-title .eruda-btn {\n      margin-left: 10px;\n      float: right;\n      background: #fff;\n      color: #707d8b;\n      text-align: center;\n      width: 18px;\n      height: 18px;\n      line-height: 18px;\n      border-radius: 50%;\n      font-size: 12px;\n      cursor: pointer;\n      -webkit-transition: color 0.3s;\n      transition: color 0.3s; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-title .eruda-btn:active {\n        color: #263238; }\n  .eruda-dev-tools .eruda-tools .eruda-network .eruda-requests {\n    background: #fff;\n    border-bottom: 1px solid #eceffe;\n    margin-bottom: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-network .eruda-requests li {\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch;\n      cursor: pointer;\n      border-top: 1px solid #eceffe;\n      height: 41px;\n      white-space: nowrap; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-requests li.eruda-error span {\n        color: #f44336; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-requests li span {\n        display: inline-block;\n        line-height: 40px;\n        height: 40px;\n        padding: 0 10px;\n        font-size: 12px;\n        vertical-align: top; }\n      .eruda-dev-tools .eruda-tools .eruda-network .eruda-requests li:nth-child(even) {\n        background: #eceffe; }\n", ""]);

// exports


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.requests : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <li class=\"eruda-request "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasErr : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-id=\""
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">\r\n                <span>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\r\n                <span>"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "</span>\r\n                <span>"
    + alias4(((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"method","hash":{},"data":data}) : helper)))
    + "</span>\r\n                <span>"
    + alias4(((helper = (helper = helpers.subType || (depth0 != null ? depth0.subType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subType","hash":{},"data":data}) : helper)))
    + "</span>\r\n                <span>"
    + alias4(((helper = (helper = helpers.size || (depth0 != null ? depth0.size : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"size","hash":{},"data":data}) : helper)))
    + "</span>\r\n                <span>"
    + alias4(((helper = (helper = helpers.displayTime || (depth0 != null ? depth0.displayTime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayTime","hash":{},"data":data}) : helper)))
    + "</span>\r\n                <span class=\"eruda-blue\">"
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "eruda-error";
},"5":function(container,depth0,helpers,partials,data) {
    return "        <li><span>Empty</span></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"eruda-title\">\r\n    Request\r\n    <div class=\"eruda-btn eruda-clear-request\">\r\n        <span class=\"eruda-icon-ban\"></span>\r\n    </div>\r\n</div>\r\n<ul class=\"eruda-requests\">\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.requests : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul>\r\n";
},"useData":true});

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(14);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Tool2 = __webpack_require__(9);

var _Tool3 = _interopRequireDefault(_Tool2);

var _CssStore = __webpack_require__(173);

var _CssStore2 = _interopRequireDefault(_CssStore);

var _stringify = __webpack_require__(72);

var _stringify2 = _interopRequireDefault(_stringify);

var _Highlight = __webpack_require__(174);

var _Highlight2 = _interopRequireDefault(_Highlight);

var _Select = __webpack_require__(177);

var _Select2 = _interopRequireDefault(_Select);

var _Settings = __webpack_require__(13);

var _Settings2 = _interopRequireDefault(_Settings);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Elements = function (_Tool) {
    (0, _inherits3.default)(Elements, _Tool);

    function Elements() {
        (0, _classCallCheck3.default)(this, Elements);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Elements.__proto__ || (0, _getPrototypeOf2.default)(Elements)).call(this));

        _this._style = (0, _util.evalCss)(__webpack_require__(178));

        _this.name = 'elements';
        _this._tpl = __webpack_require__(179);
        _this._rmDefComputedStyle = true;
        _this._highlightElement = false;
        _this._selectElement = false;
        _this._observeElement = true;
        return _this;
    }

    (0, _createClass3.default)(Elements, [{
        key: 'init',
        value: function init($el, container) {
            (0, _get3.default)(Elements.prototype.__proto__ || (0, _getPrototypeOf2.default)(Elements.prototype), 'init', this).call(this, $el);

            this._container = container;

            $el.html('<div class="eruda-show-area"></div>');
            this._$showArea = $el.find('.eruda-show-area');
            $el.append(__webpack_require__(180)());

            this._htmlEl = document.documentElement;
            this._highlight = new _Highlight2.default(this._container.$container);
            this._select = new _Select2.default();
            this._bindEvent();
            this._initObserver();
            this._initCfg();
        }
    }, {
        key: 'show',
        value: function show() {
            (0, _get3.default)(Elements.prototype.__proto__ || (0, _getPrototypeOf2.default)(Elements.prototype), 'show', this).call(this);

            if (this._observeElement) this._enableObserver();
            if (!this._curEl) this._setEl(this._htmlEl);
            this._render();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this._disableObserver();

            return (0, _get3.default)(Elements.prototype.__proto__ || (0, _getPrototypeOf2.default)(Elements.prototype), 'hide', this).call(this);
        }
    }, {
        key: 'set',
        value: function set(e) {
            this._setEl(e);
            this.scrollToTop();
            this._render();

            return this;
        }
    }, {
        key: 'overrideEventTarget',
        value: function overrideEventTarget() {
            var winEventProto = getWinEventProto();

            var origAddEvent = this._origAddEvent = winEventProto.addEventListener,
                origRmEvent = this._origRmEvent = winEventProto.removeEventListener;

            winEventProto.addEventListener = function (type, listener, useCapture) {
                addEvent(this, type, listener, useCapture);
                origAddEvent.apply(this, arguments);
            };

            winEventProto.removeEventListener = function (type, listener, useCapture) {
                rmEvent(this, type, listener, useCapture);
                origRmEvent.apply(this, arguments);
            };
        }
    }, {
        key: 'scrollToTop',
        value: function scrollToTop() {
            var el = this._$showArea.get(0);

            el.scrollTop = 0;
        }
    }, {
        key: 'restoreEventTarget',
        value: function restoreEventTarget() {
            var winEventProto = getWinEventProto();

            if (this._origAddEvent) winEventProto.addEventListener = this._origAddEvent;
            if (this._origRmEvent) winEventProto.removeEventListener = this._origRmEvent;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            (0, _get3.default)(Elements.prototype.__proto__ || (0, _getPrototypeOf2.default)(Elements.prototype), 'destroy', this).call(this);

            _util.evalCss.remove(this._style);
            this._select.disable();
            this._highlight.destroy();
            this._disableObserver();
            this.restoreEventTarget();
        }
    }, {
        key: '_back',
        value: function _back() {
            if (this._curEl === this._htmlEl) return;

            var parentQueue = this._curParentQueue,
                parent = parentQueue.shift();

            while (!isElExist(parent)) {
                parent = parentQueue.shift();
            }this.set(parent);
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var _this2 = this;

            var self = this,
                container = this._container,
                select = this._select;

            this._$el.on('click', '.eruda-child', function () {
                var idx = (0, _util.$)(this).data('idx'),
                    curEl = self._curEl,
                    el = curEl.childNodes[idx];

                if (el && el.nodeType === 3) {
                    var curTagName = curEl.tagName,
                        type = void 0;

                    switch (curTagName) {
                        case 'SCRIPT':
                            type = 'js';break;
                        case 'STYLE':
                            type = 'css';break;
                        default:
                            return;
                    }

                    var sources = container.get('sources');

                    if (sources) {
                        sources.set(type, el.nodeValue);
                        container.showTool('sources');
                    }

                    return;
                }

                !isElExist(el) ? self._render() : self.set(el);
            }).on('click', '.eruda-listener-content', function () {
                var text = (0, _util.$)(this).text(),
                    sources = container.get('sources');

                if (sources) {
                    sources.set('js', text);
                    container.showTool('sources');
                }
            }).on('click', '.eruda-breadcrumb', function () {
                var data = _this2._elData || JSON.parse((0, _stringify2.default)(_this2._curEl, { getterVal: true })),
                    sources = container.get('sources');

                _this2._elData = data;

                if (sources) {
                    sources.set('json', data);
                    container.showTool('sources');
                }
            }).on('click', '.eruda-parent', function () {
                var idx = (0, _util.$)(this).data('idx'),
                    curEl = self._curEl,
                    el = curEl.parentNode;

                while (idx-- && el.parentNode) {
                    el = el.parentNode;
                }!isElExist(el) ? self._render() : self.set(el);
            }).on('click', '.eruda-toggle-all-computed-style', function () {
                return _this2._toggleAllComputedStyle();
            });

            var $bottomBar = this._$el.find('.eruda-bottom-bar');

            $bottomBar.on('click', '.eruda-refresh', function () {
                return _this2._render();
            }).on('click', '.eruda-highlight', function () {
                return _this2._toggleHighlight();
            }).on('click', '.eruda-select', function () {
                return _this2._toggleSelect();
            }).on('click', '.eruda-reset', function () {
                return _this2.set(_this2._htmlEl);
            });

            select.on('select', function (target) {
                return _this2.set(target);
            });
        }
    }, {
        key: '_toggleAllComputedStyle',
        value: function _toggleAllComputedStyle() {
            this._rmDefComputedStyle = !this._rmDefComputedStyle;

            this._render();
        }
    }, {
        key: '_enableObserver',
        value: function _enableObserver() {
            this._observer.observe(this._htmlEl, {
                attributes: true,
                childList: true,
                subtree: true
            });
        }
    }, {
        key: '_disableObserver',
        value: function _disableObserver() {
            this._observer.disconnect();
        }
    }, {
        key: '_toggleHighlight',
        value: function _toggleHighlight() {
            if (this._selectElement) return;

            this._$el.find('.eruda-highlight').toggleClass('eruda-active');
            this._highlightElement = !this._highlightElement;

            this._render();
        }
    }, {
        key: '_toggleSelect',
        value: function _toggleSelect() {
            var select = this._select;

            this._$el.find('.eruda-select').toggleClass('eruda-active');
            if (!this._selectElement && !this._highlightElement) this._toggleHighlight();
            this._selectElement = !this._selectElement;

            if (this._selectElement) {
                select.enable();
                this._container.hide();
            } else {
                select.disable();
            }
        }
    }, {
        key: '_setEl',
        value: function _setEl(el) {
            this._curEl = el;
            this._elData = null;
            this._curCssStore = new _CssStore2.default(el);
            this._highlight.setEl(el);
            this._rmDefComputedStyle = true;

            var parentQueue = [];

            var parent = el.parentNode;
            while (parent) {
                parentQueue.push(parent);
                parent = parent.parentNode;
            }
            this._curParentQueue = parentQueue;
        }
    }, {
        key: '_getData',
        value: function _getData() {
            var ret = {};

            var el = this._curEl,
                cssStore = this._curCssStore;

            var className = el.className,
                id = el.id,
                attributes = el.attributes,
                tagName = el.tagName;


            ret.parents = getParents(el);
            ret.children = formatChildNodes(el.childNodes);
            ret.attributes = formatAttr(attributes);
            ret.name = formatElName({ tagName: tagName, id: id, className: className, attributes: attributes });

            var events = el.erudaEvents;
            if (events && (0, _util.keys)(events).length !== 0) ret.listeners = events;

            if (needNoStyle(tagName)) return ret;

            var computedStyle = cssStore.getComputedStyle();
            if (this._rmDefComputedStyle) computedStyle = rmDefComputedStyle(computedStyle);
            ret.rmDefComputedStyle = this._rmDefComputedStyle;
            processStyleRules(computedStyle);
            ret.computedStyle = computedStyle;

            var styles = cssStore.getMatchedCSSRules();
            styles.unshift(getInlineStyle(el.style));
            styles.forEach(function (style) {
                return processStyleRules(style.style);
            });
            ret.styles = styles;

            return ret;
        }
    }, {
        key: '_render',
        value: function _render() {
            if (!isElExist(this._curEl)) return this._back();

            this._highlight[this._highlightElement ? 'show' : 'hide']();
            this._renderHtml(this._tpl(this._getData()));
        }
    }, {
        key: '_renderHtml',
        value: function _renderHtml(html) {
            if (html === this._lastHtml) return;
            this._lastHtml = html;
            this._$showArea.html(html);
        }
    }, {
        key: '_initObserver',
        value: function _initObserver() {
            var _this3 = this;

            this._observer = new _util.SafeMutationObserver(function (mutations) {
                (0, _util.each)(mutations, function (mutation) {
                    return _this3._handleMutation(mutation);
                });
            });
        }
    }, {
        key: '_handleMutation',
        value: function _handleMutation(mutation) {
            var i = void 0,
                len = void 0,
                node = void 0;

            if ((0, _util.isErudaEl)(mutation.target)) return;

            if (mutation.type === 'attributes') {
                if (mutation.target !== this._curEl) return;
                this._render();
            } else if (mutation.type === 'childList') {
                if (mutation.target === this._curEl) return this._render();

                var addedNodes = mutation.addedNodes;

                for (i = 0, len = addedNodes.length; i < len; i++) {
                    node = addedNodes[i];

                    if (node.parentNode === this._curEl) return this._render();
                }

                var removedNodes = mutation.removedNodes;

                for (i = 0, len = removedNodes.length; i < len; i++) {
                    if (removedNodes[i] === this._curEl) return this.set(this._htmlEl);
                }
            }
        }
    }, {
        key: '_initCfg',
        value: function _initCfg() {
            var _this4 = this;

            var cfg = this.config = _Settings2.default.createCfg('elements', {
                overrideEventTarget: true,
                observeElement: true
            });

            if (cfg.get('overrideEventTarget')) this.overrideEventTarget();
            if (cfg.get('observeElement')) this._observeElement = false;

            cfg.on('change', function (key, val) {
                switch (key) {
                    case 'overrideEventTarget':
                        return val ? _this4.overrideEventTarget() : _this4.restoreEventTarget();
                    case 'observeElement':
                        _this4._observeElement = val;
                        return val ? _this4._enableObserver() : _this4._disableObserver();
                }
            });

            var settings = this._container.get('settings');
            settings.text('Elements').switch(cfg, 'overrideEventTarget', 'Catch Event Listeners');

            if (this._observer) settings.switch(cfg, 'observeElement', 'Auto Refresh');

            settings.separator();
        }
    }]);
    return Elements;
}(_Tool3.default);

exports.default = Elements;


function processStyleRules(style) {
    (0, _util.each)(style, function (val, key) {
        return style[key] = processStyleRule(val);
    });
}

var regColor = /rgba?\((.*?)\)/g,
    regCssUrl = /url\("?(.*?)"?\)/g;

function processStyleRule(val) {
    // For css custom properties, val is unable to retrieved.
    val = (0, _util.toStr)(val);

    return val.replace(regColor, '<span class="eruda-style-color" style="background-color: $&"></span>$&').replace(regCssUrl, function (match, url) {
        return 'url("' + wrapLink(url) + '")';
    });
}

var isElExist = function isElExist(val) {
    return (0, _util.isEl)(val) && val.parentNode;
};

function formatElName(data) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$noAttr = _ref.noAttr,
        noAttr = _ref$noAttr === undefined ? false : _ref$noAttr;

    var id = data.id,
        className = data.className,
        attributes = data.attributes;


    var ret = '<span class="eruda-blue">' + data.tagName.toLowerCase() + '</span>';

    if (id !== '') ret += '#' + id;

    if ((0, _util.isStr)(className)) {
        (0, _util.each)(className.split(/\s+/g), function (val) {
            if (val.trim() === '') return;
            ret += '.' + val;
        });
    }

    if (!noAttr) {
        (0, _util.each)(attributes, function (attr) {
            var name = attr.name;
            if (name === 'id' || name === 'class' || name === 'style') return;
            ret += ' ' + name + '="' + attr.value + '"';
        });
    }

    return ret;
}

var formatAttr = function formatAttr(attributes) {
    return (0, _util.map)(attributes, function (attr) {
        var name = attr.name,
            value = attr.value;

        value = (0, _util.escape)(value);

        var isLink = (name === 'src' || name === 'href') && !(0, _util.startWith)(value, 'data');
        if (isLink) value = wrapLink(value);
        if (name === 'style') value = processStyleRule(value);

        return { name: name, value: value };
    });
};

function formatChildNodes(nodes) {
    var ret = [];

    for (var i = 0, len = nodes.length; i < len; i++) {
        var child = nodes[i],
            nodeType = child.nodeType;

        if (nodeType === 3 || nodeType === 8) {
            var val = child.nodeValue.trim();
            if (val !== '') ret.push({
                text: val,
                isCmt: nodeType === 8,
                idx: i
            });
            continue;
        }

        var isSvg = !(0, _util.isStr)(child.className);

        if (nodeType === 1 && child.id !== 'eruda' && (isSvg || child.className.indexOf('eruda') < 0)) {
            ret.push({
                text: formatElName(child),
                isEl: true,
                idx: i
            });
        }
    }

    return ret;
}

function getParents(el) {
    var ret = [],
        i = 0,
        parent = el.parentNode;

    while (parent && parent.nodeType === 1) {
        ret.push({
            text: formatElName(parent, { noAttr: true }),
            idx: i++
        });

        parent = parent.parentNode;
    }

    return ret.reverse();
}

function getInlineStyle(style) {
    var ret = {
        selectorText: 'element.style',
        style: {}
    };

    for (var i = 0, len = style.length; i < len; i++) {
        var s = style[i];

        ret.style[s] = style[s];
    }

    return ret;
}

var defComputedStyle = __webpack_require__(181);

function rmDefComputedStyle(computedStyle) {
    var ret = {};

    (0, _util.each)(computedStyle, function (val, key) {
        if (val === defComputedStyle[key]) return;

        ret[key] = val;
    });

    return ret;
}

var NO_STYLE_TAG = ['script', 'style', 'meta', 'title', 'link', 'head'];

var needNoStyle = function needNoStyle(tagName) {
    return NO_STYLE_TAG.indexOf(tagName.toLowerCase()) > -1;
};

function addEvent(el, type, listener) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (!(0, _util.isEl)(el) || !(0, _util.isFn)(listener) || !(0, _util.isBool)(useCapture)) return;

    var events = el.erudaEvents = el.erudaEvents || {};

    events[type] = events[type] || [];
    events[type].push({
        listener: listener,
        listenerStr: listener.toString(),
        useCapture: useCapture
    });
}

function rmEvent(el, type, listener) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (!(0, _util.isEl)(el) || !(0, _util.isFn)(listener) || !(0, _util.isBool)(useCapture)) return;

    var events = el.erudaEvents;

    if (!(events && events[type])) return;

    var listeners = events[type];

    for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i].listener === listener) {
            listeners.splice(i, 1);
            break;
        }
    }

    if (listeners.length === 0) delete events[type];
    if ((0, _util.keys)(events).length === 0) delete el.erudaEvents;
}

var getWinEventProto = function getWinEventProto() {
    return (0, _util.safeGet)(window, 'EventTarget.prototype') || window.Node.prototype;
};

var wrapLink = function wrapLink(link) {
    return '<a href="' + link + '" target="_blank">' + link + '</a>';
};

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatStyle(style) {
    var ret = {};

    for (var i = 0, len = style.length; i < len; i++) {
        var name = style[i];

        if (style[name] === 'initial') continue;

        ret[name] = style[name];
    }

    return ret;
}

var elProto = Element.prototype;

var matchesSel = function matchesSel() {
    return false;
};

if (elProto.webkitMatchesSelector) {
    matchesSel = function matchesSel(el, selText) {
        return el.webkitMatchesSelector(selText);
    };
} else if (elProto.mozMatchesSelector) {
    matchesSel = function matchesSel(el, selText) {
        return el.mozMatchesSelector(selText);
    };
}

var CssStore = function () {
    function CssStore(el) {
        (0, _classCallCheck3.default)(this, CssStore);

        this._el = el;
    }

    (0, _createClass3.default)(CssStore, [{
        key: 'getComputedStyle',
        value: function getComputedStyle() {
            var computedStyle = window.getComputedStyle(this._el);

            return formatStyle(computedStyle);
        }
    }, {
        key: 'getMatchedCSSRules',
        value: function getMatchedCSSRules() {
            var _this = this;

            var ret = [];

            (0, _util.each)(document.styleSheets, function (styleSheet) {
                if (!styleSheet.cssRules) return;

                (0, _util.each)(styleSheet.cssRules, function (cssRule) {
                    var matchesEl = false;

                    // Mobile safari will throw DOM Exception 12 error, need to try catch it.
                    try {
                        matchesEl = _this._elMatchesSel(cssRule.selectorText);
                        /* eslint-disable no-empty */
                    } catch (e) {}

                    if (!matchesEl) return;

                    ret.push({
                        selectorText: cssRule.selectorText,
                        style: formatStyle(cssRule.style)
                    });
                });
            });

            return ret;
        }
    }, {
        key: '_elMatchesSel',
        value: function _elMatchesSel(selText) {
            return matchesSel(this._el, selText);
        }
    }]);
    return CssStore;
}();

exports.default = CssStore;

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Highlight = function () {
    function Highlight($container) {
        (0, _classCallCheck3.default)(this, Highlight);

        this._style = (0, _util.evalCss)(__webpack_require__(175));

        this._isShow = false;

        this._appendTpl($container);
        this._bindEvent();
    }

    (0, _createClass3.default)(Highlight, [{
        key: 'setEl',
        value: function setEl(el) {
            this._$target = (0, _util.$)(el);
            this._target = el;
        }
    }, {
        key: 'show',
        value: function show() {
            this._isShow = true;
            this.render();
            this._$el.show();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            _util.evalCss.remove(this._style);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this._isShow = false;
            this._$el.hide();
        }
    }, {
        key: 'render',
        value: function render() {
            var _$target$offset = this._$target.offset(),
                left = _$target$offset.left,
                width = _$target$offset.width,
                top = _$target$offset.top,
                height = _$target$offset.height;

            this._$el.css({ left: left, top: top - window.scrollY, width: width, height: height });

            var computedStyle = getComputedStyle(this._target, '');

            var getNumStyle = function getNumStyle(name) {
                return (0, _util.pxToNum)(computedStyle.getPropertyValue(name));
            };

            var ml = getNumStyle('margin-left'),
                mr = getNumStyle('margin-right'),
                mt = getNumStyle('margin-top'),
                mb = getNumStyle('margin-bottom');

            this._$margin.css({
                left: -ml,
                top: -mt,
                width: width + ml + mr,
                height: height + mt + mb
            });

            var bl = getNumStyle('border-left-width'),
                br = getNumStyle('border-right-width'),
                bt = getNumStyle('border-top-width'),
                bb = getNumStyle('border-bottom-width');

            var bw = width - bl - br,
                bh = height - bt - bb;

            this._$padding.css({
                left: bl,
                top: bt,
                width: bw,
                height: bh
            });

            var pl = getNumStyle('padding-left'),
                pr = getNumStyle('padding-right'),
                pt = getNumStyle('padding-top'),
                pb = getNumStyle('padding-bottom');

            this._$content.css({
                left: bl + pl,
                top: bl + pt,
                width: bw - pl - pr,
                height: bh - pt - pb
            });

            this._$size.css({
                top: -mt - (top - mt < 25 ? 0 : 25),
                left: -ml
            }).html(formatElName(this._target) + ' | ' + width + ' \xD7 ' + height);
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var _this = this;

            window.addEventListener('scroll', function () {
                if (!_this._isShow) return;
                _this.render();
            }, false);
        }
    }, {
        key: '_appendTpl',
        value: function _appendTpl($container) {
            $container.append(__webpack_require__(176)());

            var $el = this._$el = (0, _util.$)('.eruda-elements-highlight');
            this._$margin = $el.find('.eruda-margin');
            this._$padding = $el.find('.eruda-padding');
            this._$content = $el.find('.eruda-content');
            this._$size = $el.find('.eruda-size');
        }
    }]);
    return Highlight;
}();

exports.default = Highlight;


function formatElName(el) {
    var id = el.id,
        className = el.className;


    var ret = '<span style="color:#ee78e6">' + el.tagName.toLowerCase() + '</span>';

    if (id !== '') ret += '<span style="color:#ffab66">#' + id + '</span>';

    var classes = '';
    if ((0, _util.isStr)(className)) {
        (0, _util.each)(className.split(/\s+/g), function (val) {
            if ((0, _util.trim)(val) === '') return;

            classes += '.' + val;
        });
    }

    ret += '<span style="color:#8ed3fb">' + classes + '</span>';

    return ret;
}

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-elements-highlight {\n  display: none;\n  position: absolute;\n  left: 0;\n  right: 0;\n  z-index: -100;\n  pointer-events: none !important; }\n  .eruda-elements-highlight * {\n    pointer-events: none !important; }\n  .eruda-elements-highlight .eruda-indicator {\n    opacity: .5;\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 100%;\n    height: 100%; }\n  .eruda-elements-highlight .eruda-margin {\n    position: absolute;\n    background: #e8925b;\n    z-index: 100; }\n  .eruda-elements-highlight .eruda-border {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background: #ffcd7c;\n    z-index: 200; }\n  .eruda-elements-highlight .eruda-padding {\n    position: absolute;\n    background: #86af76;\n    z-index: 300; }\n  .eruda-elements-highlight .eruda-content {\n    position: absolute;\n    background: #5e88c1;\n    z-index: 400; }\n  .eruda-elements-highlight .eruda-size {\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: #333740;\n    color: #d9d9d9;\n    font-size: 12px;\n    height: 25px;\n    line-height: 25px;\n    text-align: center;\n    padding: 0 5px;\n    white-space: nowrap;\n    overflow-x: hidden; }\n", ""]);

// exports


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"eruda-elements-highlight\">\r\n    <div class=\"eruda-indicator\">\r\n        <div class=\"eruda-margin\"></div>\r\n        <div class=\"eruda-border\"></div>\r\n        <div class=\"eruda-padding\"></div>\r\n        <div class=\"eruda-content\"></div>\r\n    </div>\r\n    <div class=\"eruda-size\"></div>\r\n</div>";
},"useData":true});

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function (_Emitter) {
    (0, _inherits3.default)(Select, _Emitter);

    function Select() {
        (0, _classCallCheck3.default)(this, Select);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this));

        var self = _this;

        _this._startListener = function (e) {
            if ((0, _util.isErudaEl)(e.target)) return;

            self._timer = setTimeout(function () {
                self.emit('select', e.target);
            }, 200);

            return false;
        };

        _this._moveListener = function () {
            clearTimeout(self._timer);
        };

        _this._clickListener = function (e) {
            if ((0, _util.isErudaEl)(e.target)) return;

            e.preventDefault();
            e.stopImmediatePropagation();
        };
        return _this;
    }

    (0, _createClass3.default)(Select, [{
        key: 'enable',
        value: function enable() {
            this.disable();
            function addEvent(type, listener) {
                document.body.addEventListener(type, listener, true);
            }
            addEvent('touchstart', this._startListener);
            addEvent('touchmove', this._moveListener);
            addEvent('click', this._clickListener);

            return this;
        }
    }, {
        key: 'disable',
        value: function disable() {
            function rmEvent(type, listener) {
                document.body.removeEventListener(type, listener, true);
            }
            rmEvent('touchstart', this._startListener);
            rmEvent('touchmove', this._moveListener);
            rmEvent('click', this._clickListener);

            return this;
        }
    }]);
    return Select;
}(_util.Emitter);

exports.default = Select;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools .eruda-tools .eruda-elements {\n  padding-bottom: 40px;\n  font-size: 14px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-show-area {\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n    height: 100%; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-parents {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    background: #fff;\n    padding: 10px;\n    white-space: nowrap;\n    border-bottom: 1px solid #eceffe;\n    cursor: pointer;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-parents li {\n      display: inline-block; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-parents li .eruda-parent {\n        display: inline-block; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-parents li:last-child {\n        margin-right: 0; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-parents .eruda-icon-chevron-right {\n      font-size: 8px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-breadcrumb {\n    background: #fff;\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n    margin-bottom: 10px;\n    word-break: break-all;\n    padding: 10px;\n    font-size: 16px;\n    min-height: 40px;\n    border-bottom: 1px solid #eceffe;\n    cursor: pointer;\n    -webkit-transition: background 0.3s, color 0.3s;\n    transition: background 0.3s, color 0.3s; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-breadcrumb:active {\n      background: #2196f3;\n      color: #fff; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-breadcrumb:active span {\n        color: #fff; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-section {\n    margin-bottom: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-section h2 {\n      background: #2196f3;\n      padding: 10px;\n      color: #fff;\n      font-size: 14px;\n      -webkit-transition: background 0.3s;\n      transition: background 0.3s; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-section h2 .eruda-btn {\n        margin-left: 10px;\n        float: right;\n        text-align: center;\n        width: 18px;\n        height: 18px;\n        line-height: 18px;\n        font-size: 12px; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-section h2.eruda-active-effect {\n        cursor: pointer; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-section h2.eruda-active-effect:active {\n        background: #1565c0; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children {\n    background: #fff;\n    margin-bottom: 10px !important;\n    border-bottom: 1px solid #eceffe; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children li {\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch;\n      cursor: default;\n      padding: 10px;\n      border-top: 1px solid #eceffe;\n      white-space: nowrap;\n      -webkit-transition: background 0.3s, color 0.3s;\n      transition: background 0.3s, color 0.3s; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children li span {\n        -webkit-transition: color 0.3s;\n        transition: color 0.3s; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children li.eruda-active-effect {\n        cursor: pointer; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children li.eruda-active-effect:active {\n        background: #2196f3;\n        color: #fff; }\n        .eruda-dev-tools .eruda-tools .eruda-elements .eruda-children li.eruda-active-effect:active span {\n          color: #fff; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-attributes {\n    background: #fff;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-attributes a {\n      color: #2196f3; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-attributes .eruda-table-wrapper {\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-attributes table td {\n      padding: 5px 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-text-content {\n    background: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-text-content .eruda-content {\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch;\n      padding: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-style-color {\n    width: 7px;\n    height: 7px;\n    margin-right: 2px;\n    border: 1px solid #263238;\n    display: inline-block; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style {\n    background: #fff;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style a {\n      color: #2196f3; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style .eruda-table-wrapper {\n      overflow-y: auto;\n      -webkit-overflow-scrolling: touch;\n      max-height: 200px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style table td {\n      padding: 5px 10px; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-computed-style table td.eruda-key {\n        white-space: nowrap;\n        color: #f44336; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles {\n    background: #fff;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper {\n      padding: 10px; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules {\n        border-radius: 4px;\n        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n        padding: 10px;\n        background: #fff;\n        margin-bottom: 10px; }\n        .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules .eruda-rule {\n          padding-left: 2em;\n          word-break: break-all; }\n          .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules .eruda-rule a {\n            color: #2196f3; }\n          .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules .eruda-rule span {\n            color: #f44336; }\n        .eruda-dev-tools .eruda-tools .eruda-elements .eruda-styles .eruda-style-wrapper .eruda-style-rules:last-child {\n          margin-bottom: 0; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-listeners {\n    background: #fff;\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-listeners .eruda-listener-wrapper {\n      padding: 10px; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-listeners .eruda-listener-wrapper .eruda-listener {\n        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n        margin-bottom: 10px;\n        background: #fff;\n        border-radius: 4px;\n        overflow: hidden; }\n        .eruda-dev-tools .eruda-tools .eruda-elements .eruda-listeners .eruda-listener-wrapper .eruda-listener .eruda-listener-type {\n          padding: 10px;\n          background: #2196f3;\n          color: #fff; }\n        .eruda-dev-tools .eruda-tools .eruda-elements .eruda-listeners .eruda-listener-wrapper .eruda-listener .eruda-listener-content li {\n          overflow-x: auto;\n          -webkit-overflow-scrolling: touch;\n          padding: 10px;\n          border-top: none; }\n          .eruda-dev-tools .eruda-tools .eruda-elements .eruda-listeners .eruda-listener-wrapper .eruda-listener .eruda-listener-content li.eruda-capture {\n            background: #eceffe; }\n  .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar {\n    height: 40px;\n    background: #fff;\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    font-size: 0;\n    border-top: 1px solid #eceffe; }\n    .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar .eruda-btn {\n      cursor: pointer;\n      text-align: center;\n      color: #707d8b;\n      font-size: 14px;\n      line-height: 40px;\n      width: 25%;\n      display: inline-block;\n      -webkit-transition: background 0.3s, color 0.3s;\n      transition: background 0.3s, color 0.3s; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar .eruda-btn:active {\n        background: #2196f3;\n        color: #fff; }\n      .eruda-dev-tools .eruda-tools .eruda-elements .eruda-bottom-bar .eruda-btn.eruda-active {\n        color: #2196f3; }\n", ""]);

// exports


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <ul class=\"eruda-parents\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.parents : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "            <li>\r\n                <div class=\"eruda-parent\" data-idx=\""
    + container.escapeExpression(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n                <span class=\"eruda-icon-chevron-right\"></span>\r\n            </li>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <ul class=\"eruda-children\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.children : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "            <li class=\"eruda-child "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isCmt : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isEl : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-idx=\""
    + container.escapeExpression(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idx","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</li>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "eruda-green";
},"8":function(container,depth0,helpers,partials,data) {
    return "eruda-active-effect";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.attributes : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "                    <tr>\r\n                        <td>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\r\n                        <td>"
    + ((stack1 = ((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\r\n                    </tr>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "                <tr>\r\n                    <td>Empty</td>\r\n                </tr>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"eruda-computed-style eruda-section\">\r\n        <h2 class=\"eruda-toggle-all-computed-style eruda-active-effect\">Computed Style\r\n            <div class=\"eruda-btn\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.rmDefComputedStyle : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data})) != null ? stack1 : "")
    + "            </div>\r\n        </h2>\r\n        <div class=\"eruda-table-wrapper\">\r\n            <table>\r\n                <tbody>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.computedStyle : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "                    <span class=\"eruda-icon-compress\"></span>\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "                    <span class=\"eruda-icon-expand\"></span>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                    <tr>\r\n                        <td class=\"eruda-key\">"
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + "</td>\r\n                        <td>"
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</td>\r\n                    </tr>\r\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"eruda-styles eruda-section\">\r\n        <h2>Styles</h2>\r\n        <div class=\"eruda-style-wrapper\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.styles : depth0),{"name":"each","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                <div class=\"eruda-style-rules\">\r\n                    <div>"
    + container.escapeExpression(((helper = (helper = helpers.selectorText || (depth0 != null ? depth0.selectorText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"selectorText","hash":{},"data":data}) : helper)))
    + " {</div>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.style : depth0),{"name":"each","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    <div>}</div>\r\n                </div>\r\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                        <div class=\"eruda-rule\">\r\n                            <span>"
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + "</span>: "
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + ";\r\n                        </div>\r\n";
},"26":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"eruda-listeners eruda-section\">\r\n        <h2>Event Listeners</h2>\r\n        <div class=\"eruda-listener-wrapper\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.listeners : depth0),{"name":"each","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "               <div class=\"eruda-listener\">\r\n                   <div class=\"eruda-listener-type\">"
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</div>\r\n                   <ul class=\"eruda-listener-content\">\r\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                   </ul>\r\n               </div>\r\n";
},"28":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                           <li class=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.useCapture : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + container.escapeExpression(((helper = (helper = helpers.listenerStr || (depth0 != null ? depth0.listenerStr : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"listenerStr","hash":{},"data":data}) : helper)))
    + "</li>\r\n";
},"29":function(container,depth0,helpers,partials,data) {
    return "eruda-capture";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.parents : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"eruda-breadcrumb\">\r\n    "
    + ((stack1 = ((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n</div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.children : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"eruda-attributes eruda-section\">\r\n    <h2>Attributes</h2>\r\n    <div class=\"eruda-table-wrapper\">\r\n        <table>\r\n            <tbody>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.attributes : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.computedStyle : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.styles : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.listeners : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"eruda-bottom-bar\">\r\n    <div class=\"eruda-btn eruda-select\">\r\n        <span class=\"eruda-icon eruda-icon-hand-pointer-o\"></span>\r\n    </div>\r\n    <div class=\"eruda-btn eruda-refresh\">\r\n        <span class=\"eruda-icon eruda-icon-repeat\"></span>\r\n    </div>\r\n    <div class=\"eruda-btn eruda-highlight\">\r\n        <span class=\"eruda-icon eruda-icon-eye\"></span>\r\n    </div>\r\n    <div class=\"eruda-btn eruda-reset\">\r\n        <span class=\"eruda-icon eruda-icon-rotate-left\"></span>\r\n    </div>\r\n</div>";
},"useData":true});

/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports = {"align-content":"stretch","align-items":"stretch","align-self":"start","alignment-baseline":"auto","all":"","animation":"none 0s ease 0s 1 normal none running","animation-delay":"0s","animation-direction":"normal","animation-duration":"0s","animation-fill-mode":"none","animation-iteration-count":"1","animation-name":"none","animation-play-state":"running","animation-timing-function":"ease","backface-visibility":"visible","background":"rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box","background-attachment":"scroll","background-blend-mode":"normal","background-clip":"border-box","background-color":"rgba(0, 0, 0, 0)","background-image":"none","background-origin":"padding-box","background-position":"0% 0%","background-position-x":"0%","background-position-y":"0%","background-repeat":"repeat","background-repeat-x":"","background-repeat-y":"","background-size":"auto","baseline-shift":"0px","border":"0px none rgb(0, 0, 0)","border-bottom":"0px none rgb(0, 0, 0)","border-bottom-color":"rgb(0, 0, 0)","border-bottom-left-radius":"0px","border-bottom-right-radius":"0px","border-bottom-style":"none","border-bottom-width":"0px","border-collapse":"separate","border-color":"rgb(0, 0, 0)","border-image":"none","border-image-outset":"0px","border-image-repeat":"stretch","border-image-slice":"100%","border-image-source":"none","border-image-width":"1","border-left":"0px none rgb(0, 0, 0)","border-left-color":"rgb(0, 0, 0)","border-left-style":"none","border-left-width":"0px","border-radius":"0px","border-right":"0px none rgb(0, 0, 0)","border-right-color":"rgb(0, 0, 0)","border-right-style":"none","border-right-width":"0px","border-spacing":"0px 0px","border-style":"none","border-top":"0px none rgb(0, 0, 0)","border-top-color":"rgb(0, 0, 0)","border-top-left-radius":"0px","border-top-right-radius":"0px","border-top-style":"none","border-top-width":"0px","border-width":"0px","bottom":"auto","box-shadow":"none","box-sizing":"content-box","buffered-rendering":"auto","caption-side":"top","clear":"none","clip":"auto","clip-path":"none","clip-rule":"nonzero","color":"rgb(0, 0, 0)","color-interpolation":"sRGB","color-interpolation-filters":"linearRGB","color-rendering":"auto","content":"","counter-increment":"none","counter-reset":"none","cursor":"auto","cx":"0px","cy":"0px","direction":"ltr","display":"block","dominant-baseline":"auto","empty-cells":"show","fill":"rgb(0, 0, 0)","fill-opacity":"1","fill-rule":"nonzero","filter":"none","flex":"0 1 auto","flex-basis":"auto","flex-direction":"row","flex-flow":"row nowrap","flex-grow":"0","flex-shrink":"1","flex-wrap":"nowrap","float":"none","flood-color":"rgb(0, 0, 0)","flood-opacity":"1","font":"normal normal normal normal 16px / normal simsun","font-family":"Simsun","font-feature-settings":"normal","font-kerning":"auto","font-size":"16px","font-stretch":"normal","font-style":"normal","font-variant":"normal","font-variant-ligatures":"normal","font-weight":"normal","image-rendering":"auto","isolation":"auto","justify-content":"flex-start","left":"auto","letter-spacing":"normal","lighting-color":"rgb(255, 255, 255)","line-height":"normal","list-style":"disc outside none","list-style-image":"none","list-style-position":"outside","list-style-type":"disc","margin":"0px","margin-bottom":"0px","margin-left":"0px","margin-right":"0px","margin-top":"0px","marker":"","marker-end":"none","marker-mid":"none","marker-start":"none","mask":"none","mask-type":"luminance","max-height":"none","max-width":"none","max-zoom":"","min-height":"0px","min-width":"0px","min-zoom":"","mix-blend-mode":"normal","motion":"none 0px auto 0deg","motion-offset":"0px","motion-path":"none","motion-rotation":"auto 0deg","object-fit":"fill","object-position":"50% 50%","opacity":"1","order":"0","orientation":"","orphans":"auto","outline":"rgb(0, 0, 0) none 0px","outline-color":"rgb(0, 0, 0)","outline-offset":"0px","outline-style":"none","outline-width":"0px","overflow":"visible","overflow-wrap":"normal","overflow-x":"visible","overflow-y":"visible","padding":"0px","padding-bottom":"0px","padding-left":"0px","padding-right":"0px","padding-top":"0px","page":"","page-break-after":"auto","page-break-before":"auto","page-break-inside":"auto","paint-order":"fill stroke markers","perspective":"none","pointer-events":"auto","position":"static","quotes":"","r":"0px","resize":"none","right":"auto","rx":"0px","ry":"0px","shape-image-threshold":"0","shape-margin":"0px","shape-outside":"none","shape-rendering":"auto","size":"","speak":"normal","src":"","stop-color":"rgb(0, 0, 0)","stop-opacity":"1","stroke":"none","stroke-dasharray":"none","stroke-dashoffset":"0px","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-miterlimit":"4","stroke-opacity":"1","stroke-width":"1px","tab-size":"8","table-layout":"auto","text-align":"start","text-align-last":"auto","text-anchor":"start","text-combine-upright":"none","text-decoration":"none","text-indent":"0px","text-orientation":"mixed","text-overflow":"clip","text-rendering":"auto","text-shadow":"none","text-transform":"none","top":"auto","touch-action":"auto","transform":"none","transform-style":"flat","transition":"all 0s ease 0s","transition-delay":"0s","transition-duration":"0s","transition-property":"all","transition-timing-function":"ease","unicode-bidi":"normal","unicode-range":"","user-zoom":"","vector-effect":"none","vertical-align":"baseline","visibility":"visible","-webkit-app-region":"no-drag","-webkit-appearance":"none","-webkit-background-clip":"border-box","-webkit-background-composite":"source-over","-webkit-background-origin":"padding-box","-webkit-border-after":"0px none rgb(0, 0, 0)","-webkit-border-after-color":"rgb(0, 0, 0)","-webkit-border-after-style":"none","-webkit-border-after-width":"0px","-webkit-border-before":"0px none rgb(0, 0, 0)","-webkit-border-before-color":"rgb(0, 0, 0)","-webkit-border-before-style":"none","-webkit-border-before-width":"0px","-webkit-border-end":"0px none rgb(0, 0, 0)","-webkit-border-end-color":"rgb(0, 0, 0)","-webkit-border-end-style":"none","-webkit-border-end-width":"0px","-webkit-border-horizontal-spacing":"0px","-webkit-border-image":"none","-webkit-border-start":"0px none rgb(0, 0, 0)","-webkit-border-start-color":"rgb(0, 0, 0)","-webkit-border-start-style":"none","-webkit-border-start-width":"0px","-webkit-border-vertical-spacing":"0px","-webkit-box-align":"stretch","-webkit-box-decoration-break":"slice","-webkit-box-direction":"normal","-webkit-box-flex":"0","-webkit-box-flex-group":"1","-webkit-box-lines":"single","-webkit-box-ordinal-group":"1","-webkit-box-orient":"horizontal","-webkit-box-pack":"start","-webkit-box-reflect":"none","-webkit-clip-path":"none","-webkit-column-break-after":"auto","-webkit-column-break-before":"auto","-webkit-column-break-inside":"auto","-webkit-column-count":"auto","-webkit-column-gap":"normal","-webkit-column-rule":"0px none rgb(0, 0, 0)","-webkit-column-rule-color":"rgb(0, 0, 0)","-webkit-column-rule-style":"none","-webkit-column-rule-width":"0px","-webkit-column-span":"none","-webkit-column-width":"auto","-webkit-columns":"auto auto","-webkit-filter":"none","-webkit-font-size-delta":"","-webkit-font-smoothing":"auto","-webkit-highlight":"none","-webkit-hyphenate-character":"auto","-webkit-line-break":"auto","-webkit-line-clamp":"none","-webkit-locale":"auto","-webkit-logical-height":"8px","-webkit-logical-width":"980px","-webkit-margin-after":"0px","-webkit-margin-after-collapse":"collapse","-webkit-margin-before":"0px","-webkit-margin-before-collapse":"collapse","-webkit-margin-bottom-collapse":"collapse","-webkit-margin-collapse":"","-webkit-margin-end":"0px","-webkit-margin-start":"0px","-webkit-margin-top-collapse":"collapse","-webkit-mask":"","-webkit-mask-box-image":"none","-webkit-mask-box-image-outset":"0px","-webkit-mask-box-image-repeat":"stretch","-webkit-mask-box-image-slice":"0 fill","-webkit-mask-box-image-source":"none","-webkit-mask-box-image-width":"auto","-webkit-mask-clip":"border-box","-webkit-mask-composite":"source-over","-webkit-mask-image":"none","-webkit-mask-origin":"border-box","-webkit-mask-position":"0% 0%","-webkit-mask-position-x":"0%","-webkit-mask-position-y":"0%","-webkit-mask-repeat":"repeat","-webkit-mask-repeat-x":"","-webkit-mask-repeat-y":"","-webkit-mask-size":"auto","-webkit-max-logical-height":"none","-webkit-max-logical-width":"none","-webkit-min-logical-height":"0px","-webkit-min-logical-width":"0px","-webkit-padding-after":"0px","-webkit-padding-before":"0px","-webkit-padding-end":"0px","-webkit-padding-start":"0px","-webkit-perspective-origin-x":"","-webkit-perspective-origin-y":"","-webkit-print-color-adjust":"economy","-webkit-rtl-ordering":"logical","-webkit-ruby-position":"before","-webkit-tap-highlight-color":"rgba(0, 0, 0, 0.180392)","-webkit-text-combine":"none","-webkit-text-decorations-in-effect":"none","-webkit-text-emphasis":"","-webkit-text-emphasis-color":"rgb(0, 0, 0)","-webkit-text-emphasis-position":"over","-webkit-text-emphasis-style":"none","-webkit-text-fill-color":"rgb(0, 0, 0)","-webkit-text-orientation":"vertical-right","-webkit-text-security":"none","-webkit-text-stroke":"","-webkit-text-stroke-color":"rgb(0, 0, 0)","-webkit-text-stroke-width":"0px","-webkit-transform-origin-x":"","-webkit-transform-origin-y":"","-webkit-transform-origin-z":"","-webkit-user-drag":"auto","-webkit-user-modify":"read-only","-webkit-user-select":"text","-webkit-writing-mode":"horizontal-tb","white-space":"normal","widows":"1","will-change":"auto","word-break":"normal","word-spacing":"0px","word-wrap":"normal","writing-mode":"horizontal-tb","x":"0px","y":"0px","z-index":"0","zoom":"1"}

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(14);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Tool2 = __webpack_require__(9);

var _Tool3 = _interopRequireDefault(_Tool2);

var _defSnippets = __webpack_require__(183);

var _defSnippets2 = _interopRequireDefault(_defSnippets);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Snippets = function (_Tool) {
    (0, _inherits3.default)(Snippets, _Tool);

    function Snippets() {
        (0, _classCallCheck3.default)(this, Snippets);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Snippets.__proto__ || (0, _getPrototypeOf2.default)(Snippets)).call(this));

        _this._style = (0, _util.evalCss)(__webpack_require__(184));

        _this.name = 'snippets';

        _this._snippets = [];
        _this._tpl = __webpack_require__(185);
        return _this;
    }

    (0, _createClass3.default)(Snippets, [{
        key: 'init',
        value: function init($el) {
            (0, _get3.default)(Snippets.prototype.__proto__ || (0, _getPrototypeOf2.default)(Snippets.prototype), 'init', this).call(this, $el);

            this._bindEvent();
            this._addDefSnippets();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            (0, _get3.default)(Snippets.prototype.__proto__ || (0, _getPrototypeOf2.default)(Snippets.prototype), 'destroy', this).call(this);

            _util.evalCss.remove(this._style);
        }
    }, {
        key: 'add',
        value: function add(name, fn, desc) {
            this._snippets.push({ name: name, fn: fn, desc: desc });

            this._render();

            return this;
        }
    }, {
        key: 'remove',
        value: function remove(name) {
            var snippets = this._snippets;

            for (var i = 0, len = snippets.length; i < len; i++) {
                if (snippets[i].name === name) snippets.splice(i, 1);
            }

            this._render();

            return this;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this._snippets = [];
            this._render();

            return this;
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var self = this;

            this._$el.on('click', '.eruda-run', function I() {
                var idx = (0, _util.$)(this).data('idx');

                self._run(idx);
            });
        }
    }, {
        key: '_run',
        value: function _run(idx) {
            this._snippets[idx].fn.call(null);
        }
    }, {
        key: '_addDefSnippets',
        value: function _addDefSnippets() {
            var _this2 = this;

            (0, _util.each)(_defSnippets2.default, function (snippet) {
                _this2.add(snippet.name, snippet.fn, snippet.desc);
            });
        }
    }, {
        key: '_render',
        value: function _render() {
            this._renderHtml(this._tpl({
                snippets: this._snippets
            }));
        }
    }, {
        key: '_renderHtml',
        value: function _renderHtml(html) {
            if (html === this._lastHtml) return;
            this._lastHtml = html;
            this._$el.html(html);
        }
    }]);
    return Snippets;
}(_Tool3.default);

exports.default = Snippets;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(33);

var _stringify2 = _interopRequireDefault(_stringify);

var _logger = __webpack_require__(35);

var _logger2 = _interopRequireDefault(_logger);

var _emitter = __webpack_require__(26);

var _emitter2 = _interopRequireDefault(_emitter);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = null;

exports.default = [{
    name: 'Border All',
    fn: function fn() {
        if (style) {
            _util.evalCss.remove(style);
            style = null;
            return;
        }

        style = (0, _util.evalCss)(borderCss);
    },

    desc: 'Add color borders to all elements'
}, {
    name: 'Refresh Page',
    fn: function fn() {
        var url = new _util.Url();
        url.setQuery('timestamp', (0, _util.now)());

        window.location.replace(url.toString());
    },

    desc: 'Add timestamp to url and refresh'
}, {
    name: 'Search Text',
    fn: function fn() {
        var keyword = prompt('Enter the text');

        search(keyword);
    },

    desc: 'Highlight given text on page'
}, {
    name: 'Edit Page',
    fn: function fn() {
        var body = document.body;

        body.contentEditable = body.contentEditable !== 'true';
    },

    desc: 'Toggle body contentEditable'
}, {
    name: 'Load Fps Plugin',
    fn: function fn() {
        loadPlugin('fps');
    },

    desc: 'Display page fps'
}, {
    name: 'Load Features Plugin',
    fn: function fn() {
        loadPlugin('features');
    },

    desc: 'Browser feature detections'
}, {
    name: 'Load Timing Plugin',
    fn: function fn() {
        loadPlugin('timing');
    },

    desc: 'Show performance and resource timing'
}, {
    name: 'Load Memory Plugin',
    fn: function fn() {
        loadPlugin('memory');
    },

    desc: 'Display memory'
}, {
    name: 'Restore Settings',
    fn: function fn() {
        var store = (0, _util.safeStorage)('local');

        var data = JSON.parse((0, _stringify2.default)(store));

        (0, _util.each)(data, function (val, key) {
            if (!(0, _util.isStr)(val)) return;

            if ((0, _util.startWith)(key, 'eruda')) store.removeItem(key);
        });

        window.location.reload();
    },

    desc: 'Restore defaults and reload'
}];


var borderCss = '',
    styleName = (0, _util.has)(document.documentElement.style, 'outline') ? 'outline' : 'border',
    selector = 'html',
    colors = ['f5f5f5', 'dabb3a', 'abc1c7', '472936', 'c84941', '296dd1', '67adb4', '1ea061'];

(0, _util.each)(colors, function (color, idx) {
    selector += idx === 0 ? '>*:not([class^="eruda-"])' : '>*';

    borderCss += selector + ('{' + styleName + ': 2px solid #' + color + ' !important}');
});

function search(text) {
    var root = document.documentElement,
        regText = new RegExp(text, 'ig');

    traverse(root, function (node) {
        var $node = (0, _util.$)(node);

        if (!$node.hasClass('eruda-search-highlight-block')) return;

        return document.createTextNode($node.text());
    });

    traverse(root, function (node) {
        if (node.nodeType !== 3) return;

        var val = node.nodeValue;
        val = val.replace(regText, function (match) {
            return '<span class="eruda-keyword">' + match + '</span>';
        });
        if (val === node.nodeValue) return;

        var $ret = (0, _util.$)(document.createElement('div'));

        $ret.html(val);
        $ret.addClass('eruda-search-highlight-block');

        return $ret.get(0);
    });
}

function traverse(root, processor) {
    var childNodes = root.childNodes;

    if ((0, _util.isErudaEl)(root)) return;

    for (var i = 0, len = childNodes.length; i < len; i++) {
        var newNode = traverse(childNodes[i], processor);
        if (newNode) root.replaceChild(newNode, childNodes[i]);
    }

    return processor(root);
}

function loadPlugin(name) {
    var globalName = 'eruda' + (0, _util.upperFirst)(name);
    if (window[globalName]) return;

    (0, _util.loadJs)('//cdn.jsdelivr.net/npm/eruda-' + name + '@' + pluginVersion[name], function (isLoaded) {
        if (!isLoaded || !window[globalName]) return _logger2.default.error('Fail to load plugin ' + name);

        _emitter2.default.emit(_emitter2.default.ADD, window[globalName]);
        _emitter2.default.emit(_emitter2.default.SHOW, name);
    });
}

var pluginVersion = {
    fps: '1.0.2',
    features: '1.0.2',
    timing: '1.0.1',
    memory: '1.0.1'
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools .eruda-tools .eruda-snippets {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section {\n    margin-bottom: 10px;\n    border-radius: 4px;\n    -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n    overflow: hidden;\n    cursor: pointer; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section:active .eruda-name {\n      background: #263238; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section:active .eruda-description {\n      background: #eceffe; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-name {\n      padding: 10px;\n      color: #fff;\n      background: #707d8b;\n      -webkit-transition: background 0.3s;\n      transition: background 0.3s; }\n      .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-name .eruda-btn {\n        margin-left: 10px;\n        float: right;\n        text-align: center;\n        width: 18px;\n        height: 18px;\n        line-height: 18px;\n        font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-snippets .eruda-section .eruda-description {\n      background: #fff;\n      padding: 10px;\n      -webkit-transition: background 0.3s;\n      transition: background 0.3s; }\n\n.eruda-search-highlight-block {\n  display: inline; }\n  .eruda-search-highlight-block .eruda-keyword {\n    background: #ffc107;\n    color: #fff; }\n", ""]);

// exports


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "    <div class=\"eruda-section eruda-run\" data-idx=\""
    + alias2(alias1((data && data.index), depth0))
    + "\">\r\n        <h2 class=\"eruda-name\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\r\n            <div class=\"eruda-btn\">\r\n                <span class=\"eruda-icon-play\"></span>\r\n            </div>\r\n        </h2>\r\n        <div class=\"eruda-description\">\r\n            "
    + alias2(alias1((depth0 != null ? depth0.desc : depth0), depth0))
    + "\r\n        </div>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.snippets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = __webpack_require__(75);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = __webpack_require__(33);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(14);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Tool2 = __webpack_require__(9);

var _Tool3 = _interopRequireDefault(_Tool2);

var _Settings = __webpack_require__(13);

var _Settings2 = _interopRequireDefault(_Settings);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Resources = function (_Tool) {
    (0, _inherits3.default)(Resources, _Tool);

    function Resources() {
        (0, _classCallCheck3.default)(this, Resources);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Resources.__proto__ || (0, _getPrototypeOf2.default)(Resources)).call(this));

        _this._style = (0, _util.evalCss)(__webpack_require__(187));

        _this.name = 'resources';
        _this._localStoreData = [];
        _this._hideErudaSetting = false;
        _this._sessionStoreData = [];
        _this._cookieData = [];
        _this._scriptData = [];
        _this._stylesheetData = [];
        _this._imageData = [];
        _this._observeElement = true;
        _this._tpl = __webpack_require__(188);
        return _this;
    }

    (0, _createClass3.default)(Resources, [{
        key: 'init',
        value: function init($el, container) {
            (0, _get3.default)(Resources.prototype.__proto__ || (0, _getPrototypeOf2.default)(Resources.prototype), 'init', this).call(this, $el);

            this._container = container;

            this.refresh();
            this._bindEvent();
            this._initObserver();
            this._initCfg();
        }
    }, {
        key: 'refresh',
        value: function refresh() {
            return this.refreshLocalStorage().refreshSessionStorage().refreshCookie().refreshScript().refreshStylesheet().refreshImage()._render();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            (0, _get3.default)(Resources.prototype.__proto__ || (0, _getPrototypeOf2.default)(Resources.prototype), 'destroy', this).call(this);

            this._disableObserver();
            _util.evalCss.remove(this._style);
        }
    }, {
        key: 'refreshScript',
        value: function refreshScript() {
            var scriptData = [];

            (0, _util.$)('script').each(function () {
                var src = this.src;

                if (src !== '') scriptData.push(src);
            });

            scriptData = (0, _util.unique)(scriptData);

            this._scriptData = scriptData;

            return this;
        }
    }, {
        key: 'refreshStylesheet',
        value: function refreshStylesheet() {
            var stylesheetData = [];

            (0, _util.$)('link').each(function () {
                if (this.rel !== 'stylesheet') return;

                stylesheetData.push(this.href);
            });

            stylesheetData = (0, _util.unique)(stylesheetData);

            this._stylesheetData = stylesheetData;

            return this;
        }
    }, {
        key: 'refreshLocalStorage',
        value: function refreshLocalStorage() {
            this._refreshStorage('local');

            return this;
        }
    }, {
        key: 'refreshSessionStorage',
        value: function refreshSessionStorage() {
            this._refreshStorage('session');

            return this;
        }
    }, {
        key: '_refreshStorage',
        value: function _refreshStorage(type) {
            var _this2 = this;

            var store = (0, _util.safeStorage)(type, false);

            if (!store) return;

            var storeData = [];

            // Mobile safari is not able to loop through localStorage directly.
            store = JSON.parse((0, _stringify2.default)(store));

            (0, _util.each)(store, function (val, key) {
                // According to issue 20, not all values are guaranteed to be string.
                if (!(0, _util.isStr)(val)) return;

                if (_this2._hideErudaSetting) {
                    if ((0, _util.startWith)(key, 'eruda') || key === 'active-eruda') return;
                }

                storeData.push({
                    key: key,
                    val: sliceStr(val, 200)
                });
            });

            this['_' + type + 'StoreData'] = storeData;
        }
    }, {
        key: 'refreshCookie',
        value: function refreshCookie() {
            var cookieData = [];

            var cookie = document.cookie;
            if ((0, _util.trim)(cookie) !== '') {
                (0, _util.each)(document.cookie.split(';'), function (val, t) {
                    val = val.split('=');
                    try {
                        t = decodeURIComponent(val[1]);
                    } catch (e) {
                        t = val[1];
                    }
                    cookieData.push({
                        key: (0, _util.trim)(val[0]),
                        val: t
                    });
                });
            }

            this._cookieData = cookieData;

            return this;
        }
    }, {
        key: 'refreshImage',
        value: function refreshImage() {
            var imageData = [];

            var performance = this._performance = window.webkitPerformance || window.performance;
            if (performance && performance.getEntries) {
                var entries = this._performance.getEntries();
                entries.forEach(function (entry) {
                    if (entry.initiatorType === 'img' || isImg(entry.name)) {
                        imageData.push(entry.name);
                    }
                });
            } else {
                (0, _util.$)('img').each(function () {
                    var $this = (0, _util.$)(this),
                        src = $this.attr('src');

                    if ($this.data('exclude') === 'true') return;

                    imageData.push(src);
                });
            }

            imageData = (0, _util.unique)(imageData);
            imageData.sort();
            this._imageData = imageData;

            return this;
        }
    }, {
        key: 'show',
        value: function show() {
            (0, _get3.default)(Resources.prototype.__proto__ || (0, _getPrototypeOf2.default)(Resources.prototype), 'show', this).call(this);
            if (this._observeElement) this._enableObserver();

            return this.refresh();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this._disableObserver();

            return (0, _get3.default)(Resources.prototype.__proto__ || (0, _getPrototypeOf2.default)(Resources.prototype), 'hide', this).call(this);
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var _this3 = this;

            var self = this,
                $el = this._$el,
                container = this._container;

            $el.on('click', '.eruda-refresh-local-storage', function () {
                return _this3.refreshLocalStorage()._render();
            }).on('click', '.eruda-refresh-session-storage', function () {
                return _this3.refreshSessionStorage()._render();
            }).on('click', '.eruda-refresh-cookie', function () {
                return _this3.refreshCookie()._render();
            }).on('click', '.eruda-refresh-script', function () {
                return _this3.refreshScript()._render();
            }).on('click', '.eruda-refresh-image', function () {
                return _this3.refreshImage()._render();
            }).on('click', '.eruda-delete-storage', function () {
                var $this = (0, _util.$)(this),
                    key = $this.data('key'),
                    type = $this.data('type');

                if (type === 'local') {
                    localStorage.removeItem(key);
                    self.refreshLocalStorage()._render();
                } else {
                    sessionStorage.removeItem(key);
                    self.refreshSessionStorage()._render();
                }
            }).on('click', '.eruda-delete-cookie', function () {
                var key = (0, _util.$)(this).data('key');

                delCookie(key);
                self.refreshCookie()._render();
            }).on('click', '.eruda-clear-storage', function () {
                var type = (0, _util.$)(this).data('type');

                if (type === 'local') {
                    (0, _util.each)(self._localStoreData, function (val) {
                        return localStorage.removeItem(val.key);
                    });
                    self.refreshLocalStorage()._render();
                } else {
                    (0, _util.each)(self._sessionStoreData, function (val) {
                        return sessionStorage.removeItem(val.key);
                    });
                    self.refreshSessionStorage()._render();
                }
            }).on('click', '.eruda-clear-cookie', function () {
                (0, _util.each)(_this3._cookieData, function (val) {
                    return delCookie(val.key);
                });
                _this3.refreshCookie()._render();
            }).on('click', '.eruda-storage-val', function () {
                var $this = (0, _util.$)(this),
                    key = $this.data('key'),
                    type = $this.data('type');

                var val = type === 'local' ? localStorage.getItem(key) : sessionStorage.getItem(key);

                try {
                    showSources('json', JSON.parse(val));
                } catch (e) {
                    showSources('raw', val);
                }
            }).on('click', '.eruda-img-link', function () {
                var src = (0, _util.$)(this).attr('src');

                showSources('img', src);
            }).on('click', '.eruda-css-link', linkFactory('css')).on('click', '.eruda-js-link', linkFactory('js'));

            _util.orientation.on('change', function () {
                return _this3._render();
            });

            function showSources(type, data) {
                var sources = container.get('sources');
                if (!sources) return;

                sources.set(type, data);

                container.showTool('sources');

                return true;
            }

            function linkFactory(type) {
                return function (e) {
                    if (!container.get('sources')) return;
                    e.preventDefault();

                    var url = (0, _util.$)(this).attr('href');

                    if (!(0, _util.isCrossOrig)(url)) {
                        return (0, _util.ajax)({
                            url: url,
                            success: function success(data) {
                                showSources(type, data);
                            },
                            dataType: 'raw'
                        });
                    } else {
                        showSources('iframe', url);
                    }
                };
            }
        }
    }, {
        key: '_initCfg',
        value: function _initCfg() {
            var _this4 = this;

            var cfg = this.config = _Settings2.default.createCfg('resources', {
                hideErudaSetting: true,
                observeElement: true
            });

            if (cfg.get('hideErudaSetting')) this._hideErudaSetting = true;
            if (!cfg.get('observeElement')) this._observeElement = false;

            cfg.on('change', function (key, val) {
                switch (key) {
                    case 'hideErudaSetting':
                        _this4._hideErudaSetting = val;return;
                    case 'observeElement':
                        _this4._observeElement = val;
                        return val ? _this4._enableObserver() : _this4._disableObserver();
                }
            });

            var settings = this._container.get('settings');
            settings.text('Resources').switch(cfg, 'hideErudaSetting', 'Hide Eruda Setting').switch(cfg, 'observeElement', 'Auto Refresh Elements').separator();
        }
    }, {
        key: '_render',
        value: function _render() {
            var _this5 = this;

            var cookieData = this._cookieData,
                scriptData = this._scriptData,
                stylesheetData = this._stylesheetData,
                imageData = this._imageData;

            this._renderHtml(this._tpl({
                localStoreData: this._localStoreData,
                sessionStoreData: this._sessionStoreData,
                cookieData: cookieData,
                cookieState: getState('cookie', cookieData.length),
                scriptData: scriptData,
                scriptState: getState('script', scriptData.length),
                stylesheetData: stylesheetData,
                stylesheetState: getState('stylesheet', stylesheetData.length),
                imageData: imageData,
                imageState: getState('image', imageData.length)
            }));

            if (this._imageData.length === 0) return;

            setTimeout(function () {
                var $li = _this5._$el.find('.eruda-image-list li');

                $li.css({ height: $li.get(0).offsetWidth });
            }, 150);
        }
    }, {
        key: '_renderHtml',
        value: function _renderHtml(html) {
            if (html === this._lastHtml) return;
            this._lastHtml = html;
            this._$el.html(html);
        }
    }, {
        key: '_initObserver',
        value: function _initObserver() {
            var _this6 = this;

            this._observer = new _util.SafeMutationObserver(function (mutations) {
                var needToRender = false;
                (0, _util.each)(mutations, function (mutation) {
                    if (_this6._handleMutation(mutation)) needToRender = true;
                });
                if (needToRender) _this6._render();
            });
        }
    }, {
        key: '_handleMutation',
        value: function _handleMutation(mutation) {
            var _this7 = this;

            if ((0, _util.isErudaEl)(mutation.target)) return;

            var checkEl = function checkEl(el) {
                var tagName = getLowerCaseTagName(el);
                switch (tagName) {
                    case 'script':
                        _this7.refreshScript();return true;
                    case 'img':
                        _this7.refreshImage();return true;
                    case 'link':
                        _this7.refreshStylesheet();return true;
                }

                return false;
            };

            if (mutation.type === 'attributes') {
                if (checkEl(mutation.target)) return true;
            } else if (mutation.type === 'childList') {
                if (checkEl(mutation.target)) return true;
                var nodes = (0, _util.toArr)(mutation.addedNodes);
                nodes = (0, _util.concat)(nodes, (0, _util.toArr)(mutation.removedNodes));

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(nodes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var node = _step.value;

                        if (checkEl(node)) return true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }

            return false;
        }
    }, {
        key: '_enableObserver',
        value: function _enableObserver() {
            this._observer.observe(document.documentElement, {
                attributes: true,
                childList: true,
                subtree: true
            });
        }
    }, {
        key: '_disableObserver',
        value: function _disableObserver() {
            this._observer.disconnect();
        }
    }]);
    return Resources;
}(_Tool3.default);

exports.default = Resources;


function getState(type, len) {
    if (len === 0) return '';

    var warn = 0,
        danger = 0;

    switch (type) {
        case 'cookie':
            warn = 30;danger = 60;break;
        case 'script':
            warn = 5;danger = 10;break;
        case 'stylesheet':
            warn = 4;danger = 8;break;
        case 'image':
            warn = 50;danger = 100;break;
    }

    if (len >= danger) return 'eruda-danger';
    if (len >= warn) return 'eruda-warn';

    return 'eruda-ok';
}

var _window$location = window.location,
    hostname = _window$location.hostname,
    pathname = _window$location.pathname;


function delCookie(key) {
    var hostNames = hostname.split('.'),
        pathNames = pathname.split('/'),
        domain = '',
        pathLen = pathNames.length,
        path = void 0;

    if (del()) return;

    for (var i = hostNames.length - 1; i >= 0; i--) {
        var hostName = hostNames[i];
        if (hostName === '') continue;
        domain = domain === '' ? hostName : hostName + '.' + domain;

        path = '/';
        if (del({ domain: domain, path: path }) || del({ domain: domain })) return;

        for (var j = 0; j < pathLen; j++) {
            var pathName = pathNames[j];
            if (pathName === '') continue;

            path += pathName;
            if (del({ domain: domain, path: path }) || del({ path: path })) return;

            path += '/';
            if (del({ domain: domain, path: path }) || del({ path: path })) return;
        }
    }

    function del() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _util.cookie.remove(key, options);

        return !_util.cookie.get(key);
    }
}

function getLowerCaseTagName(el) {
    if (!el.tagName) return '';
    return el.tagName.toLowerCase();
}

var sliceStr = function sliceStr(str, len) {
    return str.length < len ? str : str.slice(0, len) + '...';
};

var regImg = /\.(jpeg|jpg|gif|png)$/;

var isImg = function isImg(url) {
    return regImg.test(url);
};

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools .eruda-tools .eruda-resources {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 10px;\n  font-size: 14px; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-section {\n    margin-bottom: 10px;\n    border-radius: 4px;\n    -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n    overflow: hidden; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title {\n    padding: 10px;\n    color: #fff;\n    background: #2196f3; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title .eruda-btn {\n      margin-left: 10px;\n      float: right;\n      background: #fff;\n      color: #707d8b;\n      text-align: center;\n      width: 18px;\n      height: 18px;\n      line-height: 18px;\n      border-radius: 50%;\n      font-size: 12px;\n      cursor: pointer;\n      -webkit-transition: color 0.3s;\n      transition: color 0.3s; }\n      .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title .eruda-btn:active {\n        color: #263238; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title.eruda-ok {\n      background: #009688; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title.eruda-warn {\n      background: #ffc107; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-title.eruda-danger {\n      background: #f44336; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-link-list {\n    font-size: 12px; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-link-list li {\n      padding: 10px;\n      background: #fff;\n      word-break: break-all; }\n      .eruda-dev-tools .eruda-tools .eruda-resources .eruda-link-list li a {\n        color: #2196f3 !important; }\n  .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list {\n    font-size: 12px;\n    background: #fff;\n    padding: 10px !important; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list:after {\n      content: '';\n      display: block;\n      clear: both; }\n    .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list li {\n      cursor: pointer;\n      width: 25%;\n      float: left;\n      overflow-y: hidden; }\n      .eruda-dev-tools .eruda-tools .eruda-resources .eruda-image-list li img {\n        width: 100%; }\n  .eruda-dev-tools .eruda-tools .eruda-resources table {\n    border-collapse: collapse;\n    width: 100%;\n    font-size: 12px;\n    background: #fff; }\n    .eruda-dev-tools .eruda-tools .eruda-resources table td {\n      padding: 10px;\n      word-break: break-all; }\n      .eruda-dev-tools .eruda-tools .eruda-resources table td.eruda-key {\n        overflow-x: auto;\n        -webkit-overflow-scrolling: touch;\n        white-space: nowrap;\n        max-width: 120px; }\n      .eruda-dev-tools .eruda-tools .eruda-resources table td.eruda-control {\n        padding: 0;\n        font-size: 0;\n        width: 40px; }\n        .eruda-dev-tools .eruda-tools .eruda-resources table td.eruda-control .eruda-icon-trash {\n          cursor: pointer;\n          color: #f44336;\n          font-size: 14px;\n          display: inline-block;\n          width: 40px;\n          height: 40px;\n          text-align: center;\n          line-height: 40px;\n          -webkit-transition: color 0.3s;\n          transition: color 0.3s; }\n          .eruda-dev-tools .eruda-tools .eruda-resources table td.eruda-control .eruda-icon-trash:active {\n            color: #b71c1c; }\n", ""]);

// exports


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.localStoreData : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <tr>\r\n                        <td class=\"eruda-key\">"
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</td>\r\n                        <td class=\"eruda-storage-val\" data-key=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-type=\"local\">"
    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
    + "</td>\r\n                        <td class=\"eruda-control\">\r\n                            <span class=\"eruda-icon-trash eruda-delete-storage\" data-key=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-type=\"local\"></span>\r\n                        </td>\r\n                    </tr>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                <tr>\r\n                    <td>Empty</td>\r\n                </tr>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.sessionStoreData : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <tr>\r\n                    <td class=\"eruda-key\">"
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</td>\r\n                    <td class=\"eruda-storage-val\" data-key=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-type=\"session\">"
    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
    + "</td>\r\n                    <td class=\"eruda-control\">\r\n                        <span class=\"eruda-icon-trash eruda-delete-storage\" data-key=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-type=\"session\"></span>\r\n                    </td>\r\n                </tr>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "            <tr>\r\n                <td>Empty</td>\r\n            </tr>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.cookieData : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <tr>\r\n                        <td class=\"eruda-key\">"
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</td>\r\n                        <td>"
    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
    + "</td>\r\n                        <td class=\"eruda-control\">\r\n                            <span class=\"eruda-icon-trash eruda-delete-cookie\" data-key=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\"></span>\r\n                        </td>\r\n                    </tr>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.scriptData : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <li>\r\n                    <a href=\""
    + alias2(alias1(depth0, depth0))
    + "\" target=\"_blank\" class=\"eruda-js-link\">"
    + alias2(alias1(depth0, depth0))
    + "</a>\r\n                </li>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "            <li>Empty</li>\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.stylesheetData : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <li>\r\n                    <a href=\""
    + alias2(alias1(depth0, depth0))
    + "\" target=\"_blank\" class=\"eruda-css-link\">"
    + alias2(alias1(depth0, depth0))
    + "</a>\r\n                </li>\r\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.imageData : depth0),{"name":"each","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    return "                <li>\r\n                    <img src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\" data-exclude=\"true\" class=\"eruda-img-link\"/>\r\n                </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"eruda-section eruda-local-storage\">\r\n    <h2 class=\"eruda-title\">\r\n        Local Storage\r\n        <div class=\"eruda-btn eruda-refresh-local-storage\">\r\n            <span class=\"eruda-icon-repeat\"></span>\r\n        </div>\r\n        <div class=\"eruda-btn eruda-clear-storage\" data-type=\"local\">\r\n            <span class=\"eruda-icon-ban\"></span>\r\n        </div>\r\n    </h2>\r\n    <table>\r\n        <tbody>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.localStoreData : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "        </tbody>\r\n    </table>\r\n</div>\r\n<div class=\"eruda-section eruda-session-storage\">\r\n    <h2 class=\"eruda-title\">\r\n        Session Storage\r\n        <div class=\"eruda-btn eruda-refresh-session-storage\">\r\n            <span class=\"eruda-icon-repeat\"></span>\r\n        </div>\r\n        <div class=\"eruda-btn eruda-clear-storage\" data-type=\"session\">\r\n            <span class=\"eruda-icon-ban\"></span>\r\n        </div>\r\n    </h2>\r\n    <table>\r\n        <tbody>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.sessionStoreData : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "        </tbody>\r\n    </table>\r\n</div>\r\n<div class=\"eruda-section eruda-cookie\">\r\n    <h2 class=\"eruda-title "
    + alias4(((helper = (helper = helpers.cookieState || (depth0 != null ? depth0.cookieState : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cookieState","hash":{},"data":data}) : helper)))
    + "\">\r\n        Cookie\r\n        <div class=\"eruda-btn eruda-refresh-cookie\">\r\n            <span class=\"eruda-icon-repeat\"></span>\r\n        </div>\r\n        <div class=\"eruda-btn eruda-clear-cookie\">\r\n            <span class=\"eruda-icon-ban\"></span>\r\n        </div>\r\n    </h2>\r\n    <table>\r\n        <tbody>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.cookieData : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "        </tbody>\r\n    </table>\r\n</div>\r\n<div class=\"eruda-section eruda-script\">\r\n    <h2 class=\"eruda-title "
    + alias4(((helper = (helper = helpers.scriptState || (depth0 != null ? depth0.scriptState : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scriptState","hash":{},"data":data}) : helper)))
    + "\">\r\n        Script\r\n        <div class=\"eruda-btn eruda-refresh-script\">\r\n            <span class=\"eruda-icon-repeat\"></span>\r\n        </div>\r\n    </h2>\r\n    <ul class=\"eruda-link-list\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.scriptData : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</div>\r\n<div class=\"eruda-section eruda-stylesheet\">\r\n    <h2 class=\"eruda-title "
    + alias4(((helper = (helper = helpers.stylesheetState || (depth0 != null ? depth0.stylesheetState : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stylesheetState","hash":{},"data":data}) : helper)))
    + "\">\r\n        Stylesheet\r\n        <div class=\"eruda-btn eruda-refresh-stylesheet\">\r\n            <span class=\"eruda-icon-repeat\"></span>\r\n        </div>\r\n    </h2>\r\n    <ul class=\"eruda-link-list\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.stylesheetData : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</div>\r\n<div class=\"eruda-section eruda-image\">\r\n    <h2 class=\"eruda-title "
    + alias4(((helper = (helper = helpers.imageState || (depth0 != null ? depth0.imageState : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imageState","hash":{},"data":data}) : helper)))
    + "\">\r\n        Image\r\n        <div class=\"eruda-btn eruda-refresh-image\">\r\n            <span class=\"eruda-icon-repeat\"></span>\r\n        </div>\r\n    </h2>\r\n    <ul class=\"eruda-image-list\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.imageData : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "    </ul>\r\n</div>\r\n";
},"useData":true});

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(14);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Tool2 = __webpack_require__(9);

var _Tool3 = _interopRequireDefault(_Tool2);

var _defInfo = __webpack_require__(190);

var _defInfo2 = _interopRequireDefault(_defInfo);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Info = function (_Tool) {
    (0, _inherits3.default)(Info, _Tool);

    function Info() {
        (0, _classCallCheck3.default)(this, Info);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Info.__proto__ || (0, _getPrototypeOf2.default)(Info)).call(this));

        _this._style = (0, _util.evalCss)(__webpack_require__(191));

        _this.name = 'info';
        _this._tpl = __webpack_require__(192);
        _this._msgs = [];
        return _this;
    }

    (0, _createClass3.default)(Info, [{
        key: 'init',
        value: function init($el) {
            (0, _get3.default)(Info.prototype.__proto__ || (0, _getPrototypeOf2.default)(Info.prototype), 'init', this).call(this, $el);

            this._addDefInfo();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            (0, _get3.default)(Info.prototype.__proto__ || (0, _getPrototypeOf2.default)(Info.prototype), 'destroy', this).call(this);

            _util.evalCss.remove(this._style);
        }
    }, {
        key: 'add',
        value: function add(name, val) {
            this._msgs.push({ name: name, val: val });

            this._render();

            return this;
        }
    }, {
        key: 'remove',
        value: function remove(name) {
            var msgs = this._msgs;

            for (var i = 0, len = msgs.length; i < len; i++) {
                if (msgs[i].name === name) msgs.splice(i, 1);
            }

            this._render();

            return this;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this._msgs = [];

            this._render();

            return this;
        }
    }, {
        key: '_addDefInfo',
        value: function _addDefInfo() {
            var _this2 = this;

            (0, _util.each)(_defInfo2.default, function (info) {
                return _this2.add(info.name, info.val);
            });
        }
    }, {
        key: '_render',
        value: function _render() {
            this._renderHtml(this._tpl({ messages: this._msgs }));
        }
    }, {
        key: '_renderHtml',
        value: function _renderHtml(html) {
            if (html === this._lastHtml) return;
            this._lastHtml = html;
            this._$el.html(html);
        }
    }]);
    return Info;
}(_Tool3.default);

exports.default = Info;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var browser = (0, _util.detectBrowser)();

exports.default = [{
    name: 'Location',
    val: location.href
}, {
    name: 'User Agent',
    val: navigator.userAgent
}, {
    name: 'Device',
    val: '<table>\n                  <tbody>\n                      <tr>\n                          <td class="eruda-device-key">screen</td>\n                          <td>' + screen.width + ' * ' + screen.height + '</td>\n                      </tr>\n                      <tr>\n                          <td>viewport</td>\n                          <td>' + window.innerWidth + ' * ' + window.innerHeight + '</td>\n                      </tr>\n                      <tr>\n                          <td>pixel ratio</td>\n                          <td>' + window.devicePixelRatio + '</td>\n                      </tr>\n                  </tbody>\n              </table>'

}, {
    name: 'System',
    val: '<table>\n                  <tbody>\n                      <tr>\n                          <td class="eruda-system-key">os</td>\n                          <td>' + (0, _util.detectOs)() + '</td>\n                      </tr>\n                      <tr>\n                          <td>browser</td>\n                          <td>' + (browser.name + ' ' + browser.version) + '</td>\n                      </tr>\n                  </tbody>  \n              </table>'
}, {
    name: 'About',
    val: '<a href="https://github.com/liriliri/eruda" target="_blank">Eruda v' + "1.4.0" + '</a>'
}];

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools .eruda-tools .eruda-info.eruda-tool {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li {\n    border-radius: 4px;\n    background: #fff;\n    margin: 10px;\n    -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }\n    .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-title, .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-content {\n      padding: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-title {\n      padding-bottom: 0;\n      font-size: 16px;\n      color: #2196f3; }\n    .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-content {\n      margin: 0;\n      -webkit-user-select: text;\n         -moz-user-select: text;\n          -ms-user-select: text;\n              user-select: text;\n      word-break: break-all; }\n      .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-content table {\n        width: 100%;\n        border-collapse: collapse; }\n        .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-content table th, .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-content table td {\n          border: 1px solid #eceffe;\n          padding: 10px; }\n      .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-content * {\n        -webkit-user-select: text;\n           -moz-user-select: text;\n            -ms-user-select: text;\n                user-select: text; }\n      .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-content a {\n        color: #2196f3; }\n    .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-device-key, .eruda-dev-tools .eruda-tools .eruda-info.eruda-tool li .eruda-system-key {\n      width: 100px; }\n", ""]);

// exports


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "        <li>\r\n            <h2 class=\"eruda-title\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\r\n            <div class=\"eruda-content\">"
    + ((stack1 = ((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n        </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.messages : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\r\n";
},"useData":true});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(14);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Tool2 = __webpack_require__(9);

var _Tool3 = _interopRequireDefault(_Tool2);

var _jsBeautify = __webpack_require__(57);

var _jsBeautify2 = _interopRequireDefault(_jsBeautify);

var _highlight = __webpack_require__(56);

var _highlight2 = _interopRequireDefault(_highlight);

var _JsonViewer = __webpack_require__(73);

var _JsonViewer2 = _interopRequireDefault(_JsonViewer);

var _Settings = __webpack_require__(13);

var _Settings2 = _interopRequireDefault(_Settings);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sources = function (_Tool) {
    (0, _inherits3.default)(Sources, _Tool);

    function Sources() {
        (0, _classCallCheck3.default)(this, Sources);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Sources.__proto__ || (0, _getPrototypeOf2.default)(Sources)).call(this));

        _this._style = (0, _util.evalCss)(__webpack_require__(194));

        _this.name = 'sources';
        _this._showLineNum = true;
        _this._formatCode = true;

        _this._loadTpl();
        return _this;
    }

    (0, _createClass3.default)(Sources, [{
        key: 'init',
        value: function init($el, container) {
            (0, _get3.default)(Sources.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sources.prototype), 'init', this).call(this, $el);

            this._container = container;
            this._bindEvent();
            this._initCfg();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            (0, _get3.default)(Sources.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sources.prototype), 'destroy', this).call(this);

            _util.evalCss.remove(this._style);
        }
    }, {
        key: 'set',
        value: function set(type, val) {
            if (type === 'img') {
                this._isFetchingData = true;

                var img = new Image();

                var self = this;

                img.onload = function () {
                    self._isFetchingData = false;
                    self._data = {
                        type: 'img',
                        val: {
                            width: this.width,
                            height: this.height,
                            src: val
                        }
                    };

                    self._render();
                };
                img.onerror = function () {
                    self._isFetchingData = false;
                };

                img.src = val;

                return;
            }

            this._data = { type: type, val: val };

            this._render();

            return this;
        }
    }, {
        key: 'show',
        value: function show() {
            (0, _get3.default)(Sources.prototype.__proto__ || (0, _getPrototypeOf2.default)(Sources.prototype), 'show', this).call(this);

            if (!this._data && !this._isFetchingData) {
                this._renderDef();
            }

            return this;
        }
    }, {
        key: '_renderDef',
        value: function _renderDef() {
            var _this2 = this;

            if (this._html) {
                this._data = {
                    type: 'html',
                    val: this._html
                };

                return this._render();
            }

            if (this._isGettingHtml) return;
            this._isGettingHtml = true;

            (0, _util.ajax)({
                url: location.href,
                success: function success(data) {
                    return _this2._html = data;
                },
                error: function error() {
                    return _this2._html = 'Sorry, unable to fetch source code:(';
                },
                complete: function complete() {
                    _this2._isGettingHtml = false;
                    _this2._renderDef();
                },
                dataType: 'raw'
            });
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent() {
            var _this3 = this;

            this._container.on('showTool', function (name, lastTool) {
                if (name !== _this3.name && lastTool.name === _this3.name) {
                    delete _this3._data;
                }
            });

            this._$el.on('click', '.eruda-http .eruda-response', function () {
                var data = _this3._data.val,
                    resTxt = data.resTxt;

                switch (data.subType) {
                    case 'css':
                        return _this3.set('css', resTxt);
                    case 'html':
                        return _this3.set('html', resTxt);
                    case 'javascript':
                        return _this3.set('js', resTxt);
                    case 'json':
                        return _this3.set('json', resTxt);
                }
                switch (data.type) {
                    case 'image':
                        return _this3.set('img', data.url);
                }
            });
        }
    }, {
        key: '_loadTpl',
        value: function _loadTpl() {
            this._codeTpl = __webpack_require__(195);
            this._imgTpl = __webpack_require__(196);
            this._httpTpl = __webpack_require__(197);
            this._jsonTpl = __webpack_require__(198);
            this._rawTpl = __webpack_require__(199);
            this._iframeTpl = __webpack_require__(200);
        }
    }, {
        key: '_initCfg',
        value: function _initCfg() {
            var _this4 = this;

            var cfg = this.config = _Settings2.default.createCfg('sources', {
                'showLineNum': true,
                'formatCode': true
            });

            if (!cfg.get('showLineNum')) this._showLineNum = false;
            if (!cfg.get('formatCode')) this._formatCode = false;

            cfg.on('change', function (key, val) {
                switch (key) {
                    case 'showLineNum':
                        _this4._showLineNum = val;return;
                    case 'formatCode':
                        _this4._formatCode = val;return;
                }
            });

            var settings = this._container.get('settings');
            settings.text('Sources').switch(cfg, 'showLineNum', 'Show Line Numbers').switch(cfg, 'formatCode', 'Beautify Code').separator();
        }
    }, {
        key: '_render',
        value: function _render() {
            this._isInit = true;

            var data = this._data;

            switch (data.type) {
                case 'html':
                case 'js':
                case 'css':
                    return this._renderCode();
                case 'img':
                    return this._renderImg();
                case 'http':
                    return this._renderHttp();
                case 'json':
                    return this._renderJson();
                case 'raw':
                    return this._renderRaw();
                case 'iframe':
                    return this._renderIframe();
            }
        }
    }, {
        key: '_renderImg',
        value: function _renderImg() {
            this._renderHtml(this._imgTpl(this._data.val));
        }
    }, {
        key: '_renderHttp',
        value: function _renderHttp() {
            var val = this._data.val;

            if (val.resTxt.trim() === '') delete val.resTxt;
            if ((0, _util.isEmpty)(val.resHeaders)) delete val.resHeaders;

            this._renderHtml(this._httpTpl(this._data.val));
        }
    }, {
        key: '_renderCode',
        value: function _renderCode() {
            var data = this._data;

            var code = data.val,
                len = data.val.length;

            // If source code too big, don't process it.
            if (len < MAX_BEAUTIFY_LEN && this._formatCode) {
                switch (data.type) {
                    case 'html':
                        code = _jsBeautify2.default.html(code, { unformatted: [] });
                        break;
                    case 'css':
                        code = _jsBeautify2.default.css(code);
                        break;
                    case 'js':
                        code = (0, _jsBeautify2.default)(code);
                        break;
                }

                code = (0, _highlight2.default)(code, data.type);
            } else {
                code = (0, _util.escape)(code);
            }

            if (len < MAX_LINE_NUM_LEN && this._showLineNum) {
                code = code.split('\n').map(function (line, idx) {
                    if ((0, _util.trim)(line) === '') line = '&nbsp;';

                    return {
                        idx: idx + 1,
                        val: line
                    };
                });
            }

            this._renderHtml(this._codeTpl({
                code: code,
                showLineNum: len < MAX_LINE_NUM_LEN && this._showLineNum
            }));
        }
    }, {
        key: '_renderJson',
        value: function _renderJson() {
            // Using cache will keep binding json events to the same elements.
            this._renderHtml(this._jsonTpl(), false);

            var val = this._data.val;

            try {
                if ((0, _util.isStr)(val)) val = JSON.parse(val);
                /* eslint-disable no-empty */
            } catch (e) {}

            new _JsonViewer2.default(val, this._$el.find('.eruda-json'));
        }
    }, {
        key: '_renderRaw',
        value: function _renderRaw() {
            this._renderHtml(this._rawTpl({ val: this._data.val }));
        }
    }, {
        key: '_renderIframe',
        value: function _renderIframe() {
            this._renderHtml(this._iframeTpl({ src: this._data.val }));
        }
    }, {
        key: '_renderHtml',
        value: function _renderHtml(html) {
            var _this5 = this;

            var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (cache && html === this._lastHtml) return;
            this._lastHtml = html;
            this._$el.html(html);
            // Need setTimeout to make it work
            setTimeout(function () {
                return _this5._$el.get(0).scrollTop = 0;
            }, 0);
        }
    }]);
    return Sources;
}(_Tool3.default);

exports.default = Sources;


var MAX_BEAUTIFY_LEN = 100000,
    MAX_LINE_NUM_LEN = 400000;

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-dev-tools .eruda-tools .eruda-sources {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-code-wrapper, .eruda-dev-tools .eruda-tools .eruda-sources .eruda-raw-wrapper {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    width: 100%;\n    background: #fff;\n    min-height: 100%; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-raw {\n    padding: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-code {\n    font-family: Consolas, Lucida Console, Monaco, MonoSpace;\n    font-size: 12px; }\n  .eruda-dev-tools .eruda-tools .eruda-sources pre.eruda-code {\n    padding: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-sources table.eruda-code {\n    border-collapse: collapse; }\n    .eruda-dev-tools .eruda-tools .eruda-sources table.eruda-code .eruda-gutter {\n      background: #eceffe;\n      color: #707d8b; }\n    .eruda-dev-tools .eruda-tools .eruda-sources table.eruda-code .eruda-line-num {\n      border-right: 1px solid #707d8b;\n      padding: 0 3px 0 5px;\n      text-align: right; }\n    .eruda-dev-tools .eruda-tools .eruda-sources table.eruda-code .eruda-code-line {\n      padding: 0 4px; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-image .eruda-breadcrumb {\n    background: #fff;\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n    margin-bottom: 10px;\n    word-break: break-all;\n    padding: 10px;\n    font-size: 16px;\n    min-height: 40px;\n    border-bottom: 1px solid #eceffe; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-image .eruda-img-container {\n    text-align: center; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-image .eruda-img-container img {\n      max-width: 100%;\n      -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n              box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2); }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-image .eruda-img-info {\n    text-align: center;\n    margin: 20px 0;\n    color: #707d8b; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-json {\n    background: #fff;\n    padding: 10px; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-breadcrumb {\n    background: #fff;\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n    margin-bottom: 10px;\n    word-break: break-all;\n    padding: 10px;\n    font-size: 16px;\n    min-height: 40px;\n    border-bottom: 1px solid #eceffe; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-section {\n    background: #fff;\n    margin-bottom: 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-section h2 {\n      background: #2196f3;\n      padding: 10px;\n      color: #fff;\n      font-size: 14px; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-section table td {\n      font-size: 12px;\n      padding: 5px 10px; }\n    .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-section table .eruda-key {\n      white-space: nowrap; }\n  .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-response, .eruda-dev-tools .eruda-tools .eruda-sources .eruda-http .eruda-data {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    background: #fff;\n    padding: 10px;\n    font-size: 12px;\n    margin-bottom: 10px;\n    white-space: pre-wrap; }\n  .eruda-dev-tools .eruda-tools .eruda-sources iframe {\n    width: 100%;\n    height: 100%; }\n", ""]);

// exports


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"eruda-code-wrapper\">\r\n        <table class=\"eruda-code\">\r\n            <tbody>\r\n                <tr>\r\n                    <td class=\"eruda-gutter\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.code : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </td>\r\n                    <td class=\"eruda-content\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.code : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            <div class=\"eruda-line-num\">"
    + container.escapeExpression(((helper = (helper = helpers.idx || (depth0 != null ? depth0.idx : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"idx","hash":{},"data":data}) : helper)))
    + "</div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                            <pre class=\"eruda-code-line\">"
    + ((stack1 = ((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"val","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</pre>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "    <div class=\"eruda-code-wrapper\">\r\n        <pre class=\"eruda-code\">"
    + ((stack1 = ((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"code","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</pre>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.showLineNum : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"eruda-image\">\r\n    <div class=\"eruda-breadcrumb\">"
    + alias4(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data}) : helper)))
    + "</div>\r\n    <div class=\"eruda-img-container\" data-exclude=\"true\">\r\n        <img src=\""
    + alias4(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data}) : helper)))
    + "\">\r\n    </div>\r\n    <div class=\"eruda-img-info\">"
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + " × "
    + alias4(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data}) : helper)))
    + "</div>\r\n</div>";
},"useData":true});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <pre class=\"eruda-data\">"
    + container.escapeExpression(((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"data","hash":{},"data":data}) : helper)))
    + "</pre>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.resHeaders : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "                        <tr>\r\n                            <td class=\"eruda-key\">"
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + "</td>\r\n                            <td>"
    + alias1(container.lambda(depth0, depth0))
    + "</td>\r\n                        </tr>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "                    <tr>\r\n                        <td>Empty</td>\r\n                    </tr>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <pre class=\"eruda-response\">"
    + container.escapeExpression(((helper = (helper = helpers.resTxt || (depth0 != null ? depth0.resTxt : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"resTxt","hash":{},"data":data}) : helper)))
    + "</pre>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"eruda-http\">\r\n    <div class=\"eruda-breadcrumb\">"
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "</div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"eruda-section\">\r\n        <h2>Response Headers</h2>\r\n        <table class=\"eruda-headers\">\r\n            <tbody>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.resHeaders : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "            </tbody>\r\n        </table>\r\n    </div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.resTxt : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul class=\"eruda-json\"></ul>";
},"useData":true});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"eruda-raw-wrapper\">\r\n    <div class=\"eruda-raw\">"
    + container.escapeExpression(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"val","hash":{},"data":data}) : helper)))
    + "</div>\r\n</div>\r\n";
},"useData":true});

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(3);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<iframe src=\""
    + ((stack1 = ((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"src","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\"></iframe>";
},"useData":true});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Storage = __webpack_require__(202);

var _Storage2 = _interopRequireDefault(_Storage);

var _logger = __webpack_require__(35);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configs = {};

var config = {
    create: function create(name) {
        _logger2.default.warn('createCfg is deprecated');

        if (!configs[name]) configs[name] = new _Storage2.default(name);

        return configs[name];
    }
};

exports.default = config;

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(4);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _stringify = __webpack_require__(33);

var _stringify2 = _interopRequireDefault(_stringify);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localStore = {
    _storage: (0, _util.safeStorage)('local'),
    get: function get(key) {
        var val = this._storage.getItem(key);

        try {
            val = JSON.parse(val);
            /* eslint-disable no-empty */
        } catch (e) {}

        return val;
    },
    set: function set(key, val) {
        if ((0, _util.isObj)(val)) val = (0, _stringify2.default)(val);

        this._storage.setItem(key, val);

        return this;
    },
    remove: function remove(key) {
        this._storage.removeItem(key);

        return this;
    }
};

var Storage = function (_Emitter) {
    (0, _inherits3.default)(Storage, _Emitter);

    function Storage(name) {
        (0, _classCallCheck3.default)(this, Storage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Storage.__proto__ || (0, _getPrototypeOf2.default)(Storage)).call(this));

        _this._name = name;
        _this._val = localStore.get(name);
        if (!_this._val || !(0, _util.isObj)(_this._val)) _this._val = {};
        return _this;
    }

    (0, _createClass3.default)(Storage, [{
        key: 'save',
        value: function save() {
            localStore.set(this._name, this._val);

            return this;
        }
    }, {
        key: 'get',
        value: function get(key) {
            if ((0, _util.isUndef)(key)) return this._val;

            return this._val[key];
        }
    }, {
        key: 'set',
        value: function set(key, val) {
            var _this2 = this;

            var kv = void 0;

            if ((0, _util.isObj)(key)) {
                kv = key;
            } else {
                kv = {};
                kv[key] = val;
            }

            (0, _util.each)(kv, function (val, key) {
                var preVal = _this2._val[key];
                _this2._val[key] = val;
                if (preVal !== val) _this2.emit('change', key, val);
            });

            return this.save();
        }
    }]);
    return Storage;
}(_util.Emitter);

exports.default = Storage;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(36);

var _assign2 = _interopRequireDefault(_assign);

exports.default = function (util) {
    (0, _assign2.default)(util, {
        highlight: _highlight2.default,
        beautify: _jsBeautify2.default
    });
};

var _highlight = __webpack_require__(56);

var _highlight2 = _interopRequireDefault(_highlight);

var _jsBeautify = __webpack_require__(57);

var _jsBeautify2 = _interopRequireDefault(_jsBeautify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-container {\n  pointer-events: none;\n  will-change: transform;\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100000;\n  color: #263238;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-seri;\n  font-size: 14px;\n  direction: ltr; }\n  .eruda-container * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    pointer-events: all;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    -webkit-tap-highlight-color: transparent;\n    -webkit-text-size-adjust: none; }\n  .eruda-container ul {\n    list-style: none;\n    padding: 0;\n    margin: 0; }\n  .eruda-container h1, .eruda-container h2, .eruda-container h3, .eruda-container h4 {\n    margin: 0; }\n\n.eruda-hidden {\n  display: none; }\n\n.eruda-blue {\n  color: #2196f3; }\n\n.eruda-red {\n  color: #f44336; }\n\n.eruda-green {\n  color: #009688; }\n", ""]);

// exports


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, ".eruda-container html, .eruda-container body, .eruda-container div, .eruda-container span, .eruda-container applet, .eruda-container object, .eruda-container iframe, .eruda-container h1, .eruda-container h2, .eruda-container h3, .eruda-container h4, .eruda-container h5, .eruda-container h6, .eruda-container p, .eruda-container blockquote, .eruda-container pre, .eruda-container a, .eruda-container abbr, .eruda-container acronym, .eruda-container address, .eruda-container big, .eruda-container cite, .eruda-container code, .eruda-container del, .eruda-container dfn, .eruda-container em, .eruda-container img, .eruda-container ins, .eruda-container kbd, .eruda-container q, .eruda-container s, .eruda-container samp, .eruda-container small, .eruda-container strike, .eruda-container strong, .eruda-container sub, .eruda-container sup, .eruda-container tt, .eruda-container var, .eruda-container b, .eruda-container u, .eruda-container i, .eruda-container center, .eruda-container dl, .eruda-container dt, .eruda-container dd, .eruda-container ol, .eruda-container ul, .eruda-container li, .eruda-container fieldset, .eruda-container form, .eruda-container label, .eruda-container legend, .eruda-container table, .eruda-container caption, .eruda-container tbody, .eruda-container tfoot, .eruda-container thead, .eruda-container tr, .eruda-container th, .eruda-container td, .eruda-container article, .eruda-container aside, .eruda-container canvas, .eruda-container details, .eruda-container embed, .eruda-container figure, .eruda-container figcaption, .eruda-container footer, .eruda-container header, .eruda-container hgroup, .eruda-container menu, .eruda-container nav, .eruda-container output, .eruda-container ruby, .eruda-container section, .eruda-container summary, .eruda-container time, .eruda-container mark, .eruda-container audio, .eruda-container video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline; }\n\n.eruda-container article, .eruda-container aside, .eruda-container details, .eruda-container figcaption, .eruda-container figure, .eruda-container footer, .eruda-container header, .eruda-container hgroup, .eruda-container menu, .eruda-container nav, .eruda-container section {\n  display: block; }\n\n.eruda-container body {\n  line-height: 1; }\n\n.eruda-container ol, .eruda-container ul {\n  list-style: none; }\n\n.eruda-container blockquote, .eruda-container q {\n  quotes: none; }\n\n.eruda-container blockquote:before, .eruda-container blockquote:after, .eruda-container q:before, .eruda-container q:after {\n  content: '';\n  content: none; }\n\n.eruda-container table {\n  border-collapse: collapse;\n  border-spacing: 0; }\n", ""]);

// exports


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(false);
// imports


// module
exports.push([module.i, "@font-face {\r\n  font-family: 'eruda-icon';\r\n    src: url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAABEAAAsAAAAAELQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFi2NtYXAAAAFoAAAAVAAAAFQXVtKVZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAADKQAAAykjK19FmhlYWQAAA5oAAAANgAAADYPCS8LaGhlYQAADqAAAAAkAAAAJAfCA9RobXR4AAAOxAAAAEwAAABMOSwAm2xvY2EAAA8QAAAAKAAAACgZ4h0QbWF4cAAADzgAAAAgAAAAIAAZAIVuYW1lAAAPWAAAAYYAAAGGmUoJ+3Bvc3QAABDgAAAAIAAAACAAAwAAAAMDUwGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6Q4DwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkO//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAgAHAAcDZgNmACIARQAAAREUBiMiJi8BBw4BIyImLwEuATU0Nj8BJy4BNTQ2MyEyFhUBFAYPARceARUUBiMhIiY1ETQ2MzIWHwE3PgEzMhYfAR4BFQG3Fg8HDQVTvQMHBAMHA0ECBAQCvlIGBRUPAQAPFgGvAwK+UgUGFg//AA8VFQ8IDQVSvgMHAwQHAkICAwGS/wAPFQUGUr4CBAQCQQMHAwQHA71TBQ0HDxYWDwGAAwcDvlIFDQgPFRUPAQAPFgYFUr4CAwMCQgIHBAAAAAIAAAAAA24DbgAiAEUAAAEUBg8BFx4BFRQGIyEiJjURNDYzMhYfATc+ATMyFh8BHgEVAREUBiMiJi8BBw4BIyImLwEuATU0Nj8BJy4BNTQ2MyEyFhUBrwMCvlIFBhUP/wAPFhYPBw0FU70DBwMEBwNBAgMBvxYPBw0GUr4CBwQDBwNBAwMDA75TBQUVDwEADxYBWwMHA71TBQ0HDxYWDwEADxUGBVK+AgMDAkEDBwQB7v8ADxUFBVO+AwMDA0EDBwMEBwK+UgYNBw8WFg8AAAADAAAAAANuA24AJgA7AFQAACU1NCcmKwERNCcmKwEiBwYdARQXFjsBFSMiBwYdARQXFjMhMjc2NQM1NCcmKwEiBwYdARQXFjsBMjc2NQUUBwYHBiMiJyYnJjU0NzY3NjMyFxYXFhUCSQUFCDcFBQi3CAUFBQUINzcIBQUFBQgBAAgFBUkFBQhuCAUFBQUIbggFBQFuOztlZXd4ZGU7Ozs7ZWR4d2VlOzulWwgFBQElCAUFBQUIXAgFBbcFBQhbCAYFBQYIAgBbCAUFBQUIWwgGBQUGCO54ZGU7Ozs7ZWR4d2VlOzs7O2VldwAAAAMAAAAAA24DcQANABkAOQAAATQnARYzMjc2NzY3NjUFASYjIgcGBwYVFBclFAcGBwYHBiMiJyYnJicmNTQ3Njc2NzYzMhcWFxYXFgLuMv5RTlw/OjkqKhgZ/cUBr01eVUdIKSozArsjIzs6UlFZWVJROzojIyMjOjtRUllZUVI6OyMjAblcTP5SMxkZKSo6OkCrAa80KipISFRdTqtaUlI6OyMjIyM7OlJSWllSUTs7IyMjIzs7UVIAAAAAAgAAAAADbgNuAA8AggAAATQnJiMiBwYVFBcWMzI3NiUVFAcGDwEGBxYXFhUUBwYHBiMiLwEGBwYHBisBIicmNScmJwcGIyInJicmNTQ3Njc2NyYvASYnJj0BNDc2PwE2NyYnJjU0NzY3NjMyHwE2NzY3NjsBMhcWHwEWFzc2MzIXFhcWFRQHBgcGBxYfARYXFhUCSSsrPD0rKiorPTwrKwElBQQHagsLFCkGBg8pKQ0HCE8ZGwkHBBF/CAYGEBwYUAYICAdIFgQFCBUUCxAIaAgEBQUEBmsIDhcmBgUPKikNBwdPGRsJCAQQfwgGBgEQHBdRBggIBkoVBAUIFRUKDwloCAQFAbc8KysrKzw9KyoqK3t/BwYGARAfFR0yBwcIBhUoKQU+DQlNHRAFBQdpCQw9BQZCHgYIBgcMGhoOHRwPAQYGCH4HBwYBEBobIC4HBwYHFSkpBj0NCE4dEAUFB2oJDD0GBkQdBQgHBgwaGg4dGxABBgYIAAUAAAAAAyUDbgAUACkAPgBGAHMAACURNCcmKwEiBwYVERQXFjsBMjc2NTMRNCcmKwEiBwYVERQXFjsBMjc2NTMRNCcmKwEiBwYVERQXFjsBMjc2NQEhJyYnIwYHBRUUBwYrAREUBwYjISInJjURIyInJj0BNDc2OwE3Njc2OwEyFxYfATMyFxYVASUGBQgkCAUGBgUIJAgFBpIFBQglCAUFBQUIJQgFBZIFBQglCAUFBQUIJQgFBf7JAQAbBAa1BgQB9wYFCDcaGyb+JSYbGzcIBQUFBQixKAgXFhe3FxYWCSiwCAUGpQGSCAUFBQUI/m4IBgUFBggBkggFBQUFCP5uCAYFBQYIAZIIBQUFBQj+bggGBQUGCAI2QwUCAgVVJAgGBf3jMCIjISIvAiAFBggkCAUFYBUPDw8PFWAFBQgAAQAAAAADbgNuAEcAAAERFAcGIyEiJyY/ASYjIgcGBwYHBhUUFxYXFhcWMzI3Njc2NzIfARYVFAcGBwYjIicmJyYnJjU0NzY3Njc2MzIXFhc3NhcWFQNuCwsP/wAYCgkRT1RzPDY2JycYFxcYJyc2NjxEPD0qBAkIBk4GBD9YWWJZUVI6OyMjIyM7OlJRWVROTz1KERcXAyX/AA8LCxcWEU9OFxcnKDY2Ozw2NicnGBceHjYGAQVPBQcHBksqKSMjOzpSUVlZUVE7OyMjICA5SRIKCRgAAAAAAQAzAA8CgwOoABoAAAkBBiMiLwEmNTQ3CQEmNTQ/ATYzMhcBFhUUBwJ5/lgLDw8LXwsLATD+0AsLXwsPDwsBqAoKAcL+WAsLXwoPDwsBLwEwCw8OC18LC/5YCw8OCwAAAQBYAA8CqAOoABoAAAkCFhUUDwEGIyInASY1NDcBNjMyHwEWFRQHAp3+0QEvCwtfCw4PC/5YCwsBqAsPDgtfCwsDC/7Q/tELDw8KXwsLAagLDg8LAagLC18LDg8LAAAABQAA/7cDtwO3AD4AbQBxAHUAegAAASIHBhURJyYjIgcGFRQXExYzITI3Nj8BNj0BNCcmIyIHBhUjNTQnJiMiBwYdASM1NCcmIyIHBh0BIxE0JyYjNTIXFh0BNjMyFzYzMhc2MzIXFh0BFA8BBgcGIyEiJyYnAyY1NDc2MzIXETQ3NjMTNSMVMzUjFTM1IxUzAW4fFRVXFyYeFRUP2xYlAZoNCgoCNQ4QEBcXEBASExIbGxITExUVHx4VFhIVFR89KisNBTkqGx5AKQ8RNiUlEDUJHh0m/mYjHx8U3B0rKjwpISsrPUkSpBKkEhIDbhYVHv4Acx8WFh0ZE/7bHQgHDNM3OHwXEREQEBcjHBMTExMaJTQfFxYVFR83AUYgFhdJLC09fgIoDDIEJic1fEM+0iUXFxAPGwElJzE8KysUATk8Kyv829zc3Nzc3AADAAAASQQAAtsAGAAxAEoAAAEmJxYVFAcGIyInJjU0NwYHFhcWMzI3NjclNCcmIyIHBhUUFxYzMjc2NTQ3NjMyNzY1BRQHBgcGIyInJicmNTQ3Njc2MzIXFhcWFQO3V4MjS0tqaktLI4NXTHNyhoZyc0z+ZAgIC0c0MwgIDAsICCMjMQsICAHlC1CIh5aWh4hQCwtQiIeWloeIUAsBkodDO0ZpS0xMS2lGO0OHdUVGRkV13AsICDMzSAsICAgICzIiIwgIDNwTFIRPT1BPgxQTFBSDT09PT4MUFAAAAQAAAAADbgNuAEkAAAEUBwYHBgcGIyInJicmNTY/ATYzFhcWFxYzMjc2NzY3NjU0JyYnJicmIyIHBgcXFgcGIyEiJyY1ETQ3Nh8BNjc2MzIXFhcWFxYVA24jIzs7UVFZYllZPgQBBE8FCQkEKjw9RDs2NignFxcXFycoNjY7ODQzKE4SCgkY/wAPCwsXFhFLPU5PVFlRUTs7IyMBt1lRUjo7IyMpKksGBwcFTwUBBjYeHhcYJyc2Njw7NjYoJxcXFBQmTxEWFwsLDwEAGAkKEkk5ICAjIzs7UVFZAAMACQAAA/cDtwAUACkAQQAAJTU0JyYrASIHBh0BFBcWOwEyNzY1JxM0JyYrASIHBhUTFBcWOwEyNzY3AwEWBwYHBiMhIicmJyY3ATY3NjMyFxYXAkkFBgduBwYFBQYHbgcGBQEKBQgGfgYIBQkGBghqCAUFAQgBtxQVChERE/ySExERChUUAbcKEREUFBERCqVtCAUGBgUIbQgFBgYFCNYBBgcEBgYECP77BgQDAwQGAhb82yQkEQkKCgkRJCQDJRELCgoLEQAAAgAAAAADbgNuACsARAAAATQvATc2NTQvASYjIg8BJyYjIg8BBhUUHwEHBhUUHwEWMzI/ARcWMzI/ATY3FAcGBwYjIicmJyY1NDc2NzYzMhcWFxYVApELaGgLCzQLDw8LZ2gKDxALMwsLZ2cLCzMLEA8KaGcLDw8LNAvdOztlZXd4ZGU7Ozs7ZWR4d2VlOzsBNg8KaGcLDw8LNAsLaGgLCzQLDw8LZ2gKDxALMwsLZ2cLCzMLkXhkZTs7OztlZHh3ZWU7Ozs7ZWV3AAAAAQAA//8DFwNuAAsAAAkBBiY1ETQ2FwEWFAMX/QkNExMNAvcNAaX+WgcLDwNJDwwI/lsIFQAAAAABAAAAAAAA0YpcH18PPPUACwQAAAAAANX1dVAAAAAA1fV1UAAA/7cEAAO3AAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAQAAAEAAAAAAAAAAAAAAAAAAAATBAAAAAAAAAAAAAAAAgAAAANuAAcDbgAAA24AAANuAAADbgAAAyUAAANuAAACtwAzAwAAWAO3AAAEAAAAA24AAAQAAAkDbgAAAykAAAAAAAAACgAUAB4AhgDuAWQBwgJ+Ax4DigO6A+oEkAT+BWwF0AY2BlIAAQAAABMAgwAFAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGljb21vb24AaQBjAG8AbQBvAG8AblZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGljb21vb24AaQBjAG8AbQBvAG8Abmljb21vb24AaQBjAG8AbQBvAG8AblJlZ3VsYXIAUgBlAGcAdQBsAGEAcmljb21vb24AaQBjAG8AbQBvAG8AbkZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=') format('woff');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n\r\n[class^=\"eruda-icon-\"], [class*=\" eruda-icon-\"] {\r\n  /* use !important to prevent issues with browser extensions that change fonts */\r\n  font-family: 'eruda-icon' !important;\r\n  speak: none;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  font-variant: normal;\r\n  text-transform: none;\r\n  line-height: 1;\r\n\r\n  /* Better Font Rendering =========== */\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.eruda-icon-play:before {\r\n  content: \"\\E90E\";\r\n}\r\n.eruda-icon-compress:before {\r\n  content: \"\\E900\";\r\n}\r\n.eruda-icon-expand:before {\r\n  content: \"\\E901\";\r\n}\r\n.eruda-icon-rotate-left:before {\r\n  content: \"\\E90B\";\r\n}\r\n.eruda-icon-hand-pointer-o:before {\r\n  content: \"\\E909\";\r\n}\r\n.eruda-icon-eye:before {\r\n  content: \"\\E90A\";\r\n}\r\n.eruda-icon-info-circle:before {\r\n  content: \"\\E902\";\r\n}\r\n.eruda-icon-ban:before {\r\n  content: \"\\E903\";\r\n}\r\n.eruda-icon-cog:before {\r\n  content: \"\\E904\";\r\n}\r\n.eruda-icon-trash:before {\r\n  content: \"\\E905\";\r\n}\r\n.eruda-icon-repeat:before {\r\n  content: \"\\E906\";\r\n}\r\n.eruda-icon-chevron-right:before {\r\n  content: \"\\E907\";\r\n}\r\n.eruda-icon-chevron-left:before {\r\n  content: \"\\E908\";\r\n}\r\n.eruda-icon-exclamation-triangle:before {\r\n  content: \"\\E90C\";\r\n}\r\n.eruda-icon-times-circle:before {\r\n  content: \"\\E90D\";\r\n}\r\n", ""]);

// exports


/***/ })
/******/ ]);
});
//# sourceMappingURL=eruda.js.map