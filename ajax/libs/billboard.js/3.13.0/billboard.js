/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 3.13.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-axis"), require("d3-brush"), require("d3-drag"), require("d3-dsv"), require("d3-ease"), require("d3-hierarchy"), require("d3-interpolate"), require("d3-scale"), require("d3-selection"), require("d3-shape"), require("d3-time-format"), require("d3-transition"), require("d3-zoom"));
	else if(typeof define === 'function' && define.amd)
		define(["d3-axis", "d3-brush", "d3-drag", "d3-dsv", "d3-ease", "d3-hierarchy", "d3-interpolate", "d3-scale", "d3-selection", "d3-shape", "d3-time-format", "d3-transition", "d3-zoom"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3-axis"), require("d3-brush"), require("d3-drag"), require("d3-dsv"), require("d3-ease"), require("d3-hierarchy"), require("d3-interpolate"), require("d3-scale"), require("d3-selection"), require("d3-shape"), require("d3-time-format"), require("d3-transition"), require("d3-zoom")) : factory(root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__13__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__10__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
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

/***/ }),
/* 10 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
// extracted by mini-css-extract-plugin

}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  bb: function() { return /* reexport */ bb; },
  "default": function() { return /* reexport */ bb; }
});

// NAMESPACE OBJECT: ./src/config/resolver/interaction.ts
var resolver_interaction_namespaceObject = {};
__webpack_require__.r(resolver_interaction_namespaceObject);
__webpack_require__.d(resolver_interaction_namespaceObject, {
  selection: function() { return selectionModule; },
  subchart: function() { return subchartModule; },
  zoom: function() { return zoomModule; }
});

// NAMESPACE OBJECT: ./src/config/resolver/shape.ts
var resolver_shape_namespaceObject = {};
__webpack_require__.r(resolver_shape_namespaceObject);
__webpack_require__.d(resolver_shape_namespaceObject, {
  area: function() { return resolver_shape_area; },
  areaLineRange: function() { return areaLineRange; },
  areaSpline: function() { return areaSpline; },
  areaSplineRange: function() { return areaSplineRange; },
  areaStep: function() { return areaStep; },
  areaStepRange: function() { return areaStepRange; },
  bar: function() { return resolver_shape_bar; },
  bubble: function() { return resolver_shape_bubble; },
  candlestick: function() { return resolver_shape_candlestick; },
  donut: function() { return shape_donut; },
  funnel: function() { return resolver_shape_funnel; },
  gauge: function() { return resolver_shape_gauge; },
  line: function() { return resolver_shape_line; },
  pie: function() { return shape_pie; },
  polar: function() { return resolver_shape_polar; },
  radar: function() { return resolver_shape_radar; },
  scatter: function() { return shape_scatter; },
  spline: function() { return shape_spline; },
  step: function() { return step; },
  treemap: function() { return resolver_shape_treemap; }
});

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(2);
// EXTERNAL MODULE: external {"commonjs":"d3-time-format","commonjs2":"d3-time-format","amd":"d3-time-format","root":"d3"}
var external_commonjs_d3_time_format_commonjs2_d3_time_format_amd_d3_time_format_root_d3_ = __webpack_require__(3);
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

;// CONCATENATED MODULE: ./src/config/Options/common/boost.ts
/* harmony default export */ var boost = ({
  /**
   * Set boost options
   * @name boost
   * @memberof Options
   * @type {object}
   * @property {object} boost boost object
   * @property {boolean} [boost.useCssRule=false] Avoid setting inline styles for each shape elements.
   * - **NOTE:**
   *   - Will append &lt;style> to the head tag and will add shpes' CSS rules dynamically.
   *   - For now, covers colors related properties (fill, stroke, etc.) only.
   * @property {boolean} [boost.useWorker=false] Use Web Worker as possible for processing.
   * - **NOTE:**
   *   - For now, only applies for data conversion at the initial time.
   *   - As of Web Worker's async nature, handling chart instance synchrously is not recommended.
   * @example
   *  boost: {
   *      useCssRule: true,
   *      useWorker: false
   *  }
   */
  boost_useCssRule: false,
  boost_useWorker: false
});

;// CONCATENATED MODULE: ./src/config/Options/common/color.ts
/* harmony default export */ var color = ({
  /**
   * Set color of the data values
   * @name color
   * @memberof Options
   * @type {object}
   * @property {object} color color object
   * @property {string|object|Function} [color.onover] Set the color value for each data point when mouse/touch onover event occurs.
   * @property {Array|null} [color.pattern=[]] Set custom color pattern. Passing `null` will not set a color for these elements, which requires the usage of custom CSS-based theming to work.
   * @property {Function} [color.tiles] if defined, allows use svg's patterns to fill data area. It should return an array of [SVGPatternElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGPatternElement).
   *  - **NOTE:** The pattern element's id will be defined as `bb-colorize-pattern-$COLOR-VALUE`.<br>
   *    ex. When color pattern value is `['red', '#fff']` and defined 2 patterns,then ids for pattern elements are:<br>
   *    - `bb-colorize-pattern-red`
   *    - `bb-colorize-pattern-fff`
   * @property {object} [color.threshold] color threshold for gauge and tooltip color
   * @property {string} [color.threshold.unit] If set to `value`, the threshold will be based on the data value. Otherwise it'll be based on equation of the `threshold.max` option value.
   * @property {Array} [color.threshold.values] Threshold values for each steps
   * @property {number} [color.threshold.max=100] The base value to determine threshold step value condition. When the given value is 15 and max 10, then the value for threshold is `15*100/10`.
   * @example
   *  color: {
   *      pattern: ["#1f77b4", "#aec7e8", ...],
   *
   *      // Set colors' patterns
   *      // it should return an array of SVGPatternElement
   *      tiles: function() {
   *         var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
   *         var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
   *         var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
   *
   *         pattern.setAttribute("patternUnits", "userSpaceOnUse");
   *         pattern.setAttribute("width", "32");
   *         pattern.setAttribute("height", "32");
   *
   *         g.style.fill = "#000";
   *         g.style.opacity = "0.2";
   *
   *         circle1.setAttribute("cx", "3");
   *         circle1.setAttribute("cy", "3");
   *         circle1.setAttribute("r", "3");
   *
   *         g.appendChild(circle1);
   *         pattern.appendChild(g);
   *
   *         return [pattern];
   *      },
   *
   *      // for threshold usage, pattern values should be set for each steps
   *      pattern: ["grey", "green", "yellow", "orange", "red"],
   *      threshold: {
   *          unit: "value",
   *
   *          // when value is 20 => 'green', value is 40 => 'orange' will be set.
   *          values: [10, 20, 30, 40, 50],
   *
   *          // the equation for max:
   *          // - unit == 'value': max => 30
   *          // - unit != 'value': max => value*100/30
   *          max: 30
   *      },
   *
   *      // set all data to 'red'
   *      onover: "red",
   *
   *      // set different color for data
   *      onover: {
   *          data1: "red",
   *          data2: "yellow"
   *      },
   *
   *      // will pass data object to the callback
   *      onover: function(d) {
   *          return d.id === "data1" ? "red" : "green";
   *      }
   *  }
   */
  color_pattern: [],
  color_tiles: void 0,
  color_threshold: {},
  color_onover: void 0
});

;// CONCATENATED MODULE: ./src/config/Options/common/legend.ts
/* harmony default export */ var legend = ({
  /**
   * Legend options
   * @name legend
   * @memberof Options
   * @type {object}
   * @property {object} legend Legend object
   * @property {boolean} [legend.show=true] Show or hide legend.
   * @property {boolean} [legend.hide=false] Hide legend
   *  If true given, all legend will be hidden. If string or array given, only the legend that has the id will be hidden.
   * @property {string|HTMLElement} [legend.contents.bindto=undefined] Set CSS selector or element reference to bind legend items.
   * - **NOTE:** Should be used along with `legend.contents.template`.
   * @property {string|Function} [legend.contents.template="<span style='color:#fff;padding:5px;background-color:{=COLOR}'>{=TITLE}</span>"] Set item's template.<br>
   *  - If set `string` value, within template the 'color' and 'title' can be replaced using template-like syntax string:
   *    - {=COLOR}: data color value
   *    - {=TITLE}: data title value
   *  - If set `function` value, will pass following arguments to the given function:
   *   - title {string}: data's id value
   *   - color {string}: color string
   *   - data {Array}: data array
   * @property {string} [legend.position=bottom] Change the position of legend.<br>
   *  Available values are: `bottom`, `right` and `inset` are supported.
   * @property {object} [legend.inset={anchor: 'top-left',x: 10,y: 0,step: undefined}] Change inset legend attributes.<br>
   *  This option accepts object that has the keys `anchor`, `x`, `y` and `step`.
   *  - **anchor** decides the position of the legend:
   *   - top-left
   *   - top-right
   *   - bottom-left
   *   - bottom-right
   *  - **x** and **y**:
   *   - set the position of the legend based on the anchor.
   *  - **step**:
   *   - defines the max step the legend has (e.g. If 2 set and legend has 3 legend item, the legend 2 columns).
   * @property {boolean} [legend.equally=false] Set to all items have same width size.
   * @property {number} [legend.padding=0] Set padding value
   * @property {boolean} [legend.item.interaction=true] Set legend item interaction.
   *  - **NOTE:**
   *    - This setting will not have effect on `.toggle()` method.
   *    - `legend.item.onXXX` listener options will work if set, regardless of this option value.
   * @property {boolean} [legend.item.interaction.dblclick=false] Set legend item to interact on double click.
   *  - **NOTE:**
   *    - Double clicking will make focused clicked dataseries only, hiding all others.
   *      - for single click case, `click + altKey(Win)/optionKey(Mac OS)` to have same effect.
   *    - To return initial state(which all dataseries are showing), double click current focused legend item again.
   *      - for single click case, `click + altKey(Win)/optionKey(Mac OS)` to have same effect.
   *    - In this case, default `click` interaction will be disabled.
   * @property {Function} [legend.item.onclick=undefined] Set click event handler to the legend item.
   *  - **NOTE:**
   *    - When set, default `click` interaction will be disabled.
   *    - When `interaction.dblclick=true` is set, will be called on double click.
   * @property {Function} [legend.item.onover=undefined] Set mouse/touch over event handler to the legend item.
   *  - **NOTE:** When set, default `mouseover` interaction will be disabled.
   * @property {Function} [legend.item.onout=undefined] Set mouse/touch out event handler to the legend item.
   *  - **NOTE:** When set, default `mouseout` interaction will be disabled.
   * @property {number} [legend.item.tile.width=10] Set width for 'rectangle' legend item tile element.
   * @property {number} [legend.item.tile.height=10] Set height for 'rectangle' legend item tile element.
   * @property {number} [legend.item.tile.r=5] Set the radius for 'circle' legend item tile type.
   * @property {string} [legend.item.tile.type="rectangle"] Set legend item shape type.<br>
   * - **Available Values:**
   *   - circle
   *   - rectangle
   * @property {boolean} [legend.format] Set formatter function for legend text.
   * The argument:<br>
   *  - `id`: Legend text value. When `data.names` is specified, will pass from it, otherwise will pass data id.
   *  - `dataId`: When `data.names` specified, will pass the original data id. Otherwise will be undefined.
   * @property {boolean} [legend.tooltip=false] Show full legend text value using system tooltip(via `<title>` element).
   * @property {boolean} [legend.usePoint=false] Whether to use custom points in legend.
   * @see [Demo: format](https://naver.github.io/billboard.js/demo/#Legend.LegendFormat)
   * @see [Demo: item.interaction](https://naver.github.io/billboard.js/demo/#Legend.LegendItemInteraction)
   * @see [Demo: item.tile.type](https://naver.github.io/billboard.js/demo/#Legend.LegendItemTileType)
   * @see [Demo: position](https://naver.github.io/billboard.js/demo/#Legend.LegendPosition)
   * @see [Demo: contents.template](https://naver.github.io/billboard.js/demo/#Legend.LegendTemplate1)
   * @see [Demo: usePoint](https://naver.github.io/billboard.js/demo/#Legend.usePoint)
   * @example
   *  legend: {
   *      show: true,
   *      hide: true,
   *      //or hide: "data1"
   *      //or hide: ["data1", "data2"]
   *      contents: {
   *          bindto: "#legend",   // <ul id='legend'></ul>
   *
   *          // will be as: <li style='background-color:#1f77b4'>data1</li>
   *          template: "<li style='background-color:{=COLOR}'>{=TITLE}</li>"
   *
   *          // or using function
   *          template: function(id, color, data) {
   *               // if you want omit some legend, return falsy value
   *               if (id !== "data1") {
   *                    return "<li style='background-color:"+ color +">"+ id +"</li>";
   *               }
   *          }
   *      },
   *      position: "bottom",  // bottom, right, inset
   *      inset: {
   *          anchor: "top-right"  // top-left, top-right, bottom-left, bottom-right
   *          x: 20,
   *          y: 10,
   *          step: 2
   *      },
   *      equally: false,
   *      padding: 10,
   *      item: {
   *          // will disable default interaction
   *          interaction: false,
   *
   *          // set legend interact on double click
   *          // by double clicking, will make focused clicked dataseries only, hiding all others.
   *          interaction: {
   *            dblclick: true
   *          }
   *
   *          // when set below callback, will disable corresponding default interactions
   *          onclick: function(id) { ... },
   *          onover: function(id) { ... },
   *          onout: function(id) { ... },
   *
   *          // set tile's size
   *          tile: {
   *              // set tile type
   *              type: "circle"  // or "rectangle" (default)
   *
   *              // width & height, are only applicable for 'rectangle' legend type
   *              width: 15,
   *              height: 15
   *
   *              // radis is only applicable for 'circle' legend type
   *              r: 10
   *          }
   *      },
   *      format: function(id, dataId) {
   *          // set ellipsis string when length is > 5
   *          // to get full legend value, combine with 'legend.tooltip=true'
   *          if (id.length > 5) {
   *            	id = id.substr(0, 5) + "...";
   *          }
   *
   *          return id;
   *      },
   *      tooltip: true,
   *      usePoint: true
   *  }
   */
  legend_contents_bindto: void 0,
  legend_contents_template: "<span style='color:#fff;padding:5px;background-color:{=COLOR}'>{=TITLE}</span>",
  legend_equally: false,
  legend_hide: false,
  legend_inset_anchor: "top-left",
  legend_inset_x: 10,
  legend_inset_y: 0,
  legend_inset_step: void 0,
  legend_item_interaction: true,
  legend_item_dblclick: false,
  legend_item_onclick: void 0,
  legend_item_onover: void 0,
  legend_item_onout: void 0,
  legend_item_tile_width: 10,
  legend_item_tile_height: 10,
  legend_item_tile_r: 5,
  legend_item_tile_type: "rectangle",
  legend_format: void 0,
  legend_padding: 0,
  legend_position: "bottom",
  legend_show: true,
  legend_tooltip: false,
  legend_usePoint: false
});

;// CONCATENATED MODULE: ./src/config/Options/common/main.ts
/* harmony default export */ var main = ({
  /**
   * Specify the CSS selector or the element which the chart will be set to. D3 selection object can be specified also.<br>
   * If other chart is set already, it will be replaced with the new one (only one chart can be set in one element).
   * - **NOTE:** In case of element doesn't exist or not specified, will add a `<div>` element to the body.
   * @name bindto
   * @memberof Options
   * @property {string|HTMLElement|d3.selection|object} [bindto="#chart"] Specify the element where chart will be drawn.
   * @property {string|HTMLElement|d3.selection} bindto.element="#chart" Specify the element where chart will be drawn.
   * @property {string} [bindto.classname=bb] Specify the class name of bind element.<br>
   *     **NOTE:** When class name isn't `bb`, then you also need to update the default CSS to be rendered correctly.
   * @default #chart
   * @example
   * bindto: "#myContainer"
   *
   * // or HTMLElement
   * bindto: document.getElementById("myContainer")
   *
   * // or D3 selection object
   * bindto: d3.select("#myContainer")
   *
   * // or to change default classname
   * bindto: {
   *    element: "#chart",
   *    classname: "bill-board"  // ex) <div id='chart' class='bill-board'>
   * }
   */
  bindto: "#chart",
  /**
   * Set chart background.
   * @name background
   * @memberof Options
   * @property {object} background background object
   * @property {string} background.class Specify the class name for background element.
   * @property {string} background.color Specify the fill color for background element.<br>**NOTE:** Will be ignored if `imgUrl` option is set.
   * @property {string} background.imgUrl Specify the image url string for background.
   * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.Background)
   * @example
   * background: {
   *    class: "myClass",
   *    color: "red",
   *
   *    // Set image url for background.
   *    // If specified, 'color' option will be ignored.
   *    imgUrl: "https://naver.github.io/billboard.js/img/logo/billboard.js.svg",
   * }
   */
  background: {},
  /**
   * Set 'clip-path' attribute for chart element
   * - **NOTE:**
   *  > When is false, chart node element is positioned after the axis node in DOM tree hierarchy.
   *  > Is to make chart element positioned over axis element.
   * @name clipPath
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.clipPath)
   * @example
   * // don't set 'clip-path' attribute
   * clipPath: false
   */
  clipPath: true,
  /**
   * Set svg element's class name
   * @name svg
   * @memberof Options
   * @type {object}
   * @property {object} [svg] svg object
   * @property {string} [svg.classname] class name for svg element
   * @example
   * svg: {
   *   classname: "test_class"
   * }
   */
  svg_classname: void 0,
  /**
   * The desired size of the chart element.
   * If value is not specified, the width of the chart will be calculated by the size of the parent element it's appended to.
   * @name size
   * @memberof Options
   * @type {object}
   * @property {object} [size] size object
   * @property {number} [size.width] width of the chart element
   * @property {number} [size.height] height of the chart element
   * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.ChartSize)
   * @example
   * size: {
   *   width: 640,
   *   height: 480
   * }
   */
  size_width: void 0,
  size_height: void 0,
  /**
   * The padding of the chart element.
   * - **NOTE:** for more information, see the "[`Understanding padding`](https://github.com/naver/billboard.js/wiki/Understanding-padding)"" wiki documentaion.
   * @name padding
   * @memberof Options
   * @type {object}
   * @property {object|boolean} [padding=true] Set padding of chart, and accepts object or boolean type.
   * - `Object`: Specify each side's padding.
   * - `false`: Remove padding completely and make shape to fully occupy the container element.
   *   - In this case, axes and subchart will be hidden.
   *   - To adjust some padding from this state, use `axis.[x|y].padding` option.
   * @property {string} [padding.mode] padding mode
   * - `"fit"`: Reduce padding as much as possible to make chart fit to the container element for chart types w/axis.<br>When specified, all padding values will be relative from fitted value.
   * @property {number} [padding.top] padding on the top of chart
   * @property {number} [padding.right] padding on the right of chart
   * @property {number} [padding.bottom] padding on the bottom of chart
   * @property {number} [padding.left] padding on the left of chart
   * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.Padding)
   * @see [Demo: Fit padding](https://naver.github.io/billboard.js/demo/#ChartOptions.FitPadding)
   * @example
   * // remove padding completely.
   * padding: false,
   *
   * padding: {
   *   // specifying mode value, will reduce padding and make fit to the container element.
   *   mode: "fit"
   *
   *   // when mode is "fit", all padding values will be relative from fitted value.
   *   // so, 0 will be initial fitted value.
   *   top: 20,
   *   right: 20,
   *   bottom: 20,
   *   left: 20
   * }
   *
   * // or specify padding value for each side
   * padding: {
   *   top: 20,
   *   right: 20,
   *   bottom: 20,
   *   left: 20
   * }
   */
  padding: true,
  padding_mode: void 0,
  padding_left: void 0,
  padding_right: void 0,
  padding_top: void 0,
  padding_bottom: void 0,
  /**
   * Set chart resize options
   * @name resize
   * @memberof Options
   * @type {object}
   * @property {object} [resize] resize object
   * @property {boolean} [resize.auto=true] Set chart resize automatically on viewport changes.
   * @property {boolean|number} [resize.timer=true] Set resize timer option.
   * - **NOTE:**
   *   - The resize function will be called using:
   *     - true: `setTimeout()`
   *     - false: `requestIdleCallback()`
   *   - Given number(delay in ms) value, resize function will be triggered using `setTimer()` with given delay.
   * @example
   *  resize: {
   *      auto: false,
   *
   *      // set resize function will be triggered using `setTimer()`
   *      timer: true,
   *
   *      // set resize function will be triggered using `requestIdleCallback()`
   *      timer: false,
   *
   *      // set resize function will be triggered using `setTimer()` with a delay of `100ms`.
   *      timer: 100
   *  }
   */
  resize_auto: true,
  resize_timer: true,
  /**
   * Set a callback to execute when the chart is clicked.
   * @name onclick
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * onclick: function(event) {
   *   this; // chart instance itself
   *   event; // native event object
   *   ...
   * }
   */
  onclick: void 0,
  /**
   * Set a callback to execute when mouse/touch enters the chart.
   * @name onover
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * onover: function(event) {
   *   this; // chart instance itself
   *   event; // native event object
   *   ...
   * }
   */
  onover: void 0,
  /**
   * Set a callback to execute when mouse/touch leaves the chart.
   * @name onout
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * onout: function(event) {
   *   this; // chart instance itself
   *   event; // native event object
   *   ...
   * }
   */
  onout: void 0,
  /**
   * Set a callback to execute when user resizes the screen.
   * @name onresize
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * onresize: function() {
   *   this; // chart instance itself
   *   ...
   * }
   */
  onresize: void 0,
  /**
   * Set a callback to execute when screen resize finished.
   * @name onresized
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * onresized: function() {
   *   this; // chart instance itself
   *   ...
   * }
   */
  onresized: void 0,
  /**
   * Set a callback to execute before the chart is initialized
   * @name onbeforeinit
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * onbeforeinit: function() {
   *   this; // chart instance itself
   *   ...
   * }
   */
  onbeforeinit: void 0,
  /**
   * Set a callback to execute when the chart is initialized.
   * @name oninit
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * oninit: function() {
   *   this; // chart instance itself
   *   ...
   * }
   */
  oninit: void 0,
  /**
   * Set a callback to execute after the chart is initialized
   * @name onafterinit
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * onafterinit: function() {
   *   this; // chart instance itself
   *   ...
   * }
   */
  onafterinit: void 0,
  /**
   * Set a callback which is executed when the chart is rendered. Basically, this callback will be called in each time when the chart is redrawed.
   * @name onrendered
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * onrendered: function() {
   *   this; // chart instance itself
   *   ...
   * }
   */
  onrendered: void 0,
  /**
   * Set duration of transition (in milliseconds) for chart animation.<br><br>
   * - **NOTE:** If `0 `or `null` set, transition will be skipped. So, this makes initial rendering faster especially in case you have a lot of data.
   * @name transition
   * @memberof Options
   * @type {object}
   * @property {object} [transition] transition object
   * @property {number} [transition.duration=350] duration in milliseconds
   * @example
   * transition: {
   *    duration: 500
   * }
   */
  transition_duration: 250,
  /**
   * Set plugins
   * @name plugins
   * @memberof Options
   * @type {Array}
   * @example
   *  plugins: [
   *    new bb.plugin.stanford({ ... }),
   *    new PluginA(),
   *    ...
   * ]
   */
  plugins: [],
  /**
   * Control the render timing
   * @name render
   * @memberof Options
   * @type {object}
   * @property {object} [render] render object
   * @property {boolean} [render.lazy=true] Make to not render at initialization (enabled by default when bind element's visibility is hidden).
   * @property {boolean} [render.observe=true] Observe bind element's visibility(`display` or `visiblity` inline css property or class value) & render when is visible automatically (for IEs, only works IE11+). When set to **false**, call [`.flush()`](./Chart.html#flush) to render.
   * @see [Demo](https://naver.github.io/billboard.js/demo/#ChartOptions.LazyRender)
   * @example
   *  render: {
   *    lazy: true,
   *    observe: true
   * }
   *
   * @example
   * 	// <!-- render.lazy will detect visibility defined -->
   *  // (a) <div id='chart' class='hide'></div>
   *  // (b) <div id='chart' style='display:none'></div>
   *
   *  // render.lazy enabled by default when element is hidden
   *  var chart = bb.generate({ ... });
   *
   *  // chart will be rendered automatically when element's visibility changes
   *  // Note: works only for inlined css property or class attribute changes
   *  document.getElementById('chart').classList.remove('hide')  // (a)
   *  document.getElementById('chart').style.display = 'block';  // (b)
   *
   * @example
   * 	// chart won't be rendered and not observing bind element's visiblity changes
   *  var chart = bb.generate({
   *     render: {
   *          lazy: true,
   *          observe: false
   *     }
   *  });
   *
   *  // call at any point when you want to render
   *  chart.flush();
   */
  render: {},
  /**
   * Show rectangles inside the chart.<br><br>
   * This option accepts array including object that has axis, start, end and class.
   * The keys start, end and class are optional.
   * axis must be x, y or y2. start and end should be the value where regions start and end.
   * If not specified, the edge values will be used.
   * If timeseries x axis, date string, Date object and unixtime integer can be used.
   * If class is set, the region element will have it as class.
   * @name regions
   * @memberof Options
   * @type {Array}
   * @default []
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Region.RegionLabel)
   * @example
   *  regions: [
   *    {
   *      axis: "x",
   *      start: 1,
   *      end: 4,
   *      class: "region-1-4",
   *      label: {
   *      	text: "Region Text",
   *      	x: 5,  // position relative of the initial x coordinate
   *      	y: 5,  // position relative of the initial y coordinate
   *      	color: "red",  // color string
   *      	rotated: true  // make text to show in vertical or horizontal
   *      }
   *    }
   *  ]
   */
  regions: []
});

;// CONCATENATED MODULE: ./src/config/Options/common/title.ts
/* harmony default export */ var title = ({
  /**
   * Set title options
   * @name title
   * @memberof Options
   * @type {object}
   * @property {object} title Title object
   * @property {string} [title.text] Title text. If contains `\n`, it's used as line break allowing multiline title.
   * @property {number} [title.padding.top=0] Top padding value.
   * @property {number} [title.padding.right=0] Right padding value.
   * @property {number} [title.padding.bottom=0] Bottom padding value.
   * @property {number} [title.padding.left=0] Left padding value.
   * @property {string} [title.position=center] Available values are: 'center', 'right' and 'left'.
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Title.MultilinedTitle)
   * @example
   *  title: {
   *      text: "Title Text",
   *
   *      // or Multiline title text
   *      text: "Main title text\nSub title text",
   *
   *      padding: {
   *          top: 10,
   *          right: 10,
   *          bottom: 10,
   *          left: 10
   *      },
   *      position: "center"
   *  }
   */
  title_text: void 0,
  title_padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  title_position: "center"
});

;// CONCATENATED MODULE: ./src/config/Options/common/tooltip.ts
/* harmony default export */ var tooltip = ({
  /**
   * Tooltip options
   * @name tooltip
   * @memberof Options
   * @type {object}
   * @property {object} tooltip Tooltip object
   * @property {boolean} [tooltip.show=true] Show or hide tooltip.
   * @property {boolean} [tooltip.doNotHide=false] Make tooltip keep showing not hiding on interaction.
   * @property {boolean} [tooltip.grouped=true] Set if tooltip is grouped or not for the data points.
   *   - **NOTE:** The overlapped data points will be displayed as grouped even if set false.
   * @property {boolean} [tooltip.linked=false] Set if tooltips on all visible charts with like x points are shown together when one is shown.
   * @property {string} [tooltip.linked.name=""] Groping name for linked tooltip.<br>If specified, linked tooltip will be groped interacting to be worked only with the same name.
   * @property {Function} [tooltip.format.title] Set format for the title of tooltip.<br>
   *  Specified function receives x of the data point to show.
   * @property {Function} [tooltip.format.name] Set format for the name of each data in tooltip.<br>
   *  Specified function receives name, ratio, id and index of the data point to show. ratio will be undefined if the chart is not donut/pie/gauge.
   * @property {Function} [tooltip.format.value] Set format for the value of each data value in tooltip. If undefined returned, the row of that value will be skipped to be called.
   *  - Will pass following arguments to the given function:
   *    - `value {string}`: Value of the data point. If data row contains multiple or ranged(ex. candlestick, area range, etc.) value, formatter will be called as value length.
   *    - `ratio {number}`: Ratio of the data point in the `pie/donut/gauge` and `area/bar` when contains grouped data. Otherwise is `undefined`.
   *    - `id {string}`: id of the data point
   *    - `index {number}`: Index of the data point
   * @property {Function} [tooltip.position] Set custom position function for the tooltip.<br>
   *  This option can be used to modify the tooltip position by returning object that has top and left.
   *  - Will pass following arguments to the given function:
   *    - `data {Array}`: Current selected data array object.
   *    - `width {number}`: Width of tooltip.
   *    - `height {number}`: Height of tooltip.
   *    - `element {SVGElement}`: Tooltip event bound element
   *    - `pos {object}`: Current position of the tooltip.
   * @property {Function|object} [tooltip.contents] Set custom HTML for the tooltip.<br>
   *  If tooltip.grouped is true, data includes multiple data points.<br><br>
   *  Specified function receives `data` array and `defaultTitleFormat`, `defaultValueFormat` and `color` functions of the data point to show.
   *  - **Note:**
   *    - defaultTitleFormat:
   *      - if `axis.x.tick.format` option will be used if set.
   *      - otherwise, will return function based on tick format type(category, timeseries).
   *    - defaultValueFormat:
   * 	    - for Arc type (except gauge, radar), the function will return value from `(ratio * 100).toFixed(1)`.
   * 	    - for Axis based types, will be used `axis.[y|y2].tick.format` option value if is set.
   * 	    - otherwise, will parse value and return as number.
   * @property {string|HTMLElement} [tooltip.contents.bindto=undefined] Set CSS selector or element reference to bind tooltip.
   *  - **NOTE:** When is specified, will not be updating tooltip's position.
   * @property {string} [tooltip.contents.template=undefined] Set tooltip's template.<br><br>
   *  Within template, below syntax will be replaced using template-like syntax string:
   *    - **{{ ... }}**: the doubly curly brackets indicate loop block for data rows.
   *    - **{=CLASS_TOOLTIP}**: default tooltip class name `bb-tooltip`.
   *    - **{=CLASS_TOOLTIP_NAME}**: default tooltip data class name (ex. `bb-tooltip-name-data1`)
   *    - **{=TITLE}**: title value.
   *    - **{=COLOR}**: data color.
   *    - **{=NAME}**: data id value.
   *    - **{=VALUE}**: data value.
   * @property {object} [tooltip.contents.text=undefined] Set additional text content within data loop, using template syntax.
   *  - **NOTE:** It should contain `{ key: Array, ... }` value
   *    - 'key' name is used as substitution within template as '{=KEY}'
   *    - The value array length should match with the data length
   * @property {boolean} [tooltip.init.show=false] Show tooltip at the initialization.
   * @property {number} [tooltip.init.x=0] Set x Axis index(or index for Arc(donut, gauge, pie) types) to be shown at the initialization.
   * @property {object} [tooltip.init.position] Set the position of tooltip at the initialization.
   * @property {Function} [tooltip.onshow] Set a callback that will be invoked before the tooltip is shown.
   * @property {Function} [tooltip.onhide] Set a callback that will be invoked before the tooltip is hidden.
   * @property {Function} [tooltip.onshown] Set a callback that will be invoked after the tooltip is shown
   * @property {Function} [tooltip.onhidden] Set a callback that will be invoked after the tooltip is hidden.
   * @property {string|Function|null} [tooltip.order=null] Set tooltip data display order.<br><br>
   *  **Available Values:**
   *  - `desc`: In descending data value order
   *  - `asc`: In ascending data value order
   *  - `null`: It keeps the data display order<br>
   *     **NOTE:** When `data.groups` is set, the order will follow as the stacked graph order.<br>
   *      If want to order as data bound, set any value rather than asc, desc or null. (ex. empty string "")
   *  - `function(data1, data2) { ... }`: [Array.sort compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)
   * @see [Demo: Hide Tooltip](https://naver.github.io/billboard.js/demo/#Tooltip.HideTooltip)
   * @see [Demo: Tooltip Grouping](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipGrouping)
   * @see [Demo: Tooltip Format](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipFormat)
   * @see [Demo: Linked Tooltip](https://naver.github.io/billboard.js/demo/#Tooltip.LinkedTooltips)
   * @see [Demo: Tooltip Position](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipPosition)
   * @see [Demo: Tooltip Template](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipTemplate)
   * @example
   *  tooltip: {
   *      show: true,
   *      doNotHide: true,
   *      grouped: false,
   *      format: {
   *          title: function(x) { return "Data " + x; },
   *          name: function(name, ratio, id, index) { return name; },
   *
   *          // If data row contains multiple or ranged(ex. candlestick, area range, etc.) value,
   *          // formatter will be called as value length times.
   *          value: function(value, ratio, id, index) { return ratio; }
   *      },
   *      position: function(data, width, height, element, pos) {
   *          // data: [{x, index, id, name, value}, ...]
   *          // width: Tooltip width
   *          // height: Tooltip height
   *          // element: Tooltip event bound element
   *          // pos: {
   *          //   x: Current mouse event x position,
   *          //   y: Current mouse event y position,
   *          //   xAxis: Current x Axis position (the value is given for axis based chart type only)
   *          //   yAxis: Current y Axis position value or function(the value is given for axis based chart type only)
   *          // }
   *
   *          // yAxis will work differently per data lenghts
   *          // - a) Single data: `yAxis` will return `number` value
   *          // - b) Multiple data: `yAxis` will return a function with property value
   *
   *          // a) Single data:
   *          // Get y coordinate
   *          pos.yAxis; // y axis coordinate value of current data point
   *
   *          // b) Multiple data:
   *          // Get y coordinate of value 500, where 'data1' scales(y or y2).
   *          // When 'data.axes' option is used, data can bound to different axes.
   *          // - when "data.axes={data1: 'y'}", wil return y value from y axis scale.
   *          // - when "data.axes={data1: 'y2'}", wil return y value from y2 axis scale.
   *          pos.yAxis(500, "data1"); // will return y coordinate value of data1
   *
   *          pos.yAxis(500); // get y coordinate with value of 500, using y axis scale
   *          pos.yAxis(500, null, "y2"); // get y coordinate with value of 500, using y2 axis scale
   *
   *          return {
   *            top: 0,
   *            left: 0
   *          }
   *      },
   *
   *      contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
   *          return ... // formatted html as you want
   *      },
   *
   *       // specify tooltip contents using template
   *       // - example of HTML returned:
   *       // <ul class="bb-tooltip">
   *       //   <li class="bb-tooltip-name-data1"><span>250</span><br><span style="color:#00c73c">data1</span></li>
   *       //   <li class="bb-tooltip-name-data2"><span>50</span><br><span style="color:#fa7171">data2</span></li>
   *       // </ul>
   *       contents: {
   *      	bindto: "#tooltip",
   *      	template: '<ul class={=CLASS_TOOLTIP}>{{' +
   *      			'<li class="{=CLASS_TOOLTIP_NAME}"><span>{=VALUE}</span><br>' +
   *      			'<span style=color:{=COLOR}>{=NAME}</span></li>' +
   *      		'}}</ul>'
   *      }
   *
   *       // with additional text value
   *       // - example of HTML returned:
   *       // <ul class="bb-tooltip">
   *       //   <li class="bb-tooltip-name-data1"><span>250</span><br>comment1<span style="color:#00c73c">data1</span>text1</li>
   *       //   <li class="bb-tooltip-name-data2"><span>50</span><br>comment2<span style="color:#fa7171">data2</span>text2</li>
   *       // </ul>
   *       contents: {
   *      	bindto: "#tooltip",
   *      	text: {
   *      		// a) 'key' name is used as substitution within template as '{=KEY}'
   *      		// b) the length should match with the data length
   *      		VAR1: ["text1", "text2"],
   *      		VAR2: ["comment1", "comment2"],
   *      	},
   *      	template: '<ul class={=CLASS_TOOLTIP}>{{' +
   *      			'<li class="{=CLASS_TOOLTIP_NAME}"><span>{=VALUE}</span>{=VAR2}<br>' +
   *      			'<span style=color:{=COLOR}>{=NAME}</span>{=VAR1}</li>' +
   *      		'}}</ul>'
   *      }
   *
   *      // sort tooltip data value display in ascending order
   *      order: "asc",
   *
   *      // specifying sort function
   *      order: function(a, b) {
   *         // param data passed format
   *         {x: 5, value: 250, id: "data1", index: 5, name: "data1"}
   *           ...
   *      },
   *
   *      // show at the initialization
   *      init: {
   *          show: true,
   *          x: 2, // x Axis index (or index for Arc(donut, gauge, pie) types)
   *          position: {
   *              top: "150px",  // specify as number or as string with 'px' unit string
   *              left: 250  // specify as number or as string with 'px' unit string
   *          }
   *      },
   *
   *      // fires prior tooltip is shown
   *      onshow: function(selectedData) {
   *      	// current dataset selected
   *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
   *      	selectedData;
   *      },
   *
   *      // fires prior tooltip is hidden
   *      onhide: function(selectedData) {
   *      	// current dataset selected
   *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
   *      	selectedData;
   *      },
   *
   *      // fires after tooltip is shown
   *      onshown: function(selectedData) {
   *      	// current dataset selected
   *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
   *      	selectedData;
   *      },
   *
   *      // fires after tooltip is hidden
   *      onhidden: function(selectedData) {
   *      	// current dataset selected
   *      	// ==> [{x: 4, value: 150, id: "data2", index: 4, name: "data2"}, ...]
   *      	selectedData;
   *      },
   *
   *      // Link any tooltips when multiple charts are on the screen where same x coordinates are available
   *      // Useful for timeseries correlation
   *      linked: true,
   *
   *      // Specify name to interact those with the same name only.
   *      linked: {
   *          name: "some-group"
   *      }
   *  }
   */
  tooltip_show: true,
  tooltip_doNotHide: false,
  tooltip_grouped: true,
  tooltip_format_title: void 0,
  tooltip_format_name: void 0,
  tooltip_format_value: void 0,
  tooltip_position: void 0,
  tooltip_contents: {},
  tooltip_init_show: false,
  tooltip_init_x: 0,
  tooltip_init_position: void 0,
  tooltip_linked: false,
  tooltip_linked_name: "",
  tooltip_onshow: () => {
  },
  tooltip_onhide: () => {
  },
  tooltip_onshown: () => {
  },
  tooltip_onhidden: () => {
  },
  tooltip_order: null
});

;// CONCATENATED MODULE: ./src/config/Options/data/data.ts
/* harmony default export */ var data = ({
  /**
   * Specify the key of x values in the data.<br><br>
   * We can show the data with non-index x values by this option. This option is required when the type of x axis is timeseries. If this option is set on category axis, the values of the data on the key will be used for category names.
   * @name data․x
   * @memberof Options
   * @type {string}
   * @default undefined
   * @example
   * data: {
   *   x: "date"
   * }
   */
  data_x: void 0,
  /**
   * Converts data id value
   * @name data․idConverter
   * @memberof Options
   * @type {Function}
   * @default function(id) { return id; }
   * @example
   * data: {
   *    idConverter: function(id) {
   *       // when id is 'data1', converts to be 'data2'
   *       // 'data2' should be given as the initial data value
   *       if (id === "data1") {
   *          return "data2";
   *       } else {
   *          return id;
   *       }
   *    }
   * }
   */
  data_idConverter: (id) => id,
  /**
   * Set custom data name.
   * If a name is set to `null`, the series is omitted from the legend.
   * @name data․names
   * @memberof Options
   * @type {object}
   * @default {}
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataName)
   * @example
   * data: {
   *   names: {
   *     data1: "Data Name 1",
   *     data2: "Data Name 2"
   *   }
   * }
   */
  data_names: {},
  /**
   * Set custom data class.<br><br>
   * If this option is specified, the element g for the data has an additional class that has the prefix 'bb-target-' (eg. bb-target-additional-data1-class).
   * @name data․classes
   * @memberof Options
   * @type {object}
   * @default {}
   * @example
   * data: {
   *   classes: {
   *     data1: "additional-data1-class",
   *     data2: "additional-data2-class"
   *   }
   * }
   */
  data_classes: {},
  /**
   * Set chart type at once.<br><br>
   * If this option is specified, the type will be applied to every data. This setting can be overwritten by data.types.<br><br>
   * **Available Values:**
   * - area
   * - area-line-range
   * - area-spline
   * - area-spline-range
   * - area-step
   * - area-step-range
   * - bar
   * - bubble
   * - candlestick
   * - donut
   * - funnel
   * - gauge
   * - line
   * - pie
   * - polar
   * - radar
   * - scatter
   * - spline
   * - step
   * - treemap
   * @name data․type
   * @memberof Options
   * @type {string}
   * @default "line"<br>NOTE: When importing shapes by ESM, `line()` should be specified for type.
   * @example
   * data: {
   *    type: "bar"
   * }
   * @example
   * // Generate chart by importing ESM
   * // Import types to be used only, where this will make smaller bundle size.
   * import bb, {
   *   area,
   *   areaLineRange,
   *   areaSpline,
   *   areaSplineRange,
   *   areaStep,
   *   areaStepRange,
   *   bar,
   *   bubble,
   *   candlestick,
   *   donut,
   *   funnel,
   *   gauge,
   *   line,
   *   pie,
   *   polar,
   *   radar,
   *   scatter,
   *   spline,
   *   step,
   *   treemap
   * }
   *
   * bb.generate({
   *   ...,
   *   data: {
   *     type: bar()
   *   }
   * });
   */
  data_type: void 0,
  /**
   * Set chart type for each data.<br>
   * This setting overwrites data.type setting.
   * - **NOTE:** `radar` and `treemap` type can't be combined with other types.
   * @name data․types
   * @memberof Options
   * @type {object}
   * @default {}
   * @example
   * data: {
   *   types: {
   *     data1: "bar",
   *     data2: "spline"
   *   }
   * }
   * @example
   * // Generate chart by importing ESM
   * // Import types to be used only, where this will make smaller bundle size.
   * import bb, {
   *   area,
   *   areaLineRange,
   *   areaSpline,
   *   areaSplineRange,
   *   areaStep,
   *   areaStepRange,
   *   bar,
   *   bubble,
   *   candlestick,
   *   donut,
   *   funnel,
   *   gauge,
   *   line,
   *   pie,
   *   polar,
   *   radar,
   *   scatter,
   *   spline,
   *   step,
   *   treemap
   * }
   *
   * bb.generate({
   *   ...,
   *   data: {
   *     types: {
   *       data1: bar(),
   *       data1: spline()
   *     }
   *   }
   * });
   */
  data_types: {},
  /**
   *  This option changes the order of stacking data and pieces of pie/donut.
   *  - If `null` specified, it will be the order the data loaded.
   *  - If function specified, it will be used as [Array.sort compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters)<br><br>
   *
   *  **Available Values:**
   *  - `desc`: In descending order
   *  - `asc`: In ascending order
   *  - `null`: It keeps the data load order
   *  - `function(data1, data2) { ... }`: Array.sort compareFunction
   *
   *  **NOTE**: order function, only works for Axis based types & Arc types, except `Radar` type.
   * @name data․order
   * @memberof Options
   * @type {string|Function|null}
   * @default desc
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataOrder)
   * @example
   * data: {
   *   // in descending order (default)
   *   order: "desc"
   *
   *   // in ascending order
   *   order: "asc"
   *
   *   // keeps data input order
   *   order: null
   *
   *   // specifying sort function
   *   order: function(a, b) {
   *       // param data passed format
   *       // {
   *       //   id: "data1", id_org: "data1", values: [
   *       //      {x: 5, value: 250, id: "data1", index: 5, name: "data1"},
   *       //       ...
   *       //   ]
   *       // }
   *
   *       const reducer = (p, c) => p + Math.abs(c.value);
   *       const aSum = a.values.reduce(reducer, 0);
   *       const bSum = b.values.reduce(reducer, 0);
   *
   *       // ascending order
   *       return aSum - bSum;
   *
   *       // descending order
   *       // return bSum - aSum;
   *   }
   * }
   */
  data_order: "desc",
  /**
   * Set groups for the data for stacking.
   * @name data․groups
   * @memberof Options
   * @type {Array}
   * @default []
   * @example
   * data: {
   *   groups: [
   *     ["data1", "data2"],
   *     ["data3"]
   *   ]
   * }
   */
  data_groups: [],
  /**
   * Set how zero value will be treated on groups.<br>
   * Possible values:
   * - `zero`: 0 will be positioned at absolute axis zero point.
   * - `positive`: 0 will be positioned at the top of a stack.
   * - `negative`: 0 will be positioned at the bottom of a stack.
   * @name data․groupsZeroAs
   * @memberof Options
   * @type {string}
   * @default "positive"
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.Groups)
   * @example
   * data: {
   *   groupsZeroAs: "zero" // "positive" or "negative"
   * }
   */
  data_groupsZeroAs: "positive",
  /**
   * Set color converter function.<br><br>
   * This option should a function and the specified function receives color (e.g. '#ff0000') and d that has data parameters like id, value, index, etc. And it must return a string that represents color (e.g. '#00ff00').
   * @name data․color
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataColor)
   * @example
   * data: {
   *   color: function(color, d) { ... }
   * }
   */
  data_color: void 0,
  /**
   * Set color for each data.
   * @name data․colors
   * @memberof Options
   * @type {object}
   * @default {}
   * @example
   * data: {
   *   colors: {
   *     data1: "#ff0000",
   *     data2: function(d) {
   *        return "#000";
   *     }
   *     ...
   *   }
   * }
   */
  data_colors: {},
  /**
   * Set labels options
   * @name data․labels
   * @memberof Options
   * @type {object}
   * @property {object} data Data object
   * @property {boolean} [data.labels=false] Show or hide labels on each data points
   * @property {boolean} [data.labels.centered=false] Centerize labels on `bar` shape. (**NOTE:** works only for 'bar' type)
   * @property {Function} [data.labels.format] Set formatter function for data labels.<br>
   * The formatter function receives 4 arguments such as `v, id, i, texts` and it **must return a string** (`\n` character will be used as line break) that will be shown as the label.<br><br>
   * The arguments are:<br>
   *  - `v` is the value of the data point where the label is shown.
   *  - `id` is the id of the data where the label is shown.
   *  - `i` is the index of the data series point where the label is shown.
   *  - `texts` is the array of whole corresponding data series' text labels.<br><br>
   * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (ex. d3.format('$'))
   * @property {string|object} [data.labels.backgroundColors] Set label text background colors.
   * @property {string|object|Function} [data.labels.colors] Set label text colors.
   * @property {object|Function} [data.labels.position] Set each dataset position, relative the original.<br><br>
   * When function is specified, will receives 5 arguments such as `type, v, id, i, texts` and it must return a position number.<br><br>
   * The arguments are:<br>
   *  - `type` coordinate type string, which will be 'x' or 'y'.
   *  - `v` is the value of the data point where the label is shown.
   *  - `id` is the id of the data where the label is shown.
   *  - `i` is the index of the data series point where the label is shown.
   *  - `texts` is the array of whole corresponding data series' text labels.<br><br>
   * @property {number} [data.labels.position.x=0] x coordinate position, relative the original.
   * @property {number} [data.labels.position.y=0] y coordinate position, relative the original.
   * @property {object} [data.labels.rotate] Rotate label text. Specify degree value in a range of `0 ~ 360`.
   * - **NOTE:** Depend on rotate value, text position need to be adjusted manually(using `data.labels.position` option) to be shown nicely.
   * @memberof Options
   * @type {object}
   * @default {}
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataLabel)
   * @see [Demo: label colors](https://naver.github.io/billboard.js/demo/#Data.DataLabelColors)
   * @see [Demo: label format](https://naver.github.io/billboard.js/demo/#Data.DataLabelFormat)
   * @see [Demo: label multiline](https://naver.github.io/billboard.js/demo/#Data.DataLabelMultiline)
   * @see [Demo: label overlap](https://naver.github.io/billboard.js/demo/#Data.DataLabelOverlap)
   * @see [Demo: label position](https://naver.github.io/billboard.js/demo/#Data.DataLabelPosition)
   * @see [Demo: label rotate](https://naver.github.io/billboard.js/demo/#Data.DataLabelRotate)
   * @example
   * data: {
   *   labels: true,
   *
   *   // or set specific options
   *   labels: {
   *     format: function(v, id, i, texts) {
   *         ...
   *         // to multiline, return with '\n' character
   *         return "Line1\nLine2";
   *     },
   *
   *     // it's possible to set for each data
   *     format: {
   *         data1: function(v, id, i, texts) { ... },
   *         ...
   *     },
   *
   *     // align text to center of the 'bar' shape (works only for 'bar' type)
   *     centered: true,
   *
   *     // apply backgound color for label texts
   *     backgroundColors: "red",
   *
   *     // set differenct backround colors per dataset
   *     backgroundColors: {
   *          data1: "green",
   *          data2: "yellow"
   *     }
   *
   *     // apply for all label texts
   *     colors: "red",
   *
   *     // set different colors per dataset
   *     // for not specified dataset, will have the default color value
   *     colors: {
   *        data1: "yellow",
   *        data3: "green"
   *     },
   *
   *     // call back for label text color
   *     colors: function(color, d) {
   *         // color: the default data label color string
   *         // data: ex) {x: 0, value: 200, id: "data3", index: 0}
   *         ....
   *         return d.value > 200 ? "cyan" : color;
   *     },
   *
   *     // return x, y coordinate position
   *     // apt to handle each text position manually
   *     position: function(type, v, id, i, texts) {
   *         ...
   *         return type == "x" ? 10 : 20;
   *     },
   *
   *     // set x, y coordinate position
   *     position: {
   *        x: -10,
   *        y: 10
   *     },
   *
   *     // or set x, y coordinate position by each dataset
   *     position: {
   *        data1: {x: 5, y: 5},
   *        data2: {x: 10, y: -20}
   *     },
   *
   * 	   // rotate degree for label text
   *     rotate: 90
   *   }
   * }
   */
  data_labels: {},
  data_labels_backgroundColors: void 0,
  data_labels_colors: void 0,
  data_labels_position: {},
  /**
   * Hide each data when the chart appears.<br><br>
   * If true specified, all of data will be hidden. If multiple ids specified as an array, those will be hidden.
   * @name data․hide
   * @memberof Options
   * @type {boolean|Array}
   * @default false
   * @example
   * data: {
   *   // all of data will be hidden
   *   hide: true
   *
   *   // specified data will be hidden
   *   hide: ["data1", ...]
   * }
   */
  data_hide: false,
  /**
   * Filter values to be shown
   * The data value is the same as the returned by `.data()`.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
   * @name data․filter
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * data: {
   *   // filter for id value
   *   filter: function(v) {
   *      // v: [{id: "data1", id_org: "data1", values: [
   *      //      {x: 0, value: 130, id: "data2", index: 0}, ...]
   *      //    }, ...]
   *      return v.id !== "data1";
   *   }
   */
  data_filter: void 0,
  /**
   * Set a callback for click event on each data point.<br><br>
   * This callback will be called when each data point clicked and will receive `d` and element as the arguments.
   * - `d` is the data clicked and element is the element clicked.
   * - `element` is the current interacting svg element.
   * - In this callback, `this` will be the Chart object.
   * @name data․onclick
   * @memberof Options
   * @type {Function}
   * @default function() {}
   * @example
   * data: {
   *     onclick: function(d, element) {
   *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
   *        // element - <circle>
   *        ...
   *     }
   * }
   */
  data_onclick: () => {
  },
  /**
   * Set a callback for mouse/touch over event on each data point.<br><br>
   * This callback will be called when mouse cursor or via touch moves onto each data point and will receive `d` and `element` as the argument.
   * - `d` is the data where mouse cursor moves onto.
   * - `element` is the current interacting svg element.
   * - In this callback, `this` will be the Chart object.
   * @name data․onover
   * @memberof Options
   * @type {Function}
   * @default function() {}
   * @example
   * data: {
   *     onover: function(d, element) {
   *        // d - ex) {x: 4, value: 150, id: "data1", index: 4}
   *        // element - <circle>
   *        ...
   *     }
   * }
   */
  data_onover: () => {
  },
  /**
   * Set a callback for mouse/touch out event on each data point.<br><br>
   * This callback will be called when mouse cursor or via touch moves out each data point and will receive `d` as the argument.
   * - `d` is the data where mouse cursor moves out.
   * - `element` is the current interacting svg element.
   * - In this callback, `this` will be the Chart object.
   * @name data․onout
   * @memberof Options
   * @type {Function}
   * @default function() {}
   * @example
   * data: {
   *     onout: function(d, element) {
   *        // d - ex) {x: 4, value: 150, id: "data1", index: 4}
   *        // element - <circle>
   *        ...
   *     }
   * }
   */
  data_onout: () => {
  },
  /**
   * Set a callback for when data is shown.<br>
   * The callback will receive shown data ids in array.
   * @name data․onshown
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   *  data: {
   *    onshown: function(ids) {
   *      // ids - ["data1", "data2", ...]
   *      ...
   *    }
   *  }
   */
  data_onshown: void 0,
  /**
   * Set a callback for when data is hidden.<br>
   * The callback will receive hidden data ids in array.
   * @name data․onhidden
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   *  data: {
   *    onhidden: function(ids) {
   *      // ids - ["data1", "data2", ...]
   *      ...
   *    }
   *  }
   */
  data_onhidden: void 0,
  /**
   * Set a callback for minimum data
   * - **NOTE:** For 'area-line-range', 'area-step-range' and 'area-spline-range', `mid` data will be taken for the comparison
   * @name data․onmin
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.OnMinMaxCallback)
   * @example
   *  onmin: function(data) {
   *    // data - ex) [{x: 3, value: 400, id: "data1", index: 3}, ... ]
   *    ...
   *  }
   */
  data_onmin: void 0,
  /**
   * Set a callback for maximum data
   * - **NOTE:** For 'area-line-range', 'area-step-range' and 'area-spline-range', `mid` data will be taken for the comparison
   * @name data․onmax
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.OnMinMaxCallback)
   * @example
   *  onmax: function(data) {
   *    // data - ex) [{x: 3, value: 400, id: "data1", index: 3}, ... ]
   *    ...
   *  }
   */
  data_onmax: void 0,
  /**
   * Load a CSV or JSON file from a URL. NOTE that this will not work if loading via the "file://" protocol as the most browsers will block XMLHTTPRequests.
   * @name data․url
   * @memberof Options
   * @type {string}
   * @default undefined
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.LoadData)
   * @example
   * data: {
   *     url: "/data/test.csv"
   * }
   */
  data_url: void 0,
  /**
   * XHR header value
   * - **NOTE:** Should be used with `data.url` option
   * @name data․headers
   * @memberof Options
   * @type {string}
   * @default undefined
   * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
   * @example
   * data: {
   *     url: "/data/test.csv",
   *     headers: {
   *        "Content-Type": "text/xml",
   *        ...
   *     }
   * }
   */
  data_headers: void 0,
  /**
   * Parse a JSON object for data. See also data.keys.
   * @name data․json
   * @memberof Options
   * @type {Array}
   * @default undefined
   * @see [data․keys](#.data%25E2%2580%25A4keys)
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.JSONData)
   * @example
   * data: {
   *     json: [
   *       {name: "www.site1.com", upload: 200, download: 200, total: 400},
   *       {name: "www.site2.com", upload: 100, download: 300, total: 400},
   *       {name: "www.site3.com", upload: 300, download: 200, total: 500},
   *       {name: "www.site4.com", upload: 400, download: 100, total: 500}
   *     ],
   *     keys: {
   *       // case 1: specify 'x' key for category axis
   *       x: "name", // 'name' key will be used as category x axis values
   *       value: ["upload", "download"]
   *
   *       // case 2: without 'x' key for non-category axis
   *       value: ["upload", "download"]
   *     }
   * }
   */
  data_json: void 0,
  /**
   * Load data from a multidimensional array, with the first element containing the data names, the following containing related data in that order.
   * @name data․rows
   * @memberof Options
   * @type {Array}
   * @default undefined
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.RowOrientedData)
   * @example
   * data: {
   *   rows: [
   *     ["A", "B", "C"],
   *     [90, 120, 300],
   *     [40, 160, 240],
   *     [50, 200, 290],
   *     [120, 160, 230],
   *     [80, 130, 300],
   *     [90, 220, 320]
   *   ]
   * }
   *
   * // for 'bar' type, data can contain:
   * // - an array of [start, end] data following the order
   * data: {
   *   rows: [
   *      ["data1", "data2"],
   *      [[100, 150], 120],
   *      [[200, 300], 55],
   *      [[-400, 500], 60]
   *   ],
   *   type: "bar"
   * }
   *
   * // for 'range' types('area-line-range' or 'area-step-range' or 'area-spline-range'), data should contain:
   * // - an array of [high, mid, low] data following the order
   * // - or an object with 'high', 'mid' and 'low' key value
   * data: {
   *   rows: [
   *      ["data1", "data2"],
   *      [
   *        // or {high:150, mid: 140, low: 110}, 120
   *        [150, 140, 110], 120
   *      ],
   *      [[155, 130, 115], 55],
   *      [[160, 135, 120], 60]
   *   ],
   *   types: {
   *       data1: "area-line-range",
   *       data2: "line"
   *   }
   * }
   *
   * // for 'bubble' type, data can contain dimension value:
   * // - an array of [y, z] data following the order
   * // - or an object with 'y' and 'z' key value
   * // 'y' is for y axis coordination and 'z' is the bubble radius value
   * data: {
   *   rows: [
   *      ["data1", "data2"],
   *      [
   *        // or {y:10, z: 140}, 120
   *        [10, 140], 120
   *      ],
   *      [[100, 30], 55],
   *      [[50, 100], 60]
   *   ],
   *   types: {
   *       data1: "bubble",
   *       data2: "line"
   *   }
   * }
   *
   * // for 'canlestick' type, data should contain:
   * // - an array of [open, high, low, close, volume(optional)] data following the order
   * // - or an object with 'open', 'high', 'low', 'close' and 'value'(optional) key value
   * data: {
   *   rows: [
   *      ["data1", "data2"],
   * 		[
   * 			// open, high, low, close, volume (optional)
   * 			{open: 1300, high: 1369, low: 1200, close: 1339, volume: 100},
   * 			[1000, 1100, 850, 870]
   * 		],
   * 		[
   * 			{open: 1348, high: 1371, low: 1271, close: 1320},
   * 			[870, 1250, 830, 1200, 50]
   * 		]
   *   ],
   *   type: "candlestick"
   * }
   */
  data_rows: void 0,
  /**
   * Load data from a multidimensional array, with each element containing an array consisting of a datum name and associated data values.
   * @name data․columns
   * @memberof Options
   * @type {Array}
   * @default undefined
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.ColumnOrientedData)
   * @example
   * data: {
   *   columns: [
   *      ["data1", 30, 20, 50, 40, 60, 50],
   *      ["data2", 200, 130, 90, 240, 130, 220],
   *      ["data3", 300, 200, 160, 400, 250, 250]
   *   ]
   * }
   *
   * // for 'bar' type, data can contain:
   * // - an array of [start, end] data following the order
   * data: {
   *   columns: [
   *     ["data1", -100, 50, [100, 200], [200, 300]],
   *     ["data2", -200, 300, [-100, 100], [-50, -30]],
   *   ],
   *   type: "bar"
   * }
   *
   * // for 'range' types('area-line-range' or 'area-step-range' or 'area-spline-range'), data should contain:
   * // - an array of [high, mid, low] data following the order
   * // - or an object with 'high', 'mid' and 'low' key value
   * data: {
   *   columns: [
   *      ["data1",
   *          [150, 140, 110],  // or {high:150, mid: 140, low: 110}
   *          [150, 140, 110],
   *          [150, 140, 110]
   *      ]
   *   ],
   *   type: "area-line-range"
   * }
   *
   * // for 'bubble' type, data can contain dimension value:
   * // - an array of [y, z] data following the order
   * // - or an object with 'y' and 'z' key value
   * // 'y' is for y axis coordination and 'z' is the bubble radius value
   * data: {
   *   columns: [
   *      ["data1",
   *          [10, 140],  // or {y:10, z: 140}
   *          [100, 30],
   *          [50, 100]
   *      ]
   *   ],
   *   type: "bubble"
   * }
   *
   * // for 'canlestick' type, data should contain:
   * // - an array of [open, high, low, close, volume(optional)] data following the order
   * // - or an object with 'open', 'high', 'low', 'close' and 'value'(optional) key value
   * data: {
   *   columns: [
   *      ["data1",
   *          [1000, 1100, 850, 870, 100],  // or {open:1000, high: 1100, low: 870, volume: 100}
   *          [870, 1250, 830, 1200]  // 'volume' can be omitted
   *      ]
   *   ],
   *   type: "candlestick"
   * }
   */
  data_columns: void 0,
  /**
   * Used if loading JSON via data.url.
   * - **Available Values:**
   *   - json
   *   - csv
   *   - tsv
   * @name data․mimeType
   * @memberof Options
   * @type {string}
   * @default csv
   * @example
   * data: {
   *     mimeType: "json"
   * }
   */
  data_mimeType: "csv",
  /**
   * Choose which JSON object keys correspond to desired data.
   * - **NOTE:** Only for JSON object given as array.
   * @name data․keys
   * @memberof Options
   * @type {string}
   * @default undefined
   * @example
   * data: {
   *     json: [
   *       {name: "www.site1.com", upload: 200, download: 200, total: 400},
   *       {name: "www.site2.com", upload: 100, download: 300, total: 400},
   *       {name: "www.site3.com", upload: 300, download: 200, total: 500},
   *       {name: "www.site4.com", upload: 400, download: 100, total: 500}
   *     ],
   *     keys: {
   *       // case 1: specify 'x' key for category axis
   *       x: "name", // 'name' key will be used as category x axis values
   *       value: ["upload", "download"]
   *
   *       // case 2: without 'x' key for non-category axis
   *       value: ["upload", "download"]
   *     }
   * }
   */
  data_keys: void 0,
  /**
   * Set text label to be displayed when there's no data to show.
   * - ex. Toggling all visible data to not be shown, unloading all current data, etc.
   * @name data․empty․label․text
   * @memberof Options
   * @type {string}
   * @default ""
   * @example
   * data: {
   *   empty: {
   *     label: {
   *       text: "No Data"
   *     }
   *   }
   * }
   */
  data_empty_label_text: ""
});

;// CONCATENATED MODULE: ./src/config/Options/interaction/interaction.ts
/* harmony default export */ var interaction = ({
  /**
   * Interaction options
   * @name interaction
   * @memberof Options
   * @type {object}
   * @property {object} interaction Intersection object
   * @property {boolean} [interaction.enabled=true] Indicate if the chart should have interactions.<br>
   *     If `false` is set, all of interactions (showing/hiding tooltip, selection, mouse events, etc) will be disabled.
   * @property {boolean} [interaction.brighten=true] Make brighter for the selected area (ex. 'pie' type data selected area)
   * @property {boolean} [interaction.inputType.mouse=true] enable or disable mouse interaction
   * @property {boolean} [interaction.inputType.touch=true] enable or disable  touch interaction
   * @property {boolean|number} [interaction.inputType.touch.preventDefault=false] enable or disable to call event.preventDefault on touchstart & touchmove event. It's usually used to prevent document scrolling.
   * @see [Demo: touch.preventDefault](https://naver.github.io/billboard.js/demo/#Interaction.PreventScrollOnTouch)
   * @example
   * interaction: {
   *    enabled: false,
   *    brighten: false,
   *    inputType: {
   *        mouse: true,
   *        touch: false
   *
   *        // or declare preventDefault explicitly.
   *        // In this case touch inputType is enabled by default
   *        touch: {
   *            preventDefault: true
   *
   *            // or threshold pixel value (pixel moved from touchstart to touchmove)
   *            preventDefault: 5
   *        }
   *    }
   * }
   */
  interaction_enabled: true,
  interaction_brighten: true,
  interaction_inputType_mouse: true,
  interaction_inputType_touch: {}
});

// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(4);
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
const browser_doc = win == null ? void 0 : win.document;
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
  var _a, _b, _c, _d, _e, _f;
  return {
    x: ((_b = (_a = win.pageXOffset) != null ? _a : win.scrollX) != null ? _b : 0) + ((_c = node.scrollLeft) != null ? _c : 0),
    y: ((_e = (_d = win.pageYOffset) != null ? _d : win.scrollY) != null ? _e : 0) + ((_f = node.scrollTop) != null ? _f : 0)
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
        const mouseEvent = browser_doc.createEvent("MouseEvent");
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
  return ((_a = browser_doc) == null ? void 0 : _a.hidden) === false || ((_b = browser_doc) == null ? void 0 : _b.visibilityState) === "visible";
}
function convertInputType(mouse, touch) {
  const { DocumentTouch, matchMedia, navigator } = win;
  let hasTouch = false;
  if (touch) {
    if (navigator && "maxTouchPoints" in navigator) {
      hasTouch = navigator.maxTouchPoints > 0;
    } else if ("ontouchmove" in win || DocumentTouch && browser_doc instanceof DocumentTouch) {
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

;// CONCATENATED MODULE: ./src/config/Options/Options.ts
var Options_defProp = Object.defineProperty;
var Options_getOwnPropSymbols = Object.getOwnPropertySymbols;
var Options_hasOwnProp = Object.prototype.hasOwnProperty;
var Options_propIsEnum = Object.prototype.propertyIsEnumerable;
var Options_defNormalProp = (obj, key, value) => key in obj ? Options_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var Options_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (Options_hasOwnProp.call(b, prop))
      Options_defNormalProp(a, prop, b[prop]);
  if (Options_getOwnPropSymbols)
    for (var prop of Options_getOwnPropSymbols(b)) {
      if (Options_propIsEnum.call(b, prop))
        Options_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => Options_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);









const _Options = class _Options {
  static setOptions(options) {
    this.data = options.reduce((a, c) => Options_spreadValues(Options_spreadValues({}, a), c), this.data);
  }
  constructor() {
    return deepClone(
      main,
      boost,
      data,
      color,
      interaction,
      legend,
      title,
      tooltip,
      _Options.data
    );
  }
};
__publicField(_Options, "data", {});
let Options = _Options;


;// CONCATENATED MODULE: ./src/config/Store/Element.ts
class Element {
  constructor() {
    const element = {
      chart: null,
      main: null,
      svg: null,
      axis: {
        // axes
        x: null,
        y: null,
        y2: null,
        subX: null
      },
      axisTooltip: {
        x: null,
        y: null,
        y2: null
      },
      defs: null,
      tooltip: null,
      legend: null,
      title: null,
      subchart: {
        main: null,
        // $$.context
        bar: null,
        // $$.contextBar
        line: null,
        // $$.contextLine
        area: null
        // $$.contextArea
      },
      arcs: null,
      bar: null,
      // mainBar,
      candlestick: null,
      line: null,
      // mainLine,
      area: null,
      // mainArea,
      circle: null,
      // mainCircle,
      radar: null,
      text: null,
      // mainText,
      grid: {
        main: null,
        // grid (also focus)
        x: null,
        // xgrid,
        y: null
        // ygrid,
      },
      gridLines: {
        main: null,
        // gridLines
        x: null,
        // xgridLines,
        y: null
        // ygridLines
      },
      region: {
        main: null,
        // region
        list: null
        // mainRegion
      },
      eventRect: null,
      zoomResetBtn: null
      // drag zoom reset button
    };
    return element;
  }
}

;// CONCATENATED MODULE: ./src/config/Store/State.ts
class State {
  constructor() {
    return {
      // chart drawn area dimension, excluding axes
      width: 0,
      width2: 0,
      height: 0,
      height2: 0,
      margin: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      margin2: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      margin3: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      arcWidth: 0,
      arcHeight: 0,
      xAxisHeight: 0,
      hasAxis: false,
      hasFunnel: false,
      hasRadar: false,
      hasTreemap: false,
      // for data CSS rule index (used when boost.useCssRule is true)
      cssRule: {},
      current: {
        // current domain value. Assigned when is zoom is called
        domain: void 0,
        // chart whole dimension
        width: 0,
        height: 0,
        dataMax: 0,
        maxTickSize: {
          x: {
            width: 0,
            height: 0,
            ticks: [],
            clipPath: 0,
            domain: ""
          },
          y: { width: 0, height: 0, domain: "" },
          y2: { width: 0, height: 0, domain: "" }
        },
        // current used chart type list
        types: [],
        needle: void 0
        // arc needle current value
      },
      // legend
      isLegendRight: false,
      isLegendInset: false,
      isLegendTop: false,
      isLegendLeft: false,
      legendStep: 0,
      legendItemWidth: 0,
      legendItemHeight: 0,
      legendHasRendered: false,
      eventReceiver: {
        currentIdx: -1,
        // current event interaction index
        rect: {},
        // event rect's clientBoundingRect
        data: [],
        // event data bound of previoous eventRect
        coords: []
        // coordination value of previous eventRect
      },
      axis: {
        x: {
          padding: { left: 0, right: 0 },
          tickCount: 0
        }
      },
      rotatedPadding: {
        left: 30,
        right: 0,
        top: 5
      },
      withoutFadeIn: {},
      inputType: "",
      datetimeId: "",
      // clip id string
      clip: {
        id: "",
        idXAxis: "",
        idYAxis: "",
        idXAxisTickTexts: "",
        idGrid: "",
        idSubchart: "",
        // clipIdForSubchart
        path: "",
        pathXAxis: "",
        pathYAxis: "",
        pathXAxisTickTexts: "",
        pathGrid: ""
      },
      // state
      event: null,
      // event object
      dragStart: null,
      dragging: false,
      flowing: false,
      cancelClick: false,
      mouseover: false,
      rendered: false,
      transiting: false,
      redrawing: false,
      // if redraw() is on process
      resizing: false,
      // resize event called
      toggling: false,
      // legend toggle
      zooming: false,
      hasNegativeValue: false,
      hasPositiveValue: true,
      orgAreaOpacity: "0.2",
      orgConfig: {},
      // user original genration config
      // ID strings
      hiddenTargetIds: [],
      hiddenLegendIds: [],
      focusedTargetIds: [],
      defocusedTargetIds: [],
      // value for Arc
      radius: 0,
      innerRadius: 0,
      outerRadius: void 0,
      innerRadiusRatio: 0,
      gaugeArcWidth: 0,
      radiusExpanded: 0,
      // xgrid attribute
      xgridAttr: {
        x1: null,
        x2: null,
        y1: null,
        y2: null
      }
    };
  }
}

;// CONCATENATED MODULE: ./src/config/Store/Store.ts


const Store_classes = {
  element: Element,
  state: State
};
class Store {
  constructor() {
    Object.keys(Store_classes).forEach((v) => {
      this[v] = new Store_classes[v]();
    });
  }
  getStore(name) {
    return this[name];
  }
}

;// CONCATENATED MODULE: ./src/module/Cache.ts
var Cache_defProp = Object.defineProperty;
var Cache_defNormalProp = (obj, key, value) => key in obj ? Cache_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var Cache_publicField = (obj, key, value) => Cache_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

const KEY = {
  bubbleBaseLength: "$baseLength",
  colorPattern: "__colorPattern__",
  dataMinMax: "$dataMinMax",
  dataTotalSum: "$dataTotalSum",
  dataTotalPerIndex: "$totalPerIndex",
  legendItemTextBox: "legendItemTextBox",
  radarPoints: "$radarPoints",
  radarTextWidth: "$radarTextWidth",
  setOverOut: "setOverOut",
  callOverOutForTouch: "callOverOutForTouch",
  textRect: "textRect"
};
class Cache {
  constructor() {
    Cache_publicField(this, "cache", {});
  }
  /**
   * Add cache
   * @param {string} key Cache key
   * @param {*} value Value to be stored
   * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
   * @returns {*} Added data value
   * @private
   */
  add(key, value, isDataType = false) {
    this.cache[key] = isDataType ? this.cloneTarget(value) : value;
    return this.cache[key];
  }
  /**
   * Remove cache
   * @param {string|Array} key Cache key
   * @private
   */
  remove(key) {
    (isString(key) ? [key] : key).forEach((v) => delete this.cache[v]);
  }
  /**
   * Get cahce
   * @param {string|Array} key Cache key
   * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
   * @returns {*}
   * @private
   */
  get(key, isDataType = false) {
    if (isDataType && Array.isArray(key)) {
      const targets = [];
      for (let i = 0, id; id = key[i]; i++) {
        if (id in this.cache) {
          targets.push(this.cloneTarget(this.cache[id]));
        }
      }
      return targets;
    } else {
      const value = this.cache[key];
      return isValue(value) ? value : null;
    }
  }
  /**
   * Reset cached data
   * @param {boolean} all true: reset all data, false: reset only '$' prefixed key data
   * @private
   */
  reset(all) {
    const $$ = this;
    for (const x in $$.cache) {
      if (all || /^\$/.test(x)) {
        $$.cache[x] = null;
      }
    }
  }
  /**
   * Clone data target object
   * @param {object} target Data object
   * @returns {object}
   * @private
   */
  cloneTarget(target) {
    return {
      id: target.id,
      id_org: target.id_org,
      values: target.values.map((d) => ({ x: d.x, value: d.value, id: d.id }))
    };
  }
}

;// CONCATENATED MODULE: ./src/config/const.ts
const TYPE = {
  AREA: "area",
  AREA_LINE_RANGE: "area-line-range",
  AREA_SPLINE: "area-spline",
  AREA_SPLINE_RANGE: "area-spline-range",
  AREA_STEP: "area-step",
  AREA_STEP_RANGE: "area-step-range",
  BAR: "bar",
  BUBBLE: "bubble",
  CANDLESTICK: "candlestick",
  DONUT: "donut",
  FUNNEL: "funnel",
  GAUGE: "gauge",
  LINE: "line",
  PIE: "pie",
  POLAR: "polar",
  RADAR: "radar",
  SCATTER: "scatter",
  SPLINE: "spline",
  STEP: "step",
  TREEMAP: "treemap"
};
const TYPE_METHOD_NEEDED = {
  AREA: "initArea",
  AREA_LINE_RANGE: "initArea",
  AREA_SPLINE: "initArea",
  AREA_SPLINE_RANGE: "initArea",
  AREA_STEP: "initArea",
  AREA_STEP_RANGE: "initArea",
  BAR: "initBar",
  BUBBLE: "initCircle",
  CANDLESTICK: "initCandlestick",
  DONUT: "initArc",
  FUNNEL: "initFunnel",
  GAUGE: "initArc",
  LINE: "initLine",
  PIE: "initArc",
  POLAR: "initPolar",
  RADAR: "initCircle",
  SCATTER: "initCircle",
  SPLINE: "initLine",
  STEP: "initLine",
  TREEMAP: "initTreemap"
};
const TYPE_BY_CATEGORY = {
  Area: [
    TYPE.AREA,
    TYPE.AREA_SPLINE,
    TYPE.AREA_SPLINE_RANGE,
    TYPE.AREA_LINE_RANGE,
    TYPE.AREA_STEP,
    TYPE.AREA_STEP_RANGE
  ],
  AreaRange: [
    TYPE.AREA_SPLINE_RANGE,
    TYPE.AREA_LINE_RANGE,
    TYPE.AREA_STEP_RANGE
  ],
  Arc: [
    TYPE.PIE,
    TYPE.DONUT,
    TYPE.GAUGE,
    TYPE.POLAR,
    TYPE.RADAR
  ],
  Line: [
    TYPE.LINE,
    TYPE.SPLINE,
    TYPE.AREA,
    TYPE.AREA_SPLINE,
    TYPE.AREA_SPLINE_RANGE,
    TYPE.AREA_LINE_RANGE,
    TYPE.STEP,
    TYPE.AREA_STEP,
    TYPE.AREA_STEP_RANGE
  ],
  Step: [
    TYPE.STEP,
    TYPE.AREA_STEP,
    TYPE.AREA_STEP_RANGE
  ],
  Spline: [
    TYPE.SPLINE,
    TYPE.AREA_SPLINE,
    TYPE.AREA_SPLINE_RANGE
  ]
};

;// CONCATENATED MODULE: ./src/module/error.ts




function checkModuleImport(ctx) {
  const $$ = ctx;
  const { config } = $$;
  let type = "";
  if (isEmpty(config.data_type || config.data_types) && !$$[TYPE_METHOD_NEEDED.LINE]) {
    type = "line";
  } else {
    for (const x in TYPE_METHOD_NEEDED) {
      const t = TYPE[x];
      if ($$.hasType(t) && !$$[TYPE_METHOD_NEEDED[x]]) {
        type = t;
        break;
      }
    }
  }
  type && logError(
    `Please, make sure if %c${camelize(type)}`,
    "module has been imported and specified correctly."
  );
}
function logError(head, tail) {
  var _a;
  const prefix = "[billboard.js]";
  const info = "https://github.com/naver/billboard.js/wiki/CHANGELOG-v2#modularization-by-its-functionality";
  const hasConsole = (_a = win.console) == null ? void 0 : _a.error;
  if (hasConsole) {
    console.error(
      `\u274C ${prefix} ${head}`,
      "background:red;color:white;display:block;font-size:15px",
      tail
    );
    console.info("%c\u2139\uFE0F", "font-size:15px", info);
  }
  throw Error(`${prefix} ${head.replace(/\%c([a-z-]+)/i, "'$1' ")} ${tail}`);
}

;// CONCATENATED MODULE: ./src/module/generator.ts


const { setTimeout: generator_setTimeout, clearTimeout: generator_clearTimeout } = win;
function generateResize(option) {
  const fn = [];
  let timeout;
  const callResizeFn = function() {
    callResizeFn.clear();
    if (option === false) {
      requestIdleCallback(() => {
        fn.forEach((f) => f());
      }, { timeout: 200 });
    } else {
      timeout = generator_setTimeout(() => {
        fn.forEach((f) => f());
      }, isNumber(option) ? option : 200);
    }
  };
  callResizeFn.clear = () => {
    if (timeout) {
      generator_clearTimeout(timeout);
      timeout = null;
    }
  };
  callResizeFn.add = (f) => fn.push(f);
  callResizeFn.remove = (f) => fn.splice(fn.indexOf(f), 1);
  return callResizeFn;
}
function generateWait() {
  let transitionsToWait = [];
  const f = function(selection, callback) {
    function loop() {
      var _a;
      let done = 0;
      for (let i = 0, t; t = transitionsToWait[i]; i++) {
        if (t === true || ((_a = t.empty) == null ? void 0 : _a.call(t))) {
          done++;
          continue;
        }
        if (isTabVisible() === false) {
          done = transitionsToWait.length;
          break;
        }
        try {
          t.transition();
        } catch (e) {
          done++;
        }
      }
      return done === transitionsToWait.length;
    }
    runUntil(() => {
      callback == null ? void 0 : callback();
    }, loop);
  };
  f.add = function(t) {
    isArray(t) ? transitionsToWait = transitionsToWait.concat(t) : transitionsToWait.push(t);
  };
  return f;
}

;// CONCATENATED MODULE: ./src/module/worker.ts

const blob = {};
function getObjectURL(fn, depsFn) {
  var _a;
  const fnString = fn.toString();
  const key = fnString.replace(/(function|[\s\W\n])/g, "").substring(0, 15);
  if (!(key in blob)) {
    blob[key] = new win.Blob([
      `${(_a = depsFn == null ? void 0 : depsFn.map(String).join(";")) != null ? _a : ""}

			self.onmessage=function({data}) {
				const result = (${fnString}).apply(null, data);
				self.postMessage(result);
			};`
    ], {
      type: "text/javascript"
    });
  }
  return win.URL.createObjectURL(blob[key]);
}
function getWorker(src) {
  const worker = new win.Worker(src);
  worker.onerror = function(e) {
    console.error ? console.error(e) : console.log(e);
  };
  return worker;
}
function runWorker(useWorker = true, fn, callback, depsFn) {
  let runFn = function(...args) {
    const res = fn(...args);
    callback(res);
  };
  if (win.Worker && useWorker) {
    const src = getObjectURL(fn, depsFn);
    const worker = getWorker(src);
    runFn = function(...args) {
      worker.postMessage(args);
      worker.onmessage = function(e) {
        win.URL.revokeObjectURL(src);
        return callback(e.data);
      };
    };
  }
  return runFn;
}

// EXTERNAL MODULE: external {"commonjs":"d3-dsv","commonjs2":"d3-dsv","amd":"d3-dsv","root":"d3"}
var external_commonjs_d3_dsv_commonjs2_d3_dsv_amd_d3_dsv_root_d3_ = __webpack_require__(5);
;// CONCATENATED MODULE: ./src/ChartInternal/data/convert.helper.ts


function columns(columns2) {
  const newRows = [];
  columns2.forEach(function(col, i) {
    const key = col[0];
    col.forEach(function(v, j) {
      if (j > 0) {
        if (typeof newRows[j - 1] === "undefined") {
          newRows[j - 1] = {};
        }
        if (typeof v === "undefined") {
          throw new Error(`Source data is missing a component at (${i}, ${j})!`);
        }
        newRows[j - 1][key] = v;
      }
    });
  });
  return newRows;
}
function rows(rows2) {
  const keys = rows2[0];
  const newRows = [];
  rows2.forEach(function(row, i) {
    if (i > 0) {
      const newRow = {};
      row.forEach(function(v, j) {
        if (typeof v === "undefined") {
          throw new Error(`Source data is missing a component at (${i}, ${j})!`);
        }
        newRow[keys[j]] = v;
      });
      newRows.push(newRow);
    }
  });
  return newRows;
}
function json(json2, keysParam) {
  const newRows = [];
  let targetKeys;
  let data;
  if (Array.isArray(json2)) {
    const findValueInJson = function(object, path) {
      if (object[path] !== void 0) {
        return object[path];
      }
      const convertedPath = path.replace(/\[(\w+)\]/g, ".$1");
      const pathArray = convertedPath.replace(/^\./, "").split(".");
      let target = object;
      pathArray.some(function(k) {
        return !(target = target && k in target ? target[k] : void 0);
      });
      return target;
    };
    if (keysParam.x) {
      targetKeys = keysParam.value.concat(keysParam.x);
    } else {
      targetKeys = keysParam.value;
    }
    newRows.push(targetKeys);
    json2.forEach(function(o) {
      const newRow = targetKeys.map(function(key) {
        let v = findValueInJson(o, key);
        if (typeof v === "undefined") {
          v = null;
        }
        return v;
      });
      newRows.push(newRow);
    });
    data = rows(newRows);
  } else {
    Object.keys(json2).forEach(function(key) {
      var _a;
      const tmp = json2[key].concat();
      (_a = tmp.unshift) == null ? void 0 : _a.call(tmp, key);
      newRows.push(tmp);
    });
    data = columns(newRows);
  }
  return data;
}
function url(url2, mimeType = "csv", headers, keys, done) {
  const req = new XMLHttpRequest();
  const converter = { csv, tsv, json };
  req.open("GET", url2);
  if (headers) {
    Object.keys(headers).forEach(function(key) {
      req.setRequestHeader(key, headers[key]);
    });
  }
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 200) {
        const response = req.responseText;
        response && done.call(this, converter[mimeType](
          mimeType === "json" ? JSON.parse(response) : response,
          keys
        ));
      } else {
        throw new Error(`${url2}: Something went wrong loading!`);
      }
    }
  };
  req.send();
}
function convertCsvTsvToData(parser, xsv) {
  const rows2 = parser.rows(xsv);
  let d;
  if (rows2.length === 1) {
    d = [{}];
    rows2[0].forEach((id) => {
      d[0][id] = null;
    });
  } else {
    d = parser.parse(xsv);
  }
  return d;
}
function csv(xsv) {
  return convertCsvTsvToData({
    rows: external_commonjs_d3_dsv_commonjs2_d3_dsv_amd_d3_dsv_root_d3_.csvParseRows,
    parse: external_commonjs_d3_dsv_commonjs2_d3_dsv_amd_d3_dsv_root_d3_.csvParse
  }, xsv);
}
function tsv(tsv2) {
  return convertCsvTsvToData({
    rows: external_commonjs_d3_dsv_commonjs2_d3_dsv_amd_d3_dsv_root_d3_.tsvParseRows,
    parse: external_commonjs_d3_dsv_commonjs2_d3_dsv_amd_d3_dsv_root_d3_.tsvParse
  }, tsv2);
}

;// CONCATENATED MODULE: ./src/ChartInternal/data/convert.ts



function getDataKeyForJson(keysParam, config) {
  const keys = keysParam || (config == null ? void 0 : config.data_keys);
  if (keys == null ? void 0 : keys.x) {
    config.data_x = keys.x;
  }
  return keys;
}
/* harmony default export */ var convert = ({
  /**
   * Convert data according its type
   * @param {object} args data object
   * @param {Function} [callback] callback for url(XHR) type loading
   * @private
   */
  convertData(args, callback) {
    const { config } = this;
    const useWorker = config.boost_useWorker;
    let data = args;
    if (args.bindto) {
      data = {};
      ["url", "mimeType", "headers", "keys", "json", "keys", "rows", "columns"].forEach((v) => {
        const key = `data_${v}`;
        if (key in args) {
          data[v] = args[key];
        }
      });
    }
    if (data.url && callback) {
      url(
        data.url,
        data.mimeType,
        data.headers,
        getDataKeyForJson(data.keys, config),
        callback
      );
    } else if (data.json) {
      runWorker(useWorker, json, callback, [columns, rows])(
        data.json,
        getDataKeyForJson(data.keys, config)
      );
    } else if (data.rows) {
      runWorker(useWorker, rows, callback)(data.rows);
    } else if (data.columns) {
      runWorker(useWorker, columns, callback)(data.columns);
    } else if (args.bindto) {
      throw Error("url or json or rows or columns is required.");
    }
  },
  convertDataToTargets(data, appendXs) {
    const $$ = this;
    const { axis, config, state } = $$;
    const chartType = config.data_type;
    let isCategorized = false;
    let isTimeSeries = false;
    let isCustomX = false;
    if (axis) {
      isCategorized = axis.isCategorized();
      isTimeSeries = axis.isTimeSeries();
      isCustomX = axis.isCustomX();
    }
    const dataKeys = Object.keys(data[0] || {});
    const ids = dataKeys.length ? dataKeys.filter($$.isNotX, $$) : [];
    const xs = dataKeys.length ? dataKeys.filter($$.isX, $$) : [];
    let xsData;
    ids.forEach((id) => {
      const xKey = this.getXKey(id);
      if (isCustomX || isTimeSeries) {
        if (xs.indexOf(xKey) >= 0) {
          xsData = (appendXs && $$.data.xs[id] || []).concat(
            data.map((d) => d[xKey]).filter(isValue).map((rawX, i) => $$.generateTargetX(rawX, id, i))
          );
        } else if (config.data_x) {
          xsData = this.getOtherTargetXs();
        } else if (notEmpty(config.data_xs)) {
          xsData = $$.getXValuesOfXKey(xKey, $$.data.targets);
        }
      } else {
        xsData = data.map((d, i) => i);
      }
      xsData && (this.data.xs[id] = xsData);
    });
    ids.forEach((id) => {
      if (!this.data.xs[id]) {
        throw new Error(`x is not defined for id = "${id}".`);
      }
    });
    const targets = ids.map((id, index) => {
      const convertedId = config.data_idConverter.bind($$.api)(id);
      const xKey = $$.getXKey(id);
      const isCategory = isCustomX && isCategorized;
      const hasCategory = isCategory && data.map((v) => v.x).every((v) => config.axis_x_categories.indexOf(v) > -1);
      const isDataAppend = data.__append__;
      const xIndex = xKey === null && isDataAppend ? $$.api.data.values(id).length : 0;
      return {
        id: convertedId,
        id_org: id,
        values: data.map((d, i) => {
          const rawX = d[xKey];
          let value = d[id];
          let x;
          value = value !== null && !isNaN(value) && !isObject(value) ? +value : isArray(value) || isObject(value) ? value : null;
          if ((isCategory || state.hasRadar) && index === 0 && !isUndefined(rawX)) {
            if (!hasCategory && index === 0 && i === 0 && !isDataAppend) {
              config.axis_x_categories = [];
            }
            x = config.axis_x_categories.indexOf(rawX);
            if (x === -1) {
              x = config.axis_x_categories.length;
              config.axis_x_categories.push(rawX);
            }
          } else {
            x = $$.generateTargetX(rawX, id, xIndex + i);
          }
          if (isUndefined(value) || $$.data.xs[id].length <= i) {
            x = void 0;
          }
          return {
            x,
            value,
            id: convertedId,
            index: -1
          };
        }).filter((v) => isDefined(v.x))
      };
    });
    targets.forEach((t) => {
      var _a;
      if (config.data_xSort) {
        t.values = t.values.sort((v1, v2) => {
          const x1 = v1.x || v1.x === 0 ? v1.x : Infinity;
          const x2 = v2.x || v2.x === 0 ? v2.x : Infinity;
          return x1 - x2;
        });
      }
      t.values.forEach((v, i) => v.index = i);
      (_a = $$.data.xs[t.id]) == null ? void 0 : _a.sort((v1, v2) => v1 - v2);
    });
    state.hasNegativeValue = $$.hasNegativeValueInTargets(targets);
    state.hasPositiveValue = $$.hasPositiveValueInTargets(targets);
    if (chartType && $$.isValidChartType(chartType)) {
      const targetIds = $$.mapToIds(targets).filter(
        (id) => !(id in config.data_types) || !$$.isValidChartType(config.data_types[id])
      );
      $$.setTargetType(targetIds, chartType);
    }
    targets.forEach((d) => $$.cache.add(d.id_org, d, true));
    return targets;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/data/data.ts




/* harmony default export */ var data_data = ({
  isX(key) {
    const $$ = this;
    const { config } = $$;
    const dataKey = config.data_x && key === config.data_x;
    const existValue = notEmpty(config.data_xs) && hasValue(config.data_xs, key);
    return dataKey || existValue;
  },
  isNotX(key) {
    return !this.isX(key);
  },
  isStackNormalized() {
    const { config } = this;
    return !!(config.data_stack_normalize && config.data_groups.length);
  },
  /**
   * Check if given id is grouped data or has grouped data
   * @param {string} id Data id value
   * @returns {boolean} is grouped data or has grouped data
   * @private
   */
  isGrouped(id) {
    const groups = this.config.data_groups;
    return id ? groups.some((v) => v.indexOf(id) >= 0 && v.length > 1) : groups.length > 0;
  },
  getXKey(id) {
    const $$ = this;
    const { config } = $$;
    return config.data_x ? config.data_x : notEmpty(config.data_xs) ? config.data_xs[id] : null;
  },
  getXValuesOfXKey(key, targets) {
    const $$ = this;
    const ids = targets && notEmpty(targets) ? $$.mapToIds(targets) : [];
    let xValues;
    ids.forEach((id) => {
      if ($$.getXKey(id) === key) {
        xValues = $$.data.xs[id];
      }
    });
    return xValues;
  },
  /**
   * Get index number based on given x Axis value
   * @param {Date|number|string} x x Axis to be compared
   * @param {Array} basedX x Axis list to be based on
   * @returns {number} index number
   * @private
   */
  getIndexByX(x, basedX) {
    const $$ = this;
    return basedX ? basedX.indexOf(isString(x) ? x : +x) : ($$.filterByX($$.data.targets, x)[0] || { index: null }).index;
  },
  getXValue(id, i) {
    const $$ = this;
    return id in $$.data.xs && $$.data.xs[id] && isValue($$.data.xs[id][i]) ? $$.data.xs[id][i] : i;
  },
  getOtherTargetXs() {
    const $$ = this;
    const idsForX = Object.keys($$.data.xs);
    return idsForX.length ? $$.data.xs[idsForX[0]] : null;
  },
  getOtherTargetX(index) {
    const xs = this.getOtherTargetXs();
    return xs && index < xs.length ? xs[index] : null;
  },
  addXs(xs) {
    const $$ = this;
    const { config } = $$;
    Object.keys(xs).forEach((id) => {
      config.data_xs[id] = xs[id];
    });
  },
  /**
   * Determine if x axis is multiple
   * @returns {boolean} true: multiple, false: single
   * @private
   */
  isMultipleX() {
    return !this.config.axis_x_forceAsSingle && (notEmpty(this.config.data_xs) || this.hasType("bubble") || this.hasType("scatter"));
  },
  addName(data) {
    const $$ = this;
    const { config } = $$;
    let name;
    if (data) {
      name = config.data_names[data.id];
      data.name = name !== void 0 ? name : data.id;
    }
    return data;
  },
  /**
   * Get all values on given index
   * @param {number} index Index
   * @param {boolean} filterNull Filter nullish value
   * @returns {Array}
   * @private
   */
  getAllValuesOnIndex(index, filterNull = false) {
    const $$ = this;
    let value = $$.filterTargetsToShow($$.data.targets).map((t) => $$.addName($$.getValueOnIndex(t.values, index)));
    if (filterNull) {
      value = value.filter((v) => v && "value" in v && isValue(v.value));
    }
    return value;
  },
  getValueOnIndex(values, index) {
    const valueOnIndex = values.filter((v) => v.index === index);
    return valueOnIndex.length ? valueOnIndex[0] : null;
  },
  updateTargetX(targets, x) {
    const $$ = this;
    targets.forEach((t) => {
      t.values.forEach((v, i) => {
        v.x = $$.generateTargetX(x[i], t.id, i);
      });
      $$.data.xs[t.id] = x;
    });
  },
  updateTargetXs(targets, xs) {
    const $$ = this;
    targets.forEach((t) => {
      xs[t.id] && $$.updateTargetX([t], xs[t.id]);
    });
  },
  generateTargetX(rawX, id, index) {
    const $$ = this;
    const { axis } = $$;
    let x = (axis == null ? void 0 : axis.isCategorized()) ? index : rawX || index;
    if (axis == null ? void 0 : axis.isTimeSeries()) {
      const fn = parseDate.bind($$);
      x = rawX ? fn(rawX) : fn($$.getXValue(id, index));
    } else if ((axis == null ? void 0 : axis.isCustomX()) && !(axis == null ? void 0 : axis.isCategorized())) {
      x = isValue(rawX) ? +rawX : $$.getXValue(id, index);
    }
    return x;
  },
  updateXs(values) {
    if (values.length) {
      this.axis.xs = values.map((v) => v.x);
    }
  },
  getPrevX(i) {
    const x = this.axis.xs[i - 1];
    return isDefined(x) ? x : null;
  },
  getNextX(i) {
    const x = this.axis.xs[i + 1];
    return isDefined(x) ? x : null;
  },
  /**
   * Get base value isAreaRangeType
   * @param {object} data Data object
   * @returns {number}
   * @private
   */
  getBaseValue(data) {
    const $$ = this;
    const { hasAxis } = $$.state;
    let { value } = data;
    if (value && hasAxis) {
      if ($$.isAreaRangeType(data)) {
        value = $$.getRangedData(data, "mid");
      } else if ($$.isBubbleZType(data)) {
        value = $$.getBubbleZData(value, "y");
      }
    }
    return value;
  },
  /**
   * Get min/max value from the data
   * @private
   * @param {Array} data array data to be evaluated
   * @returns {{min: {number}, max: {number}}}
   */
  getMinMaxValue(data) {
    const getBaseValue = this.getBaseValue.bind(this);
    let min;
    let max;
    (data || this.data.targets.map((t) => t.values)).forEach((v, i) => {
      const value = v.map(getBaseValue).filter(isNumber);
      min = Math.min(i ? min : Infinity, ...value);
      max = Math.max(i ? max : -Infinity, ...value);
    });
    return { min, max };
  },
  /**
   * Get the min/max data
   * @private
   * @returns {{min: Array, max: Array}}
   */
  getMinMaxData() {
    const $$ = this;
    const cacheKey = KEY.dataMinMax;
    let minMaxData = $$.cache.get(cacheKey);
    if (!minMaxData) {
      const data = $$.data.targets.map((t) => t.values);
      const minMax = $$.getMinMaxValue(data);
      let min = [];
      let max = [];
      data.forEach((v) => {
        const minData = $$.getFilteredDataByValue(v, minMax.min);
        const maxData = $$.getFilteredDataByValue(v, minMax.max);
        if (minData.length) {
          min = min.concat(minData);
        }
        if (maxData.length) {
          max = max.concat(maxData);
        }
      });
      $$.cache.add(cacheKey, minMaxData = { min, max });
    }
    return minMaxData;
  },
  /**
   * Get sum of data per index
   * @private
   * @returns {Array}
   */
  getTotalPerIndex() {
    const $$ = this;
    const cacheKey = KEY.dataTotalPerIndex;
    let sum = $$.cache.get(cacheKey);
    if (($$.config.data_groups.length || $$.isStackNormalized()) && !sum) {
      sum = [];
      $$.data.targets.forEach((row) => {
        row.values.forEach((v, i) => {
          if (!sum[i]) {
            sum[i] = 0;
          }
          sum[i] += isNumber(v.value) ? v.value : 0;
        });
      });
    }
    return sum;
  },
  /**
   * Get total data sum
   * @param {boolean} subtractHidden Subtract hidden data from total
   * @returns {number}
   * @private
   */
  getTotalDataSum(subtractHidden) {
    const $$ = this;
    const cacheKey = KEY.dataTotalSum;
    let total = $$.cache.get(cacheKey);
    if (!isNumber(total)) {
      const sum = mergeArray($$.data.targets.map((t) => t.values)).map((v) => v.value);
      total = sum.length ? sum.reduce((p, c) => p + c) : 0;
      $$.cache.add(cacheKey, total);
    }
    if (subtractHidden) {
      total -= $$.getHiddenTotalDataSum();
    }
    return total;
  },
  /**
   * Get total hidden data sum
   * @returns {number}
   * @private
   */
  getHiddenTotalDataSum() {
    const $$ = this;
    const { api, state: { hiddenTargetIds } } = $$;
    let total = 0;
    if (hiddenTargetIds.length) {
      total = api.data.values.bind(api)(hiddenTargetIds).reduce((p, c) => p + c);
    }
    return total;
  },
  /**
   * Get filtered data by value
   * @param {object} data Data
   * @param {number} value Value to be filtered
   * @returns {Array} filtered array data
   * @private
   */
  getFilteredDataByValue(data, value) {
    return data.filter((t) => this.getBaseValue(t) === value);
  },
  /**
   * Return the max length of the data
   * @returns {number} max data length
   * @private
   */
  getMaxDataCount() {
    return Math.max(...this.data.targets.map((t) => t.values.length), 0);
  },
  getMaxDataCountTarget() {
    let target = this.filterTargetsToShow() || [];
    const length = target.length;
    const isInverted = this.config.axis_x_inverted;
    if (length > 1) {
      target = target.map((t) => t.values).reduce((a, b) => a.concat(b)).map((v) => v.x);
      target = sortValue(getUnique(target)).map((x, index, array) => ({
        x,
        index: isInverted ? array.length - index - 1 : index
      }));
    } else if (length) {
      target = target[0].values.concat();
    }
    return target;
  },
  mapToIds(targets) {
    return targets.map((d) => d.id);
  },
  mapToTargetIds(ids) {
    const $$ = this;
    return ids ? isArray(ids) ? ids.concat() : [ids] : $$.mapToIds($$.data.targets);
  },
  hasTarget(targets, id) {
    const ids = this.mapToIds(targets);
    for (let i = 0, val; val = ids[i]; i++) {
      if (val === id) {
        return true;
      }
    }
    return false;
  },
  isTargetToShow(targetId) {
    return this.state.hiddenTargetIds.indexOf(targetId) < 0;
  },
  isLegendToShow(targetId) {
    return this.state.hiddenLegendIds.indexOf(targetId) < 0;
  },
  filterTargetsToShow(targets) {
    const $$ = this;
    return (targets || $$.data.targets).filter((t) => $$.isTargetToShow(t.id));
  },
  mapTargetsToUniqueXs(targets) {
    const $$ = this;
    const { axis } = $$;
    let xs = [];
    if (targets == null ? void 0 : targets.length) {
      xs = getUnique(
        mergeArray(targets.map((t) => t.values.map((v) => +v.x)))
      );
      xs = (axis == null ? void 0 : axis.isTimeSeries()) ? xs.map((x) => /* @__PURE__ */ new Date(+x)) : xs.map(Number);
    }
    return sortValue(xs);
  },
  /**
   * Add to the state target Ids
   * @param {string} type State's prop name
   * @param {Array|string} targetIds Target ids array
   * @private
   */
  addTargetIds(type, targetIds) {
    const { state } = this;
    const ids = isArray(targetIds) ? targetIds : [targetIds];
    ids.forEach((v) => {
      state[type].indexOf(v) < 0 && state[type].push(v);
    });
  },
  /**
   * Remove from the state target Ids
   * @param {string} type State's prop name
   * @param {Array|string} targetIds Target ids array
   * @private
   */
  removeTargetIds(type, targetIds) {
    const { state } = this;
    const ids = isArray(targetIds) ? targetIds : [targetIds];
    ids.forEach((v) => {
      const index = state[type].indexOf(v);
      index >= 0 && state[type].splice(index, 1);
    });
  },
  addHiddenTargetIds(targetIds) {
    this.addTargetIds("hiddenTargetIds", targetIds);
  },
  removeHiddenTargetIds(targetIds) {
    this.removeTargetIds("hiddenTargetIds", targetIds);
  },
  addHiddenLegendIds(targetIds) {
    this.addTargetIds("hiddenLegendIds", targetIds);
  },
  removeHiddenLegendIds(targetIds) {
    this.removeTargetIds("hiddenLegendIds", targetIds);
  },
  getValuesAsIdKeyed(targets) {
    const $$ = this;
    const { hasAxis } = $$.state;
    const ys = {};
    const isMultipleX = $$.isMultipleX();
    const xs = isMultipleX ? $$.mapTargetsToUniqueXs(targets).map((v) => isString(v) ? v : +v) : null;
    targets.forEach((t) => {
      const data = [];
      t.values.filter(({ value }) => isValue(value) || value === null).forEach((v) => {
        let { value } = v;
        if (value !== null && $$.isCandlestickType(v)) {
          value = isArray(value) ? value.slice(0, 4) : [value.open, value.high, value.low, value.close];
        }
        if (isArray(value)) {
          data.push(...value);
        } else if (isObject(value) && "high" in value) {
          data.push(...Object.values(value));
        } else if ($$.isBubbleZType(v)) {
          data.push(hasAxis && $$.getBubbleZData(value, "y"));
        } else {
          if (isMultipleX) {
            data[$$.getIndexByX(v.x, xs)] = value;
          } else {
            data.push(value);
          }
        }
      });
      ys[t.id] = data;
    });
    return ys;
  },
  checkValueInTargets(targets, checker) {
    const ids = Object.keys(targets);
    let values;
    for (let i = 0; i < ids.length; i++) {
      values = targets[ids[i]].values;
      for (let j = 0; j < values.length; j++) {
        if (checker(values[j].value)) {
          return true;
        }
      }
    }
    return false;
  },
  hasMultiTargets() {
    return this.filterTargetsToShow().length > 1;
  },
  hasNegativeValueInTargets(targets) {
    return this.checkValueInTargets(targets, (v) => v < 0);
  },
  hasPositiveValueInTargets(targets) {
    return this.checkValueInTargets(targets, (v) => v > 0);
  },
  /**
   * Sort targets data
   * Note: For stacked bar, will sort from the total sum of data series, not for each stacked bar
   * @param {Array} targetsValue Target value
   * @returns {Array}
   * @private
   */
  orderTargets(targetsValue) {
    const $$ = this;
    const targets = [...targetsValue];
    const fn = $$.getSortCompareFn();
    fn && targets.sort(fn);
    return targets;
  },
  /**
   * Get data.order compare function
   * @param {boolean} isReversed for Arc & Treemap type sort order needs to be reversed
   * @returns {Function} compare function
   * @private
   */
  getSortCompareFn(isReversed = false) {
    const $$ = this;
    const { config } = $$;
    const order = config.data_order;
    const orderAsc = /asc/i.test(order);
    const orderDesc = /desc/i.test(order);
    let fn;
    if (orderAsc || orderDesc) {
      const reducer = (p, c) => p + Math.abs(c.value);
      const sum = (v) => isNumber(v) ? v : "values" in v ? v.values.reduce(reducer, 0) : v.value;
      fn = (t1, t2) => {
        const t1Sum = sum(t1);
        const t2Sum = sum(t2);
        return isReversed ? orderAsc ? t1Sum - t2Sum : t2Sum - t1Sum : orderAsc ? t2Sum - t1Sum : t1Sum - t2Sum;
      };
    } else if (isFunction(order)) {
      fn = order.bind($$.api);
    }
    return fn || null;
  },
  filterByX(targets, x) {
    return mergeArray(targets.map((t) => t.values)).filter((v) => v.x - x === 0);
  },
  filterRemoveNull(data) {
    return data.filter((d) => isValue(this.getBaseValue(d)));
  },
  filterByXDomain(targets, xDomain) {
    return targets.map((t) => ({
      id: t.id,
      id_org: t.id_org,
      values: t.values.filter((v) => xDomain[0] <= v.x && v.x <= xDomain[1])
    }));
  },
  hasDataLabel() {
    const dataLabels = this.config.data_labels;
    return isBoolean(dataLabels) && dataLabels || isObjectType(dataLabels) && notEmpty(dataLabels);
  },
  /**
   * Determine if has null value
   * @param {Array} targets Data array to be evaluated
   * @returns {boolean}
   * @private
   */
  hasNullDataValue(targets) {
    return targets.some(({ value }) => value === null);
  },
  /**
   * Get data index from the event coodinates
   * @param {Event} event Event object
   * @returns {number}
   * @private
   */
  getDataIndexFromEvent(event) {
    const $$ = this;
    const { $el, config, state: { hasRadar, inputType, eventReceiver: { coords, rect } } } = $$;
    let index;
    if (hasRadar) {
      let target = event.target;
      if (/tspan/i.test(target.tagName)) {
        target = target.parentNode;
      }
      const d = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(target).datum();
      index = d && Object.keys(d).length === 1 ? d.index : void 0;
    } else {
      const isRotated = config.axis_rotated;
      const scrollPos = getScrollPosition($el.chart.node());
      const e = inputType === "touch" && event.changedTouches ? event.changedTouches[0] : event;
      index = findIndex(
        coords,
        isRotated ? e.clientY + scrollPos.y - rect.top : e.clientX + scrollPos.x - rect.left,
        0,
        coords.length - 1,
        isRotated
      );
    }
    return index;
  },
  getDataLabelLength(min, max, key) {
    const $$ = this;
    const lengths = [0, 0];
    const paddingCoef = 1.3;
    $$.$el.chart.select("svg").selectAll(".dummy").data([min, max]).enter().append("text").text((d) => $$.dataLabelFormat(d.id)(d)).each(function(d, i) {
      lengths[i] = this.getBoundingClientRect()[key] * paddingCoef;
    }).remove();
    return lengths;
  },
  isNoneArc(d) {
    return this.hasTarget(this.data.targets, d.id);
  },
  isArc(d) {
    return "data" in d && this.hasTarget(this.data.targets, d.data.id);
  },
  findSameXOfValues(values, index) {
    const targetX = values[index].x;
    const sames = [];
    let i;
    for (i = index - 1; i >= 0; i--) {
      if (targetX !== values[i].x) {
        break;
      }
      sames.push(values[i]);
    }
    for (i = index; i < values.length; i++) {
      if (targetX !== values[i].x) {
        break;
      }
      sames.push(values[i]);
    }
    return sames;
  },
  findClosestFromTargets(targets, pos) {
    const $$ = this;
    const candidates = targets.map((target) => $$.findClosest(target.values, pos));
    return $$.findClosest(candidates, pos);
  },
  findClosest(values, pos) {
    const $$ = this;
    const { $el: { main } } = $$;
    const data = values.filter((v) => v && isValue(v.value));
    let minDist;
    let closest;
    data.filter((v) => $$.isBarType(v.id) || $$.isCandlestickType(v.id)).forEach((v) => {
      const selector = $$.isBarType(v.id) ? `.${$BAR.chartBar}.${$COMMON.target}${$$.getTargetSelectorSuffix(v.id)} .${$BAR.bar}-${v.index}` : `.${$CANDLESTICK.chartCandlestick}.${$COMMON.target}${$$.getTargetSelectorSuffix(v.id)} .${$CANDLESTICK.candlestick}-${v.index} path`;
      if (!closest && $$.isWithinBar(main.select(selector).node())) {
        closest = v;
      }
    });
    data.filter((v) => !$$.isBarType(v.id) && !$$.isCandlestickType(v.id)).forEach((v) => {
      const d = $$.dist(v, pos);
      minDist = $$.getPointSensitivity(v);
      if (d < minDist) {
        minDist = d;
        closest = v;
      }
    });
    return closest;
  },
  dist(data, pos) {
    const $$ = this;
    const { config: { axis_rotated: isRotated }, scale } = $$;
    const xIndex = +isRotated;
    const yIndex = +!isRotated;
    const y = $$.circleY(data, data.index);
    const x = (scale.zoom || scale.x)(data.x);
    return Math.sqrt(Math.pow(x - pos[xIndex], 2) + Math.pow(y - pos[yIndex], 2));
  },
  /**
   * Convert data for step type
   * @param {Array} values Object data values
   * @returns {Array}
   * @private
   */
  convertValuesToStep(values) {
    const $$ = this;
    const { axis, config } = $$;
    const stepType = config.line_step_type;
    const isCategorized = axis ? axis.isCategorized() : false;
    const converted = isArray(values) ? values.concat() : [values];
    if (!(isCategorized || /step\-(after|before)/.test(stepType))) {
      return values;
    }
    if (converted.length) {
      const head = converted[0];
      const tail = converted[converted.length - 1];
      const { id } = head;
      let { x } = head;
      converted.unshift({ x: --x, value: head.value, id });
      isCategorized && stepType === "step-after" && converted.unshift({ x: --x, value: head.value, id });
      x = tail.x;
      converted.push({ x: ++x, value: tail.value, id });
      isCategorized && stepType === "step-before" && converted.push({ x: ++x, value: tail.value, id });
    }
    return converted;
  },
  convertValuesToRange(values) {
    const converted = isArray(values) ? values.concat() : [values];
    const ranges = [];
    converted.forEach((range) => {
      const { x, id } = range;
      ranges.push({
        x,
        id,
        value: range.value[0]
      });
      ranges.push({
        x,
        id,
        value: range.value[2]
      });
    });
    return ranges;
  },
  updateDataAttributes(name, attrs) {
    const $$ = this;
    const { config } = $$;
    const current = config[`data_${name}`];
    if (isUndefined(attrs)) {
      return current;
    }
    Object.keys(attrs).forEach((id) => {
      current[id] = attrs[id];
    });
    $$.redraw({ withLegend: true });
    return current;
  },
  getRangedData(d, key = "", type = "areaRange") {
    const value = d == null ? void 0 : d.value;
    if (isArray(value)) {
      if (type === "bar") {
        return value.reduce((a, c) => c - a);
      } else {
        const index = {
          areaRange: ["high", "mid", "low"],
          candlestick: ["open", "high", "low", "close", "volume"]
        }[type].indexOf(key);
        return index >= 0 && value ? value[index] : void 0;
      }
    } else if (value && key) {
      return value[key];
    }
    return value;
  },
  /**
   * Set ratio for grouped data
   * @param {Array} data Data array
   * @private
   */
  setRatioForGroupedData(data) {
    const $$ = this;
    const { config } = $$;
    if (config.data_groups.length && data.some((d) => $$.isGrouped(d.id))) {
      const setter = (d) => $$.getRatio("index", d, true);
      data.forEach((v) => {
        "values" in v ? v.values.forEach(setter) : setter(v);
      });
    }
  },
  /**
   * Get ratio value
   * @param {string} type Ratio for given type
   * @param {object} d Data value object
   * @param {boolean} asPercent Convert the return as percent or not
   * @returns {number} Ratio value
   * @private
   */
  getRatio(type, d, asPercent = false) {
    const $$ = this;
    const { config, state } = $$;
    const api = $$.api;
    let ratio = 0;
    if (d && api.data.shown().length) {
      ratio = d.ratio || d.value;
      if (type === "arc") {
        if ($$.pie.padAngle()()) {
          ratio = d.value / $$.getTotalDataSum(true);
        } else {
          const gaugeArcLength = config.gauge_fullCircle ? $$.getArcLength() : $$.getStartingAngle() * -2;
          const arcLength = $$.hasType("gauge") ? gaugeArcLength : Math.PI * 2;
          ratio = (d.endAngle - d.startAngle) / arcLength;
        }
      } else if (type === "index") {
        const dataValues = api.data.values.bind(api);
        let total = this.getTotalPerIndex();
        if (state.hiddenTargetIds.length) {
          let hiddenSum = dataValues(state.hiddenTargetIds, false);
          if (hiddenSum.length) {
            hiddenSum = hiddenSum.reduce(
              (acc, curr) => acc.map((v, i) => (isNumber(v) ? v : 0) + curr[i])
            );
            total = total.map((v, i) => v - hiddenSum[i]);
          }
        }
        const divisor = total[d.index];
        d.ratio = isNumber(d.value) && total && divisor ? d.value / divisor : 0;
        ratio = d.ratio;
      } else if (type === "radar") {
        ratio = parseFloat(String(Math.max(d.value, 0))) / state.current.dataMax * config.radar_size_ratio;
      } else if (type === "bar") {
        const yScale = $$.getYScaleById.bind($$)(d.id);
        const max = yScale.domain().reduce((a, c) => c - a);
        ratio = max === 0 ? 0 : Math.abs(
          $$.getRangedData(d, null, type) / max
        );
      } else if (type === "treemap") {
        ratio /= $$.getTotalDataSum(true);
      }
    }
    return asPercent && ratio ? ratio * 100 : ratio;
  },
  /**
   * Sort data index to be aligned with x axis.
   * @param {Array} tickValues Tick array values
   * @private
   */
  updateDataIndexByX(tickValues) {
    const $$ = this;
    const tickValueMap = tickValues.reduce((out, tick, index) => {
      out[Number(tick.x)] = index;
      return out;
    }, {});
    $$.data.targets.forEach((t) => {
      t.values.forEach((value, valueIndex) => {
        let index = tickValueMap[Number(value.x)];
        if (index === void 0) {
          index = valueIndex;
        }
        value.index = index;
      });
    });
  },
  /**
   * Determine if bubble has dimension data
   * @param {object|Array} d data value
   * @returns {boolean}
   * @private
   */
  isBubbleZType(d) {
    const $$ = this;
    return $$.isBubbleType(d) && (isObject(d.value) && ("z" in d.value || "y" in d.value) || isArray(d.value) && d.value.length >= 2);
  },
  /**
   * Determine if bar has ranged data
   * @param {Array} d data value
   * @returns {boolean}
   * @private
   */
  isBarRangeType(d) {
    const $$ = this;
    const { value } = d;
    return $$.isBarType(d) && isArray(value) && value.length >= 2 && value.every((v) => isNumber(v));
  },
  /**
   * Get data object by id
   * @param {string} id data id
   * @returns {object}
   * @private
   */
  getDataById(id) {
    var _a;
    const d = this.cache.get(id) || this.api.data(id);
    return (_a = d == null ? void 0 : d[0]) != null ? _a : d;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/data/load.ts


function callDone(fn, resizeAfter = false) {
  const $$ = this;
  const { api } = $$;
  resizeAfter && $$.api.flush(true);
  fn == null ? void 0 : fn.call(api);
}
/* harmony default export */ var load = ({
  load(rawTargets, args) {
    const $$ = this;
    const { axis, data, org, scale } = $$;
    const { append } = args;
    const zoomState = {
      domain: null,
      currentDomain: null,
      x: null
    };
    let targets = rawTargets;
    if (targets) {
      if (args.filter) {
        targets = targets.filter(args.filter);
      }
      if (args.type || args.types) {
        targets.forEach((t) => {
          var _a;
          const type = ((_a = args.types) == null ? void 0 : _a[t.id]) || args.type;
          $$.setTargetType(t.id, type);
        });
      }
      data.targets.forEach((d) => {
        for (let i = 0; i < targets.length; i++) {
          if (d.id === targets[i].id) {
            d.values = append ? d.values.concat(targets[i].values) : targets[i].values;
            targets.splice(i, 1);
            break;
          }
        }
      });
      data.targets = data.targets.concat(targets);
    }
    $$.updateTargets(data.targets);
    if (scale.zoom) {
      zoomState.x = axis.isCategorized() ? scale.x.orgScale() : (org.xScale || scale.x).copy();
      zoomState.domain = $$.getXDomain(data.targets);
      zoomState.x.domain(zoomState.domain);
      zoomState.currentDomain = $$.zoom.getDomain();
      if (!$$.withinRange(zoomState.currentDomain, void 0, zoomState.domain)) {
        scale.x.domain(zoomState.domain);
        scale.zoom = null;
        $$.$el.eventRect.property("__zoom", null);
      }
    }
    $$.redraw({
      withUpdateOrgXDomain: true,
      withUpdateXDomain: true,
      withLegend: true
    });
    if (scale.zoom) {
      org.xDomain = zoomState.domain;
      org.xScale = zoomState.x;
      if (axis.isCategorized()) {
        zoomState.currentDomain = $$.getZoomDomainValue(zoomState.currentDomain);
        org.xDomain = $$.getZoomDomainValue(org.xDomain);
        org.xScale = zoomState.x.domain(org.xDomain);
      }
      $$.updateCurrentZoomTransform(zoomState.x, zoomState.currentDomain);
    }
    $$.updateTypesElements();
    callDone.call($$, args.done, args.resizeAfter);
  },
  loadFromArgs(args) {
    const $$ = this;
    if (!$$.config) {
      return;
    }
    $$.cache.reset();
    $$.convertData(args, (d) => {
      const data = args.data || d;
      args.append && (data.__append__ = true);
      data && $$.load($$.convertDataToTargets(data), args);
    });
  },
  unload(rawTargetIds, customDoneCb) {
    var _a;
    const $$ = this;
    const { state, $el, $T } = $$;
    const hasLegendDefsPoint = !!((_a = $$.hasLegendDefsPoint) == null ? void 0 : _a.call($$));
    let done = customDoneCb;
    let targetIds = rawTargetIds;
    $$.cache.reset();
    if (!done) {
      done = () => {
      };
    }
    targetIds = targetIds.filter((id) => $$.hasTarget($$.data.targets, id));
    if (!targetIds || targetIds.length === 0) {
      done();
      return;
    }
    const targets = $el.svg.selectAll(targetIds.map((id) => $$.selectorTarget(id)));
    $T(targets).style("opacity", "0").remove().call(endall, done);
    targetIds.forEach((id) => {
      var _a2;
      const suffixId = $$.getTargetSelectorSuffix(id);
      state.withoutFadeIn[id] = false;
      if ($el.legend) {
        $el.legend.selectAll(`.${$LEGEND.legendItem}${suffixId}`).remove();
      }
      $$.data.targets = $$.data.targets.filter((t) => t.id !== id);
      hasLegendDefsPoint && ((_a2 = $el.defs) == null ? void 0 : _a2.select(`#${$$.getDefsPointId(suffixId)}`).remove());
    });
    state.hasFunnel && $$.updateFunnel($$.data.targets);
    state.hasTreemap && $$.updateTargetsForTreemap($$.data.targets);
    $$.updateTypesElements();
  }
});

// EXTERNAL MODULE: external {"commonjs":"d3-drag","commonjs2":"d3-drag","amd":"d3-drag","root":"d3"}
var external_commonjs_d3_drag_commonjs2_d3_drag_amd_d3_drag_root_d3_ = __webpack_require__(6);
;// CONCATENATED MODULE: ./src/ChartInternal/interactions/interaction.ts





/* harmony default export */ var interactions_interaction = ({
  /**
   * Expand data shape/point
   * @param {number} index Index number
   * @param {string} id Data id
   * @param {boolean} reset Reset expand state
   * @private
   */
  setExpand(index, id, reset) {
    const $$ = this;
    const { config, $el: { circle } } = $$;
    circle && config.point_focus_expand_enabled && $$.expandCircles(index, id, reset);
    $$.expandBarTypeShapes(true, index, id, reset);
  },
  /**
   * Expand/Unexpand bar type shapes
   * @param {boolean} expand Expand or unexpand
   * @param {number} i Shape index
   * @param {string} id Data id
   * @param {boolean} reset Reset expand style
   * @private
   */
  expandBarTypeShapes(expand = true, i, id, reset) {
    const $$ = this;
    ["bar", "candlestick"].filter((v) => $$.$el[v]).forEach((v) => {
      reset && $$.$el[v].classed($COMMON.EXPANDED, false);
      $$.getShapeByIndex(v, i, id).classed($COMMON.EXPANDED, expand);
    });
  },
  /**
   * Handle data.onover/out callback options
   * @param {boolean} isOver Over or not
   * @param {number|object} d data object
   * @private
   */
  setOverOut(isOver, d) {
    const $$ = this;
    const { config, state: { hasFunnel, hasRadar, hasTreemap }, $el: { main } } = $$;
    const isArcishData = isObject(d);
    if (isArcishData || d !== -1) {
      const callback = config[isOver ? "data_onover" : "data_onout"].bind($$.api);
      config.color_onover && $$.setOverColor(isOver, d, isArcishData);
      if (isArcishData && "id") {
        const suffix = $$.getTargetSelectorSuffix(d.id);
        const selector = hasFunnel || hasTreemap ? `${$COMMON.target + suffix} .${$SHAPE.shape}` : $ARC.arc + suffix;
        callback(d, main.select(`.${selector}`).node());
      } else if (!config.tooltip_grouped) {
        const last = $$.cache.get(KEY.setOverOut) || [];
        const shapesAtIndex = main.selectAll(`.${$SHAPE.shape}-${d}`).filter(function(d2) {
          return $$.isWithinShape(this, d2);
        });
        const shape = shapesAtIndex.filter(function() {
          return last.every((v) => v !== this);
        });
        if (!isOver || shapesAtIndex.empty() || last.length === shape.size() && shape.nodes().every((v, i) => v !== last[i])) {
          while (last.length) {
            const target = last.pop();
            config.data_onout.bind($$.api)((0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(target).datum(), target);
          }
        }
        shape.each(function() {
          if (isOver) {
            callback((0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).datum(), this);
            last.push(this);
          }
        });
        $$.cache.add(KEY.setOverOut, last);
      } else {
        if (isOver) {
          hasRadar && $$.isPointFocusOnly() ? $$.showCircleFocus($$.getAllValuesOnIndex(d, true)) : $$.setExpand(d, null, true);
        }
        !$$.isMultipleX() && main.selectAll(`.${$SHAPE.shape}-${d}`).each(function(d2) {
          callback(d2, this);
        });
      }
    }
  },
  /**
   * Call data.onover/out callback for touch event
   * @param {number|object} d target index or data object for Arc type
   * @private
   */
  callOverOutForTouch(d) {
    const $$ = this;
    const last = $$.cache.get(KEY.callOverOutForTouch);
    if (isObject(d) && last ? d.id !== last.id : d !== last) {
      (last || isNumber(last)) && $$.setOverOut(false, last);
      (d || isNumber(d)) && $$.setOverOut(true, d);
      $$.cache.add(KEY.callOverOutForTouch, d);
    }
  },
  /**
   * Return draggable selection function
   * @returns {Function}
   * @private
   */
  getDraggableSelection() {
    const $$ = this;
    const { config, state } = $$;
    return config.interaction_enabled && config.data_selection_draggable && $$.drag ? (0,external_commonjs_d3_drag_commonjs2_d3_drag_amd_d3_drag_root_d3_.drag)().on("drag", function(event) {
      state.event = event;
      $$.drag(getPointer(event, this));
    }).on("start", function(event) {
      state.event = event;
      $$.dragstart(getPointer(event, this));
    }).on("end", (event) => {
      state.event = event;
      $$.dragend();
    }) : () => {
    };
  },
  /**
   * Dispatch a mouse event.
   * @private
   * @param {string} type event type
   * @param {number} index Index of eventRect
   * @param {Array} mouse x and y coordinate value
   */
  dispatchEvent(type, index, mouse) {
    var _a, _b;
    const $$ = this;
    const {
      config,
      state: {
        eventReceiver,
        hasAxis,
        hasFunnel,
        hasRadar,
        hasTreemap
      },
      $el: { eventRect, funnel, radar, treemap }
    } = $$;
    let element = (_b = (hasFunnel || hasTreemap) && eventReceiver.rect || hasRadar && radar.axes.select(`.${$AXIS.axis}-${index} text`) || (eventRect || ((_a = $$.getArcElementByIdOrIndex) == null ? void 0 : _a.call($$, index)))) == null ? void 0 : _b.node();
    if (element) {
      const isMultipleX = $$.isMultipleX();
      const isRotated = config.axis_rotated;
      let { width, left, top } = element.getBoundingClientRect();
      if (hasAxis && !hasRadar && !isMultipleX) {
        const coords = eventReceiver.coords[index];
        if (coords) {
          width = coords.w;
          left += coords.x;
          top += coords.y;
        } else {
          width = 0;
          left = 0;
          top = 0;
        }
      }
      const x = left + (mouse ? mouse[0] : 0) + (isMultipleX || isRotated ? 0 : width / 2);
      const y = top + (mouse ? mouse[1] : 0) + (isRotated ? 4 : 0);
      const params = {
        screenX: x,
        screenY: y,
        clientX: x,
        clientY: y,
        bubbles: hasRadar
        // radar type needs to bubble up event
      };
      if (hasFunnel || hasTreemap) {
        element = (funnel != null ? funnel : treemap).node();
      }
      emulateEvent[/^(mouse|click)/.test(type) ? "mouse" : "touch"](
        element,
        type,
        params
      );
    }
  },
  setDragStatus(isDragging) {
    this.state.dragging = isDragging;
  },
  /**
   * Unbind zoom events
   * @private
   */
  unbindZoomEvent() {
    const $$ = this;
    const { $el: { eventRect, zoomResetBtn } } = $$;
    eventRect == null ? void 0 : eventRect.on(".zoom wheel.zoom .drag", null);
    zoomResetBtn == null ? void 0 : zoomResetBtn.on("click", null).style("display", "none");
  },
  /**
   * Unbind all attached events
   * @private
   */
  unbindAllEvents() {
    var _a;
    const $$ = this;
    const { $el: { arcs, eventRect, legend, region, svg, treemap }, brush } = $$;
    const list = [
      "wheel",
      "click",
      "mouseover",
      "mousemove",
      "mouseout",
      "touchstart",
      "touchmove",
      "touchend",
      "touchstart.eventRect",
      "touchmove.eventRect",
      "touchend.eventRect",
      ".brush",
      ".drag",
      ".zoom",
      "wheel.zoom",
      "dblclick.zoom"
    ].join(" ");
    [
      svg,
      eventRect,
      region == null ? void 0 : region.list,
      brush == null ? void 0 : brush.getSelection(),
      arcs == null ? void 0 : arcs.selectAll("path"),
      legend == null ? void 0 : legend.selectAll("g"),
      treemap
    ].forEach((v) => v == null ? void 0 : v.on(list, null));
    (_a = $$.unbindZoomEvent) == null ? void 0 : _a.call($$);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/category.ts
/* harmony default export */ var category = ({
  /**
   * Category Name
   * @param {number} i Index number
   * @returns {string} category Name
   * @private
   */
  categoryName(i) {
    var _a;
    const { axis_x_categories } = this.config;
    return (_a = axis_x_categories == null ? void 0 : axis_x_categories[i]) != null ? _a : i;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/class.ts

/* harmony default export */ var internals_class = ({
  generateClass(prefix, targetId) {
    return ` ${prefix} ${prefix + this.getTargetSelectorSuffix(targetId)}`;
  },
  /**
   * Get class string
   * @param {string} type Shape type
   * @param {boolean} withShape Get with shape prefix
   * @returns {string} Class string
   * @private
   */
  getClass(type, withShape) {
    const isPlural = /s$/.test(type);
    const useIdKey = /^(area|arc|line|funnel|treemap)s?$/.test(type);
    const key = isPlural ? "id" : "index";
    return (d) => {
      const data = d.data || d;
      const result = (withShape ? this.generateClass(classes[isPlural ? "shapes" : "shape"], data[key]) : "") + this.generateClass(classes[type], data[useIdKey ? "id" : key]);
      return result.trim();
    };
  },
  /**
   * Get chart class string
   * @param {string} type Shape type
   * @returns {string} Class string
   * @private
   */
  getChartClass(type) {
    return (d) => classes[`chart${type}`] + this.classTarget((d.data ? d.data : d).id);
  },
  generateExtraLineClass() {
    const $$ = this;
    const classes = $$.config.line_classes || [];
    const ids = [];
    return function(d) {
      var _a;
      const id = d.id || ((_a = d.data) == null ? void 0 : _a.id) || d;
      if (ids.indexOf(id) < 0) {
        ids.push(id);
      }
      return classes[ids.indexOf(id) % classes.length];
    };
  },
  classRegion(d, i) {
    return `${this.generateClass(classes.region, i)} ${"class" in d ? d.class : ""}`;
  },
  classTarget(id) {
    const additionalClassSuffix = this.config.data_classes[id];
    let additionalClass = "";
    if (additionalClassSuffix) {
      additionalClass = ` ${classes.target}-${additionalClassSuffix}`;
    }
    return this.generateClass(classes.target, id) + additionalClass;
  },
  classFocus(d) {
    return this.classFocused(d) + this.classDefocused(d);
  },
  classFocused(d) {
    return ` ${this.state.focusedTargetIds.indexOf(d.id) >= 0 ? classes.focused : ""}`;
  },
  classDefocused(d) {
    return ` ${this.state.defocusedTargetIds.indexOf(d.id) >= 0 ? classes.defocused : ""}`;
  },
  getTargetSelectorSuffix(targetId) {
    const targetStr = targetId || targetId === 0 ? `-${targetId}` : "";
    return targetStr.replace(/[\x00-\x20\x7F-\xA0\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g, "-");
  },
  selectorTarget(id, prefix = "", postfix = "") {
    const target = this.getTargetSelectorSuffix(id);
    return `${prefix}.${classes.target + target} ${postfix}, ${prefix}.${classes.circles + target} ${postfix}`;
  },
  selectorTargets(idsValue, prefix) {
    const ids = idsValue || [];
    return ids.length ? ids.map((id) => this.selectorTarget(id, prefix)) : null;
  },
  selectorLegend(id) {
    return `.${classes.legendItem + this.getTargetSelectorSuffix(id)}`;
  },
  selectorLegends(ids) {
    return (ids == null ? void 0 : ids.length) ? ids.map((id) => this.selectorLegend(id)) : null;
  }
});

// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(7);
;// CONCATENATED MODULE: ./src/ChartInternal/internals/color.ts






const colorizePattern = (pattern, color, id) => {
  const node = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(pattern.cloneNode(true));
  node.attr("id", id).insert("rect", ":first-child").attr("width", node.attr("width")).attr("height", node.attr("height")).style("fill", color);
  return {
    id,
    node: node.node()
  };
};
function getColorFromCss(element) {
  const cacheKey = KEY.colorPattern;
  const { body } = browser_doc;
  let pattern = body[cacheKey];
  if (!pattern) {
    const delimiter = ";";
    const content = element.classed($COLOR.colorPattern, true).style("background-image");
    element.classed($COLOR.colorPattern, false);
    if (content.indexOf(delimiter) > -1) {
      pattern = content.replace(/url[^#]*|["'()]|(\s|%20)/g, "").split(delimiter).map((v) => v.trim().replace(/[\"'\s]/g, "")).filter(Boolean);
      body[cacheKey] = pattern;
    }
  }
  return pattern;
}
const schemeCategory10 = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf"
];
/* harmony default export */ var internals_color = ({
  generateColor() {
    const $$ = this;
    const { $el, config } = $$;
    const colors = config.data_colors;
    const callback = config.data_color;
    const ids = [];
    let pattern = notEmpty(config.color_pattern) ? config.color_pattern : (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleOrdinal)(getColorFromCss($el.chart) || schemeCategory10).range();
    const originalColorPattern = pattern;
    if (isFunction(config.color_tiles)) {
      const tiles = config.color_tiles.bind($$.api)();
      const colorizedPatterns = pattern.map((p, index) => {
        const color = p.replace(/[#\(\)\s,]/g, "");
        const id = `${$$.state.datetimeId}-pattern-${color}-${index}`;
        return colorizePattern(tiles[index % tiles.length], p, id);
      });
      pattern = colorizedPatterns.map((p) => `url(#${p.id})`);
      $$.patterns = colorizedPatterns;
    }
    return function(d) {
      var _a;
      const id = d.id || ((_a = d.data) == null ? void 0 : _a.id) || d;
      const isLine = $$.isTypeOf(id, ["line", "spline", "step"]) || !config.data_types[id];
      let color;
      if (isFunction(colors[id])) {
        color = colors[id].bind($$.api)(d);
      } else if (colors[id]) {
        color = colors[id];
      } else {
        if (ids.indexOf(id) < 0) {
          ids.push(id);
        }
        color = isLine ? originalColorPattern[ids.indexOf(id) % originalColorPattern.length] : pattern[ids.indexOf(id) % pattern.length];
        colors[id] = color;
      }
      return isFunction(callback) ? callback.bind($$.api)(color, d) : color;
    };
  },
  generateLevelColor() {
    const $$ = this;
    const { config } = $$;
    const colors = config.color_pattern;
    const threshold = config.color_threshold;
    const asValue = threshold.unit === "value";
    const max = threshold.max || 100;
    const values = threshold.values && threshold.values.length ? threshold.values : [];
    return notEmpty(threshold) ? function(value) {
      const v = asValue ? value : value * 100 / max;
      let color = colors[colors.length - 1];
      for (let i = 0, l = values.length; i < l; i++) {
        if (v <= values[i]) {
          color = colors[i];
          break;
        }
      }
      return color;
    } : null;
  },
  /**
   * Append data backgound color filter definition
   * @param {string|object} color Color string
   * @param {object} attr filter attribute
   * @private
   */
  generateTextBGColorFilter(color, attr = {
    x: 0,
    y: 0,
    width: 1,
    height: 1
  }) {
    const $$ = this;
    const { $el, state } = $$;
    if (color) {
      let ids = [];
      if (isString(color)) {
        ids.push("");
      } else if (isObject(color)) {
        ids = Object.keys(color);
      }
      ids.forEach((v) => {
        const id = `${state.datetimeId}-labels-bg${$$.getTargetSelectorSuffix(v)}${isString(color) ? $$.getTargetSelectorSuffix(color) : ""}`;
        $el.defs.append("filter").attr("x", attr.x).attr("y", attr.y).attr("width", attr.width).attr("height", attr.height).attr("id", id).html(
          `<feFlood flood-color="${v === "" ? color : color[v]}" />
						<feComposite in="SourceGraphic" />`
        );
      });
    }
  },
  /**
   * Get data gradient color url
   * @param {string} id Data id
   * @returns {string}
   * @private
   */
  getGradienColortUrl(id) {
    return `url(#${this.state.datetimeId}-gradient${this.getTargetSelectorSuffix(id)})`;
  },
  /**
   * Update linear/radial gradient definition
   * - linear: area & bar only
   * - radial: type which has data points only
   * @private
   */
  updateLinearGradient() {
    const $$ = this;
    const { config, data: { targets }, state: { datetimeId }, $el: { defs } } = $$;
    targets.forEach((d) => {
      const id = `${datetimeId}-gradient${$$.getTargetSelectorSuffix(d.id)}`;
      const radialGradient = $$.hasPointType() && config.point_radialGradient;
      const supportedType = $$.isAreaType(d) && "area" || $$.isBarType(d) && "bar";
      if ((radialGradient || supportedType) && defs.select(`#${id}`).empty()) {
        const color = $$.color(d);
        const gradient = {
          defs: null,
          stops: []
        };
        if (radialGradient) {
          const {
            cx = 0.3,
            cy = 0.3,
            r = 0.7,
            stops = [[0.1, color, 0], [0.9, color, 1]]
          } = radialGradient;
          gradient.stops = stops;
          gradient.defs = defs.append("radialGradient").attr("id", `${id}`).attr("cx", cx).attr("cy", cy).attr("r", r);
        } else {
          const isRotated = config.axis_rotated;
          const {
            x = isRotated ? [1, 0] : [0, 0],
            y = isRotated ? [0, 0] : [0, 1],
            stops = [[0, color, 1], [1, color, 0]]
          } = config[`${supportedType}_linearGradient`];
          gradient.stops = stops;
          gradient.defs = defs.append("linearGradient").attr("id", `${id}`).attr("x1", x[0]).attr("x2", x[1]).attr("y1", y[0]).attr("y2", y[1]);
        }
        gradient.stops.forEach((v) => {
          const [offset, stopColor, stopOpacity] = v;
          const colorValue = isFunction(stopColor) ? stopColor.bind($$.api)(d.id) : stopColor;
          gradient.defs && gradient.defs.append("stop").attr("offset", offset).attr("stop-color", colorValue || color).attr("stop-opacity", stopOpacity);
        });
      }
    });
  },
  /**
   * Set the data over color.
   * When is out, will restate in its previous color value
   * @param {boolean} isOver true: set overed color, false: restore
   * @param {number|object} d target index or data object for Arc type
   * @private
   */
  setOverColor(isOver, d) {
    const $$ = this;
    const { config, $el: { main } } = $$;
    const onover = config.color_onover;
    let color = isOver ? onover : $$.color;
    if (isObject(color)) {
      color = ({ id }) => id in onover ? onover[id] : $$.color(id);
    } else if (isString(color)) {
      color = () => onover;
    } else if (isFunction(onover)) {
      color = color.bind($$.api);
    }
    main.selectAll(
      isObject(d) ? (
        // when is Arc type
        `.${$ARC.arc}${$$.getTargetSelectorSuffix(d.id)}`
      ) : `.${$SHAPE.shape}-${d}`
    ).style("fill", color);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/domain.ts


/* harmony default export */ var domain = ({
  getYDomainMinMax(targets, type) {
    const $$ = this;
    const { axis, config } = $$;
    const isMin = type === "min";
    const dataGroups = config.data_groups;
    const ids = $$.mapToIds(targets);
    const ys = $$.getValuesAsIdKeyed(targets);
    if (dataGroups.length > 0) {
      const hasValue = $$[`has${isMin ? "Negative" : "Positive"}ValueInTargets`](targets);
      dataGroups.forEach((groupIds) => {
        const idsInGroup = groupIds.filter((v) => ids.indexOf(v) >= 0);
        if (idsInGroup.length) {
          const baseId = idsInGroup[0];
          const baseAxisId = axis.getId(baseId);
          if (hasValue && ys[baseId]) {
            ys[baseId] = ys[baseId].map((v) => (isMin ? v < 0 : v > 0) ? v : 0);
          }
          idsInGroup.filter((v, i) => i > 0).forEach((id) => {
            if (ys[id]) {
              const axisId = axis.getId(id);
              ys[id].forEach((v, i) => {
                const val = +v;
                const meetCondition = isMin ? val > 0 : val < 0;
                if (axisId === baseAxisId && !(hasValue && meetCondition)) {
                  ys[baseId][i] += val;
                }
              });
            }
          });
        }
      });
    }
    return getMinMax(type, Object.keys(ys).map((key) => getMinMax(type, ys[key])));
  },
  /**
   * Check if hidden targets bound to the given axis id
   * @param {string} id ID to be checked
   * @returns {boolean}
   * @private
   */
  isHiddenTargetWithYDomain(id) {
    const $$ = this;
    return $$.state.hiddenTargetIds.some((v) => $$.axis.getId(v) === id);
  },
  getYDomain(targets, axisId, xDomain) {
    const $$ = this;
    const { axis, config, scale } = $$;
    const pfx = `axis_${axisId}`;
    if ($$.isStackNormalized()) {
      return [0, 100];
    }
    const isLog = (scale == null ? void 0 : scale[axisId]) && scale[axisId].type === "log";
    const targetsByAxisId = targets.filter((t) => axis.getId(t.id) === axisId);
    const yTargets = xDomain ? $$.filterByXDomain(targetsByAxisId, xDomain) : targetsByAxisId;
    if (yTargets.length === 0) {
      if ($$.isHiddenTargetWithYDomain(axisId)) {
        return scale[axisId].domain();
      } else {
        return axisId === "y2" ? scale.y.domain() : (
          // When all data bounds to y2, y Axis domain is called prior y2.
          // So, it needs to call to get y2 domain here
          $$.getYDomain(targets, "y2", xDomain)
        );
      }
    }
    const yMin = config[`${pfx}_min`];
    const yMax = config[`${pfx}_max`];
    const center = config[`${pfx}_center`];
    const isInverted = config[`${pfx}_inverted`];
    const showHorizontalDataLabel = $$.hasDataLabel() && config.axis_rotated;
    const showVerticalDataLabel = $$.hasDataLabel() && !config.axis_rotated;
    let yDomainMin = $$.getYDomainMinMax(yTargets, "min");
    let yDomainMax = $$.getYDomainMinMax(yTargets, "max");
    let isZeroBased = [TYPE.BAR, TYPE.BUBBLE, TYPE.SCATTER, ...TYPE_BY_CATEGORY.Line].some((v) => {
      const type = v.indexOf("area") > -1 ? "area" : v;
      return $$.hasType(v, yTargets, true) && config[`${type}_zerobased`];
    });
    yDomainMin = isValue(yMin) ? yMin : isValue(yMax) ? yDomainMin <= yMax ? yDomainMin : yMax - 10 : yDomainMin;
    yDomainMax = isValue(yMax) ? yMax : isValue(yMin) ? yMin <= yDomainMax ? yDomainMax : yMin + 10 : yDomainMax;
    if (isNaN(yDomainMin)) {
      yDomainMin = 0;
    }
    if (isNaN(yDomainMax)) {
      yDomainMax = yDomainMin;
    }
    if (yDomainMin === yDomainMax) {
      yDomainMin < 0 ? yDomainMax = 0 : yDomainMin = 0;
    }
    const isAllPositive = yDomainMin >= 0 && yDomainMax >= 0;
    const isAllNegative = yDomainMin <= 0 && yDomainMax <= 0;
    if (isValue(yMin) && isAllPositive || isValue(yMax) && isAllNegative) {
      isZeroBased = false;
    }
    if (isZeroBased) {
      isAllPositive && (yDomainMin = 0);
      isAllNegative && (yDomainMax = 0);
    }
    const domainLength = Math.abs(yDomainMax - yDomainMin);
    let padding = { top: domainLength * 0.1, bottom: domainLength * 0.1 };
    if (isDefined(center)) {
      const yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));
      yDomainMax = center + yDomainAbs;
      yDomainMin = center - yDomainAbs;
    }
    if (showHorizontalDataLabel) {
      const diff = diffDomain(scale.y.range());
      const ratio = $$.getDataLabelLength(yDomainMin, yDomainMax, "width").map((v) => v / diff);
      ["bottom", "top"].forEach((v, i) => {
        padding[v] += domainLength * (ratio[i] / (1 - ratio[0] - ratio[1]));
      });
    } else if (showVerticalDataLabel) {
      const lengths = $$.getDataLabelLength(yDomainMin, yDomainMax, "height");
      ["bottom", "top"].forEach((v, i) => {
        padding[v] += $$.convertPixelToScale("y", lengths[i], domainLength);
      });
    }
    padding = $$.getResettedPadding(padding);
    const p = config[`${pfx}_padding`];
    if (notEmpty(p)) {
      ["bottom", "top"].forEach((v) => {
        padding[v] = axis.getPadding(p, v, padding[v], domainLength);
      });
    }
    if (isZeroBased) {
      isAllPositive && (padding.bottom = yDomainMin);
      isAllNegative && (padding.top = -yDomainMax);
    }
    const domain = isLog ? [yDomainMin, yDomainMax].map((v) => v < 0 ? 0 : v) : [yDomainMin - padding.bottom, yDomainMax + padding.top];
    return isInverted ? domain.reverse() : domain;
  },
  getXDomainMinMax(targets, type) {
    var _a;
    const $$ = this;
    const configValue = $$.config[`axis_x_${type}`];
    const dataValue = getMinMax(
      type,
      targets.map((t) => getMinMax(type, t.values.map((v) => v.x)))
    );
    let value = isObject(configValue) ? configValue.value : configValue;
    value = isDefined(value) && ((_a = $$.axis) == null ? void 0 : _a.isTimeSeries()) ? parseDate.bind(this)(value) : value;
    if (isObject(configValue) && configValue.fit && (type === "min" && value < dataValue || type === "max" && value > dataValue)) {
      value = void 0;
    }
    return isDefined(value) ? value : dataValue;
  },
  /**
   * Get x Axis padding
   * @param {Array} domain x Axis domain
   * @param {number} tickCount Tick count
   * @returns {object} Padding object values with 'left' & 'right' key
   * @private
   */
  getXDomainPadding(domain, tickCount) {
    const $$ = this;
    const { axis, config } = $$;
    const padding = config.axis_x_padding;
    const isTimeSeriesTickCount = axis.isTimeSeries() && tickCount;
    const diff = diffDomain(domain);
    let defaultValue;
    if (axis.isCategorized() || isTimeSeriesTickCount) {
      defaultValue = 0;
    } else if ($$.hasType("bar")) {
      const maxDataCount = $$.getMaxDataCount();
      defaultValue = maxDataCount > 1 ? diff / (maxDataCount - 1) / 2 : 0.5;
    } else {
      defaultValue = $$.getResettedPadding(diff * 0.01);
    }
    let { left = defaultValue, right = defaultValue } = isNumber(padding) ? { left: padding, right: padding } : padding;
    if (padding.unit === "px") {
      const domainLength = Math.abs(diff + diff * 0.2);
      left = axis.getPadding(padding, "left", defaultValue, domainLength);
      right = axis.getPadding(padding, "right", defaultValue, domainLength);
    } else {
      const range = diff + left + right;
      if (isTimeSeriesTickCount && range) {
        const relativeTickWidth = diff / tickCount / range;
        left = left / range / relativeTickWidth;
        right = right / range / relativeTickWidth;
      }
    }
    return { left, right };
  },
  /**
   * Get x Axis domain
   * @param {Array} targets targets
   * @returns {Array} x Axis domain
   * @private
   */
  getXDomain(targets) {
    const $$ = this;
    const { axis, config, scale: { x } } = $$;
    const isInverted = config.axis_x_inverted;
    const domain = [
      $$.getXDomainMinMax(targets, "min"),
      $$.getXDomainMinMax(targets, "max")
    ];
    let [min = 0, max = 0] = domain;
    if (x.type !== "log") {
      const isCategorized = axis.isCategorized();
      const isTimeSeries = axis.isTimeSeries();
      const padding = $$.getXDomainPadding(domain);
      let [firstX, lastX] = domain;
      if (firstX - lastX === 0 && !isCategorized) {
        if (isTimeSeries) {
          firstX = new Date(firstX.getTime() * 0.5);
          lastX = new Date(lastX.getTime() * 1.5);
        } else {
          firstX = firstX === 0 ? 1 : firstX * 0.5;
          lastX = lastX === 0 ? -1 : lastX * 1.5;
        }
      }
      if (firstX || firstX === 0) {
        min = isTimeSeries ? new Date(firstX.getTime() - padding.left) : firstX - padding.left;
      }
      if (lastX || lastX === 0) {
        max = isTimeSeries ? new Date(lastX.getTime() + padding.right) : lastX + padding.right;
      }
    }
    return isInverted ? [max, min] : [min, max];
  },
  updateXDomain(targets, withUpdateXDomain, withUpdateOrgXDomain, withTrim, domain) {
    var _a;
    const $$ = this;
    const { config, org, scale: { x, subX } } = $$;
    const zoomEnabled = config.zoom_enabled;
    if (withUpdateOrgXDomain) {
      x.domain(domain || sortValue($$.getXDomain(targets), !config.axis_x_inverted));
      org.xDomain = x.domain();
      subX.domain(x.domain());
      (_a = $$.brush) == null ? void 0 : _a.scale(subX);
    }
    if (withUpdateXDomain) {
      const domainValue = domain || (!$$.brush || brushEmpty($$)) ? org.xDomain : getBrushSelection($$).map(subX.invert);
      x.domain(domainValue);
    }
    if (withUpdateOrgXDomain || withUpdateXDomain) {
      zoomEnabled && $$.zoom.updateScaleExtent();
    }
    withTrim && x.domain($$.trimXDomain(x.orgDomain()));
    return x.domain();
  },
  /**
   * Trim x domain when given domain surpasses the range
   * @param {Array} domain Domain value
   * @returns {Array} Trimed domain if given domain is out of range
   * @private
   */
  trimXDomain(domain) {
    const $$ = this;
    const isInverted = $$.config.axis_x_inverted;
    const zoomDomain = $$.getZoomDomain();
    const [min, max] = zoomDomain;
    if (isInverted ? domain[0] >= min : domain[0] <= min) {
      domain[1] = +domain[1] + (min - domain[0]);
      domain[0] = min;
    }
    if (isInverted ? domain[1] <= max : domain[1] >= max) {
      domain[0] = +domain[0] - (domain[1] - max);
      domain[1] = max;
    }
    return domain;
  },
  /**
   * Get subchart/zoom domain
   * @param {string} type "subX" or "zoom"
   * @param {boolean} getCurrent Get current domain if true
   * @returns {Array} zoom domain
   * @private
   */
  getZoomDomain(type = "zoom", getCurrent = false) {
    const $$ = this;
    const { config, scale, org } = $$;
    let [min, max] = getCurrent && scale[type] ? scale[type].domain() : org.xDomain;
    if (type === "zoom") {
      if (isDefined(config.zoom_x_min)) {
        min = getMinMax("min", [min, config.zoom_x_min]);
      }
      if (isDefined(config.zoom_x_max)) {
        max = getMinMax("max", [max, config.zoom_x_max]);
      }
    }
    return [min, max];
  },
  /**
   * Return zoom domain from given domain
   * - 'category' type need to add offset to original value
   * @param {Array} domainValue domain value
   * @returns {Array} Zoom domain
   * @private
   */
  getZoomDomainValue(domainValue) {
    const $$ = this;
    const { config, axis } = $$;
    if (axis.isCategorized() && Array.isArray(domainValue)) {
      const isInverted = config.axis_x_inverted;
      const domain = domainValue.map(
        (v, i) => Number(v) + (i === 0 ? +isInverted : +!isInverted)
      );
      return domain;
    }
    return domainValue;
  },
  /**
   * Converts pixels to axis' scale values
   * @param {string} type Axis type
   * @param {number} pixels Pixels
   * @param {number} domainLength Domain length
   * @returns {number}
   * @private
   */
  convertPixelToScale(type, pixels, domainLength) {
    const $$ = this;
    const { config, state } = $$;
    const isRotated = config.axis_rotated;
    let length;
    if (type === "x") {
      length = isRotated ? "height" : "width";
    } else {
      length = isRotated ? "width" : "height";
    }
    return domainLength * (pixels / state[length]);
  },
  /**
   * Check if the given domain is within subchart/zoom range
   * @param {Array} domain Target domain value
   * @param {Array} current Current subchart/zoom domain value
   * @param {Array} range subchart/zoom range value
   * @returns {boolean}
   * @private
   */
  withinRange(domain, current = [0, 0], range) {
    const $$ = this;
    const isInverted = $$.config.axis_x_inverted;
    const [min, max] = range;
    if (Array.isArray(domain)) {
      const target = [...domain];
      isInverted && target.reverse();
      if (target[0] < target[1]) {
        return domain.every(
          (v, i) => (i === 0 ? isInverted ? +v <= min : +v >= min : isInverted ? +v >= max : +v <= max) && !domain.every((v2, i2) => v2 === current[i2])
        );
      }
    }
    return false;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/format.ts

function getFormat($$, typeValue, v) {
  const { config } = $$;
  const type = `axis_${typeValue}_tick_format`;
  const format = config[type] ? config[type] : $$.defaultValueFormat;
  return format.call($$.api, v);
}
/* harmony default export */ var format = ({
  yFormat(v) {
    return getFormat(this, "y", v);
  },
  y2Format(v) {
    return getFormat(this, "y2", v);
  },
  /**
   * Get default value format function
   * @returns {Function} formatter function
   * @private
   */
  getDefaultValueFormat() {
    const $$ = this;
    const { defaultArcValueFormat, yFormat, y2Format } = $$;
    const hasArc = $$.hasArcType(null, ["gauge", "polar", "radar"]);
    return function(v, ratio, id) {
      const format = hasArc ? defaultArcValueFormat : $$.axis && $$.axis.getId(id) === "y2" ? y2Format : yFormat;
      return format.call($$, v, ratio);
    };
  },
  defaultValueFormat(v) {
    return isArray(v) ? v.join("~") : isValue(v) ? +v : "";
  },
  defaultArcValueFormat(v, ratio) {
    return `${(ratio * 100).toFixed(1)}%`;
  },
  defaultPolarValueFormat(v) {
    return `${v}`;
  },
  dataLabelFormat(targetId) {
    const $$ = this;
    const dataLabels = $$.config.data_labels;
    const defaultFormat = (v) => {
      const delimiter = "~";
      let res = v;
      if (isArray(v)) {
        res = v.join(delimiter);
      } else if (isObject(v)) {
        res = Object.values(v).join(delimiter);
      }
      return res;
    };
    let format = defaultFormat;
    if (isFunction(dataLabels.format)) {
      format = dataLabels.format;
    } else if (isObjectType(dataLabels.format)) {
      if (dataLabels.format[targetId]) {
        format = dataLabels.format[targetId] === true ? defaultFormat : dataLabels.format[targetId];
      } else {
        format = () => "";
      }
    }
    return format.bind($$.api);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/legend.ts





function getLegendColor(id) {
  const $$ = this;
  const data = $$.getDataById(id);
  const color = $$.levelColor ? $$.levelColor(data.values[0].value) : $$.color(data);
  return color;
}
function getFormattedText(id, formatted = true) {
  var _a;
  const { config } = this;
  let text = (_a = config.data_names[id]) != null ? _a : id;
  if (formatted && isFunction(config.legend_format)) {
    text = config.legend_format(text, id !== text ? id : void 0);
  }
  return text;
}
/* harmony default export */ var internals_legend = ({
  /**
   * Initialize the legend.
   * @private
   */
  initLegend() {
    const $$ = this;
    const { config, $el } = $$;
    $$.legendItemTextBox = {};
    $$.state.legendHasRendered = false;
    if (config.legend_show) {
      if (!config.legend_contents_bindto) {
        $el.legend = $$.$el.svg.append("g").classed($LEGEND.legend, true).attr("transform", $$.getTranslate("legend"));
      }
      $$.updateLegend();
    } else {
      $$.state.hiddenLegendIds = $$.mapToIds($$.data.targets);
    }
  },
  /**
   * Update legend element
   * @param {Array} targetIds ID's of target
   * @param {object} options withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
   * @param {object} transitions Return value of the generateTransitions
   * @private
   */
  updateLegend(targetIds, options, transitions) {
    var _a;
    const $$ = this;
    const { config, state, scale, $el } = $$;
    const optionz = options || {
      withTransform: false,
      withTransitionForTransform: false,
      withTransition: false
    };
    optionz.withTransition = getOption(optionz, "withTransition", true);
    optionz.withTransitionForTransform = getOption(optionz, "withTransitionForTransform", true);
    if (config.legend_contents_bindto && config.legend_contents_template) {
      $$.updateLegendTemplate();
    } else if (!state.hasTreemap) {
      $$.updateLegendElement(
        targetIds || $$.mapToIds($$.data.targets),
        optionz,
        transitions
      );
    }
    (_a = $el.legend) == null ? void 0 : _a.selectAll(`.${$LEGEND.legendItem}`).classed($LEGEND.legendItemHidden, function(id) {
      const hide = !$$.isTargetToShow(id);
      if (hide) {
        this.style.opacity = null;
      }
      return hide;
    });
    $$.updateScales(false, !scale.zoom);
    $$.updateSvgSize();
    $$.transformAll(optionz.withTransitionForTransform, transitions);
    state.legendHasRendered = true;
  },
  /**
   * Update legend using template option
   * @private
   */
  updateLegendTemplate() {
    const $$ = this;
    const { config, $el } = $$;
    const wrapper = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(config.legend_contents_bindto);
    const template = config.legend_contents_template;
    if (!wrapper.empty()) {
      const targets = $$.mapToIds($$.data.targets);
      const ids = [];
      let html = "";
      targets.forEach((v) => {
        const content = isFunction(template) ? template.bind($$.api)(v, $$.color(v), $$.api.data(v)[0].values) : tplProcess(template, {
          COLOR: $$.color(v),
          TITLE: v
        });
        if (content) {
          ids.push(v);
          html += content;
        }
      });
      const legendItem = wrapper.html(html).selectAll(function() {
        return this.childNodes;
      }).data(ids);
      $$.setLegendItem(legendItem);
      $el.legend = wrapper;
    }
  },
  /**
   * Update the size of the legend.
   * @param {Obejct} size Size object
   * @private
   */
  updateSizeForLegend(size) {
    const $$ = this;
    const {
      config,
      state: {
        isLegendTop,
        isLegendLeft,
        isLegendRight,
        isLegendInset,
        current
      }
    } = $$;
    const { width, height } = size;
    const insetLegendPosition = {
      top: isLegendTop ? $$.getCurrentPaddingByDirection("top") + config.legend_inset_y + 5.5 : current.height - height - $$.getCurrentPaddingByDirection("bottom") - config.legend_inset_y,
      left: isLegendLeft ? $$.getCurrentPaddingByDirection("left") + config.legend_inset_x + 0.5 : current.width - width - $$.getCurrentPaddingByDirection("right") - config.legend_inset_x + 0.5
    };
    $$.state.margin3 = {
      top: isLegendRight ? 0 : isLegendInset ? insetLegendPosition.top : current.height - height,
      right: NaN,
      bottom: 0,
      left: isLegendRight ? current.width - width : isLegendInset ? insetLegendPosition.left : 0
    };
  },
  /**
   * Transform Legend
   * @param {boolean} withTransition whether or not to transition.
   * @private
   */
  transformLegend(withTransition) {
    const $$ = this;
    const { $el: { legend }, $T } = $$;
    $T(legend, withTransition).attr("transform", $$.getTranslate("legend"));
  },
  /**
   * Update the legend step
   * @param {number} step Step value
   * @private
   */
  updateLegendStep(step) {
    this.state.legendStep = step;
  },
  /**
   * Update legend item width
   * @param {number} width Width value
   * @private
   */
  updateLegendItemWidth(width) {
    this.state.legendItemWidth = width;
  },
  /**
   * Update legend item height
   * @param {number} height Height value
   * @private
   */
  updateLegendItemHeight(height) {
    this.state.legendItemHeight = height;
  },
  /**
   * Update legend item color
   * @param {string} id Corresponding data ID value
   * @param {string} color Color value
   * @private
   */
  updateLegendItemColor(id, color) {
    const { legend } = this.$el;
    if (legend) {
      legend.select(`.${$LEGEND.legendItem}-${id} line`).style("stroke", color);
    }
  },
  /**
   * Get the width of the legend
   * @returns {number} width
   * @private
   */
  getLegendWidth() {
    const $$ = this;
    const { current: { width }, isLegendRight, isLegendInset, legendItemWidth, legendStep } = $$.state;
    return $$.config.legend_show ? isLegendRight || isLegendInset ? legendItemWidth * (legendStep + 1) : width : 0;
  },
  /**
   * Get the height of the legend
   * @returns {number} height
   * @private
   */
  getLegendHeight() {
    var _a;
    const $$ = this;
    const { current, isLegendRight, legendItemHeight, legendStep } = $$.state;
    const isFitPadding = ((_a = $$.config.padding) == null ? void 0 : _a.mode) === "fit";
    return $$.config.legend_show ? isLegendRight ? current.height : (isFitPadding ? 10 : Math.max(20, legendItemHeight)) * (legendStep + 1) : 0;
  },
  /**
   * Get the opacity of the legend that is unfocused
   * @param {d3.selection} legendItem Legend item node
   * @returns {string|null} opacity
   * @private
   */
  opacityForUnfocusedLegend(legendItem) {
    return legendItem.classed($LEGEND.legendItemHidden) ? null : "0.3";
  },
  /**
   * Toggles the focus of the legend
   * @param {Array} targetIds ID's of target
   * @param {boolean} focus whether or not to focus.
   * @private
   */
  toggleFocusLegend(targetIds, focus) {
    const $$ = this;
    const { $el: { legend }, $T } = $$;
    const targetIdz = $$.mapToTargetIds(targetIds);
    legend && $T(legend.selectAll(`.${$LEGEND.legendItem}`).filter((id) => targetIdz.indexOf(id) >= 0).classed($FOCUS.legendItemFocused, focus)).style("opacity", function() {
      return focus ? null : $$.opacityForUnfocusedLegend.call($$, (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this));
    });
  },
  /**
   * Revert the legend to its default state
   * @private
   */
  revertLegend() {
    const $$ = this;
    const { $el: { legend }, $T } = $$;
    legend && $T(legend.selectAll(`.${$LEGEND.legendItem}`).classed($FOCUS.legendItemFocused, false)).style("opacity", null);
  },
  /**
   * Shows the legend
   * @param {Array} targetIds ID's of target
   * @private
   */
  showLegend(targetIds) {
    const $$ = this;
    const { config, $el, $T } = $$;
    if (!config.legend_show) {
      config.legend_show = true;
      $el.legend ? $el.legend.style("visibility", null) : $$.initLegend();
      !$$.state.legendHasRendered && $$.updateLegend();
    }
    $$.removeHiddenLegendIds(targetIds);
    $T(
      $el.legend.selectAll($$.selectorLegends(targetIds)).style("visibility", null)
    ).style("opacity", null);
  },
  /**
   * Hide the legend
   * @param {Array} targetIds ID's of target
   * @private
   */
  hideLegend(targetIds) {
    const $$ = this;
    const { config, $el: { legend } } = $$;
    if (config.legend_show && isEmpty(targetIds)) {
      config.legend_show = false;
      legend.style("visibility", "hidden");
    }
    $$.addHiddenLegendIds(targetIds);
    legend.selectAll($$.selectorLegends(targetIds)).style("opacity", "0").style("visibility", "hidden");
  },
  /**
   * Get legend item textbox dimension
   * @param {string} id Data ID
   * @param {HTMLElement|d3.selection} textElement Text node element
   * @returns {object} Bounding rect
   * @private
   */
  getLegendItemTextBox(id, textElement) {
    const $$ = this;
    const { cache, state } = $$;
    let data;
    const cacheKey = KEY.legendItemTextBox;
    if (id) {
      data = !state.redrawing && cache.get(cacheKey) || {};
      if (!data[id]) {
        data[id] = $$.getTextRect(textElement, $LEGEND.legendItem);
        cache.add(cacheKey, data);
      }
      data = data[id];
    }
    return data;
  },
  /**
   * Set legend item style & bind events
   * @param {d3.selection} item Item node
   * @private
   */
  setLegendItem(item) {
    const $$ = this;
    const { $el, api, config, state } = $$;
    const isTouch = state.inputType === "touch";
    const hasGauge = $$.hasType("gauge");
    const useCssRule = config.boost_useCssRule;
    const interaction = config.legend_item_interaction;
    item.attr("class", function(id) {
      const node = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      const itemClass = !node.empty() && node.attr("class") || "";
      return itemClass + $$.generateClass($LEGEND.legendItem, id);
    }).style("visibility", (id) => $$.isLegendToShow(id) ? null : "hidden");
    if (config.interaction_enabled) {
      if (useCssRule) {
        [
          [`.${$LEGEND.legendItem}`, "cursor:pointer"],
          [`.${$LEGEND.legendItem} text`, "pointer-events:none"],
          [`.${$LEGEND.legendItemPoint} text`, "pointer-events:none"],
          [`.${$LEGEND.legendItemTile}`, "pointer-events:none"],
          [`.${$LEGEND.legendItemEvent}`, "fill-opacity:0"]
        ].forEach((v) => {
          const [selector, props] = v;
          $$.setCssRule(false, selector, [props])($el.legend);
        });
      }
      item.on(
        interaction.dblclick ? "dblclick" : "click",
        interaction || isFunction(config.legend_item_onclick) ? function(event, id) {
          if (!callFn(config.legend_item_onclick, api, id)) {
            const { altKey, target, type } = event;
            if (type === "dblclick" || altKey) {
              if (state.hiddenTargetIds.length && target.parentNode.getAttribute("class").indexOf(
                $LEGEND.legendItemHidden
              ) === -1) {
                api.show();
              } else {
                api.hide();
                api.show(id);
              }
            } else {
              api.toggle(id);
              (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed($FOCUS.legendItemFocused, false);
            }
          }
          isTouch && $$.hideTooltip();
        } : null
      );
      !isTouch && item.on("mouseout", interaction || isFunction(config.legend_item_onout) ? function(event, id) {
        if (!callFn(config.legend_item_onout, api, id)) {
          (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed($FOCUS.legendItemFocused, false);
          if (hasGauge) {
            $$.undoMarkOverlapped($$, `.${$GAUGE.gaugeValue}`);
          }
          $$.api.revert();
        }
      } : null).on("mouseover", interaction || isFunction(config.legend_item_onover) ? function(event, id) {
        if (!callFn(config.legend_item_onover, api, id)) {
          (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed($FOCUS.legendItemFocused, true);
          if (hasGauge) {
            $$.markOverlapped(id, $$, `.${$GAUGE.gaugeValue}`);
          }
          if (!state.transiting && $$.isTargetToShow(id)) {
            api.focus(id);
          }
        }
      } : null);
      !item.empty() && item.on("click mouseout mouseover") && item.style("cursor", $$.getStylePropValue("pointer"));
    }
  },
  /**
   * Update the legend
   * @param {Array} targetIds ID's of target
   * @param {object} options withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
   * @private
   */
  updateLegendElement(targetIds, options) {
    const $$ = this;
    const { config, state, $el: { legend }, $T } = $$;
    const legendType = config.legend_item_tile_type;
    const isRectangle = legendType !== "circle";
    const legendItemR = config.legend_item_tile_r;
    const itemTileSize = {
      width: isRectangle ? config.legend_item_tile_width : legendItemR * 2,
      height: isRectangle ? config.legend_item_tile_height : legendItemR * 2
    };
    const dimension = {
      padding: {
        top: 4,
        right: 10
      },
      max: {
        width: 0,
        height: 0
      },
      posMin: 10,
      step: 0,
      tileWidth: itemTileSize.width + 5,
      totalLength: 0
    };
    const sizes = {
      offsets: {},
      widths: {},
      heights: {},
      margins: [0],
      steps: {}
    };
    let xForLegend;
    let yForLegend;
    let background;
    const targetIdz = targetIds.filter((id) => !isDefined(config.data_names[id]) || config.data_names[id] !== null);
    const withTransition = options.withTransition;
    const updatePositions = $$.getUpdateLegendPositions(targetIdz, dimension, sizes);
    if (state.isLegendInset) {
      dimension.step = config.legend_inset_step ? config.legend_inset_step : targetIdz.length;
      $$.updateLegendStep(dimension.step);
    }
    if (state.isLegendRight) {
      xForLegend = (id) => dimension.max.width * sizes.steps[id];
      yForLegend = (id) => sizes.margins[sizes.steps[id]] + sizes.offsets[id];
    } else if (state.isLegendInset) {
      xForLegend = (id) => dimension.max.width * sizes.steps[id] + 10;
      yForLegend = (id) => sizes.margins[sizes.steps[id]] + sizes.offsets[id];
    } else {
      xForLegend = (id) => sizes.margins[sizes.steps[id]] + sizes.offsets[id];
      yForLegend = (id) => dimension.max.height * sizes.steps[id];
    }
    const posFn = {
      xText: (id, i) => xForLegend(id, i) + 4 + itemTileSize.width,
      xRect: (id, i) => xForLegend(id, i),
      x1Tile: (id, i) => xForLegend(id, i) - 2,
      x2Tile: (id, i) => xForLegend(id, i) - 2 + itemTileSize.width,
      yText: (id, i) => yForLegend(id, i) + 9,
      yRect: (id, i) => yForLegend(id, i) - 5,
      yTile: (id, i) => yForLegend(id, i) + 4
    };
    $$.generateLegendItem(targetIdz, itemTileSize, updatePositions, posFn);
    background = legend.select(`.${$LEGEND.legendBackground} rect`);
    if (state.isLegendInset && dimension.max.width > 0 && background.size() === 0) {
      background = legend.insert("g", `.${$LEGEND.legendItem}`).attr("class", $LEGEND.legendBackground).append("rect");
    }
    if (config.legend_tooltip) {
      legend.selectAll("title").data(targetIdz).text((id) => getFormattedText.bind($$)(id, false));
    }
    const texts = legend.selectAll("text").data(targetIdz).text((id) => getFormattedText.bind($$)(id)).each(function(id, i) {
      updatePositions(this, id, i);
    });
    $T(texts, withTransition).attr("x", posFn.xText).attr("y", posFn.yText);
    const rects = legend.selectAll(`rect.${$LEGEND.legendItemEvent}`).data(targetIdz);
    $T(rects, withTransition).attr("width", (id) => sizes.widths[id]).attr("height", (id) => sizes.heights[id]).attr("x", posFn.xRect).attr("y", posFn.yRect);
    $$.updateLegendItemPos(targetIdz, withTransition, posFn);
    if (background) {
      $T(background, withTransition).attr("height", $$.getLegendHeight() - 12).attr("width", dimension.max.width * (dimension.step + 1) + 10);
    }
    $$.updateLegendItemWidth(dimension.max.width);
    $$.updateLegendItemHeight(dimension.max.height);
    $$.updateLegendStep(dimension.step);
  },
  /**
   * Get position update function
   * @param {Array} targetIdz Data ids
   * @param {object} dimension Dimension object
   * @param {object} sizes Size object
   * @returns {Function} Update position function
   * @private
   */
  getUpdateLegendPositions(targetIdz, dimension, sizes) {
    const $$ = this;
    const { config, state } = $$;
    const isLegendRightOrInset = state.isLegendRight || state.isLegendInset;
    return function(textElement, id, index) {
      const reset = index === 0;
      const isLast = index === targetIdz.length - 1;
      const box = $$.getLegendItemTextBox(id, textElement);
      const itemWidth = box.width + dimension.tileWidth + (isLast && !isLegendRightOrInset ? 0 : dimension.padding.right) + config.legend_padding;
      const itemHeight = box.height + dimension.padding.top;
      const itemLength = isLegendRightOrInset ? itemHeight : itemWidth;
      const areaLength = isLegendRightOrInset ? $$.getLegendHeight() : $$.getLegendWidth();
      let margin;
      const updateValues = function(id2, withoutStep) {
        if (!withoutStep) {
          margin = (areaLength - dimension.totalLength - itemLength) / 2;
          if (margin < dimension.posMin) {
            margin = (areaLength - itemLength) / 2;
            dimension.totalLength = 0;
            dimension.step++;
          }
        }
        sizes.steps[id2] = dimension.step;
        sizes.margins[dimension.step] = state.isLegendInset ? 10 : margin;
        sizes.offsets[id2] = dimension.totalLength;
        dimension.totalLength += itemLength;
      };
      if (reset) {
        dimension.totalLength = 0;
        dimension.step = 0;
        dimension.max.width = 0;
        dimension.max.height = 0;
      }
      if (config.legend_show && !$$.isLegendToShow(id)) {
        sizes.widths[id] = 0;
        sizes.heights[id] = 0;
        sizes.steps[id] = 0;
        sizes.offsets[id] = 0;
        return;
      }
      sizes.widths[id] = itemWidth;
      sizes.heights[id] = itemHeight;
      if (!dimension.max.width || itemWidth >= dimension.max.width) {
        dimension.max.width = itemWidth;
      }
      if (!dimension.max.height || itemHeight >= dimension.max.height) {
        dimension.max.height = itemHeight;
      }
      const maxLength = isLegendRightOrInset ? dimension.max.height : dimension.max.width;
      if (config.legend_equally) {
        Object.keys(sizes.widths).forEach((id2) => sizes.widths[id2] = dimension.max.width);
        Object.keys(sizes.heights).forEach(
          (id2) => sizes.heights[id2] = dimension.max.height
        );
        margin = (areaLength - maxLength * targetIdz.length) / 2;
        if (margin < dimension.posMin) {
          dimension.totalLength = 0;
          dimension.step = 0;
          targetIdz.forEach((id2) => updateValues(id2));
        } else {
          updateValues(id, true);
        }
      } else {
        updateValues(id);
      }
    };
  },
  /**
   * Generate legend item elements
   * @param {Array} targetIdz Data ids
   * @param {object} itemTileSize Item tile size {width, height}
   * @param {Function} updatePositions Update position function
   * @param {object} posFn Position functions
   * @private
   */
  generateLegendItem(targetIdz, itemTileSize, updatePositions, posFn) {
    const $$ = this;
    const { config, state, $el: { legend } } = $$;
    const usePoint = config.legend_usePoint;
    const legendItemR = config.legend_item_tile_r;
    const legendType = config.legend_item_tile_type;
    const isRectangle = legendType !== "circle";
    const isLegendRightOrInset = state.isLegendRight || state.isLegendInset;
    const pos = -200;
    const l = legend.selectAll(`.${$LEGEND.legendItem}`).data(targetIdz).enter().append("g");
    $$.setLegendItem(l);
    if (config.legend_tooltip) {
      l.append("title").text((id) => id);
    }
    l.append("text").text((id) => getFormattedText.bind($$)(id)).each(function(id, i) {
      updatePositions(this, id, i);
    }).style("pointer-events", $$.getStylePropValue("none")).attr("x", isLegendRightOrInset ? posFn.xText : pos).attr("y", isLegendRightOrInset ? pos : posFn.yText);
    l.append("rect").attr("class", $LEGEND.legendItemEvent).style("fill-opacity", $$.getStylePropValue("0")).attr("x", isLegendRightOrInset ? posFn.xRect : pos).attr("y", isLegendRightOrInset ? pos : posFn.yRect);
    if (usePoint) {
      const ids = [];
      l.append((d) => {
        const pattern = notEmpty(config.point_pattern) ? config.point_pattern : [config.point_type];
        ids.indexOf(d) === -1 && ids.push(d);
        let point = pattern[ids.indexOf(d) % pattern.length];
        if (point === "rectangle") {
          point = "rect";
        }
        return browser_doc.createElementNS(
          external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.namespaces.svg,
          "hasValidPointType" in $$ && $$.hasValidPointType(point) ? point : "use"
        );
      }).attr("class", $LEGEND.legendItemPoint).style("fill", getLegendColor.bind($$)).style("pointer-events", $$.getStylePropValue("none")).attr("href", (data, idx, selection) => {
        const node = selection[idx];
        const nodeName = node.nodeName.toLowerCase();
        const id = $$.getTargetSelectorSuffix(data);
        return nodeName === "use" ? `#${state.datetimeId}-point${id}` : void 0;
      });
    } else {
      l.append(isRectangle ? "line" : legendType).attr("class", $LEGEND.legendItemTile).style("stroke", getLegendColor.bind($$)).style("pointer-events", $$.getStylePropValue("none")).call((selection) => {
        if (legendType === "circle") {
          selection.attr("r", legendItemR).style("fill", getLegendColor.bind($$)).attr("cx", isLegendRightOrInset ? posFn.x2Tile : pos).attr("cy", isLegendRightOrInset ? pos : posFn.yTile);
        } else if (isRectangle) {
          selection.attr("stroke-width", itemTileSize.height).attr("x1", isLegendRightOrInset ? posFn.x1Tile : pos).attr("y1", isLegendRightOrInset ? pos : posFn.yTile).attr("x2", isLegendRightOrInset ? posFn.x2Tile : pos).attr("y2", isLegendRightOrInset ? pos : posFn.yTile);
        }
      });
    }
  },
  /**
   * Update legend item position
   * @param {Array} targetIdz Data ids
   * @param {boolean} withTransition Whether or not to apply transition
   * @param {object} posFn Position functions
   * @private
   */
  updateLegendItemPos(targetIdz, withTransition, posFn) {
    const $$ = this;
    const { config, $el: { legend }, $T } = $$;
    const usePoint = config.legend_usePoint;
    const legendType = config.legend_item_tile_type;
    const isRectangle = legendType !== "circle";
    if (usePoint) {
      const tiles = legend.selectAll(`.${$LEGEND.legendItemPoint}`).data(targetIdz);
      $T(tiles, withTransition).each(function() {
        const nodeName = this.nodeName.toLowerCase();
        const pointR = config.point_r;
        let x = "x";
        let y = "y";
        let xOffset = 2;
        let yOffset = 2.5;
        let radius = null;
        let width = null;
        let height = null;
        if (nodeName === "circle") {
          const size = pointR * 0.2;
          x = "cx";
          y = "cy";
          radius = pointR + size;
          xOffset = pointR * 2;
          yOffset = -size;
        } else if (nodeName === "rect") {
          const size = pointR * 2.5;
          width = size;
          height = size;
          yOffset = 3;
        }
        (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).attr(x, (d) => posFn.x1Tile(d) + xOffset).attr(y, (d) => posFn.yTile(d) - yOffset).attr("r", radius).attr("width", width).attr("height", height);
      });
    } else {
      const tiles = legend.selectAll(`.${$LEGEND.legendItemTile}`).data(targetIdz);
      $T(tiles, withTransition).style("stroke", getLegendColor.bind($$)).call((selection) => {
        if (legendType === "circle") {
          selection.attr("cx", (d) => {
            const x2 = posFn.x2Tile(d);
            return x2 - (x2 - posFn.x1Tile(d)) / 2;
          }).attr("cy", posFn.yTile);
        } else if (isRectangle) {
          selection.attr("x1", posFn.x1Tile).attr("y1", posFn.yTile).attr("x2", posFn.x2Tile).attr("y2", posFn.yTile);
        }
      });
    }
  }
});

// EXTERNAL MODULE: external {"commonjs":"d3-transition","commonjs2":"d3-transition","amd":"d3-transition","root":"d3"}
var external_commonjs_d3_transition_commonjs2_d3_transition_amd_d3_transition_root_d3_ = __webpack_require__(8);
;// CONCATENATED MODULE: ./src/ChartInternal/internals/redraw.ts




/* harmony default export */ var redraw = ({
  redraw(options = {}) {
    var _a, _b, _c, _d;
    const $$ = this;
    const { config, state, $el } = $$;
    const { main, treemap } = $el;
    state.redrawing = true;
    const targetsToShow = $$.filterTargetsToShow($$.data.targets);
    const { flow, initializing } = options;
    const wth = $$.getWithOption(options);
    const duration = wth.Transition ? config.transition_duration : 0;
    const durationForExit = wth.TransitionForExit ? duration : 0;
    const durationForAxis = wth.TransitionForAxis ? duration : 0;
    const transitions = (_a = $$.axis) == null ? void 0 : _a.generateTransitions(durationForAxis);
    $$.updateSizes(initializing);
    if (wth.Legend && config.legend_show) {
      options.withTransition = !!duration;
      !treemap && $$.updateLegend($$.mapToIds($$.data.targets), options, transitions);
    } else if (wth.Dimension) {
      $$.updateDimension(true);
    }
    config.data_empty_label_text && main.select(`text.${$TEXT.text}.${$COMMON.empty}`).attr("x", state.width / 2).attr("y", state.height / 2).text(config.data_empty_label_text).style("display", targetsToShow.length ? "none" : null);
    if (state.hasAxis) {
      $$.axis.redrawAxis(targetsToShow, wth, transitions, flow, initializing);
      $$.hasGrid() && $$.updateGrid();
      config.regions.length && $$.updateRegion();
      ["bar", "candlestick", "line", "area"].forEach((v) => {
        const name = capitalize(v);
        if (/^(line|area)$/.test(v) && $$.hasTypeOf(name) || $$.hasType(v)) {
          $$[`update${name}`](wth.TransitionForExit);
        }
      });
      $el.text && main.selectAll(`.${$SELECT.selectedCircles}`).filter($$.isBarType.bind($$)).selectAll("circle").remove();
      if (config.interaction_enabled && !flow && wth.EventRect) {
        $$.redrawEventRect();
        (_b = $$.bindZoomEvent) == null ? void 0 : _b.call($$);
      }
    } else {
      $el.arcs && $$.redrawArc(duration, durationForExit, wth.Transform);
      $el.radar && $$.redrawRadar();
      $el.polar && $$.redrawPolar();
      $el.funnel && $$.redrawFunnel();
      treemap && $$.updateTreemap(durationForExit);
    }
    if (!state.resizing && !treemap && ($$.hasPointType() || state.hasRadar)) {
      $$.updateCircle();
    } else if ((_c = $$.hasLegendDefsPoint) == null ? void 0 : _c.call($$)) {
      $$.data.targets.forEach($$.point("create", this));
    }
    $$.hasDataLabel() && !$$.hasArcType(null, ["radar"]) && $$.updateText();
    (_d = $$.redrawTitle) == null ? void 0 : _d.call($$);
    initializing && $$.updateTypesElements();
    $$.generateRedrawList(targetsToShow, flow, duration, wth.Subchart);
    $$.updateTooltipOnRedraw();
    $$.callPluginHook("$redraw", options, duration);
  },
  /**
   * Generate redraw list
   * @param {object} targets targets data to be shown
   * @param {object} flow flow object
   * @param {number} duration duration value
   * @param {boolean} withSubchart whether or not to show subchart
   * @private
   */
  generateRedrawList(targets, flow, duration, withSubchart) {
    const $$ = this;
    const { config, state } = $$;
    const shape = $$.getDrawShape();
    if (state.hasAxis) {
      config.subchart_show && $$.redrawSubchart(withSubchart, duration, shape);
    }
    const flowFn = flow && $$.generateFlow({
      targets,
      flow,
      duration: flow.duration,
      shape,
      xv: $$.xv.bind($$)
    });
    const withTransition = (duration || flowFn) && isTabVisible();
    const redrawList = $$.getRedrawList(shape, flow, flowFn, withTransition);
    const afterRedraw = () => {
      flowFn && flowFn();
      state.redrawing = false;
      callFn(config.onrendered, $$.api);
    };
    if (afterRedraw) {
      if (withTransition && redrawList.length) {
        const waitForDraw = generateWait();
        (0,external_commonjs_d3_transition_commonjs2_d3_transition_amd_d3_transition_root_d3_.transition)().duration(duration).each(() => {
          redrawList.reduce((acc, t1) => acc.concat(t1), []).forEach((t) => waitForDraw.add(t));
        }).call(waitForDraw, afterRedraw);
      } else if (!state.transiting) {
        afterRedraw();
      }
    }
    $$.mapToIds($$.data.targets).forEach((id) => {
      state.withoutFadeIn[id] = true;
    });
  },
  getRedrawList(shape, flow, flowFn, withTransition) {
    const $$ = this;
    const { config, state: { hasAxis, hasRadar, hasTreemap }, $el: { grid } } = $$;
    const { cx, cy, xForText, yForText } = shape.pos;
    const list = [];
    if (hasAxis) {
      if (config.grid_x_lines.length || config.grid_y_lines.length) {
        list.push($$.redrawGrid(withTransition));
      }
      if (config.regions.length) {
        list.push($$.redrawRegion(withTransition));
      }
      Object.keys(shape.type).forEach((v) => {
        const name = capitalize(v);
        const drawFn = shape.type[v];
        if (/^(area|line)$/.test(v) && $$.hasTypeOf(name) || $$.hasType(v)) {
          list.push($$[`redraw${name}`](drawFn, withTransition));
        }
      });
      !flow && grid.main && list.push($$.updateGridFocus());
    }
    if (!$$.hasArcType() || hasRadar) {
      notEmpty(config.data_labels) && config.data_labels !== false && list.push($$.redrawText(xForText, yForText, flow, withTransition));
    }
    if (($$.hasPointType() || hasRadar) && !$$.isPointFocusOnly()) {
      $$.redrawCircle && list.push($$.redrawCircle(cx, cy, withTransition, flowFn));
    }
    if (hasTreemap) {
      list.push($$.redrawTreemap(withTransition));
    }
    return list;
  },
  updateAndRedraw(options = {}) {
    const $$ = this;
    const { config, state } = $$;
    let transitions;
    options.withTransition = getOption(options, "withTransition", true);
    options.withTransform = getOption(options, "withTransform", false);
    options.withLegend = getOption(options, "withLegend", false);
    options.withUpdateXDomain = true;
    options.withUpdateOrgXDomain = true;
    options.withTransitionForExit = false;
    options.withTransitionForTransform = getOption(
      options,
      "withTransitionForTransform",
      options.withTransition
    );
    if (!(options.withLegend && config.legend_show)) {
      if (state.hasAxis) {
        transitions = $$.axis.generateTransitions(
          options.withTransitionForAxis ? config.transition_duration : 0
        );
      }
      $$.updateScales();
      $$.updateSvgSize();
      $$.transformAll(options.withTransitionForTransform, transitions);
    }
    $$.redraw(options, transitions);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/scale.ts


function getScale(type = "linear", min, max) {
  const scale = {
    linear: external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleLinear,
    log: external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSymlog,
    _log: external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleLog,
    time: external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleTime,
    utc: external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleUtc
  }[type]();
  scale.type = type;
  /_?log/.test(type) && scale.clamp(true);
  return scale.range([min != null ? min : 0, max != null ? max : 1]);
}
/* harmony default export */ var scale = ({
  /**
   * Get x Axis scale function
   * @param {number} min Min range value
   * @param {number} max Max range value
   * @param {Array} domain Domain value
   * @param {Function} offset The offset getter to be sum
   * @returns {Function} scale
   * @private
   */
  getXScale(min, max, domain, offset) {
    const $$ = this;
    const scale = $$.state.loading !== "append" && $$.scale.zoom || getScale($$.axis.getAxisType("x"), min, max);
    return $$.getCustomizedXScale(
      domain ? scale.domain(domain) : scale,
      offset
    );
  },
  /**
   * Get y Axis scale function
   * @param {string} id Axis id: 'y' or 'y2'
   * @param {number} min Min value
   * @param {number} max Max value
   * @param {Array} domain Domain value
   * @returns {Function} Scale function
   * @private
   */
  getYScale(id, min, max, domain) {
    const $$ = this;
    const scale = getScale($$.axis.getAxisType(id), min, max);
    domain && scale.domain(domain);
    return scale;
  },
  /**
   * Get y Axis scale
   * @param {string} id Axis id
   * @param {boolean} isSub Weather is sub Axis
   * @returns {Function} Scale function
   * @private
   */
  getYScaleById(id, isSub = false) {
    var _a;
    const isY2 = ((_a = this.axis) == null ? void 0 : _a.getId(id)) === "y2";
    const key = isSub ? isY2 ? "subY2" : "subY" : isY2 ? "y2" : "y";
    return this.scale[key];
  },
  /**
   * Get customized x axis scale
   * @param {d3.scaleLinear|d3.scaleTime} scaleValue Scale function
   * @param {Function} offsetValue Offset getter to be sum
   * @returns {Function} Scale function
   * @private
   */
  getCustomizedXScale(scaleValue, offsetValue) {
    const $$ = this;
    const offset = offsetValue || (() => $$.axis.x.tickOffset());
    const isInverted = $$.config.axis_x_inverted;
    const scale = function(d, raw) {
      const v = scaleValue(d) + offset();
      return raw ? v : Math.ceil(v);
    };
    for (const key in scaleValue) {
      scale[key] = scaleValue[key];
    }
    scale.orgDomain = () => scaleValue.domain();
    scale.orgScale = () => scaleValue;
    if ($$.axis.isCategorized()) {
      scale.domain = function(domainValue) {
        let domain = domainValue;
        if (!arguments.length) {
          domain = this.orgDomain();
          return isInverted ? [domain[0] + 1, domain[1]] : [domain[0], domain[1] + 1];
        }
        scaleValue.domain(domain);
        return scale;
      };
    }
    return scale;
  },
  /**
   * Update scale
   * @param {boolean} isInit Param is given at the init rendering
   * @param {boolean} updateXDomain If update x domain
   * @private
   */
  updateScales(isInit, updateXDomain = true) {
    var _a, _b;
    const $$ = this;
    const {
      axis,
      config,
      format,
      org,
      scale,
      state: { current, width, height, width2, height2, hasAxis, hasTreemap }
    } = $$;
    if (hasAxis) {
      const isRotated = config.axis_rotated;
      const resettedPadding = $$.getResettedPadding(1);
      const min = {
        x: isRotated ? resettedPadding : 0,
        y: isRotated ? 0 : height,
        subX: isRotated ? 1 : 0,
        subY: isRotated ? 0 : height2
      };
      const max = {
        x: isRotated ? height : width,
        y: isRotated ? width : resettedPadding,
        subX: isRotated ? height : width,
        subY: isRotated ? width2 : 1
      };
      const xDomain = updateXDomain && ((_a = scale.x) == null ? void 0 : _a.orgDomain());
      const xSubDomain = updateXDomain && org.xDomain;
      scale.x = $$.getXScale(min.x, max.x, xDomain, () => axis.x.tickOffset());
      scale.subX = $$.getXScale(min.x, max.x, xSubDomain, (d) => {
        var _a2;
        return d % 1 ? 0 : ((_a2 = axis.subX) != null ? _a2 : axis.x).tickOffset();
      });
      format.xAxisTick = axis.getXAxisTickFormat();
      format.subXAxisTick = axis.getXAxisTickFormat(true);
      axis.setAxis("x", scale.x, config.axis_x_tick_outer, isInit);
      if (config.subchart_show) {
        axis.setAxis("subX", scale.subX, config.axis_x_tick_outer, isInit);
      }
      scale.y = $$.getYScale(
        "y",
        min.y,
        max.y,
        scale.y ? scale.y.domain() : config.axis_y_default
      );
      scale.subY = $$.getYScale(
        "y",
        min.subY,
        max.subY,
        scale.subY ? scale.subY.domain() : config.axis_y_default
      );
      axis.setAxis("y", scale.y, config.axis_y_tick_outer, isInit);
      if (config.axis_y2_show) {
        scale.y2 = $$.getYScale(
          "y2",
          min.y,
          max.y,
          scale.y2 ? scale.y2.domain() : config.axis_y2_default
        );
        scale.subY2 = $$.getYScale(
          "y2",
          min.subY,
          max.subY,
          scale.subY2 ? scale.subY2.domain() : config.axis_y2_default
        );
        axis.setAxis("y2", scale.y2, config.axis_y2_tick_outer, isInit);
      }
    } else if (hasTreemap) {
      const padding = $$.getCurrentPadding();
      scale.x = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleLinear)().rangeRound([padding.left, current.width - padding.right]);
      scale.y = (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleLinear)().rangeRound([padding.top, current.height - padding.bottom]);
    } else {
      (_b = $$.updateArc) == null ? void 0 : _b.call($$);
    }
  },
  /**
   * Get the zoom or unzoomed scaled value
   * @param {Date|number|object} d Data value
   * @returns {number|null}
   * @private
   */
  xx(d) {
    const $$ = this;
    const { config, scale: { x, zoom } } = $$;
    const fn = config.zoom_enabled && zoom ? zoom : x;
    return d ? fn(isValue(d.x) ? d.x : d) : null;
  },
  xv(d) {
    const $$ = this;
    const { axis, config, scale: { x, zoom } } = $$;
    const fn = config.zoom_enabled && zoom ? zoom : x;
    let value = $$.getBaseValue(d);
    if (axis.isTimeSeries()) {
      value = parseDate.call($$, value);
    } else if (axis.isCategorized() && isString(value)) {
      value = config.axis_x_categories.indexOf(value);
    }
    return Math.ceil(fn(value));
  },
  yv(d) {
    const $$ = this;
    const { scale: { y, y2 } } = $$;
    const yScale = d.axis && d.axis === "y2" ? y2 : y;
    return Math.ceil(yScale($$.getBaseValue(d)));
  },
  subxx(d) {
    return d ? this.scale.subX(d.x) : null;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/size.ts




/* harmony default export */ var size = ({
  /**
   * Update container size
   * @private
   */
  setContainerSize() {
    const $$ = this;
    const { state } = $$;
    state.current.width = $$.getCurrentWidth();
    state.current.height = $$.getCurrentHeight();
  },
  getCurrentWidth() {
    const $$ = this;
    return $$.config.size_width || $$.getParentWidth();
  },
  getCurrentHeight() {
    const $$ = this;
    const { config } = $$;
    const h = config.size_height || $$.getParentHeight();
    return h > 0 ? h : 320 / ($$.hasType("gauge") && !config.gauge_fullCircle ? 2 : 1);
  },
  /**
   * Get the parent rect element's size
   * @param {string} key property/attribute name
   * @returns {number}
   * @private
   */
  getParentRectValue(key) {
    const offsetName = `offset${capitalize(key)}`;
    let parent = this.$el.chart.node();
    let v = 0;
    while (v < 30 && parent && parent.tagName !== "BODY") {
      try {
        v = parent.getBoundingClientRect()[key];
      } catch (e) {
        if (offsetName in parent) {
          v = parent[offsetName];
        }
      }
      parent = parent.parentNode;
    }
    const bodySize = browser_doc.body[offsetName];
    v > bodySize && (v = bodySize);
    return v;
  },
  getParentWidth() {
    return this.getParentRectValue("width");
  },
  getParentHeight() {
    const h = this.$el.chart.style("height");
    let height = 0;
    if (h) {
      height = /px$/.test(h) ? parseInt(h, 10) : this.getParentRectValue("height");
    }
    return height;
  },
  getSvgLeft(withoutRecompute) {
    const $$ = this;
    const { config, state: { hasAxis }, $el } = $$;
    const isRotated = config.axis_rotated;
    const hasLeftAxisRect = isRotated || !isRotated && !config.axis_y_inner;
    const leftAxisClass = isRotated ? $AXIS.axisX : $AXIS.axisY;
    const leftAxis = $el.main.select(`.${leftAxisClass}`).node();
    const leftLabel = hasAxis && config[`axis_${isRotated ? "x" : "y"}_label`];
    let labelWidth = 0;
    if (hasAxis && (isString(leftLabel) || isString(leftLabel.text) || /^inner-/.test(leftLabel == null ? void 0 : leftLabel.position))) {
      const label = $el.main.select(`.${leftAxisClass}-label`);
      if (!label.empty()) {
        labelWidth = label.node().getBoundingClientRect().left;
      }
    }
    const svgRect = leftAxis && hasLeftAxisRect ? leftAxis.getBoundingClientRect() : { right: 0 };
    const chartRectLeft = $el.chart.node().getBoundingClientRect().left + labelWidth;
    const hasArc = $$.hasArcType();
    const svgLeft = svgRect.right - chartRectLeft - (hasArc ? 0 : $$.getCurrentPaddingByDirection("left", withoutRecompute));
    return svgLeft > 0 ? svgLeft : 0;
  },
  updateDimension(withoutAxis) {
    var _a;
    const $$ = this;
    const { config, state: { hasAxis }, $el } = $$;
    if (hasAxis && !withoutAxis && $$.axis.x && config.axis_rotated) {
      (_a = $$.axis.subX) == null ? void 0 : _a.create($el.axis.subX);
    }
    $$.updateScales(withoutAxis);
    $$.updateSvgSize();
    $$.transformAll(false);
  },
  updateSvgSize() {
    const $$ = this;
    const { state: { clip, current, hasAxis, width, height }, $el: { svg } } = $$;
    svg.attr("width", current.width).attr("height", current.height);
    if (hasAxis) {
      const brush = svg.select(`.${$SUBCHART.brush} .overlay`);
      const brushSize = { width: 0, height: 0 };
      if (brush.size()) {
        brushSize.width = +brush.attr("width");
        brushSize.height = +brush.attr("height");
      }
      svg.selectAll([`#${clip.id}`, `#${clip.idGrid}`]).select("rect").attr("width", width).attr("height", height);
      svg.select(`#${clip.idXAxis}`).select("rect").call($$.setXAxisClipPath.bind($$));
      svg.select(`#${clip.idYAxis}`).select("rect").call($$.setYAxisClipPath.bind($$));
      clip.idSubchart && svg.select(`#${clip.idSubchart}`).select("rect").attr("width", width).attr("height", brushSize.height);
    }
  },
  /**
   * Get padding by the direction.
   * @param {string} type "top" | "bottom" | "left" | "right"
   * @param {boolean} [withoutRecompute=false] If set true, do not recompute the padding value.
   * @param {boolean} [withXAxisTickTextOverflow=false] If set true, calculate x axis tick text overflow.
   * @returns {number} padding value
   * @private
   */
  getCurrentPaddingByDirection(type, withoutRecompute = false, withXAxisTickTextOverflow = false) {
    var _a;
    const $$ = this;
    const { config, $el, state: { hasAxis } } = $$;
    const isRotated = config.axis_rotated;
    const isFitPadding = ((_a = config.padding) == null ? void 0 : _a.mode) === "fit";
    const paddingOption = isNumber(config[`padding_${type}`]) ? config[`padding_${type}`] : void 0;
    const axisId = hasAxis ? {
      top: isRotated ? "y2" : null,
      bottom: isRotated ? "y" : "x",
      left: isRotated ? "x" : "y",
      right: isRotated ? null : "y2"
    }[type] : null;
    const isLeftRight = /^(left|right)$/.test(type);
    const isAxisInner = axisId && config[`axis_${axisId}_inner`];
    const isAxisShow = axisId && config[`axis_${axisId}_show`];
    const axesLen = axisId ? config[`axis_${axisId}_axes`].length : 0;
    let axisSize = axisId ? isLeftRight ? $$.getAxisWidthByAxisId(axisId, withoutRecompute) : $$.getHorizontalAxisHeight(axisId) : 0;
    const defaultPadding = 20;
    let gap = 0;
    if (!isFitPadding && isLeftRight) {
      axisSize = ceil10(axisSize);
    }
    let padding = hasAxis && isLeftRight && (isAxisInner || isUndefined(paddingOption) && !isAxisShow) ? 0 : isFitPadding ? (isAxisShow ? axisSize : 0) + (paddingOption != null ? paddingOption : 0) : isUndefined(paddingOption) ? axisSize : paddingOption;
    if (isLeftRight && hasAxis) {
      if (axisId && (isFitPadding || isAxisInner) && config[`axis_${axisId}_label`].text) {
        padding += $$.axis.getAxisLabelPosition(axisId).isOuter ? defaultPadding : 0;
      }
      if (type === "right") {
        padding += isRotated ? !isFitPadding && isUndefined(paddingOption) ? 10 : 2 : !isAxisShow || isAxisInner ? isFitPadding ? 2 : 1 : 0;
        padding += withXAxisTickTextOverflow ? $$.axis.getXAxisTickTextY2Overflow(defaultPadding) : 0;
      } else if (type === "left" && isRotated && isUndefined(paddingOption)) {
        padding = !config.axis_x_show ? 1 : isFitPadding ? axisSize : Math.max(axisSize, 40);
      }
    } else {
      if (type === "top") {
        if ($el.title && $el.title.node()) {
          padding += $$.getTitlePadding();
        }
        gap = isRotated && !isAxisInner ? axesLen : 0;
      } else if (type === "bottom" && hasAxis && isRotated && !isAxisShow) {
        padding += 1;
      }
    }
    return padding + axisSize * axesLen - gap;
  },
  getCurrentPadding(withXAxisTickTextOverflow = false) {
    const $$ = this;
    const [top, bottom, left, right] = ["top", "bottom", "left", "right"].map((v) => $$.getCurrentPaddingByDirection(v, null, withXAxisTickTextOverflow));
    return { top, bottom, left, right };
  },
  /**
   * Get resetted padding values when 'padding=false' option is set
   * https://github.com/naver/billboard.js/issues/2367
   * @param {number|object} v Padding values to be resetted
   * @returns {number|object} Padding value
   * @private
   */
  getResettedPadding(v) {
    const $$ = this;
    const { config } = $$;
    const isNum = isNumber(v);
    let p = isNum ? 0 : {};
    if (config.padding === false) {
      !isNum && Object.keys(v).forEach((key) => {
        p[key] = !isEmpty(config.data_labels) && config.data_labels !== false && key === "top" ? v[key] : 0;
      });
    } else {
      p = v;
    }
    return p;
  },
  /**
   * Update size values
   * @param {boolean} isInit If is called at initialization
   * @private
   */
  updateSizes(isInit) {
    var _a, _b, _c, _d, _e;
    const $$ = this;
    const { config, state, $el: { legend } } = $$;
    const isRotated = config.axis_rotated;
    const isNonAxis = $$.hasArcType() || state.hasFunnel || state.hasTreemap;
    const isFitPadding = ((_a = config.padding) == null ? void 0 : _a.mode) === "fit";
    !isInit && $$.setContainerSize();
    const currLegend = {
      width: legend ? $$.getLegendWidth() : 0,
      height: legend ? $$.getLegendHeight() : 0
    };
    if (!isNonAxis && config.axis_x_show && config.axis_x_tick_autorotate) {
      $$.updateXAxisTickClip();
    }
    const legendSize = {
      right: config.legend_show && state.isLegendRight ? $$.getLegendWidth() + (isFitPadding ? 0 : 20) : 0,
      bottom: !config.legend_show || state.isLegendRight || state.isLegendInset ? 0 : currLegend.height
    };
    const xAxisHeight = isRotated || isNonAxis ? 0 : $$.getHorizontalAxisHeight("x");
    const subchartXAxisHeight = config.subchart_axis_x_show && config.subchart_axis_x_tick_text_show ? xAxisHeight : 30;
    const subchartHeight = config.subchart_show && !isNonAxis ? config.subchart_size_height + subchartXAxisHeight : 0;
    const gaugeHeight = $$.hasType("gauge") && config.arc_needle_show && !config.gauge_fullCircle && !config.gauge_label_show ? 10 : 0;
    const padding = $$.getCurrentPadding(true);
    state.margin = !isNonAxis && isRotated ? {
      top: padding.top,
      right: isNonAxis ? 0 : padding.right + legendSize.right,
      bottom: legendSize.bottom + padding.bottom,
      left: subchartHeight + (isNonAxis ? 0 : padding.left)
    } : {
      top: (isFitPadding ? 0 : 4) + padding.top,
      // for top tick text
      right: isNonAxis ? 0 : padding.right + legendSize.right,
      bottom: gaugeHeight + subchartHeight + legendSize.bottom + padding.bottom,
      left: isNonAxis ? 0 : padding.left
    };
    state.margin = $$.getResettedPadding(state.margin);
    state.margin2 = isRotated ? {
      top: state.margin.top,
      right: NaN,
      bottom: 20 + legendSize.bottom,
      left: $$.state.rotatedPadding.left
    } : {
      top: state.current.height - subchartHeight - legendSize.bottom,
      right: NaN,
      bottom: subchartXAxisHeight + legendSize.bottom,
      left: state.margin.left
    };
    state.margin3 = {
      top: 0,
      right: NaN,
      bottom: 0,
      left: 0
    };
    (_b = $$.updateSizeForLegend) == null ? void 0 : _b.call($$, currLegend);
    state.width = state.current.width - state.margin.left - state.margin.right;
    state.height = state.current.height - state.margin.top - state.margin.bottom;
    if (state.width < 0) {
      state.width = 0;
    }
    if (state.height < 0) {
      state.height = 0;
    }
    state.width2 = isRotated ? state.margin.left - state.rotatedPadding.left - state.rotatedPadding.right : state.width;
    state.height2 = isRotated ? state.height : state.current.height - state.margin2.top - state.margin2.bottom;
    if (state.width2 < 0) {
      state.width2 = 0;
    }
    if (state.height2 < 0) {
      state.height2 = 0;
    }
    if ($$.hasArcType()) {
      const hasGauge = $$.hasType("gauge");
      const isLegendRight = config.legend_show && state.isLegendRight;
      const textWidth = (_c = state.hasRadar && $$.cache.get(KEY.radarTextWidth)) != null ? _c : 0;
      state.arcWidth = state.width - (isLegendRight ? currLegend.width + 10 : 0) - textWidth;
      state.arcHeight = state.height - (isLegendRight && !hasGauge ? 0 : 10);
      if ((_d = config.arc_rangeText_values) == null ? void 0 : _d.length) {
        if (hasGauge) {
          state.arcWidth -= 25;
          state.arcHeight -= 10;
          state.margin.left += 10;
        } else {
          state.arcHeight -= 20;
          state.margin.top += 10;
        }
      }
      if (hasGauge && !config.gauge_fullCircle) {
        state.arcHeight += state.height - $$.getPaddingBottomForGauge();
      }
      (_e = $$.updateRadius) == null ? void 0 : _e.call($$);
    }
    if (state.isLegendRight && isNonAxis) {
      state.margin3.left = state.arcWidth / 2 + state.radiusExpanded * 1.1;
    }
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/style.ts


/* harmony default export */ var style = ({
  /**
   * Add props color css rule to given selector
   * @param {boolean} withShape Set shpes' prefix class
   * @param {string} selector CSS selector
   * @param {Array} props CSS props list
   * @param {Function} propsFn Function to retrieve value or determine for props
   * @returns {Function}
   * @private
   */
  setCssRule(withShape, selector, props, propsFn) {
    const $$ = this;
    const { config, state: { cssRule, style } } = $$;
    return config.boost_useCssRule ? (selection) => {
      selection.each((d) => {
        const res = propsFn && (propsFn == null ? void 0 : propsFn.call($$, d));
        const shapeSelector = `${withShape ? `.${$SHAPE.shapes + $$.getTargetSelectorSuffix(d.id)}` : ""}${selector}`;
        selector in cssRule && style.sheet.deleteRule(cssRule[shapeSelector]);
        $$.state.cssRule[shapeSelector] = addCssRules(
          style,
          shapeSelector,
          props.filter(Boolean).map((v) => isString(res) && v.indexOf(":") === -1 ? `${v}: ${res}` : v || "")
        );
      });
    } : () => {
    };
  },
  /**
   * Get style prop value
   * @param {Function|string} v Value
   * @returns {string|null}
   * @private
   */
  getStylePropValue(v) {
    const { config: { boost_useCssRule: useCssRule } } = this;
    return useCssRule ? null : isFunction(v) ? v.bind(this) : v;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/text.ts




function getRotateAnchor(angle) {
  let anchor = "middle";
  if (angle > 0 && angle <= 170) {
    anchor = "end";
  } else if (angle > 190 && angle <= 360) {
    anchor = "start";
  }
  return anchor;
}
function setRotatePos(d, pos, anchor, isRotated, isInverted) {
  var _a;
  const $$ = this;
  const { value } = d;
  const isCandlestickType = $$.isCandlestickType(d);
  const isNegative = isNumber(value) && value < 0 || isCandlestickType && !((_a = $$.getCandlestickData(d)) == null ? void 0 : _a._isUp);
  let { x, y } = pos;
  const gap = 4;
  const doubleGap = gap * 2;
  if (isRotated) {
    if (anchor === "start") {
      x += isNegative ? 0 : doubleGap;
      y += gap;
    } else if (anchor === "middle") {
      x += doubleGap;
      y -= doubleGap;
    } else if (anchor === "end") {
      isNegative && (x -= doubleGap);
      y += gap;
    }
  } else {
    if (anchor === "start") {
      x += gap;
      isNegative && (y += doubleGap * 2);
    } else if (anchor === "middle") {
      y -= doubleGap;
    } else if (anchor === "end") {
      x -= gap;
      isNegative && (y += doubleGap * 2);
    }
    if (isInverted) {
      y += isNegative ? -17 : isCandlestickType ? 13 : 7;
    }
  }
  return { x, y };
}
function getTextPos(d, type) {
  var _a;
  const position = this.config.data_labels_position;
  const { id, index, value } = d;
  return (_a = isFunction(position) ? position.bind(this.api)(type, value, id, index, this.$el.text) : (id in position ? position[id] : position)[type]) != null ? _a : 0;
}
/* harmony default export */ var internals_text = ({
  opacityForText(d) {
    const $$ = this;
    return $$.isBarType(d) && !$$.meetsLabelThreshold(
      Math.abs($$.getRatio("bar", d)),
      "bar"
    ) ? "0" : $$.hasDataLabel ? null : "0";
  },
  /**
   * Initializes the text
   * @private
   */
  initText() {
    const { $el } = this;
    $el.main.select(`.${$COMMON.chart}`).append("g").attr("class", $TEXT.chartTexts).style("pointer-events", $el.funnel || $el.treemap ? "none" : null);
  },
  /**
   * Update chartText
   * @param {object} targets $$.data.targets
   * @private
   */
  updateTargetsForText(targets) {
    const $$ = this;
    const classChartText = $$.getChartClass("Text");
    const classTexts = $$.getClass("texts", "id");
    const classFocus = $$.classFocus.bind($$);
    const mainTextUpdate = $$.$el.main.select(`.${$TEXT.chartTexts}`).selectAll(`.${$TEXT.chartText}`).data(targets).attr("class", (d) => `${classChartText(d)}${classFocus(d)}`.trim());
    const mainTextEnter = mainTextUpdate.enter().append("g").style("opacity", "0").attr("class", classChartText).call(
      $$.setCssRule(
        true,
        ` .${$TEXT.text}`,
        ["fill", "pointer-events:none"],
        $$.updateTextColor
      )
    );
    mainTextEnter.append("g").attr("class", classTexts);
  },
  /**
   * Update text
   * @private
   */
  updateText() {
    const $$ = this;
    const { $el, $T, config, axis } = $$;
    const classText = $$.getClass("text", "index");
    const labelsCentered = config.data_labels.centered;
    const text = $el.main.selectAll(`.${$TEXT.texts}`).selectAll(`.${$TEXT.text}`).data($$.labelishData.bind($$));
    $T(text.exit()).style("fill-opacity", "0").remove();
    $el.text = text.enter().append("text").merge(text).attr("class", classText).attr("text-anchor", (d) => {
      const isInverted = config[`axis_${axis == null ? void 0 : axis.getId(d.id)}_inverted`];
      let isEndAnchor = isInverted ? d.value > 0 : d.value < 0;
      if ($$.isCandlestickType(d)) {
        const data = $$.getCandlestickData(d);
        isEndAnchor = !(data == null ? void 0 : data._isUp);
      } else if ($$.isTreemapType(d)) {
        return labelsCentered ? "middle" : "start";
      }
      return config.axis_rotated ? isEndAnchor ? "end" : "start" : "middle";
    }).style("fill", $$.getStylePropValue($$.updateTextColor)).style("fill-opacity", "0").each(function(d, i, texts) {
      const node = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      let { value } = d;
      if ($$.isBubbleZType(d)) {
        value = $$.getBubbleZData(value, "z");
      } else if ($$.isCandlestickType(d)) {
        const data = $$.getCandlestickData(d);
        if (data) {
          value = data.close;
        }
      }
      value = $$.isTreemapType(d) ? $$.treemapDataLabelFormat(d)(node) : $$.dataLabelFormat(d.id)(value, d.id, d.index, texts);
      if (isNumber(value)) {
        this.textContent = value;
      } else {
        setTextValue(node, value);
      }
    });
  },
  updateTextColor(d) {
    const $$ = this;
    const { config } = $$;
    const labelColors = config.data_labels_colors;
    const defaultColor = $$.isArcType(d) && !$$.isRadarType(d) || $$.isFunnelType(d) || $$.isTreemapType(d) ? null : $$.color(d);
    let color;
    if (isString(labelColors)) {
      color = labelColors;
    } else if (isObject(labelColors)) {
      const { id } = d.data || d;
      color = labelColors[id];
    } else if (isFunction(labelColors)) {
      color = labelColors.bind($$.api)(defaultColor, d);
    }
    if ($$.isCandlestickType(d) && !isFunction(labelColors)) {
      const value = $$.getCandlestickData(d);
      if (!(value == null ? void 0 : value._isUp)) {
        const downColor = config.candlestick_color_down;
        color = isObject(downColor) ? downColor[d.id] : downColor;
      }
    }
    return color || defaultColor;
  },
  /**
   * Update data label text background color
   * @param {object} d Data object
   * @param {object|string} option option object
   * @returns {string|null}
   * @private
   */
  updateTextBGColor(d, option) {
    const $$ = this;
    const { $el } = $$;
    let color = "";
    if (isString(option) || isObject(option)) {
      const id = isString(option) ? "" : $$.getTargetSelectorSuffix("id" in d ? d.id : d.data.id);
      const filter = $el.defs.select(["filter[id*='labels-bg", "']"].join(id));
      if (filter.size()) {
        color = `url(#${filter.attr("id")})`;
      }
    }
    return color || null;
  },
  /**
   * Redraw chartText
   * @param {Function} getX Positioning function for x
   * @param {Function} getY Positioning function for y
   * @param {boolean} forFlow Weather is flow
   * @param {boolean} withTransition transition is enabled
   * @returns {Array}
   * @private
   */
  redrawText(getX, getY, forFlow, withTransition) {
    const $$ = this;
    const { $T, axis, config, state: { hasTreemap } } = $$;
    const t = getRandom(true);
    const isRotated = config.axis_rotated;
    const angle = config.data_labels.rotate;
    const anchorString = getRotateAnchor(angle);
    const rotateString = angle ? `rotate(${angle})` : "";
    $$.$el.text.style("fill", $$.getStylePropValue($$.updateTextColor)).attr(
      "filter",
      (d) => $$.updateTextBGColor.bind($$)(d, config.data_labels_backgroundColors)
    ).style("fill-opacity", forFlow ? 0 : $$.opacityForText.bind($$)).each(function(d, i) {
      const node = $T(
        hasTreemap && this.childElementCount ? this.parentNode : this,
        !!(withTransition && this.getAttribute("x")),
        t
      );
      const isInverted = config[`axis_${axis == null ? void 0 : axis.getId(d.id)}_inverted`];
      let pos = {
        x: getX.bind(this)(d, i),
        y: getY.bind(this)(d, i)
      };
      if (angle) {
        pos = setRotatePos.bind($$)(d, pos, anchorString, isRotated, isInverted);
        node.attr("text-anchor", anchorString);
      }
      if (this.childElementCount || angle) {
        node.attr("transform", `translate(${pos.x} ${pos.y}) ${rotateString}`);
      } else {
        node.attr("x", pos.x).attr("y", pos.y);
      }
    });
    return true;
  },
  /**
   * Gets the getBoundingClientRect value of the element
   * @param {HTMLElement|d3.selection} element Target element
   * @param {string} className Class name
   * @returns {object} value of element.getBoundingClientRect()
   * @private
   */
  getTextRect(element, className) {
    const $$ = this;
    let base = element.node ? element.node() : element;
    if (!/text/i.test(base.tagName)) {
      base = base.querySelector("text");
    }
    const text = base.textContent;
    const cacheKey = `${KEY.textRect}-${text.replace(/\W/g, "_")}`;
    let rect = $$.cache.get(cacheKey);
    if (!rect) {
      $$.$el.svg.append("text").style("visibility", "hidden").style("font", (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(base).style("font")).classed(className, true).text(text).call((v) => {
        rect = getBoundingRect(v.node());
      }).remove();
      $$.cache.add(cacheKey, rect);
    }
    return rect;
  },
  /**
   * Gets the x or y coordinate of the text
   * @param {object} indices Indices values
   * @param {boolean} forX whether or not to x
   * @returns {number} coordinates
   * @private
   */
  generateXYForText(indices, forX) {
    const $$ = this;
    const { state: { hasRadar, hasFunnel, hasTreemap } } = $$;
    const types = Object.keys(indices);
    const points = {};
    const getter = forX ? $$.getXForText : $$.getYForText;
    hasFunnel && types.push("funnel");
    hasRadar && types.push("radar");
    hasTreemap && types.push("treemap");
    types.forEach((v) => {
      points[v] = $$[`generateGet${capitalize(v)}Points`](indices[v], false);
    });
    return function(d, i) {
      const type = $$.isAreaType(d) && "area" || $$.isBarType(d) && "bar" || $$.isCandlestickType(d) && "candlestick" || $$.isFunnelType(d) && "funnel" || $$.isRadarType(d) && "radar" || $$.isTreemapType(d) && "treemap" || "line";
      return getter.call($$, points[type](d, i), d, this);
    };
  },
  /**
   * Get centerized text position for bar type data.label.text
   * @param {object} d Data object
   * @param {Array} points Data points position
   * @param {HTMLElement} textElement Data label text element
   * @param {string} type 'x' or 'y'
   * @returns {number} Position value
   * @private
   */
  getCenteredTextPos(d, points, textElement, type) {
    const $$ = this;
    const { config } = $$;
    const isRotated = config.axis_rotated;
    const isBarType = $$.isBarType(d);
    const isTreemapType = $$.isTreemapType(d);
    if (config.data_labels.centered && (isBarType || isTreemapType)) {
      const rect = getBoundingRect(textElement);
      if (isBarType) {
        const isPositive = $$.getRangedData(d, null, "bar") >= 0;
        if (isRotated) {
          const w = (isPositive ? points[1][1] - points[0][1] : points[0][1] - points[1][1]) / 2 + rect.width / 2;
          return isPositive ? -w - 3 : w + 2;
        } else {
          const h = (isPositive ? points[0][1] - points[1][1] : points[1][1] - points[0][1]) / 2 + rect.height / 2;
          return isPositive ? h : -h - 2;
        }
      } else if (isTreemapType) {
        return type === "x" ? (points[1][0] - points[0][0]) / 2 : (points[1][1] - points[0][1]) / 2 + rect.height / 2;
      }
    }
    return 0;
  },
  /**
   * Gets the x coordinate of the text
   * @param {object} points Data points position
   * @param {object} d Data object
   * @param {HTMLElement} textElement Data label text element
   * @returns {number} x coordinate
   * @private
   */
  getXForText(points, d, textElement) {
    var _a;
    const $$ = this;
    const { config } = $$;
    const isRotated = config.axis_rotated;
    const isFunnelType = $$.isFunnelType(d);
    const isTreemapType = $$.isTreemapType(d);
    let xPos = points ? points[0][0] : 0;
    if ($$.isCandlestickType(d)) {
      if (isRotated) {
        xPos = ((_a = $$.getCandlestickData(d)) == null ? void 0 : _a._isUp) ? points[2][2] + 4 : points[2][1] - 4;
      } else {
        xPos += (points[1][0] - xPos) / 2;
      }
    } else if (isFunnelType) {
      xPos += $$.state.current.width / 2;
    } else if (isTreemapType) {
      xPos += config.data_labels.centered ? 0 : 5;
    } else {
      if (isRotated) {
        const isInverted = config[`axis_${$$.axis.getId(d.id)}_inverted`];
        const padding = $$.isBarType(d) ? 4 : 6;
        const value = d.value;
        xPos = points[2][1];
        if (isInverted) {
          xPos -= padding * (value > 0 ? 1 : -1);
        } else {
          xPos += padding * (value < 0 ? -1 : 1);
        }
      } else {
        xPos = $$.hasType("bar") ? (points[2][0] + points[0][0]) / 2 : xPos;
      }
    }
    if (isRotated || isTreemapType) {
      xPos += $$.getCenteredTextPos(d, points, textElement, "x");
    }
    return xPos + getTextPos.call(this, d, "x");
  },
  /**
   * Gets the y coordinate of the text
   * @param {object} points Data points position
   * @param {object} d Data object
   * @param {HTMLElement} textElement Data label text element
   * @returns {number} y coordinate
   * @private
   */
  getYForText(points, d, textElement) {
    const $$ = this;
    const { axis, config, state } = $$;
    const isRotated = config.axis_rotated;
    const isInverted = config[`axis_${axis == null ? void 0 : axis.getId(d.id)}_inverted`];
    const isBarType = $$.isBarType(d);
    const isFunnelType = $$.isFunnelType(d);
    const isTreemapType = $$.isTreemapType(d);
    const r = config.point_r;
    const rect = getBoundingRect(textElement);
    let { value } = d;
    let baseY = 3;
    let yPos;
    if ($$.isCandlestickType(d)) {
      value = $$.getCandlestickData(d);
      if (isRotated) {
        yPos = points[0][0];
        yPos += (points[1][0] - yPos) / 2 + baseY;
      } else {
        yPos = value && value._isUp ? points[2][2] - baseY : points[2][1] + baseY * 4;
        if (isInverted) {
          yPos += 15 * (value._isUp ? 1 : -1);
        }
      }
    } else if (isFunnelType) {
      yPos = points ? points[0][1] + (points[1][1] - points[0][1]) / 2 + rect.height / 2 - 3 : 0;
    } else if (isTreemapType) {
      yPos = points[0][1] + (config.data_labels.centered ? 0 : rect.height + 5);
    } else {
      if (isRotated) {
        yPos = (points[0][0] + points[2][0] + rect.height * 0.6) / 2;
      } else {
        yPos = points[2][1];
        if (isNumber(r) && r > 5 && ($$.isLineType(d) || $$.isScatterType(d))) {
          baseY += config.point_r / 2.3;
        }
        if (value < 0 || value === 0 && !state.hasPositiveValue && state.hasNegativeValue) {
          yPos += isInverted ? isBarType ? -3 : -5 : rect.height + (isBarType ? -baseY : baseY);
        } else {
          let diff = -baseY * 2;
          if (isBarType) {
            diff = -baseY;
          } else if ($$.isBubbleType(d)) {
            diff = baseY;
          }
          if (isInverted) {
            diff = isBarType ? 10 : 15;
          }
          yPos += diff;
        }
      }
    }
    if (!isRotated || isTreemapType) {
      yPos += $$.getCenteredTextPos(d, points, textElement, "y");
    }
    return yPos + getTextPos.call(this, d, "y");
  },
  /**
   * Calculate if two or more text nodes are overlapping
   * Mark overlapping text nodes with "text-overlapping" class
   * @param {string} id Axis id
   * @param {ChartInternal} $$ ChartInternal context
   * @param {string} selector Selector string
   * @private
   */
  markOverlapped(id, $$, selector) {
    const textNodes = $$.$el.arcs.selectAll(selector);
    const filteredTextNodes = textNodes.filter((node) => node.data.id !== id);
    const textNode = textNodes.filter((node) => node.data.id === id);
    const translate = getTranslation(textNode.node());
    const calcHypo = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    textNode.node() && filteredTextNodes.each(function() {
      const coordinate = getTranslation(this);
      const filteredTextNode = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      const nodeForWidth = calcHypo(translate.e, translate.f) > calcHypo(coordinate.e, coordinate.f) ? textNode : filteredTextNode;
      const overlapsX = Math.ceil(Math.abs(translate.e - coordinate.e)) < Math.ceil(nodeForWidth.node().getComputedTextLength());
      const overlapsY = Math.ceil(Math.abs(translate.f - coordinate.f)) < parseInt(textNode.style("font-size"), 10);
      filteredTextNode.classed($TEXT.TextOverlapping, overlapsX && overlapsY);
    });
  },
  /**
   * Calculate if two or more text nodes are overlapping
   * Remove "text-overlapping" class on selected text nodes
   * @param {ChartInternal} $$ ChartInternal context
   * @param {string} selector Selector string
   * @private
   */
  undoMarkOverlapped($$, selector) {
    $$.$el.arcs.selectAll(selector).each(function() {
      (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.selectAll)([this, this.previousSibling]).classed($TEXT.TextOverlapping, false);
    });
  },
  /**
   * Check if meets the ratio to show data label text
   * @param {number} ratio ratio to meet
   * @param {string} type chart type
   * @returns {boolean}
   * @private
   */
  meetsLabelThreshold(ratio = 0, type) {
    const $$ = this;
    const { config } = $$;
    const threshold = config[`${type}_label_threshold`] || 0;
    return ratio >= threshold;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/title.ts


function getTextXPos(pos = "left", width) {
  const isNum = isNumber(width);
  let position;
  if (pos.indexOf("center") > -1) {
    position = isNum ? width / 2 : "middle";
  } else if (pos.indexOf("right") > -1) {
    position = isNum ? width : "end";
  } else {
    position = isNum ? 0 : "start";
  }
  return position;
}
/* harmony default export */ var internals_title = ({
  /**
   * Initializes the title
   * @private
   */
  initTitle() {
    const $$ = this;
    const { config, $el } = $$;
    if (config.title_text) {
      $el.title = $el.svg.append("g");
      const text = $el.title.append("text").style("text-anchor", getTextXPos(config.title_position)).attr("class", $TEXT.title);
      setTextValue(text, config.title_text, [0.3, 1.5]);
    }
  },
  /**
   * Redraw title
   * @private
   */
  redrawTitle() {
    const $$ = this;
    const { config, state: { current }, $el: { title } } = $$;
    if (title) {
      const x = getTextXPos(config.title_position, current.width);
      const y = (config.title_padding.top || 0) + $$.getTextRect($$.$el.title, $TEXT.title).height;
      title.attr("transform", `translate(${x}, ${y})`);
    }
  },
  /**
   * Get title padding
   * @returns {number} padding value
   * @private
   */
  getTitlePadding() {
    const $$ = this;
    const { $el: { title }, config } = $$;
    return (config.title_padding.top || 0) + (title ? $$.getTextRect(title, $TEXT.title).height : 0) + (config.title_padding.bottom || 0);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/tooltip.ts




/* harmony default export */ var internals_tooltip = ({
  /**
   * Initializes the tooltip
   * @private
   */
  initTooltip() {
    const $$ = this;
    const { config, $el } = $$;
    $el.tooltip = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(config.tooltip_contents.bindto);
    if ($el.tooltip.empty()) {
      $el.tooltip = $el.chart.append("div").attr("class", $TOOLTIP.tooltipContainer).style("position", "absolute").style("pointer-events", "none").style("display", "none");
    }
    $$.bindTooltipResizePos();
  },
  /**
   * Show tooltip at initialization.
   * Is called only when tooltip.init.show=true option is set
   * @private
   */
  initShowTooltip() {
    var _a;
    const $$ = this;
    const { config, $el, state: { hasAxis, hasRadar } } = $$;
    if (config.tooltip_init_show) {
      const isArc = !(hasAxis || hasRadar);
      if (((_a = $$.axis) == null ? void 0 : _a.isTimeSeries()) && isString(config.tooltip_init_x)) {
        config.tooltip_init_x = parseDate.call($$, config.tooltip_init_x);
      }
      $$.api.tooltip.show({
        data: {
          [isArc ? "index" : "x"]: config.tooltip_init_x
        }
      });
      const position = config.tooltip_init_position;
      if (!config.tooltip_contents.bindto && !isEmpty(position)) {
        const { top = 0, left = 50 } = position;
        $el.tooltip.style("top", isString(top) ? top : `${top}px`).style("left", isString(left) ? left : `${left}px`).style("display", null);
      }
    }
  },
  /**
   * Get the tooltip HTML string
   * @param  {Array} args Arguments
   * @returns {string} Formatted HTML string
   * @private
   */
  getTooltipHTML(...args) {
    const $$ = this;
    const { api, config } = $$;
    return isFunction(config.tooltip_contents) ? config.tooltip_contents.bind(api)(...args) : $$.getTooltipContent(...args);
  },
  /**
   * Returns the tooltip content(HTML string)
   * @param {object} d data
   * @param {Function} defaultTitleFormat Default title format
   * @param {Function} defaultValueFormat Default format for each data value in the tooltip.
   * @param {Function} color Color function
   * @returns {string} html
   * @private
   */
  getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color) {
    var _a;
    const $$ = this;
    const { api, config, state, $el } = $$;
    const [titleFn, nameFn, valueFn] = ["title", "name", "value"].map((v) => {
      const fn = config[`tooltip_format_${v}`];
      return isFunction(fn) ? fn.bind(api) : fn;
    });
    const titleFormat = (...arg) => sanitize((titleFn || defaultTitleFormat)(...arg));
    const nameFormat = (...arg) => sanitize((nameFn || ((name) => name))(...arg));
    const valueFormat = (...arg) => {
      const fn = valueFn || (state.hasTreemap || $$.isStackNormalized() ? (v, ratio) => `${(ratio * 100).toFixed(2)}%` : defaultValueFormat);
      return sanitize(fn(...arg));
    };
    const order = config.tooltip_order;
    const getRowValue = (row2) => $$.axis && $$.isBubbleZType(row2) ? $$.getBubbleZData(row2.value, "z") : $$.getBaseValue(row2);
    const getBgColor = $$.levelColor ? (row2) => $$.levelColor(row2.value) : (row2) => color(row2);
    const contents = config.tooltip_contents;
    const tplStr = contents.template;
    const targetIds = $$.mapToTargetIds();
    if (order === null && config.data_groups.length) {
      const ids = $$.orderTargets($$.data.targets).map((i2) => i2.id).reverse();
      d.sort((a, b) => {
        let v1 = a ? a.value : null;
        let v2 = b ? b.value : null;
        if (v1 > 0 && v2 > 0) {
          v1 = a.id ? ids.indexOf(a.id) : null;
          v2 = b.id ? ids.indexOf(b.id) : null;
        }
        return v1 - v2;
      });
    } else if (/^(asc|desc)$/.test(order)) {
      const isAscending = order === "asc";
      d.sort((a, b) => {
        const v1 = a ? getRowValue(a) : null;
        const v2 = b ? getRowValue(b) : null;
        return isAscending ? v1 - v2 : v2 - v1;
      });
    } else if (isFunction(order)) {
      d.sort(order.bind(api));
    }
    const tpl = $$.getTooltipContentTemplate(tplStr);
    const len = d.length;
    let text;
    let row;
    let param;
    let value;
    let i;
    for (i = 0; i < len; i++) {
      row = d[i];
      if (!row || !(getRowValue(row) || getRowValue(row) === 0)) {
        continue;
      }
      if (isUndefined(text)) {
        const title = (state.hasAxis || state.hasRadar) && titleFormat(row.x);
        text = tplProcess(tpl[0], {
          CLASS_TOOLTIP: $TOOLTIP.tooltip,
          TITLE: isValue(title) ? tplStr ? title : `<tr><th colspan="2">${title}</th></tr>` : ""
        });
      }
      if (!row.ratio && $el.arcs) {
        param = ["arc", $$.$el.arcs.select(`path.${$ARC.arc}-${row.id}`).data()[0]];
        row.ratio = $$.getRatio(...param);
      }
      param = [row.ratio, row.id, row.index];
      if ($$.isAreaRangeType(row)) {
        const [high, low] = ["high", "low"].map(
          (v) => valueFormat($$.getRangedData(row, v), ...param)
        );
        const mid = valueFormat(getRowValue(row), ...param);
        value = `<b>Mid:</b> ${mid} <b>High:</b> ${high} <b>Low:</b> ${low}`;
      } else if ($$.isCandlestickType(row)) {
        const [open, high, low, close, volume] = ["open", "high", "low", "close", "volume"].map((v) => {
          const value2 = $$.getRangedData(row, v, "candlestick");
          return value2 ? valueFormat(
            $$.getRangedData(row, v, "candlestick"),
            ...param
          ) : void 0;
        });
        value = `<b>Open:</b> ${open} <b>High:</b> ${high} <b>Low:</b> ${low} <b>Close:</b> ${close}${volume ? ` <b>Volume:</b> ${volume}` : ""}`;
      } else if ($$.isBarRangeType(row)) {
        const { value: rangeValue, id, index } = row;
        value = `${valueFormat(rangeValue, void 0, id, index)}`;
      } else {
        value = valueFormat(getRowValue(row), ...param);
      }
      if (value !== void 0) {
        if (row.name === null) {
          continue;
        }
        const name = nameFormat((_a = row.name) != null ? _a : row.id, ...param);
        const color2 = getBgColor(row);
        const contentValue = {
          CLASS_TOOLTIP_NAME: $TOOLTIP.tooltipName + $$.getTargetSelectorSuffix(row.id),
          COLOR: tplStr || !$$.patterns ? color2 : `<svg><rect style="fill:${color2}" width="10" height="10"></rect></svg>`,
          NAME: name,
          VALUE: value
        };
        if (tplStr && isObject(contents.text)) {
          const index = targetIds.indexOf(row.id);
          Object.keys(contents.text).forEach((key) => {
            contentValue[key] = contents.text[key][index];
          });
        }
        text += tplProcess(tpl[1], contentValue);
      }
    }
    return `${text}</table>`;
  },
  /**
   * Get the content template string
   * @param {string} tplStr Tempalte string
   * @returns {Array} Template string
   * @private
   */
  getTooltipContentTemplate(tplStr) {
    return (tplStr || `<table class="{=CLASS_TOOLTIP}"><tbody>
				{=TITLE}
				{{<tr class="{=CLASS_TOOLTIP_NAME}">
					<td class="name">${this.patterns ? `{=COLOR}` : `<span style="background-color:{=COLOR}"></span>`}{=NAME}</td>
					<td class="value">{=VALUE}</td>
				</tr>}}
			</tbody></table>`).replace(/(\r?\n|\t)/g, "").split(/{{(.*)}}/);
  },
  /**
   * Update tooltip position coordinate
   * @param {object} dataToShow Data object
   * @param {SVGElement} eventTarget Event element
   * @private
   */
  setTooltipPosition(dataToShow, eventTarget) {
    var _a, _b;
    const $$ = this;
    const { config, scale, state, $el: { eventRect, tooltip } } = $$;
    const { bindto } = config.tooltip_contents;
    const isRotated = config.axis_rotated;
    const datum = tooltip == null ? void 0 : tooltip.datum();
    if (!bindto && datum) {
      const data = dataToShow != null ? dataToShow : JSON.parse(datum.current);
      const [x, y] = getPointer(state.event, eventTarget != null ? eventTarget : eventRect == null ? void 0 : eventRect.node());
      const currPos = { x, y };
      if (state.hasAxis && scale.x && datum && "x" in datum) {
        const getYPos = (value = 0, id, axisId = "y") => {
          var _a2;
          const scaleFn = scale[id ? (_a2 = $$.axis) == null ? void 0 : _a2.getId(id) : axisId];
          return scaleFn ? scaleFn(value) + (isRotated ? state.margin.left : state.margin.top) : 0;
        };
        currPos.xAxis = scale.x(datum.x) + // add margin only when user specified tooltip.position function
        (config.tooltip_position ? isRotated ? state.margin.top : state.margin.left : 0);
        if (data.length === 1) {
          currPos.yAxis = getYPos(data[0].value, data[0].id);
        } else {
          currPos.yAxis = getYPos;
        }
      }
      const { width = 0, height = 0 } = datum;
      const pos = (_b = (_a = config.tooltip_position) == null ? void 0 : _a.bind($$.api)(
        data,
        width,
        height,
        eventRect == null ? void 0 : eventRect.node(),
        currPos
      )) != null ? _b : $$.getTooltipPosition.bind($$)(width, height, currPos);
      ["top", "left"].forEach((v) => {
        const value = pos[v];
        tooltip.style(v, `${value}px`);
        if (v === "left" && !datum.xPosInPercent) {
          datum.xPosInPercent = value / state.current.width * 100;
        }
      });
    }
  },
  /**
   * Returns the position of the tooltip
   * @param {string} tWidth Width value of tooltip element
   * @param {string} tHeight Height value of tooltip element
   * @param {object} currPos Current mouse position
   * @returns {object} top, left value
   * @private
   */
  getTooltipPosition(tWidth, tHeight, currPos) {
    var _a, _b, _c;
    const $$ = this;
    const { config, scale, state } = $$;
    const { width, height, current, hasFunnel, hasRadar, hasTreemap, isLegendRight, inputType } = state;
    const hasGauge = $$.hasType("gauge") && !config.gauge_fullCircle;
    const isRotated = config.axis_rotated;
    const hasArcType = $$.hasArcType();
    const svgLeft = $$.getSvgLeft(true);
    let chartRight = svgLeft + current.width - $$.getCurrentPaddingByDirection("right");
    const size = 20;
    let { x, y } = currPos;
    if (hasRadar) {
      x += x >= width / 2 ? 15 : -(tWidth + 15);
      y += 15;
    } else if (hasArcType) {
      const notTouch = inputType !== "touch";
      if (notTouch) {
        let titlePadding = (_b = (_a = $$.getTitlePadding) == null ? void 0 : _a.call($$)) != null ? _b : 0;
        if (titlePadding && hasGauge && ((_c = config.arc_rangeText_values) == null ? void 0 : _c.length)) {
          titlePadding += 10;
        }
        x += (width - (isLegendRight ? $$.getLegendWidth() : 0)) / 2;
        y += (hasGauge ? height : height / 2 + tHeight) + titlePadding;
      }
    } else if (hasFunnel || hasTreemap) {
      y += tHeight;
    } else {
      const padding = {
        top: $$.getCurrentPaddingByDirection("top", true),
        left: $$.getCurrentPaddingByDirection("left", true)
      };
      if (isRotated) {
        x += svgLeft + padding.left + size;
        y = padding.top + currPos.xAxis + size;
        chartRight -= svgLeft;
      } else {
        x = svgLeft + padding.left + size + (scale.zoom ? x : currPos.xAxis);
        y += padding.top - 5;
      }
    }
    if (x + tWidth + 15 > chartRight) {
      x -= tWidth + (hasFunnel || hasTreemap || hasArcType ? 0 : isRotated ? size * 2 : 38);
    }
    if (y + tHeight > current.height) {
      const gap = hasTreemap ? tHeight + 10 : 30;
      y -= hasGauge ? tHeight * 1.5 : tHeight + gap;
    }
    const pos = { top: y, left: x };
    Object.keys(pos).forEach((v) => {
      if (pos[v] < 0) {
        pos[v] = 0;
      }
    });
    return pos;
  },
  /**
   * Show the tooltip
   * @param {object} selectedData Data object
   * @param {SVGElement} eventTarget Event element
   * @private
   */
  showTooltip(selectedData, eventTarget) {
    const $$ = this;
    const { config, $el: { tooltip } } = $$;
    const dataToShow = selectedData.filter((d) => d && isValue($$.getBaseValue(d)));
    if (!tooltip || dataToShow.length === 0 || !config.tooltip_show) {
      return;
    }
    let datum = tooltip.datum();
    const dataStr = JSON.stringify(selectedData);
    if (!datum || datum.current !== dataStr) {
      const { index, x } = selectedData.concat().sort()[0];
      callFn(config.tooltip_onshow, $$.api, selectedData);
      tooltip.html($$.getTooltipHTML(
        selectedData,
        // data
        $$.axis ? $$.axis.getXAxisTickFormat() : $$.categoryName.bind($$),
        // defaultTitleFormat
        $$.getDefaultValueFormat(),
        // defaultValueFormat
        $$.color
        // color
      )).style("display", null).style("visibility", null).datum(datum = {
        index,
        x,
        current: dataStr,
        width: tooltip.property("offsetWidth"),
        height: tooltip.property("offsetHeight")
      });
      callFn(config.tooltip_onshown, $$.api, selectedData);
      $$._handleLinkedCharts(true, index);
    }
    $$.setTooltipPosition(dataToShow, eventTarget);
  },
  /**
   * Adjust tooltip position on resize event
   * @private
   */
  bindTooltipResizePos() {
    const $$ = this;
    const { resizeFunction, state, $el: { tooltip } } = $$;
    resizeFunction.add(() => {
      if (tooltip.style("display") === "block") {
        const { current } = state;
        const { width, xPosInPercent } = tooltip.datum();
        let value = current.width / 100 * xPosInPercent;
        const diff = current.width - (value + width);
        if (diff < 0) {
          value += diff;
        }
        tooltip.style("left", `${value}px`);
      }
    });
  },
  /**
   * Hide the tooltip
   * @param {boolean} force Force to hide
   * @private
   */
  hideTooltip(force) {
    var _a;
    const $$ = this;
    const { api, config, $el: { tooltip } } = $$;
    if (tooltip && tooltip.style("display") !== "none" && (!config.tooltip_doNotHide || force)) {
      const selectedData = JSON.parse((_a = tooltip.datum().current) != null ? _a : {});
      callFn(config.tooltip_onhide, api, selectedData);
      tooltip.style("display", "none").style("visibility", "hidden").datum(null);
      callFn(config.tooltip_onhidden, api, selectedData);
    }
  },
  /**
   * Toggle display for linked chart instances
   * @param {boolean} show true: show, false: hide
   * @param {number} index x Axis index
   * @private
   */
  _handleLinkedCharts(show, index) {
    const $$ = this;
    const { charts, config, state: { event } } = $$;
    if ((event == null ? void 0 : event.isTrusted) && config.tooltip_linked && charts.length > 1) {
      const linkedName = config.tooltip_linked_name;
      charts.filter((c) => c !== $$.api).forEach((c) => {
        const { config: config2, $el } = c.internal;
        const isLinked = config2.tooltip_linked;
        const name = config2.tooltip_linked_name;
        const isInDom = browser_doc.body.contains($el.chart.node());
        if (isLinked && linkedName === name && isInDom) {
          const data = $el.tooltip.data()[0];
          const isNotSameIndex = index !== (data == null ? void 0 : data.index);
          try {
            c.tooltip[show && isNotSameIndex ? "show" : "hide"]({ index });
          } catch (e) {
          }
        }
      });
    }
  },
  /**
   * Update tooltip content on redraw
   * - In a situation where tooltip is displayed and data load happens, it should reflect loaded data to tooltip
   * @param {d3Selection} context Event rect element
   * @param {number} index Data index
   * @private
   */
  updateTooltipOnRedraw(context, index) {
    var _a;
    const $$ = this;
    const {
      config,
      $el: { eventRect, svg, tooltip },
      state: { event, hasAxis, hasRadar, hasTreemap }
    } = $$;
    if ((tooltip == null ? void 0 : tooltip.style("display")) === "block" && event) {
      const rect = context != null ? context : (_a = hasRadar ? svg : eventRect) == null ? void 0 : _a.node();
      if (hasAxis || hasRadar) {
        if ($$.isMultipleX()) {
          $$.selectRectForMultipleXs(rect, false);
        } else {
          const idx = index != null ? index : $$.getDataIndexFromEvent(event);
          if (index === -1) {
            $$.api.tooltip.hide();
          } else {
            $$.selectRectForSingle(rect, idx);
            $$.setExpand(idx, null, true);
          }
        }
      } else {
        const { clientX, clientY } = event;
        setTimeout(() => {
          let target = browser_doc.elementFromPoint(clientX, clientY);
          const data = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(target).datum();
          if (data) {
            const d = $$.hasArcType() ? $$.convertToArcData($$.updateAngle(data)) : data == null ? void 0 : data.data;
            hasTreemap && (target = svg.node());
            d && $$.showTooltip([d], target);
          } else {
            $$.api.tooltip.hide();
          }
        }, config.transition_duration);
      }
    }
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/transform.ts


/* harmony default export */ var transform = ({
  getTranslate(target, index = 0) {
    var _a;
    const $$ = this;
    const { config, state } = $$;
    const isRotated = config.axis_rotated;
    let padding = 0;
    let x;
    let y;
    if (index && /^(x|y2?)$/.test(target)) {
      padding = $$.getAxisSize(target) * index;
    }
    if (target === "main") {
      x = asHalfPixel(state.margin.left);
      y = asHalfPixel(state.margin.top);
    } else if (target === "context") {
      x = asHalfPixel(state.margin2.left);
      y = asHalfPixel(state.margin2.top);
    } else if (target === "legend") {
      x = state.margin3.left;
      y = state.margin3.top;
    } else if (target === "x") {
      x = isRotated ? -padding : 0;
      y = isRotated ? 0 : state.height + padding;
    } else if (target === "y") {
      x = isRotated ? 0 : -padding;
      y = isRotated ? state.height + padding : 0;
    } else if (target === "y2") {
      x = isRotated ? 0 : state.width + padding;
      y = isRotated ? -padding - 1 : 0;
    } else if (target === "subX") {
      x = 0;
      y = isRotated ? 0 : state.height2;
    } else if (target === "arc") {
      x = state.arcWidth / 2;
      y = state.arcHeight / 2;
      if ((_a = config.arc_rangeText_values) == null ? void 0 : _a.length) {
        y += 5 + ($$.hasType("gauge") && config.title_text ? 10 : 0);
      }
    } else if (target === "polar") {
      x = state.arcWidth / 2;
      y = state.arcHeight / 2;
    } else if (target === "radar") {
      const [width, height] = $$.getRadarSize();
      x = state.width / 2 - width;
      y = state.height / 2 - height;
    }
    return `translate(${x}, ${y})`;
  },
  transformMain(withTransition, transitions) {
    const $$ = this;
    const { $el: { main }, $T } = $$;
    const xAxis = (transitions == null ? void 0 : transitions.axisX) ? transitions.axisX : $T(main.select(`.${$AXIS.axisX}`), withTransition);
    const yAxis = (transitions == null ? void 0 : transitions.axisY) ? transitions.axisY : $T(main.select(`.${$AXIS.axisY}`), withTransition);
    const y2Axis = (transitions == null ? void 0 : transitions.axisY2) ? transitions.axisY2 : $T(main.select(`.${$AXIS.axisY2}`), withTransition);
    $T(main, withTransition).attr("transform", $$.getTranslate("main"));
    xAxis.attr("transform", $$.getTranslate("x"));
    yAxis.attr("transform", $$.getTranslate("y"));
    y2Axis.attr("transform", $$.getTranslate("y2"));
    main.select(`.${$ARC.chartArcs}`).attr("transform", $$.getTranslate("arc"));
  },
  transformAll(withTransition, transitions) {
    const $$ = this;
    const { config, state: { hasAxis, hasFunnel, hasTreemap }, $el } = $$;
    !hasFunnel && !hasTreemap && $$.transformMain(withTransition, transitions);
    hasAxis && config.subchart_show && $$.transformContext(withTransition, transitions);
    $el.legend && $$.transformLegend(withTransition);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/type.ts


/* harmony default export */ var type = ({
  /**
   * Check if the given chart type is valid
   * @param {string} type Chart type string
   * @returns {boolean}
   * @private
   */
  isValidChartType(type) {
    return !!(type && Object.values(TYPE).indexOf(type) > -1);
  },
  setTargetType(targetIds, type) {
    const $$ = this;
    const { config, state: { withoutFadeIn } } = $$;
    $$.mapToTargetIds(targetIds).forEach((id) => {
      withoutFadeIn[id] = type === config.data_types[id];
      config.data_types[id] = type;
    });
    if (!targetIds) {
      config.data_type = type;
    }
  },
  /**
   * Updte current used chart types
   * @private
   */
  updateTypesElements() {
    const $$ = this;
    const { state: { current } } = $$;
    Object.keys(TYPE).forEach((v) => {
      const t = TYPE[v];
      const has = $$.hasType(t, null, true);
      const idx = current.types.indexOf(t);
      if (idx === -1 && has) {
        current.types.push(t);
      } else if (idx > -1 && !has) {
        current.types.splice(idx, 1);
      }
    });
    $$.setChartElements();
  },
  /**
   * Check if given chart types exists
   * @param {string} type Chart type
   * @param {Array} targetsValue Data array
   * @param {boolean} checkFromData Force to check type cotains from data targets
   * @returns {boolean}
   * @private
   */
  hasType(type, targetsValue, checkFromData = false) {
    var _a;
    const $$ = this;
    const { config, state: { current } } = $$;
    const types = config.data_types;
    const targets = targetsValue || $$.data.targets;
    let has = false;
    if (!checkFromData && ((_a = current.types) == null ? void 0 : _a.indexOf(type)) > -1) {
      has = true;
    } else if (targets == null ? void 0 : targets.length) {
      targets.forEach((target) => {
        const t = types[target.id];
        if (t === type || !t && type === "line") {
          has = true;
        }
      });
    } else if (Object.keys(types).length) {
      Object.keys(types).forEach((id) => {
        if (types[id] === type) {
          has = true;
        }
      });
    } else {
      has = config.data_type === type;
    }
    return has;
  },
  /**
   * Check if contains given chart types
   * @param {string} type Type key
   * @param {object} targets Target data
   * @param {Array} exclude Excluded types
   * @returns {boolean}
   * @private
   */
  hasTypeOf(type, targets, exclude = []) {
    if (type in TYPE_BY_CATEGORY) {
      return !TYPE_BY_CATEGORY[type].filter((v) => exclude.indexOf(v) === -1).every((v) => !this.hasType(v, targets));
    }
    return false;
  },
  /**
   * Check if given data is certain chart type
   * @param {object} d Data object
   * @param {string|Array} type chart type
   * @returns {boolean}
   * @private
   */
  isTypeOf(d, type) {
    var _a;
    const id = isString(d) ? d : d.id;
    const dataType = this.config && (((_a = this.config.data_types) == null ? void 0 : _a[id]) || this.config.data_type);
    return isArray(type) ? type.indexOf(dataType) >= 0 : dataType === type;
  },
  hasPointType() {
    const $$ = this;
    return $$.hasTypeOf("Line") || $$.hasType("bubble") || $$.hasType("scatter");
  },
  /**
   * Check if contains arc types chart
   * @param {object} targets Target data
   * @param {Array} exclude Excluded types
   * @returns {boolean}
   * @private
   */
  hasArcType(targets, exclude) {
    return this.hasTypeOf("Arc", targets, exclude);
  },
  hasMultiArcGauge() {
    return this.hasType("gauge") && this.config.gauge_type === "multi";
  },
  isLineType(d) {
    const id = isString(d) ? d : d.id;
    return !this.config.data_types[id] || this.isTypeOf(id, TYPE_BY_CATEGORY.Line);
  },
  isStepType(d) {
    return this.isTypeOf(d, TYPE_BY_CATEGORY.Step);
  },
  isSplineType(d) {
    return this.isTypeOf(d, TYPE_BY_CATEGORY.Spline);
  },
  isAreaType(d) {
    return this.isTypeOf(d, TYPE_BY_CATEGORY.Area);
  },
  isAreaRangeType(d) {
    return this.isTypeOf(d, TYPE_BY_CATEGORY.AreaRange);
  },
  isBarType(d) {
    return this.isTypeOf(d, "bar");
  },
  isBubbleType(d) {
    return this.isTypeOf(d, "bubble");
  },
  isCandlestickType(d) {
    return this.isTypeOf(d, "candlestick");
  },
  isScatterType(d) {
    return this.isTypeOf(d, "scatter");
  },
  isTreemapType(d) {
    return this.isTypeOf(d, "treemap");
  },
  isPieType(d) {
    return this.isTypeOf(d, "pie");
  },
  isFunnelType(d) {
    return this.isTypeOf(d, "funnel");
  },
  isGaugeType(d) {
    return this.isTypeOf(d, "gauge");
  },
  isDonutType(d) {
    return this.isTypeOf(d, "donut");
  },
  isPolarType(d) {
    return this.isTypeOf(d, "polar");
  },
  isRadarType(d) {
    return this.isTypeOf(d, "radar");
  },
  isArcType(d) {
    return this.isPieType(d) || this.isDonutType(d) || this.isGaugeType(d) || this.isPolarType(d) || this.isRadarType(d);
  },
  // determine if is 'circle' data point
  isCirclePoint(node) {
    const { config } = this;
    const pattern = config.point_pattern;
    let isCircle = false;
    if ((node == null ? void 0 : node.tagName) === "circle") {
      isCircle = true;
    } else {
      isCircle = config.point_type === "circle" && (!pattern || isArray(pattern) && pattern.length === 0);
    }
    return isCircle;
  },
  lineData(d) {
    return this.isLineType(d) ? [d] : [];
  },
  arcData(d) {
    return this.isArcType(d.data) ? [d] : [];
  },
  /**
   * Get data adapt for data label showing
   * @param {object} d Data object
   * @returns {Array}
   * @private
   */
  labelishData(d) {
    return this.isBarType(d) || this.isLineType(d) || this.isScatterType(d) || this.isBubbleType(d) || this.isCandlestickType(d) || this.isFunnelType(d) || this.isRadarType(d) || this.isTreemapType(d) ? d.values.filter((v) => isNumber(v.value) || Boolean(v.value)) : [];
  },
  barLineBubbleData(d) {
    return this.isBarType(d) || this.isLineType(d) || this.isBubbleType(d) ? d.values : [];
  },
  // https://github.com/d3/d3-shape#curves
  isInterpolationType(type) {
    return [
      "basis",
      "basis-closed",
      "basis-open",
      "bundle",
      "cardinal",
      "cardinal-closed",
      "cardinal-open",
      "catmull-rom",
      "catmull-rom-closed",
      "catmull-rom-open",
      "linear",
      "linear-closed",
      "monotone-x",
      "monotone-y",
      "natural"
    ].indexOf(type) >= 0;
  }
});

// EXTERNAL MODULE: external {"commonjs":"d3-shape","commonjs2":"d3-shape","amd":"d3-shape","root":"d3"}
var external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_ = __webpack_require__(9);
;// CONCATENATED MODULE: ./src/ChartInternal/shape/shape.ts




function getGroupedDataPointsFn(d) {
  const $$ = this;
  let fn;
  if ($$.isLineType(d)) {
    fn = $$.generateGetLinePoints($$.getShapeIndices($$.isLineType));
  } else if ($$.isBarType(d)) {
    fn = $$.generateGetBarPoints($$.getShapeIndices($$.isBarType));
  }
  return fn;
}
/* harmony default export */ var shape = ({
  /**
   * Get the shape draw function
   * @returns {object}
   * @private
   */
  getDrawShape() {
    const $$ = this;
    const isRotated = $$.config.axis_rotated;
    const { hasRadar, hasTreemap } = $$.state;
    const shape = { type: {}, indices: {}, pos: {} };
    !hasTreemap && ["bar", "candlestick", "line", "area"].forEach((v) => {
      const name = capitalize(/^(bubble|scatter)$/.test(v) ? "line" : v);
      if ($$.hasType(v) || $$.hasTypeOf(name) || v === "line" && ($$.hasType("bubble") || $$.hasType("scatter"))) {
        const indices = $$.getShapeIndices($$[`is${name}Type`]);
        const drawFn = $$[`generateDraw${name}`];
        shape.indices[v] = indices;
        shape.type[v] = drawFn ? drawFn.bind($$)(indices, false) : void 0;
      }
    });
    if (!$$.hasArcType() || hasRadar || hasTreemap) {
      let cx;
      let cy;
      if (!hasTreemap) {
        cx = hasRadar ? $$.radarCircleX : isRotated ? $$.circleY : $$.circleX;
        cy = hasRadar ? $$.radarCircleY : isRotated ? $$.circleX : $$.circleY;
      }
      shape.pos = {
        xForText: $$.generateXYForText(shape.indices, true),
        yForText: $$.generateXYForText(shape.indices, false),
        cx: (cx || function() {
        }).bind($$),
        cy: (cy || function() {
        }).bind($$)
      };
    }
    return shape;
  },
  /**
   * Get shape's indices according it's position within each axis tick.
   *
   * From the below example, indices will be:
   * ==> {data1: 0, data2: 0, data3: 1, data4: 1, __max__: 1}
   *
   * 	data1 data3   data1 data3
   * 	data2 data4   data2 data4
   * 	-------------------------
   * 		 0             1
   * @param {Function} typeFilter Chart type filter function
   * @returns {object} Indices object with its position
   */
  getShapeIndices(typeFilter) {
    const $$ = this;
    const { config } = $$;
    const xs = config.data_xs;
    const hasXs = notEmpty(xs);
    const indices = {};
    let i = hasXs ? {} : 0;
    if (hasXs) {
      getUnique(Object.keys(xs).map((v) => xs[v])).forEach((v) => {
        i[v] = 0;
        indices[v] = {};
      });
    }
    $$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$)).forEach((d) => {
      var _a;
      const xKey = d.id in xs ? xs[d.id] : "";
      const ind = xKey ? indices[xKey] : indices;
      for (let j = 0, groups; groups = config.data_groups[j]; j++) {
        if (groups.indexOf(d.id) < 0) {
          continue;
        }
        for (let k = 0, key; key = groups[k]; k++) {
          if (key in ind) {
            ind[d.id] = ind[key];
            break;
          }
          if (d.id !== key && xKey) {
            ind[key] = (_a = ind[d.id]) != null ? _a : i[xKey];
          }
        }
      }
      if (isUndefined(ind[d.id])) {
        ind[d.id] = xKey ? i[xKey]++ : i++;
        ind.__max__ = (xKey ? i[xKey] : i) - 1;
      }
    });
    return indices;
  },
  /**
   * Get indices value based on data ID value
   * @param {object} indices Indices object
   * @param {object} d Data row
   * @param {string} caller Caller function name (Used only for 'sparkline' plugin)
   * @returns {object} Indices object
   * @private
   */
  getIndices(indices, d, caller) {
    const $$ = this;
    const { data_xs: xs, bar_indices_removeNull: removeNull } = $$.config;
    const { id, index } = d;
    if ($$.isBarType(id) && removeNull) {
      const ind = {};
      $$.getAllValuesOnIndex(index, true).forEach((v, i) => {
        ind[v.id] = i;
        ind.__max__ = i;
      });
      return ind;
    }
    return notEmpty(xs) ? indices[xs[id]] : indices;
  },
  /**
   * Get indices max number
   * @param {object} indices Indices object
   * @returns {number} Max number
   * @private
   */
  getIndicesMax(indices) {
    return notEmpty(this.config.data_xs) ? (
      // if is multiple xs, return total sum of xs' __max__ value
      Object.keys(indices).map((v) => indices[v].__max__ || 0).reduce((acc, curr) => acc + curr)
    ) : indices.__max__;
  },
  getShapeX(offset, indices, isSub) {
    const $$ = this;
    const { config, scale } = $$;
    const currScale = isSub ? scale.subX : scale.zoom || scale.x;
    const barOverlap = config.bar_overlap;
    const barPadding = config.bar_padding;
    const sum = (p, c) => p + c;
    const halfWidth = isObjectType(offset) && (offset._$total.length ? offset._$total.reduce(sum) / 2 : 0);
    return (d) => {
      const ind = $$.getIndices(indices, d, "getShapeX");
      const index = d.id in ind ? ind[d.id] : 0;
      const targetsNum = (ind.__max__ || 0) + 1;
      let x = 0;
      if (notEmpty(d.x)) {
        const xPos = currScale(d.x, true);
        if (halfWidth) {
          const offsetWidth = offset[d.id] || offset._$width;
          x = barOverlap ? xPos - offsetWidth / 2 : xPos - offsetWidth + offset._$total.slice(0, index + 1).reduce(sum) - halfWidth;
        } else {
          x = xPos - (isNumber(offset) ? offset : offset._$width) * (targetsNum / 2 - (barOverlap ? 1 : index));
        }
      }
      if (offset && x && targetsNum > 1 && barPadding) {
        if (index) {
          x += barPadding * index;
        }
        if (targetsNum > 2) {
          x -= (targetsNum - 1) * barPadding / 2;
        } else if (targetsNum === 2) {
          x -= barPadding / 2;
        }
      }
      return x;
    };
  },
  getShapeY(isSub) {
    const $$ = this;
    const isStackNormalized = $$.isStackNormalized();
    return (d) => {
      let { value } = d;
      if (isNumber(d)) {
        value = d;
      } else if ($$.isAreaRangeType(d)) {
        value = $$.getBaseValue(d, "mid");
      } else if (isStackNormalized) {
        value = $$.getRatio("index", d, true);
      } else if ($$.isBubbleZType(d)) {
        value = $$.getBubbleZData(d.value, "y");
      } else if ($$.isBarRangeType(d)) {
        value = value[1];
      }
      return $$.getYScaleById(d.id, isSub)(value);
    };
  },
  /**
   * Get shape based y Axis min value
   * @param {string} id Data id
   * @returns {number}
   * @private
   */
  getShapeYMin(id) {
    const $$ = this;
    const axisId = $$.axis.getId(id);
    const scale = $$.scale[axisId];
    const [yMin] = scale.domain();
    const inverted = $$.config[`axis_${axisId}_inverted`];
    return !$$.isGrouped(id) && !inverted && yMin > 0 ? yMin : 0;
  },
  /**
   * Get Shape's offset data
   * @param {Function} typeFilter Type filter function
   * @returns {object}
   * @private
   */
  getShapeOffsetData(typeFilter) {
    const $$ = this;
    const targets = $$.orderTargets(
      $$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$))
    );
    const isStackNormalized = $$.isStackNormalized();
    const shapeOffsetTargets = targets.map((target) => {
      let rowValues = target.values;
      const values = {};
      if ($$.isStepType(target)) {
        rowValues = $$.convertValuesToStep(rowValues);
      }
      const rowValueMapByXValue = rowValues.reduce((out, d) => {
        const key = Number(d.x);
        out[key] = d;
        values[key] = isStackNormalized ? $$.getRatio("index", d, true) : d.value;
        return out;
      }, {});
      return {
        id: target.id,
        rowValues,
        rowValueMapByXValue,
        values
      };
    });
    const indexMapByTargetId = targets.reduce((out, { id }, index) => {
      out[id] = index;
      return out;
    }, {});
    return { indexMapByTargetId, shapeOffsetTargets };
  },
  getShapeOffset(typeFilter, indices, isSub) {
    const $$ = this;
    const { shapeOffsetTargets, indexMapByTargetId } = $$.getShapeOffsetData(
      typeFilter
    );
    const groupsZeroAs = $$.config.data_groupsZeroAs;
    return (d, idx) => {
      const { id, value, x } = d;
      const ind = $$.getIndices(indices, d);
      const scale = $$.getYScaleById(id, isSub);
      if ($$.isBarRangeType(d)) {
        return scale(value[0]);
      }
      const dataXAsNumber = Number(x);
      const y0 = scale(groupsZeroAs === "zero" ? 0 : $$.getShapeYMin(id));
      let offset = y0;
      shapeOffsetTargets.filter((t) => t.id !== id && ind[t.id] === ind[id]).forEach((t) => {
        const {
          id: tid,
          rowValueMapByXValue,
          rowValues,
          values: tvalues
        } = t;
        if (indexMapByTargetId[tid] < indexMapByTargetId[id]) {
          const rValue = tvalues[dataXAsNumber];
          let row = rowValues[idx];
          if (!row || Number(row.x) !== dataXAsNumber) {
            row = rowValueMapByXValue[dataXAsNumber];
          }
          if ((row == null ? void 0 : row.value) * value >= 0 && isNumber(rValue)) {
            const addOffset = value === 0 ? groupsZeroAs === "positive" && rValue > 0 || groupsZeroAs === "negative" && rValue < 0 : true;
            if (addOffset) {
              offset += scale(rValue) - y0;
            }
          }
        }
      });
      return offset;
    };
  },
  /**
   * Get data's y coordinate
   * @param {object} d Target data
   * @param {number} i Index number
   * @returns {number} y coordinate
   * @private
   */
  circleY(d, i) {
    const $$ = this;
    const id = d.id;
    let points;
    if ($$.isGrouped(id)) {
      points = getGroupedDataPointsFn.bind($$)(d);
    }
    return points ? points(d, i)[0][1] : $$.getYScaleById(id)($$.getBaseValue(d));
  },
  getBarW(type, axis, targetsNum) {
    var _a, _b, _c, _d, _e;
    const $$ = this;
    const { config, org, scale, state } = $$;
    const maxDataCount = $$.getMaxDataCount();
    const isGrouped = type === "bar" && ((_a = config.data_groups) == null ? void 0 : _a.length);
    const configName = `${type}_width`;
    const { k } = (_c = (_b = $$.getZoomTransform) == null ? void 0 : _b.call($$)) != null ? _c : { k: 1 };
    const xMinMax = [
      (_d = config.axis_x_min) != null ? _d : org.xDomain[0],
      (_e = config.axis_x_max) != null ? _e : org.xDomain[1]
    ].map($$.axis.isTimeSeries() ? parseDate.bind($$) : Number);
    let tickInterval = axis.tickInterval(maxDataCount);
    if (scale.zoom && !$$.axis.isCategorized() && k > 1) {
      const isSameMinMax = xMinMax.every((v, i) => v === org.xDomain[i]);
      tickInterval = org.xDomain.map((v, i) => {
        const value = isSameMinMax ? v : v - Math.abs(xMinMax[i]);
        return scale.zoom(value);
      }).reduce((a, c) => Math.abs(a) + c) / maxDataCount;
    }
    const getWidth = (id) => {
      const width = id ? config[configName][id] : config[configName];
      const ratio = id ? width.ratio : config[`${configName}_ratio`];
      const max = id ? width.max : config[`${configName}_max`];
      const w = isNumber(width) ? width : isFunction(width) ? width.call($$, state.width, targetsNum, maxDataCount) : targetsNum ? tickInterval * ratio / targetsNum : 0;
      return max && w > max ? max : w;
    };
    let result = getWidth();
    if (!isGrouped && isObjectType(config[configName])) {
      result = { _$width: result, _$total: [] };
      $$.filterTargetsToShow($$.data.targets).forEach((v) => {
        if (config[configName][v.id]) {
          result[v.id] = getWidth(v.id);
          result._$total.push(result[v.id] || result._$width);
        }
      });
    }
    return result;
  },
  /**
   * Get shape element
   * @param {string} shapeName Shape string
   * @param {number} i Index number
   * @param {string} id Data series id
   * @returns {d3Selection}
   * @private
   */
  getShapeByIndex(shapeName, i, id) {
    const $$ = this;
    const { $el } = $$;
    const suffix = isValue(i) ? `-${i}` : ``;
    let shape = $el[shapeName];
    if (shape && !shape.empty()) {
      shape = shape.filter((d) => id ? d.id === id : true).filter((d) => isValue(i) ? d.index === i : true);
    } else {
      shape = (id ? $el.main.selectAll(
        `.${classes[`${shapeName}s`]}${$$.getTargetSelectorSuffix(id)}`
      ) : $el.main).selectAll(`.${classes[shapeName]}${suffix}`);
    }
    return shape;
  },
  isWithinShape(that, d) {
    var _a;
    const $$ = this;
    const shape = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(that);
    let isWithin;
    if (!$$.isTargetToShow(d.id)) {
      isWithin = false;
    } else if ((_a = $$.hasValidPointType) == null ? void 0 : _a.call($$, that.nodeName)) {
      isWithin = $$.isStepType(d) ? $$.isWithinStep(that, $$.getYScaleById(d.id)($$.getBaseValue(d))) : $$.isWithinCircle(
        that,
        $$.isBubbleType(d) ? $$.pointSelectR(d) * 1.5 : 0
      );
    } else if (that.nodeName === "path") {
      isWithin = shape.classed(classes.bar) ? $$.isWithinBar(that) : true;
    }
    return isWithin;
  },
  getInterpolate(d) {
    const $$ = this;
    const interpolation = $$.getInterpolateType(d);
    return {
      basis: external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveBasis,
      "basis-closed": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveBasisClosed,
      "basis-open": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveBasisOpen,
      bundle: external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveBundle,
      cardinal: external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCardinal,
      "cardinal-closed": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCardinalClosed,
      "cardinal-open": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCardinalOpen,
      "catmull-rom": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCatmullRom,
      "catmull-rom-closed": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCatmullRomClosed,
      "catmull-rom-open": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCatmullRomOpen,
      "monotone-x": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveMonotoneX,
      "monotone-y": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveMonotoneY,
      natural: external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveNatural,
      "linear-closed": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveLinearClosed,
      linear: external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveLinear,
      step: external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveStep,
      "step-after": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveStepAfter,
      "step-before": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveStepBefore
    }[interpolation];
  },
  getInterpolateType(d) {
    const $$ = this;
    const { config } = $$;
    const type = config.spline_interpolation_type;
    const interpolation = $$.isInterpolationType(type) ? type : "cardinal";
    return $$.isSplineType(d) ? interpolation : $$.isStepType(d) ? config.line_step_type : "linear";
  },
  isWithinBar(that) {
    const mouse = getPointer(this.state.event, that);
    const list = getRectSegList(that);
    const [seg0, seg1] = list;
    const x = Math.min(seg0.x, seg1.x);
    const y = Math.min(seg0.y, seg1.y);
    const offset = this.config.bar_sensitivity;
    const { width, height } = that.getBBox();
    const sx = x - offset;
    const ex = x + width + offset;
    const sy = y + height + offset;
    const ey = y - offset;
    const isWithin = sx < mouse[0] && mouse[0] < ex && ey < mouse[1] && mouse[1] < sy;
    return isWithin;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/ChartInternal.ts
var ChartInternal_defProp = Object.defineProperty;
var ChartInternal_defNormalProp = (obj, key, value) => key in obj ? ChartInternal_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var ChartInternal_publicField = (obj, key, value) => ChartInternal_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);






























class ChartInternal {
  constructor(api) {
    ChartInternal_publicField(this, "api");
    // API interface
    ChartInternal_publicField(this, "config");
    // config object
    ChartInternal_publicField(this, "cache");
    // cache instance
    ChartInternal_publicField(this, "$el");
    // elements
    ChartInternal_publicField(this, "state");
    // state variables
    ChartInternal_publicField(this, "charts");
    // all Chart instances array within page (equivalent of 'bb.instances')
    // data object
    ChartInternal_publicField(this, "data", {
      xs: {},
      targets: []
    });
    // Axis
    ChartInternal_publicField(this, "axis");
    // Axis
    // scales
    ChartInternal_publicField(this, "scale", {
      x: null,
      y: null,
      y2: null,
      subX: null,
      subY: null,
      subY2: null,
      zoom: null
    });
    // original values
    ChartInternal_publicField(this, "org", {
      xScale: null,
      xDomain: null
    });
    // formatter function
    ChartInternal_publicField(this, "color");
    ChartInternal_publicField(this, "patterns");
    ChartInternal_publicField(this, "levelColor");
    ChartInternal_publicField(this, "point");
    ChartInternal_publicField(this, "brush");
    // format function
    ChartInternal_publicField(this, "format", {
      extraLineClasses: null,
      xAxisTick: null,
      dataTime: null,
      // dataTimeFormat
      defaultAxisTime: null,
      // defaultAxisTimeFormat
      axisTime: null
      // axisTimeFormat
    });
    const $$ = this;
    $$.api = api;
    $$.config = new Options();
    $$.cache = new Cache();
    const store = new Store();
    $$.$el = store.getStore("element");
    $$.state = store.getStore("state");
    $$.$T = $$.$T.bind($$);
  }
  /**
   * Get the selection based on transition config
   * @param {SVGElement|d3Selection} selection Target selection
   * @param {boolean} force Force transition
   * @param {string} name Transition name
   * @returns {d3Selection}
   * @private
   */
  $T(selection, force, name) {
    const { config, state } = this;
    const duration = config.transition_duration;
    const subchart = config.subchart_show;
    let t = selection;
    if (t) {
      if ("tagName" in t) {
        t = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(t);
      }
      const transit = (force !== false && duration || force) && (!state.zooming || state.dragging) && !state.resizing && state.rendered && !subchart;
      t = transit ? t.transition(name).duration(duration) : t;
    }
    return t;
  }
  beforeInit() {
    const $$ = this;
    $$.callPluginHook("$beforeInit");
    callFn($$.config.onbeforeinit, $$.api);
  }
  afterInit() {
    const $$ = this;
    $$.callPluginHook("$afterInit");
    callFn($$.config.onafterinit, $$.api);
  }
  init() {
    const $$ = this;
    const { config, state, $el } = $$;
    const useCssRule = config.boost_useCssRule;
    checkModuleImport($$);
    state.hasRadar = !state.hasAxis && $$.hasType("radar");
    state.hasFunnel = !state.hasAxis && $$.hasType("funnel");
    state.hasTreemap = !state.hasAxis && $$.hasType("treemap");
    state.hasAxis = !$$.hasArcType() && !state.hasFunnel && !state.hasTreemap;
    state.datetimeId = `bb-${+/* @__PURE__ */ new Date() * getRandom()}`;
    if (useCssRule) {
      const styleEl = browser_doc.createElement("style");
      styleEl.type = "text/css";
      browser_doc.head.appendChild(styleEl);
      state.style = {
        rootSelctor: `.${state.datetimeId}`,
        sheet: styleEl.sheet
      };
      $el.style = styleEl;
    }
    const bindto = {
      element: config.bindto,
      classname: "bb"
    };
    if (isObject(config.bindto)) {
      bindto.element = config.bindto.element || "#chart";
      bindto.classname = config.bindto.classname || bindto.classname;
    }
    $el.chart = isFunction(bindto.element.node) ? config.bindto.element : (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(bindto.element || []);
    if ($el.chart.empty()) {
      $el.chart = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(browser_doc.body.appendChild(browser_doc.createElement("div")));
    }
    $el.chart.html("").classed(bindto.classname, true).classed(state.datetimeId, useCssRule).style("position", "relative");
    $$.initParams();
    $$.initToRender();
  }
  /**
   * Initialize the rendering process
   * @param {boolean} forced Force to render process
   * @private
   */
  initToRender(forced) {
    const $$ = this;
    const { config, state, $el: { chart } } = $$;
    const isHidden = () => chart.style("display") === "none" || chart.style("visibility") === "hidden";
    const isLazy = config.render.lazy || isHidden();
    const MutationObserver = win.MutationObserver;
    if (isLazy && MutationObserver && config.render.observe !== false && !forced) {
      new MutationObserver((mutation, observer) => {
        if (!isHidden()) {
          observer.disconnect();
          !state.rendered && $$.initToRender(true);
        }
      }).observe(chart.node(), {
        attributes: true,
        attributeFilter: ["class", "style"]
      });
    }
    if (!isLazy || forced) {
      $$.convertData(config, (res) => {
        $$.initWithData(res);
        $$.afterInit();
      });
    }
  }
  initParams() {
    var _a;
    const $$ = this;
    const { config, format: format2, state } = $$;
    const isRotated = config.axis_rotated;
    $$.color = $$.generateColor();
    $$.levelColor = $$.generateLevelColor();
    if (config.padding === false) {
      config.axis_x_show = false;
      config.axis_y_show = false;
      config.axis_y2_show = false;
      config.subchart_show = false;
    }
    if ($$.hasPointType() || ((_a = $$.hasLegendDefsPoint) == null ? void 0 : _a.call($$))) {
      $$.point = $$.generatePoint();
    }
    if (state.hasAxis) {
      $$.initClip();
      format2.extraLineClasses = $$.generateExtraLineClass();
      format2.dataTime = config.data_xLocaltime ? external_commonjs_d3_time_format_commonjs2_d3_time_format_amd_d3_time_format_root_d3_.timeParse : external_commonjs_d3_time_format_commonjs2_d3_time_format_amd_d3_time_format_root_d3_.utcParse;
      format2.axisTime = config.axis_x_localtime ? external_commonjs_d3_time_format_commonjs2_d3_time_format_amd_d3_time_format_root_d3_.timeFormat : external_commonjs_d3_time_format_commonjs2_d3_time_format_amd_d3_time_format_root_d3_.utcFormat;
      const isDragZoom = $$.config.zoom_enabled && $$.config.zoom_type === "drag";
      format2.defaultAxisTime = (d) => {
        const { x, zoom } = $$.scale;
        const isZoomed = isDragZoom ? zoom : zoom && x.orgDomain().toString() !== zoom.domain().toString();
        const specifier = d.getMilliseconds() && ".%L" || d.getSeconds() && ".:%S" || d.getMinutes() && "%I:%M" || d.getHours() && "%I %p" || d.getDate() !== 1 && "%b %d" || isZoomed && d.getDate() === 1 && "%b'%y" || d.getMonth() && "%-m/%-d" || "%Y";
        return format2.axisTime(specifier)(d);
      };
    }
    state.isLegendRight = config.legend_position === "right";
    state.isLegendInset = config.legend_position === "inset";
    state.isLegendTop = config.legend_inset_anchor === "top-left" || config.legend_inset_anchor === "top-right";
    state.isLegendLeft = config.legend_inset_anchor === "top-left" || config.legend_inset_anchor === "bottom-left";
    state.rotatedPadding.top = $$.getResettedPadding(state.rotatedPadding.top);
    state.rotatedPadding.right = isRotated && !config.axis_x_show ? 0 : 30;
    state.inputType = convertInputType(
      config.interaction_inputType_mouse,
      config.interaction_inputType_touch
    );
  }
  initWithData(data2) {
    var _a, _b, _c;
    const $$ = this;
    const { config, scale: scale2, state, $el, org } = $$;
    const { hasAxis, hasFunnel, hasTreemap } = state;
    const hasInteraction = config.interaction_enabled;
    const hasPolar = $$.hasType("polar");
    const labelsBGColor = config.data_labels_backgroundColors;
    if (hasAxis) {
      $$.axis = $$.getAxisInstance();
      config.zoom_enabled && $$.initZoom();
    }
    $$.data.xs = {};
    $$.data.targets = $$.convertDataToTargets(data2);
    if (config.data_filter) {
      $$.data.targets = $$.data.targets.filter(config.data_filter.bind($$.api));
    }
    if (config.data_hide) {
      $$.addHiddenTargetIds(
        config.data_hide === true ? $$.mapToIds($$.data.targets) : config.data_hide
      );
    }
    if (config.legend_hide) {
      $$.addHiddenLegendIds(
        config.legend_hide === true ? $$.mapToIds($$.data.targets) : config.legend_hide
      );
    }
    $$.updateSizes();
    $$.updateScales(true);
    if (hasAxis) {
      const { x, y, y2, subX, subY, subY2 } = scale2;
      if (x) {
        x.domain(sortValue($$.getXDomain($$.data.targets), !config.axis_x_inverted));
        subX.domain(x.domain());
        org.xDomain = x.domain();
      }
      if (y) {
        y.domain($$.getYDomain($$.data.targets, "y"));
        subY.domain(y.domain());
      }
      if (y2) {
        y2.domain($$.getYDomain($$.data.targets, "y2"));
        subY2 && subY2.domain(y2.domain());
      }
    }
    $el.svg = $el.chart.append("svg").style("overflow", "hidden").style("display", "block");
    if (hasInteraction && state.inputType) {
      const isTouch = state.inputType === "touch";
      const { onclick, onover, onout } = config;
      $el.svg.on("click", (onclick == null ? void 0 : onclick.bind($$.api)) || null).on(isTouch ? "touchstart" : "mouseenter", (onover == null ? void 0 : onover.bind($$.api)) || null).on(isTouch ? "touchend" : "mouseleave", (onout == null ? void 0 : onout.bind($$.api)) || null);
    }
    config.svg_classname && $el.svg.attr("class", config.svg_classname);
    const hasColorPatterns = isFunction(config.color_tiles) && $$.patterns;
    if (hasAxis || hasColorPatterns || hasPolar || hasTreemap || labelsBGColor || ((_a = $$.hasLegendDefsPoint) == null ? void 0 : _a.call($$))) {
      $el.defs = $el.svg.append("defs");
      if (hasAxis) {
        ["id", "idXAxis", "idYAxis", "idGrid"].forEach((v) => {
          $$.appendClip($el.defs, state.clip[v]);
        });
      }
      $$.generateTextBGColorFilter(labelsBGColor);
      if (hasColorPatterns) {
        $$.patterns.forEach((p) => $el.defs.append(() => p.node));
      }
    }
    $$.updateSvgSize();
    $$.bindResize();
    const main = $el.svg.append("g").classed($COMMON.main, true).attr("transform", hasFunnel || hasTreemap ? null : $$.getTranslate("main"));
    $el.main = main;
    config.subchart_show && $$.initSubchart();
    config.tooltip_show && $$.initTooltip();
    config.title_text && $$.initTitle();
    !hasTreemap && config.legend_show && $$.initLegend();
    if (config.data_empty_label_text) {
      main.append("text").attr("class", `${$TEXT.text} ${$COMMON.empty}`).attr("text-anchor", "middle").attr("dominant-baseline", "middle");
    }
    if (hasAxis) {
      config.regions.length && $$.initRegion();
      !config.clipPath && $$.axis.init();
    }
    main.append("g").classed($COMMON.chart, true).attr("clip-path", hasAxis ? state.clip.path : null);
    $$.callPluginHook("$init");
    $$.initChartElements();
    if (hasAxis) {
      hasInteraction && ((_b = $$.initEventRect) == null ? void 0 : _b.call($$));
      $$.initGrid();
      config.clipPath && ((_c = $$.axis) == null ? void 0 : _c.init());
    }
    $$.updateTargets($$.data.targets);
    $$.updateDimension();
    callFn(config.oninit, $$.api);
    $$.setBackground();
    $$.redraw({
      withTransition: false,
      withTransform: true,
      withUpdateXDomain: true,
      withUpdateOrgXDomain: true,
      withTransitionForAxis: false,
      initializing: true
    });
    if (config.data_onmin || config.data_onmax) {
      const minMax = $$.getMinMaxData();
      callFn(config.data_onmin, $$.api, minMax.min);
      callFn(config.data_onmax, $$.api, minMax.max);
    }
    config.tooltip_show && $$.initShowTooltip();
    state.rendered = true;
  }
  /**
   * Initialize chart elements
   * @private
   */
  initChartElements() {
    const $$ = this;
    const { hasAxis, hasRadar, hasTreemap } = $$.state;
    const types = [];
    if (hasAxis) {
      const shapes = ["bar", "bubble", "candlestick", "line"];
      if ($$.config.bar_front) {
        shapes.push(shapes.shift());
      }
      shapes.forEach((v) => {
        const name = capitalize(v);
        if (v === "line" && $$.hasTypeOf(name) || $$.hasType(v)) {
          types.push(name);
        }
      });
    } else if (hasTreemap) {
      types.push("Treemap");
    } else if ($$.hasType("funnel")) {
      types.push("Funnel");
    } else {
      const hasPolar = $$.hasType("polar");
      if (!hasRadar) {
        types.push("Arc", "Pie");
      }
      if ($$.hasType("gauge")) {
        types.push("Gauge");
      } else if (hasRadar) {
        types.push("Radar");
      } else if (hasPolar) {
        types.push("Polar");
      }
    }
    types.forEach((v) => {
      $$[`init${v}`]();
    });
    notEmpty($$.config.data_labels) && !$$.hasArcType(null, ["radar"]) && $$.initText();
  }
  /**
   * Set chart elements
   * @private
   */
  setChartElements() {
    const $$ = this;
    const {
      $el: {
        chart,
        svg,
        defs,
        main,
        tooltip: tooltip2,
        legend: legend2,
        title: title2,
        grid,
        needle,
        arcs: arc,
        circle: circles,
        bar: bars,
        candlestick,
        line: lines,
        area: areas,
        text: texts
      }
    } = $$;
    $$.api.$ = {
      chart,
      svg,
      defs,
      main,
      tooltip: tooltip2,
      legend: legend2,
      title: title2,
      grid,
      arc,
      circles,
      bar: { bars },
      candlestick,
      line: { lines, areas },
      needle,
      text: { texts }
    };
  }
  /**
   * Set background element/image
   * @private
   */
  setBackground() {
    const $$ = this;
    const { config: { background: bg }, state, $el: { svg } } = $$;
    if (notEmpty(bg)) {
      const element = svg.select("g").insert(bg.imgUrl ? "image" : "rect", ":first-child");
      if (bg.imgUrl) {
        element.attr("href", bg.imgUrl);
      } else if (bg.color) {
        element.style("fill", bg.color).attr("clip-path", state.clip.path);
      }
      element.attr("class", bg.class || null).attr("width", "100%").attr("height", "100%");
    }
  }
  /**
   * Update targeted element with given data
   * @param {object} targets Data object formatted as 'target'
   * @private
   */
  updateTargets(targets) {
    var _a;
    const $$ = this;
    const { hasAxis, hasFunnel, hasRadar, hasTreemap } = $$.state;
    const helper = (type) => $$[`updateTargetsFor${type}`](
      targets.filter($$[`is${type}Type`].bind($$))
    );
    $$.updateTargetsForText(targets);
    if (hasAxis) {
      ["bar", "candlestick", "line"].forEach((v) => {
        const name = capitalize(v);
        if (v === "line" && $$.hasTypeOf(name) || $$.hasType(v)) {
          helper(name);
        }
      });
      $$.updateTargetsForSubchart && $$.updateTargetsForSubchart(targets);
    } else if ($$.hasArcType(targets)) {
      let type = "Arc";
      if (hasRadar) {
        type = "Radar";
      } else if ($$.hasType("polar")) {
        type = "Polar";
      }
      helper(type);
    } else if (hasFunnel) {
      helper("Funnel");
    } else if (hasTreemap) {
      helper("Treemap");
    }
    const hasPointType = $$.hasType("bubble") || $$.hasType("scatter");
    if (hasPointType) {
      (_a = $$.updateTargetForCircle) == null ? void 0 : _a.call($$);
    }
    $$.filterTargetsToShowAtInit(hasPointType);
  }
  /**
   * Display targeted elements at initialization
   * @param {boolean} hasPointType whether has point type(bubble, scatter) or not
   * @private
   */
  filterTargetsToShowAtInit(hasPointType = false) {
    const $$ = this;
    const { $el: { svg }, $T } = $$;
    let selector = `.${$COMMON.target}`;
    if (hasPointType) {
      selector += `, .${$CIRCLE.chartCircles} > .${$CIRCLE.circles}`;
    }
    $T(svg.selectAll(selector).filter((d) => $$.isTargetToShow(d.id))).style("opacity", null);
  }
  getWithOption(options) {
    const withOptions = {
      Dimension: true,
      EventRect: true,
      Legend: false,
      Subchart: true,
      Transform: false,
      Transition: true,
      TrimXDomain: true,
      UpdateXAxis: "UpdateXDomain",
      UpdateXDomain: false,
      UpdateOrgXDomain: false,
      TransitionForExit: "Transition",
      TransitionForAxis: "Transition",
      Y: true
    };
    Object.keys(withOptions).forEach((key) => {
      let defVal = withOptions[key];
      if (isString(defVal)) {
        defVal = withOptions[defVal];
      }
      withOptions[key] = getOption(options, `with${key}`, defVal);
    });
    return withOptions;
  }
  initialOpacity(d) {
    const $$ = this;
    const { withoutFadeIn } = $$.state;
    const r = $$.getBaseValue(d) !== null && withoutFadeIn[d.id] ? null : "0";
    return r;
  }
  bindResize() {
    const $$ = this;
    const { config, state } = $$;
    const resizeFunction = generateResize(config.resize_timer);
    const list = [];
    list.push(() => callFn(config.onresize, $$.api));
    if (config.resize_auto) {
      list.push(() => {
        state.resizing = true;
        if (config.legend_show) {
          $$.updateSizes();
          $$.updateLegend();
        }
        $$.api.flush(false);
      });
    }
    list.push(() => {
      callFn(config.onresized, $$.api);
      state.resizing = false;
    });
    list.forEach((v) => resizeFunction.add(v));
    $$.resizeFunction = resizeFunction;
    win.addEventListener("resize", $$.resizeFunction = resizeFunction);
  }
  /**
   * Call plugin hook
   * @param {string} phase The lifecycle phase
   * @param {Array} args Arguments
   * @private
   */
  callPluginHook(phase, ...args) {
    this.config.plugins.forEach((v) => {
      if (phase === "$beforeInit") {
        v.$$ = this;
        this.api.plugins.push(v);
      }
      v[phase](...args);
    });
  }
}
extend(ChartInternal.prototype, [
  // common
  convert,
  data_data,
  load,
  category,
  internals_class,
  internals_color,
  domain,
  interactions_interaction,
  format,
  internals_legend,
  redraw,
  scale,
  shape,
  size,
  style,
  internals_text,
  internals_title,
  internals_tooltip,
  transform,
  type
]);

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

;// CONCATENATED MODULE: ./src/Chart/api/chart.ts


/* harmony default export */ var chart = ({
  /**
   * Resize the chart.
   * @function resize
   * @instance
   * @memberof Chart
   * @param {object} size This argument should include width and height in pixels.
   * @param {number} [size.width] width value
   * @param {number} [size.height] height value
   * @example
   * // Resize to 640x480
   * chart.resize({
   *    width: 640,
   *    height: 480
   * });
   */
  resize(size) {
    const $$ = this.internal;
    const { config, state } = $$;
    if (state.rendered) {
      config.size_width = size ? size.width : null;
      config.size_height = size ? size.height : null;
      state.resizing = true;
      this.flush(false);
      $$.resizeFunction();
    }
  },
  /**
   * Force to redraw.
   * - **NOTE:** When zoom/subchart is used, the zoomed state will be resetted.
   * @function flush
   * @instance
   * @memberof Chart
   * @param {boolean} [soft] For soft redraw.
   * @example
   * chart.flush();
   *
   * // for soft redraw
   * chart.flush(true);
   */
  flush(soft) {
    var _a, _b;
    const $$ = this.internal;
    const { state, $el: { zoomResetBtn } } = $$;
    if (state.rendered) {
      if (state.resizing) {
        (_a = $$.brush) == null ? void 0 : _a.updateResize();
      } else {
        (_b = $$.axis) == null ? void 0 : _b.setOrient();
      }
      zoomResetBtn == null ? void 0 : zoomResetBtn.style("display", "none");
      $$.scale.zoom = null;
      soft ? $$.redraw({
        withTransform: true,
        withUpdateXDomain: true,
        withUpdateOrgXDomain: true,
        withLegend: true
      }) : $$.updateAndRedraw({
        withLegend: true,
        withTransition: false,
        withTransitionForTransform: false
      });
      if (!state.resizing && $$.brush) {
        $$.brush.getSelection().call($$.brush.move);
        $$.unselectRect();
      }
    } else {
      $$.initToRender(true);
    }
  },
  /**
   * Reset the chart object and remove element and events completely.
   * @function destroy
   * @instance
   * @memberof Chart
   * @returns {null}
   * @example
   * chart.destroy();
   */
  destroy() {
    const $$ = this.internal;
    const { $el: { chart, style, svg } } = $$;
    if (notEmpty($$)) {
      $$.callPluginHook("$willDestroy");
      $$.charts.splice($$.charts.indexOf(this), 1);
      $$.unbindAllEvents();
      svg.select("*").interrupt();
      $$.resizeFunction.clear();
      win.removeEventListener("resize", $$.resizeFunction);
      chart.classed("bb", false).style("position", null).selectChildren().remove();
      style && style.parentNode.removeChild(style);
      Object.keys(this).forEach((key) => {
        key === "internal" && Object.keys($$).forEach((k) => {
          $$[k] = null;
        });
        this[key] = null;
        delete this[key];
      });
      for (const key in this) {
        this[key] = () => {
        };
      }
    }
    return null;
  },
  /**
   * Get or set config option value.
   * - **NOTE**
   *  - The option key name must be specified as the last level.
   *  - when no argument is given, will return all specified generation options object only. (will exclude any other options not specified at the initialization)
   * @function config
   * @instance
   * @memberof Chart
   * @param {string} name The option key name.
   * @param {*} [value] The value accepted for indicated option.
   * @param {boolean} [redraw] Set to redraw with the new option changes.
   * - **NOTE:** Doesn't guarantee work in all circumstances. It can be applied for limited options only.
   * @returns {*}
   * @example
   *
   * // Getter
   * chart.config("gauge.max");
   *
   * // Getter specified with top level key name will not work.
   * // The option key name must be specified as the last level.
   * // chart.config("gauge"); // will not work
   *
   * // without any arguments, it returns generation config object
   * chart.config();  // {data: { ... }, axis: { ... }, ...}
   *
   * // Setter
   * chart.config("gauge.max", 100);
   *
   * // Setter specified with top level key name will not work.
   * // The option key name must be specified as the last level.
   * // chart.config("gauge", {min: 10, max: 20}); // will not work
   *
   * // Setter & redraw with the new option
   * chart.config("gauge.max", 100, true);
   */
  config(name, value, redraw) {
    const $$ = this.internal;
    const { config, state } = $$;
    const key = name == null ? void 0 : name.replace(/\./g, "_");
    let res;
    if (name && key in config) {
      if (isDefined(value)) {
        config[key] = value;
        res = value;
        redraw && this.flush();
      } else {
        res = config[key];
      }
    } else if (arguments.length === 0 || isEmpty(name)) {
      res = state.orgConfig;
    }
    return res;
  }
});

;// CONCATENATED MODULE: ./src/Chart/api/color.ts
/* harmony default export */ var api_color = ({
  /**
   * Get the color
   * @function color
   * @instance
   * @memberof Chart
   * @param {string} id id to get the color
   * @returns {string}
   * @example
   * chart.color("data1");
   */
  color(id) {
    return this.internal.color(id);
  }
});

;// CONCATENATED MODULE: ./src/Chart/api/data.ts

const api_data_data = function(targetIds) {
  const { targets } = this.internal.data;
  if (!isUndefined(targetIds)) {
    const ids = isArray(targetIds) ? targetIds : [targetIds];
    return targets.filter((t) => ids.some((v) => v === t.id));
  }
  return targets;
};
extend(api_data_data, {
  /**
   * Get data shown in the chart.
   * @function data․shown
   * @instance
   * @memberof Chart
   * @param {string|Array} targetIds If this argument is given, this API filters the data with specified target ids. If this argument is not given, all shown data will be returned.
   * @returns {Array} Data objects
   * @example
   * // Get shown data by filtering to include only data1 data
   * chart.data.shown("data1");
   * // --> [{id: "data1", id_org: "data1", values: Array(6)}, ...]
   *
   * // Get shown data by filtering to include data1 and data2 data
   * chart.data.shown(["data1", "data2"]);
   *
   * // Get all shown data
   * chart.data.shown();
   */
  shown: function(targetIds) {
    return this.internal.filterTargetsToShow(this.data(targetIds));
  },
  /**
   * Get values of the data loaded in the chart.
   * @function data․values
   * @instance
   * @memberof Chart
   * @param {string|Array|null} targetIds This API returns the values of specified target. If this argument is not given, null will be retruned
   * @param {boolean} [flat=true] Get flatten values
   * @returns {Array} Data values
   * @example
   * // Get data1 values
   * chart.data.values("data1");
   * // --> [10, 20, 30, 40]
   */
  values: function(targetIds, flat = true) {
    let values = null;
    if (targetIds) {
      const targets = this.data(targetIds);
      if (isArray(targets)) {
        values = [];
        targets.forEach((v) => {
          const dataValue = v.values.map((d) => d.value);
          flat ? values = values.concat(dataValue) : values.push(dataValue);
        });
      }
    }
    return values;
  },
  /**
   * Get and set names of the data loaded in the chart.
   * @function data․names
   * @instance
   * @memberof Chart
   * @param {object} names If this argument is given, the names of data will be updated. If not given, the current names will be returned. The format of this argument is the same as [data.names](./Options.html#.data%25E2%2580%25A4names).
   * @returns {object} Corresponding names according its key value, if specified names values.
   * @example
   * // Get current names
   * chart.data.names();
   * // --> {data1: "test1", data2: "test2"}
   *
   * // Update names
   * chart.data.names({
   *  data1: "New Name 1",
   *  data2: "New Name 2"
   * });
   */
  names: function(names) {
    const $$ = this.internal;
    return $$.updateDataAttributes("names", names);
  },
  /**
   * Get and set colors of the data loaded in the chart.
   * @function data․colors
   * @instance
   * @memberof Chart
   * @param {object} colors If this argument is given, the colors of data will be updated. If not given, the current colors will be returned. The format of this argument is the same as [data.colors](./Options.html#.data%25E2%2580%25A4colors).
   * @returns {object} Corresponding data color value according its key value.
   * @example
   * // Get current colors
   * chart.data.colors();
   * // --> {data1: "#00c73c", data2: "#fa7171"}
   *
   * // Update colors
   * chart.data.colors({
   *  data1: "#FFFFFF",
   *  data2: "#000000"
   * });
   */
  colors: function(colors) {
    return this.internal.updateDataAttributes("colors", colors);
  },
  /**
   * Get and set axes of the data loaded in the chart.
   * - **NOTE:** If all data is related to one of the axes, the domain of axis without related data will be replaced by the domain from the axis with related data
   * @function data․axes
   * @instance
   * @memberof Chart
   * @param {object} axes If this argument is given, the axes of data will be updated. If not given, the current axes will be returned. The format of this argument is the same as
   * @returns {object} Corresponding axes value for data, if specified axes value.
   * @example
   * // Get current axes
   * chart.data.axes();
   * // --> {data1: "y"}
   *
   * // Update axes
   * chart.data.axes({
   *  data1: "y",
   *  data2: "y2"
   * });
   */
  axes: function(axes) {
    return this.internal.updateDataAttributes("axes", axes);
  },
  /**
   * Get the minimum data value bound to the chart
   * @function data․min
   * @instance
   * @memberof Chart
   * @returns {Array} Data objects
   * @example
   * // Get current axes
   * chart.data.min();
   * // --> [{x: 0, value: 30, id: "data1", index: 0}, ...]
   */
  min: function() {
    return this.internal.getMinMaxData().min;
  },
  /**
   * Get the maximum data value bound to the chart
   * @function data․max
   * @instance
   * @memberof Chart
   * @returns {Array} Data objects
   * @example
   * // Get current axes
   * chart.data.max();
   * // --> [{x: 3, value: 400, id: "data1", index: 3}, ...]
   */
  max: function() {
    return this.internal.getMinMaxData().max;
  }
});
/* harmony default export */ var api_data = ({ data: api_data_data });

;// CONCATENATED MODULE: ./src/Chart/api/export.ts



const b64EncodeUnicode = (str) => {
  var _a, _b;
  return (_b = (_a = win).btoa) == null ? void 0 : _b.call(
    _a,
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      (match, p) => String.fromCharCode(Number(`0x${p}`))
    )
  );
};
function nodeToSvgDataUrl(node, option, orgSize) {
  const { width, height } = option || orgSize;
  const serializer = new XMLSerializer();
  const clone = node.cloneNode(true);
  const cssText = getCssRules(toArray(browser_doc.styleSheets)).filter((r) => r.cssText).map((r) => r.cssText);
  clone.setAttribute("xmlns", external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.namespaces.xhtml);
  clone.style.margin = "0";
  clone.style.padding = "0";
  if (option.preserveFontStyle) {
    clone.querySelectorAll("text").forEach((t) => {
      t.innerHTML = "";
    });
  }
  const nodeXml = serializer.serializeToString(clone);
  const style = browser_doc.createElement("style");
  style.appendChild(browser_doc.createTextNode(cssText.join("\n")));
  const styleXml = serializer.serializeToString(style);
  const dataStr = `<svg xmlns="${external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.namespaces.svg}" width="${width}" height="${height}" 
		viewBox="0 0 ${orgSize.width} ${orgSize.height}" 
		preserveAspectRatio="${(option == null ? void 0 : option.preserveAspectRatio) === false ? "none" : "xMinYMid meet"}">
			<foreignObject width="100%" height="100%">
				${styleXml}
				${nodeXml.replace(/(url\()[^#]+/g, "$1")}
			</foreignObject></svg>`;
  return `data:image/svg+xml;base64,${b64EncodeUnicode(dataStr)}`;
}
function getCoords(elem, svgOffset) {
  const { top, left } = svgOffset;
  const { x, y } = elem.getBBox();
  const { a, b, c, d, e, f } = elem.getScreenCTM();
  const { width, height } = elem.getBoundingClientRect();
  return {
    x: a * x + c * y + e - left,
    y: b * x + d * y + f - top + (height - Math.round(height / 4)),
    width,
    height
  };
}
function getGlyph(svg) {
  const { left, top } = svg.getBoundingClientRect();
  const filterFn = (t) => t.textContent || t.childElementCount;
  const glyph = [];
  toArray(svg.querySelectorAll("text")).filter(filterFn).forEach((t) => {
    const getStyleFn = (ts) => {
      const { fill, fontFamily, fontSize, textAnchor, transform } = win.getComputedStyle(
        ts
      );
      const { x, y, width, height } = getCoords(ts, { left, top });
      return {
        [ts.textContent]: {
          x,
          y,
          width,
          height,
          fill,
          fontFamily,
          fontSize,
          textAnchor,
          transform
        }
      };
    };
    if (t.childElementCount > 1) {
      const text = [];
      toArray(t.querySelectorAll("tspan")).filter(filterFn).forEach((ts) => {
        glyph.push(getStyleFn(ts));
      });
      return text;
    } else {
      glyph.push(getStyleFn(t));
    }
  });
  return glyph;
}
function renderText(ctx, glyph) {
  glyph.forEach((g) => {
    Object.keys(g).forEach((key) => {
      const { x, y, width, height, fill, fontFamily, fontSize, transform } = g[key];
      ctx.save();
      ctx.font = `${fontSize} ${fontFamily}`;
      ctx.fillStyle = fill;
      if (transform === "none") {
        ctx.fillText(key, x, y);
      } else {
        const args = transform.replace(/(matrix|\(|\))/g, "").split(",");
        if (args.splice(4).every((v) => +v === 0)) {
          args.push(x + width - width / 4);
          args.push(y - height + height / 3);
        } else {
          args.push(x);
          args.push(y);
        }
        ctx.transform(...args);
        ctx.fillText(key, 0, 0);
      }
      ctx.restore();
    });
  });
}
/* harmony default export */ var api_export = ({
  /**
   * Export chart as an image.
   * - **NOTE:**
   *   - IE11 and below not work properly due to the lack of the feature(<a href="https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx">foreignObject</a>) support
   *   - Every style applied to the chart & the basic CSS file(ex. billboard.css) should be at same domain as API call context to get correct styled export image.
   * @function export
   * @instance
   * @memberof Chart
   * @param {object} option Export option
   * @param {string} [option.mimeType="image/png"] The desired output image format. (ex. 'image/png' for png, 'image/jpeg' for jpeg format)
   * @param {number} [option.width={currentWidth}] width
   * @param {number} [option.height={currentHeigth}] height
   * @param {boolean} [option.preserveAspectRatio=true] Preserve aspect ratio on given size
   * @param {boolean} [option.preserveFontStyle=false] Preserve font style(font-family).<br>
   * **NOTE:**
   *   - This option is useful when outlink web font style's `font-family` are applied to chart's text element.
   *   - Text element's position(especially "transformed") can't be preserved correctly according the page's layout condition.
   *   - If need to preserve accurate text position, embed the web font data within to the page and set `preserveFontStyle=false`.
   *     - Checkout the embed example: <a href="https://stackblitz.com/edit/zfbya9-8nf9nn?file=index.html">https://stackblitz.com/edit/zfbya9-8nf9nn?file=index.html</a>
   * @param {Function} [callback] The callback to be invoked when export is ready.
   * @returns {string} dataURI
   * @example
   *  chart.export();
   *  // --> "data:image/svg+xml;base64,PHN..."
   *
   *  // Initialize the download automatically
   *  chart.export({mimeType: "image/png"}, dataUrl => {
   *     const link = document.createElement("a");
   *
   *     link.download = `${Date.now()}.png`;
   *     link.href = dataUrl;
   *     link.innerHTML = "Download chart as image";
   *
   *     document.body.appendChild(link);
   *  });
   *
   *  // Resize the exported image
   *  chart.export(
   *    {
   *      width: 800,
   *      height: 600,
   *      preserveAspectRatio: false,
   *      preserveFontStyle: false,
   *      mimeType: "image/png"
   *    },
   *    dataUrl => { ... }
   *  );
   */
  export(option, callback) {
    const $$ = this.internal;
    const { state, $el: { chart, svg } } = $$;
    const { width, height } = state.current;
    const opt = mergeObj({
      width,
      height,
      preserveAspectRatio: true,
      preserveFontStyle: false,
      mimeType: "image/png"
    }, option);
    const svgDataUrl = nodeToSvgDataUrl(chart.node(), opt, { width, height });
    const glyph = opt.preserveFontStyle ? getGlyph(svg.node()) : [];
    if (callback && isFunction(callback)) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = browser_doc.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = opt.width || width;
        canvas.height = opt.height || height;
        ctx.drawImage(img, 0, 0);
        if (glyph.length) {
          renderText(ctx, glyph);
          glyph.length = 0;
        }
        callback.bind(this)(canvas.toDataURL(opt.mimeType));
      };
      img.src = svgDataUrl;
    }
    return svgDataUrl;
  }
});

;// CONCATENATED MODULE: ./src/Chart/api/focus.ts


/* harmony default export */ var api_focus = ({
  /**
   * This API highlights specified targets and fade out the others.<br><br>
   * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be highlighted.
   * @function focus
   * @instance
   * @memberof Chart
   * @param {string|Array} targetIdsValue Target ids to be highlighted.
   * @example
   *  // data1 will be highlighted and the others will be faded out
   *  chart.focus("data1");
   *
   * // data1 and data2 will be highlighted and the others will be faded out
   * chart.focus(["data1", "data2"]);
   *
   * // all targets will be highlighted
   * chart.focus();
   */
  focus(targetIdsValue) {
    const $$ = this.internal;
    const { state } = $$;
    const targetIds = $$.mapToTargetIds(targetIdsValue);
    const candidates = $$.$el.svg.selectAll(
      $$.selectorTargets(targetIds.filter($$.isTargetToShow, $$))
    );
    this.revert();
    this.defocus();
    candidates.classed($FOCUS.focused, true).classed($FOCUS.defocused, false);
    if ($$.hasArcType() && !state.hasRadar) {
      $$.expandArc(targetIds);
      $$.hasType("gauge") && $$.markOverlapped(targetIdsValue, $$, `.${$GAUGE.gaugeValue}`);
    }
    $$.toggleFocusLegend(targetIds, true);
    state.focusedTargetIds = targetIds;
    state.defocusedTargetIds = state.defocusedTargetIds.filter((id) => targetIds.indexOf(id) < 0);
  },
  /**
   * This API fades out specified targets and reverts the others.<br><br>
   * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be faded out.
   * @function defocus
   * @instance
   * @memberof Chart
   * @param {string|Array} targetIdsValue Target ids to be faded out.
   * @example
   * // data1 will be faded out and the others will be reverted.
   * chart.defocus("data1");
   *
   * // data1 and data2 will be faded out and the others will be reverted.
   * chart.defocus(["data1", "data2"]);
   *
   * // all targets will be faded out.
   * chart.defocus();
   */
  defocus(targetIdsValue) {
    const $$ = this.internal;
    const { state } = $$;
    const targetIds = $$.mapToTargetIds(targetIdsValue);
    const candidates = $$.$el.svg.selectAll(
      $$.selectorTargets(targetIds.filter($$.isTargetToShow, $$))
    );
    candidates.classed($FOCUS.focused, false).classed($FOCUS.defocused, true);
    if ($$.hasArcType(null, ["polar"])) {
      $$.unexpandArc(targetIds);
      $$.hasType("gauge") && $$.undoMarkOverlapped($$, `.${$GAUGE.gaugeValue}`);
    }
    $$.toggleFocusLegend(targetIds, false);
    state.focusedTargetIds = state.focusedTargetIds.filter((id) => targetIds.indexOf(id) < 0);
    state.defocusedTargetIds = targetIds;
  },
  /**
   * Revert focused or defocused state to initial state.<br><br>
   * You can specify multiple targets by giving an array that includes id as string. If no argument is given, all of targets will be reverted.
   * @function revert
   * @instance
   * @memberof Chart
   * @param {string|Array} targetIdsValue Target ids to be reverted
   * @example
   * // 'data1' will be reverted.
   * chart.revert("data1");
   *
   * // 'data1' and 'data2' will be reverted.
   * chart.revert(["data1", "data2"]);
   *
   * // all targets will be reverted.
   * chart.revert();
   */
  revert(targetIdsValue) {
    const $$ = this.internal;
    const { config, state, $el } = $$;
    const targetIds = $$.mapToTargetIds(targetIdsValue);
    const candidates = $el.svg.selectAll($$.selectorTargets(targetIds));
    candidates.classed($FOCUS.focused, false).classed($FOCUS.defocused, false);
    $$.hasArcType(null, ["polar"]) && $$.unexpandArc(targetIds);
    if (config.legend_show) {
      $$.showLegend(targetIds.filter($$.isLegendToShow.bind($$)));
      $el.legend.selectAll($$.selectorLegends(targetIds)).filter(function() {
        return (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed($FOCUS.legendItemFocused);
      }).classed($FOCUS.legendItemFocused, false);
    }
    state.focusedTargetIds = [];
    state.defocusedTargetIds = [];
  }
});

;// CONCATENATED MODULE: ./src/Chart/api/legend.ts
const legend_legend = {
  /**
   * Show legend for each target.
   * - **NOTE:** Legend APIs aren't supported for `treemap` type.
   * @function legend․show
   * @instance
   * @memberof Chart
   * @param {string|Array} targetIds
   * - If targetIds is given, specified target's legend will be shown.
   * - If only one target is the candidate, String can be passed.
   * - If no argument is given, all of target's legend will be shown.
   * @example
   * // Show legend for data1.
   * chart.legend.show("data1");
   *
   * // Show legend for data1 and data2.
   * chart.legend.show(["data1", "data2"]);
   *
   * // Show all legend.
   * chart.legend.show();
   */
  show: function(targetIds) {
    const $$ = this.internal;
    $$.showLegend($$.mapToTargetIds(targetIds));
    $$.updateAndRedraw({ withLegend: true });
  },
  /**
   * Hide legend for each target.
   * @function legend․hide
   * @instance
   * @memberof Chart
   * @param {string|Array} targetIds
   * - If targetIds is given, specified target's legend will be hidden.
   * - If only one target is the candidate, String can be passed.
   * - If no argument is given, all of target's legend will be hidden.
   * @example
   * // Hide legend for data1.
   * chart.legend.hide("data1");
   *
   * // Hide legend for data1 and data2.
   * chart.legend.hide(["data1", "data2"]);
   *
   * // Hide all legend.
   * chart.legend.hide();
   */
  hide: function(targetIds) {
    const $$ = this.internal;
    $$.hideLegend($$.mapToTargetIds(targetIds));
    $$.updateAndRedraw({ withLegend: true });
  }
};
/* harmony default export */ var api_legend = ({ legend: legend_legend });

;// CONCATENATED MODULE: ./src/Chart/api/load.ts



/* harmony default export */ var api_load = ({
  /**
   * Load data to the chart.<br><br>
   * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
   * - <b>Note:</b>
   *   - unload should be used if some data needs to be unloaded simultaneously.
   *     If you call unload API soon after/before load instead of unload param, chart will not be rendered properly because of cancel of animation.<br>
   *   - done will be called after data loaded, but it's not after rendering.
   *     It's because rendering will finish after some transition and there is some time lag between loading and rendering
   * @function load
   * @instance
   * @memberof Chart
   * @param {object} args The object can consist with following members:<br>
   *
   *    | Key | Type | Description |
   *    | --- | --- | --- |
   *    | columns | Array | The `columns` data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
   *    | json | Array | The `json` data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
   *    | rows | Array | The `rows` data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
   *    | url | string | The data from `url` will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
   *    | &nbsp; | | |
   *    | append | boolean | Load data appending it to the current dataseries.<br>If the existing chart has`x` value, should provide with corresponding `x` value for newly loaded data.  |
   *    | axes | Object | The axes specified by data.axes will be updated. axes must be Object that has target id as keys. |
   *    | categories | Array | The categories specified by axis.x.categories or data.x will be updated. categories must be Array. |
   *    | classes | Object | The classes specified by data.classes will be updated. classes must be Object that has target id as keys. |
   *    | colors | Object | The colors specified by data.colors will be updated. colors must be Object that has target id as keys. |
   *    | data | Obejct | Data objects to be loaded. Checkout the example. |
   *    | done | Function | The specified function will be called after data loaded.|
   *    | headers | string |  Set request header if loading via `data.url`.<br>@see [data․headers](Options.html#.data%25E2%2580%25A4headers) |
   *    | keys | Object |  Choose which JSON objects keys correspond to desired data.<br>**NOTE:** Only for JSON object given as array.<br>@see [data․keys](Options.html#.data%25E2%2580%25A4keys) |
   *    | mimeType | string |  Set 'json' if loading JSON via url.<br>@see [data․mimeType](Options.html#.data%25E2%2580%25A4mimeType) |
   *    | names | Object | Same as data.names() |
   *    | resizeAfter | boolean | Resize after the load. Default value is `false`.<br>- This option won't call `onresize` neither `onresized`.<br>- When set to 'true', will call `.flush(true)` at the end of load. |
   *    | type | string | The type of targets will be updated. |
   *    | types | Object | The types of targets will be updated. |
   *    | unload | Array | Specify the data will be unloaded before loading new data. If true given, all of data will be unloaded. If target ids given as String or Array, specified targets will be unloaded. If absent or false given, unload will not occur. |
   *    | xs | string | Same as data.xs option  |
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataFromURL)
   * @example
   * // Load data1 and unload data2 and data3
   * chart.load({
   *     columns: [
   *        ["data1", 100, 200, 150, ...],
   *        ...
   *    ],
   *    unload: ["data2", "data3"],
   *    url: "...",
   *    done: function() { ... }
   *    resizeAfter: true  // will resize after load
   * });
   * @example
   * const chart = bb.generate({
   *   data: {
   *     columns: [
   *       ["data1", 20, 30, 40]
   *     ]
   *   }
   * });
   *
   * chart.load({
   *    columns: [
   *        // with 'append' option, the 'data1' will have `[20,30,40,50,60]`.
   *        ["data1", 50, 60]
   *    ],
   *    append: true
   * });
   * @example
   * const chart = bb.generate({
   *   data: {
   *     x: "x",
   *     xFormat: "%Y-%m-%dT%H:%M:%S",
   *     columns: [
   *       ["x", "2021-01-03T03:00:00", "2021-01-04T12:00:00", "2021-01-05T21:00:00"],
   *       ["data1", 36, 30, 24]
   *     ]
   *   },
   *   axis: {
   *     x: {
   *       type: "timeseries"
   *     }
   *   }
   * };
   *
   * chart.load({
   *   columns: [
   *     // when existing chart has `x` value, should provide correponding 'x' value.
   *     // with 'append' option, the 'data1' will have `[36,30,24,37]`.
   *     ["x", "2021-02-01T08:00:00"],
   *     ["data1", 37]
   *   ],
   *   append: true
   * });
   * @example
   * // myAPI.json
   * // {
   * //   "data1": [220, 240, 270, 250, 280],
   * //   "data2": [180, 150, 300, 70, 120]
   * // }
   *
   * chart.load({
   *     url: './data/myAPI.json',
   *     mimeType: "json",
   *
   *     // set request header if is needed
   *     headers: {
   *       "Content-Type": "text/json"
   *     }
   * });
   * @example
   * chart.load({
   *     data: [
   *       // equivalent as: columns: [["data1", 30, 200, 100]]
   *       {"data1": 30}, {"data1": 200}, {"data1": 100}
   *
   *       // or
   *       // equivalent as: columns: [["data1", 10, 20], ["data2", 13, 30]]
   *       // {"data1": 10, "data2": 13}, {"data1": 20, "data2": 30}}
   *     ]
   * });
   * @example
   * chart.load({
   *     json: [
   *          {name: "www.site1.com", upload: 800, download: 500, total: 400},
   *     ],
   *     keys: {
   *         x: "name",
   *         value: ["upload", "download"]
   *     }
   * });
   * @example
   * chart.load({
   *   json: {
   *       data1:[30, 20, 50, 40, 60, 50],
   *       data2:[200, 130, 90, 240, 130, 220],
   *   }
   * });
   */
  load(args) {
    const $$ = this.internal;
    const { config } = $$;
    args.xs && $$.addXs(args.xs);
    "names" in args && this.data.names(args.names);
    "classes" in args && Object.keys(args.classes).forEach((id) => {
      config.data_classes[id] = args.classes[id];
    });
    if ("categories" in args && $$.axis.isCategorized()) {
      config.axis_x_categories = args.categories;
    }
    "axes" in args && Object.keys(args.axes).forEach((id) => {
      config.data_axes[id] = args.axes[id];
    });
    "colors" in args && Object.keys(args.colors).forEach((id) => {
      config.data_colors[id] = args.colors[id];
    });
    if ("unload" in args && args.unload !== false) {
      $$.unload($$.mapToTargetIds(args.unload === true ? null : args.unload), () => {
        requestIdleCallback(() => $$.loadFromArgs(args));
      });
    } else {
      $$.loadFromArgs(args);
    }
  },
  /**
   * Unload data to the chart.<br><br>
   * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be toggles.
   * - <b>Note:</b>
   * If you call load API soon after/before unload, unload param of load should be used. Otherwise chart will not be rendered properly because of cancel of animation.<br>
   * `done` will be called after data loaded, but it's not after rendering. It's because rendering will finish after some transition and there is some time lag between loading and rendering.
   * @function unload
   * @instance
   * @memberof Chart
   * @param {object} argsValue
   *  | key | Type | Description |
   *  | --- | --- | --- |
   *  | ids | String &vert; Array | Target id data to be unloaded. If not given, all data will be unloaded. |
   *  | done | Fuction | Callback after data is unloaded. |
   *  | resizeAfter | boolean | Resize after the unload. Default value is `false`.<br>- This option won't call `onresize` neither `onresized`.<br>- When set to 'true', will call `.flush(true)` at the end of unload. |
   * @example
   *  // Unload data2 and data3
   *  chart.unload({
   *    ids: ["data2", "data3"],
   *    done: function() {
   *       // called after the unloaded
   *    },
   *    resizeAfter: true  // will resize after unload
   *  });
   */
  unload(argsValue) {
    const $$ = this.internal;
    let args = argsValue || {};
    isEmpty(args) && this.tooltip.hide();
    if (isArray(args)) {
      args = { ids: args };
    } else if (isString(args)) {
      args = { ids: [args] };
    }
    const ids = $$.mapToTargetIds(args.ids);
    $$.unload(ids, () => {
      $$.redraw({
        withUpdateOrgXDomain: true,
        withUpdateXDomain: true,
        withLegend: true
      });
      $$.cache.remove(ids);
      callDone.call($$, args.done, args.resizeAfter);
    });
  }
});

;// CONCATENATED MODULE: ./src/Chart/api/show.ts

function showHide(show, targetIdsValue, options) {
  const $$ = this.internal;
  const targetIds = $$.mapToTargetIds(targetIdsValue);
  const hiddenIds = $$.state.hiddenTargetIds.map((v) => targetIds.indexOf(v) > -1 && v).filter(Boolean);
  $$.state.toggling = true;
  $$[`${show ? "remove" : "add"}HiddenTargetIds`](targetIds);
  const targets = $$.$el.svg.selectAll($$.selectorTargets(targetIds));
  const opacity = show ? null : "0";
  if (show && hiddenIds.length) {
    targets.style("display", null);
    callFn($$.config.data_onshown, this, hiddenIds);
  }
  $$.$T(targets).style("opacity", opacity, "important").call(endall, () => {
    var _a;
    if (!show && hiddenIds.length === 0) {
      targets.style("display", "none");
      callFn((_a = $$.config) == null ? void 0 : _a.data_onhidden, this, targetIds);
    }
    targets.style("opacity", opacity);
  });
  options.withLegend && $$[`${show ? "show" : "hide"}Legend`](targetIds);
  $$.redraw({
    withUpdateOrgXDomain: true,
    withUpdateXDomain: true,
    withLegend: true
  });
  $$.state.toggling = false;
}
/* harmony default export */ var show = ({
  /**
   * Show data series on chart
   * @function show
   * @instance
   * @memberof Chart
   * @param {string|Array} [targetIdsValue] The target id value.
   * @param {object} [options] The object can consist with following members:<br>
   *
   *    | Key | Type | default | Description |
   *    | --- | --- | --- | --- |
   *    | withLegend | boolean | false | whether or not display legend |
   *
   * @example
   * // show 'data1'
   * chart.show("data1");
   *
   * // show 'data1' and 'data3'
   * chart.show(["data1", "data3"]);
   */
  show(targetIdsValue, options = {}) {
    showHide.call(this, true, targetIdsValue, options);
  },
  /**
   * Hide data series from chart
   * @function hide
   * @instance
   * @memberof Chart
   * @param {string|Array} [targetIdsValue] The target id value.
   * @param {object} [options] The object can consist with following members:<br>
   *
   *    | Key | Type | default | Description |
   *    | --- | --- | --- | --- |
   *    | withLegend | boolean | false | whether or not display legend |
   *
   * @example
   * // hide 'data1'
   * chart.hide("data1");
   *
   * // hide 'data1' and 'data3'
   * chart.hide(["data1", "data3"]);
   */
  hide(targetIdsValue, options = {}) {
    showHide.call(this, false, targetIdsValue, options);
  },
  /**
   * Toggle data series on chart. When target data is hidden, it will show. If is shown, it will hide in vice versa.
   * @function toggle
   * @instance
   * @memberof Chart
   * @param {string|Array} [targetIds] The target id value.
   * @param {object} [options] The object can consist with following members:<br>
   *
   *    | Key | Type | default | Description |
   *    | --- | --- | --- | --- |
   *    | withLegend | boolean | false | whether or not display legend |
   *
   * @example
   * // toggle 'data1'
   * chart.toggle("data1");
   *
   * // toggle 'data1' and 'data3'
   * chart.toggle(["data1", "data3"]);
   */
  toggle(targetIds, options = {}) {
    const $$ = this.internal;
    const targets = { show: [], hide: [] };
    $$.mapToTargetIds(targetIds).forEach((id) => targets[$$.isTargetToShow(id) ? "hide" : "show"].push(id));
    targets.show.length && this.show(targets.show, options);
    targets.hide.length && setTimeout(() => this.hide(targets.hide, options), 0);
  }
});

;// CONCATENATED MODULE: ./src/Chart/api/tooltip.ts


const tooltip_tooltip = {
  /**
   * Show tooltip
   * @function tooltip․show
   * @instance
   * @memberof Chart
   * @param {object} args The object can consist with following members:<br>
   *
   *    | Key | Type | Description |
   *    | --- | --- | --- |
   *    | index | Number | Determine focus by index |
   *    | x | Number &vert; Date | Determine focus by x Axis index |
   *    | mouse | Array | Determine x and y coordinate value relative the targeted '.bb-event-rect' x Axis.<br>It should be used along with `data`, `index` or `x` value. The default value is set as `[0,0]` |
   *    | data | Object | When [data.xs](Options.html#.data%25E2%2580%25A4xs) option is used or [tooltip.grouped](Options.html#.tooltip) set to 'false', `should be used giving this param`.<br><br>**Key:**<br>- x {number &verbar; Date}: x Axis value<br>- index {number}: x Axis index (useless for data.xs)<br>- id {string}: data id<br>- value {number}: The corresponding value for tooltip. |
   *
   * @example
   *  // show the 2nd x Axis coordinate tooltip
   *  // for Arc(gauge, donut & pie) and radar type, approch showing tooltip by using "index" number.
   *  chart.tooltip.show({
   *    index: 1
   *  });
   *
   *  // show tooltip for the 3rd x Axis in x:50 and y:100 coordinate of '.bb-event-rect' of the x Axis.
   *  chart.tooltip.show({
   *    x: 2,
   *    mouse: [50, 100]
   *  });
   *
   *  // show tooltip for timeseries x axis
   *  chart.tooltip.show({
   *    x: new Date("2018-01-02 00:00")
   *  });
   *
   *  // treemap type can be shown by using "id" only.
   *  chart.tooltip.show({
   *    data: {
   *        id: "data1"  // data id
   *    }
   *  });
   *
   *  // for Arc types, specify 'id' or 'index'
   *  chart.tooltip.show({ data: { id: "data2" }});
   *  chart.tooltip.show({ data: { index: 2 }});
   *
   *  // when data.xs is used
   *  chart.tooltip.show({
   *    data: {
   *        x: 3,  // x Axis value
   *        id: "data1",  // data id
   *        value: 500  // data value
   *    }
   *  });
   *
   *  // when data.xs isn't used, but tooltip.grouped=false is set
   *  chart.tooltip.show({
   *    data: {
   *        index: 3,  // or 'x' key value
   *        id: "data1",  // data id
   *        value: 500  // data value
   *    }
   *  });
   */
  show: function(args) {
    var _a, _b, _c;
    const $$ = this.internal;
    const { $el, config, state: { eventReceiver, hasFunnel, hasTreemap, inputType } } = $$;
    let index;
    let mouse;
    if (args.mouse) {
      mouse = args.mouse;
    }
    if (args.data) {
      const { data } = args;
      const y = (_a = $$.getYScaleById(data.id)) == null ? void 0 : _a(data.value);
      if ((hasFunnel || hasTreemap) && data.id) {
        const selector = $$.selectorTarget(data.id, void 0, `.${$SHAPE.shape}`);
        eventReceiver.rect = $el.main.select(selector);
      } else if ($$.isMultipleX()) {
        mouse = [$$.xx(data), y];
      } else {
        if (!config.tooltip_grouped) {
          mouse = [0, y];
        }
        index = (_c = data.index) != null ? _c : $$.hasArcType() && data.id ? (_b = $$.getArcElementByIdOrIndex(data.id)) == null ? void 0 : _b.datum().index : $$.getIndexByX(data.x);
      }
    } else if (isDefined(args.x)) {
      index = $$.getIndexByX(args.x);
    } else if (isDefined(args.index)) {
      index = args.index;
    }
    (inputType === "mouse" ? ["mouseover", "mousemove"] : ["touchstart"]).forEach((eventName) => {
      $$.dispatchEvent(eventName, index, mouse);
    });
  },
  /**
   * Hide tooltip
   * @function tooltip․hide
   * @instance
   * @memberof Chart
   */
  hide: function() {
    var _a, _b, _c;
    const $$ = this.internal;
    const { state: { inputType }, $el: { tooltip: tooltip2 } } = $$;
    const data = tooltip2 == null ? void 0 : tooltip2.datum();
    if (data) {
      const { index } = JSON.parse(data.current)[0];
      (inputType === "mouse" ? ["mouseout"] : ["touchend"]).forEach((eventName) => {
        $$.dispatchEvent(eventName, index);
      });
    }
    inputType === "touch" && $$.callOverOutForTouch();
    $$.hideTooltip(true);
    (_a = $$.hideGridFocus) == null ? void 0 : _a.call($$);
    (_b = $$.unexpandCircles) == null ? void 0 : _b.call($$);
    (_c = $$.expandBarTypeShapes) == null ? void 0 : _c.call($$, false);
  }
};
/* harmony default export */ var api_tooltip = ({ tooltip: tooltip_tooltip });

;// CONCATENATED MODULE: ./src/Chart/Chart.ts
var Chart_defProp = Object.defineProperty;
var Chart_defNormalProp = (obj, key, value) => key in obj ? Chart_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var Chart_publicField = (obj, key, value) => Chart_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);












class Chart {
  constructor(options) {
    Chart_publicField(this, "plugins", []);
    Chart_publicField(this, "internal");
    const $$ = new ChartInternal(this);
    this.internal = $$;
    (function bindThis(fn, target, argThis) {
      Object.keys(fn).forEach((key) => {
        const isFunc = isFunction(fn[key]);
        const isChild = target !== argThis;
        const isNotNil = notEmpty(fn[key]);
        const hasChild = isNotNil && Object.keys(fn[key]).length > 0;
        if (isFunc && (!isChild && hasChild || isChild)) {
          target[key] = fn[key].bind(argThis);
        } else if (isNotNil && !isFunc) {
          target[key] = {};
        } else {
          target[key] = fn[key];
        }
        hasChild && bindThis(fn[key], target[key], argThis);
      });
    })(Chart.prototype, this, this);
    loadConfig.call($$, options);
    $$.beforeInit();
    $$.init();
  }
}
extend(Chart.prototype, [
  chart,
  api_color,
  api_data,
  api_export,
  api_focus,
  api_legend,
  api_load,
  show,
  api_tooltip
]);

;// CONCATENATED MODULE: ./src/Chart/api/selection.ts



function setSelection(isSelection = false, ids, indices, resetOther) {
  const $$ = this;
  const { config, $el: { main } } = $$;
  const selectionGrouped = config.data_selection_grouped;
  const isSelectable = config.data_selection_isselectable.bind($$.api);
  if (!config.data_selection_enabled) {
    return;
  }
  main.selectAll(`.${$SHAPE.shapes}`).selectAll(`.${$SHAPE.shape}`).each(function(d) {
    const shape = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
    const { id, index } = d.data ? d.data : d;
    const toggle = $$.getToggle(this, d).bind($$);
    const isTargetId = selectionGrouped || !ids || ids.indexOf(id) >= 0;
    const isTargetIndex = !indices || indices.indexOf(index) >= 0;
    const isSelected = shape.classed($SELECT.SELECTED);
    if (shape.classed($LINE.line) || shape.classed($AREA.area)) {
      return;
    }
    if (isSelection) {
      if (isTargetId && isTargetIndex && isSelectable(d) && !isSelected) {
        toggle(true, shape.classed($SELECT.SELECTED, true), d, index);
      } else if (isDefined(resetOther) && resetOther && isSelected) {
        toggle(false, shape.classed($SELECT.SELECTED, false), d, index);
      }
    } else {
      if (isTargetId && isTargetIndex && isSelectable(d) && isSelected) {
        toggle(false, shape.classed($SELECT.SELECTED, false), d, index);
      }
    }
  });
}
/* harmony default export */ var selection = ({
  /**
   * Get selected data points.<br><br>
   * By this API, you can get selected data points information. To use this API, data.selection.enabled needs to be set true.
   * @function selected
   * @instance
   * @memberof Chart
   * @param {string} [targetId] You can filter the result by giving target id that you want to get. If not given, all of data points will be returned.
   * @returns {Array} dataPoint Array of the data points.<br>ex.) `[{x: 1, value: 200, id: "data1", index: 1, name: "data1"}, ...]`
   * @example
   *  // all selected data points will be returned.
   *  chart.selected();
   *  // --> ex.) [{x: 1, value: 200, id: "data1", index: 1, name: "data1"}, ... ]
   *
   *  // all selected data points of data1 will be returned.
   *  chart.selected("data1");
   */
  selected(targetId) {
    const $$ = this.internal;
    const dataPoint = [];
    $$.$el.main.selectAll(`.${$SHAPE.shapes + $$.getTargetSelectorSuffix(targetId)}`).selectAll(`.${$SHAPE.shape}`).filter(function() {
      return (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed($SELECT.SELECTED);
    }).each((d) => dataPoint.push(d));
    return dataPoint;
  },
  /**
   * Set data points to be selected. ([`data.selection.enabled`](Options.html#.data%25E2%2580%25A4selection%25E2%2580%25A4enabled) option should be set true to use this method)
   * @function select
   * @instance
   * @memberof Chart
   * @param {string|Array} [ids] id value to get selected.
   * @param {Array} [indices] The index array of data points. If falsy value given, will select all data points.
   * @param {boolean} [resetOther] Unselect already selected.
   * @example
   *  // select all data points
   *  chart.select();
   *
   *  // select all from 'data2'
   *  chart.select("data2");
   *
   *  // select all from 'data1' and 'data2'
   *  chart.select(["data1", "data2"]);
   *
   *  // select from 'data1', indices 2 and unselect others selected
   *  chart.select("data1", [2], true);
   *
   *  // select from 'data1', indices 0, 3 and 5
   *  chart.select("data1", [0, 3, 5]);
   */
  select(ids, indices, resetOther) {
    const $$ = this.internal;
    setSelection.bind($$)(true, ids, indices, resetOther);
  },
  /**
   * Set data points to be un-selected.
   * @function unselect
   * @instance
   * @memberof Chart
   * @param {string|Array} [ids] id value to be unselected.
   * @param {Array} [indices] The index array of data points. If falsy value given, will select all data points.
   * @example
   *  // unselect all data points
   *  chart.unselect();
   *
   *  // unselect all from 'data1'
   *  chart.unselect("data1");
   *
   *  // unselect from 'data1', indices 2
   *  chart.unselect("data1", [2]);
   */
  unselect(ids, indices) {
    const $$ = this.internal;
    setSelection.bind($$)(false, ids, indices);
  }
});

;// CONCATENATED MODULE: ./src/Chart/api/subchart.ts


const subchart = function(domainValue) {
  var _a;
  const $$ = this.internal;
  const { axis, brush, config, scale: { x, subX }, state } = $$;
  let domain;
  if (config.subchart_show) {
    domain = domainValue;
    if (Array.isArray(domain)) {
      if (axis.isTimeSeries()) {
        domain = domain.map((x2) => parseDate.bind($$)(x2));
      }
      const isWithinRange = $$.withinRange(
        domain,
        $$.getZoomDomain("subX", true),
        $$.getZoomDomain("subX")
      );
      if (isWithinRange) {
        state.domain = domain;
        brush.move(
          brush.getSelection(),
          domain.map(subX)
        );
      }
    } else {
      domain = (_a = state.domain) != null ? _a : x.orgDomain();
    }
  }
  return domain;
};
extend(subchart, {
  /**
   * Show subchart
   * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
   * @function subchart․show
   * @instance
   * @memberof Chart
   * @example
   * // for ESM imports, needs to import 'subchart' and must be instantiated first to enable subchart's API.
   * import {subchart} from "billboard.js";
   *
   * const chart = bb.generate({
   *   ...
   *   subchart: {
   *      // need to be instantiated by calling 'subchart()'
   *      enabled: subchart()
   *
   *      // in case don't want subchart to be shown at initialization, instantiate with '!subchart()'
   *      enabled: !subchart()
   *   }
   * });
   *
   * chart.subchart.show();
   */
  show() {
    var _a, _b;
    const $$ = this.internal;
    const { $el: { subchart: subchart2 }, config } = $$;
    const show = config.subchart_show;
    if (!show) {
      $$.unbindZoomEvent();
      config.subchart_show = !show;
      !subchart2.main && $$.initSubchart();
      let $target = subchart2.main.selectAll(`.${$COMMON.target}`);
      if ($$.data.targets.length !== $target.size()) {
        $$.updateSizes();
        $$.updateTargetsForSubchart($$.data.targets);
        $target = (_a = subchart2.main) == null ? void 0 : _a.selectAll(`.${$COMMON.target}`);
      }
      $target == null ? void 0 : $target.style("opacity", null);
      (_b = subchart2.main) == null ? void 0 : _b.style("display", null);
      this.resize();
    }
  },
  /**
   * Hide generated subchart
   * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
   * @function subchart․hide
   * @instance
   * @memberof Chart
   * @example
   *  chart.subchart.hide();
   */
  hide() {
    const $$ = this.internal;
    const { $el: { subchart: { main } }, config } = $$;
    if (config.subchart_show && (main == null ? void 0 : main.style("display")) !== "none") {
      config.subchart_show = false;
      main.style("display", "none");
      this.resize();
    }
  },
  /**
   * Toggle the visiblity of subchart
   * - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
   * @function subchart․toggle
   * @instance
   * @memberof Chart
   * @example
   * // When subchart is hidden, will be shown
   * // When subchart is shown, will be hidden
   * chart.subchart.toggle();
   */
  toggle() {
    const $$ = this.internal;
    const { config } = $$;
    this.subchart[config.subchart_show ? "hide" : "show"]();
  },
  /**
   * Reset subchart selection
   * @function subchart․reset
   * @instance
   * @memberof Chart
   * @example
   * // Reset subchart selection
   * chart.subchart.reset();
   */
  reset() {
    const $$ = this.internal;
    const { brush } = $$;
    brush.clear(brush.getSelection());
  }
});
/* harmony default export */ var api_subchart = ({
  subchart
});

// EXTERNAL MODULE: external {"commonjs":"d3-zoom","commonjs2":"d3-zoom","amd":"d3-zoom","root":"d3"}
var external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_ = __webpack_require__(10);
;// CONCATENATED MODULE: ./src/Chart/api/zoom.ts


const zoom = function(domainValue) {
  var _a;
  const $$ = this.internal;
  const { axis, config, org, scale, state } = $$;
  const isCategorized = axis.isCategorized();
  let domain;
  if (config.zoom_enabled) {
    domain = domainValue;
    if (Array.isArray(domain)) {
      if (axis.isTimeSeries()) {
        domain = domain.map((x) => parseDate.bind($$)(x));
      }
      const isWithinRange = $$.withinRange(
        domain,
        $$.getZoomDomain("zoom", true),
        $$.getZoomDomain("zoom")
      );
      if (isWithinRange) {
        state.domain = domain;
        domain = $$.getZoomDomainValue(domain);
        $$.api.tooltip.hide();
        if (config.subchart_show) {
          const x = scale.zoom || scale.x;
          $$.brush.getSelection().call($$.brush.move, domain.map(x));
        } else {
          const x = isCategorized ? scale.x.orgScale() : org.xScale || scale.x;
          $$.updateCurrentZoomTransform(x, domain);
        }
        $$.setZoomResetButton();
      }
    } else {
      domain = $$.zoom.getDomain();
    }
  }
  return (_a = state.domain) != null ? _a : domain;
};
extend(zoom, {
  /**
   * Enable and disable zooming.
   * @function zoom․enable
   * @instance
   * @memberof Chart
   * @param {string|boolean} enabled Possible string values are "wheel" or "drag". If enabled is true, "wheel" will be used. If false is given, zooming will be disabled.<br>When set to false, the current zooming status will be reset.
   * @example
   *  // Enable zooming using the mouse wheel
   *  chart.zoom.enable(true);
   *  // Or
   *  chart.zoom.enable("wheel");
   *
   *  // Enable zooming by dragging
   *  chart.zoom.enable("drag");
   *
   *  // Disable zooming
   *  chart.zoom.enable(false);
   */
  enable(enabled) {
    const $$ = this.internal;
    const { config } = $$;
    if (/^(drag|wheel)$/.test(enabled)) {
      config.zoom_type = enabled;
    }
    config.zoom_enabled = !!enabled;
    if (!$$.zoom) {
      $$.initZoom();
      $$.bindZoomEvent();
    } else if (enabled === false) {
      $$.bindZoomEvent(false);
    }
    $$.updateAndRedraw();
  },
  /**
   * Set or get x Axis maximum zoom range value
   * @function zoom․max
   * @instance
   * @memberof Chart
   * @param {number} [max] maximum value to set for zoom
   * @returns {number} zoom max value
   * @example
   *  // Set maximum range value
   *  chart.zoom.max(20);
   */
  max(max) {
    const $$ = this.internal;
    const { config, org: { xDomain } } = $$;
    if (max === 0 || max) {
      config.zoom_x_max = getMinMax("max", [xDomain[1], max]);
    }
    return config.zoom_x_max;
  },
  /**
   * Set or get x Axis minimum zoom range value
   * @function zoom․min
   * @instance
   * @memberof Chart
   * @param {number} [min] minimum value to set for zoom
   * @returns {number} zoom min value
   * @example
   *  // Set minimum range value
   *  chart.zoom.min(-1);
   */
  min(min) {
    const $$ = this.internal;
    const { config, org: { xDomain } } = $$;
    if (min === 0 || min) {
      config.zoom_x_min = getMinMax("min", [xDomain[0], min]);
    }
    return config.zoom_x_min;
  },
  /**
   * Set zoom range
   * @function zoom․range
   * @instance
   * @memberof Chart
   * @param {object} [range] zoom range
   * @returns {object} zoom range value
   * {
   *   min: 0,
   *   max: 100
   * }
   * @example
   *  chart.zoom.range({
   *      min: 10,
   *      max: 100
   *  });
   */
  range(range) {
    const zoom2 = this.zoom;
    if (isObject(range)) {
      const { min, max } = range;
      isDefined(min) && zoom2.min(min);
      isDefined(max) && zoom2.max(max);
    }
    return {
      min: zoom2.min(),
      max: zoom2.max()
    };
  }
});
/* harmony default export */ var api_zoom = ({
  zoom,
  /**
   * Unzoom zoomed area
   * - **NOTE:** Calling .unzoom() will not trigger zoom events.
   * @function unzoom
   * @instance
   * @memberof Chart
   * @example
   *  chart.unzoom();
   */
  unzoom() {
    const $$ = this.internal;
    const { config, $el: { eventRect, zoomResetBtn }, scale: { zoom: zoom2 }, state } = $$;
    if (zoom2) {
      config.subchart_show ? $$.brush.getSelection().call($$.brush.move, null) : $$.zoom.updateTransformScale(external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity);
      $$.updateZoom(true);
      zoomResetBtn == null ? void 0 : zoomResetBtn.style("display", "none");
      if ((0,external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomTransform)(eventRect.node()) !== external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity) {
        $$.zoom.transform(eventRect, external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity);
      }
      state.domain = void 0;
    }
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/interactions/subchart.ts




/* harmony default export */ var interactions_subchart = ({
  /**
   * Initialize the brush.
   * @private
   */
  initBrush() {
    const $$ = this;
    const { config, scale, $el: { subchart }, state } = $$;
    const isRotated = config.axis_rotated;
    const height = config.subchart_size_height;
    let lastDomain;
    let lastSelection;
    let timeout;
    $$.brush = (isRotated ? (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushY)() : (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushX)()).handleSize(5);
    $$.brush.on("start brush end", (event) => {
      const { selection, sourceEvent, target, type } = event;
      if (type === "start") {
        $$.state.inputType === "touch" && $$.hideTooltip();
        lastSelection = sourceEvent ? selection : null;
      }
      if (/(start|brush)/.test(type)) {
        type === "brush" && sourceEvent && state.domain && (lastSelection == null ? void 0 : lastSelection.forEach((v, i) => {
          if (v !== selection[i]) {
            state.domain[i] = scale.x.orgDomain()[i];
          }
        }));
        $$.redrawForBrush(type !== "start");
      }
      if (type === "end") {
        lastDomain = scale.x.orgDomain();
      }
      if (target == null ? void 0 : target.handle) {
        if (selection === null) {
          $$.brush.handle.attr("display", "none");
        } else {
          $$.brush.handle.attr("display", null).attr("transform", (d, i) => {
            const pos = [selection[i], height / 2];
            return `translate(${isRotated ? pos.reverse() : pos})`;
          });
        }
      }
    });
    $$.brush.updateResize = function() {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        const selection = this.getSelection();
        lastDomain && (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushSelection)(selection.node()) && this.move(selection, lastDomain.map(scale.subX.orgScale()));
      }, 0);
    };
    $$.brush.update = function() {
      var _a;
      const extent = this.extent()();
      if (extent[1].filter((v) => isNaN(v)).length === 0) {
        (_a = subchart.main) == null ? void 0 : _a.select(`.${classes.brush}`).call(this);
      }
      return this;
    };
    $$.brush.scale = function(scale2) {
      const h = config.subchart_size_height;
      let extent = $$.getExtent();
      if (!extent && scale2.range) {
        extent = [[0, 0], [scale2.range()[1], h]];
      } else if (isArray(extent)) {
        extent = extent.map((v, i) => [v, i > 0 ? h : i]);
      }
      isRotated && extent[1].reverse();
      this.extent(extent);
      this.update();
    };
    $$.brush.getSelection = () => (
      // @ts-ignore
      subchart.main ? subchart.main.select(`.${classes.brush}`) : (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)([])
    );
  },
  /**
   * Initialize the subchart.
   * @private
   */
  initSubchart() {
    const $$ = this;
    const { config, state: { clip, hasAxis }, $el: { defs, svg, subchart, axis } } = $$;
    if (!hasAxis) {
      return;
    }
    const visibility = config.subchart_show ? null : "hidden";
    const clipId = `${clip.id}-subchart`;
    const clipPath = $$.getClipPath(clipId);
    clip.idSubchart = clipId;
    $$.appendClip(defs, clipId);
    $$.initBrush();
    subchart.main = svg.append("g").classed(classes.subchart, true).attr("transform", $$.getTranslate("context"));
    const { main } = subchart;
    main.style("visibility", visibility);
    main.append("g").attr("clip-path", clipPath).attr("class", classes.chart);
    ["bar", "line", "bubble", "candlestick", "scatter"].forEach((v) => {
      const type = capitalize(/^(bubble|scatter)$/.test(v) ? "circle" : v);
      if ($$.hasType(v) || $$.hasTypeOf(type)) {
        const chart = main.select(`.${classes.chart}`);
        const chartClassName = classes[`chart${type}s`];
        if (chart.select(`.${chartClassName}`).empty()) {
          chart.append("g").attr("class", chartClassName);
        }
      }
    });
    const brush = main.append("g").attr("clip-path", clipPath).attr("class", classes.brush).call($$.brush);
    config.subchart_showHandle && $$.addBrushHandle(brush);
    axis.subX = main.append("g").attr("class", classes.axisX).attr("transform", $$.getTranslate("subX")).attr("clip-path", config.axis_rotated ? "" : clip.pathXAxis).style("visibility", config.subchart_axis_x_show ? visibility : "hidden");
  },
  /**
   * Add brush handle
   * Enabled when: subchart.showHandle=true
   * @param {d3Selection} brush Brush selection
   * @private
   */
  addBrushHandle(brush) {
    const $$ = this;
    const { config } = $$;
    const isRotated = config.axis_rotated;
    const initRange = config.subchart_init_range;
    const customHandleClass = "handle--custom";
    const path = isRotated ? [
      "M8.5 0 a6 6 0 0 0 -6 -6.5 H-2.5 a 6 6 0 0 0 -6 6.5 z m-5 -2 H-3.5 m7 -2 H-3.5z",
      "M8.5 0 a6 -6 0 0 1 -6 6.5 H-2.5 a 6 -6 0 0 1 -6 -6.5z m-5 2 H-3.5 m7 2 H-3.5z"
    ] : [
      "M0 -8.5 A6 6 0 0 0 -6.5 -3.5 V2.5 A6 6 0 0 0 0 8.5 Z M-2 -3.5 V3.5 M-4 -3.5 V3.5z",
      "M0 -8.5 A6 6 0 0 1 6.5 -3.5 V2.5 A6 6 0 0 1 0 8.5 Z M2 -3.5 V3.5 M4 -3.5 V3.5z"
    ];
    $$.brush.handle = brush.selectAll(`.${customHandleClass}`).data(isRotated ? [{ type: "n" }, { type: "s" }] : [{ type: "w" }, { type: "e" }]).enter().append("path").attr("class", customHandleClass).attr("cursor", `${isRotated ? "ns" : "ew"}-resize`).attr("d", (d) => path[+/[se]/.test(d.type)]).attr("display", initRange ? null : "none");
  },
  /**
   * Update sub chart
   * @param {object} targets $$.data.targets
   * @private
   */
  updateTargetsForSubchart(targets) {
    const $$ = this;
    const { config, state, $el: { subchart: { main } } } = $$;
    if (config.subchart_show) {
      ["bar", "line", "bubble", "candlestick", "scatter"].filter((v) => $$.hasType(v) || $$.hasTypeOf(capitalize(v))).forEach((v) => {
        const isPointType = /^(bubble|scatter)$/.test(v);
        const name = capitalize(isPointType ? "circle" : v);
        const chartClass = $$.getChartClass(name, true);
        const shapeClass = $$.getClass(isPointType ? "circles" : `${v}s`, true);
        const shapeChart = main.select(`.${classes[`chart${`${name}s`}`]}`);
        if (isPointType) {
          const circle = shapeChart.selectAll(`.${classes.circles}`).data(targets.filter($$[`is${capitalize(v)}Type`].bind($$))).attr("class", shapeClass);
          circle.exit().remove();
          circle.enter().append("g").attr("class", shapeClass);
        } else {
          const shapeUpdate = shapeChart.selectAll(`.${classes[`chart${name}`]}`).attr("class", chartClass).data(targets.filter($$[`is${name}Type`].bind($$)));
          const shapeEnter = shapeUpdate.enter().append("g").style("opacity", "0").attr("class", chartClass).append("g").attr("class", shapeClass);
          shapeUpdate.exit().remove();
          v === "line" && $$.hasTypeOf("Area") && shapeEnter.append("g").attr("class", $$.getClass("areas", true));
        }
      });
      main.selectAll(`.${classes.brush} rect`).attr(
        config.axis_rotated ? "width" : "height",
        config.axis_rotated ? state.width2 : state.height2
      );
    }
  },
  /**
   * Redraw subchart.
   * @private
   * @param {boolean} withSubchart whether or not to show subchart
   * @param {number} duration duration
   * @param {object} shape Shape's info
   */
  redrawSubchart(withSubchart, duration, shape) {
    var _a;
    const $$ = this;
    const { config, $el: { subchart: { main } }, state } = $$;
    const withTransition = !!duration;
    main.style("visibility", config.subchart_show ? null : "hidden");
    if (config.subchart_show) {
      if (((_a = state.event) == null ? void 0 : _a.type) === "zoom") {
        $$.brush.update();
      }
      if (withSubchart) {
        const initRange = config.subchart_init_range;
        !brushEmpty($$) && $$.brush.update();
        Object.keys(shape.type).forEach((v) => {
          const name = capitalize(v);
          const drawFn = $$[`generateDraw${name}`](shape.indices[v], true);
          $$[`update${name}`](withTransition, true);
          $$[`redraw${name}`](drawFn, withTransition, true);
        });
        if ($$.hasType("bubble") || $$.hasType("scatter")) {
          const { cx } = shape.pos;
          const cy = $$.updateCircleY(true);
          $$.updateCircle(true);
          $$.redrawCircle(cx, cy, withTransition, void 0, true);
        }
        if (!state.rendered && initRange) {
          state.domain = initRange;
          $$.brush.move(
            $$.brush.getSelection(),
            initRange.map($$.scale.x)
          );
        }
      }
    }
  },
  /**
   * Redraw the brush.
   * @param {boolean} [callCallbck=true] Call 'onbrush' callback or not.
   * @private
   */
  redrawForBrush(callCallbck = true) {
    var _a;
    const $$ = this;
    const {
      config: {
        subchart_onbrush: onBrush,
        zoom_rescale: withY
      },
      scale,
      state
    } = $$;
    $$.redraw({
      withTransition: false,
      withY,
      withSubchart: false,
      withUpdateXDomain: true,
      withDimension: false
    });
    callCallbck && state.rendered && onBrush.bind($$.api)((_a = state.domain) != null ? _a : scale.x.orgDomain());
  },
  /**
   * Transform context
   * @param {boolean} withTransition indicates transition is enabled
   * @param {object} transitions The return value of the generateTransitions method of Axis.
   * @private
   */
  transformContext(withTransition, transitions) {
    const $$ = this;
    const { $el: { subchart }, $T } = $$;
    const subXAxis = (transitions == null ? void 0 : transitions.axisSubX) ? transitions.axisSubX : $T(subchart.main.select(`.${classes.axisX}`), withTransition);
    subchart.main.attr("transform", $$.getTranslate("context"));
    subXAxis.attr("transform", $$.getTranslate("subX"));
  },
  /**
   * Get extent value
   * @returns {Array} default extent
   * @private
   */
  getExtent() {
    const $$ = this;
    const { config, scale } = $$;
    let extent = config.axis_x_extent;
    if (extent) {
      if (isFunction(extent)) {
        extent = extent.bind($$.api)($$.getXDomain($$.data.targets), scale.subX);
      } else if ($$.axis.isTimeSeries() && extent.every(isNaN)) {
        const fn = parseDate.bind($$);
        extent = extent.map((v) => scale.subX(fn(v)));
      }
    }
    return extent;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/interactions/zoom.ts





/* harmony default export */ var interactions_zoom = ({
  /**
   * Initialize zoom.
   * @private
   */
  initZoom() {
    const $$ = this;
    $$.scale.zoom = null;
    $$.generateZoom();
    $$.initZoomBehaviour();
  },
  /**
   * Bind zoom event
   * @param {boolean} bind Weather bind or unbound
   * @private
   */
  bindZoomEvent(bind = true) {
    const $$ = this;
    const { config } = $$;
    const zoomEnabled = config.zoom_enabled;
    if (zoomEnabled && bind) {
      !config.subchart_show && $$.bindZoomOnEventRect();
    } else if (bind === false) {
      $$.api.unzoom();
      $$.unbindZoomEvent();
    }
  },
  /**
   * Generate zoom
   * @private
   */
  generateZoom() {
    const $$ = this;
    const { config, org, scale } = $$;
    const zoom = (0,external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoom)().duration(0).on("start", $$.onZoomStart.bind($$)).on("zoom", $$.onZoom.bind($$)).on("end", $$.onZoomEnd.bind($$));
    zoom.orgScaleExtent = () => {
      const extent = config.zoom_extent || [1, 10];
      return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];
    };
    zoom.updateScaleExtent = function() {
      const ratio = diffDomain($$.scale.x.orgDomain()) / diffDomain($$.getZoomDomain());
      const extent = this.orgScaleExtent();
      this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);
      return this;
    };
    zoom.updateTransformScale = (transform, correctTransform) => {
      var _a;
      const isRotated = config.axis_rotated;
      (_a = org.xScale) == null ? void 0 : _a.range(scale.x.range());
      const newScale = transform[isRotated ? "rescaleY" : "rescaleX"](org.xScale || scale.x);
      const domain = $$.trimXDomain(newScale.domain());
      const rescale = config.zoom_rescale;
      newScale.domain(domain, org.xDomain);
      if (correctTransform) {
        const t = newScale(scale.x.domain()[0]);
        const tX = isRotated ? transform.x : t;
        const tY = isRotated ? t : transform.y;
        $$.$el.eventRect.property(
          "__zoom",
          external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity.translate(tX, tY).scale(transform.k)
        );
      }
      if (!$$.state.xTickOffset) {
        $$.state.xTickOffset = $$.axis.x.tickOffset();
      }
      scale.zoom = $$.getCustomizedXScale(newScale);
      $$.axis.x.scale(scale.zoom);
      if (rescale) {
        !org.xScale && (org.xScale = scale.x.copy());
        scale.x.domain(domain);
      } else if (org.xScale) {
        scale.x.domain(org.xScale.domain());
        org.xScale = null;
      }
    };
    zoom.getDomain = () => {
      const domain = scale[scale.zoom ? "zoom" : "subX"].domain();
      const isCategorized = $$.axis.isCategorized();
      if (isCategorized) {
        domain[1] -= 2;
      }
      return domain;
    };
    $$.zoom = zoom;
  },
  /**
   * 'start' event listener
   * @param {object} event Event object
   * @private
   */
  onZoomStart(event) {
    const $$ = this;
    const { sourceEvent } = event;
    if (sourceEvent) {
      $$.zoom.startEvent = sourceEvent;
      $$.state.zooming = true;
      callFn($$.config.zoom_onzoomstart, $$.api, event);
    }
  },
  /**
   * 'zoom' event listener
   * @param {object} event Event object
   * @private
   */
  onZoom(event) {
    var _a;
    const $$ = this;
    const { config, scale, state, org } = $$;
    const { sourceEvent } = event;
    const isUnZoom = (event == null ? void 0 : event.transform) === external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity;
    if (!config.zoom_enabled || $$.filterTargetsToShow($$.data.targets).length === 0 || !scale.zoom && (sourceEvent == null ? void 0 : sourceEvent.type.indexOf("touch")) > -1 && (sourceEvent == null ? void 0 : sourceEvent.touches.length) === 1) {
      return;
    }
    if (event.sourceEvent) {
      state.zooming = true;
      state.domain = void 0;
    }
    const isMousemove = (sourceEvent == null ? void 0 : sourceEvent.type) === "mousemove";
    const isZoomOut = (sourceEvent == null ? void 0 : sourceEvent.wheelDelta) < 0;
    const { transform } = event;
    if (!isMousemove && isZoomOut && scale.x.domain().every((v, i) => v !== org.xDomain[i])) {
      scale.x.domain(org.xDomain);
    }
    $$.zoom.updateTransformScale(transform, config.zoom_type === "wheel" && sourceEvent);
    const doTransition = config.transition_duration > 0 && !config.subchart_show && (state.dragging || isUnZoom || !event.sourceEvent);
    $$.redraw({
      withTransition: doTransition,
      withY: config.zoom_rescale,
      withSubchart: false,
      withEventRect: false,
      withDimension: false
    });
    $$.state.cancelClick = isMousemove;
    !isUnZoom && callFn(
      config.zoom_onzoom,
      $$.api,
      (_a = $$.state.domain) != null ? _a : $$.zoom.getDomain()
    );
  },
  /**
   * 'end' event listener
   * @param {object} event Event object
   * @private
   */
  onZoomEnd(event) {
    var _a, _b;
    const $$ = this;
    const { config, state } = $$;
    let { startEvent } = $$.zoom;
    let e = event == null ? void 0 : event.sourceEvent;
    const isUnZoom = (event == null ? void 0 : event.transform) === external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity;
    if ((startEvent == null ? void 0 : startEvent.type.indexOf("touch")) > -1) {
      startEvent = startEvent.changedTouches[0];
      e = (_a = e == null ? void 0 : e.changedTouches) == null ? void 0 : _a[0];
    }
    if (config.zoom_type === "drag" && (e && startEvent.clientX === e.clientX && startEvent.clientY === e.clientY)) {
      return;
    }
    state.zooming = false;
    $$.redrawEventRect();
    $$.updateZoom();
    !isUnZoom && (e || state.dragging) && callFn(
      config.zoom_onzoomend,
      $$.api,
      (_b = $$.state.domain) != null ? _b : $$.zoom.getDomain()
    );
  },
  /**
   * Update zoom
   * @param {boolean} force Force unzoom
   * @private
   */
  updateZoom(force) {
    const $$ = this;
    const { subX, x, zoom } = $$.scale;
    if (zoom) {
      const zoomDomain = zoom.domain();
      const xDomain = subX.domain();
      const delta = 0.015;
      const isfullyShown = $$.config.axis_x_inverted ? (zoomDomain[0] >= xDomain[0] || zoomDomain[0] + delta >= xDomain[0]) && (xDomain[1] >= zoomDomain[1] || xDomain[1] >= zoomDomain[1] + delta) : (zoomDomain[0] <= xDomain[0] || zoomDomain[0] - delta <= xDomain[0]) && (xDomain[1] <= zoomDomain[1] || xDomain[1] <= zoomDomain[1] - delta);
      if (force || isfullyShown) {
        $$.axis.x.scale(subX);
        x.domain(subX.orgDomain());
        $$.scale.zoom = null;
      }
    }
  },
  /**
   * Set zoom transform to event rect
   * @param {Function} x x Axis scale function
   * @param {Array} domain Domain value to be set
   * @private
   */
  updateCurrentZoomTransform(x, domain) {
    const $$ = this;
    const { $el: { eventRect }, config } = $$;
    const isRotated = config.axis_rotated;
    const translate = [-x(domain[0]), 0];
    const transform = external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity.scale(x.range()[1] / (x(domain[1]) - x(domain[0]))).translate(
      ...isRotated ? translate.reverse() : translate
    );
    eventRect.call($$.zoom.transform, transform);
  },
  /**
   * Attach zoom event on <rect>
   * @private
   */
  bindZoomOnEventRect() {
    var _a;
    const $$ = this;
    const { config, $el: { eventRect, svg } } = $$;
    const behaviour = config.zoom_type === "drag" ? $$.zoomBehaviour : $$.zoom;
    if (win.GestureEvent && /^((?!chrome|android|mobile).)*safari/i.test((_a = win.navigator) == null ? void 0 : _a.userAgent)) {
      svg.on("wheel", () => {
      });
    }
    eventRect == null ? void 0 : eventRect.call(behaviour).on("dblclick.zoom", null);
  },
  /**
   * Initialize the drag behaviour used for zooming.
   * @private
   */
  initZoomBehaviour() {
    const $$ = this;
    const { config, state } = $$;
    const isRotated = config.axis_rotated;
    let start = 0;
    let end = 0;
    let zoomRect;
    const prop = {
      axis: isRotated ? "y" : "x",
      attr: isRotated ? "height" : "width",
      index: isRotated ? 1 : 0
    };
    $$.zoomBehaviour = (0,external_commonjs_d3_drag_commonjs2_d3_drag_amd_d3_drag_root_d3_.drag)().clickDistance(4).on("start", function(event) {
      state.event = event;
      $$.setDragStatus(true);
      $$.unselectRect();
      if (!zoomRect) {
        zoomRect = $$.$el.main.append("rect").attr("clip-path", state.clip.path).attr("class", $ZOOM.zoomBrush).attr("width", isRotated ? state.width : 0).attr("height", isRotated ? 0 : state.height);
      }
      start = getPointer(event, this)[prop.index];
      end = start;
      zoomRect.attr(prop.axis, start).attr(prop.attr, 0);
      $$.onZoomStart(event);
    }).on("drag", function(event) {
      end = getPointer(event, this)[prop.index];
      zoomRect.attr(prop.axis, Math.min(start, end)).attr(prop.attr, Math.abs(end - start));
    }).on("end", (event) => {
      const scale = $$.scale.zoom || $$.scale.x;
      state.event = event;
      zoomRect.attr(prop.axis, 0).attr(prop.attr, 0);
      if (start > end) {
        [start, end] = [end, start];
      }
      if (start < 0) {
        end += Math.abs(start);
        start = 0;
      }
      if (start !== end) {
        $$.api.zoom([start, end].map((v) => scale.invert(v)));
      }
      $$.setDragStatus(false);
    });
  },
  setZoomResetButton() {
    const $$ = this;
    const { config, $el } = $$;
    const resetButton = config.zoom_resetButton;
    if (resetButton && config.zoom_type === "drag") {
      if (!$el.zoomResetBtn) {
        $el.zoomResetBtn = $$.$el.chart.append("div").classed($COMMON.button, true).append("span").on("click", function() {
          isFunction(resetButton.onclick) && resetButton.onclick.bind($$.api)(this);
          $$.api.unzoom();
        }).classed($ZOOM.buttonZoomReset, true).text(resetButton.text || "Reset Zoom");
      } else {
        $el.zoomResetBtn.style("display", null);
      }
    }
  },
  getZoomTransform() {
    const $$ = this;
    const { $el: { eventRect } } = $$;
    return (eventRect == null ? void 0 : eventRect.node()) ? (0,external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomTransform)(eventRect.node()) : { k: 1 };
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/interactions/drag.ts



/* harmony default export */ var drag = ({
  /**
   * Called when dragging.
   * Data points can be selected.
   * @private
   * @param {object} mouse Object
   */
  drag(mouse) {
    const $$ = this;
    const { config, state, $el: { main } } = $$;
    const isSelectionGrouped = config.data_selection_grouped;
    const isSelectable = config.interaction_enabled && config.data_selection_isselectable;
    if ($$.hasArcType() || !config.data_selection_enabled || // do nothing if not selectable
    config.zoom_enabled && !$$.zoom.altDomain || // skip if zoomable because of conflict drag behavior
    !config.data_selection_multiple) {
      return;
    }
    const [sx, sy] = state.dragStart || [0, 0];
    const [mx, my] = mouse;
    const minX = Math.min(sx, mx);
    const maxX = Math.max(sx, mx);
    const minY = isSelectionGrouped ? state.margin.top : Math.min(sy, my);
    const maxY = isSelectionGrouped ? state.height : Math.max(sy, my);
    main.select(`.${$DRAG.dragarea}`).attr("x", minX).attr("y", minY).attr("width", maxX - minX).attr("height", maxY - minY);
    main.selectAll(`.${$SHAPE.shapes}`).selectAll(`.${$SHAPE.shape}`).filter((d) => isSelectable == null ? void 0 : isSelectable.bind($$.api)(d)).each(function(d, i) {
      const shape = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      const isSelected = shape.classed($SELECT.SELECTED);
      const isIncluded = shape.classed($DRAG.INCLUDED);
      let isWithin = false;
      let toggle;
      if (shape.classed($CIRCLE.circle)) {
        const x = +shape.attr("cx") * 1;
        const y = +shape.attr("cy") * 1;
        toggle = $$.togglePoint;
        isWithin = minX < x && x < maxX && minY < y && y < maxY;
      } else if (shape.classed($BAR.bar)) {
        const { x, y, width, height } = getPathBox(this);
        toggle = $$.togglePath;
        isWithin = !(maxX < x || x + width < minX) && !(maxY < y || y + height < minY);
      } else {
        return;
      }
      if (isWithin ^ isIncluded) {
        shape.classed($DRAG.INCLUDED, !isIncluded);
        shape.classed($SELECT.SELECTED, !isSelected);
        toggle.call($$, !isSelected, shape, d, i);
      }
    });
  },
  /**
   * Called when the drag starts.
   * Adds and Shows the drag area.
   * @private
   * @param {object} mouse Object
   */
  dragstart(mouse) {
    const $$ = this;
    const { config, state, $el: { main } } = $$;
    if ($$.hasArcType() || !config.data_selection_enabled) {
      return;
    }
    state.dragStart = mouse;
    main.select(`.${$COMMON.chart}`).append("rect").attr("class", $DRAG.dragarea).style("opacity", "0.1");
    $$.setDragStatus(true);
  },
  /**
   * Called when the drag finishes.
   * Removes the drag area.
   * @private
   */
  dragend() {
    const $$ = this;
    const { config, $el: { main }, $T } = $$;
    if ($$.hasArcType() || !config.data_selection_enabled) {
      return;
    }
    $T(main.select(`.${$DRAG.dragarea}`)).style("opacity", "0").remove();
    main.selectAll(`.${$SHAPE.shape}`).classed($DRAG.INCLUDED, false);
    $$.setDragStatus(false);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/selection.ts
var selection_defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var selection_getOwnPropSymbols = Object.getOwnPropertySymbols;
var selection_hasOwnProp = Object.prototype.hasOwnProperty;
var selection_propIsEnum = Object.prototype.propertyIsEnumerable;
var selection_defNormalProp = (obj, key, value) => key in obj ? selection_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var selection_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (selection_hasOwnProp.call(b, prop))
      selection_defNormalProp(a, prop, b[prop]);
  if (selection_getOwnPropSymbols)
    for (var prop of selection_getOwnPropSymbols(b)) {
      if (selection_propIsEnum.call(b, prop))
        selection_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));




/* harmony default export */ var internals_selection = (__spreadProps(selection_spreadValues({}, drag), {
  /**
   * Select a point
   * @param {object} target Target point
   * @param {object} d Data object
   * @param {number} i Index number
   * @private
   */
  selectPoint(target, d, i) {
    const $$ = this;
    const { config, $el: { main }, $T } = $$;
    const isRotated = config.axis_rotated;
    const cx = (isRotated ? $$.circleY : $$.circleX).bind($$);
    const cy = (isRotated ? $$.circleX : $$.circleY).bind($$);
    const r = $$.pointSelectR.bind($$);
    callFn(config.data_onselected, $$.api, d, target.node());
    $T(main.select(`.${$SELECT.selectedCircles}${$$.getTargetSelectorSuffix(d.id)}`).selectAll(`.${$SELECT.selectedCircle}-${i}`).data([d]).enter().append("circle").attr("class", () => $$.generateClass($SELECT.selectedCircle, i)).attr("cx", cx).attr("cy", cy).attr("stroke", $$.color).attr("r", (d2) => $$.pointSelectR(d2) * 1.4)).attr("r", r);
  },
  /**
   * Unelect a point
   * @param {object} target Target point
   * @param {object} d Data object
   * @param {number} i Index number
   * @private
   */
  unselectPoint(target, d, i) {
    const $$ = this;
    const { config, $el: { main }, $T } = $$;
    callFn(config.data_onunselected, $$.api, d, target == null ? void 0 : target.node());
    $T(main.select(`.${$SELECT.selectedCircles}${$$.getTargetSelectorSuffix(d.id)}`).selectAll(`.${$SELECT.selectedCircle}-${i}`)).attr("r", 0).remove();
  },
  /**
   * Toggles the selection of points
   * @param {boolean} selected whether or not to select.
   * @param {object} target Target object
   * @param {object} d Data object
   * @param {number} i Index number
   * @private
   */
  togglePoint(selected, target, d, i) {
    const method = `${selected ? "" : "un"}selectPoint`;
    this[method](target, d, i);
  },
  /**
   * Select a path
   * @param {object} target Target path
   * @param {object} d Data object
   * @private
   */
  selectPath(target, d) {
    const $$ = this;
    const { config } = $$;
    callFn(config.data_onselected, $$.api, d, target.node());
    if (config.interaction_brighten) {
      target.style("filter", "brightness(1.25)");
    }
  },
  /**
   * Unelect a path
   * @private
   * @param {object} target Target path
   * @param {object} d Data object
   */
  unselectPath(target, d) {
    const $$ = this;
    const { config } = $$;
    callFn(config.data_onunselected, $$.api, d, target.node());
    if (config.interaction_brighten) {
      target.style("filter", null);
    }
  },
  /**
   * Toggles the selection of lines
   * @param {boolean} selected whether or not to select.
   * @param {object} target Target object
   * @param {object} d Data object
   * @param {number} i Index number
   * @private
   */
  togglePath(selected, target, d, i) {
    this[`${selected ? "" : "un"}selectPath`](target, d, i);
  },
  /**
   * Returns the toggle method of the target
   * @param {object} that shape
   * @param {object} d Data object
   * @returns {Function} toggle method
   * @private
   */
  getToggle(that, d) {
    const $$ = this;
    return that.nodeName === "path" ? $$.togglePath : $$.isStepType(d) ? () => {
    } : (
      // circle is hidden in step chart, so treat as within the click area
      $$.togglePoint
    );
  },
  /**
   * Toggles the selection of shapes
   * @param {object} that shape
   * @param {object} d Data object
   * @param {number} i Index number
   * @private
   */
  toggleShape(that, d, i) {
    var _a;
    const $$ = this;
    const { config, $el: { main } } = $$;
    if (config.data_selection_enabled && config.data_selection_isselectable.bind($$.api)(d)) {
      const shape = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(that);
      const isSelected = shape.classed($SELECT.SELECTED);
      const toggle = $$.getToggle(that, d).bind($$);
      let toggledShape;
      if (!config.data_selection_multiple) {
        const focusOnly = (_a = $$.isPointFocusOnly) == null ? void 0 : _a.call($$);
        let selector = `.${focusOnly ? $SELECT.selectedCircles : $SHAPE.shapes}`;
        if (config.data_selection_grouped) {
          selector += $$.getTargetSelectorSuffix(d.id);
        }
        main.selectAll(selector).selectAll(
          focusOnly ? `.${$SELECT.selectedCircle}` : `.${$SHAPE.shape}.${$SELECT.SELECTED}`
        ).classed($SELECT.SELECTED, false).each(function(d2) {
          const shape2 = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
          toggledShape = shape2;
          toggle(false, shape2, d2, d2.index);
        });
      }
      if (!toggledShape || toggledShape.node() !== shape.node()) {
        shape.classed($SELECT.SELECTED, !isSelected);
        toggle(!isSelected, shape, d, i);
      }
    }
  }
}));

;// CONCATENATED MODULE: ./src/config/Options/data/selection.ts
/* harmony default export */ var data_selection = ({
  /**
   * Set data selection enabled<br><br>
   * If this option is set true, we can select the data points and get/set its state of selection by API (e.g. select, unselect, selected).
   *  - **NOTE:** for ESM imports, needs to import 'selection' exports and instantiate it by calling `selection()`.
   *    - `enabled: selection()`
   * @name data․selection․enabled
   * @memberof Options
   * @type {boolean}
   * @default false
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataSelection)
   * @example
   * data: {
   *    selection: {
   *       enabled: true
   *    }
   * }
   * @example
   * // importing ESM
   * import bb, {selection} from "billboard.js";
   *
   * data: {
   *    selection: {
   *       enabled: selection(),
   *       ...
   *    }
   * }
   */
  data_selection_enabled: false,
  /**
   * Set grouped selection enabled.<br><br>
   * If this option set true, multiple data points that have same x value will be selected by one selection.
   * @name data․selection․grouped
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * data: {
   *    selection: {
   *       grouped: true
   *    }
   * }
   */
  data_selection_grouped: false,
  /**
   * Set a callback for each data point to determine if it's selectable or not.<br><br>
   * The callback will receive d as an argument and it has some parameters like id, value, index. This callback should return boolean.
   * @name data․selection․isselectable
   * @memberof Options
   * @type {Function}
   * @default function() { return true; }
   * @example
   * data: {
   *    selection: {
   *       isselectable: function(d) { ... }
   *    }
   * }
   */
  data_selection_isselectable: () => true,
  /**
   * Set multiple data points selection enabled.<br><br>
   * If this option set true, multile data points can have the selected state at the same time. If false set, only one data point can have the selected state and the others will be unselected when the new data point is selected.
   * @name data․selection․multiple
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * data: {
   *    selection: {
   *       multiple: false
   *    }
   * }
   */
  data_selection_multiple: true,
  /**
   * Enable to select data points by dragging.
   * If this option set true, data points can be selected by dragging.
   * - **NOTE:** If this option set true, scrolling on the chart will be disabled because dragging event will handle the event.
   * @name data․selection․draggable
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * data: {
   *    selection: {
   *       draggable: true
   *   }
   * }
   */
  data_selection_draggable: false,
  /**
   * Set a callback for on data selection.
   * @name data․onselected
   * @memberof Options
   * @type {Function}
   * @default function() {}
   * @example
   * data: {
   *     onselected: function(d, element) {
   *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
   *        // element - <circle>
   *        ...
   *    }
   * }
   */
  data_onselected: () => {
  },
  /**
   * Set a callback for on data un-selection.
   * @name data․onunselected
   * @memberof Options
   * @type {Function}
   * @default function() {}
   * @example
   * data: {
   *     onunselected: function(d, element) {
   *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
   *        // element - <circle>
   *        ...
   *    }
   * }
   */
  data_onunselected: () => {
  }
});

;// CONCATENATED MODULE: ./src/config/Options/interaction/subchart.ts
/* harmony default export */ var interaction_subchart = ({
  /**
   * Set subchart options.
   * - **NOTE:** Not supported for `bubble`, `scatter` and non-Axis based(pie, donut, gauge, radar) types.
   * @name subchart
   * @memberof Options
   * @type {object}
   * @property {object} subchart Subchart object
   * @property {boolean} [subchart.show=false] Show sub chart on the bottom of the chart.
   *  - **NOTE:** for ESM imports, needs to import 'subchart' exports and instantiate it by calling `subchart()`.
   *    - `show: subchart()`
   * @property {boolean} [subchart.showHandle=false] Show sub chart's handle.
   * @property {boolean} [subchart.axis.x.show=true] Show or hide x axis.
   * @property {boolean} [subchart.axis.x.tick.show=true] Show or hide x axis tick line.
   * @property {Function|string} [subchart.axis.x.tick.format] Use custom format for x axis ticks - see [axis.x.tick.format](#.axis․x․tick․format) for details.
   * @property {boolean} [subchart.axis.x.tick.text.show=true] Show or hide x axis tick text.
   * @property {Array} [subchart.init.range] Set initial selection domain range.
   * @property {number} [subchart.size.height] Change the height of the subchart.
   * @property {Function} [subchart.onbrush] Set callback for brush event.<br>
   *  Specified function receives the current zoomed x domain.
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Interaction.SubChart)
   * @example
   *  subchart: {
   *      show: true,
   *      showHandle: true,
   *      size: {
   *          height: 20
   *      },
   *      init: {
   *          // specify initial range domain selection
   *          range: [1, 2]
   *      },
   *      axis: {
   *      	x: {
   *      	  show: true,
   *      	    tick: {
   *      	      show: true,
   *      	      format: (x) => d3Format(".1f")(x)
   *      	      text: {
   *      	        show: false
   *      	      }
   *      	    }
   *      	}
   *      },
   *      onbrush: function(domain) { ... }
   *  }
   * @example
   * // importing ESM
   * import bb, {subchart} from "billboard.js";
   *
   * subchart: {
   *      show: subchart(),
   *      ...
   * }
   */
  subchart_show: false,
  subchart_showHandle: false,
  subchart_size_height: 60,
  subchart_axis_x_show: true,
  subchart_axis_x_tick_show: true,
  subchart_axis_x_tick_format: void 0,
  subchart_axis_x_tick_text_show: true,
  subchart_init_range: void 0,
  subchart_onbrush: () => {
  }
});

;// CONCATENATED MODULE: ./src/config/Options/interaction/zoom.ts
/* harmony default export */ var interaction_zoom = ({
  /**
   * Set zoom options
   * @name zoom
   * @memberof Options
   * @type {object}
   * @property {object} zoom Zoom object
   * @property {boolean} [zoom.enabled=false] Enable zooming.
   *  - **NOTE:** for ESM imports, needs to import 'zoom' exports and instantiate it by calling `zoom()`.
   *    - `enabled: zoom()`
   * @property {string} [zoom.type='wheel'] Set zoom interaction type.
   *  - **Available types:**
   *    - wheel
   *    - drag
   * @property {boolean} [zoom.rescale=false] Enable to rescale after zooming.<br>
   *  If true set, y domain will be updated according to the zoomed region.
   * @property {Array} [zoom.extent=[1, 10]] Change zoom extent.
   * @property {number|Date} [zoom.x.min] Set x Axis minimum zoom range
   * @property {number|Date} [zoom.x.max] Set x Axis maximum zoom range
   * @property {Function} [zoom.onzoomstart=undefined] Set callback that is called when zooming starts.<br>
   *  Specified function receives the zoom event.
   * @property {Function} [zoom.onzoom=undefined] Set callback that is called when the chart is zooming.<br>
   *  Specified function receives the zoomed domain.
   * @property {Function} [zoom.onzoomend=undefined] Set callback that is called when zooming ends.<br>
   *  Specified function receives the zoomed domain.
   * @property {boolean|object} [zoom.resetButton=true] Set to display zoom reset button for 'drag' type zoom
   * @property {Function} [zoom.resetButton.onclick] Set callback when clicks the reset button. The callback will receive reset button element reference as argument.
   * @property {string} [zoom.resetButton.text='Reset Zoom'] Text value for zoom reset button.
   * @see [Demo:zoom](https://naver.github.io/billboard.js/demo/#Interaction.Zoom)
   * @see [Demo:drag zoom](https://naver.github.io/billboard.js/demo/#Interaction.DragZoom)
   * @example
   *  zoom: {
   *      enabled: true,
   *      type: "drag",
   *      rescale: true,
   *      extent: [1, 100]  // enable more zooming
   *      x: {
   *          min: -1,  // set min range
   *          max: 10  // set max range
   *      },
   *      onzoomstart: function(event) { ... },
   *      onzoom: function(domain) { ... },
   *      onzoomend: function(domain) { ... },
   *
   *      // show reset button when is zoomed-in
   *      resetButton: true,
   *
   *      resetButton: {
   *          // onclick callback when reset button is clicked
   *          onclick: function(button) {
   *            button; // Reset button element reference
   *            ...
   *          },
   *
   *          // customized text value for reset zoom button
   *          text: "Unzoom"
   *      }
   *  }
   * @example
   * // importing ESM
   * import bb, {zoom} from "billboard.js";
   *
   * zoom: {
   *      enabled: zoom(),
   *      ...
   * }
   */
  zoom_enabled: false,
  zoom_type: "wheel",
  zoom_extent: void 0,
  zoom_privileged: false,
  zoom_rescale: false,
  zoom_onzoom: void 0,
  zoom_onzoomstart: void 0,
  zoom_onzoomend: void 0,
  zoom_resetButton: true,
  zoom_x_min: void 0,
  zoom_x_max: void 0
});

;// CONCATENATED MODULE: ./src/config/resolver/interaction.ts














let selectionModule = () => {
  extend(ChartInternal.prototype, internals_selection);
  extend(Chart.prototype, selection);
  Options.setOptions([data_selection]);
  return (selectionModule = () => true)();
};
let subchartModule = () => {
  extend(ChartInternal.prototype, interactions_subchart);
  extend(Chart.prototype, api_subchart);
  Options.setOptions([interaction_subchart]);
  return (subchartModule = () => true)();
};
let zoomModule = () => {
  extend(ChartInternal.prototype, interactions_zoom);
  extend(Chart.prototype, api_zoom);
  Options.setOptions([interaction_zoom]);
  return (zoomModule = () => true)();
};

;// CONCATENATED MODULE: ./src/Chart/api/axis.ts

function setMinMax($$, type, value) {
  const { config } = $$;
  const helper = (key, value2) => {
    const v = isNumber(value2) ? value2 : value2 === false ? void 0 : null;
    if (v !== null) {
      config[`axis_${key}_${type}`] = v;
    }
  };
  if (isDefined(value)) {
    if (isObjectType(value)) {
      Object.keys(value).forEach((key) => {
        helper(key, value[key]);
      });
    } else if (isNumber(value) || value === false) {
      ["y", "y2"].forEach((key) => {
        helper(key, value);
      });
    }
    $$.redraw({
      withUpdateOrgXDomain: true,
      withUpdateXDomain: true
    });
  }
}
function axis_getMinMax($$, type) {
  const { config } = $$;
  return {
    x: config[`axis_x_${type}`],
    y: config[`axis_y_${type}`],
    y2: config[`axis_y2_${type}`]
  };
}
const axis = {
  /**
   * Get and set axis labels.
   * - **NOTE:** Only applicable for chart types which has x and y axes.
   * @function axis․labels
   * @instance
   * @memberof Chart
   * @param {object} labels specified axis' label to be updated.
   * @param {string} [labels.x] x Axis string
   * @param {string} [labels.y] y Axis string
   * @param {string} [labels.y2] y2 Axis string
   * @returns {object|undefined} axis labels text object
   * @example
   * // Update axis' label
   * chart.axis.labels({
   *   x: "New X Axis Label",
   *   y: "New Y Axis Label",
   *   y2: "New Y2 Axis Label"
   * });
   *
   * chart.axis.labels();
   * // --> {
   * //  x: "New X Axis Label",
   * //  y: "New Y Axis Label",
   * //  y2: "New Y2 Axis Label"
   * // }
   */
  labels: function(labels) {
    const $$ = this.internal;
    let labelText;
    if (labels) {
      Object.keys(labels).forEach((axisId) => {
        $$.axis.setLabelText(axisId, labels[axisId]);
      });
      $$.axis.updateLabels();
    }
    ["x", "y", "y2"].forEach((v) => {
      const text = $$.axis.getLabelText(v);
      if (text) {
        !labelText && (labelText = {});
        labelText[v] = text;
      }
    });
    return labelText;
  },
  /**
   * Get and set axis min value.
   * - **NOTE:** Only applicable for chart types which has x and y axes.
   * @function axis․min
   * @instance
   * @memberof Chart
   * @param {object} min If min is given, specified axis' min value will be updated.<br>
   *   If no argument is given, the min values set on generating option for each axis will be returned.
   *   If not set any min values on generation, it will return `undefined`.<br>
   *   To unset specific axis max, set `false` to each of them.
   * @returns {object|undefined}
   * @example
   * // Update axis' min
   * chart.axis.min({
   *   x: -10,
   *   y: 1000,
   *   y2: 100
   * });
   *
   * // To unset specific axis min, set false to each of them.
   * chart.axis.min({
   *   x: false,
   *   y: false,
   *   y2: false
   * });
   *
   * // shorthand (only affects y and y2 axis)
   * chart.axis.min(-50);
   * chart.axis.min(false);
   */
  min: function(min) {
    const $$ = this.internal;
    return isValue(min) || min === false ? setMinMax($$, "min", min) : axis_getMinMax($$, "min");
  },
  /**
   * Get and set axis max value.
   * - **NOTE:** Only applicable for chart types which has x and y axes.
   * @function axis․max
   * @instance
   * @memberof Chart
   * @param {object} max If max is given, specified axis' max value will be updated.<br>
   *   If no argument is given, the max values set on generating option for each axis will be returned.
   *   If not set any max values on generation, it will return `undefined`.<br>
   *   To unset specific axis max, set `false` to each of them.
   * @returns {object|undefined}
   * @example
   * // Update axis' label
   * chart.axis.max({
   *    x: 100,
   *    y: 1000,
   *    y2: 10000
   * });
   *
   * // To unset specific axis max, set false to each of them.
   * chart.axis.max({
   *   x: false,
   *   y: false,
   *   y2: false
   * });
   *
   * // shorthand (only affects y and y2 axis)
   * chart.axis.max(10);
   * chart.axis.max(false);
   */
  max: function(max) {
    const $$ = this.internal;
    return isValue(max) || max === false ? setMinMax($$, "max", max) : axis_getMinMax($$, "max");
  },
  /**
   * Get and set axis min and max value.
   * - **NOTE:** Only applicable for chart types which has x and y axes.
   * @function axis․range
   * @instance
   * @memberof Chart
   * @param {object} range If range is given, specified axis' min and max value will be updated.
   *   If no argument is given, the current min and max values for each axis will be returned.<br>
   *   To unset specific axis max, set `false` to each of them.
   * @returns {object|undefined}
   * @example
   * // Update axis' label
   * chart.axis.range({
   *   min: {
   *     x: -10,
   *     y: -1000,
   *     y2: -10000
   *   },
   *   max: {
   *     x: 100,
   *     y: 1000,
   *     y2: 10000
   *   },
   * });
   *
   * // To unset specific axis max, set false to each of them.
   * chart.axis.range({
   *   min: {
   *     x: false,
   *     y: false,
   *     y2: false
   *   },
   *   max: {
   *     x: false,
   *     y: false,
   *     y2: false
   *   },
   * });
   *
   * // shorthand (only affects y and y2 axis)
   * chart.axis.range({ min: -50, max: 1000 });
   * chart.axis.range({ min: false, max: false });
   */
  range: function(range) {
    const { axis: axis2 } = this;
    if (arguments.length) {
      const { min, max } = range;
      isDefined(max) && axis2.max(max);
      isDefined(min) && axis2.min(min);
    } else {
      return {
        max: axis2.max(),
        min: axis2.min()
      };
    }
    return void 0;
  }
};
/* harmony default export */ var api_axis = ({ axis });

;// CONCATENATED MODULE: ./src/Chart/api/category.ts

/* harmony default export */ var api_category = ({
  /**
   * Set specified category name on category axis.
   * @function category
   * @instance
   * @memberof Chart
   * @param {number} i index of category to be changed
   * @param {string} category category value to be changed
   * @returns {string}
   * @example
   * chart.category(2, "Category 3");
   */
  category(i, category) {
    const $$ = this.internal;
    const { config } = $$;
    if (arguments.length > 1) {
      config.axis_x_categories[i] = category;
      $$.redraw();
    }
    return config.axis_x_categories[i];
  },
  /**
   * Set or get category names on category axis.
   * @function categories
   * @instance
   * @memberof Chart
   * @param {Array} categories This must be an array that includes category names in string. If category names are included in the date by data.x option, this is not required.
   * @returns {Array}
   * @example
   * chart.categories([
   *      "Category 1", "Category 2", ...
   * ]);
   */
  categories(categories) {
    const $$ = this.internal;
    const { config } = $$;
    if (!categories || !Array.isArray(categories)) {
      const cat = config.axis_x_categories;
      return isEmpty(cat) ? Object.values($$.data.xs)[0] : cat;
    }
    config.axis_x_categories = categories;
    $$.redraw();
    return config.axis_x_categories;
  }
});

;// CONCATENATED MODULE: ./src/Chart/api/flow.ts

/* harmony default export */ var flow = ({
  /**
   * Flow data to the chart.<br><br>
   * By this API, you can append new data points to the chart.
   * @function flow
   * @instance
   * @memberof Chart
   * @param {object} args The object can consist with following members:<br>
   *
   *    | Key | Type | Description |
   *    | --- | --- | --- |
   *    | json | Object | Data as JSON format (@see [data․json](Options.html#.data%25E2%2580%25A4json)) |
   *    | rows | Array | Data in array as row format (@see [data․rows](Options.html#.data%25E2%2580%25A4json)) |
   *    | columns | Array | Data in array as column format (@see [data․columns](Options.html#.data%25E2%2580%25A4columns)) |
   *    | to | String | The lower x edge will move to that point. If not given, the lower x edge will move by the number of given data points |
   *    | length | Number | The lower x edge will move by the number of this argument |
   *    | duration | Number | The duration of the transition will be specified value. If not given, transition.duration will be used as default |
   *    | done | Function | The specified function will be called when flow ends |
   *
   * - **NOTE:**
   *   - If json, rows and columns given, the data will be loaded.
   *   - If data that has the same target id is given, the chart will be appended.
   *   - Otherwise, new target will be added. One of these is required when calling.
   *   - If json specified, keys is required as well as data.json.
   * 	 - If tab isn't visible(by evaluating `document.hidden`), will not be executed to prevent unnecessary work.
   * @example
   * // 2 data points will be apprended to the tail and popped from the head.
   * // After that, 4 data points will be appended and no data points will be poppoed.
   * chart.flow({
   *  columns: [
   *    ["x", "2018-01-11", "2018-01-21"],
   *    ["data1", 500, 200],
   *    ["data2", 100, 300],
   *    ["data3", 200, 120]
   *  ],
   *  to: "2013-01-11",
   *  done: function () {
   *    chart.flow({
   *      columns: [
   *        ["x", "2018-02-11", "2018-02-12", "2018-02-13", "2018-02-14"],
   *        ["data1", 200, 300, 100, 250],
   *        ["data2", 100, 90, 40, 120],
   *        ["data3", 100, 100, 300, 500]
   *      ],
   *      length: 2,
   *      duration: 1500
   *    });
   *  }
   * });
   */
  flow(args) {
    const $$ = this.internal;
    let data;
    if (args.json || args.rows || args.columns) {
      $$.convertData(args, (res) => {
        data = res;
        _();
      });
    }
    function _() {
      let domain;
      let length = 0;
      let tail = 0;
      let diff;
      let to;
      if ($$.state.redrawing || !data || !isTabVisible()) {
        return;
      }
      const notfoundIds = [];
      const orgDataCount = $$.getMaxDataCount();
      const targets = $$.convertDataToTargets(data, true);
      const isTimeSeries = $$.axis.isTimeSeries();
      $$.data.targets.forEach((t) => {
        let found = false;
        for (let i = 0; i < targets.length; i++) {
          if (t.id === targets[i].id) {
            found = true;
            if (t.values[t.values.length - 1]) {
              tail = t.values[t.values.length - 1].index + 1;
            }
            length = targets[i].values.length;
            for (let j = 0; j < length; j++) {
              targets[i].values[j].index = tail + j;
              if (!isTimeSeries) {
                targets[i].values[j].x = tail + j;
              }
            }
            t.values = t.values.concat(targets[i].values);
            targets.splice(i, 1);
            break;
          }
        }
        !found && notfoundIds.push(t.id);
      });
      $$.data.targets.forEach((t) => {
        for (let i = 0; i < notfoundIds.length; i++) {
          if (t.id === notfoundIds[i]) {
            tail = t.values[t.values.length - 1].index + 1;
            for (let j = 0; j < length; j++) {
              t.values.push({
                id: t.id,
                index: tail + j,
                x: isTimeSeries ? $$.getOtherTargetX(tail + j) : tail + j,
                value: null
              });
            }
          }
        }
      });
      if ($$.data.targets.length) {
        targets.forEach((t) => {
          const missing = [];
          for (let i = $$.data.targets[0].values[0].index; i < tail; i++) {
            missing.push({
              id: t.id,
              index: i,
              x: isTimeSeries ? $$.getOtherTargetX(i) : i,
              value: null
            });
          }
          t.values.forEach((v) => {
            v.index += tail;
            if (!isTimeSeries) {
              v.x += tail;
            }
          });
          t.values = missing.concat(t.values);
        });
      }
      $$.data.targets = $$.data.targets.concat(targets);
      const baseTarget = $$.data.targets[0];
      const baseValue = baseTarget.values[0];
      if (isDefined(args.to)) {
        length = 0;
        to = isTimeSeries ? parseDate.call($$, args.to) : args.to;
        baseTarget.values.forEach((v) => {
          v.x < to && length++;
        });
      } else if (isDefined(args.length)) {
        length = args.length;
      }
      if (!orgDataCount) {
        if (isTimeSeries) {
          diff = baseTarget.values.length > 1 ? baseTarget.values[baseTarget.values.length - 1].x - baseValue.x : baseValue.x - $$.getXDomain($$.data.targets)[0];
        } else {
          diff = 1;
        }
        domain = [baseValue.x - diff, baseValue.x];
      } else if (orgDataCount === 1 && isTimeSeries) {
        diff = (baseTarget.values[baseTarget.values.length - 1].x - baseValue.x) / 2;
        domain = [new Date(+baseValue.x - diff), new Date(+baseValue.x + diff)];
      }
      domain && $$.updateXDomain(null, true, true, false, domain);
      $$.updateTargets($$.data.targets);
      $$.redraw({
        flow: {
          index: baseValue.index,
          length,
          duration: isValue(args.duration) ? args.duration : $$.config.transition_duration,
          done: args.done,
          orgDataCount
        },
        withLegend: true,
        withTransition: orgDataCount > 1,
        withTrimXDomain: false,
        withUpdateXAxis: true
      });
    }
  }
});

;// CONCATENATED MODULE: ./src/Chart/api/grid.ts

function grid(grids, axisId) {
  const $$ = this.internal;
  const { config } = $$;
  const withTransition = config.transition_duration && isTabVisible();
  const gridPropLines = `grid_${axisId}_lines`;
  if (!grids) {
    return config[gridPropLines];
  }
  config[gridPropLines] = grids;
  $$.updateGrid();
  $$.redrawGrid(withTransition);
  return config[gridPropLines];
}
function add(grids, axisId) {
  const gridPropLines = `grid_${axisId}_lines`;
  return grid.bind(this)(
    this.internal.config[gridPropLines].concat(grids || []),
    axisId
  );
}
function remove(grids, isXAxis) {
  this.internal.removeGridLines(grids, isXAxis);
}
const xgrids = function(grids) {
  return grid.bind(this)(grids, "x");
};
extend(xgrids, {
  /**
   * Add x grid lines.<br>
   * This API adds new x grid lines instead of replacing like xgrids.
   * @function xgrids․add
   * @instance
   * @memberof Chart
   * @param {Array|object} grids New x grid lines will be added. The format of this argument is the same as grid.x.lines and it's possible to give an Object if only one line will be added.
   * @returns {Array}
   * @example
   *  // Add a new x grid line
   * chart.xgrids.add(
   *   {value: 4, text: "Label 4"}
   * );
   *
   * // Add new x grid lines
   * chart.xgrids.add([
   *   {value: 2, text: "Label 2"},
   *   {value: 4, text: "Label 4"}
   * ]);
   */
  add(grids) {
    return add.bind(this)(grids, "x");
  },
  /**
   * Remove x grid lines.<br>
   * This API removes x grid lines.
   * @function xgrids․remove
   * @instance
   * @memberof Chart
   * @param {object} grids This argument should include value or class. If value is given, the x grid lines that have specified x value will be removed. If class is given, the x grid lines that have specified class will be removed. If args is not given, all of x grid lines will be removed.
   * @param {number} [grids.value] target value
   * @param {string} [grids.class] target class
   * @returns {void}
   * @example
   * // x grid line on x = 2 will be removed
   * chart.xgrids.remove({value: 2});
   *
   * // x grid lines that have 'grid-A' will be removed
   * chart.xgrids.remove({
   *   class: "grid-A"
   * });
   *
   * // all of x grid lines will be removed
   * chart.xgrids.remove();
   */
  remove(grids) {
    return remove.bind(this)(grids, true);
  }
});
const ygrids = function(grids) {
  return grid.bind(this)(grids, "y");
};
extend(ygrids, {
  /**
   * Add y grid lines.<br>
   * This API adds new y grid lines instead of replacing like ygrids.
   * @function ygrids․add
   * @instance
   * @memberof Chart
   * @param {Array|object} grids New y grid lines will be added. The format of this argument is the same as grid.y.lines and it's possible to give an Object if only one line will be added.
   * @returns {object}
   * @example
   *  // Add a new x grid line
   * chart.ygrids.add(
   *   {value: 400, text: "Label 4"}
   * );
   *
   * // Add new x grid lines
   * chart.ygrids.add([
   *   {value: 200, text: "Label 2"},
   *   {value: 400, text: "Label 4"}
   * ]);
   */
  add(grids) {
    return add.bind(this)(grids, "y");
  },
  /**
   * Remove y grid lines.<br>
   * This API removes x grid lines.
   * @function ygrids․remove
   * @instance
   * @memberof Chart
   * @param {object} grids This argument should include value or class. If value is given, the y grid lines that have specified y value will be removed. If class is given, the y grid lines that have specified class will be removed. If args is not given, all of y grid lines will be removed.
   * @param {number} [grids.value] target value
   * @param {string} [grids.class] target class
   * @returns {void}
   * @example
   * // y grid line on y = 200 will be removed
   * chart.ygrids.remove({value: 200});
   *
   * // y grid lines that have 'grid-A' will be removed
   * chart.ygrids.remove({
   *   class: "grid-A"
   * });
   *
   * // all of y grid lines will be removed
   * chart.ygrids.remove();
   */
  remove(grids) {
    return remove.bind(this)(grids, false);
  }
});
/* harmony default export */ var api_grid = ({ xgrids, ygrids });

;// CONCATENATED MODULE: ./src/Chart/api/group.ts

/* harmony default export */ var group = ({
  /**
   * Update groups for the targets.
   * @function groups
   * @instance
   * @memberof Chart
   * @param {Array} groups This argument needs to be an Array that includes one or more Array that includes target ids to be grouped.
   * @returns {Array} Grouped data names array
   * @example
   *  // data1 and data2 will be a new group.
   *  chart.groups([
   *     ["data1", "data2"]
   *  ]);
   */
  groups(groups) {
    const $$ = this.internal;
    const { config } = $$;
    if (isUndefined(groups)) {
      return config.data_groups;
    }
    config.data_groups = groups;
    $$.redraw();
    return config.data_groups;
  }
});

;// CONCATENATED MODULE: ./src/Chart/api/regions.ts


function regionsFn(regions2, isAdd = false) {
  const $$ = this.internal;
  const { config } = $$;
  const withTransition = config.transition_duration && isTabVisible();
  if (!regions2) {
    return config.regions;
  }
  config.regions = isAdd ? config.regions.concat(regions2) : regions2;
  $$.updateRegion();
  $$.redrawRegion(withTransition);
  return isAdd ? config.regions : regions2;
}
const regions = function(regions2) {
  return regionsFn.bind(this)(regions2);
};
extend(regions, {
  /**
   * Add new region.<br><br>
   * This API adds new region instead of replacing like regions.
   * @function regions․add
   * @instance
   * @memberof Chart
   * @param {Array|object} regions New region will be added. The format of this argument is the same as regions and it's possible to give an Object if only one region will be added.
   * @returns {Array} regions
   * @example
   * // Add a new region
   * chart.regions.add(
   *    {
   *      axis: "x", start: 5, class: "regionX",
   *      label: {
   *      	text: "Region Text",
   *      	color: "red"  // color string
   *      }
   *    }
   * );
   *
   * // Add new regions
   * chart.regions.add([
   *    {axis: "x", start: 5, class: "regionX"},
   *    {
   *      axis: "y", end: 50, class: "regionY",
   *      label: {
   *      	text: "Region Text",
   *      	x: 5,  // position relative of the initial x coordinate
   *      	y: 5,  // position relative of the initial y coordinate
   *      	color: "red",  // color string
   *      	rotated: true  // make text to show in vertical or horizontal
   *      }
   *    }
   * ]);
   */
  add: function(regions2) {
    return regionsFn.bind(this)(regions2, true);
  },
  /**
   * Remove regions.<br><br>
   * This API removes regions.
   * @function regions․remove
   * @instance
   * @memberof Chart
   * @param {object} optionsValue This argument should include classes. If classes is given, the regions that have one of the specified classes will be removed. If args is not given, all of regions will be removed.
   * @returns {Array} regions Removed regions
   * @example
   * // regions that have 'region-A' or 'region-B' will be removed.
   * chart.regions.remove({
   *   classes: [
   *     "region-A", "region-B"
   *   ]
   * });
   *
   * // all of regions will be removed.
   * chart.regions.remove();
   */
  remove: function(optionsValue) {
    const $$ = this.internal;
    const { config, $T } = $$;
    const options = optionsValue || {};
    const classes = getOption(options, "classes", [$REGION.region]);
    let regions2 = $$.$el.main.select(`.${$REGION.regions}`).selectAll(classes.map((c) => `.${c}`));
    $T(regions2).style("opacity", "0").remove();
    regions2 = config.regions;
    if (Object.keys(options).length) {
      regions2 = regions2.filter((region) => {
        let found = false;
        if (!region.class) {
          return true;
        }
        region.class.split(" ").forEach((c) => {
          if (classes.indexOf(c) >= 0) {
            found = true;
          }
        });
        return !found;
      });
      config.regions = regions2;
    } else {
      config.regions = [];
    }
    return regions2;
  }
});
/* harmony default export */ var api_regions = ({ regions });

;// CONCATENATED MODULE: ./src/Chart/api/x.ts

/* harmony default export */ var x = ({
  /**
   * Get and set x values for the chart.
   * @function x
   * @instance
   * @memberof Chart
   * @param {Array} x If x is given, x values of every target will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
   * @returns {object} xs
   * @example
   *  // Get current x values
   *  chart.x();
   *
   *  // Update x values for all targets
   *  chart.x([100, 200, 300, 400, ...]);
   */
  x(x) {
    const $$ = this.internal;
    const { axis, data } = $$;
    const isCategorized = axis.isCustomX() && axis.isCategorized();
    if (isArray(x)) {
      if (isCategorized) {
        this.categories(x);
      } else {
        $$.updateTargetX(data.targets, x);
        $$.redraw({
          withUpdateOrgXDomain: true,
          withUpdateXDomain: true
        });
      }
    }
    return isCategorized ? this.categories() : data.xs;
  },
  /**
   * Get and set x values for the chart.
   * @function xs
   * @instance
   * @memberof Chart
   * @param {Array} xs If xs is given, specified target's x values will be updated. If no argument is given, current x values will be returned as an Object whose keys are the target ids.
   * @returns {object} xs
   * @example
   *  // Get current x values
   *  chart.xs();
   *
   *  // Update x values for all targets
   *  chart.xs({
   *    data1: [10, 20, 30, 40, ...],
   *    data2: [100, 200, 300, 400, ...]
   *  });
   */
  xs(xs) {
    const $$ = this.internal;
    if (isObject(xs)) {
      $$.updateTargetXs($$.data.targets, xs);
      $$.redraw({
        withUpdateOrgXDomain: true,
        withUpdateXDomain: true
      });
    }
    return $$.data.xs;
  }
});

// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(11);
;// CONCATENATED MODULE: ./src/ChartInternal/Axis/AxisRendererHelper.ts
var AxisRendererHelper_defProp = Object.defineProperty;
var AxisRendererHelper_defNormalProp = (obj, key, value) => key in obj ? AxisRendererHelper_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var AxisRendererHelper_publicField = (obj, key, value) => AxisRendererHelper_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);


class AxisRendererHelper {
  constructor(owner) {
    AxisRendererHelper_publicField(this, "owner");
    AxisRendererHelper_publicField(this, "config");
    AxisRendererHelper_publicField(this, "scale");
    const scale = getScale();
    const { config, params } = owner;
    this.owner = owner;
    this.config = config;
    this.scale = scale;
    if (config.noTransition || !params.config.transition_duration) {
      config.withoutTransition = true;
    }
    config.range = this.scaleExtent((params.orgXScale || scale).range());
  }
  /**
   * Compute a character dimension
   * @param {d3.selection} node <g class=tick> node
   * @returns {{w: number, h: number}}
   * @private
   */
  static getSizeFor1Char(node) {
    const size = {
      w: 5.5,
      h: 11.5
    };
    !node.empty() && node.select("text").text("0").call((el) => {
      try {
        const { width, height } = el.node().getBBox();
        if (width && height) {
          size.w = width;
          size.h = height;
        }
      } finally {
        el.text("");
      }
    });
    this.getSizeFor1Char = () => size;
    return size;
  }
  /**
   * Get tick transform setter function
   * @param {string} id Axis id
   * @returns {Function} transfrom setter function
   * @private
   */
  getTickTransformSetter(id) {
    const { config } = this;
    const fn = id === "x" ? (value) => `translate(${value + config.tickOffset},0)` : (value) => `translate(0,${value})`;
    return (selection, scale) => {
      selection.attr("transform", (d) => isValue(d) ? fn(Math.ceil(scale(d))) : null);
    };
  }
  scaleExtent(domain) {
    const start = domain[0];
    const stop = domain[domain.length - 1];
    return start < stop ? [start, stop] : [stop, start];
  }
  generateTicks(scale, isYAxes) {
    const { tickStepSize } = this.owner.params;
    const [start, end] = scale.domain();
    let ticks = [];
    if (isYAxes && tickStepSize) {
      let interval = Math.round(start);
      while (interval <= end) {
        ticks.push(interval);
        interval += tickStepSize;
      }
    } else if (scale.ticks) {
      const { tickArguments } = this.config;
      if (scale.type === "log" && !tickArguments) {
        const s = getScale("_log").domain([start > 0 ? start : 1, end]).range(scale.range());
        ticks = s.ticks();
        for (let cnt = end.toFixed().length; ticks.length > 15; cnt--) {
          ticks = s.ticks(cnt);
        }
        ticks.splice(0, 1, start);
        ticks.splice(ticks.length - 1, 1, end);
      } else {
        ticks = scale.ticks(...this.config.tickArguments || []);
      }
      ticks = ticks.map((v) => {
        const r = isString(v) && isNumber(v) && !isNaN(v) && Math.round(v * 10) / 10 || v;
        return r;
      });
    }
    return ticks;
  }
  copyScale() {
    const newScale = this.scale.copy();
    if (!newScale.domain().length) {
      newScale.domain(this.scale.domain());
    }
    newScale.type = this.scale.type;
    return newScale;
  }
  textFormatted(v) {
    const tickFormat = this.config.tickFormat;
    const value = /\d+\.\d+0{5,}\d$/.test(v) ? +String(v).replace(/0+\d$/, "") : v;
    const formatted = tickFormat ? tickFormat(value) : value;
    return isDefined(formatted) ? formatted : "";
  }
  transitionise(selection) {
    const { config } = this;
    let transitionSelection = selection;
    if (config.withoutTransition) {
      transitionSelection = selection.interrupt();
    } else if (config.transition || !this.owner.params.noTransition) {
      try {
        transitionSelection = selection.transition(config.transition);
      } catch (e) {
      }
    }
    return transitionSelection;
  }
}

;// CONCATENATED MODULE: ./src/ChartInternal/Axis/AxisRenderer.ts
var AxisRenderer_defProp = Object.defineProperty;
var AxisRenderer_defNormalProp = (obj, key, value) => key in obj ? AxisRenderer_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var AxisRenderer_publicField = (obj, key, value) => AxisRenderer_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);



class AxisRenderer {
  constructor(params = {}) {
    AxisRenderer_publicField(this, "helper");
    AxisRenderer_publicField(this, "config");
    AxisRenderer_publicField(this, "params");
    AxisRenderer_publicField(this, "g");
    AxisRenderer_publicField(this, "generatedTicks");
    const config = {
      innerTickSize: 6,
      outerTickSize: params.outerTick ? 6 : 0,
      orient: "bottom",
      range: [],
      tickArguments: null,
      tickCentered: null,
      tickCulling: true,
      tickFormat: null,
      tickLength: 9,
      tickOffset: 0,
      tickPadding: 3,
      tickValues: null,
      transition: null,
      noTransition: params.noTransition
    };
    config.tickLength = Math.max(config.innerTickSize, 0) + config.tickPadding;
    this.config = config;
    this.params = params;
    this.helper = new AxisRendererHelper(this);
  }
  /**
   * Create axis element
   * @param {d3.selection} g Axis selection
   * @private
   */
  create(g) {
    const ctx = this;
    const { config, helper, params } = ctx;
    const { scale } = helper;
    const { orient } = config;
    const splitTickText = this.splitTickText.bind(ctx);
    const isLeftRight = /^(left|right)$/.test(orient);
    const isTopBottom = /^(top|bottom)$/.test(orient);
    const tickTransform = helper.getTickTransformSetter(isTopBottom ? "x" : "y");
    const axisPx = tickTransform === helper.axisX ? "y" : "x";
    const sign = /^(top|left)$/.test(orient) ? -1 : 1;
    const rotate = params.tickTextRotate;
    this.config.range = scale.rangeExtent ? scale.rangeExtent() : helper.scaleExtent((params.orgXScale || scale).range());
    const { innerTickSize, tickLength, range } = config;
    const id = params.id;
    const tickTextPos = id && /^(x|y|y2)$/.test(id) ? params.config[`axis_${id}_tick_text_position`] : { x: 0, y: 0 };
    const prefix = id === "subX" ? `subchart_axis_x` : `axis_${id}`;
    const axisShow = params.config[`${prefix}_show`];
    const tickShow = {
      tick: axisShow ? params.config[`${prefix}_tick_show`] : false,
      text: axisShow ? params.config[`${prefix}_tick_text_show`] : false
    };
    let $g;
    g.each(function() {
      const g2 = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      let scale0 = this.__chart__ || scale;
      let scale1 = helper.copyScale();
      $g = g2;
      this.__chart__ = scale1;
      config.tickOffset = params.isCategory ? Math.ceil((scale1(1) - scale1(0)) / 2) : 0;
      const path = g2.selectAll(".domain").data([0]);
      path.enter().append("path").attr("class", "domain").merge(path).attr("d", () => {
        const outerTickSized = config.outerTickSize * sign;
        return isTopBottom ? `M${range[0]},${outerTickSized}V0H${range[1]}V${outerTickSized}` : `M${outerTickSized},${range[0]}H0V${range[1]}H${outerTickSized}`;
      });
      if (tickShow.tick || tickShow.text) {
        const ticks = config.tickValues || helper.generateTicks(scale1, isLeftRight);
        ctx.generatedTicks = ticks;
        let tick = g2.selectAll(".tick").data(ticks, scale1);
        const tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick");
        const tickExit = tick.exit().remove();
        tick = tickEnter.merge(tick);
        tickShow.tick && tickEnter.append("line");
        tickShow.text && tickEnter.append("text");
        const sizeFor1Char = AxisRendererHelper.getSizeFor1Char(tick);
        const counts = [];
        let tspan = tick.select("text").selectAll("tspan").data((d, index) => {
          const split = params.tickMultiline ? splitTickText(d, scale1, ticks, isLeftRight, sizeFor1Char.w) : isArray(helper.textFormatted(d)) ? helper.textFormatted(d).concat() : [helper.textFormatted(d)];
          counts[index] = split.length;
          return split.map((splitted) => ({ index, splitted }));
        });
        tspan.exit().remove();
        tspan = tspan.enter().append("tspan").merge(tspan).text((d) => d.splitted);
        tspan.attr("x", isTopBottom ? 0 : tickLength * sign).attr("dx", (() => {
          let dx = 0;
          if (/(top|bottom)/.test(orient) && rotate) {
            dx = 8 * Math.sin(Math.PI * (rotate / 180)) * (orient === "top" ? -1 : 1);
          }
          return dx + (tickTextPos.x || 0);
        })()).attr("dy", (d, i) => {
          const defValue = ".71em";
          let dy = 0;
          if (orient !== "top") {
            dy = sizeFor1Char.h;
            if (i === 0) {
              dy = isLeftRight ? -((counts[d.index] - 1) * (sizeFor1Char.h / 2) - 3) : tickTextPos.y === 0 ? defValue : 0;
            }
          }
          return isNumber(dy) && tickTextPos.y ? dy + tickTextPos.y : dy || defValue;
        });
        const lineUpdate = tick.select("line");
        const textUpdate = tick.select("text");
        tickEnter.select("line").attr(`${axisPx}2`, innerTickSize * sign);
        tickEnter.select("text").attr(axisPx, tickLength * sign);
        ctx.setTickLineTextPosition(lineUpdate, textUpdate);
        if (params.tickTitle) {
          const title = textUpdate.select("title");
          (title.empty() ? textUpdate.append("title") : title).text((index) => params.tickTitle[index]);
        }
        if (scale1.bandwidth) {
          const x = scale1;
          const dx = x.bandwidth() / 2;
          scale0 = (d) => x(d) + dx;
          scale1 = scale0;
        } else if (scale0.bandwidth) {
          scale0 = scale1;
        } else {
          tickTransform(tickExit, scale1);
        }
        tick = params.owner.state.flowing ? helper.transitionise(tick) : params.owner.$T(tick);
        tickTransform(tickEnter, scale0);
        tickTransform(tick.style("opacity", null), scale1);
      }
    });
    this.g = $g;
  }
  /**
   * Get generated ticks
   * @param {number} count Count of ticks
   * @returns {Array} Generated ticks
   * @private
   */
  getGeneratedTicks(count) {
    var _a;
    const len = ((_a = this.generatedTicks) == null ? void 0 : _a.length) - 1;
    let res = this.generatedTicks;
    if (len > count) {
      const interval = Math.round(len / count + 0.1);
      res = this.generatedTicks.map((v, i) => i % interval === 0 ? v : null).filter((v) => v !== null).splice(0, count);
    }
    return res;
  }
  /**
   * Get tick x/y coordinate
   * @returns {{x: number, y: number}}
   * @private
   */
  getTickXY() {
    const { config } = this;
    const pos = { x: 0, y: 0 };
    if (this.params.isCategory) {
      pos.x = config.tickCentered ? 0 : config.tickOffset;
      pos.y = config.tickCentered ? config.tickOffset : 0;
    }
    return pos;
  }
  /**
   * Get tick size
   * @param {object} d data object
   * @returns {number}
   * @private
   */
  getTickSize(d) {
    const { scale } = this.helper;
    const { config } = this;
    const { innerTickSize, range } = config;
    const tickPosition = scale(d) + (config.tickCentered ? 0 : config.tickOffset);
    return range[0] < tickPosition && tickPosition < range[1] ? innerTickSize : 0;
  }
  /**
   * Set tick's line & text position
   * @param {d3.selection} lineUpdate Line selection
   * @param {d3.selection} textUpdate Text selection
   * @private
   */
  setTickLineTextPosition(lineUpdate, textUpdate) {
    const tickPos = this.getTickXY();
    const { innerTickSize, orient, tickLength, tickOffset } = this.config;
    const rotate = this.params.tickTextRotate;
    const textAnchorForText = (r) => {
      const value = ["start", "end"];
      orient === "top" && value.reverse();
      return !r ? "middle" : value[r > 0 ? 0 : 1];
    };
    const textTransform = (r) => r ? `rotate(${r})` : null;
    const yForText = (r) => {
      const r2 = r / (orient === "bottom" ? 15 : 23);
      return r ? 11.5 - 2.5 * r2 * (r > 0 ? 1 : -1) : tickLength;
    };
    const {
      config: {
        axis_rotated: isRotated,
        axis_x_tick_text_inner: inner
      }
    } = this.params.owner;
    switch (orient) {
      case "bottom":
        lineUpdate.attr("x1", tickPos.x).attr("x2", tickPos.x).attr("y2", this.getTickSize.bind(this));
        textUpdate.attr("x", 0).attr("y", yForText(rotate)).style("text-anchor", textAnchorForText(rotate)).style("text-anchor", (d, i, { length }) => {
          if (!isRotated && i === 0 && (inner === true || inner.first)) {
            return "start";
          } else if (!isRotated && i === length - 1 && (inner === true || inner.last)) {
            return "end";
          }
          return textAnchorForText(rotate);
        }).attr("transform", textTransform(rotate));
        break;
      case "top":
        lineUpdate.attr("x2", 0).attr("y2", -innerTickSize);
        textUpdate.attr("x", 0).attr("y", -yForText(rotate) * 2).style("text-anchor", textAnchorForText(rotate)).attr("transform", textTransform(rotate));
        break;
      case "left":
        lineUpdate.attr("x2", -innerTickSize).attr("y1", tickPos.y).attr("y2", tickPos.y);
        textUpdate.attr("x", -tickLength).attr("y", tickOffset).style("text-anchor", "end");
        break;
      case "right":
        lineUpdate.attr("x2", innerTickSize).attr("y2", 0);
        textUpdate.attr("x", tickLength).attr("y", 0).style("text-anchor", "start");
    }
  }
  // this should be called only when category axis
  splitTickText(d, scale, ticks, isLeftRight, charWidth) {
    const { params } = this;
    const tickText = this.helper.textFormatted(d);
    const splitted = isString(tickText) && tickText.indexOf("\n") > -1 ? tickText.split("\n") : [];
    if (splitted.length) {
      return splitted;
    }
    if (isArray(tickText)) {
      return tickText;
    }
    let tickWidth = params.tickWidth;
    if (!tickWidth || tickWidth <= 0) {
      tickWidth = isLeftRight ? 95 : params.isCategory ? Math.ceil(
        params.isInverted ? scale(ticks[0]) - scale(ticks[1]) : scale(ticks[1]) - scale(ticks[0])
      ) - 12 : 110;
    }
    function split(splitted2, text) {
      let subtext;
      let spaceIndex;
      let textWidth;
      for (let i = 1; i < text.length; i++) {
        if (text.charAt(i) === " ") {
          spaceIndex = i;
        }
        subtext = text.substr(0, i + 1);
        textWidth = charWidth * subtext.length;
        if (tickWidth < textWidth) {
          return split(
            splitted2.concat(text.substr(0, spaceIndex || i)),
            text.slice(spaceIndex ? spaceIndex + 1 : i)
          );
        }
      }
      return splitted2.concat(text);
    }
    return split(splitted, String(tickText));
  }
  scale(x) {
    if (!arguments.length) {
      return this.helper.scale;
    }
    this.helper.scale = x;
    return this;
  }
  orient(x) {
    if (!arguments.length) {
      return this.config.orient;
    }
    this.config.orient = x in {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1
    } ? String(x) : "bottom";
    return this;
  }
  tickFormat(format) {
    const { config } = this;
    if (!arguments.length) {
      return config.tickFormat;
    }
    config.tickFormat = format;
    return this;
  }
  tickCentered(isCentered) {
    const { config } = this;
    if (!arguments.length) {
      return config.tickCentered;
    }
    config.tickCentered = isCentered;
    return this;
  }
  /**
   * Return tick's offset value.
   * The value will be set for 'category' axis type.
   * @returns {number}
   * @private
   */
  tickOffset() {
    return this.config.tickOffset;
  }
  /**
   * Get tick interval count
   * @private
   * @param {number} size Total data size
   * @returns {number}
   */
  tickInterval(size) {
    var _a;
    const { outerTickSize, tickOffset, tickValues } = this.config;
    let interval;
    if (this.params.isCategory) {
      interval = tickOffset * 2;
    } else {
      const scale = (_a = this.params.owner.scale.zoom) != null ? _a : this.helper.scale;
      const length = this.g.select("path.domain").node().getTotalLength() - outerTickSize * 2;
      interval = length / (size || this.g.selectAll("line").size());
      const intervalByValue = tickValues ? tickValues.map((v, i, arr) => {
        const next = i + 1;
        return next < arr.length ? scale(arr[next]) - scale(v) : null;
      }).filter(Boolean) : [];
      interval = Math.min(...intervalByValue, interval);
    }
    return interval === Infinity ? 0 : interval;
  }
  ticks(...args) {
    const { config } = this;
    if (!args.length) {
      return config.tickArguments;
    }
    config.tickArguments = toArray(args);
    return this;
  }
  tickCulling(culling) {
    const { config } = this;
    if (!arguments.length) {
      return config.tickCulling;
    }
    config.tickCulling = culling;
    return this;
  }
  tickValues(x) {
    const { config } = this;
    if (isFunction(x)) {
      config.tickValues = () => x(this.helper.scale.domain());
    } else {
      if (!arguments.length) {
        return config.tickValues;
      }
      config.tickValues = x;
    }
    return this;
  }
  setTransition(t) {
    this.config.transition = t;
    return this;
  }
}

;// CONCATENATED MODULE: ./src/ChartInternal/Axis/Axis.ts
var Axis_defProp = Object.defineProperty;
var Axis_defNormalProp = (obj, key, value) => key in obj ? Axis_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var Axis_publicField = (obj, key, value) => Axis_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);





/* harmony default export */ var Axis = ({
  getAxisInstance: function() {
    return this.axis || new Axis_Axis(this);
  }
});
class Axis_Axis {
  constructor(owner) {
    Axis_publicField(this, "owner");
    Axis_publicField(this, "x");
    Axis_publicField(this, "subX");
    Axis_publicField(this, "y");
    Axis_publicField(this, "y2");
    Axis_publicField(this, "axesList", {});
    Axis_publicField(this, "tick", {
      x: null,
      y: null,
      y2: null
    });
    Axis_publicField(this, "xs", []);
    Axis_publicField(this, "orient", {
      x: "bottom",
      y: "left",
      y2: "right",
      subX: "bottom"
    });
    this.owner = owner;
    this.setOrient();
  }
  getAxisClassName(id) {
    return `${$AXIS.axis} ${$AXIS[`axis${capitalize(id)}`]}`;
  }
  isHorizontal($$, forHorizontal) {
    const isRotated = $$.config.axis_rotated;
    return forHorizontal ? isRotated : !isRotated;
  }
  isCategorized() {
    const { config, state } = this.owner;
    return config.axis_x_type.indexOf("category") >= 0 || state.hasRadar;
  }
  isCustomX() {
    const { config } = this.owner;
    return !this.isTimeSeries() && (config.data_x || notEmpty(config.data_xs));
  }
  isTimeSeries(id = "x") {
    return this.owner.config[`axis_${id}_type`] === "timeseries";
  }
  isLog(id = "x") {
    return this.owner.config[`axis_${id}_type`] === "log";
  }
  isTimeSeriesY() {
    return this.isTimeSeries("y");
  }
  getAxisType(id = "x") {
    let type = "linear";
    if (this.isTimeSeries(id)) {
      type = this.owner.config.axis_x_localtime ? "time" : "utc";
    } else if (this.isLog(id)) {
      type = "log";
    }
    return type;
  }
  init() {
    const $$ = this.owner;
    const { config, $el: { main, axis }, state: { clip } } = $$;
    const isRotated = config.axis_rotated;
    const target = ["x", "y"];
    config.axis_y2_show && target.push("y2");
    target.forEach((v) => {
      const classAxis = this.getAxisClassName(v);
      const classLabel = $AXIS[`axis${v.toUpperCase()}Label`];
      axis[v] = main.append("g").attr("class", classAxis).attr("clip-path", () => {
        let res = null;
        if (v === "x") {
          res = clip.pathXAxis;
        } else if (v === "y") {
          res = clip.pathYAxis;
        }
        return res;
      }).attr("transform", $$.getTranslate(v)).style("visibility", config[`axis_${v}_show`] ? null : "hidden");
      axis[v].append("text").attr("class", classLabel).attr("transform", ["rotate(-90)", null][v === "x" ? +!isRotated : +isRotated]).style("text-anchor", () => this.textAnchorForAxisLabel(v));
      this.generateAxes(v);
    });
    config.axis_tooltip && this.setAxisTooltip();
  }
  /**
   * Set axis orient according option value
   * @private
   */
  setOrient() {
    const $$ = this.owner;
    const {
      axis_rotated: isRotated,
      axis_y_inner: yInner,
      axis_y2_inner: y2Inner
    } = $$.config;
    this.orient = {
      x: isRotated ? "left" : "bottom",
      y: isRotated ? yInner ? "top" : "bottom" : yInner ? "right" : "left",
      y2: isRotated ? y2Inner ? "bottom" : "top" : y2Inner ? "left" : "right",
      subX: isRotated ? "left" : "bottom"
    };
  }
  /**
   * Generate axes
   * It's used when axis' axes option is set
   * @param {string} id Axis id
   * @private
   */
  generateAxes(id) {
    const $$ = this.owner;
    const { config } = $$;
    const axes = [];
    const axesConfig = config[`axis_${id}_axes`];
    const isRotated = config.axis_rotated;
    let d3Axis;
    if (id === "x") {
      d3Axis = isRotated ? external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisLeft : external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisBottom;
    } else if (id === "y") {
      d3Axis = isRotated ? external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisBottom : external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisLeft;
    } else if (id === "y2") {
      d3Axis = isRotated ? external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisTop : external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisRight;
    }
    if (axesConfig.length) {
      axesConfig.forEach((v) => {
        const tick = v.tick || {};
        const scale = $$.scale[id].copy();
        v.domain && scale.domain(v.domain);
        axes.push(
          d3Axis(scale).ticks(tick.count).tickFormat(
            isFunction(tick.format) ? tick.format.bind($$.api) : (x) => x
          ).tickValues(tick.values).tickSizeOuter(tick.outer === false ? 0 : 6)
        );
      });
    }
    this.axesList[id] = axes;
  }
  /**
   * Update axes nodes
   * @private
   */
  updateAxes() {
    const $$ = this.owner;
    const { config, $el: { main }, $T } = $$;
    Object.keys(this.axesList).forEach((id) => {
      const axesConfig = config[`axis_${id}_axes`];
      const scale = $$.scale[id].copy();
      const range = scale.range();
      this.axesList[id].forEach((v, i) => {
        const axisRange = v.scale().range();
        if (!range.every((v2, i2) => v2 === axisRange[i2])) {
          v.scale().range(range);
        }
        const className = `${this.getAxisClassName(id)}-${i + 1}`;
        let g = main.select(`.${className.replace(/\s/, ".")}`);
        if (g.empty()) {
          g = main.append("g").attr("class", className).style("visibility", config[`axis_${id}_show`] ? null : "hidden").call(v);
        } else {
          axesConfig[i].domain && scale.domain(axesConfig[i].domain);
          $T(g).call(v.scale(scale));
        }
        g.attr("transform", $$.getTranslate(id, i + 1));
      });
    });
  }
  /**
   * Set Axis & tick values
   * called from: updateScales()
   * @param {string} id Axis id string
   * @param {d3Scale} scale Scale
   * @param {boolean} outerTick If show outer tick
   * @param {boolean} noTransition If with no transition
   * @private
   */
  setAxis(id, scale, outerTick, noTransition) {
    const $$ = this.owner;
    if (id !== "subX") {
      this.tick[id] = this.getTickValues(id);
    }
    this[id] = this.getAxis(
      id,
      scale,
      outerTick,
      // do not transit x Axis on zoom and resizing
      // https://github.com/naver/billboard.js/issues/1949
      id === "x" && ($$.scale.zoom || $$.config.subchart_show || $$.state.resizing) ? true : noTransition
    );
  }
  // called from : getMaxTickSize()
  getAxis(id, scale, outerTick, noTransition, noTickTextRotate) {
    const $$ = this.owner;
    const { config } = $$;
    const isX = /^(x|subX)$/.test(id);
    const type = isX ? "x" : id;
    const isCategory = isX && this.isCategorized();
    const orient = this.orient[id];
    const tickTextRotate = noTickTextRotate ? 0 : $$.getAxisTickRotate(type);
    let tickFormat;
    if (isX) {
      tickFormat = id === "subX" ? $$.format.subXAxisTick : $$.format.xAxisTick;
    } else {
      const fn = config[`axis_${id}_tick_format`];
      if (isFunction(fn)) {
        tickFormat = fn.bind($$.api);
      }
    }
    let tickValues = this.tick[type];
    const axisParams = mergeObj({
      outerTick,
      noTransition,
      config,
      id,
      tickTextRotate,
      owner: $$
    }, isX && {
      isCategory,
      isInverted: config.axis_x_inverted,
      tickMultiline: config.axis_x_tick_multiline,
      tickWidth: config.axis_x_tick_width,
      tickTitle: isCategory && config.axis_x_tick_tooltip && $$.api.categories(),
      orgXScale: $$.scale.x
    });
    if (!isX) {
      axisParams.tickStepSize = config[`axis_${type}_tick_stepSize`];
    }
    const axis = new AxisRenderer(axisParams).scale(isX && $$.scale.zoom || scale).orient(orient);
    if (isX && this.isTimeSeries() && tickValues && !isFunction(tickValues)) {
      const fn = parseDate.bind($$);
      tickValues = tickValues.map((v) => fn(v));
    } else if (!isX && this.isTimeSeriesY()) {
      axis.ticks(config.axis_y_tick_time_value);
      tickValues = null;
    }
    tickValues && axis.tickValues(tickValues);
    axis.tickFormat(
      tickFormat || !isX && ($$.isStackNormalized() && ((x) => `${x}%`))
    );
    if (isCategory) {
      axis.tickCentered(config.axis_x_tick_centered);
      if (isEmpty(config.axis_x_tick_culling)) {
        config.axis_x_tick_culling = false;
      }
    }
    const tickCount = config[`axis_${type}_tick_count`];
    tickCount && axis.ticks(tickCount);
    return axis;
  }
  updateXAxisTickValues(targets, axis) {
    var _a;
    const $$ = this.owner;
    const { config } = $$;
    const fit = config.axis_x_tick_fit;
    let count = config.axis_x_tick_count;
    let values;
    if (fit || count && fit) {
      values = $$.mapTargetsToUniqueXs(targets);
      if (this.isCategorized() && count > values.length) {
        count = values.length;
      }
      values = this.generateTickValues(
        values,
        count,
        this.isTimeSeries()
      );
    }
    if (axis) {
      axis.tickValues(values);
    } else if (this.x) {
      this.x.tickValues(values);
      (_a = this.subX) == null ? void 0 : _a.tickValues(values);
    }
    return values;
  }
  getId(id) {
    const { config, scale } = this.owner;
    let axis = config.data_axes[id];
    if (!axis || !scale[axis]) {
      axis = "y";
    }
    return axis;
  }
  getXAxisTickFormat(forSubchart) {
    const $$ = this.owner;
    const { config, format } = $$;
    const tickFormat = forSubchart ? config.subchart_axis_x_tick_format || config.axis_x_tick_format : config.axis_x_tick_format;
    const isTimeSeries = this.isTimeSeries();
    const isCategorized = this.isCategorized();
    let currFormat;
    if (tickFormat) {
      if (isFunction(tickFormat)) {
        currFormat = tickFormat.bind($$.api);
      } else if (isTimeSeries) {
        currFormat = (date) => date ? format.axisTime(tickFormat)(date) : "";
      }
    } else {
      currFormat = isTimeSeries ? format.defaultAxisTime : isCategorized ? $$.categoryName : (v) => v < 0 ? v.toFixed(0) : v;
    }
    return isFunction(currFormat) ? (v) => currFormat.apply($$, isCategorized ? [v, $$.categoryName(v)] : [v]) : currFormat;
  }
  getTickValues(id) {
    const $$ = this.owner;
    const tickValues = $$.config[`axis_${id}_tick_values`];
    const axis = $$[`${id}Axis`];
    return (isFunction(tickValues) ? tickValues.call($$.api) : tickValues) || (axis ? axis.tickValues() : void 0);
  }
  getLabelOptionByAxisId(id) {
    return this.owner.config[`axis_${id}_label`];
  }
  getLabelText(id) {
    const option = this.getLabelOptionByAxisId(id);
    return isString(option) ? option : option ? option.text : null;
  }
  setLabelText(id, text) {
    const $$ = this.owner;
    const { config } = $$;
    const option = this.getLabelOptionByAxisId(id);
    if (isString(option)) {
      config[`axis_${id}_label`] = text;
    } else if (option) {
      option.text = text;
    }
  }
  getLabelPosition(id, defaultPosition) {
    const isRotated = this.owner.config.axis_rotated;
    const option = this.getLabelOptionByAxisId(id);
    const position = isObjectType(option) && option.position ? option.position : defaultPosition[+!isRotated];
    const has = (v) => !!~position.indexOf(v);
    return {
      isInner: has("inner"),
      isOuter: has("outer"),
      isLeft: has("left"),
      isCenter: has("center"),
      isRight: has("right"),
      isTop: has("top"),
      isMiddle: has("middle"),
      isBottom: has("bottom")
    };
  }
  getAxisLabelPosition(id) {
    return this.getLabelPosition(
      id,
      id === "x" ? ["inner-top", "inner-right"] : ["inner-right", "inner-top"]
    );
  }
  getLabelPositionById(id) {
    return this.getAxisLabelPosition(id);
  }
  xForAxisLabel(id) {
    const $$ = this.owner;
    const { state: { width, height } } = $$;
    const position = this.getAxisLabelPosition(id);
    let x = position.isMiddle ? -height / 2 : 0;
    if (this.isHorizontal($$, id !== "x")) {
      x = position.isLeft ? 0 : position.isCenter ? width / 2 : width;
    } else if (position.isBottom) {
      x = -height;
    }
    return x;
  }
  dxForAxisLabel(id) {
    const $$ = this.owner;
    const position = this.getAxisLabelPosition(id);
    let dx = position.isBottom ? "0.5em" : "0";
    if (this.isHorizontal($$, id !== "x")) {
      dx = position.isLeft ? "0.5em" : position.isRight ? "-0.5em" : "0";
    } else if (position.isTop) {
      dx = "-0.5em";
    }
    return dx;
  }
  textAnchorForAxisLabel(id) {
    const $$ = this.owner;
    const position = this.getAxisLabelPosition(id);
    let anchor = position.isMiddle ? "middle" : "end";
    if (this.isHorizontal($$, id !== "x")) {
      anchor = position.isLeft ? "start" : position.isCenter ? "middle" : "end";
    } else if (position.isBottom) {
      anchor = "start";
    }
    return anchor;
  }
  dyForAxisLabel(id) {
    const $$ = this.owner;
    const { config } = $$;
    const isRotated = config.axis_rotated;
    const isInner = this.getAxisLabelPosition(id).isInner;
    const tickRotate = config[`axis_${id}_tick_rotate`] ? $$.getHorizontalAxisHeight(id) : 0;
    const { width: maxTickWidth } = this.getMaxTickSize(id);
    let dy;
    if (id === "x") {
      const xHeight = config.axis_x_height;
      if (isRotated) {
        dy = isInner ? "1.2em" : -25 - maxTickWidth;
      } else if (isInner) {
        dy = "-0.5em";
      } else if (xHeight) {
        dy = xHeight - 10;
      } else if (tickRotate) {
        dy = tickRotate - 10;
      } else {
        dy = "3em";
      }
    } else {
      dy = {
        y: ["-0.5em", 10, "3em", "1.2em", 10],
        y2: ["1.2em", -20, "-2.2em", "-0.5em", 15]
      }[id];
      if (isRotated) {
        if (isInner) {
          dy = dy[0];
        } else if (tickRotate) {
          dy = tickRotate * (id === "y2" ? -1 : 1) - dy[1];
        } else {
          dy = dy[2];
        }
      } else {
        dy = isInner ? dy[3] : (dy[4] + (config[`axis_${id}_inner`] ? 0 : maxTickWidth + dy[4])) * (id === "y" ? -1 : 1);
      }
    }
    return dy;
  }
  /**
   * Get max tick size
   * @param {string} id axis id string
   * @param {boolean} withoutRecompute wheather or not to recompute
   * @returns {object} {width, height}
   * @private
   */
  getMaxTickSize(id, withoutRecompute) {
    const $$ = this.owner;
    const { config, state: { current }, $el: { svg, chart } } = $$;
    const currentTickMax = current.maxTickSize[id];
    const configPrefix = `axis_${id}`;
    const max = {
      width: 0,
      height: 0
    };
    if (withoutRecompute || !config[`${configPrefix}_show`] || currentTickMax.width > 0 && $$.filterTargetsToShow().length === 0) {
      return currentTickMax;
    }
    if (svg) {
      const isYAxis = /^y2?$/.test(id);
      const targetsToShow = $$.filterTargetsToShow($$.data.targets);
      const scale = $$.scale[id].copy().domain(
        $$[`get${isYAxis ? "Y" : "X"}Domain`](targetsToShow, id)
      );
      const domain = scale.domain();
      const isDomainSame = domain[0] === domain[1] && domain.every((v) => v > 0);
      const isCurrentMaxTickDomainSame = isArray(currentTickMax.domain) && currentTickMax.domain[0] === currentTickMax.domain[1] && currentTickMax.domain.every((v) => v > 0);
      if (isDomainSame || isCurrentMaxTickDomainSame) {
        return currentTickMax.size;
      } else {
        currentTickMax.domain = domain;
      }
      if (!isYAxis) {
        currentTickMax.ticks.splice(0);
      }
      const axis = this.getAxis(id, scale, false, false, true);
      const tickRotate = config[`${configPrefix}_tick_rotate`];
      const tickCount = config[`${configPrefix}_tick_count`];
      const tickValues = config[`${configPrefix}_tick_values`];
      if (!tickValues && tickCount) {
        axis.tickValues(
          this.generateTickValues(
            domain,
            tickCount,
            isYAxis ? this.isTimeSeriesY() : this.isTimeSeries()
          )
        );
      }
      !isYAxis && this.updateXAxisTickValues(targetsToShow, axis);
      const dummy = chart.append("svg").style("visibility", "hidden").style("position", "fixed").style("top", "0").style("left", "0");
      axis.create(dummy);
      dummy.selectAll("text").attr("transform", isNumber(tickRotate) ? `rotate(${tickRotate})` : null).each(function(d, i) {
        const { width, height } = this.getBoundingClientRect();
        max.width = Math.max(max.width, width);
        max.height = Math.max(max.height, height);
        if (!isYAxis) {
          currentTickMax.ticks[i] = width;
        }
      });
      dummy.remove();
    }
    Object.keys(max).forEach((key) => {
      if (max[key] > 0) {
        currentTickMax[key] = max[key];
      }
    });
    return currentTickMax;
  }
  getXAxisTickTextY2Overflow(defaultPadding) {
    const $$ = this.owner;
    const { axis, config, state: { current, isLegendRight, legendItemWidth } } = $$;
    const xAxisTickRotate = $$.getAxisTickRotate("x");
    const positiveRotation = xAxisTickRotate > 0 && xAxisTickRotate < 90;
    if ((axis.isCategorized() || axis.isTimeSeries()) && config.axis_x_tick_fit && (!config.axis_x_tick_culling || isEmpty(config.axis_x_tick_culling)) && !config.axis_x_tick_multiline && positiveRotation) {
      const y2AxisWidth = config.axis_y2_show && current.maxTickSize.y2.width || 0;
      const legendWidth = isLegendRight && legendItemWidth || 0;
      const widthWithoutCurrentPaddingLeft = current.width - $$.getCurrentPaddingByDirection("left");
      const maxOverflow = this.getXAxisTickMaxOverflow(
        xAxisTickRotate,
        widthWithoutCurrentPaddingLeft - defaultPadding
      ) - y2AxisWidth - legendWidth;
      const xAxisTickTextY2Overflow = Math.max(0, maxOverflow) + defaultPadding;
      return Math.min(xAxisTickTextY2Overflow, widthWithoutCurrentPaddingLeft / 2);
    }
    return 0;
  }
  getXAxisTickMaxOverflow(xAxisTickRotate, widthWithoutCurrentPaddingLeft) {
    const $$ = this.owner;
    const { axis, config, state } = $$;
    const isTimeSeries = axis.isTimeSeries();
    const tickTextWidths = state.current.maxTickSize.x.ticks;
    const tickCount = tickTextWidths.length;
    const { left, right } = state.axis.x.padding;
    let maxOverflow = 0;
    const remaining = tickCount - (isTimeSeries && config.axis_x_tick_fit ? 0.5 : 0);
    for (let i = 0; i < tickCount; i++) {
      const tickIndex = i + 1;
      const rotatedTickTextWidth = Math.cos(Math.PI * xAxisTickRotate / 180) * tickTextWidths[i];
      const ticksBeforeTickText = tickIndex - (isTimeSeries ? 1 : 0.5) + left;
      if (ticksBeforeTickText <= 0) {
        continue;
      }
      const xAxisLengthWithoutTickTextWidth = widthWithoutCurrentPaddingLeft - rotatedTickTextWidth;
      const tickLength = xAxisLengthWithoutTickTextWidth / ticksBeforeTickText;
      const remainingTicks = remaining - tickIndex;
      const paddingRightLength = right * tickLength;
      const remainingTickWidth = remainingTicks * tickLength + paddingRightLength;
      const overflow = rotatedTickTextWidth - tickLength / 2 - remainingTickWidth;
      maxOverflow = Math.max(maxOverflow, overflow);
    }
    const filteredTargets = $$.filterTargetsToShow($$.data.targets);
    let tickOffset = 0;
    if (!isTimeSeries && config.axis_x_tick_count <= filteredTargets.length && filteredTargets[0].values.length) {
      const scale = getScale(
        $$.axis.getAxisType("x"),
        0,
        widthWithoutCurrentPaddingLeft - maxOverflow
      ).domain([
        left * -1,
        $$.getXDomainMax($$.data.targets) + 1 + right
      ]);
      tickOffset = Math.ceil((scale(1) - scale(0)) / 2);
    }
    return maxOverflow + tickOffset;
  }
  updateLabels(withTransition) {
    const $$ = this.owner;
    const { $el: { main }, $T } = $$;
    const labels = {
      x: main.select(`.${$AXIS.axisX} .${$AXIS.axisXLabel}`),
      y: main.select(`.${$AXIS.axisY} .${$AXIS.axisYLabel}`),
      y2: main.select(`.${$AXIS.axisY2} .${$AXIS.axisY2Label}`)
    };
    Object.keys(labels).filter((id) => !labels[id].empty()).forEach((v) => {
      const node = labels[v];
      $T(node, withTransition).attr("x", () => this.xForAxisLabel(v)).attr("dx", () => this.dxForAxisLabel(v)).attr("dy", () => this.dyForAxisLabel(v)).text(() => this.getLabelText(v));
    });
  }
  /**
   * Get axis padding value
   * @param {number|object} padding Padding object
   * @param {string} key Key string of padding
   * @param {Date|number} defaultValue Default value
   * @param {number} domainLength Domain length
   * @returns {number} Padding value in scale
   * @private
   */
  getPadding(padding, key, defaultValue, domainLength) {
    const p = isNumber(padding) ? padding : padding[key];
    if (!isValue(p)) {
      return defaultValue;
    }
    return this.owner.convertPixelToScale(
      /(bottom|top)/.test(key) ? "y" : "x",
      p,
      domainLength
    );
  }
  generateTickValues(values, tickCount, forTimeSeries) {
    let tickValues = values;
    if (tickCount) {
      const targetCount = isFunction(tickCount) ? tickCount() : tickCount;
      if (targetCount === 1) {
        tickValues = [values[0]];
      } else if (targetCount === 2) {
        tickValues = [values[0], values[values.length - 1]];
      } else if (targetCount > 2) {
        const isCategorized = this.isCategorized();
        const count = targetCount - 2;
        const start = values[0];
        const end = values[values.length - 1];
        const interval = (end - start) / (count + 1);
        let tickValue;
        tickValues = [start];
        for (let i = 0; i < count; i++) {
          tickValue = +start + interval * (i + 1);
          tickValues.push(
            forTimeSeries ? new Date(tickValue) : isCategorized ? Math.round(tickValue) : tickValue
          );
        }
        tickValues.push(end);
      }
    }
    if (!forTimeSeries) {
      tickValues = tickValues.sort((a, b) => a - b);
    }
    return tickValues;
  }
  generateTransitions(withTransition) {
    const $$ = this.owner;
    const { $el: { axis }, $T } = $$;
    const [axisX, axisY, axisY2, axisSubX] = ["x", "y", "y2", "subX"].map((v) => $T(axis[v], withTransition));
    return { axisX, axisY, axisY2, axisSubX };
  }
  redraw(transitions, isHidden, isInit) {
    const $$ = this.owner;
    const { config, $el } = $$;
    const opacity = isHidden ? "0" : null;
    ["x", "y", "y2", "subX"].forEach((id) => {
      const axis = this[id];
      const $axis = $el.axis[id];
      if (axis && $axis) {
        if (!isInit && !config.transition_duration) {
          axis.config.withoutTransition = true;
        }
        $axis.style("opacity", opacity);
        axis.create(transitions[`axis${capitalize(id)}`]);
      }
    });
    this.updateAxes();
  }
  /**
   * Redraw axis
   * @param {Array} targetsToShow targets data to be shown
   * @param {object} wth option object
   * @param {d3.Transition} transitions Transition object
   * @param {object} flow flow object
   * @param {boolean} isInit called from initialization
   * @private
   */
  redrawAxis(targetsToShow, wth, transitions, flow, isInit) {
    var _a, _b, _c;
    const $$ = this.owner;
    const { config, scale, $el } = $$;
    const hasZoom = !!scale.zoom;
    let xDomainForZoom;
    if (!hasZoom && this.isCategorized() && targetsToShow.length === 0) {
      scale.x.domain([0, $el.axis.x.selectAll(".tick").size()]);
    }
    if (scale.x && targetsToShow.length) {
      !hasZoom && $$.updateXDomain(
        targetsToShow,
        wth.UpdateXDomain,
        wth.UpdateOrgXDomain,
        wth.TrimXDomain
      );
      if (!config.axis_x_tick_values) {
        this.updateXAxisTickValues(targetsToShow);
      }
    } else if (this.x) {
      this.x.tickValues([]);
      (_a = this.subX) == null ? void 0 : _a.tickValues([]);
    }
    if (config.zoom_rescale && !flow) {
      xDomainForZoom = scale.x.orgDomain();
    }
    ["y", "y2"].forEach((key) => {
      const prefix = `axis_${key}_`;
      const axisScale = scale[key];
      if (axisScale) {
        const tickValues = config[`${prefix}tick_values`];
        const tickCount = config[`${prefix}tick_count`];
        axisScale.domain($$.getYDomain(targetsToShow, key, xDomainForZoom));
        if (!tickValues && tickCount) {
          const axis = $$.axis[key];
          const domain = axisScale.domain();
          axis.tickValues(
            this.generateTickValues(
              domain,
              domain.every((v) => v === 0) ? 1 : tickCount,
              this.isTimeSeriesY()
            )
          );
        }
      }
    });
    this.redraw(transitions, $$.hasArcType(), isInit);
    this.updateLabels(wth.Transition);
    if ((wth.UpdateXDomain || wth.UpdateXAxis || wth.Y) && targetsToShow.length) {
      this.setCulling();
    }
    if (wth.Y) {
      (_b = scale.subY) == null ? void 0 : _b.domain($$.getYDomain(targetsToShow, "y"));
      (_c = scale.subY2) == null ? void 0 : _c.domain($$.getYDomain(targetsToShow, "y2"));
    }
  }
  /**
   * Set manual culling
   * @private
   */
  setCulling() {
    const $$ = this.owner;
    const { config, state: { clip, current }, $el } = $$;
    ["subX", "x", "y", "y2"].forEach((type) => {
      const axis = $el.axis[type];
      const id = type === "subX" ? "x" : type;
      const cullingOptionPrefix = `axis_${id}_tick_culling`;
      const toCull = config[cullingOptionPrefix];
      if (axis && toCull) {
        const tickNodes = axis.selectAll(".tick");
        const tickValues = sortValue(tickNodes.data());
        const tickSize = tickValues.length;
        const cullingMax = config[`${cullingOptionPrefix}_max`];
        const lines = config[`${cullingOptionPrefix}_lines`];
        let intervalForCulling;
        if (tickSize) {
          for (let i = 1; i < tickSize; i++) {
            if (tickSize / i < cullingMax) {
              intervalForCulling = i;
              break;
            }
          }
          tickNodes.each(function(d) {
            const node = lines ? this.querySelector("text") : this;
            if (node) {
              node.style.display = tickValues.indexOf(d) % intervalForCulling ? "none" : null;
            }
          });
        } else {
          tickNodes.style("display", null);
        }
        if (type === "x") {
          const clipPath = current.maxTickSize.x.clipPath ? clip.pathXAxisTickTexts : null;
          $el.svg.selectAll(`.${$AXIS.axisX} .tick text`).attr("clip-path", clipPath);
        }
      }
    });
  }
  /**
   * Set axis tooltip
   * @private
   */
  setAxisTooltip() {
    var _a;
    const $$ = this.owner;
    const { config: { axis_rotated: isRotated, axis_tooltip }, $el: { axis, axisTooltip } } = $$;
    const bgColor = (_a = axis_tooltip.backgroundColor) != null ? _a : "black";
    $$.generateTextBGColorFilter(
      bgColor,
      {
        x: -0.15,
        y: -0.2,
        width: 1.3,
        height: 1.3
      }
    );
    ["x", "y", "y2"].forEach((v) => {
      var _a2, _b, _c;
      axisTooltip[v] = (_a2 = axis[v]) == null ? void 0 : _a2.append("text").classed($AXIS[`axis${v.toUpperCase()}Tooltip`], true).attr("filter", $$.updateTextBGColor({ id: v }, bgColor));
      if (isRotated) {
        const pos = v === "x" ? "x" : "y";
        const val = v === "y" ? "1.15em" : v === "x" ? "-0.3em" : "-0.4em";
        (_b = axisTooltip[v]) == null ? void 0 : _b.attr(pos, val).attr(`d${v === "x" ? "y" : "x"}`, v === "x" ? "0.4em" : "-1.3em").style("text-anchor", v === "x" ? "end" : null);
      } else {
        const pos = v === "x" ? "y" : "x";
        const val = v === "x" ? "1.15em" : `${v === "y" ? "-" : ""}0.4em`;
        (_c = axisTooltip[v]) == null ? void 0 : _c.attr(pos, val).attr(`d${v === "x" ? "x" : "y"}`, v === "x" ? "-1em" : "0.3em").style("text-anchor", v === "y" ? "end" : null);
      }
    });
  }
}

;// CONCATENATED MODULE: ./src/ChartInternal/interactions/eventrect.ts


/* harmony default export */ var eventrect = ({
  /**
   * Initialize the area that detects the event.
   * Add a container for the zone that detects the event.
   * @private
   */
  initEventRect() {
    const $$ = this;
    $$.$el.main.select(`.${$COMMON.chart}`).append("g").attr("class", $EVENT.eventRects).style("fill-opacity", "0");
  },
  /**
   * Redraws the area that detects the event.
   * @private
   */
  redrawEventRect() {
    var _a;
    const $$ = this;
    const { config, state, $el } = $$;
    const isMultipleX = $$.isMultipleX();
    const isInverted = config.axis_x_inverted;
    if ($el.eventRect) {
      $$.updateEventRect($el.eventRect, true);
    } else if ($$.data.targets.length) {
      const eventRects = $$.$el.main.select(`.${$EVENT.eventRects}`).style("cursor", config.zoom_enabled && config.zoom_type !== "drag" ? config.axis_rotated ? "ns-resize" : "ew-resize" : null).classed($EVENT.eventRectsMultiple, isMultipleX).classed($EVENT.eventRectsSingle, !isMultipleX);
      const eventRectUpdate = eventRects.selectAll(`.${$EVENT.eventRect}`).data([0]).enter().append("rect");
      $$.updateEventRect(eventRectUpdate);
      $$.updateEventType(eventRectUpdate);
      eventRectUpdate.call($$.getDraggableSelection());
      $el.eventRect = eventRectUpdate;
      if ($$.state.inputType === "touch" && !$el.svg.on("touchstart.eventRect") && !$$.hasArcType()) {
        $$.bindTouchOnEventRect();
      }
      state.rendered && $$.updateEventRect($el.eventRect, true);
    }
    if (!isMultipleX) {
      const xAxisTickValues = $$.getMaxDataCountTarget();
      if (!config.data_xSort || isInverted) {
        xAxisTickValues.sort((a, b) => isInverted ? b.x - a.x : a.x - b.x);
      }
      $$.updateDataIndexByX(xAxisTickValues);
      $$.updateXs(xAxisTickValues);
      (_a = $$.updatePointClass) == null ? void 0 : _a.call($$, true);
      state.eventReceiver.data = xAxisTickValues;
    }
    $$.updateEventRectData();
  },
  bindTouchOnEventRect() {
    const $$ = this;
    const { config, state, $el: { eventRect, svg } } = $$;
    const selectRect = (context) => {
      if ($$.isMultipleX()) {
        $$.selectRectForMultipleXs(context);
      } else {
        const index = $$.getDataIndexFromEvent(state.event);
        $$.callOverOutForTouch(index);
        index === -1 ? $$.unselectRect() : $$.selectRectForSingle(context, index);
      }
    };
    const unselectRect = () => {
      $$.unselectRect();
      $$.callOverOutForTouch();
    };
    const preventDefault = config.interaction_inputType_touch.preventDefault;
    const isPrevented = isBoolean(preventDefault) && preventDefault || false;
    const preventThreshold = !isNaN(preventDefault) && preventDefault || null;
    let startPx;
    const preventEvent = (event) => {
      const eventType = event.type;
      const touch = event.changedTouches[0];
      const currentXY = touch[`client${config.axis_rotated ? "Y" : "X"}`];
      if (eventType === "touchstart") {
        if (isPrevented) {
          event.preventDefault();
        } else if (preventThreshold !== null) {
          startPx = currentXY;
        }
      } else if (eventType === "touchmove") {
        if (isPrevented || startPx === true || preventThreshold !== null && Math.abs(startPx - currentXY) >= preventThreshold) {
          startPx = true;
          event.preventDefault();
        }
      }
    };
    eventRect.on("touchstart", (event) => {
      state.event = event;
      $$.updateEventRect();
    }).on("touchstart.eventRect touchmove.eventRect", (event) => {
      state.event = event;
      if (!eventRect.empty() && eventRect.classed($EVENT.eventRect)) {
        if (state.dragging || state.flowing || $$.hasArcType() || event.touches.length > 1) {
          return;
        }
        preventEvent(event);
        selectRect(eventRect.node());
      } else {
        unselectRect();
      }
    }, true).on("touchend.eventRect", (event) => {
      state.event = event;
      if (!eventRect.empty() && eventRect.classed($EVENT.eventRect)) {
        if ($$.hasArcType() || !$$.toggleShape || state.cancelClick) {
          state.cancelClick && (state.cancelClick = false);
        }
      }
    }, true);
    svg.on("touchstart", (event) => {
      state.event = event;
      const { target } = event;
      if (target && target !== eventRect.node()) {
        unselectRect();
      }
    });
  },
  /**
   * Update event rect size
   * @param {d3Selection} eventRect Event <rect> element
   * @param {boolean} force Force to update
   * @private
   */
  updateEventRect(eventRect, force = false) {
    const $$ = this;
    const { state, $el } = $$;
    const { eventReceiver, width, height, rendered, resizing } = state;
    const rectElement = eventRect || $el.eventRect;
    const updateClientRect = () => {
      if (eventReceiver) {
        const scrollPos = getScrollPosition($el.chart.node());
        eventReceiver.rect = rectElement.node().getBoundingClientRect().toJSON();
        eventReceiver.rect.top += scrollPos.y;
        eventReceiver.rect.left += scrollPos.x;
      }
    };
    if (!rendered || resizing || force) {
      rectElement.attr("x", 0).attr("y", 0).attr("width", width).attr("height", height);
      if (!rendered || force) {
        rectElement.classed($EVENT.eventRect, true);
      }
    }
    updateClientRect();
  },
  /**
   * Update event type (single or multiple x)
   * @param {d3Selection | boolean} target Target element or boolean to rebind event
   */
  updateEventType(target) {
    const $$ = this;
    const isRebindCall = isBoolean(target);
    const eventRect = isRebindCall ? $$.$el.eventRect : target;
    const unbindEvent = isRebindCall ? target !== (eventRect == null ? void 0 : eventRect.datum().multipleX) : false;
    if (eventRect) {
      unbindEvent && (eventRect == null ? void 0 : eventRect.on("mouseover mousemove mouseout click", null));
      $$.isMultipleX() ? $$.generateEventRectsForMultipleXs(eventRect) : $$.generateEventRectsForSingleX(eventRect);
    }
  },
  /**
   * Updates the location and size of the eventRect.
   * @private
   */
  updateEventRectData() {
    const $$ = this;
    const { config, scale, state } = $$;
    const xScale = scale.zoom || scale.x;
    const isRotated = config.axis_rotated;
    const isMultipleX = $$.isMultipleX();
    let x;
    let y;
    let w;
    let h;
    $$.updateEventType(isMultipleX);
    if (isMultipleX) {
      x = 0;
      y = 0;
      w = state.width;
      h = state.height;
    } else {
      let rectW;
      let rectX;
      if ($$.axis.isCategorized()) {
        rectW = $$.getEventRectWidth();
        rectX = (d) => xScale(d.x) - rectW / 2;
      } else {
        const getPrevNextX = ({ index }) => ({
          prev: $$.getPrevX(index),
          next: $$.getNextX(index)
        });
        rectW = (d) => {
          const x2 = getPrevNextX(d);
          const xDomain = xScale.domain();
          let val;
          if (x2.prev === null && x2.next === null) {
            val = isRotated ? state.height : state.width;
          } else if (x2.prev === null) {
            val = (xScale(x2.next) + xScale(d.x)) / 2;
          } else if (x2.next === null) {
            val = xScale(xDomain[1]) - (xScale(x2.prev) + xScale(d.x)) / 2;
          } else {
            Object.keys(x2).forEach((key, i) => {
              var _a;
              x2[key] = (_a = x2[key]) != null ? _a : xDomain[i];
            });
            val = Math.max(0, (xScale(x2.next) - xScale(x2.prev)) / 2);
          }
          return val;
        };
        rectX = (d) => {
          const x2 = getPrevNextX(d);
          let val;
          if (x2.prev === null && x2.next === null) {
            val = 0;
          } else if (x2.prev === null) {
            val = xScale(xScale.domain()[0]);
          } else {
            val = (xScale(d.x) + xScale(x2.prev)) / 2;
          }
          return val;
        };
      }
      x = isRotated ? 0 : rectX;
      y = isRotated ? rectX : 0;
      w = isRotated ? state.width : rectW;
      h = isRotated ? rectW : state.height;
    }
    const { eventReceiver } = state;
    const call = (fn, v) => isFunction(fn) ? fn(v) : fn;
    eventReceiver.coords.splice(eventReceiver.data.length);
    eventReceiver.data.forEach((d, i) => {
      eventReceiver.coords[i] = {
        x: call(x, d),
        y: call(y, d),
        w: call(w, d),
        h: call(h, d)
      };
    });
  },
  /**
   * Seletct rect for single x value
   * @param {d3Selection} context Event rect element
   * @param {number} index x Axis index
   * @private
   */
  selectRectForSingle(context, index) {
    var _a, _b;
    const $$ = this;
    const { config, $el: { main, circle } } = $$;
    const isSelectionEnabled = config.data_selection_enabled;
    const isSelectionGrouped = config.data_selection_grouped;
    const isSelectable = config.data_selection_isselectable;
    const isTooltipGrouped = config.tooltip_grouped;
    const selectedData = $$.getAllValuesOnIndex(index);
    if (isTooltipGrouped) {
      $$.showTooltip(selectedData, context);
      (_a = $$.showGridFocus) == null ? void 0 : _a.call($$, selectedData);
      if (!isSelectionEnabled || isSelectionGrouped) {
        return;
      }
    }
    !circle && main.selectAll(`.${$COMMON.EXPANDED}:not(.${$SHAPE.shape}-${index})`).classed(
      $COMMON.EXPANDED,
      false
    );
    const shapeAtIndex = main.selectAll(`.${$SHAPE.shape}-${index}`).classed($COMMON.EXPANDED, true).style("cursor", isSelectable ? "pointer" : null).filter(function(d) {
      return $$.isWithinShape(this, d);
    });
    if (shapeAtIndex.empty() && !isTooltipGrouped) {
      (_b = $$.hideGridFocus) == null ? void 0 : _b.call($$);
      $$.hideTooltip();
      !isSelectionGrouped && $$.setExpand(index);
    }
    shapeAtIndex.call((selected) => {
      var _a2, _b2;
      const d = selected.data();
      if (isSelectionEnabled && (isSelectionGrouped || (isSelectable == null ? void 0 : isSelectable.bind($$.api)(d)))) {
        context.style.cursor = "pointer";
      }
      if (!isTooltipGrouped) {
        $$.showTooltip(d, context);
        (_a2 = $$.showGridFocus) == null ? void 0 : _a2.call($$, d);
        (_b2 = $$.unexpandCircles) == null ? void 0 : _b2.call($$);
        selected.each((d2) => $$.setExpand(index, d2.id));
      }
    });
  },
  /**
   * Select rect for multiple x values
   * @param {d3Selection} context Event rect element
   * @param {boolean} [triggerEvent=true] Whether trigger event or not
   * @private
   */
  selectRectForMultipleXs(context, triggerEvent = true) {
    const $$ = this;
    const { config, state } = $$;
    const targetsToShow = $$.filterTargetsToShow($$.data.targets);
    if (state.dragging || $$.hasArcType(targetsToShow)) {
      return;
    }
    const mouse = getPointer(state.event, context);
    const closest = $$.findClosestFromTargets(targetsToShow, mouse);
    if (triggerEvent && state.mouseover && (!closest || closest.id !== state.mouseover.id)) {
      config.data_onout.call($$.api, state.mouseover);
      state.mouseover = void 0;
    }
    if (!closest) {
      $$.unselectRect();
      return;
    }
    const sameXData = $$.isBubbleType(closest) || $$.isScatterType(closest) || !config.tooltip_grouped ? [closest] : $$.filterByX(targetsToShow, closest.x);
    const selectedData = sameXData.map((d) => $$.addName(d));
    $$.showTooltip(selectedData, context);
    $$.setExpand(closest.index, closest.id, true);
    $$.showGridFocus(selectedData);
    const dist = $$.dist(closest, mouse);
    if ($$.isBarType(closest.id) || dist < $$.getPointSensitivity(closest)) {
      $$.$el.svg.select(`.${$EVENT.eventRect}`).style("cursor", "pointer");
      if (triggerEvent && !state.mouseover) {
        config.data_onover.call($$.api, closest);
        state.mouseover = closest;
      }
    }
  },
  /**
   * Unselect EventRect.
   * @private
   */
  unselectRect() {
    const $$ = this;
    const { $el: { circle, tooltip } } = $$;
    $$.$el.svg.select(`.${$EVENT.eventRect}`).style("cursor", null);
    $$.hideGridFocus();
    if (tooltip) {
      $$.hideTooltip();
      $$._handleLinkedCharts(false);
    }
    circle && !$$.isPointFocusOnly() && $$.unexpandCircles();
    $$.expandBarTypeShapes(false);
  },
  /**
   * Create eventRect for each data on the x-axis.
   * Register touch and drag events.
   * @param {object} eventRectEnter d3.select($EVENT.eventRects) object.
   * @returns {object} d3.select($EVENT.eventRects) object.
   * @private
   */
  generateEventRectsForSingleX(eventRectEnter) {
    const $$ = this;
    const { config, state } = $$;
    const { eventReceiver } = state;
    const rect = eventRectEnter.style(
      "cursor",
      config.data_selection_enabled && config.data_selection_grouped ? "pointer" : null
    ).on("click", function(event) {
      state.event = event;
      const { currentIdx, data } = eventReceiver;
      const d = data[currentIdx === -1 ? $$.getDataIndexFromEvent(event) : currentIdx];
      $$.clickHandlerForSingleX.bind(this)(d, $$);
    }).datum({ multipleX: false });
    if (state.inputType === "mouse") {
      const getData = (event) => {
        const index = event ? $$.getDataIndexFromEvent(event) : eventReceiver.currentIdx;
        return index > -1 ? eventReceiver.data[index] : null;
      };
      rect.on("mouseover", (event) => {
        state.event = event;
        $$.updateEventRect();
        Object.values($$.$el.axisTooltip).forEach((v) => v == null ? void 0 : v.style("display", null));
      }).on("mousemove", function(event) {
        const d = getData(event);
        state.event = event;
        if (!d) {
          return;
        }
        let { index } = d;
        const stepType = config.line_step_type;
        if (config.line_step_tooltipMatch && $$.hasType("step") && /^step\-(before|after)$/.test(stepType)) {
          const scale = $$.scale.zoom || $$.scale.x;
          const xs = $$.axis.xs[index];
          const inverted = scale.invert(getPointer(event, this)[0]);
          if (stepType === "step-after" && inverted < xs) {
            index -= 1;
          } else if (stepType === "step-before" && inverted > xs) {
            index += 1;
          }
        }
        $$.showAxisGridFocus();
        const eventOnSameIdx = config.tooltip_grouped && index === eventReceiver.currentIdx;
        if (state.dragging || state.flowing || $$.hasArcType() || eventOnSameIdx) {
          config.tooltip_show && eventOnSameIdx && $$.setTooltipPosition();
          return;
        }
        if (index !== eventReceiver.currentIdx) {
          $$.setOverOut(false, eventReceiver.currentIdx);
          eventReceiver.currentIdx = index;
        }
        index === -1 ? $$.unselectRect() : $$.selectRectForSingle(this, index);
        $$.setOverOut(index !== -1, index);
      }).on("mouseout", (event) => {
        state.event = event;
        if (!config || $$.hasArcType() || eventReceiver.currentIdx === -1) {
          return;
        }
        $$.hideAxisGridFocus();
        $$.unselectRect();
        $$.setOverOut(false, eventReceiver.currentIdx);
        eventReceiver.currentIdx = -1;
      });
    }
    return rect;
  },
  clickHandlerForSingleX(d, ctx) {
    const $$ = ctx;
    const { config, state, $el: { main } } = $$;
    if (!d || $$.hasArcType() || state.cancelClick) {
      state.cancelClick && (state.cancelClick = false);
      return;
    }
    const { index } = d;
    main.selectAll(`.${$SHAPE.shape}-${index}`).each(function(d2) {
      var _a;
      if (config.data_selection_grouped || $$.isWithinShape(this, d2)) {
        (_a = $$.toggleShape) == null ? void 0 : _a.call($$, this, d2, index);
        config.data_onclick.bind($$.api)(d2, this);
      }
    });
  },
  /**
   * Create an eventRect,
   * Register touch and drag events.
   * @param {object} eventRectEnter d3.select($EVENT.eventRects) object.
   * @private
   */
  generateEventRectsForMultipleXs(eventRectEnter) {
    const $$ = this;
    const { state } = $$;
    eventRectEnter.on("click", function(event) {
      state.event = event;
      $$.clickHandlerForMultipleXS.bind(this)($$);
    }).datum({ multipleX: true });
    if (state.inputType === "mouse") {
      eventRectEnter.on("mouseover mousemove", function(event) {
        state.event = event;
        $$.selectRectForMultipleXs(this);
      }).on("mouseout", (event) => {
        state.event = event;
        if (!$$.config || $$.hasArcType()) {
          return;
        }
        $$.unselectRect();
      });
    }
  },
  clickHandlerForMultipleXS(ctx) {
    const $$ = ctx;
    const { config, state } = $$;
    const targetsToShow = $$.filterTargetsToShow($$.data.targets);
    if ($$.hasArcType(targetsToShow)) {
      return;
    }
    const mouse = getPointer(state.event, this);
    const closest = $$.findClosestFromTargets(targetsToShow, mouse);
    const sensitivity = config.point_sensitivity === "radius" ? closest.r : config.point_sensitivity;
    if (!closest) {
      return;
    }
    if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < sensitivity) {
      $$.$el.main.selectAll(`.${$SHAPE.shapes}${$$.getTargetSelectorSuffix(closest.id)}`).selectAll(`.${$SHAPE.shape}-${closest.index}`).each(function() {
        var _a;
        if (config.data_selection_grouped || $$.isWithinShape(this, closest)) {
          (_a = $$.toggleShape) == null ? void 0 : _a.call($$, this, closest, closest.index);
          config.data_onclick.bind($$.api)(closest, this);
        }
      });
    }
  }
});

// EXTERNAL MODULE: external {"commonjs":"d3-ease","commonjs2":"d3-ease","amd":"d3-ease","root":"d3"}
var external_commonjs_d3_ease_commonjs2_d3_ease_amd_d3_ease_root_d3_ = __webpack_require__(12);
;// CONCATENATED MODULE: ./src/ChartInternal/interactions/flow.ts




/* harmony default export */ var interactions_flow = ({
  /**
   * Generate flow
   * @param {object} args option object
   * @returns {Function}
   * @private
   */
  generateFlow(args) {
    const $$ = this;
    const { data, state, $el } = $$;
    return function() {
      const flowLength = args.flow.length;
      state.flowing = true;
      data.targets.forEach((d) => {
        d.values.splice(0, flowLength);
      });
      if ($$.updateXGrid) {
        $$.updateXGrid(true);
      }
      const elements = {};
      [
        "axis.x",
        "grid.x",
        "gridLines.x",
        "region.list",
        "text",
        "bar",
        "line",
        "area",
        "circle"
      ].forEach((v) => {
        const name = v.split(".");
        let node = $el[name[0]];
        if (node && name.length > 1) {
          node = node[name[1]];
        }
        if (node == null ? void 0 : node.size()) {
          elements[v] = node;
        }
      });
      $$.hideGridFocus();
      $$.setFlowList(elements, args);
    };
  },
  /**
   * Set flow list
   * @param {object} elements Target elements
   * @param {object} args option object
   * @private
   */
  setFlowList(elements, args) {
    const $$ = this;
    const { flow, targets } = args;
    const {
      duration = args.duration,
      index: flowIndex,
      length: flowLength,
      orgDataCount
    } = flow;
    const transform = $$.getFlowTransform(targets, orgDataCount, flowIndex, flowLength);
    const wait = generateWait();
    let n;
    wait.add(Object.keys(elements).map((v) => {
      n = elements[v].transition().ease(external_commonjs_d3_ease_commonjs2_d3_ease_amd_d3_ease_root_d3_.easeLinear).duration(duration);
      if (v === "axis.x") {
        n = n.call((g) => {
          $$.axis.x.setTransition(g).create(g);
        });
      } else if (v === "region.list") {
        n = n.filter($$.isRegionOnX).attr("transform", transform);
      } else {
        n = n.attr("transform", transform);
      }
      return n;
    }));
    n.call(wait, () => {
      $$.cleanUpFlow(elements, args);
    });
  },
  /**
   * Clean up flow
   * @param {object} elements Target elements
   * @param {object} args option object
   * @private
   */
  cleanUpFlow(elements, args) {
    const $$ = this;
    const { config, state, $el: { svg } } = $$;
    const isRotated = config.axis_rotated;
    const { flow, shape, xv } = args;
    const { cx, cy, xForText, yForText } = shape.pos;
    const {
      done = () => {
      },
      length: flowLength
    } = flow;
    if (flowLength) {
      ["circle", "text", "shape", "eventRect"].forEach((v) => {
        const target = [];
        for (let i = 0; i < flowLength; i++) {
          target.push(`.${classes[v]}-${i}`);
        }
        svg.selectAll(`.${classes[`${v}s`]}`).selectAll(target).remove();
      });
      svg.select(`.${classes.xgrid}`).remove();
    }
    Object.keys(elements).forEach((v) => {
      const n = elements[v];
      if (v !== "axis.x") {
        n.attr("transform", null);
      }
      if (v === "grid.x") {
        n.attr(state.xgridAttr);
      } else if (v === "gridLines.x") {
        n.attr("x1", isRotated ? 0 : xv).attr("x2", isRotated ? state.width : xv);
        n.select("text").attr("x", isRotated ? state.width : 0).attr("y", xv);
      } else if (/^(area|bar|line)$/.test(v)) {
        n.attr("d", shape.type[v]);
      } else if (v === "text") {
        n.attr("x", xForText).attr("y", yForText).style("fill-opacity", $$.opacityForText.bind($$));
      } else if (v === "circle") {
        if ($$.isCirclePoint()) {
          n.attr("cx", cx).attr("cy", cy);
        } else {
          const xFunc = (d) => cx(d) - config.point_r;
          const yFunc = (d) => cy(d) - config.point_r;
          n.attr("x", xFunc).attr("y", yFunc);
        }
      } else if (v === "region.list") {
        n.select("rect").filter($$.isRegionOnX).attr("x", $$.regionX.bind($$)).attr("width", $$.regionWidth.bind($$));
      }
    });
    config.interaction_enabled && $$.redrawEventRect();
    done.call($$.api);
    state.flowing = false;
  },
  /**
   * Get flow transform value
   * @param {object} targets target
   * @param {number} orgDataCount original data count
   * @param {number} flowIndex flow index
   * @param {number} flowLength flow length
   * @returns {string}
   * @private
   */
  getFlowTransform(targets, orgDataCount, flowIndex, flowLength) {
    const $$ = this;
    const { data, scale: { x } } = $$;
    const dataValues = data.targets[0].values;
    let flowStart = $$.getValueOnIndex(dataValues, flowIndex);
    let flowEnd = $$.getValueOnIndex(dataValues, flowIndex + flowLength);
    let translateX;
    const orgDomain = x.domain();
    const domain = $$.updateXDomain(targets, true, true);
    if (!orgDataCount) {
      if (dataValues.length !== 1) {
        translateX = x(orgDomain[0]) - x(domain[0]);
      } else {
        if ($$.axis.isTimeSeries()) {
          flowStart = $$.getValueOnIndex(dataValues, 0);
          flowEnd = $$.getValueOnIndex(dataValues, dataValues.length - 1);
          translateX = x(flowStart.x) - x(flowEnd.x);
        } else {
          translateX = diffDomain(domain) / 2;
        }
      }
    } else if (orgDataCount === 1 || (flowStart == null ? void 0 : flowStart.x) === (flowEnd == null ? void 0 : flowEnd.x)) {
      translateX = x(orgDomain[0]) - x(domain[0]);
    } else {
      translateX = $$.axis.isTimeSeries() ? x(orgDomain[0]) - x(domain[0]) : x((flowStart == null ? void 0 : flowStart.x) || 0) - x(flowEnd.x);
    }
    const scaleX = diffDomain(orgDomain) / diffDomain(domain);
    return `translate(${translateX},0) scale(${scaleX},1)`;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/clip.ts
/* harmony default export */ var clip = ({
  initClip() {
    const $$ = this;
    const { clip, datetimeId } = $$.state;
    clip.id = `${datetimeId}-clip`;
    clip.idXAxis = `${clip.id}-xaxis`;
    clip.idYAxis = `${clip.id}-yaxis`;
    clip.idGrid = `${clip.id}-grid`;
    clip.path = $$.getClipPath(clip.id);
    clip.pathXAxis = $$.getClipPath(clip.idXAxis);
    clip.pathYAxis = $$.getClipPath(clip.idYAxis);
    clip.pathGrid = $$.getClipPath(clip.idGrid);
  },
  getClipPath(id) {
    const $$ = this;
    const { config } = $$;
    if (!config.clipPath && /-clip$/.test(id) || !config.axis_x_clipPath && /-clip-xaxis$/.test(id) || !config.axis_y_clipPath && /-clip-yaxis$/.test(id)) {
      return null;
    }
    return `url(#${id})`;
  },
  appendClip(parent, id) {
    id && parent.append("clipPath").attr("id", id).append("rect");
  },
  /**
   * Set x Axis clipPath dimension
   * @param {d3Selecton} node clipPath <rect> selection
   * @private
   */
  setXAxisClipPath(node) {
    const $$ = this;
    const { config, state: { margin, width, height } } = $$;
    const isRotated = config.axis_rotated;
    const left = Math.max(30, margin.left) - (isRotated ? 0 : 20);
    const h = (isRotated ? margin.top + height + 10 : margin.bottom) + 20;
    const x = isRotated ? -(1 + left) : -(left - 1);
    const y = -15;
    const w = isRotated ? margin.left + 20 : width + 10 + left;
    node.attr("x", x).attr("y", y).attr("width", w).attr("height", h);
  },
  /**
   * Set y Axis clipPath dimension
   * @param {d3Selection} node clipPath <rect> selection
   * @private
   */
  setYAxisClipPath(node) {
    const $$ = this;
    const { config, state: { margin, width, height } } = $$;
    const isRotated = config.axis_rotated;
    const left = Math.max(30, margin.left) - (isRotated ? 20 : 0);
    const isInner = config.axis_y_inner;
    const x = isInner && !isRotated ? config.axis_y_label.text ? -20 : -1 : isRotated ? -(1 + left) : -(left - 1);
    const y = -(isRotated ? 20 : margin.top);
    const w = (isRotated ? width + 15 + left : margin.left + 20) + (isInner ? 20 : 0);
    const h = (isRotated ? margin.bottom + 10 : margin.top + height) + 10;
    node.attr("x", x).attr("y", y).attr("width", w).attr("height", h);
  },
  updateXAxisTickClip() {
    const $$ = this;
    const { config, state: { clip, xAxisHeight }, $el: { defs } } = $$;
    const newXAxisHeight = $$.getHorizontalAxisHeight("x");
    if (defs && !clip.idXAxisTickTexts) {
      const clipId = `${clip.id}-xaxisticktexts`;
      $$.appendClip(defs, clipId);
      clip.pathXAxisTickTexts = $$.getClipPath(clip.idXAxisTickTexts);
      clip.idXAxisTickTexts = clipId;
    }
    if (!config.axis_x_tick_multiline && $$.getAxisTickRotate("x") && newXAxisHeight !== xAxisHeight) {
      $$.setXAxisTickClipWidth();
      $$.setXAxisTickTextClipPathWidth();
    }
    $$.state.xAxisHeight = newXAxisHeight;
  },
  setXAxisTickClipWidth() {
    const $$ = this;
    const { config, state: { current: { maxTickSize } } } = $$;
    const xAxisTickRotate = $$.getAxisTickRotate("x");
    if (!config.axis_x_tick_multiline && xAxisTickRotate) {
      const sinRotation = Math.sin(Math.PI / 180 * Math.abs(xAxisTickRotate));
      maxTickSize.x.clipPath = ($$.getHorizontalAxisHeight("x") - 20) / sinRotation;
    } else {
      maxTickSize.x.clipPath = null;
    }
  },
  setXAxisTickTextClipPathWidth() {
    const $$ = this;
    const { state: { clip, current }, $el: { svg } } = $$;
    if (svg) {
      svg.select(`#${clip.idXAxisTickTexts} rect`).attr("width", current.maxTickSize.x.clipPath).attr("height", 30);
    }
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/grid.ts



const getGridTextAnchor = (d) => isValue(d.position) || "end";
const getGridTextDx = (d) => d.position === "start" ? 4 : d.position === "middle" ? 0 : -4;
function getGridTextX(isX, width, height) {
  return (d) => {
    let x = isX ? 0 : width;
    if (d.position === "start") {
      x = isX ? -height : 0;
    } else if (d.position === "middle") {
      x = (isX ? -height : width) / 2;
    }
    return x;
  };
}
function smoothLines(el, type) {
  if (type === "grid") {
    el.each(function() {
      const g = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      ["x1", "x2", "y1", "y2"].forEach((v) => g.attr(v, Math.ceil(+g.attr(v))));
    });
  }
}
/* harmony default export */ var internals_grid = ({
  hasGrid() {
    const { config } = this;
    return ["x", "y"].some((v) => config[`grid_${v}_show`] || config[`grid_${v}_lines`].length);
  },
  initGrid() {
    const $$ = this;
    $$.hasGrid() && $$.initGridLines();
    $$.initFocusGrid();
  },
  initGridLines() {
    const $$ = this;
    const { config, state: { clip }, $el } = $$;
    if (config.grid_x_lines.length || config.grid_y_lines.length) {
      $el.gridLines.main = $el.main.insert(
        "g",
        `.${$COMMON.chart}${config.grid_lines_front ? " + *" : ""}`
      ).attr("clip-path", clip.pathGrid).attr("class", `${$GRID.grid} ${$GRID.gridLines}`);
      $el.gridLines.main.append("g").attr("class", $GRID.xgridLines);
      $el.gridLines.main.append("g").attr("class", $GRID.ygridLines);
      $el.gridLines.x = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.selectAll)([]);
    }
  },
  updateXGrid(withoutUpdate) {
    const $$ = this;
    const { config, scale, state, $el: { main, grid } } = $$;
    const isRotated = config.axis_rotated;
    const xgridData = $$.generateGridData(config.grid_x_type, scale.x);
    const tickOffset = $$.axis.isCategorized() ? $$.axis.x.tickOffset() : 0;
    const pos = (d) => (scale.zoom || scale.x)(d) + tickOffset * (isRotated ? -1 : 1);
    state.xgridAttr = isRotated ? {
      x1: 0,
      x2: state.width,
      y1: pos,
      y2: pos
    } : {
      x1: pos,
      x2: pos,
      y1: 0,
      y2: state.height
    };
    grid.x = main.select(`.${$GRID.xgrids}`).selectAll(`.${$GRID.xgrid}`).data(xgridData);
    grid.x.exit().remove();
    grid.x = grid.x.enter().append("line").attr("class", $GRID.xgrid).merge(grid.x);
    if (!withoutUpdate) {
      grid.x.each(function() {
        const grid2 = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
        Object.keys(state.xgridAttr).forEach((id) => {
          grid2.attr(id, state.xgridAttr[id]).style("opacity", () => grid2.attr(isRotated ? "y1" : "x1") === (isRotated ? state.height : 0) ? "0" : null);
        });
      });
    }
  },
  updateYGrid() {
    const $$ = this;
    const { axis, config, scale, state, $el: { grid, main } } = $$;
    const isRotated = config.axis_rotated;
    const pos = (d) => Math.ceil(scale.y(d));
    const gridValues = axis.y.getGeneratedTicks(config.grid_y_ticks) || $$.scale.y.ticks(config.grid_y_ticks);
    grid.y = main.select(`.${$GRID.ygrids}`).selectAll(`.${$GRID.ygrid}`).data(gridValues);
    grid.y.exit().remove();
    grid.y = grid.y.enter().append("line").attr("class", $GRID.ygrid).merge(grid.y);
    grid.y.attr("x1", isRotated ? pos : 0).attr("x2", isRotated ? pos : state.width).attr("y1", isRotated ? 0 : pos).attr("y2", isRotated ? state.height : pos);
    smoothLines(grid.y, "grid");
  },
  updateGrid() {
    const $$ = this;
    const { $el: { grid, gridLines } } = $$;
    !gridLines.main && $$.initGridLines();
    grid.main.style("visibility", $$.hasArcType() ? "hidden" : null);
    $$.hideGridFocus();
    $$.updateGridLines("x");
    $$.updateGridLines("y");
  },
  /**
   * Update Grid lines
   * @param {string} type x | y
   * @private
   */
  updateGridLines(type) {
    const $$ = this;
    const { config, $el: { gridLines, main }, $T } = $$;
    const isRotated = config.axis_rotated;
    const isX = type === "x";
    config[`grid_${type}_show`] && $$[`update${type.toUpperCase()}Grid`]();
    let lines = main.select(`.${$GRID[`${type}gridLines`]}`).selectAll(`.${$GRID[`${type}gridLine`]}`).data(config[`grid_${type}_lines`]);
    $T(lines.exit()).style("opacity", "0").remove();
    const gridLine = lines.enter().append("g");
    gridLine.append("line").style("opacity", "0");
    lines = gridLine.merge(lines);
    lines.each(function(d) {
      const g = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      if (g.select("text").empty() && d.text) {
        g.append("text").style("opacity", "0");
      }
    });
    $T(lines.attr("class", (d) => `${$GRID[`${type}gridLine`]} ${d.class || ""}`.trim()).select("text").attr("text-anchor", getGridTextAnchor).attr(
      "transform",
      () => isX ? isRotated ? null : "rotate(-90)" : isRotated ? "rotate(-90)" : null
    ).attr("dx", getGridTextDx).attr("dy", -5)).text(function(d) {
      var _a;
      return (_a = d.text) != null ? _a : this.remove();
    });
    gridLines[type] = lines;
  },
  redrawGrid(withTransition) {
    const $$ = this;
    const {
      config: { axis_rotated: isRotated },
      state: { width, height },
      $el: { gridLines },
      $T
    } = $$;
    const xv = $$.xv.bind($$);
    const yv = $$.yv.bind($$);
    let xLines = gridLines.x.select("line");
    let xTexts = gridLines.x.select("text");
    let yLines = gridLines.y.select("line");
    let yTexts = gridLines.y.select("text");
    xLines = $T(xLines, withTransition).attr("x1", isRotated ? 0 : xv).attr("x2", isRotated ? width : xv).attr("y1", isRotated ? xv : 0).attr("y2", isRotated ? xv : height);
    xTexts = $T(xTexts, withTransition).attr("x", getGridTextX(!isRotated, width, height)).attr("y", xv);
    yLines = $T(yLines, withTransition).attr("x1", isRotated ? yv : 0).attr("x2", isRotated ? yv : width).attr("y1", isRotated ? 0 : yv).attr("y2", isRotated ? height : yv);
    yTexts = $T(yTexts, withTransition).attr("x", getGridTextX(isRotated, width, height)).attr("y", yv);
    return [
      xLines.style("opacity", null),
      xTexts.style("opacity", null),
      yLines.style("opacity", null),
      yTexts.style("opacity", null)
    ];
  },
  initFocusGrid() {
    const $$ = this;
    const { config, state: { clip }, $el } = $$;
    const isFront = config.grid_front;
    const className = `.${isFront && $el.gridLines.main ? $GRID.gridLines : $COMMON.chart}${isFront ? " + *" : ""}`;
    const grid = $el.main.insert("g", className).attr("clip-path", clip.pathGrid).attr("class", $GRID.grid);
    $el.grid.main = grid;
    config.grid_x_show && grid.append("g").attr("class", $GRID.xgrids);
    config.grid_y_show && grid.append("g").attr("class", $GRID.ygrids);
    if (config.axis_tooltip) {
      const axis = grid.append("g").attr("class", "bb-axis-tooltip");
      axis.append("line").attr("class", "bb-axis-tooltip-x");
      axis.append("line").attr("class", "bb-axis-tooltip-y");
    }
    if (config.interaction_enabled && config.grid_focus_show && !config.axis_tooltip) {
      grid.append("g").attr("class", $FOCUS.xgridFocus).append("line").attr("class", $FOCUS.xgridFocus);
      if (config.grid_focus_y && !config.tooltip_grouped) {
        grid.append("g").attr("class", $FOCUS.ygridFocus).append("line").attr("class", $FOCUS.ygridFocus);
      }
    }
  },
  showAxisGridFocus() {
    var _a, _b;
    const $$ = this;
    const { config, format, state: { event, width, height } } = $$;
    const isRotated = config.axis_rotated;
    const [x, y] = getPointer(event, (_a = $$.$el.eventRect) == null ? void 0 : _a.node());
    const pos = { x, y };
    for (const [axis, node] of Object.entries($$.$el.axisTooltip)) {
      const attr = axis === "x" && !isRotated || axis !== "x" && isRotated ? "x" : "y";
      const value = pos[attr];
      let scaleText = (_b = $$.scale[axis]) == null ? void 0 : _b.invert(value);
      if (scaleText) {
        scaleText = axis === "x" && $$.axis.isTimeSeries() ? format.xAxisTick(scaleText) : scaleText == null ? void 0 : scaleText.toFixed(2);
        node == null ? void 0 : node.attr(attr, value).text(scaleText);
      }
    }
    $$.$el.main.selectAll(
      `line.bb-axis-tooltip-x, line.bb-axis-tooltip-y`
    ).style("visibility", null).each(function(d, i) {
      const line = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      if (i === 0) {
        line.attr("x1", x).attr("x2", x).attr("y1", i ? 0 : height).attr("y2", i ? height : 0);
      } else {
        line.attr("x1", i ? 0 : width).attr("x2", i ? width : 0).attr("y1", y).attr("y2", y);
      }
    });
  },
  hideAxisGridFocus() {
    const $$ = this;
    $$.$el.main.selectAll(
      `line.bb-axis-tooltip-x, line.bb-axis-tooltip-y`
    ).style("visibility", "hidden");
    Object.values($$.$el.axisTooltip).forEach((v) => v == null ? void 0 : v.style("display", "none"));
  },
  /**
   * Show grid focus line
   * @param {Array} data Selected data
   * @private
   */
  showGridFocus(data) {
    var _a;
    const $$ = this;
    const { config, state: { width, height } } = $$;
    const isRotated = config.axis_rotated;
    const focusEl = $$.$el.main.selectAll(
      `line.${$FOCUS.xgridFocus}, line.${$FOCUS.ygridFocus}`
    );
    const dataToShow = (data || [focusEl.datum()]).filter(
      (d) => d && isValue($$.getBaseValue(d))
    );
    if (!config.tooltip_show || dataToShow.length === 0 || !config.axis_x_forceAsSingle && $$.hasType("bubble") || $$.hasArcType()) {
      return;
    }
    const isEdge = config.grid_focus_edge && !config.tooltip_grouped;
    const xx = $$.xx.bind($$);
    focusEl.style("visibility", null).data(dataToShow.concat(dataToShow)).each(function(d) {
      const el = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      const pos = {
        x: xx(d),
        y: $$.getYScaleById(d.id)(d.value)
      };
      let xy;
      if (el.classed($FOCUS.xgridFocus)) {
        xy = isRotated ? [
          null,
          // x1
          pos.x,
          // y1
          isEdge ? pos.y : width,
          // x2
          pos.x
          // y2
        ] : [
          pos.x,
          isEdge ? pos.y : null,
          pos.x,
          height
        ];
      } else {
        const isY2 = $$.axis.getId(d.id) === "y2";
        xy = isRotated ? [
          pos.y,
          // x1
          isEdge && !isY2 ? pos.x : null,
          // y1
          pos.y,
          // x2
          isEdge && isY2 ? pos.x : height
          // y2
        ] : [
          isEdge && isY2 ? pos.x : null,
          pos.y,
          isEdge && !isY2 ? pos.x : width,
          pos.y
        ];
      }
      ["x1", "y1", "x2", "y2"].forEach((v, i) => el.attr(v, xy[i]));
    });
    smoothLines(focusEl, "grid");
    (_a = $$.showCircleFocus) == null ? void 0 : _a.call($$, data);
  },
  hideGridFocus() {
    var _a;
    const $$ = this;
    const { state: { inputType, resizing }, $el: { main } } = $$;
    if (inputType === "mouse" || !resizing) {
      main.selectAll(`line.${$FOCUS.xgridFocus}, line.${$FOCUS.ygridFocus}`).style("visibility", "hidden");
      (_a = $$.hideCircleFocus) == null ? void 0 : _a.call($$);
    }
  },
  updateGridFocus() {
    var _a;
    const $$ = this;
    const { state: { inputType, width, height, resizing }, $el: { grid } } = $$;
    const xgridFocus = grid.main.select(`line.${$FOCUS.xgridFocus}`);
    if (inputType === "touch") {
      if (xgridFocus.empty()) {
        resizing && ((_a = $$.showCircleFocus) == null ? void 0 : _a.call($$));
      } else {
        $$.showGridFocus();
      }
    } else {
      const isRotated = $$.config.axis_rotated;
      xgridFocus.attr("x1", isRotated ? 0 : -10).attr("x2", isRotated ? width : -10).attr("y1", isRotated ? -10 : 0).attr("y2", isRotated ? -10 : height);
    }
    return true;
  },
  generateGridData(type, scale) {
    const $$ = this;
    const tickNum = $$.$el.main.select(`.${$AXIS.axisX}`).selectAll(".tick").size();
    let gridData = [];
    if (type === "year") {
      const xDomain = $$.getXDomain();
      const [firstYear, lastYear] = xDomain.map((v) => v.getFullYear());
      for (let i = firstYear; i <= lastYear; i++) {
        gridData.push(/* @__PURE__ */ new Date(`${i}-01-01 00:00:00`));
      }
    } else {
      gridData = scale.ticks(10);
      if (gridData.length > tickNum) {
        gridData = gridData.filter((d) => String(d).indexOf(".") < 0);
      }
    }
    return gridData;
  },
  getGridFilterToRemove(params) {
    return params ? (line) => {
      let found = false;
      (isArray(params) ? params.concat() : [params]).forEach((param) => {
        if ("value" in param && line.value === param.value || "class" in param && line.class === param.class) {
          found = true;
        }
      });
      return found;
    } : () => true;
  },
  removeGridLines(params, forX) {
    const $$ = this;
    const { config, $T } = $$;
    const toRemove = $$.getGridFilterToRemove(params);
    const toShow = (line) => !toRemove(line);
    const classLines = forX ? $GRID.xgridLines : $GRID.ygridLines;
    const classLine = forX ? $GRID.xgridLine : $GRID.ygridLine;
    $T($$.$el.main.select(`.${classLines}`).selectAll(`.${classLine}`).filter(toRemove)).style("opacity", "0").remove();
    const gridLines = `grid_${forX ? "x" : "y"}_lines`;
    config[gridLines] = config[gridLines].filter(toShow);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/region.ts



/* harmony default export */ var region = ({
  initRegion() {
    const $$ = this;
    const { $el } = $$;
    $el.region.main = $el.main.insert("g", ":first-child").attr("clip-path", $$.state.clip.path).attr("class", $REGION.regions);
  },
  updateRegion() {
    const $$ = this;
    const { config, $el: { region }, $T } = $$;
    if (!region.main) {
      $$.initRegion();
    }
    region.main.style("visibility", $$.hasArcType() ? "hidden" : null);
    const regions = region.main.selectAll(`.${$REGION.region}`).data(config.regions);
    $T(regions.exit()).style("opacity", "0").remove();
    const regionsEnter = regions.enter().append("g");
    regionsEnter.append("rect").style("fill-opacity", "0");
    region.list = regionsEnter.merge(regions).attr("class", $$.classRegion.bind($$));
    region.list.each(function(d) {
      var _a;
      const g = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      if (g.select("text").empty() && ((_a = d.label) == null ? void 0 : _a.text)) {
        (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).append("text").style("opacity", "0");
      }
    });
  },
  redrawRegion(withTransition) {
    const $$ = this;
    const { $el: { region }, $T } = $$;
    let regions = region.list.select("rect");
    let label = region.list.selectAll("text");
    regions = $T(regions, withTransition).attr("x", $$.regionX.bind($$)).attr("y", $$.regionY.bind($$)).attr("width", $$.regionWidth.bind($$)).attr("height", $$.regionHeight.bind($$));
    label = $T(label, withTransition).attr("transform", (d) => {
      var _a;
      const { x = 0, y = 0, rotated = false } = (_a = d.label) != null ? _a : {};
      return `translate(${$$.regionX.bind($$)(d) + x}, ${$$.regionY.bind($$)(d) + y})${rotated ? ` rotate(-90)` : ``}`;
    }).attr("text-anchor", (d) => {
      var _a;
      return ((_a = d.label) == null ? void 0 : _a.rotated) ? "end" : null;
    }).attr("dy", "1em").style("fill", (d) => {
      var _a, _b;
      return (_b = (_a = d.label) == null ? void 0 : _a.color) != null ? _b : null;
    }).text((d) => {
      var _a;
      return (_a = d.label) == null ? void 0 : _a.text;
    });
    return [
      regions.style("fill-opacity", (d) => isValue(d.opacity) ? d.opacity : null).on("end", function() {
        (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this.parentNode).selectAll("rect:not([x])").remove();
      }),
      label.style("opacity", null)
    ];
  },
  getRegionXY(type, d) {
    const $$ = this;
    const { config, scale } = $$;
    const isRotated = config.axis_rotated;
    const isX = type === "x";
    let key = "start";
    let currScale;
    let pos = 0;
    if (d.axis === "y" || d.axis === "y2") {
      if (!isX) {
        key = "end";
      }
      if ((isX ? isRotated : !isRotated) && key in d) {
        currScale = scale[d.axis];
        pos = currScale(d[key]);
      }
    } else if ((isX ? !isRotated : isRotated) && key in d) {
      currScale = scale.zoom || scale.x;
      pos = currScale($$.axis.isTimeSeries() ? parseDate.call($$, d[key]) : d[key]);
    }
    return pos;
  },
  regionX(d) {
    return this.getRegionXY("x", d);
  },
  regionY(d) {
    return this.getRegionXY("y", d);
  },
  getRegionSize(type, d) {
    const $$ = this;
    const { config, scale, state } = $$;
    const isRotated = config.axis_rotated;
    const isWidth = type === "width";
    const start = $$[isWidth ? "regionX" : "regionY"](d);
    let currScale;
    let key = "end";
    let end = state[type];
    if (d.axis === "y" || d.axis === "y2") {
      if (!isWidth) {
        key = "start";
      }
      if ((isWidth ? isRotated : !isRotated) && key in d) {
        currScale = scale[d.axis];
        end = currScale(d[key]);
      }
    } else if ((isWidth ? !isRotated : isRotated) && key in d) {
      currScale = scale.zoom || scale.x;
      end = currScale($$.axis.isTimeSeries() ? parseDate.call($$, d[key]) : d[key]);
    }
    return end < start ? 0 : end - start;
  },
  regionWidth(d) {
    return this.getRegionSize("width", d);
  },
  regionHeight(d) {
    return this.getRegionSize("height", d);
  },
  isRegionOnX(d) {
    return !d.axis || d.axis === "x";
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/internals/size.axis.ts

/* harmony default export */ var size_axis = ({
  /**
   * Get Axis size according its position
   * @param {string} id Axis id value - x, y or y2
   * @returns {number} size Axis size value
   * @private
   */
  getAxisSize(id) {
    const $$ = this;
    const isRotated = $$.config.axis_rotated;
    return isRotated && id === "x" || !isRotated && /y2?/.test(id) ? $$.getAxisWidthByAxisId(id, true) : $$.getHorizontalAxisHeight(id);
  },
  getAxisWidthByAxisId(id, withoutRecompute) {
    var _a, _b;
    const $$ = this;
    if ($$.axis) {
      const position = (_a = $$.axis) == null ? void 0 : _a.getLabelPositionById(id);
      const { width } = $$.axis.getMaxTickSize(id, withoutRecompute);
      const gap = width === 0 ? 0.5 : 0;
      return width + (((_b = $$.config.padding) == null ? void 0 : _b.mode) === "fit" ? position.isInner ? 10 + gap : 10 : position.isInner ? 20 + gap : 40);
    } else {
      return 40;
    }
  },
  getHorizontalAxisHeight(id) {
    var _a, _b;
    const $$ = this;
    const { config, state } = $$;
    const { rotatedPadding, isLegendRight, isLegendInset } = state;
    const isRotated = config.axis_rotated;
    const isFitPadding = ((_a = config.padding) == null ? void 0 : _a.mode) === "fit";
    const isInner = config[`axis_${id}_inner`];
    const hasLabelText = config[`axis_${id}_label`].text;
    const defaultHeight = 13;
    let h = ((_b = config.padding) == null ? void 0 : _b.mode) === "fit" ? isInner && !hasLabelText ? id === "y" ? 1 : 0 : 20 : 30;
    if (id === "x" && !config.axis_x_show) {
      return 8;
    }
    if (id === "x" && isNumber(config.axis_x_height)) {
      return config.axis_x_height;
    }
    if (id === "y" && !config.axis_y_show) {
      return config.legend_show && !isLegendRight && !isLegendInset ? 10 : 1;
    }
    if (id === "y2" && !config.axis_y2_show) {
      return isFitPadding ? 0 : rotatedPadding.top;
    }
    const maxtickSize = $$.axis.getMaxTickSize(id);
    const isXAxisTickRotated = Math.abs(config.axis_x_tick_rotate) > 0 && (!config.axis_x_tick_autorotate || $$.needToRotateXAxisTickTexts());
    if ((config.axis_x_tick_multiline || isXAxisTickRotated) && maxtickSize.height > defaultHeight) {
      h += maxtickSize.height - defaultHeight;
    }
    return h + ($$.axis.getLabelPositionById(id).isInner ? 0 : 10) + (id === "y2" && !isRotated ? -10 : 0);
  },
  getEventRectWidth() {
    const $$ = this;
    const { config, axis } = $$;
    const isInverted = config.axis_x_inverted;
    const tickInterval = axis.x.tickInterval();
    return Math.max(0, isInverted ? Math.abs(tickInterval) : tickInterval);
  },
  /**
   * Get axis tick test rotate value
   * @param {string} id Axis id
   * @returns {number} rotate value
   * @private
   */
  getAxisTickRotate(id) {
    const $$ = this;
    const { axis, config, state, $el } = $$;
    let rotate = config[`axis_${id}_tick_rotate`];
    if (id === "x") {
      const allowedXAxisTypes = axis.isCategorized() || axis.isTimeSeries();
      if (config.axis_x_tick_fit && allowedXAxisTypes) {
        const xTickCount = config.axis_x_tick_count;
        const currentXTicksLength = state.current.maxTickSize.x.ticks.length;
        let tickCount = 0;
        if (xTickCount) {
          tickCount = xTickCount > currentXTicksLength ? currentXTicksLength : xTickCount;
        } else if (currentXTicksLength) {
          tickCount = currentXTicksLength;
        }
        if (tickCount !== state.axis.x.tickCount) {
          const { targets } = $$.data;
          state.axis.x.padding = $$.getXDomainPadding([
            $$.getXDomainMinMax(targets, "min"),
            $$.getXDomainMinMax(targets, "max")
          ], tickCount);
        }
        state.axis.x.tickCount = tickCount;
      }
      if ($el.svg && config.axis_x_tick_autorotate && config.axis_x_tick_fit && !config.axis_x_tick_multiline && !config.axis_x_tick_culling && allowedXAxisTypes) {
        rotate = $$.needToRotateXAxisTickTexts() ? config.axis_x_tick_rotate : 0;
      }
    }
    return rotate;
  },
  /**
   * Check weather axis tick text needs to be rotated
   * @returns {boolean}
   * @private
   */
  needToRotateXAxisTickTexts() {
    const $$ = this;
    const { state: { axis, current, isLegendRight, legendItemWidth } } = $$;
    const legendWidth = isLegendRight && legendItemWidth;
    const xAxisLength = current.width - legendWidth - $$.getCurrentPaddingByDirection("left") - $$.getCurrentPaddingByDirection("right");
    const tickCountWithPadding = axis.x.tickCount + axis.x.padding.left + axis.x.padding.right;
    const { width } = $$.axis.getMaxTickSize("x");
    const tickLength = tickCountWithPadding ? xAxisLength / tickCountWithPadding : 0;
    return width > tickLength;
  }
});

;// CONCATENATED MODULE: ./src/config/Options/axis/x.ts
/* harmony default export */ var axis_x = ({
  /**
   * Set clip-path attribute for x axis element
   * @name axis․x․clipPath
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo]()
   * @example
   * // don't set 'clip-path' attribute
   * clipPath: false
   */
  axis_x_clipPath: true,
  /**
   * Show or hide x axis.
   * @name axis․x․show
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * axis: {
   *   x: {
   *     show: false
   *   }
   * }
   */
  axis_x_show: true,
  /**
   * Force the x axis to interact as single rather than multiple x axes.
   * - **NOTE:** The tooltip event will be triggered nearing each data points(for multiple xs) rather than x axis based(as single x does) in below condition:
   *   - for `bubble` & `scatter` type
   *   - when `data.xs` is set
   *   - when `tooltip.grouped=false` is set
   *     - `tooltip.grouped` options will take precedence over `axis.forceSingleX` option.
   * @name axis․x․forceAsSingle
   * @memberof Options
   * @type {boolean}
   * @default false
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.ForceAsSingle)
   * @example
   * axis: {
   *   x: {
   *      // will work as single x axis
   *      forceAsSingle: true
   *   }
   * }
   */
  axis_x_forceAsSingle: false,
  /**
   * Set type of x axis.<br><br>
   * **Available Values:**
   * - category
   * - indexed
   * - log
   * - timeseries
   *
   * **NOTE:**<br>
   * - **log** type:
   *   - the x values specified by [`data.x`](#.data%25E2%2580%25A4x)(or by any equivalent option), must be exclusively-positive.
   *   - x axis min value should be >= 0.
   *   - for 'category' type, `data.xs` option isn't supported.
   * @name axis․x․type
   * @memberof Options
   * @type {string}
   * @default indexed
   * @see [Demo: indexed](https://naver.github.io/billboard.js/demo/#Chart.AreaChart)
   * @see [Demo: timeseries](https://naver.github.io/billboard.js/demo/#Chart.TimeseriesChart)
   * @see [Demo: category](https://naver.github.io/billboard.js/demo/#Data.CategoryData)
   * @see [Demo: log](https://naver.github.io/billboard.js/demo/#Axis.LogScales)
   * @example
   * axis: {
   *   x: {
   *     type: "timeseries"
   *   }
   * }
   */
  axis_x_type: "indexed",
  /**
   * Set how to treat the timezone of x values.<br>
   * If true, treat x value as localtime. If false, convert to UTC internally.
   * @name axis․x․localtime
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * axis: {
   *   x: {
   *     localtime: false
   *   }
   * }
   */
  axis_x_localtime: true,
  /**
   * Set category names on category axis.
   * This must be an array that includes category names in string. If category names are included in the date by data.x option, this is not required.
   * @name axis․x․categories
   * @memberof Options
   * @type {Array}
   * @default []
   * @example
   * axis: {
   *   x: {
   *     categories: ["Category 1", "Category 2", ...]
   *   }
   * }
   */
  axis_x_categories: [],
  /**
   * centerize ticks on category axis.
   * @name axis․x․tick․centered
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       centered: true
   *     }
   *   }
   * }
   */
  axis_x_tick_centered: false,
  /**
   * A function to format tick value. Format string is also available for timeseries data.
   * @name axis․x․tick․format
   * @memberof Options
   * @type {Function|string}
   * @default undefined
   * @see [D3's time specifier](https://d3js.org/d3-time-format#locale_format)
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *        // for timeseries, a 'datetime' object is given as parameter
   *       format: function(x) {
   *           return x.getFullYear();
   *       }
   *
   *       // for category, index(Number) and categoryName(String) are given as parameter
   *       format: function(index, categoryName) {
   *           return categoryName.substr(0, 10);
   *       },
   *
   *        // for timeseries format specifier
   *        format: "%Y-%m-%d %H:%M:%S"
   *     }
   *   }
   * }
   */
  axis_x_tick_format: void 0,
  /**
   * Setting for culling ticks.
   * - `true`: the ticks will be culled, then only limited tick text will be shown.<br>
   *   This option does not hide the tick lines by default, if want to hide tick lines, set `axis.x.tick.culling.lines=false`.
   * - `false`: all of ticks will be shown.<br><br>
   * The number of ticks to be shown can be chaned by `axis.x.tick.culling.max`.
   * @name axis․x․tick․culling
   * @memberof Options
   * @type {boolean}
   * @default
   * `true` for indexed axis and timeseries axis, `false` for category axis
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       culling: false
   *     }
   *   }
   * }
   */
  axis_x_tick_culling: {},
  /**
   * The number of tick texts will be adjusted to less than this value.
   * @name axis․x․tick․culling․max
   * @memberof Options
   * @type {number}
   * @default 10
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       culling: {
   *           max: 5
   *       }
   *     }
   *   }
   * }
   */
  axis_x_tick_culling_max: 10,
  /**
   * Control visibility of tick lines within culling option, along with tick text.
   * @name axis․x․tick․culling․lines
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       culling: {
   *           lines: false,
   *       }
   *     }
   *   }
   * }
   */
  axis_x_tick_culling_lines: true,
  /**
   * The number of x axis ticks to show.<br><br>
   * This option hides tick lines together with tick text. If this option is used on timeseries axis, the ticks position will be determined precisely and not nicely positioned (e.g. it will have rough second value).
   * @name axis․x․tick․count
   * @memberof Options
   * @type {number}
   * @default undefined
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       count: 5
   *     }
   *   }
   * }
   */
  axis_x_tick_count: void 0,
  /**
   * Show or hide x axis tick line.
   * @name axis․x․tick․show
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       show: false
   *     }
   *   }
   * }
   */
  axis_x_tick_show: true,
  /**
   * Show or hide x axis tick text.
   * @name axis․x․tick․text․show
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       text: {
   *           show: false
   *       }
   *     }
   *   }
   * }
   */
  axis_x_tick_text_show: true,
  /**
   * Set the first/last axis tick text to be positioned inside of the chart on non-rotated axis.
   * @name axis․x․tick․text․inner
   * @memberof Options
   * @type {boolean|object}
   * @default false
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickInner)
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       text: {
   *          inner: true,
   *
   *          // or specify each position of the first and last tick text
   *          inner: {
   *       	   first: true,
   *       	   last: true
   *       	}
   *       }
   *     }
   *   }
   * }
   */
  axis_x_tick_text_inner: false,
  /**
   * Set the x Axis tick text's position relatively its original position
   * @name axis․x․tick․text․position
   * @memberof Options
   * @type {object}
   * @default {x: 0, y:0}
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       text: {
   *         position: {
   *           x: 10,
   *           y: 10
   *         }
   *       }
   *     }
   *   }
   * }
   */
  axis_x_tick_text_position: { x: 0, y: 0 },
  /**
   * Fit x axis ticks.
   * - **true**: ticks will be shown according to x value of the data points.
   * - **false**: ticks will be shown as to have same intervals.
   * @name axis․x․tick․fit
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickFitting)
   * @see [Demo: for timeseries zoom](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickTimeseries)
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       fit: false
   *     }
   *   }
   * }
   */
  axis_x_tick_fit: true,
  /**
   * Set the x values of ticks manually.<br><br>
   * If this option is provided, the position of the ticks will be determined based on those values.<br>
   * This option works with `timeseries` data and the x values will be parsed accoding to the type of the value and data.xFormat option.
   * @name axis․x․tick․values
   * @memberof Options
   * @type {Array|Function}
   * @default null
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       values: [1, 2, 4, 8, 16, 32, ...],
   *
   *       // an Array value should be returned
   *       values: function() {
   *       	return [ ... ];
   *       }
   *     }
   *   }
   * }
   */
  axis_x_tick_values: null,
  /**
   * Rotate x axis tick text if there is not enough space for 'category' and 'timeseries' type axis.
   * - **NOTE:** The conditions where `autorotate` is enabled are:
   *   - axis.x.type='category' or 'timeseries
   *   - axis.x.tick.multiline=false
   *   - axis.x.tick.culling=false
   *   - axis.x.tick.fit=true
   * - **NOTE:** axis.x.tick.clippath=false is necessary for calculating the overflow padding between the end of x axis and the width of the SVG
   * @name axis․x․tick․autorotate
   * @memberof Options
   * @type {boolean}
   * @default false
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickAutorotate)
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       rotate: 15,
   *       autorotate: true,
   *       multiline: false,
   *       culling: false,
   *       fit: true
   *     },
   *     clipPath: false
   *   }
   * }
   */
  axis_x_tick_autorotate: false,
  /**
   * Rotate x axis tick text.
   * - If you set negative value, it will rotate to opposite direction.
   * - Applied when [`axis.rotated`](#.axis%25E2%2580%25A4rotated) option is `false`.
   * - As long as `axis_x_tick_fit` is set to `true` it will calculate an overflow for the y2 axis and add this value to the right padding.
   * @name axis․x․tick․rotate
   * @memberof Options
   * @type {number}
   * @default 0
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.RotateXAxisTickText)
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       rotate: 60
   *     }
   *   }
   * }
   */
  axis_x_tick_rotate: 0,
  /**
   * Show x axis outer tick.
   * @name axis․x․tick․outer
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       outer: false
   *     }
   *   }
   * }
   */
  axis_x_tick_outer: true,
  /**
   * Set tick text to be multiline
   * - **NOTE:**
   *  > When x tick text contains `\n`, it's used as line break and 'axis.x.tick.width' option is ignored.
   * @name axis․x․tick․multiline
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.XAxisTickMultiline)
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       multiline: false
   *     }
   *   }
   * }
   * @example
   * // example of line break with '\n'
   * // In this case, 'axis.x.tick.width' is ignored
   * data: {
   *    x: "x",
   *    columns: [
   *        ["x", "long\ntext", "Another\nLong\nText"],
   *        ...
   *    ],
   * }
   */
  axis_x_tick_multiline: true,
  /**
   * Set tick width
   * - **NOTE:**
   *  > When x tick text contains `\n`, this option is ignored.
   * @name axis․x․tick․width
   * @memberof Options
   * @type {number}
   * @default null
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       width: 50
   *     }
   *   }
   * }
   */
  axis_x_tick_width: null,
  /**
   * Set to display system tooltip(via `<title>` element) for tick text
   * - **NOTE:** Only available for category axis type (`axis.x.type='category'`)
   * @name axis․x․tick․tooltip
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * axis: {
   *   x: {
   *     tick: {
   *       tooltip: true
   *     }
   *   }
   * }
   */
  axis_x_tick_tooltip: false,
  /**
   * Set max value of x axis range.
   * @name axis․x․max
   * @memberof Options
   * @property {number} max Set the max value
   * @property {boolean} [max.fit=false] When specified `max.value` is greater than the bound data value, setting `true` will make x axis max to be fitted to the bound data max value.
   * - **NOTE:** If the bound data max value is greater than the `max.value`, the x axis max will be limited as the given `max.value`.
   * @property {number} [max.value] Set the max value
   * @example
   * axis: {
   *   x: {
   *     max: 100,
   *
   *     max: {
   *       // 'fit=true' will make x axis max to be limited as the bound data value max when 'max.value' is greater.
   *       // - when bound data max is '10' and max.value: '100' ==>  x axis max will be '10'
   *       // - when bound data max is '1000' and max.value: '100' ==> x axis max will be '100'
   *       fit: true,
   *       value: 100
   *     }
   *   }
   * }
   */
  axis_x_max: void 0,
  /**
   * Set min value of x axis range.
   * @name axis․x․min
   * @memberof Options
   * @property {number} min Set the min value
   * @property {boolean} [min.fit=false] When specified `min.value` is lower than the bound data value, setting `true` will make x axis min to be fitted to the bound data min value.
   * - **NOTE:** If the bound data min value is lower than the `min.value`, the x axis min will be limited as the given `min.value`.
   * @property {number} [min.value] Set the min value
   * @example
   * axis: {
   *   x: {
   *     min: -100,
   *
   *     min: {
   *       // 'fit=true' will make x axis min to be limited as the bound data value min when 'min.value' is lower.
   *       // - when bound data min is '-10' and min.value: '-100' ==>  x axis min will be '-10'
   *       // - when bound data min is '-1000' and min.value: '-100' ==> x axis min will be '-100'
   *       fit: true,
   *       value: -100
   *     }
   *   }
   * }
   */
  axis_x_min: void 0,
  /**
   * Change the direction of x axis.<br><br>
   * If true set, the direction will be `right -> left`.
   * @name axis․x․inverted
   * @memberof Options
   * @type {boolean}
   * @default false
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.InvertedAxis)
   * @example
   * axis: {
   *   x: {
   *     inverted: true
   *   }
   * }
   */
  axis_x_inverted: false,
  /**
   * Set padding for x axis.<br><br>
   * If this option is set, the range of x axis will increase/decrease according to the values.
   * If no padding is needed in the rage of x axis, 0 should be set.
   * By default, left/right padding are set depending on x axis type or chart types.
   * - **NOTE:**
   *   - The meaning of padding values, differs according axis types:<br>
   *     - **category/indexed:** The unit of tick value
   *       ex. the given value `1`, is same as the width of 1 tick width
   *     - **timeseries:** Numeric time value
   *       ex. the given value `1000*60*60*24`, which is numeric time equivalent of a day, is same as the width of 1 tick width
   *   - If want values to be treated as pixels, specify `unit:"px"`.
   *     - The pixel value will be convered based on the scale values. Hence can not reflect accurate padding result.
   * @name axis․x․padding
   * @memberof Options
   * @type {object|number}
   * @default {}
   * @example
   * axis: {
   *   x: {
   *     padding: {
   *       // when axis type is 'category'
   *       left: 1,  // set left padding width of equivalent value of a tick's width
   *       right: 0.5  // set right padding width as half of equivalent value of tick's width
   *
   *       // when axis type is 'timeseries'
   *       left: 1000*60*60*24,  // set left padding width of equivalent value of a day tick's width
   *       right: 1000*60*60*12   // set right padding width as half of equivalent value of a day tick's width
   *     },
   *
   *     // or set both values at once.
   *     padding: 10,
   *
   *     // or set padding values as pixel unit.
   *     padding: {
   *       left: 100,
   *       right: 50,
   *       unit: "px"
   *     },
   *   }
   * }
   */
  axis_x_padding: {},
  /**
   * Set height of x axis.<br><br>
   * The height of x axis can be set manually by this option. If you need more space for x axis, please use this option for that. The unit is pixel.
   * @name axis․x․height
   * @memberof Options
   * @type {number}
   * @default undefined
   * @example
   * axis: {
   *   x: {
   *     height: 20
   *   }
   * }
   */
  axis_x_height: void 0,
  /**
   * Set default extent for subchart and zoom. This can be an array or function that returns an array.
   * @name axis․x․extent
   * @memberof Options
   * @type {Array|Function}
   * @default undefined
   * @example
   * axis: {
   *   x: {
   *     // extent range as a pixel value
   *     extent: [0, 200],
   *
   *     // when axis is 'timeseries', parsable datetime string
   *     extent: ["2019-03-01", "2019-03-05"],
   *
   *     // return extent value
   *     extent: function(domain, scale) {
   *    	 var extent = domain.map(function(v) {
   *     	    return scale(v);
   *     	 });
   *
   *   	 // it should return a format of array
   *   	 // ex) [0, 584]
   *     	 return extent;
   *     }
   *   }
   * }
   */
  axis_x_extent: void 0,
  /**
   * Set label on x axis.<br><br>
   * You can set x axis label and change its position by this option.
   * `string` and `object` can be passed and we can change the poisiton by passing object that has position key.<br>
   * Available position differs according to the axis direction (vertical or horizontal).
   * If string set, the position will be the default.
   *
   *  - **If it's horizontal axis:**
   *    - inner-right [default]
   *    - inner-center
   *    - inner-left
   *    - outer-right
   *    - outer-center
   *    - outer-left
   *  - **If it's vertical axis:**
   *    - inner-top [default]
   *    - inner-middle
   *    - inner-bottom
   *    - outer-top
   *    - outer-middle
   *    - outer-bottom
   * @name axis․x․label
   * @memberof Options
   * @type {string|object}
   * @default undefined
   * @example
   * axis: {
   *   x: {
   *     label: "Your X Axis"
   *   }
   * }
   *
   * axis: {
   *   x: {
   *     label: {
   *        text: "Your X Axis",
   *        position: "outer-center"
   *     }
   *   }
   * }
   */
  axis_x_label: {},
  /**
   * Set additional axes for x Axis.
   * - **NOTE:** Axis' scale is based on x Axis value if domain option isn't set.
   *
   * Each axis object should consist with following options:
   *
   * | Name | Type | Default | Description |
   * | --- | --- | --- | --- |
   * | domain | Array | - | Set the domain value |
   * | tick.outer | boolean | true | Show outer tick |
   * | tick.format | Function | - | Set formatter for tick text |
   * | tick.count | Number | - | Set the number of y axis ticks |
   * | tick.values | Array | - | Set tick values manually |
   * @name axis․x․axes
   * @memberof Options
   * @type {Array}
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.MultiAxes)
   * @see [Demo: Domain](https://naver.github.io/billboard.js/demo/#Axis.MultiAxesDomain)
   * @example
   * x: {
   *    axes: [
   *      {
   *        // if set, will not be correlated with the main x Axis domain value
   *        domain: [0, 1000],
   *        tick: {
   *          outer: false,
   *          format: function(x) {
   *             return x + "%";
   *          },
   *          count: 2,
   *          values: [10, 20, 30]
   *        }
   *      },
   *      ...
   *    ]
   * }
   */
  axis_x_axes: []
});

;// CONCATENATED MODULE: ./src/config/Options/axis/y.ts
/* harmony default export */ var y = ({
  /**
   * Set clip-path attribute for y axis element
   * - **NOTE**: `clip-path` attribute for y Axis is set only when `axis.y.inner` option is true.
   * @name axis․y․clipPath
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * // don't set 'clip-path' attribute
   * clipPath: false
   */
  axis_y_clipPath: true,
  /**
   * Show or hide y axis.
   * @name axis․y․show
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * axis: {
   *   y: {
   *     show: false
   *   }
   * }
   */
  axis_y_show: true,
  /**
   * Set type of y axis.<br><br>
   * **Available Values:**
   *  - indexed
   *  - log
   *  - timeseries
   *
   * **NOTE:**<br>
   * - **log** type:
   *   - the bound data values must be exclusively-positive.
   *   - y axis min value should be >= 0.
   *   - [`data.groups`](#.data%25E2%2580%25A4groups)(stacked data) option aren't supported.
   *
   * @name axis․y․type
   * @memberof Options
   * @type {string}
   * @default "indexed"
   * @see [Demo: log](https://naver.github.io/billboard.js/demo/#Axis.LogScales)
   * @example
   * axis: {
   *   y: {
   *     type: "log"
   *   }
   * }
   */
  axis_y_type: "indexed",
  /**
   * Set max value of y axis.
   * - **NOTE:** Padding will be added based on this value, so if you don't need the padding, please set axis.y.padding to disable it (e.g. axis.y.padding = 0).
   * @name axis․y․max
   * @memberof Options
   * @type {number}
   * @default undefined
   * @example
   * axis: {
   *   y: {
   *     max: 1000
   *   }
   * }
   */
  axis_y_max: void 0,
  /**
   * Set min value of y axis.
   * - **NOTE:**
   *   Padding will be added based on this value, so if you don't need the padding, please set axis.y.padding to disable it (e.g. axis.y.padding = 0).
   * @name axis․y․min
   * @memberof Options
   * @type {number}
   * @default undefined
   * @example
   * axis: {
   *   y: {
   *     min: 1000
   *   }
   * }
   */
  axis_y_min: void 0,
  /**
   * Change the direction of y axis.<br><br>
   * If true set, the direction will be `top -> bottom`.
   * @name axis․y․inverted
   * @memberof Options
   * @type {boolean}
   * @default false
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.InvertedAxis)
   * @example
   * axis: {
   *   y: {
   *     inverted: true
   *   }
   * }
   */
  axis_y_inverted: false,
  /**
   * Set center value of y axis.
   * @name axis․y․center
   * @memberof Options
   * @type {number}
   * @default undefined
   * @example
   * axis: {
   *   y: {
   *     center: 0
   *   }
   * }
   */
  axis_y_center: void 0,
  /**
   * Show y axis inside of the chart.
   * @name axis․y․inner
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * axis: {
   *   y: {
   *     inner: true
   *   }
   * }
   */
  axis_y_inner: false,
  /**
   * Set label on y axis.<br><br>
   * You can set y axis label and change its position by this option. This option works in the same way as [axis.x.label](#.axis%25E2%2580%25A4x%25E2%2580%25A4label).
   * @name axis․y․label
   * @memberof Options
   * @type {string|object}
   * @default {}
   * @see [axis.x.label](#.axis%25E2%2580%25A4x%25E2%2580%25A4label) for position string value.
   * @example
   * axis: {
   *   y: {
   *     label: "Your Y Axis"
   *   }
   * }
   *
   * axis: {
   *   y: {
   *     label: {
   *        text: "Your Y Axis",
   *        position: "outer-middle"
   *     }
   *   }
   * }
   */
  axis_y_label: {},
  /**
   * Set formatter for y axis tick text.<br><br>
   * This option accepts d3.format object as well as a function you define.
   * @name axis․y․tick․format
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       format: function(x) {
   *           return x.getFullYear();
   *       }
   *     }
   *   }
   * }
   */
  axis_y_tick_format: void 0,
  /**
   * Setting for culling ticks.
   * - `true`: the ticks will be culled, then only limited tick text will be shown.<br>
   *   This option does not hide the tick lines by default, if want to hide tick lines, set `axis.y.tick.culling.lines=false`.
   * - `false`: all of ticks will be shown.<br><br>
   * The number of ticks to be shown can be chaned by `axis.y.tick.culling.max`.
   * @name axis․y․tick․culling
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       culling: false
   *     }
   *   }
   * }
   */
  axis_y_tick_culling: false,
  /**
   * The number of tick texts will be adjusted to less than this value.
   * @name axis․y․tick․culling․max
   * @memberof Options
   * @type {number}
   * @default 5
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       culling: {
   *           max: 5
   *       }
   *     }
   *   }
   * }
   */
  axis_y_tick_culling_max: 5,
  /**
   * Control visibility of tick lines within culling option, along with tick text.
   * @name axis․y․tick․culling․lines
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       culling: {
   *           lines: false,
   *       }
   *     }
   *   }
   * }
   */
  axis_y_tick_culling_lines: true,
  /**
   * Show y axis outer tick.
   * @name axis․y․tick․outer
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       outer: false
   *     }
   *   }
   * }
   */
  axis_y_tick_outer: true,
  /**
   * Set y axis tick values manually.
   * @name axis․y․tick․values
   * @memberof Options
   * @type {Array|Function}
   * @default null
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       values: [100, 1000, 10000],
   *
   *       // an Array value should be returned
   *       values: function() {
   *       	return [ ... ];
   *       }
   *     }
   *   }
   * }
   */
  axis_y_tick_values: null,
  /**
   * Rotate y axis tick text.
   * - If you set negative value, it will rotate to opposite direction.
   * - Applied when [`axis.rotated`](#.axis%25E2%2580%25A4rotated) option is `true`.
   * @name axis․y․tick․rotate
   * @memberof Options
   * @type {number}
   * @default 0
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       rotate: 60
   *     }
   *   }
   * }
   */
  axis_y_tick_rotate: 0,
  /**
   * Set the number of y axis ticks.<br><br>
   * - **NOTE:** The position of the ticks will be calculated precisely, so the values on the ticks will not be rounded nicely. In the case, axis.y.tick.format or axis.y.tick.values will be helpful.
   * @name axis․y․tick․count
   * @memberof Options
   * @type {number}
   * @default undefined
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       count: 5
   *     }
   *   }
   * }
   */
  axis_y_tick_count: void 0,
  /**
   * Show or hide y axis tick line.
   * @name axis․y․tick․show
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       show: false
   *     }
   *   }
   * }
   */
  axis_y_tick_show: true,
  /**
   * Set axis tick step(interval) size.
   * - **NOTE:** Will be ignored if `axis.y.tick.count` or `axis.y.tick.values` options are set.
   * @name axis․y․tick․stepSize
   * @memberof Options
   * @type {number}
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.StepSizeForYAxis)
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       // tick value will step as indicated interval value.
   *       // ex) 'stepSize=15' ==> [0, 15, 30, 45, 60]
   *       stepSize: 15
   *     }
   *   }
   * }
   */
  axis_y_tick_stepSize: null,
  /**
   * Show or hide y axis tick text.
   * @name axis․y․tick․text․show
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       text: {
   *           show: false
   *       }
   *     }
   *   }
   * }
   */
  axis_y_tick_text_show: true,
  /**
   * Set the y Axis tick text's position relatively its original position
   * @name axis․y․tick․text․position
   * @memberof Options
   * @type {object}
   * @default {x: 0, y:0}
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       text: {
   *         position: {
   *           x: 10,
   *           y: 10
   *         }
   *       }
   *     }
   *   }
   * }
   */
  axis_y_tick_text_position: { x: 0, y: 0 },
  /**
   * Set the number of y axis ticks.<br><br>
   * - **NOTE:** The position of the ticks will be calculated precisely, so the values on the ticks will not be rounded nicely. In the case, axis.y.tick.format or axis.y.tick.values will be helpful.
   * @name axis․y․tick․time
   * @memberof Options
   * @private
   * @type {object}
   * @property {object} time time object
   * @property {Function} [time.value] D3's time interval function (https://github.com/d3/d3-time#intervals)
   * @example
   * axis: {
   *   y: {
   *     tick: {
   *       time: {
   *          // ticks at 15-minute intervals
   *          // https://github.com/d3/d3-scale/blob/master/README.md#time_ticks
   *          value: d3.timeMinute.every(15)
   *       }
   *     }
   *   }
   * }
   */
  // @TODO: not fully implemented yet
  axis_y_tick_time_value: void 0,
  /**
   * Set padding for y axis.<br><br>
   * You can set padding for y axis to create more space on the edge of the axis.
   * This option accepts object and it can include top and bottom. top, bottom will be treated as pixels.
   *
   * - **NOTE:**
   *   - Given values are translated relative to the y Axis domain value for padding
   *   - For area and bar type charts, [area.zerobased](#.area) or [bar.zerobased](#.bar) options should be set to 'false` to get padded bottom.
   * @name axis․y․padding
   * @memberof Options
   * @type {object|number}
   * @default {}
   * @example
   * axis: {
   *   y: {
   *     padding: {
   *       top: 0,
   *       bottom: 0
   *     },
   *
   *     // or set both values at once.
   *     padding: 10
   *   }
   * }
   */
  axis_y_padding: {},
  /**
   * Set default range of y axis.<br><br>
   * This option set the default value for y axis when there is no data on init.
   * @name axis․y․default
   * @memberof Options
   * @type {Array}
   * @default undefined
   * @example
   * axis: {
   *   y: {
   *     default: [0, 1000]
   *   }
   * }
   */
  axis_y_default: void 0,
  /**
   * Set additional axes for y Axis.
   * - **NOTE:** Axis' scale is based on y Axis value if domain option isn't set.
   *
   * Each axis object should consist with following options:
   *
   * | Name | Type | Default | Description |
   * | --- | --- | --- | --- |
   * | domain | Array | - | Set the domain value |
   * | tick.outer | boolean | true | Show outer tick |
   * | tick.format | Function | - | Set formatter for tick text |
   * | tick.count | Number | - | Set the number of y axis ticks |
   * | tick.values | Array | - | Set tick values manually |
   * @name axis․y․axes
   * @memberof Options
   * @type {Array}
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.MultiAxes)
   * @see [Demo: Domain](https://naver.github.io/billboard.js/demo/#Axis.MultiAxesDomain)
   * @example
   * y: {
   *    axes: [
   *      {
   *        // if set, will not be correlated with the main y Axis domain value
   *        domain: [0, 1000],
   *        tick: {
   *          outer: false,
   *          format: function(x) {
   *             return x + "%";
   *          },
   *          count: 2,
   *          values: [10, 20, 30]
   *        }
   *      },
   *      ...
   *    ]
   * }
   */
  axis_y_axes: []
});

;// CONCATENATED MODULE: ./src/config/Options/axis/y2.ts
/* harmony default export */ var y2 = ({
  /**
   * Show or hide y2 axis.
   * - **NOTE**:
   *   - When set to `false` will not generate y2 axis node. In this case, all 'y2' axis related functionality won't work properly.
   *   - If need to use 'y2' related options while y2 isn't visible, set the value `true` and control visibility by css display property.
   * @name axis․y2․show
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * axis: {
   *   y2: {
   *     show: true
   *   }
   * }
   */
  axis_y2_show: false,
  /**
   * Set type of y2 axis.<br><br>
   * **Available Values:**
   *  - indexed
   *  - log
   *  - timeseries
   *
   * **NOTE:**<br>
   * - **log** type:
   *   - the bound data values must be exclusively-positive.
   *   - y2 axis min value should be >= 0.
   *   - [`data.groups`](#.data%25E2%2580%25A4groups)(stacked data) option aren't supported.
   *
   * @name axis․y2․type
   * @memberof Options
   * @type {string}
   * @default "indexed"
   * @see [Demo: log](https://naver.github.io/billboard.js/demo/#Axis.LogScales)
   * @example
   * axis: {
   *   y2: {
   *     type: "indexed"
   *   }
   * }
   */
  axis_y2_type: "indexed",
  /**
   * Set max value of y2 axis.
   * @name axis․y2․max
   * @memberof Options
   * @type {number}
   * @default undefined
   * @example
   * axis: {
   *   y2: {
   *     max: 1000
   *   }
   * }
   */
  axis_y2_max: void 0,
  /**
   * Set min value of y2 axis.
   * @name axis․y2․min
   * @memberof Options
   * @type {number}
   * @default undefined
   * @example
   * axis: {
   *   y2: {
   *     min: -1000
   *   }
   * }
   */
  axis_y2_min: void 0,
  /**
   * Change the direction of y2 axis.<br><br>
   * If true set, the direction will be `top -> bottom`.
   * @name axis․y2․inverted
   * @memberof Options
   * @type {boolean}
   * @default false
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.InvertedAxis)
   * @example
   * axis: {
   *   y2: {
   *     inverted: true
   *   }
   * }
   */
  axis_y2_inverted: false,
  /**
   * Set center value of y2 axis.
   * @name axis․y2․center
   * @memberof Options
   * @type {number}
   * @default undefined
   * @example
   * axis: {
   *   y2: {
   *     center: 0
   *   }
   * }
   */
  axis_y2_center: void 0,
  /**
   * Show y2 axis inside of the chart.
   * @name axis․y2․inner
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * axis: {
   *   y2: {
   *     inner: true
   *   }
   * }
   */
  axis_y2_inner: false,
  /**
   * Set label on y2 axis.<br><br>
   * You can set y2 axis label and change its position by this option. This option works in the same way as [axis.x.label](#.axis%25E2%2580%25A4x%25E2%2580%25A4label).
   * @name axis․y2․label
   * @memberof Options
   * @type {string|object}
   * @default {}
   * @see [axis.x.label](#.axis%25E2%2580%25A4x%25E2%2580%25A4label) for position string value.
   * @example
   * axis: {
   *   y2: {
   *     label: "Your Y2 Axis"
   *   }
   * }
   *
   * axis: {
   *   y2: {
   *     label: {
   *        text: "Your Y2 Axis",
   *        position: "outer-middle"
   *     }
   *   }
   * }
   */
  axis_y2_label: {},
  /**
   * Set formatter for y2 axis tick text.<br><br>
   * This option works in the same way as axis.y.format.
   * @name axis․y2․tick․format
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       format: d3.format("$,")
   *       //or format: function(d) { return "$" + d; }
   *     }
   *   }
   * }
   */
  axis_y2_tick_format: void 0,
  /**
   * Setting for culling ticks.
   * - `true`: the ticks will be culled, then only limited tick text will be shown.<br>
   *   This option does not hide the tick lines by default, if want to hide tick lines, set `axis.y2.tick.culling.lines=false`.
   * - `false`: all of ticks will be shown.<br><br>
   * The number of ticks to be shown can be chaned by `axis.y2.tick.culling.max`.
   * @name axis․y2․tick․culling
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       culling: false
   *     }
   *   }
   * }
   */
  axis_y2_tick_culling: false,
  /**
   * The number of tick texts will be adjusted to less than this value.
   * @name axis․y2․tick․culling․max
   * @memberof Options
   * @type {number}
   * @default 5
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       culling: {
   *           max: 5
   *       }
   *     }
   *   }
   * }
   */
  axis_y2_tick_culling_max: 5,
  /**
   * Control visibility of tick lines within culling option, along with tick text.
   * @name axis․y2․tick․culling․lines
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       culling: {
   *           lines: false,
   *       }
   *     }
   *   }
   * }
   */
  axis_y2_tick_culling_lines: true,
  /**
   * Show or hide y2 axis outer tick.
   * @name axis․y2․tick․outer
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       outer: false
   *     }
   *   }
   * }
   */
  axis_y2_tick_outer: true,
  /**
   * Set y2 axis tick values manually.
   * @name axis․y2․tick․values
   * @memberof Options
   * @type {Array|Function}
   * @default null
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       values: [100, 1000, 10000],
   *
   *       // an Array value should be returned
   *       values: function() {
   *       	return [ ... ];
   *       }
   *     }
   *   }
   * }
   */
  axis_y2_tick_values: null,
  /**
   * Rotate y2 axis tick text.
   * - If you set negative value, it will rotate to opposite direction.
   * - Applied when [`axis.rotated`](#.axis%25E2%2580%25A4rotated) option is `true`.
   * @name axis․y2․tick․rotate
   * @memberof Options
   * @type {number}
   * @default 0
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       rotate: 60
   *     }
   *   }
   * }
   */
  axis_y2_tick_rotate: 0,
  /**
   * Set the number of y2 axis ticks.
   * - **NOTE:** This works in the same way as axis.y.tick.count.
   * @name axis․y2․tick․count
   * @memberof Options
   * @type {number}
   * @default undefined
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       count: 5
   *     }
   *   }
   * }
   */
  axis_y2_tick_count: void 0,
  /**
   * Show or hide y2 axis tick line.
   * @name axis․y2․tick․show
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       show: false
   *     }
   *   }
   * }
   */
  axis_y2_tick_show: true,
  /**
   * Set axis tick step(interval) size.
   * - **NOTE:** Will be ignored if `axis.y2.tick.count` or `axis.y2.tick.values` options are set.
   * @name axis․y2․tick․stepSize
   * @memberof Options
   * @type {number}
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.StepSizeForYAxis)
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       // tick value will step as indicated interval value.
   *       // ex) 'stepSize=15' ==> [0, 15, 30, 45, 60]
   *       stepSize: 15
   *     }
   *   }
   * }
   */
  axis_y2_tick_stepSize: null,
  /**
   * Show or hide y2 axis tick text.
   * @name axis․y2․tick․text․show
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.HideTickLineText)
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       text: {
   *           show: false
   *       }
   *     }
   *   }
   * }
   */
  axis_y2_tick_text_show: true,
  /**
   * Set the y2 Axis tick text's position relatively its original position
   * @name axis․y2․tick․text․position
   * @memberof Options
   * @type {object}
   * @default {x: 0, y:0}
   * @example
   * axis: {
   *   y2: {
   *     tick: {
   *       text: {
   *         position: {
   *           x: 10,
   *           y: 10
   *         }
   *       }
   *     }
   *   }
   * }
   */
  axis_y2_tick_text_position: { x: 0, y: 0 },
  /**
   * Set padding for y2 axis.<br><br>
   * You can set padding for y2 axis to create more space on the edge of the axis.
   * This option accepts object and it can include top and bottom. top, bottom will be treated as pixels.
   *
   * - **NOTE:**
   *   - Given values are translated relative to the y2 Axis domain value for padding
   *   - For area and bar type charts, [area.zerobased](#.area) or [bar.zerobased](#.bar) options should be set to 'false` to get padded bottom.
   * @name axis․y2․padding
   * @memberof Options
   * @type {object|number}
   * @default {}
   * @example
   * axis: {
   *   y2: {
   *     padding: {
   *       top: 100,
   *       bottom: 100
   *     }
   *
   *     // or set both values at once.
   *     padding: 10
   * }
   */
  axis_y2_padding: {},
  /**
   * Set default range of y2 axis.<br><br>
   * This option set the default value for y2 axis when there is no data on init.
   * @name axis․y2․default
   * @memberof Options
   * @type {Array}
   * @default undefined
   * @example
   * axis: {
   *   y2: {
   *     default: [0, 1000]
   *   }
   * }
   */
  axis_y2_default: void 0,
  /**
   * Set additional axes for y2 Axis.
   * - **NOTE:** Axis' scale is based on y2 Axis value if domain option isn't set.
   *
   * Each axis object should consist with following options:
   *
   * | Name | Type | Default | Description |
   * | --- | --- | --- | --- |
   * | domain | Array | - | Set the domain value |
   * | tick.outer | boolean | true | Show outer tick |
   * | tick.format | Function | - | Set formatter for tick text |
   * | tick.count | Number | - | Set the number of y axis ticks |
   * | tick.values | Array | - | Set tick values manually |
   * @name axis․y2․axes
   * @memberof Options
   * @type {Array}
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.MultiAxes)
   * @see [Demo: Domain](https://naver.github.io/billboard.js/demo/#Axis.MultiAxesDomain)
   * @example
   * y2: {
   *    axes: [
   *      {
   *        // if set, will not be correlated with the main y2 Axis domain value
   *        domain: [0, 1000],
   *        tick: {
   *          outer: false,
   *          format: function(x) {
   *             return x + "%";
   *          },
   *          count: 2,
   *          values: [10, 20, 30]
   *        }
   *      },
   *      ...
   *    ]
   * }
   */
  axis_y2_axes: []
});

;// CONCATENATED MODULE: ./src/config/Options/axis/axis.ts
var axis_defProp = Object.defineProperty;
var axis_getOwnPropSymbols = Object.getOwnPropertySymbols;
var axis_hasOwnProp = Object.prototype.hasOwnProperty;
var axis_propIsEnum = Object.prototype.propertyIsEnumerable;
var axis_defNormalProp = (obj, key, value) => key in obj ? axis_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var axis_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (axis_hasOwnProp.call(b, prop))
      axis_defNormalProp(a, prop, b[prop]);
  if (axis_getOwnPropSymbols)
    for (var prop of axis_getOwnPropSymbols(b)) {
      if (axis_propIsEnum.call(b, prop))
        axis_defNormalProp(a, prop, b[prop]);
    }
  return a;
};



/* harmony default export */ var axis_axis = (axis_spreadValues(axis_spreadValues(axis_spreadValues({
  /**
   * Switch x and y axis position.
   * @name axis․rotated
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * axis: {
   *   rotated: true
   * }
   */
  axis_rotated: false,
  /**
   * Set axis tooltip.
   * - **NOTE:**
   *   - When enabled, will disable default focus grid line.
   *   - For `timeseries` x Axis, tootlip will be formatted using x Axis' tick format.
   *   - For `category` x Axis, tootlip will be displaying scales' value text.
   * @name axis․tooltip
   * @memberof Options
   * @type {boolean}
   * @default false
   * @property {object} axis Axis object
   * @property {boolean} [axis.tooltip=false] Show tooltip or not.
   * @property {string|object} [axis.tooltip.backgroundColor] Set axis tooltip text background colors.
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Axis.AxisTooltip)
   * @example
   * axis: {
   *     tooltip: true, // default background color is
   *
   *     // set backgound color for axis tooltip texts
   *     tooltip: {
   *          backgroundColor: "red",
   *
   *          // set differenct backround colors per axes
   *          // NOTE: In this case, only specified axes tooltip will appear.
   *          backgroundColor: {
   *               x: "green",
   *               y: "yellow",
   *               y2: "red"
   *          }
   *     }
   * }
   */
  axis_tooltip: false
}, axis_x), y), y2));

;// CONCATENATED MODULE: ./src/config/Options/common/grid.ts
/* harmony default export */ var common_grid = ({
  /**
   * Set related options
   * @name grid
   * @memberof Options
   * @type {object}
   * @property {boolean} [front=false] Set 'grid & focus lines' to be positioned over grid lines and chart elements.
   * @property {object} x Grid x object
   * @property {boolean} [x.show=false] Show grids along x axis.
   * @property {Array} [x.lines=[]] Show additional grid lines along x axis.<br>
   *  This option accepts array including object that has value, text, position and class. text, position and class are optional. For position, start, middle and end (default) are available.
   *  If x axis is category axis, value can be category name. If x axis is timeseries axis, value can be date string, Date object and unixtime integer.
   * @property {object} y Grid y object
   * @property {boolean} [y.show=false] Show grids along x axis.
   * @property {Array} [y.lines=[]] Show additional grid lines along y axis.<br>
   *  This option accepts array including object that has value, text, position and class.
   * @property {number} [y.ticks=undefined] Number of y grids to be shown.
   * @property {object} focus Grid focus object
   * @property {boolean} [focus.edge=false] Show edged focus grid line.<br>**NOTE:** Available when [`tooltip.grouped=false`](#.tooltip) option is set.
   * @property {boolean} [focus.show=true] Show grid line when focus.
   * @property {boolean} [focus.y=false] Show y coordinate focus grid line.<br>**NOTE:** Available when [`tooltip.grouped=false`](#.tooltip) option is set.
   * @property {object} lines Grid lines object
   * @property {boolean} [lines.front=true] Set grid lines to be positioned over chart elements.
   * @default undefined
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Grid.GridLines)
   * @see [Demo: X Grid Lines](https://naver.github.io/billboard.js/demo/#Grid.OptionalXGridLines)
   * @see [Demo: Y Grid Lines](https://naver.github.io/billboard.js/demo/#Grid.OptionalYGridLines)
   * @example
   * grid: {
   *   x: {
   *     show: true,
   *     lines: [
   *       {value: 2, text: "Label on 2"},
   *       {value: 5, text: "Label on 5", class: "label-5"},
   *       {value: 6, text: "Label on 6", position: "start"}
   *     ]
   *   },
   *   y: {
   *     show: true,
   *     lines: [
   *       {value: 100, text: "Label on 100"},
   *       {value: 200, text: "Label on 200", class: "label-200"},
   *       {value: 300, text: "Label on 300", position: 'middle'}
   *     ],
   *     ticks: 5
   *   },
   *   front: true,
   *   focus: {
   *      show: false,
   *
   *      // Below options are available when 'tooltip.grouped=false' option is set
   *      edge: true,
   *      y: true
   *   },
   *   lines: {
   *      front: false
   *   }
   * }
   */
  grid_x_show: false,
  grid_x_type: "tick",
  grid_x_lines: [],
  grid_y_show: false,
  grid_y_lines: [],
  grid_y_ticks: void 0,
  grid_focus_edge: false,
  grid_focus_show: true,
  grid_focus_y: false,
  grid_front: false,
  grid_lines_front: true
});

;// CONCATENATED MODULE: ./src/config/Options/data/axis.ts
/* harmony default export */ var data_axis = ({
  /**
   * Specify the keys of the x values for each data.<br><br>
   * This option can be used if we want to show the data that has different x values.
   * @name data․xs
   * @memberof Options
   * @type {object}
   * @default {}
   * @example
   * data: {
   *   xs: {
   *      data1: "x1",
   *      data2: "x2"
   *   }
   * }
   */
  data_xs: {},
  /**
   * Set a format specifier to parse string specifed as x.
   * @name data․xFormat
   * @memberof Options
   * @type {string}
   * @default %Y-%m-%d
   * @example
   * data: {
   *    x: "x",
   *    columns: [
   *        ["x", "01012019", "02012019", "03012019"],
   *        ["data1", 30, 200, 100]
   *    ],
   *    // Format specifier to parse as datetime for given 'x' string value
   *    xFormat: "%m%d%Y"
   * },
   * axis: {
   *    x: {
   *        type: "timeseries"
   *    }
   * }
   * @see [D3's time specifier](https://d3js.org/d3-time-format#locale_format)
   */
  data_xFormat: "%Y-%m-%d",
  /**
   * Set localtime format to parse x axis.
   * @name data․xLocaltime
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * data: {
   *   xLocaltime: false
   * }
   */
  data_xLocaltime: true,
  /**
   * Sort on x axis.
   * - **NOTE:** This option works for lineish(area/line/spline/step) types only.
   * @name data․xSort
   * @memberof Options
   * @type {boolean}
   * @default true
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataXSort)
   * @example
   * data: {
   *   xSort: false,
   *   x: "x",
   *   columns: [
   *     // The line graph will start to be drawn following the x axis sequence
   *     // Below data, wil start drawing x=1: 200, x=2: 300, x=3: 100
   *     ["x", 3, 1, 2],
   *     ["data1", 100, 200, 300]
   *   ]
   * }
   */
  data_xSort: true,
  /**
   * Set y axis the data related to. y and y2 can be used.
   * - **NOTE:** If all data is related to one of the axes, the domain of axis without related data will be replaced by the domain from the axis with related data
   * @name data․axes
   * @memberof Options
   * @type {object}
   * @default {}
   * @example
   * data: {
   *   axes: {
   *     data1: "y",
   *     data2: "y2"
   *   }
   * }
   */
  data_axes: {},
  /**
   * Define regions for each data.<br>
   * The values must be an array for each data and it should include an object that has `start`, `end` and `style`.
   * - The object type should be as:
   *   - start {number}: Start data point number. If not set, the start will be the first data point.
   *   - [end] {number}: End data point number. If not set, the end will be the last data point.
   *   - [style.dasharray="2 2"] {string}: The first number specifies a distance for the filled area, and the second a distance for the unfilled area.
   * - **NOTE:**
   *   - Supports only line type.
   *   - `start` and `end` values should be in the exact x value range.
   *   - Dashes will be applied using `stroke-dasharray` css property when data doesn't contain nullish value(or nullish value with `line.connectNull=true` set).
   *   - Dashes will be applied via path command when data contains nullish value.
   * @name data․regions
   * @memberof Options
   * @type {object}
   * @default {}
   * @example
   * data: {
   *   regions: {
   *     data1: [{
   *         start: 1,
   *         end: 2,
   *         style: {
   *             dasharray: "5 2"
   *         }
   *     }, {
   *         start: 3
   *     }],
   *     ...
   *   }
   * }
   */
  data_regions: {},
  /**
   * Set the stacking to be normalized
   * - **NOTE:**
   *   - For stacking, '[data.groups](#.data%25E2%2580%25A4groups)' option should be set
   *   - y Axis will be set in percentage value (0 ~ 100%)
   *   - Must have postive values
   * @name data․stack․normalize
   * @memberof Options
   * @type {boolean}
   * @default false
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataStackNormalized)
   * @example
   * data: {
   *   stack: {
   *      normalize: true
   *   }
   * }
   */
  data_stack_normalize: false
});

;// CONCATENATED MODULE: ./src/config/resolver/axis.ts

















const api = [
  api_axis,
  api_category,
  flow,
  api_grid,
  group,
  api_regions,
  x
];
const internal = {
  axis: Axis,
  clip: clip,
  eventrect: eventrect,
  flow: interactions_flow,
  grid: internals_grid,
  region: region,
  sizeAxis: size_axis
};
const options = {
  optDataAxis: data_axis,
  optAxis: axis_axis,
  optGrid: common_grid
};

// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(13);
;// CONCATENATED MODULE: ./src/ChartInternal/shape/arc.ts
var arc_defProp = Object.defineProperty;
var arc_defProps = Object.defineProperties;
var arc_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var arc_getOwnPropSymbols = Object.getOwnPropertySymbols;
var arc_hasOwnProp = Object.prototype.hasOwnProperty;
var arc_propIsEnum = Object.prototype.propertyIsEnumerable;
var arc_defNormalProp = (obj, key, value) => key in obj ? arc_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var arc_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (arc_hasOwnProp.call(b, prop))
      arc_defNormalProp(a, prop, b[prop]);
  if (arc_getOwnPropSymbols)
    for (var prop of arc_getOwnPropSymbols(b)) {
      if (arc_propIsEnum.call(b, prop))
        arc_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var arc_spreadProps = (a, b) => arc_defProps(a, arc_getOwnPropDescs(b));






function getRadiusFn(expandRate = 0) {
  const $$ = this;
  const { config, state } = $$;
  const hasMultiArcGauge = $$.hasMultiArcGauge();
  const singleArcWidth = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length;
  const expandWidth = expandRate ? Math.min(
    state.radiusExpanded * expandRate - state.radius,
    singleArcWidth * 0.8 - (1 - expandRate) * 100
  ) : 0;
  return {
    /**
     * Getter of arc innerRadius value
     * @param {IArcData} d Data object
     * @returns {number} innerRadius value
     * @private
     */
    inner(d) {
      const { innerRadius } = $$.getRadius(d);
      return hasMultiArcGauge ? state.radius - singleArcWidth * (d.index + 1) : isNumber(innerRadius) ? innerRadius : 0;
    },
    /**
     * Getter of arc outerRadius value
     * @param {IArcData} d Data object
     * @returns {number} outerRadius value
     * @private
     */
    outer(d) {
      const { outerRadius } = $$.getRadius(d);
      let radius;
      if (hasMultiArcGauge) {
        radius = state.radius - singleArcWidth * d.index + expandWidth;
      } else if ($$.hasType("polar") && !expandRate) {
        radius = $$.getPolarOuterRadius(d, outerRadius);
      } else {
        radius = outerRadius;
        if (expandRate) {
          let { radiusExpanded } = state;
          if (state.radius !== outerRadius) {
            radiusExpanded -= Math.abs(state.radius - outerRadius);
          }
          radius = radiusExpanded * expandRate;
        }
      }
      return radius;
    },
    /**
     * Getter of arc cornerRadius value
     * @param {IArcData} d Data object
     * @param {number} outerRadius outer radius value
     * @returns {number} cornerRadius value
     * @private
     */
    corner(d, outerRadius) {
      const {
        arc_cornerRadius_ratio: ratio = 0,
        arc_cornerRadius: cornerRadius = 0
      } = config;
      const { data: { id }, value } = d;
      let corner = 0;
      if (ratio) {
        corner = ratio * outerRadius;
      } else {
        corner = isNumber(cornerRadius) ? cornerRadius : cornerRadius.call($$.api, id, value, outerRadius);
      }
      return corner;
    }
  };
}
function getAttrTweenFn(fn) {
  return function(d) {
    const getAngleKeyValue = ({ startAngle = 0, endAngle = 0, padAngle = 0 }) => ({
      startAngle,
      endAngle,
      padAngle
    });
    const interpolate = (0,external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_.interpolate)(
      getAngleKeyValue(this._current),
      getAngleKeyValue(d)
    );
    this._current = d;
    return function(t) {
      const interpolated = interpolate(t);
      const { data, index, value } = d;
      return fn(arc_spreadProps(arc_spreadValues({}, interpolated), { data, index, value }));
    };
  };
}
/* harmony default export */ var arc = ({
  initPie() {
    const $$ = this;
    const { config } = $$;
    const dataType = config.data_type;
    const padding = config[`${dataType}_padding`];
    const startingAngle = config[`${dataType}_startingAngle`] || 0;
    const padAngle = (padding ? padding * 0.01 : config[`${dataType}_padAngle`]) || 0;
    $$.pie = (0,external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.pie)().startAngle(startingAngle).endAngle(startingAngle + 2 * Math.PI).padAngle(padAngle).value((d) => {
      var _a, _b;
      return (_b = (_a = d.values) == null ? void 0 : _a.reduce((a, b) => a + b.value, 0)) != null ? _b : d;
    }).sort($$.getSortCompareFn.bind($$)(true));
  },
  updateRadius() {
    const $$ = this;
    const { config, state } = $$;
    const dataType = config.data_type;
    const padding = config[`${dataType}_padding`];
    const w = config.gauge_width || config.donut_width;
    const gaugeArcWidth = $$.filterTargetsToShow($$.data.targets).length * config.gauge_arcs_minWidth;
    state.radiusExpanded = Math.min(state.arcWidth, state.arcHeight) / 2 * ($$.hasMultiArcGauge() && config.gauge_label_show ? 0.85 : 1);
    state.radius = state.radiusExpanded * 0.95;
    state.innerRadiusRatio = w ? (state.radius - w) / state.radius : 0.6;
    state.gaugeArcWidth = w || (gaugeArcWidth <= state.radius - state.innerRadius ? state.radius - state.innerRadius : gaugeArcWidth <= state.radius ? gaugeArcWidth : state.radius);
    const innerRadius = config.pie_innerRadius || (padding ? padding * (state.innerRadiusRatio + 0.1) : 0);
    state.outerRadius = config.pie_outerRadius;
    state.innerRadius = $$.hasType("donut") || $$.hasType("gauge") ? state.radius * state.innerRadiusRatio : innerRadius;
  },
  /**
   * Get pie's inner & outer radius value
   * @param {object|undefined} d Data object
   * @returns {object}
   * @private
   */
  getRadius(d) {
    const $$ = this;
    const data = d == null ? void 0 : d.data;
    let { innerRadius, outerRadius } = $$.state;
    if (!isNumber(innerRadius) && data) {
      innerRadius = innerRadius[data.id] || 0;
    }
    if (isObject(outerRadius) && data && data.id in outerRadius) {
      outerRadius = outerRadius[data.id];
    } else if (!isNumber(outerRadius)) {
      outerRadius = $$.state.radius;
    }
    return { innerRadius, outerRadius };
  },
  updateArc() {
    const $$ = this;
    $$.updateRadius();
    $$.svgArc = $$.getSvgArc();
    $$.svgArcExpanded = $$.getSvgArcExpanded();
  },
  getArcLength() {
    const $$ = this;
    const { config } = $$;
    const arcLengthInPercent = config.gauge_arcLength * 3.6;
    let len = 2 * (arcLengthInPercent / 360);
    if (arcLengthInPercent < -360) {
      len = -2;
    } else if (arcLengthInPercent > 360) {
      len = 2;
    }
    return len * Math.PI;
  },
  getStartingAngle() {
    const $$ = this;
    const { config } = $$;
    const dataType = config.data_type;
    const isFullCircle = $$.hasType("gauge") ? config.gauge_fullCircle : false;
    const defaultStartAngle = -1 * Math.PI / 2;
    const defaultEndAngle = Math.PI / 2;
    let startAngle = config[`${dataType}_startingAngle`] || 0;
    if (!isFullCircle && startAngle <= defaultStartAngle) {
      startAngle = defaultStartAngle;
    } else if (!isFullCircle && startAngle >= defaultEndAngle) {
      startAngle = defaultEndAngle;
    } else if (startAngle > Math.PI || startAngle < -1 * Math.PI) {
      startAngle = Math.PI;
    }
    return startAngle;
  },
  /**
   * Update angle data
   * @param {object} dValue Data object
   * @param {boolean} forRange Weather is for ranged text option(arc.rangeText.values)
   * @returns {object|null} Updated angle data
   * @private
   */
  updateAngle(dValue, forRange = false) {
    var _a;
    const $$ = this;
    const { config, state } = $$;
    const hasGauge = forRange && $$.hasType("gauge");
    let { pie } = $$;
    let d = dValue;
    let found = false;
    if (!config) {
      return null;
    }
    const gStart = $$.getStartingAngle();
    const radius = config.gauge_fullCircle || forRange && !hasGauge ? $$.getArcLength() : gStart * -2;
    if (d.data && $$.isGaugeType(d.data) && !$$.hasMultiArcGauge()) {
      const { gauge_min: gMin, gauge_max: gMax } = config;
      const totalSum = $$.getTotalDataSum(state.rendered);
      const gEnd = radius * ((totalSum - gMin) / (gMax - gMin));
      pie = pie.startAngle(gStart).endAngle(gEnd + gStart);
    }
    if (forRange === false) {
      pie($$.filterTargetsToShow()).forEach((t, i) => {
        var _a2;
        if (!found && t.data.id === ((_a2 = d.data) == null ? void 0 : _a2.id)) {
          found = true;
          d = t;
          d.index = i;
        }
      });
    }
    if (isNaN(d.startAngle)) {
      d.startAngle = 0;
    }
    if (isNaN(d.endAngle)) {
      d.endAngle = d.startAngle;
    }
    if (forRange || d.data && (config.gauge_enforceMinMax || $$.hasMultiArcGauge())) {
      const { gauge_min: gMin, gauge_max: gMax } = config;
      const max = forRange && !hasGauge ? $$.getTotalDataSum(state.rendered) : gMax;
      const gTic = radius / (max - gMin);
      const value = (_a = d.value) != null ? _a : 0;
      const gValue = value < gMin ? 0 : value < max ? value - gMin : max - gMin;
      d.startAngle = gStart;
      d.endAngle = gStart + gTic * gValue;
    }
    return found || forRange ? d : null;
  },
  getSvgArc() {
    const $$ = this;
    const { inner, outer, corner } = getRadiusFn.call($$);
    const arc = (0,external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.arc)().innerRadius(inner).outerRadius(outer);
    const newArc = function(d, withoutUpdate) {
      var _a;
      let path = "M 0 0";
      if (d.value || d.data) {
        const data = withoutUpdate ? d : (_a = $$.updateAngle(d)) != null ? _a : null;
        if (data) {
          path = arc.cornerRadius(
            corner(data, outer(data))
          )(data);
        }
      }
      return path;
    };
    newArc.centroid = arc.centroid;
    return newArc;
  },
  /**
   * Get expanded arc path function
   * @param {number} rate Expand rate
   * @returns {Function} Expanded arc path getter function
   * @private
   */
  getSvgArcExpanded(rate = 1) {
    const $$ = this;
    const { inner, outer, corner } = getRadiusFn.call($$, rate);
    const arc = (0,external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.arc)().innerRadius(inner).outerRadius(outer);
    return (d) => {
      const updated = $$.updateAngle(d);
      const outerR = outer(updated);
      let cornerR = 0;
      if (updated) {
        cornerR = corner(updated, outerR);
      }
      return updated ? arc.cornerRadius(cornerR)(updated) : "M 0 0";
    };
  },
  getArc(d, withoutUpdate, force) {
    return force || this.isArcType(d.data) ? this.svgArc(d, withoutUpdate) : "M 0 0";
  },
  /**
   * Render range value text
   * @private
   */
  redrawArcRangeText() {
    const $$ = this;
    const { config, $el: { arcs }, state, $T } = $$;
    const format = config.arc_rangeText_format;
    const fixed = $$.hasType("gauge") && config.arc_rangeText_fixed;
    let values = config.arc_rangeText_values;
    if (values == null ? void 0 : values.length) {
      const isPercent = config.arc_rangeText_unit === "%";
      const totalSum = $$.getTotalDataSum(state.rendered);
      if (isPercent) {
        values = values.map((v) => totalSum / 100 * v);
      }
      const pieData = $$.pie(values).map((d, i) => (d.index = i, d));
      let rangeText = arcs.selectAll(`.${$ARC.arcRange}`).data(values);
      rangeText.exit();
      rangeText = $T(rangeText.enter().append("text").attr("class", $ARC.arcRange).style("text-anchor", "middle").style("pointer-events", "none").style("opacity", "0").text((v) => {
        const range = isPercent ? v / totalSum * 100 : v;
        return isFunction(format) ? format(range) : `${range}${isPercent ? "%" : ""}`;
      }).merge(rangeText));
      if ((!state.rendered || state.rendered && !fixed) && totalSum > 0) {
        rangeText.attr("transform", (d, i) => $$.transformForArcLabel(pieData[i], true));
      }
      rangeText.style(
        "opacity",
        (d) => !fixed && (d > totalSum || totalSum === 0) ? "0" : null
      );
    }
  },
  /**
   * Set transform attributes to arc label text
   * @param {object} d Data object
   * @param {boolean} forRange Weather is for ranged text option(arc.rangeText.values)
   * @returns {string} Translate attribute string
   * @private
   */
  transformForArcLabel(d, forRange = false) {
    var _a, _b, _c;
    const $$ = this;
    const { config, state: { radiusExpanded } } = $$;
    const updated = $$.updateAngle(d, forRange);
    let translate = "";
    if (updated) {
      if (forRange || $$.hasMultiArcGauge()) {
        const y1 = Math.sin(updated.endAngle - Math.PI / 2);
        const rangeTextPosition = config.arc_rangeText_position;
        let x = Math.cos(updated.endAngle - Math.PI / 2) * (radiusExpanded + (forRange ? 5 : 25));
        let y = y1 * (radiusExpanded + 15 - Math.abs(y1 * 10)) + 3;
        if (forRange && rangeTextPosition) {
          const rangeValues = config.arc_rangeText_values;
          const pos = isFunction(rangeTextPosition) ? rangeTextPosition(rangeValues[d.index]) : rangeTextPosition;
          x += (_a = pos == null ? void 0 : pos.x) != null ? _a : 0;
          y += (_b = pos == null ? void 0 : pos.y) != null ? _b : 0;
        }
        translate = `translate(${x},${y})`;
      } else if (!$$.hasType("gauge") || $$.data.targets.length > 1) {
        let { outerRadius } = $$.getRadius(d);
        if ($$.hasType("polar")) {
          outerRadius = $$.getPolarOuterRadius(d, outerRadius);
        }
        const c = this.svgArc.centroid(updated);
        const [x, y] = c.map((v) => isNaN(v) ? 0 : v);
        const h = Math.sqrt(x * x + y * y);
        let ratio = (_c = ["donut", "gauge", "pie", "polar"].filter($$.hasType.bind($$)).map((v) => config[`${v}_label_ratio`])) == null ? void 0 : _c[0];
        if (ratio) {
          ratio = isFunction(ratio) ? ratio.bind($$.api)(d, outerRadius, h) : ratio;
        } else {
          ratio = outerRadius && (h ? (36 / outerRadius > 0.375 ? 1.175 - 36 / outerRadius : 0.8) * outerRadius / h : 0);
        }
        translate = `translate(${x * ratio},${y * ratio})`;
      }
    }
    return translate;
  },
  convertToArcData(d) {
    return this.addName({
      id: "data" in d ? d.data.id : d.id,
      value: d.value,
      ratio: this.getRatio("arc", d),
      index: d.index
    });
  },
  textForArcLabel(selection) {
    const $$ = this;
    const hasGauge = $$.hasType("gauge");
    if ($$.shouldShowArcLabel()) {
      selection.style("fill", $$.updateTextColor.bind($$)).attr("filter", (d) => $$.updateTextBGColor.bind($$)(d, $$.config.data_labels_backgroundColors)).each(function(d) {
        var _a;
        const node = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
        const updated = $$.updateAngle(d);
        const ratio = $$.getRatio("arc", updated);
        const isUnderThreshold = $$.meetsLabelThreshold(
          ratio,
          (_a = ["donut", "gauge", "pie", "polar"].filter($$.hasType.bind($$))) == null ? void 0 : _a[0]
        );
        if (isUnderThreshold) {
          const { value } = updated || d;
          const text = ($$.getArcLabelFormat() || $$.defaultArcValueFormat)(value, ratio, d.data.id).toString();
          setTextValue(node, text, [-1, 1], hasGauge);
        } else {
          node.text("");
        }
      });
    }
  },
  expandArc(targetIds) {
    const $$ = this;
    const { state: { transiting }, $el } = $$;
    if (transiting) {
      const interval = setInterval(() => {
        if (!transiting) {
          clearInterval(interval);
          $el.legend.selectAll(`.${$FOCUS.legendItemFocused}`).size() > 0 && $$.expandArc(targetIds);
        }
      }, 10);
      return;
    }
    const newTargetIds = $$.mapToTargetIds(targetIds);
    $el.svg.selectAll($$.selectorTargets(newTargetIds, `.${$ARC.chartArc}`)).each(function(d) {
      if (!$$.shouldExpand(d.data.id)) {
        return;
      }
      const expandDuration = $$.getExpandConfig(d.data.id, "duration");
      const svgArcExpandedSub = $$.getSvgArcExpanded(
        $$.getExpandConfig(d.data.id, "rate")
      );
      (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).selectAll("path").transition().duration(expandDuration).attrTween("d", getAttrTweenFn($$.svgArcExpanded.bind($$))).transition().duration(expandDuration * 2).attrTween("d", getAttrTweenFn(svgArcExpandedSub.bind($$)));
    });
  },
  unexpandArc(targetIds) {
    const $$ = this;
    const { state: { transiting }, $el: { svg } } = $$;
    if (transiting) {
      return;
    }
    const newTargetIds = $$.mapToTargetIds(targetIds);
    svg.selectAll($$.selectorTargets(newTargetIds, `.${$ARC.chartArc}`)).selectAll("path").transition().duration((d) => $$.getExpandConfig(d.data.id, "duration")).attrTween("d", getAttrTweenFn($$.svgArc.bind($$)));
    svg.selectAll(`${$ARC.arc}`).style("opacity", null);
  },
  /**
   * Get expand config value
   * @param {string} id data ID
   * @param {string} key config key: 'duration | rate'
   * @returns {number}
   * @private
   */
  getExpandConfig(id, key) {
    const $$ = this;
    const { config } = $$;
    const def = {
      duration: 50,
      rate: 0.98
    };
    let type;
    if ($$.isDonutType(id)) {
      type = "donut";
    } else if ($$.isGaugeType(id)) {
      type = "gauge";
    } else if ($$.isPieType(id)) {
      type = "pie";
    }
    return type ? config[`${type}_expand_${key}`] : def[key];
  },
  shouldExpand(id) {
    const $$ = this;
    const { config } = $$;
    return $$.isDonutType(id) && config.donut_expand || $$.isGaugeType(id) && config.gauge_expand || $$.isPieType(id) && config.pie_expand;
  },
  shouldShowArcLabel() {
    const $$ = this;
    const { config } = $$;
    return ["donut", "gauge", "pie", "polar"].some((v) => $$.hasType(v) && config[`${v}_label_show`]);
  },
  getArcLabelFormat() {
    const $$ = this;
    const { config } = $$;
    let format = (v) => v;
    ["donut", "gauge", "pie", "polar"].filter($$.hasType.bind($$)).forEach((v) => {
      format = config[`${v}_label_format`];
    });
    return isFunction(format) ? format.bind($$.api) : format;
  },
  updateTargetsForArc(targets) {
    const $$ = this;
    const { $el } = $$;
    const hasGauge = $$.hasType("gauge");
    const classChartArc = $$.getChartClass("Arc");
    const classArcs = $$.getClass("arcs", true);
    const classFocus = $$.classFocus.bind($$);
    const chartArcs = $el.main.select(`.${$ARC.chartArcs}`);
    const mainPieUpdate = chartArcs.selectAll(`.${$ARC.chartArc}`).data($$.pie(targets)).attr("class", (d) => classChartArc(d) + classFocus(d.data));
    const mainPieEnter = mainPieUpdate.enter().append("g").attr("class", classChartArc).call(
      this.setCssRule(false, `.${$ARC.chartArcs} text`, [
        "pointer-events:none",
        "text-anchor:middle"
      ])
    );
    mainPieEnter.append("g").attr("class", classArcs).merge(mainPieUpdate);
    mainPieEnter.append("text").attr("dy", hasGauge && !$$.hasMultiTargets() ? "-.1em" : ".35em").style("opacity", "0").style("text-anchor", $$.getStylePropValue("middle")).style("pointer-events", $$.getStylePropValue("none"));
    $el.text = chartArcs.selectAll(`.${$COMMON.target} text`);
  },
  initArc() {
    const $$ = this;
    const { $el } = $$;
    $el.arcs = $el.main.select(`.${$COMMON.chart}`).append("g").attr("class", $ARC.chartArcs).attr("transform", $$.getTranslate("arc"));
    $$.setArcTitle();
  },
  /**
   * Set arc title text
   * @param {string} str Title text
   * @private
   */
  setArcTitle(str) {
    const $$ = this;
    const title = str || $$.getArcTitle();
    const hasGauge = $$.hasType("gauge");
    if (title) {
      const className = hasGauge ? $GAUGE.chartArcsGaugeTitle : $ARC.chartArcsTitle;
      let text = $$.$el.arcs.select(`.${className}`);
      if (text.empty()) {
        text = $$.$el.arcs.append("text").attr("class", className).style("text-anchor", "middle");
      }
      hasGauge && text.attr("dy", "-0.3em");
      setTextValue(text, title, hasGauge ? void 0 : [-0.6, 1.35], true);
    }
  },
  /**
   * Return arc title text
   * @returns {string} Arc title text
   * @private
   */
  getArcTitle() {
    const $$ = this;
    const type = $$.hasType("donut") && "donut" || $$.hasType("gauge") && "gauge";
    return type ? $$.config[`${type}_title`] : "";
  },
  /**
   * Get arc title text with needle value
   * @returns {string|boolean} When title contains needle template string will return processed string, otherwise false
   * @private
   */
  getArcTitleWithNeedleValue() {
    const $$ = this;
    const { config, state } = $$;
    const title = $$.getArcTitle();
    if (title && $$.config.arc_needle_show && /{=[A-Z_]+}/.test(title)) {
      let value = state.current.needle;
      if (!isNumber(value)) {
        value = config.arc_needle_value;
      }
      return tplProcess(title, {
        NEEDLE_VALUE: isNumber(value) ? value : 0
      });
    }
    return false;
  },
  redrawArc(duration, durationForExit, withTransform) {
    const $$ = this;
    const { config, state, $el: { main } } = $$;
    const hasInteraction = config.interaction_enabled;
    const isSelectable = hasInteraction && config.data_selection_isselectable;
    let mainArc = main.selectAll(`.${$ARC.arcs}`).selectAll(`.${$ARC.arc}`).data($$.arcData.bind($$));
    mainArc.exit().transition().duration(durationForExit).style("opacity", "0").remove();
    mainArc = mainArc.enter().append("path").attr("class", $$.getClass("arc", true)).style("fill", (d) => $$.color(d.data)).style("cursor", (d) => {
      var _a;
      return ((_a = isSelectable == null ? void 0 : isSelectable.bind) == null ? void 0 : _a.call(isSelectable, $$.api)(d)) ? "pointer" : null;
    }).style("opacity", "0").each(function(d) {
      if ($$.isGaugeType(d.data)) {
        d.startAngle = config.gauge_startingAngle;
        d.endAngle = config.gauge_startingAngle;
      }
      this._current = d;
    }).merge(mainArc);
    if ($$.hasType("gauge")) {
      $$.updateGaugeMax();
      $$.hasMultiArcGauge() && $$.redrawArcGaugeLine();
    }
    mainArc.attr("transform", (d) => !$$.isGaugeType(d.data) && withTransform ? "scale(0)" : "").style("opacity", function(d) {
      return d === this._current ? "0" : null;
    }).each(() => {
      state.transiting = true;
    }).transition().duration(duration).attrTween("d", function(d) {
      const updated = $$.updateAngle(d);
      if (!updated) {
        return () => "M 0 0";
      }
      if (isNaN(this._current.startAngle)) {
        this._current.startAngle = 0;
      }
      if (isNaN(this._current.endAngle)) {
        this._current.endAngle = this._current.startAngle;
      }
      const interpolate = (0,external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_.interpolate)(this._current, updated);
      this._current = interpolate(0);
      return function(t) {
        const interpolated = interpolate(t);
        interpolated.data = d.data;
        return $$.getArc(interpolated, true);
      };
    }).attr("transform", withTransform ? "scale(1)" : "").style("fill", (d) => {
      let color;
      if ($$.levelColor) {
        color = $$.levelColor(d.data.values[0].value);
        config.data_colors[d.data.id] = color;
      } else {
        color = $$.color(d.data);
      }
      return color;
    }).style("opacity", null).call(endall, function() {
      if ($$.levelColor) {
        const path = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
        const d = path.datum(this._current);
        $$.updateLegendItemColor(d.data.id, path.style("fill"));
      }
      state.transiting = false;
      callFn(config.onrendered, $$.api);
    });
    hasInteraction && $$.bindArcEvent(mainArc);
    $$.hasType("polar") && $$.redrawPolar();
    $$.hasType("gauge") && $$.redrawBackgroundArcs();
    config.arc_needle_show && $$.redrawNeedle();
    $$.redrawArcText(duration);
    $$.redrawArcRangeText();
  },
  /**
   * Update needle element
   * @private
   */
  redrawNeedle() {
    const $$ = this;
    const { $el, config, state: { hiddenTargetIds, radius } } = $$;
    const length = (radius - 1) / 100 * config.arc_needle_length;
    const hasDataToShow = hiddenTargetIds.length !== $$.data.targets.length;
    let needle = $$.$el.arcs.select(`.${$ARC.needle}`);
    const pathFn = config.arc_needle_path;
    const baseWidth = config.arc_needle_bottom_width / 2;
    const topWidth = config.arc_needle_top_width / 2;
    const topRx = config.arc_needle_top_rx;
    const topRy = config.arc_needle_top_ry;
    const bottomLen = config.arc_needle_bottom_len;
    const bottomRx = config.arc_needle_bottom_rx;
    const bottomRy = config.arc_needle_bottom_ry;
    const needleAngle = $$.getNeedleAngle();
    const updateNeedleValue = () => {
      const title = $$.getArcTitleWithNeedleValue();
      title && $$.setArcTitle(title);
    };
    updateNeedleValue();
    if (needle.empty()) {
      needle = $el.arcs.append("path").classed($ARC.needle, true);
      $el.needle = needle;
      $el.needle.updateHelper = (v, updateConfig = false) => {
        if ($el.needle.style("display") !== "none") {
          $$.$T($el.needle).style("transform", `rotate(${$$.getNeedleAngle(v)}deg)`).call(endall, () => {
            updateConfig && (config.arc_needle_value = v);
            updateNeedleValue();
          });
        }
      };
    }
    if (hasDataToShow) {
      const path = isFunction(pathFn) ? pathFn.call($$, length) : `M-${baseWidth} ${bottomLen} A${bottomRx} ${bottomRy} 0 0 0 ${baseWidth} ${bottomLen} L${topWidth} -${length} A${topRx} ${topRy} 0 0 0 -${topWidth} -${length} L-${baseWidth} ${bottomLen} Z`;
      $$.$T(needle).attr("d", path).style("fill", config.arc_needle_color).style("display", null).style("transform", `rotate(${needleAngle}deg)`);
    } else {
      needle.style("display", "none");
    }
  },
  /**
   * Get needle angle value relative given value
   * @param {number} v Value to be calculated angle
   * @returns {number} angle value
   * @private
   */
  getNeedleAngle(v) {
    const $$ = this;
    const { config, state } = $$;
    const arcLength = $$.getArcLength();
    const hasGauge = $$.hasType("gauge");
    const total = $$.getTotalDataSum(true);
    let value = isDefined(v) ? v : config.arc_needle_value;
    let startingAngle = config[`${config.data_type}_startingAngle`] || 0;
    let radian = 0;
    if (!isNumber(value)) {
      value = hasGauge && $$.data.targets.length === 1 ? total : 0;
    }
    state.current.needle = value;
    if (hasGauge) {
      startingAngle = $$.getStartingAngle();
      const radius = config.gauge_fullCircle ? arcLength : startingAngle * -2;
      const { gauge_min: min, gauge_max: max } = config;
      radian = radius * ((value - min) / (max - min));
    } else {
      radian = arcLength * (value / total);
    }
    return (startingAngle + radian) * (180 / Math.PI);
  },
  redrawBackgroundArcs() {
    const $$ = this;
    const { config, state } = $$;
    const hasMultiArcGauge = $$.hasMultiArcGauge();
    const isFullCircle = config.gauge_fullCircle;
    const showEmptyTextLabel = $$.filterTargetsToShow($$.data.targets).length === 0 && !!config.data_empty_label_text;
    const startAngle = $$.getStartingAngle();
    const endAngle = isFullCircle ? startAngle + $$.getArcLength() : startAngle * -1;
    let backgroundArc = $$.$el.arcs.select(
      `${hasMultiArcGauge ? "g" : ""}.${$ARC.chartArcsBackground}`
    );
    if (hasMultiArcGauge) {
      let index = 0;
      backgroundArc = backgroundArc.selectAll(`path.${$ARC.chartArcsBackground}`).data($$.data.targets);
      backgroundArc.enter().append("path").attr("class", (d, i) => `${$ARC.chartArcsBackground} ${$ARC.chartArcsBackground}-${i}`).merge(backgroundArc).style("fill", config.gauge_background || null).attr("d", ({ id }) => {
        if (showEmptyTextLabel || state.hiddenTargetIds.indexOf(id) >= 0) {
          return "M 0 0";
        }
        const d = {
          data: [{ value: config.gauge_max }],
          startAngle,
          endAngle,
          index: index++
        };
        return $$.getArc(d, true, true);
      });
      backgroundArc.exit().remove();
    } else {
      backgroundArc.attr("d", showEmptyTextLabel ? "M 0 0" : () => {
        const d = {
          data: [{ value: config.gauge_max }],
          startAngle,
          endAngle
        };
        return $$.getArc(d, true, true);
      });
    }
  },
  bindArcEvent(arc) {
    const $$ = this;
    const { config, state } = $$;
    const isTouch = state.inputType === "touch";
    const isMouse = state.inputType === "mouse";
    function selectArc(_this, arcData, id) {
      $$.expandArc(id);
      $$.api.focus(id);
      $$.toggleFocusLegend(id, true);
      $$.showTooltip([arcData], _this);
    }
    function unselectArc(arcData) {
      const id = (arcData == null ? void 0 : arcData.id) || void 0;
      $$.unexpandArc(id);
      $$.api.revert();
      $$.revertLegend();
      $$.hideTooltip();
    }
    arc.on("click", function(event, d, i) {
      var _a;
      const updated = $$.updateAngle(d);
      let arcData;
      if (updated) {
        arcData = $$.convertToArcData(updated);
        (_a = $$.toggleShape) == null ? void 0 : _a.call($$, this, arcData, i);
        config.data_onclick.bind($$.api)(arcData, this);
      }
    });
    if (isMouse) {
      arc.on("mouseover", function(event, d) {
        if (state.transiting) {
          return;
        }
        state.event = event;
        const updated = $$.updateAngle(d);
        const arcData = updated ? $$.convertToArcData(updated) : null;
        const id = (arcData == null ? void 0 : arcData.id) || void 0;
        selectArc(this, arcData, id);
        $$.setOverOut(true, arcData);
      }).on("mouseout", (event, d) => {
        if (state.transiting) {
          return;
        }
        state.event = event;
        const updated = $$.updateAngle(d);
        const arcData = updated ? $$.convertToArcData(updated) : null;
        unselectArc();
        $$.setOverOut(false, arcData);
      }).on("mousemove", function(event, d) {
        const updated = $$.updateAngle(d);
        const arcData = updated ? $$.convertToArcData(updated) : null;
        state.event = event;
        $$.showTooltip([arcData], this);
      });
    }
    if (isTouch && $$.hasArcType() && !$$.radars) {
      const getEventArc = (event) => {
        var _a, _b;
        const { clientX, clientY } = (_b = (_a = event.changedTouches) == null ? void 0 : _a[0]) != null ? _b : { clientX: 0, clientY: 0 };
        const eventArc = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(browser_doc.elementFromPoint(clientX, clientY));
        return eventArc;
      };
      $$.$el.svg.on("touchstart touchmove", function(event) {
        if (state.transiting) {
          return;
        }
        state.event = event;
        const eventArc = getEventArc(event);
        const datum = eventArc.datum();
        const updated = (datum == null ? void 0 : datum.data) && datum.data.id ? $$.updateAngle(datum) : null;
        const arcData = updated ? $$.convertToArcData(updated) : null;
        const id = (arcData == null ? void 0 : arcData.id) || void 0;
        $$.callOverOutForTouch(arcData);
        isUndefined(id) ? unselectArc() : selectArc(this, arcData, id);
      });
    }
  },
  redrawArcText(duration) {
    const $$ = this;
    const { config, state, $el: { main, arcs } } = $$;
    const hasGauge = $$.hasType("gauge");
    const hasMultiArcGauge = $$.hasMultiArcGauge();
    let text;
    if (!(hasGauge && $$.data.targets.length === 1 && config.gauge_title)) {
      text = main.selectAll(`.${$ARC.chartArc}`).select("text").style("opacity", "0").attr("class", (d) => $$.isGaugeType(d.data) ? $GAUGE.gaugeValue : null).call($$.textForArcLabel.bind($$)).attr("transform", (d) => $$.transformForArcLabel.bind($$)(d)).style("font-size", (d) => $$.isGaugeType(d.data) && $$.data.targets.length === 1 && !hasMultiArcGauge ? `${Math.round(state.radius / 5)}px` : null).transition().duration(duration).style(
        "opacity",
        (d) => $$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? null : "0"
      );
      hasMultiArcGauge && text.attr("dy", "-.1em");
    }
    main.select(`.${$ARC.chartArcsTitle}`).style("opacity", $$.hasType("donut") || hasGauge ? null : "0");
    if (hasGauge) {
      const isFullCircle = config.gauge_fullCircle;
      isFullCircle && (text == null ? void 0 : text.attr("dy", `${hasMultiArcGauge ? 0 : Math.round(state.radius / 14)}`));
      if (config.gauge_label_show) {
        arcs.select(`.${$GAUGE.chartArcsGaugeUnit}`).attr("dy", `${isFullCircle ? 1.5 : 0.75}em`).text(config.gauge_units);
        arcs.select(`.${$GAUGE.chartArcsGaugeMin}`).attr("dx", `${-1 * (state.innerRadius + (state.radius - state.innerRadius) / (isFullCircle ? 1 : 2))}px`).attr("dy", "1.2em").text($$.textForGaugeMinMax(config.gauge_min, false));
        !isFullCircle && arcs.select(`.${$GAUGE.chartArcsGaugeMax}`).attr("dx", `${state.innerRadius + (state.radius - state.innerRadius) / 2}px`).attr("dy", "1.2em").text($$.textForGaugeMinMax(config.gauge_max, true));
      }
    }
  },
  /**
   * Get Arc element by id or index
   * @param {string|number} value id or index of Arc
   * @returns {d3Selection} Arc path element
   * @private
   */
  getArcElementByIdOrIndex(value) {
    const $$ = this;
    const { $el: { arcs } } = $$;
    const filterFn = isNumber(value) ? (d) => d.index === value : (d) => d.data.id === value;
    return arcs == null ? void 0 : arcs.selectAll(`.${$COMMON.target} path`).filter(filterFn);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/area.ts




/* harmony default export */ var shape_area = ({
  initArea(mainLine) {
    const $$ = this;
    const { config } = $$;
    mainLine.insert("g", `.${config.area_front ? $CIRCLE.circles : $LINE.lines}`).attr("class", $$.getClass("areas", true));
  },
  /**
   * Update area color
   * @param {object} d Data object
   * @returns {string} Color string
   * @private
   */
  updateAreaColor(d) {
    const $$ = this;
    return $$.config.area_linearGradient ? $$.getGradienColortUrl(d.id) : $$.color(d);
  },
  /**
   * Generate/Update elements
   * @param {boolean} withTransition Transition for exit elements
   * @param {boolean} isSub Subchart draw
   * @private
   */
  updateArea(withTransition, isSub = false) {
    const $$ = this;
    const { config, state, $el, $T } = $$;
    const $root = isSub ? $el.subchart : $el;
    config.area_linearGradient && $$.updateLinearGradient();
    const area = $root.main.selectAll(`.${$AREA.areas}`).selectAll(`.${$AREA.area}`).data($$.lineData.bind($$));
    $T(area.exit(), withTransition).style("opacity", "0").remove();
    $root.area = area.enter().append("path").attr("class", $$.getClass("area", true)).style("fill", $$.updateAreaColor.bind($$)).style("opacity", function() {
      state.orgAreaOpacity = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).style("opacity");
      return "0";
    }).merge(area);
    area.style("opacity", state.orgAreaOpacity);
    $$.setRatioForGroupedData($root.area.data());
  },
  /**
   * Redraw function
   * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
   * @param {boolean} withTransition With or without transition
   * @param {boolean} isSub Subchart draw
   * @returns {Array}
   */
  redrawArea(drawFn, withTransition, isSub = false) {
    const $$ = this;
    const { area } = isSub ? this.$el.subchart : this.$el;
    const { orgAreaOpacity } = $$.state;
    return [
      $$.$T(area, withTransition, getRandom()).attr("d", drawFn).style("fill", $$.updateAreaColor.bind($$)).style(
        "opacity",
        (d) => String($$.isAreaRangeType(d) ? orgAreaOpacity / 1.75 : orgAreaOpacity)
      )
    ];
  },
  /**
   * Generate area path data
   * @param {object} areaIndices Indices
   * @param {boolean} isSub Weather is sub axis
   * @returns {Function}
   * @private
   */
  generateDrawArea(areaIndices, isSub) {
    const $$ = this;
    const { config } = $$;
    const lineConnectNull = config.line_connectNull;
    const isRotated = config.axis_rotated;
    const getPoints = $$.generateGetAreaPoints(areaIndices, isSub);
    const yScale = $$.getYScaleById.bind($$);
    const xValue = (d) => (isSub ? $$.subxx : $$.xx).call($$, d);
    const value0 = (d, i) => $$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)(
      $$.isAreaRangeType(d) ? $$.getRangedData(d, "high") : $$.getShapeYMin(d.id)
    );
    const value1 = (d, i) => $$.isGrouped(d.id) ? getPoints(d, i)[1][1] : yScale(d.id, isSub)(
      $$.isAreaRangeType(d) ? $$.getRangedData(d, "low") : d.value
    );
    return (d) => {
      let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
      let x0 = 0;
      let y0 = 0;
      let path;
      if ($$.isAreaType(d)) {
        let area = (0,external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.area)();
        area = isRotated ? area.y(xValue).x0(value0).x1(value1) : area.x(xValue).y0(config.area_above ? 0 : config.area_below ? $$.state.height : value0).y1(value1);
        if (!lineConnectNull) {
          area = area.defined((d2) => $$.getBaseValue(d2) !== null);
        }
        if ($$.isStepType(d)) {
          values = $$.convertValuesToStep(values);
        }
        path = area.curve($$.getCurve(d))(values);
      } else {
        if (values[0]) {
          x0 = $$.scale.x(values[0].x);
          y0 = $$.getYScaleById(d.id)(values[0].value);
        }
        path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
      }
      return path || "M 0 0";
    };
  },
  generateGetAreaPoints(areaIndices, isSub) {
    const $$ = this;
    const { config } = $$;
    const x = $$.getShapeX(0, areaIndices, isSub);
    const y = $$.getShapeY(!!isSub);
    const areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, isSub);
    const yScale = $$.getYScaleById.bind($$);
    return function(d, i) {
      const y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
      const offset = areaOffset(d, i) || y0;
      const posX = x(d);
      const value = d.value;
      let posY = y(d);
      if (config.axis_rotated && (value > 0 && posY < y0 || value < 0 && y0 < posY)) {
        posY = y0;
      }
      return [
        [posX, offset],
        [posX, posY - (y0 - offset)],
        [posX, posY - (y0 - offset)],
        // needed for compatibility
        [posX, offset]
        // needed for compatibility
      ];
    };
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/bar.ts


/* harmony default export */ var bar = ({
  initBar() {
    const { $el, config, state: { clip } } = this;
    $el.bar = $el.main.select(`.${$COMMON.chart}`);
    $el.bar = config.bar_front ? $el.bar.append("g") : $el.bar.insert("g", ":first-child");
    $el.bar.attr("class", $BAR.chartBars).call(this.setCssRule(false, `.${$BAR.chartBars}`, ["pointer-events:none"]));
    if (config.clipPath === false && (config.bar_radius || config.bar_radius_ratio)) {
      $el.bar.attr("clip-path", clip.pathXAxis.replace(/#[^)]*/, `#${clip.id}`));
    }
  },
  updateTargetsForBar(targets) {
    const $$ = this;
    const { config, $el } = $$;
    const classChartBar = $$.getChartClass("Bar");
    const classBars = $$.getClass("bars", true);
    const classFocus = $$.classFocus.bind($$);
    const isSelectable = config.interaction_enabled && config.data_selection_isselectable;
    if (!$el.bar) {
      $$.initBar();
    }
    const mainBarUpdate = $el.main.select(`.${$BAR.chartBars}`).selectAll(`.${$BAR.chartBar}`).data(
      // remove
      targets.filter(
        (v) => v.values.some((d) => isNumber(d.value) || $$.isBarRangeType(d))
      )
    ).attr("class", (d) => classChartBar(d) + classFocus(d));
    const mainBarEnter = mainBarUpdate.enter().append("g").attr("class", classChartBar).style("opacity", "0").style("pointer-events", $$.getStylePropValue("none"));
    mainBarEnter.append("g").attr("class", classBars).style("cursor", (d) => {
      var _a;
      return ((_a = isSelectable == null ? void 0 : isSelectable.bind) == null ? void 0 : _a.call(isSelectable, $$.api)(d)) ? "pointer" : null;
    }).call($$.setCssRule(true, ` .${$BAR.bar}`, ["fill"], $$.color));
  },
  /**
   * Generate/Update elements
   * @param {boolean} withTransition Transition for exit elements
   * @param {boolean} isSub Subchart draw
   * @private
   */
  updateBar(withTransition, isSub = false) {
    const $$ = this;
    const { config, $el, $T } = $$;
    const $root = isSub ? $el.subchart : $el;
    const classBar = $$.getClass("bar", true);
    const initialOpacity = $$.initialOpacity.bind($$);
    config.bar_linearGradient && $$.updateLinearGradient();
    const bar = $root.main.selectAll(`.${$BAR.bars}`).selectAll(`.${$BAR.bar}`).data($$.labelishData.bind($$));
    $T(bar.exit(), withTransition).style("opacity", "0").remove();
    $root.bar = bar.enter().append("path").attr("class", classBar).style("fill", $$.updateBarColor.bind($$)).merge(bar).style("opacity", initialOpacity);
    $$.setRatioForGroupedData($root.bar.data());
  },
  /**
   * Update bar color
   * @param {object} d Data object
   * @returns {string} Color string
   * @private
   */
  updateBarColor(d) {
    const $$ = this;
    const fn = $$.getStylePropValue($$.color);
    return $$.config.bar_linearGradient ? $$.getGradienColortUrl(d.id) : fn ? fn(d) : null;
  },
  /**
   * Redraw function
   * @param {Function} drawFn Retuned function from .getDrawShape() => .generateDrawBar()
   * @param {boolean} withTransition With or without transition
   * @param {boolean} isSub Subchart draw
   * @returns {Array}
   * @private
   */
  redrawBar(drawFn, withTransition, isSub = false) {
    const $$ = this;
    const { bar } = isSub ? $$.$el.subchart : $$.$el;
    return [
      $$.$T(bar, withTransition, getRandom()).attr("d", (d) => (isNumber(d.value) || $$.isBarRangeType(d)) && drawFn(d)).style("fill", $$.updateBarColor.bind($$)).style("opacity", null)
    ];
  },
  /**
   * Generate draw function
   * @param {object} barIndices data order within x axis.
   * barIndices ==> {data1: 0, data2: 0, data3: 1, data4: 1, __max__: 1}
   *
   * When gropus given as:
   *  groups: [
   * 		["data1", "data2"],
   * 		["data3", "data4"]
   * 	],
   *
   * Will be rendered as:
   * 		data1 data3   data1 data3
   * 		data2 data4   data2 data4
   * 		-------------------------
   * 			 0             1
   * @param {boolean} isSub If is for subchart
   * @returns {Function}
   * @private
   */
  generateDrawBar(barIndices, isSub) {
    const $$ = this;
    const { config } = $$;
    const getPoints = $$.generateGetBarPoints(barIndices, isSub);
    const isRotated = config.axis_rotated;
    const barRadius = config.bar_radius;
    const barRadiusRatio = config.bar_radius_ratio;
    const getRadius = isNumber(barRadius) && barRadius > 0 ? () => barRadius : isNumber(barRadiusRatio) ? (w) => w * barRadiusRatio : null;
    return (d, i) => {
      const points = getPoints(d, i);
      const indexX = +isRotated;
      const indexY = +!indexX;
      const isUnderZero = d.value < 0;
      const isInverted = config[`axis_${$$.axis.getId(d.id)}_inverted`];
      const isNegative = !isInverted && isUnderZero || isInverted && !isUnderZero;
      const pathRadius = ["", ""];
      let radius = 0;
      const isGrouped = $$.isGrouped(d.id);
      const isRadiusData = getRadius && isGrouped ? $$.isStackingRadiusData(d) : false;
      if (getRadius) {
        const index = isRotated ? indexY : indexX;
        const barW = points[2][index] - points[0][index];
        radius = !isGrouped || isRadiusData ? getRadius(barW) : 0;
        const arc = `a${radius},${radius} ${isNegative ? `1 0 0` : `0 0 1`} `;
        pathRadius[+!isRotated] = `${arc}${radius},${radius}`;
        pathRadius[+isRotated] = `${arc}${[-radius, radius][isRotated ? "sort" : "reverse"]()}`;
        isNegative && pathRadius.reverse();
      }
      const path = isRotated ? `H${points[1][indexX] + (isNegative ? radius : -radius)} ${pathRadius[0]}V${points[2][indexY] - radius} ${pathRadius[1]}H${points[3][indexX]}` : `V${points[1][indexY] + (isNegative ? -radius : radius)} ${pathRadius[0]}H${points[2][indexX] - radius} ${pathRadius[1]}V${points[3][indexY]}`;
      return `M${points[0][indexX]},${points[0][indexY]}${path}z`;
    };
  },
  /**
   * Determine if given stacking bar data is radius type
   * @param {object} d Data row
   * @returns {boolean}
   */
  isStackingRadiusData(d) {
    const $$ = this;
    const { $el, config, data, state } = $$;
    const { id, index, value } = d;
    if (state.hiddenTargetIds.indexOf(id) > -1) {
      const target = $el.bar.filter((d2) => d2.id === id && d2.value === value);
      return !target.empty() && /a\d+/i.test(target.attr("d"));
    }
    const keys = config.data_groups.find((v) => v.indexOf(id) > -1);
    const sortedList = $$.orderTargets(
      $$.filterTargetsToShow(data.targets.filter($$.isBarType, $$))
    ).filter((v) => keys.indexOf(v.id) > -1);
    const sortedIds = sortedList.map(
      (v) => v.values.filter(
        (v2) => v2.index === index && (isNumber(value) && value > 0 ? v2.value > 0 : v2.value < 0)
      )[0]
    ).filter(Boolean).map((v) => v.id);
    return value !== 0 && sortedIds.indexOf(id) === sortedIds.length - 1;
  },
  /**
   * Generate bar coordinate points data
   * @param {object} barIndices Data order within x axis.
   * @param {boolean} isSub If is for subchart
   * @returns {Array} Array of coordinate points
   * @private
   */
  generateGetBarPoints(barIndices, isSub) {
    const $$ = this;
    const { config } = $$;
    const axis = isSub ? $$.axis.subX : $$.axis.x;
    const barTargetsNum = $$.getIndicesMax(barIndices) + 1;
    const barW = $$.getBarW("bar", axis, barTargetsNum);
    const barX = $$.getShapeX(barW, barIndices, !!isSub);
    const barY = $$.getShapeY(!!isSub);
    const barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub);
    const yScale = $$.getYScaleById.bind($$);
    return (d, i) => {
      const { id } = d;
      const y0 = yScale.call($$, id, isSub)($$.getShapeYMin(id));
      const offset = barOffset(d, i) || y0;
      const width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
      const isInverted = config[`axis_${$$.axis.getId(id)}_inverted`];
      const value = d.value;
      const posX = barX(d);
      let posY = barY(d);
      if (config.axis_rotated && !isInverted && (value > 0 && posY < y0 || value < 0 && y0 < posY)) {
        posY = y0;
      }
      if (!$$.isBarRangeType(d)) {
        posY -= y0 - offset;
      }
      const startPosX = posX + width;
      return [
        [posX, offset],
        [posX, posY],
        [startPosX, posY],
        [startPosX, offset]
      ];
    };
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/bubble.ts


/* harmony default export */ var bubble = ({
  /**
   * Initializer
   * @private
   */
  initBubble() {
    const $$ = this;
    const { config } = $$;
    if ($$.hasType("bubble")) {
      config.point_show = true;
      config.point_type = "circle";
    }
  },
  /**
   * Get user agent's computed value
   * @returns {number}
   * @private
   */
  getBaseLength() {
    const $$ = this;
    const { width, height } = $$.state;
    const cacheKey = KEY.bubbleBaseLength;
    let baseLength = $$.cache.get(cacheKey);
    if (!baseLength) {
      $$.cache.add(cacheKey, baseLength = getMinMax("min", [width, height]));
    }
    return baseLength;
  },
  /**
   * Get the radius value for bubble circle
   * @param {object} d Data object
   * @returns {number}
   * @private
   */
  getBubbleR(d) {
    const $$ = this;
    let maxR = $$.config.bubble_maxR;
    if (isFunction(maxR)) {
      maxR = maxR.bind($$.api)(d);
    } else if (!isNumber(maxR)) {
      maxR = $$.getBaseLength() / ($$.getMaxDataCount() * 2) + 12;
    }
    const max = getMinMax("max", $$.getMinMaxData().max.map((d2) => $$.isBubbleZType(d2) ? $$.getBubbleZData(d2.value, "y") : isObject(d2.value) ? d2.value.mid : d2.value));
    const maxArea = maxR * maxR * Math.PI;
    const area = ($$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "z") : d.value) * (maxArea / max);
    return Math.sqrt(area / Math.PI);
  },
  /**
   * Get bubble dimension data
   * @param {object|Array} d data value
   * @param {string} type - y or z
   * @returns {number}
   * @private
   */
  getBubbleZData(d, type) {
    return isObject(d) ? d[type] : d[type === "y" ? 0 : 1];
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/candlestick.ts
var candlestick_defProp = Object.defineProperty;
var candlestick_getOwnPropSymbols = Object.getOwnPropertySymbols;
var candlestick_hasOwnProp = Object.prototype.hasOwnProperty;
var candlestick_propIsEnum = Object.prototype.propertyIsEnumerable;
var candlestick_defNormalProp = (obj, key, value) => key in obj ? candlestick_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var candlestick_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (candlestick_hasOwnProp.call(b, prop))
      candlestick_defNormalProp(a, prop, b[prop]);
  if (candlestick_getOwnPropSymbols)
    for (var prop of candlestick_getOwnPropSymbols(b)) {
      if (candlestick_propIsEnum.call(b, prop))
        candlestick_defNormalProp(a, prop, b[prop]);
    }
  return a;
};



/* harmony default export */ var candlestick = ({
  initCandlestick() {
    const { $el } = this;
    $el.candlestick = $el.main.select(`.${$COMMON.chart}`).append("g").attr("class", $CANDLESTICK.chartCandlesticks);
  },
  /**
   * Update targets by its data
   * called from: ChartInternal.updateTargets()
   * @param {Array} targets Filtered target by type
   * @private
   */
  updateTargetsForCandlestick(targets) {
    const $$ = this;
    const { $el } = $$;
    const classChart = $$.getChartClass("Candlestick");
    if (!$el.candlestick) {
      $$.initCandlestick();
    }
    const mainUpdate = $$.$el.main.select(`.${$CANDLESTICK.chartCandlesticks}`).selectAll(`.${$CANDLESTICK.chartCandlestick}`).data(targets);
    mainUpdate.enter().append("g").attr("class", classChart).style("pointer-events", "none");
  },
  /**
   * Generate/Update elements
   * @param {boolean} withTransition Transition for exit elements
   * @param {boolean} isSub Subchart draw
   * @private
   */
  updateCandlestick(withTransition, isSub = false) {
    const $$ = this;
    const { $el, $T } = $$;
    const $root = isSub ? $el.subchart : $el;
    const classSetter = $$.getClass("candlestick", true);
    const initialOpacity = $$.initialOpacity.bind($$);
    const candlestick = $root.main.selectAll(`.${$CANDLESTICK.chartCandlestick}`).selectAll(`.${$CANDLESTICK.candlestick}`).data($$.labelishData.bind($$));
    $T(candlestick.exit(), withTransition).style("opacity", "0").remove();
    const candlestickEnter = candlestick.enter().filter((d) => d.value).append("g").attr("class", classSetter);
    candlestickEnter.append("line");
    candlestickEnter.append("path");
    $root.candlestick = candlestick.merge(candlestickEnter).style("opacity", initialOpacity);
  },
  /**
   * Get draw function
   * @param {object} indices Indice data
   * @param {boolean} isSub Subchart draw
   * @returns {Function}
   * @private
   */
  generateDrawCandlestick(indices, isSub) {
    const $$ = this;
    const { config } = $$;
    const getPoints = $$.generateGetCandlestickPoints(indices, isSub);
    const isRotated = config.axis_rotated;
    const downColor = config.candlestick_color_down;
    return (d, i, g) => {
      const points = getPoints(d, i);
      const value = $$.getCandlestickData(d);
      const isUp = value == null ? void 0 : value._isUp;
      const indexX = +isRotated;
      const indexY = +!indexX;
      if (g.classed) {
        g.classed($CANDLESTICK[isUp ? "valueUp" : "valueDown"], true);
      }
      const path = isRotated ? `H${points[1][1]} V${points[1][0]} H${points[0][1]}` : `V${points[1][1]} H${points[1][0]} V${points[0][1]}`;
      g.select("path").attr("d", `M${points[0][indexX]},${points[0][indexY]}${path}z`).style("fill", (d2) => {
        const color = isUp ? $$.color(d2) : isObject(downColor) ? downColor[d2.id] : downColor;
        return color || $$.color(d2);
      });
      const line = g.select("line");
      const pos = isRotated ? {
        x1: points[2][1],
        x2: points[2][2],
        y1: points[2][0],
        y2: points[2][0]
      } : {
        x1: points[2][0],
        x2: points[2][0],
        y1: points[2][1],
        y2: points[2][2]
      };
      for (const x in pos) {
        line.attr(x, pos[x]);
      }
    };
  },
  /**
   * Generate shape drawing points
   * @param {object} indices Indice data
   * @param {boolean} isSub Subchart draw
   * @returns {Function}
   */
  generateGetCandlestickPoints(indices, isSub = false) {
    const $$ = this;
    const axis = isSub ? $$.axis.subX : $$.axis.x;
    const targetsNum = $$.getIndicesMax(indices) + 1;
    const barW = $$.getBarW("candlestick", axis, targetsNum);
    const x = $$.getShapeX(barW, indices, !!isSub);
    const y = $$.getShapeY(!!isSub);
    const shapeOffset = $$.getShapeOffset($$.isBarType, indices, !!isSub);
    const yScale = $$.getYScaleById.bind($$);
    return (d, i) => {
      const y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
      const offset = shapeOffset(d, i) || y0;
      const width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
      const value = $$.getCandlestickData(d);
      let points;
      if (value && isNumber(value.open) && isNumber(value.close)) {
        const posX = {
          start: x(d),
          end: 0
        };
        posX.end = posX.start + width;
        const posY = {
          start: y(value.open),
          end: y(value.close)
        };
        const posLine = {
          x: posX.start + width / 2,
          high: y(value.high),
          low: y(value.low)
        };
        posY.start -= y0 - offset;
        points = [
          [posX.start, posY.start],
          [posX.end, posY.end],
          [posLine.x, posLine.low, posLine.high]
        ];
      } else {
        points = [[0, 0], [0, 0], [0, 0, 0]];
      }
      return points;
    };
  },
  /**
   * Redraw function
   * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
   * @param {boolean} withTransition With or without transition
   * @param {boolean} isSub Subchart draw
   * @returns {Array}
   */
  redrawCandlestick(drawFn, withTransition, isSub = false) {
    const $$ = this;
    const { $el, $T } = $$;
    const { candlestick } = isSub ? $el.subchart : $el;
    const rand = getRandom(true);
    return [
      candlestick.each(function(d, i) {
        const g = $T((0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this), withTransition, rand);
        drawFn(d, i, g);
      }).style("opacity", null)
    ];
  },
  /**
   * Get candlestick data as object
   * @param {object} param Data object
   * @param {Array|object} param.value Data value
   * @returns {object|null} Converted data object
   * @private
   */
  getCandlestickData({ value }) {
    let d;
    if (isArray(value)) {
      const [open, high, low, close, volume = false] = value;
      d = { open, high, low, close };
      if (volume !== false) {
        d.volume = volume;
      }
    } else if (isObject(value)) {
      d = candlestick_spreadValues({}, value);
    }
    if (d) {
      d._isUp = d.close >= d.open;
    }
    return d || null;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/funnel.ts
var funnel_defProp = Object.defineProperty;
var funnel_getOwnPropSymbols = Object.getOwnPropertySymbols;
var funnel_hasOwnProp = Object.prototype.hasOwnProperty;
var funnel_propIsEnum = Object.prototype.propertyIsEnumerable;
var funnel_defNormalProp = (obj, key, value) => key in obj ? funnel_defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var funnel_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (funnel_hasOwnProp.call(b, prop))
      funnel_defNormalProp(a, prop, b[prop]);
  if (funnel_getOwnPropSymbols)
    for (var prop of funnel_getOwnPropSymbols(b)) {
      if (funnel_propIsEnum.call(b, prop))
        funnel_defNormalProp(a, prop, b[prop]);
    }
  return a;
};



function getSize(checkNeck = false) {
  const $$ = this;
  const { config, state: { current: { width, height } } } = $$;
  const padding = $$.getCurrentPadding();
  const size = funnel_spreadValues({
    width: width - (padding.left + padding.right),
    height: height - (config.legend_show ? $$.getLegendHeight() + 10 : 0) - (padding.top + padding.bottom)
  }, padding);
  if (checkNeck) {
    const { width: neckWidth, height: neckHeight } = getNecklSize.call($$, {
      width: size.width,
      height: size.height
    });
    if (size.width < neckWidth) {
      size.width = neckWidth;
    }
    if (size.height < neckHeight) {
      size.height = neckHeight;
    }
  }
  return size;
}
function getNecklSize(current) {
  const $$ = this;
  const { config } = $$;
  let width = config.funnel_neck_width;
  let height = config.funnel_neck_height;
  [width, height] = [width, height].map((v, i) => {
    let size = v;
    if (isObject(v)) {
      size = current[i ? "height" : "width"] * v.ratio;
    }
    return size;
  });
  return {
    width,
    height
  };
}
function getCoord(d) {
  const $$ = this;
  const { top, left, width } = getSize.call($$, true);
  const coords = [];
  d.forEach((d2, i) => {
    const { ratio } = d2;
    const y = i > 0 ? coords[i - 1][2][1] : top;
    coords.push(d2.coords = [
      [left, y],
      // M
      [left + width, y],
      // 1
      [left + width, i > 0 ? ratio + y : ratio + top],
      // 2
      [left, i > 0 ? ratio + y : ratio + top],
      // 3
      [left, y]
      // 4
    ]);
  });
  return coords;
}
function getClipPath(forBackground = false) {
  const $$ = this;
  const { width, height, top, left } = getSize.call($$, true);
  const neck = getNecklSize.call($$, { width, height });
  const leftX = (width - neck.width) / 2;
  const rightX = (width + neck.width) / 2;
  const bodyHeigth = height - neck.height;
  const coords = [
    [0, 0],
    // M
    [width, 0],
    // 1
    [rightX, bodyHeigth],
    // 2
    [rightX, height],
    // 3
    [leftX, height],
    // 4
    [leftX, bodyHeigth],
    // 5
    [0, 0]
    // 6
  ];
  if (forBackground) {
    coords.forEach((d) => {
      d[0] += left;
      d[1] += top;
    });
  }
  return `M${coords.join("L")}z`;
}
function getFunnelData(d) {
  const $$ = this;
  const { config } = $$;
  const data = d.map((d2) => ({
    id: d2.id,
    value: d2.values.reduce((a, b) => a + b.value, 0)
  }));
  if (config.data_order) {
    data.sort($$.getSortCompareFn.bind($$)(true));
  }
  return updateRatio.call($$, data);
}
function updateRatio(data) {
  const $$ = this;
  const { height } = getSize.call($$);
  const total = $$.getTotalDataSum(true);
  data.forEach((d) => {
    d.ratio = d.value / total * height;
  });
  return data;
}
/* harmony default export */ var funnel = ({
  /**
   * Initialize polar
   * @private
   */
  initFunnel() {
    const $$ = this;
    const { $el } = $$;
    $el.funnel = $el.main.select(`.${$COMMON.chart}`).append("g").classed($FUNNEL.chartFunnels, true);
    $el.funnel.background = $el.funnel.append("path").classed($FUNNEL.funnelBackground, true);
    $$.bindFunnelEvent();
  },
  /**
   * Bind events
   * @private
   */
  bindFunnelEvent() {
    const $$ = this;
    const { $el: { funnel }, config, state } = $$;
    const getTarget = (event) => {
      var _a;
      const target = event.isTrusted ? event.target : (_a = state.eventReceiver.rect) == null ? void 0 : _a.node();
      let data;
      if (/^path$/i.test(target.tagName)) {
        state.event = event;
        data = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(target).datum();
      }
      return data;
    };
    if (config.interaction_enabled) {
      const isTouch = state.inputType === "touch";
      funnel.on(isTouch ? "touchstart" : "mouseover mousemove", (event) => {
        const data = getTarget(event);
        if (data) {
          $$.showTooltip([data], event.target);
          /^(touchstart|mouseover)$/.test(event.type) && $$.setOverOut(true, data);
        }
      }).on(isTouch ? "touchend" : "mouseout", (event) => {
        const data = getTarget(event);
        $$.hideTooltip();
        $$.setOverOut(false, data);
      });
    }
  },
  /**
   * Update polar based on given data array
   * @param {object} t Data object
   * @private
   */
  updateTargetsForFunnel(t) {
    const $$ = this;
    const { $el: { funnel } } = $$;
    const classChartFunnel = $$.getChartClass("Funnel");
    const classFunnel = $$.getClass("funnel", true);
    if (!funnel) {
      $$.initFunnel();
    }
    const targets = getFunnelData.call($$, t.filter($$.isFunnelType.bind($$)));
    const mainFunnelUpdate = funnel.selectAll(`.${$FUNNEL.chartFunnel}`).data(targets);
    mainFunnelUpdate.exit().remove();
    const mainFunnelEnter = mainFunnelUpdate.enter().insert("g", `.${$FUNNEL.funnelBackground}`);
    mainFunnelEnter.append("path");
    funnel.path = mainFunnelEnter.merge(mainFunnelUpdate).attr("class", (d) => classChartFunnel(d)).select("path").attr("class", classFunnel).style("opacity", "0").style("fill", $$.color);
  },
  /**
   * Update funnel path selection
   * @param {object} targets Updated target data
   * @private
   */
  updateFunnel(targets) {
    const $$ = this;
    const { $el: { funnel } } = $$;
    const targetIds = targets.map(({ id }) => id);
    funnel.path = funnel.path.filter((d) => targetIds.indexOf(d.id) >= 0);
  },
  /**
   * Generate treemap coordinate points data
   * @returns {Array} Array of coordinate points
   * @private
   */
  generateGetFunnelPoints() {
    const $$ = this;
    const { $el: { funnel } } = $$;
    const targets = $$.filterTargetsToShow(funnel.path);
    const { top, left, right } = getSize.call($$);
    const center = (left - right) / 2;
    const points = {};
    let accumulatedHeight = top != null ? top : 0;
    targets.each((d, i) => {
      var _a;
      points[d.id] = [
        [center, accumulatedHeight],
        [center, accumulatedHeight += ((_a = targets == null ? void 0 : targets[i]) != null ? _a : d).ratio]
      ];
    });
    return (d) => points[d.id];
  },
  /**
   * Called whenever redraw happens
   * @private
   */
  redrawFunnel() {
    const $$ = this;
    const { $T, $el: { funnel } } = $$;
    const targets = $$.filterTargetsToShow(funnel.path);
    const coords = getCoord.call($$, updateRatio.call($$, targets.data()));
    funnel.attr("clip-path", `path('${getClipPath.bind($$)()}')`);
    funnel.background.attr("d", getClipPath.call($$, true));
    $T(targets).attr("d", (d, i) => `M${coords[i].join("L")}z`).style("opacity", "1");
    funnel.selectAll("g").style("opacity", null);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/gauge.ts



/* harmony default export */ var gauge = ({
  initGauge() {
    const $$ = this;
    const { config, $el: { arcs } } = $$;
    const appendText = (className = null, value = "") => {
      arcs.append("text").attr("class", className).style("text-anchor", "middle").style("pointer-events", "none").text(value);
    };
    if ($$.hasType("gauge")) {
      const hasMulti = $$.hasMultiArcGauge();
      arcs.append(hasMulti ? "g" : "path").attr("class", $ARC.chartArcsBackground).style("fill", !hasMulti && config.gauge_background || null);
      config.gauge_units && appendText($GAUGE.chartArcsGaugeUnit);
      if (config.gauge_label_show) {
        appendText($GAUGE.chartArcsGaugeMin);
        !config.gauge_fullCircle && appendText($GAUGE.chartArcsGaugeMax);
      }
    }
  },
  updateGaugeMax() {
    const $$ = this;
    const { config, state } = $$;
    const hasMultiGauge = $$.hasMultiArcGauge();
    const max = hasMultiGauge ? $$.getMinMaxData().max[0].value : $$.getTotalDataSum(state.rendered);
    if (!config.gauge_enforceMinMax && max + config.gauge_min * (config.gauge_min > 0 ? -1 : 1) > config.gauge_max) {
      config.gauge_max = max - config.gauge_min;
    }
  },
  redrawArcGaugeLine() {
    const $$ = this;
    const { config, state, $el } = $$;
    const { hiddenTargetIds } = $$.state;
    const arcLabelLines = $el.main.selectAll(`.${$ARC.arcs}`).selectAll(`.${$ARC.arcLabelLine}`).data($$.arcData.bind($$));
    const mainArcLabelLine = arcLabelLines.enter().append("rect").attr(
      "class",
      (d) => `${$ARC.arcLabelLine} ${$COMMON.target} ${$COMMON.target}-${d.data.id}`
    ).merge(arcLabelLines);
    mainArcLabelLine.style(
      "fill",
      (d) => $$.levelColor ? $$.levelColor(d.data.values[0].value) : $$.color(d.data)
    ).style("display", config.gauge_label_show ? null : "none").each(function(d) {
      let lineLength = 0;
      const lineThickness = 2;
      let x = 0;
      let y = 0;
      let transform = "";
      if (hiddenTargetIds.indexOf(d.data.id) < 0) {
        const updated = $$.updateAngle(d);
        const innerLineLength = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length * (updated.index + 1);
        const lineAngle = updated.endAngle - Math.PI / 2;
        const arcInnerRadius = state.radius - innerLineLength;
        const linePositioningAngle = lineAngle - (arcInnerRadius === 0 ? 0 : 1 / arcInnerRadius);
        lineLength = state.radiusExpanded - state.radius + innerLineLength;
        x = Math.cos(linePositioningAngle) * arcInnerRadius;
        y = Math.sin(linePositioningAngle) * arcInnerRadius;
        transform = `rotate(${lineAngle * 180 / Math.PI}, ${x}, ${y})`;
      }
      (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).attr("x", x).attr("y", y).attr("width", lineLength).attr("height", lineThickness).attr("transform", transform).style("stroke-dasharray", `0, ${lineLength + lineThickness}, 0`);
    });
  },
  textForGaugeMinMax(value, isMax) {
    const $$ = this;
    const { config } = $$;
    const format = config.gauge_label_extents;
    return isFunction(format) ? format.bind($$.api)(value, isMax) : value;
  },
  getGaugeLabelHeight() {
    const { config } = this;
    return this.config.gauge_label_show && !config.gauge_fullCircle ? 20 : 0;
  },
  getPaddingBottomForGauge() {
    const $$ = this;
    return $$.getGaugeLabelHeight() * ($$.config.gauge_label_show ? 2 : 2.5);
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/line.ts




function getStrokeDashArray(start, end, pattern, isLastX = false) {
  const dash = start ? [start, 0] : pattern;
  for (let i = start ? start : pattern.reduce((a, c) => a + c); i <= end; ) {
    pattern.forEach((v) => {
      if (i + v <= end) {
        dash.push(v);
      }
      i += v;
    });
  }
  dash.length % 2 !== 0 && dash.push(isLastX ? pattern[1] : 0);
  return {
    dash: dash.join(" "),
    length: dash.reduce((a, b) => a + b, 0)
  };
}
function getRegions(d, _regions, isTimeSeries) {
  const $$ = this;
  const regions = [];
  const dasharray = "2 2";
  if (isDefined(_regions)) {
    const getValue = (v, def) => isUndefined(v) ? def : isTimeSeries ? parseDate.call($$, v) : v;
    for (let i = 0, reg; reg = _regions[i]; i++) {
      const start = getValue(reg.start, d[0].x);
      const end = getValue(reg.end, d[d.length - 1].x);
      const style = reg.style || { dasharray };
      regions[i] = { start, end, style };
    }
  }
  return regions;
}
/* harmony default export */ var line = ({
  initLine() {
    const { $el } = this;
    $el.line = $el.main.select(`.${$COMMON.chart}`).append("g").attr("class", $LINE.chartLines).call(this.setCssRule(false, `.${$LINE.chartLines}`, ["pointer-events:none"]));
  },
  updateTargetsForLine(t) {
    const $$ = this;
    const { $el: { area, line, main } } = $$;
    const classChartLine = $$.getChartClass("Line");
    const classLines = $$.getClass("lines", true);
    const classFocus = $$.classFocus.bind($$);
    if (!line) {
      $$.initLine();
    }
    const targets = t.filter((d) => !($$.isScatterType(d) || $$.isBubbleType(d)));
    const mainLineUpdate = main.select(`.${$LINE.chartLines}`).selectAll(`.${$LINE.chartLine}`).data(targets).attr("class", (d) => classChartLine(d) + classFocus(d));
    const mainLineEnter = mainLineUpdate.enter().append("g").attr("class", classChartLine).style("opacity", "0").style("pointer-events", $$.getStylePropValue("none"));
    mainLineEnter.append("g").attr("class", classLines);
    if ($$.hasTypeOf("Area")) {
      const mainLine = (!area && mainLineEnter.empty() ? mainLineUpdate : mainLineEnter).filter($$.isAreaType.bind($$));
      $$.initArea(mainLine);
    }
    $$.updateTargetForCircle(targets, mainLineEnter);
  },
  /**
   * Generate/Update elements
   * @param {boolean} withTransition Transition for exit elements
   * @param {boolean} isSub Subchart draw
   * @private
   */
  updateLine(withTransition, isSub = false) {
    const $$ = this;
    const { format: { extraLineClasses }, $el, $T } = $$;
    const $root = isSub ? $el.subchart : $el;
    const line = $root.main.selectAll(`.${$LINE.lines}`).selectAll(`.${$LINE.line}`).data($$.lineData.bind($$));
    $T(line.exit(), withTransition).style("opacity", "0").remove();
    $root.line = line.enter().append("path").attr("class", (d) => `${$$.getClass("line", true)(d)} ${extraLineClasses(d) || ""}`).style("stroke", $$.color).merge(line).style("opacity", $$.initialOpacity.bind($$)).attr("transform", null);
  },
  /**
   * Redraw function
   * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
   * @param {boolean} withTransition With or without transition
   * @param {boolean} isSub Subchart draw
   * @returns {Array}
   * @private
   */
  redrawLine(drawFn, withTransition, isSub = false) {
    const $$ = this;
    const { $el, $T } = $$;
    const { line } = isSub ? $el.subchart : $el;
    return [
      $T(line, withTransition, getRandom()).attr("d", drawFn).style("stroke", this.color).style("opacity", null)
    ];
  },
  /**
   * Get the curve interpolate
   * @param {Array} d Data object
   * @returns {Function}
   * @private
   */
  getCurve(d) {
    const $$ = this;
    const isRotatedStepType = $$.config.axis_rotated && $$.isStepType(d);
    return isRotatedStepType ? (context) => {
      const step = $$.getInterpolate(d)(context);
      step.orgPoint = step.point;
      step.pointRotated = function(x, y) {
        this._point === 1 && (this._point = 2);
        const y1 = this._y * (1 - this._t) + y * this._t;
        this._context.lineTo(this._x, y1);
        this._context.lineTo(x, y1);
        this._x = x;
        this._y = y;
      };
      step.point = function(x, y) {
        this._point === 0 ? this.orgPoint(x, y) : this.pointRotated(x, y);
      };
      return step;
    } : $$.getInterpolate(d);
  },
  generateDrawLine(lineIndices, isSub) {
    const $$ = this;
    const { config, scale } = $$;
    const lineConnectNull = config.line_connectNull;
    const isRotated = config.axis_rotated;
    const getPoints = $$.generateGetLinePoints(lineIndices, isSub);
    const yScale = $$.getYScaleById.bind($$);
    const xValue = (d) => (isSub ? $$.subxx : $$.xx).call($$, d);
    const yValue = (d, i) => $$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)($$.getBaseValue(d));
    let line = (0,external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.line)();
    line = isRotated ? line.x(yValue).y(xValue) : line.x(xValue).y(yValue);
    if (!lineConnectNull) {
      line = line.defined((d) => $$.getBaseValue(d) !== null);
    }
    const x = isSub ? scale.subX : scale.x;
    return (d) => {
      const y = yScale(d.id, isSub);
      let values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
      let x0 = 0;
      let y0 = 0;
      let path;
      if ($$.isLineType(d)) {
        const regions = config.data_regions[d.id];
        if (regions) {
          path = $$.lineWithRegions(values, scale.zoom || x, y, regions);
        } else {
          if ($$.isStepType(d)) {
            values = $$.convertValuesToStep(values);
          }
          path = line.curve($$.getCurve(d))(values);
        }
      } else {
        if (values[0]) {
          x0 = x(values[0].x);
          y0 = y(values[0].value);
        }
        path = isRotated ? `M ${y0} ${x0}` : `M ${x0} ${y0}`;
      }
      return path || "M 0 0";
    };
  },
  /**
   * Set regions dasharray and get path
   * @param {Array} d Data object
   * @param {Function} x x scale function
   * @param {Function} y y scale function
   * @param {object} _regions regions to be set
   * @returns {stirng} Path string
   * @private
   */
  lineWithRegions(d, x, y, _regions) {
    const $$ = this;
    const { config } = $$;
    const isRotated = config.axis_rotated;
    const isTimeSeries = $$.axis.isTimeSeries();
    const dasharray = "2 2";
    const regions = getRegions.bind($$)(d, _regions, isTimeSeries);
    const hasNullDataValue = $$.hasNullDataValue(d);
    let xp;
    let yp;
    let diff;
    let diffx2;
    const xValue = isRotated ? (dt) => y(dt.value) : (dt) => x(dt.x);
    const yValue = isRotated ? (dt) => x(dt.x) : (dt) => y(dt.value);
    const generateM = (points) => `M${points[0][0]},${points[0][1]}L${points[1][0]},${points[1][1]}`;
    const sWithRegion = isTimeSeries ? (d0, d1, k, timeseriesDiff) => {
      const x0 = d0.x.getTime();
      const xDiff = d1.x - d0.x;
      const xv0 = new Date(x0 + xDiff * k);
      const xv1 = new Date(x0 + xDiff * (k + timeseriesDiff));
      const points = isRotated ? [[y(yp(k)), x(xv0)], [y(yp(k + diff)), x(xv1)]] : [[x(xv0), y(yp(k))], [x(xv1), y(yp(k + diff))]];
      return generateM(points);
    } : (d0, d1, k, otherDiff) => {
      const x0 = x(d1.x, !isRotated);
      const y0 = y(d1.value, isRotated);
      const gap = k + otherDiff;
      const xValue2 = x(xp(k), !isRotated);
      const yValue2 = y(yp(k), isRotated);
      let xDiff = x(xp(gap), !isRotated);
      let yDiff = y(yp(gap), isRotated);
      if (xDiff > x0) {
        xDiff = x0;
      }
      if (d0.value > d1.value && (isRotated ? yDiff < y0 : yDiff > y0)) {
        yDiff = y0;
      }
      const points = [
        [xValue2, yValue2],
        [xDiff, yDiff]
      ];
      isRotated && points.forEach((v) => v.reverse());
      return generateM(points);
    };
    const axisType = { x: $$.axis.getAxisType("x"), y: $$.axis.getAxisType("y") };
    let path = "";
    const target = $$.$el.line.filter(({ id }) => id === d[0].id);
    const tempNode = target.clone().style("display", "none");
    const getLength = (node, path2) => node.attr("d", path2).node().getTotalLength();
    const dashArray = {
      dash: [],
      lastLength: 0
    };
    let isLastX = false;
    for (let i = 0, data; data = d[i]; i++) {
      const prevData = d[i - 1];
      const hasPrevData = prevData && isValue(prevData.value);
      let style = $$.isWithinRegions(data.x, regions);
      if (!isValue(data.value)) {
        continue;
      }
      if (isUndefined(regions) || !style || !hasPrevData) {
        path += `${i && hasPrevData ? "L" : "M"}${xValue(data)},${yValue(data)}`;
      } else if (hasPrevData) {
        style = ((style == null ? void 0 : style.dasharray) || dasharray).split(" ").map(Number);
        xp = getScale(axisType.x, prevData.x, data.x);
        yp = getScale(axisType.y, prevData.value, data.value);
        if (hasNullDataValue) {
          const dx = x(data.x) - x(prevData.x);
          const dy = y(data.value) - y(prevData.value);
          const dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
          diff = style[0] / dd;
          diffx2 = diff * style[1];
          for (let j = diff; j <= 1; j += diffx2) {
            path += sWithRegion(prevData, data, j, diff);
            if (j + diffx2 >= 1) {
              path += sWithRegion(prevData, data, 1, 0);
            }
          }
        } else {
          let points = [];
          isLastX = data.x === d[d.length - 1].x;
          if (isTimeSeries) {
            const x0 = +prevData.x;
            const xv0 = new Date(x0);
            const xv1 = new Date(x0 + (+data.x - x0));
            points = [
              [x(xv0), y(yp(0))],
              // M
              [x(xv1), y(yp(1))]
              // L
            ];
          } else {
            points = [
              [x(xp(0)), y(yp(0))],
              // M
              [x(xp(1)), y(yp(1))]
              // L
            ];
          }
          isRotated && points.forEach((v) => v.reverse());
          const startLength = getLength(tempNode, path);
          const endLength = getLength(tempNode, path += `L${points[1].join(",")}`);
          const strokeDashArray = getStrokeDashArray(
            startLength - dashArray.lastLength,
            endLength - dashArray.lastLength,
            style,
            isLastX
          );
          dashArray.lastLength += strokeDashArray.length;
          dashArray.dash.push(strokeDashArray.dash);
        }
      }
    }
    if (dashArray.dash.length) {
      !isLastX && dashArray.dash.push(getLength(tempNode, path));
      tempNode.remove();
      target.attr("stroke-dasharray", dashArray.dash.join(" "));
    }
    return path;
  },
  isWithinRegions(withinX, withinRegions) {
    for (let i = 0, reg; reg = withinRegions[i]; i++) {
      if (reg.start < withinX && withinX <= reg.end) {
        return reg.style;
      }
    }
    return false;
  },
  isWithinStep(that, y) {
    return Math.abs(y - getPointer(this.state.event, that)[1]) < 30;
  },
  shouldDrawPointsForLine(d) {
    const linePoint = this.config.line_point;
    return linePoint === true || isArray(linePoint) && linePoint.indexOf(d.id) !== -1;
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/point.ts



const getTransitionName = () => getRandom();
/* harmony default export */ var point = ({
  initialOpacityForCircle(d) {
    const { config, state: { withoutFadeIn } } = this;
    let opacity = config.point_opacity;
    if (isUndefined(opacity)) {
      opacity = this.getBaseValue(d) !== null && withoutFadeIn[d.id] ? this.opacityForCircle(d) : "0";
    }
    return opacity;
  },
  opacityForCircle(d) {
    var _a;
    const { config } = this;
    let opacity = config.point_opacity;
    if (isUndefined(opacity)) {
      opacity = config.point_show && !((_a = this.isPointFocusOnly) == null ? void 0 : _a.call(this)) ? null : "0";
      opacity = isValue(this.getBaseValue(d)) ? this.isBubbleType(d) || this.isScatterType(d) ? "0.5" : opacity : "0";
    }
    return opacity;
  },
  initCircle() {
    const $$ = this;
    const { $el: { main } } = $$;
    !$$.point && ($$.point = $$.generatePoint());
    if (($$.hasType("bubble") || $$.hasType("scatter")) && main.select(`.${$COMMON.chart} > .${$CIRCLE.chartCircles}`).empty()) {
      main.select(`.${$COMMON.chart}`).append("g").attr("class", $CIRCLE.chartCircles);
    }
  },
  updateTargetForCircle(targetsValue, enterNodeValue) {
    const $$ = this;
    const { config, data, $el } = $$;
    const selectionEnabled = config.interaction_enabled && config.data_selection_enabled;
    const isSelectable = selectionEnabled && config.data_selection_isselectable;
    const classCircles = $$.getClass("circles", true);
    if (!config.point_show) {
      return;
    }
    $$.initCircle();
    let targets = targetsValue;
    let enterNode = enterNodeValue;
    if (!targets) {
      targets = data.targets.filter((d) => this.isScatterType(d) || this.isBubbleType(d));
      const mainCircle = $el.main.select(`.${$CIRCLE.chartCircles}`).style("pointer-events", "none").selectAll(`.${$CIRCLE.circles}`).data(targets);
      mainCircle.exit().remove();
      enterNode = mainCircle.enter();
    }
    selectionEnabled && enterNode.append("g").attr("class", (d) => $$.generateClass($SELECT.selectedCircles, d.id));
    enterNode.append("g").attr("class", classCircles).call((selection) => {
      $$.setCssRule(true, `.${$CIRCLE.circles}`, ["cursor:pointer"], isSelectable)(
        selection
      );
      $$.setCssRule(true, ` .${$CIRCLE.circle}`, ["fill", "stroke"], $$.color)(selection);
    }).style("opacity", function() {
      const parent = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this.parentNode);
      return parent.attr("class").indexOf($CIRCLE.chartCircles) > -1 ? "0" : null;
    });
    selectionEnabled && targets.forEach((t) => {
      $el.main.selectAll(`.${$SELECT.selectedCircles}${$$.getTargetSelectorSuffix(t.id)}`).selectAll(`${$SELECT.selectedCircle}`).each((d) => {
        d.value = t.values[d.index].value;
      });
    });
  },
  updateCircle(isSub = false) {
    const $$ = this;
    const { config, state, $el } = $$;
    const focusOnly = $$.isPointFocusOnly();
    const $root = isSub ? $el.subchart : $el;
    if (config.point_show && !state.toggling) {
      config.point_radialGradient && $$.updateLinearGradient();
      const circles = $root.main.selectAll(`.${$CIRCLE.circles}`).selectAll(`.${$CIRCLE.circle}`).data((d) => $$.isLineType(d) && $$.shouldDrawPointsForLine(d) || $$.isBubbleType(d) || $$.isRadarType(d) || $$.isScatterType(d) ? focusOnly ? [d.values[0]] : d.values : []);
      circles.exit().remove();
      circles.enter().filter(Boolean).append(
        $$.point("create", this, $$.pointR.bind($$), $$.updateCircleColor.bind($$))
      );
      $root.circle = $root.main.selectAll(`.${$CIRCLE.circles} .${$CIRCLE.circle}`).style("stroke", $$.getStylePropValue($$.color)).style("opacity", $$.initialOpacityForCircle.bind($$));
    }
  },
  /**
   * Update circle color
   * @param {object} d Data object
   * @returns {string} Color string
   * @private
   */
  updateCircleColor(d) {
    const $$ = this;
    const fn = $$.getStylePropValue($$.color);
    return $$.config.point_radialGradient ? $$.getGradienColortUrl(d.id) : fn ? fn(d) : null;
  },
  redrawCircle(cx, cy, withTransition, flow, isSub = false) {
    const $$ = this;
    const { state: { rendered }, $el, $T } = $$;
    const $root = isSub ? $el.subchart : $el;
    const selectedCircles = $root.main.selectAll(`.${$SELECT.selectedCircle}`);
    if (!$$.config.point_show) {
      return [];
    }
    const fn = $$.point(
      "update",
      $$,
      cx,
      cy,
      $$.updateCircleColor.bind($$),
      withTransition,
      flow,
      selectedCircles
    );
    const posAttr = $$.isCirclePoint() ? "c" : "";
    const t = getRandom();
    const opacityStyleFn = $$.opacityForCircle.bind($$);
    const mainCircles = [];
    $root.circle.each(function(d) {
      let result = fn.bind(this)(d);
      result = $T(result, withTransition || !rendered, t).style("opacity", opacityStyleFn);
      mainCircles.push(result);
    });
    return [
      mainCircles,
      $T(selectedCircles, withTransition).attr(`${posAttr}x`, cx).attr(`${posAttr}y`, cy)
    ];
  },
  /**
   * Show focused data point circle
   * @param {object} d Selected data
   * @private
   */
  showCircleFocus(d) {
    const $$ = this;
    const { state: { hasRadar, resizing, toggling, transiting }, $el } = $$;
    let { circle } = $el;
    if (transiting === false && circle && $$.isPointFocusOnly()) {
      const cx = (hasRadar ? $$.radarCircleX : $$.circleX).bind($$);
      const cy = (hasRadar ? $$.radarCircleY : $$.circleY).bind($$);
      const withTransition = toggling || isUndefined(d);
      const fn = $$.point(
        "update",
        $$,
        cx,
        cy,
        $$.getStylePropValue($$.color),
        resizing ? false : withTransition
      );
      if (d) {
        circle = circle.filter(function(t) {
          var _a;
          const data = (_a = d.filter) == null ? void 0 : _a.call(d, (v) => v.id === t.id);
          return data.length ? (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).datum(data[0]) : false;
        });
      }
      circle.attr("class", this.updatePointClass.bind(this)).style("opacity", null).each(function(d2) {
        const { id, index, value } = d2;
        let visibility = "hidden";
        if (isValue(value)) {
          fn.bind(this)(d2);
          $$.expandCircles(index, id);
          visibility = "";
        }
        this.style.visibility = visibility;
      });
    }
  },
  /**
   * Hide focused data point circle
   * @private
   */
  hideCircleFocus() {
    const $$ = this;
    const { $el: { circle } } = $$;
    if ($$.isPointFocusOnly() && circle) {
      $$.unexpandCircles();
      circle.style("visibility", "hidden");
    }
  },
  circleX(d) {
    return this.xx(d);
  },
  updateCircleY(isSub = false) {
    const $$ = this;
    const getPoints = $$.generateGetLinePoints($$.getShapeIndices($$.isLineType), isSub);
    return (d, i) => {
      const id = d.id;
      return $$.isGrouped(id) ? getPoints(d, i)[0][1] : $$.getYScaleById(id, isSub)($$.getBaseValue(d));
    };
  },
  expandCircles(i, id, reset) {
    const $$ = this;
    const r = $$.pointExpandedR.bind($$);
    reset && $$.unexpandCircles();
    const circles = $$.getShapeByIndex("circle", i, id).classed($COMMON.EXPANDED, true);
    const scale = r(circles) / $$.config.point_r;
    const ratio = 1 - scale;
    if ($$.isCirclePoint()) {
      circles.attr("r", r);
    } else {
      circles.each(function() {
        const point = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
        if (this.tagName === "circle") {
          point.attr("r", r);
        } else {
          const { width, height } = this.getBBox();
          const x = ratio * (+point.attr("x") + width / 2);
          const y = ratio * (+point.attr("y") + height / 2);
          point.attr("transform", `translate(${x} ${y}) scale(${scale})`);
        }
      });
    }
  },
  unexpandCircles(i) {
    const $$ = this;
    const r = $$.pointR.bind($$);
    const circles = $$.getShapeByIndex("circle", i).filter(function() {
      return (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed($COMMON.EXPANDED);
    }).classed($COMMON.EXPANDED, false);
    circles.attr("r", r);
    if (!$$.isCirclePoint()) {
      const scale = r(circles) / $$.config.point_r;
      circles.attr("transform", scale !== 1 ? `scale(${scale})` : null);
    }
  },
  pointR(d) {
    const $$ = this;
    const { config } = $$;
    const pointR = config.point_r;
    let r = pointR;
    if ($$.isBubbleType(d)) {
      r = $$.getBubbleR(d);
    } else if (isFunction(pointR)) {
      r = pointR.bind($$.api)(d);
    }
    d.r = r;
    return r;
  },
  pointExpandedR(d) {
    const $$ = this;
    const { config } = $$;
    const scale = $$.isBubbleType(d) ? 1.15 : 1.75;
    return config.point_focus_expand_enabled ? config.point_focus_expand_r || $$.pointR(d) * scale : $$.pointR(d);
  },
  pointSelectR(d) {
    const $$ = this;
    const selectR = $$.config.point_select_r;
    return isFunction(selectR) ? selectR(d) : selectR || $$.pointR(d) * 4;
  },
  /**
   * Check if point.focus.only option can be applied.
   * @returns {boolean}
   * @private
   */
  isPointFocusOnly() {
    const $$ = this;
    return $$.config.point_focus_only && !$$.hasType("bubble") && !$$.hasType("scatter") && !$$.hasArcType(null, ["radar"]);
  },
  isWithinCircle(node, r) {
    const { config, state } = this;
    const mouse = getPointer(state.event, node);
    const element = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(node);
    const prefix = this.isCirclePoint(node) ? "c" : "";
    const sensitivity = config.point_sensitivity === "radius" ? node.getAttribute("r") : config.point_sensitivity;
    let cx = +element.attr(`${prefix}x`);
    let cy = +element.attr(`${prefix}y`);
    if (!(cx || cy) && node.nodeType === 1) {
      const { x, y } = getBoundingRect(node);
      cx = x;
      cy = y;
    }
    return Math.sqrt(
      Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)
    ) < (r || sensitivity);
  },
  /**
   * Get data point sensitivity radius
   * @param {object} d Data point object
   * @returns {number} return the sensitivity value
   */
  getPointSensitivity(d) {
    const $$ = this;
    let sensitivity = $$.config.point_sensitivity;
    if (isFunction(sensitivity)) {
      sensitivity = sensitivity.call($$.api, d);
    } else if (sensitivity === "radius") {
      sensitivity = d.r;
    }
    return sensitivity;
  },
  updatePointClass(d) {
    const $$ = this;
    const { circle } = $$.$el;
    let pointClass = false;
    if (isObject(d) || circle) {
      pointClass = d === true ? circle.each(function(d2) {
        let className = $$.getClass("circle", true)(d2);
        if (this.getAttribute("class").indexOf($COMMON.EXPANDED) > -1) {
          className += ` ${$COMMON.EXPANDED}`;
        }
        this.setAttribute("class", className);
      }) : $$.getClass("circle", true)(d);
    }
    return pointClass;
  },
  generateGetLinePoints(lineIndices, isSub) {
    const $$ = this;
    const { config } = $$;
    const x = $$.getShapeX(0, lineIndices, isSub);
    const y = $$.getShapeY(isSub);
    const lineOffset = $$.getShapeOffset($$.isLineType, lineIndices, isSub);
    const yScale = $$.getYScaleById.bind($$);
    return (d, i) => {
      const y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
      const offset = lineOffset(d, i) || y0;
      const posX = x(d);
      let posY = y(d);
      if (config.axis_rotated && (d.value > 0 && posY < y0 || d.value < 0 && y0 < posY)) {
        posY = y0;
      }
      const point = [posX, posY - (y0 - offset)];
      return [
        point,
        point,
        // from here and below, needed for compatibility
        point,
        point
      ];
    };
  },
  custom: {
    create(element, id, fillStyleFn) {
      return element.append("use").attr("xlink:href", `#${id}`).attr("class", this.updatePointClass.bind(this)).style("fill", fillStyleFn).node();
    },
    update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
      const $$ = this;
      const { width, height } = element.node().getBBox();
      const xPosFn2 = (d) => isValue(d.value) ? xPosFn(d) - width / 2 : 0;
      const yPosFn2 = (d) => isValue(d.value) ? yPosFn(d) - height / 2 : 0;
      let mainCircles = element;
      if (withTransition) {
        flow && mainCircles.attr("x", xPosFn2);
        mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
        selectedCircles && $$.$T(selectedCircles, withTransition, getTransitionName());
      }
      return mainCircles.attr("x", xPosFn2).attr("y", yPosFn2).style("fill", fillStyleFn);
    }
  },
  // 'circle' data point
  circle: {
    create(element, sizeFn, fillStyleFn) {
      return element.append("circle").attr("class", this.updatePointClass.bind(this)).attr("r", sizeFn).style("fill", fillStyleFn).node();
    },
    update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
      const $$ = this;
      let mainCircles = element;
      if ($$.hasType("bubble")) {
        mainCircles.attr("r", $$.pointR.bind($$));
      }
      if (withTransition) {
        flow && mainCircles.attr("cx", xPosFn);
        if (mainCircles.attr("cx")) {
          mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
        }
        selectedCircles && $$.$T(mainCircles, withTransition, getTransitionName());
      }
      return mainCircles.attr("cx", xPosFn).attr("cy", yPosFn).style("fill", fillStyleFn);
    }
  },
  // 'rectangle' data point
  rectangle: {
    create(element, sizeFn, fillStyleFn) {
      const rectSizeFn = (d) => sizeFn(d) * 2;
      return element.append("rect").attr("class", this.updatePointClass.bind(this)).attr("width", rectSizeFn).attr("height", rectSizeFn).style("fill", fillStyleFn).node();
    },
    update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
      const $$ = this;
      const r = $$.config.point_r;
      const rectXPosFn = (d) => xPosFn(d) - r;
      const rectYPosFn = (d) => yPosFn(d) - r;
      let mainCircles = element;
      if (withTransition) {
        flow && mainCircles.attr("x", rectXPosFn);
        mainCircles = $$.$T(mainCircles, withTransition, getTransitionName());
        selectedCircles && $$.$T(selectedCircles, withTransition, getTransitionName());
      }
      return mainCircles.attr("x", rectXPosFn).attr("y", rectYPosFn).style("fill", fillStyleFn);
    }
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/point.common.ts



function hasValidPointDrawMethods(point) {
  return isObjectType(point) && isFunction(point.create) && isFunction(point.update);
}
function insertPointInfoDefs(point, id) {
  var _a;
  const $$ = this;
  const copyAttr = (from, target) => {
    const attribs = from.attributes;
    for (let i = 0, name; name = attribs[i]; i++) {
      name = name.name;
      target.setAttribute(name, from.getAttribute(name));
    }
  };
  const doc = new DOMParser().parseFromString(point, "image/svg+xml");
  const node = doc.documentElement;
  const clone = browser_doc.createElementNS(external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.namespaces.svg, node.nodeName.toLowerCase());
  clone.id = id;
  clone.style.fill = "inherit";
  clone.style.stroke = "inherit";
  copyAttr(node, clone);
  if ((_a = node.childNodes) == null ? void 0 : _a.length) {
    const parent = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(clone);
    if ("innerHTML" in clone) {
      parent.html(node.innerHTML);
    } else {
      toArray(node.childNodes).forEach((v) => {
        copyAttr(v, parent.append(v.tagName).node());
      });
    }
  }
  $$.$el.defs.node().appendChild(clone);
}
/* harmony default export */ var point_common = ({
  /**
   * Check if point type option is valid
   * @param {string} type point type
   * @returns {boolean}
   * @private
   */
  hasValidPointType(type) {
    return /^(circle|rect(angle)?|polygon|ellipse|use)$/i.test(type || this.config.point_type);
  },
  /**
   * Check if pattern point is set to be used on legend
   * @returns {boolean}
   * @private
   */
  hasLegendDefsPoint() {
    var _a;
    const { config } = this;
    return config.legend_show && ((_a = config.point_pattern) == null ? void 0 : _a.length) && config.legend_usePoint;
  },
  getDefsPointId(id) {
    const { state: { datetimeId } } = this;
    return `${datetimeId}-point${id}`;
  },
  /**
   * Get generate point function
   * @returns {Function}
   * @private
   */
  generatePoint() {
    const $$ = this;
    const { $el, config } = $$;
    const ids = [];
    const pattern = notEmpty(config.point_pattern) ? config.point_pattern : [config.point_type];
    return function(method, context, ...args) {
      return function(d) {
        var _a, _b, _c, _d;
        const id = $$.getTargetSelectorSuffix(d.id || ((_a = d.data) == null ? void 0 : _a.id) || d);
        const element = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
        ids.indexOf(id) < 0 && ids.push(id);
        let point = pattern[ids.indexOf(id) % pattern.length];
        if ($$.hasValidPointType(point)) {
          point = $$[point];
        } else if (!hasValidPointDrawMethods(point || config.point_type)) {
          const pointId = $$.getDefsPointId(id);
          const defsPoint = $el.defs.select(`#${pointId}`);
          if (defsPoint.size() < 1) {
            insertPointInfoDefs.bind($$)(point, pointId);
          }
          if (method === "create") {
            return (_b = $$.custom) == null ? void 0 : _b.create.bind(context)(element, pointId, ...args);
          } else if (method === "update") {
            return (_c = $$.custom) == null ? void 0 : _c.update.bind(context)(element, ...args);
          }
        }
        return (_d = point[method]) == null ? void 0 : _d.bind(context)(element, ...args);
      };
    };
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/polar.ts


function getDataMax($$) {
  const levelMax = $$.config.polar_level_max;
  let dataMax = $$.getMinMaxData().max[0].value;
  if (levelMax && levelMax > dataMax) {
    dataMax = levelMax;
  }
  return dataMax;
}
/* harmony default export */ var polar = ({
  /**
   * Initialize polar
   * @private
   */
  initPolar() {
    const $$ = this;
    const { $el: { arcs }, config } = $$;
    const levelTextShow = config.polar_level_text_show;
    const levelTextBgColor = config.polar_level_text_backgroundColor;
    arcs.levels = arcs.append("g").attr("class", $LEVEL.levels);
    if (levelTextShow && levelTextBgColor) {
      $$.generateTextBGColorFilter(levelTextBgColor);
    }
  },
  /**
   * Get polar outer radius according to the data value
   * @param {object} d Data object
   * @param {numbet} outerRadius Outer radius
   * @returns {number} outer radius
   * @private
   */
  getPolarOuterRadius(d, outerRadius) {
    var _a;
    const dataMax = getDataMax(this);
    return ((_a = d == null ? void 0 : d.data.values[0].value) != null ? _a : 0) / dataMax * outerRadius;
  },
  /**
   * Update polar based on given data array
   * @param {object} targets Data object
   * @private
   */
  updateTargetsForPolar(targets) {
    this.updateTargetsForArc(targets);
  },
  /**
   * Called whenever redraw happens
   * @private
   */
  redrawPolar() {
    const $$ = this;
    const { config } = $$;
    config.polar_level_show && $$.updatePolarLevel();
  },
  /**
   * Update polar level circle
   * @private
   */
  updatePolarLevel() {
    const $$ = this;
    const { config, state, $el: { arcs: { levels } } } = $$;
    const depth = config.polar_level_depth;
    const dataMax = getDataMax($$);
    const levelData = getRange(0, depth);
    const outerRadius = state.radius;
    const levelRatio = levelData.map((l) => outerRadius * ((l + 1) / depth));
    const levelTextFormat = (config.polar_level_text_format || function() {
    }).bind($$.api);
    const level = levels.selectAll(`.${$LEVEL.level}`).data(levelData);
    level.exit().remove();
    const levelEnter = level.enter().append("g").attr("class", (d, i) => `${$LEVEL.level} ${$LEVEL.level}-${i}`);
    levelEnter.append("circle");
    levelEnter.merge(level).selectAll("circle").style("visibility", config.polar_level_show ? null : "hidden").attr("cx", 0).attr("cy", 0).attr("r", (d) => levelRatio[d]);
    if (config.polar_level_text_show) {
      const levelTextBackgroundColor = config.polar_level_text_backgroundColor;
      const defsId = `#${state.datetimeId}-labels-bg${$$.getTargetSelectorSuffix(levelTextBackgroundColor)}`;
      levelEnter.append("text").style("text-anchor", "middle");
      levelEnter.merge(level).selectAll("text").attr("dy", (d) => -levelRatio[d] + 5).attr("filter", levelTextBackgroundColor ? `url(${defsId})` : null).text((d) => levelTextFormat(dataMax / levelData.length * (d + 1)));
    }
  }
});

;// CONCATENATED MODULE: ./src/ChartInternal/shape/radar.ts




function getPosition(isClockwise, type, edge, pos, range, ratio) {
  const index = isClockwise && pos > 0 ? edge - pos : pos;
  const r = 2 * Math.PI;
  const func = type === "x" ? Math.sin : Math.cos;
  return range * (1 - ratio * func(index * r / edge));
}
const cacheKeyPoints = KEY.radarPoints;
const cacheKeyTextWidth = KEY.radarTextWidth;
/* harmony default export */ var radar = ({
  initRadar() {
    const $$ = this;
    const { config, state: { current }, $el } = $$;
    if ($$.hasType("radar")) {
      $el.radar = $el.main.select(`.${$COMMON.chart}`).append("g").attr("class", $RADAR.chartRadars);
      $el.radar.levels = $el.radar.append("g").attr("class", $LEVEL.levels);
      $el.radar.axes = $el.radar.append("g").attr("class", $AXIS.axis);
      $el.radar.shapes = $el.radar.append("g").attr("class", $SHAPE.shapes);
      current.dataMax = config.radar_axis_max || $$.getMinMaxData().max[0].value;
      if (config.radar_axis_text_show) {
        config.interaction_enabled && $$.bindRadarEvent();
        $$.updateRadarLevel();
        $$.updateRadarAxes();
      }
    }
  },
  getRadarSize() {
    const $$ = this;
    const { config, state: { arcWidth, arcHeight } } = $$;
    const padding = config.axis_x_categories.length < 4 ? -20 : 10;
    const size = (Math.min(arcWidth, arcHeight) - padding) / 2;
    return [size, size];
  },
  updateTargetsForRadar(targets) {
    const $$ = this;
    const { config } = $$;
    if (isEmpty(config.axis_x_categories)) {
      config.axis_x_categories = getRange(0, getMinMax("max", targets.map(
        (v) => v.values.length
      )));
    }
    $$.generateRadarPoints();
  },
  getRadarPosition(type, index, range, ratio) {
    const $$ = this;
    const { config } = $$;
    const [width, height] = $$.getRadarSize();
    const edge = config.axis_x_categories.length;
    const isClockwise = config.radar_direction_clockwise;
    const pos = toArray(type).map(
      (v) => getPosition(
        isClockwise,
        v,
        edge,
        index,
        isDefined(range) ? range : type === "x" ? width : height,
        isNumber(ratio) ? ratio : config.radar_size_ratio
      )
    );
    return pos.length === 1 ? pos[0] : pos;
  },
  /**
   * Generate data points
   * @private
   */
  generateRadarPoints() {
    const $$ = this;
    const targets = $$.data.targets;
    const [width, height] = $$.getRadarSize();
    const points = $$.cache.get(cacheKeyPoints) || {};
    const size = points._size;
    if (!size || size.width !== width && size.height !== height) {
      targets.forEach((d) => {
        points[d.id] = d.values.map((v, i) => $$.getRadarPosition(["x", "y"], i, void 0, $$.getRatio("radar", v)));
      });
      points._size = { width, height };
      $$.cache.add(cacheKeyPoints, points);
    }
  },
  redrawRadar() {
    const $$ = this;
    const { radar, main } = $$.$el;
    const translate = $$.getTranslate("radar");
    if (translate) {
      radar.attr("transform", translate);
      main.select(`.${$TEXT.chartTexts}`).attr("transform", translate);
      $$.generateRadarPoints();
      $$.updateRadarLevel();
      $$.updateRadarAxes();
      $$.updateRadarShape();
    }
  },
  generateGetRadarPoints() {
    const points = this.cache.get(cacheKeyPoints);
    return (d, i) => {
      const point = points[d.id][i];
      return [
        point,
        point,
        point,
        point
      ];
    };
  },
  updateRadarLevel() {
    const $$ = this;
    const { config, state, $el: { radar } } = $$;
    const [width, height] = $$.getRadarSize();
    const depth = config.radar_level_depth;
    const edge = config.axis_x_categories.length;
    const showText = config.radar_level_text_show;
    const radarLevels = radar.levels;
    const levelData = getRange(0, depth);
    const radius = config.radar_size_ratio * Math.min(width, height);
    const levelRatio = levelData.map((l) => radius * ((l + 1) / depth));
    const levelTextFormat = (config.radar_level_text_format || function() {
    }).bind($$.api);
    const points = levelData.map((v) => {
      const range = levelRatio[v];
      const pos = getRange(0, edge).map(
        (i) => $$.getRadarPosition(["x", "y"], i, range, 1).join(",")
      );
      return pos.join(" ");
    });
    const level = radarLevels.selectAll(`.${$LEVEL.level}`).data(levelData);
    level.exit().remove();
    const levelEnter = level.enter().append("g").attr("class", (d, i) => `${$LEVEL.level} ${$LEVEL.level}-${i}`);
    levelEnter.append("polygon").style("visibility", config.radar_level_show ? null : "hidden");
    if (showText) {
      if (radarLevels.select("text").empty()) {
        radarLevels.append("text").attr("dx", "-.5em").attr("dy", "-.7em").style("text-anchor", "end").text(() => levelTextFormat(0));
      }
      levelEnter.append("text").attr("dx", "-.5em").style("text-anchor", "end").text(
        (d) => levelTextFormat(
          state.current.dataMax / levelData.length * (d + 1)
        )
      );
    }
    levelEnter.merge(level).attr(
      "transform",
      (d) => `translate(${width - levelRatio[d]}, ${height - levelRatio[d]})`
    ).selectAll("polygon").attr("points", (d) => points[d]);
    if (showText) {
      radarLevels.selectAll("text").attr("x", (d) => isUndefined(d) ? width : points[d].split(",")[0]).attr("y", (d) => isUndefined(d) ? height : 0);
    }
  },
  updateRadarAxes() {
    const $$ = this;
    const { config, $el: { radar } } = $$;
    const [width, height] = $$.getRadarSize();
    const categories = config.axis_x_categories;
    let axis = radar.axes.selectAll("g").data(categories);
    axis.exit().remove();
    const axisEnter = axis.enter().append("g").attr("class", (d, i) => `${$AXIS.axis}-${i}`);
    config.radar_axis_line_show && axisEnter.append("line");
    config.radar_axis_text_show && axisEnter.append("text");
    axis = axisEnter.merge(axis);
    if (config.radar_axis_line_show) {
      axis.select("line").attr("x1", width).attr("y1", height).attr("x2", (d, i) => $$.getRadarPosition("x", i)).attr("y2", (d, i) => $$.getRadarPosition("y", i));
    }
    if (config.radar_axis_text_show) {
      const { x = 0, y = 0 } = config.radar_axis_text_position;
      const textWidth = $$.cache.get(cacheKeyTextWidth) || 0;
      axis.select("text").style("text-anchor", "middle").attr("dy", ".5em").call((selection) => {
        selection.each(function(d) {
          setTextValue((0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this), String(d), [-0.6, 1.2]);
        });
      }).datum((d, i) => ({ index: i })).attr("transform", function(d) {
        if (isUndefined(this.width)) {
          this.width = this.getBoundingClientRect().width / 2;
        }
        let posX = $$.getRadarPosition("x", d.index, void 0, 1);
        let posY = Math.round($$.getRadarPosition("y", d.index, void 0, 1));
        if (posX > width) {
          posX += this.width + x;
        } else if (Math.round(posX) < width) {
          posX -= this.width + x;
        }
        if (posY > height) {
          if (posY / 2 === height && this.firstChild.tagName === "tspan") {
            this.firstChild.setAttribute("dy", "0em");
          }
          posY += y;
        } else if (posY < height) {
          posY -= y;
        }
        return `translate(${posX} ${posY})`;
      });
      if (!textWidth) {
        const widths = [radar.axes, radar.levels].map((v) => getPathBox(v.node()).width);
        if (widths.every((v) => v > 0)) {
          $$.cache.add(cacheKeyTextWidth, widths[0] - widths[1]);
        }
      }
    }
  },
  bindRadarEvent() {
    const $$ = this;
    const { state, $el: { radar, svg } } = $$;
    const focusOnly = $$.isPointFocusOnly();
    const { inputType, transiting } = state;
    const isMouse = inputType === "mouse";
    const hide = (event) => {
      state.event = event;
      const index = $$.getDataIndexFromEvent(event);
      const noIndex = isUndefined(index);
      if (isMouse || noIndex) {
        $$.hideTooltip();
        focusOnly ? $$.hideCircleFocus() : $$.unexpandCircles();
        if (isMouse) {
          $$.setOverOut(false, index);
        } else if (noIndex) {
          $$.callOverOutForTouch();
        }
      }
    };
    radar.axes.on(isMouse ? "mouseover " : "touchstart", (event) => {
      if (transiting) {
        return;
      }
      state.event = event;
      const index = $$.getDataIndexFromEvent(event);
      $$.selectRectForSingle(svg.node(), index);
      isMouse ? $$.setOverOut(true, index) : $$.callOverOutForTouch(index);
    }).on("mouseout", isMouse ? hide : null);
    if (!isMouse) {
      svg.on("touchstart", hide);
    }
  },
  updateRadarShape() {
    const $$ = this;
    const targets = $$.data.targets.filter((d) => $$.isRadarType(d));
    const points = $$.cache.get(cacheKeyPoints);
    const areas = $$.$el.radar.shapes.selectAll("polygon").data(targets);
    const areasEnter = areas.enter().append("g").attr("class", $$.getChartClass("Radar"));
    $$.$T(areas.exit()).remove();
    areasEnter.append("polygon").merge(areas).style("fill", $$.color).style("stroke", $$.color).attr("points", (d) => points[d.id].join(" "));
    $$.updateTargetForCircle(targets, areasEnter);
  },
  /**
   * Get data point x coordinate
   * @param {object} d Data object
   * @returns {number}
   * @private
   */
  radarCircleX(d) {
    return this.cache.get(cacheKeyPoints)[d.id][d.index][0];
  },
  /**
   * Get data point y coordinate
   * @param {object} d Data object
   * @returns {number}
   * @private
   */
  radarCircleY(d) {
    return this.cache.get(cacheKeyPoints)[d.id][d.index][1];
  }
});

// EXTERNAL MODULE: external {"commonjs":"d3-hierarchy","commonjs2":"d3-hierarchy","amd":"d3-hierarchy","root":"d3"}
var external_commonjs_d3_hierarchy_commonjs2_d3_hierarchy_amd_d3_hierarchy_root_d3_ = __webpack_require__(14);
;// CONCATENATED MODULE: ./src/ChartInternal/shape/treemap.ts




function position(group, root) {
  const $$ = this;
  const { scale: { x, y }, state: { width } } = $$;
  group.selectAll("g").attr("transform", (d) => `translate(${d === root ? "0,0" : `${x(d.x0)},${y(d.y0)}`})`).select("rect").attr("width", (d) => d === root ? width : x(d.x1) - x(d.x0)).attr("height", (d) => d === root ? 0 : y(d.y1) - y(d.y0));
}
function convertDataToTreemapData(data) {
  const $$ = this;
  return data.map((d) => {
    const { id, values } = d;
    const { value } = values[0];
    return {
      name: id,
      id,
      // needed to keep compatibility on whole code logic
      value,
      ratio: $$.getRatio("treemap", values[0])
    };
  });
}
function getHierachyData(data) {
  const $$ = this;
  const hierarchyData = (0,external_commonjs_d3_hierarchy_commonjs2_d3_hierarchy_amd_d3_hierarchy_root_d3_.hierarchy)(data).sum((d) => d.value);
  const sortFn = $$.getSortCompareFn(true);
  return [
    $$.treemap(
      sortFn ? hierarchyData.sort(sortFn) : hierarchyData
    )
  ];
}
/* harmony default export */ var treemap = ({
  initTreemap() {
    const $$ = this;
    const {
      $el,
      state: {
        current: { width, height },
        clip,
        datetimeId
      }
    } = $$;
    clip.id = `${datetimeId}-clip`;
    $$.treemap = (0,external_commonjs_d3_hierarchy_commonjs2_d3_hierarchy_amd_d3_hierarchy_root_d3_.treemap)().tile($$.getTreemapTile());
    $el.defs.append("clipPath").attr("id", clip.id).append("rect").attr("width", width).attr("height", height);
    $el.treemap = $el.main.select(`.${$COMMON.chart}`).attr("clip-path", `url(#${clip.id})`).append("g").classed($TREEMAP.chartTreemaps, true);
    $$.bindTreemapEvent();
  },
  /**
   * Bind events
   * @private
   */
  bindTreemapEvent() {
    const $$ = this;
    const { $el, config, state } = $$;
    const getTarget = (event) => {
      var _a;
      const target = event.isTrusted ? event.target : (_a = state.eventReceiver.rect) == null ? void 0 : _a.node();
      let data;
      if (/^rect$/i.test(target.tagName)) {
        state.event = event;
        data = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(target).datum();
      }
      return data == null ? void 0 : data.data;
    };
    if (config.interaction_enabled) {
      const isTouch = state.inputType === "touch";
      $el.treemap.on(isTouch ? "touchstart" : "mouseover mousemove", (event) => {
        const data = getTarget(event);
        if (data) {
          $$.showTooltip([data], event.currentTarget);
          /^(touchstart|mouseover)$/.test(event.type) && $$.setOverOut(true, data);
        }
      }).on(isTouch ? "touchend" : "mouseout", (event) => {
        const data = getTarget(event);
        $$.hideTooltip();
        $$.setOverOut(false, data);
      });
    }
  },
  /**
   * Get tiling function
   * @returns {Function}
   * @private
   */
  getTreemapTile() {
    var _a, _b;
    const $$ = this;
    const { config, state: { current: { width, height } } } = $$;
    const tile = (_b = {
      binary: external_commonjs_d3_hierarchy_commonjs2_d3_hierarchy_amd_d3_hierarchy_root_d3_.treemapBinary,
      dice: external_commonjs_d3_hierarchy_commonjs2_d3_hierarchy_amd_d3_hierarchy_root_d3_.treemapDice,
      slice: external_commonjs_d3_hierarchy_commonjs2_d3_hierarchy_amd_d3_hierarchy_root_d3_.treemapSlice,
      sliceDice: external_commonjs_d3_hierarchy_commonjs2_d3_hierarchy_amd_d3_hierarchy_root_d3_.treemapSliceDice,
      squarify: external_commonjs_d3_hierarchy_commonjs2_d3_hierarchy_amd_d3_hierarchy_root_d3_.treemapSquarify,
      resquarify: external_commonjs_d3_hierarchy_commonjs2_d3_hierarchy_amd_d3_hierarchy_root_d3_.treemapResquarify
    }[(_a = config.treemap_tile) != null ? _a : "binary"]) != null ? _b : external_commonjs_d3_hierarchy_commonjs2_d3_hierarchy_amd_d3_hierarchy_root_d3_.treemapBinary;
    return (node, x0, y0, x1, y1) => {
      tile(node, 0, 0, width, height);
      for (const child of node.children) {
        child.x0 = x0 + child.x0 / width * (x1 - x0);
        child.x1 = x0 + child.x1 / width * (x1 - x0);
        child.y0 = y0 + child.y0 / height * (y1 - y0);
        child.y1 = y0 + child.y1 / height * (y1 - y0);
      }
    };
  },
  /**
   * Get treemap hierarchy data
   * @param {Array} targets Data targets
   * @returns {object}
   * @private
   */
  getTreemapData(targets) {
    const $$ = this;
    return {
      name: "root",
      children: convertDataToTreemapData.bind($$)(
        $$.filterTargetsToShow(targets.filter($$.isTreemapType, $$))
      )
    };
  },
  /**
   * Update treemap data
   * @param {Array} targets Data targets
   * @private
   */
  updateTargetsForTreemap(targets) {
    const $$ = this;
    const { $el: { treemap } } = $$;
    const treemapData = getHierachyData.call($$, $$.getTreemapData(targets != null ? targets : $$.data.targets));
    treemap.data(treemapData);
  },
  /**
   * Render treemap
   * @param {number} durationForExit Duration for exit transition
   * @private
   */
  updateTreemap(durationForExit) {
    const $$ = this;
    const { $el, $T } = $$;
    const data = $el.treemap.datum();
    const classChartTreemap = $$.getChartClass("Treemap");
    const classTreemap = $$.getClass("treemap", true);
    const treemap = $el.treemap.selectAll("g").data(data.children);
    $T(treemap.exit(), durationForExit).style("opacity", "0").remove();
    treemap.enter().append("g").append("rect");
    $el.treemap.selectAll("g").attr("class", classChartTreemap).select("rect").attr("class", classTreemap).attr("fill", (d) => $$.color(d.data.name));
  },
  /**
   * Generate treemap coordinate points data
   * @returns {Array} Array of coordinate points
   * @private
   */
  generateGetTreemapPoints() {
    const $$ = this;
    const { $el, scale: { x, y } } = $$;
    const points = {};
    $el.treemap.selectAll("g").each((d) => {
      points[d.data.name] = [
        [x(d.x0), y(d.y0)],
        [x(d.x1), y(d.y1)]
      ];
    });
    return (d) => points[d.id];
  },
  /**
   * Redraw treemap
   * @param {boolean} withTransition With or without transition
   * @returns {Array} Selections
   * @private
   */
  redrawTreemap(withTransition) {
    const $$ = this;
    const { $el, state: { current: { width, height } } } = $$;
    $el.defs.select("rect").attr("width", width).attr("height", height);
    return [
      $$.$T($el.treemap, withTransition, getRandom()).call(position.bind($$), $el.treemap.datum())
    ];
  },
  /**
   * Get treemap data label format function
   * @param {object} d Data object
   * @returns {Function}
   * @private
   */
  treemapDataLabelFormat(d) {
    const $$ = this;
    const { config } = $$;
    const { id, value } = d;
    const format = config.treemap_label_format;
    const ratio = $$.getRatio("treemap", d);
    const percentValue = (ratio * 100).toFixed(2);
    const meetLabelThreshold = config.treemap_label_show && $$.meetsLabelThreshold(
      ratio,
      "treemap"
    ) ? null : "0";
    return function(node) {
      node.style("opacity", meetLabelThreshold);
      return isFunction(format) ? format.bind($$.api)(value, ratio, id) : `${id}
${percentValue}%`;
    };
  }
});

;// CONCATENATED MODULE: ./src/config/Options/common/point.ts
/* harmony default export */ var common_point = ({
  /**
   * Set point options
   * @name point
   * @memberof Options
   * @type {object}
   * @property {object} point Point object
   * @property {boolean} [point.show=true] Whether to show each point in line.
   * @property {number|Function} [point.r=2.5] The radius size of each point.
   *  - **NOTE:** Disabled for 'bubble' type
   * @property {boolean|object} [point.radialGradient=false] Set the radial gradient on point.<br><br>
   * Or customize by giving below object value:
   *  - cx {number}: `cx` value (default: `0.3`)
   *  - cy {number}: `cy` value (default: `0.3`)
   *  - r {number}: `r` value (default: `0.7`)
   *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
   *    - (default: `[[0.1, $DATA_COLOR, 1], [0.9, $DATA_COLOR, 0]]`)
   * @property {boolean} [point.focus.expand.enabled=true] Whether to expand each point on focus.
   * @property {number} [point.focus.expand.r=point.r*1.75] The radius size of each point on focus.
   *  - **NOTE:** For 'bubble' type, the default is `bubbleSize*1.15`
   * @property {boolean} [point.focus.only=false] Show point only when is focused.
   * @property {number|null} [point.opacity=undefined] Set point opacity value.
   * - **NOTE:**
   * 	- `null` will make to not set inline 'opacity' css prop.
   * 	- when no value(or undefined) is set, it defaults to set opacity value according its chart types.
   * @property {number|string|Function} [point.sensitivity=10] The senstivity value for interaction boundary.
   * - **Available Values:**
   *   - {number}: Absolute sensitivity value which is the distance from the data point in pixel.
   *   - "radius": sensitivity based on point's radius
   *   - Function: callback for each point to determine the sensitivity<br>
   *    	```js
   *   	sensitivity: function(d) {
   * 	  // ex. of argument d:
   * 	  // ==> {x: 2, value: 55, id: 'data3', index: 2, r: 19.820624179302296}
   *
   * 	  // returning d.r, will make sensitivity same as point's radius value.
   *  	  return d.r;
   * 	}
   * 	```
   * @property {number} [point.select.r=point.r*4] The radius size of each point on selected.
   * @property {string} [point.type="circle"] The type of point to be drawn
   * - **NOTE:**
   *   - If chart has 'bubble' type, only circle can be used.
   *   - For IE, non circle point expansions are not supported due to lack of transform support.
   * - **Available Values:**
   *   - circle
   *   - rectangle
   * @property {Array} [point.pattern=[]] The type of point or svg shape as string, to be drawn for each line
   * - **NOTE:**
   *   - This is an `experimental` feature and can have some unexpected behaviors.
   *   - If chart has 'bubble' type, only circle can be used.
   *   - For IE, non circle point expansions are not supported due to lack of transform support.
   * - **Available Values:**
   *   - circle
   *   - rectangle
   *   - svg shape tag interpreted as string<br>
   *     (ex. `<polygon points='2.5 0 0 5 5 5'></polygon>`)
   * @see [Demo: point type](https://naver.github.io/billboard.js/demo/#Point.RectanglePoints)
   * @see [Demo: point focus only](https://naver.github.io/billboard.js/demo/#Point.FocusOnly)
   * @see [Demo: point radialGradient](https://naver.github.io/billboard.js/demo/#Point.RadialGradientPoint)
   * @see [Demo: point sensitivity](https://naver.github.io/billboard.js/demo/#Point.PointSensitivity)
   * @example
   *  point: {
   *      show: false,
   *      r: 5,
   *
   *      // or customize the radius
   *      r: function(d) {
   *          ...
   *          return r;
   *      },
   *
   *      // will generate follwing radialGradient:
   *      // for more info: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient
   *      // <radualGradient cx="0.3" cy="0.3" r="0.7">
   *      //    <stop offset="0.1" stop-color="$DATA_COLOR" stop-opacity="1"></stop>
   *      //    <stop offset="0.9" stop-color="$DATA_COLOR" stop-opacity="0"></stop>
   *      // </radialrGradient>
   *      radialGradient: true,
   *
   *      // Or customized gradient
   *      radialGradient: {
   *      	cx: 0.3,  // cx attributes
   *      	cy: 0.5,  // cy attributes
   *      	r: 0.7,  // r attributes
   *      	stops: [
   *      	  // offset, stop-color, stop-opacity
   *      	  [0, "#7cb5ec", 1],
   *
   *      	  // setting 'null' for stop-color, will set its original data color
   *      	  [0.5, null, 0],
   *
   *      	  // setting 'function' for stop-color, will pass data id as argument.
   *      	  // It should return color string or null value
   *      	  [1, function(id) { return id === "data1" ? "red" : "blue"; }, 0],
   *      	]
   *      },
   *
   *      focus: {
   *          expand: {
   *              enabled: true,
   *              r: 1
   *          },
   *          only: true
   *      },
   *
   *      // do not set inline 'opacity' css prop setting
   *      opacity: null,
   *
   *      // set every data point's opacity value
   *      opacity: 0.7,
   *
   *      select: {
   *          r: 3
   *      },
   *
   *      // having lower value, means how closer to be for interaction
   *      sensitivity: 3,
   *
   *      // sensitivity based on point's radius
   *      sensitivity: "radius",
   *
   *      // callback for each point to determine the sensitivity
   *      sensitivity: function(d) {
   * 	// ex. of argument d:
   * 	// ==> {x: 2, value: 55, id: 'data3', index: 2, r: 19.820624179302296}
   *
   * 	// returning d.r, will make sensitivity same as point's radius value.
   * 	return d.r;
   *      }
   *
   *      // valid values are "circle" or "rectangle"
   *      type: "rectangle",
   *
   *      // or indicate as pattern
   *      pattern: [
   *        "circle",
   *        "rectangle",
   *        "<polygon points='0 6 4 0 -4 0'></polygon>"
   *     ],
   *  }
   */
  point_show: true,
  point_r: 2.5,
  point_radialGradient: false,
  point_sensitivity: 10,
  point_focus_expand_enabled: true,
  point_focus_expand_r: void 0,
  point_focus_only: false,
  point_opacity: void 0,
  point_pattern: [],
  point_select_r: void 0,
  point_type: "circle"
});

;// CONCATENATED MODULE: ./src/config/Options/shape/area.ts
/* harmony default export */ var Options_shape_area = ({
  /**
   * Set area options
   * @name area
   * @memberof Options
   * @type {object}
   * @property {object} area Area object
   * @property {boolean} [area.above=false] Set background area `above` the data chart line.
   * @property {boolean} [area.below=false] Set background area `below` the data chart line.
   *  - **NOTE**: Can't be used along with `above` option. When above & below options are set to true, `above` will be prioritized.
   * @property {boolean} [area.front=true] Set area node to be positioned over line node.
   * @property {boolean|object} [area.linearGradient=false] Set the linear gradient on area.<br><br>
   * Or customize by giving below object value:
   *  - x {Array}: `x1`, `x2` value (default: `[0, 0]`)
   *  - y {Array}: `y1`, `y2` value (default: `[0, 1]`)
   *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
   *    - (default: `[[0, $DATA_COLOR, 1], [1, $DATA_COLOR, 0]]`)
   * @property {boolean} [area.zerobased=true] Set if min or max value will be 0 on area chart.
   * @see [MDN's &lt;linearGradient>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient), [&lt;stop>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop)
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.AreaChart)
   * @see [Demo: above](https://naver.github.io/billboard.js/demo/#AreaChartOptions.Above)
   * @see [Demo: below](https://naver.github.io/billboard.js/demo/#AreaChartOptions.Below)
   * @see [Demo: linearGradient](https://naver.github.io/billboard.js/demo/#AreaChartOptions.LinearGradient)
   * @example
   *  area: {
   *      above: true,
   *      below: false,
   *      zerobased: false,
   *
   *      // <g class='bb-areas'> will be positioned behind the line <g class='bb-lines'> in stacking order
   *      front: false,
   *
   *      // will generate follwing linearGradient:
   *      // for more info: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
   *      // <linearGradient x1="0" x2="0" y1="0" y2="1">
   *      //    <stop offset="0" stop-color="$DATA_COLOR" stop-opacity="1"></stop>
   *      //    <stop offset="1" stop-color="$DATA_COLOR" stop-opacity="0"></stop>
   *      // </linearGradient>
   *      linearGradient: true,
   *
   *      // Or customized gradient
   *      linearGradient: {
   *      	x: [0, 0],  // x1, x2 attributes
   *      	y: [0, 0],  // y1, y2 attributes
   *      	stops: [
   *      	  // offset, stop-color, stop-opacity
   *      	  [0, "#7cb5ec", 1],
   *
   *      	  // setting 'null' for stop-color, will set its original data color
   *      	  [0.5, null, 0],
   *
   *      	  // setting 'function' for stop-color, will pass data id as argument.
   *      	  // It should return color string or null value
   *      	  [1, function(id) { return id === "data1" ? "red" : "blue"; }, 0],
   *      	]
   *      }
   *  }
   */
  area_above: false,
  area_below: false,
  area_front: true,
  area_linearGradient: false,
  area_zerobased: true
});

;// CONCATENATED MODULE: ./src/config/Options/shape/bar.ts
/* harmony default export */ var shape_bar = ({
  /**
   * Set bar options
   * @name bar
   * @memberof Options
   * @type {object}
   * @property {object} bar Bar object
   * @property {boolean} [bar.front=false] Set 'bar' to be positioned over(on the top) other shapes elements.
   * @property {number} [bar.indices.removeNull=false] Remove nullish data on bar indices positions.
   * @property {number} [bar.label.threshold=0] Set threshold ratio to show/hide labels.
   * @property {boolean|object} [bar.linearGradient=false] Set the linear gradient on bar.<br><br>
   * Or customize by giving below object value:
   *  - x {Array}: `x1`, `x2` value (default: `[0, 0]`)
   *  - y {Array}: `y1`, `y2` value (default: `[0, 1]`)
   *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
   *    - (default: `[[0, $DATA_COLOR, 1], [1, $DATA_COLOR, 0]]`)
   * @property {boolean} [bar.overlap=false] Bars will be rendered at same position, which will be overlapped each other. (for non-grouped bars only)
   * @property {number} [bar.padding=0] The padding pixel value between each bar.
   * @property {number} [bar.radius] Set the radius of bar edge in pixel.
   * @property {number} [bar.radius.ratio] Set the radius ratio of bar edge in relative the bar's width.
   * @property {number} [bar.sensitivity=2] The senstivity offset value for interaction boundary.
   * @property {number|Function|object} [bar.width] Change the width of bar chart.
   * @property {number} [bar.width.ratio=0.6] Change the width of bar chart by ratio.
   * - **NOTE:** Criteria for ratio.
   *   - When x ticks count is same with the data count, the baseline for ratio is the minimum interval value of x ticks.
   * 	   - ex. when timeseries x values are: [2024-01-01, 2024-02-01, 2024-03-01], the minimum interval will be `2024-02-01 ~ 2024-03-01`
   *     - if the minimum interval is 30px, then ratio=1 means 30px.
   *   - When x ticks count is lower than the data count, the baseline will be calculated as `chart width / data count`.
   * 	   - ex. when chart width is 500, data count is 5, then ratio=1 means 100px.
   * @property {number} [bar.width.max] The maximum width value for ratio.
   * @property {number} [bar.width.dataname] Change the width of bar for indicated dataset only.
   * @property {number} [bar.width.dataname.ratio=0.6] Change the width of bar chart by ratio.
   *  - **NOTE:**
   *   - Works only for non-stacked bar
   * @property {number} [bar.width.dataname.max] The maximum width value for ratio.
   * @property {boolean} [bar.zerobased=true] Set if min or max value will be 0 on bar chart.
   * @see [Demo: bar front](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarFront)
   * @see [Demo: bar indices](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarIndices)
   * @see [Demo: bar overlap](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarOverlap)
   * @see [Demo: bar padding](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarPadding)
   * @see [Demo: bar radius](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarRadius)
   * @see [Demo: bar width](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidth)
   * @see [Demo: bar width variant](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidthVariant)
   * @example
   *  bar: {
   *      // make bar shape to be positioned over the other shape elements
   *      front: true,
   *
   *      // remove nullish data on bar indices postions
   *      indices: {
   *          removeNull: true
   *      },
   *
   *      // will generate follwing linearGradient:
   *      // for more info: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
   *      // <linearGradient x1="0" x2="0" y1="0" y2="1">
   *      //    <stop offset="0" stop-color="$DATA_COLOR" stop-opacity="1"></stop>
   *      //    <stop offset="1" stop-color="$DATA_COLOR" stop-opacity="0"></stop>
   *      // </linearGradient>
   *      linearGradient: true,
   *
   *      // Or customized gradient
   *      linearGradient: {
   *      	x: [0, 0],  // x1, x2 attributes
   *      	y: [0, 0],  // y1, y2 attributes
   *      	stops: [
   *      	  // offset, stop-color, stop-opacity
   *      	  [0, "#7cb5ec", 1],
   *
   *      	  // setting 'null' for stop-color, will set its original data color
   *      	  [0.5, null, 0],
   *
   *      	  // setting 'function' for stop-color, will pass data id as argument.
   *      	  // It should return color string or null value
   *      	  [1, function(id) { return id === "data1" ? "red" : "blue"; }, 0],
   *      	]
   *      },
   *
   *      // remove nullish da
   *      overlap: true,
   *
   *      padding: 1,
   *
   *      // bar radius
   *      radius: 10,
   *      // or
   *      radius: {
   *          ratio: 0.5
   *      }
   *
   *      label: {
   *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the y Axis domain range value.
   *          // if data value is below than 0.1, text label will be hidden.
   *          threshold: 0.1,
   *      },
   *
   *      // will not have offset between each bar elements for interaction
   *      sensitivity: 0,
   *
   *      width: 10,
   *
   *      // or specify width callback. The callback will receive width, targetsNum, maxDataCount as arguments.
   *      // - width: chart area width
   *      // - targetsNum: number of targets
   *      // - maxDataCount: maximum data count among targets
   *      width: function(width, targetsNum, maxDataCount) {
   *            return width / (targetsNum * maxDataCount);
   *      }
   *
   *      // or specify ratio & max
   *      width: {
   *          ratio: 0.2,
   *          max: 20
   *      },
   *
   *      // or specify width per dataset
   *      width: {
   *          data1: 20,
   *          data2: {
   *              ratio: 0.2,
   *              max: 20
   *          }
   *      },
   *
   *      zerobased: false
   *  }
   */
  bar_front: false,
  bar_indices_removeNull: false,
  bar_label_threshold: 0,
  bar_linearGradient: false,
  bar_overlap: false,
  bar_padding: 0,
  bar_radius: void 0,
  bar_radius_ratio: void 0,
  bar_sensitivity: 2,
  bar_width: void 0,
  bar_width_ratio: 0.6,
  bar_width_max: void 0,
  bar_zerobased: true
});

;// CONCATENATED MODULE: ./src/config/Options/shape/bubble.ts
/* harmony default export */ var shape_bubble = ({
  /**
   * Set bubble options
   * @name bubble
   * @memberof Options
   * @type {object}
   * @property {object} bubble bubble object
   * @property {number|Function} [bubble.maxR=35] Set the max bubble radius value
   * @property {boolean} [bubble.zerobased=false] Set if min or max value will be 0 on bubble chart.
   * @example
   *  bubble: {
   *      // ex) If 100 is the highest value among data bound, the representation bubble of 100 will have radius of 50.
   *      // And the lesser will have radius relatively from tha max value.
   *      maxR: 50,
   *
   *      // or set radius callback
   *      maxR: function(d) {
   *          // ex. of d param - {x: Fri Oct 06 2017 00:00:00 GMT+0900, value: 80, id: "data2", index: 5}
   *          ...
   *          return Math.sqrt(d.value * 2);
   *      },
   *      zerobased: false
   *  }
   */
  bubble_maxR: 35,
  bubble_zerobased: false
});

;// CONCATENATED MODULE: ./src/config/Options/shape/candlestick.ts
/* harmony default export */ var shape_candlestick = ({
  /**
   * Set candlestick options
   * @name candlestick
   * @memberof Options
   * @type {object}
   * @property {object} candlestick Candlestick object
   * @property {number} [candlestick.width] Change the width.
   * @property {number} [candlestick.width.ratio=0.6] Change the width by ratio.
   * @property {number} [candlestick.width.max] The maximum width value for ratio.
   * @property {number} [candlestick.width.dataname] Change the width for indicated dataset only.
   * @property {number} [candlestick.width.dataname.ratio=0.6] Change the width of bar chart by ratio.
   * @property {number} [candlestick.width.dataname.max] The maximum width value for ratio.
   * @property {object} [candlestick.color] Color setting.
   * @property {string|object} [candlestick.color.down] Change down(bearish) value color.
   * @property {string} [candlestick.color.down.dataname] Change down value color for indicated dataset only.
   *
   * @see [Demo](https://naver.github.io/billboard.js/demo/##Chart.CandlestickChart)
   * @example
   *  candlestick: {
   *      width: 10,
   *
   *      // or
   *      width: {
   *         	ratio: 0.2,
   *         	max: 20
   *      },
   *
   *      // or specify width per dataset
   *      width: {
   *         	data1: 20,
   *         	data2: {
   *         	    ratio: 0.2,
   *         		max: 20
   *         	}
   *      },
   *      color: {
   *  	  	// spcify bearish color
   *  	  	down: "red",
   *
   *  	  	// or specify color per dataset
   *  	  	down: {
   *  	  		data1: "red",
   *  	  		data2: "blue",
   *  	  	}
   *      }
   *  }
   */
  candlestick_width: void 0,
  candlestick_width_ratio: 0.6,
  candlestick_width_max: void 0,
  candlestick_color_down: "red"
});

;// CONCATENATED MODULE: ./src/config/Options/shape/line.ts
/* harmony default export */ var shape_line = ({
  /**
   * Set line options
   * @name line
   * @memberof Options
   * @type {object}
   * @property {object} line Line object
   * @property {boolean} [line.connectNull=false] Set if null data point will be connected or not.<br>
   *  If true set, the region of null data will be connected without any data point. If false set, the region of null data will not be connected and get empty.
   * @property {Array}   [line.classes=undefined] If set, used to set a css class on each line.
   * @property {boolean} [line.step.type=step] Change step type for step chart.<br>
   * **Available values:**
   * - step
   * - step-before
   * - step-after
   * @property {boolean} [line.step.tooltipMatch=false] Set to `true` for `step-before` and `step-after` types to have cursor/tooltip match to hovered step's point instead of nearest point.
   * @property {boolean|Array} [line.point=true] Set to false to not draw points on linecharts. Or pass an array of line ids to draw points for.
   * @property {boolean} [line.zerobased=false] Set if min or max value will be 0 on line chart.
   * @example
   *  line: {
   *      connectNull: true,
   *      classes: [
   *          "line-class1",
   *          "line-class2"
   *      ],
   *      step: {
   *          type: "step-after",
   *
   *          // to have cursor/tooltip match to hovered step's point instead of nearest point.
   *          tooltipMatch: true
   *      },
   *
   *      // hide all data points ('point.show=false' also has similar effect)
   *      point: false,
   *
   *      // show data points for only indicated datas
   *      point: [
   *          "data1", "data3"
   *      ],
   *
   *      zerobased: false
   *  }
   */
  line_connectNull: false,
  line_step_type: "step",
  line_step_tooltipMatch: false,
  line_zerobased: false,
  line_classes: void 0,
  line_point: true
});

;// CONCATENATED MODULE: ./src/config/Options/shape/scatter.ts
/* harmony default export */ var scatter = ({
  /**
   * Set scatter options
   * @name scatter
   * @memberof Options
   * @type {object}
   * @property {object} [scatter] scatter object
   * @property {boolean} [scatter.zerobased=false] Set if min or max value will be 0 on scatter chart.
   * @example
   *  scatter: {
   *      connectNull: true,
   *      step: {
   *          type: "step-after"
   *      },
   *
   *      // hide all data points ('point.show=false' also has similar effect)
   *      point: false,
   *
   *      // show data points for only indicated datas
   *      point: [
   *          "data1", "data3"
   *      ],
   *
   *      zerobased: false
   *  }
   */
  scatter_zerobased: false
});

;// CONCATENATED MODULE: ./src/config/Options/shape/spline.ts
/* harmony default export */ var spline = ({
  /**
   * Set spline options
   * - **Available interpolation type values:**
   *  - basis (d3.curveBasis)
   *  - basis-closed (d3.curveBasisClosed)
   *  - basis-open (d3.curveBasisOpen)
   *  - bundle (d3.curveBundle)
   *  - cardinal (d3.curveCardinal)
   *  - cardinal-closed (d3.curveCardinalClosed)
   *  - cardinal-open (d3.curveCardinalOpen)
   *  - catmull-rom (d3.curveCatmullRom)
   *  - catmull-rom-closed (d3.curveCatmullRomClosed)
   *  - catmull-rom-open (d3.curveCatmullRomOpen)
   *  - monotone-x (d3.curveMonotoneX)
   *  - monotone-y (d3.curveMonotoneY)
   *  - natural (d3.curveNatural)
   *  - linear-closed (d3.curveLinearClosed)
   *  - linear (d3.curveLinear)
   *  - step (d3.curveStep)
   *  - step-after (d3.curveStepAfter)
   *  - step-before (d3.curveStepBefore)
   * @name spline
   * @memberof Options
   * @type {object}
   * @property {object} spline Spline object
   * @property {object} spline.interpolation Spline interpolation object
   * @property {string} [spline.interpolation.type="cardinal"] Interpolation type
   * @see [Interpolation (d3 v4)](http://bl.ocks.org/emmasaunders/c25a147970def2b02d8c7c2719dc7502)
   * @example
   *  spline: {
   *      interpolation: {
   *          type: "cardinal"
   *      }
   *  }
   */
  spline_interpolation_type: "cardinal"
});

;// CONCATENATED MODULE: ./src/config/Options/shape/arc.ts
/* harmony default export */ var shape_arc = ({
  /**
   * Set arc options
   * @name arc
   * @memberof Options
   * @type {object}
   * @property {object} arc Arc object
   * @property {number|Function} [arc.cornerRadius=0] Set corner radius of Arc(donut/gauge/pie/polar) shape.
   *  - **NOTE:**
   * 	  - Corner radius can't surpass the `(outerRadius - innerRadius) /2` of indicated shape.
   * @property {number} [arc.cornerRadius.ratio=0] Set ratio relative of outer radius.
   * @property {object} [arc.needle] Set needle options.
   * @property {boolean} [arc.needle.show=false] Show or hide needle.
   * @property {string} [arc.needle.color] Set needle filled color.
   * @property {Function} [arc.needle.path] Set custom needle path function.
   *  - **NOTE:**
   *   - The path should be starting from 0,0 (which is center) to top center coordinate.
   *   - The function will receive, `length`{number} parameter which indicating the needle length in pixel relative to radius.
   * @property {number} [arc.needle.value] Set needle value.
   *  - **NOTE:**
   *   - For single gauge chart, needle will point the data value by default, otherwise will point 0(zero).
   * @property {number} [arc.needle.length=100] Set needle length in percentages relative to radius.
   * @property {object} [arc.needle.top] Set needle top options.
   * @property {number} [arc.needle.top.rx=0] Set needle top [rx radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
   * @property {number} [arc.needle.top.ry=0] Set needle top [ry radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
   * @property {number} [arc.needle.top.width=0] Set needle top width in pixel.
   * @property {object} [arc.needle.bottom] Set needle bottom options.
   * @property {number} [arc.needle.bottom.rx=1] Set needle bottom [rx radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
   * @property {number} [arc.needle.bottom.ry=1] Set needle bottom [ry radius value](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve).
   * @property {number} [arc.needle.bottom.width=15] Set needle bottom width in pixel.
   * @property {number} [arc.needle.bottom.len=0] Set needle bottom length in pixel. Setting this value, will make bottom larger starting from center.
   * @property {object} [arc.rangeText] Set rangeText options.
   * @property {Array} [arc.rangeText.values] Set range text values to be shown around Arc.
   * - When `unit: 'absolute'`: Given values are treated as absolute values.
   * - When `unit: '%'`: Given values are treated as percentages.
   * @property {string} [arc.rangeText.unit="absolute"] Specify the range text unit.
   * - "absolute": Show absolute value
   * - "%": Show percentage value
   * @property {boolean} [arc.rangeText.fiexed=false] Set if range text shown will be fixed w/o data toggle update. Only available for gauge chart.
   * @property {Function} [arc.rangeText.format] Set format function for the range text.
   * @property {number} [arc.rangeText.position] Set position function or object for the range text.
   * @see [Demo: Donut corner radius](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutCornerRadius)
   * @see [Demo: Donut corner radius](https://naver.github.io/billboard.js/demo/#PieChartOptions.CornerRadius)
   * @see [Demo: Donut needle](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutNeedle)
   * @see [Demo: Donut RangeText](https://naver.github.io/billboard.js/demo/#DonutChartOptions.DonutRangeText)
   * @see [Demo: Gauge corner radius](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeCornerRadius)
   * @see [Demo: Gauge needle](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeNeedle)
   * @see [Demo: Gauge RangeText](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeRangeText)
   * @example
   *  arc: {
   *      cornerRadius: 12,
   *
   *      // can customize corner radius for each data with function callback
   *      //
   *      // The function will receive:
   *      // - id {string}: Data id
   *      // - value {number}: Data value
   *      // - outerRadius {number}: Outer radius value
   *      cornerRadius: function(id, value, outerRadius) {
   *          return (id === "data1" && value > 10) ?
   *          	50 : outerRadius * 1.2;
   *      },
   *
   *      // set ratio relative of outer radius
   *      cornerRadius: {
   *          ratio: 0.5
   *      },
   *
   *      needle: {
   *       	show: true,
   *       	color: "red", // any valid CSS color
   *       	path: function(length) {
   *       	  const len = length - 20;
   *
   *       	  // will return upper arrow shape path
   *       	  // Note: The path should begun from '0,0' coordinate to top center.
   *       	  const path = `M 0 -${len + 20}
   *       		L -12 -${len}
   *       		L -5 -${len}
   *       		L -5 0
   *       		A 1 1 0 0 0 5 0
   *       		L 5 -${len}
   *       		L 12 -${len} Z`;
   *
   *       	  return path;
   *       	},
   *       	value: 40,  // will make needle to point value 40.
   *       	length: 80, // needle length in percentages relative to radius.
   *
   *       	top: {
   *       	  // rx and ry are the two radii of the ellipse;
   *       	  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
   *       	  rx: 1,
   *       	  ry: 1,
   *       	  width: 5
   *       	},
   *       	bottom: {
   *       	  // rx and ry are the two radii of the ellipse;
   *       	  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve
   *       	  rx: 1,
   *       	  ry: 1,
   *       	  width: 10
   *       	  len: 10
   *       	}
   *      },
   *
   *      rangeText: {
   *       	values: [15, 30, 50, 75, 95],
   *       	unit: "%",
   *       	fixed: false, // only available for gauge chart
   *       	format: function(v) {
   *       	  return v === 15 ? "Fifteen" : v;
   *       	},
   *
   *       	position: function(v) {
   *       	  return v === 15 ? {x: 20, y: 10} : null; // can return one props value also.
   *       	},
   *       	position: {x: 10, y: 15},
   *       	position: {x: 10}
   *      }
   *  }
   */
  arc_cornerRadius: 0,
  arc_cornerRadius_ratio: 0,
  arc_needle_show: false,
  arc_needle_color: void 0,
  arc_needle_value: void 0,
  arc_needle_path: void 0,
  arc_needle_length: 100,
  arc_needle_top_rx: 0,
  arc_needle_top_ry: 0,
  arc_needle_top_width: 0,
  arc_needle_bottom_rx: 1,
  arc_needle_bottom_ry: 1,
  arc_needle_bottom_width: 15,
  arc_needle_bottom_len: 0,
  arc_rangeText_values: void 0,
  arc_rangeText_unit: "absolute",
  arc_rangeText_fixed: false,
  arc_rangeText_format: void 0,
  arc_rangeText_position: void 0
});

;// CONCATENATED MODULE: ./src/config/Options/shape/donut.ts
/* harmony default export */ var donut = ({
  /**
   * Set donut options
   * @name donut
   * @memberof Options
   * @type {object}
   * @property {object} donut Donut object
   * @property {boolean} [donut.label.show=true] Show or hide label on each donut piece.
   * @property {Function} [donut.label.format] Set formatter for the label on each donut piece.
   * @property {number} [donut.label.threshold=0.05] Set threshold ratio to show/hide labels.
   * @property {number|Function} [donut.label.ratio=undefined] Set ratio of labels position.
   * @property {boolean} [donut.expand=true] Enable or disable expanding donut pieces.
   * @property {number} [donut.expand.rate=0.98] Set expand rate.
   * @property {number} [donut.expand.duration=50] Set expand transition time in ms.
   * @property {number} [donut.width] Set width of donut chart.
   * @property {string} [donut.title=""] Set title of donut chart. Use `\n` character for line break.
   *  - **NOTE:**
   *    - When `arc.needle.show=true` is set, special template `{=NEEDLE_VALUE}` can be used inside the title text to show current needle value.
   * @property {number} [donut.padAngle=0] Set padding between data.
   * @property {number} [donut.startingAngle=0] Set starting angle where data draws.
   * @example
   *  donut: {
   *      label: {
   *          show: false,
   *          format: function(value, ratio, id) {
   *              return d3.format("$")(value);
   *
   *              // to multiline, return with '\n' character
   *              // return value +"%\nLine1\n2Line2";
   *          },
   *
   *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
   *          // if data value is below than 0.1, text label will be hidden.
   *          threshold: 0.1,
   *
   *          // set ratio callback. Should return ratio value
   *          ratio: function(d, radius, h) {
   *          	...
   *          	return ratio;
   *          },
   *          // or set ratio number
   *          ratio: 0.5
   *      },
   *
   *      // disable expand transition for interaction
   *      expand: false,
   *
   *      expand: {
   *      	// set duration of expand transition to 500ms.
   *          duration: 500,
   *
   *      	// set expand area rate
   *          rate: 1
   *      },
   *
   *      width: 10,
   *      padAngle: 0.2,
   *      startingAngle: 1,
   *      title: "Donut Title"
   *
   *      // when 'arc.needle.show=true' is set, can show current needle value.
   *      title: "Needle value:\n{=NEEDLE_VALUE}",
   *
   *      // title with line break
   *      title: "Title1\nTitle2"
   *  }
   */
  donut_label_show: true,
  donut_label_format: void 0,
  donut_label_threshold: 0.05,
  donut_label_ratio: void 0,
  donut_width: void 0,
  donut_title: "",
  donut_expand: {},
  donut_expand_rate: 0.98,
  donut_expand_duration: 50,
  donut_padAngle: 0,
  donut_startingAngle: 0
});

;// CONCATENATED MODULE: ./src/config/Options/shape/funnel.ts
/* harmony default export */ var shape_funnel = ({
  /**
   * Set funnel options
   * @name funnel
   * @memberof Options
   * @type {object}
   * @property {object} funnel Funnel object
   * @property {number} [funnel.neck.width=0] Set funnel neck width.
   * @property {number} [funnel.neck.height=0] Set funnel neck height.
   * @property {number} [funnel.neck.width.ratio] Set funnel neck width in ratio.
   * @property {number} [funnel.neck.height.ratio] Set funnel neck height in ratio.
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.PolarChart)
   * @example
   *  funnel: {
   *      neck: {
   *          width: 200,
   *          height: 100,
   *
   *          // or specify as ratio value (relative to the chart size)
   *          width: {
   *            ratio: 0.5
   *          },
   *          height: {
   *            ratio: 0.5
   *          }
   *      }
   *  }
   */
  funnel_neck_width: 0,
  funnel_neck_height: 0
});

;// CONCATENATED MODULE: ./src/config/Options/shape/gauge.ts
/* harmony default export */ var shape_gauge = ({
  /**
   * Set gauge options
   * @name gauge
   * @memberof Options
   * @type {object}
   * @property {object} gauge Gauge object
   * @property {boolean} [gauge.background=""] Set background color. (The `.bb-chart-arcs-background` element)
   * @property {boolean} [gauge.fullCircle=false] Show full circle as donut. When set to 'true', the max label will not be showed due to start and end points are same location.
   * @property {boolean} [gauge.label.show=true] Show or hide label on gauge.
   * @property {Function} [gauge.label.extents] Set customized min/max label text.
   * @property {Function} [gauge.label.format] Set formatter for the label on gauge. Label text can be multilined with `\n` character.<br>
   * Will pass following arguments to the given function:
   * - value {number}: absolute value
   * - ratio {number}: value's ratio
   * - id {string}: data's id value
   * @property {number|Function} [gauge.label.ratio=undefined] Set ratio of labels position.
   * @property {number} [gauge.label.threshold=0] Set threshold ratio to show/hide labels.
   * @property {boolean} [gauge.expand=true] Enable or disable expanding gauge.
   * @property {number} [gauge.expand.rate=0.98] Set expand rate.
   * @property {number} [gauge.expand.duration=50] Set the expand transition time in milliseconds.
   * @property {boolean} [gauge.enforceMinMax=false] Enforce to given min/max value.
   * - When `gauge.min=50` and given value is `30`, gauge will render as empty value.
   * - When `gauge.max=100` and given value is `120`, gauge will render till 100, not surpassing max value.
   * @property {number} [gauge.min=0] Set min value of the gauge.
   * @property {number} [gauge.max=100] Set max value of the gauge.
   * @property {number} [gauge.startingAngle=-1 * Math.PI / 2] Set starting angle where data draws.
   *
   * **Limitations:**
   * - when `gauge.fullCircle=false`:
   *   - -1 * Math.PI / 2 <= startingAngle <= Math.PI / 2
   *   - `startingAngle <= -1 * Math.PI / 2` defaults to `-1 * Math.PI / 2`
   *   - `startingAngle >= Math.PI / 2` defaults to `Math.PI / 2`
   * - when `gauge.fullCircle=true`:
   *   - -1 * Math.PI < startingAngle < Math.PI
   *   - `startingAngle < -1 * Math.PI` defaults to `Math.PI`
   *   - `startingAngle >  Math.PI` defaults to `Math.PI`
   * @property {number} [gauge.arcLength=100] Set the length of the arc to be drawn in percent from -100 to 100.<br>
   * Negative value will draw the arc **counterclockwise**. Need to be used in conjunction with `gauge.fullCircle=true`.
   *
   * **Limitations:**
   * - -100 <= arcLength (in percent) <= 100
   * - 'arcLength < -100' defaults to -100
   * - 'arcLength > 100' defaults to 100
   * @property {string} [gauge.title=""] Set title of gauge chart. Use `\n` character for line break.
   *  - **NOTE:**
   *    - When `arc.needle.show=true` is set, special template `{=NEEDLE_VALUE}` can be used inside the title text to show current needle value.
   * @property {string} [gauge.units] Set units of the gauge.
   * @property {number} [gauge.width] Set width of gauge chart.
   * @property {string} [gauge.type="single"] Set type of gauge to be displayed.<br><br>
   * **Available Values:**
   * - single
   * - multi
   * @property {number} [gauge.arcs.minWidth=5] Set minimal width of gauge arcs until the innerRadius disappears.
   * @see [Demo: enforceMinMax, min/max](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeMinMax)
   * @see [Demo: archLength](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeArcLength)
   * @see [Demo: startingAngle](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeStartingAngle)
   * @see [Demo: labelRatio](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeLabelRatio)
   * @example
   *  gauge: {
   *      background: "#eee", // will set 'fill' css prop for '.bb-chart-arcs-background' classed element.
   *      fullCircle: false,
   *      label: {
   *          show: false,
   *          format: function(value, ratio, id) {
   *              return value;
   *
   *              // to multiline, return with '\n' character
   *              // return value +"%\nLine1\n2Line2";
   *          },
   *
   *           extents: function(value, isMax) {
   *              return (isMax ? "Max:" : "Min:") + value;
   *          },
   *
   *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
   *          // if data value is below than 0.1, text label will be hidden.
   *          threshold: 0.1,
   *
   *          // set ratio callback. Should return ratio value
   *          ratio: function(d, radius, h) {
   *              ...
   *              return ratio;
   *          },
   *          // or set ratio number
   *          ratio: 0.5
   *      },
   *
   *      // disable expand transition for interaction
   *      expand: false,
   *
   *      expand: {
   *      	// set duration of expand transition to 500ms.
   *          duration: 500,
   *
   *      	// set expand area rate
   *          rate: 1
   *      },
   *
   *      // enforce min/max value.
   * 		// when given value < min, will render as empty value.
   * 		// when value > max, will render to given max value not surpassing it.
   *      enforceMinMax: true,
   *
   *      min: -100,
   *      max: 200,
   *      type: "single"  // or 'multi'
   *      title: "Title Text",
   *
   *      // when 'arc.needle.show=true' is set, can show current needle value.
   *      title: "Needle value:\n{=NEEDLE_VALUE}",
   *
   *      units: "%",
   *      width: 10,
   *      startingAngle: -1 * Math.PI / 2,
   *      arcLength: 100,
   *      arcs: {
   *          minWidth: 5
   *      }
   *  }
   */
  gauge_background: "",
  gauge_fullCircle: false,
  gauge_label_show: true,
  gauge_label_extents: void 0,
  gauge_label_format: void 0,
  gauge_label_ratio: void 0,
  gauge_label_threshold: 0,
  gauge_enforceMinMax: false,
  gauge_min: 0,
  gauge_max: 100,
  gauge_type: "single",
  gauge_startingAngle: -1 * Math.PI / 2,
  gauge_arcLength: 100,
  gauge_title: "",
  gauge_units: void 0,
  gauge_width: void 0,
  gauge_arcs_minWidth: 5,
  gauge_expand: {},
  gauge_expand_rate: 0.98,
  gauge_expand_duration: 50
});

;// CONCATENATED MODULE: ./src/config/Options/shape/pie.ts
/* harmony default export */ var pie = ({
  /**
   * Set pie options
   * @name pie
   * @memberof Options
   * @type {object}
   * @property {object} pie Pie object
   * @property {boolean} [pie.label.show=true] Show or hide label on each pie piece.
   * @property {Function} [pie.label.format] Set formatter for the label on each pie piece.
   * @property {number|Function} [pie.label.ratio=undefined] Set ratio of labels position.
   * @property {number} [pie.label.threshold=0.05] Set threshold ratio to show/hide labels.
   * @property {boolean|object} [pie.expand=true] Enable or disable expanding pie pieces.
   * @property {number} [pie.expand.rate=0.98] Set expand rate.
   * @property {number} [pie.expand.duration=50] Set expand transition time in ms.
   * @property {number|object} [pie.innerRadius=0] Sets the inner radius of pie arc.
   * @property {number|object|undefined} [pie.outerRadius=undefined] Sets the outer radius of pie arc.
   * @property {number} [pie.padAngle=0] Set padding between data.
   * @property {number} [pie.padding=0] Sets the gap between pie arcs.
   * @property {number} [pie.startingAngle=0] Set starting angle where data draws.
   * @see [Demo: expand.rate](https://naver.github.io/billboard.js/demo/#PieChartOptions.ExpandRate)
   * @see [Demo: innerRadius](https://naver.github.io/billboard.js/demo/#PieChartOptions.InnerRadius)
   * @see [Demo: outerRadius](https://naver.github.io/billboard.js/demo/#PieChartOptions.OuterRadius)
   * @see [Demo: startingAngle](https://naver.github.io/billboard.js/demo/#PieChartOptions.StartingAngle)
   * @example
   *  pie: {
   *      label: {
   *          show: false,
   *          format: function(value, ratio, id) {
   *              return d3.format("$")(value);
   *
   *              // to multiline, return with '\n' character
   *              // return value +"%\nLine1\n2Line2";
   *          },
   *
   *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
   *          // if data value is below than 0.1, text label will be hidden.
   *          threshold: 0.1,
   *
   *          // set ratio callback. Should return ratio value
   *          ratio: function(d, radius, h) {
   *              ...
   *              return ratio;
   *          },
   *          // or set ratio number
   *          ratio: 0.5
   *      },
   *
   *      // disable expand transition for interaction
   *      expand: false,
   *
   *      expand: {
   *      	// set duration of expand transition to 500ms.
   *          duration: 500,
   *
   *      	// set expand area rate
   *          rate: 1
   *      },
   *
   *      innerRadius: 0,
   *
   *      // set different innerRadius for each data
   *      innerRadius: {
   *      	data1: 10,
   *      	data2: 0
   *      },
   *
   *      outerRadius: 100,
   *
   *      // set different outerRadius for each data
   *      outerRadius: {
   *      	data1: 50,
   *      	data2: 100
   *      }
   *
   *      padAngle: 0.1,
   *      padding: 0,
   *      startingAngle: 1
   *  }
   */
  pie_label_show: true,
  pie_label_format: void 0,
  pie_label_ratio: void 0,
  pie_label_threshold: 0.05,
  pie_expand: {},
  pie_expand_rate: 0.98,
  pie_expand_duration: 50,
  pie_innerRadius: 0,
  pie_outerRadius: void 0,
  pie_padAngle: 0,
  pie_padding: 0,
  pie_startingAngle: 0
});

;// CONCATENATED MODULE: ./src/config/Options/shape/polar.ts
/* harmony default export */ var shape_polar = ({
  /**
   * Set polar options
   * @name polar
   * @memberof Options
   * @type {object}
   * @property {object} polar Polar object
   * @property {boolean} [polar.label.show=true] Show or hide label on each polar piece.
   * @property {Function} [polar.label.format] Set formatter for the label on each polar piece.
   * @property {number} [polar.label.threshold=0.05] Set threshold ratio to show/hide labels.
   * @property {number|Function} [polar.label.ratio=undefined] Set ratio of labels position.
   * @property {number} [polar.level.depth=3] Set the level depth.
   * @property {boolean} [polar.level.show=true] Show or hide level.
   * @property {string} [polar.level.text.backgroundColor="#fff"] Set label text's background color.
   * @property {Function} [polar.level.text.format] Set format function for the level value.<br>- Default value: `(x) => x % 1 === 0 ? x : x.toFixed(2)`
   * @property {boolean} [polar.level.text.show=true] Show or hide level text.
   * @property {number} [polar.padAngle=0] Set padding between data.
   * @property {number} [polar.padding=0] Sets the gap between pie arcs.
   * @property {number} [polar.startingAngle=0] Set starting angle where data draws.
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.PolarChart)
   * @example
   *  polar: {
   *      label: {
   *          show: false,
   *          format: function(value, ratio, id) {
   *              return d3.format("$")(value);
   *
   *              // to multiline, return with '\n' character
   *              // return value +"%\nLine1\n2Line2";
   *          },
   *
   *          // 0.1(10%) ratio value means, the minimum ratio to show text label relative to the total value.
   *          // if data value is below than 0.1, text label will be hidden.
   *          threshold: 0.1,
   *
   *          // set ratio callback. Should return ratio value
   *          ratio: function(d, radius, h) {
   *              ...
   *              return ratio;
   *          },
   *          // or set ratio number
   *          ratio: 0.5
   *      },
   *      level: {
   *          depth: 3,
   *          max: 500,
   *          show: true,
   *          text: {
   *              format: function(x) {
   *                  return x + "%";
   *              },
   *              show: true,
   *              backgroundColor: "red"
   *          }
   *      },
   *      padAngle: 0.1,
   *      padding: 0,
   *      startingAngle: 1
   *  }
   */
  polar_label_show: true,
  polar_label_format: void 0,
  polar_label_threshold: 0.05,
  polar_label_ratio: void 0,
  polar_level_depth: 3,
  polar_level_max: void 0,
  polar_level_show: true,
  polar_level_text_backgroundColor: "#fff",
  polar_level_text_format: (x) => x % 1 === 0 ? x : x.toFixed(2),
  polar_level_text_show: true,
  polar_padAngle: 0,
  polar_padding: 0,
  polar_startingAngle: 0
});

;// CONCATENATED MODULE: ./src/config/Options/shape/radar.ts
/* harmony default export */ var shape_radar = ({
  /**
   * Set radar options
   * - **NOTE:**
   *  > When x tick text contains `\n`, it's used as line break.
   * @name radar
   * @memberof Options
   * @type {object}
   * @property {object} radar Radar object
   * @property {number} [radar.axis.max=undefined] The max value of axis. If not given, it'll take the max value from the given data.
   * @property {boolean} [radar.axis.line.show=true] Show or hide axis line.
   * @property {number} [radar.axis.text.position.x=0] x coordinate position, relative the original.
   * @property {number} [radar.axis.text.position.y=0] y coordinate position, relative the original.
   * @property {boolean} [radar.axis.text.show=true] Show or hide axis text.
   * @property {boolean} [radar.direction.clockwise=false] Set the direction to be drawn.
   * @property {number} [radar.level.depth=3] Set the level depth.
   * @property {boolean} [radar.level.show=true] Show or hide level.
   * @property {Function} [radar.level.text.format] Set format function for the level value.<br>- Default value: `(x) => x % 1 === 0 ? x : x.toFixed(2)`
   * @property {boolean} [radar.level.text.show=true] Show or hide level text.
   * @property {number} [radar.size.ratio=0.87] Set size ratio.
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.RadarChart)
   * @see [Demo: radar axis](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarAxis)
   * @see [Demo: radar level](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarLevel)
   * @see [Demo: radar size](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarSize)
   * @see [Demo: radar axis multiline](https://naver.github.io/billboard.js/demo/#RadarChartOptions.RadarAxisMultiline)
   * @example
   *  radar: {
   *      axis: {
   *          max: 50,
   *          line: {
   *              show: false
   *          },
   *          text: {
   *              position: {
   *              	x: 0,
   *              	y: 0
   *              },
   *              show: false
   *          }
   *      },
   *      direction: {
   *          clockwise: true
   *      },
   *      level: {
   *          show: false,
   *          text: {
   *              format: function(x) {
   *                  return x + "%";
   *              },
   *              show: true
   *          }
   *      },
   *      size: {
   *          ratio: 0.7
   *      }
   *  }
   */
  radar_axis_max: void 0,
  radar_axis_line_show: true,
  radar_axis_text_show: true,
  radar_axis_text_position: {},
  radar_level_depth: 3,
  radar_level_show: true,
  radar_level_text_format: (x) => x % 1 === 0 ? x : x.toFixed(2),
  radar_level_text_show: true,
  radar_size_ratio: 0.87,
  radar_direction_clockwise: false
});

;// CONCATENATED MODULE: ./src/config/Options/shape/treemap.ts
/* harmony default export */ var shape_treemap = ({
  /**
   * Set treemap options
   * @name treemap
   * @memberof Options
   * @type {object}
   * @property {object} treemap Treemap object
   * @property {string} [treemap.tile="binary"] Treemap tile type
   * - **Available tile type values:**
   * 	- binary ([d3.treemapBinary](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapBinary))
   * 	- dice ([d3.treemapDice](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapDice))
   * 	- slice ([d3.treemapSlice](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapSlice))
   * 	- sliceDice ([d3.treemapSliceDice](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapSliceDice))
   * 	- squrify ([d3.treemapSquarify](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapSquarify))
   * 	- resquarify ([d3.treemapResquarify](https://github.com/d3/d3-hierarchy/blob/main/README.md#treemapResquarify))
   * @property {Function} [treemap.label.format] Set formatter for the label text.
   * @property {number} [treemap.label.threshold=0.05] Set threshold ratio to show/hide labels text.
   * @property {number} [treemap.label.show=true] Show or hide label text.
   * @see [Demo: treemap](https://naver.github.io/billboard.js/demo/#Chart.TreemapChart)
   * @example
   *  treemap: {
   *      // "binary", "dice", "slice", "sliceDice", "squrify", "resquarify"
   *      tile: "dice",
   *
   *      label: {
   *          // show or hide label text
   *          show: false,
   *
   *          // set label text formatter
   *          format: function(value, ratio, id) {
   *              return d3.format("$")(value);
   *
   *              // to multiline, return with '\n' character
   *              // return value +"%\nLine1\n2Line2";
   *          },
   *
   *          // set ratio number
   *          ratio: 0.05
   *      }
   *  }
   */
  treemap_tile: "binary",
  treemap_label_format: void 0,
  treemap_label_threshold: 0.05,
  treemap_label_show: true
});

;// CONCATENATED MODULE: ./src/config/resolver/shape.ts




































function extendAxis(module, option) {
  extend(ChartInternal.prototype, Object.values(internal).concat(module));
  extend(Chart.prototype, api);
  Options.setOptions(Object.values(options).concat(option || []));
}
function extendLine(module, option) {
  extendAxis([point_common, point, line].concat(module || []));
  Options.setOptions([common_point, shape_line].concat(option || []));
}
function extendArc(module, option) {
  extend(ChartInternal.prototype, [arc, point_common].concat(module || []));
  Options.setOptions([common_point].concat(option || []));
}
let resolver_shape_area = () => (extendLine(shape_area, [Options_shape_area]), (resolver_shape_area = () => TYPE.AREA)());
let areaLineRange = () => (extendLine(shape_area, [Options_shape_area]), (areaLineRange = () => TYPE.AREA_LINE_RANGE)());
let areaStepRange = () => (extendLine(shape_area, [Options_shape_area]), (areaStepRange = () => TYPE.AREA_STEP_RANGE)());
let areaSpline = () => (extendLine(shape_area, [Options_shape_area, spline]), (areaSpline = () => TYPE.AREA_SPLINE)());
let areaSplineRange = () => (extendLine(shape_area, [Options_shape_area, spline]), (areaSplineRange = () => TYPE.AREA_SPLINE_RANGE)());
let areaStep = () => (extendLine(shape_area, [Options_shape_area]), (areaStep = () => TYPE.AREA_STEP)());
let resolver_shape_line = () => (extendLine(), (resolver_shape_line = () => TYPE.LINE)());
let shape_spline = () => (extendLine(void 0, [spline]), (shape_spline = () => TYPE.SPLINE)());
let step = () => (extendLine(), (step = () => TYPE.STEP)());
let shape_donut = () => (extendArc(void 0, [shape_arc, donut]), (shape_donut = () => TYPE.DONUT)());
let resolver_shape_gauge = () => (extendArc([gauge], [shape_arc, shape_gauge]), (resolver_shape_gauge = () => TYPE.GAUGE)());
let shape_pie = () => (extendArc(void 0, [shape_arc, pie]), (shape_pie = () => TYPE.PIE)());
let resolver_shape_polar = () => (extendArc([polar], [shape_arc, shape_polar]), (resolver_shape_polar = () => TYPE.POLAR)());
let resolver_shape_radar = () => (extendArc(
  [internal.eventrect, point, radar],
  [common_point, shape_radar, { axis_x_categories: options.optAxis.axis_x_categories }]
), (resolver_shape_radar = () => TYPE.RADAR)());
let resolver_shape_bar = () => (extendAxis([bar, point_common], [shape_bar, common_point]), (resolver_shape_bar = () => TYPE.BAR)());
let resolver_shape_bubble = () => (extendAxis(
  [point_common, point, bubble],
  [shape_bubble, common_point]
), (resolver_shape_bubble = () => TYPE.BUBBLE)());
let resolver_shape_candlestick = () => (extendAxis(
  [candlestick, point_common],
  [shape_candlestick, common_point]
), (resolver_shape_candlestick = () => TYPE.CANDLESTICK)());
let shape_scatter = () => (extendAxis(
  [point_common, point],
  [common_point, scatter]
), (shape_scatter = () => TYPE.SCATTER)());
let resolver_shape_funnel = () => (extendArc([funnel], [shape_funnel]), (resolver_shape_funnel = () => TYPE.FUNNEL)());
let resolver_shape_treemap = () => (extendAxis([treemap], [shape_treemap]), (resolver_shape_treemap = () => TYPE.TREEMAP)());

;// CONCATENATED MODULE: ./src/core.ts


let defaults = {};
const bb = {
  /**
   * Version information
   * @property {string} version version
   * @example
   *    bb.version;  // "1.0.0"
   * @memberof bb
   */
  version: "3.13.0",
  /**
   * Generate chart
   * - **NOTE:** Bear in mind for the possiblity of ***throwing an error***, during the generation when:
   *   - Unused option value is given.
   *     - ex) For `data.type="pie"` option, setting 'axis' option can cause unexpected generation error.
   *   - Insufficient value is given for certain option used.
   *     - ex) `data: { x: "x", columns: [["x"], ["data1", 30, 200, 100]] }`
   * @param {Options} config chart options
   * @memberof bb
   * @returns {Chart}
   * @see {@link Options} for different generation options
   * @see {@link Chart} for different methods API
   * @example
   *  <!-- chart holder -->
   * <div id="LineChart"></div>
   * @example
   *  // Generate chart with options
   *  var chart = bb.generate({
   *      "bindto": "#LineChart"
   *      "data": {
   *          "columns": [
   *              ["data1", 30, 200, 100, 400, 150, 250],
   *              ["data2", 50, 20, 10, 40, 15, 25]
   *           ],
   *          "type": "line"
   *      }
   *  });
   *
   *  // call some API
   *  // ex) get the data of 'data1'
   *  chart.data("data1");
   * @example
   * // Generate chart by importing ESM
   * // Import types to be used only, where this will make smaller bundle size.
   * import bb, {
   *   area,
   *   areaLineRange,
   *   areaSpline,
   *   areaSplineRange,
   *   areaStep,
   *   bar,
   *   bubble,
   *   donut,
   *   gauge,
   *   line,
   *   pie,
   *   polar,
   *   radar,
   *   scatter,
   *   spline,
   *   step
   * }
   *
   * bb.generate({
   *      "bindto": "#LineChart"
   *      "data": {
   *          "columns": [
   *              ["data1", 30, 200, 100, 400, 150, 250],
   *              ["data2", 50, 20, 10, 40, 15, 25]
   *           ]
   *      },
   *      type: line(),
   *
   *      // or
   *      types: {
   *        data1: bar(),
   *        data2: step()
   *      }
   * });
   */
  generate(config) {
    const options = mergeObj({}, defaults, config);
    const inst = new Chart(options);
    inst.internal.charts = this.instance;
    this.instance.push(inst);
    return inst;
  },
  /**
   * Set or get global default options.
   * - **NOTE:**
   *   - The options values settings are valid within page context only.
   *   - If is called multiple times, will override the last value.
   * @param {Options} options chart options
   * @memberof bb
   * @returns {Options}
   * @see {@link Options}
   * @example
   * // Set same option value as for `.generate()`
   * bb.defaults({
   *   data: {
   *     type: "bar"
   *   }
   * });
   *
   * bb.defaults();  // {data:{type: "bar"}}
   *
   * // data.type defaults to 'bar'
   * var chart = bb.generate({ ... });
   */
  defaults(options) {
    if (isObject(options)) {
      defaults = options;
    }
    return defaults;
  },
  /**
   * An array containing instance created
   * @property {Array} instance instance array
   * @example
   *  // generate charts
   *  var chart1 = bb.generate(...);
   *  var chart2 = bb.generate(...);
   *
   *  bb.instance;  // [ chart1, chart2, ... ]
   * @memberof bb
   */
  instance: [],
  /**
   * Namespace for plugins
   * @property {object} plugin plugin namespace
   * @example
   *  // Stanford diagram plugin
   *  bb.plugin.stanford;
   * @memberof bb
   */
  plugin: {}
};


;// CONCATENATED MODULE: ./src/index.ts


Object.keys(resolver_shape_namespaceObject).forEach((v) => resolver_shape_namespaceObject[v]());
Object.keys(resolver_interaction_namespaceObject).forEach((v) => resolver_interaction_namespaceObject[v]());


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});