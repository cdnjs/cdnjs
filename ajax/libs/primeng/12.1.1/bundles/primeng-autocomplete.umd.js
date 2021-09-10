(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/animations'), require('primeng/inputtext'), require('primeng/button'), require('primeng/ripple'), require('primeng/api'), require('primeng/dom'), require('primeng/utils'), require('@angular/forms'), require('@angular/cdk/scrolling')) :
    typeof define === 'function' && define.amd ? define('primeng/autocomplete', ['exports', '@angular/core', '@angular/common', '@angular/animations', 'primeng/inputtext', 'primeng/button', 'primeng/ripple', 'primeng/api', 'primeng/dom', 'primeng/utils', '@angular/forms', '@angular/cdk/scrolling'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.autocomplete = {}), global.ng.core, global.ng.common, global.ng.animations, global.primeng.inputtext, global.primeng.button, global.primeng.ripple, global.primeng.api, global.primeng.dom, global.primeng.utils, global.ng.forms, global.ng.cdk.scrolling));
}(this, (function (exports, i0, i3, animations, inputtext, i4, i5, i1, dom, utils, forms, i2) { 'use strict';

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
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
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

    var AUTOCOMPLETE_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return AutoComplete; }),
        multi: true
    };
    var AutoComplete = /** @class */ (function () {
        function AutoComplete(el, renderer, cd, differs, config, overlayService) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.differs = differs;
            this.config = config;
            this.overlayService = overlayService;
            this.minLength = 1;
            this.delay = 300;
            this.type = 'text';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.dropdownIcon = "pi pi-chevron-down";
            this.unique = true;
            this.completeOnFocus = false;
            this.completeMethod = new i0.EventEmitter();
            this.onSelect = new i0.EventEmitter();
            this.onUnselect = new i0.EventEmitter();
            this.onFocus = new i0.EventEmitter();
            this.onBlur = new i0.EventEmitter();
            this.onDropdownClick = new i0.EventEmitter();
            this.onClear = new i0.EventEmitter();
            this.onKeyUp = new i0.EventEmitter();
            this.onShow = new i0.EventEmitter();
            this.onHide = new i0.EventEmitter();
            this.scrollHeight = '200px';
            this.dropdownMode = 'blank';
            this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
            this.hideTransitionOptions = '.1s linear';
            this.autocomplete = 'off';
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
            this.overlayVisible = false;
            this.focus = false;
            this.inputFieldValue = null;
            this.differ = differs.find([]).create(null);
            this.listId = utils.UniqueComponentId() + '_list';
        }
        Object.defineProperty(AutoComplete.prototype, "suggestions", {
            get: function () {
                return this._suggestions;
            },
            set: function (val) {
                this._suggestions = val;
                this.handleSuggestionsChange();
            },
            enumerable: false,
            configurable: true
        });
        AutoComplete.prototype.ngAfterViewChecked = function () {
            var _this = this;
            //Use timeouts as since Angular 4.2, AfterViewChecked is broken and not called after panel is updated
            if (this.suggestionsUpdated && this.overlay && this.overlay.offsetParent) {
                setTimeout(function () {
                    if (_this.overlay) {
                        _this.alignOverlay();
                    }
                }, 1);
                this.suggestionsUpdated = false;
            }
            if (this.highlightOptionChanged) {
                setTimeout(function () {
                    if (_this.overlay && _this.itemsWrapper) {
                        var listItem = dom.DomHandler.findSingle(_this.overlay, 'li.p-highlight');
                        if (listItem) {
                            dom.DomHandler.scrollInView(_this.itemsWrapper, listItem);
                        }
                        if (_this.virtualScroll && _this.viewPort) {
                            var range = _this.viewPort.getRenderedRange();
                            _this.updateVirtualScrollSelectedIndex();
                            if (range.start > _this.virtualScrollSelectedIndex || range.end < _this.virtualScrollSelectedIndex) {
                                _this.viewPort.scrollToIndex(_this.virtualScrollSelectedIndex);
                            }
                        }
                    }
                }, 1);
                this.highlightOptionChanged = false;
            }
        };
        AutoComplete.prototype.handleSuggestionsChange = function () {
            if (this._suggestions != null && this.loading) {
                this.highlightOption = null;
                if (this._suggestions.length) {
                    this.noResults = false;
                    this.show();
                    this.suggestionsUpdated = true;
                    if (this.autoHighlight) {
                        this.highlightOption = this._suggestions[0];
                    }
                }
                else {
                    this.noResults = true;
                    if (this.showEmptyMessage) {
                        this.show();
                        this.suggestionsUpdated = true;
                    }
                    else {
                        this.hide();
                    }
                }
                this.loading = false;
            }
        };
        AutoComplete.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    case 'group':
                        _this.groupTemplate = item.template;
                        break;
                    case 'selectedItem':
                        _this.selectedItemTemplate = item.template;
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
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        AutoComplete.prototype.updateVirtualScrollSelectedIndex = function () {
            if (this.highlightOption && this.suggestions && this.suggestions.length) {
                this.virtualScrollSelectedIndex = this.findOptionIndex(this.highlightOption, this.suggestions);
            }
        };
        AutoComplete.prototype.writeValue = function (value) {
            this.value = value;
            this.filled = this.value && this.value != '';
            this.updateInputField();
            this.cd.markForCheck();
        };
        AutoComplete.prototype.getOptionGroupChildren = function (optionGroup) {
            return this.optionGroupChildren ? utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
        };
        AutoComplete.prototype.getOptionGroupLabel = function (optionGroup) {
            return this.optionGroupLabel ? utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : (optionGroup.label != undefined ? optionGroup.label : optionGroup);
        };
        AutoComplete.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        AutoComplete.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        AutoComplete.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        AutoComplete.prototype.onInput = function (event) {
            var _this = this;
            // When an input element with a placeholder is clicked, the onInput event is invoked in IE.
            if (!this.inputKeyDown && dom.DomHandler.isIE()) {
                return;
            }
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            var value = event.target.value;
            if (!this.multiple && !this.forceSelection) {
                this.onModelChange(value);
            }
            if (value.length === 0 && !this.multiple) {
                this.hide();
                this.onClear.emit(event);
                this.onModelChange(value);
            }
            if (value.length >= this.minLength) {
                this.timeout = setTimeout(function () {
                    _this.search(event, value);
                }, this.delay);
            }
            else {
                this.hide();
            }
            this.updateFilledState();
            this.inputKeyDown = false;
        };
        AutoComplete.prototype.onInputClick = function (event) {
            if (this.documentClickListener) {
                this.inputClick = true;
            }
        };
        AutoComplete.prototype.search = function (event, query) {
            //allow empty string but not undefined or null
            if (query === undefined || query === null) {
                return;
            }
            this.loading = true;
            this.completeMethod.emit({
                originalEvent: event,
                query: query
            });
        };
        AutoComplete.prototype.selectItem = function (option, focus) {
            if (focus === void 0) { focus = true; }
            if (this.forceSelectionUpdateModelTimeout) {
                clearTimeout(this.forceSelectionUpdateModelTimeout);
                this.forceSelectionUpdateModelTimeout = null;
            }
            if (this.multiple) {
                this.multiInputEL.nativeElement.value = '';
                this.value = this.value || [];
                if (!this.isSelected(option) || !this.unique) {
                    this.value = __spreadArray(__spreadArray([], __read(this.value)), [option]);
                    this.onModelChange(this.value);
                }
            }
            else {
                this.inputEL.nativeElement.value = this.resolveFieldData(option);
                this.value = option;
                this.onModelChange(this.value);
            }
            this.onSelect.emit(option);
            this.updateFilledState();
            if (focus) {
                this.itemClicked = true;
                this.focusInput();
            }
        };
        AutoComplete.prototype.show = function () {
            if (this.multiInputEL || this.inputEL) {
                var hasFocus = this.multiple ?
                    this.multiInputEL.nativeElement.ownerDocument.activeElement == this.multiInputEL.nativeElement :
                    this.inputEL.nativeElement.ownerDocument.activeElement == this.inputEL.nativeElement;
                if (!this.overlayVisible && hasFocus) {
                    this.overlayVisible = true;
                }
            }
        };
        AutoComplete.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.overlay = event.element;
                    this.itemsWrapper = this.virtualScroll ? dom.DomHandler.findSingle(this.overlay, '.cdk-virtual-scroll-viewport') : this.overlay;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        utils.ZIndexUtils.set('overlay', this.overlay, this.baseZIndex + this.config.zIndex.overlay);
                    }
                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                    this.onShow.emit(event);
                    break;
                case 'void':
                    this.onOverlayHide();
                    break;
            }
        };
        AutoComplete.prototype.onOverlayAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    if (this.autoZIndex) {
                        utils.ZIndexUtils.clear(event.element);
                    }
                    break;
            }
        };
        AutoComplete.prototype.onOverlayClick = function (event) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        };
        AutoComplete.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.overlay);
                else
                    dom.DomHandler.appendChild(this.overlay, this.appendTo);
                if (!this.overlay.style.minWidth) {
                    this.overlay.style.minWidth = dom.DomHandler.getWidth(this.el.nativeElement.children[0]) + 'px';
                }
            }
        };
        AutoComplete.prototype.resolveFieldData = function (value) {
            var data = this.field ? utils.ObjectUtils.resolveFieldData(value, this.field) : value;
            return data !== (null || undefined) ? data : '';
        };
        AutoComplete.prototype.restoreOverlayAppend = function () {
            if (this.overlay && this.appendTo) {
                this.el.nativeElement.appendChild(this.overlay);
            }
        };
        AutoComplete.prototype.alignOverlay = function () {
            if (this.appendTo)
                dom.DomHandler.absolutePosition(this.overlay, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
            else
                dom.DomHandler.relativePosition(this.overlay, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
        };
        AutoComplete.prototype.hide = function () {
            this.overlayVisible = false;
            this.cd.markForCheck();
        };
        AutoComplete.prototype.handleDropdownClick = function (event) {
            if (!this.overlayVisible) {
                this.focusInput();
                var queryValue = this.multiple ? this.multiInputEL.nativeElement.value : this.inputEL.nativeElement.value;
                if (this.dropdownMode === 'blank')
                    this.search(event, '');
                else if (this.dropdownMode === 'current')
                    this.search(event, queryValue);
                this.onDropdownClick.emit({
                    originalEvent: event,
                    query: queryValue
                });
            }
            else {
                this.hide();
            }
        };
        AutoComplete.prototype.focusInput = function () {
            if (this.multiple)
                this.multiInputEL.nativeElement.focus();
            else
                this.inputEL.nativeElement.focus();
        };
        Object.defineProperty(AutoComplete.prototype, "emptyMessageLabel", {
            get: function () {
                return this.emptyMessage || this.config.getTranslation(i1.TranslationKeys.EMPTY_MESSAGE);
            },
            enumerable: false,
            configurable: true
        });
        AutoComplete.prototype.removeItem = function (item) {
            var itemIndex = dom.DomHandler.index(item);
            var removedValue = this.value[itemIndex];
            this.value = this.value.filter(function (val, i) { return i != itemIndex; });
            this.onModelChange(this.value);
            this.updateFilledState();
            this.onUnselect.emit(removedValue);
        };
        AutoComplete.prototype.onKeydown = function (event) {
            if (this.overlayVisible) {
                switch (event.which) {
                    //down
                    case 40:
                        if (this.group) {
                            var highlightItemIndex = this.findOptionGroupIndex(this.highlightOption, this.suggestions);
                            if (highlightItemIndex !== -1) {
                                var nextItemIndex_1 = highlightItemIndex.itemIndex + 1;
                                if (nextItemIndex_1 < (this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex]).length)) {
                                    this.highlightOption = this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex])[nextItemIndex_1];
                                    this.highlightOptionChanged = true;
                                }
                                else if (this.suggestions[highlightItemIndex.groupIndex + 1]) {
                                    this.highlightOption = this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex + 1])[0];
                                    this.highlightOptionChanged = true;
                                }
                            }
                            else {
                                this.highlightOption = this.getOptionGroupChildren(this.suggestions[0])[0];
                            }
                        }
                        else {
                            var highlightItemIndex = this.findOptionIndex(this.highlightOption, this.suggestions);
                            if (highlightItemIndex != -1) {
                                var nextItemIndex = highlightItemIndex + 1;
                                if (nextItemIndex != (this.suggestions.length)) {
                                    this.highlightOption = this.suggestions[nextItemIndex];
                                    this.highlightOptionChanged = true;
                                }
                            }
                            else {
                                this.highlightOption = this.suggestions[0];
                            }
                        }
                        event.preventDefault();
                        break;
                    //up
                    case 38:
                        if (this.group) {
                            var highlightItemIndex = this.findOptionGroupIndex(this.highlightOption, this.suggestions);
                            if (highlightItemIndex !== -1) {
                                var prevItemIndex = highlightItemIndex.itemIndex - 1;
                                if (prevItemIndex >= 0) {
                                    this.highlightOption = this.getOptionGroupChildren(this.suggestions[highlightItemIndex.groupIndex])[prevItemIndex];
                                    this.highlightOptionChanged = true;
                                }
                                else if (prevItemIndex < 0) {
                                    var prevGroup = this.suggestions[highlightItemIndex.groupIndex - 1];
                                    if (prevGroup) {
                                        this.highlightOption = this.getOptionGroupChildren(prevGroup)[this.getOptionGroupChildren(prevGroup).length - 1];
                                        this.highlightOptionChanged = true;
                                    }
                                }
                            }
                        }
                        else {
                            var highlightItemIndex = this.findOptionIndex(this.highlightOption, this.suggestions);
                            if (highlightItemIndex > 0) {
                                var prevItemIndex = highlightItemIndex - 1;
                                this.highlightOption = this.suggestions[prevItemIndex];
                                this.highlightOptionChanged = true;
                            }
                        }
                        event.preventDefault();
                        break;
                    //enter
                    case 13:
                        if (this.highlightOption) {
                            this.selectItem(this.highlightOption);
                            this.hide();
                        }
                        event.preventDefault();
                        break;
                    //escape
                    case 27:
                        this.hide();
                        event.preventDefault();
                        break;
                    //tab
                    case 9:
                        if (this.highlightOption) {
                            this.selectItem(this.highlightOption);
                        }
                        this.hide();
                        break;
                }
            }
            else {
                if (event.which === 40 && this.suggestions) {
                    this.search(event, event.target.value);
                }
            }
            if (this.multiple) {
                switch (event.which) {
                    //backspace
                    case 8:
                        if (this.value && this.value.length && !this.multiInputEL.nativeElement.value) {
                            this.value = __spreadArray([], __read(this.value));
                            var removedValue = this.value.pop();
                            this.onModelChange(this.value);
                            this.updateFilledState();
                            this.onUnselect.emit(removedValue);
                        }
                        break;
                }
            }
            this.inputKeyDown = true;
        };
        AutoComplete.prototype.onKeyup = function (event) {
            this.onKeyUp.emit(event);
        };
        AutoComplete.prototype.onInputFocus = function (event) {
            if (!this.itemClicked && this.completeOnFocus) {
                var queryValue = this.multiple ? this.multiInputEL.nativeElement.value : this.inputEL.nativeElement.value;
                this.search(event, queryValue);
            }
            this.focus = true;
            this.onFocus.emit(event);
            this.itemClicked = false;
        };
        AutoComplete.prototype.onInputBlur = function (event) {
            this.focus = false;
            this.onModelTouched();
            this.onBlur.emit(event);
        };
        AutoComplete.prototype.onInputChange = function (event) {
            var e_1, _a;
            var _this = this;
            if (this.forceSelection) {
                var valid = false;
                var inputValue = event.target.value.trim();
                if (this.suggestions) {
                    var _loop_1 = function (suggestion) {
                        var itemValue = this_1.field ? utils.ObjectUtils.resolveFieldData(suggestion, this_1.field) : suggestion;
                        if (itemValue && inputValue === itemValue.trim()) {
                            valid = true;
                            this_1.forceSelectionUpdateModelTimeout = setTimeout(function () {
                                _this.selectItem(suggestion, false);
                            }, 250);
                            return "break";
                        }
                    };
                    var this_1 = this;
                    try {
                        for (var _b = __values(this.suggestions), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var suggestion = _c.value;
                            var state_1 = _loop_1(suggestion);
                            if (state_1 === "break")
                                break;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                if (!valid) {
                    if (this.multiple) {
                        this.multiInputEL.nativeElement.value = '';
                    }
                    else {
                        this.value = null;
                        this.inputEL.nativeElement.value = '';
                    }
                    this.onClear.emit(event);
                    this.onModelChange(this.value);
                    this.updateFilledState();
                }
            }
        };
        AutoComplete.prototype.onInputPaste = function (event) {
            this.onKeydown(event);
        };
        AutoComplete.prototype.isSelected = function (val) {
            var selected = false;
            if (this.value && this.value.length) {
                for (var i = 0; i < this.value.length; i++) {
                    if (utils.ObjectUtils.equals(this.value[i], val, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
            return selected;
        };
        AutoComplete.prototype.findOptionIndex = function (option, suggestions) {
            var index = -1;
            if (suggestions) {
                for (var i = 0; i < suggestions.length; i++) {
                    if (utils.ObjectUtils.equals(option, suggestions[i])) {
                        index = i;
                        break;
                    }
                }
            }
            return index;
        };
        AutoComplete.prototype.findOptionGroupIndex = function (val, opts) {
            var groupIndex, itemIndex;
            if (opts) {
                for (var i = 0; i < opts.length; i++) {
                    groupIndex = i;
                    itemIndex = this.findOptionIndex(val, this.getOptionGroupChildren(opts[i]));
                    if (itemIndex !== -1) {
                        break;
                    }
                }
            }
            if (itemIndex !== -1) {
                return { groupIndex: groupIndex, itemIndex: itemIndex };
            }
            else {
                return -1;
            }
        };
        AutoComplete.prototype.updateFilledState = function () {
            if (this.multiple)
                this.filled = (this.value && this.value.length) || (this.multiInputEL && this.multiInputEL.nativeElement && this.multiInputEL.nativeElement.value != '');
            else
                this.filled = (this.inputFieldValue && this.inputFieldValue != '') || (this.inputEL && this.inputEL.nativeElement && this.inputEL.nativeElement.value != '');
            ;
        };
        AutoComplete.prototype.updateInputField = function () {
            var formattedValue = this.resolveFieldData(this.value);
            this.inputFieldValue = formattedValue;
            if (this.inputEL && this.inputEL.nativeElement) {
                this.inputEL.nativeElement.value = formattedValue;
            }
            this.updateFilledState();
        };
        AutoComplete.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                var documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
                this.documentClickListener = this.renderer.listen(documentTarget, 'click', function (event) {
                    if (event.which === 3) {
                        return;
                    }
                    if (!_this.inputClick && !_this.isDropdownClick(event)) {
                        _this.hide();
                    }
                    _this.inputClick = false;
                    _this.cd.markForCheck();
                });
            }
        };
        AutoComplete.prototype.isDropdownClick = function (event) {
            if (this.dropdown) {
                var target = event.target;
                return (target === this.dropdownButton.nativeElement || target.parentNode === this.dropdownButton.nativeElement);
            }
            else {
                return false;
            }
        };
        AutoComplete.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        AutoComplete.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        AutoComplete.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        AutoComplete.prototype.onWindowResize = function () {
            this.hide();
        };
        AutoComplete.prototype.bindScrollListener = function () {
            var _this = this;
            if (!this.scrollHandler) {
                this.scrollHandler = new dom.ConnectedOverlayScrollHandler(this.containerEL.nativeElement, function () {
                    if (_this.overlayVisible) {
                        _this.hide();
                    }
                });
            }
            this.scrollHandler.bindScrollListener();
        };
        AutoComplete.prototype.unbindScrollListener = function () {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        };
        AutoComplete.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.unbindScrollListener();
            this.overlay = null;
            this.onHide.emit();
        };
        AutoComplete.prototype.ngOnDestroy = function () {
            if (this.forceSelectionUpdateModelTimeout) {
                clearTimeout(this.forceSelectionUpdateModelTimeout);
                this.forceSelectionUpdateModelTimeout = null;
            }
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }
            if (this.overlay) {
                utils.ZIndexUtils.clear(this.overlay);
            }
            this.restoreOverlayAppend();
            this.onOverlayHide();
        };
        return AutoComplete;
    }());
    AutoComplete.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AutoComplete, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.Renderer2 }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.IterableDiffers }, { token: i1__namespace.PrimeNGConfig }, { token: i1__namespace.OverlayService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    AutoComplete.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: AutoComplete, selector: "p-autoComplete", inputs: { minLength: "minLength", delay: "delay", style: "style", panelStyle: "panelStyle", styleClass: "styleClass", panelStyleClass: "panelStyleClass", inputStyle: "inputStyle", inputId: "inputId", inputStyleClass: "inputStyleClass", placeholder: "placeholder", readonly: "readonly", disabled: "disabled", virtualScroll: "virtualScroll", itemSize: "itemSize", maxlength: "maxlength", name: "name", required: "required", size: "size", appendTo: "appendTo", autoHighlight: "autoHighlight", forceSelection: "forceSelection", type: "type", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", ariaLabel: "ariaLabel", ariaLabelledBy: "ariaLabelledBy", dropdownIcon: "dropdownIcon", unique: "unique", group: "group", completeOnFocus: "completeOnFocus", field: "field", scrollHeight: "scrollHeight", dropdown: "dropdown", showEmptyMessage: "showEmptyMessage", dropdownMode: "dropdownMode", multiple: "multiple", tabindex: "tabindex", dataKey: "dataKey", emptyMessage: "emptyMessage", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", autofocus: "autofocus", autocomplete: "autocomplete", optionGroupChildren: "optionGroupChildren", optionGroupLabel: "optionGroupLabel", suggestions: "suggestions" }, outputs: { completeMethod: "completeMethod", onSelect: "onSelect", onUnselect: "onUnselect", onFocus: "onFocus", onBlur: "onBlur", onDropdownClick: "onDropdownClick", onClear: "onClear", onKeyUp: "onKeyUp", onShow: "onShow", onHide: "onHide" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "(focus && !disabled) ||\u00A0overlayVisible" }, classAttribute: "p-element p-inputwrapper" }, providers: [AUTOCOMPLETE_VALUE_ACCESSOR], queries: [{ propertyName: "templates", predicate: i1.PrimeTemplate }], viewQueries: [{ propertyName: "containerEL", first: true, predicate: ["container"], descendants: true }, { propertyName: "inputEL", first: true, predicate: ["in"], descendants: true }, { propertyName: "multiInputEL", first: true, predicate: ["multiIn"], descendants: true }, { propertyName: "multiContainerEL", first: true, predicate: ["multiContainer"], descendants: true }, { propertyName: "dropdownButton", first: true, predicate: ["ddBtn"], descendants: true }, { propertyName: "viewPort", first: true, predicate: i2.CdkVirtualScrollViewport, descendants: true }], ngImport: i0__namespace, template: "\n        <span #container [ngClass]=\"{'p-autocomplete p-component':true,'p-autocomplete-dd':dropdown,'p-autocomplete-multiple':multiple}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input *ngIf=\"!multiple\" #in [attr.type]=\"type\" [attr.id]=\"inputId\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [autocomplete]=\"autocomplete\" [attr.required]=\"required\" [attr.name]=\"name\"\n            class=\"p-autocomplete-input p-inputtext p-component\" [ngClass]=\"{'p-autocomplete-dd-input':dropdown,'p-disabled': disabled}\" [value]=\"inputFieldValue\" aria-autocomplete=\"list\" [attr.aria-controls]=\"listId\" role=\"searchbox\" [attr.aria-expanded]=\"overlayVisible\" aria-haspopup=\"true\" [attr.aria-activedescendant]=\"'p-highlighted-option'\"\n            (click)=\"onInputClick($event)\" (input)=\"onInput($event)\" (keydown)=\"onKeydown($event)\" (keyup)=\"onKeyup($event)\" [attr.autofocus]=\"autofocus\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (change)=\"onInputChange($event)\" (paste)=\"onInputPaste($event)\"\n            [attr.placeholder]=\"placeholder\" [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.aria-required]=\"required\"\n            ><ul *ngIf=\"multiple\" #multiContainer class=\"p-autocomplete-multiple-container p-component p-inputtext\" [ngClass]=\"{'p-disabled':disabled,'p-focus':focus}\" (click)=\"multiIn.focus()\">\n                <li #token *ngFor=\"let val of value\" class=\"p-autocomplete-token\">\n                    <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: val}\"></ng-container>\n                    <span *ngIf=\"!selectedItemTemplate\" class=\"p-autocomplete-token-label\">{{resolveFieldData(val)}}</span>\n                    <span  class=\"p-autocomplete-token-icon pi pi-times-circle\" (click)=\"removeItem(token)\" *ngIf=\"!disabled && !readonly\"></span>\n                </li>\n                <li class=\"p-autocomplete-input-token\">\n                    <input #multiIn [attr.type]=\"type\" [attr.id]=\"inputId\" [disabled]=\"disabled\" [attr.placeholder]=\"(value&&value.length ? null : placeholder)\" [attr.tabindex]=\"tabindex\" [attr.maxlength]=\"maxlength\" (input)=\"onInput($event)\"  (click)=\"onInputClick($event)\"\n                            (keydown)=\"onKeydown($event)\" [readonly]=\"readonly\" (keyup)=\"onKeyup($event)\" [attr.autofocus]=\"autofocus\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (change)=\"onInputChange($event)\" (paste)=\"onInputPaste($event)\" [autocomplete]=\"autocomplete\"\n                            [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.aria-required]=\"required\"\n                            aria-autocomplete=\"list\" [attr.aria-controls]=\"listId\" role=\"searchbox\" [attr.aria-expanded]=\"overlayVisible\" aria-haspopup=\"true\" [attr.aria-activedescendant]=\"'p-highlighted-option'\">\n                </li>\n            </ul>\n            <i *ngIf=\"loading\" class=\"p-autocomplete-loader pi pi-spinner pi-spin\"></i><button #ddBtn type=\"button\" pButton [icon]=\"dropdownIcon\" class=\"p-autocomplete-dropdown\" [disabled]=\"disabled\" pRipple\n                (click)=\"handleDropdownClick($event)\" *ngIf=\"dropdown\" [attr.tabindex]=\"tabindex\"></button>\n            <div #panel *ngIf=\"overlayVisible\" (click)=\"onOverlayClick($event)\" [ngClass]=\"['p-autocomplete-panel p-component']\" [style.max-height]=\"virtualScroll ? 'auto' : scrollHeight\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\"\n                [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\">\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                <ul role=\"listbox\" [attr.id]=\"listId\" class=\"p-autocomplete-items\" [ngClass]=\"{'p-autocomplete-virtualscroll': virtualScroll}\">\n                    <ng-container *ngIf=\"group\">\n                        <ng-template ngFor let-optgroup [ngForOf]=\"suggestions\">\n                            <li class=\"p-autocomplete-item-group\">\n                                <span *ngIf=\"!groupTemplate\">{{getOptionGroupLabel(optgroup)||'empty'}}</span>\n                                <ng-container *ngTemplateOutlet=\"groupTemplate; context: {$implicit: optgroup}\"></ng-container>\n                            </li>\n                            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: getOptionGroupChildren(optgroup)}\"></ng-container>\n                        </ng-template>\n                    </ng-container>\n                    <ng-container *ngIf=\"!group\">\n                            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: suggestions}\"></ng-container>\n                    </ng-container>\n                    <ng-template #itemslist let-suggestionsToDisplay>\n                        <ng-container *ngIf=\"!virtualScroll; else virtualScrollList\">\n                            <li role=\"option\" *ngFor=\"let option of suggestionsToDisplay; let idx = index\" class=\"p-autocomplete-item\" pRipple [ngClass]=\"{'p-highlight': (option === highlightOption)}\" [id]=\"highlightOption == option ? 'p-highlighted-option':''\" (click)=\"selectItem(option)\">\n                                <span *ngIf=\"!itemTemplate\">{{resolveFieldData(option)}}</span>\n                                <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: idx}\"></ng-container>\n                            </li>\n                        </ng-container>\n                        <ng-template #virtualScrollList>\n                            <cdk-virtual-scroll-viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" *ngIf=\"virtualScroll && !noResults\">\n                                <ng-container *cdkVirtualFor=\"let option of suggestionsToDisplay; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd\">\n                                    <li role=\"option\" class=\"p-autocomplete-item\" pRipple [ngClass]=\"{'p-highlight': (option === highlightOption)}\" [ngStyle]=\"{'height': itemSize + 'px'}\" [id]=\"highlightOption == option ? 'p-highlighted-option':''\" (click)=\"selectItem(option)\">\n                                        <span *ngIf=\"!itemTemplate\">{{resolveFieldData(option)}}</span>\n                                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: i}\"></ng-container>\n                                    </li>\n                                </ng-container>\n                            </cdk-virtual-scroll-viewport>\n                        </ng-template>\n                        <li *ngIf=\"noResults && showEmptyMessage\" class=\"p-autocomplete-empty-message\">\n                            <ng-container *ngIf=\"!emptyTemplate; else empty\">\n                                {{emptyMessageLabel}}\n                            </ng-container>\n                            <ng-container #empty *ngTemplateOutlet=\"emptyTemplate\"></ng-container>\n                        </li>\n                    </ng-template>\n                </ul>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </span>\n    ", isInline: true, styles: [".p-autocomplete{display:inline-flex;position:relative}.p-autocomplete-loader{position:absolute;top:50%;margin-top:-.5rem}.p-autocomplete-dd .p-autocomplete-input{flex:1 1 auto;width:1%}.p-autocomplete-dd .p-autocomplete-input,.p-autocomplete-dd .p-autocomplete-multiple-container{border-top-right-radius:0;border-bottom-right-radius:0}.p-autocomplete-dd .p-autocomplete-dropdown{border-top-left-radius:0;border-bottom-left-radius:0}.p-autocomplete .p-autocomplete-panel{min-width:100%;top:0;left:0}.p-autocomplete-panel{position:absolute;overflow:auto}.p-autocomplete-items{margin:0;padding:0;list-style-type:none}.p-autocomplete-item{cursor:pointer;white-space:nowrap;position:relative;overflow:hidden}.p-autocomplete-multiple-container{margin:0;padding:0;list-style-type:none;cursor:text;overflow:hidden;display:flex;align-items:center;flex-wrap:wrap}.p-autocomplete-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-autocomplete-token-icon{cursor:pointer}.p-autocomplete-input-token{flex:1 1 auto;display:inline-flex}.p-autocomplete-input-token input{border:0;outline:0 none;background-color:transparent;margin:0;padding:0;box-shadow:none;border-radius:0;width:100%}.p-fluid .p-autocomplete{display:flex}.p-fluid .p-autocomplete-dd .p-autocomplete-input{width:1%}"], components: [{ type: i2__namespace.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation"], outputs: ["scrolledIndexChange"] }], directives: [{ type: i3__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4__namespace.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { type: i5__namespace.Ripple, selector: "[pRipple]" }, { type: i2__namespace.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i2__namespace.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }], animations: [
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
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AutoComplete, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-autoComplete',
                        template: "\n        <span #container [ngClass]=\"{'p-autocomplete p-component':true,'p-autocomplete-dd':dropdown,'p-autocomplete-multiple':multiple}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input *ngIf=\"!multiple\" #in [attr.type]=\"type\" [attr.id]=\"inputId\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [autocomplete]=\"autocomplete\" [attr.required]=\"required\" [attr.name]=\"name\"\n            class=\"p-autocomplete-input p-inputtext p-component\" [ngClass]=\"{'p-autocomplete-dd-input':dropdown,'p-disabled': disabled}\" [value]=\"inputFieldValue\" aria-autocomplete=\"list\" [attr.aria-controls]=\"listId\" role=\"searchbox\" [attr.aria-expanded]=\"overlayVisible\" aria-haspopup=\"true\" [attr.aria-activedescendant]=\"'p-highlighted-option'\"\n            (click)=\"onInputClick($event)\" (input)=\"onInput($event)\" (keydown)=\"onKeydown($event)\" (keyup)=\"onKeyup($event)\" [attr.autofocus]=\"autofocus\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (change)=\"onInputChange($event)\" (paste)=\"onInputPaste($event)\"\n            [attr.placeholder]=\"placeholder\" [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.aria-required]=\"required\"\n            ><ul *ngIf=\"multiple\" #multiContainer class=\"p-autocomplete-multiple-container p-component p-inputtext\" [ngClass]=\"{'p-disabled':disabled,'p-focus':focus}\" (click)=\"multiIn.focus()\">\n                <li #token *ngFor=\"let val of value\" class=\"p-autocomplete-token\">\n                    <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: val}\"></ng-container>\n                    <span *ngIf=\"!selectedItemTemplate\" class=\"p-autocomplete-token-label\">{{resolveFieldData(val)}}</span>\n                    <span  class=\"p-autocomplete-token-icon pi pi-times-circle\" (click)=\"removeItem(token)\" *ngIf=\"!disabled && !readonly\"></span>\n                </li>\n                <li class=\"p-autocomplete-input-token\">\n                    <input #multiIn [attr.type]=\"type\" [attr.id]=\"inputId\" [disabled]=\"disabled\" [attr.placeholder]=\"(value&&value.length ? null : placeholder)\" [attr.tabindex]=\"tabindex\" [attr.maxlength]=\"maxlength\" (input)=\"onInput($event)\"  (click)=\"onInputClick($event)\"\n                            (keydown)=\"onKeydown($event)\" [readonly]=\"readonly\" (keyup)=\"onKeyup($event)\" [attr.autofocus]=\"autofocus\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" (change)=\"onInputChange($event)\" (paste)=\"onInputPaste($event)\" [autocomplete]=\"autocomplete\"\n                            [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.aria-required]=\"required\"\n                            aria-autocomplete=\"list\" [attr.aria-controls]=\"listId\" role=\"searchbox\" [attr.aria-expanded]=\"overlayVisible\" aria-haspopup=\"true\" [attr.aria-activedescendant]=\"'p-highlighted-option'\">\n                </li>\n            </ul>\n            <i *ngIf=\"loading\" class=\"p-autocomplete-loader pi pi-spinner pi-spin\"></i><button #ddBtn type=\"button\" pButton [icon]=\"dropdownIcon\" class=\"p-autocomplete-dropdown\" [disabled]=\"disabled\" pRipple\n                (click)=\"handleDropdownClick($event)\" *ngIf=\"dropdown\" [attr.tabindex]=\"tabindex\"></button>\n            <div #panel *ngIf=\"overlayVisible\" (click)=\"onOverlayClick($event)\" [ngClass]=\"['p-autocomplete-panel p-component']\" [style.max-height]=\"virtualScroll ? 'auto' : scrollHeight\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\"\n                [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationEnd($event)\">\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n                <ul role=\"listbox\" [attr.id]=\"listId\" class=\"p-autocomplete-items\" [ngClass]=\"{'p-autocomplete-virtualscroll': virtualScroll}\">\n                    <ng-container *ngIf=\"group\">\n                        <ng-template ngFor let-optgroup [ngForOf]=\"suggestions\">\n                            <li class=\"p-autocomplete-item-group\">\n                                <span *ngIf=\"!groupTemplate\">{{getOptionGroupLabel(optgroup)||'empty'}}</span>\n                                <ng-container *ngTemplateOutlet=\"groupTemplate; context: {$implicit: optgroup}\"></ng-container>\n                            </li>\n                            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: getOptionGroupChildren(optgroup)}\"></ng-container>\n                        </ng-template>\n                    </ng-container>\n                    <ng-container *ngIf=\"!group\">\n                            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: suggestions}\"></ng-container>\n                    </ng-container>\n                    <ng-template #itemslist let-suggestionsToDisplay>\n                        <ng-container *ngIf=\"!virtualScroll; else virtualScrollList\">\n                            <li role=\"option\" *ngFor=\"let option of suggestionsToDisplay; let idx = index\" class=\"p-autocomplete-item\" pRipple [ngClass]=\"{'p-highlight': (option === highlightOption)}\" [id]=\"highlightOption == option ? 'p-highlighted-option':''\" (click)=\"selectItem(option)\">\n                                <span *ngIf=\"!itemTemplate\">{{resolveFieldData(option)}}</span>\n                                <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: idx}\"></ng-container>\n                            </li>\n                        </ng-container>\n                        <ng-template #virtualScrollList>\n                            <cdk-virtual-scroll-viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" *ngIf=\"virtualScroll && !noResults\">\n                                <ng-container *cdkVirtualFor=\"let option of suggestionsToDisplay; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd\">\n                                    <li role=\"option\" class=\"p-autocomplete-item\" pRipple [ngClass]=\"{'p-highlight': (option === highlightOption)}\" [ngStyle]=\"{'height': itemSize + 'px'}\" [id]=\"highlightOption == option ? 'p-highlighted-option':''\" (click)=\"selectItem(option)\">\n                                        <span *ngIf=\"!itemTemplate\">{{resolveFieldData(option)}}</span>\n                                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: i}\"></ng-container>\n                                    </li>\n                                </ng-container>\n                            </cdk-virtual-scroll-viewport>\n                        </ng-template>\n                        <li *ngIf=\"noResults && showEmptyMessage\" class=\"p-autocomplete-empty-message\">\n                            <ng-container *ngIf=\"!emptyTemplate; else empty\">\n                                {{emptyMessageLabel}}\n                            </ng-container>\n                            <ng-container #empty *ngTemplateOutlet=\"emptyTemplate\"></ng-container>\n                        </li>\n                    </ng-template>\n                </ul>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </span>\n    ",
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
                            '[class.p-inputwrapper-filled]': 'filled',
                            '[class.p-inputwrapper-focus]': '(focus && !disabled) || overlayVisible'
                        },
                        providers: [AUTOCOMPLETE_VALUE_ACCESSOR],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./autocomplete.css']
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.IterableDiffers }, { type: i1__namespace.PrimeNGConfig }, { type: i1__namespace.OverlayService }]; }, propDecorators: { minLength: [{
                    type: i0.Input
                }], delay: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], panelStyle: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], panelStyleClass: [{
                    type: i0.Input
                }], inputStyle: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], inputStyleClass: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], readonly: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], virtualScroll: [{
                    type: i0.Input
                }], itemSize: [{
                    type: i0.Input
                }], maxlength: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], required: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }], appendTo: [{
                    type: i0.Input
                }], autoHighlight: [{
                    type: i0.Input
                }], forceSelection: [{
                    type: i0.Input
                }], type: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], ariaLabel: [{
                    type: i0.Input
                }], ariaLabelledBy: [{
                    type: i0.Input
                }], dropdownIcon: [{
                    type: i0.Input
                }], unique: [{
                    type: i0.Input
                }], group: [{
                    type: i0.Input
                }], completeOnFocus: [{
                    type: i0.Input
                }], completeMethod: [{
                    type: i0.Output
                }], onSelect: [{
                    type: i0.Output
                }], onUnselect: [{
                    type: i0.Output
                }], onFocus: [{
                    type: i0.Output
                }], onBlur: [{
                    type: i0.Output
                }], onDropdownClick: [{
                    type: i0.Output
                }], onClear: [{
                    type: i0.Output
                }], onKeyUp: [{
                    type: i0.Output
                }], onShow: [{
                    type: i0.Output
                }], onHide: [{
                    type: i0.Output
                }], field: [{
                    type: i0.Input
                }], scrollHeight: [{
                    type: i0.Input
                }], dropdown: [{
                    type: i0.Input
                }], showEmptyMessage: [{
                    type: i0.Input
                }], dropdownMode: [{
                    type: i0.Input
                }], multiple: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], dataKey: [{
                    type: i0.Input
                }], emptyMessage: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }], autofocus: [{
                    type: i0.Input
                }], autocomplete: [{
                    type: i0.Input
                }], optionGroupChildren: [{
                    type: i0.Input
                }], optionGroupLabel: [{
                    type: i0.Input
                }], containerEL: [{
                    type: i0.ViewChild,
                    args: ['container']
                }], inputEL: [{
                    type: i0.ViewChild,
                    args: ['in']
                }], multiInputEL: [{
                    type: i0.ViewChild,
                    args: ['multiIn']
                }], multiContainerEL: [{
                    type: i0.ViewChild,
                    args: ['multiContainer']
                }], dropdownButton: [{
                    type: i0.ViewChild,
                    args: ['ddBtn']
                }], viewPort: [{
                    type: i0.ViewChild,
                    args: [i2.CdkVirtualScrollViewport]
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i1.PrimeTemplate]
                }], suggestions: [{
                    type: i0.Input
                }] } });
    var AutoCompleteModule = /** @class */ (function () {
        function AutoCompleteModule() {
        }
        return AutoCompleteModule;
    }());
    AutoCompleteModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AutoCompleteModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AutoCompleteModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AutoCompleteModule, declarations: [AutoComplete], imports: [i3.CommonModule, inputtext.InputTextModule, i4.ButtonModule, i1.SharedModule, i5.RippleModule, i2.ScrollingModule], exports: [AutoComplete, i1.SharedModule, i2.ScrollingModule] });
    AutoCompleteModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AutoCompleteModule, imports: [[i3.CommonModule, inputtext.InputTextModule, i4.ButtonModule, i1.SharedModule, i5.RippleModule, i2.ScrollingModule], i1.SharedModule, i2.ScrollingModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: AutoCompleteModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule, inputtext.InputTextModule, i4.ButtonModule, i1.SharedModule, i5.RippleModule, i2.ScrollingModule],
                        exports: [AutoComplete, i1.SharedModule, i2.ScrollingModule],
                        declarations: [AutoComplete]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AUTOCOMPLETE_VALUE_ACCESSOR = AUTOCOMPLETE_VALUE_ACCESSOR;
    exports.AutoComplete = AutoComplete;
    exports.AutoCompleteModule = AutoCompleteModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-autocomplete.umd.js.map
