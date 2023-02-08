/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 1.12.12
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"));
	else if(typeof define === 'function' && define.amd)
		define("bubblecompare", ["d3-selection"], factory);
	else if(typeof exports === 'object')
		exports["bubblecompare"] = factory(require("d3-selection"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["bubblecompare"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__10__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BubbleCompare; });
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(d3_selection__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Plugin__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(11);









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var result, Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(Derived); if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else result = Super.apply(this, arguments); return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if (typeof Proxy === "function") return !0; try { return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0; } catch (e) { return !1; } }



/**
 * Bubble compare diagram plugin.<br>
 * Compare data 3-dimensional ways: x-axis, y-axis & bubble-size.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 * @class plugin-bubblecompare
 * @requires d3-selection
 * @param {Object} options bubble compare plugin options
 * @extends Plugin
 * @return {BubbleCompare}
 * @example
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "bubble"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.bubblecompare({
 *          minR: 11,
 *          maxR: 74,
 *          expandScale: 1.1
 *        }),
 *     ]
 *  });
  * @example
 *	import {bb} from "billboard.js";
 * import BubbleCompare from "billboard.js/dist/billboardjs-plugin-bubblecompare";
 *
 * bb.generate({
 *     plugins: [
 *        new BubbleCompare({ ... })
 *     ]
 * })
 */

var BubbleCompare = /*#__PURE__*/function (_Plugin) {
  function BubbleCompare(options) {
    var _this;

    return Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, BubbleCompare), _this = _super.call(this, options), Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this, Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_this));
  }

  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(BubbleCompare, _Plugin);

  var _super = _createSuper(BubbleCompare);

  return Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(BubbleCompare, [{
    key: "$init",
    value: function $init() {
      var $$ = this.$$;
      $$.findClosest = this.findClosest.bind(this), $$.getBubbleR = this.getBubbleR.bind(this), $$.pointExpandedR = this.pointExpandedR.bind(this);
    }
  }, {
    key: "pointExpandedR",
    value: function pointExpandedR(d) {
      var baseR = this.getBubbleR(d),
          _this$options$expandS = this.options.expandScale,
          expandScale = _this$options$expandS === void 0 ? 1 : _this$options$expandS;
      return BubbleCompare.raiseFocusedBubbleLayer(d), this.changeCursorPoint(), baseR * expandScale;
    }
  }, {
    key: "changeCursorPoint",
    value: function changeCursorPoint() {
      this.$$.svg.select(".bb-event-rect").style("cursor", "pointer");
    }
  }, {
    key: "findClosest",
    value: function findClosest(values, pos) {
      var _this2 = this,
          $$ = this.$$;

      return values.filter(function (v) {
        return v && !$$.isBarType(v.id);
      }).reduce(function (acc, cur) {
        var d = $$.dist(cur, pos);
        return d < _this2.getBubbleR(cur) ? cur : acc;
      }, 0);
    }
  }, {
    key: "getBubbleR",
    value: function getBubbleR(d) {
      var _this3 = this,
          _this$options = this.options,
          minR = _this$options.minR,
          maxR = _this$options.maxR,
          curVal = this.getZData(d);

      if (!curVal) return minR;

      var _this$$$$data$targets = this.$$.data.targets.reduce(function (_ref, cur) {
        var _ref2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_ref, 2),
            accMin = _ref2[0],
            accMax = _ref2[1],
            val = _this3.getZData(cur.values[0]);

        return [Math.min(accMin, val), Math.max(accMax, val)];
      }, [1e4, 0]),
          _this$$$$data$targets2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_this$$$$data$targets, 2),
          min = _this$$$$data$targets2[0],
          max = _this$$$$data$targets2[1],
          size = min > 0 && max === min ? 0 : curVal / max;

      return Math.abs(size) * (maxR - minR) + minR;
    }
  }, {
    key: "getZData",
    value: function getZData(d) {
      return this.$$.isBubbleZType(d) ? this.$$.getBubbleZData(d.value, "z") : d.value;
    }
  }], [{
    key: "raiseFocusedBubbleLayer",
    value: function raiseFocusedBubbleLayer(d) {
      d.raise && Object(d3_selection__WEBPACK_IMPORTED_MODULE_8__["select"])(d.node().parentNode.parentNode).raise();
    }
  }]), BubbleCompare;
}(_Plugin__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]);

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(BubbleCompare, "version", "0.0.1");



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _unsupportedIterableToArray; });
/* harmony import */ var _arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _arrayLikeToArray; });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _createClass; });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _possibleConstructorReturn; });
/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


