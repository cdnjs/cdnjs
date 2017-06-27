(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["lory"] = factory();
	else
		root["lory"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	/* globals jQuery */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = lory;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilsDetectPrefixesJs = __webpack_require__(1);

	var _utilsDetectPrefixesJs2 = _interopRequireDefault(_utilsDetectPrefixesJs);

	var _utilsDispatchEventJs = __webpack_require__(2);

	var _utilsDispatchEventJs2 = _interopRequireDefault(_utilsDispatchEventJs);

	var _defaultsJs = __webpack_require__(4);

	var _defaultsJs2 = _interopRequireDefault(_defaultsJs);

	var slice = Array.prototype.slice;

	function lory(slider, opts) {
	    var position = undefined;
	    var slidesWidth = undefined;
	    var frameWidth = undefined;
	    var slides = undefined;

	    /**
	     * slider DOM elements
	     */
	    var frame = undefined;
	    var slideContainer = undefined;
	    var prevCtrl = undefined;
	    var nextCtrl = undefined;
	    var prefixes = undefined;
	    var transitionEndCallback = undefined;

	    var index = 0;
	    var options = {};

	    /**
	     * if object is jQuery convert to native DOM element
	     */
	    if (typeof jQuery !== 'undefined' && slider instanceof jQuery) {
	        slider = slider[0];
	    }

	    /**
	     * private
	     * setupInfinite: function to setup if infinite is set
	     *
	     * @param  {array} slideArray
	     * @return {array} array of updated slideContainer elements
	     */
	    function setupInfinite(slideArray) {
	        var front = slideArray.slice(0, options.infinite);
	        var back = slideArray.slice(slideArray.length - options.infinite, slideArray.length);

	        front.forEach(function (element) {
	            var cloned = element.cloneNode(true);

	            slideContainer.appendChild(cloned);
	        });

	        back.reverse().forEach(function (element) {
	            var cloned = element.cloneNode(true);

	            slideContainer.insertBefore(cloned, slideContainer.firstChild);
	        });

	        slideContainer.addEventListener(prefixes.transitionEnd, onTransitionEnd);

	        return slice.call(slideContainer.children);
	    }

	    /**
	     * [dispatchSliderEvent description]
	     * @return {[type]} [description]
	     */
	    function dispatchSliderEvent(phase, type, detail) {
	        (0, _utilsDispatchEventJs2['default'])(slider, phase + '.lory.' + type, detail);
	    }

	    /**
	     * translates to a given position in a given time in milliseconds
	     *
	     * @to        {number} number in pixels where to translate to
	     * @duration  {number} time in milliseconds for the transistion
	     * @ease      {string} easing css property
	     */
	    function translate(to, duration, ease) {
	        var style = slideContainer && slideContainer.style;

	        if (style) {
	            style[prefixes.transition + 'TimingFunction'] = ease;
	            style[prefixes.transition + 'Duration'] = duration + 'ms';
	            style[prefixes.transform] = 'translate3d(' + to + 'px, 0, 0)';
	        }
	    }

	    /**
	     * slidefunction called by prev, next & touchend
	     *
	     * determine nextIndex and slide to next postion
	     * under restrictions of the defined options
	     *
	     * @direction  {boolean}
	     */
	    function slide(nextIndex, direction) {
	        var currentSlide = index;
	        var nextSlide = direction ? index + 1 : index - 1;

	        dispatchSliderEvent('before', 'slide', {
	            currentSlide: currentSlide,
	            nextSlide: nextSlide
	        });

	        var maxOffset = Math.round(slidesWidth - frameWidth);
	        var duration = options.slideSpeed;

	        if (typeof nextIndex !== 'number') {
	            if (direction) {
	                nextIndex = index + options.slidesToScroll;
	            } else {
	                nextIndex = index - options.slidesToScroll;
	            }
	        }

	        nextIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);

	        if (options.infinite && direction === undefined) {
	            nextIndex += options.infinite;
	        }

	        var nextOffset = Math.min(Math.max(slides[nextIndex].offsetLeft * -1, maxOffset * -1), 0);

	        if (options.rewind && Math.abs(position.x) === maxOffset && direction) {
	            nextOffset = 0;
	            nextIndex = 0;
	            duration = options.rewindSpeed;
	        }

	        /**
	         * translate to the nextOffset by a defined duration and ease function
	         */
	        translate(nextOffset, duration, options.ease);

	        /**
	         * update the position with the next position
	         */
	        position.x = nextOffset;

	        /**
	         * update the index with the nextIndex only if
	         * the offset of the nextIndex is in the range of the maxOffset
	         */
	        if (slides[nextIndex].offsetLeft <= maxOffset) {
	            index = nextIndex;
	        }

	        if (options.infinite) {
	            if (Math.abs(nextOffset) === maxOffset && direction) {
	                index = options.infinite;
	            }

	            if (Math.abs(nextOffset) === 0 && !direction) {
	                index = slides.length - options.infinite * 2;
	            }

	            position.x = slides[index].offsetLeft * -1;

	            transitionEndCallback = function () {
	                translate(slides[index].offsetLeft * -1, 0, null);
	            };
	        }

	        dispatchSliderEvent('after', 'slide', {
	            currentSlide: index
	        });
	    }

	    /**
	     * public
	     * setup function
	     */
	    function setup() {
	        dispatchSliderEvent('before', 'init');

	        prefixes = (0, _utilsDetectPrefixesJs2['default'])();
	        options = _extends({}, _defaultsJs2['default'], opts);

	        frame = slider.getElementsByClassName(options.classNameFrame)[0];
	        slideContainer = frame.getElementsByClassName(options.classNameSlideContainer)[0];
	        prevCtrl = slider.getElementsByClassName(options.classNamePrevCtrl)[0];
	        nextCtrl = slider.getElementsByClassName(options.classNameNextCtrl)[0];

	        position = {
	            x: slideContainer.offsetLeft,
	            y: slideContainer.offsetTop
	        };

	        if (options.infinite) {
	            slides = setupInfinite(slice.call(slideContainer.children));
	        } else {
	            slides = slice.call(slideContainer.children);
	        }

	        reset();

	        if (prevCtrl && nextCtrl) {
	            prevCtrl.addEventListener('click', prev);
	            nextCtrl.addEventListener('click', next);
	        }

	        slideContainer.addEventListener('touchstart', onTouchstart);

	        window.addEventListener('resize', onResize);

	        dispatchSliderEvent('after', 'init');
	    }

	    /**
	     * public
	     * reset function: called on resize
	     */
	    function reset() {
	        slidesWidth = slideContainer.getBoundingClientRect().width || slideContainer.offsetWidth;
	        frameWidth = frame.getBoundingClientRect().width || frame.offsetWidth;

	        if (frameWidth === slidesWidth) {
	            slidesWidth = slides.reduce(function (previousValue, slide) {
	                return previousValue + slide.getBoundingClientRect().width || slide.offsetWidth;
	            }, 0);
	        }

	        index = 0;

	        if (options.infinite) {
	            translate(slides[index + options.infinite].offsetLeft * -1, 0, null);

	            index = index + options.infinite;
	            position.x = slides[index].offsetLeft * -1;
	        } else {
	            translate(0, options.rewindSpeed, options.ease);
	        }
	    }

	    /**
	     * public
	     * slideTo: called on clickhandler
	     */
	    function slideTo(index) {
	        slide(index);
	    }

	    /**
	     * public
	     * returnIndex function: called on clickhandler
	     */
	    function returnIndex() {
	        return index;
	    }

	    /**
	     * public
	     * prev function: called on clickhandler
	     */
	    function prev() {
	        slide(false, false);
	    }

	    /**
	     * public
	     * next function: called on clickhandler
	     */
	    function next() {
	        slide(false, true);
	    }

	    /**
	     * public
	     * destroy function: called to gracefully destroy the lory instance
	     */
	    function destroy() {
	        dispatchSliderEvent('before', 'destroy');

	        // remove event listeners
	        slideContainer.removeEventListener(prefixes.transitionEnd, onTransitionEnd);
	        slideContainer.removeEventListener('touchstart', onTouchstart);

	        window.removeEventListener('resize', onResize);

	        if (prevCtrl) {
	            prevCtrl.removeEventListener('click', prev);
	        }

	        if (nextCtrl) {
	            nextCtrl.removeEventListener('click', next);
	        }

	        dispatchSliderEvent('after', 'destroy');
	    }

	    // event handling

	    var touchOffset = undefined;
	    var delta = undefined;
	    var isScrolling = undefined;

	    function onTransitionEnd() {
	        if (transitionEndCallback) {
	            transitionEndCallback();

	            transitionEndCallback = undefined;
	        }
	    }

	    function onTouchstart(event) {
	        var touches = event.touches[0];

	        touchOffset = {
	            x: touches.pageX,
	            y: touches.pageY,

	            time: Date.now()
	        };

	        isScrolling = undefined;

	        delta = {};

	        slideContainer.addEventListener('touchmove', onTouchmove);
	        slideContainer.addEventListener('touchend', onTouchend);

	        dispatchSliderEvent('on', 'touchstart', {
	            event: event
	        });
	    }

	    function onTouchmove(event) {
	        var touches = event.touches[0];

	        delta = {
	            x: touches.pageX - touchOffset.x,
	            y: touches.pageY - touchOffset.y
	        };

	        if (typeof isScrolling === 'undefined') {
	            isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
	        }

	        if (!isScrolling) {
	            event.preventDefault();
	            translate(position.x + delta.x, 0, null);
	        }

	        // may be
	        dispatchSliderEvent('on', 'touchmove', {
	            event: event
	        });
	    }

	    function onTouchend(event) {
	        /**
	         * time between touchstart and touchend in milliseconds
	         * @duration {number}
	         */
	        var duration = Date.now() - touchOffset.time;

	        /**
	         * is valid if:
	         *
	         * -> swipe attempt time is over 300 ms
	         * and
	         * -> swipe distance is greater than 25px
	         * or
	         * -> swipe distance is more then a third of the swipe area
	         *
	         * @isValidSlide {Boolean}
	         */
	        var isValid = Number(duration) < 300 && Math.abs(delta.x) > 25 || Math.abs(delta.x) > frameWidth / 3;

	        /**
	         * is out of bounds if:
	         *
	         * -> index is 0 and delta x is greater than 0
	         * or
	         * -> index is the last slide and delta is smaller than 0
	         *
	         * @isOutOfBounds {Boolean}
	         */
	        var isOutOfBounds = !index && delta.x > 0 || index === slides.length - 1 && delta.x < 0;

	        var direction = delta.x < 0;

	        if (!isScrolling) {
	            if (isValid && !isOutOfBounds) {
	                slide(false, direction);
	            } else {
	                translate(position.x, options.snapBackSpeed);
	            }
	        }

	        /**
	         * remove eventlisteners after swipe attempt
	         */
	        frame.removeEventListener('touchmove');
	        frame.removeEventListener('touchend');

	        dispatchSliderEvent('on', 'touchend', {
	            event: event
	        });
	    }

	    function onResize(event) {
	        dispatchSliderEvent('on', 'resize', {
	            event: event
	        });

	        reset();
	    }

	    // trigger initial setup
	    setup();

	    // expose public api
	    return {
	        setup: setup,
	        reset: reset,
	        slideTo: slideTo,
	        returnIndex: returnIndex,
	        prev: prev,
	        next: next,
	        destroy: destroy
	    };
	}

	/* globals $, lory */

	$.fn.lory = function (options) {
	    return this.each(function () {
	        var instanceOptions;

	        if (!$.data(this, 'lory')) {
	            instanceOptions = $.extend({}, options, $(this).data());
	            $.data(this, 'lory', lory(this, instanceOptions));
	        }
	    });
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Detecting prefixes for saving time and bytes
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = detectPrefixes;

	function detectPrefixes() {
	    var transform = undefined;
	    var transition = undefined;
	    var transitionEnd = undefined;

	    (function () {
	        var style = document.createElement('_').style;

	        var prop = undefined;

	        if (style[prop = 'webkitTransition'] === '') {
	            transitionEnd = 'webkitTransitionEnd';
	            transition = prop;
	        }

	        if (style[prop = 'transition'] === '') {
	            transitionEnd = 'transitionend';
	            transition = prop;
	        }

	        if (style[prop = 'webkitTransform'] === '') {
	            transform = prop;
	        }

	        if (style[prop = 'msTransform'] === '') {
	            transform = prop;
	        }

	        if (style[prop = 'transform'] === '') {
	            transform = prop;
	        }
	    })();

	    return {
	        transform: transform,
	        transition: transition,
	        transitionEnd: transitionEnd
	    };
	}

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports['default'] = dispatchEvent;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _customEvent = __webpack_require__(3);

	var _customEvent2 = _interopRequireDefault(_customEvent);

	/**
	 * dispatch custom events
	 *
	 * @param  {element} el         slideshow element
	 * @param  {string}  type       custom event name
	 * @param  {object}  detail     custom detail information
	 */

	function dispatchEvent(target, type, detail) {
	    var event = new _customEvent2['default'](type, {
	        bubbles: true,
	        cancelable: true,
	        detail: detail
	    });

	    target.dispatchEvent(event);
	}

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var NativeCustomEvent = global.CustomEvent;

	function useNative () {
	  try {
	    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
	    return  'cat' === p.type && 'bar' === p.detail.foo;
	  } catch (e) {
	  }
	  return false;
	}

	/**
	 * Cross-browser `CustomEvent` constructor.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
	 *
	 * @public
	 */

	module.exports = useNative() ? NativeCustomEvent :

	// IE >= 9
	'function' === typeof document.createEvent ? function CustomEvent (type, params) {
	  var e = document.createEvent('CustomEvent');
	  if (params) {
	    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
	  } else {
	    e.initCustomEvent(type, false, false, void 0);
	  }
	  return e;
	} :

	// IE <= 8
	function CustomEvent (type, params) {
	  var e = document.createEventObject();
	  e.type = type;
	  if (params) {
	    e.bubbles = Boolean(params.bubbles);
	    e.cancelable = Boolean(params.cancelable);
	    e.detail = params.detail;
	  } else {
	    e.bubbles = false;
	    e.cancelable = false;
	    e.detail = void 0;
	  }
	  return e;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = {
	  /**
	   * slides scrolled at once
	   * @slidesToScroll {Number}
	   */
	  slidesToScroll: 1,

	  /**
	   * time in milliseconds for the animation of a valid slide attempt
	   * @slideSpeed {Number}
	   */
	  slideSpeed: 300,

	  /**
	   * time in milliseconds for the animation of the rewind after the last slide
	   * @rewindSpeed {Number}
	   */
	  rewindSpeed: 600,

	  /**
	   * time for the snapBack of the slider if the slide attempt was not valid
	   * @snapBackSpeed {Number}
	   */
	  snapBackSpeed: 200,

	  /**
	   * Basic easing functions: https://developer.mozilla.org/de/docs/Web/CSS/transition-timing-function
	   * cubic bezier easing functions: http://easings.net/de
	   * @ease {String}
	   */
	  ease: 'ease',

	  /**
	   * if slider reached the last slide, with next click the slider goes back to the startindex.
	   * use infinite or rewind, not both
	   * @rewind {Boolean}
	   */
	  rewind: false,

	  /**
	   * number of visible slides or false
	   * use infinite or rewind, not both
	   * @infinite {number}
	   */
	  infinite: false,

	  /**
	   * class name for slider frame
	   * @classNameFrame {string}
	   */
	  classNameFrame: 'js_frame',

	  /**
	   * class name for slides container
	   * @classNameSlideContainer {string}
	   */
	  classNameSlideContainer: 'js_slides',

	  /**
	  * class name for slider prev control
	   * @classNamePrevCtrl {string}
	   */
	  classNamePrevCtrl: 'js_prev',

	  /**
	  * class name for slider next control
	   * @classNameNextCtrl {string}
	   */
	  classNameNextCtrl: 'js_next'
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;