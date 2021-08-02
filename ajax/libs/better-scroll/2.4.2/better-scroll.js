/*!
 * better-scroll / better-scroll
 * (c) 2016-2021 ustbhuangyi
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BetterScroll = {}));
}(this, (function (exports) { 'use strict';

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
        };
        return __assign.apply(this, arguments);
    };

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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var propertiesConfig$7 = [
        {
            sourceKey: 'scroller.scrollBehaviorX.currentPos',
            key: 'x'
        },
        {
            sourceKey: 'scroller.scrollBehaviorY.currentPos',
            key: 'y'
        },
        {
            sourceKey: 'scroller.scrollBehaviorX.hasScroll',
            key: 'hasHorizontalScroll'
        },
        {
            sourceKey: 'scroller.scrollBehaviorY.hasScroll',
            key: 'hasVerticalScroll'
        },
        {
            sourceKey: 'scroller.scrollBehaviorX.contentSize',
            key: 'scrollerWidth'
        },
        {
            sourceKey: 'scroller.scrollBehaviorY.contentSize',
            key: 'scrollerHeight'
        },
        {
            sourceKey: 'scroller.scrollBehaviorX.maxScrollPos',
            key: 'maxScrollX'
        },
        {
            sourceKey: 'scroller.scrollBehaviorY.maxScrollPos',
            key: 'maxScrollY'
        },
        {
            sourceKey: 'scroller.scrollBehaviorX.minScrollPos',
            key: 'minScrollX'
        },
        {
            sourceKey: 'scroller.scrollBehaviorY.minScrollPos',
            key: 'minScrollY'
        },
        {
            sourceKey: 'scroller.scrollBehaviorX.movingDirection',
            key: 'movingDirectionX'
        },
        {
            sourceKey: 'scroller.scrollBehaviorY.movingDirection',
            key: 'movingDirectionY'
        },
        {
            sourceKey: 'scroller.scrollBehaviorX.direction',
            key: 'directionX'
        },
        {
            sourceKey: 'scroller.scrollBehaviorY.direction',
            key: 'directionY'
        },
        {
            sourceKey: 'scroller.actions.enabled',
            key: 'enabled'
        },
        {
            sourceKey: 'scroller.animater.pending',
            key: 'pending'
        },
        {
            sourceKey: 'scroller.animater.stop',
            key: 'stop'
        },
        {
            sourceKey: 'scroller.scrollTo',
            key: 'scrollTo'
        },
        {
            sourceKey: 'scroller.scrollBy',
            key: 'scrollBy'
        },
        {
            sourceKey: 'scroller.scrollToElement',
            key: 'scrollToElement'
        },
        {
            sourceKey: 'scroller.resetPosition',
            key: 'resetPosition'
        }
    ];

    function warn(msg) {
        console.error("[BScroll warn]: " + msg);
    }
    function assert(condition, msg) {
        if (!condition) {
            throw new Error('[BScroll] ' + msg);
        }
    }

    // ssr support
    var inBrowser = typeof window !== 'undefined';
    var ua = inBrowser && navigator.userAgent.toLowerCase();
    var isWeChatDevTools = !!(ua && /wechatdevtools/.test(ua));
    var isAndroid = ua && ua.indexOf('android') > 0;
    /* istanbul ignore next */
    var isIOSBadVersion = (function () {
        if (typeof ua === 'string') {
            var regex = /os (\d\d?_\d(_\d)?)/;
            var matches = regex.exec(ua);
            if (!matches)
                return false;
            var parts = matches[1].split('_').map(function (item) {
                return parseInt(item, 10);
            });
            // ios version >= 13.4 issue 982
            return !!(parts[0] === 13 && parts[1] >= 4);
        }
        return false;
    })();
    /* istanbul ignore next */
    var supportsPassive = false;
    /* istanbul ignore next */
    if (inBrowser) {
        var EventName = 'test-passive';
        try {
            var opts = {};
            Object.defineProperty(opts, 'passive', {
                get: function () {
                    supportsPassive = true;
                },
            }); // https://github.com/facebook/flow/issues/285
            window.addEventListener(EventName, function () { }, opts);
        }
        catch (e) { }
    }

    function getNow() {
        return window.performance &&
            window.performance.now &&
            window.performance.timing
            ? window.performance.now() + window.performance.timing.navigationStart
            : +new Date();
    }
    var extend = function (target, source) {
        for (var key in source) {
            target[key] = source[key];
        }
        return target;
    };
    function isUndef(v) {
        return v === undefined || v === null;
    }
    function getDistance(x, y) {
        return Math.sqrt(x * x + y * y);
    }
    function between(x, min, max) {
        if (x < min) {
            return min;
        }
        if (x > max) {
            return max;
        }
        return x;
    }
    function findIndex(ary, fn) {
        if (ary.findIndex) {
            return ary.findIndex(fn);
        }
        var index = -1;
        ary.some(function (item, i, ary) {
            var ret = fn(item, i, ary);
            if (ret) {
                index = i;
                return ret;
            }
        });
        return index;
    }

    var elementStyle = (inBrowser &&
        document.createElement('div').style);
    var vendor = (function () {
        /* istanbul ignore if  */
        if (!inBrowser) {
            return false;
        }
        var transformNames = [
            {
                key: 'standard',
                value: 'transform',
            },
            {
                key: 'webkit',
                value: 'webkitTransform',
            },
            {
                key: 'Moz',
                value: 'MozTransform',
            },
            {
                key: 'O',
                value: 'OTransform',
            },
            {
                key: 'ms',
                value: 'msTransform',
            },
        ];
        for (var _i = 0, transformNames_1 = transformNames; _i < transformNames_1.length; _i++) {
            var obj = transformNames_1[_i];
            if (elementStyle[obj.value] !== undefined) {
                return obj.key;
            }
        }
        /* istanbul ignore next  */
        return false;
    })();
    /* istanbul ignore next  */
    function prefixStyle(style) {
        if (vendor === false) {
            return style;
        }
        if (vendor === 'standard') {
            if (style === 'transitionEnd') {
                return 'transitionend';
            }
            return style;
        }
        return vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }
    function getElement(el) {
        return (typeof el === 'string'
            ? document.querySelector(el)
            : el);
    }
    function addEvent(el, type, fn, capture) {
        var useCapture = supportsPassive
            ? {
                passive: false,
                capture: !!capture,
            }
            : !!capture;
        el.addEventListener(type, fn, useCapture);
    }
    function removeEvent(el, type, fn, capture) {
        el.removeEventListener(type, fn, {
            capture: !!capture,
        });
    }
    function offset(el) {
        var left = 0;
        var top = 0;
        while (el) {
            left -= el.offsetLeft;
            top -= el.offsetTop;
            el = el.offsetParent;
        }
        return {
            left: left,
            top: top,
        };
    }
    function offsetToBody(el) {
        var rect = el.getBoundingClientRect();
        return {
            left: -(rect.left + window.pageXOffset),
            top: -(rect.top + window.pageYOffset),
        };
    }
    var cssVendor = vendor && vendor !== 'standard' ? '-' + vendor.toLowerCase() + '-' : '';
    var transform = prefixStyle('transform');
    var transition = prefixStyle('transition');
    var hasPerspective = inBrowser && prefixStyle('perspective') in elementStyle;
    // fix issue #361
    var hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools);
    var hasTransition = inBrowser && transition in elementStyle;
    var style = {
        transform: transform,
        transition: transition,
        transitionTimingFunction: prefixStyle('transitionTimingFunction'),
        transitionDuration: prefixStyle('transitionDuration'),
        transitionDelay: prefixStyle('transitionDelay'),
        transformOrigin: prefixStyle('transformOrigin'),
        transitionEnd: prefixStyle('transitionEnd'),
        transitionProperty: prefixStyle('transitionProperty'),
    };
    var eventTypeMap = {
        touchstart: 1,
        touchmove: 1,
        touchend: 1,
        touchcancel: 1,
        mousedown: 2,
        mousemove: 2,
        mouseup: 2,
    };
    function getRect(el) {
        /* istanbul ignore if  */
        if (el instanceof window.SVGElement) {
            var rect = el.getBoundingClientRect();
            return {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            };
        }
        else {
            return {
                top: el.offsetTop,
                left: el.offsetLeft,
                width: el.offsetWidth,
                height: el.offsetHeight,
            };
        }
    }
    function preventDefaultExceptionFn(el, exceptions) {
        for (var i in exceptions) {
            if (exceptions[i].test(el[i])) {
                return true;
            }
        }
        return false;
    }
    var tagExceptionFn = preventDefaultExceptionFn;
    function tap(e, eventName) {
        var ev = document.createEvent('Event');
        ev.initEvent(eventName, true, true);
        ev.pageX = e.pageX;
        ev.pageY = e.pageY;
        e.target.dispatchEvent(ev);
    }
    function click(e, event) {
        if (event === void 0) { event = 'click'; }
        var eventSource;
        if (e.type === 'mouseup') {
            eventSource = e;
        }
        else if (e.type === 'touchend' || e.type === 'touchcancel') {
            eventSource = e.changedTouches[0];
        }
        var posSrc = {};
        if (eventSource) {
            posSrc.screenX = eventSource.screenX || 0;
            posSrc.screenY = eventSource.screenY || 0;
            posSrc.clientX = eventSource.clientX || 0;
            posSrc.clientY = eventSource.clientY || 0;
        }
        var ev;
        var bubbles = true;
        var cancelable = true;
        var ctrlKey = e.ctrlKey, shiftKey = e.shiftKey, altKey = e.altKey, metaKey = e.metaKey;
        var pressedKeysMap = {
            ctrlKey: ctrlKey,
            shiftKey: shiftKey,
            altKey: altKey,
            metaKey: metaKey,
        };
        if (typeof MouseEvent !== 'undefined') {
            try {
                ev = new MouseEvent(event, extend(__assign({ bubbles: bubbles,
                    cancelable: cancelable }, pressedKeysMap), posSrc));
            }
            catch (e) {
                /* istanbul ignore next */
                createEvent();
            }
        }
        else {
            createEvent();
        }
        function createEvent() {
            ev = document.createEvent('Event');
            ev.initEvent(event, bubbles, cancelable);
            extend(ev, posSrc);
        }
        // forwardedTouchEvent set to true in case of the conflict with fastclick
        ev.forwardedTouchEvent = true;
        ev._constructed = true;
        e.target.dispatchEvent(ev);
    }
    function dblclick(e) {
        click(e, 'dblclick');
    }
    function prepend(el, target) {
        var firstChild = target.firstChild;
        if (firstChild) {
            before(el, firstChild);
        }
        else {
            target.appendChild(el);
        }
    }
    function before(el, target) {
        var parentNode = target.parentNode;
        parentNode.insertBefore(el, target);
    }
    function removeChild(el, child) {
        el.removeChild(child);
    }
    function hasClass(el, className) {
        var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
        return reg.test(el.className);
    }
    function HTMLCollectionToArray(el) {
        return Array.prototype.slice.call(el, 0);
    }
    function getClientSize(el) {
        return {
            width: el.clientWidth,
            height: el.clientHeight,
        };
    }

    var ease = {
        // easeOutQuint
        swipe: {
            style: 'cubic-bezier(0.23, 1, 0.32, 1)',
            fn: function (t) {
                return 1 + --t * t * t * t * t;
            }
        },
        // easeOutQuard
        swipeBounce: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: function (t) {
                return t * (2 - t);
            }
        },
        // easeOutQuart
        bounce: {
            style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            fn: function (t) {
                return 1 - --t * t * t * t;
            }
        }
    };

    var DEFAULT_INTERVAL = 1000 / 60;
    var windowCompat = inBrowser && window;
    /* istanbul ignore next */
    function noop$1() { }
    var requestAnimationFrame = (function () {
        /* istanbul ignore if  */
        if (!inBrowser) {
            return noop$1;
        }
        return (windowCompat.requestAnimationFrame ||
            windowCompat.webkitRequestAnimationFrame ||
            windowCompat.mozRequestAnimationFrame ||
            windowCompat.oRequestAnimationFrame ||
            // if all else fails, use setTimeout
            function (callback) {
                return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL); // make interval as precise as possible.
            });
    })();
    var cancelAnimationFrame = (function () {
        /* istanbul ignore if  */
        if (!inBrowser) {
            return noop$1;
        }
        return (windowCompat.cancelAnimationFrame ||
            windowCompat.webkitCancelAnimationFrame ||
            windowCompat.mozCancelAnimationFrame ||
            windowCompat.oCancelAnimationFrame ||
            function (id) {
                window.clearTimeout(id);
            });
    })();

    /* istanbul ignore next */
    var noop = function (val) { };
    var sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get: noop,
        set: noop,
    };
    var getProperty = function (obj, key) {
        var keys = key.split('.');
        for (var i = 0; i < keys.length - 1; i++) {
            obj = obj[keys[i]];
            if (typeof obj !== 'object' || !obj)
                return;
        }
        var lastKey = keys.pop();
        if (typeof obj[lastKey] === 'function') {
            return function () {
                return obj[lastKey].apply(obj, arguments);
            };
        }
        else {
            return obj[lastKey];
        }
    };
    var setProperty = function (obj, key, value) {
        var keys = key.split('.');
        var temp;
        for (var i = 0; i < keys.length - 1; i++) {
            temp = keys[i];
            if (!obj[temp])
                obj[temp] = {};
            obj = obj[temp];
        }
        obj[keys.pop()] = value;
    };
    function propertiesProxy(target, sourceKey, key) {
        sharedPropertyDefinition.get = function proxyGetter() {
            return getProperty(this, sourceKey);
        };
        sharedPropertyDefinition.set = function proxySetter(val) {
            setProperty(this, sourceKey, val);
        };
        Object.defineProperty(target, key, sharedPropertyDefinition);
    }

    var EventEmitter = /** @class */ (function () {
        function EventEmitter(names) {
            this.events = {};
            this.eventTypes = {};
            this.registerType(names);
        }
        EventEmitter.prototype.on = function (type, fn, context) {
            if (context === void 0) { context = this; }
            this.hasType(type);
            if (!this.events[type]) {
                this.events[type] = [];
            }
            this.events[type].push([fn, context]);
            return this;
        };
        EventEmitter.prototype.once = function (type, fn, context) {
            var _this = this;
            if (context === void 0) { context = this; }
            this.hasType(type);
            var magic = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.off(type, magic);
                var ret = fn.apply(context, args);
                if (ret === true) {
                    return ret;
                }
            };
            magic.fn = fn;
            this.on(type, magic);
            return this;
        };
        EventEmitter.prototype.off = function (type, fn) {
            if (!type && !fn) {
                this.events = {};
                return this;
            }
            if (type) {
                this.hasType(type);
                if (!fn) {
                    this.events[type] = [];
                    return this;
                }
                var events = this.events[type];
                if (!events) {
                    return this;
                }
                var count = events.length;
                while (count--) {
                    if (events[count][0] === fn ||
                        (events[count][0] && events[count][0].fn === fn)) {
                        events.splice(count, 1);
                    }
                }
                return this;
            }
        };
        EventEmitter.prototype.trigger = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this.hasType(type);
            var events = this.events[type];
            if (!events) {
                return;
            }
            var len = events.length;
            var eventsCopy = __spreadArrays(events);
            var ret;
            for (var i = 0; i < len; i++) {
                var event_1 = eventsCopy[i];
                var fn = event_1[0], context = event_1[1];
                if (fn) {
                    ret = fn.apply(context, args);
                    if (ret === true) {
                        return ret;
                    }
                }
            }
        };
        EventEmitter.prototype.registerType = function (names) {
            var _this = this;
            names.forEach(function (type) {
                _this.eventTypes[type] = type;
            });
        };
        EventEmitter.prototype.destroy = function () {
            this.events = {};
            this.eventTypes = {};
        };
        EventEmitter.prototype.hasType = function (type) {
            var types = this.eventTypes;
            var isType = types[type] === type;
            if (!isType) {
                warn("EventEmitter has used unknown event type: \"" + type + "\", should be oneof [" +
                    ("" + Object.keys(types).map(function (_) { return JSON.stringify(_); })) +
                    "]");
            }
        };
        return EventEmitter;
    }());
    var EventRegister = /** @class */ (function () {
        function EventRegister(wrapper, events) {
            this.wrapper = wrapper;
            this.events = events;
            this.addDOMEvents();
        }
        EventRegister.prototype.destroy = function () {
            this.removeDOMEvents();
            this.events = [];
        };
        EventRegister.prototype.addDOMEvents = function () {
            this.handleDOMEvents(addEvent);
        };
        EventRegister.prototype.removeDOMEvents = function () {
            this.handleDOMEvents(removeEvent);
        };
        EventRegister.prototype.handleDOMEvents = function (eventOperation) {
            var _this = this;
            var wrapper = this.wrapper;
            this.events.forEach(function (event) {
                eventOperation(wrapper, event.name, _this, !!event.capture);
            });
        };
        EventRegister.prototype.handleEvent = function (e) {
            var eventType = e.type;
            this.events.some(function (event) {
                if (event.name === eventType) {
                    event.handler(e);
                    return true;
                }
                return false;
            });
        };
        return EventRegister;
    }());

    var CustomOptions = /** @class */ (function () {
        function CustomOptions() {
        }
        return CustomOptions;
    }());
    var OptionsConstructor = /** @class */ (function (_super) {
        __extends(OptionsConstructor, _super);
        function OptionsConstructor() {
            var _this = _super.call(this) || this;
            _this.startX = 0;
            _this.startY = 0;
            _this.scrollX = false;
            _this.scrollY = true;
            _this.freeScroll = false;
            _this.directionLockThreshold = 0;
            _this.eventPassthrough = "" /* None */;
            _this.click = false;
            _this.dblclick = false;
            _this.tap = '';
            _this.bounce = {
                top: true,
                bottom: true,
                left: true,
                right: true,
            };
            _this.bounceTime = 800;
            _this.momentum = true;
            _this.momentumLimitTime = 300;
            _this.momentumLimitDistance = 15;
            _this.swipeTime = 2500;
            _this.swipeBounceTime = 500;
            _this.deceleration = 0.0015;
            _this.flickLimitTime = 200;
            _this.flickLimitDistance = 100;
            _this.resizePolling = 60;
            _this.probeType = 0 /* Default */;
            _this.stopPropagation = false;
            _this.preventDefault = true;
            _this.preventDefaultException = {
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/,
            };
            _this.tagException = {
                tagName: /^TEXTAREA$/,
            };
            _this.HWCompositing = true;
            _this.useTransition = true;
            _this.bindToWrapper = false;
            _this.bindToTarget = false;
            _this.disableMouse = hasTouch;
            _this.disableTouch = !hasTouch;
            _this.autoBlur = true;
            _this.autoEndDistance = 5;
            _this.outOfBoundaryDampingFactor = 1 / 3;
            _this.specifiedIndexAsContent = 0;
            _this.quadrant = 1 /* First */;
            return _this;
        }
        OptionsConstructor.prototype.merge = function (options) {
            if (!options)
                return this;
            for (var key in options) {
                if (key === 'bounce') {
                    this.bounce = this.resolveBounce(options[key]);
                    continue;
                }
                this[key] = options[key];
            }
            return this;
        };
        OptionsConstructor.prototype.process = function () {
            this.translateZ =
                this.HWCompositing && hasPerspective ? ' translateZ(1px)' : '';
            this.useTransition = this.useTransition && hasTransition;
            this.preventDefault = !this.eventPassthrough && this.preventDefault;
            // If you want eventPassthrough I have to lock one of the axes
            this.scrollX =
                this.eventPassthrough === "horizontal" /* Horizontal */
                    ? false
                    : this.scrollX;
            this.scrollY =
                this.eventPassthrough === "vertical" /* Vertical */ ? false : this.scrollY;
            // With eventPassthrough we also need lockDirection mechanism
            this.freeScroll = this.freeScroll && !this.eventPassthrough;
            // force true when freeScroll is true
            this.scrollX = this.freeScroll ? true : this.scrollX;
            this.scrollY = this.freeScroll ? true : this.scrollY;
            this.directionLockThreshold = this.eventPassthrough
                ? 0
                : this.directionLockThreshold;
            return this;
        };
        OptionsConstructor.prototype.resolveBounce = function (bounceOptions) {
            var DEFAULT_BOUNCE = {
                top: true,
                right: true,
                bottom: true,
                left: true,
            };
            var NEGATED_BOUNCE = {
                top: false,
                right: false,
                bottom: false,
                left: false,
            };
            var ret;
            if (typeof bounceOptions === 'object') {
                ret = extend(DEFAULT_BOUNCE, bounceOptions);
            }
            else {
                ret = bounceOptions ? DEFAULT_BOUNCE : NEGATED_BOUNCE;
            }
            return ret;
        };
        return OptionsConstructor;
    }(CustomOptions));

    var ActionsHandler = /** @class */ (function () {
        function ActionsHandler(wrapper, options) {
            this.wrapper = wrapper;
            this.options = options;
            this.hooks = new EventEmitter([
                'beforeStart',
                'start',
                'move',
                'end',
                'click',
            ]);
            this.handleDOMEvents();
        }
        ActionsHandler.prototype.handleDOMEvents = function () {
            var _a = this.options, bindToWrapper = _a.bindToWrapper, disableMouse = _a.disableMouse, disableTouch = _a.disableTouch, click = _a.click;
            var wrapper = this.wrapper;
            var target = bindToWrapper ? wrapper : window;
            var wrapperEvents = [];
            var targetEvents = [];
            var shouldRegisterTouch = !disableTouch;
            var shouldRegisterMouse = !disableMouse;
            if (click) {
                wrapperEvents.push({
                    name: 'click',
                    handler: this.click.bind(this),
                    capture: true,
                });
            }
            if (shouldRegisterTouch) {
                wrapperEvents.push({
                    name: 'touchstart',
                    handler: this.start.bind(this),
                });
                targetEvents.push({
                    name: 'touchmove',
                    handler: this.move.bind(this),
                }, {
                    name: 'touchend',
                    handler: this.end.bind(this),
                }, {
                    name: 'touchcancel',
                    handler: this.end.bind(this),
                });
            }
            if (shouldRegisterMouse) {
                wrapperEvents.push({
                    name: 'mousedown',
                    handler: this.start.bind(this),
                });
                targetEvents.push({
                    name: 'mousemove',
                    handler: this.move.bind(this),
                }, {
                    name: 'mouseup',
                    handler: this.end.bind(this),
                });
            }
            this.wrapperEventRegister = new EventRegister(wrapper, wrapperEvents);
            this.targetEventRegister = new EventRegister(target, targetEvents);
        };
        ActionsHandler.prototype.beforeHandler = function (e, type) {
            var _a = this.options, preventDefault = _a.preventDefault, stopPropagation = _a.stopPropagation, preventDefaultException = _a.preventDefaultException;
            var preventDefaultConditions = {
                start: function () {
                    return (preventDefault &&
                        !preventDefaultExceptionFn(e.target, preventDefaultException));
                },
                end: function () {
                    return (preventDefault &&
                        !preventDefaultExceptionFn(e.target, preventDefaultException));
                },
                move: function () {
                    return preventDefault;
                },
            };
            if (preventDefaultConditions[type]()) {
                e.preventDefault();
            }
            if (stopPropagation) {
                e.stopPropagation();
            }
        };
        ActionsHandler.prototype.setInitiated = function (type) {
            if (type === void 0) { type = 0; }
            this.initiated = type;
        };
        ActionsHandler.prototype.start = function (e) {
            var _eventType = eventTypeMap[e.type];
            if (this.initiated && this.initiated !== _eventType) {
                return;
            }
            this.setInitiated(_eventType);
            // if textarea or other html tags in options.tagException is manipulated
            // do not make bs scroll
            if (tagExceptionFn(e.target, this.options.tagException)) {
                this.setInitiated();
                return;
            }
            // only allow mouse left button
            if (_eventType === 2 /* Mouse */ && e.button !== 0 /* Left */)
                return;
            if (this.hooks.trigger(this.hooks.eventTypes.beforeStart, e)) {
                return;
            }
            this.beforeHandler(e, 'start');
            var point = (e.touches ? e.touches[0] : e);
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            this.hooks.trigger(this.hooks.eventTypes.start, e);
        };
        ActionsHandler.prototype.move = function (e) {
            if (eventTypeMap[e.type] !== this.initiated) {
                return;
            }
            this.beforeHandler(e, 'move');
            var point = (e.touches ? e.touches[0] : e);
            var deltaX = point.pageX - this.pointX;
            var deltaY = point.pageY - this.pointY;
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            if (this.hooks.trigger(this.hooks.eventTypes.move, {
                deltaX: deltaX,
                deltaY: deltaY,
                e: e,
            })) {
                return;
            }
            // auto end when out of viewport
            var scrollLeft = document.documentElement.scrollLeft ||
                window.pageXOffset ||
                document.body.scrollLeft;
            var scrollTop = document.documentElement.scrollTop ||
                window.pageYOffset ||
                document.body.scrollTop;
            var pX = this.pointX - scrollLeft;
            var pY = this.pointY - scrollTop;
            var autoEndDistance = this.options.autoEndDistance;
            if (pX > document.documentElement.clientWidth - autoEndDistance ||
                pY > document.documentElement.clientHeight - autoEndDistance ||
                pX < autoEndDistance ||
                pY < autoEndDistance) {
                this.end(e);
            }
        };
        ActionsHandler.prototype.end = function (e) {
            if (eventTypeMap[e.type] !== this.initiated) {
                return;
            }
            this.setInitiated();
            this.beforeHandler(e, 'end');
            this.hooks.trigger(this.hooks.eventTypes.end, e);
        };
        ActionsHandler.prototype.click = function (e) {
            this.hooks.trigger(this.hooks.eventTypes.click, e);
        };
        ActionsHandler.prototype.setContent = function (content) {
            if (content !== this.wrapper) {
                this.wrapper = content;
                this.rebindDOMEvents();
            }
        };
        ActionsHandler.prototype.rebindDOMEvents = function () {
            this.wrapperEventRegister.destroy();
            this.targetEventRegister.destroy();
            this.handleDOMEvents();
        };
        ActionsHandler.prototype.destroy = function () {
            this.wrapperEventRegister.destroy();
            this.targetEventRegister.destroy();
            this.hooks.destroy();
        };
        return ActionsHandler;
    }());

    var translaterMetaData = {
        x: ['translateX', 'px'],
        y: ['translateY', 'px'],
    };
    var Translater = /** @class */ (function () {
        function Translater(content) {
            this.setContent(content);
            this.hooks = new EventEmitter(['beforeTranslate', 'translate']);
        }
        Translater.prototype.getComputedPosition = function () {
            var cssStyle = window.getComputedStyle(this.content, null);
            var matrix = cssStyle[style.transform].split(')')[0].split(', ');
            var x = +(matrix[12] || matrix[4]) || 0;
            var y = +(matrix[13] || matrix[5]) || 0;
            return {
                x: x,
                y: y,
            };
        };
        Translater.prototype.translate = function (point) {
            var transformStyle = [];
            Object.keys(point).forEach(function (key) {
                if (!translaterMetaData[key]) {
                    return;
                }
                var transformFnName = translaterMetaData[key][0];
                if (transformFnName) {
                    var transformFnArgUnit = translaterMetaData[key][1];
                    var transformFnArg = point[key];
                    transformStyle.push(transformFnName + "(" + transformFnArg + transformFnArgUnit + ")");
                }
            });
            this.hooks.trigger(this.hooks.eventTypes.beforeTranslate, transformStyle, point);
            this.style[style.transform] = transformStyle.join(' ');
            this.hooks.trigger(this.hooks.eventTypes.translate, point);
        };
        Translater.prototype.setContent = function (content) {
            if (this.content !== content) {
                this.content = content;
                this.style = content.style;
            }
        };
        Translater.prototype.destroy = function () {
            this.hooks.destroy();
        };
        return Translater;
    }());

    var Base = /** @class */ (function () {
        function Base(content, translater, options) {
            this.translater = translater;
            this.options = options;
            this.timer = 0;
            this.hooks = new EventEmitter([
                'move',
                'end',
                'beforeForceStop',
                'forceStop',
                'callStop',
                'time',
                'timeFunction',
            ]);
            this.setContent(content);
        }
        Base.prototype.translate = function (endPoint) {
            this.translater.translate(endPoint);
        };
        Base.prototype.setPending = function (pending) {
            this.pending = pending;
        };
        Base.prototype.setForceStopped = function (forceStopped) {
            this.forceStopped = forceStopped;
        };
        Base.prototype.setCallStop = function (called) {
            this.callStopWhenPending = called;
        };
        Base.prototype.setContent = function (content) {
            if (this.content !== content) {
                this.content = content;
                this.style = content.style;
                this.stop();
            }
        };
        Base.prototype.clearTimer = function () {
            if (this.timer) {
                cancelAnimationFrame(this.timer);
                this.timer = 0;
            }
        };
        Base.prototype.destroy = function () {
            this.hooks.destroy();
            cancelAnimationFrame(this.timer);
        };
        return Base;
    }());

    // iOS 13.6 - 14.x, window.getComputedStyle sometimes will get wrong transform value
    // when bs use transition mode
    // eg: translateY -100px -> -200px, when the last frame which is about to scroll to -200px
    // window.getComputedStyle(this.content) will calculate transformY to be -100px(startPoint)
    // it is weird
    // so we should validate position caculated by 'window.getComputedStyle'
    var isValidPostion = function (startPoint, endPoint, currentPos, prePos) {
        var computeDirection = function (endValue, startValue) {
            var delta = endValue - startValue;
            var direction = delta > 0
                ? -1 /* Negative */
                : delta < 0
                    ? 1 /* Positive */
                    : 0 /* Default */;
            return direction;
        };
        var directionX = computeDirection(endPoint.x, startPoint.x);
        var directionY = computeDirection(endPoint.y, startPoint.y);
        var deltaX = currentPos.x - prePos.x;
        var deltaY = currentPos.y - prePos.y;
        return directionX * deltaX <= 0 && directionY * deltaY <= 0;
    };

    var Transition = /** @class */ (function (_super) {
        __extends(Transition, _super);
        function Transition() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Transition.prototype.startProbe = function (startPoint, endPoint) {
            var _this = this;
            var prePos = startPoint;
            var probe = function () {
                var pos = _this.translater.getComputedPosition();
                if (isValidPostion(startPoint, endPoint, pos, prePos)) {
                    _this.hooks.trigger(_this.hooks.eventTypes.move, pos);
                }
                // call bs.stop() should not dispatch end hook again.
                // forceStop hook will do this.
                /* istanbul ignore if  */
                if (!_this.pending) {
                    if (_this.callStopWhenPending) {
                        _this.callStopWhenPending = false;
                    }
                    else {
                        // transition ends should dispatch end hook.
                        _this.hooks.trigger(_this.hooks.eventTypes.end, pos);
                    }
                }
                prePos = pos;
                if (_this.pending) {
                    _this.timer = requestAnimationFrame(probe);
                }
            };
            // when manually call bs.stop(), then bs.scrollTo()
            // we should reset callStopWhenPending to dispatch end hook
            if (this.callStopWhenPending) {
                this.setCallStop(false);
            }
            cancelAnimationFrame(this.timer);
            probe();
        };
        Transition.prototype.transitionTime = function (time) {
            if (time === void 0) { time = 0; }
            this.style[style.transitionDuration] = time + 'ms';
            this.hooks.trigger(this.hooks.eventTypes.time, time);
        };
        Transition.prototype.transitionTimingFunction = function (easing) {
            this.style[style.transitionTimingFunction] = easing;
            this.hooks.trigger(this.hooks.eventTypes.timeFunction, easing);
        };
        Transition.prototype.transitionProperty = function () {
            this.style[style.transitionProperty] = style.transform;
        };
        Transition.prototype.move = function (startPoint, endPoint, time, easingFn) {
            this.setPending(time > 0);
            this.transitionTimingFunction(easingFn);
            this.transitionProperty();
            this.transitionTime(time);
            this.translate(endPoint);
            var isRealtimeProbeType = this.options.probeType === 3 /* Realtime */;
            if (time && isRealtimeProbeType) {
                this.startProbe(startPoint, endPoint);
            }
            // if we change content's transformY in a tick
            // such as: 0 -> 50px -> 0
            // transitionend will not be triggered
            // so we forceupdate by reflow
            if (!time) {
                this._reflow = this.content.offsetHeight;
                if (isRealtimeProbeType) {
                    this.hooks.trigger(this.hooks.eventTypes.move, endPoint);
                }
                this.hooks.trigger(this.hooks.eventTypes.end, endPoint);
            }
        };
        Transition.prototype.doStop = function () {
            var pending = this.pending;
            this.setForceStopped(false);
            this.setCallStop(false);
            // still in transition
            if (pending) {
                this.setPending(false);
                cancelAnimationFrame(this.timer);
                var _a = this.translater.getComputedPosition(), x = _a.x, y = _a.y;
                this.transitionTime();
                this.translate({ x: x, y: y });
                this.setForceStopped(true);
                this.setCallStop(true);
                this.hooks.trigger(this.hooks.eventTypes.forceStop, { x: x, y: y });
            }
            return pending;
        };
        Transition.prototype.stop = function () {
            var stopFromTransition = this.doStop();
            if (stopFromTransition) {
                this.hooks.trigger(this.hooks.eventTypes.callStop);
            }
        };
        return Transition;
    }(Base));

    var Animation = /** @class */ (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Animation.prototype.move = function (startPoint, endPoint, time, easingFn) {
            // time is 0
            if (!time) {
                this.translate(endPoint);
                if (this.options.probeType === 3 /* Realtime */) {
                    this.hooks.trigger(this.hooks.eventTypes.move, endPoint);
                }
                this.hooks.trigger(this.hooks.eventTypes.end, endPoint);
                return;
            }
            this.animate(startPoint, endPoint, time, easingFn);
        };
        Animation.prototype.animate = function (startPoint, endPoint, duration, easingFn) {
            var _this = this;
            var startTime = getNow();
            var destTime = startTime + duration;
            var isRealtimeProbeType = this.options.probeType === 3 /* Realtime */;
            var step = function () {
                var now = getNow();
                // js animation end
                if (now >= destTime) {
                    _this.translate(endPoint);
                    if (isRealtimeProbeType) {
                        _this.hooks.trigger(_this.hooks.eventTypes.move, endPoint);
                    }
                    _this.hooks.trigger(_this.hooks.eventTypes.end, endPoint);
                    return;
                }
                now = (now - startTime) / duration;
                var easing = easingFn(now);
                var newPoint = {};
                Object.keys(endPoint).forEach(function (key) {
                    var startValue = startPoint[key];
                    var endValue = endPoint[key];
                    newPoint[key] = (endValue - startValue) * easing + startValue;
                });
                _this.translate(newPoint);
                if (isRealtimeProbeType) {
                    _this.hooks.trigger(_this.hooks.eventTypes.move, newPoint);
                }
                if (_this.pending) {
                    _this.timer = requestAnimationFrame(step);
                }
                // call bs.stop() should not dispatch end hook again.
                // forceStop hook will do this.
                /* istanbul ignore if  */
                if (!_this.pending) {
                    if (_this.callStopWhenPending) {
                        _this.callStopWhenPending = false;
                    }
                    else {
                        // raf ends should dispatch end hook.
                        _this.hooks.trigger(_this.hooks.eventTypes.end, endPoint);
                    }
                }
            };
            this.setPending(true);
            // when manually call bs.stop(), then bs.scrollTo()
            // we should reset callStopWhenPending to dispatch end hook
            if (this.callStopWhenPending) {
                this.setCallStop(false);
            }
            cancelAnimationFrame(this.timer);
            step();
        };
        Animation.prototype.doStop = function () {
            var pending = this.pending;
            this.setForceStopped(false);
            this.setCallStop(false);
            // still in requestFrameAnimation
            if (pending) {
                this.setPending(false);
                cancelAnimationFrame(this.timer);
                var pos = this.translater.getComputedPosition();
                this.setForceStopped(true);
                this.setCallStop(true);
                this.hooks.trigger(this.hooks.eventTypes.forceStop, pos);
            }
            return pending;
        };
        Animation.prototype.stop = function () {
            var stopFromAnimation = this.doStop();
            if (stopFromAnimation) {
                this.hooks.trigger(this.hooks.eventTypes.callStop);
            }
        };
        return Animation;
    }(Base));

    function createAnimater(element, translater, options) {
        var useTransition = options.useTransition;
        var animaterOptions = {};
        Object.defineProperty(animaterOptions, 'probeType', {
            enumerable: true,
            configurable: false,
            get: function () {
                return options.probeType;
            },
        });
        if (useTransition) {
            return new Transition(element, translater, animaterOptions);
        }
        else {
            return new Animation(element, translater, animaterOptions);
        }
    }

    var Behavior = /** @class */ (function () {
        function Behavior(wrapper, content, options) {
            this.wrapper = wrapper;
            this.options = options;
            this.hooks = new EventEmitter([
                'beforeComputeBoundary',
                'computeBoundary',
                'momentum',
                'end',
                'ignoreHasScroll'
            ]);
            this.refresh(content);
        }
        Behavior.prototype.start = function () {
            this.dist = 0;
            this.setMovingDirection(0 /* Default */);
            this.setDirection(0 /* Default */);
        };
        Behavior.prototype.move = function (delta) {
            delta = this.hasScroll ? delta : 0;
            this.setMovingDirection(delta);
            return this.performDampingAlgorithm(delta, this.options.outOfBoundaryDampingFactor);
        };
        Behavior.prototype.setMovingDirection = function (delta) {
            this.movingDirection =
                delta > 0
                    ? -1 /* Negative */
                    : delta < 0
                        ? 1 /* Positive */
                        : 0 /* Default */;
        };
        Behavior.prototype.setDirection = function (delta) {
            this.direction =
                delta > 0
                    ? -1 /* Negative */
                    : delta < 0
                        ? 1 /* Positive */
                        : 0 /* Default */;
        };
        Behavior.prototype.performDampingAlgorithm = function (delta, dampingFactor) {
            var newPos = this.currentPos + delta;
            // Slow down or stop if outside of the boundaries
            if (newPos > this.minScrollPos || newPos < this.maxScrollPos) {
                if ((newPos > this.minScrollPos && this.options.bounces[0]) ||
                    (newPos < this.maxScrollPos && this.options.bounces[1])) {
                    newPos = this.currentPos + delta * dampingFactor;
                }
                else {
                    newPos =
                        newPos > this.minScrollPos ? this.minScrollPos : this.maxScrollPos;
                }
            }
            return newPos;
        };
        Behavior.prototype.end = function (duration) {
            var momentumInfo = {
                duration: 0
            };
            var absDist = Math.abs(this.currentPos - this.startPos);
            // start momentum animation if needed
            if (this.options.momentum &&
                duration < this.options.momentumLimitTime &&
                absDist > this.options.momentumLimitDistance) {
                var wrapperSize = (this.direction === -1 /* Negative */ && this.options.bounces[0]) ||
                    (this.direction === 1 /* Positive */ && this.options.bounces[1])
                    ? this.wrapperSize
                    : 0;
                momentumInfo = this.hasScroll
                    ? this.momentum(this.currentPos, this.startPos, duration, this.maxScrollPos, this.minScrollPos, wrapperSize, this.options)
                    : { destination: this.currentPos, duration: 0 };
            }
            else {
                this.hooks.trigger(this.hooks.eventTypes.end, momentumInfo);
            }
            return momentumInfo;
        };
        Behavior.prototype.momentum = function (current, start, time, lowerMargin, upperMargin, wrapperSize, options) {
            if (options === void 0) { options = this.options; }
            var distance = current - start;
            var speed = Math.abs(distance) / time;
            var deceleration = options.deceleration, swipeBounceTime = options.swipeBounceTime, swipeTime = options.swipeTime;
            var duration = Math.min(swipeTime, (speed * 2) / deceleration);
            var momentumData = {
                destination: current + ((speed * speed) / deceleration) * (distance < 0 ? -1 : 1),
                duration: duration,
                rate: 15
            };
            this.hooks.trigger(this.hooks.eventTypes.momentum, momentumData, distance);
            if (momentumData.destination < lowerMargin) {
                momentumData.destination = wrapperSize
                    ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - (wrapperSize / momentumData.rate) * speed)
                    : lowerMargin;
                momentumData.duration = swipeBounceTime;
            }
            else if (momentumData.destination > upperMargin) {
                momentumData.destination = wrapperSize
                    ? Math.min(upperMargin + wrapperSize / 4, upperMargin + (wrapperSize / momentumData.rate) * speed)
                    : upperMargin;
                momentumData.duration = swipeBounceTime;
            }
            momentumData.destination = Math.round(momentumData.destination);
            return momentumData;
        };
        Behavior.prototype.updateDirection = function () {
            var absDist = this.currentPos - this.absStartPos;
            this.setDirection(absDist);
        };
        Behavior.prototype.refresh = function (content) {
            var _a = this.options.rect, size = _a.size, position = _a.position;
            var isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === 'static';
            // Force reflow
            var wrapperRect = getRect(this.wrapper);
            // use client is more fair than offset
            this.wrapperSize = this.wrapper[size === 'width' ? 'clientWidth' : 'clientHeight'];
            this.setContent(content);
            var contentRect = getRect(this.content);
            this.contentSize = contentRect[size];
            this.relativeOffset = contentRect[position];
            /* istanbul ignore if  */
            if (isWrapperStatic) {
                this.relativeOffset -= wrapperRect[position];
            }
            this.computeBoundary();
            this.setDirection(0 /* Default */);
        };
        Behavior.prototype.setContent = function (content) {
            if (content !== this.content) {
                this.content = content;
                this.resetState();
            }
        };
        Behavior.prototype.resetState = function () {
            this.currentPos = 0;
            this.startPos = 0;
            this.dist = 0;
            this.setDirection(0 /* Default */);
            this.setMovingDirection(0 /* Default */);
            this.resetStartPos();
        };
        Behavior.prototype.computeBoundary = function () {
            this.hooks.trigger(this.hooks.eventTypes.beforeComputeBoundary);
            var boundary = {
                minScrollPos: 0,
                maxScrollPos: this.wrapperSize - this.contentSize
            };
            if (boundary.maxScrollPos < 0) {
                boundary.maxScrollPos -= this.relativeOffset;
                if (this.options.specifiedIndexAsContent === 0) {
                    boundary.minScrollPos = -this.relativeOffset;
                }
            }
            this.hooks.trigger(this.hooks.eventTypes.computeBoundary, boundary);
            this.minScrollPos = boundary.minScrollPos;
            this.maxScrollPos = boundary.maxScrollPos;
            this.hasScroll =
                this.options.scrollable && this.maxScrollPos < this.minScrollPos;
            if (!this.hasScroll && this.minScrollPos < this.maxScrollPos) {
                this.maxScrollPos = this.minScrollPos;
                this.contentSize = this.wrapperSize;
            }
        };
        Behavior.prototype.updatePosition = function (pos) {
            this.currentPos = pos;
        };
        Behavior.prototype.getCurrentPos = function () {
            return this.currentPos;
        };
        Behavior.prototype.checkInBoundary = function () {
            var position = this.adjustPosition(this.currentPos);
            var inBoundary = position === this.getCurrentPos();
            return {
                position: position,
                inBoundary: inBoundary
            };
        };
        // adjust position when out of boundary
        Behavior.prototype.adjustPosition = function (pos) {
            if (!this.hasScroll &&
                !this.hooks.trigger(this.hooks.eventTypes.ignoreHasScroll)) {
                pos = this.minScrollPos;
            }
            else if (pos > this.minScrollPos) {
                pos = this.minScrollPos;
            }
            else if (pos < this.maxScrollPos) {
                pos = this.maxScrollPos;
            }
            return pos;
        };
        Behavior.prototype.updateStartPos = function () {
            this.startPos = this.currentPos;
        };
        Behavior.prototype.updateAbsStartPos = function () {
            this.absStartPos = this.currentPos;
        };
        Behavior.prototype.resetStartPos = function () {
            this.updateStartPos();
            this.updateAbsStartPos();
        };
        Behavior.prototype.getAbsDist = function (delta) {
            this.dist += delta;
            return Math.abs(this.dist);
        };
        Behavior.prototype.destroy = function () {
            this.hooks.destroy();
        };
        return Behavior;
    }());

    var _a, _b, _c, _d;
    var PassthroughHandlers = (_a = {},
        _a["yes" /* Yes */] = function (e) {
            return true;
        },
        _a["no" /* No */] = function (e) {
            e.preventDefault();
            return false;
        },
        _a);
    var DirectionMap = (_b = {},
        _b["horizontal" /* Horizontal */] = (_c = {},
            _c["yes" /* Yes */] = "horizontal" /* Horizontal */,
            _c["no" /* No */] = "vertical" /* Vertical */,
            _c),
        _b["vertical" /* Vertical */] = (_d = {},
            _d["yes" /* Yes */] = "vertical" /* Vertical */,
            _d["no" /* No */] = "horizontal" /* Horizontal */,
            _d),
        _b);
    var DirectionLockAction = /** @class */ (function () {
        function DirectionLockAction(directionLockThreshold, freeScroll, eventPassthrough) {
            this.directionLockThreshold = directionLockThreshold;
            this.freeScroll = freeScroll;
            this.eventPassthrough = eventPassthrough;
            this.reset();
        }
        DirectionLockAction.prototype.reset = function () {
            this.directionLocked = "" /* Default */;
        };
        DirectionLockAction.prototype.checkMovingDirection = function (absDistX, absDistY, e) {
            this.computeDirectionLock(absDistX, absDistY);
            return this.handleEventPassthrough(e);
        };
        DirectionLockAction.prototype.adjustDelta = function (deltaX, deltaY) {
            if (this.directionLocked === "horizontal" /* Horizontal */) {
                deltaY = 0;
            }
            else if (this.directionLocked === "vertical" /* Vertical */) {
                deltaX = 0;
            }
            return {
                deltaX: deltaX,
                deltaY: deltaY
            };
        };
        DirectionLockAction.prototype.computeDirectionLock = function (absDistX, absDistY) {
            // If you are scrolling in one direction, lock it
            if (this.directionLocked === "" /* Default */ && !this.freeScroll) {
                if (absDistX > absDistY + this.directionLockThreshold) {
                    this.directionLocked = "horizontal" /* Horizontal */; // lock horizontally
                }
                else if (absDistY >= absDistX + this.directionLockThreshold) {
                    this.directionLocked = "vertical" /* Vertical */; // lock vertically
                }
                else {
                    this.directionLocked = "none" /* None */; // no lock
                }
            }
        };
        DirectionLockAction.prototype.handleEventPassthrough = function (e) {
            var handleMap = DirectionMap[this.directionLocked];
            if (handleMap) {
                if (this.eventPassthrough === handleMap["yes" /* Yes */]) {
                    return PassthroughHandlers["yes" /* Yes */](e);
                }
                else if (this.eventPassthrough === handleMap["no" /* No */]) {
                    return PassthroughHandlers["no" /* No */](e);
                }
            }
            return false;
        };
        return DirectionLockAction;
    }());

    var applyQuadrantTransformation = function (deltaX, deltaY, quadrant) {
        if (quadrant === 2 /* Second */) {
            return [deltaY, -deltaX];
        }
        else if (quadrant === 3 /* Third */) {
            return [-deltaX, -deltaY];
        }
        else if (quadrant === 4 /* Forth */) {
            return [-deltaY, deltaX];
        }
        else {
            return [deltaX, deltaY];
        }
    };
    var ScrollerActions = /** @class */ (function () {
        function ScrollerActions(scrollBehaviorX, scrollBehaviorY, actionsHandler, animater, options) {
            this.hooks = new EventEmitter([
                'start',
                'beforeMove',
                'scrollStart',
                'scroll',
                'beforeEnd',
                'end',
                'scrollEnd',
                'contentNotMoved',
                'detectMovingDirection',
                'coordinateTransformation',
            ]);
            this.scrollBehaviorX = scrollBehaviorX;
            this.scrollBehaviorY = scrollBehaviorY;
            this.actionsHandler = actionsHandler;
            this.animater = animater;
            this.options = options;
            this.directionLockAction = new DirectionLockAction(options.directionLockThreshold, options.freeScroll, options.eventPassthrough);
            this.enabled = true;
            this.bindActionsHandler();
        }
        ScrollerActions.prototype.bindActionsHandler = function () {
            var _this = this;
            // [mouse|touch]start event
            this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.start, function (e) {
                if (!_this.enabled)
                    return true;
                return _this.handleStart(e);
            });
            // [mouse|touch]move event
            this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.move, function (_a) {
                var deltaX = _a.deltaX, deltaY = _a.deltaY, e = _a.e;
                if (!_this.enabled)
                    return true;
                var _b = applyQuadrantTransformation(deltaX, deltaY, _this.options.quadrant), transformateDeltaX = _b[0], transformateDeltaY = _b[1];
                var transformateDeltaData = {
                    deltaX: transformateDeltaX,
                    deltaY: transformateDeltaY,
                };
                _this.hooks.trigger(_this.hooks.eventTypes.coordinateTransformation, transformateDeltaData);
                return _this.handleMove(transformateDeltaData.deltaX, transformateDeltaData.deltaY, e);
            });
            // [mouse|touch]end event
            this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.end, function (e) {
                if (!_this.enabled)
                    return true;
                return _this.handleEnd(e);
            });
            // click
            this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.click, function (e) {
                // handle native click event
                if (_this.enabled && !e._constructed) {
                    _this.handleClick(e);
                }
            });
        };
        ScrollerActions.prototype.handleStart = function (e) {
            var timestamp = getNow();
            this.fingerMoved = false;
            this.contentMoved = false;
            this.startTime = timestamp;
            this.directionLockAction.reset();
            this.scrollBehaviorX.start();
            this.scrollBehaviorY.start();
            // force stopping last transition or animation
            this.animater.doStop();
            this.scrollBehaviorX.resetStartPos();
            this.scrollBehaviorY.resetStartPos();
            this.hooks.trigger(this.hooks.eventTypes.start, e);
        };
        ScrollerActions.prototype.handleMove = function (deltaX, deltaY, e) {
            if (this.hooks.trigger(this.hooks.eventTypes.beforeMove, e)) {
                return;
            }
            var absDistX = this.scrollBehaviorX.getAbsDist(deltaX);
            var absDistY = this.scrollBehaviorY.getAbsDist(deltaY);
            var timestamp = getNow();
            // We need to move at least momentumLimitDistance pixels
            // for the scrolling to initiate
            if (this.checkMomentum(absDistX, absDistY, timestamp)) {
                return true;
            }
            if (this.directionLockAction.checkMovingDirection(absDistX, absDistY, e)) {
                this.actionsHandler.setInitiated();
                return true;
            }
            var delta = this.directionLockAction.adjustDelta(deltaX, deltaY);
            var prevX = this.scrollBehaviorX.getCurrentPos();
            var newX = this.scrollBehaviorX.move(delta.deltaX);
            var prevY = this.scrollBehaviorY.getCurrentPos();
            var newY = this.scrollBehaviorY.move(delta.deltaY);
            if (this.hooks.trigger(this.hooks.eventTypes.detectMovingDirection)) {
                return;
            }
            if (!this.fingerMoved) {
                this.fingerMoved = true;
            }
            var positionChanged = newX !== prevX || newY !== prevY;
            if (!this.contentMoved && !positionChanged) {
                this.hooks.trigger(this.hooks.eventTypes.contentNotMoved);
            }
            if (!this.contentMoved && positionChanged) {
                this.contentMoved = true;
                this.hooks.trigger(this.hooks.eventTypes.scrollStart);
            }
            if (this.contentMoved && positionChanged) {
                this.animater.translate({
                    x: newX,
                    y: newY,
                });
                this.dispatchScroll(timestamp);
            }
        };
        ScrollerActions.prototype.dispatchScroll = function (timestamp) {
            // dispatch scroll in interval time
            if (timestamp - this.startTime > this.options.momentumLimitTime) {
                // refresh time and starting position to initiate a momentum
                this.startTime = timestamp;
                this.scrollBehaviorX.updateStartPos();
                this.scrollBehaviorY.updateStartPos();
                if (this.options.probeType === 1 /* Throttle */) {
                    this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
                }
            }
            // dispatch scroll all the time
            if (this.options.probeType > 1 /* Throttle */) {
                this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
            }
        };
        ScrollerActions.prototype.checkMomentum = function (absDistX, absDistY, timestamp) {
            return (timestamp - this.endTime > this.options.momentumLimitTime &&
                absDistY < this.options.momentumLimitDistance &&
                absDistX < this.options.momentumLimitDistance);
        };
        ScrollerActions.prototype.handleEnd = function (e) {
            if (this.hooks.trigger(this.hooks.eventTypes.beforeEnd, e)) {
                return;
            }
            var currentPos = this.getCurrentPos();
            this.scrollBehaviorX.updateDirection();
            this.scrollBehaviorY.updateDirection();
            if (this.hooks.trigger(this.hooks.eventTypes.end, e, currentPos)) {
                return true;
            }
            currentPos = this.ensureIntegerPos(currentPos);
            this.animater.translate(currentPos);
            this.endTime = getNow();
            var duration = this.endTime - this.startTime;
            this.hooks.trigger(this.hooks.eventTypes.scrollEnd, currentPos, duration);
        };
        ScrollerActions.prototype.ensureIntegerPos = function (currentPos) {
            this.ensuringInteger = true;
            var x = currentPos.x, y = currentPos.y;
            var _a = this.scrollBehaviorX, minScrollPosX = _a.minScrollPos, maxScrollPosX = _a.maxScrollPos;
            var _b = this.scrollBehaviorY, minScrollPosY = _b.minScrollPos, maxScrollPosY = _b.maxScrollPos;
            x = x > 0 ? Math.ceil(x) : Math.floor(x);
            y = y > 0 ? Math.ceil(y) : Math.floor(y);
            x = between(x, maxScrollPosX, minScrollPosX);
            y = between(y, maxScrollPosY, minScrollPosY);
            return { x: x, y: y };
        };
        ScrollerActions.prototype.handleClick = function (e) {
            if (!preventDefaultExceptionFn(e.target, this.options.preventDefaultException)) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        ScrollerActions.prototype.getCurrentPos = function () {
            return {
                x: this.scrollBehaviorX.getCurrentPos(),
                y: this.scrollBehaviorY.getCurrentPos(),
            };
        };
        ScrollerActions.prototype.refresh = function () {
            this.endTime = 0;
        };
        ScrollerActions.prototype.destroy = function () {
            this.hooks.destroy();
        };
        return ScrollerActions;
    }());

    function createActionsHandlerOptions(bsOptions) {
        var options = [
            'click',
            'bindToWrapper',
            'disableMouse',
            'disableTouch',
            'preventDefault',
            'stopPropagation',
            'tagException',
            'preventDefaultException',
            'autoEndDistance',
        ].reduce(function (prev, cur) {
            prev[cur] = bsOptions[cur];
            return prev;
        }, {});
        return options;
    }
    function createBehaviorOptions(bsOptions, extraProp, bounces, rect) {
        var options = [
            'momentum',
            'momentumLimitTime',
            'momentumLimitDistance',
            'deceleration',
            'swipeBounceTime',
            'swipeTime',
            'outOfBoundaryDampingFactor',
            'specifiedIndexAsContent',
        ].reduce(function (prev, cur) {
            prev[cur] = bsOptions[cur];
            return prev;
        }, {});
        // add extra property
        options.scrollable = !!bsOptions[extraProp];
        options.bounces = bounces;
        options.rect = rect;
        return options;
    }

    function bubbling(source, target, events) {
        events.forEach(function (event) {
            var sourceEvent;
            var targetEvent;
            if (typeof event === 'string') {
                sourceEvent = targetEvent = event;
            }
            else {
                sourceEvent = event.source;
                targetEvent = event.target;
            }
            source.on(sourceEvent, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return target.trigger.apply(target, __spreadArrays([targetEvent], args));
            });
        });
    }

    function isSamePoint(startPoint, endPoint) {
        // keys of startPoint and endPoint should be equal
        var keys = Object.keys(startPoint);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (startPoint[key] !== endPoint[key])
                return false;
        }
        return true;
    }

    var MIN_SCROLL_DISTANCE = 1;
    var Scroller = /** @class */ (function () {
        function Scroller(wrapper, content, options) {
            this.wrapper = wrapper;
            this.content = content;
            this.resizeTimeout = 0;
            this.hooks = new EventEmitter([
                'beforeStart',
                'beforeMove',
                'beforeScrollStart',
                'scrollStart',
                'scroll',
                'beforeEnd',
                'scrollEnd',
                'resize',
                'touchEnd',
                'end',
                'flick',
                'scrollCancel',
                'momentum',
                'scrollTo',
                'minDistanceScroll',
                'scrollToElement',
                'beforeRefresh',
            ]);
            this.options = options;
            var _a = this.options.bounce, left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
            // direction X
            this.scrollBehaviorX = new Behavior(wrapper, content, createBehaviorOptions(options, 'scrollX', [left, right], {
                size: 'width',
                position: 'left',
            }));
            // direction Y
            this.scrollBehaviorY = new Behavior(wrapper, content, createBehaviorOptions(options, 'scrollY', [top, bottom], {
                size: 'height',
                position: 'top',
            }));
            this.translater = new Translater(this.content);
            this.animater = createAnimater(this.content, this.translater, this.options);
            this.actionsHandler = new ActionsHandler(this.options.bindToTarget ? this.content : wrapper, createActionsHandlerOptions(this.options));
            this.actions = new ScrollerActions(this.scrollBehaviorX, this.scrollBehaviorY, this.actionsHandler, this.animater, this.options);
            var resizeHandler = this.resize.bind(this);
            this.resizeRegister = new EventRegister(window, [
                {
                    name: 'orientationchange',
                    handler: resizeHandler,
                },
                {
                    name: 'resize',
                    handler: resizeHandler,
                },
            ]);
            this.registerTransitionEnd();
            this.init();
        }
        Scroller.prototype.init = function () {
            var _this = this;
            this.bindTranslater();
            this.bindAnimater();
            this.bindActions();
            // enable pointer events when scrolling ends
            this.hooks.on(this.hooks.eventTypes.scrollEnd, function () {
                _this.togglePointerEvents(true);
            });
        };
        Scroller.prototype.registerTransitionEnd = function () {
            this.transitionEndRegister = new EventRegister(this.content, [
                {
                    name: style.transitionEnd,
                    handler: this.transitionEnd.bind(this),
                },
            ]);
        };
        Scroller.prototype.bindTranslater = function () {
            var _this = this;
            var hooks = this.translater.hooks;
            hooks.on(hooks.eventTypes.beforeTranslate, function (transformStyle) {
                if (_this.options.translateZ) {
                    transformStyle.push(_this.options.translateZ);
                }
            });
            // disable pointer events when scrolling
            hooks.on(hooks.eventTypes.translate, function (pos) {
                var prevPos = _this.getCurrentPos();
                _this.updatePositions(pos);
                // scrollEnd will dispatch when scroll is force stopping in touchstart handler
                // so in touchend handler, don't toggle pointer-events
                if (_this.actions.ensuringInteger === true) {
                    _this.actions.ensuringInteger = false;
                    return;
                }
                // a valid translate
                if (pos.x !== prevPos.x || pos.y !== prevPos.y) {
                    _this.togglePointerEvents(false);
                }
            });
        };
        Scroller.prototype.bindAnimater = function () {
            var _this = this;
            // reset position
            this.animater.hooks.on(this.animater.hooks.eventTypes.end, function (pos) {
                if (!_this.resetPosition(_this.options.bounceTime)) {
                    _this.animater.setPending(false);
                    _this.hooks.trigger(_this.hooks.eventTypes.scrollEnd, pos);
                }
            });
            bubbling(this.animater.hooks, this.hooks, [
                {
                    source: this.animater.hooks.eventTypes.move,
                    target: this.hooks.eventTypes.scroll,
                },
                {
                    source: this.animater.hooks.eventTypes.forceStop,
                    target: this.hooks.eventTypes.scrollEnd,
                },
            ]);
        };
        Scroller.prototype.bindActions = function () {
            var _this = this;
            var actions = this.actions;
            bubbling(actions.hooks, this.hooks, [
                {
                    source: actions.hooks.eventTypes.start,
                    target: this.hooks.eventTypes.beforeStart,
                },
                {
                    source: actions.hooks.eventTypes.start,
                    target: this.hooks.eventTypes.beforeScrollStart,
                },
                {
                    source: actions.hooks.eventTypes.beforeMove,
                    target: this.hooks.eventTypes.beforeMove,
                },
                {
                    source: actions.hooks.eventTypes.scrollStart,
                    target: this.hooks.eventTypes.scrollStart,
                },
                {
                    source: actions.hooks.eventTypes.scroll,
                    target: this.hooks.eventTypes.scroll,
                },
                {
                    source: actions.hooks.eventTypes.beforeEnd,
                    target: this.hooks.eventTypes.beforeEnd,
                },
            ]);
            actions.hooks.on(actions.hooks.eventTypes.end, function (e, pos) {
                _this.hooks.trigger(_this.hooks.eventTypes.touchEnd, pos);
                if (_this.hooks.trigger(_this.hooks.eventTypes.end, pos)) {
                    return true;
                }
                // check if it is a click operation
                if (!actions.fingerMoved) {
                    _this.hooks.trigger(_this.hooks.eventTypes.scrollCancel);
                    if (_this.checkClick(e)) {
                        return true;
                    }
                }
                // reset if we are outside of the boundaries
                if (_this.resetPosition(_this.options.bounceTime, ease.bounce)) {
                    _this.animater.setForceStopped(false);
                    return true;
                }
            });
            actions.hooks.on(actions.hooks.eventTypes.scrollEnd, function (pos, duration) {
                var deltaX = Math.abs(pos.x - _this.scrollBehaviorX.startPos);
                var deltaY = Math.abs(pos.y - _this.scrollBehaviorY.startPos);
                if (_this.checkFlick(duration, deltaX, deltaY)) {
                    _this.animater.setForceStopped(false);
                    _this.hooks.trigger(_this.hooks.eventTypes.flick);
                    return;
                }
                if (_this.momentum(pos, duration)) {
                    _this.animater.setForceStopped(false);
                    return;
                }
                if (actions.contentMoved) {
                    _this.hooks.trigger(_this.hooks.eventTypes.scrollEnd, pos);
                }
                if (_this.animater.forceStopped) {
                    _this.animater.setForceStopped(false);
                }
            });
        };
        Scroller.prototype.checkFlick = function (duration, deltaX, deltaY) {
            var flickMinMovingDistance = 1; // distinguish flick from click
            if (this.hooks.events.flick.length > 1 &&
                duration < this.options.flickLimitTime &&
                deltaX < this.options.flickLimitDistance &&
                deltaY < this.options.flickLimitDistance &&
                (deltaY > flickMinMovingDistance || deltaX > flickMinMovingDistance)) {
                return true;
            }
        };
        Scroller.prototype.momentum = function (pos, duration) {
            var meta = {
                time: 0,
                easing: ease.swiper,
                newX: pos.x,
                newY: pos.y,
            };
            // start momentum animation if needed
            var momentumX = this.scrollBehaviorX.end(duration);
            var momentumY = this.scrollBehaviorY.end(duration);
            meta.newX = isUndef(momentumX.destination)
                ? meta.newX
                : momentumX.destination;
            meta.newY = isUndef(momentumY.destination)
                ? meta.newY
                : momentumY.destination;
            meta.time = Math.max(momentumX.duration, momentumY.duration);
            this.hooks.trigger(this.hooks.eventTypes.momentum, meta, this);
            // when x or y changed, do momentum animation now!
            if (meta.newX !== pos.x || meta.newY !== pos.y) {
                // change easing function when scroller goes out of the boundaries
                if (meta.newX > this.scrollBehaviorX.minScrollPos ||
                    meta.newX < this.scrollBehaviorX.maxScrollPos ||
                    meta.newY > this.scrollBehaviorY.minScrollPos ||
                    meta.newY < this.scrollBehaviorY.maxScrollPos) {
                    meta.easing = ease.swipeBounce;
                }
                this.scrollTo(meta.newX, meta.newY, meta.time, meta.easing);
                return true;
            }
        };
        Scroller.prototype.checkClick = function (e) {
            var cancelable = {
                preventClick: this.animater.forceStopped,
            };
            // we scrolled less than momentumLimitDistance pixels
            if (this.hooks.trigger(this.hooks.eventTypes.checkClick)) {
                this.animater.setForceStopped(false);
                return true;
            }
            if (!cancelable.preventClick) {
                var _dblclick = this.options.dblclick;
                var dblclickTrigged = false;
                if (_dblclick && this.lastClickTime) {
                    var _a = _dblclick.delay, delay = _a === void 0 ? 300 : _a;
                    if (getNow() - this.lastClickTime < delay) {
                        dblclickTrigged = true;
                        dblclick(e);
                    }
                }
                if (this.options.tap) {
                    tap(e, this.options.tap);
                }
                if (this.options.click &&
                    !preventDefaultExceptionFn(e.target, this.options.preventDefaultException)) {
                    click(e);
                }
                this.lastClickTime = dblclickTrigged ? null : getNow();
                return true;
            }
            return false;
        };
        Scroller.prototype.resize = function () {
            var _this = this;
            if (!this.actions.enabled) {
                return;
            }
            // fix a scroll problem under Android condition
            /* istanbul ignore if  */
            if (isAndroid) {
                this.wrapper.scrollTop = 0;
            }
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = window.setTimeout(function () {
                _this.hooks.trigger(_this.hooks.eventTypes.resize);
            }, this.options.resizePolling);
        };
        /* istanbul ignore next */
        Scroller.prototype.transitionEnd = function (e) {
            if (e.target !== this.content || !this.animater.pending) {
                return;
            }
            var animater = this.animater;
            animater.transitionTime();
            if (!this.resetPosition(this.options.bounceTime, ease.bounce)) {
                this.animater.setPending(false);
                if (this.options.probeType !== 3 /* Realtime */) {
                    this.hooks.trigger(this.hooks.eventTypes.scrollEnd, this.getCurrentPos());
                }
            }
        };
        Scroller.prototype.togglePointerEvents = function (enabled) {
            if (enabled === void 0) { enabled = true; }
            var el = this.content.children.length
                ? this.content.children
                : [this.content];
            var pointerEvents = enabled ? 'auto' : 'none';
            for (var i = 0; i < el.length; i++) {
                var node = el[i];
                // ignore BetterScroll instance's wrapper DOM
                /* istanbul ignore if  */
                if (node.isBScrollContainer) {
                    continue;
                }
                node.style.pointerEvents = pointerEvents;
            }
        };
        Scroller.prototype.refresh = function (content) {
            var contentChanged = this.setContent(content);
            this.hooks.trigger(this.hooks.eventTypes.beforeRefresh);
            this.scrollBehaviorX.refresh(content);
            this.scrollBehaviorY.refresh(content);
            if (contentChanged) {
                this.translater.setContent(content);
                this.animater.setContent(content);
                this.transitionEndRegister.destroy();
                this.registerTransitionEnd();
                if (this.options.bindToTarget) {
                    this.actionsHandler.setContent(content);
                }
            }
            this.actions.refresh();
            this.wrapperOffset = offset(this.wrapper);
        };
        Scroller.prototype.setContent = function (content) {
            var contentChanged = content !== this.content;
            if (contentChanged) {
                this.content = content;
            }
            return contentChanged;
        };
        Scroller.prototype.scrollBy = function (deltaX, deltaY, time, easing) {
            if (time === void 0) { time = 0; }
            var _a = this.getCurrentPos(), x = _a.x, y = _a.y;
            easing = !easing ? ease.bounce : easing;
            deltaX += x;
            deltaY += y;
            this.scrollTo(deltaX, deltaY, time, easing);
        };
        Scroller.prototype.scrollTo = function (x, y, time, easing, extraTransform) {
            if (time === void 0) { time = 0; }
            if (easing === void 0) { easing = ease.bounce; }
            if (extraTransform === void 0) { extraTransform = {
                start: {},
                end: {},
            }; }
            var easingFn = this.options.useTransition ? easing.style : easing.fn;
            var currentPos = this.getCurrentPos();
            var startPoint = __assign({ x: currentPos.x, y: currentPos.y }, extraTransform.start);
            var endPoint = __assign({ x: x,
                y: y }, extraTransform.end);
            this.hooks.trigger(this.hooks.eventTypes.scrollTo, endPoint);
            // it is an useless move
            if (isSamePoint(startPoint, endPoint))
                return;
            var deltaX = Math.abs(endPoint.x - startPoint.x);
            var deltaY = Math.abs(endPoint.y - startPoint.y);
            // considering of browser compatibility for decimal transform value
            // force translating immediately
            if (deltaX < MIN_SCROLL_DISTANCE && deltaY < MIN_SCROLL_DISTANCE) {
                time = 0;
                this.hooks.trigger(this.hooks.eventTypes.minDistanceScroll);
            }
            this.animater.move(startPoint, endPoint, time, easingFn);
        };
        Scroller.prototype.scrollToElement = function (el, time, offsetX, offsetY, easing) {
            var targetEle = getElement(el);
            var pos = offset(targetEle);
            var getOffset = function (offset, size, wrapperSize) {
                if (typeof offset === 'number') {
                    return offset;
                }
                // if offsetX/Y are true we center the element to the screen
                return offset ? Math.round(size / 2 - wrapperSize / 2) : 0;
            };
            offsetX = getOffset(offsetX, targetEle.offsetWidth, this.wrapper.offsetWidth);
            offsetY = getOffset(offsetY, targetEle.offsetHeight, this.wrapper.offsetHeight);
            var getPos = function (pos, wrapperPos, offset, scrollBehavior) {
                pos -= wrapperPos;
                pos = scrollBehavior.adjustPosition(pos - offset);
                return pos;
            };
            pos.left = getPos(pos.left, this.wrapperOffset.left, offsetX, this.scrollBehaviorX);
            pos.top = getPos(pos.top, this.wrapperOffset.top, offsetY, this.scrollBehaviorY);
            if (this.hooks.trigger(this.hooks.eventTypes.scrollToElement, targetEle, pos)) {
                return;
            }
            this.scrollTo(pos.left, pos.top, time, easing);
        };
        Scroller.prototype.resetPosition = function (time, easing) {
            if (time === void 0) { time = 0; }
            if (easing === void 0) { easing = ease.bounce; }
            var _a = this.scrollBehaviorX.checkInBoundary(), x = _a.position, xInBoundary = _a.inBoundary;
            var _b = this.scrollBehaviorY.checkInBoundary(), y = _b.position, yInBoundary = _b.inBoundary;
            if (xInBoundary && yInBoundary) {
                return false;
            }
            /* istanbul ignore if  */
            if (isIOSBadVersion) {
                // fix ios 13.4 bouncing
                // see it in issues 982
                this.reflow();
            }
            // out of boundary
            this.scrollTo(x, y, time, easing);
            return true;
        };
        /* istanbul ignore next */
        Scroller.prototype.reflow = function () {
            this._reflow = this.content.offsetHeight;
        };
        Scroller.prototype.updatePositions = function (pos) {
            this.scrollBehaviorX.updatePosition(pos.x);
            this.scrollBehaviorY.updatePosition(pos.y);
        };
        Scroller.prototype.getCurrentPos = function () {
            return this.actions.getCurrentPos();
        };
        Scroller.prototype.enable = function () {
            this.actions.enabled = true;
        };
        Scroller.prototype.disable = function () {
            cancelAnimationFrame(this.animater.timer);
            this.actions.enabled = false;
        };
        Scroller.prototype.destroy = function () {
            var _this = this;
            var keys = [
                'resizeRegister',
                'transitionEndRegister',
                'actionsHandler',
                'actions',
                'hooks',
                'animater',
                'translater',
                'scrollBehaviorX',
                'scrollBehaviorY',
            ];
            keys.forEach(function (key) { return _this[key].destroy(); });
        };
        return Scroller;
    }());

    var BScrollConstructor = /** @class */ (function (_super) {
        __extends(BScrollConstructor, _super);
        function BScrollConstructor(el, options) {
            var _this = _super.call(this, [
                'refresh',
                'contentChanged',
                'enable',
                'disable',
                'beforeScrollStart',
                'scrollStart',
                'scroll',
                'scrollEnd',
                'scrollCancel',
                'touchEnd',
                'flick',
                'destroy'
            ]) || this;
            var wrapper = getElement(el);
            if (!wrapper) {
                warn('Can not resolve the wrapper DOM.');
                return _this;
            }
            _this.plugins = {};
            _this.options = new OptionsConstructor().merge(options).process();
            if (!_this.setContent(wrapper).valid) {
                return _this;
            }
            _this.hooks = new EventEmitter([
                'refresh',
                'enable',
                'disable',
                'destroy',
                'beforeInitialScrollTo',
                'contentChanged'
            ]);
            _this.init(wrapper);
            return _this;
        }
        BScrollConstructor.use = function (ctor) {
            var name = ctor.pluginName;
            var installed = BScrollConstructor.plugins.some(function (plugin) { return ctor === plugin.ctor; });
            if (installed)
                return BScrollConstructor;
            if (isUndef(name)) {
                warn("Plugin Class must specify plugin's name in static property by 'pluginName' field.");
                return BScrollConstructor;
            }
            BScrollConstructor.pluginsMap[name] = true;
            BScrollConstructor.plugins.push({
                name: name,
                applyOrder: ctor.applyOrder,
                ctor: ctor
            });
            return BScrollConstructor;
        };
        BScrollConstructor.prototype.setContent = function (wrapper) {
            var contentChanged = false;
            var valid = true;
            var content = wrapper.children[this.options.specifiedIndexAsContent];
            if (!content) {
                warn('The wrapper need at least one child element to be content element to scroll.');
                valid = false;
            }
            else {
                contentChanged = this.content !== content;
                if (contentChanged) {
                    this.content = content;
                }
            }
            return {
                valid: valid,
                contentChanged: contentChanged
            };
        };
        BScrollConstructor.prototype.init = function (wrapper) {
            var _this = this;
            this.wrapper = wrapper;
            // mark wrapper to recognize bs instance by DOM attribute
            wrapper.isBScrollContainer = true;
            this.scroller = new Scroller(wrapper, this.content, this.options);
            this.scroller.hooks.on(this.scroller.hooks.eventTypes.resize, function () {
                _this.refresh();
            });
            this.eventBubbling();
            this.handleAutoBlur();
            this.enable();
            this.proxy(propertiesConfig$7);
            this.applyPlugins();
            // maybe boundary has changed, should refresh
            this.refreshWithoutReset(this.content);
            var _a = this.options, startX = _a.startX, startY = _a.startY;
            var position = {
                x: startX,
                y: startY
            };
            // maybe plugins want to control scroll position
            if (this.hooks.trigger(this.hooks.eventTypes.beforeInitialScrollTo, position)) {
                return;
            }
            this.scroller.scrollTo(position.x, position.y);
        };
        BScrollConstructor.prototype.applyPlugins = function () {
            var _this = this;
            var options = this.options;
            BScrollConstructor.plugins
                .sort(function (a, b) {
                var _a;
                var applyOrderMap = (_a = {},
                    _a["pre" /* Pre */] = -1,
                    _a["post" /* Post */] = 1,
                    _a);
                var aOrder = a.applyOrder ? applyOrderMap[a.applyOrder] : 0;
                var bOrder = b.applyOrder ? applyOrderMap[b.applyOrder] : 0;
                return aOrder - bOrder;
            })
                .forEach(function (item) {
                var ctor = item.ctor;
                if (options[item.name] && typeof ctor === 'function') {
                    _this.plugins[item.name] = new ctor(_this);
                }
            });
        };
        BScrollConstructor.prototype.handleAutoBlur = function () {
            /* istanbul ignore if  */
            if (this.options.autoBlur) {
                this.on(this.eventTypes.beforeScrollStart, function () {
                    var activeElement = document.activeElement;
                    if (activeElement &&
                        (activeElement.tagName === 'INPUT' ||
                            activeElement.tagName === 'TEXTAREA')) {
                        activeElement.blur();
                    }
                });
            }
        };
        BScrollConstructor.prototype.eventBubbling = function () {
            bubbling(this.scroller.hooks, this, [
                this.eventTypes.beforeScrollStart,
                this.eventTypes.scrollStart,
                this.eventTypes.scroll,
                this.eventTypes.scrollEnd,
                this.eventTypes.scrollCancel,
                this.eventTypes.touchEnd,
                this.eventTypes.flick
            ]);
        };
        BScrollConstructor.prototype.refreshWithoutReset = function (content) {
            this.scroller.refresh(content);
            this.hooks.trigger(this.hooks.eventTypes.refresh, content);
            this.trigger(this.eventTypes.refresh, content);
        };
        BScrollConstructor.prototype.proxy = function (propertiesConfig) {
            var _this = this;
            propertiesConfig.forEach(function (_a) {
                var key = _a.key, sourceKey = _a.sourceKey;
                propertiesProxy(_this, sourceKey, key);
            });
        };
        BScrollConstructor.prototype.refresh = function () {
            var _a = this.setContent(this.wrapper), contentChanged = _a.contentChanged, valid = _a.valid;
            if (valid) {
                var content = this.content;
                this.refreshWithoutReset(content);
                if (contentChanged) {
                    this.hooks.trigger(this.hooks.eventTypes.contentChanged, content);
                    this.trigger(this.eventTypes.contentChanged, content);
                }
                this.scroller.resetPosition();
            }
        };
        BScrollConstructor.prototype.enable = function () {
            this.scroller.enable();
            this.hooks.trigger(this.hooks.eventTypes.enable);
            this.trigger(this.eventTypes.enable);
        };
        BScrollConstructor.prototype.disable = function () {
            this.scroller.disable();
            this.hooks.trigger(this.hooks.eventTypes.disable);
            this.trigger(this.eventTypes.disable);
        };
        BScrollConstructor.prototype.destroy = function () {
            this.hooks.trigger(this.hooks.eventTypes.destroy);
            this.trigger(this.eventTypes.destroy);
            this.scroller.destroy();
        };
        BScrollConstructor.prototype.eventRegister = function (names) {
            this.registerType(names);
        };
        BScrollConstructor.plugins = [];
        BScrollConstructor.pluginsMap = {};
        return BScrollConstructor;
    }(EventEmitter));
    function createBScroll(el, options) {
        var bs = new BScrollConstructor(el, options);
        return bs;
    }
    createBScroll.use = BScrollConstructor.use;
    createBScroll.plugins = BScrollConstructor.plugins;
    createBScroll.pluginsMap = BScrollConstructor.pluginsMap;
    var BScroll = createBScroll;

    var MouseWheel = /** @class */ (function () {
        function MouseWheel(scroll) {
            this.scroll = scroll;
            this.wheelEndTimer = 0;
            this.wheelMoveTimer = 0;
            this.wheelStart = false;
            this.init();
        }
        MouseWheel.prototype.init = function () {
            this.handleBScroll();
            this.handleOptions();
            this.handleHooks();
            this.registerEvent();
        };
        MouseWheel.prototype.handleBScroll = function () {
            this.scroll.registerType([
                'alterOptions',
                'mousewheelStart',
                'mousewheelMove',
                'mousewheelEnd',
            ]);
        };
        MouseWheel.prototype.handleOptions = function () {
            var userOptions = (this.scroll.options.mouseWheel === true
                ? {}
                : this.scroll.options.mouseWheel);
            var defaultOptions = {
                speed: 20,
                invert: false,
                easeTime: 300,
                discreteTime: 400,
                throttleTime: 0,
                dampingFactor: 0.1,
            };
            this.mouseWheelOpt = extend(defaultOptions, userOptions);
        };
        MouseWheel.prototype.handleHooks = function () {
            this.hooksFn = [];
            this.registerHooks(this.scroll.hooks, 'destroy', this.destroy);
        };
        MouseWheel.prototype.registerEvent = function () {
            this.eventRegister = new EventRegister(this.scroll.scroller.wrapper, [
                {
                    name: 'wheel',
                    handler: this.wheelHandler.bind(this),
                },
                {
                    name: 'mousewheel',
                    handler: this.wheelHandler.bind(this),
                },
                {
                    name: 'DOMMouseScroll',
                    handler: this.wheelHandler.bind(this),
                },
            ]);
        };
        MouseWheel.prototype.registerHooks = function (hooks, name, handler) {
            hooks.on(name, handler, this);
            this.hooksFn.push([hooks, name, handler]);
        };
        MouseWheel.prototype.wheelHandler = function (e) {
            if (!this.scroll.enabled) {
                return;
            }
            this.beforeHandler(e);
            // start
            if (!this.wheelStart) {
                this.wheelStartHandler(e);
                this.wheelStart = true;
            }
            // move
            var delta = this.getWheelDelta(e);
            this.wheelMoveHandler(delta);
            // end
            this.wheelEndDetector(delta);
        };
        MouseWheel.prototype.wheelStartHandler = function (e) {
            this.cleanCache();
            var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
            scrollBehaviorX.setMovingDirection(0 /* Default */);
            scrollBehaviorY.setMovingDirection(0 /* Default */);
            scrollBehaviorX.setDirection(0 /* Default */);
            scrollBehaviorY.setDirection(0 /* Default */);
            this.scroll.trigger(this.scroll.eventTypes.alterOptions, this.mouseWheelOpt);
            this.scroll.trigger(this.scroll.eventTypes.mousewheelStart);
        };
        MouseWheel.prototype.cleanCache = function () {
            this.deltaCache = [];
        };
        MouseWheel.prototype.wheelMoveHandler = function (delta) {
            var _this = this;
            var _a = this.mouseWheelOpt, throttleTime = _a.throttleTime, dampingFactor = _a.dampingFactor;
            if (throttleTime && this.wheelMoveTimer) {
                this.deltaCache.push(delta);
            }
            else {
                var cachedDelta = this.deltaCache.reduce(function (prev, current) {
                    return {
                        x: prev.x + current.x,
                        y: prev.y + current.y,
                    };
                }, { x: 0, y: 0 });
                this.cleanCache();
                var _b = this.scroll.scroller, scrollBehaviorX = _b.scrollBehaviorX, scrollBehaviorY = _b.scrollBehaviorY;
                scrollBehaviorX.setMovingDirection(-delta.directionX);
                scrollBehaviorY.setMovingDirection(-delta.directionY);
                scrollBehaviorX.setDirection(delta.x);
                scrollBehaviorY.setDirection(delta.y);
                // when out of boundary, perform a damping scroll
                var newX = scrollBehaviorX.performDampingAlgorithm(Math.round(delta.x) + cachedDelta.x, dampingFactor);
                var newY = scrollBehaviorY.performDampingAlgorithm(Math.round(delta.y) + cachedDelta.x, dampingFactor);
                if (!this.scroll.trigger(this.scroll.eventTypes.mousewheelMove, {
                    x: newX,
                    y: newY,
                })) {
                    var easeTime = this.getEaseTime();
                    if (newX !== this.scroll.x || newY !== this.scroll.y) {
                        this.scroll.scrollTo(newX, newY, easeTime);
                    }
                }
                if (throttleTime) {
                    this.wheelMoveTimer = window.setTimeout(function () {
                        _this.wheelMoveTimer = 0;
                    }, throttleTime);
                }
            }
        };
        MouseWheel.prototype.wheelEndDetector = function (delta) {
            var _this = this;
            window.clearTimeout(this.wheelEndTimer);
            this.wheelEndTimer = window.setTimeout(function () {
                _this.wheelStart = false;
                window.clearTimeout(_this.wheelMoveTimer);
                _this.wheelMoveTimer = 0;
                _this.scroll.trigger(_this.scroll.eventTypes.mousewheelEnd, delta);
            }, this.mouseWheelOpt.discreteTime);
        };
        MouseWheel.prototype.getWheelDelta = function (e) {
            var _a = this.mouseWheelOpt, speed = _a.speed, invert = _a.invert;
            var wheelDeltaX = 0;
            var wheelDeltaY = 0;
            var direction = invert ? -1 /* Negative */ : 1 /* Positive */;
            switch (true) {
                case 'deltaX' in e:
                    if (e.deltaMode === 1) {
                        wheelDeltaX = -e.deltaX * speed;
                        wheelDeltaY = -e.deltaY * speed;
                    }
                    else {
                        wheelDeltaX = -e.deltaX;
                        wheelDeltaY = -e.deltaY;
                    }
                    break;
                case 'wheelDeltaX' in e:
                    wheelDeltaX = (e.wheelDeltaX / 120) * speed;
                    wheelDeltaY = (e.wheelDeltaY / 120) * speed;
                    break;
                case 'wheelDelta' in e:
                    wheelDeltaX = wheelDeltaY = (e.wheelDelta / 120) * speed;
                    break;
                case 'detail' in e:
                    wheelDeltaX = wheelDeltaY = (-e.detail / 3) * speed;
                    break;
            }
            wheelDeltaX *= direction;
            wheelDeltaY *= direction;
            if (!this.scroll.hasVerticalScroll) {
                if (Math.abs(wheelDeltaY) > Math.abs(wheelDeltaX)) {
                    wheelDeltaX = wheelDeltaY;
                }
                wheelDeltaY = 0;
            }
            if (!this.scroll.hasHorizontalScroll) {
                wheelDeltaX = 0;
            }
            var directionX = wheelDeltaX > 0
                ? -1 /* Negative */
                : wheelDeltaX < 0
                    ? 1 /* Positive */
                    : 0 /* Default */;
            var directionY = wheelDeltaY > 0
                ? -1 /* Negative */
                : wheelDeltaY < 0
                    ? 1 /* Positive */
                    : 0 /* Default */;
            return {
                x: wheelDeltaX,
                y: wheelDeltaY,
                directionX: directionX,
                directionY: directionY,
            };
        };
        MouseWheel.prototype.beforeHandler = function (e) {
            var _a = this.scroll.options, preventDefault = _a.preventDefault, stopPropagation = _a.stopPropagation, preventDefaultException = _a.preventDefaultException;
            if (preventDefault &&
                !preventDefaultExceptionFn(e.target, preventDefaultException)) {
                e.preventDefault();
            }
            if (stopPropagation) {
                e.stopPropagation();
            }
        };
        MouseWheel.prototype.getEaseTime = function () {
            var SAFE_EASETIME = 100;
            var easeTime = this.mouseWheelOpt.easeTime;
            // scrollEnd event will be triggered in every calling of scrollTo when easeTime is too small
            // easeTime needs to be greater than 100
            if (easeTime < SAFE_EASETIME) {
                warn("easeTime should be greater than 100." +
                    "If mouseWheel easeTime is too small," +
                    "scrollEnd will be triggered many times.");
            }
            return Math.max(easeTime, SAFE_EASETIME);
        };
        MouseWheel.prototype.destroy = function () {
            this.eventRegister.destroy();
            window.clearTimeout(this.wheelEndTimer);
            window.clearTimeout(this.wheelMoveTimer);
            this.hooksFn.forEach(function (item) {
                var hooks = item[0];
                var hooksName = item[1];
                var handlerFn = item[2];
                hooks.off(hooksName, handlerFn);
            });
        };
        MouseWheel.pluginName = 'mouseWheel';
        MouseWheel.applyOrder = "pre" /* Pre */;
        return MouseWheel;
    }());

    var ObserveDOM = /** @class */ (function () {
        function ObserveDOM(scroll) {
            this.scroll = scroll;
            this.stopObserver = false;
            this.init();
        }
        ObserveDOM.prototype.init = function () {
            this.handleMutationObserver();
            this.handleHooks();
        };
        ObserveDOM.prototype.handleMutationObserver = function () {
            var _this = this;
            if (typeof MutationObserver !== 'undefined') {
                var timer_1 = 0;
                this.observer = new MutationObserver(function (mutations) {
                    _this.mutationObserverHandler(mutations, timer_1);
                });
                this.startObserve(this.observer);
            }
            else {
                this.checkDOMUpdate();
            }
        };
        ObserveDOM.prototype.handleHooks = function () {
            var _this = this;
            this.hooksFn = [];
            this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function () {
                _this.stopObserve();
                // launch a new mutationObserver
                _this.handleMutationObserver();
            });
            this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.enable, function () {
                if (_this.stopObserver) {
                    _this.handleMutationObserver();
                }
            });
            this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.disable, function () {
                _this.stopObserve();
            });
            this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.destroy, function () {
                _this.destroy();
            });
        };
        ObserveDOM.prototype.mutationObserverHandler = function (mutations, timer) {
            var _this = this;
            if (this.shouldNotRefresh()) {
                return;
            }
            var immediateRefresh = false;
            var deferredRefresh = false;
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                if (mutation.type !== 'attributes') {
                    immediateRefresh = true;
                    break;
                }
                else {
                    if (mutation.target !== this.scroll.scroller.content) {
                        deferredRefresh = true;
                        break;
                    }
                }
            }
            if (immediateRefresh) {
                this.scroll.refresh();
            }
            else if (deferredRefresh) {
                // attributes changes too often
                clearTimeout(timer);
                timer = window.setTimeout(function () {
                    if (!_this.shouldNotRefresh()) {
                        _this.scroll.refresh();
                    }
                }, 60);
            }
        };
        ObserveDOM.prototype.startObserve = function (observer) {
            var config = {
                attributes: true,
                childList: true,
                subtree: true,
            };
            observer.observe(this.scroll.scroller.content, config);
        };
        ObserveDOM.prototype.shouldNotRefresh = function () {
            var scroller = this.scroll.scroller;
            var scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY;
            var outsideBoundaries = scrollBehaviorX.currentPos > scrollBehaviorX.minScrollPos ||
                scrollBehaviorX.currentPos < scrollBehaviorX.maxScrollPos ||
                scrollBehaviorY.currentPos > scrollBehaviorY.minScrollPos ||
                scrollBehaviorY.currentPos < scrollBehaviorY.maxScrollPos;
            return scroller.animater.pending || outsideBoundaries;
        };
        ObserveDOM.prototype.checkDOMUpdate = function () {
            var _this = this;
            var content = this.scroll.scroller.content;
            var contentRect = getRect(content);
            var oldWidth = contentRect.width;
            var oldHeight = contentRect.height;
            var check = function () {
                if (_this.stopObserver) {
                    return;
                }
                contentRect = getRect(content);
                var newWidth = contentRect.width;
                var newHeight = contentRect.height;
                if (oldWidth !== newWidth || oldHeight !== newHeight) {
                    _this.scroll.refresh();
                }
                oldWidth = newWidth;
                oldHeight = newHeight;
                next();
            };
            var next = function () {
                setTimeout(function () {
                    check();
                }, 1000);
            };
            next();
        };
        ObserveDOM.prototype.registerHooks = function (hooks, name, handler) {
            hooks.on(name, handler, this);
            this.hooksFn.push([hooks, name, handler]);
        };
        ObserveDOM.prototype.stopObserve = function () {
            this.stopObserver = true;
            if (this.observer) {
                this.observer.disconnect();
            }
        };
        ObserveDOM.prototype.destroy = function () {
            this.stopObserve();
            this.hooksFn.forEach(function (item) {
                var hooks = item[0];
                var hooksName = item[1];
                var handlerFn = item[2];
                hooks.off(hooksName, handlerFn);
            });
            this.hooksFn.length = 0;
        };
        ObserveDOM.pluginName = 'observeDOM';
        return ObserveDOM;
    }());

    var sourcePrefix$6 = 'plugins.pullDownRefresh';
    var propertiesMap$6 = [
        {
            key: 'finishPullDown',
            name: 'finishPullDown'
        },
        {
            key: 'openPullDown',
            name: 'openPullDown'
        },
        {
            key: 'closePullDown',
            name: 'closePullDown'
        },
        {
            key: 'autoPullDownRefresh',
            name: 'autoPullDownRefresh'
        }
    ];
    var propertiesConfig$6 = propertiesMap$6.map(function (item) {
        return {
            key: item.key,
            sourceKey: sourcePrefix$6 + "." + item.name
        };
    });

    var PULLING_DOWN_EVENT = 'pullingDown';
    var ENTER_THRESHOLD_EVENT = 'enterThreshold';
    var LEAVE_THRESHOLD_EVENT = 'leaveThreshold';
    var PullDown = /** @class */ (function () {
        function PullDown(scroll) {
            this.scroll = scroll;
            this.pulling = 0 /* DEFAULT */;
            this.thresholdBoundary = 0 /* DEFAULT */;
            this.init();
        }
        PullDown.prototype.setPulling = function (status) {
            this.pulling = status;
        };
        PullDown.prototype.setThresholdBoundary = function (boundary) {
            this.thresholdBoundary = boundary;
        };
        PullDown.prototype.init = function () {
            this.handleBScroll();
            this.handleOptions(this.scroll.options.pullDownRefresh);
            this.handleHooks();
            this.watch();
        };
        PullDown.prototype.handleBScroll = function () {
            this.scroll.registerType([
                PULLING_DOWN_EVENT,
                ENTER_THRESHOLD_EVENT,
                LEAVE_THRESHOLD_EVENT,
            ]);
            this.scroll.proxy(propertiesConfig$6);
        };
        PullDown.prototype.handleOptions = function (userOptions) {
            if (userOptions === void 0) { userOptions = {}; }
            userOptions = (userOptions === true ? {} : userOptions);
            var defaultOptions = {
                threshold: 90,
                stop: 40,
            };
            this.options = extend(defaultOptions, userOptions);
            this.scroll.options.probeType = 3 /* Realtime */;
        };
        PullDown.prototype.handleHooks = function () {
            var _this = this;
            this.hooksFn = [];
            var scroller = this.scroll.scroller;
            var scrollBehaviorY = scroller.scrollBehaviorY;
            this.currentMinScrollY = this.cachedOriginanMinScrollY =
                scrollBehaviorY.minScrollPos;
            this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function () {
                _this.finishPullDown();
            });
            this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function (boundary) {
                // content is smaller than wrapper
                if (boundary.maxScrollPos > 0) {
                    // allow scrolling when content is not full of wrapper
                    boundary.maxScrollPos = -1;
                }
                boundary.minScrollPos = _this.currentMinScrollY;
            });
            // integrate with mousewheel
            if (this.hasMouseWheelPlugin()) {
                this.registerHooks(this.scroll, this.scroll.eventTypes.alterOptions, function (mouseWheelOptions) {
                    var SANE_DISCRETE_TIME = 300;
                    var SANE_EASE_TIME = 350;
                    mouseWheelOptions.discreteTime = SANE_DISCRETE_TIME;
                    // easeTime > discreteTime ensure goInto checkPullDown function
                    mouseWheelOptions.easeTime = SANE_EASE_TIME;
                });
                this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function () {
                    // mouseWheel need trigger checkPullDown manually
                    scroller.hooks.trigger(scroller.hooks.eventTypes.end);
                });
            }
        };
        PullDown.prototype.registerHooks = function (hooks, name, handler) {
            hooks.on(name, handler, this);
            this.hooksFn.push([hooks, name, handler]);
        };
        PullDown.prototype.hasMouseWheelPlugin = function () {
            return !!this.scroll.eventTypes.alterOptions;
        };
        PullDown.prototype.watch = function () {
            var scroller = this.scroll.scroller;
            this.watching = true;
            this.registerHooks(scroller.hooks, scroller.hooks.eventTypes.end, this.checkPullDown);
            this.registerHooks(this.scroll, this.scroll.eventTypes.scrollStart, this.resetStateBeforeScrollStart);
            this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkLocationOfThresholdBoundary);
            if (this.hasMouseWheelPlugin()) {
                this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
            }
        };
        PullDown.prototype.resetStateBeforeScrollStart = function () {
            // current fetching pulldownRefresh has ended
            if (!this.isFetchingStatus()) {
                this.setPulling(1 /* MOVING */);
                this.setThresholdBoundary(0 /* DEFAULT */);
            }
        };
        PullDown.prototype.checkLocationOfThresholdBoundary = function () {
            // pulldownRefresh is in the phase of Moving
            if (this.pulling === 1 /* MOVING */) {
                var scroll_1 = this.scroll;
                // enter threshold boundary
                var enteredThresholdBoundary = this.thresholdBoundary !== 1 /* INSIDE */ &&
                    this.locateInsideThresholdBoundary();
                // leave threshold boundary
                var leftThresholdBoundary = this.thresholdBoundary !== 2 /* OUTSIDE */ &&
                    !this.locateInsideThresholdBoundary();
                if (enteredThresholdBoundary) {
                    this.setThresholdBoundary(1 /* INSIDE */);
                    scroll_1.trigger(ENTER_THRESHOLD_EVENT);
                }
                if (leftThresholdBoundary) {
                    this.setThresholdBoundary(2 /* OUTSIDE */);
                    scroll_1.trigger(LEAVE_THRESHOLD_EVENT);
                }
            }
        };
        PullDown.prototype.locateInsideThresholdBoundary = function () {
            return this.scroll.y <= this.options.threshold;
        };
        PullDown.prototype.unwatch = function () {
            var scroll = this.scroll;
            var scroller = scroll.scroller;
            this.watching = false;
            scroller.hooks.off(scroller.hooks.eventTypes.end, this.checkPullDown);
            scroll.off(scroll.eventTypes.scrollStart, this.resetStateBeforeScrollStart);
            scroll.off(scroll.eventTypes.scroll, this.checkLocationOfThresholdBoundary);
            if (this.hasMouseWheelPlugin()) {
                scroll.off(scroll.eventTypes.mousewheelStart, this.resetStateBeforeScrollStart);
            }
        };
        PullDown.prototype.checkPullDown = function () {
            var _a = this.options, threshold = _a.threshold, stop = _a.stop;
            // check if a real pull down action
            if (this.scroll.y < threshold) {
                return false;
            }
            if (this.pulling === 1 /* MOVING */) {
                this.modifyBehaviorYBoundary(stop);
                this.setPulling(2 /* FETCHING */);
                this.scroll.trigger(PULLING_DOWN_EVENT);
            }
            this.scroll.scrollTo(this.scroll.x, stop, this.scroll.options.bounceTime, ease.bounce);
            return this.isFetchingStatus();
        };
        PullDown.prototype.isFetchingStatus = function () {
            return this.pulling === 2 /* FETCHING */;
        };
        PullDown.prototype.modifyBehaviorYBoundary = function (stopDistance) {
            var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
            // manually modify minScrollPos for a hang animation
            // to prevent from resetPosition
            this.cachedOriginanMinScrollY = scrollBehaviorY.minScrollPos;
            this.currentMinScrollY = stopDistance;
            scrollBehaviorY.computeBoundary();
        };
        PullDown.prototype.finishPullDown = function () {
            if (this.isFetchingStatus()) {
                var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
                // restore minScrollY since the hang animation has ended
                this.currentMinScrollY = this.cachedOriginanMinScrollY;
                scrollBehaviorY.computeBoundary();
                this.setPulling(0 /* DEFAULT */);
                this.scroll.resetPosition(this.scroll.options.bounceTime, ease.bounce);
            }
        };
        // allow 'true' type is compat for beta version implements
        PullDown.prototype.openPullDown = function (config) {
            if (config === void 0) { config = {}; }
            this.handleOptions(config);
            if (!this.watching) {
                this.watch();
            }
        };
        PullDown.prototype.closePullDown = function () {
            this.unwatch();
        };
        PullDown.prototype.autoPullDownRefresh = function () {
            var _a = this.options, threshold = _a.threshold, stop = _a.stop;
            if (this.isFetchingStatus() || !this.watching) {
                return;
            }
            this.modifyBehaviorYBoundary(stop);
            this.scroll.trigger(this.scroll.eventTypes.scrollStart);
            this.scroll.scrollTo(this.scroll.x, threshold);
            this.setPulling(2 /* FETCHING */);
            this.scroll.trigger(PULLING_DOWN_EVENT);
            this.scroll.scrollTo(this.scroll.x, stop, this.scroll.options.bounceTime, ease.bounce);
        };
        PullDown.pluginName = 'pullDownRefresh';
        return PullDown;
    }());

    var sourcePrefix$5 = 'plugins.pullUpLoad';
    var propertiesMap$5 = [
        {
            key: 'finishPullUp',
            name: 'finishPullUp'
        },
        {
            key: 'openPullUp',
            name: 'openPullUp'
        },
        {
            key: 'closePullUp',
            name: 'closePullUp'
        },
        {
            key: 'autoPullUpLoad',
            name: 'autoPullUpLoad'
        }
    ];
    var propertiesConfig$5 = propertiesMap$5.map(function (item) {
        return {
            key: item.key,
            sourceKey: sourcePrefix$5 + "." + item.name
        };
    });

    var PULL_UP_HOOKS_NAME = 'pullingUp';
    var PullUp = /** @class */ (function () {
        function PullUp(scroll) {
            this.scroll = scroll;
            this.pulling = false;
            this.watching = false;
            this.init();
        }
        PullUp.prototype.init = function () {
            this.handleBScroll();
            this.handleOptions(this.scroll.options.pullUpLoad);
            this.handleHooks();
            this.watch();
        };
        PullUp.prototype.handleBScroll = function () {
            this.scroll.registerType([PULL_UP_HOOKS_NAME]);
            this.scroll.proxy(propertiesConfig$5);
        };
        PullUp.prototype.handleOptions = function (userOptions) {
            if (userOptions === void 0) { userOptions = {}; }
            userOptions = (userOptions === true ? {} : userOptions);
            var defaultOptions = {
                threshold: 0,
            };
            this.options = extend(defaultOptions, userOptions);
            this.scroll.options.probeType = 3 /* Realtime */;
        };
        PullUp.prototype.handleHooks = function () {
            var _this = this;
            this.hooksFn = [];
            var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
            this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.contentChanged, function () {
                _this.finishPullUp();
            });
            this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function (boundary) {
                // content is smaller than wrapper
                if (boundary.maxScrollPos > 0) {
                    // allow scrolling when content is not full of wrapper
                    boundary.maxScrollPos = -1;
                }
            });
        };
        PullUp.prototype.registerHooks = function (hooks, name, handler) {
            hooks.on(name, handler, this);
            this.hooksFn.push([hooks, name, handler]);
        };
        PullUp.prototype.watch = function () {
            if (this.watching) {
                return;
            }
            this.watching = true;
            this.registerHooks(this.scroll, this.scroll.eventTypes.scroll, this.checkPullUp);
        };
        PullUp.prototype.unwatch = function () {
            this.watching = false;
            this.scroll.off(this.scroll.eventTypes.scroll, this.checkPullUp);
        };
        PullUp.prototype.checkPullUp = function (pos) {
            var _this = this;
            var threshold = this.options.threshold;
            if (this.scroll.movingDirectionY === 1 /* Positive */ &&
                pos.y <= this.scroll.maxScrollY + threshold) {
                this.pulling = true;
                // must reset pulling after scrollEnd
                this.scroll.once(this.scroll.eventTypes.scrollEnd, function () {
                    _this.pulling = false;
                });
                this.unwatch();
                this.scroll.trigger(PULL_UP_HOOKS_NAME);
            }
        };
        PullUp.prototype.finishPullUp = function () {
            var _this = this;
            // reset Direction, fix #936
            this.scroll.scroller.scrollBehaviorY.setMovingDirection(0 /* Default */);
            if (this.pulling) {
                this.scroll.once(this.scroll.eventTypes.scrollEnd, function () {
                    _this.watch();
                });
            }
            else {
                this.watch();
            }
        };
        // allow 'true' type is compat for beta version implements
        PullUp.prototype.openPullUp = function (config) {
            if (config === void 0) { config = {}; }
            this.handleOptions(config);
            this.watch();
        };
        PullUp.prototype.closePullUp = function () {
            this.unwatch();
        };
        PullUp.prototype.autoPullUpLoad = function () {
            var threshold = this.options.threshold;
            var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
            if (this.pulling || !this.watching) {
                return;
            }
            // simulate a pullUp action
            var NEGATIVE_VALUE = -1;
            var outOfBoundaryPos = scrollBehaviorY.maxScrollPos + threshold + NEGATIVE_VALUE;
            this.scroll.scroller.scrollBehaviorY.setMovingDirection(NEGATIVE_VALUE);
            this.scroll.scrollTo(this.scroll.x, outOfBoundaryPos, this.scroll.options.bounceTime);
        };
        PullUp.pluginName = 'pullUpLoad';
        return PullUp;
    }());

    var EventHandler = /** @class */ (function () {
        function EventHandler(indicator, options) {
            this.indicator = indicator;
            this.options = options;
            this.hooks = new EventEmitter(['touchStart', 'touchMove', 'touchEnd']);
            this.registerEvents();
        }
        EventHandler.prototype.registerEvents = function () {
            var _a = this.options, disableMouse = _a.disableMouse, disableTouch = _a.disableTouch;
            var startEvents = [];
            var moveEvents = [];
            var endEvents = [];
            if (!disableMouse) {
                startEvents.push({
                    name: 'mousedown',
                    handler: this.start.bind(this),
                });
                moveEvents.push({
                    name: 'mousemove',
                    handler: this.move.bind(this),
                });
                endEvents.push({
                    name: 'mouseup',
                    handler: this.end.bind(this),
                });
            }
            if (!disableTouch) {
                startEvents.push({
                    name: 'touchstart',
                    handler: this.start.bind(this),
                });
                moveEvents.push({
                    name: 'touchmove',
                    handler: this.move.bind(this),
                });
                endEvents.push({
                    name: 'touchend',
                    handler: this.end.bind(this),
                }, {
                    name: 'touchcancel',
                    handler: this.end.bind(this),
                });
            }
            this.startEventRegister = new EventRegister(this.indicator.indicatorEl, startEvents);
            this.moveEventRegister = new EventRegister(window, moveEvents);
            this.endEventRegister = new EventRegister(window, endEvents);
        };
        EventHandler.prototype.BScrollIsDisabled = function () {
            return !this.indicator.scroll.enabled;
        };
        EventHandler.prototype.start = function (e) {
            if (this.BScrollIsDisabled()) {
                return;
            }
            var point = (e.touches ? e.touches[0] : e);
            e.preventDefault();
            e.stopPropagation();
            this.initiated = true;
            this.lastPoint = point[this.indicator.keysMap.point];
            this.hooks.trigger(this.hooks.eventTypes.touchStart);
        };
        EventHandler.prototype.move = function (e) {
            if (!this.initiated) {
                return;
            }
            var point = (e.touches ? e.touches[0] : e);
            var pointPos = point[this.indicator.keysMap.point];
            e.preventDefault();
            e.stopPropagation();
            var delta = pointPos - this.lastPoint;
            this.lastPoint = pointPos;
            this.hooks.trigger(this.hooks.eventTypes.touchMove, delta);
        };
        EventHandler.prototype.end = function (e) {
            if (!this.initiated) {
                return;
            }
            this.initiated = false;
            e.preventDefault();
            e.stopPropagation();
            this.hooks.trigger(this.hooks.eventTypes.touchEnd);
        };
        EventHandler.prototype.destroy = function () {
            this.startEventRegister.destroy();
            this.moveEventRegister.destroy();
            this.endEventRegister.destroy();
        };
        return EventHandler;
    }());

    var Indicator$1 = /** @class */ (function () {
        function Indicator(scroll, options) {
            this.scroll = scroll;
            this.options = options;
            this.hooksFn = [];
            this.wrapper = options.wrapper;
            this.direction = options.direction;
            this.indicatorEl = this.wrapper.children[0];
            this.keysMap = this.getKeysMap();
            this.handleFade();
            this.handleHooks();
        }
        Indicator.prototype.handleFade = function () {
            if (this.options.fade) {
                this.wrapper.style.opacity = '0';
            }
        };
        Indicator.prototype.handleHooks = function () {
            var _this = this;
            var _a = this.options, fade = _a.fade, interactive = _a.interactive, scrollbarTrackClickable = _a.scrollbarTrackClickable;
            var scroll = this.scroll;
            var scrollHooks = scroll.hooks;
            var translaterHooks = scroll.scroller.translater.hooks;
            var animaterHooks = scroll.scroller.animater.hooks;
            this.registerHooks(scrollHooks, scrollHooks.eventTypes.refresh, this.refresh);
            this.registerHooks(translaterHooks, translaterHooks.eventTypes.translate, function (pos) {
                var hasScrollKey = _this.keysMap.hasScroll;
                if (_this.scroll[hasScrollKey]) {
                    _this.updatePosition(pos);
                }
            });
            this.registerHooks(animaterHooks, animaterHooks.eventTypes.time, this.transitionTime);
            this.registerHooks(animaterHooks, animaterHooks.eventTypes.timeFunction, this.transitionTimingFunction);
            if (fade) {
                this.registerHooks(scroll, scroll.eventTypes.scrollEnd, function () {
                    _this.fade();
                });
                this.registerHooks(scroll, scroll.eventTypes.scrollStart, function () {
                    _this.fade(true);
                });
                // for mousewheel event
                if (scroll.eventTypes.mousewheelStart &&
                    scroll.eventTypes.mousewheelEnd) {
                    this.registerHooks(scroll, scroll.eventTypes.mousewheelStart, function () {
                        _this.fade(true);
                    });
                    this.registerHooks(scroll, scroll.eventTypes.mousewheelMove, function () {
                        _this.fade(true);
                    });
                    this.registerHooks(scroll, scroll.eventTypes.mousewheelEnd, function () {
                        _this.fade();
                    });
                }
            }
            if (interactive) {
                var _b = this.scroll.options, disableMouse = _b.disableMouse, disableTouch = _b.disableTouch;
                this.eventHandler = new EventHandler(this, {
                    disableMouse: disableMouse,
                    disableTouch: disableTouch,
                });
                var eventHandlerHooks = this.eventHandler.hooks;
                this.registerHooks(eventHandlerHooks, eventHandlerHooks.eventTypes.touchStart, this.startHandler);
                this.registerHooks(eventHandlerHooks, eventHandlerHooks.eventTypes.touchMove, this.moveHandler);
                this.registerHooks(eventHandlerHooks, eventHandlerHooks.eventTypes.touchEnd, this.endHandler);
            }
            if (scrollbarTrackClickable) {
                this.bindClick();
            }
        };
        Indicator.prototype.registerHooks = function (hooks, name, handler) {
            hooks.on(name, handler, this);
            this.hooksFn.push([hooks, name, handler]);
        };
        Indicator.prototype.bindClick = function () {
            var wrapper = this.wrapper;
            this.clickEventRegister = new EventRegister(wrapper, [
                {
                    name: 'click',
                    handler: this.handleClick.bind(this),
                },
            ]);
        };
        Indicator.prototype.handleClick = function (e) {
            var newPos = this.calculateclickOffsetPos(e);
            var _a = this.scroll, x = _a.x, y = _a.y;
            x = this.direction === "horizontal" /* Horizontal */ ? newPos : x;
            y = this.direction === "vertical" /* Vertical */ ? newPos : y;
            this.scroll.scrollTo(x, y, this.options.scrollbarTrackOffsetTime);
        };
        Indicator.prototype.calculateclickOffsetPos = function (e) {
            var _a = this.keysMap, poinKey = _a.point, domRectKey = _a.domRect;
            var scrollbarTrackOffsetType = this.options.scrollbarTrackOffsetType;
            var clickPointOffset = e[poinKey] - this.wrapperRect[domRectKey];
            var scrollToWhere = clickPointOffset < this.currentPos ? -1 /* Up */ : 1 /* Down */;
            var delta = 0;
            var currentPos = this.currentPos;
            if (scrollbarTrackOffsetType === "step" /* Step */) {
                delta = this.scrollInfo.baseSize * scrollToWhere;
            }
            else {
                delta = 0;
                currentPos = clickPointOffset;
            }
            return this.newPos(currentPos, delta, this.scrollInfo);
        };
        Indicator.prototype.getKeysMap = function () {
            if (this.direction === "vertical" /* Vertical */) {
                return {
                    hasScroll: 'hasVerticalScroll',
                    size: 'height',
                    wrapperSize: 'clientHeight',
                    scrollerSize: 'scrollerHeight',
                    maxScrollPos: 'maxScrollY',
                    pos: 'y',
                    point: 'pageY',
                    translateProperty: 'translateY',
                    domRect: 'top',
                };
            }
            return {
                hasScroll: 'hasHorizontalScroll',
                size: 'width',
                wrapperSize: 'clientWidth',
                scrollerSize: 'scrollerWidth',
                maxScrollPos: 'maxScrollX',
                pos: 'x',
                point: 'pageX',
                translateProperty: 'translateX',
                domRect: 'left',
            };
        };
        Indicator.prototype.fade = function (visible) {
            var _a = this.options, fadeInTime = _a.fadeInTime, fadeOutTime = _a.fadeOutTime;
            var time = visible ? fadeInTime : fadeOutTime;
            var wrapper = this.wrapper;
            wrapper.style[style.transitionDuration] = time + 'ms';
            wrapper.style.opacity = visible ? '1' : '0';
        };
        Indicator.prototype.refresh = function () {
            var hasScrollKey = this.keysMap.hasScroll;
            var scroll = this.scroll;
            var x = scroll.x, y = scroll.y;
            this.wrapperRect = this.wrapper.getBoundingClientRect();
            if (this.canScroll(scroll[hasScrollKey])) {
                var _a = this.keysMap, wrapperSizeKey = _a.wrapperSize, scrollerSizeKey = _a.scrollerSize, maxScrollPosKey = _a.maxScrollPos;
                this.scrollInfo = this.refreshScrollInfo(this.wrapper[wrapperSizeKey], scroll[scrollerSizeKey], scroll[maxScrollPosKey], this.indicatorEl[wrapperSizeKey]);
                this.updatePosition({
                    x: x,
                    y: y,
                });
            }
        };
        Indicator.prototype.transitionTime = function (time) {
            if (time === void 0) { time = 0; }
            this.indicatorEl.style[style.transitionDuration] = time + 'ms';
        };
        Indicator.prototype.transitionTimingFunction = function (easing) {
            this.indicatorEl.style[style.transitionTimingFunction] = easing;
        };
        Indicator.prototype.canScroll = function (hasScroll) {
            this.wrapper.style.display = hasScroll ? 'block' : 'none';
            return hasScroll;
        };
        Indicator.prototype.refreshScrollInfo = function (wrapperSize, scrollerSize, maxScrollPos, indicatorElSize) {
            var baseSize = Math.max(Math.round((wrapperSize * wrapperSize) / (scrollerSize || wrapperSize || 1)), this.options.minSize);
            if (this.options.isCustom) {
                baseSize = indicatorElSize;
            }
            var maxIndicatorScrollPos = wrapperSize - baseSize;
            // sizeRatio is negative
            var sizeRatio = maxIndicatorScrollPos / maxScrollPos;
            return {
                baseSize: baseSize,
                maxScrollPos: maxIndicatorScrollPos,
                minScrollPos: 0,
                sizeRatio: sizeRatio,
            };
        };
        Indicator.prototype.updatePosition = function (point) {
            var _a = this.caculatePosAndSize(point, this.scrollInfo), pos = _a.pos, size = _a.size;
            this.refreshStyle(size, pos);
            this.currentPos = pos;
        };
        Indicator.prototype.caculatePosAndSize = function (point, scrollInfo) {
            var posKey = this.keysMap.pos;
            var sizeRatio = scrollInfo.sizeRatio, baseSize = scrollInfo.baseSize, maxScrollPos = scrollInfo.maxScrollPos, minScrollPos = scrollInfo.minScrollPos;
            var minSize = this.options.minSize;
            var pos = Math.round(sizeRatio * point[posKey]);
            var size;
            // when out of boundary, slow down size reduction
            if (pos < minScrollPos) {
                size = Math.max(baseSize + pos * 3, minSize);
                pos = minScrollPos;
            }
            else if (pos > maxScrollPos) {
                size = Math.max(baseSize - (pos - maxScrollPos) * 3, minSize);
                pos = maxScrollPos + baseSize - size;
            }
            else {
                size = baseSize;
            }
            return {
                pos: pos,
                size: size,
            };
        };
        Indicator.prototype.refreshStyle = function (size, pos) {
            var _a = this.keysMap, translatePropertyKey = _a.translateProperty, sizeKey = _a.size;
            var translateZ = this.scroll.options.translateZ;
            this.indicatorEl.style[sizeKey] = size + "px";
            this.indicatorEl.style[style.transform] = translatePropertyKey + "(" + pos + "px)" + translateZ;
        };
        Indicator.prototype.startHandler = function () {
            this.moved = false;
            this.startTime = getNow();
            this.transitionTime();
            this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.beforeScrollStart);
        };
        Indicator.prototype.moveHandler = function (delta) {
            if (!this.moved && !this.indicatorNotMoved(delta)) {
                this.moved = true;
                this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollStart);
            }
            if (this.moved) {
                var newPos = this.newPos(this.currentPos, delta, this.scrollInfo);
                this.syncBScroll(newPos);
            }
        };
        Indicator.prototype.endHandler = function () {
            if (this.moved) {
                var _a = this.scroll, x = _a.x, y = _a.y;
                this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollEnd, {
                    x: x,
                    y: y,
                });
            }
        };
        Indicator.prototype.indicatorNotMoved = function (delta) {
            var currentPos = this.currentPos;
            var _a = this.scrollInfo, maxScrollPos = _a.maxScrollPos, minScrollPos = _a.minScrollPos;
            var notMoved = (currentPos === minScrollPos && delta <= 0) ||
                (currentPos === maxScrollPos && delta >= 0);
            return notMoved;
        };
        Indicator.prototype.syncBScroll = function (newPos) {
            var timestamp = getNow();
            var _a = this.scroll, x = _a.x, y = _a.y, options = _a.options, scroller = _a.scroller, maxScrollY = _a.maxScrollY, minScrollY = _a.minScrollY, maxScrollX = _a.maxScrollX, minScrollX = _a.minScrollX;
            var probeType = options.probeType, momentumLimitTime = options.momentumLimitTime;
            var position = { x: x, y: y };
            if (this.direction === "vertical" /* Vertical */) {
                position.y = between(newPos, maxScrollY, minScrollY);
            }
            else {
                position.x = between(newPos, maxScrollX, minScrollX);
            }
            scroller.translater.translate(position);
            // dispatch scroll in interval time
            if (timestamp - this.startTime > momentumLimitTime) {
                this.startTime = timestamp;
                if (probeType === 1 /* Throttle */) {
                    scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, position);
                }
            }
            // dispatch scroll all the time
            if (probeType > 1 /* Throttle */) {
                scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, position);
            }
        };
        Indicator.prototype.newPos = function (currentPos, delta, scrollInfo) {
            var maxScrollPos = scrollInfo.maxScrollPos, sizeRatio = scrollInfo.sizeRatio, minScrollPos = scrollInfo.minScrollPos;
            var newPos = currentPos + delta;
            newPos = between(newPos, minScrollPos, maxScrollPos);
            return Math.round(newPos / sizeRatio);
        };
        Indicator.prototype.destroy = function () {
            var _a = this.options, interactive = _a.interactive, scrollbarTrackClickable = _a.scrollbarTrackClickable, isCustom = _a.isCustom;
            if (interactive) {
                this.eventHandler.destroy();
            }
            if (scrollbarTrackClickable) {
                this.clickEventRegister.destroy();
            }
            if (!isCustom) {
                this.wrapper.parentNode.removeChild(this.wrapper);
            }
            this.hooksFn.forEach(function (item) {
                var hooks = item[0];
                var hooksName = item[1];
                var handlerFn = item[2];
                hooks.off(hooksName, handlerFn);
            });
            this.hooksFn.length = 0;
        };
        return Indicator;
    }());

    var ScrollBar = /** @class */ (function () {
        function ScrollBar(scroll) {
            this.scroll = scroll;
            this.handleOptions();
            this.createIndicators();
            this.handleHooks();
        }
        ScrollBar.prototype.handleHooks = function () {
            var _this = this;
            var scroll = this.scroll;
            scroll.hooks.on(scroll.hooks.eventTypes.destroy, function () {
                for (var _i = 0, _a = _this.indicators; _i < _a.length; _i++) {
                    var indicator = _a[_i];
                    indicator.destroy();
                }
            });
        };
        ScrollBar.prototype.handleOptions = function () {
            var userOptions = (this.scroll.options.scrollbar === true
                ? {}
                : this.scroll.options.scrollbar);
            var defaultOptions = {
                fade: true,
                fadeInTime: 250,
                fadeOutTime: 500,
                interactive: false,
                customElements: [],
                minSize: 8,
                scrollbarTrackClickable: false,
                scrollbarTrackOffsetType: "step" /* Step */,
                scrollbarTrackOffsetTime: 300,
            };
            this.options = extend(defaultOptions, userOptions);
        };
        ScrollBar.prototype.createIndicators = function () {
            var indicatorOptions;
            var scroll = this.scroll;
            var indicators = [];
            var scrollDirectionConfigKeys = ['scrollX', 'scrollY'];
            var indicatorDirections = [
                "horizontal" /* Horizontal */,
                "vertical" /* Vertical */,
            ];
            var customScrollbarEls = this.options.customElements;
            for (var i = 0; i < scrollDirectionConfigKeys.length; i++) {
                var key = scrollDirectionConfigKeys[i];
                // wanna scroll in specified direction
                if (scroll.options[key]) {
                    var customElement = customScrollbarEls.shift();
                    var direction = indicatorDirections[i];
                    var isCustom = false;
                    var scrollbarWrapper = customElement
                        ? customElement
                        : this.createScrollbarElement(direction);
                    // internal scrollbar
                    if (scrollbarWrapper !== customElement) {
                        scroll.wrapper.appendChild(scrollbarWrapper);
                    }
                    else {
                        // custom scrollbar passed by users
                        isCustom = true;
                    }
                    indicatorOptions = __assign(__assign({ wrapper: scrollbarWrapper, direction: direction }, this.options), { isCustom: isCustom });
                    indicators.push(new Indicator$1(scroll, indicatorOptions));
                }
            }
            this.indicators = indicators;
        };
        ScrollBar.prototype.createScrollbarElement = function (direction, scrollbarTrackClickable) {
            if (scrollbarTrackClickable === void 0) { scrollbarTrackClickable = this.options.scrollbarTrackClickable; }
            var scrollbarWrapperEl = document.createElement('div');
            var scrollbarIndicatorEl = document.createElement('div');
            scrollbarWrapperEl.style.cssText =
                'position:absolute;z-index:9999;overflow:hidden;';
            scrollbarIndicatorEl.style.cssText =
                'box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;';
            scrollbarIndicatorEl.className = 'bscroll-indicator';
            if (direction === "horizontal" /* Horizontal */) {
                scrollbarWrapperEl.style.cssText +=
                    'height:7px;left:2px;right:2px;bottom:0;';
                scrollbarIndicatorEl.style.height = '100%';
                scrollbarWrapperEl.className = 'bscroll-horizontal-scrollbar';
            }
            else {
                scrollbarWrapperEl.style.cssText +=
                    'width:7px;bottom:2px;top:2px;right:1px;';
                scrollbarIndicatorEl.style.width = '100%';
                scrollbarWrapperEl.className = 'bscroll-vertical-scrollbar';
            }
            if (!scrollbarTrackClickable) {
                scrollbarWrapperEl.style.cssText += 'pointer-events:none;';
            }
            scrollbarWrapperEl.appendChild(scrollbarIndicatorEl);
            return scrollbarWrapperEl;
        };
        ScrollBar.pluginName = 'scrollbar';
        return ScrollBar;
    }());

    var PagesMatrix = /** @class */ (function () {
        function PagesMatrix(scroll) {
            this.scroll = scroll;
            this.init();
        }
        PagesMatrix.prototype.init = function () {
            var scroller = this.scroll.scroller;
            var scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY;
            this.wrapperWidth = scrollBehaviorX.wrapperSize;
            this.wrapperHeight = scrollBehaviorY.wrapperSize;
            this.scrollerHeight = scrollBehaviorY.contentSize;
            this.scrollerWidth = scrollBehaviorX.contentSize;
            this.pages = this.buildPagesMatrix(this.wrapperWidth, this.wrapperHeight);
            this.pageLengthOfX = this.pages ? this.pages.length : 0;
            this.pageLengthOfY = this.pages && this.pages[0] ? this.pages[0].length : 0;
        };
        PagesMatrix.prototype.getPageStats = function (pageX, pageY) {
            return this.pages[pageX][pageY];
        };
        PagesMatrix.prototype.getNearestPageIndex = function (x, y) {
            var pageX = 0;
            var pageY = 0;
            var l = this.pages.length;
            for (; pageX < l - 1; pageX++) {
                if (x >= this.pages[pageX][0].cx) {
                    break;
                }
            }
            l = this.pages[pageX].length;
            for (; pageY < l - 1; pageY++) {
                if (y >= this.pages[0][pageY].cy) {
                    break;
                }
            }
            return {
                pageX: pageX,
                pageY: pageY,
            };
        };
        // (n x 1) matrix for horizontal scroll or
        // (1 * n) matrix for vertical scroll
        PagesMatrix.prototype.buildPagesMatrix = function (stepX, stepY) {
            var pages = [];
            var x = 0;
            var y;
            var cx;
            var cy;
            var i = 0;
            var l;
            var maxScrollPosX = this.scroll.scroller.scrollBehaviorX.maxScrollPos;
            var maxScrollPosY = this.scroll.scroller.scrollBehaviorY.maxScrollPos;
            cx = Math.round(stepX / 2);
            cy = Math.round(stepY / 2);
            while (x > -this.scrollerWidth) {
                pages[i] = [];
                l = 0;
                y = 0;
                while (y > -this.scrollerHeight) {
                    pages[i][l] = {
                        x: Math.max(x, maxScrollPosX),
                        y: Math.max(y, maxScrollPosY),
                        width: stepX,
                        height: stepY,
                        cx: x - cx,
                        cy: y - cy,
                    };
                    y -= stepY;
                    l++;
                }
                x -= stepX;
                i++;
            }
            return pages;
        };
        return PagesMatrix;
    }());

    var BASE_PAGE = {
        pageX: 0,
        pageY: 0,
        x: 0,
        y: 0,
    };

    var SlidePages = /** @class */ (function () {
        function SlidePages(scroll, slideOptions) {
            this.scroll = scroll;
            this.slideOptions = slideOptions;
            this.slideX = false;
            this.slideY = false;
            this.currentPage = extend({}, BASE_PAGE);
        }
        SlidePages.prototype.refresh = function () {
            this.pagesMatrix = new PagesMatrix(this.scroll);
            this.checkSlideLoop();
            this.currentPage = this.getAdjustedCurrentPage();
        };
        SlidePages.prototype.getAdjustedCurrentPage = function () {
            var _a = this.currentPage, pageX = _a.pageX, pageY = _a.pageY;
            // page index should be handled
            // because page counts may reduce
            pageX = Math.min(pageX, this.pagesMatrix.pageLengthOfX - 1);
            pageY = Math.min(pageY, this.pagesMatrix.pageLengthOfY - 1);
            // loop scene should also be respected
            // because clonedNode will cause pageLength increasing
            if (this.loopX) {
                pageX = Math.min(pageX, this.pagesMatrix.pageLengthOfX - 2);
            }
            if (this.loopY) {
                pageY = Math.min(pageY, this.pagesMatrix.pageLengthOfY - 2);
            }
            var _b = this.pagesMatrix.getPageStats(pageX, pageY), x = _b.x, y = _b.y;
            return { pageX: pageX, pageY: pageY, x: x, y: y };
        };
        SlidePages.prototype.setCurrentPage = function (newPage) {
            this.currentPage = newPage;
        };
        SlidePages.prototype.getInternalPage = function (pageX, pageY) {
            if (pageX >= this.pagesMatrix.pageLengthOfX) {
                pageX = this.pagesMatrix.pageLengthOfX - 1;
            }
            else if (pageX < 0) {
                pageX = 0;
            }
            if (pageY >= this.pagesMatrix.pageLengthOfY) {
                pageY = this.pagesMatrix.pageLengthOfY - 1;
            }
            else if (pageY < 0) {
                pageY = 0;
            }
            var _a = this.pagesMatrix.getPageStats(pageX, pageY), x = _a.x, y = _a.y;
            return {
                pageX: pageX,
                pageY: pageY,
                x: x,
                y: y,
            };
        };
        SlidePages.prototype.getInitialPage = function (showFirstPage, firstInitialised) {
            if (showFirstPage === void 0) { showFirstPage = false; }
            if (firstInitialised === void 0) { firstInitialised = false; }
            var _a = this.slideOptions, startPageXIndex = _a.startPageXIndex, startPageYIndex = _a.startPageYIndex;
            var firstPageX = this.loopX ? 1 : 0;
            var firstPageY = this.loopY ? 1 : 0;
            var pageX = showFirstPage ? firstPageX : this.currentPage.pageX;
            var pageY = showFirstPage ? firstPageY : this.currentPage.pageY;
            if (firstInitialised) {
                pageX = this.loopX ? startPageXIndex + 1 : startPageXIndex;
                pageY = this.loopY ? startPageYIndex + 1 : startPageYIndex;
            }
            else {
                pageX = showFirstPage ? firstPageX : this.currentPage.pageX;
                pageY = showFirstPage ? firstPageY : this.currentPage.pageY;
            }
            var _b = this.pagesMatrix.getPageStats(pageX, pageY), x = _b.x, y = _b.y;
            return {
                pageX: pageX,
                pageY: pageY,
                x: x,
                y: y,
            };
        };
        SlidePages.prototype.getExposedPage = function (page) {
            var exposedPage = extend({}, page);
            // only pageX or pageY need fix
            if (this.loopX) {
                exposedPage.pageX = this.fixedPage(exposedPage.pageX, this.pagesMatrix.pageLengthOfX - 2);
            }
            if (this.loopY) {
                exposedPage.pageY = this.fixedPage(exposedPage.pageY, this.pagesMatrix.pageLengthOfY - 2);
            }
            return exposedPage;
        };
        SlidePages.prototype.getExposedPageByPageIndex = function (pageIndexX, pageIndexY) {
            var page = {
                pageX: pageIndexX,
                pageY: pageIndexY,
            };
            if (this.loopX) {
                page.pageX = pageIndexX + 1;
            }
            if (this.loopY) {
                page.pageY = pageIndexY + 1;
            }
            var _a = this.pagesMatrix.getPageStats(page.pageX, page.pageY), x = _a.x, y = _a.y;
            return {
                x: x,
                y: y,
                pageX: pageIndexX,
                pageY: pageIndexY,
            };
        };
        SlidePages.prototype.getWillChangedPage = function (page) {
            page = extend({}, page);
            // Page need fix
            if (this.loopX) {
                page.pageX = this.fixedPage(page.pageX, this.pagesMatrix.pageLengthOfX - 2);
                page.x = this.pagesMatrix.getPageStats(page.pageX + 1, 0).x;
            }
            if (this.loopY) {
                page.pageY = this.fixedPage(page.pageY, this.pagesMatrix.pageLengthOfY - 2);
                page.y = this.pagesMatrix.getPageStats(0, page.pageY + 1).y;
            }
            return page;
        };
        SlidePages.prototype.fixedPage = function (page, realPageLen) {
            var pageIndex = [];
            for (var i = 0; i < realPageLen; i++) {
                pageIndex.push(i);
            }
            pageIndex.unshift(realPageLen - 1);
            pageIndex.push(0);
            return pageIndex[page];
        };
        SlidePages.prototype.getPageStats = function () {
            return this.pagesMatrix.getPageStats(this.currentPage.pageX, this.currentPage.pageY);
        };
        SlidePages.prototype.getValidPageIndex = function (x, y) {
            var lastX = this.pagesMatrix.pageLengthOfX - 1;
            var lastY = this.pagesMatrix.pageLengthOfY - 1;
            var firstX = 0;
            var firstY = 0;
            if (this.loopX) {
                x += 1;
                firstX = firstX + 1;
                lastX = lastX - 1;
            }
            if (this.loopY) {
                y += 1;
                firstY = firstY + 1;
                lastY = lastY - 1;
            }
            x = between(x, firstX, lastX);
            y = between(y, firstY, lastY);
            return {
                pageX: x,
                pageY: y,
            };
        };
        SlidePages.prototype.nextPageIndex = function () {
            return this.getPageIndexByDirection("positive" /* Positive */);
        };
        SlidePages.prototype.prevPageIndex = function () {
            return this.getPageIndexByDirection("negative" /* Negative */);
        };
        SlidePages.prototype.getNearestPage = function (x, y) {
            var pageIndex = this.pagesMatrix.getNearestPageIndex(x, y);
            var pageX = pageIndex.pageX, pageY = pageIndex.pageY;
            var newX = this.pagesMatrix.getPageStats(pageX, 0).x;
            var newY = this.pagesMatrix.getPageStats(0, pageY).y;
            return {
                x: newX,
                y: newY,
                pageX: pageX,
                pageY: pageY,
            };
        };
        SlidePages.prototype.getPageByDirection = function (page, directionX, directionY) {
            var pageX = page.pageX, pageY = page.pageY;
            if (pageX === this.currentPage.pageX) {
                pageX = between(pageX + directionX, 0, this.pagesMatrix.pageLengthOfX - 1);
            }
            if (pageY === this.currentPage.pageY) {
                pageY = between(pageY + directionY, 0, this.pagesMatrix.pageLengthOfY - 1);
            }
            var x = this.pagesMatrix.getPageStats(pageX, 0).x;
            var y = this.pagesMatrix.getPageStats(0, pageY).y;
            return {
                x: x,
                y: y,
                pageX: pageX,
                pageY: pageY,
            };
        };
        SlidePages.prototype.resetLoopPage = function () {
            if (this.loopX) {
                if (this.currentPage.pageX === 0) {
                    return {
                        pageX: this.pagesMatrix.pageLengthOfX - 2,
                        pageY: this.currentPage.pageY,
                    };
                }
                if (this.currentPage.pageX === this.pagesMatrix.pageLengthOfX - 1) {
                    return {
                        pageX: 1,
                        pageY: this.currentPage.pageY,
                    };
                }
            }
            if (this.loopY) {
                if (this.currentPage.pageY === 0) {
                    return {
                        pageX: this.currentPage.pageX,
                        pageY: this.pagesMatrix.pageLengthOfY - 2,
                    };
                }
                if (this.currentPage.pageY === this.pagesMatrix.pageLengthOfY - 1) {
                    return {
                        pageX: this.currentPage.pageX,
                        pageY: 1,
                    };
                }
            }
        };
        SlidePages.prototype.getPageIndexByDirection = function (direction) {
            var x = this.currentPage.pageX;
            var y = this.currentPage.pageY;
            if (this.slideX) {
                x = direction === "negative" /* Negative */ ? x - 1 : x + 1;
            }
            if (this.slideY) {
                y = direction === "negative" /* Negative */ ? y - 1 : y + 1;
            }
            return {
                pageX: x,
                pageY: y,
            };
        };
        SlidePages.prototype.checkSlideLoop = function () {
            this.wannaLoop = this.slideOptions.loop;
            if (this.pagesMatrix.pageLengthOfX > 1) {
                this.slideX = true;
            }
            else {
                this.slideX = false;
            }
            if (this.pagesMatrix.pages[0] && this.pagesMatrix.pageLengthOfY > 1) {
                this.slideY = true;
            }
            else {
                this.slideY = false;
            }
            this.loopX = this.wannaLoop && this.slideX;
            this.loopY = this.wannaLoop && this.slideY;
            if (this.slideX && this.slideY) {
                warn('slide does not support two direction at the same time.');
            }
        };
        return SlidePages;
    }());

    var sourcePrefix$4 = 'plugins.slide';
    var propertiesMap$4 = [
        {
            key: 'next',
            name: 'next',
        },
        {
            key: 'prev',
            name: 'prev',
        },
        {
            key: 'goToPage',
            name: 'goToPage',
        },
        {
            key: 'getCurrentPage',
            name: 'getCurrentPage',
        },
        {
            key: 'startPlay',
            name: 'startPlay',
        },
        {
            key: 'pausePlay',
            name: 'pausePlay',
        },
    ];
    var propertiesConfig$4 = propertiesMap$4.map(function (item) {
        return {
            key: item.key,
            sourceKey: sourcePrefix$4 + "." + item.name,
        };
    });

    var samePage = function (p1, p2) {
        return p1.pageX === p2.pageX && p1.pageY === p2.pageY;
    };
    var Slide = /** @class */ (function () {
        function Slide(scroll) {
            this.scroll = scroll;
            this.cachedClonedPageDOM = [];
            this.resetLooping = false;
            this.autoplayTimer = 0;
            if (!this.satisfyInitialization()) {
                return;
            }
            this.init();
        }
        Slide.prototype.satisfyInitialization = function () {
            if (this.scroll.scroller.content.children.length <= 0) {
                warn("slide need at least one slide page to be initialised." +
                    "please check your DOM layout.");
                return false;
            }
            return true;
        };
        Slide.prototype.init = function () {
            this.willChangeToPage = extend({}, BASE_PAGE);
            this.handleBScroll();
            this.handleOptions();
            this.handleHooks();
            this.createPages();
        };
        Slide.prototype.createPages = function () {
            this.pages = new SlidePages(this.scroll, this.options);
        };
        Slide.prototype.handleBScroll = function () {
            this.scroll.registerType(['slideWillChange', 'slidePageChanged']);
            this.scroll.proxy(propertiesConfig$4);
        };
        Slide.prototype.handleOptions = function () {
            var userOptions = (this.scroll.options.slide === true
                ? {}
                : this.scroll.options.slide);
            var defaultOptions = {
                loop: true,
                threshold: 0.1,
                speed: 400,
                easing: ease.bounce,
                listenFlick: true,
                autoplay: true,
                interval: 3000,
                startPageXIndex: 0,
                startPageYIndex: 0,
            };
            this.options = extend(defaultOptions, userOptions);
        };
        Slide.prototype.handleLoop = function (prevSlideContent) {
            var loop = this.options.loop;
            var slideContent = this.scroll.scroller.content;
            var currentSlidePagesLength = slideContent.children.length;
            // only should respect loop scene
            if (loop) {
                if (slideContent !== prevSlideContent) {
                    this.resetLoopChangedStatus();
                    this.removeClonedSlidePage(prevSlideContent);
                    currentSlidePagesLength > 1 &&
                        this.cloneFirstAndLastSlidePage(slideContent);
                }
                else {
                    // many pages reduce to one page
                    if (currentSlidePagesLength === 3 && this.initialised) {
                        this.removeClonedSlidePage(slideContent);
                        this.moreToOnePageInLoop = true;
                        this.oneToMorePagesInLoop = false;
                    }
                    else if (currentSlidePagesLength > 1) {
                        // one page increases to many page
                        if (this.initialised && this.cachedClonedPageDOM.length === 0) {
                            this.oneToMorePagesInLoop = true;
                            this.moreToOnePageInLoop = false;
                        }
                        else {
                            this.removeClonedSlidePage(slideContent);
                            this.resetLoopChangedStatus();
                        }
                        this.cloneFirstAndLastSlidePage(slideContent);
                    }
                    else {
                        this.resetLoopChangedStatus();
                    }
                }
            }
        };
        Slide.prototype.resetLoopChangedStatus = function () {
            this.moreToOnePageInLoop = false;
            this.oneToMorePagesInLoop = false;
        };
        Slide.prototype.handleHooks = function () {
            var _this = this;
            var scrollHooks = this.scroll.hooks;
            var scrollerHooks = this.scroll.scroller.hooks;
            var listenFlick = this.options.listenFlick;
            this.prevContent = this.scroll.scroller.content;
            this.hooksFn = [];
            // scroll
            this.registerHooks(this.scroll, this.scroll.eventTypes.beforeScrollStart, this.pausePlay);
            this.registerHooks(this.scroll, this.scroll.eventTypes.scrollEnd, this.modifyCurrentPage);
            this.registerHooks(this.scroll, this.scroll.eventTypes.scrollEnd, this.startPlay);
            // for mousewheel event
            if (this.scroll.eventTypes.mousewheelMove) {
                this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelMove, function () {
                    // prevent default action of mousewheelMove
                    return true;
                });
                this.registerHooks(this.scroll, this.scroll.eventTypes.mousewheelEnd, function (delta) {
                    if (delta.directionX === 1 /* Positive */ ||
                        delta.directionY === 1 /* Positive */) {
                        _this.next();
                    }
                    if (delta.directionX === -1 /* Negative */ ||
                        delta.directionY === -1 /* Negative */) {
                        _this.prev();
                    }
                });
            }
            // scrollHooks
            this.registerHooks(scrollHooks, scrollHooks.eventTypes.refresh, this.refreshHandler);
            this.registerHooks(scrollHooks, scrollHooks.eventTypes.destroy, this.destroy);
            // scroller
            this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.beforeRefresh, function () {
                _this.handleLoop(_this.prevContent);
                _this.setSlideInlineStyle();
            });
            this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.momentum, this.modifyScrollMetaHandler);
            this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.scroll, this.scrollHandler);
            // a click operation will clearTimer, so restart a new one
            this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.checkClick, this.startPlay);
            if (listenFlick) {
                this.registerHooks(scrollerHooks, scrollerHooks.eventTypes.flick, this.flickHandler);
            }
        };
        Slide.prototype.startPlay = function () {
            var _this = this;
            var _a = this.options, interval = _a.interval, autoplay = _a.autoplay;
            if (autoplay) {
                clearTimeout(this.autoplayTimer);
                this.autoplayTimer = window.setTimeout(function () {
                    _this.next();
                }, interval);
            }
        };
        Slide.prototype.pausePlay = function () {
            if (this.options.autoplay) {
                clearTimeout(this.autoplayTimer);
            }
        };
        Slide.prototype.setSlideInlineStyle = function () {
            var styleConfigurations = [
                {
                    direction: 'scrollX',
                    sizeType: 'offsetWidth',
                    styleType: 'width',
                },
                {
                    direction: 'scrollY',
                    sizeType: 'offsetHeight',
                    styleType: 'height',
                },
            ];
            var _a = this.scroll.scroller, slideContent = _a.content, slideWrapper = _a.wrapper;
            var scrollOptions = this.scroll.options;
            styleConfigurations.forEach(function (_a) {
                var direction = _a.direction, sizeType = _a.sizeType, styleType = _a.styleType;
                // wanna scroll in this direction
                if (scrollOptions[direction]) {
                    var size = slideWrapper[sizeType];
                    var children = slideContent.children;
                    var length_1 = children.length;
                    for (var i = 0; i < length_1; i++) {
                        var slidePageDOM = children[i];
                        slidePageDOM.style[styleType] = size + 'px';
                    }
                    slideContent.style[styleType] = size * length_1 + 'px';
                }
            });
        };
        Slide.prototype.next = function (time, easing) {
            var _a = this.pages.nextPageIndex(), pageX = _a.pageX, pageY = _a.pageY;
            this.goTo(pageX, pageY, time, easing);
        };
        Slide.prototype.prev = function (time, easing) {
            var _a = this.pages.prevPageIndex(), pageX = _a.pageX, pageY = _a.pageY;
            this.goTo(pageX, pageY, time, easing);
        };
        Slide.prototype.goToPage = function (pageX, pageY, time, easing) {
            var pageIndex = this.pages.getValidPageIndex(pageX, pageY);
            this.goTo(pageIndex.pageX, pageIndex.pageY, time, easing);
        };
        Slide.prototype.getCurrentPage = function () {
            return this.exposedPage || this.pages.getInitialPage(false, true);
        };
        Slide.prototype.setCurrentPage = function (page) {
            this.pages.setCurrentPage(page);
            this.exposedPage = this.pages.getExposedPage(page);
        };
        Slide.prototype.nearestPage = function (x, y) {
            var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
            var maxScrollPosX = scrollBehaviorX.maxScrollPos, minScrollPosX = scrollBehaviorX.minScrollPos;
            var maxScrollPosY = scrollBehaviorY.maxScrollPos, minScrollPosY = scrollBehaviorY.minScrollPos;
            return this.pages.getNearestPage(between(x, maxScrollPosX, minScrollPosX), between(y, maxScrollPosY, minScrollPosY));
        };
        Slide.prototype.satisfyThreshold = function (x, y) {
            var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
            var satisfied = true;
            if (Math.abs(x - scrollBehaviorX.absStartPos) <= this.thresholdX &&
                Math.abs(y - scrollBehaviorY.absStartPos) <= this.thresholdY) {
                satisfied = false;
            }
            return satisfied;
        };
        Slide.prototype.refreshHandler = function (content) {
            var _this = this;
            if (!this.satisfyInitialization()) {
                return;
            }
            this.pages.refresh();
            this.computeThreshold();
            var contentChanged = (this.contentChanged = this.prevContent !== content);
            if (contentChanged) {
                this.prevContent = content;
            }
            var initPage = this.pages.getInitialPage(this.oneToMorePagesInLoop || this.moreToOnePageInLoop, contentChanged || !this.initialised);
            if (this.initialised) {
                this.goTo(initPage.pageX, initPage.pageY, 0);
            }
            else {
                this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.beforeInitialScrollTo, function (position) {
                    _this.initialised = true;
                    position.x = initPage.x;
                    position.y = initPage.y;
                });
            }
            this.startPlay();
        };
        Slide.prototype.computeThreshold = function () {
            var threshold = this.options.threshold;
            // Integer
            if (threshold % 1 === 0) {
                this.thresholdX = threshold;
                this.thresholdY = threshold;
            }
            else {
                // decimal
                var _a = this.pages.getPageStats(), width = _a.width, height = _a.height;
                this.thresholdX = Math.round(width * threshold);
                this.thresholdY = Math.round(height * threshold);
            }
        };
        Slide.prototype.cloneFirstAndLastSlidePage = function (slideContent) {
            var children = slideContent.children;
            var preprendDOM = children[children.length - 1].cloneNode(true);
            var appendDOM = children[0].cloneNode(true);
            prepend(preprendDOM, slideContent);
            slideContent.appendChild(appendDOM);
            this.cachedClonedPageDOM = [preprendDOM, appendDOM];
        };
        Slide.prototype.removeClonedSlidePage = function (slideContent) {
            // maybe slideContent has removed from DOM Tree
            var slidePages = (slideContent && slideContent.children) || [];
            if (slidePages.length) {
                this.cachedClonedPageDOM.forEach(function (el) {
                    removeChild(slideContent, el);
                });
            }
            this.cachedClonedPageDOM = [];
        };
        Slide.prototype.modifyCurrentPage = function (point) {
            var _a = this.getCurrentPage(), prevExposedPageX = _a.pageX, prevExposedPageY = _a.pageY;
            var newPage = this.nearestPage(point.x, point.y);
            this.setCurrentPage(newPage);
            /* istanbul ignore if */
            if (this.contentChanged) {
                this.contentChanged = false;
                return true;
            }
            var _b = this.getCurrentPage(), currentExposedPageX = _b.pageX, currentExposedPageY = _b.pageY;
            this.pageWillChangeTo(newPage);
            // loop is true, and one page becomes many pages when call bs.refresh
            if (this.oneToMorePagesInLoop) {
                this.oneToMorePagesInLoop = false;
                return true;
            }
            // loop is true, and many page becomes one page when call bs.refresh
            // if prevPage > 0, dispatch slidePageChanged and scrollEnd events
            /* istanbul ignore if */
            if (this.moreToOnePageInLoop &&
                prevExposedPageX === 0 &&
                prevExposedPageY === 0) {
                this.moreToOnePageInLoop = false;
                return true;
            }
            if (prevExposedPageX !== currentExposedPageX ||
                prevExposedPageY !== currentExposedPageY) {
                // only trust pageX & pageY when loop is true
                var page = this.pages.getExposedPageByPageIndex(currentExposedPageX, currentExposedPageY);
                this.scroll.trigger(this.scroll.eventTypes.slidePageChanged, page);
            }
            // triggered by resetLoop
            if (this.resetLooping) {
                this.resetLooping = false;
                return;
            }
            var changePage = this.pages.resetLoopPage();
            if (changePage) {
                this.resetLooping = true;
                this.goTo(changePage.pageX, changePage.pageY, 0);
                // stop user's scrollEnd
                // since it is a seamless scroll
                return true;
            }
        };
        Slide.prototype.goTo = function (pageX, pageY, time, easing) {
            var newPage = this.pages.getInternalPage(pageX, pageY);
            var scrollEasing = easing || this.options.easing || ease.bounce;
            var x = newPage.x, y = newPage.y;
            var deltaX = x - this.scroll.scroller.scrollBehaviorX.currentPos;
            var deltaY = y - this.scroll.scroller.scrollBehaviorY.currentPos;
            /* istanbul ignore if */
            if (!deltaX && !deltaY) {
                this.scroll.scroller.togglePointerEvents(true);
                return;
            }
            time = time === undefined ? this.getEaseTime(deltaX, deltaY) : time;
            this.scroll.scroller.scrollTo(x, y, time, scrollEasing);
        };
        Slide.prototype.flickHandler = function () {
            var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
            var currentPosX = scrollBehaviorX.currentPos, startPosX = scrollBehaviorX.startPos, directionX = scrollBehaviorX.direction;
            var currentPosY = scrollBehaviorY.currentPos, startPosY = scrollBehaviorY.startPos, directionY = scrollBehaviorY.direction;
            var _b = this.pages.currentPage, pageX = _b.pageX, pageY = _b.pageY;
            var time = this.getEaseTime(currentPosX - startPosX, currentPosY - startPosY);
            this.goTo(pageX + directionX, pageY + directionY, time);
        };
        Slide.prototype.getEaseTime = function (deltaX, deltaY) {
            return (this.options.speed ||
                Math.max(Math.max(Math.min(Math.abs(deltaX), 1000), Math.min(Math.abs(deltaY), 1000)), 300));
        };
        Slide.prototype.modifyScrollMetaHandler = function (scrollMeta) {
            var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY, animater = _a.animater;
            var newX = scrollMeta.newX;
            var newY = scrollMeta.newY;
            var newPage = this.satisfyThreshold(newX, newY) || animater.forceStopped
                ? this.pages.getPageByDirection(this.nearestPage(newX, newY), scrollBehaviorX.direction, scrollBehaviorY.direction)
                : this.pages.currentPage;
            scrollMeta.time = this.getEaseTime(scrollMeta.newX - newPage.x, scrollMeta.newY - newPage.y);
            scrollMeta.newX = newPage.x;
            scrollMeta.newY = newPage.y;
            scrollMeta.easing = this.options.easing || ease.bounce;
        };
        Slide.prototype.scrollHandler = function (_a) {
            var x = _a.x, y = _a.y;
            if (this.satisfyThreshold(x, y)) {
                var newPage = this.nearestPage(x, y);
                this.pageWillChangeTo(newPage);
            }
        };
        Slide.prototype.pageWillChangeTo = function (newPage) {
            var changeToPage = this.pages.getWillChangedPage(newPage);
            if (!samePage(this.willChangeToPage, changeToPage)) {
                this.willChangeToPage = changeToPage;
                this.scroll.trigger(this.scroll.eventTypes.slideWillChange, this.willChangeToPage);
            }
        };
        Slide.prototype.registerHooks = function (hooks, name, handler) {
            hooks.on(name, handler, this);
            this.hooksFn.push([hooks, name, handler]);
        };
        Slide.prototype.destroy = function () {
            var slideContent = this.scroll.scroller.content;
            var _a = this.options, loop = _a.loop, autoplay = _a.autoplay;
            if (loop) {
                this.removeClonedSlidePage(slideContent);
            }
            if (autoplay) {
                clearTimeout(this.autoplayTimer);
            }
            this.hooksFn.forEach(function (item) {
                var hooks = item[0];
                var hooksName = item[1];
                var handlerFn = item[2];
                if (hooks.eventTypes[hooksName]) {
                    hooks.off(hooksName, handlerFn);
                }
            });
            this.hooksFn.length = 0;
        };
        Slide.pluginName = 'slide';
        return Slide;
    }());

    var sourcePrefix$3 = 'plugins.wheel';
    var propertiesMap$3 = [
        {
            key: 'wheelTo',
            name: 'wheelTo',
        },
        {
            key: 'getSelectedIndex',
            name: 'getSelectedIndex',
        },
        {
            key: 'restorePosition',
            name: 'restorePosition',
        },
    ];
    var propertiesConfig$3 = propertiesMap$3.map(function (item) {
        return {
            key: item.key,
            sourceKey: sourcePrefix$3 + "." + item.name,
        };
    });

    var WHEEL_INDEX_CHANGED_EVENT_NAME = 'wheelIndexChanged';
    var CONSTANTS = {
        rate: 4
    };
    var Wheel = /** @class */ (function () {
        function Wheel(scroll) {
            this.scroll = scroll;
            this.init();
        }
        Wheel.prototype.init = function () {
            this.handleBScroll();
            this.handleOptions();
            this.handleHooks();
            // init boundary for Wheel
            this.refreshBoundary();
            this.setSelectedIndex(this.options.selectedIndex);
        };
        Wheel.prototype.handleBScroll = function () {
            this.scroll.proxy(propertiesConfig$3);
            this.scroll.registerType([WHEEL_INDEX_CHANGED_EVENT_NAME]);
        };
        Wheel.prototype.handleOptions = function () {
            var userOptions = (this.scroll.options.wheel === true
                ? {}
                : this.scroll.options.wheel);
            var defaultOptions = {
                wheelWrapperClass: 'wheel-scroll',
                wheelItemClass: 'wheel-item',
                rotate: 25,
                adjustTime: 400,
                selectedIndex: 0,
                wheelDisabledItemClass: 'wheel-disabled-item'
            };
            this.options = extend(defaultOptions, userOptions);
        };
        Wheel.prototype.handleHooks = function () {
            var _this = this;
            var scroll = this.scroll;
            var scroller = this.scroll.scroller;
            var actionsHandler = scroller.actionsHandler, scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY, animater = scroller.animater;
            var prevContent = scroller.content;
            // BScroll
            scroll.on(scroll.eventTypes.scrollEnd, function (position) {
                var index = _this.findNearestValidWheel(position.y).index;
                if (scroller.animater.forceStopped && !_this.isAdjustingPosition) {
                    _this.target = _this.items[index];
                    // since stopped from an animation.
                    // prevent user's scrollEnd callback triggered twice
                    return true;
                }
                else {
                    _this.setSelectedIndex(index);
                    if (_this.isAdjustingPosition) {
                        _this.isAdjustingPosition = false;
                    }
                }
            });
            // BScroll.hooks
            this.scroll.hooks.on(this.scroll.hooks.eventTypes.refresh, function (content) {
                if (content !== prevContent) {
                    prevContent = content;
                    _this.setSelectedIndex(_this.options.selectedIndex, true);
                }
                // rotate all wheel-items
                // because position may not change
                _this.rotateX(_this.scroll.y);
                // check we are stop at a disable item or not
                _this.wheelTo(_this.selectedIndex, 0);
            });
            this.scroll.hooks.on(this.scroll.hooks.eventTypes.beforeInitialScrollTo, function (position) {
                // selectedIndex has higher priority than bs.options.startY
                position.x = 0;
                position.y = -(_this.selectedIndex * _this.itemHeight);
            });
            // Scroller
            scroller.hooks.on(scroller.hooks.eventTypes.checkClick, function () {
                var index = HTMLCollectionToArray(_this.items).indexOf(_this.target);
                if (index === -1)
                    return true;
                _this.wheelTo(index, _this.options.adjustTime, ease.swipe);
                return true;
            });
            scroller.hooks.on(scroller.hooks.eventTypes.scrollTo, function (endPoint) {
                endPoint.y = _this.findNearestValidWheel(endPoint.y).y;
            });
            // when content is scrolling
            // click wheel-item DOM repeatedly and crazily will cause scrollEnd not triggered
            // so reset forceStopped
            scroller.hooks.on(scroller.hooks.eventTypes.minDistanceScroll, function () {
                var animater = scroller.animater;
                if (animater.forceStopped === true) {
                    animater.forceStopped = false;
                }
            });
            scroller.hooks.on(scroller.hooks.eventTypes.scrollToElement, function (el, pos) {
                if (!hasClass(el, _this.options.wheelItemClass)) {
                    return true;
                }
                else {
                    pos.top = _this.findNearestValidWheel(pos.top).y;
                }
            });
            // ActionsHandler
            actionsHandler.hooks.on(actionsHandler.hooks.eventTypes.beforeStart, function (e) {
                _this.target = e.target;
            });
            // ScrollBehaviorX
            // Wheel has no x direction now
            scrollBehaviorX.hooks.on(scrollBehaviorX.hooks.eventTypes.computeBoundary, function (boundary) {
                boundary.maxScrollPos = 0;
                boundary.minScrollPos = 0;
            });
            // ScrollBehaviorY
            scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.computeBoundary, function (boundary) {
                _this.items = _this.scroll.scroller.content.children;
                _this.checkWheelAllDisabled();
                _this.itemHeight =
                    _this.items.length > 0
                        ? scrollBehaviorY.contentSize / _this.items.length
                        : 0;
                boundary.maxScrollPos = -_this.itemHeight * (_this.items.length - 1);
                boundary.minScrollPos = 0;
            });
            scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.momentum, function (momentumInfo) {
                momentumInfo.rate = CONSTANTS.rate;
                momentumInfo.destination = _this.findNearestValidWheel(momentumInfo.destination).y;
            });
            scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.end, function (momentumInfo) {
                var validWheel = _this.findNearestValidWheel(scrollBehaviorY.currentPos);
                momentumInfo.destination = validWheel.y;
                momentumInfo.duration = _this.options.adjustTime;
            });
            // Animater
            animater.hooks.on(animater.hooks.eventTypes.time, function (time) {
                _this.transitionDuration(time);
            });
            animater.hooks.on(animater.hooks.eventTypes.timeFunction, function (easing) {
                _this.timeFunction(easing);
            });
            // bs.stop() to make wheel stop at a correct position when pending
            animater.hooks.on(animater.hooks.eventTypes.callStop, function () {
                var index = _this.findNearestValidWheel(_this.scroll.y).index;
                _this.isAdjustingPosition = true;
                _this.wheelTo(index, 0);
            });
            // Translater
            animater.translater.hooks.on(animater.translater.hooks.eventTypes.translate, function (endPoint) {
                _this.rotateX(endPoint.y);
            });
        };
        Wheel.prototype.refreshBoundary = function () {
            var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY, content = _a.content;
            scrollBehaviorX.refresh(content);
            scrollBehaviorY.refresh(content);
        };
        Wheel.prototype.setSelectedIndex = function (index, contentChanged) {
            if (contentChanged === void 0) { contentChanged = false; }
            var prevSelectedIndex = this.selectedIndex;
            this.selectedIndex = index;
            // if content DOM changed, should not trigger event
            if (prevSelectedIndex !== index && !contentChanged) {
                this.scroll.trigger(WHEEL_INDEX_CHANGED_EVENT_NAME, index);
            }
        };
        Wheel.prototype.getSelectedIndex = function () {
            return this.selectedIndex;
        };
        Wheel.prototype.wheelTo = function (index, time, ease) {
            if (index === void 0) { index = 0; }
            if (time === void 0) { time = 0; }
            var y = -index * this.itemHeight;
            this.scroll.scrollTo(0, y, time, ease);
        };
        Wheel.prototype.restorePosition = function () {
            // bs is scrolling
            var isPending = this.scroll.pending;
            if (isPending) {
                var selectedIndex = this.getSelectedIndex();
                this.scroll.scroller.animater.clearTimer();
                this.wheelTo(selectedIndex, 0);
            }
        };
        Wheel.prototype.transitionDuration = function (time) {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].style[style.transitionDuration] =
                    time + 'ms';
            }
        };
        Wheel.prototype.timeFunction = function (easing) {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].style[style.transitionTimingFunction] = easing;
            }
        };
        Wheel.prototype.rotateX = function (y) {
            var _a = this.options.rotate, rotate = _a === void 0 ? 25 : _a;
            for (var i = 0; i < this.items.length; i++) {
                var deg = rotate * (y / this.itemHeight + i);
                // Too small value is invalid in some phones, issue 1026
                var SafeDeg = deg.toFixed(3);
                this.items[i].style[style.transform] = "rotateX(" + SafeDeg + "deg)";
            }
        };
        Wheel.prototype.findNearestValidWheel = function (y) {
            y = y > 0 ? 0 : y < this.scroll.maxScrollY ? this.scroll.maxScrollY : y;
            var currentIndex = Math.abs(Math.round(-y / this.itemHeight));
            var cacheIndex = currentIndex;
            var items = this.items;
            var wheelDisabledItemClassName = this.options
                .wheelDisabledItemClass;
            // implement web native select element
            // first, check whether there is a enable item whose index is smaller than currentIndex
            // then, check whether there is a enable item whose index is bigger than currentIndex
            // otherwise, there are all disabled items, just keep currentIndex unchange
            while (currentIndex >= 0) {
                if (!hasClass(items[currentIndex], wheelDisabledItemClassName)) {
                    break;
                }
                currentIndex--;
            }
            if (currentIndex < 0) {
                currentIndex = cacheIndex;
                while (currentIndex <= items.length - 1) {
                    if (!hasClass(items[currentIndex], wheelDisabledItemClassName)) {
                        break;
                    }
                    currentIndex++;
                }
            }
            // keep it unchange when all the items are disabled
            if (currentIndex === items.length) {
                currentIndex = cacheIndex;
            }
            // when all the items are disabled, selectedIndex should always be -1
            return {
                index: this.wheelItemsAllDisabled ? -1 : currentIndex,
                y: -currentIndex * this.itemHeight
            };
        };
        Wheel.prototype.checkWheelAllDisabled = function () {
            var wheelDisabledItemClassName = this.options.wheelDisabledItemClass;
            var items = this.items;
            this.wheelItemsAllDisabled = true;
            for (var i = 0; i < items.length; i++) {
                if (!hasClass(items[i], wheelDisabledItemClassName)) {
                    this.wheelItemsAllDisabled = false;
                    break;
                }
            }
        };
        Wheel.pluginName = 'wheel';
        return Wheel;
    }());

    var sourcePrefix$2 = 'plugins.zoom';
    var propertiesMap$2 = [
        {
            key: 'zoomTo',
            name: 'zoomTo'
        }
    ];
    var propertiesConfig$2 = propertiesMap$2.map(function (item) {
        return {
            key: item.key,
            sourceKey: sourcePrefix$2 + "." + item.name
        };
    });

    var TWO_FINGERS = 2;
    var RAW_SCALE = 1;
    var Zoom = /** @class */ (function () {
        function Zoom(scroll) {
            this.scroll = scroll;
            this.scale = RAW_SCALE;
            this.prevScale = 1;
            this.init();
        }
        Zoom.prototype.init = function () {
            this.handleBScroll();
            this.handleOptions();
            this.handleHooks();
            this.tryInitialZoomTo(this.zoomOpt);
        };
        Zoom.prototype.zoomTo = function (scale, x, y, bounceTime) {
            var _a = this.resolveOrigin(x, y), originX = _a.originX, originY = _a.originY;
            var origin = {
                x: originX,
                y: originY,
                baseScale: this.scale,
            };
            this._doZoomTo(scale, origin, bounceTime, true);
        };
        Zoom.prototype.handleBScroll = function () {
            this.scroll.proxy(propertiesConfig$2);
            this.scroll.registerType([
                'beforeZoomStart',
                'zoomStart',
                'zooming',
                'zoomEnd',
            ]);
        };
        Zoom.prototype.handleOptions = function () {
            var userOptions = (this.scroll.options.zoom === true
                ? {}
                : this.scroll.options.zoom);
            var defaultOptions = {
                start: 1,
                min: 1,
                max: 4,
                initialOrigin: [0, 0],
                minimalZoomDistance: 5,
                bounceTime: 800,
            };
            this.zoomOpt = extend(defaultOptions, userOptions);
        };
        Zoom.prototype.handleHooks = function () {
            var _this = this;
            var scroll = this.scroll;
            var scroller = this.scroll.scroller;
            this.wrapper = this.scroll.scroller.wrapper;
            this.setTransformOrigin(this.scroll.scroller.content);
            var scrollBehaviorX = scroller.scrollBehaviorX;
            var scrollBehaviorY = scroller.scrollBehaviorY;
            this.hooksFn = [];
            // BScroll
            this.registerHooks(scroll.hooks, scroll.hooks.eventTypes.contentChanged, function (content) {
                _this.setTransformOrigin(content);
                _this.scale = RAW_SCALE;
                _this.tryInitialZoomTo(_this.zoomOpt);
            });
            this.registerHooks(scroll.hooks, scroll.hooks.eventTypes.beforeInitialScrollTo, function () {
                // if perform a zoom action, we should prevent initial scroll when initialised
                if (_this.zoomOpt.start !== RAW_SCALE) {
                    return true;
                }
            });
            // enlarge boundary
            this.registerHooks(scrollBehaviorX.hooks, scrollBehaviorX.hooks.eventTypes.beforeComputeBoundary, function () {
                // content may change, don't cache it's size
                var contentSize = getRect(_this.scroll.scroller.content);
                scrollBehaviorX.contentSize = Math.floor(contentSize.width * _this.scale);
            });
            this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.beforeComputeBoundary, function () {
                // content may change, don't cache it's size
                var contentSize = getRect(_this.scroll.scroller.content);
                scrollBehaviorY.contentSize = Math.floor(contentSize.height * _this.scale);
            });
            // touch event
            this.registerHooks(scroller.actions.hooks, scroller.actions.hooks.eventTypes.start, function (e) {
                var numberOfFingers = (e.touches && e.touches.length) || 0;
                _this.fingersOperation(numberOfFingers);
                if (numberOfFingers === TWO_FINGERS) {
                    _this.zoomStart(e);
                }
            });
            this.registerHooks(scroller.actions.hooks, scroller.actions.hooks.eventTypes.beforeMove, function (e) {
                var numberOfFingers = (e.touches && e.touches.length) || 0;
                _this.fingersOperation(numberOfFingers);
                if (numberOfFingers === TWO_FINGERS) {
                    _this.zoom(e);
                    return true;
                }
            });
            this.registerHooks(scroller.actions.hooks, scroller.actions.hooks.eventTypes.beforeEnd, function (e) {
                var numberOfFingers = _this.fingersOperation();
                if (numberOfFingers === TWO_FINGERS) {
                    _this.zoomEnd();
                    return true;
                }
            });
            this.registerHooks(scroller.translater.hooks, scroller.translater.hooks.eventTypes.beforeTranslate, function (transformStyle, point) {
                var scale = point.scale ? point.scale : _this.prevScale;
                _this.prevScale = scale;
                transformStyle.push("scale(" + scale + ")");
            });
            this.registerHooks(scroller.hooks, scroller.hooks.eventTypes.scrollEnd, function () {
                if (_this.fingersOperation() === TWO_FINGERS) {
                    _this.scroll.trigger(_this.scroll.eventTypes.zoomEnd, {
                        scale: _this.scale,
                    });
                }
            });
            this.registerHooks(this.scroll.hooks, 'destroy', this.destroy);
        };
        Zoom.prototype.setTransformOrigin = function (content) {
            content.style[style.transformOrigin] = '0 0';
        };
        Zoom.prototype.tryInitialZoomTo = function (options) {
            var start = options.start, initialOrigin = options.initialOrigin;
            var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
            if (start !== RAW_SCALE) {
                // Movable plugin may wanna modify minScrollPos or maxScrollPos
                // so we force Movable to caculate them
                this.resetBoundaries([scrollBehaviorX, scrollBehaviorY]);
                this.zoomTo(start, initialOrigin[0], initialOrigin[1], 0);
            }
        };
        // getter or setter operation
        Zoom.prototype.fingersOperation = function (amounts) {
            if (typeof amounts === 'number') {
                this.numberOfFingers = amounts;
            }
            else {
                return this.numberOfFingers;
            }
        };
        Zoom.prototype._doZoomTo = function (scale, origin, time, useCurrentPos) {
            var _this = this;
            if (time === void 0) { time = this.zoomOpt.bounceTime; }
            if (useCurrentPos === void 0) { useCurrentPos = false; }
            var _a = this.zoomOpt, min = _a.min, max = _a.max;
            var fromScale = this.scale;
            var toScale = between(scale, min, max);
            (function () {
                if (time === 0) {
                    _this.scroll.trigger(_this.scroll.eventTypes.zooming, {
                        scale: toScale,
                    });
                    return;
                }
                if (time > 0) {
                    var timer_1;
                    var startTime_1 = getNow();
                    var endTime_1 = startTime_1 + time;
                    var scheduler_1 = function () {
                        var now = getNow();
                        if (now >= endTime_1) {
                            _this.scroll.trigger(_this.scroll.eventTypes.zooming, {
                                scale: toScale,
                            });
                            cancelAnimationFrame(timer_1);
                            return;
                        }
                        var ratio = ease.bounce.fn((now - startTime_1) / time);
                        var currentScale = ratio * (toScale - fromScale) + fromScale;
                        _this.scroll.trigger(_this.scroll.eventTypes.zooming, {
                            scale: currentScale,
                        });
                        timer_1 = requestAnimationFrame(scheduler_1);
                    };
                    // start scheduler job
                    scheduler_1();
                }
            })();
            // suppose you are zooming by two fingers
            this.fingersOperation(2);
            this._zoomTo(toScale, fromScale, origin, time, useCurrentPos);
        };
        Zoom.prototype._zoomTo = function (toScale, fromScale, origin, time, useCurrentPos) {
            if (useCurrentPos === void 0) { useCurrentPos = false; }
            var ratio = toScale / origin.baseScale;
            this.setScale(toScale);
            var scroller = this.scroll.scroller;
            var scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY;
            this.resetBoundaries([scrollBehaviorX, scrollBehaviorY]);
            // position is restrained in boundary
            var newX = this.getNewPos(origin.x, ratio, scrollBehaviorX, true, useCurrentPos);
            var newY = this.getNewPos(origin.y, ratio, scrollBehaviorY, true, useCurrentPos);
            if (scrollBehaviorX.currentPos !== Math.round(newX) ||
                scrollBehaviorY.currentPos !== Math.round(newY) ||
                toScale !== fromScale) {
                scroller.scrollTo(newX, newY, time, ease.bounce, {
                    start: {
                        scale: fromScale,
                    },
                    end: {
                        scale: toScale,
                    },
                });
            }
        };
        Zoom.prototype.resolveOrigin = function (x, y) {
            var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
            var resolveFormula = {
                left: function () {
                    return 0;
                },
                top: function () {
                    return 0;
                },
                right: function () {
                    return scrollBehaviorX.contentSize;
                },
                bottom: function () {
                    return scrollBehaviorY.contentSize;
                },
                center: function (index) {
                    var baseSize = index === 0
                        ? scrollBehaviorX.contentSize
                        : scrollBehaviorY.contentSize;
                    return baseSize / 2;
                },
            };
            return {
                originX: typeof x === 'number' ? x : resolveFormula[x](0),
                originY: typeof y === 'number' ? y : resolveFormula[y](1),
            };
        };
        Zoom.prototype.zoomStart = function (e) {
            var firstFinger = e.touches[0];
            var secondFinger = e.touches[1];
            this.startDistance = this.getFingerDistance(e);
            this.startScale = this.scale;
            var _a = offsetToBody(this.wrapper), left = _a.left, top = _a.top;
            this.origin = {
                x: Math.abs(firstFinger.pageX + secondFinger.pageX) / 2 +
                    left -
                    this.scroll.x,
                y: Math.abs(firstFinger.pageY + secondFinger.pageY) / 2 +
                    top -
                    this.scroll.y,
                baseScale: this.startScale,
            };
            this.scroll.trigger(this.scroll.eventTypes.beforeZoomStart);
        };
        Zoom.prototype.zoom = function (e) {
            var currentDistance = this.getFingerDistance(e);
            // at least minimalZoomDistance pixels for the zoom to initiate
            if (!this.zoomed &&
                Math.abs(currentDistance - this.startDistance) <
                    this.zoomOpt.minimalZoomDistance) {
                return;
            }
            // when out of boundary , perform a damping algorithm
            var endScale = this.dampingScale((currentDistance / this.startDistance) * this.startScale);
            var ratio = endScale / this.startScale;
            this.setScale(endScale);
            if (!this.zoomed) {
                this.zoomed = true;
                this.scroll.trigger(this.scroll.eventTypes.zoomStart);
            }
            var scroller = this.scroll.scroller;
            var scrollBehaviorX = scroller.scrollBehaviorX, scrollBehaviorY = scroller.scrollBehaviorY;
            var x = this.getNewPos(this.origin.x, ratio, scrollBehaviorX, false, false);
            var y = this.getNewPos(this.origin.y, ratio, scrollBehaviorY, false, false);
            this.scroll.trigger(this.scroll.eventTypes.zooming, {
                scale: this.scale,
            });
            scroller.translater.translate({ x: x, y: y, scale: endScale });
        };
        Zoom.prototype.zoomEnd = function () {
            if (!this.zoomed)
                return;
            // if out of boundary, do rebound!
            if (this.shouldRebound()) {
                this._doZoomTo(this.scale, this.origin, this.zoomOpt.bounceTime);
                return;
            }
            this.scroll.trigger(this.scroll.eventTypes.zoomEnd, { scale: this.scale });
        };
        Zoom.prototype.getFingerDistance = function (e) {
            var firstFinger = e.touches[0];
            var secondFinger = e.touches[1];
            var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
            var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);
            return getDistance(deltaX, deltaY);
        };
        Zoom.prototype.shouldRebound = function () {
            var _a = this.zoomOpt, min = _a.min, max = _a.max;
            var currentScale = this.scale;
            // scale exceeded!
            if (currentScale !== between(currentScale, min, max)) {
                return true;
            }
            var _b = this.scroll.scroller, scrollBehaviorX = _b.scrollBehaviorX, scrollBehaviorY = _b.scrollBehaviorY;
            // enlarge boundaries manually when zoom is end
            this.resetBoundaries([scrollBehaviorX, scrollBehaviorY]);
            var xInBoundary = scrollBehaviorX.checkInBoundary().inBoundary;
            var yInBoundary = scrollBehaviorX.checkInBoundary().inBoundary;
            return !(xInBoundary && yInBoundary);
        };
        Zoom.prototype.dampingScale = function (scale) {
            var _a = this.zoomOpt, min = _a.min, max = _a.max;
            if (scale < min) {
                scale = 0.5 * min * Math.pow(2.0, scale / min);
            }
            else if (scale > max) {
                scale = 2.0 * max * Math.pow(0.5, max / scale);
            }
            return scale;
        };
        Zoom.prototype.setScale = function (scale) {
            this.scale = scale;
        };
        Zoom.prototype.resetBoundaries = function (scrollBehaviorPairs) {
            scrollBehaviorPairs.forEach(function (behavior) { return behavior.computeBoundary(); });
        };
        Zoom.prototype.getNewPos = function (origin, lastScale, scrollBehavior, shouldInBoundary, useCurrentPos) {
            if (useCurrentPos === void 0) { useCurrentPos = false; }
            var newPos = origin -
                origin * lastScale +
                (useCurrentPos ? scrollBehavior.currentPos : scrollBehavior.startPos);
            if (shouldInBoundary) {
                newPos = between(newPos, scrollBehavior.maxScrollPos, scrollBehavior.minScrollPos);
            }
            // maxScrollPos or minScrollPos maybe a negative or positive digital
            return newPos > 0 ? Math.floor(newPos) : Math.ceil(newPos);
        };
        Zoom.prototype.registerHooks = function (hooks, name, handler) {
            hooks.on(name, handler, this);
            this.hooksFn.push([hooks, name, handler]);
        };
        Zoom.prototype.destroy = function () {
            this.hooksFn.forEach(function (item) {
                var hooks = item[0];
                var hooksName = item[1];
                var handlerFn = item[2];
                hooks.off(hooksName, handlerFn);
            });
            this.hooksFn.length = 0;
        };
        Zoom.pluginName = 'zoom';
        return Zoom;
    }());

    var BScrollFamily = /** @class */ (function () {
        function BScrollFamily(scroll) {
            this.ancestors = [];
            this.descendants = [];
            this.hooksManager = [];
            this.analyzed = false;
            this.selfScroll = scroll;
        }
        BScrollFamily.create = function (scroll) {
            return new BScrollFamily(scroll);
        };
        BScrollFamily.prototype.hasAncestors = function (bscrollFamily) {
            var index = findIndex(this.ancestors, function (_a) {
                var item = _a[0];
                return item === bscrollFamily;
            });
            return index > -1;
        };
        BScrollFamily.prototype.hasDescendants = function (bscrollFamily) {
            var index = findIndex(this.descendants, function (_a) {
                var item = _a[0];
                return item === bscrollFamily;
            });
            return index > -1;
        };
        BScrollFamily.prototype.addAncestor = function (bscrollFamily, distance) {
            var ancestors = this.ancestors;
            ancestors.push([bscrollFamily, distance]);
            // by ascend
            ancestors.sort(function (a, b) {
                return a[1] - b[1];
            });
        };
        BScrollFamily.prototype.addDescendant = function (bscrollFamily, distance) {
            var descendants = this.descendants;
            descendants.push([bscrollFamily, distance]);
            // by ascend
            descendants.sort(function (a, b) {
                return a[1] - b[1];
            });
        };
        BScrollFamily.prototype.removeAncestor = function (bscrollFamily) {
            var ancestors = this.ancestors;
            if (ancestors.length) {
                var index = findIndex(this.ancestors, function (_a) {
                    var item = _a[0];
                    return item === bscrollFamily;
                });
                if (index > -1) {
                    return ancestors.splice(index, 1);
                }
            }
        };
        BScrollFamily.prototype.removeDescendant = function (bscrollFamily) {
            var descendants = this.descendants;
            if (descendants.length) {
                var index = findIndex(this.descendants, function (_a) {
                    var item = _a[0];
                    return item === bscrollFamily;
                });
                if (index > -1) {
                    return descendants.splice(index, 1);
                }
            }
        };
        BScrollFamily.prototype.registerHooks = function (hook, eventType, handler) {
            hook.on(eventType, handler);
            this.hooksManager.push([hook, eventType, handler]);
        };
        BScrollFamily.prototype.setAnalyzed = function (flag) {
            if (flag === void 0) { flag = false; }
            this.analyzed = flag;
        };
        BScrollFamily.prototype.purge = function () {
            var _this = this;
            // remove self from graph
            this.ancestors.forEach(function (_a) {
                var bscrollFamily = _a[0];
                bscrollFamily.removeDescendant(_this);
            });
            this.descendants.forEach(function (_a) {
                var bscrollFamily = _a[0];
                bscrollFamily.removeAncestor(_this);
            });
            // remove all hook handlers
            this.hooksManager.forEach(function (_a) {
                var hooks = _a[0], eventType = _a[1], handler = _a[2];
                hooks.off(eventType, handler);
            });
            this.hooksManager = [];
        };
        return BScrollFamily;
    }());

    var sourcePrefix$1 = 'plugins.nestedScroll';
    var propertiesMap$1 = [
        {
            key: 'purgeNestedScroll',
            name: 'purgeNestedScroll',
        },
    ];
    var propertiesConfig$1 = propertiesMap$1.map(function (item) {
        return {
            key: item.key,
            sourceKey: sourcePrefix$1 + "." + item.name,
        };
    });

    var DEFAUL_GROUP_ID = 'INTERNAL_NESTED_SCROLL';
    var forceScrollStopHandler = function (scrolls) {
        scrolls.forEach(function (scroll) {
            if (scroll.pending) {
                scroll.stop();
                scroll.resetPosition();
            }
        });
    };
    var enableScrollHander = function (scrolls) {
        scrolls.forEach(function (scroll) {
            scroll.enable();
        });
    };
    var disableScrollHander = function (scrolls, currentScroll) {
        scrolls.forEach(function (scroll) {
            if (scroll.hasHorizontalScroll === currentScroll.hasHorizontalScroll ||
                scroll.hasVerticalScroll === currentScroll.hasVerticalScroll) {
                scroll.disable();
            }
        });
    };
    var syncTouchstartData = function (scrolls) {
        scrolls.forEach(function (scroll) {
            var _a = scroll.scroller, actions = _a.actions, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
            // prevent click triggering many times
            actions.fingerMoved = true;
            actions.contentMoved = false;
            actions.directionLockAction.reset();
            scrollBehaviorX.start();
            scrollBehaviorY.start();
            scrollBehaviorX.resetStartPos();
            scrollBehaviorY.resetStartPos();
            actions.startTime = +new Date();
        });
    };
    var isOutOfBoundary = function (scroll) {
        var hasHorizontalScroll = scroll.hasHorizontalScroll, hasVerticalScroll = scroll.hasVerticalScroll, x = scroll.x, y = scroll.y, minScrollX = scroll.minScrollX, maxScrollX = scroll.maxScrollX, minScrollY = scroll.minScrollY, maxScrollY = scroll.maxScrollY, movingDirectionX = scroll.movingDirectionX, movingDirectionY = scroll.movingDirectionY;
        var ret = false;
        var outOfLeftBoundary = x >= minScrollX && movingDirectionX === -1 /* Negative */;
        var outOfRightBoundary = x <= maxScrollX && movingDirectionX === 1 /* Positive */;
        var outOfTopBoundary = y >= minScrollY && movingDirectionY === -1 /* Negative */;
        var outOfBottomBoundary = y <= maxScrollY && movingDirectionY === 1 /* Positive */;
        if (hasVerticalScroll) {
            ret = outOfTopBoundary || outOfBottomBoundary;
        }
        else if (hasHorizontalScroll) {
            ret = outOfLeftBoundary || outOfRightBoundary;
        }
        return ret;
    };
    var isResettingPosition = function (scroll) {
        var hasHorizontalScroll = scroll.hasHorizontalScroll, hasVerticalScroll = scroll.hasVerticalScroll, x = scroll.x, y = scroll.y, minScrollX = scroll.minScrollX, maxScrollX = scroll.maxScrollX, minScrollY = scroll.minScrollY, maxScrollY = scroll.maxScrollY;
        var ret = false;
        var outOfLeftBoundary = x > minScrollX;
        var outOfRightBoundary = x < maxScrollX;
        var outOfTopBoundary = y > minScrollY;
        var outOfBottomBoundary = y < maxScrollY;
        if (hasVerticalScroll) {
            ret = outOfTopBoundary || outOfBottomBoundary;
        }
        else if (hasHorizontalScroll) {
            ret = outOfLeftBoundary || outOfRightBoundary;
        }
        return ret;
    };
    var resetPositionHandler = function (scroll) {
        scroll.scroller.reflow();
        scroll.resetPosition(0 /* Immediately */);
    };
    var calculateDistance = function (childNode, parentNode) {
        var distance = 0;
        var parent = childNode.parentNode;
        while (parent && parent !== parentNode) {
            distance++;
            parent = parent.parentNode;
        }
        return distance;
    };
    var NestedScroll = /** @class */ (function () {
        function NestedScroll(scroll) {
            var groupId = this.handleOptions(scroll);
            var instance = NestedScroll.instancesMap[groupId];
            if (!instance) {
                instance = NestedScroll.instancesMap[groupId] = this;
                instance.store = [];
                instance.hooksFn = [];
            }
            instance.init(scroll);
            return instance;
        }
        NestedScroll.getAllNestedScrolls = function () {
            var instancesMap = NestedScroll.instancesMap;
            return Object.keys(instancesMap).map(function (key) { return instancesMap[key]; });
        };
        NestedScroll.purgeAllNestedScrolls = function () {
            var nestedScrolls = NestedScroll.getAllNestedScrolls();
            nestedScrolls.forEach(function (ns) { return ns.purgeNestedScroll(); });
        };
        NestedScroll.prototype.handleOptions = function (scroll) {
            var userOptions = (scroll.options.nestedScroll === true
                ? {}
                : scroll.options.nestedScroll);
            var defaultOptions = {
                groupId: DEFAUL_GROUP_ID,
            };
            this.options = extend(defaultOptions, userOptions);
            var groupIdType = typeof this.options.groupId;
            if (groupIdType !== 'string' && groupIdType !== 'number') {
                warn('groupId must be string or number for NestedScroll plugin');
            }
            return this.options.groupId;
        };
        NestedScroll.prototype.init = function (scroll) {
            scroll.proxy(propertiesConfig$1);
            this.addBScroll(scroll);
            this.buildBScrollGraph();
            this.analyzeBScrollGraph();
            this.ensureEventInvokeSequence();
            this.handleHooks(scroll);
        };
        NestedScroll.prototype.handleHooks = function (scroll) {
            var _this = this;
            this.registerHooks(scroll.hooks, scroll.hooks.eventTypes.destroy, function () {
                _this.deleteScroll(scroll);
            });
        };
        NestedScroll.prototype.deleteScroll = function (scroll) {
            var wrapper = scroll.wrapper;
            wrapper.isBScrollContainer = undefined;
            var store = this.store;
            var hooksFn = this.hooksFn;
            var i = findIndex(store, function (bscrollFamily) {
                return bscrollFamily.selfScroll === scroll;
            });
            if (i > -1) {
                var bscrollFamily = store[i];
                bscrollFamily.purge();
                store.splice(i, 1);
            }
            var k = findIndex(hooksFn, function (_a) {
                var hooks = _a[0];
                return hooks === scroll.hooks;
            });
            if (k > -1) {
                var _a = hooksFn[k], hooks = _a[0], eventType = _a[1], handler = _a[2];
                hooks.off(eventType, handler);
                hooksFn.splice(k, 1);
            }
        };
        NestedScroll.prototype.addBScroll = function (scroll) {
            this.store.push(BScrollFamily.create(scroll));
        };
        NestedScroll.prototype.buildBScrollGraph = function () {
            var store = this.store;
            var bf1;
            var bf2;
            var wrapper1;
            var wrapper2;
            var len = this.store.length;
            // build graph
            for (var i = 0; i < len; i++) {
                bf1 = store[i];
                wrapper1 = bf1.selfScroll.wrapper;
                for (var j = 0; j < len; j++) {
                    bf2 = store[j];
                    wrapper2 = bf2.selfScroll.wrapper;
                    // same bs
                    if (bf1 === bf2)
                        continue;
                    if (!wrapper1.contains(wrapper2))
                        continue;
                    // bs1 contains bs2
                    var distance = calculateDistance(wrapper2, wrapper1);
                    if (!bf1.hasDescendants(bf2)) {
                        bf1.addDescendant(bf2, distance);
                    }
                    if (!bf2.hasAncestors(bf1)) {
                        bf2.addAncestor(bf1, distance);
                    }
                }
            }
        };
        NestedScroll.prototype.analyzeBScrollGraph = function () {
            this.store.forEach(function (bscrollFamily) {
                if (bscrollFamily.analyzed) {
                    return;
                }
                var ancestors = bscrollFamily.ancestors, descendants = bscrollFamily.descendants, currentScroll = bscrollFamily.selfScroll;
                var beforeScrollStartHandler = function () {
                    // always get the latest scroll
                    var ancestorScrolls = ancestors.map(function (_a) {
                        var bscrollFamily = _a[0];
                        return bscrollFamily.selfScroll;
                    });
                    var descendantScrolls = descendants.map(function (_a) {
                        var bscrollFamily = _a[0];
                        return bscrollFamily.selfScroll;
                    });
                    forceScrollStopHandler(__spreadArrays(ancestorScrolls, descendantScrolls));
                    if (isResettingPosition(currentScroll)) {
                        resetPositionHandler(currentScroll);
                    }
                    syncTouchstartData(ancestorScrolls);
                    disableScrollHander(ancestorScrolls, currentScroll);
                };
                var touchEndHandler = function () {
                    var ancestorScrolls = ancestors.map(function (_a) {
                        var bscrollFamily = _a[0];
                        return bscrollFamily.selfScroll;
                    });
                    var descendantScrolls = descendants.map(function (_a) {
                        var bscrollFamily = _a[0];
                        return bscrollFamily.selfScroll;
                    });
                    enableScrollHander(__spreadArrays(ancestorScrolls, descendantScrolls));
                };
                bscrollFamily.registerHooks(currentScroll, currentScroll.eventTypes.beforeScrollStart, beforeScrollStartHandler);
                bscrollFamily.registerHooks(currentScroll, currentScroll.eventTypes.touchEnd, touchEndHandler);
                var selfActionsHooks = currentScroll.scroller.actions.hooks;
                bscrollFamily.registerHooks(selfActionsHooks, selfActionsHooks.eventTypes.detectMovingDirection, function () {
                    var ancestorScrolls = ancestors.map(function (_a) {
                        var bscrollFamily = _a[0];
                        return bscrollFamily.selfScroll;
                    });
                    var parentScroll = ancestorScrolls[0];
                    var otherAncestorScrolls = ancestorScrolls.slice(1);
                    var contentMoved = currentScroll.scroller.actions.contentMoved;
                    var isTopScroll = ancestorScrolls.length === 0;
                    if (contentMoved) {
                        disableScrollHander(ancestorScrolls, currentScroll);
                    }
                    else if (!isTopScroll) {
                        if (isOutOfBoundary(currentScroll)) {
                            disableScrollHander([currentScroll], currentScroll);
                            if (parentScroll) {
                                enableScrollHander([parentScroll]);
                            }
                            disableScrollHander(otherAncestorScrolls, currentScroll);
                            return true;
                        }
                    }
                });
                bscrollFamily.setAnalyzed(true);
            });
        };
        // make sure touchmove|touchend invoke from child to parent
        NestedScroll.prototype.ensureEventInvokeSequence = function () {
            var copied = this.store.slice();
            var sequencedScroll = copied.sort(function (a, b) {
                return a.descendants.length - b.descendants.length;
            });
            sequencedScroll.forEach(function (bscrollFamily) {
                var scroll = bscrollFamily.selfScroll;
                scroll.scroller.actionsHandler.rebindDOMEvents();
            });
        };
        NestedScroll.prototype.registerHooks = function (hooks, name, handler) {
            hooks.on(name, handler, this);
            this.hooksFn.push([hooks, name, handler]);
        };
        NestedScroll.prototype.purgeNestedScroll = function () {
            var groupId = this.options.groupId;
            this.store.forEach(function (bscrollFamily) {
                bscrollFamily.purge();
            });
            this.store = [];
            this.hooksFn.forEach(function (_a) {
                var hooks = _a[0], eventType = _a[1], handler = _a[2];
                hooks.off(eventType, handler);
            });
            this.hooksFn = [];
            delete NestedScroll.instancesMap[groupId];
        };
        NestedScroll.pluginName = 'nestedScroll';
        NestedScroll.instancesMap = {};
        return NestedScroll;
    }());

    var PRE_NUM = 10;
    var POST_NUM = 30;
    var IndexCalculator = /** @class */ (function () {
        function IndexCalculator(wrapperHeight, tombstoneHeight) {
            this.wrapperHeight = wrapperHeight;
            this.tombstoneHeight = tombstoneHeight;
            this.lastDirection = 1 /* DOWN */;
            this.lastPos = 0;
        }
        IndexCalculator.prototype.calculate = function (pos, list) {
            var offset = pos - this.lastPos;
            this.lastPos = pos;
            var direction = this.getDirection(offset);
            // important! start index is much more important than end index.
            var start = this.calculateIndex(0, pos, list);
            var end = this.calculateIndex(start, pos + this.wrapperHeight, list);
            if (direction === 1 /* DOWN */) {
                start -= PRE_NUM;
                end += POST_NUM;
            }
            else {
                start -= POST_NUM;
                end += PRE_NUM;
            }
            if (start < 0) {
                start = 0;
            }
            return {
                start: start,
                end: end,
            };
        };
        IndexCalculator.prototype.getDirection = function (offset) {
            var direction;
            if (offset > 0) {
                direction = 1 /* DOWN */;
            }
            else if (offset < 0) {
                direction = 0 /* UP */;
            }
            else {
                return this.lastDirection;
            }
            this.lastDirection = direction;
            return direction;
        };
        IndexCalculator.prototype.calculateIndex = function (start, offset, list) {
            if (offset <= 0) {
                return start;
            }
            var i = start;
            var startPos = list[i] && list[i].pos !== -1 ? list[i].pos : 0;
            var lastPos = startPos;
            var tombstone = 0;
            while (i < list.length && list[i].pos < offset) {
                lastPos = list[i].pos;
                i++;
            }
            if (i === list.length) {
                tombstone = Math.floor((offset - lastPos) / this.tombstoneHeight);
            }
            i += tombstone;
            return i;
        };
        IndexCalculator.prototype.resetState = function () {
            this.lastDirection = 1 /* DOWN */;
            this.lastPos = 0;
        };
        return IndexCalculator;
    }());

    var ListItem = /** @class */ (function () {
        function ListItem() {
            this.data = null;
            this.dom = null;
            this.tombstone = null;
            this.width = 0;
            this.height = 0;
            this.pos = 0;
        }
        return ListItem;
    }());
    var DataManager = /** @class */ (function () {
        function DataManager(list, fetchFn, onFetchFinish) {
            this.fetchFn = fetchFn;
            this.onFetchFinish = onFetchFinish;
            this.loadedNum = 0;
            this.fetching = false;
            this.hasMore = true;
            this.list = list || [];
        }
        DataManager.prototype.update = function (end) {
            return __awaiter(this, void 0, void 0, function () {
                var len;
                return __generator(this, function (_a) {
                    if (!this.hasMore) {
                        end = Math.min(end, this.list.length);
                    }
                    // add data placeholder
                    if (end > this.list.length) {
                        len = end - this.list.length;
                        this.addEmptyData(len);
                    }
                    // tslint:disable-next-line: no-floating-promises
                    return [2 /*return*/, this.checkToFetch(end)];
                });
            });
        };
        DataManager.prototype.add = function (data) {
            for (var i = 0; i < data.length; i++) {
                if (!this.list[this.loadedNum]) {
                    this.list[this.loadedNum] = { data: data[i] };
                }
                else {
                    this.list[this.loadedNum] = __assign(__assign({}, this.list[this.loadedNum]), { data: data[i] });
                }
                this.loadedNum++;
            }
            return this.list;
        };
        DataManager.prototype.addEmptyData = function (len) {
            for (var i = 0; i < len; i++) {
                this.list.push(new ListItem());
            }
            return this.list;
        };
        DataManager.prototype.fetch = function (len) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.fetching) {
                                return [2 /*return*/, []];
                            }
                            this.fetching = true;
                            return [4 /*yield*/, this.fetchFn(len)];
                        case 1:
                            data = _a.sent();
                            this.fetching = false;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        DataManager.prototype.checkToFetch = function (end) {
            return __awaiter(this, void 0, void 0, function () {
                var min, newData, currentEnd;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.hasMore) {
                                return [2 /*return*/];
                            }
                            if (end <= this.loadedNum) {
                                return [2 /*return*/];
                            }
                            min = end - this.loadedNum;
                            return [4 /*yield*/, this.fetch(min)];
                        case 1:
                            newData = _a.sent();
                            if (newData instanceof Array && newData.length) {
                                this.add(newData);
                                currentEnd = this.onFetchFinish(this.list, true);
                                return [2 /*return*/, this.checkToFetch(currentEnd)];
                            }
                            else if (typeof newData === 'boolean' && newData === false) {
                                this.hasMore = false;
                                this.list.splice(this.loadedNum);
                                this.onFetchFinish(this.list, false);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        DataManager.prototype.getList = function () {
            return this.list;
        };
        DataManager.prototype.resetState = function () {
            this.loadedNum = 0;
            this.fetching = false;
            this.hasMore = true;
            this.list = [];
        };
        return DataManager;
    }());

    var Tombstone = /** @class */ (function () {
        function Tombstone(create) {
            this.create = create;
            this.cached = [];
            this.width = 0;
            this.height = 0;
            this.initialed = false;
            this.getSize();
        }
        Tombstone.isTombstone = function (el) {
            if (el && el.classList) {
                return el.classList.contains('tombstone');
            }
            return false;
        };
        Tombstone.prototype.getSize = function () {
            if (!this.initialed) {
                var tombstone = this.create();
                tombstone.style.position = 'absolute';
                document.body.appendChild(tombstone);
                tombstone.style.display = '';
                this.height = tombstone.offsetHeight;
                this.width = tombstone.offsetWidth;
                document.body.removeChild(tombstone);
                this.cached.push(tombstone);
            }
        };
        Tombstone.prototype.getOne = function () {
            var tombstone = this.cached.pop();
            if (tombstone) {
                var tombstoneStyle = tombstone.style;
                tombstoneStyle.display = '';
                tombstoneStyle.opacity = '1';
                tombstoneStyle[style.transform] = '';
                tombstoneStyle[style.transition] = '';
                return tombstone;
            }
            return this.create();
        };
        Tombstone.prototype.recycle = function (tombstones) {
            for (var _i = 0, tombstones_1 = tombstones; _i < tombstones_1.length; _i++) {
                var tombstone = tombstones_1[_i];
                tombstone.style.display = 'none';
                this.cached.push(tombstone);
            }
            return this.cached;
        };
        Tombstone.prototype.recycleOne = function (tombstone) {
            this.cached.push(tombstone);
            return this.cached;
        };
        return Tombstone;
    }());

    var ANIMATION_DURATION_MS = 200;
    var DomManager = /** @class */ (function () {
        function DomManager(content, renderFn, tombstone) {
            this.renderFn = renderFn;
            this.tombstone = tombstone;
            this.unusedDom = [];
            this.timers = [];
            this.setContent(content);
        }
        DomManager.prototype.update = function (list, start, end) {
            if (start >= list.length) {
                start = list.length - 1;
            }
            if (end > list.length) {
                end = list.length;
            }
            this.collectUnusedDom(list, start, end);
            this.createDom(list, start, end);
            this.cacheHeight(list, start, end);
            var _a = this.positionDom(list, start, end), startPos = _a.startPos, startDelta = _a.startDelta, endPos = _a.endPos;
            return {
                start: start,
                startPos: startPos,
                startDelta: startDelta,
                end: end,
                endPos: endPos,
            };
        };
        DomManager.prototype.collectUnusedDom = function (list, start, end) {
            // TODO optimise
            for (var i = 0; i < list.length; i++) {
                if (i === start) {
                    i = end - 1;
                    continue;
                }
                if (list[i].dom) {
                    var dom = list[i].dom;
                    if (Tombstone.isTombstone(dom)) {
                        this.tombstone.recycleOne(dom);
                        dom.style.display = 'none';
                    }
                    else {
                        this.unusedDom.push(dom);
                    }
                    list[i].dom = null;
                }
            }
            return list;
        };
        DomManager.prototype.createDom = function (list, start, end) {
            for (var i = start; i < end; i++) {
                var dom = list[i].dom;
                var data = list[i].data;
                if (dom) {
                    if (Tombstone.isTombstone(dom) && data) {
                        list[i].tombstone = dom;
                        list[i].dom = null;
                    }
                    else {
                        continue;
                    }
                }
                dom = data
                    ? this.renderFn(data, this.unusedDom.pop())
                    : this.tombstone.getOne();
                dom.style.position = 'absolute';
                list[i].dom = dom;
                list[i].pos = -1;
                this.content.appendChild(dom);
            }
        };
        DomManager.prototype.cacheHeight = function (list, start, end) {
            for (var i = start; i < end; i++) {
                if (list[i].data && !list[i].height) {
                    list[i].height = list[i].dom.offsetHeight;
                }
            }
        };
        DomManager.prototype.positionDom = function (list, start, end) {
            var _this = this;
            var tombstoneEles = [];
            var _a = this.getStartPos(list, start, end), startPos = _a.start, startDelta = _a.delta;
            var pos = startPos;
            for (var i = start; i < end; i++) {
                var tombstone = list[i].tombstone;
                if (tombstone) {
                    var tombstoneStyle = tombstone.style;
                    tombstoneStyle[style.transition] = cssVendor + "transform " + ANIMATION_DURATION_MS + "ms, opacity " + ANIMATION_DURATION_MS + "ms";
                    tombstoneStyle[style.transform] = "translateY(" + pos + "px)";
                    tombstoneStyle.opacity = '0';
                    list[i].tombstone = null;
                    tombstoneEles.push(tombstone);
                }
                if (list[i].dom && list[i].pos !== pos) {
                    list[i].dom.style[style.transform] = "translateY(" + pos + "px)";
                    list[i].pos = pos;
                }
                pos += list[i].height || this.tombstone.height;
            }
            var timerId = window.setTimeout(function () {
                _this.tombstone.recycle(tombstoneEles);
            }, ANIMATION_DURATION_MS);
            this.timers.push(timerId);
            return {
                startPos: startPos,
                startDelta: startDelta,
                endPos: pos,
            };
        };
        DomManager.prototype.getStartPos = function (list, start, end) {
            if (list[start] && list[start].pos !== -1) {
                return {
                    start: list[start].pos,
                    delta: 0,
                };
            }
            // TODO optimise
            var pos = list[0].pos === -1 ? 0 : list[0].pos;
            for (var i_1 = 0; i_1 < start; i_1++) {
                pos += list[i_1].height || this.tombstone.height;
            }
            var originPos = pos;
            var i;
            for (i = start; i < end; i++) {
                if (!Tombstone.isTombstone(list[i].dom) && list[i].pos !== -1) {
                    pos = list[i].pos;
                    break;
                }
            }
            var x = i;
            if (x < end) {
                while (x > start) {
                    pos -= list[x - 1].height;
                    x--;
                }
            }
            var delta = originPos - pos;
            return {
                start: pos,
                delta: delta,
            };
        };
        DomManager.prototype.removeTombstone = function () {
            var tombstones = this.content.querySelectorAll('.tombstone');
            for (var i = tombstones.length - 1; i >= 0; i--) {
                this.content.removeChild(tombstones[i]);
            }
        };
        DomManager.prototype.setContent = function (content) {
            if (content !== this.content) {
                this.content = content;
            }
        };
        DomManager.prototype.destroy = function () {
            this.removeTombstone();
            this.timers.forEach(function (id) {
                clearTimeout(id);
            });
        };
        DomManager.prototype.resetState = function () {
            this.destroy();
            this.timers = [];
            this.unusedDom = [];
        };
        return DomManager;
    }());

    var EXTRA_SCROLL_Y = -2000;
    var InfinityScroll = /** @class */ (function () {
        function InfinityScroll(scroll) {
            this.scroll = scroll;
            this.start = 0;
            this.end = 0;
            this.init();
        }
        InfinityScroll.prototype.init = function () {
            var _this = this;
            this.handleOptions();
            var _a = this.options, fetchFn = _a.fetch, renderFn = _a.render, createTombstoneFn = _a.createTombstone;
            this.tombstone = new Tombstone(createTombstoneFn);
            this.indexCalculator = new IndexCalculator(this.scroll.scroller.scrollBehaviorY.wrapperSize, this.tombstone.height);
            this.domManager = new DomManager(this.scroll.scroller.content, renderFn, this.tombstone);
            this.dataManager = new DataManager([], fetchFn, this.onFetchFinish.bind(this));
            this.scroll.on(this.scroll.eventTypes.destroy, this.destroy, this);
            this.scroll.on(this.scroll.eventTypes.scroll, this.update, this);
            this.scroll.on(this.scroll.eventTypes.contentChanged, function (content) {
                _this.domManager.setContent(content);
                _this.indexCalculator.resetState();
                _this.domManager.resetState();
                _this.dataManager.resetState();
                _this.update({ y: 0 });
            });
            var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
            scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.computeBoundary, this.modifyBoundary, this);
            this.update({ y: 0 });
        };
        InfinityScroll.prototype.modifyBoundary = function (boundary) {
            // manually set position to allow scroll
            boundary.maxScrollPos = EXTRA_SCROLL_Y;
        };
        InfinityScroll.prototype.handleOptions = function () {
            // narrow down type to an object
            var infinityOptions = this.scroll.options.infinity;
            if (infinityOptions) {
                if (typeof infinityOptions.fetch !== 'function') {
                    warn('Infinity plugin need fetch Function to new data.');
                }
                if (typeof infinityOptions.render !== 'function') {
                    warn('Infinity plugin need render Function to render each item.');
                }
                if (typeof infinityOptions.render !== 'function') {
                    warn('Infinity plugin need createTombstone Function to create tombstone.');
                }
                this.options = infinityOptions;
            }
            this.scroll.options.probeType = 3 /* Realtime */;
        };
        InfinityScroll.prototype.update = function (pos) {
            var position = Math.round(-pos.y);
            // important! calculate start/end index to render
            var _a = this.indexCalculator.calculate(position, this.dataManager.getList()), start = _a.start, end = _a.end;
            this.start = start;
            this.end = end;
            // tslint:disable-next-line: no-floating-promises
            this.dataManager.update(end);
            this.updateDom(this.dataManager.getList());
        };
        InfinityScroll.prototype.onFetchFinish = function (list, hasMore) {
            var end = this.updateDom(list).end;
            if (!hasMore) {
                this.domManager.removeTombstone();
                this.scroll.scroller.animater.stop();
                this.scroll.resetPosition();
            }
            // tslint:disable-next-line: no-floating-promises
            return end;
        };
        InfinityScroll.prototype.updateDom = function (list) {
            var _a = this.domManager.update(list, this.start, this.end), end = _a.end, startPos = _a.startPos, endPos = _a.endPos, startDelta = _a.startDelta;
            if (startDelta) {
                this.scroll.minScrollY = startDelta;
            }
            if (endPos > this.scroll.maxScrollY) {
                this.scroll.maxScrollY = -(endPos - this.scroll.scroller.scrollBehaviorY.wrapperSize);
            }
            return {
                end: end,
                startPos: startPos,
                endPos: endPos,
            };
        };
        InfinityScroll.prototype.destroy = function () {
            var _a = this.scroll.scroller, content = _a.content, scrollBehaviorY = _a.scrollBehaviorY;
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
            this.domManager.destroy();
            this.scroll.off('scroll', this.update);
            this.scroll.off('destroy', this.destroy);
            scrollBehaviorY.hooks.off(scrollBehaviorY.hooks.eventTypes.computeBoundary);
        };
        InfinityScroll.pluginName = 'infinity';
        return InfinityScroll;
    }());

    var sourcePrefix = 'plugins.movable';
    var propertiesMap = [
        {
            key: 'putAt',
            name: 'putAt',
        },
    ];
    var propertiesConfig = propertiesMap.map(function (item) {
        return {
            key: item.key,
            sourceKey: sourcePrefix + "." + item.name,
        };
    });

    var Movable = /** @class */ (function () {
        function Movable(scroll) {
            this.scroll = scroll;
            this.handleBScroll();
            this.handleHooks();
        }
        Movable.prototype.handleBScroll = function () {
            this.scroll.proxy(propertiesConfig);
        };
        Movable.prototype.handleHooks = function () {
            var _this = this;
            this.hooksFn = [];
            var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
            var computeBoundary = function (boundary, behavior) {
                if (boundary.maxScrollPos > 0) {
                    // content is smaller than wrapper
                    boundary.minScrollPos = behavior.wrapperSize - behavior.contentSize;
                    boundary.maxScrollPos = 0;
                }
            };
            this.registerHooks(scrollBehaviorX.hooks, scrollBehaviorX.hooks.eventTypes.ignoreHasScroll, function () { return true; });
            this.registerHooks(scrollBehaviorX.hooks, scrollBehaviorX.hooks.eventTypes.computeBoundary, function (boundary) {
                computeBoundary(boundary, scrollBehaviorX);
            });
            this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.ignoreHasScroll, function () { return true; });
            this.registerHooks(scrollBehaviorY.hooks, scrollBehaviorY.hooks.eventTypes.computeBoundary, function (boundary) {
                computeBoundary(boundary, scrollBehaviorY);
            });
            this.registerHooks(this.scroll.hooks, this.scroll.hooks.eventTypes.destroy, function () {
                _this.destroy();
            });
        };
        Movable.prototype.putAt = function (x, y, time, easing) {
            if (time === void 0) { time = this.scroll.options.bounceTime; }
            if (easing === void 0) { easing = ease.bounce; }
            var position = this.resolvePostion(x, y);
            this.scroll.scrollTo(position.x, position.y, time, easing);
        };
        Movable.prototype.resolvePostion = function (x, y) {
            var _a = this.scroll.scroller, scrollBehaviorX = _a.scrollBehaviorX, scrollBehaviorY = _a.scrollBehaviorY;
            var resolveFormula = {
                left: function () {
                    return 0;
                },
                top: function () {
                    return 0;
                },
                right: function () {
                    return scrollBehaviorX.minScrollPos;
                },
                bottom: function () {
                    return scrollBehaviorY.minScrollPos;
                },
                center: function (index) {
                    var baseSize = index === 0
                        ? scrollBehaviorX.minScrollPos
                        : scrollBehaviorY.minScrollPos;
                    return baseSize / 2;
                },
            };
            return {
                x: typeof x === 'number' ? x : resolveFormula[x](0),
                y: typeof y === 'number' ? y : resolveFormula[y](1),
            };
        };
        Movable.prototype.destroy = function () {
            this.hooksFn.forEach(function (item) {
                var hooks = item[0];
                var hooksName = item[1];
                var handlerFn = item[2];
                hooks.off(hooksName, handlerFn);
            });
            this.hooksFn.length = 0;
        };
        Movable.prototype.registerHooks = function (hooks, name, handler) {
            hooks.on(name, handler, this);
            this.hooksFn.push([hooks, name, handler]);
        };
        Movable.pluginName = 'movable';
        Movable.applyOrder = "pre" /* Pre */;
        return Movable;
    }());

    var isImageTag = function (el) {
        return el.tagName.toLowerCase() === 'img';
    };
    var ObserveImage = /** @class */ (function () {
        function ObserveImage(scroll) {
            this.scroll = scroll;
            this.refreshTimer = 0;
            this.init();
        }
        ObserveImage.prototype.init = function () {
            this.handleOptions(this.scroll.options.observeImage);
            this.bindEventsToWrapper();
        };
        ObserveImage.prototype.handleOptions = function (userOptions) {
            if (userOptions === void 0) { userOptions = {}; }
            userOptions = (userOptions === true ? {} : userOptions);
            var defaultOptions = {
                debounceTime: 100,
            };
            this.options = extend(defaultOptions, userOptions);
        };
        ObserveImage.prototype.bindEventsToWrapper = function () {
            var wrapper = this.scroll.scroller.wrapper;
            this.imageLoadEventRegister = new EventRegister(wrapper, [
                {
                    name: 'load',
                    handler: this.load.bind(this),
                    capture: true,
                },
            ]);
            this.imageErrorEventRegister = new EventRegister(wrapper, [
                {
                    name: 'error',
                    handler: this.load.bind(this),
                    capture: true,
                },
            ]);
        };
        ObserveImage.prototype.load = function (e) {
            var _this = this;
            var target = e.target;
            var debounceTime = this.options.debounceTime;
            if (target && isImageTag(target)) {
                if (debounceTime === 0) {
                    this.scroll.refresh();
                }
                else {
                    clearTimeout(this.refreshTimer);
                    this.refreshTimer = window.setTimeout(function () {
                        _this.scroll.refresh();
                    }, this.options.debounceTime);
                }
            }
        };
        ObserveImage.pluginName = 'observeImage';
        return ObserveImage;
    }());

    var resolveRatioOption = function (ratioConfig) {
        var ret = {
            ratioX: 0,
            ratioY: 0,
        };
        /* istanbul ignore if  */
        if (!ratioConfig) {
            return ret;
        }
        if (typeof ratioConfig === 'number') {
            ret.ratioX = ret.ratioY = ratioConfig;
        }
        else if (typeof ratioConfig === 'object' && ratioConfig) {
            ret.ratioX = ratioConfig.x || 0;
            ret.ratioY = ratioConfig.y || 0;
        }
        return ret;
    };
    var handleBubbleAndCancelable = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    var Indicator = /** @class */ (function () {
        function Indicator(scroll, options) {
            this.scroll = scroll;
            this.options = options;
            this.currentPos = {
                x: 0,
                y: 0,
            };
            this.hooksFn = [];
            this.handleDOM();
            this.handleHooks();
            this.handleInteractive();
        }
        Indicator.prototype.handleDOM = function () {
            var _a = this.options, relationElement = _a.relationElement, _b = _a.relationElementHandleElementIndex, relationElementHandleElementIndex = _b === void 0 ? 0 : _b;
            this.wrapper = relationElement;
            this.indicatorEl = this.wrapper.children[relationElementHandleElementIndex];
        };
        Indicator.prototype.handleHooks = function () {
            var _this = this;
            var scroll = this.scroll;
            var scrollHooks = scroll.hooks;
            var translaterHooks = scroll.scroller.translater.hooks;
            var animaterHooks = scroll.scroller.animater.hooks;
            this.registerHooks(scrollHooks, scrollHooks.eventTypes.refresh, this.refresh);
            this.registerHooks(translaterHooks, translaterHooks.eventTypes.translate, function (pos) {
                _this.updatePosition(pos);
            });
            this.registerHooks(animaterHooks, animaterHooks.eventTypes.time, this.transitionTime);
            this.registerHooks(animaterHooks, animaterHooks.eventTypes.timeFunction, this.transitionTimingFunction);
        };
        Indicator.prototype.transitionTime = function (time) {
            if (time === void 0) { time = 0; }
            this.indicatorEl.style[style.transitionDuration] = time + 'ms';
        };
        Indicator.prototype.transitionTimingFunction = function (easing) {
            this.indicatorEl.style[style.transitionTimingFunction] = easing;
        };
        Indicator.prototype.handleInteractive = function () {
            if (this.options.interactive !== false) {
                this.registerEvents();
            }
        };
        Indicator.prototype.registerHooks = function (hooks, name, handler) {
            hooks.on(name, handler, this);
            this.hooksFn.push([hooks, name, handler]);
        };
        Indicator.prototype.registerEvents = function () {
            var _a = this.scroll.options, disableMouse = _a.disableMouse, disableTouch = _a.disableTouch;
            var startEvents = [];
            var moveEvents = [];
            var endEvents = [];
            if (!disableMouse) {
                startEvents.push({
                    name: 'mousedown',
                    handler: this.start.bind(this),
                });
                moveEvents.push({
                    name: 'mousemove',
                    handler: this.move.bind(this),
                });
                endEvents.push({
                    name: 'mouseup',
                    handler: this.end.bind(this),
                });
            }
            if (!disableTouch) {
                startEvents.push({
                    name: 'touchstart',
                    handler: this.start.bind(this),
                });
                moveEvents.push({
                    name: 'touchmove',
                    handler: this.move.bind(this),
                });
                endEvents.push({
                    name: 'touchend',
                    handler: this.end.bind(this),
                }, {
                    name: 'touchcancel',
                    handler: this.end.bind(this),
                });
            }
            this.startEventRegister = new EventRegister(this.indicatorEl, startEvents);
            this.moveEventRegister = new EventRegister(window, moveEvents);
            this.endEventRegister = new EventRegister(window, endEvents);
        };
        Indicator.prototype.refresh = function () {
            var _a = this.scroll, x = _a.x, y = _a.y, hasHorizontalScroll = _a.hasHorizontalScroll, hasVerticalScroll = _a.hasVerticalScroll, maxBScrollX = _a.maxScrollX, maxBScrollY = _a.maxScrollY;
            var _b = resolveRatioOption(this.options.ratio), ratioX = _b.ratioX, ratioY = _b.ratioY;
            var _c = getClientSize(this.wrapper), wrapperWidth = _c.width, wrapperHeight = _c.height;
            var _d = getRect(this.indicatorEl), indicatorWidth = _d.width, indicatorHeight = _d.height;
            if (hasHorizontalScroll) {
                this.maxScrollX = wrapperWidth - indicatorWidth;
                this.translateXSign =
                    this.maxScrollX > 0 ? -1 /* Positive */ : 1 /* NotPositive */;
                this.minScrollX = 0;
                // ensure positive
                this.ratioX = ratioX ? ratioX : Math.abs(this.maxScrollX / maxBScrollX);
            }
            if (hasVerticalScroll) {
                this.maxScrollY = wrapperHeight - indicatorHeight;
                this.translateYSign =
                    this.maxScrollY > 0 ? -1 /* Positive */ : 1 /* NotPositive */;
                this.minScrollY = 0;
                this.ratioY = ratioY ? ratioY : Math.abs(this.maxScrollY / maxBScrollY);
            }
            this.updatePosition({
                x: x,
                y: y,
            });
        };
        Indicator.prototype.start = function (e) {
            if (this.BScrollIsDisabled()) {
                return;
            }
            var point = (e.touches ? e.touches[0] : e);
            handleBubbleAndCancelable(e);
            this.initiated = true;
            this.moved = false;
            this.lastPointX = point.pageX;
            this.lastPointY = point.pageY;
            this.startTime = getNow();
            this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.beforeScrollStart);
        };
        Indicator.prototype.BScrollIsDisabled = function () {
            return !this.scroll.enabled;
        };
        Indicator.prototype.move = function (e) {
            if (!this.initiated) {
                return;
            }
            var point = (e.touches ? e.touches[0] : e);
            var pointX = point.pageX;
            var pointY = point.pageY;
            handleBubbleAndCancelable(e);
            var deltaX = pointX - this.lastPointX;
            var deltaY = pointY - this.lastPointY;
            this.lastPointX = pointX;
            this.lastPointY = pointY;
            if (!this.moved && !this.indicatorNotMoved(deltaX, deltaY)) {
                this.moved = true;
                this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollStart);
            }
            if (this.moved) {
                var newPos = this.getBScrollPosByRatio(this.currentPos, deltaX, deltaY);
                this.syncBScroll(newPos);
            }
        };
        Indicator.prototype.end = function (e) {
            if (!this.initiated) {
                return;
            }
            this.initiated = false;
            handleBubbleAndCancelable(e);
            if (this.moved) {
                var _a = this.scroll, x = _a.x, y = _a.y;
                this.scroll.scroller.hooks.trigger(this.scroll.scroller.hooks.eventTypes.scrollEnd, {
                    x: x,
                    y: y,
                });
            }
        };
        Indicator.prototype.getBScrollPosByRatio = function (currentPos, deltaX, deltaY) {
            var currentX = currentPos.x, currentY = currentPos.y;
            var _a = this.scroll, hasHorizontalScroll = _a.hasHorizontalScroll, hasVerticalScroll = _a.hasVerticalScroll, BScrollMinScrollX = _a.minScrollX, BScrollMaxScrollX = _a.maxScrollX, BScrollMinScrollY = _a.minScrollY, BScrollMaxScrollY = _a.maxScrollY;
            var _b = this.scroll, x = _b.x, y = _b.y;
            if (hasHorizontalScroll) {
                var newPosX = between(currentX + deltaX, Math.min(this.minScrollX, this.maxScrollX), Math.max(this.minScrollX, this.maxScrollX));
                var roundX = Math.round((newPosX / this.ratioX) * this.translateXSign);
                x = between(roundX, BScrollMaxScrollX, BScrollMinScrollX);
            }
            if (hasVerticalScroll) {
                var newPosY = between(currentY + deltaY, Math.min(this.minScrollY, this.maxScrollY), Math.max(this.minScrollY, this.maxScrollY));
                var roundY = Math.round((newPosY / this.ratioY) * this.translateYSign);
                y = between(roundY, BScrollMaxScrollY, BScrollMinScrollY);
            }
            return { x: x, y: y };
        };
        Indicator.prototype.indicatorNotMoved = function (deltaX, deltaY) {
            var _a = this.currentPos, x = _a.x, y = _a.y;
            var xNotMoved = (x === this.minScrollX && deltaX <= 0) ||
                (x === this.maxScrollX && deltaX >= 0);
            var yNotMoved = (y === this.minScrollY && deltaY <= 0) ||
                (y === this.maxScrollY && deltaY >= 0);
            return xNotMoved && yNotMoved;
        };
        Indicator.prototype.syncBScroll = function (newPos) {
            var timestamp = getNow();
            var _a = this.scroll, options = _a.options, scroller = _a.scroller;
            var probeType = options.probeType, momentumLimitTime = options.momentumLimitTime;
            scroller.translater.translate(newPos);
            // dispatch scroll in interval time
            if (timestamp - this.startTime > momentumLimitTime) {
                this.startTime = timestamp;
                if (probeType === 1 /* Throttle */) {
                    scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, newPos);
                }
            }
            // dispatch scroll all the time
            if (probeType > 1 /* Throttle */) {
                scroller.hooks.trigger(scroller.hooks.eventTypes.scroll, newPos);
            }
        };
        Indicator.prototype.updatePosition = function (BScrollPos) {
            var newIndicatorPos = this.getIndicatorPosByRatio(BScrollPos);
            this.applyTransformProperty(newIndicatorPos);
            this.currentPos = __assign({}, newIndicatorPos);
        };
        Indicator.prototype.applyTransformProperty = function (pos) {
            var translateZ = this.scroll.options.translateZ;
            var transformProperties = [
                "translateX(" + pos.x + "px)",
                "translateY(" + pos.y + "px)",
                "" + translateZ,
            ];
            this.indicatorEl.style[style.transform] = transformProperties.join(' ');
        };
        Indicator.prototype.getIndicatorPosByRatio = function (BScrollPos) {
            var x = BScrollPos.x, y = BScrollPos.y;
            var _a = this.scroll, hasHorizontalScroll = _a.hasHorizontalScroll, hasVerticalScroll = _a.hasVerticalScroll;
            var position = __assign({}, this.currentPos);
            if (hasHorizontalScroll) {
                var roundX = Math.round(this.ratioX * x * this.translateXSign);
                // maybe maxScrollX is negative
                position.x = between(roundX, Math.min(this.minScrollX, this.maxScrollX), Math.max(this.minScrollX, this.maxScrollX));
            }
            if (hasVerticalScroll) {
                var roundY = Math.round(this.ratioY * y * this.translateYSign);
                // maybe maxScrollY is negative
                position.y = between(roundY, Math.min(this.minScrollY, this.maxScrollY), Math.max(this.minScrollY, this.maxScrollY));
            }
            return position;
        };
        Indicator.prototype.destroy = function () {
            if (this.options.interactive !== false) {
                this.startEventRegister.destroy();
                this.moveEventRegister.destroy();
                this.endEventRegister.destroy();
            }
            this.hooksFn.forEach(function (item) {
                var hooks = item[0];
                var hooksName = item[1];
                var handlerFn = item[2];
                hooks.off(hooksName, handlerFn);
            });
            this.hooksFn.length = 0;
        };
        return Indicator;
    }());

    var Indicators = /** @class */ (function () {
        function Indicators(scroll) {
            this.scroll = scroll;
            this.options = [];
            this.indicators = [];
            this.handleOptions();
            this.handleHooks();
        }
        Indicators.prototype.handleOptions = function () {
            var UserIndicatorsOptions = this.scroll.options.indicators;
            assert(Array.isArray(UserIndicatorsOptions), "'indicators' must be an array.");
            for (var _i = 0, UserIndicatorsOptions_1 = UserIndicatorsOptions; _i < UserIndicatorsOptions_1.length; _i++) {
                var indicatorOptions = UserIndicatorsOptions_1[_i];
                assert(!!indicatorOptions.relationElement, "'relationElement' must be a HTMLElement.");
                this.createIndicators(indicatorOptions);
            }
        };
        Indicators.prototype.createIndicators = function (options) {
            this.indicators.push(new Indicator(this.scroll, options));
        };
        Indicators.prototype.handleHooks = function () {
            var _this = this;
            var scrollHooks = this.scroll.hooks;
            scrollHooks.on(scrollHooks.eventTypes.destroy, function () {
                for (var _i = 0, _a = _this.indicators; _i < _a.length; _i++) {
                    var indicator = _a[_i];
                    indicator.destroy();
                }
                _this.indicators = [];
            });
        };
        Indicators.pluginName = 'indicators';
        return Indicators;
    }());

    BScroll.use(MouseWheel)
        .use(ObserveDOM)
        .use(PullDown)
        .use(PullUp)
        .use(ScrollBar)
        .use(Slide)
        .use(Wheel)
        .use(Zoom)
        .use(NestedScroll)
        .use(InfinityScroll)
        .use(Movable)
        .use(ObserveImage)
        .use(Indicators);

    exports.Behavior = Behavior;
    exports.CustomOptions = CustomOptions;
    exports.Indicators = Indicators;
    exports.InfinityScroll = InfinityScroll;
    exports.MouseWheel = MouseWheel;
    exports.Movable = Movable;
    exports.NestedScroll = NestedScroll;
    exports.ObserveDom = ObserveDOM;
    exports.ObserveImage = ObserveImage;
    exports.PullDownRefresh = PullDown;
    exports.PullUpLoad = PullUp;
    exports.ScrollBar = ScrollBar;
    exports.Slide = Slide;
    exports.Wheel = Wheel;
    exports.Zoom = Zoom;
    exports.createBScroll = createBScroll;
    exports.default = BScroll;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
