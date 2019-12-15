(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Draggable", [], factory);
	else if(typeof exports === 'object')
		exports["Draggable"] = factory();
	else
		root["Draggable"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(69);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(70);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(68);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(37);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(37);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * All events fired by draggable inherit this class. You can call `cancel()` to
 * cancel a specific event or you can check if an event has been canceled by
 * calling `canceled()`.
 * @abstract
 * @class
 */
var AbstractEvent = function () {
  function AbstractEvent(data) {
    (0, _classCallCheck3.default)(this, AbstractEvent);

    this._canceled = false;
    this.data = data;
  }

  (0, _createClass3.default)(AbstractEvent, [{
    key: 'cancel',


    /**
     * Cancels a specific event
     * @abstract
     */
    value: function cancel() {
      // We should be declaring if events are cancelable
      // if (!this.cancelable) {
      //   throw new Error('This event is not cancelable');
      // }
      this._canceled = true;
    }

    /**
     * Check if event has been canceled
     * @abstract
     * @return {Boolean}
     */

  }, {
    key: 'canceled',
    value: function canceled() {
      return Boolean(this._canceled);
    }
  }, {
    key: 'type',
    get: function get() {
      return this.constructor.type;
    }
  }, {
    key: 'cancelable',
    get: function get() {
      return this.constructor.cancelable;
    }
  }]);
  return AbstractEvent;
}();

AbstractEvent.type = 'event';
AbstractEvent.cancelable = false;
exports.default = AbstractEvent;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(20)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(14)
  , IE8_DOM_DEFINE = __webpack_require__(41)
  , toPrimitive    = __webpack_require__(34)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(83)
  , defined = __webpack_require__(24);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(8)
  , createDesc = __webpack_require__(22);
module.exports = __webpack_require__(6) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(32)('wks')
  , uid        = __webpack_require__(23)
  , Symbol     = __webpack_require__(5).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closest = closest;
exports.scroll = scroll;
/** @module utils */

function closest(element, selector) {
  if (!element) {
    return null;
  }

  function conditionFn(currentElement) {
    if (!currentElement) {
      return currentElement;
    } else if (typeof selector === 'string') {
      var matchFunction = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
      return matchFunction.call(currentElement, selector);
    } else {
      return selector(currentElement);
    }
  }

  var current = element;

  do {
    current = current.correspondingUseElement || current.correspondingElement || current;
    if (conditionFn(current)) {
      return current;
    }
    current = current.parentNode;
  } while (current !== document.body && current !== document);

  return null;
}

var scrollAnimationFrame = void 0;

function scroll(element, _ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY,
      speed = _ref.speed,
      sensitivity = _ref.sensitivity;

  if (scrollAnimationFrame) {
    cancelAnimationFrame(scrollAnimationFrame);
  }

  function scrollFn() {
    var rect = element.getBoundingClientRect();
    var offsetY = (Math.abs(rect.bottom - clientY) <= sensitivity) - (Math.abs(rect.top - clientY) <= sensitivity);
    var offsetX = (Math.abs(rect.right - clientX) <= sensitivity) - (Math.abs(rect.left - clientX) <= sensitivity);
    element.scrollTop += offsetY * speed;
    element.scrollLeft += offsetX * speed;
    scrollAnimationFrame = requestAnimationFrame(scrollFn);
  }

  scrollAnimationFrame = requestAnimationFrame(scrollFn);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(5)
  , core      = __webpack_require__(10)
  , ctx       = __webpack_require__(39)
  , hide      = __webpack_require__(11)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(13);

var _accessibility = __webpack_require__(53);

var _accessibility2 = _interopRequireDefault(_accessibility);

var _mirror = __webpack_require__(54);

var _mirror2 = _interopRequireDefault(_mirror);

var _collidable = __webpack_require__(51);

var _collidable2 = _interopRequireDefault(_collidable);

var _snappable = __webpack_require__(52);

var _snappable2 = _interopRequireDefault(_snappable);

var _dragSensor = __webpack_require__(64);

var _dragSensor2 = _interopRequireDefault(_dragSensor);

var _mouseSensor = __webpack_require__(66);

var _mouseSensor2 = _interopRequireDefault(_mouseSensor);

var _touchSensor = __webpack_require__(67);

var _touchSensor2 = _interopRequireDefault(_touchSensor);

var _forceTouchSensor = __webpack_require__(65);

var _forceTouchSensor2 = _interopRequireDefault(_forceTouchSensor);

var _draggableEvent = __webpack_require__(57);

var _dragEvent = __webpack_require__(56);

var _mirrorEvent = __webpack_require__(59);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  draggable: '.draggable-source',
  handle: null,
  delay: 0,
  placedTimeout: 800,
  native: false,
  plugins: [_mirror2.default, _accessibility2.default],
  classes: {
    'container:dragging': 'draggable-container--is-dragging',
    'source:dragging': 'draggable-source--is-dragging',
    'source:placed': 'draggable-source--placed',
    'container:placed': 'draggable-container--placed',
    'body:dragging': 'draggable--is-dragging',
    'draggable:over': 'draggable--over',
    'container:over': 'draggable-container--over',
    mirror: 'draggable-mirror'
  }
};

/**
 * This is the core draggable library that does the heavy lifting
 * @module Draggable
 */

var Draggable = function () {
  (0, _createClass3.default)(Draggable, null, [{
    key: 'Plugins',
    get: function get() {
      return { Accessibility: _accessibility2.default, Mirror: _mirror2.default };
    }
  }, {
    key: 'Behaviour',
    get: function get() {
      return { Collidable: _collidable2.default, Snappable: _snappable2.default };
    }

    /**
     * Draggable constructor.
     * @constructs Draggable
     * @param {Array|NodeList} containers - Draggable containers
     * @param {Object} options - Options for draggable
     */

  }]);

  function Draggable() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Draggable);

    this.containers = containers;
    this.options = Object.assign({}, defaults, options);
    this.activeSensors = [];
    this.activePlugins = [];
    this.callbacks = {};
    this.dragging = false;

    this.dragStart = this.dragStart.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragStop = this.dragStop.bind(this);
    this.dragPressure = this.dragPressure.bind(this);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var container = _step.value;

        container.addEventListener('drag:start', this.dragStart, true);
        container.addEventListener('drag:move', this.dragMove, true);
        container.addEventListener('drag:stop', this.dragStop, true);
        container.addEventListener('drag:pressure', this.dragPressure, true);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = this.options.plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var Plugin = _step2.value;

        var plugin = new Plugin(this);
        plugin.attach();
        this.activePlugins.push(plugin);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = this.sensors()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var Sensor = _step3.value;

        var sensor = new Sensor(this.containers, options);
        sensor.attach();
        this.activeSensors.push(sensor);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var draggableInitializedEvent = new _draggableEvent.DraggableInitializedEvent({
      draggable: this
    });

    this.triggerEvent(draggableInitializedEvent);
  }

  /**
   * Destroys Draggable instance. This removes all internal event listeners and
   * deactivates sensors and plugins
   */


  (0, _createClass3.default)(Draggable, [{
    key: 'destroy',
    value: function destroy() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.containers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var container = _step4.value;

          container.removeEventListener('drag:start', this.dragStart, true);
          container.removeEventListener('drag:move', this.dragMove, true);
          container.removeEventListener('drag:stop', this.dragStop, true);
          container.removeEventListener('drag:pressure', this.dragPressure, true);
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var draggableDestroyEvent = new _draggableEvent.DraggableDestroyEvent({
        draggable: this
      });

      this.triggerEvent(draggableDestroyEvent);

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.activePlugins[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var activePlugin = _step5.value;

          activePlugin.detach();
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = this.activeSensors[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var activeSensor = _step6.value;

          activeSensor.detach();
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }

    /**
     * Adds listener for draggable events
     * @example draggable.on('drag:start', (dragEvent) => dragEvent.cancel());
     */

  }, {
    key: 'on',
    value: function on(type, callback) {
      if (!this.callbacks[type]) {
        this.callbacks[type] = [];
      }

      this.callbacks[type].push(callback);
      return this;
    }

    /**
     * Removes listener from draggable
     * @example draggable.off('drag:start', handlerFunction);
     */

  }, {
    key: 'off',
    value: function off(type, callback) {
      if (!this.callbacks[type]) {
        return null;
      }
      var copy = this.callbacks[type].slice(0);
      for (var i = 0; i < copy.length; i++) {
        if (callback === copy[i]) {
          this.callbacks[type].splice(i, 1);
        }
      }
      return this;
    }
  }, {
    key: 'trigger',
    value: function trigger(type) {
      if (!this.callbacks[type]) {
        return;
      }

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var i = this.callbacks[type].length - 1; i >= 0; i--) {
        var callback = this.callbacks[type][i];
        callback.apply(undefined, args);
      }
    }

    /**
     * Active sensors
     * @return {Array} sensors
     */

  }, {
    key: 'sensors',
    value: function sensors() {
      return [_touchSensor2.default, _forceTouchSensor2.default, this.options.native ? _dragSensor2.default : _mouseSensor2.default];
    }
  }, {
    key: 'dragStart',
    value: function dragStart(event) {
      var sensorEvent = getSensorEvent(event);
      var target = sensorEvent.target,
          container = sensorEvent.container,
          originalEvent = sensorEvent.originalEvent;


      if (this.options.handle && target && !(0, _utils.closest)(target, this.options.handle)) {
        sensorEvent.cancel();
        return;
      }

      // Find draggable source element
      this.source = (0, _utils.closest)(target, this.options.draggable);
      this.sourceContainer = container;

      if (!this.source) {
        sensorEvent.cancel();
        return;
      }

      this.dragging = true;

      if (!isDragEvent(originalEvent)) {
        var appendableContainer = this.getAppendableContainer({ source: this.source });
        this.mirror = this.source.cloneNode(true);

        var mirrorCreatedEvent = new _mirrorEvent.MirrorCreatedEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        var mirrorAttachedEvent = new _mirrorEvent.MirrorAttachedEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        this.triggerEvent(mirrorCreatedEvent);
        appendableContainer.appendChild(this.mirror);
        this.triggerEvent(mirrorAttachedEvent);
      }

      this.source.classList.add(this.getClassNameFor('source:dragging'));
      this.sourceContainer.classList.add(this.getClassNameFor('container:dragging'));
      document.body.classList.add(this.getClassNameFor('body:dragging'));

      if (this.mirror) {
        var mirrorMoveEvent = new _mirrorEvent.MirrorMoveEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        this.triggerEvent(mirrorMoveEvent);
      }

      // Find the closest scrollable parent
      this.scrollableParent = (0, _utils.closest)(container, function (element) {
        return element.offsetHeight < element.scrollHeight;
      });

      var dragEvent = new _dragEvent.DragStartEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: container,
        sensorEvent: sensorEvent
      });

      this.triggerEvent(dragEvent);

      if (!dragEvent.canceled()) {
        return;
      }

      if (this.mirror) {
        this.mirror.parentNode.removeChild(this.mirror);
      }

      this.source.classList.remove(this.getClassNameFor('source:dragging'));
      this.sourceContainer.classList.remove(this.getClassNameFor('container:dragging'));
      document.body.classList.remove(this.getClassNameFor('body:dragging'));
    }
  }, {
    key: 'triggerEvent',
    value: function triggerEvent(event) {
      return this.trigger(event.type, event);
    }
  }, {
    key: 'dragMove',
    value: function dragMove(event) {
      var sensorEvent = getSensorEvent(event);
      var container = sensorEvent.container;

      var target = sensorEvent.target;

      var dragMoveEvent = new _dragEvent.DragMoveEvent({
        source: this.source,
        mirror: this.mirror,
        sourceContainer: container,
        sensorEvent: sensorEvent
      });

      this.triggerEvent(dragMoveEvent);

      if (dragMoveEvent.canceled()) {
        sensorEvent.cancel();
      }

      if (this.mirror && !dragMoveEvent.canceled()) {
        var mirrorMoveEvent = new _mirrorEvent.MirrorMoveEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent
        });

        this.triggerEvent(mirrorMoveEvent);
      }

      target = (0, _utils.closest)(target, this.options.draggable);
      var overContainer = sensorEvent.overContainer || this.closestContainer(sensorEvent.target);
      var isLeavingContainer = this.currentOverContainer && overContainer !== this.currentOverContainer;
      var isLeavingDraggable = this.currentOver && target !== this.currentOver;
      var isOverContainer = overContainer && this.currentOverContainer !== overContainer;
      var isOverDraggable = target && this.currentOver !== target;

      if (isLeavingDraggable) {
        var dragOutEvent = new _dragEvent.DragOutEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          over: this.currentOver
        });

        this.triggerEvent(dragOutEvent);

        this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
        this.currentOver = null;
      }

      if (isLeavingContainer) {
        var dragOutContainerEvent = new _dragEvent.DragOutContainerEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          overContainer: this.overContainer
        });

        this.triggerEvent(dragOutContainerEvent);

        this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
        this.currentOverContainer = null;
      }

      if (isOverContainer) {
        overContainer.classList.add(this.getClassNameFor('container:over'));

        var dragOverContainerEvent = new _dragEvent.DragOverContainerEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          overContainer: overContainer
        });

        this.triggerEvent(dragOverContainerEvent);

        this.currentOverContainer = overContainer;
      }

      if (isOverDraggable) {
        target.classList.add(this.getClassNameFor('draggable:over'));

        var dragOverEvent = new _dragEvent.DragOverEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: container,
          sensorEvent: sensorEvent,
          overContainer: overContainer,
          over: target
        });

        this.triggerEvent(dragOverEvent);

        this.currentOver = target;
      }
    }
  }, {
    key: 'dragStop',
    value: function dragStop(event) {
      var _this = this;

      this.dragging = false;

      var sensorEvent = getSensorEvent(event);
      var dragStopEvent = new _dragEvent.DragStopEvent({
        source: this.source,
        mirror: this.mirror,
        sensorEvent: event.sensorEvent,
        sourceContainer: this.sourceContainer
      });

      this.triggerEvent(dragStopEvent);

      this.source.classList.remove(this.getClassNameFor('source:dragging'));
      this.source.classList.add(this.getClassNameFor('source:placed'));
      this.sourceContainer.classList.add(this.getClassNameFor('container:placed'));
      this.sourceContainer.classList.remove(this.getClassNameFor('container:dragging'));
      document.body.classList.remove(this.getClassNameFor('body:dragging'));

      if (this.currentOver) {
        this.currentOver.classList.remove(this.getClassNameFor('draggable:over'));
      }

      if (this.currentOverContainer) {
        this.currentOverContainer.classList.remove(this.getClassNameFor('container:over'));
      }

      if (this.mirror) {
        var mirrorDestroyEvent = new _mirrorEvent.MirrorDestroyEvent({
          source: this.source,
          mirror: this.mirror,
          sourceContainer: sensorEvent.container,
          sensorEvent: sensorEvent
        });

        this.triggerEvent(mirrorDestroyEvent);

        if (!mirrorDestroyEvent.canceled()) {
          this.mirror.parentNode.removeChild(this.mirror);
        }
      }

      var lastSource = this.source;
      var lastSourceContainer = this.sourceContainer;

      setTimeout(function () {
        if (lastSource) {
          lastSource.classList.remove(_this.getClassNameFor('source:placed'));
        }

        if (lastSourceContainer) {
          lastSourceContainer.classList.remove(_this.getClassNameFor('container:placed'));
        }
      }, this.options.placedTimeout);

      this.source = null;
      this.mirror = null;
      this.currentOverContainer = null;
      this.currentOver = null;
      this.sourceContainer = null;
    }
  }, {
    key: 'dragPressure',
    value: function dragPressure(event) {
      var sensorEvent = getSensorEvent(event);
      var source = this.source || (0, _utils.closest)(sensorEvent.originalEvent.target, this.options.draggable);

      var dragPressureEvent = new _dragEvent.DragPressureEvent({
        sensorEvent: sensorEvent,
        source: source,
        pressure: sensorEvent.pressure
      });

      this.triggerEvent(dragPressureEvent);
    }
  }, {
    key: 'getAppendableContainer',
    value: function getAppendableContainer(_ref) {
      var source = _ref.source;

      var appendTo = this.options.appendTo;

      if (typeof appendTo === 'string') {
        return document.querySelector(appendTo);
      } else if (appendTo instanceof HTMLElement) {
        return appendTo;
      } else if (typeof appendTo === 'function') {
        return appendTo(source);
      } else {
        return document.body;
      }
    }
  }, {
    key: 'getClassNameFor',
    value: function getClassNameFor(name) {
      return this.options.classes[name] || defaults.classes[name];
    }
  }, {
    key: 'closestContainer',
    value: function closestContainer(target) {
      var _this2 = this;

      return (0, _utils.closest)(target, function (element) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = _this2.containers[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var containerEl = _step7.value;

            if (element === containerEl) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        return false;
      });
    }
  }]);
  return Draggable;
}();

