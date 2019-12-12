(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ScrollTrigger", [], factory);
	else if(typeof exports === 'object')
		exports["ScrollTrigger"] = factory();
	else
		root["ScrollTrigger"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*!
 * object-extend
 * A well-tested function to deep extend (or merge) JavaScript objects without further dependencies.
 *
 * http://github.com/bernhardw
 *
 * Copyright 2013, Bernhard Wanger <mail@bernhardwanger.com>
 * Released under the MIT license.
 *
 * Date: 2013-04-10
 */


/**
 * Extend object a with object b.
 *
 * @param {Object} a Source object.
 * @param {Object} b Object to extend with.
 * @returns {Object} a Extended object.
 */
module.exports = function extend(a, b) {

    // Don't touch 'null' or 'undefined' objects.
    if (a == null || b == null) {
        return a;
    }

    // TODO: Refactor to use for-loop for performance reasons.
    Object.keys(b).forEach(function (key) {

        // Detect object without array, date or null.
        // TODO: Performance test:
        // a) b.constructor === Object.prototype.constructor
        // b) Object.prototype.toString.call(b) == '[object Object]'
        if (Object.prototype.toString.call(b[key]) == '[object Object]') {
            if (Object.prototype.toString.call(a[key]) != '[object Object]') {
                a[key] = b[key];
            } else {
                a[key] = extend(a[key], b[key]);
            }
        } else {
            a[key] = b[key];
        }

    });

    return a;

};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Faster than .forEach
 * @param {(function())} fn The function to call
 */
Array.prototype.each = function (fn) {
  var l = this.length;

  for (var i = 0; i < l; i++) {
    var e = this[i];

    if (e) {
      fn(e, i);
    }
  }
};
/**
 * Give NodeList some Array functions
 */


NodeList.prototype.each = Array.prototype.each;
NodeList.prototype.filter = Array.prototype.filter;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/config/DefaultOptions.js
/**
 * Default options for ScrollTrigger
 */
/* harmony default export */ var DefaultOptions = (function () {
  /**
   * The default options for a trigger
   *
   * @type {
   * {
   *  once: boolean,
   *  offset: {
   *    viewport: {
   *      x: number|(function(frame, direction)),
   *      y: number|(function(frame, direction))
   *    },
   *    element: {
   *      x: number|(function(rect, direction)),
   *      y: number|(function(rect, direction))
   *    }
   *  },
   *  toggle: {
   *    class: {
   *      in: string|string[],
   *      out: string|string[]
   *    },
   *  callback: {
   *    in: {TriggerInCallback},
      *    visible: (function()),
   *    out: (function())
   *  }
   * }
   * }}
   */
  this.trigger = {
    once: false,
    offset: {
      viewport: {
        x: 0,
        y: 0
      },
      element: {
        x: 0,
        y: 0
      }
    },
    toggle: {
      "class": {
        "in": 'visible',
        out: 'invisible'
      },
      callback: {
        "in": null,
        visible: null,
        out: null
      }
    }
  };
  /**
   * The `in` callback is called when the element enters the viewport
   * @callback TriggerInCallback
   * @param {{x: Number, y: Number}} position
   * @param {string} direction
   */

  /**
   * The default options for the scroll behaviour
   * @type {
   * {
   *  sustain: number,
   *  element: Window|HTMLDocument|HTMLElement,
   *  callback: {ScrollCallback},
   *  start: (function()),
   *  stop: (function()),
   *  directionChange: (function(direction: {string}))
   * }
   * }
   */

  this.scroll = {
    sustain: 300,
    element: window,
    callback: function callback() {},
    start: function start() {},
    stop: function stop() {},
    directionChange: function directionChange() {}
  };
  /**
   * The scroll callback is called when the user scrolls
   * @callback ScrollCallback
   * @param {{x: Number, y: Number}} position
   * @param {string} direction
   */
});
// EXTERNAL MODULE: ./node_modules/object-extend/lib/extend.js
var extend = __webpack_require__(0);
var extend_default = /*#__PURE__*/__webpack_require__.n(extend);

// EXTERNAL MODULE: ./src/extensions/Array.js
var extensions_Array = __webpack_require__(1);

// CONCATENATED MODULE: ./src/scripts/Trigger.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

var Trigger_Trigger =
/*#__PURE__*/
function () {
  /**
   * Creates a new Trigger from the given element and options
   *
   * @param {Element|HTMLElement} element
   * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
   */
  function Trigger(element, options) {
    _classCallCheck(this, Trigger);

    this.element = element;
    options = extend_default()(new DefaultOptions().trigger, options);
    this.offset = options.offset;
    this.toggle = options.toggle;
    this.once = options.once;
    this.visible = null;
    this.active = true;
  }
  /**
   * Checks if the Trigger is in the viewport, calls the callbacks and toggles the classes
   * @param {HTMLElement|HTMLDocument|Window} parent
   * @param {string} direction top, bottom, left, right
   * @returns {boolean} If the element is visible
   */


  _createClass(Trigger, [{
    key: "checkVisibility",
    value: function checkVisibility(parent, direction) {
      if (!this.active) {
        return this.visible;
      }

      var parentWidth = parent.offsetWidth || parent.innerWidth || 0;
      var parentHeight = parent.offsetHeight || parent.innerHeight || 0;
      var parentFrame = {
        w: parentWidth,
        h: parentHeight
      };
      var rect = this.getBounds();

      var visible = this._checkVisibility(rect, parentFrame, direction);

      if (visible !== this.visible) {
        this.visible = visible;

        var response = this._toggleCallback();

        if (response instanceof Promise) {
          response.then(this._toggleClass.bind(this))["catch"](function (e) {
            console.error('Trigger promise failed');
            console.error(e);
          });
        } else {
          this._toggleClass();
        }

        if (this.visible && this.once) {
          this.active = false;
        }
      } else if (visible) {
        if (typeof this.toggle.callback.visible == 'function') {
          return this.toggle.callback.visible.call(this.element, this);
        }
      }

      return visible;
    }
    /**
     * Get the bounds of this element
     * @return {ClientRect | DOMRect}
     */

  }, {
    key: "getBounds",
    value: function getBounds() {
      return this.element.getBoundingClientRect();
    }
    /**
     * Get the calculated offset to place on the element
     * @param {ClientRect} rect
     * @param {string} direction top, bottom, left, right
     * @returns {{x: number, y: number}}
     * @private
     */

  }, {
    key: "_getElementOffset",
    value: function _getElementOffset(rect, direction) {
      var offset = {
        x: 0,
        y: 0
      };

      if (typeof this.offset.element.x === 'function') {
        offset.x = rect.width * this.offset.element.x(this, rect, direction);
      } else if (isFloat(this.offset.element.x)) {
        offset.x = rect.width * this.offset.element.x;
      } else if (isInt(this.offset.element.x)) {
        offset.x = this.offset.element.x;
      }

      if (typeof this.offset.element.y === 'function') {
        offset.y = rect.height * this.offset.element.y(this, rect, direction);
      } else if (isFloat(this.offset.element.y)) {
        offset.y = rect.height * this.offset.element.y;
      } else if (isInt(this.offset.element.y)) {
        offset.y = this.offset.element.y;
      }

      return offset;
    }
    /**
     * Get the calculated offset to place on the viewport
     * @param {{w: number, h: number}} parent
     * @param {string} direction top, bottom, left, right
     * @returns {{x: number, y: number}}
     * @private
     */

  }, {
    key: "_getViewportOffset",
    value: function _getViewportOffset(parent, direction) {
      var offset = {
        x: 0,
        y: 0
      };

      if (typeof this.offset.viewport.x === 'function') {
        offset.x = parent.w * this.offset.viewport.x(this, parent, direction);
      } else if (isFloat(this.offset.viewport.x)) {
        offset.x = parent.w * this.offset.viewport.x;
      } else if (isInt(this.offset.viewport.x)) {
        offset.x = this.offset.viewport.x;
      }

      if (typeof this.offset.viewport.y === 'function') {
        offset.y = parent.h * this.offset.viewport.y(this, parent, direction);
      } else if (isFloat(this.offset.viewport.y)) {
        offset.y = parent.h * this.offset.viewport.y;
      } else if (isInt(this.offset.viewport.y)) {
        offset.y = this.offset.viewport.y;
      }

      return offset;
    }
    /**
     * Check the visibility of the trigger in the viewport, with offsets applied
     * @param {ClientRect} rect
     * @param {{w: number, h: number}} parent
     * @param {string} direction top, bottom, left, right
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_checkVisibility",
    value: function _checkVisibility(rect, parent, direction) {
      var elementOffset = this._getElementOffset(rect, direction);

      var viewportOffset = this._getViewportOffset(parent, direction);

      var visible = true;

      if (rect.x - viewportOffset.x < -(rect.width - elementOffset.x)) {
        visible = false;
      }

      if (rect.x + viewportOffset.x > parent.w - elementOffset.x) {
        visible = false;
      }

      if (rect.y - viewportOffset.y < -(rect.height - elementOffset.y)) {
        visible = false;
      }

      if (rect.y + viewportOffset.y > parent.h - elementOffset.y) {
        visible = false;
      }

      return visible;
    }
    /**
     * Toggles the classes
     * @private
     */

  }, {
    key: "_toggleClass",
    value: function _toggleClass() {
      var _this = this;

      if (this.visible) {
        if (Array.isArray(this.toggle["class"]["in"])) {
          this.toggle["class"]["in"].each(function (className) {
            _this.element.classList.add(className);
          });
        } else {
          this.element.classList.add(this.toggle["class"]["in"]);
        }

        if (Array.isArray(this.toggle["class"].out)) {
          this.toggle["class"].out.each(function (className) {
            _this.element.classList.remove(className);
          });
        } else {
          this.element.classList.remove(this.toggle["class"].out);
        }

        return;
      }

      if (Array.isArray(this.toggle["class"]["in"])) {
        this.toggle["class"]["in"].each(function (className) {
          _this.element.classList.remove(className);
        });
      } else {
        this.element.classList.remove(this.toggle["class"]["in"]);
      }

      if (Array.isArray(this.toggle["class"].out)) {
        this.toggle["class"].out.each(function (className) {
          _this.element.classList.add(className);
        });
      } else {
        this.element.classList.add(this.toggle["class"].out);
      }
    }
    /**
     * Toggles the callback
     * @private
     * @return null|Promise
     */

  }, {
    key: "_toggleCallback",
    value: function _toggleCallback() {
      if (this.visible) {
        if (typeof this.toggle.callback["in"] == 'function') {
          return this.toggle.callback["in"].call(this.element, this);
        }
      } else {
        if (typeof this.toggle.callback.out == 'function') {
          return this.toggle.callback.out.call(this.element, this);
        }
      }
    }
  }]);

  return Trigger;
}();


// CONCATENATED MODULE: ./src/scripts/TriggerCollection.js
function TriggerCollection_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TriggerCollection_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function TriggerCollection_createClass(Constructor, protoProps, staticProps) { if (protoProps) TriggerCollection_defineProperties(Constructor.prototype, protoProps); if (staticProps) TriggerCollection_defineProperties(Constructor, staticProps); return Constructor; }




var TriggerCollection_TriggerCollection =
/*#__PURE__*/
function () {
  /**
   * Initializes the collection
   * @param {Trigger[]} [triggers=[]] triggers A set of triggers to init with, optional
   */
  function TriggerCollection(triggers) {
    TriggerCollection_classCallCheck(this, TriggerCollection);

    /**
     * @member {Trigger[]}
     */
    this.triggers = triggers instanceof Array ? triggers : [];
  }
  /**
   * Adds one or multiple Trigger objects
   * @param {Trigger|Trigger[]} objects
   */


  TriggerCollection_createClass(TriggerCollection, [{
    key: "add",
    value: function add(objects) {
      var _this = this;

      if (objects instanceof Trigger_Trigger) {
        // single
        return this.triggers.push(objects);
      }

      objects.each(function (trigger) {
        if (trigger instanceof Trigger_Trigger) {
          _this.triggers.push(trigger);
        } else {
          console.error('Object added to TriggerCollection is not a Trigger. Object: ', trigger);
        }
      });
    }
    /**
     * Removes one or multiple Trigger objects
     * @param {Trigger|Trigger[]} objects
     */

  }, {
    key: "remove",
    value: function remove(objects) {
      if (objects instanceof Trigger_Trigger) {
        objects = [objects];
      }

      this.triggers = this.triggers.filter(function (trigger) {
        var hit = false;
        objects.each(function (object) {
          if (object == trigger) {
            hit = true;
          }
        });
        return !hit;
      });
    }
    /**
     * Lookup one or multiple triggers by a query string
     * @param {string} selector
     * @returns {Trigger[]}
     */

  }, {
    key: "query",
    value: function query(selector) {
      return this.triggers.filter(function (trigger) {
        var element = trigger.element;
        var parent = element.parentNode;
        var nodes = [].slice.call(parent.querySelectorAll(selector));
        return nodes.indexOf(element) > -1;
      });
    }
    /**
     * Lookup one or multiple triggers by a certain HTMLElement or NodeList
     * @param {HTMLElement|HTMLElement[]|NodeList} element
     * @returns {Trigger|Trigger[]|null}
     */

  }, {
    key: "search",
    value: function search(element) {
      var found = this.triggers.filter(function (trigger) {
        if (element instanceof NodeList || Array.isArray(element)) {
          var hit = false;
          element.each(function (el) {
            if (trigger.element == el) {
              hit = true;
            }
          });
          return hit;
        }

        return trigger.element == element;
      });
      return found.length == 0 ? null : found.length > 1 ? found : found[0];
    }
    /**
     * Calls a function on all triggers
     * @param {(function())} callback
     */

  }, {
    key: "call",
    value: function call(callback) {
      this.triggers.each(callback);
    }
  }]);

  return TriggerCollection;
}();


// CONCATENATED MODULE: ./src/scripts/ScrollAnimationLoop.js
function ScrollAnimationLoop_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ScrollAnimationLoop_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ScrollAnimationLoop_createClass(Constructor, protoProps, staticProps) { if (protoProps) ScrollAnimationLoop_defineProperties(Constructor.prototype, protoProps); if (staticProps) ScrollAnimationLoop_defineProperties(Constructor, staticProps); return Constructor; }





var ScrollAnimationLoop_ScrollAnimationLoop =
/*#__PURE__*/
function () {
  /**
   * ScrollAnimationLoop constructor.
   * Starts a requestAnimationFrame loop as long as the user has scrolled the scrollElement. Stops after a certain time.
   *
   * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
   * @param {ScrollCallback} callback [loop=null] The loop callback
   */
  function ScrollAnimationLoop(options, callback) {
    ScrollAnimationLoop_classCallCheck(this, ScrollAnimationLoop);

    this._parseOptions(options);

    if (typeof callback === 'function') {
      this.callback = callback;
    }

    this.direction = 'none';
    this.position = this.getPosition();
    this.lastAction = this._getTimestamp();

    this._startRun();

    this._boundListener = this._didScroll.bind(this);
    this.element.addEventListener('scroll', this._boundListener);
  }
  /**
   * Parses the options
   *
   * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
   * @private
   */


  ScrollAnimationLoop_createClass(ScrollAnimationLoop, [{
    key: "_parseOptions",
    value: function _parseOptions(options) {
      var defaults = new DefaultOptions().scroll;

      if (typeof options != 'function') {
        defaults.callback = function () {};

        defaults = extend_default()(defaults, options);
      } else {
        defaults.callback = options;
      }

      this.element = defaults.element;
      this.sustain = defaults.sustain;
      this.callback = defaults.callback;
      this.startCallback = defaults.start;
      this.stopCallback = defaults.stop;
      this.directionChange = defaults.directionChange;
    }
    /**
     * Callback when the user scrolled the element
     * @private
     */

  }, {
    key: "_didScroll",
    value: function _didScroll() {
      var newPosition = this.getPosition();

      if (this.position !== newPosition) {
        var newDirection = this.direction;

        if (newPosition.x !== this.position.x) {
          newDirection = newPosition.x > this.position.x ? 'right' : 'left';
        } else if (newPosition.y !== this.position.y) {
          newDirection = newPosition.y > this.position.y ? 'bottom' : 'top';
        } else {
          newDirection = 'none';
        }

        if (newDirection !== this.direction) {
          this.direction = newDirection;

          if (typeof this.directionChange === 'function') {
            this.directionChange(this.direction);
          }
        }

        this.position = newPosition;
        this.lastAction = this._getTimestamp();
      } else {
        this.direction = 'none';
      }

      if (!this.running) {
        this._startRun();
      }
    }
    /**
     * Starts the loop, calls the start callback
     * @private
     */

  }, {
    key: "_startRun",
    value: function _startRun() {
      this.running = true;

      if (typeof this.startCallback === 'function') {
        this.startCallback();
      }

      this._loop();
    }
    /**
     * Stops the loop, calls the stop callback
     * @private
     */

  }, {
    key: "_stopRun",
    value: function _stopRun() {
      this.running = false;

      if (typeof this.stopCallback === 'function') {
        this.stopCallback();
      }
    }
    /**
     * The current position of the element
     * @returns {{x: number, y: number}}
     */

  }, {
    key: "getPosition",
    value: function getPosition() {
      var left = this.element.pageXOffset || this.element.scrollLeft || document.documentElement.scrollLeft || 0;
      var top = this.element.pageYOffset || this.element.scrollTop || document.documentElement.scrollTop || 0;
      return {
        x: left,
        y: top
      };
    }
    /**
     * The current timestamp in ms
     * @returns {number}
     * @private
     */

  }, {
    key: "_getTimestamp",
    value: function _getTimestamp() {
      return Number(Date.now());
    }
    /**
     * One single tick of the animation
     * @private
     */

  }, {
    key: "_tick",
    value: function _tick() {
      this.callback(this.position, this.direction);

      var now = this._getTimestamp();

      if (now - this.lastAction > this.sustain) {
        this._stopRun();
      }

      if (this.running) {
        this._loop();
      }
    }
    /**
     * Requests an animation frame
     * @private
     */

  }, {
    key: "_loop",
    value: function _loop() {
      var frame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
        setTimeout(callback, 1000 / 60);
      };

      frame(this._tick.bind(this));
    }
    /**
     * Kills the loop forever
     */

  }, {
    key: "kill",
    value: function kill() {
      this.running = false;
      this.element.removeEventListener('scroll', this._boundListener);
    }
  }]);

  return ScrollAnimationLoop;
}();


// CONCATENATED MODULE: ./src/ScrollTrigger.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Trigger", function() { return ScrollTrigger_Trigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriggerCollection", function() { return ScrollTrigger_TriggerCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollAnimationLoop", function() { return ScrollTrigger_ScrollAnimationLoop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollTrigger_ScrollTrigger; });
function ScrollTrigger_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ScrollTrigger_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ScrollTrigger_createClass(Constructor, protoProps, staticProps) { if (protoProps) ScrollTrigger_defineProperties(Constructor.prototype, protoProps); if (staticProps) ScrollTrigger_defineProperties(Constructor, staticProps); return Constructor; }

/*!
 * ScrollTrigger
 *
 *
 * http://github.com/terwanerik
 *
 * Copyright 2017, Erik Terwan <erik@erikterwan.com>
 * Released under the MIT license.
 *
 * Date: 2017-07-09
 */

/**
 * Created by Erik on 09/07/2017.
 */






var ScrollTrigger_Trigger = Trigger_Trigger;
var ScrollTrigger_TriggerCollection = TriggerCollection_TriggerCollection;
var ScrollTrigger_ScrollAnimationLoop = ScrollAnimationLoop_ScrollAnimationLoop;

var ScrollTrigger_ScrollTrigger =
/*#__PURE__*/
function () {
  /**
   * Constructor for the scroll trigger
   * @param {DefaultOptions} [options=DefaultOptions] options
   */
  function ScrollTrigger(options) {
    ScrollTrigger_classCallCheck(this, ScrollTrigger);

    this._parseOptions(options);

    this._initCollection();

    this._initLoop();
  }
  /**
   * Parses the options
   * @param {DefaultOptions} [options=DefaultOptions] options
   * @private
   */


  ScrollTrigger_createClass(ScrollTrigger, [{
    key: "_parseOptions",
    value: function _parseOptions(options) {
      options = extend_default()(new DefaultOptions(), options);
      this.defaultTrigger = options.trigger;
      this.scrollOptions = options.scroll;
    }
    /**
     * Initializes the collection, picks all [data-scroll] elements as initial elements
     * @private
     */

  }, {
    key: "_initCollection",
    value: function _initCollection() {
      var scrollAttributes = document.querySelectorAll('[data-scroll]');
      var elements = [];

      if (scrollAttributes.length > 0) {
        elements = this.createTriggers(scrollAttributes);
      }

      this.collection = new ScrollTrigger_TriggerCollection(elements);
    }
    /**
     * Initializes the scroll loop
     * @private
     */

  }, {
    key: "_initLoop",
    value: function _initLoop() {
      var _this = this;

      this.loop = new ScrollTrigger_ScrollAnimationLoop({
        sustain: this.scrollOptions.sustain,
        element: this.scrollOptions.element,
        callback: function callback(position, direction) {
          _this._scrollCallback(position, direction);
        },
        start: function start() {
          _this._scrollStart();
        },
        stop: function stop() {
          _this._scrollStop();
        },
        directionChange: function directionChange(direction) {
          _this._scrollDirectionChange(direction);
        }
      });
    }
    /**
     * Callback for checking triggers
     * @param {{x: number, y: number}} position
     * @param {string} direction
     * @private
     */

  }, {
    key: "_scrollCallback",
    value: function _scrollCallback(position, direction) {
      var _this2 = this;

      this.collection.call(function (trigger) {
        trigger.checkVisibility(_this2.scrollOptions.element, direction);
      });
      this.scrollOptions.callback(position, direction);
    }
    /**
     * When the scrolling started
     * @private
     */

  }, {
    key: "_scrollStart",
    value: function _scrollStart() {
      this.scrollOptions.start();
    }
    /**
     * When the scrolling stopped
     * @private
     */

  }, {
    key: "_scrollStop",
    value: function _scrollStop() {
      this.scrollOptions.stop();
    }
    /**
     * When the direction changes
     * @param {string} direction
     * @private
     */

  }, {
    key: "_scrollDirectionChange",
    value: function _scrollDirectionChange(direction) {
      this.scrollOptions.directionChange(direction);
    }
    /**
     * Creates a Trigger object from a given element and optional option set
     * @param {HTMLElement} element
     * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
     * @returns Trigger
     */

  }, {
    key: "createTrigger",
    value: function createTrigger(element, options) {
      return new ScrollTrigger_Trigger(element, extend_default()(this.defaultTrigger, options));
    }
    /**
     * Creates an array of triggers
     * @param {HTMLElement[]|NodeList} elements
     * @param {Object} [options=null] options
     * @returns {Trigger[]} Array of triggers
     */

  }, {
    key: "createTriggers",
    value: function createTriggers(elements, options) {
      var _this3 = this;

      var triggers = [];
      elements.each(function (element) {
        triggers.push(_this3.createTrigger(element, options));
      });
      return triggers;
    }
    /**
     * Adds triggers
     * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
     * @param {Object} [options=null] options
     * @returns {ScrollTrigger}
     */

  }, {
    key: "add",
    value: function add(objects, options) {
      if (objects instanceof HTMLElement) {
        this.collection.add(this.createTrigger(objects, options));
        return this;
      }

      if (objects instanceof ScrollTrigger_Trigger) {
        this.collection.add(objects);
        return this;
      }

      if (objects instanceof NodeList) {
        this.collection.add(this.createTriggers(objects, options));
        return this;
      }

      if (Array.isArray(objects) && objects.length && objects[0] instanceof ScrollTrigger_Trigger) {
        this.collection.add(objects);
        return this;
      }

      if (Array.isArray(objects) && objects.length && objects[0] instanceof HTMLElement) {
        this.collection.add(this.createTriggers(objects, options));
        return this;
      } // assume it's a query string


      this.collection.add(this.createTriggers(document.querySelectorAll(objects), options));
      return this;
    }
    /**
     * Removes triggers
     * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
     * @returns {ScrollTrigger}
     */

  }, {
    key: "remove",
    value: function remove(objects) {
      if (objects instanceof ScrollTrigger_Trigger) {
        this.collection.remove(objects);
        return this;
      }

      if (Array.isArray(objects) && objects.length && objects[0] instanceof ScrollTrigger_Trigger) {
        this.collection.remove(objects);
        return this;
      }

      if (objects instanceof HTMLElement) {
        this.collection.remove(this.search(objects));
        return this;
      }

      if (Array.isArray(objects) && objects.length && objects[0] instanceof HTMLElement) {
        this.collection.remove(this.search(objects));
        return this;
      }

      if (objects instanceof NodeList) {
        this.collection.remove(this.search(objects));
        return this;
      }

      if (Array.isArray(objects) && objects.length && objects[0] instanceof ScrollTrigger_Trigger) {
        this.collection.remove(objects);
        return this;
      } // assume it's a query string


      this.collection.remove(this.query(objects.toString()));
      return this;
    }
    /**
     * Lookup one or multiple triggers by a query string
     * @param {string} selector
     * @returns {Trigger[]}
     */

  }, {
    key: "query",
    value: function query(selector) {
      return this.collection.query(selector);
    }
    /**
     * Lookup one or multiple triggers by a certain HTMLElement or NodeList
     * @param {HTMLElement|HTMLElement[]|NodeList} element
     * @returns {Trigger|Trigger[]|null}
     */

  }, {
    key: "search",
    value: function search(element) {
      return this.collection.search(element);
    }
    /**
     * Reattaches the scroll listener
     */

  }, {
    key: "listen",
    value: function listen() {
      if (this.loop) {
        return;
      }

      this._initLoop();
    }
    /**
     * Kills the scroll listener
     */

  }, {
    key: "kill",
    value: function kill() {
      this.loop.kill();
      this.loop = null;
    }
  }]);

  return ScrollTrigger;
}();



/***/ })
/******/ ]);
});
