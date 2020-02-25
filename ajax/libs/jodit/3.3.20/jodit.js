/*!
 jodit - Jodit is awesome and usefully wysiwyg editor with filebrowser
 Author: Chupurnov <chupurnov@gmail.com> (https://xdsoft.net/)
 Version: v3.3.20
 Url: https://xdsoft.net/jodit/
 License(s): MIT
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
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
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright 2013-2020 Valeriy Chupurnov https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var consts = __webpack_require__(2);
var helpers_1 = __webpack_require__(3);
var string_1 = __webpack_require__(8);
var Dom = (function () {
    function Dom() {
    }
    Dom.detach = function (node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };
    Dom.unwrap = function (node) {
        var parent = node.parentNode;
        if (parent) {
            while (node.firstChild) {
                parent.insertBefore(node.firstChild, node);
            }
            Dom.safeRemove(node);
        }
    };
    Dom.each = function (elm, callback) {
        var node = elm.firstChild;
        if (node) {
            while (node) {
                var next = Dom.next(node, Boolean, elm);
                if (callback(node) === false) {
                    return false;
                }
                if (node.parentNode && !Dom.each(node, callback)) {
                    return false;
                }
                node = next;
            }
        }
        return true;
    };
    Dom.replace = function (elm, newTagName, create, withAttributes, notMoveContent) {
        if (withAttributes === void 0) { withAttributes = false; }
        if (notMoveContent === void 0) { notMoveContent = false; }
        var tag = helpers_1.isString(newTagName)
            ? create.element(newTagName)
            : newTagName;
        if (!notMoveContent) {
            while (elm.firstChild) {
                tag.appendChild(elm.firstChild);
            }
        }
        if (withAttributes) {
            Array.from(elm.attributes).forEach(function (attr) {
                tag.setAttribute(attr.name, attr.value);
            });
        }
        if (elm.parentNode) {
            elm.parentNode.replaceChild(tag, elm);
        }
        return tag;
    };
    Dom.isEmptyTextNode = function (node) {
        return (Dom.isText(node) &&
            (!node.nodeValue ||
                node.nodeValue.replace(consts.INVISIBLE_SPACE_REG_EXP, '')
                    .length === 0));
    };
    Dom.isEmpty = function (node, condNoEmptyElement) {
        if (condNoEmptyElement === void 0) { condNoEmptyElement = /^(img|svg|canvas|input|textarea|form)$/; }
        if (!node) {
            return true;
        }
        if (Dom.isText(node)) {
            return node.nodeValue === null || string_1.trim(node.nodeValue).length === 0;
        }
        return (!condNoEmptyElement.test(node.nodeName.toLowerCase()) &&
            Dom.each(node, function (elm) {
                if ((Dom.isText(elm) &&
                    elm.nodeValue !== null &&
                    string_1.trim(elm.nodeValue).length !== 0) ||
                    (Dom.isElement(elm) &&
                        condNoEmptyElement.test(elm.nodeName.toLowerCase()))) {
                    return false;
                }
            }));
    };
    Dom.isNode = function (object, win) {
        if (typeof win === 'object' &&
            win &&
            (typeof win.Node === 'function' ||
                typeof win.Node === 'object')) {
            return object instanceof win.Node;
        }
        return false;
    };
    Dom.isCell = function (elm, win) {
        return Dom.isNode(elm, win) && /^(td|th)$/i.test(elm.nodeName);
    };
    Dom.isImage = function (elm, win) {
        return (Dom.isNode(elm, win) &&
            /^(img|svg|picture|canvas)$/i.test(elm.nodeName));
    };
    Dom.isBlock = function (node, win) {
        return (node &&
            typeof node === 'object' &&
            Dom.isNode(node, win) &&
            consts.IS_BLOCK.test(node.nodeName));
    };
    Dom.isText = function (node) {
        return Boolean(node && node.nodeType === Node.TEXT_NODE);
    };
    Dom.isElement = function (node) {
        return Boolean(node && node.nodeType === Node.ELEMENT_NODE);
    };
    Dom.isInlineBlock = function (node) {
        return (Dom.isElement(node) &&
            ['inline', 'inline-block'].indexOf(helpers_1.css(node, 'display').toString()) !== -1);
    };
    Dom.canSplitBlock = function (node, win) {
        return (node &&
            node instanceof win.HTMLElement &&
            Dom.isBlock(node, win) &&
            !/^(TD|TH|CAPTION|FORM)$/.test(node.nodeName) &&
            node.style !== undefined &&
            !/^(fixed|absolute)/i.test(node.style.position));
    };
    Dom.prev = function (node, condition, root, withChild) {
        if (withChild === void 0) { withChild = true; }
        return Dom.find(node, condition, root, false, 'previousSibling', withChild ? 'lastChild' : false);
    };
    Dom.next = function (node, condition, root, withChild) {
        if (withChild === void 0) { withChild = true; }
        return Dom.find(node, condition, root, undefined, undefined, withChild ? 'firstChild' : '');
    };
    Dom.prevWithClass = function (node, className) {
        return Dom.prev(node, function (node) {
            return (Dom.isElement(node) && node.classList.contains(className));
        }, node.parentNode);
    };
    Dom.nextWithClass = function (node, className) {
        return Dom.next(node, function (node) {
            return (Dom.isElement(node) && node.classList.contains(className));
        }, node.parentNode);
    };
    Dom.find = function (node, condition, root, recurse, sibling, child) {
        if (recurse === void 0) { recurse = false; }
        if (sibling === void 0) { sibling = 'nextSibling'; }
        if (child === void 0) { child = 'firstChild'; }
        if (recurse && condition(node)) {
            return node;
        }
        var start = node, next;
        do {
            next = start[sibling];
            if (condition(next)) {
                return next ? next : false;
            }
            if (child && next && next[child]) {
                var nextOne = Dom.find(next[child], condition, next, true, sibling, child);
                if (nextOne) {
                    return nextOne;
                }
            }
            if (!next) {
                next = start.parentNode;
            }
            start = next;
        } while (start && start !== root);
        return false;
    };
    Dom.findWithCurrent = function (node, condition, root, sibling, child) {
        if (sibling === void 0) { sibling = 'nextSibling'; }
        if (child === void 0) { child = 'firstChild'; }
        var next = node;
        do {
            if (condition(next)) {
                return next ? next : false;
            }
            if (child && next && next[child]) {
                var nextOne = Dom.findWithCurrent(next[child], condition, next, sibling, child);
                if (nextOne) {
                    return nextOne;
                }
            }
            while (next && !next[sibling] && next !== root) {
                next = next.parentNode;
            }
            if (next && next[sibling] && next !== root) {
                next = next[sibling];
            }
        } while (next && next !== root);
        return false;
    };
    Dom.up = function (node, condition, root) {
        var start = node;
        if (!node) {
            return false;
        }
        do {
            if (condition(start)) {
                return start;
            }
            if (start === root || !start.parentNode) {
                break;
            }
            start = start.parentNode;
        } while (start && start !== root);
        return false;
    };
    Dom.closest = function (node, tags, root) {
        var condition;
        if (typeof tags === 'function') {
            condition = tags;
        }
        else if (tags instanceof RegExp) {
            condition = function (tag) { return tag && tags.test(tag.nodeName); };
        }
        else {
            condition = function (tag) {
                return tag && new RegExp('^(' + tags + ')$', 'i').test(tag.nodeName);
            };
        }
        return Dom.up(node, condition, root);
    };
    Dom.appendChildFirst = function (root, newElement) {
        var child = root.firstChild;
        if (child) {
            root.insertBefore(newElement, child);
        }
        else {
            root.appendChild(newElement);
        }
    };
    Dom.after = function (elm, newElement) {
        var parentNode = elm.parentNode;
        if (!parentNode) {
            return;
        }
        if (parentNode.lastChild === elm) {
            parentNode.appendChild(newElement);
        }
        else {
            parentNode.insertBefore(newElement, elm.nextSibling);
        }
    };
    Dom.moveContent = function (from, to, inStart) {
        if (inStart === void 0) { inStart = false; }
        var fragment = (from.ownerDocument || document).createDocumentFragment();
        Array.from(from.childNodes).forEach(function (node) {
            fragment.appendChild(node);
        });
        if (!inStart || !to.firstChild) {
            to.appendChild(fragment);
        }
        else {
            to.insertBefore(fragment, to.firstChild);
        }
    };
    Dom.all = function (node, condition, prev) {
        if (prev === void 0) { prev = false; }
        var nodes = node.childNodes
            ? Array.prototype.slice.call(node.childNodes)
            : [];
        if (condition(node)) {
            return node;
        }
        if (prev) {
            nodes = nodes.reverse();
        }
        nodes.forEach(function (child) {
            Dom.all(child, condition, prev);
        });
    };
    Dom.safeRemove = function (node) {
        node && node.parentNode && node.parentNode.removeChild(node);
    };
    Dom.toggleAttribute = function (elm, attr, enable) {
        if (enable !== false) {
            elm.setAttribute(attr, enable.toString());
        }
        else {
            elm.removeAttribute(attr);
        }
    };
    Dom.hide = function (node) {
        if (!node) {
            return;
        }
        helpers_1.dataBind(node, '__old_display', node.style.display);
        node.style.display = 'none';
    };
    Dom.show = function (node) {
        if (!node) {
            return;
        }
        var display = helpers_1.dataBind(node, '__old_display');
        if (node.style.display === 'none') {
            node.style.display = display || '';
        }
    };
    Dom.wrapInline = function (current, tag, editor) {
        var tmp, first = current, last = current;
        var selInfo = editor.selection.save();
        var needFindNext = false;
        do {
            needFindNext = false;
            tmp = first.previousSibling;
            if (tmp && !Dom.isBlock(tmp, editor.editorWindow)) {
                needFindNext = true;
                first = tmp;
            }
        } while (needFindNext);
        do {
            needFindNext = false;
            tmp = last.nextSibling;
            if (tmp && !Dom.isBlock(tmp, editor.editorWindow)) {
                needFindNext = true;
                last = tmp;
            }
        } while (needFindNext);
        var wrapper = typeof tag === 'string' ? editor.create.inside.element(tag) : tag;
        if (first.parentNode) {
            first.parentNode.insertBefore(wrapper, first);
        }
        var next = first;
        while (next) {
            next = first.nextSibling;
            wrapper.appendChild(first);
            if (first === last || !next) {
                break;
            }
            first = next;
        }
        editor.selection.restore(selInfo);
        return wrapper;
    };
    Dom.wrap = function (current, tag, editor) {
        var selInfo = editor.selection.save();
        var wrapper = typeof tag === 'string' ? editor.create.inside.element(tag) : tag;
        if (!current.parentNode) {
            return null;
        }
        current.parentNode.insertBefore(wrapper, current);
        wrapper.appendChild(current);
        editor.selection.restore(selInfo);
        return wrapper;
    };
    Dom.findInline = function (node, toLeft, root) {
        var prevElement = node, nextElement = null;
        do {
            if (prevElement) {
                nextElement = toLeft
                    ? prevElement.previousSibling
                    : prevElement.nextSibling;
                if (!nextElement &&
                    prevElement.parentNode &&
                    prevElement.parentNode !== root &&
                    Dom.isInlineBlock(prevElement.parentNode)) {
                    prevElement = prevElement.parentNode;
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        } while (!nextElement);
        while (nextElement &&
            Dom.isInlineBlock(nextElement) &&
            (!toLeft ? nextElement.firstChild : nextElement.lastChild)) {
            nextElement = !toLeft
                ? nextElement.firstChild
                : nextElement.lastChild;
        }
        return nextElement;
    };
    Dom.contains = function (root, child) {
        while (child.parentNode) {
            if (child.parentNode === root) {
                return true;
            }
            child = child.parentNode;
        }
        return false;
    };
    Dom.isOrContains = function (root, child, onlyContains) {
        if (onlyContains === void 0) { onlyContains = false; }
        return (child &&
            root &&
            ((root === child && !onlyContains) || Dom.contains(root, child)));
    };
    return Dom;
}());
exports.Dom = Dom;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVISIBLE_SPACE = '\uFEFF';
exports.INVISIBLE_SPACE_REG_EXP = /[\uFEFF]/g;
exports.INVISIBLE_SPACE_REG_EXP_END = /[\uFEFF]+$/g;
exports.INVISIBLE_SPACE_REG_EXP_START = /^[\uFEFF]+/g;
exports.SPACE_REG_EXP = /[\s\n\t\r\uFEFF\u200b]+/g;
exports.SPACE_REG_EXP_START = /^[\s\n\t\r\uFEFF\u200b]+/g;
exports.SPACE_REG_EXP_END = /[\s\n\t\r\uFEFF\u200b]+$/g;
exports.IS_BLOCK = /^(PRE|DIV|P|LI|H[1-6]|BLOCKQUOTE|TD|TH|TABLE|BODY|HTML|FIGCAPTION|FIGURE|DT|DD)$/i;
exports.IS_INLINE = /^(STRONG|SPAN|I|EM|B|SUP|SUB)$/i;
exports.MAY_BE_REMOVED_WITH_KEY = /^(IMG|BR|IFRAME|SCRIPT|INPUT|TEXTAREA|HR|JODIT|JODIT-MEDIA)$/i;
exports.KEY_BACKSPACE = 8;
exports.KEY_TAB = 9;
exports.KEY_ENTER = 13;
exports.KEY_ESC = 27;
exports.KEY_LEFT = 37;
exports.KEY_UP = 38;
exports.KEY_RIGHT = 39;
exports.KEY_DOWN = 40;
exports.KEY_DELETE = 46;
exports.KEY_F = 70;
exports.KEY_R = 82;
exports.KEY_H = 72;
exports.KEY_Y = 89;
exports.KEY_V = 86;
exports.KEY_Z = 90;
exports.KEY_F3 = 114;
exports.NEARBY = 5;
exports.ACCURACY = 10;
exports.COMMAND_KEYS = [
    exports.KEY_BACKSPACE,
    exports.KEY_DELETE,
    exports.KEY_UP,
    exports.KEY_DOWN,
    exports.KEY_RIGHT,
    exports.KEY_LEFT,
    exports.KEY_ENTER,
    exports.KEY_ESC,
    exports.KEY_F3,
    exports.KEY_TAB
];
exports.BR = 'br';
exports.PARAGRAPH = 'p';
exports.MODE_WYSIWYG = 1;
exports.MODE_SOURCE = 2;
exports.MODE_SPLIT = 3;
exports.IS_IE = typeof navigator !== 'undefined' &&
    (navigator.userAgent.indexOf('MSIE') !== -1 ||
        /rv:11.0/i.test(navigator.userAgent));
exports.URL_LIST = exports.IS_IE ? 'url' : 'text/uri-list';
exports.TEXT_PLAIN = exports.IS_IE ? 'text' : 'text/plain';
exports.TEXT_HTML = exports.IS_IE ? 'text' : 'text/html';
exports.MARKER_CLASS = 'jodit_selection_marker';
exports.EMULATE_DBLCLICK_TIMEOUT = 300;
exports.JODIT_SELECTED_CELL_MARKER = 'data-jodit-selected-cell';
exports.INSERT_AS_HTML = 'insert_as_html';
exports.INSERT_CLEAR_HTML = 'insert_clear_html';
exports.INSERT_AS_TEXT = 'insert_as_text';
exports.INSERT_ONLY_TEXT = 'insert_only_text';
exports.IS_MAC = typeof window !== 'undefined' &&
    /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
exports.KEY_ALIASES = {
    add: '+',
    break: 'pause',
    cmd: 'meta',
    command: 'meta',
    ctl: 'control',
    ctrl: 'control',
    del: 'delete',
    down: 'arrowdown',
    esc: 'escape',
    ins: 'insert',
    left: 'arrowleft',
    mod: exports.IS_MAC ? 'meta' : 'control',
    opt: 'alt',
    option: 'alt',
    return: 'enter',
    right: 'arrowright',
    space: ' ',
    spacebar: ' ',
    up: 'arrowup',
    win: 'meta',
    windows: 'meta'
};
exports.BASE_PATH = (function () {
    if (typeof document === 'undefined') {
        return '';
    }
    var script = document.currentScript, removeScriptName = function (s) { return s.replace(/\/[^\/]+.js$/, '/'); };
    if (script) {
        return removeScriptName(script.src);
    }
    var scripts = document.querySelectorAll('script[src]');
    if (scripts && scripts.length) {
        return removeScriptName(scripts[scripts.length - 1].src);
    }
    return window.location.href;
})();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(82), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(95), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(8), exports);
tslib_1.__exportStar(__webpack_require__(114), exports);
tslib_1.__exportStar(__webpack_require__(115), exports);
tslib_1.__exportStar(__webpack_require__(116), exports);
tslib_1.__exportStar(__webpack_require__(11), exports);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(117), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(52), exports);
tslib_1.__exportStar(__webpack_require__(118), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(53), exports);
tslib_1.__exportStar(__webpack_require__(55), exports);
tslib_1.__exportStar(__webpack_require__(119), exports);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(120), exports);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var consts = __webpack_require__(2);
var Widget_1 = __webpack_require__(17);
var TabsWidget = Widget_1.Widget.TabsWidget;
var FileSelectorWidget = Widget_1.Widget.FileSelectorWidget;
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var icon_1 = __webpack_require__(5);
var extend_1 = __webpack_require__(14);
var Config = (function () {
    function Config() {
        this.iframe = false;
        this.license = '';
        this.preset = 'custom';
        this.presets = {
            inline: {
                inline: true,
                toolbar: false,
                toolbarInline: true,
                popup: {
                    selection: [
                        'bold',
                        'underline',
                        'italic',
                        'ul',
                        'ol',
                        'outdent',
                        'indent',
                        '\n',
                        'fontsize',
                        'brush',
                        'paragraph',
                        'link',
                        'align',
                        'cut',
                        'dots'
                    ]
                },
                showXPathInStatusbar: false,
                showCharsCounter: false,
                showWordsCounter: false,
                showPlaceholder: false
            }
        };
        this.ownerDocument = (typeof document !== 'undefined'
            ? document
            : null);
        this.ownerWindow = (typeof window !== 'undefined'
            ? window
            : null);
        this.zIndex = 0;
        this.readonly = false;
        this.disabled = false;
        this.activeButtonsInReadOnly = [
            'source',
            'fullsize',
            'print',
            'about',
            'dots',
            'selectall'
        ];
        this.toolbarButtonSize = 'middle';
        this.allowTabNavigation = false;
        this.inline = false;
        this.theme = 'default';
        this.saveModeInStorage = false;
        this.saveHeightInStorage = false;
        this.spellcheck = true;
        this.editorCssClass = false;
        this.style = false;
        this.triggerChangeEvent = true;
        this.width = 'auto';
        this.minWidth = '200px';
        this.maxWidth = '100%';
        this.height = 'auto';
        this.minHeight = 200;
        this.direction = '';
        this.language = 'auto';
        this.debugLanguage = false;
        this.i18n = false;
        this.tabIndex = -1;
        this.toolbar = true;
        this.showTooltip = true;
        this.showTooltipDelay = 300;
        this.useNativeTooltip = false;
        this.enter = consts.PARAGRAPH;
        this.enterBlock = consts.PARAGRAPH;
        this.defaultMode = consts.MODE_WYSIWYG;
        this.useSplitMode = false;
        this.colors = {
            greyscale: [
                '#000000',
                '#434343',
                '#666666',
                '#999999',
                '#B7B7B7',
                '#CCCCCC',
                '#D9D9D9',
                '#EFEFEF',
                '#F3F3F3',
                '#FFFFFF'
            ],
            palette: [
                '#980000',
                '#FF0000',
                '#FF9900',
                '#FFFF00',
                '#00F0F0',
                '#00FFFF',
                '#4A86E8',
                '#0000FF',
                '#9900FF',
                '#FF00FF'
            ],
            full: [
                '#E6B8AF',
                '#F4CCCC',
                '#FCE5CD',
                '#FFF2CC',
                '#D9EAD3',
                '#D0E0E3',
                '#C9DAF8',
                '#CFE2F3',
                '#D9D2E9',
                '#EAD1DC',
                '#DD7E6B',
                '#EA9999',
                '#F9CB9C',
                '#FFE599',
                '#B6D7A8',
                '#A2C4C9',
                '#A4C2F4',
                '#9FC5E8',
                '#B4A7D6',
                '#D5A6BD',
                '#CC4125',
                '#E06666',
                '#F6B26B',
                '#FFD966',
                '#93C47D',
                '#76A5AF',
                '#6D9EEB',
                '#6FA8DC',
                '#8E7CC3',
                '#C27BA0',
                '#A61C00',
                '#CC0000',
                '#E69138',
                '#F1C232',
                '#6AA84F',
                '#45818E',
                '#3C78D8',
                '#3D85C6',
                '#674EA7',
                '#A64D79',
                '#85200C',
                '#990000',
                '#B45F06',
                '#BF9000',
                '#38761D',
                '#134F5C',
                '#1155CC',
                '#0B5394',
                '#351C75',
                '#733554',
                '#5B0F00',
                '#660000',
                '#783F04',
                '#7F6000',
                '#274E13',
                '#0C343D',
                '#1C4587',
                '#073763',
                '#20124D',
                '#4C1130'
            ]
        };
        this.colorPickerDefaultTab = 'background';
        this.imageDefaultWidth = 300;
        this.removeButtons = [];
        this.disablePlugins = [];
        this.extraPlugins = [];
        this.extraButtons = [];
        this.createAttributes = {};
        this.sizeLG = 900;
        this.sizeMD = 700;
        this.sizeSM = 400;
        this.buttons = [
            'source',
            '|',
            'bold',
            'strikethrough',
            'underline',
            'italic',
            'eraser',
            '|',
            'superscript',
            'subscript',
            '|',
            'ul',
            'ol',
            '|',
            'outdent',
            'indent',
            '|',
            'font',
            'fontsize',
            'brush',
            'paragraph',
            '|',
            'image',
            'file',
            'video',
            'table',
            'link',
            '|',
            'align',
            'undo',
            'redo',
            '\n',
            'selectall',
            'cut',
            'copy',
            'paste',
            'copyformat',
            '|',
            'hr',
            'symbol',
            'fullsize',
            'print',
            'about'
        ];
        this.buttonsMD = [
            'source',
            '|',
            'bold',
            'italic',
            '|',
            'ul',
            'ol',
            'eraser',
            '|',
            'font',
            'fontsize',
            'brush',
            'paragraph',
            '|',
            'image',
            'table',
            'link',
            '|',
            'align',
            '|',
            'undo',
            'redo',
            '|',
            'hr',
            'copyformat',
            'fullsize',
            'dots'
        ];
        this.buttonsSM = [
            'source',
            '|',
            'bold',
            'italic',
            '|',
            'ul',
            'ol',
            'eraser',
            '|',
            'fontsize',
            'brush',
            'paragraph',
            '|',
            'image',
            'table',
            'link',
            '|',
            'align',
            '|',
            'undo',
            'redo',
            '|',
            'copyformat',
            'fullsize',
            'dots'
        ];
        this.buttonsXS = [
            'bold',
            'image',
            '|',
            'brush',
            'paragraph',
            'eraser',
            '|',
            'align',
            '|',
            'undo',
            'redo',
            '|',
            'dots'
        ];
        this.events = {};
        this.textIcons = false;
        this.showBrowserColorPicker = false;
    }
    Object.defineProperty(Config, "defaultOptions", {
        get: function () {
            if (!Config.__defaultOptions) {
                Config.__defaultOptions = new Config();
            }
            return Config.__defaultOptions;
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());
exports.Config = Config;
exports.OptionsDefault = function (options, def) {
    var _this = this;
    if (def === void 0) { def = Config.defaultOptions; }
    var self = this;
    self.plainOptions = options;
    if (options !== undefined && typeof options === 'object') {
        var extendKey_1 = function (opt, key) {
            if (key === 'preset') {
                if (def.presets[opt.preset] !== undefined) {
                    var preset = def.presets[opt.preset];
                    Object.keys(preset).forEach(extendKey_1.bind(_this, preset));
                }
            }
            var defValue = def[key], isObject = typeof defValue === 'object' && defValue !== null;
            if (isObject &&
                !['ownerWindow', 'ownerDocument'].includes(key) &&
                !Array.isArray(defValue)) {
                self[key] = extend_1.extend(true, {}, defValue, opt[key]);
            }
            else {
                self[key] = opt[key];
            }
        };
        Object.keys(options).forEach(extendKey_1.bind(this, options));
    }
};
Config.prototype.controls = {
    print: {
        exec: function (editor) {
            var mywindow = window.open('', 'PRINT');
            if (mywindow) {
                if (editor.options.iframe) {
                    editor.events.fire('generateDocumentStructure.iframe', mywindow.document, editor);
                    mywindow.document.body.innerHTML = editor.value;
                }
                else {
                    mywindow.document.write('<!doctype html><html lang="' +
                        helpers_1.defaultLanguage(editor.options.language) +
                        '"><head><title></title></head>' +
                        '<body>' +
                        editor.value +
                        '</body></html>');
                    mywindow.document.close();
                }
                mywindow.focus();
                mywindow.print();
                mywindow.close();
            }
        },
        mode: consts.MODE_SOURCE + consts.MODE_WYSIWYG,
        tooltip: 'Print'
    },
    about: {
        exec: function (editor) {
            var dialog = editor.getInstance('Dialog'), i18n = editor.i18n.bind(editor);
            dialog.setTitle(i18n('About Jodit'));
            dialog.setContent("<div class=\"jodit_about\">\n\t\t\t\t\t<div>" + i18n('Jodit Editor') + " v." + editor.getVersion() + "</div>\n\t\t\t\t\t<div>" + i18n('License: %s', !helpers_1.isLicense(editor.options.license)
                ? 'MIT'
                : helpers_1.normalizeLicense(editor.options.license)) + "</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<a href=\"https://xdsoft.net/jodit/\" target=\"_blank\">http://xdsoft.net/jodit/</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<a href=\"https://xdsoft.net/jodit/doc/\" target=\"_blank\">" + i18n("Jodit User's Guide") + "</a>\n\t\t\t\t\t\t" + i18n('contains detailed help for using') + "\n\t\t\t\t\t</div>\n\t\t\t\t\t<div>" + i18n('Copyright © XDSoft.net - Chupurnov Valeriy. All rights reserved.') + "</div>\n\t\t\t\t</div>");
            dialog.open();
        },
        tooltip: 'About Jodit',
        mode: consts.MODE_SOURCE + consts.MODE_WYSIWYG
    },
    hr: {
        command: 'insertHorizontalRule',
        tags: ['hr'],
        tooltip: 'Insert Horizontal Line'
    },
    image: {
        popup: function (editor, current, self, close) {
            var sourceImage = null;
            if (current &&
                !Dom_1.Dom.isText(current) &&
                (current.tagName === 'IMG' || helpers_1.$$('img', current).length)) {
                sourceImage =
                    current.tagName === 'IMG'
                        ? current
                        : helpers_1.$$('img', current)[0];
            }
            var selInfo = editor.selection.save();
            return FileSelectorWidget(editor, {
                filebrowser: function (data) {
                    editor.selection.restore(selInfo);
                    data.files &&
                        data.files.forEach(function (file) {
                            return editor.selection.insertImage(data.baseurl + file, null, editor.options.imageDefaultWidth);
                        });
                    close();
                },
                upload: true,
                url: function (url, text) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var image;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                editor.selection.restore(selInfo);
                                image = sourceImage || editor.create.inside.element('img');
                                image.setAttribute('src', url);
                                image.setAttribute('alt', text);
                                if (!!sourceImage) return [3, 2];
                                return [4, editor.selection.insertImage(image, null, editor.options.imageDefaultWidth)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                close();
                                return [2];
                        }
                    });
                }); }
            }, sourceImage, close);
        },
        tags: ['img'],
        tooltip: 'Insert Image'
    },
    file: {
        popup: function (editor, current, self, close) {
            var insert = function (url, title) {
                if (title === void 0) { title = ''; }
                editor.selection.insertNode(editor.create.inside.fromHTML("<a href=\"" + url + "\" title=\"" + title + "\">" + (title || url) + "</a>"));
            };
            var sourceAnchor = null;
            if (current &&
                (current.nodeName === 'A' ||
                    Dom_1.Dom.closest(current, 'A', editor.editor))) {
                sourceAnchor =
                    current.nodeName === 'A'
                        ? current
                        : Dom_1.Dom.closest(current, 'A', editor.editor);
            }
            return FileSelectorWidget(editor, {
                filebrowser: function (data) {
                    data.files &&
                        data.files.forEach(function (file) {
                            return insert(data.baseurl + file);
                        });
                    close();
                },
                upload: true,
                url: function (url, text) {
                    if (sourceAnchor) {
                        sourceAnchor.setAttribute('href', url);
                        sourceAnchor.setAttribute('title', text);
                    }
                    else {
                        insert(url, text);
                    }
                    close();
                }
            }, sourceAnchor, close, false);
        },
        tags: ['a'],
        tooltip: 'Insert file'
    },
    video: {
        popup: function (editor, current, control, close) {
            var bylink = editor.create.fromHTML("<form class=\"jodit_form\">\n\t\t\t\t\t<div class=\"jodit jodit_form_group\">\n\t\t\t\t\t\t<input class=\"jodit_input\" required name=\"code\" placeholder=\"http://\" type=\"url\"/>\n\t\t\t\t\t\t<button class=\"jodit_button\" type=\"submit\">" + editor.i18n('Insert') + "</button>\n\t\t\t\t\t</div>\n\t\t\t\t</form>"), bycode = editor.create.fromHTML("<form class=\"jodit_form\">\n\t\t\t\t\t\t\t\t\t<div class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t\t\t<textarea class=\"jodit_textarea\" required name=\"code\" placeholder=\"" + editor.i18n('Embed code') + "\"></textarea>\n\t\t\t\t\t\t\t\t\t\t<button class=\"jodit_button\" type=\"submit\">" + editor.i18n('Insert') + "</button>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</form>"), tab = {}, selinfo = editor.selection.save(), insertCode = function (code) {
                editor.selection.restore(selinfo);
                editor.selection.insertHTML(code);
                close();
            };
            if (editor.options.textIcons) {
                tab[editor.i18n('Link')] = bylink;
                tab[editor.i18n('Code')] = bycode;
            }
            else {
                tab[icon_1.ToolbarIcon.getIcon('link') + '&nbsp;' + editor.i18n('Link')] = bylink;
                tab[icon_1.ToolbarIcon.getIcon('source') +
                    '&nbsp;' +
                    editor.i18n('Code')] = bycode;
            }
            bycode.addEventListener('submit', function (event) {
                event.preventDefault();
                if (!helpers_1.trim(helpers_1.val(bycode, 'textarea[name=code]'))) {
                    bycode.querySelector('textarea[name=code]').focus();
                    bycode.querySelector('textarea[name=code]').classList.add('jodit_error');
                    return false;
                }
                insertCode(helpers_1.val(bycode, 'textarea[name=code]'));
                return false;
            });
            bylink.addEventListener('submit', function (event) {
                event.preventDefault();
                if (!helpers_1.isURL(helpers_1.val(bylink, 'input[name=code]'))) {
                    bylink.querySelector('input[name=code]').focus();
                    bylink.querySelector('input[name=code]').classList.add('jodit_error');
                    return false;
                }
                insertCode(helpers_1.convertMediaURLToVideoEmbed(helpers_1.val(bylink, 'input[name=code]')));
                return false;
            });
            return TabsWidget(editor, tab);
        },
        tags: ['iframe'],
        tooltip: 'Insert youtube/vimeo video'
    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ToolbarIcon = (function () {
    function ToolbarIcon() {
    }
    ToolbarIcon.get = function (name) {
        return ToolbarIcon.icons[name] ||
            ToolbarIcon.icons[name.replace(/-/g, '_')] ||
            ToolbarIcon.icons[name.toLowerCase()];
    };
    ToolbarIcon.exists = function (name) {
        return this.get(name) !== undefined;
    };
    ToolbarIcon.getIcon = function (name, defaultValue) {
        if (defaultValue === void 0) { defaultValue = '<span></span>'; }
        return this.get(name) || defaultValue;
    };
    ToolbarIcon.setIcon = function (name, value) {
        this.icons[name.replace('_', '-')] = value;
    };
    ToolbarIcon.icons = {};
    return ToolbarIcon;
}());
exports.ToolbarIcon = ToolbarIcon;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(7);
var Plugin = (function (_super) {
    tslib_1.__extends(Plugin, _super);
    function Plugin(jodit) {
        var _this = _super.call(this, jodit) || this;
        _this.destruct = _this.destruct.bind(_this, jodit);
        jodit.events
            .on('afterInit', _this.afterInit.bind(_this, jodit))
            .on('beforeDestruct', _this.destruct);
        return _this;
    }
    Plugin.prototype.init = function (jodit) { };
    Plugin.prototype.destruct = function () {
        var _a, _b;
        if (!this.isDestructed) {
            this.setStatus(Component_1.STATUSES.beforeDestruct);
            (_b = (_a = this.jodit) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.off('beforeDestruct', this.destruct);
            this.beforeDestruct(this.jodit);
            _super.prototype.destruct.call(this);
        }
    };
    return Plugin;
}(Component_1.Component));
exports.Plugin = Plugin;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var isJoditObject_1 = __webpack_require__(15);
exports.STATUSES = {
    beforeInit: 0,
    ready: 1,
    beforeDestruct: 2,
    destructed: 3
};
var Component = (function () {
    function Component(jodit) {
        this.__componentStatus = exports.STATUSES.beforeInit;
        if (jodit && jodit instanceof Component) {
            this.jodit = jodit;
            if (isJoditObject_1.isJoditObject(jodit)) {
                jodit.components.add(this);
            }
        }
    }
    Object.defineProperty(Component.prototype, "componentStatus", {
        get: function () {
            return this.__componentStatus;
        },
        set: function (componentStatus) {
            this.__componentStatus = componentStatus;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.setStatus = function (componentStatus) {
        this.__componentStatus = componentStatus;
    };
    Object.defineProperty(Component.prototype, "isReady", {
        get: function () {
            return this.componentStatus === exports.STATUSES.ready;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isDestructed", {
        get: function () {
            return this.componentStatus === exports.STATUSES.destructed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isInDestruct", {
        get: function () {
            return [exports.STATUSES.beforeDestruct, exports.STATUSES.destructed].includes(this.componentStatus);
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.destruct = function () {
        this.setStatus(exports.STATUSES.beforeDestruct);
        if (isJoditObject_1.isJoditObject(this.jodit)) {
            this.jodit.components.delete(this);
        }
        if (this.jodit) {
            this.jodit = undefined;
        }
        this.setStatus(exports.STATUSES.destructed);
    };
    return Component;
}());
exports.Component = Component;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(98), exports);
tslib_1.__exportStar(__webpack_require__(99), exports);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var JoditArray_1 = __webpack_require__(31);
var JoditObject_1 = __webpack_require__(30);
var observer_1 = __webpack_require__(56);
var Selection_1 = __webpack_require__(59);
var StatusBar_1 = __webpack_require__(122);
var storage_1 = __webpack_require__(25);
var viewWithToolbar_1 = __webpack_require__(35);
var PluginSystem_1 = __webpack_require__(65);
var Component_1 = __webpack_require__(7);
var constants_1 = __webpack_require__(2);
var SAFE_COUNT_CHANGE_CALL = 10;
var Jodit = (function (_super) {
    tslib_1.__extends(Jodit, _super);
    function Jodit(element, options) {
        var _this = _super.call(this, undefined, options) || this;
        _this.getEditorText = helpers_1.markDeprecated(function () { return _this.text; }, [
            'getEditorText',
            'text'
        ]);
        _this.__defaultStyleDisplayKey = 'data-jodit-default-style-display';
        _this.__defaultClassesKey = 'data-jodit-default-classes';
        _this.commands = {};
        _this.__selectionLocked = null;
        _this.__wasReadOnly = false;
        _this.storage = storage_1.Storage.makeStorage(true, _this.id);
        _this.editorIsActive = false;
        _this.__mode = consts.MODE_WYSIWYG;
        _this.__callChangeCount = 0;
        _this.elementToPlace = new Map();
        try {
            _this.resolveElement(element);
        }
        catch (e) {
            _this.destruct();
            throw e;
        }
        _this.setStatus(Component_1.STATUSES.beforeInit);
        if (_this.options.events) {
            Object.keys(_this.options.events).forEach(function (key) {
                return _this.events.on(key, _this.options.events[key]);
            });
        }
        _this.events.on(_this.ownerWindow, 'resize', function () {
            if (_this.events) {
                _this.events.fire('resize');
            }
        });
        _this.selection = new Selection_1.Select(_this);
        _this.initPlugins();
        _this.places.length = 0;
        var addPlaceResult = _this.addPlace(element, options);
        Jodit.instances[_this.id] = _this;
        var init = function () {
            if (_this.events) {
                _this.events.fire('afterInit', _this);
            }
            _this.afterInitHook();
            _this.setStatus(Component_1.STATUSES.ready);
            _this.events.fire('afterConstructor', _this);
        };
        if (helpers_1.isPromise(addPlaceResult)) {
            addPlaceResult.finally(init);
        }
        else {
            init();
        }
        return _this;
    }
    Object.defineProperty(Jodit.prototype, "isJodit", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "text", {
        get: function () {
            if (this.editor) {
                return this.editor.innerText || '';
            }
            var div = this.create.inside.div();
            div.innerHTML = this.getElementValue();
            return div.innerText || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "value", {
        get: function () {
            return this.getEditorValue();
        },
        set: function (html) {
            this.setEditorValue(html);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "defaultTimeout", {
        get: function () {
            return this.options && this.options.observer
                ? this.options.observer.timeout
                : Jodit.defaultOptions.observer.timeout;
        },
        enumerable: true,
        configurable: true
    });
    Jodit.Array = function (array) {
        return new JoditArray_1.JoditArray(array);
    };
    Jodit.Object = function (object) {
        return new JoditObject_1.JoditObject(object);
    };
    Jodit.fireEach = function (events) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Object.keys(Jodit.instances).forEach(function (key) {
            var _a;
            var editor = Jodit.instances[key];
            if (!editor.isDestructed && editor.events) {
                (_a = editor.events).fire.apply(_a, tslib_1.__spreadArrays([events], args));
            }
        });
    };
    Jodit.make = function (element, options) {
        return new Jodit(element, options);
    };
    Jodit.prototype.setPlaceField = function (field, value) {
        if (!this.currentPlace) {
            this.currentPlace = {};
            this.places = [this.currentPlace];
        }
        this.currentPlace[field] = value;
    };
    Object.defineProperty(Jodit.prototype, "element", {
        get: function () {
            return this.currentPlace.element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "editor", {
        get: function () {
            return this.currentPlace.editor;
        },
        set: function (editor) {
            this.setPlaceField('editor', editor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "container", {
        get: function () {
            return this.currentPlace.container;
        },
        set: function (container) {
            this.setPlaceField('container', container);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "workplace", {
        get: function () {
            return this.currentPlace.workplace;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "statusbar", {
        get: function () {
            return this.currentPlace.statusbar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "iframe", {
        get: function () {
            return this.currentPlace.iframe;
        },
        set: function (iframe) {
            this.setPlaceField('iframe', iframe);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "observer", {
        get: function () {
            return this.currentPlace.observer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "editorWindow", {
        get: function () {
            return this.currentPlace.editorWindow;
        },
        set: function (win) {
            this.setPlaceField('editorWindow', win);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "editorDocument", {
        get: function () {
            return this.currentPlace.editorWindow.document;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "uploader", {
        get: function () {
            return this.getInstance('Uploader');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "filebrowser", {
        get: function () {
            return this.getInstance('FileBrowser');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Jodit.prototype, "mode", {
        get: function () {
            return this.__mode;
        },
        set: function (mode) {
            this.setMode(mode);
        },
        enumerable: true,
        configurable: true
    });
    Jodit.prototype.getNativeEditorValue = function () {
        var value;
        value = this.events.fire('beforeGetNativeEditorValue');
        if (helpers_1.isString(value)) {
            return value;
        }
        if (this.editor) {
            return this.editor.innerHTML;
        }
        return this.getElementValue();
    };
    Jodit.prototype.setNativeEditorValue = function (value) {
        if (this.events.fire('beforeSetNativeEditorValue', value)) {
            return;
        }
        if (this.editor) {
            this.editor.innerHTML = value;
        }
    };
    Jodit.prototype.getEditorValue = function (removeSelectionMarkers) {
        if (removeSelectionMarkers === void 0) { removeSelectionMarkers = true; }
        var value;
        value = this.events.fire('beforeGetValueFromEditor');
        if (value !== undefined) {
            return value;
        }
        value = this.getNativeEditorValue().replace(consts.INVISIBLE_SPACE_REG_EXP, '');
        if (removeSelectionMarkers) {
            value = value.replace(/<span[^>]+id="jodit_selection_marker_[^>]+><\/span>/g, '');
        }
        if (value === '<br>') {
            value = '';
        }
        var new_value = { value: value };
        this.events.fire('afterGetValueFromEditor', new_value);
        return new_value.value;
    };
    Jodit.prototype.setEditorValue = function (value) {
        var newValue = this.events.fire('beforeSetValueToEditor', value);
        if (newValue === false) {
            return;
        }
        if (typeof newValue === 'string') {
            value = newValue;
        }
        if (!this.editor) {
            if (value !== undefined) {
                this.setElementValue(value);
            }
            return;
        }
        if (typeof value !== 'string' && value !== undefined) {
            throw helpers_1.error('value must be string');
        }
        if (value !== undefined && this.getNativeEditorValue() !== value) {
            this.setNativeEditorValue(value);
        }
        var old_value = this.getElementValue(), new_value = this.getEditorValue();
        if (old_value !== new_value &&
            this.__callChangeCount < SAFE_COUNT_CHANGE_CALL) {
            this.setElementValue(new_value);
            this.__callChangeCount += 1;
            try {
                this.events.fire('change', new_value, old_value);
                this.events.fire(this.observer, 'change', new_value, old_value);
            }
            finally {
                this.__callChangeCount = 0;
            }
        }
    };
    Jodit.prototype.getElementValue = function () {
        return this.element.value !== undefined
            ? this.element.value
            : this.element.innerHTML;
    };
    Jodit.prototype.setElementValue = function (value) {
        if (!helpers_1.isString(value) && value !== undefined) {
            throw helpers_1.error('value must be string');
        }
        if (value !== undefined) {
            if (this.element !== this.container) {
                if (this.element.value !== undefined) {
                    this.element.value = value;
                }
                else {
                    this.element.innerHTML = value;
                }
            }
        }
        else {
            value = this.getElementValue();
        }
        if (value !== this.getEditorValue()) {
            this.setEditorValue(value);
        }
    };
    Jodit.prototype.registerCommand = function (commandNameOriginal, command) {
        var commandName = commandNameOriginal.toLowerCase();
        if (this.commands[commandName] === undefined) {
            this.commands[commandName] = [];
        }
        this.commands[commandName].push(command);
        if (typeof command !== 'function') {
            var hotkeys = this.options.commandToHotkeys[commandName] ||
                this.options.commandToHotkeys[commandNameOriginal] ||
                command.hotkeys;
            if (hotkeys) {
                this.registerHotkeyToCommand(hotkeys, commandName);
            }
        }
        return this;
    };
    Jodit.prototype.registerHotkeyToCommand = function (hotkeys, commandName) {
        var _this = this;
        var shortcuts = helpers_1.asArray(hotkeys)
            .map(helpers_1.normalizeKeyAliases)
            .map(function (hotkey) { return hotkey + '.hotkey'; })
            .join(' ');
        this.events.off(shortcuts).on(shortcuts, function () {
            return _this.execCommand(commandName);
        });
    };
    Jodit.prototype.execCommand = function (command, showUI, value) {
        if (showUI === void 0) { showUI = false; }
        if (value === void 0) { value = null; }
        if (this.options.readonly && command !== 'selectall') {
            return;
        }
        var result;
        command = command.toLowerCase();
        result = this.events.fire('beforeCommand', command, showUI, value);
        if (result !== false) {
            result = this.execCustomCommands(command, showUI, value);
        }
        if (result !== false) {
            this.selection.focus();
            if (command === 'selectall') {
                this.selection.select(this.editor, true);
            }
            else {
                try {
                    result = this.editorDocument.execCommand(command, showUI, value);
                }
                catch (_a) { }
            }
        }
        this.events.fire('afterCommand', command, showUI, value);
        this.setEditorValue();
        return result;
    };
    Jodit.prototype.execCustomCommands = function (commandName, second, third) {
        var _this = this;
        if (second === void 0) { second = false; }
        if (third === void 0) { third = null; }
        commandName = commandName.toLowerCase();
        if (this.commands[commandName] !== undefined) {
            var result_1;
            var exec = function (command) {
                var callback;
                if (typeof command === 'function') {
                    callback = command;
                }
                else {
                    callback = command.exec;
                }
                var resultCurrent = callback.call(_this, commandName, second, third);
                if (resultCurrent !== undefined) {
                    result_1 = resultCurrent;
                }
            };
            for (var i = 0; i < this.commands[commandName].length; i += 1) {
                exec(this.commands[commandName][i]);
            }
            return result_1;
        }
    };
    Jodit.prototype.lock = function (name) {
        if (name === void 0) { name = 'any'; }
        if (_super.prototype.lock.call(this, name)) {
            this.__selectionLocked = this.selection.save();
            this.editor.classList.add('jodit_disabled');
            return true;
        }
        return false;
    };
    Jodit.prototype.unlock = function () {
        if (_super.prototype.unlock.call(this)) {
            this.editor.classList.remove('jodit_disabled');
            if (this.__selectionLocked) {
                this.selection.restore(this.__selectionLocked);
            }
            return true;
        }
        return false;
    };
    Jodit.prototype.getMode = function () {
        return this.mode;
    };
    Jodit.prototype.isEditorMode = function () {
        return this.getRealMode() === consts.MODE_WYSIWYG;
    };
    Jodit.prototype.getRealMode = function () {
        if (this.getMode() !== consts.MODE_SPLIT) {
            return this.getMode();
        }
        var active = this.ownerDocument.activeElement;
        if (active &&
            (Dom_1.Dom.isOrContains(this.editor, active) ||
                Dom_1.Dom.isOrContains(this.toolbar.container, active))) {
            return consts.MODE_WYSIWYG;
        }
        return consts.MODE_SOURCE;
    };
    Jodit.prototype.setMode = function (mode) {
        var _this = this;
        var oldmode = this.getMode();
        var data = {
            mode: parseInt(mode.toString(), 10)
        }, modeClasses = [
            'jodit_wysiwyg_mode',
            'jodit_source_mode',
            'jodit_split_mode'
        ];
        if (this.events.fire('beforeSetMode', data) === false) {
            return;
        }
        this.__mode = helpers_1.inArray(data.mode, [
            consts.MODE_SOURCE,
            consts.MODE_WYSIWYG,
            consts.MODE_SPLIT
        ])
            ? data.mode
            : consts.MODE_WYSIWYG;
        if (this.options.saveModeInStorage) {
            this.storage.set('jodit_default_mode', this.mode);
        }
        modeClasses.forEach(function (className) {
            _this.container.classList.remove(className);
        });
        this.container.classList.add(modeClasses[this.mode - 1]);
        if (oldmode !== this.getMode()) {
            this.events.fire('afterSetMode');
        }
    };
    Jodit.prototype.toggleMode = function () {
        var mode = this.getMode();
        if (helpers_1.inArray(mode + 1, [
            consts.MODE_SOURCE,
            consts.MODE_WYSIWYG,
            this.options.useSplitMode ? consts.MODE_SPLIT : 9
        ])) {
            mode += 1;
        }
        else {
            mode = consts.MODE_WYSIWYG;
        }
        this.setMode(mode);
    };
    Jodit.prototype.setDisabled = function (isDisabled) {
        this.options.disabled = isDisabled;
        var readOnly = this.__wasReadOnly;
        this.setReadOnly(isDisabled || readOnly);
        this.__wasReadOnly = readOnly;
        if (this.editor) {
            this.editor.setAttribute('aria-disabled', isDisabled.toString());
            this.container.classList.toggle('jodit_disabled', isDisabled);
            this.events.fire('disabled', isDisabled);
        }
    };
    Jodit.prototype.getDisabled = function () {
        return this.options.disabled;
    };
    Jodit.prototype.setReadOnly = function (isReadOnly) {
        if (this.__wasReadOnly === isReadOnly) {
            return;
        }
        this.__wasReadOnly = isReadOnly;
        this.options.readonly = isReadOnly;
        if (isReadOnly) {
            this.editor && this.editor.removeAttribute('contenteditable');
        }
        else {
            this.editor && this.editor.setAttribute('contenteditable', 'true');
        }
        this.events && this.events.fire('readonly', isReadOnly);
    };
    Jodit.prototype.getReadOnly = function () {
        return this.options.readonly;
    };
    Jodit.prototype.beforeInitHook = function () {
    };
    Jodit.prototype.afterInitHook = function () {
    };
    Jodit.prototype.initOptions = function (options) {
        this.options = new Config_1.OptionsDefault(options);
    };
    Jodit.prototype.initOwners = function () {
        this.editorWindow = this.options.ownerWindow;
        this.ownerDocument = this.options.ownerDocument;
        this.ownerWindow = this.options.ownerWindow;
    };
    Jodit.prototype.addPlace = function (source, options) {
        var _this = this;
        var element = this.resolveElement(source);
        if (!this.places.length) {
            this.id =
                element.getAttribute('id') || new Date().getTime().toString();
            Jodit.instances[this.id] = this;
        }
        if (element.attributes) {
            Array.from(element.attributes).forEach(function (attr) {
                var name = attr.name;
                var value = attr.value;
                if (Jodit.defaultOptions[name] !== undefined &&
                    (!options || options[name] === undefined)) {
                    if (['readonly', 'disabled'].indexOf(name) !== -1) {
                        value = value === '' || value === 'true';
                    }
                    if (/^[0-9]+(\.)?([0-9]+)?$/.test(value.toString())) {
                        value = Number(value);
                    }
                    _this.options[name] = value;
                }
            });
        }
        var container = this.create.div('jodit_container');
        container.classList.add('jodit_container');
        container.classList.add('jodit_' + (this.options.theme || 'default') + '_theme');
        container.setAttribute('contenteditable', 'false');
        var buffer = null;
        if (this.options.inline) {
            if (['TEXTAREA', 'INPUT'].indexOf(element.nodeName) === -1) {
                container = element;
                element.setAttribute(this.__defaultClassesKey, element.className.toString());
                buffer = container.innerHTML;
                container.innerHTML = '';
            }
            container.classList.add('jodit_inline');
            container.classList.add('jodit_container');
        }
        if (element !== container) {
            if (element.style.display) {
                element.setAttribute(this.__defaultStyleDisplayKey, element.style.display);
            }
            element.style.display = 'none';
        }
        var workplace = this.create.div('jodit_workplace', {
            contenteditable: false
        });
        container.appendChild(workplace);
        var statusbar = new StatusBar_1.StatusBar(this, container);
        if (element.parentNode && element !== container) {
            element.parentNode.insertBefore(container, element);
        }
        var editor = this.create.div('jodit_wysiwyg', {
            contenteditable: true,
            'aria-disabled': false,
            tabindex: this.options.tabIndex
        });
        workplace.appendChild(editor);
        var currentPlace = {
            editor: editor,
            element: element,
            container: container,
            workplace: workplace,
            statusbar: statusbar,
            observer: new observer_1.Observer(this),
            editorWindow: this.ownerWindow
        };
        this.elementToPlace.set(editor, currentPlace);
        this.setCurrentPlace(currentPlace);
        this.places.push(currentPlace);
        this.setNativeEditorValue(this.getElementValue());
        var opt = this.options;
        var initResult = this.initEditor(buffer);
        var init = function () {
            if (opt.enableDragAndDropFileToEditor &&
                opt.uploader &&
                (opt.uploader.url || opt.uploader.insertImageAsBase64URI)) {
                _this.uploader.bind(_this.editor);
            }
            if (!_this.elementToPlace.get(_this.editor)) {
                _this.elementToPlace.set(_this.editor, currentPlace);
            }
            _this.events.fire('afterAddPlace', currentPlace);
        };
        if (helpers_1.isPromise(initResult)) {
            return initResult.then(init);
        }
        init();
    };
    Jodit.prototype.setCurrentPlace = function (place) {
        if (this.currentPlace === place) {
            return;
        }
        if (!this.isEditorMode()) {
            this.setMode(constants_1.MODE_WYSIWYG);
        }
        this.currentPlace = place;
        this.buildToolbar(place.container);
        if (this.isReady) {
            this.events.fire('changePlace', place);
        }
    };
    Jodit.prototype.initPlugins = function () {
        this.beforeInitHook();
        this.events.fire('beforeInit', this);
        try {
            Jodit.plugins.init(this);
        }
        catch (e) {
            console.error(e);
        }
    };
    Jodit.prototype.initEditor = function (buffer) {
        var _this = this;
        var result = this.createEditor();
        var init = function () {
            if (_this.isInDestruct) {
                return;
            }
            if (_this.element !== _this.container) {
                _this.setElementValue();
            }
            else {
                buffer !== null && _this.setEditorValue(buffer);
            }
            var mode = _this.options.defaultMode;
            if (_this.options.saveModeInStorage) {
                var localMode = _this.storage.get('jodit_default_mode');
                if (typeof localMode === 'string') {
                    mode = parseInt(localMode, 10);
                }
            }
            _this.setMode(mode);
            if (_this.options.readonly) {
                _this.__wasReadOnly = false;
                _this.setReadOnly(true);
            }
            if (_this.options.disabled) {
                _this.setDisabled(true);
            }
            try {
                _this.editorDocument.execCommand('defaultParagraphSeparator', false, _this.options.enter.toLowerCase());
            }
            catch (_a) { }
            try {
                _this.editorDocument.execCommand('enableObjectResizing', false, 'false');
            }
            catch (_b) { }
            try {
                _this.editorDocument.execCommand('enableInlineTableEditing', false, 'false');
            }
            catch (_c) { }
        };
        if (helpers_1.isPromise(result)) {
            return result.then(init);
        }
        init();
    };
    Jodit.prototype.createEditor = function () {
        var _this = this;
        var defaultEditorArea = this.editor;
        var stayDefault = this.events.fire('createEditor', this);
        var init = function () {
            if (_this.isInDestruct) {
                return;
            }
            if (stayDefault === false || helpers_1.isPromise(stayDefault)) {
                Dom_1.Dom.safeRemove(defaultEditorArea);
            }
            if (_this.options.editorCssClass) {
                _this.editor.classList.add(_this.options.editorCssClass);
            }
            if (_this.options.style) {
                helpers_1.css(_this.editor, _this.options.style);
            }
            var editor = _this.editor;
            _this.events
                .on('synchro', function () {
                _this.setEditorValue();
            })
                .on('focus', function () {
                _this.editorIsActive = true;
            })
                .on('blur', function () { return (_this.editorIsActive = false); })
                .on(editor, 'mousedown touchstart focus', function () {
                var place = _this.elementToPlace.get(editor);
                if (place) {
                    _this.setCurrentPlace(place);
                }
            })
                .on(editor, 'selectionchange selectionstart keydown keyup keypress dblclick mousedown mouseup ' +
                'click copy cut dragstart drop dragover paste resize touchstart touchend focus blur', function (event) {
                if (_this.options.readonly) {
                    return;
                }
                if (_this.events && _this.events.fire) {
                    if (_this.events.fire(event.type, event) === false) {
                        return false;
                    }
                    _this.setEditorValue();
                }
            });
            if (_this.options.spellcheck) {
                _this.editor.setAttribute('spellcheck', 'true');
            }
            if (_this.options.direction) {
                var direction = _this.options.direction.toLowerCase() === 'rtl'
                    ? 'rtl'
                    : 'ltr';
                _this.editor.style.direction = direction;
                _this.container.style.direction = direction;
                _this.editor.setAttribute('dir', direction);
                _this.container.setAttribute('dir', direction);
                _this.toolbar.setDirection(direction);
            }
            if (_this.options.triggerChangeEvent) {
                _this.events.on('change', _this.async.debounce(function () {
                    _this.events && _this.events.fire(_this.element, 'change');
                }, _this.defaultTimeout));
            }
        };
        if (helpers_1.isPromise(stayDefault)) {
            return stayDefault.then(init);
        }
        init();
    };
    Jodit.prototype.destruct = function () {
        var _this = this;
        if (this.isInDestruct) {
            return;
        }
        this.setStatus(Component_1.STATUSES.beforeDestruct);
        this.async.clear();
        this.elementToPlace.clear();
        if (this.events.fire('beforeDestruct') === false) {
            return;
        }
        if (!this.editor) {
            return;
        }
        var buffer = this.getEditorValue();
        this.storage.clear();
        delete this.storage;
        this.buffer.clear();
        delete this.buffer;
        this.commands = {};
        delete this.selection;
        this.__selectionLocked = null;
        this.events.off(this.ownerWindow, 'resize');
        this.events.off(this.ownerWindow);
        this.events.off(this.ownerDocument);
        this.events.off(this.ownerDocument.body);
        this.components.forEach(function (component) {
            if (helpers_1.isDestructable(component) && !component.isInDestruct) {
                component.destruct();
            }
        });
        this.components.clear();
        this.places.forEach(function (_a) {
            var container = _a.container, workplace = _a.workplace, statusbar = _a.statusbar, element = _a.element, iframe = _a.iframe, editor = _a.editor, observer = _a.observer;
            if (element !== container) {
                if (element.hasAttribute(_this.__defaultStyleDisplayKey)) {
                    var attr = element.getAttribute(_this.__defaultStyleDisplayKey);
                    if (attr) {
                        element.style.display = attr;
                        element.removeAttribute(_this.__defaultStyleDisplayKey);
                    }
                }
                else {
                    element.style.display = '';
                }
            }
            else {
                if (element.hasAttribute(_this.__defaultClassesKey)) {
                    element.className =
                        element.getAttribute(_this.__defaultClassesKey) ||
                            '';
                    element.removeAttribute(_this.__defaultClassesKey);
                }
            }
            if (element.hasAttribute('style') &&
                !element.getAttribute('style')) {
                element.removeAttribute('style');
            }
            !statusbar.isInDestruct && statusbar.destruct();
            _this.events.off(container);
            _this.events.off(element);
            _this.events.off(editor);
            Dom_1.Dom.safeRemove(workplace);
            Dom_1.Dom.safeRemove(editor);
            if (container !== element) {
                Dom_1.Dom.safeRemove(container);
            }
            Dom_1.Dom.safeRemove(iframe);
            if (container === element) {
                element.innerHTML = buffer;
            }
            !observer.isInDestruct && observer.destruct();
        });
        this.places.length = 0;
        this.currentPlace = {};
        delete Jodit.instances[this.id];
        _super.prototype.destruct.call(this);
    };
    Jodit.plugins = new PluginSystem_1.PluginSystem();
    Jodit.modules = {};
    Jodit.instances = {};
    Jodit.lang = {};
    return Jodit;
}(viewWithToolbar_1.ViewWithToolbar));
exports.Jodit = Jodit;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(2);
var checker_1 = __webpack_require__(12);
var temp = 1;
var $$temp = function () {
    temp++;
    return temp;
};
exports.$$ = function (selector, root) {
    var result;
    if (/:scope/.test(selector) &&
        constants_1.IS_IE &&
        !(root && root.nodeType === Node.DOCUMENT_NODE)) {
        var id = root.id, temp_id = id ||
            '_selector_id_' + ('' + Math.random()).slice(2) + $$temp();
        selector = selector.replace(/:scope/g, '#' + temp_id);
        !id && root.setAttribute('id', temp_id);
        result = root.parentNode.querySelectorAll(selector);
        if (!id) {
            root.removeAttribute('id');
        }
    }
    else {
        result = root.querySelectorAll(selector);
    }
    return [].slice.call(result);
};
exports.getXPathByElement = function (element, root) {
    if (!element || element.nodeType !== 1) {
        return '';
    }
    if (!element.parentNode || root === element) {
        return '';
    }
    if (element.id) {
        return "//*[@id='" + element.id + "']";
    }
    var sames = [].filter.call(element.parentNode.childNodes, function (x) { return x.nodeName === element.nodeName; });
    return (exports.getXPathByElement(element.parentNode, root) +
        '/' +
        element.nodeName.toLowerCase() +
        (sames.length > 1
            ? '[' + (Array.from(sames).indexOf(element) + 1) + ']'
            : ''));
};
exports.refs = function (root) {
    return exports.$$('[ref]', root).reduce(function (def, child) {
        var key = child.getAttribute('ref');
        if (key && checker_1.isString(key)) {
            def[key] = child;
        }
        return def;
    }, {});
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var isPlainObject_1 = __webpack_require__(22);
var isNumeric_1 = __webpack_require__(23);
var normilizeCSSValue_1 = __webpack_require__(51);
var camelCase_1 = __webpack_require__(48);
var fromCamelCase_1 = __webpack_require__(49);
exports.css = function (element, key, value, onlyStyleMode) {
    if (onlyStyleMode === void 0) { onlyStyleMode = false; }
    var numberFieldsReg = /^left|top|bottom|right|width|min|max|height|margin|padding|font-size/i;
    if (isPlainObject_1.isPlainObject(key) || value !== undefined) {
        var setValue = function (elm, _key, _value) {
            if (_value !== undefined &&
                _value !== null &&
                numberFieldsReg.test(_key) &&
                isNumeric_1.isNumeric(_value.toString())) {
                _value = parseInt(_value.toString(), 10) + 'px';
            }
            if (_value !== undefined &&
                exports.css(elm, _key, undefined, true) !== normilizeCSSValue_1.normilizeCSSValue(_key, _value)) {
                elm.style[_key] = _value;
            }
        };
        if (isPlainObject_1.isPlainObject(key)) {
            var keys = Object.keys(key);
            for (var j = 0; j < keys.length; j += 1) {
                setValue(element, camelCase_1.camelCase(keys[j]), key[keys[j]]);
            }
        }
        else {
            setValue(element, camelCase_1.camelCase(key), value);
        }
        return '';
    }
    var key2 = fromCamelCase_1.fromCamelCase(key), doc = element.ownerDocument || document, win = doc ? doc.defaultView || doc.parentWindow : false;
    var currentValue = element.style[key];
    var result = '';
    if (currentValue !== undefined && currentValue !== '') {
        result = currentValue;
    }
    else if (win && !onlyStyleMode) {
        result = win.getComputedStyle(element).getPropertyValue(key2);
    }
    if (numberFieldsReg.test(key) &&
        /^[\-+]?[0-9.]+px$/.test(result.toString())) {
        result = parseInt(result.toString(), 10);
    }
    return normilizeCSSValue_1.normilizeCSSValue(key, result);
};
exports.clearCenterAlign = function (image) {
    if (exports.css(image, 'display') === 'block') {
        exports.css(image, 'display', '');
    }
    if (image.style.marginLeft === 'auto' &&
        image.style.marginRight === 'auto') {
        image.style.marginLeft = '';
        image.style.marginRight = '';
    }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(87), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(88), exports);
tslib_1.__exportStar(__webpack_require__(89), exports);
tslib_1.__exportStar(__webpack_require__(90), exports);
tslib_1.__exportStar(__webpack_require__(91), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(92), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(93), exports);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(94), exports);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var dialog_1 = __webpack_require__(16);
exports.Dialog = dialog_1.Dialog;
var alert_1 = __webpack_require__(197);
exports.Alert = alert_1.Alert;
var promt_1 = __webpack_require__(71);
exports.Promt = promt_1.Promt;
var confirm_1 = __webpack_require__(72);
exports.Confirm = confirm_1.Confirm;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var JoditObject_1 = __webpack_require__(30);
var JoditArray_1 = __webpack_require__(31);
var type_1 = __webpack_require__(32);
var isPlainObject_1 = __webpack_require__(22);
function extend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var length = args.length;
    var options, name, src, copy, copyIsArray, clone, target = args[0] || {}, i = 1, j, keys, deep = false;
    if (typeof target === 'boolean') {
        deep = target;
        target = args[i] || {};
        i += 1;
    }
    if (typeof target !== 'object' && type_1.type(target) === 'function') {
        target = {};
    }
    if (i === length) {
        target = this;
        i += 1;
    }
    for (i; i < length; i += 1) {
        options = args[i];
        if (options !== null && options !== undefined) {
            keys = Object.keys(options);
            for (j = 0; j < keys.length; j += 1) {
                name = keys[j];
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                if (deep &&
                    copy &&
                    ((isPlainObject_1.isPlainObject(copy) && !(copy instanceof JoditObject_1.JoditObject)) ||
                        (Array.isArray(copy) && !(copy instanceof JoditArray_1.JoditArray)))) {
                    copyIsArray = Array.isArray(copy);
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && isPlainObject_1.isPlainObject(src) ? src : {};
                    }
                    target[name] = extend(deep, clone, copy);
                }
                else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
}
exports.extend = extend;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJoditObject = function (jodit) {
    if (jodit &&
        jodit instanceof Object &&
        typeof jodit.constructor === 'function' &&
        (jodit instanceof Jodit_1.Jodit || jodit.isJodit)) {
        return true;
    }
    return false;
};
var Jodit_1 = __webpack_require__(9);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var helpers_1 = __webpack_require__(3);
var viewWithToolbar_1 = __webpack_require__(35);
var Dom_1 = __webpack_require__(1);
Config_1.Config.prototype.dialog = {
    extraButtons: [],
    resizable: true,
    draggable: true,
    buttons: ['dialog.close'],
    removeButtons: []
};
Config_1.Config.prototype.controls.dialog = {
    close: {
        icon: 'cancel',
        exec: function (dialog) {
            dialog.close();
        }
    },
    fullsize: {
        icon: 'fullsize',
        getLabel: function (editor, btn, button) {
            if (Config_1.Config.prototype.controls.fullsize &&
                Config_1.Config.prototype.controls.fullsize.getLabel &&
                typeof Config_1.Config.prototype.controls.fullsize.getLabel ===
                    'function') {
                return Config_1.Config.prototype.controls.fullsize.getLabel(editor, btn, button);
            }
            return;
        },
        exec: function (dialog) {
            dialog.toggleFullSize();
        }
    }
};
var Dialog = (function (_super) {
    tslib_1.__extends(Dialog, _super);
    function Dialog(jodit, options) {
        if (options === void 0) { options = Config_1.Config.prototype.dialog; }
        var _this = _super.call(this, jodit, options) || this;
        _this.destination = document.body;
        _this.destroyAfterClose = false;
        _this.moved = false;
        _this.iSetMaximization = false;
        _this.resizable = false;
        _this.draggable = false;
        _this.startX = 0;
        _this.startY = 0;
        _this.startPoint = { x: 0, y: 0, w: 0, h: 0 };
        _this.lockSelect = function () {
            _this.container.classList.add('jodit_dialog_box-moved');
        };
        _this.unlockSelect = function () {
            _this.container.classList.remove('jodit_dialog_box-moved');
        };
        _this.onMouseUp = function () {
            if (_this.draggable || _this.resizable) {
                _this.draggable = false;
                _this.resizable = false;
                _this.unlockSelect();
                if (_this.jodit && _this.jodit.events) {
                    _this.jodit.events.fire(_this, 'endResize endMove');
                }
            }
        };
        _this.onHeaderMouseDown = function (e) {
            var target = e.target;
            if (!_this.options.draggable ||
                (target && target.nodeName.match(/^(INPUT|SELECT)$/))) {
                return;
            }
            _this.draggable = true;
            _this.startX = e.clientX;
            _this.startY = e.clientY;
            _this.startPoint.x = helpers_1.css(_this.dialog, 'left');
            _this.startPoint.y = helpers_1.css(_this.dialog, 'top');
            _this.setMaxZIndex();
            e.preventDefault();
            _this.lockSelect();
            if (_this.jodit && _this.jodit.events) {
                _this.jodit.events.fire(_this, 'startMove');
            }
        };
        _this.onMouseMove = function (e) {
            if (_this.draggable && _this.options.draggable) {
                _this.setPosition(_this.startPoint.x + e.clientX - _this.startX, _this.startPoint.y + e.clientY - _this.startY);
                if (_this.jodit && _this.jodit.events) {
                    _this.jodit.events.fire(_this, 'move', e.clientX - _this.startX, e.clientY - _this.startY);
                }
                e.stopImmediatePropagation();
                e.preventDefault();
            }
            if (_this.resizable && _this.options.resizable) {
                _this.setSize(_this.startPoint.w + e.clientX - _this.startX, _this.startPoint.h + e.clientY - _this.startY);
                if (_this.jodit && _this.jodit.events) {
                    _this.jodit.events.fire(_this, 'resizeDialog', e.clientX - _this.startX, e.clientY - _this.startY);
                }
                e.stopImmediatePropagation();
                e.preventDefault();
            }
        };
        _this.onKeyDown = function (e) {
            if (_this.isOpened() && e.which === constants_1.KEY_ESC) {
                var me = _this.getMaxZIndexDialog();
                if (me) {
                    me.close();
                }
                else {
                    _this.close();
                }
                e.stopImmediatePropagation();
            }
        };
        _this.onResize = function () {
            if (_this.options &&
                _this.options.resizable &&
                !_this.moved &&
                _this.isOpened() &&
                !_this.offsetX &&
                !_this.offsetY) {
                _this.setPosition();
            }
        };
        _this.document = document;
        _this.window = window;
        _this.close = function (e) {
            var _a, _b, _c, _d;
            if (_this.isDestructed) {
                return;
            }
            if (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
            }
            if (_this.jodit && _this.jodit.events) {
                _this.jodit.events.fire('beforeClose', _this);
            }
            _this.container &&
                _this.container.classList &&
                _this.container.classList.remove('active');
            if (_this.iSetMaximization) {
                _this.maximization(false);
            }
            if (_this.destroyAfterClose) {
                _this.destruct();
            }
            (_b = (_a = _this.jodit) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.fire(_this, 'afterClose');
            (_d = (_c = _this.jodit) === null || _c === void 0 ? void 0 : _c.events) === null || _d === void 0 ? void 0 : _d.fire(_this.ownerWindow, 'jodit_close_dialog');
        };
        if (helpers_1.isJoditObject(jodit)) {
            _this.window = jodit.ownerWindow;
            _this.document = jodit.ownerDocument;
            jodit.events.on('beforeDestruct', function () {
                _this.destruct();
            });
        }
        var self = _this;
        var opt = jodit && jodit.options
            ? jodit.options.dialog
            : Config_1.Config.prototype.dialog;
        self.options = tslib_1.__assign(tslib_1.__assign({}, opt), self.options);
        Dom_1.Dom.safeRemove(self.container);
        self.container = _this.create.fromHTML('<div style="z-index:' +
            self.options.zIndex +
            '" class="jodit jodit_dialog_box">' +
            '<div class="jodit_dialog_overlay"></div>' +
            '<div class="jodit_dialog">' +
            '<div class="jodit_dialog_header non-selected">' +
            '<div class="jodit_dialog_header-title"></div>' +
            '<div class="jodit_dialog_header-toolbar"></div>' +
            '</div>' +
            '<div class="jodit_dialog_content"></div>' +
            '<div class="jodit_dialog_footer"></div>' +
            (self.options.resizable
                ? '<div class="jodit_dialog_resizer"></div>'
                : '') +
            '</div>' +
            '</div>');
        if (jodit && jodit.options.theme) {
            self.container.classList.add('jodit_' + (jodit.options.theme || 'default') + '_theme');
        }
        if (jodit && jodit.id) {
            jodit.markOwner(self.container);
        }
        Object.defineProperty(self.container, '__jodit_dialog', {
            value: self
        });
        self.dialog = self.container.querySelector('.jodit_dialog');
        self.resizer = self.container.querySelector('.jodit_dialog_resizer');
        if (self.jodit && self.jodit.options && self.jodit.options.textIcons) {
            self.container.classList.add('jodit_text_icons');
        }
        self.dialogbox_header = self.container.querySelector('.jodit_dialog_header>.jodit_dialog_header-title');
        self.dialogbox_content = self.container.querySelector('.jodit_dialog_content');
        self.dialogbox_footer = self.container.querySelector('.jodit_dialog_footer');
        self.dialogbox_toolbar = self.container.querySelector('.jodit_dialog_header>.jodit_dialog_header-toolbar');
        self.destination.appendChild(self.container);
        self.container.addEventListener('close_dialog', self.close);
        self.toolbar.build(self.options.buttons, self.dialogbox_toolbar);
        self.events
            .on(_this.window, 'mousemove', self.onMouseMove)
            .on(_this.window, 'mouseup', self.onMouseUp)
            .on(_this.window, 'keydown', self.onKeyDown)
            .on(_this.window, 'resize', self.onResize);
        var headerBox = self.container.querySelector('.jodit_dialog_header');
        headerBox &&
            headerBox.addEventListener('mousedown', self.onHeaderMouseDown.bind(self));
        if (self.options.resizable) {
            self.resizer.addEventListener('mousedown', self.onResizerMouseDown.bind(self));
        }
        plugins_1.fullsize(self);
        return _this;
    }
    Dialog.prototype.setElements = function (root, elements) {
        var _this = this;
        var elements_list = [];
        helpers_1.asArray(elements).forEach(function (elm) {
            if (Array.isArray(elm)) {
                var div = _this.create.div('jodit_dialog_column');
                elements_list.push(div);
                root.appendChild(div);
                return _this.setElements(div, elm);
            }
            var element = typeof elm === 'string' ? _this.create.fromHTML(elm) : elm;
            elements_list.push(element);
            if (element.parentNode !== root) {
                root.appendChild(element);
            }
        });
        Array.from(root.childNodes).forEach(function (elm) {
            if (elements_list.indexOf(elm) === -1) {
                root.removeChild(elm);
            }
        });
    };
    Dialog.prototype.onResizerMouseDown = function (e) {
        this.resizable = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startPoint.w = this.dialog.offsetWidth;
        this.startPoint.h = this.dialog.offsetHeight;
        this.lockSelect();
        if (this.jodit.events) {
            this.jodit.events.fire(this, 'startResize');
        }
    };
    Dialog.prototype.setSize = function (w, h) {
        if (w) {
            helpers_1.css(this.dialog, 'width', w);
        }
        if (h) {
            helpers_1.css(this.dialog, 'height', h);
        }
    };
    Dialog.prototype.setPosition = function (x, y) {
        var w = this.window.innerWidth, h = this.window.innerHeight;
        var left = w / 2 - this.dialog.offsetWidth / 2, top = h / 2 - this.dialog.offsetHeight / 2;
        if (left < 0) {
            left = 0;
        }
        if (top < 0) {
            top = 0;
        }
        if (x !== undefined && y !== undefined) {
            this.offsetX = x;
            this.offsetY = y;
            this.moved = Math.abs(x - left) > 100 || Math.abs(y - top) > 100;
        }
        this.dialog.style.left = (x || left) + 'px';
        this.dialog.style.top = (y || top) + 'px';
    };
    Dialog.prototype.setTitle = function (content) {
        this.setElements(this.dialogbox_header, content);
    };
    Dialog.prototype.setContent = function (content) {
        this.setElements(this.dialogbox_content, content);
    };
    Dialog.prototype.setFooter = function (content) {
        this.setElements(this.dialogbox_footer, content);
        this.dialog.classList.toggle('with_footer', !!content);
    };
    Dialog.prototype.getZIndex = function () {
        return parseInt(this.container.style.zIndex || '0', 10);
    };
    Dialog.prototype.getMaxZIndexDialog = function () {
        var maxzi = 0, dlg, zIndex, res = this;
        helpers_1.$$('.jodit_dialog_box', this.destination).forEach(function (dialog) {
            dlg = dialog.__jodit_dialog;
            zIndex = parseInt(helpers_1.css(dialog, 'zIndex'), 10);
            if (dlg.isOpened() && !isNaN(zIndex) && zIndex > maxzi) {
                res = dlg;
                maxzi = zIndex;
            }
        });
        return res;
    };
    Dialog.prototype.setMaxZIndex = function () {
        var maxzi = 0, zIndex = 0;
        helpers_1.$$('.jodit_dialog_box', this.destination).forEach(function (dialog) {
            zIndex = parseInt(helpers_1.css(dialog, 'zIndex'), 10);
            maxzi = Math.max(isNaN(zIndex) ? 0 : zIndex, maxzi);
        });
        this.container.style.zIndex = (maxzi + 1).toString();
    };
    Dialog.prototype.maximization = function (condition) {
        if (typeof condition !== 'boolean') {
            condition = !this.container.classList.contains('jodit_dialog_box-fullsize');
        }
        this.container.classList.toggle('jodit_dialog_box-fullsize', condition);
        [this.destination, this.destination.parentNode].forEach(function (box) {
            box &&
                box.classList &&
                box.classList.toggle('jodit_fullsize_box', condition);
        });
        this.iSetMaximization = condition;
        return condition;
    };
    Dialog.prototype.open = function (content, title, destroyAfter, modal) {
        if (this.jodit && this.jodit.events) {
            if (this.jodit.events.fire(this, 'beforeOpen') === false) {
                return;
            }
        }
        this.destroyAfterClose = destroyAfter === true;
        if (title !== undefined) {
            this.setTitle(title);
        }
        if (content) {
            this.setContent(content);
        }
        this.container.classList.add('active');
        if (modal) {
            this.container.classList.add('jodit_modal');
        }
        this.setPosition(this.offsetX, this.offsetY);
        this.setMaxZIndex();
        if (this.options.fullsize) {
            this.maximization(true);
        }
        if (this.jodit && this.jodit.events) {
            this.jodit.events.fire('afterOpen', this);
        }
    };
    Dialog.prototype.isOpened = function () {
        return (!this.isDestructed &&
            this.container &&
            this.container.classList.contains('active'));
    };
    Dialog.prototype.destruct = function () {
        if (this.isInDestruct) {
            return;
        }
        this.setStatus(Component_1.STATUSES.beforeDestruct);
        if (this.events) {
            this.events
                .off(this.window, 'mousemove', this.onMouseMove)
                .off(this.window, 'mouseup', this.onMouseUp)
                .off(this.window, 'keydown', this.onKeyDown)
                .off(this.window, 'resize', this.onResize);
        }
        _super.prototype.destruct.call(this);
    };
    return Dialog;
}(viewWithToolbar_1.ViewWithToolbar));
exports.Dialog = Dialog;
var plugins_1 = __webpack_require__(66);
var Component_1 = __webpack_require__(7);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var icon_1 = __webpack_require__(5);
var Widget;
(function (Widget) {
    Widget.ColorPickerWidget = function (editor, callback, coldColor) {
        var valueHex = helpers_1.normalizeColor(coldColor), form = editor.create.div('jodit_colorpicker'), iconEye = editor.options.textIcons
            ? ''
            : icon_1.ToolbarIcon.getIcon('eye'), iconEraser = editor.options.textIcons
            ? "<span>" + editor.i18n('eraser') + "</span>"
            : icon_1.ToolbarIcon.getIcon('eraser'), iconPalette = editor.options.textIcons
            ? "<span>" + editor.i18n('palette') + "</span>"
            : icon_1.ToolbarIcon.getIcon('palette'), setColor = function (target, color) {
            target.innerHTML = icon_1.ToolbarIcon.getIcon('eye');
            target.classList.add('active');
            var colorRGB = helpers_1.hexToRgb(color);
            if (colorRGB) {
                target.firstChild.style.fill =
                    'rgb(' +
                        (255 - colorRGB.r) +
                        ',' +
                        (255 - colorRGB.g) +
                        ',' +
                        (255 - colorRGB.b) +
                        ')';
            }
        }, eachColor = function (colors) {
            var stack = [];
            if (helpers_1.isPlainObject(colors)) {
                Object.keys(colors).forEach(function (key) {
                    stack.push('<div class="jodit_colorpicker_group jodit_colorpicker_group-' +
                        key +
                        '">');
                    stack.push(eachColor(colors[key]));
                    stack.push('</div>');
                });
            }
            else if (Array.isArray(colors)) {
                colors.forEach(function (color) {
                    stack.push('<a ' +
                        (valueHex === color ? ' class="active" ' : '') +
                        ' title="' +
                        color +
                        '" style="background-color:' +
                        color +
                        '" data-color="' +
                        color +
                        '" href="javascript:void(0)">' +
                        (valueHex === color ? iconEye : '') +
                        '</a>');
                });
            }
            return stack.join('');
        };
        form.appendChild(editor.create.fromHTML('<div>' + eachColor(editor.options.colors) + '</div>'));
        form.appendChild(editor.create.fromHTML('<a ' +
            (editor.options.textIcons
                ? 'class="jodit_text_icon"'
                : '') +
            ' data-color="" href="javascript:void(0)">' +
            iconEraser +
            '</a>'));
        if (editor.options.showBrowserColorPicker && helpers_1.hasBrowserColorPicker()) {
            form.appendChild(editor.create.fromHTML('<span>' +
                '<em ' +
                (editor.options.textIcons
                    ? 'class="jodit_text_icon"'
                    : '') +
                '>' +
                iconPalette +
                '</em>' +
                '<input type="color" value=""/>' +
                '</span>'));
            editor.events.on(form, 'change', function (e) {
                e.stopPropagation();
                var target = e.target;
                if (!target ||
                    !target.tagName ||
                    target.tagName.toUpperCase() !== 'INPUT') {
                    return;
                }
                var color = target.value || '';
                if (color) {
                    setColor(target, color);
                }
                if (callback && typeof callback === 'function') {
                    callback(color);
                }
                e.preventDefault();
            });
        }
        editor.events.on(form, 'mousedown touchend', function (e) {
            e.stopPropagation();
            var target = e.target;
            if ((!target ||
                !target.tagName ||
                target.tagName.toUpperCase() === 'SVG' ||
                target.tagName.toUpperCase() === 'PATH') &&
                target.parentNode) {
                target = Dom_1.Dom.closest(target.parentNode, 'A', editor.editor);
            }
            if (target.tagName.toUpperCase() !== 'A') {
                return;
            }
            var active = form.querySelector('a.active');
            if (active) {
                active.classList.remove('active');
                active.innerHTML = '';
            }
            var color = target.getAttribute('data-color') || '';
            if (color) {
                setColor(target, color);
            }
            if (callback && typeof callback === 'function') {
                callback(color);
            }
            e.preventDefault();
        });
        return form;
    };
    Widget.TabsWidget = function (editor, tabs, state) {
        var box = editor.create.div('jodit_tabs'), tabBox = editor.create.div('jodit_tabs_wrapper'), buttons = editor.create.div('jodit_tabs_buttons'), nameToTab = {};
        var firstTab = '', tabcount = 0;
        box.appendChild(buttons);
        box.appendChild(tabBox);
        helpers_1.each(tabs, function (name, tabOptions) {
            var tab = editor.create.div('jodit_tab'), button = editor.create.element('a', {
                href: 'javascript:void(0);'
            });
            if (!firstTab) {
                firstTab = name.toString();
            }
            button.innerHTML = /<svg/.test(name.toString())
                ? name
                : editor.i18n(name.toString());
            buttons.appendChild(button);
            if (typeof tabOptions !== 'function') {
                tab.appendChild(tabOptions);
            }
            else {
                tab.appendChild(editor.create.div('jodit_tab_empty'));
            }
            tabBox.appendChild(tab);
            editor.events.on(button, 'mousedown touchend', function (e) {
                helpers_1.$$('a', buttons).forEach(function (a) {
                    a.classList.remove('active');
                });
                helpers_1.$$('.jodit_tab', tabBox).forEach(function (a) {
                    a.classList.remove('active');
                });
                button.classList.add('active');
                tab.classList.add('active');
                if (typeof tabOptions === 'function') {
                    tabOptions.call(editor);
                }
                e.stopPropagation();
                if (state) {
                    state.__activeTab = name.toString();
                }
                return false;
            });
            nameToTab[name] = {
                button: button,
                tab: tab
            };
            tabcount += 1;
        });
        if (!tabcount) {
            return box;
        }
        helpers_1.$$('a', buttons).forEach(function (a) {
            a.style.width = (100 / tabcount).toFixed(10) + '%';
        });
        if (!state || !state.__activeTab || !nameToTab[state.__activeTab]) {
            nameToTab[firstTab].button.classList.add('active');
            nameToTab[firstTab].tab.classList.add('active');
        }
        else {
            nameToTab[state.__activeTab].button.classList.add('active');
            nameToTab[state.__activeTab].tab.classList.add('active');
        }
        return box;
    };
    Widget.FileSelectorWidget = function (editor, callbacks, elm, close, isImage) {
        if (isImage === void 0) { isImage = true; }
        var currentImage;
        var tabs = {};
        if (callbacks.upload &&
            editor.options.uploader &&
            (editor.options.uploader.url ||
                editor.options.uploader.insertImageAsBase64URI)) {
            var dragbox = editor.create.fromHTML('<div class="jodit_draganddrop_file_box">' +
                ("<strong>" + editor.i18n(isImage ? 'Drop image' : 'Drop file') + "</strong>") +
                ("<span><br>" + editor.i18n('or click') + "</span>") +
                ("<input type=\"file\" accept=\"" + (isImage ? 'image/*' : '*') + "\" tabindex=\"-1\" dir=\"auto\" multiple=\"\"/>") +
                '</div>');
            editor.getInstance('Uploader').bind(dragbox, function (resp) {
                var handler = helpers_1.isFunction(callbacks.upload) ? callbacks.upload : editor.options.uploader.defaultHandlerSuccess;
                if (typeof handler === 'function') {
                    handler.call(editor, resp);
                }
            }, function (error) {
                editor.events.fire('errorMessage', error.message);
            });
            var icon = editor.options.textIcons
                ? ''
                : icon_1.ToolbarIcon.getIcon('upload');
            tabs[icon + editor.i18n('Upload')] = dragbox;
        }
        if (callbacks.filebrowser) {
            if (editor.options.filebrowser.ajax.url ||
                editor.options.filebrowser.items.url) {
                var icon = editor.options.textIcons
                    ? ''
                    : icon_1.ToolbarIcon.getIcon('folder');
                tabs[icon + editor.i18n('Browse')] = function () {
                    close && close();
                    if (callbacks.filebrowser) {
                        editor.getInstance('FileBrowser').open(callbacks.filebrowser, isImage);
                    }
                };
            }
        }
        if (callbacks.url) {
            var form_1 = editor.create.fromHTML("<form onsubmit=\"return false;\" class=\"jodit_form\">\n\t\t\t\t\t\t<div class=\"jodit_form_group\">\n\t\t\t\t\t\t\t<input class=\"jodit_input\" type=\"text\" required name=\"url\" placeholder=\"http://\"/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"jodit_form_group\">\n\t\t\t\t\t\t\t<input class=\"jodit_input\" type=\"text\" name=\"text\" placeholder=\"" + editor.i18n('Alternative text') + "\"/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div style=\"text-align: right\"><button class=\"jodit_button\">" + editor.i18n('Insert') + "</button></div>\n\t\t\t\t\t</form>"), button = form_1.querySelector('button'), url_1 = form_1.querySelector('input[name=url]');
            currentImage = null;
            if (elm &&
                !Dom_1.Dom.isText(elm) &&
                (elm.tagName === 'IMG' || helpers_1.$$('img', elm).length)) {
                currentImage = elm.tagName === 'IMG' ? elm : helpers_1.$$('img', elm)[0];
                helpers_1.val(form_1, 'input[name=url]', currentImage.getAttribute('src'));
                helpers_1.val(form_1, 'input[name=text]', currentImage.getAttribute('alt'));
                button.textContent = editor.i18n('Update');
            }
            if (elm &&
                !Dom_1.Dom.isText(elm) &&
                elm.nodeName === 'A') {
                helpers_1.val(form_1, 'input[name=url]', elm.getAttribute('href') || '');
                helpers_1.val(form_1, 'input[name=text]', elm.getAttribute('title') || '');
                button.textContent = editor.i18n('Update');
            }
            form_1.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (!helpers_1.val(form_1, 'input[name=url]')) {
                    url_1.focus();
                    url_1.classList.add('jodit_error');
                    return false;
                }
                if (typeof callbacks.url === 'function') {
                    callbacks.url.call(editor, helpers_1.val(form_1, 'input[name=url]'), helpers_1.val(form_1, 'input[name=text]'));
                }
                return false;
            }, false);
            var icon = editor.options.textIcons
                ? ''
                : icon_1.ToolbarIcon.getIcon('link');
            tabs[icon + ' URL'] = form_1;
        }
        return Widget.TabsWidget(editor, tabs);
    };
})(Widget = exports.Widget || (exports.Widget = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(103), exports);
tslib_1.__exportStar(__webpack_require__(104), exports);
tslib_1.__exportStar(__webpack_require__(105), exports);
tslib_1.__exportStar(__webpack_require__(106), exports);
tslib_1.__exportStar(__webpack_require__(107), exports);
tslib_1.__exportStar(__webpack_require__(108), exports);
tslib_1.__exportStar(__webpack_require__(109), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);
tslib_1.__exportStar(__webpack_require__(110), exports);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(111), exports);
tslib_1.__exportStar(__webpack_require__(112), exports);
tslib_1.__exportStar(__webpack_require__(113), exports);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var collection_1 = __webpack_require__(36);
var Dom_1 = __webpack_require__(1);
var css_1 = __webpack_require__(11);
var consts = __webpack_require__(2);
var isJoditObject_1 = __webpack_require__(15);
var JoditToolbarCollection = (function (_super) {
    tslib_1.__extends(JoditToolbarCollection, _super);
    function JoditToolbarCollection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checkActiveStatus = function (cssObject, node) {
            var matches = 0, total = 0;
            Object.keys(cssObject).forEach(function (cssProperty) {
                var cssValue = cssObject[cssProperty];
                if (typeof cssValue === 'function') {
                    if (cssValue(_this.jodit, css_1.css(node, cssProperty).toString())) {
                        matches += 1;
                    }
                }
                else {
                    if (cssValue.indexOf(css_1.css(node, cssProperty).toString()) !== -1) {
                        matches += 1;
                    }
                }
                total += 1;
            });
            return total === matches;
        };
        return _this;
    }
    JoditToolbarCollection.prototype.buttonIsActive = function (button) {
        var _this = this;
        var active = _super.prototype.buttonIsActive.call(this, button);
        if (active !== undefined) {
            return active;
        }
        var element = this.jodit.selection
            ? this.jodit.selection.current()
            : false;
        if (!element) {
            return false;
        }
        var tags, elm, css;
        if (button.control.tags ||
            (button.control.options && button.control.options.tags)) {
            tags =
                button.control.tags ||
                    (button.control.options && button.control.options.tags);
            elm = element;
            if (Dom_1.Dom.up(elm, function (node) {
                if (node &&
                    tags.indexOf(node.nodeName.toLowerCase()) !== -1) {
                    return true;
                }
            }, this.jodit.editor)) {
                return true;
            }
        }
        if (button.control.css ||
            (button.control.options && button.control.options.css)) {
            css =
                button.control.css ||
                    (button.control.options && button.control.options.css);
            elm = element;
            if (Dom_1.Dom.up(elm, function (node) {
                if (node && !Dom_1.Dom.isText(node)) {
                    return _this.checkActiveStatus(css, node);
                }
            }, this.jodit.editor)) {
                return true;
            }
        }
        return false;
    };
    JoditToolbarCollection.prototype.buttonIsDisabled = function (button) {
        var disabled = _super.prototype.buttonIsDisabled.call(this, button);
        if (disabled !== undefined) {
            return disabled;
        }
        var mode = button.control === undefined || button.control.mode === undefined
            ? consts.MODE_WYSIWYG
            : button.control.mode;
        return !(mode === consts.MODE_SPLIT || mode === this.jodit.getRealMode());
    };
    JoditToolbarCollection.prototype.getTarget = function (button) {
        return button.target || this.jodit.selection.current() || undefined;
    };
    JoditToolbarCollection.makeCollection = function (jodit) {
        var collection = isJoditObject_1.isJoditObject(jodit)
            ? new JoditToolbarCollection(jodit)
            : new collection_1.ToolbarCollection(jodit);
        if (jodit.options.textIcons) {
            collection.container.classList.add('jodit_text_icons');
        }
        return collection;
    };
    return JoditToolbarCollection;
}(collection_1.ToolbarCollection));
exports.JoditToolbarCollection = JoditToolbarCollection;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var asArray_1 = __webpack_require__(41);
exports.asArray = asArray_1.asArray;
var inArray_1 = __webpack_require__(84);
exports.inArray = inArray_1.inArray;
var splitArray_1 = __webpack_require__(85);
exports.splitArray = splitArray_1.splitArray;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var isWindow_1 = __webpack_require__(43);
var type_1 = __webpack_require__(32);
exports.isPlainObject = function (obj) {
    if (typeof obj !== 'object' || obj.nodeType || isWindow_1.isWindow(obj)) {
        return false;
    }
    return !(obj.constructor &&
        !type_1.hasOwn.call(obj.constructor.prototype, 'isPrototypeOf'));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumeric = function (value) {
    if (typeof value === 'string') {
        if (!value.match(/^([+\-])?[0-9]+(\.?)([0-9]+)?(e[0-9]+)?$/)) {
            return false;
        }
        value = parseFloat(value);
    }
    return !isNaN(value) && isFinite(value);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
function each(obj, callback) {
    var length, keys, i;
    if (Array.isArray(obj)) {
        length = obj.length;
        for (i = 0; i < length; i += 1) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                return false;
            }
        }
    }
    else {
        keys = Object.keys(obj);
        for (i = 0; i < keys.length; i += 1) {
            if (callback.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
                return false;
            }
        }
    }
    return true;
}
exports.each = each;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = __webpack_require__(8);
var localStorageProvider_1 = __webpack_require__(60);
var memoryStorageProvider_1 = __webpack_require__(61);
exports.StorageKey = 'Jodit_';
var Storage = (function () {
    function Storage(provider, suffix) {
        this.provider = provider;
        this.prefix = exports.StorageKey;
        if (suffix) {
            this.prefix += suffix;
        }
    }
    Storage.prototype.set = function (key, value) {
        this.provider.set(string_1.camelCase(this.prefix + key), value);
    };
    Storage.prototype.get = function (key) {
        return this.provider.get(string_1.camelCase(this.prefix + key));
    };
    Storage.prototype.exists = function (key) {
        return this.provider.exists(string_1.camelCase(this.prefix + key));
    };
    Storage.prototype.clear = function () {
        return this.provider.clear();
    };
    Storage.makeStorage = function (persistent, suffix) {
        if (persistent === void 0) { persistent = false; }
        var provider;
        if (persistent && localStorageProvider_1.canUsePersistentStorage()) {
            provider = new localStorageProvider_1.LocalStorageProvider(exports.StorageKey + suffix);
        }
        if (!provider) {
            provider = new memoryStorageProvider_1.MemoryStorageProvider();
        }
        return new Storage(provider, suffix);
    };
    return Storage;
}());
exports.Storage = Storage;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var element_1 = __webpack_require__(37);
var list_1 = __webpack_require__(129);
var popup_1 = __webpack_require__(27);
var isJoditObject_1 = __webpack_require__(15);
var constants_1 = __webpack_require__(2);
var icon_1 = __webpack_require__(5);
var ToolbarButton = (function (_super) {
    tslib_1.__extends(ToolbarButton, _super);
    function ToolbarButton(parentToolbarOrView, control, target) {
        var _this = _super.call(this, parentToolbarOrView) || this;
        _this.__disabled = false;
        _this.__actived = false;
        _this.onMouseDown = function (originalEvent) {
            var _a, _b;
            if (originalEvent.type === 'keydown' &&
                originalEvent.which !== constants_1.KEY_ENTER) {
                return;
            }
            originalEvent.stopImmediatePropagation();
            originalEvent.preventDefault();
            if (_this.disable) {
                return false;
            }
            var control = _this.control, getTarget = function () {
                return (_this.parentToolbar && _this.parentToolbar.getTarget(_this)) ||
                    _this.target ||
                    false;
            };
            if (control.list) {
                var list = new list_1.PopupList(_this.jodit, _this.container, _this.target);
                list.open(control);
                _this.jodit.events.fire('closeAllPopups', list.container);
                _this.anchor.setAttribute('aria-expanded', 'true');
                _this.jodit.events.on(list, 'afterClose', function () {
                    _this.anchor.setAttribute('aria-expanded', 'false');
                });
            }
            else if (control.exec !== undefined &&
                typeof control.exec === 'function') {
                control.exec(_this.jodit, getTarget(), control, originalEvent, _this
                    .container);
                (_a = _this.jodit) === null || _a === void 0 ? void 0 : _a.events.fire('synchro');
                if (_this.parentToolbar) {
                    _this.parentToolbar.immediateCheckActiveButtons();
                }
                (_b = _this.jodit) === null || _b === void 0 ? void 0 : _b.events.fire('closeAllPopups afterExec');
            }
            else if (control.popup !== undefined &&
                typeof control.popup === 'function') {
                var popup = new popup_1.Popup(_this.jodit, _this.container, _this.target);
                if (_this.jodit.events.fire(helpers_1.camelCase("before-" + control.name + "-OpenPopup"), getTarget(), control, popup) !== false) {
                    var popupElm = control.popup(_this.jodit, getTarget(), control, popup.close, _this);
                    if (popupElm) {
                        popup.open(popupElm);
                    }
                }
                _this.jodit.events.fire(helpers_1.camelCase("after-" + control.name + "-OpenPopup") +
                    ' closeAllPopups', popup.container);
            }
            else {
                if (control.command || control.name) {
                    if (isJoditObject_1.isJoditObject(_this.jodit)) {
                        _this.jodit.execCommand(control.command || control.name, (control.args && control.args[0]) || false, (control.args && control.args[1]) || null);
                    }
                    else {
                        _this.jodit.ownerDocument.execCommand(control.command || control.name, (control.args && control.args[0]) || false, (control.args && control.args[1]) || null);
                    }
                    _this.jodit.events.fire('closeAllPopups');
                }
            }
        };
        _this.control = control;
        _this.target = target;
        _this.anchor = _this.jodit.create.element('a', {
            role: 'button',
            href: 'javascript:void(0)'
        });
        var tabIndex = '-1';
        if (_this.jodit.options.allowTabNavigation) {
            tabIndex = '0';
        }
        _this.anchor.setAttribute('tabindex', tabIndex);
        _this.container.appendChild(_this.anchor);
        if (_this.jodit.options.showTooltip && control.tooltip) {
            if (!_this.jodit.options.useNativeTooltip) {
                var to_1 = _this.jodit.options.showTooltipDelay ||
                    _this.jodit.defaultTimeout;
                var timeout_1 = 0;
                _this.jodit.events
                    .on(_this.anchor, 'mouseenter', function () {
                    timeout_1 = _this.jodit.async.setTimeout(function () {
                        var _a;
                        return !_this.isDisable() && ((_a = _this.jodit) === null || _a === void 0 ? void 0 : _a.events.fire('showTooltip', _this.anchor, _this.tooltipText));
                    }, {
                        timeout: to_1,
                        label: 'tooltip'
                    });
                })
                    .on(_this.anchor, 'mouseleave', function () {
                    _this.jodit.async.clearTimeout(timeout_1);
                    _this.jodit.events.fire('hideTooltip');
                });
            }
            else {
                _this.anchor.setAttribute('title', _this.tooltipText);
            }
            _this.anchor.setAttribute('aria-label', _this.tooltipText);
        }
        _this.textBox = _this.jodit.create.span();
        _this.anchor.appendChild(_this.textBox);
        var clearName = control.name.replace(/[^a-zA-Z0-9]/g, '_');
        if (control.getContent && typeof control.getContent === 'function') {
            Dom_1.Dom.detach(_this.container);
            var content = control.getContent(_this.jodit, control, _this);
            _this.container.appendChild(typeof content === 'string'
                ? _this.jodit.create.fromHTML(content)
                : content);
        }
        else {
            if (control.list && _this.anchor) {
                var trigger = _this.jodit.create.fromHTML(icon_1.ToolbarIcon.getIcon('dropdown-arrow'));
                trigger.classList.add('jodit_with_dropdownlist-trigger');
                _this.container.classList.add('jodit_with_dropdownlist');
                _this.anchor.appendChild(trigger);
            }
            _this.textBox.appendChild(_this.createIcon(clearName, control));
        }
        _this.container.classList.add('jodit_toolbar_btn-' + clearName);
        if (_this.jodit.options.direction) {
            var direction = _this.jodit.options.direction.toLowerCase();
            _this.container.style.direction =
                direction === 'rtl' ? 'rtl' : 'ltr';
        }
        if (control.isInput) {
            _this.container.classList.add('jodit_toolbar-input');
        }
        else {
            _this.jodit.events
                .on(_this.container, 'mousedown touchend keydown', _this.onMouseDown)
                .on("click-" + clearName + "-btn", _this.onMouseDown);
        }
        return _this;
    }
    Object.defineProperty(ToolbarButton.prototype, "disable", {
        get: function () {
            return this.__disabled;
        },
        set: function (disable) {
            this.__disabled = disable;
            this.container.classList.toggle('jodit_disabled', disable);
            if (!disable) {
                if (this.container.hasAttribute('disabled')) {
                    this.container.removeAttribute('disabled');
                }
            }
            else {
                if (!this.container.hasAttribute('disabled')) {
                    this.container.setAttribute('disabled', 'disabled');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarButton.prototype, "active", {
        get: function () {
            return this.__actived;
        },
        set: function (enable) {
            this.__actived = enable;
            this.container.classList.toggle('jodit_active', enable);
        },
        enumerable: true,
        configurable: true
    });
    ToolbarButton.prototype.isDisable = function () {
        return Boolean(this.parentToolbar && this.parentToolbar.buttonIsDisabled(this));
    };
    ToolbarButton.prototype.isActive = function () {
        return Boolean(this.parentToolbar && this.parentToolbar.buttonIsActive(this));
    };
    Object.defineProperty(ToolbarButton.prototype, "tooltipText", {
        get: function () {
            if (!this.control.tooltip) {
                return '';
            }
            return (this.jodit.i18n(this.control.tooltip) +
                (this.control.hotkeys
                    ? '<br>' + helpers_1.asArray(this.control.hotkeys).join(' ')
                    : ''));
        },
        enumerable: true,
        configurable: true
    });
    ToolbarButton.prototype.focus = function () {
        this.anchor.focus();
    };
    ToolbarButton.prototype.destruct = function () {
        if (this.isDestructed) {
            return;
        }
        this.jodit &&
            this.jodit.events &&
            this.jodit.events.off(this.anchor) &&
            this.jodit.events.off(this.container);
        _super.prototype.destruct.call(this);
    };
    return ToolbarButton;
}(element_1.ToolbarElement));
exports.ToolbarButton = ToolbarButton;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright 2013-2020 Valeriy Chupurnov https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var Component_1 = __webpack_require__(7);
var Jodit_1 = __webpack_require__(9);
var Popup = (function (_super) {
    tslib_1.__extends(Popup, _super);
    function Popup(jodit, target, current, className) {
        if (className === void 0) { className = 'jodit_toolbar_popup'; }
        var _this = _super.call(this, jodit) || this;
        _this.target = target;
        _this.current = current;
        _this.className = className;
        _this.throttleCalcPosition = _this.jodit.async.throttle(_this.calcPosition.bind(_this), _this.jodit.defaultTimeout);
        _this.isOpened = false;
        _this.close = function (current) {
            if (!_this.isOpened && !_this.isDestructed) {
                return;
            }
            if (!current ||
                !Dom_1.Dom.isOrContains(_this.container, current instanceof Popup ? current.target : current)) {
                _this.isOpened = false;
                _this.jodit.events.off('closeAllPopups', _this.close);
                _this.doClose();
                Dom_1.Dom.safeRemove(_this.container);
                _this.jodit.events.fire('removeMarkers');
                _this.jodit.events.fire(_this, 'afterClose');
            }
        };
        _this.container = _this.jodit.create.div(className);
        _this.jodit.events
            .on(_this.container, 'mousedown touchstart touchend', function (e) {
            e.stopPropagation();
        })
            .on([_this.jodit.ownerWindow, _this.jodit.events], 'resize', _this.throttleCalcPosition)
            .on('afterInsertNode, afterInsertImage', _this.close);
        return _this;
    }
    Popup.prototype.calcPosition = function () {
        if (!this.isOpened || this.isInDestruct) {
            return;
        }
        var popup = this.container;
        var offsetContainer = helpers_1.offset(this.jodit.container, this.jodit, this.jodit.ownerDocument, true);
        var offsetPopup = helpers_1.offset(popup, this.jodit, this.jodit.ownerDocument, true);
        var marginLeft = helpers_1.css(popup, 'marginLeft') || 0;
        offsetPopup.left -= marginLeft;
        var diffLeft = marginLeft;
        var width = 'auto';
        if (offsetPopup.left < offsetContainer.left) {
            diffLeft = offsetContainer.left - offsetPopup.left;
        }
        else if (offsetPopup.left + offsetPopup.width >=
            offsetContainer.left + offsetContainer.width) {
            diffLeft = -(offsetPopup.left +
                offsetPopup.width -
                (offsetContainer.left + offsetContainer.width));
        }
        else {
            diffLeft = 0;
        }
        if (offsetPopup.width >= offsetContainer.width) {
            diffLeft = offsetContainer.left - offsetPopup.left;
            width = offsetContainer.width;
        }
        if (diffLeft !== marginLeft) {
            try {
                popup.style.setProperty('margin-left', diffLeft + 'px', 'important');
            }
            catch (_a) {
                popup.style.marginLeft = diffLeft + 'px';
            }
        }
        var triangle = popup.querySelector('.jodit_popup_triangle');
        if (triangle) {
            triangle.style.marginLeft = -diffLeft + 'px';
        }
        helpers_1.css(popup, 'width', width);
    };
    Popup.prototype.doOpen = function (content) {
        if (!content) {
            return;
        }
        Dom_1.Dom.detach(this.container);
        this.container.innerHTML = '<span class="jodit_popup_triangle"></span>';
        this.container.appendChild(Dom_1.Dom.isNode(content, this.jodit.ownerWindow)
            ? content
            : this.jodit.create.fromHTML(content.toString()));
        this.container.style.display = 'block';
        this.container.style.removeProperty('marginLeft');
    };
    Popup.prototype.doClose = function () {
    };
    Popup.prototype.open = function (content, rightAlign, noStandardActions) {
        if (noStandardActions === void 0) { noStandardActions = false; }
        Jodit_1.Jodit.fireEach('beforeOpenPopup closeAllPopups', this, content);
        noStandardActions || this.jodit.events.on('closeAllPopups', this.close);
        this.jodit.markOwner(this.container);
        this.container.classList.add(this.className + '-open');
        this.doOpen(content);
        this.target.appendChild(this.container);
        if (this.jodit.options.textIcons) {
            this.firstInFocus();
        }
        if (rightAlign !== undefined) {
            this.container.classList.toggle('jodit_right', rightAlign);
        }
        if (!noStandardActions && this.container.parentNode) {
            this.jodit.events.fire(this.container.parentNode, 'afterOpenPopup', this.container);
        }
        this.isOpened = true;
        !noStandardActions && this.calcPosition();
    };
    Popup.prototype.firstInFocus = function () { };
    Popup.prototype.destruct = function () {
        if (this.isDestructed) {
            return;
        }
        this.setStatus(Component_1.STATUSES.beforeDestruct);
        this.jodit.events.off([this.jodit.ownerWindow, this.jodit.events], 'resize', this.throttleCalcPosition);
        Dom_1.Dom.safeRemove(this.container);
        delete this.container;
        _super.prototype.destruct.call(this);
    };
    return Popup;
}(Component_1.Component));
exports.Popup = Popup;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Ajax_1 = __webpack_require__(38);
exports.Ajax = Ajax_1.Ajax;
var eventsNative_1 = __webpack_require__(62);
exports.EventsNative = eventsNative_1.EventsNative;
var Component_1 = __webpack_require__(7);
exports.Component = Component_1.Component;
var ContextMenu_1 = __webpack_require__(39);
exports.ContextMenu = ContextMenu_1.ContextMenu;
var dialog_1 = __webpack_require__(13);
exports.Alert = dialog_1.Alert;
exports.Confirm = dialog_1.Confirm;
exports.Promt = dialog_1.Promt;
exports.Dialog = dialog_1.Dialog;
var Dom_1 = __webpack_require__(1);
exports.Dom = Dom_1.Dom;
var Plugin_1 = __webpack_require__(6);
exports.Plugin = Plugin_1.Plugin;
var Create_1 = __webpack_require__(63);
exports.Create = Create_1.Create;
var fileBrowser_1 = __webpack_require__(198);
exports.FileBrowser = fileBrowser_1.FileBrowser;
var Helpers = __webpack_require__(3);
exports.Helpers = Helpers;
var ImageEditor_1 = __webpack_require__(204);
exports.ImageEditor = ImageEditor_1.ImageEditor;
var observer_1 = __webpack_require__(56);
exports.Observer = observer_1.Observer;
var ProgressBar_1 = __webpack_require__(64);
exports.ProgressBar = ProgressBar_1.ProgressBar;
var Selection_1 = __webpack_require__(59);
exports.Select = Selection_1.Select;
var storage_1 = __webpack_require__(25);
exports.Storage = storage_1.Storage;
var Snapshot_1 = __webpack_require__(57);
exports.Snapshot = Snapshot_1.Snapshot;
var Table_1 = __webpack_require__(29);
exports.Table = Table_1.Table;
var icon_1 = __webpack_require__(5);
exports.ToolbarIcon = icon_1.ToolbarIcon;
var joditToolbarCollection_1 = __webpack_require__(20);
exports.JoditToolbarCollection = joditToolbarCollection_1.JoditToolbarCollection;
var collection_1 = __webpack_require__(36);
exports.ToolbarCollection = collection_1.ToolbarCollection;
var button_1 = __webpack_require__(26);
exports.ToolbarButton = button_1.ToolbarButton;
var Stack_1 = __webpack_require__(58);
exports.Stack = Stack_1.Stack;
var Widget_1 = __webpack_require__(17);
exports.Widget = Widget_1.Widget;
var Uploader_1 = __webpack_require__(205);
exports.Uploader = Uploader_1.Uploader;
var PluginSystem_1 = __webpack_require__(65);
exports.PluginSystem = PluginSystem_1.PluginSystem;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var consts = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var Table = (function () {
    function Table() {
    }
    Table.addSelected = function (td) {
        td.setAttribute(consts.JODIT_SELECTED_CELL_MARKER, '1');
    };
    Table.restoreSelection = function (td) {
        td.removeAttribute(consts.JODIT_SELECTED_CELL_MARKER);
    };
    Table.getAllSelectedCells = function (table) {
        return table
            ? helpers_1.$$("td[" + consts.JODIT_SELECTED_CELL_MARKER + "],th[" + consts.JODIT_SELECTED_CELL_MARKER + "]", table)
            : [];
    };
    Table.getRowsCount = function (table) {
        return table.rows.length;
    };
    Table.getColumnsCount = function (table) {
        var matrix = Table.formalMatrix(table);
        return matrix.reduce(function (max_count, cells) {
            return Math.max(max_count, cells.length);
        }, 0);
    };
    Table.formalMatrix = function (table, callback) {
        var matrix = [[]];
        var rows = Array.prototype.slice.call(table.rows);
        var setCell = function (cell, i) {
            if (matrix[i] === undefined) {
                matrix[i] = [];
            }
            var colSpan = cell.colSpan, rowSpan = cell.rowSpan;
            var column, row, currentColumn = 0;
            while (matrix[i][currentColumn]) {
                currentColumn += 1;
            }
            for (row = 0; row < rowSpan; row += 1) {
                for (column = 0; column < colSpan; column += 1) {
                    if (matrix[i + row] === undefined) {
                        matrix[i + row] = [];
                    }
                    if (callback &&
                        callback(cell, i + row, currentColumn + column, colSpan, rowSpan) === false) {
                        return false;
                    }
                    matrix[i + row][currentColumn + column] = cell;
                }
            }
        };
        for (var i = 0, j = void 0; i < rows.length; i += 1) {
            var cells = Array.prototype.slice.call(rows[i].cells);
            for (j = 0; j < cells.length; j += 1) {
                if (setCell(cells[j], i) === false) {
                    return matrix;
                }
            }
        }
        return matrix;
    };
    Table.formalCoordinate = function (table, cell, max) {
        if (max === void 0) { max = false; }
        var i = 0, j = 0, width = 1, height = 1;
        Table.formalMatrix(table, function (td, ii, jj, colSpan, rowSpan) {
            if (cell === td) {
                i = ii;
                j = jj;
                width = colSpan || 1;
                height = rowSpan || 1;
                if (max) {
                    j += (colSpan || 1) - 1;
                    i += (rowSpan || 1) - 1;
                }
                return false;
            }
        });
        return [i, j, width, height];
    };
    Table.appendRow = function (table, line, after, create) {
        var columnsCount = Table.getColumnsCount(table), row = create.element('tr');
        for (var j = 0; j < columnsCount; j += 1) {
            row.appendChild(create.element('td'));
        }
        if (after && line && line.nextSibling) {
            line.parentNode &&
                line.parentNode.insertBefore(row, line.nextSibling);
        }
        else if (!after && line) {
            line.parentNode && line.parentNode.insertBefore(row, line);
        }
        else {
            (helpers_1.$$(':scope>tbody', table)[0] || table).appendChild(row);
        }
    };
    Table.removeRow = function (table, rowIndex) {
        var box = Table.formalMatrix(table);
        var dec;
        var row = table.rows[rowIndex];
        helpers_1.each(box[rowIndex], function (j, cell) {
            dec = false;
            if (rowIndex - 1 >= 0 && box[rowIndex - 1][j] === cell) {
                dec = true;
            }
            else if (box[rowIndex + 1] && box[rowIndex + 1][j] === cell) {
                if (cell.parentNode === row &&
                    cell.parentNode.nextSibling) {
                    dec = true;
                    var nextCell = j + 1;
                    while (box[rowIndex + 1][nextCell] === cell) {
                        nextCell += 1;
                    }
                    var nextRow = Dom_1.Dom.next(cell.parentNode, function (elm) {
                        return Dom_1.Dom.isElement(elm) && elm.nodeName === 'TR';
                    }, table);
                    if (box[rowIndex + 1][nextCell]) {
                        nextRow.insertBefore(cell, box[rowIndex + 1][nextCell]);
                    }
                    else {
                        nextRow.appendChild(cell);
                    }
                }
            }
            else {
                Dom_1.Dom.safeRemove(cell);
            }
            if (dec &&
                (cell.parentNode === row || cell !== box[rowIndex][j - 1])) {
                var rowSpan = cell.rowSpan;
                if (rowSpan - 1 > 1) {
                    cell.setAttribute('rowspan', (rowSpan - 1).toString());
                }
                else {
                    cell.removeAttribute('rowspan');
                }
            }
        });
        Dom_1.Dom.safeRemove(row);
    };
    Table.appendColumn = function (table, j, after, create) {
        var box = Table.formalMatrix(table);
        var i;
        if (j === undefined || j < 0) {
            j = Table.getColumnsCount(table) - 1;
        }
        for (i = 0; i < box.length; i += 1) {
            var cell = create.element('td');
            var td = box[i][j];
            var added = false;
            if (after) {
                if ((box[i] && td && j + 1 >= box[i].length) ||
                    td !== box[i][j + 1]) {
                    if (td.nextSibling) {
                        td.parentNode &&
                            td.parentNode.insertBefore(cell, td.nextSibling);
                    }
                    else {
                        td.parentNode && td.parentNode.appendChild(cell);
                    }
                    added = true;
                }
            }
            else {
                if (j - 1 < 0 ||
                    (box[i][j] !== box[i][j - 1] && box[i][j].parentNode)) {
                    td.parentNode &&
                        td.parentNode.insertBefore(cell, box[i][j]);
                    added = true;
                }
            }
            if (!added) {
                box[i][j].setAttribute('colspan', (parseInt(box[i][j].getAttribute('colspan') || '1', 10) +
                    1).toString());
            }
        }
    };
    Table.removeColumn = function (table, j) {
        var box = Table.formalMatrix(table);
        var dec;
        helpers_1.each(box, function (i, cells) {
            var td = cells[j];
            dec = false;
            if (j - 1 >= 0 && box[i][j - 1] === td) {
                dec = true;
            }
            else if (j + 1 < cells.length && box[i][j + 1] === td) {
                dec = true;
            }
            else {
                Dom_1.Dom.safeRemove(td);
            }
            if (dec && (i - 1 < 0 || td !== box[i - 1][j])) {
                var colSpan = td.colSpan;
                if (colSpan - 1 > 1) {
                    td.setAttribute('colspan', (colSpan - 1).toString());
                }
                else {
                    td.removeAttribute('colspan');
                }
            }
        });
    };
    Table.getSelectedBound = function (table, selectedCells) {
        var bound = [
            [Infinity, Infinity],
            [0, 0]
        ];
        var box = Table.formalMatrix(table);
        var i, j, k;
        for (i = 0; i < box.length; i += 1) {
            for (j = 0; j < box[i].length; j += 1) {
                if (selectedCells.indexOf(box[i][j]) !== -1) {
                    bound[0][0] = Math.min(i, bound[0][0]);
                    bound[0][1] = Math.min(j, bound[0][1]);
                    bound[1][0] = Math.max(i, bound[1][0]);
                    bound[1][1] = Math.max(j, bound[1][1]);
                }
            }
        }
        for (i = bound[0][0]; i <= bound[1][0]; i += 1) {
            for (k = 1, j = bound[0][1]; j <= bound[1][1]; j += 1) {
                while (box[i][j - k] && box[i][j] === box[i][j - k]) {
                    bound[0][1] = Math.min(j - k, bound[0][1]);
                    bound[1][1] = Math.max(j - k, bound[1][1]);
                    k += 1;
                }
                k = 1;
                while (box[i][j + k] && box[i][j] === box[i][j + k]) {
                    bound[0][1] = Math.min(j + k, bound[0][1]);
                    bound[1][1] = Math.max(j + k, bound[1][1]);
                    k += 1;
                }
                k = 1;
                while (box[i - k] && box[i][j] === box[i - k][j]) {
                    bound[0][0] = Math.min(i - k, bound[0][0]);
                    bound[1][0] = Math.max(i - k, bound[1][0]);
                    k += 1;
                }
                k = 1;
                while (box[i + k] && box[i][j] === box[i + k][j]) {
                    bound[0][0] = Math.min(i + k, bound[0][0]);
                    bound[1][0] = Math.max(i + k, bound[1][0]);
                    k += 1;
                }
            }
        }
        return bound;
    };
    Table.normalizeTable = function (table) {
        var i, j, min, not;
        var __marked = [], box = Table.formalMatrix(table);
        for (j = 0; j < box[0].length; j += 1) {
            min = 1000000;
            not = false;
            for (i = 0; i < box.length; i += 1) {
                if (box[i][j] === undefined) {
                    continue;
                }
                if (box[i][j].colSpan < 2) {
                    not = true;
                    break;
                }
                min = Math.min(min, box[i][j].colSpan);
            }
            if (!not) {
                for (i = 0; i < box.length; i += 1) {
                    if (box[i][j] === undefined) {
                        continue;
                    }
                    Table.__mark(box[i][j], 'colspan', box[i][j].colSpan - min + 1, __marked);
                }
            }
        }
        for (i = 0; i < box.length; i += 1) {
            min = 1000000;
            not = false;
            for (j = 0; j < box[i].length; j += 1) {
                if (box[i][j] === undefined) {
                    continue;
                }
                if (box[i][j].rowSpan < 2) {
                    not = true;
                    break;
                }
                min = Math.min(min, box[i][j].rowSpan);
            }
            if (!not) {
                for (j = 0; j < box[i].length; j += 1) {
                    if (box[i][j] === undefined) {
                        continue;
                    }
                    Table.__mark(box[i][j], 'rowspan', box[i][j].rowSpan - min + 1, __marked);
                }
            }
        }
        for (i = 0; i < box.length; i += 1) {
            for (j = 0; j < box[i].length; j += 1) {
                if (box[i][j] === undefined) {
                    continue;
                }
                if (box[i][j].hasAttribute('rowspan') &&
                    box[i][j].rowSpan === 1) {
                    box[i][j].removeAttribute('rowspan');
                }
                if (box[i][j].hasAttribute('colspan') &&
                    box[i][j].colSpan === 1) {
                    box[i][j].removeAttribute('colspan');
                }
                if (box[i][j].hasAttribute('class') &&
                    !box[i][j].getAttribute('class')) {
                    box[i][j].removeAttribute('class');
                }
            }
        }
        Table.__unmark(__marked);
    };
    Table.mergeSelected = function (table) {
        var html = [], bound = Table.getSelectedBound(table, Table.getAllSelectedCells(table));
        var w = 0, first = null, first_j = 0, td, cols = 0, rows = 0;
        var __marked = [];
        if (bound && (bound[0][0] - bound[1][0] || bound[0][1] - bound[1][1])) {
            Table.formalMatrix(table, function (cell, i, j, cs, rs) {
                if (i >= bound[0][0] && i <= bound[1][0]) {
                    if (j >= bound[0][1] && j <= bound[1][1]) {
                        td = cell;
                        if (td.__i_am_already_was) {
                            return;
                        }
                        td.__i_am_already_was = true;
                        if (i === bound[0][0] && td.style.width) {
                            w += td.offsetWidth;
                        }
                        if (helpers_1.trim(cell.innerHTML.replace(/<br(\/)?>/g, '')) !== '') {
                            html.push(cell.innerHTML);
                        }
                        if (cs > 1) {
                            cols += cs - 1;
                        }
                        if (rs > 1) {
                            rows += rs - 1;
                        }
                        if (!first) {
                            first = cell;
                            first_j = j;
                        }
                        else {
                            Table.__mark(td, 'remove', 1, __marked);
                        }
                    }
                }
            });
            cols = bound[1][1] - bound[0][1] + 1;
            rows = bound[1][0] - bound[0][0] + 1;
            if (first) {
                if (cols > 1) {
                    Table.__mark(first, 'colspan', cols, __marked);
                }
                if (rows > 1) {
                    Table.__mark(first, 'rowspan', rows, __marked);
                }
                if (w) {
                    Table.__mark(first, 'width', ((w / table.offsetWidth) * 100).toFixed(consts.ACCURACY) + '%', __marked);
                    if (first_j) {
                        Table.setColumnWidthByDelta(table, first_j, 0, true, __marked);
                    }
                }
                first.innerHTML = html.join('<br/>');
                delete first.__i_am_already_was;
                Table.__unmark(__marked);
                Table.normalizeTable(table);
                helpers_1.each(Array.from(table.rows), function (index, tr) {
                    if (!tr.cells.length) {
                        Dom_1.Dom.safeRemove(tr);
                    }
                });
            }
        }
    };
    Table.splitHorizontal = function (table, create) {
        var coord, td, tr, parent, after;
        var __marked = [];
        Table.getAllSelectedCells(table).forEach(function (cell) {
            td = create.element('td');
            td.appendChild(create.element('br'));
            tr = create.element('tr');
            coord = Table.formalCoordinate(table, cell);
            if (cell.rowSpan < 2) {
                Table.formalMatrix(table, function (tdElm, i, j) {
                    if (coord[0] === i &&
                        coord[1] !== j &&
                        tdElm !== cell) {
                        Table.__mark(tdElm, 'rowspan', tdElm.rowSpan + 1, __marked);
                    }
                });
                Dom_1.Dom.after(Dom_1.Dom.closest(cell, 'tr', table), tr);
                tr.appendChild(td);
            }
            else {
                Table.__mark(cell, 'rowspan', cell.rowSpan - 1, __marked);
                Table.formalMatrix(table, function (tdElm, i, j) {
                    if (i > coord[0] &&
                        i < coord[0] + cell.rowSpan &&
                        coord[1] > j &&
                        tdElm.parentNode
                            .rowIndex === i) {
                        after = tdElm;
                    }
                    if (coord[0] < i && tdElm === cell) {
                        parent = table.rows[i];
                    }
                });
                if (after) {
                    Dom_1.Dom.after(after, td);
                }
                else {
                    parent.insertBefore(td, parent.firstChild);
                }
            }
            if (cell.colSpan > 1) {
                Table.__mark(td, 'colspan', cell.colSpan, __marked);
            }
            Table.__unmark(__marked);
            Table.restoreSelection(cell);
        });
        this.normalizeTable(table);
    };
    Table.splitVertical = function (table, create) {
        var coord, td, percentage;
        var __marked = [];
        Table.getAllSelectedCells(table).forEach(function (cell) {
            coord = Table.formalCoordinate(table, cell);
            if (cell.colSpan < 2) {
                Table.formalMatrix(table, function (tdElm, i, j) {
                    if (coord[1] === j &&
                        coord[0] !== i &&
                        tdElm !== cell) {
                        Table.__mark(tdElm, 'colspan', tdElm.colSpan + 1, __marked);
                    }
                });
            }
            else {
                Table.__mark(cell, 'colspan', cell.colSpan - 1, __marked);
            }
            td = create.element('td');
            td.appendChild(create.element('br'));
            if (cell.rowSpan > 1) {
                Table.__mark(td, 'rowspan', cell.rowSpan, __marked);
            }
            var oldWidth = cell.offsetWidth;
            Dom_1.Dom.after(cell, td);
            percentage = oldWidth / table.offsetWidth / 2;
            Table.__mark(cell, 'width', (percentage * 100).toFixed(consts.ACCURACY) + '%', __marked);
            Table.__mark(td, 'width', (percentage * 100).toFixed(consts.ACCURACY) + '%', __marked);
            Table.__unmark(__marked);
            Table.restoreSelection(cell);
        });
        Table.normalizeTable(table);
    };
    Table.setColumnWidthByDelta = function (table, j, delta, noUnmark, marked) {
        var box = Table.formalMatrix(table);
        var i, w, percent;
        for (i = 0; i < box.length; i += 1) {
            w = box[i][j].offsetWidth;
            percent = ((w + delta) / table.offsetWidth) * 100;
            Table.__mark(box[i][j], 'width', percent.toFixed(consts.ACCURACY) + '%', marked);
        }
        if (!noUnmark) {
            Table.__unmark(marked);
        }
    };
    Table.__mark = function (cell, key, value, marked) {
        marked.push(cell);
        if (!cell.__marked_value) {
            cell.__marked_value = {};
        }
        cell.__marked_value[key] = value === undefined ? 1 : value;
    };
    Table.__unmark = function (marked) {
        marked.forEach(function (cell) {
            if (cell.__marked_value) {
                helpers_1.each(cell.__marked_value, function (key, value) {
                    switch (key) {
                        case 'remove':
                            Dom_1.Dom.safeRemove(cell);
                            break;
                        case 'rowspan':
                            if (value > 1) {
                                cell.setAttribute('rowspan', value.toString());
                            }
                            else {
                                cell.removeAttribute('rowspan');
                            }
                            break;
                        case 'colspan':
                            if (value > 1) {
                                cell.setAttribute('colspan', value.toString());
                            }
                            else {
                                cell.removeAttribute('colspan');
                            }
                            break;
                        case 'width':
                            cell.style.width = value.toString();
                            break;
                    }
                    delete cell.__marked_value[key];
                });
                delete cell.__marked_value;
            }
        });
    };
    return Table;
}());
exports.Table = Table;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var extend_1 = __webpack_require__(14);
var JoditObject = (function () {
    function JoditObject(data) {
        extend_1.extend(true, this, data);
    }
    return JoditObject;
}());
exports.JoditObject = JoditObject;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var extend_1 = __webpack_require__(14);
var JoditArray = (function () {
    function JoditArray(data) {
        var _this = this;
        this.length = 0;
        extend_1.extend(true, this, data);
        this.length = data.length;
        var proto = Array.prototype;
        [
            'map',
            'forEach',
            'reduce',
            'push',
            'pop',
            'shift',
            'unshift',
            'slice',
            'splice'
        ].forEach(function (method) {
            _this[method] = proto[method];
        });
    }
    JoditArray.prototype.toString = function () {
        var out = [];
        for (var i = 0; i < this.length; i += 1) {
            out[i] = this[i];
        }
        return out.toString();
    };
    return JoditArray;
}());
exports.JoditArray = JoditArray;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var class2type = {};
var toString = class2type.toString;
exports.hasOwn = class2type.hasOwnProperty;
[
    'Boolean',
    'Number',
    'String',
    'Function',
    'Array',
    'Date',
    'RegExp',
    'Object',
    'Error',
    'Symbol',
    'HTMLDocument',
    'Window',
    'HTMLElement',
    'HTMLBodyElement',
    'Text',
    'DocumentFragment',
    'DOMStringList',
    'HTMLCollection'
].forEach(function (name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
});
exports.type = function (obj) {
    if (obj === null) {
        return 'null';
    }
    return typeof obj === 'object' || typeof obj === 'function'
        ? class2type[toString.call(obj)] || 'object'
        : typeof obj;
};
function error(message) {
    return new TypeError(message);
}
exports.error = error;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(97), exports);
tslib_1.__exportStar(__webpack_require__(100), exports);
tslib_1.__exportStar(__webpack_require__(101), exports);
tslib_1.__exportStar(__webpack_require__(102), exports);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLanguage = function (language, defaultLanguage) {
    if (defaultLanguage === void 0) { defaultLanguage = 'en'; }
    if (language !== 'auto' && typeof language === 'string') {
        return language;
    }
    if (document.documentElement && document.documentElement.lang) {
        return document.documentElement.lang;
    }
    if (navigator.language) {
        return navigator.language.substr(0, 2);
    }
    return defaultLanguage;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var view_1 = __webpack_require__(123);
var joditToolbarCollection_1 = __webpack_require__(20);
var array_1 = __webpack_require__(21);
var Component_1 = __webpack_require__(7);
var Dom_1 = __webpack_require__(1);
var ViewWithToolbar = (function (_super) {
    tslib_1.__extends(ViewWithToolbar, _super);
    function ViewWithToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__toolbar = joditToolbarCollection_1.JoditToolbarCollection.makeCollection(_this);
        return _this;
    }
    Object.defineProperty(ViewWithToolbar.prototype, "toolbar", {
        get: function () {
            return this.__toolbar;
        },
        enumerable: true,
        configurable: true
    });
    ViewWithToolbar.prototype.setPanel = function (element) {
        this.jodit.options.toolbar = element;
        this.buildToolbar(this.container);
    };
    ViewWithToolbar.prototype.buildToolbar = function (container) {
        if (!this.options.toolbar) {
            return;
        }
        var toolbarContainer = container.querySelector('.jodit_toolbar_container');
        if (!toolbarContainer) {
            toolbarContainer = this.create.div('jodit_toolbar_container');
            Dom_1.Dom.appendChildFirst(container, toolbarContainer);
        }
        if (this.options.toolbar instanceof HTMLElement ||
            typeof this.options.toolbar === 'string') {
            toolbarContainer = this.resolveElement(this.options.toolbar);
        }
        this.toolbar.build(array_1.splitArray(this.options.buttons).concat(this.options.extraButtons), toolbarContainer);
    };
    ViewWithToolbar.prototype.destruct = function () {
        this.setStatus(Component_1.STATUSES.beforeDestruct);
        this.toolbar.destruct();
        delete this.__toolbar;
        _super.prototype.destruct.call(this);
    };
    return ViewWithToolbar;
}(view_1.View));
exports.ViewWithToolbar = ViewWithToolbar;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var break_1 = __webpack_require__(128);
var button_1 = __webpack_require__(26);
var separator_1 = __webpack_require__(130);
var Dom_1 = __webpack_require__(1);
var Component_1 = __webpack_require__(7);
var Config_1 = __webpack_require__(4);
var isJoditObject_1 = __webpack_require__(15);
var ToolbarCollection = (function (_super) {
    tslib_1.__extends(ToolbarCollection, _super);
    function ToolbarCollection(jodit) {
        var _this = _super.call(this, jodit) || this;
        _this.__buttons = [];
        _this.__getControlType = function (button) {
            var buttonControl;
            var controls = _this.jodit.options.controls || Config_1.Config.defaultOptions.controls;
            if (typeof button !== 'string') {
                buttonControl = tslib_1.__assign({ name: 'empty' }, button);
                if (controls[buttonControl.name] !== undefined) {
                    buttonControl = tslib_1.__assign(tslib_1.__assign({}, controls[buttonControl.name]), buttonControl);
                }
            }
            else {
                var list = button.split(/\./);
                var store = controls;
                if (list.length > 1) {
                    if (controls[list[0]] !== undefined) {
                        store = controls[list[0]];
                        button = list[1];
                    }
                }
                if (store[button] !== undefined) {
                    buttonControl = tslib_1.__assign({ name: button }, store[button]);
                }
                else {
                    buttonControl = {
                        name: button,
                        command: button,
                        tooltip: button
                    };
                }
            }
            return buttonControl;
        };
        _this.closeAll = function () {
            _this.jodit &&
                _this.jodit.events &&
                _this.jodit.events.fire('closeAllPopups');
        };
        _this.initEvents = function () {
            _this.jodit.events
                .on(_this.jodit.ownerWindow, 'mousedown touchend', _this.closeAll)
                .on(_this.listenEvents, _this.checkActiveButtons)
                .on('afterSetMode focus', _this.immediateCheckActiveButtons);
        };
        _this.listenEvents = 'changeStack mousedown mouseup keydown change afterInit readonly afterResize ' +
            'selectionchange changeSelection focus afterSetMode touchstart focus blur';
        _this.immediateCheckActiveButtons = function () {
            if (_this.isDestructed || _this.jodit.isLocked()) {
                return;
            }
            _this.__buttons.filter(function (button) { return button instanceof button_1.ToolbarButton; }).forEach(function (button) {
                button.disable = button.isDisable();
                if (!button.disable) {
                    button.active = button.isActive();
                }
                if (typeof button.control.getLabel === 'function') {
                    button.control.getLabel(_this.jodit, button.control, button);
                }
            });
            _this.jodit.events && _this.jodit.events.fire('updateToolbar');
        };
        _this.checkActiveButtons = _this.jodit.async.debounce(_this.immediateCheckActiveButtons, _this.jodit.defaultTimeout);
        _this.container = _this.jodit.create.element('ul');
        _this.container.classList.add('jodit_toolbar');
        _this.initEvents();
        return _this;
    }
    ToolbarCollection.prototype.getButtonsList = function () {
        return this.__buttons
            .map(function (a) {
            return a instanceof button_1.ToolbarButton ? a.control.name : '';
        })
            .filter(function (a) { return a !== ''; });
    };
    ToolbarCollection.prototype.getParentContainer = function () {
        return this.__parentContainer;
    };
    ToolbarCollection.prototype.appendChild = function (button) {
        this.__buttons.push(button);
        this.container.appendChild(button.container);
    };
    Object.defineProperty(ToolbarCollection.prototype, "firstButton", {
        get: function () {
            return this.__buttons[0];
        },
        enumerable: true,
        configurable: true
    });
    ToolbarCollection.prototype.removeChild = function (button) {
        var index = this.__buttons.indexOf(button);
        if (index !== -1) {
            this.__buttons.splice(index, 1);
            if (button.container.parentNode === this.container) {
                Dom_1.Dom.safeRemove(button.container);
            }
        }
    };
    ToolbarCollection.prototype.applyContainerOptions = function () {
        this.container.classList.add('jodit_' + (this.jodit.options.theme || 'default') + '_theme');
        this.jodit.container.classList.toggle('jodit_text_icons', this.jodit.options.textIcons);
        this.container.classList.toggle('jodit_text_icons', this.jodit.options.textIcons);
        if (this.jodit.options.zIndex) {
            this.container.style.zIndex = parseInt(this.jodit.options.zIndex.toString(), 10).toString();
        }
        var bs = (this.jodit.options.toolbarButtonSize || 'middle').toLowerCase();
        this.container.classList.add('jodit_toolbar_size-' +
            (['middle', 'large', 'small'].indexOf(bs) !== -1
                ? bs
                : 'middle'));
    };
    ToolbarCollection.prototype.build = function (buttons, parentContainer, target) {
        var _this = this;
        this.applyContainerOptions();
        this.jodit.events.off('rebuildToolbar');
        this.jodit.events.on('afterInit rebuildToolbar', function () { return _this.build(buttons, parentContainer, target); });
        this.__parentContainer = parentContainer;
        var lastBtnSeparator = false;
        this.clear();
        var buttonsList = typeof buttons === 'string' ? buttons.split(/[,\s]+/) : buttons;
        buttonsList
            .map(this.__getControlType)
            .forEach(function (buttonControl) {
            var button = null;
            if (_this.jodit.options.removeButtons.indexOf(buttonControl.name) !== -1) {
                return;
            }
            switch (buttonControl.name) {
                case '\n':
                    button = new break_1.ToolbarBreak(_this);
                    break;
                case '|':
                    if (!lastBtnSeparator) {
                        lastBtnSeparator = true;
                        button = new separator_1.ToolbarSeparator(_this);
                    }
                    break;
                default:
                    lastBtnSeparator = false;
                    button = new button_1.ToolbarButton(_this, buttonControl, target);
            }
            if (button) {
                _this.appendChild(button);
            }
        });
        if (this.container.parentNode !== parentContainer) {
            parentContainer.appendChild(this.container);
        }
        this.immediateCheckActiveButtons();
    };
    ToolbarCollection.prototype.clear = function () {
        var _this = this;
        tslib_1.__spreadArrays(this.__buttons).forEach(function (button) {
            _this.removeChild(button);
            button.destruct();
        });
        this.__buttons.length = 0;
    };
    ToolbarCollection.prototype.buttonIsActive = function (button) {
        if (isJoditObject_1.isJoditObject(this.jodit) && !this.jodit.editorIsActive) {
            return false;
        }
        if (typeof button.control.isActive === 'function') {
            return button.control.isActive(this.jodit, button.control, button);
        }
    };
    ToolbarCollection.prototype.buttonIsDisabled = function (button) {
        if (this.jodit.options.disabled) {
            return true;
        }
        if (this.jodit.options.readonly &&
            (!this.jodit.options.activeButtonsInReadOnly ||
                this.jodit.options.activeButtonsInReadOnly.indexOf(button.control.name) === -1)) {
            return true;
        }
        var isDisabled;
        if (typeof button.control.isDisable === 'function') {
            isDisabled = button.control.isDisable(this.jodit, button.control, button);
        }
        return isDisabled;
    };
    ToolbarCollection.prototype.getTarget = function (button) {
        return button.target;
    };
    ToolbarCollection.prototype.setDirection = function (direction) {
        this.container.style.direction = direction;
        this.container.setAttribute('dir', direction);
    };
    ToolbarCollection.prototype.destruct = function () {
        if (this.isDestructed) {
            return;
        }
        this.jodit.events
            .off(this.jodit.ownerWindow, 'mousedown touchstart', this.closeAll)
            .off(this.listenEvents, this.checkActiveButtons)
            .off('afterSetMode focus', this.immediateCheckActiveButtons);
        this.clear();
        Dom_1.Dom.safeRemove(this.container);
        delete this.container;
        _super.prototype.destruct.call(this);
    };
    return ToolbarCollection;
}(Component_1.Component));
exports.ToolbarCollection = ToolbarCollection;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(7);
var collection_1 = __webpack_require__(36);
var icon_1 = __webpack_require__(5);
var Dom_1 = __webpack_require__(1);
var string_1 = __webpack_require__(8);
var ToolbarElement = (function (_super) {
    tslib_1.__extends(ToolbarElement, _super);
    function ToolbarElement(parentToolbarOrView, containerTag, containerClass) {
        if (containerTag === void 0) { containerTag = 'li'; }
        if (containerClass === void 0) { containerClass = 'jodit_toolbar_btn'; }
        var _this = this;
        if (parentToolbarOrView instanceof collection_1.ToolbarCollection) {
            _this = _super.call(this, parentToolbarOrView.jodit) || this;
            _this.parentToolbar = parentToolbarOrView;
        }
        else {
            _this = _super.call(this, parentToolbarOrView) || this;
        }
        _this.container = _this.jodit.create.element(containerTag);
        _this.container.classList.add(containerClass);
        return _this;
    }
    ToolbarElement.prototype.focus = function () {
        this.container.focus();
    };
    ToolbarElement.prototype.destruct = function () {
        if (this.isInDestruct) {
            return;
        }
        this.setStatus(Component_1.STATUSES.beforeDestruct);
        Dom_1.Dom.safeRemove(this.container);
        this.parentToolbar = undefined;
        _super.prototype.destruct.call(this);
    };
    ToolbarElement.prototype.createIcon = function (clearName, control) {
        var icon = control ? control.icon || control.name : clearName;
        if (!this.jodit.options.textIcons) {
            var iconSVG = this.jodit.events.fire('getIcon', icon, control, clearName);
            var iconElement = void 0;
            if (control && control.iconURL && iconSVG === undefined) {
                iconElement = this.jodit.create.element('i');
                iconElement.style.backgroundImage =
                    'url(' +
                        control.iconURL.replace('{basePath}', this.jodit.basePath) +
                        ')';
            }
            else {
                if (iconSVG === undefined) {
                    if (icon_1.ToolbarIcon.exists(icon)) {
                        iconSVG = icon_1.ToolbarIcon.getIcon(icon);
                    }
                    else {
                        iconSVG = icon_1.ToolbarIcon.getIcon('empty');
                    }
                }
                iconElement =
                    typeof iconSVG === 'string'
                        ? this.jodit.create.fromHTML(string_1.trim(iconSVG))
                        : iconSVG;
            }
            iconElement.classList.add('jodit_icon', 'jodit_icon_' + clearName);
            return iconElement;
        }
        return this.jodit.create.fromHTML("<span class=\"jodit_icon\">" + this.jodit.i18n(control ? control.name : clearName) + "</span>");
    };
    return ToolbarElement;
}(Component_1.Component));
exports.ToolbarElement = ToolbarElement;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var helpers_1 = __webpack_require__(3);
var buildQuery_1 = __webpack_require__(55);
Config_1.Config.prototype.defaultAjaxOptions = {
    dataType: 'json',
    method: 'GET',
    url: '',
    data: null,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    headers: {
        'X-REQUESTED-WITH': 'XMLHttpRequest'
    },
    withCredentials: false,
    xhr: function () {
        return new XMLHttpRequest();
    }
};
var Ajax = (function () {
    function Ajax(editor, options) {
        var _this = this;
        this.success_response_codes = [200, 201, 202];
        this.jodit = editor;
        this.options = helpers_1.extend(true, {}, Config_1.Config.prototype.defaultAjaxOptions, options);
        if (this.options.xhr) {
            this.xhr = this.options.xhr();
        }
        editor &&
            editor.events &&
            editor.events.on('beforeDestruct', function () {
                _this.abort();
            });
    }
    Ajax.prototype.__buildParams = function (obj, prefix) {
        if (this.options.queryBuild &&
            typeof this.options.queryBuild === 'function') {
            return this.options.queryBuild.call(this, obj, prefix);
        }
        if (typeof obj === 'string' ||
            (this.jodit.ownerWindow.FormData &&
                obj instanceof this.jodit.ownerWindow.FormData)) {
            return obj;
        }
        return buildQuery_1.buildQuery(obj);
    };
    Ajax.prototype.abort = function () {
        try {
            this.xhr.abort();
        }
        catch (_a) { }
        return this;
    };
    Ajax.prototype.send = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var __parse = function (resp) {
                var result = null;
                if (_this.options.dataType === 'json') {
                    result = JSON.parse(resp);
                }
                if (!result) {
                    throw helpers_1.error('No JSON format');
                }
                return result;
            };
            _this.xhr.onabort = function () {
                reject(helpers_1.error(_this.xhr.statusText));
            };
            _this.xhr.onerror = function () {
                reject(helpers_1.error(_this.xhr.statusText));
            };
            _this.xhr.ontimeout = function () {
                reject(helpers_1.error(_this.xhr.statusText));
            };
            _this.xhr.onload = function () {
                _this.response = _this.xhr.responseText;
                _this.status = _this.xhr.status;
                resolve.call(_this.xhr, __parse(_this.response) || {});
            };
            _this.xhr.onreadystatechange = function () {
                if (_this.xhr.readyState === XMLHttpRequest.DONE) {
                    var resp = _this.xhr.responseText;
                    _this.response = resp;
                    _this.status = _this.xhr.status;
                    if (_this.success_response_codes.indexOf(_this.xhr.status) > -1) {
                        resolve.call(_this.xhr, __parse(resp));
                    }
                    else {
                        reject.call(_this.xhr, helpers_1.error(_this.xhr.statusText ||
                            _this.jodit.i18n('Connection error!')));
                    }
                }
            };
            _this.xhr.withCredentials =
                _this.options.withCredentials || false;
            var _a = _this.prepareRequest(), url = _a.url, data = _a.data, method = _a.method;
            _this.xhr.open(method, url, true);
            if (_this.options.contentType && _this.xhr.setRequestHeader) {
                _this.xhr.setRequestHeader('Content-type', _this.options.contentType);
            }
            if (_this.options.headers && _this.xhr.setRequestHeader) {
                helpers_1.each(_this.options.headers, function (key, value) {
                    _this.xhr.setRequestHeader(key, value);
                });
            }
            setTimeout(function () {
                _this.xhr.send(data
                    ? _this.__buildParams(data)
                    : undefined);
            }, 0);
        });
    };
    Ajax.prototype.prepareRequest = function () {
        if (!this.options.url) {
            throw helpers_1.error('Need URL for AJAX request');
        }
        var url = this.options.url;
        var data = this.options.data;
        var method = (this.options.method || 'get').toLowerCase();
        if (method === 'get' && data && helpers_1.isPlainObject(data)) {
            var qIndex = url.indexOf('?');
            if (qIndex !== -1) {
                var urlData = helpers_1.parseQuery(url);
                url = url.substr(0, qIndex) + '?' + buildQuery_1.buildQuery(tslib_1.__assign(tslib_1.__assign({}, urlData), data));
            }
            else {
                url += '?' + buildQuery_1.buildQuery(this.options.data);
            }
        }
        var request = {
            url: url,
            method: method,
            data: data
        };
        Ajax.log.splice(100);
        Ajax.log.push(request);
        return request;
    };
    Ajax.log = [];
    return Ajax;
}());
exports.Ajax = Ajax;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(7);
var css_1 = __webpack_require__(11);
var icon_1 = __webpack_require__(5);
var Dom_1 = __webpack_require__(1);
var ContextMenu = (function (_super) {
    tslib_1.__extends(ContextMenu, _super);
    function ContextMenu(editor) {
        var _this = _super.call(this, editor) || this;
        _this.evnts = 'mousedown jodit_close_dialog scroll';
        _this.hide = function () {
            Dom_1.Dom.safeRemove(_this.context);
            _this.jodit.events.off(_this.jodit.ownerWindow, _this.evnts, _this.hide);
        };
        _this.context = editor.create.div('jodit_context_menu');
        _this.context.classList.add('jodit_context_menu-show');
        return _this;
    }
    ContextMenu.prototype.show = function (x, y, actions, zIndex) {
        var _this = this;
        var _a;
        var self = this;
        if (!Array.isArray(actions)) {
            return;
        }
        if (zIndex) {
            this.context.style.zIndex = zIndex.toString();
        }
        Dom_1.Dom.detach(this.context);
        actions.forEach(function (item) {
            if (!item) {
                return;
            }
            var title = self.jodit.i18n(item.title || '');
            var action = _this.jodit.create.fromHTML("<a title=\"" + title + "\" data-icon=\"" + item.icon + "\"  href=\"javascript:void(0)\">" +
                (item.icon ? icon_1.ToolbarIcon.getIcon(item.icon) : '') +
                '<span></span></a>');
            var span = action.querySelector('span');
            action.addEventListener('mousedown', function (e) {
                var _a;
                (_a = item.exec) === null || _a === void 0 ? void 0 : _a.call(self, e);
                self.hide();
                return false;
            });
            span.textContent = title;
            self.context.appendChild(action);
        });
        css_1.css(self.context, {
            left: x,
            top: y
        });
        this.jodit.events.on(this.jodit.ownerWindow, this.evnts, self.hide);
        this.jodit.markOwner(this.context);
        (_a = this.jodit) === null || _a === void 0 ? void 0 : _a.ownerDocument.body.appendChild(this.context);
    };
    ContextMenu.prototype.destruct = function () {
        if (this.isInDestruct) {
            return;
        }
        this.setStatus(Component_1.STATUSES.beforeDestruct);
        Dom_1.Dom.safeRemove(this.context);
        delete this.context;
        this.jodit.events.off(this.jodit.ownerWindow, this.evnts, this.hide);
        _super.prototype.destruct.call(this);
    };
    return ContextMenu;
}(Component_1.Component));
exports.ContextMenu = ContextMenu;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.F_CLASS = 'jodit_filebrowser';
exports.ITEM_CLASS = exports.F_CLASS + '_files_item';
exports.ICON_LOADER = '<i class="jodit_icon-loader"></i>';


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.asArray = function (a) { return (Array.isArray(a) ? a : [a]); };


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(86), exports);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWindow = function (obj) {
    return obj !== null && obj === obj.window;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = function (value) {
    return typeof value === 'function';
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isURL = function (str) {
    var pattern = new RegExp('^(https?:\\/\\/)' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return pattern.test(str);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidName = function (name) {
    if (!name.length) {
        return false;
    }
    if (/[^0-9A-Za-zа-яА-ЯЁё\w\-_\.]/.test(name)) {
        return false;
    }
    return true;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorToHex = function (color) {
    if (color === 'rgba(0, 0, 0, 0)' || color === '') {
        return false;
    }
    if (!color) {
        return '#000000';
    }
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /([\s\n\t\r]*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color) ||
        /([\s\n\t\r]*?)rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/.exec(color);
    var hex, red, green, blue, rgb;
    if (!digits) {
        return '#000000';
    }
    red = parseInt(digits[2], 10);
    green = parseInt(digits[3], 10);
    blue = parseInt(digits[4], 10);
    rgb = blue | (green << 8) | (red << 16);
    hex = rgb.toString(16).toUpperCase();
    while (hex.length < 6) {
        hex = '0' + hex;
    }
    return digits[1] + '#' + hex;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelCase = function (key) {
    return key.replace(/([-_])(.)/g, function (m, code, letter) {
        return letter.toUpperCase();
    });
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromCamelCase = function (key) {
    return key.replace(/([A-Z]+)/g, function (m, letter) {
        return '-' + letter.toLowerCase();
    });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(2);
exports.trim = function (value) {
    return value
        .replace(constants_1.SPACE_REG_EXP_START, '')
        .replace(constants_1.SPACE_REG_EXP_END, '');
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var isNumeric_1 = __webpack_require__(23);
exports.normilizeCSSValue = function (key, value) {
    switch (key.toLowerCase()) {
        case 'font-weight':
            switch (value.toString().toLowerCase()) {
                case 'bold':
                    return 700;
                case 'normal':
                    return 400;
                case 'heavy':
                    return 900;
            }
            return isNumeric_1.isNumeric(value) ? +value : value;
    }
    return value;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeUrl = function (url) {
    if (window.location.protocol === 'file:' && /^\/\//.test(url)) {
        url = 'https:' + url;
    }
    return url;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = function (queryString) {
    var query = {}, a = queryString.substr(1).split('&');
    for (var i = 0; i < a.length; i += 1) {
        var keyValue = a[i].split('=');
        query[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1] || '');
    }
    return query;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctrlKey = function (e) {
    if (typeof navigator !== 'undefined' &&
        navigator.userAgent.indexOf('Mac OS X') !== -1) {
        if (e.metaKey && !e.altKey) {
            return true;
        }
    }
    else if (e.ctrlKey && !e.altKey) {
        return true;
    }
    return false;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var checker_1 = __webpack_require__(12);
exports.buildQuery = function (data, prefix) {
    var str = [];
    var enc = encodeURIComponent;
    for (var dataKey in data) {
        if (data.hasOwnProperty(dataKey)) {
            var k = prefix ? prefix + '[' + dataKey + ']' : dataKey;
            var v = data[dataKey];
            str.push(checker_1.isPlainObject(v) ? exports.buildQuery(v, k) : enc(k) + '=' + enc(v));
        }
    }
    return str.join('&');
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var Component_1 = __webpack_require__(7);
var Snapshot_1 = __webpack_require__(57);
var Stack_1 = __webpack_require__(58);
var command_1 = __webpack_require__(121);
Config_1.Config.prototype.observer = {
    timeout: 100
};
var Observer = (function (_super) {
    tslib_1.__extends(Observer, _super);
    function Observer(editor) {
        var _this = _super.call(this, editor) || this;
        _this.onChangeStack = function () {
            var newValue = _this.snapshot.make();
            if (!Snapshot_1.Snapshot.equal(newValue, _this.startValue)) {
                _this.stack.push(new command_1.Command(_this.startValue, newValue, _this));
                _this.startValue = newValue;
                _this.changeStack();
            }
        };
        _this.stack = new Stack_1.Stack();
        _this.snapshot = new Snapshot_1.Snapshot(editor);
        var onChangeStack = editor.async.debounce(_this.onChangeStack, editor.defaultTimeout);
        editor.events.on('afterAddPlace.observer', function () {
            if (_this.isInDestruct) {
                return;
            }
            _this.startValue = _this.snapshot.make();
            editor.events
                .on(editor.editor, [
                'changeSelection.observer',
                'selectionstart.observer',
                'selectionchange.observer',
                'mousedown.observer',
                'mouseup.observer',
                'keydown.observer',
                'keyup.observer'
            ].join(' '), function () {
                if (_this.startValue.html ===
                    _this.jodit.getNativeEditorValue()) {
                    _this.startValue = _this.snapshot.make();
                }
            })
                .on(_this, 'change.observer', function () {
                if (!_this.snapshot.isBlocked) {
                    onChangeStack();
                }
            });
        });
        return _this;
    }
    Observer.prototype.redo = function () {
        if (this.stack.redo()) {
            this.startValue = this.snapshot.make();
            this.changeStack();
        }
    };
    Observer.prototype.undo = function () {
        if (this.stack.undo()) {
            this.startValue = this.snapshot.make();
            this.changeStack();
        }
    };
    Observer.prototype.clear = function () {
        this.startValue = this.snapshot.make();
        this.stack.clear();
        this.changeStack();
    };
    Observer.prototype.changeStack = function () {
        var _a;
        this.jodit &&
            !this.jodit.isInDestruct && ((_a = this.jodit.events) === null || _a === void 0 ? void 0 : _a.fire('changeStack'));
    };
    Observer.prototype.destruct = function () {
        if (this.jodit.events) {
            this.jodit.events.off('.observer');
        }
        this.snapshot.destruct();
        delete this.snapshot;
        delete this.stack;
        delete this.startValue;
        _super.prototype.destruct.call(this);
    };
    return Observer;
}(Component_1.Component));
exports.Observer = Observer;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(7);
var Dom_1 = __webpack_require__(1);
var Snapshot = (function (_super) {
    tslib_1.__extends(Snapshot, _super);
    function Snapshot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isBlocked = false;
        return _this;
    }
    Snapshot.equal = function (first, second) {
        return (first.html === second.html &&
            JSON.stringify(first.range) === JSON.stringify(second.range));
    };
    Snapshot.countNodesBeforeInParent = function (elm) {
        if (!elm.parentNode) {
            return 0;
        }
        var elms = elm.parentNode.childNodes;
        var count = 0, last = null, j;
        for (j = 0; j < elms.length; j += 1) {
            if (last &&
                !(Dom_1.Dom.isText(elms[j]) && elms[j].textContent === '') &&
                !(Dom_1.Dom.isText(last) && Dom_1.Dom.isText(elms[j]))) {
                count += 1;
            }
            if (elms[j] === elm) {
                return count;
            }
            last = elms[j];
        }
        return 0;
    };
    Snapshot.strokeOffset = function (elm, offset) {
        while (Dom_1.Dom.isText(elm)) {
            elm = elm.previousSibling;
            if (Dom_1.Dom.isText(elm) &&
                elm.textContent !== null) {
                offset += elm.textContent.length;
            }
        }
        return offset;
    };
    Snapshot.prototype.calcHierarchyLadder = function (elm) {
        var counts = [];
        if (!elm ||
            !elm.parentNode ||
            !Dom_1.Dom.isOrContains(this.jodit.editor, elm)) {
            return [];
        }
        while (elm && elm !== this.jodit.editor) {
            if (elm) {
                counts.push(Snapshot.countNodesBeforeInParent(elm));
            }
            elm = elm.parentNode;
        }
        return counts.reverse();
    };
    Snapshot.prototype.getElementByLadder = function (ladder) {
        var n = this.jodit.editor, i;
        for (i = 0; n && i < ladder.length; i += 1) {
            n = n.childNodes[ladder[i]];
        }
        return n;
    };
    Snapshot.prototype.make = function () {
        var snapshot = {
            html: '',
            range: {
                startContainer: [],
                startOffset: 0,
                endContainer: [],
                endOffset: 0
            }
        };
        snapshot.html = this.jodit.getNativeEditorValue();
        var sel = this.jodit.selection.sel;
        if (sel && sel.rangeCount) {
            var range = sel.getRangeAt(0), startContainer = this.calcHierarchyLadder(range.startContainer), endContainer = this.calcHierarchyLadder(range.endContainer);
            var startOffset = Snapshot.strokeOffset(range.startContainer, range.startOffset), endOffset = Snapshot.strokeOffset(range.endContainer, range.endOffset);
            if (!startContainer.length &&
                range.startContainer !== this.jodit.editor) {
                startOffset = 0;
            }
            if (!endContainer.length &&
                range.endContainer !== this.jodit.editor) {
                endOffset = 0;
            }
            snapshot.range = {
                startContainer: startContainer,
                startOffset: startOffset,
                endContainer: endContainer,
                endOffset: endOffset
            };
        }
        return snapshot;
    };
    Snapshot.prototype.restore = function (snapshot) {
        this.isBlocked = true;
        this.jodit.setEditorValue(snapshot.html);
        try {
            if (snapshot.range) {
                var range = this.jodit.editorDocument.createRange();
                range.setStart(this.getElementByLadder(snapshot.range.startContainer), snapshot.range.startOffset);
                range.setEnd(this.getElementByLadder(snapshot.range.endContainer), snapshot.range.endOffset);
                this.jodit.selection.selectRange(range);
            }
        }
        catch (__ignore) {
            this.jodit.editor.lastChild &&
                this.jodit.selection.setCursorAfter(this.jodit.editor.lastChild);
            if (false) {}
        }
        this.isBlocked = false;
    };
    Snapshot.prototype.destruct = function () {
        this.isBlocked = false;
        _super.prototype.destruct.call(this);
    };
    return Snapshot;
}(Component_1.Component));
exports.Snapshot = Snapshot;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Stack = (function () {
    function Stack() {
        this.commands = [];
        this.stackPosition = -1;
    }
    Stack.prototype.clearRedo = function () {
        this.commands.length = this.stackPosition + 1;
    };
    Stack.prototype.clear = function () {
        this.commands.length = 0;
        this.stackPosition = -1;
    };
    Stack.prototype.push = function (command) {
        this.clearRedo();
        this.commands.push(command);
        this.stackPosition += 1;
    };
    Stack.prototype.undo = function () {
        if (this.canUndo()) {
            if (this.commands[this.stackPosition]) {
                this.commands[this.stackPosition].undo();
            }
            this.stackPosition -= 1;
            return true;
        }
        return false;
    };
    Stack.prototype.redo = function () {
        if (this.canRedo()) {
            this.stackPosition += 1;
            if (this.commands[this.stackPosition]) {
                this.commands[this.stackPosition].redo();
            }
            return true;
        }
        return false;
    };
    Stack.prototype.canUndo = function () {
        return this.stackPosition >= 0;
    };
    Stack.prototype.canRedo = function () {
        return this.stackPosition < this.commands.length - 1;
    };
    return Stack;
}());
exports.Stack = Stack;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var consts = __webpack_require__(2);
var constants_1 = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
var css_1 = __webpack_require__(11);
var normalize_1 = __webpack_require__(18);
var selector_1 = __webpack_require__(10);
var checker_1 = __webpack_require__(12);
var each_1 = __webpack_require__(24);
var string_1 = __webpack_require__(8);
var helpers_1 = __webpack_require__(3);
var Select = (function () {
    function Select(jodit) {
        var _this = this;
        this.jodit = jodit;
        this.isMarker = function (elm) {
            return Dom_1.Dom.isNode(elm, _this.win) &&
                Dom_1.Dom.isElement(elm) &&
                elm.nodeName === 'SPAN' &&
                elm.hasAttribute('data-' + consts.MARKER_CLASS);
        };
        this.focus = function () {
            var _a, _b, _c, _d;
            if (!_this.isFocused()) {
                if (_this.jodit.iframe) {
                    if (_this.doc.readyState == 'complete') {
                        _this.jodit.iframe.focus();
                    }
                }
                _this.win.focus();
                _this.area.focus();
                var sel = _this.sel, range = ((_a = sel) === null || _a === void 0 ? void 0 : _a.rangeCount) ? (_b = sel) === null || _b === void 0 ? void 0 : _b.getRangeAt(0) : null;
                if (!range || !Dom_1.Dom.isOrContains(_this.area, range.startContainer)) {
                    var range_1 = _this.createRange();
                    range_1.setStart(_this.area, 0);
                    range_1.collapse(true);
                    _this.selectRange(range_1);
                }
                if (!_this.jodit.editorIsActive) {
                    (_d = (_c = _this.jodit) === null || _c === void 0 ? void 0 : _c.events) === null || _d === void 0 ? void 0 : _d.fire('focus');
                }
                return true;
            }
            return false;
        };
        this.eachSelection = function (callback) {
            var sel = _this.sel;
            if (sel && sel.rangeCount) {
                var range = sel.getRangeAt(0);
                var nodes_1 = [], startOffset = range.startOffset, length_1 = _this.area.childNodes.length, elementOffset = startOffset < length_1 ? startOffset : length_1 - 1, start = range.startContainer === _this.area
                    ? _this.area.childNodes[elementOffset]
                    : range.startContainer, end_1 = range.endContainer === _this.area
                    ? _this.area.childNodes[range.endOffset - 1]
                    : range.endContainer;
                Dom_1.Dom.find(start, function (node) {
                    if (node &&
                        node !== _this.area &&
                        !Dom_1.Dom.isEmptyTextNode(node) &&
                        !_this.isMarker(node)) {
                        nodes_1.push(node);
                    }
                    return node === end_1 || (node && node.contains && node.contains(end_1));
                }, _this.area, true, 'nextSibling', false);
                var forEvery_1 = function (current) {
                    if (!Dom_1.Dom.isOrContains(_this.jodit.editor, current, true)) {
                        return;
                    }
                    if (current.nodeName.match(/^(UL|OL)$/)) {
                        return Array.from(current.childNodes).forEach(forEvery_1);
                    }
                    if (current.nodeName === 'LI') {
                        if (current.firstChild) {
                            current = current.firstChild;
                        }
                        else {
                            var currentB = _this.jodit.create.inside.text(constants_1.INVISIBLE_SPACE);
                            current.appendChild(currentB);
                            current = currentB;
                        }
                    }
                    callback(current);
                };
                if (nodes_1.length === 0 && Dom_1.Dom.isEmptyTextNode(start)) {
                    nodes_1.push(start);
                }
                nodes_1.forEach(forEvery_1);
            }
        };
        jodit.events.on('removeMarkers', function () {
            _this.removeMarkers();
        });
    }
    Select.prototype.errorNode = function (node) {
        if (!Dom_1.Dom.isNode(node, this.win)) {
            throw helpers_1.error('Parameter node must be instance of Node');
        }
    };
    Object.defineProperty(Select.prototype, "area", {
        get: function () {
            return this.jodit.editor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "win", {
        get: function () {
            return this.jodit.editorWindow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "doc", {
        get: function () {
            return this.jodit.editorDocument;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "sel", {
        get: function () {
            return this.win.getSelection();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Select.prototype, "range", {
        get: function () {
            var sel = this.sel;
            return sel && sel.rangeCount ? sel.getRangeAt(0) : this.createRange();
        },
        enumerable: true,
        configurable: true
    });
    Select.prototype.createRange = function () {
        return this.doc.createRange();
    };
    Select.prototype.remove = function () {
        var sel = this.sel, current = this.current();
        if (sel && current) {
            for (var i = 0; i < sel.rangeCount; i += 1) {
                sel.getRangeAt(i).deleteContents();
                sel.getRangeAt(i).collapse(true);
            }
        }
    };
    Select.prototype.removeNode = function (node) {
        if (!Dom_1.Dom.isOrContains(this.jodit.editor, node, true)) {
            throw helpers_1.error("Selection.removeNode can remove only editor's children");
        }
        Dom_1.Dom.safeRemove(node);
        this.jodit.events.fire('afterRemoveNode', node);
    };
    Select.prototype.insertCursorAtPoint = function (x, y) {
        var _this = this;
        this.removeMarkers();
        try {
            var rng_1 = this.createRange();
            (function () {
                if (_this.doc.caretPositionFromPoint) {
                    var caret = _this.doc.caretPositionFromPoint(x, y);
                    if (caret) {
                        rng_1.setStart(caret.offsetNode, caret.offset);
                        return;
                    }
                }
                if (_this.doc.caretRangeFromPoint) {
                    var caret = _this.doc.caretRangeFromPoint(x, y);
                    rng_1.setStart(caret.startContainer, caret.startOffset);
                }
            })();
            rng_1.collapse(true);
            this.selectRange(rng_1);
            return true;
        }
        catch (_a) { }
        return false;
    };
    Select.prototype.removeMarkers = function () {
        selector_1.$$('span[data-' + consts.MARKER_CLASS + ']', this.area).forEach(Dom_1.Dom.safeRemove);
    };
    Select.prototype.marker = function (atStart, range) {
        if (atStart === void 0) { atStart = false; }
        var newRange = null;
        if (range) {
            newRange = range.cloneRange();
            newRange.collapse(atStart);
        }
        var marker = this.jodit.create.inside.span();
        marker.id =
            consts.MARKER_CLASS +
                '_' +
                +new Date() +
                '_' +
                ('' + Math.random()).slice(2);
        marker.style.lineHeight = '0';
        marker.style.display = 'none';
        marker.setAttribute('data-' + consts.MARKER_CLASS, atStart ? 'start' : 'end');
        marker.appendChild(this.jodit.create.inside.text(consts.INVISIBLE_SPACE));
        if (newRange) {
            if (Dom_1.Dom.isOrContains(this.area, atStart ? newRange.startContainer : newRange.endContainer)) {
                newRange.insertNode(marker);
            }
        }
        return marker;
    };
    Select.prototype.restore = function (selectionInfo) {
        var _this = this;
        if (selectionInfo === void 0) { selectionInfo = []; }
        if (Array.isArray(selectionInfo)) {
            var range_2 = false;
            selectionInfo.forEach(function (selection) {
                var end = _this.area.querySelector('#' + selection.endId), start = _this.area.querySelector('#' + selection.startId);
                if (!start) {
                    return;
                }
                range_2 = _this.createRange();
                if (selection.collapsed || !end) {
                    var previousNode = start.previousSibling;
                    if (Dom_1.Dom.isText(previousNode)) {
                        range_2.setStart(previousNode, previousNode.nodeValue
                            ? previousNode.nodeValue.length
                            : 0);
                    }
                    else {
                        range_2.setStartBefore(start);
                    }
                    Dom_1.Dom.safeRemove(start);
                    range_2.collapse(true);
                }
                else {
                    range_2.setStartAfter(start);
                    Dom_1.Dom.safeRemove(start);
                    range_2.setEndBefore(end);
                    Dom_1.Dom.safeRemove(end);
                }
            });
            if (range_2) {
                this.selectRange(range_2);
            }
        }
    };
    Select.prototype.save = function () {
        var sel = this.sel;
        if (!sel || !sel.rangeCount) {
            return [];
        }
        var info = [], length = sel.rangeCount, ranges = [];
        var i, start, end;
        for (i = 0; i < length; i += 1) {
            ranges[i] = sel.getRangeAt(i);
            if (ranges[i].collapsed) {
                start = this.marker(true, ranges[i]);
                info[i] = {
                    startId: start.id,
                    collapsed: true,
                    startMarker: start.outerHTML
                };
            }
            else {
                start = this.marker(true, ranges[i]);
                end = this.marker(false, ranges[i]);
                info[i] = {
                    startId: start.id,
                    endId: end.id,
                    collapsed: false,
                    startMarker: start.outerHTML,
                    endMarker: end.outerHTML
                };
            }
        }
        sel.removeAllRanges();
        for (i = length - 1; i >= 0; --i) {
            var startElm = this.doc.getElementById(info[i].startId);
            if (startElm) {
                if (info[i].collapsed) {
                    ranges[i].setStartAfter(startElm);
                    ranges[i].collapse(true);
                }
                else {
                    ranges[i].setStartBefore(startElm);
                    if (info[i].endId) {
                        var endElm = this.doc.getElementById(info[i].endId);
                        if (endElm) {
                            ranges[i].setEndAfter(endElm);
                        }
                    }
                }
            }
            try {
                sel.addRange(ranges[i].cloneRange());
            }
            catch (_a) { }
        }
        return info;
    };
    Select.prototype.isCollapsed = function () {
        var sel = this.sel;
        for (var r = 0; sel && r < sel.rangeCount; r += 1) {
            if (!sel.getRangeAt(r).collapsed) {
                return false;
            }
        }
        return true;
    };
    Select.prototype.isFocused = function () {
        return (this.doc.hasFocus &&
            this.doc.hasFocus() &&
            this.area === this.doc.activeElement);
    };
    Select.prototype.current = function (checkChild) {
        if (checkChild === void 0) { checkChild = true; }
        if (this.jodit.getRealMode() === consts.MODE_WYSIWYG) {
            var sel = this.sel;
            if (sel && sel.rangeCount > 0) {
                var range = sel.getRangeAt(0);
                var node = range.startContainer, rightMode_1 = false;
                var child = function (nd) {
                    return rightMode_1 ? nd.lastChild : nd.firstChild;
                };
                if (!Dom_1.Dom.isText(node)) {
                    node = range.startContainer.childNodes[range.startOffset];
                    if (!node) {
                        node =
                            range.startContainer.childNodes[range.startOffset - 1];
                        rightMode_1 = true;
                    }
                    if (node && sel.isCollapsed && !Dom_1.Dom.isText(node)) {
                        if (!rightMode_1 && Dom_1.Dom.isText(node.previousSibling)) {
                            node = node.previousSibling;
                        }
                        else if (checkChild) {
                            var current = child(node);
                            while (current) {
                                if (current && Dom_1.Dom.isText(current)) {
                                    node = current;
                                    break;
                                }
                                current = child(current);
                            }
                        }
                    }
                    if (node && !sel.isCollapsed && !Dom_1.Dom.isText(node)) {
                        var leftChild = node, rightChild = node;
                        do {
                            leftChild = leftChild.firstChild;
                            rightChild = rightChild.lastChild;
                        } while (leftChild &&
                            rightChild &&
                            !Dom_1.Dom.isText(leftChild));
                        if (leftChild === rightChild &&
                            leftChild &&
                            Dom_1.Dom.isText(leftChild)) {
                            node = leftChild;
                        }
                    }
                }
                if (node && Dom_1.Dom.isOrContains(this.area, node)) {
                    return node;
                }
            }
        }
        return false;
    };
    Select.prototype.insertNode = function (node, insertCursorAfter, fireChange) {
        if (insertCursorAfter === void 0) { insertCursorAfter = true; }
        if (fireChange === void 0) { fireChange = true; }
        var _a;
        this.errorNode(node);
        if (!this.isFocused() && this.jodit.isEditorMode()) {
            this.focus();
        }
        var sel = this.sel;
        if (!this.isCollapsed()) {
            this.jodit.execCommand('Delete');
        }
        if (sel && sel.rangeCount) {
            var range = sel.getRangeAt(0);
            if (Dom_1.Dom.isOrContains(this.area, range.commonAncestorContainer)) {
                if (/^(BR|HR|IMG|VIDEO)$/i.test(range.startContainer.nodeName) &&
                    range.collapsed) {
                    (_a = range.startContainer.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(node, range.startContainer);
                }
                else {
                    range.deleteContents();
                    range.insertNode(node);
                }
            }
            else {
                this.area.appendChild(node);
            }
        }
        else {
            this.area.appendChild(node);
        }
        if (insertCursorAfter) {
            if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                node.lastChild && this.setCursorAfter(node.lastChild);
            }
            else {
                this.setCursorAfter(node);
            }
        }
        if (fireChange && this.jodit.events) {
            this.jodit.events.fire('synchro');
        }
        if (this.jodit.events) {
            this.jodit.events.fire('afterInsertNode', node);
        }
    };
    Select.prototype.insertHTML = function (html) {
        if (html === '') {
            return;
        }
        var node = this.jodit.create.inside.div(), fragment = this.jodit.create.inside.fragment();
        var lastChild, lastEditorElement;
        if (!this.isFocused() && this.jodit.isEditorMode()) {
            this.focus();
        }
        if (!Dom_1.Dom.isNode(html, this.win)) {
            node.innerHTML = html.toString();
        }
        else {
            node.appendChild(html);
        }
        if (!this.jodit.isEditorMode() &&
            this.jodit.events.fire('insertHTML', node.innerHTML) === false) {
            return;
        }
        lastChild = node.lastChild;
        if (!lastChild) {
            return;
        }
        while (node.firstChild) {
            lastChild = node.firstChild;
            fragment.appendChild(node.firstChild);
        }
        this.insertNode(fragment, false);
        if (lastChild) {
            this.setCursorAfter(lastChild);
        }
        else {
            this.setCursorIn(fragment);
        }
        lastEditorElement = this.area.lastChild;
        while (Dom_1.Dom.isText(lastEditorElement) &&
            lastEditorElement.previousSibling &&
            lastEditorElement.nodeValue &&
            /^\s*$/.test(lastEditorElement.nodeValue)) {
            lastEditorElement = lastEditorElement.previousSibling;
        }
        if (lastChild) {
            if (lastEditorElement &&
                lastChild === lastEditorElement &&
                Dom_1.Dom.isElement(lastChild)) {
                this.area.appendChild(this.jodit.create.inside.element('br'));
            }
            this.setCursorAfter(lastChild);
        }
    };
    Select.prototype.insertImage = function (url, styles, defaultWidth) {
        var image = typeof url === 'string'
            ? this.jodit.create.inside.element('img')
            : url;
        if (typeof url === 'string') {
            image.setAttribute('src', url);
        }
        if (defaultWidth !== null) {
            var dw = defaultWidth.toString();
            if (dw &&
                'auto' !== dw &&
                String(dw).indexOf('px') < 0 &&
                String(dw).indexOf('%') < 0) {
                dw += 'px';
            }
            css_1.css(image, 'width', dw);
        }
        if (styles && typeof styles === 'object') {
            css_1.css(image, styles);
        }
        var onload = function () {
            if (image.naturalHeight < image.offsetHeight ||
                image.naturalWidth < image.offsetWidth) {
                image.style.width = '';
                image.style.height = '';
            }
            image.removeEventListener('load', onload);
        };
        image.addEventListener('load', onload);
        if (image.complete) {
            onload();
        }
        var result = this.insertNode(image);
        this.jodit.events.fire('afterInsertImage', image);
        return result;
    };
    Select.prototype.setCursorAfter = function (node) {
        var _this = this;
        this.errorNode(node);
        if (!Dom_1.Dom.up(node, function (elm) {
            return elm === _this.area || (elm && elm.parentNode === _this.area);
        }, this.area)) {
            throw helpers_1.error('Node element must be in editor');
        }
        var range = this.createRange();
        var fakeNode = false;
        if (!Dom_1.Dom.isText(node)) {
            fakeNode = this.jodit.create.inside.text(consts.INVISIBLE_SPACE);
            range.setStartAfter(node);
            range.insertNode(fakeNode);
            range.selectNode(fakeNode);
        }
        else {
            range.setEnd(node, node.nodeValue !== null ? node.nodeValue.length : 0);
        }
        range.collapse(false);
        this.selectRange(range);
        return fakeNode;
    };
    Select.prototype.cursorInTheEdge = function (start, parentBlock) {
        var _a;
        var end = !start, range = (_a = this.sel) === null || _a === void 0 ? void 0 : _a.getRangeAt(0), current = this.current(false);
        if (!range ||
            !current ||
            !Dom_1.Dom.isOrContains(parentBlock, current, true)) {
            return null;
        }
        var container = start ? range.startContainer : range.endContainer;
        var offset = start ? range.startOffset : range.endOffset;
        var check = function (elm) {
            return elm && elm.nodeName !== 'BR' && !Dom_1.Dom.isEmptyTextNode(elm);
        };
        if (Dom_1.Dom.isText(container)) {
            var text = container.nodeValue || '';
            if (end && text.replace(constants_1.INVISIBLE_SPACE_REG_EXP_END, '').length > offset) {
                return false;
            }
            var inv = constants_1.INVISIBLE_SPACE_REG_EXP_START.exec(text);
            if (start &&
                ((inv && inv[0].length < offset) || (!inv && offset > 0))) {
                return false;
            }
        }
        else {
            var children = Array.from(container.childNodes);
            if (end) {
                if (children.slice(offset).some(check)) {
                    return false;
                }
            }
            else {
                if (children.slice(0, offset).some(check)) {
                    return false;
                }
            }
        }
        var next = start
            ? Dom_1.Dom.prev(current, check, parentBlock)
            : Dom_1.Dom.next(current, check, parentBlock);
        return !next;
    };
    Select.prototype.cursorOnTheLeft = function (parentBlock) {
        return this.cursorInTheEdge(true, parentBlock);
    };
    Select.prototype.cursorOnTheRight = function (parentBlock) {
        return this.cursorInTheEdge(false, parentBlock);
    };
    Select.prototype.setCursorBefore = function (node) {
        var _this = this;
        this.errorNode(node);
        if (!Dom_1.Dom.up(node, function (elm) {
            return elm === _this.area || (elm && elm.parentNode === _this.area);
        }, this.area)) {
            throw helpers_1.error('Node element must be in editor');
        }
        var range = this.createRange();
        var fakeNode = false;
        if (!Dom_1.Dom.isText(node)) {
            fakeNode = this.jodit.create.inside.text(consts.INVISIBLE_SPACE);
            range.setStartBefore(node);
            range.collapse(true);
            range.insertNode(fakeNode);
            range.selectNode(fakeNode);
        }
        else {
            range.setStart(node, node.nodeValue !== null ? node.nodeValue.length : 0);
        }
        range.collapse(true);
        this.selectRange(range);
        return fakeNode;
    };
    Select.prototype.setCursorIn = function (node, inStart) {
        var _this = this;
        if (inStart === void 0) { inStart = false; }
        this.errorNode(node);
        if (!Dom_1.Dom.up(node, function (elm) {
            return elm === _this.area || (elm && elm.parentNode === _this.area);
        }, this.area)) {
            throw helpers_1.error('Node element must be in editor');
        }
        var range = this.createRange();
        var start = node, last = node;
        do {
            if (Dom_1.Dom.isText(start)) {
                break;
            }
            last = start;
            start = inStart ? start.firstChild : start.lastChild;
        } while (start);
        if (!start) {
            var fakeNode = this.jodit.create.inside.text(consts.INVISIBLE_SPACE);
            if (!/^(img|br|input)$/i.test(last.nodeName)) {
                last.appendChild(fakeNode);
                last = fakeNode;
            }
            else {
                start = last;
            }
        }
        range.selectNodeContents(start || last);
        range.collapse(inStart);
        this.selectRange(range);
        return last;
    };
    Select.prototype.selectRange = function (range) {
        var sel = this.sel;
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
        this.jodit.events.fire('changeSelection');
    };
    Select.prototype.select = function (node, inward) {
        var _this = this;
        if (inward === void 0) { inward = false; }
        this.errorNode(node);
        if (!Dom_1.Dom.up(node, function (elm) {
            return elm === _this.area || (elm && elm.parentNode === _this.area);
        }, this.area)) {
            throw helpers_1.error('Node element must be in editor');
        }
        var range = this.createRange();
        range[inward ? 'selectNodeContents' : 'selectNode'](node);
        this.selectRange(range);
    };
    Select.prototype.getHTML = function () {
        var sel = this.sel;
        if (sel && sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            var clonedSelection = range.cloneContents();
            var div = this.jodit.create.inside.div();
            div.appendChild(clonedSelection);
            return div.innerHTML;
        }
        return '';
    };
    Select.prototype.wrapInTag = function (tagOrCallback) {
        var _this = this;
        selector_1.$$('*[style*=font-size]', this.area).forEach(function (elm) {
            elm.style &&
                elm.style.fontSize &&
                elm.setAttribute('data-font-size', elm.style.fontSize.toString());
        });
        this.doc.execCommand('fontsize', false, '7');
        selector_1.$$('*[data-font-size]', this.area).forEach(function (elm) {
            var fontSize = elm.getAttribute('data-font-size');
            if (elm.style && fontSize) {
                elm.style.fontSize = fontSize;
                elm.removeAttribute('data-font-size');
            }
        });
        var result = [];
        selector_1.$$('font[size="7"]', this.area).forEach(function (font) {
            try {
                if (checker_1.isFunction(tagOrCallback)) {
                    tagOrCallback(font);
                }
                else {
                    result.push(Dom_1.Dom.replace(font, tagOrCallback, _this.jodit.create.inside));
                }
            }
            finally {
                if (font.parentNode) {
                    Dom_1.Dom.unwrap(font);
                }
            }
        });
        return result;
    };
    Select.prototype.applyCSS = function (cssRules, nodeName, options) {
        var _this = this;
        if (nodeName === void 0) { nodeName = 'span'; }
        var WRAP = 1, UNWRAP = 0, defaultTag = 'SPAN', FONT = 'FONT';
        var mode;
        var findNextCondition = function (elm) {
            return elm !== null &&
                !Dom_1.Dom.isEmptyTextNode(elm) &&
                !_this.isMarker(elm);
        };
        var checkCssRulesFor = function (elm) {
            return (elm.nodeName !== FONT &&
                Dom_1.Dom.isElement(elm) &&
                ((checker_1.isPlainObject(options) &&
                    each_1.each(options, function (cssPropertyKey, cssPropertyValues) {
                        var value = css_1.css(elm, cssPropertyKey, undefined, true);
                        return (value !== null &&
                            value !== '' &&
                            cssPropertyValues.indexOf(value.toString().toLowerCase()) !== -1);
                    })) ||
                    (typeof options === 'function' && options(_this.jodit, elm))));
        };
        var isSuitElement = function (elm) {
            if (!elm) {
                return false;
            }
            var reg = RegExp('^' + elm.nodeName + '$', 'i');
            return ((reg.test(nodeName) ||
                !!(options && checkCssRulesFor(elm))) &&
                findNextCondition(elm));
        };
        var toggleStyles = function (elm) {
            if (isSuitElement(elm)) {
                if (elm.nodeName === defaultTag && cssRules) {
                    Object.keys(cssRules).forEach(function (rule) {
                        if (mode === UNWRAP ||
                            css_1.css(elm, rule) ===
                                normalize_1.normilizeCSSValue(rule, cssRules[rule])) {
                            css_1.css(elm, rule, '');
                            if (mode === undefined) {
                                mode = UNWRAP;
                            }
                        }
                        else {
                            css_1.css(elm, rule, cssRules[rule]);
                            if (mode === undefined) {
                                mode = WRAP;
                            }
                        }
                    });
                }
                if (!Dom_1.Dom.isBlock(elm, _this.win) &&
                    (!elm.getAttribute('style') || elm.nodeName !== defaultTag)) {
                    Dom_1.Dom.unwrap(elm);
                    if (mode === undefined) {
                        mode = UNWRAP;
                    }
                }
            }
        };
        if (this.isCollapsed()) {
            var clearStyle = false;
            if (this.current() &&
                Dom_1.Dom.closest(this.current(), nodeName, this.area)) {
                clearStyle = true;
                var closest = Dom_1.Dom.closest(this.current(), nodeName, this.area);
                if (closest) {
                    this.setCursorAfter(closest);
                }
            }
            if (nodeName.toUpperCase() === defaultTag || !clearStyle) {
                var node = this.jodit.create.inside.element(nodeName);
                node.appendChild(this.jodit.create.inside.text(consts.INVISIBLE_SPACE));
                this.insertNode(node, false, false);
                if (nodeName.toUpperCase() === defaultTag && cssRules) {
                    css_1.css(node, cssRules);
                }
                this.setCursorIn(node);
                return;
            }
        }
        var selInfo = this.save();
        normalize_1.normalizeNode(this.area.firstChild);
        this.wrapInTag(function (font) {
            if (!Dom_1.Dom.next(font, findNextCondition, font.parentNode) &&
                !Dom_1.Dom.prev(font, findNextCondition, font.parentNode) &&
                isSuitElement(font.parentNode) &&
                font.parentNode !== _this.area &&
                (!Dom_1.Dom.isBlock(font.parentNode, _this.win) ||
                    consts.IS_BLOCK.test(nodeName))) {
                toggleStyles(font.parentNode);
                return;
            }
            if (font.firstChild &&
                !Dom_1.Dom.next(font.firstChild, findNextCondition, font) &&
                !Dom_1.Dom.prev(font.firstChild, findNextCondition, font) &&
                isSuitElement(font.firstChild)) {
                toggleStyles(font.firstChild);
                return;
            }
            if (Dom_1.Dom.closest(font, isSuitElement, _this.area)) {
                var leftRange = _this.createRange(), wrapper = Dom_1.Dom.closest(font, isSuitElement, _this.area);
                leftRange.setStartBefore(wrapper);
                leftRange.setEndBefore(font);
                var leftFragment = leftRange.extractContents();
                if ((!leftFragment.textContent ||
                    !string_1.trim(leftFragment.textContent).length) &&
                    leftFragment.firstChild) {
                    Dom_1.Dom.unwrap(leftFragment.firstChild);
                }
                if (wrapper.parentNode) {
                    wrapper.parentNode.insertBefore(leftFragment, wrapper);
                }
                leftRange.setStartAfter(font);
                leftRange.setEndAfter(wrapper);
                var rightFragment = leftRange.extractContents();
                if ((!rightFragment.textContent ||
                    !string_1.trim(rightFragment.textContent).length) &&
                    rightFragment.firstChild) {
                    Dom_1.Dom.unwrap(rightFragment.firstChild);
                }
                Dom_1.Dom.after(wrapper, rightFragment);
                toggleStyles(wrapper);
                return;
            }
            var needUnwrap = [];
            var firstElementSuit;
            if (font.firstChild) {
                Dom_1.Dom.find(font.firstChild, function (elm) {
                    if (elm && isSuitElement(elm)) {
                        if (firstElementSuit === undefined) {
                            firstElementSuit = true;
                        }
                        needUnwrap.push(elm);
                    }
                    else {
                        if (firstElementSuit === undefined) {
                            firstElementSuit = false;
                        }
                    }
                    return false;
                }, font, true);
            }
            needUnwrap.forEach(Dom_1.Dom.unwrap);
            if (!firstElementSuit) {
                if (mode === undefined) {
                    mode = WRAP;
                }
                if (mode === WRAP) {
                    css_1.css(Dom_1.Dom.replace(font, nodeName, _this.jodit.create.inside), cssRules && nodeName.toUpperCase() === defaultTag
                        ? cssRules
                        : {});
                }
            }
        });
        this.restore(selInfo);
    };
    Select.prototype.splitSelection = function (currentBox) {
        if (!this.isCollapsed()) {
            return null;
        }
        var leftRange = this.createRange();
        var range = this.range;
        leftRange.setStartBefore(currentBox);
        var cursorOnTheRight = this.cursorOnTheRight(currentBox);
        var cursorOnTheLeft = this.cursorOnTheLeft(currentBox);
        if (cursorOnTheRight || cursorOnTheLeft) {
            var br = this.jodit.create.inside.element('br');
            range.insertNode(br);
            var clearBR = function (start, getNext) {
                var next = getNext(start);
                while (next) {
                    var nextSib = getNext(next);
                    if (next &&
                        (next.nodeName === 'BR' || Dom_1.Dom.isEmptyTextNode(next))) {
                        Dom_1.Dom.safeRemove(next);
                    }
                    else {
                        break;
                    }
                    next = nextSib;
                }
            };
            clearBR(br, function (n) { return n.nextSibling; });
            clearBR(br, function (n) { return n.previousSibling; });
            if (cursorOnTheRight) {
                leftRange.setEndBefore(br);
                range.setEndBefore(br);
            }
            else {
                leftRange.setEndAfter(br);
                range.setEndAfter(br);
            }
        }
        else {
            leftRange.setEnd(range.startContainer, range.startOffset);
        }
        var fragment = leftRange.extractContents();
        if (currentBox.parentNode) {
            try {
                currentBox.parentNode.insertBefore(fragment, currentBox);
            }
            catch (_a) { }
        }
        return currentBox.previousElementSibling;
    };
    return Select;
}());
exports.Select = Select;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUsePersistentStorage = (function () {
    var canUse = function () {
        var tmpKey = '___Jodit___' + Math.random().toString();
        try {
            localStorage.setItem(tmpKey, '1');
            var result_1 = localStorage.getItem(tmpKey) === '1';
            localStorage.removeItem(tmpKey);
            return result_1;
        }
        catch (_a) { }
        return false;
    };
    var result;
    return function () {
        if (result === undefined) {
            result = canUse();
        }
        return result;
    };
})();
var LocalStorageProvider = (function () {
    function LocalStorageProvider(rootKey) {
        this.rootKey = rootKey;
    }
    LocalStorageProvider.prototype.set = function (key, value) {
        try {
            var buffer = localStorage.getItem(this.rootKey);
            var json = buffer ? JSON.parse(buffer) : {};
            json[key] = value;
            localStorage.setItem(this.rootKey, JSON.stringify(json));
        }
        catch (_a) { }
    };
    LocalStorageProvider.prototype.get = function (key) {
        try {
            var buffer = localStorage.getItem(this.rootKey);
            var json = buffer ? JSON.parse(buffer) : {};
            return json[key] !== undefined ? json[key] : null;
        }
        catch (_a) { }
    };
    LocalStorageProvider.prototype.exists = function (key) {
        return this.get(key) !== null;
    };
    LocalStorageProvider.prototype.clear = function () {
        try {
            localStorage.removeItem(this.rootKey);
        }
        catch (_a) { }
    };
    return LocalStorageProvider;
}());
exports.LocalStorageProvider = LocalStorageProvider;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryStorageProvider = (function () {
    function MemoryStorageProvider() {
        this.data = new Map();
    }
    MemoryStorageProvider.prototype.set = function (key, value) {
        this.data.set(key, value);
    };
    MemoryStorageProvider.prototype.get = function (key) {
        return this.data.get(key);
    };
    MemoryStorageProvider.prototype.exists = function (key) {
        return this.data.has(key);
    };
    MemoryStorageProvider.prototype.clear = function () {
        this.data.clear();
    };
    return MemoryStorageProvider;
}());
exports.MemoryStorageProvider = MemoryStorageProvider;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright 2013-2020 Valeriy Chupurnov https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var store_1 = __webpack_require__(124);
var helpers_1 = __webpack_require__(3);
var EventsNative = (function () {
    function EventsNative(doc) {
        var _this = this;
        this.__key = '__JoditEventsNativeNamespaces';
        this.doc = document;
        this.__stopped = [];
        this.prepareEvent = function (event) {
            if (event.cancelBubble) {
                return;
            }
            if (event.type.match(/^touch/) &&
                event.changedTouches &&
                event.changedTouches.length) {
                ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function (key) {
                    Object.defineProperty(event, key, {
                        value: event.changedTouches[0][key],
                        configurable: true,
                        enumerable: true
                    });
                });
            }
            if (!event.originalEvent) {
                event.originalEvent = event;
            }
            if (event.type === 'paste' &&
                event.clipboardData === undefined &&
                _this.doc.defaultView.clipboardData) {
                Object.defineProperty(event, 'clipboardData', {
                    get: function () {
                        return _this.doc.defaultView.clipboardData;
                    },
                    configurable: true,
                    enumerable: true
                });
            }
        };
        this.current = [];
        this.isDestructed = false;
        if (doc) {
            this.doc = doc;
        }
        this.__key += new Date().getTime();
    }
    EventsNative.prototype.eachEvent = function (events, callback) {
        var _this = this;
        var eventParts = events.split(/[\s,]+/);
        eventParts.forEach(function (eventNameSpace) {
            var eventAndNameSpace = eventNameSpace.split('.');
            var namespace = eventAndNameSpace[1] || store_1.defaultNameSpace;
            callback.call(_this, eventAndNameSpace[0], namespace);
        });
    };
    EventsNative.prototype.getStore = function (subject) {
        if (!subject) {
            throw helpers_1.error('Need subject');
        }
        if (subject[this.__key] === undefined) {
            var store = new store_1.EventHandlersStore();
            Object.defineProperty(subject, this.__key, {
                enumerable: false,
                configurable: true,
                value: store
            });
        }
        return subject[this.__key];
    };
    EventsNative.prototype.clearStore = function (subject) {
        if (subject[this.__key] !== undefined) {
            delete subject[this.__key];
        }
    };
    EventsNative.prototype.triggerNativeEvent = function (element, event) {
        var evt = this.doc.createEvent('HTMLEvents');
        if (typeof event === 'string') {
            evt.initEvent(event, true, true);
        }
        else {
            evt.initEvent(event.type, event.bubbles, event.cancelable);
            [
                'screenX',
                'screenY',
                'clientX',
                'clientY',
                'target',
                'srcElement',
                'currentTarget',
                'timeStamp',
                'which',
                'keyCode'
            ].forEach(function (property) {
                Object.defineProperty(evt, property, {
                    value: event[property],
                    enumerable: true
                });
            });
            Object.defineProperty(evt, 'originalEvent', {
                value: event,
                enumerable: true
            });
        }
        element.dispatchEvent(evt);
    };
    EventsNative.prototype.removeStop = function (currentBlocks) {
        if (currentBlocks) {
            var index = this.__stopped.indexOf(currentBlocks);
            index !== -1 && this.__stopped.splice(index, 1);
        }
    };
    EventsNative.prototype.isStopped = function (currentBlocks) {
        return (currentBlocks !== undefined &&
            this.__stopped.indexOf(currentBlocks) !== -1);
    };
    EventsNative.prototype.on = function (subjectOrEvents, eventsOrCallback, handlerOrSelector, selector, onTop) {
        var _this = this;
        if (onTop === void 0) { onTop = false; }
        var subject = typeof subjectOrEvents === 'string' ? this : subjectOrEvents;
        var events = typeof eventsOrCallback === 'string'
            ? eventsOrCallback
            : subjectOrEvents;
        var callback = handlerOrSelector;
        if (callback === undefined && typeof eventsOrCallback === 'function') {
            callback = eventsOrCallback;
        }
        var store = this.getStore(subject);
        if (typeof events !== 'string' || events === '') {
            throw helpers_1.error('Need events names');
        }
        if (typeof callback !== 'function') {
            throw helpers_1.error('Need event handler');
        }
        if (Array.isArray(subject)) {
            subject.forEach(function (subj) {
                _this.on(subj, events, callback, selector);
            });
            return this;
        }
        var isDOMElement = typeof subject.addEventListener === 'function', self = this;
        var syntheticCallback = function (event) {
            return callback && callback.apply(this, arguments);
        };
        if (isDOMElement) {
            syntheticCallback = function (event) {
                self.prepareEvent(event);
                if (callback && callback.call(this, event) === false) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    return false;
                }
                return;
            };
            if (selector) {
                syntheticCallback = function (event) {
                    self.prepareEvent(event);
                    var node = event.target;
                    while (node && node !== this) {
                        if (node.matches(selector)) {
                            Object.defineProperty(event, 'target', {
                                value: node,
                                configurable: true,
                                enumerable: true
                            });
                            if (callback &&
                                callback.call(node, event) === false) {
                                event.preventDefault();
                                return false;
                            }
                            return;
                        }
                        node = node.parentNode;
                    }
                };
            }
        }
        this.eachEvent(events, function (event, namespace) {
            if (event === '') {
                throw helpers_1.error('Need event name');
            }
            if (store.indexOf(event, namespace, callback) === false) {
                var block = {
                    event: event,
                    originalCallback: callback,
                    syntheticCallback: syntheticCallback
                };
                store.set(event, namespace, block, onTop);
                if (isDOMElement) {
                    subject.addEventListener(event, syntheticCallback, false);
                }
            }
        });
        return this;
    };
    EventsNative.prototype.off = function (subjectOrEvents, eventsOrCallback, handler) {
        var _this = this;
        var subject = typeof subjectOrEvents === 'string' ? this : subjectOrEvents;
        var events = typeof eventsOrCallback === 'string'
            ? eventsOrCallback
            : subjectOrEvents;
        var store = this.getStore(subject);
        var callback = handler;
        if (typeof events !== 'string' || !events) {
            store.namespaces().forEach(function (namespace) {
                _this.off(subject, '.' + namespace);
            });
            this.clearStore(subject);
            return this;
        }
        if (callback === undefined && typeof eventsOrCallback === 'function') {
            callback = eventsOrCallback;
        }
        var isDOMElement = typeof subject.removeEventListener === 'function', removeEventListener = function (block) {
            if (isDOMElement) {
                subject.removeEventListener(block.event, block.syntheticCallback, false);
            }
        }, removeCallbackFromNameSpace = function (event, namespace) {
            if (event !== '') {
                var blocks = store.get(event, namespace);
                if (blocks && blocks.length) {
                    if (typeof callback !== 'function') {
                        blocks.forEach(removeEventListener);
                        blocks.length = 0;
                    }
                    else {
                        var index = store.indexOf(event, namespace, callback);
                        if (index !== false) {
                            removeEventListener(blocks[index]);
                            blocks.splice(index, 1);
                        }
                    }
                }
            }
            else {
                store.events(namespace).forEach(function (eventName) {
                    if (eventName !== '') {
                        removeCallbackFromNameSpace(eventName, namespace);
                    }
                });
            }
        };
        this.eachEvent(events, function (event, namespace) {
            if (namespace === store_1.defaultNameSpace) {
                store.namespaces().forEach(function (name) {
                    removeCallbackFromNameSpace(event, name);
                });
            }
            else {
                removeCallbackFromNameSpace(event, namespace);
            }
        });
        return this;
    };
    EventsNative.prototype.stopPropagation = function (subjectOrEvents, eventsList) {
        var _this = this;
        var subject = typeof subjectOrEvents === 'string' ? this : subjectOrEvents;
        var events = typeof subjectOrEvents === 'string'
            ? subjectOrEvents
            : eventsList;
        if (typeof events !== 'string') {
            throw helpers_1.error('Need event names');
        }
        var store = this.getStore(subject);
        this.eachEvent(events, function (event, namespace) {
            var blocks = store.get(event, namespace);
            if (blocks) {
                _this.__stopped.push(blocks);
            }
            if (namespace === store_1.defaultNameSpace) {
                store
                    .namespaces(true)
                    .forEach(function (ns) {
                    return _this.stopPropagation(subject, event + '.' + ns);
                });
            }
        });
    };
    EventsNative.prototype.fire = function (subjectOrEvents, eventsList) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = undefined, result_value;
        var subject = typeof subjectOrEvents === 'string' ? this : subjectOrEvents;
        var events = typeof subjectOrEvents === 'string'
            ? subjectOrEvents
            : eventsList;
        var argumentsList = typeof subjectOrEvents === 'string' ? tslib_1.__spreadArrays([eventsList], args) : args;
        var isDOMElement = typeof subject.dispatchEvent === 'function';
        if (!isDOMElement && typeof events !== 'string') {
            throw helpers_1.error('Need events names');
        }
        var store = this.getStore(subject);
        if (typeof events !== 'string' && isDOMElement) {
            this.triggerNativeEvent(subject, eventsList);
        }
        else {
            this.eachEvent(events, function (event, namespace) {
                if (isDOMElement) {
                    _this.triggerNativeEvent(subject, event);
                }
                else {
                    var blocks_1 = store.get(event, namespace);
                    if (blocks_1) {
                        try {
                            blocks_1.every(function (block) {
                                if (_this.isStopped(blocks_1)) {
                                    return false;
                                }
                                _this.current.push(event);
                                result_value = block.syntheticCallback.apply(subject, argumentsList);
                                _this.current.pop();
                                if (result_value !== undefined) {
                                    result = result_value;
                                }
                                return true;
                            });
                        }
                        finally {
                            _this.removeStop(blocks_1);
                        }
                    }
                    if (namespace === store_1.defaultNameSpace && !isDOMElement) {
                        store
                            .namespaces()
                            .filter(function (ns) { return ns !== namespace; })
                            .forEach(function (ns) {
                            var result_second = _this.fire.apply(_this, tslib_1.__spreadArrays([
                                subject,
                                event + '.' + ns
                            ], argumentsList));
                            if (result_second !== undefined) {
                                result = result_second;
                            }
                        });
                    }
                }
            });
        }
        return result;
    };
    EventsNative.prototype.destruct = function () {
        if (!this.isDestructed) {
            return;
        }
        this.isDestructed = true;
        this.off(this);
        this.getStore(this).clear();
        delete this[this.__key];
    };
    return EventsNative;
}());
exports.EventsNative = EventsNative;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var isPlainObject_1 = __webpack_require__(22);
var each_1 = __webpack_require__(24);
var asArray_1 = __webpack_require__(41);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var Create = (function () {
    function Create(jodit, insideCreator) {
        if (insideCreator === void 0) { insideCreator = false; }
        this.jodit = jodit;
        this.insideCreator = insideCreator;
        this.applyAttributes = function (elm, attrs) {
            each_1.each(attrs, function (key, value) {
                if (isPlainObject_1.isPlainObject(value) && key === 'style') {
                    helpers_1.css(elm, value);
                }
                else {
                    elm.setAttribute(key, value.toString());
                }
            });
        };
        if (!insideCreator) {
            this.inside = new Create(jodit, true);
        }
    }
    Object.defineProperty(Create.prototype, "doc", {
        get: function () {
            return this.insideCreator && helpers_1.isJoditObject(this.jodit)
                ? this.jodit.editorDocument
                : this.jodit.ownerDocument;
        },
        enumerable: true,
        configurable: true
    });
    Create.prototype.element = function (tagName, childrenOrAttributes, children) {
        var _this = this;
        var elm = this.doc.createElement(tagName.toLowerCase());
        if (this.insideCreator) {
            var ca = this.jodit.options.createAttributes;
            if (ca && ca[tagName.toLowerCase()]) {
                var attrs = ca[tagName.toLowerCase()];
                if (helpers_1.isFunction(attrs)) {
                    attrs(elm);
                }
                else if (isPlainObject_1.isPlainObject(attrs)) {
                    this.applyAttributes(elm, attrs);
                }
            }
        }
        if (childrenOrAttributes) {
            if (isPlainObject_1.isPlainObject(childrenOrAttributes)) {
                this.applyAttributes(elm, childrenOrAttributes);
            }
            else {
                children = childrenOrAttributes;
            }
        }
        if (children) {
            asArray_1.asArray(children).forEach(function (child) {
                return elm.appendChild(typeof child === 'string' ? _this.fromHTML(child) : child);
            });
        }
        return elm;
    };
    Create.prototype.div = function (className, childrenOrAttributes, children) {
        var div = this.element('div', childrenOrAttributes, children);
        if (className) {
            div.className = className;
        }
        return div;
    };
    Create.prototype.span = function (className, childrenOrAttributes, children) {
        var span = this.element('span', childrenOrAttributes, children);
        if (className) {
            span.className = className;
        }
        return span;
    };
    Create.prototype.a = function (className, childrenOrAttributes, children) {
        var a = this.element('a', childrenOrAttributes, children);
        if (className) {
            a.className = className;
        }
        return a;
    };
    Create.prototype.text = function (value) {
        return this.doc.createTextNode(value);
    };
    Create.prototype.fragment = function () {
        return this.doc.createDocumentFragment();
    };
    Create.prototype.fromHTML = function (html, refsToggleElement) {
        var div = this.div();
        div.innerHTML = html.toString();
        var child = div.firstChild !== div.lastChild || !div.firstChild
            ? div
            : div.firstChild;
        Dom_1.Dom.safeRemove(child);
        if (refsToggleElement) {
            var refElements_1 = helpers_1.refs(child);
            Object.keys(refsToggleElement).forEach(function (key) {
                var elm = refElements_1[key];
                if (elm && refsToggleElement[key] === false) {
                    Dom_1.Dom.hide(elm);
                }
            });
        }
        return child;
    };
    return Create;
}());
exports.Create = Create;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(7);
var Dom_1 = __webpack_require__(1);
var ProgressBar = (function (_super) {
    tslib_1.__extends(ProgressBar, _super);
    function ProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressBar = _this.jodit.create.div('jodit_progressbar', _this.jodit.create.div());
        return _this;
    }
    ProgressBar.prototype.show = function () {
        this.jodit.workplace.appendChild(this.progressBar);
        return this;
    };
    ProgressBar.prototype.hide = function () {
        Dom_1.Dom.safeRemove(this.progressBar);
        return this;
    };
    ProgressBar.prototype.progress = function (percentage) {
        this.progressBar.style.width = percentage.toFixed(2) + '%';
        return this;
    };
    ProgressBar.prototype.destruct = function () {
        this.hide();
        return _super.prototype.destruct.call(this);
    };
    return ProgressBar;
}(Component_1.Component));
exports.ProgressBar = ProgressBar;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(3);
var PluginSystem = (function () {
    function PluginSystem() {
        this.items = new Map();
    }
    PluginSystem.prototype.add = function (name, plugin) {
        this.items.set(name.toLowerCase(), plugin);
    };
    PluginSystem.prototype.get = function (name) {
        return this.items.get(name.toLowerCase());
    };
    PluginSystem.prototype.remove = function (name) {
        this.items.delete(name.toLowerCase());
    };
    PluginSystem.prototype.init = function (jodit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var extrasList, disableList, doneList, promiseList, plugins, pluginsMap, makeAndInit, needLoadExtras, e_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        extrasList = jodit.options.extraPlugins.map(function (s) {
                            return helpers_1.isString(s) ? { name: s.toLowerCase() } : s;
                        }), disableList = helpers_1.splitArray(jodit.options.disablePlugins).map(function (s) {
                            return s.toLowerCase();
                        }), doneList = [], promiseList = {}, plugins = [], pluginsMap = {}, makeAndInit = function (plugin, name) {
                            if (disableList.includes(name) ||
                                doneList.includes(name) ||
                                promiseList[name]) {
                                return;
                            }
                            var instance = PluginSystem.makePluginInstance(jodit, plugin);
                            _this.initOrWait(jodit, name, instance, doneList, promiseList);
                            plugins.push(instance);
                            pluginsMap[name] = instance;
                        };
                        if (!(extrasList && extrasList.length)) return [3, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        needLoadExtras = extrasList.filter(function (extra) { return !_this.items.has(extra.name); });
                        if (!needLoadExtras.length) return [3, 3];
                        return [4, this.load(jodit, needLoadExtras)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3, 5];
                    case 5:
                        if (jodit.isInDestruct) {
                            return [2];
                        }
                        this.items.forEach(makeAndInit);
                        this.addListenerOnBeforeDestruct(jodit, plugins);
                        jodit.__plugins = pluginsMap;
                        return [2];
                }
            });
        });
    };
    PluginSystem.makePluginInstance = function (jodit, plugin) {
        return helpers_1.isFunction(plugin) ? new plugin(jodit) : plugin;
    };
    PluginSystem.prototype.initOrWait = function (jodit, pluginName, instance, doneList, promiseList) {
        var initPlugin = function (name, plugin) {
            if (plugin.hasStyle) {
                PluginSystem.loadStyle(jodit, name);
            }
            if (helpers_1.isInitable(plugin)) {
                if (!plugin.requires ||
                    !plugin.requires.length ||
                    plugin.requires.every(function (name) { return doneList.includes(name); })) {
                    plugin.init(jodit);
                    doneList.push(name);
                }
                else {
                    promiseList[name] = plugin;
                    return false;
                }
            }
            else {
                doneList.push(name);
            }
            return true;
        };
        initPlugin(pluginName, instance);
        Object.keys(promiseList).forEach(function (name) {
            var plugin = promiseList[name];
            if (!plugin) {
                return;
            }
            if (initPlugin(name, instance)) {
                promiseList[name] = undefined;
                delete promiseList[name];
            }
        });
    };
    PluginSystem.prototype.addListenerOnBeforeDestruct = function (jodit, plugins) {
        jodit.events.on('beforeDestruct', function () {
            plugins.forEach(function (instance) {
                if (helpers_1.isDestructable(instance)) {
                    instance.destruct(jodit);
                }
            });
            plugins.length = 0;
            delete jodit.__plugins;
        });
    };
    PluginSystem.prototype.load = function (jodit, pluginList) {
        var reflect = function (p) {
            return p.then(function (v) { return ({ v: v, status: 'fulfilled' }); }, function (e) { return ({ e: e, status: 'rejected' }); });
        };
        return Promise.all(pluginList.map(function (extra) {
            var url = extra.url || PluginSystem.getFullUrl(jodit, name, true);
            return reflect(helpers_1.appendScriptAsync(jodit, url));
        }));
    };
    PluginSystem.loadStyle = function (jodit, pluginName) {
        return helpers_1.appendStyleAsync(jodit, PluginSystem.getFullUrl(jodit, pluginName, false));
    };
    PluginSystem.getFullUrl = function (jodit, name, js) {
        return (jodit.basePath +
            'plugins/' +
            name +
            '/' +
            name +
            '.' +
            (js ? 'js' : 'css'));
    };
    return PluginSystem;
}());
exports.PluginSystem = PluginSystem;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var add_new_line_1 = __webpack_require__(150);
exports.addNewLine = add_new_line_1.addNewLine;
var autofocus_1 = __webpack_require__(151);
exports.autofocus = autofocus_1.autofocus;
var backspace_1 = __webpack_require__(152);
exports.backspace = backspace_1.backspace;
var bold_1 = __webpack_require__(153);
exports.bold = bold_1.bold;
var clean_html_1 = __webpack_require__(154);
exports.cleanHtml = clean_html_1.cleanHtml;
var clipboard_1 = __webpack_require__(67);
exports.clipboard = clipboard_1.clipboard;
exports.paste = clipboard_1.paste;
exports.pasteStorage = clipboard_1.pasteStorage;
var color_1 = __webpack_require__(158);
exports.color = color_1.color;
var drag_and_drop_1 = __webpack_require__(159);
exports.DragAndDrop = drag_and_drop_1.DragAndDrop;
var drag_and_drop_element_1 = __webpack_require__(160);
exports.DragAndDropElement = drag_and_drop_element_1.DragAndDropElement;
var enter_1 = __webpack_require__(161);
exports.enter = enter_1.enter;
var error_messages_1 = __webpack_require__(162);
exports.errorMessages = error_messages_1.errorMessages;
var font_1 = __webpack_require__(163);
exports.font = font_1.font;
var format_block_1 = __webpack_require__(164);
exports.formatBlock = format_block_1.formatBlock;
var fullsize_1 = __webpack_require__(165);
exports.fullsize = fullsize_1.fullsize;
var hotkeys_1 = __webpack_require__(166);
exports.hotkeys = hotkeys_1.hotkeys;
var iframe_1 = __webpack_require__(167);
exports.iframe = iframe_1.iframe;
var image_processor_1 = __webpack_require__(168);
exports.imageProcessor = image_processor_1.imageProcessor;
var image_properties_1 = __webpack_require__(169);
exports.imageProperties = image_properties_1.imageProperties;
var indent_1 = __webpack_require__(170);
exports.indent = indent_1.indent;
var inline_popup_1 = __webpack_require__(171);
exports.inlinePopup = inline_popup_1.inlinePopup;
var justify_1 = __webpack_require__(172);
exports.justify = justify_1.justify;
var limit_1 = __webpack_require__(173);
exports.limit = limit_1.limit;
var link_1 = __webpack_require__(174);
exports.link = link_1.link;
var media_1 = __webpack_require__(175);
exports.media = media_1.media;
var mobile_1 = __webpack_require__(176);
exports.mobile = mobile_1.mobile;
var orderedlist_1 = __webpack_require__(177);
exports.orderedlist = orderedlist_1.orderedlist;
var placeholder_1 = __webpack_require__(178);
exports.placeholder = placeholder_1.placeholder;
var redoundo_1 = __webpack_require__(179);
exports.redoundo = redoundo_1.redoundo;
var resizer_1 = __webpack_require__(180);
exports.resizer = resizer_1.resizer;
var search_1 = __webpack_require__(181);
exports.search = search_1.search;
var size_1 = __webpack_require__(182);
exports.size = size_1.size;
var source_1 = __webpack_require__(183);
exports.source = source_1.source;
var stat_1 = __webpack_require__(190);
exports.stat = stat_1.stat;
var sticky_1 = __webpack_require__(191);
exports.sticky = sticky_1.sticky;
var symbols_1 = __webpack_require__(192);
exports.symbols = symbols_1.symbols;
var table_keyboard_navigation_1 = __webpack_require__(193);
exports.tableKeyboardNavigation = table_keyboard_navigation_1.tableKeyboardNavigation;
var table_1 = __webpack_require__(194);
exports.table = table_1.TableProcessor;
var tooltip_1 = __webpack_require__(195);
exports.tooltip = tooltip_1.tooltip;
var xpath_1 = __webpack_require__(196);
exports.xpath = xpath_1.xpath;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(68), exports);
tslib_1.__exportStar(__webpack_require__(69), exports);
tslib_1.__exportStar(__webpack_require__(156), exports);
__webpack_require__(157);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var html_1 = __webpack_require__(33);
var paste_1 = __webpack_require__(69);
Config_1.Config.prototype.controls.cut = {
    command: 'cut',
    isDisable: function (editor) { return editor.selection.isCollapsed(); },
    tooltip: 'Cut selection'
};
Config_1.Config.prototype.controls.copy = {
    command: 'copy',
    isDisable: function (editor) { return editor.selection.isCollapsed(); },
    tooltip: 'Copy selection'
};
exports.pluginKey = 'clipboard';
var clipboard = (function () {
    function clipboard() {
    }
    clipboard.prototype.init = function (editor) {
        editor.events
            .off("copy." + exports.pluginKey + " cut." + exports.pluginKey)
            .on("copy." + exports.pluginKey + " cut." + exports.pluginKey, function (event) {
            var _a, _b;
            var selectedText = editor.selection.getHTML();
            var clipboardData = paste_1.getDataTransfer(event) ||
                paste_1.getDataTransfer(editor.editorWindow) ||
                paste_1.getDataTransfer(event.originalEvent);
            if (clipboardData) {
                clipboardData.setData(constants_1.TEXT_PLAIN, html_1.stripTags(selectedText));
                clipboardData.setData(constants_1.TEXT_HTML, selectedText);
            }
            editor.buffer.set(exports.pluginKey, selectedText);
            if (event.type === 'cut') {
                editor.selection.remove();
                editor.selection.focus();
            }
            event.preventDefault();
            (_b = (_a = editor) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.fire('afterCopy', selectedText);
        });
    };
    clipboard.prototype.destruct = function (editor) {
        var _a, _b, _c, _d;
        (_b = (_a = editor) === null || _a === void 0 ? void 0 : _a.buffer) === null || _b === void 0 ? void 0 : _b.set(exports.pluginKey, '');
        (_d = (_c = editor) === null || _c === void 0 ? void 0 : _c.events) === null || _d === void 0 ? void 0 : _d.off('.' + exports.pluginKey);
    };
    return clipboard;
}());
exports.clipboard = clipboard;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var dialog_1 = __webpack_require__(13);
var helpers_1 = __webpack_require__(3);
var Dom_1 = __webpack_require__(1);
var nl2br_1 = __webpack_require__(155);
var cut_1 = __webpack_require__(68);
Config_1.Config.prototype.askBeforePasteHTML = true;
Config_1.Config.prototype.processPasteHTML = true;
Config_1.Config.prototype.askBeforePasteFromWord = true;
Config_1.Config.prototype.processPasteFromWord = true;
Config_1.Config.prototype.nl2brInPlainText = true;
Config_1.Config.prototype.defaultActionOnPaste = constants_1.INSERT_AS_HTML;
exports.getDataTransfer = function (event) {
    if (event.clipboardData) {
        return event.clipboardData;
    }
    try {
        return event.dataTransfer || new DataTransfer();
    }
    catch (_a) {
        return null;
    }
};
Config_1.Config.prototype.controls.paste = {
    tooltip: 'Paste from clipboard',
    exec: function (editor) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var text, error, items, textBlob, _a, _b, value;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        editor.selection.focus();
                        text = '', error = true;
                        if (error) {
                            text = editor.buffer.get(cut_1.pluginKey) || '';
                            error = text.length === 0;
                        }
                        if (!(error && navigator.clipboard)) return [3, 11];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        return [4, navigator.clipboard.read()];
                    case 2:
                        items = _c.sent();
                        if (!(items && items.length)) return [3, 5];
                        return [4, items[0].getType('text/plain')];
                    case 3:
                        textBlob = _c.sent();
                        return [4, new Response(textBlob).text()];
                    case 4:
                        text = _c.sent();
                        _c.label = 5;
                    case 5: return [3, 7];
                    case 6:
                        _a = _c.sent();
                        return [3, 7];
                    case 7:
                        if (!error) return [3, 11];
                        _c.label = 8;
                    case 8:
                        _c.trys.push([8, 10, , 11]);
                        return [4, navigator.clipboard.readText()];
                    case 9:
                        text = _c.sent();
                        error = false;
                        return [3, 11];
                    case 10:
                        _b = _c.sent();
                        return [3, 11];
                    case 11:
                        if (error) {
                            value = editor.value;
                            editor.editorDocument.execCommand('paste');
                            error = value !== editor.value;
                        }
                        if (text) {
                            editor.selection.insertHTML(text);
                        }
                        else {
                            if (error) {
                                dialog_1.Alert(editor.i18n("Your browser doesn't support direct access to the clipboard."), function () {
                                    editor.selection.focus();
                                });
                            }
                        }
                        return [2];
                }
            });
        });
    }
};
function paste(editor) {
    var opt = editor.options, clearOrKeep = function (msg, title, callback, clearButton, clear2Button) {
        if (clearButton === void 0) { clearButton = 'Clean'; }
        if (clear2Button === void 0) { clear2Button = 'Insert only Text'; }
        var _a;
        if (editor.events &&
            editor.events.fire('beforeOpenPasteDialog', msg, title, callback, clearButton, clear2Button) === false) {
            return;
        }
        var dialog = dialog_1.Confirm("<div style=\"word-break: normal; white-space: normal\">" + msg + "</div>", title, callback);
        editor.markOwner(dialog.container);
        var keep = dialog.create.fromHTML("<a href=\"javascript:void(0)\" class=\"jodit_button jodit_button_primary\"><span>" + editor.i18n('Keep') + "</span></a>");
        var clear = dialog.create.fromHTML("<a href=\"javascript:void(0)\" class=\"jodit_button\"><span>" + editor.i18n(clearButton) + "</span></a>");
        var clear2 = dialog.create.fromHTML("<a href=\"javascript:void(0)\" class=\"jodit_button\"><span>" + editor.i18n(clear2Button) + "</span></a>");
        var cancel = dialog.create.fromHTML("<a href=\"javascript:void(0)\" class=\"jodit_button\"><span>" + editor.i18n('Cancel') + "</span></a>");
        editor.events.on(keep, 'click', function () {
            dialog.close();
            callback && callback(true);
        });
        editor.events.on(clear, 'click', function () {
            dialog.close();
            callback && callback(false);
        });
        editor.events.on(clear2, 'click', function () {
            dialog.close();
            callback && callback(0);
        });
        editor.events.on(cancel, 'click', function () {
            dialog.close();
        });
        dialog.setFooter([keep, clear, clear2Button ? clear2 : '', cancel]);
        (_a = editor.events) === null || _a === void 0 ? void 0 : _a.fire('afterOpenPasteDialog', dialog, msg, title, callback, clearButton, clear2Button);
        return dialog;
    };
    var insertByType = function (html, subtype) {
        if (typeof html === 'string') {
            switch (subtype) {
                case constants_1.INSERT_CLEAR_HTML:
                    html = helpers_1.cleanFromWord(html);
                    break;
                case constants_1.INSERT_ONLY_TEXT:
                    html = helpers_1.stripTags(html);
                    break;
                case constants_1.INSERT_AS_TEXT:
                    html = helpers_1.htmlspecialchars(html);
                    break;
                default:
            }
        }
        if (typeof html === 'string') {
            editor.buffer.set(cut_1.pluginKey, html);
        }
        editor.selection.insertHTML(html);
    };
    var insertHTML = function (html, event) {
        var buffer = editor.buffer.get(cut_1.pluginKey);
        if (helpers_1.isHTML(html) && buffer !== trimFragment(html)) {
            html = trimFragment(html);
            var pasteHTMLByType_1 = function (insertType) {
                if (event.type === 'drop') {
                    editor.selection.insertCursorAtPoint(event.clientX, event.clientY);
                }
                insertByType(html, insertType);
                editor.setEditorValue();
            };
            if (opt.askBeforePasteHTML) {
                clearOrKeep(editor.i18n('Your code is similar to HTML. Keep as HTML?'), editor.i18n('Paste as HTML'), function (agree) {
                    var insertType = constants_1.INSERT_AS_HTML;
                    if (agree === false) {
                        insertType = constants_1.INSERT_AS_TEXT;
                    }
                    if (agree === 0) {
                        insertType = constants_1.INSERT_ONLY_TEXT;
                    }
                    pasteHTMLByType_1(insertType);
                }, 'Insert as Text');
            }
            else {
                pasteHTMLByType_1(opt.defaultActionOnPaste);
            }
            return false;
        }
    };
    var trimFragment = function (html) {
        var start = html.search(/<!--StartFragment-->/i);
        if (start !== -1) {
            html = html.substr(start + 20);
        }
        var end = html.search(/<!--EndFragment-->/i);
        if (end !== -1) {
            html = html.substr(0, end);
        }
        return html;
    };
    var beforePaste = function (event) {
        var dt = exports.getDataTransfer(event);
        if (!dt || !event || !dt.getData) {
            return;
        }
        if (dt.getData(constants_1.TEXT_HTML)) {
            var processHTMLData_1 = function (html) {
                var buffer = editor.buffer.get(cut_1.pluginKey);
                if (opt.processPasteHTML &&
                    helpers_1.isHTML(html) &&
                    buffer !== trimFragment(html)) {
                    if (opt.processPasteFromWord && helpers_1.isHTMLFromWord(html)) {
                        var pasteFromWordByType_1 = function (method) {
                            var _a;
                            if (method === constants_1.INSERT_AS_HTML) {
                                html = helpers_1.applyStyles(html);
                                if (opt.beautifyHTML) {
                                    var value = (_a = editor.events) === null || _a === void 0 ? void 0 : _a.fire('beautifyHTML', html);
                                    if (helpers_1.isString(value)) {
                                        html = value;
                                    }
                                }
                            }
                            if (method === constants_1.INSERT_AS_TEXT) {
                                html = helpers_1.cleanFromWord(html);
                            }
                            if (method === constants_1.INSERT_ONLY_TEXT) {
                                html = helpers_1.stripTags(helpers_1.cleanFromWord(html));
                            }
                            editor.selection.insertHTML(html);
                            editor.setEditorValue();
                        };
                        if (opt.askBeforePasteFromWord) {
                            clearOrKeep(editor.i18n('The pasted content is coming from a Microsoft Word/Excel document. ' +
                                'Do you want to keep the format or clean it up?'), editor.i18n('Word Paste Detected'), function (agree) {
                                var insertType = constants_1.INSERT_AS_HTML;
                                if (agree === false) {
                                    insertType = constants_1.INSERT_AS_TEXT;
                                }
                                if (agree === 0) {
                                    insertType = constants_1.INSERT_ONLY_TEXT;
                                }
                                pasteFromWordByType_1(insertType);
                            });
                        }
                        else {
                            pasteFromWordByType_1(opt.defaultActionOnPaste);
                        }
                    }
                    else {
                        insertHTML(html, event);
                    }
                    return false;
                }
            };
            if (dt.types && Array.from(dt.types).indexOf('text/html') !== -1) {
                var html = dt.getData(constants_1.TEXT_HTML);
                return processHTMLData_1(html);
            }
            if (event.type !== 'drop') {
                var div_1 = editor.create.div('', {
                    tabindex: -1,
                    contenteditable: true,
                    style: {
                        left: -9999,
                        top: 0,
                        width: 0,
                        height: '100%',
                        lineHeight: '140%',
                        overflow: 'hidden',
                        position: 'fixed',
                        zIndex: 2147483647,
                        wordBreak: 'break-all'
                    }
                });
                editor.container.appendChild(div_1);
                var selData_1 = editor.selection.save();
                div_1.focus();
                var tick_1 = 0;
                var removeFakeFocus_1 = function () {
                    Dom_1.Dom.safeRemove(div_1);
                    editor.selection && editor.selection.restore(selData_1);
                };
                var waitData_1 = function () {
                    tick_1 += 1;
                    if (div_1.childNodes && div_1.childNodes.length > 0) {
                        var pastedData = div_1.innerHTML;
                        removeFakeFocus_1();
                        if (processHTMLData_1(pastedData) !== false) {
                            editor.selection.insertHTML(pastedData);
                        }
                        return;
                    }
                    if (tick_1 < 5) {
                        editor.async.setTimeout(waitData_1, 20);
                    }
                    else {
                        removeFakeFocus_1();
                    }
                };
                waitData_1();
            }
        }
        if (dt.getData(constants_1.TEXT_PLAIN)) {
            return insertHTML(dt.getData(constants_1.TEXT_PLAIN), event);
        }
    };
    editor.events
        .off('paste.paste')
        .on('paste.paste', function (event) {
        if (beforePaste(event) === false ||
            editor.events.fire('beforePaste', event) === false) {
            event.preventDefault();
            return false;
        }
        var dt = exports.getDataTransfer(event);
        if (event && dt) {
            var types = dt.types;
            var types_str_1 = '';
            if (Array.isArray(types) || helpers_1.type(types) === 'domstringlist') {
                for (var i = 0; i < types.length; i += 1) {
                    types_str_1 += types[i] + ';';
                }
            }
            else {
                types_str_1 = (types || constants_1.TEXT_PLAIN).toString() + ';';
            }
            var getText = function () {
                if (/text\/html/i.test(types_str_1)) {
                    return dt.getData('text/html');
                }
                if (/text\/rtf/i.test(types_str_1) && helpers_1.browser('safari')) {
                    return dt.getData('text/rtf');
                }
                if (/text\/plain/i.test(types_str_1) && !helpers_1.browser('mozilla')) {
                    return dt.getData(constants_1.TEXT_PLAIN);
                }
                if (/text/i.test(types_str_1) && constants_1.IS_IE) {
                    return dt.getData(constants_1.TEXT_PLAIN);
                }
                return '';
            };
            var clipboard_html = getText();
            if (Dom_1.Dom.isNode(clipboard_html, editor.editorWindow) ||
                helpers_1.trim(clipboard_html) !== '') {
                clipboard_html = trimFragment(clipboard_html);
                var buffer = editor.buffer.get(cut_1.pluginKey);
                if (buffer !== clipboard_html) {
                    var result = editor.events.fire('processPaste', event, clipboard_html, types_str_1);
                    if (result !== undefined) {
                        clipboard_html = result;
                    }
                }
                if (typeof clipboard_html === 'string' ||
                    Dom_1.Dom.isNode(clipboard_html, editor.editorWindow)) {
                    if (event.type === 'drop') {
                        editor.selection.insertCursorAtPoint(event.clientX, event.clientY);
                    }
                    insertByType(clipboard_html, opt.defaultActionOnPaste);
                }
                event.preventDefault();
                event.stopPropagation();
            }
        }
        if (editor.events.fire('afterPaste', event) === false) {
            return false;
        }
    });
    if (opt.nl2brInPlainText) {
        editor.events
            .off('processPaste.paste')
            .on('processPaste.paste', function (event, text, type) {
            if (type === constants_1.TEXT_PLAIN + ';' && !helpers_1.isHTML(text)) {
                return nl2br_1.nl2br(text);
            }
        });
    }
}
exports.paste = paste;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var SourceEditor = (function () {
    function SourceEditor(jodit, container, toWYSIWYG, fromWYSIWYG) {
        this.jodit = jodit;
        this.container = container;
        this.toWYSIWYG = toWYSIWYG;
        this.fromWYSIWYG = fromWYSIWYG;
        this.className = '';
        this.isReady = false;
    }
    SourceEditor.prototype.onReady = function () {
        this.isReady = true;
        this.jodit.events.fire(this, 'ready');
    };
    SourceEditor.prototype.onReadyAlways = function (onReady) {
        var _a;
        if (!this.isReady) {
            (_a = this.jodit.events) === null || _a === void 0 ? void 0 : _a.on(this, 'ready', onReady);
        }
        else {
            onReady();
        }
    };
    return SourceEditor;
}());
exports.SourceEditor = SourceEditor;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dialog_1 = __webpack_require__(16);
var icon_1 = __webpack_require__(5);
exports.Promt = function (msg, title, callback, placeholder, defaultValue) {
    var dialog = new dialog_1.Dialog(), cancelButton = dialog.create.fromHTML('<a href="javascript:void(0)" style="float:right;" class="jodit_button">' +
        icon_1.ToolbarIcon.getIcon('cancel') +
        '<span>' +
        Jodit_1.Jodit.prototype.i18n('Cancel') +
        '</span></a>'), okButton = dialog.create.fromHTML('<a href="javascript:void(0)" style="float:left;" class="jodit_button">' +
        icon_1.ToolbarIcon.getIcon('check') +
        '<span>' +
        Jodit_1.Jodit.prototype.i18n('Ok') +
        '</span></a>'), form = dialog.create.element('form', {
        class: 'jodit_prompt'
    }), inputElement = dialog.create.element('input', {
        autofocus: true,
        class: 'jodit_input'
    }), labelElement = dialog.create.element('label');
    if (typeof title === 'function') {
        callback = title;
        title = undefined;
    }
    if (placeholder) {
        inputElement.setAttribute('placeholder', placeholder);
    }
    labelElement.appendChild(dialog.create.text(msg));
    form.appendChild(labelElement);
    form.appendChild(inputElement);
    cancelButton.addEventListener('click', dialog.close, false);
    var onclick = function () {
        if (!callback ||
            typeof callback !== 'function' ||
            callback(inputElement.value) !== false) {
            dialog.close();
        }
    };
    okButton.addEventListener('click', onclick);
    form.addEventListener('submit', function () {
        onclick();
        return false;
    });
    dialog.setFooter([okButton, cancelButton]);
    dialog.open(form, title || '&nbsp;', true, true);
    inputElement.focus();
    if (defaultValue !== undefined && defaultValue.length) {
        inputElement.value = defaultValue;
        inputElement.select();
    }
    return dialog;
};
var Jodit_1 = __webpack_require__(9);


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var dialog_1 = __webpack_require__(16);
var icon_1 = __webpack_require__(5);
exports.Confirm = function (msg, title, callback) {
    var dialog = new dialog_1.Dialog(), $div = dialog.create.fromHTML('<form class="jodit_prompt"></form>'), $label = dialog.create.element('label');
    if (typeof title === 'function') {
        callback = title;
        title = undefined;
    }
    $label.appendChild(dialog.create.fromHTML(msg));
    $div.appendChild($label);
    var $cancel = dialog.create.fromHTML('<a href="javascript:void(0)" style="float:right;" class="jodit_button">' +
        icon_1.ToolbarIcon.getIcon('cancel') +
        '<span>' +
        Jodit_1.Jodit.prototype.i18n('Cancel') +
        '</span>' +
        '</a>');
    $cancel.addEventListener('click', function () {
        if (callback) {
            callback(false);
        }
        dialog.close();
    });
    var onok = function () {
        if (callback) {
            callback(true);
        }
        dialog.close();
    };
    var $ok = dialog.create.fromHTML('<a href="javascript:void(0)" style="float:left;" class="jodit_button">' +
        icon_1.ToolbarIcon.getIcon('check') +
        '<span>' +
        Jodit_1.Jodit.prototype.i18n('Yes') +
        '</span>' +
        '</a>');
    $ok.addEventListener('click', onok);
    $div.addEventListener('submit', function () {
        onok();
        return false;
    });
    dialog.setFooter([$ok, $cancel]);
    dialog.open($div, title || '&nbsp;', true, true);
    $ok.focus();
    return dialog;
};
var Jodit_1 = __webpack_require__(9);


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(74);


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(75);
if ( true && typeof window !== 'undefined') {
    __webpack_require__(76);
}
var Jodit_1 = __webpack_require__(9);
var index_1 = __webpack_require__(131);
var consts = __webpack_require__(2);
var Modules = __webpack_require__(28);
var Plugins = __webpack_require__(66);
var Icons = __webpack_require__(206);
var Config_1 = __webpack_require__(4);
var icon_1 = __webpack_require__(5);
Object.keys(consts).forEach(function (key) {
    Jodit_1.Jodit[key] = consts[key];
});
var esFilter = function (key) { return key !== '__esModule'; };
Object.keys(Icons)
    .filter(esFilter)
    .forEach(function (key) {
    icon_1.ToolbarIcon.setIcon(key.replace('_', '-'), Icons[key]);
});
Object.keys(Modules)
    .filter(esFilter)
    .forEach(function (key) {
    Jodit_1.Jodit.modules[key] = Modules[key];
});
['Confirm', 'Alert', 'Promt'].forEach(function (key) {
    Jodit_1.Jodit[key] = Modules[key];
});
Object.keys(Plugins)
    .filter(esFilter)
    .forEach(function (key) {
    Jodit_1.Jodit.plugins.add(key, Plugins[key]);
});
Object.keys(index_1.default)
    .filter(esFilter)
    .forEach(function (key) {
    Jodit_1.Jodit.lang[key] = index_1.default[key];
});
Jodit_1.Jodit.defaultOptions = Config_1.Config.defaultOptions;
Config_1.OptionsDefault.prototype = Jodit_1.Jodit.defaultOptions;
exports.Jodit = Jodit_1.Jodit;
exports.default = Jodit_1.Jodit;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(77);
__webpack_require__(78);
(function (e) {
    e.matches ||
        (e.matches =
            e.matchesSelector !== undefined
                ? e.matchesSelector
                : function (selector) {
                    if (!this.ownerDocument) {
                        return [];
                    }
                    var matches = this.ownerDocument.querySelectorAll(selector), th = this;
                    return Array.prototype.some.call(matches, function (elm) {
                        return elm === th;
                    });
                });
})(Element.prototype);
if (!Array.from) {
    Array.from = function (object) {
        'use strict';
        return [].slice.call(object);
    };
}
if (!Array.prototype.includes) {
    Array.prototype.includes = function (value) {
        return this.indexOf(value) > -1;
    };
}
if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}


/***/ }),
/* 77 */
/***/ (function(module, exports) {

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
	|| document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length
		;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
		;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
	;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index
	;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add"
	;

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
		// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
		if (ex.number === undefined || ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(window.self));

}

// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');

module.exports = __webpack_require__(79).polyfill();


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(80), __webpack_require__(81)))

/***/ }),
/* 80 */
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
/* 81 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(83), exports);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
exports.cns = console;
function markDeprecated(method, names, ctx) {
    if (names === void 0) { names = ['']; }
    if (ctx === void 0) { ctx = null; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        exports.cns.warn("Method \"" + names[0] + "\" deprecated." + (names[1] ? " Use \"" + names[1] + "\" instead" : ''));
        return method.call.apply(method, tslib_1.__spreadArrays([ctx], args));
    };
}
exports.markDeprecated = markDeprecated;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.inArray = function (needle, haystack) { return haystack.indexOf(needle) !== -1; };


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitArray = function (a) {
    return typeof a === 'string' ? a.split(/[,\s]+/) : a;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
function setTimeout(callback, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (!timeout) {
        callback.call.apply(callback, tslib_1.__spreadArrays([null], args));
    }
    else {
        return window.setTimeout.apply(window, tslib_1.__spreadArrays([callback, timeout], args));
    }
    return 0;
}
exports.setTimeout = setTimeout;
function clearTimeout(timer) {
    window.clearTimeout(timer);
}
exports.clearTimeout = clearTimeout;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasBrowserColorPicker = function () {
    var supportsColor = true;
    try {
        var a = document.createElement("input");
        a.type = "color";
        supportsColor = a.type === "color" && typeof a.selectionStart !== "number";
    }
    catch (e) {
        supportsColor = false;
    }
    return supportsColor;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHTML = function (str) {
    return /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/m.test(str);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHTMLFromWord = function (data) {
    return (data.search(/<meta.*?Microsoft Excel\s[\d].*?>/) !== -1 ||
        data.search(/<meta.*?Microsoft Word\s[\d].*?>/) !== -1 ||
        (data.search(/style="[^"]*mso-/) !== -1 && data.search(/<font/) !== -1));
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_1 = __webpack_require__(44);
exports.isInitable = function (value) {
    return value && isFunction_1.isFunction(value.init);
};
exports.isDestructable = function (value) {
    return value && isFunction_1.isFunction(value.destruct);
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var isNumeric_1 = __webpack_require__(23);
exports.isInt = function (value) {
    if (typeof value === 'string' && isNumeric_1.isNumeric(value)) {
        value = parseFloat(value);
    }
    return typeof value === 'number' && Number.isFinite(value) && !(value % 1);
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLicense = function (license) {
    return typeof license === 'string' &&
        license.length === 32 &&
        /^[a-z0-9]+$/.test(license);
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = function (value) {
    return typeof value === 'string';
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isPromise(val) {
    return val && typeof val.then === 'function';
}
exports.isPromise = isPromise;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(96), exports);
tslib_1.__exportStar(__webpack_require__(47), exports);


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToRgb = function (hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Dom_1 = __webpack_require__(1);
var selector_1 = __webpack_require__(10);
var string_1 = __webpack_require__(8);
function normalizeCSS(s) {
    return s
        .replace(/mso-[a-z\-]+:[\s]*[^;]+;/gi, '')
        .replace(/mso-[a-z\-]+:[\s]*[^";]+$/gi, '')
        .replace(/border[a-z\-]*:[\s]*[^;]+;/gi, '')
        .replace(/([0-9.]+)(pt|cm)/gi, function (match, units, metrics) {
        switch (metrics.toLowerCase()) {
            case 'pt':
                return (parseFloat(units) * 1.328).toFixed(0) + 'px';
            case 'cm':
                return (parseFloat(units) * 0.02645833).toFixed(0) + 'px';
        }
        return match;
    });
}
exports.applyStyles = function (html) {
    if (html.indexOf('<html ') === -1) {
        return html;
    }
    html = html.substring(html.indexOf('<html '), html.length);
    html = html.substring(0, html.lastIndexOf('</html>') + '</html>'.length);
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    var convertedString = '', collection = [], rules = [];
    try {
        var iframeDoc = iframe.contentDocument ||
            (iframe.contentWindow ? iframe.contentWindow.document : null);
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(html);
            iframeDoc.close();
            if (iframeDoc.styleSheets.length) {
                rules = iframeDoc.styleSheets[iframeDoc.styleSheets.length - 1].cssRules;
            }
            var _loop_1 = function (idx) {
                if (rules[idx].selectorText === '') {
                    return "continue";
                }
                collection = selector_1.$$(rules[idx].selectorText, iframeDoc.body);
                collection.forEach(function (elm) {
                    elm.style.cssText = normalizeCSS(rules[idx].style.cssText + ';' + elm.style.cssText);
                });
            };
            for (var idx = 0; idx < rules.length; idx += 1) {
                _loop_1(idx);
            }
            Dom_1.Dom.each(iframeDoc.body, function (node) {
                if (Dom_1.Dom.isElement(node)) {
                    var elm = node;
                    var css = elm.style.cssText;
                    if (css) {
                        elm.style.cssText = normalizeCSS(css);
                    }
                    if (elm.hasAttribute('lang')) {
                        elm.removeAttribute('lang');
                    }
                }
            });
            convertedString = iframeDoc.firstChild
                ? string_1.trim(iframeDoc.body.innerHTML)
                : '';
        }
    }
    catch (_a) {
    }
    finally {
        Dom_1.Dom.safeRemove(iframe);
    }
    if (convertedString) {
        html = convertedString;
    }
    return string_1.trim(html
        .replace(/<(\/)?(html|colgroup|col|o:p)[^>]*>/g, '')
        .replace(/<!--[^>]*>/g, ''));
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ucfirst = function (value) {
    if (!value.length) {
        return '';
    }
    return value[0].toUpperCase() + value.substr(1);
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var defaultLanguage_1 = __webpack_require__(34);
var __1 = __webpack_require__(3);
exports.sprintf = function (str, args) {
    if (!args || !args.length) {
        return str;
    }
    var reg = /%([sd])/g;
    var fnd = reg.exec(str);
    var res = str, i = 0;
    while (fnd && args[i] !== undefined) {
        res = res.replace(fnd[0], args[i].toString());
        i += 1;
        fnd = reg.exec(str);
    }
    return res;
};
exports.i18n = function (key, params, options, safe) {
    if (safe === void 0) { safe = "production" === 'production'; }
    var _a, _b;
    var debug = Boolean(options !== undefined && options.debugLanguage);
    var store;
    var parse = function (value) { return (params && params.length) ? exports.sprintf(value, params) : value; }, defaultLanguage = defaultLanguage_1.defaultLanguage(Config_1.Config.defaultOptions.language, Config_1.Config.defaultOptions.language), language = defaultLanguage_1.defaultLanguage((_a = options) === null || _a === void 0 ? void 0 : _a.language, defaultLanguage), tryGet = function (store) {
        if (!store) {
            return;
        }
        if (__1.isString(store[key])) {
            return parse(store[key]);
        }
        var lcKey = key.toLowerCase();
        if (__1.isString(store[lcKey])) {
            return parse(store[lcKey]);
        }
        var ucfKey = __1.ucfirst(key);
        if (__1.isString(store[ucfKey])) {
            return parse(store[ucfKey]);
        }
        return;
    };
    if (Jodit_1.Jodit.lang[language] !== undefined) {
        store = Jodit_1.Jodit.lang[language];
    }
    else {
        if (Jodit_1.Jodit.lang[defaultLanguage] !== undefined) {
            store = Jodit_1.Jodit.lang[defaultLanguage];
        }
        else {
            store = Jodit_1.Jodit.lang.en;
        }
    }
    var i18nOvr = (_b = options) === null || _b === void 0 ? void 0 : _b.i18n;
    if (i18nOvr && i18nOvr[language]) {
        var result_1 = tryGet(i18nOvr[language]);
        if (result_1) {
            return result_1;
        }
    }
    var result = tryGet(store);
    if (result) {
        return result;
    }
    if (Jodit_1.Jodit.lang.en && typeof Jodit_1.Jodit.lang.en[key] === 'string' && Jodit_1.Jodit.lang.en[key]) {
        return parse(Jodit_1.Jodit.lang.en[key]);
    }
    if (debug) {
        return '{' + key + '}';
    }
    if (!safe && language !== 'en') {
        throw new TypeError("i18n need \"" + key + "\" in \"" + language + "\"");
    }
    return parse(key);
};
var Jodit_1 = __webpack_require__(9);


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Dom_1 = __webpack_require__(1);
var string_1 = __webpack_require__(8);
exports.cleanFromWord = function (html) {
    if (html.indexOf('<html ') !== -1) {
        html = html.substring(html.indexOf('<html '), html.length);
        html = html.substring(0, html.lastIndexOf('</html>') + '</html>'.length);
    }
    var convertedString = '';
    try {
        var div = document.createElement('div');
        div.innerHTML = html;
        var marks_1 = [];
        if (div.firstChild) {
            Dom_1.Dom.all(div, function (node) {
                if (!node) {
                    return;
                }
                switch (node.nodeType) {
                    case Node.ELEMENT_NODE:
                        switch (node.nodeName) {
                            case 'STYLE':
                            case 'LINK':
                            case 'META':
                                marks_1.push(node);
                                break;
                            case 'W:SDT':
                            case 'W:SDTPR':
                            case 'FONT':
                                Dom_1.Dom.unwrap(node);
                                break;
                            default:
                                Array.from(node.attributes)
                                    .forEach(function (attr) {
                                    if ([
                                        'src',
                                        'href',
                                        'rel',
                                        'content',
                                    ].indexOf(attr.name.toLowerCase()) ===
                                        -1) {
                                        node.removeAttribute(attr.name);
                                    }
                                });
                        }
                        break;
                    case Node.TEXT_NODE:
                        break;
                    default:
                        marks_1.push(node);
                }
            });
        }
        marks_1.forEach(Dom_1.Dom.safeRemove);
        convertedString = div.innerHTML;
    }
    catch (e) { }
    if (convertedString) {
        html = convertedString;
    }
    html = html.split(/(\n)/).filter(string_1.trim).join('\n');
    return html
        .replace(/<(\/)?(html|colgroup|col|o:p)[^>]*>/g, '')
        .replace(/<!--[^>]*>/g, '');
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlspecialchars = function (html) {
    var tmp = document.createElement('div');
    tmp.textContent = html;
    return tmp.innerHTML;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var checker_1 = __webpack_require__(12);
var selector_1 = __webpack_require__(10);
var string_1 = __webpack_require__(8);
var Dom_1 = __webpack_require__(1);
exports.stripTags = function (html, doc) {
    if (doc === void 0) { doc = document; }
    var tmp = doc.createElement('div');
    if (checker_1.isString(html)) {
        tmp.innerHTML = html;
    }
    else {
        tmp.appendChild(html);
    }
    selector_1.$$('DIV, P, BR, H1, H2, H3, H4, H5, H6, HR', tmp).forEach(function (p) {
        var pr = p.parentNode;
        if (!pr) {
            return;
        }
        var nx = p.nextSibling;
        if (Dom_1.Dom.isText(nx) && /^\s/.test(nx.nodeValue || '')) {
            return;
        }
        if (nx) {
            pr.insertBefore(doc.createTextNode(' '), nx);
        }
    });
    return string_1.trim(tmp.innerText) || '';
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = __webpack_require__(8);
var constants_1 = __webpack_require__(2);
exports.normalizeKeyAliases = function (keys) {
    var memory = {};
    return keys
        .replace(/\+\+/g, '+add')
        .split(/[\s]*\+[\s]*/)
        .map(function (key) { return string_1.trim(key.toLowerCase()); })
        .map(function (key) { return constants_1.KEY_ALIASES[key] || key; })
        .sort()
        .filter(function (key) { return !memory[key] && key !== '' && (memory[key] = true); })
        .join('+');
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeLicense = function (license, count) {
    if (count === void 0) { count = 8; }
    var parts = [];
    while (license.length) {
        parts.push(license.substr(0, count));
        license = license.substr(count);
    }
    parts[1] = parts[1].replace(/./g, '*');
    parts[2] = parts[2].replace(/./g, '*');
    return parts.join('-');
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
exports.normalizeNode = function (node) {
    if (!node) {
        return;
    }
    if (Dom_1.Dom.isText(node) && node.nodeValue !== null && node.parentNode) {
        while (Dom_1.Dom.isText(node.nextSibling)) {
            if (node.nextSibling.nodeValue !== null) {
                node.nodeValue += node.nextSibling.nodeValue;
            }
            node.nodeValue = node.nodeValue.replace(constants_1.INVISIBLE_SPACE_REG_EXP, '');
            Dom_1.Dom.safeRemove(node.nextSibling);
        }
    }
    else {
        exports.normalizeNode(node.firstChild);
    }
    exports.normalizeNode(node.nextSibling);
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = __webpack_require__(8);
exports.normalizePath = function () {
    var path = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        path[_i] = arguments[_i];
    }
    return path
        .filter(function (part) { return string_1.trim(part).length; })
        .map(function (part, index) {
        part = part.replace(/([^:])[\\\/]+/g, '$1/');
        if (index) {
            part = part.replace(/^\//, '');
        }
        if (index !== path.length - 1) {
            part = part.replace(/\/$/, '');
        }
        return part;
    })
        .join('/');
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright 2013-2020 Valeriy Chupurnov https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRelativePath = function (path) {
    var sections = path.split('/'), builder = sections.reduce(function (builder, section) {
        switch (section) {
            case '': {
                break;
            }
            case '.': {
                break;
            }
            case '..': {
                builder.pop();
                break;
            }
            default: {
                builder.push(section);
                break;
            }
        }
        return builder;
    }, []);
    return builder.join('/') + (path.endsWith('/') ? '/' : '');
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSize = function (value) {
    if (/^[0-9]+$/.test(value.toString())) {
        return value + 'px';
    }
    return value.toString();
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeURL = function () {
    var urls = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        urls[_i] = arguments[_i];
    }
    return urls
        .filter(function (url) { return url.length; })
        .map(function (url) { return url.replace(/\/$/, ''); })
        .join('/')
        .replace(/([^:])[\\\/]+/g, '$1/');
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var colorToHex_1 = __webpack_require__(47);
var trim_1 = __webpack_require__(50);
exports.normalizeColor = function (colorInput) {
    var newcolor = ['#'];
    var color = colorToHex_1.colorToHex(colorInput);
    if (!color) {
        return false;
    }
    color = trim_1.trim(color.toUpperCase());
    color = color.substr(1);
    if (color.length === 3) {
        for (var i = 0; i < 3; i += 1) {
            newcolor.push(color[i]);
            newcolor.push(color[i]);
        }
        return newcolor.join('');
    }
    if (color.length > 6) {
        color = color.substr(0, 6);
    }
    return '#' + color;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentWidth = function (element, win) {
    var pi = function (value) { return parseInt(value, 10); }, style = win.getComputedStyle(element), width = element.offsetWidth, paddingLeft = pi(style.getPropertyValue('padding-left') || '0'), paddingRight = pi(style.getPropertyValue('padding-right') || '0');
    return width - paddingLeft - paddingRight;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.innerWidth = function (element, win) {
    var computedStyle = win.getComputedStyle(element);
    var elementWidth = element.clientWidth;
    elementWidth -=
        parseFloat(computedStyle.paddingLeft || '0') +
            parseFloat(computedStyle.paddingRight || '0');
    return elementWidth;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.offset = function (elm, jodit, doc, recurse) {
    if (recurse === void 0) { recurse = false; }
    var rect;
    try {
        rect = elm.getBoundingClientRect();
    }
    catch (e) {
        rect = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    }
    var body = doc.body, docElem = doc.documentElement || {
        clientTop: 0,
        clientLeft: 0,
        scrollTop: 0,
        scrollLeft: 0
    }, win = doc.defaultView || doc.parentWindow, scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop, scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft, clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0;
    var topValue, leftValue;
    var iframe = jodit.iframe;
    if (!recurse &&
        jodit &&
        jodit.options &&
        jodit.options.iframe &&
        iframe) {
        var _a = exports.offset(iframe, jodit, jodit.ownerDocument, true), top_1 = _a.top, left = _a.left;
        topValue = rect.top + top_1;
        leftValue = rect.left + left;
    }
    else {
        topValue = rect.top + scrollTop - clientTop;
        leftValue = rect.left + scrollLeft - clientLeft;
    }
    return {
        top: Math.round(topValue),
        left: Math.round(leftValue),
        width: rect.width,
        height: rect.height
    };
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var completeUrl_1 = __webpack_require__(52);
var checker_1 = __webpack_require__(12);
var alreadyLoadedList = new Map();
var cacheLoaders = function (loader) {
    return function (jodit, url) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var promise;
        return tslib_1.__generator(this, function (_a) {
            if (alreadyLoadedList.has(url)) {
                return [2, alreadyLoadedList.get(url)];
            }
            promise = loader(jodit, url);
            alreadyLoadedList.set(url, promise);
            return [2, promise];
        });
    }); };
};
exports.appendScript = function (jodit, url, callback) {
    var script = jodit.create.element('script');
    script.type = 'text/javascript';
    if (callback !== undefined) {
        script.addEventListener('load', callback);
    }
    if (!script.src) {
        script.src = completeUrl_1.completeUrl(url);
    }
    jodit.ownerDocument.body.appendChild(script);
    return {
        callback: callback,
        element: script
    };
};
exports.appendScriptAsync = cacheLoaders(function (jodit, url) {
    return new Promise(function (resolve, reject) {
        var element = exports.appendScript(jodit, url, resolve).element;
        element.addEventListener('error', reject);
    });
});
exports.appendStyleAsync = cacheLoaders(function (jodit, url) {
    return new Promise(function (resolve, reject) {
        var link = jodit.create.element('link');
        link.rel = 'stylesheet';
        link.media = 'all';
        link.crossOrigin = 'anonymous';
        var callback = function () { return resolve(link); };
        link.addEventListener('load', callback);
        link.addEventListener('error', reject);
        link.href = completeUrl_1.completeUrl(url);
        jodit.ownerDocument.body.appendChild(link);
    });
});
exports.loadNext = function (jodit, urls, i) {
    if (i === void 0) { i = 0; }
    if (!checker_1.isString(urls[i])) {
        return Promise.resolve();
    }
    return exports.appendScriptAsync(jodit, urls[i]).then(function () {
        return exports.loadNext(jodit, urls, i + 1);
    });
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.browser = function (browser) {
    var ua = navigator.userAgent.toLowerCase(), match = /(firefox)[\s\/]([\w.]+)/.exec(ua) ||
        /(chrome)[\s\/]([\w.]+)/.exec(ua) ||
        /(webkit)[\s\/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version)[\s\/]([\w.]+)/.exec(ua) ||
        /(msie)[\s]([\w.]+)/.exec(ua) ||
        /(trident)\/([\w.]+)/.exec(ua) ||
        ua.indexOf('compatible') < 0 ||
        [];
    if (browser === 'version') {
        return match[2];
    }
    if (browser === 'webkit') {
        return match[1] === 'chrome' || match[1] === 'webkit';
    }
    if (browser === 'ff') {
        return match[1] === 'firefox';
    }
    if (browser === 'msie') {
        return match[1] === 'trident' || match[1] === 'msie';
    }
    return match[1] === browser;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var isURL_1 = __webpack_require__(45);
var parseQuery_1 = __webpack_require__(53);
exports.convertMediaURLToVideoEmbed = function (url, width, height) {
    if (width === void 0) { width = 400; }
    if (height === void 0) { height = 345; }
    if (!isURL_1.isURL(url)) {
        return url;
    }
    var parser = document.createElement('a'), pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
    parser.href = url;
    if (!width) {
        width = 400;
    }
    if (!height) {
        height = 345;
    }
    var protocol = parser.protocol || '';
    switch (parser.hostname) {
        case 'www.vimeo.com':
        case 'vimeo.com':
            return pattern1.test(url)
                ? url.replace(pattern1, '<iframe width="' +
                    width +
                    '" height="' +
                    height +
                    '" src="' +
                    protocol +
                    '//player.vimeo.com/video/$1" frameborder="0" allowfullscreen></iframe>')
                : url;
        case 'youtube.com':
        case 'www.youtube.com':
        case 'youtu.be':
        case 'www.youtu.be':
            var query = parser.search
                ? parseQuery_1.parseQuery(parser.search)
                : { v: parser.pathname.substr(1) };
            return query.v
                ? '<iframe width="' +
                    width +
                    '" height="' +
                    height +
                    '" src="' +
                    protocol +
                    '//www.youtube.com/embed/' +
                    query.v +
                    '" frameborder="0" allowfullscreen></iframe>'
                : url;
    }
    return url;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var dataBindKey = 'JoditDataBindKey';
exports.dataBind = function (elm, key, value) {
    var store = elm[dataBindKey];
    if (!store) {
        store = {};
        Object.defineProperty(elm, dataBindKey, {
            enumerable: false,
            configurable: true,
            value: store
        });
    }
    if (value === undefined) {
        return store[key];
    }
    store[key] = value;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanSizeToBytes = function (human) {
    if (/^[0-9.]+$/.test(human.toString())) {
        return parseFloat(human);
    }
    var format = human.substr(-2, 2).toUpperCase(), formats = ['KB', 'MB', 'GB', 'TB'], number = parseFloat(human.substr(0, human.length - 2));
    return formats.indexOf(format) !== -1
        ? number * Math.pow(1024, formats.indexOf(format) + 1)
        : parseInt(human, 10);
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.inView = function (elm, root, doc) {
    var rect = elm.getBoundingClientRect(), el = elm;
    var top = rect.top, height = rect.height;
    do {
        if (el && el.parentNode) {
            el = el.parentNode;
            rect = el.getBoundingClientRect();
            if (!(top <= rect.bottom)) {
                return false;
            }
            if (top + height <= rect.top) {
                return false;
            }
        }
    } while (el && el !== root && el.parentNode);
    return (top <= ((doc.documentElement && doc.documentElement.clientHeight) || 0));
};
exports.scrollIntoView = function (elm, root, doc) {
    if (!exports.inView(elm, root, doc)) {
        if (root.clientHeight !== root.scrollHeight) {
            root.scrollTop = elm.offsetTop;
        }
        if (!exports.inView(elm, root, doc)) {
            elm.scrollIntoView();
        }
    }
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.val = function (elm, selector, value) {
    var child = elm.querySelector(selector);
    if (!child) {
        return '';
    }
    if (value) {
        child.value = value;
    }
    return child.value;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Command = (function () {
    function Command(oldValue, newValue, observer) {
        this.observer = observer;
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
    Command.prototype.undo = function () {
        this.observer.snapshot.restore(this.oldValue);
    };
    Command.prototype.redo = function () {
        this.observer.snapshot.restore(this.newValue);
    };
    return Command;
}());
exports.Command = Command;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(7);
var Dom_1 = __webpack_require__(1);
var StatusBar = (function (_super) {
    tslib_1.__extends(StatusBar, _super);
    function StatusBar(jodit, target) {
        var _this = _super.call(this, jodit) || this;
        _this.target = target;
        _this.container = jodit.create.div('jodit_statusbar');
        target.appendChild(_this.container);
        _this.hide();
        return _this;
    }
    StatusBar.prototype.hide = function () {
        this.container && this.container.classList.add('jodit_hidden');
    };
    StatusBar.prototype.show = function () {
        this.container && this.container.classList.remove('jodit_hidden');
    };
    StatusBar.prototype.getHeight = function () {
        return this.container.offsetHeight;
    };
    StatusBar.prototype.findEmpty = function (inTheRight) {
        if (inTheRight === void 0) { inTheRight = false; }
        var items = this.container.querySelectorAll('.jodit_statusbar_item' + (inTheRight ? '.jodit_statusbar_item-right' : ''));
        for (var i = 0; i < items.length; i += 1) {
            if (!items[i].innerHTML.trim().length) {
                return items[i];
            }
        }
    };
    StatusBar.prototype.append = function (child, inTheRight) {
        if (inTheRight === void 0) { inTheRight = false; }
        var wrapper = this.findEmpty(inTheRight) || this.jodit.create.div('jodit_statusbar_item');
        if (inTheRight) {
            wrapper.classList.add('jodit_statusbar_item-right');
        }
        wrapper.appendChild(child);
        this.container.appendChild(wrapper);
        this.show();
        this.jodit.events.fire('resize');
    };
    StatusBar.prototype.destruct = function () {
        this.setStatus(Component_1.STATUSES.beforeDestruct);
        Dom_1.Dom.safeRemove(this.container);
        delete this.container;
        _super.prototype.destruct.call(this);
    };
    return StatusBar;
}(Component_1.Component));
exports.StatusBar = StatusBar;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var eventsNative_1 = __webpack_require__(62);
var panel_1 = __webpack_require__(125);
var storage_1 = __webpack_require__(126);
var helpers_1 = __webpack_require__(3);
var View = (function (_super) {
    tslib_1.__extends(View, _super);
    function View(jodit, options) {
        var _a, _b, _c;
        var _this = _super.call(this, jodit, options) || this;
        _this.components = new Set();
        _this.version = "3.3.20";
        _this.__modulesInstances = {};
        _this.buffer = storage_1.Storage.makeStorage();
        _this.progressbar = new ProgressBar_1.ProgressBar(_this);
        _this.async = new Async_1.Async();
        _this.getVersion = function () {
            return _this.version;
        };
        _this.id = ((_a = jodit) === null || _a === void 0 ? void 0 : _a.id) || new Date().getTime().toString();
        _this.jodit = jodit || _this;
        _this.events = ((_b = jodit) === null || _b === void 0 ? void 0 : _b.events) || new eventsNative_1.EventsNative(_this.ownerDocument);
        _this.buffer = ((_c = jodit) === null || _c === void 0 ? void 0 : _c.buffer) || storage_1.Storage.makeStorage();
        return _this;
    }
    View.prototype.markOwner = function (elm) {
        elm.setAttribute('data-editor_id', this.id);
    };
    Object.defineProperty(View.prototype, "basePath", {
        get: function () {
            if (this.options.basePath) {
                return this.options.basePath;
            }
            return constants_1.BASE_PATH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "defaultTimeout", {
        get: function () {
            return 100;
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.i18n = function (text) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var _a, _b, _c;
        return helpers_1.i18n(text, params, ((_b = (_a = this) === null || _a === void 0 ? void 0 : _a.jodit) === null || _b === void 0 ? void 0 : _b.options) || ((_c = this) === null || _c === void 0 ? void 0 : _c.options));
    };
    View.prototype.toggleFullSize = function (isFullSize) {
        _super.prototype.toggleFullSize.call(this, isFullSize);
        if (this.events) {
            this.events.fire('toggleFullSize', isFullSize);
        }
    };
    View.prototype.getInstance = function (moduleName, options) {
        if (typeof Jodit_1.Jodit.modules[moduleName] !== 'function') {
            throw helpers_1.error('Need real module name');
        }
        if (this.__modulesInstances[moduleName] === undefined) {
            this.__modulesInstances[moduleName] = new Jodit_1.Jodit.modules[moduleName](this.jodit || this, options);
        }
        return this.__modulesInstances[moduleName];
    };
    View.prototype.initOptions = function (options) {
        _super.prototype.initOptions.call(this, tslib_1.__assign({ extraButtons: [], textIcons: false, removeButtons: [], zIndex: 100002, fullsize: false, showTooltip: true, useNativeTooltip: false, buttons: [], globalFullsize: true }, options));
    };
    View.prototype.destruct = function () {
        if (this.isDestructed) {
            return;
        }
        if (this.async) {
            this.async.destruct();
            delete this.async;
        }
        if (this.events) {
            this.events.destruct();
            delete this.events;
        }
        _super.prototype.destruct.call(this);
    };
    return View;
}(panel_1.Panel));
exports.View = View;
var Jodit_1 = __webpack_require__(9);
var constants_1 = __webpack_require__(2);
var Async_1 = __webpack_require__(127);
var ProgressBar_1 = __webpack_require__(64);


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultNameSpace = 'JoditEventDefaultNamespace';
var EventHandlersStore = (function () {
    function EventHandlersStore() {
        this.__store = {};
    }
    EventHandlersStore.prototype.get = function (event, namespace) {
        if (this.__store[namespace] !== undefined) {
            return this.__store[namespace][event];
        }
    };
    EventHandlersStore.prototype.indexOf = function (event, namespace, originalCallback) {
        var blocks = this.get(event, namespace);
        if (blocks) {
            for (var i = 0; i < blocks.length; i += 1) {
                if (blocks[i].originalCallback === originalCallback) {
                    return i;
                }
            }
        }
        return false;
    };
    EventHandlersStore.prototype.namespaces = function (withoutDefault) {
        if (withoutDefault === void 0) { withoutDefault = false; }
        var nss = Object.keys(this.__store);
        return withoutDefault ? nss.filter(function (ns) { return ns !== exports.defaultNameSpace; }) : nss;
    };
    EventHandlersStore.prototype.events = function (namespace) {
        return this.__store[namespace]
            ? Object.keys(this.__store[namespace])
            : [];
    };
    EventHandlersStore.prototype.set = function (event, namespace, data, onTop) {
        if (onTop === void 0) { onTop = false; }
        if (this.__store[namespace] === undefined) {
            this.__store[namespace] = {};
        }
        if (this.__store[namespace][event] === undefined) {
            this.__store[namespace][event] = [];
        }
        if (!onTop) {
            this.__store[namespace][event].push(data);
        }
        else {
            this.__store[namespace][event].unshift(data);
        }
    };
    EventHandlersStore.prototype.clear = function () {
        delete this.__store;
        this.__store = {};
    };
    return EventHandlersStore;
}());
exports.EventHandlersStore = EventHandlersStore;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Component_1 = __webpack_require__(7);
var Dom_1 = __webpack_require__(1);
var Create_1 = __webpack_require__(63);
var helpers_1 = __webpack_require__(3);
var Panel = (function (_super) {
    tslib_1.__extends(Panel, _super);
    function Panel(jodit, options) {
        var _this = _super.call(this, jodit) || this;
        _this.__whoLocked = '';
        _this.__isFullSize = false;
        _this.isLocked = function () { return _this.__whoLocked !== ''; };
        _this.isLockedNotBy = function (name) {
            return _this.isLocked() && _this.__whoLocked !== name;
        };
        _this.isFullSize = function () { return _this.__isFullSize; };
        _this.initOptions(options);
        _this.initOwners();
        if (jodit && jodit.ownerDocument) {
            _this.ownerDocument = jodit.ownerDocument;
            _this.ownerWindow = jodit.ownerWindow;
        }
        _this.create = new Create_1.Create(_this);
        _this.container = _this.create.div();
        return _this;
    }
    Panel.prototype.initOptions = function (options) {
        this.options = tslib_1.__assign(tslib_1.__assign({}, (this.options || {})), options);
    };
    Panel.prototype.initOwners = function () {
        this.ownerDocument = window.document;
        this.ownerWindow = window;
    };
    Panel.prototype.resolveElement = function (element) {
        var resolved = element;
        if (typeof element === 'string') {
            try {
                resolved = this.ownerDocument.querySelector(element);
            }
            catch (_a) {
                throw helpers_1.error('String "' + element + '" should be valid HTML selector');
            }
        }
        if (!resolved ||
            typeof resolved !== 'object' ||
            !Dom_1.Dom.isElement(resolved) ||
            !resolved.cloneNode) {
            throw helpers_1.error('Element "' +
                element +
                '" should be string or HTMLElement instance');
        }
        return resolved;
    };
    Panel.prototype.lock = function (name) {
        if (name === void 0) { name = 'any'; }
        if (!this.isLocked()) {
            this.__whoLocked = name;
            return true;
        }
        return false;
    };
    Panel.prototype.unlock = function () {
        if (this.isLocked()) {
            this.__whoLocked = '';
            return true;
        }
        return false;
    };
    Panel.prototype.toggleFullSize = function (isFullSize) {
        if (isFullSize === undefined) {
            isFullSize = !this.__isFullSize;
        }
        if (isFullSize === this.__isFullSize) {
            return;
        }
        this.__isFullSize = isFullSize;
    };
    Panel.prototype.destruct = function () {
        if (this.isDestructed) {
            return;
        }
        Dom_1.Dom.safeRemove(this.container);
        _super.prototype.destruct.call(this);
    };
    return Panel;
}(Component_1.Component));
exports.Panel = Panel;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(61), exports);
tslib_1.__exportStar(__webpack_require__(60), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var async_1 = __webpack_require__(42);
var Async = (function () {
    function Async() {
        this.timers = new Map();
        this.promisesRejections = new Set();
    }
    Async.prototype.setTimeout = function (callback, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var options = {};
        if (typeof timeout !== 'number') {
            options = timeout;
            timeout = options.timeout || 0;
        }
        if (options.label && this.timers.has(options.label)) {
            async_1.clearTimeout(this.timers.get(options.label));
            this.timers.delete(options.label);
        }
        var timer = async_1.setTimeout.apply(void 0, tslib_1.__spreadArrays([callback, timeout], args)), key = options.label || timer;
        this.timers.set(key, timer);
        return timer;
    };
    Async.prototype.clearTimeout = function (timer) {
        async_1.clearTimeout(timer);
        this.timers.delete(timer);
    };
    Async.prototype.debounce = function (fn, timeout) {
        var _this = this;
        var timer = 0;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!timeout) {
                fn.apply(void 0, args);
            }
            else {
                async_1.clearTimeout(timer);
                timer = _this.setTimeout(function () { return fn.apply(void 0, args); }, timeout);
                _this.timers.set(fn, timer);
            }
        };
    };
    Async.prototype.throttle = function (fn, timeout) {
        var _this = this;
        var timer = null, needInvoke, callee;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            needInvoke = true;
            if (!timeout) {
                fn.apply(void 0, args);
                return;
            }
            if (!timer) {
                callee = function () {
                    if (needInvoke) {
                        fn.apply(void 0, args);
                        needInvoke = false;
                        timer = _this.setTimeout(callee, timeout);
                        _this.timers.set(callee, timer);
                    }
                    else {
                        timer = null;
                    }
                };
                callee();
            }
        };
    };
    ;
    Async.prototype.promise = function (executor) {
        var _this = this;
        var rejectCallback = function () { };
        var promise = new Promise(function (resolve, reject) {
            _this.promisesRejections.add(reject);
            rejectCallback = reject;
            return executor(resolve, reject);
        });
        promise.finally(function () {
            _this.promisesRejections.delete(rejectCallback);
        });
        return promise;
    };
    Async.prototype.promiseState = function (p) {
        var _this = this;
        if (p.status) {
            return p.status;
        }
        if (!Promise.race) {
            return new Promise(function (resolve) {
                p.then(function (v) {
                    resolve('fulfilled');
                    return v;
                }, function (e) {
                    resolve('rejected');
                    throw e;
                });
                _this.setTimeout(function () {
                    resolve('pending');
                }, 100);
            });
        }
        var t = {};
        return Promise.race([p, t]).then(function (v) { return (v === t ? 'pending' : 'fulfilled'); }, function () { return 'rejected'; });
    };
    Async.prototype.clear = function () {
        var _this = this;
        this.timers.forEach(function (key) {
            async_1.clearTimeout(_this.timers.get(key));
        });
        this.timers.clear();
        this.promisesRejections.forEach(function (reject) {
            reject();
        });
        this.promisesRejections.clear();
    };
    Async.prototype.destruct = function () {
        this.clear();
    };
    return Async;
}());
exports.Async = Async;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var element_1 = __webpack_require__(37);
var ToolbarBreak = (function (_super) {
    tslib_1.__extends(ToolbarBreak, _super);
    function ToolbarBreak(jodit) {
        var _this = _super.call(this, jodit) || this;
        _this.container.classList.add('jodit_toolbar_btn-break');
        return _this;
    }
    return ToolbarBreak;
}(element_1.ToolbarElement));
exports.ToolbarBreak = ToolbarBreak;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(3);
var button_1 = __webpack_require__(26);
var popup_1 = __webpack_require__(27);
var joditToolbarCollection_1 = __webpack_require__(20);
var PopupList = (function (_super) {
    tslib_1.__extends(PopupList, _super);
    function PopupList(jodit, target, current, className) {
        if (className === void 0) { className = 'jodit_toolbar_list'; }
        var _this = _super.call(this, jodit, target, current, className) || this;
        _this.target = target;
        _this.current = current;
        _this.className = className;
        _this.defaultControl = {
            template: function (editor, key, value) {
                return _this.jodit.i18n(value);
            }
        };
        return _this;
    }
    PopupList.prototype.doClose = function () {
        if (this.toolbar) {
            this.toolbar.destruct();
            delete this.toolbar;
        }
    };
    PopupList.prototype.doOpen = function (control) {
        var _this = this;
        this.toolbar = joditToolbarCollection_1.JoditToolbarCollection.makeCollection(this.jodit);
        var list = typeof control.list === 'string'
            ? control.list.split(/[\s,]+/)
            : control.list;
        helpers_1.each(list, function (key, value) {
            var button, controls = _this.jodit.options.controls, getControl = function (key) {
                return controls && controls[key];
            };
            if (typeof value === 'string' && getControl(value)) {
                button = new button_1.ToolbarButton(_this.toolbar, tslib_1.__assign({ name: value.toString() }, getControl(value)), _this.current);
            }
            else if (typeof key === 'string' &&
                getControl(key) &&
                typeof value === 'object') {
                button = new button_1.ToolbarButton(_this.toolbar, tslib_1.__assign(tslib_1.__assign({ name: key.toString() }, getControl(key)), value), _this.current);
            }
            else {
                button = new button_1.ToolbarButton(_this.toolbar, {
                    name: key.toString(),
                    exec: control.exec,
                    command: control.command,
                    isActive: control.isActiveChild,
                    isDisable: control.isDisableChild,
                    mode: control.mode,
                    args: [
                        (control.args && control.args[0]) || key,
                        (control.args && control.args[1]) || value
                    ]
                }, _this.current);
                var template = control.template || _this.defaultControl.template;
                button.textBox.innerHTML = template(_this.jodit, key.toString(), value.toString());
            }
            _this.toolbar.appendChild(button);
        });
        this.container.appendChild(this.toolbar.container);
        this.container.style.removeProperty('marginLeft');
        this.toolbar.checkActiveButtons();
    };
    PopupList.prototype.firstInFocus = function () {
        this.toolbar.firstButton.focus();
    };
    PopupList.prototype.destruct = function () {
        if (this.isDestructed) {
            return;
        }
        this.doClose();
        _super.prototype.destruct.call(this);
    };
    return PopupList;
}(popup_1.Popup));
exports.PopupList = PopupList;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var element_1 = __webpack_require__(37);
var ToolbarSeparator = (function (_super) {
    tslib_1.__extends(ToolbarSeparator, _super);
    function ToolbarSeparator(jodit) {
        var _this = _super.call(this, jodit) || this;
        _this.container.classList.add('jodit_toolbar_btn-separator');
        return _this;
    }
    return ToolbarSeparator;
}(element_1.ToolbarElement));
exports.ToolbarSeparator = ToolbarSeparator;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ar_1 = __webpack_require__(132);
var cs_cz_1 = __webpack_require__(133);
var de_1 = __webpack_require__(134);
var en_1 = __webpack_require__(135);
var es_1 = __webpack_require__(136);
var fr_1 = __webpack_require__(137);
var he_1 = __webpack_require__(138);
var hu_1 = __webpack_require__(139);
var id_1 = __webpack_require__(140);
var it_1 = __webpack_require__(141);
var ja_1 = __webpack_require__(142);
var nl_1 = __webpack_require__(143);
var pl_1 = __webpack_require__(144);
var pt_br_1 = __webpack_require__(145);
var ru_1 = __webpack_require__(146);
var tr_1 = __webpack_require__(147);
var zh_cn_1 = __webpack_require__(148);
var zh_tw_1 = __webpack_require__(149);
var exp = {
    ar: ar_1.default,
    cs_cz: cs_cz_1.default,
    de: de_1.default,
    en: en_1.default,
    es: es_1.default,
    fr: fr_1.default,
    he: he_1.default,
    hu: hu_1.default,
    id: id_1.default,
    it: it_1.default,
    ja: ja_1.default,
    nl: nl_1.default,
    pl: pl_1.default,
    pt_br: pt_br_1.default,
    ru: ru_1.default,
    tr: tr_1.default,
    zh_cn: zh_cn_1.default,
    zh_tw: zh_tw_1.default
};
var get = function (value) { return value.default || value; }, hashLang = {};
if (Array.isArray(get(en_1.default))) {
    get(en_1.default).forEach(function (key, index) {
        hashLang[index] = key;
    });
}
Object.keys(exp).forEach(function (lang) {
    var list = get(exp[lang]);
    if (Array.isArray(list)) {
        exp[lang] = {};
        list.forEach(function (value, index) {
            exp[lang][hashLang[index]] = value;
        });
    }
});
exports.default = exp;


/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports.default = ["إبدأ في الكتابة...","متقدم","حول جوديت","محرر جوديت","دليل مستخدم جوديت","يحتوي على مساعدة مفصلة للاستخدام","للحصول على معلومات حول الترخيص، يرجى الذهاب لموقعنا:","شراء النسخة الكاملة","حقوق الطبع والنشر © XDSoft.net - Chupurnov Valeriy. كل الحقوق محفوظة.","مِرْساة","فتح في نافذة جديدة","فتح المحرر في الحجم الكامل","مسح التنسيق","ملء اللون أو تعيين لون النص","إعادة","تراجع","عريض","مائل","إدراج قائمة غير مرتبة","إدراج قائمة مرتبة","محاذاة للوسط","محاذاة مثبتة","محاذاة لليسار","محاذاة لليمين","إدراج خط أفقي","إدراج صورة","ادخال الملف","إدراج فيديو يوتيوب/فيميو ","إدراج رابط","حجم الخط","نوع الخط","إدراج كتلة تنسيق","عادي","عنوان 1","عنوان 2","عنوان 3","عنوان 4","إقتباس","كود","إدراج","إدراج جدول","تقليل المسافة البادئة","زيادة المسافة البادئة","تحديد أحرف خاصة","إدراج حرف خاص","تنسيق الرسم","تغيير الوضع","هوامش","أعلى","يمين","أسفل","يسار","الأنماط","الطبقات","محاذاة","اليمين","الوسط","اليسار","--غير مضبوط--","Src","العنوان","العنوان البديل","الرابط","افتح الرابط في نافذة جديدة","الصورة","ملف",null,"خصائص الصورة","إلغاء","حسنا","يشبه الكود الخاص بك HTML. تبقي كما HTML؟","الصق ك HTML","احتفظ",null,"إدراج كنص",null,null,"إدراج النص فقط","متصفح الملفات","حدث خطأ في تحميل القائمة ","حدث خطأ في تحميل المجلدات","هل أنت واثق؟","أدخل اسم المجلد","إنشاء مجلد","أكتب إسم","إسقاط صورة","إسقاط الملف","أو أنقر","النص البديل","تصفح","رفع","الخلفية","نص","أعلى","الوسط","الأسفل","إدراج عمود قبل","إدراج عمود بعد","إدراج صف أعلى","إدراج صف أسفل","حذف الجدول","حذف الصف","حذف العمود","خلية فارغة","حذف","اضرب من خلال","أكد","استراحة","البحث عن","استبدل ب","يحل محل","تحرير","محاذاة عمودية","محاذاة أفقية","فلتر","عن طريق التغيير","بالاسم","حسب الحجم","إضافة مجلد","انقسام عمودي","تقسيم أفقي","انشق، مزق","اذهب","أضف العمود","اضف سطر","الحدود","قانون","تحديث","حرف فوقي","مخطوطة","قطع الاختيار","معجون","اختر محتوى للصق","%d حرف","%d كلام",null,"تميز %s","اختر الكل","مصدر","بالخط العريض","مائل","شغل","صلة","إلغاء","كرر","طاولة","صورة","نظيف","فقرة","حجم الخط","فيديو","الخط","حول المحرر","طباعة","رمز","أكد","شطب","المسافة البادئة","نتوء","ملء الشاشة","الحجم التقليدي","نسخ التنسيق","الخط","قائمة","قائمة مرقمة","قطع","اختر الكل","فتح الرابط","تعديل الرابط","سمة Nofollow","إزالة الرابط","مراجعة","لتحرير","URL","إعادة","احتفظ","حفظ باسم","تغيير الحجم","حجم القطع","عرض","ارتفاع","حافظ على النسب","أن","لا","حذف","تميز","يمكنك فقط تحرير صورك الخاصة. تحميل هذه الصورة على المضيف؟","تم تحميل الصورة بنجاح على الخادم!","لوحة","لا توجد ملفات في هذا الدليل.","إعادة تسمية","أدخل اسم جديد","معاينة","تحميل","لصق من الحافظة","متصفحك لا يدعم إمكانية الوصول المباشر إلى الحافظة.","نسخ التحديد","نسخ","دائرة نصف قطرها الحدود","عرض كل"]

/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports.default = ["Napiš něco","Rozšířené","O Jodit","Editor Jodit","Jodit Uživatelská příručka","obsahuje detailní nápovědu","Pro informace o licenci, prosím, přejděte na naši stránku:","Koupit plnou verzi","Copyright © XDSoft.net - Chupurnov Valeriy. Všechna práva vyhrazena.","Anchor","Otevřít v nové záložce","Otevřít v celoobrazovkovém režimu","Vyčistit formátování","Barva výplně a písma","Vpřed","Zpět","Tučné","Kurzíva","Odrážky","Číslovaný seznam","Zarovnat na střed","Zarovnat do bloku","Zarovnat vlevo","Zarovnat vpravo","Vložit horizontální linku","Vložit obrázek","Vložit soubor","Vložit video (YT/Vimeo)","Vložit odkaz","Velikost písma","Typ písma","Formátovat blok","Normální text","Nadpis 1","Nadpis 2","Nadpis 3","Nadpis 4","Citát","Kód","Vložit","Vložit tabulku","Zmenšit odsazení","Zvětšit odsazení","Vybrat speciální symbol","Vložit speciální symbol","Použít formát","Změnit mód","Okraje","horní","pravý","spodní","levý","Styly","Třídy","Zarovnání","Vpravo","Na střed","Vlevo","--nenastaveno--","src","Titulek","Alternativní text (alt)","Link","Otevřít link v nové záložce","Obrázek","soubor",null,"Vlastnosti obrázku","Zpět","Ok","Váš text se podobá HTML. Vložit ho jako HTML?","Vložit jako HTML","Ponechat originál","Vyčistit","Vložit jako TEXT","Detekován fragment z Wordu nebo Excelu","Obsah, který vkládáte, je pravděpodobně z Microsoft Word / Excel. Chcete ponechat formát nebo vložit pouze text?","Vložit pouze TEXT","Prohlížeč souborů","Chyba při načítání seznamu souborů","Chyba při načítání složek","Jste si jistý(á)?","Název složky","Vytvořit složku","název","Přetáhněte sem obrázek","Přetáhněte sem soubor","nebo klikněte","Alternativní text","Server","Nahrát","Pozadí","Text","Nahoru","Na střed","Dolu","Vložit sloupec před","Vložit sloupec za","Vložit řádek nad","Vložit řádek pod","Vymazat tabulku","Vymazat řádku","Vymazat sloupec","Vyčistit buňku","Vymazat","Přeškrtnuto","Podtrženo","Zalomení","Najdi","Nahradit za","Nahradit","Editovat","Vertikální zarovnání","Horizontální zarovnání","Filtr","Dle poslední změny","Dle názvu","Dle velikosti","Přidat složku","Rozdělit vertikálně","Rozdělit horizontálně","Rozdělit","Spojit","Přidat sloupec","Přidat řádek","Okraj","Kód","Aktualizovat","Horní index","Dolní index","Vyjmout označené","Vložit","Vyber obsah pro vložení","Znaky: %d","Slova: %d","Vše","Označit %s","Označit vše","HTML","tučně","kurzíva","štětec","odkaz","zpět","vpřed","tabulka","obrázek","guma","odstavec","velikost písma","video","písmo","о editoru","tisk","symbol","podtrženo","přeškrtnuto","zvětšit odsazení","zmenšit odsazení","celoobrazovkový režim","smrsknout","Kopírovat formát","Linka","Odrážka","Číslovaný seznam","Vyjmout","Označit vše","Otevřít odkaz","Upravit odkaz","Atribut no-follow","Odstranit odkaz","Zobrazit","Chcete-li upravit","URL","Reset","Uložit","Uložit jako...","Změnit rozměr","Ořezat","Šířka","Výška","Ponechat poměr","Ano","Ne","Vyjmout","Označit","Můžete upravovat pouze své obrázky. Načíst obrázek?","Obrázek byl úspěšně nahrán!","paleta","V tomto adresáři nejsou žádné soubory.","přejmenovat","Zadejte nový název","náhled","Stažení","Vložit ze schránky","Váš prohlížeč nepodporuje přímý přístup do schránky.","Kopírovat výběr","kopírování","Border radius","Zobrazit všechny"]

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports.default = ["Bitte geben Sie einen Text ein","Fortgeschritten","Über Jodit","Jodit Editor","Das Jodit Benutzerhandbuch","beinhaltet ausführliche Informationen wie Sie den Editor verwenden können.","Für Lizenz-Informationen, besuchen Sie bitte unsere Webseite:","Vollversion kaufen","Copyright © XDSoft.net - Chupurnov Valeriy. Alle Rechte vorbehalten.","Anker","In neuer Registerkarte öffnen","Editor in voller Größe öffnen","Formatierung löschen","Füllfarbe oder Textfarbe ändern","Wiederholen","Rückgängig machen","Fett","Kursiv","Ungeordnete Liste einfügen","Sortierte Liste einfügen","Mittig ausrichten","Blocksatz","Links ausrichten","Rechts ausrichten","Horizontale Linie einfügen","Bild einfügen","Datei einfügen","Youtube/vimeo Video einfügen","Link einfügen","Schriftgröße","Schriftfamilie","Formatblock einfügen","Normal","Überschrift 1","Überschrift 2","Überschrift 3","Überschrift 4","Zitat","Code","Einfügen","Tabelle einfügen","Einzug verkleinern","Einzug vergrößern","Sonderzeichen auswählen","Sonderzeichen einfügen","Format kopieren","Änderungsmodus","Ränder","Oben","Rechts","Unten","Links","CSS Stiel","CSS Klassen","Ausrichten","Rechts","Zentriert","Links","Keine","Pfad","Titel","Alternativer Text","Link","Link in neuem Tab öffnen","Bild","Datei","Erweitert","Bildeigenschaften","Abbrechen","OK","Es scheint als dass Sie HTML-Text einfügen möchten","Als HTML einfügen?","Original speichern","Säubern","Als Text einfügen","In Word formatierter Text erkannt","Der Inhalt, den Sie einfügen, stammt aus einem Microsoft Word / Excel-Dokument. Möchten Sie das Format erhalten oder löschen?","Nur Text einfügen","Dateibrowser","Fehler beim Laden der Liste","Fehler beim Laden der Ordner","Sind Sie sicher?","Geben Sie den Verzeichnisnamen ein","Verzeichnis erstellen","Typname","Bild hier hinziehen","Datei löschen","oder hier klicken","Alternativtext","Auswählen","Hochladen","Hintergrund","Text","Oben","Mittig","Unten","Spalte einfügen vor","Spalte einfügen nach","Zeile einfügen oberhalb","Zeile unterhalb einfügen","Tabelle löschen","Zeile löschen","Spalte löschen","Leere Zelle","Löschen","Durchschlagen","Unterstreichen","Pause","Suche nach","Ersetzen durch","Ersetzen","Bearbeiten","Vertikale Ausrichtung","Horizontale Ausrichtung","filter","Sortieren nach geändert","Nach Name sortieren","Nach Größe sortiert","Ordner hinzufügen","Split vertikal","Split horizontally","Split","Verschmelzen","Spalte hinzufügen","Zeile hinzufügen","Rand","Code einbetten","Aktualisieren","hochgestellt","Index","Auswahl ausschneid","Einfügen","Wählen Sie Inhalt zum Einfügen","Zeichen: %d","Wörter: %d","Wählen Sie Alle aus","Markieren: %s","Wählen Sie Alle aus","HTML","Fett gedruckt","kursiv","Bürste","Verknüpfung","rückgängig machen","wiederholen","Tabelle","Bild","Radiergummi","Absatz","Schriftgröße","Video","Schriftart","Über","drucken","Symbol","unterstreichen","durchgestrichen","Einzug","Aussenseiter","Vollgröße","schrumpfen","Format kopierenт","die Linie","Liste von","Nummerierte Liste","Schnitt","Wählen Sie Alle aus","Link öffnen","Link bearbeiten","Nofollow-Attribut","Link entfernen","Ansehen","Bearbeiten","URL","Wiederherstellen","Speichern","Speichern als","Ändern Sie die Größe","Größe anpassen","Breite","Höhe","Halten Sie Proportionen","Ja","Nein","Entfernen","Markieren","Sie können nur Ihre eigenen Bilder bearbeiten. Laden Sie dieses Bild auf dem Host herunter?","Das Bild wurde erfolgreich auf den Server hochgeladen!null","Palette","In diesem Verzeichnis befinden sich keine Dateien.","umbenennen","Geben Sie einen neuen Namen ein","Vorschau","Herunterladen","Aus der Zwischenablage einfügen","Ihr browser unterstützt kein direkter Zugriff auf die Zwischenablage.","Auswahl kopieren","kopieren","Border-radius","Alle anzeigen"]

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports.default = ["Type something","Advanced","About Jodit","Jodit Editor","Jodit User's Guide","contains detailed help for using","For information about the license, please go to our website:","Buy full version","Copyright © XDSoft.net - Chupurnov Valeriy. All rights reserved.","Anchor","Open in new tab","Open editor in fullsize","Clear Formatting","Fill color or set the text color","Redo","Undo","Bold","Italic","Insert Unordered List","Insert Ordered List","Align Center","Align Justify","Align Left","Align Right","Insert Horizontal Line","Insert Image","Insert file","Insert youtube/vimeo video","Insert link","Font size","Font family","Insert format block","Normal","Heading 1","Heading 2","Heading 3","Heading 4","Quote","Code","Insert","Insert table","Decrease Indent","Increase Indent","Select Special Character","Insert Special Character","Paint format","Change mode","Margins","top","right","bottom","left","Styles","Classes","Align","Right","Center","Left","--Not Set--","Src","Title","Alternative","Link","Open link in new tab","Image","file","Advansed","Image properties","Cancel","Ok","Your code is similar to HTML. Keep as HTML?","Paste as HTML","Keep","Clean","Insert as Text","Word Paste Detected","The pasted content is coming from a Microsoft Word/Excel document. Do you want to keep the format or clean it up?","Insert only Text","File Browser","Error on load list","Error on load folders","Are you sure?","Enter Directory name","Create directory","type name","Drop image","Drop file","or click","Alternative text","Browse","Upload","Background","Text","Top","Middle","Bottom","Insert column before","Insert column after","Insert row above","Insert row below","Delete table","Delete row","Delete column","Empty cell","Delete","Strike through","Underline","Break","Search for","Replace with","Replace","Edit","Vertical align","Horizontal align","Filter","Sort by changed","Sort by name","Sort by size","Add folder","Split vertical","Split horizontal","Split","Merge","Add column","Add row","Border","Embed code","Update","superscript","subscript","Cut selection","Paste","Choose Content to Paste","Chars: %d","Words: %d","All","Select %s","Select all","source","bold","italic","brush","link","undo","redo","table","image","eraser","paragraph","fontsize","video","font","about","print","symbol","underline","strikethrough","indent","outdent","fullsize","shrink","copyformat","hr","ul","ol","cut","selectall","Open link","Edit link","No follow","Unlink","Eye","pencil"," URL","Reset","Save","Save as ...","Resize","Crop","Width","Height","Keep Aspect Ratio","Yes","No","Remove","Select","You can only edit your own images. Download this image on the host?","The image has been successfully uploaded to the host!","palette","There are no files","Rename","Enter new name","preview","download","Paste from clipboard","Your browser doesn't support direct access to the clipboard.","Copy selection","copy","Border radius","Show all"]

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports.default = ["Escriba algo...","Avanzado","Acerca de Jodit","Jodit Editor","Guía de usuario Jodit","contiene ayuda detallada para el uso.","Para información sobre la licencia, por favor visite nuestro sitio:","Compre la versión completa","Copyright © XDSoft.net - Chupurnov Valeriy. Todos los derechos reservados.","Anclar","Abrir en nueva pestaña","Abrir editor en pantalla completa","Limpiar formato","Color de relleno o de letra","Rehacer","Deshacer","Negrita","Cursiva","Insertar lista no ordenada","Insertar lista ordenada","Alinear Centrado","Alinear Justificado","Alinear Izquierda","Alinear Derecha","Insertar línea horizontal","Insertar imagen","Insertar archivo","Insertar video de Youtube/vimeo","Insertar vínculo","Tamaño de letra","Familia de letra","Insertar bloque","Normal","Encabezado 1","Encabezado 2","Encabezado 3","Encabezado 4","Cita","Código","Insertar","Insertar tabla","Disminuir sangría","Aumentar sangría","Seleccionar caracter especial","Insertar caracter especial","Copiar formato","Cambiar modo","Márgenes","arriba","derecha","abajo","izquierda","Estilos CSS","Clases CSS","Alinear","Derecha","Centrado","Izquierda","--No Establecido--","Fuente","Título","Texto Alternativo","Vínculo","Abrir vínculo en nueva pestaña","Imagen","Archivo","Avanzado","Propiedades de imagen","Cancelar","Aceptar","El código es similar a HTML. ¿Mantener como HTML?","Pegar como HTML?","Mantener","Limpiar","Insertar como texto","Pegado desde Word detectado","El contenido pegado proviene de un documento de Microsoft Word/Excel. ¿Desea mantener el formato o limpiarlo?","Insertar solo texto","Buscar archivo","Error al cargar la lista","Error al cargar las carpetas","¿Está seguro?","Entre nombre de carpeta","Crear carpeta","Entre el nombre","Soltar imagen","Soltar archivo","o click","Texto alternativo","Buscar","Subir","Fondo","Texto","Arriba","Centro","Abajo","Insertar columna antes","Interar columna después","Insertar fila arriba","Insertar fila debajo","Borrar tabla","Borrar fila","Borrar columna","Vaciar celda","Borrar","Tachado","Subrayado","Pausa","Buscar","Reemplazar con","Reemplazar","Editar","Alineación vertical","Alineación horizontal","filtrar","Ordenar por fecha modificación","Ordenar por nombre","Ordenar por tamaño","Agregar carpeta","Dividir vertical","Dividir horizontal","Dividir","Mezclar","Agregar columna","Agregar fila","Borde","Incluir código","Actualizar","superíndice","subíndice","Cortar selección","Pegar","Seleccionar contenido para pegar","Caracteres: %d","Palabras: %d","Todo","Seleccionar: %s","Seleccionar todo","HTML","negrita","cursiva","Brocha","Vínculo","deshacer","rehacer","Tabla","Imagen","Borrar","Párrafo","Tamaño de letra","Video","Letra","Acerca de","Imprimir","Símbolo","subrayar","tachar","sangría","quitar sangría","Tamaño completo","encoger","Copiar formato","línea horizontal","lista sin ordenar","lista ordenada","Cortar","Seleccionar todo","Abrir vínculo","Editar vínculo","No seguir","Desvincular","Ver","Para editar","URL","Resetear","Guardar","Guardar como...","Redimensionar","Recortar","Ancho","Alto","Mantener relación de aspecto","Si","No","Quitar","Seleccionar","Solo puedes editar tus propias imágenes. ¿Descargar esta imagen en el servidor?","¡La imagen se ha subido correctamente al servidor!","paleta","No hay archivos en este directorio.","renombrar","Ingresa un nuevo nombre","avance","Descargar","Pegar desde el portapapeles","Su navegador no soporta el acceso directo en el portapapeles.","Selección de copia","copia","Radio frontera","Mostrar todos los"]

/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports.default = ["Ecrivez ici","Avancé","A propos de Jodit","Editeur Jodit","Guide de l'utilisateur","Aide détaillée à l'utilisation","Consulter la licence sur notre site web:","Acheter la version complète","Copyright © XDSoft.net - Chupurnov Valeriy. Tous droits réservés.","Ancre","Ouvrir dans un nouvel onglet","Ouvrir l'éditeur en pleine page","Supprimer le formattage","Modifier la couleur du fond ou du texte","Refaire","Défaire","Gras","Italique","Liste non ordonnée","Liste ordonnée","Centrer","Justifier","Aligner à gauche ","Aligner à droite","Insérer une ligne horizontale","Insérer une image","Insérer un fichier","Insérer une vidéo","Insérer un lien","Taille des caractères","Famille des caractères","Bloc formatté","Normal","Titre 1","Titre 2","Titre 3","Titre 4","Citation","Code","Insérer","Insérer un tableau","Diminuer le retrait","Retrait plus","Sélectionnez un caractère spécial","Insérer un caractère spécial","Cloner le format","Mode wysiwyg <-> code html","Marges","haut","droite","Bas","gauche","Styles","Classes","Alignement","Droite","Centre","Gauche","--Non disponible--","Source","Titre","Alternative","Lien","Ouvrir le lien dans un nouvel onglet","Image","fichier",null,"Propriétés de l'image","Effacer","OK","Votre texte que vous essayez de coller est similaire au HTML. Collez-le en HTML?","Coller en HTML?","Sauvegarder l'original","Nettoyer","Coller en tant que texte","C'est peut-être un fragment de Word ou Excel","Le contenu que vous insérez provient d'un document Microsoft Word / Excel. Voulez-vous enregistrer le format ou l'effacer?","Coller le texte seulement","Explorateur de fichiers","Erreur de liste de chargement","Erreur de dossier de chargement","Etes-vous sûrs ?","Entrer le non de dossier","Créer un dossier","type de fichier","Coller une image","Déposer un fichier","ou cliquer","Texte de remplacemement","Chercher","Charger","Arrière-plan","Texte","Haut","Milieu","Bas","Insérer une colonne avant","Insérer une colonne après","Insérer une ligne en dessus","Insérer une ligne en dessous","Supprimer le tableau","Supprimer la ligne","Supprimer la colonne","Vider la cellule","Effacer","Frapper à travers","Souligner","Pause","Rechercher","Remplacer par","Remplacer",null,"Alignement vertical","Alignement horizontal","Filtre","Trier par modifié","Trier par nom","Classer par taille","Ajouter le dossier","Split vertical","Split horizontal","Split","aller","Ajouter une colonne","Ajouter une rangée",null,null,"Mettre à jour","exposant","indice","Couper la sélection","Coller","Choisissez le contenu à coller","Symboles: %d","Mots: %d",null,"Mettre en évidence: %s","Tout sélectionner","la source","graisseux","italique","verser","lien","abolir","prêt","graphique","Image","la gommen","clause","taille de police","Video","police","à propos de l'éditeur","impression","caractère","souligné","barré","indentation","indifférent","taille réelle","taille conventionnelle","Format de copie","la ligne","Liste des","Liste numérotée","Couper","Sélectionner tout","Ouvrir le lien","Modifier le lien","Attribut Nofollow","Supprimer le lien","Voir","Pour éditer","URL","Restaurer","Sauvegarder","Enregistrer sous","Changer la taille","Taille de garniture","Largeur","Hauteur","Garder les proportions","Oui","Non","Supprimer","Mettre en évidence","Vous ne pouvez éditer que vos propres images. Téléchargez cette image sur l'hôte?","L'image a été téléchargée avec succès sur le serveur!null","Palette","Il n'y a aucun fichier dans ce répertoire.","renommer","Entrez un nouveau nom","Aperçu","Télécharger","Coller à partir du presse-papiers","Votre navigateur ne prend pas en charge l'accès direct à la presse-papiers.","Copier la sélection","copie","Rayon des frontières","Afficher tous les"]

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports.default = ["הקלד משהו...","מתקדם","About Jodit","Jodit Editor","Jodit User's Guide","contains detailed help for using.","For information about the license, please go to our website:","Buy full version","Copyright © XDSoft.net - Chupurnov Valeriy. All rights reserved.","מקום עיגון","פתח בכרטיסיה חדשה","פתח את העורך בחלון חדש","נקה עיצוב","שנה צבע טקסט או רקע","בצע שוב","בטל","מודגש","נטוי","הכנס רשימת תבליטים","הכנס רשימה ממוספרת","מרכז","ישר ","ישר לשמאל","ישר לימין","הכנס קו אופקי","הכנס תמונה","הכנס קובץ","הכנס סרטון וידאו מYouTube/Vimeo","הכנס קישור","גודל גופן","גופן","מעוצב מראש","רגיל","כותרת 1","כותרת 2","כותרת 3","כותרת 4","ציטוט","קוד","הכנס","הכנס טבלה","הקטן כניסה","הגדל כניסה","בחר תו מיוחד","הכנס תו מיוחד","העתק עיצוב","החלף מצב","ריווח","עליון","ימין","תחתון","שמאל","עיצוב CSS","מחלקת CSS","יישור","ימין","מרכז","שמאל","--לא נקבע--","מקור","כותרת","כיתוב חלופי","קישור","פתח בכרטיסיה חדשה","תמונה","קובץ","מתקדם","מאפייני תמונה","ביטול","אישור","הקוד דומה לHTML, האם להשאיר כHTML","הדבק כHTML","השאר","נקה","הכנס כטקסט","זוהתה הדבקה מ\"וורד\"","התוכן המודבק מגיע ממסמך וורד/אקסל. האם ברצונך להשאיר את העיצוב או לנקותו","הכנס טקסט בלבד","סייר הקבצים","שגיאה  בזמן טעינת רשימה","שגיאה בזמן טעינת תקיות","האם אתה בטוח?","הכנס שם תקיה","צור תקיה","סוג הקובץ","הסר תמונה","הסר קובץ","או לחץ","כיתוב חלופי","סייר","העלה","רקע","טקסט","עליון","מרכז","תחתון","הכנס עמודה לפני","הכנס עמודה אחרי","הכנס שורה מעל","הכנס שורה מתחת","מחק טבלה","מחק שורה","מחק עמודה","רוקן תא","מחק","קו חוצה","קו תחתון","שבירת שורה","חפש","החלף ב","החלף","ערוך","יישור אנכי","יישור אופקי","סנן","מין לפי שינוי","מיין לפי שם","מיין לפי גודל","הוסף תקייה","פיצול אנכי","פיצול אופקי","פיצול","מזג","הוסף עמודה","הוסף שורה","מסגרת","הוסף קוד","עדכן","superscript","subscript","גזור בחירה","הדבק","בחר תוכן להדבקה","תווים: %d","מילים: %d","הכל","נבחר: %s","בחר הכל","HTML","מודגש","נטוי","מברשת","קישור","בטל","בצע שוב","טבלה","תמונה","מחק","פסקה","גודל גופן","וידאו","גופן","עלינו","הדפס","תו מיוחד","קו תחתון","קו חוצה","הגדל כניסה","הקטן כניסה","גודל מלא","כווץ","העתק עיצוב","קו אופקי","רשימת תבליטים","רשימה ממוספרת","חתוך","בחר הכל","פתח קישור","ערוך קישור","ללא מעקב","בטל קישור","הצג","כדי לערוך","כתובת","אפס","שמור","שמור בשם...","שנה גודל","חתוך","רוחב","גובה","שמור יחס","כן","לא","הסר","בחר","רק קבצים המשוייכים שלך ניתנים לעריכה. האם להוריד את הקובץ?","התמונה עלתה בהצלחה!","לוח","אין קבצים בספריה זו.","הונגרית","הזן שם חדש","תצוגה מקדימה","הורד","להדביק מהלוח","הדפדפן שלך לא תומך גישה ישירה ללוח.","העתק בחירה","העתק","רדיוס הגבול","הצג את כל"]

/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports.default = ["Írjon be valamit","Haladó","Joditról","Jodit Editor","Jodit útmutató","további segítséget tartalmaz","További licence információkért látogassa meg a weboldalunkat:","Teljes verzió megvásárlása","Copyright © XDSoft.net - Chupurnov Valeriy. Minden jog fenntartva.","Horgony","Megnyitás új lapon","Megnyitás teljes méretben","Formázás törlése","Háttér/szöveg szín","Újra","Visszavon","Félkövér","Dőlt","Pontozott lista","Számozott lista","Középre zárt","Sorkizárt","Balra zárt","Jobbra zárt","Vízszintes vonal beszúrása","Kép beszúrás","Fájl beszúrás","Youtube videó beszúrása","Link beszúrás","Betűméret","Betűtípus","Formázott blokk beszúrása","Normál","Fejléc 1","Fejléc 2","Fejléc 3","Fejléc 4","Idézet","Kód","Beszúr","Táblázat beszúrása","Behúzás csökkentése","Behúzás növelése","Speciális karakter kiválasztása","Speciális karakter beszúrása","Kép formázása","Nézet váltása","Szegélyek","felső","jobb","alsó","bal","CSS stílusok","CSS osztályok","Igazítás","Jobbra","Középre","Balra","Nincs","Forrás","Cím","Helyettesítő szöveg","Link","Link megnyitása új lapon","Kép","Fájl","További beállítás","Kép tulajdonságai","Mégsem","OK","A beillesztett szöveg HTML-nek tűnik. Megtartsuk HTML-ként?","Beszúrás HTML-ként","Megtartás","Elvetés","Beszúrás szövegként","Word-ből másolt szöveg","A beillesztett tartalom Microsoft Word/Excel dokumentumból származik. Meg szeretné tartani a formátumát?","Csak szöveg beillesztése","Fájl tallózó","Hiba a lista betöltése közben","Hiba a mappák betöltése közben","Biztosan ezt szeretné?","Írjon be egy mappanevet","Mappa létrehozása","írjon be bevet","Húzza ide a képet","Húzza ide a fájlt","vagy kattintson","Helyettesítő szöveg","Tallóz","Feltölt","Háttér","Szöveg","Fent","Középen","Lent","Oszlop beszúrás elé","Oszlop beszúrás utána","Sor beszúrás fölé","Sor beszúrás alá","Táblázat törlése","Sor törlése","Oszlop törlése","Cella tartalmának törlése","Törlés","Áthúzott","Aláhúzott","Szünet","Keresés","Csere erre","Csere","Szerkeszt","Függőleges igazítás","Vízszintes igazítás","Szűrő","Rendezés módosítás szerint","Rendezés név szerint","Rendezés méret szerint","Mappa hozzáadás","Függőleges felosztás","Vízszintes felosztás","Felosztás","Összevonás","Oszlop hozzáadás","Sor hozzáadás","Szegély","Beágyazott kód","Frissít","Felső index","Alsó index","Kivágás","Beillesztés","Válasszon tartalmat a beillesztéshez","Karakterek száma: %d","Szavak száma: %d","Összes","Kijelöl: %s","Összes kijelölése","HTML","Félkövér","Dőlt","Ecset","Link","Visszavon","Újra","Táblázat","Kép","Törlés","Paragráfus","Betűméret","Videó","Betű","Rólunk","Nyomtat","Szimbólum","Aláhúzott","Áthúzott","Behúzás","Aussenseiter","Teljes méret","Összenyom","Formátum másolás","Egyenes vonal","Lista","Számozott lista","Kivág","Összes kijelölése","Link megnyitása","Link szerkesztése","Nincs követés","Link leválasztása","felülvizsgálat","Szerkesztés","URL","Visszaállít","Mentés","Mentés másként...","Átméretezés","Kivág","Szélesség","Magasság","Képarány megtartása","Igen","Nem","Eltávolít","Kijelöl","Csak a saját képeit tudja szerkeszteni. Letölti ezt a képet?","Kép sikeresen feltöltve!","Palette","Er zijn geen bestanden in deze map.","átnevezés","Adja meg az új nevet","előnézet","Letöltés","Illessze be a vágólap","A böngésző nem támogatja a közvetlen hozzáférést biztosít a vágólapra.","Másolás kiválasztása","másolás","Határ sugár","Összes"]

/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports.default = ["Ketik sesuatu","Lanjutan","Tentang Jodit","Editor Jodit","Panduan Pengguna Jodit","mencakup detail bantuan penggunaan","Untuk informasi tentang lisensi, silakan kunjungi website:","Beli versi lengkap","Hak Cipta © XDSoft.net - Chupurnov Valeriy. Hak cipta dilindungi undang-undang.","Tautan","Buka di tab baru","Buka editor dalam ukuran penuh","Hapus Pemformatan","Isi warna atau atur warna teks","Ulangi","Batalkan","Tebal","Miring","Sisipkan Daftar Tidak Berurut","Sisipkan Daftar Berurut","Tengah","Penuh","Kiri","Kanan","Sisipkan Garis Horizontal","Sisipkan Gambar","Sisipkan Berkas","Sisipkan video youtube/vimeo","Sisipkan tautan","Ukuran font","Keluarga font","Sisipkan blok format","Normal","Heading 1","Heading 2","Heading 3","Heading 4","Kutip","Kode","Sisipkan","Sisipkan tabel","Kurangi Indentasi","Tambah Indentasi","Pilih Karakter Spesial","Sisipkan Karakter Spesial","Formar warna","Ubah mode","Batas","atas","kanan","bawah","kiri","Gaya","Class","Rata","Kanan","Tengah","Kiri","--Tidak diset--","Src","Judul","Teks alternatif","Tautan","Buka tautan di tab baru","Gambar","berkas",null,"Properti gambar","Batal","Ya","Kode Anda cenderung ke HTML. Biarkan sebagai HTML?","Paste sebagai HTML","Jaga","Bersih","Sisipkan sebagai teks","Terdeteksi paste dari Word","Konten dipaste dari dokumen Microsoft Word/Excel. Apakah Anda ingin tetap menjaga format atau membersihkannya?","Sisipkan hanya teks","Penjelajah Berkas","Error ketika memuat list","Error ketika memuat folder","Apakah Anda yakin?","Masukkan nama Direktori","Buat direktori","ketik nama","Letakkan gambar","Letakkan berkas","atau klik","Teks alternatif","Jelajahi","Unggah","Latar Belakang","Teks","Atas","Tengah","Bawah","Sisipkan kolom sebelumnya","Sisipkan kolom setelahnya","Sisipkan baris di atasnya","Sisipkan baris di bawahnya","Hapus tabel","Hapus baris","Hapus kolom","Kosongkan cell","Hapus","Coret","Garis Bawah","Berhenti","Mencari","Ganti dengan","Ganti","Edit","Rata vertikal","Perataan horizontal","Filter","Urutkan berdasarkan perubahan","Urutkan berdasarkan nama","Urutkan berdasarkan ukuran","Tambah folder","Bagi secara vertikal","Bagi secara horizontal","Bagi","Gabungkan","Tambah kolom","tambah baris","Bingkai","Kode embed","Perbarui","Superskrip","Subskrip","Potong pilihan","Paste","Pilih konten untuk dipaste","Karakter: %d","Kata: %d","Semua","Pilih %s","Pilih semua","sumber","tebal","miring","sikat","tautan","batalkan","ulangi","tabel","gambar","penghapus","paragraf","ukuran font","video","font","tentang","cetak","simbol","garis bawah","coret","menjorok ke dalam","menjorok ke luar","ukuran penuh","menyusut","salin format","hr","ul","ol","potong","Pilih semua","Buka tautan","Edit tautan","No follow","Hapus tautan","Mata","pensil","URL","Reset","Simpan","Simpan sebagai...","Ubah ukuran","Crop","Lebar","Tinggi","Jaga aspek rasio","Ya","Tidak","Copot","Pilih","Anda hanya dapat mengedit gambar Anda sendiri. Unduh gambar ini di host?","Gambar telah sukses diunggah ke host!","palet","Tidak ada berkas","ganti nama","Masukkan nama baru","pratinjau","Unduh","Paste dari clipboard","Browser anda tidak mendukung akses langsung ke clipboard.","Copy seleksi","copy","Border radius","Tampilkan semua"]

/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports.default = ["Scrivi qualcosa...","Avanzato","A proposito di Jodit","Jodit Editor","Guida utente di Jodit","contiene una guida dettagliata per l'uso.","Per informazioni sulla licenza, si prega di visitare il nostro sito:","Acquista la versione completa","Copyright © XDSoft.net - Chupurnov Valeriy. Alle Rechte vorbehalten.","Ancora","Apri in una nuova scheda","Apri l'editor a schermo intero","Formato chiaro","Riempi colore o lettera","Ripristina","Annulla","Grassetto","Corsivo","Inserisci lista non ordinata","Inserisci l'elenco ordinato","Allinea Centra","Allineare Giustificato","Allinea a Sinistra","Allinea a Destra","Inserisci la linea orizzontale","Inserisci immagine","Inserisci un file","Inserisci video Youtube/Vimeo","Inserisci il link","Dimensione del carattere","Tipo di font","Inserisci blocco","Normale","Heading 1","Heading 2","Heading 3","Heading 4","Citazione","Codice","Inserisci","Inserisci tabella","Riduci il rientro","Aumenta il rientro","Seleziona una funzione speciale","Inserisci un carattere speciale","Copia formato","Cambia modo","Margini","su","destra","giù","sinistra","Stili CSS","Classi CSS","Allinea","Destra","Centro","Sinistra","--Non Impostato--","Fonte","Titolo","Testo Alternativo","Link","Apri il link in una nuova scheda","Immagine","Archivio","Avanzato","Proprietà dell'immagine","Annulla","Accetta","Il codice è simile all'HTML. Mantieni come HTML?","Incolla come HTML?","Mantieni","Pulisci","Inserisci come testo","Incollato da Word rilevato","Il contenuto incollato proviene da un documento Microsoft Word / Excel. Vuoi mantenere il formato o pulirlo?","Inserisci solo il testo","Cerca il file","Errore durante il caricamento dell'elenco","Errore durante il caricamento delle cartelle","Sei sicuro?","Inserisci il nome della cartella","Crea cartella","Entre el nombre","Rilascia l'immagine","Rilascia file","o click","Testo alternativo","Sfoglia","Carica","Sfondo","Testo","Su","Centro","Sotto","Inserisci prima la colonna","Inserisci colonna dopo","Inserisci la riga sopra","Inserisci la riga sotto","Elimina tabella","Elimina riga","Elimina colonna","Cella vuota","Cancella","Barrato","Sottolineato","Pausa","Cerca","Sostituisci con","Sostituisci","Modifica","Allineamento verticala","Allineamento orizzontale","Filtro","Ordina per data di modifica","Ordina per nome","Ordina per dimensione","Aggiungi cartella","Dividere verticalmente","Diviso orizzontale","Dividere","Fondi","Aggiungi colonna","Aggiungi riga","Bordo","Includi codice","Aggiornare","indice","deponente","Taglia la selezione","Incolla","Seleziona il contenuto da incollare","Caratteri: %d","Parole: %d","Tutto","Seleziona: %s","Seleziona tutto","HTML","Grassetto","Corsivo","Pennello","Link","Annulla","Ripristina","Tabella","Immagine","Gomma","Paragrafo","Dimensione del carattere","Video","Font","Approposito di","Stampa","Simbolo","Sottolineato","Barrato","trattino","annulla rientro","A grandezza normale","comprimere","Copia il formato","linea orizzontale","lista non ordinata","lista ordinata","Taglia","Seleziona tutto","Apri link","Modifica link","Non seguire","Togli link","Recensione","Per modificare"," URL","Reset","Salva","Salva con nome...","Ridimensiona","Tagliare","Larghezza","Altezza","Mantenere le proporzioni","Si","No","Rimuovere","Seleziona","Puoi modificare solo le tue immagini. Scarica questa immagine sul server?","L'immagine è stata caricata con successo sul server!","tavolozza","Non ci sono file in questa directory.","ungherese","Inserisci un nuovo nome","anteprima","Scaricare","Incolla dagli appunti","Il tuo browser non supporta l'accesso diretto agli appunti.","Selezione di copia","copia","Border radius","Mostra tutti"]

/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports.default = ["なにかタイプしてください","高度な設定","Joditについて","Jodit Editor","Jodit ユーザーズ・ガイド","詳しい使い方","ライセンス詳細についてはJodit Webサイトを確認ください：","フルバージョンを購入","Copyright © XDSoft.net - Chupurnov Valeriy. All rights reserved.","Anchor","新しいタブで開く","エディターのサイズ（フル/ノーマル）","書式をクリア","テキストの色","やり直し","元に戻す","太字","斜体","箇条書き","番号付きリスト","中央揃え","両端揃え","左揃え","右揃え","区切り線を挿入","画像を挿入","ファイルを挿入","Youtube/Vimeo 動画","リンクを挿入","フォントサイズ","フォント","テキストのスタイル","指定なし","タイトル1","タイトル2","タイトル3","タイトル4","引用","コード","挿入","表を挿入","インデント減","インデント増","特殊文字を選択","特殊文字を挿入","書式を貼付け","編集モード切替え","マージン","上","右","下","左","スタイル","クラス","配置","右寄せ","中央寄せ","左寄せ","指定なし","ソース","タイトル","代替テキスト","リンク","新しいタブで開く","画像","ファイル","Advansed","画像のプロパティー","キャンセル","確定","HTMLコードを保持しますか？","HTMLで貼付け","HTMLを保持","Clean","HTMLをテキストにする","Word Paste Detected","The pasted content is coming from a Microsoft Word/Excel document. Do you want to keep the format or clean it up?","テキストだけ","File Browser","Error on load list","Error on load folders","Are you sure?","Enter Directory name","Create directory","type name","ここに画像をドロップ","ここにファイルをドロップ","or クリック","代替テキスト","ブラウズ","アップロード","背景","文字","上","中央","下","左に列を挿入","右に列を挿入","上に行を挿入","下に行を挿入","表を削除","行を削除","列を削除","セルを空にする","削除","取り消し線","下線","Pause","検索","置換","置換","編集","垂直方向の配置","水平方向の配置","Filter","Sort by changed","Sort by name","Sort by size","Add folder","セルの分割（垂直方向）","セルの分割（水平方向）","分割","セルの結合","列を追加","行を追加","境界線","埋め込みコード","更新","上付き文字","下付き文字","切り取り","貼付け","選択した内容を貼付け","文字数: %d","単語数: %d","全部","選択: %s","すべて選択","source","bold","italic","brush","link","undo","redo","table","image","eraser","paragraph","fontsize","video","font","about","print","symbol","underline","strikethrough","indent","outdent","fullsize","shrink","copyformat","分割線","箇条書き","番号付きリスト","切り取り","すべて選択","リンクを開く","リンクを編集","No follow","リンク解除","サイトを確認","鉛筆","URL","リセット","保存","Save as ...","リサイズ","Crop","幅","高さ","縦横比を保持","はい","いいえ","移除","選択","You can only edit your own images. Download this image on the host?","The image has been successfully uploaded to the host!","パレット","There are no files","Rename","Enter new name","プレビュー","ダウンロード","貼り付け","お使いのブラウザはクリップボードを使用できません","コピー","copy","角の丸み","全て表示"]

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports.default = ["Begin met typen..","Geavanceerd","Over Jodit","Jodit Editor","Jodit gebruikershandleiding","bevat gedetailleerde informatie voor gebruik.","Voor informatie over de licentie, ga naar onze website:","Volledige versie kopen","Copyright © XDSoft.net - Chupurnov Valeriy. Alle rechten voorbehouden.","Anker","Open in nieuwe tab","Editor in volledig scherm openen","Opmaak verwijderen","Vulkleur of tekstkleur aanpassen","Opnieuw","Ongedaan maken","Vet","Cursief","Geordende list invoegen","Ongeordende lijst invoegen","Centreren","Uitlijnen op volledige breedte","Links uitlijnen","Rechts uitlijnen","Horizontale lijn invoegen","Afbeelding invoegen","Bestand invoegen","Youtube/Vimeo video invoegen","Link toevoegen","Tekstgrootte","Lettertype","Format blok invoegen","Normaal","Koptekst 1","Koptekst 2","Koptekst 3","Koptekst 4","Citaat","Code","Invoegen","Tabel invoegen","Inspringing verkleinen","Inspringing vergroten","Symbool selecteren","Symbool invoegen","Opmaak kopieren","Modus veranderen","Marges","Boven","Rechts","Onder","Links","CSS styles","CSS classes","Uitlijning","Rechts","Gecentreerd","Links","--Leeg--","Src","Titel","Alternatieve tekst","Link","Link in nieuwe tab openen","Afbeelding","Bestand","Geavanceerd","Afbeeldingseigenschappen","Annuleren","OK","Deze code lijkt op HTML. Als HTML behouden?","Invoegen als HTML","Origineel behouden","Opschonen","Als tekst invoegen","Word-tekst gedetecteerd","De geplakte tekst is afkomstig van een Microsoft Word/Excel document. Wil je de opmaak behouden of opschonen?","Als onopgemaakte tekst invoegen","Bestandsbrowser","Fout bij het laden van de lijst","Fout bij het laden van de mappenlijst","Weet je het zeker?","Geef de map een naam","Map aanmaken","Type naam","Sleep hier een afbeelding naartoe","Sleep hier een bestand naartoe","of klik","Alternatieve tekst","Bladeren","Uploaden","Achtergrond","Tekst","Boven","Midden","Onder","Kolom invoegen (voor)","Kolom invoegen (na)","Rij invoegen (boven)","Rij invoegen (onder)","Tabel verwijderen","Rij verwijderen","Kolom verwijderen","Cel leegmaken","Verwijderen","Doorstrepen","Onderstrepen","Enter","Zoek naar","Vervangen door","Vervangen","Bewerken","Verticaal uitlijnen","Horizontaal uitlijnen","Filteren","Sorteren op wijzigingsdatum","Sorteren op naam","Sorteren op grootte","Map toevoegen","Verticaal splitsen","Horizontaal splitsen","Splitsen","Samenvoegen","Kolom toevoegen","Rij toevoegen","Rand","Embed code","Updaten","Superscript","Subscript","Selectie knippen","Plakken","Kies content om te plakken","Tekens: %d","Woorden: %d","Alles","Selecteer: %s","Selecteer alles","Broncode","vet","cursief","kwast","link","ongedaan maken","opnieuw","tabel","afbeelding","gum","paragraaf","lettergrootte","video","lettertype","over","afdrukken","symbool","onderstreept","doorgestreept","inspringen","minder inspringen","volledige grootte","kleiner maken","opmaak kopiëren","horizontale lijn","lijst","genummerde lijst","knip","alles selecteren","link openen","link aanpassen","niet volgen","link verwijderen","Recensie","Om te bewerken"," URL","Herstellen","Opslaan","Opslaan als ...","Grootte aanpassen","Bijknippen","Breedte","Hoogte","Verhouding behouden","Ja","Nee","Verwijderen","Selecteren","Je kunt alleen je eigen afbeeldingen aanpassen. Deze afbeelding downloaden?","De afbeelding is succesvol geüploadet!","Palette","Er zijn geen bestanden in deze map.","Hongaars","Voer een nieuwe naam in","voorvertoning","Download","Plakken van klembord","Uw browser ondersteunt geen directe toegang tot het klembord.","Selectie kopiëren","kopiëren","Border radius","Toon alle"]

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports.default = ["Napisz coś","Zaawansowane","O Jodit","Edytor Jodit","Instrukcja Jodit","zawiera szczegółowe informacje dotyczące użytkowania.","Odwiedź naszą stronę, aby uzyskać więcej informacji na temat licencji:","Zakup pełnej wersji","Copyright © XDSoft.net - Chupurnov Valeriy. Wszystkie prawa zastrzeżone.","Kotwica","Otwórz w nowej zakładce","Otwórz edytor w pełnym rozmiarze","Wyczyść formatowanie","Kolor wypełnienia lub ustaw kolor tekstu","Ponów","Cofnij","Pogrubienie","Kursywa","Wstaw listę wypunktowaną","Wstaw listę numeryczną","Wyśrodkuj","Wyjustuj","Wyrównaj do lewej","Wyrównaj do prawej","Wstaw linię poziomą","Wstaw grafikę","Wstaw plik","Wstaw film Youtube/vimeo","Wstaw link","Rozmiar tekstu","Krój czcionki","Wstaw formatowanie","Normalne","Nagłówek 1","Nagłówek 2","Nagłówek 3","Nagłówek 4","Cytat","Kod","Wstaw","Wstaw tabelę","Zmniejsz wcięcie","Zwiększ wcięcie","Wybierz znak specjalny","Wstaw znak specjalny","Malarz formatów","Zmień tryb","Marginesy","Górny","Prawy","Dolny","Levy","Style CSS","Klasy CSS","Wyrównanie","Prawa","środek","Lewa","brak","Źródło","Tytuł","Tekst alternatywny","Link","Otwórz w nowej zakładce","Grafika","Plik","Zaawansowne","Właściwości grafiki","Anuluj","OK","Twój kod wygląda jak HTML. Zachować HTML?","Wkleić jako HTML?","Oryginalny tekst","Wyczyść","Wstaw jako tekst","Wykryto tekst w formacie Word","Wklejany tekst pochodzi z dokumentu Microsoft Word/Excel. Chcesz zachować ten format czy wyczyścić go? ","Wstaw tylko treść","Przeglądarka plików","Błąd ładowania listy plików","Błąd ładowania folderów","Czy jesteś pewien?","Wprowadź nazwę folderu","Utwórz folder","wprowadź nazwę","Upuść plik graficzny","Upuść plik","lub kliknij tu","Tekst alternatywny","Przeglądaj","Wczytaj","Tło","Treść","Góra","Środek","Dół","Wstaw kolumnę przed","Wstaw kolumnę po","Wstaw wiersz przed","Wstaw wiersz po","Usuń tabelę","Usuń wiersz","Usuń kolumnę","Wyczyść komórkę","Usuń","Przekreślenie","Podkreślenie","Przerwa","Szukaj","Zamień na","Zamień","Edytuj","Wyrównywanie w pionie","Wyrównywanie w poziomie","Filtruj","Sortuj wg zmiany","Sortuj wg nazwy","Sortuj wg rozmiaru","Dodaj folder","Podziel w pionie","Podziel w poziomie","Podziel","Scal","Dodaj kolumnę","Dodaj wiersz","Obramowanie","Wstaw kod","Aktualizuj","indeks górny","index dolny","Wytnij zaznaczenie","Wklej","Wybierz zawartość do wklejenia","Znaki: %d","Słowa: %d","Wszystko","Wybierz: %s","Wybierz wszystko","HTML","pogrubienie","kursywa","pędzel","link","cofnij","ponów","tabela","grafika","wyczyść","akapit","rozmiar czcionki","wideo","czcionka","O programie","drukuj","symbol","podkreślenie","przekreślenie","wcięcie","wycięcie","pełen rozmiar","przytnij","format kopii","linia pozioma","lista","lista numerowana","wytnij","zaznacz wszystko","otwórz link","edytuj link","Atrybut no-follow","Usuń link","szukaj","edytuj","URL","wyczyść","zapisz","zapisz jako","Zmień rozmiar","Przytnij","Szerokość","Wysokość","Zachowaj proporcje","Tak","Nie","Usuń","Wybierz","Możesz edytować tylko swoje grafiki. Czy chcesz pobrać tą grafikę?","Grafika została pomyślnienie dodana na serwer","Paleta","Brak plików.","zmień nazwę","Wprowadź nową nazwę","podgląd","pobierz","Wklej ze schowka","Twoja przeglądarka nie obsługuje schowka","Kopiuj zaznaczenie","kopiuj","Zaokrąglenie krawędzi","Pokaż wszystkie"]

/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports.default = ["Escreva algo...","Avançado","Sobre o Jodit","Editor Jodit","Guia de usuário Jodit","contém ajuda detalhada para o uso.","Para informação sobre a licença, por favor visite nosso site:","Compre a versão completa","Copyright © XDSoft.net - Chupurnov Valeriy. Todos os direitos reservados.","Link","Abrir em nova aba","Abrir editor em tela cheia","Limpar formatação","Cor de preenchimento ou cor do texto","Refazer","Desfazer","Negrito","Itálico","Inserir lista não ordenada","Inserir lista ordenada","Centralizar","Justificar","Alinhar à Esquerda","Alinhar à Direita","Inserir linha horizontal","Inserir imagem","Inserir arquivo","Inserir vídeo do Youtube/vimeo","Inserir link","Tamanho da letra","Fonte","Inserir bloco","Normal","Cabeçalho 1","Cabeçalho 2","Cabeçalho 3","Cabeçalho 4","Citação","Código","Inserir","Inserir tabela","Diminuir recuo","Aumentar recuo","Selecionar caractere especial","Inserir caractere especial","Copiar formato","Mudar modo","Margens","cima","direta","baixo","esquerda","Estilos CSS","Classes CSS","Alinhamento","Direita","Centro","Esquerda","--Não Estabelecido--","Fonte","Título","Texto Alternativo","Link","Abrir link em nova aba","Imagem","Arquivo","Avançado","Propriedades da imagem","Cancelar","Ok","Seu código é similar ao HTML. Manter como HTML?","Colar como HTML?","Manter","Limpar","Inserir como Texto","Colado do Word Detectado","O conteúdo colado veio de um documento Microsoft Word/Excel. Você deseja manter o formato ou limpa-lo?","Inserir somente o Texto","Procurar arquivo","Erro ao carregar a lista","Erro ao carregar as pastas","Você tem certeza?","Escreva o nome da pasta","Criar pasta","Escreva seu nome","Soltar imagem","Soltar arquivo","ou clique","Texto alternativo","Explorar","Upload","Fundo","Texto","Cima","Meio","Baixo","Inserir coluna antes","Inserir coluna depois","Inserir linha acima","Inserir linha abaixo","Excluir tabela","Excluir linha","Excluir coluna","Limpar célula","Excluir","Tachado","Sublinhar","Pausa","Procurar por","Substituir com","Substituir","Editar","Alinhamento vertical","Alinhamento horizontal","filtrar","Ordenar por modificação","Ordenar por nome","Ordenar por tamanho","Adicionar pasta","Dividir vertical","Dividir horizontal","Dividir","Mesclar","Adicionar coluna","Adicionar linha","Borda","Incluir código","Atualizar","sobrescrito","subscrito","Cortar seleção","Colar","Escolher conteúdo para colar","Caracteres: %d","Palavras: %d","Tudo","Selecionar: %s","Selecionar tudo","HTML","negrito","itálico","pincel","link","desfazer","refazer","tabela","imagem","apagar","parágrafo","tamanho da letra","vídeo","fonte","Sobre de","Imprimir","Símbolo","sublinhar","tachado","recuar","diminuir recuo","Tamanho completo","diminuir","Copiar formato","linha horizontal","lista não ordenada","lista ordenada","Cortar","Selecionar tudo","Abrir link","Editar link","Não siga","Remover link","Visualizar","Editar","URL","Resetar","Salvar","Salvar como...","Redimensionar","Recortar","Largura","Altura","Manter a proporção","Sim","Não","Remover","Selecionar","Você só pode editar suas próprias imagens. Baixar essa imagem pro servidor?","A imagem foi enviada com sucesso para o servidor!","Palette","Não há arquivos nesse diretório.","Húngara","Digite um novo nome","preview","Baixar","Colar da área de transferência","O seu navegador não oferece suporte a acesso direto para a área de transferência.","Selecção de cópia","cópia","Border radius","Mostrar todos os"]

/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports.default = ["Напишите что-либо","Расширенные","О Jodit","Редактор Jodit","Jodit Руководство пользователя","содержит детальную информацию по использованию","Для получения сведений о лицензии , пожалуйста, перейдите на наш сайт:","Купить полную версию","Авторские права © XDSoft.net - Чупурнов Валерий. Все права защищены.","Анкор","Открывать ссылку в новой вкладке","Открыть редактор в полном размере","Очистить форматирование","Цвет заливки или цвет текста","Повтор","Отмена","Жирный","Наклонный","Вставка маркированного списка","Вставить нумерованный список","Выровнять по центру","Выровнять по ширине","Выровнять по левому краю","Выровнять по правому краю","Вставить горизонтальную линию","Вставить изображение","Вставить файл","Вставьте видео","Вставить ссылку","Размер шрифта","Шрифт","Вставить блочный элемент","Нормальный текст","Заголовок 1","Заголовок 2","Заголовок 3","Заголовок 4","Цитата","Код","Вставить","Вставить таблицу","Уменьшить отступ","Увеличить отступ","Выберите специальный символ","Вставить специальный символ","Формат краски","Источник","Отступы","сверху","справа","снизу","слева","Стили","Классы","Выравнивание","По правому краю","По центру","По левому краю","--не устанавливать--","src","Заголовок","Альтернативный текст (alt)","Ссылка","Открывать ссылку в новом окне",null,"Файл",null,"Свойства изображения","Отмена","Ок","Ваш текст, который вы пытаетесь вставить похож на HTML. Вставить его как HTML?","Вставить как HTML?","Сохранить оригинал","Почистить","Вставить как текст","Возможно это фрагмент Word или Excel","Контент который вы вставляете поступает из документа Microsoft Word / Excel. Вы хотите сохранить формат или очистить его?","Вставить только текст","Браузер файлов","Ошибка при загрузке списка изображений","Ошибка при загрузке списка директорий","Вы уверены?","Введите название директории","Создать директорию","введите название","Перетащите сюда изображение","Перетащите сюда файл","или нажмите","Альтернативный текст","Сервер","Загрузка","Фон","Текст"," К верху","По середине","К низу","Вставить столбец до","Вставить столбец после","Вставить ряд выше","Вставить ряд ниже","Удалить таблицу","Удалять ряд","Удалить столбец","Очистить ячейку","Удалить","Перечеркнуть","Подчеркивание","Разделитель","Найти","Заменить на","Заменить","Редактировать","Вертикальное выравнивание","Горизонтальное выравнивание","Фильтр","По изменению","По имени","По размеру","Добавить папку","Разделить по вертикали","Разделить по горизонтали","Разделить","Объединить в одну","Добавить столбец","Добавить строку","Рамка","Код","Обновить","верхний индекс","индекс","Вырезать","Вставить","Выбрать контент для вставки","Символов: %d","Слов: %d","Выделить все","Выделить: %s","Выделить все","HTML","жирный","курсив","заливка","ссылка","отменить","повторить","таблица","Изображение","очистить","параграф","размер шрифта","видео","шрифт","о редакторе","печать","символ","подчеркнутый","перечеркнутый","отступ","выступ","во весь экран","обычный размер","Копировать формат","линия","Список","Нумерованный список","Вырезать","Выделить все","Открыть ссылку","Редактировать ссылку","Атрибут nofollow","Убрать ссылку","Просмотр","Редактировать","URL","Восстановить","Сохранить","Сохранить как","Изменить размер","Обрезать размер","Ширина","Высота","Сохранять пропорции","Да","Нет","Удалить","Выделить","Вы можете редактировать только свои собственные изображения. Загрузить это изображение на ваш сервер?","Изображение успешно загружено на сервер!","палитра","В данном каталоге нет файлов","Переименовать","Введите новое имя","Предпросмотр","Скачать","Вставить из буфера обмена","Ваш браузер не поддерживает прямой доступ к буферу обмена.","Скопировать выделенное","копия","Радиус границы","Показать все"]

/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports.default = ["Bir şey yazın.","Gelişmiş","Jodit Hakkında","Jodit Editor","Jodit Kullanım Kılavuzu","kullanım için detaylı bilgiler içerir","Lisans hakkında bilgi için lütfen web sitemize gidin:","Tam versiyon satın al","Copyright © XDSoft.net - Chupurnov Valeriy. Tüm Hakları Saklıdır","Bağlantı","Yeni sekmede aç","Tam ekran editör","Stili temizle","Dolgu ve yazı rengi seç","İleri Al","Geri Al","Kalın","İtalik","Sırasız Liste Ekle","Sıralı Liste Ekle","Ortala","Kenarlara Yasla","Sola Yasla","Sağa Yasla","Yatay Çizgi Ekle","Resim Ekle","Dosya Ekle","Youtube/vimeo Videosu Ekle","Bağlantı Ekle","Font Boyutu","Font Ailesi","Blok Ekle","Normal","Başlık 1","Başlık 2","Başlık 3","Başlık 4","Alıntı","Code","Ekle","Tablo Ekle","Girintiyi Azalt","Girintiyi Arttır","Özel Karakter Seç","Özel Karakter Ekle","Resim Biçimi","Mod Değiştir","MEsafeler","Üst","Sağ","Alt","Sol","CSS Stilleri","CSS Sınıfları","Hizalama","Sağ","Ortalı","Sol","Belirlenmedi","Kaynak","Başlık","Alternatif Yazı","Link","Bağlantıyı yeni sekmede aç","Resim","Dosya","Gelişmiş","Resim özellikleri","İptal","Tamam","Kodunuz HTML koduna benziyor. HTML olarak devam etmek ister misiniz?","HTML olarak yapıştır","Sakla","Temizle","Yazı olarak ekle","Word biçiminde yapıştırma algılandı","Der Inhalt, den Sie einfügen, stammt aus einem Microsoft Word / Excel-Dokument. Möchten Sie das Format erhalten oder löschen?","Nur Text einfügen","Dosya Gezgini","Liste yüklenirken hata oluştu","Klasörler yüklenirken hata oluştur","Emin misiniz?","Dizin yolu giriniz","Dizin oluştur","Typname","Resim bırak","Dosya bırak","veya tıkla","Alternatif yazı","Ekle","Yükle","Arka plan","Yazı","Üst","Orta","Aşağı","Öncesine kolon ekle","Sonrasına kolon ekle","Üstüne satır ekle","Altına satır ekle","Tabloyu sil","Satır sil","Kolon sil","Hücreyi boşalt","Sil","Durchschlagen","Alt çizgi","Durdur","Ara","Şununla değiştir","Değiştir","Düzenle","Dikey hizalama","Yatay hizalama","Filtre","Değişime göre sırala","İsme göre sırala","Boyuta göre sırala","Klasör ekle","Dikey ayır","Yatay ayır","Ayır","Birleştir","Kolon ekle","Satır ekle","Kenarlık","Kod ekle","Güncelle","Üst yazı","Alt yazı","Seçilimi kes","Yapıştır","Yapıştırılacak içerik seç","Harfler: %d","Kelimeler: %d","Tümü","Seç: %s","Tümünü seç","Kaynak","Kalın","italik","Fırça","Bağlantı","Geri al","İleri al","Tablo","Resim","Silgi","Paragraf","Font boyutu","Video","Font","Hakkında","Yazdır","Sembol","Alt çizgi","Üstü çizili","Girinti","Çıkıntı","Tam ekran","Küçült","Kopyalama Biçimi","Ayraç","Sırasız liste","Sıralı liste","Kes","Tümünü seç","Bağlantıyı aç","Bağlantıyı düzenle","Nofollow özelliği","Bağlantıyı kaldır","Yorumu","Düzenlemek için","URL","Sıfırla","Kaydet","Farklı kaydet","Boyutlandır","Kırp","Genişlik","Yükseklik","En boy oranını koru","Evet","Hayır","Sil","Seç","Sadece kendi resimlerinizi düzenleyebilirsiniz. Bu görseli kendi hostunuza indirmek ister misiniz?","Görsel başarıyla hostunuza yüklendi","Palette","Bu dizinde dosya yok.","Macarca","Yeni isim girin","Ön izleme","İndir","Panodan yapıştır ","Tarayıcınız pano doğrudan erişim desteklemiyor.","Kopya seçimi","kopya","Sınır yarıçapı","Tümünü Göster "]

/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports.default = ["输入一些内容","高级","关于Jodit","Jodit Editor","开发者指南","使用帮助","有关许可证的信息，请访问我们的网站：","购买完整版本","Copyright © XDSoft.net - Chupurnov Valeriy. All rights reserved.","Anchor","在新窗口打开","全屏编辑","清除样式","颜色","重做","撤销","粗体","斜体","符号列表","编号","居中","对齐文本","左对齐","右对齐","分割线","图片","文件","youtube/vimeo 视频","链接","字号","字体","格式块","文本","标题1","标题2","标题3","标题4","引用","代码","插入","表格","减少缩进","增加缩进","选择特殊符号","特殊符号","格式复制","改变模式","外边距（Margins）","top","right","bottom","left","样式","Classes","对齐方式","居右","居中","居左","无","Src","Title","Alternative","Link","在新窗口打开链接","图片","file","高级","图片属性","取消","确定","你粘贴的文本是一段html代码，是否保留源格式","html粘贴","保留源格式","匹配目标格式","把html代码视为普通文本","文本粘贴","正在粘贴 Word/Excel 的文本，是否保留源格式？","只保留文本","文件管理","加载list错误","加载folders错误","你确定吗？","输入路径","创建路径","type name","拖动图片到此","拖动文件到此","或点击","Alternative text","浏览","上传","背景色","文字","顶部","中间","底部","在之前插入列","在之后插入列","在之前插入行","在之后插入行","删除表格","删除行","删除列","清除内容","删除","删除线","下划线","Pause","查找","替换为","替换",null,"垂直对齐","水平对齐","筛选","修改时间排序","名称排序","大小排序","新建文件夹","垂直拆分","水平拆分","拆分","合并","添加列","添加行","边框","嵌入代码","更新","上标","下标","剪切","粘贴","选择内容并粘贴","字符数: %d","单词数: %d","全部","选择: %s","全选","源码","粗体","斜体","颜色","链接","撤销","重做","表格","图片","橡皮擦","段落","字号","视频","字体","关于","打印","符号","下划线","上出现","增加缩进","减少缩进","全屏","收缩","复制格式","分割线","无序列表","顺序列表","剪切","全选","打开链接","编辑链接","No follow","Unlink","回顧","铅笔","URL","重置","保存","保存为","调整大小","Crop","宽","高","保存长宽比","是","不","移除","选择","你只能编辑你自己的图片。Download this image on the host?","图片上传成功","调色板","此目录中沒有文件。","重命名","输入新名称","预览","下载","粘贴从剪贴板","你浏览器不支持直接访问的剪贴板。","复制的选择","复制","边界半径","显示所有"]

/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports.default = ["輸入一些內容","高級","關於Jodit","Jodit Editor","開發者指南","使用幫助","有關許可證的信息，請訪問我們的網站：","購買完整版本","Copyright © XDSoft.net - Chupurnov Valeriy. All rights reserved.","Anchor","在新窗口打開","全屏編輯","清除樣式","顏色","重做","撤銷","粗體","斜體","符號列表","編號","居中","對齊文本","左對齊","右對齊","分割線","圖片","文件","youtube/vimeo 影片","鏈接","字號","字體","格式塊","文本","標題1","標題2","標題3","標題4","引用","代碼","插入","表格","減少縮進","增加縮進","選擇特殊符號","特殊符號","格式複製","改變模式","外邊距（Margins）","top","right","bottom","left","樣式","Classes","對齊方式","居右","居中","居左","無","Src","Title","Alternative","Link","在新窗口打開鏈接","圖片","file","高級","圖片屬性","取消","確定","你黏貼的文本是一段html代碼，是否保留源格式","html黏貼","保留源格式","匹配目標格式","把html代碼視為普通文本","文本黏貼","正在黏貼 Word/Excel 的文本，是否保留源格式？","只保留文本","文件管理","加載list錯誤","加載folders錯誤","你確定嗎？","輸入路徑","創建路徑","type name","拖動圖片到此","拖動文件到此","或點擊","Alternative text","瀏覽","上傳","背景色","文字","頂部","中間","底部","在之前插入列","在之後插入列","在之前插入行","在之後插入行","刪除表格","刪除行","刪除列","清除內容","刪除","刪除線","下劃線","Pause","查找","替換為","替換",null,"垂直對齊","水平對齊","篩選","修改時間排序","名稱排序","大小排序","新建文件夾","垂直拆分","水平拆分","拆分","合併","添加列","添加行","邊框","嵌入代碼","更新","上標","下標","剪切","黏貼","選擇內容並黏貼","字符數: %d","單詞數: %d","全部","選擇: %s","全選","源碼","粗體","斜體","顏色","鏈接","撤銷","重做","表格","圖片","橡皮擦","段落","字號","影片","字體","關於","打印","符號","下劃線","上出現","增加縮進","減少縮進","全屏","收縮","複製格式","分割線","無序列表","順序列表","剪切","全選","打開鏈接","編輯鏈接","No follow","Unlink","回顧","鉛筆","URL","重置","保存","保存為","調整大小","Crop","寬","高","保存長寬比","是","不","移除","選擇","妳只能編輯妳自己的圖片。Download this image on the host?","圖片上傳成功","調色板","此目錄中沒有文件。","重命名","輸入新名稱","預覽","下載","วางจากคลิปบอร์ด","ของเบราว์เซอร์ไม่สนับสนุนโดยตรงเข้าไปยังคลิปบอร์ด","คัดลอกส่วนที่เลือก","คัดลอก","เส้นขอบรัศมี","แสดงทั้งหมด"]

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var Dom_1 = __webpack_require__(1);
var size_1 = __webpack_require__(19);
var icon_1 = __webpack_require__(5);
Config_1.Config.prototype.addNewLine = true;
Config_1.Config.prototype.addNewLineOnDBLClick = true;
Config_1.Config.prototype.addNewLineTagsTriggers = [
    'table',
    'iframe',
    'img',
    'hr',
    'jodit'
];
function addNewLine(editor) {
    if (!editor.options.addNewLine) {
        return;
    }
    var line = editor.create.fromHTML('<div role="button" tabIndex="-1" title="' +
        editor.i18n('Break') +
        '" class="jodit-add-new-line"><span>' +
        icon_1.ToolbarIcon.getIcon('enter') +
        '</span></div>');
    var delta = 10;
    var isMatchedTag = new RegExp('^(' + editor.options.addNewLineTagsTriggers.join('|') + ')$', 'i');
    var timeout;
    var hidden = false;
    var preview = false;
    var current;
    var lineInFocus = false;
    var show = function () {
        if (editor.options.readonly || editor.isLocked()) {
            return;
        }
        if (editor.container.classList.contains('jodit_popup_active')) {
            return;
        }
        editor.async.clearTimeout(timeout);
        line.classList.toggle('jodit-add-new-line_after', !preview);
        editor.container.appendChild(line);
        line.style.width = editor.editor.clientWidth + 'px';
        hidden = false;
    };
    var hideForce = function () {
        editor.async.clearTimeout(timeout);
        lineInFocus = false;
        Dom_1.Dom.safeRemove(line);
        hidden = true;
    };
    var canGetFocus = function (elm) {
        return (elm !== null &&
            Dom_1.Dom.isBlock(elm, editor.editorWindow) &&
            !/^(img|table|iframe|hr)$/i.test(elm.nodeName));
    };
    var hide = function () {
        if (hidden || lineInFocus) {
            return;
        }
        timeout = editor.async.setTimeout(hideForce, {
            timeout: 500,
            label: 'add-new-line-hide'
        });
    };
    editor.events
        .on('beforeDestruct', function () {
        editor.async.clearTimeout(timeout);
        Dom_1.Dom.safeRemove(line);
        editor.events.off(line);
    })
        .on('afterInit', function () {
        editor.events
            .on(line, 'mousemove', function (e) {
            e.stopPropagation();
        })
            .on(line, 'mousedown touchstart', function (e) {
            var p = editor.create.inside.element(editor.options.enter);
            if (preview && current && current.parentNode) {
                current.parentNode.insertBefore(p, current);
            }
            else {
                editor.editor.appendChild(p);
            }
            editor.selection.setCursorIn(p);
            editor.events.fire('synchro');
            hideForce();
            e.preventDefault();
        });
    })
        .on('afterInit', function () {
        editor.events
            .on(editor.editor, 'scroll', hideForce)
            .on('change', hideForce)
            .on(editor.container, 'mouseleave', hide)
            .on(line, 'mouseenter', function () {
            clearTimeout(timeout);
            lineInFocus = true;
        })
            .on(line, 'mouseleave', function () {
            lineInFocus = false;
        })
            .on(editor.editor, 'dblclick', function (e) {
            if (!editor.options.readonly &&
                editor.options.addNewLineOnDBLClick &&
                e.target === editor.editor &&
                editor.selection.isCollapsed()) {
                var editorBound = size_1.offset(editor.editor, editor, editor.editorDocument);
                var top_1 = e.pageY - editor.editorWindow.pageYOffset;
                var p = editor.create.inside.element(editor.options.enter);
                if (Math.abs(top_1 - editorBound.top) <
                    Math.abs(top_1 - (editorBound.height + editorBound.top)) &&
                    editor.editor.firstChild) {
                    editor.editor.insertBefore(p, editor.editor.firstChild);
                }
                else {
                    editor.editor.appendChild(p);
                }
                editor.selection.setCursorIn(p);
                editor.setEditorValue();
                hideForce();
                e.preventDefault();
            }
        })
            .on(editor.editor, 'mousemove', editor.async.debounce(function (e) {
            var currentElement = editor.editorDocument.elementFromPoint(e.pageX - editor.editorWindow.pageXOffset, e.pageY - editor.editorWindow.pageYOffset);
            if (currentElement &&
                Dom_1.Dom.isOrContains(line, currentElement)) {
                return;
            }
            if (!currentElement ||
                !Dom_1.Dom.isOrContains(editor.editor, currentElement)) {
                return;
            }
            if (!currentElement ||
                !currentElement.nodeName.match(isMatchedTag) ||
                !Dom_1.Dom.isOrContains(editor.editor, currentElement)) {
                currentElement = Dom_1.Dom.closest(currentElement, isMatchedTag, editor.editor);
                if (!currentElement) {
                    hide();
                    return;
                }
            }
            if (isMatchedTag.test(currentElement.nodeName)) {
                var parentBox = Dom_1.Dom.up(currentElement, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor);
                if (parentBox && parentBox !== editor.editor) {
                    currentElement = parentBox;
                }
            }
            var editorBound = size_1.offset(editor.editor, editor, editor.editorDocument);
            var position = size_1.offset(currentElement, editor, editor.editorDocument);
            var top = false;
            if (Math.abs(e.pageY - position.top) < delta) {
                top = position.top;
                if (top - editorBound.top >= 20) {
                    top -= 15;
                }
                preview = true;
            }
            if (Math.abs(e.pageY - (position.top + position.height)) < delta) {
                top = position.top + position.height;
                if (editorBound.top + editorBound.height - top >=
                    25) {
                    top += 15;
                }
                preview = false;
            }
            if (top !== false &&
                ((preview &&
                    !Dom_1.Dom.prev(currentElement, canGetFocus, editor.editor)) ||
                    (!preview &&
                        !Dom_1.Dom.next(currentElement, canGetFocus, editor.editor)))) {
                line.style.top = top + 'px';
                current = currentElement;
                show();
            }
            else {
                current = false;
                hide();
            }
        }, editor.defaultTimeout));
    });
}
exports.addNewLine = addNewLine;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var Dom_1 = __webpack_require__(1);
Config_1.Config.prototype.autofocus = false;
function autofocus(editor) {
    editor.events.on('afterInit', function () {
        if (editor.options.autofocus) {
            if (editor.defaultTimeout) {
                editor.async.setTimeout(editor.selection.focus, 300);
            }
            else {
                editor.selection.focus();
            }
        }
    });
    editor.events.on('afterInit afterAddPlace', function () {
        editor.events
            .off(editor.editor, 'mousedown.autofocus')
            .on(editor.editor, 'mousedown.autofocus', function (e) {
            if (editor.isEditorMode() &&
                e.target &&
                Dom_1.Dom.isBlock(e.target, editor.editorWindow) &&
                !e.target.childNodes.length) {
                if (editor.editor === e.target) {
                    editor.selection.focus();
                }
                else {
                    editor.selection.setCursorIn(e.target);
                }
            }
        });
    });
}
exports.autofocus = autofocus;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var consts = __webpack_require__(2);
var constants_1 = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
function backspace(editor) {
    var removeEmptyBlocks = function (container) {
        var box = container, parent;
        helpers_1.normalizeNode(container);
        do {
            var html = box.innerHTML.replace(consts.INVISIBLE_SPACE_REG_EXP, '');
            if ((!html.length || html === '<br>') &&
                !Dom_1.Dom.isCell(box, editor.editorWindow) &&
                box.parentNode &&
                container !== editor.editor) {
                parent = box.parentNode;
                editor.selection.removeNode(box);
            }
            else {
                break;
            }
            box = parent;
        } while (box && box !== editor.editor);
    };
    var removeChar = function (box, toLeft, range) {
        if (Dom_1.Dom.isText(box.node) && helpers_1.isString(box.node.nodeValue)) {
            var value = box.node.nodeValue, startOffset = toLeft ? value.length : 0;
            var increment = toLeft ? -1 : 1, startOffsetInRange = startOffset;
            while (startOffset >= 0 &&
                startOffset <= value.length &&
                value[startOffset + (toLeft ? -1 : 0)] ===
                    consts.INVISIBLE_SPACE) {
                startOffset += increment;
            }
            if (startOffset !== startOffsetInRange) {
                if (toLeft) {
                    value =
                        value.substr(0, startOffset) +
                            value.substr(startOffsetInRange);
                }
                else {
                    value =
                        value.substr(0, startOffsetInRange) +
                            value.substr(startOffset);
                    startOffset = startOffsetInRange;
                }
                box.node.nodeValue = value;
            }
            range.setStart(box.node, startOffset);
            range.collapse(true);
            editor.selection.selectRange(range);
            var nextElement = Dom_1.Dom.findInline(box.node, toLeft, editor.editor);
            if (value.length) {
                var setRange = false;
                if (toLeft) {
                    if (startOffset) {
                        setRange = true;
                    }
                }
                else {
                    if (startOffset < value.length) {
                        setRange = true;
                    }
                }
                if (setRange) {
                    return true;
                }
            }
            else {
                range.setStartBefore(box.node);
                range.collapse(true);
                editor.selection.selectRange(range);
                editor.selection.removeNode(box.node);
                box.node = nextElement;
            }
            if (nextElement) {
                if (Dom_1.Dom.isInlineBlock(nextElement)) {
                    nextElement = toLeft
                        ? nextElement.lastChild
                        : nextElement.firstChild;
                }
                if (Dom_1.Dom.isText(nextElement)) {
                    box.node = nextElement;
                    return removeChar(box, toLeft, range);
                }
            }
        }
    };
    var potentialRemovable = constants_1.MAY_BE_REMOVED_WITH_KEY;
    var removePotential = function (node) {
        if (node && potentialRemovable.test(node.nodeName)) {
            editor.selection.removeNode(node);
            return false;
        }
    };
    var removeInline = function (box, toLeft, range) {
        if (box.node) {
            var workElement = box.node;
            var removeCharFlag = removeChar(box, toLeft, range);
            if (removeCharFlag !== undefined) {
                return true;
            }
            if (!box.node) {
                box.node = workElement.parentNode;
            }
            if (box.node === editor.editor) {
                return false;
            }
            var node = box.node;
            if (removePotential(node) === false) {
                return false;
            }
            if (node) {
                node = toLeft ? node.previousSibling : node.nextSibling;
            }
            while (Dom_1.Dom.isText(node) &&
                node.nodeValue &&
                node.nodeValue.match(/^[\n\r]+$/)) {
                node = toLeft ? node.previousSibling : node.nextSibling;
            }
            return removePotential(node);
        }
    };
    var isEmpty = function (node) {
        if (node.nodeName.match(/^(TD|TH|TR|TABLE|LI)$/) !== null) {
            return false;
        }
        if (Dom_1.Dom.isEmpty(node) ||
            node.nodeName.match(potentialRemovable) !== null) {
            return true;
        }
        if (Dom_1.Dom.isText(node) && !Dom_1.Dom.isEmptyTextNode(node)) {
            return false;
        }
        return node.childNodes.length
            ? Array.from(node.childNodes).every(isEmpty)
            : true;
    };
    editor.events
        .on('afterCommand', function (command) {
        if (command === 'delete') {
            var current = editor.selection.current();
            if (current &&
                current.firstChild &&
                current.firstChild.nodeName === 'BR') {
                editor.selection.removeNode(current.firstChild);
            }
            if (!helpers_1.trim(editor.editor.textContent || '') &&
                !editor.editor.querySelector('img') &&
                (!current || !Dom_1.Dom.closest(current, 'table', editor.editor))) {
                editor.editor.innerHTML = '';
                var node = editor.selection.setCursorIn(editor.editor);
                editor.selection.removeNode(node);
            }
        }
    })
        .on('keydown', function (event) {
        if (event.which === consts.KEY_BACKSPACE ||
            event.which === consts.KEY_DELETE) {
            var toLeft = event.which === consts.KEY_BACKSPACE;
            if (!editor.selection.isFocused()) {
                editor.selection.focus();
            }
            if (!editor.selection.isCollapsed()) {
                editor.execCommand('Delete');
                return false;
            }
            var sel = editor.selection.sel, range = sel && sel.rangeCount ? sel.getRangeAt(0) : false;
            if (!range) {
                return false;
            }
            var fakeNode = editor.create.inside.text(consts.INVISIBLE_SPACE);
            var marker = editor.create.inside.span();
            try {
                range.insertNode(fakeNode);
                if (!Dom_1.Dom.isOrContains(editor.editor, fakeNode)) {
                    return false;
                }
                var container = Dom_1.Dom.up(fakeNode, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor);
                var workElement = Dom_1.Dom.findInline(fakeNode, toLeft, editor.editor);
                var box = {
                    node: workElement
                };
                var tryRemoveInline = void 0;
                if (workElement) {
                    tryRemoveInline = removeInline(box, toLeft, range);
                }
                else if (fakeNode.parentNode) {
                    tryRemoveInline = removeInline({
                        node: toLeft
                            ? fakeNode.parentNode.previousSibling
                            : fakeNode.parentNode.nextSibling
                    }, toLeft, range);
                }
                if (tryRemoveInline !== undefined) {
                    return tryRemoveInline ? undefined : false;
                }
                if (container && container.nodeName.match(/^(TD)$/)) {
                    return false;
                }
                var prevBox = toLeft
                    ? Dom_1.Dom.prev(box.node || fakeNode, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor)
                    : Dom_1.Dom.next(box.node || fakeNode, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor);
                if (!prevBox && container && container.parentNode) {
                    prevBox = editor.create.inside.element(editor.options.enter);
                    var boxNode = container;
                    while (boxNode &&
                        boxNode.parentNode &&
                        boxNode.parentNode !== editor.editor) {
                        boxNode = boxNode.parentNode;
                    }
                    boxNode.parentNode &&
                        boxNode.parentNode.insertBefore(prevBox, boxNode);
                }
                else {
                    if (prevBox && isEmpty(prevBox)) {
                        editor.selection.removeNode(prevBox);
                        return false;
                    }
                }
                if (prevBox) {
                    var tmpNode = editor.selection.setCursorIn(prevBox, !toLeft);
                    editor.selection.insertNode(marker, false, false);
                    if (Dom_1.Dom.isText(tmpNode) &&
                        tmpNode.nodeValue === consts.INVISIBLE_SPACE) {
                        Dom_1.Dom.safeRemove(tmpNode);
                    }
                }
                if (container) {
                    removeEmptyBlocks(container);
                    if (prevBox && container.parentNode) {
                        if (container.nodeName === prevBox.nodeName &&
                            container.parentNode &&
                            prevBox.parentNode &&
                            container.parentNode !== editor.editor &&
                            prevBox.parentNode !== editor.editor &&
                            container.parentNode !== prevBox.parentNode &&
                            container.parentNode.nodeName ===
                                prevBox.parentNode.nodeName) {
                            container = container.parentNode;
                            prevBox = prevBox.parentNode;
                        }
                        Dom_1.Dom.moveContent(container, prevBox, !toLeft);
                        helpers_1.normalizeNode(prevBox);
                    }
                    if (prevBox && prevBox.nodeName === 'LI') {
                        var UL = Dom_1.Dom.closest(prevBox, 'Ul|OL', editor.editor);
                        if (UL) {
                            var nextBox = UL.nextSibling;
                            if (nextBox &&
                                nextBox.nodeName === UL.nodeName &&
                                UL !== nextBox) {
                                Dom_1.Dom.moveContent(nextBox, UL, !toLeft);
                                editor.selection.removeNode(nextBox);
                            }
                        }
                    }
                    removeEmptyBlocks(container);
                    return false;
                }
            }
            finally {
                if (fakeNode.parentNode &&
                    fakeNode.nodeValue === consts.INVISIBLE_SPACE) {
                    var parent_1 = fakeNode.parentNode;
                    Dom_1.Dom.safeRemove(fakeNode);
                    if (!parent_1.firstChild &&
                        parent_1.parentNode &&
                        parent_1 !== editor.editor) {
                        editor.selection.removeNode(parent_1);
                    }
                }
                if (marker &&
                    Dom_1.Dom.isOrContains(editor.editor, marker, true)) {
                    var tmpNode = editor.selection.setCursorBefore(marker);
                    Dom_1.Dom.safeRemove(marker);
                    if (tmpNode &&
                        tmpNode.parentNode &&
                        (Dom_1.Dom.findInline(tmpNode, true, tmpNode.parentNode) ||
                            Dom_1.Dom.findInline(tmpNode, true, tmpNode.parentNode))) {
                        Dom_1.Dom.safeRemove(tmpNode);
                    }
                }
                editor.setEditorValue();
            }
            return false;
        }
    });
}
exports.backspace = backspace;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
Config_1.Config.prototype.controls.subscript = {
    tags: ['sub'],
    tooltip: 'subscript'
};
Config_1.Config.prototype.controls.superscript = {
    tags: ['sup'],
    tooltip: 'superscript'
};
Config_1.Config.prototype.controls.bold = {
    tagRegExp: /^(strong|b)$/i,
    tags: ['strong', 'b'],
    css: {
        'font-weight': ['bold', '700']
    },
    tooltip: 'Bold'
};
Config_1.Config.prototype.controls.italic = {
    tagRegExp: /^(em|i)$/i,
    tags: ['em', 'i'],
    css: {
        'font-style': 'italic'
    },
    tooltip: 'Italic'
};
Config_1.Config.prototype.controls.underline = {
    tagRegExp: /^(u)$/i,
    tags: ['u'],
    css: {
        'text-decoration': 'underline'
    },
    tooltip: 'Underline'
};
Config_1.Config.prototype.controls.strikethrough = {
    tagRegExp: /^(s)$/i,
    tags: ['s'],
    css: {
        'text-decoration': 'line-through'
    },
    tooltip: 'Strike through'
};
function bold(editor) {
    var callBack = function (command) {
        var control = Config_1.Config.defaultOptions.controls[command], cssOptions = tslib_1.__assign({}, control.css), cssRules = {};
        Object.keys(cssOptions).forEach(function (key) {
            cssRules[key] = Array.isArray(cssOptions[key])
                ? cssOptions[key][0]
                : cssOptions[key];
        });
        editor.selection.applyCSS(cssRules, control.tags ? control.tags[0] : undefined, control.css);
        editor.events.fire('synchro');
        return false;
    };
    editor
        .registerCommand('bold', {
        exec: callBack,
        hotkeys: ['ctrl+b', 'cmd+b']
    })
        .registerCommand('italic', {
        exec: callBack,
        hotkeys: ['ctrl+i', 'cmd+i']
    })
        .registerCommand('underline', {
        exec: callBack,
        hotkeys: ['ctrl+u', 'cmd+u']
    })
        .registerCommand('strikethrough', {
        exec: callBack
    });
}
exports.bold = bold;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var Plugin_1 = __webpack_require__(6);
Config_1.Config.prototype.cleanHTML = {
    timeout: 300,
    removeEmptyElements: true,
    fillEmptyParagraph: true,
    replaceNBSP: true,
    replaceOldTags: {
        i: 'em',
        b: 'strong'
    },
    allowTags: false,
    denyTags: false
};
Config_1.Config.prototype.controls.eraser = {
    command: 'removeFormat',
    tooltip: 'Clear Formatting'
};
var cleanHtml = (function (_super) {
    tslib_1.__extends(cleanHtml, _super);
    function cleanHtml() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function () {
            if (!_this.allowEdit()) {
                return;
            }
            var editor = _this.jodit;
            var current = editor.selection.current();
            var replaceOldTags = editor.options.cleanHTML.replaceOldTags;
            if (replaceOldTags && current) {
                var tags = Object.keys(replaceOldTags).join('|');
                if (editor.selection.isCollapsed()) {
                    var oldParent = Dom_1.Dom.closest(current, tags, editor.editor);
                    if (oldParent) {
                        var selInfo = editor.selection.save(), tagName = replaceOldTags[oldParent.nodeName.toLowerCase()] ||
                            replaceOldTags[oldParent.nodeName];
                        Dom_1.Dom.replace(oldParent, tagName, editor.create.inside, true, false);
                        editor.selection.restore(selInfo);
                    }
                }
            }
            var node = null;
            if (editor.editor.firstChild) {
                node = editor.editor.firstChild;
            }
            var remove = [];
            var work = _this.checkNode(node, current, remove);
            remove.forEach(Dom_1.Dom.safeRemove);
            if (remove.length || work) {
                editor.events && editor.events.fire('syncho');
            }
        };
        _this.checkNode = function (nodeElm, current, remove) {
            var work = false;
            if (!nodeElm) {
                return work;
            }
            if (_this.isRemovableNode(nodeElm, current)) {
                remove.push(nodeElm);
                return _this.checkNode(nodeElm.nextSibling, current, remove);
            }
            if (_this.jodit.options.cleanHTML.fillEmptyParagraph &&
                Dom_1.Dom.isBlock(nodeElm, _this.jodit.editorWindow) &&
                Dom_1.Dom.isEmpty(nodeElm, /^(img|svg|canvas|input|textarea|form|br)$/)) {
                var br = _this.jodit.create.inside.element('br');
                nodeElm.appendChild(br);
                work = true;
            }
            var allow = _this.allowTagsHash;
            if (allow && allow[nodeElm.nodeName] !== true) {
                var attrs = nodeElm.attributes;
                if (attrs && attrs.length) {
                    var removeAttrs = [];
                    for (var i = 0; i < attrs.length; i += 1) {
                        var attr = allow[nodeElm.nodeName][attrs[i].name];
                        if (!attr || (attr !== true && attr !== attrs[i].value)) {
                            removeAttrs.push(attrs[i].name);
                        }
                    }
                    if (removeAttrs.length) {
                        work = true;
                    }
                    removeAttrs.forEach(function (attr) {
                        nodeElm.removeAttribute(attr);
                    });
                }
            }
            work = _this.checkNode(nodeElm.firstChild, current, remove) || work;
            work = _this.checkNode(nodeElm.nextSibling, current, remove) || work;
            return work;
        };
        _this.allowTagsHash = cleanHtml.getHash(_this.jodit.options.cleanHTML.allowTags);
        _this.denyTagsHash = cleanHtml.getHash(_this.jodit.options.cleanHTML.denyTags);
        _this.onKeyUpCleanUp = function () {
            var editor = _this.jodit;
            if (!_this.allowEdit()) {
                return;
            }
            var currentNode = editor.selection.current();
            if (currentNode) {
                var currentParagraph = Dom_1.Dom.up(currentNode, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor);
                if (currentParagraph) {
                    Dom_1.Dom.all(currentParagraph, function (node) {
                        if (node && Dom_1.Dom.isText(node)) {
                            if (node.nodeValue !== null &&
                                constants_1.INVISIBLE_SPACE_REG_EXP.test(node.nodeValue) &&
                                node.nodeValue.replace(constants_1.INVISIBLE_SPACE_REG_EXP, '').length !== 0) {
                                node.nodeValue = node.nodeValue.replace(constants_1.INVISIBLE_SPACE_REG_EXP, '');
                                if (node === currentNode &&
                                    editor.selection.isCollapsed()) {
                                    editor.selection.setCursorAfter(node);
                                }
                            }
                        }
                    });
                }
            }
        };
        _this.beforeCommand = function (command) {
            if (command.toLowerCase() === 'removeformat') {
                _this.onRemoveFormat();
                return false;
            }
        };
        _this.afterCommand = function (command) {
            if (command.toLowerCase() === 'inserthorizontalrule') {
                _this.onInsertHorizontalLine();
                return;
            }
        };
        _this.cleanNode = function (elm, onlyRemoveFont) {
            if (onlyRemoveFont === void 0) { onlyRemoveFont = false; }
            switch (elm.nodeType) {
                case Node.ELEMENT_NODE:
                    Dom_1.Dom.each(elm, function (child) {
                        _this.cleanNode(child, onlyRemoveFont);
                    });
                    if (elm.nodeName === 'FONT') {
                        Dom_1.Dom.unwrap(elm);
                    }
                    else if (!onlyRemoveFont) {
                        Array.from(elm.attributes).forEach(function (attr) {
                            if (['src', 'href', 'rel', 'content'].indexOf(attr.name.toLowerCase()) === -1) {
                                elm.removeAttribute(attr.name);
                            }
                        });
                        helpers_1.normalizeNode(elm);
                    }
                    break;
                case Node.TEXT_NODE:
                    if (!onlyRemoveFont &&
                        _this.jodit.options.cleanHTML.replaceNBSP &&
                        Dom_1.Dom.isText(elm) &&
                        elm.nodeValue !== null &&
                        elm.nodeValue.match(constants_1.SPACE_REG_EXP)) {
                        elm.nodeValue = elm.nodeValue
                            .replace(constants_1.INVISIBLE_SPACE_REG_EXP, '')
                            .replace(constants_1.SPACE_REG_EXP, ' ');
                    }
                    break;
                default:
                    Dom_1.Dom.safeRemove(elm);
            }
        };
        return _this;
    }
    cleanHtml.prototype.afterInit = function (jodit) {
        jodit.events
            .off('.cleanHtml')
            .on('change.cleanHtml afterSetMode.cleanHtml afterInit.cleanHtml mousedown.cleanHtml keydown.cleanHtml', jodit.async.debounce(this.onChange, jodit.options.cleanHTML.timeout))
            .on('keyup.cleanHtml', this.onKeyUpCleanUp)
            .on('beforeCommand.cleanHtml', this.beforeCommand)
            .on('afterCommand.cleanHtml', this.afterCommand);
    };
    cleanHtml.prototype.allowEdit = function () {
        return !(this.jodit.isInDestruct ||
            !this.jodit.isEditorMode() ||
            this.jodit.getReadOnly());
    };
    cleanHtml.getHash = function (tags) {
        var attributesReg = /([^\[]*)\[([^\]]+)]/;
        var seperator = /[\s]*,[\s]*/, attrReg = /^(.*)[\s]*=[\s]*(.*)$/;
        var tagsHash = {};
        if (typeof tags === 'string') {
            tags.split(seperator).map(function (elm) {
                elm = helpers_1.trim(elm);
                var attr = attributesReg.exec(elm), allowAttributes = {}, attributeMap = function (attrName) {
                    attrName = helpers_1.trim(attrName);
                    var val = attrReg.exec(attrName);
                    if (val) {
                        allowAttributes[val[1]] = val[2];
                    }
                    else {
                        allowAttributes[attrName] = true;
                    }
                };
                if (attr) {
                    var attr2 = attr[2].split(seperator);
                    if (attr[1]) {
                        attr2.forEach(attributeMap);
                        tagsHash[attr[1].toUpperCase()] = allowAttributes;
                    }
                }
                else {
                    tagsHash[elm.toUpperCase()] = true;
                }
            });
            return tagsHash;
        }
        if (tags) {
            Object.keys(tags).forEach(function (tagName) {
                tagsHash[tagName.toUpperCase()] = tags[tagName];
            });
            return tagsHash;
        }
        return false;
    };
    cleanHtml.prototype.onInsertHorizontalLine = function () {
        var _this = this;
        var hr = this.jodit.editor.querySelector('hr[id=null]');
        if (hr) {
            var node = Dom_1.Dom.next(hr, function (node) { return Dom_1.Dom.isBlock(node, _this.jodit.editorWindow); }, this.jodit.editor, false);
            if (!node) {
                node = this.jodit.create.inside.element(this.jodit.options.enter);
                if (node) {
                    Dom_1.Dom.after(hr, node);
                }
            }
            this.jodit.selection.setCursorIn(node);
        }
    };
    cleanHtml.prototype.onRemoveFormat = function () {
        var _this = this;
        var sel = this.jodit.selection;
        var current = sel.current();
        if (!current) {
            return;
        }
        var up = function (node) {
            return node && Dom_1.Dom.up(node, Dom_1.Dom.isInlineBlock, _this.jodit.editor);
        };
        var parentNode = up(current), anotherParent = parentNode;
        while (anotherParent) {
            anotherParent = up(anotherParent.parentNode);
            if (anotherParent) {
                parentNode = anotherParent;
            }
        }
        var collapsed = sel.isCollapsed();
        var range = sel.range;
        var fragment = null;
        if (!collapsed) {
            fragment = range.extractContents();
        }
        if (parentNode) {
            var tmp = this.jodit.create.inside.text(constants_1.INVISIBLE_SPACE);
            range.insertNode(tmp);
            var insideParent = Dom_1.Dom.isOrContains(parentNode, tmp, true);
            Dom_1.Dom.safeRemove(tmp);
            range.collapse(true);
            if (insideParent &&
                parentNode.parentNode &&
                parentNode.parentNode !== fragment) {
                var second = this.jodit.selection.splitSelection(parentNode);
                this.jodit.selection.setCursorAfter(second || parentNode);
                if (Dom_1.Dom.isEmpty(parentNode)) {
                    Dom_1.Dom.safeRemove(parentNode);
                }
            }
        }
        if (fragment) {
            sel.insertNode(this.cleanFragment(fragment));
        }
    };
    cleanHtml.prototype.cleanFragment = function (fragment) {
        var _this = this;
        Dom_1.Dom.each(fragment, function (node) {
            if (Dom_1.Dom.isElement(node) && constants_1.IS_INLINE.test(node.nodeName)) {
                _this.cleanFragment(node);
                Dom_1.Dom.unwrap(node);
            }
        });
        return fragment;
    };
    cleanHtml.prototype.isRemovableNode = function (node, current) {
        var _this = this;
        var allow = this.allowTagsHash;
        if (!Dom_1.Dom.isText(node) &&
            ((allow && !allow[node.nodeName]) ||
                (this.denyTagsHash && this.denyTagsHash[node.nodeName]))) {
            return true;
        }
        if (current &&
            node.nodeName === 'BR' &&
            cleanHtml.hasNotEmptyTextSibling(node) &&
            !cleanHtml.hasNotEmptyTextSibling(node, true) &&
            Dom_1.Dom.up(node, function (node) { return Dom_1.Dom.isBlock(node, _this.jodit.editorWindow); }, this.jodit.editor) !==
                Dom_1.Dom.up(current, function (node) { return Dom_1.Dom.isBlock(node, _this.jodit.editorWindow); }, this.jodit.editor)) {
            return true;
        }
        return (this.jodit.options.cleanHTML.removeEmptyElements &&
            current !== false &&
            Dom_1.Dom.isElement(node) &&
            node.nodeName.match(constants_1.IS_INLINE) !== null &&
            !this.jodit.selection.isMarker(node) &&
            helpers_1.trim(node.innerHTML).length === 0 &&
            !Dom_1.Dom.isOrContains(node, current));
    };
    cleanHtml.hasNotEmptyTextSibling = function (node, next) {
        if (next === void 0) { next = false; }
        var prev = next ? node.nextSibling : node.previousSibling;
        while (prev) {
            if (Dom_1.Dom.isElement(prev) || !Dom_1.Dom.isEmptyTextNode(prev)) {
                return true;
            }
            prev = next ? prev.nextSibling : prev.previousSibling;
        }
        return false;
    };
    cleanHtml.prototype.beforeDestruct = function (jodit) {
        this.jodit.events.off('.cleanHtml');
    };
    return cleanHtml;
}(Plugin_1.Plugin));
exports.cleanHtml = cleanHtml;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.nl2br = function (html) {
    return html.replace(/([^>])([\n\r]+)/g, '$1<br/>$2');
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(2);
var dialog_1 = __webpack_require__(16);
var Plugin_1 = __webpack_require__(6);
var Dom_1 = __webpack_require__(1);
var pasteStorage = (function (_super) {
    tslib_1.__extends(pasteStorage, _super);
    function pasteStorage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentIndex = 0;
        _this.list = [];
        _this.container = null;
        _this.listBox = null;
        _this.previewBox = null;
        _this.dialog = null;
        _this.paste = function () {
            _this.jodit.selection.focus();
            _this.jodit.selection.insertHTML(_this.list[_this.currentIndex]);
            if (_this.currentIndex !== 0) {
                var buffer = _this.list[0];
                _this.list[0] = _this.list[_this.currentIndex];
                _this.list[_this.currentIndex] = buffer;
            }
            _this.dialog && _this.dialog.close();
            _this.jodit.setEditorValue();
        };
        _this.onKeyDown = function (e) {
            var index = _this.currentIndex;
            if ([constants_1.KEY_UP, constants_1.KEY_DOWN, constants_1.KEY_ENTER].indexOf(e.which) === -1) {
                return;
            }
            if (e.which === constants_1.KEY_UP) {
                if (index === 0) {
                    index = _this.list.length - 1;
                }
                else {
                    index -= 1;
                }
            }
            if (e.which === constants_1.KEY_DOWN) {
                if (index === _this.list.length - 1) {
                    index = 0;
                }
                else {
                    index += 1;
                }
            }
            if (e.which === constants_1.KEY_ENTER) {
                _this.paste();
                return;
            }
            if (index !== _this.currentIndex) {
                _this.selectIndex(index);
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        };
        _this.selectIndex = function (index) {
            if (_this.listBox) {
                Array.from(_this.listBox.childNodes).forEach(function (a, i) {
                    a.classList.remove('jodit_active');
                    if (index === i && _this.previewBox) {
                        a.classList.add('jodit_active');
                        _this.previewBox.innerHTML = _this.list[index];
                        a.focus();
                    }
                });
            }
            _this.currentIndex = index;
        };
        _this.showDialog = function () {
            if (_this.list.length < 2) {
                return;
            }
            _this.dialog || _this.createDialog();
            if (_this.listBox) {
                _this.listBox.innerHTML = '';
            }
            if (_this.previewBox) {
                _this.previewBox.innerHTML = '';
            }
            _this.list.forEach(function (html, index) {
                var a = _this.jodit.create.element('a');
                a.textContent = index + 1 + '. ' + html.replace(constants_1.SPACE_REG_EXP, '');
                a.addEventListener('keydown', _this.onKeyDown);
                a.setAttribute('href', 'javascript:void(0)');
                a.setAttribute('data-index', index.toString());
                a.setAttribute('tab-index', '-1');
                _this.listBox && _this.listBox.appendChild(a);
            });
            _this.dialog && _this.dialog.open();
            _this.jodit.async.setTimeout(function () {
                _this.selectIndex(0);
            }, 100);
        };
        return _this;
    }
    pasteStorage.prototype.createDialog = function () {
        var _this = this;
        this.dialog = new dialog_1.Dialog(this.jodit);
        var pasteButton = this.jodit.create.fromHTML('<a href="javascript:void(0)" style="float:right;" class="jodit_button">' +
            '<span>' +
            this.jodit.i18n('Paste') +
            '</span>' +
            '</a>');
        pasteButton.addEventListener('click', this.paste);
        var cancelButton = this.jodit.create.fromHTML('<a href="javascript:void(0)" style="float:right; margin-right: 10px;" class="jodit_button">' +
            '<span>' +
            this.jodit.i18n('Cancel') +
            '</span>' +
            '</a>');
        cancelButton.addEventListener('click', this.dialog.close);
        this.container = this.jodit.create.div();
        this.container.classList.add('jodit_paste_storage');
        this.listBox = this.jodit.create.div();
        this.previewBox = this.jodit.create.div();
        this.container.appendChild(this.listBox);
        this.container.appendChild(this.previewBox);
        this.dialog.setTitle(this.jodit.i18n('Choose Content to Paste'));
        this.dialog.setContent(this.container);
        this.dialog.setFooter([pasteButton, cancelButton]);
        this.jodit.events.on(this.listBox, 'click dblclick', function (e) {
            var a = e.target;
            if (a && a.nodeName === 'A' && a.hasAttribute('data-index')) {
                _this.selectIndex(parseInt(a.getAttribute('data-index') || '0', 10));
            }
            if (e.type === 'dblclick') {
                _this.paste();
            }
            return false;
        }, 'a');
    };
    pasteStorage.prototype.afterInit = function () {
        var _this = this;
        this.jodit.events
            .off('afterCopy.paste-storage')
            .on('afterCopy.paste-storage', function (html) {
            if (_this.list.indexOf(html) !== -1) {
                _this.list.splice(_this.list.indexOf(html), 1);
            }
            _this.list.unshift(html);
            if (_this.list.length > 5) {
                _this.list.length = 5;
            }
        });
        this.jodit.registerCommand('showPasteStorage', {
            exec: this.showDialog,
            hotkeys: ['ctrl+shift+v', 'cmd+shift+v']
        });
    };
    pasteStorage.prototype.beforeDestruct = function () {
        this.dialog && this.dialog.destruct();
        Dom_1.Dom.safeRemove(this.previewBox);
        Dom_1.Dom.safeRemove(this.listBox);
        Dom_1.Dom.safeRemove(this.container);
        this.container = null;
        this.listBox = null;
        this.previewBox = null;
        this.dialog = null;
        this.list = [];
    };
    return pasteStorage;
}(Plugin_1.Plugin));
exports.pasteStorage = pasteStorage;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var pluginKey = 'copyformat';
var copyStyles = [
    'fontWeight',
    'fontStyle',
    'fontSize',
    'color',
    'margin',
    'padding',
    'borderWidth',
    'borderStyle',
    'borderColor',
    'borderRadius',
    'backgroundColor',
    'textDecorationLine',
    'fontFamily'
];
var getStyle = function (editor, key, box, defaultStyles) {
    var result = helpers_1.css(box, key);
    if (result === defaultStyles[key]) {
        if (box.parentNode &&
            box !== editor.editor &&
            box.parentNode !== editor.editor) {
            result = getStyle(editor, key, box.parentNode, defaultStyles);
        }
        else {
            result = undefined;
        }
    }
    return result;
};
var getStyles = function (editor, box, defaultStyles) {
    var result = {};
    if (box) {
        copyStyles.forEach(function (key) {
            result[key] = getStyle(editor, key, box, defaultStyles);
            if (key.match(/border(Style|Color)/) && !result.borderWidth) {
                result[key] = undefined;
            }
        });
    }
    return result;
};
Config_1.Config.prototype.controls.copyformat = {
    exec: function (editor, current) {
        if (current) {
            if (editor.buffer.exists(pluginKey)) {
                editor.buffer.set(pluginKey, false);
                editor.events.off(editor.editor, 'mouseup.' + pluginKey);
            }
            else {
                var defaultStyles_1 = {}, box = Dom_1.Dom.up(current, function (elm) {
                    return elm && !Dom_1.Dom.isText(elm);
                }, editor.editor) || editor.editor;
                var ideal_1 = editor.create.inside.span();
                editor.editor.appendChild(ideal_1);
                copyStyles.forEach(function (key) {
                    defaultStyles_1[key] = helpers_1.css(ideal_1, key);
                });
                if (ideal_1 !== editor.editor) {
                    Dom_1.Dom.safeRemove(ideal_1);
                }
                var format_1 = getStyles(editor, box, defaultStyles_1);
                var onMouseDown = function () {
                    editor.buffer.set(pluginKey, false);
                    var currentNode = editor.selection.current();
                    if (currentNode) {
                        if (currentNode.nodeName === 'IMG') {
                            helpers_1.css(currentNode, format_1);
                        }
                        else {
                            editor.selection.applyCSS(format_1);
                        }
                    }
                    editor.events.off(editor.editor, 'mouseup.' + pluginKey);
                };
                editor.events.on(editor.editor, 'mouseup.' + pluginKey, onMouseDown);
                editor.buffer.set(pluginKey, true);
            }
        }
    },
    isActive: function (editor) { return !!editor.buffer.get(pluginKey); },
    tooltip: 'Paint format'
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var Widget_1 = __webpack_require__(17);
var TabsWidget = Widget_1.Widget.TabsWidget;
var ColorPickerWidget = Widget_1.Widget.ColorPickerWidget;
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
Config_1.Config.prototype.controls.brush = {
    isActive: function (editor, control, button) {
        if (!button) {
            return true;
        }
        var current = editor.selection.current(), icon = button.container.querySelector('svg');
        if (icon && icon.style.fill) {
            icon.style.removeProperty('fill');
        }
        if (current && !button.isDisable()) {
            var currentBpx = Dom_1.Dom.closest(current, function (elm) {
                return (Dom_1.Dom.isBlock(elm, editor.editorWindow) ||
                    (elm && Dom_1.Dom.isElement(elm)));
            }, editor.editor) || editor.editor;
            var colorHEX = helpers_1.css(currentBpx, 'color').toString(), bgHEX = helpers_1.css(currentBpx, 'background-color').toString();
            if (colorHEX !== helpers_1.css(editor.editor, 'color').toString()) {
                icon && (icon.style.fill = colorHEX);
                return true;
            }
            if (bgHEX !== helpers_1.css(editor.editor, 'background-color').toString()) {
                icon && (icon.style.fill = bgHEX);
                return true;
            }
        }
        return false;
    },
    popup: function (editor, current, self, close) {
        var colorHEX = '', bg_color = '', tabs, currentElement = null;
        if (current &&
            current !== editor.editor &&
            Dom_1.Dom.isNode(current, editor.editorWindow) &&
            Dom_1.Dom.isElement(current)) {
            colorHEX = helpers_1.css(current, 'color').toString();
            bg_color = helpers_1.css(current, 'background-color').toString();
            currentElement = current;
        }
        var backgroundTag = ColorPickerWidget(editor, function (value) {
            if (!currentElement) {
                editor.execCommand('background', false, value);
            }
            else {
                currentElement.style.backgroundColor = value;
            }
            close();
        }, bg_color);
        var colorTab = ColorPickerWidget(editor, function (value) {
            if (!currentElement) {
                editor.execCommand('forecolor', false, value);
            }
            else {
                currentElement.style.color = value;
            }
            close();
        }, colorHEX);
        if (editor.options.colorPickerDefaultTab === 'background') {
            tabs = {
                Background: backgroundTag,
                Text: colorTab
            };
        }
        else {
            tabs = {
                Text: colorTab,
                Background: backgroundTag
            };
        }
        return TabsWidget(editor, tabs, currentElement);
    },
    tooltip: 'Fill color or set the text color'
};
function color(editor) {
    var callback = function (command, second, third) {
        var colorHEX = helpers_1.normalizeColor(third);
        switch (command) {
            case 'background':
                editor.selection.applyCSS({
                    backgroundColor: !colorHEX ? '' : colorHEX
                });
                break;
            case 'forecolor':
                editor.selection.applyCSS({
                    color: !colorHEX ? '' : colorHEX
                });
                break;
        }
        editor.setEditorValue();
        return false;
    };
    editor
        .registerCommand('forecolor', callback)
        .registerCommand('background', callback);
}
exports.color = color;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var Plugin_1 = __webpack_require__(6);
var clipboard_1 = __webpack_require__(67);
var DragAndDrop = (function (_super) {
    tslib_1.__extends(DragAndDrop, _super);
    function DragAndDrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isFragmentFromEditor = false;
        _this.isCopyMode = false;
        _this.startDragPoint = { x: 0, y: 0 };
        _this.draggable = null;
        _this.bufferRange = null;
        _this.onDragEnd = function () {
            if (_this.draggable) {
                Dom_1.Dom.safeRemove(_this.draggable);
                _this.draggable = null;
            }
            _this.isCopyMode = false;
        };
        _this.onDrag = function (event) {
            if (_this.draggable) {
                if (!_this.draggable.parentNode) {
                    _this.jodit.ownerDocument.body.appendChild(_this.draggable);
                }
                _this.jodit.events.fire('hidePopup');
                helpers_1.css(_this.draggable, {
                    left: event.clientX + 20,
                    top: event.clientY + 20
                });
                _this.jodit.selection.insertCursorAtPoint(event.clientX, event.clientY);
                event.preventDefault();
                event.stopPropagation();
            }
        };
        _this.onDrop = function (event) {
            if (!event.dataTransfer ||
                !event.dataTransfer.files ||
                !event.dataTransfer.files.length) {
                if (!_this.isFragmentFromEditor && !_this.draggable) {
                    _this.jodit.events.fire('paste', event);
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                var sel = _this.jodit.selection.sel;
                var range = _this.bufferRange ||
                    (sel && sel.rangeCount ? sel.getRangeAt(0) : null);
                var fragment = null;
                if (!_this.draggable && range) {
                    fragment = _this.isCopyMode
                        ? range.cloneContents()
                        : range.extractContents();
                }
                else if (_this.draggable) {
                    if (_this.isCopyMode) {
                        var _a = _this.draggable.getAttribute('data-is-file') === '1'
                            ? ['a', 'href']
                            : ['img', 'src'], tagName = _a[0], attr = _a[1];
                        fragment = _this.jodit.create.inside.element(tagName);
                        fragment.setAttribute(attr, _this.draggable.getAttribute('data-src') ||
                            _this.draggable.getAttribute('src') ||
                            '');
                        if (tagName === 'a') {
                            fragment.textContent =
                                fragment.getAttribute(attr) || '';
                        }
                    }
                    else {
                        fragment = helpers_1.dataBind(_this.draggable, 'target');
                    }
                }
                else if (_this.getText(event)) {
                    fragment = _this.jodit.create.inside.fromHTML(_this.getText(event));
                }
                sel && sel.removeAllRanges();
                _this.jodit.selection.insertCursorAtPoint(event.clientX, event.clientY);
                if (fragment) {
                    _this.jodit.selection.insertNode(fragment, false, false);
                    if (range && fragment.firstChild && fragment.lastChild) {
                        range.setStartBefore(fragment.firstChild);
                        range.setEndAfter(fragment.lastChild);
                        _this.jodit.selection.selectRange(range);
                        _this.jodit.events.fire('synchro');
                    }
                    if (fragment.nodeName === 'IMG' && _this.jodit.events) {
                        _this.jodit.events.fire('afterInsertImage', fragment);
                    }
                }
                event.preventDefault();
                event.stopPropagation();
            }
            _this.isFragmentFromEditor = false;
        };
        _this.onDragStart = function (event) {
            var target = event.target;
            _this.onDragEnd();
            _this.isFragmentFromEditor = Dom_1.Dom.isOrContains(_this.jodit.editor, target, true);
            _this.isCopyMode = _this.isFragmentFromEditor ? helpers_1.ctrlKey(event) : true;
            if (_this.isFragmentFromEditor) {
                var sel = _this.jodit.selection.sel;
                var range = sel && sel.rangeCount ? sel.getRangeAt(0) : null;
                if (range) {
                    _this.bufferRange = range.cloneRange();
                }
            }
            else {
                _this.bufferRange = null;
            }
            _this.startDragPoint.x = event.clientX;
            _this.startDragPoint.y = event.clientY;
            if (Dom_1.Dom.isElement(target) &&
                target.matches('.jodit_filebrowser_files_item')) {
                target = target.querySelector('img');
            }
            if (target.nodeName === 'IMG') {
                _this.draggable = target.cloneNode(true);
                helpers_1.dataBind(_this.draggable, 'target', target);
                helpers_1.css(_this.draggable, {
                    'z-index': 100000000000000,
                    'pointer-events': 'none',
                    position: 'fixed',
                    display: 'inlin-block',
                    left: _this.startDragPoint.x,
                    top: _this.startDragPoint.y,
                    width: target.offsetWidth,
                    height: target.offsetHeight
                });
            }
        };
        _this.getText = function (event) {
            var dt = clipboard_1.getDataTransfer(event);
            return dt ? dt.getData(constants_1.TEXT_HTML) || dt.getData(constants_1.TEXT_PLAIN) : null;
        };
        return _this;
    }
    DragAndDrop.prototype.afterInit = function () {
        this.jodit.events
            .off(window, '.DragAndDrop')
            .off('.DragAndDrop')
            .off([window, this.jodit.editorDocument, this.jodit.editor], 'dragstart.DragAndDrop', this.onDragStart)
            .on(window, 'dragover.DragAndDrop', this.onDrag)
            .on([window, this.jodit.editorDocument, this.jodit.editor], 'dragstart.DragAndDrop', this.onDragStart)
            .on('drop.DragAndDrop', this.onDrop)
            .on(window, 'dragend.DragAndDrop drop.DragAndDrop mouseup.DragAndDrop', this.onDragEnd);
    };
    DragAndDrop.prototype.beforeDestruct = function () {
        this.onDragEnd();
    };
    return DragAndDrop;
}(Plugin_1.Plugin));
exports.DragAndDrop = DragAndDrop;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var helpers_1 = __webpack_require__(3);
var Plugin_1 = __webpack_require__(6);
var Dom_1 = __webpack_require__(1);
Config_1.Config.prototype.draggableTags = ['img', 'a', 'jodit-media', 'jodit'];
var DragAndDropElement = (function (_super) {
    tslib_1.__extends(DragAndDropElement, _super);
    function DragAndDropElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dragList = [];
        _this.isCopyMode = false;
        _this.draggable = null;
        _this.wasMoved = false;
        _this.timeout = 0;
        _this.onDrag = _this.jodit.async.throttle(function (event) {
            if (!_this.draggable) {
                return;
            }
            _this.wasMoved = true;
            _this.jodit.events.fire('hidePopup hideResizer');
            if (!_this.draggable.parentNode) {
                _this.jodit.ownerDocument.body.appendChild(_this.draggable);
            }
            helpers_1.css(_this.draggable, {
                left: event.clientX + 20,
                top: event.clientY + 20
            });
            _this.jodit.selection.insertCursorAtPoint(event.clientX, event.clientY);
        }, _this.jodit.defaultTimeout);
        _this.onDragStart = function (event) {
            var target = event.target, last = null;
            if (!_this.dragList.length) {
                return;
            }
            do {
                if (_this.dragList.indexOf(target.nodeName.toLowerCase()) !== -1) {
                    if (!last ||
                        (target.firstChild === last && target.lastChild === last)) {
                        last = target;
                    }
                }
                target = target.parentNode;
            } while (target && target !== _this.jodit.editor);
            if (!last) {
                return;
            }
            _this.isCopyMode = helpers_1.ctrlKey(event);
            _this.onDragEnd();
            _this.timeout = _this.jodit.async.setTimeout(function (lastNode) {
                if (!lastNode) {
                    return;
                }
                _this.draggable = lastNode.cloneNode(true);
                helpers_1.dataBind(_this.draggable, 'target', lastNode);
                helpers_1.css(_this.draggable, {
                    'z-index': 100000000000000,
                    'pointer-events': 'none',
                    position: 'fixed',
                    display: 'inlin-block',
                    left: event.clientX,
                    top: event.clientY,
                    width: lastNode.offsetWidth,
                    height: lastNode.offsetHeight
                });
            }, _this.jodit.defaultTimeout, last);
            event.preventDefault();
        };
        _this.onDragEnd = function () {
            if (_this.isInDestruct) {
                return;
            }
            _this.jodit.async.clearTimeout(_this.timeout);
            if (_this.draggable) {
                Dom_1.Dom.safeRemove(_this.draggable);
                _this.draggable = null;
                _this.wasMoved = false;
            }
        };
        _this.onDrop = function () {
            if (!_this.draggable || !_this.wasMoved) {
                _this.onDragEnd();
                return;
            }
            var fragment = helpers_1.dataBind(_this.draggable, 'target');
            _this.onDragEnd();
            if (_this.isCopyMode) {
                fragment = fragment.cloneNode(true);
            }
            _this.jodit.selection.insertNode(fragment, true, false);
            if (fragment.nodeName === 'IMG' && _this.jodit.events) {
                _this.jodit.events.fire('afterInsertImage', fragment);
            }
            _this.jodit.events.fire('synchro');
        };
        return _this;
    }
    DragAndDropElement.prototype.afterInit = function () {
        this.dragList = this.jodit.options.draggableTags
            ? helpers_1.splitArray(this.jodit.options.draggableTags)
                .filter(function (item) { return item; })
                .map(function (item) { return item.toLowerCase(); })
            : [];
        if (!this.dragList.length) {
            return;
        }
        this.jodit.events
            .on(this.jodit.editor, 'mousemove touchmove', this.onDrag)
            .on(this.jodit.editor, 'mousedown touchstart dragstart', this.onDragStart)
            .on('mouseup touchend', this.onDrop)
            .on(window, 'mouseup touchend', this.onDragEnd);
    };
    DragAndDropElement.prototype.beforeDestruct = function () {
        this.onDragEnd();
        this.jodit.events
            .off(this.jodit.editor, 'mousemove touchmove', this.onDrag)
            .off(this.jodit.editor, 'mousedown touchstart dragstart', this.onDragStart)
            .off('mouseup touchend', this.onDrop)
            .off(window, 'mouseup touchend', this.onDragEnd);
    };
    return DragAndDropElement;
}(Plugin_1.Plugin));
exports.DragAndDropElement = DragAndDropElement;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var consts = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var Plugin_1 = __webpack_require__(6);
var constants_1 = __webpack_require__(2);
exports.insertParagraph = function (editor, fake, wrapperTag, style) {
    var _a;
    var p = editor.create.inside.element(wrapperTag), helper_node = editor.create.inside.element('br');
    p.appendChild(helper_node);
    if (style && style.cssText) {
        p.setAttribute('style', style.cssText);
    }
    editor.selection.insertNode(p, false, false);
    editor.selection.setCursorBefore(helper_node);
    var range = editor.selection.createRange();
    range.setStartBefore(wrapperTag.toLowerCase() !== 'br' ? helper_node : p);
    range.collapse(true);
    editor.selection.selectRange(range);
    Dom_1.Dom.safeRemove(fake);
    helpers_1.scrollIntoView(p, editor.editor, editor.editorDocument);
    (_a = editor.events) === null || _a === void 0 ? void 0 : _a.fire('synchro');
    return p;
};
var enter = (function (_super) {
    tslib_1.__extends(enter, _super);
    function enter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.brMode = false;
        _this.defaultTag = consts.PARAGRAPH;
        _this.checkWrapper = function () {
            if (!_this.jodit.isEditorMode() || true) {
                return;
            }
            var current = _this.jodit.selection.current(false);
            var currentBox = _this.getBlockWrapper(current);
            if (!currentBox) {
                _this.wrapText(current);
            }
        };
        return _this;
    }
    enter.prototype.afterInit = function (editor) {
        var _this = this;
        this.defaultTag = editor.options.enter.toLowerCase();
        this.brMode = this.defaultTag === consts.BR.toLowerCase();
        if (!editor.options.enterBlock) {
            editor.options.enterBlock = this.brMode
                ? consts.PARAGRAPH
                : this.defaultTag;
        }
        editor.events
            .off('.enter')
            .on('change.enter', this.checkWrapper)
            .on('keydown.enter', function (event) {
            if (event.which === consts.KEY_ENTER) {
                var beforeEnter = editor.events.fire('beforeEnter', event);
                if (beforeEnter !== undefined) {
                    return beforeEnter;
                }
                if (!editor.selection.isCollapsed()) {
                    editor.execCommand('Delete');
                }
                editor.selection.focus();
                _this.onEnter(event);
                return false;
            }
        });
    };
    enter.prototype.onEnter = function (event) {
        var editor = this.jodit, sel = editor.selection, defaultTag = this.defaultTag;
        var current = sel.current(false);
        if (!current || current === editor.editor) {
            current = editor.create.inside.text(constants_1.INVISIBLE_SPACE);
            sel.insertNode(current);
            sel.select(current);
        }
        var currentBox = this.getBlockWrapper(current);
        var isLi = currentBox && currentBox.nodeName === 'LI';
        if (!isLi && this.checkBR(current, event.shiftKey) === false) {
            return false;
        }
        if (!currentBox && !this.hasPreviousBlock(current)) {
            currentBox = this.wrapText(current);
        }
        if (!currentBox || currentBox === current) {
            exports.insertParagraph(editor, false, isLi ? 'li' : defaultTag);
            return false;
        }
        if (this.checkUnsplittableBox(currentBox) === false) {
            return false;
        }
        if (isLi && Dom_1.Dom.isEmpty(currentBox)) {
            this.enterInsideEmptyLIelement(currentBox);
            return false;
        }
        var canSplit = currentBox.tagName.toLowerCase() === this.defaultTag || isLi;
        var cursorOnTheRight = sel.cursorOnTheRight(currentBox);
        var cursorOnTheLeft = sel.cursorOnTheLeft(currentBox);
        if ((!canSplit || Dom_1.Dom.isEmpty(currentBox)) &&
            (cursorOnTheRight || cursorOnTheLeft)) {
            var fake = false;
            if (cursorOnTheRight) {
                fake = sel.setCursorAfter(currentBox);
            }
            else {
                fake = sel.setCursorBefore(currentBox);
            }
            exports.insertParagraph(editor, fake, this.defaultTag);
            if (cursorOnTheLeft && !cursorOnTheRight) {
                sel.setCursorIn(currentBox, true);
            }
            return;
        }
        sel.splitSelection(currentBox);
    };
    enter.prototype.getBlockWrapper = function (current, tagReg) {
        if (tagReg === void 0) { tagReg = consts.IS_BLOCK; }
        var node = current;
        var root = this.jodit.editor;
        do {
            if (!node || node === root) {
                break;
            }
            if (tagReg.test(node.nodeName)) {
                if (node.nodeName === 'LI') {
                    return node;
                }
                return (this.getBlockWrapper(node.parentNode, /^li$/i) ||
                    node);
            }
            node = node.parentNode;
        } while (node && node !== root);
        return false;
    };
    enter.prototype.checkBR = function (current, shiftKeyPressed) {
        if (this.brMode ||
            shiftKeyPressed ||
            Dom_1.Dom.closest(current, 'PRE|BLOCKQUOTE', this.jodit.editor)) {
            var br = this.jodit.create.inside.element('br');
            this.jodit.selection.insertNode(br, true);
            helpers_1.scrollIntoView(br, this.jodit.editor, this.jodit.editorDocument);
            return false;
        }
    };
    enter.prototype.wrapText = function (current) {
        var _this = this;
        var needWrap = current;
        Dom_1.Dom.up(needWrap, function (node) {
            if (node &&
                node.hasChildNodes() &&
                node !== _this.jodit.editor) {
                needWrap = node;
            }
        }, this.jodit.editor);
        var currentBox = Dom_1.Dom.wrapInline(needWrap, this.jodit.options.enter, this.jodit);
        if (Dom_1.Dom.isEmpty(currentBox)) {
            var helper_node = this.jodit.create.inside.element('br');
            currentBox.appendChild(helper_node);
            this.jodit.selection.setCursorBefore(helper_node);
        }
        return currentBox;
    };
    enter.prototype.hasPreviousBlock = function (current) {
        var editor = this.jodit;
        return Boolean(Dom_1.Dom.prev(current, function (elm) {
            return Dom_1.Dom.isBlock(elm, editor.editorWindow) ||
                Dom_1.Dom.isImage(elm, editor.editorWindow);
        }, editor.editor));
    };
    enter.prototype.checkUnsplittableBox = function (currentBox) {
        var editor = this.jodit, sel = editor.selection;
        if (!Dom_1.Dom.canSplitBlock(currentBox, editor.editorWindow)) {
            var br = editor.create.inside.element('br');
            sel.insertNode(br, false);
            sel.setCursorAfter(br);
            return false;
        }
    };
    enter.prototype.enterInsideEmptyLIelement = function (currentBox) {
        var fakeTextNode = false;
        var ul = Dom_1.Dom.closest(currentBox, 'ol|ul', this.jodit.editor);
        if (!Dom_1.Dom.prev(currentBox, function (elm) { return elm && elm.nodeName === 'LI'; }, ul)) {
            fakeTextNode = this.jodit.selection.setCursorBefore(ul);
        }
        else if (!Dom_1.Dom.next(currentBox, function (elm) { return elm && elm.nodeName === 'LI'; }, ul)) {
            fakeTextNode = this.jodit.selection.setCursorAfter(ul);
        }
        else {
            var leftRange = this.jodit.selection.createRange();
            leftRange.setStartBefore(ul);
            leftRange.setEndAfter(currentBox);
            var fragment = leftRange.extractContents();
            if (ul.parentNode) {
                ul.parentNode.insertBefore(fragment, ul);
            }
            fakeTextNode = this.jodit.selection.setCursorBefore(ul);
        }
        Dom_1.Dom.safeRemove(currentBox);
        exports.insertParagraph(this.jodit, fakeTextNode, this.defaultTag);
        if (!helpers_1.$$('li', ul).length) {
            Dom_1.Dom.safeRemove(ul);
        }
    };
    enter.prototype.beforeDestruct = function (editor) {
        editor.events.off('keydown.enter');
    };
    return enter;
}(Plugin_1.Plugin));
exports.enter = enter;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
Config_1.Config.prototype.showMessageErrors = true;
Config_1.Config.prototype.showMessageErrorTime = 3000;
Config_1.Config.prototype.showMessageErrorOffsetPx = 3;
function errorMessages(editor) {
    if (editor.options.showMessageErrors) {
        var height_1;
        var messagesBox_1 = editor.create.div('jodit_error_box_for_messages'), recalcOffsets_1 = function () {
            height_1 = 5;
            Array.from((messagesBox_1.childNodes)).forEach(function (elm) {
                helpers_1.css(messagesBox_1, 'bottom', height_1 + 'px');
                height_1 +=
                    elm.offsetWidth +
                        editor.options.showMessageErrorOffsetPx;
            });
        };
        editor.events
            .on('beforeDestruct', function () {
            Dom_1.Dom.safeRemove(messagesBox_1);
        })
            .on('errorMessage', function (message, className, timeout) {
            editor.workplace.appendChild(messagesBox_1);
            var newmessage = editor.create.div('active ' + (className || ''), message);
            messagesBox_1.appendChild(newmessage);
            recalcOffsets_1();
            editor.async.setTimeout(function () {
                newmessage.classList.remove('active');
                editor.async.setTimeout(function () {
                    Dom_1.Dom.safeRemove(newmessage);
                    recalcOffsets_1();
                }, 300);
            }, timeout || editor.options.showMessageErrorTime);
        });
    }
}
exports.errorMessages = errorMessages;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
Config_1.Config.prototype.controls.fontsize = {
    command: 'fontSize',
    list: [
        '8',
        '9',
        '10',
        '11',
        '12',
        '14',
        '16',
        '18',
        '24',
        '30',
        '36',
        '48',
        '60',
        '72',
        '96'
    ],
    template: function (editor, key, value) { return value; },
    tooltip: 'Font size',
    isActiveChild: function (editor, control) {
        var current = editor.selection.current();
        if (current) {
            var currentBpx = Dom_1.Dom.closest(current, function (elm) {
                return (Dom_1.Dom.isBlock(elm, editor.editorWindow) ||
                    (elm && Dom_1.Dom.isElement(elm)));
            }, editor.editor) || editor.editor;
            var fontSize = helpers_1.css(currentBpx, 'font-size');
            return Boolean(fontSize &&
                control.args &&
                control.args[1].toString() === fontSize.toString());
        }
        return false;
    },
    isActive: function (editor) {
        var current = editor.selection.current();
        if (current) {
            var currentBpx = Dom_1.Dom.closest(current, function (elm) {
                return (Dom_1.Dom.isBlock(elm, editor.editorWindow) ||
                    (elm && Dom_1.Dom.isElement(elm)));
            }, editor.editor) || editor.editor;
            return (helpers_1.css(currentBpx, 'font-size').toString() !==
                helpers_1.css(editor.editor, 'font-size').toString());
        }
        return false;
    }
};
Config_1.Config.prototype.controls.font = {
    command: 'fontname',
    exec: function (editor, event, control) {
        editor.execCommand(control.command, false, control.args ? control.args[0] : undefined);
    },
    list: {
        'Helvetica,sans-serif': 'Helvetica',
        'Arial,Helvetica,sans-serif': 'Arial',
        'Georgia,serif': 'Georgia',
        'Impact,Charcoal,sans-serif': 'Impact',
        'Tahoma,Geneva,sans-serif': 'Tahoma',
        "'Times New Roman',Times,serif": 'Times New Roman',
        'Verdana,Geneva,sans-serif': 'Verdana'
    },
    template: function (editor, key, value) {
        return "<span style=\"font-family: " + key + "\">" + value + "</span>";
    },
    isActiveChild: function (editor, control) {
        var current = editor.selection.current(), normFonts = function (fontValue) {
            return fontValue
                .toLowerCase()
                .replace(/['"]+/g, '')
                .replace(/[^a-z0-9]+/g, ',');
        };
        if (current) {
            var currentBpx = Dom_1.Dom.closest(current, function (elm) {
                return (Dom_1.Dom.isBlock(elm, editor.editorWindow) ||
                    (elm && Dom_1.Dom.isElement(elm)));
            }, editor.editor) || editor.editor;
            var fontFamily = helpers_1.css(currentBpx, 'font-family').toString();
            return Boolean(fontFamily &&
                control.args &&
                normFonts(control.args[0].toString()) ===
                    normFonts(fontFamily));
        }
        return false;
    },
    isActive: function (editor) {
        var current = editor.selection.current();
        if (current) {
            var currentBpx = Dom_1.Dom.closest(current, function (elm) {
                return (Dom_1.Dom.isBlock(elm, editor.editorWindow) ||
                    Dom_1.Dom.isElement(elm));
            }, editor.editor) || editor.editor;
            return (helpers_1.css(currentBpx, 'font-family').toString() !==
                helpers_1.css(editor.editor, 'font-family').toString());
        }
        return false;
    },
    tooltip: 'Font family'
};
function font(editor) {
    var callback = function (command, second, third) {
        switch (command) {
            case 'fontsize':
                editor.selection.applyCSS({
                    fontSize: helpers_1.normalizeSize(third)
                });
                break;
            case 'fontname':
                editor.selection.applyCSS({
                    fontFamily: third
                });
                break;
        }
        editor.events.fire('synchro');
        return false;
    };
    editor
        .registerCommand('fontsize', callback)
        .registerCommand('fontname', callback);
}
exports.font = font;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var Dom_1 = __webpack_require__(1);
Config_1.Config.prototype.controls.paragraph = {
    command: 'formatBlock',
    getLabel: function (editor, btn, button) {
        var current = editor.selection.current();
        if (current && editor.options.textIcons) {
            var currentBox = Dom_1.Dom.closest(current, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor) || editor.editor, currentValue = currentBox.nodeName.toLowerCase(), list = btn.list;
            if (button &&
                btn.data &&
                btn.data.currentValue !== currentValue &&
                btn.list &&
                list[currentValue]) {
                button.textBox.innerHTML = "<span>" + editor.i18n(list[currentValue]) + "</span>";
                button.textBox.firstChild.classList.add('jodit_icon');
                btn.data.currentValue = currentValue;
            }
        }
        return false;
    },
    exec: function (editor, event, control) {
        editor.execCommand(control.command, false, control.args ? control.args[0] : undefined);
    },
    data: {
        currentValue: 'left'
    },
    list: {
        p: 'Normal',
        h1: 'Heading 1',
        h2: 'Heading 2',
        h3: 'Heading 3',
        h4: 'Heading 4',
        blockquote: 'Quote'
    },
    isActiveChild: function (editor, control) {
        var current = editor.selection.current();
        if (current) {
            var currentBox = Dom_1.Dom.closest(current, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor);
            return (currentBox &&
                currentBox !== editor.editor &&
                control.args !== undefined &&
                currentBox.nodeName.toLowerCase() === control.args[0]);
        }
        return false;
    },
    isActive: function (editor, control) {
        var current = editor.selection.current();
        if (current) {
            var currentBpx = Dom_1.Dom.closest(current, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor);
            return (currentBpx &&
                currentBpx !== editor.editor &&
                control.list !== undefined &&
                currentBpx.nodeName.toLowerCase() !== 'p' &&
                control.list[currentBpx.nodeName.toLowerCase()] !== undefined);
        }
        return false;
    },
    template: function (editor, key, value) {
        return "<" + key + " class=\"jodit_list_element\"><span>" + editor.i18n(value) + "</span></" + key + "></li>";
    },
    tooltip: 'Insert format block'
};
function formatBlock(editor) {
    editor.registerCommand('formatblock', function (command, second, third) {
        editor.selection.focus();
        var work = false;
        editor.selection.eachSelection(function (current) {
            var selectionInfo = editor.selection.save();
            var currentBox = current
                ? Dom_1.Dom.up(current, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor)
                : false;
            if ((!currentBox || currentBox.nodeName === 'LI') && current) {
                currentBox = Dom_1.Dom.wrapInline(current, editor.options.enter, editor);
            }
            if (!currentBox) {
                editor.selection.restore(selectionInfo);
                return;
            }
            if (!currentBox.tagName.match(/TD|TH|TBODY|TABLE|THEAD/i)) {
                if (third === editor.options.enterBlock.toLowerCase() &&
                    currentBox.parentNode &&
                    currentBox.parentNode.nodeName === 'LI') {
                    Dom_1.Dom.unwrap(currentBox);
                }
                else {
                    Dom_1.Dom.replace(currentBox, third, editor.create.inside, true, false);
                }
            }
            else {
                if (!editor.selection.isCollapsed()) {
                    editor.selection.applyCSS({}, third);
                }
                else {
                    Dom_1.Dom.wrapInline(current, third, editor);
                }
            }
            work = true;
            editor.selection.restore(selectionInfo);
        });
        if (!work) {
            var br = editor.create.inside.element('br');
            var currentBox = editor.create.inside.element(third, br);
            editor.selection.insertNode(currentBox, false);
            editor.selection.setCursorIn(currentBox);
        }
        editor.setEditorValue();
        return false;
    });
}
exports.formatBlock = formatBlock;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
var helpers_1 = __webpack_require__(3);
var icon_1 = __webpack_require__(5);
Config_1.Config.prototype.fullsize = false;
Config_1.Config.prototype.globalFullsize = true;
Config_1.Config.prototype.controls.fullsize = {
    exec: function (editor) {
        editor.toggleFullSize();
    },
    isActive: function (editor) { return editor.isFullSize(); },
    getLabel: function (editor, btn, button) {
        var mode = editor.isFullSize() ? 'shrink' : 'fullsize';
        if (button) {
            button.textBox.innerHTML = !editor.options.textIcons
                ? icon_1.ToolbarIcon.getIcon(mode)
                : "<span>" + editor.i18n(mode) + "</span>";
            button.textBox.firstChild.classList.add('jodit_icon');
        }
    },
    tooltip: 'Open editor in fullsize',
    mode: consts.MODE_SOURCE + consts.MODE_WYSIWYG
};
function fullsize(editor) {
    var shown = false, oldHeight = 0, oldWidth = 0, wasToggled = false;
    var resize = function () {
        if (editor.events) {
            if (shown) {
                oldHeight = helpers_1.css(editor.container, 'height');
                oldWidth = helpers_1.css(editor.container, 'width');
                helpers_1.css(editor.container, {
                    height: editor.ownerWindow.innerHeight,
                    width: editor.ownerWindow.innerWidth
                });
                wasToggled = true;
            }
            else if (wasToggled) {
                helpers_1.css(editor.container, {
                    height: oldHeight || 'auto',
                    width: oldWidth || 'auto'
                });
            }
        }
    }, toggle = function (enable) {
        var _a, _b, _c;
        if (!editor.container) {
            return;
        }
        if (enable === undefined) {
            enable = !editor.container.classList.contains('jodit_fullsize');
        }
        editor.options.fullsize = enable;
        shown = enable;
        editor.container.classList.toggle('jodit_fullsize', enable);
        if (editor.toolbar) {
            if (!enable) {
                (_a = editor.toolbar.getParentContainer()) === null || _a === void 0 ? void 0 : _a.appendChild(editor.toolbar.container);
            }
            else {
                (_b = editor.container.querySelector('.jodit_toolbar_container')) === null || _b === void 0 ? void 0 : _b.appendChild(editor.toolbar.container);
            }
            helpers_1.css(editor.toolbar.container, 'width', 'auto');
        }
        if (editor.options.globalFullsize) {
            var node = editor.container.parentNode;
            while (node && node.nodeType !== Node.DOCUMENT_NODE) {
                node.classList.toggle('jodit_fullsize_box', enable);
                node = node.parentNode;
            }
            resize();
        }
        (_c = editor.events) === null || _c === void 0 ? void 0 : _c.fire('afterResize');
    };
    if (editor.options.globalFullsize) {
        editor.events.on(editor.ownerWindow, 'resize', resize);
    }
    editor.events
        .on('afterInit afterOpen', function () {
        var _a, _b;
        editor.toggleFullSize((_b = (_a = editor) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.fullsize);
    })
        .on('toggleFullSize', toggle)
        .on('beforeDestruct beforeClose', function () {
        toggle(false);
    })
        .on('beforeDestruct', function () {
        editor.events &&
            editor.events.off(editor.ownerWindow, 'resize', resize);
    });
}
exports.fullsize = fullsize;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var Plugin_1 = __webpack_require__(6);
var normalize_1 = __webpack_require__(18);
Config_1.Config.prototype.commandToHotkeys = {
    removeFormat: ['ctrl+shift+m', 'cmd+shift+m'],
    insertOrderedList: ['ctrl+shift+7', 'cmd+shift+7'],
    insertUnorderedList: ['ctrl+shift+8, cmd+shift+8'],
    selectall: ['ctrl+a', 'cmd+a']
};
var hotkeys = (function (_super) {
    tslib_1.__extends(hotkeys, _super);
    function hotkeys() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onKeyPress = function (event) {
            var special = _this.specialKeys[event.which], character = (event.key || String.fromCharCode(event.which)).toLowerCase();
            var modif = [special || character];
            ['alt', 'ctrl', 'shift', 'meta'].forEach(function (specialKey) {
                if (event[specialKey + 'Key'] && special !== specialKey) {
                    modif.push(specialKey);
                }
            });
            return normalize_1.normalizeKeyAliases(modif.join('+'));
        };
        _this.specialKeys = {
            8: 'backspace',
            9: 'tab',
            10: 'return',
            13: 'return',
            16: 'shift',
            17: 'ctrl',
            18: 'alt',
            19: 'pause',
            20: 'capslock',
            27: 'esc',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            45: 'insert',
            46: 'del',
            59: ';',
            61: '=',
            91: 'meta',
            96: '0',
            97: '1',
            98: '2',
            99: '3',
            100: '4',
            101: '5',
            102: '6',
            103: '7',
            104: '8',
            105: '9',
            106: '*',
            107: '+',
            109: '-',
            110: '.',
            111: '/',
            112: 'f1',
            113: 'f2',
            114: 'f3',
            115: 'f4',
            116: 'f5',
            117: 'f6',
            118: 'f7',
            119: 'f8',
            120: 'f9',
            121: 'f10',
            122: 'f11',
            123: 'f12',
            144: 'numlock',
            145: 'scroll',
            173: '-',
            186: ';',
            187: '=',
            188: ',',
            189: '-',
            190: '.',
            191: '/',
            192: '`',
            219: '[',
            220: '\\',
            221: ']',
            222: "'"
        };
        return _this;
    }
    hotkeys.prototype.afterInit = function (editor) {
        var _this = this;
        var commands = Object.keys(editor.options.commandToHotkeys);
        commands.forEach(function (commandName) {
            var shortcuts = editor.options.commandToHotkeys[commandName];
            if (shortcuts) {
                editor.registerHotkeyToCommand(shortcuts, commandName);
            }
        });
        var itIsHotkey = false;
        editor.events
            .off('.hotkeys')
            .on('keydown.hotkeys', function (event) {
            var shortcut = _this.onKeyPress(event);
            var resultOfFire = _this.jodit.events.fire(shortcut + '.hotkey', event.type);
            if (resultOfFire === false) {
                itIsHotkey = true;
                editor.events.stopPropagation('keydown');
                return false;
            }
        }, undefined, undefined, true)
            .on('keyup.hotkeys', function () {
            if (itIsHotkey) {
                itIsHotkey = false;
                editor.events.stopPropagation('keyup');
                return false;
            }
        }, undefined, undefined, true);
    };
    hotkeys.prototype.beforeDestruct = function (jodit) {
        if (jodit.events) {
            jodit.events.off('.hotkeys');
        }
    };
    return hotkeys;
}(Plugin_1.Plugin));
exports.hotkeys = hotkeys;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var defaultLanguage_1 = __webpack_require__(34);
var css_1 = __webpack_require__(11);
var checker_1 = __webpack_require__(12);
var modules_1 = __webpack_require__(28);
var helpers_1 = __webpack_require__(3);
var constants_1 = __webpack_require__(2);
Config_1.Config.prototype.iframeBaseUrl = '';
Config_1.Config.prototype.iframeTitle = 'Jodit Editor';
Config_1.Config.prototype.iframeDoctype = '<!DOCTYPE html>';
Config_1.Config.prototype.iframeDefaultSrc = 'about:blank';
Config_1.Config.prototype.iframeStyle =
    'html{' +
        'margin: 0px;' +
        'min-height: 100%;' +
        '}' +
        'body{' +
        'box-sizing: border-box;' +
        'font-size: 13px;' +
        '    line-height: 1.6;' +
        'padding:10px;' +
        'background:transparent;' +
        'color:#000;' +
        'position:' +
        'relative;' +
        'z-index: 2;' +
        'user-select:auto;' +
        'margin:0px;' +
        'overflow:auto;' +
        '}' +
        'table{' +
        'width:100%;' +
        'border: none;' +
        'border-collapse:collapse;' +
        'empty-cells: show;' +
        'max-width: 100%;' +
        '}' +
        'th,td{' +
        'padding: 2px 5px;' +
        'border:1px solid #ccc;' +
        '-webkit-user-select:text;' +
        '-moz-user-select:text;' +
        '-ms-user-select:text;' +
        'user-select:text' +
        '}' +
        'td[data-jodit-selected-cell],' +
        'th[data-jodit-selected-cell]{' +
        'border: 1px double #1e88e5' +
        '}' +
        'p{' +
        'margin-top:0;' +
        '}' +
        '.jodit_editor .jodit_iframe_wrapper{' +
        'display: block;' +
        'clear: both;' +
        'user-select: none;' +
        'position: relative;' +
        '}' +
        '.jodit_editor .jodit_iframe_wrapper:after {' +
        'position:absolute;' +
        'content:"";' +
        'z-index:1;' +
        'top:0;' +
        'left:0;' +
        'right: 0;' +
        'bottom: 0;' +
        'cursor: pointer;' +
        'display: block;' +
        'background: rgba(0, 0, 0, 0);' +
        '} ' +
        '.jodit_disabled{' +
        'user-select: none;' +
        '-o-user-select: none;' +
        '-moz-user-select: none;' +
        '-khtml-user-select: none;' +
        '-webkit-user-select: none;' +
        '-ms-user-select: none' +
        '}';
Config_1.Config.prototype.iframeCSSLinks = [];
Config_1.Config.prototype.editHTMLDocumentMode = false;
function iframe(editor) {
    var opt = editor.options;
    editor.events
        .on('afterSetMode', function () {
        if (editor.isEditorMode()) {
            editor.selection.focus();
        }
    })
        .on('generateDocumentStructure.iframe', function (__doc, jodit) {
        var doc = __doc ||
            jodit.iframe
                .contentWindow.document;
        doc.open();
        doc.write("" + opt.iframeDoctype +
            ("<html dir=\"" + opt.direction + "\" class=\"jodit\" lang=\"" + defaultLanguage_1.defaultLanguage(opt.language) + "\">\n\t\t\t\t\t\t<head>\n\t\t\t\t\t\t\t<title>" + opt.iframeTitle + "</title>\n\t\t\t\t\t\t\t" + (opt.iframeBaseUrl
                ? "<base href=\"" + opt.iframeBaseUrl + "\"/>"
                : '') + "\n\t\t\t\t\t\t</head>\n\t\t\t\t\t\t<body class=\"jodit_wysiwyg\" style=\"outline:none\"></body>\n\t\t\t\t\t</html>"));
        doc.close();
        if (opt.iframeCSSLinks) {
            opt.iframeCSSLinks.forEach(function (href) {
                var link = doc.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', href);
                doc.head && doc.head.appendChild(link);
            });
        }
        if (opt.iframeStyle) {
            var style = doc.createElement('style');
            style.innerHTML = opt.iframeStyle;
            doc.head && doc.head.appendChild(style);
        }
    })
        .on('createEditor', function () {
        if (!opt.iframe) {
            return;
        }
        var iframe = editor.create.element('iframe');
        iframe.style.display = 'block';
        iframe.src = 'about:blank';
        iframe.className = 'jodit_wysiwyg_iframe';
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('tabindex', opt.tabIndex.toString());
        iframe.setAttribute('frameborder', '0');
        editor.workplace.appendChild(iframe);
        editor.iframe = iframe;
        var result = editor.events.fire('generateDocumentStructure.iframe', null, editor);
        var init = function () {
            if (!editor.iframe) {
                return;
            }
            var doc = editor.iframe.contentWindow.document;
            editor.editorWindow = editor.iframe.contentWindow;
            var docMode = opt.editHTMLDocumentMode;
            var toggleEditable = function () {
                modules_1.Dom.toggleAttribute(doc.body, 'contenteditable', editor.getMode() !== constants_1.MODE_SOURCE && !editor.getReadOnly());
            };
            var clearMarkers = function (html) {
                var bodyReg = /<body.*<\/body>/im, bodyMarker = '{%%BODY%%}', body = bodyReg.exec(html);
                if (body) {
                    html = html
                        .replace(bodyReg, bodyMarker)
                        .replace(/<span([^>]*?)>(.*?)<\/span>/gim, '')
                        .replace(/&lt;span([^&]*?)&gt;(.*?)&lt;\/span&gt;/gim, '')
                        .replace(bodyMarker, body[0].replace(/(<body[^>]+?)([\s]*["'])?contenteditable["'\s]*=[\s"']*true["']?/im, '$1'));
                }
                return html;
            };
            if (docMode) {
                var tag = editor.element.tagName;
                if (tag !== 'TEXTAREA' && tag !== 'INPUT') {
                    throw helpers_1.error('If enable `editHTMLDocumentMode` - source element should be INPUT or TEXTAREA');
                }
                editor.editor = doc.documentElement;
                editor.events
                    .on('beforeGetNativeEditorValue', function () {
                    return clearMarkers(doc.documentElement.outerHTML);
                })
                    .on('beforeSetNativeEditorValue', function (value) {
                    if (/<(html|body)/i.test(value)) {
                        var old = doc.documentElement.outerHTML;
                        if (old !== value) {
                            doc.open('text/html', 'replace');
                            doc.write(clearMarkers(value));
                            doc.close();
                            editor.editor = doc.documentElement;
                            toggleEditable();
                        }
                    }
                    else {
                        doc.body.innerHTML = value;
                    }
                    return true;
                });
            }
            else {
                editor.editor = doc.body;
            }
            editor.events.on('afterSetMode afterInit afterAddPlace', toggleEditable);
            if (opt.height === 'auto') {
                doc.documentElement &&
                    (doc.documentElement.style.overflowY = 'hidden');
                var resizeIframe = editor.async.throttle(function () {
                    if (editor.editor &&
                        editor.iframe &&
                        opt.height === 'auto') {
                        css_1.css(editor.iframe, 'height', editor.editor.offsetHeight);
                    }
                }, editor.defaultTimeout / 2);
                editor.events
                    .on('change afterInit afterSetMode resize', resizeIframe)
                    .on([
                    editor.iframe,
                    editor.editorWindow,
                    doc.documentElement
                ], 'load', resizeIframe)
                    .on(doc, 'readystatechange DOMContentLoaded', resizeIframe);
            }
            (function (e) {
                e.matches || (e.matches = Element.prototype.matches);
            })(editor.editorWindow.Element.prototype);
            if (doc.documentElement) {
                editor.events
                    .on(doc.documentElement, 'mousedown touchend', function () {
                    if (!editor.selection.isFocused()) {
                        editor.selection.focus();
                        if (editor.editor === doc.body) {
                            editor.selection.setCursorIn(doc.body);
                        }
                    }
                })
                    .on(editor.editorWindow, 'mousedown touchstart keydown keyup touchend click mouseup mousemove scroll', function (e) {
                    var _a;
                    (_a = editor.events) === null || _a === void 0 ? void 0 : _a.fire(editor.ownerWindow, e);
                });
            }
        };
        if (checker_1.isPromise(result)) {
            return result.then(init);
        }
        init();
        return false;
    });
}
exports.iframe = iframe;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(3);
var JODIT_IMAGE_PROCESSOR_BINDED = '__jodit_imageprocessor_binded';
function imageProcessor(editor) {
    editor.events.on('change afterInit changePlace', editor.async.debounce(function () {
        if (editor.editor) {
            helpers_1.$$('img', editor.editor).forEach(function (elm) {
                if (!elm[JODIT_IMAGE_PROCESSOR_BINDED]) {
                    elm[JODIT_IMAGE_PROCESSOR_BINDED] = true;
                    if (!elm.complete) {
                        elm.addEventListener('load', function ElementOnLoad() {
                            editor.events &&
                                editor.events.fire &&
                                editor.events.fire('resize');
                            elm.removeEventListener('load', ElementOnLoad);
                        });
                    }
                    editor.events.on(elm, 'mousedown touchstart', function () {
                        editor.selection.select(elm);
                    });
                }
            });
        }
    }, editor.defaultTimeout));
}
exports.imageProcessor = imageProcessor;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var dialog_1 = __webpack_require__(13);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var icon_1 = __webpack_require__(5);
var Widget_1 = __webpack_require__(17);
var TabsWidget = Widget_1.Widget.TabsWidget;
var FileSelectorWidget = Widget_1.Widget.FileSelectorWidget;
var popup_1 = __webpack_require__(27);
Config_1.Config.prototype.image = {
    openOnDblClick: true,
    editSrc: true,
    useImageEditor: true,
    editTitle: true,
    editAlt: true,
    editLink: true,
    editSize: true,
    editBorderRadius: true,
    editMargins: true,
    editClass: true,
    editStyle: true,
    editId: true,
    editAlign: true,
    showPreview: true,
    selectImageAfterClose: true
};
function imageProperties(editor) {
    var i18n = editor.i18n, gi = icon_1.ToolbarIcon.getIcon.bind(icon_1.ToolbarIcon), opt = editor.options, dom = editor.create.fromHTML.bind(editor.create);
    var open = function (e) {
        var _this = this;
        if (opt.readonly) {
            return;
        }
        e && e.stopImmediatePropagation();
        var image = this, dialog = new dialog_1.Dialog(editor), buttons = {
            check: dom("<a href=\"javascript:void(0)\" class=\"jodit_button  jodit_status_success\">" + gi('check') + "<span>" + i18n('Ok') + "</span></a>"),
            cancel: dom("<a href=\"javascript:void(0)\" class=\"jodit_button  jodit_status_primary\">" + gi('cancel') + "<span>" + i18n('Cancel') + "</span></a>"),
            remove: dom("<a href=\"javascript:void(0)\" class=\"jodit_button\">" + gi('bin') + "<span>" + i18n('Delete') + "</span></a>")
        }, prop = dom("<form class=\"jodit_properties\">\n\t\t\t\t\t\t\t\t<div class=\"jodit_grid\">\n\t\t\t\t\t\t\t\t\t<div class=\"jodit_col-lg-2-5\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"jodit_properties_view_box\">\n\t\t\t\t\t\t\t\t\t\t\t<div style=\"" + (!opt.image.showPreview
            ? 'display:none'
            : '') + "\" class=\"jodit_properties_image_view\">\n\t\t\t\t\t\t\t\t\t\t\t\t<img class=\"imageViewSrc\" src=\"\" alt=\"\"/>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<div style=\"" + (!opt.image.editSize
            ? 'display:none'
            : '') + "\" class=\"jodit_form_group jodit_properties_image_sizes\">\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"imageWidth jodit_input\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t<a class=\"jodit_lock_helper jodit_lock_size\" href=\"javascript:void(0)\">" + gi('lock') + "</a>\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"imageHeight jodit_input\"/>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"jodit_col-lg-3-5 tabsbox\"></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</form>"), positionTab = dom("<div style=\"" + (!opt.image.editMargins ? 'display:none' : '') + "\" class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t<label>" + i18n('Margins') + "</label>\n\t\t\t\t\t\t\t\t<div class=\"jodit_grid jodit_vertical_middle\">\n\t\t\t\t\t\t\t\t\t<input class=\"jodit_col-lg-1-5 margins marginTop jodit_input\" data-id=\"marginTop\" type=\"text\" placeholder=\"" + i18n('top') + "\"/>\n\t\t\t\t\t\t\t\t\t<a style=\"text-align: center;\" class=\"jodit_lock_helper jodit_lock_margin jodit_col-lg-1-5\" href=\"javascript:void(0)\">" + gi('lock') + "</a>\n\t\t\t\t\t\t\t\t\t<input disabled=\"true\" class=\"jodit_col-lg-1-5 margins marginRight jodit_input\" data-id=\"marginRight\" type=\"text\" placeholder=\"" + i18n('right') + "\"/>\n\t\t\t\t\t\t\t\t\t<input disabled=\"true\" class=\"jodit_col-lg-1-5 margins marginBottom jodit_input\" data-id=\"marginBottom\" type=\"text\" placeholder=\"" + i18n('bottom') + "\"/>\n\t\t\t\t\t\t\t\t\t<input disabled=\"true\" class=\"jodit_col-lg-1-5 margins marginLeft jodit_input\" data-id=\"marginLeft\" type=\"text\" placeholder=\"" + i18n('left') + "\"/>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div style=\"" + (!opt.image.editStyle ? 'display:none' : '') + "\" class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t<label>" + i18n('Styles') + "</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"style jodit_input\"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div style=\"" + (!opt.image.editClass ? 'display:none' : '') + "\" class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t<label for=\"classes\">" + i18n('Classes') + "</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"classes jodit_input\"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div style=\"" + (!opt.image.editId ? 'display:none' : '') + "\" class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t<label for=\"id\">Id</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"id jodit_input\"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\tstyle=\"" + (!opt.image.editBorderRadius ? 'display:none' : '') + "\"\n\t\t\t\t\t\t\t\tclass=\"jodit_form_group\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<label for=\"border_radius\">" + i18n('Border radius') + "</label>\n\t\t\t\t\t\t\t\t<input type=\"number\" class=\"border_radius jodit_input\"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\tstyle=\"" + (!opt.image.editAlign ? 'display:none' : '') + "\"\n\t\t\t\t\t\t\t\tclass=\"jodit_form_group\"\n\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<label for=\"align\">" + i18n('Align') + "</label>\n\t\t\t\t\t\t\t\t<select class=\"select align jodit_select\">\n\t\t\t\t\t\t\t\t\t<option value=\"\">" + i18n('--Not Set--') + "</option>\n\t\t\t\t\t\t\t\t\t<option value=\"left\">" + i18n('Left') + "</option>\n\t\t\t\t\t\t\t\t\t<option value=\"center\">" + i18n('Center') + "</option>\n\t\t\t\t\t\t\t\t\t<option value=\"right\">" + i18n('Right') + "</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</div>"), hasFbUrl = opt.filebrowser.ajax.url || opt.uploader.url, hasEditor = opt.image.useImageEditor, mainTab = dom("<div style=\"" + (!opt.image.editSrc ? 'display:none' : '') + "\" class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t<label>" + i18n('Src') + "</label>\n\t\t\t\t\t\t\t\t<div class=\"jodit_input_group\">\n\t\t\t\t\t\t\t\t\t<input class=\"jodit_input imageSrc\" type=\"text\"/>\n\t\t\t\t\t\t\t\t\t<div\n\t\t\t\t\t\t\t\t\t\tclass=\"jodit_input_group-buttons\"\n\t\t\t\t\t\t\t\t\t\tstyle=\"" + (hasFbUrl ? '' : 'display: none') + "\"\n\t\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t\t\t\t<a class=\"jodit_button jodit_rechange\" href=\"javascript:void(0)\">" + gi('image') + "</a>\n\t\t\t\t\t\t\t\t\t\t\t<a\n\t\t\t\t\t\t\t\t\t\t\t\tclass=\"jodit_button jodit_use_image_editor\" href=\"javascript:void(0)\"\n\t\t\t\t\t\t\t\t\t\t\t\tstyle=\"" + (hasEditor ? '' : 'display: none') + "\"\n\t\t\t\t\t\t\t\t\t\t\t>" + gi('crop') + "</a>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div style=\"" + (!opt.image.editTitle ? 'display:none' : '') + "\" class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t<label for=\"imageTitle\">" + i18n('Title') + "</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"imageTitle jodit_input\"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div style=\"" + (!opt.image.editAlt ? 'display:none' : '') + "\" class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t<label for=\"imageAlt\">" + i18n('Alternative') + "</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"imageAlt jodit_input\"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div style=\"" + (!opt.image.editLink ? 'display:none' : '') + "\" class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t<label for=\"imageLink\">" + i18n('Link') + "</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"imageLink jodit_input\"/>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div style=\"" + (!opt.image.editLink ? 'display:none' : '') + "\" class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t<label class=\"jodit_vertical_middle\">\n\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"imageLinkOpenInNewTab jodit_checkbox\"/>\n\t\t\t\t\t\t\t\t\t<span>" + i18n('Open link in new tab') + "</span>\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>"), ratio = image.naturalWidth / image.naturalHeight || 1, $w = prop.querySelector('.imageWidth'), $h = prop.querySelector('.imageHeight'), updateAlign = function () {
            if (image.style.cssFloat &&
                ['left', 'right'].indexOf(image.style.cssFloat.toLowerCase()) !== -1) {
                helpers_1.val(prop, '.align', helpers_1.css(image, 'float'));
            }
            else {
                if (helpers_1.css(image, 'display') === 'block' &&
                    image.style.marginLeft === 'auto' &&
                    image.style.marginRight === 'auto') {
                    helpers_1.val(prop, '.align', 'center');
                }
            }
        }, updateBorderRadius = function () {
            helpers_1.val(prop, '.border_radius', (parseInt(image.style.borderRadius || '0', 10) || '0').toString());
        }, updateId = function () {
            helpers_1.val(prop, '.id', image.getAttribute('id') || '');
        }, updateStyle = function () {
            helpers_1.val(prop, '.style', image.getAttribute('style') || '');
        }, updateClasses = function () {
            helpers_1.val(prop, '.classes', (image.getAttribute('class') || '').replace(/jodit_focused_image[\s]*/, ''));
        }, updateMargins = function () {
            if (!opt.image.editMargins) {
                return;
            }
            var notequal = false;
            helpers_1.$$('.margins', prop).forEach(function (elm) {
                var id = elm.getAttribute('data-id') || '';
                var value = image.style[id];
                if (!value) {
                    return;
                }
                if (/^[0-9]+(px)?$/.test(value)) {
                    value = parseInt(value, 10);
                }
                elm.value = value.toString() || '';
                if (!notequal &&
                    id !== 'marginTop' &&
                    elm.value !==
                        helpers_1.val(prop, '.marginTop')) {
                    notequal = true;
                }
            });
            lockMargin = !notequal;
            var lock_margin = prop.querySelector('.jodit_lock_margin');
            if (lock_margin) {
                lock_margin.innerHTML = gi(lockMargin ? 'lock' : 'unlock');
            }
            helpers_1.$$('.margins:not(.marginTop)', prop).forEach(function (elm) {
                return !lockMargin
                    ? elm.removeAttribute('disabled')
                    : elm.setAttribute('disabled', 'true');
            });
        }, updateSizes = function () {
            $w.value = image.offsetWidth.toString();
            $h.value = image.offsetHeight.toString();
        }, updateText = function () {
            if (image.hasAttribute('title')) {
                helpers_1.val(prop, '.imageTitle', image.getAttribute('title') || '');
            }
            if (image.hasAttribute('alt')) {
                helpers_1.val(prop, '.imageAlt', image.getAttribute('alt') || '');
            }
            var a = Dom_1.Dom.closest(image, 'a', editor.editor);
            if (a) {
                helpers_1.val(prop, '.imageLink', a.getAttribute('href') || '');
                prop.querySelector('.imageLinkOpenInNewTab').checked =
                    a.getAttribute('target') === '_blank';
            }
        }, updateSrc = function () {
            helpers_1.val(prop, '.imageSrc', image.getAttribute('src') || '');
            var imageViewSrc = prop.querySelector('.imageViewSrc');
            if (imageViewSrc) {
                imageViewSrc.setAttribute('src', image.getAttribute('src') || '');
            }
        }, update = function () {
            updateSrc();
            updateText();
            updateSizes();
            updateMargins();
            updateClasses();
            updateId();
            updateBorderRadius();
            updateAlign();
            updateStyle();
        };
        var lockSize = true, lockMargin = true;
        var tabs = {}, tabsbox = prop.querySelector('.tabsbox');
        tabs['Image'] = mainTab;
        tabs['Advanced'] = positionTab;
        if (tabsbox) {
            tabsbox.appendChild(TabsWidget(editor, tabs));
        }
        update();
        editor.events.on(dialog, 'afterClose', function () {
            dialog.destruct();
            if (image.parentNode && opt.image.selectImageAfterClose) {
                editor.selection.select(image);
            }
        });
        buttons.remove.addEventListener('click', function () {
            editor.selection.removeNode(image);
            dialog.close();
        });
        if (opt.image.useImageEditor) {
            helpers_1.$$('.jodit_use_image_editor', mainTab).forEach(function (btn) {
                editor.events.on(btn, 'mousedown touchstart', function () {
                    var url = image.getAttribute('src') || '', a = editor.create.element('a'), loadExternal = function () {
                        if (a.host !== location.host) {
                            dialog_1.Confirm(i18n('You can only edit your own images. Download this image on the host?'), function (yes) {
                                if (yes && editor.uploader) {
                                    editor.uploader.uploadRemoteImage(a.href.toString(), function (resp) {
                                        dialog_1.Alert(i18n('The image has been successfully uploaded to the host!'), function () {
                                            if (typeof resp.newfilename ===
                                                'string') {
                                                image.setAttribute('src', resp.baseurl +
                                                    resp.newfilename);
                                                updateSrc();
                                            }
                                        });
                                    }, function (error) {
                                        dialog_1.Alert(i18n('There was an error loading %s', error.message));
                                    });
                                }
                            });
                            return;
                        }
                    };
                    a.href = url;
                    editor.getInstance('FileBrowser').dataProvider.getPathByUrl(a.href.toString(), function (path, name, source) {
                        editor.getInstance('FileBrowser').openImageEditor(a.href, name, path, source, function () {
                            var timestamp = new Date().getTime();
                            image.setAttribute('src', url +
                                (url.indexOf('?') !== -1
                                    ? ''
                                    : '?') +
                                '&_tmp=' +
                                timestamp.toString());
                            updateSrc();
                        }, function (error) {
                            dialog_1.Alert(error.message);
                        });
                    }, function (error) {
                        dialog_1.Alert(error.message, loadExternal);
                    });
                });
            });
        }
        helpers_1.$$('.jodit_rechange', mainTab).forEach(function (imagebtn) {
            imagebtn.addEventListener('mousedown', function (event) {
                imagebtn.classList.toggle('active');
                var popup = new popup_1.Popup(editor, imagebtn);
                popup.open(FileSelectorWidget(editor, {
                    upload: function (data) {
                        if (data.files && data.files.length) {
                            image.setAttribute('src', data.baseurl + data.files[0]);
                        }
                        update();
                        popup.close();
                    },
                    filebrowser: function (data) {
                        if (data &&
                            Array.isArray(data.files) &&
                            data.files.length) {
                            image.setAttribute('src', data.files[0]);
                            popup.close();
                            update();
                        }
                    }
                }, image, popup.close), true);
                event.stopPropagation();
            });
        });
        var jodit_lock_size = prop.querySelector('.jodit_lock_helper.jodit_lock_size'), jodit_lock_margin = prop.querySelector('.jodit_lock_helper.jodit_lock_margin');
        if (jodit_lock_size) {
            jodit_lock_size.addEventListener('click', function () {
                lockSize = !lockSize;
                this.innerHTML = gi(lockSize ? 'lock' : 'unlock');
                editor.events.fire($w, 'change');
            });
        }
        if (jodit_lock_margin) {
            jodit_lock_margin.addEventListener('click', function () {
                lockMargin = !lockMargin;
                this.innerHTML = gi(lockMargin ? 'lock' : 'unlock');
                if (!lockMargin) {
                    helpers_1.$$('.margins', prop).forEach(function (elm) {
                        if (!elm.matches('.marginTop')) {
                            elm.removeAttribute('disabled');
                        }
                    });
                }
                else {
                    helpers_1.$$('.margins', prop).forEach(function (elm) {
                        if (!elm.matches('.marginTop')) {
                            elm.setAttribute('disabled', 'true');
                        }
                    });
                }
            });
        }
        var changeSizes = function (event) {
            var w = parseInt($w.value, 10), h = parseInt($h.value, 10);
            if (event.target === $w) {
                $h.value = Math.round(w / ratio).toString();
            }
            else {
                $w.value = Math.round(h * ratio).toString();
            }
        };
        editor.events.on([$w, $h], 'change keydown mousedown paste', function (event) {
            if (!lockSize) {
                return;
            }
            editor.async.setTimeout(changeSizes.bind(_this, event), {
                timeout: editor.defaultTimeout,
                label: 'image-properties-changeSize'
            });
        });
        dialog.setTitle(i18n('Image properties'));
        dialog.setContent(prop);
        buttons.check.addEventListener('click', function () {
            if (opt.image.editStyle) {
                if (helpers_1.val(prop, '.style')) {
                    image.setAttribute('style', helpers_1.val(prop, '.style'));
                }
                else {
                    image.removeAttribute('style');
                }
            }
            if (helpers_1.val(prop, '.imageSrc')) {
                image.setAttribute('src', helpers_1.val(prop, '.imageSrc'));
            }
            else {
                Dom_1.Dom.safeRemove(image);
                dialog.close();
                return;
            }
            if (helpers_1.val(prop, '.border_radius') !== '0' &&
                /^[0-9]+$/.test(helpers_1.val(prop, '.border_radius'))) {
                image.style.borderRadius = helpers_1.val(prop, '.border_radius') + 'px';
            }
            else {
                image.style.borderRadius = '';
            }
            if (helpers_1.val(prop, '.imageTitle')) {
                image.setAttribute('title', helpers_1.val(prop, '.imageTitle'));
            }
            else {
                image.removeAttribute('title');
            }
            if (helpers_1.val(prop, '.imageAlt')) {
                image.setAttribute('alt', helpers_1.val(prop, '.imageAlt'));
            }
            else {
                image.removeAttribute('alt');
            }
            var link = Dom_1.Dom.closest(image, 'a', editor.editor);
            if (helpers_1.val(prop, '.imageLink')) {
                if (!link) {
                    link = Dom_1.Dom.wrap(image, 'a', editor);
                }
                link.setAttribute('href', helpers_1.val(prop, '.imageLink'));
                if (prop.querySelector('.imageLinkOpenInNewTab').checked) {
                    link.setAttribute('target', '_blank');
                }
                else {
                    link.removeAttribute('target');
                }
            }
            else {
                if (link && link.parentNode) {
                    link.parentNode.replaceChild(image, link);
                }
            }
            var normalSize = function (value) {
                value = helpers_1.trim(value);
                return /^[0-9]+$/.test(value) ? value + 'px' : value;
            };
            if ($w.value !== image.offsetWidth.toString() ||
                $h.value !== image.offsetHeight.toString()) {
                helpers_1.css(image, {
                    width: helpers_1.trim($w.value) ? normalSize($w.value) : null,
                    height: helpers_1.trim($h.value) ? normalSize($h.value) : null
                });
            }
            if (opt.image.editMargins) {
                if (!lockMargin) {
                    helpers_1.$$('.margins', prop).forEach(function (margin) {
                        var id = margin.getAttribute('data-id') || '';
                        helpers_1.css(image, id, normalSize(margin.value));
                    });
                }
                else {
                    helpers_1.css(image, 'margin', normalSize(helpers_1.val(prop, '.marginTop')));
                }
            }
            if (opt.image.editClass) {
                if (helpers_1.val(prop, '.classes')) {
                    image.setAttribute('class', helpers_1.val(prop, '.classes'));
                }
                else {
                    image.removeAttribute('class');
                }
            }
            if (opt.image.editId) {
                if (helpers_1.val(prop, '.id')) {
                    image.setAttribute('id', helpers_1.val(prop, '.id'));
                }
                else {
                    image.removeAttribute('id');
                }
            }
            if (opt.image.editAlign) {
                if (helpers_1.val(prop, '.align')) {
                    if (['right', 'left'].indexOf(helpers_1.val(prop, '.align').toLowerCase()) !== -1) {
                        helpers_1.css(image, 'float', helpers_1.val(prop, '.align'));
                        helpers_1.clearCenterAlign(image);
                    }
                    else {
                        helpers_1.css(image, 'float', '');
                        helpers_1.css(image, {
                            display: 'block',
                            'margin-left': 'auto',
                            'margin-right': 'auto'
                        });
                    }
                }
                else {
                    if (helpers_1.css(image, 'float') &&
                        ['right', 'left'].indexOf(helpers_1.css(image, 'float')
                            .toString()
                            .toLowerCase()) !== -1) {
                        helpers_1.css(image, 'float', '');
                    }
                    helpers_1.clearCenterAlign(image);
                }
            }
            if (!image.getAttribute('style')) {
                image.removeAttribute('style');
            }
            editor.setEditorValue();
            dialog.close();
        });
        buttons.cancel.addEventListener('click', function () { return dialog.close(); });
        dialog.setFooter([[buttons.cancel, buttons.remove], buttons.check]);
        dialog.setSize(500);
        dialog.open();
        if (e) {
            e.preventDefault();
        }
        return false;
    };
    editor.events
        .on('beforeDestruct', function () {
        editor.events.off(editor.editor, '.imageproperties');
    })
        .on('afterInit changePlace', function () {
        editor.events.off(editor.editor, '.imageproperties');
        if (opt.image.openOnDblClick) {
            editor.events.on(editor.editor, 'dblclick.imageproperties', open, 'img');
        }
        else {
            editor.events.on(editor.editor, 'dblclick.imageproperties', function (event) {
                event.stopImmediatePropagation();
                editor.selection.select(this);
            }, 'img');
        }
    })
        .on('openImageProperties', function (image) {
        open.call(image);
    });
}
exports.imageProperties = imageProperties;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
Config_1.Config.prototype.controls.indent = {
    tooltip: 'Increase Indent'
};
Config_1.Config.prototype.controls.outdent = {
    isDisable: function (editor) {
        var current = editor.selection.current();
        if (current) {
            var currentBox = Dom_1.Dom.closest(current, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor);
            if (currentBox && currentBox.style && currentBox.style.marginLeft) {
                return parseInt(currentBox.style.marginLeft, 10) <= 0;
            }
        }
        return true;
    },
    tooltip: 'Decrease Indent'
};
Config_1.Config.prototype.indentMargin = 10;
function indent(editor) {
    var callback = function (command) {
        var indentedBoxes = [];
        editor.selection.eachSelection(function (current) {
            var selectionInfo = editor.selection.save();
            var currentBox = current
                ? Dom_1.Dom.up(current, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor)
                : false;
            var enter = editor.options.enter;
            if (!currentBox && current) {
                currentBox = Dom_1.Dom.wrapInline(current, enter !== constants_1.BR ? enter : constants_1.PARAGRAPH, editor);
            }
            if (!currentBox) {
                editor.selection.restore(selectionInfo);
                return false;
            }
            var alreadyIndented = indentedBoxes.indexOf(currentBox) !== -1;
            if (currentBox && currentBox.style && !alreadyIndented) {
                indentedBoxes.push(currentBox);
                var marginLeft = currentBox.style.marginLeft
                    ? parseInt(currentBox.style.marginLeft, 10)
                    : 0;
                marginLeft +=
                    editor.options.indentMargin *
                        (command === 'outdent' ? -1 : 1);
                currentBox.style.marginLeft =
                    marginLeft > 0 ? marginLeft + 'px' : '';
                if (!currentBox.getAttribute('style')) {
                    currentBox.removeAttribute('style');
                }
            }
            editor.selection.restore(selectionInfo);
        });
        editor.setEditorValue();
        return false;
    };
    editor.registerCommand('indent', {
        exec: callback,
        hotkeys: ['ctrl+]', 'cmd+]']
    });
    editor.registerCommand('outdent', {
        exec: callback,
        hotkeys: ['ctrl+[', 'cmd+[']
    });
}
exports.indent = indent;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var Widget_1 = __webpack_require__(17);
var ColorPickerWidget = Widget_1.Widget.ColorPickerWidget;
var TabsWidget = Widget_1.Widget.TabsWidget;
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var Plugin_1 = __webpack_require__(6);
var Table_1 = __webpack_require__(29);
var popup_1 = __webpack_require__(27);
var joditToolbarCollection_1 = __webpack_require__(20);
Config_1.Config.prototype.toolbarInline = true;
Config_1.Config.prototype.toolbarInlineDisableFor = [];
Config_1.Config.prototype.popup = {
    a: [
        {
            name: 'eye',
            tooltip: 'Open link',
            exec: function (editor, current) {
                var href = current.getAttribute('href');
                if (current && href) {
                    editor.ownerWindow.open(href);
                }
            }
        },
        {
            name: 'link',
            tooltip: 'Edit link',
            icon: 'pencil'
        },
        'unlink',
        'brush',
        'file'
    ],
    jodit: [
        {
            name: 'bin',
            tooltip: 'Delete',
            exec: function (editor, image) {
                editor.selection.removeNode(image);
                editor.events.fire('hidePopup');
            }
        }
    ],
    'jodit-media': [
        {
            name: 'bin',
            tooltip: 'Delete',
            exec: function (editor, image) {
                editor.selection.removeNode(image);
                editor.events.fire('hidePopup');
            }
        }
    ],
    img: [
        {
            name: 'delete',
            icon: 'bin',
            tooltip: 'Delete',
            exec: function (editor, image) {
                editor.selection.removeNode(image);
                editor.events.fire('hidePopup');
            }
        },
        {
            name: 'pencil',
            exec: function (editor, current) {
                var tagName = current.tagName.toLowerCase();
                if (tagName === 'img') {
                    editor.events.fire('openImageProperties', current);
                }
            },
            tooltip: 'Edit'
        },
        {
            name: 'valign',
            list: ['Top', 'Middle', 'Bottom'],
            tooltip: 'Vertical align',
            exec: function (editor, image, control) {
                var tagName = image.tagName.toLowerCase();
                if (tagName !== 'img') {
                    return;
                }
                var command = control.args && typeof control.args[1] === 'string'
                    ? control.args[1].toLowerCase()
                    : '';
                helpers_1.css(image, 'vertical-align', command);
                editor.events.fire('recalcPositionPopup');
            }
        },
        {
            name: 'left',
            list: ['Left', 'Right', 'Center', 'Normal'],
            exec: function (editor, image, control) {
                var tagName = image.tagName.toLowerCase();
                if (tagName !== 'img') {
                    return;
                }
                var command = control.args && typeof control.args[1] === 'string'
                    ? control.args[1].toLowerCase()
                    : '';
                if (command !== 'normal') {
                    if (['right', 'left'].indexOf(command) !== -1) {
                        helpers_1.css(image, 'float', command);
                        helpers_1.clearCenterAlign(image);
                    }
                    else {
                        helpers_1.css(image, 'float', '');
                        helpers_1.css(image, {
                            display: 'block',
                            'margin-left': 'auto',
                            'margin-right': 'auto'
                        });
                    }
                }
                else {
                    if (helpers_1.css(image, 'float') &&
                        ['right', 'left'].indexOf(helpers_1.css(image, 'float').toLowerCase()) !== -1) {
                        helpers_1.css(image, 'float', '');
                    }
                    helpers_1.clearCenterAlign(image);
                }
                editor.events.fire('recalcPositionPopup');
            },
            tooltip: 'Horizontal align'
        }
    ],
    table: [
        {
            name: 'brush',
            popup: function (editor, elm) {
                var selected = Table_1.Table.getAllSelectedCells(elm);
                var $bg, $cl, $br, $tab, color, br_color, bg_color;
                if (!selected.length) {
                    return false;
                }
                color = helpers_1.css(selected[0], 'color');
                bg_color = helpers_1.css(selected[0], 'background-color');
                br_color = helpers_1.css(selected[0], 'border-color');
                $bg = ColorPickerWidget(editor, function (value) {
                    selected.forEach(function (cell) {
                        helpers_1.css(cell, 'background-color', value);
                    });
                    editor.setEditorValue();
                }, bg_color);
                $cl = ColorPickerWidget(editor, function (value) {
                    selected.forEach(function (cell) {
                        helpers_1.css(cell, 'color', value);
                    });
                    editor.setEditorValue();
                }, color);
                $br = ColorPickerWidget(editor, function (value) {
                    selected.forEach(function (cell) {
                        helpers_1.css(cell, 'border-color', value);
                    });
                    editor.setEditorValue();
                }, br_color);
                $tab = TabsWidget(editor, {
                    Background: $bg,
                    Text: $cl,
                    Border: $br
                });
                return $tab;
            },
            tooltip: 'Background'
        },
        {
            name: 'valign',
            list: ['Top', 'Middle', 'Bottom'],
            exec: function (editor, table, control) {
                var command = control.args && typeof control.args[1] === 'string'
                    ? control.args[1].toLowerCase()
                    : '';
                Table_1.Table.getAllSelectedCells(table).forEach(function (cell) {
                    helpers_1.css(cell, 'vertical-align', command);
                });
            },
            tooltip: 'Vertical align'
        },
        {
            name: 'splitv',
            list: {
                tablesplitv: 'Split vertical',
                tablesplitg: 'Split horizontal'
            },
            tooltip: 'Split'
        },
        {
            name: 'align',
            icon: 'left'
        },
        '\n',
        {
            name: 'merge',
            command: 'tablemerge',
            tooltip: 'Merge'
        },
        {
            name: 'addcolumn',
            list: {
                tableaddcolumnbefore: 'Insert column before',
                tableaddcolumnafter: 'Insert column after'
            },
            exec: function (editor, table, control) {
                var command = control.args && typeof control.args[0] === 'string'
                    ? control.args[0].toLowerCase()
                    : '';
                editor.execCommand(command, false, table);
            },
            tooltip: 'Add column'
        },
        {
            name: 'addrow',
            list: {
                tableaddrowbefore: 'Insert row above',
                tableaddrowafter: 'Insert row below'
            },
            exec: function (editor, table, control) {
                var command = control.args && typeof control.args[0] === 'string'
                    ? control.args[0].toLowerCase()
                    : '';
                editor.execCommand(command, false, table);
            },
            tooltip: 'Add row'
        },
        {
            name: 'delete',
            icon: 'bin',
            list: {
                tablebin: 'Delete table',
                tablebinrow: 'Delete row',
                tablebincolumn: 'Delete column',
                tableempty: 'Empty cell'
            },
            exec: function (editor, table, control) {
                var command = control.args && typeof control.args[0] === 'string'
                    ? control.args[0].toLowerCase()
                    : '';
                editor.execCommand(command, false, table);
                editor.events.fire('hidePopup');
            },
            tooltip: 'Delete'
        }
    ]
};
var inlinePopup = (function (_super) {
    tslib_1.__extends(inlinePopup, _super);
    function inlinePopup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._hiddenClass = 'jodit_toolbar_popup-inline-target-hidden';
        _this.isSelectionStarted = false;
        _this.onSelectionEnd = _this.jodit.async.debounce(function () {
            if (_this.isDestructed || !_this.jodit.isEditorMode()) {
                return;
            }
            if (_this.isSelectionStarted) {
                if (!_this.isTargetAction) {
                    _this.onChangeSelection();
                }
            }
            _this.isSelectionStarted = false;
            _this.isTargetAction = false;
        }, _this.jodit.defaultTimeout);
        _this.isTargetAction = false;
        _this.isSelectionPopup = false;
        _this.calcWindSizes = function () {
            var win = _this.jodit.ownerWindow;
            var docElement = _this.jodit.ownerDocument
                .documentElement;
            if (!docElement) {
                return {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0
                };
            }
            var body = _this.jodit.ownerDocument.body;
            var scrollTop = win.pageYOffset || docElement.scrollTop || body.scrollTop;
            var clientTop = docElement.clientTop || body.clientTop || 0;
            var scrollLeft = win.pageXOffset || docElement.scrollLeft || body.scrollLeft;
            var clientLeft = docElement.clientLeft || body.clientLeft || 0;
            var windWidth = docElement.clientWidth + scrollLeft - clientLeft;
            var windHeight = docElement.clientHeight + scrollTop - clientTop;
            return {
                left: clientLeft,
                top: clientTop,
                width: windWidth,
                height: windHeight
            };
        };
        _this.calcPosition = function (rect, windowSize) {
            if (_this.isDestructed) {
                return;
            }
            _this.popup.target.classList.remove(_this._hiddenClass);
            var selectionCenterLeft = rect.left + rect.width / 2;
            var workplacePosition = helpers_1.offset(_this.jodit.workplace, _this.jodit, _this.jodit.ownerDocument, true);
            var targetTop = rect.top + rect.height + 10;
            var diff = 50;
            _this.target.style.left = selectionCenterLeft + 'px';
            _this.target.style.top = targetTop + 'px';
            if (_this.jodit.isFullSize()) {
                _this.target.style.zIndex = helpers_1.css(_this.jodit.container, 'zIndex').toString();
            }
            var halfWidthPopup = _this.container.offsetWidth / 2;
            var marginLeft = -halfWidthPopup;
            _this.popup.container.classList.remove('jodit_toolbar_popup-inline-top');
            if (targetTop + _this.container.offsetHeight > windowSize.height) {
                targetTop = rect.top - _this.container.offsetHeight - 10;
                _this.target.style.top = targetTop + 'px';
                _this.popup.container.classList.add('jodit_toolbar_popup-inline-top');
            }
            if (selectionCenterLeft - halfWidthPopup < 0) {
                marginLeft = -(rect.width / 2 + rect.left);
            }
            if (selectionCenterLeft + halfWidthPopup > windowSize.width) {
                marginLeft = -(_this.container.offsetWidth -
                    (windowSize.width - selectionCenterLeft));
            }
            _this.container.style.marginLeft = marginLeft + 'px';
            if (workplacePosition.top - targetTop > diff ||
                targetTop - (workplacePosition.top + workplacePosition.height) >
                    diff) {
                _this.popup.target.classList.add(_this._hiddenClass);
            }
        };
        _this.reCalcPosition = function () {
            if (_this.__getRect) {
                _this.calcPosition(_this.__getRect(), _this.calcWindSizes());
            }
        };
        _this.showPopup = function (rect, type, elm) {
            if (!_this.jodit.options.toolbarInline ||
                !_this.jodit.options.popup[type.toLowerCase()]) {
                return false;
            }
            if (_this.isExcludedTarget(type)) {
                return true;
            }
            _this.isOpened = true;
            _this.isTargetAction = true;
            var windSize = _this.calcWindSizes();
            _this.targetContainer.parentNode ||
                _this.jodit.ownerDocument.body.appendChild(_this.targetContainer);
            _this.toolbar.build(_this.jodit.options.popup[type.toLowerCase()], _this.container, elm);
            _this.popup.open(_this.container, false, true);
            _this.__getRect = rect;
            _this.calcPosition(rect(), windSize);
            return true;
        };
        _this.hidePopup = function (root) {
            if (_this.isDestructed) {
                return;
            }
            if (root &&
                (Dom_1.Dom.isNode(root, _this.jodit.editorWindow || window) ||
                    root instanceof popup_1.Popup) &&
                Dom_1.Dom.isOrContains(_this.target, root instanceof popup_1.Popup ? root.target : root)) {
                return;
            }
            _this.isTargetAction = false;
            _this.isOpened = false;
            _this.popup.close();
            Dom_1.Dom.safeRemove(_this.targetContainer);
        };
        _this.onSelectionStart = function (event) {
            if (_this.isDestructed || !_this.jodit.isEditorMode()) {
                return;
            }
            _this.isTargetAction = false;
            _this.isSelectionPopup = false;
            if (!_this.isSelectionStarted) {
                var elements = Object.keys(_this.jodit.options.popup).join('|'), target_1 = event.target.nodeName === 'IMG'
                    ? event.target
                    : Dom_1.Dom.closest(event.target, elements, _this.jodit.editor);
                if (!target_1 ||
                    !_this.showPopup(function () { return helpers_1.offset(target_1, _this.jodit, _this.jodit.editorDocument); }, target_1.nodeName, target_1)) {
                    _this.isSelectionStarted = true;
                }
            }
        };
        _this.checkIsTargetEvent = function () {
            if (!_this.isTargetAction) {
                _this.hidePopup();
            }
            else {
                _this.isTargetAction = false;
            }
        };
        _this.isOpened = false;
        _this.onChangeSelection = function () {
            if (!_this.jodit.options.toolbarInline || !_this.jodit.isEditorMode()) {
                return;
            }
            if (_this.hideIfCollapsed()) {
                return;
            }
            if (_this.jodit.options.popup.selection !== undefined) {
                var sel = _this.jodit.selection.sel;
                if (sel && sel.rangeCount) {
                    _this.isSelectionPopup = true;
                    var range_1 = sel.getRangeAt(0);
                    _this.showPopup(function () { return helpers_1.offset(range_1, _this.jodit, _this.jodit.editorDocument); }, 'selection');
                }
            }
        };
        return _this;
    }
    inlinePopup.prototype.isExcludedTarget = function (type) {
        return (helpers_1.splitArray(this.jodit.options.toolbarInlineDisableFor)
            .map(function (a) { return a.toLowerCase(); })
            .indexOf(type.toLowerCase()) !== -1);
    };
    inlinePopup.prototype.hideIfCollapsed = function () {
        if (this.jodit.selection.isCollapsed()) {
            this.hidePopup();
            return true;
        }
        return false;
    };
    inlinePopup.prototype.afterInit = function (jodit) { };
    inlinePopup.prototype.init = function (editor) {
        var _this = this;
        this.toolbar = joditToolbarCollection_1.JoditToolbarCollection.makeCollection(editor);
        this.target = editor.create.div('jodit_toolbar_popup-inline-target');
        this.targetContainer = editor.create.div('jodit_toolbar_popup-inline-container', this.target);
        this.container = editor.create.div();
        this.popup = new popup_1.Popup(editor, this.target, undefined, 'jodit_toolbar_popup-inline');
        editor.events
            .on(this.target, 'mousedown keydown touchstart', function (e) {
            e.stopPropagation();
        })
            .on('beforeOpenPopup hidePopup afterSetMode blur', this.hidePopup)
            .on('recalcPositionPopup', this.reCalcPosition)
            .on('getDiffButtons.mobile', function (_toolbar) {
            if (_this.toolbar === _toolbar) {
                return helpers_1.splitArray(editor.options.buttons)
                    .filter(function (name) { return name !== '|' && name !== '\n'; })
                    .filter(function (name) {
                    return (_this.toolbar.getButtonsList().indexOf(name) < 0);
                });
            }
        })
            .on('selectionchange', this.onChangeSelection)
            .on('afterCommand afterExec', function () {
            if (_this.isOpened && _this.isSelectionPopup) {
                _this.onChangeSelection();
            }
        })
            .on('showPopup', function (elm, rect) {
            var elementName = (typeof elm === 'string'
                ? elm
                : elm.nodeName).toLowerCase();
            _this.isSelectionPopup = false;
            _this.showPopup(rect, elementName, typeof elm === 'string' ? undefined : elm);
        })
            .on('mousedown keydown touchstart', this.onSelectionStart);
        editor.events.on('afterInit changePlace', function () {
            editor.events
                .off('.inlinePopup')
                .on([editor.ownerWindow, editor.editor], 'scroll.inlinePopup resize.inlinePopup', _this.reCalcPosition)
                .on([editor.ownerWindow], 'mouseup.inlinePopup keyup.inlinePopup touchend.inlinePopup', _this.onSelectionEnd)
                .on([editor.ownerWindow], 'mousedown.inlinePopup keydown.inlinePopup touchstart.inlinePopup', _this.checkIsTargetEvent);
        });
    };
    inlinePopup.prototype.beforeDestruct = function (editor) {
        this.popup && this.popup.destruct();
        delete this.popup;
        this.toolbar && this.toolbar.destruct();
        delete this.toolbar;
        Dom_1.Dom.safeRemove(this.target);
        Dom_1.Dom.safeRemove(this.container);
        Dom_1.Dom.safeRemove(this.targetContainer);
        editor.events &&
            editor.events
                .off([editor.ownerWindow], 'scroll resize', this.reCalcPosition)
                .off([editor.ownerWindow], 'mouseup keyup touchend', this.onSelectionEnd)
                .off([editor.ownerWindow], 'mousedown keydown touchstart', this.checkIsTargetEvent);
    };
    return inlinePopup;
}(Plugin_1.Plugin));
exports.inlinePopup = inlinePopup;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var icon_1 = __webpack_require__(5);
Config_1.Config.prototype.controls.align = {
    name: 'left',
    tooltip: 'Align',
    getLabel: function (editor, btn, button) {
        var current = editor.selection.current();
        if (current) {
            var currentBox = Dom_1.Dom.closest(current, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor) || editor.editor;
            var currentValue = helpers_1.css(currentBox, 'text-align').toString();
            if (btn.defaultValue &&
                btn.defaultValue.indexOf(currentValue) !== -1) {
                currentValue = 'left';
            }
            if (button &&
                btn.data &&
                btn.data.currentValue !== currentValue &&
                btn.list &&
                btn.list.indexOf(currentValue) !== -1) {
                button.textBox.innerHTML = !editor.options.textIcons
                    ? icon_1.ToolbarIcon.getIcon(currentValue, '')
                    : "<span>" + currentValue + "</span>";
                button.textBox.firstChild.classList.add('jodit_icon');
                btn.data.currentValue = currentValue;
            }
        }
        return false;
    },
    isActive: function (editor, btn) {
        var current = editor.selection.current();
        if (current && btn.defaultValue) {
            var currentBox = Dom_1.Dom.closest(current, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor) || editor.editor;
            return (btn.defaultValue.indexOf(helpers_1.css(currentBox, 'text-align').toString()) === -1);
        }
        return false;
    },
    defaultValue: ['left', 'start', 'inherit'],
    data: {
        currentValue: 'left'
    },
    list: ['center', 'left', 'right', 'justify']
};
Config_1.Config.prototype.controls.center = {
    command: 'justifyCenter',
    css: {
        'text-align': 'center'
    },
    tooltip: 'Align Center'
};
Config_1.Config.prototype.controls.justify = {
    command: 'justifyFull',
    css: {
        'text-align': 'justify'
    },
    tooltip: 'Align Justify'
};
Config_1.Config.prototype.controls.left = {
    command: 'justifyLeft',
    css: {
        'text-align': 'left'
    },
    tooltip: 'Align Left'
};
Config_1.Config.prototype.controls.right = {
    command: 'justifyRight',
    css: {
        'text-align': 'right'
    },
    tooltip: 'Align Right'
};
function justify(editor) {
    var callback = function (command) {
        var justifyElm = function (box) {
            if (box instanceof editor.editorWindow.HTMLElement) {
                switch (command.toLowerCase()) {
                    case 'justifyfull':
                        box.style.textAlign = 'justify';
                        break;
                    case 'justifyright':
                        box.style.textAlign = 'right';
                        break;
                    case 'justifyleft':
                        box.style.textAlign = 'left';
                        break;
                    case 'justifycenter':
                        box.style.textAlign = 'center';
                        break;
                }
            }
        };
        editor.selection.focus();
        editor.selection.eachSelection(function (current) {
            if (!current) {
                if (editor.editor.querySelector('.jodit_selected_cell')) {
                    helpers_1.$$('.jodit_selected_cell', editor.editor).forEach(justifyElm);
                    return false;
                }
            }
            if (!(current instanceof editor.editorWindow.Node)) {
                return;
            }
            var currentBox = current
                ? Dom_1.Dom.up(current, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor)
                : false;
            if (!currentBox && current) {
                currentBox = Dom_1.Dom.wrapInline(current, editor.options.enterBlock, editor);
            }
            justifyElm(currentBox);
        });
        return false;
    };
    editor.registerCommand('justifyfull', callback);
    editor.registerCommand('justifyright', callback);
    editor.registerCommand('justifyleft', callback);
    editor.registerCommand('justifycenter', callback);
}
exports.justify = justify;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var html_1 = __webpack_require__(33);
Config_1.Config.prototype.limitWords = false;
Config_1.Config.prototype.limitChars = false;
Config_1.Config.prototype.limitHTML = false;
function limit(jodit) {
    if (jodit && (jodit.options.limitWords || jodit.options.limitChars)) {
        var callback_1 = function (event, inputText) {
            if (inputText === void 0) { inputText = ''; }
            var text = inputText ||
                (jodit.options.limitHTML ? jodit.value : jodit.text);
            var words = text
                .replace(constants_1.INVISIBLE_SPACE_REG_EXP, '')
                .split(constants_1.SPACE_REG_EXP)
                .filter(function (e) { return e.length; });
            if (event && constants_1.COMMAND_KEYS.indexOf(event.which) !== -1) {
                return;
            }
            if (jodit.options.limitWords &&
                jodit.options.limitWords <= words.length) {
                return jodit.options.limitWords === words.length;
            }
            if (jodit.options.limitChars &&
                jodit.options.limitChars <= words.join('').length) {
                return jodit.options.limitChars === words.join('').length;
            }
            return;
        };
        var snapshot_1 = null;
        jodit.events
            .off('.limit')
            .on('beforePaste.limit', function () {
            snapshot_1 = jodit.observer.snapshot.make();
        })
            .on('keydown.limit keyup.limit beforeEnter.limit beforePaste.limit', function (event) {
            if (callback_1(event) !== undefined) {
                return false;
            }
        })
            .on('change.limit', jodit.async.debounce(function (newValue, oldValue) {
            if (callback_1(null, jodit.options.limitHTML
                ? newValue
                : html_1.stripTags(newValue)) === false) {
                jodit.value = oldValue;
            }
        }, jodit.defaultTimeout))
            .on('afterPaste.limit', function () {
            if (callback_1(null) === false && snapshot_1) {
                jodit.observer.snapshot.restore(snapshot_1);
                return false;
            }
        });
    }
}
exports.limit = limit;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
Config_1.Config.prototype.link = {
    formTemplate: function (editor) {
        var i18n = editor.i18n.bind(editor);
        return "<form class=\"jodit_form\">\n\t\t\t<div class=\"jodit_form_group\">\n\t\t\t\t<input ref=\"url_input\" class=\"jodit_input\" required type=\"text\" name=\"url\" placeholder=\"http://\" type=\"text\"/>\n\t\t\t</div>\n\t\t\t<div ref=\"content_input_box\" class=\"jodit_form_group\">\n\t\t\t\t<input ref=\"content_input\" class=\"jodit_input\" name=\"text\" placeholder=\"" + i18n('Text') + "\" type=\"text\"/>\n\t\t\t</div>\n\t\t\t<label ref=\"target_checkbox_box\">\n\t\t\t\t<input ref=\"target_checkbox\" class=\"jodit_checkbox\" name=\"target\" type=\"checkbox\"/>\n\t\t\t\t<span>" + i18n('Open in new tab') + "</span>\n\t\t\t</label>\n\t\t\t<label ref=\"nofollow_checkbox_box\">\n\t\t\t\t<input ref=\"nofollow_checkbox\" class=\"jodit_checkbox\" name=\"nofollow\" type=\"checkbox\"/>\n\t\t\t\t<span>" + i18n('No follow') + "</span>\n\t\t\t</label>\n\t\t\t<div class=\"jodit_buttons\">\n\t\t\t\t<button ref=\"unlink\" class=\"jodit_button jodit_unlink_button\" type=\"button\">" + i18n('Unlink') + "</button>\n\t\t\t\t<button ref=\"insert\" class=\"jodit_button jodit_link_insert_button\" type=\"submit\">" + i18n('Insert') + "</button>\n\t\t\t</div>\n\t\t<form/>";
    },
    followOnDblClick: true,
    processVideoLink: true,
    processPastedLink: true,
    removeLinkAfterFormat: true,
    noFollowCheckbox: true,
    openInNewTabCheckbox: true
};
Config_1.Config.prototype.controls.unlink = {
    exec: function (editor, current) {
        var anchor = Dom_1.Dom.closest(current, 'A', editor.editor);
        if (anchor) {
            Dom_1.Dom.unwrap(anchor);
        }
        editor.events.fire('hidePopup');
    },
    tooltip: 'Unlink'
};
Config_1.Config.prototype.controls.link = {
    isActive: function (editor) {
        var current = editor.selection.current();
        return current && Dom_1.Dom.closest(current, 'a', editor.editor) !== false;
    },
    popup: function (editor, current, self, close) {
        var i18n = editor.i18n.bind(editor), _a = editor.options.link, openInNewTabCheckbox = _a.openInNewTabCheckbox, noFollowCheckbox = _a.noFollowCheckbox, formTemplate = _a.formTemplate, formClassName = _a.formClassName, form = editor.create.fromHTML(formTemplate(editor), {
            target_checkbox_box: openInNewTabCheckbox,
            nofollow_checkbox_box: noFollowCheckbox
        });
        var elements = helpers_1.refs(form), insert = elements.insert, unlink = elements.unlink, content_input_box = elements.content_input_box, _b = elements, target_checkbox = _b.target_checkbox, nofollow_checkbox = _b.nofollow_checkbox, url_input = _b.url_input, currentElement = current, isImageContent = Dom_1.Dom.isImage(currentElement, editor.editorWindow);
        var content_input = elements.content_input;
        if (!content_input) {
            content_input = editor.create.element('input', {
                type: 'hidden',
                ref: 'content_input'
            });
        }
        if (formClassName) {
            form.classList.add(formClassName);
        }
        if (isImageContent) {
            Dom_1.Dom.hide(content_input_box);
        }
        var link;
        var getSelectionText = function () {
            return link
                ? link.innerText
                : helpers_1.stripTags(editor.selection.range.cloneContents(), editor.editorDocument);
        };
        if (current && Dom_1.Dom.closest(current, 'A', editor.editor)) {
            link = Dom_1.Dom.closest(current, 'A', editor.editor);
        }
        else {
            link = false;
        }
        if (!isImageContent && current) {
            content_input.value = getSelectionText();
        }
        if (link) {
            url_input.value = link.getAttribute('href') || '';
            if (openInNewTabCheckbox && target_checkbox) {
                target_checkbox.checked =
                    link.getAttribute('target') === '_blank';
            }
            if (noFollowCheckbox && nofollow_checkbox) {
                nofollow_checkbox.checked =
                    link.getAttribute('rel') === 'nofollow';
            }
            insert.textContent = i18n('Update');
        }
        else {
            Dom_1.Dom.hide(unlink);
        }
        var selInfo = editor.selection.save();
        if (unlink) {
            editor.events.on(unlink, 'click', function (e) {
                if (link) {
                    Dom_1.Dom.unwrap(link);
                }
                editor.selection.restore(selInfo);
                close();
                e.preventDefault();
            });
        }
        editor.events.on(form, 'submit', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (!url_input.value.trim().length) {
                url_input.focus();
                url_input.classList.add('jodit_error');
                return false;
            }
            var links;
            editor.selection.restore(selInfo);
            var textWasChanged = getSelectionText() !== content_input.value.trim();
            if (!link) {
                if (!editor.selection.isCollapsed()) {
                    links = editor.selection.wrapInTag('a');
                }
                else {
                    var a = editor.create.inside.element('a');
                    editor.selection.insertNode(a);
                    links = [a];
                }
            }
            else {
                links = [link];
            }
            links.forEach(function (a) {
                a.setAttribute('href', url_input.value);
                if (!isImageContent) {
                    if (content_input.value.trim().length) {
                        if (textWasChanged) {
                            a.textContent = content_input.value;
                        }
                    }
                    else {
                        a.textContent = url_input.value;
                    }
                }
                if (openInNewTabCheckbox && target_checkbox) {
                    if (target_checkbox.checked) {
                        a.setAttribute('target', '_blank');
                    }
                    else {
                        a.removeAttribute('target');
                    }
                }
                if (noFollowCheckbox && nofollow_checkbox) {
                    if (nofollow_checkbox.checked) {
                        a.setAttribute('rel', 'nofollow');
                    }
                    else {
                        a.removeAttribute('rel');
                    }
                }
            });
            close();
            return false;
        });
        return form;
    },
    tags: ['a'],
    tooltip: 'Insert link'
};
function link(jodit) {
    if (jodit.options.link.followOnDblClick) {
        jodit.events.on('afterInit changePlace', function () {
            jodit.events.off('dblclick.link').on(jodit.editor, 'dblclick.link', function (e) {
                var href = this.getAttribute('href');
                if (href) {
                    location.href = href;
                    e.preventDefault();
                }
            }, 'a');
        });
    }
    if (jodit.options.link.processPastedLink) {
        jodit.events.on('processPaste.link', function (event, html) {
            if (helpers_1.isURL(html)) {
                if (jodit.options.link.processVideoLink) {
                    var embed = helpers_1.convertMediaURLToVideoEmbed(html);
                    if (embed !== html) {
                        return jodit.create.inside.fromHTML(embed);
                    }
                }
                var a = jodit.create.inside.element('a');
                a.setAttribute('href', html);
                a.textContent = html;
                return a;
            }
        });
    }
    if (jodit.options.link.removeLinkAfterFormat) {
        jodit.events.on('afterCommand.link', function (command) {
            var sel = jodit.selection;
            var newtag, node;
            if (command === 'removeFormat') {
                node = sel.current();
                if (node && node.nodeName !== 'A') {
                    node = Dom_1.Dom.closest(node, 'A', jodit.editor);
                }
                if (node && node.nodeName === 'A') {
                    if (node.innerHTML ===
                        node.textContent) {
                        newtag = jodit.create.inside.text(node.innerHTML);
                    }
                    else {
                        newtag = jodit.create.inside.element('span');
                        newtag.innerHTML = node.innerHTML;
                    }
                    if (node.parentNode) {
                        node.parentNode.replaceChild(newtag, node);
                        jodit.selection.setCursorIn(newtag, true);
                    }
                }
            }
        });
    }
}
exports.link = link;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
var selector_1 = __webpack_require__(10);
Config_1.Config.prototype.mediaFakeTag = 'jodit-media';
Config_1.Config.prototype.mediaInFakeBlock = true;
Config_1.Config.prototype.mediaBlocks = ['video', 'audio'];
function media(editor) {
    var keyFake = 'jodit_fake_wrapper';
    var _a = editor.options, mediaFakeTag = _a.mediaFakeTag, mediaBlocks = _a.mediaBlocks, mediaInFakeBlock = _a.mediaInFakeBlock;
    var wrap = function (element) {
        if (element.parentNode &&
            element.parentNode.getAttribute('data-jodit_iframe_wrapper')) {
            element = element.parentNode;
        }
        else {
            var wrapper = void 0;
            wrapper = editor.create.inside.fromHTML("<" + mediaFakeTag + " data-jodit-temp=\"1\" contenteditable=\"false\" draggable=\"true\" data-" + keyFake + "=\"1\"></" + mediaFakeTag + ">");
            wrapper.style.display =
                element.style.display === 'inline-block'
                    ? 'inline-block'
                    : 'block';
            wrapper.style.width = element.offsetWidth + 'px';
            wrapper.style.height = element.offsetHeight + 'px';
            if (element.parentNode) {
                element.parentNode.insertBefore(wrapper, element);
            }
            wrapper.appendChild(element);
            element = wrapper;
        }
        editor.events
            .off(element, 'mousedown.select touchstart.select')
            .on(element, 'mousedown.select touchstart.select', function () {
            editor.selection.setCursorAfter(element);
        });
    };
    if (mediaInFakeBlock) {
        editor.events
            .on('afterGetValueFromEditor', function (data) {
            var rxp = new RegExp("<" + mediaFakeTag + "[^>]+data-" + keyFake + "[^>]+>(.+?)</" + mediaFakeTag + ">", 'ig');
            if (rxp.test(data.value)) {
                data.value = data.value.replace(rxp, '$1');
            }
        })
            .on('change afterInit afterSetMode changePlace', editor.async.debounce(function () {
            if (!editor.isDestructed &&
                editor.getMode() !== consts.MODE_SOURCE) {
                selector_1.$$(mediaBlocks.join(','), editor.editor).forEach(function (elm) {
                    if (!elm['__' + keyFake]) {
                        elm['__' + keyFake] = true;
                        wrap(elm);
                    }
                });
            }
        }, editor.defaultTimeout));
    }
}
exports.media = media;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
var array_1 = __webpack_require__(21);
var joditToolbarCollection_1 = __webpack_require__(20);
Config_1.Config.prototype.mobileTapTimeout = 300;
Config_1.Config.prototype.toolbarAdaptive = true;
Config_1.Config.prototype.controls.dots = {
    mode: consts.MODE_SOURCE + consts.MODE_WYSIWYG,
    popup: function (editor, current, control, close, button) {
        var store = control.data;
        if (store === undefined) {
            store = {
                container: editor.create.div(),
                toolbar: joditToolbarCollection_1.JoditToolbarCollection.makeCollection(editor),
                rebuild: function () {
                    if (button) {
                        var buttons = editor.events.fire('getDiffButtons.mobile', button.parentToolbar);
                        if (buttons && store) {
                            store.toolbar.build(array_1.splitArray(buttons), store.container);
                        }
                    }
                }
            };
            var w = 32;
            var size = editor.options.toolbarButtonSize;
            if (size === 'large') {
                w = 36;
            }
            else if (size === 'small') {
                w = 24;
            }
            store.container.style.width = w * 3 + 'px';
            control.data = store;
        }
        store.rebuild();
        return store.container;
    },
    tooltip: 'Show all'
};
function mobile(editor) {
    var timeout = 0, now, store = array_1.splitArray(editor.options.buttons);
    editor.events
        .on('touchend', function (e) {
        if (e.changedTouches && e.changedTouches.length) {
            now = new Date().getTime();
            if (now - timeout > editor.options.mobileTapTimeout) {
                timeout = now;
                editor.selection.insertCursorAtPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            }
        }
    })
        .on('getDiffButtons.mobile', function (toolbar) {
        if (toolbar === editor.toolbar) {
            return array_1.splitArray(editor.options.buttons).filter(function (i) {
                return store.indexOf(i) < 0;
            });
        }
    });
    if (editor.options.toolbarAdaptive) {
        editor.events
            .on('resize afterInit recalcAdaptive changePlace afterAddPlace', function () {
            if (!editor.options.toolbar) {
                return;
            }
            var width = editor.container.offsetWidth;
            var newStore = [];
            if (width >= editor.options.sizeLG) {
                newStore = array_1.splitArray(editor.options.buttons);
            }
            else if (width >= editor.options.sizeMD) {
                newStore = array_1.splitArray(editor.options.buttonsMD);
            }
            else if (width >= editor.options.sizeSM) {
                newStore = array_1.splitArray(editor.options.buttonsSM);
            }
            else {
                newStore = array_1.splitArray(editor.options.buttonsXS);
            }
            if (newStore.toString() !== store.toString()) {
                store = newStore;
                editor.toolbar.build(store.concat(editor.options.extraButtons), editor.toolbar.container.parentElement ||
                    editor.toolbar.getParentContainer());
            }
        })
            .on(editor.ownerWindow, 'load', function () {
            return editor.events.fire('recalcAdaptive');
        });
    }
}
exports.mobile = mobile;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var Dom_1 = __webpack_require__(1);
Config_1.Config.prototype.controls.ul = {
    command: 'insertUnorderedList',
    controlName: 'ul',
    tags: ['ul'],
    tooltip: 'Insert Unordered List'
};
Config_1.Config.prototype.controls.ol = {
    command: 'insertOrderedList',
    controlName: 'ol',
    tags: ['ol'],
    tooltip: 'Insert Ordered List'
};
function orderedlist(editor) {
    editor.events.on('afterCommand', function (command) {
        if (/insert(un)?orderedlist/i.test(command)) {
            var ul = Dom_1.Dom.up(editor.selection.current(), function (tag) { return tag && /^UL|OL$/i.test(tag.nodeName); }, editor.editor);
            if (ul && ul.parentNode && ul.parentNode.nodeName === 'P') {
                var selection = editor.selection.save();
                Dom_1.Dom.unwrap(ul.parentNode);
                Array.from(ul.childNodes).forEach(function (li) {
                    if (Dom_1.Dom.isElement(li.lastChild) &&
                        li.lastChild.nodeName === 'BR') {
                        Dom_1.Dom.safeRemove(li.lastChild);
                    }
                });
                editor.selection.restore(selection);
            }
            editor.setEditorValue();
        }
    });
}
exports.orderedlist = orderedlist;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
var css_1 = __webpack_require__(11);
var Dom_1 = __webpack_require__(1);
var Plugin_1 = __webpack_require__(6);
var constants_1 = __webpack_require__(2);
Config_1.Config.prototype.showPlaceholder = true;
Config_1.Config.prototype.useInputsPlaceholder = true;
Config_1.Config.prototype.placeholder = 'Type something';
var placeholder = (function (_super) {
    tslib_1.__extends(placeholder, _super);
    function placeholder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addEvents = function () {
            var editor = _this.jodit;
            if (editor.options.useInputsPlaceholder &&
                editor.element.hasAttribute('placeholder')) {
                _this.placeholderElm.innerHTML =
                    editor.element.getAttribute('placeholder') || '';
            }
            editor.events.fire('placeholder', _this.placeholderElm.innerHTML);
            editor.events
                .off('.placeholder')
                .on('change.placeholder focus.placeholder keyup.placeholder mouseup.placeholder keydown.placeholder ' +
                'mousedown.placeholder afterSetMode.placeholder', _this.toggle)
                .on(window, 'load', _this.toggle);
            _this.toggle();
        };
        return _this;
    }
    placeholder.prototype.afterInit = function (editor) {
        var _this = this;
        if (!editor.options.showPlaceholder) {
            return;
        }
        this.toggle = editor.async.debounce(this.toggle.bind(this), this.jodit.defaultTimeout / 10);
        this.placeholderElm = editor.create.fromHTML("<span style=\"display: none;\" class=\"jodit_placeholder\">" + editor.i18n(editor.options.placeholder) + "</span>");
        if (editor.options.direction === 'rtl') {
            this.placeholderElm.style.right = '0px';
            this.placeholderElm.style.direction = 'rtl';
        }
        editor.events
            .on('readonly', function (isReadOnly) {
            if (isReadOnly) {
                _this.hide();
            }
            else {
                _this.toggle();
            }
        })
            .on('changePlace', this.init);
        this.addEvents();
    };
    placeholder.prototype.show = function () {
        var editor = this.jodit;
        if (editor.options.readonly) {
            return;
        }
        var marginTop = 0, marginLeft = 0;
        var style = editor.editorWindow.getComputedStyle(editor.editor);
        editor.workplace.appendChild(this.placeholderElm);
        if (Dom_1.Dom.isElement(editor.editor.firstChild)) {
            var style2 = editor.editorWindow.getComputedStyle(editor.editor.firstChild);
            marginTop = parseInt(style2.getPropertyValue('margin-top'), 10);
            marginLeft = parseInt(style2.getPropertyValue('margin-left'), 10);
            this.placeholderElm.style.fontSize =
                parseInt(style2.getPropertyValue('font-size'), 10) + 'px';
            this.placeholderElm.style.lineHeight = style2.getPropertyValue('line-height');
        }
        else {
            this.placeholderElm.style.fontSize =
                parseInt(style.getPropertyValue('font-size'), 10) + 'px';
            this.placeholderElm.style.lineHeight = style.getPropertyValue('line-height');
        }
        css_1.css(this.placeholderElm, {
            display: 'block',
            marginTop: Math.max(parseInt(style.getPropertyValue('margin-top'), 10), marginTop),
            marginLeft: Math.max(parseInt(style.getPropertyValue('margin-left'), 10), marginLeft)
        });
    };
    placeholder.prototype.hide = function () {
        Dom_1.Dom.safeRemove(this.placeholderElm);
    };
    placeholder.prototype.toggle = function () {
        var editor = this.jodit;
        if (!editor.editor || editor.isInDestruct) {
            return;
        }
        if (editor.getRealMode() !== consts.MODE_WYSIWYG) {
            this.hide();
            return;
        }
        if (!this.isEmpty(editor.editor)) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    placeholder.prototype.isEmpty = function (root) {
        if (!root.firstChild) {
            return true;
        }
        var first = root.firstChild;
        if (constants_1.MAY_BE_REMOVED_WITH_KEY.test(first.nodeName) || /^(TABLE)$/i.test(first.nodeName)) {
            return false;
        }
        var next = Dom_1.Dom.next(first, function (node) { return node && !Dom_1.Dom.isEmptyTextNode(node); }, root);
        if (Dom_1.Dom.isText(first) && !next) {
            return Dom_1.Dom.isEmptyTextNode(first);
        }
        if (!next &&
            Dom_1.Dom.each(first, function (elm) { return Dom_1.Dom.isEmpty(elm) || elm.nodeName === 'BR'; })) {
            return true;
        }
        return false;
    };
    placeholder.prototype.beforeDestruct = function (jodit) {
        this.hide();
        this.jodit.events.off('.placeholder').off(window, 'load', this.toggle);
    };
    return placeholder;
}(Plugin_1.Plugin));
exports.placeholder = placeholder;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
var Plugin_1 = __webpack_require__(6);
Config_1.Config.prototype.controls.redo = {
    mode: consts.MODE_SPLIT,
    isDisable: function (editor) { return !editor.observer.stack.canRedo(); },
    tooltip: 'Redo'
};
Config_1.Config.prototype.controls.undo = {
    mode: consts.MODE_SPLIT,
    isDisable: function (editor) { return !editor.observer.stack.canUndo(); },
    tooltip: 'Undo'
};
var redoundo = (function (_super) {
    tslib_1.__extends(redoundo, _super);
    function redoundo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    redoundo.prototype.beforeDestruct = function () {
    };
    redoundo.prototype.afterInit = function (editor) {
        var callback = function (command) {
            if (editor.getRealMode() === consts.MODE_WYSIWYG) {
                editor.observer[command]();
            }
            return false;
        };
        editor.registerCommand('redo', {
            exec: callback,
            hotkeys: ['ctrl+y', 'ctrl+shift+z', 'cmd+y', 'cmd+shift+z']
        });
        editor.registerCommand('undo', {
            exec: callback,
            hotkeys: ['ctrl+z', 'cmd+z']
        });
    };
    return redoundo;
}(Plugin_1.Plugin));
exports.redoundo = redoundo;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
var constants_1 = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
var selector_1 = __webpack_require__(10);
var size_1 = __webpack_require__(19);
var helpers_1 = __webpack_require__(3);
Config_1.Config.prototype.useIframeResizer = true;
Config_1.Config.prototype.useTableResizer = true;
Config_1.Config.prototype.useImageResizer = true;
Config_1.Config.prototype.resizer = {
    showSize: true,
    hideSizeTimeout: 1000,
    min_width: 10,
    min_height: 10
};
function resizer(editor) {
    var LOCK_KEY = 'resizer';
    var handle, currentElement, resizeElementClicked = false, isResizing = false, start_x, start_y, width, height, ratio, new_h, new_w, diff_x, diff_y, resizerIsVisible = false;
    var resizerElm = editor.create.fromHTML("<div style=\"display:none\" class=\"jodit_resizer\">\n\t\t\t\t<i class=\"jodit_resizer-topleft\"></i>\n\t\t\t\t<i class=\"jodit_resizer-topright\"></i>\n\t\t\t\t<i class=\"jodit_resizer-bottomright\"></i>\n\t\t\t\t<i class=\"jodit_resizer-bottomleft\"></i>\n\t\t\t\t<span>100x100</span>\n\t\t\t</div>"), sizeViewer = resizerElm.getElementsByTagName('span')[0], hideResizer = function () {
        isResizing = false;
        resizerIsVisible = false;
        currentElement = null;
        resizerElm.style.display = 'none';
    }, hideSizeViewer = function () {
        sizeViewer.style.opacity = '0';
    }, showSizeViewer = function (w, h) {
        if (!editor.options.resizer.showSize) {
            return;
        }
        if (w < sizeViewer.offsetWidth || h < sizeViewer.offsetHeight) {
            hideSizeViewer();
            return;
        }
        sizeViewer.style.opacity = '1';
        sizeViewer.innerHTML = w + " x " + h;
        editor.async.setTimeout(hideSizeViewer, {
            timeout: editor.options.resizer.hideSizeTimeout,
            label: 'hideSizeViewer'
        });
    }, updateSize = function () {
        if (editor.isInDestruct) {
            return;
        }
        if (resizerIsVisible && currentElement && resizerElm) {
            var workplacePosition = size_1.offset((resizerElm.parentNode ||
                editor.ownerDocument
                    .documentElement), editor, editor.ownerDocument, true), pos = size_1.offset(currentElement, editor, editor.editorDocument), left = parseInt(resizerElm.style.left || '0', 10), top_1 = parseInt(resizerElm.style.top || '0', 10), w = resizerElm.offsetWidth, h = resizerElm.offsetHeight;
            var newTop = pos.top - 1 - workplacePosition.top, newLeft = pos.left - 1 - workplacePosition.left;
            if (top_1 !== newTop ||
                left !== newLeft ||
                w !== currentElement.offsetWidth ||
                h !== currentElement.offsetHeight) {
                resizerElm.style.top = newTop + 'px';
                resizerElm.style.left = newLeft + 'px';
                resizerElm.style.width = currentElement.offsetWidth + 'px';
                resizerElm.style.height =
                    currentElement.offsetHeight + 'px';
                if (editor.events) {
                    editor.events.fire(currentElement, 'changesize');
                    if (!isNaN(left)) {
                        editor.events.fire('resize');
                    }
                }
            }
        }
    }, showResizer = function () {
        if (editor.options.readonly) {
            return;
        }
        if (!resizerElm.parentNode) {
            editor.markOwner(resizerElm);
            editor.workplace.appendChild(resizerElm);
        }
        resizerIsVisible = true;
        resizerElm.style.display = 'block';
        if (editor.isFullSize()) {
            resizerElm.style.zIndex = helpers_1.css(editor.container, 'zIndex').toString();
        }
        updateSize();
    }, bind = function (element) {
        var wrapper;
        if (element.tagName === 'IFRAME') {
            var iframe_1 = element;
            if (element.parentNode &&
                element.parentNode.getAttribute('data-jodit_iframe_wrapper')) {
                element = element.parentNode;
            }
            else {
                wrapper = editor.create.inside.fromHTML('<jodit ' +
                    'data-jodit-temp="1" ' +
                    'contenteditable="false" ' +
                    'draggable="true" ' +
                    'data-jodit_iframe_wrapper="1"' +
                    '></jodit>');
                wrapper.style.display =
                    element.style.display === 'inline-block'
                        ? 'inline-block'
                        : 'block';
                wrapper.style.width = element.offsetWidth + 'px';
                wrapper.style.height = element.offsetHeight + 'px';
                if (element.parentNode) {
                    element.parentNode.insertBefore(wrapper, element);
                }
                wrapper.appendChild(element);
                element = wrapper;
            }
            editor.events
                .off(element, 'mousedown.select touchstart.select')
                .on(element, 'mousedown.select touchstart.select', function () {
                editor.selection.select(element);
            });
            editor.events
                .off(element, 'changesize')
                .on(element, 'changesize', function () {
                iframe_1.setAttribute('width', element.offsetWidth + 'px');
                iframe_1.setAttribute('height', element.offsetHeight + 'px');
            });
        }
        var timer;
        editor.events
            .on(element, 'dragstart', hideResizer)
            .on(element, 'mousedown', function (event) {
            if (constants_1.IS_IE && element.nodeName === 'IMG') {
                event.preventDefault();
            }
        })
            .on(element, 'mousedown touchstart', function () {
            if (!resizeElementClicked) {
                resizeElementClicked = true;
                currentElement = element;
                showResizer();
                if (currentElement.tagName === 'IMG' &&
                    !currentElement.complete) {
                    currentElement.addEventListener('load', function ElementOnLoad() {
                        updateSize();
                        if (currentElement) {
                            currentElement.removeEventListener('load', ElementOnLoad);
                        }
                    });
                }
                editor.async.clearTimeout(timer);
            }
            timer = editor.async.setTimeout(function () {
                resizeElementClicked = false;
            }, 400);
        });
    };
    selector_1.$$('i', resizerElm).forEach(function (resizeHandle) {
        editor.events.on(resizeHandle, 'mousedown touchstart', function (e) {
            if (!currentElement || !currentElement.parentNode) {
                hideResizer();
                return false;
            }
            handle = resizeHandle;
            e.preventDefault();
            e.stopImmediatePropagation();
            width = currentElement.offsetWidth;
            height = currentElement.offsetHeight;
            ratio = width / height;
            isResizing = true;
            start_x = e.clientX;
            start_y = e.clientY;
            editor.events.fire('hidePopup');
            editor.lock(LOCK_KEY);
        });
    });
    editor.events
        .on('readonly', function (isReadOnly) {
        if (isReadOnly) {
            hideResizer();
        }
    })
        .on('beforeDestruct', function () {
        Dom_1.Dom.safeRemove(resizerElm);
    })
        .on('afterInit changePlace', function () {
        editor.events
            .off(editor.editor, '.resizer')
            .off(editor.ownerWindow, '.resizer')
            .on(editor.editor, 'keydown.resizer', function (e) {
            if (resizerIsVisible &&
                e.which === consts.KEY_DELETE &&
                currentElement &&
                currentElement.tagName.toLowerCase() !== 'table') {
                if (currentElement.tagName !== 'JODIT') {
                    editor.selection.select(currentElement);
                }
                else {
                    Dom_1.Dom.safeRemove(currentElement);
                    hideResizer();
                    e.preventDefault();
                }
            }
        })
            .on(editor.ownerWindow, 'mousemove.resizer touchmove.resizer', function (e) {
            if (isResizing) {
                diff_x = e.clientX - start_x;
                diff_y = e.clientY - start_y;
                if (!currentElement) {
                    return;
                }
                var className = handle.className;
                if ('IMG' === currentElement.tagName) {
                    if (diff_x) {
                        new_w =
                            width +
                                (className.match(/left/) ? -1 : 1) *
                                    diff_x;
                        new_h = Math.round(new_w / ratio);
                    }
                    else {
                        new_h =
                            height +
                                (className.match(/top/) ? -1 : 1) *
                                    diff_y;
                        new_w = Math.round(new_h * ratio);
                    }
                    if (new_w >
                        size_1.innerWidth(editor.editor, editor.ownerWindow)) {
                        new_w = size_1.innerWidth(editor.editor, editor.ownerWindow);
                        new_h = Math.round(new_w / ratio);
                    }
                }
                else {
                    new_w =
                        width +
                            (className.match(/left/) ? -1 : 1) * diff_x;
                    new_h =
                        height +
                            (className.match(/top/) ? -1 : 1) * diff_y;
                }
                if (new_w > editor.options.resizer.min_width) {
                    if (new_w <
                        resizerElm.parentNode
                            .offsetWidth) {
                        currentElement.style.width = new_w + 'px';
                    }
                    else {
                        currentElement.style.width = '100%';
                    }
                }
                if (new_h > editor.options.resizer.min_height) {
                    currentElement.style.height = new_h + 'px';
                }
                updateSize();
                showSizeViewer(currentElement.offsetWidth, currentElement.offsetHeight);
                e.stopImmediatePropagation();
            }
        })
            .on(editor.ownerWindow, 'resize.resizer', function () {
            if (resizerIsVisible) {
                updateSize();
            }
        })
            .on(editor.ownerWindow, 'mouseup.resizer keydown.resizer touchend.resizer', function (e) {
            if (resizerIsVisible && !resizeElementClicked) {
                if (isResizing) {
                    editor.unlock();
                    isResizing = false;
                    editor.setEditorValue();
                    e.stopImmediatePropagation();
                }
                else {
                    hideResizer();
                }
            }
        })
            .on([editor.ownerWindow, editor.editor], 'scroll.resizer', function () {
            if (resizerIsVisible && !isResizing) {
                hideResizer();
            }
        });
    })
        .on('afterGetValueFromEditor.resizer', function (data) {
        var rgx = /<jodit[^>]+data-jodit_iframe_wrapper[^>]+>(.*?<iframe[^>]+>[\s\n\r]*<\/iframe>.*?)<\/jodit>/gi;
        if (rgx.test(data.value)) {
            data.value = data.value.replace(rgx, '$1');
        }
    })
        .on('hideResizer', hideResizer)
        .on('change afterInit afterSetMode', editor.async.debounce(function () {
        if (resizerIsVisible) {
            if (!currentElement || !currentElement.parentNode) {
                hideResizer();
            }
            else {
                updateSize();
            }
        }
        if (!editor.isDestructed) {
            selector_1.$$('img, table, iframe', editor.editor).forEach(function (elm) {
                if (editor.getMode() === consts.MODE_SOURCE) {
                    return;
                }
                if (!elm.__jodit_resizer_binded &&
                    ((elm.tagName === 'IFRAME' &&
                        editor.options.useIframeResizer) ||
                        (elm.tagName === 'IMG' &&
                            editor.options.useImageResizer) ||
                        (elm.tagName === 'TABLE' &&
                            editor.options.useTableResizer))) {
                    elm.__jodit_resizer_binded = true;
                    bind(elm);
                }
            });
        }
    }, editor.defaultTimeout));
}
exports.resizer = resizer;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
var constants_1 = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
var icon_1 = __webpack_require__(5);
var Plugin_1 = __webpack_require__(6);
var string_1 = __webpack_require__(8);
Config_1.Config.prototype.useSearch = true;
var search = (function (_super) {
    tslib_1.__extends(search, _super);
    function search() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = "<div class=\"jodit_search\">\n\t\t\t<div class=\"jodit_search_box\">\n\t\t\t\t<div class=\"jodit_search_inputs\">\n\t\t\t\t\t<input tabindex=\"0\" class=\"jodit_search-query\" placeholder=\"" + _this.jodit.i18n('Search for') + "\" type=\"text\"/>\n\t\t\t\t\t<input tabindex=\"0\" class=\"jodit_search-replace\" placeholder=\"" + _this.jodit.i18n('Replace with') + "\" type=\"text\"/>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"jodit_search_counts\">\n\t\t\t\t\t<span>0/0</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"jodit_search_buttons\">\n\t\t\t\t\t<button tabindex=\"0\" type=\"button\" class=\"jodit_search_buttons-next\">" + icon_1.ToolbarIcon.getIcon('angle-down') + "</button>\n\t\t\t\t\t<button tabindex=\"0\" type=\"button\" class=\"jodit_search_buttons-prev\">" + icon_1.ToolbarIcon.getIcon('angle-up') + "</button>\n\t\t\t\t\t<button tabindex=\"0\" type=\"button\" class=\"jodit_search_buttons-cancel\">" + icon_1.ToolbarIcon.getIcon('cancel') + "</button>\n\t\t\t\t\t<button tabindex=\"0\" type=\"button\" class=\"jodit_search_buttons-replace\">" + _this.jodit.i18n('Replace') + "</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>";
        _this.isOpened = false;
        _this.selInfo = null;
        _this.current = false;
        _this.eachMap = function (node, callback, next) {
            Dom_1.Dom.findWithCurrent(node, function (child) {
                return !!child && callback(child);
            }, _this.jodit.editor, next ? 'nextSibling' : 'previousSibling', next ? 'firstChild' : 'lastChild');
        };
        _this.updateCounters = function () {
            if (!_this.isOpened) {
                return;
            }
            _this.counterBox.style.display = _this.queryInput.value.length
                ? 'inline-block'
                : 'none';
            var range = _this.jodit.selection.range, counts = _this.calcCounts(_this.queryInput.value, range);
            _this.counterBox.textContent = counts.join('/');
        };
        _this.calcCounts = function (query, current) {
            if (current === void 0) { current = false; }
            var bounds = [];
            var currentIndex = 0, count = 0, bound = false, start = _this.jodit.editor.firstChild;
            while (start && query.length) {
                bound = _this.find(start, query, true, 0, bound || _this.jodit.editorDocument.createRange());
                if (bound) {
                    if (_this.boundAlreadyWas(bound, bounds)) {
                        break;
                    }
                    bounds.push(bound);
                    start = bound.startContainer;
                    count += 1;
                    if (current && _this.boundAlreadyWas(current, [bound])) {
                        currentIndex = count;
                    }
                }
                else {
                    start = null;
                }
            }
            return [currentIndex, count];
        };
        _this.findAndReplace = function (start, query) {
            var range = _this.jodit.selection.range, bound = _this.find(start, query, true, 0, range);
            if (bound && bound.startContainer && bound.endContainer) {
                var rng = _this.jodit.editorDocument.createRange();
                try {
                    if (bound && bound.startContainer && bound.endContainer) {
                        rng.setStart(bound.startContainer, bound.startOffset);
                        rng.setEnd(bound.endContainer, bound.endOffset);
                        rng.deleteContents();
                        var textNode = _this.jodit.create.inside.text(_this.replaceInput.value);
                        rng.insertNode(textNode);
                        _this.jodit.selection.select(textNode);
                        _this.tryScrollToElement(textNode);
                    }
                }
                catch (_a) { }
                return true;
            }
            return false;
        };
        _this.findAndSelect = function (start, query, next) {
            var range = _this.jodit.selection.range, bound = _this.find(start, query, next, 0, range);
            if (bound && bound.startContainer && bound.endContainer) {
                var rng = _this.jodit.editorDocument.createRange();
                try {
                    rng.setStart(bound.startContainer, bound.startOffset);
                    rng.setEnd(bound.endContainer, bound.endOffset);
                    _this.jodit.selection.selectRange(rng);
                }
                catch (e) { }
                _this.tryScrollToElement(bound.startContainer);
                _this.current = bound.startContainer;
                _this.updateCounters();
                return true;
            }
            return false;
        };
        _this.find = function (start, query, next, deep, range) {
            if (start && query.length) {
                var sentence_1 = '', bound_1 = {
                    startContainer: null,
                    startOffset: null,
                    endContainer: null,
                    endOffset: null
                };
                _this.eachMap(start, function (elm) {
                    if (Dom_1.Dom.isText(elm) &&
                        elm.nodeValue !== null &&
                        elm.nodeValue.length) {
                        var value = elm.nodeValue;
                        if (!next && elm === range.startContainer) {
                            value = !deep
                                ? value.substr(0, range.startOffset)
                                : value.substr(range.endOffset);
                        }
                        else if (next && elm === range.endContainer) {
                            value = !deep
                                ? value.substr(range.endOffset)
                                : value.substr(0, range.startOffset);
                        }
                        var tmpSentence = next
                            ? sentence_1 + value
                            : value + sentence_1;
                        var part = search.findSomePartOfString(query, tmpSentence, next);
                        if (part !== false) {
                            var currentPart = search.findSomePartOfString(query, value, next);
                            if (currentPart === true) {
                                currentPart = string_1.trim(query);
                            }
                            else if (currentPart === false) {
                                currentPart = search.findSomePartOfString(value, query, next);
                                if (currentPart === true) {
                                    currentPart = string_1.trim(value);
                                }
                            }
                            var currentPartIndex = search.getSomePartOfStringIndex(query, value, next) || 0;
                            if (((next && !deep) || (!next && deep)) &&
                                elm.nodeValue.length - value.length > 0) {
                                currentPartIndex +=
                                    elm.nodeValue.length - value.length;
                            }
                            if (bound_1.startContainer === null) {
                                bound_1.startContainer = elm;
                                bound_1.startOffset = currentPartIndex;
                            }
                            if (part !== true) {
                                sentence_1 = tmpSentence;
                            }
                            else {
                                bound_1.endContainer = elm;
                                bound_1.endOffset = currentPartIndex;
                                bound_1.endOffset += currentPart.length;
                                return true;
                            }
                        }
                        else {
                            sentence_1 = '';
                            bound_1 = {
                                startContainer: null,
                                startOffset: null,
                                endContainer: null,
                                endOffset: null
                            };
                        }
                    }
                    else if (Dom_1.Dom.isBlock(elm, _this.jodit.editorWindow) &&
                        sentence_1 !== '') {
                        sentence_1 = next ? sentence_1 + ' ' : ' ' + sentence_1;
                    }
                    return false;
                }, next);
                if (bound_1.startContainer && bound_1.endContainer) {
                    return bound_1;
                }
                if (!deep) {
                    _this.current = next
                        ? _this.jodit.editor.firstChild
                        : _this.jodit.editor.lastChild;
                    return _this.find(_this.current, query, next, deep + 1, range);
                }
            }
            return false;
        };
        _this.open = function (searchAndReplace) {
            if (searchAndReplace === void 0) { searchAndReplace = false; }
            if (!_this.isOpened) {
                _this.searchBox.classList.add('jodit_search-active');
                _this.isOpened = true;
            }
            _this.jodit.events.fire('hidePopup');
            _this.searchBox.classList.toggle('jodit_search-and-replace', searchAndReplace);
            _this.current = _this.jodit.selection.current();
            _this.selInfo = _this.jodit.selection.save();
            var selStr = (_this.jodit.selection.sel || '').toString();
            if (selStr) {
                _this.queryInput.value = selStr;
            }
            _this.updateCounters();
            if (selStr) {
                _this.queryInput.select();
            }
            else {
                _this.queryInput.focus();
            }
        };
        _this.close = function () {
            if (!_this.isOpened) {
                return;
            }
            if (_this.selInfo) {
                _this.jodit.selection.restore(_this.selInfo);
                _this.selInfo = null;
            }
            _this.searchBox.classList.remove('jodit_search-active');
            _this.isOpened = false;
        };
        return _this;
    }
    search.getSomePartOfStringIndex = function (needle, haystack, start) {
        if (start === void 0) { start = true; }
        return this.findSomePartOfString(needle, haystack, start, true);
    };
    search.findSomePartOfString = function (needle, haystack, start, getIndex) {
        if (start === void 0) { start = true; }
        if (getIndex === void 0) { getIndex = false; }
        needle = string_1.trim(needle.toLowerCase().replace(consts.SPACE_REG_EXP, ' '));
        haystack = haystack.toLowerCase();
        var i = start ? 0 : haystack.length - 1, needleStart = start ? 0 : needle.length - 1, tmpEqualLength = 0, startAtIndex = null;
        var inc = start ? 1 : -1, tmp = [];
        for (; haystack[i] !== undefined; i += inc) {
            var some = needle[needleStart] === haystack[i];
            if (some ||
                (startAtIndex !== null &&
                    consts.SPACE_REG_EXP.test(haystack[i]))) {
                if (startAtIndex === null || !start) {
                    startAtIndex = i;
                }
                tmp.push(haystack[i]);
                if (some) {
                    tmpEqualLength += 1;
                    needleStart += inc;
                }
            }
            else {
                startAtIndex = null;
                tmp.length = 0;
                tmpEqualLength = 0;
                needleStart = start ? 0 : needle.length - 1;
            }
            if (tmpEqualLength === needle.length) {
                return getIndex ? startAtIndex : true;
            }
        }
        if (getIndex) {
            return (startAtIndex !== null && startAtIndex !== void 0 ? startAtIndex : false);
        }
        if (tmp.length) {
            return start ? tmp.join('') : tmp.reverse().join('');
        }
        return false;
    };
    search.prototype.boundAlreadyWas = function (current, bounds) {
        return bounds.some(function (bound) {
            return (bound.startContainer === current.startContainer &&
                bound.endContainer === current.endContainer &&
                bound.startOffset === current.startOffset &&
                bound.endOffset === current.endOffset);
        }, false);
    };
    search.prototype.tryScrollToElement = function (startContainer) {
        var parentBox = Dom_1.Dom.closest(startContainer, Dom_1.Dom.isElement, this.jodit.editor);
        if (!parentBox) {
            parentBox = Dom_1.Dom.prev(startContainer, Dom_1.Dom.isElement, this.jodit.editor);
        }
        parentBox &&
            parentBox !== this.jodit.editor &&
            parentBox.scrollIntoView();
    };
    search.prototype.afterInit = function (editor) {
        var _this = this;
        if (editor.options.useSearch) {
            var self_1 = this;
            self_1.searchBox = editor.create.fromHTML(self_1.template);
            var qs = self_1.searchBox.querySelector.bind(self_1.searchBox);
            self_1.queryInput = qs('input.jodit_search-query');
            self_1.replaceInput = qs('input.jodit_search-replace');
            self_1.closeButton = qs('.jodit_search_buttons-cancel');
            self_1.nextButton = qs('.jodit_search_buttons-next');
            self_1.prevButton = qs('.jodit_search_buttons-prev');
            self_1.replaceButton = qs('.jodit_search_buttons-replace');
            self_1.counterBox = qs('.jodit_search_counts span');
            var onInit = function () {
                editor.workplace.appendChild(_this.searchBox);
                editor.events
                    .off(_this.jodit.container, 'keydown.search')
                    .on(_this.jodit.container, 'keydown.search', function (e) {
                    if (editor.getRealMode() !== constants_1.MODE_WYSIWYG) {
                        return;
                    }
                    switch (e.which) {
                        case consts.KEY_ESC:
                            _this.close();
                            break;
                        case consts.KEY_F3:
                            if (self_1.queryInput.value) {
                                editor.events.fire(!e.shiftKey
                                    ? 'searchNext'
                                    : 'searchPrevious');
                                e.preventDefault();
                            }
                            break;
                    }
                });
            };
            onInit();
            editor.events
                .on('changePlace', onInit)
                .on(self_1.closeButton, 'click', this.close)
                .on(self_1.queryInput, 'mousedown', function () {
                if (editor.selection.isFocused()) {
                    editor.selection.removeMarkers();
                    self_1.selInfo = editor.selection.save();
                }
            })
                .on(self_1.replaceButton, 'click', function (e) {
                self_1.findAndReplace(editor.selection.current() || editor.editor.firstChild, self_1.queryInput.value);
                _this.updateCounters();
                e.preventDefault();
                e.stopImmediatePropagation();
            })
                .on([self_1.nextButton, self_1.prevButton], 'click', function (e) {
                editor.events.fire(self_1.nextButton === this
                    ? 'searchNext'
                    : 'searchPrevious');
                e.preventDefault();
                e.stopImmediatePropagation();
            })
                .on(this.queryInput, 'keydown', this.jodit.async.debounce(function (e) {
                switch (e.which) {
                    case consts.KEY_ENTER:
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        if (editor.events.fire('searchNext')) {
                            _this.close();
                        }
                        break;
                    default:
                        _this.updateCounters();
                        break;
                }
            }, this.jodit.defaultTimeout))
                .on('beforeSetMode.search', function () {
                _this.close();
            })
                .on('keydown.search mousedown.search', function () {
                if (_this.selInfo) {
                    editor.selection.removeMarkers();
                    _this.selInfo = null;
                }
                if (_this.isOpened) {
                    _this.current = _this.jodit.selection.current();
                    _this.updateCounters();
                }
            })
                .on('searchNext.search searchPrevious.search', function () {
                return self_1.findAndSelect(editor.selection.current() || editor.editor.firstChild, self_1.queryInput.value, editor.events.current[editor.events.current.length - 1] === 'searchNext');
            })
                .on('search.search', function (value, next) {
                if (next === void 0) { next = true; }
                editor.execCommand('search', value, next);
            });
            editor.registerCommand('search', {
                exec: function (command, value, next) {
                    if (next === void 0) { next = true; }
                    self_1.findAndSelect(editor.selection.current() || editor.editor.firstChild, value || '', next);
                    return false;
                }
            });
            editor.registerCommand('openSearchDialog', {
                exec: function () {
                    self_1.open();
                    return false;
                },
                hotkeys: ['ctrl+f', 'cmd+f']
            });
            editor.registerCommand('openReplaceDialog', {
                exec: function () {
                    if (!editor.options.readonly) {
                        self_1.open(true);
                    }
                    return false;
                },
                hotkeys: ['ctrl+h', 'cmd+h']
            });
        }
    };
    search.prototype.beforeDestruct = function (jodit) {
        var _a;
        Dom_1.Dom.safeRemove(this.searchBox);
        (_a = jodit.events) === null || _a === void 0 ? void 0 : _a.off('.search');
    };
    return search;
}(Plugin_1.Plugin));
exports.search = search;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var css_1 = __webpack_require__(11);
Config_1.Config.prototype.allowResizeX = false;
Config_1.Config.prototype.allowResizeY = true;
function size(editor) {
    var setHeight = function (height) {
        css_1.css(editor.container, 'height', height);
        if (editor.options.saveHeightInStorage) {
            editor.storage.set('height', height);
        }
    };
    var setWidth = function (width) {
        return css_1.css(editor.container, 'width', width);
    };
    var setHeightWorkPlace = function (height) {
        return css_1.css(editor.workplace, 'height', height);
    };
    if (editor.options.height !== 'auto' &&
        (editor.options.allowResizeX || editor.options.allowResizeY)) {
        var handle_1 = editor.create.div('jodit_editor_resize', '<a tabindex="-1" href="javascript:void(0)"></a>'), start_1 = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        var isResized_1 = false;
        editor.events
            .on(handle_1, 'mousedown touchstart', function (e) {
            isResized_1 = true;
            start_1.x = e.clientX;
            start_1.y = e.clientY;
            start_1.w = editor.container.offsetWidth;
            start_1.h = editor.container.offsetHeight;
            editor.lock();
            e.preventDefault();
        })
            .on(editor.ownerWindow, 'mousemove touchmove', editor.async.throttle(function (e) {
            if (isResized_1) {
                if (editor.options.allowResizeY) {
                    setHeight(start_1.h + e.clientY - start_1.y);
                }
                if (editor.options.allowResizeX) {
                    setWidth(start_1.w + e.clientX - start_1.x);
                }
                resizeWorkspaceImd();
                editor.events.fire('resize');
            }
        }, editor.defaultTimeout / 10))
            .on(editor.ownerWindow, 'mouseup touchsend', function () {
            if (isResized_1) {
                isResized_1 = false;
                editor.unlock();
            }
        })
            .on('afterInit', function () {
            editor.container.appendChild(handle_1);
        })
            .on('toggleFullSize', function (fullsize) {
            handle_1.style.display = fullsize ? 'none' : 'block';
        });
    }
    var getNotWorkHeight = function () {
        return (editor.options.toolbar ? editor.toolbar.container.offsetHeight : 0) +
            (editor.statusbar ? editor.statusbar.getHeight() : 0);
    };
    var calcMinHeightWorkspace = function () {
        if (!editor.container || !editor.container.parentNode) {
            return;
        }
        var minHeight = css_1.css(editor.container, 'minHeight') - getNotWorkHeight();
        [editor.workplace, editor.iframe, editor.editor].map(function (elm) {
            var minHeightD = elm === editor.editor ? minHeight - 2 : minHeight;
            elm && css_1.css(elm, 'minHeight', minHeightD);
            editor.events.fire('setMinHeight', minHeightD);
        });
    };
    var resizeWorkspaceImd = function () {
        if (!editor ||
            editor.isDestructed ||
            !editor.options ||
            editor.options.inline) {
            return;
        }
        calcMinHeightWorkspace();
        if (editor.container &&
            (editor.options.height !== 'auto' || editor.isFullSize())) {
            setHeightWorkPlace(editor.container.offsetHeight - getNotWorkHeight());
        }
    };
    var resizeWorkspace = editor.async.debounce(resizeWorkspaceImd, editor.defaultTimeout);
    editor.events
        .on('toggleFullSize', function (fullsize) {
        if (!fullsize && editor.options.height === 'auto') {
            setHeightWorkPlace('auto');
            calcMinHeightWorkspace();
        }
    })
        .on('afterInit changePlace', function () {
        if (!editor.options.inline) {
            css_1.css(editor.editor, {
                minHeight: '100%'
            });
            css_1.css(editor.container, {
                minHeight: editor.options.minHeight,
                minWidth: editor.options.minWidth,
                maxWidth: editor.options.maxWidth
            });
        }
        var height = editor.options.height;
        if (editor.options.saveHeightInStorage && height !== 'auto') {
            var localHeight = editor.storage.get('height');
            if (localHeight) {
                height = localHeight;
            }
        }
        if (!editor.options.inline) {
            setHeight(height);
            setWidth(editor.options.width);
        }
        resizeWorkspaceImd();
    }, undefined, undefined, true)
        .on(window, 'load', resizeWorkspace)
        .on('afterInit resize updateToolbar scroll afterResize', resizeWorkspace);
}
exports.size = size;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
__webpack_require__(184);
tslib_1.__exportStar(__webpack_require__(185), exports);


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
Config_1.Config.prototype.beautifyHTML = true;
Config_1.Config.prototype.useAceEditor = true;
Config_1.Config.prototype.sourceEditor = 'ace';
Config_1.Config.prototype.sourceEditorNativeOptions = {
    showGutter: true,
    theme: 'ace/theme/idle_fingers',
    mode: 'ace/mode/html',
    wrap: true,
    highlightActiveLine: true
};
Config_1.Config.prototype.sourceEditorCDNUrlsJS = [
    'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.7/ace.js'
];
Config_1.Config.prototype.beautifyHTMLCDNUrlsJS = [
    'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.2/beautify.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.10.2/beautify-html.min.js',
];
Config_1.Config.prototype.controls.source = {
    mode: consts.MODE_SPLIT,
    exec: function (editor) {
        editor.toggleMode();
    },
    isActive: function (editor) {
        return editor.getRealMode() === consts.MODE_SOURCE;
    },
    tooltip: 'Change mode'
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var consts = __webpack_require__(2);
var constants_1 = __webpack_require__(2);
var Plugin_1 = __webpack_require__(6);
var Dom_1 = __webpack_require__(1);
var helpers_1 = __webpack_require__(3);
var factory_1 = __webpack_require__(186);
var source = (function (_super) {
    tslib_1.__extends(source, _super);
    function source() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__lock = false;
        _this.__oldMirrorValue = '';
        _this.tempMarkerStart = '{start-jodit-selection}';
        _this.tempMarkerStartReg = /{start-jodit-selection}/g;
        _this.tempMarkerEnd = '{end-jodit-selection}';
        _this.tempMarkerEndReg = /{end-jodit-selection}/g;
        _this.selInfo = [];
        _this.insertHTML = function (html) {
            _this.sourceEditor.insertRaw(html);
            _this.toWYSIWYG();
        };
        _this.fromWYSIWYG = function (force) {
            if (force === void 0) { force = false; }
            if (!_this.__lock || force === true) {
                _this.__lock = true;
                var new_value = _this.jodit.getEditorValue(false);
                if (new_value !== _this.getMirrorValue()) {
                    _this.setMirrorValue(new_value);
                }
                _this.__lock = false;
            }
        };
        _this.toWYSIWYG = function () {
            if (_this.__lock) {
                return;
            }
            var value = _this.getMirrorValue();
            if (value === _this.__oldMirrorValue) {
                return;
            }
            _this.__lock = true;
            _this.jodit.setEditorValue(value);
            _this.__lock = false;
            _this.__oldMirrorValue = value;
        };
        _this.getNormalPosition = function (pos, str) {
            var start = pos;
            while (start > 0) {
                start--;
                if (str[start] === '<' &&
                    str[start + 1] !== undefined &&
                    str[start + 1].match(/[\w\/]+/i)) {
                    return start;
                }
                if (str[start] === '>') {
                    return pos;
                }
            }
            return pos;
        };
        _this.__clear = function (str) {
            return str.replace(consts.INVISIBLE_SPACE_REG_EXP, '');
        };
        _this.selectAll = function () {
            _this.sourceEditor.selectAll();
        };
        _this.onSelectAll = function (command) {
            if (command.toLowerCase() === 'selectall' &&
                _this.jodit.getRealMode() === constants_1.MODE_SOURCE) {
                _this.selectAll();
                return false;
            }
        };
        _this.getSelectionStart = function () {
            return _this.sourceEditor.getSelectionStart();
        };
        _this.getSelectionEnd = function () {
            return _this.sourceEditor.getSelectionEnd();
        };
        _this.saveSelection = function () {
            if (_this.jodit.getRealMode() === consts.MODE_WYSIWYG) {
                _this.selInfo = _this.jodit.selection.save() || [];
                _this.jodit.setEditorValue();
                _this.fromWYSIWYG(true);
            }
            else {
                _this.selInfo.length = 0;
                var value = _this.getMirrorValue();
                if (_this.getSelectionStart() === _this.getSelectionEnd()) {
                    var marker = _this.jodit.selection.marker(true);
                    _this.selInfo[0] = {
                        startId: marker.id,
                        collapsed: true,
                        startMarker: marker.outerHTML
                    };
                    var selectionStart = _this.getNormalPosition(_this.getSelectionStart(), _this.getMirrorValue());
                    _this.setMirrorValue(value.substr(0, selectionStart) +
                        _this.__clear(_this.selInfo[0].startMarker) +
                        value.substr(selectionStart));
                }
                else {
                    var markerStart = _this.jodit.selection.marker(true);
                    var markerEnd = _this.jodit.selection.marker(false);
                    _this.selInfo[0] = {
                        startId: markerStart.id,
                        endId: markerEnd.id,
                        collapsed: false,
                        startMarker: _this.__clear(markerStart.outerHTML),
                        endMarker: _this.__clear(markerEnd.outerHTML)
                    };
                    var selectionStart = _this.getNormalPosition(_this.getSelectionStart(), value);
                    var selectionEnd = _this.getNormalPosition(_this.getSelectionEnd(), value);
                    _this.setMirrorValue(value.substr(0, selectionStart) +
                        _this.selInfo[0].startMarker +
                        value.substr(selectionStart, selectionEnd - selectionStart) +
                        _this.selInfo[0].endMarker +
                        value.substr(selectionEnd));
                }
                _this.toWYSIWYG();
            }
        };
        _this.restoreSelection = function () {
            if (!_this.selInfo.length) {
                return;
            }
            if (_this.jodit.getRealMode() === consts.MODE_WYSIWYG) {
                _this.__lock = true;
                _this.jodit.selection.restore(_this.selInfo);
                _this.__lock = false;
                return;
            }
            var value = _this.getMirrorValue();
            var selectionStart = 0, selectionEnd = 0;
            try {
                if (_this.selInfo[0].startMarker) {
                    value = value.replace(/<span[^>]+data-jodit_selection_marker="start"[^>]*>[<>]*?<\/span>/gim, _this.tempMarkerStart);
                }
                if (_this.selInfo[0].endMarker) {
                    value = value.replace(/<span[^>]+data-jodit_selection_marker="end"[^>]*>[<>]*?<\/span>/gim, _this.tempMarkerEnd);
                }
                if (_this.jodit.options.beautifyHTML) {
                    var html = _this.jodit.events.fire('beautifyHTML', value);
                    if (helpers_1.isString(html)) {
                        value = html;
                    }
                }
                selectionStart = value.indexOf(_this.tempMarkerStart);
                selectionEnd = selectionStart;
                value = value.replace(_this.tempMarkerStartReg, '');
                if (!_this.selInfo[0].collapsed || selectionStart === -1) {
                    selectionEnd = value.indexOf(_this.tempMarkerEnd);
                    if (selectionStart === -1) {
                        selectionStart = selectionEnd;
                    }
                }
                value = value.replace(_this.tempMarkerEndReg, '');
            }
            finally {
                value = value
                    .replace(_this.tempMarkerEndReg, '')
                    .replace(_this.tempMarkerStartReg, '');
            }
            _this.setMirrorValue(value);
            _this.setMirrorSelectionRange(selectionStart, selectionEnd);
            _this.toWYSIWYG();
            _this.setFocusToMirror();
        };
        _this.setMirrorSelectionRange = function (start, end) {
            _this.sourceEditor.setSelectionRange(start, end);
        };
        _this.onReadonlyReact = function () {
            _this.sourceEditor.setReadOnly(_this.jodit.options.readonly);
        };
        return _this;
    }
    source.prototype.getMirrorValue = function () {
        return this.sourceEditor.getValue();
    };
    source.prototype.setMirrorValue = function (value) {
        this.sourceEditor.setValue(value);
    };
    source.prototype.setFocusToMirror = function () {
        this.sourceEditor.focus();
    };
    source.prototype.initSourceEditor = function (editor) {
        var _this = this;
        if (editor.options.sourceEditor !== 'area') {
            var sourceEditor_1 = factory_1.createSourceEditor(editor.options.sourceEditor, editor, this.mirrorContainer, this.toWYSIWYG, this.fromWYSIWYG);
            sourceEditor_1.onReadyAlways(function () {
                var _a, _b;
                (_a = _this.sourceEditor) === null || _a === void 0 ? void 0 : _a.destruct();
                _this.sourceEditor = sourceEditor_1;
                (_b = editor.events) === null || _b === void 0 ? void 0 : _b.fire('sourceEditorReady', editor);
            });
        }
        else {
            this.sourceEditor.onReadyAlways(function () {
                var _a;
                (_a = editor.events) === null || _a === void 0 ? void 0 : _a.fire('sourceEditorReady', editor);
            });
        }
    };
    source.prototype.afterInit = function (editor) {
        var _this = this;
        this.mirrorContainer = editor.create.div('jodit_source');
        editor.workplace.appendChild(this.mirrorContainer);
        editor.events.on('afterAddPlace changePlace afterInit', function () {
            editor.workplace.appendChild(_this.mirrorContainer);
        });
        this.sourceEditor = factory_1.createSourceEditor('area', editor, this.mirrorContainer, this.toWYSIWYG, this.fromWYSIWYG);
        var addListeners = function () {
            editor.events
                .off('beforeSetMode.source afterSetMode.source')
                .on('beforeSetMode.source', _this.saveSelection)
                .on('afterSetMode.source', _this.restoreSelection);
        };
        addListeners();
        this.onReadonlyReact();
        editor.events
            .on('insertHTML.source', function (html) {
            if (!editor.options.readonly && !_this.jodit.isEditorMode()) {
                _this.insertHTML(html);
                return false;
            }
        })
            .on('readonly.source', this.onReadonlyReact)
            .on('placeholder.source', function (text) {
            _this.sourceEditor.setPlaceHolder(text);
        })
            .on('beforeCommand.source', this.onSelectAll)
            .on('change.source', this.fromWYSIWYG);
        editor.events.on('beautifyHTML', function (html) { return html; });
        if (editor.options.beautifyHTML) {
            var addEventListener_1 = function () {
                var _a, _b;
                var html_beautify = editor.ownerWindow.html_beautify;
                if (html_beautify && !editor.isInDestruct) {
                    (_b = (_a = editor.events) === null || _a === void 0 ? void 0 : _a.off('beautifyHTML')) === null || _b === void 0 ? void 0 : _b.on('beautifyHTML', function (html) { return html_beautify(html); });
                    return true;
                }
                return false;
            };
            if (!addEventListener_1()) {
                helpers_1.loadNext(editor, editor.options.beautifyHTMLCDNUrlsJS).then(addEventListener_1);
            }
        }
        this.fromWYSIWYG();
        this.initSourceEditor(editor);
    };
    source.prototype.beforeDestruct = function (jodit) {
        if (this.sourceEditor) {
            this.sourceEditor.destruct();
            delete this.sourceEditor;
        }
        Dom_1.Dom.safeRemove(this.mirrorContainer);
    };
    return source;
}(Plugin_1.Plugin));
exports.source = source;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var engines_1 = __webpack_require__(187);
function createSourceEditor(type, editor, container, toWYSIWYG, fromWYSIWYG) {
    var sourceEditor;
    switch (type) {
        case 'ace':
            sourceEditor = new engines_1.AceEditor(editor, container, toWYSIWYG, fromWYSIWYG);
            break;
        default:
            sourceEditor = new engines_1.TextAreaEditor(editor, container, toWYSIWYG, fromWYSIWYG);
    }
    sourceEditor.init(editor);
    sourceEditor.onReadyAlways(function () {
        sourceEditor.setReadOnly(editor.options.readonly);
    });
    return sourceEditor;
}
exports.createSourceEditor = createSourceEditor;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(188), exports);
tslib_1.__exportStar(__webpack_require__(189), exports);


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(3);
var modules_1 = __webpack_require__(28);
var SourceEditor_1 = __webpack_require__(70);
var TextAreaEditor = (function (_super) {
    tslib_1.__extends(TextAreaEditor, _super);
    function TextAreaEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autosize = _this.jodit.async.debounce(function () {
            _this.instance.style.height = 'auto';
            _this.instance.style.height = _this.instance.scrollHeight + 'px';
        }, _this.jodit.defaultTimeout);
        return _this;
    }
    TextAreaEditor.prototype.init = function (editor) {
        var _this = this;
        this.instance = editor.create.element('textarea', {
            class: 'jodit_source_mirror'
        });
        this.container.appendChild(this.instance);
        editor.events
            .on(this.instance, 'mousedown keydown touchstart input', editor.async.debounce(this.toWYSIWYG, editor.defaultTimeout))
            .on('setMinHeight.source', function (minHeightD) {
            helpers_1.css(_this.instance, 'minHeight', minHeightD);
        })
            .on(this.instance, 'change keydown mousedown touchstart input', this.autosize)
            .on('afterSetMode.source', this.autosize)
            .on(this.instance, 'mousedown focus', function (e) {
            editor.events.fire(e.type, e);
        });
        this.autosize();
        this.onReady();
    };
    TextAreaEditor.prototype.destruct = function () {
        modules_1.Dom.safeRemove(this.instance);
    };
    TextAreaEditor.prototype.getValue = function () {
        return this.instance.value;
    };
    TextAreaEditor.prototype.setValue = function (raw) {
        this.instance.value = raw;
    };
    TextAreaEditor.prototype.insertRaw = function (raw) {
        var value = this.getValue();
        if (this.getSelectionStart() >= 0) {
            var startPos = this.getSelectionStart(), endPos = this.getSelectionEnd();
            this.setValue(value.substring(0, startPos) +
                raw +
                value.substring(endPos, value.length));
        }
        else {
            this.setValue(value + raw);
        }
    };
    TextAreaEditor.prototype.getSelectionStart = function () {
        return this.instance.selectionStart;
    };
    TextAreaEditor.prototype.getSelectionEnd = function () {
        return this.instance.selectionEnd;
    };
    TextAreaEditor.prototype.setSelectionRange = function (start, end) {
        this.instance.setSelectionRange(start, end);
    };
    TextAreaEditor.prototype.focus = function () {
        this.instance.focus();
    };
    TextAreaEditor.prototype.setPlaceHolder = function (title) {
        this.instance.setAttribute('placeholder', title);
    };
    TextAreaEditor.prototype.setReadOnly = function (isReadOnly) {
        if (isReadOnly) {
            this.instance.setAttribute('readonly', 'true');
        }
        else {
            this.instance.removeAttribute('readonly');
        }
    };
    TextAreaEditor.prototype.selectAll = function () {
        this.instance.select();
    };
    return TextAreaEditor;
}(SourceEditor_1.SourceEditor));
exports.TextAreaEditor = TextAreaEditor;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var consts = __webpack_require__(2);
var helpers_1 = __webpack_require__(3);
var SourceEditor_1 = __webpack_require__(70);
var AceEditor = (function (_super) {
    tslib_1.__extends(AceEditor, _super);
    function AceEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.className = 'jodit_ace_editor';
        _this.proxyOnFocus = function (e) {
            _this.jodit.events.fire('focus', e);
        };
        _this.proxyOnMouseDown = function (e) {
            _this.jodit.events.fire('mousedown', e);
        };
        return _this;
    }
    AceEditor.prototype.aceExists = function () {
        return this.jodit.ownerWindow.ace !== undefined;
    };
    Object.defineProperty(AceEditor.prototype, "undoManager", {
        get: function () {
            return this.instance
                ? this.instance.getSession().getUndoManager()
                : null;
        },
        enumerable: true,
        configurable: true
    });
    AceEditor.prototype.updateButtons = function () {
        if (this.undoManager &&
            this.jodit.getRealMode() === consts.MODE_SOURCE) {
            this.jodit.events.fire('canRedo', this.undoManager.hasRedo());
            this.jodit.events.fire('canUndo', this.undoManager.hasUndo());
        }
    };
    AceEditor.prototype.getLastColumnIndex = function (row) {
        return this.instance.session.getLine(row).length;
    };
    AceEditor.prototype.getLastColumnIndices = function () {
        var rows = this.instance.session.getLength();
        var lastColumnIndices = [];
        var lastColIndex = 0;
        for (var i = 0; i < rows; i++) {
            lastColIndex += this.getLastColumnIndex(i);
            if (i > 0) {
                lastColIndex += 1;
            }
            lastColumnIndices[i] = lastColIndex;
        }
        return lastColumnIndices;
    };
    AceEditor.prototype.getRowColumnIndices = function (characterIndex) {
        var lastColumnIndices = this.getLastColumnIndices();
        if (characterIndex <= lastColumnIndices[0]) {
            return { row: 0, column: characterIndex };
        }
        var row = 1;
        for (var i = 1; i < lastColumnIndices.length; i++) {
            if (characterIndex > lastColumnIndices[i]) {
                row = i + 1;
            }
        }
        var column = characterIndex - lastColumnIndices[row - 1] - 1;
        return { row: row, column: column };
    };
    AceEditor.prototype.setSelectionRangeIndices = function (start, end) {
        var startRowColumn = this.getRowColumnIndices(start);
        var endRowColumn = this.getRowColumnIndices(end);
        this.instance.getSelection().setSelectionRange({
            start: startRowColumn,
            end: endRowColumn
        });
    };
    AceEditor.prototype.getIndexByRowColumn = function (row, column) {
        var lastColumnIndices = this.getLastColumnIndices();
        return lastColumnIndices[row] - this.getLastColumnIndex(row) + column;
    };
    AceEditor.prototype.init = function (editor) {
        var _this = this;
        var tryInitAceEditor = function () {
            if (_this.instance !== undefined || !_this.aceExists()) {
                return;
            }
            var fakeMirror = _this.jodit.create.div('jodit_source_mirror-fake');
            _this.container.appendChild(fakeMirror);
            _this.instance = editor.ownerWindow
                .ace.edit(fakeMirror);
            _this.instance.setTheme(editor.options.sourceEditorNativeOptions.theme);
            _this.instance.renderer.setShowGutter(editor.options.sourceEditorNativeOptions.showGutter);
            _this.instance
                .getSession()
                .setMode(editor.options.sourceEditorNativeOptions.mode);
            _this.instance.setHighlightActiveLine(editor.options.sourceEditorNativeOptions.highlightActiveLine);
            _this.instance.getSession().setUseWrapMode(true);
            _this.instance.setOption('indentedSoftWrap', false);
            _this.instance.setOption('wrap', editor.options.sourceEditorNativeOptions.wrap);
            _this.instance.getSession().setUseWorker(false);
            _this.instance.$blockScrolling = Infinity;
            _this.instance.setOptions({
                maxLines: Infinity
            });
            _this.instance.on('change', _this.toWYSIWYG);
            _this.instance.on('focus', _this.proxyOnFocus);
            _this.instance.on('mousedown', _this.proxyOnMouseDown);
            if (editor.getRealMode() !== consts.MODE_WYSIWYG) {
                _this.setValue(_this.getValue());
            }
            editor.events
                .on('afterResize', function () {
                _this.instance.resize();
            });
            _this.onReady();
        };
        editor.events
            .on('afterSetMode', function () {
            if (editor.getRealMode() !== consts.MODE_SOURCE &&
                editor.getMode() !== consts.MODE_SPLIT) {
                return;
            }
            _this.fromWYSIWYG();
            tryInitAceEditor();
        })
            .on('beforeCommand', function (command) {
            if (editor.getRealMode() !== consts.MODE_WYSIWYG &&
                (command === 'redo' || command === 'undo') &&
                _this.undoManager) {
                if (_this.undoManager['has' +
                    command.substr(0, 1).toUpperCase() +
                    command.substr(1)]) {
                    _this.instance[command]();
                }
                _this.updateButtons();
                return false;
            }
        });
        tryInitAceEditor();
        if (!this.aceExists()) {
            helpers_1.loadNext(editor, editor.options.sourceEditorCDNUrlsJS).then(function () {
                if (!editor.isInDestruct) {
                    tryInitAceEditor();
                }
            });
        }
    };
    AceEditor.prototype.destruct = function () {
        var _a, _b;
        this.instance.off('change', this.toWYSIWYG);
        this.instance.off('focus', this.proxyOnFocus);
        this.instance.off('mousedown', this.proxyOnMouseDown);
        this.instance.destroy();
        (_b = (_a = this.jodit) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.off('aceInited.source');
    };
    AceEditor.prototype.setValue = function (value) {
        if (this.jodit.options.beautifyHTML) {
            var html = this.jodit.events.fire('beautifyHTML', value);
            if (helpers_1.isString(html)) {
                value = html;
            }
        }
        this.instance.setValue(value);
        this.instance.clearSelection();
        this.updateButtons();
    };
    AceEditor.prototype.getValue = function () {
        return this.instance.getValue();
    };
    AceEditor.prototype.setReadOnly = function (isReadOnly) {
        this.instance.setReadOnly(isReadOnly);
    };
    AceEditor.prototype.focus = function () {
        this.instance.focus();
    };
    AceEditor.prototype.getSelectionStart = function () {
        var range = this.instance.selection.getRange();
        return this.getIndexByRowColumn(range.start.row, range.start.column);
    };
    AceEditor.prototype.getSelectionEnd = function () {
        var range = this.instance.selection.getRange();
        return this.getIndexByRowColumn(range.end.row, range.end.column);
    };
    AceEditor.prototype.selectAll = function () {
        this.instance.selection.selectAll();
    };
    AceEditor.prototype.insertRaw = function (html) {
        var start = this.instance.selection.getCursor(), end = this.instance.session.insert(start, html);
        this.instance.selection.setRange({
            start: start,
            end: end
        }, false);
    };
    AceEditor.prototype.setSelectionRange = function (start, end) {
        this.setSelectionRangeIndices(start, end);
    };
    AceEditor.prototype.setPlaceHolder = function (title) {
    };
    return AceEditor;
}(SourceEditor_1.SourceEditor));
exports.AceEditor = AceEditor;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var Plugin_1 = __webpack_require__(6);
var Dom_1 = __webpack_require__(1);
Config_1.Config.prototype.showCharsCounter = true;
Config_1.Config.prototype.showWordsCounter = true;
var stat = (function (_super) {
    tslib_1.__extends(stat, _super);
    function stat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reInit = function () {
            if (_this.jodit.options.showCharsCounter) {
                _this.jodit.statusbar.append(_this.charCounter, true);
            }
            if (_this.jodit.options.showWordsCounter) {
                _this.jodit.statusbar.append(_this.wordCounter, true);
            }
            _this.jodit.events
                .off('change keyup', _this.calc)
                .on('change keyup', _this.calc);
            _this.calc();
        };
        _this.calc = _this.jodit.async.throttle(function () {
            var text = _this.jodit.text;
            if (_this.jodit.options.showCharsCounter) {
                _this.charCounter.textContent = _this.jodit.i18n('Chars: %d', text.replace(constants_1.SPACE_REG_EXP, '').length);
            }
            if (_this.jodit.options.showWordsCounter) {
                _this.wordCounter.textContent = _this.jodit.i18n('Words: %d', text
                    .replace(constants_1.INVISIBLE_SPACE_REG_EXP, '')
                    .split(constants_1.SPACE_REG_EXP)
                    .filter(function (e) { return e.length; }).length);
            }
        }, _this.jodit.defaultTimeout);
        return _this;
    }
    stat.prototype.afterInit = function () {
        this.charCounter = this.jodit.create.span();
        this.wordCounter = this.jodit.create.span();
        this.jodit.events.on('afterInit changePlace afterAddPlace', this.reInit);
        this.reInit();
    };
    stat.prototype.beforeDestruct = function () {
        Dom_1.Dom.safeRemove(this.charCounter);
        Dom_1.Dom.safeRemove(this.wordCounter);
        this.jodit.events.off('afterInit changePlace afterAddPlace', this.reInit);
        delete this.charCounter;
        delete this.wordCounter;
    };
    return stat;
}(Plugin_1.Plugin));
exports.stat = stat;


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var Plugin_1 = __webpack_require__(6);
var css_1 = __webpack_require__(11);
var size_1 = __webpack_require__(19);
var Dom_1 = __webpack_require__(1);
Config_1.Config.prototype.toolbarSticky = true;
Config_1.Config.prototype.toolbarDisableStickyForMobile = true;
Config_1.Config.prototype.toolbarStickyOffset = 0;
var sticky = (function (_super) {
    tslib_1.__extends(sticky, _super);
    function sticky() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isToolbarSticked = false;
        _this.createDummy = function (toolbar) {
            if (constants_1.IS_IE && !_this.dummyBox) {
                _this.dummyBox = _this.jodit.create.div();
                _this.dummyBox.classList.add('jodit_sticky-dummy_toolbar');
                _this.jodit.container.insertBefore(_this.dummyBox, toolbar);
            }
        };
        _this.addSticky = function (toolbar) {
            if (!_this.isToolbarSticked) {
                _this.createDummy(toolbar);
                _this.jodit.container.classList.add('jodit_sticky');
                _this.isToolbarSticked = true;
            }
            css_1.css(toolbar, {
                top: _this.jodit.options.toolbarStickyOffset,
                width: _this.jodit.container.offsetWidth
            });
            if (constants_1.IS_IE && _this.dummyBox) {
                css_1.css(_this.dummyBox, {
                    height: toolbar.offsetHeight
                });
            }
        };
        _this.removeSticky = function (toolbar) {
            if (_this.isToolbarSticked) {
                css_1.css(toolbar, {
                    width: '',
                    top: ''
                });
                _this.jodit.container.classList.remove('jodit_sticky');
                _this.isToolbarSticked = false;
            }
        };
        return _this;
    }
    sticky.prototype.isMobile = function () {
        return (this.jodit &&
            this.jodit.options &&
            this.jodit.container &&
            this.jodit.options.sizeSM >= this.jodit.container.offsetWidth);
    };
    sticky.prototype.afterInit = function (jodit) {
        var _this = this;
        jodit.events.on(jodit.ownerWindow, 'scroll wheel mousewheel resize', function () {
            var scrollWindowTop = jodit.ownerWindow.pageYOffset ||
                (jodit.ownerDocument.documentElement &&
                    jodit.ownerDocument.documentElement.scrollTop) ||
                0, offsetEditor = size_1.offset(jodit.container, jodit, jodit.ownerDocument, true), doSticky = jodit.getMode() === constants_1.MODE_WYSIWYG &&
                (scrollWindowTop + jodit.options.toolbarStickyOffset >
                    offsetEditor.top &&
                    scrollWindowTop +
                        jodit.options.toolbarStickyOffset <
                        offsetEditor.top + offsetEditor.height) &&
                !(jodit.options.toolbarDisableStickyForMobile &&
                    _this.isMobile());
            if (jodit.options.toolbarSticky && jodit.options.toolbar === true) {
                doSticky
                    ? _this.addSticky(jodit.toolbar.getParentContainer())
                    : _this.removeSticky(jodit.toolbar.getParentContainer());
            }
            jodit.events.fire('toggleSticky', doSticky);
        });
    };
    sticky.prototype.beforeDestruct = function (jodit) {
        this.dummyBox && Dom_1.Dom.safeRemove(this.dummyBox);
    };
    return sticky;
}(Plugin_1.Plugin));
exports.sticky = sticky;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var dialog_1 = __webpack_require__(13);
Config_1.Config.prototype.usePopupForSpecialCharacters = false;
Config_1.Config.prototype.specialCharacters = [
    '!',
    '&quot;',
    '#',
    '$',
    '%',
    '&amp;',
    "'",
    '(',
    ')',
    '*',
    '+',
    '-',
    '.',
    '/',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    ':',
    ';',
    '&lt;',
    '=',
    '&gt;',
    '?',
    '@',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '[',
    ']',
    '^',
    '_',
    '`',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '{',
    '|',
    '}',
    '~',
    '&euro;',
    '&lsquo;',
    '&rsquo;',
    '&ldquo;',
    '&rdquo;',
    '&ndash;',
    '&mdash;',
    '&iexcl;',
    '&cent;',
    '&pound;',
    '&curren;',
    '&yen;',
    '&brvbar;',
    '&sect;',
    '&uml;',
    '&copy;',
    '&ordf;',
    '&laquo;',
    '&raquo;',
    '&not;',
    '&reg;',
    '&macr;',
    '&deg;',
    '&sup2;',
    '&sup3;',
    '&acute;',
    '&micro;',
    '&para;',
    '&middot;',
    '&cedil;',
    '&sup1;',
    '&ordm;',
    '&frac14;',
    '&frac12;',
    '&frac34;',
    '&iquest;',
    '&Agrave;',
    '&Aacute;',
    '&Acirc;',
    '&Atilde;',
    '&Auml;',
    '&Aring;',
    '&AElig;',
    '&Ccedil;',
    '&Egrave;',
    '&Eacute;',
    '&Ecirc;',
    '&Euml;',
    '&Igrave;',
    '&Iacute;',
    '&Icirc;',
    '&Iuml;',
    '&ETH;',
    '&Ntilde;',
    '&Ograve;',
    '&Oacute;',
    '&Ocirc;',
    '&Otilde;',
    '&Ouml;',
    '&times;',
    '&Oslash;',
    '&Ugrave;',
    '&Uacute;',
    '&Ucirc;',
    '&Uuml;',
    '&Yacute;',
    '&THORN;',
    '&szlig;',
    '&agrave;',
    '&aacute;',
    '&acirc;',
    '&atilde;',
    '&auml;',
    '&aring;',
    '&aelig;',
    '&ccedil;',
    '&egrave;',
    '&eacute;',
    '&ecirc;',
    '&euml;',
    '&igrave;',
    '&iacute;',
    '&icirc;',
    '&iuml;',
    '&eth;',
    '&ntilde;',
    '&ograve;',
    '&oacute;',
    '&ocirc;',
    '&otilde;',
    '&ouml;',
    '&divide;',
    '&oslash;',
    '&ugrave;',
    '&uacute;',
    '&ucirc;',
    '&uuml;',
    '&yacute;',
    '&thorn;',
    '&yuml;',
    '&OElig;',
    '&oelig;',
    '&#372;',
    '&#374',
    '&#373',
    '&#375;',
    '&sbquo;',
    '&#8219;',
    '&bdquo;',
    '&hellip;',
    '&trade;',
    '&#9658;',
    '&bull;',
    '&rarr;',
    '&rArr;',
    '&hArr;',
    '&diams;',
    '&asymp;'
];
Config_1.Config.prototype.controls.symbol = {
    icon: 'omega',
    hotkeys: ['ctrl+shift+i', 'cmd+shift+i'],
    tooltip: 'Insert Special Character',
    popup: function (editor, current, control, close) {
        var container = editor.events.fire('generateSpecialCharactersTable.symbols');
        if (container) {
            if (editor.options.usePopupForSpecialCharacters) {
                var box = editor.create.div();
                box.classList.add('jodit_symbols');
                box.appendChild(container);
                editor.events.on(container, 'close_dialog', close);
                return box;
            }
            else {
                var dialog_2 = dialog_1.Alert(container, editor.i18n('Select Special Character'), undefined, 'jodit_symbols');
                var a = container.querySelector('a');
                a && a.focus();
                editor.events.on('beforeDestruct', function () {
                    dialog_2 && dialog_2.close();
                });
            }
        }
    }
};
var symbols = (function () {
    function symbols(editor) {
        var _this = this;
        this.countInRow = 17;
        editor.events.on('generateSpecialCharactersTable.symbols', function () {
            var container = editor.create.fromHTML('<div class="jodit_symbols-container">' +
                '<div class="jodit_symbols-container_table"><table><tbody></tbody></table></div>' +
                '<div class="jodit_symbols-container_preview"><div class="jodit_symbols-preview"></div></div>' +
                '</div>'), preview = container.querySelector('.jodit_symbols-preview'), table = container.querySelector('table'), body = table.tBodies[0], chars = [];
            for (var i = 0; i < editor.options.specialCharacters.length;) {
                var tr = editor.create.element('tr');
                for (var j = 0; j < _this.countInRow &&
                    i < editor.options.specialCharacters.length; j += 1, i += 1) {
                    var td = editor.create.element('td'), a = editor.create.fromHTML("<a\n                                    data-index=\"" + i + "\"\n                                    data-index-j=\"" + j + "\"\n                                    href=\"javascript:void(0)\"\n                                    role=\"option\"\n                                    tabindex=\"-1\"\n                                >" + editor.options.specialCharacters[i] + "</a>");
                    chars.push(a);
                    td.appendChild(a);
                    tr.appendChild(td);
                }
                body.appendChild(tr);
            }
            var self = _this;
            editor.events
                .on(chars, 'focus', function () {
                preview.innerHTML = this.innerHTML;
            })
                .on(chars, 'mousedown', function (e) {
                if (this && this.nodeName === 'A') {
                    editor.selection.focus();
                    editor.selection.insertHTML(this.innerHTML);
                    editor.events.fire(this, 'close_dialog');
                    e && e.preventDefault();
                    e && e.stopImmediatePropagation();
                }
            })
                .on(chars, 'mouseenter', function () {
                if (this && this.nodeName === 'A') {
                    this.focus();
                }
            })
                .on(chars, 'keydown', function (e) {
                var target = e.target;
                if (target && target.nodeName === 'A') {
                    var index = parseInt(target.getAttribute('data-index') || '0', 10), jIndex = parseInt(target.getAttribute('data-index-j') || '0', 10);
                    var newIndex = void 0;
                    switch (e.which) {
                        case constants_1.KEY_UP:
                        case constants_1.KEY_DOWN:
                            newIndex =
                                e.which === constants_1.KEY_UP
                                    ? index - self.countInRow
                                    : index + self.countInRow;
                            if (chars[newIndex] === undefined) {
                                newIndex =
                                    e.which === constants_1.KEY_UP
                                        ? Math.floor(chars.length /
                                            self.countInRow) *
                                            self.countInRow +
                                            jIndex
                                        : jIndex;
                                if (newIndex > chars.length - 1) {
                                    newIndex -= self.countInRow;
                                }
                            }
                            chars[newIndex] && chars[newIndex].focus();
                            break;
                        case constants_1.KEY_RIGHT:
                        case constants_1.KEY_LEFT:
                            newIndex =
                                e.which === constants_1.KEY_LEFT
                                    ? index - 1
                                    : index + 1;
                            if (chars[newIndex] === undefined) {
                                newIndex =
                                    e.which === constants_1.KEY_LEFT
                                        ? chars.length - 1
                                        : 0;
                            }
                            chars[newIndex] && chars[newIndex].focus();
                            break;
                        case constants_1.KEY_ENTER:
                            editor.events.fire(target, 'mousedown');
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            break;
                    }
                }
            });
            return container;
        });
    }
    return symbols;
}());
exports.symbols = symbols;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var consts = __webpack_require__(2);
var Dom_1 = __webpack_require__(1);
var Table_1 = __webpack_require__(29);
function tableKeyboardNavigation(editor) {
    editor.events
        .off('.tableKeyboardNavigation')
        .on('keydown.tableKeyboardNavigation', function (event) {
        var current, block;
        if (event.which === consts.KEY_TAB ||
            event.which === consts.KEY_LEFT ||
            event.which === consts.KEY_RIGHT ||
            event.which === consts.KEY_UP ||
            event.which === consts.KEY_DOWN) {
            current = editor.selection.current();
            block = Dom_1.Dom.up(current, function (elm) {
                return elm && elm.nodeName && /^td|th$/i.test(elm.nodeName);
            }, editor.editor);
            if (!block) {
                return;
            }
            var range = editor.selection.range;
            if (event.which !== consts.KEY_TAB && current !== block) {
                if (((event.which === consts.KEY_LEFT ||
                    event.which === consts.KEY_UP) &&
                    (Dom_1.Dom.prev(current, function (elm) {
                        return event.which === consts.KEY_UP
                            ? elm && elm.nodeName === 'BR'
                            : !!elm;
                    }, block) ||
                        (event.which !== consts.KEY_UP &&
                            Dom_1.Dom.isText(current) &&
                            range.startOffset !== 0))) ||
                    ((event.which === consts.KEY_RIGHT ||
                        event.which === consts.KEY_DOWN) &&
                        (Dom_1.Dom.next(current, function (elm) {
                            return event.which === consts.KEY_DOWN
                                ? elm && elm.nodeName === 'BR'
                                : !!elm;
                        }, block) ||
                            (event.which !== consts.KEY_DOWN &&
                                Dom_1.Dom.isText(current) &&
                                current.nodeValue &&
                                range.startOffset !==
                                    current.nodeValue.length)))) {
                    return;
                }
            }
        }
        else {
            return;
        }
        var table = Dom_1.Dom.up(block, function (elm) { return elm && /^table$/i.test(elm.nodeName); }, editor.editor);
        var next = null;
        switch (event.which) {
            case consts.KEY_TAB:
            case consts.KEY_LEFT:
                var sibling = event.which === consts.KEY_LEFT || event.shiftKey
                    ? 'prev'
                    : 'next';
                next = Dom_1.Dom[sibling](block, function (elm) {
                    return elm &&
                        /^td|th$/i.test(elm.tagName);
                }, table);
                if (!next) {
                    Table_1.Table.appendRow(table, sibling === 'next'
                        ? false
                        : table.querySelector('tr'), sibling === 'next', editor.create.inside);
                    next = Dom_1.Dom[sibling](block, function (elm) {
                        return elm && Dom_1.Dom.isCell(elm, editor.editorWindow);
                    }, table);
                }
                break;
            case consts.KEY_UP:
            case consts.KEY_DOWN:
                {
                    var i_1 = 0, j_1 = 0;
                    var matrix = Table_1.Table.formalMatrix(table, function (elm, _i, _j) {
                        if (elm === block) {
                            i_1 = _i;
                            j_1 = _j;
                        }
                    });
                    if (event.which === consts.KEY_UP) {
                        if (matrix[i_1 - 1] !== undefined) {
                            next = matrix[i_1 - 1][j_1];
                        }
                    }
                    else {
                        if (matrix[i_1 + 1] !== undefined) {
                            next = matrix[i_1 + 1][j_1];
                        }
                    }
                }
                break;
        }
        if (next) {
            if (!next.firstChild) {
                var first = editor.create.inside.element('br');
                next.appendChild(first);
                editor.selection.setCursorBefore(first);
            }
            else {
                if (event.which === consts.KEY_TAB) {
                    editor.selection.select(next, true);
                }
                else {
                    editor.selection.setCursorIn(next, event.which === consts.KEY_RIGHT ||
                        event.which === consts.KEY_DOWN);
                }
            }
            return false;
        }
    });
}
exports.tableKeyboardNavigation = tableKeyboardNavigation;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
var Plugin_1 = __webpack_require__(6);
var Dom_1 = __webpack_require__(1);
var Table_1 = __webpack_require__(29);
var helpers_1 = __webpack_require__(3);
Config_1.Config.prototype.useTableProcessor = true;
Config_1.Config.prototype.useExtraClassesOptions = true;
Config_1.Config.prototype.controls.table = {
    data: {
        cols: 10,
        rows: 10,
        classList: {
            'table table-bordered': 'Bootstrap Bordered',
            'table table-striped': 'Bootstrap Striped',
            'table table-dark': 'Bootstrap Dark'
        }
    },
    popup: function (editor, current, control, close, button) {
        var default_rows_count = control.data && control.data.rows ? control.data.rows : 10, default_cols_count = control.data && control.data.cols ? control.data.cols : 10;
        var generateExtraClasses = function () {
            if (!editor.options.useExtraClassesOptions) {
                return '';
            }
            var out = [];
            if (control.data) {
                var classList_1 = control.data.classList;
                Object.keys(classList_1).forEach(function (classes) {
                    out.push("<label class=\"jodit_vertical_middle\"><input class=\"jodit_checkbox\" value=\"" + classes + "\" type=\"checkbox\"/>" + classList_1[classes] + "</label>");
                });
            }
            return out.join('');
        };
        var form = editor.create.fromHTML('<form class="jodit_form jodit_form_inserter">' +
            '<label class="jodit_form_center">' +
            '<span>1</span> &times; <span>1</span>' +
            '</label>' +
            '<div class="jodit_form-table-creator-box">' +
            '<div class="jodit_form-container"></div>' +
            '<div class="jodit_form-options">' +
            generateExtraClasses() +
            '</div>' +
            '</div>' +
            '</form>'), rows = form.querySelectorAll('span')[0], cols = form.querySelectorAll('span')[1], blocksContainer = form.querySelector('.jodit_form-container'), mainBox = form.querySelector('.jodit_form-table-creator-box'), options = form.querySelector('.jodit_form-options'), cells = [];
        var generateRows = function (need_rows) {
            var cnt = need_rows * default_cols_count;
            if (cells.length > cnt) {
                for (var i = cnt; i < cells.length; i += 1) {
                    Dom_1.Dom.safeRemove(cells[i]);
                    delete cells[i];
                }
                cells.length = cnt;
            }
            for (var i = 0; i < cnt; i += 1) {
                if (!cells[i]) {
                    var div = editor.create.div();
                    div.setAttribute('data-index', i.toString());
                    cells.push(div);
                }
            }
            cells.forEach(function (cell) {
                blocksContainer.appendChild(cell);
            });
            var width = (cells[0].offsetWidth || 18) * default_cols_count;
            blocksContainer.style.width = width + 'px';
            mainBox.style.width = width + options.offsetWidth + 1 + 'px';
        };
        var mouseenter = function (e, index) {
            var dv = e.target;
            if (!dv || dv.tagName !== 'DIV') {
                return;
            }
            var k = index === undefined || isNaN(index)
                ? parseInt(dv.getAttribute('data-index') || '0', 10)
                : index || 0;
            var rows_count = Math.ceil((k + 1) / default_cols_count), cols_count = (k % default_cols_count) + 1;
            for (var i = 0; i < cells.length; i += 1) {
                if (cols_count >= (i % default_cols_count) + 1 &&
                    rows_count >= Math.ceil((i + 1) / default_cols_count)) {
                    cells[i].className = 'hovered';
                }
                else {
                    cells[i].className = '';
                }
            }
            cols.textContent = cols_count.toString();
            rows.textContent = rows_count.toString();
        };
        blocksContainer.addEventListener('mousemove', mouseenter);
        editor.events.on(blocksContainer, 'touchstart mousedown', function (e) {
            var dv = e.target;
            e.preventDefault();
            e.stopImmediatePropagation();
            if (dv.tagName !== 'DIV') {
                return;
            }
            var k = parseInt(dv.getAttribute('data-index') || '0', 10);
            var rows_count = Math.ceil((k + 1) / default_cols_count), cols_count = (k % default_cols_count) + 1;
            var crt = editor.create.inside, tbody = crt.element('tbody'), table = crt.element('table');
            table.appendChild(tbody);
            table.style.width = '100%';
            var first_td = null, tr, td;
            for (var i = 1; i <= rows_count; i += 1) {
                tr = crt.element('tr');
                for (var j = 1; j <= cols_count; j += 1) {
                    td = crt.element('td');
                    if (!first_td) {
                        first_td = td;
                    }
                    td.appendChild(crt.element('br'));
                    tr.appendChild(crt.text('\n'));
                    tr.appendChild(crt.text('\t'));
                    tr.appendChild(td);
                }
                tbody.appendChild(crt.text('\n'));
                tbody.appendChild(tr);
            }
            var crnt = editor.selection.current();
            if (crnt && editor.selection.isCollapsed()) {
                var block = Dom_1.Dom.closest(crnt, function (node) { return Dom_1.Dom.isBlock(node, editor.editorWindow); }, editor.editor);
                if (block &&
                    block !== editor.editor &&
                    !block.nodeName.match(/^TD|TH|TBODY|TABLE|THEADER|TFOOTER$/)) {
                    editor.selection.setCursorAfter(block);
                }
            }
            helpers_1.$$('input[type=checkbox]:checked', options).forEach(function (input) {
                input.value
                    .split(/[\s]+/)
                    .forEach(function (className) {
                    table.classList.add(className);
                });
            });
            editor.selection.insertNode(crt.text('\n'));
            editor.selection.insertNode(table, false);
            if (first_td) {
                editor.selection.setCursorIn(first_td);
                helpers_1.scrollIntoView(first_td, editor.editor, editor.editorDocument);
            }
            close();
        });
        if (button && button.parentToolbar) {
            editor.events
                .off(button.parentToolbar.container, 'afterOpenPopup.tableGenerator')
                .on(button.parentToolbar.container, 'afterOpenPopup.tableGenerator', function () {
                generateRows(default_rows_count);
                if (cells[0]) {
                    cells[0].className = 'hovered';
                }
            }, '', true);
        }
        return form;
    },
    tooltip: 'Insert table'
};
var TableProcessor = (function (_super) {
    tslib_1.__extends(TableProcessor, _super);
    function TableProcessor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__key = 'table_processor_observer';
        _this.__selectMode = false;
        _this.__resizerDelta = 0;
        _this.__drag = false;
        _this.__addResizer = function () {
            if (!_this.__resizerHandler) {
                _this.__resizerHandler = _this.jodit.container.querySelector('.jodit_table_resizer');
                if (!_this.__resizerHandler) {
                    _this.__resizerHandler = _this.jodit.create.div('jodit_table_resizer');
                    var startX_1 = 0;
                    _this.jodit.events
                        .on(_this.__resizerHandler, 'mousedown.table touchstart.table', function (event) {
                        _this.__drag = true;
                        startX_1 = event.clientX;
                        _this.jodit.lock(_this.__key);
                        _this.__resizerHandler.classList.add('jodit_table_resizer-moved');
                        var box, tableBox = _this.__workTable.getBoundingClientRect();
                        _this.__minX = 0;
                        _this.__maxX = 1000000;
                        if (_this.__wholeTable !== null) {
                            tableBox = _this.__workTable
                                .parentNode.getBoundingClientRect();
                            _this.__minX = tableBox.left;
                            _this.__maxX = tableBox.left + tableBox.width;
                        }
                        else {
                            var coordinate_1 = Table_1.Table.formalCoordinate(_this.__workTable, _this.__workCell, true);
                            Table_1.Table.formalMatrix(_this.__workTable, function (td, i, j) {
                                if (coordinate_1[1] === j) {
                                    box = td.getBoundingClientRect();
                                    _this.__minX = Math.max(box.left + consts.NEARBY / 2, _this.__minX);
                                }
                                if (coordinate_1[1] + 1 === j) {
                                    box = td.getBoundingClientRect();
                                    _this.__maxX = Math.min(box.left +
                                        box.width -
                                        consts.NEARBY / 2, _this.__maxX);
                                }
                            });
                        }
                        return false;
                    })
                        .on(_this.__resizerHandler, 'mouseenter.table', function () {
                        _this.jodit.async.clearTimeout(_this.hideTimeout);
                    })
                        .on(_this.jodit.editorWindow, 'mousemove.table touchmove.table', function (event) {
                        if (_this.__drag) {
                            var x = event.clientX;
                            var workplacePosition = helpers_1.offset((_this.__resizerHandler.parentNode ||
                                _this.jodit.ownerDocument
                                    .documentElement), _this.jodit, _this.jodit.ownerDocument, true);
                            if (x < _this.__minX) {
                                x = _this.__minX;
                            }
                            if (x > _this.__maxX) {
                                x = _this.__maxX;
                            }
                            _this.__resizerDelta =
                                x -
                                    startX_1 +
                                    (!_this.jodit.options.iframe
                                        ? 0
                                        : workplacePosition.left);
                            _this.__resizerHandler.style.left =
                                x -
                                    (_this.jodit.options.iframe
                                        ? 0
                                        : workplacePosition.left) +
                                    'px';
                            var sel = _this.jodit.selection.sel;
                            sel && sel.removeAllRanges();
                            if (event.preventDefault) {
                                event.preventDefault();
                            }
                        }
                    });
                    _this.jodit.workplace.appendChild(_this.__resizerHandler);
                }
            }
        };
        _this.onExecCommand = function (command) {
            if (/table(splitv|splitg|merge|empty|bin|binrow|bincolumn|addcolumn|addrow)/.test(command)) {
                command = command.replace('table', '');
                var cells = Table_1.Table.getAllSelectedCells(_this.jodit.editor);
                if (cells.length) {
                    var cell = cells.shift();
                    if (!cell) {
                        return;
                    }
                    var table = Dom_1.Dom.closest(cell, 'table', _this.jodit.editor);
                    switch (command) {
                        case 'splitv':
                            Table_1.Table.splitVertical(table, _this.jodit.create.inside);
                            break;
                        case 'splitg':
                            Table_1.Table.splitHorizontal(table, _this.jodit.create.inside);
                            break;
                        case 'merge':
                            Table_1.Table.mergeSelected(table);
                            break;
                        case 'empty':
                            Table_1.Table.getAllSelectedCells(_this.jodit.editor).forEach(function (td) { return (td.innerHTML = ''); });
                            break;
                        case 'bin':
                            Dom_1.Dom.safeRemove(table);
                            break;
                        case 'binrow':
                            Table_1.Table.removeRow(table, cell.parentNode.rowIndex);
                            break;
                        case 'bincolumn':
                            Table_1.Table.removeColumn(table, cell.cellIndex);
                            break;
                        case 'addcolumnafter':
                        case 'addcolumnbefore':
                            Table_1.Table.appendColumn(table, cell.cellIndex, command === 'addcolumnafter', _this.jodit.create.inside);
                            break;
                        case 'addrowafter':
                        case 'addrowbefore':
                            Table_1.Table.appendRow(table, cell.parentNode, command === 'addrowafter', _this.jodit.create.inside);
                            break;
                    }
                }
                return false;
            }
        };
        return _this;
    }
    TableProcessor.isCell = function (tag) {
        return !!tag && /^TD|TH$/i.test(tag.nodeName);
    };
    TableProcessor.prototype.showResizer = function () {
        this.jodit.async.clearTimeout(this.hideTimeout);
        this.__resizerHandler.style.display = 'block';
    };
    TableProcessor.prototype.hideResizer = function () {
        var _this = this;
        this.hideTimeout = this.jodit.async.setTimeout(function () {
            _this.__resizerHandler.style.display = 'none';
        }, {
            timeout: this.jodit.defaultTimeout,
            label: 'hideResizer'
        });
    };
    TableProcessor.prototype.__deSelectAll = function (table, currentCell) {
        var cells = table
            ? Table_1.Table.getAllSelectedCells(table)
            : Table_1.Table.getAllSelectedCells(this.jodit.editor);
        if (cells.length) {
            cells.forEach(function (cell) {
                if (!currentCell || currentCell !== cell) {
                    Table_1.Table.restoreSelection(cell);
                }
            });
        }
    };
    TableProcessor.prototype.__setWorkCell = function (cell, wholeTable) {
        if (wholeTable === void 0) { wholeTable = null; }
        this.__wholeTable = wholeTable;
        this.__workCell = cell;
        this.__workTable = Dom_1.Dom.up(cell, function (elm) { return elm && elm.nodeName === 'TABLE'; }, this.jodit.editor);
    };
    TableProcessor.prototype.__calcResizerPosition = function (table, cell, offsetX, delta) {
        if (offsetX === void 0) { offsetX = 0; }
        if (delta === void 0) { delta = 0; }
        var box = helpers_1.offset(cell, this.jodit, this.jodit.editorDocument);
        if (offsetX <= consts.NEARBY || box.width - offsetX <= consts.NEARBY) {
            var workplacePosition = helpers_1.offset((this.__resizerHandler.parentNode ||
                this.jodit.ownerDocument
                    .documentElement), this.jodit, this.jodit.ownerDocument, true), parentBox = helpers_1.offset(table, this.jodit, this.jodit.editorDocument);
            this.__resizerHandler.style.left =
                (offsetX <= consts.NEARBY ? box.left : box.left + box.width) -
                    workplacePosition.left +
                    delta +
                    'px';
            this.__resizerHandler.style.height = parentBox.height + 'px';
            this.__resizerHandler.style.top =
                parentBox.top - workplacePosition.top + 'px';
            this.showResizer();
            if (offsetX <= consts.NEARBY) {
                var prevTD = Dom_1.Dom.prev(cell, TableProcessor.isCell, cell.parentNode);
                if (prevTD) {
                    this.__setWorkCell(prevTD);
                }
                else {
                    this.__setWorkCell(cell, true);
                }
            }
            else {
                var nextTD = Dom_1.Dom.next(cell, TableProcessor.isCell, cell.parentNode);
                this.__setWorkCell(cell, !nextTD ? false : null);
            }
        }
        else {
            this.hideResizer();
        }
    };
    TableProcessor.prototype.observe = function (table) {
        var _this = this;
        table[this.__key] = true;
        var start;
        this.jodit.events
            .on(table, 'mousedown.table touchstart.table', function (event) {
            if (_this.jodit.options.readonly) {
                return;
            }
            var cell = Dom_1.Dom.up(event.target, TableProcessor.isCell, table);
            if (cell &&
                cell instanceof
                    _this.jodit.editorWindow.HTMLElement) {
                if (!cell.firstChild) {
                    cell.appendChild(_this.jodit.create.inside.element('br'));
                }
                start = cell;
                Table_1.Table.addSelected(cell);
                _this.__selectMode = true;
            }
        })
            .on(table, 'mouseleave.table', function (e) {
            if (_this.__resizerHandler &&
                _this.__resizerHandler !== e.relatedTarget) {
                _this.hideResizer();
            }
        })
            .on(table, 'mousemove.table touchmove.table', function (event) {
            if (_this.jodit.options.readonly) {
                return;
            }
            if (_this.__drag || _this.jodit.isLockedNotBy(_this.__key)) {
                return;
            }
            var cell = Dom_1.Dom.up(event.target, TableProcessor.isCell, table);
            if (cell) {
                if (_this.__selectMode) {
                    if (cell !== start) {
                        _this.jodit.lock(_this.__key);
                        var sel = _this.jodit.selection.sel;
                        sel && sel.removeAllRanges();
                        if (event.preventDefault) {
                            event.preventDefault();
                        }
                    }
                    _this.__deSelectAll(table);
                    var bound = Table_1.Table.getSelectedBound(table, [
                        cell,
                        start
                    ]), box = Table_1.Table.formalMatrix(table);
                    for (var i = bound[0][0]; i <= bound[1][0]; i += 1) {
                        for (var j = bound[0][1]; j <= bound[1][1]; j += 1) {
                            Table_1.Table.addSelected(box[i][j]);
                        }
                    }
                    var max_1 = box[bound[1][0]][bound[1][1]], min_1 = box[bound[0][0]][bound[0][1]];
                    _this.jodit.events.fire('showPopup', table, function () {
                        var minOffset = helpers_1.offset(min_1, _this.jodit, _this.jodit.editorDocument);
                        var maxOffset = helpers_1.offset(max_1, _this.jodit, _this.jodit.editorDocument);
                        return {
                            left: minOffset.left,
                            top: minOffset.top,
                            width: maxOffset.left -
                                minOffset.left +
                                maxOffset.width,
                            height: maxOffset.top -
                                minOffset.top +
                                maxOffset.height
                        };
                    });
                    event.stopPropagation();
                }
                else {
                    _this.__calcResizerPosition(table, cell, event.offsetX);
                }
            }
        });
        this.__addResizer();
    };
    TableProcessor.prototype.afterInit = function (editor) {
        var _this = this;
        if (!editor.options.useTableProcessor) {
            return;
        }
        editor.events
            .off(this.jodit.ownerWindow, '.table')
            .off('.table')
            .on(this.jodit.ownerWindow, 'mouseup.table touchend.table', function () {
            if (_this.__selectMode || _this.__drag) {
                _this.__selectMode = false;
                _this.jodit.unlock();
            }
            if (_this.__resizerHandler && _this.__drag) {
                _this.__drag = false;
                _this.__resizerHandler.classList.remove('jodit_table_resizer-moved');
                if (_this.__wholeTable === null) {
                    var __marked = [];
                    Table_1.Table.setColumnWidthByDelta(_this.__workTable, Table_1.Table.formalCoordinate(_this.__workTable, _this.__workCell, true)[1], _this.__resizerDelta, true, __marked);
                    var nextTD = Dom_1.Dom.next(_this.__workCell, TableProcessor.isCell, _this.__workCell.parentNode);
                    Table_1.Table.setColumnWidthByDelta(_this.__workTable, Table_1.Table.formalCoordinate(_this.__workTable, nextTD)[1], -_this.__resizerDelta, false, __marked);
                }
                else {
                    var width = _this.__workTable.offsetWidth, parentWidth = helpers_1.getContentWidth(_this.__workTable.parentNode, _this.jodit.editorWindow);
                    if (!_this.__wholeTable) {
                        _this.__workTable.style.width =
                            ((width + _this.__resizerDelta) / parentWidth) *
                                100 +
                                '%';
                    }
                    else {
                        var margin = parseInt(_this.jodit.editorWindow.getComputedStyle(_this.__workTable).marginLeft || '0', 10);
                        _this.__workTable.style.width =
                            ((width - _this.__resizerDelta) / parentWidth) *
                                100 +
                                '%';
                        _this.__workTable.style.marginLeft =
                            ((margin + _this.__resizerDelta) / parentWidth) *
                                100 +
                                '%';
                    }
                }
                editor.setEditorValue();
                editor.selection.focus();
            }
        })
            .on(this.jodit.ownerWindow, 'scroll.table', function () {
            if (_this.__drag) {
                var parent_1 = Dom_1.Dom.up(_this.__workCell, function (elm) { return elm && elm.nodeName === 'TABLE'; }, editor.editor);
                if (parent_1) {
                    var parentBox = parent_1.getBoundingClientRect();
                    _this.__resizerHandler.style.top = parentBox.top + 'px';
                }
            }
        })
            .on(this.jodit.ownerWindow, 'mousedown.table touchend.table', function (event) {
            var current_cell = Dom_1.Dom.closest(event.originalEvent.target, 'TD|TH', _this.jodit.editor);
            var table = null;
            if (current_cell instanceof
                _this.jodit.editorWindow.HTMLTableCellElement) {
                table = Dom_1.Dom.closest(current_cell, 'table', _this.jodit.editor);
            }
            if (table) {
                _this.__deSelectAll(table, current_cell instanceof
                    _this.jodit.editorWindow
                        .HTMLTableCellElement
                    ? current_cell
                    : false);
            }
            else {
                _this.__deSelectAll();
            }
        })
            .on('afterGetValueFromEditor.table', function (data) {
            var rxp = new RegExp("([s]*)" + consts.JODIT_SELECTED_CELL_MARKER + "=\"1\"", 'g');
            if (rxp.test(data.value)) {
                data.value = data.value.replace(rxp, '');
            }
        })
            .on('change.table afterCommand.table afterSetMode.table', function () {
            helpers_1.$$('table', editor.editor).forEach(function (table) {
                if (!table[_this.__key]) {
                    _this.observe(table);
                }
            });
        })
            .on('beforeSetMode.table', function () {
            Table_1.Table.getAllSelectedCells(editor.editor).forEach(function (td) {
                Table_1.Table.restoreSelection(td);
                Table_1.Table.normalizeTable(Dom_1.Dom.closest(td, 'table', editor.editor));
            });
        })
            .on('keydown.table', function (event) {
            if (event.which === consts.KEY_TAB) {
                helpers_1.$$('table', editor.editor).forEach(function (table) {
                    _this.__deSelectAll(table);
                });
            }
        })
            .on('beforeCommand.table', this.onExecCommand.bind(this));
    };
    TableProcessor.prototype.beforeDestruct = function (jodit) {
        if (jodit.events) {
            jodit.events.off(this.jodit.ownerWindow, '.table');
            jodit.events.off('.table');
        }
    };
    return TableProcessor;
}(Plugin_1.Plugin));
exports.TableProcessor = TableProcessor;


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var size_1 = __webpack_require__(19);
var helpers_1 = __webpack_require__(3);
var Plugin_1 = __webpack_require__(6);
var Dom_1 = __webpack_require__(1);
var tooltip = (function (_super) {
    tslib_1.__extends(tooltip, _super);
    function tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isOpened = false;
        return _this;
    }
    tooltip.prototype.afterInit = function (jodit) {
        var _this = this;
        this.container = jodit.create.div('jodit_tooltip');
        this.jodit.ownerDocument.body.appendChild(this.container);
        var timeout = 0;
        jodit.events
            .off('.tooltip')
            .on('showTooltip.tooltip', function (target, content) {
            jodit.async.clearTimeout(timeout);
            _this.open(target, content);
        })
            .on('hideTooltip.tooltip change.tooltip updateToolbar.tooltip scroll.tooltip changePlace.tooltip hidePopup.tooltip closeAllPopups.tooltip', function () {
            timeout = jodit.async.setTimeout(function () { return _this.close(); }, _this.jodit.defaultTimeout);
        });
    };
    tooltip.prototype.beforeDestruct = function (jodit) {
        var _a;
        (_a = jodit) === null || _a === void 0 ? void 0 : _a.events.off('.tooltip');
        this.close();
        Dom_1.Dom.safeRemove(this.container);
    };
    tooltip.prototype.open = function (target, content) {
        this.container.classList.add('jodit_tooltip_visible');
        this.container.innerHTML = content;
        this.isOpened = true;
        this.calcPosition(target);
    };
    tooltip.prototype.calcPosition = function (target) {
        var bound = size_1.offset(target, this.jodit, this.jodit.ownerDocument, true);
        helpers_1.css(this.container, {
            left: bound.left - this.container.offsetWidth / 2 + bound.width / 2,
            top: bound.top + bound.height,
            position: null
        });
    };
    tooltip.prototype.close = function () {
        if (this.isOpened) {
            this.isOpened = false;
            this.container.classList.remove('jodit_tooltip_visible');
            helpers_1.css(this.container, {
                left: -5000,
                position: 'fixed'
            });
        }
    };
    return tooltip;
}(Plugin_1.Plugin));
exports.tooltip = tooltip;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var ContextMenu_1 = __webpack_require__(39);
var Dom_1 = __webpack_require__(1);
var selector_1 = __webpack_require__(10);
var Plugin_1 = __webpack_require__(6);
var button_1 = __webpack_require__(26);
var string_1 = __webpack_require__(8);
Config_1.Config.prototype.controls.selectall = {
    icon: 'select-all',
    command: 'selectall',
    tooltip: 'Select all'
};
Config_1.Config.prototype.showXPathInStatusbar = true;
var xpath = (function (_super) {
    tslib_1.__extends(xpath, _super);
    function xpath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onContext = function (bindElement, event) {
            if (!_this.menu) {
                _this.menu = new ContextMenu_1.ContextMenu(_this.jodit);
            }
            _this.menu.show(event.clientX, event.clientY, [
                {
                    icon: 'bin',
                    title: bindElement === _this.jodit.editor ? 'Clear' : 'Remove',
                    exec: function () {
                        if (bindElement !== _this.jodit.editor) {
                            Dom_1.Dom.safeRemove(bindElement);
                        }
                        else {
                            _this.jodit.value = '';
                        }
                        _this.jodit.setEditorValue();
                    }
                },
                {
                    icon: 'select-all',
                    title: 'Select',
                    exec: function () {
                        _this.jodit.selection.select(bindElement);
                    }
                }
            ]);
            return false;
        };
        _this.onSelectPath = function (bindElement, event) {
            _this.jodit.selection.focus();
            var path = event.target.getAttribute('data-path') || '/';
            if (path === '/') {
                _this.jodit.execCommand('selectall');
                return false;
            }
            try {
                var elm = _this.jodit.editorDocument
                    .evaluate(path, _this.jodit.editor, null, XPathResult.ANY_TYPE, null)
                    .iterateNext();
                if (elm) {
                    _this.jodit.selection.select(elm);
                    return false;
                }
            }
            catch (_a) { }
            _this.jodit.selection.select(bindElement);
            return false;
        };
        _this.tpl = function (bindElement, path, name, title) {
            var li = _this.jodit.create.fromHTML("<li><a role=\"button\" data-path=\"" + path + "\" href=\"javascript:void(0)\" title=\"" + title + "\" tabindex=\"-1\"'>" + string_1.trim(name) + "</a></li>");
            var a = li.firstChild;
            _this.jodit.events
                .on(a, 'click', _this.onSelectPath.bind(_this, bindElement))
                .on(a, 'contextmenu', _this.onContext.bind(_this, bindElement));
            return li;
        };
        _this.removeSelectAll = function () {
            if (_this.selectAllButton) {
                _this.selectAllButton.destruct();
                delete _this.selectAllButton;
            }
        };
        _this.appendSelectAll = function () {
            _this.removeSelectAll();
            _this.selectAllButton = new button_1.ToolbarButton(_this.jodit, tslib_1.__assign({ name: 'selectall' }, _this.jodit.options.controls.selectall));
            _this.container &&
                _this.container.insertBefore(_this.selectAllButton.container, _this.container.firstChild);
        };
        _this.calcPathImd = function () {
            if (_this.isDestructed) {
                return;
            }
            var current = _this.jodit.selection.current();
            if (_this.container) {
                _this.container.innerHTML = constants_1.INVISIBLE_SPACE;
            }
            if (current) {
                var name_1, xpth_1, li_1;
                Dom_1.Dom.up(current, function (elm) {
                    if (elm && _this.jodit.editor !== elm && !Dom_1.Dom.isText(elm)) {
                        name_1 = elm.nodeName.toLowerCase();
                        xpth_1 = selector_1.getXPathByElement(elm, _this.jodit.editor).replace(/^\//, '');
                        li_1 = _this.tpl(elm, xpth_1, name_1, _this.jodit.i18n('Select %s', name_1));
                        _this.container &&
                            _this.container.insertBefore(li_1, _this.container.firstChild);
                    }
                }, _this.jodit.editor);
            }
            _this.appendSelectAll();
        };
        _this.calcPath = _this.jodit.async.debounce(_this.calcPathImd, _this.jodit.defaultTimeout * 2);
        _this.menu = null;
        return _this;
    }
    xpath.prototype.afterInit = function () {
        var _this = this;
        if (this.jodit.options.showXPathInStatusbar) {
            this.container = this.jodit.create.element('ul');
            this.container.classList.add('jodit_xpath');
            this.jodit.events
                .off('.xpath')
                .on('mouseup.xpath change.xpath keydown.xpath changeSelection.xpath', this.calcPath)
                .on('afterSetMode.xpath afterInit.xpath changePlace.xpath', function () {
                _this.jodit.statusbar.append(_this.container);
                if (_this.jodit.getRealMode() === constants_1.MODE_WYSIWYG) {
                    _this.calcPath();
                }
                else {
                    if (_this.container) {
                        _this.container.innerHTML = constants_1.INVISIBLE_SPACE;
                    }
                    _this.appendSelectAll();
                }
            });
            this.calcPath();
        }
    };
    xpath.prototype.beforeDestruct = function () {
        if (this.jodit && this.jodit.events) {
            this.jodit.events.off('.xpath');
        }
        this.removeSelectAll();
        this.menu && this.menu.destruct();
        Dom_1.Dom.safeRemove(this.container);
        delete this.menu;
        delete this.container;
    };
    return xpath;
}(Plugin_1.Plugin));
exports.xpath = xpath;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dialog_1 = __webpack_require__(16);
var icon_1 = __webpack_require__(5);
exports.Alert = function (msg, title, callback, className) {
    if (className === void 0) { className = 'jodit_alert'; }
    if (typeof title === 'function') {
        callback = title;
        title = undefined;
    }
    var dialog = new dialog_1.Dialog(), container = dialog.create.div(className), okButton = dialog.create.fromHTML('<a href="javascript:void(0)" style="float:right;" class="jodit_button">' +
        icon_1.ToolbarIcon.getIcon('cancel') +
        '<span>' +
        Jodit_1.Jodit.prototype.i18n('Ok') +
        '</span></a>');
    array_1.asArray(msg).forEach(function (oneMessage) {
        container.appendChild(Dom_1.Dom.isNode(oneMessage, dialog.window)
            ? oneMessage
            : dialog.create.fromHTML(oneMessage));
    });
    okButton.addEventListener('click', function () {
        if (!callback ||
            typeof callback !== 'function' ||
            callback(dialog) !== false) {
            dialog.close();
        }
    });
    dialog.setFooter([okButton]);
    dialog.open(container, title || '&nbsp;', true, true);
    okButton.focus();
    return dialog;
};
var Jodit_1 = __webpack_require__(9);
var array_1 = __webpack_require__(21);
var Dom_1 = __webpack_require__(1);


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var consts = __webpack_require__(2);
var dialog_1 = __webpack_require__(16);
var confirm_1 = __webpack_require__(72);
var promt_1 = __webpack_require__(71);
var icon_1 = __webpack_require__(5);
var storage_1 = __webpack_require__(25);
var each_1 = __webpack_require__(24);
var normalize_1 = __webpack_require__(18);
var selector_1 = __webpack_require__(10);
var ctrlKey_1 = __webpack_require__(54);
var extend_1 = __webpack_require__(14);
var viewWithToolbar_1 = __webpack_require__(35);
__webpack_require__(199);
var Dom_1 = __webpack_require__(1);
var dialog_2 = __webpack_require__(13);
var dataProvider_1 = __webpack_require__(200);
var contextMenu_1 = __webpack_require__(201);
var observeObject_1 = __webpack_require__(202);
var item_1 = __webpack_require__(203);
var isValidName_1 = __webpack_require__(46);
var consts_1 = __webpack_require__(40);
var helpers_1 = __webpack_require__(3);
var DEFAULT_SOURCE_NAME = 'default', ITEM_ACTIVE_CLASS = consts_1.ITEM_CLASS + '-active-true';
var FileBrowser = (function (_super) {
    tslib_1.__extends(FileBrowser, _super);
    function FileBrowser(editor, options) {
        var _this = _super.call(this, editor, options) || this;
        _this.loader = _this.create.div(consts_1.F_CLASS + '_loader', consts_1.ICON_LOADER);
        _this.browser = _this.create.div(consts_1.F_CLASS + ' non-selected');
        _this.status_line = _this.create.div(consts_1.F_CLASS + '_status');
        _this.tree = _this.create.div(consts_1.F_CLASS + '_tree');
        _this.files = _this.create.div(consts_1.F_CLASS + '_files');
        _this.state = observeObject_1.ObserveObject.create({
            activeElements: [],
            elements: [],
            folders: [],
            view: 'tiles',
            sortBy: 'changed-desc',
            filterWord: '',
            onlyImages: false
        });
        _this.errorHandler = function (resp) {
            if (resp instanceof Error) {
                _this.status(_this.i18n(resp.message));
            }
            else {
                _this.status(_this.options.getMessage(resp));
            }
        };
        _this.status = function (message, success) {
            if (typeof message !== 'string') {
                message = message.message;
            }
            _this.status_line.classList.remove('success');
            _this.status_line.classList.add('active');
            var messageBox = _this.create.div();
            messageBox.textContent = message;
            _this.status_line.appendChild(messageBox);
            if (success) {
                _this.status_line.classList.add('success');
            }
            _this.async.setTimeout(function () {
                _this.status_line.classList.remove('active');
                Dom_1.Dom.detach(_this.status_line);
            }, {
                timeout: _this.options.howLongShowMsg,
                label: 'fileBrowser.status'
            });
        };
        _this.close = function () {
            _this.dialog.close();
        };
        _this.open = function (callback, onlyImages) {
            if (onlyImages === void 0) { onlyImages = false; }
            _this.state.onlyImages = onlyImages;
            return new Promise(function (resolve, reject) {
                if (!_this.options.items || !_this.options.items.url) {
                    throw helpers_1.error('Need set options.filebrowser.ajax.url');
                }
                var localTimeout = 0;
                _this.events
                    .off(_this.files, 'dblclick')
                    .on(_this.files, 'dblclick', _this.onSelect(callback), 'a')
                    .on(_this.files, 'touchstart', function () {
                    var now = new Date().getTime();
                    if (now - localTimeout <
                        consts.EMULATE_DBLCLICK_TIMEOUT) {
                        _this.onSelect(callback)();
                    }
                    localTimeout = now;
                }, 'a')
                    .off('select.filebrowser')
                    .on('select.filebrowser', _this.onSelect(callback));
                var header = _this.create.div();
                _this.toolbar.build(_this.options.buttons, header);
                _this.dialog.dialogbox_header.classList.add(consts_1.F_CLASS + '_title_box');
                _this.dialog.open(_this.browser, header);
                _this.events.fire('sort.filebrowser', _this.state.sortBy);
                _this.loadTree().then(resolve, reject);
            });
        };
        _this.openImageEditor = function (href, name, path, source, onSuccess, onFailed) {
            return _this.getInstance('ImageEditor').open(href, function (newname, box, success, failed) {
                var promise;
                if (box.action === 'resize') {
                    promise = _this.dataProvider.resize(path, source, name, newname, box.box);
                }
                else {
                    promise = _this.dataProvider.crop(path, source, name, newname, box.box);
                }
                promise
                    .then(function (resp) {
                    if (_this.options.isSuccess(resp)) {
                        _this.loadTree().then(function () {
                            success();
                            if (onSuccess) {
                                onSuccess();
                            }
                        });
                    }
                    else {
                        failed(helpers_1.error(_this.options.getMessage(resp)));
                        if (onFailed) {
                            onFailed(helpers_1.error(_this.options.getMessage(resp)));
                        }
                    }
                })
                    .catch(function (error) {
                    failed(error);
                    if (onFailed) {
                        onFailed(error);
                    }
                });
            });
        };
        _this.elementsMap = {};
        var self = _this, doc = editor ? editor.ownerDocument : document, editorDoc = editor ? editor.editorDocument : doc;
        if (editor) {
            _this.id = editor.id;
        }
        self.options = new Config_1.OptionsDefault(extend_1.extend(true, {}, self.options, Config_1.Config.defaultOptions.filebrowser, options, editor ? editor.options.filebrowser : undefined));
        self.storage = storage_1.Storage.makeStorage(_this.options.filebrowser.saveStateInStorage);
        self.dataProvider = new dataProvider_1.default(self.options, self.jodit || self);
        self.dialog = new dialog_1.Dialog(editor || self, {
            fullsize: self.options.fullsize,
            buttons: ['dialog.fullsize', 'dialog.close']
        });
        if (self.options.showFoldersPanel) {
            self.browser.appendChild(self.tree);
        }
        self.browser.appendChild(self.files);
        self.browser.appendChild(self.status_line);
        _this.initEventsListeners();
        _this.initNativeEventsListeners();
        self.dialog.setSize(self.options.width, self.options.height);
        [
            'getLocalFileByUrl',
            'crop',
            'resize',
            'create',
            'fileMove',
            'folderMove',
            'fileRename',
            'folderRename',
            'fileRemove',
            'folderRemove',
            'folder',
            'items',
            'permissions'
        ].forEach(function (key) {
            if (_this.options[key] !== null) {
                _this.options[key] = extend_1.extend(true, {}, _this.options.ajax, _this.options[key]);
            }
        });
        self.stateToView();
        var view = _this.storage.get(consts_1.F_CLASS + '_view');
        if (view && _this.options.view === null) {
            self.state.view = view === 'list' ? 'list' : 'tiles';
        }
        else {
            self.state.view = self.options.view === 'list' ? 'list' : 'tiles';
        }
        var sortBy = self.storage.get(consts_1.F_CLASS + '_sortby');
        if (sortBy) {
            var parts = sortBy.split('-');
            self.state.sortBy = ['changed', 'name', 'size'].includes(parts[0])
                ? sortBy
                : 'changed-desc';
        }
        else {
            self.state.sortBy = self.options.sortBy || 'changed-desc';
        }
        self.dataProvider.currentBaseUrl = selector_1.$$('base', editorDoc).length
            ? selector_1.$$('base', editorDoc)[0].getAttribute('href') || ''
            : location.protocol + '//' + location.host;
        self.initUploader(editor);
        return _this;
    }
    Object.defineProperty(FileBrowser.prototype, "defaultTimeout", {
        get: function () {
            return this.jodit && this.jodit !== this
                ? this.jodit.defaultTimeout
                : Config_1.Config.defaultOptions.observer.timeout;
        },
        enumerable: true,
        configurable: true
    });
    FileBrowser.prototype.loadItems = function (path, source) {
        if (path === void 0) { path = this.dataProvider.currentPath; }
        if (source === void 0) { source = this.dataProvider.currentSource; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.files.classList.add('active');
                this.files.appendChild(this.loader.cloneNode(true));
                return [2, this.dataProvider
                        .items(path, source)
                        .then(function (resp) {
                        var process = _this.options.items.process;
                        if (!process) {
                            process = _this.options.ajax.process;
                        }
                        if (process) {
                            var respData = process.call(self, resp);
                            _this.generateItemsList(respData.data.sources);
                            _this.state.activeElements = [];
                        }
                    })
                        .catch(function (error) {
                        dialog_2.Alert(error.message);
                        _this.errorHandler(error);
                    })];
            });
        });
    };
    FileBrowser.prototype.loadTree = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var path, source, error, tree, items;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                path = this.dataProvider.currentPath, source = this.dataProvider.currentSource, error = function (e) {
                    throw e instanceof Error ? e : error(e);
                };
                if (this.uploader) {
                    this.uploader.setPath(path);
                    this.uploader.setSource(source);
                }
                this.tree.classList.add('active');
                Dom_1.Dom.detach(this.tree);
                this.tree.appendChild(this.loader.cloneNode(true));
                if (this.options.showFoldersPanel) {
                    tree = this.dataProvider
                        .tree(path, source)
                        .then(function (resp) {
                        var process = _this.options.folder.process;
                        if (!process) {
                            process = _this.options.ajax.process;
                        }
                        if (process) {
                            var respData = process.call(self, resp);
                            _this.generateFolderTree(respData.data.sources);
                        }
                    })
                        .catch(function (e) {
                        _this.errorHandler(error(_this.jodit.i18n('Error on load folders')));
                        error(e);
                    });
                    items = this.loadItems(path, source);
                    return [2, Promise.all([tree, items]).catch(error)];
                }
                else {
                    this.tree.classList.remove('active');
                }
                return [2];
            });
        });
    };
    FileBrowser.prototype.deleteFile = function (name, source) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2, this.dataProvider
                        .fileRemove(this.dataProvider.currentPath, name, source)
                        .then(function (resp) {
                        if (_this.options.remove && _this.options.remove.process) {
                            resp = _this.options.remove.process.call(_this, resp);
                        }
                        if (!_this.options.isSuccess(resp)) {
                            throw helpers_1.error(_this.options.getMessage(resp));
                        }
                        else {
                            _this.status(_this.options.getMessage(resp) ||
                                _this.i18n('File "%s" was deleted', name), true);
                        }
                    })
                        .catch(this.status)];
            });
        });
    };
    FileBrowser.prototype.generateFolderTree = function (sources) {
        var folders = [];
        each_1.each(sources, function (source_name, source) {
            source.folders.forEach(function (name) {
                folders.push({
                    name: name,
                    source: source,
                    sourceName: source_name
                });
            });
        });
        this.state.folders = folders;
    };
    FileBrowser.prototype.generateItemsList = function (sources) {
        var _this = this;
        var elements = [];
        var state = this.state, canBeFile = function (item) {
            return !_this.state.onlyImages ||
                item.isImage === undefined ||
                item.isImage;
        }, inFilter = function (item) {
            return !state.filterWord.length ||
                _this.options.filter === undefined ||
                _this.options.filter(item, state.filterWord);
        };
        each_1.each(sources, function (source_name, source) {
            if (source.files && source.files.length) {
                if (typeof _this.options.sort === 'function') {
                    source.files.sort(function (a, b) {
                        return _this.options.sort(a, b, state.sortBy);
                    });
                }
                source.files.forEach(function (item) {
                    if (inFilter(item) && canBeFile(item)) {
                        elements.push(item_1.FileBrowserItem.create(tslib_1.__assign(tslib_1.__assign({}, item), { sourceName: source_name, source: source })));
                    }
                });
            }
        });
        this.state.elements = elements;
    };
    FileBrowser.prototype.onSelect = function (callback) {
        var _this = this;
        return function () {
            if (_this.state.activeElements.length) {
                var files_1 = [];
                var isImages_1 = [];
                _this.state.activeElements.forEach(function (elm) {
                    var url = elm.fileURL;
                    if (url) {
                        files_1.push(url);
                        isImages_1.push(elm.isImage || false);
                    }
                });
                _this.close();
                var data = {
                    baseurl: '',
                    files: files_1,
                    isImages: isImages_1
                };
                if (typeof callback !== 'function') {
                    _this.options.defaultCallback(_this, data);
                }
                else {
                    callback(data);
                }
            }
            return false;
        };
    };
    FileBrowser.prototype.isOpened = function () {
        return this.dialog.isOpened() && this.browser.style.display !== 'none';
    };
    FileBrowser.prototype.elementToItem = function (elm) {
        var key = elm.dataset.key, item = this.elementsMap[key || ''].item;
        return item;
    };
    FileBrowser.prototype.stateToView = function () {
        var _this = this;
        var _a = this, state = _a.state, files = _a.files, create = _a.create, options = _a.options, getDomElement = function (item) {
            var key = item.uniqueHashKey;
            if (_this.elementsMap[key]) {
                return _this.elementsMap[key].elm;
            }
            var elm = create.fromHTML(options.getThumbTemplate.call(_this, item, item.source, item.sourceName.toString()));
            elm.dataset.key = key;
            _this.elementsMap[key] = {
                item: item,
                elm: elm
            };
            return _this.elementsMap[key].elm;
        };
        state
            .on('beforeChange.activeElements', function () {
            state.activeElements.forEach(function (item) {
                var key = item.uniqueHashKey, elm = _this.elementsMap[key].elm;
                elm && elm.classList.remove(ITEM_ACTIVE_CLASS);
            });
        })
            .on('change.activeElements', function () {
            _this.events.fire('changeSelection');
            state.activeElements.forEach(function (item) {
                var key = item.uniqueHashKey, elm = _this.elementsMap[key].elm;
                elm && elm.classList.add(ITEM_ACTIVE_CLASS);
            });
        })
            .on('change.view', function () {
            files.classList.remove(consts_1.F_CLASS + '_files_view-tiles');
            files.classList.remove(consts_1.F_CLASS + '_files_view-list');
            files.classList.add(consts_1.F_CLASS + '_files_view-' + state.view);
            _this.storage.set(consts_1.F_CLASS + '_view', state.view);
        })
            .on('change.sortBy', function () {
            _this.storage.set(consts_1.F_CLASS + '_sortby', state.sortBy);
        })
            .on('change.elements', this.async.debounce(function () {
            Dom_1.Dom.detach(files);
            if (state.elements.length) {
                state.elements.forEach(function (item) {
                    _this.files.appendChild(getDomElement(item));
                });
            }
            else {
                files.appendChild(create.div(consts_1.F_CLASS + '_no_files', _this.i18n('There are no files')));
            }
        }, this.defaultTimeout))
            .on('change.folders', this.async.debounce(function () {
            Dom_1.Dom.detach(_this.tree);
            var lastSource = DEFAULT_SOURCE_NAME, lastSource2 = null;
            var appendCreateButton = function (source, sourceName, force) {
                if (force === void 0) { force = false; }
                if (source &&
                    lastSource2 &&
                    (source !== lastSource2 || force) &&
                    options.createNewFolder &&
                    _this.dataProvider.canI('FolderCreate')) {
                    _this.tree.appendChild(create.a('jodit_button addfolder', {
                        href: 'javascript:void(0)',
                        'data-path': normalize_1.normalizePath(source.path + '/'),
                        'data-source': sourceName
                    }, icon_1.ToolbarIcon.getIcon('plus') +
                        ' ' +
                        _this.i18n('Add folder')));
                    lastSource2 = source;
                }
            };
            state.folders.forEach(function (folder) {
                var name = folder.name, source = folder.source, sourceName = folder.sourceName;
                if (sourceName && sourceName !== lastSource) {
                    _this.tree.appendChild(create.div(consts_1.F_CLASS + '_source_title', sourceName));
                    lastSource = sourceName;
                }
                var folderElm = create.a(consts_1.F_CLASS + '_tree_item', {
                    draggable: 'draggable',
                    href: 'javascript:void(0)',
                    'data-path': normalize_1.normalizePath(source.path, name + '/'),
                    'data-name': name,
                    'data-source': sourceName,
                    'data-source-path': source.path
                }, create.span(consts_1.F_CLASS + '_tree_item_title', name));
                appendCreateButton(source, sourceName);
                lastSource2 = source;
                _this.tree.appendChild(folderElm);
                if (name === '..' || name === '.') {
                    return;
                }
                if (options.deleteFolder &&
                    _this.dataProvider.canI('FolderRename')) {
                    folderElm.appendChild(create.element('i', {
                        class: 'jodit_icon_folder jodit_icon_folder_rename',
                        title: _this.i18n('Rename')
                    }, icon_1.ToolbarIcon.getIcon('pencil')));
                }
                if (options.deleteFolder &&
                    _this.dataProvider.canI('FolderRemove')) {
                    folderElm.appendChild(create.element('i', {
                        class: 'jodit_icon_folder jodit_icon_folder_remove',
                        title: _this.i18n('Delete')
                    }, icon_1.ToolbarIcon.getIcon('cancel')));
                }
            });
            appendCreateButton(lastSource2, lastSource, true);
        }, this.defaultTimeout));
    };
    FileBrowser.prototype.initEventsListeners = function () {
        var _this = this;
        var state = this.state, self = this;
        self.events
            .on('view.filebrowser', function (view) {
            if (view !== state.view) {
                state.view = view;
            }
        })
            .on('sort.filebrowser', function (value) {
            if (value !== state.sortBy) {
                state.sortBy = value;
                self.loadItems();
            }
        })
            .on('filter.filebrowser', function (value) {
            if (value !== state.filterWord) {
                state.filterWord = value;
                self.loadItems();
            }
        })
            .on('fileRemove.filebrowser', function () {
            if (self.state.activeElements.length) {
                confirm_1.Confirm(self.i18n('Are you sure?'), '', function (yes) {
                    if (yes) {
                        var promises_1 = [];
                        self.state.activeElements.forEach(function (item) {
                            promises_1.push(self.deleteFile(item.file || item.name || '', item.sourceName));
                        });
                        self.state.activeElements = [];
                        Promise.all(promises_1).then(function () {
                            return self.loadTree();
                        });
                    }
                });
            }
        })
            .on('edit.filebrowser', function () {
            if (self.state.activeElements.length === 1) {
                var file = _this.state.activeElements[0];
                self.openImageEditor(file.fileURL, file.file || '', file.path, file.sourceName);
            }
        })
            .on('fileRename.filebrowser', function (name, path, source) {
            if (self.state.activeElements.length === 1) {
                promt_1.Promt(self.i18n('Enter new name'), self.i18n('Rename'), function (newName) {
                    if (!isValidName_1.isValidName(newName)) {
                        self.status(self.i18n('Enter new name'));
                        return false;
                    }
                    self.dataProvider
                        .fileRename(path, name, newName, source)
                        .then(function (resp) {
                        if (self.options.fileRename &&
                            self.options.fileRename.process) {
                            resp = self.options.fileRename.process.call(self, resp);
                        }
                        if (!self.options.isSuccess(resp)) {
                            throw helpers_1.error(self.options.getMessage(resp));
                        }
                        else {
                            self.state.activeElements = [];
                            self.status(self.options.getMessage(resp), true);
                        }
                        self.loadItems();
                    })
                        .catch(self.status);
                    return;
                }, self.i18n('type name'), name);
            }
        })
            .on('update.filebrowser', function () {
            self.loadTree();
        });
    };
    FileBrowser.prototype.initNativeEventsListeners = function () {
        var _this = this;
        var dragElement = false;
        var self = this;
        self.events
            .on(self.tree, 'click', function (e) {
            var a = this
                .parentNode, path = a.getAttribute('data-path') || '';
            confirm_1.Confirm(self.i18n('Are you sure?'), self.i18n('Delete'), function (yes) {
                if (yes) {
                    self.dataProvider
                        .folderRemove(path, a.getAttribute('data-name') || '', a.getAttribute('data-source') || '')
                        .then(function (resp) {
                        if (self.options.folderRemove &&
                            self.options.folderRemove.process) {
                            resp = self.options.folderRemove.process.call(self, resp);
                        }
                        if (!self.options.isSuccess(resp)) {
                            throw helpers_1.error(self.options.getMessage(resp));
                        }
                        else {
                            self.state.activeElements = [];
                            self.status(self.options.getMessage(resp), true);
                        }
                        self.loadTree();
                    })
                        .catch(self.status);
                }
            });
            e.stopImmediatePropagation();
            return false;
        }, 'a>.jodit_icon_folder_remove')
            .on(self.tree, 'click', function (e) {
            var a = this
                .parentNode, name = a.getAttribute('data-name') || '', path = a.getAttribute('data-source-path') || '';
            promt_1.Promt(self.i18n('Enter new name'), self.i18n('Rename'), function (newName) {
                if (!isValidName_1.isValidName(newName)) {
                    self.status(self.i18n('Enter new name'));
                    return false;
                }
                self.dataProvider
                    .folderRename(path, a.getAttribute('data-name') || '', newName, a.getAttribute('data-source') || '')
                    .then(function (resp) {
                    if (self.options.folderRename &&
                        self.options.folderRename.process) {
                        resp = self.options.folderRename.process.call(self, resp);
                    }
                    if (!self.options.isSuccess(resp)) {
                        throw helpers_1.error(self.options.getMessage(resp));
                    }
                    else {
                        self.state.activeElements = [];
                        self.status(self.options.getMessage(resp), true);
                    }
                    self.loadTree();
                })
                    .catch(self.status);
                return;
            }, self.i18n('type name'), name);
            e.stopImmediatePropagation();
            return false;
        }, 'a>.jodit_icon_folder_rename')
            .on(self.tree, 'click', function () {
            var _this = this;
            if (this.classList.contains('addfolder')) {
                promt_1.Promt(self.i18n('Enter Directory name'), self.i18n('Create directory'), function (name) {
                    self.dataProvider
                        .createFolder(name, _this.getAttribute('data-path') || '', _this.getAttribute('data-source') || '')
                        .then(function (resp) {
                        if (self.options.isSuccess(resp)) {
                            self.loadTree();
                        }
                        else {
                            self.status(self.options.getMessage(resp));
                        }
                        return resp;
                    }, self.status);
                }, self.i18n('type name'));
            }
            else {
                self.dataProvider.currentPath =
                    this.getAttribute('data-path') || '';
                self.dataProvider.currentSource =
                    this.getAttribute('data-source') || '';
                self.loadTree();
            }
        }, 'a')
            .on(self.tree, 'dragstart', function () {
            if (self.options.moveFolder) {
                dragElement = this;
            }
        }, 'a')
            .on(self.tree, 'drop', function () {
            if ((self.options.moveFile || self.options.moveFolder) &&
                dragElement) {
                var path = dragElement.getAttribute('data-path') || '';
                if (!self.options.moveFolder &&
                    dragElement.classList.contains(consts_1.F_CLASS + '_tree_item')) {
                    return false;
                }
                if (dragElement.classList.contains(consts_1.ITEM_CLASS)) {
                    path += dragElement.getAttribute('data-name');
                    if (!self.options.moveFile) {
                        return false;
                    }
                }
                self.dataProvider
                    .move(path, this.getAttribute('data-path') || '', this.getAttribute('data-source') || '', dragElement.classList.contains(consts_1.ITEM_CLASS))
                    .then(function (resp) {
                    if (self.options.isSuccess(resp)) {
                        self.loadTree();
                    }
                    else {
                        self.status(self.options.getMessage(resp));
                    }
                }, self.status);
                dragElement = false;
            }
        }, 'a')
            .on(self.files, 'contextmenu', contextMenu_1.default(self), 'a')
            .on(self.files, 'click', function (e) {
            if (!ctrlKey_1.ctrlKey(e)) {
                _this.state.activeElements = [];
            }
        })
            .on(self.files, 'click', function (e) {
            var item = self.elementToItem(this);
            if (!item) {
                return;
            }
            if (!ctrlKey_1.ctrlKey(e)) {
                self.state.activeElements = [item];
            }
            else {
                self.state.activeElements = tslib_1.__spreadArrays(self.state.activeElements, [
                    item
                ]);
            }
            e.stopPropagation();
            return false;
        }, 'a')
            .on(self.files, 'dragstart', function () {
            if (self.options.moveFile) {
                dragElement = this;
            }
        }, 'a')
            .on(self.dialog.container, 'drop', function (e) {
            return e.preventDefault();
        });
    };
    FileBrowser.prototype.initUploader = function (editor) {
        var _this = this;
        var _a, _b;
        var self = this, uploaderOptions = extend_1.extend(true, {}, Config_1.Config.defaultOptions.uploader, self.options.uploader, tslib_1.__assign({}, (_b = (_a = editor) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.uploader));
        var uploadHandler = function () {
            _this.loadItems();
        };
        self.uploader = self.getInstance('Uploader', uploaderOptions);
        self.uploader.setPath(self.dataProvider.currentPath);
        self.uploader.setSource(self.dataProvider.currentSource);
        self.uploader.bind(self.browser, uploadHandler, self.errorHandler);
        self.events.on('bindUploader.filebrowser', function (button) {
            self.uploader.bind(button, uploadHandler, self.errorHandler);
        });
    };
    FileBrowser.prototype.destruct = function () {
        if (this.isInDestruct) {
            return;
        }
        this.dialog.destruct();
        delete this.dialog;
        this.events && this.events.off('.filebrowser');
        this.uploader && this.uploader.destruct();
        delete this.uploader;
        _super.prototype.destruct.call(this);
    };
    return FileBrowser;
}(viewWithToolbar_1.ViewWithToolbar));
exports.FileBrowser = FileBrowser;


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = __webpack_require__(4);
var icon_1 = __webpack_require__(5);
var helpers_1 = __webpack_require__(3);
var consts_1 = __webpack_require__(40);
Config_1.Config.prototype.filebrowser = {
    extraButtons: [],
    filter: function (item, search) {
        search = search.toLowerCase();
        if (typeof item === 'string') {
            return item.toLowerCase().indexOf(search) !== -1;
        }
        if ('string' === typeof item.name) {
            return item.name.toLowerCase().indexOf(search) !== -1;
        }
        if ('string' === typeof item.file) {
            return item.file.toLowerCase().indexOf(search) !== -1;
        }
        return true;
    },
    sortBy: 'changed-desc',
    sort: function (a, b, sortBy) {
        var _a = sortBy.toLowerCase().split('-'), sortAttr = _a[0], arrow = _a[1], asc = arrow === 'asc';
        var compareStr = function (f, s) {
            if (f < s) {
                return asc ? -1 : 1;
            }
            if (f > s) {
                return asc ? 1 : -1;
            }
            return 0;
        };
        if (typeof a === 'string') {
            return compareStr(a.toLowerCase(), b.toLowerCase());
        }
        if (a[sortAttr] === undefined || sortAttr === 'name') {
            if (typeof a.name === 'string') {
                return compareStr(a.name.toLowerCase(), b.name.toLowerCase());
            }
            if (typeof a.file === 'string') {
                return compareStr(a.file.toLowerCase(), b.file.toLowerCase());
            }
            return 0;
        }
        switch (sortAttr) {
            case 'changed': {
                var f = new Date(a.changed).getTime(), s = new Date(b.changed).getTime();
                return asc ? f - s : s - f;
            }
            case 'size': {
                var f = helpers_1.humanSizeToBytes(a.size), s = helpers_1.humanSizeToBytes(b.size);
                return asc ? f - s : s - f;
            }
        }
        return 0;
    },
    editImage: true,
    preview: true,
    showPreviewNavigation: true,
    showSelectButtonInPreview: true,
    contextMenu: true,
    howLongShowMsg: 3000,
    createNewFolder: true,
    deleteFolder: true,
    moveFolder: true,
    moveFile: true,
    showFoldersPanel: true,
    width: 859,
    height: 400,
    buttons: [
        'filebrowser.upload',
        'filebrowser.remove',
        'filebrowser.update',
        'filebrowser.select',
        'filebrowser.edit',
        '|',
        'filebrowser.tiles',
        'filebrowser.list',
        '|',
        'filebrowser.filter',
        '|',
        'filebrowser.sort'
    ],
    removeButtons: [],
    fullsize: false,
    showTooltip: true,
    view: null,
    isSuccess: function (resp) {
        return resp.success;
    },
    getMessage: function (resp) {
        return resp.data.messages !== undefined &&
            Array.isArray(resp.data.messages)
            ? resp.data.messages.join(' ')
            : '';
    },
    showFileName: true,
    showFileSize: true,
    showFileChangeTime: true,
    saveStateInStorage: true,
    getThumbTemplate: function (item, source, source_name) {
        var opt = this.options, showName = opt.showFileName, showSize = opt.showFileSize && item.size, showTime = opt.showFileChangeTime && item.time;
        var name = '', info;
        if (item.file !== undefined) {
            name = item.file;
        }
        info = "<div class=\"" + consts_1.ITEM_CLASS + "-info\">" + (showName ? "<span class=\"" + consts_1.ITEM_CLASS + "-info-filename\">" + name + "</span>" : '') + (showSize
            ? "<span class=\"" + consts_1.ITEM_CLASS + "-info-filesize\">" + item.size + "</span>"
            : '') + (showTime
            ? "<span class=\"" + consts_1.ITEM_CLASS + "-info-filechanged\">" + showTime + "</span>"
            : '') + "</div>";
        return "<a\n\t\t\tdata-is-file=\"" + (item.isImage ? 0 : 1) + "\"\n\t\t\tdraggable=\"true\"\n\t\t\tclass=\"" + consts_1.ITEM_CLASS + "\"\n\t\t\thref=\"" + item.fileURL + "\"\n\t\t\tdata-source=\"" + source_name + "\"\n\t\t\tdata-path=\"" + item.path + "\"\n\t\t\tdata-name=\"" + name + "\"\n\t\t\ttitle=\"" + name + "\"\n\t\t\tdata-url=\"" + item.fileURL + "\">\n\t\t\t\t<img\n\t\t\t\t\tdata-is-file=\"" + (item.isImage ? 0 : 1) + "\"\n\t\t\t\t\tdata-src=\"" + item.fileURL + "\"\n\t\t\t\t\tsrc=\"" + item.imageURL + "\"\n\t\t\t\t\talt=\"" + name + "\"\n\t\t\t\t\tloading=\"lazy\"\n\t\t\t\t/>\n\t\t\t\t" + (showName || showSize || showTime ? info : '') + "\n\t\t\t</a>";
    },
    ajax: {
        url: '',
        async: true,
        data: {},
        cache: true,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        method: 'POST',
        processData: true,
        dataType: 'json',
        headers: {},
        prepareData: function (data) {
            return data;
        },
        process: function (resp) {
            return resp;
        }
    },
    create: {
        data: { action: 'folderCreate' }
    },
    getLocalFileByUrl: {
        data: { action: 'getLocalFileByUrl' }
    },
    resize: {
        data: { action: 'imageResize' }
    },
    crop: {
        data: { action: 'imageCrop' }
    },
    fileMove: {
        data: { action: 'fileMove' }
    },
    folderMove: {
        data: { action: 'folderMove' }
    },
    fileRename: {
        data: { action: 'fileRename' }
    },
    folderRename: {
        data: { action: 'folderRename' }
    },
    fileRemove: {
        data: { action: 'fileRemove' }
    },
    folderRemove: {
        data: { action: 'folderRemove' }
    },
    items: {
        data: { action: 'files' }
    },
    folder: {
        data: { action: 'folders' }
    },
    permissions: {
        data: { action: 'permissions' }
    },
    uploader: null,
    defaultCallback: function (filebrowser, data) {
        var jodit = filebrowser.jodit;
        if (jodit && jodit.isJodit) {
            if (data.files && data.files.length) {
                data.files.forEach(function (file, i) {
                    var url = data.baseurl + file;
                    var isImage = data.isImages ? data.isImages[i] : false;
                    if (isImage) {
                        jodit.selection.insertImage(url, null, jodit.options.imageDefaultWidth);
                    }
                    else {
                        jodit.selection.insertNode(jodit.create.inside.fromHTML("<a href=\"" + url + "\" title=\"" + url + "\">" + url + "</a>"));
                    }
                });
                filebrowser.close();
            }
        }
    }
};
Config_1.Config.prototype.controls.filebrowser = {
    upload: {
        icon: 'plus',
        isInput: true,
        exec: function () {
        },
        isDisable: function (browser) {
            return !browser.dataProvider.canI('FileUpload');
        },
        getContent: function (filebrowser, control) {
            var btn = filebrowser.create.fromHTML('<span class="jodit_upload_button">' +
                icon_1.ToolbarIcon.getIcon('plus') +
                '<input type="file" accept="' +
                (filebrowser.state.onlyImages ? 'image/*' : '*') +
                '" tabindex="-1" dir="auto" multiple=""/>' +
                '</span>'), input = btn.querySelector('input');
            filebrowser.events
                .on('updateToolbar', function () {
                if (control && control.isDisable) {
                    control.isDisable(filebrowser, control)
                        ? input.setAttribute('disabled', 'disabled')
                        : input.removeAttribute('disabled');
                }
            })
                .fire('bindUploader.filebrowser', btn);
            return btn;
        }
    },
    remove: {
        icon: 'bin',
        isDisable: function (browser) {
            return (!browser.state.activeElements.length ||
                !browser.dataProvider.canI('FileRemove'));
        },
        exec: function (editor) {
            editor.events.fire('fileRemove.filebrowser');
        }
    },
    update: {
        exec: function (editor) {
            editor.events.fire('update.filebrowser');
        }
    },
    select: {
        icon: 'check',
        isDisable: function (browser) {
            return !browser.state.activeElements.length;
        },
        exec: function (editor) {
            editor.events.fire('select.filebrowser');
        }
    },
    edit: {
        icon: 'pencil',
        isDisable: function (browser) {
            var selected = browser.state.activeElements;
            return (selected.length !== 1 ||
                !selected[0].isImage ||
                !(browser.dataProvider.canI('ImageCrop') ||
                    browser.dataProvider.canI('ImageResize')));
        },
        exec: function (editor) {
            editor.events.fire('edit.filebrowser');
        }
    },
    tiles: {
        icon: 'th',
        isActive: function (filebrowser) {
            return filebrowser.state.view === 'tiles';
        },
        exec: function (filebrowser) {
            filebrowser.events.fire('view.filebrowser', 'tiles');
        }
    },
    list: {
        icon: 'th-list',
        isActive: function (filebrowser) {
            return filebrowser.state.view === 'list';
        },
        exec: function (filebrowser) {
            filebrowser.events.fire('view.filebrowser', 'list');
        }
    },
    filter: {
        isInput: true,
        getContent: function (filebrowser) {
            var input = filebrowser.create.element('input', {
                class: 'jodit_input',
                placeholder: filebrowser.i18n('Filter')
            });
            filebrowser.events.on(input, 'keydown mousedown', filebrowser.async.debounce(function () {
                filebrowser.events.fire('filter.filebrowser', input.value);
            }, filebrowser.defaultTimeout));
            return input;
        }
    },
    sort: {
        isInput: true,
        getContent: function (fb) {
            var select = fb.create.fromHTML('<select class="jodit_input jodit_select">' +
                ("<option value=\"changed-asc\">" + fb.i18n('Sort by changed') + " (\u2B06)</option>") +
                ("<option value=\"changed-desc\">" + fb.i18n('Sort by changed') + " (\u2B07)</option>") +
                ("<option value=\"name-asc\">" + fb.i18n('Sort by name') + " (\u2B06)</option>") +
                ("<option value=\"name-desc\">" + fb.i18n('Sort by name') + " (\u2B07)</option>") +
                ("<option value=\"size-asc\">" + fb.i18n('Sort by size') + " (\u2B06)</option>") +
                ("<option value=\"size-desc\">" + fb.i18n('Sort by size') + " (\u2B07)</option>") +
                '</select>');
            fb.events
                .on('sort.filebrowser', function (value) {
                if (select.value !== value) {
                    select.value = value;
                }
            })
                .on(select, 'change', function () {
                fb.events.fire('sort.filebrowser', select.value);
            });
            return select;
        }
    }
};


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(3);
var Ajax_1 = __webpack_require__(38);
exports.DEFAULT_SOURCE_NAME = 'default';
var possableRules = [
    'allowFiles',
    'allowFileMove',
    'allowFileUpload',
    'allowFileUploadRemote',
    'allowFileRemove',
    'allowFileRename',
    'allowFolders',
    'allowFolderMove',
    'allowFolderCreate',
    'allowFolderRemove',
    'allowFolderRename',
    'allowImageResize',
    'allowImageCrop'
];
var dataProvider = (function () {
    function dataProvider(options, parent) {
        var _this = this;
        this.options = options;
        this.parent = parent;
        this.__currentPermissions = null;
        this.currentPath = '';
        this.currentSource = exports.DEFAULT_SOURCE_NAME;
        this.currentBaseUrl = '';
        this.getPathByUrl = function (url, success, onFailed) {
            var action = 'getLocalFileByUrl';
            _this.options[action].data.url = url;
            return _this.get(action, function (resp) {
                if (_this.options.isSuccess(resp)) {
                    success(resp.data.path, resp.data.name, resp.data.source);
                }
                else {
                    onFailed(helpers_1.error(_this.options.getMessage(resp)));
                }
            }, onFailed);
        };
    }
    dataProvider.prototype.canI = function (action) {
        var rule = 'allow' + action;
        if (false) {}
        return (this.__currentPermissions === null ||
            this.__currentPermissions[rule] === undefined ||
            this.__currentPermissions[rule]);
    };
    dataProvider.prototype.get = function (name, success, error) {
        var opts = helpers_1.extend(true, {}, this.options.ajax, this.options[name] !== undefined
            ? this.options[name]
            : this.options.ajax);
        if (opts.prepareData) {
            opts.data = opts.prepareData.call(this, opts.data);
        }
        var ajax = new Ajax_1.Ajax(this.parent, opts);
        var promise = ajax.send();
        if (success) {
            promise.then(success);
        }
        if (error) {
            promise.catch(error);
        }
        return promise;
    };
    dataProvider.prototype.permissions = function (path, source) {
        if (path === void 0) { path = this.currentPath; }
        if (source === void 0) { source = this.currentSource; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (!this.options.permissions) {
                    return [2, Promise.resolve()];
                }
                this.options.permissions.data.path = path;
                this.options.permissions.data.source = source;
                if (this.options.permissions.url) {
                    return [2, this.get('permissions').then(function (resp) {
                            var process = _this.options.permissions.process;
                            if (!process) {
                                process = _this.options.ajax.process;
                            }
                            if (process) {
                                var respData = process.call(self, resp);
                                if (respData.data.permissions) {
                                    _this.__currentPermissions = respData.data.permissions;
                                }
                            }
                        })];
                }
                return [2, Promise.resolve()];
            });
        });
    };
    dataProvider.prototype.items = function (path, source) {
        if (path === void 0) { path = this.currentPath; }
        if (source === void 0) { source = this.currentSource; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var opt;
            return tslib_1.__generator(this, function (_a) {
                opt = this.options;
                if (!opt.items) {
                    return [2, Promise.reject('Set Items api options')];
                }
                opt.items.data.path = path;
                opt.items.data.source = source;
                return [2, this.get('items')];
            });
        });
    };
    dataProvider.prototype.tree = function (path, source) {
        if (path === void 0) { path = this.currentPath; }
        if (source === void 0) { source = this.currentSource; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = helpers_1.normalizeRelativePath(path);
                        return [4, this.permissions(path, source)];
                    case 1:
                        _a.sent();
                        if (!this.options.folder) {
                            return [2, Promise.reject('Set Folder Api options')];
                        }
                        this.options.folder.data.path = path;
                        this.options.folder.data.source = source;
                        return [2, this.get('folder')];
                }
            });
        });
    };
    dataProvider.prototype.createFolder = function (name, path, source) {
        var _this = this;
        if (!this.options.create) {
            return Promise.reject('Set Create api options');
        }
        this.options.create.data.source = source;
        this.options.create.data.path = path;
        this.options.create.data.name = name;
        return this.get('create').then(function (resp) {
            _this.currentPath = path;
            _this.currentSource = source;
            return resp;
        });
    };
    dataProvider.prototype.move = function (filepath, path, source, isFile) {
        var mode = isFile
            ? 'fileMove'
            : 'folderMove';
        var option = this.options[mode];
        if (!option) {
            return Promise.reject('Set Move api options');
        }
        option.data.from = filepath;
        option.data.path = path;
        option.data.source = source;
        return this.get(mode);
    };
    dataProvider.prototype.fileRemove = function (path, file, source) {
        if (!this.options.fileRemove) {
            return Promise.reject('Set fileRemove api options');
        }
        this.options.fileRemove.data.path = path;
        this.options.fileRemove.data.name = file;
        this.options.fileRemove.data.source = source;
        return this.get('fileRemove');
    };
    dataProvider.prototype.folderRemove = function (path, file, source) {
        if (!this.options.folderRemove) {
            return Promise.reject('Set folderRemove api options');
        }
        this.options.folderRemove.data.path = path;
        this.options.folderRemove.data.name = file;
        this.options.folderRemove.data.source = source;
        return this.get('folderRemove');
    };
    dataProvider.prototype.folderRename = function (path, name, newname, source) {
        if (!this.options.folderRename) {
            return Promise.reject('Set folderRename api options');
        }
        this.options.folderRename.data.path = path;
        this.options.folderRename.data.name = name;
        this.options.folderRename.data.newname = newname;
        this.options.folderRename.data.source = source;
        return this.get('folderRename');
    };
    dataProvider.prototype.fileRename = function (path, name, newname, source) {
        if (!this.options.fileRename) {
            return Promise.reject('Set fileRename api options');
        }
        this.options.fileRename.data.path = path;
        this.options.fileRename.data.name = name;
        this.options.fileRename.data.newname = newname;
        this.options.fileRename.data.source = source;
        return this.get('fileRename');
    };
    dataProvider.prototype.crop = function (path, source, name, newname, box) {
        if (!this.options.crop) {
            this.options.crop = {
                data: {}
            };
        }
        if (this.options.crop.data === undefined) {
            this.options.crop.data = {
                action: 'crop'
            };
        }
        this.options.crop.data.newname = newname || name;
        if (box) {
            this.options.crop.data.box = box;
        }
        this.options.crop.data.path = path;
        this.options.crop.data.name = name;
        this.options.crop.data.source = source;
        return this.get('crop');
    };
    dataProvider.prototype.resize = function (path, source, name, newname, box) {
        if (!this.options.resize) {
            this.options.resize = {
                data: {}
            };
        }
        if (this.options.resize.data === undefined) {
            this.options.resize.data = {
                action: 'resize'
            };
        }
        this.options.resize.data.newname = newname || name;
        if (box) {
            this.options.resize.data.box = box;
        }
        this.options.resize.data.path = path;
        this.options.resize.data.name = name;
        this.options.resize.data.source = source;
        return this.get('resize');
    };
    return dataProvider;
}());
exports.default = dataProvider;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var ContextMenu_1 = __webpack_require__(39);
var dialog_1 = __webpack_require__(13);
var Dom_1 = __webpack_require__(1);
var __1 = __webpack_require__(28);
var consts_1 = __webpack_require__(40);
var CLASS_PREVIEW = consts_1.F_CLASS + '_preview_', preview_tpl_next = function (next, right) {
    if (next === void 0) { next = 'next'; }
    if (right === void 0) { right = 'right'; }
    return "<a href=\"javascript:void(0)\" class=\"" + CLASS_PREVIEW + "navigation " + CLASS_PREVIEW + "navigation-" + next + "\">" +
        '' +
        __1.ToolbarIcon.getIcon('angle-' + right) +
        '</a>';
};
exports.default = (function (self) {
    if (!self.options.contextMenu) {
        return function () { };
    }
    var contextmenu = new ContextMenu_1.ContextMenu(self.jodit || self);
    return function (e) {
        var _this = this;
        var _a;
        var item = this, opt = self.options, ga = function (attr) { return item.getAttribute(attr) || ''; };
        self.async.setTimeout(function () {
            contextmenu.show(e.pageX, e.pageY, [
                ga('data-is-file') !== '1' &&
                    opt.editImage &&
                    (self.dataProvider.canI('ImageResize') ||
                        self.dataProvider.canI('ImageCrop'))
                    ? {
                        icon: 'pencil',
                        title: 'Edit',
                        exec: function () {
                            self.openImageEditor(ga('href'), ga('data-name'), ga('data-path'), ga('data-source'));
                        }
                    }
                    : false,
                self.dataProvider.canI('FileRename')
                    ? {
                        icon: 'italic',
                        title: 'Rename',
                        exec: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                self.events.fire('fileRename.filebrowser', ga('data-name'), ga('data-path'), ga('data-source'));
                                return [2];
                            });
                        }); }
                    }
                    : false,
                self.dataProvider.canI('FileRemove')
                    ? {
                        icon: 'bin',
                        title: 'Delete',
                        exec: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, self.deleteFile(ga('data-name'), ga('data-source'))];
                                    case 1:
                                        _a.sent();
                                        self.state.activeElements = [];
                                        self.loadTree();
                                        return [2];
                                }
                            });
                        }); }
                    }
                    : false,
                opt.preview
                    ? {
                        icon: 'eye',
                        title: 'Preview',
                        exec: function () {
                            var _a, _b;
                            var preview = new dialog_1.Dialog(self), temp_content = self.create.div(consts_1.F_CLASS + '_preview', consts_1.ICON_LOADER), preview_box = self.create.div(consts_1.F_CLASS + '_preview_box'), next = self.create.fromHTML(preview_tpl_next()), prev = self.create.fromHTML(preview_tpl_next('prev', 'left')), addLoadHandler = function (src) {
                                var image = self.create.element('img');
                                image.setAttribute('src', src);
                                var onload = function () {
                                    var _a, _b;
                                    if (self.isInDestruct) {
                                        return;
                                    }
                                    self.events.off(image, 'load');
                                    Dom_1.Dom.detach(temp_content);
                                    if (opt.showPreviewNavigation) {
                                        if (Dom_1.Dom.prevWithClass(item, consts_1.ITEM_CLASS)) {
                                            temp_content.appendChild(prev);
                                        }
                                        if (Dom_1.Dom.nextWithClass(item, consts_1.ITEM_CLASS)) {
                                            temp_content.appendChild(next);
                                        }
                                    }
                                    temp_content.appendChild(preview_box);
                                    preview_box.appendChild(image);
                                    preview.setPosition();
                                    (_b = (_a = self) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.fire('previewOpenedAndLoaded');
                                };
                                self.events.on(image, 'load', onload);
                                if (image.complete) {
                                    onload();
                                }
                            };
                            self.events.on([next, prev], 'click', function () {
                                if (this.classList.contains(CLASS_PREVIEW +
                                    'navigation-next')) {
                                    item = (Dom_1.Dom.nextWithClass(item, consts_1.ITEM_CLASS));
                                }
                                else {
                                    item = (Dom_1.Dom.prevWithClass(item, consts_1.ITEM_CLASS));
                                }
                                if (!item) {
                                    throw helpers_1.error('Need element');
                                }
                                Dom_1.Dom.detach(temp_content);
                                Dom_1.Dom.detach(preview_box);
                                temp_content.innerHTML = consts_1.ICON_LOADER;
                                addLoadHandler(ga('href'));
                            });
                            preview.container.classList.add(consts_1.F_CLASS + '_preview_dialog');
                            preview.setContent(temp_content);
                            preview.setPosition();
                            preview.open();
                            addLoadHandler(ga('href'));
                            (_b = (_a = self) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.on('beforeDestruct', function () {
                                preview.destruct();
                            }).fire('previewOpened');
                        }
                    }
                    : false,
                {
                    icon: 'upload',
                    title: 'Download',
                    exec: function () {
                        var url = ga('href');
                        if (url) {
                            self.ownerWindow.open(url);
                        }
                    }
                }
            ], self.dialog.getZIndex() + 1);
        }, self.defaultTimeout);
        (_a = self) === null || _a === void 0 ? void 0 : _a.events.on('beforeDestruct', function () {
            contextmenu.destruct();
        });
        e.stopPropagation();
        e.preventDefault();
        return false;
    };
});
var helpers_1 = __webpack_require__(3);


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright 2013-2020 Valeriy Chupurnov https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var ObserveObject = (function () {
    function ObserveObject(data) {
        var _this = this;
        this.data = data;
        this.__onEvents = {};
        this.__lockEvent = {};
        Object.keys(data).forEach(function (key) {
            Object.defineProperty(_this, key, {
                set: function (value) {
                    _this.fire(['beforeChange', "beforeChange." + key], key, value);
                    data[key] = value;
                    _this.fire(['change', "change." + key], key, value);
                },
                get: function () {
                    return data[key];
                }
            });
        });
    }
    ObserveObject.prototype.on = function (event, callback) {
        var _this = this;
        if (Array.isArray(event)) {
            event.map(function (e) { return _this.on(e, callback); });
            return this;
        }
        if (!this.__onEvents[event]) {
            this.__onEvents[event] = [];
        }
        this.__onEvents[event].push(callback);
        return this;
    };
    ObserveObject.prototype.fire = function (event) {
        var _this = this;
        var attr = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            attr[_i - 1] = arguments[_i];
        }
        if (Array.isArray(event)) {
            event.map(function (e) { return _this.fire.apply(_this, tslib_1.__spreadArrays([e], attr)); });
            return;
        }
        try {
            if (!this.__lockEvent[event] && this.__onEvents[event]) {
                this.__lockEvent[event] = true;
                this.__onEvents[event].forEach(function (clb) { return clb.call.apply(clb, tslib_1.__spreadArrays([_this], attr)); });
            }
        }
        catch (_a) { }
        finally {
            this.__lockEvent[event] = false;
        }
    };
    ObserveObject.create = function (data) {
        return (new ObserveObject(data));
    };
    return ObserveObject;
}());
exports.ObserveObject = ObserveObject;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var extend_1 = __webpack_require__(14);
var normalize_1 = __webpack_require__(18);
var FileBrowserItem = (function () {
    function FileBrowserItem(data) {
        this.data = data;
        extend_1.extend(this, data);
    }
    FileBrowserItem.create = function (data) {
        return (new FileBrowserItem(data));
    };
    Object.defineProperty(FileBrowserItem.prototype, "path", {
        get: function () {
            return normalize_1.normalizePath(this.data.source.path ? this.data.source.path + '/' : '/');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileBrowserItem.prototype, "imageURL", {
        get: function () {
            var timestamp = new Date().getTime().toString(), _a = this.data, thumbIsAbsolute = _a.thumbIsAbsolute, source = _a.source, thumb = _a.thumb, file = _a.file, path = thumb || file;
            return (thumbIsAbsolute && path) ?
                path :
                normalize_1.normalizeURL(source.baseurl, source.path, path || '') + '?_tmst=' + timestamp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileBrowserItem.prototype, "fileURL", {
        get: function () {
            var _a = this.data, name = _a.name, file = _a.file, fileIsAbsolute = _a.fileIsAbsolute, source = _a.source;
            if (file !== undefined) {
                name = file;
            }
            return (fileIsAbsolute && name) ? name : normalize_1.normalizeURL(source.baseurl, source.path, name || '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileBrowserItem.prototype, "time", {
        get: function () {
            var changed = this.data.changed;
            return (changed &&
                (typeof changed === 'number' ? new Date(changed).toLocaleString() : changed)) || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileBrowserItem.prototype, "uniqueHashKey", {
        get: function () {
            var data = this.data;
            var key = [data.sourceName, data.name, data.file, this.time, data.thumb].join('_');
            key = key.toLowerCase().replace(/[^0-9a-z\-.]/g, '-');
            return key;
        },
        enumerable: true,
        configurable: true
    });
    return FileBrowserItem;
}());
exports.FileBrowserItem = FileBrowserItem;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var Component_1 = __webpack_require__(7);
var dialog_1 = __webpack_require__(13);
var helpers_1 = __webpack_require__(3);
var icon_1 = __webpack_require__(5);
var Dom_1 = __webpack_require__(1);
Config_1.Config.prototype.imageeditor = {
    min_width: 20,
    min_height: 20,
    closeAfterSave: false,
    width: '85%',
    height: '85%',
    crop: true,
    resize: true,
    resizeUseRatio: true,
    resizeMinWidth: 20,
    resizeMinHeight: 20,
    cropUseRatio: true,
    cropDefaultWidth: '70%',
    cropDefaultHeight: '70%'
};
var jie = 'jodit_image_editor';
var gi = icon_1.ToolbarIcon.getIcon.bind(icon_1.ToolbarIcon);
var ImageEditor = (function (_super) {
    tslib_1.__extends(ImageEditor, _super);
    function ImageEditor(editor) {
        var _this = _super.call(this, editor) || this;
        _this.resizeUseRatio = true;
        _this.cropUseRatio = true;
        _this.clicked = false;
        _this.activeTab = 'resize';
        _this.cropBox = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        _this.resizeBox = {
            w: 0,
            h: 0
        };
        _this.calcValueByPercent = function (value, percent) {
            var percentStr = percent.toString();
            var valueNbr = parseFloat(value.toString());
            var match;
            match = /^[\-+]?[0-9]+(px)?$/.exec(percentStr);
            if (match) {
                return parseInt(percentStr, 10);
            }
            match = /^([\-+]?[0-9.]+)%$/.exec(percentStr);
            if (match) {
                return Math.round(valueNbr * (parseFloat(match[1]) / 100));
            }
            return valueNbr || 0;
        };
        _this.calcCropBox = function () {
            var w = _this.crop_box.parentNode.offsetWidth * 0.8, h = _this.crop_box.parentNode.offsetHeight * 0.8;
            var wn = w, hn = h;
            if (w > _this.naturalWidth && h > _this.naturalHeight) {
                wn = _this.naturalWidth;
                hn = _this.naturalHeight;
            }
            else if (_this.ratio > w / h) {
                wn = w;
                hn = _this.naturalHeight * (w / _this.naturalWidth);
            }
            else {
                wn = _this.naturalWidth * (h / _this.naturalHeight);
                hn = h;
            }
            helpers_1.css(_this.crop_box, {
                width: wn,
                height: hn
            });
        };
        _this.showCrop = function () {
            if (!_this.cropImage) {
                return;
            }
            _this.calcCropBox();
            var w = _this.cropImage.offsetWidth ||
                _this.image.offsetWidth ||
                _this.image.naturalWidth;
            _this.new_w = _this.calcValueByPercent(w, _this.options.cropDefaultWidth);
            var h = _this.cropImage.offsetHeight ||
                _this.image.offsetHeight ||
                _this.image.naturalHeight;
            if (_this.cropUseRatio) {
                _this.new_h = _this.new_w / _this.ratio;
            }
            else {
                _this.new_h = _this.calcValueByPercent(h, _this.options.cropDefaultHeight);
            }
            helpers_1.css(_this.cropHandler, {
                backgroundImage: 'url(' + _this.cropImage.getAttribute('src') + ')',
                width: _this.new_w,
                height: _this.new_h,
                left: w / 2 - _this.new_w / 2,
                top: h / 2 - _this.new_h / 2
            });
            _this.jodit.events.fire(_this.cropHandler, 'updatesize');
        };
        _this.updateCropBox = function () {
            if (!_this.cropImage) {
                return;
            }
            var ratioX = _this.cropImage.offsetWidth / _this.naturalWidth, ratioY = _this.cropImage.offsetHeight / _this.naturalHeight;
            _this.cropBox.x = helpers_1.css(_this.cropHandler, 'left') / ratioX;
            _this.cropBox.y = helpers_1.css(_this.cropHandler, 'top') / ratioY;
            _this.cropBox.w = _this.cropHandler.offsetWidth / ratioX;
            _this.cropBox.h = _this.cropHandler.offsetHeight / ratioY;
            _this.sizes.textContent =
                _this.cropBox.w.toFixed(0) + 'x' + _this.cropBox.h.toFixed(0);
        };
        _this.updateResizeBox = function () {
            _this.resizeBox.w = _this.image.offsetWidth || _this.naturalWidth;
            _this.resizeBox.h = _this.image.offsetHeight || _this.naturalHeight;
        };
        _this.setHandlers = function () {
            var self = _this;
            self.jodit.events
                .on([
                self.editor.querySelector('.jodit_bottomright'),
                self.cropHandler
            ], "mousedown." + jie, function (e) {
                self.target = e.target;
                e.preventDefault();
                e.stopImmediatePropagation();
                self.clicked = true;
                self.start_x = e.clientX;
                self.start_y = e.clientY;
                if (self.activeTab === 'crop') {
                    self.top_x = helpers_1.css(self.cropHandler, 'left');
                    self.top_y = helpers_1.css(self.cropHandler, 'top');
                    self.width = self.cropHandler.offsetWidth;
                    self.height = self.cropHandler.offsetHeight;
                }
                else {
                    self.width = self.image.offsetWidth;
                    self.height = self.image.offsetHeight;
                }
            })
                .off(_this.jodit.ownerWindow, "." + jie + self.jodit.id)
                .on(_this.jodit.ownerWindow, "mousemove." + jie + self.jodit.id, _this.jodit.async.throttle(function (e) {
                if (self.clicked) {
                    self.diff_x = e.clientX - self.start_x;
                    self.diff_y = e.clientY - self.start_y;
                    if ((self.activeTab === 'resize' &&
                        self.resizeUseRatio) ||
                        (self.activeTab === 'crop' && self.cropUseRatio)) {
                        if (self.diff_x) {
                            self.new_w = self.width + self.diff_x;
                            self.new_h = Math.round(self.new_w / self.ratio);
                        }
                        else {
                            self.new_h = self.height + self.diff_y;
                            self.new_w = Math.round(self.new_h * self.ratio);
                        }
                    }
                    else {
                        self.new_w = self.width + self.diff_x;
                        self.new_h = self.height + self.diff_y;
                    }
                    if (self.activeTab === 'resize') {
                        if (self.new_w > self.options.resizeMinWidth) {
                            helpers_1.css(self.image, 'width', self.new_w + 'px');
                            self.widthInput.value = self.new_w.toString();
                        }
                        if (self.new_h > self.options.resizeMinHeight) {
                            helpers_1.css(self.image, 'height', self.new_h + 'px');
                            self.heightInput.value = self.new_h.toString();
                        }
                        _this.jodit.events.fire(self.resizeHandler, 'updatesize');
                    }
                    else {
                        if (self.target !== self.cropHandler) {
                            if (self.top_x + self.new_w >
                                self.cropImage.offsetWidth) {
                                self.new_w =
                                    self.cropImage.offsetWidth - self.top_x;
                            }
                            if (self.top_y + self.new_h >
                                self.cropImage.offsetHeight) {
                                self.new_h =
                                    self.cropImage.offsetHeight -
                                        self.top_y;
                            }
                            helpers_1.css(self.cropHandler, {
                                width: self.new_w,
                                height: self.new_h
                            });
                        }
                        else {
                            if (self.top_x +
                                self.diff_x +
                                self.cropHandler.offsetWidth >
                                self.cropImage.offsetWidth) {
                                self.diff_x =
                                    self.cropImage.offsetWidth -
                                        self.top_x -
                                        self.cropHandler.offsetWidth;
                            }
                            helpers_1.css(self.cropHandler, 'left', self.top_x + self.diff_x);
                            if (self.top_y +
                                self.diff_y +
                                self.cropHandler.offsetHeight >
                                self.cropImage.offsetHeight) {
                                self.diff_y =
                                    self.cropImage.offsetHeight -
                                        self.top_y -
                                        self.cropHandler.offsetHeight;
                            }
                            helpers_1.css(self.cropHandler, 'top', self.top_y + self.diff_y);
                        }
                        _this.jodit.events.fire(self.cropHandler, 'updatesize');
                    }
                    e.stopImmediatePropagation();
                }
            }, 5))
                .on(_this.jodit.ownerWindow, "resize." + jie + self.jodit.id, function () {
                _this.jodit.events.fire(self.resizeHandler, 'updatesize');
                self.showCrop();
                _this.jodit.events.fire(self.cropHandler, 'updatesize');
            })
                .on(_this.jodit.ownerWindow, "mouseup." + jie + " " + self.jodit.id + " keydown." + jie +
                self.jodit.id, function (e) {
                if (self.clicked) {
                    self.clicked = false;
                    e.stopImmediatePropagation();
                }
            });
            helpers_1.$$('.jodit_button_group', self.editor).forEach(function (group) {
                var input = group.querySelector('input');
                self.jodit.events.on(group, 'click change', function () {
                    input.checked = !input.checked;
                    self.jodit.events.fire(input, 'change');
                }, 'button');
            });
            self.jodit.events
                .on(_this.editor, 'click.' + jie, function () {
                helpers_1.$$("." + jie + "_slider,." + jie + "_area", self.editor).forEach(function (elm) { return elm.classList.remove('active'); });
                var slide = this.parentNode;
                slide.classList.add('active');
                self.activeTab =
                    slide.getAttribute('data-area') ||
                        'resize';
                var tab = self.editor.querySelector("." + jie + "_area." + jie + "_area_" + self.activeTab);
                if (tab) {
                    tab.classList.add('active');
                }
                if (self.activeTab === 'crop') {
                    self.showCrop();
                }
            }, "." + jie + "_slider-title")
                .on(self.widthInput, "change." + jie + " mousedown." + jie + " keydown." + jie, self.jodit.async.debounce(function () {
                var value = parseInt(self.widthInput.value, 10);
                var another;
                if (value > self.options.min_width) {
                    helpers_1.css(self.image, 'width', value + 'px');
                    if (self.resizeUseRatio) {
                        another = Math.round(value / self.ratio);
                        if (another > self.options.min_height) {
                            helpers_1.css(self.image, 'height', another + 'px');
                            self.heightInput.value = another.toString();
                        }
                    }
                }
                _this.jodit.events.fire(self.resizeHandler, 'updatesize');
            }, 200))
                .on(self.heightInput, "change." + jie + " mousedown." + jie + " keydown." + jie, self.jodit.async.debounce(function () {
                if (_this.isDestructed) {
                    return;
                }
                var value = parseInt(self.heightInput.value, 10);
                var another;
                if (value > self.options.min_height) {
                    helpers_1.css(self.image, 'height', value + 'px');
                    if (self.resizeUseRatio) {
                        another = Math.round(value * self.ratio);
                        if (another > self.options.min_width) {
                            helpers_1.css(self.image, 'width', another + 'px');
                            self.widthInput.value = another.toString();
                        }
                    }
                }
                _this.jodit.events.fire(self.resizeHandler, 'updatesize');
            }, 200));
            var rationResizeButton = self.editor.querySelector("." + jie + "_keep_spect_ratio");
            if (rationResizeButton) {
                rationResizeButton.addEventListener('change', function () {
                    self.resizeUseRatio = rationResizeButton.checked;
                });
            }
            var rationCropButton = self.editor.querySelector("." + jie + "_keep_spect_ratio_crop");
            if (rationCropButton) {
                rationCropButton.addEventListener('change', function () {
                    self.cropUseRatio = rationCropButton.checked;
                });
            }
            self.jodit.events
                .on(self.resizeHandler, 'updatesize', function () {
                helpers_1.css(self.resizeHandler, {
                    top: 0,
                    left: 0,
                    width: (self.image.offsetWidth || self.naturalWidth) + 'px',
                    height: (self.image.offsetHeight || self.naturalHeight) + 'px'
                });
                _this.updateResizeBox();
            })
                .on(self.cropHandler, 'updatesize', function () {
                if (!self.cropImage) {
                    return;
                }
                var new_x = helpers_1.css(self.cropHandler, 'left'), new_y = helpers_1.css(self.cropHandler, 'top'), new_width = self.cropHandler.offsetWidth, new_height = self.cropHandler.offsetHeight;
                if (new_x < 0) {
                    new_x = 0;
                }
                if (new_y < 0) {
                    new_y = 0;
                }
                if (new_x + new_width > self.cropImage.offsetWidth) {
                    new_width = self.cropImage.offsetWidth - new_x;
                    if (self.cropUseRatio) {
                        new_height = new_width / self.ratio;
                    }
                }
                if (new_y + new_height > self.cropImage.offsetHeight) {
                    new_height = self.cropImage.offsetHeight - new_y;
                    if (self.cropUseRatio) {
                        new_width = new_height * self.ratio;
                    }
                }
                helpers_1.css(self.cropHandler, {
                    width: new_width,
                    height: new_height,
                    left: new_x,
                    top: new_y,
                    backgroundPosition: -new_x - 1 + 'px ' + (-new_y - 1) + 'px',
                    backgroundSize: self.cropImage.offsetWidth +
                        'px ' +
                        self.cropImage.offsetHeight +
                        'px'
                });
                self.updateCropBox();
            });
            self.buttons.forEach(function (button) {
                button.addEventListener('mousedown', function (e) {
                    e.stopImmediatePropagation();
                });
                button.addEventListener('click', function () {
                    var data = {
                        action: self.activeTab,
                        box: self.activeTab === 'resize'
                            ? self.resizeBox
                            : self.cropBox
                    };
                    switch (button.getAttribute('data-action')) {
                        case 'saveas':
                            dialog_1.Promt(self.jodit.i18n('Enter new name'), self.jodit.i18n('Save in new file'), function (name) {
                                if (!helpers_1.trim(name)) {
                                    dialog_1.Alert(self.jodit.i18n('The name should not be empty'));
                                    return false;
                                }
                                self.onSave(name, data, self.hide, function (e) {
                                    dialog_1.Alert(e.message);
                                });
                            });
                            break;
                        case 'save':
                            self.onSave(undefined, data, self.hide, function (e) {
                                dialog_1.Alert(e.message);
                            });
                            break;
                        case 'reset':
                            if (self.activeTab === 'resize') {
                                helpers_1.css(self.image, {
                                    width: null,
                                    height: null
                                });
                                self.widthInput.value = self.naturalWidth.toString();
                                self.heightInput.value = self.naturalHeight.toString();
                                self.jodit.events.fire(self.resizeHandler, 'updatesize');
                            }
                            else {
                                self.showCrop();
                            }
                            break;
                    }
                });
            });
        };
        _this.hide = function () {
            _this.dialog.close();
        };
        _this.open = function (url, save) {
            return _this.jodit.async.promise(function (resolve) {
                var timestamp = new Date().getTime();
                _this.image = _this.jodit.create.element('img');
                helpers_1.$$('img,.jodit_icon-loader', _this.resize_box).forEach(Dom_1.Dom.safeRemove);
                helpers_1.$$('img,.jodit_icon-loader', _this.crop_box).forEach(Dom_1.Dom.safeRemove);
                helpers_1.css(_this.cropHandler, 'background', 'transparent');
                _this.onSave = save;
                _this.resize_box.appendChild(_this.jodit.create.element('i', { class: 'jodit_icon-loader' }));
                _this.crop_box.appendChild(_this.jodit.create.element('i', { class: 'jodit_icon-loader' }));
                if (/\?/.test(url)) {
                    url += '&_tst=' + timestamp;
                }
                else {
                    url += '?_tst=' + timestamp;
                }
                _this.image.setAttribute('src', url);
                _this.dialog.open();
                var onload = function () {
                    if (_this.isDestructed) {
                        return;
                    }
                    _this.image.removeEventListener('load', onload);
                    _this.naturalWidth = _this.image.naturalWidth;
                    _this.naturalHeight = _this.image.naturalHeight;
                    _this.widthInput.value = _this.naturalWidth.toString();
                    _this.heightInput.value = _this.naturalHeight.toString();
                    _this.ratio = _this.naturalWidth / _this.naturalHeight;
                    _this.resize_box.appendChild(_this.image);
                    _this.cropImage = _this.image.cloneNode(true);
                    _this.crop_box.appendChild(_this.cropImage);
                    helpers_1.$$('.jodit_icon-loader', _this.editor).forEach(Dom_1.Dom.safeRemove);
                    if (_this.activeTab === 'crop') {
                        _this.showCrop();
                    }
                    _this.jodit.events.fire(_this.resizeHandler, 'updatesize');
                    _this.jodit.events.fire(_this.cropHandler, 'updatesize');
                    _this.dialog.setPosition();
                    _this.jodit.events.fire('afterImageEditor');
                    resolve(_this.dialog);
                };
                _this.image.addEventListener('load', onload);
                if (_this.image.complete) {
                    onload();
                }
            });
        };
        _this.options =
            editor && editor.options
                ? editor.options.imageeditor
                : Config_1.Config.defaultOptions.imageeditor;
        var o = _this.options;
        var i = editor.i18n;
        _this.resizeUseRatio = o.resizeUseRatio;
        _this.cropUseRatio = o.cropUseRatio;
        var r = _this.resizeUseRatio;
        var c = _this.cropUseRatio;
        _this.buttons = [
            _this.jodit.create.fromHTML('<button data-action="reset" type="button" class="jodit_button">' +
                gi('update') +
                '&nbsp;' +
                i('Reset') +
                '</button>'),
            _this.jodit.create.fromHTML('<button data-action="save" type="button" class="jodit_button jodit_button_success">' +
                gi('save') +
                '&nbsp;' +
                i('Save') +
                '</button>'),
            _this.jodit.create.fromHTML('<button data-action="saveas" type="button" class="jodit_button jodit_button_success">' +
                gi('save') +
                '&nbsp;' +
                i('Save as ...') +
                '</button>')
        ];
        _this.activeTab = o.resize ? 'resize' : 'crop';
        var act = function (el, className) {
            if (className === void 0) { className = 'active'; }
            return el ? className : '';
        };
        var switcher = function (label, className, active) {
            if (active === void 0) { active = true; }
            return "<div class=\"jodit_form_group\">\n\t\t\t<label>" + i(label) + "</label>\n\t\t\t<div class=\"jodit_button_group jodit_button_radio_group\">\n\t\t\t\t<input " + act(active, 'checked') + " type=\"checkbox\" class=\"" + jie + "_" + className + " jodit_input\"/>\n\n\t\t\t\t<button type=\"button\" data-yes=\"1\" class=\"jodit_button jodit_status_success\">" + i('Yes') + "</button>\n\n\t\t\t\t<button type=\"button\" class=\"jodit_button jodit_status_danger\">" + i('No') + "</button>\n\t\t\t</div>\n\t\t</div>";
        };
        _this.editor = _this.jodit.create.fromHTML("<form class=\"" + jie + " jodit_properties\">\n\t\t\t\t\t\t\t<div class=\"jodit_grid\">\n\t\t\t\t\t\t\t\t<div class=\"jodit_col-lg-3-4\">\n\t\t\t\t\t\t\t\t" + (o.resize
            ? "<div class=\"" + jie + "_area " + jie + "_area_resize active\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"" + jie + "_box\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"" + jie + "_resizer\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"jodit_bottomright\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>"
            : '') + "\n\t\t\t\t\t\t\t\t" + (o.crop
            ? "<div class=\"" + jie + "_area " + jie + "_area_crop " + act(!o.resize) + "\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"" + jie + "_box\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"" + jie + "_croper\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"jodit_bottomright\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"jodit_sizes\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>"
            : '') + "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"jodit_col-lg-1-4\">\n\t\t\t\t\t\t\t\t" + (o.resize
            ? "<div data-area=\"resize\" class=\"" + jie + "_slider active\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"" + jie + "_slider-title\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t" + gi('resize') + "\n\t\t\t\t\t\t\t\t\t\t\t\t\t" + i('Resize') + "\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"" + jie + "_slider-content\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"" + jie + "_width\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + i('Width') + "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"" + jie + "_width jodit_input\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"jodit_form_group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"" + jie + "_height\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + i('Height') + "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"number\" class=\"" + jie + "_height jodit_input\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t" + switcher('Keep Aspect Ratio', 'keep_spect_ratio', r) + "\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>"
            : '') + "\n\t\t\t\t\t\t\t\t" + (o.crop
            ? "<div data-area=\"crop\" class=\"" + jie + "_slider " + act(!o.resize) + "'\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"" + jie + "_slider-title\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t" + gi('crop') + "\n\t\t\t\t\t\t\t\t\t\t\t\t\t" + i('Crop') + "\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"" + jie + "_slider-content\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t" + switcher('Keep Aspect Ratio', 'keep_spect_ratio_crop', c) + "\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>"
            : '') + "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</form>");
        _this.widthInput = _this.editor.querySelector("." + jie + "_width");
        _this.heightInput = _this.editor.querySelector("." + jie + "_height");
        _this.resize_box = _this.editor.querySelector("." + jie + "_area." + jie + "_area_resize ." + jie + "_box");
        _this.crop_box = _this.editor.querySelector("." + jie + "_area." + jie + "_area_crop ." + jie + "_box");
        _this.sizes = _this.editor.querySelector("." + jie + "_area." + jie + "_area_crop .jodit_sizes");
        _this.resizeHandler = _this.editor.querySelector("." + jie + "_resizer");
        _this.cropHandler = _this.editor.querySelector("." + jie + "_croper");
        _this.dialog = new dialog_1.Dialog(editor);
        _this.dialog.setContent(_this.editor);
        _this.dialog.setSize(_this.options.width, _this.options.height);
        _this.dialog.setTitle(_this.buttons);
        _this.setHandlers();
        return _this;
    }
    ImageEditor.prototype.destruct = function () {
        if (this.isDestructed) {
            return;
        }
        if (this.dialog) {
            this.dialog.destruct();
            delete this.dialog;
        }
        Dom_1.Dom.safeRemove(this.editor);
        delete this.widthInput;
        delete this.heightInput;
        delete this.resize_box;
        delete this.crop_box;
        delete this.sizes;
        delete this.resizeHandler;
        delete this.cropHandler;
        delete this.editor;
        if (this.jodit.events) {
            this.jodit.events.off("." + jie);
        }
        _super.prototype.destruct.call(this);
    };
    return ImageEditor;
}(Component_1.Component));
exports.ImageEditor = ImageEditor;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var Config_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(2);
var Ajax_1 = __webpack_require__(38);
var helpers_1 = __webpack_require__(3);
var Dom_1 = __webpack_require__(1);
var isJoditObject_1 = __webpack_require__(15);
var Component_1 = __webpack_require__(7);
Config_1.Config.prototype.enableDragAndDropFileToEditor = true;
Config_1.Config.prototype.uploader = {
    url: '',
    insertImageAsBase64URI: false,
    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
    headers: null,
    data: null,
    filesVariableName: function (i) {
        return "files[" + i + "]";
    },
    withCredentials: false,
    pathVariableName: 'path',
    format: 'json',
    method: 'POST',
    prepareData: function (formData) {
        return formData;
    },
    isSuccess: function (resp) {
        return resp.success;
    },
    getMessage: function (resp) {
        return resp.data.messages !== undefined &&
            Array.isArray(resp.data.messages)
            ? resp.data.messages.join(' ')
            : '';
    },
    process: function (resp) {
        return resp.data;
    },
    error: function (e) {
        this.jodit.events.fire('errorMessage', e.message, 'error', 4000);
    },
    defaultHandlerSuccess: function (resp) {
        var _this = this;
        if (resp.files && resp.files.length) {
            resp.files.forEach(function (filename, index) {
                var _a = resp.isImages && resp.isImages[index]
                    ? ['img', 'src']
                    : ['a', 'href'], tagName = _a[0], attr = _a[1];
                var elm = _this.jodit.create.inside.element(tagName);
                elm.setAttribute(attr, resp.baseurl + filename);
                if (tagName === 'a') {
                    elm.textContent = resp.baseurl + filename;
                }
                if (isJoditObject_1.isJoditObject(_this.jodit)) {
                    if (tagName === 'img') {
                        _this.jodit.selection.insertImage(elm, null, _this.jodit.options.imageDefaultWidth);
                    }
                    else {
                        _this.jodit.selection.insertNode(elm);
                    }
                }
            });
        }
    },
    defaultHandlerError: function (e) {
        this.jodit.events.fire('errorMessage', e.message);
    },
    contentType: function (requestData) {
        return this.jodit.ownerWindow.FormData !== undefined &&
            typeof requestData !== 'string'
            ? false
            : 'application/x-www-form-urlencoded; charset=UTF-8';
    }
};
var Uploader = (function (_super) {
    tslib_1.__extends(Uploader, _super);
    function Uploader(editor, options) {
        var _this = _super.call(this, editor) || this;
        _this.path = '';
        _this.source = 'default';
        _this.ajaxInstances = [];
        _this.options = helpers_1.extend(true, {}, Config_1.Config.defaultOptions.uploader, isJoditObject_1.isJoditObject(editor) ? editor.options.uploader : null, options);
        return _this;
    }
    Uploader.dataURItoBlob = function (dataURI) {
        var byteString = atob(dataURI.split(',')[1]), mimeString = dataURI
            .split(',')[0]
            .split(':')[1]
            .split(';')[0], ab = new ArrayBuffer(byteString.length), ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    };
    Uploader.prototype.buildData = function (data) {
        if (this.options.buildData &&
            typeof this.options.buildData === 'function') {
            return this.options.buildData.call(this, data);
        }
        var FD = this.jodit.ownerWindow.FormData;
        if (FD !== undefined) {
            if (data instanceof FD) {
                return data;
            }
            if (typeof data === 'string') {
                return data;
            }
            var newdata_1 = new FD();
            Object.keys(data).forEach(function (key) {
                newdata_1.append(key, data[key]);
            });
            return newdata_1;
        }
        return data;
    };
    Uploader.prototype.send = function (data, success) {
        var _this = this;
        var requestData = this.buildData(data), sendData = function (request) {
            var ajax = new Ajax_1.Ajax(_this.jodit || _this, {
                xhr: function () {
                    var xhr = new XMLHttpRequest();
                    if (_this.jodit.ownerWindow.FormData !==
                        undefined &&
                        xhr.upload) {
                        xhr.upload.addEventListener('progress', function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                percentComplete *= 100;
                                _this.jodit.progressbar
                                    .show()
                                    .progress(percentComplete);
                                if (percentComplete >= 100) {
                                    _this.jodit.progressbar.hide();
                                }
                            }
                        }, false);
                    }
                    else {
                        _this.jodit.progressbar.hide();
                    }
                    return xhr;
                },
                method: _this.options.method || 'POST',
                data: request,
                url: _this.options.url,
                headers: _this.options.headers,
                queryBuild: _this.options.queryBuild,
                contentType: _this.options.contentType.call(_this, request),
                dataType: _this.options.format || 'json',
                withCredentials: _this.options.withCredentials || false
            });
            _this.ajaxInstances.push(ajax);
            var removeAjaxInstanceFromList = function () {
                var index = _this.ajaxInstances.indexOf(ajax);
                if (index !== -1) {
                    _this.ajaxInstances.splice(index, 1);
                }
            };
            return ajax
                .send()
                .then(function (resp) {
                removeAjaxInstanceFromList();
                success.call(_this, resp);
            })
                .catch(function (error) {
                removeAjaxInstanceFromList();
                _this.options.error.call(_this, error);
            });
        };
        if (requestData instanceof Promise) {
            return requestData.then(sendData).catch(function (error) {
                _this.options.error.call(_this, error);
            });
        }
        else {
            return sendData(requestData);
        }
    };
    Uploader.prototype.sendFiles = function (files, handlerSuccess, handlerError, process) {
        var _this = this;
        if (!files) {
            return Promise.reject(helpers_1.error('Need files'));
        }
        var uploader = this;
        var fileList = Array.from(files);
        if (!fileList.length) {
            return Promise.reject(helpers_1.error('Need files'));
        }
        var promises = [];
        if (this.options.insertImageAsBase64URI) {
            var file_1, i = void 0;
            var _loop_1 = function () {
                file_1 = fileList[i];
                if (file_1 && file_1.type) {
                    var mime = file_1.type.match(/\/([a-z0-9]+)/i);
                    var extension = mime[1]
                        ? mime[1].toLowerCase()
                        : '';
                    if (this_1.options.imagesExtensions.includes(extension)) {
                        var reader_1 = new FileReader();
                        promises.push(new Promise(function (resolve, reject) {
                            reader_1.onerror = reject;
                            reader_1.onloadend = function () {
                                var resp = {
                                    baseurl: '',
                                    files: [reader_1.result],
                                    isImages: [true]
                                };
                                if (typeof (handlerSuccess ||
                                    uploader.options
                                        .defaultHandlerSuccess) === 'function') {
                                    (handlerSuccess ||
                                        uploader.options
                                            .defaultHandlerSuccess).call(uploader, resp);
                                }
                                resolve(resp);
                            };
                            reader_1.readAsDataURL(file_1);
                        }));
                        fileList[i] = null;
                    }
                }
            };
            var this_1 = this;
            for (i = 0; i < fileList.length; i += 1) {
                _loop_1();
            }
        }
        fileList = fileList.filter(function (a) { return a; });
        if (fileList.length) {
            var form_1 = new FormData();
            form_1.append(this.options.pathVariableName, uploader.path);
            form_1.append('source', uploader.source);
            var file = void 0;
            for (var i = 0; i < fileList.length; i += 1) {
                file = fileList[i];
                if (file) {
                    var mime = file.type.match(/\/([a-z0-9]+)/i);
                    var extension = mime && mime[1] ? mime[1].toLowerCase() : '';
                    var newName = fileList[i].name ||
                        Math.random()
                            .toString()
                            .replace('.', '');
                    if (extension) {
                        var extForReg = extension;
                        if (['jpeg', 'jpg'].includes(extForReg)) {
                            extForReg = 'jpeg|jpg';
                        }
                        var reEnd = new RegExp('.(' + extForReg + ')$', 'i');
                        if (!reEnd.test(newName)) {
                            newName += '.' + extension;
                        }
                    }
                    form_1.append(this.options.filesVariableName(i), fileList[i], newName);
                }
            }
            if (process) {
                process(form_1);
            }
            if (uploader.options.data && helpers_1.isPlainObject(uploader.options.data)) {
                Object.keys(uploader.options.data).forEach(function (key) {
                    form_1.append(key, uploader.options.data[key]);
                });
            }
            uploader.options.prepareData.call(this, form_1);
            promises.push(uploader
                .send(form_1, function (resp) {
                if (_this.options.isSuccess.call(uploader, resp)) {
                    if (typeof (handlerSuccess ||
                        uploader.options.defaultHandlerSuccess) === 'function') {
                        (handlerSuccess ||
                            uploader.options
                                .defaultHandlerSuccess).call(uploader, uploader.options.process.call(uploader, resp));
                    }
                }
                else {
                    if (typeof (handlerError ||
                        uploader.options.defaultHandlerError)) {
                        (handlerError ||
                            uploader.options
                                .defaultHandlerError).call(uploader, helpers_1.error(uploader.options.getMessage.call(uploader, resp)));
                        return;
                    }
                }
            })
                .then(function () {
                _this.jodit.events &&
                    _this.jodit.events.fire('filesWereUploaded');
            }));
        }
        return Promise.all(promises);
    };
    Uploader.prototype.setPath = function (path) {
        this.path = path;
    };
    Uploader.prototype.setSource = function (source) {
        this.source = source;
    };
    Uploader.prototype.bind = function (form, handlerSuccess, handlerError) {
        var _this = this;
        var self = this, onPaste = function (e) {
            var i, file, extension, cData = e.clipboardData;
            var process = function (formdata) {
                if (file) {
                    formdata.append('extension', extension);
                    formdata.append('mimetype', file.type);
                }
            };
            if (cData && cData.files && cData.files.length) {
                _this.sendFiles(cData.files, handlerSuccess, handlerError);
                return false;
            }
            if (helpers_1.browser('ff') || constants_1.IS_IE) {
                if (cData &&
                    (!cData.types.length ||
                        cData.types[0] !== constants_1.TEXT_PLAIN)) {
                    var div_1 = _this.jodit.create.div('', {
                        tabindex: -1,
                        style: 'left: -9999px; top: 0; width: 0; height: 100%;line-height: 140%; ' +
                            'overflow: hidden; position: fixed; z-index: 2147483647; word-break: break-all;',
                        contenteditable: true
                    });
                    _this.jodit.ownerDocument.body.appendChild(div_1);
                    var selection_1 = _this.jodit && isJoditObject_1.isJoditObject(_this.jodit)
                        ? _this.jodit.selection.save()
                        : null, restore_1 = function () {
                        return selection_1 &&
                            _this.jodit &&
                            isJoditObject_1.isJoditObject(_this.jodit) &&
                            _this.jodit.selection.restore(selection_1);
                    };
                    div_1.focus();
                    _this.jodit.async.setTimeout(function () {
                        var child = div_1.firstChild;
                        Dom_1.Dom.safeRemove(div_1);
                        if (child && child.hasAttribute('src')) {
                            var src = child.getAttribute('src') || '';
                            restore_1();
                            self.sendFiles([Uploader.dataURItoBlob(src)], handlerSuccess, handlerError);
                        }
                    }, _this.jodit.defaultTimeout);
                }
                return;
            }
            if (cData && cData.items && cData.items.length) {
                var items = cData.items;
                for (i = 0; i < items.length; i += 1) {
                    if (items[i].kind === 'file' &&
                        items[i].type === 'image/png') {
                        file = items[i].getAsFile();
                        if (file) {
                            var mime = file.type.match(/\/([a-z0-9]+)/i);
                            extension = mime[1]
                                ? mime[1].toLowerCase()
                                : '';
                            _this.sendFiles([file], handlerSuccess, handlerError, process);
                        }
                        e.preventDefault();
                        break;
                    }
                }
            }
        };
        if (this.jodit && this.jodit.editor !== form) {
            self.jodit.events.on(form, 'paste', onPaste);
        }
        else {
            self.jodit.events.on('beforePaste', onPaste);
        }
        var hasFiles = function (event) {
            return Boolean(event.dataTransfer &&
                event.dataTransfer.files &&
                event.dataTransfer.files.length !== 0);
        };
        self.jodit.events
            .on(form, 'dragend dragover dragenter dragleave drop', function (e) {
            e.preventDefault();
        })
            .on(form, 'dragover', function (event) {
            if (hasFiles(event)) {
                form.classList.contains('jodit_draghover') ||
                    form.classList.add('jodit_draghover');
                event.preventDefault();
            }
        })
            .on(form, 'dragend', function (event) {
            if (hasFiles(event)) {
                form.classList.contains('jodit_draghover') &&
                    form.classList.remove('jodit_draghover');
                event.preventDefault();
            }
        })
            .on(form, 'drop', function (event) {
            form.classList.remove('jodit_draghover');
            if (hasFiles(event) &&
                event.dataTransfer &&
                event.dataTransfer.files) {
                event.preventDefault();
                event.stopImmediatePropagation();
                _this.sendFiles(event.dataTransfer.files, handlerSuccess, handlerError);
            }
        });
        var inputFile = form.querySelector('input[type=file]');
        if (inputFile) {
            self.jodit.events.on(inputFile, 'change', function () {
                self.sendFiles(this.files, handlerSuccess, handlerError).then(function () {
                    inputFile.value = '';
                    if (!/safari/i.test(navigator.userAgent)) {
                        inputFile.type = '';
                        inputFile.type = 'file';
                    }
                });
            });
        }
    };
    Uploader.prototype.uploadRemoteImage = function (url, handlerSuccess, handlerError) {
        var _this = this;
        var uploader = this;
        uploader.send({
            action: 'fileUploadRemote',
            url: url
        }, function (resp) {
            if (uploader.options.isSuccess.call(uploader, resp)) {
                if (typeof handlerSuccess === 'function') {
                    handlerSuccess.call(uploader, _this.options.process.call(_this, resp));
                }
                else {
                    _this.options.defaultHandlerSuccess.call(uploader, _this.options.process.call(_this, resp));
                }
            }
            else {
                if (typeof (handlerError || uploader.options.defaultHandlerError) === 'function') {
                    (handlerError || _this.options.defaultHandlerError).call(uploader, helpers_1.error(uploader.options.getMessage.call(_this, resp)));
                    return;
                }
            }
        });
    };
    Uploader.prototype.destruct = function () {
        this.setStatus(Component_1.STATUSES.beforeDestruct);
        this.ajaxInstances.forEach(function (ajax) {
            try {
                ajax.abort();
            }
            catch (_a) { }
        });
        delete this.options;
        _super.prototype.destruct.call(this);
    };
    return Uploader;
}(Component_1.Component));
exports.Uploader = Uploader;


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2020 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
var about = __webpack_require__(207);
exports.about = about;
var addcolumn = __webpack_require__(208);
exports.addcolumn = addcolumn;
var addrow = __webpack_require__(209);
exports.addrow = addrow;
var angle_down = __webpack_require__(210);
exports.angle_down = angle_down;
var angle_left = __webpack_require__(211);
exports.angle_left = angle_left;
var angle_right = __webpack_require__(212);
exports.angle_right = angle_right;
var angle_up = __webpack_require__(213);
exports.angle_up = angle_up;
var arrows_alt = __webpack_require__(214);
exports.arrows_alt = arrows_alt;
var arrows_h = __webpack_require__(215);
exports.arrows_h = arrows_h;
var attachment = __webpack_require__(216);
exports.attachment = attachment;
var bin = __webpack_require__(217);
exports.bin = bin;
var bold = __webpack_require__(218);
exports.bold = bold;
var brush = __webpack_require__(219);
exports.brush = brush;
var cancel = __webpack_require__(220);
exports.cancel = cancel;
var center = __webpack_require__(221);
exports.center = center;
var chain_broken = __webpack_require__(222);
exports.chain_broken = chain_broken;
var check = __webpack_require__(223);
exports.check = check;
var check_square = __webpack_require__(224);
exports.check_square = check_square;
var copyformat = __webpack_require__(225);
exports.copyformat = copyformat;
var crop = __webpack_require__(226);
exports.crop = crop;
var copy = __webpack_require__(227);
exports.copy = copy;
var cut = __webpack_require__(228);
exports.cut = cut;
var dedent = __webpack_require__(229);
exports.dedent = dedent;
var dots = __webpack_require__(230);
exports.dots = dots;
var dropdown_arrow = __webpack_require__(231);
exports.dropdown_arrow = dropdown_arrow;
var enter = __webpack_require__(232);
exports.enter = enter;
var eraser = __webpack_require__(233);
exports.eraser = eraser;
var eye = __webpack_require__(234);
exports.eye = eye;
var file = __webpack_require__(235);
exports.file = file;
var folder = __webpack_require__(236);
exports.folder = folder;
var font = __webpack_require__(237);
exports.font = font;
var fontsize = __webpack_require__(238);
exports.fontsize = fontsize;
var fullsize = __webpack_require__(239);
exports.fullsize = fullsize;
var hr = __webpack_require__(240);
exports.hr = hr;
var image = __webpack_require__(241);
exports.image = image;
var indent = __webpack_require__(242);
exports.indent = indent;
var info_circle = __webpack_require__(243);
exports.info_circle = info_circle;
var italic = __webpack_require__(244);
exports.italic = italic;
var justify = __webpack_require__(245);
exports.justify = justify;
var left = __webpack_require__(246);
exports.left = left;
var link = __webpack_require__(247);
exports.link = link;
var lock = __webpack_require__(248);
exports.lock = lock;
var menu = __webpack_require__(249);
exports.menu = menu;
var merge = __webpack_require__(250);
exports.merge = merge;
var ol = __webpack_require__(251);
exports.ol = ol;
var omega = __webpack_require__(252);
exports.omega = omega;
var outdent = __webpack_require__(253);
exports.outdent = outdent;
var palette = __webpack_require__(254);
exports.palette = palette;
var paragraph = __webpack_require__(255);
exports.paragraph = paragraph;
var paste = __webpack_require__(256);
exports.paste = paste;
var pencil = __webpack_require__(257);
exports.pencil = pencil;
var plus = __webpack_require__(258);
exports.plus = plus;
var print = __webpack_require__(259);
exports.print = print;
var redo = __webpack_require__(260);
exports.redo = redo;
var resize = __webpack_require__(261);
exports.resize = resize;
var resizer = __webpack_require__(262);
exports.resizer = resizer;
var right = __webpack_require__(263);
exports.right = right;
var save = __webpack_require__(264);
exports.save = save;
var select_all = __webpack_require__(265);
exports.select_all = select_all;
var shrink = __webpack_require__(266);
exports.shrink = shrink;
var source = __webpack_require__(267);
exports.source = source;
var splitg = __webpack_require__(268);
exports.splitg = splitg;
var splitv = __webpack_require__(269);
exports.splitv = splitv;
var strikethrough = __webpack_require__(270);
exports.strikethrough = strikethrough;
var subscript = __webpack_require__(271);
exports.subscript = subscript;
var superscript = __webpack_require__(272);
exports.superscript = superscript;
var table = __webpack_require__(273);
exports.table = table;
var th = __webpack_require__(274);
exports.th = th;
var th_list = __webpack_require__(275);
exports.th_list = th_list;
var ul = __webpack_require__(276);
exports.ul = ul;
var underline = __webpack_require__(277);
exports.underline = underline;
var undo = __webpack_require__(278);
exports.undo = undo;
var unlink = __webpack_require__(279);
exports.unlink = unlink;
var unlock = __webpack_require__(280);
exports.unlock = unlock;
var update = __webpack_require__(281);
exports.update = update;
var upload = __webpack_require__(282);
exports.upload = upload;
var valign = __webpack_require__(283);
exports.valign = valign;
var video = __webpack_require__(284);
exports.video = video;


/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z\"/> </svg> "

/***/ }),
/* 208 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 18.151 18.151\"> <g> <g> <path d=\"M6.237,16.546H3.649V1.604h5.916v5.728c0.474-0.122,0.968-0.194,1.479-0.194 c0.042,0,0.083,0.006,0.125,0.006V0H2.044v18.15h5.934C7.295,17.736,6.704,17.19,6.237,16.546z\"/> <path d=\"M11.169,8.275c-2.723,0-4.938,2.215-4.938,4.938s2.215,4.938,4.938,4.938s4.938-2.215,4.938-4.938 S13.892,8.275,11.169,8.275z M11.169,16.81c-1.983,0-3.598-1.612-3.598-3.598c0-1.983,1.614-3.597,3.598-3.597 s3.597,1.613,3.597,3.597C14.766,15.198,13.153,16.81,11.169,16.81z\"/> <polygon points=\"11.792,11.073 10.502,11.073 10.502,12.578 9.03,12.578 9.03,13.868 10.502,13.868 10.502,15.352 11.792,15.352 11.792,13.868 13.309,13.868 13.309,12.578 11.792,12.578 \"/> </g> </g> </svg> "

/***/ }),
/* 209 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 432 432\"> <g> <g> <polygon points=\"203.688,96 0,96 0,144 155.688,144 \"/> <polygon points=\"155.719,288 0,288 0,336 203.719,336 \"/> <rect x=\"252\" y=\"96\"/> <rect/> <rect x=\"252\" y=\"288\"/> <rect y=\"384\"/> <path d=\"M97.844,230.125c-3.701-3.703-5.856-8.906-5.856-14.141s2.154-10.438,5.856-14.141l9.844-9.844H0v48h107.719 L97.844,230.125z\"/> <polygon points=\"232,176 232,96 112,216 232,336 232,256 432,256 432,176 \"/> </g> </g> </svg> "

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z\"/> </svg>"

/***/ }),
/* 211 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z\"/></svg>"

/***/ }),
/* 212 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z\"/></svg>"

/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1395 1184q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z\"/></svg>"

/***/ }),
/* 214 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1411 541l-355 355 355 355 144-144q29-31 70-14 39 17 39 59v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l144-144-355-355-355 355 144 144q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l144 144 355-355-355-355-144 144q-19 19-45 19-12 0-24-5-40-17-40-59v-448q0-26 19-45t45-19h448q42 0 59 40 17 39-14 69l-144 144 355 355 355-355-144-144q-31-30-14-69 17-40 59-40h448q26 0 45 19t19 45v448q0 42-39 59-13 5-25 5-26 0-45-19z\"/></svg>"

/***/ }),
/* 215 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1792 896q0 26-19 45l-256 256q-19 19-45 19t-45-19-19-45v-128h-1024v128q0 26-19 45t-45 19-45-19l-256-256q-19-19-19-45t19-45l256-256q19-19 45-19t45 19 19 45v128h1024v-128q0-26 19-45t45-19 45 19l256 256q19 19 19 45z\"/></svg>"

/***/ }),
/* 216 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1596 1385q0 117-79 196t-196 79q-135 0-235-100l-777-776q-113-115-113-271 0-159 110-270t269-111q158 0 273 113l605 606q10 10 10 22 0 16-30.5 46.5t-46.5 30.5q-13 0-23-10l-606-607q-79-77-181-77-106 0-179 75t-73 181q0 105 76 181l776 777q63 63 145 63 64 0 106-42t42-106q0-82-63-145l-581-581q-26-24-60-24-29 0-48 19t-19 48q0 32 25 59l410 410q10 10 10 22 0 16-31 47t-47 31q-12 0-22-10l-410-410q-63-61-63-149 0-82 57-139t139-57q88 0 149 63l581 581q100 98 100 235z\"/></svg>"

/***/ }),
/* 217 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z\"/></svg>"

/***/ }),
/* 218 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M747 1521q74 32 140 32 376 0 376-335 0-114-41-180-27-44-61.5-74t-67.5-46.5-80.5-25-84-10.5-94.5-2q-73 0-101 10 0 53-.5 159t-.5 158q0 8-1 67.5t-.5 96.5 4.5 83.5 12 66.5zm-14-746q42 7 109 7 82 0 143-13t110-44.5 74.5-89.5 25.5-142q0-70-29-122.5t-79-82-108-43.5-124-14q-50 0-130 13 0 50 4 151t4 152q0 27-.5 80t-.5 79q0 46 1 69zm-541 889l2-94q15-4 85-16t106-27q7-12 12.5-27t8.5-33.5 5.5-32.5 3-37.5.5-34v-65.5q0-982-22-1025-4-8-22-14.5t-44.5-11-49.5-7-48.5-4.5-30.5-3l-4-83q98-2 340-11.5t373-9.5q23 0 68.5.5t67.5.5q70 0 136.5 13t128.5 42 108 71 74 104.5 28 137.5q0 52-16.5 95.5t-39 72-64.5 57.5-73 45-84 40q154 35 256.5 134t102.5 248q0 100-35 179.5t-93.5 130.5-138 85.5-163.5 48.5-176 14q-44 0-132-3t-132-3q-106 0-307 11t-231 12z\"/></svg>"

/***/ }),
/* 219 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M896 1152q0-36-20-69-1-1-15.5-22.5t-25.5-38-25-44-21-50.5q-4-16-21-16t-21 16q-7 23-21 50.5t-25 44-25.5 38-15.5 22.5q-20 33-20 69 0 53 37.5 90.5t90.5 37.5 90.5-37.5 37.5-90.5zm512-128q0 212-150 362t-362 150-362-150-150-362q0-145 81-275 6-9 62.5-90.5t101-151 99.5-178 83-201.5q9-30 34-47t51-17 51.5 17 33.5 47q28 93 83 201.5t99.5 178 101 151 62.5 90.5q81 127 81 275z\"/></svg>"

/***/ }),
/* 220 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\"> <g transform=\"translate(0,-1036.3622)\"> <path d=\"m 2,1050.3622 12,-12\" style=\"fill:none;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\"/> <path d=\"m 2,1038.3622 12,12\" style=\"fill:none;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\"/> </g> </svg> "

/***/ }),
/* 221 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h896q26 0 45 19t19 45zm256-384v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-640q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h640q26 0 45 19t19 45z\"/></svg>"

/***/ }),
/* 222 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M503 1271l-256 256q-10 9-23 9-12 0-23-9-9-10-9-23t9-23l256-256q10-9 23-9t23 9q9 10 9 23t-9 23zm169 41v320q0 14-9 23t-23 9-23-9-9-23v-320q0-14 9-23t23-9 23 9 9 23zm-224-224q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23 9-23 23-9h320q14 0 23 9t9 23zm1264 128q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-334-335q-21-21-42-56l239-18 273 274q27 27 68 27.5t68-26.5l147-146q28-28 28-67 0-40-28-68l-274-275 18-239q35 21 56 42l336 336q84 86 84 204zm-617-724l-239 18-273-274q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l274 274-18 240q-35-21-56-42l-336-336q-84-86-84-204 0-120 85-203l147-146q83-83 203-83 121 0 204 85l334 335q21 21 42 56zm633 84q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23 9-23 23-9h320q14 0 23 9t9 23zm-544-544v320q0 14-9 23t-23 9-23-9-9-23v-320q0-14 9-23t23-9 23 9 9 23zm407 151l-256 256q-11 9-23 9t-23-9q-9-10-9-23t9-23l256-256q10-9 23-9t23 9q9 10 9 23t-9 23z\"/></svg>"

/***/ }),
/* 223 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1472 930v318q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-10 10-23 10-3 0-9-2-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-254q0-13 9-22l64-64q10-10 23-10 6 0 12 3 20 8 20 29zm231-489l-814 814q-24 24-57 24t-57-24l-430-430q-24-24-24-57t24-57l110-110q24-24 57-24t57 24l263 263 647-647q24-24 57-24t57 24l110 110q24 24 24 57t-24 57z\"/></svg>"

/***/ }),
/* 224 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M813 1299l614-614q19-19 19-45t-19-45l-102-102q-19-19-45-19t-45 19l-467 467-211-211q-19-19-45-19t-45 19l-102 102q-19 19-19 45t19 45l358 358q19 19 45 19t45-19zm851-883v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z\"/></svg>"

/***/ }),
/* 225 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\"><path d=\"M16 9v-6h-3v-1c0-0.55-0.45-1-1-1h-11c-0.55 0-1 0.45-1 1v3c0 0.55 0.45 1 1 1h11c0.55 0 1-0.45 1-1v-1h2v4h-9v2h-0.5c-0.276 0-0.5 0.224-0.5 0.5v5c0 0.276 0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5v-5c0-0.276-0.224-0.5-0.5-0.5h-0.5v-1h9zM12 3h-11v-1h11v1z\"/></svg> "

/***/ }),
/* 226 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M621 1280h595v-595zm-45-45l595-595h-595v595zm1152 77v192q0 14-9 23t-23 9h-224v224q0 14-9 23t-23 9h-192q-14 0-23-9t-9-23v-224h-864q-14 0-23-9t-9-23v-864h-224q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h224v-224q0-14 9-23t23-9h192q14 0 23 9t9 23v224h851l246-247q10-9 23-9t23 9q9 10 9 23t-9 23l-247 246v851h224q14 0 23 9t9 23z\"/> </svg>"

/***/ }),
/* 227 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M24.89,6.61H22.31V4.47A2.47,2.47,0,0,0,19.84,2H6.78A2.47,2.47,0,0,0,4.31,4.47V22.92a2.47,2.47,0,0,0,2.47,2.47H9.69V27.2a2.8,2.8,0,0,0,2.8,2.8h12.4a2.8,2.8,0,0,0,2.8-2.8V9.41A2.8,2.8,0,0,0,24.89,6.61ZM6.78,23.52a.61.61,0,0,1-.61-.6V4.47a.61.61,0,0,1,.61-.6H19.84a.61.61,0,0,1,.61.6V6.61h-8a2.8,2.8,0,0,0-2.8,2.8V23.52Zm19,3.68a.94.94,0,0,1-.94.93H12.49a.94.94,0,0,1-.94-.93V9.41a.94.94,0,0,1,.94-.93h12.4a.94.94,0,0,1,.94.93Z\"/> <path d=\"M23.49,13.53h-9.6a.94.94,0,1,0,0,1.87h9.6a.94.94,0,1,0,0-1.87Z\"/> <path d=\"M23.49,17.37h-9.6a.94.94,0,1,0,0,1.87h9.6a.94.94,0,1,0,0-1.87Z\"/> <path d=\"M23.49,21.22h-9.6a.93.93,0,1,0,0,1.86h9.6a.93.93,0,1,0,0-1.86Z\"/> </svg> "

/***/ }),
/* 228 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M960 896q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm300 64l507 398q28 20 25 56-5 35-35 51l-128 64q-13 7-29 7-17 0-31-8l-690-387-110 66q-8 4-12 5 14 49 10 97-7 77-56 147.5t-132 123.5q-132 84-277 84-136 0-222-78-90-84-79-207 7-76 56-147t131-124q132-84 278-84 83 0 151 31 9-13 22-22l122-73-122-73q-13-9-22-22-68 31-151 31-146 0-278-84-82-53-131-124t-56-147q-5-59 15.5-113t63.5-93q85-79 222-79 145 0 277 84 83 52 132 123t56 148q4 48-10 97 4 1 12 5l110 66 690-387q14-8 31-8 16 0 29 7l128 64q30 16 35 51 3 36-25 56zm-681-260q46-42 21-108t-106-117q-92-59-192-59-74 0-113 36-46 42-21 108t106 117q92 59 192 59 74 0 113-36zm-85 745q81-51 106-117t-21-108q-39-36-113-36-100 0-192 59-81 51-106 117t21 108q39 36 113 36 100 0 192-59zm178-613l96 58v-11q0-36 33-56l14-8-79-47-26 26q-3 3-10 11t-12 12q-2 2-4 3.5t-3 2.5zm224 224l96 32 736-576-128-64-768 431v113l-160 96 9 8q2 2 7 6 4 4 11 12t11 12l26 26zm704 416l128-64-520-408-177 138q-2 3-13 7z\"/> </svg>"

/***/ }),
/* 229 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M384 544v576q0 13-9.5 22.5t-22.5 9.5q-14 0-23-9l-288-288q-9-9-9-23t9-23l288-288q9-9 23-9 13 0 22.5 9.5t9.5 22.5zm1408 768v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5z\"/></svg>"

/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports = "<svg enable-background=\"new 0 0 24 24\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" > <circle cx=\"12\" cy=\"12\" r=\"2.2\"/> <circle cx=\"12\" cy=\"5\" r=\"2.2\"/> <circle cx=\"12\" cy=\"19\" r=\"2.2\"/> </svg> "

/***/ }),
/* 231 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 10 10\"> <path d=\"M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z\"/> </svg> "

/***/ }),
/* 232 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 128 128\" xml:space=\"preserve\"> <g> <polygon points=\"112.4560547,23.3203125 112.4560547,75.8154297 31.4853516,75.8154297 31.4853516,61.953125 16.0131836,72.6357422 0.5410156,83.3164063 16.0131836,93.9990234 31.4853516,104.6796875 31.4853516,90.8183594 112.4560547,90.8183594 112.4560547,90.8339844 127.4589844,90.8339844 127.4589844,23.3203125 \"/> </g> </svg>"

/***/ }),
/* 233 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M832 1408l336-384h-768l-336 384h768zm1013-1077q15 34 9.5 71.5t-30.5 65.5l-896 1024q-38 44-96 44h-768q-38 0-69.5-20.5t-47.5-54.5q-15-34-9.5-71.5t30.5-65.5l896-1024q38-44 96-44h768q38 0 69.5 20.5t47.5 54.5z\"/></svg>"

/***/ }),
/* 234 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z\"/></svg>"

/***/ }),
/* 235 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M1152 512v-472q22 14 36 28l408 408q14 14 28 36h-472zm-128 32q0 40 28 68t68 28h544v1056q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h800v544z\"/> </svg>"

/***/ }),
/* 236 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M1728 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z\"/> </svg> "

/***/ }),
/* 237 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M789 559l-170 450q33 0 136.5 2t160.5 2q19 0 57-2-87-253-184-452zm-725 1105l2-79q23-7 56-12.5t57-10.5 49.5-14.5 44.5-29 31-50.5l237-616 280-724h128q8 14 11 21l205 480q33 78 106 257.5t114 274.5q15 34 58 144.5t72 168.5q20 45 35 57 19 15 88 29.5t84 20.5q6 38 6 57 0 4-.5 13t-.5 13q-63 0-190-8t-191-8q-76 0-215 7t-178 8q0-43 4-78l131-28q1 0 12.5-2.5t15.5-3.5 14.5-4.5 15-6.5 11-8 9-11 2.5-14q0-16-31-96.5t-72-177.5-42-100l-450-2q-26 58-76.5 195.5t-50.5 162.5q0 22 14 37.5t43.5 24.5 48.5 13.5 57 8.5 41 4q1 19 1 58 0 9-2 27-58 0-174.5-10t-174.5-10q-8 0-26.5 4t-21.5 4q-80 14-188 14z\"/></svg>"

/***/ }),
/* 238 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1744 1408q33 0 42 18.5t-11 44.5l-126 162q-20 26-49 26t-49-26l-126-162q-20-26-11-44.5t42-18.5h80v-1024h-80q-33 0-42-18.5t11-44.5l126-162q20-26 49-26t49 26l126 162q20 26 11 44.5t-42 18.5h-80v1024h80zm-1663-1279l54 27q12 5 211 5 44 0 132-2t132-2q36 0 107.5.5t107.5.5h293q6 0 21 .5t20.5 0 16-3 17.5-9 15-17.5l42-1q4 0 14 .5t14 .5q2 112 2 336 0 80-5 109-39 14-68 18-25-44-54-128-3-9-11-48t-14.5-73.5-7.5-35.5q-6-8-12-12.5t-15.5-6-13-2.5-18-.5-16.5.5q-17 0-66.5-.5t-74.5-.5-64 2-71 6q-9 81-8 136 0 94 2 388t2 455q0 16-2.5 71.5t0 91.5 12.5 69q40 21 124 42.5t120 37.5q5 40 5 50 0 14-3 29l-34 1q-76 2-218-8t-207-10q-50 0-151 9t-152 9q-3-51-3-52v-9q17-27 61.5-43t98.5-29 78-27q19-42 19-383 0-101-3-303t-3-303v-117q0-2 .5-15.5t.5-25-1-25.5-3-24-5-14q-11-12-162-12-33 0-93 12t-80 26q-19 13-34 72.5t-31.5 111-42.5 53.5q-42-26-56-44v-383z\"/></svg>"

/***/ }),
/* 239 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 24 24\" > <path d=\"M22,20.6L3.4,2H8V0H0v8h2V3.4L20.6,22H16v2h8v-8h-2V20.6z M16,0v2h4.7l-6.3,6.3l1.4,1.4L22,3.5V8h2V0H16z M8.3,14.3L2,20.6V16H0v8h8v-2H3.5l6.3-6.3L8.3,14.3z\"/> </svg>"

/***/ }),
/* 240 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1600 736v192q0 40-28 68t-68 28h-1216q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h1216q40 0 68 28t28 68z\"/></svg>"

/***/ }),
/* 241 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M576 576q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448h-1408v-192l320-320 160 160 512-512zm96-704h-1600q-13 0-22.5 9.5t-9.5 22.5v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5v-1216q0-13-9.5-22.5t-22.5-9.5zm160 32v1216q0 66-47 113t-113 47h-1600q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1600q66 0 113 47t47 113z\"/></svg>"

/***/ }),
/* 242 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M352 832q0 14-9 23l-288 288q-9 9-23 9-13 0-22.5-9.5t-9.5-22.5v-576q0-13 9.5-22.5t22.5-9.5q14 0 23 9l288 288q9 9 9 23zm1440 480v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5z\"/> </svg>"

/***/ }),
/* 243 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1152 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z\"/></svg>"

/***/ }),
/* 244 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M384 1662l17-85q6-2 81.5-21.5t111.5-37.5q28-35 41-101 1-7 62-289t114-543.5 52-296.5v-25q-24-13-54.5-18.5t-69.5-8-58-5.5l19-103q33 2 120 6.5t149.5 7 120.5 2.5q48 0 98.5-2.5t121-7 98.5-6.5q-5 39-19 89-30 10-101.5 28.5t-108.5 33.5q-8 19-14 42.5t-9 40-7.5 45.5-6.5 42q-27 148-87.5 419.5t-77.5 355.5q-2 9-13 58t-20 90-16 83.5-6 57.5l1 18q17 4 185 31-3 44-16 99-11 0-32.5 1.5t-32.5 1.5q-29 0-87-10t-86-10q-138-2-206-2-51 0-143 9t-121 11z\"/></svg>"

/***/ }),
/* 245 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45z\"/></svg>"

/***/ }),
/* 246 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1280q26 0 45 19t19 45zm256-384v128q0 26-19 45t-45 19h-1536q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1536q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-1152q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1152q26 0 45 19t19 45z\"/></svg>"

/***/ }),
/* 247 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z\"/></svg>"

/***/ }),
/* 248 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M640 768h512v-192q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-192q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z\"/></svg>"

/***/ }),
/* 249 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z\"/></svg>"

/***/ }),
/* 250 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 312 312\"> <g transform=\"translate(0.000000,312.000000) scale(0.100000,-0.100000)\" stroke=\"none\"> <path d=\"M50 3109 c0 -7 -11 -22 -25 -35 l-25 -23 0 -961 0 -961 32 -29 32 -30 501 -2 500 -3 3 -502 2 -502 31 -30 31 -31 958 0 958 0 23 25 c13 13 30 25 37 25 9 0 12 199 12 960 0 686 -3 960 -11 960 -6 0 -24 12 -40 28 l-29 27 -503 5 -502 5 -5 502 -5 503 -28 29 c-15 16 -27 34 -27 40 0 8 -274 11 -960 11 -710 0 -960 -3 -960 -11z m1738 -698 l2 -453 -40 -40 c-22 -22 -40 -43 -40 -47 0 -4 36 -42 79 -85 88 -87 82 -87 141 -23 l26 27 455 -2 454 -3 0 -775 0 -775 -775 0 -775 0 -3 450 -2 449 47 48 47 48 -82 80 c-44 44 -84 80 -87 80 -3 0 -25 -18 -48 -40 l-41 -40 -456 2 -455 3 -3 765 c-1 421 0 771 3 778 3 10 164 12 777 10 l773 -3 3 -454z\"/> <path d=\"M607 2492 c-42 -42 -77 -82 -77 -87 0 -6 86 -96 190 -200 105 -104 190 -197 190 -205 0 -8 -41 -56 -92 -107 -65 -65 -87 -94 -77 -98 8 -3 138 -4 289 -3 l275 3 3 275 c1 151 0 281 -3 289 -4 10 -35 -14 -103 -82 -54 -53 -103 -97 -109 -97 -7 0 -99 88 -206 195 -107 107 -196 195 -198 195 -3 0 -39 -35 -82 -78z\"/> <path d=\"M1470 1639 c-47 -49 -87 -91 -89 -94 -5 -6 149 -165 160 -165 9 0 189 179 189 188 0 12 -154 162 -165 161 -6 0 -48 -41 -95 -90z\"/> <path d=\"M1797 1303 c-9 -8 -9 -568 0 -576 4 -4 50 36 103 88 54 52 101 95 106 95 5 0 95 -85 199 -190 104 -104 194 -190 200 -190 6 0 46 36 90 80 l79 79 -197 196 c-108 108 -197 199 -197 203 0 4 45 52 99 106 55 55 98 103 95 108 -6 10 -568 11 -577 1z\"/> </g> </svg> "

/***/ }),
/* 251 */
/***/ (function(module, exports) {

module.exports = "<svg role=\"img\" viewBox=\"0 0 1792 1792\"> <path d=\"M381 1620q0 80-54.5 126t-135.5 46q-106 0-172-66l57-88q49 45 106 45 29 0 50.5-14.5t21.5-42.5q0-64-105-56l-26-56q8-10 32.5-43.5t42.5-54 37-38.5v-1q-16 0-48.5 1t-48.5 1v53h-106v-152h333v88l-95 115q51 12 81 49t30 88zm2-627v159h-362q-6-36-6-54 0-51 23.5-93t56.5-68 66-47.5 56.5-43.5 23.5-45q0-25-14.5-38.5t-39.5-13.5q-46 0-81 58l-85-59q24-51 71.5-79.5t105.5-28.5q73 0 123 41.5t50 112.5q0 50-34 91.5t-75 64.5-75.5 50.5-35.5 52.5h127v-60h105zm1409 319v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm-1408-899v99h-335v-99h107q0-41 .5-122t.5-121v-12h-2q-8 17-50 54l-71-76 136-127h106v404h108zm1408 387v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z\"/> </svg>"

/***/ }),
/* 252 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 270 270\"> <path d=\"m240.443652,220.45085l-47.410809,0l0,-10.342138c13.89973,-8.43655 25.752896,-19.844464 34.686646,-33.469923c11.445525,-17.455846 17.496072,-37.709239 17.496072,-58.570077c0,-59.589197 -49.208516,-108.068714 -109.693558,-108.068714s-109.69263,48.479517 -109.69263,108.069628c0,20.860839 6.050547,41.113316 17.497001,58.570077c8.93375,13.625459 20.787845,25.032458 34.686646,33.469008l0,10.342138l-47.412666,0c-10.256959,0 -18.571354,8.191376 -18.571354,18.296574c0,10.105198 8.314395,18.296574 18.571354,18.296574l65.98402,0c10.256959,0 18.571354,-8.191376 18.571354,-18.296574l0,-39.496814c0,-7.073455 -4.137698,-13.51202 -10.626529,-16.537358c-25.24497,-11.772016 -41.557118,-37.145704 -41.557118,-64.643625c0,-39.411735 32.545369,-71.476481 72.549922,-71.476481c40.004553,0 72.550851,32.064746 72.550851,71.476481c0,27.497006 -16.312149,52.87161 -41.557118,64.643625c-6.487902,3.026253 -10.6256,9.464818 -10.6256,16.537358l0,39.496814c0,10.105198 8.314395,18.296574 18.571354,18.296574l65.982163,0c10.256959,0 18.571354,-8.191376 18.571354,-18.296574c0,-10.105198 -8.314395,-18.296574 -18.571354,-18.296574z\"/> </svg>"

/***/ }),
/* 253 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M384 544v576q0 13-9.5 22.5t-22.5 9.5q-14 0-23-9l-288-288q-9-9-9-23t9-23l288-288q9-9 23-9 13 0 22.5 9.5t9.5 22.5zm1408 768v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5z\"/> </svg>"

/***/ }),
/* 254 */
/***/ (function(module, exports) {

module.exports = "<svg x=\"0px\" y=\"0px\" viewBox=\"0 0 459 459\"> <g> <g> <path d=\"M229.5,0C102,0,0,102,0,229.5S102,459,229.5,459c20.4,0,38.25-17.85,38.25-38.25c0-10.2-2.55-17.85-10.2-25.5 c-5.1-7.65-10.2-15.3-10.2-25.5c0-20.4,17.851-38.25,38.25-38.25h45.9c71.4,0,127.5-56.1,127.5-127.5C459,91.8,357,0,229.5,0z M89.25,229.5c-20.4,0-38.25-17.85-38.25-38.25S68.85,153,89.25,153s38.25,17.85,38.25,38.25S109.65,229.5,89.25,229.5z M165.75,127.5c-20.4,0-38.25-17.85-38.25-38.25S145.35,51,165.75,51S204,68.85,204,89.25S186.15,127.5,165.75,127.5z M293.25,127.5c-20.4,0-38.25-17.85-38.25-38.25S272.85,51,293.25,51s38.25,17.85,38.25,38.25S313.65,127.5,293.25,127.5z M369.75,229.5c-20.4,0-38.25-17.85-38.25-38.25S349.35,153,369.75,153S408,170.85,408,191.25S390.15,229.5,369.75,229.5z\" /> </g> </g> </svg> "

/***/ }),
/* 255 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1534 189v73q0 29-18.5 61t-42.5 32q-50 0-54 1-26 6-32 31-3 11-3 64v1152q0 25-18 43t-43 18h-108q-25 0-43-18t-18-43v-1218h-143v1218q0 25-17.5 43t-43.5 18h-108q-26 0-43.5-18t-17.5-43v-496q-147-12-245-59-126-58-192-179-64-117-64-259 0-166 88-286 88-118 209-159 111-37 417-37h479q25 0 43 18t18 43z\"/></svg>"

/***/ }),
/* 256 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M10.5 20H2a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h1V3l2.03-.4a3 3 0 0 1 5.94 0L13 3v1h1a2 2 0 0 1 2 2v1h-2V6h-1v1H3V6H2v12h5v2h3.5zM8 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2 4h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2zm0 2v8h8v-8h-8z\"/> </svg> "

/***/ }),
/* 257 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z\"/></svg>"

/***/ }),
/* 258 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z\"/></svg>"

/***/ }),
/* 259 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M448 1536h896v-256h-896v256zm0-640h896v-384h-160q-40 0-68-28t-28-68v-160h-640v640zm1152 64q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128 0v416q0 13-9.5 22.5t-22.5 9.5h-224v160q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-224q-13 0-22.5-9.5t-9.5-22.5v-416q0-79 56.5-135.5t135.5-56.5h64v-544q0-40 28-68t68-28h672q40 0 88 20t76 48l152 152q28 28 48 76t20 88v256h64q79 0 135.5 56.5t56.5 135.5z\"/> </svg>"

/***/ }),
/* 260 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M1664 256v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l138-138q-148-137-349-137-104 0-198.5 40.5t-163.5 109.5-109.5 163.5-40.5 198.5 40.5 198.5 109.5 163.5 163.5 109.5 198.5 40.5q119 0 225-52t179-147q7-10 23-12 14 0 25 9l137 138q9 8 9.5 20.5t-7.5 22.5q-109 132-264 204.5t-327 72.5q-156 0-298-61t-245-164-164-245-61-298 61-298 164-245 245-164 298-61q147 0 284.5 55.5t244.5 156.5l130-129q29-31 70-14 39 17 39 59z\"/> </svg>"

/***/ }),
/* 261 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 24 24\" > <g> <g transform=\"translate(-251.000000, -443.000000)\"> <g transform=\"translate(215.000000, 119.000000)\"/> <path d=\"M252,448 L256,448 L256,444 L252,444 L252,448 Z M257,448 L269,448 L269,446 L257,446 L257,448 Z M257,464 L269,464 L269,462 L257,462 L257,464 Z M270,444 L270,448 L274,448 L274,444 L270,444 Z M252,462 L252,466 L256,466 L256,462 L252,462 Z M270,462 L270,466 L274,466 L274,462 L270,462 Z M254,461 L256,461 L256,449 L254,449 L254,461 Z M270,461 L272,461 L272,449 L270,449 L270,461 Z\"/> </g> </g> </svg>"

/***/ }),
/* 262 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M844 472q0 60-19 113.5t-63 92.5-105 39q-76 0-138-57.5t-92-135.5-30-151q0-60 19-113.5t63-92.5 105-39q77 0 138.5 57.5t91.5 135 30 151.5zm-342 483q0 80-42 139t-119 59q-76 0-141.5-55.5t-100.5-133.5-35-152q0-80 42-139.5t119-59.5q76 0 141.5 55.5t100.5 134 35 152.5zm394-27q118 0 255 97.5t229 237 92 254.5q0 46-17 76.5t-48.5 45-64.5 20-76 5.5q-68 0-187.5-45t-182.5-45q-66 0-192.5 44.5t-200.5 44.5q-183 0-183-146 0-86 56-191.5t139.5-192.5 187.5-146 193-59zm239-211q-61 0-105-39t-63-92.5-19-113.5q0-74 30-151.5t91.5-135 138.5-57.5q61 0 105 39t63 92.5 19 113.5q0 73-30 151t-92 135.5-138 57.5zm432-104q77 0 119 59.5t42 139.5q0 74-35 152t-100.5 133.5-141.5 55.5q-77 0-119-59t-42-139q0-74 35-152.5t100.5-134 141.5-55.5z\"/> </svg>"

/***/ }),
/* 263 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1280q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1536q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1536q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1152q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1152q26 0 45 19t19 45z\"/> </svg>"

/***/ }),
/* 264 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M512 1536h768v-384h-768v384zm896 0h128v-896q0-14-10-38.5t-20-34.5l-281-281q-10-10-34-20t-39-10v416q0 40-28 68t-68 28h-576q-40 0-68-28t-28-68v-416h-128v1280h128v-416q0-40 28-68t68-28h832q40 0 68 28t28 68v416zm-384-928v-320q0-13-9.5-22.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 22.5v320q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5zm640 32v928q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h928q40 0 88 20t76 48l280 280q28 28 48 76t20 88z\"/> </svg>"

/***/ }),
/* 265 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 18 18\"> <g fill-rule=\"evenodd\" stroke=\"none\" stroke-width=\"1\"> <g transform=\"translate(-381.000000, -381.000000)\"> <g transform=\"translate(381.000000, 381.000000)\"> <path d=\"M0,2 L2,2 L2,0 C0.9,0 0,0.9 0,2 L0,2 Z M0,10 L2,10 L2,8 L0,8 L0,10 L0,10 Z M4,18 L6,18 L6,16 L4,16 L4,18 L4,18 Z M0,6 L2,6 L2,4 L0,4 L0,6 L0,6 Z M10,0 L8,0 L8,2 L10,2 L10,0 L10,0 Z M16,0 L16,2 L18,2 C18,0.9 17.1,0 16,0 L16,0 Z M2,18 L2,16 L0,16 C0,17.1 0.9,18 2,18 L2,18 Z M0,14 L2,14 L2,12 L0,12 L0,14 L0,14 Z M6,0 L4,0 L4,2 L6,2 L6,0 L6,0 Z M8,18 L10,18 L10,16 L8,16 L8,18 L8,18 Z M16,10 L18,10 L18,8 L16,8 L16,10 L16,10 Z M16,18 C17.1,18 18,17.1 18,16 L16,16 L16,18 L16,18 Z M16,6 L18,6 L18,4 L16,4 L16,6 L16,6 Z M16,14 L18,14 L18,12 L16,12 L16,14 L16,14 Z M12,18 L14,18 L14,16 L12,16 L12,18 L12,18 Z M12,2 L14,2 L14,0 L12,0 L12,2 L12,2 Z M4,14 L14,14 L14,4 L4,4 L4,14 L4,14 Z M6,6 L12,6 L12,12 L6,12 L6,6 L6,6 Z\"/> </g> </g> </g> </svg>"

/***/ }),
/* 266 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M896 960v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45zm755-672q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23z\"/> </svg>"

/***/ }),
/* 267 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M553 1399l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23t-10 23l-393 393 393 393q10 10 10 23t-10 23zm591-1067l-373 1291q-4 13-15.5 19.5t-23.5 2.5l-62-17q-13-4-19.5-15.5t-2.5-24.5l373-1291q4-13 15.5-19.5t23.5-2.5l62 17q13 4 19.5 15.5t2.5 24.5zm657 651l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23z\"/> </svg>"

/***/ }),
/* 268 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 48 48\"> <path d=\"M6 42h4v-4h-4v4zm4-28h-4v4h4v-4zm-4 20h4v-4h-4v4zm8 8h4v-4h-4v4zm-4-36h-4v4h4v-4zm8 0h-4v4h4v-4zm16 0h-4v4h4v-4zm-8 8h-4v4h4v-4zm0-8h-4v4h4v-4zm12 28h4v-4h-4v4zm-16 8h4v-4h-4v4zm-16-16h36v-4h-36v4zm32-20v4h4v-4h-4zm0 12h4v-4h-4v4zm-16 16h4v-4h-4v4zm8 8h4v-4h-4v4zm8 0h4v-4h-4v4z\"/><path d=\"M0 0h48v48h-48z\" fill=\"none\"/> </svg>"

/***/ }),
/* 269 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 48 48\"> <path d=\"M6 18h4v-4h-4v4zm0-8h4v-4h-4v4zm8 32h4v-4h-4v4zm0-16h4v-4h-4v4zm-8 0h4v-4h-4v4zm0 16h4v-4h-4v4zm0-8h4v-4h-4v4zm8-24h4v-4h-4v4zm24 24h4v-4h-4v4zm-16 8h4v-36h-4v36zm16 0h4v-4h-4v4zm0-16h4v-4h-4v4zm0-20v4h4v-4h-4zm0 12h4v-4h-4v4zm-8-8h4v-4h-4v4zm0 32h4v-4h-4v4zm0-16h4v-4h-4v4z\"/> <path d=\"M0 0h48v48h-48z\" fill=\"none\"/> </svg>"

/***/ }),
/* 270 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1760 896q14 0 23 9t9 23v64q0 14-9 23t-23 9h-1728q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h1728zm-1277-64q-28-35-51-80-48-97-48-188 0-181 134-309 133-127 393-127 50 0 167 19 66 12 177 48 10 38 21 118 14 123 14 183 0 18-5 45l-12 3-84-6-14-2q-50-149-103-205-88-91-210-91-114 0-182 59-67 58-67 146 0 73 66 140t279 129q69 20 173 66 58 28 95 52h-743zm507 256h411q7 39 7 92 0 111-41 212-23 55-71 104-37 35-109 81-80 48-153 66-80 21-203 21-114 0-195-23l-140-40q-57-16-72-28-8-8-8-22v-13q0-108-2-156-1-30 0-68l2-37v-44l102-2q15 34 30 71t22.5 56 12.5 27q35 57 80 94 43 36 105 57 59 22 132 22 64 0 139-27 77-26 122-86 47-61 47-129 0-84-81-157-34-29-137-71z\"/></svg>"

/***/ }),
/* 271 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M1025 1369v167h-248l-159-252-24-42q-8-9-11-21h-3l-9 21q-10 20-25 44l-155 250h-258v-167h128l197-291-185-272h-137v-168h276l139 228q2 4 23 42 8 9 11 21h3q3-9 11-21l25-42 140-228h257v168h-125l-184 267 204 296h109zm639 217v206h-514l-4-27q-3-45-3-46 0-64 26-117t65-86.5 84-65 84-54.5 65-54 26-64q0-38-29.5-62.5t-70.5-24.5q-51 0-97 39-14 11-36 38l-105-92q26-37 63-66 80-65 188-65 110 0 178 59.5t68 158.5q0 66-34.5 118.5t-84 86-99.5 62.5-87 63-41 73h232v-80h126z\"/> </svg>"

/***/ }),
/* 272 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"> <path d=\"M1025 1369v167h-248l-159-252-24-42q-8-9-11-21h-3l-9 21q-10 20-25 44l-155 250h-258v-167h128l197-291-185-272h-137v-168h276l139 228q2 4 23 42 8 9 11 21h3q3-9 11-21l25-42 140-228h257v168h-125l-184 267 204 296h109zm637-679v206h-514l-3-27q-4-28-4-46 0-64 26-117t65-86.5 84-65 84-54.5 65-54 26-64q0-38-29.5-62.5t-70.5-24.5q-51 0-97 39-14 11-36 38l-105-92q26-37 63-66 83-65 188-65 110 0 178 59.5t68 158.5q0 56-24.5 103t-62 76.5-81.5 58.5-82 50.5-65.5 51.5-30.5 63h232v-80h126z\"/> </svg>"

/***/ }),
/* 273 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z\"/></svg>"

/***/ }),
/* 274 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M512 1248v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm640 512v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm-640-1024v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm640 512v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm640 512v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm-640-1024v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm640 512v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68z\"/></svg>"

/***/ }),
/* 275 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M512 1248v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm1280 512v192q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h960q40 0 68 28t28 68zm-1280-1024v192q0 40-28 68t-68 28h-320q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h320q40 0 68 28t28 68zm1280 512v192q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h960q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h960q40 0 68 28t28 68z\"/></svg>"

/***/ }),
/* 276 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M384 1408q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm0-512q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm-1408-928q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z\"/></svg>"

/***/ }),
/* 277 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M176 223q-37-2-45-4l-3-88q13-1 40-1 60 0 112 4 132 7 166 7 86 0 168-3 116-4 146-5 56 0 86-2l-1 14 2 64v9q-60 9-124 9-60 0-79 25-13 14-13 132 0 13 .5 32.5t.5 25.5l1 229 14 280q6 124 51 202 35 59 96 92 88 47 177 47 104 0 191-28 56-18 99-51 48-36 65-64 36-56 53-114 21-73 21-229 0-79-3.5-128t-11-122.5-13.5-159.5l-4-59q-5-67-24-88-34-35-77-34l-100 2-14-3 2-86h84l205 10q76 3 196-10l18 2q6 38 6 51 0 7-4 31-45 12-84 13-73 11-79 17-15 15-15 41 0 7 1.5 27t1.5 31q8 19 22 396 6 195-15 304-15 76-41 122-38 65-112 123-75 57-182 89-109 33-255 33-167 0-284-46-119-47-179-122-61-76-83-195-16-80-16-237v-333q0-188-17-213-25-36-147-39zm1488 1409v-64q0-14-9-23t-23-9h-1472q-14 0-23 9t-9 23v64q0 14 9 23t23 9h1472q14 0 23-9t9-23z\"/></svg>"

/***/ }),
/* 278 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z\"/></svg>"

/***/ }),
/* 279 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M503 1271l-256 256q-10 9-23 9-12 0-23-9-9-10-9-23t9-23l256-256q10-9 23-9t23 9q9 10 9 23t-9 23zm169 41v320q0 14-9 23t-23 9-23-9-9-23v-320q0-14 9-23t23-9 23 9 9 23zm-224-224q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23 9-23 23-9h320q14 0 23 9t9 23zm1264 128q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-334-335q-21-21-42-56l239-18 273 274q27 27 68 27.5t68-26.5l147-146q28-28 28-67 0-40-28-68l-274-275 18-239q35 21 56 42l336 336q84 86 84 204zm-617-724l-239 18-273-274q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l274 274-18 240q-35-21-56-42l-336-336q-84-86-84-204 0-120 85-203l147-146q83-83 203-83 121 0 204 85l334 335q21 21 42 56zm633 84q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23 9-23 23-9h320q14 0 23 9t9 23zm-544-544v320q0 14-9 23t-23 9-23-9-9-23v-320q0-14 9-23t23-9 23 9 9 23zm407 151l-256 256q-11 9-23 9t-23-9q-9-10-9-23t9-23l256-256q10-9 23-9t23 9q9 10 9 23t-9 23z\"/></svg>"

/***/ }),
/* 280 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1728 576v256q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45v-256q0-106-75-181t-181-75-181 75-75 181v192h96q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h672v-192q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5z\"/></svg>"

/***/ }),
/* 281 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1639 1056q0 5-1 7-64 268-268 434.5t-478 166.5q-146 0-282.5-55t-243.5-157l-129 129q-19 19-45 19t-45-19-19-45v-448q0-26 19-45t45-19h448q26 0 45 19t19 45-19 45l-137 137q71 66 161 102t187 36q134 0 250-65t186-179q11-17 53-117 8-23 30-23h192q13 0 22.5 9.5t9.5 22.5zm25-800v448q0 26-19 45t-45 19h-448q-26 0-45-19t-19-45 19-45l138-138q-148-137-349-137-134 0-250 65t-186 179q-11 17-53 117-8 23-30 23h-199q-13 0-22.5-9.5t-9.5-22.5v-7q65-268 270-434.5t480-166.5q146 0 284 55.5t245 156.5l130-129q19-19 45-19t45 19 19 45z\"/></svg>"

/***/ }),
/* 282 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z\"/></svg>"

/***/ }),
/* 283 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1216 320q0 26-19 45t-45 19h-128v1024h128q26 0 45 19t19 45-19 45l-256 256q-19 19-45 19t-45-19l-256-256q-19-19-19-45t19-45 45-19h128v-1024h-128q-26 0-45-19t-19-45 19-45l256-256q19-19 45-19t45 19l256 256q19 19 19 45z\"/></svg>"

/***/ }),
/* 284 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 1792 1792\"><path d=\"M1792 352v1088q0 42-39 59-13 5-25 5-27 0-45-19l-403-403v166q0 119-84.5 203.5t-203.5 84.5h-704q-119 0-203.5-84.5t-84.5-203.5v-704q0-119 84.5-203.5t203.5-84.5h704q119 0 203.5 84.5t84.5 203.5v165l403-402q18-19 45-19 12 0 25 5 39 17 39 59z\"/></svg>"

/***/ })
/******/ ]);
});