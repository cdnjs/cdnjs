/*! Shifty 3.0.3 - https://github.com/jeremyckahn/shifty */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("shifty", [], factory);
	else if(typeof exports === 'object')
		exports["shifty"] = factory();
	else
		root["shifty"] = factory();
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 55:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setBezierFunction = exports.getCubicBezierTransition = void 0;
const tweenable_1 = __webpack_require__(188);
/**
 * The Bezier magic in this file is adapted/copied almost wholesale from
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/cubic-bezier.js),
 * which was adapted from Apple code (which probably came from
 * [here](http://opensource.apple.com/source/WebCore/WebCore-955.66/platform/graphics/UnitBezier.h)).
 * Special thanks to Apple and Thomas Fuchs for much of this code.
 */
/**
 *  Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder(s) nor the names of any
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 *  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 *  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 *  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 *  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
// port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
/* istanbul ignore next */
function cubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
    let ax = 0, bx = 0, cx = 0, ay = 0, by = 0, cy = 0;
    const sampleCurveX = (t) => ((ax * t + bx) * t + cx) * t;
    const sampleCurveY = (t) => ((ay * t + by) * t + cy) * t;
    const sampleCurveDerivativeX = (t) => (3 * ax * t + 2 * bx) * t + cx;
    const solveEpsilon = (duration) => 1 / (200 * duration);
    const fabs = (n) => (n >= 0 ? n : 0 - n);
    const solveCurveX = (x, epsilon) => {
        let t0, t1, t2, x2, d2, i;
        for (t2 = x, i = 0; i < 8; i++) {
            x2 = sampleCurveX(t2) - x;
            if (fabs(x2) < epsilon) {
                return t2;
            }
            d2 = sampleCurveDerivativeX(t2);
            if (fabs(d2) < 1e-6) {
                break;
            }
            t2 = t2 - x2 / d2;
        }
        t0 = 0;
        t1 = 1;
        t2 = x;
        if (t2 < t0) {
            return t0;
        }
        if (t2 > t1) {
            return t1;
        }
        while (t0 < t1) {
            x2 = sampleCurveX(t2);
            if (fabs(x2 - x) < epsilon) {
                return t2;
            }
            if (x > x2) {
                t0 = t2;
            }
            else {
                t1 = t2;
            }
            t2 = (t1 - t0) * 0.5 + t0;
        }
        return t2; // Failure.
    };
    const solve = (x, epsilon) => sampleCurveY(solveCurveX(x, epsilon));
    cx = 3 * p1x;
    bx = 3 * (p2x - p1x) - cx;
    ax = 1 - cx - bx;
    cy = 3 * p1y;
    by = 3 * (p2y - p1y) - cy;
    ay = 1 - cy - by;
    return solve(t, solveEpsilon(duration));
}
// End ported code
/**
 * Generates a transition easing function that is compatible with WebKit's CSS
 * transitions `-webkit-transition-timing-function` CSS property.
 *
 * The W3C has more information about CSS3 transition timing functions:
 * http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
 */
const getCubicBezierTransition = (x1 = 0.25, y1 = 0.25, x2 = 0.75, y2 = 0.75) => pos => cubicBezierAtTime(pos, x1, y1, x2, y2, 1);
exports.getCubicBezierTransition = getCubicBezierTransition;
/**
 * Create a Bezier easing function and attach it to {@link
 * Tweenable.easing}.  This function gives you total control over the
 * easing curve.  Matthew Lein's [Ceaser](http://matthewlein.com/ceaser/) is a
 * useful tool for visualizing the curves you can make with this function.
 *
 * To remove any easing functions that are created by this method, `delete`
 * them from {@link Tweenable.easing}:
 *
 * ```
 * setBezierFunction('customCurve', 0, 0, 1, 1)
 *
 * delete Tweenable.easing.customCurve
 * ```
 * @return {EasingFunction} The {@link EasingFunction} that was
 * attached to {@link Tweenable.easing}.
 */
const setBezierFunction = (
/**
 * The name of the easing curve. Overwrites the matching, preexisting easing
 * function on {@link Tweenable.easing} if it exists.
 */
name, x1, y1, x2, y2) => {
    const cubicBezierTransition = (0, exports.getCubicBezierTransition)(x1, y1, x2, y2);
    cubicBezierTransition.displayName = name;
    cubicBezierTransition.x1 = x1;
    cubicBezierTransition.y1 = y1;
    cubicBezierTransition.x2 = x2;
    cubicBezierTransition.y2 = y2;
    return (tweenable_1.Tweenable.easing[name] = cubicBezierTransition);
};
exports.setBezierFunction = setBezierFunction;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VERSION = exports.standardEasingFunctions = exports.setBezierFunction = exports.Scene = exports.interpolate = exports.tween = exports.Tweenable = exports.shouldScheduleUpdate = exports.processTweens = void 0;
const tweenable_1 = __webpack_require__(188);
Object.defineProperty(exports, "processTweens", ({ enumerable: true, get: function () { return tweenable_1.processTweens; } }));
Object.defineProperty(exports, "shouldScheduleUpdate", ({ enumerable: true, get: function () { return tweenable_1.shouldScheduleUpdate; } }));
Object.defineProperty(exports, "Tweenable", ({ enumerable: true, get: function () { return tweenable_1.Tweenable; } }));
Object.defineProperty(exports, "tween", ({ enumerable: true, get: function () { return tweenable_1.tween; } }));
var interpolate_1 = __webpack_require__(166);
Object.defineProperty(exports, "interpolate", ({ enumerable: true, get: function () { return interpolate_1.interpolate; } }));
var scene_1 = __webpack_require__(147);
Object.defineProperty(exports, "Scene", ({ enumerable: true, get: function () { return scene_1.Scene; } }));
var bezier_1 = __webpack_require__(55);
Object.defineProperty(exports, "setBezierFunction", ({ enumerable: true, get: function () { return bezier_1.setBezierFunction; } }));
var standard_easing_functions_1 = __webpack_require__(64);
Object.defineProperty(exports, "standardEasingFunctions", ({ enumerable: true, get: function () { return standard_easing_functions_1.standardEasingFunctions; } }));
__exportStar(__webpack_require__(699), exports);
/**
 * The NPM package version of Shifty.
 */
exports.VERSION = String("3.0.3");


/***/ }),