function _possibleConstructorReturn(self, call) {
  if (call && (Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(call) === "object" || typeof call === "function")) {
    return call;
  }

  return Object(_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(self);
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _typeof; });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _getPrototypeOf; });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plugin; });
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */
var Plugin = /*#__PURE__*/function () {
  /**
   * Version info string for plugin
   * @name version
   * @static
   * @memberof Plugin
   * @type {String}
   * @example
   *   bb.plugin.stanford.version;  // ex) 1.9.0
   */

  /**
   * Constructor
   * @param {Any} config config option object
   * @private
   */
  function Plugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, Plugin), this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */


  return Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Plugin, [{
    key: "$beforeInit",
    value: function $beforeInit() {}
    /**
     * Lifecycle hook for 'init' phase.
     * @private
     */

  }, {
    key: "$init",
    value: function $init() {}
    /**
     * Lifecycle hook for 'afterInit' phase.
     * @private
     */

  }, {
    key: "$afterInit",
    value: function $afterInit() {}
    /**
     * Lifecycle hook for 'redraw' phase.
     * @private
     */

  }, {
    key: "$redraw",
    value: function $redraw() {}
    /**
     * Lifecycle hook for 'willDestroy' phase.
     * @private
     */

  }, {
    key: "$willDestroy",
    value: function $willDestroy() {
      var _this = this;

      Object.keys(this).forEach(function (key) {
        _this[key] = null, delete _this[key];
      });
    }
  }]), Plugin;
}();

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Plugin, "version", "1.12.12");



/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _slicedToArray; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || Object(unsupportedIterableToArray["a" /* default */])(arr, i) || _nonIterableRest();
}

