(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/router'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('angulartics2', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/router', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.angulartics2 = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.common, global.ng.router, global.ng.platformBrowser));
})(this, (function (exports, i0, rxjs, operators, i2, i1, i2$1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);

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
        return to.concat(ar || Array.prototype.slice.call(from));
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

    var DefaultConfig = /** @class */ (function () {
        function DefaultConfig() {
            this.pageTracking = {
                autoTrackVirtualPages: true,
                basePath: '',
                excludedRoutes: [],
                clearIds: false,
                clearHash: false,
                clearQueryParams: false,
                idsRegExp: /^\d+$|^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
            };
            this.developerMode = false;
            this.ga = {};
            this.appInsights = {};
            this.gtm = {};
            this.gst = {};
        }
        return DefaultConfig;
    }());

    var ANGULARTICS2_TOKEN = new i0.InjectionToken('ANGULARTICS2');

    var RouterlessTracking = /** @class */ (function () {
        function RouterlessTracking() {
        }
        RouterlessTracking.prototype.trackLocation = function (settings) {
            return new rxjs.BehaviorSubject({ url: '/' });
        };
        RouterlessTracking.prototype.prepareExternalUrl = function (url) {
            return url;
        };
        return RouterlessTracking;
    }());

    var Angulartics2 = /** @class */ (function () {
        function Angulartics2(tracker, setup) {
            var _this = this;
            this.tracker = tracker;
            this.pageTrack = new rxjs.ReplaySubject(10);
            this.eventTrack = new rxjs.ReplaySubject(10);
            this.exceptionTrack = new rxjs.ReplaySubject(10);
            this.setAlias = new rxjs.ReplaySubject(10);
            this.setUsername = new rxjs.ReplaySubject(10);
            this.setUserProperties = new rxjs.ReplaySubject(10);
            this.setUserPropertiesOnce = new rxjs.ReplaySubject(10);
            this.setSuperProperties = new rxjs.ReplaySubject(10);
            this.setSuperPropertiesOnce = new rxjs.ReplaySubject(10);
            this.userTimings = new rxjs.ReplaySubject(10);
            var defaultConfig = new DefaultConfig();
            this.settings = Object.assign(Object.assign({}, defaultConfig), setup.settings);
            this.settings.pageTracking = Object.assign(Object.assign({}, defaultConfig.pageTracking), setup.settings.pageTracking);
            this.tracker
                .trackLocation(this.settings)
                .subscribe(function (event) { return _this.trackUrlChange(event.url); });
        }
        /** filters all events when developer mode is true */
        Angulartics2.prototype.filterDeveloperMode = function () {
            var _this = this;
            return operators.filter(function (value, index) { return !_this.settings.developerMode; });
        };
        Angulartics2.prototype.trackUrlChange = function (url) {
            if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
                var clearedUrl = this.clearUrl(url);
                var path = void 0;
                if (this.settings.pageTracking.basePath.length) {
                    path = this.settings.pageTracking.basePath + clearedUrl;
                }
                else {
                    path = this.tracker.prepareExternalUrl(clearedUrl);
                }
                this.pageTrack.next({ path: path });
            }
        };
        /**
         * Use string literals or regular expressions to exclude routes
         * from automatic pageview tracking.
         *
         * @param url location
         */
        Angulartics2.prototype.matchesExcludedRoute = function (url) {
            var e_1, _a;
            try {
                for (var _b = __values(this.settings.pageTracking.excludedRoutes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var excludedRoute = _c.value;
                    var matchesRegex = excludedRoute instanceof RegExp && excludedRoute.test(url);
                    if (matchesRegex || url.indexOf(excludedRoute) !== -1) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
        /**
         * Removes id's from tracked route.
         *  EX: `/project/12981/feature` becomes `/project/feature`
         *
         * @param url current page path
         */
        Angulartics2.prototype.clearUrl = function (url) {
            var _this = this;
            if (this.settings.pageTracking.clearIds ||
                this.settings.pageTracking.clearQueryParams ||
                this.settings.pageTracking.clearHash) {
                return url
                    .split('/')
                    .map(function (part) { return (_this.settings.pageTracking.clearQueryParams ? part.split('?')[0] : part); })
                    .map(function (part) { return (_this.settings.pageTracking.clearHash ? part.split('#')[0] : part); })
                    .filter(function (part) { return !_this.settings.pageTracking.clearIds ||
                    !part.match(_this.settings.pageTracking.idsRegExp); })
                    .join('/');
            }
            return url;
        };
        return Angulartics2;
    }());
    Angulartics2.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2_Factory() { return new Angulartics2(i0__namespace.ɵɵinject(RouterlessTracking), i0__namespace.ɵɵinject(ANGULARTICS2_TOKEN)); }, token: Angulartics2, providedIn: "root" });
    Angulartics2.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2.ctorParameters = function () { return [
        { type: RouterlessTracking },
        { type: undefined, decorators: [{ type: i0.Inject, args: [ANGULARTICS2_TOKEN,] }] }
    ]; };

    /**
     * Track Route changes for applications using Angular's
     * default router
     *
     * @link https://angular.io/api/router/Router
     */
    var AngularRouterTracking = /** @class */ (function () {
        function AngularRouterTracking(router, location) {
            this.router = router;
            this.location = location;
        }
        AngularRouterTracking.prototype.trackLocation = function (settings) {
            return this.router.events.pipe(operators.filter(function (e) { return e instanceof i1.NavigationEnd; }), operators.filter(function () { return !settings.developerMode; }), operators.map(function (e) {
                return { url: e.urlAfterRedirects };
            }), operators.delay(0));
        };
        AngularRouterTracking.prototype.prepareExternalUrl = function (url) {
            return this.location.prepareExternalUrl(url);
        };
        return AngularRouterTracking;
    }());
    AngularRouterTracking.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function AngularRouterTracking_Factory() { return new AngularRouterTracking(i0__namespace.ɵɵinject(i1__namespace.Router), i0__namespace.ɵɵinject(i2__namespace.Location)); }, token: AngularRouterTracking, providedIn: "root" });
    AngularRouterTracking.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    AngularRouterTracking.ctorParameters = function () { return [
        { type: i1.Router },
        { type: i2.Location }
    ]; };

    var Angulartics2On = /** @class */ (function () {
        function Angulartics2On(elRef, angulartics2, renderer) {
            this.elRef = elRef;
            this.angulartics2 = angulartics2;
            this.renderer = renderer;
            this.angularticsProperties = {};
        }
        Angulartics2On.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.renderer.listen(this.elRef.nativeElement, this.angulartics2On || 'click', function (event) { return _this.eventTrack(event); });
        };
        Angulartics2On.prototype.eventTrack = function (event) {
            var action = this.angularticsAction; // || this.inferEventName();
            var properties = Object.assign(Object.assign({}, this.angularticsProperties), { eventType: event.type });
            if (this.angularticsCategory) {
                properties.category = this.angularticsCategory;
            }
            if (this.angularticsLabel) {
                properties.label = this.angularticsLabel;
            }
            if (this.angularticsValue) {
                properties.value = this.angularticsValue;
            }
            this.angulartics2.eventTrack.next({
                action: action,
                properties: properties,
            });
        };
        return Angulartics2On;
    }());
    Angulartics2On.decorators = [
        { type: i0.Directive, args: [{ selector: '[angulartics2On]' },] }
    ];
    Angulartics2On.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: Angulartics2 },
        { type: i0.Renderer2 }
    ]; };
    Angulartics2On.propDecorators = {
        angulartics2On: [{ type: i0.Input, args: ['angulartics2On',] }],
        angularticsAction: [{ type: i0.Input }],
        angularticsCategory: [{ type: i0.Input }],
        angularticsLabel: [{ type: i0.Input }],
        angularticsValue: [{ type: i0.Input }],
        angularticsProperties: [{ type: i0.Input }]
    };
    var Angulartics2OnModule = /** @class */ (function () {
        function Angulartics2OnModule() {
        }
        return Angulartics2OnModule;
    }());
    Angulartics2OnModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [Angulartics2On],
                    exports: [Angulartics2On],
                },] }
    ];

    var Angulartics2Module = /** @class */ (function () {
        function Angulartics2Module() {
        }
        Angulartics2Module.forRoot = function (settings) {
            if (settings === void 0) { settings = {}; }
            return {
                ngModule: Angulartics2Module,
                providers: [
                    { provide: ANGULARTICS2_TOKEN, useValue: { settings: settings } },
                    { provide: RouterlessTracking, useClass: AngularRouterTracking },
                    Angulartics2,
                ],
            };
        };
        return Angulartics2Module;
    }());
    Angulartics2Module.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [Angulartics2OnModule],
                    exports: [Angulartics2On],
                },] }
    ];

    var Angulartics2RouterlessModule = /** @class */ (function () {
        function Angulartics2RouterlessModule() {
        }
        Angulartics2RouterlessModule.forRoot = function (settings) {
            if (settings === void 0) { settings = {}; }
            return {
                ngModule: Angulartics2RouterlessModule,
                providers: [
                    { provide: ANGULARTICS2_TOKEN, useValue: { settings: settings } },
                    RouterlessTracking,
                    Angulartics2,
                ],
            };
        };
        return Angulartics2RouterlessModule;
    }());
    Angulartics2RouterlessModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [Angulartics2OnModule],
                },] }
    ];

    var Angulartics2AdobeAnalytics = /** @class */ (function () {
        function Angulartics2AdobeAnalytics(angulartics2, location) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.location = location;
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2AdobeAnalytics.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2AdobeAnalytics.prototype.pageTrack = function (path) {
            if (typeof s !== 'undefined' && s) {
                s.clearVars();
                s.t({ pageName: path });
            }
        };
        /**
         * Track Event in Adobe Analytics
         *
         * @param action associated with the event
         * @param properties action detials
         *
         * @link https://marketing.adobe.com/resources/help/en_US/sc/implement/js_implementation.html
         */
        Angulartics2AdobeAnalytics.prototype.eventTrack = function (action, properties) {
            // TODO: make interface
            // @property {string} properties.category
            // @property {string} properties.label
            // @property {number} properties.value
            // @property {boolean} properties.noninteraction
            if (!properties) {
                properties = properties || {};
            }
            if (typeof s !== 'undefined' && s) {
                if (typeof properties === 'object') {
                    this.setUserProperties(properties);
                }
                if (action) {
                    // if linkName property is passed, use that; otherwise, the action is the linkName
                    var linkName = properties['linkName'] ? properties['linkName'] : action;
                    // note that 'this' should refer the link element, but we can't get that in this function. example:
                    // <a href="http://anothersite.com" onclick="s.tl(this,'e','AnotherSite',null)">
                    // if disableDelay property is passed, use that to turn off/on the 500ms delay; otherwise, it uses this
                    var disableDelay = !!properties['disableDelay'] ? true : this;
                    // if action property is passed, use that; otherwise, the action remains unchanged
                    if (properties['action']) {
                        action = properties['action'];
                    }
                    this.setPageName();
                    if (action.toUpperCase() === 'DOWNLOAD') {
                        s.tl(disableDelay, 'd', linkName);
                    }
                    else if (action.toUpperCase() === 'EXIT') {
                        s.tl(disableDelay, 'e', linkName);
                    }
                    else {
                        s.tl(disableDelay, 'o', linkName);
                    }
                }
            }
        };
        Angulartics2AdobeAnalytics.prototype.setPageName = function () {
            var path = this.location.path(true);
            var hashNdx = path.indexOf('#');
            if (hashNdx > 0 && hashNdx < path.length) {
                s.pageName = path.substring(hashNdx + 1);
            }
            else {
                s.pageName = path;
            }
        };
        Angulartics2AdobeAnalytics.prototype.setUserProperties = function (properties) {
            if (typeof s !== 'undefined' && s) {
                if (typeof properties === 'object') {
                    for (var key in properties) {
                        if (properties.hasOwnProperty(key)) {
                            s[key] = properties[key];
                        }
                    }
                }
            }
        };
        return Angulartics2AdobeAnalytics;
    }());
    Angulartics2AdobeAnalytics.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2AdobeAnalytics_Factory() { return new Angulartics2AdobeAnalytics(i0__namespace.ɵɵinject(Angulartics2), i0__namespace.ɵɵinject(i2__namespace.Location)); }, token: Angulartics2AdobeAnalytics, providedIn: "root" });
    Angulartics2AdobeAnalytics.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2AdobeAnalytics.ctorParameters = function () { return [
        { type: Angulartics2 },
        { type: i2.Location }
    ]; };

    var AppInsightsDefaults = /** @class */ (function () {
        function AppInsightsDefaults() {
            this.userId = null;
        }
        return AppInsightsDefaults;
    }());
    var Angulartics2AppInsights = /** @class */ (function () {
        function Angulartics2AppInsights(angulartics2, title, router) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.title = title;
            this.router = router;
            this.loadStartTime = null;
            this.loadTime = null;
            this.metrics = null;
            this.dimensions = null;
            this.measurements = null;
            if (typeof appInsights === 'undefined') {
                console.warn('appInsights not found');
            }
            var defaults = new AppInsightsDefaults();
            // Set the default settings for this module
            this.angulartics2.settings.appInsights = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.appInsights);
            this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2AppInsights.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
            this.angulartics2.exceptionTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.exceptionTrack(x); });
            this.router.events
                .pipe(this.angulartics2.filterDeveloperMode(), operators.filter(function (event) { return event instanceof i1.NavigationStart; }))
                .subscribe(function (event) { return _this.startTimer(); });
            this.router.events
                .pipe(operators.filter(function (event) { return event instanceof i1.NavigationError || event instanceof i1.NavigationEnd; }))
                .subscribe(function (error) { return _this.stopTimer(); });
        };
        Angulartics2AppInsights.prototype.startTimer = function () {
            this.loadStartTime = Date.now();
            this.loadTime = null;
        };
        Angulartics2AppInsights.prototype.stopTimer = function () {
            this.loadTime = Date.now() - this.loadStartTime;
            this.loadStartTime = null;
        };
        /**
         * Page Track in Baidu Analytics
         *
         * @param path - Location 'path'
         *
         * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
         */
        Angulartics2AppInsights.prototype.pageTrack = function (path) {
            appInsights.trackPageView(this.title.getTitle(), path, this.dimensions, this.metrics, this.loadTime);
        };
        /**
         * Log a user action or other occurrence.
         *
         * @param name Name to identify this event in the portal.
         * @param properties Additional data used to filter events and metrics in the portal. Defaults to empty.
         *
         * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
         */
        Angulartics2AppInsights.prototype.eventTrack = function (name, properties) {
            appInsights.trackEvent(name, properties, this.measurements);
        };
        /**
         * Exception Track Event in GA
         *
         * @param properties - Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
         * optional fields 'fatal' (boolean) and 'description' (string), error
         *
         * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
         */
        Angulartics2AppInsights.prototype.exceptionTrack = function (properties) {
            var description = properties.event || properties.description || properties;
            appInsights.trackException(description);
        };
        /**
         * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
         */
        Angulartics2AppInsights.prototype.setUsername = function (userId) {
            this.angulartics2.settings.appInsights.userId = userId;
            appInsights.setAuthenticatedUserContext(userId);
        };
        Angulartics2AppInsights.prototype.setUserProperties = function (properties) {
            if (properties.userId) {
                this.angulartics2.settings.appInsights.userId = properties.userId;
            }
            if (properties.accountId) {
                appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId, properties.accountId);
            }
            else {
                appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId);
            }
        };
        return Angulartics2AppInsights;
    }());
    Angulartics2AppInsights.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2AppInsights_Factory() { return new Angulartics2AppInsights(i0__namespace.ɵɵinject(Angulartics2), i0__namespace.ɵɵinject(i2__namespace$1.Title), i0__namespace.ɵɵinject(i1__namespace.Router)); }, token: Angulartics2AppInsights, providedIn: "root" });
    Angulartics2AppInsights.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2AppInsights.ctorParameters = function () { return [
        { type: Angulartics2 },
        { type: i2$1.Title },
        { type: i1.Router }
    ]; };

    var Angulartics2BaiduAnalytics = /** @class */ (function () {
        function Angulartics2BaiduAnalytics(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            if (typeof _hmt === 'undefined') {
                _hmt = [];
            }
            else {
                _hmt.push(['_setAutoPageview', false]);
            }
            this.angulartics2.setUsername
                .subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2BaiduAnalytics.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        /**
         * Page Track in Baidu Analytics
         *
         * @param path Required url 'path'
         *
         * @link http://tongji.baidu.com/open/api/more?p=ref_trackPageview
         */
        Angulartics2BaiduAnalytics.prototype.pageTrack = function (path) {
            if (typeof _hmt !== 'undefined' && _hmt) {
                _hmt.push(['_trackPageview', path]);
            }
        };
        /**
         * Track Event in Baidu Analytics
         *
         * @param action Name associated with the event
         * @param properties Comprised of:
         *  - 'category' (string)
         *  - 'opt_label' (string)
         *  - 'opt_value' (string)
         *
         * @link http://tongji.baidu.com/open/api/more?p=ref_trackEvent
         */
        Angulartics2BaiduAnalytics.prototype.eventTrack = function (action, properties) {
            // baidu analytics requires category
            if (!properties || !properties.category) {
                properties = properties || {};
                properties.category = 'Event';
                properties.opt_label = 'default';
                properties.opt_value = 'default';
            }
            if (typeof _hmt !== 'undefined' && _hmt) {
                _hmt.push([
                    '_trackEvent',
                    properties.category,
                    action,
                    properties.opt_label,
                    properties.opt_value,
                ]);
            }
        };
        Angulartics2BaiduAnalytics.prototype.setUsername = function (userId) {
            // set default custom variables name to 'identity' and 'value'
            _hmt.push(['_setCustomVar', 1, 'identity', userId]);
        };
        Angulartics2BaiduAnalytics.prototype.setUserProperties = function (properties) {
            _hmt.push(['_setCustomVar', 2, 'user', JSON.stringify(properties)]);
        };
        return Angulartics2BaiduAnalytics;
    }());
    Angulartics2BaiduAnalytics.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2BaiduAnalytics_Factory() { return new Angulartics2BaiduAnalytics(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2BaiduAnalytics, providedIn: "root" });
    Angulartics2BaiduAnalytics.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2BaiduAnalytics.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var facebookEventList = [
        'ViewContent',
        'Search',
        'AddToCart',
        'AddToWishlist',
        'InitiateCheckout',
        'AddPaymentInfo',
        'Purchase',
        'Lead',
        'CompleteRegistration',
    ];
    var Angulartics2Facebook = /** @class */ (function () {
        function Angulartics2Facebook(angulartics2) {
            this.angulartics2 = angulartics2;
        }
        Angulartics2Facebook.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        /**
         * Send interactions to the Pixel, i.e. for event tracking in Pixel
         *
         * @param action action associated with the event
         */
        Angulartics2Facebook.prototype.eventTrack = function (action, properties) {
            if (properties === void 0) { properties = {}; }
            if (typeof fbq === 'undefined') {
                return;
            }
            if (facebookEventList.indexOf(action) === -1) {
                return fbq('trackCustom', action, properties);
            }
            return fbq('track', action, properties);
        };
        return Angulartics2Facebook;
    }());
    Angulartics2Facebook.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Facebook_Factory() { return new Angulartics2Facebook(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Facebook, providedIn: "root" });
    Angulartics2Facebook.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Facebook.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var GoogleAnalyticsDefaults = /** @class */ (function () {
        function GoogleAnalyticsDefaults() {
            this.additionalAccountNames = [];
            this.userId = null;
            this.transport = '';
            this.anonymizeIp = false;
        }
        return GoogleAnalyticsDefaults;
    }());
    var Angulartics2GoogleAnalytics = /** @class */ (function () {
        function Angulartics2GoogleAnalytics(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.dimensionsAndMetrics = [];
            var defaults = new GoogleAnalyticsDefaults();
            // Set the default settings for this module
            this.angulartics2.settings.ga = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.ga);
            this.settings = this.angulartics2.settings.ga;
            this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2GoogleAnalytics.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
            this.angulartics2.exceptionTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.exceptionTrack(x); });
            this.angulartics2.userTimings
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.userTimings(x); });
        };
        Angulartics2GoogleAnalytics.prototype.pageTrack = function (path) {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
            if (typeof _gaq !== 'undefined' && _gaq) {
                _gaq.push(['_trackPageview', path]);
                try {
                    for (var _e = __values(this.angulartics2.settings.ga.additionalAccountNames), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var accountName = _f.value;
                        _gaq.push([accountName + '._trackPageview', path]);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (typeof ga !== 'undefined' && ga) {
                if (this.angulartics2.settings.ga.userId) {
                    ga('set', '&uid', this.angulartics2.settings.ga.userId);
                    try {
                        for (var _g = __values(this.angulartics2.settings.ga.additionalAccountNames), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var accountName = _h.value;
                            ga(accountName + '.set', '&uid', this.angulartics2.settings.ga.userId);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (this.angulartics2.settings.ga.anonymizeIp) {
                    ga('set', 'anonymizeIp', true);
                    try {
                        for (var _j = __values(this.angulartics2.settings.ga.additionalAccountNames), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var accountName = _k.value;
                            ga(accountName + '.set', 'anonymizeIp', true);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                ga('send', 'pageview', path);
                try {
                    for (var _l = __values(this.angulartics2.settings.ga.additionalAccountNames), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var accountName = _m.value;
                        ga(accountName + '.send', 'pageview', path);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        };
        /**
         * Track Event in GA
         *
         * @param action Associated with the event
         * @param properties Comprised of:
         *  - category (string) and optional
         *  - label (string)
         *  - value (integer)
         *  - noninteraction (boolean)
         *
         * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
         * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
         */
        Angulartics2GoogleAnalytics.prototype.eventTrack = function (action, properties) {
            var e_5, _a;
            // Google Analytics requires an Event Category
            if (!properties || !properties.category) {
                properties = properties || {};
                properties.category = 'Event';
            }
            // GA requires that eventValue be an integer, see:
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
            // https://github.com/luisfarzati/angulartics/issues/81
            if (properties.value) {
                var parsed = parseInt(properties.value, 10);
                properties.value = isNaN(parsed) ? 0 : parsed;
            }
            if (typeof ga !== 'undefined') {
                var eventOptions = Object.assign({ eventCategory: properties.category, eventAction: action, eventLabel: properties.label, eventValue: properties.value, nonInteraction: properties.noninteraction, page: properties.page || location.hash.substring(1) || location.pathname, userId: this.angulartics2.settings.ga.userId, hitCallback: properties.hitCallback }, (this.angulartics2.settings.ga.transport && {
                    transport: this.angulartics2.settings.ga.transport,
                }));
                // add custom dimensions and metrics
                this.setDimensionsAndMetrics(properties);
                ga('send', 'event', eventOptions);
                try {
                    for (var _b = __values(this.angulartics2.settings.ga.additionalAccountNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var accountName = _c.value;
                        ga(accountName + '.send', 'event', eventOptions);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
            else if (typeof _gaq !== 'undefined') {
                _gaq.push([
                    '_trackEvent',
                    properties.category,
                    action,
                    properties.label,
                    properties.value,
                    properties.noninteraction,
                ]);
            }
        };
        /**
         * Exception Track Event in GA
         *
         * @param properties Comprised of the optional fields:
         *  - fatal (string)
         *  - description (string)
         *
         * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
         *
         * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
         */
        Angulartics2GoogleAnalytics.prototype.exceptionTrack = function (properties) {
            var e_6, _a;
            if (properties.fatal === undefined) {
                console.log('No "fatal" provided, sending with fatal=true');
                properties.fatal = true;
            }
            properties.exDescription = properties.description;
            var eventOptions = {
                exFatal: properties.fatal,
                exDescription: properties.description,
            };
            ga('send', 'exception', eventOptions);
            try {
                for (var _b = __values(this.angulartics2.settings.ga.additionalAccountNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var accountName = _c.value;
                    ga(accountName + '.send', 'exception', eventOptions);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        };
        /**
         * User Timings Event in GA
         *
         * @param properties Comprised of the mandatory fields:
         *  - timingCategory (string)
         *  - timingVar (string)
         *  - timingValue (number)
         * Properties can also have the optional fields:
         *  - timingLabel (string)
         *
         * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
         */
        Angulartics2GoogleAnalytics.prototype.userTimings = function (properties) {
            var e_7, _a;
            if (!properties ||
                !properties.timingCategory ||
                !properties.timingVar ||
                !properties.timingValue) {
                console.error('Properties timingCategory, timingVar, and timingValue are required to be set.');
                return;
            }
            if (typeof ga !== 'undefined') {
                ga('send', 'timing', properties);
                try {
                    for (var _b = __values(this.angulartics2.settings.ga.additionalAccountNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var accountName = _c.value;
                        ga(accountName + '.send', 'timing', properties);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        };
        Angulartics2GoogleAnalytics.prototype.setUsername = function (userId) {
            this.angulartics2.settings.ga.userId = userId;
            if (typeof ga === 'undefined') {
                return;
            }
            ga('set', 'userId', userId);
        };
        Angulartics2GoogleAnalytics.prototype.setUserProperties = function (properties) {
            this.setDimensionsAndMetrics(properties);
        };
        Angulartics2GoogleAnalytics.prototype.setDimensionsAndMetrics = function (properties) {
            var _this = this;
            if (typeof ga === 'undefined') {
                return;
            }
            // clean previously used dimensions and metrics that will not be overriden
            this.dimensionsAndMetrics.forEach(function (elem) {
                if (!properties.hasOwnProperty(elem)) {
                    ga('set', elem, undefined);
                    _this.angulartics2.settings.ga.additionalAccountNames.forEach(function (accountName) {
                        ga(accountName + ".set", elem, undefined);
                    });
                }
            });
            this.dimensionsAndMetrics = [];
            // add custom dimensions and metrics
            Object.keys(properties).forEach(function (key) {
                if (key.lastIndexOf('dimension', 0) === 0 || key.lastIndexOf('metric', 0) === 0) {
                    ga('set', key, properties[key]);
                    _this.angulartics2.settings.ga.additionalAccountNames.forEach(function (accountName) {
                        ga(accountName + ".set", key, properties[key]);
                    });
                    _this.dimensionsAndMetrics.push(key);
                }
            });
        };
        return Angulartics2GoogleAnalytics;
    }());
    Angulartics2GoogleAnalytics.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalytics_Factory() { return new Angulartics2GoogleAnalytics(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2GoogleAnalytics, providedIn: "root" });
    Angulartics2GoogleAnalytics.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2GoogleAnalytics.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2GoogleAnalyticsEnhancedEcommerce = /** @class */ (function () {
        function Angulartics2GoogleAnalyticsEnhancedEcommerce() {
        }
        /**
         * Add impression in GA enhanced ecommerce tracking
         * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities
         */
        Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecAddImpression = function (properties) {
            ga('ec:addImpression', properties);
        };
        /**
         * Add product in GA enhanced ecommerce tracking
         * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
         */
        Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecAddProduct = function (product) {
            ga('ec:addProduct', product);
        };
        /**
         * Set action in GA enhanced ecommerce tracking
         * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
         */
        Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecSetAction = function (action, properties) {
            ga('ec:setAction', action, properties);
        };
        return Angulartics2GoogleAnalyticsEnhancedEcommerce;
    }());
    Angulartics2GoogleAnalyticsEnhancedEcommerce.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalyticsEnhancedEcommerce_Factory() { return new Angulartics2GoogleAnalyticsEnhancedEcommerce(); }, token: Angulartics2GoogleAnalyticsEnhancedEcommerce, providedIn: "root" });
    Angulartics2GoogleAnalyticsEnhancedEcommerce.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    var GoogleTagManagerDefaults = /** @class */ (function () {
        function GoogleTagManagerDefaults() {
            this.userId = null;
        }
        return GoogleTagManagerDefaults;
    }());
    var Angulartics2GoogleTagManager = /** @class */ (function () {
        function Angulartics2GoogleTagManager(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            // The dataLayer needs to be initialized
            if (typeof dataLayer !== 'undefined' && dataLayer) {
                dataLayer = window.dataLayer = window.dataLayer || [];
            }
            var defaults = new GoogleTagManagerDefaults();
            // Set the default settings for this module
            this.angulartics2.settings.gtm = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.gtm);
            this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
        }
        Angulartics2GoogleTagManager.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
            this.angulartics2.exceptionTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.exceptionTrack(x); });
        };
        Angulartics2GoogleTagManager.prototype.pageTrack = function (path) {
            this.pushLayer({
                event: 'Page View',
                'content-name': path,
                userId: this.angulartics2.settings.gtm.userId,
            });
        };
        /**
         * Send Data Layer
         *
         * @layer data layer object
         */
        Angulartics2GoogleTagManager.prototype.pushLayer = function (layer) {
            if (typeof dataLayer !== 'undefined' && dataLayer) {
                dataLayer.push(layer);
            }
        };
        /**
         * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
         *
         * @param action associated with the event
         */
        Angulartics2GoogleTagManager.prototype.eventTrack = function (action, properties) {
            // TODO: make interface
            //  @param {string} properties.category
            //  @param {string} [properties.label]
            //  @param {number} [properties.value]
            //  @param {boolean} [properties.noninteraction]
            // Set a default GTM category
            properties = properties || {};
            this.pushLayer(Object.assign({ event: properties.event || 'interaction', target: properties.category || 'Event', action: action, label: properties.label, value: properties.value, interactionType: properties.noninteraction, userId: this.angulartics2.settings.gtm.userId }, properties.gtmCustom));
        };
        /**
         * Exception Track Event in GTM
         *
         */
        Angulartics2GoogleTagManager.prototype.exceptionTrack = function (properties) {
            // TODO: make interface
            //  @param {Object} properties
            //  @param {string} properties.appId
            //  @param {string} properties.appName
            //  @param {string} properties.appVersion
            //  @param {string} [properties.description]
            //  @param {boolean} [properties.fatal]
            if (!properties || !properties.appId || !properties.appName || !properties.appVersion) {
                console.error('Must be setted appId, appName and appVersion.');
                return;
            }
            if (properties.fatal === undefined) {
                console.log('No "fatal" provided, sending with fatal=true');
                properties.exFatal = true;
            }
            properties.exDescription = properties.event ? properties.event.stack : properties.description;
            this.eventTrack("Exception thrown for " + properties.appName + " <" + properties.appId + "@" + properties.appVersion + ">", {
                category: 'Exception',
                label: properties.exDescription,
            });
        };
        /**
         * Set userId for use with Universal Analytics User ID feature
         *
         * @param userId used to identify user cross-device in Google Analytics
         */
        Angulartics2GoogleTagManager.prototype.setUsername = function (userId) {
            this.angulartics2.settings.gtm.userId = userId;
        };
        return Angulartics2GoogleTagManager;
    }());
    Angulartics2GoogleTagManager.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2GoogleTagManager_Factory() { return new Angulartics2GoogleTagManager(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2GoogleTagManager, providedIn: "root" });
    Angulartics2GoogleTagManager.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2GoogleTagManager.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var GoogleGlobalSiteTagDefaults = /** @class */ (function () {
        function GoogleGlobalSiteTagDefaults() {
            var _this = this;
            this.trackingIds = [];
            if (typeof ga !== 'undefined' && ga) {
                // See: https://developers.google.com/analytics/devguides/collection/analyticsjs/ga-object-methods-reference
                ga(function () {
                    ga.getAll().forEach(function (tracker) {
                        var id = tracker.get('trackingId');
                        // If set both in forRoot and HTML page, we want to avoid duplicates
                        if (id !== undefined && _this.trackingIds.indexOf(id) === -1) {
                            _this.trackingIds.push(id);
                        }
                    });
                });
            }
        }
        return GoogleGlobalSiteTagDefaults;
    }());
    var Angulartics2GoogleGlobalSiteTag = /** @class */ (function () {
        function Angulartics2GoogleGlobalSiteTag(angulartics2) {
            this.angulartics2 = angulartics2;
            this.dimensionsAndMetrics = {};
            var defaults = new GoogleGlobalSiteTagDefaults();
            // Set the default settings for this module
            this.angulartics2.settings.gst = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.gst);
        }
        Angulartics2GoogleGlobalSiteTag.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
            this.angulartics2.exceptionTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.exceptionTrack(x); });
            this.angulartics2.userTimings
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.userTimings(_this.convertTimings(x)); });
            this.angulartics2.setUsername
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.setUserProperties(x); });
        };
        /**
         * Manually track page view, see:
         *
         * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications#tracking_virtual_pageviews
         *
         * @param path relative url
         */
        Angulartics2GoogleGlobalSiteTag.prototype.pageTrack = function (path) {
            var e_1, _a;
            if (typeof gtag !== 'undefined' && gtag) {
                var params = Object.assign({ page_path: path, page_location: window.location.protocol + '//' + window.location.host + path }, this.dimensionsAndMetrics);
                // Custom map must be reset with all config to stay valid.
                if (this.angulartics2.settings.gst.customMap) {
                    params.custom_map = this.angulartics2.settings.gst.customMap;
                }
                if (this.angulartics2.settings.gst.userId) {
                    params.user_id = this.angulartics2.settings.gst.userId;
                }
                if (this.angulartics2.settings.gst.anonymizeIp) {
                    params.anonymize_ip = this.angulartics2.settings.gst.anonymizeIp;
                }
                try {
                    for (var _b = __values(this.angulartics2.settings.gst.trackingIds), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var id = _c.value;
                        gtag('config', id, params);
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
        };
        /**
         * Send interactions to gtag, i.e. for event tracking in Google Analytics. See:
         *
         * https://developers.google.com/analytics/devguides/collection/gtagjs/events
         *
         * @param action associated with the event
         */
        Angulartics2GoogleGlobalSiteTag.prototype.eventTrack = function (action, properties) {
            if (properties === void 0) { properties = {}; }
            this.eventTrackInternal(action, Object.assign({ event_category: properties.category || 'interaction', event_label: properties.label, value: properties.value, non_interaction: properties.noninteraction }, properties.gstCustom));
        };
        /**
         * Exception Track Event in GST. See:
         *
         * https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
         *
         */
        Angulartics2GoogleGlobalSiteTag.prototype.exceptionTrack = function (properties) {
            // TODO: make interface
            //  @param {Object} properties
            //  @param {string} [properties.description]
            //  @param {boolean} [properties.fatal]
            if (properties.fatal === undefined) {
                console.log('No "fatal" provided, sending with fatal=true');
                properties.fatal = true;
            }
            properties.exDescription = properties.event ? properties.event.stack : properties.description;
            this.eventTrack('exception', {
                gstCustom: Object.assign({ description: properties.exDescription, fatal: properties.fatal }, properties.gstCustom),
            });
        };
        /**
         * User Timings Event in GST.
         *
         * @param properties Comprised of the mandatory fields:
         *  - name (string)
         *  - value (number - integer)
         * Properties can also have the optional fields:
         *  - category (string)
         *  - label (string)
         *
         * @link https://developers.google.com/analytics/devguides/collection/gtagjs/user-timings
         */
        Angulartics2GoogleGlobalSiteTag.prototype.userTimings = function (properties) {
            if (!properties) {
                console.error('User timings - "properties" parameter is required to be set.');
                return;
            }
            this.eventTrackInternal('timing_complete', {
                name: properties.name,
                value: properties.value,
                event_category: properties.category,
                event_label: properties.label,
            });
        };
        Angulartics2GoogleGlobalSiteTag.prototype.convertTimings = function (properties) {
            return {
                name: properties.timingVar,
                value: properties.timingValue,
                category: properties.timingCategory,
                label: properties.timingLabel,
            };
        };
        Angulartics2GoogleGlobalSiteTag.prototype.setUsername = function (userId) {
            this.angulartics2.settings.gst.userId = userId;
            if (typeof gtag !== 'undefined' && gtag) {
                gtag('set', { user_id: typeof userId === 'string' || !userId ? userId : userId.userId });
            }
        };
        Angulartics2GoogleGlobalSiteTag.prototype.setUserProperties = function (properties) {
            this.setDimensionsAndMetrics(properties);
        };
        Angulartics2GoogleGlobalSiteTag.prototype.setDimensionsAndMetrics = function (properties) {
            var _this = this;
            // We want the dimensions and metrics to accumulate, so we merge with previous value
            this.dimensionsAndMetrics = Object.assign(Object.assign({}, this.dimensionsAndMetrics), properties);
            // Remove properties that are null or undefined
            Object.keys(this.dimensionsAndMetrics).forEach(function (key) {
                var val = _this.dimensionsAndMetrics[key];
                if (val === undefined || val === null) {
                    delete _this.dimensionsAndMetrics[key];
                }
            });
            if (typeof gtag !== 'undefined' && gtag) {
                gtag('set', this.dimensionsAndMetrics);
            }
        };
        Angulartics2GoogleGlobalSiteTag.prototype.eventTrackInternal = function (action, properties) {
            if (properties === void 0) { properties = {}; }
            this.cleanProperties(properties);
            if (typeof gtag !== 'undefined' && gtag) {
                gtag('event', action, properties);
            }
        };
        Angulartics2GoogleGlobalSiteTag.prototype.cleanProperties = function (properties) {
            // GA requires that eventValue be an non-negative integer, see:
            // https://developers.google.com/analytics/devguides/collection/gtagjs/events
            if (properties.value) {
                var parsed = parseInt(properties.value, 10);
                properties.value = isNaN(parsed) ? 0 : parsed;
            }
        };
        return Angulartics2GoogleGlobalSiteTag;
    }());
    Angulartics2GoogleGlobalSiteTag.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2GoogleGlobalSiteTag_Factory() { return new Angulartics2GoogleGlobalSiteTag(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2GoogleGlobalSiteTag, providedIn: "root" });
    Angulartics2GoogleGlobalSiteTag.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2GoogleGlobalSiteTag.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2Hubspot = /** @class */ (function () {
        function Angulartics2Hubspot(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Hubspot.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Hubspot.prototype.pageTrack = function (path) {
            if (typeof _hsq !== 'undefined') {
                _hsq.push(['setPath', path]);
                _hsq.push(['trackPageView']);
            }
        };
        Angulartics2Hubspot.prototype.eventTrack = function (action, properties) {
            if (typeof _hsq !== 'undefined') {
                _hsq.push(['trackEvent', properties]);
            }
        };
        Angulartics2Hubspot.prototype.setUserProperties = function (properties) {
            if (typeof _hsq !== 'undefined') {
                _hsq.push(['identify', properties]);
            }
        };
        return Angulartics2Hubspot;
    }());
    Angulartics2Hubspot.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Hubspot_Factory() { return new Angulartics2Hubspot(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Hubspot, providedIn: "root" });
    Angulartics2Hubspot.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Hubspot.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2Kissmetrics = /** @class */ (function () {
        function Angulartics2Kissmetrics(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            if (typeof _kmq === 'undefined') {
                _kmq = [];
            }
            this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Kissmetrics.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Kissmetrics.prototype.pageTrack = function (path) {
            _kmq.push(['record', 'Pageview', { Page: path }]);
        };
        Angulartics2Kissmetrics.prototype.eventTrack = function (action, properties) {
            _kmq.push(['record', action, properties]);
        };
        Angulartics2Kissmetrics.prototype.setUsername = function (userId) {
            _kmq.push(['identify', userId]);
        };
        Angulartics2Kissmetrics.prototype.setUserProperties = function (properties) {
            _kmq.push(['set', properties]);
        };
        return Angulartics2Kissmetrics;
    }());
    Angulartics2Kissmetrics.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Kissmetrics_Factory() { return new Angulartics2Kissmetrics(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Kissmetrics, providedIn: "root" });
    Angulartics2Kissmetrics.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Kissmetrics.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2LaunchByAdobe = /** @class */ (function () {
        function Angulartics2LaunchByAdobe(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.payload = {};
            if ('undefined' === typeof _satellite) {
                console.warn('Launch not found!');
            }
            this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2LaunchByAdobe.prototype.setUsername = function (userId) {
            if ('undefined' !== typeof userId && userId) {
                this.payload.userId = userId;
            }
        };
        Angulartics2LaunchByAdobe.prototype.setUserProperties = function (properties) {
            if ('undefined' !== typeof properties && properties) {
                this.payload.properties = properties;
            }
        };
        Angulartics2LaunchByAdobe.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2LaunchByAdobe.prototype.pageTrack = function (path) {
            this.payload = this.payload || {};
            this.payload.path = path;
            if ('undefined' !== typeof _satellite && _satellite) {
                _satellite.track('pageTrack', this.payload);
            }
        };
        /**
         * @param action associated with the event
         * @param properties associated with the event
         */
        Angulartics2LaunchByAdobe.prototype.eventTrack = function (action, properties) {
            properties = properties || {};
            // add properties to payload
            this.payload.action = action;
            this.payload.eventProperties = properties;
            if ('undefined' !== typeof _satellite && _satellite) {
                _satellite.track('eventTrack', this.payload);
            }
        };
        return Angulartics2LaunchByAdobe;
    }());
    Angulartics2LaunchByAdobe.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2LaunchByAdobe_Factory() { return new Angulartics2LaunchByAdobe(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2LaunchByAdobe, providedIn: "root" });
    Angulartics2LaunchByAdobe.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2LaunchByAdobe.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2Mixpanel = /** @class */ (function () {
        function Angulartics2Mixpanel(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setUserPropertiesOnce.subscribe(function (x) { return _this.setUserPropertiesOnce(x); });
            this.angulartics2.setSuperProperties.subscribe(function (x) { return _this.setSuperProperties(x); });
            this.angulartics2.setSuperPropertiesOnce.subscribe(function (x) { return _this.setSuperPropertiesOnce(x); });
            this.angulartics2.setAlias.subscribe(function (x) { return _this.setAlias(x); });
        }
        Angulartics2Mixpanel.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Mixpanel.prototype.pageTrack = function (path) {
            try {
                mixpanel.track('Page Viewed', { page: path });
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.eventTrack = function (action, properties) {
            try {
                mixpanel.track(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setUsername = function (userId) {
            try {
                mixpanel.identify(userId);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setUserProperties = function (properties) {
            try {
                mixpanel.people.set(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setUserPropertiesOnce = function (properties) {
            try {
                mixpanel.people.set_once(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setSuperProperties = function (properties) {
            try {
                mixpanel.register(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setSuperPropertiesOnce = function (properties) {
            try {
                mixpanel.register_once(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setAlias = function (alias) {
            try {
                mixpanel.alias(alias);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Mixpanel;
    }());
    Angulartics2Mixpanel.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Mixpanel_Factory() { return new Angulartics2Mixpanel(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Mixpanel, providedIn: "root" });
    Angulartics2Mixpanel.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Mixpanel.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2Pyze = /** @class */ (function () {
        function Angulartics2Pyze(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUsername.subscribe(function (x) { return _this.setUserId(x); });
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.postTraits(x); });
        }
        Angulartics2Pyze.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Pyze.prototype.pageTrack = function (path) {
            try {
                Pyze.postPageView('Page Viewed', { page: path });
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Pyze.prototype.eventTrack = function (action, properties) {
            try {
                PyzeEvents.postCustomEventWithAttributes(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Pyze.prototype.setUserId = function (userId) {
            try {
                PyzeIdentity.setUserIdentifier(userId);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Pyze.prototype.postTraits = function (properties) {
            try {
                PyzeIdentity.postTraits(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Pyze;
    }());
    Angulartics2Pyze.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Pyze_Factory() { return new Angulartics2Pyze(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Pyze, providedIn: "root" });
    Angulartics2Pyze.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Pyze.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2Matomo = /** @class */ (function () {
        function Angulartics2Matomo(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            if (typeof _paq === 'undefined') {
                console.warn('Matomo not found');
            }
            this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Matomo.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Matomo.prototype.pageTrack = function (path, title) {
            try {
                if (!window.location.origin) {
                    window.location.origin =
                        window.location.protocol +
                            '//' +
                            window.location.hostname +
                            (window.location.port ? ':' + window.location.port : '');
                }
                _paq.push(['setDocumentTitle', title || window.document.title]);
                _paq.push(['setCustomUrl', window.location.origin + path]);
                _paq.push(['trackPageView']);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Matomo.prototype.resetUser = function () {
            try {
                _paq.push(['appendToTrackingUrl', 'new_visit=1']); // (1) forces a new visit
                _paq.push(['deleteCookies']); // (2) deletes existing tracking cookies to start the new visit
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * Track a basic event in Matomo, or send an ecommerce event.
         *
         * @param action A string corresponding to the type of event that needs to be tracked.
         * @param properties The properties that need to be logged with the event.
         */
        Angulartics2Matomo.prototype.eventTrack = function (action, properties) {
            var params = [];
            switch (action) {
                /**
                 * @description Sets the current page view as a product or category page view. When you call
                 * setEcommerceView it must be followed by a call to trackPageView to record the product or
                 * category page view.
                 *
                 * @link https://matomo.org/docs/ecommerce-analytics/#tracking-product-page-views-category-page-views-optional
                 * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property productSKU (required) SKU: Product unique identifier
                 * @property productName (optional) Product name
                 * @property categoryName (optional) Product category, or array of up to 5 categories
                 * @property price (optional) Product Price as displayed on the page
                 */
                case 'setEcommerceView':
                    params = [
                        'setEcommerceView',
                        properties.productSKU,
                        properties.productName,
                        properties.categoryName,
                        properties.price,
                    ];
                    break;
                /**
                 * @description Adds a product into the ecommerce order. Must be called for each product in
                 * the order.
                 *
                 * @link https://matomo.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
                 * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property productSKU (required) SKU: Product unique identifier
                 * @property productName (optional) Product name
                 * @property categoryName (optional) Product category, or array of up to 5 categories
                 * @property price (recommended) Product price
                 * @property quantity (optional, default to 1) Product quantity
                 */
                case 'addEcommerceItem':
                    params = [
                        'addEcommerceItem',
                        properties.productSKU,
                        properties.productName,
                        properties.productCategory,
                        properties.price,
                        properties.quantity,
                    ];
                    break;
                /**
                 * @description Tracks a shopping cart. Call this javascript function every time a user is
                 * adding, updating or deleting a product from the cart.
                 *
                 * @link https://matomo.org/docs/ecommerce-analytics/#tracking-add-to-cart-items-added-to-the-cart-optional
                 * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property grandTotal (required) Cart amount
                 */
                case 'trackEcommerceCartUpdate':
                    params = [
                        'trackEcommerceCartUpdate',
                        properties.grandTotal,
                    ];
                    break;
                /**
                 * @description Tracks an Ecommerce order, including any ecommerce item previously added to
                 * the order. orderId and grandTotal (ie. revenue) are required parameters.
                 *
                 * @link https://matomo.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
                 * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property orderId (required) Unique Order ID
                 * @property grandTotal (required) Order Revenue grand total (includes tax, shipping, and subtracted discount)
                 * @property subTotal (optional) Order sub total (excludes shipping)
                 * @property tax (optional) Tax amount
                 * @property shipping (optional) Shipping amount
                 * @property discount (optional) Discount offered (set to false for unspecified parameter)
                 */
                case 'trackEcommerceOrder':
                    params = [
                        'trackEcommerceOrder',
                        properties.orderId,
                        properties.grandTotal,
                        properties.subTotal,
                        properties.tax,
                        properties.shipping,
                        properties.discount,
                    ];
                    break;
                /**
                 * @description To manually trigger an outlink
                 *
                 * @link https://matomo.org/docs/tracking-goals-web-analytics/
                 * @link https://developer.matomo.org/guides/tracking-javascript-guide#tracking-a-click-as-an-outlink-via-css-or-javascript
                 *
                 * @property url (required) link url
                 * @property linkType (optional) type of link
                 */
                case 'trackLink':
                    params = [
                        'trackLink',
                        properties.url,
                        properties.linkType,
                    ];
                    break;
                /**
                 * @description Tracks an Ecommerce goal
                 *
                 * @link https://matomo.org/docs/tracking-goals-web-analytics/
                 * @link https://developer.matomo.org/guides/tracking-javascript-guide#manually-trigger-goal-conversions
                 *
                 * @property goalId (required) Unique Goal ID
                 * @property value (optional) passed to goal tracking
                 */
                case 'trackGoal':
                    params = [
                        'trackGoal',
                        properties.goalId,
                        properties.value,
                    ];
                    break;
                /**
                 * @description Tracks a site search
                 *
                 * @link https://matomo.org/docs/site-search/
                 * @link https://developer.matomo.org/guides/tracking-javascript-guide#internal-search-tracking
                 *
                 * @property keyword (required) Keyword searched for
                 * @property category (optional) Search category
                 * @property searchCount (optional) Number of results
                 */
                case 'trackSiteSearch':
                    params = [
                        'trackSiteSearch',
                        properties.keyword,
                        properties.category,
                        properties.searchCount,
                    ];
                    break;
                /**
                 * @description Logs an event with an event category (Videos, Music, Games...), an event
                 * action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...), and an optional
                 * event name and optional numeric value.
                 *
                 * @link https://matomo.org/docs/event-tracking/
                 * @link https://developer.matomo.org/api-reference/tracking-javascript#using-the-tracker-object
                 *
                 * @property category
                 * @property action
                 * @property name (optional, recommended)
                 * @property value (optional)
                 */
                default:
                    // PAQ requires that eventValue be an integer, see: http://matomo.org/docs/event-tracking
                    if (properties.value) {
                        var parsed = parseInt(properties.value, 10);
                        properties.value = isNaN(parsed) ? 0 : parsed;
                    }
                    params = [
                        'trackEvent',
                        properties.category,
                        action,
                        properties.name ||
                            properties.label,
                        properties.value,
                    ];
            }
            try {
                _paq.push(params);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Matomo.prototype.setUsername = function (userId) {
            try {
                _paq.push(['setUserId', userId]);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * Sets custom dimensions if at least one property has the key "dimension<n>",
         * e.g. dimension10. If there are custom dimensions, any other property is ignored.
         *
         * If there are no custom dimensions in the given properties object, the properties
         * object is saved as a custom variable.
         *
         * If in doubt, prefer custom dimensions.
         * @link https://matomo.org/docs/custom-variables/
         */
        Angulartics2Matomo.prototype.setUserProperties = function (properties) {
            var dimensions = this.setCustomDimensions(properties);
            try {
                if (dimensions.length === 0) {
                    _paq.push([
                        'setCustomVariable',
                        properties.index,
                        properties.name,
                        properties.value,
                        properties.scope,
                    ]);
                }
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * If you created a custom variable and then decide to remove this variable from
         * a visit or page view, you can use deleteCustomVariable.
         *
         * @link https://developer.matomo.org/guides/tracking-javascript-guide#deleting-a-custom-variable
         */
        Angulartics2Matomo.prototype.deletedUserProperties = function (properties) {
            try {
                _paq.push(['deleteCustomVariable', properties.index, properties.scope]);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Matomo.prototype.setCustomDimensions = function (properties) {
            var dimensionRegex = /dimension[1-9]\d*/;
            var dimensions = Object.keys(properties).filter(function (key) { return dimensionRegex.exec(key); });
            dimensions.forEach(function (dimension) {
                var number = Number(dimension.substr(9));
                _paq.push(['setCustomDimension', number, properties[dimension]]);
            });
            return dimensions;
        };
        return Angulartics2Matomo;
    }());
    Angulartics2Matomo.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Matomo_Factory() { return new Angulartics2Matomo(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Matomo, providedIn: "root" });
    Angulartics2Matomo.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Matomo.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2Segment = /** @class */ (function () {
        function Angulartics2Segment(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setUserPropertiesOnce.subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setAlias.subscribe(function (x) { return _this.setAlias(x); });
        }
        Angulartics2Segment.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        /**
         * https://segment.com/docs/libraries/analytics.js/#page
         *
         * analytics.page([category], [name], [properties], [options], [callback]);
         */
        Angulartics2Segment.prototype.pageTrack = function (path) {
            // TODO : Support optional parameters where the parameter order and type changes their meaning
            try {
                analytics.page(path);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * https://segment.com/docs/libraries/analytics.js/#track
         *
         * analytics.track(event, [properties], [options], [callback]);
         */
        Angulartics2Segment.prototype.eventTrack = function (action, properties) {
            try {
                analytics.track(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * https://segment.com/docs/libraries/analytics.js/#identify
         *
         * analytics.identify([userId], [traits], [options], [callback]);
         */
        Angulartics2Segment.prototype.setUserProperties = function (properties) {
            try {
                if (properties.userId) {
                    analytics.identify(properties.userId, properties);
                }
                else {
                    analytics.identify(properties);
                }
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#reset--logout
         *
         * analytics.reset();
         */
        Angulartics2Segment.prototype.unsetUserProperties = function () {
            analytics.reset();
        };
        /**
         * https://segment.com/docs/libraries/analytics.js/#alias
         *
         * analytics.alias(userId, previousId, options, callback);
         */
        Angulartics2Segment.prototype.setAlias = function (alias) {
            try {
                analytics.alias(alias);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Segment;
    }());
    Angulartics2Segment.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Segment_Factory() { return new Angulartics2Segment(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Segment, providedIn: "root" });
    Angulartics2Segment.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Segment.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2Intercom = /** @class */ (function () {
        function Angulartics2Intercom(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setUserPropertiesOnce.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Intercom.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Intercom.prototype.pageTrack = function (path) {
            try {
                this.eventTrack('Pageview', {
                    url: path,
                });
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Intercom.prototype.eventTrack = function (action, properties) {
            try {
                Intercom('trackEvent', action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Intercom.prototype.setUserProperties = function (properties) {
            try {
                if (properties.userId && !properties.user_id) {
                    properties.user_id = properties.userId;
                }
                Intercom('boot', properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Intercom;
    }());
    Angulartics2Intercom.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Intercom_Factory() { return new Angulartics2Intercom(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Intercom, providedIn: "root" });
    Angulartics2Intercom.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Intercom.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2Woopra = /** @class */ (function () {
        function Angulartics2Woopra(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            if (typeof woopra === 'undefined') {
                console.warn('Woopra not found');
            }
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Woopra.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Woopra.prototype.pageTrack = function (path) {
            try {
                woopra.track('pv', {
                    url: path,
                });
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Woopra.prototype.eventTrack = function (action, properties) {
            try {
                woopra.track(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Woopra.prototype.setUserProperties = function (properties) {
            try {
                if (properties.email) {
                    woopra.identify(properties);
                }
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Woopra;
    }());
    Angulartics2Woopra.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Woopra_Factory() { return new Angulartics2Woopra(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Woopra, providedIn: "root" });
    Angulartics2Woopra.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Woopra.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2Clicky = /** @class */ (function () {
        function Angulartics2Clicky(angulartics2, titleService) {
            this.angulartics2 = angulartics2;
            this.titleService = titleService;
            if (typeof clicky === 'undefined') {
                console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
            }
        }
        Angulartics2Clicky.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventOrGoalTrack(x.action, x.properties); });
        };
        /**
         * Track Page in Clicky
         *
         * @param path location
         *
         * @link https://clicky.com/help/custom/manual#log
         */
        Angulartics2Clicky.prototype.pageTrack = function (path) {
            var title = this.titleService.getTitle();
            clicky.log(path, title, 'pageview');
        };
        /**
         * Track Event Or Goal in Clicky
         *
         * @param action Action name
         * @param properties Definition of 'properties.goal' determines goal vs event tracking
         *
         * @link https://clicky.com/help/custom/manual#log
         * @link https://clicky.com/help/custom/manual#goal
         */
        Angulartics2Clicky.prototype.eventOrGoalTrack = function (action, properties) {
            if (typeof properties.goal === 'undefined') {
                var title = properties.title || null;
                var type = properties.type != null ? this.validateType(properties.type) : null;
                clicky.log(action, title, type);
            }
            else {
                var goalId = properties.goal;
                var revenue = properties.revenue;
                clicky.goal(goalId, revenue, !!properties.noQueue);
            }
        };
        Angulartics2Clicky.prototype.validateType = function (type) {
            var EventType = ['pageview', 'click', 'download', 'outbound'];
            return EventType.indexOf(type) > -1 ? type : 'pageview';
        };
        return Angulartics2Clicky;
    }());
    Angulartics2Clicky.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Clicky_Factory() { return new Angulartics2Clicky(i0__namespace.ɵɵinject(Angulartics2), i0__namespace.ɵɵinject(i2__namespace$1.Title)); }, token: Angulartics2Clicky, providedIn: "root" });
    Angulartics2Clicky.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Clicky.ctorParameters = function () { return [
        { type: Angulartics2 },
        { type: i2$1.Title }
    ]; };

    var Angulartics2Amplitude = /** @class */ (function () {
        function Angulartics2Amplitude(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setUserPropertiesOnce.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Amplitude.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Amplitude.prototype.pageTrack = function (path) {
            try {
                this.eventTrack('Pageview', {
                    url: path,
                });
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Amplitude.prototype.eventTrack = function (action, properties) {
            try {
                amplitude.getInstance().logEvent(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Amplitude.prototype.setUsername = function (userId) {
            try {
                amplitude.getInstance().setUserId(userId);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Amplitude.prototype.setUserProperties = function (properties) {
            try {
                amplitude.getInstance().setUserProperties(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Amplitude;
    }());
    Angulartics2Amplitude.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Amplitude_Factory() { return new Angulartics2Amplitude(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Amplitude, providedIn: "root" });
    Angulartics2Amplitude.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Amplitude.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2Splunk = /** @class */ (function () {
        function Angulartics2Splunk(angulartics2) {
            this.angulartics2 = angulartics2;
            if (typeof sp === 'undefined') {
                console.warn('Splunk not found');
            }
        }
        Angulartics2Splunk.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Splunk.prototype.pageTrack = function (path) {
            try {
                sp.pageview(path);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Splunk.prototype.eventTrack = function (action, properties) {
            try {
                sp.track(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Splunk;
    }());
    Angulartics2Splunk.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2Splunk_Factory() { return new Angulartics2Splunk(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2Splunk, providedIn: "root" });
    Angulartics2Splunk.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Splunk.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2IBMDigitalAnalytics = /** @class */ (function () {
        function Angulartics2IBMDigitalAnalytics(angulartics2) {
            this.angulartics2 = angulartics2;
            if (typeof window['cmCreatePageviewTag'] !== 'function') {
                console.warn('Angulartics 2 IBM Digital Analytics Plugin: eluminate.js is not loaded');
            }
        }
        Angulartics2IBMDigitalAnalytics.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        /**
         * Track Page in IBM Digital Analytics
         *
         * @param path location
         *
         * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_pageviewtag.html
         */
        Angulartics2IBMDigitalAnalytics.prototype.pageTrack = function (path) {
            var cmCreatePageviewTag = window['cmCreatePageviewTag'];
            cmCreatePageviewTag(path, null, null, null);
        };
        /**
         * Track an event in IBM Digital Analytics
         *
         * @param action A string corresponding to the type of event that needs to be tracked.
         * @param properties The properties that need to be logged with the event.
         */
        Angulartics2IBMDigitalAnalytics.prototype.eventTrack = function (action, properties) {
            if (properties === void 0) { properties = {}; }
            var cmDisplayShops = window['cmDisplayShops'];
            switch (action) {
                /**
                 * @description The Product View tag captures information about vdigitalDataiews of product detail pages.
                 *  The Product View tag should be called on the lowest level detail page for products, which is typically
                 *  the Product Details page. You can view example Product View tags below.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_prodviewtag.html
                 */
                case 'cmCreateProductviewTag':
                    var cmCreateProductviewTag = window['cmCreateProductviewTag'];
                    cmCreateProductviewTag(properties.productId, properties.productName, properties.categoryId, properties.attrbute, properties.virtualCategory);
                    break;
                /**
                 * @description The Shop Action 5 tag captures data about selected products and which products are present in a shopping cart,
                 *  if any, when the cart is viewed.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact5tag.html
                 */
                case 'cmCreateShopAction5Tag':
                    var cmCreateShopAction5Tag = window['cmCreateShopAction5Tag'];
                    cmCreateShopAction5Tag(properties.productId, properties.productName, properties.quantity, properties.unitPrice, properties.categoryId, properties.attrbute, properties.extraFields, properties.virtualCategory);
                    cmDisplayShops();
                    break;
                /**
                 * @description The Shop Action 9 tag captures data about what products were purchased by a customer.
                 *  Like the Shop Action 5 tag, one tag should be sent for each product line item purchased. These tags should be sent
                 *  on the receipt or other completion page confirming a successful order.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact9tag.html
                 */
                case 'cmCreateShopAction9Tag':
                    var cmCreateShopAction9Tag = window['cmCreateShopAction9Tag'];
                    cmCreateShopAction9Tag(properties.productId, properties.productName, properties.quantity, properties.unitPrice, properties.registrationId, properties.orderId, properties.orderSubtotal, properties.categoryId, properties.attrbute, properties.extraFields);
                    cmDisplayShops();
                    break;
                /**
                 * @description The Order tag captures order header information such as Registration ID, order ID, order subtotal,
                 *  and shipping and handling. The Order tag should be sent on the receipt page confirming order completion.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_ordertag.html
                 */
                case 'cmCreateOrderTag':
                    var cmCreateOrderTag = window['cmCreateOrderTag'];
                    cmCreateOrderTag(properties.orderId, properties.orderSubtotal, properties.orderShipping, properties.registrationId, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.attrbute, properties.extraFields);
                    break;
                /**
                 * @description The Registration tag creates a Lifetime Visitor Experience Profile (LIVE Profile) by associating a single
                 *  common Registration ID with the IBM® Digital Analytics permanent cookie set in every browser visiting the tagged site.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_registrationtag.html
                 */
                case 'cmCreateRegistrationTag':
                    var cmCreateRegistrationTag = window['cmCreateRegistrationTag'];
                    cmCreateRegistrationTag(properties.registrationId, properties.registrantEmail, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.registrantCountry, properties.attrbute);
                    break;
                /**
                 * @description The Element tag is used to track intra-page content in IBM® Digital Analytics. Data collected by
                 *  the Element tag is used to populate values in the Element Categories and Top Viewed Elements reports.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_elementtag.html
                 */
                case 'cmCreateElementTag':
                    var cmCreateElementTag = window['cmCreateElementTag'];
                    cmCreateElementTag(properties.elementId, properties.elementCategory, properties.attrbute);
                    break;
                /**
                 * @description The Conversion Event tag is employed for tracking of general non-commerce conversion events.
                 * The Conversion Event tag is used to populate values in the Conversion Events Reports and to create Key Segments.
                 * This tag and the reports it populates enable analysis of a wide variety of site activities.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_conversioneventtag.html
                 */
                case 'cmCreateConversionEventTag':
                    var cmCreateConversionEventTag = window['cmCreateConversionEventTag'];
                    cmCreateConversionEventTag(properties.eventId, properties.actionType, properties.eventCategoryId, properties.points, properties.attrbute, properties.extraFields);
                    break;
                default:
                    console.warn('Unsupported Event Action');
            }
        };
        return Angulartics2IBMDigitalAnalytics;
    }());
    Angulartics2IBMDigitalAnalytics.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2IBMDigitalAnalytics_Factory() { return new Angulartics2IBMDigitalAnalytics(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2IBMDigitalAnalytics, providedIn: "root" });
    Angulartics2IBMDigitalAnalytics.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2IBMDigitalAnalytics.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    var Angulartics2GoSquared = /** @class */ (function () {
        function Angulartics2GoSquared(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setUserPropertiesOnce.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2GoSquared.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2GoSquared.prototype.pageTrack = function (path) {
            try {
                _gs('track', path);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2GoSquared.prototype.eventTrack = function (action, properties) {
            try {
                _gs('event', action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2GoSquared.prototype.setUserProperties = function (properties) {
            try {
                _gs('identify', properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2GoSquared;
    }());
    Angulartics2GoSquared.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function Angulartics2GoSquared_Factory() { return new Angulartics2GoSquared(i0__namespace.ɵɵinject(Angulartics2)); }, token: Angulartics2GoSquared, providedIn: "root" });
    Angulartics2GoSquared.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2GoSquared.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ANGULARTICS2_TOKEN = ANGULARTICS2_TOKEN;
    exports.AngularRouterTracking = AngularRouterTracking;
    exports.Angulartics2 = Angulartics2;
    exports.Angulartics2AdobeAnalytics = Angulartics2AdobeAnalytics;
    exports.Angulartics2Amplitude = Angulartics2Amplitude;
    exports.Angulartics2AppInsights = Angulartics2AppInsights;
    exports.Angulartics2BaiduAnalytics = Angulartics2BaiduAnalytics;
    exports.Angulartics2Clicky = Angulartics2Clicky;
    exports.Angulartics2Facebook = Angulartics2Facebook;
    exports.Angulartics2GoSquared = Angulartics2GoSquared;
    exports.Angulartics2GoogleAnalytics = Angulartics2GoogleAnalytics;
    exports.Angulartics2GoogleAnalyticsEnhancedEcommerce = Angulartics2GoogleAnalyticsEnhancedEcommerce;
    exports.Angulartics2GoogleGlobalSiteTag = Angulartics2GoogleGlobalSiteTag;
    exports.Angulartics2GoogleTagManager = Angulartics2GoogleTagManager;
    exports.Angulartics2Hubspot = Angulartics2Hubspot;
    exports.Angulartics2IBMDigitalAnalytics = Angulartics2IBMDigitalAnalytics;
    exports.Angulartics2Intercom = Angulartics2Intercom;
    exports.Angulartics2Kissmetrics = Angulartics2Kissmetrics;
    exports.Angulartics2LaunchByAdobe = Angulartics2LaunchByAdobe;
    exports.Angulartics2Matomo = Angulartics2Matomo;
    exports.Angulartics2Mixpanel = Angulartics2Mixpanel;
    exports.Angulartics2Module = Angulartics2Module;
    exports.Angulartics2On = Angulartics2On;
    exports.Angulartics2OnModule = Angulartics2OnModule;
    exports.Angulartics2Pyze = Angulartics2Pyze;
    exports.Angulartics2RouterlessModule = Angulartics2RouterlessModule;
    exports.Angulartics2Segment = Angulartics2Segment;
    exports.Angulartics2Splunk = Angulartics2Splunk;
    exports.Angulartics2Woopra = Angulartics2Woopra;
    exports.AppInsightsDefaults = AppInsightsDefaults;
    exports.DefaultConfig = DefaultConfig;
    exports.GoogleAnalyticsDefaults = GoogleAnalyticsDefaults;
    exports.GoogleGlobalSiteTagDefaults = GoogleGlobalSiteTagDefaults;
    exports.GoogleTagManagerDefaults = GoogleTagManagerDefaults;
    exports.RouterlessTracking = RouterlessTracking;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=angulartics2.umd.js.map