/***/ 166:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.interpolate = void 0;
const tweenable_1 = __webpack_require__(188);
// Fake a Tweenable and patch some internals.  This approach enables skipping
// uneccessary processing and object recreation, cutting down on garbage
// collection pauses.
const tweenable = new tweenable_1.Tweenable();
const { filters } = tweenable_1.Tweenable;
/**
 * Compute the midpoint of two Objects.  This method effectively calculates a
 * specific frame of animation that {@link Tweenable#tween} does many times
 * over the course of a full tween.
 *
 * ```
 * import { interpolate } from 'shifty';
 *
 * const interpolatedValues = interpolate({
 *     width: '100px',
 *     opacity: 0,
 *     color: '#fff'
 *   }, {
 *     width: '200px',
 *     opacity: 1,
 *     color: '#000'
 *   },
 *   0.5
 * );
 *
 * console.log(interpolatedValues); // Logs: {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
 * ```
 */
const interpolate = (
/**
 * The starting values to tween from.
 */
from, 
/**
 * The ending values to tween to.
 */
to, 
/**
 * The normalized position value (between `0.0` and `1.0`) to interpolate the
 * values between `from` and `to` for.  `from` represents `0` and `to`
 * represents `1`.
 */
position, 
/**
 * The easing curve(s) to calculate the midpoint against.  You can reference
 * any easing function attached to {@link Tweenable.easing}, or provide the
 * {@link EasingFunction}(s) directly.
 */
easing = tweenable_1.Tweenable.easing.linear, 
/**
 * Optional delay to pad the beginning of the interpolated tween with.  This
 * increases the range of `position` from (`0` through `1`) to (`0` through
 * `1 + delay`).  So, a delay of `0.5` would increase all valid values of
 * `position` to numbers between `0` and `1.5`.
 */
delay = 0) => {
    const current = Object.assign({}, from);
    const easingObject = (0, tweenable_1.composeEasingObject)(from, easing);
    tweenable._filters.length = 0;
    tweenable.setState({});
    tweenable._currentState = current;
    tweenable._originalState = from;
    tweenable._targetState = to;
    tweenable._easing = easingObject;
    for (const name in filters) {
        if (filters[name].doesApply(tweenable)) {
            tweenable._filters.push(filters[name]);
        }
    }
    // Any defined value transformation must be applied
    tweenable._applyFilter('tweenCreated');
    tweenable._applyFilter('beforeTween');
    const interpolatedValues = (0, tweenable_1.tweenProps)(position, current, from, to, 1, delay, easingObject);
    // Transform data in interpolatedValues back into its original format
    tweenable._applyFilter('afterTween');
    return interpolatedValues;
};
exports.interpolate = interpolate;


/***/ }),

/***/ 147:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Scene = void 0;
class Scene {
    /**
     * The {@link Scene} class provides a way to control groups of {@link
     * Tweenable}s. It is lightweight, minimalistic, and meant to provide
     * performant {@link Tweenable} batch control that users of Shifty
     * might otherwise have to implement themselves. It is **not** a robust
     * timeline solution, and it does **not** provide utilities for sophisticated
     * animation sequencing or orchestration. If that is what you need for your
     * project, consider using a more robust tool such as
     * [Rekapi](http://jeremyckahn.github.io/rekapi/doc/) (a timeline layer built
     * on top of Shifty).
     *
     * Please be aware that {@link Scene} does **not** perform any
     * automatic tween cleanup. If you want to remove a {@link Tweenable} from a
     * {@link Scene}, you must do so explicitly with either {@link Scene#remove}
     * or {@link Scene#empty}.
     *
     * <p class="codepen" data-height="677" data-theme-id="0" data-default-tab="js,result" data-user="jeremyckahn" data-slug-hash="qvZKbe" style="height: 677px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Shifty Scene Demo">
     * <span>See the Pen <a href="https://codepen.io/jeremyckahn/pen/qvZKbe/">
     * Shifty Scene Demo</a> by Jeremy Kahn (<a href="https://codepen.io/jeremyckahn">@jeremyckahn</a>)
     * on <a href="https://codepen.io">CodePen</a>.</span>
     * </p>
     * <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
     * @see https://codepen.io/jeremyckahn/pen/qvZKbe
     */
    constructor(...tweenables) {
        this._tweenables = [];
        tweenables.forEach(this.add.bind(this));
    }
    /**
     * A copy of the internal {@link Tweenable}s array.
     */
    get tweenables() {
        return [...this._tweenables];
    }
    /**
     * The {@link !Promise}s for all {@link Tweenable}s in this {@link Scene} .
     * Note that each call of {@link Scene#tween} or {@link Scene#pause} creates
     * new {@link !Promise}s:
     *
     *     const scene = new Scene(new Tweenable());
     *     scene.play();
     *
     *     Promise.all(scene.promises).then(() =>
     *       // Plays the scene again upon completion, but a new promise is
     *       // created so this line only runs once.
     *       scene.play()
     *     );
     */
    get promises() {
        return this._tweenables.map(tweenable => tweenable.then());
    }
    /**
     * Add a {@link Tweenable} to be controlled by this {@link Scene}.
     * @return The {@link Tweenable} that was added.
     */
    add(tweenable) {
        this._tweenables.push(tweenable);
        return tweenable;
    }
    /**
     * Remove a {@link Tweenable} that is controlled by this {@link Scene}.
     * @return The {@link Tweenable} that was removed.
     */
    remove(tweenable) {
        const index = this._tweenables.indexOf(tweenable);
        if (index > -1) {
            this._tweenables.splice(index, 1);
        }
        return tweenable;
    }
    /**
     * {@link Scene#remove | Remove} all {@link Tweenable}s in this {@link
     * Scene}.
     * @return The {@link Tweenable}s that were removed.
     */
    empty() {
        // NOTE: This is a deliberate use of the tweenables getter here to create a
        // temporary array
        return this.tweenables.map(this.remove.bind(this));
    }
    /**
     * Whether or not any {@link Tweenable} in this {@link Scene} is playing.
     */
    get isPlaying() {
        return this._tweenables.some(({ isPlaying }) => isPlaying);
    }
    /**
     * Call {@link Tweenable#tween} on all {@link Tweenable}s in this {@link
     * Scene}.
     */
    tween() {
        this._tweenables.forEach(tweenable => tweenable.tween());
        return this;
    }
    /**
     * Call {@link Tweenable#pause} all {@link Tweenable}s in this {@link Scene}.
     */
    pause() {
        this._tweenables.forEach(tweenable => tweenable.pause());
        return this;
    }
    /**
     * Call {@link Tweenable#resume} on all paused {@link Tweenable}s in this
     * scene.
     */
    resume() {
        this._tweenables
            .filter(({ hasEnded }) => !hasEnded)
            .forEach(tweenable => tweenable.resume());
        return this;
    }
    /**
     * Call {@link Tweenable#stop} on all {@link Tweenable}s in this {@link
     * Scene}.
     */
    stop(gotoEnd) {
        this._tweenables.forEach(tweenable => tweenable.stop(gotoEnd));
        return this;
    }
}
exports.Scene = Scene;