exports.default = Draggable;


function getSensorEvent(event) {
  return event.detail;
}

function isDragEvent(event) {
  return (/^drag/.test(event.type)
  );
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragPressureSensorEvent = exports.DragStopSensorEvent = exports.DragMoveSensorEvent = exports.DragStartSensorEvent = exports.SensorEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _abstractEvent = __webpack_require__(4);

var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SensorEvent = exports.SensorEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(SensorEvent, _AbstractEvent);

  function SensorEvent() {
    (0, _classCallCheck3.default)(this, SensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SensorEvent.__proto__ || Object.getPrototypeOf(SensorEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SensorEvent, [{
    key: 'originalEvent',
    get: function get() {
      return this.data.originalEvent;
    }
  }, {
    key: 'clientX',
    get: function get() {
      return this.data.clientX;
    }
  }, {
    key: 'clientY',
    get: function get() {
      return this.data.clientY;
    }
  }, {
    key: 'target',
    get: function get() {
      return this.data.target;
    }
  }, {
    key: 'container',
    get: function get() {
      return this.data.container;
    }
  }, {
    key: 'overContainer',
    get: function get() {
      return this.data.overContainer;
    }
  }, {
    key: 'pressure',
    get: function get() {
      return this.data.pressure;
    }
  }]);
  return SensorEvent;
}(_abstractEvent2.default);

var DragStartSensorEvent = exports.DragStartSensorEvent = function (_SensorEvent) {
  (0, _inherits3.default)(DragStartSensorEvent, _SensorEvent);

  function DragStartSensorEvent() {
    (0, _classCallCheck3.default)(this, DragStartSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStartSensorEvent.__proto__ || Object.getPrototypeOf(DragStartSensorEvent)).apply(this, arguments));
  }

  return DragStartSensorEvent;
}(SensorEvent);

DragStartSensorEvent.type = 'drag:start';

var DragMoveSensorEvent = exports.DragMoveSensorEvent = function (_SensorEvent2) {
  (0, _inherits3.default)(DragMoveSensorEvent, _SensorEvent2);

  function DragMoveSensorEvent() {
    (0, _classCallCheck3.default)(this, DragMoveSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragMoveSensorEvent.__proto__ || Object.getPrototypeOf(DragMoveSensorEvent)).apply(this, arguments));
  }

  return DragMoveSensorEvent;
}(SensorEvent);

DragMoveSensorEvent.type = 'drag:move';

var DragStopSensorEvent = exports.DragStopSensorEvent = function (_SensorEvent3) {
  (0, _inherits3.default)(DragStopSensorEvent, _SensorEvent3);

  function DragStopSensorEvent() {
    (0, _classCallCheck3.default)(this, DragStopSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStopSensorEvent.__proto__ || Object.getPrototypeOf(DragStopSensorEvent)).apply(this, arguments));
  }

  return DragStopSensorEvent;
}(SensorEvent);

DragStopSensorEvent.type = 'drag:stop';

var DragPressureSensorEvent = exports.DragPressureSensorEvent = function (_SensorEvent4) {
  (0, _inherits3.default)(DragPressureSensorEvent, _SensorEvent4);

  function DragPressureSensorEvent() {
    (0, _classCallCheck3.default)(this, DragPressureSensorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragPressureSensorEvent.__proto__ || Object.getPrototypeOf(DragPressureSensorEvent)).apply(this, arguments));
  }

  return DragPressureSensorEvent;
}(SensorEvent);

DragPressureSensorEvent.type = 'drag:pressure';

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sensor = function () {
  function Sensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Sensor);

    this.containers = containers;
    this.options = options;
  }

  (0, _createClass3.default)(Sensor, [{
    key: 'attach',
    value: function attach() {
      return this;
    }
  }, {
    key: 'detach',
    value: function detach() {
      return this;
    }
  }, {
    key: 'trigger',
    value: function trigger(element, sensorEvent) {
      var event = document.createEvent('Event');
      event.detail = sensorEvent;
      event.initEvent(sensorEvent.type, true, true);
      element.dispatchEvent(event);
      this.lastEvent = sensorEvent;
      return sensorEvent;
    }
  }]);
  return Sensor;
}();

