(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.TWEEN = {})));
}(this, (function (exports) { 'use strict';

/* global global */


var root = typeof (window) !== 'undefined' ? window : typeof (global) !== 'undefined' ? global : this;
var requestAnimationFrame = root.requestAnimationFrame || (function (fn) { return root.setTimeout(fn, 16); });
var cancelAnimationFrame = root.cancelAnimationFrame || (function (id) { return root.clearTimeout(id); });

/* global process */
/**
 * Get browser/Node.js current time-stamp
 * @return Normalised current time-stamp in milliseconds
 * @memberof TWEEN
 * @example
 * TWEEN.now
 */
var now = (function () {
    if (typeof (process) !== 'undefined' && process.hrtime !== undefined) {
        return function () {
            var time = process.hrtime();
            // Convert [seconds, nanoseconds] to milliseconds.
            return time[0] * 1000 + time[1] / 1000000;
        };
        // In a browser, use window.performance.now if it is available.
    }
    else if (root.performance !== undefined &&
        root.performance.now !== undefined) {
        // This must be bound, because directly assigning this function
        // leads to an invocation exception in Chrome.
        return root.performance.now.bind(root.performance);
        // Use Date.now if it is available.
    }
    else {
        var offset_1 = root.performance && root.performance.timing && root.performance.timing.navigationStart ? root.performance.timing.navigationStart : Date.now();
        return function () {
            return Date.now() - offset_1;
        };
    }
}());
/**
 * Lightweight, effecient and modular ES6 version of tween.js
 * @copyright 2017 @dalisoft and es6-tween contributors
 * @license MIT
 * @namespace TWEEN
 * @example
 * // ES6
 * const {add, remove, isRunning, autoPlay} = TWEEN
 */
var _tweens = [];
var isStarted = false;
var _autoPlay = false;
var _tick;
var _ticker = requestAnimationFrame;
var _stopTicker = cancelAnimationFrame;
/**
 * Adds tween to list
 * @param {Tween} tween Tween instance
 * @memberof TWEEN
 * @example
 * let tween = new Tween({x:0})
 * tween.to({x:200}, 1000)
 * TWEEN.add(tween)
 */
var add = function (tween) {
    var i = _tweens.indexOf(tween);
    if (i > -1) {
        _tweens.splice(i, 1);
    }
    if (_tweens.length > 0) {
        i = _tweens.length - 1;
        var tweenPrev = _tweens[i];
        tween.prev = tweenPrev;
        tweenPrev.next = tween;
    }
    _tweens.push(tween);
    if (_autoPlay && !isStarted) {
        _tick = _ticker(update);
        isStarted = true;
    }
};
/**
 * Adds ticker like event
 * @param {Function} fn callback
 * @memberof TWEEN
 * @example
 * TWEEN.onTick(time => console.log(time))
 */
var onTick = function (fn) { return _tweens.push({ update: fn }); };
/**
 * @returns {Array<Tween>} List of tweens in Array
 * @memberof TWEEN
 * TWEEN.getAll() // list of tweens
 */
var getAll = function () { return _tweens; };
/**
 * Runs update loop automaticlly
 * @param {Boolean} state State of auto-run of update loop
 * @example TWEEN.autoPlay(true)
 * @memberof TWEEN
 */
var autoPlay = function (state) {
    _autoPlay = state;
};
/**
 * Removes all tweens from list
 * @example TWEEN.removeAll() // removes all tweens, stored in global tweens list
 * @memberof TWEEN
 */
var removeAll = function () {
    _tweens.length = 0;
};
/**
 * @param {Tween} tween Tween Instance to be matched
 * @return {Tween} Matched tween
 * @memberof TWEEN
 * @example
 * TWEEN.get(tween)
 */
var get = function (tween) {
    for (var i = 0; i < _tweens.length; i++) {
        if (tween === _tweens[i]) {
            return _tweens[i];
        }
    }
    return null;
};
/**
 * @param {Tween} tween Tween Instance to be matched
 * @return {Boolean} Status of Exists tween or not
 * @memberof TWEEN
 * @example
 * TWEEN.has(tween)
 */
var has = function (tween) {
    return get(tween) !== null;
};
/**
 * Removes tween from list
 * @param {Tween} tween Tween instance
 * @memberof TWEEN
 * @example
 * TWEEN.remove(tween)
 */
var remove = function (tween) {
    var i = _tweens.indexOf(tween);
    if (i !== -1) {
        _tweens.splice(i, 1);
    }
};
/**
 * Updates global tweens by given time
 * @param {number|Time} time Timestamp
 * @param {Boolean=} preserve Prevents tween to be removed after finish
 * @memberof TWEEN
 * @example
 * TWEEN.update(500)
 */
var update = function (time, preserve) {
    time = time !== undefined ? time : now();
    if (_autoPlay && isStarted) {
        _tick = _ticker(update);
    }
    if (!_tweens.length) {
        _stopTicker(_tick);
        isStarted = false;
        return false;
    }
    var i = 0;
    while (i < _tweens.length) {
        _tweens[i++].update(time, preserve);
    }
    return true;
};
/**
 * The state of ticker running
 * @return {Boolean} Status of running updates on all tweens
 * @memberof TWEEN
 * @example TWEEN.isRunning()
 */
var isRunning = function () { return isStarted; };
/**
 * The plugins store object
 * @namespace TWEEN.Plugins
 * @memberof TWEEN
 * @example
 * let num = Plugins.num = function (node, start, end) {
 * return t => start + (end - start) * t
 * }
 *
 * @static
 */
var Plugins = {};

/**
 * List of full easings
 * @namespace TWEEN.Easing
 * @example
 * import {Tween, Easing} from 'es6-tween'
 *
 * // then set via new Tween({x:0}).to({x:100}, 1000).easing(Easing.Quadratic.InOut).start()
 */
var Easing = {
    Linear: {
        None: function (k) {
            return k;
        }
    },
    Quadratic: {
        In: function (k) {
            return k * k;
        },
        Out: function (k) {
            return k * (2 - k);
        },
        InOut: function (k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k;
            }
            return -0.5 * (--k * (k - 2) - 1);
        }
    },
    Cubic: {
        In: function (k) {
            return k * k * k;
        },
        Out: function (k) {
            return --k * k * k + 1;
        },
        InOut: function (k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k;
            }
            return 0.5 * ((k -= 2) * k * k + 2);
        }
    },
    Quartic: {
        In: function (k) {
            return k * k * k * k;
        },
        Out: function (k) {
            return 1 - --k * k * k * k;
        },
        InOut: function (k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k;
            }
            return -0.5 * ((k -= 2) * k * k * k - 2);
        }
    },
    Quintic: {
        In: function (k) {
            return k * k * k * k * k;
        },
        Out: function (k) {
            return --k * k * k * k * k + 1;
        },
        InOut: function (k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k * k;
            }
            return 0.5 * ((k -= 2) * k * k * k * k + 2);
        }
    },
    Sinusoidal: {
        In: function (k) {
            return 1 - Math.cos(k * Math.PI / 2);
        },
        Out: function (k) {
            return Math.sin(k * Math.PI / 2);
        },
        InOut: function (k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        }
    },
    Exponential: {
        In: function (k) {
            return k === 0 ? 0 : Math.pow(1024, k - 1);
        },
        Out: function (k) {
            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        },
        InOut: function (k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            if ((k *= 2) < 1) {
                return 0.5 * Math.pow(1024, k - 1);
            }
            return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
        }
    },
    Circular: {
        In: function (k) {
            return 1 - Math.sqrt(1 - k * k);
        },
        Out: function (k) {
            return Math.sqrt(1 - --k * k);
        },
        InOut: function (k) {
            if ((k *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - k * k) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
        }
    },
    Elastic: {
        In: function (k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
        },
        Out: function (k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function (k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            k *= 2;
            if (k < 1) {
                return (-0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI));
            }
            return (0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1);
        }
    },
    Back: {
        In: function (k) {
            var s = 1.70158;
            return k * k * ((s + 1) * k - s);
        },
        Out: function (k) {
            var s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1;
        },
        InOut: function (k) {
            var s = 1.70158 * 1.525;
            if ((k *= 2) < 1) {
                return 0.5 * (k * k * ((s + 1) * k - s));
            }
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        }
    },
    Bounce: {
        In: function (k) {
            return 1 - Easing.Bounce.Out(1 - k);
        },
        Out: function (k) {
            if (k < 1 / 2.75) {
                return 7.5625 * k * k;
            }
            else if (k < 2 / 2.75) {
                return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
            }
            else if (k < 2.5 / 2.75) {
                return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
            }
            else {
                return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
            }
        },
        InOut: function (k) {
            if (k < 0.5) {
                return Easing.Bounce.In(k * 2) * 0.5;
            }
            return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
        }
    },
    Stepped: {
        steps: function (steps) { return function (k) { return ((k * steps) | 0) / steps; }; }
    }
};

