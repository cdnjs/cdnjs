/*!
 * DevExpress Gantt (dx-gantt)
 * Version: 1.0.14
 * Build date: Mon Aug 23 2021
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
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
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

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
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

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
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
var Browser_1 = __webpack_require__(6);
var TouchUIHelper_1 = __webpack_require__(14);
var DomUtils = (function () {
    function DomUtils() {
    }
    DomUtils.clientEventRequiresDocScrollCorrection = function () {
        var isSafariVerLess3 = Browser_1.Browser.Safari && Browser_1.Browser.Version < 3, isMacOSMobileVerLess51 = Browser_1.Browser.MacOSMobilePlatform && Browser_1.Browser.Version < 5.1;
        return Browser_1.Browser.AndroidDefaultBrowser || Browser_1.Browser.AndroidChromeBrowser || !(isSafariVerLess3 || isMacOSMobileVerLess51);
    };
    DomUtils.getEventX = function (evt) {
        if (DomUtils.isTouchEvent(evt))
            return TouchUIHelper_1.TouchUIHelper.getEventX(evt);
        return evt.clientX + (this.clientEventRequiresDocScrollCorrection() ? this.getDocumentScrollLeft() : 0);
    };
    DomUtils.getEventY = function (evt) {
        if (DomUtils.isTouchEvent(evt))
            return TouchUIHelper_1.TouchUIHelper.getEventY(evt);
        return evt.clientY + (this.clientEventRequiresDocScrollCorrection() ? this.getDocumentScrollTop() : 0);
    };
    DomUtils.getEventSource = function (evt) {
        return evt.srcElement ? evt.srcElement : evt.target;
    };
    DomUtils.GetKeyCode = function (evt) {
        return Browser_1.Browser.NetscapeFamily || Browser_1.Browser.Opera ? evt.which : evt.keyCode;
    };
    DomUtils.GetIsParent = function (parentElement, element) {
        if (!parentElement || !element)
            return false;
        while (element) {
            if (element === parentElement)
                return true;
            if (element.tagName === "BODY")
                return false;
            element = element.parentNode;
        }
        return false;
    };
    DomUtils.getCurrentStyle = function (element) {
        if (document.defaultView && document.defaultView.getComputedStyle)
            return document.defaultView.getComputedStyle(element, null);
        return window.getComputedStyle(element, null);
    };
    DomUtils.getTopPaddings = function (element) {
        var currentStyle = this.getCurrentStyle(element);
        return this.pxToInt(currentStyle.paddingTop);
    };
    DomUtils.getLeftPadding = function (element) {
        var currentStyle = this.getCurrentStyle(element);
        return this.pxToInt(currentStyle.paddingLeft);
    };
    DomUtils.getVerticalBordersWidth = function (element) {
        var style = window.getComputedStyle ? window.getComputedStyle(element) : this.getCurrentStyle(element);
        var res = 0;
        if (style.borderTopStyle != "none")
            res += this.pxToFloat(style.borderTopWidth);
        if (style.borderBottomStyle != "none")
            res += this.pxToFloat(style.borderBottomWidth);
        return res;
    };
    DomUtils.getHorizontalBordersWidth = function (element) {
        var style = window.getComputedStyle ? window.getComputedStyle(element) : this.getCurrentStyle(element);
        var res = 0;
        if (style.borderLeftStyle != "none")
            res += this.pxToFloat(style.borderLeftWidth);
        if (style.borderRightStyle != "none")
            res += this.pxToFloat(style.borderRightWidth);
        return res;
    };
    DomUtils.pxToInt = function (px) {
        return this.pxToNumber(px, parseInt);
    };
    DomUtils.pxToFloat = function (px) {
        return this.pxToNumber(px, parseFloat);
    };
    ;
    DomUtils.pxToNumber = function (px, parseFunction) {
        var result = 0;
        if (px != null && px != "") {
            try {
                var indexOfPx = px.indexOf("px");
                if (indexOfPx > -1)
                    result = parseFunction(px.substr(0, indexOfPx));
            }
            catch (e) { }
        }
        return result;
    };
    DomUtils.getDocumentScrollTop = function () {
        var isScrollBodyIE = Browser_1.Browser.IE && this.getCurrentStyle(document.body).overflow == "hidden" && document.body.scrollTop > 0;
        if (Browser_1.Browser.WebKitFamily || Browser_1.Browser.Edge || isScrollBodyIE) {
            if (Browser_1.Browser.MacOSMobilePlatform)
                return window.pageYOffset;
            if (Browser_1.Browser.WebKitFamily)
                return document.documentElement.scrollTop || document.body.scrollTop;
            return document.body.scrollTop;
        }
        else
            return document.documentElement.scrollTop;
    };
    DomUtils.getDocumentScrollLeft = function () {
        var isScrollBodyIE = Browser_1.Browser.IE && this.getCurrentStyle(document.body).overflow == "hidden" && document.body.scrollLeft > 0;
        if (Browser_1.Browser.Edge || isScrollBodyIE)
            return document.body ? document.body.scrollLeft : document.documentElement.scrollLeft;
        if (Browser_1.Browser.WebKitFamily)
            return document.documentElement.scrollLeft || document.body.scrollLeft;
        return document.documentElement.scrollLeft;
    };
    DomUtils.getAbsolutePositionY = function (element) {
        if (Browser_1.Browser.IE)
            return this.getAbsolutePositionY_IE(element);
        else if (Browser_1.Browser.Firefox && Browser_1.Browser.Version >= 3)
            return this.getAbsolutePositionY_FF3(element);
        else if (Browser_1.Browser.Opera)
            return this.getAbsolutePositionY_Opera(element);
        else if (Browser_1.Browser.NetscapeFamily && (!Browser_1.Browser.Firefox || Browser_1.Browser.Version < 3))
            return this.getAbsolutePositionY_NS(element);
        else if (Browser_1.Browser.WebKitFamily || Browser_1.Browser.Edge)
            return this.getAbsolutePositionY_FF3(element);
        else
            return this.getAbsolutePositionY_Other(element);
    };
    DomUtils.getAbsolutePositionY_Opera = function (curEl) {
        var isFirstCycle = true;
        if (curEl && curEl.tagName == "TR" && curEl.cells.length > 0)
            curEl = curEl.cells[0];
        var pos = this.getAbsoluteScrollOffset_OperaFF(curEl, false);
        while (curEl != null) {
            pos += curEl.offsetTop;
            if (!isFirstCycle)
                pos -= curEl.scrollTop;
            curEl = curEl.offsetParent;
            isFirstCycle = false;
        }
        pos += document.body.scrollTop;
        return pos;
    };
    DomUtils.getAbsolutePositionY_IE = function (element) {
        if (element == null || Browser_1.Browser.IE && element.parentNode == null)
            return 0;
        return element.getBoundingClientRect().top + this.getDocumentScrollTop();
    };
    DomUtils.getAbsolutePositionY_FF3 = function (element) {
        if (element == null)
            return 0;
        var y = element.getBoundingClientRect().top + this.getDocumentScrollTop();
        return Math.round(y);
    };
    DomUtils.getAbsolutePositionY_NS = function (curEl) {
        var pos = this.getAbsoluteScrollOffset_OperaFF(curEl, false);
        var isFirstCycle = true;
        while (curEl != null) {
            pos += curEl.offsetTop;
            if (!isFirstCycle && curEl.offsetParent != null)
                pos -= curEl.scrollTop;
            if (!isFirstCycle && Browser_1.Browser.Firefox) {
                var style = this.getCurrentStyle(curEl);
                if (curEl.tagName == "DIV" && style.overflow != "visible")
                    pos += this.pxToInt(style.borderTopWidth);
            }
            isFirstCycle = false;
            curEl = curEl.offsetParent;
        }
        return pos;
    };
    DomUtils.getAbsolutePositionY_Other = function (curEl) {
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
    };
    DomUtils.getAbsoluteScrollOffset_OperaFF = function (curEl, isX) {
        var pos = 0;
        var isFirstCycle = true;
        while (curEl != null) {
            if (curEl.tagName == "BODY")
                break;
            var style = this.getCurrentStyle(curEl);
            if (style.position == "absolute")
                break;
            if (!isFirstCycle && curEl.tagName == "DIV" && (style.position == "" || style.position == "static"))
                pos -= isX ? curEl.scrollLeft : curEl.scrollTop;
            curEl = curEl.parentNode;
            isFirstCycle = false;
        }
        return pos;
    };
    DomUtils.getAbsolutePositionX = function (element) {
        if (Browser_1.Browser.IE)
            return this.getAbsolutePositionX_IE(element);
        else if (Browser_1.Browser.Firefox && Browser_1.Browser.Version >= 3)
            return this.getAbsolutePositionX_FF3(element);
        else if (Browser_1.Browser.Opera)
            return this.getAbsolutePositionX_Opera(element);
        else if (Browser_1.Browser.NetscapeFamily && (!Browser_1.Browser.Firefox || Browser_1.Browser.Version < 3))
            return this.getAbsolutePositionX_NS(element);
        else if (Browser_1.Browser.WebKitFamily || Browser_1.Browser.Edge)
            return this.getAbsolutePositionX_FF3(element);
        else
            return this.getAbsolutePositionX_Other(element);
    };
    DomUtils.getAbsolutePositionX_Opera = function (curEl) {
        var isFirstCycle = true;
        var pos = this.getAbsoluteScrollOffset_OperaFF(curEl, true);
        while (curEl != null) {
            pos += curEl.offsetLeft;
            if (!isFirstCycle)
                pos -= curEl.scrollLeft;
            curEl = curEl.offsetParent;
            isFirstCycle = false;
        }
        pos += document.body.scrollLeft;
        return pos;
    };
    DomUtils.getAbsolutePositionX_IE = function (element) {
        if (element == null || Browser_1.Browser.IE && element.parentNode == null)
            return 0;
        return element.getBoundingClientRect().left + this.getDocumentScrollLeft();
    };
    DomUtils.getAbsolutePositionX_FF3 = function (element) {
        if (element == null)
            return 0;
        var x = element.getBoundingClientRect().left + this.getDocumentScrollLeft();
        return Math.round(x);
    };
    DomUtils.getAbsolutePositionX_NS = function (curEl) {
        var pos = this.getAbsoluteScrollOffset_OperaFF(curEl, true);
        var isFirstCycle = true;
        while (curEl != null) {
            pos += curEl.offsetLeft;
            if (!isFirstCycle && curEl.offsetParent != null)
                pos -= curEl.scrollLeft;
            if (!isFirstCycle && Browser_1.Browser.Firefox) {
                var style = this.getCurrentStyle(curEl);
                if (curEl.tagName == "DIV" && style.overflow != "visible")
                    pos += this.pxToInt(style.borderLeftWidth);
            }
            isFirstCycle = false;
            curEl = curEl.offsetParent;
        }
        return pos;
    };
    DomUtils.getAbsolutePositionX_Other = function (curEl) {
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
    };
    DomUtils.GetEvent = function (evt) {
        return (typeof (event) != "undefined" && event != null && Browser_1.Browser.IE) ? event : evt;
    };
    DomUtils.isExists = function (obj) {
        return (typeof (obj) != "undefined") && (obj != null);
    };
    DomUtils.isTouchEvent = function (evt) {
        if (!evt)
            return false;
        return Browser_1.Browser.WebKitTouchUI && DomUtils.isExists(evt.changedTouches);
    };
    DomUtils.IsLeftButtonPressed = function (evt) {
        if (DomUtils.isTouchEvent(evt))
            return true;
        evt = DomUtils.GetEvent(evt);
        if (!evt)
            return false;
        if (Browser_1.Browser.IE && Browser_1.Browser.Version < 11) {
            if (Browser_1.Browser.MSTouchUI)
                return true;
            return evt.button % 2 == 1;
        }
        else if (Browser_1.Browser.WebKitFamily) {
            if (evt.type === "pointermove")
                return evt.buttons === 1;
            return evt.which == 1;
        }
        else if (Browser_1.Browser.NetscapeFamily || Browser_1.Browser.Edge || (Browser_1.Browser.IE && Browser_1.Browser.Version >= 11)) {
            if (evt.type === DomUtils.touchMouseMoveEventName)
                return evt.buttons === 1;
            return evt.which == 1;
        }
        else if (Browser_1.Browser.Opera)
            return evt.button == 0;
        return true;
    };
    DomUtils.setAttribute = function (obj, attrName, value) {
        if (obj.setAttribute) {
            if (DomUtils.isSourceResetRequired() && attrName.toLowerCase() === "src")
                obj.setAttribute(attrName, "");
            obj.setAttribute(attrName, value);
        }
        else if (obj.setProperty)
            obj.setProperty(attrName, value, "");
    };
    DomUtils.getAttribute = function (obj, attrName) {
        if (obj.getAttribute)
            return obj.getAttribute(attrName);
        else if (obj.getPropertyValue) {
            if (Browser_1.Browser.Firefox) {
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
    DomUtils.getTabIndexAttributeName = function () {
        return Browser_1.Browser.IE ? "tabIndex" : "tabindex";
    };
    DomUtils.changeStyleAttribute = function (obj, attrName, newValue) {
        DomUtils.changeAttributeExtended(obj.style, attrName, obj, "saved" + attrName, newValue);
    };
    DomUtils.changeAttributeExtended = function (obj, attrName, savedObj, savedAttrName, newValue) {
        DomUtils.saveAttribute(obj, attrName, savedObj, savedAttrName);
        DomUtils.setAttribute(obj, attrName, newValue);
    };
    DomUtils.saveAttribute = function (obj, attrName, savedObj, savedAttrName) {
        if (!DomUtils.isExistsAttribute(savedObj, savedAttrName)) {
            var oldValue = DomUtils.isExistsAttribute(obj, attrName) ? DomUtils.getAttribute(obj, attrName) : DomUtils.EmptyObject;
            DomUtils.setAttribute(savedObj, savedAttrName, oldValue);
        }
    };
    DomUtils.restoreAttributeExtended = function (obj, attrName, savedObj, savedAttrName) {
        if (DomUtils.isExistsAttribute(savedObj, savedAttrName)) {
            var oldValue = DomUtils.getAttribute(savedObj, savedAttrName);
            if (oldValue != DomUtils.EmptyObject)
                DomUtils.setAttribute(obj, attrName, oldValue);
            else
                DomUtils.removeAttribute(obj, attrName);
            DomUtils.removeAttribute(savedObj, savedAttrName);
            return true;
        }
        return false;
    };
    DomUtils.removeAttribute = function (obj, attrName) {
        if (obj.removeAttribute)
            obj.removeAttribute(attrName);
        else if (obj.removeProperty)
            obj.removeProperty(attrName);
    };
    DomUtils.isExistsAttribute = function (obj, attrName) {
        var value = DomUtils.getAttribute(obj, attrName);
        return (value != null) && (value !== "");
    };
    DomUtils.isSourceResetRequired = function () {
        return Browser_1.Browser.IE && Browser_1.Browser.MajorVersion >= 11;
    };
    DomUtils.EmptyObject = {};
    DomUtils.touchMouseMoveEventName = Browser_1.Browser.WebKitTouchUI ? "touchmove" : (Browser_1.Browser.Edge && Browser_1.Browser.MSTouchUI && window.PointerEvent ? "pointermove" : "mousemove");
    DomUtils.getMouseWheelEventName = function () {
        if (Browser_1.Browser.Safari)
            return "mousewheel";
        if (Browser_1.Browser.NetscapeFamily && Browser_1.Browser.MajorVersion < 17)
            return "DOMMouseScroll";
        return "wheel";
    };
    DomUtils.getWheelDelta = function (evt) {
        var ret;
        if (Browser_1.Browser.NetscapeFamily && Browser_1.Browser.MajorVersion < 17)
            ret = -evt.detail;
        else if (Browser_1.Browser.Safari)
            ret = evt.wheelDelta;
        else
            ret = -evt.deltaY;
        if (Browser_1.Browser.Opera && Browser_1.Browser.Version < 9)
            ret = -ret;
        return ret;
    };
    DomUtils.IsRightButtonPressed = function (evt) {
        evt = DomUtils.GetEvent(evt);
        if (!DomUtils.isExists(evt))
            return false;
        if (Browser_1.Browser.IE || Browser_1.Browser.Edge) {
            if (evt.type === "pointermove")
                return evt.buttons === 2;
            return evt.button == 2;
        }
        else if (Browser_1.Browser.NetscapeFamily || Browser_1.Browser.WebKitFamily)
            return evt.which == 3;
        else if (Browser_1.Browser.Opera)
            return evt.button == 1;
        return true;
    };
    DomUtils.addClassNameToElement = function (element, className) {
        if (!element || typeof (className) !== "string")
            return;
        className = DomUtils.trim(className);
        if (!DomUtils.elementHasCssClass(element, className) && className !== "") {
            var oldClassName = DomUtils.getClassName(element);
            DomUtils.setClassName(element, (oldClassName === "") ? className : oldClassName + " " + className);
        }
    };
    DomUtils.removeClassNameFromElement = function (element, className) {
        if (!element)
            return;
        var elementClassName = DomUtils.getClassName(element);
        var updClassName = " " + elementClassName + " ";
        var newClassName = updClassName.replace(" " + className + " ", " ");
        if (updClassName.length != newClassName.length)
            DomUtils.setClassName(element, DomUtils.trim(newClassName));
    };
    DomUtils.elementHasCssClass = function (element, className) {
        try {
            var elementClasses;
            var classList = DomUtils.getClassNameList(element);
            if (!classList) {
                var elementClassName = DomUtils.getClassName(element);
                if (!elementClassName) {
                    return false;
                }
                elementClasses = elementClassName.split(" ");
            }
            var classNames = className.split(" ");
            for (var i = classNames.length - 1; i >= 0; i--) {
                if (classList) {
                    if (classList.indexOf(classNames[i]) === -1)
                        return false;
                    continue;
                }
                if (elementClasses.indexOf(classNames[i]) < 0)
                    return false;
            }
            return true;
        }
        catch (e) {
            return false;
        }
    };
    DomUtils.getClassName = function (element) {
        var result = "";
        if (element) {
            if (element.tagName === "svg")
                result = element.className.baseVal;
            else
                result = element.className ? element.className : "";
        }
        return result;
    };
    DomUtils.getClassNameList = function (element) {
        var result = [];
        if (element) {
            if (element.tagName === "svg")
                result = DomUtils.getClassName(element).replace(/^\s+|\s+$/g, '').split(/\s+/);
            else
                result = element.classList ? [].slice.call(element.classList) : DomUtils.getClassName(element).replace(/^\s+|\s+$/g, '').split(/\s+/);
        }
        return result;
    };
    DomUtils.setClassName = function (element, className) {
        if (element.tagName === "svg") {
            element.className.baseVal = DomUtils.trim(className);
        }
        else {
            element.className = DomUtils.trim(className);
        }
    };
    DomUtils.trim = function (str) {
        var result = str;
        result = result.replace(/^\s+/, "");
        result = result.replace(/\s+$/, "");
        return result;
    };
    DomUtils.restoreStyleAttribute = function (obj, attrName) {
        return DomUtils.restoreAttributeExtended(obj.style, attrName, obj, "saved" + attrName);
    };
    return DomUtils;
}());
exports.DomUtils = DomUtils;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsonUtils = (function () {
    function JsonUtils() {
    }
    JsonUtils.isExists = function (obj) {
        return (typeof (obj) != "undefined") && (obj != null);
    };
    JsonUtils.isValidJson = function (json) {
        return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(json.replace(/"(\\.|[^"\\])*"/g, '')));
    };
    JsonUtils.evalJson = function (json) {
        return JsonUtils.isValidJson(json) ? eval("(" + json + ")") : null;
    };
    return JsonUtils;
}());
exports.JsonUtils = JsonUtils;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Time_1 = __webpack_require__(29);
var TimeRange_1 = __webpack_require__(30);
var Utils_1 = __webpack_require__(2);
var DateRange_1 = __webpack_require__(8);
var DayOfWeekMonthlyOccurrence_1 = __webpack_require__(31);
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
        if (Utils_1.JsonUtils.isExists(src.start) && Utils_1.JsonUtils.isExists(src.end))
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
        if (Utils_1.JsonUtils.isExists(start) && Utils_1.JsonUtils.isExists(end))
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = (function () {
    function Point(x, y) {
        this.x = null;
        this.y = null;
        if (x !== undefined)
            this.x = x;
        if (y !== undefined)
            this.y = y;
    }
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandBase = (function () {
    function CommandBase(control) {
        this.control = control;
    }
    Object.defineProperty(CommandBase.prototype, "modelManipulator", {
        get: function () { return this.control.modelManipulator; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "history", {
        get: function () { return this.control.history; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "validationController", {
        get: function () { return this.control.validationController; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "state", {
        get: function () {
            if (!this._state)
                this._state = this.getState();
            return this._state;
        },
        enumerable: true,
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
    ;
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Browser = (function () {
    function Browser() {
    }
    Browser.IdentUserAgent = function (userAgent, ignoreDocumentMode) {
        if (ignoreDocumentMode === void 0) { ignoreDocumentMode = false; }
        var browserTypesOrderedList = ["Mozilla", "IE", "Firefox", "Netscape", "Safari", "Chrome", "Opera", "Opera10", "Edge"];
        var defaultBrowserType = "IE";
        var defaultPlatform = "Win";
        var defaultVersions = { Safari: 2, Chrome: 0.1, Mozilla: 1.9, Netscape: 8, Firefox: 2, Opera: 9, IE: 6, Edge: 12 };
        if (!userAgent || userAgent.length == 0) {
            Browser.fillUserAgentInfo(browserTypesOrderedList, defaultBrowserType, defaultVersions[defaultBrowserType], defaultPlatform);
            return;
        }
        userAgent = userAgent.toLowerCase();
        Browser.indentPlatformMajorVersion(userAgent);
        try {
            var platformIdentStrings = {
                "Windows": "Win",
                "Macintosh": "Mac",
                "Mac OS": "Mac",
                "Mac_PowerPC": "Mac",
                "cpu os": "MacMobile",
                "cpu iphone os": "MacMobile",
                "Android": "Android",
                "!Windows Phone": "WinPhone",
                "!WPDesktop": "WinPhone",
                "!ZuneWP": "WinPhone"
            };
            var optSlashOrSpace = "(?:/|\\s*)?";
            var versionString = "(\\d+)(?:\\.((?:\\d+?[1-9])|\\d)0*?)?";
            var optVersion = "(?:" + versionString + ")?";
            var patterns = {
                Safari: "applewebkit(?:.*?(?:version/" + versionString + "[\\.\\w\\d]*?(?:\\s+mobile\/\\S*)?\\s+safari))?",
                Chrome: "(?:chrome|crios)(?!frame)" + optSlashOrSpace + optVersion,
                Mozilla: "mozilla(?:.*rv:" + optVersion + ".*Gecko)?",
                Netscape: "(?:netscape|navigator)\\d*/?\\s*" + optVersion,
                Firefox: "firefox" + optSlashOrSpace + optVersion,
                Opera: "(?:opera|\sopr)" + optSlashOrSpace + optVersion,
                Opera10: "opera.*\\s*version" + optSlashOrSpace + optVersion,
                IE: "msie\\s*" + optVersion,
                Edge: "edge" + optSlashOrSpace + optVersion
            };
            var browserType;
            var version = -1;
            for (var i = 0; i < browserTypesOrderedList.length; i++) {
                var browserTypeCandidate = browserTypesOrderedList[i];
                var regExp = new RegExp(patterns[browserTypeCandidate], "i");
                if (regExp.compile)
                    regExp.compile(patterns[browserTypeCandidate], "i");
                var matches = regExp.exec(userAgent);
                if (matches && matches.index >= 0) {
                    if (browserType == "IE" && version >= 11 && browserTypeCandidate == "Safari")
                        continue;
                    browserType = browserTypeCandidate;
                    if (browserType == "Opera10")
                        browserType = "Opera";
                    var tridentPattern = "trident" + optSlashOrSpace + optVersion;
                    version = Browser.GetBrowserVersion(userAgent, matches, tridentPattern, Browser.getIECompatibleVersionString());
                    if (browserType == "Mozilla" && version >= 11)
                        browserType = "IE";
                }
            }
            if (!browserType)
                browserType = defaultBrowserType;
            var browserVersionDetected = version != -1;
            if (!browserVersionDetected)
                version = defaultVersions[browserType];
            var platform;
            var minOccurenceIndex = Number.MAX_VALUE;
            for (var identStr in platformIdentStrings) {
                if (!platformIdentStrings.hasOwnProperty(identStr))
                    continue;
                var importantIdent = identStr.substr(0, 1) == "!";
                var occurenceIndex = userAgent.indexOf((importantIdent ? identStr.substr(1) : identStr).toLowerCase());
                if (occurenceIndex >= 0 && (occurenceIndex < minOccurenceIndex || importantIdent)) {
                    minOccurenceIndex = importantIdent ? 0 : occurenceIndex;
                    platform = platformIdentStrings[identStr];
                }
            }
            var samsungPattern = "SM-[A-Z]";
            var m = userAgent.toUpperCase().match(samsungPattern);
            var isSamsungAndroidDevice = m && m.length > 0;
            if (platform == "WinPhone" && version < 9)
                version = Math.floor(Browser.getVersionFromTrident(userAgent, "trident" + optSlashOrSpace + optVersion));
            if (!ignoreDocumentMode && browserType == "IE" && version > 7 && document.documentMode < version)
                version = document.documentMode;
            if (platform == "WinPhone")
                version = Math.max(9, version);
            if (!platform)
                platform = defaultPlatform;
            if (platform == platformIdentStrings["cpu os"] && !browserVersionDetected)
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
            if (ieCompatibleVersionString === "edge" || parseInt(ieCompatibleVersionString) === versionFromTrident)
                return versionFromTrident;
        }
        return version;
    };
    Browser.getIECompatibleVersionString = function () {
        if (document.compatible) {
            for (var i = 0; i < document.compatible.length; i++)
                if (document.compatible[i].userAgent === "IE" && document.compatible[i].version)
                    return document.compatible[i].version.toLowerCase();
        }
        return "";
    };
    Browser.isTouchEnabled = function () {
        return ("ontouchstart" in window) ||
            (navigator["maxTouchPoints"] > 0) ||
            (navigator["msMaxTouchPoints"] > 0);
    };
    Browser.fillUserAgentInfo = function (browserTypesOrderedList, browserType, version, platform, isSamsungAndroidDevice) {
        if (isSamsungAndroidDevice === void 0) { isSamsungAndroidDevice = false; }
        for (var i = 0; i < browserTypesOrderedList.length; i++) {
            var type = browserTypesOrderedList[i];
            Browser[type] = type == browserType;
        }
        Browser.Version = Math.floor(10.0 * version) / 10.0;
        Browser.MajorVersion = Math.floor(Browser.Version);
        Browser.WindowsPlatform = platform == "Win" || platform == "WinPhone";
        Browser.MacOSMobilePlatform = platform == "MacMobile" || (platform == "Mac" && Browser.isTouchEnabled());
        Browser.MacOSPlatform = platform == "Mac" && !Browser.MacOSMobilePlatform;
        Browser.AndroidMobilePlatform = platform == "Android";
        Browser.WindowsPhonePlatform = platform == "WinPhone";
        Browser.WebKitFamily = Browser.Safari || Browser.Chrome || Browser.Opera && Browser.MajorVersion >= 15;
        Browser.NetscapeFamily = Browser.Netscape || Browser.Mozilla || Browser.Firefox;
        Browser.HardwareAcceleration = (Browser.IE && Browser.MajorVersion >= 9) || (Browser.Firefox && Browser.MajorVersion >= 4) ||
            (Browser.AndroidMobilePlatform && Browser.Chrome) || (Browser.Chrome && Browser.MajorVersion >= 37) ||
            (Browser.Safari && !Browser.WindowsPlatform) || Browser.Edge || (Browser.Opera && Browser.MajorVersion >= 46);
        Browser.WebKitTouchUI = Browser.MacOSMobilePlatform || Browser.AndroidMobilePlatform;
        var isIETouchUI = Browser.IE && Browser.MajorVersion > 9 && Browser.WindowsPlatform && Browser.UserAgent.toLowerCase().indexOf("touch") >= 0;
        Browser.MSTouchUI = isIETouchUI || (Browser.Edge && !!window.navigator.maxTouchPoints);
        Browser.TouchUI = Browser.WebKitTouchUI || Browser.MSTouchUI;
        Browser.MobileUI = Browser.WebKitTouchUI || Browser.WindowsPhonePlatform;
        Browser.AndroidDefaultBrowser = Browser.AndroidMobilePlatform && !Browser.Chrome;
        Browser.AndroidChromeBrowser = Browser.AndroidMobilePlatform && Browser.Chrome;
        if (isSamsungAndroidDevice)
            Browser.SamsungAndroidDevice = isSamsungAndroidDevice;
        if (Browser.MSTouchUI) {
            var isARMArchitecture = Browser.UserAgent.toLowerCase().indexOf("arm;") > -1;
            Browser.VirtualKeyboardSupported = isARMArchitecture || Browser.WindowsPhonePlatform;
        }
        else {
            Browser.VirtualKeyboardSupported = Browser.WebKitTouchUI;
        }
        Browser.fillDocumentElementBrowserTypeClassNames(browserTypesOrderedList);
    };
    Browser.indentPlatformMajorVersion = function (userAgent) {
        var regex = /(?:(?:windows nt|macintosh|mac os|cpu os|cpu iphone os|android|windows phone|linux) )(\d+)(?:[-0-9_.])*/;
        var matches = regex.exec(userAgent);
        if (matches)
            Browser.PlaformMajorVersion = matches[1];
    };
    Browser.prototype.GetBrowserVersion = function (userAgent, matches, tridentPattern, ieCompatibleVersionString) {
        var version = Browser.getVersionFromMatches(matches);
        if (ieCompatibleVersionString) {
            var versionFromTrident = Browser.getVersionFromTrident(userAgent, tridentPattern);
            if (ieCompatibleVersionString === "edge" || parseInt(ieCompatibleVersionString) === versionFromTrident)
                return versionFromTrident;
        }
        return version;
    };
    Browser.getVersionFromMatches = function (matches) {
        var result = -1;
        var versionStr = "";
        if (matches[1]) {
            versionStr += matches[1];
            if (matches[2])
                versionStr += "." + matches[2];
        }
        if (versionStr != "") {
            result = parseFloat(versionStr);
            if (isNaN(result))
                result = -1;
        }
        return result;
    };
    Browser.getVersionFromTrident = function (userAgent, tridentPattern) {
        var tridentDiffFromVersion = 4;
        var matches = new RegExp(tridentPattern, "i").exec(userAgent);
        return Browser.getVersionFromMatches(matches) + tridentDiffFromVersion;
    };
    Browser.fillDocumentElementBrowserTypeClassNames = function (browserTypesOrderedList) {
        var documentElementClassName = "";
        var browserTypeslist = browserTypesOrderedList.concat(["WindowsPlatform", "MacOSPlatform", "MacOSMobilePlatform", "AndroidMobilePlatform",
            "WindowsPhonePlatform", "WebKitFamily", "WebKitTouchUI", "MSTouchUI", "TouchUI", "AndroidDefaultBrowser"]);
        for (var i = 0; i < browserTypeslist.length; i++) {
            var type = browserTypeslist[i];
            if (Browser[type])
                documentElementClassName += "dx" + type + " ";
        }
        documentElementClassName += "dxBrowserVersion-" + Browser.MajorVersion;
        if (document && document.documentElement) {
            if (document.documentElement.className != "")
                documentElementClassName = " " + documentElementClassName;
            document.documentElement.className += documentElementClassName;
            Browser.Info = documentElementClassName;
        }
    };
    Browser.UserAgent = window.navigator.userAgent.toLowerCase();
    Browser._foo = Browser.IdentUserAgent(Browser.UserAgent);
    return Browser;
}());
exports.Browser = Browser;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DomUtils_1 = __webpack_require__(1);
var Point_1 = __webpack_require__(4);
var Browser_1 = __webpack_require__(6);
var GridLayoutCalculator_1 = __webpack_require__(16);
var TouchUIHelper_1 = __webpack_require__(14);
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
        this.position = new Point_1.Point(-1, -1);
        if (!Browser_1.Browser.WebKitTouchUI)
            this.initMouseEvents();
        if (Browser_1.Browser.isTouchEnabled())
            this.initTouchEvents();
    }
    TaskAreaManager.prototype.initMouseEvents = function () {
        var _this = this;
        this.ganttView.taskArea.addEventListener("click", function (evt) { _this.onTaskAreaClick(evt); });
        this.ganttView.taskArea.addEventListener("scroll", this.ganttView.updateView.bind(this.ganttView));
        this.ganttView.taskArea.addEventListener("contextmenu", function (evt) { _this.onContextMenu(evt); });
        this.ganttView.taskArea.addEventListener(DomUtils_1.DomUtils.getMouseWheelEventName(), function (evt) { _this.onMouseWheel(evt); });
        this.ganttView.taskArea.addEventListener("mousedown", function (evt) { _this.onMouseDown(evt); });
        document.addEventListener("mousemove", function (evt) { _this.onDocumentMouseMove(evt); });
        document.addEventListener("mouseup", function (evt) { _this.onDocumentMouseUp(evt); });
        document.addEventListener("keydown", function (evt) { _this.onDocumentKeyDown(evt); });
    };
    TaskAreaManager.prototype.initTouchEvents = function () {
        var _this = this;
        if (Browser_1.Browser.WebKitTouchUI || Browser_1.Browser.WindowsPlatform && !Browser_1.Browser.Edge && !Browser_1.Browser.IE) {
            this.ganttView.taskArea.addEventListener("touchstart", function (evt) { _this.onTouchStart(evt); });
            this.ganttView.taskArea.addEventListener("touchend", function (evt) { _this.onTouchEnd(evt); });
            this.ganttView.taskArea.addEventListener("touchmove", function (evt) { _this.onTouchMove(evt); });
        }
        else if (Browser_1.Browser.MSTouchUI) {
            this.ganttView.taskArea.classList.add(TaskAreaManager.MS_POINTER_ACTIVE_CLASS);
            this.ganttView.taskArea.addEventListener("pointerdown", function (evt) { _this.onMouseDown(evt); });
            this.ganttView.taskArea.addEventListener("pointerup", function (evt) { _this.onDocumentMouseUp(evt); });
            this.ganttView.taskArea.addEventListener("pointermove", function (evt) { _this.onDocumentMouseMove(evt); });
        }
    };
    TaskAreaManager.prototype.attachEventsOnTask = function (taskElement) {
        var _this = this;
        taskElement.addEventListener("mouseenter", function (evt) {
            if (Browser_1.Browser.MSTouchUI)
                setTimeout(function () { return _this.onTaskElementHover(evt); }, 0);
            else
                _this.onTaskElementHover(evt);
        });
    };
    TaskAreaManager.prototype.onMouseDown = function (evt) {
        this.eventManager.onMouseDown(evt);
        this.preventSelect = false;
        this.position = new Point_1.Point(evt.clientX, evt.clientY);
    };
    TaskAreaManager.prototype.onDocumentMouseUp = function (evt) {
        var _this = this;
        this.ganttView.isFocus = DomUtils_1.DomUtils.GetIsParent(this.ganttView.taskArea, DomUtils_1.DomUtils.getEventSource(evt)) ? true : false;
        if (this.ganttView.isFocus && !this.preventSelect && this.ganttView.settings.allowSelectTask && !this.isConnectorLine(evt))
            setTimeout(function () { _this.changeTaskSelection(_this.getClickedTaskIndex(evt)); }, 0);
        this.eventManager.onMouseUp(evt);
    };
    TaskAreaManager.prototype.onMouseWheel = function (evt) {
        this.eventManager.onMouseWheel(evt);
    };
    TaskAreaManager.prototype.onDocumentKeyDown = function (evt) {
        this.eventManager.onKeyDown(evt);
    };
    TaskAreaManager.prototype.onDocumentMouseMove = function (evt) {
        if (this.position.x != evt.clientX || this.position.y != evt.clientY) {
            this.eventManager.onMouseMove(evt);
            this.preventSelect = true;
        }
    };
    TaskAreaManager.prototype.onTouchStart = function (evt) {
        this.position = new Point_1.Point(TouchUIHelper_1.TouchUIHelper.getEventX(evt), TouchUIHelper_1.TouchUIHelper.getEventY(evt));
        var now = new Date();
        if (evt.touches.length === 1 && now.getTime() - this.touchTime.getTime() < TaskAreaManager.DBLCLICK_INTERVAL) {
            evt.preventDefault();
            var clickedTask = this.ganttView.viewModel.items[this.getClickedTaskIndex(evt)];
            if (clickedTask)
                this.ganttView.commandManager.showTaskEditDialog.execute(clickedTask.task);
        }
        else
            this.eventManager.onTouchStart(evt);
        this.touchTime = now;
        this.preventSelect = false;
    };
    TaskAreaManager.prototype.onTouchEnd = function (evt) {
        this.eventManager.onTouchEnd(evt);
    };
    TaskAreaManager.prototype.onTouchMove = function (evt) {
        if (this.position.x != TouchUIHelper_1.TouchUIHelper.getEventX(evt) || this.position.y != TouchUIHelper_1.TouchUIHelper.getEventY(evt)) {
            this.eventManager.onTouchMove(evt);
            this.preventSelect = true;
        }
    };
    TaskAreaManager.prototype.onContextMenu = function (evt) {
        if (evt.stopPropagation)
            evt.stopPropagation();
        if (evt.preventDefault)
            evt.preventDefault();
        if (Browser_1.Browser.WebKitFamily)
            evt.returnValue = false;
        this.ganttView.ganttOwner.showPopupMenu(new Point_1.Point(DomUtils_1.DomUtils.getEventX(evt), DomUtils_1.DomUtils.getEventY(evt)));
    };
    TaskAreaManager.prototype.onTaskElementHover = function (evt) {
        evt.preventDefault();
        var hoveredTaskIndex = this.getClickedTaskIndex(evt);
        this.ganttView.taskEditController.show(hoveredTaskIndex);
        this.ganttView.taskEditController.showTaskInfo(DomUtils_1.DomUtils.getEventX(evt));
    };
    TaskAreaManager.prototype.getClickedTaskIndex = function (evt) {
        var y = DomUtils_1.DomUtils.getEventY(evt);
        var taskAreaY = DomUtils_1.DomUtils.getAbsolutePositionY(this.ganttView.taskArea);
        var relativeY = y - taskAreaY;
        return Math.floor(relativeY / this.ganttView.tickSize.height);
    };
    TaskAreaManager.prototype.changeTaskSelection = function (index) {
        var clickedTask = this.ganttView.viewModel.items[index];
        if (clickedTask)
            this.ganttView.ganttOwner.changeGanttTaskSelection(clickedTask.task.id, true);
    };
    TaskAreaManager.prototype.onTaskAreaClick = function (evt) {
        var now = new Date(Date.now());
        var clickedTaskIndex = this.getClickedTaskIndex(evt);
        if (this.time && now.getTime() - this.time.getTime() < TaskAreaManager.DBLCLICK_INTERVAL) {
            evt.preventDefault();
            var clickedTask = this.ganttView.viewModel.items[clickedTaskIndex];
            if (clickedTask)
                this.ganttView.commandManager.showTaskEditDialog.execute(clickedTask.task);
        }
        this.time = now;
    };
    TaskAreaManager.prototype.isConnectorLine = function (evt) {
        var source = DomUtils_1.DomUtils.getEventSource(evt);
        return DomUtils_1.DomUtils.elementHasCssClass(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL) ||
            DomUtils_1.DomUtils.elementHasCssClass(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_VERTICAL);
    };
    TaskAreaManager.DBLCLICK_INTERVAL = 300;
    TaskAreaManager.MS_POINTER_ACTIVE_CLASS = "ms-pointer-active";
    return TaskAreaManager;
}());
exports.TaskAreaManager = TaskAreaManager;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DateRange = (function () {
    function DateRange(start, end) {
        this.start = start;
        this.end = end;
    }
    return DateRange;
}());
exports.DateRange = DateRange;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(2);
var DataObject = (function () {
    function DataObject() {
        this.internalId = this.generateGuid();
    }
    DataObject.prototype.assignFromObject = function (sourceObj) {
        if (!Utils_1.JsonUtils.isExists(sourceObj))
            return;
        if (Utils_1.JsonUtils.isExists(sourceObj.id)) {
            this.id = sourceObj.id;
            this.internalId = String(sourceObj.id);
        }
    };
    DataObject.prototype.generateGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return DataObject;
}());
exports.DataObject = DataObject;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(2);
var CollectionBase = (function () {
    function CollectionBase() {
        this._items = new Array();
        this._isGanttCollection = true;
    }
    CollectionBase.prototype.add = function (element) {
        if (!Utils_1.JsonUtils.isExists(element))
            return;
        if (!!this.getItemById(element.internalId))
            throw "The collection item with id ='" + element.internalId + "' already exists.";
        this._items.push(element);
    };
    CollectionBase.prototype.addRange = function (range) {
        for (var i = 0; i < range.length; i++)
            this.add(range[i]);
    };
    CollectionBase.prototype.remove = function (element) {
        var index = this._items.indexOf(element);
        if (index > -1 && index < this._items.length)
            this._items.splice(index, 1);
    };
    CollectionBase.prototype.clear = function () {
        this._items.splice(0, this._items.length);
    };
    Object.defineProperty(CollectionBase.prototype, "items", {
        get: function () {
            return this._items.slice();
        },
        set: function (value) {
            if (value)
                this._items = value.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionBase.prototype, "length", {
        get: function () {
            return this._items.length;
        },
        enumerable: true,
        configurable: true
    });
    CollectionBase.prototype.getItem = function (index) {
        if (index > -1 && index < this._items.length)
            return this._items[index];
        return null;
    };
    CollectionBase.prototype.getItemById = function (id) {
        return this._items.filter(function (val) { return val.internalId === id; })[0];
    };
    CollectionBase.prototype.getItemByPublicId = function (id) {
        return this._items.filter(function (val) { return val.id === id || val.id.toString() === id; })[0];
    };
    CollectionBase.prototype.assign = function (sourceCollection) {
        if (!Utils_1.JsonUtils.isExists(sourceCollection))
            return;
        this.items = sourceCollection.items;
    };
    CollectionBase.prototype.importFromObject = function (source) {
        if (!Utils_1.JsonUtils.isExists(source))
            return;
        this.clear();
        if (source._isGanttCollection)
            this.assign(source);
        else if (source instanceof Array) {
            this.importFromArray(source);
        }
        else {
            this.createItemFromObjectAndAdd(source);
        }
    };
    CollectionBase.prototype.createItemFromObjectAndAdd = function (source) {
        if (Utils_1.JsonUtils.isExists(source)) {
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
        this.importFromObject(Utils_1.JsonUtils.evalJson(json));
    };
    return CollectionBase;
}());
exports.CollectionBase = CollectionBase;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var DataObject_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(2);
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
        if (Utils_1.JsonUtils.isExists(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.internalId = String(sourceObj.id);
            this.predecessorId = String(sourceObj.predecessorId);
            this.successorId = String(sourceObj.successorId);
            this.type = this.parseType(sourceObj.type);
        }
    };
    Dependency.prototype.parseType = function (type) {
        if (Utils_1.JsonUtils.isExists(type)) {
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Browser_1 = __webpack_require__(6);
var TouchUIHelper = (function () {
    function TouchUIHelper() {
    }
    TouchUIHelper.isTouchEventName = function (eventName) {
        return Browser_1.Browser.WebKitTouchUI && (eventName.indexOf("touch") > -1 || eventName.indexOf("gesture") > -1);
    };
    TouchUIHelper.getEventX = function (evt) {
        return Browser_1.Browser.IE ? evt.pageX : evt.changedTouches[0].pageX;
    };
    TouchUIHelper.getEventY = function (evt) {
        return Browser_1.Browser.IE ? evt.pageY : evt.changedTouches[0].pageY;
    };
    TouchUIHelper.touchMouseDownEventName = Browser_1.Browser.WebKitTouchUI ? "touchstart" : (Browser_1.Browser.Edge && Browser_1.Browser.MSTouchUI && window.PointerEvent ? "pointerdown" : "mousedown");
    TouchUIHelper.touchMouseUpEventName = Browser_1.Browser.WebKitTouchUI ? "touchend" : (Browser_1.Browser.Edge && Browser_1.Browser.MSTouchUI && window.PointerEvent ? "pointerup" : "mouseup");
    TouchUIHelper.touchMouseMoveEventName = Browser_1.Browser.WebKitTouchUI ? "touchmove" : (Browser_1.Browser.Edge && Browser_1.Browser.MSTouchUI && window.PointerEvent ? "pointermove" : "mousemove");
    TouchUIHelper.msTouchDraggableClassName = "dxMSTouchDraggable";
    return TouchUIHelper;
}());
exports.TouchUIHelper = TouchUIHelper;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var DataObject_1 = __webpack_require__(9);
var DayOfWeek_1 = __webpack_require__(58);
var DayOfWeekMonthlyOccurrence_1 = __webpack_require__(31);
var Month_1 = __webpack_require__(59);
var Utils_1 = __webpack_require__(2);
var DateTimeUtils_1 = __webpack_require__(3);
var RecurrenceFactory_1 = __webpack_require__(32);
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
        if (Utils_1.JsonUtils.isExists(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.start = DateTimeUtils_1.DateTimeUtils.convertToDate(sourceObj.start);
            this.end = DateTimeUtils_1.DateTimeUtils.convertToDate(sourceObj.end);
            if (Utils_1.JsonUtils.isExists(sourceObj.interval))
                this.interval = sourceObj.interval;
            if (Utils_1.JsonUtils.isExists(sourceObj.occurrenceCount))
                this.occurrenceCount = sourceObj.occurrenceCount;
            if (Utils_1.JsonUtils.isExists(sourceObj.dayOfWeek))
                this.dayOfWeekInternal = RecurrenceFactory_1.RecurrenceFactory.getEnumValue(DayOfWeek_1.DayOfWeek, sourceObj.dayOfWeek);
            if (Utils_1.JsonUtils.isExists(sourceObj.day))
                this.dayInternal = sourceObj.day;
            if (Utils_1.JsonUtils.isExists(sourceObj.dayOfWeekOccurrence))
                this.dayOfWeekOccurrenceInternal = RecurrenceFactory_1.RecurrenceFactory.getEnumValue(DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence, sourceObj.dayOfWeekOccurrence);
            if (Utils_1.JsonUtils.isExists(sourceObj.month))
                this.monthInternal = RecurrenceFactory_1.RecurrenceFactory.getEnumValue(Month_1.Month, sourceObj.month);
            if (Utils_1.JsonUtils.isExists(sourceObj.calculateByDayOfWeek))
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
    ;
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
    ;
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
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(RecurrenceBase.prototype, "dayOfWeekInternal", {
        get: function () { return this._dayOfWeek; },
        set: function (dayOfWeek) {
            if (dayOfWeek >= DayOfWeek_1.DayOfWeek.Sunday && dayOfWeek <= DayOfWeek_1.DayOfWeek.Saturday)
                this._dayOfWeek = dayOfWeek;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(RecurrenceBase.prototype, "dayOfWeekOccurrenceInternal", {
        get: function () {
            return this._dayOfWeekOccurrence;
        },
        set: function (value) {
            if (value >= DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence.First && value <= DayOfWeekMonthlyOccurrence_1.DayOfWeekMonthlyOccurrence.Last)
                this._dayOfWeekOccurrence = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(RecurrenceBase.prototype, "monthInternal", {
        get: function () { return this._month; },
        set: function (value) {
            if (value >= Month_1.Month.January && value <= Month_1.Month.December)
                this._month = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(RecurrenceBase.prototype, "start", {
        get: function () { return this._start; },
        set: function (date) {
            if (!date)
                return;
            this._start = date;
            if (!!this._end && date > this._end)
                this._end = date;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(RecurrenceBase.prototype, "end", {
        get: function () { return this._end; },
        set: function (date) {
            if (!date)
                return;
            this._end = date;
            if (!!this._start && date < this._start)
                this._start = date;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(RecurrenceBase.prototype, "occurrenceCount", {
        get: function () { return this._occurrenceCount; },
        set: function (value) {
            if (value < 0)
                value = 0;
            this._occurrenceCount = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(RecurrenceBase.prototype, "interval", {
        get: function () { return this._interval; },
        set: function (value) {
            if (value > 0)
                this._interval = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return RecurrenceBase;
}(DataObject_1.DataObject));
exports.RecurrenceBase = RecurrenceBase;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Size_1 = __webpack_require__(23);
var DateRange_1 = __webpack_require__(8);
var Enums_1 = __webpack_require__(13);
var GridElementInfo_1 = __webpack_require__(35);
var Utils_1 = __webpack_require__(34);
var Point_1 = __webpack_require__(4);
var Dependency_1 = __webpack_require__(12);
var Settings_1 = __webpack_require__(36);
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
        this.arrowSize = new Size_1.Size(elementSizeValues.connectorArrowWidth, elementSizeValues.connectorArrowWidth);
        this.lineThickness = elementSizeValues.connectorLineThickness;
        this.minConnectorSpaceFromTask = (this.tickSize.height - this.taskHeight) / 2;
        this.tickTimeSpan = Utils_1.DateUtils.getTickTimeSpan(viewType);
        this.horizontalTickCount = this.getTotalTickCount();
        this.scrollBarHeight = scrollBarHeight;
        this.createTileToConnectorLinesMap();
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
        var result = new Point_1.Point();
        var posValue = (index + 1) * (isVertical ? this.tickSize.width : this.tickSize.height);
        if (isVertical)
            result.x = posValue;
        else
            result.y = posValue;
        return result;
    };
    GridLayoutCalculator.prototype.getGridBorderSize = function (isVertical, sizeValue) {
        var result = new Size_1.Size();
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
        return new Point_1.Point(index * this.tickSize.width * this.getScaleItemColSpan(scaleType));
    };
    GridLayoutCalculator.prototype.getScaleItemSize = function (scaleType) {
        return new Size_1.Size(this.tickSize.width * this.getScaleItemColSpan(scaleType));
    };
    GridLayoutCalculator.prototype.getScaleItemColSpan = function (scaleType) {
        if (scaleType.valueOf() == this.viewType.valueOf())
            return 1;
        if (this.viewType == Enums_1.ViewType.TenMinutes)
            return 6;
        if (this.viewType == Enums_1.ViewType.Hours)
            return 24;
        if (this.viewType == Enums_1.ViewType.SixHours)
            return 4;
        if (this.viewType == Enums_1.ViewType.Days)
            return 7;
        if (this.viewType == Enums_1.ViewType.Weeks)
            return 4.29;
        if (this.viewType == Enums_1.ViewType.Months)
            return 12;
        if (this.viewType == Enums_1.ViewType.Quarter)
            return 4;
        if (this.viewType == Enums_1.ViewType.Years)
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
        if (this.getTask(index).isMilestone())
            result = "dx-gantt-milestoneWrapper";
        if (this.viewModel.items[index].selected)
            result += " dx-gantt-selectedTask";
        return result;
    };
    GridLayoutCalculator.prototype.getTaskWrapperPoint = function (index) {
        var height = this.getTaskHeight(index);
        var y = index * this.tickSize.height + (this.tickSize.height - height) / 2;
        var result = new Point_1.Point(this.getPosByDate(this.getTask(index).start), y);
        if (this.getTask(index).isMilestone()) {
            var height_1 = this.getTaskHeight(index);
            result.x -= height_1 / 2;
        }
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
        var result = "dx-gantt-task";
        var task = this.getTask(index);
        var autoCalculatedParent = this.viewModel.parentAutoCalc && this.viewModel.taskHasChildrenByIndex(index);
        if (task.isMilestone())
            result += " dx-gantt-milestone";
        else if (taskWidth <= this.elementSizeValues.smallTaskWidth)
            result += " dx-gantt-smallTask";
        if (autoCalculatedParent)
            result += this.getAutoCalcParentTaskClassName(task);
        return result;
    };
    GridLayoutCalculator.prototype.getAutoCalcParentTaskClassName = function (task) {
        var result = " dx-gantt-parent";
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
        return new Size_1.Size(this.getTaskWidth(index), this.getTaskHeight(index));
    };
    GridLayoutCalculator.prototype.getTaskWidth = function (index) {
        var task = this.getTask(index);
        return task.isMilestone() ? this.getTaskHeight(index) : Math.max(this.getWidthByDateRange(task.start, task.end), this.minTaskWidth);
    };
    GridLayoutCalculator.prototype.getTaskHeight = function (index) {
        var task = this.getTask(index);
        if (task.isMilestone())
            return this.milestoneWidth;
        if (this.viewModel.isTaskToCalculateByChildren(task.id))
            return this.parentTaskHeight;
        return this.taskHeight;
    };
    GridLayoutCalculator.prototype.getTask = function (index) {
        return this.viewModel.items[index].task;
    };
    GridLayoutCalculator.prototype.getTaskProgressElementInfo = function (index) {
        var result = new GridElementInfo_1.GridElementInfo();
        result.className = "dx-gantt-tPrg";
        result.setSize(this.getTaskProgressSize(index));
        return result;
    };
    GridLayoutCalculator.prototype.getTaskProgressSize = function (index) {
        return new Size_1.Size(this.getTaskProgressWidth(index), null);
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
                result.margins.marginLeft = -taskX;
            }
        }
        return result;
    };
    GridLayoutCalculator.prototype.getTaskTextElementClassName = function (isInsideText) {
        var result = "dx-gantt-taskTitle";
        result += (isInsideText ? " dx-gantt-titleIn" : " dx-gantt-titleOut");
        return result;
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
        result.className = "dx-gantt-taskRes";
        return result;
    };
    GridLayoutCalculator.prototype.getSelectionElementInfo = function (index) {
        return this.getRowElementInfo(index, "dx-gantt-sel");
    };
    GridLayoutCalculator.prototype.getSelectionPosition = function (index) {
        var result = new Point_1.Point();
        result.y = index * this.tickSize.height;
        return result;
    };
    GridLayoutCalculator.prototype.getSelectionSize = function () {
        return new Size_1.Size(this.tickSize.width * this.horizontalTickCount, this.tickSize.height);
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
        var result = new Point_1.Point();
        result.x = this.getPosByDate(intervalStart);
        return result;
    };
    GridLayoutCalculator.prototype.getNoWorkingIntervalSize = function (noWorkingInterval) {
        return new Size_1.Size(this.getWidthByDateRange(noWorkingInterval.start, noWorkingInterval.end), this.getVerticalGridLineHeight());
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
        return new Point_1.Point(Math.min(startPoint.x, endPoint.x), Math.min(startPoint.y, endPoint.y));
    };
    GridLayoutCalculator.prototype.getConnectorSize = function (startPoint, endPoint, isVertical, isEdgeLine) {
        var result = new Size_1.Size();
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
        var result = "dx-gantt-arrow";
        switch (arrowPosition) {
            case Enums_1.Position.Left:
                result += " dx-gantt-LA";
                break;
            case Enums_1.Position.Top:
                result += " dx-gantt-TA";
                break;
            case Enums_1.Position.Right:
                result += " dx-gantt-RA";
                break;
            case Enums_1.Position.Bottom:
                result += " dx-gantt-BA";
                break;
        }
        return result;
    };
    GridLayoutCalculator.prototype.getArrowPoint = function (lineInfo, arrowPosition) {
        return new Point_1.Point(this.getArrowX(lineInfo, arrowPosition), this.getArrowY(lineInfo, arrowPosition));
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
            case (Dependency_1.DependencyType.FS):
                return this.getFinishToStartConnectorPoints(predessorIndex, successorIndex);
            case (Dependency_1.DependencyType.SF):
                return this.getStartToFinishConnectorPoints(predessorIndex, successorIndex);
            case (Dependency_1.DependencyType.SS):
                return this.getStartToStartConnectorPoints(predessorIndex, successorIndex);
            case (Dependency_1.DependencyType.FF):
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
        else {
            if (this.getTask(predessorIndex).end <= this.getTask(successorIndex).start)
                return this.getConnectorPoints_FromTopTaskBottomSide_ToBottomTaskRightSide(successorIndex, predessorIndex, false);
            return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskRightSide(successorIndex, predessorIndex, true);
        }
    };
    GridLayoutCalculator.prototype.getFinishToFinishConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex) {
            return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskRightSide(predessorIndex, successorIndex);
        }
        else {
            return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskRightSide(successorIndex, predessorIndex);
        }
    };
    GridLayoutCalculator.prototype.getStartToStartConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex) {
            return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskLeftSide(predessorIndex, successorIndex);
        }
        else {
            return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskLeftSide(successorIndex, predessorIndex);
        }
    };
    GridLayoutCalculator.prototype.getStartToFinishConnectorPoints = function (predessorIndex, successorIndex) {
        if (predessorIndex < successorIndex) {
            if (this.getTask(predessorIndex).start >= this.getTask(successorIndex).end)
                return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskTopSide(predessorIndex, successorIndex, true);
            return this.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskRightSide(predessorIndex, successorIndex, false);
        }
        else {
            if (this.getTask(predessorIndex).start >= this.getTask(successorIndex).end)
                return this.getConnectorPoints_FromTopTaskBottomSide_ToBottomTaskLeftSide(successorIndex, predessorIndex, true);
            return this.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskLeftSide(successorIndex, predessorIndex, true);
        }
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskTopSide = function (topTaskIndex, bottomTaskIndex, shiftEndPointToRight) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskRightCenter = this.getTaskRightCenter(topTaskPoint, topTaskIndex);
        var isBottomMilestone = this.getTask(bottomTaskIndex).isMilestone();
        var bottomTaskTopCenter = this.getTaskTopCenter(bottomTaskPoint, bottomTaskIndex);
        var endPointIndent = shiftEndPointToRight ? this.getTaskWidth(bottomTaskIndex) - this.minLineLength : this.minLineLength;
        result.push(new Point_1.Point(Math.floor(topTaskRightCenter.x), Math.floor(topTaskRightCenter.y)));
        result.push(new Point_1.Point(Math.floor(isBottomMilestone ? bottomTaskTopCenter.x : bottomTaskPoint.x + endPointIndent), Math.floor(result[0].y)));
        result.push(new Point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskTopCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskRightSide_ToBottomTaskRightSide = function (topTaskIndex, bottomTaskIndex) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskRightCenter = this.getTaskRightCenter(topTaskPoint, topTaskIndex);
        var bottomTaskRightCenter = this.getTaskRightCenter(bottomTaskPoint, bottomTaskIndex);
        result.push(new Point_1.Point(Math.floor(topTaskRightCenter.x), Math.floor(topTaskRightCenter.y)));
        result.push(new Point_1.Point(Math.floor(Math.max(topTaskRightCenter.x, bottomTaskRightCenter.x) + this.minLineLength), Math.floor(result[0].y)));
        result.push(new Point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskRightCenter.y)));
        result.push(new Point_1.Point(Math.floor(bottomTaskRightCenter.x), Math.floor(bottomTaskRightCenter.y)));
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
        result.push(new Point_1.Point(Math.floor(topTaskRightCenter.x), Math.floor(topTaskRightCenter.y)));
        result.push(new Point_1.Point(Math.floor(result[0].x + this.minLineLength), Math.floor(result[0].y)));
        result.push(new Point_1.Point(Math.floor(result[1].x), Math.floor(shiftToTop ?
            topTaskBottomCenter.y + this.minConnectorSpaceFromTask
            : bottomTaskTopCenter.y - this.minConnectorSpaceFromTask)));
        result.push(new Point_1.Point(Math.floor(bottomTaskLeftCenter.x - this.minLineLength), Math.floor(result[2].y)));
        result.push(new Point_1.Point(Math.floor(result[3].x), Math.floor(bottomTaskLeftCenter.y)));
        result.push(new Point_1.Point(Math.floor(bottomTaskLeftCenter.x), Math.floor(bottomTaskLeftCenter.y)));
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
        result.push(new Point_1.Point(Math.floor(isTopMilestone ? topTaskBottomCenter.x : topTaskPoint.x + startPointIndent), Math.floor(topTaskBottomCenter.y)));
        result.push(new Point_1.Point(Math.floor(result[0].x), Math.floor(bottomTaskRightCenter.y)));
        result.push(new Point_1.Point(Math.floor(bottomTaskRightCenter.x), Math.floor(bottomTaskRightCenter.y)));
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
        result.push(new Point_1.Point(Math.floor(isTopMilestone ? topTaskBottomCenter.x : topTaskPoint.x + startPointIndent), Math.floor(topTaskBottomCenter.y)));
        result.push(new Point_1.Point(Math.floor(result[0].x), Math.floor(bottomTaskLeftCenter.y)));
        result.push(new Point_1.Point(Math.floor(bottomTaskLeftCenter.x), Math.floor(bottomTaskLeftCenter.y)));
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
        result.push(new Point_1.Point(Math.floor(topTaskLeftCenter.x), Math.floor(topTaskLeftCenter.y)));
        result.push(new Point_1.Point(Math.floor(isBottomMilestone ? bottomTaskTopCenter.x : bottomTaskPoint.x + endPointIndent), Math.floor(result[0].y)));
        result.push(new Point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskTopCenter.y)));
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
        result.push(new Point_1.Point(Math.floor(topTaskLeftCenter.x), topTaskLeftCenter.y));
        result.push(new Point_1.Point(Math.floor(result[0].x - this.minLineLength), result[0].y));
        result.push(new Point_1.Point(Math.floor(result[1].x), Math.floor(shiftToTop ?
            topTaskBottomCenter.y + this.minConnectorSpaceFromTask
            : bottomTaskTopCenter.y - this.minConnectorSpaceFromTask)));
        result.push(new Point_1.Point(Math.floor(bottomTaskRightCenter.x + this.minLineLength), Math.floor(result[2].y)));
        result.push(new Point_1.Point(Math.floor(result[3].x), Math.floor(bottomTaskRightCenter.y)));
        result.push(new Point_1.Point(Math.floor(bottomTaskRightCenter.x), Math.floor(bottomTaskRightCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getConnectorPoints_FromTopTaskLeftSide_ToBottomTaskLeftSide = function (topTaskIndex, bottomTaskIndex) {
        var result = new Array();
        var topTaskPoint = this.getTaskPoint(topTaskIndex);
        var bottomTaskPoint = this.getTaskPoint(bottomTaskIndex);
        var topTaskLeftCenter = this.getTaskLeftCenter(topTaskPoint, topTaskIndex);
        var bottomTaskLeftCenter = this.getTaskLeftCenter(bottomTaskPoint, bottomTaskIndex);
        result.push(new Point_1.Point(Math.floor(topTaskLeftCenter.x), Math.floor(topTaskLeftCenter.y)));
        result.push(new Point_1.Point(Math.floor(Math.min(topTaskLeftCenter.x, bottomTaskLeftCenter.x) - this.minLineLength), Math.floor(result[0].y)));
        result.push(new Point_1.Point(Math.floor(result[1].x), Math.floor(bottomTaskLeftCenter.y)));
        result.push(new Point_1.Point(Math.floor(bottomTaskLeftCenter.x), Math.floor(bottomTaskLeftCenter.y)));
        return result;
    };
    GridLayoutCalculator.prototype.getTaskLeftCenter = function (taskPoint, index) {
        return new Point_1.Point(taskPoint.x - this.getTaskEdgeCorrection(index), taskPoint.y + this.getTaskHeight(index) / 2);
    };
    GridLayoutCalculator.prototype.getTaskRightCenter = function (taskPoint, index) {
        return new Point_1.Point(taskPoint.x + this.getTaskWidth(index) + this.getTaskEdgeCorrection(index), taskPoint.y + this.getTaskHeight(index) / 2);
    };
    GridLayoutCalculator.prototype.getTaskTopCenter = function (taskPoint, index) {
        return new Point_1.Point(taskPoint.x + this.getTaskWidth(index) / 2, taskPoint.y - this.getTaskEdgeCorrection(index));
    };
    GridLayoutCalculator.prototype.getTaskBottomCenter = function (taskPoint, index) {
        return new Point_1.Point(taskPoint.x + this.getTaskWidth(index) / 2, taskPoint.y + this.getTaskHeight(index) + this.getTaskEdgeCorrection(index));
    };
    GridLayoutCalculator.prototype.getTaskEdgeCorrection = function (index) {
        var isMilestone = this.viewModel.items[index].task.isMilestone();
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
        for (var i = 0; i < this.viewModel.items.length; i++) {
            for (var j = 0; j < this.viewModel.items[i].dependencies.length; j++)
                this.createConnecotInfo(this.viewModel.items[i].dependencies[j], this.viewModel.items[i].visibleIndex);
        }
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
    GridLayoutCalculator.CLASSNAMES = {
        CONNECTOR_VERTICAL: "dx-gantt-conn-v",
        CONNECTOR_HORIZONTAL: "dx-gantt-conn-h"
    };
    return GridLayoutCalculator;
}());
exports.GridLayoutCalculator = GridLayoutCalculator;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HistoryItemState_1 = __webpack_require__(38);
var DateRange_1 = __webpack_require__(8);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(4);
var DomUtils_1 = __webpack_require__(1);
var HandlerStateBase = (function () {
    function HandlerStateBase(handler) {
        this.handler = handler;
    }
    HandlerStateBase.prototype.start = function () { };
    HandlerStateBase.prototype.finish = function () { };
    HandlerStateBase.prototype.getRelativePos = function (absolutePos) {
        var taskAreaX = DomUtils_1.DomUtils.getAbsolutePositionX(this.handler.control.taskArea);
        var taskAreaY = DomUtils_1.DomUtils.getAbsolutePositionY(this.handler.control.taskArea);
        return new Point_1.Point(absolutePos.x - taskAreaX, absolutePos.y - taskAreaY);
    };
    return HandlerStateBase;
}());
exports.HandlerStateBase = HandlerStateBase;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HistoryItem_1 = __webpack_require__(10);
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var DialogBase_1 = __webpack_require__(21);
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(5);
var DialogBase = (function (_super) {
    tslib_1.__extends(DialogBase, _super);
    function DialogBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DialogBase.prototype.executeInternal = function (options) {
        var _this = this;
        var params = this.createParameters(options);
        var initParams = params.clone();
        this.control.ganttOwner.showDialog(this.getDialogName(), params, function (result) {
            if (result)
                _this.applyParameters(result, initParams);
        }, function () {
            _this.afterClosing();
        });
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CollectionBase_1 = __webpack_require__(11);
var Resource_1 = __webpack_require__(47);
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Size = (function () {
    function Size(width, height) {
        this.width = null;
        this.height = null;
        if (width !== undefined)
            this.width = width;
        if (height !== undefined)
            this.height = height;
    }
    return Size;
}());
exports.Size = Size;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HandlerStateBase_1 = __webpack_require__(18);
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Point_1 = __webpack_require__(4);
var DomUtils_1 = __webpack_require__(1);
var MouseHandlerStateBase_1 = __webpack_require__(24);
var MouseHandlerDragBaseState = (function (_super) {
    tslib_1.__extends(MouseHandlerDragBaseState, _super);
    function MouseHandlerDragBaseState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerDragBaseState.prototype.onMouseDown = function (evt) {
        this.currentPosition = new Point_1.Point(DomUtils_1.DomUtils.getEventX(evt), DomUtils_1.DomUtils.getEventY(evt));
        if (this.handler.control.taskEditController.dependencyId != null)
            this.handler.control.selectDependency(null);
    };
    MouseHandlerDragBaseState.prototype.onMouseUp = function (evt) {
        this.onMouseUpInternal(evt);
        this.handler.switchToDefaultState();
    };
    MouseHandlerDragBaseState.prototype.onMouseMove = function (evt) {
        evt.preventDefault();
        var position = new Point_1.Point(DomUtils_1.DomUtils.getEventX(evt), DomUtils_1.DomUtils.getEventY(evt));
        this.onMouseMoveInternal(position);
        this.currentPosition = position;
    };
    MouseHandlerDragBaseState.prototype.onMouseUpInternal = function (_evt) { };
    MouseHandlerDragBaseState.prototype.onMouseMoveInternal = function (_position) { };
    return MouseHandlerDragBaseState;
}(MouseHandlerStateBase_1.MouseHandlerStateBase));
exports.MouseHandlerDragBaseState = MouseHandlerDragBaseState;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var TouchHandlerStateBase_1 = __webpack_require__(41);
var Point_1 = __webpack_require__(4);
var TouchUIHelper_1 = __webpack_require__(14);
var TouchHandlerDragBaseState = (function (_super) {
    tslib_1.__extends(TouchHandlerDragBaseState, _super);
    function TouchHandlerDragBaseState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerDragBaseState.prototype.onTouchStart = function (evt) {
        this.currentPosition = new Point_1.Point(TouchUIHelper_1.TouchUIHelper.getEventX(evt), TouchUIHelper_1.TouchUIHelper.getEventY(evt));
        if (this.handler.control.taskEditController.dependencyId != null)
            this.handler.control.selectDependency(null);
    };
    TouchHandlerDragBaseState.prototype.onTouchEnd = function (evt) {
        this.onTouchEndInternal(evt);
        this.handler.switchToDefaultState();
    };
    TouchHandlerDragBaseState.prototype.onTouchMove = function (evt) {
        evt.preventDefault();
        var position = new Point_1.Point(TouchUIHelper_1.TouchUIHelper.getEventX(evt), TouchUIHelper_1.TouchUIHelper.getEventY(evt));
        this.onTouchMoveInternal(position);
        this.currentPosition = position;
    };
    TouchHandlerDragBaseState.prototype.onTouchEndInternal = function (_evt) { };
    TouchHandlerDragBaseState.prototype.onTouchMoveInternal = function (_position) { };
    return TouchHandlerDragBaseState;
}(TouchHandlerStateBase_1.TouchHandlerStateBase));
exports.TouchHandlerDragBaseState = TouchHandlerDragBaseState;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HistoryItem_1 = __webpack_require__(10);
var CreateResourceHistoryItem = (function (_super) {
    tslib_1.__extends(CreateResourceHistoryItem, _super);
    function CreateResourceHistoryItem(modelManipulator, text) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.text = text;
        return _this;
    }
    CreateResourceHistoryItem.prototype.redo = function () {
        this.resource = this.modelManipulator.resource.create(this.text, this.resource ? this.resource.internalId : null);
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
        this.modelManipulator.resource.create(this.resource.text, this.resourceId, function () {
            if (_this.resource.color)
                _this.modelManipulator.resource.properties.color.setValue(_this.resource.internalId, _this.resource.color);
            _super.prototype.undo.call(_this);
        });
    };
    RemoveResourceHistoryItem.prototype.undoItemsQuery = function () {
        this.modelManipulator.resource.create(this.resource.text, this.resourceId, function () { });
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HistoryItem_1 = __webpack_require__(10);
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
var TaskDesriptionHistoryItem = (function (_super) {
    tslib_1.__extends(TaskDesriptionHistoryItem, _super);
    function TaskDesriptionHistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskDesriptionHistoryItem.prototype.getPropertiesManipulator = function () {
        return this.modelManipulator.task.properties.description;
    };
    return TaskDesriptionHistoryItem;
}(TaskPropertiesHistoryItemBase));
exports.TaskDesriptionHistoryItem = TaskDesriptionHistoryItem;
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
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
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
        enumerable: true,
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DateTimeUtils_1 = __webpack_require__(3);
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
    ;
    Object.defineProperty(TimeRange.prototype, "start", {
        get: function () { return this._start; },
        set: function (time) {
            if (time && DateTimeUtils_1.DateTimeUtils.caclTimeDifference(time, this._end) >= 0)
                this._start = time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeRange.prototype, "end", {
        get: function () { return this._end; },
        set: function (time) {
            if (time && DateTimeUtils_1.DateTimeUtils.caclTimeDifference(this._start, time) >= 0)
                this._end = time;
        },
        enumerable: true,
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
        ;
        this.start = DateTimeUtils_1.DateTimeUtils.getMinTime(this.start, range.start);
        this.end = DateTimeUtils_1.DateTimeUtils.getMaxTime(this.end, range.end);
        return true;
    };
    return TimeRange;
}());
exports.TimeRange = TimeRange;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DayOfWeekMonthlyOccurrence;
(function (DayOfWeekMonthlyOccurrence) {
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["First"] = 0] = "First";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Second"] = 1] = "Second";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Third"] = 2] = "Third";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Forth"] = 3] = "Forth";
    DayOfWeekMonthlyOccurrence[DayOfWeekMonthlyOccurrence["Last"] = 4] = "Last";
})(DayOfWeekMonthlyOccurrence = exports.DayOfWeekMonthlyOccurrence || (exports.DayOfWeekMonthlyOccurrence = {}));


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(2);
var Daily_1 = __webpack_require__(33);
var Weekly_1 = __webpack_require__(60);
var Monthly_1 = __webpack_require__(61);
var Yearly_1 = __webpack_require__(63);
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
        if (!Utils_1.JsonUtils.isExists(type[value]))
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var RecurrenceBase_1 = __webpack_require__(15);
var DateTimeUtils_1 = __webpack_require__(3);
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = __webpack_require__(13);
var DomUtils_1 = __webpack_require__(1);
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
                return DateUtils.msPerMonth * 12;
        }
    };
    DateUtils.parse = function (data) {
        return typeof data === "function" ? new Date(data()) : new Date(data);
    };
    DateUtils.msPerHour = 3600000;
    DateUtils.msPerDay = 24 * DateUtils.msPerHour;
    DateUtils.msPerWeek = 7 * DateUtils.msPerDay;
    DateUtils.msPerMonth = 30 * DateUtils.msPerDay;
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
        var computedStyle = DomUtils_1.DomUtils.getCurrentStyle(fontHolder);
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
        return result;
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
        result += (yearValueString.length > 0 ? " " + yearValueString : "");
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(4);
var Size_1 = __webpack_require__(23);
var Margins_1 = __webpack_require__(65);
var GridElementInfo = (function () {
    function GridElementInfo(className, position, size) {
        this.id = GridElementInfo.id++;
        this.position = new Point_1.Point();
        this.size = new Size_1.Size();
        this.margins = new Margins_1.Margins();
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
        if (this.margins.marginLeft)
            element.style.marginLeft = this.margins.marginLeft + "px";
        if (this.margins.marginTop)
            element.style.marginTop = this.margins.marginTop + "px";
        if (this.margins.marginRight)
            element.style.marginRight = this.margins.marginRight + "px";
        if (this.margins.marginBottom)
            element.style.marginBottom = this.margins.marginBottom + "px";
    };
    GridElementInfo.prototype.setAttribute = function (name, value) {
        this.attr[name] = value;
    };
    GridElementInfo.id = 0;
    return GridElementInfo;
}());
exports.GridElementInfo = GridElementInfo;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = __webpack_require__(13);
var Utils_1 = __webpack_require__(2);
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
            if (Utils_1.JsonUtils.isExists(settings.viewType))
                result.viewType = settings.viewType;
            if (Utils_1.JsonUtils.isExists(settings.taskTitlePosition))
                result.taskTitlePosition = settings.taskTitlePosition;
            if (Utils_1.JsonUtils.isExists(settings.showResources))
                result.showResources = settings.showResources;
            if (Utils_1.JsonUtils.isExists(settings.areHorizontalBordersEnabled))
                result.areHorizontalBordersEnabled = settings.areHorizontalBordersEnabled;
            if (Utils_1.JsonUtils.isExists(settings.areVerticalBordersEnabled))
                result.areHorizontalBordersEnabled = settings.areHorizontalBordersEnabled;
            if (Utils_1.JsonUtils.isExists(settings.areAlternateRowsEnabled))
                result.areAlternateRowsEnabled = settings.areAlternateRowsEnabled;
            if (Utils_1.JsonUtils.isExists(settings.allowSelectTask))
                result.allowSelectTask = settings.allowSelectTask;
            if (Utils_1.JsonUtils.isExists(settings.firstDayOfWeek))
                result.firstDayOfWeek = settings.firstDayOfWeek;
            if (Utils_1.JsonUtils.isExists(settings.editing))
                result.editing = EditingSettings.parse(settings.editing);
            if (Utils_1.JsonUtils.isExists(settings.validation))
                result.validation = ValidationSettings.parse(settings.validation);
            if (Utils_1.JsonUtils.isExists(settings.stripLines))
                result.stripLines = StripLineSettings.parse(settings.stripLines);
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
    }
    EditingSettings.parse = function (settings) {
        var result = new EditingSettings();
        if (settings) {
            if (Utils_1.JsonUtils.isExists(settings.enabled))
                result.enabled = settings.enabled;
            if (Utils_1.JsonUtils.isExists(settings.allowDependencyDelete))
                result.allowDependencyDelete = settings.allowDependencyDelete;
            if (Utils_1.JsonUtils.isExists(settings.allowDependencyInsert))
                result.allowDependencyInsert = settings.allowDependencyInsert;
            if (Utils_1.JsonUtils.isExists(settings.allowTaskDelete))
                result.allowTaskDelete = settings.allowTaskDelete;
            if (Utils_1.JsonUtils.isExists(settings.allowTaskInsert))
                result.allowTaskInsert = settings.allowTaskInsert;
            if (Utils_1.JsonUtils.isExists(settings.allowTaskUpdate))
                result.allowTaskUpdate = settings.allowTaskUpdate;
            if (Utils_1.JsonUtils.isExists(settings.allowResourceDelete))
                result.allowResourceDelete = settings.allowResourceDelete;
            if (Utils_1.JsonUtils.isExists(settings.allowResourceInsert))
                result.allowResourceInsert = settings.allowResourceInsert;
            if (Utils_1.JsonUtils.isExists(settings.allowResourceUpdate))
                result.allowResourceUpdate = settings.allowResourceUpdate;
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
            if (Utils_1.JsonUtils.isExists(settings.showCurrentTime))
                result.showCurrentTime = settings.showCurrentTime;
            if (Utils_1.JsonUtils.isExists(settings.currentTimeUpdateInterval))
                result.currentTimeUpdateInterval = settings.currentTimeUpdateInterval;
            if (Utils_1.JsonUtils.isExists(settings.currentTimeTitle))
                result.currentTimeTitle = settings.currentTimeTitle;
            if (Utils_1.JsonUtils.isExists(settings.currentTimeCssClass))
                result.currentTimeCssClass = settings.currentTimeCssClass;
            if (Utils_1.JsonUtils.isExists(settings.stripLines))
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
        if (result) {
            for (var i = 0; i < settings.stripLines.length; i++)
                result = result && this.stripLines[i].equal(settings.stripLines[i]);
        }
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
            if (Utils_1.JsonUtils.isExists(settings.start))
                result.start = settings.start;
            if (Utils_1.JsonUtils.isExists(settings.end))
                result.end = settings.end;
            if (Utils_1.JsonUtils.isExists(settings.title))
                result.title = settings.title;
            if (Utils_1.JsonUtils.isExists(settings.cssClass))
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
        ;
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
            if (Utils_1.JsonUtils.isExists(settings.validateDependencies))
                result.validateDependencies = settings.validateDependencies;
            if (Utils_1.JsonUtils.isExists(settings.autoUpdateParentTasks))
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = __webpack_require__(13);
var DateRange_1 = __webpack_require__(8);
var DomUtils_1 = __webpack_require__(1);
var Browser_1 = __webpack_require__(6);
var TaskEditController = (function () {
    function TaskEditController(gantt) {
        this.taskIndex = -1;
        this.successorIndex = -1;
        this.editing = false;
        this.gantt = gantt;
        this.createElements();
    }
    Object.defineProperty(TaskEditController.prototype, "taskId", {
        get: function () {
            return this.gantt.viewModel.items[this.taskIndex].task.internalId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "successorId", {
        get: function () {
            return this.gantt.viewModel.items[this.successorIndex].task.internalId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskEditController.prototype, "task", {
        get: function () {
            return this.gantt.viewModel.items[this.taskIndex].task;
        },
        enumerable: true,
        configurable: true
    });
    TaskEditController.prototype.show = function (taskIndex) {
        if (!this.editing) {
            this.taskIndex = taskIndex;
            this.updateWrapInfo();
            this.wrapInfo.assignPosition(this.baseElement);
            this.wrapInfo.assignSize(this.baseElement);
            this.gantt.taskArea.appendChild(this.baseElement);
            this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
            if (!this.gantt.settings.editing.enabled || !this.gantt.settings.editing.allowDependencyInsert)
                this.baseElement.className = this.baseElement.className + " hide-dependency";
            if (this.task.isMilestone())
                this.baseElement.className = this.baseElement.className + " milestone";
            else {
                if (!this.gantt.settings.editing.enabled || !this.gantt.settings.editing.allowTaskUpdate || !this.canUpdateTask())
                    this.baseElement.className = this.baseElement.className + " hide-updating";
                this.progressEdit.style.left = ((this.task.progress / 100) *
                    this.wrapInfo.size.width - (this.progressEdit.offsetWidth / 2)) + "px";
            }
            this.taskDateRange = new DateRange_1.DateRange(this.task.start, this.task.end);
        }
    };
    TaskEditController.prototype.hide = function () {
        var parentNode = this.baseElement.parentNode;
        if (parentNode)
            parentNode.removeChild(this.baseElement);
        this.tooltip.hide();
    };
    TaskEditController.prototype.showTaskInfo = function (posX) {
        this.tooltip.showInfo(this.task, posX, 500);
    };
    TaskEditController.prototype.updateWrapInfo = function () {
        this.wrapInfo = this.getTaskWrapperElementInfo(this.taskIndex);
        this.wrapInfo.position.x--;
    };
    TaskEditController.prototype.showDependencySuccessor = function (taskIndex) {
        if (this.successorIndex != taskIndex && this.taskIndex != taskIndex) {
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
        this.editing = true;
        var progressOffset = position.x - this.wrapInfo.position.x;
        var progress = 0;
        if (position.x > this.wrapInfo.position.x)
            if (position.x < this.wrapInfo.position.x + this.wrapInfo.size.width)
                progress = Math.round((progressOffset) / this.baseElement.clientWidth * 100);
            else
                progress = 100;
        this.progressEdit.style.left = ((progress / 100) *
            this.wrapInfo.size.width - (this.progressEdit.offsetWidth / 2)) + "px";
        this.tooltip.showProgress(progress, DomUtils_1.DomUtils.getAbsolutePositionX(this.progressEdit) + this.progressEdit.offsetWidth / 2);
    };
    TaskEditController.prototype.confirmProgress = function () {
        this.editing = false;
        var progress = Math.round((this.progressEdit.offsetLeft + (this.progressEdit.offsetWidth / 2)) / this.wrapInfo.size.width * 100);
        this.gantt.commandManager.changeTaskProgressCommand.execute(this.taskId, progress);
    };
    TaskEditController.prototype.processEnd = function (position) {
        this.baseElement.className = this.baseElement.className + " move";
        this.editing = true;
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
        this.tooltip.showTime(startDate, this.taskDateRange.end, DomUtils_1.DomUtils.getAbsolutePositionX(this.baseElement) + this.baseElement.clientWidth);
    };
    TaskEditController.prototype.confirmEnd = function () {
        this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
        this.editing = false;
        this.gantt.commandManager.changeTaskEndCommand.execute(this.taskId, this.taskDateRange.end);
        this.hide();
        this.updateWrapInfo();
    };
    TaskEditController.prototype.processStart = function (position) {
        this.baseElement.className = this.baseElement.className + " move";
        this.editing = true;
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
        this.tooltip.showTime(this.taskDateRange.start, endDate, DomUtils_1.DomUtils.getAbsolutePositionX(this.baseElement));
    };
    TaskEditController.prototype.confirmStart = function () {
        this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
        this.editing = false;
        this.gantt.commandManager.changeTaskStartCommand.execute(this.taskId, this.taskDateRange.start);
        this.hide();
        this.updateWrapInfo();
    };
    TaskEditController.prototype.processMove = function (delta) {
        if (this.gantt.settings.editing.enabled && this.gantt.settings.editing.allowTaskUpdate) {
            this.baseElement.className = this.baseElement.className + " move";
            this.editing = true;
            var left = this.baseElement.offsetLeft + delta;
            this.baseElement.style.left = left + "px";
            var date = this.gantt.gridLayoutCalculator.getDateByPos(left);
            this.taskDateRange.start = this.getNewDate(this.task.start, date);
            var dateDiff = this.task.start.getTime() - this.taskDateRange.start.getTime();
            var endDate = new Date(this.task.end.getTime() - dateDiff);
            this.taskDateRange.end = this.getNewDate(this.task.end, endDate);
            this.tooltip.showTime(this.taskDateRange.start, this.taskDateRange.end, DomUtils_1.DomUtils.getAbsolutePositionX(this.baseElement));
        }
    };
    TaskEditController.prototype.confirmMove = function () {
        if (this.gantt.settings.editing.enabled && this.gantt.settings.editing.allowTaskUpdate) {
            if (!this.gantt.settings.editing.allowDependencyInsert)
                this.baseElement.className = this.baseElement.className + " hide-dependency";
            if (this.editing) {
                this.baseElement.className = TaskEditController.CLASSNAMES.TASK_EDIT_BOX;
                this.gantt.commandManager.taskMoveCommand.execute(this.taskId, this.taskDateRange.start, this.taskDateRange.end);
                this.updateWrapInfo();
                this.hide();
                this.editing = false;
            }
        }
    };
    TaskEditController.prototype.getNewDate = function (referenceDate, newDate) {
        if (this.gantt.settings.viewType > Enums_1.ViewType.SixHours) {
            var year = newDate.getFullYear();
            var month = newDate.getMonth();
            var day = newDate.getDate();
            var hours = this.gantt.settings.viewType == Enums_1.ViewType.Days ? newDate.getHours() : referenceDate.getHours();
            var minutes = referenceDate.getMinutes();
            var sec = referenceDate.getSeconds();
            var msec = referenceDate.getMilliseconds();
            return new Date(year, month, day, hours, minutes, sec, msec);
        }
        else
            return newDate;
    };
    TaskEditController.prototype.startDependency = function (pos) {
        this.dependencyLine = document.createElement("DIV");
        this.dependencyLine.className = TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_LINE;
        this.gantt.taskArea.appendChild(this.dependencyLine);
        this.startPosition = pos;
    };
    TaskEditController.prototype.processDependency = function (pos) {
        this.editing = true;
        this.drawline(this.startPosition, pos);
    };
    TaskEditController.prototype.endDependency = function (type) {
        this.editing = false;
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
        return this.dependencyId && this.dependencyId == id;
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
        if (Browser_1.Browser.TouchUI)
            this.dependencyFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.baseFrame.appendChild(this.dependencyFinish);
        this.dependencyStart = document.createElement("DIV");
        this.dependencyStart.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_DEPENDENCY_LEFT);
        if (Browser_1.Browser.TouchUI)
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
        if (Browser_1.Browser.TouchUI)
            this.dependencySuccessorStart.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.dependencySuccessorFrame.appendChild(this.dependencySuccessorStart);
        this.dependencySuccessorFinish = document.createElement("DIV");
        this.dependencySuccessorFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_SUCCESSOR_DEPENDENCY_LEFT);
        if (Browser_1.Browser.TouchUI)
            this.dependencySuccessorFinish.classList.add(TaskEditController.CLASSNAMES.TASK_EDIT_TOUCH);
        this.dependencySuccessorFrame.appendChild(this.dependencySuccessorFinish);
        this.tooltip = new TaskEditTooltip(this.gantt.mainElement, this.gantt.elementTextHelper.cultureInfo, this.baseElement);
        this.attachEvents();
    };
    TaskEditController.prototype.attachEvents = function () {
        this.baseElement.addEventListener("mouseleave", function (evt) {
            if (!this.editing)
                this.hide();
        }.bind(this));
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
    TaskEditController.CLASSNAMES = {
        TASK_EDIT_BOX: "dx-gantt-task-edit-wrapper",
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
var TaskEditTooltip = (function () {
    function TaskEditTooltip(parentElement, cultureInfo, taskEditElement) {
        this.taskEditElement = taskEditElement;
        this.parentElement = parentElement;
        this.baseElement = document.createElement("DIV");
        this.baseElement.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_PROGRESS_STATUS;
        parentElement.appendChild(this.baseElement);
        this.cultureInfo = cultureInfo;
    }
    TaskEditTooltip.prototype.showInfo = function (task, posX, delay) {
        if (delay === void 0) { delay = 0; }
        var showInfoFunc = function () {
            this.baseElement.innerHTML = "";
            var titleWrapper = document.createElement("DIV");
            titleWrapper.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_TASK_TITLE;
            var title = document.createElement("SPAN");
            titleWrapper.appendChild(title);
            this.baseElement.appendChild(titleWrapper);
            title.innerText = task.title;
            this.baseElement.appendChild(this.getTimeContent(task.start, task.end));
            if (!isNaN(task.progress)) {
                var progressElement = document.createElement("DIV");
                progressElement.className = TaskEditTooltip.CLASSNAMES.TASK_EDIT_PROGRESS_STATUS_TIME;
                var progressTitle = document.createElement("SPAN");
                var progressValue = document.createElement("SPAN");
                progressElement.appendChild(progressTitle);
                progressElement.appendChild(progressValue);
                this.baseElement.appendChild(progressElement);
                progressTitle.innerText = (this.cultureInfo.progress ? this.cultureInfo.progress : "Progress") + ": ";
                progressValue.innerText = task.progress + "%";
            }
            this.show(posX, false);
        };
        if (delay)
            this.timerId = setTimeout(showInfoFunc.bind(this), delay);
        else
            showInfoFunc();
    };
    TaskEditTooltip.prototype.showProgress = function (progress, posX) {
        this.baseElement.innerHTML = "";
        this.baseElement.innerText = progress + "%";
        this.show(posX);
    };
    TaskEditTooltip.prototype.showTime = function (start, end, posX) {
        this.baseElement.innerHTML = "";
        this.baseElement.appendChild(this.getTimeContent(start, end));
        this.show(posX);
    };
    TaskEditTooltip.prototype.show = function (posX, autoHide) {
        var _this = this;
        if (autoHide === void 0) { autoHide = true; }
        var arrow = parseInt(getComputedStyle(this.baseElement, "::before").borderLeftWidth);
        var offsetTop = 5;
        this.baseElement.style.display = "block";
        var absolutePositionY = DomUtils_1.DomUtils.getAbsolutePositionY(this.taskEditElement);
        var baseElementPaddingLeft = DomUtils_1.DomUtils.pxToInt(getComputedStyle(this.baseElement).paddingLeft);
        var positionLeft = posX - baseElementPaddingLeft - arrow;
        var positionTop = absolutePositionY - this.baseElement.clientHeight - offsetTop - DomUtils_1.DomUtils.getDocumentScrollTop();
        this.baseElement.style.left = positionLeft + "px";
        this.baseElement.style.top = positionTop + "px";
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
        return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + "/" +
            date.getFullYear() + " " + ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
    };
    TaskEditTooltip.CLASSNAMES = {
        TASK_EDIT_PROGRESS_STATUS: "dx-gantt-task-edit-tooltip",
        TASK_EDIT_TASK_TITLE: "dx-gantt-task-title",
        TASK_EDIT_PROGRESS_STATUS_TIME: "dx-gantt-status-time"
    };
    return TaskEditTooltip;
}());


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HistoryItemState = (function () {
    function HistoryItemState(id, value) {
        this.id = id;
        this.value = value;
    }
    return HistoryItemState;
}());
exports.HistoryItemState = HistoryItemState;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var TaskAreaManager_1 = __webpack_require__(7);
var TaskEditController_1 = __webpack_require__(37);
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Point_1 = __webpack_require__(4);
var DomUtils_1 = __webpack_require__(1);
var MouseHandlerStateBase_1 = __webpack_require__(24);
var TaskAreaManager_1 = __webpack_require__(7);
var Dependency_1 = __webpack_require__(12);
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
        var sourceElement = DomUtils_1.DomUtils.getEventSource(evt);
        this.source = this.handler.getEventSource(sourceElement);
        var pos = this.getRelativePos(new Point_1.Point(DomUtils_1.DomUtils.getAbsolutePositionX(sourceElement) + sourceElement.clientWidth / 2, DomUtils_1.DomUtils.getAbsolutePositionY(sourceElement) + sourceElement.clientHeight / 2));
        this.handler.control.taskEditController.startDependency(pos);
    };
    MouseHandlerDependencyState.prototype.onMouseUp = function (evt) {
        if (evt instanceof PointerEvent) {
            var relativePosStart = this.getRelativePos(new Point_1.Point(DomUtils_1.DomUtils.getAbsolutePositionX(this.handler.control.taskEditController.dependencySuccessorStart) + this.handler.control.taskEditController.dependencySuccessorStart.clientWidth / 2, DomUtils_1.DomUtils.getAbsolutePositionY(this.handler.control.taskEditController.dependencySuccessorStart) + this.handler.control.taskEditController.dependencySuccessorStart.clientHeight / 2));
            var relativePosEnd = this.getRelativePos(new Point_1.Point(DomUtils_1.DomUtils.getAbsolutePositionX(this.handler.control.taskEditController.dependencySuccessorFinish) + this.handler.control.taskEditController.dependencySuccessorFinish.clientWidth / 2, DomUtils_1.DomUtils.getAbsolutePositionY(this.handler.control.taskEditController.dependencySuccessorFinish) + this.handler.control.taskEditController.dependencySuccessorFinish.clientHeight / 2));
            var relativeTouchPos = this.getRelativePos(new Point_1.Point(DomUtils_1.DomUtils.getEventX(evt), DomUtils_1.DomUtils.getEventY(evt)));
            var target = this.isTouchNearby(relativeTouchPos, relativePosStart) ? TaskAreaManager_1.MouseEventSource.Successor_DependencyStart :
                this.isTouchNearby(relativeTouchPos, relativePosEnd) ? TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish : null;
            var type = target === TaskAreaManager_1.MouseEventSource.Successor_DependencyStart || target == TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish ?
                exports.dependencyMap[this.source][target] : null;
            this.handler.control.taskEditController.endDependency(type);
        }
        else {
            var target = this.handler.getEventSource(DomUtils_1.DomUtils.getEventSource(evt));
            var type = target === TaskAreaManager_1.MouseEventSource.Successor_DependencyStart || target == TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish ?
                exports.dependencyMap[this.source][target] : null;
            this.handler.control.taskEditController.endDependency(type);
        }
        this.handler.switchToDefaultState();
    };
    MouseHandlerDependencyState.prototype.onMouseMove = function (evt) {
        evt.preventDefault();
        var relativePos = this.getRelativePos(new Point_1.Point(DomUtils_1.DomUtils.getEventX(evt), DomUtils_1.DomUtils.getEventY(evt)));
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HandlerStateBase_1 = __webpack_require__(18);
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var DialogBase_1 = __webpack_require__(21);
var TaskDependencyHistoryItem_1 = __webpack_require__(19);
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(44);
var GanttView_1 = __webpack_require__(45);
exports.default = GanttView_1.GanttView;
exports.GanttView = GanttView_1.GanttView;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VisualModel_1 = __webpack_require__(46);
var Enums_1 = __webpack_require__(13);
var Utils_1 = __webpack_require__(34);
var DomUtils_1 = __webpack_require__(1);
var DateRange_1 = __webpack_require__(8);
var Size_1 = __webpack_require__(23);
var Point_1 = __webpack_require__(4);
var GridElementInfo_1 = __webpack_require__(35);
var GridLayoutCalculator_1 = __webpack_require__(16);
var EtalonSizeValues_1 = __webpack_require__(66);
var TaskEditController_1 = __webpack_require__(37);
var TaskAreaManager_1 = __webpack_require__(7);
var ModelManipulator_1 = __webpack_require__(67);
var History_1 = __webpack_require__(72);
var EventManager_1 = __webpack_require__(74);
var TaskAreaContainer_1 = __webpack_require__(88);
var Settings_1 = __webpack_require__(36);
var ModelChangesDispatcher_1 = __webpack_require__(89);
var CommandManager_1 = __webpack_require__(91);
var BarManager_1 = __webpack_require__(106);
var Browser_1 = __webpack_require__(6);
var ValidationController_1 = __webpack_require__(107);
var DateTimeUtils_1 = __webpack_require__(3);
var FullScreenModeHelper_1 = __webpack_require__(108);
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
        this.renderedConnectorLines = [];
        this.connectorLinesToElementsMap = {};
        this.noWorkingIntervalsToElementsMap = {};
        this.renderedNoWorkingIntervals = [];
        this.renderedStripLines = [];
        this.stripLinesMap = [];
        this.gridLayoutCalculator = new GridLayoutCalculator_1.GridLayoutCalculator();
        this.etalonSizeValues = new EtalonSizeValues_1.EtalonSizeValues();
        this.tickSize = new Size_1.Size();
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
        window.addEventListener("resize", function () { _this.onBrowserWindowResize(); });
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
    };
    GanttView.prototype.setupHelpers = function () {
        var size = new Size_1.Size(this.taskAreaContainer.getWidth(), this.taskAreaContainer.getHeight());
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
        this.etalonSizeValues.taskWrapperTopPadding = DomUtils_1.DomUtils.getTopPaddings(etalonElements[0]);
        this.etalonSizeValues.connectorLineThickness = DomUtils_1.DomUtils.getVerticalBordersWidth(etalonElements[2]);
        this.etalonSizeValues.connectorArrowWidth = DomUtils_1.DomUtils.getHorizontalBordersWidth(etalonElements[3]);
        for (var i = 0; i <= Enums_1.ViewType.Years; i++) {
            etalonElements[4].innerText = this.elementTextHelper.getScaleItemTextTemplate(i);
            this.etalonSizeValues.scaleItemWidths[i] = etalonElements[4].offsetWidth;
        }
        this.etalonSizeValues.smallTaskWidth = DomUtils_1.DomUtils.getLeftPadding(etalonElements[0].firstChild.firstChild) * 2;
        this.etalonSizeValues.outsideTaskTextDefaultWidth = DomUtils_1.DomUtils.pxToFloat(DomUtils_1.DomUtils.getCurrentStyle(etalonElements[5]).width);
        this.etalonSizeValues.scaleItemHeight = this.ganttOwner.getHeaderHeight() / this.scaleCount;
        this.etalonSizeValues.parentTaskHeight = etalonElements[etalonElements.length - 1].firstChild.offsetHeight;
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
        this.scrollToDate(targetDate, leftPos);
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
        this.scrollToDate(targetDate, leftPos);
    };
    GanttView.prototype.scrollToDate = function (date, leftPos) {
        this.taskAreaContainer.scrollLeft = Math.round(this.gridLayoutCalculator.getPosByDate(date)) - leftPos;
    };
    GanttView.prototype.scrollLeftByViewType = function () {
        var adjustedStartDate = Utils_1.DateUtils.roundStartDate(this.dataRange.start, this.settings.viewType);
        this.taskAreaContainer.scrollLeft = Math.round(this.gridLayoutCalculator.getPosByDate(adjustedStartDate)) + 1;
    };
    GanttView.prototype.onVisualModelChanged = function () {
        this.resetAndUpdate();
    };
    GanttView.prototype.initializeStripLinesUpdater = function () {
        var _this = this;
        if (this.settings.stripLines.showCurrentTime) {
            this.stripLinesUpdaterId = setInterval(function () {
                if (_this.recreateStripLines)
                    _this.recreateStripLines();
            }, Math.max(this.settings.stripLines.currentTimeUpdateInterval, 100));
        }
    };
    GanttView.prototype.clearStripLinesUpdater = function () {
        if (this.stripLinesUpdaterId)
            clearInterval(this.stripLinesUpdaterId);
        this.stripLinesUpdaterId = null;
    };
    GanttView.prototype.getGanttViewStartDate = function (tasks) {
        if (!tasks)
            return new Date();
        var dates = tasks.map(function (t) { return typeof t.start == "string" ? new Date(t.start) : t.start; }).filter(function (d) { return DomUtils_1.DomUtils.isExists(d); });
        return dates.length > 0 ? dates.reduce(function (min, d) { return d < min ? d : min; }, dates[0]) : new Date();
    };
    GanttView.prototype.getGanttViewEndDate = function (tasks) {
        if (!tasks)
            return new Date();
        var dates = tasks.map(function (t) { return typeof t.end == "string" ? new Date(t.end) : t.end; }).filter(function (d) { return DomUtils_1.DomUtils.isExists(d); });
        ;
        return dates.length > 0 ? dates.reduce(function (max, d) { return d > max ? d : max; }, dates[0]) : new Date();
    };
    GanttView.prototype.getTaskAreaWidth = function () {
        return this.gridLayoutCalculator.horizontalTickCount * this.tickSize.width;
    };
    GanttView.prototype.getTaskAreaHeight = function () {
        return this.gridLayoutCalculator.getVerticalGridLineHeight();
    };
    GanttView.prototype.getVisibleTaskCount = function () { return this.viewModel.itemCount; };
    GanttView.prototype.getTask = function (index) {
        var item = this.viewModel.items[index];
        return item.task;
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
            if (i == 0 && this.settings.viewType == Enums_1.ViewType.Weeks)
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
            DomUtils_1.DomUtils.addClassNameToElement(element, className) : DomUtils_1.DomUtils.removeClassNameFromElement(element, className);
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
            var scaleItemInfo = new GridElementInfo_1.GridElementInfo("dx-gantt-si", new Point_1.Point(x), new Size_1.Size(width, this.etalonSizeValues.scaleItemHeight));
            var scaleItemElement = this.createElement(scaleItemInfo, null, parent);
            scaleItemElement.innerText = this.elementTextHelper.getScaleItemText(index, Enums_1.ViewType.Months);
            scaleItemElement.style.lineHeight = this.etalonSizeValues.scaleItemHeight + "px";
            var scaleBorderInfo = new GridElementInfo_1.GridElementInfo("dx-gantt-vb", new Point_1.Point(x + width), new Size_1.Size(0, this.etalonSizeValues.scaleItemHeight));
            this.createElement(scaleBorderInfo, null, parent);
            x += width;
            index++;
            currentDate = nextDate;
        }
    };
    GanttView.prototype.updateView = function () {
        this.timeScaleContainer.scrollLeft = this.taskAreaContainer.scrollLeft;
        this.processScroll(false);
        this.processScroll(true);
        this.ganttOwner.onGanttScroll(this.taskAreaContainer.scrollTop);
    };
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
        var scrollPos = isVertical ? this.taskAreaContainer.scrollTop : this.taskAreaContainer.scrollLeft;
        var newRenderedIndices = this.gridLayoutCalculator.getRenderedRowColumnIndices(scrollPos, isVertical);
        var renderedIndices = isVertical ? this.renderedRowIndices : this.renderedColIndices;
        this.recreateElements(renderedIndices, newRenderedIndices, function (index) { _this.removeTaskAreaBorderAndTaskElement(index, isVertical); }, function (index) { _this.createTaskAreaBorderAndTaskElement(index, isVertical); });
        if (isVertical)
            this.renderedRowIndices = newRenderedIndices;
        else
            this.renderedColIndices = newRenderedIndices;
    };
    GanttView.prototype.recreateNoWorkingIntervalElements = function () {
        var _this = this;
        var newRenderedNoWorkingIntervals = this.gridLayoutCalculator.getRenderedNoWorkingIntervals(this.taskAreaContainer.scrollLeft);
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
        var newRenderedConnectorLines = this.gridLayoutCalculator.getRenderedConnectorLines(this.taskAreaContainer.scrollTop);
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
        var viewItem = this.viewModel.items[index];
        var task = viewItem && viewItem.task;
        if (!task)
            return;
        var dependencies = this.viewModel.dependencies.items.filter(function (d) { return d.predecessorId == task.id || d.successorId == task.id; });
        if (dependencies.length) {
            dependencies.forEach(function (d) { return _this.recreateConnectorLineElement(d.internalId); });
        }
        if (isVisible) {
            this.removeTaskElement(index);
            this.createTaskElement(index);
        }
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
            this.createTaskElement(index);
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
    GanttView.prototype.createTaskElement = function (index) {
        this.createTaskWrapperElement(index);
        if (this.settings.taskTitlePosition == Enums_1.TaskTitlePosition.Outside)
            this.createTaskTextElement(index, this.taskElements[index]);
        var taskVisualElement = this.createTaskVisualElement(index);
        if (!this.viewModel.items[index].task.isMilestone()) {
            if (this.settings.taskTitlePosition == Enums_1.TaskTitlePosition.Inside)
                this.createTaskTextElement(index, taskVisualElement);
            this.createTaskProgressElement(index, taskVisualElement);
        }
        if (this.settings.showResources) {
            this.createResourcesWrapperElement(index);
            this.createResources(index);
        }
        if (this.viewModel.items[index].selected)
            this.createTaskSelectionElement(index);
        if (this.isHighlightRowElementAllowed(index))
            this.createHighlightRowElement(index);
    };
    GanttView.prototype.isHighlightRowElementAllowed = function (index) {
        return index % 2 !== 0 && this.settings.areAlternateRowsEnabled || this.viewModel.items[index].children.length > 0;
    };
    GanttView.prototype.createResourcesWrapperElement = function (index) {
        var resourcesWrapperElementInfo = this.gridLayoutCalculator.getTaskResourcesWrapperElementInfo(index);
        this.createElement(resourcesWrapperElementInfo, index, this.taskArea, this.resourcesElements);
        this.resourcesElements[index].style.display = this.elementTextHelper.getTaskVisibility(index) ? "" : "none";
    };
    GanttView.prototype.createResources = function (index) {
        var resources = this.viewModel.items[index].resources.items;
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
        var taskTextInfo = this.gridLayoutCalculator.getTaskTextElementInfo(index, this.settings.taskTitlePosition == Enums_1.TaskTitlePosition.Inside);
        var taskTextElement = this.createElement(taskTextInfo, index, parent);
        taskTextElement.innerText = this.elementTextHelper.getTaskText(index);
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
        this.removeElement(null, index, this.taskArea, this.taskElements);
        this.removeElement(null, index, this.taskArea, this.resourcesElements);
        this.removeElement(null, index, this.taskArea, this.selectionElements);
        if (this.isHighlightRowElementAllowed(index))
            this.removeElement(null, index, this.taskArea, this.hlRowElements);
    };
    GanttView.prototype.createConnectorLineElement = function (info) {
        var dependencyId = info.attr["dependency-id"];
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
        if (dictionary) {
            if (dictionary instanceof Array && index !== null)
                dictionary[index] = element;
            else
                dictionary[info.id] = element;
        }
        for (var key in info.attr) {
            if (info.attr.hasOwnProperty(key)) {
                element.setAttribute(key, info.attr[key]);
            }
        }
        for (var key in info.style) {
            if (info.style.hasOwnProperty(key)) {
                element.style[key] = info.style[key];
            }
        }
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
        if (viewType == undefined) {
            viewType = this.calculateAutoViewType(this.dataRange.start, this.dataRange.end);
        }
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
        if (Browser_1.Browser.IE)
            this.taskEditController.createElements();
        this.updateView();
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
    GanttView.prototype.updateBarManager = function () {
        this.barManager.updateItemsState([]);
    };
    GanttView.prototype.setTaskTitle = function (taskId, newValue) {
        var task = this.getTaskByPublicId(taskId);
        if (task)
            this.commandManager.changeTaskTitleCommand.execute(task.internalId, newValue);
    };
    GanttView.prototype.setTaskProgress = function (taskId, newValue) {
        var task = this.getTaskByPublicId(taskId);
        if (task) {
            var newProgress = Math.max(newValue, 0);
            newProgress = Math.min(newValue, 100);
            this.commandManager.changeTaskProgressCommand.execute(task.internalId, newProgress);
        }
    };
    GanttView.prototype.setTaskStart = function (taskId, newValue) {
        var task = this.getTaskByPublicId(taskId);
        if (task)
            this.commandManager.changeTaskStartCommand.execute(task.internalId, DateTimeUtils_1.DateTimeUtils.getMinDate(newValue, task.end));
    };
    GanttView.prototype.setTaskEnd = function (taskId, newValue) {
        var task = this.getTaskByPublicId(taskId);
        if (task)
            this.commandManager.changeTaskEndCommand.execute(task.internalId, DateTimeUtils_1.DateTimeUtils.getMaxDate(newValue, task.start));
    };
    GanttView.prototype.removeTask = function (taskId) {
        var task = this.getTaskByPublicId(taskId);
        if (task)
            this.commandManager.removeTaskCommand.execute(task.internalId);
    };
    GanttView.prototype.createTask = function (parentId) {
        var parent = this.getTaskByPublicId(parentId);
        var id = parent ? parent.internalId : null;
        this.commandManager.createTaskCommand.execute(null, null, "", id);
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
    return GanttView;
}());
exports.GanttView = GanttView;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ResourceCollection_1 = __webpack_require__(22);
var TaskCollection_1 = __webpack_require__(48);
var DependencyCollection_1 = __webpack_require__(50);
var ResourceAssignmentCollection_1 = __webpack_require__(51);
var ViewVisualModelItem_1 = __webpack_require__(53);
var ViewVisualModelDependencyInfo_1 = __webpack_require__(54);
var WorkingTimeCalculator_1 = __webpack_require__(55);
var Utils_1 = __webpack_require__(2);
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
        var recalculateParentRequired = this.requireFirstLoadParentAutoCalc;
        var _loop_1 = function () {
            var item = list[i];
            var parentId = item.task.parentId;
            var parentItem = list.filter(function (value) { return value.task && value.task.internalId === parentId || value.task.internalId.toString() === parentId; })[0] || this_1.root;
            item.parent = parentItem;
            parentItem.addChild(item);
            if (recalculateParentRequired) {
                this_1.owner.validationController.recalculateParents(item, function (data) {
                    if (!Utils_1.JsonUtils.isExists(data.id))
                        return;
                    var task = _this.tasks.getItemById(data.id);
                    if (Utils_1.JsonUtils.isExists(data.start))
                        task.start = data.start;
                    if (Utils_1.JsonUtils.isExists(data.end))
                        task.end = data.end;
                    if (Utils_1.JsonUtils.isExists(data.progress))
                        task.progress = data.progress;
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < list.length; i++) {
            _loop_1();
        }
        if (recalculateParentRequired)
            this.owner.dispatcher.notifyParentDataRecalculated(this.getCurrentTaskData());
    };
    ViewVisualModel.prototype.getCurrentTaskData = function () {
        var _this = this;
        return this.tasks.items.map(function (t) { return _this.getTaskObjectForDataSource(t); });
    };
    ;
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
            taskType: task.taskType,
            title: task.title,
            customFields: task.customFields,
            expanded: task.expanded
        };
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
        get: function () { return this._viewItemList.slice(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewVisualModel.prototype, "itemCount", {
        get: function () { return this.items.length; },
        enumerable: true,
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
        enumerable: true,
        configurable: true
    });
    ;
    ViewVisualModel.prototype.updateRange = function (range) { this._workTimeCalculator.updateRange(range); };
    ;
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewVisualModel.prototype, "requireFirstLoadParentAutoCalc", {
        get: function () { return this.parentAutoCalc && this.owner.requireFirstLoadParentAutoCalc(); },
        enumerable: true,
        configurable: true
    });
    ViewVisualModel.prototype.isTaskToCalculateByChildren = function (id) { return this.parentAutoCalc && this.taskHasChildren(id); };
    ViewVisualModel.prototype.hasTasks = function () { return this.tasks.length > 0; };
    ViewVisualModel.prototype.getDataUpdateErrorCallback = function () {
        return this.owner.getDataUpdateErrorCallback && this.owner.getDataUpdateErrorCallback();
    };
    return ViewVisualModel;
}());
exports.ViewVisualModel = ViewVisualModel;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Utils_1 = __webpack_require__(2);
var DataObject_1 = __webpack_require__(9);
var Resource = (function (_super) {
    tslib_1.__extends(Resource, _super);
    function Resource() {
        var _this = _super.call(this) || this;
        _this.text = "";
        _this.color = "";
        return _this;
    }
    Resource.prototype.assignFromObject = function (sourceObj) {
        if (Utils_1.JsonUtils.isExists(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.text = sourceObj.text;
            if (Utils_1.JsonUtils.isExists(sourceObj.color))
                this.color = sourceObj.color;
        }
    };
    return Resource;
}(DataObject_1.DataObject));
exports.Resource = Resource;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Task_1 = __webpack_require__(49);
var CollectionBase_1 = __webpack_require__(11);
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Utils_1 = __webpack_require__(2);
var DataObject_1 = __webpack_require__(9);
var TaskType;
(function (TaskType) {
    TaskType[TaskType["Regular"] = 0] = "Regular";
    TaskType[TaskType["Summary"] = 1] = "Summary";
    TaskType[TaskType["Milestone"] = 2] = "Milestone";
})(TaskType || (TaskType = {}));
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
        if (Utils_1.JsonUtils.isExists(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.owner = sourceObj.owner;
            this.parentId = sourceObj.parentId ? String(sourceObj.parentId) : sourceObj.parentId;
            this.description = sourceObj.description;
            this.title = sourceObj.title;
            this.start = sourceObj.start;
            this.end = sourceObj.end;
            this.start = typeof sourceObj.start == "string" ? new Date(sourceObj.start) : sourceObj.start || new Date(0);
            this.end = typeof sourceObj.end == "string" ? new Date(sourceObj.end) : sourceObj.end || new Date(0);
            this.duration = sourceObj.duration;
            this.progress = sourceObj.progress;
            this.taskType = sourceObj.taskType;
            if (Utils_1.JsonUtils.isExists(sourceObj.expanded))
                this.expanded = !!sourceObj.expanded;
            if (Utils_1.JsonUtils.isExists(sourceObj.color))
                this.color = sourceObj.color;
            this.assignCustomFields(sourceObj.customFields);
        }
    };
    Task.prototype.assignCustomFields = function (sourceObj) {
        if (!sourceObj)
            return;
        for (var property in sourceObj) {
            if (!sourceObj.hasOwnProperty(property))
                continue;
            this.customFields[property] = sourceObj[property];
        }
    };
    Task.prototype.isMilestone = function () {
        return this.start.getTime() == this.end.getTime();
    };
    Task.prototype.getDuration = function () {
        return this.end.getTime() - this.start.getTime();
    };
    return Task;
}(DataObject_1.DataObject));
exports.Task = Task;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CollectionBase_1 = __webpack_require__(11);
var Dependency_1 = __webpack_require__(12);
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CollectionBase_1 = __webpack_require__(11);
var ResourceAssignment_1 = __webpack_require__(52);
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var DataObject_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(2);
var ResourceAssignment = (function (_super) {
    tslib_1.__extends(ResourceAssignment, _super);
    function ResourceAssignment() {
        var _this = _super.call(this) || this;
        _this.taskId = "";
        _this.resourceId = "";
        return _this;
    }
    ResourceAssignment.prototype.assignFromObject = function (sourceObj) {
        if (Utils_1.JsonUtils.isExists(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.taskId = String(sourceObj.taskId);
            this.resourceId = String(sourceObj.resourceId);
        }
    };
    return ResourceAssignment;
}(DataObject_1.DataObject));
exports.ResourceAssignment = ResourceAssignment;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(2);
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
    }
    Object.defineProperty(ViewVisualModelItem.prototype, "resourceText", {
        get: function () {
            var text = "";
            this.resources.items.forEach(function (r) { return text += r.text + " "; });
            return text;
        },
        enumerable: true,
        configurable: true
    });
    ViewVisualModelItem.prototype.addChild = function (child) {
        if (Utils_1.JsonUtils.isExists(child) && this.children.indexOf(child) < 0)
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GanttWorkingDayRuleCollection_1 = __webpack_require__(56);
var DayWorkingTimeInfo_1 = __webpack_require__(64);
var DateTimeUtils_1 = __webpack_require__(3);
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
        enumerable: true,
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CollectionBase_1 = __webpack_require__(11);
var WorkingTimeRule_1 = __webpack_require__(57);
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var DataObject_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(2);
var DateTimeUtils_1 = __webpack_require__(3);
var RecurrenceFactory_1 = __webpack_require__(32);
var Daily_1 = __webpack_require__(33);
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
        if (Utils_1.JsonUtils.isExists(sourceObj)) {
            _super.prototype.assignFromObject.call(this, sourceObj);
            this.recurrence = RecurrenceFactory_1.RecurrenceFactory.createRecurrenceByType(sourceObj.recurrenceType) || new Daily_1.Daily();
            if (Utils_1.JsonUtils.isExists(sourceObj.recurrence))
                this.recurrence.assignFromObject(sourceObj.recurrence);
            if (Utils_1.JsonUtils.isExists(sourceObj.isWorkDay))
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var RecurrenceBase_1 = __webpack_require__(15);
var DateTimeUtils_1 = __webpack_require__(3);
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
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Weekly;
}(RecurrenceBase_1.RecurrenceBase));
exports.Weekly = Weekly;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var RecurrenceBase_1 = __webpack_require__(15);
var DateTimeUtils_1 = __webpack_require__(3);
var MonthInfo_1 = __webpack_require__(62);
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
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Monthly.prototype, "dayOfWeek", {
        get: function () { return this.dayOfWeekInternal; },
        set: function (value) { this.dayOfWeekInternal = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Monthly.prototype, "dayOfWeekOccurrence", {
        get: function () { return this.dayOfWeekOccurrenceInternal; },
        set: function (value) { this.dayOfWeekOccurrenceInternal = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Monthly.prototype, "calculateByDayOfWeek", {
        get: function () { return this._calculateByDayOfWeek; },
        set: function (value) { this._calculateByDayOfWeek = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Monthly;
}(RecurrenceBase_1.RecurrenceBase));
exports.Monthly = Monthly;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DateTimeUtils_1 = __webpack_require__(3);
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var RecurrenceBase_1 = __webpack_require__(15);
var DateTimeUtils_1 = __webpack_require__(3);
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
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Yearly.prototype, "day", {
        get: function () { return this.dayInternal; },
        set: function (value) { this.dayInternal = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Yearly.prototype, "dayOfWeek", {
        get: function () { return this.dayOfWeekInternal; },
        set: function (value) { this.dayOfWeekInternal = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Yearly.prototype, "dayOfWeekOccurrence", {
        get: function () { return this.dayOfWeekOccurrenceInternal; },
        set: function (value) { this.dayOfWeekOccurrenceInternal = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Yearly.prototype, "calculateByDayOfWeek", {
        get: function () { return this._calculateByDayOfWeek; },
        set: function (value) { this._calculateByDayOfWeek = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Yearly;
}(RecurrenceBase_1.RecurrenceBase));
exports.Yearly = Yearly;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TimeRange_1 = __webpack_require__(30);
var DateTimeUtils_1 = __webpack_require__(3);
var Time_1 = __webpack_require__(29);
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
        for (var i = 0; i < this._workingIntervals.length; i++) {
            this.concatWithIntersectedRanges(this._workingIntervals[i]);
        }
        this.sortIntervals();
    };
    ;
    DayWorkingTimeInfo.prototype.concatWithIntersectedRanges = function (range) {
        var _this = this;
        var intersectedRanges = this.getIntersectedIntervals(range);
        intersectedRanges.forEach(function (r) {
            range.concatWith(r);
            _this.removeInterval(r);
        });
    };
    ;
    DayWorkingTimeInfo.prototype.getIntersectedIntervals = function (range) {
        return this._workingIntervals.filter(function (r) { return r.hasIntersect(range) && r !== range; });
    };
    ;
    DayWorkingTimeInfo.prototype.sortIntervals = function () {
        this._workingIntervals.sort(function (r1, r2) { return DateTimeUtils_1.DateTimeUtils.caclTimeDifference(r2.start, r1.start); });
    };
    ;
    DayWorkingTimeInfo.prototype.removeInterval = function (element) {
        var index = this._workingIntervals.indexOf(element);
        if (index > -1 && index < this._workingIntervals.length)
            this._workingIntervals.splice(index, 1);
    };
    ;
    DayWorkingTimeInfo.prototype.clearIntervals = function () {
        this._workingIntervals.splice(0, this._workingIntervals.length);
    };
    Object.defineProperty(DayWorkingTimeInfo.prototype, "workingIntervals", {
        get: function () { return this._workingIntervals.slice(); },
        enumerable: true,
        configurable: true
    });
    ;
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
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DayWorkingTimeInfo.prototype, "isWorkDay", {
        get: function () { return this._isWorkDay; },
        set: function (value) {
            this._isWorkDay = value;
            if (!value)
                this.clearIntervals();
        },
        enumerable: true,
        configurable: true
    });
    ;
    return DayWorkingTimeInfo;
}());
exports.DayWorkingTimeInfo = DayWorkingTimeInfo;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Margins = (function () {
    function Margins() {
        this.marginLeft = null;
        this.marginTop = null;
        this.marginRight = null;
        this.marginBottom = null;
    }
    return Margins;
}());
exports.Margins = Margins;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EtalonSizeValues = (function () {
    function EtalonSizeValues() {
        this.scaleItemWidths = {};
    }
    return EtalonSizeValues;
}());
exports.EtalonSizeValues = EtalonSizeValues;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DependencyManipulator_1 = __webpack_require__(68);
var ResourcesManipulator_1 = __webpack_require__(69);
var TaskManipulator_1 = __webpack_require__(71);
var ModelManipulator = (function () {
    function ModelManipulator(viewModel, dispatcher) {
        this.task = new TaskManipulator_1.TaskManipulator(viewModel, dispatcher);
        this.dependency = new DependencyManipulator_1.TaskDependencyManipulator(viewModel, dispatcher);
        this.resource = new ResourcesManipulator_1.ResourcesManipulator(viewModel, dispatcher);
    }
    return ModelManipulator;
}());
exports.ModelManipulator = ModelManipulator;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var TaskPropertiesManipulator_1 = __webpack_require__(17);
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
        this.dispatcher.notifyDependencyRemoved(dependency.id, this.getErrorCallback());
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var TaskPropertiesManipulator_1 = __webpack_require__(17);
var ResourcePropertiesManipulator_1 = __webpack_require__(70);
var ResourcesManipulator = (function (_super) {
    tslib_1.__extends(ResourcesManipulator, _super);
    function ResourcesManipulator(viewModel, dispatcher) {
        var _this = _super.call(this, viewModel, dispatcher) || this;
        _this.properties = new ResourcePropertiesManipulator_1.ResourcePropertiesManipulator(viewModel, dispatcher);
        return _this;
    }
    ResourcesManipulator.prototype.create = function (text, id, callback) {
        var resource = this.viewModel.resources.createItem();
        resource.text = text;
        if (id)
            resource.internalId = id;
        resource.id = resource.internalId;
        this.viewModel.resources.add(resource);
        this.dispatcher.notifyResourceCreated(this.getResourceObjectForDataSource(resource), function (id) {
            resource.id = id;
            if (callback)
                callback();
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
        this.dispatcher.notifyResourceRemoved(resource.id, this.getErrorCallback());
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
        this.dispatcher.notifyResourceUnassigned(assignment.id, this.getErrorCallback());
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var TaskPropertiesManipulator_1 = __webpack_require__(17);
var HistoryItemState_1 = __webpack_require__(38);
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var TaskPropertiesManipulator_1 = __webpack_require__(17);
var TaskManipulator = (function (_super) {
    tslib_1.__extends(TaskManipulator, _super);
    function TaskManipulator(viewModel, dispatcher) {
        var _this = _super.call(this, viewModel, dispatcher) || this;
        _this.properties = new TaskPropertiesManipulator_1.TaskPropertiesManipulator(viewModel, dispatcher);
        return _this;
    }
    TaskManipulator.prototype.create = function (start, end, title, parentId, id, callback) {
        var _this = this;
        var task = this.viewModel.tasks.createItem();
        task.start = start;
        task.end = end;
        task.title = title;
        var parentItem = this.viewModel.tasks.getItemById(parentId);
        if (parentItem) {
            parentItem.expanded = true;
        }
        task.parentId = parentId;
        if (id) {
            task.internalId = id;
        }
        task.id = task.internalId;
        this.viewModel.tasks.add(task);
        this.viewModel.updateModel();
        this.dispatcher.notifyTaskCreated(this.getObjectForDataSource(task), function (id) {
            task.id = id;
            if (callback)
                callback();
            if (_this.viewModel.requireFirstLoadParentAutoCalc) {
                var data = _this.viewModel.getCurrentTaskData().map(function (t) {
                    if (t.parentId === "")
                        t.parentId = null;
                    return t;
                });
                _this.dispatcher.notifyParentDataRecalculated(data);
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
        this.dispatcher.notifyTaskRemoved(task.id, this.getErrorCallback());
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HistoryItem_1 = __webpack_require__(10);
var HistoryItemInfo_1 = __webpack_require__(73);
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
        else {
            if (item instanceof HistoryItem_1.CompositionHistoryItem)
                item.undoItemsQuery();
            else
                item.undo();
        }
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MouseHandler_1 = __webpack_require__(75);
var DomUtils_1 = __webpack_require__(1);
var KeyCode_1 = __webpack_require__(80);
var Browser_1 = __webpack_require__(6);
var TouchHandler_1 = __webpack_require__(81);
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
            if (code == (KeyCode_1.ModifierKey.Ctrl | KeyCode_1.KeyCode.Key_z))
                this.control.history.undo();
            if (code == (KeyCode_1.ModifierKey.Ctrl | KeyCode_1.KeyCode.Key_y))
                this.control.history.redo();
            if (code == KeyCode_1.KeyCode.Delete)
                this.control.taskEditController.deleteSelectedDependency();
        }
    };
    EventManager.prototype.getShortcutCode = function (evt) {
        var keyCode = DomUtils_1.DomUtils.GetKeyCode(evt);
        var modifiers = 0;
        if (evt.altKey)
            modifiers |= KeyCode_1.ModifierKey.Alt;
        if (evt.ctrlKey)
            modifiers |= KeyCode_1.ModifierKey.Ctrl;
        if (evt.shiftKey)
            modifiers |= KeyCode_1.ModifierKey.Shift;
        if (evt.metaKey && Browser_1.Browser.MacOSPlatform)
            modifiers |= KeyCode_1.ModifierKey.Meta;
        return modifiers | keyCode;
    };
    return EventManager;
}());
exports.EventManager = EventManager;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HandlerBase_1 = __webpack_require__(39);
var TaskAreaManager_1 = __webpack_require__(7);
var MouseHandlerDefaultState_1 = __webpack_require__(76);
var DomUtils_1 = __webpack_require__(1);
var MouseHandlerMoveTaskState_1 = __webpack_require__(77);
var MouseHandlerProgressTaskState_1 = __webpack_require__(78);
var MouseHandlerTimestampTaskState_1 = __webpack_require__(79);
var MouseHandlerDependencyState_1 = __webpack_require__(40);
var MouseHandler = (function (_super) {
    tslib_1.__extends(MouseHandler, _super);
    function MouseHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandler.prototype.onMouseDoubleClick = function (evt) {
        this.state.onMouseDoubleClick(evt);
    };
    MouseHandler.prototype.onMouseDown = function (evt) {
        var source = this.getEventSource(DomUtils_1.DomUtils.getEventSource(evt));
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var DomUtils_1 = __webpack_require__(1);
var MouseHandlerStateBase_1 = __webpack_require__(24);
var GridLayoutCalculator_1 = __webpack_require__(16);
var Point_1 = __webpack_require__(4);
var Browser_1 = __webpack_require__(6);
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
        var source = DomUtils_1.DomUtils.getEventSource(evt);
        if (DomUtils_1.DomUtils.elementHasCssClass(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL) ||
            DomUtils_1.DomUtils.elementHasCssClass(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_VERTICAL)) {
            var id = source.getAttribute("dependency-id");
            if (this.handler.control.taskEditController.dependencyId != id) {
                this.handler.control.selectDependency(id);
                if (evt instanceof PointerEvent)
                    this.handler.control.ganttOwner.showPopupMenu(new Point_1.Point(DomUtils_1.DomUtils.getEventX(evt), DomUtils_1.DomUtils.getEventY(evt)));
            }
        }
        else {
            if (DomUtils_1.DomUtils.IsLeftButtonPressed(evt))
                this.ganttMovingHelper.startMoving(evt);
            if (this.handler.control.taskEditController.dependencyId != null) {
                this.handler.control.selectDependency(null);
            }
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
                var increase = DomUtils_1.DomUtils.getWheelDelta(evt) > 0;
                var leftPos = DomUtils_1.DomUtils.getEventX(evt) - DomUtils_1.DomUtils.getAbsolutePositionX(this.handler.control.taskAreaContainer.getElement());
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
        var newEventX = Math.round(DomUtils_1.DomUtils.getEventX(e));
        var newEventY = Math.round(DomUtils_1.DomUtils.getEventY(e));
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
            eventX: DomUtils_1.DomUtils.getEventX(e),
            eventY: DomUtils_1.DomUtils.getEventY(e),
            scrollLeft: taskAreaContainer.scrollLeft,
            scrollTop: taskAreaContainer.scrollTop,
            maxLeftDelta: taskAreaContainer.scrollLeft,
            maxRightDelta: taskAreaContainer.scrollWidth - taskAreaContainer.scrollLeft - taskAreaContainer.getElement().offsetWidth,
            maxTopDelta: taskAreaContainer.scrollTop,
            maxBottomDelta: taskAreaContainer.scrollHeight - taskAreaContainer.scrollTop - taskAreaContainer.getElement().offsetHeight
        };
    };
    GanttMovingHelper.prototype.updateGanttAreaCursor = function (drag) {
        if (Browser_1.Browser.IE) {
            this.gantt.taskAreaContainer.getElement().style.cursor = drag ? "move" : "default";
        }
        else {
            this.gantt.taskAreaContainer.getElement().style.cursor = drag ? "grabbing" : "default";
        }
    };
    return GanttMovingHelper;
}());
exports.GanttMovingHelper = GanttMovingHelper;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var MouseHandlerDragTaskBaseState_1 = __webpack_require__(25);
var MouseHandlerMoveTaskState = (function (_super) {
    tslib_1.__extends(MouseHandlerMoveTaskState, _super);
    function MouseHandlerMoveTaskState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerMoveTaskState.prototype.onMouseUpInternal = function (_evt) {
        this.handler.control.taskEditController.confirmMove();
    };
    MouseHandlerMoveTaskState.prototype.onMouseMoveInternal = function (position) {
        this.handler.control.taskEditController.processMove(position.x - this.currentPosition.x);
    };
    return MouseHandlerMoveTaskState;
}(MouseHandlerDragTaskBaseState_1.MouseHandlerDragBaseState));
exports.MouseHandlerMoveTaskState = MouseHandlerMoveTaskState;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var MouseHandlerDragTaskBaseState_1 = __webpack_require__(25);
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var TaskAreaManager_1 = __webpack_require__(7);
var DomUtils_1 = __webpack_require__(1);
var MouseHandlerDragTaskBaseState_1 = __webpack_require__(25);
var MouseHandlerTimestampTaskState = (function (_super) {
    tslib_1.__extends(MouseHandlerTimestampTaskState, _super);
    function MouseHandlerTimestampTaskState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseHandlerTimestampTaskState.prototype.onMouseDown = function (evt) {
        _super.prototype.onMouseDown.call(this, evt);
        this.source = this.handler.getEventSource(DomUtils_1.DomUtils.getEventSource(evt));
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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HandlerBase_1 = __webpack_require__(39);
var DomUtils_1 = __webpack_require__(1);
var TaskAreaManager_1 = __webpack_require__(7);
var TouchHandlerMoveTaskState_1 = __webpack_require__(82);
var TouchHandlerDefaultState_1 = __webpack_require__(83);
var TouchHandlerProgressTaskState_1 = __webpack_require__(84);
var TouchHandlerTimestampTaskState_1 = __webpack_require__(85);
var TouchHandlerDependencyState_1 = __webpack_require__(86);
var TouchHandlerZoomState_1 = __webpack_require__(87);
var TouchHandler = (function (_super) {
    tslib_1.__extends(TouchHandler, _super);
    function TouchHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandler.prototype.onTouchStart = function (evt) {
        if (evt.touches.length > 1)
            evt.preventDefault();
        var source = this.getEventSource(DomUtils_1.DomUtils.getEventSource(evt));
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
        if (evt.touches.length > 1) {
            if (!(this.state instanceof TouchHandlerZoomState_1.TouchHandlerZoomState))
                this.switchState(new TouchHandlerZoomState_1.TouchHandlerZoomState(this));
        }
        this.state.onTouchMove(evt);
    };
    TouchHandler.prototype.switchToDefaultState = function () {
        this.state = new TouchHandlerDefaultState_1.TouchHandlerDefaultState(this);
    };
    return TouchHandler;
}(HandlerBase_1.HandlerBase));
exports.TouchHandler = TouchHandler;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var TouchHandlerDragBaseState_1 = __webpack_require__(26);
var TouchHandlerMoveTaskState = (function (_super) {
    tslib_1.__extends(TouchHandlerMoveTaskState, _super);
    function TouchHandlerMoveTaskState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerMoveTaskState.prototype.onTouchEndInternal = function (_evt) {
        this.handler.control.taskEditController.confirmMove();
    };
    TouchHandlerMoveTaskState.prototype.onTouchMoveInternal = function (position) {
        this.handler.control.taskEditController.processMove(position.x - this.currentPosition.x);
    };
    return TouchHandlerMoveTaskState;
}(TouchHandlerDragBaseState_1.TouchHandlerDragBaseState));
exports.TouchHandlerMoveTaskState = TouchHandlerMoveTaskState;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HandlerStateBase_1 = __webpack_require__(18);
var Point_1 = __webpack_require__(4);
var DomUtils_1 = __webpack_require__(1);
var TouchUIHelper_1 = __webpack_require__(14);
var GridLayoutCalculator_1 = __webpack_require__(16);
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
            var source = DomUtils_1.DomUtils.getEventSource(evt);
            if (DomUtils_1.DomUtils.elementHasCssClass(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_HORIZONTAL) ||
                DomUtils_1.DomUtils.elementHasCssClass(source, GridLayoutCalculator_1.GridLayoutCalculator.CLASSNAMES.CONNECTOR_VERTICAL)) {
                this.preventSelect = true;
                var id = source.getAttribute("dependency-id");
                if (this.handler.control.taskEditController.dependencyId != id)
                    this.handler.control.selectDependency(id);
                this.handler.control.ganttOwner.showPopupMenu(new Point_1.Point(TouchUIHelper_1.TouchUIHelper.getEventX(evt), TouchUIHelper_1.TouchUIHelper.getEventY(evt)));
            }
            else {
                this.popupTimer = setTimeout(function () {
                    _this.changeTaskSelection(_this.getTaskIndex(evt));
                    _this.handler.control.ganttOwner.showPopupMenu(new Point_1.Point(TouchUIHelper_1.TouchUIHelper.getEventX(evt), TouchUIHelper_1.TouchUIHelper.getEventY(evt)));
                }, 500);
            }
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
        var y = TouchUIHelper_1.TouchUIHelper.getEventY(evt);
        var taskAreaY = DomUtils_1.DomUtils.getAbsolutePositionY(this.handler.control.taskArea);
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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var TouchHandlerDragBaseState_1 = __webpack_require__(26);
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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var TouchHandlerDragBaseState_1 = __webpack_require__(26);
var TaskAreaManager_1 = __webpack_require__(7);
var DomUtils_1 = __webpack_require__(1);
var TouchHandlerTimestampTaskState = (function (_super) {
    tslib_1.__extends(TouchHandlerTimestampTaskState, _super);
    function TouchHandlerTimestampTaskState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerTimestampTaskState.prototype.onTouchStart = function (evt) {
        _super.prototype.onTouchStart.call(this, evt);
        this.source = this.handler.getEventSource(DomUtils_1.DomUtils.getEventSource(evt));
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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var TouchHandlerStateBase_1 = __webpack_require__(41);
var TaskAreaManager_1 = __webpack_require__(7);
var DomUtils_1 = __webpack_require__(1);
var Point_1 = __webpack_require__(4);
var MouseHandlerDependencyState_1 = __webpack_require__(40);
var TouchUIHelper_1 = __webpack_require__(14);
var TouchHandlerDependencyState = (function (_super) {
    tslib_1.__extends(TouchHandlerDependencyState, _super);
    function TouchHandlerDependencyState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchHandlerDependencyState.prototype.onTouchStart = function (evt) {
        evt.preventDefault();
        var sourceElement = DomUtils_1.DomUtils.getEventSource(evt);
        this.source = this.handler.getEventSource(sourceElement);
        var pos = this.getRelativePos(new Point_1.Point(DomUtils_1.DomUtils.getAbsolutePositionX(sourceElement) + sourceElement.clientWidth / 2, DomUtils_1.DomUtils.getAbsolutePositionY(sourceElement) + sourceElement.clientHeight / 2));
        this.handler.control.taskEditController.startDependency(pos);
    };
    TouchHandlerDependencyState.prototype.onTouchEnd = function (evt) {
        var relativePosStart = this.getRelativePos(new Point_1.Point(DomUtils_1.DomUtils.getAbsolutePositionX(this.handler.control.taskEditController.dependencySuccessorStart) + this.handler.control.taskEditController.dependencySuccessorStart.clientWidth / 2, DomUtils_1.DomUtils.getAbsolutePositionY(this.handler.control.taskEditController.dependencySuccessorStart) + this.handler.control.taskEditController.dependencySuccessorStart.clientHeight / 2));
        var relativePosEnd = this.getRelativePos(new Point_1.Point(DomUtils_1.DomUtils.getAbsolutePositionX(this.handler.control.taskEditController.dependencySuccessorFinish) + this.handler.control.taskEditController.dependencySuccessorFinish.clientWidth / 2, DomUtils_1.DomUtils.getAbsolutePositionY(this.handler.control.taskEditController.dependencySuccessorFinish) + this.handler.control.taskEditController.dependencySuccessorFinish.clientHeight / 2));
        var relativeTouchPos = this.getRelativePos(new Point_1.Point(TouchUIHelper_1.TouchUIHelper.getEventX(evt), TouchUIHelper_1.TouchUIHelper.getEventY(evt)));
        var target = this.isTouchNearby(relativeTouchPos, relativePosStart) ? TaskAreaManager_1.MouseEventSource.Successor_DependencyStart :
            this.isTouchNearby(relativeTouchPos, relativePosEnd) ? TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish : null;
        var type = target === TaskAreaManager_1.MouseEventSource.Successor_DependencyStart || target == TaskAreaManager_1.MouseEventSource.Successor_DependencyFinish ?
            MouseHandlerDependencyState_1.dependencyMap[this.source][target] : null;
        this.handler.control.taskEditController.endDependency(type);
        this.handler.switchToDefaultState();
    };
    TouchHandlerDependencyState.prototype.onTouchMove = function (evt) {
        evt.preventDefault();
        var relativePos = this.getRelativePos(new Point_1.Point(TouchUIHelper_1.TouchUIHelper.getEventX(evt), TouchUIHelper_1.TouchUIHelper.getEventY(evt)));
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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HandlerStateBase_1 = __webpack_require__(18);
var Point_1 = __webpack_require__(4);
var DomUtils_1 = __webpack_require__(1);
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
        var pt0 = new Point_1.Point(evt.touches[0].clientX, evt.touches[0].clientY);
        var pt1 = new Point_1.Point(evt.touches[1].clientX, evt.touches[1].clientY);
        return this.getDistance(pt0, pt1);
    };
    TouchHandlerZoomState.prototype.getDistance = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    };
    TouchHandlerZoomState.prototype.getMiddleAbsPoint = function (evt) {
        var _this = this;
        return this.getMiddlePointByEvent(evt, function (touch) {
            return new Point_1.Point(touch.pageX - DomUtils_1.DomUtils.getAbsolutePositionX(_this.handler.control.taskAreaContainer.getElement()), touch.pageY - DomUtils_1.DomUtils.getAbsolutePositionY(_this.handler.control.taskAreaContainer.getElement()));
        });
    };
    TouchHandlerZoomState.prototype.getMiddlePointByEvent = function (evt, getPoint) {
        if (evt.touches.length > 1) {
            return new Point_1.Point((getPoint(evt.touches[0]).x + getPoint(evt.touches[1]).x) / 2, (getPoint(evt.touches[0]).y + getPoint(evt.touches[1]).y) / 2);
        }
    };
    return TouchHandlerZoomState;
}(HandlerStateBase_1.HandlerStateBase));
exports.TouchHandlerZoomState = TouchHandlerZoomState;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TaskAreaContainer = (function () {
    function TaskAreaContainer(element, ganttView) {
        this.element = element;
        this.element.addEventListener("scroll", function () { ganttView.updateView(); });
    }
    Object.defineProperty(TaskAreaContainer.prototype, "scrollTop", {
        get: function () {
            return this.element.scrollTop;
        },
        set: function (value) {
            this.element.scrollTop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "scrollLeft", {
        get: function () {
            return this.element.scrollLeft;
        },
        set: function (value) {
            this.element.scrollLeft = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "scrollWidth", {
        get: function () {
            return this.element.scrollWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "scrollHeight", {
        get: function () {
            return this.element.scrollHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskAreaContainer.prototype, "isExternal", {
        get: function () {
            return false;
        },
        enumerable: true,
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
    return TaskAreaContainer;
}());
exports.TaskAreaContainer = TaskAreaContainer;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = __webpack_require__(90);
var ModelChangesDispatcher = (function () {
    function ModelChangesDispatcher() {
        this.onModelChanged = new EventDispatcher_1.EventDispatcher();
        this.isLocked = false;
    }
    ModelChangesDispatcher.prototype.notifyTaskCreated = function (task, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskCreated", task, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyTaskRemoved = function (taskID, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyTaskRemoved", taskID, errorCallback);
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
    ModelChangesDispatcher.prototype.notifyDependencyInserted = function (dependency, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyDependencyInserted", dependency, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyDependencyRemoved = function (dependencyID, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyDependencyRemoved", dependencyID, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceCreated = function (resource, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceCreated", resource, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceRemoved = function (resourceID, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceRemoved", resourceID, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceColorChanged = function (resourceID, newValue, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceColorChanged", resourceID, newValue, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceAssigned = function (assignment, callback, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceAssigned", assignment, callback, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyResourceUnassigned = function (assignmentID, errorCallback) {
        if (!this.isLocked)
            this.onModelChanged.raise("NotifyResourceUnassigned", assignmentID, errorCallback);
    };
    ModelChangesDispatcher.prototype.notifyParentDataRecalculated = function (data) {
        this.onModelChanged.raise("NotifyParentDataRecalculated", data);
    };
    ModelChangesDispatcher.prototype.lock = function () { this.isLocked = true; };
    ModelChangesDispatcher.prototype.unlock = function () { this.isLocked = false; };
    return ModelChangesDispatcher;
}());
exports.ModelChangesDispatcher = ModelChangesDispatcher;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
        for (var i = 0, currentListener; currentListener = this.listeners[i]; i++) {
            if (currentListener === listener) {
                this.listeners.splice(i, 1);
                break;
            }
        }
    };
    EventDispatcher.prototype.raise = function (funcName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0, listener; listener = this.listeners[i]; i++) {
            listener[funcName].apply(listener, args);
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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TaskCommands_1 = __webpack_require__(92);
var TaskPropertiesCommands_1 = __webpack_require__(94);
var DependencyCommands_1 = __webpack_require__(95);
var ResourceCommands_1 = __webpack_require__(96);
var TaskEditDialog_1 = __webpack_require__(97);
var ConstraintViolationDialog_1 = __webpack_require__(42);
var ResourcesDialog_1 = __webpack_require__(98);
var ClientCommand_1 = __webpack_require__(99);
var HistoryCommands_1 = __webpack_require__(100);
var ZoomCommands_1 = __webpack_require__(101);
var FullScreenCommand_1 = __webpack_require__(102);
var CollapseExpandCommands_1 = __webpack_require__(103);
var ConfirmationDialog_1 = __webpack_require__(20);
var ResourcePropertiesCommands_1 = __webpack_require__(104);
var CommandManager = (function () {
    function CommandManager(control) {
        this.control = control;
        this.commands = {};
        this.createCommand(ClientCommand_1.GanttClientCommand.CreateTask, this.createTaskCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.CreateSubTask, this.createSubTaskCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.RemoveTask, this.removeTaskCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.RemoveDependency, this.removeDependencyCommand);
        this.createCommand(ClientCommand_1.GanttClientCommand.TaskInformation, this.showTaskEditDialog);
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "createSubTaskCommand", {
        get: function () { return new TaskCommands_1.CreateSubTaskCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "removeTaskCommand", {
        get: function () { return new TaskCommands_1.RemoveTaskCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskTitleCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskTitleCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskDescriptionCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskDescriptionCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskProgressCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskProgressCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskColorCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskColorCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskStartCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskStartCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "taskMoveCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskMoveCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeTaskEndCommand", {
        get: function () { return new TaskPropertiesCommands_1.TaskEndCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "createDependencyCommand", {
        get: function () { return new DependencyCommands_1.CreateDependencyCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "removeDependencyCommand", {
        get: function () { return new DependencyCommands_1.RemoveDependencyCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "createResourceCommand", {
        get: function () { return new ResourceCommands_1.CreateResourceCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "removeResourceCommand", {
        get: function () { return new ResourceCommands_1.RemoveResourceCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "assignResourceCommand", {
        get: function () { return new ResourceCommands_1.AssignResourceCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "deassignResourceCommand", {
        get: function () { return new ResourceCommands_1.DeassignResourceCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "changeResourceColorCommand", {
        get: function () { return new ResourcePropertiesCommands_1.ResourceColorCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showTaskEditDialog", {
        get: function () { return new TaskEditDialog_1.TaskEditDialogCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showConstraintViolationDialog", {
        get: function () { return new ConstraintViolationDialog_1.ConstraintViolationDialogCommand(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showConfirmationDialog", {
        get: function () { return new ConfirmationDialog_1.ConfirmationDialog(this.control); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandManager.prototype, "showResourcesDialog", {
        get: function () { return new ResourcesDialog_1.ResourcesDialogCommand(this.control); },
        enumerable: true,
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
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(5);
var TaskHistoryItem_1 = __webpack_require__(93);
var TaskDependencyHistoryItem_1 = __webpack_require__(19);
var ResourceHistoryItem_1 = __webpack_require__(27);
var ConfirmationDialog_1 = __webpack_require__(20);
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
    CreateTaskCommand.prototype.execute = function (start, end, title, parentId) {
        return _super.prototype.execute.call(this, start, end, title, parentId);
    };
    CreateTaskCommand.prototype.executeInternal = function (start, end, title, parentId) {
        if (!parentId) {
            var item = this.control.viewModel.findItem(this.control.currentSelectedTaskID);
            var selectedTask = item && item.task;
            if (selectedTask)
                parentId = selectedTask.parentId;
        }
        var referenceItem = this.control.viewModel.findItem(parentId) || this.control.viewModel.items[0];
        var referenceTask = referenceItem && referenceItem.task;
        if (!start)
            start = referenceTask ? new Date(referenceTask.start.getTime()) : new Date(this.control.range.start.getTime());
        if (!end)
            end = referenceTask ? new Date(referenceTask.end.getTime()) : new Date(this.control.range.end.getTime());
        title = title || "New task";
        this.history.addAndRedo(new TaskHistoryItem_1.CreateTaskHistoryItem(this.modelManipulator, start, end, title, parentId));
        return true;
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
            this.history.addAndRedo(new TaskHistoryItem_1.CreateTaskHistoryItem(this.modelManipulator, new Date(selectedItem.task.start.getTime()), new Date(selectedItem.task.end.getTime()), "New task", parentId));
            return true;
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
        else
            return _super.prototype.execute.call(this, id, historyItem);
    };
    RemoveTaskCommand.prototype.executeInternal = function (id, historyItem) {
        var _this = this;
        id = id || this.control.currentSelectedTaskID;
        this.control.viewModel.beginUpdate();
        var removeTaskHistoryItem = historyItem || new TaskHistoryItem_1.RemoveTaskHistoryItem(this.modelManipulator);
        removeTaskHistoryItem.addTask(id);
        var childTasks = this.control.viewModel.tasks.items.filter(function (t) { return t.parentId == id; });
        childTasks.forEach(function (t) { return new RemoveTaskCommand(_this.control).execute(t.internalId, false, removeTaskHistoryItem); });
        var item = this.control.viewModel.findItem(id);
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
        assignments.forEach(function (a) { return removeTaskHistoryItem.add(new ResourceHistoryItem_1.DeassignResourceHistoryItem(_this.modelManipulator, a.internalId)); });
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
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HistoryItem_1 = __webpack_require__(10);
var TaskDependencyHistoryItem_1 = __webpack_require__(19);
var CreateTaskHistoryItem = (function (_super) {
    tslib_1.__extends(CreateTaskHistoryItem, _super);
    function CreateTaskHistoryItem(modelManipulator, start, end, title, parentId) {
        var _this = _super.call(this, modelManipulator) || this;
        _this.start = start;
        _this.end = end;
        _this.title = title;
        _this.parentId = parentId;
        return _this;
    }
    CreateTaskHistoryItem.prototype.redo = function () {
        this.taskId = this.modelManipulator.task.create(this.start, this.end, this.title, this.parentId, this.taskId ? this.taskId : null).internalId;
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
            this.modelManipulator.task.create(task_1.start, task_1.end, task_1.title, task_1.parentId, task_1.internalId, function () {
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
            this.modelManipulator.task.create(task.start, task.end, task.title, task.parentId, task.internalId, function () { });
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
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(5);
var TaskPropertiesHistoryItem_1 = __webpack_require__(28);
var ConstraintViolationDialog_1 = __webpack_require__(42);
var DateRange_1 = __webpack_require__(8);
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
        var oldTitle = this.control.viewModel.tasks.getItemById(id).title;
        if (oldTitle == value)
            return false;
        this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskTitleHistoryItem(this.modelManipulator, id, value));
        return true;
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
        var oldDescription = this.control.viewModel.tasks.getItemById(id).description;
        if (oldDescription == value)
            return false;
        this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskDesriptionHistoryItem(this.modelManipulator, id, value));
        return true;
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
        var oldProgress = this.control.viewModel.tasks.getItemById(id).progress;
        if (oldProgress == value)
            return false;
        this.control.history.beginTransaction();
        this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskProgressHistoryItem(this.modelManipulator, id, value));
        this.validationController.updateParentsIfRequired(id);
        this.control.history.endTransaction();
        return true;
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
        var oldColor = this.control.viewModel.tasks.getItemById(id).color;
        if (oldColor == value)
            return false;
        this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskColorHistoryItem(this.modelManipulator, id, value));
        return true;
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
    ;
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
        return _super.prototype.execute.call(this, id, value);
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
        return _super.prototype.execute.call(this, id, value);
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
        return _super.prototype.execute.call(this, id, start, end);
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
            return prev.end.getTime() > curr.end.getTime() ? prev : curr;
        });
        if (maxEndTask.end > this.control.dataRange.end) {
            this.control.dataRange.end = maxEndTask.end;
            this.control.resetAndUpdate();
        }
        var minStartTask = this.control.viewModel.tasks.items.reduce(function (prev, curr) {
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
        return startErrors.concat(endErrors);
    };
    return TaskMoveCommand;
}(TaskPropertyCommandValidation));
exports.TaskMoveCommand = TaskMoveCommand;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(5);
var TaskDependencyHistoryItem_1 = __webpack_require__(19);
var Dependency_1 = __webpack_require__(12);
var ConfirmationDialog_1 = __webpack_require__(20);
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
        else
            return _super.prototype.execute.call(this, id);
    };
    RemoveDependencyCommand.prototype.executeInternal = function (id) {
        id = id || this.control.taskEditController.dependencyId;
        if (id != null) {
            var dependency = this.control.viewModel.dependencies.items.filter(function (d) { return d.internalId == id; })[0];
            if (dependency) {
                this.history.addAndRedo(new TaskDependencyHistoryItem_1.RemoveDependencyHistoryItem(this.modelManipulator, id));
                if (id === this.control.taskEditController.dependencyId)
                    this.control.taskEditController.selectDependency(null);
                this.control.barManager.updateItemsState([]);
                return true;
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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(5);
var ResourceHistoryItem_1 = __webpack_require__(27);
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
    CreateResourceCommand.prototype.execute = function (text) {
        return _super.prototype.execute.call(this, text);
    };
    CreateResourceCommand.prototype.executeInternal = function (text) {
        this.history.addAndRedo(new ResourceHistoryItem_1.CreateResourceHistoryItem(this.modelManipulator, text));
        return true;
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
            var removeResourceHistoryItem_1 = new ResourceHistoryItem_1.RemoveResourceHistoryItem(this.modelManipulator, id);
            var assignments = this.control.viewModel.assignments.items.filter(function (a) { return a.resourceId == id; });
            assignments.forEach(function (a) { return removeResourceHistoryItem_1.add(new ResourceHistoryItem_1.DeassignResourceHistoryItem(_this.modelManipulator, a.internalId)); });
            this.history.addAndRedo(removeResourceHistoryItem_1);
            return true;
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
            this.history.addAndRedo(new ResourceHistoryItem_1.AssignResourceHistoryItem(this.modelManipulator, resourceId, taskId));
            return true;
        }
        return false;
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
        if (assignment) {
            this.history.addAndRedo(new ResourceHistoryItem_1.DeassignResourceHistoryItem(this.modelManipulator, assignmentId));
            return true;
        }
        return false;
    };
    return DeassignResourceCommand;
}(ResourceCommandBase));
exports.DeassignResourceCommand = DeassignResourceCommand;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var DialogBase_1 = __webpack_require__(21);
var TaskPropertiesHistoryItem_1 = __webpack_require__(28);
var ResourceCollection_1 = __webpack_require__(22);
var ResourceHistoryItem_1 = __webpack_require__(27);
var CommandBase_1 = __webpack_require__(5);
var TaskEditDialogCommand = (function (_super) {
    tslib_1.__extends(TaskEditDialogCommand, _super);
    function TaskEditDialogCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskEditDialogCommand.prototype.applyParameters = function (newParameters, oldParameters) {
        this.history.beginTransaction();
        if (newParameters.title != oldParameters.title)
            this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskTitleHistoryItem(this.modelManipulator, oldParameters.id, newParameters.title));
        if (newParameters.progress != oldParameters.progress)
            this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskProgressHistoryItem(this.modelManipulator, oldParameters.id, newParameters.progress));
        if (newParameters.end.getTime() < newParameters.start.getTime())
            newParameters.end = newParameters.start;
        if (newParameters.start != oldParameters.start) {
            this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskStartHistoryItem(this.modelManipulator, oldParameters.id, newParameters.start));
            if (this.control.settings.validation.validateDependencies)
                this.control.validationController.moveStartDependTasks(oldParameters.id, oldParameters.start);
        }
        if (newParameters.end != oldParameters.end) {
            this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskEndHistoryItem(this.modelManipulator, oldParameters.id, newParameters.end));
            if (this.control.settings.validation.validateDependencies)
                this.control.validationController.moveEndDependTasks(oldParameters.id, oldParameters.end);
        }
        for (var i = 0; i < newParameters.assigned.length; i++) {
            var resource = oldParameters.assigned.getItemById(newParameters.assigned.getItem(i).internalId);
            if (!resource)
                this.history.addAndRedo(new ResourceHistoryItem_1.AssignResourceHistoryItem(this.modelManipulator, newParameters.assigned.getItem(i).internalId, oldParameters.id));
        }
        var _loop_1 = function (i) {
            var assigned = oldParameters.assigned.getItem(i);
            var resource = newParameters.assigned.getItemById(assigned.internalId);
            if (!resource) {
                var assignment = this_1.control.viewModel.assignments.items.filter(function (assignment) { return assignment.resourceId == assigned.internalId && assignment.taskId == oldParameters.id; })[0];
                this_1.history.addAndRedo(new ResourceHistoryItem_1.DeassignResourceHistoryItem(this_1.modelManipulator, assignment.internalId));
            }
        };
        var this_1 = this;
        for (var i = 0; i < oldParameters.assigned.length; i++) {
            _loop_1(i);
        }
        var updateParents = newParameters.start != oldParameters.start || newParameters.end != oldParameters.end || newParameters.progress != oldParameters.progress || newParameters.title != oldParameters.title;
        if (updateParents)
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
        return this.control.viewModel.hasTasks();
    };
    TaskEditDialogCommand.prototype.getState = function () {
        var state = new CommandBase_1.SimpleCommandState(this.isEnabled());
        state.visible = state.enabled && !this.control.taskEditController.dependencyId;
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
        clone.enableEdit = this.enableEdit;
        clone.enableRangeEdit = this.enableRangeEdit;
        return clone;
    };
    return TaskEditParameters;
}(DialogBase_1.DialogParametersBase));
exports.TaskEditParameters = TaskEditParameters;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var DialogBase_1 = __webpack_require__(21);
var ResourceCollection_1 = __webpack_require__(22);
var ConfirmationDialog_1 = __webpack_require__(20);
var ResourcesDialogCommand = (function (_super) {
    tslib_1.__extends(ResourcesDialogCommand, _super);
    function ResourcesDialogCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resourcesForDelete = [];
        return _this;
    }
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
            confirmationDialogParameters.message = this.resourcesForDelete.reduce(function (a, b) { return a.concat([b.text]); }, []).join(", ");
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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
})(GanttClientCommand = exports.GanttClientCommand || (exports.GanttClientCommand = {}));


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(5);
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(5);
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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(5);
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
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(5);
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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var CommandBase_1 = __webpack_require__(5);
var ResourcePropertiesHistoryItem_1 = __webpack_require__(105);
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
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var HistoryItem_1 = __webpack_require__(10);
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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BarManager = (function () {
    function BarManager(control, bars) {
        this.control = control;
        this.bars = bars;
    }
    BarManager.prototype.updateContextMenu = function () {
        for (var i = 0, bar; bar = this.bars[i]; i++) {
            if (bar.isContextMenu()) {
                bar.updateItemsList();
                var commandKeys = bar.getCommandKeys();
                for (var j = 0; j < commandKeys.length; j++) {
                    this.updateBarItem(bar, commandKeys[j]);
                }
            }
        }
    };
    BarManager.prototype.updateItemsState = function (queryCommands) {
        var anyQuerySended = !!queryCommands.length;
        var _loop_1 = function () {
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
        for (var i = 0, bar; bar = this.bars[i]; i++) {
            _loop_1();
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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Dependency_1 = __webpack_require__(12);
var TaskPropertiesHistoryItem_1 = __webpack_require__(28);
var DateRange_1 = __webpack_require__(8);
var DateTimeUtils_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(2);
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationController.prototype, "history", {
        get: function () {
            return this.gantt.history;
        },
        enumerable: true,
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
            if (dep.type == Dependency_1.DependencyType.SF && predecessorTask.start > date || dep.type == Dependency_1.DependencyType.FF && predecessorTask.end > date) {
                result.push(new ValidationError(dep.internalId, true));
            }
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
                if (_this._parentAutoCalc)
                    _this.updateParentsRangeByChild(successorTask.internalId);
                _this.moveStartDependTasks(dep.successorId, rangeBeforeMove.start);
                _this.moveEndDependTasks(dep.successorId, rangeBeforeMove.end);
            }
            if (dep.type == Dependency_1.DependencyType.FF && (successorTask.end < task.end || successorTask.end.valueOf() === previousEndDate.valueOf() && successorTask.end > task.end)) {
                validRange.start.setTime(task.end.getTime() - (successorTask.end.getTime() - successorTask.start.getTime()));
                validRange.end.setTime(task.end.getTime());
                _this.correctMoving(successorTask.internalId, validRange);
                _this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskMoveHistoryItem(_this.gantt.modelManipulator, dep.successorId, validRange));
                if (_this._parentAutoCalc)
                    _this.updateParentsRangeByChild(successorTask.internalId);
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
                if (_this._parentAutoCalc)
                    _this.updateParentsRangeByChild(successorTask.internalId);
                _this.moveStartDependTasks(dep.successorId, rangeBeforeMove.start);
                _this.moveEndDependTasks(dep.successorId, rangeBeforeMove.end);
            }
            if (dep.type == Dependency_1.DependencyType.SS && (successorTask.start < task.start || successorTask.start.valueOf() === previousStartDate.valueOf() && successorTask.start > task.start)) {
                validRange.start.setTime(task.start.getTime());
                validRange.end.setTime(task.start.getTime() + (successorTask.end.getTime() - successorTask.start.getTime()));
                _this.correctMoving(successorTask.internalId, validRange);
                _this.history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskMoveHistoryItem(_this.gantt.modelManipulator, dep.successorId, validRange));
                if (_this._parentAutoCalc)
                    _this.updateParentsRangeByChild(successorTask.internalId);
                _this.moveStartDependTasks(dep.successorId, rangeBeforeMove.start);
                _this.moveEndDependTasks(dep.successorId, rangeBeforeMove.end);
            }
        });
    };
    ValidationController.prototype.correctMoving = function (taskId, dateRange) {
        var _this = this;
        var deltaDate = dateRange.end.getTime() - dateRange.start.getTime();
        var validationErrors = this.checkStartDependencies(taskId, dateRange.start).concat(this.checkEndDependencies(taskId, dateRange.end));
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
            if (!Utils_1.JsonUtils.isExists(data.id))
                return;
            var history = _this.history;
            var manipulator = _this.gantt.modelManipulator;
            if (Utils_1.JsonUtils.isExists(data.start))
                history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskStartHistoryItem(manipulator, data.id, data.start));
            if (Utils_1.JsonUtils.isExists(data.end))
                history.addAndRedo(new TaskPropertiesHistoryItem_1.TaskEndHistoryItem(manipulator, data.id, data.end));
            if (Utils_1.JsonUtils.isExists(data.progress))
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
            this.gantt.dispatcher.notifyParentDataRecalculated(this.viewModel.getCurrentTaskData());
        }
    };
    ValidationController.prototype.correctOnMoving = function (taskId, delta) {
        var _this = this;
        if (this._parentAutoCalc && delta !== 0) {
            this.updateParentsRangeByChild(taskId);
            var changedTasks = [];
            this.updateChildRangeByParent(taskId, delta, changedTasks);
            if (this.gantt.settings.validation.validateDependencies) {
                changedTasks.forEach(function (i) {
                    _this.moveStartDependTasks(i.id, i.start);
                    _this.moveEndDependTasks(i.id, i.end);
                });
            }
            this.gantt.dispatcher.notifyParentDataRecalculated(this.viewModel.getCurrentTaskData());
        }
    };
    Object.defineProperty(ValidationController.prototype, "_parentAutoCalc", {
        get: function () {
            return this.viewModel.parentAutoCalc;
        },
        enumerable: true,
        configurable: true
    });
    return ValidationController;
}());
exports.ValidationController = ValidationController;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Browser_1 = __webpack_require__(6);
var DomUtils_1 = __webpack_require__(1);
var FullScreenModeHelper = (function () {
    function FullScreenModeHelper(gantt) {
        this._isInFullScreenMode = false;
        this.fullScreenTempVars = {};
        this.gantt = gantt;
    }
    Object.defineProperty(FullScreenModeHelper.prototype, "isInFullScreenMode", {
        get: function () { return this._isInFullScreenMode; },
        enumerable: true,
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
        DomUtils_1.DomUtils.changeStyleAttribute(mainElement, Browser_1.Browser.IE ? "borderTopWidth" : "border-top-width", "0px");
        DomUtils_1.DomUtils.changeStyleAttribute(mainElement, Browser_1.Browser.IE ? "borderLeftWidth" : "border-left-width", "0px");
        DomUtils_1.DomUtils.changeStyleAttribute(mainElement, Browser_1.Browser.IE ? "borderRightWidth" : "border-right-width", "0px");
        DomUtils_1.DomUtils.changeStyleAttribute(mainElement, Browser_1.Browser.IE ? "borderBottomWidth" : "border-bottom-width", "0px");
        this.fullScreenTempVars.scrollTop = DomUtils_1.DomUtils.getDocumentScrollTop();
        this.fullScreenTempVars.scrollLeft = DomUtils_1.DomUtils.getDocumentScrollLeft();
        DomUtils_1.DomUtils.changeStyleAttribute(mainElement, "background-color", "white");
        DomUtils_1.DomUtils.changeStyleAttribute(mainElement, "position", "fixed");
        DomUtils_1.DomUtils.changeStyleAttribute(mainElement, "top", "0px");
        DomUtils_1.DomUtils.changeStyleAttribute(mainElement, "left", "0px");
        DomUtils_1.DomUtils.changeStyleAttribute(mainElement, Browser_1.Browser.IE ? "zIndex" : "z-index", 10001);
        DomUtils_1.DomUtils.changeStyleAttribute(document.documentElement, "position", "static");
        DomUtils_1.DomUtils.changeStyleAttribute(document.documentElement, "overflow", "hidden");
        this.fullScreenTempVars.bodyMargin = document.body.style.margin;
        document.body.style.margin = "0";
        this.fullScreenTempVars.width = mainElement.style.width;
        this.fullScreenTempVars.height = mainElement.style.height;
        if (window.self !== window.top)
            this.requestFullScreen(document.body);
    };
    FullScreenModeHelper.prototype.setNormalMode = function () {
        this.cancelFullScreen(document);
        var mainElement = this.getMainElement();
        DomUtils_1.DomUtils.restoreStyleAttribute(mainElement, "left");
        DomUtils_1.DomUtils.restoreStyleAttribute(mainElement, "top");
        DomUtils_1.DomUtils.restoreStyleAttribute(mainElement, "background-color");
        DomUtils_1.DomUtils.restoreStyleAttribute(document.documentElement, "overflow");
        DomUtils_1.DomUtils.restoreStyleAttribute(document.documentElement, "position");
        DomUtils_1.DomUtils.restoreStyleAttribute(mainElement, Browser_1.Browser.IE ? "zIndex" : "z-index");
        document.body.style.margin = this.fullScreenTempVars.bodyMargin;
        DomUtils_1.DomUtils.restoreStyleAttribute(mainElement, "position");
        DomUtils_1.DomUtils.restoreStyleAttribute(mainElement, Browser_1.Browser.IE ? "borderTopWidth" : "border-top-width");
        DomUtils_1.DomUtils.restoreStyleAttribute(mainElement, Browser_1.Browser.IE ? "borderLeftWidth" : "border-left-width");
        DomUtils_1.DomUtils.restoreStyleAttribute(mainElement, Browser_1.Browser.IE ? "borderRightWidth" : "border-right-width");
        DomUtils_1.DomUtils.restoreStyleAttribute(mainElement, Browser_1.Browser.IE ? "borderBottomWidth" : "border-bottom-width");
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
        if (Browser_1.Browser.Firefox && !this.getFullScreenElement(document))
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


/***/ })
/******/ ]);
});