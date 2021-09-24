(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/inputtext'), require('primeng/button'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/inputnumber', ['exports', '@angular/core', '@angular/common', 'primeng/inputtext', 'primeng/button', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.primeng = global.primeng || {}, global.primeng.inputnumber = {}), global.ng.core, global.ng.common, global.primeng.inputtext, global.primeng.button, global.ng.forms));
}(this, (function (exports, i0, i1, i2, i3, forms) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

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

    var INPUTNUMBER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return InputNumber; }),
        multi: true
    };
    var InputNumber = /** @class */ (function () {
        function InputNumber(el, cd) {
            this.el = el;
            this.cd = cd;
            this.showButtons = false;
            this.format = true;
            this.buttonLayout = "stacked";
            this.incrementButtonIcon = 'pi pi-angle-up';
            this.decrementButtonIcon = 'pi pi-angle-down';
            this.readonly = false;
            this.step = 1;
            this.allowEmpty = true;
            this.mode = "decimal";
            this.useGrouping = true;
            this.onInput = new i0.EventEmitter();
            this.onFocus = new i0.EventEmitter();
            this.onBlur = new i0.EventEmitter();
            this.onKeyDown = new i0.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
            this.groupChar = '';
            this.prefixChar = '';
            this.suffixChar = '';
        }
        Object.defineProperty(InputNumber.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (disabled) {
                if (disabled)
                    this.focused = false;
                this._disabled = disabled;
                if (this.timer)
                    this.clearTimer();
            },
            enumerable: false,
            configurable: true
        });
        InputNumber.prototype.ngOnChanges = function (simpleChange) {
            var props = ['locale', 'localeMatcher', 'mode', 'currency', 'currencyDisplay', 'useGrouping', 'minFractionDigits', 'maxFractionDigits', 'prefix', 'suffix'];
            if (props.some(function (p) { return !!simpleChange[p]; })) {
                this.updateConstructParser();
            }
        };
        InputNumber.prototype.ngOnInit = function () {
            this.constructParser();
            this.initialized = true;
        };
        InputNumber.prototype.getOptions = function () {
            return {
                localeMatcher: this.localeMatcher,
                style: this.mode,
                currency: this.currency,
                currencyDisplay: this.currencyDisplay,
                useGrouping: this.useGrouping,
                minimumFractionDigits: this.minFractionDigits,
                maximumFractionDigits: this.maxFractionDigits
            };
        };
        InputNumber.prototype.constructParser = function () {
            this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
            var numerals = __spreadArray([], __read(new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210))).reverse();
            var index = new Map(numerals.map(function (d, i) { return [d, i]; }));
            this._numeral = new RegExp("[" + numerals.join('') + "]", 'g');
            this._group = this.getGroupingExpression();
            this._minusSign = this.getMinusSignExpression();
            this._currency = this.getCurrencyExpression();
            this._decimal = this.getDecimalExpression();
            this._suffix = this.getSuffixExpression();
            this._prefix = this.getPrefixExpression();
            this._index = function (d) { return index.get(d); };
        };
        InputNumber.prototype.updateConstructParser = function () {
            if (this.initialized) {
                this.constructParser();
            }
        };
        InputNumber.prototype.escapeRegExp = function (text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        };
        InputNumber.prototype.getDecimalExpression = function () {
            var formatter = new Intl.NumberFormat(this.locale, Object.assign(Object.assign({}, this.getOptions()), { useGrouping: false }));
            return new RegExp("[" + formatter.format(1.1).replace(this._currency, '').trim().replace(this._numeral, '') + "]", 'g');
        };
        InputNumber.prototype.getGroupingExpression = function () {
            var formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });
            this.groupChar = formatter.format(1000000).trim().replace(this._numeral, '').charAt(0);
            return new RegExp("[" + this.groupChar + "]", 'g');
        };
        InputNumber.prototype.getMinusSignExpression = function () {
            var formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });
            return new RegExp("[" + formatter.format(-1).trim().replace(this._numeral, '') + "]", 'g');
        };
        InputNumber.prototype.getCurrencyExpression = function () {
            if (this.currency) {
                var formatter = new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currency, currencyDisplay: this.currencyDisplay,
                    minimumFractionDigits: 0, maximumFractionDigits: 0 });
                return new RegExp("[" + formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._group, '') + "]", 'g');
            }
            return new RegExp("[]", 'g');
        };
        InputNumber.prototype.getPrefixExpression = function () {
            if (this.prefix) {
                this.prefixChar = this.prefix;
            }
            else {
                var formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay });
                this.prefixChar = formatter.format(1).split('1')[0];
            }
            return new RegExp("" + this.escapeRegExp(this.prefixChar || ''), 'g');
        };
        InputNumber.prototype.getSuffixExpression = function () {
            if (this.suffix) {
                this.suffixChar = this.suffix;
            }
            else {
                var formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay,
                    minimumFractionDigits: 0, maximumFractionDigits: 0 });
                this.suffixChar = formatter.format(1).split('1')[1];
            }
            return new RegExp("" + this.escapeRegExp(this.suffixChar || ''), 'g');
        };
        InputNumber.prototype.formatValue = function (value) {
            if (value != null) {
                if (value === '-') { // Minus sign
                    return value;
                }
                if (this.format) {
                    var formatter = new Intl.NumberFormat(this.locale, this.getOptions());
                    var formattedValue = formatter.format(value);
                    if (this.prefix) {
                        formattedValue = this.prefix + formattedValue;
                    }
                    if (this.suffix) {
                        formattedValue = formattedValue + this.suffix;
                    }
                    return formattedValue;
                }
                return value.toString();
            }
            return '';
        };
        InputNumber.prototype.parseValue = function (text) {
            var filteredText = text
                .replace(this._suffix, '')
                .replace(this._prefix, '')
                .trim()
                .replace(/\s/g, '')
                .replace(this._currency, '')
                .replace(this._group, '')
                .replace(this._minusSign, '-')
                .replace(this._decimal, '.')
                .replace(this._numeral, this._index);
            if (filteredText) {
                if (filteredText === '-') // Minus sign
                    return filteredText;
                var parsedValue = +filteredText;
                return isNaN(parsedValue) ? null : parsedValue;
            }
            return null;
        };
        InputNumber.prototype.repeat = function (event, interval, dir) {
            var _this = this;
            if (this.readonly) {
                return;
            }
            var i = interval || 500;
            this.clearTimer();
            this.timer = setTimeout(function () {
                _this.repeat(event, 40, dir);
            }, i);
            this.spin(event, dir);
        };
        InputNumber.prototype.spin = function (event, dir) {
            var step = this.step * dir;
            var currentValue = this.parseValue(this.input.nativeElement.value) || 0;
            var newValue = this.validateValue(currentValue + step);
            if (this.maxlength && this.maxlength < this.formatValue(newValue).length) {
                return;
            }
            this.updateInput(newValue, null, 'spin', null);
            this.updateModel(event, newValue);
            this.handleOnInput(event, currentValue, newValue);
        };
        InputNumber.prototype.onUpButtonMouseDown = function (event) {
            this.input.nativeElement.focus();
            this.repeat(event, null, 1);
            event.preventDefault();
        };
        InputNumber.prototype.onUpButtonMouseUp = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onUpButtonMouseLeave = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onUpButtonKeyDown = function (event) {
            if (event.keyCode === 32 || event.keyCode === 13) {
                this.repeat(event, null, 1);
            }
        };
        InputNumber.prototype.onUpButtonKeyUp = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onDownButtonMouseDown = function (event) {
            this.input.nativeElement.focus();
            this.repeat(event, null, -1);
            event.preventDefault();
        };
        InputNumber.prototype.onDownButtonMouseUp = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onDownButtonMouseLeave = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onDownButtonKeyUp = function () {
            this.clearTimer();
        };
        InputNumber.prototype.onDownButtonKeyDown = function (event) {
            if (event.keyCode === 32 || event.keyCode === 13) {
                this.repeat(event, null, -1);
            }
        };
        InputNumber.prototype.onUserInput = function (event) {
            if (this.isSpecialChar) {
                event.target.value = this.lastValue;
            }
            this.isSpecialChar = false;
        };
        InputNumber.prototype.onInputKeyDown = function (event) {
            this.lastValue = event.target.value;
            if (event.shiftKey || event.altKey) {
                this.isSpecialChar = true;
                return;
            }
            var selectionStart = event.target.selectionStart;
            var selectionEnd = event.target.selectionEnd;
            var inputValue = event.target.value;
            var newValueStr = null;
            if (event.altKey) {
                event.preventDefault();
            }
            switch (event.which) {
                //up
                case 38:
                    this.spin(event, 1);
                    event.preventDefault();
                    break;
                //down
                case 40:
                    this.spin(event, -1);
                    event.preventDefault();
                    break;
                //left
                case 37:
                    if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
                        event.preventDefault();
                    }
                    break;
                //right
                case 39:
                    if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
                        event.preventDefault();
                    }
                    break;
                //enter
                case 13:
                    newValueStr = this.validateValue(this.parseValue(this.input.nativeElement.value));
                    this.input.nativeElement.value = this.formatValue(newValueStr);
                    this.input.nativeElement.setAttribute('aria-valuenow', newValueStr);
                    this.updateModel(event, newValueStr);
                    break;
                //backspace
                case 8: {
                    event.preventDefault();
                    if (selectionStart === selectionEnd) {
                        var deleteChar = inputValue.charAt(selectionStart - 1);
                        var _a = this.getDecimalCharIndexes(inputValue), decimalCharIndex = _a.decimalCharIndex, decimalCharIndexWithoutPrefix = _a.decimalCharIndexWithoutPrefix;
                        if (this.isNumeralChar(deleteChar)) {
                            var decimalLength = this.getDecimalLength(inputValue);
                            if (this._group.test(deleteChar)) {
                                this._group.lastIndex = 0;
                                newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                            }
                            else if (this._decimal.test(deleteChar)) {
                                this._decimal.lastIndex = 0;
                                if (decimalLength) {
                                    this.input.nativeElement.setSelectionRange(selectionStart - 1, selectionStart - 1);
                                }
                                else {
                                    newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                                }
                            }
                            else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                                var insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';
                                newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
                            }
                            else if (decimalCharIndexWithoutPrefix === 1) {
                                newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                                newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                            }
                            else {
                                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                            }
                        }
                        this.updateValue(event, newValueStr, null, 'delete-single');
                    }
                    else {
                        newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                        this.updateValue(event, newValueStr, null, 'delete-range');
                    }
                    break;
                }
                // del
                case 46:
                    event.preventDefault();
                    if (selectionStart === selectionEnd) {
                        var deleteChar = inputValue.charAt(selectionStart);
                        var _b = this.getDecimalCharIndexes(inputValue), decimalCharIndex = _b.decimalCharIndex, decimalCharIndexWithoutPrefix = _b.decimalCharIndexWithoutPrefix;
                        if (this.isNumeralChar(deleteChar)) {
                            var decimalLength = this.getDecimalLength(inputValue);
                            if (this._group.test(deleteChar)) {
                                this._group.lastIndex = 0;
                                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                            }
                            else if (this._decimal.test(deleteChar)) {
                                this._decimal.lastIndex = 0;
                                if (decimalLength) {
                                    this.input.nativeElement.setSelectionRange(selectionStart + 1, selectionStart + 1);
                                }
                                else {
                                    newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                                }
                            }
                            else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                                var insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';
                                newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
                            }
                            else if (decimalCharIndexWithoutPrefix === 1) {
                                newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                                newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                            }
                            else {
                                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                            }
                        }
                        this.updateValue(event, newValueStr, null, 'delete-back-single');
                    }
                    else {
                        newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                        this.updateValue(event, newValueStr, null, 'delete-range');
                    }
                    break;
                default:
                    break;
            }
            this.onKeyDown.emit(event);
        };
        InputNumber.prototype.onInputKeyPress = function (event) {
            event.preventDefault();
            var code = event.which || event.keyCode;
            var char = String.fromCharCode(code);
            var isDecimalSign = this.isDecimalSign(char);
            var isMinusSign = this.isMinusSign(char);
            if ((48 <= code && code <= 57) || isMinusSign || isDecimalSign) {
                this.insert(event, char, { isDecimalSign: isDecimalSign, isMinusSign: isMinusSign });
            }
        };
        InputNumber.prototype.onPaste = function (event) {
            if (!this.disabled) {
                event.preventDefault();
                var data = (event.clipboardData || window['clipboardData']).getData('Text');
                if (data) {
                    var filteredData = this.parseValue(data);
                    if (filteredData != null) {
                        this.insert(event, filteredData.toString());
                    }
                }
            }
        };
        InputNumber.prototype.allowMinusSign = function () {
            return this.min == null || this.min < 0;
        };
        InputNumber.prototype.isMinusSign = function (char) {
            if (this._minusSign.test(char) || char === '-') {
                this._minusSign.lastIndex = 0;
                return true;
            }
            return false;
        };
        InputNumber.prototype.isDecimalSign = function (char) {
            if (this._decimal.test(char)) {
                this._decimal.lastIndex = 0;
                return true;
            }
            return false;
        };
        InputNumber.prototype.isDecimalMode = function () {
            return this.mode === 'decimal';
        };
        InputNumber.prototype.getDecimalCharIndexes = function (val) {
            var decimalCharIndex = val.search(this._decimal);
            this._decimal.lastIndex = 0;
            var filteredVal = val.replace(this._prefix, '').trim().replace(/\s/g, '').replace(this._currency, '');
            var decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
            this._decimal.lastIndex = 0;
            return { decimalCharIndex: decimalCharIndex, decimalCharIndexWithoutPrefix: decimalCharIndexWithoutPrefix };
        };
        InputNumber.prototype.getCharIndexes = function (val) {
            var decimalCharIndex = val.search(this._decimal);
            this._decimal.lastIndex = 0;
            var minusCharIndex = val.search(this._minusSign);
            this._minusSign.lastIndex = 0;
            var suffixCharIndex = val.search(this._suffix);
            this._suffix.lastIndex = 0;
            var currencyCharIndex = val.search(this._currency);
            this._currency.lastIndex = 0;
            return { decimalCharIndex: decimalCharIndex, minusCharIndex: minusCharIndex, suffixCharIndex: suffixCharIndex, currencyCharIndex: currencyCharIndex };
        };
        InputNumber.prototype.insert = function (event, text, sign) {
            if (sign === void 0) { sign = { isDecimalSign: false, isMinusSign: false }; }
            var minusCharIndexOnText = text.search(this._minusSign);
            this._minusSign.lastIndex = 0;
            if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
                return;
            }
            var selectionStart = this.input.nativeElement.selectionStart;
            var selectionEnd = this.input.nativeElement.selectionEnd;
            var inputValue = this.input.nativeElement.value.trim();
            var _a = this.getCharIndexes(inputValue), decimalCharIndex = _a.decimalCharIndex, minusCharIndex = _a.minusCharIndex, suffixCharIndex = _a.suffixCharIndex, currencyCharIndex = _a.currencyCharIndex;
            var newValueStr;
            if (sign.isMinusSign) {
                if (selectionStart === 0) {
                    newValueStr = inputValue;
                    if (minusCharIndex === -1 || selectionEnd !== 0) {
                        newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
                    }
                    this.updateValue(event, newValueStr, text, 'insert');
                }
            }
            else if (sign.isDecimalSign) {
                if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
                    this.updateValue(event, inputValue, text, 'insert');
                }
                else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
                    newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, text, 'insert');
                }
                else if (decimalCharIndex === -1 && this.maxFractionDigits) {
                    newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, text, 'insert');
                }
            }
            else {
                var maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
                var operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';
                if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                    if ((selectionStart + text.length - (decimalCharIndex + 1)) <= maxFractionDigits) {
                        var charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : (suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length);
                        newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
                        this.updateValue(event, newValueStr, text, operation);
                    }
                }
                else {
                    newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                    this.updateValue(event, newValueStr, text, operation);
                }
            }
        };
        InputNumber.prototype.insertText = function (value, text, start, end) {
            var textSplit = text === '.' ? text : text.split('.');
            if (textSplit.length === 2) {
                var decimalCharIndex = value.slice(start, end).search(this._decimal);
                this._decimal.lastIndex = 0;
                return (decimalCharIndex > 0) ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : (value || this.formatValue(text));
            }
            else if ((end - start) === value.length) {
                return this.formatValue(text);
            }
            else if (start === 0) {
                return text + value.slice(end);
            }
            else if (end === value.length) {
                return value.slice(0, start) + text;
            }
            else {
                return value.slice(0, start) + text + value.slice(end);
            }
        };
        InputNumber.prototype.deleteRange = function (value, start, end) {
            var newValueStr;
            if ((end - start) === value.length)
                newValueStr = '';
            else if (start === 0)
                newValueStr = value.slice(end);
            else if (end === value.length)
                newValueStr = value.slice(0, start);
            else
                newValueStr = value.slice(0, start) + value.slice(end);
            return newValueStr;
        };
        InputNumber.prototype.initCursor = function () {
            var selectionStart = this.input.nativeElement.selectionStart;
            var inputValue = this.input.nativeElement.value;
            var valueLength = inputValue.length;
            var index = null;
            // remove prefix
            var prefixLength = (this.prefixChar || '').length;
            inputValue = inputValue.replace(this._prefix, '');
            selectionStart = selectionStart - prefixLength;
            var char = inputValue.charAt(selectionStart);
            if (this.isNumeralChar(char)) {
                return selectionStart + prefixLength;
            }
            //left
            var i = selectionStart - 1;
            while (i >= 0) {
                char = inputValue.charAt(i);
                if (this.isNumeralChar(char)) {
                    index = i + prefixLength;
                    break;
                }
                else {
                    i--;
                }
            }
            if (index !== null) {
                this.input.nativeElement.setSelectionRange(index + 1, index + 1);
            }
            else {
                i = selectionStart;
                while (i < valueLength) {
                    char = inputValue.charAt(i);
                    if (this.isNumeralChar(char)) {
                        index = i + prefixLength;
                        break;
                    }
                    else {
                        i++;
                    }
                }
                if (index !== null) {
                    this.input.nativeElement.setSelectionRange(index, index);
                }
            }
            return index || 0;
        };
        InputNumber.prototype.onInputClick = function () {
            this.initCursor();
        };
        InputNumber.prototype.isNumeralChar = function (char) {
            if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
                this.resetRegex();
                return true;
            }
            return false;
        };
        InputNumber.prototype.resetRegex = function () {
            this._numeral.lastIndex = 0;
            this._decimal.lastIndex = 0;
            this._group.lastIndex = 0;
            this._minusSign.lastIndex = 0;
        };
        InputNumber.prototype.updateValue = function (event, valueStr, insertedValueStr, operation) {
            var currentValue = this.input.nativeElement.value;
            var newValue = null;
            if (valueStr != null) {
                newValue = this.parseValue(valueStr);
                newValue = !newValue && !this.allowEmpty ? 0 : newValue;
                this.updateInput(newValue, insertedValueStr, operation, valueStr);
                this.handleOnInput(event, currentValue, newValue);
            }
        };
        InputNumber.prototype.handleOnInput = function (event, currentValue, newValue) {
            if (this.isValueChanged(currentValue, newValue)) {
                this.onInput.emit({ originalEvent: event, value: newValue });
            }
        };
        InputNumber.prototype.isValueChanged = function (currentValue, newValue) {
            if (newValue === null && currentValue !== null) {
                return true;
            }
            if (newValue != null) {
                var parsedCurrentValue = (typeof currentValue === 'string') ? this.parseValue(currentValue) : currentValue;
                return newValue !== parsedCurrentValue;
            }
            return false;
        };
        InputNumber.prototype.validateValue = function (value) {
            if (value === '-' || value == null) {
                return null;
            }
            if (this.min != null && value < this.min) {
                return this.min;
            }
            if (this.max != null && value > this.max) {
                return this.max;
            }
            return value;
        };
        InputNumber.prototype.updateInput = function (value, insertedValueStr, operation, valueStr) {
            insertedValueStr = insertedValueStr || '';
            var inputValue = this.input.nativeElement.value;
            var newValue = this.formatValue(value);
            var currentLength = inputValue.length;
            if (newValue !== valueStr) {
                newValue = this.concatValues(newValue, valueStr);
            }
            if (currentLength === 0) {
                this.input.nativeElement.value = newValue;
                this.input.nativeElement.setSelectionRange(0, 0);
                var index = this.initCursor();
                var selectionEnd = index + insertedValueStr.length;
                this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
            }
            else {
                var selectionStart = this.input.nativeElement.selectionStart;
                var selectionEnd = this.input.nativeElement.selectionEnd;
                if (this.maxlength && this.maxlength < newValue.length) {
                    return;
                }
                this.input.nativeElement.value = newValue;
                var newLength = newValue.length;
                if (operation === 'range-insert') {
                    var startValue = this.parseValue((inputValue || '').slice(0, selectionStart));
                    var startValueStr = startValue !== null ? startValue.toString() : '';
                    var startExpr = startValueStr.split('').join("(" + this.groupChar + ")?");
                    var sRegex = new RegExp(startExpr, 'g');
                    sRegex.test(newValue);
                    var tExpr = insertedValueStr.split('').join("(" + this.groupChar + ")?");
                    var tRegex = new RegExp(tExpr, 'g');
                    tRegex.test(newValue.slice(sRegex.lastIndex));
                    selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
                    this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
                }
                else if (newLength === currentLength) {
                    if (operation === 'insert' || operation === 'delete-back-single')
                        this.input.nativeElement.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
                    else if (operation === 'delete-single')
                        this.input.nativeElement.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
                    else if (operation === 'delete-range' || operation === 'spin')
                        this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
                }
                else if (operation === 'delete-back-single') {
                    var prevChar = inputValue.charAt(selectionEnd - 1);
                    var nextChar = inputValue.charAt(selectionEnd);
                    var diff = currentLength - newLength;
                    var isGroupChar = this._group.test(nextChar);
                    if (isGroupChar && diff === 1) {
                        selectionEnd += 1;
                    }
                    else if (!isGroupChar && this.isNumeralChar(prevChar)) {
                        selectionEnd += (-1 * diff) + 1;
                    }
                    this._group.lastIndex = 0;
                    this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
                }
                else if (inputValue === '-' && operation === 'insert') {
                    this.input.nativeElement.setSelectionRange(0, 0);
                    var index = this.initCursor();
                    var selectionEnd_1 = index + insertedValueStr.length + 1;
                    this.input.nativeElement.setSelectionRange(selectionEnd_1, selectionEnd_1);
                }
                else {
                    selectionEnd = selectionEnd + (newLength - currentLength);
                    this.input.nativeElement.setSelectionRange(selectionEnd, selectionEnd);
                }
            }
            this.input.nativeElement.setAttribute('aria-valuenow', value);
        };
        InputNumber.prototype.concatValues = function (val1, val2) {
            if (val1 && val2) {
                var decimalCharIndex = val2.search(this._decimal);
                this._decimal.lastIndex = 0;
                return decimalCharIndex !== -1 ? (val1.split(this._decimal)[0] + val2.slice(decimalCharIndex)) : val1;
            }
            return val1;
        };
        InputNumber.prototype.getDecimalLength = function (value) {
            if (value) {
                var valueSplit = value.split(this._decimal);
                if (valueSplit.length === 2) {
                    return valueSplit[1].replace(this._suffix, '')
                        .trim()
                        .replace(/\s/g, '')
                        .replace(this._currency, '').length;
                }
            }
            return 0;
        };
        InputNumber.prototype.onInputFocus = function (event) {
            this.focused = true;
            this.onFocus.emit(event);
        };
        InputNumber.prototype.onInputBlur = function (event) {
            this.focused = false;
            var newValue = this.validateValue(this.parseValue(this.input.nativeElement.value));
            this.input.nativeElement.value = this.formatValue(newValue);
            this.input.nativeElement.setAttribute('aria-valuenow', newValue);
            this.updateModel(event, newValue);
            this.onBlur.emit(event);
        };
        InputNumber.prototype.formattedValue = function () {
            var val = !this.value && !this.allowEmpty ? 0 : this.value;
            return this.formatValue(val);
        };
        InputNumber.prototype.updateModel = function (event, value) {
            if (this.value !== value) {
                this.value = value;
                this.onModelChange(value);
            }
            this.onModelTouched();
        };
        InputNumber.prototype.writeValue = function (value) {
            this.value = value;
            this.cd.markForCheck();
        };
        InputNumber.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        InputNumber.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        InputNumber.prototype.setDisabledState = function (val) {
            this.disabled = val;
            this.cd.markForCheck();
        };
        Object.defineProperty(InputNumber.prototype, "filled", {
            get: function () {
                return (this.value != null && this.value.toString().length > 0);
            },
            enumerable: false,
            configurable: true
        });
        InputNumber.prototype.clearTimer = function () {
            if (this.timer) {
                clearInterval(this.timer);
            }
        };
        InputNumber.prototype.getFormatter = function () {
            return this.numberFormat;
        };
        return InputNumber;
    }());
    InputNumber.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputNumber, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    InputNumber.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.5", type: InputNumber, selector: "p-inputNumber", inputs: { showButtons: "showButtons", format: "format", buttonLayout: "buttonLayout", inputId: "inputId", styleClass: "styleClass", style: "style", placeholder: "placeholder", size: "size", maxlength: "maxlength", tabindex: "tabindex", title: "title", ariaLabel: "ariaLabel", ariaRequired: "ariaRequired", name: "name", required: "required", autocomplete: "autocomplete", min: "min", max: "max", incrementButtonClass: "incrementButtonClass", decrementButtonClass: "decrementButtonClass", incrementButtonIcon: "incrementButtonIcon", decrementButtonIcon: "decrementButtonIcon", readonly: "readonly", step: "step", allowEmpty: "allowEmpty", locale: "locale", localeMatcher: "localeMatcher", mode: "mode", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: "useGrouping", minFractionDigits: "minFractionDigits", maxFractionDigits: "maxFractionDigits", prefix: "prefix", suffix: "suffix", inputStyle: "inputStyle", inputStyleClass: "inputStyleClass", disabled: "disabled" }, outputs: { onInput: "onInput", onFocus: "onFocus", onBlur: "onBlur", onKeyDown: "onKeyDown" }, host: { properties: { "class.p-inputwrapper-filled": "filled", "class.p-inputwrapper-focus": "focused" }, classAttribute: "p-element p-inputwrapper" }, providers: [INPUTNUMBER_VALUE_ACCESSOR], viewQueries: [{ propertyName: "input", first: true, predicate: ["input"], descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "\n        <span [ngClass]=\"{'p-inputnumber p-component': true,'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',\n                'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal', 'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'}\"\n                [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input #input [ngClass]=\"'p-inputnumber-input'\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" pInputText [value]=\"formattedValue()\" [attr.placeholder]=\"placeholder\" [attr.title]=\"title\" [attr.id]=\"inputId\"\n                [attr.size]=\"size\" [attr.name]=\"name\" [attr.autocomplete]=\"autocomplete\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.aria-label]=\"ariaLabel\"\n                [attr.aria-required]=\"ariaRequired\" [disabled]=\"disabled\" [attr.required]=\"required\" [attr.aria-valuemin]=\"min\" [attr.aria-valuemax]=\"max\" [readonly]=\"readonly\" inputmode=\"decimal\"\n                (input)=\"onUserInput($event)\" (keydown)=\"onInputKeyDown($event)\" (keypress)=\"onInputKeyPress($event)\" (paste)=\"onPaste($event)\" (click)=\"onInputClick()\"\n                (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n            <span class=\"p-inputnumber-button-group\" *ngIf=\"showButtons && buttonLayout === 'stacked'\">\n                <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-up': true}\" [class]=\"incrementButtonClass\" [icon]=\"incrementButtonIcon\" [disabled]=\"disabled\"\n                    (mousedown)=\"this.onUpButtonMouseDown($event)\" (mouseup)=\"onUpButtonMouseUp()\" (mouseleave)=\"onUpButtonMouseLeave()\" (keydown)=\"onUpButtonKeyDown($event)\" (keyup)=\"onUpButtonKeyUp()\"></button>\n                <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-down': true}\" [class]=\"decrementButtonClass\" [icon]=\"decrementButtonIcon\" [disabled]=\"disabled\"\n                    (mousedown)=\"this.onDownButtonMouseDown($event)\" (mouseup)=\"onDownButtonMouseUp()\" (mouseleave)=\"onDownButtonMouseLeave()\" (keydown)=\"onDownButtonKeyDown($event)\" (keyup)=\"onDownButtonKeyUp()\"></button>\n            </span>\n            <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-up': true}\" [class]=\"incrementButtonClass\" [icon]=\"incrementButtonIcon\" *ngIf=\"showButtons && buttonLayout !== 'stacked'\" [disabled]=\"disabled\"\n                (mousedown)=\"this.onUpButtonMouseDown($event)\" (mouseup)=\"onUpButtonMouseUp()\" (mouseleave)=\"onUpButtonMouseLeave()\" (keydown)=\"onUpButtonKeyDown($event)\" (keyup)=\"onUpButtonKeyUp()\"></button>\n            <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-down': true}\" [class]=\"decrementButtonClass\" [icon]=\"decrementButtonIcon\" *ngIf=\"showButtons && buttonLayout !== 'stacked'\" [disabled]=\"disabled\"\n                (mousedown)=\"this.onDownButtonMouseDown($event)\" (mouseup)=\"onDownButtonMouseUp()\" (mouseleave)=\"onDownButtonMouseLeave()\" (keydown)=\"onDownButtonKeyDown($event)\" (keyup)=\"onDownButtonKeyUp()\"></button>\n        </span>\n    ", isInline: true, styles: [".p-inputnumber,p-inputnumber{display:inline-flex}.p-inputnumber-button{display:flex;align-items:center;justify-content:center;flex:0 0 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label,.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label{display:none}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up{border-top-left-radius:0;border-bottom-left-radius:0;border-bottom-right-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-input{border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down{border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:0;padding:0}.p-inputnumber-buttons-stacked .p-inputnumber-button-group{display:flex;flex-direction:column}.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button{flex:1 1 auto}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up{order:3;border-top-left-radius:0;border-bottom-left-radius:0}.p-inputnumber-buttons-horizontal .p-inputnumber-input{order:2;border-radius:0}.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down{order:1;border-top-right-radius:0;border-bottom-right-radius:0}.p-inputnumber-buttons-vertical{flex-direction:column}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up{order:1;border-bottom-left-radius:0;border-bottom-right-radius:0;width:100%}.p-inputnumber-buttons-vertical .p-inputnumber-input{order:2;border-radius:0;text-align:center}.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down{order:3;border-top-left-radius:0;border-top-right-radius:0;width:100%}.p-inputnumber-input{flex:1 1 auto}.p-fluid .p-inputnumber,.p-fluid p-inputnumber{width:100%}.p-fluid .p-inputnumber .p-inputnumber-input{width:1%}.p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input{width:100%}"], directives: [{ type: i1__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1__namespace.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2__namespace.InputText, selector: "[pInputText]" }, { type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputNumber, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'p-inputNumber',
                        template: "\n        <span [ngClass]=\"{'p-inputnumber p-component': true,'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',\n                'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal', 'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'}\"\n                [ngStyle]=\"style\" [class]=\"styleClass\">\n            <input #input [ngClass]=\"'p-inputnumber-input'\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" pInputText [value]=\"formattedValue()\" [attr.placeholder]=\"placeholder\" [attr.title]=\"title\" [attr.id]=\"inputId\"\n                [attr.size]=\"size\" [attr.name]=\"name\" [attr.autocomplete]=\"autocomplete\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.aria-label]=\"ariaLabel\"\n                [attr.aria-required]=\"ariaRequired\" [disabled]=\"disabled\" [attr.required]=\"required\" [attr.aria-valuemin]=\"min\" [attr.aria-valuemax]=\"max\" [readonly]=\"readonly\" inputmode=\"decimal\"\n                (input)=\"onUserInput($event)\" (keydown)=\"onInputKeyDown($event)\" (keypress)=\"onInputKeyPress($event)\" (paste)=\"onPaste($event)\" (click)=\"onInputClick()\"\n                (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n            <span class=\"p-inputnumber-button-group\" *ngIf=\"showButtons && buttonLayout === 'stacked'\">\n                <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-up': true}\" [class]=\"incrementButtonClass\" [icon]=\"incrementButtonIcon\" [disabled]=\"disabled\"\n                    (mousedown)=\"this.onUpButtonMouseDown($event)\" (mouseup)=\"onUpButtonMouseUp()\" (mouseleave)=\"onUpButtonMouseLeave()\" (keydown)=\"onUpButtonKeyDown($event)\" (keyup)=\"onUpButtonKeyUp()\"></button>\n                <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-down': true}\" [class]=\"decrementButtonClass\" [icon]=\"decrementButtonIcon\" [disabled]=\"disabled\"\n                    (mousedown)=\"this.onDownButtonMouseDown($event)\" (mouseup)=\"onDownButtonMouseUp()\" (mouseleave)=\"onDownButtonMouseLeave()\" (keydown)=\"onDownButtonKeyDown($event)\" (keyup)=\"onDownButtonKeyUp()\"></button>\n            </span>\n            <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-up': true}\" [class]=\"incrementButtonClass\" [icon]=\"incrementButtonIcon\" *ngIf=\"showButtons && buttonLayout !== 'stacked'\" [disabled]=\"disabled\"\n                (mousedown)=\"this.onUpButtonMouseDown($event)\" (mouseup)=\"onUpButtonMouseUp()\" (mouseleave)=\"onUpButtonMouseLeave()\" (keydown)=\"onUpButtonKeyDown($event)\" (keyup)=\"onUpButtonKeyUp()\"></button>\n            <button type=\"button\" pButton [ngClass]=\"{'p-inputnumber-button p-inputnumber-button-down': true}\" [class]=\"decrementButtonClass\" [icon]=\"decrementButtonIcon\" *ngIf=\"showButtons && buttonLayout !== 'stacked'\" [disabled]=\"disabled\"\n                (mousedown)=\"this.onDownButtonMouseDown($event)\" (mouseup)=\"onDownButtonMouseUp()\" (mouseleave)=\"onDownButtonMouseLeave()\" (keydown)=\"onDownButtonKeyDown($event)\" (keyup)=\"onDownButtonKeyUp()\"></button>\n        </span>\n    ",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        providers: [INPUTNUMBER_VALUE_ACCESSOR],
                        encapsulation: i0.ViewEncapsulation.None,
                        styleUrls: ['./inputnumber.css'],
                        host: {
                            'class': 'p-element p-inputwrapper',
                            '[class.p-inputwrapper-filled]': 'filled',
                            '[class.p-inputwrapper-focus]': 'focused'
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { showButtons: [{
                    type: i0.Input
                }], format: [{
                    type: i0.Input
                }], buttonLayout: [{
                    type: i0.Input
                }], inputId: [{
                    type: i0.Input
                }], styleClass: [{
                    type: i0.Input
                }], style: [{
                    type: i0.Input
                }], placeholder: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }], maxlength: [{
                    type: i0.Input
                }], tabindex: [{
                    type: i0.Input
                }], title: [{
                    type: i0.Input
                }], ariaLabel: [{
                    type: i0.Input
                }], ariaRequired: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], required: [{
                    type: i0.Input
                }], autocomplete: [{
                    type: i0.Input
                }], min: [{
                    type: i0.Input
                }], max: [{
                    type: i0.Input
                }], incrementButtonClass: [{
                    type: i0.Input
                }], decrementButtonClass: [{
                    type: i0.Input
                }], incrementButtonIcon: [{
                    type: i0.Input
                }], decrementButtonIcon: [{
                    type: i0.Input
                }], readonly: [{
                    type: i0.Input
                }], step: [{
                    type: i0.Input
                }], allowEmpty: [{
                    type: i0.Input
                }], locale: [{
                    type: i0.Input
                }], localeMatcher: [{
                    type: i0.Input
                }], mode: [{
                    type: i0.Input
                }], currency: [{
                    type: i0.Input
                }], currencyDisplay: [{
                    type: i0.Input
                }], useGrouping: [{
                    type: i0.Input
                }], minFractionDigits: [{
                    type: i0.Input
                }], maxFractionDigits: [{
                    type: i0.Input
                }], prefix: [{
                    type: i0.Input
                }], suffix: [{
                    type: i0.Input
                }], inputStyle: [{
                    type: i0.Input
                }], inputStyleClass: [{
                    type: i0.Input
                }], input: [{
                    type: i0.ViewChild,
                    args: ['input']
                }], onInput: [{
                    type: i0.Output
                }], onFocus: [{
                    type: i0.Output
                }], onBlur: [{
                    type: i0.Output
                }], onKeyDown: [{
                    type: i0.Output
                }], disabled: [{
                    type: i0.Input
                }] } });
    var InputNumberModule = /** @class */ (function () {
        function InputNumberModule() {
        }
        return InputNumberModule;
    }());
    InputNumberModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputNumberModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    InputNumberModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputNumberModule, declarations: [InputNumber], imports: [i1.CommonModule, i2.InputTextModule, i3.ButtonModule], exports: [InputNumber] });
    InputNumberModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputNumberModule, imports: [[i1.CommonModule, i2.InputTextModule, i3.ButtonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.5", ngImport: i0__namespace, type: InputNumberModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i1.CommonModule, i2.InputTextModule, i3.ButtonModule],
                        exports: [InputNumber],
                        declarations: [InputNumber]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.INPUTNUMBER_VALUE_ACCESSOR = INPUTNUMBER_VALUE_ACCESSOR;
    exports.InputNumber = InputNumber;
    exports.InputNumberModule = InputNumberModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inputnumber.umd.js.map
