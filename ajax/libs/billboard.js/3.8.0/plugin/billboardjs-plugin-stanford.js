/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 3.8.0
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-selection"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-interpolate", "d3-color", "d3-scale", "d3-selection", "d3-brush", "d3-axis", "d3-format"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-selection"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["stanford"] = factory(root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__9__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
/* 9 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Stanford; }
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/newArrowCheck.js
function _newArrowCheck(innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(5);
// EXTERNAL MODULE: external {"commonjs":"d3-color","commonjs2":"d3-color","amd":"d3-color","root":"d3"}
var external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_ = __webpack_require__(6);
// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(7);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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
;// CONCATENATED MODULE: ./src/config/classes.ts

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1, source; i < arguments.length; i++) { source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * CSS class names definition
 * @private
 */
var $COMMON = {
  button: "bb-button",
  chart: "bb-chart",
  empty: "bb-empty",
  main: "bb-main",
  target: "bb-target",
  EXPANDED: "_expanded_"
};
var $ARC = {
  arc: "bb-arc",
  arcLabelLine: "bb-arc-label-line",
  arcs: "bb-arcs",
  chartArc: "bb-chart-arc",
  chartArcs: "bb-chart-arcs",
  chartArcsBackground: "bb-chart-arcs-background",
  chartArcsTitle: "bb-chart-arcs-title"
};
var $AREA = {
  area: "bb-area",
  areas: "bb-areas"
};
var $AXIS = {
  axis: "bb-axis",
  axisX: "bb-axis-x",
  axisXLabel: "bb-axis-x-label",
  axisY: "bb-axis-y",
  axisY2: "bb-axis-y2",
  axisY2Label: "bb-axis-y2-label",
  axisYLabel: "bb-axis-y-label"
};
var $BAR = {
  bar: "bb-bar",
  bars: "bb-bars",
  chartBar: "bb-chart-bar",
  chartBars: "bb-chart-bars"
};
var $CANDLESTICK = {
  candlestick: "bb-candlestick",
  candlesticks: "bb-candlesticks",
  chartCandlestick: "bb-chart-candlestick",
  chartCandlesticks: "bb-chart-candlesticks",
  valueDown: "bb-value-down",
  valueUp: "bb-value-up"
};
var $CIRCLE = {
  chartCircles: "bb-chart-circles",
  circle: "bb-circle",
  circles: "bb-circles"
};
var $COLOR = {
  colorPattern: "bb-color-pattern",
  colorScale: "bb-colorscale"
};
var $DRAG = {
  dragarea: "bb-dragarea",
  INCLUDED: "_included_"
};
var $GAUGE = {
  chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
  chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
  chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
  chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
  gaugeValue: "bb-gauge-value"
};
var $LEGEND = {
  legend: "bb-legend",
  legendBackground: "bb-legend-background",
  legendItem: "bb-legend-item",
  legendItemEvent: "bb-legend-item-event",
  legendItemHidden: "bb-legend-item-hidden",
  legendItemPoint: "bb-legend-item-point",
  legendItemTile: "bb-legend-item-tile"
};
var $LINE = {
  chartLine: "bb-chart-line",
  chartLines: "bb-chart-lines",
  line: "bb-line",
  lines: "bb-lines"
};
var $EVENT = {
  eventRect: "bb-event-rect",
  eventRects: "bb-event-rects",
  eventRectsMultiple: "bb-event-rects-multiple",
  eventRectsSingle: "bb-event-rects-single"
};
var $FOCUS = {
  focused: "bb-focused",
  defocused: "bb-defocused",
  legendItemFocused: "bb-legend-item-focused",
  xgridFocus: "bb-xgrid-focus",
  ygridFocus: "bb-ygrid-focus"
};
var $GRID = {
  grid: "bb-grid",
  gridLines: "bb-grid-lines",
  xgrid: "bb-xgrid",
  xgridLine: "bb-xgrid-line",
  xgridLines: "bb-xgrid-lines",
  xgrids: "bb-xgrids",
  ygrid: "bb-ygrid",
  ygridLine: "bb-ygrid-line",
  ygridLines: "bb-ygrid-lines",
  ygrids: "bb-ygrids"
};
var $LEVEL = {
  level: "bb-level",
  levels: "bb-levels"
};
var $RADAR = {
  chartRadar: "bb-chart-radar",
  chartRadars: "bb-chart-radars"
};
var $REGION = {
  region: "bb-region",
  regions: "bb-regions"
};
var $SELECT = {
  selectedCircle: "bb-selected-circle",
  selectedCircles: "bb-selected-circles",
  SELECTED: "_selected_"
};
var $SHAPE = {
  shape: "bb-shape",
  shapes: "bb-shapes"
};
var $SUBCHART = {
  brush: "bb-brush",
  subchart: "bb-subchart"
};
var $TEXT = {
  chartText: "bb-chart-text",
  chartTexts: "bb-chart-texts",
  text: "bb-text",
  texts: "bb-texts",
  title: "bb-title",
  TextOverlapping: "text-overlapping"
};
var $TOOLTIP = {
  tooltip: "bb-tooltip",
  tooltipContainer: "bb-tooltip-container",
  tooltipName: "bb-tooltip-name"
};
var $TREEMAP = {
  treemap: "bb-treemap",
  chartTreemap: "bb-chart-treemap",
  chartTreemaps: "bb-chart-treemaps"
};
var $ZOOM = {
  buttonZoomReset: "bb-zoom-reset",
  zoomBrush: "bb-zoom-brush"
};
/* harmony default export */ var classes = (_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, $COMMON), $ARC), $AREA), $AXIS), $BAR), $CANDLESTICK), $CIRCLE), $COLOR), $DRAG), $GAUGE), $LEGEND), $LINE), $EVENT), $FOCUS), $GRID), $RADAR), $REGION), $SELECT), $SHAPE), $SUBCHART), $TEXT), $TOOLTIP), $TREEMAP), $ZOOM));
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(3);
;// CONCATENATED MODULE: ./src/module/browser.ts

var _this = undefined;
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Window object
 * @private
 */
/* eslint-disable no-new-func, no-undef */

