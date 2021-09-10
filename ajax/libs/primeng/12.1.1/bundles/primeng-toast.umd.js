(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('primeng/utils'), require('primeng/ripple'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('primeng/toast', ['exports', '@angular/core', '@angular/common', 'primeng/dom', 'primeng/api', 'primeng/utils', 'primeng/ripple', '@angular/animations'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.toast = {}), global.ng.core, global.ng.common, global.primeng.dom, global.primeng.api, global.primeng.utils, global.primeng.ripple, global.ng.animations));
}(this, (function (exports, i0, i1, dom, i3, utils, i2, animations) { 'use strict';

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
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
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

    var ToastItem = /** @class */ (function () {
        function ToastItem(zone) {
            this.zone = zone;
            this.onClose = new i0.EventEmitter();
        }
        ToastItem.prototype.ngAfterViewInit = function () {
            this.initTimeout();
        };
        ToastItem.prototype.initTimeout = function () {
            var _this = this;
            if (!this.message.sticky) {
                this.zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () {
                        _this.onClose.emit({
                            index: _this.index,
                            message: _this.message
                        });
                    }, _this.message.life || 3000);
                });
            }
        };
        ToastItem.prototype.clearTimeout = function () {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
        };
        ToastItem.prototype.onMouseEnter = function () {
            this.clearTimeout();
        };
        ToastItem.prototype.onMouseLeave = function () {
            this.initTimeout();
        };
        ToastItem.prototype.onCloseIconClick = function (event) {
            this.clearTimeout();
            this.onClose.emit({
                index: this.index,
                message: this.message
            });
            event.preventDefault();
        };
        ToastItem.prototype.ngOnDestroy = function () {
            this.clearTimeout();
        };
        return ToastItem;
    }());
    ToastItem.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToastItem, deps: [{ token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Component });
    ToastItem.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: ToastItem, selector: "p-toastItem", inputs: { message: "message", index: "index", template: "template", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onClose: "onClose" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0__namespace, template: "\n        <div #container [attr.id]=\"message.id\" [class]=\"message.styleClass\" [ngClass]=\"['p-toast-message-' + message.severity, 'p-toast-message']\" [@messageState]=\"{value: 'visible', params: {showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n                (mouseenter)=\"onMouseEnter()\" (mouseleave)=\"onMouseLeave()\">\n            <div class=\"p-toast-message-content\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\"  [ngClass]=\"message.contentStyleClass\">\n                <ng-container *ngIf=\"!template\">\n                    <span [class]=\"'p-toast-message-icon pi' + (message.icon ? ' ' + message.icon : '')\" [ngClass]=\"{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',\n                        'pi-times-circle': message.severity == 'error', 'pi-check' :message.severity == 'success'}\"></span>\n                    <div class=\"p-toast-message-text\">\n                        <div class=\"p-toast-summary\">{{message.summary}}</div>\n                        <div class=\"p-toast-detail\">{{message.detail}}</div>\n                    </div>\n                </ng-container>\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: message}\"></ng-container>\n                <button type=\"button\" class=\"p-toast-icon-close p-link\" (click)=\"onCloseIconClick($event)\" (keydown.enter)=\"onCloseIconClick($event)\" *ngIf=\"message.closable !== false\" pRipple>\n                    <span class=\"p-toast-icon-close-icon pi pi-times\"></span>\n                </button>\n            </div>\n        </div>\n    ", isInline: true, directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2__namespace.Ripple, selector: "[pRipple]" }], animations: [
            animations.trigger('messageState', [
                animations.state('visible', animations.style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                animations.transition('void => *', [
                    animations.style({ transform: '{{showTransformParams}}', opacity: 0 }),
                    animations.animate('{{showTransitionParams}}')
                ]),
                animations.transition('* => void', [
                    animations.animate(('{{hideTransitionParams}}'), animations.style({
                        height: 0,
                        opacity: 0,
                        transform: '{{hideTransformParams}}'
                    }))
                ])
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToastItem, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-toastItem',
                        template: "\n        <div #container [attr.id]=\"message.id\" [class]=\"message.styleClass\" [ngClass]=\"['p-toast-message-' + message.severity, 'p-toast-message']\" [@messageState]=\"{value: 'visible', params: {showTransformParams: showTransformOptions, hideTransformParams: hideTransformOptions, showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n                (mouseenter)=\"onMouseEnter()\" (mouseleave)=\"onMouseLeave()\">\n            <div class=\"p-toast-message-content\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\"  [ngClass]=\"message.contentStyleClass\">\n                <ng-container *ngIf=\"!template\">\n                    <span [class]=\"'p-toast-message-icon pi' + (message.icon ? ' ' + message.icon : '')\" [ngClass]=\"{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',\n                        'pi-times-circle': message.severity == 'error', 'pi-check' :message.severity == 'success'}\"></span>\n                    <div class=\"p-toast-message-text\">\n                        <div class=\"p-toast-summary\">{{message.summary}}</div>\n                        <div class=\"p-toast-detail\">{{message.detail}}</div>\n                    </div>\n                </ng-container>\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: message}\"></ng-container>\n                <button type=\"button\" class=\"p-toast-icon-close p-link\" (click)=\"onCloseIconClick($event)\" (keydown.enter)=\"onCloseIconClick($event)\" *ngIf=\"message.closable !== false\" pRipple>\n                    <span class=\"p-toast-icon-close-icon pi pi-times\"></span>\n                </button>\n            </div>\n        </div>\n    ",
                        animations: [
                            animations.trigger('messageState', [
                                animations.state('visible', animations.style({
                                    transform: 'translateY(0)',
                                    opacity: 1
                                })),
                                animations.transition('void => *', [
                                    animations.style({ transform: '{{showTransformParams}}', opacity: 0 }),
                                    animations.animate('{{showTransitionParams}}')
                                ]),
                                animations.transition('* => void', [
                                    animations.animate(('{{hideTransitionParams}}'), animations.style({
                                        height: 0,
                                        opacity: 0,
                                        transform: '{{hideTransformParams}}'
                                    }))
                                ])
                            ])
                        ],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.NgZone }]; }, propDecorators: { message: [{
                    type: i0.Input
                }], index: [{
                    type: i0.Input
                }], template: [{
                    type: i0.Input
                }], showTransformOptions: [{
                    type: i0.Input
                }], hideTransformOptions: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }], onClose: [{
                    type: i0.Output
                }], containerViewChild: [{
                    type: i0.ViewChild,
                    args: ['container']
                }] } });
    var Toast = /** @class */ (function () {
        function Toast(messageService, cd, config) {
            this.messageService = messageService;
            this.cd = cd;
            this.config = config;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.position = 'top-right';
            this.preventOpenDuplicates = false;
            this.preventDuplicates = false;
            this.showTransformOptions = 'translateY(100%)';
            this.hideTransformOptions = 'translateY(-100%)';
            this.showTransitionOptions = '300ms ease-out';
            this.hideTransitionOptions = '250ms ease-in';
            this.onClose = new i0.EventEmitter();
            this.id = utils.UniqueComponentId();
        }
        Toast.prototype.ngOnInit = function () {
            var _this = this;
            this.messageSubscription = this.messageService.messageObserver.subscribe(function (messages) {
                if (messages) {
                    if (messages instanceof Array) {
                        var filteredMessages = messages.filter(function (m) { return _this.canAdd(m); });
                        _this.add(filteredMessages);
                    }
                    else if (_this.canAdd(messages)) {
                        _this.add([messages]);
                    }
                }
            });
            this.clearSubscription = this.messageService.clearObserver.subscribe(function (key) {
                if (key) {
                    if (_this.key === key) {
                        _this.messages = null;
                    }
                }
                else {
                    _this.messages = null;
                }
                _this.cd.markForCheck();
            });
        };
        Toast.prototype.ngAfterViewInit = function () {
            if (this.autoZIndex) {
                utils.ZIndexUtils.set('modal', this.containerViewChild.nativeElement, this.baseZIndex || this.config.zIndex.modal);
            }
            if (this.breakpoints) {
                this.createStyle();
            }
        };
        Toast.prototype.add = function (messages) {
            this.messages = this.messages ? __spreadArray(__spreadArray([], __read(this.messages)), __read(messages)) : __spreadArray([], __read(messages));
            if (this.preventDuplicates) {
                this.messagesArchieve = this.messagesArchieve ? __spreadArray(__spreadArray([], __read(this.messagesArchieve)), __read(messages)) : __spreadArray([], __read(messages));
            }
            this.cd.markForCheck();
        };
        Toast.prototype.canAdd = function (message) {
            var allow = this.key === message.key;
            if (allow && this.preventOpenDuplicates) {
                allow = !this.containsMessage(this.messages, message);
            }
            if (allow && this.preventDuplicates) {
                allow = !this.containsMessage(this.messagesArchieve, message);
            }
            return allow;
        };
        Toast.prototype.containsMessage = function (collection, message) {
            if (!collection) {
                return false;
            }
            return collection.find(function (m) {
                return ((m.summary === message.summary) && (m.detail == message.detail) && (m.severity === message.severity));
            }) != null;
        };
        Toast.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'message':
                        _this.template = item.template;
                        break;
                    default:
                        _this.template = item.template;
                        break;
                }
            });
        };
        Toast.prototype.onMessageClose = function (event) {
            this.messages.splice(event.index, 1);
            this.onClose.emit({
                message: event.message
            });
            this.cd.detectChanges();
        };
        Toast.prototype.onAnimationStart = function (event) {
            if (event.fromState === 'void' && this.autoZIndex) {
                this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                this.containerViewChild.nativeElement.setAttribute(this.id, '');
            }
        };
        Toast.prototype.createStyle = function () {
            if (!this.styleElement) {
                this.styleElement = document.createElement('style');
                this.styleElement.type = 'text/css';
                document.head.appendChild(this.styleElement);
                var innerHTML = '';
                for (var breakpoint in this.breakpoints) {
                    var breakpointStyle = '';
                    for (var styleProp in this.breakpoints[breakpoint]) {
                        breakpointStyle += styleProp + ':' + this.breakpoints[breakpoint][styleProp] + ' !important;';
                    }
                    innerHTML += "\n                    @media screen and (max-width: " + breakpoint + ") {\n                        .p-toast[" + this.id + "] {\n                           " + breakpointStyle + "\n                        }\n                    }\n                ";
                }
                this.styleElement.innerHTML = innerHTML;
            }
        };
        Toast.prototype.destroyStyle = function () {
            if (this.styleElement) {
                document.head.removeChild(this.styleElement);
                this.styleElement = null;
            }
        };
        Toast.prototype.ngOnDestroy = function () {
            if (this.messageSubscription) {
                this.messageSubscription.unsubscribe();
            }
            if (this.containerViewChild && this.autoZIndex) {
                utils.ZIndexUtils.clear(this.containerViewChild.nativeElement);
            }
            if (this.clearSubscription) {
                this.clearSubscription.unsubscribe();
            }
            this.destroyStyle();
        };
        return Toast;
    }());
    Toast.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Toast, deps: [{ token: i3__namespace.MessageService }, { token: i0__namespace.ChangeDetectorRef }, { token: i3__namespace.PrimeNGConfig }], target: i0__namespace.ɵɵFactoryTarget.Component });
    Toast.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: Toast, selector: "p-toast", inputs: { key: "key", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", style: "style", styleClass: "styleClass", position: "position", preventOpenDuplicates: "preventOpenDuplicates", preventDuplicates: "preventDuplicates", showTransformOptions: "showTransformOptions", hideTransformOptions: "hideTransformOptions", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", breakpoints: "breakpoints" }, outputs: { onClose: "onClose" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: i3.PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }], ngImport: i0__namespace, template: "\n        <div #container [ngClass]=\"'p-toast p-component p-toast-' + position\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <p-toastItem *ngFor=\"let msg of messages; let i=index\" [message]=\"msg\" [index]=\"i\" (onClose)=\"onMessageClose($event)\"\n                    [template]=\"template\" @toastAnimation (@toastAnimation.start)=\"onAnimationStart($event)\"\n                    [showTransformOptions]=\"showTransformOptions\" [hideTransformOptions]=\"hideTransformOptions\"\n                    [showTransitionOptions]=\"showTransitionOptions\" [hideTransitionOptions]=\"hideTransitionOptions\"></p-toastItem>\n        </div>\n    ", isInline: true, styles: [".p-toast{position:fixed;width:25rem}.p-toast-message{overflow:hidden}.p-toast-message-content{display:flex;align-items:flex-start}.p-toast-message-text{flex:1 1 auto}.p-toast-top-right{top:20px;right:20px}.p-toast-top-left{top:20px;left:20px}.p-toast-bottom-left{bottom:20px;left:20px}.p-toast-bottom-right{bottom:20px;right:20px}.p-toast-top-center{top:20px;left:50%;transform:translateX(-50%)}.p-toast-bottom-center{bottom:20px;left:50%;transform:translateX(-50%)}.p-toast-center{left:50%;top:50%;min-width:20vw;transform:translate(-50%,-50%)}.p-toast-icon-close{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-toast-icon-close.p-link{cursor:pointer}"], components: [{ type: ToastItem, selector: "p-toastItem", inputs: ["message", "index", "template", "showTransformOptions", "hideTransformOptions", "showTransitionOptions", "hideTransitionOptions"], outputs: ["onClose"] }], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [
            animations.trigger('toastAnimation', [
                animations.transition(':enter, :leave', [
                    animations.query('@*', animations.animateChild())
                ])
            ])
        ], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: Toast, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-toast',
                        template: "\n        <div #container [ngClass]=\"'p-toast p-component p-toast-' + position\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <p-toastItem *ngFor=\"let msg of messages; let i=index\" [message]=\"msg\" [index]=\"i\" (onClose)=\"onMessageClose($event)\"\n                    [template]=\"template\" @toastAnimation (@toastAnimation.start)=\"onAnimationStart($event)\"\n                    [showTransformOptions]=\"showTransformOptions\" [hideTransformOptions]=\"hideTransformOptions\"\n                    [showTransitionOptions]=\"showTransitionOptions\" [hideTransitionOptions]=\"hideTransitionOptions\"></p-toastItem>\n        </div>\n    ",
                        animations: [
                            animations.trigger('toastAnimation', [
                                animations.transition(':enter, :leave', [
                                    animations.query('@*', animations.animateChild())
                                ])
                            ])
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./toast.css'],
                        host: {
                            'class': 'p-element'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i3__namespace.MessageService }, { type: i0__namespace.ChangeDetectorRef }, { type: i3__namespace.PrimeNGConfig }]; }, propDecorators: { key: [{
                    type: i0.Input
                }], autoZIndex: [{
                    type: i0.Input
                }], baseZIndex: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], position: [{
                    type: i0.Input
                }], preventOpenDuplicates: [{
                    type: i0.Input
                }], preventDuplicates: [{
                    type: i0.Input
                }], showTransformOptions: [{
                    type: i0.Input
                }], hideTransformOptions: [{
                    type: i0.Input
                }], showTransitionOptions: [{
                    type: i0.Input
                }], hideTransitionOptions: [{
                    type: i0.Input
                }], breakpoints: [{
                    type: i0.Input
                }], onClose: [{
                    type: i0.Output
                }], containerViewChild: [{
                    type: i0.ViewChild,
                    args: ['container']
                }], templates: [{
                    type: i0.ContentChildren,
                    args: [i3.PrimeTemplate]
                }] } });
    var ToastModule = /** @class */ (function () {
        function ToastModule() {
        }
        return ToastModule;
    }());
    ToastModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToastModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    ToastModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToastModule, declarations: [Toast, ToastItem], imports: [i1.CommonModule, i2.RippleModule], exports: [Toast, i3.SharedModule] });
    ToastModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToastModule, imports: [[i1.CommonModule, i2.RippleModule], i3.SharedModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: ToastModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i2.RippleModule],
                        exports: [Toast, i3.SharedModule],
                        declarations: [Toast, ToastItem]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Toast = Toast;
    exports.ToastItem = ToastItem;
    exports.ToastModule = ToastModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-toast.umd.js.map
