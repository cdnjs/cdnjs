/*!
 * DevExpress Gantt (dx-gantt)
 * Version: 2.1.27
 * Build date: Fri Apr 23 2021
 * 
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExpress licensing here: https://www.devexpress.com/Support/EULAs
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Gantt"] = factory();
	else
		root["DevExpress"] = root["DevExpress"] || {}, root["DevExpress"]["Gantt"] = factory();
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
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

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
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

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = __webpack_require__(32);
function isDefined(value) {
    return value !== undefined && value !== null;
}
exports.isDefined = isDefined;
function boolToInt(value) {
    return value ? 1 : 0;
}
exports.boolToInt = boolToInt;
function boolToString(value) {
    return value ? '1' : '0';
}
exports.boolToString = boolToString;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isNonNullString(str) {
    return !!str;
}
exports.isNonNullString = isNonNullString;
function isEven(num) {
    return (num % 2) !== 0;
}
exports.isEven = isEven;
function isOdd(num) {
    return (num % 2) === 0;
}
exports.isOdd = isOdd;
function numberToStringBin(num, minLength) {
    if (minLength === void 0) { minLength = 0; }
    return string_1.StringUtils.padLeft(num.toString(2), minLength, '0');
}
exports.numberToStringBin = numberToStringBin;
function numberToStringHex(num, minLength) {
    if (minLength === void 0) { minLength = 0; }
    return string_1.StringUtils.padLeft(num.toString(16), minLength, '0');
}
exports.numberToStringHex = numberToStringHex;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = __webpack_require__(5);
var common_1 = __webpack_require__(1);
var math_1 = __webpack_require__(43);
var string_1 = __webpack_require__(32);
var DomUtils = (function () {
    function DomUtils() {
    }
    DomUtils.clearInnerHtml = function (element) {
        while (element.firstChild)
            element.removeChild(element.firstChild);
    };
    DomUtils.setStylePosition = function (style, point) {
        style.left = math_1.MathUtils.round(point.x, 3) + 'px';
        style.top = math_1.MathUtils.round(point.y, 3) + 'px';
    };
    DomUtils.setStyleSize = function (style, size) {
        style.width = math_1.MathUtils.round(size.width, 3) + 'px';
        style.height = math_1.MathUtils.round(size.height, 3) + 'px';
    };
    DomUtils.setStyleSizeAndPosition = function (style, rectangle) {
        DomUtils.setStylePosition(style, rectangle);
        DomUtils.setStyleSize(style, rectangle);
    };
    DomUtils.hideNode = function (node) {
        if (node) {
            var parentNode = node.parentNode;
            if (parentNode)
                parentNode.removeChild(node);
        }
    };
    DomUtils.isHTMLElementNode = function (node) {
        return node.nodeType === Node.ELEMENT_NODE;
    };
    DomUtils.isTextNode = function (node) {
        return node.nodeType === Node.TEXT_NODE;
    };
    DomUtils.isElementNode = function (node) {
        return node.nodeType === Node.ELEMENT_NODE;
    };
    DomUtils.isHTMLTableRowElement = function (element) {
        return element.tagName === 'TR';
    };
    DomUtils.isItParent = function (parentElement, element) {
        if (!parentElement || !element)
            return false;
        while (element) {
            if (element === parentElement)
                return true;
            if (element.tagName === 'BODY')
                return false;
            element = element.parentNode;
        }
        return false;
    };
    DomUtils.getParentByTagName = function (element, tagName) {
        tagName = tagName.toUpperCase();
        while (element) {
            if (element.tagName === 'BODY')
                return null;
            if (element.tagName === tagName)
                return element;
            element = element.parentNode;
        }
        return null;
    };
    DomUtils.getDocumentScrollTop = function () {
        var isScrollBodyIE = browser_1.Browser.IE && DomUtils.getCurrentStyle(document.body).overflow === 'hidden' && document.body.scrollTop > 0;
        if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge || isScrollBodyIE) {
            if (browser_1.Browser.MacOSMobilePlatform)
                return window.pageYOffset;
            if (browser_1.Browser.WebKitFamily)
                return document.documentElement.scrollTop || document.body.scrollTop;
            return document.body.scrollTop;
        }
        else
            return document.documentElement.scrollTop;
    };
    DomUtils.getDocumentScrollLeft = function () {
        var isScrollBodyIE = browser_1.Browser.IE && DomUtils.getCurrentStyle(document.body).overflow === 'hidden' && document.body.scrollLeft > 0;
        if (browser_1.Browser.Edge || isScrollBodyIE)
            return document.body ? document.body.scrollLeft : document.documentElement.scrollLeft;
        if (browser_1.Browser.WebKitFamily)
            return document.documentElement.scrollLeft || document.body.scrollLeft;
        return document.documentElement.scrollLeft;
    };
    DomUtils.getCurrentStyle = function (element) {
        if (element.currentStyle)
            return element.currentStyle;
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            var result = document.defaultView.getComputedStyle(element, null);
            if (!result && browser_1.Browser.Firefox && window.frameElement) {
                var changes = [];
                var curElement = window.frameElement;
                while (!(result = document.defaultView.getComputedStyle(element, null))) {
                    changes.push([curElement, curElement.style.display]);
                    curElement.style.setProperty('display', 'block', 'important');
                    curElement = curElement.tagName === 'BODY' ? curElement.ownerDocument.defaultView.frameElement : curElement.parentNode;
                }
                result = cloneObject(result);
                for (var ch = void 0, i = 0; ch = changes[i]; i++)
                    ch[0].style.display = ch[1];
                document.body.offsetWidth;
            }
            return result;
        }
        return window.getComputedStyle(element, null);
    };
    DomUtils.setFocus = function (element) {
        function focusCore() {
            try {
                element.focus();
                if (browser_1.Browser.IE && document.activeElement !== element)
                    element.focus();
            }
            catch (e) {
            }
        }
        if (browser_1.Browser.MacOSMobilePlatform)
            focusCore();
        else {
            setTimeout(function () {
                focusCore();
            }, 100);
        }
    };
    DomUtils.hasClassName = function (element, className) {
        try {
            var classNames = className.split(' ');
            var classList = element.classList;
            if (classList) {
                for (var i = classNames.length - 1; i >= 0; i--) {
                    if (!classList.contains(classNames[i]))
                        return false;
                }
            }
            else {
                var elementClassName = element.getAttribute && element.getAttribute('class');
                if (!elementClassName)
                    return false;
                var elementClasses = elementClassName.split(' ');
                for (var i = classNames.length - 1; i >= 0; i--) {
                    if (elementClasses.indexOf(classNames[i]) < 0)
                        return false;
                }
            }
            return true;
        }
        catch (e) {
            return false;
        }
    };
    DomUtils.addClassName = function (element, className) {
        if (!DomUtils.hasClassName(element, className)) {
            var elementClassName = element.getAttribute && element.getAttribute('class');
            element.setAttribute('class', elementClassName === '' ? className : elementClassName + " " + className);
        }
    };
    DomUtils.removeClassName = function (element, className) {
        var elementClassName = element.getAttribute && element.getAttribute('class');
        var updClassName = " " + elementClassName + " ";
        var newClassName = updClassName.replace(" " + className + " ", ' ');
        if (updClassName.length !== newClassName.length)
            element.setAttribute('class', string_1.StringUtils.trim(newClassName));
    };
    DomUtils.toggleClassName = function (element, className, toggle) {
        if (toggle === undefined) {
            if (DomUtils.hasClassName(element, className))
                DomUtils.removeClassName(element, className);
            else
                DomUtils.addClassName(element, className);
        }
        else {
            if (toggle)
                DomUtils.addClassName(element, className);
            else
                DomUtils.removeClassName(element, className);
        }
    };
    DomUtils.pxToInt = function (px) {
        return pxToNumber(px, parseInt);
    };
    DomUtils.pxToFloat = function (px) {
        return pxToNumber(px, parseFloat);
    };
    DomUtils.getAbsolutePositionY = function (element) {
        function getAbsolutePositionY_IE(element) {
            return browser_1.Browser.IE && element.parentNode === null ?
                0 :
                element.getBoundingClientRect().top + DomUtils.getDocumentScrollTop();
        }
        function getAbsolutePositionY_FF3(element) {
            return Math.round(element.getBoundingClientRect().top + DomUtils.getDocumentScrollTop());
        }
        function getAbsolutePositionY_Opera(curEl) {
            var isFirstCycle = true;
            if (curEl && DomUtils.isHTMLTableRowElement(curEl) && curEl.cells.length > 0)
                curEl = curEl.cells[0];
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, false);
            while (curEl != null) {
                pos += curEl.offsetTop;
                if (!isFirstCycle)
                    pos -= curEl.scrollTop;
                curEl = curEl.offsetParent;
                isFirstCycle = false;
            }
            pos += document.body.scrollTop;
            return pos;
        }
        function getAbsolutePositionY_NS(curEl) {
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, false);
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetTop;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollTop;
                if (!isFirstCycle && browser_1.Browser.Firefox) {
                    var style = DomUtils.getCurrentStyle(curEl);
                    if (curEl.tagName === 'DIV' && style.overflow !== 'visible')
                        pos += DomUtils.pxToInt(style.borderTopWidth);
                }
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        function getAbsolutePositionY_Other(curEl) {
            var pos = 0;
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetTop;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollTop;
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        if (!element)
            return 0;
        if (browser_1.Browser.IE)
            return getAbsolutePositionY_IE(element);
        else if (browser_1.Browser.Firefox && browser_1.Browser.Version >= 3)
            return getAbsolutePositionY_FF3(element);
        else if (browser_1.Browser.Opera)
            return getAbsolutePositionY_Opera(element);
        else if (browser_1.Browser.NetscapeFamily && (!browser_1.Browser.Firefox || browser_1.Browser.Version < 3))
            return getAbsolutePositionY_NS(element);
        else if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge)
            return getAbsolutePositionY_FF3(element);
        return getAbsolutePositionY_Other(element);
    };
    DomUtils.getAbsolutePositionX = function (element) {
        function getAbsolutePositionX_IE(element) {
            return browser_1.Browser.IE && element.parentNode === null ?
                0 :
                element.getBoundingClientRect().left + DomUtils.getDocumentScrollLeft();
        }
        function getAbsolutePositionX_FF3(element) {
            return Math.round(element.getBoundingClientRect().left + DomUtils.getDocumentScrollLeft());
        }
        function getAbsolutePositionX_Opera(curEl) {
            var isFirstCycle = true;
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, true);
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle)
                    pos -= curEl.scrollLeft;
                curEl = curEl.offsetParent;
                isFirstCycle = false;
            }
            pos += document.body.scrollLeft;
            return pos;
        }
        function getAbsolutePositionX_NS(curEl) {
            var pos = getAbsoluteScrollOffset_OperaFF(curEl, true);
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollLeft;
                if (!isFirstCycle && browser_1.Browser.Firefox) {
                    var style = DomUtils.getCurrentStyle(curEl);
                    if (curEl.tagName === 'DIV' && style.overflow !== 'visible')
                        pos += DomUtils.pxToInt(style.borderLeftWidth);
                }
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        function getAbsolutePositionX_Other(curEl) {
            var pos = 0;
            var isFirstCycle = true;
            while (curEl != null) {
                pos += curEl.offsetLeft;
                if (!isFirstCycle && curEl.offsetParent != null)
                    pos -= curEl.scrollLeft;
                isFirstCycle = false;
                curEl = curEl.offsetParent;
            }
            return pos;
        }
        if (!element)
            return 0;
        if (browser_1.Browser.IE)
            return getAbsolutePositionX_IE(element);
        else if (browser_1.Browser.Firefox && browser_1.Browser.Version >= 3)
            return getAbsolutePositionX_FF3(element);
        else if (browser_1.Browser.Opera)
            return getAbsolutePositionX_Opera(element);
        else if (browser_1.Browser.NetscapeFamily && (!browser_1.Browser.Firefox || browser_1.Browser.Version < 3))
            return getAbsolutePositionX_NS(element);
        else if (browser_1.Browser.WebKitFamily || browser_1.Browser.Edge)
            return getAbsolutePositionX_FF3(element);
        else
            return getAbsolutePositionX_Other(element);
    };
    DomUtils.isInteractiveControl = function (element) {
        return ['A', 'INPUT', 'SELECT', 'OPTION', 'TEXTAREA', 'BUTTON', 'IFRAME'].indexOf(element.tagName) > -1;
    };
    DomUtils.getClearClientHeight = function (element) {
        return element.offsetHeight - (DomUtils.getTopBottomPaddings(element) + DomUtils.getVerticalBordersWidth(element));
    };
    DomUtils.getTopBottomPaddings = function (element, style) {
        var currentStyle = style ? style : DomUtils.getCurrentStyle(element);
        return DomUtils.pxToInt(currentStyle.paddingTop) + DomUtils.pxToInt(currentStyle.paddingBottom);
    };
    DomUtils.getVerticalBordersWidth = function (element, style) {
        if (!common_1.isDefined(style))
            style = (browser_1.Browser.IE && browser_1.Browser.MajorVersion !== 9 && window.getComputedStyle) ? window.getComputedStyle(element) : DomUtils.getCurrentStyle(element);
        var res = 0;
        if (style.borderTopStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderTopWidth);
        if (style.borderBottomStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderBottomWidth);
        return res;
    };
    DomUtils.getNodes = function (parent, predicate) {
        var collection = parent.all || parent.getElementsByTagName('*');
        var result = [];
        for (var i = 0; i < collection.length; i++) {
            var element = collection[i];
            if (predicate(element))
                result.push(element);
        }
        return result;
    };
    DomUtils.getChildNodes = function (parent, predicate) {
        var collection = parent.childNodes;
        var result = [];
        for (var i = 0; i < collection.length; i++) {
            var element = collection[i];
            if (predicate(element))
                result.push(element);
        }
        return result;
    };
    DomUtils.getNodesByClassName = function (parent, className) {
        if (parent.querySelectorAll) {
            var children = parent.querySelectorAll("." + className);
            var result_1 = [];
            children.forEach(function (element) { return result_1.push(element); });
            return result_1;
        }
        else
            return DomUtils.getNodes(parent, function (elem) { return DomUtils.hasClassName(elem, className); });
    };
    DomUtils.getChildNodesByClassName = function (parent, className) {
        function nodeListToArray(nodeList, filter) {
            var result = [];
            nodeList.forEach(function (element) {
                if (filter(element))
                    result.push(element);
            });
            return result;
        }
        if (parent.querySelectorAll) {
            var children = parent.querySelectorAll("." + className);
            return nodeListToArray(children, function (element) { return element.parentNode === parent; });
        }
        else {
            return DomUtils.getChildNodes(parent, function (elem) {
                if (DomUtils.isElementNode(elem))
                    return common_1.isNonNullString(elem.className) && DomUtils.hasClassName(elem, elem.className);
                else
                    return false;
            });
        }
    };
    DomUtils.getVerticalScrollBarWidth = function () {
        if (DomUtils.verticalScrollBarWidth === undefined) {
            var container = document.createElement('DIV');
            container.style.cssText = 'position: absolute; top: 0px; left: 0px; visibility: hidden; width: 200px; height: 150px; overflow: hidden; box-sizing: content-box';
            document.body.appendChild(container);
            var child = document.createElement('P');
            container.appendChild(child);
            child.style.cssText = 'width: 100%; height: 200px;';
            var widthWithoutScrollBar = child.offsetWidth;
            container.style.overflow = 'scroll';
            var widthWithScrollBar = child.offsetWidth;
            if (widthWithoutScrollBar === widthWithScrollBar)
                widthWithScrollBar = container.clientWidth;
            DomUtils.verticalScrollBarWidth = widthWithoutScrollBar - widthWithScrollBar;
            document.body.removeChild(container);
        }
        return DomUtils.verticalScrollBarWidth;
    };
    DomUtils.getHorizontalBordersWidth = function (element, style) {
        if (!common_1.isDefined(style))
            style = (browser_1.Browser.IE && window.getComputedStyle) ? window.getComputedStyle(element) : DomUtils.getCurrentStyle(element);
        var res = 0;
        if (style.borderLeftStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderLeftWidth);
        if (style.borderRightStyle !== 'none')
            res += DomUtils.pxToFloat(style.borderRightWidth);
        return res;
    };
    DomUtils.getFontFamiliesFromCssString = function (cssString) {
        return cssString.split(',').map(function (fam) { return string_1.StringUtils.trim(fam.replace(/'|"/gi, '')); });
    };
    DomUtils.getInnerText = function (container) {
        if (browser_1.Browser.Safari && browser_1.Browser.MajorVersion <= 5) {
            if (DomUtils.html2PlainTextFilter === null) {
                DomUtils.html2PlainTextFilter = document.createElement('DIV');
                DomUtils.html2PlainTextFilter.style.width = '0';
                DomUtils.html2PlainTextFilter.style.height = '0';
                DomUtils.html2PlainTextFilter.style.overflow = 'visible';
                DomUtils.html2PlainTextFilter.style.display = 'none';
                document.body.appendChild(DomUtils.html2PlainTextFilter);
            }
            var filter = DomUtils.html2PlainTextFilter;
            filter.innerHTML = container.innerHTML;
            filter.style.display = '';
            var innerText = filter.innerText;
            filter.style.display = 'none';
            return innerText;
        }
        else if (browser_1.Browser.NetscapeFamily || browser_1.Browser.WebKitFamily || (browser_1.Browser.IE && browser_1.Browser.Version >= 9) || browser_1.Browser.Edge)
            return container.textContent;
        else
            return container.innerText;
    };
    DomUtils.html2PlainTextFilter = null;
    DomUtils.verticalScrollBarWidth = undefined;
    return DomUtils;
}());
exports.DomUtils = DomUtils;
function cloneObject(srcObject) {
    if (typeof (srcObject) !== 'object' || !common_1.isDefined(srcObject))
        return srcObject;
    var newObject = {};
    for (var i in srcObject)
        newObject[i] = srcObject[i];
    return newObject;
}
function pxToNumber(px, parseFunction) {
    var result = 0;
    if (common_1.isDefined(px) && px !== '') {
        try {
            var indexOfPx = px.indexOf('px');
            if (indexOfPx > -1)
                result = parseFunction(px.substr(0, indexOfPx));
        }
        catch (e) { }
    }
    return result;
}
function getAbsoluteScrollOffset_OperaFF(curEl, isX) {
    var pos = 0;
    var isFirstCycle = true;
    while (curEl != null) {
        if (curEl.tagName === 'BODY')
            break;
        var style = DomUtils.getCurrentStyle(curEl);
        if (style.position === 'absolute')
            break;
        if (!isFirstCycle && curEl.tagName === 'DIV' && (style.position === '' || style.position === 'static'))
            pos -= isX ? curEl.scrollLeft : curEl.scrollTop;
        curEl = curEl.parentNode;
        isFirstCycle = false;
    }
    return pos;
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.zero = function () {
        return new Point(0, 0);
    };
    Point.fromNumber = function (num) {
        return new Point(num, num);
    };
    Point.prototype.isZero = function () {
        return this.x === 0 && this.y === 0;
    };
    Point.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Point.prototype.copyFrom = function (obj) {
        this.x = obj.x;
        this.y = obj.y;
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.equals = function (obj) {
        return this.x === obj.x && this.y === obj.y;
    };
    Point.prototype.offset = function (offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
        return this;
    };
    Point.prototype.offsetByPoint = function (offset) {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    };
    Point.prototype.multiply = function (multiplierX, multiplierY) {
        this.x *= multiplierX;
        this.y *= multiplierY;
        return this;
    };
    Point.prototype.negative = function () {
        this.x *= -1;
        this.y *= -1;
        return this;
    };
    Point.prototype.applyConverter = function (converter) {
        this.x = converter(this.x);
        this.y = converter(this.y);
        return this;
    };
    Point.plus = function (a, b) {
        return new Point(a.x + b.x, a.y + b.y);
    };
    Point.minus = function (a, b) {
        return new Point(a.x - b.x, a.y - b.y);
    };
    Point.xComparer = function (a, b) {
        return a.x - b.x;
    };
    Point.yComparer = function (a, b) {
        return a.y - b.y;
    };
    Point.equals = function (a, b) {
        return a.x === b.x && a.y === b.y;
    };
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeUtils = void 0;
var Time_1 = __webpack_require__(46);
var TimeRange_1 = __webpack_require__(47);
var common_1 = __webpack_require__(1);
var DateRange_1 = __webpack_require__(10);
var DayOfWeekMonthlyOccurrence_1 = __webpack_require__(48);
var DateTimeUtils = (function () {
    function DateTimeUtils() {
    }
    DateTimeUtils.compareDates = function (date1, date2) {
        if (!date1 || !date2)
            return -1;
        return date2.getTime() - date1.getTime();
    };
    DateTimeUtils.areDatesEqual = function (date1, date2) {
        return this.compareDates(date1, date2) == 0;
    };
    DateTimeUtils.getMaxDate = function (date1, date2) {
        if (!date1 && !date2)
            return null;
        if (!date1)
            return date2;
        if (!date2)
            return date1;
        var diff = this.compareDates(date1, date2);
        return diff > 0 ? date2 : date1;
    };
    DateTimeUtils.getMinDate = function (date1, date2) {
        if (!date1 && !date2)
            return null;
        if (!date1)
            return date2;
        if (!date2)
            return date1;
        var diff = this.compareDates(date1, date2);
        return diff > 0 ? date1 : date2;
    };
    DateTimeUtils.getDaysBetween = function (start, end) {
        var diff = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diff / this.msInDay);
    };
    DateTimeUtils.getWeeksBetween = function (start, end) {
        var daysBetween = this.getDaysBetween(start, end);
        var numWeeks = Math.floor(daysBetween / 7);
        if (start.getDay() > end.getDay())
            numWeeks++;
        return numWeeks;
    };
    DateTimeUtils.getMonthsDifference = function (start, end) {
        var dateDiff = this.compareDates(start, end);
        var from = dateDiff >= 0 ? start : end;
        var to = dateDiff >= 0 ? end : start;
        var yearsDiff = to.getFullYear() - from.getFullYear();
        var monthDiff = yearsDiff * 12 + (to.getMonth() - from.getMonth());
        return monthDiff;
    };
    DateTimeUtils.getYearsDifference = function (start, end) {
        return Math.abs(end.getFullYear() - start.getFullYear());
    };
    DateTimeUtils.getDayNumber = function (date) {
        return Math.ceil(date.getTime() / this.msInDay);
    };
    DateTimeUtils.getDateByDayNumber = function (num) {
        var date = new Date(num * this.msInDay);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    };
    DateTimeUtils.addDays = function (date, days) {
        return new Date(date.getTime() + days * this.msInDay);
    };
    DateTimeUtils.checkDayOfMonth = function (day, date) {
        return day == date.getDate();
    };
    DateTimeUtils.checkDayOfWeek = function (day, date) {
        return day == date.getDay();
    };
    DateTimeUtils.checkMonth = function (month, date) {
        return month == date.getMonth();
    };
    DateTimeUtils.checkYear = function (year, date) {
        return year == date.getFullYear();
    };
    DateTimeUtils.checkDayOfWeekOccurrenceInMonth = function (date, dayOfWeek, occurrence) {
        var dayOfWeekInMonthDates = this.getSpecificDayOfWeekInMonthDates(dayOfWeek, date.getFullYear(), date.getMonth());
        if (occurrence == DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence.Last)
            return this.areDatesEqual(date, dayOfWeekInMonthDates[dayOfWeekInMonthDates.length - 1]);
        return this.areDatesEqual(date, dayOfWeekInMonthDates[occurrence]);
    };
    DateTimeUtils.getFirstDayOfWeekInMonth = function (year, month) {
        var date = new Date(year, month, 1);
        return date.getDay();
    };
    DateTimeUtils.getSpecificDayOfWeekInMonthDates = function (dayOfWeek, year, month) {
        var firstDayOfWeekInMonth = this.getFirstDayOfWeekInMonth(year, month);
        var diffDays = dayOfWeek >= firstDayOfWeekInMonth ? dayOfWeek - firstDayOfWeekInMonth : dayOfWeek + 7 - firstDayOfWeekInMonth;
        var res = new Array();
        var specificDayOfWeekDate = new Date(year, month, diffDays + 1);
        while (specificDayOfWeekDate.getMonth() == month) {
            res.push(specificDayOfWeekDate);
            specificDayOfWeekDate = this.addDays(specificDayOfWeekDate, 7);
        }
        return res;
    };
    DateTimeUtils.getSpecificDayOfWeekInMonthDate = function (dayOfWeek, year, month, occurrence) {
        var dates = this.getSpecificDayOfWeekInMonthDates(dayOfWeek, year, month);
        if (occurrence == DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence.Last)
            return dates[dates.length - 1];
        return dates[occurrence];
    };
    DateTimeUtils.checkValidDayInMonth = function (year, month, day) {
        if (day < 1 || day > 31 || (new Date(year, month, day)).getMonth() != month)
            return false;
        return true;
    };
    DateTimeUtils.getNextMonth = function (month, inc) {
        if (inc === void 0) { inc = 1; }
        return (month + inc) % 12;
    };
    DateTimeUtils.convertToDate = function (src) {
        if (src instanceof Date)
            return new Date(src);
        var ms = Date.parse(src);
        if (!isNaN(ms))
            return new Date(ms);
        return null;
    };
    DateTimeUtils.convertTimeRangeToDateRange = function (timeRange, dayNumber) {
        var date = this.getDateByDayNumber(dayNumber);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var startT = timeRange.start;
        var start = new Date(year, month, day, startT.hour, startT.min, startT.sec, startT.msec);
        var endT = timeRange.end;
        var end = new Date(year, month, day, endT.hour, endT.min, endT.sec, endT.msec);
        return new DateRange_1.DateRange(start, end);
    };
    DateTimeUtils.convertToTimeRanges = function (src) {
        var _this = this;
        if (src instanceof Array)
            return src.map(function (x) { return _this.convertToTimeRange(x); });
        return this.parseTimeRanges(src);
    };
    DateTimeUtils.convertToTimeRange = function (src) {
        if (!src)
            return null;
        if (src instanceof TimeRange_1.TimeRange)
            return src;
        if (common_1.isDefined(src.start) && common_1.isDefined(src.end))
            return new TimeRange_1.TimeRange(this.convertToTime(src.start), this.convertToTime(src.end));
        return this.parseTimeRange(src);
    };
    DateTimeUtils.convertToTime = function (src) {
        if (!src)
            return null;
        if (src instanceof Time_1.Time)
            return src;
        if (src instanceof Date)
            return this.getTimeGromJsDate(src);
        return this.parseTime(src);
    };
    DateTimeUtils.parseTimeRanges = function (src) {
        var _this = this;
        if (!src)
            return null;
        var parts = src.split(/;|,/);
        return parts.map(function (p) { return _this.parseTimeRange(p); }).filter(function (r) { return !!r; });
    };
    DateTimeUtils.parseTimeRange = function (src) {
        if (!src)
            return null;
        var parts = src.split("-");
        var start = parts[0];
        var end = parts[1];
        if (common_1.isDefined(start) && common_1.isDefined(end))
            return new TimeRange_1.TimeRange(this.parseTime(start), this.parseTime(end));
        return null;
    };
    DateTimeUtils.parseTime = function (src) {
        if (!src)
            return null;
        var parts = src.split(":");
        var h = parseInt(parts[0]) || 0;
        var m = parseInt(parts[1]) || 0;
        var s = parseInt(parts[2]) || 0;
        var ms = parseInt(parts[3]) || 0;
        return new Time_1.Time(h, m, s, ms);
    };
    DateTimeUtils.getTimeGromJsDate = function (date) {
        if (!date)
            return null;
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var ms = date.getMilliseconds();
        return new Time_1.Time(h, m, s, ms);
    };
    DateTimeUtils.caclTimeDifference = function (time1, time2) {
        return time2.getTimeInMilleconds() - time1.getTimeInMilleconds();
    };
    DateTimeUtils.areTimesEqual = function (time1, time2) {
        return this.caclTimeDifference(time1, time2) == 0;
    };
    DateTimeUtils.getMaxTime = function (time1, time2) {
        if (!time1 && !time2)
            return null;
        if (!time1)
            return time2;
        if (!time2)
            return time1;
        var diff = this.caclTimeDifference(time1, time2);
        return diff > 0 ? time2 : time1;
    };
    DateTimeUtils.getMinTime = function (time1, time2) {
        if (!time1 && !time2)
            return null;
        if (!time1)
            return time2;
        if (!time2)
            return time1;
        var diff = this.caclTimeDifference(time1, time2);
        return diff > 0 ? time1 : time2;
    };
    DateTimeUtils.getLastTimeOfDay = function () {
        return new Time_1.Time(23, 59, 59, 999);
    };
    DateTimeUtils.msInDay = 24 * 3600 * 1000;
    return DateTimeUtils;
}());
exports.DateTimeUtils = DateTimeUtils;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Browser = (function () {
    function Browser() {
    }
    Browser.IdentUserAgent = function (userAgent, ignoreDocumentMode) {
        if (ignoreDocumentMode === void 0) { ignoreDocumentMode = false; }
        var browserTypesOrderedList = ['Mozilla', 'IE', 'Firefox', 'Netscape', 'Safari', 'Chrome', 'Opera', 'Opera10', 'Edge'];
        var defaultBrowserType = 'IE';
        var defaultPlatform = 'Win';
        var defaultVersions = { Safari: 2, Chrome: 0.1, Mozilla: 1.9, Netscape: 8, Firefox: 2, Opera: 9, IE: 6, Edge: 12 };
        if (!userAgent || userAgent.length === 0) {
            Browser.fillUserAgentInfo(browserTypesOrderedList, defaultBrowserType, defaultVersions[defaultBrowserType], defaultPlatform);
            return;
        }
        userAgent = userAgent.toLowerCase();
        Browser.indentPlatformMajorVersion(userAgent);
        try {
            var platformIdentStrings = {
                'Windows': 'Win',
                'Macintosh': 'Mac',
                'Mac OS': 'Mac',
                'Mac_PowerPC': 'Mac',
                'cpu os': 'MacMobile',
                'cpu iphone os': 'MacMobile',
                'Android': 'Android',
                '!Windows Phone': 'WinPhone',
                '!WPDesktop': 'WinPhone',
                '!ZuneWP': 'WinPhone'
            };
            var optSlashOrSpace = '(?:/|\\s*)?';
            var versionString = '(\\d+)(?:\\.((?:\\d+?[1-9])|\\d)0*?)?';
            var optVersion = '(?:' + versionString + ')?';
            var patterns = {
                Safari: 'applewebkit(?:.*?(?:version/' + versionString + '[\\.\\w\\d]*?(?:\\s+mobile/\\S*)?\\s+safari))?',
                Chrome: '(?:chrome|crios)(?!frame)' + optSlashOrSpace + optVersion,
                Mozilla: 'mozilla(?:.*rv:' + optVersion + '.*Gecko)?',
                Netscape: '(?:netscape|navigator)\\d*/?\\s*' + optVersion,
                Firefox: 'firefox' + optSlashOrSpace + optVersion,
                Opera: '(?:opera|\\sopr)' + optSlashOrSpace + optVersion,
                Opera10: 'opera.*\\s*version' + optSlashOrSpace + optVersion,
                IE: 'msie\\s*' + optVersion,
                Edge: 'edge' + optSlashOrSpace + optVersion
            };
            var browserType = null;
            var version = -1;
            for (var i = 0; i < browserTypesOrderedList.length; i++) {
                var browserTypeCandidate = browserTypesOrderedList[i];
                var regExp = new RegExp(patterns[browserTypeCandidate], 'i');
                var matches = regExp.exec(userAgent);
                if (matches && matches.index >= 0) {
                    if (browserType === 'IE' && version >= 11 && browserTypeCandidate === 'Safari')
                        continue;
                    browserType = browserTypeCandidate;
                    if (browserType === 'Opera10')
                        browserType = 'Opera';
                    var tridentPattern = 'trident' + optSlashOrSpace + optVersion;
                    version = Browser.GetBrowserVersion(userAgent, matches, tridentPattern, Browser.getIECompatibleVersionString());
                    if (browserType === 'Mozilla' && version >= 11)
                        browserType = 'IE';
                }
            }
            if (!browserType)
                browserType = defaultBrowserType;
            var browserVersionDetected = version !== -1;
            if (!browserVersionDetected)
                version = defaultVersions[browserType];
            var platform = null;
            var minOccurenceIndex = Number.MAX_VALUE;
            for (var identStr in platformIdentStrings) {
                if (!Object.prototype.hasOwnProperty.call(platformIdentStrings, identStr))
                    continue;
                var importantIdent = identStr.substr(0, 1) === '!';
                var occurenceIndex = userAgent.indexOf((importantIdent ? identStr.substr(1) : identStr).toLowerCase());
                if (occurenceIndex >= 0 && (occurenceIndex < minOccurenceIndex || importantIdent)) {
                    minOccurenceIndex = importantIdent ? 0 : occurenceIndex;
                    platform = platformIdentStrings[identStr];
                }
            }
            var samsungPattern = 'SM-[A-Z]';
            var m = userAgent.toUpperCase().match(samsungPattern);
            var isSamsungAndroidDevice = m && m.length > 0;
            if (platform === 'WinPhone' && version < 9)
                version = Math.floor(Browser.getVersionFromTrident(userAgent, 'trident' + optSlashOrSpace + optVersion));
            if (!ignoreDocumentMode && browserType === 'IE' && version > 7 && document.documentMode < version)
                version = document.documentMode;
            if (platform === 'WinPhone')
                version = Math.max(9, version);
            if (!platform)
                platform = defaultPlatform;
            if (platform === platformIdentStrings['cpu os'] && !browserVersionDetected)
                version = 4;
            Browser.fillUserAgentInfo(browserTypesOrderedList, browserType, version, platform, isSamsungAndroidDevice);
        }
        catch (e) {
            Browser.fillUserAgentInfo(browserTypesOrderedList, defaultBrowserType, defaultVersions[defaultBrowserType], defaultPlatform);
        }
    };
    Browser.GetBrowserVersion = function (userAgent, matches, tridentPattern, ieCompatibleVersionString) {
        var version = Browser.getVersionFromMatches(matches);
        if (ieCompatibleVersionString) {
            var versionFromTrident = Browser.getVersionFromTrident(userAgent, tridentPattern);
            if (ieCompatibleVersionString === 'edge' || parseInt(ieCompatibleVersionString) === versionFromTrident)
                return versionFromTrident;
        }
        return version;
    };
    Browser.getIECompatibleVersionString = function () {
        if (document.compatible) {
            for (var i = 0; i < document.compatible.length; i++) {
                if (document.compatible[i].userAgent === 'IE' && document.compatible[i].version)
                    return document.compatible[i].version.toLowerCase();
            }
        }
        return '';
    };
    Browser.isTouchEnabled = function () {
        return ('ontouchstart' in window) ||
            (navigator['maxTouchPoints'] > 0) ||
            (navigator['msMaxTouchPoints'] > 0);
    };
    Browser.fillUserAgentInfo = function (browserTypesOrderedList, browserType, version, platform, isSamsungAndroidDevice) {
        if (isSamsungAndroidDevice === void 0) { isSamsungAndroidDevice = false; }
        for (var i = 0; i < browserTypesOrderedList.length; i++) {
            var type = browserTypesOrderedList[i];
            Browser[type] = type === browserType;
        }
        Browser.Version = Math.floor(10.0 * version) / 10.0;
        Browser.MajorVersion = Math.floor(Browser.Version);
        Browser.WindowsPlatform = platform === 'Win' || platform === 'WinPhone';
        Browser.MacOSMobilePlatform = platform === 'MacMobile' || (platform === 'Mac' && Browser.isTouchEnabled());
        Browser.MacOSPlatform = platform === 'Mac' && !Browser.MacOSMobilePlatform;
        Browser.AndroidMobilePlatform = platform === 'Android';
        Browser.WindowsPhonePlatform = platform === 'WinPhone';
        Browser.WebKitFamily = Browser.Safari || Browser.Chrome || Browser.Opera && Browser.MajorVersion >= 15;
        Browser.NetscapeFamily = Browser.Netscape || Browser.Mozilla || Browser.Firefox;
        Browser.HardwareAcceleration = (Browser.IE && Browser.MajorVersion >= 9) || (Browser.Firefox && Browser.MajorVersion >= 4) ||
            (Browser.AndroidMobilePlatform && Browser.Chrome) || (Browser.Chrome && Browser.MajorVersion >= 37) ||
            (Browser.Safari && !Browser.WindowsPlatform) || Browser.Edge || (Browser.Opera && Browser.MajorVersion >= 46);
        Browser.WebKitTouchUI = Browser.MacOSMobilePlatform || Browser.AndroidMobilePlatform;
        var isIETouchUI = Browser.IE && Browser.MajorVersion > 9 && Browser.WindowsPlatform && Browser.UserAgent.toLowerCase().indexOf('touch') >= 0;
        Browser.MSTouchUI = isIETouchUI || (Browser.Edge && !!window.navigator.maxTouchPoints);
        Browser.TouchUI = Browser.WebKitTouchUI || Browser.MSTouchUI;
        Browser.MobileUI = Browser.WebKitTouchUI || Browser.WindowsPhonePlatform;
        Browser.AndroidDefaultBrowser = Browser.AndroidMobilePlatform && !Browser.Chrome;
        Browser.AndroidChromeBrowser = Browser.AndroidMobilePlatform && Browser.Chrome;
        if (isSamsungAndroidDevice)
            Browser.SamsungAndroidDevice = isSamsungAndroidDevice;
        if (Browser.MSTouchUI) {
            var isARMArchitecture = Browser.UserAgent.toLowerCase().indexOf('arm;') > -1;
            Browser.VirtualKeyboardSupported = isARMArchitecture || Browser.WindowsPhonePlatform;
        }
        else
            Browser.VirtualKeyboardSupported = Browser.WebKitTouchUI;
        Browser.fillDocumentElementBrowserTypeClassNames(browserTypesOrderedList);
    };
    Browser.indentPlatformMajorVersion = function (userAgent) {
        var regex = /(?:(?:windows nt|macintosh|mac os|cpu os|cpu iphone os|android|windows phone|linux) )(\d+)(?:[-0-9_.])*/;
        var matches = regex.exec(userAgent);
        if (matches)
            Browser.PlaformMajorVersion = matches[1];
    };
    Browser.getVersionFromMatches = function (matches) {
        var result = -1;
        var versionStr = '';
        if (matches) {
            if (matches[1]) {
                versionStr += matches[1];
                if (matches[2])
                    versionStr += '.' + matches[2];
            }
            if (versionStr !== '') {
                result = parseFloat(versionStr);
                if (isNaN(result))
                    result = -1;
            }
        }
        return result;
    };
    Browser.getVersionFromTrident = function (userAgent, tridentPattern) {
        var tridentDiffFromVersion = 4;
        var matches = new RegExp(tridentPattern, 'i').exec(userAgent);
        return Browser.getVersionFromMatches(matches) + tridentDiffFromVersion;
    };
    Browser.fillDocumentElementBrowserTypeClassNames = function (browserTypesOrderedList) {
        var documentElementClassName = '';
        var browserTypeslist = browserTypesOrderedList.concat(['WindowsPlatform', 'MacOSPlatform', 'MacOSMobilePlatform', 'AndroidMobilePlatform',
            'WindowsPhonePlatform', 'WebKitFamily', 'WebKitTouchUI', 'MSTouchUI', 'TouchUI', 'AndroidDefaultBrowser']);
        for (var i = 0; i < browserTypeslist.length; i++) {
            var type = browserTypeslist[i];
            if (Browser[type])
                documentElementClassName += 'dx' + type + ' ';
        }
        documentElementClassName += 'dxBrowserVersion-' + Browser.MajorVersion;
        if (typeof document !== 'undefined' && document && document.documentElement) {
            if (document.documentElement.className !== '')
                documentElementClassName = ' ' + documentElementClassName;
            document.documentElement.className += documentElementClassName;
            Browser.Info = documentElementClassName;
        }
    };
    Browser.getUserAgent = function () {
        return typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
    };
    Browser.UserAgent = Browser.getUserAgent();
    Browser._foo = Browser.IdentUserAgent(Browser.UserAgent);
    return Browser;
}());
exports.Browser = Browser;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = __webpack_require__(5);
var common_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(2);
var touch_1 = __webpack_require__(18);
var EvtUtils = (function () {
    function EvtUtils() {
    }
    EvtUtils.preventEvent = function (evt) {
        if (evt.preventDefault)
            evt.preventDefault();
        else
            evt.returnValue = false;
    };
    EvtUtils.getEventSource = function (evt) {
        if (!common_1.isDefined(evt))
            return null;
        return evt.srcElement ? evt.srcElement : evt.target;
    };
    EvtUtils.getEventSourceByPosition = function (evt) {
        if (!common_1.isDefined(evt))
            return null;
        if (document.elementFromPoint && EvtUtils.getEventX(evt) !== undefined && EvtUtils.getEventY(evt) !== undefined)
            return document.elementFromPoint(EvtUtils.getEventX(evt), EvtUtils.getEventY(evt));
        return evt.srcElement ? evt.srcElement : evt.target;
    };
    EvtUtils.getMouseWheelEventName = function () {
        if (browser_1.Browser.Safari)
            return 'mousewheel';
        if (browser_1.Browser.NetscapeFamily && browser_1.Browser.MajorVersion < 17)
            return 'DOMMouseScroll';
        return 'wheel';
    };
    EvtUtils.isLeftButtonPressed = function (evt) {
        if (touch_1.TouchUtils.isTouchEvent(evt))
            return true;
        evt = (browser_1.Browser.IE && common_1.isDefined(event)) ? event : evt;
        if (!evt)
            return false;
        if (browser_1.Browser.IE && browser_1.Browser.Version < 11) {
            if (browser_1.Browser.MSTouchUI)
                return true;
            return evt.button % 2 === 1;
        }
        else if (browser_1.Browser.WebKitFamily) {
            if (evt.type === 'pointermove')
                return evt.buttons === 1;
            return evt.which === 1;
        }
        else if (browser_1.Browser.NetscapeFamily || browser_1.Browser.Edge || (browser_1.Browser.IE && browser_1.Browser.Version >= 11)) {
            if (evt.type === touch_1.TouchUtils.touchMouseMoveEventName)
                return evt.buttons === 1;
            return evt.which === 1;
        }
        else if (browser_1.Browser.Opera)
            return evt.button === 0;
        return true;
    };
    EvtUtils.preventEventAndBubble = function (evt) {
        EvtUtils.preventEvent(evt);
        if (evt.stopPropagation)
            evt.stopPropagation();
        evt.cancelBubble = true;
    };
    EvtUtils.clientEventRequiresDocScrollCorrection = function () {
        var isSafariVerLess3 = browser_1.Browser.Safari && browser_1.Browser.Version < 3;
        var isMacOSMobileVerLess51 = browser_1.Browser.MacOSMobilePlatform && browser_1.Browser.Version < 5.1;
        return browser_1.Browser.AndroidDefaultBrowser || browser_1.Browser.AndroidChromeBrowser || !(isSafariVerLess3 || isMacOSMobileVerLess51);
    };
    EvtUtils.getEventX = function (evt) {
        if (touch_1.TouchUtils.isTouchEvent(evt))
            return touch_1.TouchUtils.getEventX(evt);
        return evt.clientX + (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom_1.DomUtils.getDocumentScrollLeft() : 0);
    };
    EvtUtils.getEventY = function (evt) {
        if (touch_1.TouchUtils.isTouchEvent(evt))
            return touch_1.TouchUtils.getEventY(evt);
        return evt.clientY + (EvtUtils.clientEventRequiresDocScrollCorrection() ? dom_1.DomUtils.getDocumentScrollTop() : 0);
    };
    EvtUtils.cancelBubble = function (evt) {
        evt.cancelBubble = true;
    };
    EvtUtils.getWheelDelta = function (evt) {
        var ret;
        if (browser_1.Browser.NetscapeFamily && browser_1.Browser.MajorVersion < 17)
            ret = -evt.detail;
        else if (browser_1.Browser.Safari)
            ret = evt.wheelDelta;
        else
            ret = -evt.deltaY;
        if (browser_1.Browser.Opera && browser_1.Browser.Version < 9)
            ret = -ret;
        return ret;
    };
    return EvtUtils;
}());
exports.EvtUtils = EvtUtils;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleCommandState = exports.CommandBase = void 0;
var CommandBase = (function () {
    function CommandBase(control) {
        this.control = control;
    }
    Object.defineProperty(CommandBase.prototype, "modelManipulator", {
        get: function () { return this.control.modelManipulator; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "history", {
        get: function () { return this.control.history; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "validationController", {
        get: function () { return this.control.validationController; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "state", {
        get: function () {
            if (!this._state)
                this._state = this.getState();
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    CommandBase.prototype.execute = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        if (!this.state.enabled)
            return false;
        var executed = this.executeInternal.apply(this, parameters);
        if (executed)
            this.control.barManager.updateItemsState([]);
        return executed;
    };
    CommandBase.prototype.isEnabled = function () {
        return this.control.settings.editing.enabled;
    };
    CommandBase.prototype.executeInternal = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        throw new Error("Not implemented");
    };
    return CommandBase;
}());
exports.CommandBase = CommandBase;
var SimpleCommandState = (function () {
    function SimpleCommandState(enabled, value) {
        this.visible = true;
        this.enabled = enabled;
        this.value = value;
    }
    return SimpleCommandState;
}());
exports.SimpleCommandState = SimpleCommandState;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAreaManager = exports.MouseEventSource = void 0;
var browser_1 = __webpack_require__(5);
var point_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(2);
var evt_1 = __webpack_require__(6);
var touch_1 = __webpack_require__(18);
var GridLayoutCalculator_1 = __webpack_require__(14);
var MouseEventSource;
(function (MouseEventSource) {
    MouseEventSource[MouseEventSource["TaskArea"] = 0] = "TaskArea";
    MouseEventSource[MouseEventSource["TaskEdit_Frame"] = 1] = "TaskEdit_Frame";
    MouseEventSource[MouseEventSource["TaskEdit_Progress"] = 2] = "TaskEdit_Progress";
    MouseEventSource[MouseEventSource["TaskEdit_Start"] = 3] = "TaskEdit_Start";
    MouseEventSource[MouseEventSource["TaskEdit_End"] = 4] = "TaskEdit_End";
    MouseEventSource[MouseEventSource["TaskEdit_DependencyStart"] = 5] = "TaskEdit_DependencyStart";
    MouseEventSource[MouseEventSource["TaskEdit_DependencyFinish"] = 6] = "TaskEdit_DependencyFinish";
    MouseEventSource[MouseEventSource["Successor_Wrapper"] = 7] = "Successor_Wrapper";
    MouseEventSource[MouseEventSource["Successor_DependencyStart"] = 8] = "Successor_DependencyStart";
    MouseEventSource[MouseEventSource["Successor_DependencyFinish"] = 9] = "Successor_DependencyFinish";
})(MouseEventSource = exports.MouseEventSource || (exports.MouseEventSource = {}));
var TaskAreaManager = (function () {
    function TaskAreaManager(ganttView) {
        this.time = new Date();
        this.touchTime = new Date();
        this.ganttView = ganttView;
        this.eventManager = ganttView.eventManager;
        this.position = new point_1.Point(-1, -1);
        if (!browser_1.Browser.WebKitTouchUI)
            this.initMouseEvents();
        if (browser_1.Browser.isTouchEnabled())
            this.initTouchEvents();
    }
    TaskAreaManager.prototype.initMouseEventHandlers = function () {
        var _this = this;
        this.onMouseClickHandler = function (evt) { _this.onTaskAreaClick(evt); };
        this.onMouseDblClickHandler = function (evt) { _this.onTaskAreaDblClick(evt); };
        this.onScrollHandler = this.ganttView.updateView.bind(this.ganttView);
        this.onContextMenuHandler = function (evt) { _this.onContextMenu(evt); };
        this.onMouseWheelHandler = function (evt) { _this.onMouseWheel(evt); };
        this.onMouseDownHandler = function (evt) { _this.onMouseDown(evt); };
        this.onMouseMoveHandler = function (evt) { _this.onDocumentMouseMove(evt); };
        this.onMouseUpHandler = function (evt) { _this.onDocumentMouseUp(evt); };
        this.onKeyDownHandler = function (evt) { _this.onDocumentKeyDown(evt); };
    };
    TaskAreaManager.prototype.initTouchEventHandlers = function () {
        var _this = this;
        this.onTouchStartHandler = function (evt) { _this.onTouchStart(evt); };
        this.onTouchEndHandler = function (evt) { _this.onTouchEnd(evt); };
        this.onTouchMoveHandler = function (evt) { _this.onTouchMove(evt); };
        this.onPointerDownHandler = function (evt) { _this.onMouseDown(evt); };
        this.onPointerUpHandler = function (evt) { _this.onDocumentMouseUp(evt); };
        this.onPointerMoveHandler = function (evt) { _this.onDocumentMouseMove(evt); };
    };
    TaskAreaManager.prototype.initMouseEvents = function () {
        this.initMouseEventHandlers();
        this.ganttView.taskArea.addEventListener("click", this.onMouseClickHandler);
        this.ganttView.taskArea.addEventListener("dblclick", this.onMouseDblClickHandler);
        this.ganttView.taskArea.addEventListener("scroll", this.onScrollHandler);
        this.ganttView.taskArea.addEventListener("contextmenu", this.onContextMenuHandler);
        this.ganttView.taskArea.addEventListener(evt_1.EvtUtils.getMouseWheelEventName(), this.onMouseWheelHandler);
        this.ganttView.taskArea.addEventListener("mousedown", this.onMouseDownHandler);
        document.addEventListener("mousemove", this.onMouseMoveHandler);
        document.addEventListener("mouseup", this.onMouseUpHandler);
        document.addEventListener("keydown", this.onKeyDownHandler);
    };
    TaskAreaManager.prototype.detachMouseEvents = function () {
        this.initTouchEventHandlers();
        this.ganttView.taskArea.removeEventListener("click", this.onMouseClickHandler);
        this.ganttView.taskArea.removeEventListener("dblclick", this.onMouseDblClickHandler);
        this.ganttView.taskArea.removeEventListener("scroll", this.onScrollHandler);
        this.ganttView.taskArea.removeEventListener("contextmenu", this.onContextMenuHandler);
        this.ganttView.taskArea.removeEventListener(evt_1.EvtUtils.getMouseWheelEventName(), this.onMouseWheelHandler);
        this.ganttView.taskArea.removeEventListener("mousedown", this.onMouseDownHandler);
        document.removeEventListener("mousemove", this.onMouseMoveHandler);
        document.removeEventListener("mouseup", this.onMouseUpHandler);
        document.removeEventListener("keydown", this.onKeyDownHandler);
    };
    TaskAreaManager.prototype.initTouchEvents = function () {
        if (browser_1.Browser.WebKitTouchUI || browser_1.Browser.WindowsPlatform && !browser_1.Browser.Edge && !browser_1.Browser.IE) {
            this.ganttView.taskArea.addEventListener("touchstart", this.onTouchStartHandler);
            this.ganttView.taskArea.addEventListener("touchend", this.onTouchEndHandler);
            this.ganttView.taskArea.addEventListener("touchmove", this.onTouchMoveHandler);
        }
        else if (browser_1.Browser.MSTouchUI) {
            this.ganttView.taskArea.classList.add(TaskAreaManager.MS_POINTER_ACTIVE_CLASS);
            this.ganttView.taskArea.addEventListener("pointerdown", this.onPointerDownHandler);
            this.ganttView.taskArea.addEventListener("pointerup", this.onPointerUpHandler);
            this.ganttView.taskArea.addEventListener("pointermove", this.onPointerMoveHandler);
        }
    };
    TaskAreaManager.prototype.detachTouchEvents = function () {
        this.ganttView.taskArea.removeEventListener("touchstart", this.onTouchStartHandler);
        this.ganttView.taskArea.removeEventListener("touchend", this.onTouchEndHandler);
        this.ganttView.taskArea.removeEventListener("touchmove", this.onTouchMoveHandler);
        this.ganttView.taskArea.removeEventListener("pointerdown", this.onPointerDownHandler);
        this.ganttView.taskArea.removeEventListener("pointerup", this.onPointerUpHandler);
        this.ganttView.taskArea.removeEventListener("pointermove", this.onPointerMoveHandler);
    };
    TaskAreaManager.prototype.attachEventsOnTask = function (taskElement) {
        var _this = this;
        this.onTaskMouseEnterHandler = function (evt) {
            if (browser_1.Browser.MSTouchUI)
                setTimeout(function () { return _this.onTaskElementHover(evt); }, 0);
            else
                _this.onTaskElementHover(evt);
        };
        this.onTaskMouseLeaveHandler = function () {
            _this.onTaskElementUnhover();
        };
        taskElement === null || taskElement === void 0 ? void 0 : taskElement.addEventListener("mouseenter", this.onTaskMouseEnterHandler);
        taskElement === null || taskElement === void 0 ? void 0 : taskElement.addEventListener("mouseleave", this.onTaskMouseLeaveHandler);
    };
    TaskAreaManager.prototype.detachEventsOnTask = function (taskElement) {
        taskElement === null || taskElement === void 0 ? void 0 : taskElement.removeEventListener("mouseenter", this.onTaskMouseEnterHandler);
        taskElement === null || taskElement === void 0 ? void 0 : taskElement.removeEventListener("mouseleave", this.onTaskMouseLeaveHandler);
    };
    TaskAreaManager.prototype.detachEvents = function () {
        this.detachMouseEvents();
        this.detachTouchEvents();
    };
    TaskAreaManager.prototype.onMouseDown = function (evt) {
        this.eventManager.onMouseDown(evt);
        this.preventSelect = false;
        this.position = new point_1.Point(evt.clientX, evt.clientY);
    };
    TaskAreaManager.prototype.onDocumentMouseUp = function (evt) {
        this.eventManager.onMouseUp(evt);
    };
    TaskAreaManager.prototype.onChangeTaskSelection = function (evt) {
        var _this = this;
        var clickedTaskIndex = this.getClickedTaskIndex(evt);
        this.ganttView.isFocus = dom_1.DomUtils.isItParent(this.ganttView.taskArea, evt_1.EvtUtils.getEventSource(evt));
        if (this.ganttView.isFocus && !this.preventSelect && this.ganttView.settings.allowSelectTask && !this.isConnectorLine(evt))
            setTimeout(function () { _this.changeTaskSelection(clickedTaskIndex); }, 0);
    };
    TaskAreaManager.prototype.onMouseWheel = function (evt) {
        this.eventManager.onMouseWheel(evt);
    };
    TaskAreaManager.prototype.onDocumentKeyDown = function (evt) {
        this.eventManager.onKeyDown(evt);
    };
    TaskAreaManager.prototype.onDocumentMouseMove = function (evt) {
        if (this.position.x !== evt.clientX || this.position.y !== evt.clientY) {
            this.eventManager.onMouseMove(evt);
            this.preventSelect = true;
        }
    };
    TaskAreaManager.prototype.onTouchStart = function (evt) {
        this.position = new point_1.Point(touch_1.TouchUtils.getEventX(evt), touch_1.TouchUtils.getEventY(evt));
        var clickedItem = this.ganttView.viewModel.items[this.getClickedTaskIndex(evt)];
        var now = new Date();
        if (evt.touches.length === 1 && now.getTime() - this.touchTime.getTime() < TaskAreaManager.DBLCLICK_INTERVAL) {
            evt.preventDefault();
            if (clickedItem && this.ganttView.onTaskDblClick(clickedItem.task.id, evt))
                this.ganttView.commandManager.showTaskEditDialog.execute(clickedItem.task);
        }
        else
            this.eventManager.onTouchStart(evt);
        if (clickedItem && this.ganttView.onTaskClick(clickedItem.task.id, evt))
            this.touchTime = now;
        this.preventSelect = false;
    };
    TaskAreaManager.prototype.onTouchEnd = function (evt) {
        this.eventManager.onTouchEnd(evt);
    };
    TaskAreaManager.prototype.onTouchMove = function (evt) {
        if (this.position.x !== touch_1.TouchUtils.getEventX(evt) || this.position.y !== touch_1.TouchUtils.getEventY(evt)) {
            this.eventManager.onTouchMove(evt);
            this.preventSelect = true;
        }
    };
    TaskAreaManager.prototype.getDependencyKeyFromSource = function (source) {
        return this.ganttView.viewModel.convertInternalToPublicKey("dependency", source.getAttribute("dependency-id"));
    };
    TaskAreaManager.prototype.onContextMenu = function (evt) {
        var source = evt_1.EvtUtils.getEventSource(evt);
        var isDependency = this.isConnectorLine(evt);
        var type = isDependency ? "dependency" : "task";
        var key = isDependency ? this.getDependencyKeyFromSource(source) : this.getClickedTaskKey(this.getClickedTaskIndex(evt));
        if (!isDependency)
            this.onChangeTaskSelection(evt);
        if (evt.stopPropagation)
            evt.stopPropagation();
        if (evt.preventDefault)
            evt.preventDefault();
        if (browser_1.Browser.WebKitFamily)
            evt.returnValue = false;
        if (this.ganttView.ganttOwner.onGanttViewContextMenu(evt, key, type)) {
            var info = {
                event: evt,
                type: type,
                key: key,
                position: new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt))
            };
            this.ganttView.ganttOwner.showPopupMenu(info);
        }
    };
    TaskAreaManager.prototype.onTaskElementHover = function (evt) {
        evt.preventDefault();
        var hoveredTaskIndex = this.getClickedTaskIndex(evt);
        this.ganttView.taskEditController.show(hoveredTaskIndex);
        this.ganttView.taskEditController.showTaskInfo(evt_1.EvtUtils.getEventX(evt));
    };
    TaskAreaManager.prototype.onTaskElementUnhover = function () {
        this.ganttView.taskEditController.cancel();
    };
    TaskAreaManager.prototype.getClickedTaskIndex = function (evt) {
        var y = evt_1.EvtUtils.getEventY(evt);
        var taskAreaY = dom_1.DomUtils.getAbsolutePositionY(this.ganttView.taskArea);
        var relativeY = y - taskAreaY;
        return Math.floor(relativeY / this.ganttView.tickSize.height);
    };
    TaskAreaManager.prototype.getClickedTaskKey = function (index) {
        var clickedItem = this.ganttView.viewModel.items[index];
        return clickedItem && clickedItem.task && clickedItem.task.id;
    };
    TaskAreaManager.prototype.changeTaskSelection = function (index) {
        var clickedTask = this.ganttView.viewModel.items[index];
        if (clickedTask)
            this.ganttView.ganttOwner.changeGanttTaskSelection(clickedTask.task.id, true);
    };
    TaskAreaManager.prototype.onTaskAreaClick = function (evt) {
        var clickedTaskIndex = this.getClickedTaskIndex(evt);
        this.onChangeTaskSelection(evt);
        var clickedItem = this.ganttView.viewModel.items[clickedTaskIndex];
        if (clickedItem)
            this.ganttView.onTaskClick(clickedItem.task.id, evt);
    };
    TaskAreaManager.prototype.onTaskAreaDblClick = function (evt) {
        evt.preventDefault();
        var clickedTaskIndex = this.getClickedTaskIndex(evt);
        var clickedItem = this.ganttView.viewModel.items[clickedTaskIndex];
        if (clickedItem && this.ganttView.onTaskDblClick(clickedItem.task.id, evt))
            this.ganttView.commandManager.showTaskEditDialog.execute(clickedItem.task);
    };
    TaskAreaManager.prototype.isConnectorLine = function (evt) {
        var source = evt_1.EvtUtils.getEventSource(evt);
        return dom_1.DomUtils.hasClassName(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL) ||
            dom_1.DomUtils.hasClassName(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_VERTICAL);
    };
    TaskAreaManager.DBLCLICK_INTERVAL = 300;
    TaskAreaManager.MS_POINTER_ACTIVE_CLASS = "ms-pointer-active";
    return TaskAreaManager;
}());
exports.TaskAreaManager = TaskAreaManager;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Size = (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    Size.empty = function () {
        return new Size(0, 0);
    };
    Size.fromNumber = function (num) {
        return new Size(num, num);
    };
    Size.initByCommonAction = function (action) {
        var widthAdp = function (s) { return s.width; };
        var heightAdp = function (s) { return s.height; };
        return new Size(action(widthAdp, heightAdp), action(heightAdp, widthAdp));
    };
    Size.prototype.isEmpty = function () {
        return this.width === 0 && this.height === 0;
    };
    Size.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Size.prototype.nonNegativeSize = function () {
        if (this.width < 0)
            this.width = 0;
        if (this.height < 0)
            this.height = 0;
        return this;
    };
    Size.prototype.offset = function (offsetWidth, offsetHeight) {
        this.width = this.width + offsetWidth;
        this.height = this.height + offsetHeight;
        return this;
    };
    Size.prototype.multiply = function (multiplierW, multiplierH) {
        this.width *= multiplierW;
        this.height *= multiplierH;
        return this;
    };
    Size.prototype.equals = function (obj) {
        return this.width === obj.width && this.height === obj.height;
    };
    Size.prototype.clone = function () {
        return new Size(this.width, this.height);
    };
    Size.prototype.copyFrom = function (obj) {
        this.width = obj.width;
        this.height = obj.height;
    };
    Size.prototype.applyConverter = function (conv) {
        this.width = conv(this.width);
        this.height = conv(this.height);
        return this;
    };
    Size.equals = function (a, b) {
        return a.width === b.width && a.height === b.height;
    };
    return Size;
}());
exports.Size = Size;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRange = void 0;
var DateRange = (function () {
    function DateRange(start, end) {
        this.start = start;
        this.end = end;
    }
    return DateRange;
}());
exports.DateRange = DateRange;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskTitlePosition = exports.Position = exports.ViewType = void 0;
var ViewType;
(function (ViewType) {
    ViewType[ViewType["TenMinutes"] = 0] = "TenMinutes";
    ViewType[ViewType["Hours"] = 1] = "Hours";
    ViewType[ViewType["SixHours"] = 2] = "SixHours";
    ViewType[ViewType["Days"] = 3] = "Days";
    ViewType[ViewType["Weeks"] = 4] = "Weeks";
    ViewType[ViewType["Months"] = 5] = "Months";
    ViewType[ViewType["Quarter"] = 6] = "Quarter";
    ViewType[ViewType["Years"] = 7] = "Years";
    ViewType[ViewType["FiveYears"] = 8] = "FiveYears";
})(ViewType = exports.ViewType || (exports.ViewType = {}));
var Position;
(function (Position) {
    Position[Position["Left"] = 0] = "Left";
    Position[Position["Top"] = 1] = "Top";
    Position[Position["Right"] = 2] = "Right";
    Position[Position["Bottom"] = 3] = "Bottom";
})(Position = exports.Position || (exports.Position = {}));
var TaskTitlePosition;
(function (TaskTitlePosition) {
    TaskTitlePosition[TaskTitlePosition["Inside"] = 0] = "Inside";
    TaskTitlePosition[TaskTitlePosition["Outside"] = 1] = "Outside";
    TaskTitlePosition[TaskTitlePosition["None"] = 2] = "None";
})(TaskTitlePosition = exports.TaskTitlePosition || (exports.TaskTitlePosition = {}));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DataObject = void 0;
var common_1 = __webpack_require__(1);
var math_1 = __webpack_require__(43);
var DataObject = (function () {
    function DataObject() {
        this.internalId = math_1.MathUtils.generateGuid();
    }
    DataObject.prototype.assignFromObject = function (sourceObj) {
        if (!common_1.isDefined(sourceObj))
            return;
        if (common_1.isDefined(sourceObj.id)) {
            this.id = sourceObj.id;
            this.internalId = String(sourceObj.id);
        }
    };
    return DataObject;
}());
exports.DataObject = DataObject;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependency = exports.DependencyType = void 0;
var tslib_1 = __webpack_require__(0);
var DataObject_1 = __webpack_require__(12);
var common_1 = __webpack_require__(1);
var DependencyType;
(function (DependencyType) {
    DependencyType[DependencyType["FS"] = 0] = "FS";
    DependencyType[DependencyType["SS"] = 1] = "SS";
    DependencyType[DependencyType["FF"] = 2] = "FF";
    DependencyType[DependencyType["SF"] = 3] = "SF";
})(DependencyType = exports.DependencyType || (exports.DependencyType = {}));
var Dependency = (function (_super) {
    tslib_1.__extends(Dependency, _super);
    function Dependency() {
        var _this = _super.call(this) || this;
        _this.predecessorId = "";
        _this.successorId = "";
        _this.type = null;
        return _this;
    }
    Dependency.prototype.assignFromObject = function (sourceObj) {
        if (common_1.isDefined(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.internalId = String(sourceObj.id);
            this.predecessorId = String(sourceObj.predecessorId);
            this.successorId = String(sourceObj.successorId);
            this.type = this.parseType(sourceObj.type);
        }
    };
    Dependency.prototype.parseType = function (type) {
        if (common_1.isDefined(type)) {
            var text = type.toString().toUpperCase();
            switch (text) {
                case "SS":
                case "1":
                    return DependencyType.SS;
                case "FF":
                case "2":
                    return DependencyType.FF;
                case "SF":
                case "3":
                    return DependencyType.SF;
                default: return DependencyType.FS;
            }
        }
        else
            return DependencyType.FS;
    };
    return Dependency;
}(DataObject_1.DataObject));
exports.Dependency = Dependency;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GridLayoutCalculator = void 0;
var size_1 = __webpack_require__(9);
var DateRange_1 = __webpack_require__(10);
var Enums_1 = __webpack_require__(11);
var GridElementInfo_1 = __webpack_require__(51);
var Utils_1 = __webpack_require__(33);
var point_1 = __webpack_require__(3);
var Dependency_1 = __webpack_require__(13);
var Settings_1 = __webpack_require__(52);
var GridLayoutCalculator = (function () {
    function GridLayoutCalculator() {
        this.tileToDependencyMap = [];
        this.tileToNoWorkingIntervalsMap = [];
        this.minLineLength = 10;
        this.resourceMaxWidth = 500;
        this.minTaskWidth = 2;
    }
    GridLayoutCalculator.prototype.setSettings = function (visibleTaskAreaSize, tickSize, elementSizeValues, range, viewModel, viewType, scrollBarHeight) {
        if (scrollBarHeight === void 0) { scrollBarHeight = 0; }
        this.visibleTaskAreaSize = visibleTaskAreaSize;
        this.tickSize = tickSize;
        this.viewType = viewType;
        this.range = range;
        this.verticalTickCount = viewModel.itemCount;
        this.viewModel = viewModel;
        this.elementSizeValues = elementSizeValues;
        this.taskHeight = elementSizeValues.taskHeight;
        this.parentTaskHeight = elementSizeValues.parentTaskHeight;
        this.milestoneWidth = elementSizeValues.milestoneWidth;
        this.scaleHeight = elementSizeValues.scaleItemHeight;
        this.arrowSize = new size_1.Size(elementSizeValues.connectorArrowWidth, elementSizeValues.connectorArrowWidth);
        this.lineThickness = elementSizeValues.connectorLineThickness;
        this.minConnectorSpaceFromTask = (this.tickSize.height - this.taskHeight) / 2;
        this.tickTimeSpan = Utils_1.DateUtils.getTickTimeSpan(viewType);
        this.horizontalTickCount = this.getTotalTickCount();
        this.scrollBarHeight = scrollBarHeight;
        this.createTileToNonWorkingIntervalsMap();
    };
    GridLayoutCalculator.prototype.getTaskAreaBorderInfo = function (index, isVertical) {
        var sizeValue = isVertical ?
            this.getVerticalGridLineHeight() :
            this.tickSize.width * this.horizontalTickCount;
        return this.getGridBorderInfo(index, isVertical, sizeValue);
    };
    GridLayoutCalculator.prototype.getScaleBorderInfo = function (index, scaleType) {
        var result = this.getGridBorderInfo(index, true, this.scaleHeight);
        result.position.x *= this.getScaleItemColSpan(scaleType);
        return result;
    };
    GridLayoutCalculator.prototype.getGridBorderInfo = function (index, isVertical, size) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.setPosition(this.getGridBorderPosition(index, isVertical));
        if (size)
            result.setSize(this.getGridBorderSize(isVertical, size));
        result.className = isVertical ? "dx-gantt-vb" : "dx-gantt-hb";
        return result;
    };
    GridLayoutCalculator.prototype.getGridBorderPosition = function (index, isVertical) {
        var result = new point_1.Point(undefined, undefined);
        var posValue = (index + 1) * (isVertical ? this.tickSize.width : this.tickSize.height);
        if (isVertical)
            result.x = posValue;
        else
            result.y = posValue;
        return result;
    };
    GridLayoutCalculator.prototype.getGridBorderSize = function (isVertical, sizeValue) {
        var result = new size_1.Size(0, 0);
        if (isVertical)
            result.height = sizeValue;
        else
            result.width = sizeValue;
        return result;
    };
    GridLayoutCalculator.prototype.getScaleElementInfo = function (index, scaleType) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.setPosition(this.getScaleItemPosition(index, scaleType));
        result.setSize(this.getScaleItemSize(scaleType));
        result.className = this.getScaleItemClassName(scaleType, result, this.getRenderedNoWorkingIntervals(result.position.x));
        return result;
    };
    GridLayoutCalculator.prototype.getScaleItemClassName = function (scaleType, scaleItemInfo, noWorkingIntervals) {
        var result = "dx-gantt-si";
        if (scaleType.valueOf() == this.viewType.valueOf() && this.isScaleItemInsideNoWorkingInterval(scaleItemInfo, noWorkingIntervals))
            result += " dx-gantt-holiday-scaleItem";
        return result;
    };
    GridLayoutCalculator.prototype.isScaleItemInsideNoWorkingInterval = function (scaleItemInfo, noWorkingIntervals) {
        var scaleItemLeft = scaleItemInfo.position.x;
        var scaleItemRight = scaleItemInfo.position.x + scaleItemInfo.size.width;
        for (var i = 0; i < noWorkingIntervals.length; i++) {
            var noWorkingIntervalLeft = noWorkingIntervals[i].position.x;
            var noWorkingIntervalRight = noWorkingIntervals[i].position.x + noWorkingIntervals[i].size.width;
            if (scaleItemLeft >= noWorkingIntervalLeft && scaleItemRight <= noWorkingIntervalRight)
                return true;
        }
        return false;
    };
    GridLayoutCalculator.prototype.getScaleItemPosition = function (index, scaleType) {
        return new point_1.Point(index * this.tickSize.width * this.getScaleItemColSpan(scaleType), undefined);
    };
    GridLayoutCalculator.prototype.getScaleItemSize = function (scaleType) {
        return new size_1.Size(this.tickSize.width * this.getScaleItemColSpan(scaleType), 0);
    };
    GridLayoutCalculator.prototype.getScaleItemColSpan = function (scaleType) {
        if (scaleType.valueOf() == this.viewType.valueOf())
            return 1;
        if (this.viewType === Enums_1.ViewType.TenMinutes)
            return 6;
        if (this.viewType === Enums_1.ViewType.Hours)
            return 24;
        if (this.viewType === Enums_1.ViewType.SixHours)
            return 4;
        if (this.viewType === Enums_1.ViewType.Days)
            return 7;
        if (this.viewType === Enums_1.ViewType.Weeks)
            return 4.29;
        if (this.viewType === Enums_1.ViewType.Months)
            return 12;
        if (this.viewType === Enums_1.ViewType.Quarter)
            return 4;
        if (this.viewType === Enums_1.ViewType.Years)
            return 5;
        return 1;
    };
    GridLayoutCalculator.prototype.getTaskWrapperElementInfo = function (index) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = this.getTaskWrapperClassName(index);
        result.setPosition(this.getTaskWrapperPoint(index));
        result.setAttribute("task-index", index);
        return result;
    };
    GridLayoutCalculator.prototype.getTaskWrapperClassName = function (index) {
        var result = "dx-gantt-taskWrapper";
        var viewItem = this.getViewItem(index);
        if (viewItem.task.isMilestone() && !viewItem.isCustom)
            result = "dx-gantt-milestoneWrapper";
        if (viewItem.selected)
            result += " dx-gantt-selectedTask";
        return result;
    };
    GridLayoutCalculator.prototype.getTaskWrapperPoint = function (index) {
        var viewItem = this.getViewItem(index);
        var height = this.getTaskHeight(index);
        var y = index * this.tickSize.height + (this.tickSize.height - height) / 2;
        var result = new point_1.Point(this.getPosByDate(viewItem.task.start), y);
        if (viewItem.task.isMilestone() && !viewItem.isCustom)
            result.x -= height / 2;
        return result;
    };
    GridLayoutCalculator.prototype.getTaskElementInfo = function (index, textOutsideTask) {
        if (textOutsideTask === void 0) { textOutsideTask = false; }
        var result = new GridElementInfo_1.GridElementInfo();
        var task = this.getTask(index);
        var autoCalculatedParent = this.viewModel.parentAutoCalc && this.viewModel.taskHasChildrenByIndex(index);
        if (!task.isMilestone()) {
            result.size.width = this.getTaskWidth(index);
            if (textOutsideTask)
                result.size.height = this.getTaskHeight(index);
        }
        result.className = this.getTaskClassName(index, result.size.width);
        if (task.color) {
            result.style.backgroundColor = task.color;
            if (autoCalculatedParent) {
                result.style.borderLeftColor = task.color;
                result.style.borderRightColor = task.color;
                result.style.borderTopColor = task.color;
            }
        }
        return result;
    };
    GridLayoutCalculator.prototype.getTaskClassName = function (index, taskWidth) {
        var result = GridLayoutCalculator.taskClassName;
        var viewItem = this.getViewItem(index);
        var autoCalculatedParent = this.viewModel.parentAutoCalc && this.viewModel.taskHasChildrenByIndex(index);
        if (viewItem.task.isMilestone() && !viewItem.isCustom)
            result += " " + GridLayoutCalculator.milestoneClassName;
        else if (taskWidth <= this.elementSizeValues.smallTaskWidth)
            result += " " + GridLayoutCalculator.smallTaskClassName;
        if (autoCalculatedParent)
            result += this.getAutoCalcParentTaskClassName(viewItem.task);
        return result;
    };
    GridLayoutCalculator.prototype.getAutoCalcParentTaskClassName = function (task) {
        var result = " " + GridLayoutCalculator.parentTaskClassName;
        if (task.progress == 0)
            result += " dx-gantt-noPrg";
        if (task.progress >= 100)
            result += " dx-gantt-cmpl";
        return result;
    };
    GridLayoutCalculator.prototype.getTaskPoint = function (index) {
        var result = this.getTaskWrapperPoint(index);
        if (!this.getTask(index).isMilestone())
            result.y += this.elementSizeValues.taskWrapperTopPadding;
        return result;
    };
    GridLayoutCalculator.prototype.getTaskSize = function (index) {
        return new size_1.Size(this.getTaskWidth(index), this.getTaskHeight(index));
    };
    GridLayoutCalculator.prototype.getTaskWidth = function (index) {
        var viewItem = this.getViewItem(index);
        if (viewItem.isCustom && viewItem.size.width)
            return viewItem.size.width;
        return viewItem.task.isMilestone() && !viewItem.isCustom ? this.getTaskHeight(index) : Math.max(this.getWidthByDateRange(viewItem.task.start, viewItem.task.end), this.minTaskWidth);
    };
    GridLayoutCalculator.prototype.getTaskHeight = function (index) {
        var viewItem = this.getViewItem(index);
        if (viewItem.task.isMilestone() && !viewItem.isCustom)
            return this.milestoneWidth;
        if (this.viewModel.isTaskToCalculateByChildren(viewItem.task.id))
            return this.parentTaskHeight;
        return (viewItem.isCustom && viewItem.size.height) ? viewItem.size.height : this.taskHeight;
    };
    GridLayoutCalculator.prototype.getTask = function (index) {
        var item = this.getViewItem(index);
        return item === null || item === void 0 ? void 0 : item.task;
    };
    GridLayoutCalculator.prototype.getViewItem = function (index) {
        return this.viewModel.items[index];
    };
    GridLayoutCalculator.prototype.getTaskProgressElementInfo = function (index) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = GridLayoutCalculator.taskProgressClassName;
        result.setSize(this.getTaskProgressSize(index));
        return result;
    };
    GridLayoutCalculator.prototype.getTaskProgressSize = function (index) {
        return new size_1.Size(this.getTaskProgressWidth(index), 0);
    };
    GridLayoutCalculator.prototype.getTaskProgressWidth = function (index) {
        return this.getTaskWidth(index) * this.getTask(index).progress / 100;
    };
    GridLayoutCalculator.prototype.getTaskTextElementInfo = function (index, isInsideText) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = this.getTaskTextElementClassName(isInsideText);
        if (!isInsideText) {
            var taskX = this.getTaskPoint(index).x;
            if (taskX < this.elementSizeValues.outsideTaskTextDefaultWidth) {
                result.size.width = taskX;
                result.margins.left = -taskX;
            }
        }
        return result;
    };
    GridLayoutCalculator.prototype.getTaskTextElementClassName = function (isInsideText) {
        return GridLayoutCalculator.taskTitleClassName.concat(" ", isInsideText ? GridLayoutCalculator.titleInClassName : GridLayoutCalculator.titleOutClassName);
    };
    GridLayoutCalculator.prototype.getTaskResourcesWrapperElementInfo = function (index) {
        var result = new GridElementInfo_1.GridElementInfo();
        var width = this.getTaskSize(index).width;
        result.className = "dx-gantt-taskResWrapper";
        result.setPosition(this.getTaskWrapperPoint(index));
        result.position.x = result.position.x + width;
        return result;
    };
    GridLayoutCalculator.prototype.getTaskResourceElementInfo = function () {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = GridLayoutCalculator.taskResourceClassName;
        return result;
    };
    GridLayoutCalculator.prototype.getSelectionElementInfo = function (index) {
        return this.getRowElementInfo(index, "dx-gantt-sel");
    };
    GridLayoutCalculator.prototype.getSelectionPosition = function (index) {
        var result = new point_1.Point(undefined, undefined);
        result.y = index * this.tickSize.height;
        return result;
    };
    GridLayoutCalculator.prototype.getSelectionSize = function () {
        return new size_1.Size(this.tickSize.width * this.horizontalTickCount, this.tickSize.height);
    };
    GridLayoutCalculator.prototype.getHighlightRowInfo = function (index) {
        return this.getRowElementInfo(index, "dx-gantt-altRow");
    };
    GridLayoutCalculator.prototype.getRowElementInfo = function (index, className) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = className;
        result.setPosition(this.getSelectionPosition(index));
        result.setSize(this.getSelectionSize());
        return result;
    };
    GridLayoutCalculator.prototype.getNoWorkingIntervalInfo = function (noWorkingDateRange) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = "dx-gantt-nwi";
        result.setPosition(this.getNoWorkingIntervalPosition(noWorkingDateRange.start));
        result.setSize(this.getNoWorkingIntervalSize(noWorkingDateRange));
        return result;
    };
    GridLayoutCalculator.prototype.getNoWorkingIntervalPosition = function (intervalStart) {
        var result = new point_1.Point(undefined, undefined);
        result.x = this.getPosByDate(intervalStart);
        return result;
    };
    GridLayoutCalculator.prototype.getNoWorkingIntervalSize = function (noWorkingInterval) {
        return new size_1.Size(this.getWidthByDateRange(noWorkingInterval.start, noWorkingInterval.end), this.getVerticalGridLineHeight());
    };
    GridLayoutCalculator.prototype.getVerticalGridLineHeight = function () {
        return Math.max(this.visibleTaskAreaSize.height - this.scrollBarHeight, this.tickSize.height * this.verticalTickCount);
    };
    GridLayoutCalculator.prototype.getConnectorInfo = function (id, predessorIndex, successorIndex, connectorType) {
        var result = new Array();
        var connectorPoints = this.getConnectorPoints(predessorIndex, successorIndex, connectorType);
        for (var i = 0; i < connectorPoints.length - 1; i++)
            result.push(this.getConnectorLineInfo(id, connectorPoints[i], connectorPoints[i + 1], i == 0 || i == connectorPoints.length - 2));
        result.push(this.getArrowInfo(id, connectorPoints, result, predessorIndex, successorIndex));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorLineInfo = function (id, startPoint, endPoint, isEdgeLine) {
        var result = new GridElementInfo_1.GridElementInfo();
        var isVertical = startPoint.x == endPoint.x;
        result.className = this.getConnectorClassName(isVertical);
        result.setPosition(this.getConnectorPosition(startPoint, endPoint));
        result.setSize(this.getConnectorSize(startPoint, endPoint, isVertical, isEdgeLine));
        result.setAttribute("dependency-id", id);
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorClassName = function (isVertical) {
        return isVertical ? GridLayoutCalculator.CLASSNAMES.CONNECTOR_VERTICAL : GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL;
    };
    GridLayoutCalculator.prototype.getConnectorPosition = function (startPoint, endPoint) {
        return new point_1.Point(Math.min(startPoint.x, endPoint.x), Math.min(startPoint.y, endPoint.y));
    };
    GridLayoutCalculator.prototype.getConnectorSize = function (startPoint, endPoint, isVertical, isEdgeLine) {
        var result = new size_1.Size(0, 0);
        var sizeCorrection = isEdgeLine ? 0 : 1;
        if (isVertical)
            result.height = Math.abs(endPoint.y - startPoint.y) + sizeCorrection;
        else
            result.width = Math.abs(endPoint.x - startPoint.x) + sizeCorrection;
        return result;
    };
    GridLayoutCalculator.prototype.getArrowInfo = function (id, connectorPoints, connectorLines, predessorIndex, successorIndex) {
        var result = new GridElementInfo_1.GridElementInfo();
        var lineInfo = this.findArrowLineInfo(connectorLines, predessorIndex, successorIndex);
        var arrowPosition = this.getArrowPosition(connectorPoints, predessorIndex, successorIndex);
        result.className = this.getArrowClassName(arrowPosition);
        result.setPosition(this.getArrowPoint(lineInfo, arrowPosition));
        result.setAttribute("dependency-id", id);
        return result;
    };
    GridLayoutCalculator.prototype.findArrowLineInfo = function (connectorLines, predessorIndex, successorIndex) {
        var arrowLineIndex = predessorIndex < successorIndex ? connectorLines.length - 1 : 0;
        return connectorLines[arrowLineIndex];
    };
    GridLayoutCalculator.prototype.getArrowPosition = function (connectorPoints, predessorIndex, successorIndex) {
        var prevLastPoint = connectorPoints[predessorIndex < successorIndex ? connectorPoints.length - 2 : 1];
        var lastPoint = connectorPoints[predessorIndex < successorIndex ? connectorPoints.length - 1 : 0];
        if (prevLastPoint.x == lastPoint.x)
            return prevLastPoint.y > lastPoint.y ? Enums_1.Position.Top : Enums_1.Position.Bottom;
        return prevLastPoint.x > lastPoint.x ? Enums_1.Position.Left : Enums_1.Position.Right;
    };
    GridLayoutCalculator.prototype.getArrowClassName = function (arrowPosition) {
        var result = GridLayoutCalculator.arrowClassName;
        switch (arrowPosition) {
            case Enums_1.Position.Left:
                result = result.concat(" ", GridLayoutCalculator.leftArrowClassName);
                break;
            case Enums_1.Position.Top:
                result = result.concat(" ", GridLayoutCalculator.topArrowClassName);
                break;
            case Enums_1.Position.Right:
                result = result.concat(" ", GridLayoutCalculator.rightArrowClassName);
                break;
            case Enums_1.Position.Bottom:
                result = result.concat(" ", GridLayoutCalculator.bottomArrowClassName);
                break;
        }
        return result;
    };
    GridLayoutCalculator.prototype.getArrowPositionByClassName = function (className) {
        if (className.indexOf(GridLayoutCalculator.leftArrowClassName) > -1)
            return Enums_1.Position.Left;
        if (className.indexOf(GridLayoutCalculator.topArrowClassName) > -1)
            return Enums_1.Position.Top;
        if (className.indexOf(GridLayoutCalculator.rightArrowClassName) > -1)
            return Enums_1.Position.Right;
        if (className.indexOf(GridLayoutCalculator.bottomArrowClassName) > -1)
            return Enums_1.Position.Bottom;
    };
    GridLayoutCalculator.prototype.getArrowPoint = function (lineInfo, arrowPosition) {
        return new point_1.Point(this.getArrowX(lineInfo, arrowPosition), this.getArrowY(lineInfo, arrowPosition));
    };
    GridLayoutCalculator.prototype.getArrowX = function (lineInfo, arrowPosition) {
        switch (arrowPosition) {
            case Enums_1.Position.Left:
                return lineInfo.position.x - this.arrowSize.width / 2;
            case Enums_1.Position.Right:
                return lineInfo.position.x + lineInfo.size.width - this.arrowSize.width / 2;
            case Enums_1.Position.Top:
            case Enums_1.Position.Bottom:
                return lineInfo.position.x - (this.arrowSize.width - this.lineThickness) / 2;
        }
    };
    GridLayoutCalculator.prototype.getArrowY = function (lineInfo, arrowPosition) {
        switch (arrowPosition) {
            case Enums_1.Position.Top:
                return lineInfo.position.y - this.arrowSize.height / 2;
            case Enums_1.Position.Bottom:
                return lineInfo.position.y + lineInfo.size.height - this.arrowSize.height / 2;
            case Enums_1.Position.Left:
            case Enums_1.Position.Right:
                return lineInfo.position.y - (this.arrowSize.height - this.lineThickness) / 2;
        }
    };
    GridLayoutCalculator.prototype.getPosByDate = function (date) {
        return this.getWidthByDateRange(this.range.start, date);
    };
    GridLayoutCalculator.prototype.getWidthByDateRange = function (start, end) {
        return this.getRangeTickCount(start, end) * this.tickSize.width;
    };
    GridLayoutCalculator.prototype.getRangeTickCount = function (start, end) {
        if (this.viewType == Enums_1.ViewType.Months)
            return this.getRangeTickCountInMonthsViewType(start, end);
        if (this.viewType == Enums_1.ViewType.Quarter)
            return this.getRangeTickCountInQuarterViewType(start, end);
        return (end.getTime() - start.getTime()) / this.tickTimeSpan;
    };
    GridLayoutCalculator.prototype.getRangeTickCountInMonthsViewType = function (start, end) {
        var startMonthStartDate = new Date(start.getFullYear(), start.getMonth(), 1);
        var endMonthStartDate = new Date(end.getFullYear(), end.getMonth(), 1);
        var monthOffset = Utils_1.DateUtils.getOffsetInMonths(startMonthStartDate, endMonthStartDate);
        var endFromMonthStartDateOffset = end.getTime() - endMonthStartDate.getTime();
        var startFromMonthStartDateOffset = start.getTime() - startMonthStartDate.getTime();
        return monthOffset + (endFromMonthStartDateOffset - startFromMonthStartDateOffset) / Utils_1.DateUtils.msPerMonth;
    };
    GridLayoutCalculator.prototype.getRangeTickCountInQuarterViewType = function (start, end) {
        var startQuarterStartDate = new Date(start.getFullYear(), Math.floor(start.getMonth() / 3) * 3, 1);
        var endQuarterStartDate = new Date(end.getFullYear(), Math.floor(end.getMonth() / 3) * 3, 1);
        var quarterOffset = Utils_1.DateUtils.getOffsetInQuarters(startQuarterStartDate, endQuarterStartDate);
        var endFromQuarterStartDateOffset = end.getTime() - endQuarterStartDate.getTime();
        var startFromQuarterStartDateOffset = start.getTime() - startQuarterStartDate.getTime();
        return quarterOffset + (endFromQuarterStartDateOffset - startFromQuarterStartDateOffset) / (Utils_1.DateUtils.msPerMonth * 3);
    };
    GridLayoutCalculator.prototype.getDateByPos = function (position) {
        var preResult = position / this.tickSize.width;
        var start = new Date(this.range.start);
        if (this.viewType == Enums_1.ViewType.Months || this.viewType == Enums_1.ViewType.Quarter) {
            var monthFromStart = Math.floor(preResult);
            start = new Date(start.setMonth(start.getMonth() + (this.viewType == Enums_1.ViewType.Months ? monthFromStart : monthFromStart * 3)));
            preResult = (position - this.getPosByDate(start)) / this.tickSize.width;
        }
        var time = preResult * this.tickTimeSpan + start.getTime();
        var result = new Date();
        result.setTime(time);
        return result;
    };
    GridLayoutCalculator.prototype.getTotalTickCount = function () {
        return this.getRangeTickCount(this.range.start, this.range.end);
    };
    GridLayoutCalculator.prototype.getConnectorPoints = function (predessorIndex, successorIndex, connectorType) {
        switch (connectorType) {
            case Dependency_1.DependencyType.FS:
                return this.getFinishToStartConnectorPoints(predessorIndex, successorIndex);
            case Dependency_1.DependencyType.SF:
                return this.getStartToFinishConnectorPoints(predessorIndex, successorIndex);
            case Dependency_1.DependencyType.SS:
                return this.getStartToStartConnectorPoints(predessorIndex, successorIndex);
            case Dependency_1.DependencyType.FF:
                return this.getFinishToFinishConnectorPoints(predessorIndex, successorIndex);
            default:
                return new Array();
        }
    };
    GridLayoutCalculator.prototype.getFinishToStartConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex) {
            if (this.getTask(predessorIndex).end <= this.getTask(successorIndex).start)
                return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskTopSide(predessorIndex, successorIndex, false);
            return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskLeftSide(predessorIndex, successorIndex, false);
        }
        if (this.getTask(predessorIndex).end <= this.getTask(successorIndex).start)
            return this.getConnectorPoints_FromTopTaskBottomSide_ToBottomTaskRightSide(successorIndex, predessorIndex, false);
        return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskRightSide(successorIndex, predessorIndex, true);
    };
    GridLayoutCalculator.prototype.getFinishToFinishConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex)
            return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskRightSide(predessorIndex, successorIndex);
        return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskRightSide(successorIndex, predessorIndex);
    };
    GridLayoutCalculator.prototype.getStartToStartConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex)
            return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskLeftSide(predessorIndex, successorIndex);
        return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskLeftSide(successorIndex, predessorIndex);
    };
    GridLayoutCalculator.prototype.getStartToFinishConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex) {
            if (this.getTask(predessorIndex).start >= this.getTask(successorIndex).end)
                return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskTopSide(predessorIndex, successorIndex, true);
            return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskRightSide(predessorIndex, successorIndex, false);
        }
        if (this.getTask(predessorIndex).start >= this.getTask(successorIndex).end)
            return this.getConnectorPoints_FromTopTaskBottomSide_ToBottomTaskLeftSide(successorIndex, predessorIndex, true);
        return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskLeftSide(successorIndex, predessorIndex, true);
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskTopSide = function (topTaskIndex, bottomTaskIndex, shiftEndPointToRight) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskRightCenter = this.getTaskRightCenter(topTaskPoint, topTaskIndex);
        var isBottomMilestone = this.getTask(bottomTaskIndex).isMilestone();
        var bottomTaskTopCenter = this.getTaskTopCenter(bottomTaskPoint, bottomTaskIndex);
        var endPointIndent = shiftEndPointToRight ? this.getTaskWidth(bottomTaskIndex) - this.minLineLength : this.minLineLength;
        result.push(new point_1.Point(Math.floor(topTaskRightCenter.x), Math.floor(topTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(isBottomMilestone ? bottomTaskTopCenter.x : bottomTaskPoint.x + endPointIndent), Math.floor(result[0].y)));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskTopCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskRightSide = function (topTaskIndex, bottomTaskIndex) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskRightCenter = this.getTaskRightCenter(topTaskPoint, topTaskIndex);
        var bottomTaskRightCenter = this.getTaskRightCenter(bottomTaskPoint, bottomTaskIndex);
        result.push(new point_1.Point(Math.floor(topTaskRightCenter.x), Math.floor(topTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(Math.max(topTaskRightCenter.x, bottomTaskRightCenter.x) + this.minLineLength), Math.floor(result[0].y)));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskRightCenter.x), Math.floor(bottomTaskRightCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskLeftSide = function (topTaskIndex, bottomTaskIndex, shiftToTop) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskRightCenter = this.getTaskRightCenter(topTaskPoint, topTaskIndex);
        var topTaskBottomCenter = this.getTaskBottomCenter(topTaskPoint, topTaskIndex);
        var bottomTaskLeftCenter = this.getTaskLeftCenter(bottomTaskPoint, bottomTaskIndex);
        var bottomTaskTopCenter = this.getTaskTopCenter(bottomTaskPoint, bottomTaskIndex);
        var viewItem = shiftToTop ? this.getViewItem(topTaskIndex) : this.getViewItem(bottomTaskIndex);
        var connectorSpace = viewItem.isCustom ? (this.tickSize.height - viewItem.size.height) / 2 : this.minConnectorSpaceFromTask;
        result.push(new point_1.Point(Math.floor(topTaskRightCenter.x), Math.floor(topTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(result[0].x + this.minLineLength), Math.floor(result[0].y)));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(shiftToTop ?
            topTaskBottomCenter.y + connectorSpace
            : bottomTaskTopCenter.y - connectorSpace)));
        result.push(new point_1.Point(Math.floor(bottomTaskLeftCenter.x - this.minLineLength), Math.floor(result[2].y)));
        result.push(new point_1.Point(Math.floor(result[3].x), Math.floor(bottomTaskLeftCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskLeftCenter.x), Math.floor(bottomTaskLeftCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskBottomSide_ToBottomTaskRightSide = function (topTaskIndex, bottomTaskIndex, shiftStartPointToRight) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskBottomCenter = this.getTaskBottomCenter(topTaskPoint, topTaskIndex);
        var isTopMilestone = this.getTask(topTaskIndex).isMilestone();
        var bottomTaskRightCenter = this.getTaskRightCenter(bottomTaskPoint, bottomTaskIndex);
        var startPointIndent = shiftStartPointToRight ? this.getTaskWidth(topTaskIndex) - this.minLineLength : this.minLineLength;
        result.push(new point_1.Point(Math.floor(isTopMilestone ? topTaskBottomCenter.x : topTaskPoint.x + startPointIndent), Math.floor(topTaskBottomCenter.y)));
        result.push(new point_1.Point(Math.floor(result[0].x), Math.floor(bottomTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskRightCenter.x), Math.floor(bottomTaskRightCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskBottomSide_ToBottomTaskLeftSide = function (topTaskIndex, bottomTaskIndex, shiftStartPointToRight) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskBottomCenter = this.getTaskBottomCenter(topTaskPoint, topTaskIndex);
        var isTopMilestone = this.getTask(topTaskIndex).isMilestone();
        var bottomTaskLeftCenter = this.getTaskLeftCenter(bottomTaskPoint, bottomTaskIndex);
        var startPointIndent = shiftStartPointToRight ? this.getTaskWidth(topTaskIndex) - this.minLineLength : this.minLineLength;
        result.push(new point_1.Point(Math.floor(isTopMilestone ? topTaskBottomCenter.x : topTaskPoint.x + startPointIndent), Math.floor(topTaskBottomCenter.y)));
        result.push(new point_1.Point(Math.floor(result[0].x), Math.floor(bottomTaskLeftCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskLeftCenter.x), Math.floor(bottomTaskLeftCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskTopSide = function (topTaskIndex, bottomTaskIndex, shiftEndPointToRight) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskLeftCenter = this.getTaskLeftCenter(topTaskPoint, topTaskIndex);
        var bottomTaskTopCenter = this.getTaskTopCenter(bottomTaskPoint, bottomTaskIndex);
        var isBottomMilestone = this.getTask(bottomTaskIndex).isMilestone();
        var endPointIndent = shiftEndPointToRight ? this.getTaskWidth(bottomTaskIndex) - this.minLineLength : this.minLineLength;
        result.push(new point_1.Point(Math.floor(topTaskLeftCenter.x), Math.floor(topTaskLeftCenter.y)));
        result.push(new point_1.Point(Math.floor(isBottomMilestone ? bottomTaskTopCenter.x : bottomTaskPoint.x + endPointIndent), Math.floor(result[0].y)));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskTopCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskRightSide = function (topTaskIndex, bottomTaskIndex, shiftToTop) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskLeftCenter = this.getTaskLeftCenter(topTaskPoint, topTaskIndex);
        var topTaskBottomCenter = this.getTaskBottomCenter(topTaskPoint, topTaskIndex);
        var bottomTaskRightCenter = this.getTaskRightCenter(bottomTaskPoint, bottomTaskIndex);
        var bottomTaskTopCenter = this.getTaskTopCenter(bottomTaskPoint, bottomTaskIndex);
        var viewItem = shiftToTop ? this.getViewItem(topTaskIndex) : this.getViewItem(bottomTaskIndex);
        var connectorSpace = viewItem.isCustom ? (this.tickSize.height - viewItem.size.height) / 2 : this.minConnectorSpaceFromTask;
        result.push(new point_1.Point(Math.floor(topTaskLeftCenter.x), topTaskLeftCenter.y));
        result.push(new point_1.Point(Math.floor(result[0].x - this.minLineLength), result[0].y));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(shiftToTop ?
            topTaskBottomCenter.y + connectorSpace
            : bottomTaskTopCenter.y - connectorSpace)));
        result.push(new point_1.Point(Math.floor(bottomTaskRightCenter.x + this.minLineLength), Math.floor(result[2].y)));
        result.push(new point_1.Point(Math.floor(result[3].x), Math.floor(bottomTaskRightCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskRightCenter.x), Math.floor(bottomTaskRightCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskLeftSide = function (topTaskIndex, bottomTaskIndex) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskLeftCenter = this.getTaskLeftCenter(topTaskPoint, topTaskIndex);
        var bottomTaskLeftCenter = this.getTaskLeftCenter(bottomTaskPoint, bottomTaskIndex);
        result.push(new point_1.Point(Math.floor(topTaskLeftCenter.x), Math.floor(topTaskLeftCenter.y)));
        result.push(new point_1.Point(Math.floor(Math.min(topTaskLeftCenter.x, bottomTaskLeftCenter.x) - this.minLineLength), Math.floor(result[0].y)));
        result.push(new point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskLeftCenter.y)));
        result.push(new point_1.Point(Math.floor(bottomTaskLeftCenter.x), Math.floor(bottomTaskLeftCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getTaskSidePoints = function (index) {
        var point = this.getTaskPoint(index);
        return [
            this.getTaskLeftCenter(point, index),
            this.getTaskTopCenter(point, index),
            this.getTaskRightCenter(point, index),
            this.getTaskBottomCenter(point, index)
        ];
    };
    GridLayoutCalculator.prototype.getTaskLeftCenter = function (taskPoint, index) {
        return new point_1.Point(taskPoint.x - this.getTaskEdgeCorrection(index), taskPoint.y + this.getTaskHeight(index) / 2);
    };
    GridLayoutCalculator.prototype.getTaskRightCenter = function (taskPoint, index) {
        return new point_1.Point(taskPoint.x + this.getTaskWidth(index) + this.getTaskEdgeCorrection(index), taskPoint.y + this.getTaskHeight(index) / 2);
    };
    GridLayoutCalculator.prototype.getTaskTopCenter = function (taskPoint, index) {
        return new point_1.Point(taskPoint.x + this.getTaskWidth(index) / 2, taskPoint.y - this.getTaskEdgeCorrection(index));
    };
    GridLayoutCalculator.prototype.getTaskBottomCenter = function (taskPoint, index) {
        return new point_1.Point(taskPoint.x + this.getTaskWidth(index) / 2, taskPoint.y + this.getTaskHeight(index) + this.getTaskEdgeCorrection(index));
    };
    GridLayoutCalculator.prototype.getTaskEdgeCorrection = function (index) {
        var viewItem = this.getViewItem(index);
        var isMilestone = viewItem.task.isMilestone() && !viewItem.isCustom;
        return isMilestone ? this.getTaskHeight(index) * (Math.sqrt(2) - 1) / 2 : 0;
    };
    GridLayoutCalculator.prototype.getRenderedRowColumnIndices = function (scrollPos, isVertical) {
        var visibleAreaSizeValue = isVertical ? this.visibleTaskAreaSize.height : this.visibleTaskAreaSize.width;
        var tickSizeValue = isVertical ? this.tickSize.height : this.tickSize.width;
        var tickCount = isVertical ? this.verticalTickCount : this.horizontalTickCount;
        var firstVisibleIndex = this.getFirstVisibleGridCellIndex(scrollPos, tickSizeValue);
        var lastVisibleIndex = this.getLastVisibleGridCellIndex(scrollPos, tickSizeValue, visibleAreaSizeValue, tickCount);
        var result = new Array();
        for (var i = firstVisibleIndex; i <= lastVisibleIndex; i++)
            result.push(i);
        return result;
    };
    GridLayoutCalculator.prototype.getRenderedScaleItemIndices = function (scaleType, renderedColIndices) {
        var scaleItemColSpan = this.getScaleItemColSpan(scaleType);
        var firstVisibleIndex = Math.floor(renderedColIndices[0] / scaleItemColSpan);
        var lastVisibleIndex = Math.floor(renderedColIndices[renderedColIndices.length - 1] / scaleItemColSpan);
        var result = new Array();
        for (var i = firstVisibleIndex; i <= lastVisibleIndex; i++)
            result.push(i);
        return result;
    };
    GridLayoutCalculator.prototype.getFirstVisibleGridCellIndex = function (scrollPos, tickSizeValue) {
        var result = Math.floor(scrollPos / tickSizeValue);
        result = Math.max(result - 10, 0);
        return result;
    };
    GridLayoutCalculator.prototype.getLastVisibleGridCellIndex = function (scrollPos, tickSizeValue, visibleAreaSizeValue, tickCount) {
        var result = Math.floor((scrollPos + visibleAreaSizeValue) / tickSizeValue);
        result = Math.min(result + 10, tickCount - 1);
        return result;
    };
    GridLayoutCalculator.prototype.createTileToConnectorLinesMap = function () {
        this.tileToDependencyMap = [];
        for (var i = 0; i < this.viewModel.items.length; i++)
            for (var j = 0; j < this.viewModel.items[i].dependencies.length; j++)
                this.createConnecotInfo(this.viewModel.items[i].dependencies[j], this.viewModel.items[i].visibleIndex);
    };
    GridLayoutCalculator.prototype.updateTileToConnectorLinesMap = function (dependencyId) {
        this.tileToDependencyMap.forEach(function (map, index, tileToDependencyMap) {
            tileToDependencyMap[index] = map.filter(function (info) { return info.attr["dependency-id"] != dependencyId; });
        });
        var result = [];
        var item = this.viewModel.items.filter(function (item) { return item.dependencies.filter(function (d) { return d.id == dependencyId; }).length > 0; })[0];
        if (item) {
            var dependency = item.dependencies.filter(function (d) { return d.id === dependencyId; })[0];
            result = this.createConnecotInfo(dependency, item.visibleIndex);
        }
        return result;
    };
    GridLayoutCalculator.prototype.createConnecotInfo = function (dependencyInfo, successorIndex) {
        var _this = this;
        var predessorIndex = dependencyInfo.predecessor.visibleIndex;
        var type = dependencyInfo.type;
        var id = dependencyInfo.id;
        var connectorInfo = this.getConnectorInfo(id, predessorIndex, successorIndex, type);
        connectorInfo.forEach(function (connectorLine) {
            _this.addElementInfoToTileMap(connectorLine, _this.tileToDependencyMap, true);
        });
        return connectorInfo;
    };
    GridLayoutCalculator.prototype.createTileToNonWorkingIntervalsMap = function () {
        this.tileToNoWorkingIntervalsMap = [];
        for (var i = 0; i < this.viewModel.noWorkingIntervals.length; i++) {
            var noWorkingDateRange = this.getAdjustedNoWorkingInterval(this.viewModel.noWorkingIntervals[i]);
            if (!noWorkingDateRange)
                continue;
            var noWorkingIntervalInfo = this.getNoWorkingIntervalInfo(noWorkingDateRange);
            this.addElementInfoToTileMap(noWorkingIntervalInfo, this.tileToNoWorkingIntervalsMap, false);
        }
    };
    GridLayoutCalculator.prototype.getAdjustedNoWorkingInterval = function (modelInterval) {
        if (modelInterval.end.getTime() - modelInterval.start.getTime() < this.tickTimeSpan - 1)
            return null;
        return new DateRange_1.DateRange(Utils_1.DateUtils.getNearestScaleTickDate(modelInterval.start, this.range, this.tickTimeSpan, this.viewType), Utils_1.DateUtils.getNearestScaleTickDate(modelInterval.end, this.range, this.tickTimeSpan, this.viewType));
    };
    GridLayoutCalculator.prototype.addElementInfoToTileMap = function (info, map, isVerticalTile) {
        var infoPointValue = isVerticalTile ? info.position.y : info.position.x;
        var infoSizeValue = isVerticalTile ? info.size.height : info.size.width;
        var tileSizeValue = (isVerticalTile ? this.visibleTaskAreaSize.height : this.visibleTaskAreaSize.width) * 2;
        var firstTileIndex = Math.floor(infoPointValue / tileSizeValue);
        var lastTileIndex = Math.floor((infoPointValue + infoSizeValue) / tileSizeValue);
        for (var i = firstTileIndex; i <= lastTileIndex; i++) {
            if (!map[i])
                map[i] = new Array();
            map[i].push(info);
        }
    };
    GridLayoutCalculator.prototype.getRenderedConnectorLines = function (scrollPos) {
        return this.getElementsInRenderedTiles(this.tileToDependencyMap, true, scrollPos);
    };
    GridLayoutCalculator.prototype.getRenderedNoWorkingIntervals = function (scrollPos) {
        return this.getElementsInRenderedTiles(this.tileToNoWorkingIntervalsMap, false, scrollPos);
    };
    GridLayoutCalculator.prototype.getRenderedStripLines = function (settings) {
        var result = new Array();
        var stripLines = settings.stripLines.map(function (t) { return t.clone(); });
        if (settings.showCurrentTime)
            stripLines.push(new Settings_1.StripLine(new Date(), null, settings.currentTimeTitle, settings.currentTimeCssClass, true));
        for (var i = 0, stripLine = void 0; stripLine = stripLines[i]; i++) {
            var start = Utils_1.DateUtils.parse(stripLine.start);
            var end = stripLine.end ? Utils_1.DateUtils.parse(stripLine.end) : null;
            if (start >= this.range.start && start <= this.range.end || (end && end >= this.range.start && end <= this.range.end)) {
                var renderedStart = start > this.range.start ? start : this.range.start;
                var info = new GridElementInfo_1.GridElementInfo();
                info.size.height = this.getVerticalGridLineHeight();
                info.position.x = this.getPosByDate(renderedStart);
                info.size.width = end ? this.getWidthByDateRange(renderedStart, end < this.range.end ? end : this.range.end) : 0;
                info.className = stripLine.isCurrent ? "dx-gantt-tc" : end ? "dx-gantt-ti" : "dx-gantt-tm";
                info.className += stripLine.cssClass ? " " + stripLine.cssClass : "";
                info.attr.title = stripLine.title;
                result.push(info);
            }
        }
        return result;
    };
    GridLayoutCalculator.prototype.getElementsInRenderedTiles = function (map, isVerticalTile, scrollPos) {
        var result = new Array();
        var visibleAreaSizeValue = isVerticalTile ? this.visibleTaskAreaSize.height : this.visibleTaskAreaSize.width;
        if (visibleAreaSizeValue > 0) {
            var firstVisibleTileIndex = Math.floor(scrollPos / (visibleAreaSizeValue * 2));
            var lastVisibleTileIndex = Math.floor((scrollPos + visibleAreaSizeValue) / (visibleAreaSizeValue * 2));
            for (var i = firstVisibleTileIndex; i <= lastVisibleTileIndex; i++) {
                if (!map[i])
                    continue;
                map[i].forEach(function (info) {
                    if (result.indexOf(info) == -1)
                        result.push(info);
                });
            }
        }
        return result;
    };
    GridLayoutCalculator.dxGanttPrefix = "dx-gantt-";
    GridLayoutCalculator.taskClassName = GridLayoutCalculator.dxGanttPrefix + "task";
    GridLayoutCalculator.milestoneClassName = GridLayoutCalculator.dxGanttPrefix + "milestone";
    GridLayoutCalculator.smallTaskClassName = GridLayoutCalculator.dxGanttPrefix + "smallTask";
    GridLayoutCalculator.parentTaskClassName = GridLayoutCalculator.dxGanttPrefix + "parent";
    GridLayoutCalculator.taskProgressClassName = GridLayoutCalculator.dxGanttPrefix + "tPrg";
    GridLayoutCalculator.taskTitleClassName = GridLayoutCalculator.dxGanttPrefix + "taskTitle";
    GridLayoutCalculator.titleInClassName = GridLayoutCalculator.dxGanttPrefix + "titleIn";
    GridLayoutCalculator.titleOutClassName = GridLayoutCalculator.dxGanttPrefix + "titleOut";
    GridLayoutCalculator.taskResourceClassName = GridLayoutCalculator.dxGanttPrefix + "taskRes";
    GridLayoutCalculator.arrowClassName = GridLayoutCalculator.dxGanttPrefix + "arrow";
    GridLayoutCalculator.leftArrowClassName = GridLayoutCalculator.dxGanttPrefix + "LA";
    GridLayoutCalculator.topArrowClassName = GridLayoutCalculator.dxGanttPrefix + "TA";
    GridLayoutCalculator.rightArrowClassName = GridLayoutCalculator.dxGanttPrefix + "RA";
    GridLayoutCalculator.bottomArrowClassName = GridLayoutCalculator.dxGanttPrefix + "BA";
    GridLayoutCalculator.CLASSNAMES = {
        CONNECTOR_VERTICAL: "dx-gantt-conn-v",
        CONNECTOR_HORIZONTAL: "dx-gantt-conn-h"
    };
    return GridLayoutCalculator;
}());
exports.GridLayoutCalculator = GridLayoutCalculator;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionHistoryItem = exports.HistoryItem = void 0;
var tslib_1 = __webpack_require__(0);
var HistoryItem = (function () {
    function HistoryItem(modelManipulator) {
        this.modelManipulator = modelManipulator;
    }
    return HistoryItem;
}());
exports.HistoryItem = HistoryItem;
var CompositionHistoryItem = (function (_super) {
    tslib_1.__extends(CompositionHistoryItem, _super);
    function CompositionHistoryItem() {
        var _this = _super.call(this, null) || this;
        _this.historyItems = [];
        return _this;
    }
    CompositionHistoryItem.prototype.redo = function () {
        var item;
        for (var i = 0; item = this.historyItems[i]; i++)
            item.redo();
    };
    CompositionHistoryItem.prototype.undo = function () {
        var item;
        for (var i = this.historyItems.length - 1; item = this.historyItems[i]; i--)
            item.undo();
    };
    CompositionHistoryItem.prototype.add = function (historyItem) {
        if (historyItem == null)
            throw new Error("Can't add null HistoryItem");
        this.historyItems.push(historyItem);
    };
    CompositionHistoryItem.prototype.undoItemsQuery = function () {
        this.undo();
    };
    return CompositionHistoryItem;
}(HistoryItem));
exports.CompositionHistoryItem = CompositionHistoryItem;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
var common_1 = __webpack_require__(1);
var Color = (function () {
    function Color(color) {
        this._num = null;
        this._opacity = 1;
        this._rgb = null;
        this.assign(color);
    }
    Object.defineProperty(Color.prototype, "opacity", {
        get: function () {
            return this._opacity;
        },
        enumerable: false,
        configurable: true
    });
    Color.prototype.hasValue = function () {
        return common_1.isDefined(this._num) || !!this._rgb || this._opacity === 0;
    };
    Color.prototype.getValue = function () {
        if (this._opacity === 0 && !this._rgb)
            return false;
        if (common_1.isDefined(this._num))
            return this._num;
        if (this._rgb)
            return this.getRBGColor();
        return null;
    };
    Color.prototype.assign = function (source) {
        this.reset();
        if (typeof source === "string")
            this.assignFromString(source);
        if (typeof source === "number")
            this._num = source;
        if (source instanceof Array)
            this.assignFromRgbArray(source);
        if (source instanceof Color)
            this.assignFromColor(source);
    };
    Color.prototype.reset = function () {
        this._opacity = 1;
        this._num = null;
        this._rgb = null;
    };
    Color.prototype.assignFromString = function (color) {
        if (!color)
            return;
        if (color === "transparent")
            this._opacity = 0;
        if (color.indexOf("#") === 0)
            this.assignFromHexString(color);
        if (color.substr(0, 3).toLowerCase() === "rgb")
            this.assignFromRgbString(color);
    };
    Color.prototype.assignFromHexString = function (hex) {
        if (hex.length === 4)
            hex = "#" + hex[1].repeat(2) + hex[2].repeat(2) + hex[3].repeat(2);
        if (hex.length > 6) {
            var r = parseInt(hex.substr(1, 2), 16);
            var g = parseInt(hex.substr(3, 2), 16);
            var b = parseInt(hex.substr(5, 2), 16);
            this._rgb = [r, g, b];
        }
    };
    Color.prototype.assignFromRgbString = function (rgb) {
        var isRGBA = rgb.substr(0, 4).toLowerCase() === "rgba";
        var regResult = rgb.toLowerCase().match(isRGBA ? Color.rgbaRegexp : Color.rgbRegexp);
        if (regResult) {
            var r = parseInt(regResult[1]);
            var g = parseInt(regResult[2]);
            var b = parseInt(regResult[3]);
            this._rgb = [r, g, b];
            if (isRGBA)
                this._opacity = parseFloat(regResult[4]);
        }
    };
    Color.prototype.assignFromRgbArray = function (rgb) {
        if (rgb && rgb.length > 2) {
            this._rgb = [rgb[0], rgb[1], rgb[2]];
            if (common_1.isDefined(rgb[3]))
                this._opacity = rgb[3];
        }
    };
    Color.prototype.assignFromColor = function (source) {
        this._opacity = source._opacity;
        this._num = source._num;
        this._rgb = source._rgb;
    };
    Color.prototype.getRBGColor = function () {
        return this._rgb ? this._rgb : [0, 0, 0];
    };
    Color.prototype.applyOpacityToBackground = function (source) {
        if (this._opacity === 1)
            return;
        var background = source instanceof Color ? source : new Color(source);
        var backRGB = background.getValue();
        if (backRGB instanceof Array) {
            var alpha = this.opacity;
            var r = Math.round((1 - alpha) * backRGB[0] + alpha * this._rgb[0]);
            var g = Math.round((1 - alpha) * backRGB[1] + alpha * this._rgb[1]);
            var b = Math.round((1 - alpha) * backRGB[2] + alpha * this._rgb[2]);
            this._rgb = [r, g, b];
        }
    };
    Color.rgbRegexp = /rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/;
    Color.rgbaRegexp = /rgba?\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,?\s*([0-9]*\.?[0-9]*)\s*\)/;
    return Color;
}());
exports.Color = Color;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionBase = void 0;
var common_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(70);
var CollectionBase = (function () {
    function CollectionBase() {
        this._items = new Array();
        this._isGanttCollection = true;
    }
    CollectionBase.prototype.add = function (element) {
        if (!common_1.isDefined(element))
            return;
        if (this.getItemById(element.internalId))
            throw "The collection item with id ='" + element.internalId + "' already exists.";
        this._addItem(element);
    };
    CollectionBase.prototype.addRange = function (range) {
        for (var i = 0; i < range.length; i++)
            this.add(range[i]);
    };
    CollectionBase.prototype.remove = function (element) {
        var index = this._items.indexOf(element);
        if (index > -1 && index < this._items.length)
            this._removeItems(index, 1);
    };
    CollectionBase.prototype.clear = function () {
        this._removeItems(0, this._items.length);
    };
    CollectionBase.prototype._addItem = function (element) {
        this._items.push(element);
        delete this._invertedItems;
    };
    CollectionBase.prototype._removeItems = function (start, count) {
        this._items.splice(start, count);
        delete this._invertedItems;
    };
    Object.defineProperty(CollectionBase.prototype, "items", {
        get: function () {
            return this._items.slice();
        },
        set: function (value) {
            if (value)
                this._items = value.slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CollectionBase.prototype, "length", {
        get: function () {
            return this._items.length;
        },
        enumerable: false,
        configurable: true
    });
    CollectionBase.prototype.getItem = function (index) {
        if (index > -1 && index < this._items.length)
            return this._items[index];
        return null;
    };
    Object.defineProperty(CollectionBase.prototype, "invertedItems", {
        get: function () {
            var _a;
            (_a = this._invertedItems) !== null && _a !== void 0 ? _a : (this._invertedItems = this._createInvertedItems());
            return this._invertedItems;
        },
        enumerable: false,
        configurable: true
    });
    CollectionBase.prototype._createInvertedItems = function () {
        var result = {};
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            result[item.internalId] = item;
        }
        return result;
    };
    CollectionBase.prototype.getItemById = function (id) {
        return this.invertedItems[id];
    };
    CollectionBase.prototype.getItemByPublicId = function (id) {
        return this._items.filter(function (val) { return val.id === id || val.id.toString() === id; })[0];
    };
    CollectionBase.prototype.assign = function (sourceCollection) {
        if (!common_1.isDefined(sourceCollection))
            return;
        this.items = sourceCollection.items;
    };
    CollectionBase.prototype.importFromObject = function (source) {
        if (!common_1.isDefined(source))
            return;
        this.clear();
        if (source._isGanttCollection)
            this.assign(source);
        else if (source instanceof Array)
            this.importFromArray(source);
        else
            this.createItemFromObjectAndAdd(source);
    };
    CollectionBase.prototype.createItemFromObjectAndAdd = function (source) {
        if (common_1.isDefined(source)) {
            var item = this.createItem();
            item.assignFromObject(source);
            this.add(item);
        }
    };
    CollectionBase.prototype.importFromArray = function (values) {
        for (var i = 0; i < values.length; i++)
            this.createItemFromObjectAndAdd(values[i]);
    };
    CollectionBase.prototype.importFromJSON = function (json) {
        this.importFromObject(Utils_1.GanttJsonUtils.parseJson(json));
    };
    return CollectionBase;
}());
exports.CollectionBase = CollectionBase;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = __webpack_require__(5);
var common_1 = __webpack_require__(1);
var TouchUtils = (function () {
    function TouchUtils() {
    }
    TouchUtils.onEventAttachingToDocument = function (eventName, func) {
        if (browser_1.Browser.MacOSMobilePlatform && TouchUtils.isTouchEventName(eventName)) {
            if (!TouchUtils.documentTouchHandlers[eventName])
                TouchUtils.documentTouchHandlers[eventName] = [];
            TouchUtils.documentTouchHandlers[eventName].push(func);
            return TouchUtils.documentEventAttachingAllowed;
        }
        return true;
    };
    TouchUtils.isTouchEventName = function (eventName) {
        return browser_1.Browser.WebKitTouchUI && (eventName.indexOf('touch') > -1 || eventName.indexOf('gesture') > -1);
    };
    TouchUtils.isTouchEvent = function (evt) {
        return browser_1.Browser.WebKitTouchUI && common_1.isDefined(evt.changedTouches);
    };
    TouchUtils.getEventX = function (evt) {
        return browser_1.Browser.IE ? evt.pageX : evt.changedTouches[0].pageX;
    };
    TouchUtils.getEventY = function (evt) {
        return browser_1.Browser.IE ? evt.pageY : evt.changedTouches[0].pageY;
    };
    TouchUtils.touchMouseDownEventName = browser_1.Browser.WebKitTouchUI ? 'touchstart' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointerdown' : 'mousedown');
    TouchUtils.touchMouseUpEventName = browser_1.Browser.WebKitTouchUI ? 'touchend' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointerup' : 'mouseup');
    TouchUtils.touchMouseMoveEventName = browser_1.Browser.WebKitTouchUI ? 'touchmove' : (browser_1.Browser.Edge && browser_1.Browser.MSTouchUI && window.PointerEvent ? 'pointermove' : 'mousemove');
    TouchUtils.msTouchDraggableClassName = 'dxMSTouchDraggable';
    TouchUtils.documentTouchHandlers = {};
    TouchUtils.documentEventAttachingAllowed = true;
    return TouchUtils;
}());
exports.TouchUtils = TouchUtils;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleDef = void 0;
var common_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(2);
var Color_1 = __webpack_require__(16);
var PredefinedStyles_1 = __webpack_require__(39);
var Margin_1 = __webpack_require__(29);
var Width_1 = __webpack_require__(63);
var StyleDef = (function () {
    function StyleDef(source) {
        this._fillColor = new Color_1.Color();
        this._textColor = new Color_1.Color();
        this._lineColor = new Color_1.Color();
        this._cellWidth = new Width_1.Width();
        this._cellPadding = new Margin_1.Margin();
        if (source)
            this.assign(source);
    }
    Object.defineProperty(StyleDef.prototype, "font", {
        get: function () { return this._fontFamily; },
        set: function (value) { this._fontFamily = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.fontFamilies); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "fontStyle", {
        get: function () { return this._fontStyle; },
        set: function (value) { this._fontStyle = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.fontStyles); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "fontSize", {
        get: function () { return this._fontSize; },
        set: function (value) { this._fontSize = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "overflow", {
        get: function () { return this._overflow; },
        set: function (value) { this._overflow = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.overflow); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "halign", {
        get: function () { return this._horizontalAlign; },
        set: function (value) { this._horizontalAlign = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.horizontalAlign); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "valign", {
        get: function () { return this._verticalAlign; },
        set: function (value) { this._verticalAlign = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.verticalAlign); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "fillColor", {
        get: function () { return this._fillColor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "textColor", {
        get: function () { return this._textColor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "lineColor", {
        get: function () { return this._lineColor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "cellWidth", {
        get: function () { return this._cellWidth; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "cellPadding", {
        get: function () { return this._cellPadding; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "lineWidth", {
        get: function () { return this._lineWidth; },
        set: function (value) { this._lineWidth = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "minCellWidth", {
        get: function () { return this._minCellWidth; },
        set: function (value) { this._minCellWidth = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StyleDef.prototype, "minCellHeight", {
        get: function () { return this._minCellHeight; },
        set: function (value) { this._minCellHeight = value; },
        enumerable: false,
        configurable: true
    });
    StyleDef.prototype.assign = function (source) {
        if (!source)
            return;
        if (source instanceof StyleDef) {
            if (common_1.isDefined(source["font"]))
                this.font = source["font"];
            if (common_1.isDefined(source["fontStyle"]))
                this.fontStyle = source["fontStyle"];
            if (common_1.isDefined(source["overflow"]))
                this.overflow = source["overflow"];
            if (common_1.isDefined(source["halign"]))
                this.halign = source["halign"];
            if (common_1.isDefined(source["valign"]))
                this.valign = source["valign"];
            if (common_1.isDefined(source["fontSize"]))
                this.fontSize = source["fontSize"];
            if (common_1.isDefined(source["lineWidth"]))
                this.lineWidth = source["lineWidth"];
            if (common_1.isDefined(source["minCellWidth"]))
                this.minCellWidth = source["minCellWidth"];
            if (common_1.isDefined(source["minCellHeight"]))
                this.minCellHeight = source["minCellHeight"];
            if (common_1.isDefined(source["fillColor"]))
                this.fillColor.assign(source["fillColor"]);
            if (common_1.isDefined(source["textColor"]))
                this.textColor.assign(source["textColor"]);
            if (common_1.isDefined(source["lineColor"]))
                this.lineColor.assign(source["lineColor"]);
            if (common_1.isDefined(source["cellWidth"]))
                this.cellWidth.assign(source["cellWidth"]);
            if (common_1.isDefined(source["cellPadding"]))
                this.cellPadding.assign(source["cellPadding"]);
        }
        else
            this.assignFromCssStyle(source);
    };
    StyleDef.prototype.assignFromCssStyle = function (source) {
        if (source.fontFamily)
            this.font = this.getPdfFontFamily(source);
        this.fontStyle = this.getPdfFontStyle(source);
        if (common_1.isDefined(source.fontSize))
            this.fontSize = this.getPfrFontSize(source.fontSize);
        if (source.textAlign)
            this.halign = source.textAlign;
        if (source.verticalAlign)
            this.valign = source.verticalAlign;
        if (common_1.isDefined(source.borderWidth))
            this.lineWidth = source.borderWidth;
        if (common_1.isDefined(source.cellWidth))
            this.cellWidth.assign(source.cellWidth);
        if (common_1.isDefined(source.width))
            this.minCellWidth = typeof source.width === "number" ? source.width : dom_1.DomUtils.pxToInt(source.width);
        if (common_1.isDefined(source.height))
            this.minCellHeight = typeof source.height === "number" ? source.height : dom_1.DomUtils.pxToInt(source.height);
        if (source.backgroundColor)
            this.fillColor.assign(source.backgroundColor);
        if (source.color)
            this.textColor.assign(source.color);
        if (source.borderColor)
            this.lineColor.assign(source.borderColor);
        if (common_1.isDefined(source.width))
            this.cellWidth.assign(source.width);
        this.assignPaddingFromCss(source);
        if (common_1.isDefined(source.extraLeftPadding)) {
            var currentLeftPadding = this._cellPadding.left;
            this._cellPadding.left = currentLeftPadding ? currentLeftPadding + source.extraLeftPadding : source.extraLeftPadding;
        }
    };
    StyleDef.prototype.getPdfFontStyle = function (style) {
        var fontWeight = style.fontWeight;
        var numeric = parseInt(fontWeight);
        var isBold = fontWeight === "bold" || !isNaN(numeric) && numeric > 500;
        var isItalic = style.fontStyle === "italic";
        var result = isBold ? "bold" : "normal";
        if (isItalic)
            result = isBold ? "bolditalic" : "italic";
        return result;
    };
    StyleDef.prototype.getPdfFontFamily = function (style) {
        var fontFamily = style.fontFamily && style.fontFamily.toLowerCase();
        var result = "helvetica";
        if (fontFamily.indexOf("times") > -1)
            result = "times";
        if (fontFamily.indexOf("courier") > -1)
            result = "courier";
        return result;
    };
    StyleDef.prototype.getPfrFontSize = function (fontSize) {
        var size = dom_1.DomUtils.pxToInt(fontSize);
        if (!isNaN(size))
            return Math.ceil(size / 96 * 72);
    };
    StyleDef.prototype.assignPaddingFromCss = function (source) {
        if (source.padding)
            this._cellPadding.assign(source.padding);
        else {
            var padding = {};
            if (source.paddingLeft)
                padding["left"] = dom_1.DomUtils.pxToInt(source.paddingLeft);
            if (source.paddingTop)
                padding["top"] = dom_1.DomUtils.pxToInt(source.paddingTop);
            if (source.paddingRight)
                padding["right"] = dom_1.DomUtils.pxToInt(source.paddingRight);
            if (source.paddingBottom)
                padding["bottom"] = dom_1.DomUtils.pxToInt(source.paddingBottom);
            this._cellPadding.assign(padding);
        }
    };
    StyleDef.prototype.hasValue = function () {
        return true;
    };
    StyleDef.prototype.getValue = function () {
        var _this = this;
        var style = {};
        if (common_1.isDefined(this.font))
            style["font"] = this.font;
        if (common_1.isDefined(this.fontStyle))
            style["fontStyle"] = this.fontStyle;
        if (common_1.isDefined(this.fontSize))
            style["fontSize"] = this.fontSize;
        if (common_1.isDefined(this.overflow))
            style["overflow"] = this.overflow;
        if (common_1.isDefined(this.halign))
            style["halign"] = this.halign;
        if (common_1.isDefined(this.valign))
            style["valign"] = this.valign;
        if (common_1.isDefined(this.lineWidth))
            style["lineWidth"] = this.lineWidth;
        if (common_1.isDefined(this.minCellWidth))
            style["minCellWidth"] = this.minCellWidth;
        if (common_1.isDefined(this.minCellHeight))
            style["minCellHeight"] = this.minCellHeight;
        this.getJsPdfProviderProps().forEach(function (key) {
            var prop = _this[key];
            if (prop && prop.hasValue())
                style[key] = prop.getValue();
        });
        return style;
    };
    StyleDef.prototype.getJsPdfProviderProps = function () {
        return [
            "fillColor",
            "textColor",
            "lineColor",
            "cellWidth",
            "cellPadding"
        ];
    };
    return StyleDef;
}());
exports.StyleDef = StyleDef;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrenceBase = void 0;
var tslib_1 = __webpack_require__(0);
var DataObject_1 = __webpack_require__(12);
var DayOfWeek_1 = __webpack_require__(84);
var DayOfWeekMonthlyOccurrence_1 = __webpack_require__(48);
var Month_1 = __webpack_require__(85);
var common_1 = __webpack_require__(1);
var DateTimeUtils_1 = __webpack_require__(4);
var RecurrenceFactory_1 = __webpack_require__(49);
var RecurrenceBase = (function (_super) {
    tslib_1.__extends(RecurrenceBase, _super);
    function RecurrenceBase(start, end, interval, occurrenceCount) {
        if (start === void 0) { start = null; }
        if (end === void 0) { end = null; }
        if (interval === void 0) { interval = 1; }
        if (occurrenceCount === void 0) { occurrenceCount = 0; }
        var _this = _super.call(this) || this;
        _this._start = null;
        _this._end = null;
        _this._interval = 1;
        _this._occurrenceCount = 0;
        _this._dayOfWeek = 0;
        _this._day = 1;
        _this._dayOfWeekOccurrence = 0;
        _this._month = 0;
        _this._calculateByDayOfWeek = false;
        _this.start = start;
        _this.end = end;
        _this.interval = interval;
        _this.occurrenceCount = occurrenceCount;
        return _this;
    }
    RecurrenceBase.prototype.assignFromObject = function (sourceObj) {
        if (common_1.isDefined(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.start = DateTimeUtils_1.DateTimeUtils.convertToDate(sourceObj.start);
            this.end = DateTimeUtils_1.DateTimeUtils.convertToDate(sourceObj.end);
            if (common_1.isDefined(sourceObj.interval))
                this.interval = sourceObj.interval;
            if (common_1.isDefined(sourceObj.occurrenceCount))
                this.occurrenceCount = sourceObj.occurrenceCount;
            if (common_1.isDefined(sourceObj.dayOfWeek))
                this.dayOfWeekInternal = RecurrenceFactory_1.RecurrenceFactory.getEnumValue(DayOfWeek_1.DayOfWeek, sourceObj.dayOfWeek);
            if (common_1.isDefined(sourceObj.day))
                this.dayInternal = sourceObj.day;
            if (common_1.isDefined(sourceObj.dayOfWeekOccurrence))
                this.dayOfWeekOccurrenceInternal = RecurrenceFactory_1.RecurrenceFactory.getEnumValue(DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence, sourceObj.dayOfWeekOccurrence);
            if (common_1.isDefined(sourceObj.month))
                this.monthInternal = RecurrenceFactory_1.RecurrenceFactory.getEnumValue(Month_1.Month, sourceObj.month);
            if (common_1.isDefined(sourceObj.calculateByDayOfWeek))
                this._calculateByDayOfWeek = !!sourceObj.calculateByDayOfWeek;
        }
    };
    RecurrenceBase.prototype.calculatePoints = function (start, end) {
        if (!start || !end)
            return new Array();
        var from = DateTimeUtils_1.DateTimeUtils.getMaxDate(start, this._start);
        var to = DateTimeUtils_1.DateTimeUtils.getMinDate(end, this._end);
        if (this._occurrenceCount > 0)
            return this.calculatePointsByOccurrenceCount(from, to);
        return this.calculatePointsByDateRange(from, to);
    };
    RecurrenceBase.prototype.calculatePointsByOccurrenceCount = function (start, end) {
        var points = new Array();
        var point = this.getFirstPoint(start);
        while (!!point && points.length < this._occurrenceCount && DateTimeUtils_1.DateTimeUtils.compareDates(point, end) >= 0) {
            if (this.isRecurrencePoint(point))
                points.push(point);
            point = this.getNextPoint(point);
        }
        return points;
    };
    RecurrenceBase.prototype.calculatePointsByDateRange = function (start, end) {
        var points = new Array();
        var point = this.getFirstPoint(start);
        while (!!point && DateTimeUtils_1.DateTimeUtils.compareDates(point, end) >= 0) {
            if (this.isRecurrencePoint(point))
                points.push(point);
            point = this.getNextPoint(point);
        }
        return points;
    };
    RecurrenceBase.prototype.getFirstPoint = function (start) {
        if (this.isRecurrencePoint(start))
            return start;
        return this.getNextPoint(start);
    };
    RecurrenceBase.prototype.isRecurrencePoint = function (date) {
        return this.isDateInRange(date) && this.checkDate(date) && (!this.useIntervalInCalc() || this.checkInterval(date));
    };
    RecurrenceBase.prototype.isDateInRange = function (date) {
        if (!date)
            return false;
        if (this._start && DateTimeUtils_1.DateTimeUtils.compareDates(this.start, date) < 0)
            return false;
        if (this._occurrenceCount == 0 && this.end && DateTimeUtils_1.DateTimeUtils.compareDates(date, this.end) < 0)
            return false;
        return true;
    };
    RecurrenceBase.prototype.useIntervalInCalc = function () {
        return this.interval > 1 && !!this._start;
    };
    RecurrenceBase.prototype.getNextPoint = function (date) {
        if (!this.isDateInRange(date))
            return null;
        if (this.useIntervalInCalc())
            return this.calculatePointByInterval(date);
        return this.calculateNearestPoint(date);
    };
    RecurrenceBase.prototype.getSpecDayInMonth = function (year, month) {
        var date;
        if (this._calculateByDayOfWeek)
            date = DateTimeUtils_1.DateTimeUtils.getSpecificDayOfWeekInMonthDate(this.dayOfWeekInternal, year, month, this.dayOfWeekOccurrenceInternal);
        else
            date = new Date(year, month, this.dayInternal);
        return date;
    };
    Object.defineProperty(RecurrenceBase.prototype, "dayInternal", {
        get: function () { return this._day; },
        set: function (value) {
            if (value > 0 && value <= 31)
                this._day = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "dayOfWeekInternal", {
        get: function () { return this._dayOfWeek; },
        set: function (dayOfWeek) {
            if (dayOfWeek >= DayOfWeek_1.DayOfWeek.Sunday && dayOfWeek <= DayOfWeek_1.DayOfWeek.Saturday)
                this._dayOfWeek = dayOfWeek;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "dayOfWeekOccurrenceInternal", {
        get: function () {
            return this._dayOfWeekOccurrence;
        },
        set: function (value) {
            if (value >= DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence.First && value <= DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence.Last)
                this._dayOfWeekOccurrence = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "monthInternal", {
        get: function () { return this._month; },
        set: function (value) {
            if (value >= Month_1.Month.January && value <= Month_1.Month.December)
                this._month = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "start", {
        get: function () { return this._start; },
        set: function (date) {
            if (!date)
                return;
            this._start = date;
            if (!!this._end && date > this._end)
                this._end = date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "end", {
        get: function () { return this._end; },
        set: function (date) {
            if (!date)
                return;
            this._end = date;
            if (!!this._start && date < this._start)
                this._start = date;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "occurrenceCount", {
        get: function () { return this._occurrenceCount; },
        set: function (value) {
            if (value < 0)
                value = 0;
            this._occurrenceCount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RecurrenceBase.prototype, "interval", {
        get: function () { return this._interval; },
        set: function (value) {
            if (value > 0)
                this._interval = value;
        },
        enumerable: false,
        configurable: true
    });
    return RecurrenceBase;
}(DataObject_1.DataObject));
exports.RecurrenceBase = RecurrenceBase;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPropertyManipulator = exports.TaskPropertiesManipulator = exports.BaseManipulator = void 0;
var tslib_1 = __webpack_require__(0);
var HistoryItemState_1 = __webpack_require__(54);
var DateRange_1 = __webpack_require__(10);
var BaseManipulator = (function () {
    function BaseManipulator(viewModel, dispatcher) {
        this.viewModel = viewModel;
        this.dispatcher = dispatcher;
    }
    BaseManipulator.prototype.getErrorCallback = function () {
        return this.viewModel.getDataUpdateErrorCallback();
    };
    return BaseManipulator;
}());
exports.BaseManipulator = BaseManipulator;
var TaskPropertiesManipulator = (function (_super) {
    tslib_1.__extends(TaskPropertiesManipulator, _super);
    function TaskPropertiesManipulator(viewModel, dispatcher) {
        var _this = _super.call(this, viewModel, dispatcher) || this;
        _this.title = new TaskTitleManipulator(viewModel, dispatcher);
        _this.description = new TaskDescriptionManipulator(viewModel, dispatcher);
        _this.progress = new TaskProgressManipulator(viewModel, dispatcher);
        _this.start = new TaskStartDateManipulator(viewModel, dispatcher);
        _this.end = new TaskEndDateManipulator(viewModel, dispatcher);
        _this.move = new TaskMoveManipulator(viewModel, dispatcher);
        _this.color = new TaskColorManipulator(viewModel, dispatcher);
        return _this;
    }
    return TaskPropertiesManipulator;
}(BaseManipulator));
exports.TaskPropertiesManipulator = TaskPropertiesManipulator;
var TaskPropertyManipulator = (function (_super) {
    tslib_1.__extends(TaskPropertyManipulator, _super);
    function TaskPropertyManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskPropertyManipulator.prototype.setValue = function (id, newValue) {
        var task = this.viewModel.tasks.getItemById(id);
        var oldState = new HistoryItemState_1.HistoryItemState(id, this.getPropertyValue(task));
        this.setPropertyValue(task, newValue);
        var viewItem = this.viewModel.findItem(id);
        if (viewItem)
            this.viewModel.owner.recreateTaskElement(viewItem.visibleIndex);
        return oldState;
    };
    TaskPropertyManipulator.prototype.restoreValue = function (state) {
        if (!state)
            return;
        var task = this.viewModel.tasks.getItemById(state.id);
        this.setPropertyValue(task, state.value);
        var viewItem = this.viewModel.findItem(state.id);
        if (viewItem)
            this.viewModel.owner.recreateTaskElement(viewItem.visibleIndex);
    };
    return TaskPropertyManipulator;
}(BaseManipulator));
exports.TaskPropertyManipulator = TaskPropertyManipulator;
var TaskTitleManipulator = (function (_super) {
    tslib_1.__extends(TaskTitleManipulator, _super);
    function TaskTitleManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskTitleManipulator.prototype.getPropertyValue = function (task) {
        return task.title;
    };
    TaskTitleManipulator.prototype.setPropertyValue = function (task, value) {
        task.title = value;
        this.dispatcher.notifyTaskTitleChanged(task.id, value, this.getErrorCallback());
    };
    return TaskTitleManipulator;
}(TaskPropertyManipulator));
var TaskDescriptionManipulator = (function (_super) {
    tslib_1.__extends(TaskDescriptionManipulator, _super);
    function TaskDescriptionManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskDescriptionManipulator.prototype.getPropertyValue = function (task) {
        return task.description;
    };
    TaskDescriptionManipulator.prototype.setPropertyValue = function (task, value) {
        task.description = value;
        this.dispatcher.notifyTaskDescriptionChanged(task.id, value, this.getErrorCallback());
    };
    return TaskDescriptionManipulator;
}(TaskPropertyManipulator));
var TaskProgressManipulator = (function (_super) {
    tslib_1.__extends(TaskProgressManipulator, _super);
    function TaskProgressManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskProgressManipulator.prototype.getPropertyValue = function (task) {
        return task.progress;
    };
    TaskProgressManipulator.prototype.setPropertyValue = function (task, value) {
        value = value < 0 ? 0 : value > 100 ? 100 : value;
        task.progress = value;
        this.dispatcher.notifyTaskProgressChanged(task.id, value, this.getErrorCallback());
    };
    return TaskProgressManipulator;
}(TaskPropertyManipulator));
var TaskStartDateManipulator = (function (_super) {
    tslib_1.__extends(TaskStartDateManipulator, _super);
    function TaskStartDateManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskStartDateManipulator.prototype.getPropertyValue = function (task) {
        return task.start;
    };
    TaskStartDateManipulator.prototype.setPropertyValue = function (task, value) {
        task.start = value;
        this.dispatcher.notifyTaskStartChanged(task.id, value, this.getErrorCallback());
    };
    return TaskStartDateManipulator;
}(TaskPropertyManipulator));
var TaskEndDateManipulator = (function (_super) {
    tslib_1.__extends(TaskEndDateManipulator, _super);
    function TaskEndDateManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskEndDateManipulator.prototype.getPropertyValue = function (task) {
        return task.end;
    };
    TaskEndDateManipulator.prototype.setPropertyValue = function (task, value) {
        task.end = value;
        this.dispatcher.notifyTaskEndChanged(task.id, value, this.getErrorCallback());
    };
    return TaskEndDateManipulator;
}(TaskPropertyManipulator));
var TaskMoveManipulator = (function (_super) {
    tslib_1.__extends(TaskMoveManipulator, _super);
    function TaskMoveManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskMoveManipulator.prototype.getPropertyValue = function (task) {
        return new DateRange_1.DateRange(task.start, task.end);
    };
    TaskMoveManipulator.prototype.setPropertyValue = function (task, value) {
        task.start = value.start;
        task.end = value.end;
        this.dispatcher.notifyTaskStartChanged(task.id, value.start, this.getErrorCallback());
        this.dispatcher.notifyTaskEndChanged(task.id, value.end, this.getErrorCallback());
    };
    return TaskMoveManipulator;
}(TaskPropertyManipulator));
var TaskColorManipulator = (function (_super) {
    tslib_1.__extends(TaskColorManipulator, _super);
    function TaskColorManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskColorManipulator.prototype.getPropertyValue = function (task) {
        return task.color;
    };
    TaskColorManipulator.prototype.setPropertyValue = function (task, value) {
        task.color = value;
        this.dispatcher.notifyTaskColorChanged(task.id, value, this.getErrorCallback());
    };
    return TaskColorManipulator;
}(TaskPropertyManipulator));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerStateBase = void 0;
var point_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(2);
var HandlerStateBase = (function () {
    function HandlerStateBase(handler) {
        this.handler = handler;
    }
    HandlerStateBase.prototype.start = function () { };
    HandlerStateBase.prototype.finish = function () { };
    HandlerStateBase.prototype.getRelativePos = function (absolutePos) {
        var taskAreaX = dom_1.DomUtils.getAbsolutePositionX(this.handler.control.taskArea);
        var taskAreaY = dom_1.DomUtils.getAbsolutePositionY(this.handler.control.taskArea);
        return new point_1.Point(absolutePos.x - taskAreaX, absolutePos.y - taskAreaY);
    };
    return HandlerStateBase;
}());
exports.HandlerStateBase = HandlerStateBase;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseArguments = void 0;
var BaseArguments = (function () {
    function BaseArguments(key) {
        this.cancel = false;
        this.values = {};
        this.key = key;
    }
    return BaseArguments;
}());
exports.BaseArguments = BaseArguments;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveDependencyHistoryItem = exports.InsertDependencyHistoryItem = void 0;
var tslib_1 = __webpack_require__(0);
var HistoryItem_1 = __webpack_require__(15);
var InsertDependencyHistoryItem = (function (_super) {
    tslib_1.__extends(InsertDependencyHistoryItem, _super);
    function InsertDependencyHistoryItem(modelManipulator, predecessorId, successorId, type) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.predecessorId = predecessorId;
        _this.successorId = successorId;
        _this.type = type;
        return _this;
    }
    InsertDependencyHistoryItem.prototype.redo = function () {
        this.dependency = this.modelManipulator.dependency.insertDependency(this.predecessorId, this.successorId, this.type, this.dependency ? this.dependency.internalId : null);
    };
    InsertDependencyHistoryItem.prototype.undo = function () {
        this.modelManipulator.dependency.removeDependency(this.dependency.internalId);
    };
    return InsertDependencyHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.InsertDependencyHistoryItem = InsertDependencyHistoryItem;
var RemoveDependencyHistoryItem = (function (_super) {
    tslib_1.__extends(RemoveDependencyHistoryItem, _super);
    function RemoveDependencyHistoryItem(modelManipulator, dependencyId) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.dependencyId = dependencyId;
        return _this;
    }
    RemoveDependencyHistoryItem.prototype.redo = function () {
        this.dependency = this.modelManipulator.dependency.removeDependency(this.dependencyId);
    };
    RemoveDependencyHistoryItem.prototype.undo = function () {
        this.modelManipulator.dependency.insertDependency(this.dependency.predecessorId, this.dependency.successorId, this.dependency.type, this.dependencyId);
    };
    return RemoveDependencyHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.RemoveDependencyHistoryItem = RemoveDependencyHistoryItem;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DeassignResourceHistoryItem = exports.AssignResourceHistoryItem = exports.RemoveResourceHistoryItem = exports.CreateResourceHistoryItem = void 0;
var tslib_1 = __webpack_require__(0);
var HistoryItem_1 = __webpack_require__(15);
var CreateResourceHistoryItem = (function (_super) {
    tslib_1.__extends(CreateResourceHistoryItem, _super);
    function CreateResourceHistoryItem(modelManipulator, text, color, callback) {
        if (color === void 0) { color = ""; }
        var _this = _super.call(this, modelManipulator) || this;
        _this.text = text;
        _this.color = color;
        _this.createCallback = callback;
        return _this;
    }
    CreateResourceHistoryItem.prototype.redo = function () {
        this.resource = this.modelManipulator.resource.create(this.text, this.color, this.resource ? this.resource.internalId : null, this.createCallback);
    };
    CreateResourceHistoryItem.prototype.undo = function () {
        this.modelManipulator.resource.remove(this.resource.internalId);
    };
    return CreateResourceHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.CreateResourceHistoryItem = CreateResourceHistoryItem;
var RemoveResourceHistoryItem = (function (_super) {
    tslib_1.__extends(RemoveResourceHistoryItem, _super);
    function RemoveResourceHistoryItem(modelManipulator, resourceId) {
        var _this = _super.call(this) || this;
        _this.modelManipulator = modelManipulator;
        _this.resourceId = resourceId;
        return _this;
    }
    RemoveResourceHistoryItem.prototype.redo = function () {
        _super.prototype.redo.call(this);
        this.resource = this.modelManipulator.resource.remove(this.resourceId);
    };
    RemoveResourceHistoryItem.prototype.undo = function () {
        var _this = this;
        this.modelManipulator.resource.create(this.resource.text, this.resource.color, this.resourceId, function () {
            if (_this.resource.color)
                _this.modelManipulator.resource.properties.color.setValue(_this.resource.internalId, _this.resource.color);
            _super.prototype.undo.call(_this);
        });
    };
    RemoveResourceHistoryItem.prototype.undoItemsQuery = function () {
        this.modelManipulator.resource.create(this.resource.text, this.resource.color, this.resourceId, function () { });
        if (this.resource.color)
            this.modelManipulator.resource.properties.color.setValue(this.resource.internalId, this.resource.color);
        _super.prototype.undo.call(this);
    };
    return RemoveResourceHistoryItem;
}(HistoryItem_1.CompositionHistoryItem));
exports.RemoveResourceHistoryItem = RemoveResourceHistoryItem;
var AssignResourceHistoryItem = (function (_super) {
    tslib_1.__extends(AssignResourceHistoryItem, _super);
    function AssignResourceHistoryItem(modelManipulator, resourceId, taskId) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.resourceId = resourceId;
        _this.taskId = taskId;
        return _this;
    }
    AssignResourceHistoryItem.prototype.redo = function () {
        this.assignment = this.modelManipulator.resource.assign(this.resourceId, this.taskId, this.assignment ? this.assignment.internalId : null);
    };
    AssignResourceHistoryItem.prototype.undo = function () {
        this.modelManipulator.resource.deassig(this.assignment.internalId);
    };
    return AssignResourceHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.AssignResourceHistoryItem = AssignResourceHistoryItem;
var DeassignResourceHistoryItem = (function (_super) {
    tslib_1.__extends(DeassignResourceHistoryItem, _super);
    function DeassignResourceHistoryItem(modelManipulator, assignmentId) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.assignmentId = assignmentId;
        return _this;
    }
    DeassignResourceHistoryItem.prototype.redo = function () {
        this.assignment = this.modelManipulator.resource.deassig(this.assignmentId);
    };
    DeassignResourceHistoryItem.prototype.undo = function () {
        this.modelManipulator.resource.assign(this.assignment.resourceId, this.assignment.taskId, this.assignmentId);
    };
    return DeassignResourceHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.DeassignResourceHistoryItem = DeassignResourceHistoryItem;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationDialogParameters = exports.ConfirmationDialog = exports.ConfirmationType = void 0;
var tslib_1 = __webpack_require__(0);
var DialogBase_1 = __webpack_require__(27);
var ConfirmationType;
(function (ConfirmationType) {
    ConfirmationType[ConfirmationType["TaskDelete"] = 0] = "TaskDelete";
    ConfirmationType[ConfirmationType["DependencyDelete"] = 1] = "DependencyDelete";
    ConfirmationType[ConfirmationType["ResourcesDelete"] = 2] = "ResourcesDelete";
})(ConfirmationType = exports.ConfirmationType || (exports.ConfirmationType = {}));
var ConfirmationDialog = (function (_super) {
    tslib_1.__extends(ConfirmationDialog, _super);
    function ConfirmationDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfirmationDialog.prototype.applyParameters = function (_newParameters, oldParameters) {
        this.history.beginTransaction();
        oldParameters.callback();
        this.history.endTransaction();
        this.control.barManager.updateItemsState([]);
        return true;
    };
    ConfirmationDialog.prototype.createParameters = function (options) {
        return options;
    };
    ConfirmationDialog.prototype.getDialogName = function () {
        return "Confirmation";
    };
    return ConfirmationDialog;
}(DialogBase_1.DialogBase));
exports.ConfirmationDialog = ConfirmationDialog;
var ConfirmationDialogParameters = (function (_super) {
    tslib_1.__extends(ConfirmationDialogParameters, _super);
    function ConfirmationDialogParameters(type, callback) {
        var _this = _super.call(this) || this;
        _this.type = type;
        _this.callback = callback;
        return _this;
    }
    ConfirmationDialogParameters.prototype.clone = function () {
        var result = new ConfirmationDialogParameters(this.type, this.callback);
        result.message = this.message;
        return result;
    };
    return ConfirmationDialogParameters;
}(DialogBase_1.DialogParametersBase));
exports.ConfirmationDialogParameters = ConfirmationDialogParameters;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogParametersBase = exports.DialogBase = void 0;
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(7);
var DialogBase = (function (_super) {
    tslib_1.__extends(DialogBase, _super);
    function DialogBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DialogBase.prototype.executeInternal = function (options) {
        var _this = this;
        var params = this.createParameters(options);
        var initParams = params.clone();
        if (!this.onBeforeDialogShow(params))
            return false;
        this.control.ganttOwner.showDialog(this.getDialogName(), params, function (result) {
            if (result)
                _this.applyParameters(result, initParams);
        }, function () {
            _this.afterClosing();
        });
        return true;
    };
    DialogBase.prototype.onBeforeDialogShow = function (params) {
        return true;
    };
    DialogBase.prototype.applyParameters = function (_newParameters, _oldParameters) {
        return false;
    };
    DialogBase.prototype.afterClosing = function () { };
    DialogBase.prototype.getState = function () {
        return new CommandBase_1.SimpleCommandState(this.isEnabled());
    };
    return DialogBase;
}(CommandBase_1.CommandBase));
exports.DialogBase = DialogBase;
var DialogParametersBase = (function () {
    function DialogParametersBase() {
    }
    return DialogParametersBase;
}());
exports.DialogParametersBase = DialogParametersBase;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskColorHistoryItem = exports.TaskMoveHistoryItem = exports.TaskEndHistoryItem = exports.TaskStartHistoryItem = exports.TaskProgressHistoryItem = exports.TaskDescriptionHistoryItem = exports.TaskTitleHistoryItem = exports.TaskPropertiesHistoryItemBase = void 0;
var tslib_1 = __webpack_require__(0);
var HistoryItem_1 = __webpack_require__(15);
var TaskPropertiesHistoryItemBase = (function (_super) {
    tslib_1.__extends(TaskPropertiesHistoryItemBase, _super);
    function TaskPropertiesHistoryItemBase(modelManipulator, taskId, newValue) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.taskId = taskId;
        _this.newValue = newValue;
        return _this;
    }
    TaskPropertiesHistoryItemBase.prototype.redo = function () {
        this.oldState = this.getPropertiesManipulator().setValue(this.taskId, this.newValue);
    };
    TaskPropertiesHistoryItemBase.prototype.undo = function () {
        this.getPropertiesManipulator().restoreValue(this.oldState);
    };
    TaskPropertiesHistoryItemBase.prototype.getPropertiesManipulator = function () {
        throw new Error("Not Implemented");
    };
    return TaskPropertiesHistoryItemBase;
}(HistoryItem_1.HistoryItem));
exports.TaskPropertiesHistoryItemBase = TaskPropertiesHistoryItemBase;
var TaskTitleHistoryItem = (function (_super) {
    tslib_1.__extends(TaskTitleHistoryItem, _super);
    function TaskTitleHistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskTitleHistoryItem.prototype.getPropertiesManipulator = function () {
        return this.modelManipulator.task.properties.title;
    };
    return TaskTitleHistoryItem;
}(TaskPropertiesHistoryItemBase));
exports.TaskTitleHistoryItem = TaskTitleHistoryItem;
var TaskDescriptionHistoryItem = (function (_super) {
    tslib_1.__extends(TaskDescriptionHistoryItem, _super);
    function TaskDescriptionHistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskDescriptionHistoryItem.prototype.getPropertiesManipulator = function () {
        return this.modelManipulator.task.properties.description;
    };
    return TaskDescriptionHistoryItem;
}(TaskPropertiesHistoryItemBase));
exports.TaskDescriptionHistoryItem = TaskDescriptionHistoryItem;
var TaskProgressHistoryItem = (function (_super) {
    tslib_1.__extends(TaskProgressHistoryItem, _super);
    function TaskProgressHistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskProgressHistoryItem.prototype.getPropertiesManipulator = function () {
        return this.modelManipulator.task.properties.progress;
    };
    return TaskProgressHistoryItem;
}(TaskPropertiesHistoryItemBase));
exports.TaskProgressHistoryItem = TaskProgressHistoryItem;
var TaskStartHistoryItem = (function (_super) {
    tslib_1.__extends(TaskStartHistoryItem, _super);
    function TaskStartHistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskStartHistoryItem.prototype.getPropertiesManipulator = function () {
        return this.modelManipulator.task.properties.start;
    };
    return TaskStartHistoryItem;
}(TaskPropertiesHistoryItemBase));
exports.TaskStartHistoryItem = TaskStartHistoryItem;
var TaskEndHistoryItem = (function (_super) {
    tslib_1.__extends(TaskEndHistoryItem, _super);
    function TaskEndHistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskEndHistoryItem.prototype.getPropertiesManipulator = function () {
        return this.modelManipulator.task.properties.end;
    };
    return TaskEndHistoryItem;
}(TaskPropertiesHistoryItemBase));
exports.TaskEndHistoryItem = TaskEndHistoryItem;
var TaskMoveHistoryItem = (function (_super) {
    tslib_1.__extends(TaskMoveHistoryItem, _super);
    function TaskMoveHistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskMoveHistoryItem.prototype.getPropertiesManipulator = function () {
        return this.modelManipulator.task.properties.move;
    };
    return TaskMoveHistoryItem;
}(TaskPropertiesHistoryItemBase));
exports.TaskMoveHistoryItem = TaskMoveHistoryItem;
var TaskColorHistoryItem = (function (_super) {
    tslib_1.__extends(TaskColorHistoryItem, _super);
    function TaskColorHistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskColorHistoryItem.prototype.getPropertiesManipulator = function () {
        return this.modelManipulator.task.properties.color;
    };
    return TaskColorHistoryItem;
}(TaskPropertiesHistoryItemBase));
exports.TaskColorHistoryItem = TaskColorHistoryItem;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Margin = void 0;
var common_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(2);
var Margin = (function () {
    function Margin(values) {
        this.assign(values);
    }
    Margin.prototype.assign = function (values) {
        if (!common_1.isDefined(values))
            return;
        if (typeof values === "string")
            this.assignFromString(values);
        else if (typeof values === "number" || values instanceof Array)
            this.assignWithValues(values);
        else {
            var source = values || values;
            this.assignWithMargin(source);
        }
    };
    Margin.prototype.assignFromString = function (source) {
        var values = source.split(" ").map(function (p) { return dom_1.DomUtils.pxToInt(p); });
        this.assignWithValues(values);
    };
    Margin.prototype.assignWithMargin = function (source) {
        if (common_1.isDefined(source.top))
            this.top = source.top;
        if (common_1.isDefined(source.right))
            this.right = source.right;
        if (common_1.isDefined(source.bottom))
            this.bottom = source.bottom;
        if (common_1.isDefined(source.left))
            this.left = source.left;
    };
    Margin.prototype.assignWithValues = function (values) {
        var numbers = this.getCorrectedValues(values);
        this.top = numbers[0];
        this.right = numbers[1];
        this.bottom = numbers[2];
        this.left = numbers[3];
    };
    Margin.prototype.getCorrectedValues = function (values) {
        var result = [this.top, this.right, this.bottom, this.left];
        if (typeof values === "number") {
            var num = values;
            result = [num, num, num, num];
        }
        else {
            var numbers = values;
            switch (numbers.length) {
                case 1:
                    result = [numbers[0], numbers[0], numbers[0], numbers[0]];
                    break;
                case 2:
                    result = [numbers[0], numbers[1], numbers[0], numbers[1]];
                    break;
                case 3:
                    result = [numbers[0], numbers[1], numbers[2], numbers[1]];
                    break;
                default:
                    numbers.forEach(function (v, i) { return result[i] = v; });
                    break;
            }
        }
        return result;
    };
    Margin.prototype.hasValue = function () {
        return common_1.isDefined(this.top) || common_1.isDefined(this.left) || common_1.isDefined(this.right) || common_1.isDefined(this.bottom);
    };
    Margin.prototype.getValue = function () {
        if (!this.hasValue())
            return null;
        if (this.top === this.bottom && this.left === this.right && this.top === this.left)
            return this.top;
        var result = {};
        if (common_1.isDefined(this.top))
            result["top"] = this.top;
        if (common_1.isDefined(this.left))
            result["left"] = this.left;
        if (common_1.isDefined(this.right))
            result["right"] = this.right;
        if (common_1.isDefined(this.bottom))
            result["bottom"] = this.bottom;
        return result;
    };
    return Margin;
}());
exports.Margin = Margin;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfPageTableNames = void 0;
var PdfPageTableNames = (function () {
    function PdfPageTableNames() {
    }
    PdfPageTableNames.treeListHeader = "treeListHeader";
    PdfPageTableNames.treeListMain = "treeListMain";
    PdfPageTableNames.chartMain = "chartMain";
    PdfPageTableNames.chartScaleTop = "chartScaleTop";
    PdfPageTableNames.chartScaleBottom = "chartScaleBottom";
    return PdfPageTableNames;
}());
exports.PdfPageTableNames = PdfPageTableNames;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceCollection = void 0;
var tslib_1 = __webpack_require__(0);
var CollectionBase_1 = __webpack_require__(17);
var Resource_1 = __webpack_require__(42);
var ResourceCollection = (function (_super) {
    tslib_1.__extends(ResourceCollection, _super);
    function ResourceCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceCollection.prototype.createItem = function () { return new Resource_1.Resource(); };
    return ResourceCollection;
}(CollectionBase_1.CollectionBase));
exports.ResourceCollection = ResourceCollection;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.isAlpha = function (ch) {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    };
    StringUtils.isDigit = function (ch) {
        return ch >= '0' && ch <= '9';
    };
    StringUtils.stringHashCode = function (str) {
        var hash = 0;
        if (str.length === 0)
            return hash;
        var strLen = str.length;
        for (var i = 0; i < strLen; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    };
    StringUtils.endsAt = function (str, template) {
        var strInd = str.length - 1;
        var tmplInd = template.length - 1;
        var strStartInd = strInd - tmplInd;
        if (strStartInd < 0)
            return false;
        for (; strInd >= strStartInd; strInd--, tmplInd--) {
            if (str[strInd] !== template[tmplInd])
                return false;
        }
        return true;
    };
    StringUtils.startsAt = function (str, template) {
        return str.substr(0, template.length) === template;
    };
    StringUtils.stringInLowerCase = function (str) {
        return str.toLowerCase() === str;
    };
    StringUtils.stringInUpperCase = function (str) {
        return str.toUpperCase() === str;
    };
    StringUtils.atLeastOneSymbolInUpperCase = function (str) {
        for (var i = 0, char = void 0; char = str[i]; i++) {
            if (StringUtils.stringInUpperCase(char) && !StringUtils.stringInLowerCase(char))
                return true;
        }
        return false;
    };
    StringUtils.getSymbolFromEnd = function (text, posFromEnd) {
        return text[text.length - posFromEnd];
    };
    StringUtils.trim = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, true, true);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("(^[" + joinedChars + "]*)|([" + joinedChars + "]*$)", 'g'), '');
        }
    };
    StringUtils.trimStart = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, true, false);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("^[" + joinedChars + "]*", 'g'), '');
        }
    };
    StringUtils.trimEnd = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, false, true);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("[" + joinedChars + "]*$", 'g'), '');
        }
    };
    StringUtils.getDecimalSeparator = function () {
        return (1.1).toLocaleString().substr(1, 1);
    };
    StringUtils.repeat = function (str, count) {
        return new Array(count <= 0 ? 0 : count + 1).join(str);
    };
    StringUtils.isNullOrEmpty = function (str) {
        return !str || !str.length;
    };
    StringUtils.padLeft = function (str, totalWidth, paddingChar) {
        return StringUtils.repeat(paddingChar, Math.max(0, totalWidth - str.length)) + str;
    };
    StringUtils.trimInternal = function (source, trimStart, trimEnd) {
        var len = source.length;
        if (!len)
            return source;
        if (len < 0xBABA1) {
            var result = source;
            if (trimStart)
                result = result.replace(/^\s+/, '');
            if (trimEnd)
                result = result.replace(/\s+$/, '');
            return result;
        }
        else {
            var start = 0;
            if (trimEnd) {
                while (len > 0 && /\s/.test(source[len - 1]))
                    len--;
            }
            if (trimStart && len > 0) {
                while (start < len && /\s/.test(source[start]))
                    start++;
            }
            return source.substring(start, len);
        }
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementTextHelperCultureInfo = exports.ElementTextHelper = exports.DateUtils = void 0;
var Enums_1 = __webpack_require__(11);
var dom_1 = __webpack_require__(2);
var DateUtils = (function () {
    function DateUtils() {
    }
    DateUtils.getDaysInMonth = function (month, year) {
        var d = new Date(year, month + 1, 0);
        return d.getDate();
    };
    DateUtils.getOffsetInMonths = function (start, end) {
        return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
    };
    DateUtils.getOffsetInQuarters = function (start, end) {
        return (end.getFullYear() - start.getFullYear()) * 4 + Math.floor(end.getMonth() / 3) - Math.floor(start.getMonth() / 3);
    };
    DateUtils.getNearestScaleTickDate = function (date, range, tickTimeSpan, viewType) {
        var result = new Date();
        var rangeStartTime = range.start.getTime();
        var rangeEndTime = range.end.getTime();
        result.setTime(date.getTime());
        if (date.getTime() < rangeStartTime)
            result.setTime(rangeStartTime);
        else if (date.getTime() > rangeEndTime)
            result.setTime(rangeEndTime);
        else if (this.needCorrectDate(date, rangeStartTime, tickTimeSpan, viewType)) {
            var nearestLeftTickTime = this.getNearestLeftTickTime(date, rangeStartTime, tickTimeSpan, viewType);
            var nearestRightTickTime = this.getNextTickTime(nearestLeftTickTime, tickTimeSpan, viewType);
            if (Math.abs(date.getTime() - nearestLeftTickTime) > Math.abs(date.getTime() - nearestRightTickTime))
                result.setTime(nearestRightTickTime);
            else
                result.setTime(nearestLeftTickTime);
        }
        return result;
    };
    DateUtils.needCorrectDate = function (date, rangeStartTime, tickTimeSpan, viewType) {
        if (viewType == Enums_1.ViewType.Months)
            return date.getTime() !== new Date(date.getFullYear(), date.getMonth(), 1).getTime();
        return (date.getTime() - rangeStartTime) % tickTimeSpan !== 0;
    };
    DateUtils.getNearestLeftTickTime = function (date, rangeStartTime, tickTimeSpan, viewType) {
        if (viewType == Enums_1.ViewType.Months)
            return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
        var tickCountAtLeft = Math.floor((date.getTime() - rangeStartTime) / tickTimeSpan);
        return rangeStartTime + tickCountAtLeft * tickTimeSpan;
    };
    DateUtils.getNextTickTime = function (currentTickTime, tickTimeSpan, viewType) {
        if (viewType == Enums_1.ViewType.Months) {
            var nextTickDate = new Date();
            nextTickDate.setTime(currentTickTime);
            nextTickDate.setMonth(nextTickDate.getMonth() + 1);
            return nextTickDate.getTime();
        }
        return currentTickTime + tickTimeSpan;
    };
    DateUtils.adjustStartDateByViewType = function (date, viewType, firstDayOfWeek) {
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
            case Enums_1.ViewType.SixHours:
            case Enums_1.ViewType.Hours:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate());
            case Enums_1.ViewType.Days:
            case Enums_1.ViewType.Weeks:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + firstDayOfWeek);
            case Enums_1.ViewType.Months:
            case Enums_1.ViewType.Quarter:
            case Enums_1.ViewType.Years:
                return new Date(date.getFullYear(), 0, 1);
            default:
                return new Date();
        }
    };
    DateUtils.adjustEndDateByViewType = function (date, viewType, firstDayOfWeek) {
        if (firstDayOfWeek === void 0) { firstDayOfWeek = 0; }
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1);
            case Enums_1.ViewType.SixHours:
            case Enums_1.ViewType.Hours:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
            case Enums_1.ViewType.Days:
            case Enums_1.ViewType.Weeks:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 - date.getDay() + firstDayOfWeek);
            case Enums_1.ViewType.Months:
            case Enums_1.ViewType.Quarter:
            case Enums_1.ViewType.Years:
                return new Date(date.getFullYear() + 1, 0, 1);
            default:
                return new Date();
        }
    };
    DateUtils.roundStartDate = function (date, viewType) {
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
            case Enums_1.ViewType.Hours:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 1);
            case Enums_1.ViewType.SixHours:
            case Enums_1.ViewType.Days:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
            case Enums_1.ViewType.Weeks:
                return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
            case Enums_1.ViewType.Months:
                return new Date(date.getFullYear(), date.getMonth() - 1);
            case Enums_1.ViewType.Quarter:
            case Enums_1.ViewType.Years:
                return new Date(date.getFullYear() - 1, 0, 1);
            default:
                return new Date();
        }
    };
    DateUtils.getTickTimeSpan = function (viewType) {
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
                return DateUtils.msPerHour / 6;
            case Enums_1.ViewType.Hours:
                return DateUtils.msPerHour;
            case Enums_1.ViewType.SixHours:
                return DateUtils.msPerHour * 6;
            case Enums_1.ViewType.Days:
                return DateUtils.msPerDay;
            case Enums_1.ViewType.Weeks:
                return DateUtils.msPerWeek;
            case Enums_1.ViewType.Months:
                return DateUtils.msPerMonth;
            case Enums_1.ViewType.Quarter:
                return DateUtils.msPerMonth * 3;
            case Enums_1.ViewType.Years:
                return DateUtils.msPerYear;
        }
    };
    DateUtils.parse = function (data) {
        return typeof data === "function" ? new Date(data()) : new Date(data);
    };
    DateUtils.getTimezoneOffsetDiff = function (data1, data2) {
        return data2.getTimezoneOffset() - data1.getTimezoneOffset();
    };
    DateUtils.getOrCreateUTCDate = function (date) {
        var timezoneOffset = date.getTimezoneOffset();
        return timezoneOffset ? new Date(date.valueOf() + timezoneOffset * 60000) : date;
    };
    DateUtils.msPerHour = 3600000;
    DateUtils.msPerDay = 24 * DateUtils.msPerHour;
    DateUtils.msPerWeek = 7 * DateUtils.msPerDay;
    DateUtils.msPerMonth = 30 * DateUtils.msPerDay;
    DateUtils.msPerYear = 365 * DateUtils.msPerDay;
    DateUtils.ViewTypeToScaleMap = createViewTypeToScaleMap();
    return DateUtils;
}());
exports.DateUtils = DateUtils;
var ElementTextHelper = (function () {
    function ElementTextHelper(cultureInfo) {
        this.longestAbbrMonthName = null;
        this.longestMonthName = null;
        this.longestAbbrDayName = null;
        var canvas = document.createElement("canvas");
        this.textMeasureContext = canvas.getContext("2d");
        this.cultureInfo = cultureInfo;
    }
    ElementTextHelper.prototype.setFont = function (fontHolder) {
        var computedStyle = dom_1.DomUtils.getCurrentStyle(fontHolder);
        var font = computedStyle.font ? computedStyle.font :
            computedStyle.fontStyle + " " + computedStyle.fontVariant + " " + computedStyle.fontWeight + " "
                + computedStyle.fontSize + " / " + computedStyle.lineHeight + " " + computedStyle.fontFamily;
        this.textMeasureContext.font = font;
    };
    ElementTextHelper.prototype.setSettings = function (startTime, viewType, modelItems) {
        this.startTime = startTime;
        this.viewType = viewType;
        this.modelItems = modelItems;
    };
    ElementTextHelper.prototype.getScaleItemStartDate = function (index, scaleType) {
        var result = new Date(this.startTime);
        switch (scaleType) {
            case Enums_1.ViewType.TenMinutes:
                result.setTime(this.startTime + index * DateUtils.msPerHour / 6);
                break;
            case Enums_1.ViewType.Hours:
                result.setTime(this.startTime + index * DateUtils.msPerHour);
                break;
            case Enums_1.ViewType.SixHours:
                result.setTime(this.startTime + index * DateUtils.msPerHour * 6);
                break;
            case Enums_1.ViewType.Days:
                result.setTime(this.startTime + index * DateUtils.msPerDay);
                break;
            case Enums_1.ViewType.Weeks:
                result.setTime(this.startTime + index * DateUtils.msPerWeek);
                break;
            case Enums_1.ViewType.Months:
                result.setMonth(result.getMonth() + index);
                break;
            case Enums_1.ViewType.Quarter:
                result.setMonth(result.getMonth() + index * 3);
                break;
            case Enums_1.ViewType.Years:
                result.setFullYear(result.getFullYear() + index);
                break;
            case Enums_1.ViewType.FiveYears:
                result.setFullYear(result.getFullYear() + index * 5);
                break;
        }
        result = this.getScaleStartDateCorrectedWithDST(result);
        return result;
    };
    ElementTextHelper.prototype.getScaleStartDateCorrectedWithDST = function (date) {
        var timeZoneDiff = DateUtils.getTimezoneOffsetDiff(new Date(this.startTime), date);
        return timeZoneDiff > 0 ? new Date(date.getTime() + timeZoneDiff * 60000) : date;
    };
    ElementTextHelper.prototype.getScaleItemText = function (index, scaleType) {
        var scaleItemStartDate = this.getScaleItemStartDate(index, scaleType);
        var isViewTypeScale = this.viewType.valueOf() == scaleType.valueOf();
        switch (scaleType) {
            case Enums_1.ViewType.TenMinutes:
                return this.getTenMinutesScaleItemText(scaleItemStartDate);
            case Enums_1.ViewType.Hours:
            case Enums_1.ViewType.SixHours:
                return this.getHoursScaleItemText(scaleItemStartDate);
            case Enums_1.ViewType.Days:
                return this.getDaysScaleItemText(scaleItemStartDate, isViewTypeScale);
            case Enums_1.ViewType.Weeks:
                return this.getWeeksScaleItemText(scaleItemStartDate, isViewTypeScale);
            case Enums_1.ViewType.Months:
                return this.getMonthsScaleItemText(scaleItemStartDate, isViewTypeScale);
            case Enums_1.ViewType.Quarter:
                return this.getQuarterScaleItemText(scaleItemStartDate, isViewTypeScale);
            case Enums_1.ViewType.Years:
                return this.getYearsScaleItemText(scaleItemStartDate);
            case Enums_1.ViewType.FiveYears:
                return this.getFiveYearsScaleItemText(scaleItemStartDate);
        }
    };
    ElementTextHelper.prototype.getTenMinutesScaleItemText = function (scaleItemDate) {
        var minutes = scaleItemDate.getMinutes() + 1;
        return (Math.ceil(minutes / 10) * 10).toString();
    };
    ElementTextHelper.prototype.getThirtyMinutesScaleItemText = function (scaleItemDate) {
        var minutes = scaleItemDate.getMinutes();
        return minutes < 30 ? "30" : "60";
    };
    ElementTextHelper.prototype.getHoursScaleItemText = function (scaleItemDate) {
        var hours = scaleItemDate.getHours();
        var hourDisplayText = this.getHourDisplayText(hours);
        var amPmText = hours < 12 ? this.getAmText() : this.getPmText();
        return this.getHoursScaleItemTextCore(hourDisplayText, amPmText);
    };
    ElementTextHelper.prototype.getDaysScaleItemText = function (scaleItemDate, isViewTypeScale) {
        return this.getDayTotalText(scaleItemDate, true, isViewTypeScale, isViewTypeScale, !isViewTypeScale);
    };
    ElementTextHelper.prototype.getWeeksScaleItemText = function (scaleItemDate, isViewTypeScale) {
        var weekLastDayDate = new Date(scaleItemDate.getTime() + DateUtils.msPerWeek - DateUtils.msPerDay);
        return this.getWeeksScaleItemTextCore(this.getDayTotalText(scaleItemDate, isViewTypeScale, true, isViewTypeScale, !isViewTypeScale), this.getDayTotalText(weekLastDayDate, isViewTypeScale, true, isViewTypeScale, !isViewTypeScale));
    };
    ElementTextHelper.prototype.getMonthsScaleItemText = function (scaleItemDate, isViewTypeScale) {
        var monthNames = this.getMonthNames();
        var yearDisplayText = !isViewTypeScale ? scaleItemDate.getFullYear().toString() : "";
        return this.getMonthsScaleItemTextCore(monthNames[scaleItemDate.getMonth()], yearDisplayText);
    };
    ElementTextHelper.prototype.getQuarterScaleItemText = function (scaleItemDate, isViewTypeScale) {
        var quarterNames = this.getQuarterNames();
        var yearDisplayText = !isViewTypeScale ? scaleItemDate.getFullYear().toString() : "";
        return this.getMonthsScaleItemTextCore(quarterNames[Math.floor(scaleItemDate.getMonth() / 3)], yearDisplayText);
    };
    ElementTextHelper.prototype.getYearsScaleItemText = function (scaleItemDate) {
        return scaleItemDate.getFullYear().toString();
    };
    ElementTextHelper.prototype.getFiveYearsScaleItemText = function (scaleItemDate) {
        return scaleItemDate.getFullYear().toString() + " - " + (scaleItemDate.getFullYear() + 4).toString();
    };
    ElementTextHelper.prototype.getHourDisplayText = function (hours) {
        if (this.hasAmPm())
            return (hours == 0 ? 12 : (hours <= 12 ? hours : hours - 12)).toString();
        return hours < 10 ? "0" + hours : hours.toString();
    };
    ElementTextHelper.prototype.getDayTotalText = function (scaleItemDate, displayDayName, useAbbrDayNames, useAbbrMonthNames, displayYear) {
        var monthNames = useAbbrMonthNames ? this.getAbbrMonthNames() : this.getMonthNames();
        var dayNames = useAbbrDayNames ? this.getAbbrDayNames() : this.getDayNames();
        var dayNameDisplayText = displayDayName ? dayNames[scaleItemDate.getDay()] : "";
        var day = scaleItemDate.getDate();
        var monthName = monthNames[scaleItemDate.getMonth()];
        var yearDisplayText = displayYear ? scaleItemDate.getFullYear().toString() : "";
        return this.getDayTotalTextCore(dayNameDisplayText, day.toString(), monthName, yearDisplayText);
    };
    ElementTextHelper.prototype.getTaskText = function (index) {
        var item = this.modelItems[index];
        return item ? item.task.title : "";
    };
    ElementTextHelper.prototype.getTaskVisibility = function (index) {
        var item = this.modelItems[index];
        return !!item && item.getVisible();
    };
    ElementTextHelper.prototype.hasAmPm = function () {
        return this.getAmText().length > 0 || this.getPmText().length > 0;
    };
    ElementTextHelper.prototype.getScaleItemTextTemplate = function (viewType) {
        switch (viewType) {
            case Enums_1.ViewType.TenMinutes:
                return "00";
            case Enums_1.ViewType.Hours:
            case Enums_1.ViewType.SixHours:
                return this.getHoursScaleItemTextCore("00", this.getAmText());
            case Enums_1.ViewType.Days:
                return this.getDayTextTemplate();
            case Enums_1.ViewType.Weeks:
                return this.getWeekTextTemplate();
            case Enums_1.ViewType.Months:
                return this.getMonthsScaleItemTextCore(this.getLongestMonthName(), "");
            case Enums_1.ViewType.Quarter:
                return "Q4";
            case Enums_1.ViewType.Years:
                return "0000";
        }
    };
    ElementTextHelper.prototype.getDayTextTemplate = function () {
        return this.getDayTotalTextCore(this.getLongestAbbrDayName(), "00", this.getLongestAbbrMonthName(), "");
    };
    ElementTextHelper.prototype.getWeekTextTemplate = function () {
        var dayTextTemplate = this.getDayTextTemplate();
        return this.getWeeksScaleItemTextCore(dayTextTemplate, dayTextTemplate);
    };
    ElementTextHelper.prototype.getHoursScaleItemTextCore = function (hourDisplayText, amPmText) {
        return hourDisplayText + ":00" + (this.hasAmPm() ? " " + amPmText : "");
    };
    ElementTextHelper.prototype.getDayTotalTextCore = function (dayName, dayValueString, monthName, yearValueString) {
        var result = dayName.length > 0 ? dayName + ", " : "";
        result += dayValueString + " " + monthName;
        result += yearValueString.length > 0 ? " " + yearValueString : "";
        return result;
    };
    ElementTextHelper.prototype.getWeeksScaleItemTextCore = function (firstDayOfWeekString, lastDayOfWeekString) {
        return firstDayOfWeekString + " - " + lastDayOfWeekString;
    };
    ElementTextHelper.prototype.getMonthsScaleItemTextCore = function (monthName, yearValueString) {
        var result = monthName;
        if (yearValueString.length > 0)
            result += " " + yearValueString;
        return result;
    };
    ElementTextHelper.prototype.getLongestAbbrMonthName = function () {
        if (this.longestAbbrMonthName == null)
            this.longestAbbrMonthName = this.getLongestText(this.getAbbrMonthNames());
        return this.longestAbbrMonthName;
    };
    ElementTextHelper.prototype.getLongestMonthName = function () {
        if (this.longestMonthName == null)
            this.longestMonthName = this.getLongestText(this.getMonthNames());
        return this.longestMonthName;
    };
    ElementTextHelper.prototype.getLongestAbbrDayName = function () {
        if (this.longestAbbrDayName == null)
            this.longestAbbrDayName = this.getLongestText(this.getAbbrDayNames());
        return this.longestAbbrDayName;
    };
    ElementTextHelper.prototype.getLongestText = function (texts) {
        var _this = this;
        var result = "";
        var longestTextWidth = 0;
        texts.forEach(function (text) {
            var textWidth = _this.getTextWidth(text);
            if (textWidth > longestTextWidth) {
                longestTextWidth = textWidth;
                result = text;
            }
        });
        return result;
    };
    ElementTextHelper.prototype.getTextWidth = function (text) {
        return Math.round(this.textMeasureContext.measureText(text).width);
    };
    ElementTextHelper.prototype.getAmText = function () {
        return this.cultureInfo.amText;
    };
    ElementTextHelper.prototype.getPmText = function () {
        return this.cultureInfo.pmText;
    };
    ElementTextHelper.prototype.getQuarterNames = function () {
        return this.cultureInfo.quarterNames;
    };
    ElementTextHelper.prototype.getMonthNames = function () {
        return this.cultureInfo.monthNames;
    };
    ElementTextHelper.prototype.getDayNames = function () {
        return this.cultureInfo.dayNames;
    };
    ElementTextHelper.prototype.getAbbrMonthNames = function () {
        return this.cultureInfo.abbrMonthNames;
    };
    ElementTextHelper.prototype.getAbbrDayNames = function () {
        return this.cultureInfo.abbrDayNames;
    };
    return ElementTextHelper;
}());
exports.ElementTextHelper = ElementTextHelper;
var ElementTextHelperCultureInfo = (function () {
    function ElementTextHelperCultureInfo() {
    }
    return ElementTextHelperCultureInfo;
}());
exports.ElementTextHelperCultureInfo = ElementTextHelperCultureInfo;
function createViewTypeToScaleMap() {
    var result = {};
    result[Enums_1.ViewType.TenMinutes] = Enums_1.ViewType.Hours;
    result[Enums_1.ViewType.Hours] = Enums_1.ViewType.Days;
    result[Enums_1.ViewType.SixHours] = Enums_1.ViewType.Days;
    result[Enums_1.ViewType.Days] = Enums_1.ViewType.Weeks;
    result[Enums_1.ViewType.Weeks] = Enums_1.ViewType.Months;
    result[Enums_1.ViewType.Months] = Enums_1.ViewType.Years;
    result[Enums_1.ViewType.Quarter] = Enums_1.ViewType.Years;
    result[Enums_1.ViewType.Years] = Enums_1.ViewType.FiveYears;
    return result;
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHandlerStateBase = void 0;
var tslib_1 = __webpack_require__(0);
var HandlerStateBase_1 = __webpack_require__(22);
var MouseHandlerStateBase = (function (_super) {
    tslib_1.__extends(MouseHandlerStateBase, _super);
    function MouseHandlerStateBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerStateBase.prototype.onMouseDoubleClick = function (_evt) { };
    MouseHandlerStateBase.prototype.onMouseDown = function (_evt) { };
    MouseHandlerStateBase.prototype.onMouseUp = function (_evt) { };
    MouseHandlerStateBase.prototype.onMouseMove = function (_evt) { };
    MouseHandlerStateBase.prototype.onMouseWheel = function (_evt) { };
    return MouseHandlerStateBase;
}(HandlerStateBase_1.HandlerStateBase));
exports.MouseHandlerStateBase = MouseHandlerStateBase;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHandlerDragBaseState = void 0;
var tslib_1 = __webpack_require__(0);
var point_1 = __webpack_require__(3);
var evt_1 = __webpack_require__(6);
var MouseHandlerStateBase_1 = __webpack_require__(34);
var MouseHandlerDragBaseState = (function (_super) {
    tslib_1.__extends(MouseHandlerDragBaseState, _super);
    function MouseHandlerDragBaseState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerDragBaseState.prototype.onMouseDown = function (evt) {
        this.currentPosition = new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt));
        if (this.handler.control.taskEditController.dependencyId != null)
            this.handler.control.selectDependency(null);
    };
    MouseHandlerDragBaseState.prototype.onMouseUp = function (evt) {
        this.onMouseUpInternal(evt);
        this.handler.switchToDefaultState();
    };
    MouseHandlerDragBaseState.prototype.onMouseMove = function (evt) {
        evt.preventDefault();
        var position = new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt));
        this.onMouseMoveInternal(position);
        this.currentPosition = position;
    };
    MouseHandlerDragBaseState.prototype.onMouseUpInternal = function (_evt) { };
    MouseHandlerDragBaseState.prototype.onMouseMoveInternal = function (_position) { };
    return MouseHandlerDragBaseState;
}(MouseHandlerStateBase_1.MouseHandlerStateBase));
exports.MouseHandlerDragBaseState = MouseHandlerDragBaseState;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchHandlerDragBaseState = void 0;
var tslib_1 = __webpack_require__(0);
var TouchHandlerStateBase_1 = __webpack_require__(57);
var point_1 = __webpack_require__(3);
var touch_1 = __webpack_require__(18);
var TouchHandlerDragBaseState = (function (_super) {
    tslib_1.__extends(TouchHandlerDragBaseState, _super);
    function TouchHandlerDragBaseState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerDragBaseState.prototype.onTouchStart = function (evt) {
        this.currentPosition = new point_1.Point(touch_1.TouchUtils.getEventX(evt), touch_1.TouchUtils.getEventY(evt));
        if (this.handler.control.taskEditController.dependencyId != null)
            this.handler.control.selectDependency(null);
    };
    TouchHandlerDragBaseState.prototype.onTouchEnd = function (evt) {
        this.onTouchEndInternal(evt);
        this.handler.switchToDefaultState();
    };
    TouchHandlerDragBaseState.prototype.onTouchMove = function (evt) {
        evt.preventDefault();
        var position = new point_1.Point(touch_1.TouchUtils.getEventX(evt), touch_1.TouchUtils.getEventY(evt));
        this.onTouchMoveInternal(position);
        this.currentPosition = position;
    };
    TouchHandlerDragBaseState.prototype.onTouchEndInternal = function (_evt) { };
    TouchHandlerDragBaseState.prototype.onTouchMoveInternal = function (_position) { };
    return TouchHandlerDragBaseState;
}(TouchHandlerStateBase_1.TouchHandlerStateBase));
exports.TouchHandlerDragBaseState = TouchHandlerDragBaseState;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceUnassigningArguments = exports.ResourceAssigningArguments = void 0;
var tslib_1 = __webpack_require__(0);
var BaseArguments_1 = __webpack_require__(23);
var ResourceAssigningArguments = (function (_super) {
    tslib_1.__extends(ResourceAssigningArguments, _super);
    function ResourceAssigningArguments(resourceId, taskId) {
        var _this = _super.call(this, null) || this;
        _this.values = {
            resourceId: resourceId,
            taskId: taskId
        };
        return _this;
    }
    Object.defineProperty(ResourceAssigningArguments.prototype, "resourceId", {
        get: function () { return this.values.resourceId; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResourceAssigningArguments.prototype, "taskId", {
        get: function () { return this.values.taskId; },
        enumerable: false,
        configurable: true
    });
    return ResourceAssigningArguments;
}(BaseArguments_1.BaseArguments));
exports.ResourceAssigningArguments = ResourceAssigningArguments;
var ResourceUnassigningArguments = (function (_super) {
    tslib_1.__extends(ResourceUnassigningArguments, _super);
    function ResourceUnassigningArguments(assignment) {
        var _this = _super.call(this, assignment.internalId) || this;
        _this.values = assignment;
        return _this;
    }
    return ResourceUnassigningArguments;
}(BaseArguments_1.BaseArguments));
exports.ResourceUnassigningArguments = ResourceUnassigningArguments;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfTaskInfo = void 0;
var point_1 = __webpack_require__(3);
var Color_1 = __webpack_require__(16);
var StyleDef_1 = __webpack_require__(19);
var PdfTaskInfo = (function () {
    function PdfTaskInfo() {
    }
    Object.defineProperty(PdfTaskInfo.prototype, "left", {
        get: function () {
            var _a;
            return ((_a = this.sidePoints) === null || _a === void 0 ? void 0 : _a.length) > 3 ? this.sidePoints[0].x : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfTaskInfo.prototype, "top", {
        get: function () {
            var _a;
            return ((_a = this.sidePoints) === null || _a === void 0 ? void 0 : _a.length) > 3 ? this.sidePoints[1].y : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfTaskInfo.prototype, "right", {
        get: function () {
            var _a;
            return ((_a = this.sidePoints) === null || _a === void 0 ? void 0 : _a.length) > 3 ? this.sidePoints[2].x : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfTaskInfo.prototype, "bottom", {
        get: function () {
            var _a;
            return ((_a = this.sidePoints) === null || _a === void 0 ? void 0 : _a.length) > 3 ? this.sidePoints[3].y : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfTaskInfo.prototype, "width", {
        get: function () { return this.right - this.left; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfTaskInfo.prototype, "height", {
        get: function () {
            var height = this.bottom - this.top;
            if (this.isParent)
                height -= PdfTaskInfo.defaultParentHeightCorrection;
            return height;
        },
        enumerable: false,
        configurable: true
    });
    PdfTaskInfo.prototype.assign = function (source) {
        var _a, _b, _c;
        this.isMilestone = source.isMilestone;
        this._copyPoints(source.sidePoints);
        this.progressWidth = source.progressWidth;
        this.isSmallTask = source.isSmallTask;
        this.text = source.text;
        this.textPosition = source.textPosition;
        (_a = this.progressColor) !== null && _a !== void 0 ? _a : (this.progressColor = new Color_1.Color());
        this.progressColor.assign(source.progressColor);
        (_b = this.taskColor) !== null && _b !== void 0 ? _b : (this.taskColor = new Color_1.Color());
        this.taskColor.assign(source.taskColor);
        (_c = this.textStyle) !== null && _c !== void 0 ? _c : (this.textStyle = new StyleDef_1.StyleDef());
        this.textStyle.assign(source.textStyle);
        this.isParent = source.isParent;
    };
    PdfTaskInfo.prototype._copyPoints = function (source) {
        var _this = this;
        this.sidePoints = new Array();
        source === null || source === void 0 ? void 0 : source.forEach(function (p) { return _this.sidePoints.push(new point_1.Point(p.x, p.y)); });
    };
    PdfTaskInfo.defaultParentHeightCorrection = 4;
    return PdfTaskInfo;
}());
exports.PdfTaskInfo = PdfTaskInfo;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PredefinedStyles = void 0;
var PredefinedStyles = (function () {
    function PredefinedStyles() {
    }
    PredefinedStyles.getPredefinedStringOrUndefined = function (value, predefined) {
        var valueToCheck = value && predefined && value.toLowerCase() || undefined;
        return valueToCheck && (predefined.filter(function (f) { return f.toLowerCase() === valueToCheck; })[0] || predefined.filter(function (f) { return valueToCheck.indexOf(f.toLowerCase()) > -1; })[0]);
    };
    PredefinedStyles.fontFamilies = ["helvetica", "times", "courier"];
    PredefinedStyles.fontStyles = ["normal", "bold", "italic", "bolditalic"];
    PredefinedStyles.headerFooterVisibility = ["everyPage", "firstPage", "never"];
    PredefinedStyles.horizontalAlign = ["left", "center", "right"];
    PredefinedStyles.overflow = ["linebreak", "ellipsize", "visible", "hidden"];
    PredefinedStyles.pageBreak = ["auto", "avoid", "always"];
    PredefinedStyles.rowPageBreak = ["auto", "avoid"];
    PredefinedStyles.verticalAlign = ["top", "middle", "bottom"];
    PredefinedStyles.width = ["auto", "wrap"];
    return PredefinedStyles;
}());
exports.PredefinedStyles = PredefinedStyles;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GanttPdfExportProps = exports.PdfDataRange = exports.DataExportMode = exports.ExportMode = void 0;
var size_1 = __webpack_require__(9);
var common_1 = __webpack_require__(1);
var Margin_1 = __webpack_require__(29);
var ExportMode;
(function (ExportMode) {
    ExportMode[ExportMode["all"] = 0] = "all";
    ExportMode[ExportMode["treeList"] = 1] = "treeList";
    ExportMode[ExportMode["chart"] = 2] = "chart";
})(ExportMode = exports.ExportMode || (exports.ExportMode = {}));
var DataExportMode;
(function (DataExportMode) {
    DataExportMode[DataExportMode["all"] = 0] = "all";
    DataExportMode[DataExportMode["visible"] = 1] = "visible";
})(DataExportMode = exports.DataExportMode || (exports.DataExportMode = {}));
var PdfDataRange = (function () {
    function PdfDataRange(start, endDate, startIndex, endIndex) {
        var source = !start || start instanceof Date ? { startDate: start, endDate: endDate, startIndex: startIndex, endIndex: endIndex } : start;
        if (source)
            this.assign(source);
    }
    PdfDataRange.prototype.assign = function (source) {
        if (common_1.isDefined(source.startDate))
            this.startDate = source.startDate instanceof Date ? source.startDate : new Date(source.startDate);
        if (common_1.isDefined(source.endDate))
            this.endDate = source.endDate instanceof Date ? source.endDate : new Date(source.endDate);
        if (common_1.isDefined(source.startIndex))
            this.startIndex = parseInt(source.startIndex);
        if (common_1.isDefined(source.endIndex))
            this.endIndex = parseInt(source.endIndex);
    };
    return PdfDataRange;
}());
exports.PdfDataRange = PdfDataRange;
var GanttPdfExportProps = (function () {
    function GanttPdfExportProps(props) {
        this.landscape = false;
        this.margins = null;
        this.exportMode = ExportMode.all;
        this.exportDataMode = DataExportMode.visible;
        if (props)
            this.assign(props);
    }
    GanttPdfExportProps.prototype.assign = function (source) {
        if (!source)
            return;
        this.pdfDoc = source.pdfDoc;
        this.docCreateMethod = source.docCreateMethod;
        if (common_1.isDefined(source.fileName))
            this.fileName = source.fileName;
        this.landscape = !!source.landscape;
        if (common_1.isDefined(source.margins))
            this.margins = new Margin_1.Margin(source.margins);
        if (common_1.isDefined(source.format)) {
            var formatSrc = source.format;
            if (typeof formatSrc === "string")
                this.format = formatSrc;
            else {
                var width = parseInt(formatSrc.width);
                var height = parseInt(formatSrc.height);
                this.pageSize = new size_1.Size(width, height);
            }
        }
        if (common_1.isDefined(source.exportMode))
            this.exportMode = this.getEnumValue(ExportMode, source.exportMode);
        if (common_1.isDefined(source.dateRange)) {
            var rangeSrc = source.dateRange;
            var isEnum = typeof rangeSrc === "number" || typeof rangeSrc === "string";
            if (isEnum)
                this.exportDataMode = this.getEnumValue(DataExportMode, rangeSrc);
            else
                this.dateRange = new PdfDataRange(rangeSrc);
        }
    };
    GanttPdfExportProps.prototype.getEnumValue = function (type, value) {
        if (!common_1.isDefined(type[value]))
            return null;
        var num = parseInt(value);
        if (!isNaN(num))
            return num;
        return type[value];
    };
    return GanttPdfExportProps;
}());
exports.GanttPdfExportProps = GanttPdfExportProps;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CellDef = void 0;
var common_1 = __webpack_require__(1);
var StyleDef_1 = __webpack_require__(19);
var CellDef = (function () {
    function CellDef(content, colSpan, styles) {
        this.content = "";
        if (typeof content === "string") {
            this.content = content;
            this.colSpan = colSpan;
            if (styles)
                this.appendStyles(styles);
        }
        else if (content)
            this.assign(content);
    }
    Object.defineProperty(CellDef.prototype, "styles", {
        get: function () {
            if (!this._styles)
                this._styles = new StyleDef_1.StyleDef();
            return this._styles;
        },
        enumerable: false,
        configurable: true
    });
    CellDef.prototype.assign = function (source) {
        if (common_1.isDefined(source["content"]))
            this.content = source["content"];
        if (common_1.isDefined(source["colSpan"]))
            this.colSpan = source["colSpan"];
        if (source["styles"])
            this.appendStyles(source["styles"]);
    };
    CellDef.prototype.appendStyles = function (source) {
        if (source)
            this.styles.assign(source);
    };
    CellDef.prototype.hasValue = function () { return true; };
    CellDef.prototype.getValue = function () {
        var result = {};
        result["content"] = this.content;
        if (this.colSpan > 1)
            result["colSpan"] = this.colSpan;
        if (this._styles)
            result["styles"] = this._styles.getValue();
        return result;
    };
    return CellDef;
}());
exports.CellDef = CellDef;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
var tslib_1 = __webpack_require__(0);
var common_1 = __webpack_require__(1);
var DataObject_1 = __webpack_require__(12);
var Resource = (function (_super) {
    tslib_1.__extends(Resource, _super);
    function Resource() {
        var _this = _super.call(this) || this;
        _this.text = "";
        _this.color = "";
        return _this;
    }
    Resource.prototype.assignFromObject = function (sourceObj) {
        if (common_1.isDefined(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.text = sourceObj.text;
            if (common_1.isDefined(sourceObj.color))
                this.color = sourceObj.color;
        }
    };
    return Resource;
}(DataObject_1.DataObject));
exports.Resource = Resource;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = __webpack_require__(72);
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.round = function (value, digits) {
        if (digits === void 0) { digits = 0; }
        var factor = MathUtils.powFactor[digits];
        return Math.round(value * factor) / factor;
    };
    MathUtils.numberCloseTo = function (num, to, accuracy) {
        if (accuracy === void 0) { accuracy = 0.00001; }
        return Math.abs(num - to) < accuracy;
    };
    MathUtils.restrictValue = function (val, minVal, maxVal) {
        if (maxVal < minVal)
            maxVal = minVal;
        if (val > maxVal)
            return maxVal;
        else if (val < minVal)
            return minVal;
        return val;
    };
    MathUtils.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    MathUtils.generateGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    MathUtils.powFactor = list_1.ListUtils.initByCallback(20, function (ind) { return Math.pow(10, ind); });
    MathUtils.somePrimes = [1009, 1013,
        1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069,
        1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151,
        1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223,
        1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291,
        1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373,
        1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451,
        1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511,
        1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583,
        1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657,
        1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733,
        1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811,
        1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889,
        1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987,
        1993, 1997, 1999, 2003];
    return MathUtils;
}());
exports.MathUtils = MathUtils;


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
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
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
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

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
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
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceAssignment = void 0;
var tslib_1 = __webpack_require__(0);
var DataObject_1 = __webpack_require__(12);
var common_1 = __webpack_require__(1);
var ResourceAssignment = (function (_super) {
    tslib_1.__extends(ResourceAssignment, _super);
    function ResourceAssignment() {
        var _this = _super.call(this) || this;
        _this.taskId = "";
        _this.resourceId = "";
        return _this;
    }
    ResourceAssignment.prototype.assignFromObject = function (sourceObj) {
        if (common_1.isDefined(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.taskId = String(sourceObj.taskId);
            this.resourceId = String(sourceObj.resourceId);
        }
    };
    return ResourceAssignment;
}(DataObject_1.DataObject));
exports.ResourceAssignment = ResourceAssignment;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
var Time = (function () {
    function Time(h, min, sec, msec) {
        if (h === void 0) { h = 0; }
        if (min === void 0) { min = 0; }
        if (sec === void 0) { sec = 0; }
        if (msec === void 0) { msec = 0; }
        this._hour = 0;
        this._min = 0;
        this._sec = 0;
        this._msec = 0;
        this._fullmsec = 0;
        this.hour = h;
        this.min = min;
        this.sec = sec;
        this.msec = msec;
    }
    Object.defineProperty(Time.prototype, "hour", {
        get: function () { return this._hour; },
        set: function (h) {
            if (h >= 0 && h < 24) {
                this._hour = h;
                this.updateFullMilleconds();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time.prototype, "min", {
        get: function () { return this._min; },
        set: function (m) {
            if (m >= 0 && m < 60) {
                this._min = m;
                this.updateFullMilleconds();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time.prototype, "sec", {
        get: function () { return this._sec; },
        set: function (s) {
            if (s >= 0 && s < 60) {
                this._sec = s;
                this.updateFullMilleconds();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Time.prototype, "msec", {
        get: function () { return this._msec; },
        set: function (ms) {
            if (ms >= 0 && ms < 1000) {
                this._msec = ms;
                this.updateFullMilleconds();
            }
        },
        enumerable: false,
        configurable: true
    });
    Time.prototype.updateFullMilleconds = function () {
        var minutes = this._hour * 60 + this._min;
        var sec = minutes * 60 + this._sec;
        this._fullmsec = sec * 1000 + this._msec;
    };
    Time.prototype.getTimeInMilleconds = function () {
        return this._fullmsec;
    };
    return Time;
}());
exports.Time = Time;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeRange = void 0;
var DateTimeUtils_1 = __webpack_require__(4);
var TimeRange = (function () {
    function TimeRange(start, end) {
        var diff = DateTimeUtils_1.DateTimeUtils.caclTimeDifference(start, end);
        if (diff >= 0) {
            this._start = start;
            this._end = end;
        }
        else {
            this._start = end;
            this._end = start;
        }
    }
    Object.defineProperty(TimeRange.prototype, "start", {
        get: function () { return this._start; },
        set: function (time) {
            if (time && DateTimeUtils_1.DateTimeUtils.caclTimeDifference(time, this._end) >= 0)
                this._start = time;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TimeRange.prototype, "end", {
        get: function () { return this._end; },
        set: function (time) {
            if (time && DateTimeUtils_1.DateTimeUtils.caclTimeDifference(this._start, time) >= 0)
                this._end = time;
        },
        enumerable: false,
        configurable: true
    });
    TimeRange.prototype.isTimeInRange = function (time) {
        return DateTimeUtils_1.DateTimeUtils.caclTimeDifference(this._start, time) >= 0 && DateTimeUtils_1.DateTimeUtils.caclTimeDifference(time, this._end) >= 0;
    };
    TimeRange.prototype.hasIntersect = function (range) {
        return this.isTimeInRange(range.start) || this.isTimeInRange(range.end) || range.isTimeInRange(this.start) || range.isTimeInRange(this.end);
    };
    TimeRange.prototype.concatWith = function (range) {
        if (!this.hasIntersect(range))
            return false;
        this.start = DateTimeUtils_1.DateTimeUtils.getMinTime(this.start, range.start);
        this.end = DateTimeUtils_1.DateTimeUtils.getMaxTime(this.end, range.end);
        return true;
    };
    return TimeRange;
}());
exports.TimeRange = TimeRange;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfWeekMonthlyOccurrence = void 0;
var DayOfWeekMonthlyOccurrence;
(function (DayOfWeekMonthlyOccurrence) {
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["First"] = 0] = "First";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Second"] = 1] = "Second";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Third"] = 2] = "Third";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Forth"] = 3] = "Forth";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Last"] = 4] = "Last";
})(DayOfWeekMonthlyOccurrence = exports.DayOfWeekMonthlyOccurrence || (exports.DayOfWeekMonthlyOccurrence = {}));


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrenceFactory = void 0;
var common_1 = __webpack_require__(1);
var Daily_1 = __webpack_require__(50);
var Weekly_1 = __webpack_require__(86);
var Monthly_1 = __webpack_require__(87);
var Yearly_1 = __webpack_require__(89);
var RecurrenceFactory = (function () {
    function RecurrenceFactory() {
    }
    RecurrenceFactory.createRecurrenceByType = function (type) {
        if (!type)
            return null;
        var correctedType = type.toLowerCase();
        switch (correctedType) {
            case "daily":
                return new Daily_1.Daily();
            case "weekly":
                return new Weekly_1.Weekly();
            case "monthly":
                return new Monthly_1.Monthly();
            case "yearly":
                return new Yearly_1.Yearly();
        }
        return null;
    };
    RecurrenceFactory.createRecurrenceFromObject = function (sourceObj) {
        if (!sourceObj)
            return null;
        var recurrence = this.createRecurrenceByType(sourceObj.type);
        if (recurrence)
            recurrence.assignFromObject(sourceObj);
        return recurrence;
    };
    RecurrenceFactory.getEnumValue = function (type, value) {
        if (!common_1.isDefined(type[value]))
            return null;
        var num = parseInt(value);
        if (!isNaN(num))
            return num;
        return type[value];
    };
    return RecurrenceFactory;
}());
exports.RecurrenceFactory = RecurrenceFactory;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Daily = void 0;
var tslib_1 = __webpack_require__(0);
var RecurrenceBase_1 = __webpack_require__(20);
var DateTimeUtils_1 = __webpack_require__(4);
var Daily = (function (_super) {
    tslib_1.__extends(Daily, _super);
    function Daily() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Daily.prototype.checkDate = function (date) { return true; };
    Daily.prototype.checkInterval = function (date) {
        return DateTimeUtils_1.DateTimeUtils.getDaysBetween(this.start, date) % this.interval == 0;
    };
    Daily.prototype.calculatePointByInterval = function (date) {
        var daysToAdd = this.interval;
        if (!this.isRecurrencePoint(date))
            daysToAdd -= DateTimeUtils_1.DateTimeUtils.getDaysBetween(this.start, date) % this.interval;
        return DateTimeUtils_1.DateTimeUtils.addDays(date, daysToAdd);
    };
    Daily.prototype.calculateNearestPoint = function (date) {
        return DateTimeUtils_1.DateTimeUtils.addDays(date, 1);
    };
    return Daily;
}(RecurrenceBase_1.RecurrenceBase));
exports.Daily = Daily;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GridElementInfo = void 0;
var point_1 = __webpack_require__(3);
var size_1 = __webpack_require__(9);
var margins_1 = __webpack_require__(91);
var GridElementInfo = (function () {
    function GridElementInfo(className, position, size) {
        this.id = GridElementInfo.id++;
        this.position = new point_1.Point(undefined, undefined);
        this.size = new size_1.Size(0, 0);
        this.margins = new margins_1.Margins(undefined, undefined, undefined, undefined);
        this.attr = {};
        this.style = {};
        if (className)
            this.className = className;
        if (position)
            this.setPosition(position);
        if (size)
            this.setSize(size);
    }
    GridElementInfo.prototype.setSize = function (size) {
        this.size.width = size.width;
        this.size.height = size.height;
    };
    GridElementInfo.prototype.setPosition = function (position) {
        this.position.x = position.x;
        this.position.y = position.y;
    };
    GridElementInfo.prototype.assignToElement = function (element) {
        this.assignPosition(element);
        this.assignSize(element);
        this.assignMargins(element);
        if (this.className)
            element.className = this.className;
    };
    GridElementInfo.prototype.assignPosition = function (element) {
        if (this.position.x != null)
            element.style.left = this.position.x + "px";
        if (this.position.y != null)
            element.style.top = this.position.y + "px";
    };
    GridElementInfo.prototype.assignSize = function (element) {
        if (this.size.width)
            element.style.width = this.size.width + "px";
        if (this.size.height)
            element.style.height = this.size.height + "px";
    };
    GridElementInfo.prototype.assignMargins = function (element) {
        if (this.margins.left)
            element.style.marginLeft = this.margins.left + "px";
        if (this.margins.top)
            element.style.marginTop = this.margins.top + "px";
        if (this.margins.right)
            element.style.marginRight = this.margins.right + "px";
        if (this.margins.bottom)
            element.style.marginBottom = this.margins.bottom + "px";
    };
    GridElementInfo.prototype.setAttribute = function (name, value) {
        this.attr[name] = value;
    };
    GridElementInfo.id = 0;
    return GridElementInfo;
}());
exports.GridElementInfo = GridElementInfo;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationSettings = exports.StripLine = exports.StripLineSettings = exports.EditingSettings = exports.Settings = void 0;
var Enums_1 = __webpack_require__(11);
var common_1 = __webpack_require__(1);
var Settings = (function () {
    function Settings() {
        this.viewType = undefined;
        this.taskTitlePosition = Enums_1.TaskTitlePosition.Inside;
        this.showResources = true;
        this.areHorizontalBordersEnabled = true;
        this.areVerticalBordersEnabled = true;
        this.areAlternateRowsEnabled = true;
        this.allowSelectTask = true;
        this.firstDayOfWeek = 0;
        this.editing = new EditingSettings();
        this.validation = new ValidationSettings();
        this.stripLines = new StripLineSettings();
    }
    Settings.parse = function (settings) {
        var result = new Settings();
        if (settings) {
            if (common_1.isDefined(settings.viewType))
                result.viewType = settings.viewType;
            if (common_1.isDefined(settings.taskTitlePosition))
                result.taskTitlePosition = settings.taskTitlePosition;
            if (common_1.isDefined(settings.showResources))
                result.showResources = settings.showResources;
            if (common_1.isDefined(settings.areHorizontalBordersEnabled))
                result.areHorizontalBordersEnabled = settings.areHorizontalBordersEnabled;
            if (common_1.isDefined(settings.areVerticalBordersEnabled))
                result.areHorizontalBordersEnabled = settings.areHorizontalBordersEnabled;
            if (common_1.isDefined(settings.areAlternateRowsEnabled))
                result.areAlternateRowsEnabled = settings.areAlternateRowsEnabled;
            if (common_1.isDefined(settings.allowSelectTask))
                result.allowSelectTask = settings.allowSelectTask;
            if (common_1.isDefined(settings.firstDayOfWeek))
                result.firstDayOfWeek = settings.firstDayOfWeek;
            if (common_1.isDefined(settings.editing))
                result.editing = EditingSettings.parse(settings.editing);
            if (common_1.isDefined(settings.validation))
                result.validation = ValidationSettings.parse(settings.validation);
            if (common_1.isDefined(settings.stripLines))
                result.stripLines = StripLineSettings.parse(settings.stripLines);
            if (common_1.isDefined(settings.taskTooltipContentTemplate))
                result.taskTooltipContentTemplate = settings.taskTooltipContentTemplate;
            if (common_1.isDefined(settings.taskProgressTooltipContentTemplate))
                result.taskProgressTooltipContentTemplate = settings.taskProgressTooltipContentTemplate;
            if (common_1.isDefined(settings.taskTimeTooltipContentTemplate))
                result.taskTimeTooltipContentTemplate = settings.taskTimeTooltipContentTemplate;
            if (common_1.isDefined(settings.taskContentTemplate))
                result.taskContentTemplate = settings.taskContentTemplate;
        }
        return result;
    };
    Settings.prototype.equal = function (settings) {
        var result = true;
        result = result && this.viewType === settings.viewType;
        result = result && this.taskTitlePosition === settings.taskTitlePosition;
        result = result && this.showResources === settings.showResources;
        result = result && this.areHorizontalBordersEnabled === settings.areHorizontalBordersEnabled;
        result = result && this.areAlternateRowsEnabled === settings.areAlternateRowsEnabled;
        result = result && this.allowSelectTask === settings.allowSelectTask;
        result = result && this.editing.equal(settings.editing);
        result = result && this.validation.equal(settings.validation);
        result = result && this.stripLines.equal(settings.stripLines);
        return result;
    };
    return Settings;
}());
exports.Settings = Settings;
var EditingSettings = (function () {
    function EditingSettings() {
        this.enabled = false;
        this.allowDependencyDelete = true;
        this.allowDependencyInsert = true;
        this.allowTaskDelete = true;
        this.allowTaskInsert = true;
        this.allowTaskUpdate = true;
        this.allowResourceDelete = true;
        this.allowResourceInsert = true;
        this.allowResourceUpdate = true;
        this.allowTaskResourceUpdate = true;
    }
    EditingSettings.parse = function (settings) {
        var result = new EditingSettings();
        if (settings) {
            if (common_1.isDefined(settings.enabled))
                result.enabled = settings.enabled;
            if (common_1.isDefined(settings.allowDependencyDelete))
                result.allowDependencyDelete = settings.allowDependencyDelete;
            if (common_1.isDefined(settings.allowDependencyInsert))
                result.allowDependencyInsert = settings.allowDependencyInsert;
            if (common_1.isDefined(settings.allowTaskDelete))
                result.allowTaskDelete = settings.allowTaskDelete;
            if (common_1.isDefined(settings.allowTaskInsert))
                result.allowTaskInsert = settings.allowTaskInsert;
            if (common_1.isDefined(settings.allowTaskUpdate))
                result.allowTaskUpdate = settings.allowTaskUpdate;
            if (common_1.isDefined(settings.allowResourceDelete))
                result.allowResourceDelete = settings.allowResourceDelete;
            if (common_1.isDefined(settings.allowResourceInsert))
                result.allowResourceInsert = settings.allowResourceInsert;
            if (common_1.isDefined(settings.allowResourceUpdate))
                result.allowResourceUpdate = settings.allowResourceUpdate;
            if (common_1.isDefined(settings.allowTaskResourceUpdate))
                result.allowTaskResourceUpdate = settings.allowTaskResourceUpdate;
        }
        return result;
    };
    EditingSettings.prototype.equal = function (settings) {
        var result = true;
        result = result && this.enabled === settings.enabled;
        result = result && this.allowDependencyDelete === settings.allowDependencyDelete;
        result = result && this.allowDependencyInsert === settings.allowDependencyInsert;
        result = result && this.allowTaskDelete === settings.allowTaskDelete;
        result = result && this.allowTaskInsert === settings.allowTaskInsert;
        result = result && this.allowTaskUpdate === settings.allowTaskUpdate;
        result = result && this.allowResourceDelete === settings.allowResourceDelete;
        result = result && this.allowResourceInsert === settings.allowResourceInsert;
        result = result && this.allowResourceUpdate === settings.allowResourceUpdate;
        result = result && this.allowTaskResourceUpdate === settings.allowTaskResourceUpdate;
        return result;
    };
    return EditingSettings;
}());
exports.EditingSettings = EditingSettings;
var StripLineSettings = (function () {
    function StripLineSettings() {
        this.showCurrentTime = false;
        this.currentTimeUpdateInterval = 60000;
        this.stripLines = [];
    }
    StripLineSettings.parse = function (settings) {
        var result = new StripLineSettings();
        if (settings) {
            if (common_1.isDefined(settings.showCurrentTime))
                result.showCurrentTime = settings.showCurrentTime;
            if (common_1.isDefined(settings.currentTimeUpdateInterval))
                result.currentTimeUpdateInterval = settings.currentTimeUpdateInterval;
            if (common_1.isDefined(settings.currentTimeTitle))
                result.currentTimeTitle = settings.currentTimeTitle;
            if (common_1.isDefined(settings.currentTimeCssClass))
                result.currentTimeCssClass = settings.currentTimeCssClass;
            if (common_1.isDefined(settings.stripLines))
                for (var i = 0; i < settings.stripLines.length; i++)
                    result.stripLines.push(StripLine.parse(settings.stripLines[i]));
        }
        return result;
    };
    StripLineSettings.prototype.equal = function (settings) {
        var result = true;
        result = result && this.showCurrentTime == settings.showCurrentTime;
        result = result && this.currentTimeUpdateInterval == settings.currentTimeUpdateInterval;
        result = result && this.currentTimeTitle == settings.currentTimeTitle;
        result = result && this.currentTimeCssClass == settings.currentTimeCssClass;
        result = result && this.stripLines.length === settings.stripLines.length;
        if (result)
            for (var i = 0; i < settings.stripLines.length; i++)
                result = result && this.stripLines[i].equal(settings.stripLines[i]);
        return result;
    };
    return StripLineSettings;
}());
exports.StripLineSettings = StripLineSettings;
var StripLine = (function () {
    function StripLine(start, end, title, cssClass, isCurrent) {
        this.isCurrent = false;
        this.start = start;
        this.end = end;
        this.title = title;
        this.cssClass = cssClass;
        this.isCurrent = isCurrent;
    }
    StripLine.parse = function (settings) {
        var result = new StripLine();
        if (settings) {
            if (common_1.isDefined(settings.start))
                result.start = settings.start;
            if (common_1.isDefined(settings.end))
                result.end = settings.end;
            if (common_1.isDefined(settings.title))
                result.title = settings.title;
            if (common_1.isDefined(settings.cssClass))
                result.cssClass = settings.cssClass;
        }
        return result;
    };
    StripLine.prototype.clone = function () {
        return new StripLine(this.start, this.end, this.title, this.cssClass, this.isCurrent);
    };
    StripLine.prototype.equal = function (stripLine) {
        var result = true;
        result = result && this.start == stripLine.start;
        result = result && this.end == stripLine.end;
        result = result && this.title == stripLine.title;
        result = result && this.cssClass == stripLine.cssClass;
        return result;
    };
    return StripLine;
}());
exports.StripLine = StripLine;
var ValidationSettings = (function () {
    function ValidationSettings() {
        this.validateDependencies = false;
        this.autoUpdateParentTasks = false;
    }
    ValidationSettings.parse = function (settings) {
        var result = new ValidationSettings();
        if (settings) {
            if (common_1.isDefined(settings.validateDependencies))
                result.validateDependencies = settings.validateDependencies;
            if (common_1.isDefined(settings.autoUpdateParentTasks))
                result.autoUpdateParentTasks = settings.autoUpdateParentTasks;
        }
        return result;
    };
    ValidationSettings.prototype.equal = function (settings) {
        var result = true;
        result = result && this.validateDependencies == settings.validateDependencies;
        result = result && this.autoUpdateParentTasks == settings.autoUpdateParentTasks;
        return result;
    };
    return ValidationSettings;
}());
exports.ValidationSettings = ValidationSettings;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEditController = void 0;
var Enums_1 = __webpack_require__(11);
var DateRange_1 = __webpack_require__(10);
var dom_1 = __webpack_require__(2);
var browser_1 = __webpack_require__(5);
var TaskEditTooltip_1 = __webpack_require__(94);
var TaskEditController = (function () {
    function TaskEditController(gantt) {
        this.showInfoDelay = 1000;
        this.taskIndex = -1;
        this.successorIndex = -1;
        this.isEditingInProgress = false;
        this.disableTaskEditBox = false;
        this.gantt = gantt;
        this.createElements();
    }
    Object.defineProperty(TaskEditController.prototype, "taskId", {
        get: function () {
            return this.gantt.viewModel.items[this.taskIndex].task.internalId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "successorId", {
        get: function () {
            return this.gantt.viewModel.items[this.successorIndex].task.internalId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "task", {
        get: function () {
            return this.gantt.viewModel.items[this.taskIndex].task;
        },
        enumerable: false,
        configurable: true
    });
    TaskEditController.prototype.show = function (taskIndex, delay) {
        if (delay === void 0) { delay = 0; }
        if (this.isEditingInProgress || this.disableTaskEditBox)
            return;
        this.taskIndex = taskIndex;
        this.hide();
        this.changeWrapInfo();
        var viewItem = this.gantt.viewModel.items[taskIndex];
        this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
        this.displayDependency();
        if (this.task.isMilestone() && !viewItem.isCustom)
            this.baseElement.className = this.baseElement.className + " milestone";
        else {
            var isHideTaskEditBox = !this.gantt.settings.editing.enabled || !this.gantt.settings.editing.allowTaskUpdate;
            if (isHideTaskEditBox)
                this.baseElement.className = this.baseElement.className + " hide-updating";
            if (viewItem.isCustom) {
                this.baseElement.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_BOX_CUSTOM);
                delay = this.showInfoDelay;
            }
        }
        this.taskDateRange = new DateRange_1.DateRange(this.task.start, this.task.end);
        this.displayTaskEditBox(delay);
        this.displayProgressEdit(viewItem);
    };
    TaskEditController.prototype.displayProgressEdit = function (viewItem) {
        if (!viewItem.isCustom && this.canUpdateTask())
            this.progressEdit.style.left = ((this.task.progress / 100) * this.wrapInfo.size.width - (this.progressEdit.offsetWidth / 2)) + "px";
        else
            this.progressEdit.style.display = "none";
    };
    TaskEditController.prototype.displayDependency = function () {
        if (!this.gantt.settings.editing.enabled || !this.gantt.settings.editing.allowDependencyInsert)
            this.baseElement.className = this.baseElement.className + " hide-dependency";
    };
    TaskEditController.prototype.changeWrapInfo = function () {
        this.updateWrapInfo();
        this.wrapInfo.assignPosition(this.baseElement);
        this.wrapInfo.assignSize(this.baseElement);
    };
    TaskEditController.prototype.displayTaskEditBox = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        var showFunc = function () {
            _this.gantt.taskArea.appendChild(_this.baseElement);
        };
        if (delay)
            this.timerId = setTimeout(showFunc, delay);
        else
            showFunc();
    };
    TaskEditController.prototype.hide = function () {
        var parentNode = this.baseElement.parentNode;
        if (parentNode)
            parentNode.removeChild(this.baseElement);
        this.tooltip.hide();
        clearTimeout(this.timerId);
    };
    TaskEditController.prototype.cancel = function () {
        clearTimeout(this.timerId);
    };
    TaskEditController.prototype.showTaskInfo = function (posX, delay) {
        if (delay === void 0) { delay = 500; }
        if (this.timerId)
            delay = this.showInfoDelay;
        this.tooltip.showInfo(this.task, posX, delay, this.gantt.settings.taskTooltipContentTemplate);
    };
    TaskEditController.prototype.updateWrapInfo = function () {
        this.wrapInfo = this.getTaskWrapperElementInfo(this.taskIndex);
        this.wrapInfo.position.x--;
    };
    TaskEditController.prototype.showDependencySuccessor = function (taskIndex) {
        if (this.successorIndex !== taskIndex && this.taskIndex !== taskIndex) {
            this.successorIndex = taskIndex;
            var wrapInfo = this.getTaskWrapperElementInfo(taskIndex);
            wrapInfo.assignPosition(this.dependencySuccessorBaseElement);
            wrapInfo.assignSize(this.dependencySuccessorBaseElement);
            wrapInfo.assignSize(this.dependencySuccessorFrame);
            this.gantt.taskArea.appendChild(this.dependencySuccessorBaseElement);
        }
    };
    TaskEditController.prototype.hideDependencySuccessor = function () {
        var parentNode = this.dependencySuccessorBaseElement.parentNode;
        if (parentNode)
            parentNode.removeChild(this.dependencySuccessorBaseElement);
        this.successorIndex = -1;
    };
    TaskEditController.prototype.processProgress = function (position) {
        this.isEditingInProgress = true;
        var progressOffset = position.x - this.wrapInfo.position.x;
        var progress = 0;
        if (position.x > this.wrapInfo.position.x)
            if (position.x < this.wrapInfo.position.x + this.wrapInfo.size.width)
                progress = Math.round((progressOffset) / this.baseElement.clientWidth * 100);
            else
                progress = 100;
        this.progressEdit.style.left = ((progress / 100) *
            this.wrapInfo.size.width - (this.progressEdit.offsetWidth / 2)) + "px";
        this.tooltip.showProgress(progress, dom_1.DomUtils.getAbsolutePositionX(this.progressEdit) + this.progressEdit.offsetWidth / 2);
    };
    TaskEditController.prototype.confirmProgress = function () {
        this.isEditingInProgress = false;
        var progress = Math.round((this.progressEdit.offsetLeft + (this.progressEdit.offsetWidth / 2)) / this.wrapInfo.size.width * 100);
        this.gantt.commandManager.changeTaskProgressCommand.execute(this.taskId, progress);
    };
    TaskEditController.prototype.processEnd = function (position) {
        this.baseElement.className = this.baseElement.className + " move";
        this.isEditingInProgress = true;
        var positionX = position.x > this.wrapInfo.position.x ? position.x : this.wrapInfo.position.x;
        var width = positionX - this.wrapInfo.position.x;
        this.baseElement.style.width = (width < 1 ? 0 : width) + "px";
        var startDate = this.task.start;
        var date = this.gantt.gridLayoutCalculator.getDateByPos(positionX);
        date.setSeconds(0);
        if (date < startDate || width < 1)
            this.taskDateRange.end.setTime(startDate.getTime());
        else
            this.taskDateRange.end = this.getNewDate(this.task.end, date);
        this.tooltip.showTime(startDate, this.taskDateRange.end, dom_1.DomUtils.getAbsolutePositionX(this.baseElement) + this.baseElement.clientWidth);
    };
    TaskEditController.prototype.confirmEnd = function () {
        this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
        this.isEditingInProgress = false;
        this.gantt.commandManager.changeTaskEndCommand.execute(this.taskId, this.taskDateRange.end);
        this.hide();
        this.updateWrapInfo();
    };
    TaskEditController.prototype.processStart = function (position) {
        this.baseElement.className = this.baseElement.className + " move";
        this.isEditingInProgress = true;
        var positionX = position.x < this.wrapInfo.position.x + this.wrapInfo.size.width ? position.x : this.wrapInfo.position.x + this.wrapInfo.size.width;
        var width = this.wrapInfo.size.width - (positionX - this.wrapInfo.position.x);
        this.baseElement.style.left = positionX + "px";
        this.baseElement.style.width = (width < 1 ? 0 : width) + "px";
        var endDate = this.task.end;
        var date = this.gantt.gridLayoutCalculator.getDateByPos(positionX);
        date.setSeconds(0);
        if (date > endDate || width < 1)
            this.taskDateRange.start.setTime(endDate.getTime());
        else
            this.taskDateRange.start = this.getNewDate(this.task.start, date);
        this.tooltip.showTime(this.taskDateRange.start, endDate, dom_1.DomUtils.getAbsolutePositionX(this.baseElement));
    };
    TaskEditController.prototype.confirmStart = function () {
        this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
        this.isEditingInProgress = false;
        this.gantt.commandManager.changeTaskStartCommand.execute(this.taskId, this.taskDateRange.start);
        this.hide();
        this.updateWrapInfo();
    };
    TaskEditController.prototype.processMove = function (delta) {
        if (this.gantt.settings.editing.enabled && this.gantt.settings.editing.allowTaskUpdate) {
            this.baseElement.className = this.baseElement.className + " move";
            var left = this.baseElement.offsetLeft + delta;
            this.baseElement.style.left = left + "px";
            var date = this.gantt.gridLayoutCalculator.getDateByPos(left);
            this.taskDateRange.start = this.getNewDate(this.task.start, date);
            var dateDiff = this.task.start.getTime() - this.taskDateRange.start.getTime();
            var endDate = new Date(this.task.end.getTime() - dateDiff);
            this.taskDateRange.end = this.getNewDate(this.task.end, endDate);
            this.isEditingInProgress = this.gantt.modelManipulator.dispatcher.raiseTaskMoving(this.task, this.taskDateRange.start, this.taskDateRange.end, this.onTaskMovingCallback.bind(this));
            if (this.isEditingInProgress)
                this.tooltip.showTime(this.taskDateRange.start, this.taskDateRange.end, dom_1.DomUtils.getAbsolutePositionX(this.baseElement));
            return this.isEditingInProgress;
        }
        return true;
    };
    TaskEditController.prototype.onTaskMovingCallback = function (newStart, newEnd) {
        if (this.taskDateRange.start === newStart && this.taskDateRange.end === newEnd)
            return;
        var calculator = this.gantt.gridLayoutCalculator;
        var newLeft = calculator.getPosByDate(newStart);
        var newWidth = calculator.getPosByDate(newEnd) - newLeft;
        this.baseElement.style.left = newLeft + "px";
        this.baseElement.style.width = (newWidth < 1 ? 0 : newWidth) + "px";
        this.taskDateRange.start = newStart;
        this.taskDateRange.end = newEnd;
    };
    TaskEditController.prototype.confirmMove = function () {
        if (this.gantt.settings.editing.enabled && this.gantt.settings.editing.allowTaskUpdate) {
            if (!this.gantt.settings.editing.allowDependencyInsert)
                this.baseElement.className = this.baseElement.className + " hide-dependency";
            if (this.isEditingInProgress) {
                this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
                this.gantt.commandManager.taskMoveCommand.execute(this.taskId, this.taskDateRange.start, this.taskDateRange.end);
                this.updateWrapInfo();
                this.hide();
                this.isEditingInProgress = false;
            }
        }
    };
    TaskEditController.prototype.getNewDate = function (referenceDate, newDate) {
        if (this.gantt.settings.viewType > Enums_1.ViewType.SixHours) {
            var year = newDate.getFullYear();
            var month = newDate.getMonth();
            var day = newDate.getDate();
            var hours = this.gantt.settings.viewType === Enums_1.ViewType.Days ? newDate.getHours() : referenceDate.getHours();
            var minutes = referenceDate.getMinutes();
            var sec = referenceDate.getSeconds();
            var msec = referenceDate.getMilliseconds();
            return new Date(year, month, day, hours, minutes, sec, msec);
        }
        return newDate;
    };
    TaskEditController.prototype.startDependency = function (pos) {
        this.dependencyLine = document.createElement("DIV");
        this.dependencyLine.className = TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_LINE;
        this.gantt.taskArea.appendChild(this.dependencyLine);
        this.startPosition = pos;
    };
    TaskEditController.prototype.processDependency = function (pos) {
        this.isEditingInProgress = true;
        this.drawline(this.startPosition, pos);
    };
    TaskEditController.prototype.endDependency = function (type) {
        this.isEditingInProgress = false;
        if (type != null)
            this.gantt.commandManager.createDependencyCommand.execute(this.task.internalId, this.successorId, type);
        var parentNode = this.dependencyLine.parentNode;
        if (parentNode)
            parentNode.removeChild(this.dependencyLine);
        this.dependencyLine = null;
        this.hideDependencySuccessor();
        this.hide();
    };
    TaskEditController.prototype.selectDependency = function (id) {
        if (this.gantt.settings.editing.allowDependencyDelete)
            this.dependencyId = id;
    };
    TaskEditController.prototype.isDependencySelected = function (id) {
        return this.dependencyId && this.dependencyId === id;
    };
    TaskEditController.prototype.deleteSelectedDependency = function () {
        if (this.dependencyId)
            this.gantt.commandManager.removeDependencyCommand.execute(this.dependencyId);
    };
    TaskEditController.prototype.getTaskWrapperElementInfo = function (taskIndex) {
        var calculator = this.gantt.gridLayoutCalculator;
        var info = calculator.getTaskWrapperElementInfo(taskIndex);
        info.size.width = calculator.getTaskWidth(taskIndex);
        info.size.height = calculator.getTaskHeight(taskIndex);
        return info;
    };
    TaskEditController.prototype.createElements = function () {
        this.baseElement = document.createElement("DIV");
        this.baseFrame = document.createElement("DIV");
        this.baseFrame.className = TaskEditController.CLASSNAMES.TASK_EDIT_FRAME;
        this.baseElement.appendChild(this.baseFrame);
        this.progressEdit = document.createElement("DIV");
        this.progressEdit.className = TaskEditController.CLASSNAMES.TASK_EDIT_PROGRESS;
        this.baseFrame.appendChild(this.progressEdit);
        this.progressEdit.appendChild(document.createElement("DIV"));
        this.dependencyFinish = document.createElement("DIV");
        this.dependencyFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_RIGTH);
        if (browser_1.Browser.TouchUI)
            this.dependencyFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.baseFrame.appendChild(this.dependencyFinish);
        this.dependencyStart = document.createElement("DIV");
        this.dependencyStart.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_LEFT);
        if (browser_1.Browser.TouchUI)
            this.dependencyStart.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.baseFrame.appendChild(this.dependencyStart);
        this.startEdit = document.createElement("DIV");
        this.startEdit.className = TaskEditController.CLASSNAMES.TASK_EDIT_START;
        this.baseFrame.appendChild(this.startEdit);
        this.endEdit = document.createElement("DIV");
        this.endEdit.className = TaskEditController.CLASSNAMES.TASK_EDIT_END;
        this.baseFrame.appendChild(this.endEdit);
        this.dependencySuccessorBaseElement = document.createElement("DIV");
        this.dependencySuccessorBaseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX_SUCCESSOR;
        this.dependencySuccessorFrame = document.createElement("DIV");
        this.dependencySuccessorFrame.className = TaskEditController.CLASSNAMES.TASK_EDIT_FRAME_SUCCESSOR;
        this.dependencySuccessorBaseElement.appendChild(this.dependencySuccessorFrame);
        this.dependencySuccessorStart = document.createElement("DIV");
        this.dependencySuccessorStart.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_SUCCESSOR_DEPENDENCY_RIGTH);
        if (browser_1.Browser.TouchUI)
            this.dependencySuccessorStart.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.dependencySuccessorFrame.appendChild(this.dependencySuccessorStart);
        this.dependencySuccessorFinish = document.createElement("DIV");
        this.dependencySuccessorFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_SUCCESSOR_DEPENDENCY_LEFT);
        if (browser_1.Browser.TouchUI)
            this.dependencySuccessorFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.dependencySuccessorFrame.appendChild(this.dependencySuccessorFinish);
        this.tooltip = new TaskEditTooltip_1.TaskEditTooltip(this.baseElement, this.gantt, this.gantt.elementTextHelper.cultureInfo);
        this.attachEvents();
    };
    TaskEditController.prototype.attachEvents = function () {
        this.onMouseLeaveHandler = function () {
            if (!this.isEditingInProgress)
                this.hide();
        }.bind(this);
        this.baseElement.addEventListener("mouseleave", this.onMouseLeaveHandler);
    };
    TaskEditController.prototype.drawline = function (start, end) {
        if (start.x > end.x) {
            var temp = end;
            end = start;
            start = temp;
        }
        var angle = Math.atan((start.y - end.y) / (end.x - start.x));
        angle = (angle * 180 / Math.PI);
        angle = -angle;
        var length = Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y));
        this.dependencyLine.style.left = start.x + "px";
        this.dependencyLine.style.top = start.y + "px";
        this.dependencyLine.style.width = length + "px";
        this.dependencyLine.style.transform = "rotate(" + angle + "deg)";
    };
    TaskEditController.prototype.canUpdateTask = function () {
        return !this.gantt.viewModel.isTaskToCalculateByChildren(this.task.internalId);
    };
    TaskEditController.prototype.detachEvents = function () {
        var _a;
        (_a = this.baseElement) === null || _a === void 0 ? void 0 : _a.removeEventListener("mouseleave", this.onMouseLeaveHandler);
    };
    TaskEditController.CLASSNAMES = {
        TASK_EDIT_BOX: "dx-gantt-task-edit-wrapper",
        TASK_EDIT_BOX_CUSTOM: "dx-gantt-task-edit-wrapper-custom",
        TASK_EDIT_FRAME: "dx-gantt-task-edit-frame",
        TASK_EDIT_PROGRESS: "dx-gantt-task-edit-progress",
        TASK_EDIT_DEPENDENCY_RIGTH: "dx-gantt-task-edit-dependency-r",
        TASK_EDIT_DEPENDENCY_LEFT: "dx-gantt-task-edit-dependency-l",
        TASK_EDIT_START: "dx-gantt-task-edit-start",
        TASK_EDIT_END: "dx-gantt-task-edit-end",
        TASK_EDIT_DEPENDENCY_LINE: "dx-gantt-task-edit-dependency-line",
        TASK_EDIT_BOX_SUCCESSOR: "dx-gantt-task-edit-wrapper-successor",
        TASK_EDIT_FRAME_SUCCESSOR: "dx-gantt-task-edit-frame-successor",
        TASK_EDIT_SUCCESSOR_DEPENDENCY_RIGTH: "dx-gantt-task-edit-successor-dependency-r",
        TASK_EDIT_SUCCESSOR_DEPENDENCY_LEFT: "dx-gantt-task-edit-successor-dependency-l",
        TASK_EDIT_TOUCH: "dx-gantt-edit-touch"
    };
    return TaskEditController;
}());
exports.TaskEditController = TaskEditController;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryItemState = void 0;
var HistoryItemState = (function () {
    function HistoryItemState(id, value) {
        this.id = id;
        this.value = value;
    }
    return HistoryItemState;
}());
exports.HistoryItemState = HistoryItemState;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerBase = void 0;
var TaskAreaManager_1 = __webpack_require__(8);
var TaskEditController_1 = __webpack_require__(53);
var HandlerBase = (function () {
    function HandlerBase(control) {
        this.control = control;
        this.switchToDefaultState();
    }
    HandlerBase.prototype.switchState = function (state) {
        if (this.state)
            this.state.finish();
        this.state = state;
        this.state.start();
    };
    HandlerBase.prototype.switchToDefaultState = function () {
        throw new Error("Not implemented");
    };
    HandlerBase.prototype.getEventSource = function (initSource) {
        var source = initSource.nodeType === Node.ELEMENT_NODE ? initSource : initSource.parentNode;
        var className = source.classList[0];
        return HandlerBase.classToSource[className] || TaskAreaManager_1.MouseEventSource.TaskArea;
    };
    HandlerBase.classToSource = (_a = {},
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_PROGRESS] = TaskAreaManager_1.MouseEventSource.TaskEdit_Progress,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_START] = TaskAreaManager_1.MouseEventSource.TaskEdit_Start,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_END] = TaskAreaManager_1.MouseEventSource.TaskEdit_End,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_FRAME] = TaskAreaManager_1.MouseEventSource.TaskEdit_Frame,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_RIGTH] = TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyStart,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_LEFT] = TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyFinish,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_SUCCESSOR_DEPENDENCY_RIGTH] = TaskAreaManager_1.MouseEventSource.Successor_DependencyStart,
        _a[TaskEditController_1.TaskEditController.CLASSNAMES.TASK_EDIT_SUCCESSOR_DEPENDENCY_LEFT] = TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish,
        _a);
    return HandlerBase;
}());
exports.HandlerBase = HandlerBase;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHandlerDependencyState = exports.dependencyMap = void 0;
var tslib_1 = __webpack_require__(0);
var point_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(2);
var evt_1 = __webpack_require__(6);
var MouseHandlerStateBase_1 = __webpack_require__(34);
var TaskAreaManager_1 = __webpack_require__(8);
var Dependency_1 = __webpack_require__(13);
exports.dependencyMap = [];
exports.dependencyMap[TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyStart] = [];
exports.dependencyMap[TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyFinish] = [];
exports.dependencyMap[TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyStart][TaskAreaManager_1.MouseEventSource.Successor_DependencyStart] = Dependency_1.DependencyType.SS;
exports.dependencyMap[TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyStart][TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish] = Dependency_1.DependencyType.SF;
exports.dependencyMap[TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyFinish][TaskAreaManager_1.MouseEventSource.Successor_DependencyStart] = Dependency_1.DependencyType.FS;
exports.dependencyMap[TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyFinish][TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish] = Dependency_1.DependencyType.FF;
var MouseHandlerDependencyState = (function (_super) {
    tslib_1.__extends(MouseHandlerDependencyState, _super);
    function MouseHandlerDependencyState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerDependencyState.prototype.onMouseDown = function (evt) {
        var sourceElement = evt_1.EvtUtils.getEventSource(evt);
        this.source = this.handler.getEventSource(sourceElement);
        var pos = this.getRelativePos(new point_1.Point(dom_1.DomUtils.getAbsolutePositionX(sourceElement) + sourceElement.clientWidth / 2, dom_1.DomUtils.getAbsolutePositionY(sourceElement) + sourceElement.clientHeight / 2));
        this.handler.control.taskEditController.startDependency(pos);
    };
    MouseHandlerDependencyState.prototype.onMouseUp = function (evt) {
        if (evt instanceof PointerEvent) {
            var relativePosStart = this.getRelativePos(new point_1.Point(dom_1.DomUtils.getAbsolutePositionX(this.handler.control.taskEditController.dependencySuccessorStart) + this.handler.control.taskEditController.dependencySuccessorStart.clientWidth / 2, dom_1.DomUtils.getAbsolutePositionY(this.handler.control.taskEditController.dependencySuccessorStart) + this.handler.control.taskEditController.dependencySuccessorStart.clientHeight / 2));
            var relativePosEnd = this.getRelativePos(new point_1.Point(dom_1.DomUtils.getAbsolutePositionX(this.handler.control.taskEditController.dependencySuccessorFinish) + this.handler.control.taskEditController.dependencySuccessorFinish.clientWidth / 2, dom_1.DomUtils.getAbsolutePositionY(this.handler.control.taskEditController.dependencySuccessorFinish) + this.handler.control.taskEditController.dependencySuccessorFinish.clientHeight / 2));
            var relativeTouchPos = this.getRelativePos(new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt)));
            var target = this.isTouchNearby(relativeTouchPos, relativePosStart) ? TaskAreaManager_1.MouseEventSource.Successor_DependencyStart :
                this.isTouchNearby(relativeTouchPos, relativePosEnd) ? TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish : null;
            var type = target === TaskAreaManager_1.MouseEventSource.Successor_DependencyStart || target == TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish ?
                exports.dependencyMap[this.source][target] : null;
            this.handler.control.taskEditController.endDependency(type);
        }
        else {
            var target = this.handler.getEventSource(evt_1.EvtUtils.getEventSource(evt));
            var type = target === TaskAreaManager_1.MouseEventSource.Successor_DependencyStart || target == TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish ?
                exports.dependencyMap[this.source][target] : null;
            this.handler.control.taskEditController.endDependency(type);
        }
        this.handler.switchToDefaultState();
    };
    MouseHandlerDependencyState.prototype.onMouseMove = function (evt) {
        evt.preventDefault();
        var relativePos = this.getRelativePos(new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt)));
        var hoverTaskIndex = Math.floor(relativePos.y / this.handler.control.tickSize.height);
        this.handler.control.taskEditController.processDependency(relativePos);
        if (this.handler.control.viewModel.tasks.items[hoverTaskIndex])
            this.handler.control.taskEditController.showDependencySuccessor(hoverTaskIndex);
    };
    MouseHandlerDependencyState.prototype.isTouchNearby = function (touchPos, elementPos) {
        if (Math.abs(elementPos.x - touchPos.x) <= 10 && Math.abs(elementPos.y - touchPos.y) <= 10)
            return true;
        return false;
    };
    return MouseHandlerDependencyState;
}(MouseHandlerStateBase_1.MouseHandlerStateBase));
exports.MouseHandlerDependencyState = MouseHandlerDependencyState;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchHandlerStateBase = void 0;
var tslib_1 = __webpack_require__(0);
var HandlerStateBase_1 = __webpack_require__(22);
var TouchHandlerStateBase = (function (_super) {
    tslib_1.__extends(TouchHandlerStateBase, _super);
    function TouchHandlerStateBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerStateBase.prototype.onTouchStart = function (_evt) { };
    TouchHandlerStateBase.prototype.onDoubleTap = function (_evt) { };
    TouchHandlerStateBase.prototype.onTouchEnd = function (_evt) { };
    TouchHandlerStateBase.prototype.onTouchMove = function (_evt) { };
    return TouchHandlerStateBase;
}(HandlerStateBase_1.HandlerStateBase));
exports.TouchHandlerStateBase = TouchHandlerStateBase;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEditDialogShowingArguments = exports.TaskUpdatingArguments = exports.TaskRemovingArguments = exports.TaskInsertingArguments = void 0;
var tslib_1 = __webpack_require__(0);
var BaseArguments_1 = __webpack_require__(23);
var TaskInsertingArguments = (function (_super) {
    tslib_1.__extends(TaskInsertingArguments, _super);
    function TaskInsertingArguments(key, data) {
        var _this = _super.call(this, key) || this;
        _this.values = data !== null && data !== void 0 ? data : {};
        return _this;
    }
    Object.defineProperty(TaskInsertingArguments.prototype, "start", {
        get: function () { return this.values.start; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskInsertingArguments.prototype, "end", {
        get: function () { return this.values.end; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskInsertingArguments.prototype, "title", {
        get: function () { return this.values.title; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskInsertingArguments.prototype, "progress", {
        get: function () { return this.values.progress; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskInsertingArguments.prototype, "parentId", {
        get: function () { return this.values.parentId; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskInsertingArguments.prototype, "color", {
        get: function () { return this.values.color; },
        enumerable: false,
        configurable: true
    });
    return TaskInsertingArguments;
}(BaseArguments_1.BaseArguments));
exports.TaskInsertingArguments = TaskInsertingArguments;
var TaskRemovingArguments = (function (_super) {
    tslib_1.__extends(TaskRemovingArguments, _super);
    function TaskRemovingArguments(task) {
        var _this = _super.call(this, task.id) || this;
        _this.values = task;
        return _this;
    }
    return TaskRemovingArguments;
}(BaseArguments_1.BaseArguments));
exports.TaskRemovingArguments = TaskRemovingArguments;
var TaskUpdatingArguments = (function (_super) {
    tslib_1.__extends(TaskUpdatingArguments, _super);
    function TaskUpdatingArguments(task, fieldNames, newValues) {
        var _this = _super.call(this, task.id) || this;
        _this.values = task;
        _this.createNewValues(fieldNames, newValues);
        return _this;
    }
    TaskUpdatingArguments.prototype.createNewValues = function (fieldNames, newValues) {
        var _this = this;
        this.newValues = {};
        var _loop_1 = function (i) {
            var fieldName = fieldNames[i];
            this_1.newValues[fieldName] = newValues[i];
            Object.defineProperty(this_1, fieldName, {
                get: function () { return _this.newValues[fieldName]; }
            });
        };
        var this_1 = this;
        for (var i = 0; i < fieldNames.length; i++) {
            _loop_1(i);
        }
    };
    return TaskUpdatingArguments;
}(BaseArguments_1.BaseArguments));
exports.TaskUpdatingArguments = TaskUpdatingArguments;
var TaskEditDialogShowingArguments = (function (_super) {
    tslib_1.__extends(TaskEditDialogShowingArguments, _super);
    function TaskEditDialogShowingArguments(params) {
        var _this = _super.call(this, params.id) || this;
        _this.values = {
            start: params.start,
            end: params.end,
            title: params.title,
            progress: params.progress
        };
        _this.hiddenFields = params.hiddenFields;
        _this.readOnlyFields = params.readOnlyFields;
        return _this;
    }
    return TaskEditDialogShowingArguments;
}(BaseArguments_1.BaseArguments));
exports.TaskEditDialogShowingArguments = TaskEditDialogShowingArguments;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceManagerDialogShowingArguments = exports.ResourceRemovingArguments = exports.ResourceInsertingArguments = void 0;
var tslib_1 = __webpack_require__(0);
var BaseArguments_1 = __webpack_require__(23);
var ResourceInsertingArguments = (function (_super) {
    tslib_1.__extends(ResourceInsertingArguments, _super);
    function ResourceInsertingArguments(text, color) {
        if (color === void 0) { color = ""; }
        var _this = _super.call(this, null) || this;
        _this.values = {
            text: text,
            color: color
        };
        return _this;
    }
    Object.defineProperty(ResourceInsertingArguments.prototype, "text", {
        get: function () { return this.values.text; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResourceInsertingArguments.prototype, "color", {
        get: function () { return this.values.color; },
        enumerable: false,
        configurable: true
    });
    return ResourceInsertingArguments;
}(BaseArguments_1.BaseArguments));
exports.ResourceInsertingArguments = ResourceInsertingArguments;
var ResourceRemovingArguments = (function (_super) {
    tslib_1.__extends(ResourceRemovingArguments, _super);
    function ResourceRemovingArguments(resource) {
        var _this = _super.call(this, resource.id) || this;
        _this.values = resource;
        return _this;
    }
    return ResourceRemovingArguments;
}(BaseArguments_1.BaseArguments));
exports.ResourceRemovingArguments = ResourceRemovingArguments;
var ResourceManagerDialogShowingArguments = (function (_super) {
    tslib_1.__extends(ResourceManagerDialogShowingArguments, _super);
    function ResourceManagerDialogShowingArguments(params) {
        var _this = _super.call(this, undefined) || this;
        _this.values.resources = params.resources;
        return _this;
    }
    return ResourceManagerDialogShowingArguments;
}(BaseArguments_1.BaseArguments));
exports.ResourceManagerDialogShowingArguments = ResourceManagerDialogShowingArguments;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveTaskHistoryItem = exports.CreateTaskHistoryItem = void 0;
var tslib_1 = __webpack_require__(0);
var HistoryItem_1 = __webpack_require__(15);
var TaskDependencyHistoryItem_1 = __webpack_require__(24);
var CreateTaskHistoryItem = (function (_super) {
    tslib_1.__extends(CreateTaskHistoryItem, _super);
    function CreateTaskHistoryItem(modelManipulator, data) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.data = data;
        return _this;
    }
    CreateTaskHistoryItem.prototype.redo = function () {
        this.taskId = this.modelManipulator.task.create(this.data, this.taskId ? this.taskId : null).internalId;
    };
    CreateTaskHistoryItem.prototype.undo = function () {
        this.modelManipulator.task.remove(this.taskId);
    };
    return CreateTaskHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.CreateTaskHistoryItem = CreateTaskHistoryItem;
var RemoveTaskHistoryItem = (function (_super) {
    tslib_1.__extends(RemoveTaskHistoryItem, _super);
    function RemoveTaskHistoryItem(modelManipulator) {
        var _this = _super.call(this) || this;
        _this.taskIds = [];
        _this.tasks = [];
        _this.modelManipulator = modelManipulator;
        return _this;
    }
    RemoveTaskHistoryItem.prototype.redo = function () {
        var _this = this;
        _super.prototype.redo.call(this);
        this.taskIds.forEach(function (id) {
            _this.tasks.push(_this.modelManipulator.task.remove(id));
        });
    };
    RemoveTaskHistoryItem.prototype.undo = function () {
        var _this = this;
        if (this.tasks.length) {
            var task_1 = this.tasks.shift();
            this.modelManipulator.task.create(task_1, task_1.internalId, function () {
                _this.modelManipulator.task.properties.progress.setValue(task_1.internalId, task_1.progress);
                if (task_1.color)
                    _this.modelManipulator.task.properties.color.setValue(task_1.internalId, task_1.color);
                _this.tasks.length ? _this.undo() : _super.prototype.undo.call(_this);
            });
        }
    };
    RemoveTaskHistoryItem.prototype.undoItemsQuery = function () {
        while (this.tasks.length) {
            var task = this.tasks.shift();
            this.modelManipulator.task.create(task, task.internalId, function () { });
            this.modelManipulator.task.properties.progress.setValue(task.internalId, task.progress);
            if (task.color)
                this.modelManipulator.task.properties.color.setValue(task.internalId, task.color);
        }
        _super.prototype.undo.call(this);
    };
    RemoveTaskHistoryItem.prototype.addTask = function (taskId) {
        this.taskIds.push(taskId);
    };
    RemoveTaskHistoryItem.prototype.add = function (historyItem) {
        if (historyItem instanceof TaskDependencyHistoryItem_1.RemoveDependencyHistoryItem) {
            var item_1 = historyItem;
            if (!this.historyItems.filter(function (i) { return i instanceof TaskDependencyHistoryItem_1.RemoveDependencyHistoryItem && i.dependencyId == item_1.dependencyId; }).length)
                this.historyItems.push(item_1);
        }
        else
            _super.prototype.add.call(this, historyItem);
    };
    return RemoveTaskHistoryItem;
}(HistoryItem_1.CompositionHistoryItem));
exports.RemoveTaskHistoryItem = RemoveTaskHistoryItem;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstraintViolationDialogParameters = exports.ConstraintViolationDialogCommand = exports.ConstraintViolationOption = void 0;
var tslib_1 = __webpack_require__(0);
var DialogBase_1 = __webpack_require__(27);
var TaskDependencyHistoryItem_1 = __webpack_require__(24);
var ConstraintViolationOption;
(function (ConstraintViolationOption) {
    ConstraintViolationOption[ConstraintViolationOption["DoNothing"] = 0] = "DoNothing";
    ConstraintViolationOption[ConstraintViolationOption["RemoveDependency"] = 1] = "RemoveDependency";
    ConstraintViolationOption[ConstraintViolationOption["KeepDependency"] = 2] = "KeepDependency";
})(ConstraintViolationOption = exports.ConstraintViolationOption || (exports.ConstraintViolationOption = {}));
var ConstraintViolationDialogCommand = (function (_super) {
    tslib_1.__extends(ConstraintViolationDialogCommand, _super);
    function ConstraintViolationDialogCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConstraintViolationDialogCommand.prototype.applyParameters = function (newParameters, oldParameters) {
        if (newParameters.option === ConstraintViolationOption.DoNothing)
            return false;
        if (newParameters.option === ConstraintViolationOption.RemoveDependency) {
            this.history.beginTransaction();
            this.history.addAndRedo(new TaskDependencyHistoryItem_1.RemoveDependencyHistoryItem(this.modelManipulator, oldParameters.validationError.dependencyId));
            oldParameters.callback();
            this.history.endTransaction();
            this.control.barManager.updateItemsState([]);
        }
        if (newParameters.option === ConstraintViolationOption.KeepDependency) {
            oldParameters.callback();
            this.control.barManager.updateItemsState([]);
        }
        return true;
    };
    ConstraintViolationDialogCommand.prototype.createParameters = function (options) {
        var dependency = this.control.viewModel.dependencies.getItemById(options.validationError.dependencyId);
        var successorTask = this.control.viewModel.tasks.getItemById(dependency.successorId);
        var predecessorTask = this.control.viewModel.tasks.getItemById(dependency.predecessorId);
        options.successorTaskTitle = successorTask.title;
        options.predecessorTaskTitle = predecessorTask.title;
        return options;
    };
    ConstraintViolationDialogCommand.prototype.getDialogName = function () {
        return "ConstraintViolation";
    };
    return ConstraintViolationDialogCommand;
}(DialogBase_1.DialogBase));
exports.ConstraintViolationDialogCommand = ConstraintViolationDialogCommand;
var ConstraintViolationDialogParameters = (function (_super) {
    tslib_1.__extends(ConstraintViolationDialogParameters, _super);
    function ConstraintViolationDialogParameters(validationError, callback) {
        var _this = _super.call(this) || this;
        _this.validationError = validationError;
        _this.callback = callback;
        return _this;
    }
    ConstraintViolationDialogParameters.prototype.clone = function () {
        var result = new ConstraintViolationDialogParameters(this.validationError, this.callback);
        result.option = this.option;
        return result;
    };
    return ConstraintViolationDialogParameters;
}(DialogBase_1.DialogParametersBase));
exports.ConstraintViolationDialogParameters = ConstraintViolationDialogParameters;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EllipsisHelper = void 0;
var EllipsisHelper = (function () {
    function EllipsisHelper() {
    }
    EllipsisHelper.limitPdfTextWithEllipsis = function (text, pdfDoc, size) {
        if (!(pdfDoc === null || pdfDoc === void 0 ? void 0 : pdfDoc.getTextWidth) || !size)
            return text;
        var pdfTextWidth = pdfDoc.getTextWidth(text);
        if (pdfTextWidth > size) {
            var outputText = EllipsisHelper.ellipsis;
            var pos = 0;
            while (pdfDoc.getTextWidth(outputText) < size) {
                var char = text[pos];
                outputText = outputText.substr(0, pos) + char + outputText.substr(pos);
                pos++;
            }
            return outputText;
        }
        return text;
    };
    EllipsisHelper.ellipsis = "...";
    return EllipsisHelper;
}());
exports.EllipsisHelper = EllipsisHelper;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Width = void 0;
var PredefinedStyles_1 = __webpack_require__(39);
var dom_1 = __webpack_require__(2);
var Width = (function () {
    function Width(width) {
        this.assign(width);
    }
    Width.prototype.assign = function (source) {
        if (source instanceof Width)
            this._widthInternal = source._widthInternal;
        else {
            var num = typeof source === "number" ? source : parseInt(source);
            if (!isNaN(num))
                this._widthInternal = num;
            else
                this.assignFromString(source);
        }
    };
    Width.prototype.assignFromString = function (source) {
        if (source) {
            var px = dom_1.DomUtils.pxToInt(source);
            if (px)
                this._widthInternal = px;
            else
                this._widthInternal = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(source, PredefinedStyles_1.PredefinedStyles.width);
        }
    };
    Width.prototype.hasValue = function () {
        return !!this._widthInternal;
    };
    Width.prototype.getValue = function () {
        return this._widthInternal;
    };
    return Width;
}());
exports.Width = Width;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfDependencyLineInfo = void 0;
var point_1 = __webpack_require__(3);
var Color_1 = __webpack_require__(16);
var PdfDependencyLineInfo = (function () {
    function PdfDependencyLineInfo() {
    }
    PdfDependencyLineInfo.prototype.assign = function (source) {
        var _a;
        this._copyPoints(source.points);
        this.arrowInfo = source.arrowInfo;
        (_a = this.fillColor) !== null && _a !== void 0 ? _a : (this.fillColor = new Color_1.Color());
        this.fillColor.assign(source.fillColor);
    };
    PdfDependencyLineInfo.prototype._copyPoints = function (source) {
        var _this = this;
        this.points = new Array();
        source === null || source === void 0 ? void 0 : source.forEach(function (p) { return _this.points.push(new point_1.Point(p.x, p.y)); });
    };
    return PdfDependencyLineInfo;
}());
exports.PdfDependencyLineInfo = PdfDependencyLineInfo;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfTaskResourcesInfo = void 0;
var common_1 = __webpack_require__(1);
var StyleDef_1 = __webpack_require__(19);
var PdfTaskResourcesInfo = (function () {
    function PdfTaskResourcesInfo(text, style, x, y) {
        if (text)
            this.text = text;
        if (style)
            this.style = new StyleDef_1.StyleDef(style);
        if (common_1.isDefined(x))
            this.x = x;
        if (common_1.isDefined(y))
            this.y = y;
    }
    PdfTaskResourcesInfo.prototype.assign = function (source) {
        this.text = source.text;
        this.style = new StyleDef_1.StyleDef(source.style);
        this.x = source.x;
        this.y = source.y;
    };
    return PdfTaskResourcesInfo;
}());
exports.PdfTaskResourcesInfo = PdfTaskResourcesInfo;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GanttView = exports.default = void 0;
__webpack_require__(67);
var GanttView_1 = __webpack_require__(68);
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return GanttView_1.GanttView; } });
Object.defineProperty(exports, "GanttView", { enumerable: true, get: function () { return GanttView_1.GanttView; } });


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GanttView = void 0;
var VisualModel_1 = __webpack_require__(69);
var Enums_1 = __webpack_require__(11);
var Utils_1 = __webpack_require__(33);
var dom_1 = __webpack_require__(2);
var DateRange_1 = __webpack_require__(10);
var size_1 = __webpack_require__(9);
var point_1 = __webpack_require__(3);
var GridElementInfo_1 = __webpack_require__(51);
var GridLayoutCalculator_1 = __webpack_require__(14);
var EtalonSizeValues_1 = __webpack_require__(93);
var TaskEditController_1 = __webpack_require__(53);
var TaskAreaManager_1 = __webpack_require__(8);
var ModelManipulator_1 = __webpack_require__(95);
var History_1 = __webpack_require__(100);
var EventManager_1 = __webpack_require__(102);
var TaskAreaContainer_1 = __webpack_require__(117);
var Settings_1 = __webpack_require__(52);
var ModelChangesDispatcher_1 = __webpack_require__(118);
var CommandManager_1 = __webpack_require__(120);
var BarManager_1 = __webpack_require__(135);
var browser_1 = __webpack_require__(5);
var ValidationController_1 = __webpack_require__(136);
var DateTimeUtils_1 = __webpack_require__(4);
var FullScreenModeHelper_1 = __webpack_require__(137);
var TaskHistoryItem_1 = __webpack_require__(60);
var common_1 = __webpack_require__(1);
var ResourceHistoryItem_1 = __webpack_require__(25);
var Exporter_1 = __webpack_require__(139);
var Calculator_1 = __webpack_require__(144);
var GanttView = (function () {
    function GanttView(element, ganttOwner, settings) {
        var _this = this;
        this.timeScaleAreas = new Array();
        this.horTaskAreaBorders = [];
        this.vertTaskAreaBorders = [];
        this.scaleBorders = [];
        this.scaleElements = [];
        this.taskElements = [];
        this.resourcesElements = [];
        this.selectionElements = [];
        this.hlRowElements = [];
        this.renderedRowIndices = [];
        this.renderedColIndices = [];
        this.renderedScaleItemIndices = [];
        this.dependencyMap = [];
        this.invalidTaskDependencies = [];
        this.renderedConnectorLines = [];
        this.connectorLinesToElementsMap = {};
        this.noWorkingIntervalsToElementsMap = {};
        this.renderedNoWorkingIntervals = [];
        this.renderedStripLines = [];
        this.stripLinesMap = [];
        this.gridLayoutCalculator = new GridLayoutCalculator_1.GridLayoutCalculator();
        this.etalonSizeValues = new EtalonSizeValues_1.EtalonSizeValues();
        this.tickSize = new size_1.Size(0, 0);
        this.scaleCount = 2;
        this.isFocus = false;
        this.currentZoom = 1;
        this.maxZoom = 3;
        this.stripLinesUpdaterId = null;
        this.currentSelectedTaskID = "";
        this.ganttOwner = ganttOwner;
        this.settings = Settings_1.Settings.parse(settings);
        this.elementTextHelper = new Utils_1.ElementTextHelper(settings.cultureInfo);
        this.validationController = new ValidationController_1.ValidationController(this);
        this.createMainElement(element);
        this.createHeader();
        this.calculateEtalonSizeValues();
        this.createTaskAreaContainer();
        this.loadOptionsFromGanttOwner();
        this.elementTextHelper.setFont(this.mainElement);
        this.setupHelpers();
        this.setSizeForTaskArea();
        this.createTimeScaleContainer();
        this.createTimeScaleAreas();
        this.commandManager = new CommandManager_1.CommandManager(this);
        this.barManager = new BarManager_1.BarManager(this, ganttOwner.bars);
        this.eventManager = new EventManager_1.EventManager(this);
        this.taskEditController = new TaskEditController_1.TaskEditController(this);
        this.history = new History_1.History();
        this.taskAreaManager = new TaskAreaManager_1.TaskAreaManager(this);
        this.fullScreenModeHelper = new FullScreenModeHelper_1.FullScreenModeHelper(this);
        this.onWindowResizelHandler = this.onBrowserWindowResize.bind(this);
        window.addEventListener("resize", this.onWindowResizelHandler);
        this.updateView();
        setTimeout(function () {
            _this.scrollLeftByViewType();
        }, 0);
        this.initializeStripLinesUpdater();
    }
    GanttView.prototype.reset = function () {
        this.timeScaleContainer.innerHTML = "";
        this.taskArea.innerHTML = "";
        this.horTaskAreaBorders = [];
        this.vertTaskAreaBorders = [];
        this.scaleBorders = [];
        this.scaleElements = [];
        this.taskElements = [];
        this.selectionElements = [];
        this.hlRowElements = [];
        this.renderedRowIndices = [];
        this.renderedColIndices = [];
        this.renderedConnectorLines = [];
        this.timeScaleAreas = [];
        this.renderedScaleItemIndices = [];
        this.connectorLinesToElementsMap = {};
        this.renderedNoWorkingIntervals = [];
        this.renderedStripLines = [];
        this.noWorkingIntervalsToElementsMap = {};
        this.invalidTaskDependencies = [];
    };
    GanttView.prototype.setupHelpers = function () {
        var size = new size_1.Size(this.taskAreaContainer.getWidth(), this.taskAreaContainer.getHeight());
        var scrollBarHeight = this.taskAreaContainer.getHeight() - this.taskAreaContainer.getElement().clientHeight;
        this.gridLayoutCalculator.setSettings(size, this.tickSize, this.etalonSizeValues, this.range, this.viewModel, this.settings.viewType, scrollBarHeight);
        this.elementTextHelper.setSettings(this.range.start.getTime(), this.settings.viewType, this.viewModel.items);
    };
    GanttView.prototype.getDateRange = function (modelStartDate, modelEndDate) {
        var start = new Date(modelStartDate.getTime() - this.getVisibleAreaTime());
        start = Utils_1.DateUtils.adjustStartDateByViewType(start, this.settings.viewType, this.settings.firstDayOfWeek);
        var end = new Date(modelEndDate.getTime() + this.getVisibleAreaTime());
        end = Utils_1.DateUtils.adjustEndDateByViewType(end, this.settings.viewType, this.settings.firstDayOfWeek);
        return new DateRange_1.DateRange(start, end);
    };
    GanttView.prototype.getVisibleAreaTime = function () {
        var visibleTickCount = Math.ceil(this.taskAreaContainer.getWidth() / this.tickSize.width);
        return visibleTickCount * Utils_1.DateUtils.getTickTimeSpan(this.settings.viewType);
    };
    GanttView.prototype.calculateEtalonSizeValues = function () {
        var etalonElementsContainer = this.createEtalonElementsContainer();
        var etalonElements = this.createEtalonElements(etalonElementsContainer);
        this.calculateEtalonSizeValuesCore(etalonElements);
        this.mainElement.removeChild(etalonElementsContainer);
    };
    GanttView.prototype.calculateEtalonSizeValuesCore = function (etalonElements) {
        this.etalonSizeValues.taskHeight = etalonElements[0].firstChild.offsetHeight;
        this.etalonSizeValues.milestoneWidth = etalonElements[1].firstChild.offsetWidth;
        this.etalonSizeValues.taskWrapperTopPadding = dom_1.DomUtils.pxToInt(dom_1.DomUtils.getCurrentStyle(etalonElements[0]).paddingTop);
        this.etalonSizeValues.connectorLineThickness = dom_1.DomUtils.getVerticalBordersWidth(etalonElements[2]);
        this.etalonSizeValues.connectorArrowWidth = dom_1.DomUtils.getHorizontalBordersWidth(etalonElements[3]);
        for (var i = 0; i <= Enums_1.ViewType.Years; i++) {
            etalonElements[4].innerText = this.elementTextHelper.getScaleItemTextTemplate(i);
            this.etalonSizeValues.scaleItemWidths[i] = etalonElements[4].offsetWidth;
        }
        this.etalonSizeValues.smallTaskWidth = this.getSmallTaskWidth(dom_1.DomUtils.getCurrentStyle(etalonElements[0].firstChild.firstChild).paddingLeft);
        this.etalonSizeValues.outsideTaskTextDefaultWidth = dom_1.DomUtils.pxToFloat(dom_1.DomUtils.getCurrentStyle(etalonElements[5]).width);
        this.etalonSizeValues.scaleItemHeight = this.ganttOwner.getHeaderHeight() / this.scaleCount;
        this.etalonSizeValues.parentTaskHeight = etalonElements[etalonElements.length - 1].firstChild.offsetHeight;
    };
    GanttView.prototype.getSmallTaskWidth = function (etalonPaddingLeft) {
        var result = 0;
        if (etalonPaddingLeft != null && etalonPaddingLeft != "") {
            var indexOfRem = etalonPaddingLeft.indexOf("rem");
            if (indexOfRem > -1)
                try {
                    var remSize = parseFloat(etalonPaddingLeft.substr(0, indexOfRem));
                    result = remSize * parseFloat(getComputedStyle(document.documentElement).fontSize);
                }
                catch (e) { }
            else
                result = dom_1.DomUtils.pxToInt(etalonPaddingLeft);
        }
        return result * 2;
    };
    GanttView.prototype.createEtalonElementsContainer = function () {
        var result = document.createElement("DIV");
        result.style.visibility = "hidden";
        result.style.position = "absolute";
        result.style.left = "-1000px";
        this.mainElement.appendChild(result);
        return result;
    };
    GanttView.prototype.createEtalonElements = function (parent) {
        var etalonElements = [];
        var wrapper = this.createElement(new GridElementInfo_1.GridElementInfo("dx-gantt-taskWrapper"), null, parent);
        var task = this.createElement(new GridElementInfo_1.GridElementInfo("dx-gantt-task"), null, wrapper);
        var taskTitle = this.createElement(new GridElementInfo_1.GridElementInfo("dx-gantt-taskTitle dx-gantt-titleIn"), null, task);
        taskTitle.innerText = "WWW";
        etalonElements.push(wrapper);
        var milestoneWrapper = this.createElement(new GridElementInfo_1.GridElementInfo("dx-gantt-taskWrapper"), null, parent);
        this.createElement(new GridElementInfo_1.GridElementInfo("dx-gantt-task dx-gantt-milestone"), null, milestoneWrapper);
        etalonElements.push(milestoneWrapper);
        var etalonElementClassNames = ["dx-gantt-conn-h", "dx-gantt-arrow", "dx-gantt-si", "dx-gantt-taskTitle dx-gantt-titleOut"];
        for (var i = 0; i < etalonElementClassNames.length; i++) {
            var etalonElementInfo = new GridElementInfo_1.GridElementInfo(etalonElementClassNames[i]);
            etalonElements.push(this.createElement(etalonElementInfo, null, parent));
        }
        var parentWrapper = this.createElement(new GridElementInfo_1.GridElementInfo("dx-gantt-taskWrapper"), null, parent);
        var parentTask = this.createElement(new GridElementInfo_1.GridElementInfo("dx-gantt-task dx-gantt-parent"), null, parentWrapper);
        var parentTaskTitle = this.createElement(new GridElementInfo_1.GridElementInfo("dx-gantt-taskTitle dx-gantt-titleIn"), null, parentTask);
        parentTaskTitle.innerText = "WWW";
        etalonElements.push(parentWrapper);
        return etalonElements;
    };
    GanttView.prototype.zoomIn = function (leftPos) {
        if (leftPos === void 0) { leftPos = this.taskAreaContainer.getWidth() / 2; }
        var targetDate = this.gridLayoutCalculator.getDateByPos(this.taskAreaContainer.scrollLeft + leftPos);
        if (this.currentZoom < this.maxZoom) {
            this.currentZoom++;
            this.updateTickSizeWidth();
            this.resetAndUpdate();
        }
        else if (this.settings.viewType > Enums_1.ViewType.TenMinutes) {
            this.currentZoom = 1;
            this.setViewType(this.settings.viewType - 1, false);
        }
        this.scrollToDateCore(targetDate, -leftPos);
    };
    GanttView.prototype.zoomOut = function (leftPos) {
        if (leftPos === void 0) { leftPos = this.taskAreaContainer.getWidth() / 2; }
        var targetDate = this.gridLayoutCalculator.getDateByPos(this.taskAreaContainer.scrollLeft + leftPos);
        if (this.currentZoom > 1) {
            this.currentZoom--;
            this.updateTickSizeWidth();
            this.resetAndUpdate();
        }
        else if (this.settings.viewType < Enums_1.ViewType.Years) {
            this.currentZoom = this.maxZoom;
            this.setViewType(this.settings.viewType + 1, false);
        }
        this.scrollToDateCore(targetDate, -leftPos);
    };
    GanttView.prototype.scrollToDate = function (date) {
        if (date) {
            var scrollDate = date instanceof Date ? Utils_1.DateUtils.getOrCreateUTCDate(date) : Utils_1.DateUtils.parse(date);
            this.scrollToDateCore(scrollDate, 0);
        }
    };
    GanttView.prototype.scrollLeftByViewType = function () {
        var adjustedStartDate = Utils_1.DateUtils.roundStartDate(this.dataRange.start, this.settings.viewType);
        this.scrollToDateCore(adjustedStartDate, 1);
    };
    GanttView.prototype.scrollToDateCore = function (date, addLeftPos) {
        this.taskAreaContainer.scrollLeft = Math.round(this.gridLayoutCalculator.getPosByDate(date)) + addLeftPos;
    };
    GanttView.prototype.onVisualModelChanged = function () {
        this.resetAndUpdate();
    };
    GanttView.prototype.initializeStripLinesUpdater = function () {
        var _this = this;
        if (this.settings.stripLines.showCurrentTime)
            this.stripLinesUpdaterId = setInterval(function () {
                if (_this.recreateStripLines)
                    _this.recreateStripLines();
            }, Math.max(this.settings.stripLines.currentTimeUpdateInterval, 100));
    };
    GanttView.prototype.clearStripLinesUpdater = function () {
        if (this.stripLinesUpdaterId)
            clearInterval(this.stripLinesUpdaterId);
        this.stripLinesUpdaterId = null;
    };
    GanttView.prototype.getGanttViewStartDate = function (tasks) {
        if (!tasks)
            return new Date();
        var dates = tasks.map(function (t) { return typeof t.start === "string" ? new Date(t.start) : t.start; }).filter(function (d) { return common_1.isDefined(d); });
        return dates.length > 0 ? dates.reduce(function (min, d) { return d < min ? d : min; }, dates[0]) : new Date();
    };
    GanttView.prototype.getGanttViewEndDate = function (tasks) {
        if (!tasks)
            return new Date();
        var dates = tasks.map(function (t) { return typeof t.end === "string" ? new Date(t.end) : t.end; }).filter(function (d) { return common_1.isDefined(d); });
        return dates.length > 0 ? dates.reduce(function (max, d) { return d > max ? d : max; }, dates[0]) : new Date();
    };
    GanttView.prototype.getTaskAreaWidth = function () {
        return this.gridLayoutCalculator.horizontalTickCount * this.tickSize.width;
    };
    GanttView.prototype.getTaskAreaHeight = function () {
        return this.gridLayoutCalculator.getVerticalGridLineHeight();
    };
    GanttView.prototype.getTask = function (index) {
        var item = this.getViewItem(index);
        return item === null || item === void 0 ? void 0 : item.task;
    };
    GanttView.prototype.getViewItem = function (index) {
        return this.viewModel.items[index];
    };
    GanttView.prototype.createMainElement = function (parent) {
        this.mainElement = document.createElement("DIV");
        this.mainElement.style.width = parent.offsetWidth + "px";
        this.mainElement.style.height = parent.offsetHeight + "px";
        parent.appendChild(this.mainElement);
    };
    GanttView.prototype.createHeader = function () {
        this.header = document.createElement("DIV");
        this.header.className = "dx-gantt-header";
        this.mainElement.appendChild(this.header);
    };
    GanttView.prototype.createTimeScaleContainer = function () {
        this.timeScaleContainer = document.createElement("DIV");
        this.timeScaleContainer.className = "dx-gantt-tsac";
        this.timeScaleContainer.style.height = this.etalonSizeValues.scaleItemHeight * this.scaleCount + "px";
        this.header.appendChild(this.timeScaleContainer);
    };
    GanttView.prototype.createTimeScaleArea = function () {
        var timeScaleArea = document.createElement("DIV");
        timeScaleArea.className = "dx-gantt-tsa";
        timeScaleArea.style.width = this.getTaskAreaWidth() + "px";
        timeScaleArea.style.height = this.etalonSizeValues.scaleItemHeight + "px";
        this.timeScaleContainer.appendChild(timeScaleArea);
        this.timeScaleAreas.unshift(timeScaleArea);
        return timeScaleArea;
    };
    GanttView.prototype.createTimeScaleAreas = function () {
        for (var i = 0; i < this.scaleCount; i++) {
            var timeScaleArea = this.createTimeScaleArea();
            if (i === 0 && this.settings.viewType == Enums_1.ViewType.Weeks)
                this.createMonthsScale(timeScaleArea);
        }
    };
    GanttView.prototype.createTaskAreaContainer = function () {
        var element = document.createElement("DIV");
        element.className = "dx-gantt-tac";
        this.mainElement.appendChild(element);
        this.createTaskArea(element);
        this.taskAreaContainer = this.ganttOwner.getExternalTaskAreaContainer(element);
        if (this.taskAreaContainer == null)
            this.taskAreaContainer = new TaskAreaContainer_1.TaskAreaContainer(element, this);
        this.prepareTaskAreaContainer();
    };
    GanttView.prototype.prepareTaskAreaContainer = function () {
        var className = "dx-gantt-tac-hb";
        var element = this.taskAreaContainer.getElement();
        this.settings.areHorizontalBordersEnabled ?
            dom_1.DomUtils.addClassName(element, className) : dom_1.DomUtils.removeClassName(element, className);
        var marginTop = parseInt(getComputedStyle(element).getPropertyValue("margin-top")) || 0;
        element.style.height = "calc(100% - " + (this.etalonSizeValues.scaleItemHeight * this.scaleCount + marginTop) + "px)";
    };
    GanttView.prototype.createTaskArea = function (parent) {
        this.taskArea = document.createElement("DIV");
        this.taskArea.id = "dx-gantt-ta";
        parent.appendChild(this.taskArea);
    };
    GanttView.prototype.setSizeForTaskArea = function () {
        this.taskArea.style.width = this.getTaskAreaWidth() + "px";
        this.taskArea.style.height = this.getTaskAreaHeight() + "px";
    };
    GanttView.prototype.updateTickSizeWidth = function () {
        this.tickSize.width = this.etalonSizeValues.scaleItemWidths[this.settings.viewType] * this.currentZoom;
    };
    GanttView.prototype.createMonthsScale = function (parent) {
        var currentDate = new Date();
        currentDate.setTime(this.range.start.getTime());
        var x = 0;
        var index = 0;
        while (currentDate.getTime() < this.range.end.getTime()) {
            var dayInMonthCount = Utils_1.DateUtils.getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
            var dayCount = dayInMonthCount - currentDate.getDate() + 1;
            var nextDate = new Date();
            nextDate.setTime(currentDate.getTime() + Math.min(dayCount * Utils_1.DateUtils.msPerDay, this.range.end.getTime() - currentDate.getTime()));
            var width = this.gridLayoutCalculator.getWidthByDateRange(currentDate, nextDate);
            var scaleItemInfo = new GridElementInfo_1.GridElementInfo("dx-gantt-si", new point_1.Point(x, undefined), new size_1.Size(width, this.etalonSizeValues.scaleItemHeight));
            var scaleItemElement = this.createElement(scaleItemInfo, null, parent);
            scaleItemElement.innerText = this.elementTextHelper.getScaleItemText(index, Enums_1.ViewType.Months);
            scaleItemElement.style.lineHeight = this.etalonSizeValues.scaleItemHeight + "px";
            var scaleBorderInfo = new GridElementInfo_1.GridElementInfo("dx-gantt-vb", new point_1.Point(x + width, undefined), new size_1.Size(0, this.etalonSizeValues.scaleItemHeight));
            this.createElement(scaleBorderInfo, null, parent);
            x += width;
            index++;
            currentDate = nextDate;
        }
    };
    GanttView.prototype.updateView = function () {
        this.onBeginUpdateView();
        this.timeScaleContainer.scrollLeft = this.taskAreaContainerScrollLeft;
        this.processScroll(false);
        this.processScroll(true);
        this.ganttOwner.onGanttScroll(this.taskAreaContainerScrollTop);
        this.onEndUpdateView();
    };
    GanttView.prototype.onBeginUpdateView = function () {
        this[GanttView.taskAreaScrollTopKey] = this.taskAreaContainer.scrollTop;
        this[GanttView.taskAreaScrollLeftKey] = this.taskAreaContainer.scrollLeft;
    };
    GanttView.prototype.onEndUpdateView = function () {
        delete this[GanttView.taskAreaScrollTopKey];
        delete this[GanttView.taskAreaScrollLeftKey];
        delete this[GanttView.taskTextHeightKey];
    };
    GanttView.prototype.getTaskTextHeight = function (textElement) {
        textElement.innerText = "WWW";
        var height = getComputedStyle(textElement).height;
        textElement.innerText = "";
        return height;
    };
    Object.defineProperty(GanttView.prototype, "taskAreaContainerScrollTop", {
        get: function () {
            var _a;
            return (_a = this[GanttView.taskAreaScrollTopKey]) !== null && _a !== void 0 ? _a : this.taskAreaContainer.scrollTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttView.prototype, "taskAreaContainerScrollLeft", {
        get: function () {
            var _a;
            return (_a = this[GanttView.taskAreaScrollLeftKey]) !== null && _a !== void 0 ? _a : this.taskAreaContainer.scrollLeft;
        },
        enumerable: false,
        configurable: true
    });
    GanttView.prototype.processScroll = function (isVertical) {
        this.taskEditController.tooltip.hide();
        this.recreateTaskAreaBordersAndTaskElements(isVertical);
        if (isVertical)
            this.recreateConnectorLineElements();
        else {
            this.recreateNoWorkingIntervalElements();
            this.recreateStripLines();
            this.recreateScalesElements();
        }
    };
    GanttView.prototype.recreateTaskAreaBordersAndTaskElements = function (isVertical) {
        var _this = this;
        var scrollPos = isVertical ? this.taskAreaContainerScrollTop : this.taskAreaContainerScrollLeft;
        var newRenderedIndices = this.gridLayoutCalculator.getRenderedRowColumnIndices(scrollPos, isVertical);
        var renderedIndices = isVertical ? this.renderedRowIndices : this.renderedColIndices;
        this.recreateElements(renderedIndices, newRenderedIndices, function (index) { _this.removeTaskAreaBorderAndTaskElement(index, isVertical); }, function (index) { _this.createTaskAreaBorderAndTaskElement(index, isVertical); });
        if (isVertical)
            this.renderedRowIndices = newRenderedIndices;
        else
            this.renderedColIndices = newRenderedIndices;
        this.gridLayoutCalculator.createTileToConnectorLinesMap();
    };
    GanttView.prototype.recreateNoWorkingIntervalElements = function () {
        var _this = this;
        var newRenderedNoWorkingIntervals = this.gridLayoutCalculator.getRenderedNoWorkingIntervals(this.taskAreaContainerScrollLeft);
        this.recreateElements(this.renderedNoWorkingIntervals, newRenderedNoWorkingIntervals, function (info) { _this.removeNoWorkingIntervalElement(info); }, function (info) { _this.createNoWorkingIntervalElement(info); });
        this.renderedNoWorkingIntervals = newRenderedNoWorkingIntervals;
    };
    GanttView.prototype.recreateStripLines = function () {
        var _this = this;
        var newRenderedStripLines = this.gridLayoutCalculator.getRenderedStripLines(this.settings.stripLines);
        this.recreateElements(this.renderedStripLines, newRenderedStripLines, function (info) { _this.removeElement(info, null, _this.taskArea, _this.stripLinesMap); }, function (info) { return _this.createElement(info, null, _this.taskArea, _this.stripLinesMap); });
        this.renderedStripLines = newRenderedStripLines;
    };
    GanttView.prototype.recreateConnectorLineElements = function () {
        var _this = this;
        var newRenderedConnectorLines = this.gridLayoutCalculator.getRenderedConnectorLines(this.taskAreaContainerScrollTop);
        this.recreateElements(this.renderedConnectorLines, newRenderedConnectorLines, function (info) { _this.removeConnectorLineElement(info); }, function (info) { _this.createConnectorLineElement(info); });
        this.renderedConnectorLines = newRenderedConnectorLines;
    };
    GanttView.prototype.recreateScalesElements = function () {
        this.recreateScaleElements(this.settings.viewType, 0);
        if (this.settings.viewType != Enums_1.ViewType.Weeks)
            this.recreateScaleElements(Utils_1.DateUtils.ViewTypeToScaleMap[this.settings.viewType], 1);
    };
    GanttView.prototype.recreateScaleElements = function (scaleType, scaleIndex) {
        var _this = this;
        var newRenderedIndices = this.gridLayoutCalculator.getRenderedScaleItemIndices(scaleType, this.renderedColIndices);
        var renderedIndices = this.renderedScaleItemIndices[scaleType - this.settings.viewType] || [];
        this.recreateElements(renderedIndices, newRenderedIndices, function (index) { _this.removeScaleElementAndBorder(index, scaleIndex); }, function (index) { _this.createScaleElementAndBorder(index, scaleIndex, scaleType); });
        this.renderedScaleItemIndices[scaleType - this.settings.viewType] = newRenderedIndices;
    };
    GanttView.prototype.recreateElements = function (oldRenderedElementsInfo, newRenderedelementsInfo, removeAction, createAction) {
        oldRenderedElementsInfo
            .filter(function (info) { return newRenderedelementsInfo.indexOf(info) === -1; })
            .forEach(function (info) { removeAction(info); });
        newRenderedelementsInfo
            .filter(function (info) { return oldRenderedElementsInfo.indexOf(info) === -1; })
            .forEach(function (info) { createAction(info); });
    };
    GanttView.prototype.recreateTaskElement = function (index) {
        var _this = this;
        var isVisible = this.renderedRowIndices.filter(function (r) { return r === index; }).length > 0;
        var task = this.getTask(index);
        if (!task)
            return;
        if (isVisible) {
            this.removeTaskElement(index);
            this.createTaskElement(index, this.settings.taskContentTemplate);
        }
        var dependencies = this.getTaskDependencies(task.id);
        if (dependencies.length)
            dependencies.forEach(function (d) { return _this.recreateConnectorLineElement(d.internalId); });
    };
    GanttView.prototype.recreateConnectorLineElement = function (dependencyId, forceRender) {
        var _this = this;
        if (forceRender === void 0) { forceRender = false; }
        var infos = [];
        this.renderedConnectorLines = this.renderedConnectorLines.filter(function (info) {
            if (info.attr["dependency-id"] != dependencyId)
                return true;
            infos.push(info);
            return false;
        });
        var isRendered = infos.length > 0;
        infos.forEach(function (info) { _this.removeConnectorLineElement(info); });
        infos = this.gridLayoutCalculator.updateTileToConnectorLinesMap(dependencyId);
        if (isRendered || forceRender)
            infos.forEach(function (info) { _this.createConnectorLineElement(info); _this.renderedConnectorLines.push(info); });
    };
    GanttView.prototype.allowTaskAreaBorders = function (isVerticalScroll) {
        return isVerticalScroll ? this.settings.areHorizontalBordersEnabled : this.settings.areVerticalBordersEnabled;
    };
    GanttView.prototype.createTaskAreaBorderAndTaskElement = function (index, isVerticalScroll) {
        if (this.allowTaskAreaBorders(isVerticalScroll))
            this.createTaskAreaBorder(index, !isVerticalScroll);
        if (isVerticalScroll)
            this.createTaskElement(index, this.settings.taskContentTemplate);
    };
    GanttView.prototype.removeTaskAreaBorderAndTaskElement = function (index, isVerticalScroll) {
        if (this.allowTaskAreaBorders(isVerticalScroll))
            this.removeTaskAreaBorder(index, !isVerticalScroll);
        if (isVerticalScroll)
            this.removeTaskElement(index);
    };
    GanttView.prototype.getTaskAreaBordersDictionary = function (isVertical) {
        return isVertical ? this.vertTaskAreaBorders : this.horTaskAreaBorders;
    };
    GanttView.prototype.createTaskAreaBorder = function (index, isVertical) {
        var info = this.gridLayoutCalculator.getTaskAreaBorderInfo(index, isVertical);
        this.createElement(info, index, this.taskArea, this.getTaskAreaBordersDictionary(isVertical));
    };
    GanttView.prototype.removeTaskAreaBorder = function (index, isVertical) {
        this.removeElement(null, index, this.taskArea, this.getTaskAreaBordersDictionary(isVertical));
    };
    GanttView.prototype.createScaleElementAndBorder = function (index, scaleIndex, scaleType) {
        this.createScaleElement(index, scaleIndex, scaleType);
        this.createScaleBorder(index, scaleIndex, scaleType);
    };
    GanttView.prototype.createScaleElement = function (index, scaleIndex, scaleType) {
        var info = this.gridLayoutCalculator.getScaleElementInfo(index, scaleType);
        var scaleElement = this.createScaleElementCore(index, info, scaleIndex, this.scaleElements);
        scaleElement.innerText = this.elementTextHelper.getScaleItemText(index, scaleType);
        scaleElement.style.lineHeight = this.etalonSizeValues.scaleItemHeight + "px";
        if (scaleType === Enums_1.ViewType.Quarter)
            scaleElement.style.padding = "0";
    };
    GanttView.prototype.getScaleItemText = function (index, scale) {
        return this.elementTextHelper.getScaleItemText(index, scale);
    };
    GanttView.prototype.getTaskText = function (index) {
        return this.elementTextHelper.getTaskText(index);
    };
    GanttView.prototype.rowHasChildren = function (index) {
        var item = this.getViewItem(index);
        return (item === null || item === void 0 ? void 0 : item.children.length) > 0;
    };
    GanttView.prototype.rowHasSelection = function (index) {
        var item = this.getViewItem(index);
        return item === null || item === void 0 ? void 0 : item.selected;
    };
    GanttView.prototype.getAllVisibleTaskIndices = function () { return this.viewModel.getAllVisibleTaskIndices(); };
    GanttView.prototype.getVisibleDependencyKeysByTaskRange = function (indices) {
        var model = this.viewModel;
        var taskKeys = indices.map(function (i) { return model.tasks.items[i].internalId; });
        var dependencies = model.dependencies.items;
        return dependencies.filter(function (d) { return taskKeys.indexOf(d.successorId) > -1 || taskKeys.indexOf(d.predecessorId) > -1; }).map(function (d) { return d.internalId; });
    };
    GanttView.prototype.getTreeListTableStyle = function () {
        var _a, _b;
        return (_b = (_a = this.ganttOwner).getTreeListTableStyle) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    GanttView.prototype.getTreeListColCount = function () {
        var _a, _b;
        return (_b = (_a = this.ganttOwner).getTreeListColCount) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    GanttView.prototype.getTreeListHeaderInfo = function (colIndex) {
        var _a, _b;
        return (_b = (_a = this.ganttOwner).getTreeListHeaderInfo) === null || _b === void 0 ? void 0 : _b.call(_a, colIndex);
    };
    GanttView.prototype.getTreeListCellInfo = function (rowIndex, colIndex) {
        var _a, _b;
        return (_b = (_a = this.ganttOwner).getTreeListCellInfo) === null || _b === void 0 ? void 0 : _b.call(_a, rowIndex, colIndex);
    };
    GanttView.prototype.exportToPdf = function (options) {
        var _a;
        (_a = options["docCreateMethod"]) !== null && _a !== void 0 ? _a : (options["docCreateMethod"] = this.getDefaultPdfDocCreateMethod());
        var exporter = new Exporter_1.PdfGanttExporter(new Calculator_1.GanttExportCalculator(this, options));
        return exporter.export();
    };
    GanttView.prototype.getDefaultPdfDocCreateMethod = function () {
        var _a;
        return (_a = window["jspdf"]) === null || _a === void 0 ? void 0 : _a["jsPDF"];
    };
    GanttView.prototype.createScaleBorder = function (index, scaleIndex, scaleType) {
        var info = this.gridLayoutCalculator.getScaleBorderInfo(index, scaleType);
        this.createScaleElementCore(index, info, scaleIndex, this.scaleBorders);
    };
    GanttView.prototype.createScaleElementCore = function (index, info, scaleIndex, dictionary) {
        if (!dictionary[scaleIndex])
            dictionary[scaleIndex] = [];
        return this.createElement(info, index, this.timeScaleAreas[scaleIndex], dictionary[scaleIndex]);
    };
    GanttView.prototype.removeScaleElementAndBorder = function (index, scaleIndex) {
        this.removeElement(null, index, this.timeScaleAreas[scaleIndex], this.scaleElements[scaleIndex]);
        this.removeElement(null, index, this.timeScaleAreas[scaleIndex], this.scaleBorders[scaleIndex]);
    };
    GanttView.prototype.createCustomTaskWrapperElement = function (index, taskWrapperInfo) {
        this.createElement(taskWrapperInfo, index, this.taskArea, this.taskElements);
    };
    GanttView.prototype.createCustomTaskVisualElement = function (index, taskElementInfo) {
        var taskElement = this.createElement(taskElementInfo, index, this.taskElements[index]);
        return taskElement;
    };
    GanttView.prototype.createCustomTaskInformation = function (index) {
        var task = this.getTask(index);
        var taskWrapperInfo = this.gridLayoutCalculator.getTaskWrapperElementInfo(index);
        var taskElementInfo = this.gridLayoutCalculator.getTaskElementInfo(index, this.settings.taskTitlePosition !== Enums_1.TaskTitlePosition.Inside);
        this.createCustomTaskWrapperElement(index, taskWrapperInfo);
        var taskVisualElement = this.createCustomTaskVisualElement(index, taskElementInfo);
        this.createTaskTextElement(index, taskVisualElement);
        var taskResources = this.getTaskResources(task.id);
        var taskInformation = {
            cellSize: this.tickSize,
            isMilestone: task.isMilestone(),
            taskData: task,
            taskHTML: taskVisualElement,
            taskPosition: taskWrapperInfo.position,
            taskResources: taskResources,
            taskSize: taskElementInfo.size,
        };
        return taskInformation;
    };
    GanttView.prototype.createCustomTaskElement = function (index, taskTemplateFunction) {
        var _this = this;
        var viewItem = this.getViewItem(index);
        viewItem.isCustom = false;
        var taskTemplateContainer = document.createElement("DIV");
        var taskInformation = this.createCustomTaskInformation(index);
        viewItem.isCustom = true;
        taskTemplateFunction(taskTemplateContainer, taskInformation, function (taskTemplateContainer, taskIndex) { _this.drawCustomTask(taskTemplateContainer, taskIndex); }, index);
    };
    GanttView.prototype.drawCustomTask = function (taskTemplateContainer, taskIndex) {
        var _this = this;
        var viewItem = this.getViewItem(taskIndex);
        viewItem.visible = !!taskTemplateContainer.innerHTML;
        this.taskElements[taskIndex].innerHTML = taskTemplateContainer.innerHTML;
        viewItem.size.height = this.taskElements[taskIndex].offsetHeight;
        viewItem.size.width = this.taskElements[taskIndex].offsetWidth;
        this.destroyTemplate(this.taskElements[taskIndex]);
        this.removeTaskElement(taskIndex);
        if (viewItem.visible) {
            var taskWrapperInfo = this.gridLayoutCalculator.getTaskWrapperElementInfo(taskIndex);
            this.createCustomTaskWrapperElement(taskIndex, taskWrapperInfo);
            this.taskElements[taskIndex].appendChild(taskTemplateContainer);
            this.taskAreaManager.attachEventsOnTask(this.taskElements[taskIndex]);
        }
        else {
            var taskDependencies = this.getTaskDependencies(viewItem.task.id);
            if (taskDependencies.length) {
                this.addInvalidTaskDependencies(taskDependencies);
                taskDependencies.forEach(function (d) { return _this.recreateConnectorLineElement(d.internalId, true); });
            }
        }
    };
    GanttView.prototype.createDefaultTaskElement = function (index) {
        var viewItem = this.getViewItem(index);
        this.createTaskWrapperElement(index);
        if (this.settings.taskTitlePosition === Enums_1.TaskTitlePosition.Outside)
            this.createTaskTextElement(index, this.taskElements[index]);
        var taskVisualElement = this.createTaskVisualElement(index);
        if (!viewItem.task.isMilestone()) {
            if (this.settings.taskTitlePosition === Enums_1.TaskTitlePosition.Inside)
                this.createTaskTextElement(index, taskVisualElement);
            this.createTaskProgressElement(index, taskVisualElement);
        }
        if (this.settings.showResources) {
            this.createResourcesWrapperElement(index);
            this.createResources(index);
        }
    };
    Object.defineProperty(GanttView.prototype, "fakeTaskWrapper", {
        get: function () {
            var _a;
            (_a = this._fakeTaskWrapper) !== null && _a !== void 0 ? _a : (this._fakeTaskWrapper = this.createFakeTaskWrapper());
            return this._fakeTaskWrapper;
        },
        enumerable: false,
        configurable: true
    });
    GanttView.prototype.createFakeTaskWrapper = function () {
        var _a, _b;
        var index = (_b = (_a = this.viewModel.items.filter(function (v) { return v.task && !v.task.isMilestone; })[0]) === null || _a === void 0 ? void 0 : _a.visibleIndex) !== null && _b !== void 0 ? _b : 0;
        var calc = this.gridLayoutCalculator;
        var fakeWrapper = this.createElement(calc.getTaskWrapperElementInfo(index), null, this.taskArea);
        var taskVisualElement = this.createElement(calc.getTaskElementInfo(index), null, fakeWrapper);
        this.createTaskTextElement(index, taskVisualElement);
        this.createTaskProgressElement(index, taskVisualElement);
        fakeWrapper.style.display = "none";
        return fakeWrapper;
    };
    GanttView.prototype.createTaskElement = function (index, taskTemplateFunction) {
        var viewItem = this.getViewItem(index);
        if (this.isHighlightRowElementAllowed(index))
            this.createHighlightRowElement(index);
        if (taskTemplateFunction)
            this.createCustomTaskElement(index, taskTemplateFunction);
        if (viewItem.selected)
            this.createTaskSelectionElement(index);
        if (!viewItem.task.isValid() || !viewItem.visible) {
            var taskDependencies = this.getTaskDependencies(viewItem.task.id);
            this.addInvalidTaskDependencies(taskDependencies);
            return;
        }
        if (!viewItem.isCustom)
            this.createDefaultTaskElement(index);
    };
    GanttView.prototype.getTaskDependencies = function (taskId) {
        return this.viewModel.dependencies.items.filter(function (d) { return d.predecessorId == taskId || d.successorId == taskId; });
    };
    GanttView.prototype.addInvalidTaskDependencies = function (taskDependencies) {
        this.invalidTaskDependencies = this.invalidTaskDependencies.concat(taskDependencies);
    };
    GanttView.prototype.isHighlightRowElementAllowed = function (index) {
        var viewItem = this.getViewItem(index);
        return index % 2 !== 0 && this.settings.areAlternateRowsEnabled || viewItem.children.length > 0;
    };
    GanttView.prototype.createResourcesWrapperElement = function (index) {
        var resourcesWrapperElementInfo = this.gridLayoutCalculator.getTaskResourcesWrapperElementInfo(index);
        this.createElement(resourcesWrapperElementInfo, index, this.taskArea, this.resourcesElements);
        this.resourcesElements[index].style.display = this.elementTextHelper.getTaskVisibility(index) ? "" : "none";
    };
    GanttView.prototype.createResources = function (index) {
        var viewItem = this.getViewItem(index);
        var resources = viewItem.resources.items;
        for (var i = 0; i < resources.length; i++)
            this.createResourceElement(index, resources[i]);
    };
    GanttView.prototype.createTaskWrapperElement = function (index) {
        var taskWrapperInfo = this.gridLayoutCalculator.getTaskWrapperElementInfo(index);
        this.createElement(taskWrapperInfo, index, this.taskArea, this.taskElements);
        this.taskElements[index].style.display = this.elementTextHelper.getTaskVisibility(index) ? "" : "none";
    };
    GanttView.prototype.createTaskVisualElement = function (index) {
        var taskElementInfo = this.gridLayoutCalculator.getTaskElementInfo(index, this.settings.taskTitlePosition !== Enums_1.TaskTitlePosition.Inside);
        var taskElement = this.createElement(taskElementInfo, index, this.taskElements[index]);
        this.taskAreaManager.attachEventsOnTask(taskElement);
        return taskElement;
    };
    GanttView.prototype.createTaskProgressElement = function (index, parent) {
        var taskProgressInfo = this.gridLayoutCalculator.getTaskProgressElementInfo(index);
        this.createElement(taskProgressInfo, index, parent);
    };
    GanttView.prototype.createTaskTextElement = function (index, parent) {
        var _a;
        var _b;
        var taskTextInfo = this.gridLayoutCalculator.getTaskTextElementInfo(index, this.settings.taskTitlePosition == Enums_1.TaskTitlePosition.Inside);
        var taskTextElement = this.createElement(taskTextInfo, index, parent);
        var text = this.elementTextHelper.getTaskText(index);
        if (!text) {
            (_a = this[_b = GanttView.taskTextHeightKey]) !== null && _a !== void 0 ? _a : (this[_b] = this.getTaskTextHeight(taskTextElement));
            taskTextElement.style.height = this[GanttView.taskTextHeightKey];
        }
        taskTextElement.innerText = text;
    };
    GanttView.prototype.createResourceElement = function (index, resource) {
        var resourceElementInfo = this.gridLayoutCalculator.getTaskResourceElementInfo();
        if (resource.color)
            resourceElementInfo.style.backgroundColor = resource.color;
        var resElement = this.createElement(resourceElementInfo, index, this.resourcesElements[index]);
        resElement.innerText = resource.text;
    };
    GanttView.prototype.createTaskSelectionElement = function (index) {
        var selectionInfo = this.gridLayoutCalculator.getSelectionElementInfo(index);
        if (this.taskAreaContainer.isExternal && !this.settings.areHorizontalBordersEnabled)
            selectionInfo.size.height++;
        this.createElement(selectionInfo, index, this.taskArea, this.selectionElements);
    };
    GanttView.prototype.createHighlightRowElement = function (index) {
        var hlRowInfo = this.gridLayoutCalculator.getHighlightRowInfo(index);
        this.createElement(hlRowInfo, index, this.taskArea, this.hlRowElements);
    };
    GanttView.prototype.removeTaskElement = function (index) {
        var task = this.getTask(index);
        this.invalidTaskDependencies = this.invalidTaskDependencies.filter(function (d) { return d.predecessorId != task.id || d.successorId != task.id; });
        this.taskAreaManager.detachEventsOnTask(this.taskElements[index]);
        this.removeElement(null, index, this.taskArea, this.taskElements);
        this.removeElement(null, index, this.taskArea, this.resourcesElements);
        this.removeElement(null, index, this.taskArea, this.selectionElements);
        if (this.isHighlightRowElementAllowed(index))
            this.removeElement(null, index, this.taskArea, this.hlRowElements);
    };
    GanttView.prototype.createConnectorLineElement = function (info) {
        var dependencyId = info.attr["dependency-id"];
        var isInvalid = this.invalidTaskDependencies.some(function (d) { return d.id == dependencyId; });
        if (isInvalid)
            return;
        if (this.taskEditController.isDependencySelected(dependencyId))
            info.className = info.className + " active";
        return this.createElement(info, null, this.taskArea, this.connectorLinesToElementsMap);
    };
    GanttView.prototype.removeConnectorLineElement = function (info) {
        this.removeElement(info, null, this.taskArea, this.connectorLinesToElementsMap);
    };
    GanttView.prototype.createNoWorkingIntervalElement = function (info) {
        return this.createElement(info, null, this.taskArea, this.noWorkingIntervalsToElementsMap);
    };
    GanttView.prototype.removeNoWorkingIntervalElement = function (info) {
        this.removeElement(info, null, this.taskArea, this.noWorkingIntervalsToElementsMap);
    };
    GanttView.prototype.createElement = function (info, index, parent, dictionary) {
        var element = document.createElement("DIV");
        info.assignToElement(element);
        parent.appendChild(element);
        if (dictionary)
            if (dictionary instanceof Array && index !== null)
                dictionary[index] = element;
            else
                dictionary[info.id] = element;
        for (var key in info.attr)
            if (Object.prototype.hasOwnProperty.call(info.attr, key))
                element.setAttribute(key, info.attr[key]);
        for (var key in info.style)
            if (Object.prototype.hasOwnProperty.call(info.style, key))
                element.style[key] = info.style[key];
        return element;
    };
    GanttView.prototype.removeElement = function (info, index, parent, dictionary) {
        var element;
        if (dictionary instanceof Array && index !== null) {
            element = dictionary[index];
            delete dictionary[index];
        }
        else {
            element = dictionary[info.id];
            delete dictionary[info.id];
        }
        if (element && element.parentNode == parent)
            parent.removeChild(element);
    };
    GanttView.prototype.calculateAutoViewType = function (startDate, endDate) {
        var diffInHours = (endDate.getTime() - startDate.getTime()) / (1000 * 3600);
        if (diffInHours > 24 * 365)
            return Enums_1.ViewType.Years;
        if (diffInHours > 24 * 30)
            return Enums_1.ViewType.Months;
        if (diffInHours > 24 * 7)
            return Enums_1.ViewType.Weeks;
        if (diffInHours > 24)
            return Enums_1.ViewType.Days;
        if (diffInHours > 6)
            return Enums_1.ViewType.SixHours;
        if (diffInHours > 1)
            return Enums_1.ViewType.Hours;
        return Enums_1.ViewType.TenMinutes;
    };
    GanttView.prototype.changeTaskExpanded = function (publicId, expanded) {
        var task = this.getTaskByPublicId(publicId);
        if (task)
            this.viewModel.changeTaskExpanded(task.internalId, expanded);
    };
    GanttView.prototype.expandTask = function (id) { this.viewModel.changeTaskExpanded(id, true); };
    GanttView.prototype.collapseTask = function (id) { this.viewModel.changeTaskExpanded(id, false); };
    GanttView.prototype.showTask = function (id) { this.viewModel.changeTaskVisibility(id, true); };
    GanttView.prototype.hideTask = function (id) { this.viewModel.changeTaskVisibility(id, false); };
    GanttView.prototype.getTaskVisibility = function (id) { return this.viewModel.getTaskVisibility(id); };
    GanttView.prototype.unselectCurrentSelectedTask = function () { this.unselectTask(this.currentSelectedTaskID); };
    GanttView.prototype.getTaskSelected = function (id) { return this.viewModel.getTaskSelected(id); };
    GanttView.prototype.setViewType = function (viewType, autoPositioning) {
        if (autoPositioning === void 0) { autoPositioning = true; }
        if (viewType == undefined)
            viewType = this.calculateAutoViewType(this.dataRange.start, this.dataRange.end);
        if (this.settings.viewType !== viewType) {
            this.settings.viewType = viewType;
            this.updateTickSizeWidth();
            this.resetAndUpdate();
            if (autoPositioning)
                this.scrollLeftByViewType();
            if (this.ganttOwner.UpdateGanttViewType)
                this.ganttOwner.UpdateGanttViewType(viewType);
        }
    };
    GanttView.prototype.setTaskTitlePosition = function (taskTitlePosition) {
        if (this.settings.taskTitlePosition !== taskTitlePosition) {
            this.settings.taskTitlePosition = taskTitlePosition;
            this.resetAndUpdate();
        }
    };
    GanttView.prototype.setShowResources = function (showResources) {
        if (this.settings.showResources !== showResources) {
            this.settings.showResources = showResources;
            this.resetAndUpdate();
        }
    };
    GanttView.prototype.setFirstDayOfWeek = function (firstDayOfWeek) {
        if (this.settings.firstDayOfWeek !== firstDayOfWeek) {
            this.settings.firstDayOfWeek = firstDayOfWeek;
            this.resetAndUpdate();
        }
    };
    GanttView.prototype.loadOptionsFromGanttOwner = function () {
        this.tickSize.height = this.ganttOwner.getRowHeight();
        var tasksData = this.ganttOwner.getGanttTasksData();
        this.dataRange = new DateRange_1.DateRange(this.getGanttViewStartDate(tasksData), this.getGanttViewEndDate(tasksData));
        if (this.settings.viewType == undefined)
            this.settings.viewType = this.calculateAutoViewType(this.dataRange.start, this.dataRange.end);
        this.updateTickSizeWidth();
        this.range = this.getDateRange(this.dataRange.start, this.dataRange.end);
        this.dispatcher = new ModelChangesDispatcher_1.ModelChangesDispatcher();
        var modelChangesListener = this.ganttOwner.getModelChangesListener();
        if (modelChangesListener)
            this.dispatcher.onModelChanged.add(modelChangesListener);
        this.viewModel = new VisualModel_1.ViewVisualModel(this, tasksData, this.ganttOwner.getGanttDependenciesData(), this.ganttOwner.getGanttResourcesData(), this.ganttOwner.getGanttResourceAssignmentsData(), this.range, this.ganttOwner.getGanttWorkTimeRules());
        this.modelManipulator = new ModelManipulator_1.ModelManipulator(this.viewModel, this.dispatcher);
    };
    GanttView.prototype.resetAndUpdate = function () {
        this.reset();
        this.range = this.getDateRange(this.dataRange.start, this.dataRange.end);
        this.viewModel.updateRange(this.range);
        this.setupHelpers();
        this.createTimeScaleAreas();
        this.setSizeForTaskArea();
        if (browser_1.Browser.IE)
            this.taskEditController.createElements();
        this.updateView();
    };
    GanttView.prototype.cleanMarkup = function () {
        this.taskAreaManager.detachEvents();
        this.taskEditController.detachEvents();
        window.removeEventListener("resize", this.onWindowResizelHandler);
        this.reset();
    };
    GanttView.prototype.updateRowHeights = function (height) {
        if (this.tickSize.height !== height) {
            this.tickSize.height = height;
            var leftPosition = this.taskAreaContainer.scrollLeft;
            this.resetAndUpdate();
            this.taskAreaContainer.scrollLeft = leftPosition;
        }
    };
    GanttView.prototype.selectTask = function (id) {
        this.selectDependency(null);
        this.viewModel.changeTaskSelected(id, true);
        this.currentSelectedTaskID = id;
        this.updateBarManager();
    };
    GanttView.prototype.unselectTask = function (id) {
        this.viewModel.changeTaskSelected(id, false);
        this.updateBarManager();
    };
    GanttView.prototype.selectTaskById = function (publicId) {
        this.unselectCurrentSelectedTask();
        var task = this.getTaskByPublicId(publicId);
        if (task)
            this.selectTask(task.internalId);
    };
    GanttView.prototype.selectDependency = function (id) {
        this.taskEditController.selectDependency(id);
        this.gridLayoutCalculator.createTileToConnectorLinesMap();
        this.recreateConnectorLineElements();
    };
    GanttView.prototype.getTaskAreaContainer = function () {
        return this.taskAreaContainer;
    };
    GanttView.prototype.setWidth = function (value) {
        this.mainElement.style.width = value + "px";
    };
    GanttView.prototype.setHeight = function (value) {
        this.mainElement.style.height = value + "px";
    };
    GanttView.prototype.setAllowSelection = function (value) {
        this.settings.allowSelectTask = value;
    };
    GanttView.prototype.setEditingSettings = function (value) {
        this.settings.editing = value;
        this.updateBarManager();
    };
    GanttView.prototype.setValidationSettings = function (value) {
        this.settings.validation = value;
    };
    GanttView.prototype.setRowLinesVisible = function (value) {
        this.settings.areHorizontalBordersEnabled = value;
        this.prepareTaskAreaContainer();
        this.resetAndUpdate();
    };
    GanttView.prototype.setStripLines = function (stripLines) {
        this.settings.stripLines = Settings_1.StripLineSettings.parse(stripLines);
        this.clearStripLinesUpdater();
        this.initializeStripLinesUpdater();
        this.recreateStripLines();
    };
    GanttView.prototype.deleteTask = function (key) {
        var task = this.getTaskByPublicId(key.toString());
        if (task)
            this.commandManager.removeTaskCommand.execute(task.internalId);
    };
    GanttView.prototype.insertTask = function (data) {
        if (data) {
            var parentId = data.parentId != null ? String(data.parentId) : null;
            var parent_1 = this.getTaskByPublicId(parentId);
            var start = typeof data.start === "string" ? new Date(data.start) : data.start;
            var end = typeof data.end === "string" ? new Date(data.end) : data.end;
            var taskData = {
                parentId: parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.internalId,
                title: data.title,
                start: start,
                end: end,
                progress: parseInt(data.progress) || 0,
                color: data.color
            };
            if (this.commandManager.createTaskCommand.execute(taskData))
                return this.getLastInsertedTaskId();
        }
        return "";
    };
    GanttView.prototype.updateTask = function (key, data) {
        var task = this.getTaskByPublicId(key.toString());
        if (task && data)
            this.commandManager.updateTaskCommand.execute(task.internalId, data);
    };
    GanttView.prototype.getTaskData = function (key) {
        var task = this.getTaskByPublicId(key.toString());
        if (task)
            return this.viewModel.getTaskObjectForDataSource(task);
    };
    GanttView.prototype.insertDependency = function (data) {
        if (data) {
            var predecessorId = String(data.predecessorId);
            var successorId = String(data.successorId);
            var type = data.type;
            this.commandManager.createDependencyCommand.execute(predecessorId, successorId, type);
        }
    };
    GanttView.prototype.deleteDependency = function (key) {
        var internalKey = this.viewModel.convertPublicToInternalKey("dependency", key);
        if (common_1.isDefined(internalKey))
            this.commandManager.removeDependencyCommand.execute(internalKey);
    };
    GanttView.prototype.getDependencyData = function (key) {
        return this.viewModel.getDependencyObjectForDataSource(key);
    };
    GanttView.prototype.insertResource = function (data, taskKeys) {
        var _this = this;
        if (data) {
            var callback = function (id) {
                if (common_1.isDefined(taskKeys))
                    for (var i = 0; i < taskKeys.length; i++)
                        _this.assignResourceToTask(id, taskKeys[i]);
            };
            this.commandManager.createResourceCommand.execute(String(data.text), data.color && String(data.color), callback);
        }
    };
    GanttView.prototype.deleteResource = function (key) {
        var internalKey = this.viewModel.convertPublicToInternalKey("resource", key);
        if (common_1.isDefined(internalKey))
            this.commandManager.removeResourceCommand.execute(internalKey);
    };
    GanttView.prototype.assignResourceToTask = function (resourceKey, taskKey) {
        var resourceInternalKey = this.viewModel.convertPublicToInternalKey("resource", resourceKey);
        var taskInternalKey = this.viewModel.convertPublicToInternalKey("task", taskKey);
        if (common_1.isDefined(resourceInternalKey) && common_1.isDefined(taskInternalKey))
            this.commandManager.assignResourceCommand.execute(resourceInternalKey, taskInternalKey);
    };
    GanttView.prototype.unassignResourceFromTask = function (resourceKey, taskKey) {
        var assignment = this.viewModel.findAssignment(resourceKey, taskKey);
        if (assignment)
            this.commandManager.deassignResourceCommand.execute(assignment.internalId);
    };
    GanttView.prototype.getResourceData = function (key) {
        return this.viewModel.getResourceObjectForDataSource(key);
    };
    GanttView.prototype.getResourceAssignmentData = function (key) {
        return this.viewModel.getResourceAssignmentObjectForDataSource(key);
    };
    GanttView.prototype.getTaskResources = function (key) {
        var model = this.viewModel;
        var task = model.getItemByPublicId("task", key);
        return task && model.getAssignedResources(task).items;
    };
    GanttView.prototype.getVisibleTaskKeys = function () { return this.viewModel.getVisibleTasks().map(function (t) { return t.id; }); };
    GanttView.prototype.getVisibleDependencyKeys = function () { return this.viewModel.getVisibleDependencies().map(function (d) { return d.id; }); };
    GanttView.prototype.getVisibleResourceKeys = function () { return this.viewModel.getVisibleResources().map(function (r) { return r.id; }); };
    GanttView.prototype.getVisibleResourceAssignmentKeys = function () { return this.viewModel.getVisibleResourceAssignments().map(function (a) { return a.id; }); };
    GanttView.prototype.setTaskValue = function (id, fieldName, newValue) {
        var manager = this.commandManager;
        var task = this.getTaskByPublicId(id);
        if (task) {
            if (fieldName === "title") {
                var checkedNewValue = newValue ? newValue : "";
                return manager.changeTaskTitleCommand.execute(task.internalId, checkedNewValue);
            }
            if (fieldName === "progress") {
                var newProgress = Math.max(newValue, 0);
                newProgress = Math.min(newValue, 100);
                return manager.changeTaskProgressCommand.execute(task.internalId, newProgress);
            }
            if (fieldName === "start")
                return manager.changeTaskStartCommand.execute(task.internalId, DateTimeUtils_1.DateTimeUtils.getMinDate(newValue, task.end));
            if (fieldName === "end")
                return manager.changeTaskEndCommand.execute(task.internalId, DateTimeUtils_1.DateTimeUtils.getMaxDate(newValue, task.start));
        }
        return false;
    };
    GanttView.prototype.getLastInsertedTaskId = function () {
        var createTaskItems = this.history.historyItems.filter(function (i) { return i instanceof TaskHistoryItem_1.CreateTaskHistoryItem; });
        var lastItem = createTaskItems[createTaskItems.length - 1];
        return lastItem && lastItem.taskId;
    };
    GanttView.prototype.getLastInsertedResource = function () {
        var createTaskItems = this.history.historyItems.filter(function (i) { return i instanceof ResourceHistoryItem_1.CreateResourceHistoryItem; });
        var lastItem = createTaskItems[createTaskItems.length - 1];
        return lastItem && lastItem.resource;
    };
    GanttView.prototype.getTaskByPublicId = function (id) {
        return this.viewModel.tasks.getItemByPublicId(id);
    };
    GanttView.prototype.getPrevTask = function (taskId) {
        var item = this.viewModel.findItem(taskId);
        var parent = item.parent || this.viewModel.root;
        var index = parent.children.indexOf(item) - 1;
        return index > -1 ? item.parent.children[index].task : item.parent.task;
    };
    GanttView.prototype.updateCreatedTaskIdAfterServerUpdate = function (internalId, id) {
        var item = this.viewModel.findItem(internalId);
        var task = item && item.task;
        if (task)
            task.id = id;
    };
    GanttView.prototype.getTaskIdByInternalId = function (internalId) {
        var item = this.viewModel.findItem(internalId);
        var task = item && item.task;
        return task ? task.id : null;
    };
    GanttView.prototype.isTaskHasChildren = function (taskId) {
        var item = this.viewModel.findItem(taskId);
        return item && item.children.length > 0;
    };
    GanttView.prototype.requireFirstLoadParentAutoCalc = function () {
        var owner = this.ganttOwner;
        return owner.getRequireFirstLoadParentAutoCalc && owner.getRequireFirstLoadParentAutoCalc();
    };
    GanttView.prototype.updateOwnerInAutoParentMode = function () {
        if (this.viewModel.parentAutoCalc)
            this.dispatcher.notifyParentDataRecalculated(this.viewModel.getCurrentTaskData());
    };
    GanttView.prototype.getOwnerControlMainElement = function () {
        var owner = this.ganttOwner;
        return owner.getMainElement && owner.getMainElement();
    };
    GanttView.prototype.adjustOwnerControl = function () {
        var owner = this.ganttOwner;
        if (owner.adjustControl)
            owner.adjustControl();
    };
    GanttView.prototype.onBrowserWindowResize = function () {
        if (this.fullScreenModeHelper.isInFullScreenMode)
            this.fullScreenModeHelper.adjustControlInFullScreenMode();
        else
            this.adjustOwnerControl();
    };
    GanttView.prototype.applySettings = function (settings, preventViewUpdate) {
        if (preventViewUpdate === void 0) { preventViewUpdate = false; }
        var ganttSettings = Settings_1.Settings.parse(settings);
        var preventUpdate = preventViewUpdate || this.settings.equal(ganttSettings);
        this.settings = ganttSettings;
        if (!preventUpdate)
            this.resetAndUpdate();
    };
    GanttView.prototype.getDataUpdateErrorCallback = function () {
        var _this = this;
        var history = this.history;
        var currentHistoryItemInfo = history.getCurrentProcessingItemInfo();
        return function () {
            _this.dispatcher.lock();
            history.rollBackAndRemove(currentHistoryItemInfo);
            _this.dispatcher.unlock();
            _this.updateBarManager();
        };
    };
    GanttView.prototype.setTaskTooltipContentTemplate = function (taskTooltipContentTemplate) {
        this.settings.taskTooltipContentTemplate = taskTooltipContentTemplate;
    };
    GanttView.prototype.setTaskProgressTooltipContentTemplate = function (taskProgressTooltipContentTemplate) {
        this.settings.taskProgressTooltipContentTemplate = taskProgressTooltipContentTemplate;
    };
    GanttView.prototype.setTaskTimeTooltipContentTemplate = function (taskTimeTooltipContentTemplate) {
        this.settings.taskTimeTooltipContentTemplate = taskTimeTooltipContentTemplate;
    };
    GanttView.prototype.setTaskContentTemplate = function (taskContentTemplate) {
        this.settings.taskContentTemplate = taskContentTemplate;
    };
    GanttView.prototype.updateBarManager = function () {
        this.barManager.updateItemsState([]);
    };
    GanttView.prototype.onTaskClick = function (key, evt) {
        if (!this.ganttOwner.onTaskClick)
            return true;
        return this.ganttOwner.onTaskClick(key, evt);
    };
    GanttView.prototype.onTaskDblClick = function (key, evt) {
        if (!this.ganttOwner.onTaskDblClick)
            return true;
        return this.ganttOwner.onTaskDblClick(key, evt);
    };
    GanttView.prototype.getDateFormat = function (date) {
        return this.ganttOwner.getFormattedDateText ? this.ganttOwner.getFormattedDateText(date) : this.getDefaultDateFormat(date);
    };
    GanttView.prototype.getDefaultDateFormat = function (date) {
        return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    };
    GanttView.prototype.destroyTemplate = function (container) {
        this.ganttOwner.destroyTemplate ? this.ganttOwner.destroyTemplate(container) : container.innerHTML = "";
    };
    GanttView.prototype.showTaskEditDialog = function () {
        this.commandManager.showTaskEditDialog.execute();
    };
    GanttView.prototype.showResourcesDialog = function () {
        this.commandManager.showResourcesDialog.execute();
    };
    GanttView.prototype.getCommandByKey = function (key) {
        return this.commandManager.getCommand(key);
    };
    GanttView.cachedPrefix = "cached_";
    GanttView.taskAreaScrollTopKey = GanttView.cachedPrefix + "taskAreaScrollTop";
    GanttView.taskAreaScrollLeftKey = GanttView.cachedPrefix + "taskAreaScrollLeft";
    GanttView.taskTextHeightKey = GanttView.cachedPrefix + "taskTextHeight";
    return GanttView;
}());
exports.GanttView = GanttView;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewVisualModel = void 0;
var ResourceCollection_1 = __webpack_require__(31);
var TaskCollection_1 = __webpack_require__(75);
var DependencyCollection_1 = __webpack_require__(77);
var ResourceAssignmentCollection_1 = __webpack_require__(78);
var ViewVisualModelItem_1 = __webpack_require__(79);
var ViewVisualModelDependencyInfo_1 = __webpack_require__(80);
var WorkingTimeCalculator_1 = __webpack_require__(81);
var common_1 = __webpack_require__(1);
var Dependency_1 = __webpack_require__(13);
var Resource_1 = __webpack_require__(42);
var ResourceAssignment_1 = __webpack_require__(45);
var ViewVisualModel = (function () {
    function ViewVisualModel(owner, tasks, dependencies, resources, assignments, dateRange, workTimeRules) {
        this._fLockCount = 0;
        this.owner = owner;
        this.tasks = new TaskCollection_1.TaskCollection();
        this.tasks.importFromObject(tasks);
        this.dependencies = new DependencyCollection_1.DependencyCollection();
        this.dependencies.importFromObject(dependencies);
        this.resources = new ResourceCollection_1.ResourceCollection();
        this.resources.importFromObject(resources);
        this.assignments = new ResourceAssignmentCollection_1.ResourceAssignmentCollection();
        this.assignments.importFromObject(assignments);
        this._itemList = new Array();
        this._viewItemList = new Array();
        this._workTimeCalculator = new WorkingTimeCalculator_1.WorkingTimeCalculator(dateRange, workTimeRules);
        this.updateModel();
    }
    ViewVisualModel.prototype.updateModel = function () {
        this._itemList.splice(0, this._itemList.length);
        var tasks = this.tasks.items;
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            if (task)
                this._itemList.push(new ViewVisualModelItem_1.ViewVisualModelItem(task, this.getAssignedResources(task)));
        }
        this.createHierarchy();
        this.populateItemsForView();
        if (this.owner && this.owner.currentSelectedTaskID)
            this.changeTaskSelected(this.owner.currentSelectedTaskID, true);
    };
    ViewVisualModel.prototype.createHierarchy = function () {
        var _this = this;
        this.root = new ViewVisualModelItem_1.ViewVisualModelItem(null, null);
        var list = this._itemList;
        var inverted = list.reduce(function (previous, item) {
            var _a;
            var key = (_a = item.task) === null || _a === void 0 ? void 0 : _a.internalId;
            if (common_1.isDefined(key))
                previous[key] = item;
            return previous;
        }, {});
        var recalculateParentRequired = this.requireFirstLoadParentAutoCalc;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var parentId = item.task.parentId;
            var parentItem = inverted[parentId] || this.root;
            item.parent = parentItem;
            parentItem.addChild(item);
            if (recalculateParentRequired)
                this.owner.validationController.recalculateParents(item, function (data) {
                    if (!common_1.isDefined(data.id))
                        return;
                    var task = _this.tasks.getItemById(data.id);
                    if (common_1.isDefined(data.start))
                        task.start = data.start;
                    if (common_1.isDefined(data.end))
                        task.end = data.end;
                    if (common_1.isDefined(data.progress))
                        task.progress = data.progress;
                });
        }
        if (recalculateParentRequired)
            this.owner.dispatcher.notifyParentDataRecalculated(this.getCurrentTaskData());
    };
    ViewVisualModel.prototype.getCurrentTaskData = function () {
        var _this = this;
        return this.tasks.items.map(function (t) { return _this.getTaskObjectForDataSource(t); });
    };
    ViewVisualModel.prototype.getTaskObjectForDataSource = function (task) {
        var parentTask = task.parentId && this.tasks.getItemById(task.parentId);
        return {
            id: task.id,
            start: task.start,
            end: task.end,
            duration: task.duration,
            description: task.description,
            parentId: parentTask && parentTask.id,
            progress: task.progress,
            color: task.color,
            taskType: task.taskType,
            title: task.title,
            customFields: task.customFields,
            expanded: task.expanded
        };
    };
    ViewVisualModel.prototype.getDependencyObjectForDataSource = function (key) {
        var dependency = key instanceof Dependency_1.Dependency ? key : this.getItemByPublicId("dependency", key);
        if (dependency) {
            var predecessorId = this.convertInternalToPublicKey("task", dependency.predecessorId);
            var successorId = this.convertInternalToPublicKey("task", dependency.successorId);
            return {
                id: dependency.id,
                predecessorId: common_1.isDefined(predecessorId) ? predecessorId : dependency.predecessorId,
                successorId: common_1.isDefined(successorId) ? successorId : dependency.successorId,
                type: dependency.type
            };
        }
        return null;
    };
    ViewVisualModel.prototype.getResourceObjectForDataSource = function (key) {
        var resource = key instanceof Resource_1.Resource ? key : this.getItemByPublicId("resource", key);
        if (resource)
            return {
                id: resource.id,
                text: resource.text,
                color: resource.color
            };
        return null;
    };
    ViewVisualModel.prototype.getResourceAssignmentObjectForDataSource = function (key) {
        var assignment = key instanceof ResourceAssignment_1.ResourceAssignment ? key : this.getItemByPublicId("assignment", key);
        if (assignment) {
            var taskId = this.convertInternalToPublicKey("task", assignment.taskId);
            var resourceId = this.convertInternalToPublicKey("resource", assignment.resourceId);
            return {
                id: assignment.id,
                taskId: common_1.isDefined(taskId) ? taskId : assignment.taskId,
                resourceId: common_1.isDefined(resourceId) ? resourceId : assignment.resourceId
            };
        }
        return null;
    };
    ViewVisualModel.prototype.populateItemsForView = function () {
        this._viewItemList.splice(0, this._viewItemList.length);
        this.populateVisibleItems(this.root);
        this.updateVisibleItemDependencies();
    };
    ViewVisualModel.prototype.populateVisibleItems = function (item) {
        var _this = this;
        var isRoot = item === this.root;
        if (!item || (!item.task && !isRoot))
            return;
        if (!isRoot) {
            this._viewItemList.push(item);
            item.visibleIndex = this._viewItemList.length - 1;
        }
        if (item.getExpanded() || item === this.root)
            item.children.forEach(function (n) { return _this.populateVisibleItems(n); });
    };
    ViewVisualModel.prototype.updateVisibleItemDependencies = function () {
        var list = this._viewItemList;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var visibleDependencies = this.getTasVisibleDependencies(item.task);
            item.setDependencies(visibleDependencies);
        }
    };
    ViewVisualModel.prototype.getAssignedResources = function (task) {
        var _this = this;
        var res = new ResourceCollection_1.ResourceCollection();
        var assignments = this.assignments.items.filter(function (value) { return value.taskId == task.internalId; });
        assignments.forEach(function (assignment) { res.add(_this.resources.getItemById(assignment.resourceId)); });
        return res;
    };
    ViewVisualModel.prototype.getTasVisibleDependencies = function (task) {
        var res = new Array();
        var id = task.internalId;
        var dependencies = this.dependencies.items.filter(function (value) { return value.successorId == id; });
        for (var i = 0; i < dependencies.length; i++) {
            var dependency = dependencies[i];
            var item = this.findItem(dependency.predecessorId);
            if (item && item.getVisible())
                res.push(new ViewVisualModelDependencyInfo_1.ViewVisualModelDependencyInfo(dependency.internalId, item, dependency.type));
        }
        return res;
    };
    ViewVisualModel.prototype.changeTaskExpanded = function (id, expanded) {
        var task = this.tasks.getItemById(String(id));
        if (task) {
            task.expanded = expanded;
            this.changed();
        }
    };
    ViewVisualModel.prototype.changeTaskVisibility = function (id, visible) {
        var item = this.findItem(id);
        if (item) {
            item.visible = visible;
            this.changed();
        }
    };
    ViewVisualModel.prototype.changeTaskSelected = function (id, selected) {
        var item = this._itemList.filter(function (value) { return value.task && value.task.internalId === id; })[0];
        if (item) {
            item.selected = selected;
            var viewItem = this.findItem(id);
            var taskIndex = viewItem && viewItem.visibleIndex;
            if (taskIndex > -1)
                this.owner.recreateTaskElement(taskIndex);
        }
    };
    ViewVisualModel.prototype.beginUpdate = function () {
        this._fLockCount++;
    };
    ViewVisualModel.prototype.endUpdate = function () {
        this._fLockCount--;
        if (this._fLockCount == 0)
            this.changed();
    };
    ViewVisualModel.prototype.changed = function () {
        if (this._fLockCount !== 0)
            return;
        this.populateItemsForView();
        if (this.owner && this.owner.onVisualModelChanged)
            this.owner.onVisualModelChanged();
    };
    ViewVisualModel.prototype.findItem = function (taskId) {
        return this._viewItemList.filter(function (value) { return value.task && value.task.internalId === taskId; })[0];
    };
    Object.defineProperty(ViewVisualModel.prototype, "items", {
        get: function () { return this._viewItemList; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewVisualModel.prototype, "itemCount", {
        get: function () { return this.items.length; },
        enumerable: false,
        configurable: true
    });
    ViewVisualModel.prototype.getTaskVisibility = function (id) {
        var item = this.findItem(id);
        return !!item && item.getVisible();
    };
    ViewVisualModel.prototype.getTaskSelected = function (id) {
        var item = this.findItem(id);
        return !!item && item.selected;
    };
    Object.defineProperty(ViewVisualModel.prototype, "noWorkingIntervals", {
        get: function () { return this._workTimeCalculator.noWorkingIntervals; },
        enumerable: false,
        configurable: true
    });
    ViewVisualModel.prototype.updateRange = function (range) { this._workTimeCalculator.updateRange(range); };
    ViewVisualModel.prototype.taskHasChildrenByIndex = function (index) { return this._viewItemList[index].children.length > 0; };
    ViewVisualModel.prototype.taskHasChildren = function (id) {
        var item = this.findItem(id);
        return item && item.children.length > 0;
    };
    Object.defineProperty(ViewVisualModel.prototype, "parentAutoCalc", {
        get: function () {
            var settings = this.owner && this.owner.settings;
            return settings && settings.validation && settings.validation.autoUpdateParentTasks;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewVisualModel.prototype, "requireFirstLoadParentAutoCalc", {
        get: function () { return this.parentAutoCalc && this.owner.requireFirstLoadParentAutoCalc(); },
        enumerable: false,
        configurable: true
    });
    ViewVisualModel.prototype.isTaskToCalculateByChildren = function (id) { return this.parentAutoCalc && this.taskHasChildren(id); };
    ViewVisualModel.prototype.hasTasks = function () { return this.tasks.length > 0; };
    ViewVisualModel.prototype.getDataUpdateErrorCallback = function () {
        return this.owner.getDataUpdateErrorCallback && this.owner.getDataUpdateErrorCallback();
    };
    ViewVisualModel.prototype.convertPublicToInternalKey = function (dataType, publicKey) {
        var item = this.getItemByPublicId(dataType, publicKey);
        return item && item.internalId;
    };
    ViewVisualModel.prototype.convertInternalToPublicKey = function (dataType, internalId) {
        var item = this.getItemByInternalId(dataType, internalId);
        return item && item.id;
    };
    ViewVisualModel.prototype.getItemByPublicId = function (dataType, publicKey) {
        var strKey = publicKey.toString();
        switch (dataType) {
            case "task":
                return this.tasks.getItemByPublicId(strKey);
            case "dependency":
                return this.dependencies.getItemByPublicId(strKey);
            case "resource":
                return this.resources.getItemByPublicId(strKey);
            case "assignment":
                return this.assignments.getItemByPublicId(strKey);
        }
        return null;
    };
    ViewVisualModel.prototype.getItemByInternalId = function (dataType, internalId) {
        switch (dataType) {
            case "task":
                return this.tasks.getItemById(internalId);
            case "dependency":
                return this.dependencies.getItemById(internalId);
            case "resource":
                return this.resources.getItemById(internalId);
            case "assignment":
                return this.assignments.getItemById(internalId);
        }
        return null;
    };
    ViewVisualModel.prototype.findAssignment = function (resourceKey, taskKey) {
        var resourceInternalKey = this.convertPublicToInternalKey("resource", resourceKey);
        var taskInternalKey = this.convertPublicToInternalKey("task", taskKey);
        return this.assignments.items.filter(function (val) { return val.resourceId === resourceInternalKey && val.taskId === taskInternalKey; })[0];
    };
    ViewVisualModel.prototype.getAllVisibleTaskIndices = function () {
        var _this = this;
        var result = [];
        this.tasks.items.forEach(function (t, index) {
            if (t && _this.getTaskVisibility(t.internalId) && t.isValid())
                result.push(index);
        });
        return result;
    };
    ViewVisualModel.prototype.getVisibleTasks = function () {
        var _this = this;
        return this.tasks.items.filter(function (t) { return t && _this.getTaskVisibility(t.internalId) && t.isValid(); });
    };
    ViewVisualModel.prototype.getVisibleDependencies = function () {
        var visibleTasksKeys = this.getVisibleTasks().map(function (t) { return t.internalId; });
        return this.dependencies.items.filter(function (d) { return d && visibleTasksKeys.indexOf(d.successorId) > -1 && visibleTasksKeys.indexOf(d.predecessorId) > -1; });
    };
    ViewVisualModel.prototype.getVisibleResourceAssignments = function () {
        var visibleTasksKeys = this.getVisibleTasks().map(function (t) { return t.internalId; });
        return this.assignments.items.filter(function (a) { return a && visibleTasksKeys.indexOf(a.taskId) > -1; });
    };
    ViewVisualModel.prototype.getVisibleResources = function () {
        var visibleResources = [];
        var visibleAssignments = this.getVisibleResourceAssignments();
        for (var i = 0; i < visibleAssignments.length; i++) {
            var resource = this.getItemByInternalId("resource", visibleAssignments[i].resourceId);
            if (resource && visibleResources.indexOf(resource) === -1)
                visibleResources.push(resource);
        }
        return visibleResources;
    };
    return ViewVisualModel;
}());
exports.ViewVisualModel = ViewVisualModel;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GanttJsonUtils = void 0;
var json_1 = __webpack_require__(71);
var GanttJsonUtils = (function () {
    function GanttJsonUtils() {
    }
    GanttJsonUtils.parseJson = function (json) {
        return json_1.JsonUtils.isValid(json) ? JSON.parse(json) : null;
    };
    return GanttJsonUtils;
}());
exports.GanttJsonUtils = GanttJsonUtils;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsonUtils = (function () {
    function JsonUtils() {
    }
    JsonUtils.isValid = function (json) {
        return !(/[^,:{}[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(json.replace(/"(\\.|[^"\\])*"/g, '')));
    };
    return JsonUtils;
}());
exports.JsonUtils = JsonUtils;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var min_max_1 = __webpack_require__(73);
var comparers_1 = __webpack_require__(74);
var ListUtils = (function () {
    function ListUtils() {
    }
    ListUtils.remove = function (list, element) {
        var index = list.indexOf(element, 0);
        if (index >= 0)
            list.splice(index, 1);
    };
    ListUtils.removeBy = function (list, callback) {
        var len = list.length;
        for (var index = 0; index < len; index++) {
            if (callback(list[index], index))
                return list.splice(index, 1)[0];
        }
        return null;
    };
    ListUtils.shallowCopy = function (list) {
        return list.slice();
    };
    ListUtils.deepCopy = function (list) {
        return ListUtils.map(list, function (val) { return val.clone(); });
    };
    ListUtils.initByValue = function (numElements, initValue) {
        var result = [];
        for (; numElements > 0; numElements--)
            result.push(initValue);
        return result;
    };
    ListUtils.initByCallback = function (numElements, initCallback) {
        var result = [];
        for (var index = 0; index < numElements; index++)
            result.push(initCallback(index));
        return result;
    };
    ListUtils.forEachOnInterval = function (interval, callback) {
        var end = interval.end;
        for (var index = interval.start; index < end; index++)
            callback(index);
    };
    ListUtils.reverseForEachOnInterval = function (interval, callback) {
        var start = interval.start;
        for (var index = interval.end - 1; index >= start; index--)
            callback(index);
    };
    ListUtils.reducedMap = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++) {
            var newItem = callback(list[index], index);
            if (newItem !== null)
                result.push(newItem);
        }
        return result;
    };
    ListUtils.filter = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++) {
            var item = list[index];
            if (callback(item, index))
                result.push(item);
        }
        return result;
    };
    ListUtils.map = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var result = [];
        for (var index = startIndex; index < endIndex; index++)
            result.push(callback(list[index], index));
        return result;
    };
    ListUtils.indexBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var ind = startIndex; ind < endIndex; ind++) {
            if (callback(list[ind], ind))
                return ind;
        }
        return -1;
    };
    ListUtils.reverseIndexBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var ind = startIndex; ind >= endIndex; ind--) {
            if (callback(list[ind], ind))
                return ind;
        }
        return -1;
    };
    ListUtils.elementBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var ind = ListUtils.indexBy(list, callback, startIndex, endIndex);
        return ind < 0 ? null : list[ind];
    };
    ListUtils.reverseElementBy = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        var ind = ListUtils.reverseIndexBy(list, callback, startIndex, endIndex);
        return ind < 0 ? null : list[ind];
    };
    ListUtils.last = function (list) {
        return list[list.length - 1];
    };
    ListUtils.setLast = function (list, newVal) {
        return list[list.length - 1] = newVal;
    };
    ListUtils.incLast = function (list) {
        return ++list[list.length - 1];
    };
    ListUtils.decLast = function (list) {
        return --list[list.length - 1];
    };
    ListUtils.equals = function (a, b) {
        return a.length === b.length && ListUtils.allOf2(a, b, function (a, b) { return a.equals(b); });
    };
    ListUtils.equalsByReference = function (a, b) {
        var aLen = a.length;
        var bLen = a.length;
        if (aLen !== bLen)
            return false;
        for (var i = 0; i < aLen; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    };
    ListUtils.unique = function (list, cmp, equal, finalizeObj) {
        if (equal === void 0) { equal = cmp; }
        if (finalizeObj === void 0) { finalizeObj = function () { }; }
        var len = list.length;
        if (len === 0)
            return [];
        list = list.sort(cmp);
        var prevValue = list[0];
        var result = ListUtils.reducedMap(list, function (v) {
            if (equal(prevValue, v) !== 0) {
                prevValue = v;
                return v;
            }
            finalizeObj(v);
            return null;
        }, 1, len);
        result.unshift(list[0]);
        return result;
    };
    ListUtils.uniqueNumber = function (list) {
        list = list.sort(comparers_1.Comparers.number);
        var prevValue = Number.NaN;
        for (var i = list.length - 1; i >= 0; i--) {
            if (prevValue === list[i])
                list.splice(i, 1);
            else
                prevValue = list[i];
        }
        return list;
    };
    ListUtils.forEach = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++)
            callback(list[index], index);
    };
    ListUtils.forEach2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++)
            callback(listA[index], listB[index], index);
    };
    ListUtils.reverseForEach = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--)
            callback(list[index], index);
    };
    ListUtils.reverseIndexOf = function (list, element, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            if (list[index] === element)
                return index;
        }
        return -1;
    };
    ListUtils.accumulate = function (list, initAccValue, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var acc = initAccValue;
        for (var ind = startIndex; ind < endIndex; ind++)
            acc = callback(acc, list[ind], ind);
        return acc;
    };
    ListUtils.accumulateNumber = function (list, callback, initAccValue, startIndex, endIndex) {
        if (initAccValue === void 0) { initAccValue = 0; }
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var acc = initAccValue;
        for (var ind = startIndex; ind < endIndex; ind++)
            acc += callback(list[ind], ind, acc);
        return acc;
    };
    ListUtils.anyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (callback(list[index], index))
                return true;
        }
        return false;
    };
    ListUtils.unsafeAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            var currResult = callback(list[index], index);
            if (currResult)
                return currResult;
        }
        return null;
    };
    ListUtils.reverseAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            if (callback(list[index], index))
                return true;
        }
        return false;
    };
    ListUtils.unsafeReverseAnyOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = list.length - 1; }
        if (endIndex === void 0) { endIndex = 0; }
        for (var index = startIndex; index >= endIndex; index--) {
            var currResult = callback(list[index], index);
            if (currResult)
                return currResult;
        }
        return null;
    };
    ListUtils.anyOf2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (callback(listA[index], listB[index], index))
                return true;
        }
        return false;
    };
    ListUtils.allOf = function (list, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (!callback(list[index], index))
                return false;
        }
        return true;
    };
    ListUtils.allOf2 = function (listA, listB, callback, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = listA.length; }
        for (var index = startIndex; index < endIndex; index++) {
            if (!callback(listA[index], listB[index], index))
                return false;
        }
        return true;
    };
    ListUtils.allOfOnInterval = function (interval, callback) {
        var endIndex = interval.end;
        for (var index = interval.start; index < endIndex; index++) {
            if (!callback(index))
                return false;
        }
        return true;
    };
    ListUtils.addListOnTail = function (resultList, addedList) {
        for (var i = 0, elem = void 0; elem = addedList[i]; i++)
            resultList.push(elem);
        return resultList;
    };
    ListUtils.joinLists = function (converter) {
        var lists = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            lists[_i - 1] = arguments[_i];
        }
        return ListUtils.accumulate(lists, [], function (accList, list) {
            ListUtils.addListOnTail(accList, converter(list));
            return accList;
        });
    };
    ListUtils.push = function (list, element) {
        list.push(element);
        return list;
    };
    ListUtils.countIf = function (list, callback) {
        return ListUtils.accumulateNumber(list, function (elem, ind) { return callback(elem, ind) ? 1 : 0; });
    };
    ListUtils.clear = function (list) {
        list.splice(0);
    };
    ListUtils.merge = function (list, cmp, shouldMerge, merge, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        list = list.slice(startIndex, endIndex);
        if (endIndex - startIndex < 2)
            return list;
        list = list.sort(cmp);
        var prevObj = list[startIndex];
        var result = [prevObj];
        for (var ind = startIndex + 1; ind < endIndex; ind++) {
            var obj = list[ind];
            if (shouldMerge(prevObj, obj))
                merge(prevObj, obj);
            else {
                prevObj = obj;
                result.push(prevObj);
            }
        }
        return result;
    };
    ListUtils.min = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.minExtended(list, getValue, startIndex, endIndex);
        return res ? res.minElement : null;
    };
    ListUtils.max = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.maxExtended(list, getValue, startIndex, endIndex);
        return res ? res.maxElement : null;
    };
    ListUtils.minMax = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        var res = ListUtils.minMaxExtended(list, getValue, startIndex, endIndex);
        return res ? new min_max_1.MinMax(res.minElement, res.maxElement) : null;
    };
    ListUtils.minExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var minElement = list[startIndex];
        var minValue = getValue(minElement);
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue < minValue) {
                minValue = elemValue;
                minElement = elem;
            }
        }
        return new min_max_1.ExtendedMin(minElement, minValue);
    };
    ListUtils.maxExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var maxElement = list[startIndex];
        var maxValue = getValue(maxElement);
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue > maxValue) {
                maxValue = elemValue;
                maxElement = elem;
            }
        }
        return new min_max_1.ExtendedMax(maxElement, maxValue);
    };
    ListUtils.minMaxExtended = function (list, getValue, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var minElement = list[startIndex];
        var maxElement = minElement;
        var minValue = getValue(minElement);
        var maxValue = minValue;
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var elemValue = getValue(elem);
            if (elemValue < minValue) {
                minValue = elemValue;
                minElement = elem;
            }
            else if (elemValue > maxValue) {
                maxValue = elemValue;
                maxElement = elem;
            }
        }
        return new min_max_1.ExtendedMinMax(minElement, minValue, maxElement, maxValue);
    };
    ListUtils.minByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var found = list[startIndex];
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            if (cmp(elem, found) < 0)
                found = elem;
        }
        return found;
    };
    ListUtils.maxByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var found = list[startIndex];
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            if (cmp(elem, found) > 0)
                found = elem;
        }
        return found;
    };
    ListUtils.minMaxByCmp = function (list, cmp, startIndex, endIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        if (endIndex === void 0) { endIndex = list.length; }
        if (list.length === 0)
            return null;
        var min = list[startIndex];
        var max = min;
        for (var index = startIndex + 1; index < endIndex; index++) {
            var elem = list[index];
            var res = cmp(elem, min);
            if (res > 0)
                max = elem;
            else if (res < 0)
                min = elem;
        }
        return new min_max_1.MinMax(min, max);
    };
    return ListUtils;
}());
exports.ListUtils = ListUtils;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(44);
var MinMax = (function () {
    function MinMax(minElement, maxElement) {
        this.minElement = minElement;
        this.maxElement = maxElement;
    }
    return MinMax;
}());
exports.MinMax = MinMax;
var MinMaxNumber = (function (_super) {
    tslib_1.__extends(MinMaxNumber, _super);
    function MinMaxNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MinMaxNumber.prototype, "length", {
        get: function () {
            return this.maxElement - this.minElement;
        },
        enumerable: true,
        configurable: true
    });
    return MinMaxNumber;
}(MinMax));
exports.MinMaxNumber = MinMaxNumber;
var ExtendedMin = (function () {
    function ExtendedMin(minElement, minValue) {
        this.minElement = minElement;
        this.minValue = minValue;
    }
    return ExtendedMin;
}());
exports.ExtendedMin = ExtendedMin;
var ExtendedMax = (function () {
    function ExtendedMax(maxElement, maxValue) {
        this.maxElement = maxElement;
        this.maxValue = maxValue;
    }
    return ExtendedMax;
}());
exports.ExtendedMax = ExtendedMax;
var ExtendedMinMax = (function (_super) {
    tslib_1.__extends(ExtendedMinMax, _super);
    function ExtendedMinMax(minElement, minValue, maxElement, maxValue) {
        var _this = _super.call(this, minElement, maxElement) || this;
        _this.minValue = minValue;
        _this.maxValue = maxValue;
        return _this;
    }
    return ExtendedMinMax;
}(MinMax));
exports.ExtendedMinMax = ExtendedMinMax;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Comparers = (function () {
    function Comparers() {
    }
    Comparers.number = function (a, b) {
        return a - b;
    };
    Comparers.string = function (a, b) {
        return ((a === b) ? 0 : ((a > b) ? 1 : -1));
    };
    Comparers.stringIgnoreCase = function (a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return ((a === b) ? 0 : ((a > b) ? 1 : -1));
    };
    return Comparers;
}());
exports.Comparers = Comparers;
var Equals = (function () {
    function Equals() {
    }
    Equals.simpleType = function (a, b) {
        return a === b;
    };
    Equals.object = function (a, b) {
        return a && b && (a === b || a.equals(b));
    };
    return Equals;
}());
exports.Equals = Equals;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCollection = void 0;
var tslib_1 = __webpack_require__(0);
var Task_1 = __webpack_require__(76);
var CollectionBase_1 = __webpack_require__(17);
var TaskCollection = (function (_super) {
    tslib_1.__extends(TaskCollection, _super);
    function TaskCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskCollection.prototype.createItem = function () { return new Task_1.Task(); };
    return TaskCollection;
}(CollectionBase_1.CollectionBase));
exports.TaskCollection = TaskCollection;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.TaskType = void 0;
var tslib_1 = __webpack_require__(0);
var common_1 = __webpack_require__(1);
var DataObject_1 = __webpack_require__(12);
var TaskType;
(function (TaskType) {
    TaskType[TaskType["Regular"] = 0] = "Regular";
    TaskType[TaskType["Summary"] = 1] = "Summary";
    TaskType[TaskType["Milestone"] = 2] = "Milestone";
})(TaskType = exports.TaskType || (exports.TaskType = {}));
var Task = (function (_super) {
    tslib_1.__extends(Task, _super);
    function Task() {
        var _this = _super.call(this) || this;
        _this.start = null;
        _this.end = null;
        _this.duration = null;
        _this.description = "";
        _this.parentId = "";
        _this.title = "";
        _this.owner = null;
        _this.progress = 0;
        _this.taskType = null;
        _this.customFields = {};
        _this.expanded = true;
        _this.color = "";
        return _this;
    }
    Task.prototype.assignFromObject = function (sourceObj) {
        if (common_1.isDefined(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.owner = sourceObj.owner;
            this.parentId = common_1.isDefined(sourceObj.parentId) ? String(sourceObj.parentId) : "";
            this.description = sourceObj.description;
            this.title = sourceObj.title;
            this.start = typeof sourceObj.start === "string" ? new Date(sourceObj.start) : sourceObj.start || new Date(0);
            this.end = typeof sourceObj.end === "string" ? new Date(sourceObj.end) : sourceObj.end || new Date(0);
            this.duration = sourceObj.duration;
            this.progress = sourceObj.progress;
            this.taskType = sourceObj.taskType;
            if (common_1.isDefined(sourceObj.expanded))
                this.expanded = !!sourceObj.expanded;
            if (common_1.isDefined(sourceObj.color))
                this.color = sourceObj.color;
            this.assignCustomFields(sourceObj.customFields);
        }
    };
    Task.prototype.assignCustomFields = function (sourceObj) {
        if (!sourceObj)
            return;
        for (var property in sourceObj) {
            if (!Object.prototype.hasOwnProperty.call(sourceObj, property))
                continue;
            this.customFields[property] = sourceObj[property];
        }
    };
    Task.prototype.isMilestone = function () {
        return this.start.getTime() === this.end.getTime();
    };
    Task.prototype.getDuration = function () {
        return this.end.getTime() - this.start.getTime();
    };
    Task.prototype.isValid = function () {
        return !!this.start.getTime() && !!this.end.getTime();
    };
    return Task;
}(DataObject_1.DataObject));
exports.Task = Task;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyCollection = void 0;
var tslib_1 = __webpack_require__(0);
var CollectionBase_1 = __webpack_require__(17);
var Dependency_1 = __webpack_require__(13);
var DependencyCollection = (function (_super) {
    tslib_1.__extends(DependencyCollection, _super);
    function DependencyCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DependencyCollection.prototype.createItem = function () { return new Dependency_1.Dependency(); };
    return DependencyCollection;
}(CollectionBase_1.CollectionBase));
exports.DependencyCollection = DependencyCollection;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceAssignmentCollection = void 0;
var tslib_1 = __webpack_require__(0);
var CollectionBase_1 = __webpack_require__(17);
var ResourceAssignment_1 = __webpack_require__(45);
var ResourceAssignmentCollection = (function (_super) {
    tslib_1.__extends(ResourceAssignmentCollection, _super);
    function ResourceAssignmentCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceAssignmentCollection.prototype.createItem = function () { return new ResourceAssignment_1.ResourceAssignment(); };
    return ResourceAssignmentCollection;
}(CollectionBase_1.CollectionBase));
exports.ResourceAssignmentCollection = ResourceAssignmentCollection;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewVisualModelItem = void 0;
var common_1 = __webpack_require__(1);
var size_1 = __webpack_require__(9);
var ViewVisualModelItem = (function () {
    function ViewVisualModelItem(task, resources) {
        this.dependencies = new Array();
        this.parent = null;
        this.visible = true;
        this.selected = false;
        this.visibleIndex = -1;
        this.task = task;
        this.resources = resources;
        this.children = new Array();
        this.isCustom = false;
        this.size = new size_1.Size(0, 0);
    }
    Object.defineProperty(ViewVisualModelItem.prototype, "resourceText", {
        get: function () {
            var text = "";
            this.resources.items.forEach(function (r) { return text += r.text + " "; });
            return text;
        },
        enumerable: false,
        configurable: true
    });
    ViewVisualModelItem.prototype.addChild = function (child) {
        if (common_1.isDefined(child) && this.children.indexOf(child) < 0)
            this.children.push(child);
    };
    ViewVisualModelItem.prototype.removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index > -1)
            this.children.splice(index, 1);
    };
    ViewVisualModelItem.prototype.getExpanded = function () {
        return !!this.task && this.task.expanded;
    };
    ViewVisualModelItem.prototype.getVisible = function () {
        if (!this.visible)
            return false;
        var parentItem = this.parent;
        while (parentItem) {
            if (!parentItem.visible)
                return false;
            parentItem = parentItem.parent;
        }
        return true;
    };
    ViewVisualModelItem.prototype.changeVisibility = function (visible) {
        this.visible = visible;
    };
    ViewVisualModelItem.prototype.changeSelection = function (selected) {
        this.selected = selected;
    };
    ViewVisualModelItem.prototype.setDependencies = function (dependencies) {
        if (dependencies)
            this.dependencies = dependencies.slice();
    };
    return ViewVisualModelItem;
}());
exports.ViewVisualModelItem = ViewVisualModelItem;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewVisualModelDependencyInfo = void 0;
var ViewVisualModelDependencyInfo = (function () {
    function ViewVisualModelDependencyInfo(id, predecessor, type) {
        this.id = id;
        this.predecessor = predecessor;
        this.type = type;
    }
    return ViewVisualModelDependencyInfo;
}());
exports.ViewVisualModelDependencyInfo = ViewVisualModelDependencyInfo;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingTimeCalculator = void 0;
var GanttWorkingDayRuleCollection_1 = __webpack_require__(82);
var DayWorkingTimeInfo_1 = __webpack_require__(90);
var DateTimeUtils_1 = __webpack_require__(4);
var WorkingTimeCalculator = (function () {
    function WorkingTimeCalculator(range, rules) {
        this._workingRules = new GanttWorkingDayRuleCollection_1.WorkingDayRuleCollection();
        this._workDayList = new Array();
        this._calculationRange = range;
        this._workingRules.importFromObject(rules);
    }
    WorkingTimeCalculator.prototype.calculateWorkDayList = function () {
        if (!this._calculationRange)
            return;
        this.clearList();
        var rules = this._workingRules.items;
        for (var i = 0; i < rules.length; i++)
            this.processRule(rules[i]);
        this.sortList();
    };
    WorkingTimeCalculator.prototype.processRule = function (rule) {
        var points = rule.recurrence.calculatePoints(this._calculationRange.start, this._calculationRange.end);
        var _loop_1 = function (i) {
            var point = points[i];
            var dayNum = DateTimeUtils_1.DateTimeUtils.getDayNumber(point);
            var dayInfo = this_1._workDayList.filter(function (i) { return i.dayNumber == dayNum; })[0];
            if (dayInfo) {
                dayInfo.isWorkDay = dayInfo.isWorkDay && rule.isWorkDay;
                dayInfo.addWorkingIntervals(rule.workTimeRanges);
            }
            else
                this_1._workDayList.push(new DayWorkingTimeInfo_1.DayWorkingTimeInfo(dayNum, rule.isWorkDay, rule.workTimeRanges));
        };
        var this_1 = this;
        for (var i = 0; i < points.length; i++) {
            _loop_1(i);
        }
    };
    WorkingTimeCalculator.prototype.sortList = function () {
        this._workDayList.sort(function (d1, d2) { return d1.dayNumber - d2.dayNumber; });
    };
    WorkingTimeCalculator.prototype.clearList = function () {
        this._workDayList.splice(0, this._workDayList.length);
    };
    WorkingTimeCalculator.prototype.calculateNoWorkTimeIntervals = function () {
        var _this = this;
        var res = new Array();
        if (this._workDayList.length == 0)
            this.calculateWorkDayList();
        this._workDayList.forEach(function (d) { return res = res.concat(_this.getNoWorkTimeRangesFromDay(d)); });
        return this.concatJointedRanges(res);
    };
    WorkingTimeCalculator.prototype.concatJointedRanges = function (list) {
        var res = new Array();
        for (var i = 0; i < list.length; i++) {
            var interval = list[i];
            var needExpandPrevInterval = res.length > 0 && DateTimeUtils_1.DateTimeUtils.compareDates(res[res.length - 1].end, interval.start) < 2;
            if (needExpandPrevInterval)
                res[res.length - 1].end = interval.end;
            else
                res.push(interval);
        }
        return res;
    };
    WorkingTimeCalculator.prototype.getNoWorkTimeRangesFromDay = function (day) {
        return day.noWorkingIntervals.map(function (i) { return DateTimeUtils_1.DateTimeUtils.convertTimeRangeToDateRange(i, day.dayNumber); });
    };
    Object.defineProperty(WorkingTimeCalculator.prototype, "noWorkingIntervals", {
        get: function () {
            if (!this._noWorkingIntervals)
                this._noWorkingIntervals = this.calculateNoWorkTimeIntervals();
            return this._noWorkingIntervals.slice();
        },
        enumerable: false,
        configurable: true
    });
    WorkingTimeCalculator.prototype.updateRange = function (range) {
        this._calculationRange = range;
        this.invalidate();
    };
    WorkingTimeCalculator.prototype.invalidate = function () {
        this._noWorkingIntervals = null;
        this.clearList();
    };
    return WorkingTimeCalculator;
}());
exports.WorkingTimeCalculator = WorkingTimeCalculator;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingDayRuleCollection = void 0;
var tslib_1 = __webpack_require__(0);
var CollectionBase_1 = __webpack_require__(17);
var WorkingTimeRule_1 = __webpack_require__(83);
var WorkingDayRuleCollection = (function (_super) {
    tslib_1.__extends(WorkingDayRuleCollection, _super);
    function WorkingDayRuleCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkingDayRuleCollection.prototype.createItem = function () { return new WorkingTimeRule_1.WorkingTimeRule(); };
    return WorkingDayRuleCollection;
}(CollectionBase_1.CollectionBase));
exports.WorkingDayRuleCollection = WorkingDayRuleCollection;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingTimeRule = void 0;
var tslib_1 = __webpack_require__(0);
var DataObject_1 = __webpack_require__(12);
var common_1 = __webpack_require__(1);
var DateTimeUtils_1 = __webpack_require__(4);
var RecurrenceFactory_1 = __webpack_require__(49);
var Daily_1 = __webpack_require__(50);
var WorkingTimeRule = (function (_super) {
    tslib_1.__extends(WorkingTimeRule, _super);
    function WorkingTimeRule(recurrence, isWorkDay, workTimeRanges) {
        if (recurrence === void 0) { recurrence = null; }
        if (isWorkDay === void 0) { isWorkDay = true; }
        if (workTimeRanges === void 0) { workTimeRanges = null; }
        var _this = _super.call(this) || this;
        _this.isWorkDay = true;
        _this.workTimeRanges = new Array();
        _this.recurrence = recurrence;
        _this.isWorkDay = isWorkDay;
        if (workTimeRanges)
            _this.workTimeRanges.concat(workTimeRanges);
        return _this;
    }
    WorkingTimeRule.prototype.assignFromObject = function (sourceObj) {
        if (common_1.isDefined(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.recurrence = RecurrenceFactory_1.RecurrenceFactory.createRecurrenceByType(sourceObj.recurrenceType) || new Daily_1.Daily();
            if (common_1.isDefined(sourceObj.recurrence))
                this.recurrence.assignFromObject(sourceObj.recurrence);
            if (common_1.isDefined(sourceObj.isWorkDay))
                this.isWorkDay = !!sourceObj.isWorkDay;
            var ranges = DateTimeUtils_1.DateTimeUtils.convertToTimeRanges(sourceObj.workTimeRanges);
            if (ranges)
                this.workTimeRanges = ranges;
        }
    };
    return WorkingTimeRule;
}(DataObject_1.DataObject));
exports.WorkingTimeRule = WorkingTimeRule;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfWeek = void 0;
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Month = void 0;
var Month;
(function (Month) {
    Month[Month["January"] = 0] = "January";
    Month[Month["February"] = 1] = "February";
    Month[Month["March"] = 2] = "March";
    Month[Month["April"] = 3] = "April";
    Month[Month["May"] = 4] = "May";
    Month[Month["June"] = 5] = "June";
    Month[Month["July"] = 6] = "July";
    Month[Month["August"] = 7] = "August";
    Month[Month["September"] = 8] = "September";
    Month[Month["October"] = 9] = "October";
    Month[Month["November"] = 10] = "November";
    Month[Month["December"] = 11] = "December";
})(Month = exports.Month || (exports.Month = {}));


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Weekly = void 0;
var tslib_1 = __webpack_require__(0);
var RecurrenceBase_1 = __webpack_require__(20);
var DateTimeUtils_1 = __webpack_require__(4);
var Weekly = (function (_super) {
    tslib_1.__extends(Weekly, _super);
    function Weekly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Weekly.prototype.checkDate = function (date) {
        return DateTimeUtils_1.DateTimeUtils.checkDayOfWeek(this.dayOfWeekInternal, date);
    };
    Weekly.prototype.checkInterval = function (date) {
        return DateTimeUtils_1.DateTimeUtils.getWeeksBetween(this.start, date) % this.interval == 0;
    };
    Weekly.prototype.calculatePointByInterval = function (date) {
        var weeksFromStart = DateTimeUtils_1.DateTimeUtils.getWeeksBetween(this.start, date);
        var intervalCount = Math.floor(weeksFromStart / this.interval);
        var remainder = weeksFromStart % this.interval;
        var isPointOnNewWeek = remainder > 0 || date.getDay() >= this.dayOfWeekInternal;
        if (isPointOnNewWeek)
            intervalCount++;
        var weeksToAdd = intervalCount * this.interval;
        return this.calcNextPointWithWeekCount(this.start, weeksToAdd);
    };
    Weekly.prototype.calculateNearestPoint = function (date) {
        var diff = this.dayOfWeekInternal - date.getDay();
        if (diff > 0)
            return DateTimeUtils_1.DateTimeUtils.addDays(new Date(date), diff);
        return this.calcNextPointWithWeekCount(date, 1);
    };
    Weekly.prototype.calcNextPointWithWeekCount = function (date, weekCount) {
        if (weekCount === void 0) { weekCount = 1; }
        var daysToAdd = weekCount * 7 + this.dayOfWeekInternal - date.getDay();
        return DateTimeUtils_1.DateTimeUtils.addDays(new Date(date), daysToAdd);
    };
    Object.defineProperty(Weekly.prototype, "dayOfWeek", {
        get: function () { return this.dayOfWeekInternal; },
        set: function (value) { this.dayOfWeekInternal = value; },
        enumerable: false,
        configurable: true
    });
    return Weekly;
}(RecurrenceBase_1.RecurrenceBase));
exports.Weekly = Weekly;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Monthly = void 0;
var tslib_1 = __webpack_require__(0);
var RecurrenceBase_1 = __webpack_require__(20);
var DateTimeUtils_1 = __webpack_require__(4);
var MonthInfo_1 = __webpack_require__(88);
var Monthly = (function (_super) {
    tslib_1.__extends(Monthly, _super);
    function Monthly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Monthly.prototype.checkDate = function (date) {
        if (this._calculateByDayOfWeek)
            return DateTimeUtils_1.DateTimeUtils.checkDayOfWeekOccurrenceInMonth(date, this.dayOfWeekInternal, this.dayOfWeekOccurrenceInternal);
        return DateTimeUtils_1.DateTimeUtils.checkDayOfMonth(this.dayInternal, date);
    };
    Monthly.prototype.checkInterval = function (date) {
        return DateTimeUtils_1.DateTimeUtils.getMonthsDifference(this.start, date) % this.interval == 0;
    };
    Monthly.prototype.calculatePointByInterval = function (date) {
        var start = this.start;
        var monthFromStart = DateTimeUtils_1.DateTimeUtils.getMonthsDifference(start, date);
        var monthToAdd = Math.floor(monthFromStart / this.interval) * this.interval;
        var info = new MonthInfo_1.MonthInfo(start.getMonth(), start.getFullYear());
        info.addMonths(monthToAdd);
        var point = this.getSpecDayInMonth(info.year, info.month);
        if (DateTimeUtils_1.DateTimeUtils.compareDates(point, date) >= 0) {
            info.addMonths(this.interval);
            point = this.getSpecDayInMonth(info.year, info.month);
        }
        return point;
    };
    Monthly.prototype.calculateNearestPoint = function (date) {
        var month = date.getMonth();
        var year = date.getFullYear();
        var point = this.getSpecDayInMonth(year, month);
        if (DateTimeUtils_1.DateTimeUtils.compareDates(point, date) >= 0) {
            var info = new MonthInfo_1.MonthInfo(month, year);
            info.addMonths(1);
            point = this.getSpecDayInMonth(info.year, info.month);
        }
        return point;
    };
    Object.defineProperty(Monthly.prototype, "day", {
        get: function () { return this.dayInternal; },
        set: function (value) { this.dayInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Monthly.prototype, "dayOfWeek", {
        get: function () { return this.dayOfWeekInternal; },
        set: function (value) { this.dayOfWeekInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Monthly.prototype, "dayOfWeekOccurrence", {
        get: function () { return this.dayOfWeekOccurrenceInternal; },
        set: function (value) { this.dayOfWeekOccurrenceInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Monthly.prototype, "calculateByDayOfWeek", {
        get: function () { return this._calculateByDayOfWeek; },
        set: function (value) { this._calculateByDayOfWeek = value; },
        enumerable: false,
        configurable: true
    });
    return Monthly;
}(RecurrenceBase_1.RecurrenceBase));
exports.Monthly = Monthly;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthInfo = void 0;
var DateTimeUtils_1 = __webpack_require__(4);
var MonthInfo = (function () {
    function MonthInfo(month, year) {
        this.month = month;
        this.year = year;
    }
    MonthInfo.prototype.addMonths = function (months) {
        var nextMonth = DateTimeUtils_1.DateTimeUtils.getNextMonth(this.month, months);
        var yearInc = Math.floor(months / 12);
        if (nextMonth < this.month)
            ++yearInc;
        this.month = nextMonth;
        this.year += yearInc;
    };
    return MonthInfo;
}());
exports.MonthInfo = MonthInfo;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Yearly = void 0;
var tslib_1 = __webpack_require__(0);
var RecurrenceBase_1 = __webpack_require__(20);
var DateTimeUtils_1 = __webpack_require__(4);
var Yearly = (function (_super) {
    tslib_1.__extends(Yearly, _super);
    function Yearly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Yearly.prototype.checkDate = function (date) {
        if (!DateTimeUtils_1.DateTimeUtils.checkMonth(this.month, date))
            return false;
        if (this._calculateByDayOfWeek)
            return DateTimeUtils_1.DateTimeUtils.checkDayOfWeekOccurrenceInMonth(date, this.dayOfWeekInternal, this.dayOfWeekOccurrenceInternal);
        return DateTimeUtils_1.DateTimeUtils.checkDayOfMonth(this.dayInternal, date);
    };
    Yearly.prototype.checkInterval = function (date) {
        return DateTimeUtils_1.DateTimeUtils.getYearsDifference(this.start, date) % this.interval == 0;
    };
    Yearly.prototype.calculatePointByInterval = function (date) {
        var yearFromStart = DateTimeUtils_1.DateTimeUtils.getYearsDifference(this.start, date);
        var yearInc = Math.floor(yearFromStart / this.interval) * this.interval;
        var newYear = this.start.getFullYear() + yearInc;
        var point = this.getSpecDayInMonth(newYear, this.monthInternal);
        if (DateTimeUtils_1.DateTimeUtils.compareDates(point, date) >= 0) {
            newYear += this.interval;
            point = this.getSpecDayInMonth(newYear, this.monthInternal);
        }
        return point;
    };
    Yearly.prototype.calculateNearestPoint = function (date) {
        var year = date.getFullYear();
        var point = this.getSpecDayInMonth(year, this.monthInternal);
        if (DateTimeUtils_1.DateTimeUtils.compareDates(point, date) >= 0)
            point = this.getSpecDayInMonth(++year, this.monthInternal);
        return point;
    };
    Object.defineProperty(Yearly.prototype, "month", {
        get: function () { return this.monthInternal; },
        set: function (value) { this.monthInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Yearly.prototype, "day", {
        get: function () { return this.dayInternal; },
        set: function (value) { this.dayInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Yearly.prototype, "dayOfWeek", {
        get: function () { return this.dayOfWeekInternal; },
        set: function (value) { this.dayOfWeekInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Yearly.prototype, "dayOfWeekOccurrence", {
        get: function () { return this.dayOfWeekOccurrenceInternal; },
        set: function (value) { this.dayOfWeekOccurrenceInternal = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Yearly.prototype, "calculateByDayOfWeek", {
        get: function () { return this._calculateByDayOfWeek; },
        set: function (value) { this._calculateByDayOfWeek = value; },
        enumerable: false,
        configurable: true
    });
    return Yearly;
}(RecurrenceBase_1.RecurrenceBase));
exports.Yearly = Yearly;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DayWorkingTimeInfo = void 0;
var TimeRange_1 = __webpack_require__(47);
var DateTimeUtils_1 = __webpack_require__(4);
var Time_1 = __webpack_require__(46);
var DayWorkingTimeInfo = (function () {
    function DayWorkingTimeInfo(dayNumber, isWorkDay, intervals) {
        if (dayNumber === void 0) { dayNumber = 0; }
        if (isWorkDay === void 0) { isWorkDay = true; }
        if (intervals === void 0) { intervals = null; }
        this._workingIntervals = new Array();
        this.dayNumber = dayNumber;
        this.isWorkDay = isWorkDay;
        this.addWorkingIntervals(intervals);
    }
    DayWorkingTimeInfo.prototype.addWorkingIntervals = function (intervals) {
        if (!intervals)
            return;
        this._workingIntervals = this._workingIntervals.concat(intervals.filter(function (r) { return !!r; }));
        this.rearrangeWorkingIntervals();
    };
    DayWorkingTimeInfo.prototype.rearrangeWorkingIntervals = function () {
        for (var i = 0; i < this._workingIntervals.length; i++)
            this.concatWithIntersectedRanges(this._workingIntervals[i]);
        this.sortIntervals();
    };
    DayWorkingTimeInfo.prototype.concatWithIntersectedRanges = function (range) {
        var _this = this;
        var intersectedRanges = this.getIntersectedIntervals(range);
        intersectedRanges.forEach(function (r) {
            range.concatWith(r);
            _this.removeInterval(r);
        });
    };
    DayWorkingTimeInfo.prototype.getIntersectedIntervals = function (range) {
        return this._workingIntervals.filter(function (r) { return r.hasIntersect(range) && r !== range; });
    };
    DayWorkingTimeInfo.prototype.sortIntervals = function () {
        this._workingIntervals.sort(function (r1, r2) { return DateTimeUtils_1.DateTimeUtils.caclTimeDifference(r2.start, r1.start); });
    };
    DayWorkingTimeInfo.prototype.removeInterval = function (element) {
        var index = this._workingIntervals.indexOf(element);
        if (index > -1 && index < this._workingIntervals.length)
            this._workingIntervals.splice(index, 1);
    };
    DayWorkingTimeInfo.prototype.clearIntervals = function () {
        this._workingIntervals.splice(0, this._workingIntervals.length);
    };
    Object.defineProperty(DayWorkingTimeInfo.prototype, "workingIntervals", {
        get: function () { return this._workingIntervals.slice(); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayWorkingTimeInfo.prototype, "noWorkingIntervals", {
        get: function () {
            var res = new Array();
            if (this.isWorkDay && this._workingIntervals.length == 0)
                return res;
            var starts = this._workingIntervals.map(function (r) { return r.end; });
            starts.splice(0, 0, new Time_1.Time());
            var ends = this._workingIntervals.map(function (r) { return r.start; });
            ends.push(DateTimeUtils_1.DateTimeUtils.getLastTimeOfDay());
            for (var i = 0; i < starts.length; i++) {
                var start = starts[i];
                var end = ends[i];
                if (!DateTimeUtils_1.DateTimeUtils.areTimesEqual(start, end))
                    res.push(new TimeRange_1.TimeRange(start, end));
            }
            return res;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DayWorkingTimeInfo.prototype, "isWorkDay", {
        get: function () { return this._isWorkDay; },
        set: function (value) {
            this._isWorkDay = value;
            if (!value)
                this.clearIntervals();
        },
        enumerable: false,
        configurable: true
    });
    return DayWorkingTimeInfo;
}());
exports.DayWorkingTimeInfo = DayWorkingTimeInfo;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(44);
var offsets_1 = __webpack_require__(92);
var Margins = (function (_super) {
    tslib_1.__extends(Margins, _super);
    function Margins() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Margins.empty = function () {
        return new Margins(0, 0, 0, 0);
    };
    Margins.prototype.clone = function () {
        return new Margins(this.left, this.right, this.top, this.bottom);
    };
    return Margins;
}(offsets_1.Offsets));
exports.Margins = Margins;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Offsets = (function () {
    function Offsets(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
    Offsets.empty = function () {
        return new Offsets(0, 0, 0, 0);
    };
    Object.defineProperty(Offsets.prototype, "horizontal", {
        get: function () {
            return this.left + this.right;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Offsets.prototype, "vertical", {
        get: function () {
            return this.top + this.bottom;
        },
        enumerable: true,
        configurable: true
    });
    Offsets.fromNumber = function (offset) {
        return new Offsets(offset, offset, offset, offset);
    };
    Offsets.fromOffsets = function (offsets) {
        return new Offsets(offsets.left, offsets.right, offsets.top, offsets.bottom);
    };
    Offsets.fromSide = function (horizontal, vertical) {
        return new Offsets(horizontal, horizontal, vertical, vertical);
    };
    Offsets.prototype.normalize = function () {
        this.left = Math.max(0, this.left);
        this.right = Math.max(0, this.right);
        this.top = Math.max(0, this.top);
        this.bottom = Math.max(0, this.bottom);
        return this;
    };
    Offsets.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Offsets.prototype.isEmpty = function () {
        return this.left === 0 && this.right === 0 && this.top === 0 && this.bottom === 0;
    };
    Offsets.prototype.offset = function (offset) {
        this.left += offset.left;
        this.right += offset.right;
        this.top += offset.top;
        this.bottom += offset.bottom;
        return this;
    };
    Offsets.prototype.multiply = function (multLeft, multRight, multTop, multBottom) {
        switch (arguments.length) {
            case 1: {
                this.left *= multLeft;
                this.right *= multLeft;
                this.top *= multLeft;
                this.bottom *= multLeft;
                return this;
            }
            case 2: {
                this.left *= multLeft;
                this.right *= multLeft;
                this.top *= multRight;
                this.bottom *= multRight;
                return this;
            }
            case 4: {
                this.left *= multLeft;
                this.right *= multRight;
                this.top *= multTop;
                this.bottom *= multBottom;
                return this;
            }
        }
        return this;
    };
    Offsets.prototype.clone = function () {
        return new Offsets(this.left, this.right, this.top, this.bottom);
    };
    Offsets.prototype.copyFrom = function (obj) {
        this.left = obj.left;
        this.right = obj.right;
        this.top = obj.top;
        this.bottom = obj.bottom;
    };
    Offsets.prototype.equals = function (obj) {
        return this.top === obj.top &&
            this.bottom === obj.bottom &&
            this.right === obj.right &&
            this.left === obj.left;
    };
    Offsets.prototype.applyConverter = function (converter) {
        this.left = converter(this.left);
        this.right = converter(this.right);
        this.top = converter(this.top);
        this.bottom = converter(this.bottom);
        return this;
    };
    return Offsets;
}());
exports.Offsets = Offsets;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EtalonSizeValues = void 0;
var EtalonSizeValues = (function () {
    function EtalonSizeValues() {
        this.scaleItemWidths = {};
    }
    return EtalonSizeValues;
}());
exports.EtalonSizeValues = EtalonSizeValues;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEditTooltip = void 0;
var dom_1 = __webpack_require__(2);
var TaskEditTooltip = (function () {
    function TaskEditTooltip(parentElement, owner, cultureInfo) {
        this.parentElement = parentElement;
        this.baseElement = document.createElement("DIV");
        this.baseElement.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_PROGRESS_STATUS;
        parentElement.appendChild(this.baseElement);
        this.owner = owner;
        this.cultureInfo = cultureInfo;
    }
    TaskEditTooltip.prototype.setDefaultTooltip = function (task) {
        this.defaultTooltip = document.createElement("DIV");
        this.defaultTooltip.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_DEFAULT;
        var titleWrapper = document.createElement("DIV");
        titleWrapper.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_TASK_TITLE;
        var title = document.createElement("SPAN");
        titleWrapper.appendChild(title);
        this.defaultTooltip.appendChild(titleWrapper);
        title.innerText = task.title;
        this.defaultTooltip.appendChild(this.getTimeContent(task.start, task.end));
        if (!isNaN(task.progress)) {
            var progressElement = document.createElement("DIV");
            progressElement.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_PROGRESS_STATUS_TIME;
            var progressTitle = document.createElement("SPAN");
            var progressValue = document.createElement("SPAN");
            progressElement.appendChild(progressTitle);
            progressElement.appendChild(progressValue);
            this.defaultTooltip.appendChild(progressElement);
            progressTitle.innerText = (this.cultureInfo.progress ? this.cultureInfo.progress : "Progress") + ": ";
            progressValue.innerText = task.progress + "%";
        }
        this.baseElement.appendChild(this.defaultTooltip);
    };
    TaskEditTooltip.prototype.showInfo = function (task, posX, delay, tooltipTemplateFunction) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        var isTooltipShowing = true;
        this.owner.destroyTemplate(this.baseElement);
        if (tooltipTemplateFunction)
            isTooltipShowing = tooltipTemplateFunction(this.baseElement, task);
        else
            this.setDefaultTooltip(task);
        isTooltipShowing = isTooltipShowing && !!this.baseElement.innerHTML;
        if (isTooltipShowing) {
            var showInfoFunc = function () {
                _this.show(posX, false);
            };
            if (delay)
                this.timerId = setTimeout(showInfoFunc, delay);
            else
                showInfoFunc();
        }
    };
    TaskEditTooltip.prototype.showProgress = function (progress, posX) {
        var _this = this;
        var tooltipTemplateFunction = this.owner.settings.taskProgressTooltipContentTemplate;
        this.owner.destroyTemplate(this.baseElement);
        if (tooltipTemplateFunction)
            tooltipTemplateFunction(this.baseElement, { progress: progress }, function (posX) { _this.showTooltip(posX); }, posX);
        else {
            this.defaultTooltip = document.createElement("DIV");
            this.defaultTooltip.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_DEFAULT;
            this.defaultTooltip.innerText = progress + "%";
            this.baseElement.appendChild(this.defaultTooltip);
            this.show(posX);
        }
    };
    TaskEditTooltip.prototype.showTime = function (start, end, posX) {
        var _this = this;
        var tooltipTemplateFunction = this.owner.settings.taskTimeTooltipContentTemplate;
        this.owner.destroyTemplate(this.baseElement);
        if (tooltipTemplateFunction)
            tooltipTemplateFunction(this.baseElement, { start: start, end: end }, function (posX) { _this.showTooltip(posX); }, posX);
        else {
            this.defaultTooltip = document.createElement("DIV");
            this.defaultTooltip.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_DEFAULT;
            this.defaultTooltip.appendChild(this.getTimeContent(start, end));
            this.baseElement.appendChild(this.defaultTooltip);
            this.show(posX);
        }
    };
    TaskEditTooltip.prototype.showTooltip = function (posX) {
        if (this.baseElement)
            this.show(posX);
    };
    TaskEditTooltip.prototype.show = function (posX, autoHide) {
        var _this = this;
        var _a, _b, _c, _d;
        if (autoHide === void 0) { autoHide = true; }
        var arrowHeight = 5;
        var heightOffset = 15;
        (_a = this.defaultTooltip) === null || _a === void 0 ? void 0 : _a.classList.remove(TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_ARROW_AFTER);
        (_b = this.defaultTooltip) === null || _b === void 0 ? void 0 : _b.classList.remove(TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_ARROW_BEFORE);
        this.baseElement.style.display = "block";
        var absolutePositionY = dom_1.DomUtils.getAbsolutePositionY(this.parentElement);
        var absoluteX = dom_1.DomUtils.getAbsolutePositionX(this.parentElement);
        var leftPosition = posX - absoluteX - 2 * arrowHeight;
        var absoluteDistance = absolutePositionY - this.owner.header.clientHeight - dom_1.DomUtils.getDocumentScrollTop() - heightOffset;
        var isShowingDown = this.baseElement.clientHeight > absoluteDistance || this.baseElement.clientHeight > this.parentElement.offsetTop;
        var topPosition = -this.baseElement.clientHeight - arrowHeight;
        if (isShowingDown) {
            topPosition = this.parentElement.clientHeight + arrowHeight;
            (_c = this.defaultTooltip) === null || _c === void 0 ? void 0 : _c.classList.add(TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_ARROW_AFTER);
        }
        else
            (_d = this.defaultTooltip) === null || _d === void 0 ? void 0 : _d.classList.add(TaskEditTooltip.CLASSNAMES.TASK_EDIT_TOOLTIP_ARROW_BEFORE);
        this.baseElement.style.left = leftPosition + "px";
        this.baseElement.style.top = topPosition + "px";
        if (autoHide) {
            if (this.timerId)
                clearTimeout(this.timerId);
            this.timerId = setTimeout(function () {
                _this.baseElement.style.display = "none";
            }, 1500);
        }
    };
    TaskEditTooltip.prototype.hide = function () {
        this.baseElement.style.display = "none";
        clearTimeout(this.timerId);
    };
    TaskEditTooltip.prototype.getTimeContent = function (start, end) {
        var timeElement = document.createElement("TABLE");
        timeElement.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_PROGRESS_STATUS_TIME;
        var body = document.createElement("TBODY");
        timeElement.appendChild(body);
        var startEl = document.createElement("TR");
        var startTitle = document.createElement("TD");
        var startValue = document.createElement("TD");
        var endEl = document.createElement("TR");
        var endTitle = document.createElement("TD");
        var endValue = document.createElement("TD");
        startEl.appendChild(startTitle);
        startEl.appendChild(startValue);
        endEl.appendChild(endTitle);
        endEl.appendChild(endValue);
        body.appendChild(startEl);
        body.appendChild(endEl);
        startTitle.innerText = (this.cultureInfo.start ? this.cultureInfo.start : "Start") + ": ";
        startValue.innerText = this.formatDate(start);
        endTitle.innerText = (this.cultureInfo.end ? this.cultureInfo.end : "End") + ": ";
        endValue.innerText = this.formatDate(end);
        return timeElement;
    };
    TaskEditTooltip.prototype.formatDate = function (date) {
        return this.owner.getDateFormat(date);
    };
    TaskEditTooltip.CLASSNAMES = {
        TASK_EDIT_PROGRESS_STATUS: "dx-gantt-task-edit-tooltip",
        TASK_EDIT_TOOLTIP_DEFAULT: "dx-gantt-task-edit-tooltip-default",
        TASK_EDIT_TASK_TITLE: "dx-gantt-task-title",
        TASK_EDIT_PROGRESS_STATUS_TIME: "dx-gantt-status-time",
        TASK_EDIT_TOOLTIP_ARROW_BEFORE: "dx-gantt-task-edit-tooltip-before",
        TASK_EDIT_TOOLTIP_ARROW_AFTER: "dx-gantt-task-edit-tooltip-after"
    };
    return TaskEditTooltip;
}());
exports.TaskEditTooltip = TaskEditTooltip;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelManipulator = void 0;
var DependencyManipulator_1 = __webpack_require__(96);
var ResourcesManipulator_1 = __webpack_require__(97);
var TaskManipulator_1 = __webpack_require__(99);
var ModelManipulator = (function () {
    function ModelManipulator(viewModel, dispatcher) {
        this.task = new TaskManipulator_1.TaskManipulator(viewModel, dispatcher);
        this.dependency = new DependencyManipulator_1.TaskDependencyManipulator(viewModel, dispatcher);
        this.resource = new ResourcesManipulator_1.ResourcesManipulator(viewModel, dispatcher);
        this.dispatcher = dispatcher;
    }
    return ModelManipulator;
}());
exports.ModelManipulator = ModelManipulator;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDependencyManipulator = void 0;
var tslib_1 = __webpack_require__(0);
var TaskPropertiesManipulator_1 = __webpack_require__(21);
var TaskDependencyManipulator = (function (_super) {
    tslib_1.__extends(TaskDependencyManipulator, _super);
    function TaskDependencyManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskDependencyManipulator.prototype.insertDependency = function (predecessorId, successorId, type, id) {
        var dependency = this.viewModel.dependencies.createItem();
        dependency.predecessorId = predecessorId;
        dependency.successorId = successorId;
        dependency.type = type;
        if (id)
            dependency.internalId = id;
        dependency.id = dependency.internalId;
        this.viewModel.dependencies.add(dependency);
        this.dispatcher.notifyDependencyInserted(this.getObjectForDataSource(dependency), function (id) { return dependency.id = id; }, this.getErrorCallback());
        this.viewModel.updateVisibleItemDependencies();
        this.viewModel.owner.recreateConnectorLineElement(dependency.internalId, true);
        return dependency;
    };
    TaskDependencyManipulator.prototype.removeDependency = function (dependencyId) {
        var dependency = this.viewModel.dependencies.getItemById(dependencyId);
        this.viewModel.dependencies.remove(dependency);
        this.dispatcher.notifyDependencyRemoved(dependency.id, this.getErrorCallback(), this.viewModel.getDependencyObjectForDataSource(dependency));
        this.viewModel.updateVisibleItemDependencies();
        this.viewModel.owner.recreateConnectorLineElement(dependency.internalId);
        return dependency;
    };
    TaskDependencyManipulator.prototype.getObjectForDataSource = function (dependency) {
        return {
            id: dependency.id,
            predecessorId: this.viewModel.tasks.getItemById(dependency.predecessorId).id,
            successorId: this.viewModel.tasks.getItemById(dependency.successorId).id,
            type: dependency.type
        };
    };
    return TaskDependencyManipulator;
}(TaskPropertiesManipulator_1.BaseManipulator));
exports.TaskDependencyManipulator = TaskDependencyManipulator;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesManipulator = void 0;
var tslib_1 = __webpack_require__(0);
var TaskPropertiesManipulator_1 = __webpack_require__(21);
var ResourcePropertiesManipulator_1 = __webpack_require__(98);
var ResourcesManipulator = (function (_super) {
    tslib_1.__extends(ResourcesManipulator, _super);
    function ResourcesManipulator(viewModel, dispatcher) {
        var _this = _super.call(this, viewModel, dispatcher) || this;
        _this.properties = new ResourcePropertiesManipulator_1.ResourcePropertiesManipulator(viewModel, dispatcher);
        return _this;
    }
    ResourcesManipulator.prototype.create = function (text, color, id, callback) {
        var resource = this.viewModel.resources.createItem();
        resource.text = text;
        if (color)
            resource.color = color;
        if (id)
            resource.internalId = id;
        resource.id = resource.internalId;
        this.viewModel.resources.add(resource);
        this.dispatcher.notifyResourceCreated(this.getResourceObjectForDataSource(resource), function (id) {
            resource.id = id;
            if (callback)
                callback(id);
        }, this.getErrorCallback());
        return resource;
    };
    ResourcesManipulator.prototype.remove = function (resourceId) {
        var resource = this.viewModel.resources.getItemById(resourceId);
        if (!resource)
            throw new Error("Invalid resource id");
        var assignments = this.viewModel.assignments.items.filter(function (a) { return a.resourceId == resourceId; });
        if (assignments.length)
            throw new Error("Can't delete assigned resource");
        this.viewModel.resources.remove(resource);
        this.dispatcher.notifyResourceRemoved(resource.id, this.getErrorCallback(), this.viewModel.getResourceObjectForDataSource(resource));
        return resource;
    };
    ResourcesManipulator.prototype.assign = function (resourceID, taskId, id) {
        var assignment = this.viewModel.assignments.createItem();
        assignment.resourceId = resourceID;
        assignment.taskId = taskId;
        if (id)
            assignment.internalId = id;
        assignment.id = assignment.internalId;
        this.viewModel.assignments.add(assignment);
        this.dispatcher.notifyResourceAssigned(this.getResourceAssignmentObjectForDataSource(assignment), function (id) { return assignment.id = id; }, this.getErrorCallback());
        this.viewModel.updateModel();
        this.viewModel.owner.resetAndUpdate();
        return assignment;
    };
    ResourcesManipulator.prototype.deassig = function (assignmentId) {
        var assignment = this.viewModel.assignments.getItemById(assignmentId);
        this.viewModel.assignments.remove(assignment);
        this.dispatcher.notifyResourceUnassigned(assignment.id, this.getErrorCallback(), this.viewModel.getResourceAssignmentObjectForDataSource(assignment));
        this.viewModel.updateModel();
        this.viewModel.owner.resetAndUpdate();
        return assignment;
    };
    ResourcesManipulator.prototype.getResourceObjectForDataSource = function (resource) {
        return {
            id: resource.id,
            text: resource.text
        };
    };
    ResourcesManipulator.prototype.getResourceAssignmentObjectForDataSource = function (resourceAssignment) {
        return {
            id: resourceAssignment.id,
            taskId: this.viewModel.tasks.getItemById(resourceAssignment.taskId).id,
            resourceId: this.viewModel.resources.getItemById(resourceAssignment.resourceId).id
        };
    };
    return ResourcesManipulator;
}(TaskPropertiesManipulator_1.BaseManipulator));
exports.ResourcesManipulator = ResourcesManipulator;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcePropertyManipulator = exports.ResourcePropertiesManipulator = void 0;
var tslib_1 = __webpack_require__(0);
var TaskPropertiesManipulator_1 = __webpack_require__(21);
var HistoryItemState_1 = __webpack_require__(54);
var ResourcePropertiesManipulator = (function (_super) {
    tslib_1.__extends(ResourcePropertiesManipulator, _super);
    function ResourcePropertiesManipulator(viewModel, dispatcher) {
        var _this = _super.call(this, viewModel, dispatcher) || this;
        _this.color = new ResourceColorManipulator(viewModel, dispatcher);
        return _this;
    }
    return ResourcePropertiesManipulator;
}(TaskPropertiesManipulator_1.BaseManipulator));
exports.ResourcePropertiesManipulator = ResourcePropertiesManipulator;
var ResourcePropertyManipulator = (function (_super) {
    tslib_1.__extends(ResourcePropertyManipulator, _super);
    function ResourcePropertyManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourcePropertyManipulator.prototype.setValue = function (id, newValue) {
        var _this = this;
        var resource = this.viewModel.resources.getItemById(id);
        var oldState = new HistoryItemState_1.HistoryItemState(id, this.getPropertyValue(resource));
        this.setPropertyValue(resource, newValue);
        var assignments = this.viewModel.assignments.items.filter(function (a) { return a.resourceId == resource.internalId; });
        assignments.forEach(function (a) {
            var viewItem = _this.viewModel.findItem(a.taskId);
            var index = viewItem.visibleIndex;
            _this.viewModel.owner.recreateTaskElement(index);
        });
        return oldState;
    };
    ResourcePropertyManipulator.prototype.restoreValue = function (state) {
        var _this = this;
        if (!state)
            return;
        var stateValue = state.value;
        var resource = this.viewModel.resources.getItemById(state.id);
        this.setPropertyValue(resource, stateValue);
        var assignments = this.viewModel.assignments.items.filter(function (a) { return a.resourceId == resource.internalId; });
        assignments.forEach(function (a) {
            var viewItem = _this.viewModel.findItem(a.taskId);
            var index = viewItem.visibleIndex;
            _this.viewModel.owner.recreateTaskElement(index);
        });
    };
    return ResourcePropertyManipulator;
}(TaskPropertiesManipulator_1.BaseManipulator));
exports.ResourcePropertyManipulator = ResourcePropertyManipulator;
var ResourceColorManipulator = (function (_super) {
    tslib_1.__extends(ResourceColorManipulator, _super);
    function ResourceColorManipulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceColorManipulator.prototype.getPropertyValue = function (resource) {
        return resource.color;
    };
    ResourceColorManipulator.prototype.setPropertyValue = function (resource, value) {
        resource.color = value;
        this.dispatcher.notifyResourceColorChanged(resource.id, value, this.getErrorCallback());
    };
    return ResourceColorManipulator;
}(ResourcePropertyManipulator));


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManipulator = void 0;
var tslib_1 = __webpack_require__(0);
var TaskPropertiesManipulator_1 = __webpack_require__(21);
var TaskManipulator = (function (_super) {
    tslib_1.__extends(TaskManipulator, _super);
    function TaskManipulator(viewModel, dispatcher) {
        var _this = _super.call(this, viewModel, dispatcher) || this;
        _this.properties = new TaskPropertiesManipulator_1.TaskPropertiesManipulator(viewModel, dispatcher);
        return _this;
    }
    TaskManipulator.prototype.create = function (data, id, callback) {
        var _this = this;
        var task = this.viewModel.tasks.createItem();
        task.start = data.start;
        task.end = data.end;
        task.title = data.title;
        task.progress = data.progress;
        if (data.color)
            task.color = data.color;
        var parentItem = this.viewModel.tasks.getItemById(data.parentId);
        if (parentItem)
            parentItem.expanded = true;
        task.parentId = data.parentId;
        if (id)
            task.internalId = id;
        task.id = task.internalId;
        this.viewModel.tasks.add(task);
        this.viewModel.updateModel();
        this.dispatcher.notifyTaskCreated(this.getObjectForDataSource(task), function (id) {
            task.id = id;
            if (callback)
                callback();
            if (_this.viewModel.requireFirstLoadParentAutoCalc) {
                var data_1 = _this.viewModel.getCurrentTaskData().map(function (t) {
                    if (t.parentId === "")
                        t.parentId = null;
                    return t;
                });
                _this.dispatcher.notifyParentDataRecalculated(data_1);
            }
        }, this.getErrorCallback());
        this.viewModel.owner.resetAndUpdate();
        return task;
    };
    TaskManipulator.prototype.remove = function (taskId) {
        var task = this.viewModel.tasks.getItemById(taskId);
        if (!task)
            throw new Error("Invalid task id");
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.predecessorId == taskId || d.successorId == taskId; });
        if (dependencies.length)
            throw new Error("Can't delete task with dependency");
        var assignments = this.viewModel.assignments.items.filter(function (a) { return a.taskId == taskId; });
        if (assignments.length)
            throw new Error("Can't delete task with assigned resource");
        this.viewModel.tasks.remove(task);
        this.dispatcher.notifyTaskRemoved(task.id, this.getErrorCallback(), this.viewModel.getTaskObjectForDataSource(task));
        this.viewModel.updateModel();
        this.viewModel.owner.resetAndUpdate();
        return task;
    };
    TaskManipulator.prototype.getObjectForDataSource = function (task) {
        return this.viewModel.getTaskObjectForDataSource(task);
    };
    return TaskManipulator;
}(TaskPropertiesManipulator_1.BaseManipulator));
exports.TaskManipulator = TaskManipulator;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
var HistoryItem_1 = __webpack_require__(15);
var HistoryItemInfo_1 = __webpack_require__(101);
var History = (function () {
    function History() {
        this.historyItems = [];
        this.currentIndex = -1;
        this.currentProcessingItemInfo = null;
        this.transaction = null;
        this.transactionLevel = -1;
    }
    History.prototype.undo = function () {
        if (this.canUndo()) {
            this.activateItem(this.historyItems[this.currentIndex], true);
            this.currentIndex--;
        }
    };
    History.prototype.redo = function () {
        if (this.canRedo()) {
            this.currentIndex++;
            this.activateItem(this.historyItems[this.currentIndex]);
        }
    };
    History.prototype.beginTransaction = function () {
        this.transactionLevel++;
        if (this.transactionLevel == 0)
            this.transaction = new HistoryItem_1.CompositionHistoryItem();
    };
    History.prototype.endTransaction = function () {
        if (--this.transactionLevel >= 0)
            return;
        var transactionLength = this.transaction.historyItems.length;
        if (transactionLength > 1)
            this.addInternal(this.transaction);
        else if (transactionLength == 1)
            this.addInternal(this.transaction.historyItems.pop());
        this.transaction = null;
    };
    History.prototype.addAndRedo = function (historyItem) {
        this.add(historyItem);
        this.activateItem(historyItem);
    };
    History.prototype.add = function (historyItem) {
        if (this.transactionLevel >= 0)
            this.transaction.add(historyItem);
        else
            this.addInternal(historyItem);
    };
    History.prototype.canUndo = function () {
        return this.currentIndex >= 0;
    };
    History.prototype.canRedo = function () {
        return this.currentIndex < this.historyItems.length - 1;
    };
    History.prototype.addInternal = function (historyItem) {
        if (this.currentIndex < this.historyItems.length - 1)
            this.historyItems.splice(this.currentIndex + 1);
        this.historyItems.push(historyItem);
        this.currentIndex++;
        this.deleteOldItems();
    };
    History.prototype.deleteOldItems = function () {
        var exceedItemsCount = this.historyItems.length - History.MAX_HISTORY_ITEM_COUNT;
        if (exceedItemsCount > 0 && this.currentIndex > exceedItemsCount) {
            this.historyItems.splice(0, exceedItemsCount);
            this.currentIndex -= exceedItemsCount;
        }
    };
    History.prototype.clear = function () {
        this.currentIndex = -1;
        this.historyItems = [];
    };
    History.prototype.activateItem = function (historyItem, isUndo) {
        if (isUndo === void 0) { isUndo = false; }
        this.currentProcessingItemInfo = new HistoryItemInfo_1.HistoryItemInfo(historyItem, isUndo);
        if (isUndo)
            historyItem.undo();
        else
            historyItem.redo();
        this.currentProcessingItemInfo = null;
    };
    History.prototype.getCurrentProcessingItemInfo = function () {
        return this.currentProcessingItemInfo;
    };
    History.prototype.rollBackAndRemove = function (info) {
        var item = info.item;
        if (!this.checkAndRemoveItem(item))
            return;
        if (info.isUndo)
            item.redo();
        else if (item instanceof HistoryItem_1.CompositionHistoryItem)
            item.undoItemsQuery();
        else
            item.undo();
    };
    History.prototype.checkAndRemoveItem = function (item) {
        var index = this.historyItems.indexOf(item);
        if (index > -1) {
            this.historyItems.splice(index, 1);
            this.currentIndex--;
        }
        else if (this.transaction) {
            index = this.transaction.historyItems.indexOf(item);
            if (index > -1)
                this.transaction.historyItems.splice(index, 1);
        }
        return index > -1;
    };
    History.MAX_HISTORY_ITEM_COUNT = 100;
    return History;
}());
exports.History = History;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryItemInfo = void 0;
var HistoryItemInfo = (function () {
    function HistoryItemInfo(item, isUndo) {
        if (isUndo === void 0) { isUndo = false; }
        this.item = item;
        this.isUndo = isUndo;
    }
    return HistoryItemInfo;
}());
exports.HistoryItemInfo = HistoryItemInfo;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
var MouseHandler_1 = __webpack_require__(103);
var key_1 = __webpack_require__(108);
var browser_1 = __webpack_require__(5);
var TouchHandler_1 = __webpack_require__(110);
var EventManager = (function () {
    function EventManager(control) {
        this.control = control;
        this.mouseHandler = new MouseHandler_1.MouseHandler(control);
        this.touchHandler = new TouchHandler_1.TouchHandler(control);
    }
    EventManager.prototype.onMouseDown = function (evt) {
        this.mouseHandler.onMouseDown(evt);
    };
    EventManager.prototype.onMouseMove = function (evt) {
        this.mouseHandler.onMouseMove(evt);
    };
    EventManager.prototype.onMouseUp = function (evt) {
        this.mouseHandler.onMouseUp(evt);
    };
    EventManager.prototype.onMouseDblClick = function (evt) {
        this.mouseHandler.onMouseDoubleClick(evt);
    };
    EventManager.prototype.onMouseWheel = function (evt) {
        this.mouseHandler.onMouseWheel(evt);
    };
    EventManager.prototype.onTouchStart = function (evt) {
        this.touchHandler.onTouchStart(evt);
    };
    EventManager.prototype.onTouchEnd = function (evt) {
        this.touchHandler.onTouchEnd(evt);
    };
    EventManager.prototype.onTouchMove = function (evt) {
        this.touchHandler.onTouchMove(evt);
    };
    EventManager.prototype.onDoubleTap = function (evt) {
        this.touchHandler.onDoubleTap(evt);
    };
    EventManager.prototype.onKeyDown = function (evt) {
        if (this.control.isFocus) {
            var code = this.getShortcutCode(evt);
            if (code == (key_1.ModifierKey.Ctrl | key_1.KeyCode.Key_z))
                this.control.history.undo();
            if (code == (key_1.ModifierKey.Ctrl | key_1.KeyCode.Key_y))
                this.control.history.redo();
            if (code == key_1.KeyCode.Delete)
                this.control.taskEditController.deleteSelectedDependency();
        }
    };
    EventManager.prototype.getShortcutCode = function (evt) {
        var keyCode = key_1.KeyUtils.getEventKeyCode(evt);
        var modifiers = 0;
        if (evt.altKey)
            modifiers |= key_1.ModifierKey.Alt;
        if (evt.ctrlKey)
            modifiers |= key_1.ModifierKey.Ctrl;
        if (evt.shiftKey)
            modifiers |= key_1.ModifierKey.Shift;
        if (evt.metaKey && browser_1.Browser.MacOSPlatform)
            modifiers |= key_1.ModifierKey.Meta;
        return modifiers | keyCode;
    };
    return EventManager;
}());
exports.EventManager = EventManager;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHandler = void 0;
var tslib_1 = __webpack_require__(0);
var HandlerBase_1 = __webpack_require__(55);
var TaskAreaManager_1 = __webpack_require__(8);
var MouseHandlerDefaultState_1 = __webpack_require__(104);
var evt_1 = __webpack_require__(6);
var MouseHandlerMoveTaskState_1 = __webpack_require__(105);
var MouseHandlerProgressTaskState_1 = __webpack_require__(106);
var MouseHandlerTimestampTaskState_1 = __webpack_require__(107);
var MouseHandlerDependencyState_1 = __webpack_require__(56);
var MouseHandler = (function (_super) {
    tslib_1.__extends(MouseHandler, _super);
    function MouseHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandler.prototype.onMouseDoubleClick = function (evt) {
        this.state.onMouseDoubleClick(evt);
    };
    MouseHandler.prototype.onMouseDown = function (evt) {
        var source = this.getEventSource(evt_1.EvtUtils.getEventSource(evt));
        switch (source) {
            case TaskAreaManager_1.MouseEventSource.TaskEdit_Frame:
                this.switchState(new MouseHandlerMoveTaskState_1.MouseHandlerMoveTaskState(this));
                break;
            case TaskAreaManager_1.MouseEventSource.TaskEdit_Progress:
                this.switchState(new MouseHandlerProgressTaskState_1.MouseHandlerProgressTaskState(this));
                break;
            case TaskAreaManager_1.MouseEventSource.TaskEdit_Start:
            case TaskAreaManager_1.MouseEventSource.TaskEdit_End:
                this.switchState(new MouseHandlerTimestampTaskState_1.MouseHandlerTimestampTaskState(this));
                break;
            case TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyStart:
            case TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyFinish:
                this.switchState(new MouseHandlerDependencyState_1.MouseHandlerDependencyState(this));
                break;
        }
        this.state.onMouseDown(evt);
    };
    MouseHandler.prototype.onMouseUp = function (evt) {
        this.state.onMouseUp(evt);
    };
    MouseHandler.prototype.onMouseMove = function (evt) {
        this.state.onMouseMove(evt);
    };
    MouseHandler.prototype.onMouseWheel = function (evt) {
        this.state.onMouseWheel(evt);
    };
    MouseHandler.prototype.switchToDefaultState = function () {
        this.state = new MouseHandlerDefaultState_1.MouseHandlerDefaultState(this);
    };
    return MouseHandler;
}(HandlerBase_1.HandlerBase));
exports.MouseHandler = MouseHandler;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GanttMovingHelper = exports.MouseHandlerDefaultState = void 0;
var tslib_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(2);
var evt_1 = __webpack_require__(6);
var MouseHandlerStateBase_1 = __webpack_require__(34);
var GridLayoutCalculator_1 = __webpack_require__(14);
var point_1 = __webpack_require__(3);
var browser_1 = __webpack_require__(5);
var MouseHandlerDefaultState = (function (_super) {
    tslib_1.__extends(MouseHandlerDefaultState, _super);
    function MouseHandlerDefaultState(handler) {
        var _this = _super.call(this, handler) || this;
        _this.isInScrolling = false;
        _this.ganttMovingHelper = new GanttMovingHelper(_this.handler.control);
        return _this;
    }
    MouseHandlerDefaultState.prototype.onMouseDown = function (evt) {
        evt.preventDefault();
        var source = evt_1.EvtUtils.getEventSource(evt);
        if (dom_1.DomUtils.hasClassName(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL) ||
            dom_1.DomUtils.hasClassName(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_VERTICAL)) {
            var id = source.getAttribute("dependency-id");
            if (this.handler.control.taskEditController.dependencyId != id) {
                this.handler.control.selectDependency(id);
                if (evt instanceof PointerEvent) {
                    var info = {
                        event: evt,
                        type: "dependency",
                        key: id,
                        position: new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt))
                    };
                    this.handler.control.ganttOwner.showPopupMenu(info);
                }
            }
        }
        else {
            if (evt_1.EvtUtils.isLeftButtonPressed(evt))
                this.ganttMovingHelper.startMoving(evt);
            if (this.handler.control.taskEditController.dependencyId != null)
                this.handler.control.selectDependency(null);
        }
    };
    MouseHandlerDefaultState.prototype.onMouseUp = function (evt) {
        this.ganttMovingHelper.onMouseUp(evt);
    };
    MouseHandlerDefaultState.prototype.onMouseMove = function (evt) {
        if (this.ganttMovingHelper.movingInfo) {
            this.handler.control.taskEditController.hide();
            this.ganttMovingHelper.onMouseMove(evt);
            evt.preventDefault();
        }
    };
    MouseHandlerDefaultState.prototype.onMouseWheel = function (evt) {
        var _this = this;
        if (evt.ctrlKey) {
            evt.preventDefault();
            evt.stopPropagation();
            if (!this.isInScrolling) {
                this.isInScrolling = true;
                setTimeout(function () { _this.isInScrolling = false; }, 50);
                var increase = evt_1.EvtUtils.getWheelDelta(evt) > 0;
                var leftPos = evt_1.EvtUtils.getEventX(evt) - dom_1.DomUtils.getAbsolutePositionX(this.handler.control.taskAreaContainer.getElement());
                if (increase)
                    this.handler.control.zoomIn(leftPos);
                else
                    this.handler.control.zoomOut(leftPos);
            }
        }
    };
    return MouseHandlerDefaultState;
}(MouseHandlerStateBase_1.MouseHandlerStateBase));
exports.MouseHandlerDefaultState = MouseHandlerDefaultState;
var GanttMovingHelper = (function () {
    function GanttMovingHelper(gantt) {
        this.gantt = gantt;
        this.movingInfo = null;
    }
    GanttMovingHelper.prototype.startMoving = function (e) {
        this.movingInfo = this.calcMovingInfo(e);
        this.updateGanttAreaCursor(true);
    };
    GanttMovingHelper.prototype.cancelMoving = function () {
        this.movingInfo = null;
    };
    GanttMovingHelper.prototype.onMouseMove = function (e) {
        this.move(e);
    };
    GanttMovingHelper.prototype.onMouseUp = function (e) {
        this.cancelMoving();
        this.updateGanttAreaCursor(false);
    };
    GanttMovingHelper.prototype.move = function (e) {
        this.updateScrollPosition(e);
    };
    GanttMovingHelper.prototype.updateScrollPosition = function (e) {
        var newEventX = Math.round(evt_1.EvtUtils.getEventX(e));
        var newEventY = Math.round(evt_1.EvtUtils.getEventY(e));
        var deltaX = newEventX - this.movingInfo.eventX;
        var deltaY = newEventY - this.movingInfo.eventY;
        var dirX = deltaX < 0 ? -1 : 1;
        var dirY = deltaY < 0 ? -1 : 1;
        var maxDeltaX = dirX < 0 ? this.movingInfo.maxRightDelta : this.movingInfo.maxLeftDelta;
        var maxDeltaY = dirY < 0 ? this.movingInfo.maxBottomDelta : this.movingInfo.maxTopDelta;
        if (Math.abs(deltaX) > maxDeltaX)
            deltaX = maxDeltaX * dirX;
        if (Math.abs(deltaY) > maxDeltaY)
            deltaY = maxDeltaY * dirY;
        var newScrollLeft = this.movingInfo.scrollLeft - deltaX;
        var newScrollTop = this.movingInfo.scrollTop - deltaY;
        var taskAreaContainer = this.gantt.taskAreaContainer;
        if (taskAreaContainer.scrollLeft !== newScrollLeft)
            taskAreaContainer.scrollLeft = newScrollLeft;
        if (taskAreaContainer.scrollTop !== newScrollTop)
            taskAreaContainer.scrollTop = newScrollTop;
    };
    GanttMovingHelper.prototype.calcMovingInfo = function (e) {
        var taskAreaContainer = this.gantt.taskAreaContainer;
        return {
            eventX: evt_1.EvtUtils.getEventX(e),
            eventY: evt_1.EvtUtils.getEventY(e),
            scrollLeft: taskAreaContainer.scrollLeft,
            scrollTop: taskAreaContainer.scrollTop,
            maxLeftDelta: taskAreaContainer.scrollLeft,
            maxRightDelta: taskAreaContainer.scrollWidth - taskAreaContainer.scrollLeft - taskAreaContainer.getElement().offsetWidth,
            maxTopDelta: taskAreaContainer.scrollTop,
            maxBottomDelta: taskAreaContainer.scrollHeight - taskAreaContainer.scrollTop - taskAreaContainer.getElement().offsetHeight
        };
    };
    GanttMovingHelper.prototype.updateGanttAreaCursor = function (drag) {
        if (browser_1.Browser.IE)
            this.gantt.taskAreaContainer.getElement().style.cursor = drag ? "move" : "default";
        else
            this.gantt.taskAreaContainer.getElement().style.cursor = drag ? "grabbing" : "default";
    };
    return GanttMovingHelper;
}());
exports.GanttMovingHelper = GanttMovingHelper;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHandlerMoveTaskState = void 0;
var tslib_1 = __webpack_require__(0);
var MouseHandlerDragTaskBaseState_1 = __webpack_require__(35);
var MouseHandlerMoveTaskState = (function (_super) {
    tslib_1.__extends(MouseHandlerMoveTaskState, _super);
    function MouseHandlerMoveTaskState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerMoveTaskState.prototype.onMouseUpInternal = function (_evt) {
        this.handler.control.taskEditController.confirmMove();
    };
    MouseHandlerMoveTaskState.prototype.onMouseMoveInternal = function (position) {
        if (!this.handler.control.taskEditController.processMove(position.x - this.currentPosition.x))
            this.handler.switchToDefaultState();
    };
    return MouseHandlerMoveTaskState;
}(MouseHandlerDragTaskBaseState_1.MouseHandlerDragBaseState));
exports.MouseHandlerMoveTaskState = MouseHandlerMoveTaskState;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHandlerProgressTaskState = void 0;
var tslib_1 = __webpack_require__(0);
var MouseHandlerDragTaskBaseState_1 = __webpack_require__(35);
var MouseHandlerProgressTaskState = (function (_super) {
    tslib_1.__extends(MouseHandlerProgressTaskState, _super);
    function MouseHandlerProgressTaskState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerProgressTaskState.prototype.onMouseUpInternal = function (_evt) {
        this.handler.control.taskEditController.confirmProgress();
    };
    MouseHandlerProgressTaskState.prototype.onMouseMoveInternal = function (position) {
        var relativePosition = this.getRelativePos(position);
        this.handler.control.taskEditController.processProgress(relativePosition);
    };
    return MouseHandlerProgressTaskState;
}(MouseHandlerDragTaskBaseState_1.MouseHandlerDragBaseState));
exports.MouseHandlerProgressTaskState = MouseHandlerProgressTaskState;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseHandlerTimestampTaskState = void 0;
var tslib_1 = __webpack_require__(0);
var TaskAreaManager_1 = __webpack_require__(8);
var evt_1 = __webpack_require__(6);
var MouseHandlerDragTaskBaseState_1 = __webpack_require__(35);
var MouseHandlerTimestampTaskState = (function (_super) {
    tslib_1.__extends(MouseHandlerTimestampTaskState, _super);
    function MouseHandlerTimestampTaskState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerTimestampTaskState.prototype.onMouseDown = function (evt) {
        _super.prototype.onMouseDown.call(this, evt);
        this.source = this.handler.getEventSource(evt_1.EvtUtils.getEventSource(evt));
    };
    MouseHandlerTimestampTaskState.prototype.onMouseUpInternal = function (_evt) {
        if (this.source == TaskAreaManager_1.MouseEventSource.TaskEdit_Start)
            this.handler.control.taskEditController.confirmStart();
        else
            this.handler.control.taskEditController.confirmEnd();
    };
    MouseHandlerTimestampTaskState.prototype.onMouseMoveInternal = function (position) {
        var relativePosition = this.getRelativePos(position);
        if (this.source == TaskAreaManager_1.MouseEventSource.TaskEdit_Start)
            this.handler.control.taskEditController.processStart(relativePosition);
        if (this.source == TaskAreaManager_1.MouseEventSource.TaskEdit_End)
            this.handler.control.taskEditController.processEnd(relativePosition);
    };
    return MouseHandlerTimestampTaskState;
}(MouseHandlerDragTaskBaseState_1.MouseHandlerDragBaseState));
exports.MouseHandlerTimestampTaskState = MouseHandlerTimestampTaskState;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = __webpack_require__(5);
var encode_1 = __webpack_require__(109);
var string_1 = __webpack_require__(32);
var KeyUtils = (function () {
    function KeyUtils() {
    }
    KeyUtils.getKeyModifiers = function (evt) {
        var result = 0;
        if (evt.altKey)
            result |= ModifierKey.Alt;
        if (evt.ctrlKey)
            result |= ModifierKey.Ctrl;
        if (evt.shiftKey)
            result |= ModifierKey.Shift;
        return result;
    };
    KeyUtils.getShortcutCode = function (keyCode, isCtrlKey, isShiftKey, isAltKey, isMetaKey) {
        var value = keyCode;
        value |= isCtrlKey ? ModifierKey.Ctrl : 0;
        value |= isShiftKey ? ModifierKey.Shift : 0;
        value |= isAltKey ? ModifierKey.Alt : 0;
        value |= isMetaKey ? ModifierKey.Meta : 0;
        return value;
    };
    KeyUtils.getShortcutCodeByEvent = function (evt) {
        return KeyUtils.getShortcutCode(KeyUtils.getEventKeyCode(evt), evt.ctrlKey, evt.shiftKey, evt.altKey, browser_1.Browser.MacOSPlatform ? evt.metaKey : false);
    };
    KeyUtils.getEventKeyCode = function (evt) {
        return browser_1.Browser.NetscapeFamily || browser_1.Browser.Opera ? evt.which : evt.keyCode;
    };
    KeyUtils.parseShortcutString = function (shortcutString) {
        if (!shortcutString)
            return 0;
        var isCtrlKey = false;
        var isShiftKey = false;
        var isAltKey = false;
        var isMetaKey = false;
        var keyCode = null;
        var shcKeys = shortcutString.toString().split('+');
        if (shcKeys.length > 0) {
            for (var i = 0; i < shcKeys.length; i++) {
                var key = string_1.StringUtils.trim(shcKeys[i].toUpperCase());
                switch (key) {
                    case 'CONTROL':
                    case 'CONTROLKEY':
                    case 'CTRL':
                        isCtrlKey = true;
                        break;
                    case 'SHIFT':
                    case 'SHIFTKEY':
                        isShiftKey = true;
                        break;
                    case 'ALT':
                        isAltKey = true;
                        break;
                    case 'CMD':
                        isMetaKey = true;
                        break;
                    case 'F1':
                        keyCode = KeyCode.F1;
                        break;
                    case 'F2':
                        keyCode = KeyCode.F2;
                        break;
                    case 'F3':
                        keyCode = KeyCode.F3;
                        break;
                    case 'F4':
                        keyCode = KeyCode.F4;
                        break;
                    case 'F5':
                        keyCode = KeyCode.F5;
                        break;
                    case 'F6':
                        keyCode = KeyCode.F6;
                        break;
                    case 'F7':
                        keyCode = KeyCode.F7;
                        break;
                    case 'F8':
                        keyCode = KeyCode.F8;
                        break;
                    case 'F9':
                        keyCode = KeyCode.F9;
                        break;
                    case 'F10':
                        keyCode = KeyCode.F10;
                        break;
                    case 'F11':
                        keyCode = KeyCode.F11;
                        break;
                    case 'F12':
                        keyCode = KeyCode.F12;
                        break;
                    case 'RETURN':
                    case 'ENTER':
                        keyCode = KeyCode.Enter;
                        break;
                    case 'HOME':
                        keyCode = KeyCode.Home;
                        break;
                    case 'END':
                        keyCode = KeyCode.End;
                        break;
                    case 'LEFT':
                        keyCode = KeyCode.Left;
                        break;
                    case 'RIGHT':
                        keyCode = KeyCode.Right;
                        break;
                    case 'UP':
                        keyCode = KeyCode.Up;
                        break;
                    case 'DOWN':
                        keyCode = KeyCode.Down;
                        break;
                    case 'PAGEUP':
                        keyCode = KeyCode.PageUp;
                        break;
                    case 'PAGEDOWN':
                        keyCode = KeyCode.PageDown;
                        break;
                    case 'SPACE':
                        keyCode = KeyCode.Space;
                        break;
                    case 'TAB':
                        keyCode = KeyCode.Tab;
                        break;
                    case 'BACKSPACE':
                    case 'BACK':
                        keyCode = KeyCode.Backspace;
                        break;
                    case 'CONTEXT':
                        keyCode = KeyCode.ContextMenu;
                        break;
                    case 'ESCAPE':
                    case 'ESC':
                        keyCode = KeyCode.Esc;
                        break;
                    case 'DELETE':
                    case 'DEL':
                        keyCode = KeyCode.Delete;
                        break;
                    case 'INSERT':
                    case 'INS':
                        keyCode = KeyCode.Insert;
                        break;
                    case 'PLUS':
                        keyCode = '+'.charCodeAt(0);
                        break;
                    default:
                        keyCode = key.charCodeAt(0);
                        break;
                }
            }
        }
        else
            alert(encode_1.EncodeUtils.decodeViaTextArea('Invalid shortcut'));
        return KeyUtils.getShortcutCode(keyCode, isCtrlKey, isShiftKey, isAltKey, isMetaKey);
    };
    return KeyUtils;
}());
exports.KeyUtils = KeyUtils;
var ModifierKey;
(function (ModifierKey) {
    ModifierKey[ModifierKey["None"] = 0] = "None";
    ModifierKey[ModifierKey["Ctrl"] = 65536] = "Ctrl";
    ModifierKey[ModifierKey["Shift"] = 262144] = "Shift";
    ModifierKey[ModifierKey["Alt"] = 1048576] = "Alt";
    ModifierKey[ModifierKey["Meta"] = 16777216] = "Meta";
})(ModifierKey = exports.ModifierKey || (exports.ModifierKey = {}));
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
    KeyCode[KeyCode["Tab"] = 9] = "Tab";
    KeyCode[KeyCode["Enter"] = 13] = "Enter";
    KeyCode[KeyCode["Pause"] = 19] = "Pause";
    KeyCode[KeyCode["CapsLock"] = 20] = "CapsLock";
    KeyCode[KeyCode["Esc"] = 27] = "Esc";
    KeyCode[KeyCode["Space"] = 32] = "Space";
    KeyCode[KeyCode["PageUp"] = 33] = "PageUp";
    KeyCode[KeyCode["PageDown"] = 34] = "PageDown";
    KeyCode[KeyCode["End"] = 35] = "End";
    KeyCode[KeyCode["Home"] = 36] = "Home";
    KeyCode[KeyCode["Left"] = 37] = "Left";
    KeyCode[KeyCode["Up"] = 38] = "Up";
    KeyCode[KeyCode["Right"] = 39] = "Right";
    KeyCode[KeyCode["Down"] = 40] = "Down";
    KeyCode[KeyCode["Insert"] = 45] = "Insert";
    KeyCode[KeyCode["Delete"] = 46] = "Delete";
    KeyCode[KeyCode["Key_0"] = 48] = "Key_0";
    KeyCode[KeyCode["Key_1"] = 49] = "Key_1";
    KeyCode[KeyCode["Key_2"] = 50] = "Key_2";
    KeyCode[KeyCode["Key_3"] = 51] = "Key_3";
    KeyCode[KeyCode["Key_4"] = 52] = "Key_4";
    KeyCode[KeyCode["Key_5"] = 53] = "Key_5";
    KeyCode[KeyCode["Key_6"] = 54] = "Key_6";
    KeyCode[KeyCode["Key_7"] = 55] = "Key_7";
    KeyCode[KeyCode["Key_8"] = 56] = "Key_8";
    KeyCode[KeyCode["Key_9"] = 57] = "Key_9";
    KeyCode[KeyCode["Key_a"] = 65] = "Key_a";
    KeyCode[KeyCode["Key_b"] = 66] = "Key_b";
    KeyCode[KeyCode["Key_c"] = 67] = "Key_c";
    KeyCode[KeyCode["Key_d"] = 68] = "Key_d";
    KeyCode[KeyCode["Key_e"] = 69] = "Key_e";
    KeyCode[KeyCode["Key_f"] = 70] = "Key_f";
    KeyCode[KeyCode["Key_g"] = 71] = "Key_g";
    KeyCode[KeyCode["Key_h"] = 72] = "Key_h";
    KeyCode[KeyCode["Key_i"] = 73] = "Key_i";
    KeyCode[KeyCode["Key_j"] = 74] = "Key_j";
    KeyCode[KeyCode["Key_k"] = 75] = "Key_k";
    KeyCode[KeyCode["Key_l"] = 76] = "Key_l";
    KeyCode[KeyCode["Key_m"] = 77] = "Key_m";
    KeyCode[KeyCode["Key_n"] = 78] = "Key_n";
    KeyCode[KeyCode["Key_o"] = 79] = "Key_o";
    KeyCode[KeyCode["Key_p"] = 80] = "Key_p";
    KeyCode[KeyCode["Key_q"] = 81] = "Key_q";
    KeyCode[KeyCode["Key_r"] = 82] = "Key_r";
    KeyCode[KeyCode["Key_s"] = 83] = "Key_s";
    KeyCode[KeyCode["Key_t"] = 84] = "Key_t";
    KeyCode[KeyCode["Key_u"] = 85] = "Key_u";
    KeyCode[KeyCode["Key_v"] = 86] = "Key_v";
    KeyCode[KeyCode["Key_w"] = 87] = "Key_w";
    KeyCode[KeyCode["Key_x"] = 88] = "Key_x";
    KeyCode[KeyCode["Key_y"] = 89] = "Key_y";
    KeyCode[KeyCode["Key_z"] = 90] = "Key_z";
    KeyCode[KeyCode["Windows"] = 91] = "Windows";
    KeyCode[KeyCode["ContextMenu"] = 93] = "ContextMenu";
    KeyCode[KeyCode["Numpad_0"] = 96] = "Numpad_0";
    KeyCode[KeyCode["Numpad_1"] = 97] = "Numpad_1";
    KeyCode[KeyCode["Numpad_2"] = 98] = "Numpad_2";
    KeyCode[KeyCode["Numpad_3"] = 99] = "Numpad_3";
    KeyCode[KeyCode["Numpad_4"] = 100] = "Numpad_4";
    KeyCode[KeyCode["Numpad_5"] = 101] = "Numpad_5";
    KeyCode[KeyCode["Numpad_6"] = 102] = "Numpad_6";
    KeyCode[KeyCode["Numpad_7"] = 103] = "Numpad_7";
    KeyCode[KeyCode["Numpad_8"] = 104] = "Numpad_8";
    KeyCode[KeyCode["Numpad_9"] = 105] = "Numpad_9";
    KeyCode[KeyCode["Multiply"] = 106] = "Multiply";
    KeyCode[KeyCode["Add"] = 107] = "Add";
    KeyCode[KeyCode["Subtract"] = 109] = "Subtract";
    KeyCode[KeyCode["Decimal"] = 110] = "Decimal";
    KeyCode[KeyCode["Divide"] = 111] = "Divide";
    KeyCode[KeyCode["F1"] = 112] = "F1";
    KeyCode[KeyCode["F2"] = 113] = "F2";
    KeyCode[KeyCode["F3"] = 114] = "F3";
    KeyCode[KeyCode["F4"] = 115] = "F4";
    KeyCode[KeyCode["F5"] = 116] = "F5";
    KeyCode[KeyCode["F6"] = 117] = "F6";
    KeyCode[KeyCode["F7"] = 118] = "F7";
    KeyCode[KeyCode["F8"] = 119] = "F8";
    KeyCode[KeyCode["F9"] = 120] = "F9";
    KeyCode[KeyCode["F10"] = 121] = "F10";
    KeyCode[KeyCode["F11"] = 122] = "F11";
    KeyCode[KeyCode["F12"] = 123] = "F12";
    KeyCode[KeyCode["NumLock"] = 144] = "NumLock";
    KeyCode[KeyCode["ScrollLock"] = 145] = "ScrollLock";
    KeyCode[KeyCode["Semicolon"] = 186] = "Semicolon";
    KeyCode[KeyCode["Equals"] = 187] = "Equals";
    KeyCode[KeyCode["Comma"] = 188] = "Comma";
    KeyCode[KeyCode["Dash"] = 189] = "Dash";
    KeyCode[KeyCode["Period"] = 190] = "Period";
    KeyCode[KeyCode["ForwardSlash"] = 191] = "ForwardSlash";
    KeyCode[KeyCode["GraveAccent"] = 192] = "GraveAccent";
    KeyCode[KeyCode["OpenBracket"] = 219] = "OpenBracket";
    KeyCode[KeyCode["BackSlash"] = 220] = "BackSlash";
    KeyCode[KeyCode["CloseBracket"] = 221] = "CloseBracket";
    KeyCode[KeyCode["SingleQuote"] = 222] = "SingleQuote";
})(KeyCode = exports.KeyCode || (exports.KeyCode = {}));


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EncodeUtils = (function () {
    function EncodeUtils() {
    }
    EncodeUtils.encodeHtml = function (text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };
    EncodeUtils.decodeHtml = function (text) {
        return text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    };
    EncodeUtils.prepareTextForRequest = function (text) {
        return text
            .replace(/%/g, '%25')
            .replace(/&/g, '%26amp;')
            .replace(/\+/g, '%2B')
            .replace(/</g, '%26lt;')
            .replace(/>/g, '%26gt;')
            .replace(/"/g, '%26quot;');
    };
    EncodeUtils.prepareTextForCallBackRequest = function (text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };
    EncodeUtils.decodeViaTextArea = function (html) {
        var textArea = document.createElement('TEXTAREA');
        textArea.innerHTML = html;
        return textArea.value;
    };
    return EncodeUtils;
}());
exports.EncodeUtils = EncodeUtils;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchHandler = void 0;
var tslib_1 = __webpack_require__(0);
var HandlerBase_1 = __webpack_require__(55);
var evt_1 = __webpack_require__(6);
var TaskAreaManager_1 = __webpack_require__(8);
var TouchHandlerMoveTaskState_1 = __webpack_require__(111);
var TouchHandlerDefaultState_1 = __webpack_require__(112);
var TouchHandlerProgressTaskState_1 = __webpack_require__(113);
var TouchHandlerTimestampTaskState_1 = __webpack_require__(114);
var TouchHandlerDependencyState_1 = __webpack_require__(115);
var TouchHandlerZoomState_1 = __webpack_require__(116);
var TouchHandler = (function (_super) {
    tslib_1.__extends(TouchHandler, _super);
    function TouchHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandler.prototype.onTouchStart = function (evt) {
        if (evt.touches.length > 1)
            evt.preventDefault();
        var source = this.getEventSource(evt_1.EvtUtils.getEventSource(evt));
        switch (source) {
            case TaskAreaManager_1.MouseEventSource.TaskEdit_Frame:
                this.switchState(new TouchHandlerMoveTaskState_1.TouchHandlerMoveTaskState(this));
                break;
            case TaskAreaManager_1.MouseEventSource.TaskEdit_Progress:
                this.switchState(new TouchHandlerProgressTaskState_1.TouchHandlerProgressTaskState(this));
                break;
            case TaskAreaManager_1.MouseEventSource.TaskEdit_Start:
            case TaskAreaManager_1.MouseEventSource.TaskEdit_End:
                this.switchState(new TouchHandlerTimestampTaskState_1.TouchHandlerTimestampTaskState(this));
                break;
            case TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyStart:
            case TaskAreaManager_1.MouseEventSource.TaskEdit_DependencyFinish:
                this.switchState(new TouchHandlerDependencyState_1.TouchHandlerDependencyState(this));
                break;
        }
        this.state.onTouchStart(evt);
    };
    TouchHandler.prototype.onDoubleTap = function (evt) {
        this.state.onDoubleTap(evt);
    };
    TouchHandler.prototype.onTouchEnd = function (evt) {
        this.state.onTouchEnd(evt);
    };
    TouchHandler.prototype.onTouchMove = function (evt) {
        if (evt.touches.length > 1)
            if (!(this.state instanceof TouchHandlerZoomState_1.TouchHandlerZoomState))
                this.switchState(new TouchHandlerZoomState_1.TouchHandlerZoomState(this));
        this.state.onTouchMove(evt);
    };
    TouchHandler.prototype.switchToDefaultState = function () {
        this.state = new TouchHandlerDefaultState_1.TouchHandlerDefaultState(this);
    };
    return TouchHandler;
}(HandlerBase_1.HandlerBase));
exports.TouchHandler = TouchHandler;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchHandlerMoveTaskState = void 0;
var tslib_1 = __webpack_require__(0);
var TouchHandlerDragBaseState_1 = __webpack_require__(36);
var TouchHandlerMoveTaskState = (function (_super) {
    tslib_1.__extends(TouchHandlerMoveTaskState, _super);
    function TouchHandlerMoveTaskState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerMoveTaskState.prototype.onTouchEndInternal = function (_evt) {
        this.handler.control.taskEditController.confirmMove();
    };
    TouchHandlerMoveTaskState.prototype.onTouchMoveInternal = function (position) {
        if (!this.handler.control.taskEditController.processMove(position.x - this.currentPosition.x))
            this.handler.switchToDefaultState();
    };
    return TouchHandlerMoveTaskState;
}(TouchHandlerDragBaseState_1.TouchHandlerDragBaseState));
exports.TouchHandlerMoveTaskState = TouchHandlerMoveTaskState;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchHandlerDefaultState = void 0;
var tslib_1 = __webpack_require__(0);
var point_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(2);
var evt_1 = __webpack_require__(6);
var touch_1 = __webpack_require__(18);
var GridLayoutCalculator_1 = __webpack_require__(14);
var HandlerStateBase_1 = __webpack_require__(22);
var TouchHandlerDefaultState = (function (_super) {
    tslib_1.__extends(TouchHandlerDefaultState, _super);
    function TouchHandlerDefaultState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerDefaultState.prototype.onTouchStart = function (evt) {
        var _this = this;
        this.preventSelect = false;
        clearTimeout(this.popupTimer);
        if (evt.touches.length === 1) {
            var source = evt_1.EvtUtils.getEventSource(evt);
            var info_1 = {
                event: evt,
                position: new point_1.Point(evt_1.EvtUtils.getEventX(evt), evt_1.EvtUtils.getEventY(evt))
            };
            if (dom_1.DomUtils.hasClassName(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL) ||
                dom_1.DomUtils.hasClassName(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_VERTICAL)) {
                this.preventSelect = true;
                var id = source.getAttribute("dependency-id");
                if (this.handler.control.taskEditController.dependencyId != id)
                    this.handler.control.selectDependency(id);
                info_1["type"] = "dependency";
                info_1["key"] = id;
                this.handler.control.ganttOwner.showPopupMenu(info_1);
            }
            else
                this.popupTimer = setTimeout(function () {
                    var index = _this.getTaskIndex(evt);
                    _this.changeTaskSelection(index);
                    var item = _this.handler.control.viewModel.items[index];
                    info_1["type"] = "task";
                    info_1["key"] = item && item.task.id;
                    _this.handler.control.ganttOwner.showPopupMenu(info_1);
                }, 500);
        }
    };
    TouchHandlerDefaultState.prototype.onDoubleTap = function (_evt) { };
    TouchHandlerDefaultState.prototype.onTouchEnd = function (evt) {
        clearTimeout(this.popupTimer);
        if (!this.preventSelect)
            this.changeTaskSelection(this.getTaskIndex(evt));
    };
    TouchHandlerDefaultState.prototype.onTouchMove = function (_evt) {
        clearTimeout(this.popupTimer);
        this.preventSelect = true;
    };
    TouchHandlerDefaultState.prototype.getTaskIndex = function (evt) {
        var y = touch_1.TouchUtils.getEventY(evt);
        var taskAreaY = dom_1.DomUtils.getAbsolutePositionY(this.handler.control.taskArea);
        var relativeY = y - taskAreaY;
        return Math.floor(relativeY / this.handler.control.tickSize.height);
    };
    TouchHandlerDefaultState.prototype.changeTaskSelection = function (index) {
        var clickedTask = this.handler.control.viewModel.items[index];
        if (clickedTask)
            this.handler.control.ganttOwner.changeGanttTaskSelection(clickedTask.task.id, true);
    };
    return TouchHandlerDefaultState;
}(HandlerStateBase_1.HandlerStateBase));
exports.TouchHandlerDefaultState = TouchHandlerDefaultState;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchHandlerProgressTaskState = void 0;
var tslib_1 = __webpack_require__(0);
var TouchHandlerDragBaseState_1 = __webpack_require__(36);
var TouchHandlerProgressTaskState = (function (_super) {
    tslib_1.__extends(TouchHandlerProgressTaskState, _super);
    function TouchHandlerProgressTaskState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerProgressTaskState.prototype.onTouchEndInternal = function (_evt) {
        this.handler.control.taskEditController.confirmProgress();
    };
    TouchHandlerProgressTaskState.prototype.onTouchMoveInternal = function (position) {
        var relativePosition = this.getRelativePos(position);
        this.handler.control.taskEditController.processProgress(relativePosition);
    };
    return TouchHandlerProgressTaskState;
}(TouchHandlerDragBaseState_1.TouchHandlerDragBaseState));
exports.TouchHandlerProgressTaskState = TouchHandlerProgressTaskState;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchHandlerTimestampTaskState = void 0;
var tslib_1 = __webpack_require__(0);
var TouchHandlerDragBaseState_1 = __webpack_require__(36);
var TaskAreaManager_1 = __webpack_require__(8);
var evt_1 = __webpack_require__(6);
var TouchHandlerTimestampTaskState = (function (_super) {
    tslib_1.__extends(TouchHandlerTimestampTaskState, _super);
    function TouchHandlerTimestampTaskState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerTimestampTaskState.prototype.onTouchStart = function (evt) {
        _super.prototype.onTouchStart.call(this, evt);
        this.source = this.handler.getEventSource(evt_1.EvtUtils.getEventSource(evt));
    };
    TouchHandlerTimestampTaskState.prototype.onTouchEndInternal = function (_evt) {
        if (this.source == TaskAreaManager_1.MouseEventSource.TaskEdit_Start)
            this.handler.control.taskEditController.confirmStart();
        else
            this.handler.control.taskEditController.confirmEnd();
    };
    TouchHandlerTimestampTaskState.prototype.onTouchMoveInternal = function (position) {
        var relativePosition = this.getRelativePos(position);
        if (this.source == TaskAreaManager_1.MouseEventSource.TaskEdit_Start)
            this.handler.control.taskEditController.processStart(relativePosition);
        if (this.source == TaskAreaManager_1.MouseEventSource.TaskEdit_End)
            this.handler.control.taskEditController.processEnd(relativePosition);
    };
    return TouchHandlerTimestampTaskState;
}(TouchHandlerDragBaseState_1.TouchHandlerDragBaseState));
exports.TouchHandlerTimestampTaskState = TouchHandlerTimestampTaskState;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchHandlerDependencyState = void 0;
var tslib_1 = __webpack_require__(0);
var TouchHandlerStateBase_1 = __webpack_require__(57);
var TaskAreaManager_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(2);
var evt_1 = __webpack_require__(6);
var point_1 = __webpack_require__(3);
var MouseHandlerDependencyState_1 = __webpack_require__(56);
var touch_1 = __webpack_require__(18);
var TouchHandlerDependencyState = (function (_super) {
    tslib_1.__extends(TouchHandlerDependencyState, _super);
    function TouchHandlerDependencyState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerDependencyState.prototype.onTouchStart = function (evt) {
        evt.preventDefault();
        var sourceElement = evt_1.EvtUtils.getEventSource(evt);
        this.source = this.handler.getEventSource(sourceElement);
        var pos = this.getRelativePos(new point_1.Point(dom_1.DomUtils.getAbsolutePositionX(sourceElement) + sourceElement.clientWidth / 2, dom_1.DomUtils.getAbsolutePositionY(sourceElement) + sourceElement.clientHeight / 2));
        this.handler.control.taskEditController.startDependency(pos);
    };
    TouchHandlerDependencyState.prototype.onTouchEnd = function (evt) {
        var relativePosStart = this.getRelativePos(new point_1.Point(dom_1.DomUtils.getAbsolutePositionX(this.handler.control.taskEditController.dependencySuccessorStart) + this.handler.control.taskEditController.dependencySuccessorStart.clientWidth / 2, dom_1.DomUtils.getAbsolutePositionY(this.handler.control.taskEditController.dependencySuccessorStart) + this.handler.control.taskEditController.dependencySuccessorStart.clientHeight / 2));
        var relativePosEnd = this.getRelativePos(new point_1.Point(dom_1.DomUtils.getAbsolutePositionX(this.handler.control.taskEditController.dependencySuccessorFinish) + this.handler.control.taskEditController.dependencySuccessorFinish.clientWidth / 2, dom_1.DomUtils.getAbsolutePositionY(this.handler.control.taskEditController.dependencySuccessorFinish) + this.handler.control.taskEditController.dependencySuccessorFinish.clientHeight / 2));
        var relativeTouchPos = this.getRelativePos(new point_1.Point(touch_1.TouchUtils.getEventX(evt), touch_1.TouchUtils.getEventY(evt)));
        var target = this.isTouchNearby(relativeTouchPos, relativePosStart) ? TaskAreaManager_1.MouseEventSource.Successor_DependencyStart :
            this.isTouchNearby(relativeTouchPos, relativePosEnd) ? TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish : null;
        var type = target === TaskAreaManager_1.MouseEventSource.Successor_DependencyStart || target == TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish ?
            MouseHandlerDependencyState_1.dependencyMap[this.source][target] : null;
        this.handler.control.taskEditController.endDependency(type);
        this.handler.switchToDefaultState();
    };
    TouchHandlerDependencyState.prototype.onTouchMove = function (evt) {
        evt.preventDefault();
        var relativePos = this.getRelativePos(new point_1.Point(touch_1.TouchUtils.getEventX(evt), touch_1.TouchUtils.getEventY(evt)));
        var hoverTaskIndex = Math.floor(relativePos.y / this.handler.control.tickSize.height);
        this.handler.control.taskEditController.processDependency(relativePos);
        if (this.handler.control.viewModel.tasks.items[hoverTaskIndex])
            this.handler.control.taskEditController.showDependencySuccessor(hoverTaskIndex);
    };
    TouchHandlerDependencyState.prototype.isTouchNearby = function (touchPos, elementPos) {
        if (Math.abs(elementPos.x - touchPos.x) <= 10 && Math.abs(elementPos.y - touchPos.y) <= 10)
            return true;
        return false;
    };
    return TouchHandlerDependencyState;
}(TouchHandlerStateBase_1.TouchHandlerStateBase));
exports.TouchHandlerDependencyState = TouchHandlerDependencyState;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchHandlerZoomState = void 0;
var tslib_1 = __webpack_require__(0);
var HandlerStateBase_1 = __webpack_require__(22);
var point_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(2);
var PINCH_CHANGE_DISTANCE = 3;
var TouchHandlerZoomState = (function (_super) {
    tslib_1.__extends(TouchHandlerZoomState, _super);
    function TouchHandlerZoomState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerZoomState.prototype.onTouchStart = function (_evt) { };
    TouchHandlerZoomState.prototype.onDoubleTap = function (_evt) { };
    TouchHandlerZoomState.prototype.onTouchEnd = function (_evt) {
        this.prevDistance = null;
        this.handler.switchToDefaultState();
    };
    TouchHandlerZoomState.prototype.onTouchMove = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (evt.touches.length > 1) {
            var distance = this.getTouchDistance(evt);
            if (this.prevDistance) {
                var diff = this.prevDistance - distance;
                if (Math.abs(diff) > PINCH_CHANGE_DISTANCE) {
                    var offsetX = this.getMiddleAbsPoint(evt).x;
                    if (diff > 0)
                        this.handler.control.zoomOut(offsetX);
                    else
                        this.handler.control.zoomIn(offsetX);
                    this.prevDistance = distance;
                }
            }
            else
                this.prevDistance = distance;
        }
    };
    TouchHandlerZoomState.prototype.getTouchDistance = function (evt) {
        var pt0 = new point_1.Point(evt.touches[0].clientX, evt.touches[0].clientY);
        var pt1 = new point_1.Point(evt.touches[1].clientX, evt.touches[1].clientY);
        return this.getDistance(pt0, pt1);
    };
    TouchHandlerZoomState.prototype.getDistance = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    };
    TouchHandlerZoomState.prototype.getMiddleAbsPoint = function (evt) {
        var _this = this;
        return this.getMiddlePointByEvent(evt, function (touch) {
            return new point_1.Point(touch.pageX - dom_1.DomUtils.getAbsolutePositionX(_this.handler.control.taskAreaContainer.getElement()), touch.pageY - dom_1.DomUtils.getAbsolutePositionY(_this.handler.control.taskAreaContainer.getElement()));
        });
    };
    TouchHandlerZoomState.prototype.getMiddlePointByEvent = function (evt, getPoint) {
        if (evt.touches.length > 1)
            return new point_1.Point((getPoint(evt.touches[0]).x + getPoint(evt.touches[1]).x) / 2, (getPoint(evt.touches[0]).y + getPoint(evt.touches[1]).y) / 2);
    };
    return TouchHandlerZoomState;
}(HandlerStateBase_1.HandlerStateBase));
exports.TouchHandlerZoomState = TouchHandlerZoomState;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAreaContainer = void 0;
var TaskAreaContainer = (function () {
    function TaskAreaContainer(element, ganttView) {
        this.element = element;
        this.onScrollHandler = function () { ganttView.updateView(); };
        this.element.addEventListener("scroll", this.onScrollHandler);
    }
    Object.defineProperty(TaskAreaContainer.prototype, "scrollTop", {
        get: function () {
            return this.element.scrollTop;
        },
        set: function (value) {
            this.element.scrollTop = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "scrollLeft", {
        get: function () {
            return this.element.scrollLeft;
        },
        set: function (value) {
            this.element.scrollLeft = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "scrollWidth", {
        get: function () {
            return this.element.scrollWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "scrollHeight", {
        get: function () {
            return this.element.scrollHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "isExternal", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaContainer.prototype.getWidth = function () {
        return this.element.offsetWidth;
    };
    TaskAreaContainer.prototype.getHeight = function () {
        return this.element.offsetHeight;
    };
    TaskAreaContainer.prototype.getElement = function () {
        return this.element;
    };
    TaskAreaContainer.prototype.detachEvents = function () {
        this.element.removeEventListener("scroll", this.onScrollHandler);
    };
    return TaskAreaContainer;
}());
exports.TaskAreaContainer = TaskAreaContainer;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelChangesDispatcher = void 0;
var EventDispatcher_1 = __webpack_require__(119);
var TaskArguments_1 = __webpack_require__(58);
var ResourceArguments_1 = __webpack_require__(59);
var AssignmentArguments_1 = __webpack_require__(37);
var ModelChangesDispatcher = (function () {
    function ModelChangesDispatcher() {
        this.onModelChanged = new EventDispatcher_1.EventDispatcher();
        this.isLocked = false;
    }
    ModelChangesDispatcher.prototype.notifyTaskCreating = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskCreating", args);
    };
    ModelChangesDispatcher.prototype.notifyTaskCreated = function (task, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskCreated", task, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyTaskRemoving = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskRemoving", args);
    };
    ModelChangesDispatcher.prototype.notifyTaskRemoved = function (taskID, errorCallback, task) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskRemoved", taskID, errorCallback, task);
    };
    ModelChangesDispatcher.prototype.notifyTaskUpdating = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskUpdating", args);
    };
    ModelChangesDispatcher.prototype.notifyTaskMoving = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskMoving", args);
    };
    ModelChangesDispatcher.prototype.notifyTaskEditDialogShowing = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskEditDialogShowing", args);
    };
    ModelChangesDispatcher.prototype.notifyResourceManagerDialogShowing = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceManagerDialogShowing", args);
    };
    ModelChangesDispatcher.prototype.notifyTaskTitleChanged = function (taskID, newValue, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskTitleChanged", taskID, newValue, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyTaskDescriptionChanged = function (taskID, newValue, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskDescriptionChanged", taskID, newValue, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyTaskStartChanged = function (taskID, newValue, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskStartChanged", taskID, newValue, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyTaskEndChanged = function (taskID, newValue, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskEndChanged", taskID, newValue, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyTaskProgressChanged = function (taskID, newValue, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskProgressChanged", taskID, newValue, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyTaskColorChanged = function (taskID, newValue, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskColorChanged", taskID, newValue, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyDependencyInserting = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyDependencyInserting", args);
    };
    ModelChangesDispatcher.prototype.notifyDependencyInserted = function (dependency, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyDependencyInserted", dependency, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyDependencyRemoving = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyDependencyRemoving", args);
    };
    ModelChangesDispatcher.prototype.notifyDependencyRemoved = function (dependencyID, errorCallback, dependency) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyDependencyRemoved", dependencyID, errorCallback, dependency);
    };
    ModelChangesDispatcher.prototype.notifyResourceCreating = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceCreating", args);
    };
    ModelChangesDispatcher.prototype.notifyResourceCreated = function (resource, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceCreated", resource, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceRemoving = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceRemoving", args);
    };
    ModelChangesDispatcher.prototype.notifyResourceRemoved = function (resourceID, errorCallback, resource) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceRemoved", resourceID, errorCallback, resource);
    };
    ModelChangesDispatcher.prototype.notifyResourceColorChanged = function (resourceID, newValue, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceColorChanged", resourceID, newValue, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceAssigning = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceAssigning", args);
    };
    ModelChangesDispatcher.prototype.notifyResourceAssigned = function (assignment, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceAssigned", assignment, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceUnassigning = function (args) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceUnassigning", args);
    };
    ModelChangesDispatcher.prototype.notifyResourceUnassigned = function (assignmentID, errorCallback, assignment) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceUnassigned", assignmentID, errorCallback, assignment);
    };
    ModelChangesDispatcher.prototype.notifyParentDataRecalculated = function (data) {
        this.onModelChanged.raise("NotifyParentDataRecalculated", data);
    };
    ModelChangesDispatcher.prototype.fireResourceUnassigning = function (assignment) {
        var args = new AssignmentArguments_1.ResourceUnassigningArguments(assignment);
        this.notifyResourceUnassigning(args);
        return !args.cancel;
    };
    ModelChangesDispatcher.prototype.raiseTaskTitleUpdating = function (task, value, callback) {
        return this.raiseTaskUpdating(task, "title", value, callback);
    };
    ModelChangesDispatcher.prototype.raiseTaskDescriptionUpdating = function (task, value, callback) {
        return this.raiseTaskUpdating(task, "description", value, callback);
    };
    ModelChangesDispatcher.prototype.raiseTaskProgressUpdating = function (task, value, callback) {
        return this.raiseTaskUpdating(task, "progress", value, callback);
    };
    ModelChangesDispatcher.prototype.raiseTaskColorUpdating = function (task, value, callback) {
        return this.raiseTaskUpdating(task, "color", value, callback);
    };
    ModelChangesDispatcher.prototype.raiseTaskStartUpdating = function (task, value, callback) {
        return this.raiseTaskUpdating(task, "start", value, callback);
    };
    ModelChangesDispatcher.prototype.raiseTaskEndUpdating = function (task, value, callback) {
        return this.raiseTaskUpdating(task, "end", value, callback);
    };
    ModelChangesDispatcher.prototype.raiseTaskStartAndEndUpdating = function (task, newStart, newEnd, callback) {
        var args = new TaskArguments_1.TaskUpdatingArguments(task, ["start", "end"], [newStart, newEnd]);
        this.notifyTaskUpdating(args);
        if (!args.cancel) {
            callback(args["start"], args["end"]);
            return true;
        }
        return false;
    };
    ModelChangesDispatcher.prototype.raiseTaskUpdating = function (task, fieldName, newValue, callback) {
        var oldValue = task[fieldName];
        if (oldValue !== newValue) {
            var args = new TaskArguments_1.TaskUpdatingArguments(task, [fieldName], [newValue]);
            this.notifyTaskUpdating(args);
            if (!args.cancel && oldValue !== args[fieldName]) {
                callback(args[fieldName]);
                return true;
            }
        }
        return false;
    };
    ModelChangesDispatcher.prototype.raiseTaskMultipleUpdating = function (task, newValues, callback) {
        var fields = ["title", "progress", "start", "end", "color"];
        var values = fields.map(function (f) { return newValues[f]; });
        var args = new TaskArguments_1.TaskUpdatingArguments(task, fields, values);
        this.notifyTaskUpdating(args);
        if (!args.cancel) {
            callback(args.newValues);
            return true;
        }
        return false;
    };
    ModelChangesDispatcher.prototype.raiseTaskMoving = function (task, newStart, newEnd, callback) {
        var args = new TaskArguments_1.TaskUpdatingArguments(task, ["start", "end"], [newStart, newEnd]);
        this.notifyTaskMoving(args);
        if (!args.cancel) {
            callback(args["start"], args["end"]);
            return true;
        }
        return false;
    };
    ModelChangesDispatcher.prototype.raiseTaskTaskEditDialogShowing = function (params, callback) {
        var args = new TaskArguments_1.TaskEditDialogShowingArguments(params);
        this.notifyTaskEditDialogShowing(args);
        if (!args.cancel) {
            callback(args);
            return true;
        }
        return false;
    };
    ModelChangesDispatcher.prototype.raiseResourceManagerDialogShowing = function (params, callback) {
        var args = new ResourceArguments_1.ResourceManagerDialogShowingArguments(params);
        this.notifyResourceManagerDialogShowing(args);
        if (!args.cancel) {
            callback(args);
            return true;
        }
        return false;
    };
    ModelChangesDispatcher.prototype.lock = function () { this.isLocked = true; };
    ModelChangesDispatcher.prototype.unlock = function () { this.isLocked = false; };
    return ModelChangesDispatcher;
}());
exports.ModelChangesDispatcher = ModelChangesDispatcher;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
var EventDispatcher = (function () {
    function EventDispatcher() {
        this.listeners = [];
    }
    EventDispatcher.prototype.add = function (listener) {
        if (!listener)
            throw new Error("Error");
        if (!this.hasEventListener(listener))
            this.listeners.push(listener);
    };
    EventDispatcher.prototype.remove = function (listener) {
        for (var i = 0, currentListener = void 0; currentListener = this.listeners[i]; i++)
            if (currentListener === listener) {
                this.listeners.splice(i, 1);
                break;
            }
    };
    EventDispatcher.prototype.raise = function (funcName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0, listener = void 0; listener = this.listeners[i]; i++) {
            var func = listener[funcName];
            func === null || func === void 0 ? void 0 : func.apply(listener, args);
        }
    };
    EventDispatcher.prototype.hasEventListener = function (listener) {
        for (var i = 0, l = this.listeners.length; i < l; i++)
            if (this.listeners[i] === listener)
                return true;
        return false;
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
var TaskCommands_1 = __webpack_require__(121);
var TaskPropertiesCommands_1 = __webpack_require__(122);
var DependencyCommands_1 = __webpack_require__(123);
var ResourceCommands_1 = __webpack_require__(125);
var TaskEditDialog_1 = __webpack_require__(126);
var ConstraintViolationDialog_1 = __webpack_require__(61);
var ResourcesDialog_1 = __webpack_require__(127);
var ClientCommand_1 = __webpack_require__(128);
var HistoryCommands_1 = __webpack_require__(129);
var ZoomCommands_1 = __webpack_require__(130);
var FullScreenCommand_1 = __webpack_require__(131);
var CollapseExpandCommands_1 = __webpack_require__(132);
var ConfirmationDialog_1 = __webpack_require__(26);
var ResourcePropertiesCommands_1 = __webpack_require__(133);
var CommandManager = (function () {
    function CommandManager(control) {
        this.control = control;
        this.commands = {};
        this.createCommand(ClientCommand_1.GanttClientCommand.CreateTask, this.createTaskCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.CreateSubTask, this.createSubTaskCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.RemoveTask, this.removeTaskCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.RemoveDependency, this.removeDependencyCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.TaskInformation, this.showTaskEditDialog);
        this.createCommand(ClientCommand_1.GanttClientCommand.ResourceManager, this.showResourcesDialog);
        this.createCommand(ClientCommand_1.GanttClientCommand.TaskAddContextItem, new TaskCommands_1.TaskAddContextItemCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.Undo, new HistoryCommands_1.UndoCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.Redo, new HistoryCommands_1.RedoCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.ZoomIn, new ZoomCommands_1.ZoomInCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.ZoomOut, new ZoomCommands_1.ZoomOutCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.FullScreen, new FullScreenCommand_1.ToggleFullScreenCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.CollapseAll, new CollapseExpandCommands_1.CollapseAllCommand(this.control));
        this.createCommand(ClientCommand_1.GanttClientCommand.ExpandAll, new CollapseExpandCommands_1.ExpandAllCommand(this.control));
    }
    Object.defineProperty(CommandManager.prototype, "createTaskCommand", {
        get: function () { return new TaskCommands_1.CreateTaskCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "createSubTaskCommand", {
        get: function () { return new TaskCommands_1.CreateSubTaskCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "removeTaskCommand", {
        get: function () { return new TaskCommands_1.RemoveTaskCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskTitleCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskTitleCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskDescriptionCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskDescriptionCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskProgressCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskProgressCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskColorCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskColorCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskStartCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskStartCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "taskMoveCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskMoveCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskEndCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskEndCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "updateTaskCommand", {
        get: function () { return new TaskCommands_1.UpdateTaskCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "createDependencyCommand", {
        get: function () { return new DependencyCommands_1.CreateDependencyCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "removeDependencyCommand", {
        get: function () { return new DependencyCommands_1.RemoveDependencyCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "createResourceCommand", {
        get: function () { return new ResourceCommands_1.CreateResourceCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "removeResourceCommand", {
        get: function () { return new ResourceCommands_1.RemoveResourceCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "assignResourceCommand", {
        get: function () { return new ResourceCommands_1.AssignResourceCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "deassignResourceCommand", {
        get: function () { return new ResourceCommands_1.DeassignResourceCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeResourceColorCommand", {
        get: function () { return new ResourcePropertiesCommands_1.ResourceColorCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showTaskEditDialog", {
        get: function () { return new TaskEditDialog_1.TaskEditDialogCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showConstraintViolationDialog", {
        get: function () { return new ConstraintViolationDialog_1.ConstraintViolationDialogCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showConfirmationDialog", {
        get: function () { return new ConfirmationDialog_1.ConfirmationDialog(this.control); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showResourcesDialog", {
        get: function () { return new ResourcesDialog_1.ResourcesDialogCommand(this.control); },
        enumerable: false,
        configurable: true
    });
    CommandManager.prototype.getCommand = function (key) {
        return this.commands[key];
    };
    CommandManager.prototype.createCommand = function (commandId, command) {
        this.commands[commandId] = command;
    };
    return CommandManager;
}());
exports.CommandManager = CommandManager;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAddContextItemCommand = exports.UpdateTaskCommand = exports.RemoveTaskCommand = exports.CreateSubTaskCommand = exports.CreateTaskCommand = exports.TaskCommandBase = void 0;
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(7);
var TaskHistoryItem_1 = __webpack_require__(60);
var TaskDependencyHistoryItem_1 = __webpack_require__(24);
var ResourceHistoryItem_1 = __webpack_require__(25);
var ConfirmationDialog_1 = __webpack_require__(26);
var TaskArguments_1 = __webpack_require__(58);
var TaskPropertiesHistoryItem_1 = __webpack_require__(28);
var common_1 = __webpack_require__(1);
var TaskCommandBase = (function (_super) {
    tslib_1.__extends(TaskCommandBase, _super);
    function TaskCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskCommandBase.prototype.getState = function () {
        var state = new CommandBase_1.SimpleCommandState(this.isEnabled());
        state.visible = this.control.settings.editing.enabled && !this.control.taskEditController.dependencyId;
        return state;
    };
    return TaskCommandBase;
}(CommandBase_1.CommandBase));
exports.TaskCommandBase = TaskCommandBase;
var CreateTaskCommand = (function (_super) {
    tslib_1.__extends(CreateTaskCommand, _super);
    function CreateTaskCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateTaskCommand.prototype.execute = function (data) {
        return _super.prototype.execute.call(this, data);
    };
    CreateTaskCommand.prototype.executeInternal = function (data) {
        var _a;
        data !== null && data !== void 0 ? data : (data = {});
        if (!data.parentId) {
            var item = this.control.viewModel.findItem(this.control.currentSelectedTaskID);
            var selectedTask = item && item.task;
            if (selectedTask)
                data.parentId = selectedTask.parentId;
        }
        var referenceItem = this.control.viewModel.findItem(data.parentId) || this.control.viewModel.items[0];
        var referenceTask = referenceItem && referenceItem.task;
        if (!data.start)
            data.start = referenceTask ? new Date(referenceTask.start.getTime()) : new Date(this.control.range.start.getTime());
        if (!data.end)
            data.end = referenceTask ? new Date(referenceTask.end.getTime()) : new Date(this.control.range.end.getTime());
        (_a = data.title) !== null && _a !== void 0 ? _a : (data.title = "New task");
        var args = new TaskArguments_1.TaskInsertingArguments(null, data);
        this.modelManipulator.dispatcher.notifyTaskCreating(args);
        if (!args.cancel)
            this.history.addAndRedo(new TaskHistoryItem_1.CreateTaskHistoryItem(this.modelManipulator, args));
        return !args.cancel;
    };
    CreateTaskCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        state.visible = state.visible && this.control.settings.editing.allowTaskInsert;
        return state;
    };
    return CreateTaskCommand;
}(TaskCommandBase));
exports.CreateTaskCommand = CreateTaskCommand;
var CreateSubTaskCommand = (function (_super) {
    tslib_1.__extends(CreateSubTaskCommand, _super);
    function CreateSubTaskCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateSubTaskCommand.prototype.execute = function (parentId) {
        return _super.prototype.execute.call(this, parentId);
    };
    CreateSubTaskCommand.prototype.executeInternal = function (parentId) {
        parentId = parentId || this.control.currentSelectedTaskID;
        var selectedItem = this.control.viewModel.findItem(parentId);
        if (selectedItem.selected) {
            var data = {
                start: new Date(selectedItem.task.start.getTime()),
                end: new Date(selectedItem.task.end.getTime()),
                title: "New task",
                progress: 0,
                parentId: parentId
            };
            var args = new TaskArguments_1.TaskInsertingArguments(null, data);
            this.modelManipulator.dispatcher.notifyTaskCreating(args);
            if (!args.cancel)
                this.history.addAndRedo(new TaskHistoryItem_1.CreateTaskHistoryItem(this.modelManipulator, args));
            return !args.cancel;
        }
        return false;
    };
    CreateSubTaskCommand.prototype.isEnabled = function () {
        var gantt = this.control;
        var selectedItem = gantt.viewModel.findItem(gantt.currentSelectedTaskID);
        return _super.prototype.isEnabled.call(this) && !!selectedItem && selectedItem.selected;
    };
    CreateSubTaskCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        var gantt = this.control;
        state.visible = state.visible && gantt.settings.editing.allowTaskInsert;
        return state;
    };
    return CreateSubTaskCommand;
}(TaskCommandBase));
exports.CreateSubTaskCommand = CreateSubTaskCommand;
var RemoveTaskCommand = (function (_super) {
    tslib_1.__extends(RemoveTaskCommand, _super);
    function RemoveTaskCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveTaskCommand.prototype.execute = function (id, confirmRequired, historyItem) {
        var _this = this;
        if (confirmRequired === void 0) { confirmRequired = true; }
        if (confirmRequired) {
            this.control.commandManager.showConfirmationDialog.execute(new ConfirmationDialog_1.ConfirmationDialogParameters(ConfirmationDialog_1.ConfirmationType.TaskDelete, function () { _this.executeInternal(id, historyItem); }));
            return false;
        }
        return _super.prototype.execute.call(this, id, historyItem);
    };
    RemoveTaskCommand.prototype.executeInternal = function (id, historyItem) {
        var _this = this;
        id = id || this.control.currentSelectedTaskID;
        var item = this.control.viewModel.findItem(id);
        var task = item ? item.task : this.control.viewModel.tasks.getItemById(id);
        var args = new TaskArguments_1.TaskRemovingArguments(task);
        this.modelManipulator.dispatcher.notifyTaskRemoving(args);
        if (args.cancel)
            return false;
        this.control.viewModel.beginUpdate();
        var removeTaskHistoryItem = historyItem || new TaskHistoryItem_1.RemoveTaskHistoryItem(this.modelManipulator);
        removeTaskHistoryItem.addTask(id);
        var childTasks = this.control.viewModel.tasks.items.filter(function (t) { return t.parentId == id; });
        childTasks.forEach(function (t) { return new RemoveTaskCommand(_this.control).execute(t.internalId, false, removeTaskHistoryItem); });
        var parent = item && item.parent;
        var dependencies = this.control.viewModel.dependencies.items.filter(function (d) { return d.predecessorId == id || d.successorId == id; });
        if (dependencies.length)
            if (this.control.settings.editing.allowDependencyDelete) {
                dependencies = dependencies.filter(function (d) { return childTasks.filter(function (c) { return c.internalId == d.predecessorId || c.internalId == d.successorId; }).length == 0; });
                dependencies.forEach(function (d) { return removeTaskHistoryItem.add(new TaskDependencyHistoryItem_1.RemoveDependencyHistoryItem(_this.modelManipulator, d.internalId)); });
            }
            else
                return false;
        var assignments = this.control.viewModel.assignments.items.filter(function (a) { return a.taskId == id; });
        assignments.forEach(function (a) {
            if (_this.modelManipulator.dispatcher.fireResourceUnassigning(a))
                removeTaskHistoryItem.add(new ResourceHistoryItem_1.DeassignResourceHistoryItem(_this.modelManipulator, a.internalId));
        });
        if (!historyItem)
            this.history.addAndRedo(removeTaskHistoryItem);
        this.updateParent(parent);
        this.control.viewModel.endUpdate();
        return true;
    };
    RemoveTaskCommand.prototype.updateParent = function (parent) {
        if (parent && parent.children.length > 0)
            this.control.validationController.updateParentsIfRequired(parent.children[0].task.internalId);
    };
    RemoveTaskCommand.prototype.isEnabled = function () {
        var gantt = this.control;
        var selectedItem = gantt.viewModel.findItem(gantt.currentSelectedTaskID);
        var result = _super.prototype.isEnabled.call(this) && !!selectedItem && selectedItem.selected;
        return result;
    };
    RemoveTaskCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        var gantt = this.control;
        state.visible = state.visible && gantt.settings.editing.allowTaskDelete;
        return state;
    };
    return RemoveTaskCommand;
}(TaskCommandBase));
exports.RemoveTaskCommand = RemoveTaskCommand;
var UpdateTaskCommand = (function (_super) {
    tslib_1.__extends(UpdateTaskCommand, _super);
    function UpdateTaskCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateTaskCommand.prototype.execute = function (id, newValues) {
        return _super.prototype.execute.call(this, id, newValues);
    };
    UpdateTaskCommand.prototype.executeInternal = function (id, newValues) {
        var task = this.control.viewModel.tasks.getItemById(id);
        if (!task)
            return false;
        var success = this.control.modelManipulator.dispatcher.raiseTaskMultipleUpdating(task, newValues, function (changedNewValues) {
            newValues.title = changedNewValues.title;
            newValues.progress = changedNewValues.progress;
            newValues.start = changedNewValues.start;
            newValues.end = changedNewValues.end;
            newValues.color = changedNewValues.color;
        });
        if (success) {
            this.history.beginTransaction();
            var needRecalculateParents = false;
            if (common_1.isDefined(newValues.title) && newValues.title !== task.title)
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskTitleHistoryItem(this.modelManipulator, id, newValues.title));
            if (common_1.isDefined(newValues.progress) && newValues.progress !== task.progress) {
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskProgressHistoryItem(this.modelManipulator, id, newValues.progress));
                needRecalculateParents = true;
            }
            if (common_1.isDefined(newValues.start) && common_1.isDefined(newValues.end) && newValues.end.getTime() < newValues.start.getTime())
                newValues.end = newValues.start;
            if (common_1.isDefined(newValues.start) && newValues.start !== task.start) {
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskStartHistoryItem(this.modelManipulator, id, newValues.start));
                needRecalculateParents = true;
                if (this.control.settings.validation.validateDependencies)
                    this.control.validationController.moveStartDependTasks(id, task.start);
            }
            if (common_1.isDefined(newValues.end) && newValues.end !== task.end) {
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskEndHistoryItem(this.modelManipulator, id, newValues.end));
                needRecalculateParents = true;
                if (this.control.settings.validation.validateDependencies)
                    this.control.validationController.moveEndDependTasks(id, task.end);
            }
            if (common_1.isDefined(newValues.color) && newValues.color !== task.color)
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskColorHistoryItem(this.modelManipulator, id, newValues.color));
            if (needRecalculateParents)
                this.validationController.updateParentsIfRequired(id);
            else
                this.control.updateOwnerInAutoParentMode();
            this.history.endTransaction();
        }
        return success;
    };
    UpdateTaskCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowTaskUpdate;
    };
    return UpdateTaskCommand;
}(TaskCommandBase));
exports.UpdateTaskCommand = UpdateTaskCommand;
var TaskAddContextItemCommand = (function (_super) {
    tslib_1.__extends(TaskAddContextItemCommand, _super);
    function TaskAddContextItemCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskAddContextItemCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        state.visible = state.visible && this.control.settings.editing.allowTaskInsert;
        return state;
    };
    TaskAddContextItemCommand.prototype.execute = function () {
        return false;
    };
    return TaskAddContextItemCommand;
}(TaskCommandBase));
exports.TaskAddContextItemCommand = TaskAddContextItemCommand;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMoveCommand = exports.TaskEndCommand = exports.TaskStartCommand = exports.TaskPropertyCommandValidation = exports.TaskColorCommand = exports.TaskProgressCommand = exports.TaskDescriptionCommand = exports.TaskTitleCommand = exports.TaskPropertyCommandBase = void 0;
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(7);
var TaskPropertiesHistoryItem_1 = __webpack_require__(28);
var ConstraintViolationDialog_1 = __webpack_require__(61);
var DateRange_1 = __webpack_require__(10);
var TaskPropertyCommandBase = (function (_super) {
    tslib_1.__extends(TaskPropertyCommandBase, _super);
    function TaskPropertyCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskPropertyCommandBase.prototype.getState = function () {
        return new CommandBase_1.SimpleCommandState(this.isEnabled());
    };
    TaskPropertyCommandBase.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowTaskUpdate;
    };
    TaskPropertyCommandBase.prototype.getTask = function (id) {
        return this.control.viewModel.tasks.getItemById(id);
    };
    return TaskPropertyCommandBase;
}(CommandBase_1.CommandBase));
exports.TaskPropertyCommandBase = TaskPropertyCommandBase;
var TaskTitleCommand = (function (_super) {
    tslib_1.__extends(TaskTitleCommand, _super);
    function TaskTitleCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskTitleCommand.prototype.execute = function (id, value) {
        return _super.prototype.execute.call(this, id, value);
    };
    TaskTitleCommand.prototype.executeInternal = function (id, value) {
        var _this = this;
        return this.modelManipulator.dispatcher.raiseTaskTitleUpdating(this.getTask(id), value, function (newTitle) { _this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskTitleHistoryItem(_this.modelManipulator, id, newTitle)); });
    };
    return TaskTitleCommand;
}(TaskPropertyCommandBase));
exports.TaskTitleCommand = TaskTitleCommand;
var TaskDescriptionCommand = (function (_super) {
    tslib_1.__extends(TaskDescriptionCommand, _super);
    function TaskDescriptionCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskDescriptionCommand.prototype.execute = function (id, value) {
        return _super.prototype.execute.call(this, id, value);
    };
    TaskDescriptionCommand.prototype.executeInternal = function (id, value) {
        var _this = this;
        return this.modelManipulator.dispatcher.raiseTaskDescriptionUpdating(this.getTask(id), value, function (newDescription) { _this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskDescriptionHistoryItem(_this.modelManipulator, id, newDescription)); });
    };
    return TaskDescriptionCommand;
}(TaskPropertyCommandBase));
exports.TaskDescriptionCommand = TaskDescriptionCommand;
var TaskProgressCommand = (function (_super) {
    tslib_1.__extends(TaskProgressCommand, _super);
    function TaskProgressCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskProgressCommand.prototype.execute = function (id, value) {
        return _super.prototype.execute.call(this, id, value);
    };
    TaskProgressCommand.prototype.executeInternal = function (id, value) {
        var _this = this;
        return this.modelManipulator.dispatcher.raiseTaskProgressUpdating(this.getTask(id), value, function (newValue) {
            _this.control.history.beginTransaction();
            _this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskProgressHistoryItem(_this.modelManipulator, id, newValue));
            _this.validationController.updateParentsIfRequired(id);
            _this.control.history.endTransaction();
        });
    };
    return TaskProgressCommand;
}(TaskPropertyCommandBase));
exports.TaskProgressCommand = TaskProgressCommand;
var TaskColorCommand = (function (_super) {
    tslib_1.__extends(TaskColorCommand, _super);
    function TaskColorCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskColorCommand.prototype.execute = function (id, value) {
        return _super.prototype.execute.call(this, id, value);
    };
    TaskColorCommand.prototype.executeInternal = function (id, value) {
        var _this = this;
        return this.modelManipulator.dispatcher.raiseTaskColorUpdating(this.getTask(id), value, function (newValue) { _this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskColorHistoryItem(_this.modelManipulator, id, newValue)); });
    };
    return TaskColorCommand;
}(TaskPropertyCommandBase));
exports.TaskColorCommand = TaskColorCommand;
var TaskPropertyCommandValidation = (function (_super) {
    tslib_1.__extends(TaskPropertyCommandValidation, _super);
    function TaskPropertyCommandValidation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskPropertyCommandValidation.prototype.executeInternal = function () {
        var _this = this;
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        var validationErrors = this.control.settings.validation.validateDependencies ? this.validate.apply(this, parameters) : [];
        var criticalErrors = validationErrors.filter(function (e) { return e.critical; });
        if (!validationErrors.length || validationErrors.length > 1 && criticalErrors.length === 0)
            return this.executeCore.apply(this, parameters);
        else if (validationErrors.length === 1)
            this.control.commandManager.showConstraintViolationDialog.execute(new ConstraintViolationDialog_1.ConstraintViolationDialogParameters(validationErrors[0], function () { _this.executeCore.apply(_this, parameters); }));
        return false;
    };
    TaskPropertyCommandValidation.prototype.executeCore = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        return false;
    };
    TaskPropertyCommandValidation.prototype.validate = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        return [];
    };
    return TaskPropertyCommandValidation;
}(TaskPropertyCommandBase));
exports.TaskPropertyCommandValidation = TaskPropertyCommandValidation;
var TaskStartCommand = (function (_super) {
    tslib_1.__extends(TaskStartCommand, _super);
    function TaskStartCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskStartCommand.prototype.execute = function (id, value) {
        var success = this.modelManipulator.dispatcher.raiseTaskStartUpdating(this.getTask(id), value, function (newStart) { value = newStart; });
        return success && _super.prototype.execute.call(this, id, value);
    };
    TaskStartCommand.prototype.executeInternal = function (id, value) {
        return _super.prototype.executeInternal.call(this, id, value);
    };
    TaskStartCommand.prototype.executeCore = function (id, value) {
        var oldStart = this.control.viewModel.tasks.getItemById(id).start;
        if (oldStart.getTime() == value.getTime())
            return false;
        this.control.history.beginTransaction();
        this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskStartHistoryItem(this.modelManipulator, id, value));
        if (this.control.settings.validation.validateDependencies)
            this.control.validationController.moveStartDependTasks(id, oldStart);
        this.validationController.updateParentsIfRequired(id);
        this.control.history.endTransaction();
        var minStartTask = this.control.viewModel.tasks.items.reduce(function (prev, curr) {
            if (!curr.isValid())
                return prev;
            if (!prev.isValid())
                return curr;
            return prev.start.getTime() < curr.start.getTime() ? prev : curr;
        });
        if (minStartTask.start < this.control.dataRange.start) {
            this.control.dataRange.start = minStartTask.start;
            this.control.resetAndUpdate();
        }
        return true;
    };
    TaskStartCommand.prototype.validate = function (id, value) {
        return this.control.validationController.checkStartDependencies(id, value);
    };
    return TaskStartCommand;
}(TaskPropertyCommandValidation));
exports.TaskStartCommand = TaskStartCommand;
var TaskEndCommand = (function (_super) {
    tslib_1.__extends(TaskEndCommand, _super);
    function TaskEndCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskEndCommand.prototype.execute = function (id, value) {
        var success = this.modelManipulator.dispatcher.raiseTaskEndUpdating(this.getTask(id), value, function (newStart) { value = newStart; });
        return success && _super.prototype.execute.call(this, id, value);
    };
    TaskEndCommand.prototype.executeInternal = function (id, value) {
        return _super.prototype.executeInternal.call(this, id, value);
    };
    TaskEndCommand.prototype.executeCore = function (id, value) {
        var oldEnd = this.control.viewModel.tasks.getItemById(id).end;
        if (oldEnd.getTime() == value.getTime())
            return false;
        this.control.history.beginTransaction();
        this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskEndHistoryItem(this.modelManipulator, id, value));
        if (this.control.settings.validation.validateDependencies)
            this.control.validationController.moveEndDependTasks(id, oldEnd);
        this.validationController.updateParentsIfRequired(id);
        this.control.history.endTransaction();
        var maxEndTask = this.control.viewModel.tasks.items.reduce(function (prev, curr) {
            if (!curr.isValid())
                return prev;
            return prev.end.getTime() > curr.end.getTime() ? prev : curr;
        });
        if (maxEndTask.end > this.control.dataRange.end) {
            this.control.dataRange.end = maxEndTask.end;
            this.control.resetAndUpdate();
        }
        return true;
    };
    TaskEndCommand.prototype.validate = function (id, value) {
        return this.control.validationController.checkEndDependencies(id, value);
    };
    return TaskEndCommand;
}(TaskPropertyCommandValidation));
exports.TaskEndCommand = TaskEndCommand;
var TaskMoveCommand = (function (_super) {
    tslib_1.__extends(TaskMoveCommand, _super);
    function TaskMoveCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskMoveCommand.prototype.execute = function (id, start, end) {
        var success = this.modelManipulator.dispatcher.raiseTaskStartAndEndUpdating(this.getTask(id), start, end, function (newStart, newEnd) {
            start = newStart;
            end = newEnd;
        });
        return success && _super.prototype.execute.call(this, id, start, end);
    };
    TaskMoveCommand.prototype.executeInternal = function (id, start, end) {
        return _super.prototype.executeInternal.call(this, id, start, end);
    };
    TaskMoveCommand.prototype.executeCore = function (id, start, end) {
        var task = this.control.viewModel.tasks.getItemById(id);
        var oldDateRange = new DateRange_1.DateRange(new Date(task.start.getTime()), new Date(task.end.getTime()));
        this.control.history.beginTransaction();
        this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskMoveHistoryItem(this.modelManipulator, id, new DateRange_1.DateRange(start, end)));
        this.validationController.correctOnMoving(id, start.getTime() - oldDateRange.start.getTime());
        if (this.control.settings.validation.validateDependencies) {
            this.control.validationController.moveStartDependTasks(id, oldDateRange.start);
            this.control.validationController.moveEndDependTasks(id, oldDateRange.end);
        }
        this.control.history.endTransaction();
        var maxEndTask = this.control.viewModel.tasks.items.reduce(function (prev, curr) {
            if (!curr.isValid())
                return prev;
            return prev.end.getTime() > curr.end.getTime() ? prev : curr;
        });
        if (maxEndTask.end > this.control.dataRange.end) {
            this.control.dataRange.end = maxEndTask.end;
            this.control.resetAndUpdate();
        }
        var minStartTask = this.control.viewModel.tasks.items.reduce(function (prev, curr) {
            if (!curr.isValid())
                return prev;
            if (!prev.isValid())
                return curr;
            return prev.start.getTime() < curr.start.getTime() ? prev : curr;
        });
        if (minStartTask.start < this.control.dataRange.start) {
            this.control.dataRange.start = minStartTask.start;
            this.control.resetAndUpdate();
        }
        return true;
    };
    TaskMoveCommand.prototype.validate = function (id, start, end) {
        var startErrors = this.control.validationController.checkStartDependencies(id, start);
        var endErrors = this.control.validationController.checkEndDependencies(id, end);
        return tslib_1.__spreadArray(tslib_1.__spreadArray([], startErrors), endErrors);
    };
    return TaskMoveCommand;
}(TaskPropertyCommandValidation));
exports.TaskMoveCommand = TaskMoveCommand;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveDependencyCommand = exports.CreateDependencyCommand = exports.DependencyCommandBase = void 0;
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(7);
var TaskDependencyHistoryItem_1 = __webpack_require__(24);
var Dependency_1 = __webpack_require__(13);
var ConfirmationDialog_1 = __webpack_require__(26);
var DependencyArguments_1 = __webpack_require__(124);
var DependencyCommandBase = (function (_super) {
    tslib_1.__extends(DependencyCommandBase, _super);
    function DependencyCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DependencyCommandBase.prototype.getState = function () {
        return new CommandBase_1.SimpleCommandState(this.isEnabled());
    };
    return DependencyCommandBase;
}(CommandBase_1.CommandBase));
exports.DependencyCommandBase = DependencyCommandBase;
var CreateDependencyCommand = (function (_super) {
    tslib_1.__extends(CreateDependencyCommand, _super);
    function CreateDependencyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateDependencyCommand.prototype.execute = function (predecessorId, successorId, type) {
        return _super.prototype.execute.call(this, predecessorId, successorId, type);
    };
    CreateDependencyCommand.prototype.executeInternal = function (predecessorId, successorId, type) {
        if (this.control.viewModel.dependencies.items.filter(function (d) { return (d.predecessorId == predecessorId && d.successorId == successorId) ||
            (d.successorId == predecessorId && d.predecessorId == successorId); }).length)
            return false;
        var args = new DependencyArguments_1.DependencyInsertingArguments(predecessorId, successorId, type);
        this.modelManipulator.dispatcher.notifyDependencyInserting(args);
        if (args.cancel)
            return false;
        predecessorId = args.predecessorId;
        successorId = args.successorId;
        type = args.type;
        this.control.history.beginTransaction();
        this.history.addAndRedo(new TaskDependencyHistoryItem_1.InsertDependencyHistoryItem(this.modelManipulator, predecessorId, successorId, type));
        if (this.control.settings.validation.validateDependencies) {
            var predecessorTask = this.control.viewModel.tasks.getItemById(predecessorId);
            if (type === Dependency_1.DependencyType.SF || type === Dependency_1.DependencyType.SS)
                this.control.validationController.moveStartDependTasks(predecessorId, predecessorTask.start);
            else
                this.control.validationController.moveEndDependTasks(predecessorId, predecessorTask.end);
        }
        this.control.history.endTransaction();
        return true;
    };
    CreateDependencyCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowDependencyInsert;
    };
    return CreateDependencyCommand;
}(DependencyCommandBase));
exports.CreateDependencyCommand = CreateDependencyCommand;
var RemoveDependencyCommand = (function (_super) {
    tslib_1.__extends(RemoveDependencyCommand, _super);
    function RemoveDependencyCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveDependencyCommand.prototype.execute = function (id, confirmRequired) {
        var _this = this;
        if (confirmRequired === void 0) { confirmRequired = true; }
        if (confirmRequired) {
            this.control.commandManager.showConfirmationDialog.execute(new ConfirmationDialog_1.ConfirmationDialogParameters(ConfirmationDialog_1.ConfirmationType.DependencyDelete, function () { _this.executeInternal(id); }));
            return false;
        }
        return _super.prototype.execute.call(this, id);
    };
    RemoveDependencyCommand.prototype.executeInternal = function (id) {
        id = id || this.control.taskEditController.dependencyId;
        if (id != null) {
            var dependency = this.control.viewModel.dependencies.items.filter(function (d) { return d.internalId == id; })[0];
            if (dependency) {
                var args = new DependencyArguments_1.DependencyRemovingArguments(dependency);
                this.modelManipulator.dispatcher.notifyDependencyRemoving(args);
                if (!args.cancel) {
                    this.history.addAndRedo(new TaskDependencyHistoryItem_1.RemoveDependencyHistoryItem(this.modelManipulator, id));
                    if (id === this.control.taskEditController.dependencyId)
                        this.control.taskEditController.selectDependency(null);
                    this.control.barManager.updateItemsState([]);
                    return true;
                }
            }
        }
        return false;
    };
    RemoveDependencyCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowDependencyDelete;
    };
    RemoveDependencyCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        state.visible = state.enabled && this.control.taskEditController.dependencyId != null;
        return state;
    };
    return RemoveDependencyCommand;
}(DependencyCommandBase));
exports.RemoveDependencyCommand = RemoveDependencyCommand;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyRemovingArguments = exports.DependencyInsertingArguments = void 0;
var tslib_1 = __webpack_require__(0);
var BaseArguments_1 = __webpack_require__(23);
var DependencyInsertingArguments = (function (_super) {
    tslib_1.__extends(DependencyInsertingArguments, _super);
    function DependencyInsertingArguments(predecessorId, successorId, type) {
        var _this = _super.call(this, null) || this;
        _this.values = {
            predecessorId: predecessorId,
            successorId: successorId,
            type: type
        };
        return _this;
    }
    Object.defineProperty(DependencyInsertingArguments.prototype, "predecessorId", {
        get: function () { return this.values.predecessorId; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DependencyInsertingArguments.prototype, "successorId", {
        get: function () { return this.values.successorId; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DependencyInsertingArguments.prototype, "type", {
        get: function () { return this.values.type; },
        enumerable: false,
        configurable: true
    });
    return DependencyInsertingArguments;
}(BaseArguments_1.BaseArguments));
exports.DependencyInsertingArguments = DependencyInsertingArguments;
var DependencyRemovingArguments = (function (_super) {
    tslib_1.__extends(DependencyRemovingArguments, _super);
    function DependencyRemovingArguments(dependency) {
        var _this = _super.call(this, dependency.id) || this;
        _this.values = dependency;
        return _this;
    }
    return DependencyRemovingArguments;
}(BaseArguments_1.BaseArguments));
exports.DependencyRemovingArguments = DependencyRemovingArguments;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DeassignResourceCommand = exports.AssignResourceCommand = exports.RemoveResourceCommand = exports.CreateResourceCommand = exports.ResourceCommandBase = void 0;
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(7);
var ResourceHistoryItem_1 = __webpack_require__(25);
var ResourceArguments_1 = __webpack_require__(59);
var AssignmentArguments_1 = __webpack_require__(37);
var ResourceCommandBase = (function (_super) {
    tslib_1.__extends(ResourceCommandBase, _super);
    function ResourceCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceCommandBase.prototype.getState = function () {
        return new CommandBase_1.SimpleCommandState(this.isEnabled());
    };
    return ResourceCommandBase;
}(CommandBase_1.CommandBase));
exports.ResourceCommandBase = ResourceCommandBase;
var CreateResourceCommand = (function (_super) {
    tslib_1.__extends(CreateResourceCommand, _super);
    function CreateResourceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateResourceCommand.prototype.execute = function (text, color, callback) {
        if (color === void 0) { color = ""; }
        return _super.prototype.execute.call(this, text, color, callback);
    };
    CreateResourceCommand.prototype.executeInternal = function (text, color, callback) {
        if (color === void 0) { color = ""; }
        var args = new ResourceArguments_1.ResourceInsertingArguments(text, color);
        this.modelManipulator.dispatcher.notifyResourceCreating(args);
        if (!args.cancel)
            this.history.addAndRedo(new ResourceHistoryItem_1.CreateResourceHistoryItem(this.modelManipulator, args.text, args.color, callback));
        return !args.cancel;
    };
    CreateResourceCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowResourceInsert;
    };
    return CreateResourceCommand;
}(ResourceCommandBase));
exports.CreateResourceCommand = CreateResourceCommand;
var RemoveResourceCommand = (function (_super) {
    tslib_1.__extends(RemoveResourceCommand, _super);
    function RemoveResourceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoveResourceCommand.prototype.execute = function (id) {
        return _super.prototype.execute.call(this, id);
    };
    RemoveResourceCommand.prototype.executeInternal = function (id) {
        var _this = this;
        var resource = this.control.viewModel.resources.items.filter(function (r) { return r.internalId == id; })[0];
        if (resource) {
            var args = new ResourceArguments_1.ResourceRemovingArguments(resource);
            this.modelManipulator.dispatcher.notifyResourceRemoving(args);
            if (!args.cancel) {
                var removeResourceHistoryItem_1 = new ResourceHistoryItem_1.RemoveResourceHistoryItem(this.modelManipulator, id);
                var assignments = this.control.viewModel.assignments.items.filter(function (a) { return a.resourceId == id; });
                assignments.forEach(function (a) {
                    if (_this.modelManipulator.dispatcher.fireResourceUnassigning(a))
                        removeResourceHistoryItem_1.add(new ResourceHistoryItem_1.DeassignResourceHistoryItem(_this.modelManipulator, a.internalId));
                });
                this.history.addAndRedo(removeResourceHistoryItem_1);
                return true;
            }
        }
        return false;
    };
    RemoveResourceCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowResourceDelete;
    };
    return RemoveResourceCommand;
}(ResourceCommandBase));
exports.RemoveResourceCommand = RemoveResourceCommand;
var AssignResourceCommand = (function (_super) {
    tslib_1.__extends(AssignResourceCommand, _super);
    function AssignResourceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssignResourceCommand.prototype.execute = function (resourceId, taskId) {
        return _super.prototype.execute.call(this, resourceId, taskId);
    };
    AssignResourceCommand.prototype.executeInternal = function (resourceId, taskId) {
        var assignment = this.control.viewModel.assignments.items.filter(function (r) { return r.resourceId == resourceId && r.taskId == taskId; })[0];
        if (!assignment) {
            var converter = this.control.viewModel;
            var args = new AssignmentArguments_1.ResourceAssigningArguments(converter.convertInternalToPublicKey("resource", resourceId), converter.convertInternalToPublicKey("task", taskId));
            this.modelManipulator.dispatcher.notifyResourceAssigning(args);
            if (!args.cancel) {
                this.history.addAndRedo(new ResourceHistoryItem_1.AssignResourceHistoryItem(this.modelManipulator, converter.convertPublicToInternalKey("resource", args.resourceId), converter.convertPublicToInternalKey("task", args.taskId)));
                return true;
            }
        }
        return false;
    };
    AssignResourceCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowTaskResourceUpdate;
    };
    return AssignResourceCommand;
}(ResourceCommandBase));
exports.AssignResourceCommand = AssignResourceCommand;
var DeassignResourceCommand = (function (_super) {
    tslib_1.__extends(DeassignResourceCommand, _super);
    function DeassignResourceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeassignResourceCommand.prototype.execute = function (assignmentId) {
        return _super.prototype.execute.call(this, assignmentId);
    };
    DeassignResourceCommand.prototype.executeInternal = function (assignmentId) {
        var assignment = this.control.viewModel.assignments.items.filter(function (r) { return r.internalId == assignmentId; })[0];
        if (assignment && this.modelManipulator.dispatcher.fireResourceUnassigning(assignment)) {
            this.history.addAndRedo(new ResourceHistoryItem_1.DeassignResourceHistoryItem(this.modelManipulator, assignmentId));
            return true;
        }
        return false;
    };
    DeassignResourceCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowTaskResourceUpdate;
    };
    return DeassignResourceCommand;
}(ResourceCommandBase));
exports.DeassignResourceCommand = DeassignResourceCommand;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEditParameters = exports.TaskEditDialogCommand = void 0;
var tslib_1 = __webpack_require__(0);
var DialogBase_1 = __webpack_require__(27);
var TaskPropertiesHistoryItem_1 = __webpack_require__(28);
var ResourceCollection_1 = __webpack_require__(31);
var ResourceHistoryItem_1 = __webpack_require__(25);
var AssignmentArguments_1 = __webpack_require__(37);
var TaskEditDialogCommand = (function (_super) {
    tslib_1.__extends(TaskEditDialogCommand, _super);
    function TaskEditDialogCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskEditDialogCommand.prototype.onBeforeDialogShow = function (params) {
        return this.modelManipulator.dispatcher.raiseTaskTaskEditDialogShowing(params, function (args) {
            var newValues = args.values;
            params.start = newValues.start;
            params.end = newValues.end;
            params.progress = newValues.progress;
            params.title = newValues.title;
            params.readOnlyFields = args.readOnlyFields;
            params.hiddenFields = args.hiddenFields;
        });
    };
    TaskEditDialogCommand.prototype.applyParameters = function (newParameters, oldParameters) {
        this.history.beginTransaction();
        var success = this.control.modelManipulator.dispatcher.raiseTaskMultipleUpdating(this.control.viewModel.tasks.getItemById(oldParameters.id), newParameters, function (newValues) {
            newParameters.title = newValues.title ? newValues.title : "";
            newParameters.progress = newValues.progress;
            newParameters.start = typeof newValues.start === "string" ? new Date(newValues.start) : newValues.start || new Date(0);
            newParameters.end = typeof newValues.end === "string" ? new Date(newValues.end) : newValues.end || new Date(0);
        });
        if (success) {
            if (newParameters.title !== oldParameters.title)
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskTitleHistoryItem(this.modelManipulator, oldParameters.id, newParameters.title));
            if (newParameters.progress !== oldParameters.progress)
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskProgressHistoryItem(this.modelManipulator, oldParameters.id, newParameters.progress));
            if (newParameters.end.getTime() < newParameters.start.getTime())
                newParameters.end = newParameters.start;
            if (newParameters.start !== oldParameters.start) {
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskStartHistoryItem(this.modelManipulator, oldParameters.id, newParameters.start));
                if (this.control.settings.validation.validateDependencies)
                    this.control.validationController.moveStartDependTasks(oldParameters.id, oldParameters.start);
            }
            if (newParameters.end !== oldParameters.end) {
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskEndHistoryItem(this.modelManipulator, oldParameters.id, newParameters.end));
                if (this.control.settings.validation.validateDependencies)
                    this.control.validationController.moveEndDependTasks(oldParameters.id, oldParameters.end);
            }
        }
        for (var i = 0; i < newParameters.assigned.length; i++) {
            var resource = oldParameters.assigned.getItemById(newParameters.assigned.getItem(i).internalId);
            if (!resource) {
                var resourceId = newParameters.assigned.getItem(i).internalId;
                var taskId = oldParameters.id;
                var args = new AssignmentArguments_1.ResourceAssigningArguments(resourceId, taskId);
                this.modelManipulator.dispatcher.notifyResourceAssigning(args);
                if (!args.cancel)
                    this.history.addAndRedo(new ResourceHistoryItem_1.AssignResourceHistoryItem(this.modelManipulator, args.resourceId, args.taskId));
            }
        }
        var _loop_1 = function (i) {
            var assigned = oldParameters.assigned.getItem(i);
            var resource = newParameters.assigned.getItemById(assigned.internalId);
            if (!resource) {
                var assignment = this_1.control.viewModel.assignments.items.filter(function (assignment) { return assignment.resourceId == assigned.internalId && assignment.taskId == oldParameters.id; })[0];
                if (this_1.modelManipulator.dispatcher.fireResourceUnassigning(assignment))
                    this_1.history.addAndRedo(new ResourceHistoryItem_1.DeassignResourceHistoryItem(this_1.modelManipulator, assignment.internalId));
            }
        };
        var this_1 = this;
        for (var i = 0; i < oldParameters.assigned.length; i++) {
            _loop_1(i);
        }
        var updateParents = newParameters.start !== oldParameters.start || newParameters.end !== oldParameters.end || newParameters.progress !== oldParameters.progress || newParameters.title !== oldParameters.title;
        if (success && updateParents)
            this.validationController.updateParentsIfRequired(oldParameters.id);
        this.history.endTransaction();
        return false;
    };
    TaskEditDialogCommand.prototype.createParameters = function (options) {
        options = options || this.control.viewModel.tasks.getItemById(this.control.currentSelectedTaskID);
        var param = new TaskEditParameters();
        param.id = options.internalId;
        param.title = options.title;
        param.progress = options.progress;
        param.start = options.start;
        param.end = options.end;
        param.assigned = this.control.viewModel.getAssignedResources(options);
        param.resources = new ResourceCollection_1.ResourceCollection();
        param.resources.addRange(this.control.viewModel.resources.items);
        param.showResourcesDialogCommand = this.control.commandManager.showResourcesDialog;
        param.showTaskEditDialogCommand = this.control.commandManager.showTaskEditDialog;
        param.enableEdit = this.isTaskEditEnabled();
        param.enableRangeEdit = this.isTaskRangeEditEnabled(options);
        return param;
    };
    TaskEditDialogCommand.prototype.isTaskEditEnabled = function () {
        var settings = this.control.settings;
        return settings.editing.enabled && settings.editing.allowTaskUpdate;
    };
    TaskEditDialogCommand.prototype.isTaskRangeEditEnabled = function (task) {
        return !this.control.viewModel.isTaskToCalculateByChildren(task.internalId);
    };
    TaskEditDialogCommand.prototype.isEnabled = function () {
        var gantt = this.control;
        var selectedItem = gantt.viewModel.findItem(gantt.currentSelectedTaskID);
        return !!selectedItem && selectedItem.selected;
    };
    TaskEditDialogCommand.prototype.getState = function () {
        var state = _super.prototype.getState.call(this);
        state.visible = state.visible && !this.control.taskEditController.dependencyId;
        return state;
    };
    TaskEditDialogCommand.prototype.getDialogName = function () {
        return "TaskEdit";
    };
    return TaskEditDialogCommand;
}(DialogBase_1.DialogBase));
exports.TaskEditDialogCommand = TaskEditDialogCommand;
var TaskEditParameters = (function (_super) {
    tslib_1.__extends(TaskEditParameters, _super);
    function TaskEditParameters() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enableEdit = true;
        _this.enableRangeEdit = true;
        _this.hiddenFields = [];
        _this.readOnlyFields = [];
        return _this;
    }
    TaskEditParameters.prototype.clone = function () {
        var clone = new TaskEditParameters();
        clone.id = this.id;
        clone.title = this.title;
        clone.progress = this.progress;
        clone.start = this.start;
        clone.end = this.end;
        clone.assigned = new ResourceCollection_1.ResourceCollection();
        clone.assigned.addRange(this.assigned.items);
        clone.resources = new ResourceCollection_1.ResourceCollection();
        clone.resources.addRange(this.resources.items);
        clone.showResourcesDialogCommand = this.showResourcesDialogCommand;
        clone.showTaskEditDialogCommand = this.showTaskEditDialogCommand;
        clone.enableEdit = this.enableEdit;
        clone.enableRangeEdit = this.enableRangeEdit;
        clone.hiddenFields = this.hiddenFields.slice();
        clone.readOnlyFields = this.readOnlyFields.slice();
        return clone;
    };
    return TaskEditParameters;
}(DialogBase_1.DialogParametersBase));
exports.TaskEditParameters = TaskEditParameters;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesDialogParameters = exports.ResourcesDialogCommand = void 0;
var tslib_1 = __webpack_require__(0);
var DialogBase_1 = __webpack_require__(27);
var ResourceCollection_1 = __webpack_require__(31);
var ConfirmationDialog_1 = __webpack_require__(26);
var ResourcesDialogCommand = (function (_super) {
    tslib_1.__extends(ResourcesDialogCommand, _super);
    function ResourcesDialogCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resourcesForDelete = [];
        return _this;
    }
    ResourcesDialogCommand.prototype.onBeforeDialogShow = function (params) {
        return this.modelManipulator.dispatcher.raiseResourceManagerDialogShowing(params, function (args) {
            params.resources = args.values.resources;
        });
    };
    ResourcesDialogCommand.prototype.applyParameters = function (newParameters, oldParameters) {
        this.history.beginTransaction();
        for (var i = 0; i < newParameters.resources.length; i++) {
            var resource = oldParameters.resources.getItemById(newParameters.resources.getItem(i).internalId);
            if (!resource)
                this.control.commandManager.createResourceCommand.execute(newParameters.resources.getItem(i).text);
        }
        for (var i = 0; i < oldParameters.resources.length; i++) {
            var resource = newParameters.resources.getItemById(oldParameters.resources.getItem(i).internalId);
            if (!resource)
                this.resourcesForDelete.push(oldParameters.resources.getItem(i));
        }
        this.history.endTransaction();
        return false;
    };
    ResourcesDialogCommand.prototype.createParameters = function (callBack) {
        this.callBack = callBack;
        var param = new ResourcesDialogParameters();
        param.resources = new ResourceCollection_1.ResourceCollection();
        param.resources.addRange(this.control.viewModel.resources.items);
        return param;
    };
    ResourcesDialogCommand.prototype.afterClosing = function () {
        var _this = this;
        if (this.resourcesForDelete.length) {
            var confirmationDialog = this.control.commandManager.showConfirmationDialog;
            var confirmationDialogParameters = new ConfirmationDialog_1.ConfirmationDialogParameters(ConfirmationDialog_1.ConfirmationType.ResourcesDelete, function () {
                _this.history.beginTransaction();
                for (var i = 0; i < _this.resourcesForDelete.length; i++)
                    _this.control.commandManager.removeResourceCommand.execute(_this.resourcesForDelete[i].internalId);
                _this.history.endTransaction();
            });
            confirmationDialogParameters.message = this.resourcesForDelete.reduce(function (a, b) { return tslib_1.__spreadArray(tslib_1.__spreadArray([], a), [b.text]); }, []).join(", ");
            if (this.callBack)
                confirmationDialog.afterClosing = function () { return _this.callBack(); };
            confirmationDialog.execute(confirmationDialogParameters);
        }
        else if (this.callBack)
            this.callBack();
    };
    ResourcesDialogCommand.prototype.getDialogName = function () {
        return "Resources";
    };
    return ResourcesDialogCommand;
}(DialogBase_1.DialogBase));
exports.ResourcesDialogCommand = ResourcesDialogCommand;
var ResourcesDialogParameters = (function (_super) {
    tslib_1.__extends(ResourcesDialogParameters, _super);
    function ResourcesDialogParameters() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourcesDialogParameters.prototype.clone = function () {
        var clone = new ResourcesDialogParameters();
        clone.resources = new ResourceCollection_1.ResourceCollection();
        clone.resources.addRange(this.resources.items);
        return clone;
    };
    return ResourcesDialogParameters;
}(DialogBase_1.DialogParametersBase));
exports.ResourcesDialogParameters = ResourcesDialogParameters;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GanttClientCommand = void 0;
var GanttClientCommand;
(function (GanttClientCommand) {
    GanttClientCommand[GanttClientCommand["CreateTask"] = 0] = "CreateTask";
    GanttClientCommand[GanttClientCommand["CreateSubTask"] = 1] = "CreateSubTask";
    GanttClientCommand[GanttClientCommand["RemoveTask"] = 2] = "RemoveTask";
    GanttClientCommand[GanttClientCommand["RemoveDependency"] = 3] = "RemoveDependency";
    GanttClientCommand[GanttClientCommand["TaskInformation"] = 4] = "TaskInformation";
    GanttClientCommand[GanttClientCommand["TaskAddContextItem"] = 5] = "TaskAddContextItem";
    GanttClientCommand[GanttClientCommand["Undo"] = 6] = "Undo";
    GanttClientCommand[GanttClientCommand["Redo"] = 7] = "Redo";
    GanttClientCommand[GanttClientCommand["ZoomIn"] = 8] = "ZoomIn";
    GanttClientCommand[GanttClientCommand["ZoomOut"] = 9] = "ZoomOut";
    GanttClientCommand[GanttClientCommand["FullScreen"] = 10] = "FullScreen";
    GanttClientCommand[GanttClientCommand["CollapseAll"] = 11] = "CollapseAll";
    GanttClientCommand[GanttClientCommand["ExpandAll"] = 12] = "ExpandAll";
    GanttClientCommand[GanttClientCommand["ResourceManager"] = 13] = "ResourceManager";
})(GanttClientCommand = exports.GanttClientCommand || (exports.GanttClientCommand = {}));


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RedoCommand = exports.UndoCommand = void 0;
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(7);
var UndoCommand = (function (_super) {
    tslib_1.__extends(UndoCommand, _super);
    function UndoCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UndoCommand.prototype.getState = function () {
        var state = new CommandBase_1.SimpleCommandState(this.isEnabled());
        state.visible = this.control.settings.editing.enabled;
        return state;
    };
    UndoCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    UndoCommand.prototype.executeInternal = function () {
        this.history.undo();
        return true;
    };
    UndoCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.history.canUndo();
    };
    return UndoCommand;
}(CommandBase_1.CommandBase));
exports.UndoCommand = UndoCommand;
var RedoCommand = (function (_super) {
    tslib_1.__extends(RedoCommand, _super);
    function RedoCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedoCommand.prototype.getState = function () {
        var state = new CommandBase_1.SimpleCommandState(this.isEnabled());
        state.visible = this.control.settings.editing.enabled;
        return state;
    };
    RedoCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    RedoCommand.prototype.executeInternal = function () {
        this.history.redo();
        return true;
    };
    RedoCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.history.canRedo();
    };
    return RedoCommand;
}(CommandBase_1.CommandBase));
exports.RedoCommand = RedoCommand;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomOutCommand = exports.ZoomInCommand = void 0;
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(7);
var ZoomInCommand = (function (_super) {
    tslib_1.__extends(ZoomInCommand, _super);
    function ZoomInCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZoomInCommand.prototype.getState = function () {
        return new CommandBase_1.SimpleCommandState(true);
    };
    ZoomInCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    ZoomInCommand.prototype.executeInternal = function () {
        this.control.zoomIn();
        return true;
    };
    return ZoomInCommand;
}(CommandBase_1.CommandBase));
exports.ZoomInCommand = ZoomInCommand;
var ZoomOutCommand = (function (_super) {
    tslib_1.__extends(ZoomOutCommand, _super);
    function ZoomOutCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZoomOutCommand.prototype.getState = function () {
        return new CommandBase_1.SimpleCommandState(true);
    };
    ZoomOutCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    ZoomOutCommand.prototype.executeInternal = function () {
        this.control.zoomOut();
        return true;
    };
    return ZoomOutCommand;
}(CommandBase_1.CommandBase));
exports.ZoomOutCommand = ZoomOutCommand;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleFullScreenCommand = void 0;
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(7);
var ToggleFullScreenCommand = (function (_super) {
    tslib_1.__extends(ToggleFullScreenCommand, _super);
    function ToggleFullScreenCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isInFullScreenMode = false;
        _this.fullScreenTempVars = {};
        return _this;
    }
    ToggleFullScreenCommand.prototype.getState = function () {
        var state = new CommandBase_1.SimpleCommandState(true);
        state.value = this.control.fullScreenModeHelper.isInFullScreenMode;
        return state;
    };
    ToggleFullScreenCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    ToggleFullScreenCommand.prototype.executeInternal = function () {
        this.control.fullScreenModeHelper.toggle();
        return true;
    };
    return ToggleFullScreenCommand;
}(CommandBase_1.CommandBase));
exports.ToggleFullScreenCommand = ToggleFullScreenCommand;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandAllCommand = exports.CollapseAllCommand = void 0;
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(7);
var CollapseAllCommand = (function (_super) {
    tslib_1.__extends(CollapseAllCommand, _super);
    function CollapseAllCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollapseAllCommand.prototype.getState = function () {
        return new CommandBase_1.SimpleCommandState(this.isEnabled());
    };
    CollapseAllCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    CollapseAllCommand.prototype.executeInternal = function () {
        this.control.ganttOwner.collapseAll();
        return true;
    };
    CollapseAllCommand.prototype.isEnabled = function () {
        return true;
    };
    return CollapseAllCommand;
}(CommandBase_1.CommandBase));
exports.CollapseAllCommand = CollapseAllCommand;
var ExpandAllCommand = (function (_super) {
    tslib_1.__extends(ExpandAllCommand, _super);
    function ExpandAllCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpandAllCommand.prototype.getState = function () {
        return new CommandBase_1.SimpleCommandState(this.isEnabled());
    };
    ExpandAllCommand.prototype.execute = function () {
        return _super.prototype.execute.call(this);
    };
    ExpandAllCommand.prototype.executeInternal = function () {
        this.control.ganttOwner.expandAll();
        return true;
    };
    ExpandAllCommand.prototype.isEnabled = function () {
        return true;
    };
    return ExpandAllCommand;
}(CommandBase_1.CommandBase));
exports.ExpandAllCommand = ExpandAllCommand;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceColorCommand = exports.ResourcePropertyCommandBase = void 0;
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(7);
var ResourcePropertiesHistoryItem_1 = __webpack_require__(134);
var ResourcePropertyCommandBase = (function (_super) {
    tslib_1.__extends(ResourcePropertyCommandBase, _super);
    function ResourcePropertyCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourcePropertyCommandBase.prototype.getState = function () {
        return new CommandBase_1.SimpleCommandState(this.isEnabled());
    };
    ResourcePropertyCommandBase.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && this.control.settings.editing.allowResourceUpdate;
    };
    return ResourcePropertyCommandBase;
}(CommandBase_1.CommandBase));
exports.ResourcePropertyCommandBase = ResourcePropertyCommandBase;
var ResourceColorCommand = (function (_super) {
    tslib_1.__extends(ResourceColorCommand, _super);
    function ResourceColorCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceColorCommand.prototype.execute = function (id, value) {
        return _super.prototype.execute.call(this, id, value);
    };
    ResourceColorCommand.prototype.executeInternal = function (id, value) {
        var oldColor = this.control.viewModel.resources.getItemById(id).color;
        if (oldColor == value)
            return false;
        this.history.addAndRedo(new ResourcePropertiesHistoryItem_1.ResourceColorHistoryItem(this.modelManipulator, id, value));
        return true;
    };
    return ResourceColorCommand;
}(ResourcePropertyCommandBase));
exports.ResourceColorCommand = ResourceColorCommand;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceColorHistoryItem = exports.ResourcePropertiesHistoryItemBase = void 0;
var tslib_1 = __webpack_require__(0);
var HistoryItem_1 = __webpack_require__(15);
var ResourcePropertiesHistoryItemBase = (function (_super) {
    tslib_1.__extends(ResourcePropertiesHistoryItemBase, _super);
    function ResourcePropertiesHistoryItemBase(modelManipulator, resourceId, newValue) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.resourceId = resourceId;
        _this.newValue = newValue;
        return _this;
    }
    ResourcePropertiesHistoryItemBase.prototype.redo = function () {
        this.oldState = this.getPropertiesManipulator().setValue(this.resourceId, this.newValue);
    };
    ResourcePropertiesHistoryItemBase.prototype.undo = function () {
        this.getPropertiesManipulator().restoreValue(this.oldState);
    };
    ResourcePropertiesHistoryItemBase.prototype.getPropertiesManipulator = function () {
        throw new Error("Not Implemented");
    };
    return ResourcePropertiesHistoryItemBase;
}(HistoryItem_1.HistoryItem));
exports.ResourcePropertiesHistoryItemBase = ResourcePropertiesHistoryItemBase;
var ResourceColorHistoryItem = (function (_super) {
    tslib_1.__extends(ResourceColorHistoryItem, _super);
    function ResourceColorHistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceColorHistoryItem.prototype.getPropertiesManipulator = function () {
        return this.modelManipulator.resource.properties.color;
    };
    return ResourceColorHistoryItem;
}(ResourcePropertiesHistoryItemBase));
exports.ResourceColorHistoryItem = ResourceColorHistoryItem;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BarManager = void 0;
var BarManager = (function () {
    function BarManager(control, bars) {
        this.control = control;
        this.bars = bars;
    }
    BarManager.prototype.updateContextMenu = function () {
        for (var i = 0, bar = void 0; bar = this.bars[i]; i++)
            if (bar.isContextMenu()) {
                bar.updateItemsList();
                var commandKeys = bar.getCommandKeys();
                for (var j = 0; j < commandKeys.length; j++)
                    this.updateBarItem(bar, commandKeys[j]);
            }
    };
    BarManager.prototype.updateItemsState = function (queryCommands) {
        var anyQuerySended = !!queryCommands.length;
        var _loop_1 = function (i, bar) {
            if (bar.isVisible()) {
                var commandKeys_1 = bar.getCommandKeys();
                var _loop_2 = function (j) {
                    if (anyQuerySended && !queryCommands.filter(function (q) { return q == commandKeys_1[j]; }).length)
                        return "continue";
                    this_1.updateBarItem(bar, commandKeys_1[j]);
                };
                for (var j = 0; j < commandKeys_1.length; j++) {
                    _loop_2(j);
                }
                bar.completeUpdate();
            }
        };
        var this_1 = this;
        for (var i = 0, bar = void 0; bar = this.bars[i]; i++) {
            _loop_1(i, bar);
        }
    };
    BarManager.prototype.updateBarItem = function (bar, commandKey) {
        var command = this.control.commandManager.getCommand(commandKey);
        if (command) {
            var commandState = command.getState();
            bar.setItemVisible(commandKey, commandState.visible);
            if (commandState.visible) {
                bar.setItemEnabled(commandKey, commandState.enabled);
                bar.setItemValue(commandKey, commandState.value);
            }
        }
    };
    return BarManager;
}());
exports.BarManager = BarManager;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationController = exports.ValidationError = void 0;
var tslib_1 = __webpack_require__(0);
var Dependency_1 = __webpack_require__(13);
var TaskPropertiesHistoryItem_1 = __webpack_require__(28);
var DateRange_1 = __webpack_require__(10);
var DateTimeUtils_1 = __webpack_require__(4);
var common_1 = __webpack_require__(1);
var ValidationError = (function () {
    function ValidationError(dependencyId, critical) {
        if (critical === void 0) { critical = false; }
        this.dependencyId = dependencyId;
        this.critical = critical;
    }
    return ValidationError;
}());
exports.ValidationError = ValidationError;
var ValidationController = (function () {
    function ValidationController(gantt) {
        this.gantt = gantt;
    }
    Object.defineProperty(ValidationController.prototype, "viewModel", {
        get: function () {
            return this.gantt.viewModel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ValidationController.prototype, "history", {
        get: function () {
            return this.gantt.history;
        },
        enumerable: false,
        configurable: true
    });
    ValidationController.prototype.checkStartDependencies = function (taskId, date) {
        var _this = this;
        var result = [];
        var task = this.gantt.viewModel.tasks.getItemById(taskId);
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.successorId == taskId; });
        dependencies.forEach(function (dep) {
            var predecessorTask = _this.gantt.viewModel.tasks.getItemById(dep.predecessorId);
            if (dep.type == Dependency_1.DependencyType.FS && predecessorTask.end > date || dep.type == Dependency_1.DependencyType.SS && predecessorTask.start > date)
                result.push(new ValidationError(dep.internalId, true));
            if (dep.type == Dependency_1.DependencyType.FS && predecessorTask.end.valueOf() == task.start.valueOf() && date > predecessorTask.end ||
                dep.type == Dependency_1.DependencyType.SS && predecessorTask.start.valueOf() == task.start.valueOf() && date > predecessorTask.start)
                result.push(new ValidationError(dep.internalId));
        });
        return result;
    };
    ValidationController.prototype.checkEndDependencies = function (taskId, date) {
        var _this = this;
        var result = [];
        var task = this.gantt.viewModel.tasks.getItemById(taskId);
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.successorId == taskId; });
        dependencies.forEach(function (dep) {
            var predecessorTask = _this.gantt.viewModel.tasks.getItemById(dep.predecessorId);
            if (dep.type == Dependency_1.DependencyType.SF && predecessorTask.start > date || dep.type == Dependency_1.DependencyType.FF && predecessorTask.end > date)
                result.push(new ValidationError(dep.internalId, true));
            if (dep.type == Dependency_1.DependencyType.SF && predecessorTask.start.valueOf() == task.end.valueOf() && date > predecessorTask.start ||
                dep.type == Dependency_1.DependencyType.FF && predecessorTask.end.valueOf() == task.end.valueOf() && date > predecessorTask.end)
                result.push(new ValidationError(dep.internalId));
        });
        return result;
    };
    ValidationController.prototype.moveEndDependTasks = function (taskId, previousEndDate) {
        var _this = this;
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.predecessorId == taskId; });
        dependencies.forEach(function (dep) {
            var task = _this.gantt.viewModel.tasks.getItemById(taskId);
            var successorTask = _this.gantt.viewModel.tasks.getItemById(dep.successorId);
            var rangeBeforeMove = new DateRange_1.DateRange(new Date(successorTask.start.getTime()), new Date(successorTask.end.getTime()));
            var validRange = new DateRange_1.DateRange(new Date(), new Date());
            if (dep.type == Dependency_1.DependencyType.FS && (successorTask.start < task.end || successorTask.start.valueOf() === previousEndDate.valueOf() && successorTask.start > task.end)) {
                validRange.start.setTime(task.end.getTime());
                validRange.end.setTime(validRange.start.getTime() + (successorTask.end.getTime() - successorTask.start.getTime()));
                _this.correctMoving(successorTask.internalId, validRange);
                _this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskMoveHistoryItem(_this.gantt.modelManipulator, dep.successorId, validRange));
                if (_this._parentAutoCalc) {
                    var delta = validRange.start.getTime() - rangeBeforeMove.start.getTime();
                    _this.correctOnMoving(successorTask.internalId, delta);
                }
                _this.moveStartDependTasks(dep.successorId, rangeBeforeMove.start);
                _this.moveEndDependTasks(dep.successorId, rangeBeforeMove.end);
            }
            if (dep.type == Dependency_1.DependencyType.FF && (successorTask.end < task.end || successorTask.end.valueOf() === previousEndDate.valueOf() && successorTask.end > task.end)) {
                validRange.start.setTime(task.end.getTime() - (successorTask.end.getTime() - successorTask.start.getTime()));
                validRange.end.setTime(task.end.getTime());
                _this.correctMoving(successorTask.internalId, validRange);
                _this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskMoveHistoryItem(_this.gantt.modelManipulator, dep.successorId, validRange));
                if (_this._parentAutoCalc) {
                    var delta = validRange.start.getTime() - rangeBeforeMove.start.getTime();
                    _this.correctOnMoving(successorTask.internalId, delta);
                }
                _this.moveStartDependTasks(dep.successorId, rangeBeforeMove.start);
                _this.moveEndDependTasks(dep.successorId, rangeBeforeMove.end);
            }
        });
    };
    ValidationController.prototype.moveStartDependTasks = function (taskId, previousStartDate) {
        var _this = this;
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.predecessorId == taskId; });
        dependencies.forEach(function (dep) {
            var task = _this.gantt.viewModel.tasks.getItemById(taskId);
            var successorTask = _this.gantt.viewModel.tasks.getItemById(dep.successorId);
            var rangeBeforeMove = new DateRange_1.DateRange(new Date(successorTask.start.getTime()), new Date(successorTask.end.getTime()));
            var validRange = new DateRange_1.DateRange(new Date(), new Date());
            if (dep.type == Dependency_1.DependencyType.SF && (successorTask.end < task.start || successorTask.end.valueOf() === previousStartDate.valueOf() && successorTask.end > task.start)) {
                validRange.start.setTime(task.start.getTime() - (successorTask.end.getTime() - successorTask.start.getTime()));
                validRange.end.setTime(task.start.getTime());
                _this.correctMoving(successorTask.internalId, validRange);
                _this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskMoveHistoryItem(_this.gantt.modelManipulator, dep.successorId, validRange));
                if (_this._parentAutoCalc) {
                    var delta = validRange.start.getTime() - rangeBeforeMove.start.getTime();
                    _this.correctOnMoving(successorTask.internalId, delta);
                }
                _this.moveStartDependTasks(dep.successorId, rangeBeforeMove.start);
                _this.moveEndDependTasks(dep.successorId, rangeBeforeMove.end);
            }
            if (dep.type == Dependency_1.DependencyType.SS && (successorTask.start < task.start || successorTask.start.valueOf() === previousStartDate.valueOf() && successorTask.start > task.start)) {
                validRange.start.setTime(task.start.getTime());
                validRange.end.setTime(task.start.getTime() + (successorTask.end.getTime() - successorTask.start.getTime()));
                _this.correctMoving(successorTask.internalId, validRange);
                _this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskMoveHistoryItem(_this.gantt.modelManipulator, dep.successorId, validRange));
                if (_this._parentAutoCalc) {
                    var delta = validRange.start.getTime() - rangeBeforeMove.start.getTime();
                    _this.correctOnMoving(successorTask.internalId, delta);
                }
                _this.moveStartDependTasks(dep.successorId, rangeBeforeMove.start);
                _this.moveEndDependTasks(dep.successorId, rangeBeforeMove.end);
            }
        });
    };
    ValidationController.prototype.correctMoving = function (taskId, dateRange) {
        var _this = this;
        var deltaDate = dateRange.end.getTime() - dateRange.start.getTime();
        var validationErrors = tslib_1.__spreadArray(tslib_1.__spreadArray([], this.checkStartDependencies(taskId, dateRange.start)), this.checkEndDependencies(taskId, dateRange.end));
        var criticalErrors = validationErrors.filter(function (e) { return e.critical; });
        criticalErrors.forEach(function (error) {
            var dependency = _this.gantt.viewModel.dependencies.getItemById(error.dependencyId);
            var predecessorTask = _this.gantt.viewModel.tasks.getItemById(dependency.predecessorId);
            if (dependency.type == Dependency_1.DependencyType.FS)
                if (dateRange.start < predecessorTask.end) {
                    dateRange.start.setTime(predecessorTask.end.getTime());
                    dateRange.end.setTime(dateRange.start.getTime() + deltaDate);
                }
            if (dependency.type == Dependency_1.DependencyType.SS)
                if (dateRange.start < predecessorTask.start) {
                    dateRange.start.setTime(predecessorTask.start.getTime());
                    dateRange.end.setTime(dateRange.start.getTime() + deltaDate);
                }
            if (dependency.type == Dependency_1.DependencyType.FF)
                if (dateRange.end < predecessorTask.end) {
                    dateRange.end.setTime(predecessorTask.end.getTime());
                    dateRange.start.setTime(dateRange.end.getTime() - deltaDate);
                }
            if (dependency.type == Dependency_1.DependencyType.SF)
                if (dateRange.end < predecessorTask.start) {
                    dateRange.end.setTime(predecessorTask.start.getTime());
                    dateRange.start.setTime(dateRange.end.getTime() - deltaDate);
                }
        });
        return dateRange;
    };
    ValidationController.prototype.recalculateParents = function (child, calcStepCallback) {
        var parent = child && child.parent;
        while (parent && parent.task) {
            var children = parent.children;
            var start = this.gantt.range.end;
            var end = this.gantt.range.start;
            var progress = 0;
            var totalDuration = 0;
            var data = { id: parent.task.internalId };
            for (var i = 0; i < children.length; i++) {
                var childTask = children[i].task;
                if (!childTask.isValid())
                    continue;
                start = DateTimeUtils_1.DateTimeUtils.getMinDate(start, childTask.start);
                end = DateTimeUtils_1.DateTimeUtils.getMaxDate(end, childTask.end);
                var duration = childTask.getDuration();
                progress += childTask.progress * duration;
                totalDuration += duration;
            }
            if (!DateTimeUtils_1.DateTimeUtils.areDatesEqual(parent.task.start, start))
                data["start"] = start;
            if (!DateTimeUtils_1.DateTimeUtils.areDatesEqual(parent.task.end, end))
                data["end"] = end;
            progress = Math.ceil(progress / totalDuration);
            if (progress !== parent.task.progress)
                data["progress"] = progress;
            calcStepCallback(data);
            parent = parent.parent;
        }
    };
    ValidationController.prototype.updateParentsRangeByChild = function (taskId) {
        var _this = this;
        this.recalculateParents(this.viewModel.findItem(taskId), function (data) {
            if (!common_1.isDefined(data.id))
                return;
            var history = _this.history;
            var manipulator = _this.gantt.modelManipulator;
            if (common_1.isDefined(data.start))
                history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskStartHistoryItem(manipulator, data.id, data.start));
            if (common_1.isDefined(data.end))
                history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskEndHistoryItem(manipulator, data.id, data.end));
            if (common_1.isDefined(data.progress))
                history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskProgressHistoryItem(manipulator, data.id, data.progress));
        });
    };
    ValidationController.prototype.updateChildRangeByParent = function (parentId, delta, changedTasks) {
        var item = this.viewModel.findItem(parentId);
        if (!item || item.children.length === 0)
            return;
        var children = item.children;
        for (var i = 0; i < children.length; i++) {
            var childTask = children[i].task;
            var newStart = new Date(childTask.start.getTime() + delta);
            var newEnd = new Date(childTask.end.getTime() + delta);
            changedTasks.push({ id: childTask.internalId, start: childTask.start, end: childTask.end });
            if (newStart < childTask.end) {
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskStartHistoryItem(this.gantt.modelManipulator, childTask.internalId, newStart));
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskEndHistoryItem(this.gantt.modelManipulator, childTask.internalId, newEnd));
            }
            else {
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskEndHistoryItem(this.gantt.modelManipulator, childTask.internalId, newEnd));
                this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskStartHistoryItem(this.gantt.modelManipulator, childTask.internalId, newStart));
            }
            this.updateChildRangeByParent(childTask.internalId, delta, changedTasks);
        }
    };
    ValidationController.prototype.updateParentsIfRequired = function (childId) {
        if (this._parentAutoCalc) {
            this.updateParentsRangeByChild(childId);
            this.gantt.updateOwnerInAutoParentMode();
        }
    };
    ValidationController.prototype.correctOnMoving = function (taskId, delta) {
        var _this = this;
        if (this._parentAutoCalc && delta !== 0) {
            this.updateParentsRangeByChild(taskId);
            var changedTasks = [];
            this.updateChildRangeByParent(taskId, delta, changedTasks);
            if (this.gantt.settings.validation.validateDependencies)
                changedTasks.forEach(function (i) {
                    _this.moveStartDependTasks(i.id, i.start);
                    _this.moveEndDependTasks(i.id, i.end);
                });
            this.gantt.updateOwnerInAutoParentMode();
        }
    };
    Object.defineProperty(ValidationController.prototype, "_parentAutoCalc", {
        get: function () {
            return this.viewModel.parentAutoCalc;
        },
        enumerable: false,
        configurable: true
    });
    return ValidationController;
}());
exports.ValidationController = ValidationController;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FullScreenModeHelper = void 0;
var browser_1 = __webpack_require__(5);
var attr_1 = __webpack_require__(138);
var dom_1 = __webpack_require__(2);
var FullScreenModeHelper = (function () {
    function FullScreenModeHelper(gantt) {
        this._isInFullScreenMode = false;
        this.fullScreenTempVars = {};
        this.gantt = gantt;
    }
    Object.defineProperty(FullScreenModeHelper.prototype, "isInFullScreenMode", {
        get: function () { return this._isInFullScreenMode; },
        enumerable: false,
        configurable: true
    });
    FullScreenModeHelper.prototype.toggle = function () {
        this._isInFullScreenMode = !this._isInFullScreenMode;
        if (this._isInFullScreenMode)
            this.setFullScreenMode();
        else
            this.setNormalMode();
        return true;
    };
    FullScreenModeHelper.prototype.setFullScreenMode = function () {
        this.prepareFullScreenMode();
        this.adjustControlInFullScreenMode();
    };
    FullScreenModeHelper.prototype.prepareFullScreenMode = function () {
        var mainElement = this.getMainElement();
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "border-top-width", "0px");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "border-left-width", "0px");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "border-right-width", "0px");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "border-bottom-width", "0px");
        this.fullScreenTempVars.scrollTop = dom_1.DomUtils.getDocumentScrollTop();
        this.fullScreenTempVars.scrollLeft = dom_1.DomUtils.getDocumentScrollLeft();
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "background-color", "white");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "position", "fixed");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "top", "0px");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "left", "0px");
        attr_1.AttrUtils.changeElementStyleAttribute(mainElement, "z-index", "1010");
        attr_1.AttrUtils.changeElementStyleAttribute(document.documentElement, "position", "static");
        attr_1.AttrUtils.changeElementStyleAttribute(document.documentElement, "overflow", "hidden");
        this.fullScreenTempVars.bodyMargin = document.body.style.margin;
        document.body.style.margin = "0";
        this.fullScreenTempVars.width = mainElement.style.width;
        this.fullScreenTempVars.height = mainElement.style.height || mainElement.clientHeight;
        if (window.self !== window.top)
            this.requestFullScreen(document.body);
    };
    FullScreenModeHelper.prototype.setNormalMode = function () {
        this.cancelFullScreen(document);
        var mainElement = this.getMainElement();
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "left");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "top");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "background-color");
        attr_1.AttrUtils.restoreElementStyleAttribute(document.documentElement, "overflow");
        attr_1.AttrUtils.restoreElementStyleAttribute(document.documentElement, "position");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "z-index");
        document.body.style.margin = this.fullScreenTempVars.bodyMargin;
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "position");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "border-top-width");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "border-left-width");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "border-right-width");
        attr_1.AttrUtils.restoreElementStyleAttribute(mainElement, "border-bottom-width");
        this.setHeight(this.fullScreenTempVars.height);
        this.setWidth(this.fullScreenTempVars.width);
        document.documentElement.scrollTop = this.fullScreenTempVars.scrollTop;
        document.documentElement.scrollLeft = this.fullScreenTempVars.scrollLeft;
        this.adjustControl();
    };
    FullScreenModeHelper.prototype.adjustControlInFullScreenMode = function () {
        var documentWidth = document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth;
        var documentHeight = document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
        this.setWidth(documentWidth);
        this.setHeight(documentHeight);
        this.adjustControl();
    };
    FullScreenModeHelper.prototype.requestFullScreen = function (element) {
        if (element.requestFullscreen)
            element.requestFullscreen();
        else if (element.mozRequestFullScreen)
            element.mozRequestFullScreen();
        else if (element.webkitRequestFullscreen)
            element.webkitRequestFullscreen();
        else if (element.msRequestFullscreen)
            element.msRequestFullscreen();
    };
    FullScreenModeHelper.prototype.cancelFullScreen = function (document) {
        if (browser_1.Browser.Firefox && !this.getFullScreenElement(document))
            return;
        if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if (document.msExitFullscreen)
            document.msExitFullscreen();
        else if (document.exitFullscreen)
            document.exitFullscreen();
    };
    FullScreenModeHelper.prototype.getFullScreenElement = function (document) {
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    };
    FullScreenModeHelper.prototype.setWidth = function (width) {
        var mainElement = this.getMainElement();
        mainElement.style.width = this.isNumber(width) ? width + "px" : width;
    };
    FullScreenModeHelper.prototype.setHeight = function (height) {
        var mainElement = this.getMainElement();
        mainElement.style.height = this.isNumber(height) ? height + "px" : height;
    };
    FullScreenModeHelper.prototype.isNumber = function (str) {
        return !isNaN(parseFloat(str)) && isFinite(str);
    };
    FullScreenModeHelper.prototype.getMainElement = function () {
        return this.gantt.getOwnerControlMainElement();
    };
    FullScreenModeHelper.prototype.adjustControl = function () {
        this.gantt.adjustOwnerControl();
    };
    return FullScreenModeHelper;
}());
exports.FullScreenModeHelper = FullScreenModeHelper;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = __webpack_require__(5);
var AttrUtils = (function () {
    function AttrUtils() {
    }
    AttrUtils.setElementAttribute = function (obj, attrName, value) {
        if (obj.setAttribute) {
            if (browser_1.Browser.IE && browser_1.Browser.MajorVersion >= 11 && attrName.toLowerCase() === 'src')
                obj.setAttribute(attrName, '');
            obj.setAttribute(attrName, value);
        }
    };
    AttrUtils.setStyleAttribute = function (obj, attrName, value) {
        if (obj.setProperty)
            obj.setProperty(attrName, value, '');
    };
    AttrUtils.getElementAttribute = function (obj, attrName) {
        return obj.getAttribute(attrName);
    };
    AttrUtils.getStyleAttribute = function (obj, attrName) {
        if (obj.getPropertyValue) {
            if (browser_1.Browser.Firefox) {
                try {
                    return obj.getPropertyValue(attrName);
                }
                catch (e) {
                    return obj[attrName];
                }
            }
            return obj.getPropertyValue(attrName);
        }
        return null;
    };
    AttrUtils.removeElementAttribute = function (obj, attrName) {
        if (obj.removeAttribute)
            obj.removeAttribute(attrName);
    };
    AttrUtils.removeStyleAttribute = function (obj, attrName) {
        if (obj.removeProperty)
            obj.removeProperty(attrName);
    };
    AttrUtils.changeElementStyleAttribute = function (obj, attrName, newValue) {
        AttrUtils.saveStyleAttributeInElement(obj, attrName);
        AttrUtils.setStyleAttribute(obj.style, attrName, newValue);
    };
    AttrUtils.restoreElementStyleAttribute = function (obj, attrName) {
        var savedAttrName = "saved" + attrName;
        var style = obj.style;
        if (AttrUtils.isExistsAttributeInElement(obj, savedAttrName)) {
            var oldValue = AttrUtils.getElementAttribute(obj, savedAttrName);
            if (oldValue === AttrUtils.emptyObject || oldValue === null)
                AttrUtils.removeStyleAttribute(style, attrName);
            else
                AttrUtils.setStyleAttribute(style, attrName, oldValue);
            AttrUtils.removeElementAttribute(obj, savedAttrName);
            return true;
        }
        return false;
    };
    AttrUtils.saveStyleAttributeInElement = function (obj, attrName) {
        var savedAttrName = "saved" + attrName;
        var style = obj.style;
        if (!AttrUtils.isExistsAttributeInElement(obj, savedAttrName)) {
            var oldValue = AttrUtils.getStyleAttribute(style, attrName);
            AttrUtils.setElementAttribute(obj, savedAttrName, AttrUtils.isAttributeExists(oldValue) ? oldValue : AttrUtils.emptyObject);
        }
    };
    AttrUtils.isExistsAttributeInElement = function (obj, attrName) {
        var value = AttrUtils.getElementAttribute(obj, attrName);
        return AttrUtils.isAttributeExists(value);
    };
    AttrUtils.isAttributeExists = function (attrValue) {
        return attrValue !== null && attrValue !== '';
    };
    AttrUtils.emptyObject = 'DxEmptyValue';
    return AttrUtils;
}());
exports.AttrUtils = AttrUtils;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfGanttExporter = void 0;
var PageDrawer_1 = __webpack_require__(140);
var PdfGanttExporter = (function () {
    function PdfGanttExporter(info) {
        if (!info.settings.pdfDoc && !info.settings.docCreateMethod)
            throw new Error("Cannot convert gantt to pdf without document instance!");
        this._info = info;
    }
    PdfGanttExporter.prototype.export = function () {
        var _a, _b;
        var pdfDoc = this.pdfDoc;
        var info = this._info;
        var drawer = new PageDrawer_1.PdfGanttPageDrawer(pdfDoc, info.settings);
        var pages = info.getPages(pdfDoc);
        var count = pages.length;
        for (var i = 0; i < count; i++) {
            if (i > 0)
                pdfDoc.addPage(this.getDocumentFormat(), this.getOrientation());
            var page = pages[i];
            drawer.drawPage(page);
        }
        if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.fileName)
            pdfDoc.save((_b = this.props) === null || _b === void 0 ? void 0 : _b.fileName);
        return pdfDoc;
    };
    Object.defineProperty(PdfGanttExporter.prototype, "pdfDoc", {
        get: function () {
            var _a, _b;
            (_a = this._pdfDoc) !== null && _a !== void 0 ? _a : (this._pdfDoc = (_b = this._info.settings.pdfDoc) !== null && _b !== void 0 ? _b : this.createDoc());
            return this._pdfDoc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttExporter.prototype, "props", {
        get: function () {
            return this._info.settings;
        },
        enumerable: false,
        configurable: true
    });
    PdfGanttExporter.prototype.createDoc = function () {
        var jsPDFProps = this.getJsPDFProps();
        return this._info.settings.docCreateMethod(jsPDFProps);
    };
    PdfGanttExporter.prototype.getJsPDFProps = function () {
        var props = { putOnlyUsedFonts: true, unit: "px", hotfixes: ["px_scaling"] };
        props["orientation"] = this.getOrientation();
        props["format"] = this.getDocumentFormat();
        return props;
    };
    PdfGanttExporter.prototype.getOrientation = function () {
        var _a;
        return ((_a = this.props) === null || _a === void 0 ? void 0 : _a.landscape) ? "l" : "p";
    };
    PdfGanttExporter.prototype.getDocumentFormat = function () {
        var _a, _b, _c, _d;
        if (!((_a = this.props) === null || _a === void 0 ? void 0 : _a.format) && !((_b = this.props) === null || _b === void 0 ? void 0 : _b.pageSize))
            return "a4";
        if ((_c = this.props) === null || _c === void 0 ? void 0 : _c.pageSize)
            return [this.props.pageSize.height, this.props.pageSize.width];
        return (_d = this.props) === null || _d === void 0 ? void 0 : _d.format;
    };
    return PdfGanttExporter;
}());
exports.PdfGanttExporter = PdfGanttExporter;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfGanttPageDrawer = void 0;
var point_1 = __webpack_require__(3);
var Drawer_1 = __webpack_require__(141);
var Interfaces_1 = __webpack_require__(30);
var Props_1 = __webpack_require__(40);
var Drawer_2 = __webpack_require__(142);
var PdfGanttPageDrawer = (function () {
    function PdfGanttPageDrawer(pdfDoc, props) {
        this._pdfDoc = pdfDoc;
        this._props = props;
    }
    PdfGanttPageDrawer.prototype.drawPage = function (info) {
        var pdfDoc = this._pdfDoc;
        var tableDrawer = new Drawer_2.PdfGanttTableDrawer(pdfDoc);
        if (this.needDrawChart()) {
            tableDrawer.drawTable(info.tables[Interfaces_1.PdfPageTableNames.chartMain]);
            var objectDrawer = new Drawer_1.PdfObjectDrawer(pdfDoc, info.objects);
            objectDrawer.draw();
            tableDrawer.drawTable(info.tables[Interfaces_1.PdfPageTableNames.chartScaleTop]);
            tableDrawer.drawTable(info.tables[Interfaces_1.PdfPageTableNames.chartScaleBottom]);
        }
        if (this.needDrawTreeList()) {
            tableDrawer.drawTable(info.tables[Interfaces_1.PdfPageTableNames.treeListMain]);
            tableDrawer.drawTable(info.tables[Interfaces_1.PdfPageTableNames.treeListHeader]);
        }
        this.drawMargins(info);
        return pdfDoc;
    };
    PdfGanttPageDrawer.prototype.needDrawChart = function () {
        return !this._props || this._props.exportMode === Props_1.ExportMode.all || this._props.exportMode === Props_1.ExportMode.chart;
    };
    PdfGanttPageDrawer.prototype.needDrawTreeList = function () {
        return !this._props || this._props.exportMode === Props_1.ExportMode.all || this._props.exportMode === Props_1.ExportMode.treeList;
    };
    PdfGanttPageDrawer.prototype.getContentRightBottom = function (info) {
        var p = new point_1.Point(0, 0);
        for (var key in info.tables)
            if (Object.prototype.hasOwnProperty.call(info.tables, key)) {
                var table = info.tables[key];
                p.x = Math.max(p.x, table.position.x + table.size.width);
                p.y = Math.max(p.y, table.position.y + table.size.height);
            }
        return p;
    };
    PdfGanttPageDrawer.prototype.drawMargins = function (info) {
        var pdfDoc = this._pdfDoc;
        var props = this._props;
        var docWidth = pdfDoc.getPageWidth();
        var docHeight = pdfDoc.getPageHeight();
        var p = this.getContentRightBottom(info);
        pdfDoc.setFillColor(255, 255, 255);
        pdfDoc.rect(0, 0, props.margins.left, docHeight, "F");
        pdfDoc.rect(0, 0, docWidth, props.margins.top, "F");
        pdfDoc.rect(p.x, 0, docWidth, docHeight, "F");
        pdfDoc.rect(0, p.y, docWidth, docHeight, "F");
    };
    return PdfGanttPageDrawer;
}());
exports.PdfGanttPageDrawer = PdfGanttPageDrawer;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfObjectDrawer = void 0;
var Enums_1 = __webpack_require__(11);
var Ellipsis_1 = __webpack_require__(62);
var TaskInfo_1 = __webpack_require__(38);
var PdfObjectDrawer = (function () {
    function PdfObjectDrawer(pdfDoc, info) {
        this._FONT_ROW_RATIO = 1.15;
        this._info = info;
        this._pdfDoc = pdfDoc;
    }
    PdfObjectDrawer.prototype.draw = function () {
        this.drawDependencies();
        this.drawTasks();
        this.drawResources();
    };
    PdfObjectDrawer.prototype.drawTasks = function () {
        var _this = this;
        var _a;
        var tasks = (_a = this._info) === null || _a === void 0 ? void 0 : _a.tasks;
        if (tasks)
            tasks.forEach(function (t) { return _this.drawTask(t); });
    };
    PdfObjectDrawer.prototype.drawTask = function (info) {
        var pdfDoc = this._pdfDoc;
        pdfDoc.setFillColor.apply(pdfDoc, info.taskColor.getRBGColor());
        pdfDoc.setDrawColor.apply(pdfDoc, info.taskColor.getRBGColor());
        if (info.isMilestone)
            this.drawMilestone(info);
        else
            this.drawRegularTask(info);
    };
    PdfObjectDrawer.prototype.drawMilestone = function (info) {
        var pdfDoc = this._pdfDoc;
        var x1 = info.sidePoints[0].x;
        var y1 = info.sidePoints[0].y;
        var x2 = info.sidePoints[1].x;
        var y2 = info.sidePoints[1].y;
        var x3 = info.sidePoints[2].x;
        var y3 = info.sidePoints[2].y;
        var x4 = info.sidePoints[3].x;
        var y4 = info.sidePoints[3].y;
        pdfDoc.triangle(x1, y1, x2, y2, x3, y3, "FD");
        pdfDoc.triangle(x1, y1, x4, y4, x3, y3, "FD");
    };
    PdfObjectDrawer.prototype.drawRegularTask = function (info) {
        var pdfDoc = this._pdfDoc;
        pdfDoc.rect(info.left, info.top, info.width, info.height, "FD");
        if (info.isParent)
            this.drawParentBorder(info);
        if (info.progressWidth) {
            pdfDoc.setFillColor.apply(pdfDoc, info.progressColor.getRBGColor());
            pdfDoc.rect(info.left, info.top, info.progressWidth, info.height, "F");
        }
        if (info.text)
            this.printTaskTitle(info);
    };
    PdfObjectDrawer.prototype.drawParentBorder = function (info) {
        var pdfDoc = this._pdfDoc;
        var left = info.sidePoints[0].x;
        var top = info.sidePoints[1].y;
        var bottom = info.sidePoints[3].y;
        var right = info.sidePoints[2].x;
        var height = info.sidePoints[3].y - info.sidePoints[1].y;
        var leftBorderColor = info.progressWidth > height ? info.progressColor.getRBGColor() : info.taskColor.getRBGColor();
        pdfDoc.setFillColor.apply(pdfDoc, leftBorderColor);
        pdfDoc.triangle(left, top, left, bottom, left + height, top, "FD");
        pdfDoc.setFillColor.apply(pdfDoc, info.taskColor.getRBGColor());
        pdfDoc.triangle(right, top, right, bottom, right - height, top, "FD");
    };
    PdfObjectDrawer.prototype.printTaskTitle = function (info) {
        var pdfDoc = this._pdfDoc;
        var style = info.textStyle;
        var colorArray = style && style.textColor.getRBGColor();
        var fontSize = style && style.fontSize;
        pdfDoc.setTextColor.apply(pdfDoc, colorArray);
        pdfDoc.setFontSize(fontSize);
        var textPosX;
        var textPosY = info.top + fontSize * this._FONT_ROW_RATIO / pdfDoc.internal.scaleFactor;
        if (info.isParent)
            textPosY -= TaskInfo_1.PdfTaskInfo.defaultParentHeightCorrection;
        var leftPadding = style && style.cellPadding.left || 0;
        var rightPadding = style && style.cellPadding.right || 0;
        if (info.textPosition === Enums_1.TaskTitlePosition.Inside) {
            var textWidth = info.width - leftPadding - rightPadding;
            textPosX = info.left + leftPadding;
            pdfDoc.text(Ellipsis_1.EllipsisHelper.limitPdfTextWithEllipsis(info.text, pdfDoc, textWidth), textPosX, textPosY);
        }
        else {
            textPosX = info.left - rightPadding;
            pdfDoc.text(info.text, textPosX, textPosY, { align: "right" });
        }
    };
    PdfObjectDrawer.prototype.drawDependencies = function () {
        var _this = this;
        var _a;
        var dependencies = (_a = this._info) === null || _a === void 0 ? void 0 : _a.dependencies;
        if (dependencies)
            dependencies.forEach(function (d) { return _this.drawDependencyLine(d); });
    };
    PdfObjectDrawer.prototype.drawDependencyLine = function (line) {
        var _a, _b;
        (_a = this._pdfDoc).setFillColor.apply(_a, line.fillColor.getRBGColor());
        (_b = this._pdfDoc).setDrawColor.apply(_b, line.fillColor.getRBGColor());
        if (line.arrowInfo)
            this.drawArrow(line);
        else {
            var points = line.points;
            this._pdfDoc.line(points[0].x, points[0].y, points[1].x, points[1].y);
        }
    };
    PdfObjectDrawer.prototype.isValidLine = function (line) {
        var points = line.points;
        return !isNaN(points[0].x) && !isNaN(points[0].y) && !isNaN(points[1].x) && !isNaN(points[1].y);
    };
    PdfObjectDrawer.prototype.drawArrow = function (line) {
        var width = line.arrowInfo.width || 0;
        var left = line.points[0].x;
        var top = line.points[0].y;
        switch (line.arrowInfo.position) {
            case Enums_1.Position.Left:
                this._pdfDoc.triangle(left, top + width, left + width, top, left + width, top + 2 * width, "FD");
                break;
            case Enums_1.Position.Right:
                this._pdfDoc.triangle(left, top, left, top + 2 * width, left + width, top + width, "FD");
                break;
            case Enums_1.Position.Top:
                this._pdfDoc.triangle(left, top + width, left + width, top, left + 2 * width, top + width, "FD");
                break;
            case Enums_1.Position.Bottom:
                this._pdfDoc.triangle(left, top, left + width, top + width, left + 2 * width, top, "FD");
                break;
        }
    };
    PdfObjectDrawer.prototype.drawResources = function () {
        var _this = this;
        var _a;
        var pdfDoc = this._pdfDoc;
        var resources = (_a = this._info) === null || _a === void 0 ? void 0 : _a.resources;
        if (resources)
            resources.forEach(function (r) {
                var _a, _b, _c;
                pdfDoc.setFontSize((_a = r.style.fontSize) !== null && _a !== void 0 ? _a : 11);
                var textPosY = r.y + r.style.fontSize * _this._FONT_ROW_RATIO / pdfDoc.internal.scaleFactor;
                var paddingLeft = (_b = r.style.cellPadding.left) !== null && _b !== void 0 ? _b : 0;
                var paddingRight = (_c = r.style.cellPadding.right) !== null && _c !== void 0 ? _c : 1;
                var resWidth = Math.max(r.style.cellWidth.getValue(), paddingLeft + pdfDoc.getTextWidth(r.text) + paddingRight);
                pdfDoc.setFillColor.apply(pdfDoc, r.style.fillColor.getRBGColor());
                pdfDoc.rect(r.x, r.y, resWidth, r.style.minCellHeight, "F");
                pdfDoc.setTextColor.apply(pdfDoc, r.style.textColor.getRBGColor());
                pdfDoc.text(r.text, r.x + paddingLeft, textPosY);
            });
    };
    return PdfObjectDrawer;
}());
exports.PdfObjectDrawer = PdfObjectDrawer;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfGanttTableDrawer = void 0;
var common_1 = __webpack_require__(1);
var Interfaces_1 = __webpack_require__(30);
var Ellipsis_1 = __webpack_require__(62);
var TableOptions_1 = __webpack_require__(143);
var PdfGanttTableDrawer = (function () {
    function PdfGanttTableDrawer(pdfDoc) {
        this._pdfDoc = pdfDoc;
    }
    PdfGanttTableDrawer.prototype.drawTable = function (info) {
        if (info) {
            var options = this.createTableOptions(info);
            this._pdfDoc.autoTable(options.getValue());
        }
    };
    PdfGanttTableDrawer.prototype.createTableOptions = function (info) {
        var options = this.createDefaultTableOptions();
        this.addTableCommonSettings(info, options);
        this.addCommonTableStyles(info, options);
        this.prepareBodyCells(info);
        options.addBody(info.cells);
        if (info.hideRowLines)
            this.hideRowLines(options);
        return options;
    };
    PdfGanttTableDrawer.prototype.createDefaultTableOptions = function () {
        var options = new TableOptions_1.TableOptions();
        options.pageBreak = "auto";
        options.margin.assign(0);
        options.tableWidth.assign("auto");
        options.styles.cellPadding.assign(0);
        options.styles.halign = "center";
        options.styles.valign = "middle";
        options.styles.lineWidth = 1;
        options.styles.overflow = "hidden";
        return options;
    };
    PdfGanttTableDrawer.prototype.addTableCommonSettings = function (info, options) {
        options.startY = info.position.y;
        options.margin.assign({ left: info.position.x });
        options.tableWidth.assign(info.size.width);
    };
    PdfGanttTableDrawer.prototype.addCommonTableStyles = function (info, tableInfo) {
        var styles = tableInfo.styles;
        styles.assign(info.style);
        if (styles.fillColor.opacity === 0)
            styles.fillColor.assign("#FFFFFF");
        styles.minCellHeight = info.baseCellSize.height;
        tableInfo.alternateRowStyles.minCellHeight = tableInfo.styles.minCellHeight;
        tableInfo.alternateRowStyles.fillColor.assign(tableInfo.styles.fillColor);
        if (common_1.isDefined(info.baseCellSize.width))
            styles.cellWidth.assign(info.baseCellSize.width);
    };
    PdfGanttTableDrawer.prototype.prepareBodyCells = function (info) {
        var _a, _b, _c;
        var needCheckText = info.name === Interfaces_1.PdfPageTableNames.treeListMain;
        if (needCheckText) {
            var source = info.cells;
            for (var i = 0; i < source.length; i++) {
                var sourceRow = source[i];
                for (var j = 0; j < sourceRow.length; j++) {
                    var cell = sourceRow[j];
                    var styles = cell.styles;
                    var width = ((_a = styles === null || styles === void 0 ? void 0 : styles.cellWidth) === null || _a === void 0 ? void 0 : _a.getValue()) || info.baseCellSize.width || 0;
                    var leftPadding = (_b = styles === null || styles === void 0 ? void 0 : styles.cellPadding.left) !== null && _b !== void 0 ? _b : 0;
                    var rightPadding = (_c = styles === null || styles === void 0 ? void 0 : styles.cellPadding.right) !== null && _c !== void 0 ? _c : 0;
                    var textWidth = Math.max(width - leftPadding - rightPadding - PdfGanttTableDrawer.cellEllipsisSpace, 0);
                    cell.content = Ellipsis_1.EllipsisHelper.limitPdfTextWithEllipsis(cell.content, this._pdfDoc, textWidth);
                }
            }
        }
    };
    PdfGanttTableDrawer.prototype.hideRowLines = function (options) {
        options.styles.lineWidth = 0;
        options.onDrawCellCallback = function (data) {
            var cell = data.cell;
            var doc = data.doc;
            var color = cell.styles.lineColor;
            var left = cell.x;
            var right = cell.x + cell.styles.cellWidth;
            var top = cell.y;
            var bottom = cell.y + data.row.height;
            var isLastColumn = data.column.index === data.table.columns.length - 1;
            var isLastRow = data.row.index === data.table.body.length - 1;
            var isFirstRow = data.row.index === 0;
            doc.setDrawColor(color[0], color[1], color[2]);
            doc.setLineWidth(1);
            doc.line(left, bottom, left, top);
            if (isLastColumn)
                doc.line(right, bottom, right, top);
            if (isFirstRow)
                doc.line(left, top, right, top);
            if (isLastRow)
                doc.line(left, bottom, right, bottom);
        };
    };
    PdfGanttTableDrawer.cellEllipsisSpace = 3;
    return PdfGanttTableDrawer;
}());
exports.PdfGanttTableDrawer = PdfGanttTableDrawer;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOptions = void 0;
var common_1 = __webpack_require__(1);
var CellDef_1 = __webpack_require__(41);
var Color_1 = __webpack_require__(16);
var PredefinedStyles_1 = __webpack_require__(39);
var Margin_1 = __webpack_require__(29);
var StyleDef_1 = __webpack_require__(19);
var Width_1 = __webpack_require__(63);
var TableOptions = (function () {
    function TableOptions() {
        this._margin = new Margin_1.Margin();
        this._tableLineColor = new Color_1.Color();
        this._tableWidth = new Width_1.Width();
        this._styles = new StyleDef_1.StyleDef();
        this._alternateRowStyles = new StyleDef_1.StyleDef();
    }
    Object.defineProperty(TableOptions.prototype, "pageBreak", {
        get: function () { return this._pageBreak; },
        set: function (value) { this._pageBreak = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.pageBreak); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "rowPageBreak", {
        get: function () { return this._rowPageBreak; },
        set: function (value) { this._rowPageBreak = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.rowPageBreak); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "showHead", {
        get: function () { return this._showHead; },
        set: function (value) { this._showHead = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.headerFooterVisibility); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "showFoot", {
        get: function () { return this._showFoot; },
        set: function (value) { this._showFoot = PredefinedStyles_1.PredefinedStyles.getPredefinedStringOrUndefined(value, PredefinedStyles_1.PredefinedStyles.headerFooterVisibility); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "startY", {
        get: function () { return this._startY; },
        set: function (value) { this._startY = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "tableLineWidth", {
        get: function () { return this._tableLineWidth; },
        set: function (value) { this._tableLineWidth = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "margin", {
        get: function () { return this._margin; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "tableLineColor", {
        get: function () { return this._tableLineColor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "tableWidth", {
        get: function () { return this._tableWidth; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "body", {
        get: function () { return this._body; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "styles", {
        get: function () { return this._styles; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableOptions.prototype, "alternateRowStyles", {
        get: function () { return this._alternateRowStyles; },
        enumerable: false,
        configurable: true
    });
    TableOptions.prototype.hasValue = function () { return true; };
    TableOptions.prototype.getValue = function () {
        var _this = this;
        var options = {};
        options["pageBreak"] = this.pageBreak;
        options["rowPageBreak"] = this.rowPageBreak;
        options["showFoot"] = this.showFoot;
        options["showHead"] = this.showHead;
        options["startY"] = this.startY;
        options["tableLineWidth"] = this.tableLineWidth;
        this.getJsPdfProviderProps().forEach(function (key) {
            var prop = _this[key];
            if (prop && prop.hasValue())
                options[key] = prop.getValue();
        });
        options["body"] = this.getBodyForJsPdf();
        options["columnStyles"] = this.getColumnStylesForJsPdf();
        if (this.onDrawCellCallback)
            options["didDrawCell"] = this.onDrawCellCallback;
        return options;
    };
    TableOptions.prototype.getJsPdfProviderProps = function () {
        return [
            "margin",
            "tableLineColor",
            "tableWidth",
            "styles",
            "alternateRowStyles"
        ];
    };
    TableOptions.prototype.getBodyForJsPdf = function () {
        var result = [];
        for (var i = 0; i < this._body.length; i++) {
            var sourceRow = this._body[i];
            var row = [];
            for (var j = 0; j < sourceRow.length; j++)
                row.push(sourceRow[j].getValue());
            result.push(row);
        }
        return result;
    };
    TableOptions.prototype.assign = function (source) {
        if (!source)
            return;
        if (common_1.isDefined(source["margin"]))
            this.margin.assign(source["margin"]);
        if (common_1.isDefined(source["pageBreak"]))
            this.pageBreak = source["pageBreak"];
        if (common_1.isDefined(source["rowPageBreak"]))
            this.rowPageBreak = source["rowPageBreak"];
        if (common_1.isDefined(source["showFoot"]))
            this.showFoot = source["showFoot"];
        if (common_1.isDefined(source["showHead"]))
            this.showHead = source["showHead"];
        if (common_1.isDefined(source["startY"]))
            this.startY = source["startY"];
        if (common_1.isDefined(source["tableLineWidth"]))
            this.tableLineWidth = source["tableLineWidth"];
        if (common_1.isDefined(source["tableLineColor"]))
            this.tableLineColor.assign(source["tableLineColor"]);
        if (common_1.isDefined(source["tableWidth"]))
            this.tableWidth.assign(source["tableWidth"]);
    };
    TableOptions.prototype.addBody = function (source) {
        if (!source)
            return;
        this._body = new Array();
        this.addCells(source, this._body);
    };
    TableOptions.prototype.addCells = function (source, target) {
        var tableBackColor = this.styles.fillColor;
        for (var i = 0; i < source.length; i++) {
            var sourceRow = source[i];
            var row = new Array();
            for (var j = 0; j < sourceRow.length; j++) {
                var cell = new CellDef_1.CellDef(sourceRow[j]);
                if (tableBackColor.hasValue() && cell.styles && cell.styles.fillColor.hasValue())
                    cell.styles.fillColor.applyOpacityToBackground(tableBackColor);
                row.push(cell);
            }
            target.push(row);
        }
    };
    TableOptions.prototype.applyColumnStyle = function (key, style) {
        var _a;
        (_a = this._columnStyles) !== null && _a !== void 0 ? _a : (this._columnStyles = new Array());
        this._columnStyles[key] = new StyleDef_1.StyleDef(style);
    };
    TableOptions.prototype.getColumnStylesForJsPdf = function () {
        if (this._columnStyles) {
            var result_1 = {};
            this._columnStyles.forEach(function (v, i) {
                if (v)
                    result_1[i] = v.getValue();
            });
            return result_1;
        }
        return null;
    };
    return TableOptions;
}());
exports.TableOptions = TableOptions;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GanttExportCalculator = void 0;
var point_1 = __webpack_require__(3);
var dom_1 = __webpack_require__(2);
var Enums_1 = __webpack_require__(11);
var GridLayoutCalculator_1 = __webpack_require__(14);
var DependencyLineInfo_1 = __webpack_require__(64);
var TaskResourcesInfo_1 = __webpack_require__(65);
var TaskInfo_1 = __webpack_require__(38);
var Color_1 = __webpack_require__(16);
var StyleDef_1 = __webpack_require__(19);
var Margin_1 = __webpack_require__(29);
var CellDef_1 = __webpack_require__(41);
var TaskAreaHelper_1 = __webpack_require__(145);
var Props_1 = __webpack_require__(40);
var Interfaces_1 = __webpack_require__(30);
var size_1 = __webpack_require__(9);
var Paginator_1 = __webpack_require__(146);
var GanttExportCalculator = (function () {
    function GanttExportCalculator(owner, props) {
        var _a;
        var _b;
        this._owner = owner;
        this._props = new Props_1.GanttPdfExportProps(props);
        (_a = (_b = this._props).margins) !== null && _a !== void 0 ? _a : (_b.margins = new Margin_1.Margin(GanttExportCalculator._defaultPageMargin));
    }
    Object.defineProperty(GanttExportCalculator.prototype, "chartTableScaleTopMatrix", {
        get: function () {
            var _a;
            (_a = this._chartTableScaleTopMatrix) !== null && _a !== void 0 ? _a : (this._chartTableScaleTopMatrix = this.calculateChartScaleMatrix(0));
            return this._chartTableScaleTopMatrix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "chartTableScaleBottomMatrix", {
        get: function () {
            var _a;
            (_a = this._chartTableScaleBottomMatrix) !== null && _a !== void 0 ? _a : (this._chartTableScaleBottomMatrix = this.calculateChartScaleMatrix(1));
            return this._chartTableScaleBottomMatrix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "chartTableBodyMatrix", {
        get: function () {
            if (!this._chartTableBodyMatrix)
                this.calculateChartTableBodyMatrix();
            return this._chartTableBodyMatrix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "treeListHeaderMatrix", {
        get: function () {
            if (!this._treeListHeaderMatrix)
                this.calculateTreeListTableHeaderMatrix();
            return this._treeListHeaderMatrix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "treeListBodyMatrix", {
        get: function () {
            if (!this._treeListBodyMatrix)
                this.calculateTreeListTableBodyMatrix();
            return this._treeListBodyMatrix;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getPages = function (pdfDoc) {
        var paginator = new Paginator_1.PdfGanttPaginator(pdfDoc, this.settings, this.createGlobalInfo());
        return paginator.getPages();
    };
    Object.defineProperty(GanttExportCalculator.prototype, "settings", {
        get: function () {
            return this._props;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "layoutCalculator", {
        get: function () {
            return this._owner && this._owner.gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "taskAreaHelper", {
        get: function () {
            var _a;
            (_a = this._taskAreaHelper) !== null && _a !== void 0 ? _a : (this._taskAreaHelper = new TaskAreaHelper_1.TaskAreaExportHelper(this._owner, this._props));
            return this._taskAreaHelper;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "visibleTaskIndices", {
        get: function () {
            return this.taskAreaHelper.visibleTaskIndices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "baseCellWidth", {
        get: function () {
            return this.taskAreaHelper.baseCellSize.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "baseCellHeight", {
        get: function () {
            return this.taskAreaHelper.baseCellSize.height;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "chartScaleTableStyle", {
        get: function () {
            var _a;
            (_a = this._chartScaleTableStyle) !== null && _a !== void 0 ? _a : (this._chartScaleTableStyle = new StyleDef_1.StyleDef(this.taskAreaHelper.scaleTableStyle));
            return this._chartScaleTableStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "chartMainTableStyle", {
        get: function () {
            var _a;
            (_a = this._chartMainTableStyle) !== null && _a !== void 0 ? _a : (this._chartMainTableStyle = new StyleDef_1.StyleDef(this.taskAreaHelper.chartMainTableStyle));
            return this._chartMainTableStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "treeListTableStyle", {
        get: function () {
            if (!this._treeListTableStyle)
                this.calculateTreeListTableStyle();
            return this._treeListTableStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "pageTopMargin", {
        get: function () {
            return this._props.margins.top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "pageLeftMargin", {
        get: function () {
            return this._props.margins.left;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "headerTableTop", {
        get: function () {
            var _a;
            (_a = this._headerTableTop) !== null && _a !== void 0 ? _a : (this._headerTableTop = this.pageTopMargin);
            return this._headerTableTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "mainTableTop", {
        get: function () {
            var _a;
            (_a = this._mainTableTop) !== null && _a !== void 0 ? _a : (this._mainTableTop = this.getMainTableTop());
            return this._mainTableTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "exportDataMode", {
        get: function () {
            return this._props.exportDataMode;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getMainTableTop = function () {
        return this.headerTableTop + this.headerTableHeight - this.taskAreaHelper.offsetTop;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "chartLeft", {
        get: function () {
            var _a;
            (_a = this._chartLeft) !== null && _a !== void 0 ? _a : (this._chartLeft = this.getChartLeft());
            return this._chartLeft;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getChartLeft = function () {
        var _a;
        var mode = ((_a = this._props) === null || _a === void 0 ? void 0 : _a.exportMode) || Props_1.ExportMode.all;
        var visibleLeft = mode === Props_1.ExportMode.chart ? this.pageLeftMargin : this.treeListLeft + this.treeListWidth;
        var left = visibleLeft - this.taskAreaHelper.offsetLeft;
        return left;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "treeListLeft", {
        get: function () {
            var _a;
            (_a = this._treeListLeft) !== null && _a !== void 0 ? _a : (this._treeListLeft = this.pageLeftMargin);
            return this._treeListLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "headerTableHeight", {
        get: function () {
            return 2 * this.taskAreaHelper.headerRowHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "mainTableHeight", {
        get: function () {
            var _a;
            (_a = this._mainTableHeight) !== null && _a !== void 0 ? _a : (this._mainTableHeight = this.visibleTaskIndices.length * this.baseCellHeight);
            return this._mainTableHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "treeListWidth", {
        get: function () {
            var _a;
            (_a = this._treeListWidth) !== null && _a !== void 0 ? _a : (this._treeListWidth = this.getTreeListTableWidth());
            return this._treeListWidth;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getTreeListTableWidth = function () {
        var _this = this;
        var _a;
        var headerWidths = this.treeListHeaderMatrix[0].map(function (c, i) { return _this.getTreeListColumnWidth(i); });
        return (_a = headerWidths === null || headerWidths === void 0 ? void 0 : headerWidths.reduce(function (acc, v) { return acc += v; }, 0)) !== null && _a !== void 0 ? _a : 0;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "chartWidth", {
        get: function () {
            var _a;
            (_a = this._chartWidth) !== null && _a !== void 0 ? _a : (this._chartWidth = this.chartTableScaleBottomMatrix[0].length * this.baseCellWidth);
            return this._chartWidth;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.createGlobalInfo = function () {
        var info = {
            objects: this._canExportChart() ? this.getGanttObjectsInfo() : null,
            tables: this.getTablesInfo()
        };
        return info;
    };
    GanttExportCalculator.prototype.getTablesInfo = function () {
        var info = {};
        if (this._canExportTreelist()) {
            info[Interfaces_1.PdfPageTableNames.treeListHeader] = this.createTreeListHeaderTableInfo();
            info[Interfaces_1.PdfPageTableNames.treeListMain] = this.createTreeListMainTableInfo();
        }
        if (this._canExportChart()) {
            info[Interfaces_1.PdfPageTableNames.chartMain] = this.createChartMainTableInfo();
            info[Interfaces_1.PdfPageTableNames.chartScaleTop] = this._createChartScaleTopInfo();
            info[Interfaces_1.PdfPageTableNames.chartScaleBottom] = this._createChartScaleBottomInfo();
        }
        return info;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "exportMode", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this._props) === null || _a === void 0 ? void 0 : _a.exportMode) !== null && _b !== void 0 ? _b : Props_1.ExportMode.all;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype._canExportTreelist = function () {
        return this.exportMode === Props_1.ExportMode.all || this.exportMode === Props_1.ExportMode.treeList;
    };
    GanttExportCalculator.prototype._canExportChart = function () {
        return this.exportMode === Props_1.ExportMode.all || this.exportMode === Props_1.ExportMode.chart;
    };
    GanttExportCalculator.prototype._createChartScaleTopInfo = function () {
        return {
            name: Interfaces_1.PdfPageTableNames.chartScaleTop,
            size: new size_1.Size(this.chartWidth, this.taskAreaHelper.headerRowHeight),
            position: new point_1.Point(this.chartLeft, this.headerTableTop),
            style: this.chartScaleTableStyle,
            baseCellSize: new size_1.Size(this.baseCellWidth, this.taskAreaHelper.headerRowHeight),
            cells: this.chartTableScaleTopMatrix
        };
    };
    GanttExportCalculator.prototype._createChartScaleBottomInfo = function () {
        var rowHeight = this.taskAreaHelper.headerRowHeight;
        return {
            name: Interfaces_1.PdfPageTableNames.chartScaleBottom,
            size: new size_1.Size(this.chartWidth, rowHeight),
            position: new point_1.Point(this.chartLeft, this.headerTableTop + rowHeight),
            style: this.chartScaleTableStyle,
            baseCellSize: new size_1.Size(this.baseCellWidth, rowHeight),
            cells: this.chartTableScaleBottomMatrix
        };
    };
    GanttExportCalculator.prototype.createChartMainTableInfo = function () {
        var info = {
            name: Interfaces_1.PdfPageTableNames.chartMain,
            size: new size_1.Size(this.chartWidth, this.mainTableHeight),
            position: new point_1.Point(this.chartLeft, this.mainTableTop),
            style: this.chartMainTableStyle,
            baseCellSize: new size_1.Size(this.baseCellWidth, this.baseCellHeight),
            cells: this.chartTableBodyMatrix,
            hideRowLines: !this._owner.settings.areHorizontalBordersEnabled
        };
        return info;
    };
    GanttExportCalculator.prototype.createTreeListHeaderTableInfo = function () {
        var info = {
            name: Interfaces_1.PdfPageTableNames.treeListHeader,
            size: new size_1.Size(this.treeListWidth, this.headerTableHeight),
            position: new point_1.Point(this.treeListLeft, this.headerTableTop),
            style: this.treeListTableStyle,
            baseCellSize: new size_1.Size(null, this.headerTableHeight),
            cells: this.treeListHeaderMatrix
        };
        return info;
    };
    GanttExportCalculator.prototype.createTreeListMainTableInfo = function () {
        var info = {
            name: Interfaces_1.PdfPageTableNames.treeListMain,
            size: new size_1.Size(this.treeListWidth, this.mainTableHeight),
            position: new point_1.Point(this.treeListLeft, this.mainTableTop),
            style: this.treeListTableStyle,
            baseCellSize: new size_1.Size(null, this.baseCellHeight),
            cells: this.treeListBodyMatrix,
            hideRowLines: !this._owner.settings.areHorizontalBordersEnabled
        };
        return info;
    };
    GanttExportCalculator.prototype.calculateChartScaleMatrix = function (index) {
        var helper = this.taskAreaHelper;
        var ranges = helper.scaleRanges;
        var row = new Array();
        var start = ranges[index][0];
        var end = ranges[index][1];
        for (var j = start; j <= end; j++) {
            var cell = new CellDef_1.CellDef(this._owner.getScaleItemText(j, helper.scales[index]));
            cell.styles.cellPadding.assign(0);
            cell.styles.minCellHeight = this.taskAreaHelper.headerRowHeight;
            if (index === 0) {
                var colSpan = helper.scaleTopColSpans[j];
                var cellWidth = this.baseCellWidth * colSpan;
                cell.styles.cellWidth.assign(cellWidth);
            }
            row.push(cell);
        }
        return [row];
    };
    GanttExportCalculator.prototype.calculateChartTableBodyMatrix = function () {
        var _this = this;
        this._chartTableBodyMatrix = new Array();
        this.visibleTaskIndices.forEach(function (i) { return _this._chartTableBodyMatrix.push(_this.createChartTableBodyRow(i)); });
    };
    GanttExportCalculator.prototype.createChartTableBodyRow = function (index) {
        var etalon = new CellDef_1.CellDef();
        if (this.rowHasChildren(index))
            etalon.styles.fillColor.assign(this.taskAreaHelper.parentRowBackColor);
        return this.chartTableScaleBottomMatrix[0].map(function () { return new CellDef_1.CellDef(etalon); });
    };
    GanttExportCalculator.prototype.rowHasSelection = function (index) {
        return this._owner.rowHasSelection(index);
    };
    GanttExportCalculator.prototype.rowHasChildren = function (index) {
        return this._owner.rowHasChildren(index);
    };
    GanttExportCalculator.prototype.calculateTreeListTableHeaderMatrix = function () {
        this._treeListHeaderMatrix = new Array();
        var owner = this._owner;
        var colCount = owner.getTreeListColCount();
        var row = new Array();
        for (var j = 0; j < colCount; j++) {
            var cell = new CellDef_1.CellDef(owner.getTreeListHeaderInfo(j));
            cell.styles.minCellHeight = 2 * this.taskAreaHelper.headerRowHeight;
            row.push(cell);
        }
        this._treeListHeaderMatrix.push(row);
    };
    GanttExportCalculator.prototype.calculateTreeListTableBodyMatrix = function () {
        this._treeListBodyMatrix = new Array();
        var visibleTaskIndices = this.visibleTaskIndices;
        var colCount = this.treeListHeaderMatrix[0].length;
        for (var i = 0; i < visibleTaskIndices.length; i++) {
            var row = new Array();
            for (var j = 0; j < colCount; j++) {
                var cell = new CellDef_1.CellDef(this._owner.getTreeListCellInfo(visibleTaskIndices[i], j));
                if (!cell.styles.cellWidth.hasValue())
                    cell.styles.cellWidth.assign(this.getTreeListColumnWidth(j));
                if (this.rowHasChildren(visibleTaskIndices[i]))
                    cell.styles.fillColor.assign(this.taskAreaHelper.parentRowBackColor);
                row.push(cell);
            }
            this._treeListBodyMatrix.push(row);
        }
    };
    GanttExportCalculator.prototype.getTreeListColumnWidth = function (colIndex) {
        var info = this.treeListHeaderMatrix[0][colIndex];
        var style = info && info.styles;
        var numWidth = style.cellWidth.getValue();
        return numWidth || style.minCellWidth || 0;
    };
    Object.defineProperty(GanttExportCalculator.prototype, "dataObjectLeftDelta", {
        get: function () {
            var _a;
            (_a = this._dataObjectLeftDelta) !== null && _a !== void 0 ? _a : (this._dataObjectLeftDelta = this.getDataObjectLeftDelta());
            return this._dataObjectLeftDelta;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "dataObjectTopDelta", {
        get: function () {
            var _a;
            (_a = this._dataObjectTopDelta) !== null && _a !== void 0 ? _a : (this._dataObjectTopDelta = this.getDataObjectTopDelta());
            return this._dataObjectTopDelta;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.calculateTreeListTableStyle = function () {
        this._treeListTableStyle = new StyleDef_1.StyleDef(this._owner.getTreeListTableStyle());
        this._treeListTableStyle.fillColor.assign(this.chartMainTableStyle.fillColor);
        this._treeListTableStyle.lineColor.assign(this.chartMainTableStyle.lineColor);
    };
    GanttExportCalculator.prototype.getGanttObjectsInfo = function () {
        return {
            tasks: this.tasksInfo,
            dependencies: this.dependenciesInfo,
            resources: this.resourcesInfo
        };
    };
    Object.defineProperty(GanttExportCalculator.prototype, "tasksInfo", {
        get: function () {
            var _a;
            (_a = this._tasksInfo) !== null && _a !== void 0 ? _a : (this._tasksInfo = this.calculateTasksInfo());
            return this._tasksInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "dependenciesInfo", {
        get: function () {
            var _a;
            (_a = this._dependenciesInfo) !== null && _a !== void 0 ? _a : (this._dependenciesInfo = this.calculateDependenciesInfo());
            return this._dependenciesInfo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GanttExportCalculator.prototype, "resourcesInfo", {
        get: function () {
            var _a;
            (_a = this._resourcesInfo) !== null && _a !== void 0 ? _a : (this._resourcesInfo = this.calculateResourcesInfo());
            return this._resourcesInfo;
        },
        enumerable: false,
        configurable: true
    });
    GanttExportCalculator.prototype.getDataObjectLeftDelta = function () {
        return this.chartLeft - this.taskAreaHelper.objectsLeftDelta;
    };
    GanttExportCalculator.prototype.getDataObjectTopDelta = function () {
        return this.headerTableTop + this.headerTableHeight - this.taskAreaHelper.objectsTopDelta;
    };
    GanttExportCalculator.prototype.calculateTasksInfo = function () {
        var _this = this;
        var result = new Array();
        this.visibleTaskIndices.forEach(function (i) { return result.push(_this.calculateTaskInfo(i)); });
        return result;
    };
    GanttExportCalculator.prototype.calculateTaskInfo = function (index) {
        var info = new TaskInfo_1.PdfTaskInfo();
        var taskElementInfo = this.layoutCalculator.getTaskElementInfo(index);
        info.taskColor = this.getTaskColor(index);
        info.sidePoints = this.getTaskSidePoints(index);
        info.isMilestone = taskElementInfo.className.indexOf(GridLayoutCalculator_1.GridLayoutCalculator.milestoneClassName) > 0;
        if (!info.isMilestone) {
            info.isSmallTask = taskElementInfo.className.indexOf(GridLayoutCalculator_1.GridLayoutCalculator.smallTaskClassName) > 0;
            info.isParent = taskElementInfo.className.indexOf(GridLayoutCalculator_1.GridLayoutCalculator.parentTaskClassName) > 0;
            this.appendTaskTitle(info, index);
            this.appendTaskProgress(info, index);
        }
        return info;
    };
    GanttExportCalculator.prototype.appendTaskTitle = function (info, index) {
        var textPosition = this._owner.settings.taskTitlePosition;
        var isTextHidden = info.isSmallTask && textPosition !== Enums_1.TaskTitlePosition.Outside || textPosition === Enums_1.TaskTitlePosition.None;
        if (!isTextHidden) {
            info.text = this._owner.getTaskText(index);
            info.textPosition = textPosition;
            info.textStyle = this.getTaskTextStyle(index);
        }
    };
    GanttExportCalculator.prototype.appendTaskProgress = function (info, index) {
        var progressInfo = this.layoutCalculator.getTaskProgressElementInfo(index);
        info.progressWidth = progressInfo.size.width;
        info.progressColor = this.getTaskProgressColor(index);
        info.progressColor.applyOpacityToBackground(info.taskColor);
    };
    GanttExportCalculator.prototype.getTaskSidePoints = function (index) {
        var _this = this;
        var points = this.layoutCalculator.getTaskSidePoints(index);
        points.forEach(function (p) {
            p.x += _this.dataObjectLeftDelta;
            p.y += _this.dataObjectTopDelta;
        });
        return points;
    };
    GanttExportCalculator.prototype.getTaskColor = function (index) {
        var _a;
        var color = ((_a = this._owner.getTask(index)) === null || _a === void 0 ? void 0 : _a.color) || this.taskAreaHelper.getTaskElementBackColor(index, GridLayoutCalculator_1.GridLayoutCalculator.taskClassName);
        return new Color_1.Color(color);
    };
    GanttExportCalculator.prototype.getTaskProgressColor = function (index) {
        return new Color_1.Color(this.taskAreaHelper.getTaskElementBackColor(index, GridLayoutCalculator_1.GridLayoutCalculator.taskProgressClassName));
    };
    GanttExportCalculator.prototype.getTaskTextStyle = function (index) {
        var style = new StyleDef_1.StyleDef();
        style.cellPadding.assign(0);
        style.assign(this.taskAreaHelper.getTaskElementStyle(index, GridLayoutCalculator_1.GridLayoutCalculator.taskTitleClassName));
        return style;
    };
    GanttExportCalculator.prototype.calculateDependenciesInfo = function () {
        var _this = this;
        var result = new Array();
        var helper = this.taskAreaHelper;
        var fillColor = new Color_1.Color(helper.dependencyColor);
        helper.connectorLines.forEach(function (line) { return result.push(_this.createLineInfo(line, fillColor, helper.arrowWidth)); });
        return result;
    };
    GanttExportCalculator.prototype.createLineInfo = function (line, fillColor, arrowWidth) {
        var info = new DependencyLineInfo_1.PdfDependencyLineInfo();
        info.fillColor = fillColor;
        var isArrow = line.className.indexOf(GridLayoutCalculator_1.GridLayoutCalculator.arrowClassName) > -1;
        if (isArrow) {
            var position = this.layoutCalculator.getArrowPositionByClassName(line.className);
            info.arrowInfo = { position: position, width: arrowWidth };
            info.points = [this.getArrowTopCorner(line, position, arrowWidth)];
        }
        else
            info.points = this.getLinePoints(line);
        return info;
    };
    GanttExportCalculator.prototype.getArrowTopCorner = function (info, position, width) {
        var x = info.position.x + this.dataObjectLeftDelta;
        var y = info.position.y + this.dataObjectTopDelta;
        switch (position) {
            case Enums_1.Position.Left:
                x += width;
                break;
            case Enums_1.Position.Top:
                y += width;
        }
        return new point_1.Point(x, y);
    };
    GanttExportCalculator.prototype.getLinePoints = function (line) {
        var x1 = line.position.x + this.dataObjectLeftDelta;
        var y1 = line.position.y + this.dataObjectTopDelta;
        var x2 = x1 + line.size.width;
        var y2 = y1 + line.size.height;
        return [new point_1.Point(x1, y1), new point_1.Point(x2, y2)];
    };
    GanttExportCalculator.prototype.calculateResourcesInfo = function () {
        var _this = this;
        var result = new Array();
        this.taskAreaHelper.resourcesElements.forEach(function (rw) { return result = result.concat(_this.calculateResourcesInLine(rw)); });
        return result;
    };
    GanttExportCalculator.prototype.calculateResourcesInLine = function (wrapper) {
        var result = new Array();
        if (wrapper) {
            var left = dom_1.DomUtils.pxToInt(wrapper.style.left) + this.dataObjectLeftDelta;
            var top_1 = dom_1.DomUtils.pxToInt(wrapper.style.top) + this.dataObjectTopDelta;
            var resources = wrapper.getElementsByClassName(GridLayoutCalculator_1.GridLayoutCalculator.taskResourceClassName);
            for (var i = 0; i < resources.length; i++) {
                var resource = resources[i];
                var style = getComputedStyle(resource);
                left += this.getMargin(style).left;
                result.push(new TaskResourcesInfo_1.PdfTaskResourcesInfo(resource.textContent, new StyleDef_1.StyleDef(style), left, top_1));
                left += dom_1.DomUtils.pxToInt(style.width);
            }
        }
        return result;
    };
    GanttExportCalculator.prototype.getMargin = function (style) {
        var margin = new Margin_1.Margin(0);
        if (style) {
            var marginCss = style.margin;
            if (!marginCss) {
                marginCss += style.marginTop || "0";
                marginCss += " " + style.marginRight || false;
                marginCss += " " + style.marginBottom || false;
                marginCss += " " + style.marginLeft || false;
            }
            margin.assign(marginCss);
        }
        return margin;
    };
    GanttExportCalculator._defaultPageMargin = 10;
    return GanttExportCalculator;
}());
exports.GanttExportCalculator = GanttExportCalculator;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskAreaExportHelper = void 0;
var dom_1 = __webpack_require__(2);
var GridLayoutCalculator_1 = __webpack_require__(14);
var Utils_1 = __webpack_require__(33);
var Props_1 = __webpack_require__(40);
var Color_1 = __webpack_require__(16);
var TaskAreaExportHelper = (function () {
    function TaskAreaExportHelper(owner, props) {
        this._owner = owner;
        this._props = props;
    }
    Object.defineProperty(TaskAreaExportHelper.prototype, "baseCellSize", {
        get: function () { return this._owner.tickSize; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "objectsLeftDelta", {
        get: function () {
            return this.renderedScaleLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "objectsTopDelta", {
        get: function () {
            var firstIndex = this.visibleTaskIndices[0];
            return this.getCellTop(firstIndex) + this.getTaskCellOffsetTop(firstIndex);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "offsetLeft", {
        get: function () {
            var _a;
            (_a = this._offsetLeft) !== null && _a !== void 0 ? _a : (this._offsetLeft = Math.max(this.visibleLeft - this.renderedScaleLeft, 0));
            return this._offsetLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "offsetTop", {
        get: function () {
            var _a;
            (_a = this._offsetTop) !== null && _a !== void 0 ? _a : (this._offsetTop = this.getOffsetTop());
            return this._offsetTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scales", {
        get: function () {
            var viewType = this.settings.viewType;
            return [Utils_1.DateUtils.ViewTypeToScaleMap[viewType], viewType];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleRanges", {
        get: function () {
            return [
                [this.scaleTopStartIndex, this.scaleTopEndIndex],
                [this.scaleBottomStartIndex, this.scaleBottomEndIndex]
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleBottomStartIndex", {
        get: function () {
            var _a;
            (_a = this._scaleBottomStartIndex) !== null && _a !== void 0 ? _a : (this._scaleBottomStartIndex = this.getScaleBottomStartIndex());
            return this._scaleBottomStartIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleBottomEndIndex", {
        get: function () {
            var _a;
            (_a = this._scaleBottomEndIndex) !== null && _a !== void 0 ? _a : (this._scaleBottomEndIndex = this.getScaleBottomEndIndex());
            return this._scaleBottomEndIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleTopStartIndex", {
        get: function () {
            var _a;
            (_a = this._scaleTopStartIndex) !== null && _a !== void 0 ? _a : (this._scaleTopStartIndex = this.getScaleTopStartIndex());
            return this._scaleTopStartIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleTopEndIndex", {
        get: function () {
            var _a;
            (_a = this._scaleTopEndIndex) !== null && _a !== void 0 ? _a : (this._scaleTopEndIndex = this.getScaleTopEndIndex());
            return this._scaleTopEndIndex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleTopColSpans", {
        get: function () {
            var _a;
            (_a = this._scaleTopSolSpans) !== null && _a !== void 0 ? _a : (this._scaleTopSolSpans = this.getScaleTopColSpans());
            return this._scaleTopSolSpans;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "headerRowHeight", {
        get: function () {
            if (!this._headerRowHeight) {
                var element = this.scaleElements[0].filter(function (el) { return !!el; })[0];
                this._headerRowHeight = element === null || element === void 0 ? void 0 : element.offsetHeight;
            }
            return this._headerRowHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleTaskIndices", {
        get: function () {
            var _a;
            (_a = this._visibleTaskIndices) !== null && _a !== void 0 ? _a : (this._visibleTaskIndices = this.getTaskIndices());
            return this._visibleTaskIndices;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleTableStyle", {
        get: function () {
            var _a;
            (_a = this._scaleTableStyle) !== null && _a !== void 0 ? _a : (this._scaleTableStyle = this.getScaleTableStyle());
            return this._scaleTableStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "chartMainTableStyle", {
        get: function () {
            var _a;
            (_a = this._chartMainTableStyle) !== null && _a !== void 0 ? _a : (this._chartMainTableStyle = this.getChartMainTableStyle());
            return this._chartMainTableStyle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "parentRowBackColor", {
        get: function () {
            var _a;
            (_a = this._parentRowBackColor) !== null && _a !== void 0 ? _a : (this._parentRowBackColor = this.getParentBackColor());
            return this._parentRowBackColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "arrowWidth", {
        get: function () {
            var _a;
            (_a = this._arrowWidth) !== null && _a !== void 0 ? _a : (this._arrowWidth = this.getArrowWidth());
            return this._arrowWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "dependencyColor", {
        get: function () {
            var _a;
            (_a = this._dependencyColor) !== null && _a !== void 0 ? _a : (this._dependencyColor = this.getDependencyColor());
            return this._dependencyColor;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getTaskElementBackColor = function (taskIndex, className) {
        var style = this.getTaskElementStyle(taskIndex, className);
        return style === null || style === void 0 ? void 0 : style.backgroundColor;
    };
    TaskAreaExportHelper.prototype.getTaskElementStyle = function (taskIndex, className) {
        var taskWrapper = this.getTaskWrapper(taskIndex);
        return this.getElementStyle(taskWrapper.getElementsByClassName(className)[0]);
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleLeft", {
        get: function () {
            var _a;
            (_a = this._visibleLeft) !== null && _a !== void 0 ? _a : (this._visibleLeft = this.isVisibleMode ? this.container.scrollLeft : 0);
            return this._visibleLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleTop", {
        get: function () {
            var _a;
            (_a = this._visibleTop) !== null && _a !== void 0 ? _a : (this._visibleTop = this.isVisibleMode ? this.container.scrollTop : 0);
            return this._visibleTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleRight", {
        get: function () {
            var _a;
            (_a = this._visibleRight) !== null && _a !== void 0 ? _a : (this._visibleRight = this.getVisibleRight());
            return this._visibleRight;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getVisibleRight = function () {
        var width = this.container.getElement().offsetWidth;
        return this.visibleLeft + width;
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleBottom", {
        get: function () {
            var _a;
            (_a = this._visibleBottom) !== null && _a !== void 0 ? _a : (this._visibleBottom = this.getVisibleBottom());
            return this._visibleBottom;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getVisibleBottom = function () {
        if (!this.isVisibleMode)
            return this.visibleTaskIndices.length * this.baseCellSize.height;
        return this.visibleTop + this.container.getHeight();
    };
    TaskAreaExportHelper.prototype.getScaleBottomStartIndex = function () {
        var left = this.isVisibleMode ? this.visibleLeft : this.getPosByDate(this.startDate);
        return Math.floor(left / this.baseCellSize.width);
    };
    TaskAreaExportHelper.prototype.getScaleBottomEndIndex = function () {
        var right = this.isVisibleMode ? this.visibleRight : this.getPosByDate(this.endDate) - 1;
        return Math.floor(right / this.baseCellSize.width);
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleColSpan", {
        get: function () {
            return this.layoutCalculator.getScaleItemColSpan(this.scales[0]);
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getScaleTopStartIndex = function () {
        return Math.floor(this.scaleBottomStartIndex / this.scaleColSpan);
    };
    TaskAreaExportHelper.prototype.getScaleTopEndIndex = function () {
        return Math.floor(this.scaleBottomEndIndex / this.scaleColSpan);
    };
    TaskAreaExportHelper.prototype.getScaleTopColSpans = function () {
        var colSpans = new Array();
        for (var i = this.scaleTopStartIndex; i <= this.scaleTopEndIndex; i++) {
            var isFirst = i === this.scaleTopStartIndex;
            var isLast = i === this.scaleTopEndIndex;
            var colSpan = isLast ? this.scaleBottomEndIndex % this.scaleColSpan + 1 : this.scaleColSpan;
            if (isFirst)
                colSpan -= this.scaleBottomStartIndex % this.scaleColSpan;
            colSpans[i] = colSpan;
        }
        return colSpans;
    };
    TaskAreaExportHelper.prototype.getOffsetTop = function () {
        return this.isVisibleMode ? this.getTaskCellOffsetTop(this.visibleTaskIndices[0]) : 0;
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "renderedScaleLeft", {
        get: function () {
            return this.getCellLeft(this.scaleBottomStartIndex);
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getTaskCellOffsetTop = function (taskIndex) {
        var point = this.getCellTop(taskIndex);
        return Math.max(this.visibleTop - point, 0);
    };
    TaskAreaExportHelper.prototype.getCellTop = function (index) {
        var point = this.layoutCalculator.getGridBorderPosition(index - 1, false);
        return point.y;
    };
    TaskAreaExportHelper.prototype.getCellLeft = function (index) {
        var point = this.layoutCalculator.getGridBorderPosition(index - 1, true);
        return point.x;
    };
    TaskAreaExportHelper.prototype.getTaskIndices = function () {
        var _a, _b, _c, _d;
        if (this.dataMode === Props_1.DataExportMode.all || this.exportRange) {
            var allIndices = this._owner.getAllVisibleTaskIndices();
            var start_1 = (_b = (_a = this.exportRange) === null || _a === void 0 ? void 0 : _a.startIndex) !== null && _b !== void 0 ? _b : allIndices[0];
            var end_1 = (_d = (_c = this.exportRange) === null || _c === void 0 ? void 0 : _c.endIndex) !== null && _d !== void 0 ? _d : allIndices[allIndices.length - 1];
            return allIndices.filter(function (tIndex) { return tIndex >= start_1 && tIndex <= end_1; });
        }
        return this.getVisibleTaskIndices();
    };
    TaskAreaExportHelper.prototype.getVisibleTaskIndices = function () {
        var _this = this;
        var indices = [];
        this.taskElements.forEach(function (t, i) {
            if (t) {
                var taskTop = dom_1.DomUtils.pxToInt(t.style.top);
                var taskBottom = taskTop + t.offsetHeight;
                var topInArea = taskTop >= _this.visibleTop && taskTop <= _this.visibleBottom;
                var bottomInArea = taskBottom >= _this.visibleTop && taskBottom <= _this.visibleBottom;
                if (topInArea || bottomInArea)
                    indices.push(i);
            }
        });
        return indices;
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleElements", {
        get: function () {
            return this._owner.scaleElements.slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "scaleBorders", {
        get: function () {
            return this._owner.scaleBorders.slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "hlRowElements", {
        get: function () {
            return this._owner.hlRowElements.filter(function (el) { return !!el; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "selectionElements", {
        get: function () {
            return this._owner.selectionElements.filter(function (el) { return !!el; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "taskElements", {
        get: function () {
            return this._owner.taskElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "connectorLines", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._connectorLines) !== null && _a !== void 0 ? _a : (this._connectorLines = this._owner.renderedConnectorLines.filter(function (l) { return _this.isLineVisible(l); }));
            return this._connectorLines;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.isLineVisible = function (line) {
        if (this.dataMode === Props_1.DataExportMode.all)
            return true;
        var id = line.attr["dependency-id"];
        return this.visibleDependencyKeys.indexOf(id) > -1;
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "visibleDependencyKeys", {
        get: function () {
            var _a;
            (_a = this._visibleDependencyKeys) !== null && _a !== void 0 ? _a : (this._visibleDependencyKeys = this._owner.getVisibleDependencyKeysByTaskRange(this.visibleTaskIndices));
            return this._visibleDependencyKeys;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "resourcesElements", {
        get: function () {
            var _this = this;
            var _a;
            (_a = this._resourcesElements) !== null && _a !== void 0 ? _a : (this._resourcesElements = this.visibleTaskIndices.map(function (tIndex) { return _this._owner.resourcesElements[tIndex]; }).filter(function (r) { return r && r.parentElement; }));
            return this._resourcesElements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "taskArea", {
        get: function () {
            return this._owner.taskArea;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "settings", {
        get: function () { return this._owner.settings; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "dataMode", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.exportDataMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "exportRange", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.dateRange;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "isVisibleMode", {
        get: function () {
            return this.dataMode === Props_1.DataExportMode.visible && !this.exportRange;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "startDate", {
        get: function () { var _a; return ((_a = this.exportRange) === null || _a === void 0 ? void 0 : _a.startDate) || this._owner.range.start; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "endDate", {
        get: function () { var _a; return ((_a = this.exportRange) === null || _a === void 0 ? void 0 : _a.endDate) || this._owner.range.end; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "layoutCalculator", {
        get: function () {
            return this._owner.gridLayoutCalculator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskAreaExportHelper.prototype, "container", {
        get: function () {
            return this._owner.taskAreaContainer;
        },
        enumerable: false,
        configurable: true
    });
    TaskAreaExportHelper.prototype.getPosByDate = function (date) {
        return this.layoutCalculator.getPosByDate(date);
    };
    TaskAreaExportHelper.prototype.getScaleTableStyle = function () {
        var result = {};
        var visibleScaleItem = this.scaleElements[0].filter(function (el) { return !!el; })[0];
        var style = this.getElementStyle(visibleScaleItem);
        result["backgroundColor"] = this.findElementBackColor(visibleScaleItem);
        result["borderColor"] = this.getChartTableBorderColor();
        result["verticalAlign"] = "middle";
        result["textAlign"] = "center";
        result["fontSize"] = style.fontSize;
        result["fontFamily"] = style.fontFamily;
        result["fontWeight"] = style.fontWeight;
        result["fontStyle"] = style.fontStyle;
        result["color"] = style.color;
        return result;
    };
    TaskAreaExportHelper.prototype.getChartMainTableStyle = function () {
        var result = {};
        result["backgroundColor"] = this.findElementBackColor(this.taskArea);
        result["borderColor"] = this.getChartTableBorderColor();
        return result;
    };
    TaskAreaExportHelper.prototype.findElementBackColor = function (element) {
        if (!element)
            return null;
        var parent = element;
        var color = new Color_1.Color("transparent");
        while (color.opacity === 0 && parent) {
            var style = this.getElementStyle(parent);
            color.assign(style.backgroundColor);
            parent = parent.parentElement;
        }
        return color;
    };
    TaskAreaExportHelper.prototype.getChartTableBorderColor = function () {
        var style = this.getElementStyle(this.scaleBorders[0].filter(function (el) { return !!el; })[0]);
        return style === null || style === void 0 ? void 0 : style.borderColor;
    };
    TaskAreaExportHelper.prototype.getParentBackColor = function () {
        var style = this.getElementStyle(this.hlRowElements[0]);
        return style === null || style === void 0 ? void 0 : style.backgroundColor;
    };
    TaskAreaExportHelper.prototype.getArrowWidth = function () {
        var style = this.getDependencyLineStyle(GridLayoutCalculator_1.GridLayoutCalculator.arrowClassName);
        var borderWidth = style.borderWidth || style.borderLeftWidth || style.borderRightWidth || style.borderTopWidth || style.borderBottomWidth;
        return style && dom_1.DomUtils.pxToInt(borderWidth);
    };
    TaskAreaExportHelper.prototype.getDependencyColor = function () {
        var style = this.getDependencyLineStyle(GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL);
        return style === null || style === void 0 ? void 0 : style.borderColor;
    };
    TaskAreaExportHelper.prototype.getDependencyLineStyle = function (className) {
        return this.getElementStyle(this.taskArea.getElementsByClassName(className)[0]);
    };
    TaskAreaExportHelper.prototype.getElementStyle = function (element) {
        return element && getComputedStyle(element);
    };
    TaskAreaExportHelper.prototype.getTaskWrapper = function (index) {
        if (this.isTaskTemplateMode)
            return this._owner.fakeTaskWrapper;
        if (!this.taskElements[index])
            this._owner.createDefaultTaskElement(index);
        return this.taskElements[index];
    };
    Object.defineProperty(TaskAreaExportHelper.prototype, "isTaskTemplateMode", {
        get: function () {
            return !!this._owner.settings.taskContentTemplate;
        },
        enumerable: false,
        configurable: true
    });
    return TaskAreaExportHelper;
}());
exports.TaskAreaExportHelper = TaskAreaExportHelper;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfGanttPaginator = void 0;
var point_1 = __webpack_require__(3);
var size_1 = __webpack_require__(9);
var DependencyLineInfo_1 = __webpack_require__(64);
var TaskInfo_1 = __webpack_require__(38);
var TaskResourcesInfo_1 = __webpack_require__(65);
var Interfaces_1 = __webpack_require__(30);
var CellDef_1 = __webpack_require__(41);
var PageNavigation_1 = __webpack_require__(147);
var CellNavigationInfo = (function () {
    function CellNavigationInfo(pageHorIndex, pageVerIndex, cellRowIndexOnPage, cellColIndexOnPage, cell) {
        this.pageVerIndex = pageVerIndex;
        this.pageHorIndex = pageHorIndex;
        this.cellRowIndexOnPage = cellRowIndexOnPage;
        this.cellColIndexOnPage = cellColIndexOnPage;
        this.cell = cell;
    }
    return CellNavigationInfo;
}());
var VectorInfo = (function () {
    function VectorInfo(pageIndex, globalCellIndex, pageOffset, cutSize) {
        this.pageIndex = pageIndex;
        this.globalCellIndex = globalCellIndex;
        this.pageOffset = pageOffset;
        this.cutSize = cutSize;
    }
    Object.defineProperty(VectorInfo.prototype, "isCutted", {
        get: function () {
            return this.cutSize > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VectorInfo.prototype, "cellIndexOnPage", {
        get: function () {
            return this.globalCellIndex - this.pageOffset;
        },
        enumerable: false,
        configurable: true
    });
    return VectorInfo;
}());
var PdfGanttPaginator = (function () {
    function PdfGanttPaginator(pdfDoc, props, globalInfo) {
        this._pdfDoc = pdfDoc;
        this._props = props;
        this._globalInfo = globalInfo;
    }
    PdfGanttPaginator.prototype.getPages = function () {
        delete this._pages;
        this._paginateTables();
        this._paginateObjects();
        return this.pageMatrixToArray;
    };
    PdfGanttPaginator.prototype._paginateTables = function () {
        this._paginateTable(Interfaces_1.PdfPageTableNames.treeListHeader);
        this._paginateTable(Interfaces_1.PdfPageTableNames.treeListMain);
        this._paginateTable(Interfaces_1.PdfPageTableNames.chartScaleBottom);
        this._paginateTable(Interfaces_1.PdfPageTableNames.chartScaleTop);
        this._paginateTable(Interfaces_1.PdfPageTableNames.chartMain);
    };
    PdfGanttPaginator.prototype._paginateObjects = function () {
        this._paginateTasks();
        this._paginateDependencies();
        this._paginateResources();
    };
    Object.defineProperty(PdfGanttPaginator.prototype, "pageMatrixToArray", {
        get: function () {
            var _a;
            var result = new Array();
            (_a = this._pages) === null || _a === void 0 ? void 0 : _a.forEach(function (row) {
                result = result.concat(row);
            });
            return result;
        },
        enumerable: false,
        configurable: true
    });
    PdfGanttPaginator.prototype._paginateTasks = function () {
        var _this = this;
        var _a, _b;
        (_b = (_a = this._globalInfo.objects) === null || _a === void 0 ? void 0 : _a.tasks) === null || _b === void 0 ? void 0 : _b.forEach(function (t) { return _this._paginateTask(t); });
    };
    PdfGanttPaginator.prototype._paginateDependencies = function () {
        var _this = this;
        var _a, _b;
        (_b = (_a = this._globalInfo.objects) === null || _a === void 0 ? void 0 : _a.dependencies) === null || _b === void 0 ? void 0 : _b.forEach(function (d) {
            if (d.arrowInfo)
                _this._paginateArrow(d);
            else
                _this._paginateDependencyLine(d);
        });
    };
    PdfGanttPaginator.prototype._paginateResources = function () {
        var _this = this;
        var _a, _b;
        (_b = (_a = this._globalInfo.objects) === null || _a === void 0 ? void 0 : _a.resources) === null || _b === void 0 ? void 0 : _b.forEach(function (r) { return _this._paginateResource(r); });
    };
    PdfGanttPaginator.prototype._paginateTable = function (tableKey) {
        var _a;
        var table = (_a = this._globalInfo) === null || _a === void 0 ? void 0 : _a.tables[tableKey];
        if (table) {
            var start = this._getTableStart(table);
            var matrix = this._preparePagesNavigationMatrixForTable(start, table);
            var rowCount = matrix.length;
            for (var i = 0; i < rowCount; i++) {
                var colCount = matrix[i].length;
                for (var j = 0; j < colCount; j++) {
                    var navInfo = matrix[i][j];
                    var page = this._getPage(navInfo.pageVerIndex, navInfo.pageHorIndex, true);
                    var tablePositionX = navInfo.pageHorIndex === start.hIndex ? start.pageX : this.pageLeft;
                    var tablePositionY = navInfo.pageVerIndex === start.vIndex ? start.pageY : this.pageTop;
                    this._setTablePositionOnPage(page, tableKey, tablePositionX, tablePositionY);
                    this._addCellToPage(page, tableKey, navInfo);
                }
            }
            this._updateTableSizeOnPages(tableKey);
        }
    };
    PdfGanttPaginator.prototype._paginateTask = function (task) {
        var hOffsets = this._getTaskPagination(task);
        var vOffsets = this._getTaskPagination(task, true);
        for (var i = 0; i < vOffsets.length; i++)
            for (var j = 0; j < hOffsets.length; j++) {
                var newTask = new TaskInfo_1.PdfTaskInfo();
                newTask.assign(task);
                this._offsetPoints(newTask.sidePoints, hOffsets[j].offset, vOffsets[i].offset);
                this._addTaskToPage(vOffsets[i].pageIndex, hOffsets[j].pageIndex, newTask);
            }
    };
    PdfGanttPaginator.prototype._paginateArrow = function (dependency) {
        var pointInfo = this._getPointPageInfo(dependency.points[0]);
        var newDependency = new DependencyLineInfo_1.PdfDependencyLineInfo();
        newDependency.assign(dependency);
        this._offsetPoints(newDependency.points, pointInfo.offsetX, pointInfo.offsetY);
        this._addDependencyToPage(pointInfo.pageVerIndex, pointInfo.pageHorIndex, newDependency);
    };
    PdfGanttPaginator.prototype._paginateDependencyLine = function (dependency) {
        var hPagination = this._getDependencyLinePagination(dependency);
        var vPagination = this._getDependencyLinePagination(dependency, true);
        for (var i = 0; i < vPagination.length; i++)
            for (var j = 0; j < hPagination.length; j++) {
                var newDependency = new DependencyLineInfo_1.PdfDependencyLineInfo();
                newDependency.assign(dependency);
                this._offsetPoints(newDependency.points, hPagination[j].offset, vPagination[i].offset);
                this._addDependencyToPage(vPagination[i].pageIndex, hPagination[j].pageIndex, newDependency);
            }
    };
    PdfGanttPaginator.prototype._paginateResource = function (resource) {
        var pointInfo = this._getPointPageInfo(new point_1.Point(resource.x, resource.y));
        var newResource = new TaskResourcesInfo_1.PdfTaskResourcesInfo();
        newResource.assign(resource);
        newResource.x -= pointInfo.offsetX;
        newResource.y -= pointInfo.offsetY;
        this._addResourceToPage(pointInfo.pageVerIndex, pointInfo.pageHorIndex, newResource);
    };
    PdfGanttPaginator.prototype._getTableStart = function (table) {
        var start = new PageNavigation_1.PageNavigation(this.pageBorders, 0, 0, 0, 0, this.correctedPageBottoms);
        start.offset(table.position.x, table.position.y);
        return start;
    };
    PdfGanttPaginator.prototype._getPage = function (rowIndex, colIndex, forceCreate) {
        if (forceCreate)
            this._extendPageMatrixIfRequired(rowIndex, colIndex);
        return this._pages[rowIndex][colIndex];
    };
    PdfGanttPaginator.prototype._getTableOrCreate = function (page, tableKey) {
        var _a;
        var _b;
        (_a = (_b = page.tables)[tableKey]) !== null && _a !== void 0 ? _a : (_b[tableKey] = this._createTable(tableKey));
        return page.tables[tableKey];
    };
    PdfGanttPaginator.prototype._preparePagesNavigationMatrixForTable = function (start, table) {
        var matrix = new Array();
        var verticalVector = this._getTableNavigationVector(start, table, true);
        var rowCount = verticalVector.length;
        for (var i = 0; i < rowCount; i++) {
            var row = new Array();
            var vInfo = verticalVector[i];
            var horizontalVector = this._getTableNavigationVector(start, table, false, vInfo.globalCellIndex);
            var colCount = horizontalVector.length;
            for (var j = 0; j < colCount; j++) {
                var hInfo = horizontalVector[j];
                var cancelTextCut = table.name === Interfaces_1.PdfPageTableNames.chartScaleTop;
                var cell = this._prepareCuttedCell(table.cells[vInfo.globalCellIndex][hInfo.globalCellIndex], hInfo, vInfo, cancelTextCut);
                var info = new CellNavigationInfo(hInfo.pageIndex, vInfo.pageIndex, vInfo.cellIndexOnPage, hInfo.cellIndexOnPage, cell);
                row.push(info);
            }
            matrix.push(row);
        }
        return matrix;
    };
    PdfGanttPaginator.prototype._setTablePositionOnPage = function (page, tableKey, x, y) {
        var table = this._getTableOrCreate(page, tableKey);
        table.position = new point_1.Point(x, y);
    };
    PdfGanttPaginator.prototype._extendPageMatrixIfRequired = function (rowIndex, colIndex) {
        var _a;
        (_a = this._pages) !== null && _a !== void 0 ? _a : (this._pages = new Array());
        for (var i = this._pages.length; i <= rowIndex; i++)
            this._pages.push(new Array());
        var row = this._pages[rowIndex];
        for (var i = row.length; i <= colIndex; i++)
            row.push(this._createPage());
    };
    PdfGanttPaginator.prototype._getTableAndExtendIfRequired = function (page, tableKey, rowIndex, colIndex) {
        var table = this._getTableOrCreate(page, tableKey);
        var cells = table.cells;
        for (var i = cells.length; i <= rowIndex; i++)
            cells.push(new Array());
        var row = cells[rowIndex];
        for (var i = row.length; i <= colIndex; i++)
            row.push(new CellDef_1.CellDef());
        return table;
    };
    PdfGanttPaginator.prototype._createPage = function () {
        return {
            objects: {
                tasks: null,
                dependencies: null,
                resources: null
            },
            tables: {}
        };
    };
    PdfGanttPaginator.prototype._createTable = function (tableKey) {
        var _a;
        var globalTableInfo = (_a = this._globalInfo) === null || _a === void 0 ? void 0 : _a.tables[tableKey];
        return {
            name: tableKey,
            size: null,
            position: null,
            style: globalTableInfo.style,
            baseCellSize: globalTableInfo.baseCellSize,
            cells: new Array(),
            hideRowLines: globalTableInfo.hideRowLines
        };
    };
    PdfGanttPaginator.prototype._addCellToPage = function (page, tableKey, cellInfo) {
        var rowIndex = cellInfo.cellRowIndexOnPage;
        var colIndex = cellInfo.cellColIndexOnPage;
        var table = this._getTableAndExtendIfRequired(page, tableKey, rowIndex, colIndex);
        table.cells[rowIndex][colIndex].assign(cellInfo.cell);
    };
    PdfGanttPaginator.prototype._updateTableSizeOnPages = function (tableKey) {
        var _a;
        var colCount = (_a = this._pages[0]) === null || _a === void 0 ? void 0 : _a.length;
        var rowCount = this._pages.length;
        for (var i = 0; i < rowCount; i++)
            for (var j = 0; j < colCount; j++)
                this._updateTableSizeOnPage(this._pages[i][j], tableKey);
    };
    PdfGanttPaginator.prototype._updateTableSizeOnPage = function (page, tableKey) {
        var _this = this;
        var _a;
        var table = page === null || page === void 0 ? void 0 : page.tables[tableKey];
        if (table) {
            var rowCount = table.cells.length;
            var height = rowCount * table.baseCellSize.height || 0;
            var width = ((_a = table.cells[0]) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, v, i) { return acc += _this._getCellWidth(table, 0, i); }, 0)) || 0;
            table.size = new size_1.Size(width, height);
        }
    };
    PdfGanttPaginator.prototype._getTableNavigationVector = function (start, table, isVertical, rowIndex) {
        var _a, _b;
        if (isVertical === void 0) { isVertical = false; }
        if (rowIndex === void 0) { rowIndex = 0; }
        var vector = new Array();
        var pageNav = PageNavigation_1.PageNavigation.createFrom(start);
        var length = isVertical ? (_a = table.cells) === null || _a === void 0 ? void 0 : _a.length : (_b = table.cells[rowIndex]) === null || _b === void 0 ? void 0 : _b.length;
        for (var i = 0; i < length; i++) {
            var cellSize = isVertical ? table.baseCellSize.height : this._getCellWidth(table, rowIndex, i);
            this._placeCell(vector, pageNav, i, cellSize, isVertical);
        }
        return vector;
    };
    PdfGanttPaginator.prototype._placeCell = function (vector, pageNav, cellGlobalIndex, size, isVertical) {
        var _a, _b;
        var startPageIndex = isVertical ? pageNav.vIndex : pageNav.hIndex;
        var pageOffsetIndex = (_b = (_a = vector[vector.length - 1]) === null || _a === void 0 ? void 0 : _a.pageOffset) !== null && _b !== void 0 ? _b : cellGlobalIndex;
        var unplacedSize = size;
        var spaceToBorder = pageNav.getSpaceToBorder(isVertical);
        pageNav.offsetOneD(size, isVertical);
        var endPageIndex = isVertical ? pageNav.vIndex : pageNav.hIndex;
        if (!isVertical)
            for (var i = startPageIndex; i < endPageIndex; i++) {
                var info_1 = new VectorInfo(i, cellGlobalIndex, pageOffsetIndex, spaceToBorder);
                pageOffsetIndex = cellGlobalIndex;
                vector.push(info_1);
                unplacedSize -= spaceToBorder;
                spaceToBorder = pageNav.getPageSize(isVertical);
            }
        if (endPageIndex !== startPageIndex)
            pageOffsetIndex = cellGlobalIndex;
        var isCutted = unplacedSize !== size;
        var info = new VectorInfo(endPageIndex, cellGlobalIndex, pageOffsetIndex, isCutted ? unplacedSize : null);
        vector.push(info);
    };
    PdfGanttPaginator.prototype._prepareCuttedCell = function (originCell, hInfo, vInfo, cancelTextCut) {
        var cell = new CellDef_1.CellDef(originCell);
        if (hInfo.isCutted) {
            var width = hInfo.cutSize;
            if (!cancelTextCut) {
                var text = cell.content;
                var style = originCell.styles;
                var leftPadding = style && style.cellPadding.left || 0;
                var rightPadding = style && style.cellPadding.right || 0;
                var textWidth = width - leftPadding - rightPadding;
                var parts = this._pdfDoc.splitTextToSize(text, textWidth);
                originCell.content = text.replace(parts[0], "");
                cell.content = parts[0];
            }
            cell.styles.cellWidth.assign(width);
        }
        if (vInfo.isCutted)
            cell.styles.minCellHeight = vInfo.cutSize;
        return cell;
    };
    PdfGanttPaginator.prototype._getCellWidth = function (table, rowIndex, colIndex) {
        var _a;
        var cell = table.cells[rowIndex][colIndex];
        var style = cell.styles;
        var numWidth = style.cellWidth.getValue();
        var width = numWidth !== null && numWidth !== void 0 ? numWidth : style.minCellWidth;
        return width !== null && width !== void 0 ? width : table.baseCellSize.width * ((_a = cell.colSpan) !== null && _a !== void 0 ? _a : 1);
    };
    PdfGanttPaginator.prototype._getTaskPagination = function (task, isVertical) {
        var size = isVertical ? task.height : task.width;
        var startPos = isVertical ? task.top : task.left;
        return this._getLinePagination(startPos, size, isVertical);
    };
    PdfGanttPaginator.prototype._getDependencyLinePagination = function (dependency, isVertical) {
        var lineStart = dependency.points[0];
        var lineEnd = dependency.points[1];
        var size = isVertical ? lineEnd.y - lineStart.y : lineEnd.x - lineStart.x;
        var startPos = isVertical ? lineStart.y : lineStart.x;
        return this._getLinePagination(startPos, size, isVertical);
    };
    PdfGanttPaginator.prototype._getLinePagination = function (globalStart, size, isVertical) {
        var result = new Array();
        var pageNav = this.pageNavigator.clone();
        pageNav.offsetOneD(globalStart, isVertical);
        var startPageIndex = isVertical ? pageNav.vIndex : pageNav.hIndex;
        pageNav.offsetOneD(size, isVertical);
        var endPageIndex = isVertical ? pageNav.vIndex : pageNav.hIndex;
        for (var i = startPageIndex; i <= endPageIndex; i++)
            result.push({
                offset: pageNav.getPageGlobalOffset(i, isVertical),
                pageIndex: i
            });
        return result;
    };
    PdfGanttPaginator.prototype._getPointPageInfo = function (p) {
        var pageNav = this.pageNavigator.clone();
        pageNav.offset(p.x, p.y);
        return {
            offsetX: pageNav.getPageGlobalOffset(pageNav.hIndex),
            offsetY: pageNav.getPageGlobalOffset(pageNav.vIndex, true),
            pageHorIndex: pageNav.hIndex,
            pageVerIndex: pageNav.vIndex
        };
    };
    Object.defineProperty(PdfGanttPaginator.prototype, "pageWidth", {
        get: function () {
            var _a;
            return (_a = this._pdfDoc) === null || _a === void 0 ? void 0 : _a.getPageWidth();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageHeight", {
        get: function () {
            var _a;
            return (_a = this._pdfDoc) === null || _a === void 0 ? void 0 : _a.getPageHeight();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageLeftMargin", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.margins.left;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageTopMargin", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.margins.top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageRightMargin", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.margins.right;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageBottomMargin", {
        get: function () {
            var _a;
            return (_a = this._props) === null || _a === void 0 ? void 0 : _a.margins.bottom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageLeft", {
        get: function () {
            var _a;
            (_a = this._pageLeft) !== null && _a !== void 0 ? _a : (this._pageLeft = this.pageLeftMargin);
            return this._pageLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageRight", {
        get: function () {
            var _a;
            (_a = this._pageRight) !== null && _a !== void 0 ? _a : (this._pageRight = this.pageWidth - this.pageRightMargin);
            return this._pageRight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageTop", {
        get: function () {
            var _a;
            (_a = this._pageTop) !== null && _a !== void 0 ? _a : (this._pageTop = this.pageTopMargin);
            return this._pageTop;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageBottom", {
        get: function () {
            var _a;
            (_a = this._pageBottom) !== null && _a !== void 0 ? _a : (this._pageBottom = this.pageHeight - this.pageBottomMargin);
            return this._pageBottom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageBorders", {
        get: function () {
            return {
                left: this.pageLeft,
                top: this.pageTop,
                bottom: this.pageBottom,
                right: this.pageRight
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "correctedPageBottoms", {
        get: function () {
            var _a;
            (_a = this._correctedPageBottoms) !== null && _a !== void 0 ? _a : (this._correctedPageBottoms = this._getCorrectedPagesBottom());
            return this._correctedPageBottoms;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PdfGanttPaginator.prototype, "pageNavigator", {
        get: function () {
            var _a;
            (_a = this._pageNavigator) !== null && _a !== void 0 ? _a : (this._pageNavigator = new PageNavigation_1.PageNavigation(this.pageBorders, 0, 0, 0, 0, this.correctedPageBottoms));
            return this._pageNavigator;
        },
        enumerable: false,
        configurable: true
    });
    PdfGanttPaginator.prototype._getCorrectedPagesBottom = function () {
        var _a, _b, _c, _d;
        var result = new Array();
        var tables = (_a = this._globalInfo) === null || _a === void 0 ? void 0 : _a.tables;
        var referenceTable = (_b = tables[Interfaces_1.PdfPageTableNames.treeListMain]) !== null && _b !== void 0 ? _b : tables[Interfaces_1.PdfPageTableNames.chartMain];
        var nav = new PageNavigation_1.PageNavigation(this.pageBorders);
        nav.pageY = referenceTable.position.y;
        for (var i = 0; i < referenceTable.cells.length; i++) {
            var cell = referenceTable.cells[i][0];
            var height = (_d = (_c = cell.styles) === null || _c === void 0 ? void 0 : _c.minCellHeight) !== null && _d !== void 0 ? _d : referenceTable.baseCellSize.height;
            var prevPageIndex = nav.vIndex;
            var prevPageY = nav.pageY;
            nav.offsetOneD(height, true);
            if (prevPageIndex !== nav.vIndex) {
                result.push(prevPageY);
                nav.pageY = nav.getPageStart(true) + height;
            }
        }
        return result;
    };
    PdfGanttPaginator.prototype._addTaskToPage = function (pageVIndex, pageHIndex, task) {
        var _a;
        var _b;
        var page = this._getPage(pageVIndex, pageHIndex);
        if (page) {
            (_a = (_b = page.objects).tasks) !== null && _a !== void 0 ? _a : (_b.tasks = new Array());
            page.objects.tasks.push(task);
        }
    };
    PdfGanttPaginator.prototype._addDependencyToPage = function (pageVIndex, pageHIndex, dependency) {
        var _a;
        var _b;
        var page = this._getPage(pageVIndex, pageHIndex);
        if (page) {
            (_a = (_b = page.objects).dependencies) !== null && _a !== void 0 ? _a : (_b.dependencies = new Array());
            page.objects.dependencies.push(dependency);
        }
    };
    PdfGanttPaginator.prototype._addResourceToPage = function (pageVIndex, pageHIndex, resource) {
        var _a;
        var _b;
        var page = this._getPage(pageVIndex, pageHIndex);
        if (page) {
            (_a = (_b = page.objects).resources) !== null && _a !== void 0 ? _a : (_b.resources = new Array());
            page.objects.resources.push(resource);
        }
    };
    PdfGanttPaginator.prototype._offsetPoints = function (points, offsetX, offsetY) {
        points.forEach(function (p) {
            p.x -= offsetX;
            p.y -= offsetY;
        });
    };
    return PdfGanttPaginator;
}());
exports.PdfGanttPaginator = PdfGanttPaginator;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNavigation = void 0;
var PageNavigation = (function () {
    function PageNavigation(borders, vIndex, hIndex, pageX, pageY, correctedBottoms) {
        this._correctedBottoms = new Array();
        this.vIndex = 0;
        this.hIndex = 0;
        this.pageX = 0;
        this.pageY = 0;
        this._top = borders === null || borders === void 0 ? void 0 : borders.top;
        this._left = borders === null || borders === void 0 ? void 0 : borders.left;
        this._bottom = borders === null || borders === void 0 ? void 0 : borders.bottom;
        this._right = borders === null || borders === void 0 ? void 0 : borders.right;
        this.vIndex = vIndex !== null && vIndex !== void 0 ? vIndex : this.vIndex;
        this.hIndex = hIndex !== null && hIndex !== void 0 ? hIndex : this.hIndex;
        this.pageX = pageX !== null && pageX !== void 0 ? pageX : this.pageX;
        this.pageY = pageY !== null && pageY !== void 0 ? pageY : this.pageY;
        if (correctedBottoms)
            this._correctedBottoms = correctedBottoms;
    }
    PageNavigation.prototype.offset = function (offsetX, offsetY) {
        if (offsetX)
            this.offsetOneD(offsetX);
        if (offsetY)
            this.offsetOneD(offsetY, true);
    };
    PageNavigation.prototype.offsetOneD = function (delta, isVertical) {
        var unplacedSize = delta;
        var spaceToBorder = this.getSpaceToBorder(isVertical);
        while (spaceToBorder < unplacedSize) {
            if (isVertical) {
                this.vIndex++;
                this.pageY = this._top;
            }
            else {
                this.hIndex++;
                this.pageX = this._left;
            }
            unplacedSize -= spaceToBorder;
            spaceToBorder = this.getSpaceToBorder(isVertical);
        }
        if (isVertical)
            this.pageY += unplacedSize;
        else
            this.pageX += unplacedSize;
    };
    Object.defineProperty(PageNavigation.prototype, "defaultPageHeight", {
        get: function () {
            return this.getCurrentPageBottom() - this._top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PageNavigation.prototype, "defaultPageWidth", {
        get: function () {
            return this._right - this._left;
        },
        enumerable: false,
        configurable: true
    });
    PageNavigation.prototype.getPageEnd = function (isVertical) {
        return isVertical ? this.getCurrentPageBottom() : this._right;
    };
    PageNavigation.prototype.getPageStart = function (isVertical) {
        return isVertical ? this._top : this._left;
    };
    PageNavigation.prototype.getPageSize = function (isVertical, index) {
        return isVertical ? this.getPageHeight(index) : this.defaultPageWidth;
    };
    PageNavigation.prototype.getSpaceToBorder = function (isVertical) {
        return isVertical ? this.getCurrentPageBottom() - this.pageY : this._right - this.pageX;
    };
    PageNavigation.prototype.getPageGlobalOffset = function (index, isVertical) {
        if (!isVertical)
            return index * this.defaultPageWidth;
        var offset = 0;
        for (var i = 1; i <= index; i++)
            offset += this.getPageHeight(i - 1);
        return offset;
    };
    PageNavigation.prototype.assign = function (src) {
        this._top = src._top;
        this._left = src._left;
        this._bottom = src._bottom;
        this._right = src._right;
        this._correctedBottoms = src._correctedBottoms;
        this.vIndex = src.vIndex;
        this.hIndex = src.hIndex;
        this.pageX = src.pageX;
        this.pageY = src.pageY;
    };
    PageNavigation.createFrom = function (src) {
        var instance = new PageNavigation();
        instance.assign(src);
        return instance;
    };
    PageNavigation.prototype.clone = function () {
        var instance = new PageNavigation();
        instance.assign(this);
        return instance;
    };
    PageNavigation.prototype.getCurrentPageBottom = function () {
        return this.getPageBottom(this.vIndex);
    };
    PageNavigation.prototype.getPageBottom = function (index) {
        var _a;
        return (_a = this._correctedBottoms[index]) !== null && _a !== void 0 ? _a : this._bottom;
    };
    PageNavigation.prototype.getPageHeight = function (index) {
        return this.getPageBottom(index) - this._top;
    };
    return PageNavigation;
}());
exports.PageNavigation = PageNavigation;


/***/ })
/******/ ]);
});