var win = function () {
    _newArrowCheck(this, _this);
    var root = typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object && globalThis || typeof global === "object" && global !== null && global.Object === Object && global || typeof self === "object" && self !== null && self.Object === Object && self;
    return root || Function("return this")();
  }.bind(undefined)(),
  hasRAF = typeof win.requestAnimationFrame === "function",
  hasRIC = typeof win.requestIdleCallback === "function",
  requestAnimationFrame = hasRAF ? win.requestAnimationFrame : function (cb) {
    _newArrowCheck(this, _this);
    return setTimeout(cb, 1);
  }.bind(undefined),
  cancelAnimationFrame = hasRAF ? win.cancelAnimationFrame : function (id) {
    _newArrowCheck(this, _this);
    return clearTimeout(id);
  }.bind(undefined),
  requestIdleCallback = hasRIC ? win.requestIdleCallback : requestAnimationFrame,
  cancelIdleCallback = hasRIC ? win.cancelIdleCallback : cancelAnimationFrame,
  doc = win == null ? void 0 : win.document;
/* eslint-enable no-new-func, no-undef */
// fallback for non-supported environments
;// CONCATENATED MODULE: ./src/module/util.ts


var util_this = undefined;
function util_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function util_objectSpread(target) { for (var i = 1, source; i < arguments.length; i++) { source = null != arguments[i] ? arguments[i] : {}; i % 2 ? util_ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : util_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */




var isValue = function (v) {
    _newArrowCheck(this, util_this);
    return v || v === 0;
  }.bind(undefined),
  isFunction = function (v) {
    _newArrowCheck(this, util_this);
    return typeof v === "function";
  }.bind(undefined),
  isString = function (v) {
    _newArrowCheck(this, util_this);
    return typeof v === "string";
  }.bind(undefined),
  isNumber = function (v) {
    _newArrowCheck(this, util_this);
    return typeof v === "number";
  }.bind(undefined),
  isUndefined = function (v) {
    _newArrowCheck(this, util_this);
    return typeof v === "undefined";
  }.bind(undefined),
  isDefined = function (v) {
    _newArrowCheck(this, util_this);
    return typeof v !== "undefined";
  }.bind(undefined),
  isboolean = function (v) {
    _newArrowCheck(this, util_this);
    return typeof v === "boolean";
  }.bind(undefined),
  ceil10 = function (v) {
    _newArrowCheck(this, util_this);
    return Math.ceil(v / 10) * 10;
  }.bind(undefined),
  asHalfPixel = function (n) {
    _newArrowCheck(this, util_this);
    return Math.ceil(n) + .5;
  }.bind(undefined),
  diffDomain = function (d) {
    _newArrowCheck(this, util_this);
    return d[1] - d[0];
  }.bind(undefined),
  isObjectType = function (v) {
    _newArrowCheck(this, util_this);
    return typeof v === "object";
  }.bind(undefined),
  isEmpty = function (o) {
    _newArrowCheck(this, util_this);
    return isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
  }.bind(undefined),
  notEmpty = function (o) {
    _newArrowCheck(this, util_this);
    return !isEmpty(o);
  }.bind(undefined),
  isArray = function (arr) {
    _newArrowCheck(this, util_this);
    return Array.isArray(arr);
  }.bind(undefined),
  isObject = function (obj) {
    _newArrowCheck(this, util_this);
    return obj && !(obj != null && obj.nodeType) && isObjectType(obj) && !isArray(obj);
  }.bind(undefined);
/**
 * Check if is array
 * @param {Array} arr Data to be checked
 * @returns {boolean}
 * @private
 */
/**
 * Check if is object
 * @param {object} obj Data to be checked
 * @returns {boolean}
 * @private
 */
/**
 * Get specified key value from object
 * If default value is given, will return if given key value not found
 * @param {object} options Source object
 * @param {string} key Key value
 * @param {*} defaultValue Default value
 * @returns {*}
 * @private
 */
function getOption(options, key, defaultValue) {
  return isDefined(options[key]) ? options[key] : defaultValue;
}

/**
 * Check if value exist in the given object
 * @param {object} dict Target object to be checked
 * @param {*} value Value to be checked
 * @returns {boolean}
 * @private
 */
function hasValue(dict, value) {
  var _this2 = this,
    found = !1;
  Object.keys(dict).forEach(function (key) {
    _newArrowCheck(this, _this2);
    return dict[key] === value && (found = !0);
  }.bind(this));
  return found;
}

/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} thisArg "this" value for fn
 * @param {*} args Arguments for fn
 * @returns {boolean} true: fn is function, false: fn is not function
 * @private
 */
function callFn(fn, thisArg) {
  var isFn = isFunction(fn);
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  isFn && fn.call.apply(fn, [thisArg].concat(args));
  return isFn;
}

/**
 * Call function after all transitions ends
 * @param {d3.transition} transition Transition
 * @param {Fucntion} cb Callback function
 * @private
 */
function endall(transition, cb) {
  var _this3 = this,
    n = 0,
    end = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      --n || cb.apply.apply(cb, [this].concat(args));
    };
  // if is transition selection
  if ("duration" in transition) {
    transition.each(function () {
      _newArrowCheck(this, _this3);
      return ++n;
    }.bind(this)).on("end", end);
  } else {
    ++n;
    transition.call(end);
  }
}

/**
 * Replace tag sign to html entity
 * @param {string} str Target string value
 * @returns {string}
 * @private
 */
function sanitise(str) {
  return isString(str) ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
}

/**
 * Set text value. If there's multiline add nodes.
 * @param {d3Selection} node Text node
 * @param {string} text Text value string
 * @param {Array} dy dy value for multilined text
 * @param {boolean} toMiddle To be alingned vertically middle
 * @private
 */
function setTextValue(node, text, dy, toMiddle) {
  var _this4 = this;
  if (dy === void 0) {
    dy = [-1, 1];
  }
  if (toMiddle === void 0) {
    toMiddle = !1;
  }
  if (!node || !isString(text)) {
    return;
  }
  if (text.indexOf("\n") === -1) {
    node.text(text);
  } else {
    var diff = [node.text(), text].map(function (v) {
      _newArrowCheck(this, _this4);
      return v.replace(/[\s\n]/g, "");
    }.bind(this));
    if (diff[0] !== diff[1]) {
      var multiline = text.split("\n"),
        len = toMiddle ? multiline.length - 1 : 1;
      // reset possible text
      node.html("");
      multiline.forEach(function (v, i) {
        _newArrowCheck(this, _this4);
        node.append("tspan").attr("x", 0).attr("dy", (i === 0 ? dy[0] * len : dy[1]) + "em").text(v);
      }.bind(this));
    }
  }
}

