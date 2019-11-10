/*!
 * MoveTo - A lightweight, smooth scrolling javascript library without any dependency.
 * Version 1.4.0 (15-03-2017 12:40)
 * Licensed under MIT
 * Copyright 2017 Hasan Aydoğdu <hsnaydd@gmail.com>
 */

'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}
var MoveTo = function () {
  /**
                           * Defaults
                           * @type {Object}
                           */
  var defaults = {
    tolerance: 0,
    duration: 800,
    easing: 'easeOutQuart',
    callback: function callback() {} };


  /**
                                         * easeOutQuart Easing Function
                                         * @param  {Integer} t - current time
                                         * @param  {Integer} b - start value
                                         * @param  {Integer} c - change in value
                                         * @param  {Integer} d - duration
                                         * @return {Integer} - calculated value
                                         */
  function easeOutQuart(t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  }

  /**
     * Returns html element's top and left offset
     * @param  {Node} elem - Element
     * @return {Object} Element top and left offset
     */
  function getOffsetSum(elem) {
    var top = 0;
    var left = 0;
    while (elem) {
      top += parseInt(elem.offsetTop, 10);
      left += parseInt(elem.offsetLeft, 10);
      elem = elem.offsetParent;
    }
    return {
      top: top,
      left: left };

  }

  /**
     * Merge two object
     *
     * @param  {Object} obj1
     * @param  {Object} obj2
     * @return {Object} merged object
     */
  function mergeObject(obj1, obj2) {
    var obj3 = {};
    var propertyName = void 0;
    for (propertyName in obj1) {
      if (obj1.hasOwnProperty(propertyName)) {
        obj3[propertyName] = obj1[propertyName];
      }
    }
    for (propertyName in obj2) {
      if (obj2.hasOwnProperty(propertyName)) {
        obj3[propertyName] = obj2[propertyName];
      }
    }
    return obj3;
  };

  /**
      * Converts camel case to kebab case
      * @param  {string} val the value to be converted
      * @return {String} the converted value
      */
  function kebabCase(val) {
    return val.replace(/([A-Z])/g, function ($1) {
      return '-' + $1.toLowerCase();
    });
  };


  /**
      * Scrolls to an element
      */var
  MoveTo = function () {

    /**
                         * Constructer
                         * @param {Object} options Options
                         * @param {Object} easeFunctions Custom ease functions
                         */
    function MoveTo() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var easeFunctions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};_classCallCheck(this, MoveTo);
      this.options = mergeObject(defaults, options);
      this.easeFunctions = mergeObject({ easeOutQuart: easeOutQuart }, easeFunctions);
    }

    /**
       * Register a dom element as trigger
       * @param  {HTMLElement} dom Dom trigger element
       * @param  {Function} callback Callback function
       */_createClass(MoveTo, [{ key: 'registerTrigger', value: function registerTrigger(
      dom, callback) {var _this = this;
        if (!dom) {
          return;
        }

        var href = dom.getAttribute('href');
        // The element to be scrolled
        var target = href && href !== '#' ?
        document.getElementById(href.substring(1)) :
        0;
        var options = mergeObject(this.options, _getOptionsFromTriggerDom(dom, this.options));

        if (typeof callback === 'function') {
          options.callback = callback;
        }

        dom.addEventListener('click', function (e) {
          e.preventDefault();
          _this.move(target, options);
        });
      }

      /**
         * Move
         * Scrolls to given element by using easeOutQuart function
         * @param  {HTMLElement|Number} target Target element to be scrolled or target position
         * @param  {Object} options Custom options
         */ }, { key: 'move', value: function move(
      target) {var _this2 = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (target !== 0 && !target) {
          return;
        }

        options = mergeObject(this.options, options);

        var to = typeof target === 'number' ? target : getOffsetSum(target).top;
        var from = window.pageYOffset;
        to -= options.tolerance;
        var change = to - from;
        var currentTime = 0;
        var increment = 20;
        var lastPageYOffset = 0;

        /*
                                  * Scroll Animation Function
                                  */
        var animate = function animate() {
          var currentPageYOffset = window.pageYOffset;
          if (lastPageYOffset !== 0) {
            if (
            lastPageYOffset === currentPageYOffset ||
            change > 0 && lastPageYOffset > currentPageYOffset ||
            change < 0 && lastPageYOffset < currentPageYOffset)
            {
              return options.callback(target);
            }
          }
          lastPageYOffset = currentPageYOffset;
          currentTime += increment;
          var val = _this2.easeFunctions[options.easing](
          currentTime, from, change, options.duration);

          window.scroll(0, val);
          if (currentTime < options.duration) {
            setTimeout(animate, increment);
          } else {
            options.callback(target);
          }
        };
        animate();
      }

      /**
         * Adds custom ease function
         * @param {String}   name Ease function name
         * @param {Function} fn   Ease Function
         */ }, { key: 'addEaseFunction', value: function addEaseFunction(
      name, fn) {
        this.easeFunctions[name] = fn;
      } }]);return MoveTo;}();


  /**
                                * Returns options which created from trigger dom element
                                * @param  {HTMLElement} dom Trigger dom element
                                * @param  {Object} options The instance's options
                                * @return {Object} The options which created from trigger dom element
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
  window.moveTo = MoveTo;
}