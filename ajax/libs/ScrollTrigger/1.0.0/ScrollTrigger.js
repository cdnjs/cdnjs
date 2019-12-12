(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ScrollTrigger", [], factory);
	else if(typeof exports === 'object')
		exports["ScrollTrigger"] = factory();
	else
		root["ScrollTrigger"] = factory();
})(this, function() {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by Erik on 09/07/2017.
 */

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	/**
  * The default options for a trigger
  *
  * @type {
  * {
  *  once: boolean,
  *  offset: {
  *    viewport: {
  *      x: number|(function()),
  *      y: number|(function())
  *    },
  *    element: {
  *      x: number|(function()),
  *      y: number|(function())
  *    }
  *  },
  *  toggle: {
  *    class: {
  *      in: string|string[],
  *      out: string|string[]
  *    },
  *  callback: {
  *    in: (function()),
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
			class: {
				in: 'visible',
				out: 'invisible'
			},
			callback: {
				in: function() {},
				out: function() {}
			}
		}

		/**
   * The default options for the scroll behaviour
   * @type {
   * {
   *  sustain: number,
   *  element: Window|HTMLDocument|HTMLElement,
   *  callback: (function()),
   *  start: (function()),
   *  stop: (function()),
   *  directionChange: (function())
   * }
   * }
   */
	};this.scroll = {
		sustain: 300,
		element: window,
		callback: function() {},
		start: function() {},
		stop: function() {},
		directionChange: function() {}
	};
};

module.exports = exports['default']; /**
                                      * Created by Erik on 11/07/2017.
                                      */

/**
 * Default options for ScrollTrigger
 */

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Erik on 09/07/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _DefaultOptions = __webpack_require__(1);

var _DefaultOptions2 = _interopRequireDefault(_DefaultOptions);

var _objectExtend = __webpack_require__(2);

var _objectExtend2 = _interopRequireDefault(_objectExtend);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isInt(n) {
	return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
	return Number(n) === n && n % 1 !== 0;
}