/**
 * List of full Interpolation
 * @namespace TWEEN.Interpolation
 * @example
 * import {Interpolation, Tween} from 'es6-tween'
 *
 * let bezier = Interpolation.Bezier
 * new Tween({x:0}).to({x:[0, 4, 8, 12, 15, 20, 30, 40, 20, 40, 10, 50]}, 1000).interpolation(bezier).start()
 * @memberof TWEEN
 */
var Interpolation = {
    Linear: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.Linear;
        if (k < 0) {
            return fn(v[0], v[1], f);
        }
        if (k > 1) {
            return fn(v[m], v[m - 1], m - f);
        }
        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function (v, k) {
        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = Interpolation.Utils.Bernstein;
        for (var i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }
        return b;
    },
    CatmullRom: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor(f = m * (1 + k));
            }
            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        }
        else {
            if (k < 0) {
                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
            }
            if (k > 1) {
                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }
            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    },
    Utils: {
        Linear: function (p0, p1, t) {
            return typeof p0 === 'function' ? p0(t) : (p1 - p0) * t + p0;
        },
        Bernstein: function (n, i) {
            var fc = Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: (function () {
            var a = [1];
            return function (n) {
                var s = 1;
                if (a[n]) {
                    return a[n];
                }
                for (var i = n; i > 1; i--) {
                    s *= i;
                }
                a[n] = s;
                return s;
            };
        })(),
        CatmullRom: function (p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        }
    }
};

var PlaybackPosition = /** @class */ (function () {
    function PlaybackPosition() {
        this.totalTime = 0;
        this.labels = [];
        this.offsets = [];
    }
    PlaybackPosition.prototype.parseLabel = function (name, offset) {
        var _a = this, offsets = _a.offsets, labels = _a.labels;
        var i = labels.indexOf(name);
        if (typeof name === 'string' && name.indexOf('=') !== -1 && !offset && i === -1) {
            var rty = name.substr(name.indexOf('=') - 1, 2);
            var rt = name.split(rty);
            offset = rt.length === 2 ? rty + rt[1] : null;
            name = rt[0];
            i = labels.indexOf(name);
        }
        if (i !== -1 && name) {
            var currOffset = offsets[i] || 0;
            if (typeof offset === 'number') {
                currOffset = offset;
            }
            else if (typeof offset === 'string') {
                if (offset.indexOf('=') !== -1) {
                    var type = offset.charAt(0);
                    offset = Number(offset.substr(2));
                    if (type === '+' || type === '-') {
                        currOffset += parseFloat(type + offset);
                    }
                    else if (type === '*') {
                        currOffset *= offset;
                    }
                    else if (type === '/') {
                        currOffset /= offset;
                    }
                    else if (type === '%') {
                        currOffset *= offset / 100;
                    }
                }
            }
            return currOffset;
        }
        return typeof offset === 'number' ? offset : 0;
    };
    PlaybackPosition.prototype.addLabel = function (name, offset) {
        this.labels.push(name);
        this.offsets.push(this.parseLabel(name, offset));
        return this;
    };
    PlaybackPosition.prototype.setLabel = function (name, offset) {
        var i = this.labels.indexOf(name);
        if (i !== -1) {
            this.offsets.splice(i, 1, this.parseLabel(name, offset));
        }
        return this;
    };
    PlaybackPosition.prototype.eraseLabel = function (name) {
        var i = this.labels.indexOf(name);
        if (i !== -1) {
            this.labels.splice(i, 1);
            this.offsets.splice(i, 1);
        }
        return this;
    };
    return PlaybackPosition;
}());

