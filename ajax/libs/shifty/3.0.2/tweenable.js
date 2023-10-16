"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldScheduleUpdate = exports.tween = exports.Tweenable = exports.composeEasingObject = exports.scheduleUpdate = exports.processTweens = exports.tweenProps = exports.getListTail = exports.getListHead = exports.resetList = void 0;
const standard_easing_functions_1 = require("./standard-easing-functions");
const bezier_1 = require("./bezier");
const types_1 = require("./types");
const token = __importStar(require("./token"));
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