/**
 * Substitution of SVGPathSeg API polyfill
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {Array}
 * @private
 */
function getRectSegList(path) {
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
  },
  // seg0
  {
    x: x,
    y: y
  },
  // seg1
  {
    x: x + width,
    y: y
  },
  // seg2
  {
    x: x + width,
    y: y + height
  } // seg3
  ];
}

/**
 * Get svg bounding path box dimension
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {object}
 * @private
 */
function getPathBox(path) {
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
}

/**
 * Get event's current position coordinates
 * @param {object} event Event object
 * @param {SVGElement|HTMLElement} element Target element
 * @returns {Array} [x, y] Coordinates x, y array
 * @private
 */
function getPointer(event, element) {
  var _ref,
    touches = event && ((_ref = event.touches || event.sourceEvent && event.sourceEvent.touches) == null ? void 0 : _ref[0]),
    pointer = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.pointer)(touches || event, element),
    _this5 = this;
  return pointer.map(function (v) {
    _newArrowCheck(this, _this5);
    return isNaN(v) ? 0 : v;
  }.bind(this));
}

/**
 * Return brush selection array
 * @param {object} ctx Current instance
 * @returns {d3.brushSelection}
 * @private
 */
function getBrushSelection(ctx) {
  var event = ctx.event,
    $el = ctx.$el,
    main = $el.subchart.main || $el.main;
  var selection;

  // check from event
  if (event && event.type === "brush") {
    selection = event.selection;
    // check from brush area selection
  } else if (main && (selection = main.select(".bb-brush").node())) {
    selection = (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushSelection)(selection);
  }
  return selection;
}

/**
 * Get boundingClientRect.
 * Cache the evaluated value once it was called.
 * @param {HTMLElement} node Target element
 * @returns {object}
 * @private
 */
function getBoundingRect(node) {
  var needEvaluate = !("rect" in node) || "rect" in node && node.hasAttribute("width") && node.rect.width !== +node.getAttribute("width");
  return needEvaluate ? node.rect = node.getBoundingClientRect() : node.rect;
}

/**
 * Retrun random number
 * @param {boolean} asStr Convert returned value as string
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @returns {number|string}
 * @private
 */
function getRandom(asStr, min, max) {
  if (asStr === void 0) {
    asStr = !0;
  }
  if (min === void 0) {
    min = 0;
  }
  if (max === void 0) {
    max = 1e4;
  }
  var crpt = win.crypto || win.msCrypto,
    rand = crpt ? min + crpt.getRandomValues(new Uint32Array(1))[0] % (max - min + 1) : Math.floor(Math.random() * (max - min) + min);
  return asStr ? rand + "" : rand;
}

/**
 * Find index based on binary search
 * @param {Array} arr Data array
 * @param {number} v Target number to find
 * @param {number} start Start index of data array
 * @param {number} end End index of data arr
 * @param {boolean} isRotated Weather is roted axis
 * @returns {number} Index number
 * @private
 */
function findIndex(arr, v, start, end, isRotated) {
  if (start > end) {
    return -1;
  }
  var mid = Math.floor((start + end) / 2);
  var _arr$mid = arr[mid],
    x = _arr$mid.x,
    _arr$mid$w = _arr$mid.w,
    w = _arr$mid$w === void 0 ? 0 : _arr$mid$w;
  if (isRotated) {
    x = arr[mid].y;
    w = arr[mid].h;
  }
  if (v >= x && v <= x + w) {
    return mid;
  }
  return v < x ? findIndex(arr, v, start, mid - 1, isRotated) : findIndex(arr, v, mid + 1, end, isRotated);
}

/**
 * Check if brush is empty
 * @param {object} ctx Bursh context
 * @returns {boolean}
 * @private
 */
function brushEmpty(ctx) {
  var selection = getBrushSelection(ctx);
  if (selection) {
    // brush selected area
    // two-dimensional: [[x0, y0], [x1, y1]]
    // one-dimensional: [x0, x1] or [y0, y1]
    return selection[0] === selection[1];
  }
  return !0;
}

/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */
function deepClone() {
  for (var _this6 = this, _clone = function clone(v) {
      _newArrowCheck(this, _this6);
      if (isObject(v) && v.constructor) {
        var r = new v.constructor();
        for (var k in v) {
          r[k] = _clone(v[k]);
        }
        return r;
      }
      return v;
    }.bind(this), _len3 = arguments.length, objectN = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    objectN[_key3] = arguments[_key3];
  }
  return objectN.map(function (v) {
    _newArrowCheck(this, _this6);
    return _clone(v);
  }.bind(this)).reduce(function (a, c) {
    _newArrowCheck(this, _this6);
    return util_objectSpread(util_objectSpread({}, a), c);
  }.bind(this));
}

/**
 * Extend target from source object
 * @param {object} target Target object
 * @param {object|Array} source Source object
 * @returns {object}
 * @private
 */
function extend(target, source) {
  var _this7 = this;
  if (target === void 0) {
    target = {};
  }
  if (isArray(source)) {
    source.forEach(function (v) {
      _newArrowCheck(this, _this7);
      return extend(target, v);
    }.bind(this));
  }

  // exclude name with only numbers
  for (var p in source) {
    if (/^\d+$/.test(p) || p in target) {
      continue;
    }
    target[p] = source[p];
  }
  return target;
}

/**
 * Return first letter capitalized
 * @param {string} str Target string
 * @returns {string} capitalized string
 * @private
 */
var capitalize = function (str) {
  _newArrowCheck(this, util_this);
  return str.charAt(0).toUpperCase() + str.slice(1);
}.bind(undefined);

/**
 * Camelize from kebob style string
 * @param {string} str Target string
 * @param {string} separator Separator string
 * @returns {string} camelized string
 * @private
 */
function camelize(str, separator) {
  var _this8 = this;
  if (separator === void 0) {
    separator = "-";
  }
  return str.split(separator).map(function (v, i) {
    _newArrowCheck(this, _this8);
    return i ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v.toLowerCase();
  }.bind(this)).join("");
}

/**
 * Convert to array
 * @param {object} v Target to be converted
 * @returns {Array}
 * @private
 */
