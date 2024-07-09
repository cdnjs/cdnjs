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
		module.exports = factory(require("d3-brush"), require("d3-selection"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-brush", "d3-selection"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-brush"), require("d3-selection"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["sparkline"] = factory(root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__1__) {
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
  "default": function() { return /* binding */ Sparkline; }
});

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

;// CONCATENATED MODULE: ./src/Plugin/sparkline/Options.ts
class Options {
  constructor() {
    return {
      /**
       * Specify sparkline charts holder selector.
       * - **NOTE:** The amount of holder should match with the amount of data. If has less, will append necessaray amount nodes as sibling of main chart.
       * @name selector
       * @memberof plugin-sparkline
       * @type {string}
       * @default undefined
       * @example
       *   selector: ".sparkline"
       */
      selector: void 0
    };
  }
}

;// CONCATENATED MODULE: ./src/Plugin/sparkline/index.ts
var sparkline_defProp = Object.defineProperty;
var sparkline_defNormalProp = (obj, key, value) => key in obj ? sparkline_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var sparkline_publicField = (obj, key, value) => {
  sparkline_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};




class Sparkline extends Plugin {
  constructor(options) {
    super(options);
    sparkline_publicField(this, "config");
    sparkline_publicField(this, "element");
    this.config = new Options();
    return this;
  }
  $beforeInit() {
    loadConfig.call(this, this.options);
    this.validate();
    this.element = [].slice.call(document.querySelectorAll(this.config.selector));
    this.overrideInternals();
    this.overrideOptions();
    this.overHandler = this.overHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.outHandler = this.outHandler.bind(this);
  }
  validate() {
    const { $$, config } = this;
    let msg = "";
    if (!config.selector || !document.querySelector(config.selector)) {
      msg = "No holder elements found from given selector option.";
    }
    if ($$.hasType("bubble") || $$.hasType("scatter") || $$.hasArcType($$.data.targets)) {
      msg = "Contains non supported chart types.";
    }
    if (msg) {
      throw new Error(`[Sparkline plugin] ${msg}`);
    }
  }
  overrideInternals() {
    const { $$ } = this;
    const { getBarW, getIndices } = $$;
    $$.getIndices = function(indices, d, caller) {
      return caller === "getShapeX" ? {} : getIndices.call(this, indices, d);
    };
    $$.getBarW = function(type, axis) {
      return getBarW.call(this, type, axis, 1);
    };
  }
  overrideOptions() {
    const { config } = this.$$;
    config.legend_show = false;
    config.resize_auto = false;
    config.axis_x_show = false;
    if (config.padding !== false) {
      const hasOption = (o) => Object.keys(o || {}).length > 0;
      if (hasOption(config.axis_x_padding)) {
        config.axis_x_padding = {
          left: 15,
          right: 15,
          unit: "px"
        };
      }
      if (hasOption(config.axis_y_padding)) {
        config.axis_y_padding = 5;
      }
    }
    config.axis_y_show = false;
    if (!config.tooltip_position) {
      config.tooltip_position = function(data, width, height) {
        const { internal: { state: { event } } } = this;
        let top = event.pageY - height * 1.35;
        let left = event.pageX - width / 2;
        if (top < 0) {
          top = 0;
        }
        if (left < 0) {
          left = 0;
        }
        return { top, left };
      };
    }
  }
  $init() {
    var _a;
    const { $$: { $el } } = this;
    $el.chart.style("width", "0").style("height", "0").style("pointer-events", "none");
    ((_a = $el.tooltip) == null ? void 0 : _a.node()) && document.body.appendChild($el.tooltip.node());
  }
  $afterInit() {
    const { $$ } = this;
    $$.$el.svg.attr("style", null).style("width", "0").style("height", "0");
    this.bindEvents(true);
  }
  /**
   * Bind tooltip event handlers for each sparkline elements.
   * @param {boolean} bind or unbind
   * @private
   */
  bindEvents(bind = true) {
    const { $$: { config } } = this;
    if (config.interaction_enabled && config.tooltip_show) {
      const method = `${bind ? "add" : "remove"}EventListener`;
      this.element.forEach((el) => {
        const svg = el.querySelector("svg");
        svg[method]("mouseover", this.overHandler);
        svg[method]("mousemove", this.moveHandler);
        svg[method]("mouseout", this.outHandler);
      });
    }
  }
  overHandler(e) {
    const { $$ } = this;
    const { state: { eventReceiver } } = $$;
    eventReceiver.rect = e.target.getBoundingClientRect();
  }
  moveHandler(e) {
    var _a, _b, _c, _d;
    const { $$ } = this;
    const index = $$.getDataIndexFromEvent(e);
    const data = (_a = $$.api.data(e.target.__id)) == null ? void 0 : _a[0];
    const d = (_b = data == null ? void 0 : data.values) == null ? void 0 : _b[index];
    if (d && !d.name) {
      d.name = d.id;
    }
    $$.state.event = e;
    if (((_c = $$.isPointFocusOnly) == null ? void 0 : _c.call($$)) && d) {
      (_d = $$.showCircleFocus) == null ? void 0 : _d.call($$, [d]);
    }
    $$.setExpand(index, data.id, true);
    $$.showTooltip([d], e.target);
  }
  outHandler(e) {
    const { $$ } = this;
    $$.state.event = e;
    $$.isPointFocusOnly() ? $$.hideCircleFocus() : $$.unexpandCircles();
    $$.hideTooltip();
  }
  $redraw() {
    var _a;
    const { $$ } = this;
    const { $el } = $$;
    let el = this.element;
    const data = $$.api.data();
    const svgWrapper = (_a = $el.chart.html().match(/<svg[^>]*>/)) == null ? void 0 : _a[0];
    if (el.length < data.length) {
      const chart = $el.chart.node();
      for (let i = data.length - el.length; i > 0; i--) {
        chart.parentNode.insertBefore(el[0].cloneNode(), chart.nextSibling);
      }
      this.element = document.querySelectorAll(this.config.selector);
      el = this.element;
    }
    data.map((v) => v.id).forEach((id, i) => {
      const selector = `.${$COMMON.target}-${id}`;
      const shape = $el.main.selectAll(selector);
      let svg = el[i].querySelector("svg");
      if (!svg) {
        el[i].innerHTML = `${svgWrapper}</svg>`;
        svg = el[i].querySelector("svg");
        svg.__id = id;
      }
      if (!svg.querySelector(selector)) {
        shape.style("opacity", null);
      }
      shape.style("fill", "none").style("opacity", null);
      svg.innerHTML = "";
      svg.appendChild(shape.node());
    });
  }
  $willDestroy() {
    this.bindEvents(false);
    this.element.forEach((el) => {
      el.innerHTML = "";
    });
  }
}
sparkline_publicField(Sparkline, "version", `0.0.1`);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});