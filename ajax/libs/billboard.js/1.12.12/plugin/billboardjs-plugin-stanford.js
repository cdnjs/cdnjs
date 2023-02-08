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
		module.exports = factory(require("d3-selection"), require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else if(typeof define === 'function' && define.amd)
		define("stanford", ["d3-selection", "d3-interpolate", "d3-color", "d3-scale", "d3-brush", "d3-axis", "d3-format"], factory);
	else if(typeof exports === 'object')
		exports["stanford"] = factory(require("d3-selection"), require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["stanford"] = factory(root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__13__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__15__, __WEBPACK_EXTERNAL_MODULE__16__, __WEBPACK_EXTERNAL_MODULE__17__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
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
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__16__;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__17__;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ stanford_Stanford; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(arrayLikeToArray["a" /* default */])(arr);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || Object(unsupportedIterableToArray["a" /* default */])(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(8);

// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(12);

// EXTERNAL MODULE: external {"commonjs":"d3-color","commonjs2":"d3-color","amd":"d3-color","root":"d3"}
var external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_ = __webpack_require__(13);

// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(14);

// CONCATENATED MODULE: ./src/config/classes.js
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ var classes = ({
  arc: "bb-arc",
  arcLabelLine: "bb-arc-label-line",
  arcs: "bb-arcs",
  area: "bb-area",
  areas: "bb-areas",
  axis: "bb-axis",
  axisX: "bb-axis-x",
  axisXLabel: "bb-axis-x-label",
  axisY: "bb-axis-y",
  axisY2: "bb-axis-y2",
  axisY2Label: "bb-axis-y2-label",
  axisYLabel: "bb-axis-y-label",
  bar: "bb-bar",
  bars: "bb-bars",
  brush: "bb-brush",
  button: "bb-button",
  buttonZoomReset: "bb-zoom-reset",
  chart: "bb-chart",
  chartArc: "bb-chart-arc",
  chartArcs: "bb-chart-arcs",
  chartArcsBackground: "bb-chart-arcs-background",
  chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
  chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
  chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
  chartArcsTitle: "bb-chart-arcs-title",
  chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
  chartBar: "bb-chart-bar",
  chartBars: "bb-chart-bars",
  chartLine: "bb-chart-line",
  chartLines: "bb-chart-lines",
  chartRadar: "bb-chart-radar",
  chartRadars: "bb-chart-radars",
  chartText: "bb-chart-text",
  chartTexts: "bb-chart-texts",
  circle: "bb-circle",
  circles: "bb-circles",
  colorPattern: "bb-color-pattern",
  colorScale: "bb-colorscale",
  defocused: "bb-defocused",
  dragarea: "bb-dragarea",
  empty: "bb-empty",
  eventRect: "bb-event-rect",
  eventRects: "bb-event-rects",
  eventRectsMultiple: "bb-event-rects-multiple",
  eventRectsSingle: "bb-event-rects-single",
  focused: "bb-focused",
  gaugeValue: "bb-gauge-value",
  grid: "bb-grid",
  gridLines: "bb-grid-lines",
  legendBackground: "bb-legend-background",
  legendItem: "bb-legend-item",
  legendItemEvent: "bb-legend-item-event",
  legendItemFocused: "bb-legend-item-focused",
  legendItemHidden: "bb-legend-item-hidden",
  legendItemPoint: "bb-legend-item-point",
  legendItemTile: "bb-legend-item-tile",
  level: "bb-level",
  levels: "bb-levels",
  line: "bb-line",
  lines: "bb-lines",
  region: "bb-region",
  regions: "bb-regions",
  selectedCircle: "bb-selected-circle",
  selectedCircles: "bb-selected-circles",
  shape: "bb-shape",
  shapes: "bb-shapes",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions",
  target: "bb-target",
  text: "bb-text",
  texts: "bb-texts",
  title: "bb-title",
  tooltip: "bb-tooltip",
  tooltipContainer: "bb-tooltip-container",
  tooltipName: "bb-tooltip-name",
  xgrid: "bb-xgrid",
  xgridFocus: "bb-xgrid-focus",
  xgridLine: "bb-xgrid-line",
  xgridLines: "bb-xgrid-lines",
  xgrids: "bb-xgrids",
  ygrid: "bb-ygrid",
  ygridFocus: "bb-ygrid-focus",
  ygridLine: "bb-ygrid-line",
  ygridLines: "bb-ygrid-lines",
  ygrids: "bb-ygrids",
  zoomBrush: "bb-zoom-brush",
  zoomRect: "bb-zoom-rect",
  EXPANDED: "_expanded_",
  SELECTED: "_selected_",
  INCLUDED: "_included_",
  TextOverlapping: "text-overlapping"
});
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(7);

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(10);

// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(15);

// CONCATENATED MODULE: ./src/internals/browser.js
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Window object
 * @module
 * @ignore
 */

/* eslint-disable no-new-func, no-undef */
var win = function () {
  var def = function (o) {
    return typeof o !== "undefined" && o;
  };

  return def(self) || def(window) || def(global) || def(globalThis) || Function("return this")();
}(),
    doc = win && win.document;
/* eslint-enable no-new-func, no-undef */



// CONCATENATED MODULE: ./src/internals/util.js



/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */





var isValue = function (v) {
  return v || v === 0;
},
    isFunction = function (v) {
  return typeof v === "function";
},
    isString = function (v) {
  return typeof v === "string";
},
    isNumber = function (v) {
  return typeof v === "number";
},
    isUndefined = function (v) {
  return typeof v === "undefined";
},
    isDefined = function (v) {
  return typeof v !== "undefined";
},
    isBoolean = function (v) {
  return typeof v === "boolean";
},
    ceil10 = function (v) {
  return Math.ceil(v / 10) * 10;
},
    asHalfPixel = function (n) {
  return Math.ceil(n) + .5;
},
    diffDomain = function (d) {
  return d[1] - d[0];
},
    isObjectType = function (v) {
  return Object(esm_typeof["a" /* default */])(v) === "object";
},
    isEmpty = function (o) {
  return isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
},
    notEmpty = function (o) {
  return !isEmpty(o);
},
    isArray = function (arr) {
  return arr && arr.constructor === Array;
},
    isObject = function (obj) {
  return obj && !obj.nodeType && isObjectType(obj) && !isArray(obj);
},
    getOption = function (options, key, defaultValue) {
  return isDefined(options[key]) ? options[key] : defaultValue;
},
    hasValue = function (dict, value) {
  var found = !1;
  return Object.keys(dict).forEach(function (key) {
    return dict[key] === value && (found = !0);
  }), found;
},
    callFn = function (fn) {
  for (var isFn = isFunction(fn), _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];

  return isFn && fn.call.apply(fn, args), isFn;
},
    sanitise = function (str) {
  return isString(str) ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
},
    setTextValue = function (node, text) {
  var dy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [-1, 1],
      toMiddle = !!(arguments.length > 3 && arguments[3] !== undefined) && arguments[3];
  if (node && isString(text)) if (text.indexOf("\n") === -1) node.text(text);else {
    var diff = [node.text(), text].map(function (v) {
      return v.replace(/[\s\n]/g, "");
    });

    if (diff[0] !== diff[1]) {
      var multiline = text.split("\n"),
          len = toMiddle ? multiline.length - 1 : 1;
      node.html(""), multiline.forEach(function (v, i) {
        node.append("tspan").attr("x", 0).attr("dy", "".concat(i === 0 ? dy[0] * len : dy[1], "em")).text(v);
      });
    }
  }
},
    getRectSegList = function (path) {
  /*
   * seg1 ---------- seg2
   *   |               |
   *   |               |
   *   |               |
   * seg0 ---------- seg3
   * */
  var _path$getBBox = path.getBBox(),
      x = _path$getBBox.x,
      y = _path$getBBox.y,
      width = _path$getBBox.width,
      height = _path$getBBox.height;

  return [{
    x: x,
    y: y + height
  }, // seg0
  {
    x: x,
    y: y
  }, // seg1
  {
    x: x + width,
    y: y
  }, // seg2
  {
    x: x + width,
    y: y + height
  } // seg3
  ];
},
    getPathBox = function (path) {
  var _path$getBoundingClie = path.getBoundingClientRect(),
      width = _path$getBoundingClie.width,
      height = _path$getBoundingClie.height,
      items = getRectSegList(path),
      x = items[0].x,
      y = Math.min(items[0].y, items[1].y);

  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
},
    getBrushSelection = function (ctx) {
  var selection = null,
      event = external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["event"],
      main = ctx.context || ctx.main;
  return event && event.constructor.name === "BrushEvent" ? selection = event.selection : main && (selection = main.select(".".concat(classes.brush)).node()) && (selection = Object(external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_["brushSelection"])(selection)), selection;
},
    getBoundingRect = function (node) {
  return node.rect || (node.rect = node.getBoundingClientRect());
},
    getRandom = function () {
  var asStr = !(arguments.length > 0 && arguments[0] !== undefined) || arguments[0];
  return Math.random() + (asStr ? "" : 0);
},
    brushEmpty = function (ctx) {
  var selection = getBrushSelection(ctx);
  return !selection || selection[0] === selection[1];
},
    extend = function () {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      source = arguments.length > 1 ? arguments[1] : undefined;

  for (var p in source) target[p] = source[p];

  return target;
},
    capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
},
    toArray = function (v) {
  return [].slice.call(v);
},
    getCssRules = function (styleSheets) {
  var rules = [];
  return styleSheets.forEach(function (sheet) {
    try {
      sheet.cssRules && sheet.cssRules.length && (rules = rules.concat(toArray(sheet.cssRules)));
    } catch (e) {
      console.error("Error while reading rules from ".concat(sheet.href, ": ").concat(e.toString()));
    }
  }), rules;
},
    getTranslation = function (node) {
  var transform = node ? node.transform : null,
      baseVal = transform && transform.baseVal;
  return baseVal && baseVal.numberOfItems ? baseVal.getItem(0).matrix : {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0
  };
},
    getUnique = function (data) {
  var isDate = data[0] instanceof Date,
      d = (isDate ? data.map(Number) : data).filter(function (v, i, self) {
    return self.indexOf(v) === i;
  });
  return isDate ? d.map(function (v) {
    return new Date(v);
  }) : d;
},
    mergeArray = function (arr) {
  return arr && arr.length ? arr.reduce(function (p, c) {
    return p.concat(c);
  }) : [];
},
    mergeObj = function (_mergeObj) {
  function mergeObj() {
    return _mergeObj.apply(this, arguments);
  }

  return mergeObj.toString = function () {
    return _mergeObj.toString();
  }, mergeObj;
}(function (target) {
  for (var _len2 = arguments.length, objectN = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) objectN[_key2 - 1] = arguments[_key2];

  if (!objectN.length || objectN.length === 1 && !objectN[0]) return target;
  var source = objectN.shift();
  return isObject(target) && isObject(source) && Object.keys(source).forEach(function (key) {
    var value = source[key];
    isObject(value) ? (!target[key] && (target[key] = {}), target[key] = mergeObj(target[key], value)) : target[key] = isArray(value) ? value.concat() : value;
  }), mergeObj.apply(void 0, [target].concat(objectN));
}),
    sortValue = function (data) {
  var fn,
      isAsc = !(arguments.length > 1 && arguments[1] !== undefined) || arguments[1];
  return data[0] instanceof Date ? fn = isAsc ? function (a, b) {
    return a - b;
  } : function (a, b) {
    return b - a;
  } : isAsc && !data.every(isNaN) ? fn = function (a, b) {
    return a - b;
  } : !isAsc && (fn = function (a, b) {
    return a > b && -1 || a < b && 1 || a === b && 0;
  }), data.concat().sort(fn);
},
    getMinMax = function (type, data) {
  var res = data.filter(function (v) {
    return notEmpty(v);
  });
  return res.length ? isNumber(res[0]) ? res = Math[type].apply(Math, _toConsumableArray(res)) : res[0] instanceof Date && (res = sortValue(res, type === "min")[0]) : res = undefined, res;
},
    getRange = function (start, end) {
  for (var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1, res = [], n = Math.max(0, Math.ceil((end - start) / step)) | 0, i = start; i < n; i++) res.push(start + i * step);

  return res;
},
    emulateEvent = {
  mouse: function () {
    var getParams = function () {
      return {
        bubbles: !1,
        cancelable: !1,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0
      };
    };

    try {
      return new MouseEvent("t"), function (el, eventType) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getParams();
        el.dispatchEvent(new MouseEvent(eventType, params));
      };
    } catch (e) {
      // Polyfills DOM4 MouseEvent
      return function (el, eventType) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getParams(),
            mouseEvent = doc.createEvent("MouseEvent");
        mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0, // the event's mouse click count
        params.screenX, params.screenY, params.clientX, params.clientY, !1, !1, !1, !1, 0, null), el.dispatchEvent(mouseEvent);
      };
    }
  }(),
  touch: function touch(el, eventType, params) {
    var touchObj = new Touch(mergeObj({
      identifier: Date.now(),
      target: el,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: .5
    }, params));
    el.dispatchEvent(new TouchEvent(eventType, {
      cancelable: !0,
      bubbles: !0,
      shiftKey: !0,
      touches: [touchObj],
      targetTouches: [],
      changedTouches: [touchObj]
    }));
  }
},
    tplProcess = function (tpl, data) {
  var res = tpl;

  for (var x in data) res = res.replace(new RegExp("{=".concat(x, "}"), "g"), data[x]);

  return res;
};


// EXTERNAL MODULE: ./src/plugin/Plugin.js
var Plugin = __webpack_require__(11);

// CONCATENATED MODULE: ./src/plugin/stanford/Options.js


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Stanford diagram plugin option class
 * @class StanfordOptions
 * @param {Options} options Stanford plugin options
 * @extends Plugin
 * @return {StanfordOptions}
 * @private
 */
var Options_Options = function Options() {
  return Object(classCallCheck["a" /* default */])(this, Options), {
    /**
     * Set the color of the color scale. This function receives a value between 0 and 1, and should return a color.
     * @name colors
     * @memberof plugin-stanford
     * @type {Function}
     * @default undefined
     * @example
     *   colors: d3.interpolateHslLong(
     *      d3.hsl(250, 1, 0.5), d3.hsl(0, 1, 0.5)
     *   )
     */
    colors: undefined,

    /**
     * Specify the key of epochs values in the data.
     * @name epochs
     * @memberof plugin-stanford
     * @type {Array}
     * @default []
     * @example
     * 	epochs: [ 1, 1, 2, 2, ... ]
    */
    epochs: [],

    /**
     * Show additional lines anywhere on the chart.
     * - Each line object should consist with following options:
     *
    	 * | Key | Type | Description |
     * | --- | --- | --- |
     * | x1 | Number | Starting position on the x axis |
     * | y1 | Number | Starting position on the y axis |
     * | x2 | Number | Ending position on the x axis  |
     * | y2 | Number | Ending position on the y axis |
     * | class | String | Optional value. Set a custom css class to this line. |
     * @type {Array}
     * @memberof plugin-stanford
     * @default []
     * @example
     *   lines: [
     *       { x1: 0, y1: 0, x2: 65, y2: 65, class: "line1" },
     *       { x1: 0, x2: 65, y1: 40, y2: 40, class: "line2" }
     *   ]
     */
    lines: [],

    /**
     * Set scale values
     * @name scale
     * @memberof plugin-stanford
     * @type {Object}
    	 * @property {Number} [scale.min=undefined] Minimum value of the color scale. Default: lowest value in epochs
     * @property {Number} [scale.max=undefined] Maximum value of the color scale. Default: highest value in epochs
     * @property {Number} [scale.width=20] Width of the color scale
     * @property {String|Function} [scale.format=undefined] Format of the axis of the color scale. Use 'pow10' to format as powers of 10 or a custom function. Example: d3.format("d")
     * @example
     *  scale: {
     *    max: 10000,
     *    min: 1,
     *    width: 500,
     *
     *    // specify 'pow10' to format as powers of 10
     *    format: "pow10",
     *
     *    // or specify a format function
     *    format: function(x) {
     *    	return x +"%";
     *    }
     *  },
     */
    scale_min: undefined,
    scale_max: undefined,
    scale_width: 20,
    scale_format: undefined,

    /**
     * The padding for color scale element
     * @name padding
     * @memberof plugin-stanford
     * @type {Object}
     * @property {Number} [padding.top=0] Top padding value.
     * @property {Number} [padding.right=0] Right padding value.
     * @property {Number} [padding.bottom=0] Bottom padding value.
     * @property {Number} [padding.left=0] Left padding value.
     * @example
     *  padding: {
     *     top: 15,
     *     right: 0,
     *     bottom: 0,
     *     left: 0
     *  },
     */
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,

    /**
     * Show additional regions anywhere on the chart.
     * - Each region object should consist with following options:
     *
     *   | Key | Type | Default | Attributes | Description |
     *   | --- | --- | --- | --- | --- |
     *   | points | Array |  | | Accepts a group of objects that has x and y.<br>These points should be added in a counter-clockwise fashion to make a closed polygon. |
     *   | opacity | Number | `0.2` | &lt;optional> | Sets the opacity of the region as value between 0 and 1 |
     *   | text | Function |  | &lt;optional> | This function receives a value and percentage of the number of epochs in this region.<br>Return a string to place text in the middle of the region. |
     *   | class | String | | &lt;optional> | Se a custom css class to this region, use the fill property in css to set a background color. |
     * @name regions
     * @memberof plugin-stanford
     * @type {Array}
     * @default []
     * @example
     *   regions: [
     *       {
     *           points: [ // add points counter-clockwise
     *               { x: 0, y: 0 },
     *               { x: 40, y: 40 },
     *               { x: 0, y: 40 },
     *           ],
     *           text: function (value, percentage) {
     *               return `Normal Operations: ${value} (${percentage}%)`;
     *           },
     *           opacity: 0.2, // 0 to 1
     *           class: "test-polygon1"
    	 *       },
     *       ...
     *   ]
     */
    regions: []
  };
};