/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _inherits; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvcGx1Z2luL2J1YmJsZWNvbXBhcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5TGlrZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2dldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtc2VsZWN0aW9uXCIsXCJjb21tb25qczJcIjpcImQzLXNlbGVjdGlvblwiLFwiYW1kXCI6XCJkMy1zZWxlY3Rpb25cIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvcGx1Z2luL1BsdWdpbi5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0cy5qcyJdLCJuYW1lcyI6WyJCdWJibGVDb21wYXJlIiwib3B0aW9ucyIsIiQkIiwiZmluZENsb3Nlc3QiLCJiaW5kIiwiZ2V0QnViYmxlUiIsInBvaW50RXhwYW5kZWRSIiwiZCIsImJhc2VSIiwiZXhwYW5kU2NhbGUiLCJyYWlzZUZvY3VzZWRCdWJibGVMYXllciIsImNoYW5nZUN1cnNvclBvaW50Iiwic3ZnIiwic2VsZWN0Iiwic3R5bGUiLCJ2YWx1ZXMiLCJwb3MiLCJmaWx0ZXIiLCJ2IiwiaXNCYXJUeXBlIiwiaWQiLCJyZWR1Y2UiLCJhY2MiLCJjdXIiLCJkaXN0IiwibWluUiIsIm1heFIiLCJjdXJWYWwiLCJnZXRaRGF0YSIsImRhdGEiLCJ0YXJnZXRzIiwiYWNjTWluIiwiYWNjTWF4IiwidmFsIiwiTWF0aCIsIm1pbiIsIm1heCIsInNpemUiLCJhYnMiLCJpc0J1YmJsZVpUeXBlIiwiZ2V0QnViYmxlWkRhdGEiLCJ2YWx1ZSIsInJhaXNlIiwiZDNTZWxlY3QiLCJub2RlIiwicGFyZW50Tm9kZSIsIlBsdWdpbiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FB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O0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOzs7OztBQ3pCZTtBQUNmO0FBQ0EsQzs7QUNGOEM7QUFDWTtBQUNZO0FBQ3RCO0FBQ2pDO0FBQ2YsU0FBUyxlQUFjLFNBQVMscUJBQW9CLFlBQVkscURBQTBCLFlBQVksZ0JBQWU7QUFDckgsQzs7Ozs7Ozs7Ozs7OztBQ05lO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDOztBQ1A4QztBQUMvQjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsa0JBQWtCLGVBQWM7QUFDaEMsQyIsImZpbGUiOiJiaWxsYm9hcmRqcy1wbHVnaW4tYnViYmxlY29tcGFyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJ1YmJsZWNvbXBhcmVcIiwgW1wiZDMtc2VsZWN0aW9uXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJ1YmJsZWNvbXBhcmVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJiXCJdID0gcm9vdFtcImJiXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gPSByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXVtcImJ1YmJsZWNvbXBhcmVcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMF9fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IHtzZWxlY3QgYXMgZDNTZWxlY3R9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCBQbHVnaW4gZnJvbSBcIi4uL1BsdWdpblwiO1xuXG4vKipcbiAqIEJ1YmJsZSBjb21wYXJlIGRpYWdyYW0gcGx1Z2luLjxicj5cbiAqIENvbXBhcmUgZGF0YSAzLWRpbWVuc2lvbmFsIHdheXM6IHgtYXhpcywgeS1heGlzICYgYnViYmxlLXNpemUuXG4gKiAtICoqTk9URToqKlxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXG4gKiAtICoqUmVxdWlyZWQgbW9kdWxlczoqKlxuICogICAtIFtkMy1zZWxlY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zZWxlY3Rpb24pXG4gKiBAY2xhc3MgcGx1Z2luLWJ1YmJsZWNvbXBhcmVcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIGJ1YmJsZSBjb21wYXJlIHBsdWdpbiBvcHRpb25zXG4gKiBAZXh0ZW5kcyBQbHVnaW5cbiAqIEByZXR1cm4ge0J1YmJsZUNvbXBhcmV9XG4gKiBAZXhhbXBsZVxuICogIHZhciBjaGFydCA9IGJiLmdlbmVyYXRlKHtcbiAqICAgICBkYXRhOiB7XG4gKiAgICAgICAgY29sdW1uczogWyAuLi4gXSxcbiAqICAgICAgICB0eXBlOiBcImJ1YmJsZVwiXG4gKiAgICAgfVxuICogICAgIC4uLlxuICogICAgIHBsdWdpbnM6IFtcbiAqICAgICAgICBuZXcgYmIucGx1Z2luLmJ1YmJsZWNvbXBhcmUoe1xuICogICAgICAgICAgbWluUjogMTEsXG4gKiAgICAgICAgICBtYXhSOiA3NCxcbiAqICAgICAgICAgIGV4cGFuZFNjYWxlOiAxLjFcbiAqICAgICAgICB9KSxcbiAqICAgICBdXG4gKiAgfSk7XG4gICogQGV4YW1wbGVcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XG4gKiBpbXBvcnQgQnViYmxlQ29tcGFyZSBmcm9tIFwiYmlsbGJvYXJkLmpzL2Rpc3QvYmlsbGJvYXJkanMtcGx1Z2luLWJ1YmJsZWNvbXBhcmVcIjtcbiAqXG4gKiBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBCdWJibGVDb21wYXJlKHsgLi4uIH0pXG4gKiAgICAgXVxuICogfSlcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWJibGVDb21wYXJlIGV4dGVuZHMgUGx1Z2luIHtcblx0c3RhdGljIHZlcnNpb24gPSBgMC4wLjFgO1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JGluaXQoKSB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cblx0XHQkJC5maW5kQ2xvc2VzdCA9IHRoaXMuZmluZENsb3Nlc3QuYmluZCh0aGlzKTtcblx0XHQkJC5nZXRCdWJibGVSID0gdGhpcy5nZXRCdWJibGVSLmJpbmQodGhpcyk7XG5cdFx0JCQucG9pbnRFeHBhbmRlZFIgPSB0aGlzLnBvaW50RXhwYW5kZWRSLmJpbmQodGhpcyk7XG5cdH1cblxuXHRwb2ludEV4cGFuZGVkUihkKSB7XG5cdFx0Y29uc3QgYmFzZVIgPSB0aGlzLmdldEJ1YmJsZVIoZCk7XG5cdFx0Y29uc3Qge2V4cGFuZFNjYWxlID0gMX0gPSB0aGlzLm9wdGlvbnM7XG5cblx0XHRCdWJibGVDb21wYXJlLnJhaXNlRm9jdXNlZEJ1YmJsZUxheWVyKGQpO1xuXHRcdHRoaXMuY2hhbmdlQ3Vyc29yUG9pbnQoKTtcblxuXHRcdHJldHVybiBiYXNlUiAqIGV4cGFuZFNjYWxlO1xuXHR9XG5cblx0c3RhdGljIHJhaXNlRm9jdXNlZEJ1YmJsZUxheWVyKGQpIHtcblx0XHRkLnJhaXNlICYmIGQzU2VsZWN0KGQubm9kZSgpLnBhcmVudE5vZGUucGFyZW50Tm9kZSkucmFpc2UoKTtcblx0fVxuXG5cdGNoYW5nZUN1cnNvclBvaW50KCkge1xuXHRcdHRoaXMuJCQuc3ZnLnNlbGVjdChgLmJiLWV2ZW50LXJlY3RgKS5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIik7XG5cdH1cblxuXHRmaW5kQ2xvc2VzdCh2YWx1ZXMsIHBvcykge1xuXHRcdGNvbnN0IHskJH0gPSB0aGlzO1xuXG5cdFx0cmV0dXJuIHZhbHVlc1xuXHRcdFx0LmZpbHRlcih2ID0+IHYgJiYgISQkLmlzQmFyVHlwZSh2LmlkKSlcblx0XHRcdC5yZWR1Y2UoKGFjYywgY3VyKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGQgPSAkJC5kaXN0KGN1ciwgcG9zKTtcblxuXHRcdFx0XHRyZXR1cm4gZCA8IHRoaXMuZ2V0QnViYmxlUihjdXIpID8gY3VyIDogYWNjO1xuXHRcdFx0fSwgMCk7XG5cdH1cblxuXHRnZXRCdWJibGVSKGQpIHtcblx0XHRjb25zdCB7bWluUiwgbWF4Un0gPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgY3VyVmFsID0gdGhpcy5nZXRaRGF0YShkKTtcblxuXHRcdGlmICghY3VyVmFsKSByZXR1cm4gbWluUjtcblxuXHRcdGNvbnN0IFttaW4sIG1heF0gPSB0aGlzLiQkLmRhdGEudGFyZ2V0cy5yZWR1Y2UoXG5cdFx0XHQoW2FjY01pbiwgYWNjTWF4XSwgY3VyKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHZhbCA9IHRoaXMuZ2V0WkRhdGEoY3VyLnZhbHVlc1swXSk7XG5cblx0XHRcdFx0cmV0dXJuIFtNYXRoLm1pbihhY2NNaW4sIHZhbCksIE1hdGgubWF4KGFjY01heCwgdmFsKV07XG5cdFx0XHR9LFxuXHRcdFx0WzEwMDAwLCAwXVxuXHRcdCk7XG5cdFx0Y29uc3Qgc2l6ZSA9IG1pbiA+IDAgJiYgbWF4ID09PSBtaW4gPyAwIDogY3VyVmFsIC8gbWF4O1xuXG5cdFx0cmV0dXJuIE1hdGguYWJzKHNpemUpICogKG1heFIgLSBtaW5SKSArIG1pblI7XG5cdH1cblxuXHRnZXRaRGF0YShkKSB7XG5cdFx0cmV0dXJuIHRoaXMuJCQuaXNCdWJibGVaVHlwZShkKSA/XG5cdFx0XHR0aGlzLiQkLmdldEJ1YmJsZVpEYXRhKGQudmFsdWUsIFwielwiKSA6XG5cdFx0XHRkLnZhbHVlO1xuXHR9XG59XG4iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5XCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuLi8uLi9oZWxwZXJzL2VzbS90eXBlb2ZcIjtcbmltcG9ydCBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgZnJvbSBcIi4vYXNzZXJ0VGhpc0luaXRpYWxpemVkXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG4gIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgcmV0dXJuIGNhbGw7XG4gIH1cblxuICByZXR1cm4gYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMF9fOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQmFzZSBjbGFzcyB0byBnZW5lcmF0ZSBiaWxsYm9hcmQuanMgcGx1Z2luXG4gKiBAY2xhc3MgUGx1Z2luXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG5cdC8qKlxuXHQgKiBWZXJzaW9uIGluZm8gc3RyaW5nIGZvciBwbHVnaW5cblx0ICogQG5hbWUgdmVyc2lvblxuXHQgKiBAc3RhdGljXG5cdCAqIEBtZW1iZXJvZiBQbHVnaW5cblx0ICogQHR5cGUge1N0cmluZ31cblx0ICogQGV4YW1wbGVcblx0ICogICBiYi5wbHVnaW4uc3RhbmZvcmQudmVyc2lvbjsgIC8vIGV4KSAxLjkuMFxuXHQgKi9cblx0c3RhdGljIHZlcnNpb24gPSBcIjEuMTIuMTJcIjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtBbnl9IGNvbmZpZyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aEhvbGVzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5TGltaXQgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheVwiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlUmVzdCBmcm9tIFwiLi9ub25JdGVyYWJsZVJlc3RcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuXG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59IiwiaW1wb3J0IHNldFByb3RvdHlwZU9mIGZyb20gXCIuL3NldFByb3RvdHlwZU9mXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==