exports.default = Sensor;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(46)
  , enumBugKeys = __webpack_require__(25);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(14)
  , dPs         = __webpack_require__(89)
  , enumBugKeys = __webpack_require__(25)
  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(40)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(82).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f
  , has = __webpack_require__(7)
  , TAG = __webpack_require__(12)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(32)('keys')
  , uid    = __webpack_require__(23);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(5)
  , core           = __webpack_require__(10)
  , LIBRARY        = __webpack_require__(27)
  , wksExt         = __webpack_require__(36)
  , defineProperty = __webpack_require__(8).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(12);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(72);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(71);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(78);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16)
  , document = __webpack_require__(5).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(20)(function(){
  return Object.defineProperty(__webpack_require__(40)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(27)
  , $export        = __webpack_require__(15)
  , redefine       = __webpack_require__(47)
  , hide           = __webpack_require__(11)
  , has            = __webpack_require__(7)
  , Iterators      = __webpack_require__(26)
  , $iterCreate    = __webpack_require__(85)
  , setToStringTag = __webpack_require__(30)
  , getPrototypeOf = __webpack_require__(91)
  , ITERATOR       = __webpack_require__(12)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(29)
  , createDesc     = __webpack_require__(22)
  , toIObject      = __webpack_require__(9)
  , toPrimitive    = __webpack_require__(34)
  , has            = __webpack_require__(7)
  , IE8_DOM_DEFINE = __webpack_require__(41)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(46)
  , hiddenKeys = __webpack_require__(25).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(7)
  , toIObject    = __webpack_require__(9)
  , arrayIndexOf = __webpack_require__(80)(false)
  , IE_PROTO     = __webpack_require__(31)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _draggable = __webpack_require__(17);

var _draggable2 = _interopRequireDefault(_draggable);

var _utils = __webpack_require__(13);

var _droppableEvent = __webpack_require__(58);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classes = {
  'droppable:active': 'draggable-droppable--active',
  'droppable:occupied': 'draggable-droppable--occupied'
};

var Droppable = function () {
  function Droppable() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Droppable);

    this.draggable = new _draggable2.default(containers, options);
    this.options = Object.assign({}, options);

    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragStop = this._onDragStop.bind(this);

    this.draggable.on('drag:start', this._onDragStart).on('drag:move', this._onDragMove).on('drag:stop', this._onDragStop);
  }

  (0, _createClass3.default)(Droppable, [{
    key: 'destroy',
    value: function destroy() {
      this.draggable.off('drag:start', this._onDragStart).off('drag:move', this._onDragMove).off('drag:stop', this._onDragStop).destroy();
    }
  }, {
    key: 'on',
    value: function on(type, callback) {
      this.draggable.on(type, callback);
      return this;
    }
  }, {
    key: 'off',
    value: function off(type, callback) {
      this.draggable.off(type, callback);
      return this;
    }
  }, {
    key: 'getClassNameFor',
    value: function getClassNameFor(name) {
      return this.options.classes[name] || classes[name];
    }
  }, {
    key: '_onDragStart',
    value: function _onDragStart(event) {
      if (event.canceled()) {
        return;
      }

      this.droppables = this._getDroppables();
      var droppable = event.sensorEvent.target.closest(this.options.droppable);

      if (!droppable) {
        event.cancel();
        return;
      }

      this.initialDroppable = droppable;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.droppables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var droppableElement = _step.value;

          if (droppableElement.classList.contains(this.getClassNameFor('droppable:occupied'))) {
            continue;
          }

          droppableElement.classList.add(this.getClassNameFor('droppable:active'));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: '_onDragMove',
    value: function _onDragMove(event) {
      if (event.canceled()) {
        return;
      }

      var droppable = this._closestDroppable(event.sensorEvent.target);
      var overEmptyDroppable = droppable && !droppable.classList.contains(this.getClassNameFor('droppable:occupied'));

      if (overEmptyDroppable && this._drop(event, droppable)) {
        this.lastDroppable = droppable;
      } else if ((!droppable || droppable === this.initialDroppable) && this.lastDroppable) {
        this._release(event);
        this.lastDroppable = null;
      }
    }
  }, {
    key: '_onDragStop',
    value: function _onDragStop() {
      var occupiedClass = this.getClassNameFor('droppable:occupied');

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.droppables[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var droppable = _step2.value;

          droppable.classList.remove(this.getClassNameFor('droppable:active'));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (this.lastDroppable && this.lastDroppable !== this.initialDroppable) {
        this.initialDroppable.classList.remove(occupiedClass);
      }

      this.droppables = null;
      this.lastDroppable = null;
      this.initialDroppable = null;
    }
  }, {
    key: '_drop',
    value: function _drop(event, droppable) {
      var droppableOverEvent = new _droppableEvent.DroppableOverEvent({
        dragEvent: event,
        droppable: droppable
      });

      this.draggable.triggerEvent(droppableOverEvent);

      if (droppableOverEvent.canceled()) {
        return false;
      }

      var occupiedClass = this.getClassNameFor('droppable:occupied');

      if (this.lastDroppable) {
        this.lastDroppable.classList.remove(occupiedClass);
      }

      droppable.appendChild(event.source);
      droppable.classList.add(occupiedClass);

      return true;
    }
  }, {
    key: '_release',
    value: function _release(event) {
      var droppableOutEvent = new _droppableEvent.DroppableOutEvent({
        dragEvent: event,
        droppable: this.lastDroppable
      });

      this.draggable.triggerEvent(droppableOutEvent);

      if (droppableOutEvent.canceled()) {
        return;
      }

      this.initialDroppable.appendChild(event.source);
      this.lastDroppable.classList.remove(this.getClassNameFor('droppable:occupied'));
    }
  }, {
    key: '_closestDroppable',
    value: function _closestDroppable(target) {
      var _this = this;

      if (!this.droppables) {
        return null;
      }

      return (0, _utils.closest)(target, function (element) {
        return Array.from(_this.droppables).includes(element);
      });
    }
  }, {
    key: '_getDroppables',
    value: function _getDroppables() {
      var droppables = this.options.droppable;

      if (typeof droppables === 'string') {
        return document.querySelectorAll(droppables);
      } else if (droppables instanceof NodeList || droppables instanceof Array) {
        return droppables;
      } else if (typeof droppables === 'function') {
        return droppables();
      } else {
        return [];
      }
    }
  }]);
  return Droppable;
}();

exports.default = Droppable;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _draggable = __webpack_require__(17);

var _draggable2 = _interopRequireDefault(_draggable);

var _sortableEvent = __webpack_require__(61);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sortable = function () {
  function Sortable() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Sortable);

    this.draggable = new _draggable2.default(containers, options);

    this._onDragStart = this._onDragStart.bind(this);
    this._onDragOverContainer = this._onDragOverContainer.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragStop = this._onDragStop.bind(this);

    this.draggable.on('drag:start', this._onDragStart).on('drag:over:container', this._onDragOverContainer).on('drag:over', this._onDragOver).on('drag:stop', this._onDragStop);
  }

  (0, _createClass3.default)(Sortable, [{
    key: 'destroy',
    value: function destroy() {
      this.draggable.off('drag:start', this._onDragStart).off('drag:over:container', this._onDragOverContainer).off('drag:over', this._onDragOver).off('drag:stop', this._onDragStop).destroy();
    }
  }, {
    key: 'on',
    value: function on(type, callback) {
      this.draggable.on(type, callback);
      return this;
    }
  }, {
    key: 'off',
    value: function off(type, callback) {
      this.draggable.off(type, callback);
      return this;
    }
  }, {
    key: '_onDragStart',
    value: function _onDragStart(event) {
      this.startIndex = index(event.source);

      var sortableStartEvent = new _sortableEvent.SortableStartEvent({
        dragEvent: event,
        startIndex: this.startIndex
      });

      this.draggable.trigger(sortableStartEvent);

      if (sortableStartEvent.canceled()) {
        event.cancel();
      }
    }
  }, {
    key: '_onDragOverContainer',
    value: function _onDragOverContainer(event) {
      if (event.canceled()) {
        return;
      }

      var moves = move(event.source, event.over, event.overContainer);

      if (!moves) {
        return;
      }

      var sortableSortedEvent = new _sortableEvent.SortableSortedEvent({
        dragEvent: event,
        moves: moves
      });

      this.draggable.triggerEvent(sortableSortedEvent);
    }
  }, {
    key: '_onDragOver',
    value: function _onDragOver(event) {
      if (event.over === event.source) {
        return;
      }

      var moves = move(event.source, event.over, event.overContainer);

      if (!moves) {
        return;
      }

      var sortableSortedEvent = new _sortableEvent.SortableSortedEvent({
        dragEvent: event,
        moves: moves
      });

      this.draggable.triggerEvent(sortableSortedEvent);
    }
  }, {
    key: '_onDragStop',
    value: function _onDragStop(event) {
      var sortableStopEvent = new _sortableEvent.SortableStopEvent({
        dragEvent: event,
        oldIndex: this.startIndex,
        newIndex: index(event.source)
      });

      this.draggable.triggerEvent(sortableStopEvent);

      this.startIndex = null;
      this.offset = null;
    }
  }]);
  return Sortable;
}();

exports.default = Sortable;


function index(element) {
  return Array.prototype.indexOf.call(element.parentNode.children, element);
}

function move(source, over, overContainer) {
  var emptyOverContainer = !overContainer.children.length;
  var differentContainer = over && source.parentNode !== over.parentNode;
  var sameContainer = over && source.parentNode === over.parentNode;

  if (emptyOverContainer) {
    return moveInsideEmptyContainer(source, overContainer);
  } else if (sameContainer) {
    return moveWithinContainer(source, over);
  } else if (differentContainer) {
    return moveOutsideContainer(source, over);
  } else {
    return null;
  }
}

function moveInsideEmptyContainer(source, overContainer) {
  var oldContainer = source.parentNode;
  var oldIndex = index(source);

  overContainer.appendChild(source);

  return { oldIndex: oldIndex, newIndex: index(source), oldContainer: oldContainer, newContainer: overContainer };
}

function moveWithinContainer(source, over) {
  var oldIndex = index(source);
  var newIndex = index(over);

  if (oldIndex < newIndex) {
    source.parentNode.insertBefore(source, over.nextElementSibling);
  } else {
    source.parentNode.insertBefore(source, over);
  }

  return { oldIndex: oldIndex, newIndex: newIndex, oldContainer: source.parentNode, newContainer: source.parentNode };
}

function moveOutsideContainer(source, over) {
  var oldContainer = source.parentNode;
  var oldIndex = index(source);
  var newIndex = index(over);

  over.parentNode.insertBefore(source, over);

  return { oldIndex: oldIndex, newIndex: newIndex, oldContainer: oldContainer, newContainer: source.parentNode };
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _draggable = __webpack_require__(17);

var _draggable2 = _interopRequireDefault(_draggable);

var _swappableEvent = __webpack_require__(62);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Swappable = function () {
  function Swappable() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, Swappable);

    this.draggable = new _draggable2.default(containers, options);

    this._onDragStart = this._onDragStart.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragStop = this._onDragStop.bind(this);

    this.draggable.on('drag:start', this._onDragStart).on('drag:over', this._onDragOver).on('drag:stop', this._onDragStop);
  }

  (0, _createClass3.default)(Swappable, [{
    key: 'destroy',
    value: function destroy() {
      this.draggable.off('drag:start', this._onDragStart).off('drag:over', this._onDragOver).off('drag:stop', this._onDragStop).destroy();
    }
  }, {
    key: 'on',
    value: function on(type, callback) {
      this.draggable.on(type, callback);
      return this;
    }
  }, {
    key: 'off',
    value: function off(type, callback) {
      this.draggable.off(type, callback);
      return this;
    }
  }, {
    key: '_onDragStart',
    value: function _onDragStart(event) {
      var swappableStartEvent = new _swappableEvent.SwappableStartEvent({
        dragEvent: event
      });

      this.draggable.triggerEvent(swappableStartEvent);

      if (swappableStartEvent.canceled()) {
        event.cancel();
      }
    }
  }, {
    key: '_onDragOver',
    value: function _onDragOver(event) {
      if (event.over === event.source) {
        return;
      }

      if (event.canceled()) {
        return;
      }

      if (this.lastOver && this.lastOver !== event.over) {
        swap(this.lastOver, event.source);
      }

      this.lastOver = event.over;

      swap(event.source, event.over);

      // Let this cancel the actual swap
      var swappableSwappedEvent = new _swappableEvent.SwappableSwappedEvent({
        dragEvent: event,
        swappedElement: event.over
      });

      this.draggable.triggerEvent(swappableSwappedEvent);
    }
  }, {
    key: '_onDragStop',
    value: function _onDragStop(event) {
      var swappableStopEvent = new _swappableEvent.SwappableStopEvent({
        dragEvent: event
      });

      this.draggable.triggerEvent(swappableStopEvent);
      this.lastOver = null;
    }
  }]);
  return Swappable;
}();