var Trigger = function () {
	/**
  * Creates a new Trigger from the given element and options
  *
  * @param {Element|HTMLElement} element
  * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
  */
	function Trigger(element, options) {
		_classCallCheck(this, Trigger);

		this.element = element;

		options = (0, _objectExtend2.default)(new _DefaultOptions2.default().trigger, options);

		this.offset = options.offset;
		this.toggle = options.toggle;
		this.once = options.once;
		this.visible = null;
		this.active = true;
	}

	/**
  *
  * @param {HTMLElement|HTMLDocument|Window} parent
  * @param {string} direction top, bottom, left, right
  * @returns {boolean} If the element is visible
  */


	_createClass(Trigger, [{
		key: 'checkVisibility',
		value: function checkVisibility(parent, direction) {
			if (!this.active) {
				return this.visible;
			}

			var parentWidth = parent.offsetWidth || parent.innerWidth || 0;
			var parentHeight = parent.offsetHeight || parent.innerHeight || 0;

			var parentFrame = { w: parentWidth, h: parentHeight };
			var rect = this.element.getBoundingClientRect();

			var visible = false;

			switch (direction) {
				case 'none':
				case 'bottom':
				case 'right':
					visible = this._checkToBottomVisibility(rect, parentFrame) && this._checkToRightVisibility(rect, parentFrame);

					break;
				case 'top':
				case 'left':
					visible = this._checkToTopVisibility(rect, parentFrame) && this._checkToLeftVisibility(rect, parentFrame);

					break;
				default:
					break;
			}

			if (visible != this.visible) {
				this.visible = visible;

				this._toggleClass();
				this._toggleCallback();

				if (this.visible && this.once) {
					this.active = false;
				}
			}

			return visible;
		}

		/**
   * Checks the visibility when the user scrolls to the bottom
   * @param {ClientRect} rect
   * @param {{w:(number),h:(number)}} parent
   * @returns {boolean} If the element is visible
   * @private
   */

	}, {
		key: '_checkToBottomVisibility',
		value: function _checkToBottomVisibility(rect, parent) {
			var height = rect.bottom - rect.top;

			// Set the element offset
			if (typeof this.offset.element.y == 'function') {
				height -= height * this.offset.element.y();
			} else if (isFloat(this.offset.element.y)) {
				height -= height * this.offset.element.y;
			} else if (isInt(this.offset.element.y)) {
				height -= this.offset.element.y;
			}

			// Set the viewport offset
			var offset = 0;

			if (typeof this.offset.viewport.y == 'function') {
				offset = parent.h * this.offset.viewport.y();
			} else if (isFloat(this.offset.viewport.y)) {
				offset = parent.h * this.offset.viewport.y;
			} else if (isInt(this.offset.viewport.y)) {
				offset = this.offset.viewport.y;
			}

			return rect.bottom > 0 && rect.bottom < parent.h + height - offset;
		}

		/**
   * Checks the visibility when the user scrolls to the top
   * @param {ClientRect} rect
   * @param {{w:(number),h:(number)}} parent
   * @returns {boolean} If the element is visible
   * @private
   */

	}, {
		key: '_checkToTopVisibility',
		value: function _checkToTopVisibility(rect, parent) {
			var height = rect.bottom - rect.top;

			// Set the element offset
			if (typeof this.offset.element.y == 'function') {
				height -= height * this.offset.element.y();
			} else if (isFloat(this.offset.element.y)) {
				height -= height * this.offset.element.y;
			} else if (isInt(this.offset.element.y)) {
				height -= this.offset.element.y;
			}

			// Set the viewport offset
			var offset = 0;

			if (typeof this.offset.viewport.y == 'function') {
				offset = parent.h * this.offset.viewport.y();
			} else if (isFloat(this.offset.viewport.y)) {
				offset = parent.h * this.offset.viewport.y;
			} else if (isInt(this.offset.viewport.y)) {
				offset = this.offset.viewport.y;
			}

			return rect.top > -height && rect.top < parent.h + height - offset;
		}

		/**
   * Checks the visibility when the user scrolls to the right
   * @param {ClientRect} rect
   * @param {{w:(number),h:(number)}} parent
   * @returns {boolean} If the element is visible
   * @private
   */

	}, {
		key: '_checkToRightVisibility',
		value: function _checkToRightVisibility(rect, parent) {
			var width = rect.right - rect.left;

			// Set the element offset
			if (typeof this.offset.element.x == 'function') {
				width -= width * this.offset.element.x();
			} else if (isFloat(this.offset.element.x)) {
				width -= width * this.offset.element.x;
			} else if (isInt(this.offset.element.x)) {
				width -= this.offset.element.x;
			}

			// Set the viewport offset
			var offset = 0;

			if (typeof this.offset.viewport.x == 'function') {
				offset = parent.w * this.offset.viewport.x();
			} else if (isFloat(this.offset.viewport.x)) {
				offset = parent.w * this.offset.viewport.x;
			} else if (isInt(this.offset.viewport.x)) {
				offset = this.offset.viewport.x;
			}

			return rect.right > 0 && rect.right < parent.w + width - offset;
		}

		/**
   * Checks the visibility when the user scrolls to the left
   * @param {ClientRect} rect
   * @param {{w:(number),h:(number)}} parent
   * @returns {boolean} If the element is visible
   * @private
   */

	}, {
		key: '_checkToLeftVisibility',
		value: function _checkToLeftVisibility(rect, parent) {
			var width = rect.right - rect.left;

			// Set the element offset
			if (typeof this.offset.element.x == 'function') {
				width -= width * this.offset.element.x();
			} else if (isFloat(this.offset.element.x)) {
				width -= width * this.offset.element.x;
			} else if (isInt(this.offset.element.x)) {
				width -= this.offset.element.x;
			}

			// Set the viewport offset
			var offset = 0;

			if (typeof this.offset.viewport.x == 'function') {
				offset = parent.w * this.offset.viewport.x();
			} else if (isFloat(this.offset.viewport.x)) {
				offset = parent.w * this.offset.viewport.x;
			} else if (isInt(this.offset.viewport.x)) {
				offset = this.offset.viewport.x;
			}

			return rect.left > offset - width && rect.left < parent.w + width;
		}

		/**
   * Toggles the classes
   * @private
   */

	}, {
		key: '_toggleClass',
		value: function _toggleClass() {
			var _this = this;

			if (this.visible) {
				if (Array.isArray(this.toggle.class.in)) {
					this.toggle.class.in.each(function (className) {
						_this.element.classList.add(className);
					});

					this.toggle.class.out.each(function (className) {
						_this.element.classList.remove(className);
					});
				}

				this.element.classList.remove(this.toggle.class.out);

				return this.element.classList.add(this.toggle.class.in);
			}

			if (Array.isArray(this.toggle.class.out)) {
				this.toggle.class.in.each(function (className) {
					_this.element.classList.remove(className);
				});

				this.toggle.class.out.each(function (className) {
					_this.element.classList.add(className);
				});
			}

			this.element.classList.remove(this.toggle.class.in);

			return this.element.classList.add(this.toggle.class.out);
		}

		/**
   * Toggles the callback
   * @private
   */

	}, {
		key: '_toggleCallback',
		value: function _toggleCallback() {
			if (this.visible) {
				if (typeof this.toggle.callback.in == 'function') {
					this.toggle.callback.in.call(this.element, this);
				}
			} else {
				if (typeof this.toggle.callback.out == 'function') {
					this.toggle.callback.out.call(this.element, this);
				}
			}
		}
	}]);

	return Trigger;
}();