var toArray = function (v) {
  _newArrowCheck(this, util_this);
  return [].slice.call(v);
}.bind(undefined);

/**
 * Add CSS rules
 * @param {object} style Style object
 * @param {string} selector Selector string
 * @param {Array} prop Prps arrary
 * @returns {number} Newely added rule index
 * @private
 */
function addCssRules(style, selector, prop) {
  var _this9 = this,
    rootSelctor = style.rootSelctor,
    sheet = style.sheet,
    getSelector = function (s) {
      _newArrowCheck(this, _this9);
      return s.replace(/\s?(bb-)/g, ".$1").replace(/\.+/g, ".");
    }.bind(this),
    rule = rootSelctor + " " + getSelector(selector) + " {" + prop.join(";") + "}";
  return sheet[sheet.insertRule ? "insertRule" : "addRule"](rule, sheet.cssRules.length);
}

/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
function getCssRules(styleSheets) {
  var _this10 = this,
    rules = [];
  styleSheets.forEach(function (sheet) {
    _newArrowCheck(this, _this10);
    try {
      if (sheet.cssRules && sheet.cssRules.length) {
        rules = rules.concat(toArray(sheet.cssRules));
      }
    } catch (e) {
      var _window$console;
      (_window$console = win.console) == null ? void 0 : _window$console.warn("Error while reading rules from " + sheet.href + ": " + e.toString());
    }
  }.bind(this));
  return rules;
}

/**
 * Gets the SVGMatrix of an SVGGElement
 * @param {SVGElement} node Node element
 * @returns {SVGMatrix} matrix
 * @private
 */
function getTranslation(node) {
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
}

/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */
function getUnique(data) {
  var _this11 = this,
    isDate = data[0] instanceof Date,
    d = (isDate ? data.map(Number) : data).filter(function (v, i, self) {
      _newArrowCheck(this, _this11);
      return self.indexOf(v) === i;
    }.bind(this));
  return isDate ? d.map(function (v) {
    _newArrowCheck(this, _this11);
    return new Date(v);
  }.bind(this)) : d;
}

/**
 * Merge array
 * @param {Array} arr Source array
 * @returns {Array}
 * @private
 */
function mergeArray(arr) {
  var _this12 = this;
  return arr && arr.length ? arr.reduce(function (p, c) {
    _newArrowCheck(this, _this12);
    return p.concat(c);
  }.bind(this)) : [];
}

/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */
function mergeObj(target) {
  for (var _this13 = this, _len4 = arguments.length, objectN = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    objectN[_key4 - 1] = arguments[_key4];
  }
  if (!objectN.length || objectN.length === 1 && !objectN[0]) {
    return target;
  }
  var source = objectN.shift();
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(function (key) {
      _newArrowCheck(this, _this13);
      var value = source[key];
      if (isObject(value)) {
        target[key] || (target[key] = {});
        target[key] = mergeObj(target[key], value);
      } else {
        target[key] = isArray(value) ? value.concat() : value;
      }
    }.bind(this));
  }
  return mergeObj.apply(void 0, [target].concat(objectN));
}

/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {boolean} isAsc true: asc, false: desc
 * @returns {number|string|Date} sorted date
 * @private
 */
function sortValue(data, isAsc) {
  var _this14 = this;
  if (isAsc === void 0) {
    isAsc = !0;
  }
  var fn;
  if (data[0] instanceof Date) {
    fn = isAsc ? function (a, b) {
      _newArrowCheck(this, _this14);
      return a - b;
    }.bind(this) : function (a, b) {
      _newArrowCheck(this, _this14);
      return b - a;
    }.bind(this);
  } else {
    if (isAsc && !data.every(isNaN)) {
      fn = function (a, b) {
        _newArrowCheck(this, _this14);
        return a - b;
      }.bind(this);
    } else if (!isAsc) {
      fn = function (a, b) {
        _newArrowCheck(this, _this14);
        return a > b && -1 || a < b && 1 || a === b && 0;
      }.bind(this);
    }
  }
  return data.concat().sort(fn);
}

/**
 * Get min/max value
 * @param {string} type 'min' or 'max'
 * @param {Array} data Array data value
 * @returns {number|Date|undefined}
 * @private
 */
function getMinMax(type, data) {
  var _this15 = this,
    res = data.filter(function (v) {
      _newArrowCheck(this, _this15);
      return notEmpty(v);
    }.bind(this));
  if (res.length) {
    if (isNumber(res[0])) {
      res = Math[type].apply(Math, res);
    } else if (res[0] instanceof Date) {
      res = sortValue(res, type === "min")[0];
    }
  } else {
    res = undefined;
  }
  return res;
}

/**
 * Get range
 * @param {number} start Start number
 * @param {number} end End number
 * @param {number} step Step number
 * @returns {Array}
 * @private
 */
var getRange = function (start, end, step) {
    if (step === void 0) {
      step = 1;
    }
    _newArrowCheck(this, util_this);
    var res = [],
      n = Math.max(0, Math.ceil((end - start) / step)) | 0;
    for (var i = start; i < n; i++) {
      res.push(start + i * step);
    }
    return res;
  }.bind(undefined),
  emulateEvent = {
    mouse: function () {
      var _this16 = this;
      _newArrowCheck(this, util_this);
      var getParams = function () {
        _newArrowCheck(this, _this16);
        return {
          bubbles: !1,
          cancelable: !1,
          screenX: 0,
          screenY: 0,
          clientX: 0,
          clientY: 0
        };
      }.bind(this);
      try {
        // eslint-disable-next-line no-new
        new MouseEvent("t");
        return function (el, eventType, params) {
          if (params === void 0) {
            params = getParams();
          }
          _newArrowCheck(this, _this16);
          el.dispatchEvent(new MouseEvent(eventType, params));
        }.bind(this);
      } catch (e) {
        // Polyfills DOM4 MouseEvent
        return function (el, eventType, params) {
          if (params === void 0) {
            params = getParams();
          }
          _newArrowCheck(this, _this16);
          var mouseEvent = doc.createEvent("MouseEvent");

          // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
          mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0,
          // the event's mouse click count
          params.screenX, params.screenY, params.clientX, params.clientY, !1, !1, !1, !1, 0, null);
          el.dispatchEvent(mouseEvent);
        }.bind(this);
      }
    }.bind(undefined)(),
    touch: function touch(el, eventType, params) {
      _newArrowCheck(this, util_this);
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
    }.bind(undefined)
  }; // emulate event
