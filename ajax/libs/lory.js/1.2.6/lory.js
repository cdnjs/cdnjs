(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (root['lory'] = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['lory'] = factory();
  }
}(this, function () {

/* globals jQuery */
/* exported lory */

'use strict';

/**
 * Detecting prefixes for saving time and bytes
 */
var transform;
var transition;
var transitionEnd;

(function () {
    var style = document.createElement('_')
        .style;

    var prop;

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
}());

var slice = [].slice;

/**
 * Returns a function that limits input values to range [min <= x <= max].
 * Useful for carousels etc without wrapping around (compare `wrap`).
 * Swapping min and max is allowed and will be corrected.
 *
 * @param  {int} min    The range minimum (optional).
 * @param  {int} max    The range maximum, inclusive.
 * @return {function}   The function that limits its input to the specified range.
 */
var clamp = function (min, max) {
    // Set min to 0 if only one value specified
    if (typeof max === 'undefined') {
        max = min;
        min = 0;
    }

    // Swap min and max if required
    if (min > max) {
        var tmp = min;

        min = max;
        max = tmp;
    }

    return function (value) {
        return Math.min(Math.max(value, min), max);
    };
};

/**
 * merges options and default options together
 *
 * @param  {object} opts            user options object
 * @param  {object} defaultOptions  default options object
 * @return {object} options         merged options object
 */
var mergeOptions = function (opts, defaultOptions) {
    var options = {};

    Object.keys(defaultOptions)
        .map(function (key) {
            if (opts && opts.hasOwnProperty(key)) {
                options[key] = opts[key];
            } else {
                options[key] = defaultOptions[key];
            }
        });

    return options;
};

/**
 * Polyfill for creating CustomEvents on IE9/10/11
 *
 * code pulled from:
 * https://github.com/d4tocchini/customevent-polyfill
 */
try {
    new CustomEvent('test'); // jshint ignore:line
} catch (e) {
    var CustomEvent = function (event, params) {
        var evt;

        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };

        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

        return evt;
    };

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent    = CustomEvent; // expose definition to window
}

/**
 * dispatch custom events
 *
 * @param  {element} el         slideshow element
 * @param  {string}  type       custom event name
 * @param  {object}  detail     custom detail information
 */
function dispatchEvent(el, type, detail) {
    var e = new CustomEvent(type, {
        detail: detail,
        bubbles: true,
        cancelable: true
    });

    el.dispatchEvent(e);
}

var lory = function (slider, opts) {
    var position;
    var slidesWidth;
    var frameWidth;
    var slides;

    var index   = 0;
    var options = {};

    var transitionEndCallback;

    /**
     * if object is jQuery convert to native DOM element
     */
    if (typeof jQuery !== 'undefined' && slider instanceof jQuery) {
        slider = slider[0];
    }

    /**
     * slider DOM elements
     */
    var frame;
    var slideContainer;
    var prevCtrl;
    var nextCtrl;

    var defaults = {
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

    /**
     * setupInfinite: function to setup if infinite is set
     *
     * @param  {array} slideArray
     * @return {array} array of updated slideContainer elements
     */
    var setupInfinite = function (slideArray) {
        var front = slideArray.slice(0, options.infinite);
        var back  = slideArray.slice(slideArray.length - options.infinite, slideArray.length);

        front.forEach(function (element) {
            var cloned = element.cloneNode(true);

            slideContainer.appendChild(cloned);
        });

        back.reverse()
            .forEach(function (element) {
                var cloned = element.cloneNode(true);

                slideContainer.insertBefore(cloned, slideContainer.firstChild);
            });

        slideContainer.addEventListener(transitionEnd, onTransitionEnd);

        return slice.call(slideContainer.children);
    };

    /**
     * public
     * setup function
     */
    var setup = function () {
        dispatchEvent(
            slider,
            'before.lory.init'
        );

        options = mergeOptions(opts, defaults);

        frame          = slider.getElementsByClassName(options.classNameFrame)[0];
        slideContainer = frame.getElementsByClassName(options.classNameSlideContainer)[0];
        prevCtrl       = slider.getElementsByClassName(options.classNamePrevCtrl)[0];
        nextCtrl       = slider.getElementsByClassName(options.classNameNextCtrl)[0];

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

        dispatchEvent(
            slider,
            'after.lory.init'
        );
    };

    /**
     * public
     * reset function: called on resize
     */
    var reset = function () {
        slidesWidth = slideContainer.getBoundingClientRect()
            .width || slideContainer.offsetWidth;
        frameWidth = frame.getBoundingClientRect()
            .width || frame.offsetWidth;

        if (frameWidth === slidesWidth) {
            slidesWidth = slides.reduce(function (previousValue, slide) {
                return previousValue + slide.getBoundingClientRect().width || slide.offsetWidth;
            }, 0);
        }

        index = 0;

        if (options.infinite) {
            translate(slides[index + options.infinite].offsetLeft * -1, 0, null);

            index      = index + options.infinite;
            position.x = slides[index].offsetLeft * -1;
        } else {
            translate(0, options.rewindSpeed, options.ease);
        }
    };

    /**
     * public
     * prev function: called on clickhandler
     */
    var prev = function () {
        slide(false, false);
    };

    /**
     * public
     * next function: called on clickhandler
     */
    var next = function () {
        slide(false, true);
    };

    /**
     * translates to a given position in a given time in milliseconds
     *
     * @to        {number} number in pixels where to translate to
     * @duration  {number} time in milliseconds for the transistion
     * @ease      {string} easing css property
     */
    var translate = function (to, duration, ease) {
        var style = slideContainer && slideContainer.style;

        if (style) {
            style[transition + 'TimingFunction'] = ease;
            style[transition + 'Duration'] = duration + 'ms';
            style[transform] = 'translate3d(' + to + 'px, 0, 0)';
        }
    };

    /**
     * public
     * slidefunction called by prev, next & touchend
     *
     * determine nextIndex and slide to next postion
     * under restrictions of the defined options
     *
     * @direction  {boolean}
     */
    var slide = function (nextIndex, direction) {
        dispatchEvent(
            slider,
            'before.lory.slide', {
                currentSlide: index,
                nextSlide: (direction ? index + 1 : index - 1)
            }
        );

        var maxOffset   = Math.round(slidesWidth - frameWidth);
        var limitIndex  = clamp(0, slides.length - 1);
        var duration    = options.slideSpeed;
        var limitOffset = clamp(maxOffset * -1, 0);

        if (typeof nextIndex !== 'number') {
            if (direction) {
                nextIndex = index + options.slidesToScroll;
            } else {
                nextIndex = index - options.slidesToScroll;
            }
        }

        nextIndex = limitIndex(nextIndex);

        if (options.infinite && direction === undefined) {
            nextIndex += options.infinite;
        }

        var nextOffset = limitOffset(slides[nextIndex].offsetLeft * -1);

        if (options.rewind && Math.abs(position.x) === maxOffset && direction) {
            nextOffset = 0;
            nextIndex  = 0;
            duration   = options.rewindSpeed;
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

        if (options.infinite && Math.abs(nextOffset) === maxOffset && direction) {
            index      = options.infinite;
            position.x = slides[index].offsetLeft * -1;

            transitionEndCallback = function () {
                translate(slides[index].offsetLeft * -1, 0, null);
            };
        }

        if (options.infinite && Math.abs(nextOffset) === 0 && !direction) {
            index      = slides.length - (options.infinite * 2);
            position.x = slides[index].offsetLeft * -1;

            transitionEndCallback = function () {
                translate(slides[index].offsetLeft * -1, 0, null);
            };
        }

        dispatchEvent(
            slider,
            'after.lory.slide', {
                currentSlide: index
            }
        );
    };

    var touchOffset;
    var delta;
    var isScrolling;

    var onTransitionEnd = function () {
        if (transitionEndCallback) {
            transitionEndCallback();

            transitionEndCallback = undefined;
        }
    };

    var onTouchstart = function (event) {
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

        dispatchEvent(
            slider,
            'on.lory.touchstart'
        );
    };

    var onTouchmove = function (event) {
        var touches = event.touches[0];

        delta = {
            x: touches.pageX - touchOffset.x,
            y: touches.pageY - touchOffset.y
        };

        if (typeof isScrolling === 'undefined') {
            isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
        }

        if (!isScrolling) {
            translate(position.x + delta.x, 0, null);
        }

        dispatchEvent(
            slider,
            'on.lory.touchmove'
        );
    };

    var onTouchend = function () {
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
         * -> swipe distance is greater than 25 px
         * or
         * -> swipe distance is more then a third of the swipe area
         *
         * @isValidSlide {Boolean}
         */
        var isValid = Number(duration) < 300 &&
            Math.abs(delta.x) > 25 ||
            Math.abs(delta.x) > frameWidth / 3;

        /**
         * is out of bounds if:
         *
         * -> index is 0 and delta x is greater than 0
         * or
         * -> index is the last slide and delta is smaller than 0
         *
         * @isOutOfBounds {Boolean}
         */
        var isOutOfBounds = !index && delta.x > 0 ||
            index === slides.length - 1 && delta.x < 0;

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

        dispatchEvent(
            slider,
            'on.lory.touchend'
        );
    };

    var onResize = function () {
        dispatchEvent(
            slider,
            'on.lory.resize'
        );
        reset();
    };

    /**
     * public
     * destroy function: called to gracefully destroy the lory instance
     */
    var destroy = function () {
        dispatchEvent(
            slider,
            'on.lory.destroy'
        );

        // remove event listeners
        slideContainer.removeEventListener(transitionEnd, onTransitionEnd);
        slideContainer.removeEventListener('touchstart', onTouchstart);
        window.removeEventListener('resize', onResize);

        if (prevCtrl) {
            prevCtrl.removeEventListener('click', prev);
        }

        if (nextCtrl) {
            nextCtrl.removeEventListener('click', next);
        }
    };

    // trigger initial setup
    setup();

    return {
        slideTo: function (index) {
            slide(index);
        },

        returnIndex: function () {
            return index;
        },

        setup: setup,

        reset: reset,

        prev: prev,

        next: next,

        destroy: destroy
    };
};

return lory;

}));