exports.default = Trigger;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Erik on 09/07/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _DefaultOptions = __webpack_require__(1);

var _DefaultOptions2 = _interopRequireDefault(_DefaultOptions);

var _objectExtend = __webpack_require__(2);

var _objectExtend2 = _interopRequireDefault(_objectExtend);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollAnimationLoop = function () {
	/**
  * ScrollAnimationLoop constructor.
  * Starts a requestAnimationFrame loop as long as the user has scrolled the scrollElement. Stops after a certain time.
  *
  * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
  * @param {(function())} callback [loop=null] The loop callback
  */
	function ScrollAnimationLoop(options, callback) {
		_classCallCheck(this, ScrollAnimationLoop);

		this._parseOptions(options);

		if (typeof callback == 'function') {
			this.callback = callback;
		}

		this.direction = 'none';
		this.position = this.getPosition();
		this.lastAction = this._getTimestamp();

		this._startRun();

		this.element.addEventListener('scroll', this._didScroll.bind(this));
	}

	/**
  * Parses the options
  *
  * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
  * @private
  */


	_createClass(ScrollAnimationLoop, [{
		key: '_parseOptions',
		value: function _parseOptions(options) {
			var defaults = new _DefaultOptions2.default().scroll;

			if (typeof options != 'function') {
				defaults.callback = function () {};

				options = (0, _objectExtend2.default)(defaults, options);
			} else {
				defaults.callback = options;
			}

			this.element = options.element;
			this.sustain = options.sustain;
			this.callback = options.callback;
			this.startCallback = options.start;
			this.stopCallback = options.stop;
			this.directionChange = options.directionChange;
		}

		/**
   * Callback when the user scrolled the element
   * @private
   */

	}, {
		key: '_didScroll',
		value: function _didScroll() {
			var newPosition = this.getPosition();

			if (this.position != newPosition) {
				var newDirection = this.direction;

				if (newPosition.x != this.position.x) {
					newDirection = newPosition.x > this.position.x ? 'right' : 'left';
				} else if (newPosition.y != this.position.y) {
					newDirection = newPosition.y > this.position.y ? 'bottom' : 'top';
				} else {
					newDirection = 'none';
				}

				if (newDirection != this.direction) {
					this.direction = newDirection;
					this.directionChange(this.direction);
				}

				this.position = newPosition;
				this.lastAction = this._getTimestamp();
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
		key: '_startRun',
		value: function _startRun() {
			this.running = true;
			this.startCallback();
			this._loop();
		}

		/**
   * Stops the loop, calls the stop callback
   * @private
   */

	}, {
		key: '_stopRun',
		value: function _stopRun() {
			this.running = false;
			this.stopCallback();
		}

		/**
   * The current position of the element
   * @returns {{x: number, y: number}}
   */

	}, {
		key: 'getPosition',
		value: function getPosition() {
			var left = this.element.pageXOffset || document.documentElement.scrollLeft || this.element.scrollLeft || 0;
			var top = this.element.pageYOffset || document.documentElement.scrollTop || this.element.scrollTop || 0;

			return { x: left, y: top };
		}

		/**
   * The current timestamp in ms
   * @returns {number}
   * @private
   */

	}, {
		key: '_getTimestamp',
		value: function _getTimestamp() {
			return Number(Date.now());
		}

		/**
   * One single tick of the animation
   * @private
   */

	}, {
		key: '_tick',
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
		key: '_loop',
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
		key: 'kill',
		value: function kill() {
			this.running = false;
			this.element.removeEventListener('scroll', this._didScroll.bind(this));
		}
	}]);

	return ScrollAnimationLoop;
}();

exports.default = ScrollAnimationLoop;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by Erik on 09/07/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Trigger = __webpack_require__(3);

var _Trigger2 = _interopRequireDefault(_Trigger);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TriggerCollection = function () {
	/**
  * Initializes the collection
  * @param {Trigger[]} [triggers=[]] triggers A set of triggers to init with, optional
  */
	function TriggerCollection(triggers) {
		_classCallCheck(this, TriggerCollection);

		/**
   * @member {Trigger[]}
   */
		this.triggers = triggers instanceof Array ? triggers : [];
	}

	/**
  * Adds one or multiple Trigger objects
  * @param {Trigger|Trigger[]} objects
  */


	_createClass(TriggerCollection, [{
		key: 'add',
		value: function add(objects) {
			var _this = this;

			if (objects instanceof _Trigger2.default) {
				// single
				return this.triggers.push(objects);
			}

			objects.each(function (trigger) {
				if (trigger instanceof _Trigger2.default) {
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
		key: 'remove',
		value: function remove(objects) {
			if (objects instanceof _Trigger2.default) {
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
		key: 'query',
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
		key: 'search',
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
		key: 'call',
		value: function call(callback) {
			this.triggers.each(callback);
		}
	}]);

	return TriggerCollection;
}();

exports.default = TriggerCollection;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*!
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


var _DefaultOptions = __webpack_require__(1);

var _DefaultOptions2 = _interopRequireDefault(_DefaultOptions);

var _Trigger = __webpack_require__(3);

var _Trigger2 = _interopRequireDefault(_Trigger);

var _TriggerCollection = __webpack_require__(5);

var _TriggerCollection2 = _interopRequireDefault(_TriggerCollection);

var _ScrollAnimationLoop = __webpack_require__(4);

var _ScrollAnimationLoop2 = _interopRequireDefault(_ScrollAnimationLoop);

var _objectExtend = __webpack_require__(2);

var _objectExtend2 = _interopRequireDefault(_objectExtend);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollTrigger = function () {
	/**
  * Constructor for the scroll trigger
  * @param {DefaultOptions} [options=DefaultOptions] options
  */
	function ScrollTrigger(options) {
		_classCallCheck(this, ScrollTrigger);

		this._parseOptions(options);
		this._initCollection();
		this._initLoop();
	}

	/**
  * Parses the options
  * @param {DefaultOptions} [options=DefaultOptions] options
  * @private
  */


	_createClass(ScrollTrigger, [{
		key: '_parseOptions',
		value: function _parseOptions(options) {
			options = (0, _objectExtend2.default)(new _DefaultOptions2.default(), options);

			this.defaultTrigger = options.trigger;
			this.scrollOptions = options.scroll;
		}

		/**
   * Initializes the collection, picks all [data-scroll] elements as initial elements
   * @private
   */

	}, {
		key: '_initCollection',
		value: function _initCollection() {
			var scrollAttributes = document.querySelectorAll('[data-scroll]');
			var elements = [];

			if (scrollAttributes.length > 0) {
				elements = this.createTriggers(scrollAttributes);
			}

			this.collection = new _TriggerCollection2.default(elements);
		}

		/**
   * Initializes the scroll loop
   * @private
   */

	}, {
		key: '_initLoop',
		value: function _initLoop() {
			var _this = this;

			this.loop = new _ScrollAnimationLoop2.default({
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
		key: '_scrollCallback',
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
		key: '_scrollStart',
		value: function _scrollStart() {
			this.scrollOptions.start();
		}

		/**
   * When the scrolling stopped
   * @private
   */

	}, {
		key: '_scrollStop',
		value: function _scrollStop() {
			this.scrollOptions.stop();
		}

		/**
   * When the direction changes
   * @param {string} direction
   * @private
   */

	}, {
		key: '_scrollDirectionChange',
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
		key: 'createTrigger',
		value: function createTrigger(element, options) {
			return new _Trigger2.default(element, (0, _objectExtend2.default)(this.defaultTrigger, options));
		}

		/**
   * Creates an array of triggers
   * @param {HTMLElement[]|NodeList} elements
   * @param {Object} [options=null] options
   * @returns {Trigger[]} Array of triggers
   */

	}, {
		key: 'createTriggers',
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
   * @returns {ScrollTrigger}
   */

	}, {
		key: 'add',
		value: function add(objects) {
			if (objects instanceof HTMLElement) {
				this.collection.add(this.createTrigger(objects));

				return this;
			}

			if (objects instanceof _Trigger2.default) {
				this.collection.add(objects);

				return this;
			}

			if (objects instanceof NodeList) {
				this.collection.add(this.createTriggers(objects));

				return this;
			}

			if (Array.isArray(objects) && objects.length && objects[0] instanceof _Trigger2.default) {
				this.collection.add(objects);

				return this;
			}

			if (Array.isArray(objects) && objects.length && objects[0] instanceof HTMLElement) {
				this.collection.add(this.createTriggers(objects));

				return this;
			}

			// assume it's a query string
			this.collection.add(this.createTriggers(document.querySelectorAll(objects)));

			return this;
		}

		/**
   * Removes triggers
   * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
   * @returns {ScrollTrigger}
   */

	}, {
		key: 'remove',
		value: function remove(objects) {
			if (objects instanceof _Trigger2.default) {
				this.collection.remove(objects);

				return this;
			}

			if (Array.isArray(objects) && objects.length && objects[0] instanceof _Trigger2.default) {
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

			if (Array.isArray(objects) && objects.length && objects[0] instanceof _Trigger2.default) {
				this.collection.remove(objects);

				return this;
			}

			// assume it's a query string
			this.collection.remove(this.query(objects.toString()));

			return this;
		}

		/**
   * Lookup one or multiple triggers by a query string
   * @param {string} selector
   * @returns {Trigger[]}
   */

	}, {
		key: 'query',
		value: function query(selector) {
			return this.collection.query(selector);
		}

		/**
   * Lookup one or multiple triggers by a certain HTMLElement or NodeList
   * @param {HTMLElement|HTMLElement[]|NodeList} element
   * @returns {Trigger|Trigger[]|null}
   */

	}, {
		key: 'search',
		value: function search(element) {
			return this.collection.search(element);
		}
	}]);

	return ScrollTrigger;
}();

exports.default = ScrollTrigger;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=ScrollTrigger.js.map
