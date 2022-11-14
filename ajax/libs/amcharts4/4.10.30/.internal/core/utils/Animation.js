/**
 * Animation module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObjectEvents } from "../Base";
import { SVGDefaults } from "../defs/SVGDefaults";
import { Disposer } from "../utils/Disposer";
import { Color } from "../utils/Color";
import { Percent, percent } from "../utils/Percent";
import * as $async from "../utils/AsyncPending";
import * as $ease from "../utils/Ease";
import * as $colors from "../utils/Colors";
import * as $math from "../utils/Math";
import * as $array from "../utils/Array";
import * as $type from "../utils/Type";
import { system } from "../System";
import { options } from "../Options";
/**
 * Calls a `callback` function for the `duration` of milliseconds.
 *
 * @todo Needed?
 * @deprecated Not used anywhere
 * @ignore Exclude from docs
 * @param duration  Duration (ms)
 * @param callback  Callback function
 * @return Disposer
 */
export function animate(duration, callback) {
    var disposed = false;
    // TODO use performance.now() ?
    var startTime = Date.now();
    function loop(now) {
        if (!disposed) {
            var diff = now - startTime;
            if (diff >= duration) {
                callback(1);
            }
            else {
                $async.nextFrame(loop);
                callback(diff / duration);
            }
        }
    }
    $async.nextFrame(loop);
    return new Disposer(function () {
        disposed = true;
    });
}
/**
 * Returns numeric value accoring to progress between start and end values.
 *
 * @param progress  Progress (0-1)
 * @param from
 * @param to
 * @return Value according to progress
 */
function getProgressNumber(progress, from, to) {
    return from + ((to - from) * progress);
}
/**
 * Returns [[Percent]] value accoring to progress between start and end
 * values.
 *
 * @param progress  Progress (0-1)
 * @param from
 * @param to
 * @return Value according to progress
 */
function getProgressPercent(progress, from, to) {
    return new Percent(getProgressNumber(progress, from.percent, to.percent));
}
/**
 * Returns color value accoring to progress between start and end values.
 *
 * @param progress  Progress (0-1)
 * @param from
 * @param to
 * @return Color according to progress
 */
function getProgressColor(progress, from, to) {
    var color = new Color($colors.interpolate(from.rgb, to.rgb, progress));
    if (from.alpha != to.alpha) {
        color.alpha = from.alpha + (to.alpha - from.alpha) * progress;
    }
    return color;
}
/**
 * [getHybridProperty description]
 *
 * @todo Description
 * @param property [description]
 * @param type [description]
 * @return [description]
 */
