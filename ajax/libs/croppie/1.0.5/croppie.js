/*************************
 * Croppie
 * Copyright 2015
 * Foliotek
 * Version: 1.0.3
 *************************/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'b'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('b'));
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}), root.b);
    }
}(this, function (exports, b) {

    if (typeof Promise !== 'function') {
        /*!
         * @overview es6-promise - a tiny implementation of Promises/A+.
         * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
         * @license   Licensed under MIT license
         *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
         * @version   3.0.2
         */
        (function () { "use strict"; function lib$es6$promise$utils$$objectOrFunction(x) { return typeof x === "function" || typeof x === "object" && x !== null } function lib$es6$promise$utils$$isFunction(x) { return typeof x === "function" } function lib$es6$promise$utils$$isMaybeThenable(x) { return typeof x === "object" && x !== null } var lib$es6$promise$utils$$_isArray; if (!Array.isArray) { lib$es6$promise$utils$$_isArray = function (x) { return Object.prototype.toString.call(x) === "[object Array]" } } else { lib$es6$promise$utils$$_isArray = Array.isArray } var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray; var lib$es6$promise$asap$$len = 0; var lib$es6$promise$asap$$toString = {}.toString; var lib$es6$promise$asap$$vertxNext; var lib$es6$promise$asap$$customSchedulerFn; var lib$es6$promise$asap$$asap = function asap(callback, arg) { lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback; lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg; lib$es6$promise$asap$$len += 2; if (lib$es6$promise$asap$$len === 2) { if (lib$es6$promise$asap$$customSchedulerFn) { lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush) } else { lib$es6$promise$asap$$scheduleFlush() } } }; function lib$es6$promise$asap$$setScheduler(scheduleFn) { lib$es6$promise$asap$$customSchedulerFn = scheduleFn } function lib$es6$promise$asap$$setAsap(asapFn) { lib$es6$promise$asap$$asap = asapFn } var lib$es6$promise$asap$$browserWindow = typeof window !== "undefined" ? window : undefined; var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {}; var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver; var lib$es6$promise$asap$$isNode = typeof process !== "undefined" && {}.toString.call(process) === "[object process]"; var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined"; function lib$es6$promise$asap$$useNextTick() { return function () { process.nextTick(lib$es6$promise$asap$$flush) } } function lib$es6$promise$asap$$useVertxTimer() { return function () { lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush) } } function lib$es6$promise$asap$$useMutationObserver() { var iterations = 0; var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush); var node = document.createTextNode(""); observer.observe(node, { characterData: true }); return function () { node.data = iterations = ++iterations % 2 } } function lib$es6$promise$asap$$useMessageChannel() { var channel = new MessageChannel; channel.port1.onmessage = lib$es6$promise$asap$$flush; return function () { channel.port2.postMessage(0) } } function lib$es6$promise$asap$$useSetTimeout() { return function () { setTimeout(lib$es6$promise$asap$$flush, 1) } } var lib$es6$promise$asap$$queue = new Array(1e3); function lib$es6$promise$asap$$flush() { for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) { var callback = lib$es6$promise$asap$$queue[i]; var arg = lib$es6$promise$asap$$queue[i + 1]; callback(arg); lib$es6$promise$asap$$queue[i] = undefined; lib$es6$promise$asap$$queue[i + 1] = undefined } lib$es6$promise$asap$$len = 0 } function lib$es6$promise$asap$$attemptVertx() { try { var r = require; var vertx = r("vertx"); lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext; return lib$es6$promise$asap$$useVertxTimer() } catch (e) { return lib$es6$promise$asap$$useSetTimeout() } } var lib$es6$promise$asap$$scheduleFlush; if (lib$es6$promise$asap$$isNode) { lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick() } else if (lib$es6$promise$asap$$BrowserMutationObserver) { lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver() } else if (lib$es6$promise$asap$$isWorker) { lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel() } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === "function") { lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx() } else { lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout() } function lib$es6$promise$$internal$$noop() { } var lib$es6$promise$$internal$$PENDING = void 0; var lib$es6$promise$$internal$$FULFILLED = 1; var lib$es6$promise$$internal$$REJECTED = 2; var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject; function lib$es6$promise$$internal$$selfFulfillment() { return new TypeError("You cannot resolve a promise with itself") } function lib$es6$promise$$internal$$cannotReturnOwn() { return new TypeError("A promises callback cannot return that same promise.") } function lib$es6$promise$$internal$$getThen(promise) { try { return promise.then } catch (error) { lib$es6$promise$$internal$$GET_THEN_ERROR.error = error; return lib$es6$promise$$internal$$GET_THEN_ERROR } } function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) { try { then.call(value, fulfillmentHandler, rejectionHandler) } catch (e) { return e } } function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) { lib$es6$promise$asap$$asap(function (promise) { var sealed = false; var error = lib$es6$promise$$internal$$tryThen(then, thenable, function (value) { if (sealed) { return } sealed = true; if (thenable !== value) { lib$es6$promise$$internal$$resolve(promise, value) } else { lib$es6$promise$$internal$$fulfill(promise, value) } }, function (reason) { if (sealed) { return } sealed = true; lib$es6$promise$$internal$$reject(promise, reason) }, "Settle: " + (promise._label || " unknown promise")); if (!sealed && error) { sealed = true; lib$es6$promise$$internal$$reject(promise, error) } }, promise) } function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) { if (thenable._state === lib$es6$promise$$internal$$FULFILLED) { lib$es6$promise$$internal$$fulfill(promise, thenable._result) } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) { lib$es6$promise$$internal$$reject(promise, thenable._result) } else { lib$es6$promise$$internal$$subscribe(thenable, undefined, function (value) { lib$es6$promise$$internal$$resolve(promise, value) }, function (reason) { lib$es6$promise$$internal$$reject(promise, reason) }) } } function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) { if (maybeThenable.constructor === promise.constructor) { lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable) } else { var then = lib$es6$promise$$internal$$getThen(maybeThenable); if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) { lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error) } else if (then === undefined) { lib$es6$promise$$internal$$fulfill(promise, maybeThenable) } else if (lib$es6$promise$utils$$isFunction(then)) { lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then) } else { lib$es6$promise$$internal$$fulfill(promise, maybeThenable) } } } function lib$es6$promise$$internal$$resolve(promise, value) { if (promise === value) { lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment()) } else if (lib$es6$promise$utils$$objectOrFunction(value)) { lib$es6$promise$$internal$$handleMaybeThenable(promise, value) } else { lib$es6$promise$$internal$$fulfill(promise, value) } } function lib$es6$promise$$internal$$publishRejection(promise) { if (promise._onerror) { promise._onerror(promise._result) } lib$es6$promise$$internal$$publish(promise) } function lib$es6$promise$$internal$$fulfill(promise, value) { if (promise._state !== lib$es6$promise$$internal$$PENDING) { return } promise._result = value; promise._state = lib$es6$promise$$internal$$FULFILLED; if (promise._subscribers.length !== 0) { lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise) } } function lib$es6$promise$$internal$$reject(promise, reason) { if (promise._state !== lib$es6$promise$$internal$$PENDING) { return } promise._state = lib$es6$promise$$internal$$REJECTED; promise._result = reason; lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise) } function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) { var subscribers = parent._subscribers; var length = subscribers.length; parent._onerror = null; subscribers[length] = child; subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment; subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection; if (length === 0 && parent._state) { lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent) } } function lib$es6$promise$$internal$$publish(promise) { var subscribers = promise._subscribers; var settled = promise._state; if (subscribers.length === 0) { return } var child, callback, detail = promise._result; for (var i = 0; i < subscribers.length; i += 3) { child = subscribers[i]; callback = subscribers[i + settled]; if (child) { lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail) } else { callback(detail) } } promise._subscribers.length = 0 } function lib$es6$promise$$internal$$ErrorObject() { this.error = null } var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject; function lib$es6$promise$$internal$$tryCatch(callback, detail) { try { return callback(detail) } catch (e) { lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e; return lib$es6$promise$$internal$$TRY_CATCH_ERROR } } function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) { var hasCallback = lib$es6$promise$utils$$isFunction(callback), value, error, succeeded, failed; if (hasCallback) { value = lib$es6$promise$$internal$$tryCatch(callback, detail); if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) { failed = true; error = value.error; value = null } else { succeeded = true } if (promise === value) { lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn()); return } } else { value = detail; succeeded = true } if (promise._state !== lib$es6$promise$$internal$$PENDING) { } else if (hasCallback && succeeded) { lib$es6$promise$$internal$$resolve(promise, value) } else if (failed) { lib$es6$promise$$internal$$reject(promise, error) } else if (settled === lib$es6$promise$$internal$$FULFILLED) { lib$es6$promise$$internal$$fulfill(promise, value) } else if (settled === lib$es6$promise$$internal$$REJECTED) { lib$es6$promise$$internal$$reject(promise, value) } } function lib$es6$promise$$internal$$initializePromise(promise, resolver) { try { resolver(function resolvePromise(value) { lib$es6$promise$$internal$$resolve(promise, value) }, function rejectPromise(reason) { lib$es6$promise$$internal$$reject(promise, reason) }) } catch (e) { lib$es6$promise$$internal$$reject(promise, e) } } function lib$es6$promise$enumerator$$Enumerator(Constructor, input) { var enumerator = this; enumerator._instanceConstructor = Constructor; enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop); if (enumerator._validateInput(input)) { enumerator._input = input; enumerator.length = input.length; enumerator._remaining = input.length; enumerator._init(); if (enumerator.length === 0) { lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result) } else { enumerator.length = enumerator.length || 0; enumerator._enumerate(); if (enumerator._remaining === 0) { lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result) } } } else { lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError()) } } lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function (input) { return lib$es6$promise$utils$$isArray(input) }; lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function () { return new Error("Array Methods must be provided an Array") }; lib$es6$promise$enumerator$$Enumerator.prototype._init = function () { this._result = new Array(this.length) }; var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator; lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function () { var enumerator = this; var length = enumerator.length; var promise = enumerator.promise; var input = enumerator._input; for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) { enumerator._eachEntry(input[i], i) } }; lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function (entry, i) { var enumerator = this; var c = enumerator._instanceConstructor; if (lib$es6$promise$utils$$isMaybeThenable(entry)) { if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) { entry._onerror = null; enumerator._settledAt(entry._state, i, entry._result) } else { enumerator._willSettleAt(c.resolve(entry), i) } } else { enumerator._remaining--; enumerator._result[i] = entry } }; lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function (state, i, value) { var enumerator = this; var promise = enumerator.promise; if (promise._state === lib$es6$promise$$internal$$PENDING) { enumerator._remaining--; if (state === lib$es6$promise$$internal$$REJECTED) { lib$es6$promise$$internal$$reject(promise, value) } else { enumerator._result[i] = value } } if (enumerator._remaining === 0) { lib$es6$promise$$internal$$fulfill(promise, enumerator._result) } }; lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function (promise, i) { var enumerator = this; lib$es6$promise$$internal$$subscribe(promise, undefined, function (value) { enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value) }, function (reason) { enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason) }) }; function lib$es6$promise$promise$all$$all(entries) { return new lib$es6$promise$enumerator$$default(this, entries).promise } var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all; function lib$es6$promise$promise$race$$race(entries) { var Constructor = this; var promise = new Constructor(lib$es6$promise$$internal$$noop); if (!lib$es6$promise$utils$$isArray(entries)) { lib$es6$promise$$internal$$reject(promise, new TypeError("You must pass an array to race.")); return promise } var length = entries.length; function onFulfillment(value) { lib$es6$promise$$internal$$resolve(promise, value) } function onRejection(reason) { lib$es6$promise$$internal$$reject(promise, reason) } for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) { lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection) } return promise } var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race; function lib$es6$promise$promise$resolve$$resolve(object) { var Constructor = this; if (object && typeof object === "object" && object.constructor === Constructor) { return object } var promise = new Constructor(lib$es6$promise$$internal$$noop); lib$es6$promise$$internal$$resolve(promise, object); return promise } var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve; function lib$es6$promise$promise$reject$$reject(reason) { var Constructor = this; var promise = new Constructor(lib$es6$promise$$internal$$noop); lib$es6$promise$$internal$$reject(promise, reason); return promise } var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject; var lib$es6$promise$promise$$counter = 0; function lib$es6$promise$promise$$needsResolver() { throw new TypeError("You must pass a resolver function as the first argument to the promise constructor") } function lib$es6$promise$promise$$needsNew() { throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.") } var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise; function lib$es6$promise$promise$$Promise(resolver) { this._id = lib$es6$promise$promise$$counter++; this._state = undefined; this._result = undefined; this._subscribers = []; if (lib$es6$promise$$internal$$noop !== resolver) { if (!lib$es6$promise$utils$$isFunction(resolver)) { lib$es6$promise$promise$$needsResolver() } if (!(this instanceof lib$es6$promise$promise$$Promise)) { lib$es6$promise$promise$$needsNew() } lib$es6$promise$$internal$$initializePromise(this, resolver) } } lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default; lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default; lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default; lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default; lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler; lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap; lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap; lib$es6$promise$promise$$Promise.prototype = { constructor: lib$es6$promise$promise$$Promise, then: function (onFulfillment, onRejection) { var parent = this; var state = parent._state; if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) { return this } var child = new this.constructor(lib$es6$promise$$internal$$noop); var result = parent._result; if (state) { var callback = arguments[state - 1]; lib$es6$promise$asap$$asap(function () { lib$es6$promise$$internal$$invokeCallback(state, child, callback, result) }) } else { lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) } return child }, "catch": function (onRejection) { return this.then(null, onRejection) } }; function lib$es6$promise$polyfill$$polyfill() { var local; if (typeof global !== "undefined") { local = global } else if (typeof self !== "undefined") { local = self } else { try { local = Function("return this")() } catch (e) { throw new Error("polyfill failed because global object is unavailable in this environment") } } var P = local.Promise; if (P && Object.prototype.toString.call(P.resolve()) === "[object Promise]" && !P.cast) { return } local.Promise = lib$es6$promise$promise$$default } var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill; var lib$es6$promise$umd$$ES6Promise = { Promise: lib$es6$promise$promise$$default, polyfill: lib$es6$promise$polyfill$$default }; if (typeof define === "function" && define["amd"]) { define(function () { return lib$es6$promise$umd$$ES6Promise }) } else if (typeof module !== "undefined" && module["exports"]) { module["exports"] = lib$es6$promise$umd$$ES6Promise } else if (typeof this !== "undefined") { this["ES6Promise"] = lib$es6$promise$umd$$ES6Promise } lib$es6$promise$polyfill$$default() }).call(this);
    }

    var cssPrefixes = ['Webkit', 'Moz', 'ms'],
        emptyStyles = document.createElement('div').style,
        CSS_TRANS_ORG,
        CSS_TRANSFORM,
        CSS_USERSELECT;

    function vendorPrefix(prop) {
        if (prop in emptyStyles) {
            return prop;
        }

        var capProp = prop[0].toUpperCase() + prop.slice(1),
            i = cssPrefixes.length;

        while (i--) {
            prop = cssPrefixes[i] + capProp;
            if (prop in emptyStyles) {
                return prop;
            }
        }
    }

    CSS_TRANSFORM = vendorPrefix('transform');
    CSS_TRANS_ORG = vendorPrefix('transformOrigin');
    CSS_USERSELECT = vendorPrefix('userSelect');


    function deepExtend(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj)
                continue;

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        out[key] = deepExtend({}, obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }
        return out;
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function dispatchChange(element) {
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            element.dispatchEvent(evt);
        }
        else {
            element.fireEvent("onchange");
        }
    }

    //http://jsperf.com/vanilla-css
    function css(el, styles, val) {
        if (typeof (styles) === 'string') {
            var tmp = styles;
            styles = {};
            styles[tmp] = val;
        }

        for (var prop in styles) {
            el.style[prop] = styles[prop];
        }
    }

    /* Image Drawing Functions */
    function getHtmlImage(data) {
        var points = data.points,
            div = document.createElement('div'),
            img = document.createElement('img'),
            width = points[2] - points[0],
            height = points[3] - points[1];
        // scale = data.zoom;

        div.classList.add('croppie-result');
        div.appendChild(img);
        css(img, {
            left: (-1 * points[0]) + 'px',
            top: (-1 * points[1]) + 'px'
            // transform: 'scale(' + scale + ')'
        })
        img.src = data.url;
        css(div, {
            width: width + 'px',
            height: height + 'px'
        });

        return div;
    }

    function getCanvasImage(img, data) {
        var points = data.points,
            left = points[0],
            top = points[1],
            width = (points[2] - points[0]),
            height = (points[3] - points[1]),
            circle = data.circle,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            outWidth = width,
            outHeight = height;

        if (data.outputWidth && data.outputHeight) {
            outWidth = data.outputWidth;
            outHeight = data.outputHeight;
        }

        canvas.width = outWidth;
        canvas.height = outHeight;

        if (circle) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(outWidth / 2, outHeight / 2, outWidth / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
        }

        ctx.drawImage(img, left, top, width, height, 0, 0, outWidth, outHeight);

        return canvas.toDataURL();
    }

    /* Utilities */
    function loadImage(src, imageEl) {
        var img = imageEl || new Image(),
            prom;

        prom = new Promise(function (resolve, reject) {
            if (src.substring(0,4).toLowerCase() === 'http') {
                img.setAttribute('crossOrigin', 'anonymous');
            }
            img.onload = function () {
                setTimeout(function () {
                    resolve(img);
                }, 1);
            };
        });

        img.src = src;
        return prom;
    }

    /* CSS Transform Prototype */
    var _TRANSLATE = 'translate3d',
        _TRANSLATE_SUFFIX = ', 0px';
    var Transform = function (x, y, scale) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.scale = parseFloat(scale);
    };

    Transform.parse = function (v) {
        if (v.style) {
            return Transform.parse(v.style[CSS_TRANSFORM]);
        }
        else if (v.indexOf('matrix') > -1 || v.indexOf('none') > -1) {
            return Transform.fromMatrix(v);
        }
        else {
            return Transform.fromString(v);
        }
    };

    Transform.fromMatrix = function (v) {
        var vals = v.substring(7).split(',');
        if (!vals.length || v === 'none') {
            vals = [1, 0, 0, 1, 0, 0];
        }

        return new Transform(parseInt(vals[4], 10), parseInt(vals[5], 10), parseFloat(vals[0]));
    };

    Transform.fromString = function (v) {
        var values = v.split(') '),
            translate = values[0].substring(_TRANSLATE.length + 1).split(','),
            scale = values.length > 1 ? values[1].substring(6) : 1,
            x = translate.length > 1 ? translate[0] : 0,
            y = translate.length > 1 ? translate[1] : 0;

        return new Transform(x, y, scale);
    }

    Transform.prototype.toString = function () {
        return _TRANSLATE + '(' + this.x + 'px, ' + this.y + 'px' + _TRANSLATE_SUFFIX + ') scale(' + this.scale + ')';
    };

    var TransformOrigin = function (el) {
        if (!el || !el.style[CSS_TRANS_ORG]) {
            this.x = 0;
            this.y = 0;
            return;
        }
        var css = el.style[CSS_TRANS_ORG].split(' ');
        this.x = parseFloat(css[0]);
        this.y = parseFloat(css[1]);
    };

    TransformOrigin.prototype.toString = function () {
        return this.x + 'px ' + this.y + 'px';
    };

    /* Private Methods */
    function _create() {
        var self = this,
            contClass = ['croppie-container'],
            customViewportClass = self.options.viewport.type ? 'cr-vp-' + self.options.viewport.type : null,
            boundary, img, viewport, overlay;

        // Properties on class
        self.data = {};
        self.elements = {};

        // Generating Markup
        boundary = self.elements.boundary = document.createElement('div');
        viewport = self.elements.viewport = document.createElement('div');
        img = self.elements.img = document.createElement('img');
        overlay = self.elements.overlay = document.createElement('div');

        boundary.classList.add('cr-boundary');
        css(boundary, {
            width: self.options.boundary.width + 'px',
            height: self.options.boundary.height + 'px'
        });

        viewport.classList.add('cr-viewport');
        if (customViewportClass) {
            viewport.classList.add(customViewportClass);
        }
        css(viewport, {
            width: self.options.viewport.width + 'px',
            height: self.options.viewport.height + 'px'
        });

        img.classList.add('cr-image');
        overlay.classList.add('cr-overlay');

        self.element.appendChild(boundary);
        boundary.appendChild(img);
        boundary.appendChild(viewport);
        boundary.appendChild(overlay);

        self.element.classList.add(contClass);
        if (self.options.customClass) {
            self.element.classList.add(self.options.customClass);
        }

        // Initialize drag & zoom
        _initDraggable.call(this);

        if (self.options.enableZoom) {
            _initializeZoom.call(self);
        }
    }

    function _setZoomerVal(v) {
        if (this.options.enableZoom) {
            this.elements.zoomer.value = fix(v, 2);
        }
    }

    function _initializeZoom() {
        var self = this,
            wrap = self.elements.zoomerWrap = document.createElement('div'),
            zoomer = self.elements.zoomer = document.createElement('input'),
            origin,
            viewportRect,
            transform;

        wrap.classList.add('cr-slider-wrap');
        zoomer.type = 'range';
        zoomer.classList.add('cr-slider');
        zoomer.step = '0.01';
        zoomer.value = 1;
        zoomer.style.display = self.options.showZoomer ? '' : 'none';

        self.element.appendChild(wrap);
        wrap.appendChild(zoomer);

        self._currentZoom = 1;
        function start() {
            _updateCenterPoint.call(self);
            origin = new TransformOrigin(self.elements.img);
            viewportRect = self.elements.viewport.getBoundingClientRect();
            transform = Transform.parse(self.elements.img);
        }

        function change() {
            _onZoom.call(self, {
                value: parseFloat(zoomer.value),
                origin: origin || new TransformOrigin(self.elements.img),
                viewportRect: viewportRect || self.elements.viewport.getBoundingClientRect(),
                transform: transform || Transform.parse(self.elements.img)
            });
        }

        function scroll(ev) {
            var delta, targetZoom;
        
            if (ev.wheelDelta) {
                delta = ev.wheelDelta / 1200; //wheelDelta min: -120 max: 120 // max x 10 x 2
            } else if (ev.deltaY) {
                delta = ev.deltaY / 1060; //deltaY min: -53 max: 53 // max x 10 x 2
            } else if (ev.detail) {
                delta = ev.detail / 60; //delta min: -3 max: 3 // max x 10 x 2
            } else {
                delta = 0;
            }
        
            targetZoom = self._currentZoom + delta;
        
            ev.preventDefault();
            start();
            _setZoomerVal.call(self, targetZoom);
            change();
        }

        self.elements.zoomer.addEventListener('mousedown', start);
        self.elements.zoomer.addEventListener('touchstart', start);

        self.elements.zoomer.addEventListener('input', change);// this is being fired twice on keypress
        self.elements.zoomer.addEventListener('change', change);

        if (self.options.mouseWheelZoom) {
            self.elements.boundary.addEventListener('mousewheel', scroll);
            self.elements.boundary.addEventListener('DOMMouseScroll', scroll);
        }
    }

    function _onZoom(ui) {
        var self = this,
            transform = ui.transform,
            vpRect = ui.viewportRect,
            origin = ui.origin;

        self._currentZoom = ui.value;
        transform.scale = self._currentZoom;

        var boundaries = _getVirtualBoundaries.call(self, vpRect),
            transBoundaries = boundaries.translate,
            oBoundaries = boundaries.origin;

        if (transform.x >= transBoundaries.maxX) {
            origin.x = oBoundaries.minX;
            transform.x = transBoundaries.maxX;
        }

        if (transform.x <= transBoundaries.minX) {
            origin.x = oBoundaries.maxX;
            transform.x = transBoundaries.minX;
        }

        if (transform.y >= transBoundaries.maxY) {
            origin.y = oBoundaries.minY;
            transform.y = transBoundaries.maxY;
        }

        if (transform.y <= transBoundaries.minY) {
            origin.y = oBoundaries.maxY;
            transform.y = transBoundaries.minY;
        }

        var transCss = {};
        transCss[CSS_TRANSFORM] = transform.toString();
        transCss[CSS_TRANS_ORG] = origin.toString();
        css(self.elements.img, transCss);

        _debouncedOverlay.call(self);
        _triggerUpdate.call(self);
    }

    function _getVirtualBoundaries(viewport) {
        var self = this,
            scale = self._currentZoom,
            vpWidth = viewport.width,
            vpHeight = viewport.height,
            centerFromBoundaryX = self.options.boundary.width / 2,
            centerFromBoundaryY = self.options.boundary.height / 2,
            originalImgWidth = self._originalImageWidth,
            originalImgHeight = self._originalImageHeight,
            curImgWidth = originalImgWidth * scale,
            curImgHeight = originalImgHeight * scale,
            halfWidth = vpWidth / 2,
            halfHeight = vpHeight / 2;


        var maxX = ((halfWidth / scale) - centerFromBoundaryX) * -1;
        var minX = maxX - ((curImgWidth * (1 / scale)) - (vpWidth * (1 / scale)));

        var maxY = ((halfHeight / scale) - centerFromBoundaryY) * -1;
        var minY = maxY - ((curImgHeight * (1 / scale)) - (vpHeight * (1 / scale)));

        var originMinX = (1 / scale) * halfWidth;
        var originMaxX = (curImgWidth * (1 / scale)) - originMinX;

        var originMinY = (1 / scale) * halfHeight;
        var originMaxY = (curImgHeight * (1 / scale)) - originMinY;

        return {
            translate: {
                maxX: maxX,
                minX: minX,
                maxY: maxY,
                minY: minY
            },
            origin: {
                maxX: originMaxX,
                minX: originMinX,
                maxY: originMaxY,
                minY: originMinY
            }
        };
    }

    function _updateCenterPoint() {
        var self = this,
            scale = self._currentZoom,
            data = self.elements.img.getBoundingClientRect(),
            vpData = self.elements.viewport.getBoundingClientRect(),
            transform = Transform.parse(self.elements.img.style[CSS_TRANSFORM]),
            pc = new TransformOrigin(self.elements.img),
            top = (vpData.top - data.top) + (vpData.height / 2),
            left = (vpData.left - data.left) + (vpData.width / 2),
            center = {},
            adj = {};

        center.y = top / scale;
        center.x = left / scale;

        adj.y = (center.y - pc.y) * (1 - scale);
        adj.x = (center.x - pc.x) * (1 - scale);

        transform.x -= adj.x;
        transform.y -= adj.y;

        var newCss = {};
        newCss[CSS_TRANS_ORG] = center.x + 'px ' + center.y + 'px';
        newCss[CSS_TRANSFORM] = transform.toString();
        css(self.elements.img, newCss);
    }

    function _initDraggable() {
        var self = this,
            isDragging = false,
            originalX,
            originalY,
            originalDistance,
            vpRect;

        function mouseDown(ev) {
            ev.preventDefault();
            if (isDragging) return;
            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;

            if (ev.touches) {
                var touches = ev.touches[0];
                originalX = touches.pageX;
                originalY = touches.pageY;
            }

            transform = Transform.parse(self.elements.img);
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('touchmove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
            window.addEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = 'none';
            vpRect = self.elements.viewport.getBoundingClientRect();
        }

        function mouseMove(ev) {
            ev.preventDefault();
            var pageX = ev.pageX,
                pageY = ev.pageY;

            if (ev.touches) {
                var touches = ev.touches[0];
                pageX = touches.pageX;
                pageY = touches.pageY;
            }

            var deltaX = pageX - originalX,
                deltaY = pageY - originalY,
                imgRect = self.elements.img.getBoundingClientRect(),
                top = transform.y + deltaY,
                left = transform.x + deltaX,
                newCss = {};

            if (ev.type == 'touchmove') {
                if (ev.touches.length > 1) {
                    var touch1 = ev.touches[0];
                    var touch2 = ev.touches[1];
                    var dist = Math.sqrt((touch1.pageX - touch2.pageX) * (touch1.pageX - touch2.pageX) + (touch1.pageY - touch2.pageY) * (touch1.pageY - touch2.pageY));

                    if (!originalDistance) {
                        originalDistance = dist / self._currentZoom;
                    }

                    var scale = dist / originalDistance;

                    _setZoomerVal.call(self, scale);
                    dispatchChange(self.elements.zoomer);
                    return;
                }
            }

            if (vpRect.top > imgRect.top + deltaY && vpRect.bottom < imgRect.bottom + deltaY) {
                transform.y = top;
            }

            if (vpRect.left > imgRect.left + deltaX && vpRect.right < imgRect.right + deltaX) {
                transform.x = left;
            }

            newCss[CSS_TRANSFORM] = transform.toString();
            css(self.elements.img, newCss);
            _updateOverlay.call(self);
            originalY = pageY;
            originalX = pageX;
        }

        function mouseUp() {
            isDragging = false;
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = '';
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalDistance = 0;
        }

        self.elements.overlay.addEventListener('mousedown', mouseDown);
        self.elements.overlay.addEventListener('touchstart', mouseDown);
    }

    function _updateOverlay() {
        var self = this,
            boundRect = self.elements.boundary.getBoundingClientRect(),
            imgData = self.elements.img.getBoundingClientRect();

        css(self.elements.overlay, {
            width: imgData.width + 'px',
            height: imgData.height + 'px',
            top: (imgData.top - boundRect.top) + 'px',
            left: (imgData.left - boundRect.left) + 'px'
        });
    }
    var _debouncedOverlay = debounce(_updateOverlay, 500);

    function _triggerUpdate() {
        var self = this;
        if (_isVisible.call(self)) {
            self.options.update.call(self, self.get());
        }
    }

    function _isVisible() {
        return this.elements.img.offsetHeight > 0 && this.elements.img.offsetWidth > 0;
    }

    function _updatePropertiesFromImage() {
        var self = this,
            minZoom = 0,
            maxZoom = 1.5,
            initialZoom = 1,
            cssReset = {},
            img = self.elements.img,
            zoomer = self.elements.zoomer,
            transformReset = new Transform(0, 0, initialZoom),
            originReset = new TransformOrigin(),
            isVisible = _isVisible.call(self),
            imgData,
            vpData,
            boundaryData,
            minW,
            minH;

        if (!isVisible || self.data.bound) {
            // if the croppie isn't visible or it doesn't need binding
            return;
        }

        self.data.bound = true;
        cssReset[CSS_TRANSFORM] = transformReset.toString();
        cssReset[CSS_TRANS_ORG] = originReset.toString();
        css(img, cssReset);

        imgData = img.getBoundingClientRect();
        vpData = self.elements.viewport.getBoundingClientRect();
        boundaryData = self.elements.boundary.getBoundingClientRect();
        self._originalImageWidth = imgData.width;
        self._originalImageHeight = imgData.height;

        if (self.options.enableZoom) {
            minW = vpData.width / imgData.width;
            minH = vpData.height / imgData.height;
            minZoom = Math.max(minW, minH);

            if (minZoom >= maxZoom) {
                maxZoom = minZoom + 1;
            }

            zoomer.min = fix(minZoom, 2)
            zoomer.max = fix(maxZoom, 2);
            initialZoom = Math.max((boundaryData.width / imgData.width), (boundaryData.height / imgData.height));
            _setZoomerVal.call(self, initialZoom);
            dispatchChange(zoomer);
        }

        self._currentZoom = transformReset.scale = initialZoom;
        cssReset[CSS_TRANSFORM] = transformReset.toString();
        css(img, cssReset);

        if (self.data.points.length) {
            _bindPoints.call(self, self.data.points);
        }
        else {
            _centerImage.call(self);
        }

        
        _updateOverlay.call(self);
    }

    function _bindPoints(points) {
        if (points.length != 4) {
            throw "Croppie - Invalid number of points supplied: " + points;
        }
        var self = this,
            pointsWidth = points[2] - points[0],
            // pointsHeight = points[3] - points[1],
            vpData = self.elements.viewport.getBoundingClientRect(),
            boundRect = self.elements.boundary.getBoundingClientRect(),
            vpOffset = {
                left: vpData.left - boundRect.left,
                top: vpData.top - boundRect.top
            },
            scale = vpData.width / pointsWidth,
            originTop = points[1],
            originLeft = points[0],
            transformTop = (-1 * points[1]) + vpOffset.top,
            transformLeft = (-1 * points[0]) + vpOffset.left,
            newCss = {};

        newCss[CSS_TRANS_ORG] = originLeft + 'px ' + originTop + 'px';
        newCss[CSS_TRANSFORM] = new Transform(transformLeft, transformTop, scale).toString();
        css(self.elements.img, newCss);

        _setZoomerVal.call(self, scale);
        self._currentZoom = scale;
    }

    function _centerImage() {
        var self = this,
            imgDim = self.elements.img.getBoundingClientRect(),
            vpDim = self.elements.viewport.getBoundingClientRect(),
            boundDim = self.elements.boundary.getBoundingClientRect(),
            vpLeft = vpDim.left - boundDim.left,
            vpTop = vpDim.top - boundDim.top,
            w = vpLeft - ((imgDim.width - vpDim.width) / 2),
            h = vpTop - ((imgDim.height - vpDim.height) / 2),
            transform = new Transform(w, h, self._currentZoom);

        css(self.elements.img, CSS_TRANSFORM, transform.toString());
    }

    function _bind(options, cb) {
        var self = this,
            url,
            points = [];

        if (typeof (options) === 'string') {
            url = options;
            options = {};
        }
        else if (Array.isArray(options)) {
            points = options.slice();
        }
        else if (typeof (options) == 'undefined' && self.data.url) { //refreshing
            _updatePropertiesFromImage.call(self);
            _triggerUpdate.call(self);
            return null;
        }
        else {
            url = options.url;
            points = options.points || [];
        }

        self.data.bound = false;
        self.data.url = url || self.data.url;
        self.data.points = (points || self.data.points).map(function (p) {
            return parseFloat(p);
        });
        var prom = loadImage(url, self.elements.img);
        prom.then(function () {
            _updatePropertiesFromImage.call(self);
            _triggerUpdate.call(self);
            if (cb) {
                cb();
            }
        });
        return prom;
    }

    function fix(v, decimalPoints) {
        return parseFloat(v).toFixed(decimalPoints || 0);
    }

    function _get() {
        var self = this,
            imgData = self.elements.img.getBoundingClientRect(),
            vpData = self.elements.viewport.getBoundingClientRect(),
            x1 = vpData.left - imgData.left,
            y1 = vpData.top - imgData.top,
            x2 = x1 + vpData.width,
            y2 = y1 + vpData.height,
            scale = self._currentZoom;

        if (scale === Infinity || isNaN(scale)) {
            scale = 1;
        }

        x1 = Math.max(0, x1 / scale);
        y1 = Math.max(0, y1 / scale);
        x2 = Math.max(0, x2 / scale);
        y2 = Math.max(0, y2 / scale);
       
        return {
            points: [fix(x1), fix(y1), fix(x2), fix(y2)],
            zoom: scale
        };
    }

    function _result(options) {
        var self = this,
            data = _get.call(self),
            opts = options || { type: 'canvas', size: 'viewport' },
            type = (typeof (opts) === 'string' ? opts : opts.type),
            size = opts.size || 'viewport',
            vpRect,
            prom;

        if (size === 'viewport') {
            vpRect = self.elements.viewport.getBoundingClientRect();
            data.outputWidth = vpRect.width;
            data.outputHeight = vpRect.height;
        }

        data.circle = self.options.viewport.type === 'circle';
        data.url = self.data.url;

        prom = new Promise(function (resolve, reject) {
            if (type === 'canvas') {
                loadImage(data.url).then(function (img) {
                    resolve(getCanvasImage(img, data));
                });
            }
            else {
                resolve(getHtmlImage(data));
            }
        });
        return prom;
    }

    function _refresh() {
        console.warn("Croppie.refresh() is deprecated.  Please use Croppie.bind() without any arguments instead.  refresh() will be removed in a later release.");
        _updatePropertiesFromImage.call(this);
    }

    function _destroy() {
        var self = this;
        self.element.removeChild(self.elements.boundary);
        if (self.options.enableZoom) {
            self.element.removeChild(self.elements.zoomerWrap);
        }
        delete self.elements;
    }

    if (this.jQuery) {
        var $ = this.jQuery;
        $.fn.croppie = function (opts) {
            var ot = typeof opts;

            if (ot === 'string') {
                var args = Array.prototype.slice.call(arguments, 1);
                var singleInst = $(this).data('croppie');

                if (opts === 'get') {
                    return singleInst.get();
                }
                else if (opts === 'result') {
                    return singleInst.result.apply(singleInst, args);
                }

                return this.each(function () {
                    var i = $(this).data('croppie');
                    if (!i) return;

                    var method = i[opts];
                    if ($.isFunction(method)) {
                        method.apply(i, args);
                        if (opts === 'destroy') {
                            $(this).removeData('croppie');
                        }
                    }
                    else {
                        throw 'Croppie ' + opts + ' method not found';
                    }
                });
            }
            else {
                return this.each(function () {
                    var i = new Croppie(this, opts);
                    $(this).data('croppie', i);
                });
            }
        };
    }

    function Croppie(element, opts) {
        this.element = element;
        this.options = deepExtend({}, Croppie.defaults, opts);

        // backwards compatibility
        if (typeof(opts.showZoom) != 'undefined') {
            this.options.enableZoom = this.options.showZoomer = opts.showZoom;
        }

        _create.call(this);
    }

    Croppie.defaults = {
        viewport: {
            width: 100,
            height: 100,
            type: 'square'
        },
        boundary: {
            width: 300,
            height: 300
        },
        customClass: '',
        showZoomer: true,
        enableZoom: true,
        mouseWheelZoom: true,
        update: function () { }
    };

    deepExtend(Croppie.prototype, {
        bind: function (options, cb) {
            return _bind.call(this, options, cb);
        },
        get: function () {
            return _get.call(this);
        },
        result: function (type) {
            return _result.call(this, type);
        },
        refresh: function () {
            return _refresh.call(this);
        },
        setZoom: function (v) {
            _setZoomerVal.call(this, v);
            dispatchChange(this.elements.zoomer); 
        },
        destroy: function () {
            return _destroy.call(this);
        }
    });

    exports.Croppie = window.Croppie = Croppie;
}));
