(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/ripple'), require('primeng/api'), require('@angular/animations'), require('@angular/forms'), require('primeng/dom'), require('primeng/tree'), require('primeng/utils')) :
    typeof define === 'function' && define.amd ? define('primeng/treeselect', ['exports', '@angular/core', '@angular/common', 'primeng/ripple', 'primeng/api', '@angular/animations', '@angular/forms', 'primeng/dom', 'primeng/tree', 'primeng/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.treeselect = {}), global.ng.core, global.ng.common, global.primeng.ripple, global.primeng.api, global.ng.animations, global.ng.forms, global.primeng.dom, global.primeng.tree, global.primeng.utils));
}(this, (function (exports, i0, i3, ripple, i1, animations, forms, dom, i2, utils) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);

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
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
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
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || from);
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var TREESELECT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return TreeSelect; }),
        multi: true
    };
    var TreeSelect = /** @class */ (function () {
        function TreeSelect(config, cd, el, overlayService) {
            this.config = config;
            this.cd = cd;
            this.el = el;
            this.overlayService = overlayService;
            this.type = "button";
            this.scrollHeight = "400px";
            this.metaKeySelection = true;
            this.display = "comma";
            this.selectionMode = "single";
            this.propagateSelectionDown = true;
            this.propagateSelectionUp = true;
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.onNodeExpand = new i0.EventEmitter();
            this.onNodeCollapse = new i0.EventEmitter();
            this.onShow = new i0.EventEmitter();
            this.onHide = new i0.EventEmitter();
            this.onNodeUnselect = new i0.EventEmitter();
            this.onNodeSelect = new i0.EventEmitter();
            this.expandedNodes = [];
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        Object.defineProperty(TreeSelect.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (options) {
                this._options = options;
                this.updateTreeState();
            },
            enumerable: false,
            configurable: true
        });
        ;
        TreeSelect.prototype.ngOnInit = function () {
            this.updateTreeState();
        };
        TreeSelect.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'value':
                        _this.valueTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'empty':
                        _this.emptyTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    default:
                        _this.valueTemplate = item.template;
                        break;
                }
            });
        };
        TreeSelect.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.overlayEl = event.element;
                    this.onOverlayEnter();
                    break;
            }
        };
        TreeSelect.prototype.onOverlayAnimationDone = function (event) {
            switch (event.toState) {
                case 'void':
                    this.onOverlayLeave();
                    break;
            }
        };
        TreeSelect.prototype.onSelectionChange = function (event) {
            this.value = event;
            this.onModelChange(this.value);
            this.cd.markForCheck();
        };
        TreeSelect.prototype.onClick = function (event) {
            if (!this.disabled && (!this.overlayEl || !this.overlayEl.contains(event.target)) && !dom.DomHandler.hasClass(event.target, 'p-treeselect-close')) {
                if (this.overlayVisible) {
                    this.hide();
                }
                else
                    this.show();
                this.focusInput.nativeElement.focus();
            }
        };
        TreeSelect.prototype.onKeyDown = function (event) {
            switch (event.which) {
                //down
                case 40:
                    if (!this.overlayVisible && event.altKey) {
                        this.show();
                        event.preventDefault();
                    }
                    break;
                //space
                case 32:
                    if (!this.overlayVisible) {
                        this.show();
                        event.preventDefault();
                    }
                    break;
                //enter and escape
                case 13:
                case 27:
                    if (this.overlayVisible) {
                        this.hide();
                        event.preventDefault();
                    }
                    break;
                //tab
                case 9:
                    this.hide();
                    break;
                default:
                    break;
            }
        };
        TreeSelect.prototype.show = function () {
            this.overlayVisible = true;
        };
        TreeSelect.prototype.hide = function () {
            this.overlayVisible = false;
            this.cd.markForCheck();
        };
        TreeSelect.prototype.onOverlayClick = function (event) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        };
        TreeSelect.prototype.updateTreeState = function () {
            if (this.value) {
                var selectedNodes = this.selectionMode === "single" ? [this.value] : __spreadArray([], __read(this.value));
                this.resetExpandedNodes();
                if (selectedNodes && this.options) {
                    this.updateTreeBranchState(null, null, selectedNodes);
                }
            }
        };
        TreeSelect.prototype.updateTreeBranchState = function (node, path, selectedNodes) {
            var e_1, _a, e_2, _b;
            if (node) {
                if (this.isSelected(node)) {
                    this.expandPath(path);
                    selectedNodes.splice(selectedNodes.indexOf(node), 1);
                }
                if (selectedNodes.length > 0 && node.children) {
                    try {
                        for (var _c = __values(node.children), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var childNode = _d.value;
                            path.push(node);
                            this.updateTreeBranchState(childNode, path, selectedNodes);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            else {
                try {
                    for (var _e = __values(this.options), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var childNode = _f.value;
                        this.updateTreeBranchState(childNode, [], selectedNodes);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        };
        TreeSelect.prototype.expandPath = function (expandedNodes) {
            var e_3, _a;
            try {
                for (var expandedNodes_1 = __values(expandedNodes), expandedNodes_1_1 = expandedNodes_1.next(); !expandedNodes_1_1.done; expandedNodes_1_1 = expandedNodes_1.next()) {
                    var node = expandedNodes_1_1.value;
                    node.expanded = true;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (expandedNodes_1_1 && !expandedNodes_1_1.done && (_a = expandedNodes_1.return)) _a.call(expandedNodes_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.expandedNodes = __spreadArray([], __read(expandedNodes));
        };
        TreeSelect.prototype.nodeExpand = function (event) {
            this.onNodeExpand.emit(event);
            this.expandedNodes.push(event.node);
        };
        TreeSelect.prototype.nodeCollapse = function (event) {
            this.onNodeCollapse.emit(event);
            this.expandedNodes.splice(this.expandedNodes.indexOf(event.node), 1);
        };
        TreeSelect.prototype.resetExpandedNodes = function () {
            var e_4, _a;
            try {
                for (var _b = __values(this.expandedNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var node = _c.value;
                    node.expanded = false;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            this.expandedNodes = [];
        };
        TreeSelect.prototype.findSelectedNodes = function (node, keys, selectedNodes) {
            var e_5, _a, e_6, _b;
            if (node) {
                if (this.isSelected(node)) {
                    selectedNodes.push(node);
                    delete keys[node.key];
                }
                if (Object.keys(keys).length && node.children) {
                    try {
                        for (var _c = __values(node.children), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var childNode = _d.value;
                            this.findSelectedNodes(childNode, keys, selectedNodes);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            else {
                try {
                    for (var _e = __values(this.options), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var childNode = _f.value;
                        this.findSelectedNodes(childNode, keys, selectedNodes);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        };
        TreeSelect.prototype.isSelected = function (node) {
            return this.findIndexInSelection(node) != -1;
        };
        TreeSelect.prototype.findIndexInSelection = function (node) {
            var index = -1;
            if (this.value) {
                if (this.selectionMode === "single") {
                    var areNodesEqual = (this.value.key && this.value.key === node.key) || this.value == node;
                    index = areNodesEqual ? 0 : -1;
                }
                else {
                    for (var i = 0; i < this.value.length; i++) {
                        var selectedNode = this.value[i];
                        var areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                        if (areNodesEqual) {
                            index = i;
                            break;
                        }
                    }
                }
            }
            return index;
        };
        TreeSelect.prototype.onSelect = function (node) {
            this.onNodeSelect.emit(node);
            if (this.selectionMode === 'single') {
                this.hide();
            }
        };
        TreeSelect.prototype.onUnselect = function (node) {
            this.onNodeUnselect.emit(node);
        };
        TreeSelect.prototype.onOverlayEnter = function () {
            utils.ZIndexUtils.set('overlay', this.overlayEl, this.config.zIndex.overlay);
            this.appendContainer();
            this.alignOverlay();
            this.bindOutsideClickListener();
            this.bindScrollListener();
            this.bindResizeListener();
            this.onShow.emit();
        };
        TreeSelect.prototype.onOverlayLeave = function () {
            this.unbindOutsideClickListener();
            this.unbindScrollListener();
            this.unbindResizeListener();
            utils.ZIndexUtils.clear(this.overlayEl);
            this.overlayEl = null;
            this.onHide.emit();
        };
        TreeSelect.prototype.onFocus = function () {
            this.focused = true;
        };
        TreeSelect.prototype.onBlur = function () {
            this.focused = false;
        };
        TreeSelect.prototype.writeValue = function (value) {
            this.value = value;
            this.updateTreeState();
            this.cd.markForCheck();
        };
        TreeSelect.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        TreeSelect.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        TreeSelect.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        TreeSelect.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.overlayEl);
                else
                    document.getElementById(this.appendTo).appendChild(this.overlayEl);
            }
        };
        TreeSelect.prototype.restoreAppend = function () {
            if (this.overlayEl && this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.removeChild(this.overlayEl);
                else
                    document.getElementById(this.appendTo).removeChild(this.overlayEl);
            }
        };
        TreeSelect.prototype.alignOverlay = function () {
            if (this.appendTo) {
                dom.DomHandler.absolutePosition(this.overlayEl, this.containerEl.nativeElement);
                this.overlayEl.style.minWidth = dom.DomHandler.getOuterWidth(this.containerEl.nativeElement) + 'px';
            }
            else {
                dom.DomHandler.relativePosition(this.overlayEl, this.containerEl.nativeElement);
            }
        };
        TreeSelect.prototype.bindOutsideClickListener = function () {
            var _this = this;
            if (!this.outsideClickListener) {
                this.outsideClickListener = function (event) {
                    if (_this.overlayVisible && _this.overlayEl && !_this.containerEl.nativeElement.contains(event.target) && !_this.overlayEl.contains(event.target)) {
                        _this.hide();
                    }
                };
                document.addEventListener('click', this.outsideClickListener);
            }
        };
        TreeSelect.prototype.unbindOutsideClickListener = function () {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        };
        TreeSelect.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.containerEl.nativeElement, function () {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        TreeSelect.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        TreeSelect.prototype.bindResizeListener = function () {
            var _this = this;
            if (!this.resizeListener) {
                this.resizeListener = function () {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                };
                window.addEventListener('resize', this.resizeListener);
            }
        };
        TreeSelect.prototype.unbindResizeListener = function () {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        };
        TreeSelect.prototype.ngOnDestroy = function () {
            this.restoreAppend();
            this.unbindOutsideClickListener();
            this.unbindResizeListener();
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            if (this.overlayEl) {
                utils.ZIndexUtils.clear(this.overlayEl);
                this.overlayEl = null;
            }
        };
        TreeSelect.prototype.containerClass = function () {
            return {
                'p-treeselect p-component p-inputwrapper': true,
                'p-treeselect-chip': this.display === 'chip',
                'p-disabled': this.disabled,
                'p-focus': this.focused
            };
        };
        TreeSelect.prototype.labelClass = function () {
            return {
                'p-treeselect-label': true,
                'p-placeholder': this.label === this.placeholder,
                'p-treeselect-label-empty': !this.placeholder && this.emptyValue
            };
        };
        Object.defineProperty(TreeSelect.prototype, "emptyMessageText", {
            get: function () {
                return this.emptyMessage || this.config.getTranslation(i1.TranslationKeys.EMPTY_MESSAGE);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeSelect.prototype, "emptyValue", {
            get: function () {
                return !this.value || Object.keys(this.value).length === 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeSelect.prototype, "emptyOptions", {
            get: function () {
                return !this.options || this.options.length === 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TreeSelect.prototype, "label", {
            get: function () {
                var value = this.value || [];
                return value.length ? value.map(function (node) { return node.label; }).join(', ') : (this.selectionMode === "single" && this.value) ? value.label : this.placeholder;
            },
            enumerable: false,
            configurable: true
        });
        return TreeSelect;
    }());
    TreeSelect.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TreeSelect, deps: [{ token: i1__namespace.PrimeNGConfig }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.ElementRef }, { token: i1__namespace.OverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    TreeSelect.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: TreeSelect, selector: "p-treeSelect", inputs: { type: "type", inputId: "inputId", scrollHeight: "scrollHeight", disabled: "disabled", metaKeySelection: "metaKeySelection", display: "display", selectionMode: "selectionMode", tabindex: "tabindex", ariaLabelledBy: "ariaLabelledBy", placeholder: "placeholder", panelClass: "panelClass", emptyMessage: "emptyMessage", appendTo: "appendTo", propagateSelectionDown: "propagateSelectionDown", propagateSelectionUp: "propagateSelectionUp", options: "options", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onNodeExpand: "onNodeExpand", onNodeCollapse: "onNodeCollapse", onShow: "onShow", onHide: "onHide", onNodeUnselect: "onNodeUnselect", onNodeSelect: "onNodeSelect" }, host: { properties: { "class.p-inputwrapper-filled": "!emptyValue", "class.p-inputwrapper-focus": "focused || overlayVisible" }, classAttribute: "p-element p-inputwrapper" }, providers: [TREESELECT_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: i1.PrimeTemplate }], viewQueries: [{ propertyName: "containerEl", first: true, predicate: ["container"], descendants: true }, { propertyName: "focusInput", first: true, predicate: ["focusInput"], descendants: true }], ngImport: i0__namespace, template: "\n    <div #container [ngClass]=\"containerClass()\" (click)=\"onClick($event)\">\n        <div class=\"p-hidden-accessible\">\n            <input #focusInput type=\"text\" role=\"listbox\" [attr.id]=\"inputId\" readonly [disabled]=\"disabled\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" (keydown)=\"onKeyDown($event)\" [attr.tabindex]=\"tabindex\"\n            aria-haspopup=\"true\" [attr.aria-expanded]=\"overlayVisible\" [attr.aria-labelledby]=\"ariaLabelledBy\"/>\n        </div>\n        <div class=\"p-treeselect-label-container\">\n            <div [ngClass]=\"labelClass()\">\n                <ng-container *ngIf=\"valueTemplate;else defaultValueTemplate\">\n                        <ng-container *ngTemplateOutlet=\"valueTemplate; context: {$implicit: value, placeholder: placeholder}\"></ng-container>\n                </ng-container>\n                <ng-template #defaultValueTemplate>\n                    <ng-container *ngIf=\"display === 'comma';else chipsValueTemplate\">\n                        {{label || 'empty'}}\n                    </ng-container>\n                    <ng-template #chipsValueTemplate>\n                        <div *ngFor=\"let node of value\" class=\"p-treeselect-token\">\n                            <span class=\"p-treeselect-token-label\">{{node.label}}</span>\n                        </div>\n                        <ng-container *ngIf=\"emptyValue\">{{placeholder || 'empty'}}</ng-container>\n                    </ng-template>\n                </ng-template>\n            </div>\n        </div>\n        <div class=\"p-treeselect-trigger\">\n            <span class=\"p-treeselect-trigger-icon pi pi-chevron-down\"></span>\n        </div>\n\n        <div #overlayRef class=\"p-treeselect-panel p-component\" *ngIf=\"overlayVisible\" (click)=\"onOverlayClick($event)\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationDone($event)\">\n            <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: value, options: options}\"></ng-container>\n            <div class=\"p-treeselect-items-wrapper\" [ngStyle]=\"{'max-height': scrollHeight}\">\n                <p-tree [value]=\"options\" [propagateSelectionDown]=\"propagateSelectionDown\" [propagateSelectionUp]=\"propagateSelectionUp\" [selectionMode]=\"selectionMode\" (selectionChange)=\"onSelectionChange($event)\" [selection]=\"value\"\n                    [metaKeySelection]=\"metaKeySelection\" (onNodeExpand)=\"nodeExpand($event)\" (onNodeCollapse)=\"nodeCollapse($event)\"\n                    (onNodeSelect)=\"onSelect($event)\" (onNodeUnselect)=\"onUnselect($event)\"></p-tree>\n                <div *ngIf=\"emptyOptions\" class=\"p-treeselect-empty-message\">\n                    <ng-container *ngIf=\"!emptyTemplate; else empty\">\n                        {{emptyMessageText}}\n                    </ng-container>\n                    <ng-container *ngTemplateOutlet=\"emptyTemplate;\"></ng-container>\n                </div>\n            </div>\n            <ng-container *ngTemplateOutlet=\"footerTemplate; context: {$implicit: value, options: options}\"></ng-container>\n        </div>\n    </div>\n    ", isInline: true, styles: [".p-treeselect{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;-ms-user-select:none;user-select:none}.p-treeselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-treeselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer}.p-treeselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-treeselect-label-empty{overflow:hidden;visibility:hidden}.p-treeselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-treeselect .p-treeselect-panel{min-width:100%}.p-treeselect-panel{position:absolute;top:0;left:0}.p-treeselect-items-wrapper{overflow:auto}.p-fluid .p-treeselect{display:flex}"], components: [{ type: i2__namespace.Tree, selector: "p-tree", inputs: ["value", "selectionMode", "selection", "style", "styleClass", "contextMenu", "layout", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "metaKeySelection", "propagateSelectionUp", "propagateSelectionDown", "loading", "loadingIcon", "emptyMessage", "ariaLabel", "ariaLabelledBy", "validateDrop", "filter", "filterBy", "filterMode", "filterPlaceholder", "filterLocale", "scrollHeight", "virtualScroll", "virtualNodeHeight", "minBufferPx", "maxBufferPx", "indentation", "trackBy"], outputs: ["selectionChange", "onNodeSelect", "onNodeUnselect", "onNodeExpand", "onNodeCollapse", "onNodeContextMenuSelect", "onNodeDrop", "onFilter"] }], directives: [{ type: i3__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
            animations.trigger('overlayAnimation', [
                animations.transition(':enter', [
                    animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                    animations.animate('{{showTransitionParams}}')
                ]),
                animations.transition(':leave', [
                    animations.animate('{{hideTransitionParams}}', animations.style({ opacity: 0 }))
                ])
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TreeSelect, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-treeSelect',
                        template: "\n    <div #container [ngClass]=\"containerClass()\" (click)=\"onClick($event)\">\n        <div class=\"p-hidden-accessible\">\n            <input #focusInput type=\"text\" role=\"listbox\" [attr.id]=\"inputId\" readonly [disabled]=\"disabled\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" (keydown)=\"onKeyDown($event)\" [attr.tabindex]=\"tabindex\"\n            aria-haspopup=\"true\" [attr.aria-expanded]=\"overlayVisible\" [attr.aria-labelledby]=\"ariaLabelledBy\"/>\n        </div>\n        <div class=\"p-treeselect-label-container\">\n            <div [ngClass]=\"labelClass()\">\n                <ng-container *ngIf=\"valueTemplate;else defaultValueTemplate\">\n                        <ng-container *ngTemplateOutlet=\"valueTemplate; context: {$implicit: value, placeholder: placeholder}\"></ng-container>\n                </ng-container>\n                <ng-template #defaultValueTemplate>\n                    <ng-container *ngIf=\"display === 'comma';else chipsValueTemplate\">\n                        {{label || 'empty'}}\n                    </ng-container>\n                    <ng-template #chipsValueTemplate>\n                        <div *ngFor=\"let node of value\" class=\"p-treeselect-token\">\n                            <span class=\"p-treeselect-token-label\">{{node.label}}</span>\n                        </div>\n                        <ng-container *ngIf=\"emptyValue\">{{placeholder || 'empty'}}</ng-container>\n                    </ng-template>\n                </ng-template>\n            </div>\n        </div>\n        <div class=\"p-treeselect-trigger\">\n            <span class=\"p-treeselect-trigger-icon pi pi-chevron-down\"></span>\n        </div>\n\n        <div #overlayRef class=\"p-treeselect-panel p-component\" *ngIf=\"overlayVisible\" (click)=\"onOverlayClick($event)\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationDone($event)\">\n            <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: value, options: options}\"></ng-container>\n            <div class=\"p-treeselect-items-wrapper\" [ngStyle]=\"{'max-height': scrollHeight}\">\n                <p-tree [value]=\"options\" [propagateSelectionDown]=\"propagateSelectionDown\" [propagateSelectionUp]=\"propagateSelectionUp\" [selectionMode]=\"selectionMode\" (selectionChange)=\"onSelectionChange($event)\" [selection]=\"value\"\n                    [metaKeySelection]=\"metaKeySelection\" (onNodeExpand)=\"nodeExpand($event)\" (onNodeCollapse)=\"nodeCollapse($event)\"\n                    (onNodeSelect)=\"onSelect($event)\" (onNodeUnselect)=\"onUnselect($event)\"></p-tree>\n                <div *ngIf=\"emptyOptions\" class=\"p-treeselect-empty-message\">\n                    <ng-container *ngIf=\"!emptyTemplate; else empty\">\n                        {{emptyMessageText}}\n                    </ng-container>\n                    <ng-container *ngTemplateOutlet=\"emptyTemplate;\"></ng-container>\n                </div>\n            </div>\n            <ng-container *ngTemplateOutlet=\"footerTemplate; context: {$implicit: value, options: options}\"></ng-container>\n        </div>\n    </div>\n    ",
                        styleUrls: ['./treeselect.css'],
                        animations: [
                            animations.trigger('overlayAnimation', [
                                animations.transition(':enter', [
                                    animations.style({ opacity: 0, transform: 'scaleY(0.8)' }),
                                    animations.animate('{{showTransitionParams}}')
                                ]),
                                animations.transition(':leave', [
                                    animations.animate('{{hideTransitionParams}}', animations.style({ opacity: 0 }))
                                ])
                            ])
                        ],
                        host: {
                            'class': 'p-element p-inputwrapper',
                            '[class.p-inputwrapper-filled]': '!emptyValue',
                            '[class.p-inputwrapper-focus]': 'focused || overlayVisible'
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [TREESELECT_VALUE_ACCESSOR],
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PrimeNGConfig }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ElementRef }, { type: i1__namespace.OverlayService }]; }, propDecorators: { type: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], scrollHeight: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], metaKeySelection: [{
                    type: i0.Input
                }], display: [{
                    type: i0.Input
                }], selectionMode: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], ariaLabelledBy: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], panelClass: [{
                    type: i0.Input
                }], emptyMessage: [{
                    type: i0.Input
                }], appendTo: [{
                    type: i0.Input
                }], propagateSelectionDown: [{
                    type: i0.Input
                }], propagateSelectionUp: [{
                    type: i0.Input
                }], options: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i1.PrimeTemplate]
                }], containerEl: [{
                    type: i0.ViewChild,
                    args: ['container']
                }], focusInput: [{
                    type: i0.ViewChild,
                    args: ['focusInput']
                }], onNodeExpand: [{
                    type: i0.Output
                }], onNodeCollapse: [{
                    type: i0.Output
                }], onShow: [{
                    type: i0.Output
                }], onHide: [{
                    type: i0.Output
                }], onNodeUnselect: [{
                    type: i0.Output
                }], onNodeSelect: [{
                    type: i0.Output
                }] } });
    var TreeSelectModule = /** @class */ (function () {
        function TreeSelectModule() {
        }
        return TreeSelectModule;
    }());
    TreeSelectModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TreeSelectModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    TreeSelectModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TreeSelectModule, declarations: [TreeSelect], imports: [i3.CommonModule, ripple.RippleModule, i1.SharedModule, i2.TreeModule], exports: [TreeSelect, i1.SharedModule, i2.TreeModule] });
    TreeSelectModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TreeSelectModule, imports: [[i3.CommonModule, ripple.RippleModule, i1.SharedModule, i2.TreeModule], i1.SharedModule, i2.TreeModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: TreeSelectModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule, ripple.RippleModule, i1.SharedModule, i2.TreeModule],
                        exports: [TreeSelect, i1.SharedModule, i2.TreeModule],
                        declarations: [TreeSelect]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.TREESELECT_VALUE_ACCESSOR = TREESELECT_VALUE_ACCESSOR;
    exports.TreeSelect = TreeSelect;
    exports.TreeSelectModule = TreeSelectModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-treeselect.umd.js.map
