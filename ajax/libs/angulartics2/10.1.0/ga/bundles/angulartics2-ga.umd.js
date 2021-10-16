(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/ga', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.ga = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

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
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
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
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
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
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
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
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
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
                var eventOptions = Object.assign({ eventCategory: properties.category, eventAction: action, eventLabel: properties.label, eventValue: properties.value, nonInteraction: properties.noninteraction, page: properties.page || location.hash.substring(1) || location.pathname, userId: this.angulartics2.settings.ga.userId, hitCallback: properties.hitCallback }, this.angulartics2.settings.ga.transport && { transport: this.angulartics2.settings.ga.transport });
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
                if (key.lastIndexOf('dimension', 0) === 0 ||
                    key.lastIndexOf('metric', 0) === 0) {
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
    Angulartics2GoogleAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalytics_Factory() { return new Angulartics2GoogleAnalytics(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2GoogleAnalytics, providedIn: "root" });
    Angulartics2GoogleAnalytics.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2GoogleAnalytics.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2GoogleAnalytics = Angulartics2GoogleAnalytics;
    exports.GoogleAnalyticsDefaults = GoogleAnalyticsDefaults;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-ga.umd.js.map
