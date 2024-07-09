/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 3.12.4
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-color"), require("d3-interpolate"), require("d3-scale"), require("d3-brush"), require("d3-selection"), require("d3-axis"), require("d3-format"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-color", "d3-interpolate", "d3-scale", "d3-brush", "d3-selection", "d3-axis", "d3-format"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-color"), require("d3-interpolate"), require("d3-scale"), require("d3-brush"), require("d3-selection"), require("d3-axis"), require("d3-format"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["stanford"] = factory(root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__9__) {
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

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Stanford; }
});

// EXTERNAL MODULE: external {"commonjs":"d3-color","commonjs2":"d3-color","amd":"d3-color","root":"d3"}
var external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_ = __webpack_require__(5);
// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(6);
// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(7);
;// CONCATENATED MODULE: ./src/config/classes.ts
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const $COMMON = {
  button: "bb-button",
  chart: "bb-chart",
  empty: "bb-empty",
  main: "bb-main",
  target: "bb-target",
  EXPANDED: "_expanded_"
};
const $ARC = {
  arc: "bb-arc",
  arcLabelLine: "bb-arc-label-line",
  arcRange: "bb-arc-range",
  arcs: "bb-arcs",
  chartArc: "bb-chart-arc",
  chartArcs: "bb-chart-arcs",
  chartArcsBackground: "bb-chart-arcs-background",
  chartArcsTitle: "bb-chart-arcs-title",
  needle: "bb-needle"
};
const $AREA = {
  area: "bb-area",
  areas: "bb-areas"
};
const $AXIS = {
  axis: "bb-axis",
  axisX: "bb-axis-x",
  axisXLabel: "bb-axis-x-label",
  axisY: "bb-axis-y",
  axisY2: "bb-axis-y2",
  axisY2Label: "bb-axis-y2-label",
  axisYLabel: "bb-axis-y-label",
  axisXTooltip: "bb-axis-x-tooltip",
  axisYTooltip: "bb-axis-y-tooltip",
  axisY2Tooltip: "bb-axis-y2-tooltip"
};
const $BAR = {
  bar: "bb-bar",
  bars: "bb-bars",
  chartBar: "bb-chart-bar",
  chartBars: "bb-chart-bars"
};
const $CANDLESTICK = {
  candlestick: "bb-candlestick",
  candlesticks: "bb-candlesticks",
  chartCandlestick: "bb-chart-candlestick",
  chartCandlesticks: "bb-chart-candlesticks",
  valueDown: "bb-value-down",
  valueUp: "bb-value-up"
};
const $CIRCLE = {
  chartCircles: "bb-chart-circles",
  circle: "bb-circle",
  circles: "bb-circles"
};
const $COLOR = {
  colorPattern: "bb-color-pattern",
  colorScale: "bb-colorscale"
};
const $DRAG = {
  dragarea: "bb-dragarea",
  INCLUDED: "_included_"
};
const $FUNNEL = {
  funnel: "bb-funnel",
  chartFunnel: "bb-chart-funnel",
  chartFunnels: "bb-chart-funnels",
  funnelBackground: "bb-funnel-background"
};
const $GAUGE = {
  chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
  chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
  chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
  chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
  gaugeValue: "bb-gauge-value"
};
const $LEGEND = {
  legend: "bb-legend",
  legendBackground: "bb-legend-background",
  legendItem: "bb-legend-item",
  legendItemEvent: "bb-legend-item-event",
  legendItemHidden: "bb-legend-item-hidden",
  legendItemPoint: "bb-legend-item-point",
  legendItemTile: "bb-legend-item-tile"
};
const $LINE = {
  chartLine: "bb-chart-line",
  chartLines: "bb-chart-lines",
  line: "bb-line",
  lines: "bb-lines"
};
const $EVENT = {
  eventRect: "bb-event-rect",
  eventRects: "bb-event-rects",
  eventRectsMultiple: "bb-event-rects-multiple",
  eventRectsSingle: "bb-event-rects-single"
};
const $FOCUS = {
  focused: "bb-focused",
  defocused: "bb-defocused",
  legendItemFocused: "bb-legend-item-focused",
  xgridFocus: "bb-xgrid-focus",
  ygridFocus: "bb-ygrid-focus"
};
const $GRID = {
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
const $LEVEL = {
  level: "bb-level",
  levels: "bb-levels"
};
const $RADAR = {
  chartRadar: "bb-chart-radar",
  chartRadars: "bb-chart-radars"
};
const $REGION = {
  region: "bb-region",
  regions: "bb-regions"
};
const $SELECT = {
  selectedCircle: "bb-selected-circle",
  selectedCircles: "bb-selected-circles",
  SELECTED: "_selected_"
};
const $SHAPE = {
  shape: "bb-shape",
  shapes: "bb-shapes"
};
const $SUBCHART = {
  brush: "bb-brush",
  subchart: "bb-subchart"
};
const $TEXT = {
  chartText: "bb-chart-text",
  chartTexts: "bb-chart-texts",
  text: "bb-text",
  texts: "bb-texts",
  title: "bb-title",
  TextOverlapping: "text-overlapping"
};
const $TOOLTIP = {
  tooltip: "bb-tooltip",
  tooltipContainer: "bb-tooltip-container",
  tooltipName: "bb-tooltip-name"
};
const $TREEMAP = {
  treemap: "bb-treemap",
  chartTreemap: "bb-chart-treemap",
  chartTreemaps: "bb-chart-treemaps"
};
const $ZOOM = {
  buttonZoomReset: "bb-zoom-reset",
  zoomBrush: "bb-zoom-brush"
};
/* harmony default export */ var classes = (__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, $COMMON), $ARC), $AREA), $AXIS), $BAR), $CANDLESTICK), $CIRCLE), $COLOR), $DRAG), $GAUGE), $LEGEND), $LINE), $EVENT), $FOCUS), $FUNNEL), $GRID), $RADAR), $REGION), $SELECT), $SHAPE), $SUBCHART), $TEXT), $TOOLTIP), $TREEMAP), $ZOOM));

// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(3);
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
;// CONCATENATED MODULE: ./src/module/browser.ts
function getGlobal() {
  return typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object && globalThis || typeof global === "object" && global !== null && global.Object === Object && global || typeof self === "object" && self !== null && self.Object === Object && self || Function("return this")();
}
function getFallback(w) {
  const hasRAF = typeof (w == null ? void 0 : w.requestAnimationFrame) === "function" && typeof (w == null ? void 0 : w.cancelAnimationFrame) === "function";
  const hasRIC = typeof (w == null ? void 0 : w.requestIdleCallback) === "function" && typeof (w == null ? void 0 : w.cancelIdleCallback) === "function";
  const request = (cb) => setTimeout(cb, 1);
  const cancel = (id) => clearTimeout(id);
  return [
    hasRAF ? w.requestAnimationFrame : request,
    hasRAF ? w.cancelAnimationFrame : cancel,
    hasRIC ? w.requestIdleCallback : request,
    hasRIC ? w.cancelIdleCallback : cancel
  ];
}
const win = getGlobal();
const doc = win == null ? void 0 : win.document;
const [
  requestAnimationFrame,
  cancelAnimationFrame,
  requestIdleCallback,
  cancelIdleCallback
] = getFallback(win);


;// CONCATENATED MODULE: ./src/module/util.ts
var util_defProp = Object.defineProperty;
var util_getOwnPropSymbols = Object.getOwnPropertySymbols;
var util_hasOwnProp = Object.prototype.hasOwnProperty;
var util_propIsEnum = Object.prototype.propertyIsEnumerable;
var util_defNormalProp = (obj, key, value) => key in obj ? util_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var util_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (util_hasOwnProp.call(b, prop))
      util_defNormalProp(a, prop, b[prop]);
  if (util_getOwnPropSymbols)
    for (var prop of util_getOwnPropSymbols(b)) {
      if (util_propIsEnum.call(b, prop))
        util_defNormalProp(a, prop, b[prop]);
    }
  return a;
};