exports.default = Swappable;


function withTempElement(callback) {
  var tmpElement = document.createElement('div');
  callback(tmpElement);
  tmpElement.parentNode.removeChild(tmpElement);
}

function swap(source, over) {
  var overParent = over.parentNode;
  var sourceParent = source.parentNode;

  withTempElement(function (tmpElement) {
    sourceParent.insertBefore(tmpElement, source);
    overParent.insertBefore(source, over);
    sourceParent.insertBefore(over, tmpElement);
  });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(13);

var _collidableEvent = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Collidable = function () {
  function Collidable(draggable) {
    (0, _classCallCheck3.default)(this, Collidable);

    this.draggable = draggable;

    this._onDragMove = this._onDragMove.bind(this);
    this._onDragStop = this._onDragStop.bind(this);
    this._onRequestAnimationFrame = this._onRequestAnimationFrame.bind(this);
  }

  (0, _createClass3.default)(Collidable, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('drag:move', this._onDragMove);
      this.draggable.on('drag:stop', this._onDragStop);
    }
  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('drag:move', this._onDragMove);
      this.draggable.off('drag:stop', this._onDragStop);
    }
  }, {
    key: '_onDragMove',
    value: function _onDragMove(event) {
      var target = event.sensorEvent.target;

      this.currentAnimationFrame = requestAnimationFrame(this._onRequestAnimationFrame(target));

      if (this.currentlyCollidingElement) {
        event.cancel();
      }

      var collidableInEvent = new _collidableEvent.CollidableInEvent({
        dragEvent: event,
        collidingElement: this.currentlyCollidingElement
      });

      var collidableOutEvent = new _collidableEvent.CollidableOutEvent({
        dragEvent: event,
        collidingElement: this.lastCollidingElement
      });

      var enteringCollidable = Boolean(this.currentlyCollidingElement && this.lastCollidingElement !== this.currentlyCollidingElement);
      var leavingCollidable = Boolean(!this.currentlyCollidingElement && this.lastCollidingElement);

      if (enteringCollidable) {
        if (this.lastCollidingElement) {
          this.draggable.triggerEvent(collidableOutEvent);
        }

        this.draggable.triggerEvent(collidableInEvent);
      } else if (leavingCollidable) {
        this.draggable.triggerEvent(collidableOutEvent);
      }

      this.lastCollidingElement = this.currentlyCollidingElement;
    }
  }, {
    key: '_onDragStop',
    value: function _onDragStop(event) {
      var lastCollidingElement = this.currentlyCollidingElement || this.lastCollidingElement;
      var collidableOutEvent = new _collidableEvent.CollidableOutEvent({
        dragEvent: event,
        collidingElement: lastCollidingElement
      });

      if (lastCollidingElement) {
        this.draggable.triggerEvent(collidableOutEvent);
      }

      this.lastCollidingElement = null;
      this.currentlyCollidingElement = null;
    }
  }, {
    key: '_onRequestAnimationFrame',
    value: function _onRequestAnimationFrame(target) {
      var _this = this;

      return function () {
        var collidables = _this._getCollidables();
        _this.currentlyCollidingElement = (0, _utils.closest)(target, function (element) {
          return collidables.includes(element);
        });
      };
    }
  }, {
    key: '_getCollidables',
    value: function _getCollidables() {
      var collidables = this.draggable.options.collidables;

      if (typeof collidables === 'string') {
        return Array.prototype.slice.call(document.querySelectorAll(collidables));
      } else if (collidables instanceof NodeList || collidables instanceof Array) {
        return Array.prototype.slice.call(collidables);
      } else if (collidables instanceof HTMLElement) {
        return [collidables];
      } else if (typeof collidables === 'function') {
        return collidables();
      } else {
        return [];
      }
    }
  }]);
  return Collidable;
}();

exports.default = Collidable;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _snappableEvent = __webpack_require__(60);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Snappable = function () {
  function Snappable(draggable) {
    (0, _classCallCheck3.default)(this, Snappable);

    this.draggable = draggable;

    this._onDragStart = this._onDragStart.bind(this);
    this._onDragStop = this._onDragStop.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._onDragOut = this._onDragOut.bind(this);
  }

  (0, _createClass3.default)(Snappable, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('drag:start', this._onDragStart).on('drag:stop', this._onDragStop).on('drag:over', this._onDragOver).on('drag:out', this._onDragOut).on('droppable:over', this._onDragOver).on('droppable:out', this._onDragOut);
    }
  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('drag:start', this._onDragStart).off('drag:stop', this._onDragStop).off('drag:over', this._onDragOver).off('drag:out', this._onDragOut).off('droppable:over', this._onDragOver).off('droppable:out', this._onDragOut);
    }
  }, {
    key: '_onDragStart',
    value: function _onDragStart(event) {
      if (event.canceled()) {
        return;
      }

      this.firstSource = event.source;
    }
  }, {
    key: '_onDragStop',
    value: function _onDragStop() {
      this.firstSource = null;
    }
  }, {
    key: '_onDragOver',
    value: function _onDragOver(event) {
      var _this = this;

      if (event.canceled()) {
        return;
      }

      var source = event.source || event.dragEvent.source;
      var mirror = event.mirror || event.dragEvent.mirror;

      if (source === this.firstSource) {
        this.firstSource = null;
        return;
      }

      var snapInEvent = new _snappableEvent.SnapInEvent({
        dragEvent: event
      });

      this.draggable.triggerEvent(snapInEvent);

      if (snapInEvent.canceled()) {
        return;
      }

      if (mirror) {
        mirror.style.display = 'none';
      }

      source.classList.remove(this.draggable.getClassNameFor('source:dragging'));
      source.classList.add(this.draggable.getClassNameFor('source:placed'));

      setTimeout(function () {
        source.classList.remove(_this.draggable.getClassNameFor('source:placed'));
      }, this.draggable.options.placedTimeout);
    }
  }, {
    key: '_onDragOut',
    value: function _onDragOut(event) {
      if (event.canceled()) {
        return;
      }

      var mirror = event.mirror || event.dragEvent.mirror;
      var source = event.source || event.dragEvent.source;

      var snapOutEvent = new _snappableEvent.SnapOutEvent({
        dragEvent: event
      });

      this.draggable.triggerEvent(snapOutEvent);

      if (snapOutEvent.canceled()) {
        return;
      }

      if (mirror) {
        mirror.style.display = '';
      }

      source.classList.add(this.draggable.getClassNameFor('source:dragging'));
    }
  }]);
  return Snappable;
}();

exports.default = Snappable;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ARIA_GRABBED = 'aria-grabbed';
var ARIA_DROPEFFECT = 'aria-dropeffect';
var TABINDEX = 'tabindex';

var Accessibility = function () {
  function Accessibility(draggable) {
    (0, _classCallCheck3.default)(this, Accessibility);

    this.draggable = draggable;

    this._onInit = this._onInit.bind(this);
    this._onDestroy = this._onDestroy.bind(this);
  }

  (0, _createClass3.default)(Accessibility, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('init', this._onInit).on('destroy', this._onDestroy).on('drag:start', _onDragStart).on('drag:stop', _onDragStop);
    }
  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('init', this._onInit).off('destroy', this._onDestroy).off('drag:start', _onDragStart).off('drag:stop', _onDragStop);
    }
  }, {
    key: '_onInit',
    value: function _onInit(_ref) {
      var containers = _ref.containers;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var container = _step.value;

          container.setAttribute(ARIA_DROPEFFECT, this.draggable.options.type);

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = container.querySelectorAll(this.draggable.options.draggable)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var element = _step2.value;

              element.setAttribute(TABINDEX, 0);
              element.setAttribute(ARIA_GRABBED, false);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: '_onDestroy',
    value: function _onDestroy(_ref2) {
      var containers = _ref2.containers;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = containers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var container = _step3.value;

          container.removeAttribute(ARIA_DROPEFFECT);

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = container.querySelectorAll(this.draggable.options.draggable)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var element = _step4.value;

              element.removeAttribute(TABINDEX, 0);
              element.removeAttribute(ARIA_GRABBED, false);
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }]);
  return Accessibility;
}();

exports.default = Accessibility;


function _onDragStart(_ref3) {
  var source = _ref3.source;

  source.setAttribute(ARIA_GRABBED, true);
}

