"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolate = void 0;
const tweenable_1 = require("./tweenable");
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