const isValue = (v) => v || v === 0;
const isFunction = (v) => typeof v === "function";
const isString = (v) => typeof v === "string";
const isNumber = (v) => typeof v === "number";
const isUndefined = (v) => typeof v === "undefined";
const isDefined = (v) => typeof v !== "undefined";
const isBoolean = (v) => typeof v === "boolean";
const ceil10 = (v) => Math.ceil(v / 10) * 10;
const asHalfPixel = (n) => Math.ceil(n) + 0.5;
const diffDomain = (d) => d[1] - d[0];
const isObjectType = (v) => typeof v === "object";
const isEmpty = (o) => isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
const notEmpty = (o) => !isEmpty(o);
const isArray = (arr) => Array.isArray(arr);
const isObject = (obj) => obj && !(obj == null ? void 0 : obj.nodeType) && isObjectType(obj) && !isArray(obj);
function getOption(options, key, defaultValue) {
  return isDefined(options[key]) ? options[key] : defaultValue;
}
function hasValue(dict, value) {
  let found = false;
  Object.keys(dict).forEach((key) => dict[key] === value && (found = true));
  return found;
}
function callFn(fn, thisArg, ...args) {
  const isFn = isFunction(fn);
  isFn && fn.call(thisArg, ...args);
  return isFn;
}
function endall(transition, cb) {
  let n = 0;
  const end = function(...args) {
    !--n && cb.apply(this, ...args);
  };
  if ("duration" in transition) {
    transition.each(() => ++n).on("end", end);
  } else {
    ++n;
    transition.call(end);
  }
}
function sanitize(str) {
  return isString(str) ? str.replace(/<(script|img)?/ig, "&lt;").replace(/(script)?>/ig, "&gt;") : str;
}
function setTextValue(node, text, dy = [-1, 1], toMiddle = false) {
  if (!node || !isString(text)) {
    return;
  }
  if (text.indexOf("\n") === -1) {
    node.text(text);
  } else {
    const diff = [node.text(), text].map((v) => v.replace(/[\s\n]/g, ""));
    if (diff[0] !== diff[1]) {
      const multiline = text.split("\n");
      const len = toMiddle ? multiline.length - 1 : 1;
      node.html("");
      multiline.forEach((v, i) => {
        node.append("tspan").attr("x", 0).attr("dy", `${i === 0 ? dy[0] * len : dy[1]}em`).text(v);
      });
    }
  }
}
function getRectSegList(path) {
  const { x, y, width, height } = path.getBBox();
  return [
    { x, y: y + height },
    // seg0
    { x, y },
    // seg1
    { x: x + width, y },
    // seg2
    { x: x + width, y: y + height }
    // seg3
  ];
}
function getPathBox(path) {
  const { width, height } = path.getBoundingClientRect();
  const items = getRectSegList(path);
  const x = items[0].x;
  const y = Math.min(items[0].y, items[1].y);
  return {
    x,
    y,
    width,
    height
  };
}
function getPointer(event, element) {
  var _a;
  const touches = event && ((_a = event.touches || event.sourceEvent && event.sourceEvent.touches) == null ? void 0 : _a[0]);
  let pointer = [0, 0];
  try {
    pointer = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.pointer)(touches || event, element);
  } catch (e) {
  }
  return pointer.map((v) => isNaN(v) ? 0 : v);
}
function getBrushSelection(ctx) {
  const { event, $el } = ctx;
  const main = $el.subchart.main || $el.main;
  let selection;
  if (event && event.type === "brush") {
    selection = event.selection;
  } else if (main && (selection = main.select(".bb-brush").node())) {
    selection = (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushSelection)(selection);
  }
  return selection;
}
function getBoundingRect(node) {
  const needEvaluate = !("rect" in node) || "rect" in node && node.hasAttribute("width") && node.rect.width !== +node.getAttribute("width");
  return needEvaluate ? node.rect = node.getBoundingClientRect() : node.rect;
}
function getRandom(asStr = true, min = 0, max = 1e4) {
  const crpt = win.crypto || win.msCrypto;
  const rand = crpt ? min + crpt.getRandomValues(new Uint32Array(1))[0] % (max - min + 1) : Math.floor(Math.random() * (max - min) + min);
  return asStr ? String(rand) : rand;
}
function findIndex(arr, v, start, end, isRotated) {
  if (start > end) {
    return -1;
  }
  const mid = Math.floor((start + end) / 2);
  let { x, w = 0 } = arr[mid];
  if (isRotated) {
    x = arr[mid].y;
    w = arr[mid].h;
  }
  if (v >= x && v <= x + w) {
    return mid;
  }
  return v < x ? findIndex(arr, v, start, mid - 1, isRotated) : findIndex(arr, v, mid + 1, end, isRotated);
}
function brushEmpty(ctx) {
  const selection = getBrushSelection(ctx);
  if (selection) {
    return selection[0] === selection[1];
  }
  return true;
}
function deepClone(...objectN) {
  const clone = (v) => {
    if (isObject(v) && v.constructor) {
      const r = new v.constructor();
      for (const k in v) {
        r[k] = clone(v[k]);
      }
      return r;
    }
    return v;
  };
  return objectN.map((v) => clone(v)).reduce((a, c) => util_spreadValues(util_spreadValues({}, a), c));
}
function extend(target = {}, source) {
  if (isArray(source)) {
    source.forEach((v) => extend(target, v));
  }
  for (const p in source) {
    if (/^\d+$/.test(p) || p in target) {
      continue;
    }
    target[p] = source[p];
  }
  return target;
}
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
function camelize(str, separator = "-") {
  return str.split(separator).map((v, i) => i ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v.toLowerCase()).join("");
}
const toArray = (v) => [].slice.call(v);
function addCssRules(style, selector, prop) {
  const { rootSelector = "", sheet } = style;
  const getSelector = (s) => s.replace(/\s?(bb-)/g, ".$1").replace(/\.+/g, ".");
  const rule = `${rootSelector} ${getSelector(selector)} {${prop.join(";")}}`;
  return sheet[sheet.insertRule ? "insertRule" : "addRule"](
    rule,
    sheet.cssRules.length
  );
}
function getCssRules(styleSheets) {
  let rules = [];
  styleSheets.forEach((sheet) => {
    var _a;
    try {
      if (sheet.cssRules && sheet.cssRules.length) {
        rules = rules.concat(toArray(sheet.cssRules));
      }
    } catch (e) {
      (_a = win.console) == null ? void 0 : _a.warn(`Error while reading rules from ${sheet.href}: ${e.toString()}`);
    }
  });
  return rules;
}
function getScrollPosition(node) {
  var _a, _b, _c, _d;
  return {
    x: ((_b = (_a = win.pageXOffset) != null ? _a : win.scrollX) != null ? _b : 0) + node.scrollLeft,
    y: ((_d = (_c = win.pageYOffset) != null ? _c : win.scrollY) != null ? _d : 0) + node.scrollTop
  };
}
function getTranslation(node) {
  const transform = node ? node.transform : null;
  const baseVal = transform && transform.baseVal;
  return baseVal && baseVal.numberOfItems ? baseVal.getItem(0).matrix : { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };
}
function getUnique(data) {
  const isDate = data[0] instanceof Date;
  const d = (isDate ? data.map(Number) : data).filter((v, i, self) => self.indexOf(v) === i);
  return isDate ? d.map((v) => new Date(v)) : d;
}
function mergeArray(arr) {
  return arr && arr.length ? arr.reduce((p, c) => p.concat(c)) : [];
}
function mergeObj(target, ...objectN) {
  if (!objectN.length || objectN.length === 1 && !objectN[0]) {
    return target;
  }
  const source = objectN.shift();
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const value = source[key];
      if (isObject(value)) {
        !target[key] && (target[key] = {});
        target[key] = mergeObj(target[key], value);
      } else {
        target[key] = isArray(value) ? value.concat() : value;
      }
    });
  }
  return mergeObj(target, ...objectN);
}
function sortValue(data, isAsc = true) {
  let fn;
  if (data[0] instanceof Date) {
    fn = isAsc ? (a, b) => a - b : (a, b) => b - a;
  } else {
    if (isAsc && !data.every(isNaN)) {
      fn = (a, b) => a - b;
    } else if (!isAsc) {
      fn = (a, b) => a > b && -1 || a < b && 1 || a === b && 0;
    }
  }
  return data.concat().sort(fn);
}
function getMinMax(type, data) {
  let res = data.filter((v) => notEmpty(v));
  if (res.length) {
    if (isNumber(res[0])) {
      res = Math[type](...res);
    } else if (res[0] instanceof Date) {
      res = sortValue(res, type === "min")[0];
    }
  } else {
    res = void 0;
  }
  return res;
}
const getRange = (start, end, step = 1) => {
  const res = [];
  const n = Math.max(0, Math.ceil((end - start) / step)) | 0;
  for (let i = start; i < n; i++) {
    res.push(start + i * step);
  }
  return res;
};
const emulateEvent = {
  mouse: (() => {
    const getParams = () => ({
      bubbles: false,
      cancelable: false,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0
    });
    try {
      new MouseEvent("t");
      return (el, eventType, params = getParams()) => {
        el.dispatchEvent(new MouseEvent(eventType, params));
      };
    } catch (e) {
      return (el, eventType, params = getParams()) => {
        const mouseEvent = doc.createEvent("MouseEvent");
        mouseEvent.initMouseEvent(
          eventType,
          params.bubbles,
          params.cancelable,
          win,
          0,
          // the event's mouse click count
          params.screenX,
          params.screenY,
          params.clientX,
          params.clientY,
          false,
          false,
          false,
          false,
          0,
          null
        );
        el.dispatchEvent(mouseEvent);
      };
    }
  })(),
  touch: (el, eventType, params) => {
    const touchObj = new Touch(mergeObj({
      identifier: Date.now(),
      target: el,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5
    }, params));
    el.dispatchEvent(new TouchEvent(eventType, {
      cancelable: true,
      bubbles: true,
      shiftKey: true,
      touches: [touchObj],
      targetTouches: [],
      changedTouches: [touchObj]
    }));
  }
};
function tplProcess(tpl, data) {
  let res = tpl;
  for (const x in data) {
    res = res.replace(new RegExp(`{=${x}}`, "g"), data[x]);
  }
  return res;
}
function parseDate(date) {
  var _a;
  let parsedDate;
  if (date instanceof Date) {
    parsedDate = date;
  } else if (isString(date)) {
    const { config, format } = this;
    parsedDate = (_a = format.dataTime(config.data_xFormat)(date)) != null ? _a : new Date(date);
  } else if (isNumber(date) && !isNaN(date)) {
    parsedDate = /* @__PURE__ */ new Date(+date);
  }
  if (!parsedDate || isNaN(+parsedDate)) {
    console && console.error && console.error(`Failed to parse x '${date}' to Date object`);
  }
  return parsedDate;
}
function isTabVisible() {
  var _a, _b;
  return ((_a = doc) == null ? void 0 : _a.hidden) === false || ((_b = doc) == null ? void 0 : _b.visibilityState) === "visible";
}
function convertInputType(mouse, touch) {
  const { DocumentTouch, matchMedia, navigator } = win;
  let hasTouch = false;
  if (touch) {
    if (navigator && "maxTouchPoints" in navigator) {
      hasTouch = navigator.maxTouchPoints > 0;
    } else if ("ontouchmove" in win || DocumentTouch && doc instanceof DocumentTouch) {
      hasTouch = true;
    } else {
      if (matchMedia == null ? void 0 : matchMedia("(pointer:coarse)").matches) {
        hasTouch = true;
      } else {
        const UA = navigator.userAgent;
        hasTouch = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
  }
  const hasMouse = mouse && ((matchMedia == null ? void 0 : matchMedia("any-hover:hover").matches) || (matchMedia == null ? void 0 : matchMedia("any-pointer:fine").matches));
  return hasMouse && "mouse" || hasTouch && "touch" || "mouse";
}
function runUntil(fn, conditionFn) {
  if (conditionFn() === false) {
    requestAnimationFrame(() => runUntil(fn, conditionFn));
  } else {
    fn();
  }
}

;// CONCATENATED MODULE: ./src/config/config.ts

function loadConfig(config) {
  const thisConfig = this.config;
  let target;
  let keys;
  let read;
  const find = () => {
    const key = keys.shift();
    if (key && target && isObjectType(target) && key in target) {
      target = target[key];
      return find();
    } else if (!key) {
      return target;
    }
    return void 0;
  };
  Object.keys(thisConfig).forEach((key) => {
    target = config;
    keys = key.split("_");
    read = find();
    if (isDefined(read)) {
      thisConfig[key] = read;
    }
  });
  if (this.api) {
    this.state.orgConfig = config;
  }
}

;// CONCATENATED MODULE: ./src/Plugin/Plugin.ts
var Plugin_defProp = Object.defineProperty;
var Plugin_defNormalProp = (obj, key, value) => key in obj ? Plugin_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  Plugin_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Plugin {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  constructor(options = {}) {
    __publicField(this, "$$");
    __publicField(this, "options");
    this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */
  $beforeInit() {
  }
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  $init() {
  }
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  $afterInit() {
  }
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  $redraw() {
  }
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  $willDestroy() {
    Object.keys(this).forEach((key) => {
      this[key] = null;
      delete this[key];
    });
  }
}
__publicField(Plugin, "version", "3.12.4");

// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(8);
// EXTERNAL MODULE: external {"commonjs":"d3-format","commonjs2":"d3-format","amd":"d3-format","root":"d3"}
var external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_ = __webpack_require__(9);
;// CONCATENATED MODULE: ./src/Plugin/stanford/classes.ts
/* harmony default export */ var stanford_classes = ({
  colorScale: "bb-colorscale",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions"
});

;// CONCATENATED MODULE: ./src/Plugin/stanford/ColorScale.ts
var ColorScale_defProp = Object.defineProperty;
var ColorScale_defNormalProp = (obj, key, value) => key in obj ? ColorScale_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var ColorScale_publicField = (obj, key, value) => {
  ColorScale_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};





class ColorScale {
  constructor(owner) {
    ColorScale_publicField(this, "owner");
    ColorScale_publicField(this, "colorScale");
    this.owner = owner;
  }
  drawColorScale() {
    const { $$, config } = this.owner;
    const target = $$.data.targets[0];
    const height = $$.state.height - config.padding_bottom - config.padding_top;
    const barWidth = config.scale_width;
    const barHeight = 5;
    const points = getRange(config.padding_bottom, height, barHeight);
    const inverseScale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSequential)(target.colors).domain([points[points.length - 1], points[0]]);
    if (this.colorScale) {
      this.colorScale.remove();
    }
    this.colorScale = $$.$el.svg.append("g").attr("width", 50).attr("height", height).attr("class", stanford_classes.colorScale);
    this.colorScale.append("g").attr("transform", `translate(0, ${config.padding_top})`).selectAll("bars").data(points).enter().append("rect").attr("y", (d, i) => i * barHeight).attr("x", 0).attr("width", barWidth).attr("height", barHeight).attr("fill", (d) => inverseScale(d));
    const axisScale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSymlog)().domain([target.minEpochs, target.maxEpochs]).range([
      points[0] + config.padding_top + points[points.length - 1] + barHeight - 1,
      points[0] + config.padding_top
    ]);
    const legendAxis = (0,external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisRight)(axisScale);
    const scaleFormat = config.scale_format;
    if (scaleFormat === "pow10") {
      legendAxis.tickValues([1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7]);
    } else if (isFunction(scaleFormat)) {
      legendAxis.tickFormat(scaleFormat);
    } else {
      legendAxis.tickFormat((0,external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_.format)("d"));
    }
    const axis = this.colorScale.append("g").attr("class", "legend axis").attr("transform", `translate(${barWidth},0)`).call(legendAxis);
    if (scaleFormat === "pow10") {
      axis.selectAll(".tick text").text(null).filter((d) => d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10 - 1e-12)) === 1).text(10).append("tspan").attr("dy", "-.7em").text((d) => Math.round(Math.log(d) / Math.LN10));
    }
    this.colorScale.attr(
      "transform",
      `translate(${$$.state.current.width - this.xForColorScale()}, 0)`
    );
  }
  xForColorScale() {
    return this.owner.config.padding_right + this.colorScale.node().getBBox().width;
  }
  getColorScalePadding() {
    return this.xForColorScale() + this.owner.config.padding_left + 20;
  }
}