/***/ }),

/***/ 64:
/***/ ((__unused_webpack_module, exports) => {


/* istanbul ignore file */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.standardEasingFunctions = void 0;
/*!
 * All equations are adapted from Thomas Fuchs'
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
 *
 * Based on Easing Equations (c) 2003 [Robert
 * Penner](http://www.robertpenner.com/), all rights reserved. This work is
 * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
 */
/*!
 *  TERMS OF USE - EASING EQUATIONS
 *  Open source under the BSD License.
 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
 */
/**
 * The standard set of easing functions availble for use with Shifty tweens.
 *
 * This is distinct from `Tweenable`'s {@link Tweenable.easing}. {@link
 * Tweenable.easing} contains everything within `easingFunctions` but also any
 * custom easing functions that you have defined.
 */
exports.standardEasingFunctions = Object.freeze({
    linear: (pos) => pos,
    easeInQuad: (pos) => Math.pow(pos, 2),
    easeOutQuad: (pos) => -(Math.pow(pos - 1, 2) - 1),
    easeInOutQuad: (pos) => (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 2) : -0.5 * ((pos -= 2) * pos - 2),
    easeInCubic: (pos) => Math.pow(pos, 3),
    easeOutCubic: (pos) => Math.pow(pos - 1, 3) + 1,
    easeInOutCubic: (pos) => (pos /= 0.5) < 1
        ? 0.5 * Math.pow(pos, 3)
        : 0.5 * (Math.pow(pos - 2, 3) + 2),
    easeInQuart: (pos) => Math.pow(pos, 4),
    easeOutQuart: (pos) => -(Math.pow(pos - 1, 4) - 1),
    easeInOutQuart: (pos) => (pos /= 0.5) < 1
        ? 0.5 * Math.pow(pos, 4)
        : -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2),
    easeInQuint: (pos) => Math.pow(pos, 5),
    easeOutQuint: (pos) => Math.pow(pos - 1, 5) + 1,
    easeInOutQuint: (pos) => (pos /= 0.5) < 1
        ? 0.5 * Math.pow(pos, 5)
        : 0.5 * (Math.pow(pos - 2, 5) + 2),
    easeInSine: (pos) => -Math.cos(pos * (Math.PI / 2)) + 1,
    easeOutSine: (pos) => Math.sin(pos * (Math.PI / 2)),
    easeInOutSine: (pos) => -0.5 * (Math.cos(Math.PI * pos) - 1),
    easeInExpo: (pos) => (pos === 0 ? 0 : Math.pow(2, 10 * (pos - 1))),
    easeOutExpo: (pos) => (pos === 1 ? 1 : -Math.pow(2, -10 * pos) + 1),
    easeInOutExpo: (pos) => {
        if (pos === 0) {
            return 0;
        }
        if (pos === 1) {
            return 1;
        }
        if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(2, 10 * (pos - 1));
        }
        return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
    },
    easeInCirc: (pos) => -(Math.sqrt(1 - pos * pos) - 1),
    easeOutCirc: (pos) => Math.sqrt(1 - Math.pow(pos - 1, 2)),
    easeInOutCirc: (pos) => (pos /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - pos * pos) - 1)
        : 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1),
    easeOutBounce: (pos) => {
        if (pos < 1 / 2.75) {
            return 7.5625 * pos * pos;
        }
        else if (pos < 2 / 2.75) {
            return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
        }
        else if (pos < 2.5 / 2.75) {
            return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
        }
        else {
            return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
        }
    },
    easeInBack: (pos) => {
        const s = 1.70158;
        return pos * pos * ((s + 1) * pos - s);
    },
    easeOutBack: (pos) => {
        const s = 1.70158;
        return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
    },
    easeInOutBack: (pos) => {
        let s = 1.70158;
        if ((pos /= 0.5) < 1) {
            return 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s));
        }
        return 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
    },
    elastic: (pos) => -1 * Math.pow(4, -8 * pos) * Math.sin(((pos * 6 - 1) * (2 * Math.PI)) / 2) +
        1,
    swingFromTo: (pos) => {
        let s = 1.70158;
        return (pos /= 0.5) < 1
            ? 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s))
            : 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
    },
    swingFrom: (pos) => {
        const s = 1.70158;
        return pos * pos * ((s + 1) * pos - s);
    },
    swingTo: (pos) => {
        const s = 1.70158;
        return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },
    bounce: (pos) => {
        if (pos < 1 / 2.75) {
            return 7.5625 * pos * pos;
        }
        else if (pos < 2 / 2.75) {
            return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
        }
        else if (pos < 2.5 / 2.75) {
            return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
        }
        else {
            return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
        }
    },
    bouncePast: (pos) => {
        if (pos < 1 / 2.75) {
            return 7.5625 * pos * pos;
        }
        else if (pos < 2 / 2.75) {
            return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75);
        }
        else if (pos < 2.5 / 2.75) {
            return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375);
        }
        else {
            return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375);
        }
    },
    easeFromTo: (pos) => (pos /= 0.5) < 1
        ? 0.5 * Math.pow(pos, 4)
        : -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2),
    easeFrom: (pos) => Math.pow(pos, 4),
    easeTo: (pos) => Math.pow(pos, 0.25),
});


/***/ }),