function getHybridProperty(property, type) {
    return type + property.charAt(0).toUpperCase() + property.substr(1);
}
var AnimationDisposer = /** @class */ (function () {
    function AnimationDisposer(array) {
        this._disposer = new Disposer(function () {
            while (array.length !== 0) {
                array[0].dispose();
            }
        });
    }
    AnimationDisposer.prototype.isDisposed = function () {
        return this._disposer.isDisposed();
    };
    AnimationDisposer.prototype.dispose = function () {
        this._disposer.dispose();
    };
    return AnimationDisposer;
}());
export { AnimationDisposer };
/**
 * Animation can be used to transition certain properties on an object that
 * implements [[IAnimatable]] interface.
 *
 * @see {@link IAnimationEvents} for a list of available events
 */
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    /**
     * Constructor
     *
     * @param object            An object animation should run on
     * @param animationOptions  One or several (array) of animation options
     * @param duration          Duration (ms)
     * @param easing            Easing function
     */
    function Animation(object, animationOptions, duration, easing) {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Duration of the animation in milliseconds.
         */
        _this.duration = 0;
        /**
         * Easing function to use.
         *
         * @see {@link Ease}
         */
        _this.easing = $ease.linear;
        /**
         * Contains progress of the current animation: 0 (start) to 1 (end).
         */
        _this.progress = 0;
        /**
         * Indicated how many times animation should loop.
         */
        _this._loop = 0;
        /**
         * Animation is paused.
         */
        _this._pause = false;
        /**
         * Holds reference to timeout for delayed play.
         */
        _this._delayTimeout = null;
        /**
         * Elapsed time in currently playing animation.
         */
        _this._time = 0;
        _this._isFinished = false;
        _this.className = "Animation";
        // Override duration if animations disabled system-wide
        if (options.animationsEnabled === false) {
            duration = 0;
        }
        // Set parameters
        _this.object = object;
        _this.animationOptions = $array.toArray(animationOptions);
        _this.duration = duration;
        if (easing) {
            _this.easing = easing;
        }
        // Run check if there are already animations playing on the same properties
        // and stop them - the last animation takes precedence
        //this.stopSameAnimations();
        /*if ($type.hasValue(callback)) {
            // TODO don't use .call
            this.events.on("animationended", callback, object);
        }*/
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    // TODO verify that this is correct
    Animation.prototype.debug = function () { };
    /**
     * Disposes this object, clears up after itself.
     */
    Animation.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.pause();
    };
    /**
     * Delays animation start by X milliseconds.
     *
     * @param delay  Delay (ms)
     * @return Animation
     */
    Animation.prototype.delay = function (delay) {
        var _this = this;
        //@todo Maybe not use `bind()`
        if (delay > 0) {
            this.pause();
            // This is so that it will get disposed if `this.object` is disposed
            // TODO hacky, figure out a better way
            $array.move(this.object.animations, this);
            var id_1 = setTimeout(function () {
                _this._delayTimeout = null;
                _this.start();
            }, delay);
            this._delayTimeout = new Disposer(function () {
                clearTimeout(id_1);
            });
        }
        return this;
    };
    Animation.prototype._start = function () {
        this._isFinished = false;
        // Clear delay timeout if there was one
        if (this._delayTimeout) {
            this.removeDispose(this._delayTimeout);
            this._delayTimeout = null;
        }
        // Run check if there are already animations playing on the same properties
        // and stop them - the last animation takes precedence
        this.stopSameAnimations();
        // Reset counters
        this._pause = false;
        // Register animation
        $array.move(system.animations, this);
        // Register this animation in object's `animations` list
        $array.move(this.object.animations, this);
        system.requestFrame();
    };
    /**
     * Starts animation.
     *
     * @return Animation
     */
    Animation.prototype.start = function () {
        this._start();
        this._startTime = Date.now();
        this._time = 0;
        this.staticOptions = [];
        // Process initial property values
        for (var i = this.animationOptions.length - 1; i >= 0; i--) {
            var options_1 = this.animationOptions[i];
            if (!$type.hasValue(options_1.from)) {
                if (options_1.childObject) {
                    options_1.from = options_1.childObject[options_1.property];
                }
                else {
                    options_1.from = this.object[options_1.property];
                    if (!$type.hasValue(options_1.from)) {
                        options_1.from = SVGDefaults[options_1.property];
                    }
                }
                /*if (!$type.hasValue(options.from)) {
                    throw Error("Could not get initial transition value.");
                }*/
            }
            if (options_1.from == options_1.to) { // || options.to == (<any>this.object)[options.property]){ this is not good, as dataItem.value is set to final at once, and we animate workingValue
                $array.remove(this.animationOptions, options_1);
            }
            else if (!$type.hasValue(options_1.from) || (!(options_1.from instanceof Percent) && (options_1.to instanceof Percent)) || ((options_1.from instanceof Percent) && !(options_1.to instanceof Percent))) {
                // Initial value is undefined, treat it as static
                this.staticOptions.push(options_1);
                $array.remove(this.animationOptions, options_1);
            }
            else {
                // Use different update methods for different value types
                if ($type.isNumber(options_1.to)) {
                    // Numeric value
                    options_1.updateMethod = getProgressNumber;
                    // Check if initial value is not Percent
                    if (options_1.from instanceof Percent) {
                        // It is. Let's convert it to pixel value
                        // @todo Check if we can do this in a less hacky way
                        var convertedFrom = this.object[getHybridProperty(options_1.property, "pixel")];
                        if (!isNaN(convertedFrom)) {
                            options_1.from = convertedFrom;
                        }
                        else {
                            this.staticOptions.push(options_1);
                            $array.remove(this.animationOptions, options_1);
                        }
                    }
                    else if (isNaN(options_1.from)) {
                        // Static value
                        this.staticOptions.push(options_1);
                        $array.remove(this.animationOptions, options_1);
                    }
                }
                else {
                    // Check if maybe we have a color or percent value
                    if (options_1.to instanceof Color) {
                        // Yup - set resolved named color
                        //options.from = $colors.stringToColor(<string>options.from);
                        if (options_1.from) {
                            options_1.updateMethod = getProgressColor;
                        }
                        else {
                            // Static value
                            this.staticOptions.push(options_1);
                            $array.remove(this.animationOptions, options_1);
                        }
                    }
                    else if (options_1.to instanceof Percent) {
                        // Percent
                        options_1.updateMethod = getProgressPercent;
                        // Check if the initial value is maybe in pixels
                        if (!isNaN(options_1.from)) {
                            // It is. Let's convert it
                            // @todo Check if we can do this in a less hacky way
                            var convertedFrom = this.object[getHybridProperty(options_1.property, "relative")];
                            if (!isNaN(convertedFrom)) {
                                options_1.from = percent(convertedFrom * 100);
                            }
                        }
                    }
                    else {
                        // Static value
                        this.staticOptions.push(options_1);
                        $array.remove(this.animationOptions, options_1);
                    }
                }
            }
        }
        // Apply static options (just in case they were reset by previous
        // animation loop)
        this.applyStaticOptions();
        if (this.events.isEnabled("animationstarted")) {
            var event_1 = {
                type: "animationstarted",
                target: this,
                progress: this.progress
            };
            this.events.dispatchImmediately("animationstarted", event_1);
        }
        this.update();
        // If duration is 0, just end animation
        if (this.duration === 0) {
            this.end();
        }
        return this;
    };
    /**
     * Sets loop count for the animation. If parameter is not a valid number the
     * animation will keep on looping indefinitely.
     *
     * @param count  Number of times to loop animation
     * @return Animation
     */
    Animation.prototype.loop = function (count) {
        if (!$type.isNumber(count)) {
            count = Infinity;
        }
        this._loop = count;
        return this;
    };
    /**
     * Pauses animation.
     *
     * @return Animation
     */
    Animation.prototype.pause = function () {
        this._pause = true;
        if (this._delayTimeout) {
            this.removeDispose(this._delayTimeout);
            this._delayTimeout = null;
        }
        $array.remove(system.animations, this);
        $array.remove(this.object.animations, this);
        return this;
    };
    /**
     * Resumes paused animation.
     *
     * @return Animation
     */
    Animation.prototype.resume = function () {
        this._start();
        this._startTime = Date.now() - this._time;
        return this;
    };
    /**
     * Jumps to animation end. If animation is set to loop, this will start
     * another round of animation from start.
     *
     * @return Animation
     */
    Animation.prototype.end = function () {
        // Pause and complete the progress
        if (this._loop == 0) {
            this.pause();
        }
        this.setProgress(1);
        // Apply static options
        this.applyStaticOptions();
        if (this.events.isEnabled("animationended")) {
            var event_2 = {
                type: "animationended",
                target: this,
                progress: this.progress
            };
            this.events.dispatchImmediately("animationended", event_2);
        }
        // Check if we should loop
        if (this._loop > 0) {
            this._loop--;
            this.start();
        }
        else {
            this.stop();
            this._isFinished = true;
        }
        return this;
    };
    /**
     * Stops animation immediately leaving properties in their current values.
     */
    Animation.prototype.kill = function () {
        this.pause();
        this._isFinished = true;
    };
    /**
     * Returns indicator if this animation is finished or not
     *
     * @return Is finished?
     */
    Animation.prototype.isFinished = function () {
        return this._isFinished;
    };
    /**
     * Applies static options that can't be animated.
     */
    Animation.prototype.applyStaticOptions = function () {
        var _this = this;
        $array.each(this.staticOptions, function (options) {
            if (options.childObject) {
                options.childObject[options.property] = _this.progress == 1 ? options.to : options.from;
            }
            else {
                _this.object[options.property] = _this.progress == 1 ? options.to : options.from;
            }
        });
    };
    /**
     * Stops animation.
     *
     * When animation is stopped, the properties of the target object will remain
     * where they were at the moment when `stop()` was called.
     *
     * @param skipEvent  Do not trigger `animationstopped` event
     * @return Animation
     */
    Animation.prototype.stop = function (skipEvent) {
        this.pause();
        if (!skipEvent) {
            if (this.events.isEnabled("animationstopped")) {
                var event_3 = {
                    type: "animationstopped",
                    target: this,
                    progress: this.progress
                };
                this.events.dispatchImmediately("animationstopped", event_3);
            }
        }
        return this;
    };
    /**
     * Sets current progress and updates object's numeric and color values.
     *
     * @param progress Progress (0-1)
     */
    Animation.prototype.setProgress = function (progress) {
        var _this = this;
        this._time = this.duration * progress; // just in case we call this from outside
        $array.each(this.animationOptions, function (options) {
            if (options.updateMethod && $type.hasValue(options.from)) {
                var value = options.updateMethod(progress, options.from, options.to);
                if (options.childObject) {
                    options.childObject[options.property] = value;
                }
                else {
                    _this.object[options.property] = value;
                }
            }
        });
        this.progress = progress;
        if (this.events.isEnabled("animationprogress")) {
            var event_4 = {
                type: "animationprogress",
                target: this,
                progress: this.progress
            };
            this.events.dispatchImmediately("animationprogress", event_4);
        }
        system.requestFrame();
    };
    /**
     * Tracks and sets progress according to time or frames.
     *
     * @ignore Exclude from docs
     * @return Animation
     */
    Animation.prototype.update = function () {
        if (!this._pause) {
            var progress = void 0;
            this._time = $math.fitToRange(Date.now() - this._startTime, 0, this.duration);
            var timeProgress = this._time / this.duration;
            progress = this.easing(timeProgress);
            if (this.duration == 0 || !$type.isNumber(progress) || timeProgress >= 1) {
                progress = 1;
            }
            this.setProgress(progress);
            if ($math.round(this._time / this.duration, 6) == 1) {
                this.end();
            }
        }
        return this;
    };
    Object.defineProperty(Animation.prototype, "delayed", {
        /**
         * Returns `true` if this animation is delayed.
         *
         * @readonly
         * @return [description]
         */
        get: function () {
            return this._delayTimeout ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks other animations currently running on the same object and removes
     * overlapping options from those other animations that are contained in
     * this animation.
     *
     * This is needed to ensure that no two confurent animations step on each
     * other's toes by trying to animate the same property.
     */
    Animation.prototype.stopSameAnimations = function () {
        var _this = this;
        // stop animation of the same property
        // TODO make this more efficient
        // TODO don't copy the array
        $array.each($array.copy(this.object.animations), function (animation) {
            if (animation !== _this && !animation.delayed) {
                var killed_1 = [];
                $array.each(_this.animationOptions, function (newOptions) {
                    $array.each(animation.animationOptions, function (oldOptions) {
                        if (newOptions.property == oldOptions.property && newOptions.childObject == oldOptions.childObject) {
                            killed_1.push(oldOptions);
                            if (animation.animationOptions.length == 0) {
                                animation.kill();
                            }
                        }
                    });
                });
                $array.each(killed_1, function (oldOptions) {
                    $array.remove(animation.animationOptions, oldOptions);
                });
            }
        });
    };
    /**
     * Adds easing functions to "function" fields.
     *
     * @param field  Field name
     * @return Assign as function?
     */
    Animation.prototype.asFunction = function (field) {
        return field == "easing" || _super.prototype.asIs.call(this, field);
    };
    return Animation;
}(BaseObjectEvents));
export { Animation };
//# sourceMappingURL=Animation.js.map