// CONCATENATED MODULE: ./src/plugin/stanford/classes.js
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ var stanford_classes = ({
  colorScale: "bb-colorscale",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions"
});
// CONCATENATED MODULE: ./src/plugin/stanford/util.js
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
function pointInRegion(point, region) {
  // thanks to: http://bl.ocks.org/bycoffe/5575904
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  var x = point.x,
      y = point.value,
      inside = !1;

  for (var i = 0, j = region.length - 1; i < region.length; j = i++) {
    var xi = region[i].x,
        yi = region[i].y,
        xj = region[j].x,
        yj = region[j].y;
    yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi && (inside = !inside);
  }

  return inside;
}

function compareEpochs(a, b) {
  return a.epochs < b.epochs ? -1 : a.epochs > b.epochs ? 1 : 0;
}

function getRegionArea(points) {
  // thanks to: https://stackoverflow.com/questions/16282330/find-centerpoint-of-polygon-in-javascript
  for (var point1, point2, area = 0, i = 0, l = points.length, j = l - 1; i < l; j = i, i++) point1 = points[i], point2 = points[j], area += point1.x * point2.y, area -= point1.y * point2.x;

  return area /= 2, area;
}

function getCentroid(points) {
  for (var f, area = getRegionArea(points), x = 0, y = 0, i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
    var _point = points[i],
        _point2 = points[j];
    f = _point.x * _point2.y - _point2.x * _point.y, x += (_point.x + _point2.x) * f, y += (_point.y + _point2.y) * f;
  }

  return f = area * 6, {
    x: x / f,
    y: y / f
  };
}


// CONCATENATED MODULE: ./src/plugin/stanford/Elements.js



/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



/**
 * Stanford diagram plugin element class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */

var Elements_Elements = /*#__PURE__*/function () {
  function Elements(owner) {
    Object(classCallCheck["a" /* default */])(this, Elements), this.owner = owner;
    // MEMO: Avoid blocking eventRect
    var elements = owner.$$.main.select(".bb-chart").append("g").attr("class", stanford_classes.stanfordElements);
    elements.append("g").attr("class", stanford_classes.stanfordLines), elements.append("g").attr("class", stanford_classes.stanfordRegions);
  }

  return Object(createClass["a" /* default */])(Elements, [{
    key: "updateStanfordLines",
    value: function updateStanfordLines(duration) {
      var $$ = this.owner.$$,
          main = $$.main,
          config = $$.config,
          isRotated = config.axis_rotated,
          xvCustom = this.xvCustom.bind($$),
          yvCustom = this.yvCustom.bind($$),
          stanfordLine = main.select(".".concat(stanford_classes.stanfordLines)).style("shape-rendering", "geometricprecision").selectAll(".".concat(stanford_classes.stanfordLine)).data(this.owner.config.lines);
      stanfordLine.exit().transition().duration(duration).style("opacity", "0").remove();
      // enter
      var stanfordLineEnter = stanfordLine.enter().append("g");
      stanfordLineEnter.append("line").style("opacity", "0"), stanfordLineEnter.merge(stanfordLine).attr("class", function (d) {
        return stanford_classes.stanfordLine + (d["class"] ? " ".concat(d["class"]) : "");
      }).select("line").transition().duration(duration).attr("x1", function (d) {
        return isRotated ? yvCustom(d, "y1") : xvCustom(d, "x1");
      }).attr("x2", function (d) {
        return isRotated ? yvCustom(d, "y2") : xvCustom(d, "x2");
      }).attr("y1", function (d) {
        return isRotated ? xvCustom(d, "x1") : yvCustom(d, "y1");
      }).attr("y2", function (d) {
        return isRotated ? xvCustom(d, "x2") : yvCustom(d, "y2");
      }).transition().style("opacity", "1");
    }
  }, {
    key: "updateStanfordRegions",
    value: function updateStanfordRegions(duration) {
      var $$ = this.owner.$$,
          main = $$.main,
          config = $$.config,
          isRotated = config.axis_rotated,
          xvCustom = this.xvCustom.bind($$),
          yvCustom = this.yvCustom.bind($$),
          countPointsInRegion = this.owner.countEpochsInRegion.bind($$),
          stanfordRegion = main.select(".".concat(stanford_classes.stanfordRegions)).selectAll(".".concat(stanford_classes.stanfordRegion)).data(this.owner.config.regions);
      stanfordRegion.exit().transition().duration(duration).style("opacity", "0").remove();
      // enter
      var stanfordRegionEnter = stanfordRegion.enter().append("g");
      stanfordRegionEnter.append("polygon").style("opacity", "0"), stanfordRegionEnter.append("text").attr("transform", isRotated ? "rotate(-90)" : "").style("opacity", "0"), stanfordRegion = stanfordRegionEnter.merge(stanfordRegion), stanfordRegion.attr("class", function (d) {
        return stanford_classes.stanfordRegion + (d["class"] ? " ".concat(d["class"]) : "");
      }).select("polygon").transition().duration(duration).attr("points", function (d) {
        return d.points.map(function (value) {
          return [isRotated ? yvCustom(value, "y") : xvCustom(value, "x"), isRotated ? xvCustom(value, "x") : yvCustom(value, "y")].join(",");
        }).join(" ");
      }).transition().style("opacity", function (d) {
        return (d.opacity ? d.opacity : .2) + "";
      }), stanfordRegion.select("text").transition().duration(duration).attr("x", function (d) {
        return isRotated ? yvCustom(getCentroid(d.points), "y") : xvCustom(getCentroid(d.points), "x");
      }).attr("y", function (d) {
        return isRotated ? xvCustom(getCentroid(d.points), "x") : yvCustom(getCentroid(d.points), "y");
      }).text(function (d) {
        if (d.text) {
          var _countPointsInRegion = countPointsInRegion(d.points),
              value = _countPointsInRegion.value,
              percentage = _countPointsInRegion.percentage;

          return d.text(value, percentage);
        }

        return "";
      }).attr("text-anchor", "middle").attr("dominant-baseline", "middle").transition().style("opacity", "1");
    }
  }, {
    key: "updateStanfordElements",
    value: function updateStanfordElements() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.updateStanfordLines(duration), this.updateStanfordRegions(duration);
    }
  }, {
    key: "xvCustom",
    value: function xvCustom(d, xyValue) {
      var $$ = this,
          value = xyValue ? d[xyValue] : $$.getBaseValue(d);
      return $$.isTimeSeries() ? value = $$.parseDate(value) : $$.isCategorized() && isString(value) && (value = $$.config.axis_x_categories.indexOf(d.value)), Math.ceil($$.x(value));
    }
  }, {
    key: "yvCustom",
    value: function yvCustom(d, xyValue) {
      var $$ = this,
          yScale = d.axis && d.axis === "y2" ? $$.y2 : $$.y,
          value = xyValue ? d[xyValue] : $$.getBaseValue(d);
      return Math.ceil(yScale(value));
    }
  }]), Elements;
}();


// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(16);

// EXTERNAL MODULE: external {"commonjs":"d3-format","commonjs2":"d3-format","amd":"d3-format","root":"d3"}
var external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_ = __webpack_require__(17);

// CONCATENATED MODULE: ./src/plugin/stanford/ColorScale.js



/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */





/**
 * Stanford diagram plugin color scale class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */

var ColorScale_ColorScale = /*#__PURE__*/function () {
  function ColorScale(owner) {
    Object(classCallCheck["a" /* default */])(this, ColorScale), this.owner = owner;
  }

  return Object(createClass["a" /* default */])(ColorScale, [{
    key: "drawColorScale",
    value: function drawColorScale() {
      var $$ = this.owner.$$,
          config = this.owner.config,
          target = $$.data.targets[0],
          height = $$.height - config.padding_bottom - config.padding_top,
          barWidth = config.scale_width,
          barHeight = 5,
          points = getRange(config.padding_bottom, height, barHeight),
          inverseScale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleSequential"])(target.colors).domain([points[points.length - 1], points[0]]);
      this.colorScale && this.colorScale.remove(), this.colorScale = $$.svg.append("g").attr("width", 50).attr("height", height).attr("class", stanford_classes.colorScale), this.colorScale.append("g").attr("transform", "translate(0, ".concat(config.padding_top, ")")).selectAll("bars").data(points).enter().append("rect").attr("y", function (d, i) {
        return i * barHeight;
      }).attr("x", 0).attr("width", barWidth).attr("height", barHeight).attr("fill", function (d) {
        return inverseScale(d);
      });
      // Legend Axis
      var axisScale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleLog"])().domain([target.minEpochs, target.maxEpochs]).range([points[0] + config.padding_top + points[points.length - 1] + barHeight - 1, points[0] + config.padding_top]),
          legendAxis = Object(external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_["axisRight"])(axisScale),
          scaleFormat = config.scale_format;
      scaleFormat === "pow10" ? legendAxis.tickValues([1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7]) : isFunction(scaleFormat) ? legendAxis.tickFormat(scaleFormat) : legendAxis.tickFormat(Object(external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_["format"])("d"));
      // Draw Axis
      var axis = this.colorScale.append("g").attr("class", "legend axis").attr("transform", "translate(".concat(barWidth, ",0)")).call(legendAxis);
      scaleFormat === "pow10" && axis.selectAll(".tick text").text(null).filter(function (d) {
        return d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10 - 1e-12)) === 1;
      }) // Power of Ten
      .text(10).append("tspan").attr("dy", "-.7em") // https://bl.ocks.org/mbostock/6738229
      .text(function (d) {
        return Math.round(Math.log(d) / Math.LN10);
      }), this.colorScale.attr("transform", "translate(".concat($$.currentWidth - this.xForColorScale(), ", 0)"));
    }
  }, {
    key: "xForColorScale",
    value: function xForColorScale() {
      return this.owner.config.padding_right + this.colorScale.node().getBBox().width;
    }
  }, {
    key: "getColorScalePadding",
    value: function getColorScalePadding() {
      return this.xForColorScale() + this.owner.config.padding_left + 20;
    }
  }]), ColorScale;
}();


// CONCATENATED MODULE: ./src/plugin/stanford/index.js








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var result, Super = Object(getPrototypeOf["a" /* default */])(Derived); if (hasNativeReflectConstruct) { var NewTarget = Object(getPrototypeOf["a" /* default */])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else result = Super.apply(this, arguments); return Object(possibleConstructorReturn["a" /* default */])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if (typeof Proxy === "function") return !0; try { return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0; } catch (e) { return !1; } }

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */










/**
 * Stanford diagram plugin
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 *   - Is preferable use `scatter` as data.type
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 *   - [d3-interpolate](https://github.com/d3/d3-interpolate)
 *   - [d3-color](https://github.com/d3/d3-color)
 *   - [d3-scale](https://github.com/d3/d3-scale)
 *   - [d3-brush](https://github.com/d3/d3-brush)
 *   - [d3-axis](https://github.com/d3/d3-axis)
 *   - [d3-format](https://github.com/d3/d3-format)
 * @class plugin-stanford
 * @requires d3-selection
 * @requires d3-interpolate
 * @requires d3-color
 * @requires d3-scale
 * @requires d3-brush
 * @requires d3-axis
 * @requires d3-format
 * @param {Object} options Stanford plugin options
 * @extends Plugin
 * @return {Stanford}
 * @example
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "scatter"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.stanford({
 *           colors: d3.interpolateHslLong(
 *              d3.hsl(250, 1, 0.5), d3.hsl(0, 1, 0.5)
 *           ),
 *           epochs: [ 1, 1, 2, 2, ... ],
 *           lines: [
 *                  { x1: 0, y1: 0, x2: 65, y2: 65, class: "line1" },
 *                  { x1: 0, x2: 65, y1: 40, y2: 40, class: "line2" }
 *           ],
 *           scale: {
 *           	max: 10000,
 *             	min: 1,
 *           	width: 500,
 *             	format: 'pow10',
 *           },
 *           padding: {
 *           	top: 15,
 *           	right: 0,
 *           	bottom: 0,
 *           	left: 0
 *           },
 *           regions: [
 *           	{
 *               	points: [ // add points counter-clockwise
 *               	    { x: 0, y: 0 },
 *               	    { x: 40, y: 40 },
 *               	    { x: 0, y: 40 }
 *               	],
 *               	text: function (value, percentage) {
 *               	    return `Normal Operations: ${value} (${percentage}%)`;
 *               	},
 *               	opacity: 0.2, // 0 to 1
 *               	class: "test-polygon1"
 *              },
 *             	...
 *           ]
 *        }
 *     ]
 *  });
 * @example
 *	import {bb} from "billboard.js";
 * import Stanford from "billboard.js/dist/billboardjs-plugin-stanford";
 *
 * bb.generate({
 *     plugins: [
 *        new Stanford({ ... })
 *     ]
 * })
 */

var stanford_Stanford = /*#__PURE__*/function (_Plugin) {
  function Stanford(options) {
    var _this;

    return Object(classCallCheck["a" /* default */])(this, Stanford), _this = _super.call(this, options), _this.config = new Options_Options(), Object(possibleConstructorReturn["a" /* default */])(_this, Object(assertThisInitialized["a" /* default */])(_this));
  }

  Object(inherits["a" /* default */])(Stanford, _Plugin);

  var _super = _createSuper(Stanford);

  return Object(createClass["a" /* default */])(Stanford, [{
    key: "$beforeInit",
    value: function $beforeInit() {
      var _this2 = this,
          $$ = this.$$;

      $$.config.data_xSort = !1, $$.isMultipleX = function () {
        return !0;
      }, $$.showGridFocus = function () {}, $$.labelishData = function (d) {
        return d.values;
      }, $$.opacityForCircle = function () {
        return 1;
      };
      var getCurrentPaddingRight = $$.getCurrentPaddingRight.bind($$);

      $$.getCurrentPaddingRight = function () {
        return getCurrentPaddingRight() + (_this2.colorScale ? _this2.colorScale.getColorScalePadding() : 0);
      };
    }
  }, {
    key: "$init",
    value: function $init() {
      var $$ = this.$$;
      $$.loadConfig.bind(this)(this.options), $$.color = this.getStanfordPointColor.bind($$), this.colorScale = new ColorScale_ColorScale(this), this.elements = new Elements_Elements(this), this.convertData(), this.initStanfordData(), this.setStanfordTooltip(), this.colorScale.drawColorScale(), this.$redraw();
    }
  }, {
    key: "$redraw",
    value: function $redraw(duration) {
      this.colorScale && this.colorScale.drawColorScale(), this.elements && this.elements.updateStanfordElements(duration);
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return new Options_Options();
    }
  }, {
    key: "convertData",
    value: function convertData() {
      var data = this.$$.data.targets,
          epochs = this.options.epochs;
      data.forEach(function (d) {
        d.values.forEach(function (v, i) {
          v.epochs = epochs[i];
        }), d.minEpochs = undefined, d.maxEpochs = undefined, d.colors = undefined, d.colorscale = undefined;
      });
    }
  }, {
    key: "xvCustom",
    value: function xvCustom(d, xyValue) {
      var $$ = this,
          value = xyValue ? d[xyValue] : $$.getBaseValue(d);
      return $$.isTimeSeries() ? value = $$.parseDate(value) : $$.isCategorized() && isString(value) && (value = $$.config.axis_x_categories.indexOf(d.value)), Math.ceil($$.x(value));
    }
  }, {
    key: "yvCustom",
    value: function yvCustom(d, xyValue) {
      var $$ = this,
          yScale = d.axis && d.axis === "y2" ? $$.y2 : $$.y,
          value = xyValue ? d[xyValue] : $$.getBaseValue(d);
      return Math.ceil(yScale(value));
    }
  }, {
    key: "initStanfordData",
    value: function initStanfordData() {
      var config = this.config,
          target = this.$$.data.targets[0];
      target.values.sort(compareEpochs);
      // Get array of epochs
      var epochs = target.values.map(function (a) {
        return a.epochs;
      });
      target.minEpochs = isNaN(config.scale_min) ? Math.min.apply(Math, _toConsumableArray(epochs)) : config.scale_min, target.maxEpochs = isNaN(config.scale_max) ? Math.max.apply(Math, _toConsumableArray(epochs)) : config.scale_max, target.colors = isFunction(config.colors) ? config.colors : Object(external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_["interpolateHslLong"])(Object(external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_["hsl"])(250, 1, .5), Object(external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_["hsl"])(0, 1, .5)), target.colorscale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleSequentialLog"])(target.colors).domain([target.minEpochs, target.maxEpochs]);
    }
  }, {
    key: "getStanfordPointColor",
    value: function getStanfordPointColor(d) {
      var target = this.data.targets[0];
      return target.colorscale(d.epochs);
    }
  }, {
    key: "setStanfordTooltip",
    value: function setStanfordTooltip() {
      var config = this.$$.config;
      isEmpty(config.tooltip_contents) && (config.tooltip_contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
        var _this3 = this,
            html = "<table class=\"".concat(classes.tooltip, "\"><tbody>");

        return d.forEach(function (v) {
          html += "<tr>\n\t\t\t\t\t\t\t<th>".concat(defaultTitleFormat(_this3.config.data_x), "</th>\n\t\t\t\t\t\t\t<th class=\"value\">").concat(defaultValueFormat(v.x), "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>").concat(defaultTitleFormat(v.id), "</th>\n\t\t\t\t\t\t\t<th class=\"value\">").concat(defaultValueFormat(v.value), "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr class=\"").concat(classes.tooltipName, "-").concat(v.id, "\">\n\t\t\t\t\t\t\t<td class=\"name\"><span style=\"background-color:").concat(color(v), "\"></span>").concat(defaultTitleFormat("Epochs"), "</td>\n\t\t\t\t\t\t\t<td class=\"value\">").concat(defaultValueFormat(v.epochs), "</td>\n\t\t\t\t\t\t</tr>");
        }), "".concat(html, "</tbody></table>");
      });
    }
  }, {
    key: "countEpochsInRegion",
    value: function countEpochsInRegion(region) {
      var $$ = this,
          target = $$.data.targets[0],
          total = target.values.reduce(function (accumulator, currentValue) {
        return accumulator + +currentValue.epochs;
      }, 0),
          value = target.values.reduce(function (accumulator, currentValue) {
        return pointInRegion(currentValue, region) ? accumulator + +currentValue.epochs : accumulator;
      }, 0);
      return {
        value: value,
        percentage: value === 0 ? 0 : +(value / total * 100).toFixed(1)
      };
    }
  }]), Stanford;
}(Plugin["a" /* default */]);