/***/ 432:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.afterTween = exports.beforeTween = exports.tweenCreated = exports.doesApply = void 0;
const types_1 = __webpack_require__(699);
const R_NUMBER_COMPONENT = /(\d|-|\.)/;
const R_FORMAT_CHUNKS = /([^\-0-9.]+)/g;
const R_UNFORMATTED_VALUES = /[0-9.-]+/g;
const R_RGBA = (() => {
    const number = R_UNFORMATTED_VALUES.source;
    const comma = /,\s*/.source;
    return new RegExp(`rgba?\\(${number}${comma}${number}${comma}${number}(${comma}${number})?\\)`, 'g');
})();
const R_RGBA_PREFIX = /^.*\(/;
const R_HEX = /#([0-9]|[a-f]){3,6}/gi;
const VALUE_PLACEHOLDER = 'VAL';
const getFormatChunksFrom = (rawValues, prefix) => rawValues.map((_val, i) => `_${prefix}_${i}`);
const getFormatStringFrom = (formattedString) => {
    let chunks = formattedString.match(R_FORMAT_CHUNKS);
    if (!chunks) {
        // chunks will be null if there were no tokens to parse in
        // formattedString (for example, if formattedString is '2').  Coerce
        // chunks to be useful here.
        chunks = ['', ''];
        // If there is only one chunk, assume that the string is a number
        // followed by a token...
        // NOTE: This may be an unwise assumption.
    }
    else if (chunks.length === 1 ||
        // ...or if the string starts with a number component (".", "-", or a
        // digit)...
        formattedString.charAt(0).match(R_NUMBER_COMPONENT)) {
        // ...prepend an empty string here to make sure that the formatted number
        // is properly replaced by VALUE_PLACEHOLDER
        chunks.unshift('');
    }
    return chunks.join(VALUE_PLACEHOLDER);
};
/**
 * Convert a base-16 number to base-10.
 */
function hexToDec(hex) {
    return parseInt(hex, 16);
}
/**
 * Convert a hexadecimal string to an array with three items, one each for
 * the red, blue, and green decimal values.
 */
const hexToRGBArray = (
/**
 * A hexadecimal string.
 */
hex) => {
    hex = hex.replace(/#/, '');
    // If the string is a shorthand three digit hex notation, normalize it to
    // the standard six digit notation
    if (hex.length === 3) {
        const [r, g, b] = hex.split('');
        hex = r + r + g + g + b + b;
    }
    return [
        hexToDec(hex.substring(0, 2)),
        hexToDec(hex.substring(2, 4)),
        hexToDec(hex.substring(4, 6)),
    ];
};
const convertHexToRGB = (hexString) => `rgb(${hexToRGBArray(hexString).join(',')})`;
/**
 * TODO: Can this be rewritten to leverage String#replace more efficiently?
 * Runs a filter operation on all chunks of a string that match a RegExp.
 */
const filterStringChunks = (pattern, unfilteredString, filter) => {
    const patternMatches = unfilteredString.match(pattern);
    let filteredString = unfilteredString.replace(pattern, VALUE_PLACEHOLDER);
    if (patternMatches) {
        patternMatches.forEach(match => (filteredString = filteredString.replace(VALUE_PLACEHOLDER, filter(match))));
    }
    return filteredString;
};
const sanitizeHexChunksToRGB = (str) => filterStringChunks(R_HEX, str, convertHexToRGB);
/**
 * Convert all hex color values within a string to an rgb string.
 */
const sanitizeObjectForHexProps = (stateObject) => {
    for (const prop in stateObject) {
        const currentProp = stateObject[prop];
        if (typeof currentProp === 'string' && currentProp.match(R_HEX)) {
            stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
        }
    }
};
const sanitizeRGBAChunk = (rgbChunk) => {
    var _a, _b;
    const rgbaRawValues = (_a = rgbChunk.match(R_UNFORMATTED_VALUES)) !== null && _a !== void 0 ? _a : [];
    const rgbNumbers = rgbaRawValues
        .slice(0, 3)
        .map(rgbChunk => Math.floor(Number(rgbChunk)));
    const prefix = (_b = rgbChunk.match(R_RGBA_PREFIX)) === null || _b === void 0 ? void 0 : _b[0];
    if (rgbaRawValues.length === 3) {
        return `${prefix}${rgbNumbers.join(',')})`;
    }
    else if (rgbaRawValues.length === 4) {
        return `${prefix}${rgbNumbers.join(',')},${rgbaRawValues[3]})`;
    }
    throw new Error(`Invalid rgbChunk: ${rgbChunk}`);
};
/**
 * Check for floating point values within rgb strings and round them.
 */
const sanitizeRGBChunks = (formattedString) => filterStringChunks(R_RGBA, formattedString, sanitizeRGBAChunk);
/**
 * NOTE: It's the duty of the caller to convert the Array elements of the
 * return value into numbers.  This is a performance optimization.
 */
const getValuesFrom = (formattedString) => { var _a; return (_a = formattedString.match(R_UNFORMATTED_VALUES)) !== null && _a !== void 0 ? _a : []; };
const getFormatSignatures = (stateObject) => {
    var _a;
    const signatures = {};
    for (const propertyName in stateObject) {
        const property = stateObject[propertyName];
        if (typeof property === 'string') {
            signatures[propertyName] = {
                formatString: getFormatStringFrom(property),
                chunkNames: getFormatChunksFrom((_a = getValuesFrom(property)) === null || _a === void 0 ? void 0 : _a.map(Number), propertyName),
            };
        }
    }
    return signatures;
};
const expandFormattedProperties = (stateObject, formatSignatures) => {
    for (const propertyName in formatSignatures) {
        getValuesFrom(String(stateObject[propertyName])).forEach((number, i) => (stateObject[formatSignatures[propertyName].chunkNames[i]] = +number));
        delete stateObject[propertyName];
    }
};
const extractPropertyChunks = (stateObject, chunkNames) => {
    const extractedValues = {};
    chunkNames.forEach(chunkName => {
        extractedValues[chunkName] = stateObject[chunkName];
        delete stateObject[chunkName];
    });
    return extractedValues;
};
const getValuesList = (stateObject, chunkNames) => chunkNames.map(chunkName => Number(stateObject[chunkName]));
const getFormattedValues = (formatString, rawValues) => {
    rawValues.forEach(rawValue => (formatString = formatString.replace(VALUE_PLACEHOLDER, String(+rawValue.toFixed(4)))));
    return formatString;
};
const collapseFormattedProperties = (stateObject, formatSignature) => {
    for (const prop in formatSignature) {
        const { chunkNames, formatString } = formatSignature[prop];
        const currentProp = getFormattedValues(formatString, getValuesList(extractPropertyChunks(stateObject, chunkNames), chunkNames));
        stateObject[prop] = sanitizeRGBChunks(currentProp);
    }
};
const expandEasingObject = (easingObject, formatSignature) => {
    var _a;
    for (const prop in formatSignature) {
        const { chunkNames } = formatSignature[prop];
        const easing = easingObject[prop];
        if (typeof easing === 'string') {
            const easingNames = easing.split(' ');
            const defaultEasing = easingNames[easingNames.length - 1];
            for (let i = 0; i < chunkNames.length; i++) {
                const chunkName = chunkNames[i];
                const easingName = (_a = easingNames[i]) !== null && _a !== void 0 ? _a : defaultEasing;
                if ((0, types_1.isEasingKey)(easingName)) {
                    easingObject[chunkName] = easingName;
                }
            }
        }
        else {
            // easing is a function
            chunkNames.forEach(chunkName => (easingObject[chunkName] = easing));
        }
        delete easingObject[prop];
    }
};
const collapseEasingObject = (easingObject, formatSignature) => {
    for (const prop in formatSignature) {
        const { chunkNames } = formatSignature[prop];
        const firstEasing = easingObject[chunkNames[0]];
        if (typeof firstEasing === 'string') {
            easingObject[prop] = chunkNames
                .map(chunkName => {
                const easingName = easingObject[chunkName];
                delete easingObject[chunkName];
                return easingName;
            })
                // This typecast isn't accurate, but the logic works and it's performant.
                //
                // TODO: In a future major version, drop support for a single string
                // containing a space-separated list of EasingKeys and add support for an
                // Array of EasingKeys.
                .join(' ');
        }
        else {
            // firstEasing is a function
            easingObject[prop] = firstEasing;
        }
    }
};
const doesApply = (tweenable) => {
    for (const key in tweenable._currentState) {
        if (typeof tweenable._currentState[key] === 'string') {
            return true;
        }
    }
    return false;
};
exports.doesApply = doesApply;
function tweenCreated(tweenable) {
    const { _currentState, _originalState, _targetState } = tweenable;
    [_currentState, _originalState, _targetState].forEach(sanitizeObjectForHexProps);
    tweenable._tokenData = getFormatSignatures(_currentState);
}
exports.tweenCreated = tweenCreated;
function beforeTween(tweenable) {
    const { _currentState, _originalState, _targetState, _easing, _tokenData, } = tweenable;
    if (typeof _easing !== 'function' && _tokenData) {
        expandEasingObject(_easing, _tokenData);
    }
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;
    [_currentState, _originalState, _targetState].forEach(state => expandFormattedProperties(state, _tokenData !== null && _tokenData !== void 0 ? _tokenData : {}));
}
exports.beforeTween = beforeTween;
function afterTween(tweenable) {
    const { _currentState, _originalState, _targetState, _easing, _tokenData, } = tweenable;
    [_currentState, _originalState, _targetState].forEach(state => collapseFormattedProperties(state, _tokenData !== null && _tokenData !== void 0 ? _tokenData : {}));
    if (typeof _easing !== 'function' && _tokenData) {
        collapseEasingObject(_easing, _tokenData);
    }
}
exports.afterTween = afterTween;


/***/ }),