/**
 * Process the template  & return bound string
 * @param {string} tpl Template string
 * @param {object} data Data value to be replaced
 * @returns {string}
 * @private
 */
function tplProcess(tpl, data) {
  var res = tpl;
  for (var x in data) {
    res = res.replace(new RegExp("{=" + x + "}", "g"), data[x]);
  }
  return res;
}

/**
 * Get parsed date value
 * (It must be called in 'ChartInternal' context)
 * @param {Date|string|number} date Value of date to be parsed
 * @returns {Date}
 * @private
 */
function parseDate(date) {
  var parsedDate;
  if (date instanceof Date) {
    parsedDate = date;
  } else if (isString(date)) {
    var _format$dataTime,
      config = this.config,
      format = this.format;
    // if fails to parse, try by new Date()
    // https://github.com/naver/billboard.js/issues/1714
    parsedDate = (_format$dataTime = format.dataTime(config.data_xFormat)(date)) != null ? _format$dataTime : new Date(date);
  } else if (isNumber(date) && !isNaN(date)) {
    parsedDate = new Date(+date);
  }
  if (!parsedDate || isNaN(+parsedDate)) {
    console && console.error && console.error("Failed to parse x '" + date + "' to Date object");
  }
  return parsedDate;
}

/**
 * Return if the current doc is visible or not
 * @returns {boolean}
 * @private
 */
function isTabVisible() {
  return (doc == null ? void 0 : doc.hidden) === !1 || (doc == null ? void 0 : doc.visibilityState) === "visible";
}

/**
 * Get the current input type
 * @param {boolean} mouse Config value: interaction.inputType.mouse
 * @param {boolean} touch Config value: interaction.inputType.touch
 * @returns {string} "mouse" | "touch" | null
 * @private
 */