function _onDragStop(_ref4) {
  var source = _ref4.source;

  source.setAttribute(ARIA_GRABBED, false);
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mirror = function () {
  function Mirror(draggable) {
    (0, _classCallCheck3.default)(this, Mirror);

    this.draggable = draggable;

    this._onMirrorCreated = this._onMirrorCreated.bind(this);
    this._onMirrorMove = this._onMirrorMove.bind(this);
  }

  (0, _createClass3.default)(Mirror, [{
    key: 'attach',
    value: function attach() {
      this.draggable.on('mirror:created', this._onMirrorCreated).on('mirror:created', onMirrorCreated).on('mirror:move', this._onMirrorMove);
    }
  }, {
    key: 'detach',
    value: function detach() {
      this.draggable.off('mirror:created', this._onMirrorCreated).off('mirror:created', onMirrorCreated).off('mirror:move', this._onMirrorMove);
    }
  }, {
    key: '_onMirrorCreated',
    value: function _onMirrorCreated(_ref) {
      var _this = this;

      var mirror = _ref.mirror,
          source = _ref.source,
          sensorEvent = _ref.sensorEvent;

      var mirrorClass = this.draggable.getClassNameFor('mirror');

      var setState = function setState(data) {
        _this.mirrorOffset = data.mirrorOffset;
        return data;
      };

      Promise.resolve({ mirror: mirror, source: source, sensorEvent: sensorEvent, mirrorClass: mirrorClass }).then(computeMirrorDimensions).then(calculateMirrorOffset).then(addMirrorClasses).then(positionMirror()).then(removeMirrorID).then(setState).catch();
    }
  }, {
    key: '_onMirrorMove',
    value: function _onMirrorMove(_ref2) {
      var mirror = _ref2.mirror,
          sensorEvent = _ref2.sensorEvent;

      Promise.resolve({ mirror: mirror, sensorEvent: sensorEvent, mirrorOffset: this.mirrorOffset }).then(positionMirror({ raf: true })).catch();
    }
  }]);
  return Mirror;
}();

exports.default = Mirror;


function onMirrorCreated(_ref3) {
  var mirror = _ref3.mirror,
      source = _ref3.source;

  Promise.resolve({ mirror: mirror, source: source }).then(resetMirror).catch();
}

function resetMirror(data) {
  return withPromise(function (resolve) {
    var mirror = data.mirror,
        source = data.source;


    mirror.style.position = 'fixed';
    mirror.style.pointerEvents = 'none';
    mirror.style.top = 0;
    mirror.style.left = 0;
    mirror.style.width = source.offsetWidth + 'px';
    mirror.style.height = source.offsetHeight + 'px';

    resolve(data);
  });
}

function computeMirrorDimensions(data) {
  return withPromise(function (resolve) {
    var source = data.source;

    var sourceRect = source.getBoundingClientRect();
    resolve(Object.assign({}, data, { sourceRect: sourceRect }));
  });
}

function calculateMirrorOffset(data) {
  return withPromise(function (resolve) {
    var sensorEvent = data.sensorEvent,
        sourceRect = data.sourceRect;

    var mirrorOffset = { top: sensorEvent.clientY - sourceRect.top, left: sensorEvent.clientX - sourceRect.left };
    resolve(Object.assign({}, data, { mirrorOffset: mirrorOffset }));
  });
}

function addMirrorClasses(data) {
  return withPromise(function (resolve) {
    var mirror = data.mirror,
        mirrorClass = data.mirrorClass;

    mirror.classList.add(mirrorClass);
    resolve(data);
  });
}

function removeMirrorID(data) {
  return withPromise(function (resolve) {
    var mirror = data.mirror;

    mirror.removeAttribute('id');
    delete mirror.id;
    resolve(data);
  });
}

function positionMirror() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$withFrame = _ref4.withFrame,
      withFrame = _ref4$withFrame === undefined ? false : _ref4$withFrame;

  return function (data) {
    return withPromise(function (resolve) {
      var mirror = data.mirror,
          sensorEvent = data.sensorEvent,
          mirrorOffset = data.mirrorOffset;


      if (mirrorOffset) {
        var x = sensorEvent.clientX - mirrorOffset.left;
        var y = sensorEvent.clientY - mirrorOffset.top;

        mirror.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
      }

      resolve(data);
    }, { frame: withFrame });
  };
}

function withPromise(callback) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref5$raf = _ref5.raf,
      raf = _ref5$raf === undefined ? false : _ref5$raf;

  return new Promise(function (resolve, reject) {
    if (raf) {
      requestAnimationFrame(function () {
        callback(resolve, reject);
      });
    } else {
      callback(resolve, reject);
    }
  });
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollidableOutEvent = exports.CollidableInEvent = exports.CollidableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _abstractEvent = __webpack_require__(4);