;// CONCATENATED MODULE: ./src/Plugin/stanford/util.ts

function pointInRegion(point, region) {
  const x = point.x;
  const y = point.value;
  let inside = false;
  for (let i = 0, j = region.length - 1; i < region.length; j = i++) {
    const xi = region[i].x;
    const yi = region[i].y;
    const xj = region[j].x;
    const yj = region[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      inside = !inside;
    }
  }
  return inside;
}
function compareEpochs(a, b) {
  if (a.epochs < b.epochs) {
    return -1;
  }
  if (a.epochs > b.epochs) {
    return 1;
  }
  return 0;
}
function getRegionArea(points) {
  let area = 0;
  let point1;
  let point2;
  for (let i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
    point1 = points[i];
    point2 = points[j];
    area += point1.x * point2.y;
    area -= point1.y * point2.x;
  }
  area /= 2;
  return area;
}
function getCentroid(points) {
  const area = getRegionArea(points);
  let x = 0;
  let y = 0;
  let f;
  for (let i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
    const point1 = points[i];
    const point2 = points[j];
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
var Elements_defProp = Object.defineProperty;
var Elements_defNormalProp = (obj, key, value) => key in obj ? Elements_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var Elements_publicField = (obj, key, value) => {
  Elements_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};


class Elements {
  constructor(owner) {
    Elements_publicField(this, "owner");
    this.owner = owner;
    const elements = owner.$$.$el.main.select(".bb-chart").append("g").attr("class", stanford_classes.stanfordElements);
    elements.append("g").attr("class", stanford_classes.stanfordLines);
    elements.append("g").attr("class", stanford_classes.stanfordRegions);
  }
  updateStanfordLines(duration) {
    const { $$ } = this.owner;
    const { config, $el: { main } } = $$;
    const isRotated = config.axis_rotated;
    const xvCustom = this.xvCustom.bind($$);
    const yvCustom = this.yvCustom.bind($$);
    const stanfordLine = main.select(`.${stanford_classes.stanfordLines}`).style("shape-rendering", "geometricprecision").selectAll(`.${stanford_classes.stanfordLine}`).data(this.owner.config.lines);
    stanfordLine.exit().transition().duration(duration).style("opacity", "0").remove();
    const stanfordLineEnter = stanfordLine.enter().append("g");
    stanfordLineEnter.append("line").style("opacity", "0");
    stanfordLineEnter.merge(stanfordLine).attr("class", (d) => stanford_classes.stanfordLine + (d.class ? ` ${d.class}` : "")).select("line").transition().duration(duration).attr("x1", (d) => {
      const v = isRotated ? yvCustom(d, "y1") : xvCustom(d, "x1");
      return v;
    }).attr("x2", (d) => isRotated ? yvCustom(d, "y2") : xvCustom(d, "x2")).attr("y1", (d) => {
      const v = isRotated ? xvCustom(d, "x1") : yvCustom(d, "y1");
      return v;
    }).attr("y2", (d) => isRotated ? xvCustom(d, "x2") : yvCustom(d, "y2")).transition().style("opacity", null);
  }
  updateStanfordRegions(duration) {
    const { $$ } = this.owner;
    const { config, $el: { main } } = $$;
    const isRotated = config.axis_rotated;
    const xvCustom = this.xvCustom.bind($$);
    const yvCustom = this.yvCustom.bind($$);
    const countPointsInRegion = this.owner.countEpochsInRegion.bind($$);
    let stanfordRegion = main.select(`.${stanford_classes.stanfordRegions}`).selectAll(`.${stanford_classes.stanfordRegion}`).data(this.owner.config.regions);
    stanfordRegion.exit().transition().duration(duration).style("opacity", "0").remove();
    const stanfordRegionEnter = stanfordRegion.enter().append("g");
    stanfordRegionEnter.append("polygon").style("opacity", "0");
    stanfordRegionEnter.append("text").attr("transform", isRotated ? "rotate(-90)" : "").style("opacity", "0");
    stanfordRegion = stanfordRegionEnter.merge(stanfordRegion);
    stanfordRegion.attr("class", (d) => stanford_classes.stanfordRegion + (d.class ? ` ${d.class}` : "")).select("polygon").transition().duration(duration).attr("points", (d) => d.points.map(
      (value) => [
        isRotated ? yvCustom(value, "y") : xvCustom(value, "x"),
        isRotated ? xvCustom(value, "x") : yvCustom(value, "y")
      ].join(",")
    ).join(" ")).transition().style("opacity", (d) => String(d.opacity ? d.opacity : 0.2));
    stanfordRegion.select("text").transition().duration(duration).attr(
      "x",
      (d) => isRotated ? yvCustom(getCentroid(d.points), "y") : xvCustom(getCentroid(d.points), "x")
    ).attr(
      "y",
      (d) => isRotated ? xvCustom(getCentroid(d.points), "x") : yvCustom(getCentroid(d.points), "y")
    ).text((d) => {
      if (d.text) {
        const { value, percentage } = countPointsInRegion(d.points);
        return d.text(value, percentage);
      }
      return "";
    }).attr("text-anchor", "middle").attr("dominant-baseline", "middle").transition().style("opacity", null);
  }
  updateStanfordElements(duration = 0) {
    this.updateStanfordLines(duration);
    this.updateStanfordRegions(duration);
  }
  xvCustom(d, xyValue) {
    const $$ = this;
    const { axis, config } = $$;
    let value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    if (axis.isTimeSeries()) {
      value = parseDate.call($$, value);
    } else if (axis.isCategorized() && isString(value)) {
      value = config.axis_x_categories.indexOf(d.value);
    }
    return Math.ceil($$.scale.x(value));
  }
  yvCustom(d, xyValue) {
    const $$ = this;
    const yScale = d.axis && d.axis === "y2" ? $$.scale.y2 : $$.scale.y;
    const value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  }
}

;// CONCATENATED MODULE: ./src/Plugin/stanford/Options.ts
class Options {
  constructor() {
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
      colors: void 0,
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
      scale_min: void 0,
      scale_max: void 0,
      scale_width: 20,
      scale_format: void 0,
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
  }
}

;// CONCATENATED MODULE: ./src/Plugin/stanford/index.ts
var stanford_defProp = Object.defineProperty;
var stanford_defNormalProp = (obj, key, value) => key in obj ? stanford_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var stanford_publicField = (obj, key, value) => {
  stanford_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};










class Stanford extends Plugin {
  constructor(options) {
    super(options);
    stanford_publicField(this, "config");
    stanford_publicField(this, "colorScale");
    stanford_publicField(this, "elements");
    this.config = new Options();
    return this;
  }
  $beforeInit() {
    const { $$ } = this;
    $$.config.data_xSort = false;
    $$.isMultipleX = () => true;
    $$.showGridFocus = () => {
    };
    $$.labelishData = (d) => d.values;
    $$.opacityForCircle = () => 1;
    const getCurrentPadding = $$.getCurrentPadding.bind($$);
    $$.getCurrentPadding = () => {
      const padding = getCurrentPadding();
      padding.right += this.colorScale ? this.colorScale.getColorScalePadding() : 0;
      return padding;
    };
  }
  $init() {
    const { $$ } = this;
    loadConfig.call(this, this.options);
    $$.color = this.getStanfordPointColor.bind($$);
    this.colorScale = new ColorScale(this);
    this.elements = new Elements(this);
    this.convertData();
    this.initStanfordData();
    this.setStanfordTooltip();
    this.colorScale.drawColorScale();
    $$.right += this.colorScale ? this.colorScale.getColorScalePadding() : 0;
    this.$redraw();
  }
  $redraw(duration) {
    var _a, _b;
    (_a = this.colorScale) == null ? void 0 : _a.drawColorScale();
    (_b = this.elements) == null ? void 0 : _b.updateStanfordElements(duration);
  }
  getOptions() {
    return new Options();
  }
  convertData() {
    const data = this.$$.data.targets;
    const epochs = this.options.epochs;
    data.forEach((d) => {
      d.values.forEach((v, i) => {
        v.epochs = epochs[i];
      });
      d.minEpochs = void 0;
      d.maxEpochs = void 0;
      d.colors = void 0;
      d.colorscale = void 0;
    });
  }
  initStanfordData() {
    const { config } = this;
    const target = this.$$.data.targets[0];
    target.values.sort(compareEpochs);
    const epochs = target.values.map((a) => a.epochs);
    target.minEpochs = !isNaN(config.scale_min) ? config.scale_min : Math.min(...epochs);
    target.maxEpochs = !isNaN(config.scale_max) ? config.scale_max : Math.max(...epochs);
    target.colors = isFunction(config.colors) ? config.colors : (0,external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_.interpolateHslLong)((0,external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_.hsl)(250, 1, 0.5), (0,external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_.hsl)(0, 1, 0.5));
    target.colorscale = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSequentialLog)(target.colors).domain([target.minEpochs, target.maxEpochs]);
  }
  getStanfordPointColor(d) {
    const target = this.data.targets[0];
    return target.colorscale(d.epochs);
  }
  setStanfordTooltip() {
    const { config } = this.$$;
    if (isEmpty(config.tooltip_contents)) {
      config.tooltip_contents = function(d, defaultTitleFormat, defaultValueFormat, color) {
        const { data_x } = config;
        let html = `<table class="${$TOOLTIP.tooltip}"><tbody>`;
        d.forEach((v) => {
          const { id = "", value = 0, epochs = 0, x = "" } = v;
          html += `<tr>
							<th>${data_x || ""}</th>
							<th class="value">${defaultTitleFormat(x)}</th>
						</tr>
						<tr>
							<th>${v.id}</th>
							<th class="value">${defaultValueFormat(value)}</th>
						</tr>
						<tr class="${$TOOLTIP.tooltipName}-${id}">
							<td class="name"><span style="background-color:${color(v)}"></span>Epochs</td>
							<td class="value">${defaultValueFormat(epochs)}</td>
						</tr>`;
        });
        return `${html}</tbody></table>`;
      };
    }
  }
  countEpochsInRegion(region) {
    const $$ = this;
    const target = $$.data.targets[0];
    const total = target.values.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.epochs),
      0
    );
    const value = target.values.reduce((accumulator, currentValue) => {
      if (pointInRegion(currentValue, region)) {
        return accumulator + Number(currentValue.epochs);
      }
      return accumulator;
    }, 0);
    return {
      value,
      percentage: value !== 0 ? +(value / total * 100).toFixed(1) : 0
    };
  }
}

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});