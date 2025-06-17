"use strict";
/* istanbul ignore file */
Object.defineProperty(exports, "__esModule", { value: true });
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