var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CollidableEvent = exports.CollidableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(CollidableEvent, _AbstractEvent);

  function CollidableEvent() {
    (0, _classCallCheck3.default)(this, CollidableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (CollidableEvent.__proto__ || Object.getPrototypeOf(CollidableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(CollidableEvent, [{
    key: 'dragEvent',
    get: function get() {
      return this.data.dragEvent;
    }
  }]);
  return CollidableEvent;
}(_abstractEvent2.default);

CollidableEvent.type = 'collidable';

var CollidableInEvent = exports.CollidableInEvent = function (_CollidableEvent) {
  (0, _inherits3.default)(CollidableInEvent, _CollidableEvent);

  function CollidableInEvent() {
    (0, _classCallCheck3.default)(this, CollidableInEvent);
    return (0, _possibleConstructorReturn3.default)(this, (CollidableInEvent.__proto__ || Object.getPrototypeOf(CollidableInEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(CollidableInEvent, [{
    key: 'collidingElement',
    get: function get() {
      return this.data.collidingElement;
    }
  }]);
  return CollidableInEvent;
}(CollidableEvent);

CollidableInEvent.type = 'collidable:in';

var CollidableOutEvent = exports.CollidableOutEvent = function (_CollidableEvent2) {
  (0, _inherits3.default)(CollidableOutEvent, _CollidableEvent2);

  function CollidableOutEvent() {
    (0, _classCallCheck3.default)(this, CollidableOutEvent);
    return (0, _possibleConstructorReturn3.default)(this, (CollidableOutEvent.__proto__ || Object.getPrototypeOf(CollidableOutEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(CollidableOutEvent, [{
    key: 'collidingElement',
    get: function get() {
      return this.data.collidingElement;
    }
  }]);
  return CollidableOutEvent;
}(CollidableEvent);

CollidableOutEvent.type = 'collidable:out';

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragStopEvent = exports.DragPressureEvent = exports.DragOverEvent = exports.DragOverContainerEvent = exports.DragOutEvent = exports.DragOutContainerEvent = exports.DragMoveEvent = exports.DragStartEvent = exports.DragEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _abstractEvent = __webpack_require__(4);

var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragEvent = exports.DragEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(DragEvent, _AbstractEvent);

  function DragEvent() {
    (0, _classCallCheck3.default)(this, DragEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragEvent.__proto__ || Object.getPrototypeOf(DragEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragEvent, [{
    key: 'hasMirror',
    value: function hasMirror() {
      return Boolean(this.mirror);
    }
  }, {
    key: 'source',
    get: function get() {
      return this.data.source;
    }
  }, {
    key: 'mirror',
    get: function get() {
      return this.data.mirror;
    }
  }, {
    key: 'sourceContainer',
    get: function get() {
      return this.data.sourceContainer;
    }
  }, {
    key: 'sensorEvent',
    get: function get() {
      return this.data.sensorEvent;
    }
  }, {
    key: 'originalEvent',
    get: function get() {
      if (this.sensorEvent) {
        return this.sensorEvent.originalEvent;
      }

      return null;
    }
  }]);
  return DragEvent;
}(_abstractEvent2.default);

var DragStartEvent = exports.DragStartEvent = function (_DragEvent) {
  (0, _inherits3.default)(DragStartEvent, _DragEvent);

  function DragStartEvent() {
    (0, _classCallCheck3.default)(this, DragStartEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStartEvent.__proto__ || Object.getPrototypeOf(DragStartEvent)).apply(this, arguments));
  }

  return DragStartEvent;
}(DragEvent);

DragStartEvent.type = 'drag:start';

var DragMoveEvent = exports.DragMoveEvent = function (_DragEvent2) {
  (0, _inherits3.default)(DragMoveEvent, _DragEvent2);

  function DragMoveEvent() {
    (0, _classCallCheck3.default)(this, DragMoveEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragMoveEvent.__proto__ || Object.getPrototypeOf(DragMoveEvent)).apply(this, arguments));
  }

  return DragMoveEvent;
}(DragEvent);

DragMoveEvent.type = 'drag:move';

var DragOutContainerEvent = exports.DragOutContainerEvent = function (_DragEvent3) {
  (0, _inherits3.default)(DragOutContainerEvent, _DragEvent3);

  function DragOutContainerEvent() {
    (0, _classCallCheck3.default)(this, DragOutContainerEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOutContainerEvent.__proto__ || Object.getPrototypeOf(DragOutContainerEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOutContainerEvent, [{
    key: 'overContainer',
    get: function get() {
      return this.data.overContainer;
    }
  }]);
  return DragOutContainerEvent;
}(DragEvent);

DragOutContainerEvent.type = 'drag:out:container';

var DragOutEvent = exports.DragOutEvent = function (_DragEvent4) {
  (0, _inherits3.default)(DragOutEvent, _DragEvent4);

  function DragOutEvent() {
    (0, _classCallCheck3.default)(this, DragOutEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOutEvent.__proto__ || Object.getPrototypeOf(DragOutEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOutEvent, [{
    key: 'overContainer',
    get: function get() {
      return this.data.overContainer;
    }
  }, {
    key: 'over',
    get: function get() {
      return this.data.over;
    }
  }]);
  return DragOutEvent;
}(DragEvent);

DragOutEvent.type = 'drag:out';

var DragOverContainerEvent = exports.DragOverContainerEvent = function (_DragEvent5) {
  (0, _inherits3.default)(DragOverContainerEvent, _DragEvent5);

  function DragOverContainerEvent() {
    (0, _classCallCheck3.default)(this, DragOverContainerEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOverContainerEvent.__proto__ || Object.getPrototypeOf(DragOverContainerEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOverContainerEvent, [{
    key: 'overContainer',
    get: function get() {
      return this.data.overContainer;
    }
  }]);
  return DragOverContainerEvent;
}(DragEvent);

DragOverContainerEvent.type = 'drag:over:container';

var DragOverEvent = exports.DragOverEvent = function (_DragEvent6) {
  (0, _inherits3.default)(DragOverEvent, _DragEvent6);

  function DragOverEvent() {
    (0, _classCallCheck3.default)(this, DragOverEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragOverEvent.__proto__ || Object.getPrototypeOf(DragOverEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragOverEvent, [{
    key: 'overContainer',
    get: function get() {
      return this.data.overContainer;
    }
  }, {
    key: 'over',
    get: function get() {
      return this.data.over;
    }
  }]);
  return DragOverEvent;
}(DragEvent);

DragOverEvent.type = 'drag:over';

var DragPressureEvent = exports.DragPressureEvent = function (_DragEvent7) {
  (0, _inherits3.default)(DragPressureEvent, _DragEvent7);

  function DragPressureEvent() {
    (0, _classCallCheck3.default)(this, DragPressureEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragPressureEvent.__proto__ || Object.getPrototypeOf(DragPressureEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DragPressureEvent, [{
    key: 'pressure',
    get: function get() {
      return this.data.pressure;
    }
  }]);
  return DragPressureEvent;
}(DragEvent);

DragPressureEvent.type = 'drag:pressure';

var DragStopEvent = exports.DragStopEvent = function (_DragEvent8) {
  (0, _inherits3.default)(DragStopEvent, _DragEvent8);

  function DragStopEvent() {
    (0, _classCallCheck3.default)(this, DragStopEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DragStopEvent.__proto__ || Object.getPrototypeOf(DragStopEvent)).apply(this, arguments));
  }

  return DragStopEvent;
}(DragEvent);

DragStopEvent.type = 'drag:stop';

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableDestroyEvent = exports.DraggableInitializedEvent = exports.DraggableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _abstractEvent = __webpack_require__(4);

var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DraggableEvent = exports.DraggableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(DraggableEvent, _AbstractEvent);

  function DraggableEvent() {
    (0, _classCallCheck3.default)(this, DraggableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DraggableEvent.__proto__ || Object.getPrototypeOf(DraggableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DraggableEvent, [{
    key: 'draggable',
    get: function get() {
      return this.data.draggable;
    }
  }]);
  return DraggableEvent;
}(_abstractEvent2.default);

DraggableEvent.type = 'draggable';

var DraggableInitializedEvent = exports.DraggableInitializedEvent = function (_DraggableEvent) {
  (0, _inherits3.default)(DraggableInitializedEvent, _DraggableEvent);

  function DraggableInitializedEvent() {
    (0, _classCallCheck3.default)(this, DraggableInitializedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DraggableInitializedEvent.__proto__ || Object.getPrototypeOf(DraggableInitializedEvent)).apply(this, arguments));
  }

  return DraggableInitializedEvent;
}(DraggableEvent);

DraggableInitializedEvent.type = 'draggable:initialize';

var DraggableDestroyEvent = exports.DraggableDestroyEvent = function (_DraggableEvent2) {
  (0, _inherits3.default)(DraggableDestroyEvent, _DraggableEvent2);

  function DraggableDestroyEvent() {
    (0, _classCallCheck3.default)(this, DraggableDestroyEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DraggableDestroyEvent.__proto__ || Object.getPrototypeOf(DraggableDestroyEvent)).apply(this, arguments));
  }

  return DraggableDestroyEvent;
}(DraggableEvent);

DraggableDestroyEvent.type = 'draggable:destroy';

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DroppableOutEvent = exports.DroppableOverEvent = exports.DroppableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _abstractEvent = __webpack_require__(4);

var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DroppableEvent = exports.DroppableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(DroppableEvent, _AbstractEvent);

  function DroppableEvent() {
    (0, _classCallCheck3.default)(this, DroppableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DroppableEvent.__proto__ || Object.getPrototypeOf(DroppableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(DroppableEvent, [{
    key: 'dragEvent',
    get: function get() {
      return this.data.dragEvent;
    }
  }, {
    key: 'droppable',
    get: function get() {
      return this.data.droppable;
    }
  }]);
  return DroppableEvent;
}(_abstractEvent2.default);

DroppableEvent.type = 'droppable';

var DroppableOverEvent = exports.DroppableOverEvent = function (_DroppableEvent) {
  (0, _inherits3.default)(DroppableOverEvent, _DroppableEvent);

  function DroppableOverEvent() {
    (0, _classCallCheck3.default)(this, DroppableOverEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DroppableOverEvent.__proto__ || Object.getPrototypeOf(DroppableOverEvent)).apply(this, arguments));
  }

  return DroppableOverEvent;
}(DroppableEvent);

DroppableOverEvent.type = 'droppable:over';

var DroppableOutEvent = exports.DroppableOutEvent = function (_DroppableEvent2) {
  (0, _inherits3.default)(DroppableOutEvent, _DroppableEvent2);

  function DroppableOutEvent() {
    (0, _classCallCheck3.default)(this, DroppableOutEvent);
    return (0, _possibleConstructorReturn3.default)(this, (DroppableOutEvent.__proto__ || Object.getPrototypeOf(DroppableOutEvent)).apply(this, arguments));
  }

  return DroppableOutEvent;
}(DroppableEvent);

DroppableOutEvent.type = 'droppable:out';

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MirrorDestroyEvent = exports.MirrorMoveEvent = exports.MirrorAttachedEvent = exports.MirrorCreatedEvent = exports.MirrorEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _abstractEvent = __webpack_require__(4);

var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MirrorEvent = exports.MirrorEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(MirrorEvent, _AbstractEvent);

  function MirrorEvent() {
    (0, _classCallCheck3.default)(this, MirrorEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorEvent.__proto__ || Object.getPrototypeOf(MirrorEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(MirrorEvent, [{
    key: 'source',
    get: function get() {
      return this.data.source;
    }
  }, {
    key: 'mirror',
    get: function get() {
      return this.data.mirror;
    }
  }, {
    key: 'sourceContainer',
    get: function get() {
      return this.data.sourceContainer;
    }
  }, {
    key: 'sensorEvent',
    get: function get() {
      return this.data.sensorEvent;
    }
  }, {
    key: 'originalEvent',
    get: function get() {
      if (this.sensorEvent) {
        return this.sensorEvent.originalEvent;
      }

      return null;
    }
  }]);
  return MirrorEvent;
}(_abstractEvent2.default);

var MirrorCreatedEvent = exports.MirrorCreatedEvent = function (_MirrorEvent) {
  (0, _inherits3.default)(MirrorCreatedEvent, _MirrorEvent);

  function MirrorCreatedEvent() {
    (0, _classCallCheck3.default)(this, MirrorCreatedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorCreatedEvent.__proto__ || Object.getPrototypeOf(MirrorCreatedEvent)).apply(this, arguments));
  }

  return MirrorCreatedEvent;
}(MirrorEvent);

MirrorCreatedEvent.type = 'mirror:created';

var MirrorAttachedEvent = exports.MirrorAttachedEvent = function (_MirrorEvent2) {
  (0, _inherits3.default)(MirrorAttachedEvent, _MirrorEvent2);

  function MirrorAttachedEvent() {
    (0, _classCallCheck3.default)(this, MirrorAttachedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorAttachedEvent.__proto__ || Object.getPrototypeOf(MirrorAttachedEvent)).apply(this, arguments));
  }

  return MirrorAttachedEvent;
}(MirrorEvent);

MirrorAttachedEvent.type = 'mirror:attached';

var MirrorMoveEvent = exports.MirrorMoveEvent = function (_MirrorEvent3) {
  (0, _inherits3.default)(MirrorMoveEvent, _MirrorEvent3);

  function MirrorMoveEvent() {
    (0, _classCallCheck3.default)(this, MirrorMoveEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorMoveEvent.__proto__ || Object.getPrototypeOf(MirrorMoveEvent)).apply(this, arguments));
  }

  return MirrorMoveEvent;
}(MirrorEvent);

MirrorMoveEvent.type = 'mirror:move';

var MirrorDestroyEvent = exports.MirrorDestroyEvent = function (_MirrorEvent4) {
  (0, _inherits3.default)(MirrorDestroyEvent, _MirrorEvent4);

  function MirrorDestroyEvent() {
    (0, _classCallCheck3.default)(this, MirrorDestroyEvent);
    return (0, _possibleConstructorReturn3.default)(this, (MirrorDestroyEvent.__proto__ || Object.getPrototypeOf(MirrorDestroyEvent)).apply(this, arguments));
  }

  return MirrorDestroyEvent;
}(MirrorEvent);

MirrorDestroyEvent.type = 'mirror:destroy';

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapOutEvent = exports.SnapInEvent = exports.SnapEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _abstractEvent = __webpack_require__(4);

var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SnapEvent = exports.SnapEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(SnapEvent, _AbstractEvent);

  function SnapEvent() {
    (0, _classCallCheck3.default)(this, SnapEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SnapEvent.__proto__ || Object.getPrototypeOf(SnapEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SnapEvent, [{
    key: 'dragEvent',
    get: function get() {
      return this.data.dragEvent;
    }
  }]);
  return SnapEvent;
}(_abstractEvent2.default);

var SnapInEvent = exports.SnapInEvent = function (_SnapEvent) {
  (0, _inherits3.default)(SnapInEvent, _SnapEvent);

  function SnapInEvent() {
    (0, _classCallCheck3.default)(this, SnapInEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SnapInEvent.__proto__ || Object.getPrototypeOf(SnapInEvent)).apply(this, arguments));
  }

  return SnapInEvent;
}(SnapEvent);

SnapInEvent.type = 'snap:in';

var SnapOutEvent = exports.SnapOutEvent = function (_SnapEvent2) {
  (0, _inherits3.default)(SnapOutEvent, _SnapEvent2);

  function SnapOutEvent() {
    (0, _classCallCheck3.default)(this, SnapOutEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SnapOutEvent.__proto__ || Object.getPrototypeOf(SnapOutEvent)).apply(this, arguments));
  }

  return SnapOutEvent;
}(SnapEvent);

SnapOutEvent.type = 'snap:out';

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortableStopEvent = exports.SortableSortedEvent = exports.SortableStartEvent = exports.SortableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _abstractEvent = __webpack_require__(4);

var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortableEvent = exports.SortableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(SortableEvent, _AbstractEvent);

  function SortableEvent() {
    (0, _classCallCheck3.default)(this, SortableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SortableEvent.__proto__ || Object.getPrototypeOf(SortableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SortableEvent, [{
    key: 'dragEvent',
    get: function get() {
      return this.data.dragEvent;
    }
  }]);
  return SortableEvent;
}(_abstractEvent2.default);

var SortableStartEvent = exports.SortableStartEvent = function (_SortableEvent) {
  (0, _inherits3.default)(SortableStartEvent, _SortableEvent);

  function SortableStartEvent() {
    (0, _classCallCheck3.default)(this, SortableStartEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SortableStartEvent.__proto__ || Object.getPrototypeOf(SortableStartEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SortableStartEvent, [{
    key: 'startIndex',
    get: function get() {
      return this.data.startIndex;
    }
  }]);
  return SortableStartEvent;
}(SortableEvent);

SortableStartEvent.type = 'sortable:start';

var SortableSortedEvent = exports.SortableSortedEvent = function (_SortableEvent2) {
  (0, _inherits3.default)(SortableSortedEvent, _SortableEvent2);

  function SortableSortedEvent() {
    (0, _classCallCheck3.default)(this, SortableSortedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SortableSortedEvent.__proto__ || Object.getPrototypeOf(SortableSortedEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SortableSortedEvent, [{
    key: 'moves',
    get: function get() {
      return this.data.moves;
    }
  }]);
  return SortableSortedEvent;
}(SortableEvent);

SortableSortedEvent.type = 'sortable:sorted';

var SortableStopEvent = exports.SortableStopEvent = function (_SortableEvent3) {
  (0, _inherits3.default)(SortableStopEvent, _SortableEvent3);

  function SortableStopEvent() {
    (0, _classCallCheck3.default)(this, SortableStopEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SortableStopEvent.__proto__ || Object.getPrototypeOf(SortableStopEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SortableStopEvent, [{
    key: 'oldIndex',
    get: function get() {
      return this.data.oldIndex;
    }
  }, {
    key: 'newIndex',
    get: function get() {
      return this.data.newIndex;
    }
  }]);
  return SortableStopEvent;
}(SortableEvent);

SortableStopEvent.type = 'sortable:stop';

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwappableStopEvent = exports.SwappableSwappedEvent = exports.SwappableStartEvent = exports.SwappableEvent = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _abstractEvent = __webpack_require__(4);

var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwappableEvent = exports.SwappableEvent = function (_AbstractEvent) {
  (0, _inherits3.default)(SwappableEvent, _AbstractEvent);

  function SwappableEvent() {
    (0, _classCallCheck3.default)(this, SwappableEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SwappableEvent.__proto__ || Object.getPrototypeOf(SwappableEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SwappableEvent, [{
    key: 'dragEvent',
    get: function get() {
      return this.data.dragEvent;
    }
  }]);
  return SwappableEvent;
}(_abstractEvent2.default);

var SwappableStartEvent = exports.SwappableStartEvent = function (_SwappableEvent) {
  (0, _inherits3.default)(SwappableStartEvent, _SwappableEvent);

  function SwappableStartEvent() {
    (0, _classCallCheck3.default)(this, SwappableStartEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SwappableStartEvent.__proto__ || Object.getPrototypeOf(SwappableStartEvent)).apply(this, arguments));
  }

  return SwappableStartEvent;
}(SwappableEvent);

SwappableStartEvent.type = 'swappable:start';

var SwappableSwappedEvent = exports.SwappableSwappedEvent = function (_SwappableEvent2) {
  (0, _inherits3.default)(SwappableSwappedEvent, _SwappableEvent2);

  function SwappableSwappedEvent() {
    (0, _classCallCheck3.default)(this, SwappableSwappedEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SwappableSwappedEvent.__proto__ || Object.getPrototypeOf(SwappableSwappedEvent)).apply(this, arguments));
  }

  (0, _createClass3.default)(SwappableSwappedEvent, [{
    key: 'swappedElement',
    get: function get() {
      return this.data.swappedElement;
    }
  }]);
  return SwappableSwappedEvent;
}(SwappableEvent);

SwappableSwappedEvent.type = 'swappable:swapped';

var SwappableStopEvent = exports.SwappableStopEvent = function (_SwappableEvent3) {
  (0, _inherits3.default)(SwappableStopEvent, _SwappableEvent3);

  function SwappableStopEvent() {
    (0, _classCallCheck3.default)(this, SwappableStopEvent);
    return (0, _possibleConstructorReturn3.default)(this, (SwappableStopEvent.__proto__ || Object.getPrototypeOf(SwappableStopEvent)).apply(this, arguments));
  }

  return SwappableStopEvent;
}(SwappableEvent);

SwappableStopEvent.type = 'swappable:stop';

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbstractEvent = exports.Droppable = exports.Swappable = exports.Sortable = exports.Draggable = undefined;
exports.createEventClass = createEventClass;

var _draggable = __webpack_require__(17);

var _draggable2 = _interopRequireDefault(_draggable);

var _sortable = __webpack_require__(49);

var _sortable2 = _interopRequireDefault(_sortable);

var _swappable = __webpack_require__(50);

var _swappable2 = _interopRequireDefault(_swappable);

var _droppable = __webpack_require__(48);

var _droppable2 = _interopRequireDefault(_droppable);

var _abstractEvent = __webpack_require__(4);

var _abstractEvent2 = _interopRequireDefault(_abstractEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Draggable = _draggable2.default;
exports.Sortable = _sortable2.default;
exports.Swappable = _swappable2.default;
exports.Droppable = _droppable2.default;
exports.AbstractEvent = _abstractEvent2.default;
function createEventClass(options) {
  function EventConstructor() {
    return null;
  }
  EventConstructor.prototype = _abstractEvent2.default.prototype;
  createEventClass.type = options.type;
  return createEventClass;
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _sensor = __webpack_require__(19);

var _sensor2 = _interopRequireDefault(_sensor);

var _utils = __webpack_require__(13);

var _sensorEvent = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragSensor = function (_Sensor) {
  (0, _inherits3.default)(DragSensor, _Sensor);

  function DragSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, DragSensor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DragSensor.__proto__ || Object.getPrototypeOf(DragSensor)).call(this, containers, options));

    _this.dragging = false;
    _this.currentContainer = null;

    _this._onMouseDown = _this._onMouseDown.bind(_this);
    _this._onMouseUp = _this._onMouseUp.bind(_this);
    _this._onDragStart = _this._onDragStart.bind(_this);
    _this._onDragOver = _this._onDragOver.bind(_this);
    _this._onDragEnd = _this._onDragEnd.bind(_this);
    _this._onDragDrop = _this._onDragDrop.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(DragSensor, [{
    key: 'attach',
    value: function attach() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var container = _step.value;

          container.addEventListener('mousedown', this._onMouseDown, true);
          container.addEventListener('dragstart', this._onDragStart, false);
          container.addEventListener('dragover', this._onDragOver, false);
          container.addEventListener('dragend', this._onDragEnd, false);
          container.addEventListener('drop', this._onDragDrop, false);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      document.addEventListener('mouseup', this._onMouseUp, true);
    }
  }, {
    key: 'detach',
    value: function detach() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.containers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var container = _step2.value;

          container.removeEventListener('mousedown', this._onMouseDown, true);
          container.removeEventListener('dragstart', this._onDragStart, false);
          container.removeEventListener('dragover', this._onDragOver, false);
          container.removeEventListener('dragend', this._onDragEnd, false);
          container.removeEventListener('drop', this._onDragDrop, false);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      document.removeEventListener('mouseup', this._onMouseUp, true);
    }

    // private

  }, {
    key: '_onDragStart',
    value: function _onDragStart(event) {
      // Need for firefox. "text" key is needed for IE
      event.dataTransfer.setData('text', '');
      event.dataTransfer.effectAllowed = this.options.type;

      var target = document.elementFromPoint(event.clientX, event.clientY);
      this.currentContainer = event.currentTarget;

      var dragStartEvent = new _sensorEvent.DragStartSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragStartEvent);

      if (dragStartEvent.canceled()) {
        this.dragging = false;
        // prevent drag event if fired event has been prevented
        event.preventDefault();
      } else {
        this.dragging = true;
      }
    }
  }, {
    key: '_onDragOver',
    value: function _onDragOver(event) {
      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = event.currentTarget;

      var dragMoveEvent = new _sensorEvent.DragMoveSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        overContainer: container,
        originalEvent: event
      });

      this.trigger(container, dragMoveEvent);

      // event.preventDefault();
      // event.dataTransfer.dropEffect = 'copy';

      if (!dragMoveEvent.canceled()) {
        event.preventDefault();
        // event.dataTransfer.dropEffect = this.options.type;
      }
    }
  }, {
    key: '_onDragEnd',
    value: function _onDragEnd(event) {
      if (!this.dragging) {
        return;
      }

      // prevent click on drop if draggable contains a clickable element
      event.preventDefault();

      var container = event.currentTarget;

      var dragStopEvent = new _sensorEvent.DragStopSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        originalEvent: event,
        container: container
      });

      this.trigger(container, dragStopEvent);

      this.dragging = false;
    }
  }, {
    key: '_onDragDrop',
    value: function _onDragDrop(event) {
      // eslint-disable-line class-methods-use-this
      event.preventDefault();
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(event) {
      // Firefox bug for inputs within draggables https://bugzilla.mozilla.org/show_bug.cgi?id=739071
      if (event.target && (event.target.form || event.target.contenteditable)) {
        return;
      }

      var target = (0, _utils.closest)(event.target, this.options.draggable);

      if (target) {
        clearTimeout(this.mouseDownTimeout);

        this.mouseDownTimeout = setTimeout(function () {
          target.draggable = true;
        }, this.options.delay);
      }
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(event) {
      clearTimeout(this.mouseDownTimeout);

      var target = (0, _utils.closest)(event.target, this.options.draggable);

      if (target) {
        target.draggable = false;
      }
    }
  }]);
  return DragSensor;
}(_sensor2.default);

exports.default = DragSensor;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _sensor = __webpack_require__(19);

var _sensor2 = _interopRequireDefault(_sensor);

var _sensorEvent = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ForceTouchSensor = function (_Sensor) {
  (0, _inherits3.default)(ForceTouchSensor, _Sensor);

  function ForceTouchSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, ForceTouchSensor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ForceTouchSensor.__proto__ || Object.getPrototypeOf(ForceTouchSensor)).call(this, containers, options));

    _this.dragging = false;
    _this.mightDrag = false;
    _this.currentContainer = null;

    _this._onMouseForceWillBegin = _this._onMouseForceWillBegin.bind(_this);
    _this._onMouseForceDown = _this._onMouseForceDown.bind(_this);
    _this._onMouseDown = _this._onMouseDown.bind(_this);
    _this._onMouseForceChange = _this._onMouseForceChange.bind(_this);
    _this._onMouseMove = _this._onMouseMove.bind(_this);
    _this._onMouseUp = _this._onMouseUp.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ForceTouchSensor, [{
    key: 'attach',
    value: function attach() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var container = _step.value;

          container.addEventListener('webkitmouseforcewillbegin', this._onMouseForceWillBegin, false);
          container.addEventListener('webkitmouseforcedown', this._onMouseForceDown, false);
          container.addEventListener('mousedown', this._onMouseDown, true);
          container.addEventListener('webkitmouseforcechanged', this._onMouseForceChange, false);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      document.addEventListener('mousemove', this._onMouseMove);
      document.addEventListener('mouseup', this._onMouseUp);
    }
  }, {
    key: 'detach',
    value: function detach() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.containers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var container = _step2.value;

          container.removeEventListener('webkitmouseforcewillbegin', this._onMouseForceWillBegin, false);
          container.removeEventListener('webkitmouseforcedown', this._onMouseForceDown, false);
          container.removeEventListener('mousedown', this._onMouseDown, true);
          container.removeEventListener('webkitmouseforcechanged', this._onMouseForceChange, false);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
    }
  }, {
    key: '_onMouseForceWillBegin',
    value: function _onMouseForceWillBegin(event) {
      event.preventDefault();
      this.mightDrag = true;
    }
  }, {
    key: '_onMouseForceDown',
    value: function _onMouseForceDown(event) {
      if (this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = event.currentTarget;

      var dragStartEvent = new _sensorEvent.DragStartSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: container,
        originalEvent: event
      });

      this.trigger(container, dragStartEvent);

      this.currentContainer = container;
      this.dragging = !dragStartEvent.canceled();
      this.mightDrag = false;
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(event) {
      if (!this.dragging) {
        return;
      }

      var dragStopEvent = new _sensorEvent.DragStopSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: null,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragStopEvent);

      this.currentContainer = null;
      this.dragging = false;
      this.mightDrag = false;
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(event) {
      if (!this.mightDrag) {
        return;
      }

      // Need workaround for real click
      // Cancel potential drag events
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(event) {
      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);

      var dragMoveEvent = new _sensorEvent.DragMoveSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragMoveEvent);
    }
  }, {
    key: '_onMouseForceChange',
    value: function _onMouseForceChange(event) {
      if (this.dragging) {
        return;
      }

      var target = event.target;
      var container = event.currentTarget;

      var dragPressureEvent = new _sensorEvent.DragPressureSensorEvent({
        pressure: event.webkitForce,
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: container,
        originalEvent: event
      });

      this.trigger(container, dragPressureEvent);
    }
  }, {
    key: '_onMouseForceGlobalChange',
    value: function _onMouseForceGlobalChange(event) {
      if (!this.dragging) {
        return;
      }

      var target = event.target;

      var dragPressureEvent = new _sensorEvent.DragPressureSensorEvent({
        pressure: event.webkitForce,
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragPressureEvent);
    }
  }]);
  return ForceTouchSensor;
}(_sensor2.default);

exports.default = ForceTouchSensor;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _sensor = __webpack_require__(19);

var _sensor2 = _interopRequireDefault(_sensor);

var _sensorEvent = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MouseSensor = function (_Sensor) {
  (0, _inherits3.default)(MouseSensor, _Sensor);

  function MouseSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, MouseSensor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MouseSensor.__proto__ || Object.getPrototypeOf(MouseSensor)).call(this, containers, options));

    _this.dragging = false;
    _this.mouseDown = false;
    _this.currentContainer = null;

    _this._onMouseDown = _this._onMouseDown.bind(_this);
    _this._onMouseMove = _this._onMouseMove.bind(_this);
    _this._onMouseUp = _this._onMouseUp.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MouseSensor, [{
    key: 'attach',
    value: function attach() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var container = _step.value;

          container.addEventListener('mousedown', this._onMouseDown, true);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      document.addEventListener('mousemove', this._onMouseMove);
      document.addEventListener('mouseup', this._onMouseUp);
    }
  }, {
    key: 'detach',
    value: function detach() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.containers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var container = _step2.value;

          container.removeEventListener('mousedown', this._onMouseDown, true);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(event) {
      var _this2 = this;

      if (event.button === 2) {
        return;
      }

      this.mouseDown = true;
      var target = document.elementFromPoint(event.clientX, event.clientY);
      var container = event.currentTarget;

      clearTimeout(this.mouseDownTimeout);
      this.mouseDownTimeout = setTimeout(function () {
        if (!_this2.mouseDown) {
          return;
        }

        var dragStartEvent = new _sensorEvent.DragStartSensorEvent({
          clientX: event.clientX,
          clientY: event.clientY,
          target: target,
          container: container,
          originalEvent: event
        });

        _this2.trigger(container, dragStartEvent);

        _this2.currentContainer = container;
        _this2.dragging = !dragStartEvent.canceled();
      }, this.options.delay);
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(event) {
      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);

      var dragMoveEvent = new _sensorEvent.DragMoveSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragMoveEvent);
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(event) {
      this.mouseDown = false;

      if (!this.dragging) {
        return;
      }

      var target = document.elementFromPoint(event.clientX, event.clientY);

      var dragStopEvent = new _sensorEvent.DragStopSensorEvent({
        clientX: event.clientX,
        clientY: event.clientY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragStopEvent);

      this.currentContainer = null;
      this.dragging = false;
    }
  }]);
  return MouseSensor;
}(_sensor2.default);

exports.default = MouseSensor;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(3);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(2);

var _inherits3 = _interopRequireDefault(_inherits2);

var _sensor = __webpack_require__(19);

var _sensor2 = _interopRequireDefault(_sensor);

var _utils = __webpack_require__(13);

var _sensorEvent = __webpack_require__(18);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TouchSensor = function (_Sensor) {
  (0, _inherits3.default)(TouchSensor, _Sensor);

  function TouchSensor() {
    var containers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, TouchSensor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TouchSensor.__proto__ || Object.getPrototypeOf(TouchSensor)).call(this, containers, options));

    _this.dragging = false;
    _this.currentContainer = null;
    _this.currentScrollableParent = null;

    _this._onTouchStart = _this._onTouchStart.bind(_this);
    _this._onTouchHold = _this._onTouchHold.bind(_this);
    _this._onTouchEnd = _this._onTouchEnd.bind(_this);
    _this._onTouchMove = _this._onTouchMove.bind(_this);
    _this._onScroll = _this._onScroll.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(TouchSensor, [{
    key: 'attach',
    value: function attach() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.containers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var container = _step.value;

          container.addEventListener('touchstart', this._onTouchStart, false);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      document.addEventListener('touchend', this._onTouchEnd, false);
      document.addEventListener('touchcancel', this._onTouchEnd, false);
      document.addEventListener('touchmove', this._onTouchMove, false);
    }
  }, {
    key: 'detach',
    value: function detach() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.containers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var container = _step2.value;

          container.removeEventListener('touchstart', this._onTouchStart, false);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      document.removeEventListener('touchend', this._onTouchEnd, false);
      document.removeEventListener('touchcancel', this._onTouchEnd, false);
      document.removeEventListener('touchmove', this._onTouchMove, false);
    }
  }, {
    key: '_onScroll',
    value: function _onScroll() {
      // Cancel potential drag and allow scroll on iOS or other touch devices
      clearTimeout(this.tapTimeout);
    }
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(event) {
      event.preventDefault();
      var container = event.currentTarget;

      // detect if body is scrolling on iOS
      document.addEventListener('scroll', this._onScroll);
      container.addEventListener('contextmenu', _onContextMenu);

      this.currentScrollableParent = (0, _utils.closest)(container, function (element) {
        return element.offsetHeight < element.scrollHeight;
      });

      if (this.currentScrollableParent) {
        this.currentScrollableParent.addEventListener('scroll', this._onScroll);
      }

      this.tapTimeout = setTimeout(this._onTouchHold(event, container), this.options.delay);
    }
  }, {
    key: '_onTouchHold',
    value: function _onTouchHold(event, container) {
      var _this2 = this;

      return function () {
        var touch = event.touches[0] || event.changedTouches[0];
        var target = event.target;

        var dragStartEvent = new _sensorEvent.DragStartSensorEvent({
          clientX: touch.pageX,
          clientY: touch.pageY,
          target: target,
          container: container,
          originalEvent: event
        });

        _this2.trigger(container, dragStartEvent);

        _this2.currentContainer = container;
        _this2.dragging = !dragStartEvent.canceled();
      };
    }
  }, {
    key: '_onTouchMove',
    value: function _onTouchMove(event) {
      if (!this.dragging) {
        return;
      }

      event.stopPropagation();

      var touch = event.touches[0] || event.changedTouches[0];
      var target = document.elementFromPoint(touch.pageX - window.scrollX, touch.pageY - window.scrollY);

      var dragMoveEvent = new _sensorEvent.DragMoveSensorEvent({
        clientX: touch.pageX,
        clientY: touch.pageY,
        target: target,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragMoveEvent);
    }
  }, {
    key: '_onTouchEnd',
    value: function _onTouchEnd(event) {
      var container = event.currentTarget;

      document.removeEventListener('scroll', this._onScroll);
      container.removeEventListener('contextmenu', _onContextMenu);

      if (this.currentScrollableParent) {
        this.currentScrollableParent.removeEventListener('scroll', this._onScroll);
      }

      clearTimeout(this.tapTimeout);

      if (!this.dragging) {
        return;
      }

      var touch = event.touches[0] || event.changedTouches[0];

      event.preventDefault();

      var dragStopEvent = new _sensorEvent.DragStopSensorEvent({
        clientX: touch.pageX,
        clientY: touch.pageY,
        target: null,
        container: this.currentContainer,
        originalEvent: event
      });

      this.trigger(this.currentContainer, dragStopEvent);

      this.currentContainer = null;
      this.dragging = false;
    }
  }]);
  return TouchSensor;
}(_sensor2.default);

exports.default = TouchSensor;


function _onContextMenu(event) {
  event.preventDefault();
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(98);
var $Object = __webpack_require__(10).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(99);
var $Object = __webpack_require__(10).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
module.exports = __webpack_require__(10).Object.setPrototypeOf;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
__webpack_require__(101);
__webpack_require__(104);
__webpack_require__(105);
module.exports = __webpack_require__(10).Symbol;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
__webpack_require__(106);
module.exports = __webpack_require__(36).f('iterator');

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(9)
  , toLength  = __webpack_require__(95)
  , toIndex   = __webpack_require__(94);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(21)
  , gOPS    = __webpack_require__(45)
  , pIE     = __webpack_require__(29);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5).document && document.documentElement;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(38);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(38);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(28)
  , descriptor     = __webpack_require__(22)
  , setToStringTag = __webpack_require__(30)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(12)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(21)
  , toIObject = __webpack_require__(9);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(23)('meta')
  , isObject = __webpack_require__(16)
  , has      = __webpack_require__(7)
  , setDesc  = __webpack_require__(8).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(20)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(8)
  , anObject = __webpack_require__(14)
  , getKeys  = __webpack_require__(21);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(9)
  , gOPN      = __webpack_require__(44).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(7)
  , toObject    = __webpack_require__(96)
  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(16)
  , anObject = __webpack_require__(14);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(39)(Function.call, __webpack_require__(43).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33)
  , defined   = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(33)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(79)
  , step             = __webpack_require__(86)
  , Iterators        = __webpack_require__(26)
  , toIObject        = __webpack_require__(9);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(42)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(15)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(28)});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(15);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(8).f});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(15);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(92).set});

/***/ }),
/* 101 */
/***/ (function(module, exports) {



/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(93)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(42)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(5)
  , has            = __webpack_require__(7)
  , DESCRIPTORS    = __webpack_require__(6)
  , $export        = __webpack_require__(15)
  , redefine       = __webpack_require__(47)
  , META           = __webpack_require__(88).KEY
  , $fails         = __webpack_require__(20)
  , shared         = __webpack_require__(32)
  , setToStringTag = __webpack_require__(30)
  , uid            = __webpack_require__(23)
  , wks            = __webpack_require__(12)
  , wksExt         = __webpack_require__(36)
  , wksDefine      = __webpack_require__(35)
  , keyOf          = __webpack_require__(87)
  , enumKeys       = __webpack_require__(81)
  , isArray        = __webpack_require__(84)
  , anObject       = __webpack_require__(14)
  , toIObject      = __webpack_require__(9)
  , toPrimitive    = __webpack_require__(34)
  , createDesc     = __webpack_require__(22)
  , _create        = __webpack_require__(28)
  , gOPNExt        = __webpack_require__(90)
  , $GOPD          = __webpack_require__(43)
  , $DP            = __webpack_require__(8)
  , $keys          = __webpack_require__(21)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(44).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(29).f  = $propertyIsEnumerable;
  __webpack_require__(45).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(27)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35)('asyncIterator');

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35)('observable');

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
var global        = __webpack_require__(5)
  , hide          = __webpack_require__(11)
  , Iterators     = __webpack_require__(26)
  , TO_STRING_TAG = __webpack_require__(12)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ })
/******/ ]);
});