/***/ 188:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.shouldScheduleUpdate = exports.tween = exports.Tweenable = exports.composeEasingObject = exports.scheduleUpdate = exports.processTweens = exports.tweenProps = exports.getListTail = exports.getListHead = exports.resetList = void 0;
const standard_easing_functions_1 = __webpack_require__(64);
const bezier_1 = __webpack_require__(55);
const types_1 = __webpack_require__(699);
const token = __importStar(__webpack_require__(432));
// CONSTANTS
const DEFAULT_EASING = 'linear';
const DEFAULT_DURATION = 500;
const UPDATE_TIME = 1000 / 60;
const root = typeof window !== 'undefined' ? window : global;
const AFTER_TWEEN = 'afterTween';
const AFTER_TWEEN_END = 'afterTweenEnd';
const BEFORE_TWEEN = 'beforeTween';
const TWEEN_CREATED = 'tweenCreated';
const TYPE_STRING = 'string';
const TYPE_FUNCTION = 'function';
const TYPE_OBJECT = 'object';
// requestAnimationFrame() shim by Paul Irish (modified for Shifty)
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
let scheduleFunction = root.requestAnimationFrame;
if (!scheduleFunction) {
    if (typeof window === 'undefined') {
        scheduleFunction = setTimeout;
    }
    else {
        scheduleFunction =
            window.webkitRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                (window.mozCancelRequestAnimationFrame &&
                    window.mozRequestAnimationFrame) ||
                setTimeout;
    }
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => { };
let listHead = null;
let listTail = null;
/**
 * Strictly for testing.
 */
const resetList = () => {
    listHead = listTail = null;
};
exports.resetList = resetList;
/**
 * Strictly for testing.
 */
const getListHead = () => listHead;
exports.getListHead = getListHead;
/**
 * Strictly for testing.
 */
const getListTail = () => listTail;
exports.getListTail = getListTail;
/**
 * Calculates the interpolated tween values of an object for a given timestamp.
 * @ignore
 */
const tweenProps = (
/**
 * The position to compute the state for.
 */
forPosition, 
/**
 * Current state properties.
 */
currentState, 
/**
 * The original state properties the Object is tweening from.
 */
originalState, 
/**
 * The destination state properties the Object is tweening to.
 */
targetState, 
/**
 * The length of the tween in milliseconds.
 */
duration, 
/**
 * The UNIX epoch time at which the tween began.
 */
timestamp, 
/**
 * This Object's keys must correspond to the keys in targetState.
 */
easing) => {
    var _b;
    let easedPosition = 0;
    let start;
    const normalizedPosition = forPosition < timestamp ? 0 : (forPosition - timestamp) / duration;
    let easingFn;
    for (const key in currentState) {
        if (typeof easing === TYPE_FUNCTION) {
            easing = easing;
            easingFn = easing;
        }
        else {
            easing = easing;
            const easingObjectProp = easing[key];
            if (typeof easingObjectProp === TYPE_FUNCTION) {
                easingFn = easingObjectProp;
            }
            else {
                // easingObjectProp is a string
                easingFn =
                    (_b = Tweenable.easing[easingObjectProp]) !== null && _b !== void 0 ? _b : standard_easing_functions_1.standardEasingFunctions.linear;
            }
        }
        easedPosition = easingFn(normalizedPosition);
        start = originalState[key];
        currentState[key] = (start +
            (targetState[key] - start) * easedPosition);
    }
    return currentState;
};
exports.tweenProps = tweenProps;
const processTween = (tween, currentTime) => {
    var _b;
    let timestamp = (_b = tween._timestamp) !== null && _b !== void 0 ? _b : 0;
    const currentState = tween._currentState;
    const delay = tween._delay;
    if (currentTime < timestamp + delay) {
        return;
    }
    let duration = tween._duration;
    const targetState = tween._targetState;
    const endTime = timestamp + delay + duration;
    let timeToCompute = currentTime > endTime ? endTime : currentTime;
    tween._hasEnded = timeToCompute >= endTime;
    const offset = duration - (endTime - timeToCompute);
    if (tween._hasEnded) {
        tween._render(targetState, offset, tween._data);
        return tween.stop(true);
    }
    // Converts internal state objects to TweenRawState
    tween._applyFilter(BEFORE_TWEEN);
    // If the animation has not yet reached the start point (e.g., there was
    // delay that has not yet completed), just interpolate the starting
    // position of the tween.
    if (timeToCompute < timestamp + delay) {
        timestamp = duration = timeToCompute = 1;
    }
    else {
        timestamp += delay;
    }
    (0, exports.tweenProps)(timeToCompute, currentState, tween._originalState, targetState, duration, timestamp, tween._easing);
    tween._applyFilter(AFTER_TWEEN);
    tween._render(currentState, offset, tween._data);
};
/**
 * Process all tweens currently managed by Shifty for the current tick. This
 * does not perform any timing or update scheduling; it is the logic that is
 * run *by* the scheduling functionality. Specifically, it computes the state
 * and calls all of the relevant {@link TweenableConfig} functions supplied to
 * each of the tweens for the current point in time (as determined by {@link
 * Tweenable.now}).
 *
 * This is a low-level API that won't be needed in the majority of situations.
 * It is primarily useful as a hook for higher-level animation systems that are
 * built on top of Shifty. If you need this function, it is likely you need to
 * pass something like `() => {}` to {@link Tweenable.setScheduleFunction},
 * override {@link Tweenable.now} and manage the scheduling logic yourself.
 *
 * @see https://github.com/jeremyckahn/shifty/issues/109
 */
const processTweens = () => {
    let nextTweenToProcess;
    const currentTime = Tweenable.now();
    let currentTween = listHead;
    while (currentTween) {
        nextTweenToProcess = currentTween._next;
        processTween(currentTween, currentTime);
        currentTween = nextTweenToProcess;
    }
};
exports.processTweens = processTweens;
const { now } = Date;
let currentTime;
let heartbeatIsRunning = false;
/**
 * Handles the update logic for one tick of a tween.
 */
const scheduleUpdate = () => {
    currentTime = now();
    if (heartbeatIsRunning) {
        scheduleFunction.call(root, exports.scheduleUpdate, UPDATE_TIME);
    }
    (0, exports.processTweens)();
};
exports.scheduleUpdate = scheduleUpdate;
/**
 * Creates an EasingObject or EasingFunction from a string, a function or
 * another easing Object. If `easing` is an Object, then this function clones
 * it and fills in the missing properties with `"linear"`.
 *
 * If the tween has only one easing across all properties, that function is
 * returned directly.
 */
const composeEasingObject = (fromTweenParams, easing = DEFAULT_EASING, 
/**
 * Reused composedEasing object (mutated internally)
 */
composedEasing = {}) => {
    if (typeof easing === TYPE_STRING) {
        if ((0, types_1.isEasingKey)(easing)) {
            return Tweenable.easing[easing];
        }
    }
    if (Array.isArray(easing)) {
        const cubicBezierTransition = (0, bezier_1.getCubicBezierTransition)(...easing);
        return cubicBezierTransition;
    }
    if (typeof composedEasing === TYPE_OBJECT) {
        composedEasing = composedEasing;
        if (typeof easing === TYPE_STRING || typeof easing === TYPE_FUNCTION) {
            for (const prop in fromTweenParams) {
                composedEasing[prop] = easing;
            }
        }
        else {
            for (const prop in fromTweenParams) {
                easing = easing;
                composedEasing[prop] = easing[prop] || DEFAULT_EASING;
            }
        }
    }
    return composedEasing;
};
exports.composeEasingObject = composeEasingObject;
// Private declarations used below
const remove = (() => {
    let previousTween;
    let nextTween;
    return (tween) => {
        previousTween = null;
        nextTween = null;
        // Adapted from:
        // https://github.com/trekhleb/javascript-algorithms/blob/7c9601df3e8ca4206d419ce50b88bd13ff39deb6/src/data-structures/doubly-linked-list/DoublyLinkedList.js#L73-L121
        if (tween === listHead) {
            listHead = tween._next;
            if (listHead) {
                listHead._previous = null;
            }
            else {
                listTail = null;
            }
        }
        else if (tween === listTail) {
            listTail = tween._previous;
            if (listTail) {
                listTail._next = null;
            }
            else {
                listHead = null;
            }
        }
        else {
            previousTween = tween._previous;
            nextTween = tween._next;
            if (previousTween) {
                previousTween._next = nextTween;
            }
            if (nextTween) {
                nextTween._previous = previousTween;
            }
        }
        // Clean up any references in case the tween is restarted later.
        tween._previous = tween._next = null;
    };
})();
const defaultPromiseCtor = typeof Promise === TYPE_FUNCTION ? Promise : null;
class Tweenable {
    constructor(
    /**
     * The values that the initial tween should start at if a {@link
     * TweenableConfig#from} value is not provided to {@link Tweenable#tween}
     * or {@link Tweenable#setConfig}.
     */
    initialState = {}, 
    /**
     * Configuration object to be passed to {@link Tweenable#setConfig}.
     */
    config) {
        /**
         * Required for Promise implementation
         * @ignore
         */
        this[_a] = 'Promise';
        /**
         * @ignore
         */
        this._next = null;
        /**
         * @ignore
         */
        this._previous = null;
        /**
         * @ignore
         */
        this._config = {};
        /**
         * @ignore
         */
        this._data = {};
        /**
         * @ignore
         */
        this._delay = 0;
        /**
         * @ignore
         */
        this._duration = DEFAULT_DURATION;
        /**
         * @ignore
         */
        this._filters = [];
        /**
         * @ignore
         */
        this._timestamp = null;
        /**
         * @ignore
         */
        this._hasEnded = false;
        /**
         * @ignore
         */
        this._resolve = null;
        /**
         * @ignore
         */
        this._reject = null;
        /**
         * @ignore
         */
        this._originalState = {};
        /**
         * @ignore
         */
        this._targetState = {};
        /**
         * @ignore
         */
        this._start = noop;
        /**
         * @ignore
         */
        this._render = noop;
        /**
         * @ignore
         */
        this._promiseCtor = defaultPromiseCtor;
        /**
         * @ignore
         */
        this._promise = null;
        /**
         * @ignore
         */
        this._isPlaying = false;
        /**
         * @ignore
         */
        this._pausedAtTime = null;
        /**
         * @ignore
         */
        this._easing = {};
        this._currentState = initialState || {};
        // To prevent unnecessary calls to setConfig do not set default
        // configuration here.  Only set default configuration immediately before
        // tweening if none has been set.
        if (config) {
            this.setConfig(config);
        }
    }
    /**
     * Applies a filter to Tweenable instance.
     * @ignore
     */
    _applyFilter(filterType) {
        var _b;
        for (let i = this._filters.length; i > 0; i--) {
            const filter = this._filters[i - i];
            (_b = filter[filterType]) === null || _b === void 0 ? void 0 : _b.call(filter, this);
        }
    }
    /**
     * {@link Tweenable#setConfig Configure} and start a tween. If this {@link
     * Tweenable}'s instance is already running, then it will stop playing the
     * old tween and immediately play the new one.
     */
    tween(config) {
        if (this._isPlaying) {
            this.stop();
        }
        if (config || !this._config) {
            this.setConfig(config);
        }
        this._pausedAtTime = null;
        this._timestamp = Tweenable.now();
        this._start(this.state, this._data);
        if (this._delay) {
            this._render(this._currentState, 0, this._data);
        }
        return this._resume(this._timestamp);
    }
    /**
     * Configures a tween without starting it. Aside from {@link
     * TweenableConfig.delay}, {@link TweenableConfig.from}, and {@link
     * TweenableConfig.to}, each configuration option will automatically default
     * to the same option used in the preceding tween of the {@link Tweenable}
     * instance.
     */
    setConfig(config = {}) {
        var _b;
        const { _config } = this;
        let key;
        for (key in config) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _config[key] = config[key];
        }
        // Configuration options to reuse from previous tweens
        const { promise = this._promiseCtor, start = noop, finish, render = noop, } = _config;
        // Attach something to this Tweenable instance (e.g.: a DOM element, an
        // object, a string, etc.);
        this._data = _config.data || this._data;
        // Init the internal state
        this._isPlaying = false;
        this._pausedAtTime = null;
        this._delay = config.delay || 0;
        this._start = start;
        this._render = render;
        this._duration = _config.duration || DEFAULT_DURATION;
        this._promiseCtor = promise;
        if (finish) {
            this._resolve = finish;
        }
        const { from, to = {} } = config;
        const { _currentState, _originalState, _targetState } = this;
        for (const key in from) {
            _currentState[key] = from[key];
        }
        let anyPropsAreStrings = false;
        for (const key in _currentState) {
            const currentProp = _currentState[key];
            if (!anyPropsAreStrings && typeof currentProp === TYPE_STRING) {
                anyPropsAreStrings = true;
            }
            _originalState[key] = currentProp;
            // Ensure that there is always something to tween to.
            _targetState[key] = (_b = to[key]) !== null && _b !== void 0 ? _b : currentProp;
        }
        this._easing = (0, exports.composeEasingObject)(this._currentState, _config.easing, this._easing);
        this._filters.length = 0;
        if (anyPropsAreStrings) {
            for (const key in Tweenable.filters) {
                if (Tweenable.filters[key].doesApply(this)) {
                    this._filters.push(Tweenable.filters[key]);
                }
            }
            this._applyFilter(TWEEN_CREATED);
        }
        return this;
    }
    /**
     * Overrides any `finish` function passed via a {@link TweenableConfig}.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
     */
    then(onFulfilled, onRejected) {
        if (!this._promiseCtor) {
            throw new Error('Promise implementation is unavailable');
        }
        this._promise = new this._promiseCtor((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        return this._promise.then(onFulfilled, onRejected);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
     */
    catch(onRejected) {
        return this.then().catch(onRejected);
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
     */
    finally(onFinally) {
        return this.then().finally(onFinally);
    }
    /**
     * Returns the current state of the tween.
     */
    get state() {
        return Object.assign({}, this._currentState);
    }
    /**
     * Set the current tween state.
     */
    setState(
    /**
     * The state to set.
     */
    state) {
        this._currentState = state;
    }
    /**
     * Pauses a tween. Paused tweens can be {@link resume}d from the point at
     * which they were paused. If a tween is not running, this is a no-op.
     */
    pause() {
        if (!this._isPlaying) {
            return this;
        }
        this._pausedAtTime = Tweenable.now();
        this._isPlaying = false;
        remove(this);
        return this;
    }
    /**
     * Resumes a {@link pause}d tween.
     */
    resume() {
        return this._resume();
    }
    /**
     * @ignore
     */
    _resume(currentTime = Tweenable.now()) {
        if (this._timestamp === null) {
            return this.tween();
        }
        if (this._isPlaying && this._promise) {
            return this;
        }
        if (this._pausedAtTime) {
            this._timestamp += currentTime - this._pausedAtTime;
            this._pausedAtTime = null;
        }
        this._isPlaying = true;
        if (listHead === null) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            listHead = this;
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            listTail = this;
        }
        else {
            this._previous = listTail;
            if (listTail) {
                listTail._next = this;
            }
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            listTail = this;
        }
        return this;
    }
    /**
     * Move the state of the animation to a specific point in the tween's
     * timeline. If the animation is not running, this will cause the tween's
     * {@link TweenableConfig.render | render} handler to be called.
     */
    seek(
    /**
     * The millisecond of the animation to seek to.  This must not be less than
     * `0`.
     */
    millisecond) {
        var _b;
        millisecond = Math.max(millisecond, 0);
        const currentTime = Tweenable.now();
        if (((_b = this._timestamp) !== null && _b !== void 0 ? _b : 0) + millisecond === 0) {
            return this;
        }
        this._timestamp = currentTime - millisecond;
        // Make sure that any render handlers are run.
        processTween(this, currentTime);
        return this;
    }
    /**
     * Stops a tween. If a tween is not running, this is a no-op. This method
     * does **not** reject the tween {@link !Promise}. For that, use {@link
     * Tweenable#cancel}.
     */
    stop(
    /**
     * If `false` or not provided, the tween just stops at its current state.
     * If `true`, the tweened object's values are instantly set {@link
     * TweenableConfig.to | to the target values}.
     */
    gotoEnd = false) {
        var _b;
        if (!this._isPlaying) {
            return this;
        }
        this._isPlaying = false;
        remove(this);
        if (gotoEnd) {
            // Converts internal state objects to TweenRawState
            this._applyFilter(BEFORE_TWEEN);
            (0, exports.tweenProps)(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing);
            this._applyFilter(AFTER_TWEEN);
            this._applyFilter(AFTER_TWEEN_END);
        }
        (_b = this._resolve) === null || _b === void 0 ? void 0 : _b.call(this, {
            data: this._data,
            state: this._currentState,
            tweenable: this,
        });
        this._resolve = null;
        this._reject = null;
        return this;
    }
    /**
     * {@link Tweenable#stop}s a tween and also rejects its {@link !Promise}. If
     * a tween is not running, this is a no-op. Prevents calling any provided
     * {@link TweenableConfig.finish} function.
     * @see https://github.com/jeremyckahn/shifty/issues/122
     */
    cancel(
    /**
     * This gets propagated to {@link Tweenable#stop}.
     */
    gotoEnd = false) {
        var _b;
        const { _currentState, _data, _isPlaying } = this;
        if (!_isPlaying) {
            return this;
        }
        (_b = this._reject) === null || _b === void 0 ? void 0 : _b.call(this, {
            data: _data,
            state: _currentState,
            tweenable: this,
        });
        this._resolve = null;
        this._reject = null;
        return this.stop(gotoEnd);
    }
    /**
     * Whether or not a tween is running (not paused or completed).
     */
    get isPlaying() {
        return this._isPlaying;
    }
    /**
     * Whether or not a tween has completed.
     */
    get hasEnded() {
        return this._hasEnded;
    }
    /**
     * Get and optionally set the data that gets passed as `data` to {@link
     * StartFunction}, {@link FinishFunction} and {@link RenderFunction}.
     */
    data(data = null) {
        if (data) {
            this._data = Object.assign({}, data);
        }
        return this._data;
    }
    /**
     * `delete` all {@link
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
     * | own} properties.  Call this when the {@link Tweenable} instance is no
     * longer needed to free memory.
     */
    dispose() {
        for (const prop in this) {
            delete this[prop];
        }
    }
}
exports.Tweenable = Tweenable;
_a = Symbol.toStringTag;
/**
 * Returns the current timestamp.
 */
Tweenable.now = () => currentTime;
/**
 * Sets a custom schedule function.
 *
 * By default, Shifty uses
 * [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
 * is used if available, otherwise {@link !setTimeout} is used.
 */
Tweenable.setScheduleFunction = (
/**
 * The function to be used to schedule the next frame to be rendered.
 */
fn) => (scheduleFunction = fn);
/**
 * The {@link Filter}s available for use.  These filters are automatically
 * applied. You can define your own {@link Filter}s and attach them to this
 * object.
 *
 * ```ts
 * Tweenable.filters['customFilter'] = {
 *   doesApply: () => true
 *   tweenCreated: () => console.log('tween created!')
 * }
 * ```
 */
Tweenable.filters = { token };
/**
 * You can define custom easing curves by attaching {@link EasingFunction}s
 * to this static object.
 *
 * ```ts
 * Tweenable.easing['customEasing'] = (pos: number) => Math.pow(pos, 2)
 * ```
 */
Tweenable.easing = Object.create(standard_easing_functions_1.standardEasingFunctions);
/**
 * Standalone convenience method that functions identically to {@link
 * Tweenable#tween}. You can use this to create tweens without needing to
 * explicitly set up a {@link Tweenable} instance.
 *
 * ```
 * import { tween } from 'shifty';
 *
 * tween({ from: { x: 0 }, to: { x: 10 } }).then(
 *   () => console.log('All done!')
 * );
 * ```
 */
function tween(config = {}) {
    const tweenable = new Tweenable({}, {});
    return tweenable.tween(config);
}
exports.tween = tween;
/**
 * Determines whether or not a heartbeat tick should be scheduled. This is
 * generally only useful for testing environments where Shifty's continuous
 * heartbeat mechanism causes test runner issues.
 *
 * If you are using Jest, it is recommended to put this in a global `afterAll`
 * hook. If you don't already have a Jest setup file, follow the setup in [this
 * StackOverflow post](https://stackoverflow.com/a/57647146), and then add this
 * to it:
 *
 * ```
 * import { shouldScheduleUpdate } from 'shifty'
 *
 * afterAll(() => {
 *   shouldScheduleUpdate(false)
 * })
 * ```
 * @see https://github.com/jeremyckahn/shifty/issues/156
 */
const shouldScheduleUpdate = (doScheduleUpdate) => {
    if (doScheduleUpdate && heartbeatIsRunning) {
        return;
    }
    heartbeatIsRunning = doScheduleUpdate;
    if (doScheduleUpdate) {
        (0, exports.scheduleUpdate)();
    }
};
exports.shouldScheduleUpdate = shouldScheduleUpdate;
(0, exports.shouldScheduleUpdate)(true);


/***/ }),

/***/ 699:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isEasingKey = void 0;
const tweenable_1 = __webpack_require__(188);
/**
 * Determines whether or not a given string represents a defined easing curve
 * on {@link Tweenable.easing}. This also supports custom easing functions.
 */
const isEasingKey = (key) => {
    return key in tweenable_1.Tweenable.easing;
};
exports.isEasingKey = isEasingKey;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=shifty.node.js.map