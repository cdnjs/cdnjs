/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	var easings = __webpack_require__(1);
	var AnimationManager_1 = __webpack_require__(2);
	var animations = __webpack_require__(7);
	var helpers_1 = __webpack_require__(3);
	// create animationmanager
	var animationManager = new AnimationManager_1.AnimationManager();
	// register easings
	animationManager.configure(undefined, easings);
	// register animations
	for (var animationName in animations) {
	    if (animations.hasOwnProperty(animationName)) {
	        var animationOptions = animations[animationName];
	        animationManager.register(animationName, animationOptions);
	    }
	}
	// register with angular if it is present
	if (typeof angular !== 'undefined') {
	    angular.module('just.animate', []).service('just', function () { return animationManager; });
	}
	// add animation properties to global Just
	var root = (window || global);
	root.Just = root.Just || {};
	helpers_1.extend(root.Just, animationManager);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
		"easeInCubic": "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
		"easeOutCubic": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
		"easeInOutCubic": "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
		"easeInCirc": "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
		"easeOutCirc": "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
		"easeInOutCirc": "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
		"easeInExpo": "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
		"easeOutExpo": "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
		"easeInOutExpo": "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
		"easeInQuad": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
		"easeOutQuad": "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
		"easeInOutQuad": "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
		"easeInQuart": "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
		"easeOutQuart": "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
		"easeInOutQuart": "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
		"easeInQuint": "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
		"easeOutQuint": "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
		"easeInOutQuint": "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
		"easeInSine": "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
		"easeOutSine": "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
		"easeInOutSine": "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
		"easeInBack": "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
		"easeOutBack": "cubic-bezier(0.175,  0.885, 0.320, 1.275)",
		"easeInOutBack": "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
		"elegantSlowStartEnd": "cubic-bezier(0.175, 0.885, 0.320, 1.275)"
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var helpers_1 = __webpack_require__(3);
	var ElementAnimator_1 = __webpack_require__(4);
	var SequenceAnimator_1 = __webpack_require__(5);
	var TimelineAnimator_1 = __webpack_require__(6);
	var AnimationManager = (function () {
	    function AnimationManager() {
	        this._registry = {};
	        this._easings = {};
	        this._timings = {
	            duration: 1000,
	            fill: 'both'
	        };
	    }
	    AnimationManager.prototype.animate = function (keyframesOrName, el, timings) {
	        return new ElementAnimator_1.ElementAnimator(this, keyframesOrName, el, timings);
	    };
	    AnimationManager.prototype.animateSequence = function (options) {
	        return new SequenceAnimator_1.SequenceAnimator(this, options);
	    };
	    AnimationManager.prototype.animateTimeline = function (options) {
	        return new TimelineAnimator_1.TimelineAnimator(this, options);
	    };
	    AnimationManager.prototype.configure = function (timings, easings) {
	        if (timings) {
	            helpers_1.extend(this._timings, timings);
	        }
	        if (easings) {
	            helpers_1.extend(this._easings, easings);
	        }
	        return this;
	    };
	    AnimationManager.prototype.findAnimation = function (name) {
	        return this._registry[name] || undefined;
	    };
	    AnimationManager.prototype.findEasing = function (name) {
	        return this._easings[name] || undefined;
	    };
	    AnimationManager.prototype.register = function (name, animationOptions) {
	        this._registry[name] = animationOptions;
	        var self = this;
	        self[name] = function (el, timings) {
	            return self.animate(name, el, timings);
	        };
	        return self;
	    };
	    return AnimationManager;
	}());
	exports.AnimationManager = AnimationManager;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var ostring = Object.prototype.toString;
	var slice = Array.prototype.slice;
	function noop() {
	    // do nothing
	}
	exports.noop = noop;
	function clamp(val, min, max) {
	    return val === undefined ? undefined : val < min ? min : val > max ? max : val;
	}
	exports.clamp = clamp;
	function head(indexed) {
	    return (!indexed || indexed.length < 1) ? undefined : indexed[0];
	}
	exports.head = head;
	function tail(indexed) {
	    return (!indexed || indexed.length < 1) ? undefined : indexed[indexed.length - 1];
	}
	exports.tail = tail;
	function isArray(a) {
	    return !isString(a) && isNumber(a.length);
	}
	exports.isArray = isArray;
	function isFunction(a) {
	    return ostring.call(a) === '[object Function]';
	}
	exports.isFunction = isFunction;
	function isNumber(a) {
	    return typeof a === 'number';
	}
	exports.isNumber = isNumber;
	function isString(a) {
	    return typeof a === 'string';
	}
	exports.isString = isString;
	function toArray(indexed) {
	    return slice.call(indexed, 0);
	}
	exports.toArray = toArray;
	function each(items, fn) {
	    for (var i = 0, len = items.length; i < len; i++) {
	        fn(items[i]);
	    }
	}
	exports.each = each;
	function max(items, propertyName) {
	    var max = '';
	    for (var i = 0, len = items.length; i < len; i++) {
	        var prop = items[i][propertyName];
	        if (max < prop) {
	            max = prop;
	        }
	    }
	    return max;
	}
	exports.max = max;
	function map(items, fn) {
	    var results = [];
	    for (var i = 0, len = items.length; i < len; i++) {
	        var result = fn(items[i]);
	        if (result !== undefined) {
	            results.push(result);
	        }
	    }
	    return results;
	}
	exports.map = map;
	function extend(target) {
	    var sources = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        sources[_i - 1] = arguments[_i];
	    }
	    for (var i = 1, len = arguments.length; i < len; i++) {
	        var source = arguments[i];
	        for (var propName in source) {
	            target[propName] = source[propName];
	        }
	    }
	    return target;
	}
	exports.extend = extend;
	function multiapply(targets, fnName, args, cb) {
	    var errors = [];
	    var results = [];
	    for (var i = 0, len = targets.length; i < len; i++) {
	        try {
	            var target = targets[i];
	            var result = void 0;
	            if (fnName) {
	                result = target[fnName].apply(target, args);
	            }
	            else {
	                result = target.apply(undefined, args);
	            }
	            if (result !== undefined) {
	                results.push(result);
	            }
	        }
	        catch (err) {
	            errors.push(err);
	        }
	    }
	    if (isFunction(cb)) {
	        cb(errors);
	    }
	    return results;
	}
	exports.multiapply = multiapply;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var helpers_1 = __webpack_require__(3);
	var ElementAnimator = (function () {
	    function ElementAnimator(manager, keyframesOrName, el, timings) {
	        var _this = this;
	        if (!keyframesOrName) {
	            return;
	        }
	        var keyframes;
	        if (helpers_1.isString(keyframesOrName)) {
	            // if keyframes is a string, lookup keyframes from registry
	            var definition = manager.findAnimation(keyframesOrName);
	            keyframes = definition.keyframes;
	            // use registered timings as default, then load timings from params           
	            timings = helpers_1.extend({}, definition.timings, timings);
	        }
	        else {
	            // otherwise, keyframes are actually keyframes
	            keyframes = keyframesOrName;
	        }
	        if (timings && timings.easing) {
	            // if timings contains an easing property, 
	            var easing = manager.findEasing(timings.easing);
	            if (easing) {
	                timings.easing = easing;
	            }
	        }
	        // add duration to object    
	        this.duration = timings.duration;
	        // get list of elements to animate
	        var elements = getElements(el);
	        // call .animate on all elements and get a list of their players        
	        this._animators = helpers_1.multiapply(elements, 'animate', [keyframes, timings]);
	        // hookup finish event for when it happens naturally    
	        if (this._animators.length > 0) {
	            // TODO: try to find a better way than just listening to one of them
	            this._animators[0].onfinish = function () {
	                _this.finish();
	            };
	        }
	    }
	    Object.defineProperty(ElementAnimator.prototype, "playbackRate", {
	        get: function () {
	            var first = helpers_1.head(this._animators);
	            return first ? first.playbackRate : 0;
	        },
	        set: function (val) {
	            helpers_1.each(this._animators, function (a) { return a.playbackRate = val; });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ElementAnimator.prototype, "currentTime", {
	        get: function () {
	            return helpers_1.max(this._animators, 'currentTime') || 0;
	        },
	        set: function (elapsed) {
	            helpers_1.each(this._animators, function (it) {
	                it.currentTime = elapsed;
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ElementAnimator.prototype.finish = function (fn) {
	        var _this = this;
	        helpers_1.multiapply(this._animators, 'finish', [], fn);
	        if (this.playbackRate < 0) {
	            helpers_1.each(this._animators, function (a) { return a.currentTime = 0; });
	        }
	        else {
	            helpers_1.each(this._animators, function (a) { return a.currentTime = _this.duration; });
	        }
	        if (helpers_1.isFunction(this.onfinish)) {
	            this.onfinish(this);
	        }
	        return this;
	    };
	    ElementAnimator.prototype.play = function (fn) {
	        helpers_1.multiapply(this._animators, 'play', [], fn);
	        return this;
	    };
	    ElementAnimator.prototype.pause = function (fn) {
	        helpers_1.multiapply(this._animators, 'pause', [], fn);
	        return this;
	    };
	    ElementAnimator.prototype.reverse = function (fn) {
	        helpers_1.multiapply(this._animators, 'reverse', [], fn);
	        return this;
	    };
	    ElementAnimator.prototype.cancel = function (fn) {
	        helpers_1.multiapply(this._animators, 'cancel', [], fn);
	        helpers_1.each(this._animators, function (a) { return a.currentTime = 0; });
	        if (helpers_1.isFunction(this.oncancel)) {
	            this.oncancel(this);
	        }
	        return this;
	    };
	    return ElementAnimator;
	}());
	exports.ElementAnimator = ElementAnimator;
	function getElements(source) {
	    if (!source) {
	        throw Error('source is undefined');
	    }
	    if (helpers_1.isString(source)) {
	        // if query selector, search for elements 
	        var nodeResults = document.querySelectorAll(source);
	        return helpers_1.toArray(nodeResults);
	    }
	    if (source instanceof Element) {
	        // if a single element, wrap in array 
	        return [source];
	    }
	    if (helpers_1.isFunction(source)) {
	        // if function, call it and call this function
	        var provider = source;
	        var result = provider();
	        return getElements(result);
	    }
	    if (helpers_1.isArray(source)) {
	        // if array or jQuery object, flatten to an array
	        var elements_1 = [];
	        helpers_1.each(source, function (i) {
	            // recursively call this function in case of nested elements
	            var innerElements = getElements(i);
	            elements_1.push.apply(elements_1, innerElements);
	        });
	        return elements_1;
	    }
	    // otherwise return empty    
	    return [];
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var helpers_1 = __webpack_require__(3);
	var SequenceAnimator = (function () {
	    function SequenceAnimator(manager, options) {
	        var steps = helpers_1.map(options.steps, function (step) {
	            if (step.command || !step.name) {
	                return step;
	            }
	            var definition = manager.findAnimation(step.name);
	            var timings = helpers_1.extend({}, definition.timings);
	            if (step.timings) {
	                timings = helpers_1.extend(timings, step.timings);
	            }
	            return {
	                el: step.el,
	                keyframes: definition.keyframes,
	                timings: timings
	            };
	        });
	        this.onfinish = helpers_1.noop;
	        this._currentIndex = -1;
	        this._manager = manager;
	        this._steps = steps;
	        if (options.autoplay === true) {
	            this.play();
	        }
	    }
	    Object.defineProperty(SequenceAnimator.prototype, "currentTime", {
	        get: function () {
	            var currentIndex = this._currentIndex;
	            var len = this._steps.length;
	            if (currentIndex === -1 || currentIndex === len) {
	                return 0;
	            }
	            var isReversed = this.playbackRate === -1;
	            var beforeTime = 0;
	            var afterTime = 0;
	            var currentTime;
	            for (var i = 0; i < len; i++) {
	                var step = this._steps[i];
	                if (i < currentIndex) {
	                    beforeTime += step.timings.duration;
	                    continue;
	                }
	                if (i > currentIndex) {
	                    afterTime += step.timings.duration;
	                    continue;
	                }
	                if (isReversed) {
	                    currentTime = this.duration - step.animator.currentTime;
	                    continue;
	                }
	                currentTime = step.animator.currentTime;
	            }
	            return currentTime + (isReversed ? afterTime : beforeTime);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SequenceAnimator.prototype, "duration", {
	        get: function () {
	            return this._steps.reduce(function (c, n) { return c + (n.timings.duration || 0); }, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SequenceAnimator.prototype.finish = function (fn) {
	        this._errorCallback = fn;
	        this._currentIndex = -1;
	        for (var x = 0; x < this._steps.length; x++) {
	            var step = this._steps[x];
	            if (step.animator !== undefined) {
	                step.animator.cancel(fn);
	            }
	        }
	        if (helpers_1.isFunction(this.onfinish)) {
	            this.onfinish(this);
	        }
	        return this;
	    };
	    SequenceAnimator.prototype.play = function (fn) {
	        this._errorCallback = fn;
	        this.playbackRate = 1;
	        this._playThisStep();
	        return this;
	    };
	    SequenceAnimator.prototype.pause = function (fn) {
	        this._errorCallback = fn;
	        // ignore pause if not relevant
	        if (!this._isInEffect()) {
	            return this;
	        }
	        var animator = this._getAnimator();
	        animator.pause(fn);
	        return this;
	    };
	    SequenceAnimator.prototype.reverse = function (fn) {
	        this._errorCallback = fn;
	        this.playbackRate = -1;
	        this._playThisStep();
	        return this;
	    };
	    SequenceAnimator.prototype.cancel = function (fn) {
	        this._errorCallback = fn;
	        this.playbackRate = undefined;
	        this._currentIndex = -1;
	        for (var x = 0; x < this._steps.length; x++) {
	            var step = this._steps[x];
	            if (step.animator !== undefined) {
	                step.animator.cancel(fn);
	            }
	        }
	        if (helpers_1.isFunction(this.oncancel)) {
	            this.oncancel(this);
	        }
	        return this;
	    };
	    SequenceAnimator.prototype._isInEffect = function () {
	        return this._currentIndex > -1 && this._currentIndex < this._steps.length;
	    };
	    SequenceAnimator.prototype._getAnimator = function () {
	        var it = this._steps[this._currentIndex];
	        if (it.animator) {
	            return it.animator;
	        }
	        it.animator = this._manager.animate(it.keyframes, it.el, it.timings);
	        return it.animator;
	    };
	    SequenceAnimator.prototype._playNextStep = function (evt) {
	        if (this.playbackRate === -1) {
	            this._currentIndex--;
	        }
	        else {
	            this._currentIndex++;
	        }
	        if (this._isInEffect()) {
	            this._playThisStep();
	        }
	        else {
	            this.onfinish(evt);
	        }
	    };
	    SequenceAnimator.prototype._playThisStep = function () {
	        var _this = this;
	        if (!this._isInEffect()) {
	            if (this.playbackRate === -1) {
	                this._currentIndex = this._steps.length - 1;
	            }
	            else {
	                this._currentIndex = 0;
	            }
	        }
	        var animator = this._getAnimator();
	        animator.onfinish = function (evt) {
	            _this._playNextStep(evt);
	        };
	        animator.play(this._errorCallback);
	    };
	    return SequenceAnimator;
	}());
	exports.SequenceAnimator = SequenceAnimator;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var helpers_1 = __webpack_require__(3);
	// FIXME!: this controls the amount of time left before the timeline gives up 
	// on individual animation and calls finish.  If an animation plays after its time, it looks
	// like it restarts and that causes jank
	var animationPadding = 1.0 / 30;
	var TimelineAnimator = (function () {
	    function TimelineAnimator(manager, options) {
	        var duration = options.duration;
	        if (duration === undefined) {
	            throw Error('Duration is required');
	        }
	        this.playbackRate = 0;
	        this.duration = options.duration;
	        this.currentTime = 0;
	        this._events = helpers_1.map(options.events, function (evt) { return new TimelineEvent(manager, duration, evt); });
	        this._isPaused = false;
	        this._manager = manager;
	        // ensure context of tick is this instance        
	        this._tick = this._tick.bind(this);
	        if (options.autoplay) {
	            this.play();
	        }
	    }
	    TimelineAnimator.prototype._tick = function () {
	        var _this = this;
	        // handle cancelation and finishing early
	        if (this._isCanceled) {
	            this._triggerCancel();
	            return;
	        }
	        if (this._isFinished) {
	            this._triggerFinish();
	            return;
	        }
	        if (this._isPaused) {
	            this._triggerPause();
	            return;
	        }
	        if (!this._isInEffect) {
	            this._isInEffect = true;
	        }
	        // calculate currentTime from delta
	        var thisTick = performance.now();
	        var lastTick = this._lastTick;
	        if (lastTick !== undefined) {
	            var delta = (thisTick - lastTick) * this.playbackRate;
	            this.currentTime += delta;
	        }
	        this._lastTick = thisTick;
	        // check if animation has finished
	        if (this.currentTime > this.duration || this.currentTime < 0) {
	            this._triggerFinish();
	            return;
	        }
	        // start animations if should be active and currently aren't        
	        helpers_1.each(this._events, function (evt) {
	            var startTimeMs = _this.playbackRate < 0 ? evt.startTimeMs : evt.startTimeMs + animationPadding;
	            var endTimeMs = _this.playbackRate >= 0 ? evt.endTimeMs : evt.endTimeMs - animationPadding;
	            var shouldBeActive = startTimeMs <= _this.currentTime && _this.currentTime < endTimeMs;
	            if (!shouldBeActive) {
	                evt.isInEffect = false;
	                return;
	            }
	            evt.animator.playbackRate = _this.playbackRate;
	            evt.isInEffect = true;
	            evt.animator.play();
	        });
	        window.requestAnimationFrame(this._tick);
	    };
	    TimelineAnimator.prototype._triggerFinish = function () {
	        this._reset();
	        helpers_1.each(this._events, function (evt) { return evt.animator.finish(); });
	        if (helpers_1.isFunction(this.onfinish)) {
	            this.onfinish(this);
	        }
	    };
	    TimelineAnimator.prototype._triggerCancel = function () {
	        this._reset();
	        helpers_1.each(this._events, function (evt) { return evt.animator.cancel(); });
	        if (helpers_1.isFunction(this.oncancel)) {
	            this.oncancel(this);
	        }
	    };
	    TimelineAnimator.prototype._triggerPause = function () {
	        this._isPaused = true;
	        this._isInEffect = false;
	        this._lastTick = undefined;
	        this.playbackRate = 0;
	        helpers_1.each(this._events, function (evt) {
	            evt.isInEffect = false;
	            evt.animator.pause();
	        });
	    };
	    TimelineAnimator.prototype._reset = function () {
	        this.currentTime = 0;
	        this._lastTick = undefined;
	        this._isCanceled = false;
	        this._isFinished = false;
	        this._isPaused = false;
	        this._isInEffect = false;
	        helpers_1.each(this._events, function (evt) {
	            evt.isInEffect = false;
	        });
	    };
	    TimelineAnimator.prototype.finish = function (fn) {
	        this._isFinished = true;
	        return this;
	    };
	    TimelineAnimator.prototype.play = function (fn) {
	        this.playbackRate = 1;
	        this._isPaused = false;
	        if (this._isInEffect) {
	            return this;
	        }
	        if (this.playbackRate < 0) {
	            this.currentTime = this.duration;
	        }
	        else {
	            this.currentTime = 0;
	        }
	        window.requestAnimationFrame(this._tick);
	        return this;
	    };
	    TimelineAnimator.prototype.pause = function (fn) {
	        if (this._isInEffect) {
	            this._isPaused = true;
	        }
	        return this;
	    };
	    TimelineAnimator.prototype.reverse = function (fn) {
	        this.playbackRate = -1;
	        this._isPaused = false;
	        if (this._isInEffect) {
	            return this;
	        }
	        if (this.currentTime <= 0) {
	            this.currentTime = this.duration;
	        }
	        window.requestAnimationFrame(this._tick);
	        return this;
	    };
	    TimelineAnimator.prototype.cancel = function (fn) {
	        this.playbackRate = 0;
	        this._isCanceled = true;
	        return this;
	    };
	    return TimelineAnimator;
	}());
	exports.TimelineAnimator = TimelineAnimator;
	var TimelineEvent = (function () {
	    function TimelineEvent(manager, timelineDuration, evt) {
	        var keyframes;
	        var timings;
	        var el;
	        if (evt.name) {
	            var definition = manager.findAnimation(evt.name);
	            var timings2 = helpers_1.extend({}, definition.timings);
	            if (evt.timings) {
	                timings = helpers_1.extend(timings2, evt.timings);
	            }
	            keyframes = definition.keyframes;
	            timings = timings2;
	            el = evt.el;
	        }
	        else {
	            keyframes = evt.keyframes;
	            timings = evt.timings;
	            el = evt.el;
	        }
	        // calculate endtime
	        var startTime = timelineDuration * evt.offset;
	        var endTime = startTime + timings.duration;
	        var isClipped = endTime > timelineDuration;
	        // if end of animation is clipped, set endTime to duration            
	        if (isClipped) {
	            endTime = timelineDuration;
	        }
	        this.el = el;
	        this.isClipped = isClipped;
	        this.isInEffect = false;
	        this.endTimeMs = endTime;
	        this.keyframes = keyframes;
	        this.offset = evt.offset;
	        this.startTimeMs = startTime;
	        this.timings = timings;
	        this._manager = manager;
	    }
	    Object.defineProperty(TimelineEvent.prototype, "animator", {
	        get: function () {
	            if (this._animator === undefined) {
	                this._animator = this._manager.animate(this.keyframes, this.el, this.timings);
	                this._animator.pause();
	            }
	            return this._animator;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TimelineEvent;
	}());


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.bounce = __webpack_require__(8);
	exports.bounceIn = __webpack_require__(9);
	exports.bounceInDown = __webpack_require__(10);
	exports.bounceInLeft = __webpack_require__(11);
	exports.bounceInRight = __webpack_require__(12);
	exports.bounceInUp = __webpack_require__(13);
	exports.bounceOut = __webpack_require__(14);
	exports.bounceOutDown = __webpack_require__(15);
	exports.bounceOutLeft = __webpack_require__(16);
	exports.bounceOutRight = __webpack_require__(17);
	exports.bounceOutUp = __webpack_require__(18);
	exports.fadeIn = __webpack_require__(19);
	exports.fadeInDown = __webpack_require__(20);
	exports.fadeInDownBig = __webpack_require__(21);
	exports.fadeInLeft = __webpack_require__(22);
	exports.fadeInLeftBig = __webpack_require__(23);
	exports.fadeInRight = __webpack_require__(24);
	exports.fadeInRightBig = __webpack_require__(25);
	exports.fadeInUp = __webpack_require__(26);
	exports.fadeInUpBig = __webpack_require__(27);
	exports.fadeOut = __webpack_require__(28);
	exports.fadeOutDown = __webpack_require__(29);
	exports.fadeOutDownBig = __webpack_require__(30);
	exports.fadeOutLeft = __webpack_require__(31);
	exports.fadeOutLeftBig = __webpack_require__(32);
	exports.fadeOutRight = __webpack_require__(33);
	exports.fadeOutRightBig = __webpack_require__(34);
	exports.fadeOutUp = __webpack_require__(35);
	exports.fadeOutUpBig = __webpack_require__(36);
	exports.flash = __webpack_require__(37);
	exports.flip = __webpack_require__(38);
	exports.flipInX = __webpack_require__(39);
	exports.flipInY = __webpack_require__(40);
	exports.flipOutX = __webpack_require__(41);
	exports.flipOutY = __webpack_require__(42);
	exports.headShake = __webpack_require__(43);
	exports.hinge = __webpack_require__(44);
	exports.jello = __webpack_require__(45);
	exports.lightSpeedIn = __webpack_require__(46);
	exports.lightSpeedOut = __webpack_require__(47);
	exports.pulse = __webpack_require__(48);
	exports.rollIn = __webpack_require__(49);
	exports.rollOut = __webpack_require__(50);
	exports.rotateIn = __webpack_require__(51);
	exports.rotateInDownLeft = __webpack_require__(52);
	exports.rotateInDownRight = __webpack_require__(53);
	exports.rotateInUpLeft = __webpack_require__(54);
	exports.rotateInUpRight = __webpack_require__(55);
	exports.rotateOut = __webpack_require__(56);
	exports.rotateOutDownLeft = __webpack_require__(57);
	exports.rotateOutDownRight = __webpack_require__(58);
	exports.rotateOutUpLeft = __webpack_require__(59);
	exports.rotateOutUpRight = __webpack_require__(60);
	exports.rubberBand = __webpack_require__(61);
	exports.shake = __webpack_require__(62);
	exports.slideInDown = __webpack_require__(63);
	exports.slideInLeft = __webpack_require__(64);
	exports.slideInRight = __webpack_require__(65);
	exports.slideInUp = __webpack_require__(66);
	exports.slideOutDown = __webpack_require__(67);
	exports.slideOutLeft = __webpack_require__(68);
	exports.slideOutRight = __webpack_require__(69);
	exports.slideOutUp = __webpack_require__(70);
	exports.swing = __webpack_require__(71);
	exports.tada = __webpack_require__(72);
	exports.wobble = __webpack_require__(73);
	exports.zoomIn = __webpack_require__(74);
	exports.zoomInDown = __webpack_require__(75);
	exports.zoomInLeft = __webpack_require__(76);
	exports.zoomInRight = __webpack_require__(77);
	exports.zoomInUp = __webpack_require__(78);
	exports.zoomOut = __webpack_require__(79);
	exports.zoomOutDown = __webpack_require__(80);
	exports.zoomOutLeft = __webpack_require__(81);
	exports.zoomOutRight = __webpack_require__(82);
	exports.zoomOutUp = __webpack_require__(83);


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "translate3d(0, 0, 0)"
			},
			{
				"offset": 0.2,
				"transform": "translate3d(0, 0, 0)"
			},
			{
				"offset": 0.4,
				"transform": "translate3d(0, -30px, 0)"
			},
			{
				"offset": 0.43,
				"transform": "translate3d(0, -30px, 0)"
			},
			{
				"offset": 0.53,
				"transform": "translate3d(0, 0, 0)"
			},
			{
				"offset": 0.7,
				"transform": "translate3d(0, -15px, 0)"
			},
			{
				"offset": 0.8,
				"transform": "translate3d(0, 0, 0)"
			},
			{
				"offset": 0.9,
				"transform": "translate3d(0, -4px, 0)"
			},
			{
				"offset": 1,
				"transform": "translate3d(0, 0, 0)"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both",
			"easing": "easeOutCubic"
		},
		"name": "bounce"
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "scale3d(.3, .3, .3)"
			},
			{
				"transform": "scale3d(1.1, 1.1, 1.1)"
			},
			{
				"transform": "scale3d(.9, .9, .9)"
			},
			{
				"opacity": 1,
				"transform": "scale3d(1.03, 1.03, 1.03)"
			},
			{
				"transform": "scale3d(.97, .97, .97)"
			},
			{
				"opacity": 1,
				"transform": "scale3d(1, 1, 1)"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both",
			"easing": "easeOutCubic"
		},
		"name": "bounceIn"
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"easing": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
				"opacity": 0,
				"transform": "translate3d(0, -3000px, 0)"
			},
			{
				"offset": 0.6,
				"easing": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
				"opacity": 1,
				"transform": "translate3d(0, 25px, 0)"
			},
			{
				"offset": 0.75,
				"easing": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
				"opacity": 1,
				"transform": "translate3d(0, -10px, 0)"
			},
			{
				"offset": 0.9,
				"easing": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
				"opacity": 1,
				"transform": "translate3d(0, 5px, 0)"
			},
			{
				"offset": 1,
				"easing": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both",
			"easing": "easeOutCubic"
		},
		"name": "bounceInDown"
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 0,
				"transform": "translate3d(-3000px, 0, 0)"
			},
			{
				"offset": 0.6,
				"opacity": 1,
				"transform": "translate3d(25px, 0, 0)"
			},
			{
				"offset": 0.75,
				"opacity": 1,
				"transform": "translate3d(-10px, 0, 0)"
			},
			{
				"offset": 0.9,
				"opacity": 1,
				"transform": "translate3d(5px, 0, 0)"
			},
			{
				"offset": 1,
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both",
			"easing": "easeOutCubic"
		},
		"name": "bounceInLeft"
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 0,
				"transform": "translate3d(3000px, 0, 0)"
			},
			{
				"offset": 0.6,
				"opacity": 1,
				"transform": "translate3d(-25px, 0, 0)"
			},
			{
				"offset": 0.75,
				"transform": "translate3d(10px, 0, 0)"
			},
			{
				"offset": 0.9,
				"transform": "translate3d(-5px, 0, 0)"
			},
			{
				"offset": 1,
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both",
			"easing": "easeOutCubic"
		},
		"name": "bounceInRight"
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 0,
				"transform": "translate3d(0, 3000px, 0)"
			},
			{
				"offset": 0.6,
				"opacity": 1,
				"transform": "translate3d(0, -20px, 0)"
			},
			{
				"offset": 0.75,
				"opacity": 1,
				"transform": "translate3d(0, 10px, 0)"
			},
			{
				"offset": 0.9,
				"opacity": 1,
				"transform": "translate3d(0, -5px, 0)"
			},
			{
				"offset": 1,
				"opacity": 1,
				"transform": "translate3d(0, 0, 0)"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both",
			"easing": "easeOutCubic"
		},
		"name": "bounceInUp"
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 1,
				"transform": "none"
			},
			{
				"offset": 0.2,
				"transform": "scale3d(.9, .9, .9)"
			},
			{
				"offset": 0.5,
				"opacity": 1,
				"transform": "scale3d(1.1, 1.1, 1.1)"
			},
			{
				"offset": 0.55,
				"opacity": 1,
				"transform": "scale3d(1.1, 1.1, 1.1)"
			},
			{
				"offset": 1,
				"opacity": 0,
				"transform": "scale3d(.3, .3, .3)"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both"
		},
		"name": "bounceOut"
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 1,
				"transform": "none"
			},
			{
				"offset": 0.2,
				"transform": "translate3d(0, 10px, 0)"
			},
			{
				"offset": 0.4,
				"opacity": 1,
				"transform": "translate3d(0, -20px, 0)"
			},
			{
				"offset": 0.45,
				"opacity": 1,
				"transform": "translate3d(0, -20px, 0)"
			},
			{
				"offset": 1,
				"opacity": 0,
				"transform": "translate3d(0, 2000px, 0)"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both"
		},
		"name": "bounceOutDown"
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 1,
				"transform": "none"
			},
			{
				"offset": 0.2,
				"opacity": 1,
				"transform": "translate3d(20px, 0, 0)"
			},
			{
				"offset": 1,
				"opacity": 0,
				"transform": "translate3d(-2000px, 0, 0)"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both"
		},
		"name": "bounceOutLeft"
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 1,
				"transform": "none"
			},
			{
				"offset": 0.2,
				"opacity": 1,
				"transform": "translate3d(-20px, 0, 0)"
			},
			{
				"offset": 1,
				"opacity": 0,
				"transform": "translate3d(2000px, 0, 0)"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both"
		},
		"name": "bounceOutRight"
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 1,
				"transform": "none"
			},
			{
				"offset": 0.2,
				"opacity": 1,
				"transform": "translate3d(0, -10px, 0)"
			},
			{
				"offset": 0.4,
				"opacity": 1,
				"transform": "translate3d(0, 20px, 0)"
			},
			{
				"offset": 0.45,
				"opacity": 1,
				"transform": "translate3d(0, 20px, 0)"
			},
			{
				"offset": 1,
				"opacity": 0,
				"transform": "translate3d(0, -2000px, 0)"
			}
		],
		"timings": {
			"duration": 900,
			"fill": "both"
		},
		"name": "bounceOutUp"
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0
			},
			{
				"opacity": 1
			}
		],
		"timings": {
			"duration": 650,
			"fill": "both",
			"easing": "ease-in"
		},
		"name": "fadeIn"
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "translate3d(0, -100%, 0)"
			},
			{
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 650,
			"fill": "both"
		},
		"name": "fadeInDown"
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "translate3d(0, -2000px, 0)"
			},
			{
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1300,
			"fill": "both"
		},
		"name": "fadeInDownBig"
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "translate3d(-100%, 0, 0)"
			},
			{
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 650,
			"fill": "both"
		},
		"name": "fadeInLeft"
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "translate3d(-2000px, 0, 0)"
			},
			{
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1300,
			"fill": "both"
		},
		"name": "fadeInLeftBig"
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "translate3d(100%, 0, 0)"
			},
			{
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 650,
			"fill": "both"
		},
		"name": "fadeInRight"
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "translate3d(2000px, 0, 0)"
			},
			{
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1300,
			"fill": "both"
		},
		"name": "fadeInRightBig"
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "translate3d(0, 100%, 0)"
			},
			{
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 650,
			"fill": "both"
		},
		"name": "fadeInUp"
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "translate3d(0, 2000px, 0)"
			},
			{
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1300,
			"fill": "both"
		},
		"name": "fadeInUpBig"
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1
			},
			{
				"opacity": 0
			}
		],
		"timings": {
			"duration": 650,
			"fill": "both"
		},
		"name": "fadeOut"
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1,
				"transform": "none"
			},
			{
				"opacity": 0,
				"transform": "translate3d(0, 100%, 0)"
			}
		],
		"timings": {
			"duration": 650
		},
		"name": "fadeOutDown"
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1,
				"transform": "none"
			},
			{
				"opacity": 0,
				"transform": "translate3d(0, 2000px, 0)"
			}
		],
		"timings": {
			"duration": 1300
		},
		"name": "fadeOutDownBig"
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1,
				"transform": "none"
			},
			{
				"opacity": 0,
				"transform": "translate3d(-100%, 0, 0)"
			}
		],
		"timings": {
			"duration": 650
		},
		"name": "fadeOutLeft"
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1,
				"transform": "none"
			},
			{
				"opacity": 0,
				"transform": "translate3d(-2000px, 0, 0)"
			}
		],
		"timings": {
			"duration": 1300
		},
		"name": "fadeOutLeftBig"
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1,
				"transform": "none"
			},
			{
				"opacity": 0,
				"transform": "translate3d(100%, 0, 0)"
			}
		],
		"timings": {
			"duration": 650
		},
		"name": "fadeOutRight"
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1,
				"transform": "none"
			},
			{
				"opacity": 0,
				"transform": "translate3d(2000px, 0, 0)"
			}
		],
		"timings": {
			"duration": 1300
		},
		"name": "fadeOutRightBig"
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1,
				"transform": "none"
			},
			{
				"opacity": 0,
				"transform": "translate3d(0, -100%, 0)"
			}
		],
		"timings": {
			"duration": 650
		},
		"name": "fadeOutUp"
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1,
				"transform": "none"
			},
			{
				"opacity": 0,
				"transform": "translate3d(0, -2000px, 0)"
			}
		],
		"timings": {
			"duration": 1300
		},
		"name": "fadeOutUpBig"
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1
			},
			{
				"opacity": 0
			},
			{
				"opacity": 1
			},
			{
				"opacity": 0
			},
			{
				"opacity": 1
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "flash"
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "perspective(400px) rotate3d(0, 1, 0, -360deg)"
			},
			{
				"offset": 0.4,
				"transform": "perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)"
			},
			{
				"offset": 0.5,
				"transform": "perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)"
			},
			{
				"offset": 0.8,
				"transform": "perspective(400px) scale3d(.95, .95, .95)"
			},
			{
				"offset": 1,
				"transform": "perspective(400px)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "flip"
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "perspective(400px) rotate3d(1, 0, 0, 90deg)",
				"easing": "ease-in ",
				"opacity": 0
			},
			{
				"offset": 0.4,
				"transform": "perspective(400px) rotate3d(1, 0, 0, -20deg)",
				"easing": "ease-in "
			},
			{
				"offset": 0.6,
				"transform": "perspective(400px) rotate3d(1, 0, 0, 10deg)",
				"opacity": 1
			},
			{
				"offset": 0.8,
				"transform": "perspective(400px) rotate3d(1, 0, 0, -5deg)"
			},
			{
				"offset": 1,
				"opacity": 1,
				"transform": "perspective(400px)"
			}
		],
		"timings": {
			"duration": 750
		},
		"name": "flipInX"
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "perspective(400px) rotate3d(0, 1, 0, 90deg)",
				"opacity": 0
			},
			{
				"offset": 0.4,
				"transform": "perspective(400px) rotate3d(0, 1, 0, -20deg)"
			},
			{
				"offset": 0.6,
				"transform": "perspective(400px) rotate3d(0, 1, 0, 10deg)",
				"opacity": 1
			},
			{
				"offset": 0.8,
				"transform": "perspective(400px) rotate3d(0, 1, 0, -5deg)"
			},
			{
				"offset": 1,
				"transform": "perspective(400px)",
				"opacity": 1
			}
		],
		"timings": {
			"duration": 750
		},
		"name": "flipInY"
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "perspective(400px)",
				"opacity": 1
			},
			{
				"offset": 0.3,
				"transform": "perspective(400px) rotate3d(1, 0, 0, -20deg)",
				"opacity": 1
			},
			{
				"offset": 1,
				"transform": "perspective(400px) rotate3d(1, 0, 0, 90deg)",
				"opacity": 0
			}
		],
		"timings": {
			"duration": 750
		},
		"name": "flipOutX"
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "perspective(400px)",
				"opacity": 1
			},
			{
				"offset": 0.3,
				"transform": "perspective(400px) rotate3d(0, 1, 0, -15deg)",
				"opacity": 1
			},
			{
				"offset": 1,
				"transform": "perspective(400px) rotate3d(0, 1, 0, 90deg)",
				"opacity": 0
			}
		],
		"timings": {
			"duration": 750
		},
		"name": "flipOutY"
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "translateX(0)"
			},
			{
				"offset": 0.065,
				"transform": "translateX(-6px) rotateY(-9deg)"
			},
			{
				"offset": 0.185,
				"transform": "translateX(5px) rotateY(7deg)"
			},
			{
				"offset": 0.315,
				"transform": "translateX(-3px) rotateY(-5deg)"
			},
			{
				"offset": 0.435,
				"transform": "translateX(2px) rotateY(3deg)"
			},
			{
				"offset": 0.5,
				"transform": "translateX(0)"
			},
			{
				"offset": 1,
				"transform": "translateX(0)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "headShake"
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "none",
				"transform-origin": "top left",
				"opacity": 1
			},
			{
				"transform": "rotate3d(0, 0, 1, 80deg)",
				"opacity": 1
			},
			{
				"transform": "rotate3d(0, 0, 1, 60deg)",
				"opacity": 1
			},
			{
				"transform": "rotate3d(0, 0, 1, 80deg)",
				"opacity": 0
			},
			{
				"transform": "rotate3d(0, 0, 1, 60deg)",
				"opacity": 1
			},
			{
				"transform": "translate3d(0, 700px, 0)",
				"transform-origin": "top left",
				"opacity": 0
			}
		],
		"timings": {
			"duration": 2000
		},
		"name": "hinge"
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "none"
			},
			{
				"offset": 0.111,
				"transform": "none"
			},
			{
				"offset": 0.222,
				"transform": "skewX(-12.5deg) skewY(-12.5deg)"
			},
			{
				"offset": 0.333,
				"transform": "skewX(6.25deg) skewY(6.25deg)"
			},
			{
				"offset": 0.444,
				"transform": "skewX(-3.125deg) skewY(-3.125deg)"
			},
			{
				"offset": 0.555,
				"transform": "skewX(1.5625deg) skewY(1.5625deg)"
			},
			{
				"offset": 0.666,
				"transform": "skewX(-0.78125deg) skewY(-0.78125deg)"
			},
			{
				"offset": 0.777,
				"transform": "skewX(0.390625deg) skewY(0.390625deg)"
			},
			{
				"offset": 0.888,
				"transform": "skewX(-0.1953125deg) skewY(-0.1953125deg)"
			},
			{
				"offset": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1000,
			"fill": "both",
			"easing": "ease-in-out"
		},
		"name": "jello"
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "translate3d(100%, 0, 0) skewX(-30deg)",
				"opacity": 0
			},
			{
				"offset": 0.6,
				"transform": "skewX(20deg)",
				"opacity": 1
			},
			{
				"offset": 0.8,
				"transform": "skewX(-5deg)",
				"opacity": 1
			},
			{
				"offset": 1,
				"transform": "none",
				"opacity": 1
			}
		],
		"timings": {
			"duration": 1000,
			"fill": "both",
			"easing": "ease-out"
		},
		"name": "lightSpeedIn"
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "none",
				"opacity": 1
			},
			{
				"transform": "translate3d(100%, 0, 0) skewX(30deg)",
				"opacity": 0
			}
		],
		"timings": {
			"duration": 1000,
			"fill": "both",
			"easing": "ease-in"
		},
		"name": "lightSpeedOut"
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "scale3d(1, 1, 1)"
			},
			{
				"transform": "scale3d(1.05, 1.05, 1.05)"
			},
			{
				"transform": "scale3d(1, 1, 1)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "pulse"
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"
			},
			{
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rollIn"
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1,
				"transform": "none"
			},
			{
				"opacity": 0,
				"transform": "translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rollOut"
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform-origin": "center",
				"transform": "rotate3d(0, 0, 1, -200deg)",
				"opacity": 0
			},
			{
				"transform-origin": "center",
				"transform": "none",
				"opacity": 1
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rotateIn"
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform-origin": "left bottom",
				"transform": "rotate3d(0, 0, 1, -45deg)",
				"opacity": 0
			},
			{
				"transform-origin": "left bottom",
				"transform": "none",
				"opacity": 1
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rotateInDownLeft"
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform-origin": "right bottom",
				"transform": "rotate3d(0, 0, 1, 45deg)",
				"opacity": 0
			},
			{
				"transform-origin": "right bottom",
				"transform": "none",
				"opacity": 1
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rotateInDownRight"
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform-origin": "left bottom",
				"transform": "rotate3d(0, 0, 1, 45deg)",
				"opacity": 0
			},
			{
				"transform-origin": "left bottom",
				"transform": "none",
				"opacity": 1
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rotateInUpLeft"
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform-origin": "right bottom",
				"transform": "rotate3d(0, 0, 1, -90deg)",
				"opacity": 0
			},
			{
				"transform-origin": "right bottom",
				"transform": "none",
				"opacity": 1
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rotateInUpRight"
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform-origin": "center",
				"transform": "none",
				"opacity": 1
			},
			{
				"transform-origin": "center",
				"transform": "rotate3d(0, 0, 1, 200deg)",
				"opacity": 0
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rotateOut"
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform-origin": "left bottom",
				"transform": "none",
				"opacity": 1
			},
			{
				"transform-origin": "left bottom",
				"transform": "rotate3d(0, 0, 1, 45deg)",
				"opacity": 0
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rotateOutDownLeft"
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform-origin": "right bottom",
				"transform": "none",
				"opacity": 1
			},
			{
				"transform-origin": "right bottom",
				"transform": "rotate3d(0, 0, 1, -45deg)",
				"opacity": 0
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rotateOutDownRight"
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform-origin": "left bottom",
				"transform": "none",
				"opacity": 1
			},
			{
				"transform-origin": "left bottom",
				"transform": "rotate3d(0, 0, 1, -45deg)",
				"opacity": 0
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rotateOutUpLeft"
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform-origin": "right bottom",
				"transform": "none",
				"opacity": 1
			},
			{
				"transform-origin": "right bottom",
				"transform": "rotate3d(0, 0, 1, 90deg)",
				"opacity": 0
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rotateOutUpRight"
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "scale3d(1, 1, 1)"
			},
			{
				"offset": 0.3,
				"transform": "scale3d(1.25, 0.75, 1)"
			},
			{
				"offset": 0.4,
				"transform": "scale3d(0.75, 1.25, 1)"
			},
			{
				"offset": 0.5,
				"transform": "scale3d(1.15, 0.85, 1)"
			},
			{
				"offset": 0.65,
				"transform": "scale3d(.95, 1.05, 1)"
			},
			{
				"offset": 0.75,
				"transform": "scale3d(1.05, .95, 1)"
			},
			{
				"offset": 1,
				"transform": "scale3d(1, 1, 1)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "rubberBand"
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "translate3d(0, 0, 0)"
			},
			{
				"transform": "translate3d(-10px, 0, 0)"
			},
			{
				"transform": "translate3d(10px, 0, 0)"
			},
			{
				"transform": "translate3d(-10px, 0, 0)"
			},
			{
				"transform": "translate3d(10px, 0, 0)"
			},
			{
				"transform": "translate3d(-10px, 0, 0)"
			},
			{
				"transform": "translate3d(10px, 0, 0)"
			},
			{
				"transform": "translate3d(-10px, 0, 0)"
			},
			{
				"transform": "translate3d(10px, 0, 0)"
			},
			{
				"transform": "translate3d(-10px, 0, 0)"
			},
			{
				"transform": "translate3d(0, 0, 0)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "shake"
	};

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "translate3d(0, -100%, 0)",
				"visibility": "hidden"
			},
			{
				"transform": "translate3d(0, 0, 0)",
				"visibility": "visible"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "slideInDown"
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "translate3d(-100%, 0, 0)",
				"visibility": "hidden"
			},
			{
				"transform": "translate3d(0, 0, 0)",
				"visibility": "visible"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "slideInLeft"
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "translate3d(100%, 0, 0)",
				"visibility": "hidden"
			},
			{
				"transform": "translate3d(0, 0, 0)",
				"visibility": "visible"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "slideInRight"
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "translate3d(0, 100%, 0)",
				"visibility": "hidden"
			},
			{
				"transform": "translate3d(0, 0, 0)",
				"visibility": "visible"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "slideInUp"
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "translate3d(0, 0, 0)",
				"visibility": "visible"
			},
			{
				"visibility": "hidden",
				"transform": "translate3d(0, 100%, 0)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "slideOutDown"
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"visibility": "visible",
				"transform": "translate3d(0, 0, 0)"
			},
			{
				"visibility": "hidden",
				"transform": "translate3d(-100%, 0, 0)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "slideOutLeft"
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"visibility": "visible",
				"transform": "translate3d(0, 0, 0)"
			},
			{
				"visibility": "hidden",
				"transform": "translate3d(100%, 0, 0)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "slideOutRight"
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"visibility": "visible",
				"transform": "translate3d(0, 0, 0)"
			},
			{
				"visibility": "hidden",
				"transform": "translate3d(0, -100%, 0)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "slideOutUp"
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "none"
			},
			{
				"transform": "rotate3d(0, 0, 1, 15deg)"
			},
			{
				"transform": "rotate3d(0, 0, 1, -10deg)"
			},
			{
				"transform": "rotate3d(0, 0, 1, 5deg)"
			},
			{
				"transform": "rotate3d(0, 0, 1, -5deg)"
			},
			{
				"transform": "rotate3d(0, 0, 1, 0deg)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "swing"
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"transform": "scale3d(1, 1, 1)"
			},
			{
				"transform": "scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)"
			},
			{
				"transform": "scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)"
			},
			{
				"transform": "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"
			},
			{
				"transform": "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"
			},
			{
				"transform": "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"
			},
			{
				"transform": "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"
			},
			{
				"transform": "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"
			},
			{
				"transform": "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"
			},
			{
				"transform": "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"
			},
			{
				"transform": "scale3d(1, 1, 1)"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "tada"
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"transform": "none"
			},
			{
				"offset": 0.15,
				"transform": "translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"
			},
			{
				"offset": 0.3,
				"transform": "translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"
			},
			{
				"offset": 0.45,
				"transform": "translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"
			},
			{
				"offset": 0.6,
				"transform": "translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"
			},
			{
				"offset": 0.75,
				"transform": "translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"
			},
			{
				"offset": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1000
		},
		"name": "wobble"
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 0,
				"transform": "scale3d(.3, .3, .3)"
			},
			{
				"opacity": 1
			},
			{
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1000,
			"easing": "elegantSlowStartEnd"
		},
		"name": "zoomIn"
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 0,
				"transform": "scale3d(.1, .1, .1) translate3d(0, -1000px, 0)"
			},
			{
				"offset": 0.6,
				"opacity": 1,
				"transform": "scale3d(.475, .475, .475) translate3d(0, 60px, 0)"
			},
			{
				"offset": 1,
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1000,
			"easing": "easeInCubic"
		},
		"name": "zoomInDown"
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 0,
				"transform": "scale3d(.1, .1, .1) translate3d(-1000px, 0, 0)"
			},
			{
				"offset": 0.6,
				"opacity": 1,
				"transform": "scale3d(.475, .475, .475) translate3d(10px, 0, 0)"
			},
			{
				"offset": 1,
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1000,
			"easing": "elegantSlowStartEnd"
		},
		"name": "zoomInLeft"
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 0,
				"transform": "scale3d(.1, .1, .1) translate3d(1000px, 0, 0)"
			},
			{
				"offset": 0.6,
				"opacity": 1,
				"transform": "scale3d(.475, .475, .475) translate3d(-10px, 0, 0)"
			},
			{
				"offset": 1,
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1000,
			"easing": "elegantSlowStartEnd"
		},
		"name": "zoomInRight"
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 0,
				"transform": "scale3d(.1, .1, .1) translate3d(0, 1000px, 0)"
			},
			{
				"offset": 0.6,
				"opacity": 1,
				"transform": "scale3d(.475, .475, .475) translate3d(0, -60px, 0)"
			},
			{
				"offset": 1,
				"opacity": 1,
				"transform": "none"
			}
		],
		"timings": {
			"duration": 1000,
			"easing": "elegantSlowStartEnd"
		},
		"name": "zoomInUp"
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"opacity": 1,
				"transform": "none",
				"transform-origin": "center middle"
			},
			{
				"opacity": 0,
				"transform": "scale3d(.3, .3, .3)"
			},
			{
				"opacity": 0,
				"transform": "none",
				"transform-origin": "center middle"
			}
		],
		"timings": {
			"duration": 1000,
			"easing": "elegantSlowStartEnd"
		},
		"name": "zoomOut"
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 1,
				"transform": "none",
				"transform-origin": "center bottom"
			},
			{
				"offset": 0.4,
				"opacity": 1,
				"transform": "scale3d(.475, .475, .475) translate3d(0, -60px, 0)",
				"transform-origin": "center bottom"
			},
			{
				"offset": 1,
				"opacity": 0,
				"transform": "scale3d(.1, .1, .1) translate3d(0, 2000px, 0)",
				"transform-origin": "center bottom"
			}
		],
		"timings": {
			"duration": 1000,
			"easing": "elegantSlowStartEnd"
		},
		"name": "zoomOutDown"
	};

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 1,
				"transform": "none",
				"transform-origin": "left center"
			},
			{
				"offset": 0.4,
				"opacity": 1,
				"transform": "scale3d(.475, .475, .475) translate3d(42px, 0, 0)"
			},
			{
				"offset": 1,
				"opacity": 0,
				"transform": "scale(.1) translate3d(-2000px, 0, 0)",
				"transform-origin": "left center"
			}
		],
		"timings": {
			"duration": 1000,
			"easing": "elegantSlowStartEnd"
		},
		"name": "zoomOutLeft"
	};

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 1,
				"transform": "none",
				"transform-origin": "right center"
			},
			{
				"offset": 0.4,
				"opacity": 1,
				"transform": "scale3d(.475, .475, .475) translate3d(-42px, 0, 0)"
			},
			{
				"offset": 1,
				"opacity": 0,
				"transform": "scale(.1) translate3d(2000px, 0, 0)",
				"transform-origin": "right center"
			}
		],
		"timings": {
			"duration": 1000,
			"easing": "elegantSlowStartEnd"
		},
		"name": "zoomOutRight"
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = {
		"keyframes": [
			{
				"offset": 0,
				"opacity": 1,
				"transform": "none",
				"transform-origin": "center bottom"
			},
			{
				"offset": 0.4,
				"opacity": 1,
				"transform": "scale3d(.475, .475, .475) translate3d(0, 60px, 0)"
			},
			{
				"offset": 1,
				"opacity": 0,
				"transform": "scale3d(.1, .1, .1) translate3d(0, -2000px, 0)",
				"transform-origin": "center bottom"
			}
		],
		"timings": {
			"duration": 1000,
			"easing": "elegantSlowStartEnd"
		},
		"name": "zoomOutUp"
	};

/***/ }
/******/ ]);