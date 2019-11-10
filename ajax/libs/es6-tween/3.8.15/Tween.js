(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.TWEEN = {})));
}(this, (function (exports) { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var intertween$1 = createCommonjsModule(function (module) {
/**
 * @name InterTween - Interpolation powers Tween
 * @description The lightweight, fastest, smartest, effecient value interpolator with no-dependecy, zero-configuration and relative interpolation
 * @author dalisoft (https://github.com/dalisoft)
 * @license MIT-License
 */
(function(root, factory) {
        if (typeof undefined === 'function' && undefined["amd"]) {
            undefined([], factory);
        } else if ('object' !== 'undefined' && module["exports"]) {
            module["exports"] = factory();
        } else {
            root["InterTween"] = factory();
        }
    }
    (typeof(window) !== 'undefined' ? window : commonjsGlobal, function() {
        // RegExp variables
        var colorMatch = /rgb/g;
        var isIncrementReqForColor = /argb/g;
        // This RegExp (numRegExp) is original from @jkroso string tweening and optimized by @dalisoft
        var numRegExp =
            /\s+|([A-Za-z?().,{}:""[\]#\%]+)|([-+/*%]+=)?([-+*/%]+)?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
        var hexColor = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
        var trimRegExp = /\n|\r|\t/g;
        var colorSpaceExp = /, | ,| , /g;
        var rgbMax = 255;
        // Helpers
        function s2f(val) {
            var floatedVal = parseFloat(val);
            return typeof floatedVal === "number" && !isNaN(floatedVal) ? floatedVal : val;
        }
        var isArray = Array.isArray || function(arr) {
            return arr instanceof Array
        };
        var propRegExp = /([.\[])/g;
        var replaceBrace = /\]/g;
        var propExtract = function(obj, property) {
            var value = obj[property];
            var props = property.replace(replaceBrace, '')
                .split(propRegExp);
            var propsLastIndex = props.length - 1;
            var lastArr = Array.isArray(obj);
            var lastObj = typeof obj === 'object' && !lastArr;
            if (lastObj) {
                obj[property] = null;
                delete obj[property];
            } else if (lastArr) {
                obj.splice(property, 1);
            }
            return props.reduce(function(nested, prop, index) {
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
                    } else if (prop === '[') {
                        lastObj = false;
                        lastArr = true;
                    }
                    return nested;
                } else if (nested[prop] === undefined) {
                    if (lastArr || lastObj) {
                        nested[prop] = index === propsLastIndex ? value : lastArr || nextIsArray ? [] :
                            lastObj ? {} : null;
                        lastObj = lastArr = false;
                        return nested[prop];
                    }
                } else if (nested[prop] !== undefined) {
                    if (index === propsLastIndex) {
                        nested[prop] = value;
                    }
                    return nested[prop];
                }
                return nested;
            }, obj);
        };

        var setnested = function(nested) {
            if (typeof nested === 'object' && !!nested) {
                for (var prop in nested) {
                    if (prop.indexOf('.') !== -1 || prop.indexOf('[') !== -1) {
                        propExtract(nested, prop);
                    } else if (typeof nested[prop] === 'object' && !!nested[prop]) {
                        var nested2 = nested[prop];
                        for (var prop2 in nested2) {
                            if (prop2.indexOf('.') !== -1 || prop2.indexOf('[') !== -1) {
                                propExtract(nested2, prop2);
                            } else if (typeof nested2[prop2] === 'object' && !!nested2[prop2]) {
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

        function h2r_f(all, hex) {
            var r;
            var g;
            var b;
            if (hex.length === 3) {
                r = hex[0];
                g = hex[1];
                b = hex[2];
                hex = r + r + g + g + b + b;
            }
            var color = parseInt(hex, 16);
            r = color >> 16 & rgbMax;
            g = color >> 8 & rgbMax;
            b = color & rgbMax;
            return "rgb(" + r + "," + g + "," + b + ")";
        }

        function trim(str) {
            return typeof str === "string" ? str.replace(trimRegExp, "")
                .replace(colorSpaceExp, ',') : str;
        }
        var relativeModes = {
            '+=': 1,
            '-=': 1,
            '*=': 2,
            '/=': 3,
            '%=': 4
        };

        function r2n(s, e) {
            if (typeof e === 'number') {
                return e;
            } else {
                var rv = relativeModes[e.substr(0, 2)],
                    v = e.substr(2);
                if (rv === 1) {
                    var e2 = e[0] + v;
                    return s + parseFloat(e2);
                } else if (rv === 2) {
                    return s * +v;
                } else if (rv === 3) {
                    return s / +v;
                } else if (rv === 4) {
                    return s * (+v / 100);
                }
            }
            return e;
        }
        var h2r = function(hex) {
            return typeof hex !== 'string' ? hex : trim(hex)
                .replace(hexColor, h2r_f);
        };

        function s2n(str) {
            var hr = h2r(str);
            return typeof hr === 'string' ? hr.match(numRegExp)
                .map(s2f) : str;
        }
        // Splitted functions
        function stringTween(s, e, d, easing) {
            d = d !== null && d !== undefined ? d : 10000;
            if (!numRegExp.test(e)) { return e; }
            var sv = s2n(s);
            var ev = s2n(e);
            var uv = unitTween(sv, ev, d, easing);
            if (uv) {
                return uv;
            }
            uv = null;
            var cm = null;
            var cmls = null;
            var rv = [];
            var i = 0;
            var len = ev.length;
            for (; i < len; i++) {
                var ve = ev[i],
                    vs = sv[i];
                rv[i] = typeof ve === 'string' && ve.indexOf('=') === 1 ? ve : null;
                if (isIncrementReqForColor.test(ve)) {
                    cm = i + 2;
                    cmls = i + 11;
                } else if (colorMatch.test(ve)) {
                    cm = i;
                    cmls = i + 9;
                }
                ev[i] = vs === ve ? null : rv[i] !== null ? r2n(vs, ve) : ve;
            }
            return function(t, vt, ease) {
                if (!ease) {
                    ease = easing;
                }
                vt = vt !== undefined ? vt : t;
                var str = '';
                i = 0;
                for (; i < len; i++) {
                    var a = sv[i],
                        b = ev[i],
                        r = rv[i],
                        _t = typeof ease === 'function' ? ease(t) : t;
                    str += typeof b === 'number' ? cm !== null && i > cm && i < cmls ? (a + (b - a) * _t) | 0 :
                        (((a + (b - a) * _t) * d) | 0) / d : a;
                    if (vt === 1 && r !== null) {
                        sv[i] = b;
                        ev[i] = r2n(b, r);
                    }
                }
                return str;
            }
        }

        function tweenThemTo(sv, ev, d, easing) {
            var vs = [];
            for (var i = 0, len = sv.length; i < len; i++) {
                var s = sv[i];
                vs[i] = isArray(s) ? arrayTween(s, ev, d, easing && easing[i] || easing) : typeof s === 'object' ?
                    objectTween(s, ev, d, easing && easing[i] || easing) : typeof s ===
                    'string' ? stringTween(s, ev, d, easing && easing[i] || easing) : s;
            }
            return function(t, v, ease) {
				v = v !== undefined ? v : t;
                if (!ease) {
                    ease = easing;
                }
                for (var i = 0, len = vs.length; i < len; i++) {
					var _easing = _easing = typeof(ease) === 'function' ? ease : ease && typeof ease[i] === 'function' ?
                        ease[i] : null;
                    var _t = typeof _easing ? _easing(t) : t;
                    sv[i] = typeof vs[i] === 'function' ? vs[i](_easing ? t : _t, v, ease) : typeof vs[i] === 'number' ? vs[i] + (ev -
                        vs[i]) * _t : vs[i];
                }
                return sv;
            }
        }

        function parseInterpolatables(sv, ev, d, easing) {
            var vs = [];
            for (var i = 0, len = ev.length; i < len; i++) {
                var e = ev[i];
                vs[i] = mainTween(i === 0 ? sv : ev[i - 1], e, d, easing && easing[i] || easing);
            }
            var lastItem = ev[ev.length - 1];
            vs.push(mainTween(lastItem, lastItem, d, easing && easing[ev.length - 1] || easing));
            var endLength = vs.length - 1;
            return function(t) {
                var totalTime = t * endLength;
                var roundedTime = Math.max(0, Math.floor(totalTime));
                var elapsed = totalTime - roundedTime;
                var item = vs[roundedTime];
                var interpolated = typeof item === 'function' ? item(elapsed) : item;
                return interpolated;
            };
        }

        function arrayTween(sv, ev, d, easing) {
            d = d !== null && d !== undefined ? d : 10000;
            setnested(ev);
            setnested(sv);
            var s = sv.slice();
            var rv = [];
            var minLength = Math.min(sv.length, ev.length);
            for (var i = 0; i < minLength; i++) {
                var vs = s[i],
                    ve = ev[i];
				if (vs === undefined || vs === null) {
					if (typeof ve === 'function' || (ve && ve.update)) {
						s[i] = ve;
					}
					continue
				}
                rv[i] = typeof ve === 'string' && ve.indexOf('=') === 1 ? ve : null;
                s[i] = ve.nodeType || ve.update ? ve.update : vs === ve ? null : isArray(ve) ? isArray(vs) && ve.length ===
                    vs.length ? arrayTween(vs, ve, d, easing && easing[i] || easing) : parseInterpolatables(vs, ve,
                        d, easing && easing[i] || easing) : isArray(vs) ? tweenThemTo(vs,
                        ve, d, easing && easing[i] || easing) : typeof vs === 'object' ? objectTween(vs, ve, d,
                        easing && easing[i] || easing) : typeof vs === 'string' ?
                    stringTween(vs, ve, d, easing && easing[i] || easing) : vs !== undefined ? vs : ve;
                ev[i] = rv[i] !== null ? r2n(vs, ve) : ve;
            }
            return function(t, v, ease) {
                if (!ease) {
                    ease = easing;
                }
                v !== undefined ? v : t;
                for (var i = 0; i < minLength; i++) {
                    var a = s[i],
                        b = ev[i],
                        r = rv[i];
                    if (a === null || a === undefined) { continue; }
					var _easing = _easing = typeof(ease) === 'function' ? ease : ease && typeof ease[i] === 'function' ?
                        ease[i] : null;
                    var _t = _easing ? _easing(t) : t;
                    sv[i] = typeof a === 'number' ? (((a + (b - a) * _t) * d) | 0) / d : typeof a ===
                        'function' ?
                        a(_easing ? t : _t, v, _easing) : a.update ? a.update(_t, v, _easing) : b && b.update ? b.update(_t, v, _easing) : b;
                    if (r && v === 1) {
                        s[i] = b;
                        ev[i] = r2n(s[i], r);
                    }
                }
                return v === 1 ? ev : sv;
            }
        }
        var units = ["px", "pt", "pc", "deg", "rad", "turn", "em", "ex", "cm", "mm", "dm", "inch", "in", "rem",
            "vw", "vh", "vmin", "vmax", "%"
        ];

        function unitTween(sv, ev, d, easing) {
            d = d !== null && d !== undefined ? d : 10000;
            if (ev.length === 2 && sv.length === 2) {
                var unidx = units.indexOf(ev[1]);
                if (unidx !== -1) {
                    var s = +sv[0],
                        e = +ev[0],
                        u = ev[1],
                        r = typeof ev[0] === 'string' && ev[0].indexOf('=') === 1 ? ev[0] : null;
                    if (r) {
                        e = r2n(s, e);
                    }
                    return s === e && ev[0] === u ? ev : function(t, vt, ease) {
                        if (!ease) {
                            ease = easing;
                        }
                        vt !== undefined ? vt : t;
                        var _t = typeof ease === 'function' ? ease(t) : t;
                        var v = ((((s + (e - s) * _t) * d) | 0) / d) + u;
                        if (r && vt === 1) {
                            s = e;
                            e = r2n(s, r);
                        }
                        return v;
                    }
                }
            }
            return false;
        }
		
		var descriptor = Object.getOwnPropertyDescriptor;
        var _getProp = !!descriptor ? descriptor : function() {
            return;
        };

        function objectTween(sv, ev, d, easing) {
            d = d !== null && d !== undefined ? d : 10000;
            var rv = {};
            var s = {};
            var readOnly;
            setnested(ev);
            setnested(sv);
            setnested(easing);
            for (var i in ev) {
                var vs = sv[i],
                    ve = ev[i];
				if (vs === undefined || vs === null) {
					if (typeof ve === 'function' || (ve && ve.update)) {
						s[i] = ve;
					}
					continue
				}
                var propDesc = _getProp(sv, i);
                rv[i] = typeof ve === 'string' && ve.indexOf('=') === 1 ? ve : null;
                if (!!propDesc && (propDesc.writable === false && !propDesc.set)) {
				if (!readOnly) {
					readOnly = {};
				}
                    readOnly[i] = true;
                }
                s[i] = ve.nodeType ? ve : ve.update ? ve : vs === ve ? null : isArray(ve) ? isArray(vs) && ve.length ===
                    vs.length ? arrayTween(vs, ve, d, easing && easing[i] || easing) : parseInterpolatables(vs, ve,
                        d, easing && easing[i] || easing) : isArray(vs) ? tweenThemTo(vs,
                        ve, d, easing && easing[i] || easing) : typeof vs === 'object' ? objectTween(vs, ve, d,
                        easing && easing[i] || easing) : typeof vs === 'string' ?
                    stringTween(vs, ve, d, easing && easing[i] || easing) : vs !== undefined ? vs : ve;
                ev[i] = rv[i] !== null ? r2n(vs, ve) : ve;
            }
            return function(t, vt, ease) {
                if (!ease) {
                    ease = easing;
                }
                vt = vt !== undefined ? vt : t;
                for (var i in s) {
                    var a = s[i],
                        b = ev[i],
                        r = rv[i],
                        _easing = typeof(ease) === 'function' ? ease : ease && typeof ease[i] === 'function' ?
                        ease[i] : null,
                        value = !!_easing ? _easing(t) : t,
                        v = typeof a === 'number' ? (((a + (b - a) * value) * d) | 0) / d : typeof a ===
                        'function' ?
                        a(_easing ? t : value, vt, _easing) : a && a.update ? a.update(value, vt, _easing) : b && b.update ? b.update(value, vt, _easing) :
                        b;
					if (!readOnly || !readOnly[i]) {
                        sv[i] = v;
                    }
                    if (vt === 1 && r) {
                        s[i] = b;
                        ev[i] = r2n(s[i], r);
                    }
                }
                return vt === 1 ? ev : sv;
            }
        }

        function mainTween(sv, ev, d, easing) {
            setnested(easing);
            d = d !== null && d !== undefined ? d : 10000;
            var rv = typeof(ev) === 'string' && typeof sv === 'number' && ev.indexOf('=') === 1 ? ev : null;
            if (rv) {
                ev = r2n(sv, rv);
            }
            return ev.nodeType ? ev : sv.nodeType ? sv : isArray(ev) ? isArray(sv) && sv.length === ev.length ?
                arrayTween(sv, ev, d, easing) : parseInterpolatables(sv, ev, d, easing) : isArray(sv) ? tweenThemTo(
                    sv, ev, d, easing) : typeof ev ===
                'object' ? objectTween(sv, ev, d, easing) : typeof ev === 'string' ? stringTween(sv, ev, d, easing) :
                typeof ev ===
                'function' ? ev : function(t, vt, ease) {
                    vt = vt !== undefined ? vt : t;
                    if (!ease) {
                        ease = easing;
                    }
                    var value = typeof(ease) === 'function' ? ease(t) : t;
                    var vv = typeof ev === 'number' ? (((sv + (ev - sv) * value) * d) | 0) / d : sv;
                    if (rv && vt === 1) {
                        sv += ev;
                        ev = r2n(sv, rv);
                    }
                    return vv;
                }
        }
        return mainTween;
    }));
});

/* global global */
var create = Object.create || (function (source) {
    return Object.assign({}, source || {});
});

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
        var offset = root.performance && root.performance.timing && root.performance.timing.navigationStart ? root.performance.timing.navigationStart : Date.now();
        return function () {
            return Date.now() - offset;
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
var lastTime = now();
var delta = 0;
var timeDiff = 0;
var frameMs = 50 / 3;
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
    _tweens.push(tween);
    if (_autoPlay && !isStarted) {
        lastTime = now();
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
    delta = time - lastTime;
    if (delta > 150) {
        timeDiff = delta - frameMs;
    }
    lastTime = time;
    if (_autoPlay && isStarted) {
        _tick = _ticker(update);
    }
    if (_tweens.length === 0) {
        _stopTicker(_tick);
        isStarted = false;
        return false;
    }
    var i = 0;
    var tween;
    while (i < _tweens.length) {
        tween = _tweens[i];
        if (timeDiff) {
            tween._startTime += timeDiff;
        }
        tween.update(time, preserve);
        i++;
    }
    if (timeDiff) {
        timeDiff = 0;
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
        None: function None(k) {
            return k;
        }
    },
    Quadratic: {
        In: function In(k) {
            return k * k;
        },
        Out: function Out(k) {
            return k * (2 - k);
        },
        InOut: function InOut(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k;
            }
            return -0.5 * (--k * (k - 2) - 1);
        }
    },
    Cubic: {
        In: function In(k) {
            return k * k * k;
        },
        Out: function Out(k) {
            return --k * k * k + 1;
        },
        InOut: function InOut(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k;
            }
            return 0.5 * ((k -= 2) * k * k + 2);
        }
    },
    Quartic: {
        In: function In(k) {
            return k * k * k * k;
        },
        Out: function Out(k) {
            return 1 - (--k * k * k * k);
        },
        InOut: function InOut(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k;
            }
            return -0.5 * ((k -= 2) * k * k * k - 2);
        }
    },
    Quintic: {
        In: function In(k) {
            return k * k * k * k * k;
        },
        Out: function Out(k) {
            return --k * k * k * k * k + 1;
        },
        InOut: function InOut(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k * k;
            }
            return 0.5 * ((k -= 2) * k * k * k * k + 2);
        }
    },
    Sinusoidal: {
        In: function In(k) {
            return 1 - Math.cos(k * Math.PI / 2);
        },
        Out: function Out(k) {
            return Math.sin(k * Math.PI / 2);
        },
        InOut: function InOut(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        }
    },
    Exponential: {
        In: function In(k) {
            return k === 0 ? 0 : Math.pow(1024, k - 1);
        },
        Out: function Out(k) {
            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        },
        InOut: function InOut(k) {
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
        In: function In(k) {
            return 1 - Math.sqrt(1 - k * k);
        },
        Out: function Out(k) {
            return Math.sqrt(1 - (--k * k));
        },
        InOut: function InOut(k) {
            if ((k *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - k * k) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
        }
    },
    Elastic: {
        In: function In(k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
        },
        Out: function Out(k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function InOut(k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            k *= 2;
            if (k < 1) {
                return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
            }
            return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
        }
    },
    Back: {
        In: function In(k) {
            var s = 1.70158;
            return k * k * ((s + 1) * k - s);
        },
        Out: function Out(k) {
            var s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1;
        },
        InOut: function InOut(k) {
            var s = 1.70158 * 1.525;
            if ((k *= 2) < 1) {
                return 0.5 * (k * k * ((s + 1) * k - s));
            }
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        }
    },
    Bounce: {
        In: function In(k) {
            return 1 - Easing.Bounce.Out(1 - k);
        },
        Out: function Out(k) {
            if (k < (1 / 2.75)) {
                return 7.5625 * k * k;
            }
            else if (k < (2 / 2.75)) {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            }
            else if (k < (2.5 / 2.75)) {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            }
            else {
                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }
        },
        InOut: function InOut(k) {
            if (k < 0.5) {
                return Easing.Bounce.In(k * 2) * 0.5;
            }
            return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
        }
    }
};

var PlaybackPosition = function PlaybackPosition() {
    this.totalTime = 0;
    this.labels = [];
    this.offsets = [];
};
PlaybackPosition.prototype.parseLabel = function parseLabel (name, offset) {
    var ref = this;
        var offsets = ref.offsets;
        var labels = ref.labels;
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
PlaybackPosition.prototype.addLabel = function addLabel (name, offset) {
    this.labels.push(name);
    this.offsets.push(this.parseLabel(name, offset));
    return this;
};
PlaybackPosition.prototype.setLabel = function setLabel (name, offset) {
    var i = this.labels.indexOf(name);
    if (i !== -1) {
        this.offsets.splice(i, 1, this.parseLabel(name, offset));
    }
    return this;
};
PlaybackPosition.prototype.eraseLabel = function eraseLabel (name) {
    var i = this.labels.indexOf(name);
    if (i !== -1) {
        this.labels.splice(i, 1);
        this.offsets.splice(i, 1);
    }
    return this;
};

/**
 * Events class
 * @constructor
 * @class
 * @namespace EventClass
 * @example
 * let ev = new EventClass()
 * ev.on('listen', name => `Hello ${name}`)
 * ev.emit('listen', 'World')
 */
var EventClass = function EventClass() {
    this._events = {};
};
/**
 * Adds `event` to Events system
 * @param {string} event - Event listener name
 * @param {Function} callback - Event listener callback
 * @memberof EventClass
 */
EventClass.prototype.on = function on (event, callback) {
    if (!this._events[event]) {
        this._events[event] = [];
    }
    this._events[event].push(callback);
    return this;
};
/**
 * Adds `event` to Events system.
 * Removes itself after fired once
 * @param {string} event - Event listener name
 * @param {Function} callback - Event listener callback
 * @memberof EventClass
 */
EventClass.prototype.once = function once (event, callback) {
        var this$1 = this;

    if (!this._events[event]) {
        this._events[event] = [];
    }
    var ref = this;
        var _events = ref._events;
    var spliceIndex = _events[event].length;
    this._events[event].push(function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

        callback.apply(this$1, args);
        _events[event].splice(spliceIndex, 1);
    });
    return this;
};
/**
 * Removes `event` from Events system
 * @param {string} event - Event listener name
 * @param {Function} callback - Event listener callback
 * @memberof EventClass
 */
EventClass.prototype.off = function off (event, callback) {
    var ref = this;
        var _events = ref._events;
    if (event === undefined || !_events[event]) {
        return this;
    }
    if (callback) {
        this._events[event] = this._events[event].filter(function (cb) { return cb !== callback; });
    }
    else {
        this._events[event].length = 0;
    }
    return this;
};
/**
 * Emits/Fired/Trigger `event` from Events system listeners
 * @param {string} event - Event listener name
 * @memberof EventClass
 */
EventClass.prototype.emit = function emit (event, arg1, arg2, arg3, arg4) {
    var ref = this;
        var _events = ref._events;
    var _event = _events[event];
    if (!_event || !_event.length) {
        return this;
    }
    var i = 0;
    var len = _event.length;
    for (; i < len; i++) {
        _event[i](arg1, arg2, arg3, arg4);
    }
    return this;
};

var Store = {};
var NodeCache = function (node, tween) {
    if (!node || !node.nodeType) {
        return tween;
    }
    var ID = node.queueID || 'q_' + Date.now();
    if (!node.queueID) {
        node.queueID = ID;
    }
    if (Store[ID]) {
        if (tween) {
            Store[ID] = tween; //assign(Store[ID], tween)
        }
        return Store[ID];
    }
    Store[ID] = tween;
    return Store[ID];
};

var Selector = function (selector, collection) {
    if (collection) {
        return !selector ? null : selector === window || selector === document ? [selector] : typeof selector === 'string' ? !!document.querySelectorAll && document.querySelectorAll(selector) : Array.isArray(selector) ? selector : selector.nodeType ? [selector] : [];
    }
    return !selector ? null : selector === window || selector === document ? selector : typeof selector === 'string' ? !!document.querySelector && document.querySelector(selector) : Array.isArray(selector) ? selector[0] : selector.nodeType ? selector : null;
};

Object.create = create;
// Events list
var EVENT_UPDATE = 'update';
var EVENT_COMPLETE = 'complete';
var EVENT_START = 'start';
var EVENT_REPEAT = 'repeat';
var EVENT_REVERSE = 'reverse';
var EVENT_PAUSE = 'pause';
var EVENT_PLAY = 'play';
var EVENT_RS = 'restart';
var EVENT_STOP = 'stop';
var EVENT_SEEK = 'seek';
var _id$1 = 0; // Unique ID
var defaultEasing = Easing.Linear.None;
/**
 * Tween main constructor
 * @constructor
 * @class
 * @namespace Tween
 * @extends EventClass
 * @param {Object|Element} node Node Element or Tween initial object
 * @param {Object=} object If Node Element is using, second argument is used for Tween initial object
 * @example let tween = new Tween(myNode, {width:'100px'}).to({width:'300px'}, 2000).start()
 */
var Tween = (function (EventClass$$1) {
    function Tween(node, object) {
        EventClass$$1.call(this);
        this.id = _id$1++;
        if (!!node && typeof node === 'object' && !object && !node.nodeType) {
            object = this.object = node;
            node = null;
        }
        else if (!!node && (node.nodeType || node.length || typeof node === 'string')) {
            node = this.node = Selector(node);
            object = this.object = NodeCache(node, object);
        }
        this._valuesEnd = null;
        this._valuesFunc = null;
        this._duration = 1000;
        this._easingFunction = defaultEasing;
        this._easingReverse = defaultEasing;
        this._startTime = 0;
        this._delayTime = 0;
        this._repeat = 0;
        this._r = 0;
        this._isPlaying = false;
        this._yoyo = false;
        this._reversed = false;
        this._onStartCallbackFired = false;
        this._pausedTime = null;
        this._isFinite = true;
        this._elapsed = 0;
        return this;
    }

    if ( EventClass$$1 ) Tween.__proto__ = EventClass$$1;
    Tween.prototype = Object.create( EventClass$$1 && EventClass$$1.prototype );
    Tween.prototype.constructor = Tween;
    /**
     * @return {boolean} State of playing of tween
     * @example tween.isPlaying() // returns `true` if tween in progress
     * @memberof Tween
     */
    Tween.fromTo = function fromTo (node, object, to, params) {
        if ( params === void 0 ) params = {};

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
    Tween.to = function to (node, to$1, params) {
        return Tween.fromTo(node, null, to$1, params);
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
    Tween.from = function from (node, from$1, params) {
        return Tween.fromTo(node, from$1, null, params);
    };

    Tween.prototype.isPlaying = function isPlaying () {
        return this._isPlaying;
    };
    /**
     * @return {boolean} State of started of tween
     * @example tween.isStarted() // returns `true` if tween in started
     * @memberof Tween
     */
    Tween.prototype.isStarted = function isStarted () {
        return this._onStartCallbackFired;
    };
    /**
     * Reverses the tween state/direction
     * @example tween.reverse()
     * @memberof Tween
     */
    Tween.prototype.reverse = function reverse () {
        var ref = this;
        var _reversed = ref._reversed;
        this._reversed = !_reversed;
        return this;
    };
    /**
     * @return {boolean} State of reversed
     * @example tween.reversed() // returns `true` if tween in reversed state
     * @memberof Tween
     */
    Tween.prototype.reversed = function reversed () {
        return this._reversed;
    };
    /**
     * Pauses tween
     * @example tween.pause()
     * @memberof Tween
     */
    Tween.prototype.pause = function pause () {
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
    Tween.prototype.play = function play () {
        if (this._isPlaying) {
            return this;
        }
        this._isPlaying = true;
        this._startTime += now() - this._pausedTime;
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
    Tween.prototype.restart = function restart (noDelay) {
        this._repeat = this._r;
        this._startTime = now() + (noDelay ? 0 : this._delayTime);
        if (!this._isPlaying) {
            add(this);
        }
        return this.emit(EVENT_RS, this.object);
    };
    /**
     * Seek tween value by `time`
     * @param {Time} time Tween update time
     * @param {boolean=} keepPlaying When this param is set to `false`, tween pausing after seek
     * @example tween.seek(500)
     * @memberof Tween
     */
    Tween.prototype.seek = function seek (time, keepPlaying) {
        this._startTime = now() + Math.max(0, Math.min(time, this._duration));
        this.emit(EVENT_SEEK, time, this.object);
        return keepPlaying ? this : this.pause();
    };
    /**
     * Sets tween duration
     * @param {number} amount Duration is milliseconds
     * @example tween.duration(2000)
     * @memberof Tween
     */
    Tween.prototype.duration = function duration (amount) {
        this._duration = typeof (amount) === 'function' ? amount(this._duration) : amount;
        return this;
    };
    /**
     * Sets target value and duration
     * @param {object} properties Target value (to value)
     * @param {number|Object=} [duration=1000] Duration of tween
     * @example let tween = new Tween({x:0}).to({x:100}, 2000)
     * @memberof Tween
     */
    Tween.prototype.to = function to (properties, duration, maybeUsed) {
        var this$1 = this;
        if ( duration === void 0 ) duration = 1000;

        this._valuesEnd = properties;
        if (typeof duration === 'number' || typeof (duration) === 'function') {
            this._duration = typeof (duration) === 'function' ? duration(this._duration) : duration;
        }
        else if (typeof duration === 'object') {
            for (var prop in duration) {
                if (typeof this$1[prop] === 'function') {
                    var ref = Array.isArray(duration[prop]) ? duration[prop] : [duration[prop]];
                    var arg1 = ref[0]; if ( arg1 === void 0 ) arg1 = null;
                    var arg2 = ref[1]; if ( arg2 === void 0 ) arg2 = null;
                    var arg3 = ref[2]; if ( arg3 === void 0 ) arg3 = null;
                    var arg4 = ref[3]; if ( arg4 === void 0 ) arg4 = null;
                    this$1[prop](arg1, arg2, arg3, arg4);
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
    Tween.prototype.render = function render () {
        var this$1 = this;

        if (this._rendered) {
            return this;
        }
        var ref = this;
        var _valuesEnd = ref._valuesEnd;
        var object = ref.object;
        var Renderer = ref.Renderer;
        var node = ref.node;
        var InitialValues = ref.InitialValues;
        var _easingFunction = ref._easingFunction;
        if (node && InitialValues) {
            if (!object) {
                object = this.object = NodeCache(node, InitialValues(node, _valuesEnd));
            }
            else if (!_valuesEnd) {
                _valuesEnd = this._valuesEnd = InitialValues(node, object);
            }
        }
        for (var property in _valuesEnd) {
            var start = object && object[property];
            var end = _valuesEnd[property];
            if (Plugins[property]) {
                var plugin = Plugins[property].prototype.update ? new Plugins[property](this$1, start, end, property, object) : Plugins[property](this$1, start, end, property, object);
                if (plugin) {
                    _valuesEnd[property] = plugin;
                }
                continue;
            }
        }
        this._valuesFunc = intertween$1(object, _valuesEnd, null, _easingFunction);
        if (Renderer && this.node) {
            this.__render = new Renderer(this, object, _valuesEnd);
        }
        return this;
    };
    /**
     * Start the tweening
     * @param {number} time setting manual time instead of Current browser timestamp
     * @example tween.start()
     * @memberof Tween
     */
    Tween.prototype.start = function start (time) {
        this._startTime = time !== undefined ? time : now();
        this._startTime += this._delayTime;
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
    Tween.prototype.stop = function stop () {
        var ref = this;
        var _isPlaying = ref._isPlaying;
        var object = ref.object;
        var _startTime = ref._startTime;
        var _duration = ref._duration;
        if (!_isPlaying) {
            return this;
        }
        this.update(_startTime + _duration);
        this._isPlaying = false;
        remove(this);
        return this.emit(EVENT_STOP, object);
    };
    /**
     * Set delay of tween
     * @param {number} amount Sets tween delay / wait duration
     * @example tween.delay(500)
     * @memberof Tween
     */
    Tween.prototype.delay = function delay (amount) {
        this._delayTime = typeof (amount) === 'function' ? amount(this._delayTime) : amount;
        return this;
    };
    /**
     * Sets how times tween is repeating
     * @param {amount} amount the times of repeat
     * @example tween.repeat(5)
     * @memberof Tween
     */
    Tween.prototype.repeat = function repeat (amount) {
        this._repeat = typeof (amount) === 'function' ? amount(this._repeat) : amount;
        this._r = this._repeat;
        this._isFinite = isFinite(amount);
        return this;
    };
    /**
     * Set delay of each repeat of tween
     * @param {number} amount Sets tween repeat delay / repeat wait duration
     * @example tween.repeatDelay(400)
     * @memberof Tween
     */
    Tween.prototype.repeatDelay = function repeatDelay (amount) {
        this._repeatDelayTime = typeof (amount) === 'function' ? amount(this._repeatDelayTime) : amount;
        return this;
    };
    /**
     * Set delay of each repeat alternate of tween
     * @param {number} amount Sets tween repeat alternate delay / repeat alternate wait duration
     * @example tween.reverseDelay(500)
     * @memberof Tween
     */
    Tween.prototype.reverseDelay = function reverseDelay (amount) {
        this._reverseDelayTime = typeof (amount) === 'function' ? amount(this._reverseDelayTime) : amount;
        return this;
    };
    /**
     * Set `yoyo` state (enables reverse in repeat)
     * @param {boolean} state Enables alternate direction for repeat
     * @param {Function=} _easingReverse Easing function in reverse direction
     * @example tween.yoyo(true)
     * @memberof Tween
     */
    Tween.prototype.yoyo = function yoyo (state, _easingReverse) {
        this._yoyo = typeof (state) === 'function' ? state(this._yoyo) : state === null ? this._yoyo : state;
        this._easingReverse = _easingReverse || this._easingFunction;
        return this;
    };
    /**
     * Set easing
     * @param {Function} _easingFunction Easing function, applies in non-reverse direction if Tween#yoyo second argument is applied
     * @example tween.easing(Easing.Elastic.InOut)
     * @memberof Tween
     */
    Tween.prototype.easing = function easing (_easingFunction) {
        this._easingFunction = _easingFunction;
        return this;
    };
    /**
     * Reassigns value for rare-case like Tween#restart or for Timeline
     * @private
     * @memberof Tween
     */
    Tween.prototype.reassignValues = function reassignValues (time) {
        var ref = this;
        var _valuesFunc = ref._valuesFunc;
        var object = ref.object;
        var _delayTime = ref._delayTime;
        this._isPlaying = true;
        this._startTime = time !== undefined ? time : now();
        this._startTime += _delayTime;
        add(this);
        var _valuesStart = _valuesFunc(0);
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
     * @example tween.update(100)
     * @memberof Tween
     */
    Tween.prototype.update = function update$$1 (time, preserve) {
        var ref = this;
        var _onStartCallbackFired = ref._onStartCallbackFired;
        var _easingFunction = ref._easingFunction;
        var _easingReverse = ref._easingReverse;
        var _repeat = ref._repeat;
        var _repeatDelayTime = ref._repeatDelayTime;
        var _reverseDelayTime = ref._reverseDelayTime;
        var _yoyo = ref._yoyo;
        var _reversed = ref._reversed;
        var _startTime = ref._startTime;
        var _duration = ref._duration;
        var _valuesFunc = ref._valuesFunc;
        var object = ref.object;
        var _isFinite = ref._isFinite;
        var _isPlaying = ref._isPlaying;
        var __render = ref.__render;
        var elapsed;
        var currentEasing;
        time = time !== undefined ? time : now();
        if (!_isPlaying || time < _startTime) {
            return true;
        }
        if (!_onStartCallbackFired) {
            if (!this._rendered) {
                this.render();
                this._rendered = true;
                _valuesFunc = this._valuesFunc;
            }
            this.emit(EVENT_START, object);
            this._onStartCallbackFired = true;
        }
        elapsed = (time - _startTime) / _duration;
        elapsed = elapsed > 1 ? 1 : elapsed;
        elapsed = _reversed ? 1 - elapsed : elapsed;
        currentEasing = _reversed ? _easingReverse : _easingFunction;
        if (!object) {
            return true;
        }
        _valuesFunc(elapsed, elapsed, currentEasing);
        if (__render) {
            __render.update(object, elapsed);
        }
        this.emit(EVENT_UPDATE, object, elapsed);
        if (elapsed === 1 || (_reversed && elapsed === 0)) {
            if (_repeat) {
                if (_isFinite) {
                    this._repeat--;
                }
                if (_yoyo) {
                    this._reversed = !_reversed;
                }
                this.emit(_yoyo && !_reversed ? EVENT_REVERSE : EVENT_REPEAT, object);
                if (!_reversed && _repeatDelayTime) {
                    this._startTime = time + _repeatDelayTime;
                }
                else if (_reversed && _reverseDelayTime) {
                    this._startTime = time + _reverseDelayTime;
                }
                else {
                    this._startTime = time;
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
                return false;
            }
        }
        return true;
    };

    return Tween;
}(EventClass));

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
var Timeline = (function (Tween$$1) {
    function Timeline(params) {
        Tween$$1.call(this);
        this._duration = 0;
        this._startTime = now();
        this._tweens = [];
        this._elapsed = 0;
        this._id = _id++;
        this._defaultParams = params;
        this.position = new PlaybackPosition();
        this.position.addLabel('afterLast', this._duration);
        this.position.addLabel('afterInit', this._startTime);
        return this;
    }

    if ( Tween$$1 ) Timeline.__proto__ = Tween$$1;
    Timeline.prototype = Object.create( Tween$$1 && Tween$$1.prototype );
    Timeline.prototype.constructor = Timeline;
    Timeline.prototype.mapTotal = function mapTotal (fn) {
        fn.call(this, this._tweens);
        return this;
    };
    Timeline.prototype.timingOrder = function timingOrder (fn) {
        var timing = fn(this._tweens.map(function (t) { return t._startTime; }));
        this._tweens.map(function (tween, i) { tween._startTime = timing[i]; });
        return this;
    };
    Timeline.prototype.getTiming = function getTiming (mode, nodes, params, offset) {
        if ( offset === void 0 ) offset = 0;

        if (mode === 'reverse') {
            var stagger = params.stagger;
            var totalStagger = (stagger || 0) * (nodes.length - 1);
            return nodes.map(function (node, i) { return totalStagger - ((stagger || 0) * i) + offset; });
        }
        else if (mode === 'async') {
            return nodes.map(function (node) { return offset; });
        }
        else if (mode === 'sequence' || mode === 'delayed') {
            var stagger$1 = params.stagger;
            if (!stagger$1) {
                stagger$1 = (params.duration || 1000) / (nodes.length - 1);
            }
            return nodes.map(function (node, i) { return (stagger$1 * i) + offset; });
        }
        else if (mode === 'oneByOne') {
            return nodes.map(function (node) { return params.duration; });
        }
        else if (mode === 'shuffle') {
            var stagger$2 = params.stagger;
            return shuffle(nodes.map(function (node, i) { return ((stagger$2 || 0) * i) + offset; }));
        }
        else {
            var stagger$3 = params.stagger;
            return nodes.map(function (node, i) { return ((stagger$3 || 0) * i) + offset; });
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
    Timeline.prototype.fromTo = function fromTo (nodes, from, to, params) {
        var this$1 = this;

        nodes = Selector(nodes, true);
        if (nodes && nodes.length) {
            if (this._defaultParams) {
                params = Object.assign({}, this._defaultParams, params);
            }
            var position = params.label;
            var offset = typeof position === 'number' ? position : this.position.parseLabel(typeof position !== 'undefined' ? position : 'afterLast', null);
            var mode = this.getTiming(params.mode, nodes, params, offset);
            for (var i = 0, node = (void 0), len = nodes.length; i < len; i++) {
                node = nodes[i];
                this$1.add(Tween$$1.fromTo(node, typeof from === 'function' ? from(i, nodes.length) : Object.assign({}, from), typeof to === 'function' ? to(i, nodes.length) : to, typeof params === 'function' ? params(i, nodes.length) : params), mode[i]);
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
    Timeline.prototype.from = function from (nodes, from$1, params) {
        return this.fromTo(nodes, from$1, null, params);
    };
    /**
     * @param {Array<Element>} nodes DOM Elements Collection (converted to Array)
     * @param {object} to - Target value
     * @param {object} params - Options of tweens
     * @example tl.to(nodes, {x:200}, {duration:1000, stagger:200})
     * @memberof Timeline
     * @static
     */
    Timeline.prototype.to = function to (nodes, to$1, params) {
        return this.fromTo(nodes, null, to$1, params);
    };
    /**
     * Add label to Timeline
     * @param {string} name Label name
     * @param {any} offset Label value, can be `number` and/or `string`
     * @example tl.add('label1', 200)
     * @memberof Timeline
     */
    Timeline.prototype.addLabel = function addLabel (name, offset) {
        this.position.addLabel(name, offset);
        return this;
    };
    Timeline.prototype.map = function map (fn) {
        var this$1 = this;

        for (var i = 0, len = this._tweens.length; i < len; i++) {
            var _tween = this$1._tweens[i];
            fn(_tween, i);
            this$1._duration = Math.max(this$1._duration, _tween._duration + _tween._startTime);
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
    Timeline.prototype.add = function add$$1 (tween, position) {
        var this$1 = this;

        if (Array.isArray(tween)) {
            tween.map(function (_tween) {
                this$1.add(_tween, position);
            });
            return this;
        }
        else if (typeof tween === 'object' && !(tween instanceof Tween$$1)) {
            tween = new Tween$$1(tween.from).to(tween.to, tween);
        }
        var ref = this;
        var _defaultParams = ref._defaultParams;
        var _duration = ref._duration;
        if (_defaultParams) {
            for (var method in _defaultParams) {
                if (typeof tween[method] === 'function') {
                    tween[method](_defaultParams[method]);
                }
            }
        }
        var offset = typeof position === 'number' ? position : this.position.parseLabel(typeof position !== 'undefined' ? position : 'afterLast', null);
        tween._startTime = Math.max(this._startTime, tween._delayTime, offset);
        tween._delayTime = offset;
        tween._isPlaying = true;
        this._duration = Math.max(_duration, tween._startTime + tween._delayTime + tween._duration);
        this._tweens.push(tween);
        this.position.setLabel('afterLast', this._duration);
        return this;
    };
    Timeline.prototype.restart = function restart () {
        this._startTime += now();
        add(this);
        return this.emit(EVENT_RS);
    };
    Timeline.prototype.easing = function easing (easing$1) {
        return this.map(function (tween) { return tween.easing(easing$1); });
    };
    Timeline.prototype.interpolation = function interpolation (interpolation$1) {
        return this.map(function (tween) { return tween.interpolation(interpolation$1); });
    };
    Timeline.prototype.update = function update$$1 (time) {
        var ref = this;
        var _tweens = ref._tweens;
        var _duration = ref._duration;
        var _repeatDelayTime = ref._repeatDelayTime;
        var _reverseDelayTime = ref._reverseDelayTime;
        var _startTime = ref._startTime;
        var _reversed = ref._reversed;
        var _yoyo = ref._yoyo;
        var _repeat = ref._repeat;
        var _isFinite = ref._isFinite;
        var _isPlaying = ref._isPlaying;
        if (!_isPlaying || time < _startTime) {
            return true;
        }
        var elapsed = (time - _startTime) / _duration;
        elapsed = elapsed > 1 ? 1 : elapsed;
        elapsed = _reversed ? 1 - elapsed : elapsed;
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
                if (!_reversed && _repeatDelayTime) {
                    this._startTime = time + _repeatDelayTime;
                }
                else if (_reversed && _reverseDelayTime) {
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
    Timeline.prototype.elapsed = function elapsed (value) {
        return value !== undefined ? this.update(value * this._duration) : this._elapsed;
    };

    return Timeline;
}(Tween));

exports.Plugins = Plugins;
exports.Interpolator = intertween$1;
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
exports.Timeline = Timeline;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Tween.js.map