function convertInputType(mouse, touch) {
  var _this17 = this,
    DocumentTouch = win.DocumentTouch,
    matchMedia = win.matchMedia,
    navigator = win.navigator,
    hasTouch = !1;
  if (touch) {
    // Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
    if (navigator && "maxTouchPoints" in navigator) {
      hasTouch = navigator.maxTouchPoints > 0;

      // Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
      // On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true
    } else if ("ontouchmove" in win || DocumentTouch && doc instanceof DocumentTouch) {
      hasTouch = !0;
    } else {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#avoiding_user_agent_detection
      if (matchMedia != null && matchMedia("(pointer:coarse)").matches) {
        hasTouch = !0;
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouch = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
  }

  // Check if agent has mouse using any-hover, touch devices (e.g iPad) with external mouse will return true as long as mouse is connected
  // https://css-tricks.com/interaction-media-features-and-their-potential-for-incorrect-assumptions/#aa-testing-the-capabilities-of-all-inputs
  // Demo: https://patrickhlauke.github.io/touch/pointer-hover-any-pointer-any-hover/
  var hasMouse = mouse && ["any-hover:hover", "any-pointer:fine"].some(function (v) {
    _newArrowCheck(this, _this17);
    return matchMedia == null ? void 0 : matchMedia("(" + v + ")").matches;
  }.bind(this));

  // fallback to 'mouse' if no input type is detected.
  return hasMouse && "mouse" || hasTouch && "touch" || "mouse";
}

/**
 * Run function until given condition function return true
 * @param {Function} fn Function to be executed when condition is true
 * @param {Function} conditionFn Condition function to check if condition is true
 * @private
 */
function runUntil(fn, conditionFn) {
  var _this18 = this;
  if (conditionFn() === !1) {
    requestAnimationFrame(function () {
      _newArrowCheck(this, _this18);
      return runUntil(fn, conditionFn);
    }.bind(this));
  } else {
    fn();
  }
}
;// CONCATENATED MODULE: ./src/config/config.ts

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Load configuration option
 * @param {object} config User's generation config value
 * @private
 */
function loadConfig(config) {
  var _this = this,
    thisConfig = this.config,
    target,
    keys,
    read,
    _find = function find() {
      _newArrowCheck(this, _this);
      var key = keys.shift();
      if (key && target && isObjectType(target) && key in target) {
        target = target[key];
        return _find();
      } else if (!key) {
        return target;
      }
      return undefined;
    }.bind(this);
  Object.keys(thisConfig).forEach(function (key) {
    _newArrowCheck(this, _this);
    target = config;
    keys = key.split("_");
    read = _find();
    if (isDefined(read)) {
      thisConfig[key] = read;
    }
  }.bind(this));

  // only should run in the ChartInternal context
  if (this.api) {
    this.state.orgConfig = config;
  }
}
;// CONCATENATED MODULE: ./src/Plugin/Plugin.ts

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */
/**
 * Version info string for plugin
 * @name version
 * @static
 * @memberof Plugin
 * @type {string}
 * @example
 *   bb.plugin.stanford.version;  // ex) 1.9.0
 */
var Plugin = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  function Plugin(options) {
    if (options === void 0) {
      options = {};
    }
    this.$$ = void 0;
    this.options = void 0;
    this.options = options;
  }

  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */
  var _proto = Plugin.prototype;
  _proto.$beforeInit = function $beforeInit() {}

  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */;
  _proto.$init = function $init() {}

  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */;
  _proto.$afterInit = function $afterInit() {}

  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */;
  _proto.$redraw = function $redraw() {}

  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */;
  _proto.$willDestroy = function $willDestroy() {
    var _this = this;
    Object.keys(this).forEach(function (key) {
      _newArrowCheck(this, _this);
      this[key] = null;
      delete this[key];
    }.bind(this));
  };
  return Plugin;
}();
Plugin.version = "3.8.0";

;// CONCATENATED MODULE: ./src/Plugin/stanford/Options.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Stanford diagram plugin option class
 * @class StanfordOptions
 * @param {Options} options Stanford plugin options
 * @augments Plugin
 * @returns {StanfordOptions}
 * @private
 */
var Options = function () {
  return {
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
     * @type {object}
     * @property {object} [scale] scale object
     * @property {number} [scale.min=undefined] Minimum value of the color scale. Default: lowest value in epochs
     * @property {number} [scale.max=undefined] Maximum value of the color scale. Default: highest value in epochs
     * @property {number} [scale.width=20] Width of the color scale
     * @property {string|Function} [scale.format=undefined] Format of the axis of the color scale. Use 'pow10' to format as powers of 10 or a custom function. Example: d3.format("d")
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
     * @type {object}
     * @property {object} [padding] padding object
     * @property {number} [padding.top=0] Top padding value.
     * @property {number} [padding.right=0] Right padding value.
     * @property {number} [padding.bottom=0] Bottom padding value.
     * @property {number} [padding.left=0] Left padding value.
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

;// CONCATENATED MODULE: ./src/Plugin/stanford/classes.ts
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
;// CONCATENATED MODULE: ./src/Plugin/stanford/util.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */


/**
 * Check if point is in region
 * @param {object} point Point
 * @param {Array} region Region
 * @returns {boolean}
 * @private
 */
function pointInRegion(point, region) {
  // thanks to: http://bl.ocks.org/bycoffe/5575904
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  var x = point.x,
    y = point.value;
  var inside = !1;
  for (var i = 0, j = region.length - 1; i < region.length; j = i++) {
    var xi = region[i].x,
      yi = region[i].y,
      xj = region[j].x,
      yj = region[j].y,
      intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      inside = !inside;
    }
  }
  return inside;
}

/**
 * Compare epochs
 * @param {object} a Target
 * @param {object} b Source
 * @returns {number}
 * @private
 */
function compareEpochs(a, b) {
  if (a.epochs < b.epochs) {
    return -1;
  }
  if (a.epochs > b.epochs) {
    return 1;
  }
  return 0;
}

/**
 * Get region area
 * @param {Array} points Points
 * @returns {number}
 * @private
 */
function getRegionArea(points) {
  // thanks to: https://stackoverflow.com/questions/16282330/find-centerpoint-of-polygon-in-javascript
  var area = 0,
    point1,
    point2;
  for (var i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
    point1 = points[i];
    point2 = points[j];
    area += point1.x * point2.y;
    area -= point1.y * point2.x;
  }
  area /= 2;
  return area;
}

/**
 * Get centroid
 * @param {Array} points Points
 * @returns {object}
 * @private
 */
function getCentroid(points) {
  var area = getRegionArea(points);
  var x = 0,
    y = 0,
    f;
  for (var i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
    var point1 = points[i],
      point2 = points[j];
    f = point1.x * point2.y - point2.x * point1.y;
    x += (point1.x + point2.x) * f;
    y += (point1.y + point2.y) * f;
  }
  f = area * 6;
  return {
    x: x / f,
    y: y / f
  };
}

;// CONCATENATED MODULE: ./src/Plugin/stanford/Elements.ts

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// @ts-nocheck



/**
 * Stanford diagram plugin element class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */
var Elements = /*#__PURE__*/function () {
  function Elements(owner) {
    this.owner = void 0;
    this.owner = owner;

    // MEMO: Avoid blocking eventRect
    var elements = owner.$$.$el.main.select(".bb-chart").append("g").attr("class", stanford_classes.stanfordElements);
    elements.append("g").attr("class", stanford_classes.stanfordLines);
    elements.append("g").attr("class", stanford_classes.stanfordRegions);
  }
  var _proto = Elements.prototype;
  _proto.updateStanfordLines = function updateStanfordLines(duration) {
    var _this = this,
      $$ = this.owner.$$,
      config = $$.config,
      main = $$.$el.main,
      isRotated = config.axis_rotated,
      xvCustom = this.xvCustom.bind($$),
      yvCustom = this.yvCustom.bind($$),
      stanfordLine = main.select("." + stanford_classes.stanfordLines).style("shape-rendering", "geometricprecision").selectAll("." + stanford_classes.stanfordLine).data(this.owner.config.lines);
    // Stanford-Lines

    // exit
    stanfordLine.exit().transition().duration(duration).style("opacity", "0").remove();

    // enter
    var stanfordLineEnter = stanfordLine.enter().append("g");
    stanfordLineEnter.append("line").style("opacity", "0");
    stanfordLineEnter.merge(stanfordLine).attr("class", function (d) {
      _newArrowCheck(this, _this);
      return stanford_classes.stanfordLine + (d.class ? " " + d.class : "");
    }.bind(this)).select("line").transition().duration(duration).attr("x1", function (d) {
      _newArrowCheck(this, _this);
      return isRotated ? yvCustom(d, "y1") : xvCustom(d, "x1");
    }.bind(this)).attr("x2", function (d) {
      _newArrowCheck(this, _this);
      return isRotated ? yvCustom(d, "y2") : xvCustom(d, "x2");
    }.bind(this)).attr("y1", function (d) {
      _newArrowCheck(this, _this);
      return isRotated ? xvCustom(d, "x1") : yvCustom(d, "y1");
    }.bind(this)).attr("y2", function (d) {
      _newArrowCheck(this, _this);
      return isRotated ? xvCustom(d, "x2") : yvCustom(d, "y2");
    }.bind(this)).transition().style("opacity", null);
  };
  _proto.updateStanfordRegions = function updateStanfordRegions(duration) {
    var _this2 = this,
      $$ = this.owner.$$,
      config = $$.config,
      main = $$.$el.main,
      isRotated = config.axis_rotated,
      xvCustom = this.xvCustom.bind($$),
      yvCustom = this.yvCustom.bind($$),
      countPointsInRegion = this.owner.countEpochsInRegion.bind($$),
      stanfordRegion = main.select("." + stanford_classes.stanfordRegions).selectAll("." + stanford_classes.stanfordRegion).data(this.owner.config.regions); // Stanford-Regions
    // exit
    stanfordRegion.exit().transition().duration(duration).style("opacity", "0").remove();

    // enter
    var stanfordRegionEnter = stanfordRegion.enter().append("g");
    stanfordRegionEnter.append("polygon").style("opacity", "0");
    stanfordRegionEnter.append("text").attr("transform", isRotated ? "rotate(-90)" : "").style("opacity", "0");
    stanfordRegion = stanfordRegionEnter.merge(stanfordRegion);

    // update
    stanfordRegion.attr("class", function (d) {
      _newArrowCheck(this, _this2);
      return stanford_classes.stanfordRegion + (d.class ? " " + d.class : "");
    }.bind(this)).select("polygon").transition().duration(duration).attr("points", function (d) {
      var _this3 = this;
      _newArrowCheck(this, _this2);
      return d.points.map(function (value) {
        _newArrowCheck(this, _this3);
        return [isRotated ? yvCustom(value, "y") : xvCustom(value, "x"), isRotated ? xvCustom(value, "x") : yvCustom(value, "y")].join(",");
      }.bind(this)).join(" ");
    }.bind(this)).transition().style("opacity", function (d) {
      _newArrowCheck(this, _this2);
      return (d.opacity ? d.opacity : .2) + "";
    }.bind(this));
    stanfordRegion.select("text").transition().duration(duration).attr("x", function (d) {
      _newArrowCheck(this, _this2);
      return isRotated ? yvCustom(getCentroid(d.points), "y") : xvCustom(getCentroid(d.points), "x");
    }.bind(this)).attr("y", function (d) {
      _newArrowCheck(this, _this2);
      return isRotated ? xvCustom(getCentroid(d.points), "x") : yvCustom(getCentroid(d.points), "y");
    }.bind(this)).text(function (d) {
      _newArrowCheck(this, _this2);
      if (d.text) {
        var _countPointsInRegion = countPointsInRegion(d.points),
          value = _countPointsInRegion.value,
          percentage = _countPointsInRegion.percentage;
        return d.text(value, percentage);
      }
      return "";
    }.bind(this)).attr("text-anchor", "middle").attr("dominant-baseline", "middle").transition().style("opacity", null);
  };
  _proto.updateStanfordElements = function updateStanfordElements(duration) {
    if (duration === void 0) {
      duration = 0;
    }
    this.updateStanfordLines(duration);
    this.updateStanfordRegions(duration);
  };
  _proto.xvCustom = function xvCustom(d, xyValue) {
    var $$ = this,
      axis = $$.axis,
      config = $$.config;
    var value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    if (axis.isTimeSeries()) {
      value = parseDate.call($$, value);
    } else if (axis.isCategorized() && isString(value)) {
      value = config.axis_x_categories.indexOf(d.value);
    }
    return Math.ceil($$.scale.x(value));
  };
  _proto.yvCustom = function yvCustom(d, xyValue) {
    var $$ = this,
      yScale = d.axis && d.axis === "y2" ? $$.scale.y2 : $$.scale.y,
      value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  };
  return Elements;
}();

// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(8);
// EXTERNAL MODULE: external {"commonjs":"d3-format","commonjs2":"d3-format","amd":"d3-format","root":"d3"}
var external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_ = __webpack_require__(9);
;// CONCATENATED MODULE: ./src/Plugin/stanford/ColorScale.ts

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
var ColorScale = /*#__PURE__*/function () {
  function ColorScale(owner) {
    this.owner = void 0;
    this.colorScale = void 0;
    this.owner = owner;
  }
  var _proto = ColorScale.prototype;
  _proto.drawColorScale = function drawColorScale() {
    var _this = this,
      _this$owner = this.owner,
      $$ = _this$owner.$$,
      config = _this$owner.config,
      target = $$.data.targets[0],
      height = $$.state.height - config.padding_bottom - config.padding_top,
      barWidth = config.scale_width,
      points = getRange(config.padding_bottom, height, 5),
      inverseScale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSequential)(target.colors).domain([points[points.length - 1], points[0]]);
    if (this.colorScale) {
      this.colorScale.remove();
    }
    this.colorScale = $$.$el.svg.append("g").attr("width", 50).attr("height", height).attr("class", stanford_classes.colorScale);
    this.colorScale.append("g").attr("transform", "translate(0, " + config.padding_top + ")").selectAll("bars").data(points).enter().append("rect").attr("y", function (d, i) {
      _newArrowCheck(this, _this);
      return i * 5;
    }.bind(this)).attr("x", 0).attr("width", barWidth).attr("height", 5).attr("fill", function (d) {
      _newArrowCheck(this, _this);
      return inverseScale(d);
    }.bind(this));

    // Legend Axis
    var axisScale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSymlog)().domain([target.minEpochs, target.maxEpochs]).range([points[0] + config.padding_top + points[points.length - 1] + 5 - 1, points[0] + config.padding_top]),
      legendAxis = (0,external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisRight)(axisScale),
      scaleFormat = config.scale_format;
    if (scaleFormat === "pow10") {
      legendAxis.tickValues([1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7]);
    } else if (isFunction(scaleFormat)) {
      legendAxis.tickFormat(scaleFormat);
    } else {
      legendAxis.tickFormat((0,external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_.format)("d"));
    }

    // Draw Axis
    var axis = this.colorScale.append("g").attr("class", "legend axis").attr("transform", "translate(" + barWidth + ",0)").call(legendAxis);
    if (scaleFormat === "pow10") {
      axis.selectAll(".tick text").text(null).filter(function (d) {
        _newArrowCheck(this, _this);
        return d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10 - 1e-12)) === 1;
      }.bind(this)) // Power of Ten
      .text(10).append("tspan").attr("dy", "-.7em") // https://bl.ocks.org/mbostock/6738229
      .text(function (d) {
        _newArrowCheck(this, _this);
        return Math.round(Math.log(d) / Math.LN10);
      }.bind(this));
    }
    this.colorScale.attr("transform", "translate(" + ($$.state.current.width - this.xForColorScale()) + ", 0)");
  };
  _proto.xForColorScale = function xForColorScale() {
    return this.owner.config.padding_right + this.colorScale.node().getBBox().width;
  };
  _proto.getColorScalePadding = function getColorScalePadding() {
    return this.xForColorScale() + this.owner.config.padding_left + 20;
  };
  return ColorScale;
}();