var Store = {};
var NodeCache = function (node, object, tween) {
    if (!node || !node.nodeType) {
        return object;
    }
    var ID = node.queueID || 'q_' + Date.now();
    if (!node.queueID) {
        node.queueID = ID;
    }
    var storeID = Store[ID];
    if (storeID) {
        if (storeID.object === object && node === storeID.tween.node) {
            remove(storeID.tween);
        }
        else {
            for (var prop in object) {
                if (prop in storeID.object) {
                    if (tween.startTime === storeID.tween.startTime) {
                        delete storeID.object[prop];
                    }
                }
            }
            return object;
        }
        return storeID.object;
    }
    Store[ID] = { tween: tween, object: object };
    return Store[ID];
};

var Selector = function (selector, collection) {
    if (collection) {
        return !selector ? null : selector === window || selector === document ? [selector] : typeof selector === 'string' ? !!document.querySelectorAll && document.querySelectorAll(selector) : Array.isArray(selector) ? selector : selector.nodeType ? [selector] : [];
    }
    return !selector ? null : selector === window || selector === document ? selector : typeof selector === 'string' ? !!document.querySelector && document.querySelector(selector) : Array.isArray(selector) ? selector[0] : selector.nodeType ? selector : null;
};

// Frame lag-fix constants
var FRAME_MS = 50 / 3;
var TOO_LONG_FRAME_MS = 250;
var CHAINED_TWEENS = '_chainedTweens';
// Event System
var EVENT_CALLBACK = 'Callback';
var EVENT_UPDATE = 'update';
var EVENT_COMPLETE = 'complete';
var EVENT_START = 'start';
var EVENT_REPEAT = 'repeat';
var EVENT_REVERSE = 'reverse';
var EVENT_PAUSE = 'pause';
var EVENT_PLAY = 'play';
var EVENT_RESTART = 'restart';
var EVENT_STOP = 'stop';
var EVENT_SEEK = 'seek';
// For String tweening stuffs
var STRING_PROP = 'STRING_PROP';
// Also RegExp's for string tweening
var NUM_REGEX = /\s+|([A-Za-z?().,{}:""[\]#\%]+)|([-+]+)?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;

// Copies everything, duplicates, no shallow-copy
function deepCopy(source) {
    if (source === undefined || typeof source !== 'object') {
        return source;
    }
    else if (Array.isArray(source)) {
        return [].concat(source);
    }
    else if (typeof source === 'object') {
        var target = {};
        for (var prop in source) {
            target[prop] = deepCopy(source[prop]);
        }
        return target;
    }
    return source;
}

var isNaNForST = function (v) { return isNaN(+v) || v[0] === '+' || v[0] === '-' || v === '' || v === ' '; };
// Decompose value, now for only `string` that required
function decompose(prop, obj, from, to) {
    var fromValue = from[prop];
    var toValue = to[prop];
    if (typeof fromValue === 'string' && typeof toValue === 'string') {
        var fromValue1 = fromValue.match(NUM_REGEX).map(function (v) { return isNaNForST(v) ? v : +v; });
        var toValue1 = toValue.match(NUM_REGEX).map(function (v, i) { return isNaNForST(v) ? v : +v; });
        fromValue1.unshift(STRING_PROP);
        from[prop] = fromValue1;
        to[prop] = toValue1;
        return true;
    }
    else if (typeof fromValue === 'object' && typeof toValue === 'object') {
        if (Array.isArray(fromValue)) {
            return fromValue.map(function (v, i) { return decompose(i, obj[prop], fromValue, toValue); });
        }
        else {
            for (var prop2 in toValue) {
                decompose(prop2, obj[prop], fromValue, toValue);
            }
        }
        return true;
    }
    return false;
}

// Recompose value
var DECIMAL = Math.pow(10, 4);
function recompose(prop, obj, from, to, t, originalT) {
    var fromValue = from[prop];
    var toValue = to[prop];
    if (toValue === undefined) {
        return fromValue;
    }
    if (fromValue === undefined || typeof fromValue === 'string' || fromValue === toValue) {
        return toValue;
    }
    else if (typeof fromValue === 'object' && typeof toValue === 'object') {
        if (!fromValue || !toValue) {
            return obj[prop];
        }
        if (fromValue[0] === STRING_PROP) {
            var STRING_BUFFER = '';
            for (var i = 1, len = fromValue.length; i < len; i++) {
                var isRelative = typeof toValue[i - 1] === 'string';
                STRING_BUFFER += typeof toValue[i - 1] !== 'number' ? fromValue[i] : (((isRelative ? fromValue[i] + (+toValue[i - 1]) : fromValue[i] + (toValue[i - 1] - fromValue[i]) * t) * DECIMAL) | 0) / DECIMAL;
                if (originalT === 1) {
                    fromValue[i] = fromValue[i] + (+toValue[i - 1]);
                }
            }
            obj[prop] = STRING_BUFFER;
            return STRING_BUFFER;
        }
        else if (Array.isArray(fromValue)) {
            for (var i = 0, len = fromValue.length; i < len; i++) {
                if (fromValue[i] === toValue[i]) {
                    continue;
                }
                recompose(i, obj[prop], fromValue, toValue, t, originalT);
            }
        }
        else {
            for (var i in fromValue) {
                if (fromValue[i] === toValue[i]) {
                    continue;
                }
                recompose(i, obj[prop], fromValue, toValue, t, originalT);
            }
        }
    }
    else if (typeof fromValue === 'number') {
        var isRelative = typeof toValue === 'string';
        obj[prop] = (((isRelative ? fromValue + (+toValue) * t : fromValue + (toValue - fromValue) * t) * DECIMAL) | 0) / DECIMAL;
        if (isRelative && originalT === 1) {
            from[prop] = obj[prop];
        }
    }
    else if (typeof toValue === 'function') {
        obj[prop] = toValue(t);
    }
    return obj[prop];
}

// Dot notation => Object structure converter
// example
// {'scale.x.y.z':'VALUE'} => {scale:{x:{y:{z:'VALUE'}}}}
// Only works for 3-level parsing, after 3-level, parsing dot-notation not works as it's not affects
var propRegExp = /([.\[])/g;
var replaceBrace = /\]/g;
var propExtract = function (obj, property) {
    var value = obj[property];
    var props = property.replace(replaceBrace, '').split(propRegExp);
    var propsLastIndex = props.length - 1;
    var lastArr = Array.isArray(obj);
    var lastObj = typeof obj === 'object' && !lastArr;
    if (lastObj) {
        obj[property] = null;
        delete obj[property];
    }
    else if (lastArr) {
        obj.splice(property, 1);
    }
    return props.reduce(function (nested, prop, index) {
        if (lastArr) {
            if (prop !== '.' && prop !== '[') {
                prop *= 1;
            }
        }
        var nextProp = props[index + 1];
        var nextIsArray = nextProp === '[';
        if (prop === '.' || prop === '[') {
            if (prop === '.') {
                lastObj = true;
                lastArr = false;
            }
            else if (prop === '[') {
                lastObj = false;
                lastArr = true;
            }
            return nested;
        }
        else if (nested[prop] === undefined) {
            if (lastArr || lastObj) {
                nested[prop] = index === propsLastIndex ? value : lastArr || nextIsArray ? [] :
                    lastObj ? {}
                        : null;
                lastObj = lastArr = false;
                return nested[prop];
            }
        }
        else if (nested[prop] !== undefined) {
            if (index === propsLastIndex) {
                nested[prop] = value;
            }
            return nested[prop];
        }
        return nested;
    }, obj);
};
var SET_NESTED = function (nested) {
    if (typeof nested === 'object' && !!nested) {
        for (var prop in nested) {
            if (prop.indexOf('.') !== -1 || prop.indexOf('[') !== -1) {
                propExtract(nested, prop);
            }
            else if (typeof nested[prop] === 'object' && !!nested[prop]) {
                var nested2 = nested[prop];
                for (var prop2 in nested2) {
                    if (prop2.indexOf('.') !== -1 || prop2.indexOf('[') !== -1) {
                        propExtract(nested2, prop2);
                    }
                    else if (typeof nested2[prop2] === 'object' && !!nested2[prop2]) {
                        var nested3 = nested2[prop2];
                        for (var prop3 in nested3) {
                            if (prop3.indexOf('.') !== -1 || prop3.indexOf('[') !== -1) {
                                propExtract(nested3, prop3);
                            }
                        }
                    }
                }
            }
        }
    }
    return nested;
};

var _id$1 = 0; // Unique ID
var defaultEasing = Easing.Linear.None;
/**
 * Tween main constructor
 * @constructor
 * @class
 * @namespace Tween
 * @extends Tween
 * @param {Object|Element} node Node Element or Tween initial object
 * @param {Object=} object If Node Element is using, second argument is used for Tween initial object
 * @example let tween = new Tween(myNode, {width:'100px'}).to({width:'300px'}, 2000).start()
 */
var Tween = /** @class */ (function () {
    function Tween(node, object) {
        this._chainedTweensCount = 0;
        this.id = _id$1++;
        if (!!node && typeof node === 'object' && !object && !node.nodeType) {
            object = this.object = node;
            node = null;
        }
        else if (!!node &&
            (node.nodeType || node.length || typeof node === 'string')) {
            node = this.node = Selector(node);
            object = this.object = NodeCache(node, object, this);
        }
        this._valuesEnd = null;
        this._valuesStart = {};
        this._duration = 1000;
        this._easingFunction = defaultEasing;
        this._easingReverse = defaultEasing;
        this._interpolationFunction = Interpolation.Linear;
        this._startTime = 0;
        this._initTime = 0;
        this._delayTime = 0;
        this._repeat = 0;
        this._r = 0;
        this._isPlaying = false;
        this._yoyo = false;
        this._reversed = false;
        this._onStartCallbackFired = false;
        this._pausedTime = null;
        this._isFinite = true;
        this._maxListener = 5;
        this._prevTime = null;
        return this;
    }
    /**
     * Easier way to call the Tween
     * @param {Element} node DOM Element
     * @param {object} object - Initial value
     * @param {object} to - Target value
     * @param {object} params - Options of tweens
     * @example Tween.fromTo(node, {x:0}, {x:200}, {duration:1000})
     * @memberof Tween
     * @static
     */
    Tween.fromTo = function (node, object, to, params) {
        if (params === void 0) { params = {}; }
        params.quickRender = params.quickRender ? params.quickRender : !to;
        var tween = new Tween(node, object).to(to, params);
        if (params.quickRender) {
            tween.render().update(tween._startTime);
            tween._rendered = false;
            tween._onStartCallbackFired = false;
        }
        return tween;
    };
    /**
     * Easier way calling constructor only applies the `to` value, useful for CSS Animation
     * @param {Element} node DOM Element
     * @param {object} to - Target value
     * @param {object} params - Options of tweens
     * @example Tween.to(node, {x:200}, {duration:1000})
     * @memberof Tween
     * @static
     */
    Tween.to = function (node, to, params) {
        return Tween.fromTo(node, null, to, params);
    };
    /**
     * Easier way calling constructor only applies the `from` value, useful for CSS Animation
     * @param {Element} node DOM Element
     * @param {object} from - Initial value
     * @param {object} params - Options of tweens
     * @example Tween.from(node, {x:200}, {duration:1000})
     * @memberof Tween
     * @static
     */
    Tween.from = function (node, from, params) {
        return Tween.fromTo(node, from, null, params);
    };
    /**
     * Sets max `event` listener's count to Events system
     * @param {number} count - Event listener's count
     * @memberof Tween
     */
    Tween.prototype.setMaxListener = function (count) {
        if (count === void 0) { count = 5; }
        this._maxListener = count;
        return this;
    };
    /**
     * Adds `event` to Events system
     * @param {string} event - Event listener name
     * @param {Function} callback - Event listener callback
     * @memberof Tween
     */
    Tween.prototype.on = function (event, callback) {
        var _maxListener = this._maxListener;
        var callbackName = event + EVENT_CALLBACK;
        for (var i = 0; i < _maxListener; i++) {
            var callbackId = callbackName + i;
            if (!this[callbackId]) {
                this[callbackId] = callback;
            }
            break;
        }
        return this;
    };
    /**
     * Adds `event` to Events system.
     * Removes itself after fired once
     * @param {string} event - Event listener name
     * @param {Function} callback - Event listener callback
     * @memberof Tween
     */
    Tween.prototype.once = function (event, callback) {
        return this;
    };
    /**
     * Removes `event` from Events system
     * @param {string} event - Event listener name
     * @param {Function} callback - Event listener callback
     * @memberof Tween
     */
    Tween.prototype.off = function (event, callback) {
        var _maxListener = this._maxListener;
        var callbackName = event + EVENT_CALLBACK;
        for (var i = 0; i < _maxListener; i++) {
            var callbackId = callbackName + i;
            if (this[callbackId] === callback) {
                this[callbackId] = null;
            }
        }
        return this;
    };
    /**
     * Emits/Fired/Trigger `event` from Events system listeners
     * @param {string} event - Event listener name
     * @memberof Tween
     */
    Tween.prototype.emit = function (event, arg1, arg2, arg3, arg4) {
        var _maxListener = this._maxListener;
        var callbackName = event + EVENT_CALLBACK;
        if (!this[callbackName + 0]) {
            return this;
        }
        for (var i = 0; i < _maxListener; i++) {
            var callbackId = callbackName + i;
            if (this[callbackId]) {
                this[callbackId](arg1, arg2, arg3, arg4);
            }
        }
        return this;
    };
    /**
     * @return {boolean} State of playing of tween
     * @example tween.isPlaying() // returns `true` if tween in progress
     * @memberof Tween
     */
    Tween.prototype.isPlaying = function () {
        return this._isPlaying;
    };
    /**
     * @return {boolean} State of started of tween
     * @example tween.isStarted() // returns `true` if tween in started
     * @memberof Tween
     */
    Tween.prototype.isStarted = function () {
        return this._onStartCallbackFired;
    };
    /**
     * Reverses the tween state/direction
     * @example tween.reverse()
     * @param {boolean=} state Set state of current reverse
     * @memberof Tween
     */
    Tween.prototype.reverse = function (state) {
        var _reversed = this._reversed;
        this._reversed = state !== undefined ? state : !_reversed;
        return this;
    };
    /**
     * @return {boolean} State of reversed
     * @example tween.reversed() // returns `true` if tween in reversed state
     * @memberof Tween
     */
    Tween.prototype.reversed = function () {
        return this._reversed;
    };
    /**
     * Pauses tween
     * @example tween.pause()
     * @memberof Tween
     */
    Tween.prototype.pause = function () {
        if (!this._isPlaying) {
            return this;
        }
        this._isPlaying = false;
        remove(this);
        this._pausedTime = now();
        return this.emit(EVENT_PAUSE, this.object);
    };
    /**
     * Play/Resume the tween
     * @example tween.play()
     * @memberof Tween
     */
    Tween.prototype.play = function () {
        if (this._isPlaying) {
            return this;
        }
        this._isPlaying = true;
        this._startTime += now() - this._pausedTime;
        this._initTime = this._startTime;
        add(this);
        this._pausedTime = now();
        return this.emit(EVENT_PLAY, this.object);
    };
    /**
     * Restarts tween from initial value
     * @param {boolean=} noDelay If this param is set to `true`, restarts tween without `delay`
     * @example tween.restart()
     * @memberof Tween
     */
    Tween.prototype.restart = function (noDelay) {
        this._repeat = this._r;
        this.reassignValues();
        add(this);
        return this.emit(EVENT_RESTART, this.object);
    };
    /**
     * Seek tween value by `time`. Note: Not works as excepted. PR are welcome
     * @param {Time} time Tween update time
     * @param {boolean=} keepPlaying When this param is set to `false`, tween pausing after seek
     * @example tween.seek(500)
     * @memberof Tween
     * @deprecated Not works as excepted, so we deprecated this method
     */
    Tween.prototype.seek = function (time, keepPlaying) {
        var _a = this, _duration = _a._duration, _repeat = _a._repeat, _initTime = _a._initTime, _startTime = _a._startTime, _delayTime = _a._delayTime, _reversed = _a._reversed;
        var updateTime = _initTime + time;
        this._isPlaying = true;
        if (updateTime < _startTime && (_startTime >= _initTime)) {
            this._startTime -= _duration;
            this._reversed = !_reversed;
        }
        this.update(time, false);
        this.emit(EVENT_SEEK, time, this.object);
        return keepPlaying ? this : this.pause();
    };
    /**
     * Sets tween duration
     * @param {number} amount Duration is milliseconds
     * @example tween.duration(2000)
     * @memberof Tween
     */
    Tween.prototype.duration = function (amount) {
        this._duration =
            typeof amount === 'function' ? amount(this._duration) : amount;
        return this;
    };
    /**
     * Sets target value and duration
     * @param {object} properties Target value (to value)
     * @param {number|Object=} [duration=1000] Duration of tween
     * @example let tween = new Tween({x:0}).to({x:100}, 2000)
     * @memberof Tween
     */
    Tween.prototype.to = function (properties, duration, maybeUsed) {
        if (duration === void 0) { duration = 1000; }
        this._valuesEnd = properties;
        if (typeof duration === 'number' || typeof duration === 'function') {
            this._duration =
                typeof duration === 'function' ? duration(this._duration) : duration;
        }
        else if (typeof duration === 'object') {
            for (var prop in duration) {
                if (typeof this[prop] === 'function') {
                    var _a = Array.isArray(duration[prop]) ? duration[prop] : [duration[prop]], _b = _a[0], arg1 = _b === void 0 ? null : _b, _c = _a[1], arg2 = _c === void 0 ? null : _c, _d = _a[2], arg3 = _d === void 0 ? null : _d, _e = _a[3], arg4 = _e === void 0 ? null : _e;
                    this[prop](arg1, arg2, arg3, arg4);
                }
            }
        }
        return this;
    };
    /**
     * Renders and computes value at first render
     * @private
     * @memberof Tween
     */
    Tween.prototype.render = function () {
        if (this._rendered) {
            return this;
        }
        var _a = this, _valuesStart = _a._valuesStart, _valuesEnd = _a._valuesEnd, object = _a.object, Renderer = _a.Renderer, node = _a.node, InitialValues = _a.InitialValues;
        SET_NESTED(object);
        SET_NESTED(_valuesEnd);
        if (node && InitialValues) {
            if (!object) {
                object = this.object = NodeCache(node, InitialValues(node, _valuesEnd), this);
            }
            else if (!_valuesEnd) {
                _valuesEnd = this._valuesEnd = InitialValues(node, object);
            }
        }
        for (var property in _valuesEnd) {
            var start = object && object[property];
            var end = _valuesEnd[property];
            if (Plugins[property]) {
                var plugin = Plugins[property].prototype.update
                    ? new Plugins[property](this, start, end, property, object)
                    : Plugins[property](this, start, end, property, object);
                if (plugin) {
                    _valuesEnd[property] = plugin;
                }
                continue;
            }
            if ((typeof start === 'number' && isNaN(start)) || start === null || end === null || start === undefined || end === undefined || start === end) {
                continue;
            }
            if (Array.isArray(end) && typeof start === 'number') {
                end.unshift(start);
            }
            _valuesStart[property] = deepCopy(start);
            decompose(property, object, _valuesStart, _valuesEnd);
        }
        if (Renderer && this.node) {
            this.__render = new Renderer(this, object, _valuesEnd);
        }
        return this;
    };
    /**
     * Start the tweening
     * @param {number|string} time setting manual time instead of Current browser timestamp or like `+1000` relative to current timestamp
     * @example tween.start()
     * @memberof Tween
     */
    Tween.prototype.start = function (time) {
        this._startTime =
            time !== undefined
                ? typeof time === 'string' ? now() + parseFloat(time) : time
                : now();
        this._startTime += this._delayTime;
        this._initTime = this._prevTime = this._startTime;
        this._onStartCallbackFired = false;
        this._rendered = false;
        this._isPlaying = true;
        add(this);
        return this;
    };
    /**
     * Stops the tween
     * @example tween.stop()
     * @memberof Tween
     */
    Tween.prototype.stop = function () {
        var _a = this, _isPlaying = _a._isPlaying, _isFinite = _a._isFinite, object = _a.object, _startTime = _a._startTime, _delayTime = _a._delayTime, _duration = _a._duration, _r = _a._r, _yoyo = _a._yoyo, _reversed = _a._reversed;
        if (!_isPlaying) {
            return this;
        }
        var atEnd = _isFinite ? ((_r + 1) % 2 === 1) && _yoyo : _reversed;
        this._reversed = false;
        if (atEnd) {
            this.update(_startTime + _duration);
        }
        else {
            this.update(_startTime);
        }
        remove(this);
        return this.emit(EVENT_STOP, object);
    };
    /**
     * Set delay of tween
     * @param {number} amount Sets tween delay / wait duration
     * @example tween.delay(500)
     * @memberof Tween
     */
    Tween.prototype.delay = function (amount) {
        this._delayTime =
            typeof amount === 'function' ? amount(this._delayTime) : amount;
        return this;
    };
    /**
     * Chained tweens
     * @param {any} arguments Arguments list
     * @example tween.chainedTweens(tween1, tween2)
     * @memberof Tween
     */
    Tween.prototype.chainedTweens = function () {
        this._chainedTweensCount = arguments.length;
        if (!this._chainedTweensCount) {
            return this;
        }
        for (var i = 0, len = this._chainedTweensCount; i < len; i++) {
            this[CHAINED_TWEENS + i] = arguments[i];
        }
        return this;
    };
    /**
     * Sets how times tween is repeating
     * @param {amount} amount the times of repeat
     * @example tween.repeat(5)
     * @memberof Tween
     */
    Tween.prototype.repeat = function (amount) {
        this._repeat = !this._duration ? 0 : typeof amount === 'function' ? amount(this._repeat) : amount;
        this._r = this._repeat;
        this._isFinite = isFinite(amount);
        return this;
    };
    /**
     * Set delay of each repeat alternate of tween
     * @param {number} amount Sets tween repeat alternate delay / repeat alternate wait duration
     * @example tween.reverseDelay(500)
     * @memberof Tween
     */
    Tween.prototype.reverseDelay = function (amount) {
        this._reverseDelayTime =
            typeof amount === 'function' ? amount(this._reverseDelayTime) : amount;
        return this;
    };
    /**
     * Set `yoyo` state (enables reverse in repeat)
     * @param {boolean} state Enables alternate direction for repeat
     * @param {Function=} _easingReverse Easing function in reverse direction
     * @example tween.yoyo(true)
     * @memberof Tween
     */
    Tween.prototype.yoyo = function (state, _easingReverse) {
        this._yoyo =
            typeof state === 'function'
                ? state(this._yoyo)
                : state === null ? this._yoyo : state;
        if (!state) {
            this._reversed = false;
        }
        this._easingReverse = _easingReverse || null;
        return this;
    };
    /**
     * Set easing
     * @param {Function} _easingFunction Easing function, applies in non-reverse direction if Tween#yoyo second argument is applied
     * @example tween.easing(Easing.Elastic.InOut)
     * @memberof Tween
     */
    Tween.prototype.easing = function (_easingFunction) {
        this._easingFunction = _easingFunction;
        return this;
    };
    /**
     * Set interpolation
     * @param {Function} _interpolationFunction Interpolation function
     * @example tween.interpolation(Interpolation.Bezier)
     * @memberof Tween
     */
    Tween.prototype.interpolation = function (_interpolationFunction) {
        if (typeof _interpolationFunction === 'function') {
            this._interpolationFunction = _interpolationFunction;
        }
        return this;
    };
    /**
     * Reassigns value for rare-case like Tween#restart or for Timeline
     * @private
     * @memberof Tween
     */
    Tween.prototype.reassignValues = function (time) {
        var _a = this, _valuesStart = _a._valuesStart, object = _a.object, _delayTime = _a._delayTime;
        this._isPlaying = true;
        this._startTime = time !== undefined ? time : now();
        this._startTime += _delayTime;
        this._reversed = false;
        add(this);
        for (var property in _valuesStart) {
            var start = _valuesStart[property];
            object[property] = start;
        }
        return this;
    };
    /**
     * Updates initial object to target value by given `time`
     * @param {Time} time Current time
     * @param {boolean=} preserve Prevents from removing tween from store
     * @param {boolean=} forceTime Forces to be frame rendered, even mismatching time
     * @example tween.update(100)
     * @memberof Tween
     */
    Tween.prototype.update = function (time, preserve, forceTime) {
        var _a = this, _onStartCallbackFired = _a._onStartCallbackFired, _easingFunction = _a._easingFunction, _interpolationFunction = _a._interpolationFunction, _easingReverse = _a._easingReverse, _repeat = _a._repeat, _delayTime = _a._delayTime, _reverseDelayTime = _a._reverseDelayTime, _yoyo = _a._yoyo, _reversed = _a._reversed, _startTime = _a._startTime, _prevTime = _a._prevTime, _duration = _a._duration, _valuesStart = _a._valuesStart, _valuesEnd = _a._valuesEnd, object = _a.object, _isFinite = _a._isFinite, _isPlaying = _a._isPlaying, __render = _a.__render, _chainedTweensCount = _a._chainedTweensCount;
        var elapsed;
        var currentEasing;
        var property;
        if (!_duration) {
            elapsed = 1;
        }
        else {
            time = time !== undefined ? time : now();
            var delta = _startTime - _prevTime;
            if (delta > TOO_LONG_FRAME_MS) {
                _startTime -= delta - FRAME_MS;
                this._startTime = _startTime;
            }
            this._prevTime = time;
            if (!_isPlaying || (time < _startTime && !forceTime)) {
                return true;
            }
            elapsed = (time - _startTime) / _duration;
            elapsed = elapsed > 1 ? 1 : elapsed;
            elapsed = _reversed ? 1 - elapsed : elapsed;
        }
        if (!_onStartCallbackFired) {
            if (!this._rendered) {
                this.render();
                this._rendered = true;
            }
            this.emit(EVENT_START, object);
            this._onStartCallbackFired = true;
        }
        currentEasing = _reversed
            ? _easingReverse || _easingFunction
            : _easingFunction;
        if (!object) {
            return true;
        }
        for (property in _valuesEnd) {
            var start = _valuesStart[property];
            if (start === undefined || start === null) {
                continue;
            }
            var end = _valuesEnd[property];
            var value = currentEasing[property] ? currentEasing[property](elapsed) : typeof currentEasing === 'function' ? currentEasing(elapsed) : defaultEasing(elapsed);
            if (typeof end === 'number') {
                object[property] = (((start + (end - start) * value) * DECIMAL) | 0) / DECIMAL;
            }
            else if (Array.isArray(end) && typeof start === 'number') {
                object[property] = _interpolationFunction(end, value);
            }
            else if (end && end.update) {
                end.update(value);
            }
            else if (typeof end === 'function') {
                object[property] = end(value);
            }
            else {
                recompose(property, object, _valuesStart, _valuesEnd, value, elapsed);
            }
        }
        if (__render) {
            __render.update(object, elapsed);
        }
        this.emit(EVENT_UPDATE, object, elapsed);
        if (elapsed === 1 || (_reversed && !elapsed)) {
            if (_repeat > 0 && _duration > 0) {
                if (_isFinite) {
                    this._repeat--;
                }
                if (_yoyo) {
                    this._reversed = !_reversed;
                }
                this.emit(_yoyo && !_reversed ? EVENT_REVERSE : EVENT_REPEAT, object);
                if (_reversed && _reverseDelayTime) {
                    this._startTime = time - _reverseDelayTime;
                }
                else {
                    this._startTime = time + _delayTime;
                }
                return true;
            }
            else {
                if (!preserve) {
                    this._isPlaying = false;
                    remove(this);
                    _id$1--;
                }
                this.emit(EVENT_COMPLETE, object);
                this._repeat = this._r;
                if (_chainedTweensCount) {
                    for (var i = 0; i < _chainedTweensCount; i++) {
                        this[CHAINED_TWEENS + i].start(time + _duration);
                    }
                }
                return false;
            }
        }
        return true;
    };
    return Tween;
}());

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$1 = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var shuffle = function (a) {
    var j;
    var x;
    var i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
};
var _id = 0;
/**
 * Timeline main constructor.
 *
 * It works same as `Tween` instance, using `.repeat`, `.restart` or `etc` works like a `Tween`, so please see `Tween` class for methods
 * @constructor
 * @class
 * @namespace Timeline
 * @param {Object=} params Default params for new tweens
 * @example let tl = new Timeline({delay:200})
 * @extends Tween
 */
var Timeline = /** @class */ (function (_super) {
    __extends(Timeline, _super);
    function Timeline(params) {
        var _this = _super.call(this) || this;
        _this._duration = 0;
        _this._startTime = now();
        _this._tweens = [];
        _this.elapsed = 0;
        _this._id = _id++;
        _this._defaultParams = params;
        _this.position = new PlaybackPosition();
        _this.position.addLabel('afterLast', _this._duration);
        _this.position.addLabel('afterInit', _this._startTime);
        return _this;
    }
    Timeline.prototype.mapTotal = function (fn) {
        fn.call(this, this._tweens);
        return this;
    };
    Timeline.prototype.timingOrder = function (fn) {
        var timing = fn(this._tweens.map(function (t) { return t._startTime; }));
        this._tweens.map(function (tween, i) {
            tween._startTime = timing[i];
        });
        return this;
    };
    Timeline.prototype.getTiming = function (mode, nodes, params, offset) {
        if (offset === void 0) { offset = 0; }
        if (mode === 'reverse') {
            var stagger_1 = params.stagger;
            var totalStagger_1 = (stagger_1 || 0) * (nodes.length - 1);
            return nodes.map(function (node, i) { return totalStagger_1 - (stagger_1 || 0) * i + offset; });
        }
        else if (mode === 'async') {
            return nodes.map(function (node) { return offset; });
        }
        else if (mode === 'sequence' || mode === 'delayed') {
            var stagger_2 = params.stagger;
            if (!stagger_2) {
                stagger_2 = (params.duration || 1000) / (nodes.length - 1);
            }
            return nodes.map(function (node, i) { return stagger_2 * i + offset; });
        }
        else if (mode === 'oneByOne') {
            return nodes.map(function (node) { return params.duration; });
        }
        else if (mode === 'shuffle') {
            var stagger_3 = params.stagger;
            return shuffle(nodes.map(function (node, i) { return (stagger_3 || 0) * i + offset; }));
        }
        else {
            var stagger_4 = params.stagger;
            return nodes.map(function (node, i) { return (stagger_4 || 0) * i + offset; });
        }
    };
    /**
     * @param {Array<Element>} nodes DOM Elements Collection (converted to Array)
     * @param {object} from - Initial value
     * @param {object} to - Target value
     * @param {object} params - Options of tweens
     * @example tl.fromTo(nodes, {x:0}, {x:200}, {duration:1000, stagger:200})
     * @memberof Timeline
     * @static
     */
    Timeline.prototype.fromTo = function (nodes, from, to, params) {
        nodes = Selector(nodes, true);
        if (nodes && nodes.length) {
            if (this._defaultParams) {
                params = __assign$1({}, this._defaultParams, params);
            }
            var position = params.label;
            var offset = typeof position === 'number'
                ? position
                : this.position.parseLabel(typeof position !== 'undefined' ? position : 'afterLast', null);
            var mode = this.getTiming(params.mode, nodes, params, offset);
            for (var i = 0, node = void 0, len = nodes.length; i < len; i++) {
                node = nodes[i];
                this.add(Tween.fromTo(node, typeof from === 'function' ? from(i, nodes.length) : __assign$1({}, from), typeof to === 'function' ? to(i, nodes.length) : to, typeof params === 'function' ? params(i, nodes.length) : params), mode[i]);
            }
        }
        return this.start();
    };
    /**
     * @param {Array<Element>} nodes DOM Elements Collection (converted to Array)
     * @param {object} from - Initial value
     * @param {object} params - Options of tweens
     * @example tl.from(nodes, {x:200}, {duration:1000, stagger:200})
     * @memberof Timeline
     * @static
     */
    Timeline.prototype.from = function (nodes, from, params) {
        return this.fromTo(nodes, from, null, params);
    };
    /**
     * @param {Array<Element>} nodes DOM Elements Collection (converted to Array)
     * @param {object} to - Target value
     * @param {object} params - Options of tweens
     * @example tl.to(nodes, {x:200}, {duration:1000, stagger:200})
     * @memberof Timeline
     * @static
     */
    Timeline.prototype.to = function (nodes, to, params) {
        return this.fromTo(nodes, null, to, params);
    };
    /**
     * Add label to Timeline
     * @param {string} name Label name
     * @param {any} offset Label value, can be `number` and/or `string`
     * @example tl.add('label1', 200)
     * @memberof Timeline
     */
    Timeline.prototype.addLabel = function (name, offset) {
        this.position.addLabel(name, offset);
        return this;
    };
    Timeline.prototype.map = function (fn) {
        for (var i = 0, len = this._tweens.length; i < len; i++) {
            var _tween = this._tweens[i];
            fn(_tween, i);
            this._duration = Math.max(this._duration, _tween._duration + _tween._startTime);
        }
        return this;
    };
    /**
     * Add tween to Timeline
     * @param {Tween} tween Tween instance
     * @param {position} position Can be label name, number or relative number to label
     * @example tl.add(new Tween(node, {x:0}).to({x:200}, 200))
     * @memberof Timeline
     */
    Timeline.prototype.add = function (tween, position) {
        var _this = this;
        if (Array.isArray(tween)) {
            tween.map(function (_tween) {
                _this.add(_tween, position);
            });
            return this;
        }
        else if (typeof tween === 'object' && !(tween instanceof Tween)) {
            tween = new Tween(tween.from).to(tween.to, tween);
        }
        var _a = this, _defaultParams = _a._defaultParams, _duration = _a._duration;
        if (_defaultParams) {
            for (var method in _defaultParams) {
                if (typeof tween[method] === 'function') {
                    tween[method](_defaultParams[method]);
                }
            }
        }
        var offset = typeof position === 'number'
            ? position
            : this.position.parseLabel(typeof position !== 'undefined' ? position : 'afterLast', null);
        tween._startTime = Math.max(this._startTime, tween._delayTime, offset);
        tween._delayTime = offset;
        tween._isPlaying = true;
        this._duration = Math.max(_duration, tween._startTime + tween._delayTime + tween._duration);
        this._tweens.push(tween);
        this.position.setLabel('afterLast', this._duration);
        return this;
    };
    Timeline.prototype.restart = function () {
        this._startTime += now();
        add(this);
        return this.emit(EVENT_RESTART);
    };
    Timeline.prototype.easing = function (easing) {
        return this.map(function (tween) { return tween.easing(easing); });
    };
    Timeline.prototype.interpolation = function (interpolation) {
        return this.map(function (tween) { return tween.interpolation(interpolation); });
    };
    Timeline.prototype.update = function (time) {
        var _a = this, _tweens = _a._tweens, _duration = _a._duration, _reverseDelayTime = _a._reverseDelayTime, _startTime = _a._startTime, _reversed = _a._reversed, _yoyo = _a._yoyo, _repeat = _a._repeat, _isFinite = _a._isFinite, _isPlaying = _a._isPlaying;
        if (!_isPlaying || time < _startTime) {
            return true;
        }
        var elapsed = (time - _startTime) / _duration;
        elapsed = elapsed > 1 ? 1 : elapsed;
        elapsed = _reversed ? 1 - elapsed : elapsed;
        this.elapsed = elapsed;
        var timing = time - _startTime;
        var _timing = _reversed ? _duration - timing : timing;
        var i = 0;
        while (i < _tweens.length) {
            _tweens[i].update(_timing);
            i++;
        }
        this.emit(EVENT_UPDATE, elapsed, timing);
        if (elapsed === 1 || (_reversed && elapsed === 0)) {
            if (_repeat) {
                if (_isFinite) {
                    this._repeat--;
                }
                this.emit(_reversed ? EVENT_REVERSE : EVENT_REPEAT);
                if (_yoyo) {
                    this._reversed = !_reversed;
                    this.timingOrder(function (timing) { return timing.reverse(); });
                }
                if (_reversed && _reverseDelayTime) {
                    this._startTime = time + _reverseDelayTime;
                }
                else {
                    this._startTime = time;
                }
                i = 0;
                while (i < _tweens.length) {
                    _tweens[i].reassignValues(time);
                    i++;
                }
                return true;
            }
            else {
                this.emit(EVENT_COMPLETE);
                this._repeat = this._r;
                remove(this);
                this._isPlaying = false;
                return false;
            }
        }
        return true;
    };
    Timeline.prototype.progress = function (value) {
        return value !== undefined
            ? this.update(value * this._duration)
            : this.elapsed;
    };
    return Timeline;
}(Tween));

exports.Plugins = Plugins;
exports.Selector = Selector;
exports.onTick = onTick;
exports.has = has;
exports.get = get;
exports.getAll = getAll;
exports.removeAll = removeAll;
exports.remove = remove;
exports.add = add;
exports.now = now;
exports.update = update;
exports.autoPlay = autoPlay;
exports.isRunning = isRunning;
exports.Tween = Tween;
exports.Easing = Easing;
exports.Interpolation = Interpolation;
exports.Timeline = Timeline;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Tween.js.map
