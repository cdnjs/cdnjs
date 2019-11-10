/*!
 * MoveTo - A lightweight scroll animation javascript library without any dependency.
 * Version 1.6.1 (12-04-2017 10:18)
 * Licensed under MIT
 * Copyright 2017 Hasan Aydoğdu <hsnaydd@gmail.com>
 */

'use strict';
var MoveTo = function () {
  /**
                           * Defaults
                           * @type {object}
                           */
  var defaults = {
    tolerance: 0,
    duration: 800,
    easing: 'easeOutQuart',
    callback: function callback() {} };


  /**
                                         * easeOutQuart Easing Function
                                         * @param  {number} t - current time
                                         * @param  {number} b - start value
                                         * @param  {number} c - change in value
                                         * @param  {number} d - duration
                                         * @return {number} - calculated value
                                         */
  function easeOutQuart(t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  }

  /**
     * Returns html element's top and left offset
     * @param  {HTMLElement} elem - Element
     * @return {object} Element top and left offset
     */
  function getOffsetSum(elem) {
    var top = 0;
    var left = 0;
    while (elem) {
      top += elem.offsetTop;
      left += elem.offsetLeft;
      elem = elem.offsetParent;
    }
    return {
      top: top, left: left };

  }

  /**
     * Merge two object
     *
     * @param  {object} obj1
     * @param  {object} obj2
     * @return {object} merged object
     */
  function mergeObject(obj1, obj2) {
    var obj3 = {};
    Object.keys(obj1).forEach(function (propertyName) {
      obj3[propertyName] = obj1[propertyName];
    });

    Object.keys(obj2).forEach(function (propertyName) {
      obj3[propertyName] = obj2[propertyName];
    });
    return obj3;
  };

  /**
      * Converts camel case to kebab case
      * @param  {string} val the value to be converted
      * @return {string} the converted value
      */
  function kebabCase(val) {
    return val.replace(/([A-Z])/g, function ($1) {
      return '-' + $1.toLowerCase();
    });
  };

  /**
      * MoveTo Constructor
      * @param {object} options Options
      * @param {object} easeFunctions Custom ease functions
      */
  function MoveTo() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var easeFunctions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.options = mergeObject(defaults, options);
    this.easeFunctions = mergeObject({ easeOutQuart: easeOutQuart }, easeFunctions);
  }

  /**
     * Register a dom element as trigger
     * @param  {HTMLElement} dom Dom trigger element
     * @param  {function} callback Callback function
     * @return {function|void} unregister function
     */
  MoveTo.prototype.registerTrigger = function (dom, callback) {var _this = this;
    if (!dom) {
      return;
    }

    var href = dom.getAttribute('href') || dom.getAttribute('data-target');
    // The element to be scrolled
    var target = href && href !== '#' ?
    document.getElementById(href.substring(1)) :
    0;
    var options = mergeObject(this.options, _getOptionsFromTriggerDom(dom, this.options));

    if (typeof callback === 'function') {
      options.callback = callback;
    }

    var listener = function listener(e) {
      e.preventDefault();
      _this.move(target, options);
    };

    dom.addEventListener('click', listener, false);

    return function () {return dom.removeEventListener('click', listener, false);};
  };

  /**
      * Move
      * Scrolls to given element by using easeOutQuart function
      * @param  {HTMLElement|number} target Target element to be scrolled or target position
      * @param  {object} options Custom options
      */
  MoveTo.prototype.move = function (target) {var _this2 = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (target !== 0 && !target) {
      return;
    }

    options = mergeObject(this.options, options);

    var to = typeof target === 'number' ? target : getOffsetSum(target).top;
    var from = window.pageYOffset;
    to -= options.tolerance;
    var change = to - from;
    var startTime = null;
    var lastPageYOffset = void 0;

    // rAF loop
    var loop = function loop(currentTime) {
      var currentPageYOffset = window.pageYOffset;

      if (!startTime) {
        // To starts time from 1, we subtracted 1 from current time
        // If time starts from 1 The first loop will not do anything,
        // because easing value will be zero
        startTime = currentTime - 1;
      }

      var timeElapsed = currentTime - startTime;

      if (lastPageYOffset) {
        if (
        change > 0 && lastPageYOffset > currentPageYOffset ||
        change < 0 && lastPageYOffset < currentPageYOffset)
        {
          return options.callback(target);
        }
      }
      lastPageYOffset = currentPageYOffset;

      var val = _this2.easeFunctions[options.easing](
      timeElapsed, from, change, options.duration);


      window.scroll(0, val);

      if (timeElapsed < options.duration) {
        window.requestAnimationFrame(loop);
      } else {
        window.scroll(0, to);
        options.callback(target);
      }
    };

    window.requestAnimationFrame(loop);
  };

  /**
      * Adds custom ease function
      * @param {string}   name Ease function name
      * @param {function} fn   Ease function
      */
  MoveTo.prototype.addEaseFunction = function (name, fn) {
    this.easeFunctions[name] = fn;
  };

  /**
      * Returns options which created from trigger dom element
      * @param  {HTMLElement} dom Trigger dom element
      * @param  {object} options The instance's options
      * @return {object} The options which created from trigger dom element
      */
  function _getOptionsFromTriggerDom(dom, options) {
    var domOptions = {};

    Object.keys(options).forEach(function (key) {
      var value = dom.getAttribute('data-mt-' + kebabCase(key));
      if (value) {
        domOptions[key] = isNaN(value) ? value : parseInt(value, 10);
      }
    });
    return domOptions;
  }

  return MoveTo;
}();

if (typeof module !== 'undefined') {
  module.exports = MoveTo;
} else {
  window.MoveTo = MoveTo;
}