;// CONCATENATED MODULE: ./src/Plugin/stanford/index.ts



/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// @ts-nocheck











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
 * @param {object} options Stanford plugin options
 * @augments Plugin
 * @returns {Stanford}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-stanford.js"></script>
 *
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
var Stanford = /*#__PURE__*/function (_Plugin) {
  _inheritsLoose(Stanford, _Plugin);
  function Stanford(options) {
    var _this = _Plugin.call(this, options) || this;
    _this.config = void 0;
    _this.colorScale = void 0;
    _this.elements = void 0;
    _this.config = new Options();
    return _assertThisInitialized(_this) || _assertThisInitialized(_this);
  }
  var _proto = Stanford.prototype;
  _proto.$beforeInit = function $beforeInit() {
    var _this2 = this,
      $$ = this.$$;
    // override on config values & methods
    $$.config.data_xSort = !1;
    $$.isMultipleX = function () {
      _newArrowCheck(this, _this2);
      return !0;
    }.bind(this);
    $$.showGridFocus = function () {
      _newArrowCheck(this, _this2);
    }.bind(this);
    $$.labelishData = function (d) {
      _newArrowCheck(this, _this2);
      return d.values;
    }.bind(this);
    $$.opacityForCircle = function () {
      _newArrowCheck(this, _this2);
      return 1;
    }.bind(this);
    var getCurrentPaddingRight = $$.getCurrentPaddingRight.bind($$);
    $$.getCurrentPaddingRight = function () {
      _newArrowCheck(this, _this2);
      return getCurrentPaddingRight() + (this.colorScale ? this.colorScale.getColorScalePadding() : 0);
    }.bind(this);
  };
  _proto.$init = function $init() {
    var $$ = this.$$;
    loadConfig.call(this, this.options);
    $$.color = this.getStanfordPointColor.bind($$);
    this.colorScale = new ColorScale(this);
    this.elements = new Elements(this);
    this.convertData();
    this.initStanfordData();
    this.setStanfordTooltip();
    this.colorScale.drawColorScale();
    this.$redraw();
  };
  _proto.$redraw = function $redraw(duration) {
    var _this$colorScale, _this$elements;
    (_this$colorScale = this.colorScale) == null ? void 0 : _this$colorScale.drawColorScale();
    (_this$elements = this.elements) == null ? void 0 : _this$elements.updateStanfordElements(duration);
  };
  _proto.getOptions = function getOptions() {
    return new Options();
  };
  _proto.convertData = function convertData() {
    var _this3 = this,
      data = this.$$.data.targets,
      epochs = this.options.epochs;
    data.forEach(function (d) {
      var _this4 = this;
      _newArrowCheck(this, _this3);
      d.values.forEach(function (v, i) {
        _newArrowCheck(this, _this4);
        v.epochs = epochs[i];
      }.bind(this));
      d.minEpochs = undefined;
      d.maxEpochs = undefined;
      d.colors = undefined;
      d.colorscale = undefined;
    }.bind(this));
  };
  _proto.xvCustom = function xvCustom(d, xyValue) {
    var $$ = this,
      axis = $$.axis,
      config = $$.config;
    var value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    if (axis.isTimeSeries()) {
      value = parseDate.call($$, value);
    } else if (axis.isCategorized() && isString(value)) {
      value = config.axis_x_categories.indexOf(d.value);
    }
    return Math.ceil($$.scale.x(value));
  };
  _proto.yvCustom = function yvCustom(d, xyValue) {
    var $$ = this,
      scale = $$.scale,
      yScale = d.axis && d.axis === "y2" ? scale.y2 : scale.y,
      value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  };
  _proto.initStanfordData = function initStanfordData() {
    var _this5 = this,
      config = this.config,
      target = this.$$.data.targets[0];
    // TODO STANFORD see if (data.js -> orderTargets)+ can be used instead
    // Make larger values appear on top
    target.values.sort(compareEpochs);

    // Get array of epochs
    var epochs = target.values.map(function (a) {
      _newArrowCheck(this, _this5);
      return a.epochs;
    }.bind(this));
    target.minEpochs = !isNaN(config.scale_min) ? config.scale_min : Math.min.apply(Math, epochs);
    target.maxEpochs = !isNaN(config.scale_max) ? config.scale_max : Math.max.apply(Math, epochs);
    target.colors = isFunction(config.colors) ? config.colors : (0,external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_.interpolateHslLong)((0,external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_.hsl)(250, 1, .5), (0,external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_.hsl)(0, 1, .5));
    target.colorscale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSequentialLog)(target.colors).domain([target.minEpochs, target.maxEpochs]);
  };
  _proto.getStanfordPointColor = function getStanfordPointColor(d) {
    var target = this.data.targets[0];
    return target.colorscale(d.epochs);
  };
  _proto.setStanfordTooltip = function setStanfordTooltip() {
    var config = this.$$.config;
    if (isEmpty(config.tooltip_contents)) {
      config.tooltip_contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
        var _this6 = this,
          data_x = config.data_x,
          html = "<table class=\"" + $TOOLTIP.tooltip + "\"><tbody>";
        d.forEach(function (v) {
          _newArrowCheck(this, _this6);
          var _v$id = v.id,
            id = _v$id === void 0 ? "" : _v$id,
            _v$value = v.value,
            value = _v$value === void 0 ? 0 : _v$value,
            _v$epochs = v.epochs,
            epochs = _v$epochs === void 0 ? 0 : _v$epochs,
            _v$x = v.x,
            x = _v$x === void 0 ? "" : _v$x;
          html += "<tr>\n\t\t\t\t\t\t\t<th>" + (data_x || "") + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultTitleFormat(x) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>" + v.id + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(value) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr class=\"" + $TOOLTIP.tooltipName + "-" + id + "\">\n\t\t\t\t\t\t\t<td class=\"name\"><span style=\"background-color:" + color(v) + "\"></span>Epochs</td>\n\t\t\t\t\t\t\t<td class=\"value\">" + defaultValueFormat(epochs) + "</td>\n\t\t\t\t\t\t</tr>";
        }.bind(this));
        return html + "</tbody></table>";
      };
    }
  };
  _proto.countEpochsInRegion = function countEpochsInRegion(region) {
    var _this7 = this,
      $$ = this,
      target = $$.data.targets[0],
      total = target.values.reduce(function (accumulator, currentValue) {
        _newArrowCheck(this, _this7);
        return accumulator + +currentValue.epochs;
      }.bind(this), 0),
      value = target.values.reduce(function (accumulator, currentValue) {
        _newArrowCheck(this, _this7);
        if (pointInRegion(currentValue, region)) {
          return accumulator + +currentValue.epochs;
        }
        return accumulator;
      }.bind(this), 0);
    return {
      value: value,
      percentage: value !== 0 ? +(value / total * 100).toFixed(1) : 0
    };
  };
  return Stanford;
}(Plugin);

}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});