/***/ }),
/* 21 */,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2Fzc2VydFRoaXNJbml0aWFsaXplZC5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9QbHVnaW4uanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2ludGVybmFscy9icm93c2VyLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvaW50ZXJuYWxzL3V0aWwuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvcGx1Z2luL3N0YW5mb3JkL3V0aWwuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9wbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL3BsdWdpbi9zdGFuZm9yZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHMuanMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsInJlZ2lvbiIsInJlZ2lvbnMiLCJzZWxlY3RlZENpcmNsZSIsInNlbGVjdGVkQ2lyY2xlcyIsInNoYXBlIiwic2hhcGVzIiwic3RhbmZvcmRFbGVtZW50cyIsInN0YW5mb3JkTGluZSIsInN0YW5mb3JkTGluZXMiLCJzdGFuZm9yZFJlZ2lvbiIsInN0YW5mb3JkUmVnaW9ucyIsInRhcmdldCIsInRleHQiLCJ0ZXh0cyIsInRpdGxlIiwidG9vbHRpcCIsInRvb2x0aXBDb250YWluZXIiLCJ0b29sdGlwTmFtZSIsInhncmlkIiwieGdyaWRGb2N1cyIsInhncmlkTGluZSIsInhncmlkTGluZXMiLCJ4Z3JpZHMiLCJ5Z3JpZCIsInlncmlkRm9jdXMiLCJ5Z3JpZExpbmUiLCJ5Z3JpZExpbmVzIiwieWdyaWRzIiwiem9vbUJydXNoIiwiem9vbVJlY3QiLCJFWFBBTkRFRCIsIlNFTEVDVEVEIiwiSU5DTFVERUQiLCJUZXh0T3ZlcmxhcHBpbmciLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsInYiLCJpc0Z1bmN0aW9uIiwiaXNTdHJpbmciLCJpc051bWJlciIsImlzVW5kZWZpbmVkIiwiaXNEZWZpbmVkIiwiaXNCb29sZWFuIiwiY2VpbDEwIiwiTWF0aCIsImNlaWwiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiZCIsImlzT2JqZWN0VHlwZSIsImlzRW1wdHkiLCJsZW5ndGgiLCJEYXRlIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsInZhbHVlIiwiZm91bmQiLCJjYWxsRm4iLCJmbiIsImlzRm4iLCJhcmdzIiwiY2FsbCIsInNhbml0aXNlIiwic3RyIiwicmVwbGFjZSIsInNldFRleHRWYWx1ZSIsIm5vZGUiLCJkeSIsInRvTWlkZGxlIiwiaW5kZXhPZiIsImRpZmYiLCJtYXAiLCJtdWx0aWxpbmUiLCJzcGxpdCIsImxlbiIsImh0bWwiLCJpIiwiYXBwZW5kIiwiYXR0ciIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldEJCb3giLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0UGF0aEJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIml0ZW1zIiwibWluIiwiZ2V0QnJ1c2hTZWxlY3Rpb24iLCJjdHgiLCJzZWxlY3Rpb24iLCJldmVudCIsImQzRXZlbnQiLCJtYWluIiwiY29udGV4dCIsIm5hbWUiLCJzZWxlY3QiLCJDTEFTUyIsImQzQnJ1c2hTZWxlY3Rpb24iLCJnZXRCb3VuZGluZ1JlY3QiLCJyZWN0IiwiZ2V0UmFuZG9tIiwiYXNTdHIiLCJyYW5kb20iLCJicnVzaEVtcHR5IiwiZXh0ZW5kIiwic291cmNlIiwicCIsImNhcGl0YWxpemUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9BcnJheSIsImdldENzc1J1bGVzIiwic3R5bGVTaGVldHMiLCJydWxlcyIsInNoZWV0IiwiY3NzUnVsZXMiLCJjb25jYXQiLCJlIiwiY29uc29sZSIsImVycm9yIiwiaHJlZiIsInRvU3RyaW5nIiwiZ2V0VHJhbnNsYXRpb24iLCJ0cmFuc2Zvcm0iLCJiYXNlVmFsIiwibnVtYmVyT2ZJdGVtcyIsImdldEl0ZW0iLCJtYXRyaXgiLCJhIiwiYiIsImMiLCJmIiwiZ2V0VW5pcXVlIiwiZGF0YSIsImlzRGF0ZSIsIk51bWJlciIsImZpbHRlciIsIm1lcmdlQXJyYXkiLCJyZWR1Y2UiLCJtZXJnZU9iaiIsIm9iamVjdE4iLCJzaGlmdCIsInNvcnRWYWx1ZSIsImlzQXNjIiwiZXZlcnkiLCJzb3J0IiwiZ2V0TWluTWF4IiwidHlwZSIsInJlcyIsInVuZGVmaW5lZCIsImdldFJhbmdlIiwic3RhcnQiLCJlbmQiLCJzdGVwIiwibWF4IiwicHVzaCIsImVtdWxhdGVFdmVudCIsIm1vdXNlIiwiZ2V0UGFyYW1zIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiTW91c2VFdmVudCIsImVsIiwiZXZlbnRUeXBlIiwicGFyYW1zIiwiZGlzcGF0Y2hFdmVudCIsIm1vdXNlRXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRNb3VzZUV2ZW50IiwidG91Y2giLCJ0b3VjaE9iaiIsIlRvdWNoIiwiaWRlbnRpZmllciIsIm5vdyIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb25BbmdsZSIsImZvcmNlIiwiVG91Y2hFdmVudCIsInNoaWZ0S2V5IiwidG91Y2hlcyIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsInRwbFByb2Nlc3MiLCJ0cGwiLCJSZWdFeHAiLCJPcHRpb25zIiwiY29sb3JzIiwiZXBvY2hzIiwic2NhbGVfbWluIiwic2NhbGVfbWF4Iiwic2NhbGVfd2lkdGgiLCJzY2FsZV9mb3JtYXQiLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdfbGVmdCIsInBvaW50SW5SZWdpb24iLCJwb2ludCIsImluc2lkZSIsImoiLCJ4aSIsInlpIiwieGoiLCJ5aiIsImNvbXBhcmVFcG9jaHMiLCJnZXRSZWdpb25BcmVhIiwicG9pbnRzIiwicG9pbnQxIiwicG9pbnQyIiwibCIsImdldENlbnRyb2lkIiwiRWxlbWVudHMiLCJvd25lciIsImVsZW1lbnRzIiwiJCQiLCJkdXJhdGlvbiIsImNvbmZpZyIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJleGl0IiwidHJhbnNpdGlvbiIsInJlbW92ZSIsInN0YW5mb3JkTGluZUVudGVyIiwiZW50ZXIiLCJtZXJnZSIsImNvdW50UG9pbnRzSW5SZWdpb24iLCJjb3VudEVwb2Noc0luUmVnaW9uIiwic3RhbmZvcmRSZWdpb25FbnRlciIsImpvaW4iLCJvcGFjaXR5IiwicGVyY2VudGFnZSIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJ4eVZhbHVlIiwiZ2V0QmFzZVZhbHVlIiwiaXNUaW1lU2VyaWVzIiwicGFyc2VEYXRlIiwiaXNDYXRlZ29yaXplZCIsImF4aXNfeF9jYXRlZ29yaWVzIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwidGFyZ2V0cyIsImJhcldpZHRoIiwiYmFySGVpZ2h0IiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJ0aWNrRm9ybWF0IiwiZDNGb3JtYXQiLCJwb3ciLCJsb2ciLCJMTjEwIiwicm91bmQiLCJjdXJyZW50V2lkdGgiLCJ4Rm9yQ29sb3JTY2FsZSIsIlN0YW5mb3JkIiwiZGF0YV94U29ydCIsImlzTXVsdGlwbGVYIiwic2hvd0dyaWRGb2N1cyIsImxhYmVsaXNoRGF0YSIsInZhbHVlcyIsIm9wYWNpdHlGb3JDaXJjbGUiLCJnZXRDdXJyZW50UGFkZGluZ1JpZ2h0IiwiZ2V0Q29sb3JTY2FsZVBhZGRpbmciLCJsb2FkQ29uZmlnIiwiY29sb3IiLCJnZXRTdGFuZm9yZFBvaW50Q29sb3IiLCJjb252ZXJ0RGF0YSIsImluaXRTdGFuZm9yZERhdGEiLCJzZXRTdGFuZm9yZFRvb2x0aXAiLCJkcmF3Q29sb3JTY2FsZSIsIiRyZWRyYXciLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwiY29sb3JzY2FsZSIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsInRvb2x0aXBfY29udGVudHMiLCJkZWZhdWx0VGl0bGVGb3JtYXQiLCJkZWZhdWx0VmFsdWVGb3JtYXQiLCJkYXRhX3giLCJpZCIsInRvdGFsIiwiYWNjdW11bGF0b3IiLCJjdXJyZW50VmFsdWUiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFrRDtBQUNu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QUssS0FBSyxDQUFWLEdBQWtELENBQWxELEdBQWMsQ0FBQyxDQUFDQSxLQUFLLEdBQUc0UCxLQUFSLEdBQWdCLEdBQWpCLEVBQXNCRyxPQUF0QixDQUE4QixDQUE5QjtBQUZyQixPQUFQO0FBSUE7O0VBcEtvQzdZLHlCOzs7Ozs7Ozs7Ozs7Ozs7O0FDakd2QjtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQzs7QUNQOEM7QUFDL0I7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtCQUFrQixlQUFjO0FBQ2hDLEMiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwic3RhbmZvcmRcIiwgW1wiZDMtc2VsZWN0aW9uXCIsIFwiZDMtaW50ZXJwb2xhdGVcIiwgXCJkMy1jb2xvclwiLCBcImQzLXNjYWxlXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy1heGlzXCIsIFwiZDMtZm9ybWF0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJzdGFuZm9yZFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEzX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE0X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE1X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE2X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE3X18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjApO1xuIiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gc2VsZjtcbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi4vLi4vaGVscGVycy9lc20vdHlwZW9mXCI7XG5pbXBvcnQgYXNzZXJ0VGhpc0luaXRpYWxpemVkIGZyb20gXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTBfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbHVnaW4ge1xuXHQvKipcblx0ICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXG5cdCAqIEBuYW1lIHZlcnNpb25cblx0ICogQHN0YXRpY1xuXHQgKiBAbWVtYmVyb2YgUGx1Z2luXG5cdCAqIEB0eXBlIHtTdHJpbmd9XG5cdCAqIEBleGFtcGxlXG5cdCAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcblx0ICovXG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIxLjEyLjEyXCI7XG5cblx0LyoqXG5cdCAqIENvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7QW55fSBjb25maWcgY29uZmlnIG9wdGlvbiBvYmplY3Rcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdiZWZvcmVJbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRiZWZvcmVJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdpbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRpbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdhZnRlckluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGFmdGVySW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAncmVkcmF3JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRyZWRyYXcoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3dpbGxEZXN0cm95JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCR3aWxsRGVzdHJveSgpIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xuXHRcdFx0ZGVsZXRlIHRoaXNba2V5XTtcblx0XHR9KTtcblx0fVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTNfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE0X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTZfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzE3X187IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhvdXRIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheVwiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlU3ByZWFkIGZyb20gXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn0iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdGFyYzogXCJiYi1hcmNcIixcblx0YXJjTGFiZWxMaW5lOiBcImJiLWFyYy1sYWJlbC1saW5lXCIsXG5cdGFyY3M6IFwiYmItYXJjc1wiLFxuXHRhcmVhOiBcImJiLWFyZWFcIixcblx0YXJlYXM6IFwiYmItYXJlYXNcIixcblx0YXhpczogXCJiYi1heGlzXCIsXG5cdGF4aXNYOiBcImJiLWF4aXMteFwiLFxuXHRheGlzWExhYmVsOiBcImJiLWF4aXMteC1sYWJlbFwiLFxuXHRheGlzWTogXCJiYi1heGlzLXlcIixcblx0YXhpc1kyOiBcImJiLWF4aXMteTJcIixcblx0YXhpc1kyTGFiZWw6IFwiYmItYXhpcy15Mi1sYWJlbFwiLFxuXHRheGlzWUxhYmVsOiBcImJiLWF4aXMteS1sYWJlbFwiLFxuXHRiYXI6IFwiYmItYmFyXCIsXG5cdGJhcnM6IFwiYmItYmFyc1wiLFxuXHRicnVzaDogXCJiYi1icnVzaFwiLFxuXHRidXR0b246IFwiYmItYnV0dG9uXCIsXG5cdGJ1dHRvblpvb21SZXNldDogXCJiYi16b29tLXJlc2V0XCIsXG5cdGNoYXJ0OiBcImJiLWNoYXJ0XCIsXG5cdGNoYXJ0QXJjOiBcImJiLWNoYXJ0LWFyY1wiLFxuXHRjaGFydEFyY3M6IFwiYmItY2hhcnQtYXJjc1wiLFxuXHRjaGFydEFyY3NCYWNrZ3JvdW5kOiBcImJiLWNoYXJ0LWFyY3MtYmFja2dyb3VuZFwiLFxuXHRjaGFydEFyY3NHYXVnZU1heDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1heFwiLFxuXHRjaGFydEFyY3NHYXVnZU1pbjogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1pblwiLFxuXHRjaGFydEFyY3NHYXVnZVVuaXQ6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS11bml0XCIsXG5cdGNoYXJ0QXJjc1RpdGxlOiBcImJiLWNoYXJ0LWFyY3MtdGl0bGVcIixcblx0Y2hhcnRBcmNzR2F1Z2VUaXRsZTogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXRpdGxlXCIsXG5cdGNoYXJ0QmFyOiBcImJiLWNoYXJ0LWJhclwiLFxuXHRjaGFydEJhcnM6IFwiYmItY2hhcnQtYmFyc1wiLFxuXHRjaGFydExpbmU6IFwiYmItY2hhcnQtbGluZVwiLFxuXHRjaGFydExpbmVzOiBcImJiLWNoYXJ0LWxpbmVzXCIsXG5cdGNoYXJ0UmFkYXI6IFwiYmItY2hhcnQtcmFkYXJcIixcblx0Y2hhcnRSYWRhcnM6IFwiYmItY2hhcnQtcmFkYXJzXCIsXG5cdGNoYXJ0VGV4dDogXCJiYi1jaGFydC10ZXh0XCIsXG5cdGNoYXJ0VGV4dHM6IFwiYmItY2hhcnQtdGV4dHNcIixcblx0Y2lyY2xlOiBcImJiLWNpcmNsZVwiLFxuXHRjaXJjbGVzOiBcImJiLWNpcmNsZXNcIixcblx0Y29sb3JQYXR0ZXJuOiBcImJiLWNvbG9yLXBhdHRlcm5cIixcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXG5cdGRlZm9jdXNlZDogXCJiYi1kZWZvY3VzZWRcIixcblx0ZHJhZ2FyZWE6IFwiYmItZHJhZ2FyZWFcIixcblx0ZW1wdHk6IFwiYmItZW1wdHlcIixcblx0ZXZlbnRSZWN0OiBcImJiLWV2ZW50LXJlY3RcIixcblx0ZXZlbnRSZWN0czogXCJiYi1ldmVudC1yZWN0c1wiLFxuXHRldmVudFJlY3RzTXVsdGlwbGU6IFwiYmItZXZlbnQtcmVjdHMtbXVsdGlwbGVcIixcblx0ZXZlbnRSZWN0c1NpbmdsZTogXCJiYi1ldmVudC1yZWN0cy1zaW5nbGVcIixcblx0Zm9jdXNlZDogXCJiYi1mb2N1c2VkXCIsXG5cdGdhdWdlVmFsdWU6IFwiYmItZ2F1Z2UtdmFsdWVcIixcblx0Z3JpZDogXCJiYi1ncmlkXCIsXG5cdGdyaWRMaW5lczogXCJiYi1ncmlkLWxpbmVzXCIsXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcblx0bGVnZW5kSXRlbTogXCJiYi1sZWdlbmQtaXRlbVwiLFxuXHRsZWdlbmRJdGVtRXZlbnQ6IFwiYmItbGVnZW5kLWl0ZW0tZXZlbnRcIixcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxuXHRsZWdlbmRJdGVtSGlkZGVuOiBcImJiLWxlZ2VuZC1pdGVtLWhpZGRlblwiLFxuXHRsZWdlbmRJdGVtUG9pbnQ6IFwiYmItbGVnZW5kLWl0ZW0tcG9pbnRcIixcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxuXHRsZXZlbDogXCJiYi1sZXZlbFwiLFxuXHRsZXZlbHM6IFwiYmItbGV2ZWxzXCIsXG5cdGxpbmU6IFwiYmItbGluZVwiLFxuXHRsaW5lczogXCJiYi1saW5lc1wiLFxuXHRyZWdpb246IFwiYmItcmVnaW9uXCIsXG5cdHJlZ2lvbnM6IFwiYmItcmVnaW9uc1wiLFxuXHRzZWxlY3RlZENpcmNsZTogXCJiYi1zZWxlY3RlZC1jaXJjbGVcIixcblx0c2VsZWN0ZWRDaXJjbGVzOiBcImJiLXNlbGVjdGVkLWNpcmNsZXNcIixcblx0c2hhcGU6IFwiYmItc2hhcGVcIixcblx0c2hhcGVzOiBcImJiLXNoYXBlc1wiLFxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXG5cdHN0YW5mb3JkTGluZXM6IFwiYmItc3RhbmZvcmQtbGluZXNcIixcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCIsXG5cdHRhcmdldDogXCJiYi10YXJnZXRcIixcblx0dGV4dDogXCJiYi10ZXh0XCIsXG5cdHRleHRzOiBcImJiLXRleHRzXCIsXG5cdHRpdGxlOiBcImJiLXRpdGxlXCIsXG5cdHRvb2x0aXA6IFwiYmItdG9vbHRpcFwiLFxuXHR0b29sdGlwQ29udGFpbmVyOiBcImJiLXRvb2x0aXAtY29udGFpbmVyXCIsXG5cdHRvb2x0aXBOYW1lOiBcImJiLXRvb2x0aXAtbmFtZVwiLFxuXHR4Z3JpZDogXCJiYi14Z3JpZFwiLFxuXHR4Z3JpZEZvY3VzOiBcImJiLXhncmlkLWZvY3VzXCIsXG5cdHhncmlkTGluZTogXCJiYi14Z3JpZC1saW5lXCIsXG5cdHhncmlkTGluZXM6IFwiYmIteGdyaWQtbGluZXNcIixcblx0eGdyaWRzOiBcImJiLXhncmlkc1wiLFxuXHR5Z3JpZDogXCJiYi15Z3JpZFwiLFxuXHR5Z3JpZEZvY3VzOiBcImJiLXlncmlkLWZvY3VzXCIsXG5cdHlncmlkTGluZTogXCJiYi15Z3JpZC1saW5lXCIsXG5cdHlncmlkTGluZXM6IFwiYmIteWdyaWQtbGluZXNcIixcblx0eWdyaWRzOiBcImJiLXlncmlkc1wiLFxuXHR6b29tQnJ1c2g6IFwiYmItem9vbS1icnVzaFwiLFxuXHR6b29tUmVjdDogXCJiYi16b29tLXJlY3RcIixcblx0RVhQQU5ERUQ6IFwiX2V4cGFuZGVkX1wiLFxuXHRTRUxFQ1RFRDogXCJfc2VsZWN0ZWRfXCIsXG5cdElOQ0xVREVEOiBcIl9pbmNsdWRlZF9cIixcblx0VGV4dE92ZXJsYXBwaW5nOiBcInRleHQtb3ZlcmxhcHBpbmdcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogV2luZG93IG9iamVjdFxuICogQG1vZHVsZVxuICogQGlnbm9yZVxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cbmNvbnN0IHdpbiA9ICgoKSA9PiB7XG5cdGNvbnN0IGRlZiA9IG8gPT4gdHlwZW9mIG8gIT09IFwidW5kZWZpbmVkXCIgJiYgbztcblxuXHRyZXR1cm4gZGVmKHNlbGYpIHx8IGRlZih3aW5kb3cpIHx8IGRlZihnbG9iYWwpIHx8IGRlZihnbG9iYWxUaGlzKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59KSgpO1xuLyogZXNsaW50LWVuYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cblxuY29uc3QgZG9jID0gd2luICYmIHdpbi5kb2N1bWVudDtcblxuZXhwb3J0IHtcblx0d2luIGFzIHdpbmRvdyxcblx0ZG9jIGFzIGRvY3VtZW50XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIEBpZ25vcmVcbiAqL1xuaW1wb3J0IHtldmVudCBhcyBkM0V2ZW50fSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge2JydXNoU2VsZWN0aW9uIGFzIGQzQnJ1c2hTZWxlY3Rpb259IGZyb20gXCJkMy1icnVzaFwiO1xuaW1wb3J0IHtkb2N1bWVudCwgd2luZG93fSBmcm9tIFwiLi9icm93c2VyXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4uL2NvbmZpZy9jbGFzc2VzXCI7XG5cbmNvbnN0IGlzVmFsdWUgPSB2ID0+IHYgfHwgdiA9PT0gMDtcbmNvbnN0IGlzRnVuY3Rpb24gPSB2ID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1N0cmluZyA9IHYgPT4gdHlwZW9mIHYgPT09IFwic3RyaW5nXCI7XG5jb25zdCBpc051bWJlciA9IHYgPT4gdHlwZW9mIHYgPT09IFwibnVtYmVyXCI7XG5jb25zdCBpc1VuZGVmaW5lZCA9IHYgPT4gdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc0RlZmluZWQgPSB2ID0+IHR5cGVvZiB2ICE9PSBcInVuZGVmaW5lZFwiO1xuY29uc3QgaXNCb29sZWFuID0gdiA9PiB0eXBlb2YgdiA9PT0gXCJib29sZWFuXCI7XG5jb25zdCBjZWlsMTAgPSB2ID0+IE1hdGguY2VpbCh2IC8gMTApICogMTA7XG5jb25zdCBhc0hhbGZQaXhlbCA9IG4gPT4gTWF0aC5jZWlsKG4pICsgMC41O1xuY29uc3QgZGlmZkRvbWFpbiA9IGQgPT4gZFsxXSAtIGRbMF07XG5jb25zdCBpc09iamVjdFR5cGUgPSB2ID0+IHR5cGVvZiB2ID09PSBcIm9iamVjdFwiO1xuY29uc3QgaXNFbXB0eSA9IG8gPT4gKFxuXHRpc1VuZGVmaW5lZChvKSB8fCBvID09PSBudWxsIHx8XG5cdChpc1N0cmluZyhvKSAmJiBvLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzT2JqZWN0VHlwZShvKSAmJiAhKG8gaW5zdGFuY2VvZiBEYXRlKSAmJiBPYmplY3Qua2V5cyhvKS5sZW5ndGggPT09IDApIHx8XG5cdChpc051bWJlcihvKSAmJiBpc05hTihvKSlcbik7XG5jb25zdCBub3RFbXB0eSA9IG8gPT4gIWlzRW1wdHkobyk7XG5cbi8qKlxuICogQ2hlY2sgaWYgaXMgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc0FycmF5ID0gYXJyID0+IGFyciAmJiBhcnIuY29uc3RydWN0b3IgPT09IEFycmF5O1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpc09iamVjdCA9IG9iaiA9PiBvYmogJiYgIW9iai5ub2RlVHlwZSAmJiBpc09iamVjdFR5cGUob2JqKSAmJiAhaXNBcnJheShvYmopO1xuXG5jb25zdCBnZXRPcHRpb24gPSAob3B0aW9ucywga2V5LCBkZWZhdWx0VmFsdWUpID0+IChcblx0aXNEZWZpbmVkKG9wdGlvbnNba2V5XSkgPyBvcHRpb25zW2tleV0gOiBkZWZhdWx0VmFsdWVcbik7XG5cbmNvbnN0IGhhc1ZhbHVlID0gKGRpY3QsIHZhbHVlKSA9PiB7XG5cdGxldCBmb3VuZCA9IGZhbHNlO1xuXG5cdE9iamVjdC5rZXlzKGRpY3QpLmZvckVhY2goa2V5ID0+IChkaWN0W2tleV0gPT09IHZhbHVlKSAmJiAoZm91bmQgPSB0cnVlKSk7XG5cblx0cmV0dXJuIGZvdW5kO1xufTtcblxuLyoqXG4gKiBDYWxsIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAqIEBwYXJhbSB7Kn0gYXJncyBBcmd1bWVudHNcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWU6IGZuIGlzIGZ1bmN0aW9uLCBmYWxzZTogZm4gaXMgbm90IGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBjYWxsRm4gPSAoZm4sIC4uLmFyZ3MpID0+IHtcblx0Y29uc3QgaXNGbiA9IGlzRnVuY3Rpb24oZm4pO1xuXG5cdGlzRm4gJiYgZm4uY2FsbCguLi5hcmdzKTtcblx0cmV0dXJuIGlzRm47XG59O1xuXG4vKipcbiAqIFJlcGxhY2UgdGFnIHNpZ24gdG8gaHRtbCBlbnRpdHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHNhbml0aXNlID0gc3RyID0+IChpc1N0cmluZyhzdHIpID8gc3RyLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpIDogc3RyKTtcblxuLyoqXG4gKiBTZXQgdGV4dCB2YWx1ZS4gSWYgdGhlcmUncyBtdWx0aWxpbmUgYWRkIG5vZGVzLlxuICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gbm9kZSBUZXh0IG5vZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRleHQgdmFsdWUgc3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fSBkeSBkeSB2YWx1ZSBmb3IgbXVsdGlsaW5lZCB0ZXh0XG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRvTWlkZGxlIFRvIGJlIGFsaW5nbmVkIHZlcnRpY2FsbHkgbWlkZGxlXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBzZXRUZXh0VmFsdWUgPSAobm9kZSwgdGV4dCwgZHkgPSBbLTEsIDFdLCB0b01pZGRsZSA9IGZhbHNlKSA9PiB7XG5cdGlmICghbm9kZSB8fCAhaXNTdHJpbmcodGV4dCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAodGV4dC5pbmRleE9mKFwiXFxuXCIpID09PSAtMSkge1xuXHRcdG5vZGUudGV4dCh0ZXh0KTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBkaWZmID0gW25vZGUudGV4dCgpLCB0ZXh0XS5tYXAodiA9PiB2LnJlcGxhY2UoL1tcXHNcXG5dL2csIFwiXCIpKTtcblxuXHRcdGlmIChkaWZmWzBdICE9PSBkaWZmWzFdKSB7XG5cdFx0XHRjb25zdCBtdWx0aWxpbmUgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xuXHRcdFx0Y29uc3QgbGVuID0gdG9NaWRkbGUgPyBtdWx0aWxpbmUubGVuZ3RoIC0gMSA6IDE7XG5cblx0XHRcdC8vIHJlc2V0IHBvc3NpYmxlIHRleHRcblx0XHRcdG5vZGUuaHRtbChcIlwiKTtcblxuXHRcdFx0bXVsdGlsaW5lLmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdFx0bm9kZS5hcHBlbmQoXCJ0c3BhblwiKVxuXHRcdFx0XHRcdC5hdHRyKFwieFwiLCAwKVxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYCR7aSA9PT0gMCA/IGR5WzBdICogbGVuIDogZHlbMV19ZW1gKVxuXHRcdFx0XHRcdC50ZXh0KHYpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59O1xuXG4vLyBzdWJzdGl0dXRpb24gb2YgU1ZHUGF0aFNlZyBBUEkgcG9seWZpbGxcbmNvbnN0IGdldFJlY3RTZWdMaXN0ID0gcGF0aCA9PiB7XG5cdC8qXG5cdCAqIHNlZzEgLS0tLS0tLS0tLSBzZWcyXG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqIHNlZzAgLS0tLS0tLS0tLSBzZWczXG5cdCAqICovXG5cdGNvbnN0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0QkJveCgpO1xuXG5cdHJldHVybiBbXG5cdFx0e3gsIHk6IHkgKyBoZWlnaHR9LCAvLyBzZWcwXG5cdFx0e3gsIHl9LCAvLyBzZWcxXG5cdFx0e3g6IHggKyB3aWR0aCwgeX0sIC8vIHNlZzJcblx0XHR7eDogeCArIHdpZHRoLCB5OiB5ICsgaGVpZ2h0fSAvLyBzZWczXG5cdF07XG59O1xuXG5jb25zdCBnZXRQYXRoQm94ID0gcGF0aCA9PiB7XG5cdGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGl0ZW1zID0gZ2V0UmVjdFNlZ0xpc3QocGF0aCk7XG5cdGNvbnN0IHggPSBpdGVtc1swXS54O1xuXHRjb25zdCB5ID0gTWF0aC5taW4oaXRlbXNbMF0ueSwgaXRlbXNbMV0ueSk7XG5cblx0cmV0dXJuIHtcblx0XHR4LCB5LCB3aWR0aCwgaGVpZ2h0XG5cdH07XG59O1xuXG4vLyByZXR1cm4gYnJ1c2ggc2VsZWN0aW9uIGFycmF5XG5jb25zdCBnZXRCcnVzaFNlbGVjdGlvbiA9IGN0eCA9PiB7XG5cdGxldCBzZWxlY3Rpb24gPSBudWxsO1xuXHRjb25zdCBldmVudCA9IGQzRXZlbnQ7XG5cdGNvbnN0IG1haW4gPSBjdHguY29udGV4dCB8fCBjdHgubWFpbjtcblxuXHQvLyBjaGVjayBmcm9tIGV2ZW50XG5cdGlmIChldmVudCAmJiBldmVudC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIkJydXNoRXZlbnRcIikge1xuXHRcdHNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbjtcblx0Ly8gY2hlY2sgZnJvbSBicnVzaCBhcmVhIHNlbGVjdGlvblxuXHR9IGVsc2UgaWYgKG1haW4gJiYgKHNlbGVjdGlvbiA9IG1haW4uc2VsZWN0KGAuJHtDTEFTUy5icnVzaH1gKS5ub2RlKCkpKSB7XG5cdFx0c2VsZWN0aW9uID0gZDNCcnVzaFNlbGVjdGlvbihzZWxlY3Rpb24pO1xuXHR9XG5cblx0cmV0dXJuIHNlbGVjdGlvbjtcbn07XG5cbi8vIEdldCBib3VuZGluZ0NsaWVudFJlY3QuIENhY2hlIHRoZSBldmFsdWF0ZWQgdmFsdWUgb25jZSBpdCB3YXMgY2FsbGVkLlxuY29uc3QgZ2V0Qm91bmRpbmdSZWN0ID0gbm9kZSA9PiBub2RlLnJlY3QgfHwgKG5vZGUucmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuXG4vLyByZXRydW4gcmFuZG9tIG51bWJlclxuY29uc3QgZ2V0UmFuZG9tID0gKGFzU3RyID0gdHJ1ZSkgPT4gTWF0aC5yYW5kb20oKSArIChhc1N0ciA/IFwiXCIgOiAwKTtcblxuY29uc3QgYnJ1c2hFbXB0eSA9IGN0eCA9PiB7XG5cdGNvbnN0IHNlbGVjdGlvbiA9IGdldEJydXNoU2VsZWN0aW9uKGN0eCk7XG5cblx0aWYgKHNlbGVjdGlvbikge1xuXHRcdC8vIGJydXNoIHNlbGVjdGVkIGFyZWFcblx0XHQvLyB0d28tZGltZW5zaW9uYWw6IFtbeDAsIHkwXSwgW3gxLCB5MV1dXG5cdFx0Ly8gb25lLWRpbWVuc2lvbmFsOiBbeDAsIHgxXSBvciBbeTAsIHkxXVxuXHRcdHJldHVybiBzZWxlY3Rpb25bMF0gPT09IHNlbGVjdGlvblsxXTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgZXh0ZW5kID0gKHRhcmdldCA9IHt9LCBzb3VyY2UpID0+IHtcblx0Zm9yIChjb25zdCBwIGluIHNvdXJjZSkge1xuXHRcdHRhcmdldFtwXSA9IHNvdXJjZVtwXTtcblx0fVxuXG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG4vKipcbiAqIFJldHVybiBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ30gY2FwaXRhbGl6ZWQgc3RyaW5nXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBjYXBpdGFsaXplID0gc3RyID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGFycmF5XG4gKiBAcGFyYW0ge09iamVjdH0gdlxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgdG9BcnJheSA9IHYgPT4gW10uc2xpY2UuY2FsbCh2KTtcblxuLyoqXG4gKiBHZXQgY3NzIHJ1bGVzIGZvciBzcGVjaWZpZWQgc3R5bGVzaGVldHNcbiAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlU2hlZXRzIFRoZSBzdHlsZXNoZWV0cyB0byBnZXQgdGhlIHJ1bGVzIGZyb21cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldENzc1J1bGVzID0gc3R5bGVTaGVldHMgPT4ge1xuXHRsZXQgcnVsZXMgPSBbXTtcblxuXHRzdHlsZVNoZWV0cy5mb3JFYWNoKHNoZWV0ID0+IHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKHNoZWV0LmNzc1J1bGVzICYmIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCkge1xuXHRcdFx0XHRydWxlcyA9IHJ1bGVzLmNvbmNhdCh0b0FycmF5KHNoZWV0LmNzc1J1bGVzKSk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgcmVhZGluZyBydWxlcyBmcm9tICR7c2hlZXQuaHJlZn06ICR7ZS50b1N0cmluZygpfWApO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHJ1bGVzO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBTVkdNYXRyaXggb2YgYW4gU1ZHR0VsZW1lbnRcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJuIHtTVkdNYXRyaXh9IG1hdHJpeFxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0VHJhbnNsYXRpb24gPSBub2RlID0+IHtcblx0Y29uc3QgdHJhbnNmb3JtID0gbm9kZSA/IG5vZGUudHJhbnNmb3JtIDogbnVsbDtcblx0Y29uc3QgYmFzZVZhbCA9IHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0uYmFzZVZhbDtcblxuXHRyZXR1cm4gYmFzZVZhbCAmJiBiYXNlVmFsLm51bWJlck9mSXRlbXMgP1xuXHRcdGJhc2VWYWwuZ2V0SXRlbSgwKS5tYXRyaXggOlxuXHRcdHthOiAwLCBiOiAwLCBjOiAwLCBkOiAwLCBlOiAwLCBmOiAwfTtcbn07XG5cbi8qKlxuICogR2V0IHVuaXF1ZSB2YWx1ZSBmcm9tIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhXG4gKiBAcmV0dXJuIHtBcnJheX0gVW5pcXVlIGFycmF5IHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRVbmlxdWUgPSBkYXRhID0+IHtcblx0Y29uc3QgaXNEYXRlID0gZGF0YVswXSBpbnN0YW5jZW9mIERhdGU7XG5cdGNvbnN0IGQgPSAoaXNEYXRlID8gZGF0YS5tYXAoTnVtYmVyKSA6IGRhdGEpXG5cdFx0LmZpbHRlcigodiwgaSwgc2VsZikgPT4gc2VsZi5pbmRleE9mKHYpID09PSBpKTtcblxuXHRyZXR1cm4gaXNEYXRlID8gZC5tYXAodiA9PiBuZXcgRGF0ZSh2KSkgOiBkO1xufTtcblxuLyoqXG4gKiBNZXJnZSBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IG1lcmdlQXJyYXkgPSBhcnIgPT4gKGFyciAmJiBhcnIubGVuZ3RoID8gYXJyLnJlZHVjZSgocCwgYykgPT4gcC5jb25jYXQoYykpIDogW10pO1xuXG4vKipcbiAqIE1lcmdlIG9iamVjdCByZXR1cm5pbmcgbmV3IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdE5cbiAqIEByZXR1cm5zIHtPYmplY3R9IG1lcmdlZCB0YXJnZXQgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBtZXJnZU9iaiA9ICh0YXJnZXQsIC4uLm9iamVjdE4pID0+IHtcblx0aWYgKCFvYmplY3ROLmxlbmd0aCB8fCAob2JqZWN0Ti5sZW5ndGggPT09IDEgJiYgIW9iamVjdE5bMF0pKSB7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fVxuXG5cdGNvbnN0IHNvdXJjZSA9IG9iamVjdE4uc2hpZnQoKTtcblxuXHRpZiAoaXNPYmplY3QodGFyZ2V0KSAmJiBpc09iamVjdChzb3VyY2UpKSB7XG5cdFx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG5cdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gbWVyZ2VPYmoodGFyZ2V0W2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gaXNBcnJheSh2YWx1ZSkgP1xuXHRcdFx0XHRcdHZhbHVlLmNvbmNhdCgpIDogdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gbWVyZ2VPYmoodGFyZ2V0LCAuLi5vYmplY3ROKTtcbn07XG5cbi8qKlxuICogU29ydCB2YWx1ZVxuICogQHBhcmFtIHtBcnJheX0gZGF0YSB2YWx1ZSB0byBiZSBzb3J0ZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNBc2MgdHJ1ZTogYXNjLCBmYWxzZTogZGVzY1xuICogQHJldHVybiB7TnVtYmVyfFN0cmluZ3xEYXRlfSBzb3J0ZWQgZGF0ZVxuICogQHByaXZhdGVcbiAqL1xuY29uc3Qgc29ydFZhbHVlID0gKGRhdGEsIGlzQXNjID0gdHJ1ZSkgPT4ge1xuXHRsZXQgZm47XG5cblx0aWYgKGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlKSB7XG5cdFx0Zm4gPSBpc0FzYyA/IChhLCBiKSA9PiBhIC0gYiA6IChhLCBiKSA9PiBiIC0gYTtcblx0fSBlbHNlIHtcblx0XHRpZiAoaXNBc2MgJiYgIWRhdGEuZXZlcnkoaXNOYU4pKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiBhIC0gYjtcblx0XHR9IGVsc2UgaWYgKCFpc0FzYykge1xuXHRcdFx0Zm4gPSAoYSwgYikgPT4gKGEgPiBiICYmIC0xKSB8fCAoYSA8IGIgJiYgMSkgfHwgKGEgPT09IGIgJiYgMCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGEuY29uY2F0KCkuc29ydChmbik7XG59O1xuXG4vKipcbiAqIEdldCBtaW4vbWF4IHZhbHVlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAnbWluJyBvciAnbWF4J1xuICogQHBhcmFtIHtBcnJheX0gZGF0YSBBcnJheSBkYXRhIHZhbHVlXG4gKiBAcmV0dXJuIHtOdW1iZXJ8RGF0ZXx1bmRlZmluZWR9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRNaW5NYXggPSAodHlwZSwgZGF0YSkgPT4ge1xuXHRsZXQgcmVzID0gZGF0YS5maWx0ZXIodiA9PiBub3RFbXB0eSh2KSk7XG5cblx0aWYgKHJlcy5sZW5ndGgpIHtcblx0XHRpZiAoaXNOdW1iZXIocmVzWzBdKSkge1xuXHRcdFx0cmVzID0gTWF0aFt0eXBlXSguLi5yZXMpO1xuXHRcdH0gZWxzZSBpZiAocmVzWzBdIGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdFx0cmVzID0gc29ydFZhbHVlKHJlcywgdHlwZSA9PT0gXCJtaW5cIilbMF07XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlcyA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdHJldHVybiByZXM7XG59O1xuXG4vKipcbiAqIEdldCByYW5nZVxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0IFN0YXJ0IG51bWJlclxuICogQHBhcmFtIHtOdW1iZXJ9IGVuZCBFbmQgbnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RlcCBTdGVwIG51bWJlclxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRSYW5nZSA9IChzdGFydCwgZW5kLCBzdGVwID0gMSkgPT4ge1xuXHRjb25zdCByZXMgPSBbXTtcblx0Y29uc3QgbiA9IE1hdGgubWF4KDAsIE1hdGguY2VpbCgoZW5kIC0gc3RhcnQpIC8gc3RlcCkpIHwgMDtcblxuXHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBuOyBpKyspIHtcblx0XHRyZXMucHVzaChzdGFydCArIGkgKiBzdGVwKTtcblx0fVxuXG5cdHJldHVybiByZXM7XG59O1xuXG4vLyBlbXVsYXRlIGV2ZW50XG5jb25zdCBlbXVsYXRlRXZlbnQgPSB7XG5cdG1vdXNlOiAoKCkgPT4ge1xuXHRcdGNvbnN0IGdldFBhcmFtcyA9ICgpID0+ICh7XG5cdFx0XHRidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIHNjcmVlblg6IDAsIHNjcmVlblk6IDAsIGNsaWVudFg6IDAsIGNsaWVudFk6IDBcblx0XHR9KTtcblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3XG5cdFx0XHRuZXcgTW91c2VFdmVudChcInRcIik7XG5cblx0XHRcdHJldHVybiAoZWwsIGV2ZW50VHlwZSwgcGFyYW1zID0gZ2V0UGFyYW1zKCkpID0+IHtcblx0XHRcdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcykpO1xuXHRcdFx0fTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHQvLyBQb2x5ZmlsbHMgRE9NNCBNb3VzZUV2ZW50XG5cdFx0XHRyZXR1cm4gKGVsLCBldmVudFR5cGUsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG1vdXNlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvaW5pdE1vdXNlRXZlbnRcblx0XHRcdFx0bW91c2VFdmVudC5pbml0TW91c2VFdmVudChcblx0XHRcdFx0XHRldmVudFR5cGUsXG5cdFx0XHRcdFx0cGFyYW1zLmJ1YmJsZXMsXG5cdFx0XHRcdFx0cGFyYW1zLmNhbmNlbGFibGUsXG5cdFx0XHRcdFx0d2luZG93LFxuXHRcdFx0XHRcdDAsIC8vIHRoZSBldmVudCdzIG1vdXNlIGNsaWNrIGNvdW50XG5cdFx0XHRcdFx0cGFyYW1zLnNjcmVlblgsIHBhcmFtcy5zY3JlZW5ZLFxuXHRcdFx0XHRcdHBhcmFtcy5jbGllbnRYLCBwYXJhbXMuY2xpZW50WSxcblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSkoKSxcblx0dG91Y2g6IChlbCwgZXZlbnRUeXBlLCBwYXJhbXMpID0+IHtcblx0XHRjb25zdCB0b3VjaE9iaiA9IG5ldyBUb3VjaChtZXJnZU9iaih7XG5cdFx0XHRpZGVudGlmaWVyOiBEYXRlLm5vdygpLFxuXHRcdFx0dGFyZ2V0OiBlbCxcblx0XHRcdHJhZGl1c1g6IDIuNSxcblx0XHRcdHJhZGl1c1k6IDIuNSxcblx0XHRcdHJvdGF0aW9uQW5nbGU6IDEwLFxuXHRcdFx0Zm9yY2U6IDAuNVxuXHRcdH0sIHBhcmFtcykpO1xuXG5cdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgVG91Y2hFdmVudChldmVudFR5cGUsIHtcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXG5cdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0c2hpZnRLZXk6IHRydWUsXG5cdFx0XHR0b3VjaGVzOiBbdG91Y2hPYmpdLFxuXHRcdFx0dGFyZ2V0VG91Y2hlczogW10sXG5cdFx0XHRjaGFuZ2VkVG91Y2hlczogW3RvdWNoT2JqXVxuXHRcdH0pKTtcblx0fVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSAgJiByZXR1cm4gYm91bmQgc3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gdHBsIFRlbXBsYXRlIHN0cmluZ1xuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgRGF0YSB2YWx1ZSB0byBiZSByZXBsYWNlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgdHBsUHJvY2VzcyA9ICh0cGwsIGRhdGEpID0+IHtcblx0bGV0IHJlcyA9IHRwbDtcblxuXHRmb3IgKGNvbnN0IHggaW4gZGF0YSkge1xuXHRcdHJlcyA9IHJlcy5yZXBsYWNlKG5ldyBSZWdFeHAoYHs9JHt4fX1gLCBcImdcIiksIGRhdGFbeF0pO1xuXHR9XG5cblx0cmV0dXJuIHJlcztcbn07XG5cbmV4cG9ydCB7XG5cdGFzSGFsZlBpeGVsLFxuXHRicnVzaEVtcHR5LFxuXHRjYWxsRm4sXG5cdGNhcGl0YWxpemUsXG5cdGNlaWwxMCxcblx0ZGlmZkRvbWFpbixcblx0ZW11bGF0ZUV2ZW50LFxuXHRleHRlbmQsXG5cdGdldEJydXNoU2VsZWN0aW9uLFxuXHRnZXRCb3VuZGluZ1JlY3QsXG5cdGdldENzc1J1bGVzLFxuXHRnZXRNaW5NYXgsXG5cdGdldE9wdGlvbixcblx0Z2V0UGF0aEJveCxcblx0Z2V0UmFuZG9tLFxuXHRnZXRSYW5nZSxcblx0Z2V0UmVjdFNlZ0xpc3QsXG5cdGdldFRyYW5zbGF0aW9uLFxuXHRnZXRVbmlxdWUsXG5cdGhhc1ZhbHVlLFxuXHRpc0FycmF5LFxuXHRpc0Jvb2xlYW4sXG5cdGlzRGVmaW5lZCxcblx0aXNFbXB0eSxcblx0aXNGdW5jdGlvbixcblx0aXNOdW1iZXIsXG5cdGlzT2JqZWN0LFxuXHRpc09iamVjdFR5cGUsXG5cdGlzU3RyaW5nLFxuXHRpc1VuZGVmaW5lZCxcblx0aXNWYWx1ZSxcblx0bWVyZ2VBcnJheSxcblx0bWVyZ2VPYmosXG5cdG5vdEVtcHR5LFxuXHRzYW5pdGlzZSxcblx0c2V0VGV4dFZhbHVlLFxuXHRzb3J0VmFsdWUsXG5cdHRvQXJyYXksXG5cdHRwbFByb2Nlc3Ncbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIG9wdGlvbiBjbGFzc1xuICogQGNsYXNzIFN0YW5mb3JkT3B0aW9uc1xuICogQHBhcmFtIHtPcHRpb25zfSBvcHRpb25zIFN0YW5mb3JkIHBsdWdpbiBvcHRpb25zXG4gKiBAZXh0ZW5kcyBQbHVnaW5cbiAqIEByZXR1cm4ge1N0YW5mb3JkT3B0aW9uc31cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRyZXR1cm4ge1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCB0aGUgY29sb3Igb2YgdGhlIGNvbG9yIHNjYWxlLiBUaGlzIGZ1bmN0aW9uIHJlY2VpdmVzIGEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLCBhbmQgc2hvdWxkIHJldHVybiBhIGNvbG9yLlxuXHRcdFx0ICogQG5hbWUgY29sb3JzXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7RnVuY3Rpb259XG5cdFx0XHQgKiBAZGVmYXVsdCB1bmRlZmluZWRcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxuXHRcdFx0ICogICAgICBkMy5oc2woMjUwLCAxLCAwLjUpLCBkMy5oc2woMCwgMSwgMC41KVxuXHRcdFx0ICogICApXG5cdFx0XHQgKi9cblx0XHRcdGNvbG9yczogdW5kZWZpbmVkLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNwZWNpZnkgdGhlIGtleSBvZiBlcG9jaHMgdmFsdWVzIGluIHRoZSBkYXRhLlxuXHRcdFx0ICogQG5hbWUgZXBvY2hzXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFx0ZXBvY2hzOiBbIDEsIDEsIDIsIDIsIC4uLiBdXG5cdFx0XHQqL1xuXHRcdFx0ZXBvY2hzOiBbXSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTaG93IGFkZGl0aW9uYWwgbGluZXMgYW55d2hlcmUgb24gdGhlIGNoYXJ0LlxuXHRcdFx0ICogLSBFYWNoIGxpbmUgb2JqZWN0IHNob3VsZCBjb25zaXN0IHdpdGggZm9sbG93aW5nIG9wdGlvbnM6XG5cdFx0XHQgKlxuXHRcdCBcdCAqIHwgS2V5IHwgVHlwZSB8IERlc2NyaXB0aW9uIHxcblx0XHRcdCAqIHwgLS0tIHwgLS0tIHwgLS0tIHxcblx0XHRcdCAqIHwgeDEgfCBOdW1iZXIgfCBTdGFydGluZyBwb3NpdGlvbiBvbiB0aGUgeCBheGlzIHxcblx0XHRcdCAqIHwgeTEgfCBOdW1iZXIgfCBTdGFydGluZyBwb3NpdGlvbiBvbiB0aGUgeSBheGlzIHxcblx0XHRcdCAqIHwgeDIgfCBOdW1iZXIgfCBFbmRpbmcgcG9zaXRpb24gb24gdGhlIHggYXhpcyAgfFxuXHRcdFx0ICogfCB5MiB8IE51bWJlciB8IEVuZGluZyBwb3NpdGlvbiBvbiB0aGUgeSBheGlzIHxcblx0XHRcdCAqIHwgY2xhc3MgfCBTdHJpbmcgfCBPcHRpb25hbCB2YWx1ZS4gU2V0IGEgY3VzdG9tIGNzcyBjbGFzcyB0byB0aGlzIGxpbmUuIHxcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogICBsaW5lczogW1xuXHRcdFx0ICogICAgICAgeyB4MTogMCwgeTE6IDAsIHgyOiA2NSwgeTI6IDY1LCBjbGFzczogXCJsaW5lMVwiIH0sXG5cdFx0XHQgKiAgICAgICB7IHgxOiAwLCB4MjogNjUsIHkxOiA0MCwgeTI6IDQwLCBjbGFzczogXCJsaW5lMlwiIH1cblx0XHRcdCAqICAgXVxuXHRcdFx0ICovXG5cdFx0XHRsaW5lczogW10sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IHNjYWxlIHZhbHVlc1xuXHRcdFx0ICogQG5hbWUgc2NhbGVcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtPYmplY3R9XG4gXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IFtzY2FsZS5taW49dW5kZWZpbmVkXSBNaW5pbXVtIHZhbHVlIG9mIHRoZSBjb2xvciBzY2FsZS4gRGVmYXVsdDogbG93ZXN0IHZhbHVlIGluIGVwb2Noc1xuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IFtzY2FsZS5tYXg9dW5kZWZpbmVkXSBNYXhpbXVtIHZhbHVlIG9mIHRoZSBjb2xvciBzY2FsZS4gRGVmYXVsdDogaGlnaGVzdCB2YWx1ZSBpbiBlcG9jaHNcblx0XHRcdCAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBbc2NhbGUud2lkdGg9MjBdIFdpZHRoIG9mIHRoZSBjb2xvciBzY2FsZVxuXHRcdFx0ICogQHByb3BlcnR5IHtTdHJpbmd8RnVuY3Rpb259IFtzY2FsZS5mb3JtYXQ9dW5kZWZpbmVkXSBGb3JtYXQgb2YgdGhlIGF4aXMgb2YgdGhlIGNvbG9yIHNjYWxlLiBVc2UgJ3BvdzEwJyB0byBmb3JtYXQgYXMgcG93ZXJzIG9mIDEwIG9yIGEgY3VzdG9tIGZ1bmN0aW9uLiBFeGFtcGxlOiBkMy5mb3JtYXQoXCJkXCIpXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogIHNjYWxlOiB7XG5cdFx0XHQgKiAgICBtYXg6IDEwMDAwLFxuXHRcdFx0ICogICAgbWluOiAxLFxuXHRcdFx0ICogICAgd2lkdGg6IDUwMCxcblx0XHRcdCAqXG5cdFx0XHQgKiAgICAvLyBzcGVjaWZ5ICdwb3cxMCcgdG8gZm9ybWF0IGFzIHBvd2VycyBvZiAxMFxuXHRcdFx0ICogICAgZm9ybWF0OiBcInBvdzEwXCIsXG5cdFx0XHQgKlxuXHRcdFx0ICogICAgLy8gb3Igc3BlY2lmeSBhIGZvcm1hdCBmdW5jdGlvblxuXHRcdFx0ICogICAgZm9ybWF0OiBmdW5jdGlvbih4KSB7XG5cdFx0XHQgKiAgICBcdHJldHVybiB4ICtcIiVcIjtcblx0XHRcdCAqICAgIH1cblx0XHRcdCAqICB9LFxuXHRcdFx0ICovXG5cdFx0XHRzY2FsZV9taW46IHVuZGVmaW5lZCxcblx0XHRcdHNjYWxlX21heDogdW5kZWZpbmVkLFxuXHRcdFx0c2NhbGVfd2lkdGg6IDIwLFxuXHRcdFx0c2NhbGVfZm9ybWF0OiB1bmRlZmluZWQsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIHBhZGRpbmcgZm9yIGNvbG9yIHNjYWxlIGVsZW1lbnRcblx0XHRcdCAqIEBuYW1lIHBhZGRpbmdcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtPYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3BhZGRpbmcudG9wPTBdIFRvcCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IFtwYWRkaW5nLnJpZ2h0PTBdIFJpZ2h0IHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAcHJvcGVydHkge051bWJlcn0gW3BhZGRpbmcuYm90dG9tPTBdIEJvdHRvbSBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQHByb3BlcnR5IHtOdW1iZXJ9IFtwYWRkaW5nLmxlZnQ9MF0gTGVmdCBwYWRkaW5nIHZhbHVlLlxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICBwYWRkaW5nOiB7XG5cdFx0XHQgKiAgICAgdG9wOiAxNSxcblx0XHRcdCAqICAgICByaWdodDogMCxcblx0XHRcdCAqICAgICBib3R0b206IDAsXG5cdFx0XHQgKiAgICAgbGVmdDogMFxuXHRcdFx0ICogIH0sXG5cdFx0XHQgKi9cblx0XHRcdHBhZGRpbmdfdG9wOiAwLFxuXHRcdFx0cGFkZGluZ19yaWdodDogMCxcblx0XHRcdHBhZGRpbmdfYm90dG9tOiAwLFxuXHRcdFx0cGFkZGluZ19sZWZ0OiAwLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNob3cgYWRkaXRpb25hbCByZWdpb25zIGFueXdoZXJlIG9uIHRoZSBjaGFydC5cblx0XHRcdCAqIC0gRWFjaCByZWdpb24gb2JqZWN0IHNob3VsZCBjb25zaXN0IHdpdGggZm9sbG93aW5nIG9wdGlvbnM6XG5cdFx0XHQgKlxuXHRcdFx0ICogICB8IEtleSB8IFR5cGUgfCBEZWZhdWx0IHwgQXR0cmlidXRlcyB8IERlc2NyaXB0aW9uIHxcblx0XHRcdCAqICAgfCAtLS0gfCAtLS0gfCAtLS0gfCAtLS0gfCAtLS0gfFxuXHRcdFx0ICogICB8IHBvaW50cyB8IEFycmF5IHwgIHwgfCBBY2NlcHRzIGEgZ3JvdXAgb2Ygb2JqZWN0cyB0aGF0IGhhcyB4IGFuZCB5Ljxicj5UaGVzZSBwb2ludHMgc2hvdWxkIGJlIGFkZGVkIGluIGEgY291bnRlci1jbG9ja3dpc2UgZmFzaGlvbiB0byBtYWtlIGEgY2xvc2VkIHBvbHlnb24uIHxcblx0XHRcdCAqICAgfCBvcGFjaXR5IHwgTnVtYmVyIHwgYDAuMmAgfCAmbHQ7b3B0aW9uYWw+IHwgU2V0cyB0aGUgb3BhY2l0eSBvZiB0aGUgcmVnaW9uIGFzIHZhbHVlIGJldHdlZW4gMCBhbmQgMSB8XG5cdFx0XHQgKiAgIHwgdGV4dCB8IEZ1bmN0aW9uIHwgIHwgJmx0O29wdGlvbmFsPiB8IFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgYSB2YWx1ZSBhbmQgcGVyY2VudGFnZSBvZiB0aGUgbnVtYmVyIG9mIGVwb2NocyBpbiB0aGlzIHJlZ2lvbi48YnI+UmV0dXJuIGEgc3RyaW5nIHRvIHBsYWNlIHRleHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcmVnaW9uLiB8XG5cdFx0XHQgKiAgIHwgY2xhc3MgfCBTdHJpbmcgfCB8ICZsdDtvcHRpb25hbD4gfCBTZSBhIGN1c3RvbSBjc3MgY2xhc3MgdG8gdGhpcyByZWdpb24sIHVzZSB0aGUgZmlsbCBwcm9wZXJ0eSBpbiBjc3MgdG8gc2V0IGEgYmFja2dyb3VuZCBjb2xvci4gfFxuXHRcdFx0ICogQG5hbWUgcmVnaW9uc1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgIHJlZ2lvbnM6IFtcblx0XHRcdCAqICAgICAgIHtcblx0XHRcdCAqICAgICAgICAgICBwb2ludHM6IFsgLy8gYWRkIHBvaW50cyBjb3VudGVyLWNsb2Nrd2lzZVxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDAsIHk6IDAgfSxcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiA0MCwgeTogNDAgfSxcblx0XHRcdCAqICAgICAgICAgICAgICAgeyB4OiAwLCB5OiA0MCB9LFxuXHRcdFx0ICogICAgICAgICAgIF0sXG5cdFx0XHQgKiAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKHZhbHVlLCBwZXJjZW50YWdlKSB7XG5cdFx0XHQgKiAgICAgICAgICAgICAgIHJldHVybiBgTm9ybWFsIE9wZXJhdGlvbnM6ICR7dmFsdWV9ICgke3BlcmNlbnRhZ2V9JSlgO1xuXHRcdFx0ICogICAgICAgICAgIH0sXG5cdFx0XHQgKiAgICAgICAgICAgb3BhY2l0eTogMC4yLCAvLyAwIHRvIDFcblx0XHRcdCAqICAgICAgICAgICBjbGFzczogXCJ0ZXN0LXBvbHlnb24xXCJcblx0XHQgXHQgKiAgICAgICB9LFxuXHRcdFx0ICogICAgICAgLi4uXG5cdFx0XHQgKiAgIF1cblx0XHRcdCAqL1xuXHRcdFx0cmVnaW9uczogW11cblx0XHR9O1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXG5cdHN0YW5mb3JkTGluZXM6IFwiYmItc3RhbmZvcmQtbGluZXNcIixcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCJcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBwb2ludEluUmVnaW9uKHBvaW50LCByZWdpb24pIHsgLy8gdGhhbmtzIHRvOiBodHRwOi8vYmwub2Nrcy5vcmcvYnljb2ZmZS81NTc1OTA0XG5cdC8vIHJheS1jYXN0aW5nIGFsZ29yaXRobSBiYXNlZCBvblxuXHQvLyBodHRwOi8vd3d3LmVjc2UucnBpLmVkdS9Ib21lcGFnZXMvd3JmL1Jlc2VhcmNoL1Nob3J0X05vdGVzL3BucG9seS5odG1sXG5cdGNvbnN0IHggPSBwb2ludC54O1xuXHRjb25zdCB5ID0gcG9pbnQudmFsdWU7XG5cdGxldCBpbnNpZGUgPSBmYWxzZTtcblxuXHRmb3IgKGxldCBpID0gMCwgaiA9IHJlZ2lvbi5sZW5ndGggLSAxOyBpIDwgcmVnaW9uLmxlbmd0aDsgaiA9IGkrKykge1xuXHRcdGNvbnN0IHhpID0gcmVnaW9uW2ldLng7XG5cdFx0Y29uc3QgeWkgPSByZWdpb25baV0ueTtcblxuXHRcdGNvbnN0IHhqID0gcmVnaW9uW2pdLng7XG5cdFx0Y29uc3QgeWogPSByZWdpb25bal0ueTtcblxuXHRcdGNvbnN0IGludGVyc2VjdCA9ICgoeWkgPiB5KSAhPT0gKHlqID4geSkpICYmICh4IDwgKHhqIC0geGkpICogKHkgLSB5aSkgLyAoeWogLSB5aSkgKyB4aSk7XG5cblx0XHRpZiAoaW50ZXJzZWN0KSB7XG5cdFx0XHRpbnNpZGUgPSAhaW5zaWRlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBpbnNpZGU7XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVFcG9jaHMoYSwgYikge1xuXHRpZiAoYS5lcG9jaHMgPCBiLmVwb2Nocykge1xuXHRcdHJldHVybiAtMTtcblx0fVxuXG5cdGlmIChhLmVwb2NocyA+IGIuZXBvY2hzKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRyZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gZ2V0UmVnaW9uQXJlYShwb2ludHMpIHsgLy8gdGhhbmtzIHRvOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjI4MjMzMC9maW5kLWNlbnRlcnBvaW50LW9mLXBvbHlnb24taW4tamF2YXNjcmlwdFxuXHRsZXQgYXJlYSA9IDA7XG5cdGxldCBwb2ludDE7XG5cdGxldCBwb2ludDI7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGwgPSBwb2ludHMubGVuZ3RoLCBqID0gbCAtIDE7IGkgPCBsOyBqID0gaSwgaSsrKSB7XG5cdFx0cG9pbnQxID0gcG9pbnRzW2ldO1xuXHRcdHBvaW50MiA9IHBvaW50c1tqXTtcblx0XHRhcmVhICs9IHBvaW50MS54ICogcG9pbnQyLnk7XG5cdFx0YXJlYSAtPSBwb2ludDEueSAqIHBvaW50Mi54O1xuXHR9XG5cblx0YXJlYSAvPSAyO1xuXG5cdHJldHVybiBhcmVhO1xufVxuXG5mdW5jdGlvbiBnZXRDZW50cm9pZChwb2ludHMpIHtcblx0Y29uc3QgYXJlYSA9IGdldFJlZ2lvbkFyZWEocG9pbnRzKTtcblxuXHRsZXQgeCA9IDA7XG5cdGxldCB5ID0gMDtcblx0bGV0IGY7XG5cblx0Zm9yIChsZXQgaSA9IDAsIGwgPSBwb2ludHMubGVuZ3RoLCBqID0gbCAtIDE7IGkgPCBsOyBqID0gaSwgaSsrKSB7XG5cdFx0Y29uc3QgcG9pbnQxID0gcG9pbnRzW2ldO1xuXHRcdGNvbnN0IHBvaW50MiA9IHBvaW50c1tqXTtcblxuXHRcdGYgPSBwb2ludDEueCAqIHBvaW50Mi55IC0gcG9pbnQyLnggKiBwb2ludDEueTtcblx0XHR4ICs9IChwb2ludDEueCArIHBvaW50Mi54KSAqIGY7XG5cdFx0eSArPSAocG9pbnQxLnkgKyBwb2ludDIueSkgKiBmO1xuXHR9XG5cblx0ZiA9IGFyZWEgKiA2O1xuXG5cdHJldHVybiB7XG5cdFx0eDogeCAvIGYsXG5cdFx0eTogeSAvIGZcblx0fTtcbn1cblxuZXhwb3J0IHtcblx0Y29tcGFyZUVwb2Nocyxcblx0Z2V0Q2VudHJvaWQsXG5cdGdldFJlZ2lvbkFyZWEsXG5cdHBvaW50SW5SZWdpb25cbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4vY2xhc3Nlc1wiO1xuaW1wb3J0IHtpc1N0cmluZ30gZnJvbSBcIi4uLy4uL2ludGVybmFscy91dGlsXCI7XG5pbXBvcnQge2dldENlbnRyb2lkfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW4gZWxlbWVudCBjbGFzc1xuICogQGNsYXNzIENvbG9yU2NhbGVcbiAqIEBwYXJhbSB7U3RhbmZvcmR9IG93bmVyIFN0YW5mb3JkIGluc3RhbmNlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50cyB7XG5cdGNvbnN0cnVjdG9yKG93bmVyKSB7XG5cdFx0dGhpcy5vd25lciA9IG93bmVyO1xuXG5cdFx0Ly8gTUVNTzogQXZvaWQgYmxvY2tpbmcgZXZlbnRSZWN0XG5cdFx0Y29uc3QgZWxlbWVudHMgPSBvd25lci4kJC5tYWluLnNlbGVjdChcIi5iYi1jaGFydFwiKVxuXHRcdFx0LmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgQ0xBU1Muc3RhbmZvcmRFbGVtZW50cyk7XG5cblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZExpbmVzKTtcblx0XHRlbGVtZW50cy5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5zdGFuZm9yZFJlZ2lvbnMpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRMaW5lcyhkdXJhdGlvbikge1xuXHRcdGNvbnN0ICQkID0gdGhpcy5vd25lci4kJDtcblx0XHRjb25zdCBtYWluID0gJCQubWFpbjtcblx0XHRjb25zdCBjb25maWcgPSAkJC5jb25maWc7XG5cdFx0Y29uc3QgaXNSb3RhdGVkID0gY29uZmlnLmF4aXNfcm90YXRlZDtcblx0XHRjb25zdCB4dkN1c3RvbSA9IHRoaXMueHZDdXN0b20uYmluZCgkJCk7XG5cdFx0Y29uc3QgeXZDdXN0b20gPSB0aGlzLnl2Q3VzdG9tLmJpbmQoJCQpO1xuXG5cdFx0Ly8gU3RhbmZvcmQtTGluZXNcblx0XHRjb25zdCBzdGFuZm9yZExpbmUgPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRMaW5lc31gKVxuXHRcdFx0LnN0eWxlKFwic2hhcGUtcmVuZGVyaW5nXCIsIFwiZ2VvbWV0cmljcHJlY2lzaW9uXCIpXG5cdFx0XHQuc2VsZWN0QWxsKGAuJHtDTEFTUy5zdGFuZm9yZExpbmV9YClcblx0XHRcdC5kYXRhKHRoaXMub3duZXIuY29uZmlnLmxpbmVzKTtcblxuXHRcdC8vIGV4aXRcblx0XHRzdGFuZm9yZExpbmUuZXhpdCgpLnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcblx0XHRcdC5yZW1vdmUoKTtcblxuXHRcdC8vIGVudGVyXG5cdFx0Y29uc3Qgc3RhbmZvcmRMaW5lRW50ZXIgPSBzdGFuZm9yZExpbmUuZW50ZXIoKS5hcHBlbmQoXCJnXCIpO1xuXG5cdFx0c3RhbmZvcmRMaW5lRW50ZXIuYXBwZW5kKFwibGluZVwiKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cblx0XHRzdGFuZm9yZExpbmVFbnRlclxuXHRcdFx0Lm1lcmdlKHN0YW5mb3JkTGluZSlcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgZCA9PiBDTEFTUy5zdGFuZm9yZExpbmUgKyAoZC5jbGFzcyA/IGAgJHtkLmNsYXNzfWAgOiBcIlwiKSlcblx0XHRcdC5zZWxlY3QoXCJsaW5lXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcIngxXCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGQsIFwieTFcIikgOiB4dkN1c3RvbShkLCBcIngxXCIpKSlcblx0XHRcdC5hdHRyKFwieDJcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZCwgXCJ5MlwiKSA6IHh2Q3VzdG9tKGQsIFwieDJcIikpKVxuXHRcdFx0LmF0dHIoXCJ5MVwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShkLCBcIngxXCIpIDogeXZDdXN0b20oZCwgXCJ5MVwiKSkpXG5cdFx0XHQuYXR0cihcInkyXCIsIGQgPT4gKGlzUm90YXRlZCA/IHh2Q3VzdG9tKGQsIFwieDJcIikgOiB5dkN1c3RvbShkLCBcInkyXCIpKSlcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXHR9XG5cblx0dXBkYXRlU3RhbmZvcmRSZWdpb25zKGR1cmF0aW9uKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzLm93bmVyLiQkO1xuXHRcdGNvbnN0IG1haW4gPSAkJC5tYWluO1xuXHRcdGNvbnN0IGNvbmZpZyA9ICQkLmNvbmZpZztcblx0XHRjb25zdCBpc1JvdGF0ZWQgPSBjb25maWcuYXhpc19yb3RhdGVkO1xuXHRcdGNvbnN0IHh2Q3VzdG9tID0gdGhpcy54dkN1c3RvbS5iaW5kKCQkKTtcblx0XHRjb25zdCB5dkN1c3RvbSA9IHRoaXMueXZDdXN0b20uYmluZCgkJCk7XG5cdFx0Y29uc3QgY291bnRQb2ludHNJblJlZ2lvbiA9IHRoaXMub3duZXIuY291bnRFcG9jaHNJblJlZ2lvbi5iaW5kKCQkKTtcblxuXHRcdC8vIFN0YW5mb3JkLVJlZ2lvbnNcblx0XHRsZXQgc3RhbmZvcmRSZWdpb24gPSBtYWluLnNlbGVjdChgLiR7Q0xBU1Muc3RhbmZvcmRSZWdpb25zfWApXG5cdFx0XHQuc2VsZWN0QWxsKGAuJHtDTEFTUy5zdGFuZm9yZFJlZ2lvbn1gKVxuXHRcdFx0LmRhdGEodGhpcy5vd25lci5jb25maWcucmVnaW9ucyk7XG5cblx0XHQvLyBleGl0XG5cdFx0c3RhbmZvcmRSZWdpb24uZXhpdCgpLnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIilcblx0XHRcdC5yZW1vdmUoKTtcblxuXHRcdC8vIGVudGVyXG5cdFx0Y29uc3Qgc3RhbmZvcmRSZWdpb25FbnRlciA9IHN0YW5mb3JkUmVnaW9uLmVudGVyKCkuYXBwZW5kKFwiZ1wiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uRW50ZXIuYXBwZW5kKFwicG9seWdvblwiKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cblx0XHRzdGFuZm9yZFJlZ2lvbkVudGVyLmFwcGVuZChcInRleHRcIilcblx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGlzUm90YXRlZCA/IFwicm90YXRlKC05MClcIiA6IFwiXCIpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMFwiKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uID0gc3RhbmZvcmRSZWdpb25FbnRlci5tZXJnZShzdGFuZm9yZFJlZ2lvbik7XG5cblx0XHQvLyB1cGRhdGVcblx0XHRzdGFuZm9yZFJlZ2lvblxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBkID0+IENMQVNTLnN0YW5mb3JkUmVnaW9uICsgKGQuY2xhc3MgPyBgICR7ZC5jbGFzc31gIDogXCJcIikpXG5cdFx0XHQuc2VsZWN0KFwicG9seWdvblwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJwb2ludHNcIiwgZCA9PiBkLnBvaW50cy5tYXAodmFsdWUgPT4gW1xuXHRcdFx0XHRpc1JvdGF0ZWQgPyB5dkN1c3RvbSh2YWx1ZSwgXCJ5XCIpIDogeHZDdXN0b20odmFsdWUsIFwieFwiKSxcblx0XHRcdFx0aXNSb3RhdGVkID8geHZDdXN0b20odmFsdWUsIFwieFwiKSA6IHl2Q3VzdG9tKHZhbHVlLCBcInlcIilcblx0XHRcdF0uam9pbihcIixcIikpLmpvaW4oXCIgXCIpKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBkID0+IFN0cmluZyhkLm9wYWNpdHkgPyBkLm9wYWNpdHkgOiAwLjIpKTtcblxuXHRcdHN0YW5mb3JkUmVnaW9uLnNlbGVjdChcInRleHRcIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwieFwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieVwiKSA6IHh2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ4XCIpKSlcblx0XHRcdC5hdHRyKFwieVwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieFwiKSA6IHl2Q3VzdG9tKGdldENlbnRyb2lkKGQucG9pbnRzKSwgXCJ5XCIpKSlcblx0XHRcdC50ZXh0KGQgPT4ge1xuXHRcdFx0XHRpZiAoZC50ZXh0KSB7XG5cdFx0XHRcdFx0Y29uc3Qge3ZhbHVlLCBwZXJjZW50YWdlfSA9IGNvdW50UG9pbnRzSW5SZWdpb24oZC5wb2ludHMpO1xuXG5cdFx0XHRcdFx0cmV0dXJuIGQudGV4dCh2YWx1ZSwgcGVyY2VudGFnZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gXCJcIjtcblx0XHRcdH0pXG5cdFx0XHQuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG5cdFx0XHQuYXR0cihcImRvbWluYW50LWJhc2VsaW5lXCIsIFwibWlkZGxlXCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblx0fVxuXG5cdHVwZGF0ZVN0YW5mb3JkRWxlbWVudHMoZHVyYXRpb24gPSAwKSB7XG5cdFx0dGhpcy51cGRhdGVTdGFuZm9yZExpbmVzKGR1cmF0aW9uKTtcblx0XHR0aGlzLnVwZGF0ZVN0YW5mb3JkUmVnaW9ucyhkdXJhdGlvbik7XG5cdH1cblxuXHR4dkN1c3RvbShkLCB4eVZhbHVlKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGxldCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0aWYgKCQkLmlzVGltZVNlcmllcygpKSB7XG5cdFx0XHR2YWx1ZSA9ICQkLnBhcnNlRGF0ZSh2YWx1ZSk7XG5cdFx0fSBlbHNlIGlmICgkJC5pc0NhdGVnb3JpemVkKCkgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9ICQkLmNvbmZpZy5heGlzX3hfY2F0ZWdvcmllcy5pbmRleE9mKGQudmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoJCQueCh2YWx1ZSkpO1xuXHR9XG5cblx0eXZDdXN0b20oZCwgeHlWYWx1ZSkge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB5U2NhbGUgPSBkLmF4aXMgJiYgZC5heGlzID09PSBcInkyXCIgPyAkJC55MiA6ICQkLnk7XG5cdFx0Y29uc3QgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdHJldHVybiBNYXRoLmNlaWwoeVNjYWxlKHZhbHVlKSk7XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7YXhpc1JpZ2h0IGFzIGQzQXhpc1JpZ2h0fSBmcm9tIFwiZDMtYXhpc1wiO1xuaW1wb3J0IHtmb3JtYXQgYXMgZDNGb3JtYXR9IGZyb20gXCJkMy1mb3JtYXRcIjtcbmltcG9ydCB7c2NhbGVTZXF1ZW50aWFsIGFzIGQzU2NhbGVTZXF1ZW50aWFsLCBzY2FsZUxvZyBhcyBkM1NjYWxlTG9nfSBmcm9tIFwiZDMtc2NhbGVcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi9jbGFzc2VzXCI7XG5pbXBvcnQge2lzRnVuY3Rpb24sIGdldFJhbmdlfSBmcm9tIFwiLi4vLi4vaW50ZXJuYWxzL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBjb2xvciBzY2FsZSBjbGFzc1xuICogQGNsYXNzIENvbG9yU2NhbGVcbiAqIEBwYXJhbSB7U3RhbmZvcmR9IG93bmVyIFN0YW5mb3JkIGluc3RhbmNlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclNjYWxlIHtcblx0Y29uc3RydWN0b3Iob3duZXIpIHtcblx0XHR0aGlzLm93bmVyID0gb3duZXI7XG5cdH1cblxuXHRkcmF3Q29sb3JTY2FsZSgpIHtcblx0XHRjb25zdCAkJCA9IHRoaXMub3duZXIuJCQ7XG5cdFx0Y29uc3QgY29uZmlnID0gdGhpcy5vd25lci5jb25maWc7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xuXHRcdGNvbnN0IGhlaWdodCA9ICQkLmhlaWdodCAtIGNvbmZpZy5wYWRkaW5nX2JvdHRvbSAtIGNvbmZpZy5wYWRkaW5nX3RvcDtcblx0XHRjb25zdCBiYXJXaWR0aCA9IGNvbmZpZy5zY2FsZV93aWR0aDtcblx0XHRjb25zdCBiYXJIZWlnaHQgPSA1O1xuXHRcdGNvbnN0IHBvaW50cyA9IGdldFJhbmdlKGNvbmZpZy5wYWRkaW5nX2JvdHRvbSwgaGVpZ2h0LCBiYXJIZWlnaHQpO1xuXG5cdFx0Y29uc3QgaW52ZXJzZVNjYWxlID0gZDNTY2FsZVNlcXVlbnRpYWwodGFyZ2V0LmNvbG9ycylcblx0XHRcdC5kb21haW4oW3BvaW50c1twb2ludHMubGVuZ3RoIC0gMV0sIHBvaW50c1swXV0pO1xuXG5cdFx0aWYgKHRoaXMuY29sb3JTY2FsZSkge1xuXHRcdFx0dGhpcy5jb2xvclNjYWxlLnJlbW92ZSgpO1xuXHRcdH1cblxuXHRcdHRoaXMuY29sb3JTY2FsZSA9ICQkLnN2Zy5hcHBlbmQoXCJnXCIpXG5cdFx0XHQuYXR0cihcIndpZHRoXCIsIDUwKVxuXHRcdFx0LmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5jb2xvclNjYWxlKTtcblxuXHRcdHRoaXMuY29sb3JTY2FsZS5hcHBlbmQoXCJnXCIpXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDAsICR7Y29uZmlnLnBhZGRpbmdfdG9wfSlgKVxuXHRcdFx0LnNlbGVjdEFsbChcImJhcnNcIilcblx0XHRcdC5kYXRhKHBvaW50cylcblx0XHRcdC5lbnRlcigpXG5cdFx0XHQuYXBwZW5kKFwicmVjdFwiKVxuXHRcdFx0LmF0dHIoXCJ5XCIsIChkLCBpKSA9PiBpICogYmFySGVpZ2h0KVxuXHRcdFx0LmF0dHIoXCJ4XCIsIDApXG5cdFx0XHQuYXR0cihcIndpZHRoXCIsIGJhcldpZHRoKVxuXHRcdFx0LmF0dHIoXCJoZWlnaHRcIiwgYmFySGVpZ2h0KVxuXHRcdFx0LmF0dHIoXCJmaWxsXCIsIGQgPT4gaW52ZXJzZVNjYWxlKGQpKTtcblxuXHRcdC8vIExlZ2VuZCBBeGlzXG5cdFx0Y29uc3QgYXhpc1NjYWxlID0gZDNTY2FsZUxvZygpXG5cdFx0XHQuZG9tYWluKFt0YXJnZXQubWluRXBvY2hzLCB0YXJnZXQubWF4RXBvY2hzXSlcblx0XHRcdC5yYW5nZShbXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcCArIHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0gKyBiYXJIZWlnaHQgLSAxLFxuXHRcdFx0XHRwb2ludHNbMF0gKyBjb25maWcucGFkZGluZ190b3Bcblx0XHRcdF0pO1xuXG5cdFx0Y29uc3QgbGVnZW5kQXhpcyA9IGQzQXhpc1JpZ2h0KGF4aXNTY2FsZSk7XG5cdFx0Y29uc3Qgc2NhbGVGb3JtYXQgPSBjb25maWcuc2NhbGVfZm9ybWF0O1xuXG5cdFx0aWYgKHNjYWxlRm9ybWF0ID09PSBcInBvdzEwXCIpIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja1ZhbHVlcyhbMSwgMTAsIDEwMCwgMTAwMCwgMTAwMDAsIDEwMDAwMCwgMTAwMDAwMCwgMTAwMDAwMDBdKTtcblx0XHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2NhbGVGb3JtYXQpKSB7XG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tGb3JtYXQoc2NhbGVGb3JtYXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tGb3JtYXQoZDNGb3JtYXQoXCJkXCIpKTtcblx0XHR9XG5cblx0XHQvLyBEcmF3IEF4aXNcblx0XHRjb25zdCBheGlzID0gdGhpcy5jb2xvclNjYWxlLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgXCJsZWdlbmQgYXhpc1wiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke2JhcldpZHRofSwwKWApXG5cdFx0XHQuY2FsbChsZWdlbmRBeGlzKTtcblxuXHRcdGlmIChzY2FsZUZvcm1hdCA9PT0gXCJwb3cxMFwiKSB7XG5cdFx0XHRheGlzLnNlbGVjdEFsbChcIi50aWNrIHRleHRcIilcblx0XHRcdFx0LnRleHQobnVsbClcblx0XHRcdFx0LmZpbHRlcihkID0+IGQgLyBNYXRoLnBvdygxMCwgTWF0aC5jZWlsKE1hdGgubG9nKGQpIC8gTWF0aC5MTjEwIC0gMWUtMTIpKSA9PT0gMSkgLy8gUG93ZXIgb2YgVGVuXG5cdFx0XHRcdC50ZXh0KDEwKVxuXHRcdFx0XHQuYXBwZW5kKFwidHNwYW5cIilcblx0XHRcdFx0LmF0dHIoXCJkeVwiLCBcIi0uN2VtXCIpIC8vIGh0dHBzOi8vYmwub2Nrcy5vcmcvbWJvc3RvY2svNjczODIyOVxuXHRcdFx0XHQudGV4dChkID0+IE1hdGgucm91bmQoTWF0aC5sb2coZCkgLyBNYXRoLkxOMTApKTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7JCQuY3VycmVudFdpZHRoIC0gdGhpcy54Rm9yQ29sb3JTY2FsZSgpfSwgMClgKTtcblx0fVxuXG5cdHhGb3JDb2xvclNjYWxlKCkge1xuXHRcdHJldHVybiB0aGlzLm93bmVyLmNvbmZpZy5wYWRkaW5nX3JpZ2h0ICtcblx0XHRcdHRoaXMuY29sb3JTY2FsZS5ub2RlKCkuZ2V0QkJveCgpLndpZHRoO1xuXHR9XG5cblx0Z2V0Q29sb3JTY2FsZVBhZGRpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMueEZvckNvbG9yU2NhbGUoKSArIHRoaXMub3duZXIuY29uZmlnLnBhZGRpbmdfbGVmdCArIDIwO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge2ludGVycG9sYXRlSHNsTG9uZyBhcyBkM0ludGVycG9sYXRlSHNsTG9uZ30gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5pbXBvcnQge2hzbCBhcyBkM0hzbH0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQge3NjYWxlU2VxdWVudGlhbExvZyBhcyBkM1NjYWxlU2VxdWVudGlhbExvZ30gZnJvbSBcImQzLXNjYWxlXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4uLy4uL2NvbmZpZy9jbGFzc2VzXCI7XG5pbXBvcnQge2lzRW1wdHksIGlzRnVuY3Rpb24sIGlzU3RyaW5nfSBmcm9tIFwiLi4vLi4vaW50ZXJuYWxzL3V0aWxcIjtcbmltcG9ydCBQbHVnaW4gZnJvbSBcIi4uL1BsdWdpblwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9uc1wiO1xuaW1wb3J0IEVsZW1lbnRzIGZyb20gXCIuL0VsZW1lbnRzXCI7XG5pbXBvcnQgQ29sb3JTY2FsZSBmcm9tIFwiLi9Db2xvclNjYWxlXCI7XG5pbXBvcnQge3BvaW50SW5SZWdpb24sIGNvbXBhcmVFcG9jaHN9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpblxuICogLSAqKk5PVEU6KipcbiAqICAgLSBQbHVnaW5zIGFyZW4ndCBidWlsdC1pbi4gTmVlZCB0byBiZSBsb2FkZWQgb3IgaW1wb3J0ZWQgdG8gYmUgdXNlZC5cbiAqICAgLSBOb24gcmVxdWlyZWQgbW9kdWxlcyBmcm9tIGJpbGxib2FyZC5qcyBjb3JlLCBuZWVkIHRvIGJlIGluc3RhbGxlZCBzZXBhcmF0ZWx5LlxuICogICAtIElzIHByZWZlcmFibGUgdXNlIGBzY2F0dGVyYCBhcyBkYXRhLnR5cGVcbiAqIC0gKipSZXF1aXJlZCBtb2R1bGVzOioqXG4gKiAgIC0gW2QzLXNlbGVjdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNlbGVjdGlvbilcbiAqICAgLSBbZDMtaW50ZXJwb2xhdGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1pbnRlcnBvbGF0ZSlcbiAqICAgLSBbZDMtY29sb3JdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1jb2xvcilcbiAqICAgLSBbZDMtc2NhbGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zY2FsZSlcbiAqICAgLSBbZDMtYnJ1c2hdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1icnVzaClcbiAqICAgLSBbZDMtYXhpc10oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWF4aXMpXG4gKiAgIC0gW2QzLWZvcm1hdF0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWZvcm1hdClcbiAqIEBjbGFzcyBwbHVnaW4tc3RhbmZvcmRcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cbiAqIEByZXF1aXJlcyBkMy1pbnRlcnBvbGF0ZVxuICogQHJlcXVpcmVzIGQzLWNvbG9yXG4gKiBAcmVxdWlyZXMgZDMtc2NhbGVcbiAqIEByZXF1aXJlcyBkMy1icnVzaFxuICogQHJlcXVpcmVzIGQzLWF4aXNcbiAqIEByZXF1aXJlcyBkMy1mb3JtYXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFN0YW5mb3JkIHBsdWdpbiBvcHRpb25zXG4gKiBAZXh0ZW5kcyBQbHVnaW5cbiAqIEByZXR1cm4ge1N0YW5mb3JkfVxuICogQGV4YW1wbGVcbiAqICB2YXIgY2hhcnQgPSBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgZGF0YToge1xuICogICAgICAgIGNvbHVtbnM6IFsgLi4uIF0sXG4gKiAgICAgICAgdHlwZTogXCJzY2F0dGVyXCJcbiAqICAgICB9XG4gKiAgICAgLi4uXG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBiYi5wbHVnaW4uc3RhbmZvcmQoe1xuICogICAgICAgICAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxuICogICAgICAgICAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXG4gKiAgICAgICAgICAgKSxcbiAqICAgICAgICAgICBlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF0sXG4gKiAgICAgICAgICAgbGluZXM6IFtcbiAqICAgICAgICAgICAgICAgICAgeyB4MTogMCwgeTE6IDAsIHgyOiA2NSwgeTI6IDY1LCBjbGFzczogXCJsaW5lMVwiIH0sXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxuICogICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgc2NhbGU6IHtcbiAqICAgICAgICAgICBcdG1heDogMTAwMDAsXG4gKiAgICAgICAgICAgICBcdG1pbjogMSxcbiAqICAgICAgICAgICBcdHdpZHRoOiA1MDAsXG4gKiAgICAgICAgICAgICBcdGZvcm1hdDogJ3BvdzEwJyxcbiAqICAgICAgICAgICB9LFxuICogICAgICAgICAgIHBhZGRpbmc6IHtcbiAqICAgICAgICAgICBcdHRvcDogMTUsXG4gKiAgICAgICAgICAgXHRyaWdodDogMCxcbiAqICAgICAgICAgICBcdGJvdHRvbTogMCxcbiAqICAgICAgICAgICBcdGxlZnQ6IDBcbiAqICAgICAgICAgICB9LFxuICogICAgICAgICAgIHJlZ2lvbnM6IFtcbiAqICAgICAgICAgICBcdHtcbiAqICAgICAgICAgICAgICAgXHRwb2ludHM6IFsgLy8gYWRkIHBvaW50cyBjb3VudGVyLWNsb2Nrd2lzZVxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDAsIHk6IDAgfSxcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiA0MCwgeTogNDAgfSxcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiA0MCB9XG4gKiAgICAgICAgICAgICAgIFx0XSxcbiAqICAgICAgICAgICAgICAgXHR0ZXh0OiBmdW5jdGlvbiAodmFsdWUsIHBlcmNlbnRhZ2UpIHtcbiAqICAgICAgICAgICAgICAgXHQgICAgcmV0dXJuIGBOb3JtYWwgT3BlcmF0aW9uczogJHt2YWx1ZX0gKCR7cGVyY2VudGFnZX0lKWA7XG4gKiAgICAgICAgICAgICAgIFx0fSxcbiAqICAgICAgICAgICAgICAgXHRvcGFjaXR5OiAwLjIsIC8vIDAgdG8gMVxuICogICAgICAgICAgICAgICBcdGNsYXNzOiBcInRlc3QtcG9seWdvbjFcIlxuICogICAgICAgICAgICAgIH0sXG4gKiAgICAgICAgICAgICBcdC4uLlxuICogICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgXVxuICogIH0pO1xuICogQGV4YW1wbGVcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XG4gKiBpbXBvcnQgU3RhbmZvcmQgZnJvbSBcImJpbGxib2FyZC5qcy9kaXN0L2JpbGxib2FyZGpzLXBsdWdpbi1zdGFuZm9yZFwiO1xuICpcbiAqIGJiLmdlbmVyYXRlKHtcbiAqICAgICBwbHVnaW5zOiBbXG4gKiAgICAgICAgbmV3IFN0YW5mb3JkKHsgLi4uIH0pXG4gKiAgICAgXVxuICogfSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmZvcmQgZXh0ZW5kcyBQbHVnaW4ge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIob3B0aW9ucyk7XG5cdFx0dGhpcy5jb25maWcgPSBuZXcgT3B0aW9ucygpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQkYmVmb3JlSW5pdCgpIHtcblx0XHRjb25zdCAkJCA9IHRoaXMuJCQ7XG5cblx0XHQvLyBvdmVycmlkZSBvbiBjb25maWcgdmFsdWVzICYgbWV0aG9kc1xuXHRcdCQkLmNvbmZpZy5kYXRhX3hTb3J0ID0gZmFsc2U7XG5cdFx0JCQuaXNNdWx0aXBsZVggPSAoKSA9PiB0cnVlO1xuXHRcdCQkLnNob3dHcmlkRm9jdXMgPSAoKSA9PiB7fTtcblx0XHQkJC5sYWJlbGlzaERhdGEgPSBkID0+IGQudmFsdWVzO1xuXHRcdCQkLm9wYWNpdHlGb3JDaXJjbGUgPSAoKSA9PiAxO1xuXG5cdFx0Y29uc3QgZ2V0Q3VycmVudFBhZGRpbmdSaWdodCA9ICQkLmdldEN1cnJlbnRQYWRkaW5nUmlnaHQuYmluZCgkJCk7XG5cblx0XHQkJC5nZXRDdXJyZW50UGFkZGluZ1JpZ2h0ID0gKCkgPT4gKFxuXHRcdFx0Z2V0Q3VycmVudFBhZGRpbmdSaWdodCgpICsgKFxuXHRcdFx0XHR0aGlzLmNvbG9yU2NhbGUgPyB0aGlzLmNvbG9yU2NhbGUuZ2V0Q29sb3JTY2FsZVBhZGRpbmcoKSA6IDBcblx0XHRcdClcblx0XHQpO1xuXHR9XG5cblx0JGluaXQoKSB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzLiQkO1xuXG5cdFx0JCQubG9hZENvbmZpZy5iaW5kKHRoaXMpKHRoaXMub3B0aW9ucyk7XG5cdFx0JCQuY29sb3IgPSB0aGlzLmdldFN0YW5mb3JkUG9pbnRDb2xvci5iaW5kKCQkKTtcblxuXHRcdHRoaXMuY29sb3JTY2FsZSA9IG5ldyBDb2xvclNjYWxlKHRoaXMpO1xuXHRcdHRoaXMuZWxlbWVudHMgPSBuZXcgRWxlbWVudHModGhpcyk7XG5cblx0XHR0aGlzLmNvbnZlcnREYXRhKCk7XG5cdFx0dGhpcy5pbml0U3RhbmZvcmREYXRhKCk7XG5cdFx0dGhpcy5zZXRTdGFuZm9yZFRvb2x0aXAoKTtcblx0XHR0aGlzLmNvbG9yU2NhbGUuZHJhd0NvbG9yU2NhbGUoKTtcblxuXHRcdHRoaXMuJHJlZHJhdygpO1xuXHR9XG5cblx0JHJlZHJhdyhkdXJhdGlvbikge1xuXHRcdHRoaXMuY29sb3JTY2FsZSAmJiB0aGlzLmNvbG9yU2NhbGUuZHJhd0NvbG9yU2NhbGUoKTtcblx0XHR0aGlzLmVsZW1lbnRzICYmIHRoaXMuZWxlbWVudHMudXBkYXRlU3RhbmZvcmRFbGVtZW50cyhkdXJhdGlvbik7XG5cdH1cblxuXHRnZXRPcHRpb25zKCkge1xuXHRcdHJldHVybiBuZXcgT3B0aW9ucygpO1xuXHR9XG5cblx0Y29udmVydERhdGEoKSB7XG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMuJCQuZGF0YS50YXJnZXRzO1xuXHRcdGNvbnN0IGVwb2NocyA9IHRoaXMub3B0aW9ucy5lcG9jaHM7XG5cblx0XHRkYXRhLmZvckVhY2goZCA9PiB7XG5cdFx0XHRkLnZhbHVlcy5mb3JFYWNoKCh2LCBpKSA9PiB7XG5cdFx0XHRcdHYuZXBvY2hzID0gZXBvY2hzW2ldO1xuXHRcdFx0fSk7XG5cblx0XHRcdGQubWluRXBvY2hzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5tYXhFcG9jaHMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLmNvbG9ycyA9IHVuZGVmaW5lZDtcblx0XHRcdGQuY29sb3JzY2FsZSA9IHVuZGVmaW5lZDtcblx0XHR9KTtcblx0fVxuXG5cdHh2Q3VzdG9tKGQsIHh5VmFsdWUpIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cblx0XHRsZXQgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdGlmICgkJC5pc1RpbWVTZXJpZXMoKSkge1xuXHRcdFx0dmFsdWUgPSAkJC5wYXJzZURhdGUodmFsdWUpO1xuXHRcdH0gZWxzZSBpZiAoJCQuaXNDYXRlZ29yaXplZCgpICYmIGlzU3RyaW5nKHZhbHVlKSkge1xuXHRcdFx0dmFsdWUgPSAkJC5jb25maWcuYXhpc194X2NhdGVnb3JpZXMuaW5kZXhPZihkLnZhbHVlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKCQkLngodmFsdWUpKTtcblx0fVxuXG5cdHl2Q3VzdG9tKGQsIHh5VmFsdWUpIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3QgeVNjYWxlID0gZC5heGlzICYmIGQuYXhpcyA9PT0gXCJ5MlwiID8gJCQueTIgOiAkJC55O1xuXHRcdGNvbnN0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRyZXR1cm4gTWF0aC5jZWlsKHlTY2FsZSh2YWx1ZSkpO1xuXHR9XG5cblx0aW5pdFN0YW5mb3JkRGF0YSgpIHtcblx0XHRjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZztcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLiQkLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdC8vIFRPRE8gU1RBTkZPUkQgc2VlIGlmIChkYXRhLmpzIC0+IG9yZGVyVGFyZ2V0cykrIGNhbiBiZSB1c2VkIGluc3RlYWRcblx0XHQvLyBNYWtlIGxhcmdlciB2YWx1ZXMgYXBwZWFyIG9uIHRvcFxuXHRcdHRhcmdldC52YWx1ZXMuc29ydChjb21wYXJlRXBvY2hzKTtcblxuXHRcdC8vIEdldCBhcnJheSBvZiBlcG9jaHNcblx0XHRjb25zdCBlcG9jaHMgPSB0YXJnZXQudmFsdWVzLm1hcChhID0+IGEuZXBvY2hzKTtcblxuXHRcdHRhcmdldC5taW5FcG9jaHMgPSAhaXNOYU4oY29uZmlnLnNjYWxlX21pbikgPyBjb25maWcuc2NhbGVfbWluIDogTWF0aC5taW4oLi4uZXBvY2hzKTtcblx0XHR0YXJnZXQubWF4RXBvY2hzID0gIWlzTmFOKGNvbmZpZy5zY2FsZV9tYXgpID8gY29uZmlnLnNjYWxlX21heCA6IE1hdGgubWF4KC4uLmVwb2Nocyk7XG5cblx0XHR0YXJnZXQuY29sb3JzID0gaXNGdW5jdGlvbihjb25maWcuY29sb3JzKSA/XG5cdFx0XHRjb25maWcuY29sb3JzIDogZDNJbnRlcnBvbGF0ZUhzbExvbmcoZDNIc2woMjUwLCAxLCAwLjUpLCBkM0hzbCgwLCAxLCAwLjUpKTtcblxuXHRcdHRhcmdldC5jb2xvcnNjYWxlID0gZDNTY2FsZVNlcXVlbnRpYWxMb2codGFyZ2V0LmNvbG9ycylcblx0XHRcdC5kb21haW4oW3RhcmdldC5taW5FcG9jaHMsIHRhcmdldC5tYXhFcG9jaHNdKTtcblx0fVxuXG5cdGdldFN0YW5mb3JkUG9pbnRDb2xvcihkKSB7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy5kYXRhLnRhcmdldHNbMF07XG5cblx0XHRyZXR1cm4gdGFyZ2V0LmNvbG9yc2NhbGUoZC5lcG9jaHMpO1xuXHR9XG5cblx0c2V0U3RhbmZvcmRUb29sdGlwKCkge1xuXHRcdGNvbnN0IGNvbmZpZyA9IHRoaXMuJCQuY29uZmlnO1xuXG5cdFx0aWYgKGlzRW1wdHkoY29uZmlnLnRvb2x0aXBfY29udGVudHMpKSB7XG5cdFx0XHRjb25maWcudG9vbHRpcF9jb250ZW50cyA9IGZ1bmN0aW9uKGQsIGRlZmF1bHRUaXRsZUZvcm1hdCwgZGVmYXVsdFZhbHVlRm9ybWF0LCBjb2xvcikge1xuXHRcdFx0XHRsZXQgaHRtbCA9IGA8dGFibGUgY2xhc3M9XCIke0NMQVNTLnRvb2x0aXB9XCI+PHRib2R5PmA7XG5cblx0XHRcdFx0ZC5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0XHRcdGh0bWwgKz0gYDx0cj5cblx0XHRcdFx0XHRcdFx0PHRoPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KHRoaXMuY29uZmlnLmRhdGFfeCl9PC90aD5cblx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LngpfTwvdGg+XG5cdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdFx0XHQ8dGg+JHtkZWZhdWx0VGl0bGVGb3JtYXQodi5pZCl9PC90aD5cblx0XHRcdFx0XHRcdFx0PHRoIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LnZhbHVlKX08L3RoPlxuXHRcdFx0XHRcdFx0PC90cj5cblx0XHRcdFx0XHRcdDx0ciBjbGFzcz1cIiR7Q0xBU1MudG9vbHRpcE5hbWV9LSR7di5pZH1cIj5cblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwibmFtZVwiPjxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjoke2NvbG9yKHYpfVwiPjwvc3Bhbj4ke2RlZmF1bHRUaXRsZUZvcm1hdChcIkVwb2Noc1wiKX08L3RkPlxuXHRcdFx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJ2YWx1ZVwiPiR7ZGVmYXVsdFZhbHVlRm9ybWF0KHYuZXBvY2hzKX08L3RkPlxuXHRcdFx0XHRcdFx0PC90cj5gO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gYCR7aHRtbH08L3Rib2R5PjwvdGFibGU+YDtcblx0XHRcdH07XG5cdFx0fVxuXHR9XG5cblx0Y291bnRFcG9jaHNJblJlZ2lvbihyZWdpb24pIHtcblx0XHRjb25zdCAkJCA9IHRoaXM7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gJCQuZGF0YS50YXJnZXRzWzBdO1xuXG5cdFx0Y29uc3QgdG90YWwgPSB0YXJnZXQudmFsdWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT5cblx0XHRcdGFjY3VtdWxhdG9yICsgTnVtYmVyKGN1cnJlbnRWYWx1ZS5lcG9jaHMpLCAwKTtcblxuXHRcdGNvbnN0IHZhbHVlID0gdGFyZ2V0LnZhbHVlcy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpID0+IHtcblx0XHRcdGlmIChwb2ludEluUmVnaW9uKGN1cnJlbnRWYWx1ZSwgcmVnaW9uKSkge1xuXHRcdFx0XHRyZXR1cm4gYWNjdW11bGF0b3IgKyBOdW1iZXIoY3VycmVudFZhbHVlLmVwb2Nocyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhY2N1bXVsYXRvcjtcblx0XHR9LCAwKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZSxcblx0XHRcdHBlcmNlbnRhZ2U6IHZhbHVlICE9PSAwID8gKyh2YWx1ZSAvIHRvdGFsICogMTAwKS50b0ZpeGVkKDEpIDogMFxuXHRcdH07XG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufSIsImltcG9ydCBzZXRQcm90b3R5cGVPZiBmcm9tIFwiLi9zZXRQcm90b3R5cGVPZlwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=