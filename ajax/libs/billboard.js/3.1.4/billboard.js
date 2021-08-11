/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 3.1.4
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-axis"), require("d3-brush"), require("d3-color"), require("d3-drag"), require("d3-dsv"), require("d3-ease"), require("d3-interpolate"), require("d3-scale"), require("d3-selection"), require("d3-shape"), require("d3-time-format"), require("d3-transition"), require("d3-zoom"));
	else if(typeof define === 'function' && define.amd)
		define(["d3-axis", "d3-brush", "d3-color", "d3-drag", "d3-dsv", "d3-ease", "d3-interpolate", "d3-scale", "d3-selection", "d3-shape", "d3-time-format", "d3-transition", "d3-zoom"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("d3-axis"), require("d3-brush"), require("d3-color"), require("d3-drag"), require("d3-dsv"), require("d3-ease"), require("d3-interpolate"), require("d3-scale"), require("d3-selection"), require("d3-shape"), require("d3-time-format"), require("d3-transition"), require("d3-zoom")) : factory(root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__13__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__14__) {
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
  "bb": function() { return /* reexport */ bb; },
  "default": function() { return /* reexport */ bb; }
});

// NAMESPACE OBJECT: ./src/config/resolver/shape.ts
var resolver_shape_namespaceObject = {};
__webpack_require__.r(resolver_shape_namespaceObject);
__webpack_require__.d(resolver_shape_namespaceObject, {
  "area": function() { return _area; },
  "areaLineRange": function() { return areaLineRange; },
  "areaSpline": function() { return areaSpline; },
  "areaSplineRange": function() { return areaSplineRange; },
  "areaStep": function() { return areaStep; },
  "bar": function() { return resolver_shape_bar; },
  "bubble": function() { return resolver_shape_bubble; },
  "candlestick": function() { return resolver_shape_candlestick; },
  "donut": function() { return shape_donut; },
  "gauge": function() { return resolver_shape_gauge; },
  "line": function() { return resolver_shape_line; },
  "pie": function() { return shape_pie; },
  "radar": function() { return resolver_shape_radar; },
  "scatter": function() { return shape_scatter; },
  "spline": function() { return shape_spline; },
  "step": function() { return step; }
});

// NAMESPACE OBJECT: ./src/config/resolver/interaction.ts
var resolver_interaction_namespaceObject = {};
__webpack_require__.r(resolver_interaction_namespaceObject);
__webpack_require__.d(resolver_interaction_namespaceObject, {
  "selection": function() { return _selectionModule; },
  "subchart": function() { return subchartModule; },
  "zoom": function() { return zoomModule; }
});

// EXTERNAL MODULE: external {"commonjs":"d3-time-format","commonjs2":"d3-time-format","amd":"d3-time-format","root":"d3"}
var external_commonjs_d3_time_format_commonjs2_d3_time_format_amd_d3_time_format_root_d3_ = __webpack_require__(4);
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(2);
;// CONCATENATED MODULE: ./src/config/classes.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ var config_classes = ({
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
  candlestick: "bb-candlestick",
  candlesticks: "bb-candlesticks",
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
  chartCandlestick: "bb-chart-candlestick",
  chartCandlesticks: "bb-chart-candlesticks",
  chartCircles: "bb-chart-circles",
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
  legend: "bb-legend",
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
  main: "bb-main",
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
  subchart: "bb-subchart",
  target: "bb-target",
  text: "bb-text",
  texts: "bb-texts",
  title: "bb-title",
  tooltip: "bb-tooltip",
  tooltipContainer: "bb-tooltip-container",
  tooltipName: "bb-tooltip-name",
  valueDown: "bb-value-down",
  valueUp: "bb-value-up",
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
  EXPANDED: "_expanded_",
  SELECTED: "_selected_",
  INCLUDED: "_included_",
  TextOverlapping: "text-overlapping"
});
;// CONCATENATED MODULE: ./src/config/Store/Element.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Elements class.
 * @class Elements
 * @ignore
 * @private
 */
var Element = function () {
  return {
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
      area: null // $$.contextArea

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
      y: null // ygrid,

    },
    gridLines: {
      main: null,
      // gridLines
      x: null,
      // xgridLines,
      y: null // ygridLines

    },
    region: {
      main: null,
      // region
      list: null // mainRegion

    },
    eventRect: null,
    zoomResetBtn: null // drag zoom reset button

  };
};


;// CONCATENATED MODULE: ./src/config/Store/State.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * State class.
 * @class State
 * @ignore
 * @private
 */
var State = function () {
  return {
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
    hasAxis: !1,
    hasRadar: !1,
    current: {
      width: 0,
      height: 0,
      dataMax: 0,
      maxTickWidths: {
        x: {
          size: 0,
          ticks: [],
          clipPath: 0,
          domain: ""
        },
        y: {
          size: 0,
          domain: ""
        },
        y2: {
          size: 0,
          domain: ""
        }
      },
      // current used chart type list
      types: []
    },
    // legend
    isLegendRight: !1,
    isLegendInset: !1,
    isLegendTop: !1,
    isLegendLeft: !1,
    legendStep: 0,
    legendItemWidth: 0,
    legendItemHeight: 0,
    legendHasRendered: !1,
    eventReceiver: {
      currentIdx: -1,
      // current event interaction index
      rect: {},
      // event rect's clientBoundingRect
      data: [],
      // event data bound of previoous eventRect
      coords: [] // coordination value of previous eventRect

    },
    axis: {
      x: {
        padding: {
          left: 0,
          right: 0
        },
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
    // status
    event: null,
    // event object
    dragStart: null,
    dragging: !1,
    flowing: !1,
    cancelClick: !1,
    mouseover: !1,
    rendered: !1,
    transiting: !1,
    redrawing: !1,
    // if redraw() is on process
    resizing: !1,
    // resize event called
    toggling: !1,
    // legend toggle
    zooming: !1,
    hasNegativeValue: !1,
    hasPositiveValue: !0,
    orgAreaOpacity: "0.2",
    // ID strings
    hiddenTargetIds: [],
    hiddenLegendIds: [],
    focusedTargetIds: [],
    defocusedTargetIds: [],
    // value for Arc
    radius: 0,
    innerRadius: 0,
    outerRadius: undefined,
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
};


;// CONCATENATED MODULE: ./src/config/Store/Store.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

 // mapping

var classes = {
  element: Element,
  state: State
};
/**
 * Internal store class.
 * @class Store
 * @ignore
 * @private
 */

var Store = /*#__PURE__*/function () {
  function Store() {
    var _this = this;

    Object.keys(classes).forEach(function (v) {
      _this[v] = new classes[v]();
    });
  }

  var _proto = Store.prototype;
  return _proto.getStore = function getStore(name) {
    return this[name];
  }, Store;
}();


;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
;// CONCATENATED MODULE: ./src/config/Options/common/main.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * main config options
 */
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
  clipPath: !0,

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
  svg_classname: undefined,

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
  size_width: undefined,
  size_height: undefined,

  /**
   * The padding of the chart element.
   * @name padding
   * @memberof Options
   * @type {object}
   * @property {object} [padding] padding object
   * @property {number} [padding.top] padding on the top of chart
   * @property {number} [padding.right] padding on the right of chart
   * @property {number} [padding.bottom] padding on the bottom of chart
   * @property {number} [padding.left] padding on the left of chart
   * @example
   * padding: {
   *   top: 20,
   *   right: 20,
   *   bottom: 20,
   *   left: 20
   * }
   */
  padding_left: undefined,
  padding_right: undefined,
  padding_top: undefined,
  padding_bottom: undefined,

  /**
   * Set chart resize options
   * @name resize
   * @memberof Options
   * @type {object}
   * @property {object} [resize] resize object
   * @property {boolean} [resize.auto=true] Set chart resize automatically on viewport changes.
   * @example
   *  resize: {
   *      auto: false
   *  }
   */
  resize_auto: !0,

  /**
   * Set a callback to execute when mouse/touch enters the chart.
   * @name onover
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * onover: function() {
   *   this; // chart instance itself
   *   ...
   * }
   */
  onover: undefined,

  /**
   * Set a callback to execute when mouse/touch leaves the chart.
   * @name onout
   * @memberof Options
   * @type {Function}
   * @default undefined
   * @example
   * onout: function() {
   *   this; // chart instance itself
   *   ...
   * }
   */
  onout: undefined,

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
  onresize: undefined,

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
  onresized: undefined,

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
  onbeforeinit: undefined,

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
  oninit: undefined,

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
  onafterinit: undefined,

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
  onrendered: undefined,

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
  transition_duration: 350,

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
   *	// <!-- render.lazy will detect visibility defined -->
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
   *	// chart won't be rendered and not observing bind element's visiblity changes
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
   * @example
   *  regions: [
   *    {
   *      axis: "x",
   *      start: 1,
   *      end: 4,
   *      class: "region-1-4"
   *    }
   *  ]
   */
  regions: []
});
;// CONCATENATED MODULE: ./src/config/Options/data/data.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * data config options
 */
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
  data_x: undefined,

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
  data_idConverter: function data_idConverter(id) {
    return id;
  },

  /**
   * Set custom data name.
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
   * - bar
   * - bubble
   * - candlestick
   * - donut
   * - gauge
   * - line
   * - pie
   * - radar
   * - scatter
   * - spline
   * - step
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
   *   bar,
   *   bubble,
   *   candlestick,
   *   donut,
   *   gauge,
   *   line,
   *   pie,
   *   radar,
   *   scatter,
   *   spline,
   *   step
   * }
   *
   * bb.generate({
   *   ...,
   *   data: {
   *     type: bar()
   *   }
   * });
   */
  data_type: undefined,

  /**
   * Set chart type for each data.<br>
   * This setting overwrites data.type setting.
   * - **NOTE:** `radar` type can't be combined with other types.
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
   *   bar,
   *   bubble,
   *   candlestick,
   *   donut,
   *   gauge,
   *   line,
   *   pie,
   *   radar,
   *   scatter,
   *   spline,
   *   step
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
  data_color: undefined,

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
   * The formatter function receives 4 arguments such as v, id, i, j and it **must return a string**(`\n` character will be used as line break) that will be shown as the label.<br><br>
   * The arguments are:<br>
   *  - `v` is the value of the data point where the label is shown.
   *  - `id` is the id of the data where the label is shown.
   *  - `i` is the index of the data point where the label is shown.
   *  - `j` is the sub index of the data point where the label is shown.<br><br>
   * Formatter function can be defined for each data by specifying as an object and D3 formatter function can be set (ex. d3.format('$'))
   * @property {string|object} [data.labels.backgroundColors] Set label text background colors.
   * @property {string|object|Function} [data.labels.colors] Set label text colors.
   * @property {object} [data.labels.position] Set each dataset position, relative the original.
   * @property {number} [data.labels.position.x=0] x coordinate position, relative the original.
   * @property {number} [data.labels.position.y=0] y coordinate position, relative the original.
   * @memberof Options
   * @type {object}
   * @default {}
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Data.DataLabel)
   * @see [Demo: label colors](https://naver.github.io/billboard.js/demo/#Data.DataLabelColors)
   * @see [Demo: label format](https://naver.github.io/billboard.js/demo/#Data.DataLabelFormat)
   * @see [Demo: label multiline](https://naver.github.io/billboard.js/demo/#Data.DataLabelMultiline)
   * @see [Demo: label overlap](https://naver.github.io/billboard.js/demo/#Data.DataLabelOverlap)
   * @see [Demo: label position](https://naver.github.io/billboard.js/demo/#Data.DataLabelPosition)
   * @example
   * data: {
   *   labels: true,
   *
   *   // or set specific options
   *   labels: {
   *     format: function(v, id, i, j) {
   *         ...
   *         // to multiline, return with '\n' character
   *         return "Line1\nLine2";
   *     },
   *
   *     // it's possible to set for each data
   *     format: {
   *         data1: function(v, id, i, j) { ... },
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
   *     }
   *   }
   * }
   */
  data_labels: {},
  data_labels_backgroundColors: undefined,
  data_labels_colors: undefined,
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
  data_hide: !1,

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
  data_filter: undefined,

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
  data_onclick: function data_onclick() {},

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
  data_onover: function data_onover() {},

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
  data_onout: function data_onout() {},

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
  data_onshown: undefined,

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
  data_onhidden: undefined,

  /**
   * Set a callback for minimum data
   * - **NOTE:** For 'area-line-range' and 'area-spline-range', `mid` data will be taken for the comparison
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
  data_onmin: undefined,

  /**
   * Set a callback for maximum data
   * - **NOTE:** For 'area-line-range' and 'area-spline-range', `mid` data will be taken for the comparison
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
  data_onmax: undefined,

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
  data_url: undefined,

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
  data_headers: undefined,

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
   *       // x: "name", // it's possible to specify 'x' when category axis
   *       value: ["upload", "download"]
   *     }
   * }
   */
  data_json: undefined,

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
   * // for 'range' types('area-line-range' or 'area-spline-range'), data should contain:
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
   *		[
   *			// open, high, low, close, volume (optional)
   *			{open: 1300, high: 1369, low: 1200, close: 1339, volume: 100},
   *			[1000, 1100, 850, 870]
   *		],
   *		[
   *			{open: 1348, high: 1371, low: 1271, close: 1320},
   *			[870, 1250, 830, 1200, 50]
   *		]
   *   ],
   *   type: "candlestick"
   * }
   */
  data_rows: undefined,

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
   * // for 'range' types('area-line-range' or 'area-spline-range'), data should contain:
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
  data_columns: undefined,

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
   *       // x: "name", // it's possible to specify 'x' when category axis
   *       value: ["upload", "download"]
   *     }
   * }
   */
  data_keys: undefined,

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
;// CONCATENATED MODULE: ./src/config/Options/common/color.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * color config options
 */
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
  color_tiles: undefined,
  color_threshold: {},
  color_onover: undefined
});
;// CONCATENATED MODULE: ./src/config/Options/interaction/interaction.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * interaction config options
 */
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
  interaction_enabled: !0,
  interaction_brighten: !0,
  interaction_inputType_mouse: !0,
  interaction_inputType_touch: {}
});
;// CONCATENATED MODULE: ./src/config/Options/common/legend.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * legend config options
 */
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
   * @property {string|Function} [legend.contents.template=undefined] Set item's template.<br>
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
   * @property {boolean} [legend.padding=0] Set padding value
   * @property {Function} [legend.item.onclick=undefined] Set click event handler to the legend item.
   * @property {Function} [legend.item.onover=undefined] Set mouse/touch over event handler to the legend item.
   * @property {Function} [legend.item.onout=undefined] Set mouse/touch out event handler to the legend item.
   * @property {number} [legend.item.tile.width=10] Set width of item tile element
   * @property {number} [legend.item.tile.height=10] Set height of item tile element
   * @property {boolean} [legend.usePoint=false] Whether to use custom points in legend.
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
   *          onclick: function(id) { ... },
   *          onover: function(id) { ... },
   *          onout: function(id) { ... },
   *
   *          // set tile's size
   *          tile: {
   *              width: 20,
   *              height: 15
   *          }
   *      },
   *      usePoint: true
   *  }
   */
  legend_show: !0,
  legend_hide: !1,
  legend_contents_bindto: undefined,
  legend_contents_template: undefined,
  legend_position: "bottom",
  legend_inset_anchor: "top-left",
  legend_inset_x: 10,
  legend_inset_y: 0,
  legend_inset_step: undefined,
  legend_item_onclick: undefined,
  legend_item_onover: undefined,
  legend_item_onout: undefined,
  legend_equally: !1,
  legend_padding: 0,
  legend_item_tile_width: 10,
  legend_item_tile_height: 10,
  legend_usePoint: !1
});
;// CONCATENATED MODULE: ./src/config/Options/common/title.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * title config options
 */
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
  title_text: undefined,
  title_padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  title_position: "center"
});
;// CONCATENATED MODULE: ./src/config/Options/common/tooltip.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * tooltip config options
 */
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
   * @property {Function} [tooltip.format.value] Set format for the value of each data in tooltip.<br>
   *  Specified function receives name, ratio, id and index of the data point to show. ratio will be undefined if the chart is not donut/pie/gauge.
   *  If undefined returned, the row of that value will be skipped.
   * @property {Function} [tooltip.position] Set custom position function for the tooltip.<br>
   *  This option can be used to modify the tooltip position by returning object that has top and left.
   * @property {Function|object} [tooltip.contents] Set custom HTML for the tooltip.<br>
   *  Specified function receives data, defaultTitleFormat, defaultValueFormat and color of the data point to show. If tooltip.grouped is true, data includes multiple data points.
   * @property {string|HTMLElement} [tooltip.contents.bindto=undefined] Set CSS selector or element reference to bind tooltip.
   *  - **NOTE:** When is specified, will not be updating tooltip's position.
   * @property {string} [tooltip.contents.template=undefined] Set tooltip's template.<br><br>
   *  Within template, below syntax will be replaced using template-like syntax string:
   *    - **{{ ... }}**: the doubly curly brackets indicate loop block for data rows.
   *    - **{=CLASS_TOOLTIP}**: default tooltip class name `bb-tooltip`.
   *    - **{=CLASS_TOOLTIP_NAME}**: default tooltip data class name (ex. `bb-tooltip-name-data1`)
   *    - **{=TITLE}**: title value.
   *    - **{=COLOR}**: data color.
   *    - **{=VALUE}**: data value.
   * @property {object} [tooltip.contents.text=undefined] Set additional text content within data loop, using template syntax.
   *  - **NOTE:** It should contain `{ key: Array, ... }` value
   *    - 'key' name is used as substitution within template as '{=KEY}'
   *    - The value array length should match with the data length
   * @property {boolean} [tooltip.init.show=false] Show tooltip at the initialization.
   * @property {number} [tooltip.init.x=0] Set x Axis index(or index for Arc(donut, gauge, pie) types) to be shown at the initialization.
   * @property {object} [tooltip.init.position={top: "0px",left: "50px"}] Set the position of tooltip at the initialization.
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
   * @see [Demo: Tooltip Template](https://naver.github.io/billboard.js/demo/#Tooltip.TooltipTemplate)
   * @example
   *  tooltip: {
   *      show: true,
   *      doNotHide: true,
   *      grouped: false,
   *      format: {
   *          title: function(x) { return "Data " + x; },
   *          name: function(name, ratio, id, index) { return name; },
   *          value: function(value, ratio, id, index) { return ratio; }
   *      },
   *      position: function(data, width, height, element) {
   *          return {top: 0, left: 0}
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
   *          x: 2, // x Axis index(or index for Arc(donut, gauge, pie) types)
   *          position: {
   *              top: "150px",
   *              left: "250px"
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
  tooltip_show: !0,
  tooltip_doNotHide: !1,
  tooltip_grouped: !0,
  tooltip_format_title: undefined,
  tooltip_format_name: undefined,
  tooltip_format_value: undefined,
  tooltip_position: undefined,
  tooltip_contents: {},
  tooltip_init_show: !1,
  tooltip_init_x: 0,
  tooltip_init_position: {
    top: "0px",
    left: "50px"
  },
  tooltip_linked: !1,
  tooltip_linked_name: "",
  tooltip_onshow: function tooltip_onshow() {},
  tooltip_onhide: function tooltip_onhide() {},
  tooltip_onshown: function tooltip_onshown() {},
  tooltip_onhidden: function tooltip_onhidden() {},
  tooltip_order: null
});
// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(3);
;// CONCATENATED MODULE: ./src/module/browser.ts
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
  var root = typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object && globalThis || typeof global === "object" && global !== null && global.Object === Object && global || typeof self === "object" && self !== null && self.Object === Object && self;
  return root || Function("return this")();
}();
/* eslint-enable no-new-func, no-undef */
// fallback for non-supported environments


win.requestIdleCallback = win.requestIdleCallback || function (cb) {
  return setTimeout(cb, 1);
}, win.cancelIdleCallback = win.cancelIdleCallback || function (id) {
  return clearTimeout(id);
};
var browser_doc = win && win.document;
;// CONCATENATED MODULE: ./src/module/util.ts


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

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
    isboolean = function (v) {
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
  return typeof v === "object";
},
    isEmpty = function (o) {
  return isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
},
    notEmpty = function (o) {
  return !isEmpty(o);
},
    isArray = function (arr) {
  return Array.isArray(arr);
},
    isObject = function (obj) {
  return obj && !obj.nodeType && isObjectType(obj) && !isArray(obj);
};

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
  var found = !1;
  return Object.keys(dict).forEach(function (key) {
    return dict[key] === value && (found = !0);
  }), found;
}
/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} args Arguments
 * @returns {boolean} true: fn is function, false: fn is not function
 * @private
 */


function callFn(fn) {
  for (var isFn = isFunction(fn), _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];

  return isFn && fn.call.apply(fn, args), isFn;
}
/**
 * Call function after all transitions ends
 * @param {d3.transition} transition Transition
 * @param {Fucntion} cb Callback function
 * @private
 */


function endall(transition, cb) {
  var n = 0,
      end = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];

    --n || cb.apply.apply(cb, [this].concat(args));
  };

  "duration" in transition ? transition.each(function () {
    return ++n;
  }).on("end", end) : (++n, transition.call(end));
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
  if (dy === void 0 && (dy = [-1, 1]), toMiddle === void 0 && (toMiddle = !1), node && isString(text)) if (text.indexOf("\n") === -1) node.text(text);else {
    var diff = [node.text(), text].map(function (v) {
      return v.replace(/[\s\n]/g, "");
    });

    if (diff[0] !== diff[1]) {
      var multiline = text.split("\n"),
          len = toMiddle ? multiline.length - 1 : 1;
      node.html(""), multiline.forEach(function (v, i) {
        node.append("tspan").attr("x", 0).attr("dy", (i === 0 ? dy[0] * len : dy[1]) + "em").text(v);
      });
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
  var touches = event && (event.touches || event.sourceEvent && event.sourceEvent.touches),
      pointer = event ? (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.pointer)(touches ? touches[0] : event, element) : [0, 0];
  return pointer;
}
/**
 * Return brush selection array
 * @param {object} ctx Current instance
 * @returns {d3.brushSelection}
 * @private
 */


function getBrushSelection(ctx) {
  var selection,
      event = ctx.event,
      $el = ctx.$el,
      main = $el.subchart.main || $el.main;
  return event && event.type === "brush" ? selection = event.selection : main && (selection = main.select("." + config_classes.brush).node()) && (selection = (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushSelection)(selection)), selection;
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
 * @returns {number|string}
 * @private
 */


function getRandom(asStr) {
  asStr === void 0 && (asStr = !0);
  var rand = Math.random();
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
  if (start > end) return -1;
  var mid = Math.floor((start + end) / 2),
      _arr$mid = arr[mid],
      x = _arr$mid.x,
      _arr$mid$w = _arr$mid.w,
      w = _arr$mid$w === void 0 ? 0 : _arr$mid$w;
  return isRotated && (x = arr[mid].y, w = arr[mid].h), v >= x && v <= x + w ? mid : v < x ? findIndex(arr, v, start, mid - 1, isRotated) : findIndex(arr, v, mid + 1, end, isRotated);
}
/**
 * Check if brush is empty
 * @param {object} ctx Bursh context
 * @returns {boolean}
 * @private
 */


function brushEmpty(ctx) {
  var selection = getBrushSelection(ctx);
  return !selection || selection[0] === selection[1];
}
/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */


function deepClone() {
  for (var clone = function (_clone) {
    function clone() {
      return _clone.apply(this, arguments);
    }

    return clone.toString = function () {
      return _clone.toString();
    }, clone;
  }(function (v) {
    if (isObject(v) && v.constructor) {
      var r = new v.constructor();

      for (var k in v) r[k] = clone(v[k]);

      return r;
    }

    return v;
  }), _len3 = arguments.length, objectN = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) objectN[_key3] = arguments[_key3];

  return objectN.map(function (v) {
    return clone(v);
  }).reduce(function (a, c) {
    return _objectSpread(_objectSpread({}, a), c);
  });
}
/**
 * Extend target from source object
 * @param {object} target Target object
 * @param {object|Array} source Source object
 * @returns {object}
 * @private
 */


function extend(target, source) {
  // exclude name with only numbers
  for (var p in target === void 0 && (target = {}), isArray(source) && source.forEach(function (v) {
    return extend(target, v);
  }), source) /^\d+$/.test(p) || p in target || (target[p] = source[p]);

  return target;
}
/**
 * Return first letter capitalized
 * @param {string} str Target string
 * @returns {string} capitalized string
 * @private
 */


var capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
},
    toArray = function (v) {
  return [].slice.call(v);
};
/**
 * Convert to array
 * @param {object} v Target to be converted
 * @returns {Array}
 * @private
 */


/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
function getCssRules(styleSheets) {
  var rules = [];
  return styleSheets.forEach(function (sheet) {
    try {
      sheet.cssRules && sheet.cssRules.length && (rules = rules.concat(toArray(sheet.cssRules)));
    } catch (e) {
      console.error("Error while reading rules from " + sheet.href + ": " + e.toString());
    }
  }), rules;
}
/**
 * Gets the SVGMatrix of an SVGGElement
 * @param {SVGElement} node Node element
 * @returns {SVGMatrix} matrix
 * @private
 */


var getTranslation = function (node) {
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
};
/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */


function getUnique(data) {
  var isDate = data[0] instanceof Date,
      d = (isDate ? data.map(Number) : data).filter(function (v, i, self) {
    return self.indexOf(v) === i;
  });
  return isDate ? d.map(function (v) {
    return new Date(v);
  }) : d;
}
/**
 * Merge array
 * @param {Array} arr Source array
 * @returns {Array}
 * @private
 */


function mergeArray(arr) {
  return arr && arr.length ? arr.reduce(function (p, c) {
    return p.concat(c);
  }) : [];
}
/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */


function mergeObj(target) {
  for (var _len4 = arguments.length, objectN = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) objectN[_key4 - 1] = arguments[_key4];

  if (!objectN.length || objectN.length === 1 && !objectN[0]) return target;
  var source = objectN.shift();
  return isObject(target) && isObject(source) && Object.keys(source).forEach(function (key) {
    var value = source[key];
    isObject(value) ? (!target[key] && (target[key] = {}), target[key] = mergeObj(target[key], value)) : target[key] = isArray(value) ? value.concat() : value;
  }), mergeObj.apply(void 0, [target].concat(objectN));
}
/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {boolean} isAsc true: asc, false: desc
 * @returns {number|string|Date} sorted date
 * @private
 */


function sortValue(data, isAsc) {
  isAsc === void 0 && (isAsc = !0);
  var fn;
  return data[0] instanceof Date ? fn = isAsc ? function (a, b) {
    return a - b;
  } : function (a, b) {
    return b - a;
  } : isAsc && !data.every(isNaN) ? fn = function (a, b) {
    return a - b;
  } : !isAsc && (fn = function (a, b) {
    return a > b && -1 || a < b && 1 || a === b && 0;
  }), data.concat().sort(fn);
}
/**
 * Get min/max value
 * @param {string} type 'min' or 'max'
 * @param {Array} data Array data value
 * @returns {number|Date|undefined}
 * @private
 */


function getMinMax(type, data) {
  var res = data.filter(function (v) {
    return notEmpty(v);
  });
  return res.length ? isNumber(res[0]) ? res = Math[type].apply(Math, res) : res[0] instanceof Date && (res = sortValue(res, type === "min")[0]) : res = undefined, res;
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
  step === void 0 && (step = 1);
  var res = [],
      n = Math.max(0, Math.ceil((end - start) / step)) | 0;

  for (var i = start; i < n; i++) res.push(start + i * step);

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
      return new MouseEvent("t"), function (el, eventType, params) {
        params === void 0 && (params = getParams()), el.dispatchEvent(new MouseEvent(eventType, params));
      };
    } catch (e) {
      // Polyfills DOM4 MouseEvent
      return function (el, eventType, params) {
        params === void 0 && (params = getParams());
        var mouseEvent = browser_doc.createEvent("MouseEvent"); // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent

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

  for (var x in data) res = res.replace(new RegExp("{=" + x + "}", "g"), data[x]);

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
  if (date instanceof Date) parsedDate = date;else if (isString(date)) {
    var config = this.config,
        format = this.format;
    parsedDate = format.dataTime(config.data_xFormat)(date);
  } else isNumber(date) && !isNaN(date) && (parsedDate = new Date(+date));
  return (!parsedDate || isNaN(+parsedDate)) && console && console.error && console.error("Failed to parse x '" + date + "' to Date object"), parsedDate;
}
/**
 * Return if the current doc is visible or not
 * @returns {boolean}
 * @private
 */


function isTabVisible() {
  return !browser_doc.hidden;
}
/**
 * Get the current input type
 * @param {boolean} mouse Config value: interaction.inputType.mouse
 * @param {boolean} touch Config value: interaction.inputType.touch
 * @returns {string} "mouse" | "touch" | null
 * @private
 */


function convertInputType(mouse, touch) {
  var isMobile = !1; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop

  if (/Mobi/.test(win.navigator.userAgent) && touch) {
    // Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
    var hasTouchPoints = win.navigator && "maxTouchPoints" in win.navigator && win.navigator.maxTouchPoints > 0,
        hasTouch = "ontouchmove" in win || win.DocumentTouch && browser_doc instanceof win.DocumentTouch; // Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
    // On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true

    isMobile = hasTouchPoints || hasTouch;
  }

  var hasMouse = !(!mouse || isMobile) && "onmouseover" in win;
  return hasMouse && "mouse" || isMobile && "touch" || null;
}
;// CONCATENATED MODULE: ./src/config/Options/Options.ts


function Options_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function Options_objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? Options_ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : Options_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// common








/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bb.generate} to use these options on generating the chart
 */

var Options = /*#__PURE__*/function () {
  function Options() {
    return deepClone(main, data, color, interaction, legend, title, tooltip, Options.data);
  }

  return Options.setOptions = function setOptions(options) {
    this.data = options.reduce(function (a, c) {
      return Options_objectSpread(Options_objectSpread({}, a), c);
    }, this.data);
  }, Options;
}();

Options.data = {};

;// CONCATENATED MODULE: ./src/module/Cache.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Constant for cache key
 * - NOTE: Prefixed with '$', will be resetted when .load() is called
 * @private
 */
var KEY = {
  bubbleBaseLength: "$baseLength",
  colorPattern: "__colorPattern__",
  dataMinMax: "$dataMinMax",
  dataTotalSum: "$dataTotalSum",
  dataTotalPerIndex: "$totalPerIndex",
  legendItemTextBox: "legendItemTextBox",
  radarPoints: "$radarPoints",
  setOverOut: "setOverOut",
  callOverOutForTouch: "callOverOutForTouch",
  textRect: "textRect"
};

var Cache = /*#__PURE__*/function () {
  function Cache() {
    this.cache = {};
  }

  var _proto = Cache.prototype;
  return _proto.add =
  /**
   * Add cache
   * @param {string} key Cache key
   * @param {*} value Value to be stored
   * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
   * @returns {*} Added data value
   * @private
   */
  function add(key, value, isDataType) {
    return isDataType === void 0 && (isDataType = !1), this.cache[key] = isDataType ? this.cloneTarget(value) : value, this.cache[key];
  }
  /**
   * Remove cache
   * @param {string|Array} key Cache key
   * @private
   */
  , _proto.remove = function remove(key) {
    var _this = this;

    toArray(key).forEach(function (v) {
      return delete _this.cache[v];
    });
  }
  /**
   * Get cahce
   * @param {string|Array} key Cache key
   * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
   * @returns {*}
   * @private
   */
  , _proto.get = function get(key, isDataType) {
    if (isDataType === void 0 && (isDataType = !1), isDataType) {
      for (var id, targets = [], i = 0; id = key[i]; i++) id in this.cache && targets.push(this.cloneTarget(this.cache[id]));

      return targets;
    }

    var value = this.cache[key];
    return isValue(value) ? value : null;
  }
  /**
   * Reset cached data
   * @param {boolean} all true: reset all data, false: reset only '$' prefixed key data
   * @private
   */
  , _proto.reset = function reset(all) {
    var $$ = this;

    for (var x in $$.cache) (all || /^\$/.test(x)) && ($$.cache[x] = null);
  }
  /**
   * Clone data target object
   * @param {object} target Data object
   * @returns {object}
   * @private
   */
  // eslint-disable-next-line camelcase
  , _proto.cloneTarget = function cloneTarget(target) {
    return {
      id: target.id,
      id_org: target.id_org,
      values: target.values.map(function (d) {
        return {
          x: d.x,
          value: d.value,
          id: d.id
        };
      })
    };
  }, Cache;
}();


;// CONCATENATED MODULE: ./src/module/generator.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


var generator_setTimeout = win.setTimeout,
    generator_clearTimeout = win.clearTimeout;
/**
 * Generate resize queue function
 * @returns {Fucntion}
 * @private
 */

function generateResize() {
  var timeout,
      fn = [],
      callResizeFn = function () {
    callResizeFn.clear(), timeout = generator_setTimeout(function () {
      fn.forEach(function (f) {
        return f();
      });
    }, 200);
  };

  return callResizeFn.clear = function () {
    timeout && (generator_clearTimeout(timeout), timeout = null);
  }, callResizeFn.add = function (f) {
    return fn.push(f);
  }, callResizeFn.remove = function (f) {
    return fn.splice(fn.indexOf(f), 1);
  }, callResizeFn;
}
/**
 * Generate transition queue function
 * @returns {Function}
 * @private
 */

function generateWait() {
  var transitionsToWait = [],
      f = function (t, callback) {
    // eslint-disable-next-line
    function loop() {
      for (var _t, done = 0, i = 0; _t = transitionsToWait[i]; i++) {
        if (_t === !0 || _t.empty && _t.empty()) {
          done++;
          continue;
        }

        try {
          _t.transition();
        } catch (e) {
          done++;
        }
      }

      timer && generator_clearTimeout(timer), done === transitionsToWait.length ? callback && callback() : timer = generator_setTimeout(loop, 50);
    }

    var timer;
    loop();
  };

  return f.add = function (t) {
    isArray(t) ? transitionsToWait = transitionsToWait.concat(t) : transitionsToWait.push(t);
  }, f;
}
// EXTERNAL MODULE: external {"commonjs":"d3-dsv","commonjs2":"d3-dsv","amd":"d3-dsv","root":"d3"}
var external_commonjs_d3_dsv_commonjs2_d3_dsv_amd_d3_dsv_root_d3_ = __webpack_require__(5);
;// CONCATENATED MODULE: ./src/ChartInternal/data/convert.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Data convert
 * @memberof ChartInternal
 * @private
 */

/* harmony default export */ var convert = ({
  /**
   * Convert data according its type
   * @param {object} args data object
   * @param {Function} [callback] callback for url(XHR) type loading
   * @returns {object}
   * @private
   */
  convertData: function convertData(args, callback) {
    var data;
    if (args.bindto ? (data = {}, ["url", "mimeType", "headers", "keys", "json", "keys", "rows", "columns"].forEach(function (v) {
      var key = "data_" + v;
      key in args && (data[v] = args[key]);
    })) : data = args, data.url && callback) this.convertUrlToData(data.url, data.mimeType, data.headers, data.keys, callback);else if (data.json) data = this.convertJsonToData(data.json, data.keys);else if (data.rows) data = this.convertRowsToData(data.rows);else if (data.columns) data = this.convertColumnsToData(data.columns);else if (args.bindto) throw Error("url or json or rows or columns is required.");
    return isArray(data) && data;
  },

  /**
   * Convert URL data
   * @param {string} url Remote URL
   * @param {string} mimeType MIME type string: json | csv | tsv
   * @param {object} headers Header object
   * @param {object} keys Key object
   * @param {Function} done Callback function
   * @private
   */
  convertUrlToData: function convertUrlToData(url, mimeType, headers, keys, done) {
    var _this = this;

    mimeType === void 0 && (mimeType = "csv");
    var req = new XMLHttpRequest();
    req.open("GET", url), headers && Object.keys(headers).forEach(function (key) {
      req.setRequestHeader(key, headers[key]);
    }), req.onreadystatechange = function () {
      if (req.readyState === 4) if (req.status === 200) {
        var response = req.responseText;
        response && done.call(_this, _this["convert" + capitalize(mimeType) + "ToData"](mimeType === "json" ? JSON.parse(response) : response, keys));
      } else throw new Error(url + ": Something went wrong loading!");
    }, req.send();
  },

  /**
   * Convert CSV/TSV data
   * @param {object} parser Parser object
   * @param {object} xsv Data
   * @private
   * @returns {object}
   */
  convertCsvTsvToData: function convertCsvTsvToData(parser, xsv) {
    var d,
        rows = parser.rows(xsv);
    return rows.length === 1 ? (d = [{}], rows[0].forEach(function (id) {
      d[0][id] = null;
    })) : d = parser.parse(xsv), d;
  },
  convertCsvToData: function convertCsvToData(xsv) {
    return this.convertCsvTsvToData({
      rows: external_commonjs_d3_dsv_commonjs2_d3_dsv_amd_d3_dsv_root_d3_.csvParseRows,
      parse: external_commonjs_d3_dsv_commonjs2_d3_dsv_amd_d3_dsv_root_d3_.csvParse
    }, xsv);
  },
  convertTsvToData: function convertTsvToData(tsv) {
    return this.convertCsvTsvToData({
      rows: external_commonjs_d3_dsv_commonjs2_d3_dsv_amd_d3_dsv_root_d3_.tsvParseRows,
      parse: external_commonjs_d3_dsv_commonjs2_d3_dsv_amd_d3_dsv_root_d3_.tsvParse
    }, tsv);
  },
  convertJsonToData: function convertJsonToData(json, keysParam) {
    var targetKeys,
        data,
        _this2 = this,
        config = this.config,
        newRows = [];

    if (isArray(json)) {
      var keys = keysParam || config.data_keys;
      keys.x ? (targetKeys = keys.value.concat(keys.x), config.data_x = keys.x) : targetKeys = keys.value, newRows.push(targetKeys), json.forEach(function (o) {
        var newRow = targetKeys.map(function (key) {
          // convert undefined to null because undefined data will be removed in convertDataToTargets()
          var v = _this2.findValueInJson(o, key);

          return isUndefined(v) && (v = null), v;
        });
        newRows.push(newRow);
      }), data = this.convertRowsToData(newRows);
    } else Object.keys(json).forEach(function (key) {
      var tmp = json[key].concat();
      tmp.unshift(key), newRows.push(tmp);
    }), data = this.convertColumnsToData(newRows);

    return data;
  },
  findValueInJson: function findValueInJson(object, path) {
    if (object[path] !== undefined) return object[path];
    var convertedPath = path.replace(/\[(\w+)\]/g, ".$1"),
        pathArray = convertedPath.replace(/^\./, "").split("."),
        target = object; // convert indexes to properties (replace [] with .)

    return pathArray.some(function (k) {
      return !(target = target && k in target ? target[k] : undefined);
    }), target;
  },
  convertRowsToData: function convertRowsToData(rows) {
    var keys = rows[0],
        newRows = [];
    return rows.forEach(function (row, i) {
      if (i > 0) {
        var newRow = {};
        row.forEach(function (v, j) {
          if (isUndefined(v)) throw new Error("Source data is missing a component at (" + i + ", " + j + ")!");
          newRow[keys[j]] = v;
        }), newRows.push(newRow);
      }
    }), newRows;
  },
  convertColumnsToData: function convertColumnsToData(columns) {
    var newRows = [];
    return columns.forEach(function (col, i) {
      var key = col[0];
      col.forEach(function (v, j) {
        if (j > 0) {
          if (isUndefined(newRows[j - 1]) && (newRows[j - 1] = {}), isUndefined(v)) throw new Error("Source data is missing a component at (" + i + ", " + j + ")!");
          newRows[j - 1][key] = v;
        }
      });
    }), newRows;
  },
  convertDataToTargets: function convertDataToTargets(data, appendXs) {
    var _this3 = this,
        $$ = this,
        axis = $$.axis,
        config = $$.config,
        state = $$.state,
        isCategorized = !1,
        isTimeSeries = !1,
        isCustomX = !1;

    axis && (isCategorized = axis.isCategorized(), isTimeSeries = axis.isTimeSeries(), isCustomX = axis.isCustomX());
    var xsData,
        dataKeys = Object.keys(data[0] || {}),
        ids = dataKeys.length ? dataKeys.filter($$.isNotX, $$) : [],
        xs = dataKeys.length ? dataKeys.filter($$.isX, $$) : [];
    ids.forEach(function (id) {
      var xKey = _this3.getXKey(id);

      isCustomX || isTimeSeries ? xs.indexOf(xKey) >= 0 ? xsData = (appendXs && $$.data.xs[id] || []).concat(data.map(function (d) {
        return d[xKey];
      }).filter(isValue).map(function (rawX, i) {
        return $$.generateTargetX(rawX, id, i);
      })) : config.data_x ? xsData = _this3.getOtherTargetXs() : notEmpty(config.data_xs) && (xsData = $$.getXValuesOfXKey(xKey, $$.data.targets)) : xsData = data.map(function (d, i) {
        return i;
      }), xsData && (_this3.data.xs[id] = xsData);
    }), ids.forEach(function (id) {
      if (!_this3.data.xs[id]) throw new Error("x is not defined for id = \"" + id + "\".");
    });
    // convert to target
    var targets = ids.map(function (id, index) {
      var convertedId = config.data_idConverter.bind($$.api)(id),
          xKey = $$.getXKey(id),
          isCategory = isCustomX && isCategorized,
          hasCategory = isCategory && data.map(function (v) {
        return v.x;
      }).every(function (v) {
        return config.axis_x_categories.indexOf(v) > -1;
      }),
          isDataAppend = data.__append__,
          xIndex = xKey === null && isDataAppend ? $$.api.data.values(id).length : 0;
      return {
        id: convertedId,
        id_org: id,
        values: data.map(function (d, i) {
          var x,
              rawX = d[xKey],
              value = d[id];
          return value = value === null || isNaN(value) || isObject(value) ? isArray(value) || isObject(value) ? value : null : +value, (isCategory || state.hasRadar) && index === 0 && !isUndefined(rawX) ? (!hasCategory && index === 0 && i === 0 && !isDataAppend && (config.axis_x_categories = []), x = config.axis_x_categories.indexOf(rawX), x === -1 && (x = config.axis_x_categories.length, config.axis_x_categories.push(rawX))) : x = $$.generateTargetX(rawX, id, xIndex + i), (isUndefined(value) || $$.data.xs[id].length <= i) && (x = undefined), {
            x: x,
            value: value,
            id: convertedId
          };
        }).filter(function (v) {
          return isDefined(v.x);
        })
      };
    }); // finish targets

    return targets.forEach(function (t) {
      config.data_xSort && (t.values = t.values.sort(function (v1, v2) {
        var x1 = v1.x || v1.x === 0 ? v1.x : Infinity,
            x2 = v2.x || v2.x === 0 ? v2.x : Infinity;
        return x1 - x2;
      })), t.values.forEach(function (v, i) {
        return v.index = i;
      }), $$.data.xs[t.id].sort(function (v1, v2) {
        return v1 - v2;
      });
    }), state.hasNegativeValue = $$.hasNegativeValueInTargets(targets), state.hasPositiveValue = $$.hasPositiveValueInTargets(targets), config.data_type && $$.setTargetType($$.mapToIds(targets).filter(function (id) {
      return !(id in config.data_types);
    }), config.data_type), targets.forEach(function (d) {
      return $$.cache.add(d.id_org, d, !0);
    }), targets;
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/data/data.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



/* harmony default export */ var data_data = ({
  isX: function isX(key) {
    var $$ = this,
        config = $$.config,
        dataKey = config.data_x && key === config.data_x,
        existValue = notEmpty(config.data_xs) && hasValue(config.data_xs, key);
    return dataKey || existValue;
  },
  isNotX: function isNotX(key) {
    return !this.isX(key);
  },
  isStackNormalized: function isStackNormalized() {
    var config = this.config;
    return !!(config.data_stack_normalize && config.data_groups.length);
  },
  isGrouped: function isGrouped(id) {
    var groups = this.config.data_groups;
    return id ? groups.some(function (v) {
      return v.indexOf(id) >= 0 && v.length > 1;
    }) : groups.length > 0;
  },
  getXKey: function getXKey(id) {
    var $$ = this,
        config = $$.config;
    return config.data_x ? config.data_x : notEmpty(config.data_xs) ? config.data_xs[id] : null;
  },
  getXValuesOfXKey: function getXValuesOfXKey(key, targets) {
    var xValues,
        $$ = this,
        ids = targets && notEmpty(targets) ? $$.mapToIds(targets) : [];
    return ids.forEach(function (id) {
      $$.getXKey(id) === key && (xValues = $$.data.xs[id]);
    }), xValues;
  },

  /**
   * Get index number based on given x Axis value
   * @param {Date|number|string} x x Axis to be compared
   * @param {Array} basedX x Axis list to be based on
   * @returns {number} index number
   * @private
   */
  getIndexByX: function getIndexByX(x, basedX) {
    var $$ = this;
    return basedX ? basedX.indexOf(isString(x) ? x : +x) : ($$.filterByX($$.data.targets, x)[0] || {
      index: null
    }).index;
  },
  getXValue: function getXValue(id, i) {
    var $$ = this;
    return id in $$.data.xs && $$.data.xs[id] && isValue($$.data.xs[id][i]) ? $$.data.xs[id][i] : i;
  },
  getOtherTargetXs: function getOtherTargetXs() {
    var $$ = this,
        idsForX = Object.keys($$.data.xs);
    return idsForX.length ? $$.data.xs[idsForX[0]] : null;
  },
  getOtherTargetX: function getOtherTargetX(index) {
    var xs = this.getOtherTargetXs();
    return xs && index < xs.length ? xs[index] : null;
  },
  addXs: function addXs(xs) {
    var $$ = this,
        config = $$.config;
    Object.keys(xs).forEach(function (id) {
      config.data_xs[id] = xs[id];
    });
  },
  isMultipleX: function isMultipleX() {
    return notEmpty(this.config.data_xs) || !this.config.data_xSort || this.hasType("bubble") || this.hasType("scatter");
  },
  addName: function addName(data) {
    var name,
        $$ = this,
        config = $$.config;
    return data && (name = config.data_names[data.id], data.name = name === undefined ? data.id : name), data;
  },

  /**
   * Get all values on given index
   * @param {number} index Index
   * @param {boolean} filterNull Filter nullish value
   * @returns {Array}
   * @private
   */
  getAllValuesOnIndex: function getAllValuesOnIndex(index, filterNull) {
    filterNull === void 0 && (filterNull = !1);
    var $$ = this,
        value = $$.filterTargetsToShow($$.data.targets).map(function (t) {
      return $$.addName($$.getValueOnIndex(t.values, index));
    });
    return filterNull && (value = value.filter(function (v) {
      return isValue(v.value);
    })), value;
  },
  getValueOnIndex: function getValueOnIndex(values, index) {
    var valueOnIndex = values.filter(function (v) {
      return v.index === index;
    });
    return valueOnIndex.length ? valueOnIndex[0] : null;
  },
  updateTargetX: function updateTargetX(targets, x) {
    var $$ = this;
    targets.forEach(function (t) {
      t.values.forEach(function (v, i) {
        v.x = $$.generateTargetX(x[i], t.id, i);
      }), $$.data.xs[t.id] = x;
    });
  },
  updateTargetXs: function updateTargetXs(targets, xs) {
    var $$ = this;
    targets.forEach(function (t) {
      xs[t.id] && $$.updateTargetX([t], xs[t.id]);
    });
  },
  generateTargetX: function generateTargetX(rawX, id, index) {
    var $$ = this,
        axis = $$.axis,
        x = axis && axis.isCategorized() ? index : rawX || index;

    if (axis && axis.isTimeSeries()) {
      var fn = parseDate.bind($$);
      x = rawX ? fn(rawX) : fn($$.getXValue(id, index));
    } else axis && axis.isCustomX() && !axis.isCategorized() && (x = isValue(rawX) ? +rawX : $$.getXValue(id, index));

    return x;
  },
  updateXs: function updateXs(values) {
    values.length && (this.axis.xs = values.map(function (v) {
      return v.x;
    }));
  },
  getPrevX: function getPrevX(i) {
    var x = this.axis.xs[i - 1];
    return isDefined(x) ? x : null;
  },
  getNextX: function getNextX(i) {
    var x = this.axis.xs[i + 1];
    return isDefined(x) ? x : null;
  },

  /**
   * Get base value isAreaRangeType
   * @param {object} data Data object
   * @returns {number}
   * @private
   */
  getBaseValue: function getBaseValue(data) {
    var $$ = this,
        hasAxis = $$.state.hasAxis,
        value = data.value;
    return value && hasAxis && ($$.isAreaRangeType(data) ? value = $$.getRangedData(data, "mid") : $$.isBubbleZType(data) && (value = $$.getBubbleZData(value, "y"))), value;
  },

  /**
   * Get min/max value from the data
   * @private
   * @param {Array} data array data to be evaluated
   * @returns {{min: {number}, max: {number}}}
   */
  getMinMaxValue: function getMinMaxValue(data) {
    var min,
        max,
        getBaseValue = this.getBaseValue.bind(this);
    return (data || this.data.targets.map(function (t) {
      return t.values;
    })).forEach(function (v, i) {
      var value = v.map(getBaseValue).filter(isNumber);
      min = Math.min.apply(Math, [i ? min : Infinity].concat(value)), max = Math.max.apply(Math, [i ? max : -Infinity].concat(value));
    }), {
      min: min,
      max: max
    };
  },

  /**
   * Get the min/max data
   * @private
   * @returns {{min: Array, max: Array}}
   */
  getMinMaxData: function getMinMaxData() {
    var $$ = this,
        cacheKey = KEY.dataMinMax,
        minMaxData = $$.cache.get(cacheKey);

    if (!minMaxData) {
      var data = $$.data.targets.map(function (t) {
        return t.values;
      }),
          minMax = $$.getMinMaxValue(data),
          min = [],
          max = [];
      // update the cached data
      data.forEach(function (v) {
        var minData = $$.getFilteredDataByValue(v, minMax.min),
            maxData = $$.getFilteredDataByValue(v, minMax.max);
        minData.length && (min = min.concat(minData)), maxData.length && (max = max.concat(maxData));
      }), $$.cache.add(cacheKey, minMaxData = {
        min: min,
        max: max
      });
    }

    return minMaxData;
  },

  /**
   * Get sum of data per index
   * @private
   * @returns {Array}
   */
  getTotalPerIndex: function getTotalPerIndex() {
    var $$ = this,
        cacheKey = KEY.dataTotalPerIndex,
        sum = $$.cache.get(cacheKey);
    return $$.isStackNormalized() && !sum && (sum = [], $$.data.targets.forEach(function (row) {
      row.values.forEach(function (v, i) {
        sum[i] || (sum[i] = 0), sum[i] += isNumber(v.value) ? v.value : 0;
      });
    })), sum;
  },

  /**
   * Get total data sum
   * @param {boolean} subtractHidden Subtract hidden data from total
   * @returns {number}
   * @private
   */
  getTotalDataSum: function getTotalDataSum(subtractHidden) {
    var $$ = this,
        cacheKey = KEY.dataTotalSum,
        total = $$.cache.get(cacheKey);

    if (!isNumber(total)) {
      var sum = mergeArray($$.data.targets.map(function (t) {
        return t.values;
      })).map(function (v) {
        return v.value;
      }).reduce(function (p, c) {
        return p + c;
      });
      $$.cache.add(cacheKey, total = sum);
    }

    return subtractHidden && (total -= $$.getHiddenTotalDataSum()), total;
  },

  /**
   * Get total hidden data sum
   * @returns {number}
   * @private
   */
  getHiddenTotalDataSum: function getHiddenTotalDataSum() {
    var $$ = this,
        api = $$.api,
        hiddenTargetIds = $$.state.hiddenTargetIds,
        total = 0;
    return hiddenTargetIds.length && (total = api.data.values.bind(api)(hiddenTargetIds).reduce(function (p, c) {
      return p + c;
    })), total;
  },

  /**
   * Get filtered data by value
   * @param {object} data Data
   * @param {number} value Value to be filtered
   * @returns {Array} filtered array data
   * @private
   */
  getFilteredDataByValue: function getFilteredDataByValue(data, value) {
    var _this = this;

    return data.filter(function (t) {
      return _this.getBaseValue(t) === value;
    });
  },

  /**
   * Return the max length of the data
   * @returns {number} max data length
   * @private
   */
  getMaxDataCount: function getMaxDataCount() {
    return Math.max.apply(Math, this.data.targets.map(function (t) {
      return t.values.length;
    }));
  },
  getMaxDataCountTarget: function getMaxDataCountTarget() {
    var target = this.filterTargetsToShow() || [],
        length = target.length;
    return length > 1 ? (target = target.map(function (t) {
      return t.values;
    }).reduce(function (a, b) {
      return a.concat(b);
    }).map(function (v) {
      return v.x;
    }), target = sortValue(getUnique(target)).map(function (x, index) {
      return {
        x: x,
        index: index
      };
    })) : length && (target = target[0].values), target;
  },
  mapToIds: function mapToIds(targets) {
    return targets.map(function (d) {
      return d.id;
    });
  },
  mapToTargetIds: function mapToTargetIds(ids) {
    var $$ = this;
    return ids ? isArray(ids) ? ids.concat() : [ids] : $$.mapToIds($$.data.targets);
  },
  hasTarget: function hasTarget(targets, id) {
    var ids = this.mapToIds(targets);

    for (var val, i = 0; val = ids[i]; i++) if (val === id) return !0;

    return !1;
  },
  isTargetToShow: function isTargetToShow(targetId) {
    return this.state.hiddenTargetIds.indexOf(targetId) < 0;
  },
  isLegendToShow: function isLegendToShow(targetId) {
    return this.state.hiddenLegendIds.indexOf(targetId) < 0;
  },
  filterTargetsToShow: function filterTargetsToShow(targets) {
    var $$ = this;
    return (targets || $$.data.targets).filter(function (t) {
      return $$.isTargetToShow(t.id);
    });
  },
  mapTargetsToUniqueXs: function mapTargetsToUniqueXs(targets) {
    var $$ = this,
        axis = $$.axis,
        xs = [];
    return targets && targets.length && (xs = getUnique(mergeArray(targets.map(function (t) {
      return t.values.map(function (v) {
        return +v.x;
      });
    }))), xs = axis && axis.isTimeSeries() ? xs.map(function (x) {
      return new Date(+x);
    }) : xs.map(function (x) {
      return +x;
    })), sortValue(xs);
  },

  /**
   * Add to the state target Ids
   * @param {string} type State's prop name
   * @param {Array|string} targetIds Target ids array
   * @private
   */
  addTargetIds: function addTargetIds(type, targetIds) {
    var state = this.state,
        ids = isArray(targetIds) ? targetIds : [targetIds];
    ids.forEach(function (v) {
      state[type].indexOf(v) < 0 && state[type].push(v);
    });
  },

  /**
   * Remove from the state target Ids
   * @param {string} type State's prop name
   * @param {Array|string} targetIds Target ids array
   * @private
   */
  removeTargetIds: function removeTargetIds(type, targetIds) {
    var state = this.state,
        ids = isArray(targetIds) ? targetIds : [targetIds];
    ids.forEach(function (v) {
      var index = state[type].indexOf(v);
      index >= 0 && state[type].splice(index, 1);
    });
  },
  addHiddenTargetIds: function addHiddenTargetIds(targetIds) {
    this.addTargetIds("hiddenTargetIds", targetIds);
  },
  removeHiddenTargetIds: function removeHiddenTargetIds(targetIds) {
    this.removeTargetIds("hiddenTargetIds", targetIds);
  },
  addHiddenLegendIds: function addHiddenLegendIds(targetIds) {
    this.addTargetIds("hiddenLegendIds", targetIds);
  },
  removeHiddenLegendIds: function removeHiddenLegendIds(targetIds) {
    this.removeTargetIds("hiddenLegendIds", targetIds);
  },
  getValuesAsIdKeyed: function getValuesAsIdKeyed(targets) {
    var $$ = this,
        hasAxis = $$.state.hasAxis,
        ys = {},
        isMultipleX = $$.isMultipleX(),
        xs = isMultipleX ? $$.mapTargetsToUniqueXs(targets).map(function (v) {
      return isString(v) ? v : +v;
    }) : null;
    return targets.forEach(function (t) {
      var data = [];
      t.values.filter(function (_ref) {
        var value = _ref.value;
        return isValue(value) || value === null;
      }).forEach(function (v) {
        var value = v.value; // exclude 'volume' value to correct mis domain calculation

        value !== null && $$.isCandlestickType(v) && (value = isArray(value) ? value.slice(0, 4) : [value.open, value.high, value.low, value.close]), isArray(value) ? data.push.apply(data, value) : isObject(value) && "high" in value ? data.push.apply(data, Object.values(value)) : $$.isBubbleZType(v) ? data.push(hasAxis && $$.getBubbleZData(value, "y")) : isMultipleX ? data[$$.getIndexByX(v.x, xs)] = value : data.push(value);
      }), ys[t.id] = data;
    }), ys;
  },
  checkValueInTargets: function checkValueInTargets(targets, checker) {
    var values,
        ids = Object.keys(targets);

    for (var i = 0; i < ids.length; i++) {
      values = targets[ids[i]].values;

      for (var j = 0; j < values.length; j++) if (checker(values[j].value)) return !0;
    }

    return !1;
  },
  hasMultiTargets: function hasMultiTargets() {
    return this.filterTargetsToShow().length > 1;
  },
  hasNegativeValueInTargets: function hasNegativeValueInTargets(targets) {
    return this.checkValueInTargets(targets, function (v) {
      return v < 0;
    });
  },
  hasPositiveValueInTargets: function hasPositiveValueInTargets(targets) {
    return this.checkValueInTargets(targets, function (v) {
      return v > 0;
    });
  },

  /**
   * Sort targets data
   * @param {Array} targetsValue Target value
   * @returns {Array}
   * @private
   */
  orderTargets: function orderTargets(targetsValue) {
    var $$ = this,
        targets = [].concat(targetsValue),
        fn = $$.getSortCompareFn();
    return fn && targets.sort(fn), targets;
  },

  /**
   * Get data.order compare function
   * @param {boolean} isArc Is for Arc type sort or not
   * @returns {Function} compare function
   * @private
   */
  getSortCompareFn: function getSortCompareFn(isArc) {
    isArc === void 0 && (isArc = !1);
    var fn,
        $$ = this,
        config = $$.config,
        order = config.data_order,
        orderAsc = /asc/i.test(order),
        orderDesc = /desc/i.test(order);

    if (orderAsc || orderDesc) {
      var reducer = function (p, c) {
        return p + Math.abs(c.value);
      };

      fn = function (t1, t2) {
        var t1Sum = t1.values.reduce(reducer, 0),
            t2Sum = t2.values.reduce(reducer, 0);
        return isArc ? orderAsc ? t1Sum - t2Sum : t2Sum - t1Sum : orderAsc ? t2Sum - t1Sum : t1Sum - t2Sum;
      };
    } else isFunction(order) && (fn = order.bind($$.api));

    return fn || null;
  },
  filterByX: function filterByX(targets, x) {
    return mergeArray(targets.map(function (t) {
      return t.values;
    })).filter(function (v) {
      return v.x - x === 0;
    });
  },
  filterRemoveNull: function filterRemoveNull(data) {
    var _this2 = this;

    return data.filter(function (d) {
      return isValue(_this2.getBaseValue(d));
    });
  },
  filterByXDomain: function filterByXDomain(targets, xDomain) {
    return targets.map(function (t) {
      return {
        id: t.id,
        id_org: t.id_org,
        values: t.values.filter(function (v) {
          return xDomain[0] <= v.x && v.x <= xDomain[1];
        })
      };
    });
  },
  hasDataLabel: function hasDataLabel() {
    var dataLabels = this.config.data_labels;
    return isboolean(dataLabels) && dataLabels || isObjectType(dataLabels) && notEmpty(dataLabels);
  },

  /**
   * Get data index from the event coodinates
   * @param {Event} event Event object
   * @returns {number}
   */
  getDataIndexFromEvent: function getDataIndexFromEvent(event) {
    var $$ = this,
        config = $$.config,
        _$$$state = $$.state,
        inputType = _$$$state.inputType,
        _$$$state$eventReceiv = _$$$state.eventReceiver,
        coords = _$$$state$eventReceiv.coords,
        rect = _$$$state$eventReceiv.rect,
        isRotated = config.axis_rotated,
        e = inputType === "touch" && event.changedTouches ? event.changedTouches[0] : event,
        index = findIndex(coords, isRotated ? e.clientY - rect.top : e.clientX - rect.left, 0, coords.length - 1, isRotated);
    return index;
  },
  getDataLabelLength: function getDataLabelLength(min, max, key) {
    var $$ = this,
        lengths = [0, 0];
    return $$.$el.chart.select("svg").selectAll(".dummy").data([min, max]).enter().append("text").text(function (d) {
      return $$.dataLabelFormat(d.id)(d);
    }).each(function (d, i) {
      lengths[i] = this.getBoundingClientRect()[key] * 1.3;
    }).remove(), lengths;
  },
  isNoneArc: function isNoneArc(d) {
    return this.hasTarget(this.data.targets, d.id);
  },
  isArc: function isArc(d) {
    return "data" in d && this.hasTarget(this.data.targets, d.data.id);
  },
  findSameXOfValues: function findSameXOfValues(values, index) {
    var i,
        targetX = values[index].x,
        sames = [];

    for (i = index - 1; i >= 0 && !(targetX !== values[i].x); i--) sames.push(values[i]);

    for (i = index; i < values.length && !(targetX !== values[i].x); i++) sames.push(values[i]);

    return sames;
  },
  findClosestFromTargets: function findClosestFromTargets(targets, pos) {
    var $$ = this,
        candidates = targets.map(function (target) {
      return $$.findClosest(target.values, pos);
    });
    // map to array of closest points of each target
    // decide closest point and return
    return $$.findClosest(candidates, pos);
  },
  findClosest: function findClosest(values, pos) {
    var closest,
        $$ = this,
        config = $$.config,
        main = $$.$el.main,
        data = values.filter(function (v) {
      return v && isValue(v.value);
    }),
        minDist = config.point_sensitivity;
    return data.filter(function (v) {
      return $$.isBarType(v.id);
    }).forEach(function (v) {
      var shape = main.select("." + config_classes.bars + $$.getTargetSelectorSuffix(v.id) + " ." + config_classes.bar + "-" + v.index).node();
      !closest && $$.isWithinBar(shape) && (closest = v);
    }), data.filter(function (v) {
      return !$$.isBarType(v.id);
    }).forEach(function (v) {
      var d = $$.dist(v, pos);
      d < minDist && (minDist = d, closest = v);
    }), closest;
  },
  dist: function dist(data, pos) {
    var $$ = this,
        isRotated = $$.config.axis_rotated,
        scale = $$.scale,
        xIndex = isRotated ? 1 : 0,
        yIndex = isRotated ? 0 : 1,
        y = $$.circleY(data, data.index),
        x = (scale.zoom || scale.x)(data.x);
    return Math.sqrt(Math.pow(x - pos[xIndex], 2) + Math.pow(y - pos[yIndex], 2));
  },

  /**
   * Convert data for step type
   * @param {Array} values Object data values
   * @returns {Array}
   * @private
   */
  convertValuesToStep: function convertValuesToStep(values) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        stepType = config.line_step_type,
        isCategorized = !!axis && axis.isCategorized(),
        converted = isArray(values) ? values.concat() : [values];
    if (!(isCategorized || /step\-(after|before)/.test(stepType))) return values; // insert & append cloning first/last value to be fully rendered covering on each gap sides

    var head = converted[0],
        tail = converted[converted.length - 1],
        id = head.id,
        x = head.x;
    return converted.unshift({
      x: --x,
      value: head.value,
      id: id
    }), isCategorized && stepType === "step-after" && converted.unshift({
      x: --x,
      value: head.value,
      id: id
    }), x = tail.x, converted.push({
      x: ++x,
      value: tail.value,
      id: id
    }), isCategorized && stepType === "step-before" && converted.push({
      x: ++x,
      value: tail.value,
      id: id
    }), converted;
  },
  convertValuesToRange: function convertValuesToRange(values) {
    var converted = isArray(values) ? values.concat() : [values],
        ranges = [];
    return converted.forEach(function (range) {
      var x = range.x,
          id = range.id;
      ranges.push({
        x: x,
        id: id,
        value: range.value[0]
      }), ranges.push({
        x: x,
        id: id,
        value: range.value[2]
      });
    }), ranges;
  },
  updateDataAttributes: function updateDataAttributes(name, attrs) {
    var $$ = this,
        config = $$.config,
        current = config["data_" + name];
    return isUndefined(attrs) ? current : (Object.keys(attrs).forEach(function (id) {
      current[id] = attrs[id];
    }), $$.redraw({
      withLegend: !0
    }), current);
  },
  getRangedData: function getRangedData(d, key, type) {
    key === void 0 && (key = ""), type === void 0 && (type = "areaRange");
    var value = d == null ? void 0 : d.value;

    if (isArray(value)) {
      // @ts-ignore
      var index = {
        areaRange: ["high", "mid", "low"],
        candlestick: ["open", "high", "low", "close", "volume"]
      }[type].indexOf(key);
      return index >= 0 && value ? value[index] : undefined;
    }

    return value ? value[key] : value;
  },

  /**
   * Get ratio value
   * @param {string} type Ratio for given type
   * @param {object} d Data value object
   * @param {boolean} asPercent Convert the return as percent or not
   * @returns {number} Ratio value
   * @private
   */
  getRatio: function getRatio(type, d, asPercent) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        api = $$.api,
        ratio = 0;
    if (d && api.data.shown().length) if (ratio = d.ratio || d.value, type === "arc") {
        // if has padAngle set, calculate rate based on value
        if ($$.pie.padAngle()()) ratio = d.value / $$.getTotalDataSum(!0);else {
          var gaugeArcLength = config.gauge_fullCircle ? $$.getArcLength() : $$.getStartAngle() * -2,
              arcLength = $$.hasType("gauge") ? gaugeArcLength : Math.PI * 2;
          ratio = (d.endAngle - d.startAngle) / arcLength;
        }
    } else if (type === "index") {
      var dataValues = api.data.values.bind(api),
          total = this.getTotalPerIndex();

      if (state.hiddenTargetIds.length) {
        var hiddenSum = dataValues(state.hiddenTargetIds, !1);
        hiddenSum.length && (hiddenSum = hiddenSum.reduce(function (acc, curr) {
          return acc.map(function (v, i) {
            return (isNumber(v) ? v : 0) + curr[i];
          });
        }), total = total.map(function (v, i) {
          return v - hiddenSum[i];
        }));
      }

      d.ratio = isNumber(d.value) && total && total[d.index] > 0 ? d.value / total[d.index] : 0, ratio = d.ratio;
    } else if (type === "radar") ratio = parseFloat(Math.max(d.value, 0) + "") / state.current.dataMax * config.radar_size_ratio;else if (type === "bar") {
      var yScale = $$.getYScaleById.bind($$)(d.id),
          max = yScale.domain().reduce(function (a, c) {
        return c - a;
      });
      ratio = Math.abs(d.value) / max;
    }
    return asPercent && ratio ? ratio * 100 : ratio;
  },

  /**
   * Sort data index to be aligned with x axis.
   * @param {Array} tickValues Tick array values
   * @private
   */
  updateDataIndexByX: function updateDataIndexByX(tickValues) {
    var $$ = this,
        tickValueMap = tickValues.reduce(function (out, tick, index) {
      return out[+tick.x] = index, out;
    }, {});
    $$.data.targets.forEach(function (t) {
      t.values.forEach(function (value, valueIndex) {
        var index = tickValueMap[+value.x];
        index === undefined && (index = valueIndex), value.index = index;
      });
    });
  },

  /**
   * Determine if bubble has dimension data
   * @param {object|Array} d data value
   * @returns {boolean}
   * @private
   */
  isBubbleZType: function isBubbleZType(d) {
    var $$ = this;
    return $$.isBubbleType(d) && (isObject(d.value) && ("z" in d.value || "y" in d.value) || isArray(d.value) && d.value.length === 2);
  },

  /**
   * Get data object by id
   * @param {string} id data id
   * @returns {object}
   * @private
   */
  getDataById: function getDataById(id) {
    var d = this.cache.get(id) || this.api.data(id);
    return isArray(d) ? d[0] : d;
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/data/load.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/* harmony default export */ var load = ({
  load: function load(rawTargets, args) {
    var $$ = this,
        append = args.append,
        targets = rawTargets;
    // Set targets
    // Redraw with new targets
    // Update current state chart type and elements list after redraw
    targets && (args.filter && (targets = targets.filter(args.filter)), (args.type || args.types) && targets.forEach(function (t) {
      var type = args.types && args.types[t.id] || args.type;
      $$.setTargetType(t.id, type);
    }), $$.data.targets.forEach(function (d) {
      for (var i = 0; i < targets.length; i++) if (d.id === targets[i].id) {
        d.values = append ? d.values.concat(targets[i].values) : targets[i].values, targets.splice(i, 1);
        break;
      }
    }), $$.data.targets = $$.data.targets.concat(targets)), $$.updateTargets($$.data.targets), $$.redraw({
      withUpdateOrgXDomain: !0,
      withUpdateXDomain: !0,
      withLegend: !0
    }), $$.updateTypesElements(), args.done && args.done.call($$.api);
  },
  loadFromArgs: function loadFromArgs(args) {
    var $$ = this; // prevent load when chart is already destroyed

    if ($$.config) {
      $$.cache.reset();
      var data = args.data || $$.convertData(args, function (d) {
        return $$.load($$.convertDataToTargets(d), args);
      });
      args.append && (data.__append__ = !0), data && $$.load($$.convertDataToTargets(data), args);
    } // reset internally cached data

  },
  unload: function unload(rawTargetIds, customDoneCb) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        $el = $$.$el,
        done = customDoneCb,
        targetIds = rawTargetIds;
    // If no target, call done and return
    if ($$.cache.reset(), done || (done = function () {}), targetIds = targetIds.filter(function (id) {
      return $$.hasTarget($$.data.targets, id);
    }), !targetIds || targetIds.length === 0) return void done();
    var targets = $el.svg.selectAll(targetIds.map(function (id) {
      return $$.selectorTarget(id);
    }));
    (config.transition_duration ? targets.transition().style("opacity", "0") : targets).remove().call(endall, done), targetIds.forEach(function (id) {
      state.withoutFadeIn[id] = !1, $el.legend && $el.legend.selectAll("." + config_classes.legendItem + $$.getTargetSelectorSuffix(id)).remove(), $$.data.targets = $$.data.targets.filter(function (t) {
        return t.id !== id;
      });
    }), $$.updateTypesElements();
  }
});
// EXTERNAL MODULE: external {"commonjs":"d3-drag","commonjs2":"d3-drag","amd":"d3-drag","root":"d3"}
var external_commonjs_d3_drag_commonjs2_d3_drag_amd_d3_drag_root_d3_ = __webpack_require__(7);
;// CONCATENATED MODULE: ./src/ChartInternal/interactions/interaction.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */





/* harmony default export */ var interactions_interaction = ({
  selectRectForSingle: function selectRectForSingle(context, eventRect, index) {
    var $$ = this,
        config = $$.config,
        main = $$.$el.main,
        isSelectionEnabled = config.data_selection_enabled,
        isSelectionGrouped = config.data_selection_grouped,
        isSelectable = config.data_selection_isselectable,
        isTooltipGrouped = config.tooltip_grouped,
        selectedData = $$.getAllValuesOnIndex(index);
    isTooltipGrouped && ($$.showTooltip(selectedData, context), $$.showGridFocus && $$.showGridFocus(selectedData), !isSelectionEnabled || isSelectionGrouped) || main.selectAll("." + config_classes.shape + "-" + index).each(function () {
      (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed(config_classes.EXPANDED, !0), isSelectionEnabled && eventRect.style("cursor", isSelectionGrouped ? "pointer" : null), isTooltipGrouped || ($$.hideGridFocus && $$.hideGridFocus(), $$.hideTooltip(), !isSelectionGrouped && $$.setExpand(index));
    }).filter(function (d) {
      return $$.isWithinShape(this, d);
    }).call(function (selected) {
      var d = selected.data();
      isSelectionEnabled && (isSelectionGrouped || isSelectable && isSelectable.bind($$.api)(d)) && eventRect.style("cursor", "pointer"), isTooltipGrouped || ($$.showTooltip(d, context), $$.showGridFocus && $$.showGridFocus(d), $$.unexpandCircles && $$.unexpandCircles(), selected.each(function (d) {
        return $$.setExpand(index, d.id);
      }));
    });
  },

  /**
   * Expand data shape/point
   * @param {number} index Index number
   * @param {string} id Data id
   * @param {boolean} reset Reset expand state
   * @private
   */
  setExpand: function setExpand(index, id, reset) {
    var $$ = this,
        config = $$.config,
        circle = $$.$el.circle;
    // bar, candlestick
    circle && config.point_focus_expand_enabled && $$.expandCircles(index, id, reset), $$.expandBarTypeShapes(!0, index, id, reset);
  },

  /**
   * Expand/Unexpand bar type shapes
   * @param {boolean} expand Expand or unexpand
   * @param {number} i Shape index
   * @param {string} id Data id
   * @param {boolean} reset Reset expand style
   * @private
   */
  expandBarTypeShapes: function expandBarTypeShapes(expand, i, id, reset) {
    expand === void 0 && (expand = !0);
    var $$ = this;
    ["bar", "candlestick"].filter(function (v) {
      return $$.$el[v];
    }).forEach(function (v) {
      reset && $$.$el[v].classed(config_classes.EXPANDED, !1), $$.getShapeByIndex(v, i, id).classed(config_classes.EXPANDED, expand);
    });
  },

  /**
   * Handle data.onover/out callback options
   * @param {boolean} isOver Over or not
   * @param {number|object} d data object
   * @private
   */
  setOverOut: function setOverOut(isOver, d) {
    var $$ = this,
        config = $$.config,
        hasRadar = $$.state.hasRadar,
        main = $$.$el.main,
        isArc = isObject(d);

    // Call event handler
    if (isArc || d !== -1) {
      var callback = config[isOver ? "data_onover" : "data_onout"].bind($$.api);
      if (config.color_onover && $$.setOverColor(isOver, d, isArc), isArc) callback(d, main.select("." + config_classes.arc + $$.getTargetSelectorSuffix(d.id)).node());else if (!config.tooltip_grouped) {
        var last = $$.cache.get(KEY.setOverOut) || [],
            shape = main.selectAll("." + config_classes.shape + "-" + d).filter(function (d) {
          return $$.isWithinShape(this, d);
        });
        shape.each(function (d) {
          var _this = this;

          (last.length === 0 || last.every(function (v) {
            return v !== _this;
          })) && (callback(d, this), last.push(this));
        }), last.length > 0 && shape.empty() && (callback = config.data_onout.bind($$.api), last.forEach(function (v) {
          return callback((0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(v).datum(), v);
        }), last = []), $$.cache.add(KEY.setOverOut, last);
      } else isOver && (config.point_focus_only && hasRadar ? $$.showCircleFocus($$.getAllValuesOnIndex(d, !0)) : $$.setExpand(d, null, !0)), $$.isMultipleX() || main.selectAll("." + config_classes.shape + "-" + d).each(function (d) {
        callback(d, this);
      });
    }
  },

  /**
   * Call data.onover/out callback for touch event
   * @param {number|object} d target index or data object for Arc type
   * @private
   */
  callOverOutForTouch: function callOverOutForTouch(d) {
    var $$ = this,
        last = $$.cache.get(KEY.callOverOutForTouch);
    (isObject(d) && last ? d.id !== last.id : d !== last) && ((last || isNumber(last)) && $$.setOverOut(!1, last), (d || isNumber(d)) && $$.setOverOut(!0, d), $$.cache.add(KEY.callOverOutForTouch, d));
  },

  /**
   * Return draggable selection function
   * @returns {Function}
   * @private
   */
  getDraggableSelection: function getDraggableSelection() {
    var $$ = this,
        config = $$.config,
        state = $$.state;
    return config.interaction_enabled && config.data_selection_draggable && $$.drag ? (0,external_commonjs_d3_drag_commonjs2_d3_drag_amd_d3_drag_root_d3_.drag)().on("drag", function (event) {
      state.event = event, $$.drag(getPointer(event, this));
    }).on("start", function (event) {
      state.event = event, $$.dragstart(getPointer(event, this));
    }).on("end", function (event) {
      state.event = event, $$.dragend();
    }) : function () {};
  },

  /**
   * Dispatch a mouse event.
   * @private
   * @param {string} type event type
   * @param {number} index Index of eventRect
   * @param {Array} mouse x and y coordinate value
   */
  dispatchEvent: function dispatchEvent(type, index, mouse) {
    var $$ = this,
        config = $$.config,
        _$$$state = $$.state,
        eventReceiver = _$$$state.eventReceiver,
        hasAxis = _$$$state.hasAxis,
        hasRadar = _$$$state.hasRadar,
        _$$$$el = $$.$el,
        eventRect = _$$$$el.eventRect,
        arcs = _$$$$el.arcs,
        radar = _$$$$el.radar,
        isMultipleX = $$.isMultipleX(),
        element = (hasRadar ? radar.axes.select("." + config_classes.axis + "-" + index + " text") : eventRect || arcs.selectAll("." + config_classes.target + " path").filter(function (d, i) {
      return i === index;
    })).node(),
        _element$getBoundingC = element.getBoundingClientRect(),
        width = _element$getBoundingC.width,
        left = _element$getBoundingC.left,
        top = _element$getBoundingC.top;

    if (hasAxis && !hasRadar && !isMultipleX) {
      var coords = eventReceiver.coords[index];
      width = coords.w, left += coords.x, top += coords.y;
    }

    var x = left + (mouse ? mouse[0] : 0) + (isMultipleX || config.axis_rotated ? 0 : width / 2),
        y = top + (mouse ? mouse[1] : 0);
    emulateEvent[/^(mouse|click)/.test(type) ? "mouse" : "touch"](element, type, {
      screenX: x,
      screenY: y,
      clientX: x,
      clientY: y
    });
  },
  setDragStatus: function setDragStatus(isDragging) {
    this.state.dragging = isDragging;
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/class.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/* harmony default export */ var internals_class = ({
  generateClass: function generateClass(prefix, targetId) {
    return " " + prefix + " " + (prefix + this.getTargetSelectorSuffix(targetId));
  },

  /**
   * Get class string
   * @param {string} type Shape type
   * @param {boolean} withShape Get with shape prefix
   * @returns {string} Class string
   * @private
   */
  getClass: function getClass(type, withShape) {
    var _this = this,
        isPlural = /s$/.test(type),
        useIdKey = /^(area|arc|line)s?$/.test(type),
        key = isPlural ? "id" : "index";

    return function (d) {
      var data = d.data || d,
          result = (withShape ? _this.generateClass(config_classes[isPlural ? "shapes" : "shape"], data[key]) : "") + _this.generateClass(config_classes[type], data[useIdKey ? "id" : key]);

      return result.trim();
    };
  },

  /**
   * Get chart class string
   * @param {string} type Shape type
   * @returns {string} Class string
   * @private
   */
  getChartClass: function getChartClass(type) {
    var _this2 = this;

    return function (d) {
      return config_classes["chart" + type] + _this2.classTarget((d.data ? d.data : d).id);
    };
  },
  generateExtraLineClass: function generateExtraLineClass() {
    var $$ = this,
        classes = $$.config.line_classes || [],
        ids = [];
    return function (d) {
      var id = d.id || d.data && d.data.id || d;
      return ids.indexOf(id) < 0 && ids.push(id), classes[ids.indexOf(id) % classes.length];
    };
  },
  classRegion: function classRegion(d, i) {
    return this.generateClass(config_classes.region, i) + " " + ("class" in d ? d.class : "");
  },
  classTarget: function classTarget(id) {
    var additionalClassSuffix = this.config.data_classes[id],
        additionalClass = "";
    return additionalClassSuffix && (additionalClass = " " + config_classes.target + "-" + additionalClassSuffix), this.generateClass(config_classes.target, id) + additionalClass;
  },
  classFocus: function classFocus(d) {
    return this.classFocused(d) + this.classDefocused(d);
  },
  classFocused: function classFocused(d) {
    return " " + (this.state.focusedTargetIds.indexOf(d.id) >= 0 ? config_classes.focused : "");
  },
  classDefocused: function classDefocused(d) {
    return " " + (this.state.defocusedTargetIds.indexOf(d.id) >= 0 ? config_classes.defocused : "");
  },
  getTargetSelectorSuffix: function getTargetSelectorSuffix(targetId) {
    var targetStr = targetId || targetId === 0 ? "-" + targetId : "";
    return targetStr.replace(/([\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\])/g, "-");
  },
  selectorTarget: function selectorTarget(id, prefix) {
    var pfx = prefix || "",
        target = this.getTargetSelectorSuffix(id);
    // select target & circle
    return pfx + "." + (config_classes.target + target) + ", " + pfx + "." + (config_classes.circles + target);
  },
  selectorTargets: function selectorTargets(idsValue, prefix) {
    var _this3 = this,
        ids = idsValue || [];

    return ids.length ? ids.map(function (id) {
      return _this3.selectorTarget(id, prefix);
    }) : null;
  },
  selectorLegend: function selectorLegend(id) {
    return "." + (config_classes.legendItem + this.getTargetSelectorSuffix(id));
  },
  selectorLegends: function selectorLegends(ids) {
    var _this4 = this;

    return ids && ids.length ? ids.map(function (id) {
      return _this4.selectorLegend(id);
    }) : null;
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/category.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* harmony default export */ var category = ({
  /**
   * Category Name
   * @param {number} i Index number
   * @returns {string} category Name
   * @private
   */
  categoryName: function categoryName(i) {
    var categories = this.config.axis_x_categories;
    return categories && i < categories.length ? categories[i] : i;
  }
});
// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(6);
;// CONCATENATED MODULE: ./src/ChartInternal/internals/color.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */






/**
 * Set pattern's background color
 * (it adds a <rect> element to simulate bg-color)
 * @param {SVGPatternElement} pattern SVG pattern element
 * @param {string} color Color string
 * @param {string} id ID to be set
 * @returns {{id: string, node: SVGPatternElement}}
 * @private
 */

var colorizePattern = function (pattern, color, id) {
  var node = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(pattern.cloneNode(!0));
  return node.attr("id", id).insert("rect", ":first-child").attr("width", node.attr("width")).attr("height", node.attr("height")).style("fill", color), {
    id: id,
    node: node.node()
  };
},
    schemeCategory10 = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]; // Replacement of d3.schemeCategory10.
// Contained differently depend on d3 version: v4(d3-scale), v5(d3-scale-chromatic)


/* harmony default export */ var internals_color = ({
  /**
   * Get color pattern from CSS file
   * CSS should be defined as: background-image: url("#00c73c;#fa7171; ...");
   * @returns {Array}
   * @private
   */
  getColorFromCss: function getColorFromCss() {
    var cacheKey = KEY.colorPattern,
        body = browser_doc.body,
        pattern = body[cacheKey];

    if (!pattern) {
      var span = browser_doc.createElement("span");
      span.className = config_classes.colorPattern, span.style.display = "none", body.appendChild(span);
      var content = win.getComputedStyle(span).backgroundImage;
      span.parentNode.removeChild(span), content.indexOf(";") > -1 && (pattern = content.replace(/url[^#]*|["'()]|(\s|%20)/g, "").split(";").map(function (v) {
        return v.trim().replace(/[\"'\s]/g, "");
      }).filter(Boolean), body[cacheKey] = pattern);
    }

    return pattern;
  },
  generateColor: function generateColor() {
    var $$ = this,
        config = $$.config,
        colors = config.data_colors,
        callback = config.data_color,
        ids = [],
        pattern = notEmpty(config.color_pattern) ? config.color_pattern : (0,external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleOrdinal)($$.getColorFromCss() || schemeCategory10).range(),
        originalColorPattern = pattern;

    if (isFunction(config.color_tiles)) {
      var tiles = config.color_tiles.bind($$.api)(),
          colorizedPatterns = pattern.map(function (p, index) {
        var color = p.replace(/[#\(\)\s,]/g, ""),
            id = $$.state.datetimeId + "-pattern-" + color + "-" + index;
        return colorizePattern(tiles[index % tiles.length], p, id);
      }); // Add background color to patterns

      pattern = colorizedPatterns.map(function (p) {
        return "url(#" + p.id + ")";
      }), $$.patterns = colorizedPatterns;
    }

    return function (d) {
      var color,
          id = d.id || d.data && d.data.id || d,
          isLine = $$.isTypeOf(id, ["line", "spline", "step"]) || !config.data_types[id];
      return isFunction(colors[id]) ? color = colors[id].bind($$.api)(d) : colors[id] ? color = colors[id] : (ids.indexOf(id) < 0 && ids.push(id), color = isLine ? originalColorPattern[ids.indexOf(id) % originalColorPattern.length] : pattern[ids.indexOf(id) % pattern.length], colors[id] = color), isFunction(callback) ? callback.bind($$.api)(color, d) : color;
    };
  },
  generateLevelColor: function generateLevelColor() {
    var $$ = this,
        config = $$.config,
        colors = config.color_pattern,
        threshold = config.color_threshold,
        asValue = threshold.unit === "value",
        max = threshold.max || 100,
        values = threshold.values && threshold.values.length ? threshold.values : [];
    return notEmpty(threshold) ? function (value) {
      var v = asValue ? value : value * 100 / max,
          color = colors[colors.length - 1];

      for (var i = 0, l = values.length; i < l; i++) if (v <= values[i]) {
        color = colors[i];
        break;
      }

      return color;
    } : null;
  },

  /**
   * Append data backgound color filter definition
   * @private
   */
  generateDataLabelBackgroundColorFilter: function generateDataLabelBackgroundColorFilter() {
    var $$ = this,
        $el = $$.$el,
        config = $$.config,
        state = $$.state,
        backgroundColors = config.data_labels_backgroundColors;

    if (backgroundColors) {
      var ids = [];
      isString(backgroundColors) ? ids.push("") : isObject(backgroundColors) && (ids = Object.keys(backgroundColors)), ids.forEach(function (v) {
        var id = state.datetimeId + "-labels-bg" + $$.getTargetSelectorSuffix(v);
        $el.defs.append("filter").attr("x", "0").attr("y", "0").attr("width", "1").attr("height", "1").attr("id", id).html("<feFlood flood-color=\"" + (v === "" ? backgroundColors : backgroundColors[v]) + "\" /><feComposite in=\"SourceGraphic\"/>");
      });
    }
  },

  /**
   * Set the data over color.
   * When is out, will restate in its previous color value
   * @param {boolean} isOver true: set overed color, false: restore
   * @param {number|object} d target index or data object for Arc type
   * @private
   */
  setOverColor: function setOverColor(isOver, d) {
    var $$ = this,
        config = $$.config,
        main = $$.$el.main,
        onover = config.color_onover,
        color = isOver ? onover : $$.color;
    isObject(color) ? color = function (_ref) {
      var id = _ref.id;
      return id in onover ? onover[id] : $$.color(id);
    } : isString(color) ? color = function () {
      return onover;
    } : isFunction(onover) && (color = color.bind($$.api)), main.selectAll(isObject(d) ? // when is Arc type
    "." + config_classes.arc + $$.getTargetSelectorSuffix(d.id) : "." + config_classes.shape + "-" + d).style("fill", color);
  }
});
;// CONCATENATED MODULE: ./src/config/const.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Chart type constant
 * @private
 */
var TYPE = {
  AREA: "area",
  AREA_LINE_RANGE: "area-line-range",
  AREA_SPLINE: "area-spline",
  AREA_SPLINE_RANGE: "area-spline-range",
  AREA_STEP: "area-step",
  BAR: "bar",
  BUBBLE: "bubble",
  CANDLESTICK: "candlestick",
  DONUT: "donut",
  GAUGE: "gauge",
  LINE: "line",
  PIE: "pie",
  RADAR: "radar",
  SCATTER: "scatter",
  SPLINE: "spline",
  STEP: "step"
};
/**
 * chart types by category
 * @private
 */

var TYPE_BY_CATEGORY = {
  Area: [TYPE.AREA, TYPE.AREA_SPLINE, TYPE.AREA_SPLINE_RANGE, TYPE.AREA_LINE_RANGE, TYPE.AREA_STEP],
  AreaRange: [TYPE.AREA_SPLINE_RANGE, TYPE.AREA_LINE_RANGE],
  Arc: [TYPE.PIE, TYPE.DONUT, TYPE.GAUGE, TYPE.RADAR],
  Line: [TYPE.LINE, TYPE.SPLINE, TYPE.AREA, TYPE.AREA_SPLINE, TYPE.AREA_SPLINE_RANGE, TYPE.AREA_LINE_RANGE, TYPE.STEP, TYPE.AREA_STEP],
  Step: [TYPE.STEP, TYPE.AREA_STEP],
  Spline: [TYPE.SPLINE, TYPE.AREA_SPLINE, TYPE.AREA_SPLINE_RANGE]
};
;// CONCATENATED MODULE: ./src/ChartInternal/internals/domain.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/* harmony default export */ var domain = ({
  getYDomainMinMax: function getYDomainMinMax(targets, type) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        isMin = type === "min",
        dataGroups = config.data_groups,
        ids = $$.mapToIds(targets),
        ys = $$.getValuesAsIdKeyed(targets);
    return dataGroups.length > 0 && function () {
      for (var idsInGroup, _ret, hasValue = $$["has" + (isMin ? "Negative" : "Positive") + "ValueInTargets"](targets), _loop = function (j, _idsInGroup) {
        if (_idsInGroup = _idsInGroup.filter(function (v) {
          return ids.indexOf(v) >= 0;
        }), _idsInGroup.length === 0) return idsInGroup = _idsInGroup, "continue";
        var baseId = _idsInGroup[0],
            baseAxisId = axis.getId(baseId);
        hasValue && ys[baseId] && (ys[baseId] = ys[baseId].map(function (v) {
          return (isMin ? v < 0 : v > 0) ? v : 0;
        }));

        for (var id, _ret2, _loop2 = function (k, id) {
          if (!ys[id]) return "continue";
          var axisId = axis.getId(id);
          ys[id].forEach(function (v, i) {
            var val = +v,
                meetCondition = isMin ? val > 0 : val < 0;
            axisId !== baseAxisId || hasValue && meetCondition || (ys[baseId][i] += val);
          });
        }, k = 1; id = _idsInGroup[k]; k++) _ret2 = _loop2(k, id), _ret2 === "continue";

        idsInGroup = _idsInGroup;
      }, j = 0; idsInGroup = dataGroups[j]; j++) _ret = _loop(j, idsInGroup), _ret === "continue";
    }(), getMinMax(type, Object.keys(ys).map(function (key) {
      return getMinMax(type, ys[key]);
    }));
  },
  getYDomainMin: function getYDomainMin(targets) {
    return this.getYDomainMinMax(targets, "min");
  },
  getYDomainMax: function getYDomainMax(targets) {
    return this.getYDomainMinMax(targets, "max");
  },

  /**
   * Check if hidden targets bound to the given axis id
   * @param {string} id ID to be checked
   * @returns {boolean}
   * @private
   */
  isHiddenTargetWithYDomain: function isHiddenTargetWithYDomain(id) {
    var $$ = this;
    return $$.state.hiddenTargetIds.some(function (v) {
      return $$.axis.getId(v) === id;
    });
  },
  getYDomain: function getYDomain(targets, axisId, xDomain) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        scale = $$.scale,
        pfx = "axis_" + axisId;
    if ($$.isStackNormalized()) return [0, 100];
    var isLog = scale && scale[axisId] && scale[axisId].type === "log",
        targetsByAxisId = targets.filter(function (t) {
      return axis.getId(t.id) === axisId;
    }),
        yTargets = xDomain ? $$.filterByXDomain(targetsByAxisId, xDomain) : targetsByAxisId;
    if (yTargets.length === 0) // use domain of the other axis if target of axisId is none
      return $$.isHiddenTargetWithYDomain(axisId) ? scale[axisId].domain() : axisId === "y2" ? scale.y.domain() : // When all data bounds to y2, y Axis domain is called prior y2.
      // So, it needs to call to get y2 domain here
      $$.getYDomain(targets, "y2", xDomain);
    var yMin = config[pfx + "_min"],
        yMax = config[pfx + "_max"],
        yDomainMin = $$.getYDomainMin(yTargets),
        yDomainMax = $$.getYDomainMax(yTargets),
        center = config[pfx + "_center"],
        isZeroBased = [TYPE.BAR, TYPE.BUBBLE, TYPE.SCATTER].concat(TYPE_BY_CATEGORY.Line).some(function (v) {
      var type = v.indexOf("area") > -1 ? "area" : v;
      return $$.hasType(v, yTargets) && config[type + "_zerobased"];
    }),
        isInverted = config[pfx + "_inverted"],
        showHorizontalDataLabel = $$.hasDataLabel() && config.axis_rotated,
        showVerticalDataLabel = $$.hasDataLabel() && !config.axis_rotated;
    yDomainMin = isValue(yMin) ? yMin : isValue(yMax) ? yDomainMin < yMax ? yDomainMin : yMax - 10 : yDomainMin, yDomainMax = isValue(yMax) ? yMax : isValue(yMin) ? yMin < yDomainMax ? yDomainMax : yMin + 10 : yDomainMax, isNaN(yDomainMin) && (yDomainMin = 0), isNaN(yDomainMax) && (yDomainMax = yDomainMin), yDomainMin === yDomainMax && (yDomainMin < 0 ? yDomainMax = 0 : yDomainMin = 0);
    var isAllPositive = yDomainMin >= 0 && yDomainMax >= 0,
        isAllNegative = yDomainMin <= 0 && yDomainMax <= 0;
    (isValue(yMin) && isAllPositive || isValue(yMax) && isAllNegative) && (isZeroBased = !1), isZeroBased && (isAllPositive && (yDomainMin = 0), isAllNegative && (yDomainMax = 0));
    var domainLength = Math.abs(yDomainMax - yDomainMin),
        padding = {
      top: domainLength * .1,
      bottom: domainLength * .1
    };

    if (isDefined(center)) {
      var yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));
      yDomainMax = center + yDomainAbs, yDomainMin = center - yDomainAbs;
    } // add padding for data label


    if (showHorizontalDataLabel) {
      var diff = diffDomain(scale.y.range()),
          ratio = $$.getDataLabelLength(yDomainMin, yDomainMax, "width").map(function (v) {
        return v / diff;
      });
      ["bottom", "top"].forEach(function (v, i) {
        padding[v] += domainLength * (ratio[i] / (1 - ratio[0] - ratio[1]));
      });
    } else if (showVerticalDataLabel) {
      var lengths = $$.getDataLabelLength(yDomainMin, yDomainMax, "height");
      ["bottom", "top"].forEach(function (v, i) {
        padding[v] += axis.convertPixelsToAxisPadding(lengths[i], domainLength);
      });
    } // if padding is set, the domain will be updated relative the current domain value
    // ex) $$.height=300, padding.top=150, domainLength=4  --> domain=6


    var p = config[pfx + "_padding"];
    notEmpty(p) && ["bottom", "top"].forEach(function (v) {
      padding[v] = axis.getPadding(p, v, padding[v], domainLength);
    }), isZeroBased && (isAllPositive && (padding.bottom = yDomainMin), isAllNegative && (padding.top = -yDomainMax));
    var domain = isLog ? [yDomainMin, yDomainMax].map(function (v) {
      return v < 0 ? 0 : v;
    }) : [yDomainMin - padding.bottom, yDomainMax + padding.top];
    return isInverted ? domain.reverse() : domain;
  },
  getXDomainMinMax: function getXDomainMinMax(targets, type) {
    var $$ = this,
        configValue = $$.config["axis_x_" + type],
        dataValue = getMinMax(type, targets.map(function (t) {
      return getMinMax(type, t.values.map(function (v) {
        return v.x;
      }));
    })),
        value = isObject(configValue) ? configValue.value : configValue;
    return value = isDefined(value) && $$.axis.isTimeSeries() ? parseDate.bind(this)(value) : value, isObject(configValue) && configValue.fit && (type === "min" && value < dataValue || type === "max" && value > dataValue) && (value = undefined), isDefined(value) ? value : dataValue;
  },
  getXDomainMin: function getXDomainMin(targets) {
    return this.getXDomainMinMax(targets, "min");
  },
  getXDomainMax: function getXDomainMax(targets) {
    return this.getXDomainMinMax(targets, "max");
  },
  getXDomainPadding: function getXDomainPadding(domain) {
    var maxDataCount,
        padding,
        $$ = this,
        axis = $$.axis,
        config = $$.config,
        diff = domain[1] - domain[0],
        xPadding = config.axis_x_padding;
    axis.isCategorized() ? padding = 0 : $$.hasType("bar") ? (maxDataCount = $$.getMaxDataCount(), padding = maxDataCount > 1 ? diff / (maxDataCount - 1) / 2 : .5) : padding = diff * .01;
    var left = padding,
        right = padding;
    return isObject(xPadding) && notEmpty(xPadding) ? (left = isValue(xPadding.left) ? xPadding.left : padding, right = isValue(xPadding.right) ? xPadding.right : padding) : isNumber(config.axis_x_padding) && (left = xPadding, right = xPadding), {
      left: left,
      right: right
    };
  },
  getXDomain: function getXDomain(targets) {
    var $$ = this,
        isLog = $$.scale.x.type === "log",
        xDomain = [$$.getXDomainMin(targets), $$.getXDomainMax(targets)],
        min = 0,
        max = 0;
    if (isLog) min = xDomain[0], max = xDomain[1];else {
      var isCategorized = $$.axis.isCategorized(),
          isTimeSeries = $$.axis.isTimeSeries(),
          padding = $$.getXDomainPadding(xDomain),
          _xDomain = xDomain,
          firstX = _xDomain[0],
          lastX = _xDomain[1];
      firstX - lastX !== 0 || isCategorized || (isTimeSeries ? (firstX = new Date(firstX.getTime() * .5), lastX = new Date(lastX.getTime() * 1.5)) : (firstX = firstX === 0 ? 1 : firstX * .5, lastX = lastX === 0 ? -1 : lastX * 1.5)), (firstX || firstX === 0) && (min = isTimeSeries ? new Date(firstX.getTime() - padding.left) : firstX - padding.left), (lastX || lastX === 0) && (max = isTimeSeries ? new Date(lastX.getTime() + padding.right) : lastX + padding.right);
    }
    return [min, max];
  },
  updateXDomain: function updateXDomain(targets, withUpdateXDomain, withUpdateOrgXDomain, withTrim, domain) {
    var $$ = this,
        config = $$.config,
        org = $$.org,
        _$$$scale = $$.scale,
        x = _$$$scale.x,
        subX = _$$$scale.subX,
        zoomEnabled = config.zoom_enabled;

    if (withUpdateOrgXDomain && (x.domain(domain || sortValue($$.getXDomain(targets))), org.xDomain = x.domain(), zoomEnabled && $$.zoom.updateScaleExtent(), subX.domain(x.domain()), $$.brush && $$.brush.scale(subX)), withUpdateXDomain) {
      var domainValue = domain || !$$.brush || brushEmpty($$) ? org.xDomain : getBrushSelection($$).map(subX.invert);
      x.domain(domainValue), zoomEnabled && $$.zoom.updateScaleExtent();
    } // Trim domain when too big by zoom mousemove event


    return withTrim && x.domain($$.trimXDomain(x.orgDomain())), x.domain();
  },
  trimXDomain: function trimXDomain(domain) {
    var zoomDomain = this.getZoomDomain(),
        min = zoomDomain[0],
        max = zoomDomain[1];
    return domain[0] <= min && (domain[1] = +domain[1] + (min - domain[0]), domain[0] = min), max <= domain[1] && (domain[0] = +domain[0] - (domain[1] - max), domain[1] = max), domain;
  },

  /**
   * Get zoom domain
   * @returns {Array} zoom domain
   * @private
   */
  getZoomDomain: function getZoomDomain() {
    var $$ = this,
        config = $$.config,
        org = $$.org,
        _org$xDomain = org.xDomain,
        min = _org$xDomain[0],
        max = _org$xDomain[1];
    return isDefined(config.zoom_x_min) && (min = getMinMax("min", [min, config.zoom_x_min])), isDefined(config.zoom_x_max) && (max = getMinMax("max", [max, config.zoom_x_max])), [min, max];
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/format.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Get formatted
 * @param {object} $$ Context
 * @param {string} typeValue Axis type
 * @param {number} v Value to be formatted
 * @returns {number | string}
 * @private
 */
function getFormat($$, typeValue, v) {
  var config = $$.config,
      type = "axis_" + typeValue + "_tick_format",
      format = config[type] ? config[type] : $$.defaultValueFormat;
  return format(v);
}

/* harmony default export */ var format = ({
  yFormat: function yFormat(v) {
    return getFormat(this, "y", v);
  },
  y2Format: function y2Format(v) {
    return getFormat(this, "y2", v);
  },

  /**
   * Get default value format function
   * @returns {Function} formatter function
   * @private
   */
  getDefaultValueFormat: function getDefaultValueFormat() {
    var $$ = this,
        hasArc = $$.hasArcType();
    return hasArc && !$$.hasType("gauge") ? $$.defaultArcValueFormat : $$.defaultValueFormat;
  },
  defaultValueFormat: function defaultValueFormat(v) {
    return isValue(v) ? +v : "";
  },
  defaultArcValueFormat: function defaultArcValueFormat(v, ratio) {
    return (ratio * 100).toFixed(1) + "%";
  },
  dataLabelFormat: function dataLabelFormat(targetId) {
    var $$ = this,
        dataLabels = $$.config.data_labels,
        defaultFormat = function (v) {
      return isValue(v) ? +v : "";
    },
        format = defaultFormat;

    return isFunction(dataLabels.format) ? format = dataLabels.format : isObjectType(dataLabels.format) && (dataLabels.format[targetId] ? format = dataLabels.format[targetId] === !0 ? defaultFormat : dataLabels.format[targetId] : format = function () {
      return "";
    }), format.bind($$.api);
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/legend.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */





/* harmony default export */ var internals_legend = ({
  /**
   * Initialize the legend.
   * @private
   */
  initLegend: function initLegend() {
    var $$ = this,
        config = $$.config,
        $el = $$.$el;
    $$.legendItemTextBox = {}, $$.state.legendHasRendered = !1, config.legend_show ? (!config.legend_contents_bindto && ($el.legend = $$.$el.svg.append("g").classed(config_classes.legend, !0).attr("transform", $$.getTranslate("legend"))), $$.updateLegend()) : $$.state.hiddenLegendIds = $$.mapToIds($$.data.targets);
  },

  /**
   * Update legend element
   * @param {Array} targetIds ID's of target
   * @param {object} options withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
   * @param {object} transitions Return value of the generateTransitions
   * @private
   */
  updateLegend: function updateLegend(targetIds, options, transitions) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        scale = $$.scale,
        $el = $$.$el,
        optionz = options || {
      withTransform: !1,
      withTransitionForTransform: !1,
      withTransition: !1
    };
    // toggle legend state
    // Update size and scale
    // Update g positions
    optionz.withTransition = getOption(optionz, "withTransition", !0), optionz.withTransitionForTransform = getOption(optionz, "withTransitionForTransform", !0), config.legend_contents_bindto && config.legend_contents_template ? $$.updateLegendTemplate() : $$.updateLegendElement(targetIds || $$.mapToIds($$.data.targets), optionz, transitions), $el.legend.selectAll("." + config_classes.legendItem).classed(config_classes.legendItemHidden, function (id) {
      var hide = !$$.isTargetToShow(id);
      return hide && (this.style.opacity = null), hide;
    }), $$.updateScales(!1, !scale.zoom), $$.updateSvgSize(), $$.transformAll(optionz.withTransitionForTransform, transitions), state.legendHasRendered = !0;
  },

  /**
   * Update legend using template option
   * @private
   */
  updateLegendTemplate: function updateLegendTemplate() {
    var $$ = this,
        config = $$.config,
        $el = $$.$el,
        wrapper = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(config.legend_contents_bindto),
        template = config.legend_contents_template;

    if (!wrapper.empty()) {
      var targets = $$.mapToIds($$.data.targets),
          ids = [],
          html = "";
      targets.forEach(function (v) {
        var content = isFunction(template) ? template.bind($$.api)(v, $$.color(v), $$.api.data(v)[0].values) : tplProcess(template, {
          COLOR: $$.color(v),
          TITLE: v
        });
        content && (ids.push(v), html += content);
      });
      var legendItem = wrapper.html(html).selectAll(function () {
        return this.childNodes;
      }).data(ids);
      $$.setLegendItem(legendItem), $el.legend = wrapper;
    }
  },

  /**
   * Update the size of the legend.
   * @param {Obejct} size Size object
   * @private
   */
  updateSizeForLegend: function updateSizeForLegend(size) {
    var $$ = this,
        config = $$.config,
        _$$$state = $$.state,
        isLegendTop = _$$$state.isLegendTop,
        isLegendLeft = _$$$state.isLegendLeft,
        isLegendRight = _$$$state.isLegendRight,
        isLegendInset = _$$$state.isLegendInset,
        current = _$$$state.current,
        width = size.width,
        height = size.height,
        insetLegendPosition = {
      top: isLegendTop ? $$.getCurrentPaddingTop() + config.legend_inset_y + 5.5 : current.height - height - $$.getCurrentPaddingBottom() - config.legend_inset_y,
      left: isLegendLeft ? $$.getCurrentPaddingLeft() + config.legend_inset_x + .5 : current.width - width - $$.getCurrentPaddingRight() - config.legend_inset_x + .5
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
  transformLegend: function transformLegend(withTransition) {
    var $$ = this,
        legend = $$.$el.legend;
    (withTransition ? legend.transition() : legend).attr("transform", $$.getTranslate("legend"));
  },

  /**
   * Update the legend step
   * @param {number} step Step value
   * @private
   */
  updateLegendStep: function updateLegendStep(step) {
    this.state.legendStep = step;
  },

  /**
   * Update legend item width
   * @param {number} width Width value
   * @private
   */
  updateLegendItemWidth: function updateLegendItemWidth(width) {
    this.state.legendItemWidth = width;
  },

  /**
   * Update legend item height
   * @param {number} height Height value
   * @private
   */
  updateLegendItemHeight: function updateLegendItemHeight(height) {
    this.state.legendItemHeight = height;
  },

  /**
   * Update legend item color
   * @param {string} id Corresponding data ID value
   * @param {string} color Color value
   * @private
   */
  updateLegendItemColor: function updateLegendItemColor(id, color) {
    var legend = this.$el.legend;
    legend && legend.select("." + config_classes.legendItem + "-" + id + " line").style("stroke", color);
  },

  /**
   * Get the width of the legend
   * @returns {number} width
   * @private
   */
  getLegendWidth: function getLegendWidth() {
    var $$ = this,
        _$$$state2 = $$.state,
        width = _$$$state2.current.width,
        isLegendRight = _$$$state2.isLegendRight,
        isLegendInset = _$$$state2.isLegendInset,
        legendItemWidth = _$$$state2.legendItemWidth,
        legendStep = _$$$state2.legendStep;
    return $$.config.legend_show ? isLegendRight || isLegendInset ? legendItemWidth * (legendStep + 1) : width : 0;
  },

  /**
   * Get the height of the legend
   * @returns {number} height
   * @private
   */
  getLegendHeight: function getLegendHeight() {
    var $$ = this,
        _$$$state3 = $$.state,
        current = _$$$state3.current,
        isLegendRight = _$$$state3.isLegendRight,
        legendItemHeight = _$$$state3.legendItemHeight,
        legendStep = _$$$state3.legendStep;
    return $$.config.legend_show ? isLegendRight ? current.height : Math.max(20, legendItemHeight) * (legendStep + 1) : 0;
  },

  /**
   * Get the opacity of the legend that is unfocused
   * @param {d3.selection} legendItem Legend item node
   * @returns {string|null} opacity
   * @private
   */
  opacityForUnfocusedLegend: function opacityForUnfocusedLegend(legendItem) {
    return legendItem.classed(config_classes.legendItemHidden) ? null : "0.3";
  },

  /**
   * Toggles the focus of the legend
   * @param {Array} targetIds ID's of target
   * @param {boolean} focus whether or not to focus.
   * @private
   */
  toggleFocusLegend: function toggleFocusLegend(targetIds, focus) {
    var $$ = this,
        legend = $$.$el.legend,
        targetIdz = $$.mapToTargetIds(targetIds);
    legend && legend.selectAll("." + config_classes.legendItem).filter(function (id) {
      return targetIdz.indexOf(id) >= 0;
    }).classed(config_classes.legendItemFocused, focus).transition().duration(100).style("opacity", function () {
      return focus ? null : $$.opacityForUnfocusedLegend.call($$, (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this));
    });
  },

  /**
   * Revert the legend to its default state
   * @private
   */
  revertLegend: function revertLegend() {
    var $$ = this,
        legend = $$.$el.legend;
    legend && legend.selectAll("." + config_classes.legendItem).classed(config_classes.legendItemFocused, !1).transition().duration(100).style("opacity", null);
  },

  /**
   * Shows the legend
   * @param {Array} targetIds ID's of target
   * @private
   */
  showLegend: function showLegend(targetIds) {
    var $$ = this,
        config = $$.config,
        $el = $$.$el;
    config.legend_show || (config.legend_show = !0, $el.legend ? $el.legend.style("visibility", null) : $$.initLegend(), !$$.state.legendHasRendered && $$.updateLegend()), $$.removeHiddenLegendIds(targetIds), $el.legend.selectAll($$.selectorLegends(targetIds)).style("visibility", null).transition().style("opacity", null);
  },

  /**
   * Hide the legend
   * @param {Array} targetIds ID's of target
   * @private
   */
  hideLegend: function hideLegend(targetIds) {
    var $$ = this,
        config = $$.config,
        legend = $$.$el.legend;
    config.legend_show && isEmpty(targetIds) && (config.legend_show = !1, legend.style("visibility", "hidden")), $$.addHiddenLegendIds(targetIds), legend.selectAll($$.selectorLegends(targetIds)).style("opacity", "0").style("visibility", "hidden");
  },

  /**
   * Get legend item textbox dimension
   * @param {string} id Data ID
   * @param {HTMLElement|d3.selection} textElement Text node element
   * @returns {object} Bounding rect
   * @private
   */
  getLegendItemTextBox: function getLegendItemTextBox(id, textElement) {
    var data,
        $$ = this,
        cache = $$.cache,
        state = $$.state,
        cacheKey = KEY.legendItemTextBox;
    return id && (data = !state.redrawing && cache.get(cacheKey) || {}, !data[id] && (data[id] = $$.getTextRect(textElement, config_classes.legendItem), cache.add(cacheKey, data)), data = data[id]), data;
  },

  /**
   * Set legend item style & bind events
   * @param {d3.selection} item Item node
   * @private
   */
  setLegendItem: function setLegendItem(item) {
    var $$ = this,
        api = $$.api,
        config = $$.config,
        state = $$.state,
        isTouch = state.inputType === "touch",
        hasGauge = $$.hasType("gauge");
    item.attr("class", function (id) {
      var node = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
          itemClass = !node.empty() && node.attr("class") || "";
      return itemClass + $$.generateClass(config_classes.legendItem, id);
    }).style("visibility", function (id) {
      return $$.isLegendToShow(id) ? null : "hidden";
    }), config.interaction_enabled && (item.style("cursor", "pointer").on("click", function (event, id) {
      callFn(config.legend_item_onclick, api, id) || (event.altKey ? (api.hide(), api.show(id)) : (api.toggle(id), (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed(config_classes.legendItemFocused, !1))), isTouch && $$.hideTooltip();
    }), !isTouch && item.on("mouseout", function (event, id) {
      callFn(config.legend_item_onout, api, id) || ((0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed(config_classes.legendItemFocused, !1), hasGauge && $$.undoMarkOverlapped($$, "." + config_classes.gaugeValue), $$.api.revert());
    }).on("mouseover", function (event, id) {
      callFn(config.legend_item_onover, api, id) || ((0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed(config_classes.legendItemFocused, !0), hasGauge && $$.markOverlapped(id, $$, "." + config_classes.gaugeValue), !state.transiting && $$.isTargetToShow(id) && api.focus(id));
    }));
  },

  /**
   * Update the legend
   * @param {Array} targetIds ID's of target
   * @param {object} options withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
   * @private
   */
  updateLegendElement: function updateLegendElement(targetIds, options) {
    var xForLegend,
        yForLegend,
        background,
        $$ = this,
        config = $$.config,
        state = $$.state,
        legend = $$.$el.legend,
        posMin = 10,
        tileWidth = config.legend_item_tile_width + 5,
        maxWidth = 0,
        maxHeight = 0,
        totalLength = 0,
        offsets = {},
        widths = {},
        heights = {},
        margins = [0],
        steps = {},
        step = 0,
        isLegendRightOrInset = state.isLegendRight || state.isLegendInset,
        targetIdz = targetIds.filter(function (id) {
      return !isDefined(config.data_names[id]) || config.data_names[id] !== null;
    }),
        withTransition = options.withTransition,
        updatePositions = function (textElement, id, index) {
      var margin,
          isLast = index === targetIdz.length - 1,
          box = $$.getLegendItemTextBox(id, textElement),
          itemWidth = box.width + tileWidth + (isLast && !isLegendRightOrInset ? 0 : 10) + config.legend_padding,
          itemHeight = box.height + 4,
          itemLength = isLegendRightOrInset ? itemHeight : itemWidth,
          areaLength = isLegendRightOrInset ? $$.getLegendHeight() : $$.getLegendWidth(),
          updateValues = function (id2, withoutStep) {
        withoutStep || (margin = (areaLength - totalLength - itemLength) / 2, margin < posMin && (margin = (areaLength - itemLength) / 2, totalLength = 0, step++)), steps[id2] = step, margins[step] = state.isLegendInset ? 10 : margin, offsets[id2] = totalLength, totalLength += itemLength;
      };

      if (index === 0 && (totalLength = 0, step = 0, maxWidth = 0, maxHeight = 0), config.legend_show && !$$.isLegendToShow(id)) return widths[id] = 0, heights[id] = 0, steps[id] = 0, void (offsets[id] = 0);
      widths[id] = itemWidth, heights[id] = itemHeight, (!maxWidth || itemWidth >= maxWidth) && (maxWidth = itemWidth), (!maxHeight || itemHeight >= maxHeight) && (maxHeight = itemHeight);
      var maxLength = isLegendRightOrInset ? maxHeight : maxWidth;
      config.legend_equally ? (Object.keys(widths).forEach(function (id2) {
        return widths[id2] = maxWidth;
      }), Object.keys(heights).forEach(function (id2) {
        return heights[id2] = maxHeight;
      }), margin = (areaLength - maxLength * targetIdz.length) / 2, margin < posMin ? (totalLength = 0, step = 0, targetIdz.forEach(function (id2) {
        return updateValues(id2);
      })) : updateValues(id, !0)) : updateValues(id);
    };

    state.isLegendInset && (step = config.legend_inset_step ? config.legend_inset_step : targetIdz.length, $$.updateLegendStep(step)), state.isLegendRight ? (xForLegend = function (id) {
      return maxWidth * steps[id];
    }, yForLegend = function (id) {
      return margins[steps[id]] + offsets[id];
    }) : state.isLegendInset ? (xForLegend = function (id) {
      return maxWidth * steps[id] + 10;
    }, yForLegend = function (id) {
      return margins[steps[id]] + offsets[id];
    }) : (xForLegend = function (id) {
      return margins[steps[id]] + offsets[id];
    }, yForLegend = function (id) {
      return maxHeight * steps[id];
    });

    var xForLegendText = function (id, i) {
      return xForLegend(id, i) + 4 + config.legend_item_tile_width;
    },
        xForLegendRect = function (id, i) {
      return xForLegend(id, i);
    },
        x1ForLegendTile = function (id, i) {
      return xForLegend(id, i) - 2;
    },
        x2ForLegendTile = function (id, i) {
      return xForLegend(id, i) - 2 + config.legend_item_tile_width;
    },
        yForLegendText = function (id, i) {
      return yForLegend(id, i) + 9;
    },
        yForLegendRect = function (id, i) {
      return yForLegend(id, i) - 5;
    },
        yForLegendTile = function (id, i) {
      return yForLegend(id, i) + 4;
    },
        pos = -200,
        l = legend.selectAll("." + config_classes.legendItem).data(targetIdz).enter().append("g");

    $$.setLegendItem(l), l.append("text").text(function (id) {
      return isDefined(config.data_names[id]) ? config.data_names[id] : id;
    }).each(function (id, i) {
      updatePositions(this, id, i);
    }).style("pointer-events", "none").attr("x", isLegendRightOrInset ? xForLegendText : pos).attr("y", isLegendRightOrInset ? pos : yForLegendText), l.append("rect").attr("class", config_classes.legendItemEvent).style("fill-opacity", "0").attr("x", isLegendRightOrInset ? xForLegendRect : pos).attr("y", isLegendRightOrInset ? pos : yForLegendRect);

    var getColor = function (id) {
      var data = $$.getDataById(id);
      return $$.levelColor ? $$.levelColor(data.values[0].value) : $$.color(data);
    },
        usePoint = config.legend_usePoint;

    if (usePoint) {
      var ids = [];
      l.append(function (d) {
        var pattern = notEmpty(config.point_pattern) ? config.point_pattern : [config.point_type];
        ids.indexOf(d) === -1 && ids.push(d);
        var point = pattern[ids.indexOf(d) % pattern.length];
        return point === "rectangle" && (point = "rect"), browser_doc.createElementNS(external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.namespaces.svg, "hasValidPointType" in $$ && $$.hasValidPointType(point) ? point : "use");
      }).attr("class", config_classes.legendItemPoint).style("fill", getColor).style("pointer-events", "none").attr("href", function (data, idx, selection) {
        var node = selection[idx],
            nodeName = node.nodeName.toLowerCase();
        return nodeName === "use" ? "#" + state.datetimeId + "-point-" + data : undefined;
      });
    } else l.append("line").attr("class", config_classes.legendItemTile).style("stroke", getColor).style("pointer-events", "none").attr("x1", isLegendRightOrInset ? x1ForLegendTile : pos).attr("y1", isLegendRightOrInset ? pos : yForLegendTile).attr("x2", isLegendRightOrInset ? x2ForLegendTile : pos).attr("y2", isLegendRightOrInset ? pos : yForLegendTile).attr("stroke-width", config.legend_item_tile_height); // Set background for inset legend


    background = legend.select("." + config_classes.legendBackground + " rect"), state.isLegendInset && maxWidth > 0 && background.size() === 0 && (background = legend.insert("g", "." + config_classes.legendItem).attr("class", config_classes.legendBackground).append("rect"));
    var texts = legend.selectAll("text").data(targetIdz).text(function (id) {
      return isDefined(config.data_names[id]) ? config.data_names[id] : id;
    }) // MEMO: needed for update
    .each(function (id, i) {
      updatePositions(this, id, i);
    });
    (withTransition ? texts.transition() : texts).attr("x", xForLegendText).attr("y", yForLegendText);
    var rects = legend.selectAll("rect." + config_classes.legendItemEvent).data(targetIdz);

    if ((withTransition ? rects.transition() : rects).attr("width", function (id) {
      return widths[id];
    }).attr("height", function (id) {
      return heights[id];
    }).attr("x", xForLegendRect).attr("y", yForLegendRect), usePoint) {
      var tiles = legend.selectAll("." + config_classes.legendItemPoint).data(targetIdz);
      (withTransition ? tiles.transition() : tiles).each(function () {
        var radius,
            width,
            height,
            nodeName = this.nodeName.toLowerCase(),
            pointR = config.point_r,
            x = "x",
            y = "y",
            xOffset = 2,
            yOffset = 2.5;

        if (nodeName === "circle") {
          var size = pointR * .2;
          x = "cx", y = "cy", radius = pointR + size, xOffset = pointR * 2, yOffset = -size;
        } else if (nodeName === "rect") {
          var _size = pointR * 2.5;

          width = _size, height = _size, yOffset = 3;
        }

        (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).attr(x, function (d) {
          return x1ForLegendTile(d) + xOffset;
        }).attr(y, function (d) {
          return yForLegendTile(d) - yOffset;
        }).attr("r", radius).attr("width", width).attr("height", height);
      });
    } else {
      var _tiles = legend.selectAll("line." + config_classes.legendItemTile).data(targetIdz);

      (withTransition ? _tiles.transition() : _tiles).style("stroke", getColor).attr("x1", x1ForLegendTile).attr("y1", yForLegendTile).attr("x2", x2ForLegendTile).attr("y2", yForLegendTile);
    }

    background && (withTransition ? background.transition() : background).attr("height", $$.getLegendHeight() - 12).attr("width", maxWidth * (step + 1) + 10), $$.updateLegendItemWidth(maxWidth), $$.updateLegendItemHeight(maxHeight), $$.updateLegendStep(step);
  }
});
// EXTERNAL MODULE: external {"commonjs":"d3-transition","commonjs2":"d3-transition","amd":"d3-transition","root":"d3"}
var external_commonjs_d3_transition_commonjs2_d3_transition_amd_d3_transition_root_d3_ = __webpack_require__(8);
;// CONCATENATED MODULE: ./src/ChartInternal/internals/redraw.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/* harmony default export */ var redraw = ({
  redraw: function redraw(options) {
    options === void 0 && (options = {});
    var $$ = this,
        config = $$.config,
        state = $$.state,
        $el = $$.$el,
        main = $el.main;
    state.redrawing = !0;
    var targetsToShow = $$.filterTargetsToShow($$.data.targets),
        initializing = options.initializing,
        flow = options.flow,
        wth = $$.getWithOption(options),
        duration = wth.Transition ? config.transition_duration : 0,
        durationForExit = wth.TransitionForExit ? duration : 0,
        durationForAxis = wth.TransitionForAxis ? duration : 0,
        transitions = $$.axis && $$.axis.generateTransitions(durationForAxis);
    // text
    // title
    $$.updateSizes(initializing), wth.Legend && config.legend_show ? (options.withTransition = !!duration, $$.updateLegend($$.mapToIds($$.data.targets), options, transitions)) : wth.Dimension && $$.updateDimension(!0), (!$$.hasArcType() || state.hasRadar) && $$.updateCircleY && ($$.circleY = $$.updateCircleY()), state.hasAxis ? ($$.axis.redrawAxis(targetsToShow, wth, transitions, flow, initializing), config.data_empty_label_text && main.select("text." + config_classes.text + "." + config_classes.empty).attr("x", state.width / 2).attr("y", state.height / 2).text(config.data_empty_label_text).style("display", targetsToShow.length ? "none" : null), $$.hasGrid() && $$.updateGrid(duration), config.regions.length && $$.updateRegion(duration), ["bar", "candlestick", "line", "area"].forEach(function (v) {
      var name = capitalize(v);
      (/^(line|area)$/.test(v) && $$.hasTypeOf(name) || $$.hasType(v)) && $$["update" + name](durationForExit);
    }), $el.text && main.selectAll("." + config_classes.selectedCircles).filter($$.isBarType.bind($$)).selectAll("circle").remove(), config.interaction_enabled && !flow && wth.EventRect && ($$.redrawEventRect(), $$.bindZoomEvent && $$.bindZoomEvent())) : ($el.arcs && $$.redrawArc(duration, durationForExit, wth.Transform), $el.radar && $$.redrawRadar(durationForExit)), !state.resizing && ($$.hasPointType() || state.hasRadar) && $$.updateCircle(), $$.hasDataLabel() && !$$.hasArcType(null, ["radar"]) && $$.updateText(durationForExit), $$.redrawTitle && $$.redrawTitle(), initializing && $$.updateTypesElements(), $$.generateRedrawList(targetsToShow, flow, duration, wth.Subchart), $$.callPluginHook("$redraw", options, duration);
  },

  /**
   * Generate redraw list
   * @param {object} targets targets data to be shown
   * @param {object} flow flow object
   * @param {number} duration duration value
   * @param {boolean} withSubchart whether or not to show subchart
   * @private
   */
  generateRedrawList: function generateRedrawList(targets, flow, duration, withSubchart) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        shape = $$.getDrawShape();
    state.hasAxis && config.subchart_show && $$.redrawSubchart(withSubchart, duration, shape);

    // generate flow
    var flowFn = flow && $$.generateFlow({
      targets: targets,
      flow: flow,
      duration: flow.duration,
      shape: shape,
      xv: $$.xv.bind($$)
    }),
        isTransition = (duration || flowFn) && isTabVisible(),
        redrawList = $$.getRedrawList(shape, flow, flowFn, isTransition),
        afterRedraw = function () {
      flowFn && flowFn(), state.redrawing = !1, callFn(config.onrendered, $$.api);
    };

    if (afterRedraw) // Only use transition when current tab is visible.
      if (isTransition && redrawList.length) {
        // Wait for end of transitions for callback
        var waitForDraw = generateWait(); // transition should be derived from one transition

        (0,external_commonjs_d3_transition_commonjs2_d3_transition_amd_d3_transition_root_d3_.transition)().duration(duration).each(function () {
          redrawList.reduce(function (acc, t1) {
            return acc.concat(t1);
          }, []).forEach(function (t) {
            return waitForDraw.add(t);
          });
        }).call(waitForDraw, afterRedraw);
      } else state.transiting || afterRedraw(); // update fadein condition

    $$.mapToIds($$.data.targets).forEach(function (id) {
      state.withoutFadeIn[id] = !0;
    });
  },
  getRedrawList: function getRedrawList(shape, flow, flowFn, isTransition) {
    var $$ = this,
        config = $$.config,
        _$$$state = $$.state,
        hasAxis = _$$$state.hasAxis,
        hasRadar = _$$$state.hasRadar,
        grid = $$.$el.grid,
        _shape$pos = shape.pos,
        cx = _shape$pos.cx,
        cy = _shape$pos.cy,
        xForText = _shape$pos.xForText,
        yForText = _shape$pos.yForText,
        list = [];
    return hasAxis && ((config.grid_x_lines.length || config.grid_y_lines.length) && list.push($$.redrawGrid(isTransition)), config.regions.length && list.push($$.redrawRegion(isTransition)), Object.keys(shape.type).forEach(function (v) {
      var name = capitalize(v),
          drawFn = shape.type[v];
      (/^(area|line)$/.test(v) && $$.hasTypeOf(name) || $$.hasType(v)) && list.push($$["redraw" + name](drawFn, isTransition));
    }), !flow && grid.main && list.push($$.updateGridFocus())), (!$$.hasArcType() || hasRadar) && notEmpty(config.data_labels) && config.data_labels !== !1 && list.push($$.redrawText(xForText, yForText, flow, isTransition)), ($$.hasPointType() || hasRadar) && !config.point_focus_only && $$.redrawCircle && list.push($$.redrawCircle(cx, cy, isTransition, flowFn)), list;
  },
  updateAndRedraw: function updateAndRedraw(options) {
    options === void 0 && (options = {});
    var transitions,
        $$ = this,
        config = $$.config,
        state = $$.state;
    // same with redraw
    // NOT same with redraw
    // Draw with new sizes & scales
    options.withTransition = getOption(options, "withTransition", !0), options.withTransform = getOption(options, "withTransform", !1), options.withLegend = getOption(options, "withLegend", !1), options.withUpdateXDomain = !0, options.withUpdateOrgXDomain = !0, options.withTransitionForExit = !1, options.withTransitionForTransform = getOption(options, "withTransitionForTransform", options.withTransition), options.withLegend && config.legend_show || (state.hasAxis && (transitions = $$.axis.generateTransitions(options.withTransitionForAxis ? config.transition_duration : 0)), $$.updateScales(), $$.updateSvgSize(), $$.transformAll(options.withTransitionForTransform, transitions)), $$.redraw(options, transitions);
  },
  redrawWithoutRescale: function redrawWithoutRescale() {
    this.redraw({
      withY: !1,
      withSubchart: !1,
      withEventRect: !1,
      withTransitionForAxis: !1
    });
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/scale.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



/**
 * Get scale
 * @param {string} [type='linear'] Scale type
 * @param {number} [min] Min range
 * @param {number} [max] Max range
 * @returns {d3.scaleLinear|d3.scaleTime} scale
 * @private
 */
function getScale(type, min, max) {
  type === void 0 && (type = "linear"), min === void 0 && (min = 0), max === void 0 && (max = 1);
  var scale = {
    linear: external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleLinear,
    log: external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleSymlog,
    _log: external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleLog,
    time: external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleTime,
    utc: external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_.scaleUtc
  }[type]();
  return scale.type = type, /_?log/.test(type) && scale.clamp(!0), scale.range([min, max]);
}
/* harmony default export */ var scale = ({
  /**
   * Get x Axis scale function
   * @param {number} min Min value
   * @param {number} max Max value
   * @param {Array} domain Domain value
   * @param {Function} offset The offset getter to be sum
   * @returns {Function} scale
   * @private
   */
  getXScale: function getXScale(min, max, domain, offset) {
    var $$ = this,
        scale = $$.scale.zoom || getScale($$.axis.getAxisType("x"), min, max);
    return $$.getCustomizedScale(domain ? scale.domain(domain) : scale, offset);
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
  getYScale: function getYScale(id, min, max, domain) {
    var $$ = this,
        scale = getScale($$.axis.getAxisType(id), min, max);
    return domain && scale.domain(domain), scale;
  },

  /**
   * Get y Axis scale
   * @param {string} id Axis id
   * @param {boolean} isSub Weather is sub Axis
   * @returns {Function} Scale function
   * @private
   */
  getYScaleById: function getYScaleById(id, isSub) {
    isSub === void 0 && (isSub = !1);
    var isY2 = this.axis.getId(id) === "y2",
        key = isSub ? isY2 ? "subY2" : "subY" : isY2 ? "y2" : "y";
    return this.scale[key];
  },

  /**
   * Get customized scale
   * @param {d3.scaleLinear|d3.scaleTime} scaleValue Scale function
   * @param {Function} offsetValue Offset getter to be sum
   * @returns {Function} Scale function
   * @private
   */
  getCustomizedScale: function getCustomizedScale(scaleValue, offsetValue) {
    var $$ = this,
        offset = offsetValue || function () {
      return $$.axis.x.tickOffset();
    },
        scale = function (d, raw) {
      var v = scaleValue(d) + offset();
      return raw ? v : Math.ceil(v);
    };

    // copy original scale methods
    for (var key in scaleValue) scale[key] = scaleValue[key];

    return scale.orgDomain = function () {
      return scaleValue.domain();
    }, scale.orgScale = function () {
      return scaleValue;
    }, $$.axis.isCategorized() && (scale.domain = function (domainValue) {
      var domain = domainValue;
      return arguments.length ? (scaleValue.domain(domain), scale) : (domain = this.orgDomain(), [domain[0], domain[1] + 1]);
    }), scale;
  },

  /**
   * Update scale
   * @param {boolean} isInit Param is given at the init rendering
   * @param {boolean} updateXDomain If update x domain
   * @private
   */
  updateScales: function updateScales(isInit, updateXDomain) {
    updateXDomain === void 0 && (updateXDomain = !0);
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        format = $$.format,
        org = $$.org,
        scale = $$.scale,
        _$$$state = $$.state,
        width = _$$$state.width,
        height = _$$$state.height,
        width2 = _$$$state.width2,
        height2 = _$$$state.height2,
        hasAxis = _$$$state.hasAxis;

    if (hasAxis) {
      var isRotated = config.axis_rotated,
          min = {
        x: isRotated ? 1 : 0,
        y: isRotated ? 0 : height,
        subX: isRotated ? 1 : 0,
        subY: isRotated ? 0 : height2
      },
          max = {
        x: isRotated ? height : width,
        y: isRotated ? width : 1,
        subX: isRotated ? height : width,
        subY: isRotated ? width2 : 1
      },
          xDomain = updateXDomain && scale.x && scale.x.orgDomain(),
          xSubDomain = updateXDomain && org.xDomain; // update edges

      // y Axis
      scale.x = $$.getXScale(min.x, max.x, xDomain, function () {
        return axis.x.tickOffset();
      }), scale.subX = $$.getXScale(min.x, max.x, xSubDomain, function (d) {
        return d % 1 ? 0 : axis.subX.tickOffset();
      }), format.xAxisTick = axis.getXAxisTickFormat(), axis.setAxis("x", scale.x, config.axis_x_tick_outer, isInit), config.subchart_show && axis.setAxis("subX", scale.subX, config.axis_x_tick_outer, isInit), scale.y = $$.getYScale("y", min.y, max.y, scale.y ? scale.y.domain() : config.axis_y_default), scale.subY = $$.getYScale("y", min.subY, max.subY, scale.subY ? scale.subY.domain() : config.axis_y_default), axis.setAxis("y", scale.y, config.axis_y_tick_outer, isInit), config.axis_y2_show && (scale.y2 = $$.getYScale("y2", min.y, max.y, scale.y2 ? scale.y2.domain() : config.axis_y2_default), scale.subY2 = $$.getYScale("y2", min.subY, max.subY, scale.subY2 ? scale.subY2.domain() : config.axis_y2_default), axis.setAxis("y2", scale.y2, config.axis_y2_tick_outer, isInit));
    } else // update for arc
    $$.updateArc && $$.updateArc();
  },

  /**
   * Get the zoom or unzoomed scaled value
   * @param {Date|number|object} d Data value
   * @returns {number|null}
   * @private
   */
  xx: function xx(d) {
    var $$ = this,
        config = $$.config,
        _$$$scale = $$.scale,
        x = _$$$scale.x,
        zoom = _$$$scale.zoom,
        fn = config.zoom_enabled && zoom ? zoom : x;
    return d ? fn(isValue(d.x) ? d.x : d) : null;
  },
  xv: function xv(d) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        _$$$scale2 = $$.scale,
        x = _$$$scale2.x,
        zoom = _$$$scale2.zoom,
        fn = config.zoom_enabled && zoom ? zoom : x,
        value = $$.getBaseValue(d);
    return axis.isTimeSeries() ? value = parseDate.call($$, value) : axis.isCategorized() && isString(value) && (value = config.axis_x_categories.indexOf(value)), Math.ceil(fn(value));
  },
  yv: function yv(d) {
    var $$ = this,
        _$$$scale3 = $$.scale,
        y = _$$$scale3.y,
        y2 = _$$$scale3.y2,
        yScale = d.axis && d.axis === "y2" ? y2 : y;
    return Math.ceil(yScale($$.getBaseValue(d)));
  },
  subxx: function subxx(d) {
    return d ? this.scale.subX(d.x) : null;
  }
});
// EXTERNAL MODULE: external {"commonjs":"d3-shape","commonjs2":"d3-shape","amd":"d3-shape","root":"d3"}
var external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_ = __webpack_require__(9);
;// CONCATENATED MODULE: ./src/ChartInternal/shape/shape.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/* harmony default export */ var shape = ({
  /**
   * Get the shape draw function
   * @returns {object}
   * @private
   */
  getDrawShape: function getDrawShape() {
    var $$ = this,
        isRotated = $$.config.axis_rotated,
        hasRadar = $$.state.hasRadar,
        shape = {
      type: {},
      indices: {},
      pos: {}
    };

    if (["bar", "candlestick", "line", "area"].forEach(function (v) {
      var name = capitalize(/^(bubble|scatter)$/.test(v) ? "line" : v);

      if ($$.hasType(v) || $$.hasTypeOf(name) || v === "line" && ($$.hasType("bubble") || $$.hasType("scatter"))) {
        var indices = $$.getShapeIndices($$["is" + name + "Type"]),
            drawFn = $$["generateDraw" + name];
        shape.indices[v] = indices, shape.type[v] = drawFn ? drawFn.bind($$)(indices, !1) : undefined;
      }
    }), !$$.hasArcType() || hasRadar) {
      // generate circle x/y functions depending on updated params
      var cx = hasRadar ? $$.radarCircleX : isRotated ? $$.circleY : $$.circleX,
          cy = hasRadar ? $$.radarCircleY : isRotated ? $$.circleX : $$.circleY;
      shape.pos = {
        xForText: $$.generateXYForText(shape.indices, !0),
        yForText: $$.generateXYForText(shape.indices, !1),
        cx: (cx || function () {}).bind($$),
        cy: (cy || function () {}).bind($$)
      };
    }

    return shape;
  },
  getShapeIndices: function getShapeIndices(typeFilter) {
    var $$ = this,
        config = $$.config,
        xs = config.data_xs,
        hasXs = notEmpty(xs),
        indices = {},
        i = hasXs ? {} : 0;
    return hasXs && getUnique(Object.keys(xs).map(function (v) {
      return xs[v];
    })).forEach(function (v) {
      i[v] = 0, indices[v] = {};
    }), $$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$)).forEach(function (d) {
      for (var groups, xKey = (d.id in xs) ? xs[d.id] : "", ind = xKey ? indices[xKey] : indices, j = 0; groups = config.data_groups[j]; j++) if (!(groups.indexOf(d.id) < 0)) for (var _row4, _k4 = 0; _row4 = groups[_k4]; _k4++) if (_row4 in ind) {
        ind[d.id] = ind[_row4];
        break;
      }

      isUndefined(ind[d.id]) && (ind[d.id] = xKey ? i[xKey]++ : i++, ind.__max__ = (xKey ? i[xKey] : i) - 1);
    }), indices;
  },

  /**
   * Get indices value based on data ID value
   * @param {object} indices Indices object
   * @param {string} id Data id value
   * @returns {object} Indices object
   * @private
   */
  getIndices: function getIndices(indices, id) {
    var xs = this.config.data_xs;
    return notEmpty(xs) ? indices[xs[id]] : indices;
  },

  /**
   * Get indices max number
   * @param {object} indices Indices object
   * @returns {number} Max number
   * @private
   */
  getIndicesMax: function getIndicesMax(indices) {
    return notEmpty(this.config.data_xs) ? // if is multiple xs, return total sum of xs' __max__ value
    Object.keys(indices).map(function (v) {
      return indices[v].__max__ || 0;
    }).reduce(function (acc, curr) {
      return acc + curr;
    }) : indices.__max__;
  },
  getShapeX: function getShapeX(offset, indices, isSub) {
    var $$ = this,
        config = $$.config,
        scale = $$.scale,
        currScale = isSub ? scale.subX : scale.zoom || scale.x,
        barPadding = config.bar_padding,
        sum = function (p, c) {
      return p + c;
    },
        halfWidth = isObjectType(offset) && (offset._$total.length ? offset._$total.reduce(sum) / 2 : 0);

    return function (d) {
      var ind = $$.getIndices(indices, d.id),
          index = d.id in ind ? ind[d.id] : 0,
          targetsNum = (ind.__max__ || 0) + 1,
          x = 0;

      if (notEmpty(d.x)) {
        var xPos = currScale(d.x, !0);
        x = halfWidth ? xPos - (offset[d.id] || offset._$width) + offset._$total.slice(0, index + 1).reduce(sum) - halfWidth : xPos - (isNumber(offset) ? offset : offset._$width) * (targetsNum / 2 - index);
      } // adjust x position for bar.padding optionq


      return offset && x && targetsNum > 1 && barPadding && (index && (x += barPadding * index), targetsNum > 2 ? x -= (targetsNum - 1) * barPadding / 2 : targetsNum === 2 && (x -= barPadding / 2)), x;
    };
  },
  getShapeY: function getShapeY(isSub) {
    var $$ = this,
        isStackNormalized = $$.isStackNormalized();
    return function (d) {
      var value = d.value;
      return isNumber(d) ? value = d : isStackNormalized ? value = $$.getRatio("index", d, !0) : $$.isBubbleZType(d) && (value = $$.getBubbleZData(d.value, "y")), $$.getYScaleById(d.id, isSub)(value);
    };
  },

  /**
   * Get shape based y Axis min value
   * @param {string} id Data id
   * @returns {number}
   * @private
   */
  getShapeYMin: function getShapeYMin(id) {
    var $$ = this,
        scale = $$.scale[$$.axis.getId(id)],
        _scale$domain = scale.domain(),
        yMin = _scale$domain[0];

    return !$$.isGrouped(id) && yMin > 0 ? yMin : 0;
  },

  /**
   * Get Shape's offset data
   * @param {Function} typeFilter Type filter function
   * @returns {object}
   * @private
   */
  getShapeOffsetData: function getShapeOffsetData(typeFilter) {
    var $$ = this,
        targets = $$.orderTargets($$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$))),
        isStackNormalized = $$.isStackNormalized(),
        shapeOffsetTargets = targets.map(function (target) {
      var rowValues = target.values,
          values = {};
      $$.isStepType(target) && (rowValues = $$.convertValuesToStep(rowValues));
      var rowValueMapByXValue = rowValues.reduce(function (out, d) {
        var key = +d.x;
        return out[key] = d, values[key] = isStackNormalized ? $$.getRatio("index", d, !0) : d.value, out;
      }, {});
      return {
        id: target.id,
        rowValues: rowValues,
        rowValueMapByXValue: rowValueMapByXValue,
        values: values
      };
    }),
        indexMapByTargetId = targets.reduce(function (out, _ref, index) {
      var id = _ref.id;
      return out[id] = index, out;
    }, {});
    return {
      indexMapByTargetId: indexMapByTargetId,
      shapeOffsetTargets: shapeOffsetTargets
    };
  },
  getShapeOffset: function getShapeOffset(typeFilter, indices, isSub) {
    var $$ = this,
        _$$$getShapeOffsetDat = $$.getShapeOffsetData(typeFilter),
        shapeOffsetTargets = _$$$getShapeOffsetDat.shapeOffsetTargets,
        indexMapByTargetId = _$$$getShapeOffsetDat.indexMapByTargetId;

    return function (d, idx) {
      var id = d.id,
          value = d.value,
          x = d.x,
          ind = $$.getIndices(indices, id),
          scale = $$.getYScaleById(id, isSub),
          y0 = scale($$.getShapeYMin(id)),
          dataXAsNumber = +x,
          offset = y0;
      return shapeOffsetTargets.filter(function (t) {
        return t.id !== id;
      }).forEach(function (t) {
        var tid = t.id,
            rowValueMapByXValue = t.rowValueMapByXValue,
            rowValues = t.rowValues,
            tvalues = t.values;

        if (ind[tid] === ind[id] && indexMapByTargetId[tid] < indexMapByTargetId[id]) {
          var row = rowValues[idx]; // check if the x values line up

          row && +row.x === dataXAsNumber || (row = rowValueMapByXValue[dataXAsNumber]), row && row.value * value >= 0 && isNumber(tvalues[dataXAsNumber]) && (offset += scale(tvalues[dataXAsNumber]) - y0);
        }
      }), offset;
    };
  },
  getBarW: function getBarW(type, axis, targetsNum) {
    var $$ = this,
        config = $$.config,
        org = $$.org,
        scale = $$.scale,
        maxDataCount = $$.getMaxDataCount(),
        isGrouped = type === "bar" && config.data_groups.length,
        configName = type + "_width",
        tickInterval = scale.zoom && !$$.axis.isCategorized() ? org.xDomain.map(function (v) {
      return scale.zoom(v);
    }).reduce(function (a, c) {
      return Math.abs(a) + c;
    }) / maxDataCount : axis.tickInterval(maxDataCount),
        getWidth = function (id) {
      var width = id ? config[configName][id] : config[configName],
          ratio = id ? width.ratio : config[configName + "_ratio"],
          max = id ? width.max : config[configName + "_max"],
          w = isNumber(width) ? width : targetsNum ? tickInterval * ratio / targetsNum : 0;
      return max && w > max ? max : w;
    },
        result = getWidth();

    return !isGrouped && isObjectType(config[configName]) && (result = {
      _$width: result,
      _$total: []
    }, $$.filterTargetsToShow($$.data.targets).forEach(function (v) {
      config[configName][v.id] && (result[v.id] = getWidth(v.id), result._$total.push(result[v.id] || result._$width));
    })), result;
  },

  /**
   * Get shape element
   * @param {string} shapeName Shape string
   * @param {number} i Index number
   * @param {string} id Data series id
   * @returns {d3Selection}
   * @private
   */
  getShapeByIndex: function getShapeByIndex(shapeName, i, id) {
    var $$ = this,
        main = $$.$el.main,
        suffix = isValue(i) ? "-" + i : "";
    return (id ? main.selectAll("." + config_classes[shapeName + "s"] + $$.getTargetSelectorSuffix(id)) : main).selectAll("." + config_classes[shapeName] + suffix);
  },
  isWithinShape: function isWithinShape(that, d) {
    var isWithin,
        $$ = this,
        shape = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(that);
    return $$.isTargetToShow(d.id) ? "hasValidPointType" in $$ && $$.hasValidPointType(that.nodeName) ? isWithin = $$.isStepType(d) ? $$.isWithinStep(that, $$.getYScaleById(d.id)(d.value)) : $$.isWithinCircle(that, $$.isBubbleType(d) ? $$.pointSelectR(d) * 1.5 : 0) : that.nodeName === "path" && (isWithin = !shape.classed(config_classes.bar) || $$.isWithinBar(that)) : isWithin = !1, isWithin;
  },
  getInterpolate: function getInterpolate(d) {
    var $$ = this,
        interpolation = $$.getInterpolateType(d);
    return {
      "basis": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveBasis,
      "basis-closed": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveBasisClosed,
      "basis-open": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveBasisOpen,
      "bundle": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveBundle,
      "cardinal": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCardinal,
      "cardinal-closed": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCardinalClosed,
      "cardinal-open": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCardinalOpen,
      "catmull-rom": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCatmullRom,
      "catmull-rom-closed": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCatmullRomClosed,
      "catmull-rom-open": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveCatmullRomOpen,
      "monotone-x": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveMonotoneX,
      "monotone-y": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveMonotoneY,
      "natural": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveNatural,
      "linear-closed": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveLinearClosed,
      "linear": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveLinear,
      "step": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveStep,
      "step-after": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveStepAfter,
      "step-before": external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.curveStepBefore
    }[interpolation];
  },
  getInterpolateType: function getInterpolateType(d) {
    var $$ = this,
        config = $$.config,
        type = config.spline_interpolation_type,
        interpolation = $$.isInterpolationType(type) ? type : "cardinal";
    return $$.isSplineType(d) ? interpolation : $$.isStepType(d) ? config.line_step_type : "linear";
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/size.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



/* harmony default export */ var size = ({
  /**
   * Update container size
   * @private
   */
  setContainerSize: function setContainerSize() {
    var $$ = this,
        state = $$.state;
    state.current.width = $$.getCurrentWidth(), state.current.height = $$.getCurrentHeight();
  },
  getCurrentWidth: function getCurrentWidth() {
    var $$ = this;
    return $$.config.size_width || $$.getParentWidth();
  },
  getCurrentHeight: function getCurrentHeight() {
    var $$ = this,
        config = $$.config,
        h = config.size_height || $$.getParentHeight();
    return h > 0 ? h : 320 / ($$.hasType("gauge") && !config.gauge_fullCircle ? 2 : 1);
  },
  getCurrentPaddingTop: function getCurrentPaddingTop() {
    var $$ = this,
        config = $$.config,
        hasAxis = $$.state.hasAxis,
        $el = $$.$el,
        axesLen = hasAxis ? config.axis_y2_axes.length : 0,
        padding = isValue(config.padding_top) ? config.padding_top : 0;
    return $el.title && $el.title.node() && (padding += $$.getTitlePadding()), axesLen && config.axis_rotated && (padding += $$.getHorizontalAxisHeight("y2") * axesLen), padding;
  },
  getCurrentPaddingBottom: function getCurrentPaddingBottom() {
    var $$ = this,
        config = $$.config,
        hasAxis = $$.state.hasAxis,
        axisId = config.axis_rotated ? "y" : "x",
        axesLen = hasAxis ? config["axis_" + axisId + "_axes"].length : 0,
        padding = isValue(config.padding_bottom) ? config.padding_bottom : 0;
    return padding + (axesLen ? $$.getHorizontalAxisHeight(axisId) * axesLen : 0);
  },
  getCurrentPaddingLeft: function getCurrentPaddingLeft(withoutRecompute) {
    var padding,
        $$ = this,
        config = $$.config,
        hasAxis = $$.state.hasAxis,
        isRotated = config.axis_rotated,
        axisId = isRotated ? "x" : "y",
        axesLen = hasAxis ? config["axis_" + axisId + "_axes"].length : 0,
        axisWidth = hasAxis ? $$.getAxisWidthByAxisId(axisId, withoutRecompute) : 0;
    return padding = isValue(config.padding_left) ? config.padding_left : hasAxis && isRotated ? config.axis_x_show ? Math.max(ceil10(axisWidth), 40) : 1 : hasAxis && (!config.axis_y_show || config.axis_y_inner) ? $$.axis.getAxisLabelPosition("y").isOuter ? 30 : 1 : ceil10(axisWidth), padding + axisWidth * axesLen;
  },
  getCurrentPaddingRight: function getCurrentPaddingRight(withXAxisTickTextOverflow) {
    withXAxisTickTextOverflow === void 0 && (withXAxisTickTextOverflow = !1);
    var padding,
        $$ = this,
        config = $$.config,
        hasAxis = $$.state.hasAxis,
        defaultPadding = 10,
        legendWidthOnRight = $$.state.isLegendRight ? $$.getLegendWidth() + 20 : 0,
        axesLen = hasAxis ? config.axis_y2_axes.length : 0,
        axisWidth = hasAxis ? $$.getAxisWidthByAxisId("y2") : 0,
        xAxisTickTextOverflow = withXAxisTickTextOverflow ? $$.axis.getXAxisTickTextY2Overflow(defaultPadding) : 0;
    return padding = isValue(config.padding_right) ? config.padding_right + 1 : $$.axis && config.axis_rotated ? defaultPadding + legendWidthOnRight : $$.axis && (!config.axis_y2_show || config.axis_y2_inner) ? Math.max(2 + legendWidthOnRight + ($$.axis.getAxisLabelPosition("y2").isOuter ? 20 : 0), xAxisTickTextOverflow) : Math.max(ceil10(axisWidth) + legendWidthOnRight, xAxisTickTextOverflow), padding + axisWidth * axesLen;
  },

  /**
   * Get the parent rect element's size
   * @param {string} key property/attribute name
   * @returns {number}
   * @private
   */
  getParentRectValue: function getParentRectValue(key) {
    for (var offsetName = "offset" + capitalize(key), parent = this.$el.chart.node(), v = 0; v < 30 && parent && parent.tagName !== "BODY";) {
      try {
        v = parent.getBoundingClientRect()[key];
      } catch (e) {
        offsetName in parent && (v = parent[offsetName]);
      }

      parent = parent.parentNode;
    } // Sometimes element's dimension value is incorrect(ex. flex container)
    // In this case, use body's offset instead.


    var bodySize = browser_doc.body[offsetName];
    return v > bodySize && (v = bodySize), v;
  },
  getParentWidth: function getParentWidth() {
    return this.getParentRectValue("width");
  },
  getParentHeight: function getParentHeight() {
    var h = this.$el.chart.style("height"),
        height = 0;
    return h && (height = /px$/.test(h) ? parseInt(h, 10) : this.getParentRectValue("height")), height;
  },
  getSvgLeft: function getSvgLeft(withoutRecompute) {
    var $$ = this,
        config = $$.config,
        $el = $$.$el,
        hasLeftAxisRect = config.axis_rotated || !config.axis_rotated && !config.axis_y_inner,
        leftAxisClass = config.axis_rotated ? config_classes.axisX : config_classes.axisY,
        leftAxis = $el.main.select("." + leftAxisClass).node(),
        svgRect = leftAxis && hasLeftAxisRect ? leftAxis.getBoundingClientRect() : {
      right: 0
    },
        chartRect = $el.chart.node().getBoundingClientRect(),
        hasArc = $$.hasArcType(),
        svgLeft = svgRect.right - chartRect.left - (hasArc ? 0 : $$.getCurrentPaddingLeft(withoutRecompute));
    return svgLeft > 0 ? svgLeft : 0;
  },
  updateDimension: function updateDimension(withoutAxis) {
    var $$ = this,
        config = $$.config,
        hasAxis = $$.state.hasAxis,
        $el = $$.$el;
    // pass 'withoutAxis' param to not animate at the init rendering
    hasAxis && !withoutAxis && $$.axis.x && config.axis_rotated && $$.axis.subX && $$.axis.subX.create($el.axis.subX), $$.updateScales(withoutAxis), $$.updateSvgSize(), $$.transformAll(!1);
  },
  updateSvgSize: function updateSvgSize() {
    var $$ = this,
        _$$$state = $$.state,
        clip = _$$$state.clip,
        current = _$$$state.current,
        hasAxis = _$$$state.hasAxis,
        width = _$$$state.width,
        height = _$$$state.height,
        svg = $$.$el.svg;

    if (svg.attr("width", current.width).attr("height", current.height), hasAxis) {
      var brush = svg.select("." + config_classes.brush + " .overlay"),
          brushSize = {
        width: 0,
        height: 0
      };
      brush.size() && (brushSize.width = +brush.attr("width"), brushSize.height = +brush.attr("height")), svg.selectAll(["#" + clip.id, "#" + clip.idGrid]).select("rect").attr("width", width).attr("height", height), svg.select("#" + clip.idXAxis).select("rect").call($$.setXAxisClipPath.bind($$)), svg.select("#" + clip.idYAxis).select("rect").call($$.setYAxisClipPath.bind($$)), clip.idSubchart && svg.select("#" + clip.idSubchart).select("rect").attr("width", width).attr("height", brushSize.height);
    }
  },

  /**
   * Update size values
   * @param {boolean} isInit If is called at initialization
   * @private
   */
  updateSizes: function updateSizes(isInit) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        legend = $$.$el.legend,
        isRotated = config.axis_rotated,
        hasArc = $$.hasArcType();
    isInit || $$.setContainerSize();
    var currLegend = {
      width: legend ? $$.getLegendWidth() : 0,
      height: legend ? $$.getLegendHeight() : 0
    };
    !hasArc && config.axis_x_show && config.axis_x_tick_autorotate && $$.updateXAxisTickClip();
    var legendHeightForBottom = state.isLegendRight || state.isLegendInset ? 0 : currLegend.height,
        xAxisHeight = isRotated || hasArc ? 0 : $$.getHorizontalAxisHeight("x"),
        subchartXAxisHeight = config.subchart_axis_x_show && config.subchart_axis_x_tick_text_show ? xAxisHeight : 30,
        subchartHeight = config.subchart_show && !hasArc ? config.subchart_size_height + subchartXAxisHeight : 0;
    state.margin = !hasArc && isRotated ? {
      top: $$.getHorizontalAxisHeight("y2") + $$.getCurrentPaddingTop(),
      right: hasArc ? 0 : $$.getCurrentPaddingRight(!0),
      bottom: $$.getHorizontalAxisHeight("y") + legendHeightForBottom + $$.getCurrentPaddingBottom(),
      left: subchartHeight + (hasArc ? 0 : $$.getCurrentPaddingLeft())
    } : {
      top: 4 + $$.getCurrentPaddingTop(),
      // for top tick text
      right: hasArc ? 0 : $$.getCurrentPaddingRight(!0),
      bottom: xAxisHeight + subchartHeight + legendHeightForBottom + $$.getCurrentPaddingBottom(),
      left: hasArc ? 0 : $$.getCurrentPaddingLeft()
    }, state.margin2 = isRotated ? {
      top: state.margin.top,
      right: NaN,
      bottom: 20 + legendHeightForBottom,
      left: $$.state.rotatedPadding.left
    } : {
      top: state.current.height - subchartHeight - legendHeightForBottom,
      right: NaN,
      bottom: subchartXAxisHeight + legendHeightForBottom,
      left: state.margin.left
    }, state.margin3 = {
      top: 0,
      right: NaN,
      bottom: 0,
      left: 0
    }, $$.updateSizeForLegend && $$.updateSizeForLegend(currLegend), state.width = state.current.width - state.margin.left - state.margin.right, state.height = state.current.height - state.margin.top - state.margin.bottom, state.width < 0 && (state.width = 0), state.height < 0 && (state.height = 0), state.width2 = isRotated ? state.margin.left - state.rotatedPadding.left - state.rotatedPadding.right : state.width, state.height2 = isRotated ? state.height : state.current.height - state.margin2.top - state.margin2.bottom, state.width2 < 0 && (state.width2 = 0), state.height2 < 0 && (state.height2 = 0);
    // for arc
    var hasGauge = $$.hasType("gauge"),
        isLegendRight = config.legend_show && state.isLegendRight;
    state.arcWidth = state.width - (isLegendRight ? currLegend.width + 10 : 0), state.arcHeight = state.height - (isLegendRight && !hasGauge ? 0 : 10), hasGauge && !config.gauge_fullCircle && (state.arcHeight += state.height - $$.getPaddingBottomForGauge()), $$.updateRadius && $$.updateRadius(), state.isLegendRight && hasArc && (state.margin3.left = state.arcWidth / 2 + state.radiusExpanded * 1.1);
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/text.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/* harmony default export */ var internals_text = ({
  opacityForText: function opacityForText(d) {
    var $$ = this;
    return $$.isBarType(d) && !$$.meetsLabelThreshold(Math.abs($$.getRatio("bar", d)), "bar") ? "0" : $$.hasDataLabel ? null : "0";
  },

  /**
   * Initializes the text
   * @private
   */
  initText: function initText() {
    var $el = this.$el;
    $el.main.select("." + config_classes.chart).append("g").attr("class", config_classes.chartTexts);
  },

  /**
   * Update chartText
   * @param {object} targets $$.data.targets
   * @private
   */
  updateTargetsForText: function updateTargetsForText(targets) {
    var $$ = this,
        classChartText = $$.getChartClass("Text"),
        classTexts = $$.getClass("texts", "id"),
        classFocus = $$.classFocus.bind($$),
        mainTextUpdate = $$.$el.main.select("." + config_classes.chartTexts).selectAll("." + config_classes.chartText).data(targets).attr("class", function (d) {
      return classChartText(d) + classFocus(d);
    }),
        mainTextEnter = mainTextUpdate.enter().append("g").style("opacity", "0").attr("class", classChartText).style("pointer-events", "none");
    mainTextEnter.append("g").attr("class", classTexts);
  },

  /**
   * Update text
   * @param {number} durationForExit Fade-out transition duration
   * @private
   */
  updateText: function updateText(durationForExit) {
    var $$ = this,
        $el = $$.$el,
        config = $$.config,
        classText = $$.getClass("text", "index"),
        text = $el.main.selectAll("." + config_classes.texts).selectAll("." + config_classes.text).data($$.labelishData.bind($$));
    text.exit().transition().duration(durationForExit).style("fill-opacity", "0").remove(), $el.text = text.enter().append("text").merge(text).attr("class", classText).attr("text-anchor", function (d) {
      // when value is negative or
      var isEndAnchor = d.value < 0;

      if ($$.isCandlestickType(d)) {
        var data = $$.getCandlestickData(d);
        isEndAnchor = data && !data._isUp;
      }

      return config.axis_rotated ? isEndAnchor ? "end" : "start" : "middle";
    }).style("fill", $$.updateTextColor.bind($$)).style("fill-opacity", "0").each(function (d, i, j) {
      var node = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
          value = d.value;
      if ($$.isBubbleZType(d)) value = $$.getBubbleZData(value, "z");else if ($$.isCandlestickType(d)) {
        var data = $$.getCandlestickData(d);
        data && (value = data.close);
      }
      value = $$.dataLabelFormat(d.id)(value, d.id, i, j), isNumber(value) ? this.textContent = value : setTextValue(node, value);
    });
  },
  updateTextColor: function updateTextColor(d) {
    var color,
        $$ = this,
        config = $$.config,
        labelColors = config.data_labels_colors,
        defaultColor = $$.isArcType(d) && !$$.isRadarType(d) ? null : $$.color(d);
    if (isString(labelColors)) color = labelColors;else if (isObject(labelColors)) {
      var _ref = d.data || d,
          id = _ref.id;

      color = labelColors[id];
    } else isFunction(labelColors) && (color = labelColors.bind($$.api)(defaultColor, d));

    if ($$.isCandlestickType(d) && !isFunction(labelColors)) {
      var value = $$.getCandlestickData(d);

      if (value && !value._isUp) {
        var downColor = config.candlestick_color_down;
        color = isObject(downColor) ? downColor[d.id] : downColor;
      }
    }

    return color || defaultColor;
  },

  /**
   * Update data label text background color
   * @param {object} d Data object
   * @returns {string|null}
   * @private
   */
  updateTextBacgroundColor: function updateTextBacgroundColor(d) {
    var $$ = this,
        $el = $$.$el,
        config = $$.config,
        backgroundColor = config.data_labels_backgroundColors,
        color = "";

    if (isString(backgroundColor) || isObject(backgroundColor)) {
      var id = isString(backgroundColor) ? "" : $$.getTargetSelectorSuffix("id" in d ? d.id : d.data.id),
          filter = $el.defs.select(["filter[id*='labels-bg", "']"].join(id));
      filter.size() && (color = "url(#" + filter.attr("id") + ")");
    }

    return color || null;
  },

  /**
   * Redraw chartText
   * @param {Function} x Positioning function for x
   * @param {Function} y Positioning function for y
   * @param {boolean} forFlow Weather is flow
   * @param {boolean} withTransition transition is enabled
   * @returns {Array}
   * @private
   */
  redrawText: function redrawText(x, y, forFlow, withTransition) {
    var $$ = this,
        t = getRandom(!0);
    // need to return 'true' as of being pushed to the redraw list
    // ref: getRedrawList()
    return $$.$el.text.style("fill", $$.updateTextColor.bind($$)).attr("filter", $$.updateTextBacgroundColor.bind($$)).style("fill-opacity", forFlow ? 0 : $$.opacityForText.bind($$)).each(function (d, i) {
      // do not apply transition for newly added text elements
      var node = withTransition && this.getAttribute("x") ? (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).transition(t) : (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
          posX = x.bind(this)(d, i),
          posY = y.bind(this)(d, i);
      this.childElementCount ? node.attr("transform", "translate(" + posX + " " + posY + ")") : node.attr("x", posX).attr("y", posY);
    }), !0;
  },

  /**
   * Gets the getBoundingClientRect value of the element
   * @param {HTMLElement|d3.selection} element Target element
   * @param {string} className Class name
   * @returns {object} value of element.getBoundingClientRect()
   * @private
   */
  getTextRect: function getTextRect(element, className) {
    var $$ = this,
        base = element.node ? element.node() : element;
    /text/i.test(base.tagName) || (base = base.querySelector("text"));
    var text = base.textContent,
        cacheKey = KEY.textRect + "-" + text.replace(/\W/g, "_"),
        rect = $$.cache.get(cacheKey);
    return rect || ($$.$el.svg.append("text").style("visibility", "hidden").style("font", (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(base).style("font")).classed(className, !0).text(text).call(function (v) {
      rect = getBoundingRect(v.node());
    }).remove(), $$.cache.add(cacheKey, rect)), rect;
  },

  /**
   * Gets the x or y coordinate of the text
   * @param {object} indices Indices values
   * @param {boolean} forX whether or not to x
   * @returns {number} coordinates
   * @private
   */
  generateXYForText: function generateXYForText(indices, forX) {
    var $$ = this,
        types = Object.keys(indices),
        points = {},
        getter = forX ? $$.getXForText : $$.getYForText;
    return $$.hasType("radar") && types.push("radar"), types.forEach(function (v) {
      points[v] = $$["generateGet" + capitalize(v) + "Points"](indices[v], !1);
    }), function (d, i) {
      var type = $$.isAreaType(d) && "area" || $$.isBarType(d) && "bar" || $$.isCandlestickType(d) && "candlestick" || $$.isRadarType(d) && "radar" || "line";
      return getter.call($$, points[type](d, i), d, this);
    };
  },

  /**
   * Get centerized text position for bar type data.label.text
   * @param {object} d Data object
   * @param {Array} points Data points position
   * @param {HTMLElement} textElement Data label text element
   * @returns {number} Position value
   * @private
   */
  getCenteredTextPos: function getCenteredTextPos(d, points, textElement) {
    var $$ = this,
        config = $$.config,
        isRotated = config.axis_rotated;

    if (config.data_labels.centered && $$.isBarType(d)) {
      var rect = getBoundingRect(textElement),
          isPositive = d.value >= 0;

      if (isRotated) {
        var w = (isPositive ? points[1][1] - points[0][1] : points[0][1] - points[1][1]) / 2 + rect.width / 2;
        return isPositive ? -w - 3 : w + 2;
      }

      var h = (isPositive ? points[0][1] - points[1][1] : points[1][1] - points[0][1]) / 2 + rect.height / 2;
      return isPositive ? h : -h - 2;
    }

    return 0;
  },

  /**
   * Get data.labels.position value
   * @param {string} id Data id value
   * @param {string} type x | y
   * @returns {number} Position value
   * @private
   */
  getTextPos: function getTextPos(id, type) {
    var pos = this.config.data_labels_position;
    return (id in pos ? pos[id] : pos)[type] || 0;
  },

  /**
   * Gets the x coordinate of the text
   * @param {object} points Data points position
   * @param {object} d Data object
   * @param {HTMLElement} textElement Data label text element
   * @returns {number} x coordinate
   * @private
   */
  getXForText: function getXForText(points, d, textElement) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        isRotated = config.axis_rotated,
        xPos = points[0][0];
    if ($$.hasType("candlestick")) isRotated ? xPos = $$.getCandlestickData(d)._isUp ? points[2][2] + 4 : points[2][1] - 4 : xPos += (points[1][0] - xPos) / 2;else if (isRotated) {
      var padding = $$.isBarType(d) ? 4 : 6;
      xPos = points[2][1] + padding * (d.value < 0 ? -1 : 1);
    } else xPos = $$.hasType("bar") ? (points[2][0] + points[0][0]) / 2 : xPos; // show labels regardless of the domain if value is null

    if (d.value === null) if (xPos > state.width) {
      var _getBoundingRect = getBoundingRect(textElement),
          width = _getBoundingRect.width;

      xPos = state.width - width;
    } else xPos < 0 && (xPos = 4);
    return isRotated && (xPos += $$.getCenteredTextPos(d, points, textElement)), xPos + $$.getTextPos(d.id, "x");
  },

  /**
   * Gets the y coordinate of the text
   * @param {object} points Data points position
   * @param {object} d Data object
   * @param {HTMLElement} textElement Data label text element
   * @returns {number} y coordinate
   * @private
   */
  getYForText: function getYForText(points, d, textElement) {
    var yPos,
        $$ = this,
        config = $$.config,
        state = $$.state,
        isRotated = config.axis_rotated,
        r = config.point_r,
        rect = getBoundingRect(textElement),
        value = d.value,
        baseY = 3;
    if ($$.isCandlestickType(d)) value = $$.getCandlestickData(d), isRotated ? (yPos = points[0][0], yPos += (points[1][0] - yPos) / 2 + baseY) : yPos = value && value._isUp ? points[2][2] - baseY : points[2][1] + baseY * 4;else if (isRotated) yPos = (points[0][0] + points[2][0] + rect.height * .6) / 2;else if (yPos = points[2][1], isNumber(r) && r > 5 && ($$.isLineType(d) || $$.isScatterType(d)) && (baseY += config.point_r / 2.3), value < 0 || value === 0 && !state.hasPositiveValue && state.hasNegativeValue) yPos += rect.height + ($$.isBarType(d) ? -baseY : baseY);else {
      var diff = -baseY * 2;
      $$.isBarType(d) ? diff = -baseY : $$.isBubbleType(d) && (diff = baseY), yPos += diff;
    } // show labels regardless of the domain if value is null

    if (d.value === null && !isRotated) {
      var boxHeight = rect.height;
      yPos < boxHeight ? yPos = boxHeight : yPos > state.height && (yPos = state.height - 4);
    }

    return isRotated || (yPos += $$.getCenteredTextPos(d, points, textElement)), yPos + $$.getTextPos(d.id, "y");
  },

  /**
   * Calculate if two or more text nodes are overlapping
   * Mark overlapping text nodes with "text-overlapping" class
   * @param {string} id Axis id
   * @param {ChartInternal} $$ ChartInternal context
   * @param {string} selector Selector string
   * @private
   */
  markOverlapped: function markOverlapped(id, $$, selector) {
    var textNodes = $$.$el.arcs.selectAll(selector),
        filteredTextNodes = textNodes.filter(function (node) {
      return node.data.id !== id;
    }),
        textNode = textNodes.filter(function (node) {
      return node.data.id === id;
    }),
        translate = getTranslation(textNode.node()),
        calcHypo = function (x, y) {
      return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };

    textNode.node() && filteredTextNodes.each(function () {
      var coordinate = getTranslation(this),
          filteredTextNode = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
          nodeForWidth = calcHypo(translate.e, translate.f) > calcHypo(coordinate.e, coordinate.f) ? textNode : filteredTextNode,
          overlapsX = Math.ceil(Math.abs(translate.e - coordinate.e)) < Math.ceil(nodeForWidth.node().getComputedTextLength()),
          overlapsY = Math.ceil(Math.abs(translate.f - coordinate.f)) < parseInt(textNode.style("font-size"), 10);
      filteredTextNode.classed(config_classes.TextOverlapping, overlapsX && overlapsY);
    });
  },

  /**
   * Calculate if two or more text nodes are overlapping
   * Remove "text-overlapping" class on selected text nodes
   * @param {ChartInternal} $$ ChartInternal context
   * @param {string} selector Selector string
   * @private
   */
  undoMarkOverlapped: function undoMarkOverlapped($$, selector) {
    $$.$el.arcs.selectAll(selector).each(function () {
      (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.selectAll)([this, this.previousSibling]).classed(config_classes.TextOverlapping, !1);
    });
  },

  /**
   * Check if meets the ratio to show data label text
   * @param {number} ratio ratio to meet
   * @param {string} type chart type
   * @returns {boolean}
   * @private
   */
  meetsLabelThreshold: function meetsLabelThreshold(ratio, type) {
    ratio === void 0 && (ratio = 0);
    var $$ = this,
        config = $$.config,
        threshold = config[type + "_label_threshold"] || 0;
    return ratio >= threshold;
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/title.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Get the text position
 * @param {string} pos right, left or center
 * @param {number} width chart width
 * @returns {string|number} text-anchor value or position in pixel
 * @private
 */

function getTextPos(pos, width) {
  pos === void 0 && (pos = "left");
  var position,
      isNum = isNumber(width);
  return position = pos.indexOf("center") > -1 ? isNum ? width / 2 : "middle" : pos.indexOf("right") > -1 ? isNum ? width : "end" : isNum ? 0 : "start", position;
}

/* harmony default export */ var internals_title = ({
  /**
   * Initializes the title
   * @private
   */
  initTitle: function initTitle() {
    var $$ = this,
        config = $$.config,
        $el = $$.$el;

    if (config.title_text) {
      $el.title = $el.svg.append("g");
      var text = $el.title.append("text").style("text-anchor", getTextPos(config.title_position)).attr("class", config_classes.title);
      setTextValue(text, config.title_text, [.3, 1.5]);
    }
  },

  /**
   * Redraw title
   * @private
   */
  redrawTitle: function redrawTitle() {
    var $$ = this,
        config = $$.config,
        current = $$.state.current,
        title = $$.$el.title;

    if (title) {
      var y = $$.yForTitle.call($$);
      /g/i.test(title.node().tagName) ? title.attr("transform", "translate(" + getTextPos(config.title_position, current.width) + ", " + y + ")") : title.attr("x", $$.xForTitle.call($$)).attr("y", y);
    }
  },

  /**
   * Returns the x attribute value of the title
   * @returns {number} x attribute value
   * @private
   */
  xForTitle: function xForTitle() {
    var x,
        $$ = this,
        config = $$.config,
        current = $$.state.current,
        position = config.title_position || "left",
        textRectWidth = $$.getTextRect($$.$el.title, config_classes.title).width;
    return /(right|center)/.test(position) ? (x = current.width - textRectWidth, position.indexOf("right") >= 0 ? x = current.width - textRectWidth - config.title_padding.right : position.indexOf("center") >= 0 && (x = (current.width - textRectWidth) / 2)) : x = config.title_padding.left || 0, x;
  },

  /**
   * Returns the y attribute value of the title
   * @returns {number} y attribute value
   * @private
   */
  yForTitle: function yForTitle() {
    var $$ = this;
    return ($$.config.title_padding.top || 0) + $$.getTextRect($$.$el.title, config_classes.title).height;
  },

  /**
   * Get title padding
   * @returns {number} padding value
   * @private
   */
  getTitlePadding: function getTitlePadding() {
    var $$ = this;
    return $$.yForTitle() + ($$.config.title_padding.bottom || 0);
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/tooltip.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/* harmony default export */ var internals_tooltip = ({
  /**
   * Initializes the tooltip
   * @private
   */
  initTooltip: function initTooltip() {
    var $$ = this,
        config = $$.config,
        $el = $$.$el;
    $el.tooltip = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(config.tooltip_contents.bindto), $el.tooltip.empty() && ($el.tooltip = $el.chart.style("position", "relative").append("div").attr("class", config_classes.tooltipContainer).style("position", "absolute").style("pointer-events", "none").style("display", "none")), $$.bindTooltipResizePos();
  },
  initShowTooltip: function initShowTooltip() {
    var $$ = this,
        config = $$.config,
        $el = $$.$el,
        _$$$state = $$.state,
        hasAxis = _$$$state.hasAxis,
        hasRadar = _$$$state.hasRadar;

    // Show tooltip if needed
    if (config.tooltip_init_show) {
      var isArc = !(hasAxis && hasRadar);

      if ($$.axis && $$.axis.isTimeSeries() && isString(config.tooltip_init_x)) {
        var i,
            val,
            targets = $$.data.targets[0];

        for (config.tooltip_init_x = parseDate.call($$, config.tooltip_init_x), i = 0; (val = targets.values[i]) && !(val.x - config.tooltip_init_x === 0); i++);

        config.tooltip_init_x = i;
      }

      var data = $$.data.targets.map(function (d) {
        var x = isArc ? 0 : config.tooltip_init_x;
        return $$.addName(d.values[x]);
      });
      isArc && (data = [data[config.tooltip_init_x]]), $el.tooltip.html($$.getTooltipHTML(data, $$.axis && $$.axis.getXAxisTickFormat(), $$.getDefaultValueFormat(), $$.color)), config.tooltip_contents.bindto || $el.tooltip.style("top", config.tooltip_init_position.top).style("left", config.tooltip_init_position.left).style("display", null);
    }
  },

  /**
   * Get the tooltip HTML string
   * @param  {Array} args Arguments
   * @returns {string} Formatted HTML string
   * @private
   */
  getTooltipHTML: function getTooltipHTML() {
    var $$ = this,
        api = $$.api,
        config = $$.config;
    return isFunction(config.tooltip_contents) ? config.tooltip_contents.bind(api).apply(void 0, arguments) : $$.getTooltipContent.apply($$, arguments);
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
  getTooltipContent: function getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color) {
    var $$ = this,
        api = $$.api,
        config = $$.config,
        state = $$.state,
        _map = ["title", "name", "value"].map(function (v) {
      var fn = config["tooltip_format_" + v];
      return isFunction(fn) ? fn.bind(api) : fn;
    }),
        titleFormat = _map[0],
        nameFormat = _map[1],
        valueFormat = _map[2];

    titleFormat = titleFormat || defaultTitleFormat, nameFormat = nameFormat || function (name) {
      return name;
    }, valueFormat = valueFormat || ($$.isStackNormalized() ? function (v, ratio) {
      return (ratio * 100).toFixed(2) + "%";
    } : defaultValueFormat);

    var order = config.tooltip_order,
        getRowValue = function (row) {
      return $$.axis && $$.isBubbleZType(row) ? $$.getBubbleZData(row.value, "z") : $$.getBaseValue(row);
    },
        getBgColor = $$.levelColor ? function (row) {
      return $$.levelColor(row.value);
    } : function (row) {
      return color(row);
    },
        contents = config.tooltip_contents,
        tplStr = contents.template,
        targetIds = $$.mapToTargetIds();

    if (order === null && config.data_groups.length) {
      // for stacked data, order should aligned with the visually displayed data
      var ids = $$.orderTargets($$.data.targets).map(function (i2) {
        return i2.id;
      }).reverse();
      d.sort(function (a, b) {
        var v1 = a ? a.value : null,
            v2 = b ? b.value : null;
        return v1 > 0 && v2 > 0 && (v1 = a.id ? ids.indexOf(a.id) : null, v2 = b.id ? ids.indexOf(b.id) : null), v1 - v2;
      });
    } else if (/^(asc|desc)$/.test(order)) {
      d.sort(function (a, b) {
        var v1 = a ? getRowValue(a) : null,
            v2 = b ? getRowValue(b) : null;
        return order === "asc" ? v1 - v2 : v2 - v1;
      });
    } else isFunction(order) && d.sort(order.bind(api));

    var text,
        row,
        param,
        value,
        i,
        tpl = $$.getTooltipContentTemplate(tplStr),
        len = d.length;

    for (i = 0; i < len; i++) if (row = d[i], row && (getRowValue(row) || getRowValue(row) === 0)) {
      if (isUndefined(text)) {
        var title = (state.hasAxis || state.hasRadar) && sanitise(titleFormat ? titleFormat(row.x) : row.x);
        text = tplProcess(tpl[0], {
          CLASS_TOOLTIP: config_classes.tooltip,
          TITLE: isValue(title) ? tplStr ? title : "<tr><th colspan=\"2\">" + title + "</th></tr>" : ""
        });
      }

      if (!row.ratio && $$.$el.arcs && (row.ratio = $$.getRatio("arc", $$.$el.arcs.select("path." + config_classes.arc + "-" + row.id).data()[0])), param = [row.ratio, row.id, row.index, d], value = sanitise(valueFormat.apply(void 0, [getRowValue(row)].concat(param))), $$.isAreaRangeType(row)) {
        var _map2 = ["high", "low"].map(function (v) {
          return sanitise(valueFormat.apply(void 0, [$$.getRangedData(row, v)].concat(param)));
        }),
            high = _map2[0],
            low = _map2[1];

        value = "<b>Mid:</b> " + value + " <b>High:</b> " + high + " <b>Low:</b> " + low;
      } else if ($$.isCandlestickType(row)) {
        var _map3 = ["open", "high", "low", "close", "volume"].map(function (v) {
          return sanitise(valueFormat.apply(void 0, [$$.getRangedData(row, v, "candlestick")].concat(param)));
        }),
            open = _map3[0],
            _high = _map3[1],
            _low = _map3[2],
            close = _map3[3],
            volume = _map3[4];

        value = "<b>Open:</b> " + open + " <b>High:</b> " + _high + " <b>Low:</b> " + _low + " <b>Close:</b> " + close + (volume ? " <b>Volume:</b> " + volume : "");
      }

      if (value !== undefined) {
        var _ret = function () {
          // Skip elements when their name is set to null
          if (row.name === null) return "continue";
          var name = sanitise(nameFormat.apply(void 0, [row.name].concat(param))),
              color = getBgColor(row),
              contentValue = {
            CLASS_TOOLTIP_NAME: config_classes.tooltipName + $$.getTargetSelectorSuffix(row.id),
            COLOR: tplStr || !$$.patterns ? color : "<svg><rect style=\"fill:" + color + "\" width=\"10\" height=\"10\"></rect></svg>",
            NAME: name,
            VALUE: value
          };

          if (tplStr && isObject(contents.text)) {
            var index = targetIds.indexOf(row.id);
            Object.keys(contents.text).forEach(function (key) {
              contentValue[key] = contents.text[key][index];
            });
          }

          text += tplProcess(tpl[1], contentValue);
        }();

        if (_ret === "continue") continue;
      }
    }

    return text + "</table>";
  },

  /**
   * Get the content template string
   * @param {string} tplStr Tempalte string
   * @returns {Array} Template string
   * @private
   */
  getTooltipContentTemplate: function getTooltipContentTemplate(tplStr) {
    return (tplStr || "<table class=\"{=CLASS_TOOLTIP}\"><tbody>\n\t\t\t\t{=TITLE}\n\t\t\t\t{{<tr class=\"{=CLASS_TOOLTIP_NAME}\">\n\t\t\t\t\t<td class=\"name\">" + (this.patterns ? "{=COLOR}" : "<span style=\"background-color:{=COLOR}\"></span>") + "{=NAME}</td>\n\t\t\t\t\t<td class=\"value\">{=VALUE}</td>\n\t\t\t\t</tr>}}\n\t\t\t</tbody></table>").replace(/(\r?\n|\t)/g, "").split(/{{(.*)}}/);
  },

  /**
   * Returns the position of the tooltip
   * @param {object} dataToShow data
   * @param {string} tWidth Width value of tooltip element
   * @param {string} tHeight Height value of tooltip element
   * @param {HTMLElement} element Tooltip element
   * @returns {object} top, left value
   * @private
   */
  tooltipPosition: function tooltipPosition(dataToShow, tWidth, tHeight, element) {
    var $$ = this,
        config = $$.config,
        scale = $$.scale,
        state = $$.state,
        _state = state,
        width = _state.width,
        height = _state.height,
        current = _state.current,
        isLegendRight = _state.isLegendRight,
        inputType = _state.inputType,
        event = _state.event,
        hasGauge = $$.hasType("gauge") && !config.gauge_fullCircle,
        svgLeft = $$.getSvgLeft(!0),
        chartRight = svgLeft + current.width - $$.getCurrentPaddingRight(),
        chartLeft = $$.getCurrentPaddingLeft(!0),
        size = 20,
        _getPointer = getPointer(event, element),
        x = _getPointer[0],
        y = _getPointer[1];

    // Determine tooltip position
    if ($$.hasArcType()) {
      var raw = inputType === "touch" || $$.hasType("radar");
      raw || (y += hasGauge ? height : height / 2, x += (width - (isLegendRight ? $$.getLegendWidth() : 0)) / 2);
    } else {
      var dataScale = scale.x(dataToShow[0].x);
      config.axis_rotated ? (y = dataScale + size, x += svgLeft + 100, chartRight -= svgLeft) : (y -= 5, x = svgLeft + chartLeft + size + ($$.scale.zoom ? x : dataScale));
    } // when tooltip left + tWidth > chart's width


    x + tWidth + 15 > chartRight && (x -= tWidth + chartLeft), y + tHeight > current.height && (y -= hasGauge ? tHeight * 3 : tHeight + 30);
    var pos = {
      top: y,
      left: x
    }; // make sure to not be positioned out of viewport

    return Object.keys(pos).forEach(function (v) {
      pos[v] < 0 && (pos[v] = 0);
    }), pos;
  },

  /**
   * Show the tooltip
   * @param {object} selectedData Data object
   * @param {HTMLElement} element Tooltip element
   * @private
   */
  showTooltip: function showTooltip(selectedData, element) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        tooltip = $$.$el.tooltip,
        bindto = config.tooltip_contents.bindto,
        dataToShow = selectedData.filter(function (d) {
      return d && isValue($$.getBaseValue(d));
    });

    if (tooltip && dataToShow.length !== 0 && config.tooltip_show) {
      var datum = tooltip.datum(),
          _ref = datum || {},
          _ref$width = _ref.width,
          width = _ref$width === void 0 ? 0 : _ref$width,
          _ref$height = _ref.height,
          height = _ref$height === void 0 ? 0 : _ref$height,
          dataStr = JSON.stringify(selectedData);

      if (!datum || datum.current !== dataStr) {
        var index = selectedData.concat().sort()[0].index;
        callFn(config.tooltip_onshow, $$.api, selectedData), tooltip.html($$.getTooltipHTML(selectedData, // data
        $$.axis ? $$.axis.getXAxisTickFormat() : $$.categoryName.bind($$), // defaultTitleFormat
        $$.getDefaultValueFormat(), // defaultValueFormat
        $$.color // color
        )).style("display", null).style("visibility", null) // for IE9
        .datum(datum = {
          index: index,
          current: dataStr,
          width: width = tooltip.property("offsetWidth"),
          height: height = tooltip.property("offsetHeight")
        }), callFn(config.tooltip_onshown, $$.api, selectedData), $$._handleLinkedCharts(!0, index);
      }

      if (!bindto) {
        var fnPos = config.tooltip_position || $$.tooltipPosition,
            pos = fnPos.call(this, dataToShow, width, height, element); // Get tooltip dimensions

        ["top", "left"].forEach(function (v) {
          var value = pos[v];
          tooltip.style(v, value + "px"), v !== "left" || datum.xPosInPercent || (datum.xPosInPercent = value / state.current.width * 100);
        });
      }
    }
  },

  /**
   * Adjust tooltip position on resize event
   * @private
   */
  bindTooltipResizePos: function bindTooltipResizePos() {
    var $$ = this,
        resizeFunction = $$.resizeFunction,
        state = $$.state,
        tooltip = $$.$el.tooltip;
    resizeFunction.add(function () {
      if (tooltip.style("display") === "block") {
        var current = state.current,
            _tooltip$datum = tooltip.datum(),
            width = _tooltip$datum.width,
            xPosInPercent = _tooltip$datum.xPosInPercent,
            _value = current.width / 100 * xPosInPercent,
            diff = current.width - (_value + width);

        diff < 0 && (_value += diff), tooltip.style("left", _value + "px");
      }
    });
  },

  /**
   * Hide the tooltip
   * @param {boolean} force Force to hide
   * @private
   */
  hideTooltip: function hideTooltip(force) {
    var $$ = this,
        api = $$.api,
        config = $$.config,
        tooltip = $$.$el.tooltip;

    if (tooltip && tooltip.style("display") !== "none" && (!config.tooltip_doNotHide || force)) {
      var selectedData = JSON.parse(tooltip.datum().current);
      // hide tooltip
      callFn(config.tooltip_onhide, api, selectedData), tooltip.style("display", "none").style("visibility", "hidden") // for IE9
      .datum(null), callFn(config.tooltip_onhidden, api, selectedData);
    }
  },

  /**
   * Toggle display for linked chart instances
   * @param {boolean} show true: show, false: hide
   * @param {number} index x Axis index
   * @private
   */
  _handleLinkedCharts: function _handleLinkedCharts(show, index) {
    var $$ = this,
        charts = $$.charts,
        config = $$.config,
        event = $$.state.event;

    // Prevent propagation among instances if isn't instantiated from the user's event
    // https://github.com/naver/billboard.js/issues/1979
    if (event && event.isTrusted && config.tooltip_linked && charts.length > 1) {
      var linkedName = config.tooltip_linked_name;
      charts.filter(function (c) {
        return c !== $$.api;
      }).forEach(function (c) {
        var _c$internal = c.internal,
            config = _c$internal.config,
            $el = _c$internal.$el,
            isLinked = config.tooltip_linked,
            name = config.tooltip_linked_name,
            isInDom = browser_doc.body.contains($el.chart.node());

        if (isLinked && linkedName === name && isInDom) {
          var data = $el.tooltip.data()[0],
              isNotSameIndex = index !== (data && data.index);

          try {
            c.tooltip[show && isNotSameIndex ? "show" : "hide"]({
              index: index
            });
          } catch (e) {}
        }
      });
    }
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/transform.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/* harmony default export */ var transform = ({
  getTranslate: function getTranslate(target, index) {
    index === void 0 && (index = 0);
    var x,
        y,
        $$ = this,
        config = $$.config,
        state = $$.state,
        isRotated = config.axis_rotated,
        padding = 0;
    if (index && /^(x|y2?)$/.test(target) && (padding = $$.getAxisSize(target) * index), target === "main") x = asHalfPixel(state.margin.left), y = asHalfPixel(state.margin.top);else if (target === "context") x = asHalfPixel(state.margin2.left), y = asHalfPixel(state.margin2.top);else if (target === "legend") x = state.margin3.left, y = state.margin3.top;else if (target === "x") x = isRotated ? -padding : 0, y = isRotated ? 0 : state.height + padding;else if (target === "y") x = isRotated ? 0 : -padding, y = isRotated ? state.height + padding : 0;else if (target === "y2") x = isRotated ? 0 : state.width + padding, y = isRotated ? 1 - padding : 0;else if (target === "subX") x = 0, y = isRotated ? 0 : state.height2;else if (target === "arc") x = state.arcWidth / 2, y = state.arcHeight / 2;else if (target === "radar") {
      var _$$$getRadarSize = $$.getRadarSize(),
          width = _$$$getRadarSize[0];

      x = state.width / 2 - width, y = asHalfPixel(state.margin.top);
    }
    return "translate(" + x + ", " + y + ")";
  },
  transformMain: function transformMain(withTransition, transitions) {
    var xAxis,
        yAxis,
        y2Axis,
        $$ = this,
        main = $$.$el.main;
    transitions && transitions.axisX ? xAxis = transitions.axisX : (xAxis = main.select("." + config_classes.axisX), withTransition && (xAxis = xAxis.transition())), transitions && transitions.axisY ? yAxis = transitions.axisY : (yAxis = main.select("." + config_classes.axisY), withTransition && (yAxis = yAxis.transition())), transitions && transitions.axisY2 ? y2Axis = transitions.axisY2 : (y2Axis = main.select("." + config_classes.axisY2), withTransition && (y2Axis = y2Axis.transition())), (withTransition ? main.transition() : main).attr("transform", $$.getTranslate("main")), xAxis.attr("transform", $$.getTranslate("x")), yAxis.attr("transform", $$.getTranslate("y")), y2Axis.attr("transform", $$.getTranslate("y2")), main.select("." + config_classes.chartArcs).attr("transform", $$.getTranslate("arc"));
  },
  transformAll: function transformAll(withTransition, transitions) {
    var $$ = this,
        config = $$.config,
        hasAxis = $$.state.hasAxis,
        $el = $$.$el;
    $$.transformMain(withTransition, transitions), hasAxis && config.subchart_show && $$.transformContext(withTransition, transitions), $el.legend && $$.transformLegend(withTransition);
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/type.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/* harmony default export */ var type = ({
  setTargetType: function setTargetType(targetIds, type) {
    var $$ = this,
        config = $$.config,
        withoutFadeIn = $$.state.withoutFadeIn;
    $$.mapToTargetIds(targetIds).forEach(function (id) {
      withoutFadeIn[id] = type === config.data_types[id], config.data_types[id] = type;
    }), targetIds || (config.data_type = type);
  },

  /**
   * Updte current used chart types
   * @private
   */
  updateTypesElements: function updateTypesElements() {
    var $$ = this,
        current = $$.state.current;
    // Update current chart elements reference
    Object.keys(TYPE).forEach(function (v) {
      var t = TYPE[v],
          has = $$.hasType(t, null, !0),
          idx = current.types.indexOf(t);
      idx === -1 && has ? current.types.push(t) : idx > -1 && !has && current.types.splice(idx, 1);
    }), $$.setChartElements();
  },

  /**
   * Check if given chart types exists
   * @param {string} type Chart type
   * @param {Array} targetsValue Data array
   * @param {boolean} checkFromData Force to check type cotains from data targets
   * @returns {boolean}
   * @private
   */
  hasType: function hasType(type, targetsValue, checkFromData) {
    checkFromData === void 0 && (checkFromData = !1);
    var $$ = this,
        config = $$.config,
        current = $$.state.current,
        types = config.data_types,
        targets = targetsValue || $$.data.targets,
        has = !1;
    return !checkFromData && current.types.length && current.types.indexOf(type) > -1 ? has = !0 : targets && targets.length ? targets.forEach(function (target) {
      var t = types[target.id];
      t !== type && (t || type !== "line") || (has = !0);
    }) : Object.keys(types).length ? Object.keys(types).forEach(function (id) {
      types[id] === type && (has = !0);
    }) : has = config.data_type === type, has;
  },

  /**
   * Check if contains given chart types
   * @param {string} type Type key
   * @param {object} targets Target data
   * @param {Array} exclude Excluded types
   * @returns {boolean}
   * @private
   */
  hasTypeOf: function hasTypeOf(type, targets, exclude) {
    var _this = this;

    return exclude === void 0 && (exclude = []), !!(type in TYPE_BY_CATEGORY) && !TYPE_BY_CATEGORY[type].filter(function (v) {
      return exclude.indexOf(v) === -1;
    }).every(function (v) {
      return !_this.hasType(v, targets);
    });
  },

  /**
   * Check if given data is certain chart type
   * @param {object} d Data object
   * @param {string|Array} type chart type
   * @returns {boolean}
   * @private
   */
  isTypeOf: function isTypeOf(d, type) {
    var id = isString(d) ? d : d.id,
        dataType = this.config.data_types[id] || this.config.data_type;
    return isArray(type) ? type.indexOf(dataType) >= 0 : dataType === type;
  },
  hasPointType: function hasPointType() {
    var $$ = this;
    return $$.hasTypeOf("Line") || $$.hasType("bubble") || $$.hasType("scatter");
  },

  /**
   * Check if contains arc types chart
   * @param {object} targets Target data
   * @param {Array} exclude Excluded types
   * @returns {boolean}
   * @private
   */
  hasArcType: function hasArcType(targets, exclude) {
    return this.hasTypeOf("Arc", targets, exclude);
  },
  hasMultiArcGauge: function hasMultiArcGauge() {
    return this.hasType("gauge") && this.config.gauge_type === "multi";
  },
  isLineType: function isLineType(d) {
    var id = isString(d) ? d : d.id;
    return !this.config.data_types[id] || this.isTypeOf(id, TYPE_BY_CATEGORY.Line);
  },
  isStepType: function isStepType(d) {
    return this.isTypeOf(d, TYPE_BY_CATEGORY.Step);
  },
  isSplineType: function isSplineType(d) {
    return this.isTypeOf(d, TYPE_BY_CATEGORY.Spline);
  },
  isAreaType: function isAreaType(d) {
    return this.isTypeOf(d, TYPE_BY_CATEGORY.Area);
  },
  isAreaRangeType: function isAreaRangeType(d) {
    return this.isTypeOf(d, TYPE_BY_CATEGORY.AreaRange);
  },
  isBarType: function isBarType(d) {
    return this.isTypeOf(d, "bar");
  },
  isBubbleType: function isBubbleType(d) {
    return this.isTypeOf(d, "bubble");
  },
  isCandlestickType: function isCandlestickType(d) {
    return this.isTypeOf(d, "candlestick");
  },
  isScatterType: function isScatterType(d) {
    return this.isTypeOf(d, "scatter");
  },
  isPieType: function isPieType(d) {
    return this.isTypeOf(d, "pie");
  },
  isGaugeType: function isGaugeType(d) {
    return this.isTypeOf(d, "gauge");
  },
  isDonutType: function isDonutType(d) {
    return this.isTypeOf(d, "donut");
  },
  isRadarType: function isRadarType(d) {
    return this.isTypeOf(d, "radar");
  },
  isArcType: function isArcType(d) {
    return this.isPieType(d) || this.isDonutType(d) || this.isGaugeType(d) || this.isRadarType(d);
  },
  // determine if is 'circle' data point
  isCirclePoint: function isCirclePoint(node) {
    var config = this.config,
        pattern = config.point_pattern,
        isCircle = !1;
    return isCircle = !!(node && node.tagName === "circle") || config.point_type === "circle" && (!pattern || isArray(pattern) && pattern.length === 0), isCircle;
  },
  lineData: function lineData(d) {
    return this.isLineType(d) ? [d] : [];
  },
  arcData: function arcData(d) {
    return this.isArcType(d.data) ? [d] : [];
  },

  /**
   * Get data adapt for data label showing
   * @param {object} d Data object
   * @returns {Array}
   * @private
   */
  labelishData: function labelishData(d) {
    return this.isBarType(d) || this.isLineType(d) || this.isScatterType(d) || this.isBubbleType(d) || this.isCandlestickType(d) || this.isRadarType(d) ? d.values.filter(function (v) {
      return isNumber(v.value) || !!v.value;
    }) : [];
  },
  barLineBubbleData: function barLineBubbleData(d) {
    return this.isBarType(d) || this.isLineType(d) || this.isBubbleType(d) ? d.values : [];
  },
  // https://github.com/d3/d3-shape#curves
  isInterpolationType: function isInterpolationType(type) {
    return ["basis", "basis-closed", "basis-open", "bundle", "cardinal", "cardinal-closed", "cardinal-open", "catmull-rom", "catmull-rom-closed", "catmull-rom-open", "linear", "linear-closed", "monotone-x", "monotone-y", "natural"].indexOf(type) >= 0;
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/ChartInternal.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */








 // data



 // interactions

 // internals


 // used to retrieve radar Axis name














/**
 * Internal chart class.
 * - Note: Instantiated internally, not exposed for public.
 * @class ChartInternal
 * @ignore
 * @private
 */

var ChartInternal = /*#__PURE__*/function () {
  // API interface
  // config object
  // cache instance
  // elements
  // state variables
  // all Chart instances array within page (equivalent of 'bb.instances')
  // data object
  // Axis
  // Axis
  // scales
  // original values
  // formatter function
  // format function
  function ChartInternal(api) {
    this.api = void 0, this.config = void 0, this.cache = void 0, this.$el = void 0, this.state = void 0, this.charts = void 0, this.data = {
      xs: {},
      targets: []
    }, this.axis = void 0, this.scale = {
      x: null,
      y: null,
      y2: null,
      subX: null,
      subY: null,
      subY2: null,
      zoom: null
    }, this.org = {
      xScale: null,
      xDomain: null
    }, this.color = void 0, this.patterns = void 0, this.levelColor = void 0, this.point = void 0, this.brush = void 0, this.format = {
      extraLineClasses: null,
      xAxisTick: null,
      dataTime: null,
      // dataTimeFormat
      defaultAxisTime: null,
      // defaultAxisTimeFormat
      axisTime: null // axisTimeFormat

    };
    var $$ = this;
    $$.api = api, $$.config = new Options(), $$.cache = new Cache();
    var store = new Store();
    $$.$el = store.getStore("element"), $$.state = store.getStore("state");
  }

  var _proto = ChartInternal.prototype;
  return _proto.beforeInit = function beforeInit() {
    var $$ = this;
    $$.callPluginHook("$beforeInit"), callFn($$.config.onbeforeinit, $$.api);
  }, _proto.afterInit = function afterInit() {
    var $$ = this;
    $$.callPluginHook("$afterInit"), callFn($$.config.onafterinit, $$.api);
  }, _proto.init = function init() {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        $el = $$.$el;
    state.hasAxis = !$$.hasArcType(), state.hasRadar = !state.hasAxis && $$.hasType("radar"), $$.initParams();
    var bindto = {
      element: config.bindto,
      classname: "bb"
    };
    isObject(config.bindto) && (bindto.element = config.bindto.element || "#chart", bindto.classname = config.bindto.classname || bindto.classname), $el.chart = isFunction(bindto.element.node) ? config.bindto.element : (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(bindto.element || []), $el.chart.empty() && ($el.chart = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(browser_doc.body.appendChild(browser_doc.createElement("div")))), $el.chart.html("").classed(bindto.classname, !0), $$.initToRender();
  }
  /**
   * Initialize the rendering process
   * @param {boolean} forced Force to render process
   * @private
   */
  , _proto.initToRender = function initToRender(forced) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        chart = $$.$el.chart,
        isHidden = function () {
      return chart.style("display") === "none" || chart.style("visibility") === "hidden";
    },
        isLazy = config.render.lazy || isHidden(),
        MutationObserver = win.MutationObserver;

    if (isLazy && MutationObserver && config.render.observe !== !1 && !forced && new MutationObserver(function (mutation, observer) {
      isHidden() || (observer.disconnect(), !state.rendered && $$.initToRender(!0));
    }).observe(chart.node(), {
      attributes: !0,
      attributeFilter: ["class", "style"]
    }), !isLazy || forced) {
      var convertedData = $$.convertData(config, $$.initWithData);
      convertedData && $$.initWithData(convertedData), $$.afterInit();
    }
  }, _proto.initParams = function initParams() {
    var $$ = this,
        _ref = $$,
        config = _ref.config,
        format = _ref.format,
        state = _ref.state,
        isRotated = config.axis_rotated;

    if (state.datetimeId = "bb-" + +new Date(), $$.color = $$.generateColor(), $$.levelColor = $$.generateLevelColor(), $$.hasPointType() && ($$.point = $$.generatePoint()), state.hasAxis) {
      $$.initClip(), format.extraLineClasses = $$.generateExtraLineClass(), format.dataTime = config.data_xLocaltime ? external_commonjs_d3_time_format_commonjs2_d3_time_format_amd_d3_time_format_root_d3_.timeParse : external_commonjs_d3_time_format_commonjs2_d3_time_format_amd_d3_time_format_root_d3_.utcParse, format.axisTime = config.axis_x_localtime ? external_commonjs_d3_time_format_commonjs2_d3_time_format_amd_d3_time_format_root_d3_.timeFormat : external_commonjs_d3_time_format_commonjs2_d3_time_format_amd_d3_time_format_root_d3_.utcFormat;
      var isDragZoom = $$.config.zoom_enabled && $$.config.zoom_type === "drag";

      format.defaultAxisTime = function (d) {
        var _$$$scale = $$.scale,
            x = _$$$scale.x,
            zoom = _$$$scale.zoom,
            isZoomed = isDragZoom ? zoom : zoom && x.orgDomain().toString() !== zoom.domain().toString(),
            specifier = d.getMilliseconds() && ".%L" || d.getSeconds() && ".:%S" || d.getMinutes() && "%I:%M" || d.getHours() && "%I %p" || d.getDate() !== 1 && "%b %d" || isZoomed && d.getDate() === 1 && "%b\'%y" || d.getMonth() && "%-m/%-d" || "%Y";
        return format.axisTime(specifier)(d);
      };
    }

    state.isLegendRight = config.legend_position === "right", state.isLegendInset = config.legend_position === "inset", state.isLegendTop = config.legend_inset_anchor === "top-left" || config.legend_inset_anchor === "top-right", state.isLegendLeft = config.legend_inset_anchor === "top-left" || config.legend_inset_anchor === "bottom-left", state.rotatedPaddingRight = isRotated && !config.axis_x_show ? 0 : 30, state.inputType = convertInputType(config.interaction_inputType_mouse, config.interaction_inputType_touch);
  }, _proto.initWithData = function initWithData(data) {
    var $$ = this,
        config = $$.config,
        scale = $$.scale,
        state = $$.state,
        $el = $$.$el,
        org = $$.org,
        hasAxis = state.hasAxis,
        hasInteraction = config.interaction_enabled;
    hasAxis && ($$.axis = $$.getAxisInstance(), config.zoom_enabled && $$.initZoom()), $$.data.xs = {}, $$.data.targets = $$.convertDataToTargets(data), config.data_filter && ($$.data.targets = $$.data.targets.filter(config.data_filter.bind($$.api))), config.data_hide && $$.addHiddenTargetIds(config.data_hide === !0 ? $$.mapToIds($$.data.targets) : config.data_hide), config.legend_hide && $$.addHiddenLegendIds(config.legend_hide === !0 ? $$.mapToIds($$.data.targets) : config.legend_hide), $$.updateSizes(), $$.updateScales(!0);
    // retrieve scale after the 'updateScales()' is called
    var x = scale.x,
        y = scale.y,
        y2 = scale.y2,
        subX = scale.subX,
        subY = scale.subY,
        subY2 = scale.subY2; // Set domains for each scale

    if (x && (x.domain(sortValue($$.getXDomain($$.data.targets))), subX.domain(x.domain()), org.xDomain = x.domain()), y && (y.domain($$.getYDomain($$.data.targets, "y")), subY.domain(y.domain())), y2 && (y2.domain($$.getYDomain($$.data.targets, "y2")), subY2 && subY2.domain(y2.domain())), $el.svg = $el.chart.append("svg").style("overflow", "hidden").style("display", "block"), hasInteraction && state.inputType) {
      var isTouch = state.inputType === "touch";
      $el.svg.on(isTouch ? "touchstart" : "mouseenter", function () {
        return callFn(config.onover, $$.api);
      }).on(isTouch ? "touchend" : "mouseleave", function () {
        return callFn(config.onout, $$.api);
      });
    }

    config.svg_classname && $el.svg.attr("class", config.svg_classname);
    // Define defs
    var hasColorPatterns = isFunction(config.color_tiles) && $$.patterns;
    (hasAxis || hasColorPatterns || config.data_labels_backgroundColors) && ($el.defs = $el.svg.append("defs"), hasAxis && ["id", "idXAxis", "idYAxis", "idGrid"].forEach(function (v) {
      $$.appendClip($el.defs, state.clip[v]);
    }), $$.generateDataLabelBackgroundColorFilter(), hasColorPatterns && $$.patterns.forEach(function (p) {
      return $el.defs.append(function () {
        return p.node;
      });
    })), $$.updateSvgSize(), $$.bindResize();
    // Define regions
    var main = $el.svg.append("g").classed(config_classes.main, !0).attr("transform", $$.getTranslate("main"));

    // data.onmin/max callback
    if ($el.main = main, config.subchart_show && $$.initSubchart(), config.tooltip_show && $$.initTooltip(), config.title_text && $$.initTitle(), config.legend_show && $$.initLegend(), config.data_empty_label_text && main.append("text").attr("class", config_classes.text + " " + config_classes.empty).attr("text-anchor", "middle") // horizontal centering of text at x position in all browsers.
    .attr("dominant-baseline", "middle"), hasAxis && (config.regions.length && $$.initRegion(), !config.clipPath && $$.axis.init()), main.append("g").attr("class", config_classes.chart).attr("clip-path", state.clip.path), $$.callPluginHook("$init"), hasAxis && (hasInteraction && $$.initEventRect && $$.initEventRect(), $$.initGrid(), config.clipPath && $$.axis && $$.axis.init()), $$.initChartElements(), $$.updateTargets($$.data.targets), $$.updateDimension(), callFn(config.oninit, $$.api), $$.setBackground(), $$.redraw({
      withTransition: !1,
      withTransform: !0,
      withUpdateXDomain: !0,
      withUpdateOrgXDomain: !0,
      withTransitionForAxis: !1,
      initializing: !0
    }), config.data_onmin || config.data_onmax) {
      var minMax = $$.getMinMaxData();
      callFn(config.data_onmin, $$.api, minMax.min), callFn(config.data_onmax, $$.api, minMax.max);
    }

    config.tooltip_show && $$.initShowTooltip(), state.rendered = !0;
  }, _proto.initChartElements = function initChartElements() {
    var $$ = this,
        _$$$state = $$.state,
        hasAxis = _$$$state.hasAxis,
        hasRadar = _$$$state.hasRadar,
        types = [];
    hasAxis ? ["bar", "bubble", "candlestick", "line"].forEach(function (v) {
      var name = capitalize(v);
      (v === "line" && $$.hasTypeOf(name) || $$.hasType(v)) && types.push(name);
    }) : (!hasRadar && types.push("Arc", "Pie"), $$.hasType("gauge") ? types.push("Gauge") : hasRadar && types.push("Radar")), types.forEach(function (v) {
      $$["init" + v]();
    }), notEmpty($$.config.data_labels) && !$$.hasArcType(null, ["radar"]) && $$.initText();
  }
  /**
   * Get selection based on transition config
   * @param {d3Selection} selection Target selection
   * @param {string} name Transition name
   * @returns {d3Selection}
   * @private
   */
  , _proto.$T = function $T(selection, name) {
    var duration = this.config.transition_duration;
    return duration ? selection.transition(name).duration(duration) : selection;
  }, _proto.setChartElements = function setChartElements() {
    var $$ = this,
        _$$$$el = $$.$el,
        chart = _$$$$el.chart,
        svg = _$$$$el.svg,
        defs = _$$$$el.defs,
        main = _$$$$el.main,
        tooltip = _$$$$el.tooltip,
        legend = _$$$$el.legend,
        title = _$$$$el.title,
        grid = _$$$$el.grid,
        arc = _$$$$el.arcs,
        circles = _$$$$el.circle,
        bars = _$$$$el.bar,
        candlestick = _$$$$el.candlestick,
        lines = _$$$$el.line,
        areas = _$$$$el.area,
        texts = _$$$$el.text;
    $$.api.$ = {
      chart: chart,
      svg: svg,
      defs: defs,
      main: main,
      tooltip: tooltip,
      legend: legend,
      title: title,
      grid: grid,
      arc: arc,
      circles: circles,
      bar: {
        bars: bars
      },
      candlestick: candlestick,
      line: {
        lines: lines,
        areas: areas
      },
      text: {
        texts: texts
      }
    };
  }
  /**
   * Set background element/image
   * @private
   */
  , _proto.setBackground = function setBackground() {
    var $$ = this,
        bg = $$.config.background,
        state = $$.state,
        svg = $$.$el.svg;

    if (notEmpty(bg)) {
      var element = svg.select("g").insert(bg.imgUrl ? "image" : "rect", ":first-child");
      bg.imgUrl ? element.attr("href", bg.imgUrl) : bg.color && element.style("fill", bg.color).attr("clip-path", state.clip.path), element.attr("class", bg.class || null).attr("width", "100%").attr("height", "100%");
    }
  }
  /**
   * Update targeted element with given data
   * @param {object} targets Data object formatted as 'target'
   * @private
   */
  , _proto.updateTargets = function updateTargets(targets) {
    var $$ = this,
        _$$$state2 = $$.state,
        hasAxis = _$$$state2.hasAxis,
        hasRadar = _$$$state2.hasRadar;
    $$.updateTargetsForText(targets), hasAxis ? (["bar", "candlestick", "line"].forEach(function (v) {
      var name = capitalize(v);
      (v === "line" && $$.hasTypeOf(name) || $$.hasType(v)) && $$["updateTargetsFor" + name](targets.filter($$["is" + name + "Type"].bind($$)));
    }), $$.updateTargetsForSubchart && $$.updateTargetsForSubchart(targets)) : $$.hasArcType(targets) && (hasRadar ? $$.updateTargetsForRadar(targets.filter($$.isRadarType.bind($$))) : $$.updateTargetsForArc(targets.filter($$.isArcType.bind($$)))), ($$.hasType("bubble") || $$.hasType("scatter")) && $$.updateTargetForCircle && $$.updateTargetForCircle(), $$.showTargets();
  }
  /**
   * Display targeted elements
   * @private
   */
  , _proto.showTargets = function showTargets() {
    var $$ = this,
        config = $$.config,
        svg = $$.$el.svg;
    svg.selectAll("." + config_classes.target).filter(function (d) {
      return $$.isTargetToShow(d.id);
    }).transition().duration(config.transition_duration).style("opacity", null);
  }, _proto.getWithOption = function getWithOption(options) {
    var withOptions = {
      Y: !0,
      Subchart: !0,
      Transition: !0,
      EventRect: !0,
      Dimension: !0,
      TrimXDomain: !0,
      Transform: !1,
      UpdateXDomain: !1,
      UpdateOrgXDomain: !1,
      Legend: !1,
      UpdateXAxis: "UpdateXDomain",
      TransitionForExit: "Transition",
      TransitionForAxis: "Transition"
    };
    return Object.keys(withOptions).forEach(function (key) {
      var defVal = withOptions[key];
      isString(defVal) && (defVal = withOptions[defVal]), withOptions[key] = getOption(options, "with" + key, defVal);
    }), withOptions;
  }, _proto.initialOpacity = function initialOpacity(d) {
    var $$ = this,
        withoutFadeIn = $$.state.withoutFadeIn;
    return $$.getBaseValue(d) !== null && withoutFadeIn[d.id] ? null : "0";
  }, _proto.bindResize = function bindResize() {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        resizeFunction = generateResize(),
        list = [];
    list.push(function () {
      return callFn(config.onresize, $$, $$.api);
    }), config.resize_auto && list.push(function () {
      state.resizing = !0, $$.api.flush(!1);
    }), list.push(function () {
      callFn(config.onresized, $$, $$.api), state.resizing = !1;
    }), list.forEach(function (v) {
      return resizeFunction.add(v);
    }), $$.resizeFunction = resizeFunction, win.addEventListener("resize", $$.resizeFunction = resizeFunction);
  }
  /**
   * Call plugin hook
   * @param {string} phase The lifecycle phase
   * @param {Array} args Arguments
   * @private
   */
  , _proto.callPluginHook = function callPluginHook(phase) {
    for (var _this = this, _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];

    this.config.plugins.forEach(function (v) {
      phase === "$beforeInit" && (v.$$ = _this, _this.api.plugins.push(v)), v[phase].apply(v, args);
    });
  }, ChartInternal;
}();


extend(ChartInternal.prototype, [// common
convert, data_data, load, category, internals_class, internals_color, domain, interactions_interaction, format, internals_legend, redraw, scale, shape, size, internals_text, internals_title, internals_tooltip, transform, type]);
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
  var target,
      keys,
      read,
      thisConfig = this.config,
      find = function () {
    var key = keys.shift();
    return key && target && isObjectType(target) && key in target ? (target = target[key], find()) : key ? undefined : target;
  };

  Object.keys(thisConfig).forEach(function (key) {
    target = config, keys = key.split("_"), read = find(), isDefined(read) && (thisConfig[key] = read);
  });
}
;// CONCATENATED MODULE: ./src/Chart/api/chart.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


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
  resize: function resize(size) {
    var $$ = this.internal,
        config = $$.config,
        state = $$.state;
    state.rendered && (config.size_width = size ? size.width : null, config.size_height = size ? size.height : null, state.resizing = !0, this.flush(!1, !0), $$.resizeFunction());
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
  flush: function flush(soft) {
    var _zoomResetBtn,
        $$ = this.internal,
        state = $$.state,
        zoomResetBtn = $$.$el.zoomResetBtn;

    state.rendered ? (state.resizing ? $$.brush && $$.brush.updateResize() : $$.axis && $$.axis.setOrient(), (_zoomResetBtn = zoomResetBtn) != null && _zoomResetBtn.style("display", "none"), $$.scale.zoom = null, soft ? $$.redraw({
      withTransform: !0,
      withUpdateXDomain: !0,
      withUpdateOrgXDomain: !0,
      withLegend: !0
    }) : $$.updateAndRedraw({
      withLegend: !0,
      withTransition: !1,
      withTransitionForTransform: !1
    }), !state.resizing && $$.brush && ($$.brush.getSelection().call($$.brush.move), $$.unselectRect())) : $$.initToRender(!0);
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
  destroy: function destroy() {
    var _this = this,
        $$ = this.internal,
        _$$$$el = $$.$el,
        chart = _$$$$el.chart,
        svg = _$$$$el.svg;

    if (notEmpty($$)) // release prototype chains
      for (var _key in $$.callPluginHook("$willDestroy"), $$.charts.splice($$.charts.indexOf(this), 1), svg.select("*").interrupt(), $$.resizeFunction.clear(), win.removeEventListener("resize", $$.resizeFunction), chart.classed("bb", !1).html(""), Object.keys(this).forEach(function (key) {
        key === "internal" && Object.keys($$).forEach(function (k) {
          $$[k] = null;
        }), _this[key] = null, delete _this[key];
      }), this) this[_key] = function () {};
    return null;
  },

  /**
   * Get or set single config option value.
   * @function config
   * @instance
   * @memberof Chart
   * @param {string} name The option key name.
   * @param {*} [value] The value accepted for indicated option.
   * @param {boolean} [redraw] Set to redraw with the new option changes.
   * - **NOTE:** Doesn't guarantee work in all circumstances. It can be applied for limited options only.
   * @returns {*}
   * @example
   * // Getter
   * chart.config("gauge.max");
   *
   * // Setter
   * chart.config("gauge.max", 100);
   *
   * // Setter & redraw with the new option
   * chart.config("gauge.max", 100, true);
   */
  config: function (name, value, redraw) {
    var res,
        $$ = this.internal,
        config = $$.config,
        key = name && name.replace(/\./g, "_");
    return key in config && (isDefined(value) ? (config[key] = value, res = value, redraw && this.flush()) : res = config[key]), res;
  }
});
;// CONCATENATED MODULE: ./src/Chart/api/color.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
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
  color: function color(id) {
    return this.internal.color(id); // more patterns
  }
});
;// CONCATENATED MODULE: ./src/Chart/api/data.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Get data loaded in the chart.
 * @function data
 * @instance
 * @memberof Chart
 * @param {string|Array} targetIds If this argument is given, this API returns the specified target data. If this argument is not given, all of data will be returned.
 * @returns {Array} Data objects
 * @example
 * // Get only data1 data
 * chart.data("data1");
 * // --> [{id: "data1", id_org: "data1", values: Array(6)}, ...]
 *
 * // Get data1 and data2 data
 * chart.data(["data1", "data2"]);
 *
 * // Get all data
 * chart.data();
 */
function api_data_data(targetIds) {
  var targets = this.internal.data.targets;

  if (!isUndefined(targetIds)) {
    var ids = isArray(targetIds) ? targetIds : [targetIds];
    return targets.filter(function (t) {
      return ids.some(function (v) {
        return v === t.id;
      });
    });
  }

  return targets;
}

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
  shown: function shown(targetIds) {
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
  values: function (targetIds, flat) {
    flat === void 0 && (flat = !0);
    var values = null;

    if (targetIds) {
      var targets = this.data(targetIds);
      targets && isArray(targets) && (values = [], targets.forEach(function (v) {
        var dataValue = v.values.map(function (d) {
          return d.value;
        });
        flat ? values = values.concat(dataValue) : values.push(dataValue);
      }));
    }

    return values;
  },

  /**
   * Get and set names of the data loaded in the chart.
   * @function data․names
   * @instance
   * @memberof Chart
   * @param {object} names If this argument is given, the names of data will be updated. If not given, the current names will be returned. The format of this argument is the same as
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
   *});
   */
  names: function names(_names) {
    var $$ = this.internal;
    return $$.updateDataAttributes("names", _names);
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
  colors: function colors(_colors) {
    return this.internal.updateDataAttributes("colors", _colors);
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
  axes: function axes(_axes) {
    return this.internal.updateDataAttributes("axes", _axes);
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
  min: function min() {
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
  max: function max() {
    return this.internal.getMinMaxData().max;
  }
});
/* harmony default export */ var api_data = ({
  data: api_data_data
});
;// CONCATENATED MODULE: ./src/Chart/api/export.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/**
 * Encode to base64
 * @param {string} str string to be encoded
 * @returns {string}
 * @private
 * @see https://developer.mozilla.org/ko/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 */
var b64EncodeUnicode = function (str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p) {
    return String.fromCharCode(+("0x" + p));
  }));
};
/**
 * Convert svg node to data url
 * @param {HTMLElement} node target node
 * @param {object} option object containing {width, height, preserveAspectRatio}
 * @param {object} orgSize object containing {width, height}
 * @returns {string}
 * @private
 */


function nodeToSvgDataUrl(node, option, orgSize) {
  var _ref = option || orgSize,
      width = _ref.width,
      height = _ref.height,
      serializer = new XMLSerializer(),
      clone = node.cloneNode(!0),
      cssText = getCssRules(toArray(browser_doc.styleSheets)).filter(function (r) {
    return r.cssText;
  }).map(function (r) {
    return r.cssText;
  });

  clone.setAttribute("xmlns", external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.namespaces.xhtml);
  var nodeXml = serializer.serializeToString(clone),
      style = browser_doc.createElement("style"); // escape css for XML

  style.appendChild(browser_doc.createTextNode(cssText.join("\n")));
  var styleXml = serializer.serializeToString(style),
      dataStr = ("<svg xmlns=\"" + external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.namespaces.svg + "\" width=\"" + width + "\" height=\"" + height + "\" \n\t\tviewBox=\"0 0 " + orgSize.width + " " + orgSize.height + "\" \n\t\tpreserveAspectRatio=\"" + (option && option.preserveAspectRatio === !1 ? "none" : "xMinYMid meet") + "\">\n\t\t\t<foreignObject width=\"100%\" height=\"100%\">\n\t\t\t\t" + styleXml + "\n\t\t\t\t" + nodeXml.replace(/(url\()[^#]+/g, "$1") + "\n\t\t\t</foreignObject></svg>").replace("/\n/g", "%0A"); // foreignObject not supported in IE11 and below
  // https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx

  return "data:image/svg+xml;base64," + b64EncodeUnicode(dataStr);
}

/* harmony default export */ var api_export = ({
  /**
   * Export chart as an image.
   * - **NOTE:**
   *   - IE11 and below not work properly due to the lack of the feature(<a href="https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx">foreignObject</a>) support
   *   - The basic CSS file(ex. billboard.css) should be at same domain as API call context to get correct styled export image.
   * @function export
   * @instance
   * @memberof Chart
   * @param {object} option Export option
   * @param {string} [option.mimeType="image/png"] The desired output image format. (ex. 'image/png' for png, 'image/jpeg' for jpeg format)
   * @param {number} [option.width={currentWidth}] width
   * @param {number} [option.height={currentHeigth}] height
   * @param {boolean} [option.preserveAspectRatio=true] Preserve aspect ratio on given size
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
   *      mimeType: "image/png"
   *    },
   *    dataUrl => { ... }
   *  );
   */
  export: function _export(option, callback) {
    var _this = this,
        $$ = this.internal,
        state = $$.state,
        chart = $$.$el.chart,
        _state$current = state.current,
        width = _state$current.width,
        height = _state$current.height,
        opt = mergeObj({
      width: width,
      height: height,
      preserveAspectRatio: !0,
      mimeType: "image/png"
    }, option),
        svgDataUrl = nodeToSvgDataUrl(chart.node(), opt, {
      width: width,
      height: height
    });

    if (callback && isFunction(callback)) {
      var img = new Image();
      img.crossOrigin = "Anonymous", img.onload = function () {
        var canvas = browser_doc.createElement("canvas"),
            ctx = canvas.getContext("2d");
        canvas.width = opt.width || width, canvas.height = opt.height || height, ctx.drawImage(img, 0, 0), callback.bind(_this)(canvas.toDataURL(opt.mimeType));
      }, img.src = svgDataUrl;
    }

    return svgDataUrl;
  }
});
;// CONCATENATED MODULE: ./src/Chart/api/focus.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


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
  focus: function focus(targetIdsValue) {
    var $$ = this.internal,
        state = $$.state,
        targetIds = $$.mapToTargetIds(targetIdsValue),
        candidates = $$.$el.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$)));
    this.revert(), this.defocus(), candidates.classed(config_classes.focused, !0).classed(config_classes.defocused, !1), $$.hasArcType() && !state.hasRadar && ($$.expandArc(targetIds), $$.hasType("gauge") && $$.markOverlapped(targetIdsValue, $$, "." + config_classes.gaugeValue)), $$.toggleFocusLegend(targetIds, !0), state.focusedTargetIds = targetIds, state.defocusedTargetIds = state.defocusedTargetIds.filter(function (id) {
      return targetIds.indexOf(id) < 0;
    });
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
  defocus: function defocus(targetIdsValue) {
    var $$ = this.internal,
        state = $$.state,
        targetIds = $$.mapToTargetIds(targetIdsValue),
        candidates = $$.$el.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$)));
    candidates.classed(config_classes.focused, !1).classed(config_classes.defocused, !0), $$.hasArcType() && ($$.unexpandArc(targetIds), $$.hasType("gauge") && $$.undoMarkOverlapped($$, "." + config_classes.gaugeValue)), $$.toggleFocusLegend(targetIds, !1), state.focusedTargetIds = state.focusedTargetIds.filter(function (id) {
      return targetIds.indexOf(id) < 0;
    }), state.defocusedTargetIds = targetIds;
  },

  /**
   * This API reverts specified targets.<br><br>
   * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be reverted.
   * @function revert
   * @instance
   * @memberof Chart
   * @param {string|Array} targetIdsValue Target ids to be reverted
   * @example
   * // data1 will be reverted.
   * chart.revert("data1");
   *
   * // data1 and data2 will be reverted.
   * chart.revert(["data1", "data2"]);
   *
   * // all targets will be reverted.
   * chart.revert();
   */
  revert: function revert(targetIdsValue) {
    var $$ = this.internal,
        config = $$.config,
        state = $$.state,
        $el = $$.$el,
        targetIds = $$.mapToTargetIds(targetIdsValue),
        candidates = $el.svg.selectAll($$.selectorTargets(targetIds));
    // should be for all targets
    candidates.classed(config_classes.focused, !1).classed(config_classes.defocused, !1), $$.hasArcType() && $$.unexpandArc(targetIds), config.legend_show && ($$.showLegend(targetIds.filter($$.isLegendToShow.bind($$))), $el.legend.selectAll($$.selectorLegends(targetIds)).filter(function () {
      return (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed(config_classes.legendItemFocused);
    }).classed(config_classes.legendItemFocused, !1)), state.focusedTargetIds = [], state.defocusedTargetIds = [];
  }
});
;// CONCATENATED MODULE: ./src/Chart/api/legend.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Define legend
 * @ignore
 */
var legend_legend = {
  /**
   * Show legend for each target.
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
  show: function show(targetIds) {
    var $$ = this.internal;
    $$.showLegend($$.mapToTargetIds(targetIds)), $$.updateAndRedraw({
      withLegend: !0
    });
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
  hide: function hide(targetIds) {
    var $$ = this.internal;
    $$.hideLegend($$.mapToTargetIds(targetIds)), $$.updateAndRedraw({
      withLegend: !0
    });
  }
};
/* harmony default export */ var api_legend = ({
  legend: legend_legend
});
;// CONCATENATED MODULE: ./src/Chart/api/load.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


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
   *    | Key | Description |
   *    | --- | --- |
   *    | - url<br>- json<br>- rows<br>- columns | The data will be loaded. If data that has the same target id is given, the chart will be updated. Otherwise, new target will be added |
   *    | data | Data objects to be loaded. Checkout the example. |
   *    | append | Load data appending it to the current dataseries.<br>If the existing chart has`x` value, should provide with corresponding `x` value for newly loaded data.  |
   *    | names | Same as data.names() |
   *    | xs | Same as data.xs option  |
   *    | classes | The classes specified by data.classes will be updated. classes must be Object that has target id as keys. |
   *    | categories | The categories specified by axis.x.categories or data.x will be updated. categories must be Array. |
   *    | axes | The axes specified by data.axes will be updated. axes must be Object that has target id as keys. |
   *    | colors | The colors specified by data.colors will be updated. colors must be Object that has target id as keys. |
   *    | headers |  Set request header if loading via `data.url`.<br>@see [data․headers](Options.html#.data%25E2%2580%25A4headers) |
   *    | keys |  Choose which JSON objects keys correspond to desired data.<br>**NOTE:** Only for JSON object given as array.<br>@see [data․keys](Options.html#.data%25E2%2580%25A4keys) |
   *    | mimeType |  Set 'json' if loading JSON via url.<br>@see [data․mimeType](Options.html#.data%25E2%2580%25A4mimeType) |
   *    | - type<br>- types | The type of targets will be updated. type must be String and types must be Object. |
   *    | unload | Specify the data will be unloaded before loading new data. If true given, all of data will be unloaded. If target ids given as String or Array, specified targets will be unloaded. If absent or false given, unload will not occur. |
   *    | done | The specified function will be called after data loaded.|
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
   */
  load: function load(args) {
    var $$ = this.internal,
        config = $$.config;
    // update xs if specified
    // update names if exists
    // update classes if exists
    // update axes if exists
    // update colors if exists
    args.xs && $$.addXs(args.xs), "names" in args && this.data.names(args.names), "classes" in args && Object.keys(args.classes).forEach(function (id) {
      config.data_classes[id] = args.classes[id];
    }), "categories" in args && $$.axis.isCategorized() && (config.axis_x_categories = args.categories), "axes" in args && Object.keys(args.axes).forEach(function (id) {
      config.data_axes[id] = args.axes[id];
    }), "colors" in args && Object.keys(args.colors).forEach(function (id) {
      config.data_colors[id] = args.colors[id];
    }), "unload" in args && args.unload !== !1 ? $$.unload($$.mapToTargetIds(args.unload === !0 ? null : args.unload), function () {
      // to mitigate improper rendering for multiple consecutive calls
      // https://github.com/naver/billboard.js/issues/2121
      win.requestIdleCallback(function () {
        return $$.loadFromArgs(args);
      });
    }) : $$.loadFromArgs(args);
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
   * @example
   *  // Unload data2 and data3
   *  chart.unload({
   *    ids: ["data2", "data3"],
   *    done: function() {
   *       // called after the unloaded
   *    }
   *  });
   */
  unload: function unload(argsValue) {
    var _this = this,
        $$ = this.internal,
        args = argsValue || {};

    isArray(args) ? args = {
      ids: args
    } : isString(args) && (args = {
      ids: [args]
    });
    var ids = $$.mapToTargetIds(args.ids);
    $$.unload(ids, function () {
      $$.redraw({
        withUpdateOrgXDomain: !0,
        withUpdateXDomain: !0,
        withLegend: !0
      }), $$.cache.remove(ids), args.done && args.done.call(_this);
    });
  }
});
;// CONCATENATED MODULE: ./src/Chart/api/show.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Show/Hide data series
 * @param {boolean} show Show or hide
 * @param {Array} targetIdsValue Target id values
 * @param {object} options Options
 * @private
 */

function showHide(show, targetIdsValue, options) {
  var _this = this,
      $$ = this.internal,
      targetIds = $$.mapToTargetIds(targetIdsValue),
      hiddenIds = $$.state.hiddenTargetIds.map(function (v) {
    return targetIds.indexOf(v) > -1 && v;
  }).filter(Boolean);

  $$.state.toggling = !0, $$[(show ? "remove" : "add") + "HiddenTargetIds"](targetIds);
  var targets = $$.$el.svg.selectAll($$.selectorTargets(targetIds)),
      opacity = show ? null : "0";
  show && hiddenIds.length && (targets.style("display", null), callFn($$.config.data_onshown, this, hiddenIds)), targets.transition().style("opacity", opacity, "important").call(endall, function () {
    show || hiddenIds.length !== 0 || (targets.style("display", "none"), callFn($$.config.data_onhidden, _this, targetIds)), targets.style("opacity", opacity);
  }), options.withLegend && $$[(show ? "show" : "hide") + "Legend"](targetIds), $$.redraw({
    withUpdateOrgXDomain: !0,
    withUpdateXDomain: !0,
    withLegend: !0
  }), $$.state.toggling = !1;
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
  show: function show(targetIdsValue, options) {
    options === void 0 && (options = {}), showHide.call(this, !0, targetIdsValue, options);
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
  hide: function hide(targetIdsValue, options) {
    options === void 0 && (options = {}), showHide.call(this, !1, targetIdsValue, options);
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
  toggle: function toggle(targetIds, options) {
    var _this2 = this;

    options === void 0 && (options = {});
    var $$ = this.internal,
        targets = {
      show: [],
      hide: []
    };
    // sort show & hide target ids
    // perform show & hide task separately
    // https://github.com/naver/billboard.js/issues/454
    $$.mapToTargetIds(targetIds).forEach(function (id) {
      return targets[$$.isTargetToShow(id) ? "hide" : "show"].push(id);
    }), targets.show.length && this.show(targets.show, options), targets.hide.length && setTimeout(function () {
      return _this2.hide(targets.hide, options);
    }, 0);
  }
});
;// CONCATENATED MODULE: ./src/Chart/api/tooltip.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Define tooltip
 * @ignore
 */

var tooltip_tooltip = {
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
  show: function show(args) {
    var index,
        mouse,
        $$ = this.internal,
        config = $$.config,
        inputType = $$.state.inputType;

    // determine focus data
    if (args.mouse && (mouse = args.mouse), args.data) {
      var data = args.data,
          y = $$.getYScaleById(data.id)(data.value);
      $$.isMultipleX() ? mouse = [$$.scale.x(data.x), y] : (!config.tooltip_grouped && (mouse = [0, y]), index = isValue(data.index) ? data.index : $$.getIndexByX(data.x));
    } else isDefined(args.x) ? index = $$.getIndexByX(args.x) : isDefined(args.index) && (index = args.index);

    (inputType === "mouse" ? ["mouseover", "mousemove"] : ["touchstart"]).forEach(function (eventName) {
      $$.dispatchEvent(eventName, index, mouse);
    });
  },

  /**
   * Hide tooltip
   * @function tooltip․hide
   * @instance
   * @memberof Chart
   */
  hide: function hide() {
    var $$ = this.internal,
        inputType = $$.state.inputType,
        tooltip = $$.$el.tooltip,
        data = tooltip && tooltip.datum();

    if (data) {
      var index = JSON.parse(data.current)[0].index; // make to finalize, possible pending event flow set from '.tooltip.show()' call

      (inputType === "mouse" ? ["mouseout"] : ["touchend"]).forEach(function (eventName) {
        $$.dispatchEvent(eventName, index);
      });
    } // reset last touch point index


    inputType === "touch" && $$.callOverOutForTouch(), $$.hideTooltip(!0), $$.hideGridFocus(), $$.unexpandCircles && $$.unexpandCircles(), $$.expandBarTypeShapes(!1);
  }
};
/* harmony default export */ var api_tooltip = ({
  tooltip: tooltip_tooltip
});
;// CONCATENATED MODULE: ./src/Chart/Chart.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */












/**
 * Main chart class.
 * - Note: Instantiated via `bb.generate()`.
 * @class Chart
 * @example
 * var chart = bb.generate({
 *  data: {
 *    columns: [
 *        ["x", "2015-11-02", "2015-12-01", "2016-01-01", "2016-02-01", "2016-03-01"],
 *        ["count1", 11, 8, 7, 6, 5 ],
 *        ["count2", 9, 3, 6, 2, 8 ]
 *   ]}
 * }
 * @see {@link bb.generate} for the initialization.
 */

/**
 * Access instance's primary node elements
 * @member {object} $
 * @property {object} $ Access instance's primary node elements
 * @property {d3.selection} $.chart Wrapper element
 * @property {d3.selection} $.svg Main svg element
 * @property {d3.selection} $.defs Definition element
 * @property {d3.selection} $.main Main grouping element
 * @property {d3.selection} $.tooltip Tooltip element
 * @property {d3.selection} $.legend Legend element
 * @property {d3.selection} $.title Title element
 * @property {d3.selection} $.grid Grid element
 * @property {d3.selection} $.arc Arc element
 * @property {d3.selection} $.circles Data point circle elements
 * @property {object} $.bar Bar element object
 * @property {d3.selection} $.bar.bars Bar elements
 * @property {d3.selection} $.candlestick Candlestick elements
 * @property {object} $.line Line element object
 * @property {d3.selection} $.line.lines Line elements
 * @property {d3.selection} $.line.areas Areas elements
 * @property {object} $.text Text element object
 * @property {d3.selection} $.text.texts Data label text elements
 * @memberof Chart
 * @example
 * var chart = bb.generate({ ... });
 *
 * chart.$.chart; // wrapper element
 * chart.$.line.circles;  // all data point circle elements
 */

/**
 * Plugin instance array
 * @member {Array} plugins
 * @memberof Chart
 * @example
 *  var chart = bb.generate({
 *     ...
 *     plugins: [
 *        new bb.plugin.stanford({ ... }),
 *        new PluginA()
 *     ]
 *  });
 *
 *  chart.plugins; // [Stanford, PluginA] - instance array
 */

var Chart = function Chart(options) {
  this.plugins = [], this.internal = void 0;
  var $$ = new ChartInternal(this);
  // bind to namespaced APIs
  this.internal = $$, function bindThis(fn, target, argThis) {
    Object.keys(fn).forEach(function (key) {
      var isFunc = isFunction(fn[key]),
          isChild = target !== argThis,
          isNotNil = notEmpty(fn[key]),
          hasChild = isNotNil && Object.keys(fn[key]).length > 0;
      target[key] = isFunc && (!isChild && hasChild || isChild) ? fn[key].bind(argThis) : isNotNil && !isFunc ? {} : fn[key], hasChild && bindThis(fn[key], target[key], argThis);
    });
  }(Chart.prototype, this, this), loadConfig.call($$, options), $$.beforeInit(), $$.init();
}; // extend common APIs as part of Chart class



extend(Chart.prototype, [chart, api_color, api_data, api_export, api_focus, api_legend, api_load, show, api_tooltip]);
;// CONCATENATED MODULE: ./src/Chart/api/axis.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Set the min/max value
 * @param {Chart} $$ Chart instance
 * @param {string} type Set type 'min' or 'max'
 * @param {object} value Value to be set
 * @private
 */

function setMinMax($$, type, value) {
  var config = $$.config,
      axisY = "axis_y_" + type,
      axisY2 = "axis_y2_" + type;
  isDefined(value) && (isObjectType(value) ? (isValue(value.x) && (config["axis_x_" + type] = value.x), isValue(value.y) && (config[axisY] = value.y), isValue(value.y2) && (config[axisY2] = value.y2)) : (config[axisY] = value, config[axisY2] = value), $$.redraw({
    withUpdateOrgXDomain: !0,
    withUpdateXDomain: !0
  }));
}
/**
 * Get the min/max value
 * @param {Chart} $$ Chart instance
 * @param {string} type Set type 'min' or 'max'
 * @returns {{x, y, y2}}
 * @private
 */


function axis_getMinMax($$, type) {
  var config = $$.config;
  return {
    x: config["axis_x_" + type],
    y: config["axis_y_" + type],
    y2: config["axis_y2_" + type]
  };
}
/**
 * Define axis
 * @ignore
 */


var axis = {
  /**
   * Get and set axis labels.
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
  labels: function labels(_labels) {
    var labelText,
        $$ = this.internal;
    return _labels && (Object.keys(_labels).forEach(function (axisId) {
      $$.axis.setLabelText(axisId, _labels[axisId]);
    }), $$.axis.updateLabels()), ["x", "y", "y2"].forEach(function (v) {
      var text = $$.axis.getLabelText(v);
      text && (!labelText && (labelText = {}), labelText[v] = text);
    }), labelText;
  },

  /**
   * Get and set axis min value.
   * @function axis․min
   * @instance
   * @memberof Chart
   * @param {object} min If min is given, specified axis' min value will be updated.<br>
   *     If no argument is given, the min values set on generating option for each axis will be returned.
   *     If not set any min values on generation, it will return `undefined`.
   * @returns {object|undefined}
   * @example
   * // Update axis' min
   * chart.axis.min({
   *   x: -10,
   *   y: 1000,
   *   y2: 100
   * });
   */
  min: function min(_min) {
    var $$ = this.internal;
    return isValue(_min) ? setMinMax($$, "min", _min) : axis_getMinMax($$, "min");
  },

  /**
   * Get and set axis max value.
   * @function axis․max
   * @instance
   * @memberof Chart
   * @param {object} max If max is given, specified axis' max value will be updated.<br>
   *     If no argument is given, the max values set on generating option for each axis will be returned.
   *     If not set any max values on generation, it will return `undefined`.
   * @returns {object|undefined}
   * @example
   * // Update axis' label
   * chart.axis.max({
   *    x: 100,
   *    y: 1000,
   *    y2: 10000
   * });
   */
  max: function max(_max) {
    var $$ = this.internal;
    return arguments.length ? setMinMax($$, "max", _max) : axis_getMinMax($$, "max");
  },

  /**
   * Get and set axis min and max value.
   * @function axis․range
   * @instance
   * @memberof Chart
   * @param {object} range If range is given, specified axis' min and max value will be updated. If no argument is given, the current min and max values for each axis will be returned.
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
   */
  range: function range(_range) {
    var axis = this.axis;
    if (arguments.length) isDefined(_range.max) && axis.max(_range.max), isDefined(_range.min) && axis.min(_range.min);else return {
      max: axis.max(),
      min: axis.min()
    };
    return undefined;
  }
};
/* harmony default export */ var api_axis = ({
  axis: axis
});
;// CONCATENATED MODULE: ./src/Chart/api/category.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
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
  category: function category(i, _category) {
    var $$ = this.internal,
        config = $$.config;
    return arguments.length > 1 && (config.axis_x_categories[i] = _category, $$.redraw()), config.axis_x_categories[i];
  },

  /**
   * Set category names on category axis.
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
  categories: function categories(_categories) {
    var $$ = this.internal,
        config = $$.config;
    return arguments.length ? (config.axis_x_categories = _categories, $$.redraw(), config.axis_x_categories) : config.axis_x_categories;
  }
});
;// CONCATENATED MODULE: ./src/Chart/api/grid.x.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Update x grid lines.
 * @function xgrids
 * @instance
 * @memberof Chart
 * @param {Array} grids X grid lines will be replaced with this argument. The format of this argument is the same as grid.x.lines.
 * @returns {object}
 * @example
 *  // Show 2 x grid lines
 * chart.xgrids([
 *    {value: 1, text: "Label 1"},
 *    {value: 4, text: "Label 4"}
 * ]);
 * // --> Returns: [{value: 1, text: "Label 1"}, {value: 4, text: "Label 4"}]
 */
function xgrids(grids) {
  var $$ = this.internal,
      config = $$.config;
  return grids ? (config.grid_x_lines = grids, $$.redrawWithoutRescale(), config.grid_x_lines) : config.grid_x_lines;
}

extend(xgrids, {
  /**
   * Add x grid lines.<br>
   * This API adds new x grid lines instead of replacing like xgrids.
   * @function xgrids․add
   * @instance
   * @memberof Chart
   * @param {Array|object} grids New x grid lines will be added. The format of this argument is the same as grid.x.lines and it's possible to give an Object if only one line will be added.
   * @returns {object}
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
  add: function add(grids) {
    return this.xgrids(this.internal.config.grid_x_lines.concat(grids || []));
  },

  /**
   * Remove x grid lines.<br>
   * This API removes x grid lines.
   * @function xgrids․remove
   * @instance
   * @memberof Chart
   * @param {object} params This argument should include value or class. If value is given, the x grid lines that have specified x value will be removed. If class is given, the x grid lines that have specified class will be removed. If args is not given, all of x grid lines will be removed.
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
  remove: function remove(params) {
    // TODO: multiple
    this.internal.removeGridLines(params, !0);
  }
});
/* harmony default export */ var grid_x = ({
  xgrids: xgrids
});
;// CONCATENATED MODULE: ./src/Chart/api/grid.y.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Update y grid lines.
 * @function ygrids
 * @instance
 * @memberof Chart
 * @param {Array} grids Y grid lines will be replaced with this argument. The format of this argument is the same as grid.y.lines.
 * @returns {object}
 * @example
 *  // Show 2 y grid lines
 * chart.ygrids([
 *    {value: 100, text: "Label 1"},
 *    {value: 400, text: "Label 4"}
 * ]);
 * // --> Returns: [{value: 100, text: "Label 1"}, {value: 400, text: "Label 4"}]
 */

function ygrids(grids) {
  var $$ = this.internal,
      config = $$.config;
  return grids ? (config.grid_y_lines = grids, $$.redrawWithoutRescale(), config.grid_y_lines) : config.grid_y_lines;
}

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
  add: function add(grids) {
    return this.ygrids(this.internal.config.grid_y_lines.concat(grids || []));
  },

  /**
   * Remove y grid lines.<br>
   * This API removes x grid lines.
   * @function ygrids․remove
   * @instance
   * @memberof Chart
   * @param {object} params This argument should include value or class. If value is given, the y grid lines that have specified y value will be removed. If class is given, the y grid lines that have specified class will be removed. If args is not given, all of y grid lines will be removed.
   * @param {number} [params.value] target value
   * @param {string} [params.class] target class
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
  remove: function remove(params) {
    // TODO: multiple
    this.internal.removeGridLines(params, !1);
  }
});
/* harmony default export */ var grid_y = ({
  ygrids: ygrids
});
;// CONCATENATED MODULE: ./src/Chart/api/group.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

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
  groups: function groups(_groups) {
    var $$ = this.internal,
        config = $$.config;
    return isUndefined(_groups) ? config.data_groups : (config.data_groups = _groups, $$.redraw(), config.data_groups);
  }
});
;// CONCATENATED MODULE: ./src/Chart/api/regions.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



/**
 * Update regions.
 * @function regions
 * @instance
 * @memberof Chart
 * @param {Array} regions Regions will be replaced with this argument. The format of this argument is the same as regions.
 * @returns {Array} regions
 * @example
 * // Show 2 regions
 * chart.regions([
 *    {axis: "x", start: 5, class: "regionX"},
 *    {axis: "y", end: 50, class: "regionY"}
 * ]);
 */
function regions(regions) {
  var $$ = this.internal,
      config = $$.config;
  return regions ? (config.regions = regions, $$.redrawWithoutRescale(), regions) : config.regions;
}

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
   *    {axis: "x", start: 5, class: "regionX"}
   * );
   *
   * // Add new regions
   * chart.regions.add([
   *    {axis: "x", start: 5, class: "regionX"},
   *    {axis: "y", end: 50, class: "regionY"}
   *]);
   */
  add: function add(regions) {
    var $$ = this.internal,
        config = $$.config;
    return regions ? (config.regions = config.regions.concat(regions), $$.redrawWithoutRescale(), config.regions) : config.regions;
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
  remove: function remove(optionsValue) {
    var $$ = this.internal,
        config = $$.config,
        options = optionsValue || {},
        duration = getOption(options, "duration", config.transition_duration),
        classes = getOption(options, "classes", [config_classes.region]),
        regions = $$.$el.main.select("." + config_classes.regions).selectAll(classes.map(function (c) {
      return "." + c;
    }));
    return (duration ? regions.transition().duration(duration) : regions).style("opacity", "0").remove(), regions = config.regions, Object.keys(options).length ? (regions = regions.filter(function (region) {
      var found = !1;
      return !region.class || (region.class.split(" ").forEach(function (c) {
        classes.indexOf(c) >= 0 && (found = !0);
      }), !found);
    }), config.regions = regions) : config.regions = [], regions;
  }
});
/* harmony default export */ var api_regions = ({
  regions: regions
});
;// CONCATENATED MODULE: ./src/Chart/api/x.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

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
  x: function x(_x) {
    var $$ = this.internal,
        axis = $$.axis,
        data = $$.data,
        isCategorized = axis.isCustomX() && axis.isCategorized();
    return isArray(_x) && (isCategorized ? this.categories(_x) : ($$.updateTargetX(data.targets, _x), $$.redraw({
      withUpdateOrgXDomain: !0,
      withUpdateXDomain: !0
    }))), isCategorized ? this.categories() : data.xs;
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
  xs: function xs(_xs) {
    var $$ = this.internal;
    return isObject(_xs) && ($$.updateTargetXs($$.data.targets, _xs), $$.redraw({
      withUpdateOrgXDomain: !0,
      withUpdateXDomain: !0
    })), $$.data.xs;
  }
});
;// CONCATENATED MODULE: ./src/Chart/api/flow.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

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
  flow: function flow(args) {
    var data,
        domain,
        diff,
        to,
        $$ = this.internal,
        length = 0,
        tail = 0;

    if ((args.json || args.rows || args.columns) && (data = $$.convertData(args)), !$$.state.redrawing && data && isTabVisible()) {
      var notfoundIds = [],
          orgDataCount = $$.getMaxDataCount(),
          targets = $$.convertDataToTargets(data, !0),
          isTimeSeries = $$.axis.isTimeSeries();
      $$.data.targets.forEach(function (t) {
        for (var found = !1, i = 0; i < targets.length; i++) if (t.id === targets[i].id) {
          found = !0, t.values[t.values.length - 1] && (tail = t.values[t.values.length - 1].index + 1), length = targets[i].values.length;

          for (var _j3 = 0; _j3 < length; _j3++) targets[i].values[_j3].index = tail + _j3, isTimeSeries || (targets[i].values[_j3].x = tail + _j3);

          t.values = t.values.concat(targets[i].values), targets.splice(i, 1);
          break;
        }

        found || notfoundIds.push(t.id);
      }), $$.data.targets.forEach(function (t) {
        for (var _i = 0; _i < notfoundIds.length; _i++) if (t.id === notfoundIds[_i]) {
          tail = t.values[t.values.length - 1].index + 1;

          for (var _j4 = 0; _j4 < length; _j4++) t.values.push({
            id: t.id,
            index: tail + _j4,
            x: isTimeSeries ? $$.getOtherTargetX(tail + _j4) : tail + _j4,
            value: null
          });
        }
      }), $$.data.targets.length && targets.forEach(function (t) {
        for (var missing = [], i = $$.data.targets[0].values[0].index; i < tail; i++) missing.push({
          id: t.id,
          index: i,
          x: isTimeSeries ? $$.getOtherTargetX(i) : i,
          value: null
        });

        t.values.forEach(function (v) {
          v.index += tail, isTimeSeries || (v.x += tail);
        }), t.values = missing.concat(t.values);
      }), $$.data.targets = $$.data.targets.concat(targets);
      // add remained
      // check data count because behavior needs to change when it"s only one
      // const dataCount = $$.getMaxDataCount();
      var baseTarget = $$.data.targets[0],
          baseValue = baseTarget.values[0];
      isDefined(args.to) ? (length = 0, to = isTimeSeries ? parseDate.call($$, args.to) : args.to, baseTarget.values.forEach(function (v) {
        v.x < to && length++;
      })) : isDefined(args.length) && (length = args.length), orgDataCount ? orgDataCount === 1 && isTimeSeries && (diff = (baseTarget.values[baseTarget.values.length - 1].x - baseValue.x) / 2, domain = [new Date(+baseValue.x - diff), new Date(+baseValue.x + diff)]) : (diff = isTimeSeries ? baseTarget.values.length > 1 ? baseTarget.values[baseTarget.values.length - 1].x - baseValue.x : baseValue.x - $$.getXDomain($$.data.targets)[0] : 1, domain = [baseValue.x - diff, baseValue.x]), domain && $$.updateXDomain(null, !0, !0, !1, domain), $$.updateTargets($$.data.targets), $$.redraw({
        flow: {
          index: baseValue.index,
          length: length,
          duration: isValue(args.duration) ? args.duration : $$.config.transition_duration,
          done: args.done,
          orgDataCount: orgDataCount
        },
        withLegend: !0,
        withTransition: orgDataCount > 1,
        withTrimXDomain: !1,
        withUpdateXAxis: !0
      });
    }
  }
});
// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(10);
;// CONCATENATED MODULE: ./src/ChartInternal/Axis/AxisRendererHelper.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */



var AxisRendererHelper = /*#__PURE__*/function () {
  function AxisRendererHelper(owner) {
    this.owner = void 0, this.config = void 0, this.scale = void 0;
    var scale = getScale(),
        config = owner.config,
        params = owner.params;
    this.owner = owner, this.config = config, this.scale = scale, (config.noTransition || !params.config.transition_duration) && (config.withoutTransition = !0), config.range = this.scaleExtent((params.orgXScale || scale).range());
  }
  /**
   * Compute a character dimension
   * @param {d3.selection} node <g class=tick> node
   * @returns {{w: number, h: number}}
   * @private
   */


  AxisRendererHelper.getSizeFor1Char = function getSizeFor1Char(node) {
    // default size for one character
    var size = {
      w: 5.5,
      h: 11.5
    };
    return node.empty() || node.select("text").text("0").call(function (el) {
      try {
        var _el$node$getBBox = el.node().getBBox(),
            width = _el$node$getBBox.width,
            height = _el$node$getBBox.height;

        width && height && (size.w = width, size.h = height);
      } catch (e) {} finally {
        el.text("");
      }
    }), this.getSizeFor1Char = function () {
      return size;
    }, size;
  }
  /**
   * Get tick transform setter function
   * @param {string} id Axis id
   * @returns {Function} transfrom setter function
   * @private
   */
  ;

  var _proto = AxisRendererHelper.prototype;
  return _proto.getTickTransformSetter = function getTickTransformSetter(id) {
    var config = this.config,
        fn = id === "x" ? function (value) {
      return "translate(" + (value + config.tickOffset) + ",0)";
    } : function (value) {
      return "translate(0," + value + ")";
    };
    return function (selection, scale) {
      selection.attr("transform", function (d) {
        return fn(Math.ceil(scale(d)));
      });
    };
  }, _proto.scaleExtent = function scaleExtent(domain) {
    var start = domain[0],
        stop = domain[domain.length - 1];
    return start < stop ? [start, stop] : [stop, start];
  }, _proto.generateTicks = function generateTicks(scale, isYAxes) {
    var tickStepSize = this.owner.params.tickStepSize,
        _scale$domain = scale.domain(),
        start = _scale$domain[0],
        end = _scale$domain[1],
        ticks = [];

    // When 'axis[y|y2].tick.stepSize' option is set
    if (isYAxes && tickStepSize) for (var interval = start; interval <= end;) ticks.push(interval), interval += tickStepSize;else if (scale.ticks) {
      var tickArguments = this.config.tickArguments; // adjust excessive tick count show

      if (scale.type === "log" && !tickArguments) {
        // nicer symlog ticks didn't implemented yet: https://github.com/d3/d3-scale/issues/162
        // get ticks values from logScale
        var s = getScale("_log").domain([start > 0 ? start : 1, end]).range(scale.range());
        ticks = s.ticks();

        for (var cnt = end.toFixed().length; ticks.length > 15; cnt--) ticks = s.ticks(cnt);

        ticks.splice(0, 1, start), ticks.splice(ticks.length - 1, 1, end);
      } else ticks = scale.ticks.apply(scale, this.config.tickArguments || []);

      ticks = ticks.map(function (v) {
        // round the tick value if is number
        var r = isString(v) && isNumber(v) && !isNaN(v) && Math.round(v * 10) / 10 || v;
        return r;
      });
    } else {
      for (var i = Math.ceil(start); i < end; i++) ticks.push(i);

      ticks.length > 0 && ticks[0] > 0 && ticks.unshift(ticks[0] - (ticks[1] - ticks[0]));
    }
    return ticks;
  }, _proto.copyScale = function copyScale() {
    var newScale = this.scale.copy();
    return newScale.domain().length || newScale.domain(this.scale.domain()), newScale.type = this.scale.type, newScale;
  }, _proto.textFormatted = function textFormatted(v) {
    var tickFormat = this.config.tickFormat,
        value = /\d+\.\d+0{5,}\d$/.test(v) ? +(v + "").replace(/0+\d$/, "") : v,
        formatted = tickFormat ? tickFormat(value) : value; // to round float numbers from 'binary floating point'
    // https://en.wikipedia.org/wiki/Double-precision_floating-point_format
    // https://stackoverflow.com/questions/17849101/laymans-explanation-for-why-javascript-has-weird-floating-math-ieee-754-stand

    return isDefined(formatted) ? formatted : "";
  }, _proto.transitionise = function transitionise(selection) {
    var config = this.config,
        transitionSelection = selection;
    if (config.withoutTransition) transitionSelection = selection.interrupt();else if (config.transition || !this.owner.params.noTransition) // prevent for 'transition not found' case
      // https://github.com/naver/billboard.js/issues/2140
      try {
        transitionSelection = selection.transition(config.transition);
      } catch (e) {}
    return transitionSelection;
  }, AxisRendererHelper;
}();


;// CONCATENATED MODULE: ./src/ChartInternal/Axis/AxisRenderer.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */




var AxisRenderer = /*#__PURE__*/function () {
  function AxisRenderer(params) {
    params === void 0 && (params = {}), this.helper = void 0, this.config = void 0, this.params = void 0, this.g = void 0;
    var config = {
      innerTickSize: 6,
      outerTickSize: params.outerTick ? 6 : 0,
      orient: "bottom",
      range: [],
      tickArguments: null,
      tickCentered: null,
      tickCulling: !0,
      tickFormat: null,
      tickLength: 9,
      tickOffset: 0,
      tickPadding: 3,
      tickValues: null,
      transition: null,
      noTransition: params.noTransition
    };
    config.tickLength = Math.max(config.innerTickSize, 0) + config.tickPadding, this.config = config, this.params = params, this.helper = new AxisRendererHelper(this);
  }
  /**
   * Create axis element
   * @param {d3.selection} g Axis selection
   * @private
   */


  var _proto = AxisRenderer.prototype;
  return _proto.create = function create(g) {
    var ctx = this,
        config = this.config,
        helper = this.helper,
        params = this.params,
        scale = helper.scale,
        orient = config.orient,
        splitTickText = this.splitTickText.bind(this),
        isLeftRight = /^(left|right)$/.test(orient),
        isTopBottom = /^(top|bottom)$/.test(orient),
        tickTransform = helper.getTickTransformSetter(isTopBottom ? "x" : "y"),
        axisPx = tickTransform === helper.axisX ? "y" : "x",
        sign = /^(top|left)$/.test(orient) ? -1 : 1,
        rotate = params.tickTextRotate;
    this.config.range = scale.rangeExtent ? scale.rangeExtent() : helper.scaleExtent((params.orgXScale || scale).range());
    var $g,
        _config2 = config,
        innerTickSize = _config2.innerTickSize,
        tickLength = _config2.tickLength,
        range = _config2.range,
        id = params.id,
        tickTextPos = id && /^(x|y|y2)$/.test(id) ? params.config["axis_" + id + "_tick_text_position"] : {
      x: 0,
      y: 0
    },
        prefix = id === "subX" ? "subchart_axis_x" : "axis_" + id,
        axisShow = params.config[prefix + "_show"],
        tickShow = {
      tick: !!axisShow && params.config[prefix + "_tick_show"],
      text: !!axisShow && params.config[prefix + "_tick_text_show"]
    }; // // get the axis' tick position configuration

    g.each(function () {
      var g = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
          scale0 = this.__chart__ || scale,
          scale1 = helper.copyScale();
      $g = g, this.__chart__ = scale1, config.tickOffset = params.isCategory ? Math.ceil((scale1(1) - scale1(0)) / 2) : 0;
      // update selection - data join
      var path = g.selectAll(".domain").data([0]); // enter + update selection

      if (path.enter().append("path").attr("class", "domain") // https://observablehq.com/@d3/d3-selection-2-0
      .merge(path).attr("d", function () {
        var outerTickSized = config.outerTickSize * sign;
        return isTopBottom ? "M" + range[0] + "," + outerTickSized + "V0H" + range[1] + "V" + outerTickSized : "M" + outerTickSized + "," + range[0] + "H0V" + range[1] + "H" + outerTickSized;
      }), tickShow.tick || tickShow.text) {
        // count of tick data in array
        var ticks = config.tickValues || helper.generateTicks(scale1, isLeftRight),
            tick = g.selectAll(".tick").data(ticks, scale1),
            tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick"),
            tickExit = tick.exit().remove(); // update selection

        tick = tickEnter.merge(tick), tickShow.tick && tickEnter.append("line"), tickShow.text && tickEnter.append("text");
        var sizeFor1Char = AxisRendererHelper.getSizeFor1Char(tick),
            counts = [],
            tspan = tick.select("text").selectAll("tspan").data(function (d, index) {
          var split = params.tickMultiline ? splitTickText(d, scale1, ticks, isLeftRight, sizeFor1Char.w) : isArray(helper.textFormatted(d)) ? helper.textFormatted(d).concat() : [helper.textFormatted(d)];
          return counts[index] = split.length, split.map(function (splitted) {
            return {
              index: index,
              splitted: splitted
            };
          });
        });
        tspan.exit().remove(), tspan = tspan.enter().append("tspan").merge(tspan).text(function (d) {
          return d.splitted;
        }), tspan.attr("x", isTopBottom ? 0 : tickLength * sign).attr("dx", function () {
          var dx = 0;
          return /(top|bottom)/.test(orient) && rotate && (dx = 8 * Math.sin(Math.PI * (rotate / 180)) * (orient === "top" ? -1 : 1)), dx + (tickTextPos.x || 0);
        }()).attr("dy", function (d, i) {
          var dy = 0;
          return orient !== "top" && (dy = sizeFor1Char.h, i === 0 && (dy = isLeftRight ? -((counts[d.index] - 1) * (sizeFor1Char.h / 2) - 3) : tickTextPos.y === 0 ? ".71em" : 0)), isNumber(dy) && tickTextPos.y ? dy + tickTextPos.y : dy || ".71em";
        });
        var lineUpdate = tick.select("line"),
            textUpdate = tick.select("text");

        // Append <title> for tooltip display
        if (tickEnter.select("line").attr(axisPx + "2", innerTickSize * sign), tickEnter.select("text").attr(axisPx, tickLength * sign), ctx.setTickLineTextPosition(lineUpdate, textUpdate), params.tickTitle) {
          var title = textUpdate.select("title");
          (title.empty() ? textUpdate.append("title") : title).text(function (index) {
            return params.tickTitle[index];
          });
        }

        if (scale1.bandwidth) {
          var x = scale1,
              dx = x.bandwidth() / 2;
          scale0 = function (d) {
            return x(d) + dx;
          }, scale1 = scale0;
        } else scale0.bandwidth ? scale0 = scale1 : tickTransform(tickExit, scale1);

        tickTransform(tickEnter, scale0), tickTransform(helper.transitionise(tick).style("opacity", null), scale1);
      }
    }), this.g = $g;
  }
  /**
   * Get tick x/y coordinate
   * @returns {{x: number, y: number}}
   * @private
   */
  , _proto.getTickXY = function getTickXY() {
    var config = this.config,
        pos = {
      x: 0,
      y: 0
    };
    return this.params.isCategory && (pos.x = config.tickCentered ? 0 : config.tickOffset, pos.y = config.tickCentered ? config.tickOffset : 0), pos;
  }
  /**
   * Get tick size
   * @param {object} d data object
   * @returns {number}
   * @private
   */
  , _proto.getTickSize = function getTickSize(d) {
    var scale = this.helper.scale,
        config = this.config,
        _config3 = config,
        innerTickSize = _config3.innerTickSize,
        range = _config3.range,
        tickPosition = scale(d) + (config.tickCentered ? 0 : config.tickOffset);
    return range[0] < tickPosition && tickPosition < range[1] ? innerTickSize : 0;
  }
  /**
   * Set tick's line & text position
   * @param {d3.selection} lineUpdate Line selection
   * @param {d3.selection} textUpdate Text selection
   * @private
   */
  , _proto.setTickLineTextPosition = function setTickLineTextPosition(lineUpdate, textUpdate) {
    var tickPos = this.getTickXY(),
        _this$config = this.config,
        innerTickSize = _this$config.innerTickSize,
        orient = _this$config.orient,
        tickLength = _this$config.tickLength,
        tickOffset = _this$config.tickOffset,
        rotate = this.params.tickTextRotate,
        textAnchorForText = function (r) {
      var value = ["start", "end"];
      return orient === "top" && value.reverse(), r ? r > 0 ? value[0] : value[1] : "middle";
    },
        textTransform = function (r) {
      return r ? "rotate(" + r + ")" : null;
    },
        yForText = function (r) {
      var r2 = r / (orient === "bottom" ? 15 : 23);
      return r ? 11.5 - 2.5 * r2 * (r > 0 ? 1 : -1) : tickLength;
    };

    orient === "bottom" ? (lineUpdate.attr("x1", tickPos.x).attr("x2", tickPos.x).attr("y2", this.getTickSize.bind(this)), textUpdate.attr("x", 0).attr("y", yForText(rotate)).style("text-anchor", textAnchorForText(rotate)).attr("transform", textTransform(rotate))) : orient === "top" ? (lineUpdate.attr("x2", 0).attr("y2", -innerTickSize), textUpdate.attr("x", 0).attr("y", -yForText(rotate) * 2).style("text-anchor", textAnchorForText(rotate)).attr("transform", textTransform(rotate))) : orient === "left" ? (lineUpdate.attr("x2", -innerTickSize).attr("y1", tickPos.y).attr("y2", tickPos.y), textUpdate.attr("x", -tickLength).attr("y", tickOffset).style("text-anchor", "end")) : orient === "right" ? (lineUpdate.attr("x2", innerTickSize).attr("y2", 0), textUpdate.attr("x", tickLength).attr("y", 0).style("text-anchor", "start")) : void 0;
  } // this should be called only when category axis
  , _proto.splitTickText = function splitTickText(d, scale, ticks, isLeftRight, charWidth) {
    // split given text by tick width size
    // eslint-disable-next-line
    function split(splitted, text) {
      for (var subtext, spaceIndex, textWidth, i = 1; i < text.length; i++) // if text width gets over tick width, split by space index or current index
      if (text.charAt(i) === " " && (spaceIndex = i), subtext = text.substr(0, i + 1), textWidth = charWidth * subtext.length, tickWidth < textWidth) return split(splitted.concat(text.substr(0, spaceIndex || i)), text.slice(spaceIndex ? spaceIndex + 1 : i));

      return splitted.concat(text);
    }

    var params = this.params,
        tickText = this.helper.textFormatted(d),
        splitted = isString(tickText) && tickText.indexOf("\n") > -1 ? tickText.split("\n") : [];
    if (splitted.length) return splitted;
    if (isArray(tickText)) return tickText;
    var tickWidth = params.tickWidth;
    return (!tickWidth || tickWidth <= 0) && (tickWidth = isLeftRight ? 95 : params.isCategory ? Math.ceil(scale(ticks[1]) - scale(ticks[0])) - 12 : 110), split(splitted, tickText + "");
  }, _proto.scale = function scale(x) {
    return arguments.length ? (this.helper.scale = x, this) : this.helper.scale;
  }, _proto.orient = function orient(x) {
    return arguments.length ? (this.config.orient = x in {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1
    } ? x + "" : "bottom", this) : this.config.orient;
  }, _proto.tickFormat = function tickFormat(format) {
    var config = this.config;
    return arguments.length ? (config.tickFormat = format, this) : config.tickFormat;
  }, _proto.tickCentered = function tickCentered(isCentered) {
    var config = this.config;
    return arguments.length ? (config.tickCentered = isCentered, this) : config.tickCentered;
  }
  /**
   * Return tick's offset value.
   * The value will be set for 'category' axis type.
   * @returns {number}
   * @private
   */
  , _proto.tickOffset = function tickOffset() {
    return this.config.tickOffset;
  }
  /**
   * Get tick interval count
   * @private
   * @param {number} size Total data size
   * @returns {number}
   */
  , _proto.tickInterval = function tickInterval(size) {
    var interval,
        _this = this,
        _this$config2 = this.config,
        outerTickSize = _this$config2.outerTickSize,
        tickOffset = _this$config2.tickOffset,
        tickValues = _this$config2.tickValues;

    if (this.params.isCategory) interval = tickOffset * 2;else {
      var length = this.g.select("path.domain").node().getTotalLength() - outerTickSize * 2;
      interval = length / (size || this.g.selectAll("line").size());
      // get the interval by its values
      var intervalByValue = tickValues ? tickValues.map(function (v, i, arr) {
        var next = i + 1;
        return next < arr.length ? _this.helper.scale(arr[next]) - _this.helper.scale(v) : null;
      }).filter(Boolean) : [];
      interval = Math.min.apply(Math, intervalByValue.concat([interval]));
    }
    return interval === Infinity ? 0 : interval;
  }, _proto.ticks = function ticks() {
    for (var config = this.config, _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];

    return args.length ? (config.tickArguments = toArray(args), this) : config.tickArguments;
  }, _proto.tickCulling = function tickCulling(culling) {
    var config = this.config;
    return arguments.length ? (config.tickCulling = culling, this) : config.tickCulling;
  }, _proto.tickValues = function tickValues(x) {
    var _this2 = this,
        config = this.config;

    if (isFunction(x)) config.tickValues = function () {
      return x(_this2.helper.scale.domain());
    };else {
      if (!arguments.length) return config.tickValues;
      config.tickValues = x;
    }
    return this;
  }, _proto.setTransition = function setTransition(t) {
    return this.config.transition = t, this;
  }, AxisRenderer;
}();


;// CONCATENATED MODULE: ./src/ChartInternal/Axis/Axis.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */





/* harmony default export */ var Axis = ({
  getAxisInstance: function getAxisInstance() {
    return this.axis || new Axis_Axis(this);
  }
});

var Axis_Axis = /*#__PURE__*/function () {
  function Axis(owner) {
    this.owner = void 0, this.x = void 0, this.subX = void 0, this.y = void 0, this.y2 = void 0, this.axesList = {}, this.tick = {
      x: null,
      y: null,
      y2: null
    }, this.xs = [], this.orient = {
      x: "bottom",
      y: "left",
      y2: "right",
      subX: "bottom"
    }, this.owner = owner, this.setOrient();
  }

  var _proto = Axis.prototype;
  return _proto.getAxisClassName = function getAxisClassName(id) {
    return config_classes.axis + " " + config_classes["axis" + capitalize(id)];
  }, _proto.isHorizontal = function isHorizontal($$, forHorizontal) {
    var isRotated = $$.config.axis_rotated;
    return forHorizontal ? isRotated : !isRotated;
  }, _proto.isCategorized = function isCategorized() {
    var _this$owner = this.owner,
        config = _this$owner.config,
        state = _this$owner.state;
    return config.axis_x_type.indexOf("category") >= 0 || state.hasRadar;
  }, _proto.isCustomX = function isCustomX() {
    var config = this.owner.config;
    return !this.isTimeSeries() && (config.data_x || notEmpty(config.data_xs));
  }, _proto.isTimeSeries = function isTimeSeries(id) {
    return id === void 0 && (id = "x"), this.owner.config["axis_" + id + "_type"] === "timeseries";
  }, _proto.isLog = function isLog(id) {
    return id === void 0 && (id = "x"), this.owner.config["axis_" + id + "_type"] === "log";
  }, _proto.isTimeSeriesY = function isTimeSeriesY() {
    return this.isTimeSeries("y");
  }, _proto.getAxisType = function getAxisType(id) {
    id === void 0 && (id = "x");
    var type = "linear";
    return this.isTimeSeries(id) ? type = this.owner.config.axis_x_localtime ? "time" : "utc" : this.isLog(id) && (type = "log"), type;
  }, _proto.init = function init() {
    var _this = this,
        $$ = this.owner,
        config = $$.config,
        _$$$$el = $$.$el,
        main = _$$$$el.main,
        axis = _$$$$el.axis,
        clip = $$.state.clip,
        isRotated = config.axis_rotated,
        target = ["x", "y"];

    config.axis_y2_show && target.push("y2"), target.forEach(function (v) {
      var classAxis = _this.getAxisClassName(v),
          classLabel = config_classes["axis" + v.toUpperCase() + "Label"];

      axis[v] = main.append("g").attr("class", classAxis).attr("clip-path", function () {
        var res = null;
        return v === "x" ? res = clip.pathXAxis : v === "y" && (res = clip.pathYAxis), res;
      }).attr("transform", $$.getTranslate(v)).style("visibility", config["axis_" + v + "_show"] ? null : "hidden"), axis[v].append("text").attr("class", classLabel).attr("transform", ["rotate(-90)", null][v === "x" ? +!isRotated : +isRotated]).style("text-anchor", function () {
        return _this.textAnchorForAxisLabel(v);
      }), _this.generateAxes(v);
    });
  }
  /**
   * Set axis orient according option value
   * @private
   */
  , _proto.setOrient = function setOrient() {
    var $$ = this.owner,
        _$$$config = $$.config,
        isRotated = _$$$config.axis_rotated,
        yInner = _$$$config.axis_y_inner,
        y2Inner = _$$$config.axis_y2_inner;
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
  , _proto.generateAxes = function generateAxes(id) {
    var d3Axis,
        $$ = this.owner,
        config = $$.config,
        axes = [],
        axesConfig = config["axis_" + id + "_axes"],
        isRotated = config.axis_rotated;
    id === "x" ? d3Axis = isRotated ? external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisLeft : external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisBottom : id === "y" ? d3Axis = isRotated ? external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisBottom : external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisLeft : id === "y2" && (d3Axis = isRotated ? external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisTop : external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_.axisRight), axesConfig.length && axesConfig.forEach(function (v) {
      var tick = v.tick || {},
          scale = $$.scale[id].copy();
      v.domain && scale.domain(v.domain), axes.push(d3Axis(scale).ticks(tick.count).tickFormat(isFunction(tick.format) ? tick.format.bind($$.api) : function (x) {
        return x;
      }).tickValues(tick.values).tickSizeOuter(tick.outer === !1 ? 0 : 6));
    }), this.axesList[id] = axes;
  }
  /**
   * Update axes nodes
   * @private
   */
  , _proto.updateAxes = function updateAxes() {
    var _this2 = this,
        $$ = this.owner,
        config = $$.config,
        main = $$.$el.main;

    Object.keys(this.axesList).forEach(function (id) {
      var axesConfig = config["axis_" + id + "_axes"],
          scale = $$.scale[id].copy(),
          range = scale.range();

      _this2.axesList[id].forEach(function (v, i) {
        var axisRange = v.scale().range(); // adjust range value with the current
        // https://github.com/naver/billboard.js/issues/859

        range.every(function (v, i) {
          return v === axisRange[i];
        }) || v.scale().range(range);
        var className = _this2.getAxisClassName(id) + "-" + (i + 1),
            g = main.select("." + className.replace(/\s/, "."));
        g.empty() ? g = main.append("g").attr("class", className).style("visibility", config["axis_" + id + "_show"] ? null : "hidden").call(v) : (axesConfig[i].domain && scale.domain(axesConfig[i].domain), _this2.x.helper.transitionise(g).call(v.scale(scale))), g.attr("transform", $$.getTranslate(id, i + 1));
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
  , _proto.setAxis = function setAxis(id, scale, outerTick, noTransition) {
    var $$ = this.owner;
    id !== "subX" && (this.tick[id] = this.getTickValues(id)), this[id] = this.getAxis(id, scale, outerTick, // do not transit x Axis on zoom and resizing
    // https://github.com/naver/billboard.js/issues/1949
    !!(id === "x" && ($$.scale.zoom || $$.config.subchart_show || $$.state.resizing)) || noTransition);
  } // called from : getMaxTickWidth()
  , _proto.getAxis = function getAxis(id, scale, outerTick, noTransition, noTickTextRotate) {
    var tickFormat,
        $$ = this.owner,
        config = $$.config,
        isX = /^(x|subX)$/.test(id),
        type = isX ? "x" : id,
        isCategory = isX && this.isCategorized(),
        orient = this.orient[id],
        tickTextRotate = noTickTextRotate ? 0 : $$.getAxisTickRotate(type);
    if (isX) tickFormat = $$.format.xAxisTick;else {
      var fn = config["axis_" + id + "_tick_format"];
      isFunction(fn) && (tickFormat = fn.bind($$.api));
    }
    var tickValues = this.tick[type],
        axisParams = mergeObj({
      outerTick: outerTick,
      noTransition: noTransition,
      config: config,
      id: id,
      tickTextRotate: tickTextRotate
    }, isX && {
      isCategory: isCategory,
      tickMultiline: config.axis_x_tick_multiline,
      tickWidth: config.axis_x_tick_width,
      tickTitle: isCategory && config.axis_x_tick_tooltip && $$.api.categories(),
      orgXScale: $$.scale.x
    });
    isX || (axisParams.tickStepSize = config["axis_" + type + "_tick_stepSize"]);
    var axis = new AxisRenderer(axisParams).scale(isX && $$.scale.zoom || scale).orient(orient);

    if (isX && this.isTimeSeries() && tickValues && !isFunction(tickValues)) {
      var _fn = parseDate.bind($$);

      tickValues = tickValues.map(function (v) {
        return _fn(v);
      });
    } else !isX && this.isTimeSeriesY() && ( // https://github.com/d3/d3/blob/master/CHANGES.md#time-intervals-d3-time
    axis.ticks(config.axis_y_tick_time_value), tickValues = null);

    tickValues && axis.tickValues(tickValues), axis.tickFormat(tickFormat || !isX && $$.isStackNormalized() && function (x) {
      return x + "%";
    }), isCategory && (axis.tickCentered(config.axis_x_tick_centered), isEmpty(config.axis_x_tick_culling) && (config.axis_x_tick_culling = !1));
    var tickCount = config["axis_" + type + "_tick_count"];
    return tickCount && axis.ticks(tickCount), axis;
  }, _proto.updateXAxisTickValues = function updateXAxisTickValues(targets, axis) {
    var values,
        $$ = this.owner,
        config = $$.config,
        fit = config.axis_x_tick_fit,
        count = config.axis_x_tick_count;
    return (fit || count && fit) && (values = $$.mapTargetsToUniqueXs(targets), this.isCategorized() && count > values.length && (count = values.length), values = this.generateTickValues(values, count, this.isTimeSeries())), axis ? axis.tickValues(values) : this.x && (this.x.tickValues(values), this.subX && this.subX.tickValues(values)), values;
  }, _proto.getId = function getId(id) {
    var _this$owner2 = this.owner,
        config = _this$owner2.config,
        scale = _this$owner2.scale,
        axis = config.data_axes[id];
    return axis && scale[axis] || (axis = "y"), axis;
  }, _proto.getXAxisTickFormat = function getXAxisTickFormat() {
    var currFormat,
        $$ = this.owner,
        config = $$.config,
        format = $$.format,
        tickFormat = config.axis_x_tick_format,
        isTimeSeries = this.isTimeSeries(),
        isCategorized = this.isCategorized();
    return tickFormat ? isFunction(tickFormat) ? currFormat = tickFormat.bind($$.api) : isTimeSeries && (currFormat = function (date) {
      return date ? format.axisTime(tickFormat)(date) : "";
    }) : currFormat = isTimeSeries ? format.defaultAxisTime : isCategorized ? $$.categoryName : function (v) {
      return v < 0 ? v.toFixed(0) : v;
    }, isFunction(currFormat) ? function (v) {
      return currFormat.apply($$, isCategorized ? [v, $$.categoryName(v)] : [v]);
    } : currFormat;
  }, _proto.getTickValues = function getTickValues(id) {
    var $$ = this.owner,
        tickValues = $$.config["axis_" + id + "_tick_values"],
        axis = $$[id + "Axis"];
    return (isFunction(tickValues) ? tickValues.call($$.api) : tickValues) || (axis ? axis.tickValues() : undefined);
  }, _proto.getLabelOptionByAxisId = function getLabelOptionByAxisId(id) {
    return this.owner.config["axis_" + id + "_label"];
  }, _proto.getLabelText = function getLabelText(id) {
    var option = this.getLabelOptionByAxisId(id);
    return isString(option) ? option : option ? option.text : null;
  }, _proto.setLabelText = function setLabelText(id, text) {
    var $$ = this.owner,
        config = $$.config,
        option = this.getLabelOptionByAxisId(id);
    isString(option) ? config["axis_" + id + "_label"] = text : option && (option.text = text);
  }, _proto.getLabelPosition = function getLabelPosition(id, defaultPosition) {
    var isRotated = this.owner.config.axis_rotated,
        option = this.getLabelOptionByAxisId(id),
        position = isObjectType(option) && option.position ? option.position : defaultPosition[+!isRotated],
        has = function (v) {
      return !!~position.indexOf(v);
    };

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
  }, _proto.getAxisLabelPosition = function getAxisLabelPosition(id) {
    return this.getLabelPosition(id, id === "x" ? ["inner-top", "inner-right"] : ["inner-right", "inner-top"]);
  }, _proto.getLabelPositionById = function getLabelPositionById(id) {
    return this.getAxisLabelPosition(id);
  }, _proto.xForAxisLabel = function xForAxisLabel(id) {
    var $$ = this.owner,
        _$$$state = $$.state,
        width = _$$$state.width,
        height = _$$$state.height,
        position = this.getAxisLabelPosition(id),
        x = position.isMiddle ? -height / 2 : 0;
    return this.isHorizontal($$, id !== "x") ? x = position.isLeft ? 0 : position.isCenter ? width / 2 : width : position.isBottom && (x = -height), x;
  }, _proto.dxForAxisLabel = function dxForAxisLabel(id) {
    var $$ = this.owner,
        position = this.getAxisLabelPosition(id),
        dx = position.isBottom ? "0.5em" : "0";
    return this.isHorizontal($$, id !== "x") ? dx = position.isLeft ? "0.5em" : position.isRight ? "-0.5em" : "0" : position.isTop && (dx = "-0.5em"), dx;
  }, _proto.textAnchorForAxisLabel = function textAnchorForAxisLabel(id) {
    var $$ = this.owner,
        position = this.getAxisLabelPosition(id),
        anchor = position.isMiddle ? "middle" : "end";
    return this.isHorizontal($$, id !== "x") ? anchor = position.isLeft ? "start" : position.isCenter ? "middle" : "end" : position.isBottom && (anchor = "start"), anchor;
  }, _proto.dyForAxisLabel = function dyForAxisLabel(id) {
    var dy,
        $$ = this.owner,
        config = $$.config,
        isRotated = config.axis_rotated,
        isInner = this.getAxisLabelPosition(id).isInner,
        tickRotate = config["axis_" + id + "_tick_rotate"] ? $$.getHorizontalAxisHeight(id) : 0,
        maxTickWidth = this.getMaxTickWidth(id);

    if (id === "x") {
      var xHeight = config.axis_x_height;
      dy = isRotated ? isInner ? "1.2em" : -25 - maxTickWidth : isInner ? "-0.5em" : xHeight ? xHeight - 10 : tickRotate ? tickRotate - 10 : "3em";
    } else dy = {
      y: ["-0.5em", 10, "3em", "1.2em", 10],
      y2: ["1.2em", -20, "-2.2em", "-0.5em", 15]
    }[id], dy = isRotated ? isInner ? dy[0] : tickRotate ? tickRotate * (id === "y2" ? -1 : 1) - dy[1] : dy[2] : isInner ? dy[3] : (dy[4] + (config["axis_" + id + "_inner"] ? 0 : maxTickWidth + dy[4])) * (id === "y" ? -1 : 1);

    return dy;
  }, _proto.getMaxTickWidth = function getMaxTickWidth(id, withoutRecompute) {
    var $$ = this.owner,
        config = $$.config,
        current = $$.state.current,
        _$$$$el2 = $$.$el,
        svg = _$$$$el2.svg,
        chart = _$$$$el2.chart,
        currentTickMax = current.maxTickWidths[id],
        maxWidth = 0;
    if (withoutRecompute || !config["axis_" + id + "_show"] || $$.filterTargetsToShow().length === 0) return currentTickMax.size;

    if (svg) {
      var isYAxis = /^y2?$/.test(id),
          targetsToShow = $$.filterTargetsToShow($$.data.targets),
          scale = $$.scale[id].copy().domain($$["get" + (isYAxis ? "Y" : "X") + "Domain"](targetsToShow, id)),
          domain = scale.domain(),
          isDomainSame = domain[0] === domain[1] && domain.every(function (v) {
        return v > 0;
      }),
          isCurrentMaxTickDomainSame = isArray(currentTickMax.domain) && currentTickMax.domain[0] === currentTickMax.domain[1] && currentTickMax.domain.every(function (v) {
        return v > 0;
      });
      // do not compute if domain or currentMaxTickDomain is same
      if (isDomainSame || isCurrentMaxTickDomainSame) return currentTickMax.size; // reset old max state value to prevent from new data loading

      currentTickMax.domain = domain, isYAxis || currentTickMax.ticks.splice(0);
      var axis = this.getAxis(id, scale, !1, !1, !0),
          tickCount = config["axis_" + id + "_tick_count"],
          tickValues = config["axis_" + id + "_tick_values"];
      !tickValues && tickCount && axis.tickValues(this.generateTickValues(domain, tickCount, isYAxis ? this.isTimeSeriesY() : this.isTimeSeries())), isYAxis || this.updateXAxisTickValues(targetsToShow, axis);
      var dummy = chart.append("svg").style("visibility", "hidden").style("position", "fixed").style("top", "0px").style("left", "0px");
      axis.create(dummy), dummy.selectAll("text").each(function (d, i) {
        var currentTextWidth = this.getBoundingClientRect().width;
        maxWidth = Math.max(maxWidth, currentTextWidth), isYAxis || (currentTickMax.ticks[i] = currentTextWidth);
      }), dummy.remove();
    }

    return maxWidth > 0 && (currentTickMax.size = maxWidth), currentTickMax.size;
  }, _proto.getXAxisTickTextY2Overflow = function getXAxisTickTextY2Overflow(defaultPadding) {
    var $$ = this.owner,
        axis = $$.axis,
        config = $$.config,
        state = $$.state,
        xAxisTickRotate = $$.getAxisTickRotate("x");

    if ((axis.isCategorized() || axis.isTimeSeries()) && config.axis_x_tick_fit && !config.axis_x_tick_culling && !config.axis_x_tick_multiline && xAxisTickRotate > 0 && xAxisTickRotate < 90) {
      var widthWithoutCurrentPaddingLeft = state.current.width - $$.getCurrentPaddingLeft(),
          maxOverflow = this.getXAxisTickMaxOverflow(xAxisTickRotate, widthWithoutCurrentPaddingLeft - defaultPadding),
          xAxisTickTextY2Overflow = Math.max(0, maxOverflow) + defaultPadding;
      // for display inconsistencies between browsers
      return Math.min(xAxisTickTextY2Overflow, widthWithoutCurrentPaddingLeft / 2);
    }

    return 0;
  }, _proto.getXAxisTickMaxOverflow = function getXAxisTickMaxOverflow(xAxisTickRotate, widthWithoutCurrentPaddingLeft) {
    for (var $$ = this.owner, axis = $$.axis, config = $$.config, state = $$.state, isTimeSeries = axis.isTimeSeries(), tickTextWidths = state.current.maxTickWidths.x.ticks, tickCount = tickTextWidths.length, _state$axis$x$padding = state.axis.x.padding, left = _state$axis$x$padding.left, right = _state$axis$x$padding.right, maxOverflow = 0, remaining = tickCount - (isTimeSeries && config.axis_x_tick_fit ? .5 : 0), i = 0; i < tickCount; i++) {
      var tickIndex = i + 1,
          rotatedTickTextWidth = Math.cos(Math.PI * xAxisTickRotate / 180) * tickTextWidths[i],
          ticksBeforeTickText = tickIndex - (isTimeSeries ? 1 : .5) + left;

      // Skip ticks if there are no ticks before them
      if (!(ticksBeforeTickText <= 0)) {
        var tickLength = (widthWithoutCurrentPaddingLeft - rotatedTickTextWidth) / ticksBeforeTickText;
        maxOverflow = Math.max(maxOverflow, rotatedTickTextWidth - tickLength / 2 - ((remaining - tickIndex) * tickLength + right * tickLength));
      }
    }

    var filteredTargets = $$.filterTargetsToShow($$.data.targets),
        tickOffset = 0;

    if (!isTimeSeries && config.axis_x_tick_count <= filteredTargets.length && filteredTargets[0].values.length) {
      var scale = getScale($$.axis.getAxisType("x"), 0, widthWithoutCurrentPaddingLeft - maxOverflow).domain([left * -1, $$.getXDomainMax($$.data.targets) + 1 + right]);
      tickOffset = Math.ceil((scale(1) - scale(0)) / 2);
    }

    return maxOverflow + tickOffset;
  }
  /**
   * Get x Axis padding
   * @param {number} tickCount Tick count
   * @returns {object} Padding object values with 'left' & 'right' key
   * @private
   */
  , _proto.getXAxisPadding = function getXAxisPadding(tickCount) {
    var $$ = this.owner,
        padding = $$.config.axis_x_padding,
        _ref = isNumber(padding) ? {
      left: padding,
      right: padding
    } : padding,
        _ref$left = _ref.left,
        left = _ref$left === void 0 ? 0 : _ref$left,
        _ref$right = _ref.right,
        right = _ref$right === void 0 ? 0 : _ref$right;

    if ($$.axis.isTimeSeries()) {
      var firstX = +$$.getXDomainMin($$.data.targets),
          lastX = +$$.getXDomainMax($$.data.targets),
          timeDiff = lastX - firstX,
          range = timeDiff + left + right;

      if (tickCount && range) {
        var relativeTickWidth = timeDiff / tickCount / range;
        left = left / range / relativeTickWidth, right = right / range / relativeTickWidth;
      }
    }

    return {
      left: left,
      right: right
    };
  }, _proto.updateLabels = function updateLabels(withTransition) {
    var _this3 = this,
        $$ = this.owner,
        main = $$.$el.main,
        labels = {
      x: main.select("." + config_classes.axisX + " ." + config_classes.axisXLabel),
      y: main.select("." + config_classes.axisY + " ." + config_classes.axisYLabel),
      y2: main.select("." + config_classes.axisY2 + " ." + config_classes.axisY2Label)
    };

    Object.keys(labels).filter(function (id) {
      return !labels[id].empty();
    }).forEach(function (v) {
      var node = labels[v];
      (withTransition ? node.transition() : node).attr("x", function () {
        return _this3.xForAxisLabel(v);
      }).attr("dx", function () {
        return _this3.dxForAxisLabel(v);
      }).attr("dy", function () {
        return _this3.dyForAxisLabel(v);
      }).text(function () {
        return _this3.getLabelText(v);
      });
    });
  }, _proto.getPadding = function getPadding(padding, key, defaultValue, domainLength) {
    var p = isNumber(padding) ? padding : padding[key];
    return isValue(p) ? this.convertPixelsToAxisPadding(p, domainLength) : defaultValue;
  }, _proto.convertPixelsToAxisPadding = function convertPixelsToAxisPadding(pixels, domainLength) {
    var $$ = this.owner,
        config = $$.config,
        _$$$state2 = $$.state,
        width = _$$$state2.width,
        height = _$$$state2.height,
        length = config.axis_rotated ? width : height;
    return domainLength * (pixels / length);
  }, _proto.generateTickValues = function generateTickValues(values, tickCount, forTimeSeries) {
    var tickValues = values;

    if (tickCount) {
      var targetCount = isFunction(tickCount) ? tickCount() : tickCount; // compute ticks according to tickCount

      if (targetCount === 1) tickValues = [values[0]];else if (targetCount === 2) tickValues = [values[0], values[values.length - 1]];else if (targetCount > 2) {
        var tickValue,
            isCategorized = this.isCategorized(),
            count = targetCount - 2,
            start = values[0],
            end = values[values.length - 1];
        tickValues = [start];

        for (var i = 0; i < count; i++) tickValue = +start + (end - start) / (count + 1) * (i + 1), tickValues.push(forTimeSeries ? new Date(tickValue) : isCategorized ? Math.round(tickValue) : tickValue);

        tickValues.push(end);
      }
    }

    return forTimeSeries || (tickValues = tickValues.sort(function (a, b) {
      return a - b;
    })), tickValues;
  }, _proto.generateTransitions = function generateTransitions(duration) {
    var $$ = this.owner,
        axis = $$.$el.axis,
        _map = ["x", "y", "y2", "subX"].map(function (v) {
      var ax = axis[v];
      return ax && duration && (ax = ax.transition().duration(duration)), ax;
    }),
        axisX = _map[0],
        axisY = _map[1],
        axisY2 = _map[2],
        axisSubX = _map[3];

    return {
      axisX: axisX,
      axisY: axisY,
      axisY2: axisY2,
      axisSubX: axisSubX
    };
  }, _proto.redraw = function redraw(transitions, isHidden, isInit) {
    var _this4 = this,
        $$ = this.owner,
        config = $$.config,
        $el = $$.$el,
        opacity = isHidden ? "0" : null;

    ["x", "y", "y2", "subX"].forEach(function (id) {
      var axis = _this4[id],
          $axis = $el.axis[id];
      axis && $axis && (!isInit && !config.transition_duration && (axis.config.withoutTransition = !0), $axis.style("opacity", opacity), axis.create(transitions["axis" + capitalize(id)]));
    }), this.updateAxes();
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
  , _proto.redrawAxis = function redrawAxis(targetsToShow, wth, transitions, flow, isInit) {
    var xDomainForZoom,
        _this5 = this,
        $$ = this.owner,
        config = $$.config,
        scale = $$.scale,
        $el = $$.$el,
        hasZoom = !!scale.zoom;

    !hasZoom && this.isCategorized() && targetsToShow.length === 0 && scale.x.domain([0, $el.axis.x.selectAll(".tick").size()]), scale.x && targetsToShow.length ? (!hasZoom && $$.updateXDomain(targetsToShow, wth.UpdateXDomain, wth.UpdateOrgXDomain, wth.TrimXDomain), !config.axis_x_tick_values && this.updateXAxisTickValues(targetsToShow)) : this.x && (this.x.tickValues([]), this.subX && this.subX.tickValues([])), config.zoom_rescale && !flow && (xDomainForZoom = scale.x.orgDomain()), ["y", "y2"].forEach(function (key) {
      var axisScale = scale[key];

      if (axisScale) {
        var tickValues = config["axis_" + key + "_tick_values"],
            tickCount = config["axis_" + key + "_tick_count"];

        if (axisScale.domain($$.getYDomain(targetsToShow, key, xDomainForZoom)), !tickValues && tickCount) {
          var _axis = $$.axis[key],
              domain = axisScale.domain();

          _axis.tickValues(_this5.generateTickValues(domain, domain.every(function (v) {
            return v === 0;
          }) ? 1 : tickCount, _this5.isTimeSeriesY()));
        }
      }
    }), this.redraw(transitions, $$.hasArcType(), isInit), this.updateLabels(wth.Transition), (wth.UpdateXDomain || wth.UpdateXAxis || wth.Y) && targetsToShow.length && this.setCulling(), wth.Y && (scale.subY && scale.subY.domain($$.getYDomain(targetsToShow, "y")), scale.subY2 && scale.subY2.domain($$.getYDomain(targetsToShow, "y2")));
  }
  /**
   * Set manual culling
   * @private
   */
  , _proto.setCulling = function setCulling() {
    var $$ = this.owner,
        config = $$.config,
        _$$$state3 = $$.state,
        clip = _$$$state3.clip,
        current = _$$$state3.current,
        $el = $$.$el;
    ["subX", "x", "y", "y2"].forEach(function (type) {
      var axis = $el.axis[type],
          id = type === "subX" ? "x" : type,
          toCull = config["axis_" + id + "_tick_culling"]; // subchart x axis should be aligned with x axis culling

      if (axis && toCull) {
        var intervalForCulling,
            tickText = axis.selectAll(".tick text"),
            tickValues = sortValue(tickText.data()),
            tickSize = tickValues.length,
            cullingMax = config["axis_" + id + "_tick_culling_max"];

        if (tickSize) {
          for (var i = 1; i < tickSize; i++) if (tickSize / i < cullingMax) {
            intervalForCulling = i;
            break;
          }

          tickText.each(function (d) {
            this.style.display = tickValues.indexOf(d) % intervalForCulling ? "none" : null;
          });
        } else tickText.style("display", null); // set/unset x_axis_tick_clippath


        if (type === "x") {
          var clipPath = current.maxTickWidths.x.clipPath ? clip.pathXAxisTickTexts : null;
          $el.svg.selectAll("." + config_classes.axisX + " .tick text").attr("clip-path", clipPath);
        }
      }
    });
  }, Axis;
}();
;// CONCATENATED MODULE: ./src/ChartInternal/interactions/eventrect.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/* harmony default export */ var eventrect = ({
  /**
   * Initialize the area that detects the event.
   * Add a container for the zone that detects the event.
   * @private
   */
  initEventRect: function initEventRect() {
    var $$ = this;
    $$.$el.main.select("." + config_classes.chart).append("g").attr("class", config_classes.eventRects).style("fill-opacity", "0");
  },

  /**
   * Redraws the area that detects the event.
   * @private
   */
  redrawEventRect: function redrawEventRect() {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        $el = $$.$el,
        isMultipleX = $$.isMultipleX();
    if ($el.eventRect) $$.updateEventRect($el.eventRect, !0);else {
      var eventRects = $$.$el.main.select("." + config_classes.eventRects).style("cursor", config.zoom_enabled && config.zoom_type !== "drag" ? config.axis_rotated ? "ns-resize" : "ew-resize" : null).classed(config_classes.eventRectsMultiple, isMultipleX).classed(config_classes.eventRectsSingle, !isMultipleX),
          eventRectUpdate = eventRects.selectAll("." + config_classes.eventRect).data([0]).enter().append("rect"); // append event <rect>

      // bind event to <rect> element
      // bind draggable selection
      $$.updateEventRect(eventRectUpdate), isMultipleX ? $$.generateEventRectsForMultipleXs(eventRectUpdate) : $$.generateEventRectsForSingleX(eventRectUpdate), eventRectUpdate.call($$.getDraggableSelection()), $el.eventRect = eventRectUpdate, $$.state.inputType !== "touch" || $el.svg.on("touchstart.eventRect") || $$.hasArcType() || $$.bindTouchOnEventRect(isMultipleX);
    }

    if (!isMultipleX) {
      // Set data and update eventReceiver.data
      var xAxisTickValues = $$.getMaxDataCountTarget(); // update data's index value to be alinged with the x Axis

      $$.updateDataIndexByX(xAxisTickValues), $$.updateXs(xAxisTickValues), $$.updatePointClass && $$.updatePointClass(!0), state.eventReceiver.data = xAxisTickValues;
    }

    $$.updateEventRectData();
  },
  bindTouchOnEventRect: function bindTouchOnEventRect(isMultipleX) {
    var startPx,
        $$ = this,
        config = $$.config,
        state = $$.state,
        _$$$$el = $$.$el,
        eventRect = _$$$$el.eventRect,
        svg = _$$$$el.svg,
        selectRect = function (context) {
      if (isMultipleX) $$.selectRectForMultipleXs(context);else {
        var index = $$.getDataIndexFromEvent(state.event);
        $$.callOverOutForTouch(index), index === -1 ? $$.unselectRect() : $$.selectRectForSingle(context, eventRect, index);
      }
    },
        unselectRect = function () {
      $$.unselectRect(), $$.callOverOutForTouch();
    },
        preventDefault = config.interaction_inputType_touch.preventDefault,
        isPrevented = isboolean(preventDefault) && preventDefault || !1,
        preventThreshold = !isNaN(preventDefault) && preventDefault || null,
        preventEvent = function (event) {
      var eventType = event.type,
          touch = event.changedTouches[0],
          currentXY = touch["client" + (config.axis_rotated ? "Y" : "X")];
      eventType === "touchstart" ? isPrevented ? event.preventDefault() : preventThreshold !== null && (startPx = currentXY) : eventType === "touchmove" && (isPrevented || startPx === !0 || preventThreshold !== null && Math.abs(startPx - currentXY) >= preventThreshold) && (startPx = !0, event.preventDefault());
    };

    // bind touch events
    eventRect.on("touchstart", function (event) {
      state.event = event, $$.updateEventRect();
    }).on("touchstart.eventRect touchmove.eventRect", function (event) {
      if (state.event = event, !eventRect.empty() && eventRect.classed(config_classes.eventRect)) {
        // if touch points are > 1, means doing zooming interaction. In this case do not execute tooltip codes.
        if (state.dragging || state.flowing || $$.hasArcType() || event.touches.length > 1) return;
        preventEvent(event), selectRect(eventRect.node());
      } else unselectRect();
    }, !0).on("touchend.eventRect", function (event) {
      state.event = event, !eventRect.empty() && eventRect.classed(config_classes.eventRect) && ($$.hasArcType() || !$$.toggleShape || state.cancelClick) && state.cancelClick && (state.cancelClick = !1);
    }, !0), svg.on("touchstart", function (event) {
      state.event = event;
      var target = event.target;
      target && target !== eventRect.node() && unselectRect();
    });
  },

  /**
   * Update event rect size
   * @param {d3Selection} eventRect Event <rect> element
   * @param {boolean} force Force to update
   * @private
   */
  updateEventRect: function updateEventRect(eventRect, force) {
    force === void 0 && (force = !1);
    var $$ = this,
        state = $$.state,
        $el = $$.$el,
        _state = state,
        eventReceiver = _state.eventReceiver,
        width = _state.width,
        height = _state.height,
        rendered = _state.rendered,
        resizing = _state.resizing,
        rectElement = eventRect || $el.eventRect;
    (!rendered || resizing || force) && (rectElement.attr("x", 0).attr("y", 0).attr("width", width).attr("height", height), !rendered && rectElement.attr("class", config_classes.eventRect)), function updateClientRect() {
      eventReceiver && (eventReceiver.rect = rectElement.node().getBoundingClientRect());
    }();
  },

  /**
   * Updates the location and size of the eventRect.
   * @private
   */
  updateEventRectData: function updateEventRectData() {
    var x,
        y,
        w,
        h,
        $$ = this,
        config = $$.config,
        scale = $$.scale,
        state = $$.state,
        xScale = scale.zoom || scale.x,
        isRotated = config.axis_rotated;
    if ($$.isMultipleX()) // TODO: rotated not supported yet
    x = 0, y = 0, w = state.width, h = state.height;else {
      var rectW, rectX;
      if ($$.axis.isCategorized()) rectW = $$.getEventRectWidth(), rectX = function (d) {
        return xScale(d.x) - rectW / 2;
      };else {
        var getPrevNextX = function (_ref) {
          var index = _ref.index;
          return {
            prev: $$.getPrevX(index),
            next: $$.getNextX(index)
          };
        };

        rectW = function (d) {
          var x = getPrevNextX(d); // if there this is a single data point make the eventRect full width (or height)

          return x.prev === null && x.next === null ? isRotated ? state.height : state.width : (x.prev === null && (x.prev = xScale.domain()[0]), x.next === null && (x.next = xScale.domain()[1]), Math.max(0, (xScale(x.next) - xScale(x.prev)) / 2));
        }, rectX = function (d) {
          var x = getPrevNextX(d),
              thisX = d.x;
          // if there this is a single data point position the eventRect at 0
          return x.prev === null && x.next === null ? 0 : (x.prev === null && (x.prev = xScale.domain()[0]), (xScale(thisX) + xScale(x.prev)) / 2);
        };
      }
      x = isRotated ? 0 : rectX, y = isRotated ? rectX : 0, w = isRotated ? state.width : rectW, h = isRotated ? rectW : state.height;
    }

    var eventReceiver = state.eventReceiver,
        call = function (fn, v) {
      return isFunction(fn) ? fn(v) : fn;
    };

    // reset for possible remains coords data before the data loading
    eventReceiver.coords.splice(eventReceiver.data.length), eventReceiver.data.forEach(function (d, i) {
      eventReceiver.coords[i] = {
        x: call(x, d),
        y: call(y, d),
        w: call(w, d),
        h: call(h, d)
      };
    });
  },
  selectRectForMultipleXs: function selectRectForMultipleXs(context) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        targetsToShow = $$.filterTargetsToShow($$.data.targets);

    // do nothing when dragging
    if (!(state.dragging || $$.hasArcType(targetsToShow))) {
      var mouse = getPointer(state.event, context),
          closest = $$.findClosestFromTargets(targetsToShow, mouse);
      if (state.mouseover && (!closest || closest.id !== state.mouseover.id) && (config.data_onout.call($$.api, state.mouseover), state.mouseover = undefined), !closest) return void $$.unselectRect();
      var sameXData = $$.isBubbleType(closest) || $$.isScatterType(closest) || !config.tooltip_grouped ? [closest] : $$.filterByX(targetsToShow, closest.x),
          selectedData = sameXData.map(function (d) {
        return $$.addName(d);
      }); // show tooltip when cursor is close to some point

      $$.showTooltip(selectedData, context), $$.setExpand(closest.index, closest.id, !0), $$.showGridFocus(selectedData), ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) && ($$.$el.svg.select("." + config_classes.eventRect).style("cursor", "pointer"), !state.mouseover && (config.data_onover.call($$.api, closest), state.mouseover = closest));
    }
  },

  /**
   * Unselect EventRect.
   * @private
   */
  unselectRect: function unselectRect() {
    var $$ = this,
        config = $$.config,
        _$$$$el2 = $$.$el,
        circle = _$$$$el2.circle,
        tooltip = _$$$$el2.tooltip;
    $$.$el.svg.select("." + config_classes.eventRect).style("cursor", null), $$.hideGridFocus(), tooltip && ($$.hideTooltip(), $$._handleLinkedCharts(!1)), circle && !config.point_focus_only && $$.unexpandCircles(), $$.expandBarTypeShapes(!1);
  },

  /**
   * Create eventRect for each data on the x-axis.
   * Register touch and drag events.
   * @param {object} eventRectEnter d3.select(CLASS.eventRects) object.
   * @returns {object} d3.select(CLASS.eventRects) object.
   * @private
   */
  generateEventRectsForSingleX: function generateEventRectsForSingleX(eventRectEnter) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        eventReceiver = state.eventReceiver,
        rect = eventRectEnter.style("cursor", config.data_selection_enabled && config.data_selection_grouped ? "pointer" : null).on("click", function (event) {
      state.event = event;
      var _eventReceiver = eventReceiver,
          currentIdx = _eventReceiver.currentIdx,
          data = _eventReceiver.data,
          d = data[currentIdx === -1 ? $$.getDataIndexFromEvent(event) : currentIdx];
      $$.clickHandlerForSingleX.bind(this)(d, $$);
    });

    if (state.inputType === "mouse") {
      var getData = function (event) {
        var index = event ? $$.getDataIndexFromEvent(event) : eventReceiver.currentIdx;
        return index > -1 ? eventReceiver.data[index] : null;
      };

      rect.on("mouseover", function (event) {
        state.event = event, $$.updateEventRect();
      }).on("mousemove", function (event) {
        var d = getData(event);

        // do nothing while dragging/flowing
        if (state.event = event, !(state.dragging || state.flowing || $$.hasArcType() || !d || config.tooltip_grouped && d && d.index === eventReceiver.currentIdx)) {
          var index = d.index;
          $$.isStepType(d) && config.line_step_type === "step-after" && getPointer(event, this)[0] < $$.scale.x($$.getXValue(d.id, index)) && (index -= 1), index !== eventReceiver.currentIdx && ($$.setOverOut(!1, eventReceiver.currentIdx), eventReceiver.currentIdx = index), index === -1 ? $$.unselectRect() : $$.selectRectForSingle(this, rect, index), $$.setOverOut(index !== -1, index);
        }
      }).on("mouseout", function (event) {
        state.event = event;
        // chart is destroyed
        !config || $$.hasArcType() || eventReceiver.currentIdx === -1 || ( // reset the event current index
        $$.unselectRect(), $$.setOverOut(!1, eventReceiver.currentIdx), eventReceiver.currentIdx = -1);
      });
    }

    return rect;
  },
  clickHandlerForSingleX: function clickHandlerForSingleX(d, ctx) {
    var $$ = ctx,
        config = $$.config,
        state = $$.state,
        main = $$.$el.main;
    if (!d || $$.hasArcType() || state.cancelClick) return void (state.cancelClick && (state.cancelClick = !1));
    var index = d.index;
    main.selectAll("." + config_classes.shape + "-" + index).each(function (d2) {
      (config.data_selection_grouped || $$.isWithinShape(this, d2)) && ($$.toggleShape && $$.toggleShape(this, d2, index), config.data_onclick.bind($$.api)(d2, this));
    });
  },

  /**
   * Create an eventRect,
   * Register touch and drag events.
   * @param {object} eventRectEnter d3.select(CLASS.eventRects) object.
   * @private
   */
  generateEventRectsForMultipleXs: function generateEventRectsForMultipleXs(eventRectEnter) {
    var $$ = this,
        state = $$.state;
    eventRectEnter.on("click", function (event) {
      state.event = event, $$.clickHandlerForMultipleXS.bind(this)($$);
    }), state.inputType === "mouse" && eventRectEnter.on("mouseover mousemove", function (event) {
      state.event = event, $$.selectRectForMultipleXs(this);
    }).on("mouseout", function (event) {
      state.event = event;
      // chart is destroyed
      !$$.config || $$.hasArcType() || $$.unselectRect();
    });
  },
  clickHandlerForMultipleXS: function clickHandlerForMultipleXS(ctx) {
    var $$ = ctx,
        config = $$.config,
        state = $$.state,
        targetsToShow = $$.filterTargetsToShow($$.data.targets);

    if (!$$.hasArcType(targetsToShow)) {
      var mouse = getPointer(state.event, this),
          closest = $$.findClosestFromTargets(targetsToShow, mouse);
      !closest || ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) && $$.$el.main.selectAll("." + config_classes.shapes + $$.getTargetSelectorSuffix(closest.id)).selectAll("." + config_classes.shape + "-" + closest.index).each(function () {
        (config.data_selection_grouped || $$.isWithinShape(this, closest)) && ($$.toggleShape && $$.toggleShape(this, closest, closest.index), config.data_onclick.bind($$.api)(closest, this));
      });
    } // select if selection enabled

  }
});
// EXTERNAL MODULE: external {"commonjs":"d3-ease","commonjs2":"d3-ease","amd":"d3-ease","root":"d3"}
var external_commonjs_d3_ease_commonjs2_d3_ease_amd_d3_ease_root_d3_ = __webpack_require__(11);
;// CONCATENATED MODULE: ./src/ChartInternal/interactions/flow.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/* harmony default export */ var interactions_flow = ({
  /**
   * Generate flow
   * @param {object} args option object
   * @returns {Function}
   * @private
   */
  generateFlow: function generateFlow(args) {
    var $$ = this,
        data = $$.data,
        state = $$.state,
        $el = $$.$el;
    return function () {
      var flowLength = args.flow.length; // set flag

      state.flowing = !0, data.targets.forEach(function (d) {
        d.values.splice(0, flowLength);
      }), $$.updateXGrid && $$.updateXGrid(!0);
      // target elements
      var elements = {};
      ["axis.x", "grid.x", "gridLines.x", "region.list", "text", "bar", "line", "area", "circle"].forEach(function (v) {
        var name = v.split("."),
            node = $el[name[0]];
        node && name.length > 1 && (node = node[name[1]]), node && node.size() && (elements[v] = node);
      }), $$.hideGridFocus(), $$.setFlowList(elements, args);
    };
  },

  /**
   * Set flow list
   * @param {object} elements Target elements
   * @param {object} args option object
   * @private
   */
  setFlowList: function setFlowList(elements, args) {
    var n,
        $$ = this,
        flow = args.flow,
        targets = args.targets,
        _flow = flow,
        _flow$duration = _flow.duration,
        duration = _flow$duration === void 0 ? args.duration : _flow$duration,
        flowIndex = _flow.index,
        flowLength = _flow.length,
        orgDataCount = _flow.orgDataCount,
        transform = $$.getFlowTransform(targets, orgDataCount, flowIndex, flowLength),
        wait = generateWait();
    wait.add(Object.keys(elements).map(function (v) {
      return n = elements[v].transition().ease(external_commonjs_d3_ease_commonjs2_d3_ease_amd_d3_ease_root_d3_.easeLinear).duration(duration), n = v === "axis.x" ? n.call(function (g) {
        $$.axis.x.setTransition(g).create(g);
      }) : v === "region.list" ? n.filter($$.isRegionOnX).attr("transform", transform) : n.attr("transform", transform), n;
    })), n.call(wait, function () {
      $$.cleanUpFlow(elements, args);
    });
  },

  /**
   * Clean up flow
   * @param {object} elements Target elements
   * @param {object} args option object
   * @private
   */
  cleanUpFlow: function cleanUpFlow(elements, args) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        svg = $$.$el.svg,
        isRotated = config.axis_rotated,
        flow = args.flow,
        shape = args.shape,
        xv = args.xv,
        _shape$pos = shape.pos,
        cx = _shape$pos.cx,
        cy = _shape$pos.cy,
        xForText = _shape$pos.xForText,
        yForText = _shape$pos.yForText,
        _flow2 = flow,
        _flow2$done = _flow2.done,
        done = _flow2$done === void 0 ? function () {} : _flow2$done,
        flowLength = _flow2.length;
    // draw again for removing flowed elements and reverting attr
    // callback for end of flow
    flowLength && (["circle", "text", "shape", "eventRect"].forEach(function (v) {
      var target = [];

      for (var i = 0; i < flowLength; i++) target.push("." + config_classes[v] + "-" + i);

      svg.selectAll("." + config_classes[v + "s"]) // circles, shapes, texts, eventRects
      .selectAll(target).remove();
    }), svg.select("." + config_classes.xgrid).remove()), Object.keys(elements).forEach(function (v) {
      var n = elements[v];
      if (v !== "axis.x" && n.attr("transform", null), v === "grid.x") n.attr(state.xgridAttr);else if (v === "gridLines.x") n.attr("x1", isRotated ? 0 : xv).attr("x2", isRotated ? state.width : xv);else if (v === "gridLines.x") n.select("line").attr("x1", isRotated ? 0 : xv).attr("x2", isRotated ? state.width : xv), n.select("text").attr("x", isRotated ? state.width : 0).attr("y", xv);else if (/^(area|bar|line)$/.test(v)) n.attr("d", shape.type[v]);else if (v === "text") n.attr("x", xForText).attr("y", yForText).style("fill-opacity", $$.opacityForText.bind($$));else if (v !== "circle") v === "region.list" && n.select("rect").filter($$.isRegionOnX).attr("x", $$.regionX.bind($$)).attr("width", $$.regionWidth.bind($$));else if ($$.isCirclePoint()) n.attr("cx", cx).attr("cy", cy);else {
        var xFunc = function (d) {
          return cx(d) - config.point_r;
        },
            yFunc = function (d) {
          return cy(d) - config.point_r;
        };

        n.attr("x", xFunc).attr("y", yFunc).attr("cx", cx) // when pattern is used, it possibly contain 'circle' also.
        .attr("cy", cy);
      }
    }), config.interaction_enabled && $$.redrawEventRect(), done.call($$.api), state.flowing = !1;
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
  getFlowTransform: function getFlowTransform(targets, orgDataCount, flowIndex, flowLength) {
    var translateX,
        $$ = this,
        data = $$.data,
        x = $$.scale.x,
        dataValues = data.targets[0].values,
        flowStart = $$.getValueOnIndex(dataValues, flowIndex),
        flowEnd = $$.getValueOnIndex(dataValues, flowIndex + flowLength),
        orgDomain = x.domain(),
        domain = $$.updateXDomain(targets, !0, !0);
    orgDataCount ? orgDataCount === 1 || (flowStart && flowStart.x) === (flowEnd && flowEnd.x) ? translateX = x(orgDomain[0]) - x(domain[0]) : translateX = $$.axis.isTimeSeries() ? x(orgDomain[0]) - x(domain[0]) : x(flowStart.x) - x(flowEnd.x) : dataValues.length === 1 ? $$.axis.isTimeSeries() ? (flowStart = $$.getValueOnIndex(dataValues, 0), flowEnd = $$.getValueOnIndex(dataValues, dataValues.length - 1), translateX = x(flowStart.x) - x(flowEnd.x)) : translateX = diffDomain(domain) / 2 : translateX = x(orgDomain[0]) - x(domain[0]);
    var scaleX = diffDomain(orgDomain) / diffDomain(domain);
    return "translate(" + translateX + ",0) scale(" + scaleX + ",1)";
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/clip.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/* harmony default export */ var clip = ({
  initClip: function initClip() {
    var $$ = this,
        clip = $$.state.clip;
    // MEMO: clipId needs to be unique because it conflicts when multiple charts exist
    // Define 'clip-path' attribute values
    clip.id = $$.state.datetimeId + "-clip", clip.idXAxis = clip.id + "-xaxis", clip.idYAxis = clip.id + "-yaxis", clip.idGrid = clip.id + "-grid", clip.path = $$.getClipPath(clip.id), clip.pathXAxis = $$.getClipPath(clip.idXAxis), clip.pathYAxis = $$.getClipPath(clip.idYAxis), clip.pathGrid = $$.getClipPath(clip.idGrid);
  },
  getClipPath: function getClipPath(id) {
    var $$ = this,
        config = $$.config;
    if (!config.clipPath && /-clip$/.test(id) || !config.axis_x_clipPath && /-clip-xaxis$/.test(id) || !config.axis_y_clipPath && /-clip-yaxis$/.test(id)) return null;
    var isIE9 = !!win.navigator && win.navigator.appVersion.toLowerCase().indexOf("msie 9.") >= 0;
    return "url(" + (isIE9 ? "" : browser_doc.URL.split("#")[0]) + "#" + id + ")";
  },
  appendClip: function appendClip(parent, id) {
    id && parent.append("clipPath").attr("id", id).append("rect");
  },

  /**
   * Set x Axis clipPath dimension
   * @param {d3Selecton} node clipPath <rect> selection
   * @private
   */
  setXAxisClipPath: function setXAxisClipPath(node) {
    var $$ = this,
        config = $$.config,
        _$$$state = $$.state,
        margin = _$$$state.margin,
        width = _$$$state.width,
        height = _$$$state.height,
        isRotated = config.axis_rotated,
        left = Math.max(30, margin.left) - (isRotated ? 0 : 20),
        x = isRotated ? -(1 + left) : -(left - 1),
        y = -Math.max(15, margin.top),
        w = isRotated ? margin.left + 20 : width + 10 + left,
        h = (isRotated ? margin.top + height + 10 : margin.bottom) + 20;
    node.attr("x", x).attr("y", y).attr("width", w).attr("height", h);
  },

  /**
   * Set y Axis clipPath dimension
   * @param {d3Selecton} node clipPath <rect> selection
   * @private
   */
  setYAxisClipPath: function setYAxisClipPath(node) {
    var $$ = this,
        config = $$.config,
        _$$$state2 = $$.state,
        margin = _$$$state2.margin,
        width = _$$$state2.width,
        height = _$$$state2.height,
        isRotated = config.axis_rotated,
        left = Math.max(30, margin.left) - (isRotated ? 20 : 0),
        isInner = config.axis_y_inner,
        x = isInner ? -1 : isRotated ? -(1 + left) : -(left - 1),
        y = -(isRotated ? 20 : margin.top),
        w = (isRotated ? width + 15 + left : margin.left + 20) + (isInner ? 20 : 0),
        h = (isRotated ? margin.bottom : margin.top + height) + 10;
    node.attr("x", x).attr("y", y).attr("width", w).attr("height", h);
  },
  updateXAxisTickClip: function updateXAxisTickClip() {
    var $$ = this,
        config = $$.config,
        _$$$state3 = $$.state,
        clip = _$$$state3.clip,
        xAxisHeight = _$$$state3.xAxisHeight,
        defs = $$.$el.defs,
        newXAxisHeight = $$.getHorizontalAxisHeight("x");

    if (defs && !clip.idXAxisTickTexts) {
      var clipId = clip.id + "-xaxisticktexts";
      $$.appendClip(defs, clipId), clip.pathXAxisTickTexts = $$.getClipPath(clip.idXAxisTickTexts), clip.idXAxisTickTexts = clipId;
    }

    !config.axis_x_tick_multiline && $$.getAxisTickRotate("x") && newXAxisHeight !== xAxisHeight && ($$.setXAxisTickClipWidth(), $$.setXAxisTickTextClipPathWidth()), $$.state.xAxisHeight = newXAxisHeight;
  },
  setXAxisTickClipWidth: function setXAxisTickClipWidth() {
    var $$ = this,
        config = $$.config,
        maxTickWidths = $$.state.current.maxTickWidths,
        xAxisTickRotate = $$.getAxisTickRotate("x");

    if (!config.axis_x_tick_multiline && xAxisTickRotate) {
      var sinRotation = Math.sin(Math.PI / 180 * Math.abs(xAxisTickRotate));
      maxTickWidths.x.clipPath = ($$.getHorizontalAxisHeight("x") - 20) / sinRotation;
    } else maxTickWidths.x.clipPath = null;
  },
  setXAxisTickTextClipPathWidth: function setXAxisTickTextClipPathWidth() {
    var $$ = this,
        _$$$state4 = $$.state,
        clip = _$$$state4.clip,
        current = _$$$state4.current,
        svg = $$.$el.svg;
    svg && svg.select("#" + clip.idXAxisTickTexts + " rect").attr("width", current.maxTickWidths.x.clipPath).attr("height", 30);
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/grid.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


 // Grid position and text anchor helpers

var getGridTextAnchor = function (d) {
  return isValue(d.position) || "end";
},
    getGridTextDx = function (d) {
  return d.position === "start" ? 4 : d.position === "middle" ? 0 : -4;
};

/**
 * Get grid text x value getter function
 * @param {boolean} isX Is x Axis
 * @param {number} width Width value
 * @param {number} height Height value
 * @returns {Function}
 * @private
 */
function getGridTextX(isX, width, height) {
  return function (d) {
    var x = isX ? 0 : width;
    return d.position === "start" ? x = isX ? -height : 0 : d.position === "middle" && (x = (isX ? -height : width) / 2), x;
  };
}
/**
 * Update coordinate attributes value
 * @param {d3.selection} el Target node
 * @param {string} type Type
 * @private
 */


function smoothLines(el, type) {
  type === "grid" && el.each(function () {
    var g = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
    ["x1", "x2", "y1", "y2"].forEach(function (v) {
      return g.attr(v, Math.ceil(+g.attr(v)));
    });
  });
}

/* harmony default export */ var grid = ({
  hasGrid: function hasGrid() {
    var config = this.config;
    return ["x", "y"].some(function (v) {
      return config["grid_" + v + "_show"] || config["grid_" + v + "_lines"].length;
    });
  },
  initGrid: function initGrid() {
    var $$ = this;
    $$.hasGrid() && $$.initGridLines(), $$.initFocusGrid();
  },
  initGridLines: function initGridLines() {
    var $$ = this,
        config = $$.config,
        clip = $$.state.clip,
        $el = $$.$el;
    (config.grid_x_lines.length || config.grid_y_lines.length) && ($el.gridLines.main = $el.main.insert("g", "." + config_classes.chart + (config.grid_lines_front ? " + *" : "")).attr("clip-path", clip.pathGrid).attr("class", config_classes.grid + " " + config_classes.gridLines), $el.gridLines.main.append("g").attr("class", config_classes.xgridLines), $el.gridLines.main.append("g").attr("class", config_classes.ygridLines), $el.gridLines.x = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.selectAll)([]));
  },
  updateXGrid: function updateXGrid(withoutUpdate) {
    var $$ = this,
        config = $$.config,
        scale = $$.scale,
        state = $$.state,
        _$$$$el = $$.$el,
        main = _$$$$el.main,
        grid = _$$$$el.grid,
        isRotated = config.axis_rotated,
        xgridData = $$.generateGridData(config.grid_x_type, scale.x),
        tickOffset = $$.axis.isCategorized() ? $$.axis.x.tickOffset() : 0,
        pos = function (d) {
      return (scale.zoom || scale.x)(d) + tickOffset * (isRotated ? -1 : 1);
    };

    state.xgridAttr = isRotated ? {
      "x1": 0,
      "x2": state.width,
      "y1": pos,
      "y2": pos
    } : {
      "x1": pos,
      "x2": pos,
      "y1": 0,
      "y2": state.height
    }, grid.x = main.select("." + config_classes.xgrids).selectAll("." + config_classes.xgrid).data(xgridData), grid.x.exit().remove(), grid.x = grid.x.enter().append("line").attr("class", config_classes.xgrid).merge(grid.x), withoutUpdate || grid.x.each(function () {
      var grid = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      Object.keys(state.xgridAttr).forEach(function (id) {
        grid.attr(id, state.xgridAttr[id]).style("opacity", function () {
          return grid.attr(isRotated ? "y1" : "x1") === (isRotated ? state.height : 0) ? "0" : null;
        });
      });
    });
  },
  updateYGrid: function updateYGrid() {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        _$$$$el2 = $$.$el,
        grid = _$$$$el2.grid,
        main = _$$$$el2.main,
        isRotated = config.axis_rotated,
        gridValues = $$.axis.y.tickValues() || $$.scale.y.ticks(config.grid_y_ticks),
        pos = function (d) {
      return Math.ceil($$.scale.y(d));
    };

    grid.y = main.select("." + config_classes.ygrids).selectAll("." + config_classes.ygrid).data(gridValues), grid.y.exit().remove(), grid.y = grid.y.enter().append("line").attr("class", config_classes.ygrid).merge(grid.y), grid.y.attr("x1", isRotated ? pos : 0).attr("x2", isRotated ? pos : state.width).attr("y1", isRotated ? 0 : pos).attr("y2", isRotated ? state.height : pos), smoothLines(grid.y, "grid");
  },
  updateGrid: function updateGrid(duration) {
    var $$ = this,
        _$$$$el3 = $$.$el,
        grid = _$$$$el3.grid,
        gridLines = _$$$$el3.gridLines;
    // hide if arc type
    gridLines.main || $$.initGridLines(), grid.main.style("visibility", $$.hasArcType() ? "hidden" : null), $$.hideGridFocus(), $$.updateXGridLines(duration), $$.updateYGridLines(duration);
  },

  /**
   * Update X Grid lines
   * @param {number} duration Dration value
   * @private
   */
  updateXGridLines: function updateXGridLines(duration) {
    var $$ = this,
        config = $$.config,
        _$$$$el4 = $$.$el,
        gridLines = _$$$$el4.gridLines,
        main = _$$$$el4.main,
        isRotated = config.axis_rotated;
    config.grid_x_show && $$.updateXGrid();
    var xLines = main.select("." + config_classes.xgridLines).selectAll("." + config_classes.xgridLine).data(config.grid_x_lines); // exit

    xLines.exit().transition().duration(duration).style("opacity", "0").remove();
    // enter
    var xgridLine = xLines.enter().append("g");
    xgridLine.append("line").style("opacity", "0"), xgridLine.append("text").attr("transform", isRotated ? "" : "rotate(-90)").attr("dy", -5).style("opacity", "0"), xLines = xgridLine.merge(xLines), xLines.attr("class", function (d) {
      return (config_classes.xgridLine + " " + (d.class || "")).trim();
    }).select("text").attr("text-anchor", getGridTextAnchor).attr("dx", getGridTextDx).transition().duration(duration).text(function (d) {
      return d.text;
    }).transition().style("opacity", null), gridLines.x = xLines;
  },

  /**
   * Update Y Grid lines
   * @param {number} duration Duration value
   * @private
   */
  updateYGridLines: function updateYGridLines(duration) {
    var $$ = this,
        config = $$.config,
        _$$$state = $$.state,
        width = _$$$state.width,
        height = _$$$state.height,
        $el = $$.$el,
        isRotated = config.axis_rotated;
    config.grid_y_show && $$.updateYGrid();
    var ygridLines = $el.main.select("." + config_classes.ygridLines).selectAll("." + config_classes.ygridLine).data(config.grid_y_lines); // exit

    ygridLines.exit().transition().duration(duration).style("opacity", "0").remove();
    // enter
    var ygridLine = ygridLines.enter().append("g");
    ygridLine.append("line").style("opacity", "0"), ygridLine.append("text").attr("transform", isRotated ? "rotate(-90)" : "").style("opacity", "0"), ygridLines = ygridLine.merge(ygridLines);
    // update
    var yv = $$.yv.bind($$);
    ygridLines.attr("class", function (d) {
      return (config_classes.ygridLine + " " + (d.class || "")).trim();
    }).select("line").transition().duration(duration).attr("x1", isRotated ? yv : 0).attr("x2", isRotated ? yv : width).attr("y1", isRotated ? 0 : yv).attr("y2", isRotated ? height : yv).transition().style("opacity", null), ygridLines.select("text").attr("text-anchor", getGridTextAnchor).attr("dx", getGridTextDx).transition().duration(duration).attr("dy", -5).attr("x", getGridTextX(isRotated, width, height)).attr("y", yv).text(function (d) {
      return d.text;
    }).transition().style("opacity", null), $el.gridLines.y = ygridLines;
  },
  redrawGrid: function redrawGrid(withTransition) {
    var $$ = this,
        isRotated = $$.config.axis_rotated,
        _$$$state2 = $$.state,
        width = _$$$state2.width,
        height = _$$$state2.height,
        gridLines = $$.$el.gridLines,
        xv = $$.xv.bind($$),
        lines = gridLines.x.select("line"),
        texts = gridLines.x.select("text");
    return lines = (withTransition ? lines.transition() : lines).attr("x1", isRotated ? 0 : xv).attr("x2", isRotated ? width : xv).attr("y1", isRotated ? xv : 0).attr("y2", isRotated ? xv : height), texts = (withTransition ? texts.transition() : texts).attr("x", getGridTextX(!isRotated, width, height)).attr("y", xv).text(function (d) {
      return d.text;
    }), [lines.style("opacity", null), texts.style("opacity", null)];
  },
  initFocusGrid: function initFocusGrid() {
    var $$ = this,
        config = $$.config,
        clip = $$.state.clip,
        $el = $$.$el,
        isFront = config.grid_front,
        className = "." + config_classes[isFront && $el.gridLines.main ? "gridLines" : "chart"] + (isFront ? " + *" : ""),
        grid = $el.main.insert("g", className).attr("clip-path", clip.pathGrid).attr("class", config_classes.grid);
    $el.grid.main = grid, config.grid_x_show && grid.append("g").attr("class", config_classes.xgrids), config.grid_y_show && grid.append("g").attr("class", config_classes.ygrids), config.interaction_enabled && config.grid_focus_show && (grid.append("g").attr("class", config_classes.xgridFocus).append("line").attr("class", config_classes.xgridFocus), config.grid_focus_y && !config.tooltip_grouped && grid.append("g").attr("class", config_classes.ygridFocus).append("line").attr("class", config_classes.ygridFocus));
  },

  /**
   * Show grid focus line
   * @param {Array} data Selected data
   * @private
   */
  showGridFocus: function showGridFocus(data) {
    var $$ = this,
        config = $$.config,
        _$$$state3 = $$.state,
        width = _$$$state3.width,
        height = _$$$state3.height,
        isRotated = config.axis_rotated,
        focusEl = $$.$el.main.selectAll("line." + config_classes.xgridFocus + ", line." + config_classes.ygridFocus),
        dataToShow = (data || [focusEl.datum()]).filter(function (d) {
      return d && isValue($$.getBaseValue(d));
    });

    // Hide when bubble/scatter/stanford plot exists
    if (!(!config.tooltip_show || dataToShow.length === 0 || $$.hasType("bubble") || $$.hasArcType())) {
      var isEdge = config.grid_focus_edge && !config.tooltip_grouped,
          xx = $$.xx.bind($$);
      focusEl.style("visibility", null).data(dataToShow.concat(dataToShow)).each(function (d) {
        var xy,
            el = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
            pos = {
          x: xx(d),
          y: $$.getYScaleById(d.id)(d.value)
        };
        if (el.classed(config_classes.xgridFocus)) xy = isRotated ? [null, // x1
        pos.x, // y1
        isEdge ? pos.y : width, // x2
        pos.x // y2
        ] : [pos.x, isEdge ? pos.y : null, pos.x, height];else {
          var isY2 = $$.axis.getId(d.id) === "y2";
          xy = isRotated ? [pos.y, // x1
          isEdge && !isY2 ? pos.x : null, // y1
          pos.y, // x2
          isEdge && isY2 ? pos.x : height // y2
          ] : [isEdge && isY2 ? pos.x : null, pos.y, isEdge && !isY2 ? pos.x : width, pos.y];
        }
        ["x1", "y1", "x2", "y2"].forEach(function (v, i) {
          return el.attr(v, xy[i]);
        });
      }), smoothLines(focusEl, "grid"), $$.showCircleFocus && $$.showCircleFocus(data);
    }
  },
  hideGridFocus: function hideGridFocus() {
    var $$ = this,
        _$$$state4 = $$.state,
        inputType = _$$$state4.inputType,
        resizing = _$$$state4.resizing,
        main = $$.$el.main;
    inputType !== "mouse" && resizing || (main.selectAll("line." + config_classes.xgridFocus + ", line." + config_classes.ygridFocus).style("visibility", "hidden"), $$.hideCircleFocus && $$.hideCircleFocus());
  },
  updateGridFocus: function updateGridFocus() {
    var $$ = this,
        _$$$state5 = $$.state,
        inputType = _$$$state5.inputType,
        width = _$$$state5.width,
        height = _$$$state5.height,
        resizing = _$$$state5.resizing,
        grid = $$.$el.grid,
        xgridFocus = grid.main.select("line." + config_classes.xgridFocus);
    if (inputType === "touch") xgridFocus.empty() ? resizing && $$.showCircleFocus() : $$.showGridFocus();else {
      var _isRotated = $$.config.axis_rotated;
      xgridFocus.attr("x1", _isRotated ? 0 : -10).attr("x2", _isRotated ? width : -10).attr("y1", _isRotated ? -10 : 0).attr("y2", _isRotated ? -10 : height);
    } // need to return 'true' as of being pushed to the redraw list
    // ref: getRedrawList()

    return !0;
  },
  generateGridData: function generateGridData(type, scale) {
    var $$ = this,
        tickNum = $$.$el.main.select("." + config_classes.axisX).selectAll(".tick").size(),
        gridData = [];

    if (type === "year") {
      var xDomain = $$.getXDomain(),
          firstYear = xDomain[0].getFullYear(),
          lastYear = xDomain[1].getFullYear();

      for (var i = firstYear; i <= lastYear; i++) gridData.push(new Date(i + "-01-01 00:00:00"));
    } else gridData = scale.ticks(10), gridData.length > tickNum && (gridData = gridData.filter(function (d) {
      return (d + "").indexOf(".") < 0;
    }));

    return gridData;
  },
  getGridFilterToRemove: function getGridFilterToRemove(params) {
    return params ? function (line) {
      var found = !1;
      return (isArray(params) ? params.concat() : [params]).forEach(function (param) {
        ("value" in param && line.value === param.value || "class" in param && line.class === param.class) && (found = !0);
      }), found;
    } : function () {
      return !0;
    };
  },
  removeGridLines: function removeGridLines(params, forX) {
    var $$ = this,
        config = $$.config,
        toRemove = $$.getGridFilterToRemove(params),
        classLines = forX ? config_classes.xgridLines : config_classes.ygridLines,
        classLine = forX ? config_classes.xgridLine : config_classes.ygridLine;
    $$.$el.main.select("." + classLines).selectAll("." + classLine).filter(toRemove).transition().duration(config.transition_duration).style("opacity", "0").remove();
    var gridLines = "grid_" + (forX ? "x" : "y") + "_lines";
    config[gridLines] = config[gridLines].filter(function toShow(line) {
      return !toRemove(line);
    });
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/region.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
 // selection



/* harmony default export */ var region = ({
  initRegion: function initRegion() {
    var $$ = this,
        $el = $$.$el;
    $el.region.main = $el.main.insert("g", ":first-child").attr("clip-path", $$.state.clip.path).attr("class", config_classes.regions);
  },
  updateRegion: function updateRegion(duration) {
    var $$ = this,
        config = $$.config,
        region = $$.$el.region;
    region.main || $$.initRegion(), region.main.style("visibility", $$.hasArcType() ? "hidden" : null);
    // select <g> element
    var list = region.main.selectAll("." + config_classes.region).data(config.regions);
    list.exit().transition().duration(duration).style("opacity", "0").remove(), list = list.enter().append("g").merge(list).attr("class", $$.classRegion.bind($$)), list.append("rect").style("fill-opacity", "0"), region.list = list;
  },
  redrawRegion: function redrawRegion(withTransition) {
    var $$ = this,
        regions = $$.$el.region.list.select("rect");
    return regions = (withTransition ? regions.transition() : regions).attr("x", $$.regionX.bind($$)).attr("y", $$.regionY.bind($$)).attr("width", $$.regionWidth.bind($$)).attr("height", $$.regionHeight.bind($$)), [(withTransition ? regions.transition() : regions).style("fill-opacity", function (d) {
      return isValue(d.opacity) ? d.opacity : null;
    }).on("end", function () {
      (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this.parentNode).selectAll("rect:not([x])").remove();
    })];
  },
  getRegionXY: function getRegionXY(type, d) {
    var currScale,
        $$ = this,
        config = $$.config,
        scale = $$.scale,
        isRotated = config.axis_rotated,
        isX = type === "x",
        key = "start",
        pos = 0;
    return d.axis === "y" || d.axis === "y2" ? (!isX && (key = "end"), (isX ? isRotated : !isRotated) && key in d && (currScale = scale[d.axis], pos = currScale(d[key]))) : (isX ? !isRotated : isRotated) && key in d && (currScale = scale.zoom || scale.x, pos = currScale($$.axis.isTimeSeries() ? parseDate.call($$, d[key]) : d[key])), pos;
  },
  regionX: function regionX(d) {
    return this.getRegionXY("x", d);
  },
  regionY: function regionY(d) {
    return this.getRegionXY("y", d);
  },
  getRegionSize: function getRegionSize(type, d) {
    var currScale,
        $$ = this,
        config = $$.config,
        scale = $$.scale,
        state = $$.state,
        isRotated = config.axis_rotated,
        isWidth = type === "width",
        start = $$[isWidth ? "regionX" : "regionY"](d),
        key = "end",
        end = state[type];
    return d.axis === "y" || d.axis === "y2" ? (!isWidth && (key = "start"), (isWidth ? isRotated : !isRotated) && key in d && (currScale = scale[d.axis], end = currScale(d[key]))) : (isWidth ? !isRotated : isRotated) && key in d && (currScale = scale.zoom || scale.x, end = currScale($$.axis.isTimeSeries() ? parseDate.call($$, d[key]) : d[key])), end < start ? 0 : end - start;
  },
  regionWidth: function regionWidth(d) {
    return this.getRegionSize("width", d);
  },
  regionHeight: function regionHeight(d) {
    return this.getRegionSize("height", d);
  },
  isRegionOnX: function isRegionOnX(d) {
    return !d.axis || d.axis === "x";
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/size.axis.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* harmony default export */ var size_axis = ({
  /**
   * Get Axis size according its position
   * @param {string} id Axis id value - x, y or y2
   * @returns {number} size Axis size value
   * @private
   */
  getAxisSize: function getAxisSize(id) {
    var $$ = this,
        isRotated = $$.config.axis_rotated;
    return isRotated && id === "x" || !isRotated && /y2?/.test(id) ? $$.getAxisWidthByAxisId(id, !0) : $$.getHorizontalAxisHeight(id);
  },
  getAxisWidthByAxisId: function getAxisWidthByAxisId(id, withoutRecompute) {
    var $$ = this;

    if ($$.axis) {
      var position = $$.axis && $$.axis.getLabelPositionById(id);
      return $$.axis.getMaxTickWidth(id, withoutRecompute) + (position.isInner ? 20 : 40);
    }

    return 40;
  },
  getHorizontalAxisHeight: function getHorizontalAxisHeight(id) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        _state = state,
        current = _state.current,
        rotatedPadding = _state.rotatedPadding,
        isLegendRight = _state.isLegendRight,
        isLegendInset = _state.isLegendInset,
        isRotated = config.axis_rotated,
        h = 30;
    if (id === "x" && !config.axis_x_show) return 8;
    if (id === "x" && config.axis_x_height) return config.axis_x_height;
    if (id === "y" && !config.axis_y_show) return !config.legend_show || isLegendRight || isLegendInset ? 1 : 10;
    if (id === "y2" && !config.axis_y2_show) return rotatedPadding.top;
    var rotate = $$.getAxisTickRotate(id); // Calculate x/y axis height when tick rotated

    return (id === "x" && !isRotated || /y2?/.test(id) && isRotated) && rotate && (h = 30 + $$.axis.getMaxTickWidth(id) * Math.cos(Math.PI * (90 - Math.abs(rotate)) / 180), !config.axis_x_tick_multiline && current.height && h > current.height / 2 && (h = current.height / 2)), h + ($$.axis.getLabelPositionById(id).isInner ? 0 : 10) + (id !== "y2" || isRotated ? 0 : -10);
  },
  getEventRectWidth: function getEventRectWidth() {
    return Math.max(0, this.axis.x.tickInterval());
  },

  /**
   * Get axis tick test rotate value
   * @param {string} id Axis id
   * @returns {number} rotate value
   * @private
   */
  getAxisTickRotate: function getAxisTickRotate(id) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        state = $$.state,
        $el = $$.$el,
        rotate = config["axis_" + id + "_tick_rotate"];

    if (id === "x") {
      var allowedXAxisTypes = axis.isCategorized() || axis.isTimeSeries();

      if (config.axis_x_tick_fit && allowedXAxisTypes) {
        var xTickCount = config.axis_x_tick_count,
            currentXTicksLength = state.current.maxTickWidths.x.ticks.length,
            tickCount = 0;
        xTickCount ? tickCount = xTickCount > currentXTicksLength ? currentXTicksLength : xTickCount : currentXTicksLength && (tickCount = currentXTicksLength), tickCount !== state.axis.x.tickCount && (state.axis.x.padding = $$.axis.getXAxisPadding(tickCount)), state.axis.x.tickCount = tickCount;
      }

      $el.svg && config.axis_x_tick_fit && !config.axis_x_tick_multiline && !config.axis_x_tick_culling && config.axis_x_tick_autorotate && allowedXAxisTypes && (rotate = $$.needToRotateXAxisTickTexts() ? config.axis_x_tick_rotate : 0);
    }

    return rotate;
  },

  /**
   * Check weather axis tick text needs to be rotated
   * @returns {boolean}
   * @private
   */
  needToRotateXAxisTickTexts: function needToRotateXAxisTickTexts() {
    var $$ = this,
        _$$$state = $$.state,
        axis = _$$$state.axis,
        current = _$$$state.current,
        xAxisLength = current.width - $$.getCurrentPaddingLeft(!1) - $$.getCurrentPaddingRight(),
        tickCountWithPadding = axis.x.tickCount + axis.x.padding.left + axis.x.padding.right,
        maxTickWidth = $$.axis.getMaxTickWidth("x"),
        tickLength = tickCountWithPadding ? xAxisLength / tickCountWithPadding : 0;
    return maxTickWidth > tickLength;
  }
});
;// CONCATENATED MODULE: ./src/config/Options/data/axis.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Axis based chart data config options
 */
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
   * @see [D3's time specifier](https://github.com/d3/d3-time-format#locale_format)
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
  data_xLocaltime: !0,

  /**
   * Sort on x axis.
   * @name data․xSort
   * @memberof Options
   * @type {boolean}
   * @default true
   * @example
   * data: {
   *   xSort: false
   * }
   */
  data_xSort: !0,

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
   *   - [style.dasharray="2 2"] {object}: The first number specifies a distance for the filled area, and the second a distance for the unfilled area.
   * - **NOTE:** Currently this option supports only line chart and dashed style. If this option specified, the line will be dashed only in the regions.
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
  data_stack_normalize: !1
});
;// CONCATENATED MODULE: ./src/config/Options/axis/x.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * x Axis config options
 */
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
  axis_x_clipPath: !0,

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
  axis_x_show: !0,

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
   *
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
  axis_x_localtime: !0,

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
  axis_x_tick_centered: !1,

  /**
   * A function to format tick value. Format string is also available for timeseries data.
   * @name axis․x․tick․format
   * @memberof Options
   * @type {Function|string}
   * @default undefined
   * @see [D3's time specifier](https://github.com/d3/d3-time-format#locale_format)
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
  axis_x_tick_format: undefined,

  /**
   * Setting for culling ticks.<br><br>
   * If true is set, the ticks will be culled, then only limitted tick text will be shown. This option does not hide the tick lines. If false is set, all of ticks will be shown.<br><br>
   * We can change the number of ticks to be shown by axis.x.tick.culling.max.
   * @name axis․x․tick․culling
   * @memberof Options
   * @type {boolean}
   * @default
   * - true for indexed axis and timeseries axis
   * - false for category axis
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
  axis_x_tick_count: undefined,

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
  axis_x_tick_show: !0,

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
  axis_x_tick_text_show: !0,

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
  axis_x_tick_text_position: {
    x: 0,
    y: 0
  },

  /**
   * Fit x axis ticks.
   * - **true**: ticks will be positioned nicely to have same intervals.
   * - **false**: ticks will be positioned according to x value of the data points.
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
  axis_x_tick_fit: !0,

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
  axis_x_tick_autorotate: !1,

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
  axis_x_tick_outer: !0,

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
  axis_x_tick_multiline: !0,

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
   * Set to display system tooltip(via 'title' attribute) for tick text
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
  axis_x_tick_tooltip: !1,

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
  axis_x_max: undefined,

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
  axis_x_min: undefined,

  /**
   * Set padding for x axis.<br><br>
   * If this option is set, the range of x axis will increase/decrease according to the values.
   * If no padding is needed in the rage of x axis, 0 should be set.
   * - **NOTE:**
   *   The padding values aren't based on pixels. It differs according axis types<br>
   *   - **category:** The unit of tick value
   *     ex. the given value `1`, is same as the width of 1 tick width
   *   - **timeseries:** Numeric time value
   *     ex. the given value `1000*60*60*24`, which is numeric time equivalent of a day, is same as the width of 1 tick width
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
   *     padding: 10
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
  axis_x_height: undefined,

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
  axis_x_extent: undefined,

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
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * y Axis  config options
 */
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
  axis_y_clipPath: !0,

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
  axis_y_show: !0,

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
  axis_y_max: undefined,

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
  axis_y_min: undefined,

  /**
   * Change the direction of y axis.<br><br>
   * If true set, the direction will be from the top to the bottom.
   * @name axis․y․inverted
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * axis: {
   *   y: {
   *     inverted: true
   *   }
   * }
   */
  axis_y_inverted: !1,

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
  axis_y_center: undefined,

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
  axis_y_inner: !1,

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
  axis_y_tick_format: undefined,

  /**
   * Setting for culling ticks.<br><br>
   * If true is set, the ticks will be culled, then only limitted tick text will be shown. This option does not hide the tick lines. If false is set, all of ticks will be shown.<br><br>
   * We can change the number of ticks to be shown by axis.y.tick.culling.max.
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
  axis_y_tick_culling: !1,

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
  axis_y_tick_outer: !0,

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
  axis_y_tick_count: undefined,

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
  axis_y_tick_show: !0,

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
  axis_y_tick_text_show: !0,

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
  axis_y_tick_text_position: {
    x: 0,
    y: 0
  },

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
  axis_y_tick_time_value: undefined,

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
  axis_y_default: undefined,

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
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * y2 Axis  config options
 */
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
  axis_y2_show: !1,

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
  axis_y2_max: undefined,

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
  axis_y2_min: undefined,

  /**
   * Change the direction of y2 axis.<br><br>
   * If true set, the direction will be from the top to the bottom.
   * @name axis․y2․inverted
   * @memberof Options
   * @type {boolean}
   * @default false
   * @example
   * axis: {
   *   y2: {
   *     inverted: true
   *   }
   * }
   */
  axis_y2_inverted: !1,

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
  axis_y2_center: undefined,

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
  axis_y2_inner: !1,

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
  axis_y2_tick_format: undefined,

  /**
   * Setting for culling ticks.<br><br>
   * If true is set, the ticks will be culled, then only limitted tick text will be shown. This option does not hide the tick lines. If false is set, all of ticks will be shown.<br><br>
   * We can change the number of ticks to be shown by axis.y.tick.culling.max.
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
  axis_y2_tick_culling: !1,

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
  axis_y2_tick_outer: !0,

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
  axis_y2_tick_count: undefined,

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
  axis_y2_tick_show: !0,

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
  axis_y2_tick_text_show: !0,

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
  axis_y2_tick_text_position: {
    x: 0,
    y: 0
  },

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
  axis_y2_default: undefined,

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


function axis_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function axis_objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? axis_ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : axis_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



/**
 * y Axis  config options
 */

/* harmony default export */ var axis_axis = (axis_objectSpread(axis_objectSpread(axis_objectSpread({
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
  axis_rotated: !1
}, axis_x), y), y2));
;// CONCATENATED MODULE: ./src/config/Options/common/grid.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * grid config options
 */
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
   * @property {number} [y.ticks=10] Number of y grids to be shown.
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
  grid_x_show: !1,
  grid_x_type: "tick",
  grid_x_lines: [],
  grid_y_show: !1,
  grid_y_lines: [],
  grid_y_ticks: 10,
  grid_focus_edge: !1,
  grid_focus_show: !0,
  grid_focus_y: !1,
  grid_front: !1,
  grid_lines_front: !0
});
;// CONCATENATED MODULE: ./src/config/resolver/axis.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Modules exports for Axis based chart
 */
// Chart







 // ChartInternal







 // Axis based options




var api = [api_axis, api_category, grid_x, grid_y, flow, group, api_regions, x];
var internal = [Axis, clip, eventrect, interactions_flow, grid, region, size_axis];
var options = [data_axis, axis_axis, common_grid];
// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(12);
;// CONCATENATED MODULE: ./src/ChartInternal/shape/arc.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */






/* harmony default export */ var arc = ({
  initPie: function initPie() {
    var $$ = this,
        config = $$.config,
        dataType = config.data_type,
        padding = config.pie_padding,
        startingAngle = config[dataType + "_startingAngle"] || 0,
        padAngle = ($$.hasType("pie") && padding ? padding * .01 : config[dataType + "_padAngle"]) || 0;
    $$.pie = (0,external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.pie)().startAngle(startingAngle).endAngle(startingAngle + 2 * Math.PI).padAngle(padAngle).value(function (d) {
      return d.values.reduce(function (a, b) {
        return a + b.value;
      }, 0);
    }).sort($$.getSortCompareFn.bind($$)(!0));
  },
  updateRadius: function updateRadius() {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        padding = config.pie_padding,
        w = config.gauge_width || config.donut_width,
        gaugeArcWidth = $$.filterTargetsToShow($$.data.targets).length * config.gauge_arcs_minWidth;
    state.radiusExpanded = Math.min(state.arcWidth, state.arcHeight) / 2 * ($$.hasMultiArcGauge() ? .85 : 1), state.radius = state.radiusExpanded * .95, state.innerRadiusRatio = w ? (state.radius - w) / state.radius : .6, state.gaugeArcWidth = w || (gaugeArcWidth <= state.radius - state.innerRadius ? state.radius - state.innerRadius : gaugeArcWidth <= state.radius ? gaugeArcWidth : state.radius);
    var innerRadius = config.pie_innerRadius || (padding ? padding * (state.innerRadiusRatio + .1) : 0); // NOTE: inner/outerRadius can be an object by user setting, only for 'pie' type

    state.outerRadius = config.pie_outerRadius, state.innerRadius = $$.hasType("donut") || $$.hasType("gauge") ? state.radius * state.innerRadiusRatio : innerRadius;
  },

  /**
   * Get pie's inner & outer radius value
   * @param {object|undefined} d Data object
   * @returns {object}
   * @private
   */
  getRadius: function getRadius(d) {
    var $$ = this,
        data = d && d.data,
        _$$$state = $$.state,
        innerRadius = _$$$state.innerRadius,
        outerRadius = _$$$state.outerRadius;
    return !isNumber(innerRadius) && data && (innerRadius = innerRadius[data.id] || 0), isObject(outerRadius) && data && data.id in outerRadius ? outerRadius = outerRadius[data.id] : !isNumber(outerRadius) && (outerRadius = $$.state.radius), {
      innerRadius: innerRadius,
      outerRadius: outerRadius
    };
  },
  updateArc: function updateArc() {
    var $$ = this;
    $$.updateRadius(), $$.svgArc = $$.getSvgArc(), $$.svgArcExpanded = $$.getSvgArcExpanded();
  },
  getArcLength: function getArcLength() {
    var $$ = this,
        config = $$.config,
        arcLengthInPercent = config.gauge_arcLength * 3.6,
        len = 2 * (arcLengthInPercent / 360);
    return arcLengthInPercent < -360 ? len = -2 : arcLengthInPercent > 360 && (len = 2), len * Math.PI;
  },
  getStartAngle: function getStartAngle() {
    var $$ = this,
        config = $$.config,
        isFullCircle = config.gauge_fullCircle,
        defaultStartAngle = -1 * Math.PI / 2,
        defaultEndAngle = Math.PI / 2,
        startAngle = config.gauge_startingAngle;
    return !isFullCircle && startAngle <= defaultStartAngle ? startAngle = defaultStartAngle : !isFullCircle && startAngle >= defaultEndAngle ? startAngle = defaultEndAngle : (startAngle > Math.PI || startAngle < -1 * Math.PI) && (startAngle = Math.PI), startAngle;
  },
  updateAngle: function updateAngle(dValue) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        pie = $$.pie,
        d = dValue,
        found = !1;
    if (!config) return null;
    var gStart = $$.getStartAngle(),
        radius = config.gauge_fullCircle ? $$.getArcLength() : gStart * -2;

    if (d.data && $$.isGaugeType(d.data) && !$$.hasMultiArcGauge()) {
      var _config = config,
          min = _config.gauge_min,
          max = _config.gauge_max,
          totalSum = $$.getTotalDataSum(state.rendered); // to prevent excluding total data sum during the init(when data.hide option is used), use $$.rendered state value

      pie = pie.startAngle(gStart).endAngle(radius * ((totalSum - min) / (max - min)) + gStart);
    }

    if (pie($$.filterTargetsToShow()).forEach(function (t, i) {
      found || t.data.id !== d.data.id || (found = !0, d = t, d.index = i);
    }), isNaN(d.startAngle) && (d.startAngle = 0), isNaN(d.endAngle) && (d.endAngle = d.startAngle), d.data && $$.hasMultiArcGauge()) {
      var gMin = config.gauge_min,
          gMax = config.gauge_max,
          gValue = d.value < gMin ? 0 : d.value < gMax ? d.value - gMin : gMax - gMin;
      d.startAngle = gStart, d.endAngle = gStart + radius / (gMax - gMin) * gValue;
    }

    return found ? d : null;
  },
  getSvgArc: function getSvgArc() {
    var $$ = this,
        state = $$.state,
        singleArcWidth = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length,
        hasMultiArcGauge = $$.hasMultiArcGauge(),
        arc = (0,external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.arc)().innerRadius(function (d) {
      var _$$$getRadius = $$.getRadius(d),
          innerRadius = _$$$getRadius.innerRadius;

      return hasMultiArcGauge ? state.radius - singleArcWidth * (d.index + 1) : isNumber(innerRadius) ? innerRadius : 0;
    }).outerRadius(function (d) {
      var _$$$getRadius2 = $$.getRadius(d),
          outerRadius = _$$$getRadius2.outerRadius;

      return hasMultiArcGauge ? state.radius - singleArcWidth * d.index : outerRadius;
    }),
        newArc = function (d, withoutUpdate) {
      var path = "M 0 0";

      if (d.value || d.data) {
        var updated = !withoutUpdate && $$.updateAngle(d);
        withoutUpdate ? path = arc(d) : updated && (path = arc(updated));
      }

      return path;
    };

    return newArc.centroid = arc.centroid, newArc;
  },
  getSvgArcExpanded: function getSvgArcExpanded(rate) {
    var $$ = this,
        state = $$.state,
        newRate = rate || 1,
        singleArcWidth = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length,
        hasMultiArcGauge = $$.hasMultiArcGauge(),
        expandWidth = Math.min(state.radiusExpanded * newRate - state.radius, singleArcWidth * .8 - (1 - newRate) * 100),
        arc = (0,external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.arc)().innerRadius(function (d) {
      return hasMultiArcGauge ? state.radius - singleArcWidth * (d.index + 1) : $$.getRadius(d).innerRadius;
    }).outerRadius(function (d) {
      var radius;
      if (hasMultiArcGauge) radius = state.radius - singleArcWidth * d.index + expandWidth;else {
        var _$$$getRadius3 = $$.getRadius(d),
            outerRadius = _$$$getRadius3.outerRadius,
            radiusExpanded = state.radiusExpanded;

        state.radius !== outerRadius && (radiusExpanded -= Math.abs(state.radius - outerRadius)), radius = radiusExpanded * newRate;
      }
      return radius;
    });
    return function (d) {
      var updated = $$.updateAngle(d);
      return updated ? arc(updated) : "M 0 0";
    };
  },
  getArc: function getArc(d, withoutUpdate, force) {
    return force || this.isArcType(d.data) ? this.svgArc(d, withoutUpdate) : "M 0 0";
  },
  transformForArcLabel: function transformForArcLabel(d) {
    var $$ = this,
        config = $$.config,
        radiusExpanded = $$.state.radiusExpanded,
        updated = $$.updateAngle(d),
        translate = "";
    if (updated) if ($$.hasMultiArcGauge()) {
      var y1 = Math.sin(updated.endAngle - Math.PI / 2),
          x = Math.cos(updated.endAngle - Math.PI / 2) * (radiusExpanded + 25),
          y = y1 * (radiusExpanded + 15 - Math.abs(y1 * 10)) + 3;
      translate = "translate(" + x + "," + y + ")";
    } else if (!$$.hasType("gauge") || $$.data.targets.length > 1) {
      var _$$$getRadius4 = $$.getRadius(d),
          outerRadius = _$$$getRadius4.outerRadius,
          c = this.svgArc.centroid(updated),
          x = isNaN(c[0]) ? 0 : c[0],
          y = isNaN(c[1]) ? 0 : c[1],
          h = Math.sqrt(x * x + y * y),
          ratio = $$.hasType("donut") && config.donut_label_ratio || $$.hasType("pie") && config.pie_label_ratio;

      ratio = ratio ? isFunction(ratio) ? ratio.bind($$.api)(d, outerRadius, h) : ratio : outerRadius && (h ? (36 / outerRadius > .375 ? 1.175 - 36 / outerRadius : .8) * outerRadius / h : 0), translate = "translate(" + x * ratio + "," + y * ratio + ")";
    }
    return translate;
  },
  convertToArcData: function convertToArcData(d) {
    return this.addName({
      id: d.data ? d.data.id : d.id,
      value: d.value,
      ratio: this.getRatio("arc", d),
      index: d.index
    });
  },
  textForArcLabel: function textForArcLabel(selection) {
    var $$ = this,
        hasGauge = $$.hasType("gauge");
    $$.shouldShowArcLabel() && selection.style("fill", $$.updateTextColor.bind($$)).attr("filter", $$.updateTextBacgroundColor.bind($$)).each(function (d) {
      var node = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
          updated = $$.updateAngle(d),
          ratio = $$.getRatio("arc", updated),
          isUnderThreshold = $$.meetsLabelThreshold(ratio, $$.hasType("donut") && "donut" || $$.hasType("gauge") && "gauge" || $$.hasType("pie") && "pie");

      if (isUnderThreshold) {
        var value = (updated || d).value,
            text = ($$.getArcLabelFormat() || $$.defaultArcValueFormat)(value, ratio, d.data.id).toString();
        setTextValue(node, text, [-1, 1], hasGauge);
      } else node.text("");
    });
  },
  expandArc: function expandArc(targetIds) {
    var $$ = this,
        transiting = $$.state.transiting,
        $el = $$.$el;

    // MEMO: avoid to cancel transition
    if (transiting) {
      var interval = setInterval(function () {
        transiting || (clearInterval(interval), $el.legend.selectAll("." + config_classes.legendItemFocused).size() > 0 && $$.expandArc(targetIds));
      }, 10);
      return;
    }

    var newTargetIds = $$.mapToTargetIds(targetIds);
    $el.svg.selectAll($$.selectorTargets(newTargetIds, "." + config_classes.chartArc)).each(function (d) {
      if ($$.shouldExpand(d.data.id)) {
        var expandDuration = $$.getExpandConfig(d.data.id, "duration"),
            svgArcExpandedSub = $$.getSvgArcExpanded($$.getExpandConfig(d.data.id, "rate"));
        (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).selectAll("path").transition().duration(expandDuration).attr("d", $$.svgArcExpanded).transition().duration(expandDuration * 2).attr("d", svgArcExpandedSub);
      }
    });
  },
  unexpandArc: function unexpandArc(targetIds) {
    var $$ = this,
        transiting = $$.state.transiting,
        svg = $$.$el.svg;

    if (!transiting) {
      var newTargetIds = $$.mapToTargetIds(targetIds);
      svg.selectAll($$.selectorTargets(newTargetIds, "." + config_classes.chartArc)).selectAll("path").transition().duration(function (d) {
        return $$.getExpandConfig(d.data.id, "duration");
      }).attr("d", $$.svgArc), svg.selectAll("" + config_classes.arc).style("opacity", null);
    }
  },

  /**
   * Get expand config value
   * @param {string} id data ID
   * @param {string} key config key: 'duration | rate'
   * @returns {number}
   * @private
   */
  getExpandConfig: function getExpandConfig(id, key) {
    var type,
        $$ = this,
        config = $$.config;
    return $$.isDonutType(id) ? type = "donut" : $$.isGaugeType(id) ? type = "gauge" : $$.isPieType(id) && (type = "pie"), type ? config[type + "_expand_" + key] : {
      duration: 50,
      rate: .98
    }[key];
  },
  shouldExpand: function shouldExpand(id) {
    var $$ = this,
        config = $$.config;
    return $$.isDonutType(id) && config.donut_expand || $$.isGaugeType(id) && config.gauge_expand || $$.isPieType(id) && config.pie_expand;
  },
  shouldShowArcLabel: function shouldShowArcLabel() {
    var $$ = this,
        config = $$.config;
    return ["pie", "donut", "gauge"].some(function (v) {
      return $$.hasType(v) && config[v + "_label_show"];
    });
  },
  getArcLabelFormat: function getArcLabelFormat() {
    var $$ = this,
        config = $$.config,
        format = config.pie_label_format;
    return $$.hasType("gauge") ? format = config.gauge_label_format : $$.hasType("donut") && (format = config.donut_label_format), isFunction(format) ? format.bind($$.api) : format;
  },
  getArcTitle: function getArcTitle() {
    var $$ = this,
        type = $$.hasType("donut") && "donut" || $$.hasType("gauge") && "gauge";
    return type ? $$.config[type + "_title"] : "";
  },
  updateTargetsForArc: function updateTargetsForArc(targets) {
    var $$ = this,
        $el = $$.$el,
        hasGauge = $$.hasType("gauge"),
        classChartArc = $$.getChartClass("Arc"),
        classArcs = $$.getClass("arcs", !0),
        classFocus = $$.classFocus.bind($$),
        chartArcs = $el.main.select("." + config_classes.chartArcs),
        mainPieUpdate = chartArcs.selectAll("." + config_classes.chartArc).data($$.pie(targets)).attr("class", function (d) {
      return classChartArc(d) + classFocus(d.data);
    }),
        mainPieEnter = mainPieUpdate.enter().append("g").attr("class", classChartArc);
    mainPieEnter.append("g").attr("class", classArcs).merge(mainPieUpdate), mainPieEnter.append("text").attr("dy", hasGauge && !$$.hasMultiTargets() ? "-.1em" : ".35em").style("opacity", "0").style("text-anchor", "middle").style("pointer-events", "none"), $el.text = chartArcs.selectAll("." + config_classes.target + " text");
  },
  initArc: function initArc() {
    var $$ = this,
        $el = $$.$el;
    $el.arcs = $el.main.select("." + config_classes.chart).append("g").attr("class", config_classes.chartArcs).attr("transform", $$.getTranslate("arc")), $$.setArcTitle();
  },

  /**
   * Set arc title text
   * @private
   */
  setArcTitle: function setArcTitle() {
    var $$ = this,
        title = $$.getArcTitle(),
        hasGauge = $$.hasType("gauge");

    if (title) {
      var text = $$.$el.arcs.append("text").attr("class", config_classes[hasGauge ? "chartArcsGaugeTitle" : "chartArcsTitle"]).style("text-anchor", "middle");
      hasGauge && text.attr("dy", "-0.3em").style("font-size", "27px"), setTextValue(text, title, hasGauge ? undefined : [-.6, 1.35], !0);
    }
  },
  redrawArc: function redrawArc(duration, durationForExit, withTransform) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        main = $$.$el.main,
        hasInteraction = config.interaction_enabled,
        isSelectable = hasInteraction && config.data_selection_isselectable,
        mainArc = main.selectAll("." + config_classes.arcs).selectAll("." + config_classes.arc).data($$.arcData.bind($$));
    // bind arc events
    mainArc.exit().transition().duration(durationForExit).style("opacity", "0").remove(), mainArc = mainArc.enter().append("path").attr("class", $$.getClass("arc", !0)).style("fill", function (d) {
      return $$.color(d.data);
    }).style("cursor", function (d) {
      return isSelectable && isSelectable.bind($$.api)(d) ? "pointer" : null;
    }).style("opacity", "0").each(function (d) {
      $$.isGaugeType(d.data) && (d.startAngle = config.gauge_startingAngle, d.endAngle = config.gauge_startingAngle), this._current = d;
    }).merge(mainArc), $$.hasType("gauge") && ($$.updateGaugeMax(), $$.hasMultiArcGauge() && $$.redrawMultiArcGauge()), mainArc.attr("transform", function (d) {
      return !$$.isGaugeType(d.data) && withTransform ? "scale(0)" : "";
    }).style("opacity", function (d) {
      return d === this._current ? "0" : null;
    }).each(function () {
      state.transiting = !0;
    }).transition().duration(duration).attrTween("d", function (d) {
      var updated = $$.updateAngle(d);
      if (!updated) return function () {
        return "M 0 0";
      };
      isNaN(this._current.startAngle) && (this._current.startAngle = 0), isNaN(this._current.endAngle) && (this._current.endAngle = this._current.startAngle);
      var interpolate = (0,external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_.interpolate)(this._current, updated);
      return this._current = interpolate(0), function (t) {
        var interpolated = interpolate(t);
        // data.id will be updated by interporator
        return interpolated.data = d.data, $$.getArc(interpolated, !0);
      };
    }).attr("transform", withTransform ? "scale(1)" : "").style("fill", function (d) {
      var color;
      return $$.levelColor ? (color = $$.levelColor(d.data.values[0].value), config.data_colors[d.data.id] = color) : color = $$.color(d.data), color;
    }) // Where gauge reading color would receive customization.
    .style("opacity", null).call(endall, function () {
      if ($$.levelColor) {
        var path = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
            d = path.datum();
        $$.updateLegendItemColor(d.data.id, path.style("fill"));
      }

      state.transiting = !1, callFn(config.onrendered, $$.api);
    }), hasInteraction && $$.bindArcEvent(mainArc), $$.hasType("gauge") && $$.redrawBackgroundArcs(), $$.redrawArcText(duration);
  },
  redrawBackgroundArcs: function redrawBackgroundArcs() {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        hasMultiArcGauge = $$.hasMultiArcGauge(),
        isFullCircle = config.gauge_fullCircle,
        startAngle = $$.getStartAngle(),
        endAngle = isFullCircle ? startAngle + $$.getArcLength() : startAngle * -1,
        backgroundArc = $$.$el.arcs.select((hasMultiArcGauge ? "g" : "") + "." + config_classes.chartArcsBackground);

    if (hasMultiArcGauge) {
      var index = 0;
      backgroundArc = backgroundArc.selectAll("path." + config_classes.chartArcsBackground).data($$.data.targets), backgroundArc.enter().append("path").attr("class", function (d, i) {
        return config_classes.chartArcsBackground + " " + config_classes.chartArcsBackground + "-" + i;
      }).merge(backgroundArc).style("fill", config.gauge_background || null).attr("d", function (_ref2) {
        var id = _ref2.id;
        if (state.hiddenTargetIds.indexOf(id) >= 0) return "M 0 0";
        var d = {
          data: [{
            value: config.gauge_max
          }],
          startAngle: startAngle,
          endAngle: endAngle,
          index: index++
        };
        return $$.getArc(d, !0, !0);
      }), backgroundArc.exit().remove();
    } else backgroundArc.attr("d", function () {
      var d = {
        data: [{
          value: config.gauge_max
        }],
        startAngle: startAngle,
        endAngle: endAngle
      };
      return $$.getArc(d, !0, !0);
    });
  },
  bindArcEvent: function bindArcEvent(arc) {
    // eslint-disable-next-line
    function selectArc(_this, arcData, id) {
      $$.expandArc(id), $$.api.focus(id), $$.toggleFocusLegend(id, !0), $$.showTooltip([arcData], _this);
    } // eslint-disable-next-line


    function unselectArc(arcData) {
      var id = arcData && arcData.id || undefined;
      $$.unexpandArc(id), $$.api.revert(), $$.revertLegend(), $$.hideTooltip();
    }

    var $$ = this,
        config = $$.config,
        state = $$.state,
        isTouch = state.inputType === "touch",
        isMouse = state.inputType === "mouse";

    // touch events
    if (arc.on("click", function (event, d, i) {
      var arcData,
          updated = $$.updateAngle(d);
      updated && (arcData = $$.convertToArcData(updated), $$.toggleShape && $$.toggleShape(this, arcData, i), config.data_onclick.bind($$.api)(arcData, this));
    }), isMouse && arc.on("mouseover", function (event, d) {
      if (!state.transiting) // skip while transiting
        {
          state.event = event;
          var updated = $$.updateAngle(d),
              arcData = updated ? $$.convertToArcData(updated) : null,
              id = arcData && arcData.id || undefined;
          selectArc(this, arcData, id), $$.setOverOut(!0, arcData);
        }
    }).on("mouseout", function (event, d) {
      if (!state.transiting) // skip while transiting
        {
          state.event = event;
          var updated = $$.updateAngle(d),
              arcData = updated ? $$.convertToArcData(updated) : null;
          unselectArc(), $$.setOverOut(!1, arcData);
        }
    }).on("mousemove", function (event, d) {
      var updated = $$.updateAngle(d),
          arcData = updated ? $$.convertToArcData(updated) : null;
      state.event = event, $$.showTooltip([arcData], this);
    }), isTouch && $$.hasArcType() && !$$.radars) {
      var getEventArc = function (event) {
        var touch = event.changedTouches[0],
            eventArc = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(browser_doc.elementFromPoint(touch.clientX, touch.clientY));
        return eventArc;
      };

      $$.$el.svg.on("touchstart touchmove", function (event) {
        if (!state.transiting) // skip while transiting
          {
            var eventArc = getEventArc(event),
                datum = eventArc.datum(),
                updated = datum && datum.data && datum.data.id ? $$.updateAngle(datum) : null,
                arcData = updated ? $$.convertToArcData(updated) : null,
                id = arcData && arcData.id || undefined;
            $$.callOverOutForTouch(arcData), isUndefined(id) ? unselectArc() : selectArc(this, arcData, id);
          }
      });
    }
  },
  redrawArcText: function redrawArcText(duration) {
    var text,
        $$ = this,
        config = $$.config,
        state = $$.state,
        _$$$$el = $$.$el,
        main = _$$$$el.main,
        arcs = _$$$$el.arcs,
        hasGauge = $$.hasType("gauge"),
        hasMultiArcGauge = $$.hasMultiArcGauge();

    if (hasGauge && $$.data.targets.length === 1 && config.gauge_title || (text = main.selectAll("." + config_classes.chartArc).select("text").style("opacity", "0").attr("class", function (d) {
      return $$.isGaugeType(d.data) ? config_classes.gaugeValue : null;
    }).call($$.textForArcLabel.bind($$)).attr("transform", $$.transformForArcLabel.bind($$)).style("font-size", function (d) {
      return $$.isGaugeType(d.data) && $$.data.targets.length === 1 && !hasMultiArcGauge ? Math.round(state.radius / 5) + "px" : null;
    }).transition().duration(duration).style("opacity", function (d) {
      return $$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? null : "0";
    }), hasMultiArcGauge && text.attr("dy", "-.1em")), main.select("." + config_classes.chartArcsTitle).style("opacity", $$.hasType("donut") || hasGauge ? null : "0"), hasGauge) {
      var isFullCircle = config.gauge_fullCircle;
      isFullCircle && text && text.attr("dy", "" + (hasMultiArcGauge ? 0 : Math.round(state.radius / 14))), config.gauge_label_show && (arcs.select("." + config_classes.chartArcsGaugeUnit).attr("dy", (isFullCircle ? 1.5 : .75) + "em").text(config.gauge_units), arcs.select("." + config_classes.chartArcsGaugeMin).attr("dx", -1 * (state.innerRadius + (state.radius - state.innerRadius) / (isFullCircle ? 1 : 2)) + "px").attr("dy", "1.2em").text($$.textForGaugeMinMax(config.gauge_min, !1)), !isFullCircle && arcs.select("." + config_classes.chartArcsGaugeMax).attr("dx", state.innerRadius + (state.radius - state.innerRadius) / 2 + "px").attr("dy", "1.2em").text($$.textForGaugeMinMax(config.gauge_max, !0)));
    }
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/shape/area.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/* harmony default export */ var shape_area = ({
  initArea: function initArea(mainLine) {
    var $$ = this,
        config = $$.config;
    mainLine.insert("g", "." + config_classes[config.area_front ? "circles" : "lines"]).attr("class", $$.getClass("areas", !0));
  },
  updateAreaGradient: function updateAreaGradient() {
    var $$ = this,
        config = $$.config,
        datetimeId = $$.state.datetimeId,
        defs = $$.$el.defs;
    $$.data.targets.forEach(function (d) {
      var id = datetimeId + "-areaGradient" + $$.getTargetSelectorSuffix(d.id);

      if ($$.isAreaType(d) && defs.select("#" + id).empty()) {
        var color = $$.color(d),
            _config$area_linearGr = config.area_linearGradient,
            _config$area_linearGr2 = _config$area_linearGr.x,
            x = _config$area_linearGr2 === void 0 ? [0, 0] : _config$area_linearGr2,
            _config$area_linearGr3 = _config$area_linearGr.y,
            y = _config$area_linearGr3 === void 0 ? [0, 1] : _config$area_linearGr3,
            _config$area_linearGr4 = _config$area_linearGr.stops,
            stops = _config$area_linearGr4 === void 0 ? [[0, color, 1], [1, color, 0]] : _config$area_linearGr4,
            linearGradient = defs.append("linearGradient").attr("id", "" + id).attr("x1", x[0]).attr("x2", x[1]).attr("y1", y[0]).attr("y2", y[1]);
        stops.forEach(function (v) {
          var stopColor = isFunction(v[1]) ? v[1].bind($$.api)(d.id) : v[1];
          linearGradient.append("stop").attr("offset", v[0]).attr("stop-color", stopColor || color).attr("stop-opacity", v[2]);
        });
      }
    });
  },
  updateAreaColor: function updateAreaColor(d) {
    var $$ = this;
    return $$.config.area_linearGradient ? "url(#" + $$.state.datetimeId + "-areaGradient" + $$.getTargetSelectorSuffix(d.id) + ")" : $$.color(d);
  },

  /**
   * Generate/Update elements
   * @param {number} durationForExit Transition duration for exit elements
   * @param {boolean} isSub Subchart draw
   * @private
   */
  updateArea: function updateArea(durationForExit, isSub) {
    isSub === void 0 && (isSub = !1);
    var $$ = this,
        config = $$.config,
        state = $$.state,
        $el = $$.$el,
        $root = isSub ? $el.subchart : $el;
    config.area_linearGradient && $$.updateAreaGradient();
    var area = $root.main.selectAll("." + config_classes.areas).selectAll("." + config_classes.area).data($$.lineData.bind($$));
    area.exit().transition().duration(durationForExit).style("opacity", "0").remove(), $root.area = area.enter().append("path").attr("class", $$.getClass("area", !0)).style("fill", $$.updateAreaColor.bind($$)).style("opacity", function () {
      return state.orgAreaOpacity = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).style("opacity"), "0";
    }).merge(area), area.style("opacity", state.orgAreaOpacity);
  },

  /**
   * Redraw function
   * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
   * @param {boolean} withTransition With or without transition
   * @param {boolean} isSub Subchart draw
   * @returns {Array}
   */
  redrawArea: function redrawArea(drawFn, withTransition, isSub) {
    isSub === void 0 && (isSub = !1);

    var $$ = this,
        _ref = isSub ? this.$el.subchart : this.$el,
        area = _ref.area,
        orgAreaOpacity = $$.state.orgAreaOpacity;

    return [(withTransition ? area.transition(getRandom()) : area).attr("d", drawFn).style("fill", $$.updateAreaColor.bind($$)).style("opacity", function (d) {
      return ($$.isAreaRangeType(d) ? orgAreaOpacity / 1.75 : orgAreaOpacity) + "";
    })];
  },

  /**
   * Generate area path data
   * @param {object} areaIndices Indices
   * @param {boolean} isSub Weather is sub axis
   * @returns {Function}
   * @private
   */
  generateDrawArea: function generateDrawArea(areaIndices, isSub) {
    var $$ = this,
        config = $$.config,
        lineConnectNull = config.line_connectNull,
        isRotated = config.axis_rotated,
        getPoints = $$.generateGetAreaPoints(areaIndices, isSub),
        yScale = $$.getYScaleById.bind($$),
        xValue = function (d) {
      return (isSub ? $$.subxx : $$.xx).call($$, d);
    },
        value0 = function (d, i) {
      return $$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)($$.isAreaRangeType(d) ? $$.getRangedData(d, "high") : $$.getShapeYMin(d.id));
    },
        value1 = function (d, i) {
      return $$.isGrouped(d.id) ? getPoints(d, i)[1][1] : yScale(d.id, isSub)($$.isAreaRangeType(d) ? $$.getRangedData(d, "low") : d.value);
    };

    return function (d) {
      var path,
          values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values,
          x0 = 0,
          y0 = 0;

      if ($$.isAreaType(d)) {
        var area = (0,external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.area)();
        area = isRotated ? area.y(xValue).x0(value0).x1(value1) : area.x(xValue) // @ts-ignore
        .y0(config.area_above ? 0 : value0).y1(value1), lineConnectNull || (area = area.defined(function (d) {
          return $$.getBaseValue(d) !== null;
        })), $$.isStepType(d) && (values = $$.convertValuesToStep(values)), path = area.curve($$.getCurve(d))(values);
      } else values[0] && (x0 = $$.scale.x(values[0].x), y0 = $$.getYScaleById(d.id)(values[0].value)), path = isRotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;

      return path || "M 0 0";
    };
  },
  generateGetAreaPoints: function generateGetAreaPoints(areaIndices, isSub) {
    // partial duplication of generateGetBarPoints
    var $$ = this,
        config = $$.config,
        x = $$.getShapeX(0, areaIndices, isSub),
        y = $$.getShapeY(!!isSub),
        areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, isSub),
        yScale = $$.getYScaleById.bind($$);
    return function (d, i) {
      var y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id)),
          offset = areaOffset(d, i) || y0,
          posX = x(d),
          posY = y(d);
      // 1 point that marks the area position
      return config.axis_rotated && (d.value > 0 && posY < y0 || d.value < 0 && y0 < posY) && (posY = y0), [[posX, offset], [posX, posY - (y0 - offset)], [posX, posY - (y0 - offset)], // needed for compatibility
      [posX, offset] // needed for compatibility
      ];
    };
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/shape/bar.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/* harmony default export */ var bar = ({
  initBar: function initBar() {
    var $el = this.$el;
    $el.bar = $el.main.select("." + config_classes.chart) // should positioned at the beginning of the shape node to not overlap others
    .insert("g", ":first-child").attr("class", config_classes.chartBars);
  },
  updateTargetsForBar: function updateTargetsForBar(targets) {
    var $$ = this,
        config = $$.config,
        $el = $$.$el,
        classChartBar = $$.getChartClass("Bar"),
        classBars = $$.getClass("bars", !0),
        classFocus = $$.classFocus.bind($$),
        isSelectable = config.interaction_enabled && config.data_selection_isselectable;
    $el.bar || $$.initBar();
    var mainBarUpdate = $$.$el.main.select("." + config_classes.chartBars).selectAll("." + config_classes.chartBar).data( // remove
    targets.filter(function (v) {
      return !v.values.every(function (d) {
        return !isNumber(d.value);
      });
    })).attr("class", function (d) {
      return classChartBar(d) + classFocus(d);
    }),
        mainBarEnter = mainBarUpdate.enter().append("g").attr("class", classChartBar).style("opacity", "0").style("pointer-events", "none");
    // Bars for each data
    mainBarEnter.append("g").attr("class", classBars).style("cursor", function (d) {
      return isSelectable && isSelectable.bind($$.api)(d) ? "pointer" : null;
    });
  },

  /**
   * Generate/Update elements
   * @param {number} durationForExit Transition duration for exit elements
   * @param {boolean} isSub Subchart draw
   * @private
   */
  updateBar: function updateBar(durationForExit, isSub) {
    isSub === void 0 && (isSub = !1);
    var $$ = this,
        $root = isSub ? $$.$el.subchart : $$.$el,
        classBar = $$.getClass("bar", !0),
        initialOpacity = $$.initialOpacity.bind($$),
        bar = $root.main.selectAll("." + config_classes.bars).selectAll("." + config_classes.bar).data($$.labelishData.bind($$));
    bar.exit().transition().duration(durationForExit).style("opacity", "0").remove(), $root.bar = bar.enter().append("path").attr("class", classBar).style("fill", $$.color).merge(bar).style("opacity", initialOpacity);
  },

  /**
   * Redraw function
   * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
   * @param {boolean} withTransition With or without transition
   * @param {boolean} isSub Subchart draw
   * @returns {Array}
   */
  redrawBar: function redrawBar(drawFn, withTransition, isSub) {
    isSub === void 0 && (isSub = !1);

    var _ref = isSub ? this.$el.subchart : this.$el,
        bar = _ref.bar;

    return [(withTransition ? bar.transition(getRandom()) : bar).attr("d", function (d) {
      return d.value && drawFn(d);
    }).style("fill", this.color).style("opacity", null)];
  },
  generateDrawBar: function generateDrawBar(barIndices, isSub) {
    var $$ = this,
        config = $$.config,
        getPoints = $$.generateGetBarPoints(barIndices, isSub),
        isRotated = config.axis_rotated,
        isGrouped = config.data_groups.length,
        barRadius = config.bar_radius,
        barRadiusRatio = config.bar_radius_ratio,
        getRadius = isNumber(barRadius) && barRadius > 0 ? function () {
      return barRadius;
    } : isNumber(barRadiusRatio) ? function (w) {
      return w * barRadiusRatio;
    } : null;
    return function (d, i) {
      // 4 points that make a bar
      var points = getPoints(d, i),
          indexX = +isRotated,
          indexY = +!indexX,
          isNegative = d.value < 0,
          pathRadius = ["", ""],
          radius = 0; // switch points if axis is rotated, not applicable for sub chart

      if (getRadius && !isGrouped) {
        var index = isRotated ? indexY : indexX,
            barW = points[2][index] - points[0][index];
        radius = getRadius(barW);
        var arc = "a" + radius + "," + radius + " " + (isNegative ? "1 0 0" : "0 0 1") + " ";
        pathRadius[+!isRotated] = "" + arc + radius + "," + radius, pathRadius[+isRotated] = "" + arc + [-radius, radius][isRotated ? "sort" : "reverse"](), isNegative && pathRadius.reverse();
      } // path string data shouldn't be containing new line chars
      // https://github.com/naver/billboard.js/issues/530


      var path = isRotated ? "H" + (points[1][indexX] - radius) + " " + pathRadius[0] + "V" + (points[2][indexY] - radius) + " " + pathRadius[1] + "H" + points[3][indexX] : "V" + (points[1][indexY] + (isNegative ? -radius : radius)) + " " + pathRadius[0] + "H" + (points[2][indexX] - radius) + " " + pathRadius[1] + "V" + points[3][indexY];
      return "M" + points[0][indexX] + "," + points[0][indexY] + path + "z";
    };
  },
  generateGetBarPoints: function generateGetBarPoints(barIndices, isSub) {
    var $$ = this,
        config = $$.config,
        axis = isSub ? $$.axis.subX : $$.axis.x,
        barTargetsNum = $$.getIndicesMax(barIndices) + 1,
        barW = $$.getBarW("bar", axis, barTargetsNum),
        barX = $$.getShapeX(barW, barIndices, !!isSub),
        barY = $$.getShapeY(!!isSub),
        barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub),
        yScale = $$.getYScaleById.bind($$);
    return function (d, i) {
      var y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id)),
          offset = barOffset(d, i) || y0,
          width = isNumber(barW) ? barW : barW[d.id] || barW._$width,
          posX = barX(d),
          posY = barY(d);
      config.axis_rotated && (d.value > 0 && posY < y0 || d.value < 0 && y0 < posY) && (posY = y0), posY -= y0 - offset;
      var startPosX = posX + width; // 4 points that make a bar

      return [[posX, offset], [posX, posY], [startPosX, posY], [startPosX, offset]];
    };
  },
  isWithinBar: function isWithinBar(that) {
    var mouse = getPointer(this.state.event, that),
        list = getRectSegList(that),
        _list = list,
        seg0 = _list[0],
        seg1 = _list[1],
        x = Math.min(seg0.x, seg1.x),
        y = Math.min(seg0.y, seg1.y),
        offset = this.config.bar_sensitivity,
        _that$getBBox = that.getBBox(),
        width = _that$getBBox.width,
        height = _that$getBBox.height,
        isWithin = x - offset < mouse[0] && mouse[0] < x + width + offset && y - offset < mouse[1] && mouse[1] < y + height + offset;

    return isWithin;
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/shape/candlestick.ts


function candlestick_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function candlestick_objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? candlestick_ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : candlestick_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



/* harmony default export */ var candlestick = ({
  initCandlestick: function initCandlestick() {
    var $el = this.$el;
    $el.candlestick = $el.main.select("." + config_classes.chart) // should positioned at the beginning of the shape node to not overlap others
    .append("g").attr("class", config_classes.chartCandlesticks);
  },

  /**
   * Update targets by its data
   * called from: ChartInternal.updateTargets()
   * @param {Array} targets Filtered target by type
   * @private
   */
  updateTargetsForCandlestick: function updateTargetsForCandlestick(targets) {
    var $$ = this,
        $el = $$.$el,
        classChart = $$.getChartClass("Candlestick"),
        classFocus = $$.classFocus.bind($$);
    $el.candlestick || $$.initCandlestick();
    var mainUpdate = $$.$el.main.select("." + config_classes.chartCandlesticks).selectAll("." + config_classes.chartCandlestick).data(targets).attr("class", function (d) {
      return classChart(d) + classFocus(d);
    });
    mainUpdate.enter().append("g").attr("class", classChart).style("pointer-events", "none");
  },

  /**
   * Generate/Update elements
   * @param {number} durationForExit Transition duration for exit elements
   * @param {boolean} isSub Subchart draw
   * @private
   */
  updateCandlestick: function updateCandlestick(durationForExit, isSub) {
    isSub === void 0 && (isSub = !1);
    var $$ = this,
        $el = $$.$el,
        $root = isSub ? $el.subchart : $el,
        classSetter = $$.getClass("candlestick", !0),
        initialOpacity = $$.initialOpacity.bind($$),
        candlestick = $root.main.selectAll("." + config_classes.chartCandlestick).selectAll("." + config_classes.candlestick).data($$.labelishData.bind($$));
    candlestick.exit().transition().duration(durationForExit).style("opacity", "0").remove();
    var candlestickEnter = candlestick.enter().filter(function (d) {
      return d.value;
    }).append("g").attr("class", classSetter);
    candlestickEnter.append("line"), candlestickEnter.append("path"), $root.candlestick || ($root.candlestick = {}), $root.candlestick = candlestick.merge(candlestickEnter).style("opacity", initialOpacity);
  },

  /**
   * Get draw function
   * @param {object} indices Indice data
   * @param {boolean} isSub Subchart draw
   * @returns {Function}
   * @private
   */
  generateDrawCandlestick: function generateDrawCandlestick(indices, isSub) {
    var $$ = this,
        config = $$.config,
        getPoints = $$.generateGetCandlestickPoints(indices, isSub),
        isRotated = config.axis_rotated,
        downColor = config.candlestick_color_down;
    return function (d, i, g) {
      var _value,
          points = getPoints(d, i),
          value = $$.getCandlestickData(d),
          isUp = (_value = value) == null ? void 0 : _value._isUp,
          indexX = +isRotated;

      g.classed && g.classed(config_classes[isUp ? "valueUp" : "valueDown"], !0);
      var path = isRotated ? "H" + points[1][1] + " V" + points[1][0] + " H" + points[0][1] : "V" + points[1][1] + " H" + points[1][0] + " V" + points[0][1];
      g.select("path").attr("d", "M" + points[0][indexX] + "," + points[0][+!indexX] + path + "z").style("fill", function (d) {
        var color = isUp ? $$.color(d) : isObject(downColor) ? downColor[d.id] : downColor;
        return color || $$.color(d);
      });
      // set line position
      var line = g.select("line"),
          pos = isRotated ? {
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

      for (var x in pos) line.attr(x, pos[x]);
    };
  },

  /**
   * Generate shape drawing points
   * @param {object} indices Indice data
   * @param {boolean} isSub Subchart draw
   * @returns {Function}
   */
  generateGetCandlestickPoints: function generateGetCandlestickPoints(indices, isSub) {
    isSub === void 0 && (isSub = !1);
    var $$ = this,
        config = $$.config,
        axis = isSub ? $$.axis.subX : $$.axis.x,
        targetsNum = $$.getIndicesMax(indices) + 1,
        barW = $$.getBarW("candlestick", axis, targetsNum),
        x = $$.getShapeX(barW, indices, !!isSub),
        y = $$.getShapeY(!!isSub),
        shapeOffset = $$.getShapeOffset($$.isBarType, indices, !!isSub),
        yScale = $$.getYScaleById.bind($$);
    return function (d, i) {
      var points,
          y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id)),
          offset = shapeOffset(d, i) || y0,
          width = isNumber(barW) ? barW : barW[d.id] || barW._$width,
          value = $$.getCandlestickData(d);

      if (value) {
        var posX = {
          start: x(d),
          end: 0
        };
        posX.end = posX.start + width;
        var posY = {
          start: y(value.open),
          end: y(value.close)
        },
            posLine = {
          x: posX.start + width / 2,
          high: y(value.high),
          low: y(value.low)
        };
        config.axis_rotated && (d.value > 0 && posY.start < y0 || d.value < 0 && y0 < posY.start) && (posY.start = y0), posY.start -= y0 - offset, points = [[posX.start, posY.start], [posX.end, posY.end], [posLine.x, posLine.low, posLine.high]];
      } else points = [[0, 0], [0, 0], [0, 0, 0]];

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
  redrawCandlestick: function redrawCandlestick(drawFn, withTransition, isSub) {
    isSub === void 0 && (isSub = !1);

    var _ref = isSub ? this.$el.subchart : this.$el,
        candlestick = _ref.candlestick,
        rand = getRandom(!0);

    return [candlestick.each(function (d, i) {
      var g = withTransition ? (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).transition(rand) : (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      drawFn(d, i, g);
    }).style("opacity", null)];
  },

  /**
   * Get candlestick data as object
   * @param {object} param Data object
   * @param {Array|object} param.value Data value
   * @returns {object|null} Converted data object
   * @private
   */
  getCandlestickData: function getCandlestickData(_ref2) {
    var d,
        value = _ref2.value;

    if (isArray(value)) {
      var open = value[0],
          high = value[1],
          low = value[2],
          close = value[3],
          _value$ = value[4],
          volume = _value$ !== void 0 && _value$;
      d = {
        open: open,
        high: high,
        low: low,
        close: close
      }, volume !== !1 && (d.volume = volume);
    } else isObject(value) && (d = candlestick_objectSpread({}, value));

    return d && (d._isUp = d.close >= d.open), d || null;
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/shape/gauge.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



/* harmony default export */ var gauge = ({
  initGauge: function initGauge() {
    var $$ = this,
        config = $$.config,
        arcs = $$.$el.arcs,
        appendText = function (className) {
      arcs.append("text").attr("class", className).style("text-anchor", "middle").style("pointer-events", "none");
    };

    if ($$.hasType("gauge")) {
      var hasMulti = $$.hasMultiArcGauge();
      arcs.append(hasMulti ? "g" : "path").attr("class", config_classes.chartArcsBackground).style("fill", !hasMulti && config.gauge_background || null), config.gauge_units && appendText(config_classes.chartArcsGaugeUnit), config.gauge_label_show && (appendText(config_classes.chartArcsGaugeMin), !config.gauge_fullCircle && appendText(config_classes.chartArcsGaugeMax));
    }
  },
  updateGaugeMax: function updateGaugeMax() {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        hasMultiGauge = $$.hasMultiArcGauge(),
        max = hasMultiGauge ? $$.getMinMaxData().max[0].value : $$.getTotalDataSum(state.rendered);
    max + config.gauge_min * (config.gauge_min > 0 ? -1 : 1) > config.gauge_max && (config.gauge_max = max - config.gauge_min);
  },
  redrawMultiArcGauge: function redrawMultiArcGauge() {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        $el = $$.$el,
        hiddenTargetIds = $$.state.hiddenTargetIds,
        arcLabelLines = $el.main.selectAll("." + config_classes.arcs).selectAll("." + config_classes.arcLabelLine).data($$.arcData.bind($$)),
        mainArcLabelLine = arcLabelLines.enter().append("rect").attr("class", function (d) {
      return config_classes.arcLabelLine + " " + config_classes.target + " " + config_classes.target + "-" + d.data.id;
    }).merge(arcLabelLines);
    mainArcLabelLine.style("fill", function (d) {
      return $$.levelColor ? $$.levelColor(d.data.values[0].value) : $$.color(d.data);
    }).style("display", config.gauge_label_show ? null : "none").each(function (d) {
      var lineLength = 0,
          lineThickness = 2,
          x = 0,
          y = 0,
          transform = "";

      if (hiddenTargetIds.indexOf(d.data.id) < 0) {
        var updated = $$.updateAngle(d),
            innerLineLength = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length * (updated.index + 1),
            lineAngle = updated.endAngle - Math.PI / 2,
            arcInnerRadius = state.radius - innerLineLength,
            linePositioningAngle = lineAngle - (arcInnerRadius === 0 ? 0 : 1 / arcInnerRadius);
        lineLength = state.radiusExpanded - state.radius + innerLineLength, x = Math.cos(linePositioningAngle) * arcInnerRadius, y = Math.sin(linePositioningAngle) * arcInnerRadius, transform = "rotate(" + lineAngle * 180 / Math.PI + ", " + x + ", " + y + ")";
      }

      (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).attr("x", x).attr("y", y).attr("width", lineLength).attr("height", lineThickness).attr("transform", transform).style("stroke-dasharray", "0, " + (lineLength + lineThickness) + ", 0");
    });
  },
  textForGaugeMinMax: function textForGaugeMinMax(value, isMax) {
    var $$ = this,
        config = $$.config,
        format = config.gauge_label_extents;
    return isFunction(format) ? format.bind($$.api)(value, isMax) : value;
  },
  getGaugeLabelHeight: function getGaugeLabelHeight() {
    var config = this.config;
    return this.config.gauge_label_show && !config.gauge_fullCircle ? 20 : 0;
  },
  getPaddingBottomForGauge: function getPaddingBottomForGauge() {
    var $$ = this;
    return $$.getGaugeLabelHeight() * ($$.config.gauge_label_show ? 2 : 2.5);
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/shape/bubble.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/* harmony default export */ var bubble = ({
  /**
   * Initializer
   * @private
   */
  initBubble: function initBubble() {
    var $$ = this,
        config = $$.config;
    $$.hasType("bubble") && (config.point_show = !0, config.point_type = "circle", config.point_sensitivity = 25);
  },

  /**
   * Get user agent's computed value
   * @returns {number}
   * @private
   */
  getBaseLength: function getBaseLength() {
    var $$ = this,
        _$$$state = $$.state,
        width = _$$$state.width,
        height = _$$$state.height,
        cacheKey = KEY.bubbleBaseLength,
        baseLength = $$.cache.get(cacheKey);
    return baseLength || $$.cache.add(cacheKey, baseLength = getMinMax("min", [width, height])), baseLength;
  },

  /**
   * Get the radius value for bubble circle
   * @param {object} d Data object
   * @returns {number}
   * @private
   */
  getBubbleR: function getBubbleR(d) {
    var $$ = this,
        maxR = $$.config.bubble_maxR;
    isFunction(maxR) ? maxR = maxR.bind($$.api)(d) : !isNumber(maxR) && (maxR = $$.getBaseLength() / ($$.getMaxDataCount() * 2) + 12);
    var max = getMinMax("max", $$.getMinMaxData().max.map(function (d) {
      return $$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "y") : isObject(d.value) ? d.value.mid : d.value;
    })),
        maxArea = maxR * maxR * Math.PI,
        area = ($$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "z") : d.value) * (maxArea / max);
    return Math.sqrt(area / Math.PI);
  },

  /**
   * Get bubble dimension data
   * @param {object|Array} d data value
   * @param {string} type - y or z
   * @returns {number}
   * @private
   */
  getBubbleZData: function getBubbleZData(d, type) {
    return isObject(d) ? d[type] : d[type === "y" ? 0 : 1];
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/shape/line.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/* harmony default export */ var line = ({
  initLine: function initLine() {
    var $el = this.$el;
    $el.line = $el.main.select("." + config_classes.chart).append("g").attr("class", config_classes.chartLines);
  },
  updateTargetsForLine: function updateTargetsForLine(t) {
    var $$ = this,
        _$$$$el = $$.$el,
        area = _$$$$el.area,
        line = _$$$$el.line,
        main = _$$$$el.main,
        classChartLine = $$.getChartClass("Line"),
        classLines = $$.getClass("lines", !0),
        classFocus = $$.classFocus.bind($$);
    line || $$.initLine();
    var targets = t.filter(function (d) {
      return !($$.isScatterType(d) || $$.isBubbleType(d));
    }),
        mainLineUpdate = main.select("." + config_classes.chartLines).selectAll("." + config_classes.chartLine).data(targets).attr("class", function (d) {
      return classChartLine(d) + classFocus(d);
    }),
        mainLineEnter = mainLineUpdate.enter().append("g").attr("class", classChartLine).style("opacity", "0").style("pointer-events", "none");
    // Lines for each data
    mainLineEnter.append("g").attr("class", classLines), $$.hasTypeOf("Area") && $$.initArea(!area && mainLineEnter.empty() ? mainLineUpdate : mainLineEnter), $$.updateTargetForCircle(targets, mainLineEnter);
  },

  /**
   * Generate/Update elements
   * @param {number} durationForExit Transition duration for exit elements
   * @param {boolean} isSub Subchart draw
   * @private
   */
  updateLine: function updateLine(durationForExit, isSub) {
    isSub === void 0 && (isSub = !1);
    var $$ = this,
        extraLineClasses = $$.format.extraLineClasses,
        $el = $$.$el,
        $root = isSub ? $el.subchart : $el,
        line = $root.main.selectAll("." + config_classes.lines).selectAll("." + config_classes.line).data($$.lineData.bind($$));
    line.exit().transition().duration(durationForExit).style("opacity", "0").remove(), $root.line = line.enter().append("path").attr("class", function (d) {
      return $$.getClass("line", !0)(d) + " " + (extraLineClasses(d) || "");
    }).style("stroke", $$.color).merge(line).style("opacity", $$.initialOpacity.bind($$)).style("shape-rendering", function (d) {
      return $$.isStepType(d) ? "crispEdges" : "";
    }).attr("transform", null);
  },

  /**
   * Redraw function
   * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
   * @param {boolean} withTransition With or without transition
   * @param {boolean} isSub Subchart draw
   * @returns {Array}
   */
  redrawLine: function redrawLine(drawFn, withTransition, isSub) {
    isSub === void 0 && (isSub = !1);

    var _ref = isSub ? this.$el.subchart : this.$el,
        line = _ref.line;

    return [(withTransition ? line.transition(getRandom()) : line).attr("d", drawFn).style("stroke", this.color).style("opacity", null)];
  },

  /**
   * Get the curve interpolate
   * @param {Array} d Data object
   * @returns {Function}
   * @private
   */
  getCurve: function getCurve(d) {
    var $$ = this,
        isRotatedStepType = $$.config.axis_rotated && $$.isStepType(d);
    // when is step & rotated, should be computed in different way
    // https://github.com/naver/billboard.js/issues/471
    return isRotatedStepType ? function (context) {
      var step = $$.getInterpolate(d)(context); // keep the original method

      return step.orgPoint = step.point, step.pointRotated = function (x, y) {
        this._point === 1 && (this._point = 2);
        var y1 = this._y * (1 - this._t) + y * this._t;
        this._context.lineTo(this._x, y1), this._context.lineTo(x, y1), this._x = x, this._y = y;
      }, step.point = function (x, y) {
        this._point === 0 ? this.orgPoint(x, y) : this.pointRotated(x, y);
      }, step;
    } : $$.getInterpolate(d);
  },
  generateDrawLine: function generateDrawLine(lineIndices, isSub) {
    var $$ = this,
        config = $$.config,
        scale = $$.scale,
        lineConnectNull = config.line_connectNull,
        isRotated = config.axis_rotated,
        getPoints = $$.generateGetLinePoints(lineIndices, isSub),
        yScale = $$.getYScaleById.bind($$),
        xValue = function (d) {
      return (isSub ? $$.subxx : $$.xx).call($$, d);
    },
        yValue = function (d, i) {
      return $$.isGrouped(d.id) ? getPoints(d, i)[0][1] : yScale(d.id, isSub)($$.getBaseValue(d));
    },
        line = (0,external_commonjs_d3_shape_commonjs2_d3_shape_amd_d3_shape_root_d3_.line)();

    line = isRotated ? line.x(yValue).y(xValue) : line.x(xValue).y(yValue), lineConnectNull || (line = line.defined(function (d) {
      return $$.getBaseValue(d) !== null;
    }));
    var x = isSub ? scale.subX : scale.x;
    return function (d) {
      var path,
          y = yScale(d.id, isSub),
          values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values,
          x0 = 0,
          y0 = 0;

      if ($$.isLineType(d)) {
        var regions = config.data_regions[d.id];
        regions ? path = $$.lineWithRegions(values, scale.zoom || x, y, regions) : ($$.isStepType(d) && (values = $$.convertValuesToStep(values)), path = line.curve($$.getCurve(d))(values));
      } else values[0] && (x0 = x(values[0].x), y0 = y(values[0].value)), path = isRotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;

      return path || "M 0 0";
    };
  },
  lineWithRegions: function lineWithRegions(d, x, y, _regions) {
    var xp,
        yp,
        diff,
        diffx2,
        $$ = this,
        config = $$.config,
        isRotated = config.axis_rotated,
        isTimeSeries = $$.axis.isTimeSeries(),
        xOffset = $$.axis.isCategorized() ? .5 : 0,
        regions = [],
        dasharray = "2 2",
        isWithinRegions = function (withinX, withinRegions) {
      for (var reg, i = 0; reg = withinRegions[i]; i++) if (reg.start < withinX && withinX <= reg.end) return reg.style;

      return !1;
    };

    // Check start/end of regions
    if (isDefined(_regions)) {
      var getValue = function (v, def) {
        return isUndefined(v) ? def : isTimeSeries ? parseDate.call($$, v) : v;
      };

      for (var reg, i = 0; reg = _regions[i]; i++) {
        var start = getValue(reg.start, d[0].x),
            end = getValue(reg.end, d[d.length - 1].x),
            style = reg.style || {
          dasharray: dasharray
        };
        regions[i] = {
          start: start,
          end: end,
          style: style
        };
      }
    } // Set scales


    var xValue = isRotated ? function (dt) {
      return y(dt.value);
    } : function (dt) {
      return x(dt.x);
    },
        yValue = isRotated ? function (dt) {
      return x(dt.x);
    } : function (dt) {
      return y(dt.value);
    },
        generateM = function (points) {
      return "M" + points[0][0] + "," + points[0][1] + "L" + points[1][0] + "," + points[1][1];
    },
        sWithRegion = isTimeSeries ? function (d0, d1, k, timeseriesDiff) {
      var x0 = d0.x.getTime(),
          xDiff = d1.x - d0.x,
          xv0 = new Date(x0 + xDiff * k),
          xv1 = new Date(x0 + xDiff * (k + timeseriesDiff)),
          points = isRotated ? [[y(yp(k)), x(xv0)], [y(yp(k + diff)), x(xv1)]] : [[x(xv0), y(yp(k))], [x(xv1), y(yp(k + diff))]];
      return generateM(points);
    } : function (d0, d1, k, otherDiff) {
      var points = isRotated ? [[y(yp(k), !0), x(xp(k))], [y(yp(k + otherDiff), !0), x(xp(k + otherDiff))]] : [[x(xp(k), !0), y(yp(k))], [x(xp(k + otherDiff), !0), y(yp(k + otherDiff))]];
      return generateM(points);
    },
        axisType = {
      x: $$.axis.getAxisType("x"),
      y: $$.axis.getAxisType("y")
    },
        path = "";

    for (var data, _i = 0; data = d[_i]; _i++) {
      var prevData = d[_i - 1],
          hasPrevData = prevData && isValue(prevData.value),
          style = isWithinRegions(data.x, regions);
      // https://github.com/naver/billboard.js/issues/1172
      if (isValue(data.value)) // Draw as normal
        if (isUndefined(regions) || !style || !hasPrevData) path += "" + (_i && hasPrevData ? "L" : "M") + xValue(data) + "," + yValue(data);else if (hasPrevData) {
          try {
            style = style.dasharray.split(" ");
          } catch (e) {
            style = dasharray.split(" ");
          } // Draw with region // TODO: Fix for horizotal charts


          xp = getScale(axisType.x, prevData.x + xOffset, data.x + xOffset), yp = getScale(axisType.y, prevData.value, data.value);
          var dx = x(data.x) - x(prevData.x),
              dy = y(data.value) - y(prevData.value),
              dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
          diff = style[0] / dd, diffx2 = diff * style[1];

          for (var _j = diff; _j <= 1; _j += diffx2) path += sWithRegion(prevData, data, _j, diff), _j + diffx2 >= 1 && (path += sWithRegion(prevData, data, 1, 0));
        }
    }

    return path;
  },
  isWithinStep: function isWithinStep(that, y) {
    return Math.abs(y - getPointer(this.state.event, that)[1]) < 30;
  },
  shouldDrawPointsForLine: function shouldDrawPointsForLine(d) {
    var linePoint = this.config.line_point;
    return linePoint === !0 || isArray(linePoint) && linePoint.indexOf(d.id) !== -1;
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/shape/point.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */





var getTransitionName = function () {
  return getRandom();
};

/* harmony default export */ var point = ({
  hasValidPointType: function hasValidPointType(type) {
    return /^(circle|rect(angle)?|polygon|ellipse|use)$/i.test(type || this.config.point_type);
  },
  hasValidPointDrawMethods: function hasValidPointDrawMethods(type) {
    var pointType = type || this.config.point_type;
    return isObjectType(pointType) && isFunction(pointType.create) && isFunction(pointType.update);
  },
  initialOpacityForCircle: function initialOpacityForCircle(d) {
    var config = this.config,
        withoutFadeIn = this.state.withoutFadeIn,
        opacity = config.point_opacity;
    return isUndefined(opacity) && (opacity = this.getBaseValue(d) !== null && withoutFadeIn[d.id] ? this.opacityForCircle(d) : "0"), opacity;
  },
  opacityForCircle: function opacityForCircle(d) {
    var config = this.config,
        opacity = config.point_opacity;
    return isUndefined(opacity) && (opacity = config.point_show && !config.point_focus_only ? null : "0", opacity = isValue(this.getBaseValue(d)) ? this.isBubbleType(d) || this.isScatterType(d) ? "0.5" : opacity : "0"), opacity;
  },
  initCircle: function initCircle() {
    var $$ = this,
        main = $$.$el.main;
    $$.point = $$.generatePoint(), ($$.hasType("bubble") || $$.hasType("scatter")) && main.select("." + config_classes.chartCircles).empty() && main.select("." + config_classes.chart).append("g").attr("class", config_classes.chartCircles);
  },
  updateTargetForCircle: function updateTargetForCircle(targetsValue, enterNodeValue) {
    var _this = this,
        $$ = this,
        config = $$.config,
        data = $$.data,
        $el = $$.$el,
        selectionEnabled = config.interaction_enabled && config.data_selection_enabled,
        isSelectable = selectionEnabled && config.data_selection_isselectable,
        classCircles = $$.getClass("circles", !0);

    if (config.point_show) {
      $el.circle || $$.initCircle();
      var targets = targetsValue,
          enterNode = enterNodeValue;

      // only for scatter & bubble type should generate seprate <g> node
      if (!targets) {
        targets = data.targets.filter(function (d) {
          return _this.isScatterType(d) || _this.isBubbleType(d);
        });
        var mainCircle = $el.main.select("." + config_classes.chartCircles).style("pointer-events", "none").selectAll("." + config_classes.circles).data(targets).attr("class", classCircles);
        mainCircle.exit().remove(), enterNode = mainCircle.enter();
      } // Circles for each data point on lines


      selectionEnabled && enterNode.append("g").attr("class", function (d) {
        return $$.generateClass(config_classes.selectedCircles, d.id);
      }), enterNode.append("g").attr("class", classCircles).style("cursor", function (d) {
        return isSelectable && isSelectable(d) ? "pointer" : null;
      }), selectionEnabled && targets.forEach(function (t) {
        $el.main.selectAll("." + config_classes.selectedCircles + $$.getTargetSelectorSuffix(t.id)).selectAll("" + config_classes.selectedCircle).each(function (d) {
          d.value = t.values[d.index].value;
        });
      });
    }
  },
  updateCircle: function updateCircle(isSub) {
    isSub === void 0 && (isSub = !1);
    var $$ = this,
        config = $$.config,
        state = $$.state,
        $el = $$.$el,
        focusOnly = config.point_focus_only,
        $root = isSub ? $el.subchart : $el;

    if (config.point_show && !state.toggling) {
      var circles = $root.main.selectAll("." + config_classes.circles).selectAll("." + config_classes.circle).data(function (d) {
        return $$.isLineType(d) && $$.shouldDrawPointsForLine(d) || $$.isBubbleType(d) || $$.isRadarType(d) || $$.isScatterType(d) ? focusOnly ? [d.values[0]] : d.values : [];
      });
      circles.exit().remove(), circles.enter().filter(Boolean).append($$.point("create", this, $$.pointR.bind($$), $$.color)), $root.circle = $root.main.selectAll("." + config_classes.circles + " ." + config_classes.circle).style("stroke", $$.color).style("opacity", $$.initialOpacityForCircle.bind($$));
    }
  },
  redrawCircle: function redrawCircle(cx, cy, withTransition, flow, isSub) {
    isSub === void 0 && (isSub = !1);
    var $$ = this,
        rendered = $$.state.rendered,
        $el = $$.$el,
        $root = isSub ? $el.subchart : $el,
        selectedCircles = $root.main.selectAll("." + config_classes.selectedCircle);
    if (!$$.config.point_show) return [];
    var fn = $$.point("update", $$, cx, cy, $$.color, withTransition, flow, selectedCircles),
        posAttr = $$.isCirclePoint() ? "c" : "",
        t = getRandom(),
        opacityStyleFn = $$.opacityForCircle.bind($$),
        mainCircles = [];
    return $root.circle.each(function (d) {
      var result = fn.bind(this)(d);
      result = (withTransition || !rendered ? result.transition(t) : result).style("opacity", opacityStyleFn), mainCircles.push(result);
    }), [mainCircles, (withTransition ? selectedCircles.transition() : selectedCircles).attr(posAttr + "x", cx).attr(posAttr + "y", cy)];
  },

  /**
   * Show focused data point circle
   * @param {object} d Selected data
   * @private
   */
  showCircleFocus: function showCircleFocus(d) {
    var $$ = this,
        config = $$.config,
        _$$$state = $$.state,
        hasRadar = _$$$state.hasRadar,
        resizing = _$$$state.resizing,
        toggling = _$$$state.toggling,
        transiting = _$$$state.transiting,
        $el = $$.$el,
        circle = $el.circle;

    if (transiting === !1 && config.point_focus_only && circle) {
      var cx = (hasRadar ? $$.radarCircleX : $$.circleX).bind($$),
          cy = (hasRadar ? $$.radarCircleY : $$.circleY).bind($$),
          withTransition = toggling || isUndefined(d),
          fn = $$.point("update", $$, cx, cy, $$.color, !resizing && withTransition);
      d && (circle = circle.filter(function (t) {
        var data = d.filter(function (v) {
          return v.id === t.id;
        });
        return !!data.length && (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).datum(data[0]);
      })), circle.attr("class", this.updatePointClass.bind(this)).style("opacity", null).each(function (d) {
        var id = d.id,
            index = d.index,
            value = d.value,
            visibility = "hidden";
        isValue(value) && (fn.bind(this)(d), $$.expandCircles(index, id), visibility = ""), this.style.visibility = visibility;
      });
    }
  },

  /**
   * Hide focused data point circle
   * @private
   */
  hideCircleFocus: function hideCircleFocus() {
    var $$ = this,
        config = $$.config,
        circle = $$.$el.circle;
    config.point_focus_only && circle && ($$.unexpandCircles(), circle.style("visibility", "hidden"));
  },
  circleX: function circleX(d) {
    return this.xx(d);
  },
  updateCircleY: function updateCircleY(isSub) {
    isSub === void 0 && (isSub = !1);
    var $$ = this,
        getPoints = $$.generateGetLinePoints($$.getShapeIndices($$.isLineType), isSub);
    return function (d, i) {
      var id = d.id;
      return $$.isGrouped(id) ? getPoints(d, i)[0][1] : $$.getYScaleById(id, isSub)($$.getBaseValue(d));
    };
  },
  getCircles: function getCircles(i, id) {
    var $$ = this,
        suffix = isValue(i) ? "-" + i : "";
    return (id ? $$.$el.main.selectAll("." + config_classes.circles + $$.getTargetSelectorSuffix(id)) : $$.$el.main).selectAll("." + config_classes.circle + suffix);
  },
  expandCircles: function expandCircles(i, id, reset) {
    var $$ = this,
        r = $$.pointExpandedR.bind($$);
    reset && $$.unexpandCircles();
    var circles = $$.getCircles(i, id).classed(config_classes.EXPANDED, !0),
        scale = r(circles) / $$.config.point_r,
        ratio = 1 - scale;
    $$.isCirclePoint() ? circles.attr("r", r) : circles.each(function () {
      var point = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
      if (this.tagName === "circle") point.attr("r", r);else {
        var _this$getBBox = this.getBBox(),
            width = _this$getBBox.width,
            height = _this$getBBox.height,
            x = ratio * (+point.attr("x") + width / 2),
            y = ratio * (+point.attr("y") + height / 2);

        point.attr("transform", "translate(" + x + " " + y + ") scale(" + scale + ")");
      }
    });
  },
  unexpandCircles: function unexpandCircles(i) {
    var $$ = this,
        r = $$.pointR.bind($$),
        circles = $$.getCircles(i).filter(function () {
      return (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed(config_classes.EXPANDED);
    }).classed(config_classes.EXPANDED, !1);
    circles.attr("r", r), $$.isCirclePoint() || circles.attr("transform", "scale(" + r(circles) / $$.config.point_r + ")");
  },
  pointR: function (d) {
    var $$ = this,
        config = $$.config,
        pointR = config.point_r,
        r = pointR;
    return $$.isBubbleType(d) ? r = $$.getBubbleR(d) : isFunction(pointR) && (r = pointR.bind($$.api)(d)), r;
  },
  pointExpandedR: function pointExpandedR(d) {
    var $$ = this,
        config = $$.config,
        scale = $$.isBubbleType(d) ? 1.15 : 1.75;
    return config.point_focus_expand_enabled ? config.point_focus_expand_r || $$.pointR(d) * scale : $$.pointR(d);
  },
  pointSelectR: function pointSelectR(d) {
    var $$ = this,
        selectR = $$.config.point_select_r;
    return isFunction(selectR) ? selectR(d) : selectR || $$.pointR(d) * 4;
  },
  isWithinCircle: function isWithinCircle(node, r) {
    var mouse = getPointer(this.state.event, node),
        element = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(node),
        prefix = this.isCirclePoint(node) ? "c" : "",
        cx = +element.attr(prefix + "x"),
        cy = +element.attr(prefix + "y");

    // if node don't have cx/y or x/y attribute value
    if (!(cx || cy) && node.nodeType === 1) {
      var _getBoundingRect = getBoundingRect(node),
          x = _getBoundingRect.x,
          y = _getBoundingRect.y;

      cx = x, cy = y;
    }

    return Math.sqrt(Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)) < (r || this.config.point_sensitivity);
  },
  insertPointInfoDefs: function insertPointInfoDefs(point, id) {
    var $$ = this,
        copyAttr = function (from, target) {
      for (var name, attribs = from.attributes, i = 0; name = attribs[i]; i++) name = name.name, target.setAttribute(name, from.getAttribute(name));
    },
        doc = new DOMParser().parseFromString(point, "image/svg+xml"),
        node = doc.documentElement,
        clone = browser_doc.createElementNS(external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.namespaces.svg, node.nodeName.toLowerCase());

    if (clone.id = id, clone.style.fill = "inherit", clone.style.stroke = "inherit", copyAttr(node, clone), node.childNodes && node.childNodes.length) {
      var parent = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(clone);
      "innerHTML" in clone ? parent.html(node.innerHTML) : toArray(node.childNodes).forEach(function (v) {
        copyAttr(v, parent.append(v.tagName).node());
      });
    }

    $$.$el.defs.node().appendChild(clone);
  },
  pointFromDefs: function pointFromDefs(id) {
    return this.$el.defs.select("#" + id);
  },
  updatePointClass: function updatePointClass(d) {
    var $$ = this,
        circle = $$.$el.circle,
        pointClass = !1;
    return (isObject(d) || circle) && (pointClass = d === !0 ? circle.each(function (d) {
      var className = $$.getClass("circle", !0)(d);
      this.getAttribute("class").indexOf(config_classes.EXPANDED) > -1 && (className += " " + config_classes.EXPANDED), this.setAttribute("class", className);
    }) : $$.getClass("circle", !0)(d)), pointClass;
  },
  generateGetLinePoints: function generateGetLinePoints(lineIndices, isSub) {
    // partial duplication of generateGetBarPoints
    var $$ = this,
        config = $$.config,
        x = $$.getShapeX(0, lineIndices, isSub),
        y = $$.getShapeY(isSub),
        lineOffset = $$.getShapeOffset($$.isLineType, lineIndices, isSub),
        yScale = $$.getYScaleById.bind($$);
    return function (d, i) {
      var y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id)),
          offset = lineOffset(d, i) || y0,
          posX = x(d),
          posY = y(d);
      config.axis_rotated && (d.value > 0 && posY < y0 || d.value < 0 && y0 < posY) && (posY = y0);
      // 1 point that marks the line position
      var point = [posX, posY - (y0 - offset)];
      return [point, point, // from here and below, needed for compatibility
      point, point];
    };
  },
  generatePoint: function generatePoint() {
    var $$ = this,
        config = $$.config,
        datetimeId = $$.state.datetimeId,
        ids = [],
        pattern = notEmpty(config.point_pattern) ? config.point_pattern : [config.point_type];
    return function (method, context) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];

      return function (d) {
        var id = $$.getTargetSelectorSuffix(d.id || d.data && d.data.id || d),
            element = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
        ids.indexOf(id) < 0 && ids.push(id);
        var point = pattern[ids.indexOf(id) % pattern.length];
        if ($$.hasValidPointType(point)) point = $$[point];else if (!$$.hasValidPointDrawMethods(point)) {
          var pointId = datetimeId + "-point" + id,
              pointFromDefs = $$.pointFromDefs(pointId);
          if (pointFromDefs.size() < 1 && $$.insertPointInfoDefs(point, pointId), method === "create") return $$.custom.create.bind(context).apply(void 0, [element, pointId].concat(args));
          if (method === "update") return $$.custom.update.bind(context).apply(void 0, [element].concat(args));
        }
        return point[method].bind(context).apply(void 0, [element].concat(args));
      };
    };
  },
  custom: {
    create: function create(element, id, sizeFn, fillStyleFn) {
      return element.append("use").attr("xlink:href", "#" + id).attr("class", this.updatePointClass.bind(this)).style("fill", fillStyleFn).node();
    },
    update: function update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
      var _element$node$getBBox = element.node().getBBox(),
          width = _element$node$getBBox.width,
          height = _element$node$getBBox.height,
          xPosFn2 = function (d) {
        return isValue(d.value) ? xPosFn(d) - width / 2 : 0;
      },
          mainCircles = element;

      if (withTransition) {
        var transitionName = getTransitionName();
        flow && mainCircles.attr("x", xPosFn2), mainCircles = mainCircles.transition(transitionName), selectedCircles && selectedCircles.transition(getTransitionName());
      }

      return mainCircles.attr("x", xPosFn2).attr("y", function yPosFn2(d) {
        return isValue(d.value) ? yPosFn(d) - height / 2 : 0;
      }).style("fill", fillStyleFn);
    }
  },
  // 'circle' data point
  circle: {
    create: function create(element, sizeFn, fillStyleFn) {
      return element.append("circle").attr("class", this.updatePointClass.bind(this)).attr("r", sizeFn).style("fill", fillStyleFn).node();
    },
    update: function update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
      var $$ = this,
          mainCircles = element;

      if ($$.hasType("bubble") && mainCircles.attr("r", $$.pointR.bind($$)), withTransition) {
        var transitionName = getTransitionName();
        flow && mainCircles.attr("cx", xPosFn), mainCircles.attr("cx") && (mainCircles = mainCircles.transition(transitionName)), selectedCircles && selectedCircles.transition(getTransitionName());
      }

      return mainCircles.attr("cx", xPosFn).attr("cy", yPosFn).style("fill", fillStyleFn);
    }
  },
  // 'rectangle' data point
  rectangle: {
    create: function create(element, sizeFn, fillStyleFn) {
      var rectSizeFn = function (d) {
        return sizeFn(d) * 2;
      };

      return element.append("rect").attr("class", this.updatePointClass.bind(this)).attr("width", rectSizeFn).attr("height", rectSizeFn).style("fill", fillStyleFn).node();
    },
    update: function update(element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
      var $$ = this,
          r = $$.config.point_r,
          rectXPosFn = function (d) {
        return xPosFn(d) - r;
      },
          mainCircles = element;

      if (withTransition) {
        var transitionName = getTransitionName();
        flow && mainCircles.attr("x", rectXPosFn), mainCircles = mainCircles.transition(transitionName), selectedCircles && selectedCircles.transition(getTransitionName());
      }

      return mainCircles.attr("x", rectXPosFn).attr("y", function rectYPosFn(d) {
        return yPosFn(d) - r;
      }).style("fill", fillStyleFn);
    }
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/shape/radar.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/**
 * Get the position value
 * @param {boolean} isClockwise If the direction is clockwise
 * @param {string} type Coordinate type 'x' or 'y'
 * @param {number} edge Number of edge
 * @param {number} pos The indexed position
 * @param {number} range Range value
 * @param {number} ratio Ratio value
 * @returns {number}
 * @private
 */

function getPosition(isClockwise, type, edge, pos, range, ratio) {
  var index = isClockwise && pos > 0 ? edge - pos : pos,
      r = 2 * Math.PI,
      func = type === "x" ? Math.sin : Math.cos;
  return range * (1 - ratio * func(index * r / edge));
} // cache key


var cacheKey = KEY.radarPoints;
/* harmony default export */ var radar = ({
  initRadar: function initRadar() {
    var $$ = this,
        config = $$.config,
        current = $$.state.current,
        $el = $$.$el;
    $$.hasType("radar") && ($el.radar = $el.main.select("." + config_classes.chart).append("g").attr("class", config_classes.chartRadars), $el.radar.levels = $el.radar.append("g").attr("class", config_classes.levels), $el.radar.axes = $el.radar.append("g").attr("class", config_classes.axis), $el.radar.shapes = $el.radar.append("g").attr("class", config_classes.shapes), current.dataMax = config.radar_axis_max || $$.getMinMaxData().max[0].value);
  },
  getRadarSize: function getRadarSize() {
    var $$ = this,
        config = $$.config,
        _$$$state = $$.state,
        arcWidth = _$$$state.arcWidth,
        arcHeight = _$$$state.arcHeight,
        padding = config.axis_x_categories.length < 4 ? -20 : 10,
        size = (Math.min(arcWidth, arcHeight) - padding) / 2;
    return [size, size];
  },
  updateTargetsForRadar: function updateTargetsForRadar(targets) {
    var $$ = this,
        config = $$.config;
    isEmpty(config.axis_x_categories) && (config.axis_x_categories = getRange(0, getMinMax("max", targets.map(function (v) {
      return v.values.length;
    })))), $$.generateRadarPoints();
  },
  getRadarPosition: function getRadarPosition(type, index, range, ratio) {
    var $$ = this,
        config = $$.config,
        _$$$getRadarSize = $$.getRadarSize(),
        width = _$$$getRadarSize[0],
        height = _$$$getRadarSize[1],
        edge = config.axis_x_categories.length,
        isClockwise = config.radar_direction_clockwise,
        pos = toArray(type).map(function (v) {
      return getPosition(isClockwise, v, edge, index, isDefined(range) ? range : type === "x" ? width : height, isNumber(ratio) ? ratio : config.radar_size_ratio);
    });

    return pos.length === 1 ? pos[0] : pos;
  },

  /**
   * Generate data points
   * @private
   */
  generateRadarPoints: function generateRadarPoints() {
    var $$ = this,
        targets = $$.data.targets,
        _$$$getRadarSize2 = $$.getRadarSize(),
        width = _$$$getRadarSize2[0],
        height = _$$$getRadarSize2[1],
        points = $$.cache.get(cacheKey) || {},
        size = points._size;

    size && (size.width === width || size.height === height) || (targets.forEach(function (d) {
      points[d.id] = d.values.map(function (v, i) {
        return $$.getRadarPosition(["x", "y"], i, undefined, $$.getRatio("radar", v));
      });
    }), points._size = {
      width: width,
      height: height
    }, $$.cache.add(cacheKey, points));
  },
  redrawRadar: function redrawRadar(durationForExit) {
    var $$ = this,
        _$$$$el = $$.$el,
        radar = _$$$$el.radar,
        main = _$$$$el.main,
        translate = $$.getTranslate("radar");
    translate && (radar.attr("transform", translate), main.select("." + config_classes.chartTexts).attr("transform", translate), $$.generateRadarPoints(), $$.updateRadarLevel(), $$.updateRadarAxes(), $$.updateRadarShape(durationForExit));
  },
  generateGetRadarPoints: function generateGetRadarPoints() {
    var points = this.cache.get(cacheKey);
    return function (d, i) {
      var point = points[d.id][i];
      return [point, point, point, point];
    };
  },
  updateRadarLevel: function updateRadarLevel() {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        radar = $$.$el.radar,
        _$$$getRadarSize3 = $$.getRadarSize(),
        width = _$$$getRadarSize3[0],
        height = _$$$getRadarSize3[1],
        depth = config.radar_level_depth,
        edge = config.axis_x_categories.length,
        showText = config.radar_level_text_show,
        radarLevels = radar.levels,
        levelData = getRange(0, depth),
        radius = config.radar_size_ratio * Math.min(width, height),
        levelRatio = levelData.map(function (l) {
      return radius * ((l + 1) / depth);
    }),
        levelTextFormat = (config.radar_level_text_format || function () {}).bind($$.api),
        points = levelData.map(function (v) {
      var range = levelRatio[v],
          pos = getRange(0, edge).map(function (i) {
        return $$.getRadarPosition(["x", "y"], i, range, 1).join(",");
      });
      return pos.join(" ");
    }),
        level = radarLevels.selectAll("." + config_classes.level).data(levelData);

    level.exit().remove();
    var levelEnter = level.enter().append("g").attr("class", function (d, i) {
      return config_classes.level + " " + config_classes.level + "-" + i;
    });
    levelEnter.append("polygon").style("visibility", config.radar_level_show ? null : "hidden"), showText && (radarLevels.select("text").empty() && radarLevels.append("text").attr("dx", "-.5em").attr("dy", "-.7em").style("text-anchor", "end").text(function () {
      return levelTextFormat(0);
    }), levelEnter.append("text").attr("dx", "-.5em").style("text-anchor", "end").text(function (d) {
      return levelTextFormat(state.current.dataMax / levelData.length * (d + 1));
    })), levelEnter.merge(level).attr("transform", function (d) {
      return "translate(" + (width - levelRatio[d]) + ", " + (height - levelRatio[d]) + ")";
    }).selectAll("polygon").attr("points", function (d) {
      return points[d];
    }), showText && radarLevels.selectAll("text").attr("x", function (d) {
      return isUndefined(d) ? width : points[d].split(",")[0];
    }).attr("y", function (d) {
      return isUndefined(d) ? height : 0;
    });
  },
  updateRadarAxes: function updateRadarAxes() {
    var $$ = this,
        config = $$.config,
        radar = $$.$el.radar,
        _$$$getRadarSize4 = $$.getRadarSize(),
        width = _$$$getRadarSize4[0],
        height = _$$$getRadarSize4[1],
        categories = config.axis_x_categories,
        axis = radar.axes.selectAll("g").data(categories);

    axis.exit().remove();
    var axisEnter = axis.enter().append("g").attr("class", function (d, i) {
      return config_classes.axis + "-" + i;
    });

    // axis text
    if (config.radar_axis_line_show && axisEnter.append("line"), config.radar_axis_text_show && axisEnter.append("text"), axis = axisEnter.merge(axis), config.radar_axis_line_show && axis.select("line").attr("x1", width).attr("y1", height).attr("x2", function (d, i) {
      return $$.getRadarPosition("x", i);
    }).attr("y2", function (d, i) {
      return $$.getRadarPosition("y", i);
    }), config.radar_axis_text_show) {
      var _config$radar_axis_te = config.radar_axis_text_position,
          _config$radar_axis_te2 = _config$radar_axis_te.x,
          x = _config$radar_axis_te2 === void 0 ? 0 : _config$radar_axis_te2,
          _config$radar_axis_te3 = _config$radar_axis_te.y,
          y = _config$radar_axis_te3 === void 0 ? 0 : _config$radar_axis_te3;
      axis.select("text").style("text-anchor", "middle").attr("dy", ".5em").call(function (selection) {
        selection.each(function (d) {
          setTextValue((0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this), d + "", [-.6, 1.2]);
        });
      }).datum(function (d, i) {
        return {
          index: i
        };
      }).attr("transform", function (d) {
        isUndefined(this.width) && (this.width = this.getBoundingClientRect().width / 2);
        var posX = $$.getRadarPosition("x", d.index, undefined, 1),
            posY = Math.round($$.getRadarPosition("y", d.index, undefined, 1));
        return posX > width ? posX += this.width + x : Math.round(posX) < width && (posX -= this.width + x), posY > height ? (posY / 2 === height && this.firstChild.tagName === "tspan" && this.firstChild.setAttribute("dy", "0em"), posY += y) : posY < height && (posY -= y), "translate(" + posX + " " + posY + ")";
      });
    }

    $$.bindEvent();
  },
  bindEvent: function bindEvent() {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        _$$$$el2 = $$.$el,
        radar = _$$$$el2.radar,
        svg = _$$$$el2.svg,
        focusOnly = config.point_focus_only,
        _state = state,
        inputType = _state.inputType,
        transiting = _state.transiting;

    if (config.interaction_enabled) {
      var isMouse = inputType === "mouse",
          getIndex = function (event) {
        var target = event.target; // in case of multilined axis text

        /tspan/i.test(target.tagName) && (target = target.parentNode);
        var d = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(target).datum();
        return d && Object.keys(d).length === 1 ? d.index : undefined;
      },
          hide = function (event) {
        var index = getIndex(event),
            noIndex = isUndefined(index);
        (isMouse || noIndex) && ($$.hideTooltip(), focusOnly ? $$.hideCircleFocus() : $$.unexpandCircles(), isMouse ? $$.setOverOut(!1, index) : noIndex && $$.callOverOutForTouch());
      };

      radar.axes.selectAll("text").on(isMouse ? "mouseover " : "touchstart", function (event) {
        if (!transiting) // skip while transiting
          {
            state.event = event;
            var index = getIndex(event);
            $$.selectRectForSingle(svg.node(), null, index), isMouse ? $$.setOverOut(!0, index) : $$.callOverOutForTouch(index);
          }
      }).on("mouseout", isMouse ? hide : null), isMouse || svg.on("touchstart", hide);
    }
  },
  updateRadarShape: function updateRadarShape(durationForExit) {
    var $$ = this,
        targets = $$.data.targets.filter(function (d) {
      return $$.isRadarType(d);
    }),
        points = $$.cache.get(cacheKey),
        areas = $$.$el.radar.shapes.selectAll("polygon").data(targets),
        areasEnter = areas.enter().append("g").attr("class", $$.getChartClass("Radar"));
    areas.exit().transition().duration(durationForExit).remove(), areasEnter.append("polygon").merge(areas).style("fill", $$.color).style("stroke", $$.color).attr("points", function (d) {
      return points[d.id].join(" ");
    }), $$.updateTargetForCircle(targets, areasEnter);
  },

  /**
   * Get data point x coordinate
   * @param {object} d Data object
   * @returns {number}
   * @private
   */
  radarCircleX: function radarCircleX(d) {
    return this.cache.get(cacheKey)[d.id][d.index][0];
  },

  /**
   * Get data point y coordinate
   * @param {object} d Data object
   * @returns {number}
   * @private
   */
  radarCircleY: function radarCircleY(d) {
    return this.cache.get(cacheKey)[d.id][d.index][1];
  }
});
;// CONCATENATED MODULE: ./src/config/Options/common/point.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * point config options
 */
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
   * @property {boolean} [point.focus.expand.enabled=true] Whether to expand each point on focus.
   * @property {number} [point.focus.expand.r=point.r*1.75] The radius size of each point on focus.
   *  - **NOTE:** For 'bubble' type, the default is `bubbleSize*1.15`
   * @property {boolean} [point.focus.only=false] Show point only when is focused.
   * @property {number|null} [point.opacity=undefined] Set point opacity value.
   * - **NOTE:**
   *	- `null` will make to not set inline 'opacity' css prop.
   *	- when no value(or undefined) is set, it defaults to set opacity value according its chart types.
   * @property {number} [point.sensitivity=10] The senstivity value for interaction boundary.
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
  point_show: !0,
  point_r: 2.5,
  point_sensitivity: 10,
  point_focus_expand_enabled: !0,
  point_focus_expand_r: undefined,
  point_focus_only: !1,
  point_opacity: undefined,
  point_pattern: [],
  point_select_r: undefined,
  point_type: "circle"
});
;// CONCATENATED MODULE: ./src/config/Options/shape/area.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * area config options
 */
/* harmony default export */ var Options_shape_area = ({
  /**
   * Set area options
   * @name area
   * @memberof Options
   * @type {object}
   * @property {object} area Area object
   * @property {boolean} [area.above=false] Set background area above the data chart line.
   * @property {boolean} [area.front=true] Set area node to be positioned over line node.
   * @property {boolean|object} [area.linearGradient=false] Set the linear gradient on area.<br><br>
   * Or customize by giving below object value:
   *  - x {Array}: `x1`, `x2` value
   *  - y {Array}: `y1`, `y2` value
   *  - stops {Array}: Each item should be having `[offset, stop-color, stop-opacity]` values.
   * @property {boolean} [area.zerobased=true] Set if min or max value will be 0 on area chart.
   * @see [MDN's &lt;linearGradient>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient), [&lt;stop>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop)
   * @see [Demo](https://naver.github.io/billboard.js/demo/#Chart.AreaChart)
   * @see [Demo: above](https://naver.github.io/billboard.js/demo/#AreaChartOptions.Above)
   * @see [Demo: linearGradient](https://naver.github.io/billboard.js/demo/#AreaChartOptions.LinearGradient)
   * @example
   *  area: {
   *      above: true,
   *      zerobased: false,
   *
   *      // <g class='bb-areas'> will be positioned behind the line <g class='bb-lines'> in stacking order
   *      front: false,
   *
   *      // will generate follwing linearGradient:
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
  area_above: !1,
  area_front: !0,
  area_linearGradient: !1,
  area_zerobased: !0
});
;// CONCATENATED MODULE: ./src/config/Options/shape/bar.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * bar config options
 */
/* harmony default export */ var shape_bar = ({
  /**
   * Set bar options
   * @name bar
   * @memberof Options
   * @type {object}
   * @property {object} bar Bar object
   * @property {number} [bar.label.threshold=0] Set threshold ratio to show/hide labels.
   * @property {number} [bar.padding=0] The padding pixel value between each bar.
   * @property {number} [bar.radius] Set the radius of bar edge in pixel.
   * - **NOTE:** Works only for non-stacked bar
   * @property {number} [bar.radius.ratio] Set the radius ratio of bar edge in relative the bar's width.
   * @property {number} [bar.sensitivity=2] The senstivity offset value for interaction boundary.
   * @property {number} [bar.width] Change the width of bar chart.
   * @property {number} [bar.width.ratio=0.6] Change the width of bar chart by ratio.
   * @property {number} [bar.width.max] The maximum width value for ratio.
   * @property {number} [bar.width.dataname] Change the width of bar for indicated dataset only.
   * - **NOTE:**
   *   - Works only for non-stacked bar
   *   - Bars are centered accoding its total width value
   * @property {number} [bar.width.dataname.ratio=0.6] Change the width of bar chart by ratio.
   * @property {number} [bar.width.dataname.max] The maximum width value for ratio.
   * @property {boolean} [bar.zerobased=true] Set if min or max value will be 0 on bar chart.
   * @see [Demo: bar padding](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarPadding)
   * @see [Demo: bar radius](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarRadius)
   * @see [Demo: bar width](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidth)
   * @see [Demo: bar width variant](https://naver.github.io/billboard.js/demo/#BarChartOptions.BarWidthVariant)
   * @example
   *  bar: {
   *      padding: 1,
   *
   *      // the 'radius' option can be used only for non-stacking bars
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
   *      // or
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
  bar_label_threshold: 0,
  bar_padding: 0,
  bar_radius: undefined,
  bar_radius_ratio: undefined,
  bar_sensitivity: 2,
  bar_width: undefined,
  bar_width_ratio: .6,
  bar_width_max: undefined,
  bar_zerobased: !0
});
;// CONCATENATED MODULE: ./src/config/Options/shape/bubble.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * bubble config options
 */
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
  bubble_zerobased: !1
});
;// CONCATENATED MODULE: ./src/config/Options/shape/candlestick.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * candlestick config options
 */
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
  candlestick_width: undefined,
  candlestick_width_ratio: .6,
  candlestick_width_max: undefined,
  candlestick_color_down: "red"
});
;// CONCATENATED MODULE: ./src/config/Options/shape/line.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * line config options
 */
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
  line_connectNull: !1,
  line_step_type: "step",
  line_zerobased: !1,
  line_classes: undefined,
  line_point: !0
});
;// CONCATENATED MODULE: ./src/config/Options/shape/scatter.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * scatter config options
 */
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
  scatter_zerobased: !1
});
;// CONCATENATED MODULE: ./src/config/Options/shape/spline.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * x Axis config options
 */
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
;// CONCATENATED MODULE: ./src/config/Options/shape/donut.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * donut config options
 */
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
   *      // title with line break
   *      title: "Title1\nTitle2"
   *  }
   */
  donut_label_show: !0,
  donut_label_format: undefined,
  donut_label_threshold: .05,
  donut_label_ratio: undefined,
  donut_width: undefined,
  donut_title: "",
  donut_expand: {},
  donut_expand_rate: .98,
  donut_expand_duration: 50,
  donut_padAngle: 0,
  donut_startingAngle: 0
});
;// CONCATENATED MODULE: ./src/config/Options/shape/gauge.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * gauge config options
 */
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
   * @property {Function} [gauge.label.format] Set formatter for the label on gauge. Label text can be multilined with `\n` character.<br>
   * Will pass following arguments to the given function:
   * - value {number}: absolute value
   * - ratio {number}: value's ratio
   * - id {string}: data's id value
   * @property {Function} [gauge.label.extents] Set customized min/max label text.
   * @property {number} [gauge.label.threshold=0] Set threshold ratio to show/hide labels.
   * @property {boolean} [gauge.expand=true] Enable or disable expanding gauge.
   * @property {number} [gauge.expand.rate=0.98] Set expand rate.
   * @property {number} [gauge.expand.duration=50] Set the expand transition time in milliseconds.
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
   * Negative value will draw the arc **counterclockwise**.
   *
   * **Limitations:**
   * - -100 <= arcLength (in percent) <= 100
   * - 'arcLength < -100' defaults to -100
   * - 'arcLength > 100' defaults to 100
   * @property {string} [gauge.title=""] Set title of gauge chart. Use `\n` character for line break.
   * @property {string} [gauge.units] Set units of the gauge.
   * @property {number} [gauge.width] Set width of gauge chart.
   * @property {string} [gauge.type="single"] Set type of gauge to be displayed.<br><br>
   * **Available Values:**
   * - single
   * - multi
   * @property {string} [gauge.arcs.minWidth=5] Set minimal width of gauge arcs until the innerRadius disappears.
   * @see [Demo: archLength](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeArcLength)
   * @see [Demo: startingAngle](https://naver.github.io/billboard.js/demo/#GaugeChartOptions.GaugeStartingAngle)
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
   *      min: -100,
   *      max: 200,
   *      type: "single"  // or 'multi'
   *      title: "Title Text",
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
  gauge_fullCircle: !1,
  gauge_label_show: !0,
  gauge_label_format: undefined,
  gauge_label_extents: undefined,
  gauge_label_threshold: 0,
  gauge_min: 0,
  gauge_max: 100,
  gauge_type: "single",
  gauge_startingAngle: -1 * Math.PI / 2,
  gauge_arcLength: 100,
  gauge_title: "",
  gauge_units: undefined,
  gauge_width: undefined,
  gauge_arcs_minWidth: 5,
  gauge_expand: {},
  gauge_expand_rate: .98,
  gauge_expand_duration: 50
});
;// CONCATENATED MODULE: ./src/config/Options/shape/pie.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * x Axis config options
 */
/* harmony default export */ var pie = ({
  /**
   * Set pie options
   * @name pie
   * @memberof Options
   * @type {object}
   * @property {object} pie Pie object
   * @property {boolean} [pie.label.show=true] Show or hide label on each pie piece.
   * @property {Function} [pie.label.format] Set formatter for the label on each pie piece.
   * @property {number} [pie.label.threshold=0.05] Set threshold ratio to show/hide labels.
   * @property {number|Function} [pie.label.ratio=undefined] Set ratio of labels position.
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
  pie_label_show: !0,
  pie_label_format: undefined,
  pie_label_threshold: .05,
  pie_label_ratio: undefined,
  pie_expand: {},
  pie_expand_rate: .98,
  pie_expand_duration: 50,
  pie_innerRadius: 0,
  pie_outerRadius: undefined,
  pie_padAngle: 0,
  pie_padding: 0,
  pie_startingAngle: 0
});
;// CONCATENATED MODULE: ./src/config/Options/shape/radar.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * x Axis config options
 */
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
  radar_axis_max: undefined,
  radar_axis_line_show: !0,
  radar_axis_text_show: !0,
  radar_axis_text_position: {},
  radar_level_depth: 3,
  radar_level_show: !0,
  radar_level_text_format: function radar_level_text_format(x) {
    return x % 1 === 0 ? x : x.toFixed(2);
  },
  radar_level_text_show: !0,
  radar_size_ratio: .87,
  radar_direction_clockwise: !1
});
;// CONCATENATED MODULE: ./src/config/resolver/shape.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




 // Axis

 // Shape









 // Options








 // Non-Axis based






/**
 * Extend Axis
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */

function extendAxis(module, option) {
  extend(ChartInternal.prototype, internal.concat(module)), extend(Chart.prototype, api), Options.setOptions(options.concat(option || []));
}
/**
 * Extend Line type modules
 * @param {object} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */


function extendLine(module, option) {
  extendAxis([point, line].concat(module || [])), Options.setOptions([common_point, shape_line].concat(option || []));
}
/**
 * Extend Arc type modules
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */


function extendArc(module, option) {
  extend(ChartInternal.prototype, [arc].concat(module || [])), Options.setOptions(option);
} // Area types


var _area = function area() {
  return extendLine(shape_area, [Options_shape_area]), (_area = function area() {
    return TYPE.AREA;
  })();
},
    areaLineRange = function () {
  return extendLine(shape_area, [Options_shape_area]), (areaLineRange = function () {
    return TYPE.AREA_LINE_RANGE;
  })();
},
    areaSpline = function () {
  return extendLine(shape_area, [Options_shape_area, spline]), (areaSpline = function () {
    return TYPE.AREA_SPLINE;
  })();
},
    areaSplineRange = function () {
  return extendLine(shape_area, [Options_shape_area, spline]), (areaSplineRange = function () {
    return TYPE.AREA_SPLINE_RANGE;
  })();
},
    areaStep = function () {
  return extendLine(shape_area, [Options_shape_area]), (areaStep = function () {
    return TYPE.AREA_STEP;
  })();
},
    resolver_shape_line = function () {
  return extendLine(), (resolver_shape_line = function () {
    return TYPE.LINE;
  })();
},
    shape_spline = function () {
  return extendLine(undefined, [spline]), (shape_spline = function () {
    return TYPE.SPLINE;
  })();
},
    step = function () {
  return extendLine(), (step = function () {
    return TYPE.STEP;
  })();
},
    shape_donut = function () {
  return extendArc(undefined, [donut]), (shape_donut = function () {
    return TYPE.DONUT;
  })();
},
    resolver_shape_gauge = function () {
  return extendArc([gauge], [shape_gauge]), (resolver_shape_gauge = function () {
    return TYPE.GAUGE;
  })();
},
    shape_pie = function () {
  return extendArc(undefined, [pie]), (shape_pie = function () {
    return TYPE.PIE;
  })();
},
    resolver_shape_radar = function () {
  return extendArc([point, radar], [common_point, shape_radar]), (resolver_shape_radar = function () {
    return TYPE.RADAR;
  })();
},
    resolver_shape_bar = function () {
  return extendAxis([bar], shape_bar), (resolver_shape_bar = function () {
    return TYPE.BAR;
  })();
},
    resolver_shape_bubble = function () {
  return extendAxis([point, bubble], [shape_bubble, common_point]), (resolver_shape_bubble = function () {
    return TYPE.BUBBLE;
  })();
},
    resolver_shape_candlestick = function () {
  return extendAxis([candlestick], [shape_candlestick]), (resolver_shape_candlestick = function () {
    return TYPE.CANDLESTICK;
  })();
},
    shape_scatter = function () {
  return extendAxis([point], [common_point, scatter]), (shape_scatter = function () {
    return TYPE.SCATTER;
  })();
};
;// CONCATENATED MODULE: ./src/Chart/api/selection.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



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
  selected: function selected(targetId) {
    var $$ = this.internal,
        dataPoint = [];
    return $$.$el.main.selectAll("." + (config_classes.shapes + $$.getTargetSelectorSuffix(targetId))).selectAll("." + config_classes.shape).filter(function () {
      return (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this).classed(config_classes.SELECTED);
    }).each(function (d) {
      return dataPoint.push(d);
    }), dataPoint;
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
  select: function select(ids, indices, resetOther) {
    var $$ = this.internal,
        config = $$.config,
        $el = $$.$el;
    config.data_selection_enabled && $el.main.selectAll("." + config_classes.shapes).selectAll("." + config_classes.shape).each(function (d, i) {
      var shape = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
          id = d.data ? d.data.id : d.id,
          toggle = $$.getToggle(this, d).bind($$),
          isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0,
          isTargetIndex = !indices || indices.indexOf(i) >= 0,
          isSelected = shape.classed(config_classes.SELECTED);
      // line/area selection not supported yet
      shape.classed(config_classes.line) || shape.classed(config_classes.area) || (isTargetId && isTargetIndex ? config.data_selection_isselectable.bind($$.api)(d) && !isSelected && toggle(!0, shape.classed(config_classes.SELECTED, !0), d, i) : isDefined(resetOther) && resetOther && isSelected && toggle(!1, shape.classed(config_classes.SELECTED, !1), d, i));
    });
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
  unselect: function unselect(ids, indices) {
    var $$ = this.internal,
        config = $$.config,
        $el = $$.$el;
    config.data_selection_enabled && $el.main.selectAll("." + config_classes.shapes).selectAll("." + config_classes.shape).each(function (d, i) {
      var shape = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
          id = d.data ? d.data.id : d.id,
          toggle = $$.getToggle(this, d).bind($$),
          isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0,
          isTargetIndex = !indices || indices.indexOf(i) >= 0,
          isSelected = shape.classed(config_classes.SELECTED);
      // line/area selection not supported yet
      shape.classed(config_classes.line) || shape.classed(config_classes.area) || isTargetId && isTargetIndex && config.data_selection_isselectable.bind($$.api)(d) && isSelected && toggle(!1, shape.classed(config_classes.SELECTED, !1), d, i);
    });
  }
});
;// CONCATENATED MODULE: ./src/Chart/api/subchart.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/* harmony default export */ var subchart = ({
  subchart: {
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
     *     // need to be instantiated by calling 'subchart()'
     *     enabled: subchart()
     *
     *     // in case don't want subchart to be shown at initialization, instantiate with '!subchart()'
     *     enabled: !subchart()
     *     }
     * });
     *
     * chart.subchart.show();
     */
    show: function () {
      var $$ = this.internal,
          subchart = $$.$el.subchart,
          config = $$.config,
          show = config.subchart_show;

      if (!show) {
        $$.unbindZoomEvent(), config.subchart_show = !show, subchart.main || $$.initSubchart();
        var $target = subchart.main.selectAll("." + config_classes.target); // need to cover when new data has been loaded

        $$.data.targets.length !== $target.size() && ($$.updateSizes(), $$.updateTargetsForSubchart($$.data.targets), $target = subchart.main.selectAll("." + config_classes.target)), $target.style("opacity", null), subchart.main.style("display", null), this.flush();
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
    hide: function hide() {
      var $$ = this.internal,
          subchart = $$.$el.subchart,
          config = $$.config;
      config.subchart_show && subchart.main.style("display") !== "none" && (config.subchart_show = !1, subchart.main.style("display", "none"), this.flush());
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
    toggle: function toggle() {
      var $$ = this.internal,
          config = $$.config;
      this.subchart[config.subchart_show ? "hide" : "show"]();
    }
  }
});
// EXTERNAL MODULE: external {"commonjs":"d3-zoom","commonjs2":"d3-zoom","amd":"d3-zoom","root":"d3"}
var external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_ = __webpack_require__(14);
;// CONCATENATED MODULE: ./src/Chart/api/zoom.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Check if the given domain is within zoom range
 * @param {Array} domain Target domain value
 * @param {Array} current Current zoom domain value
 * @param {Array} range Zoom range value
 * @returns {boolean}
 * @private
 */

function withinRange(domain, current, range) {
  var min = range[0],
      max = range[1];
  return domain.every(function (v, i) {
    return i === 0 ? v >= min : v <= max;
  }) && (domain[0] !== current[0] || domain[1] !== current[1]);
}
/**
 * Zoom by giving x domain range.
 * - **NOTE:**
 *  - For `wheel` type zoom, the minimum zoom range will be set as the given domain range. To get the initial state, [.unzoom()](#unzoom) should be called.
 *  - To be used [zoom.enabled](Options.html#.zoom) option should be set as `truthy`.
 * @function zoom
 * @instance
 * @memberof Chart
 * @param {Array} domainValue If domain range is given, the chart will be zoomed to the given domain. If no argument is given, the current zoomed domain will be returned.
 * @returns {Array} domain value in array
 * @example
 *  // Zoom to specified domain range
 *  chart.zoom([10, 20]);
 *
 *  // Get the current zoomed domain range
 *  chart.zoom();
 */


var zoom = function (domainValue) {
  var $$ = this.internal,
      $el = $$.$el,
      config = $$.config,
      org = $$.org,
      scale = $$.scale,
      isRotated = config.axis_rotated,
      isCategorized = $$.axis.isCategorized(),
      domain = domainValue;
  if (!(config.zoom_enabled && domain)) domain = scale.zoom ? scale.zoom.domain() : scale.x.orgDomain();else if ($$.axis.isTimeSeries() && (domain = domain.map(function (x) {
    return parseDate.bind($$)(x);
  })), withinRange(domain, $$.getZoomDomain(!0), $$.getZoomDomain())) {
    if (isCategorized && (domain = domain.map(function (v, i) {
      return +v + (i === 0 ? 0 : 1);
    })), $$.api.tooltip.hide(), config.subchart_show) {
      var x = scale.zoom || scale.x;
      $$.brush.getSelection().call($$.brush.move, [x(domain[0]), x(domain[1])]);
    } else {
      var _d3ZoomIdentity$scale,
          _x = isCategorized ? scale.x.orgScale() : org.xScale || scale.x,
          translate = [-_x(domain[0]), 0],
          transform = (_d3ZoomIdentity$scale = external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity.scale(_x.range()[1] / (_x(domain[1]) - _x(domain[0])))).translate.apply(_d3ZoomIdentity$scale, isRotated ? translate.reverse() : translate);

      $$.$T($el.eventRect).call($$.zoom.transform, transform);
    }

    $$.setZoomResetButton(), callFn(config.zoom_onzoom, $$.api, domain);
  }
  return domain;
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
  enable: function enable(enabled) {
    var $$ = this.internal,
        config = $$.config;
    /^(drag|wheel)$/.test(enabled) && (config.zoom_type = enabled), config.zoom_enabled = !!enabled, $$.zoom ? enabled === !1 && $$.bindZoomEvent(!1) : ($$.initZoom(), $$.bindZoomEvent()), $$.updateAndRedraw();
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
  max: function max(_max) {
    var $$ = this.internal,
        config = $$.config,
        xDomain = $$.org.xDomain;
    return (_max === 0 || _max) && (config.zoom_x_max = getMinMax("max", [xDomain[1], _max])), config.zoom_x_max;
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
  min: function min(_min) {
    var $$ = this.internal,
        config = $$.config,
        xDomain = $$.org.xDomain;
    return (_min === 0 || _min) && (config.zoom_x_min = getMinMax("min", [xDomain[0], _min])), config.zoom_x_min;
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
  range: function range(_range) {
    var zoom = this.zoom;

    if (isObject(_range)) {
      var min = _range.min,
          max = _range.max;
      isDefined(min) && zoom.min(min), isDefined(max) && zoom.max(max);
    }

    return {
      min: zoom.min(),
      max: zoom.max()
    };
  }
});
/* harmony default export */ var api_zoom = ({
  zoom: zoom,

  /**
   * Unzoom zoomed area
   * @function unzoom
   * @instance
   * @memberof Chart
   * @example
   *  chart.unzoom();
   */
  unzoom: function unzoom() {
    var _zoomResetBtn,
        $$ = this.internal,
        config = $$.config,
        _$$$$el = $$.$el,
        eventRect = _$$$$el.eventRect,
        zoomResetBtn = _$$$$el.zoomResetBtn;

    $$.scale.zoom && (config.subchart_show ? $$.brush.getSelection().call($$.brush.move, null) : $$.zoom.updateTransformScale(external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity), $$.updateZoom(!0), (_zoomResetBtn = zoomResetBtn) != null && _zoomResetBtn.style("display", "none"), (0,external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomTransform)(eventRect.node()) !== external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity && $$.zoom.transform($$.$T(eventRect), external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoomIdentity));
  }
});
// EXTERNAL MODULE: external {"commonjs":"d3-color","commonjs2":"d3-color","amd":"d3-color","root":"d3"}
var external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_ = __webpack_require__(13);
;// CONCATENATED MODULE: ./src/ChartInternal/interactions/drag.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



/**
 * Module used for data.selection.draggable option
 */

/* harmony default export */ var drag = ({
  /**
   * Called when dragging.
   * Data points can be selected.
   * @private
   * @param {object} mouse Object
   */
  drag: function drag(mouse) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        main = $$.$el.main,
        isSelectionGrouped = config.data_selection_grouped,
        isSelectable = config.interaction_enabled && config.data_selection_isselectable;

    if (!$$.hasArcType() && config.data_selection_enabled && (!config.zoom_enabled || $$.zoom.altDomain) && config.data_selection_multiple // skip when single selection because drag is used for multiple selection
    ) {
      var _ref = state.dragStart || [0, 0],
          sx = _ref[0],
          sy = _ref[1],
          mx = mouse[0],
          my = mouse[1],
          minX = Math.min(sx, mx),
          maxX = Math.max(sx, mx),
          minY = isSelectionGrouped ? state.margin.top : Math.min(sy, my),
          maxY = isSelectionGrouped ? state.height : Math.max(sy, my);

      main.select("." + config_classes.dragarea).attr("x", minX).attr("y", minY).attr("width", maxX - minX).attr("height", maxY - minY), main.selectAll("." + config_classes.shapes).selectAll("." + config_classes.shape).filter(function (d) {
        return isSelectable && isSelectable.bind($$.api)(d);
      }).each(function (d, i) {
        var toggle,
            shape = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this),
            isSelected = shape.classed(config_classes.SELECTED),
            isIncluded = shape.classed(config_classes.INCLUDED),
            isWithin = !1;

        if (shape.classed(config_classes.circle)) {
          var x = +shape.attr("cx") * 1,
              y = +shape.attr("cy") * 1;
          toggle = $$.togglePoint, isWithin = minX < x && x < maxX && minY < y && y < maxY;
        } else if (shape.classed(config_classes.bar)) {
          var _getPathBox = getPathBox(this),
              _x = _getPathBox.x,
              y = _getPathBox.y,
              width = _getPathBox.width,
              height = _getPathBox.height;

          toggle = $$.togglePath, isWithin = !(maxX < _x || _x + width < minX) && !(maxY < y || y + height < minY);
        } else // line/area selection not supported yet
          return; // @ts-ignore


        isWithin ^ isIncluded && (shape.classed(config_classes.INCLUDED, !isIncluded), shape.classed(config_classes.SELECTED, !isSelected), toggle.call($$, !isSelected, shape, d, i));
      });
    }
  },

  /**
   * Called when the drag starts.
   * Adds and Shows the drag area.
   * @private
   * @param {object} mouse Object
   */
  dragstart: function dragstart(mouse) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        main = $$.$el.main;
    $$.hasArcType() || !config.data_selection_enabled || (state.dragStart = mouse, main.select("." + config_classes.chart).append("rect").attr("class", config_classes.dragarea).style("opacity", "0.1"), $$.setDragStatus(!0));
  },

  /**
   * Called when the drag finishes.
   * Removes the drag area.
   * @private
   */
  dragend: function dragend() {
    var $$ = this,
        config = $$.config,
        main = $$.$el.main;
    $$.hasArcType() || !config.data_selection_enabled || (main.select("." + config_classes.dragarea).transition().duration(100).style("opacity", "0").remove(), main.selectAll("." + config_classes.shape).classed(config_classes.INCLUDED, !1), $$.setDragStatus(!1));
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/internals/selection.ts


function selection_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function selection_objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? selection_ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : selection_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */





/* harmony default export */ var internals_selection = (selection_objectSpread(selection_objectSpread({}, drag), {}, {
  /**
   * Select a point
   * @param {object} target Target point
   * @param {object} d Data object
   * @param {number} i Index number
   * @private
   */
  selectPoint: function selectPoint(target, d, i) {
    var $$ = this,
        config = $$.config,
        main = $$.$el.main,
        isRotated = config.axis_rotated,
        cx = (isRotated ? $$.circleY : $$.circleX).bind($$),
        cy = (isRotated ? $$.circleX : $$.circleY).bind($$),
        r = $$.pointSelectR.bind($$);
    // add selected-circle on low layer g
    callFn(config.data_onselected, $$.api, d, target.node()), main.select("." + config_classes.selectedCircles + $$.getTargetSelectorSuffix(d.id)).selectAll("." + config_classes.selectedCircle + "-" + i).data([d]).enter().append("circle").attr("class", function () {
      return $$.generateClass(config_classes.selectedCircle, i);
    }).attr("cx", cx).attr("cy", cy).attr("stroke", $$.color).attr("r", function (d2) {
      return $$.pointSelectR(d2) * 1.4;
    }).transition().duration(100).attr("r", r);
  },

  /**
   * Unelect a point
   * @param {object} target Target point
   * @param {object} d Data object
   * @param {number} i Index number
   * @private
   */
  unselectPoint: function unselectPoint(target, d, i) {
    var $$ = this,
        config = $$.config,
        $el = $$.$el;
    // remove selected-circle from low layer g
    callFn(config.data_onunselected, $$.api, d, target.node()), $el.main.select("." + config_classes.selectedCircles + $$.getTargetSelectorSuffix(d.id)).selectAll("." + config_classes.selectedCircle + "-" + i).transition().duration(100).attr("r", 0).remove();
  },

  /**
   * Toggles the selection of points
   * @param {boolean} selected whether or not to select.
   * @param {object} target Target object
   * @param {object} d Data object
   * @param {number} i Index number
   * @private
   */
  togglePoint: function togglePoint(selected, target, d, i) {
    var method = (selected ? "" : "un") + "selectPoint";
    this[method](target, d, i);
  },

  /**
   * Select a path
   * @param {object} target Target path
   * @param {object} d Data object
   * @private
   */
  selectPath: function selectPath(target, d) {
    var $$ = this,
        config = $$.config;
    callFn(config.data_onselected, $$.api, d, target.node()), config.interaction_brighten && target.transition().duration(100).style("fill", function () {
      return (0,external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_.rgb)($$.color(d)).brighter(.75);
    });
  },

  /**
   * Unelect a path
   * @private
   * @param {object} target Target path
   * @param {object} d Data object
   */
  unselectPath: function unselectPath(target, d) {
    var $$ = this,
        config = $$.config;
    callFn(config.data_onunselected, $$.api, d, target.node()), config.interaction_brighten && target.transition().duration(100).style("fill", function () {
      return $$.color(d);
    });
  },

  /**
   * Toggles the selection of lines
   * @param {boolean} selected whether or not to select.
   * @param {object} target Target object
   * @param {object} d Data object
   * @param {number} i Index number
   * @private
   */
  togglePath: function togglePath(selected, target, d, i) {
    this[(selected ? "" : "un") + "selectPath"](target, d, i);
  },

  /**
   * Returns the toggle method of the target
   * @param {object} that shape
   * @param {object} d Data object
   * @returns {Function} toggle method
   * @private
   */
  getToggle: function getToggle(that, d) {
    var $$ = this;
    return that.nodeName === "path" ? $$.togglePath : $$.isStepType(d) ? function () {} : // circle is hidden in step chart, so treat as within the click area
    $$.togglePoint;
  },

  /**
   * Toggles the selection of shapes
   * @param {object} that shape
   * @param {object} d Data object
   * @param {number} i Index number
   * @private
   */
  toggleShape: function toggleShape(that, d, i) {
    var toggledShape,
        $$ = this,
        config = $$.config,
        main = $$.$el.main,
        shape = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(that),
        isSelected = shape.classed(config_classes.SELECTED),
        toggle = $$.getToggle(that, d).bind($$);

    if (config.data_selection_enabled && config.data_selection_isselectable.bind($$.api)(d)) {
      if (!config.data_selection_multiple) {
        var selector = "." + config_classes.shapes;
        config.data_selection_grouped && (selector += $$.getTargetSelectorSuffix(d.id)), main.selectAll(selector).selectAll("." + config_classes.shape).each(function (d, i) {
          var shape = (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(this);
          shape.classed(config_classes.SELECTED) && (toggledShape = shape, toggle(!1, shape.classed(config_classes.SELECTED, !1), d, i));
        });
      }

      toggledShape && toggledShape.node() === shape.node() || (shape.classed(config_classes.SELECTED, !isSelected), toggle(!isSelected, shape, d, i));
    }
  }
}));
;// CONCATENATED MODULE: ./src/ChartInternal/interactions/subchart.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/* harmony default export */ var interactions_subchart = ({
  /**
   * Initialize the brush.
   * @private
   */
  initBrush: function initBrush() {
    var lastDomain,
        timeout,
        $$ = this,
        config = $$.config,
        scale = $$.scale,
        subchart = $$.$el.subchart,
        isRotated = config.axis_rotated;
    $$.brush = (isRotated ? (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushY)() : (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushX)()).handleSize(5);

    var getBrushSize = function () {
      var brush = $$.$el.svg.select("." + config_classes.brush + " .overlay"),
          brushSize = {
        width: 0,
        height: 0
      };
      return brush.size() && (brushSize.width = +brush.attr("width"), brushSize.height = +brush.attr("height")), brushSize[isRotated ? "width" : "height"];
    }; // bind brush event


    // set the brush extent
    $$.brush.on("start brush end", function (event) {
      var selection = event.selection,
          target = event.target,
          type = event.type;
      type === "start" && $$.state.inputType === "touch" && $$.hideTooltip(), /(start|brush)/.test(type) && $$.redrawForBrush(), type === "end" && (lastDomain = scale.x.orgDomain()), (target == null ? void 0 : target.handle) && (selection === null ? $$.brush.handle.attr("display", "none") : $$.brush.handle.attr("display", null).attr("transform", function (d, i) {
        var pos = isRotated ? [33, selection[i] - (i === 0 ? 30 : 24)] : [selection[i], 3];
        return "translate(" + pos + ")";
      }));
    }), $$.brush.updateResize = function () {
      var _this = this;

      timeout && clearTimeout(timeout), timeout = setTimeout(function () {
        var selection = _this.getSelection();

        lastDomain && (0,external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_.brushSelection)(selection.node()) && _this.move(selection, lastDomain.map(scale.subX.orgScale()));
      }, 0);
    }, $$.brush.update = function () {
      var extent = this.extent()();
      return extent[1].filter(function (v) {
        return isNaN(v);
      }).length === 0 && subchart.main && subchart.main.select("." + config_classes.brush).call(this), this;
    }, $$.brush.scale = function (scale) {
      var h = config.subchart_size_height || getBrushSize(),
          extent = $$.getExtent();
      // [[x0, y0], [x1, y1]], where [x0, y0] is the top-left corner and [x1, y1] is the bottom-right corner
      // when extent updates, brush selection also be re-applied
      // https://github.com/d3/d3/issues/2918
      !extent && scale.range ? extent = [[0, 0], [scale.range()[1], h]] : isArray(extent) && (extent = extent.map(function (v, i) {
        return [v, i > 0 ? h : i];
      })), isRotated && extent[1].reverse(), this.extent(extent), this.update();
    }, $$.brush.getSelection = function () {
      return (// @ts-ignore
        subchart.main ? subchart.main.select("." + config_classes.brush) : (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)([])
      );
    };
  },

  /**
   * Initialize the subchart.
   * @private
   */
  initSubchart: function initSubchart() {
    var $$ = this,
        config = $$.config,
        _$$$state = $$.state,
        clip = _$$$state.clip,
        hasAxis = _$$$state.hasAxis,
        _$$$$el = $$.$el,
        defs = _$$$$el.defs,
        svg = _$$$$el.svg,
        subchart = _$$$$el.subchart,
        axis = _$$$$el.axis;

    if (hasAxis) {
      var visibility = config.subchart_show ? null : "hidden",
          clipId = clip.id + "-subchart",
          clipPath = $$.getClipPath(clipId);
      clip.idSubchart = clipId, $$.appendClip(defs, clipId), $$.initBrush(), subchart.main = svg.append("g").classed(config_classes.subchart, !0).attr("transform", $$.getTranslate("context"));
      var main = subchart.main;
      main.style("visibility", visibility), main.append("g").attr("clip-path", clipPath).attr("class", config_classes.chart), ["bar", "line", "bubble", "candlestick", "scatter"].forEach(function (v) {
        var type = capitalize(/^(bubble|scatter)$/.test(v) ? "circle" : v);

        if ($$.hasType(v) || $$.hasTypeOf(type)) {
          var chart = main.select("." + config_classes.chart),
              chartClassName = config_classes["chart" + type + "s"];
          chart.select("." + chartClassName).empty() && chart.append("g").attr("class", chartClassName);
        }
      });
      // Add extent rect for Brush
      var brush = main.append("g").attr("clip-path", clipPath).attr("class", config_classes.brush).call($$.brush);
      config.subchart_showHandle && $$.addBrushHandle(brush), axis.subX = main.append("g").attr("class", config_classes.axisX).attr("transform", $$.getTranslate("subX")).attr("clip-path", config.axis_rotated ? "" : clip.pathXAxis).style("visibility", config.subchart_axis_x_show ? visibility : "hidden");
    }
  },

  /**
   * Add brush handle
   * Enabled when: subchart.showHandle=true
   * @param {d3Selection} brush Brush selection
   * @private
   */
  addBrushHandle: function addBrushHandle(brush) {
    var $$ = this,
        config = $$.config,
        isRotated = config.axis_rotated,
        initRange = config.subchart_init_range,
        customHandleClass = "handle--custom",
        path = isRotated ? ["M 5.2491724,29.749209 a 6,6 0 0 0 -5.50000003,-6.5 H -5.7508276 a 6,6 0 0 0 -6.0000004,6.5 z m -5.00000003,-2 H -6.7508276 m 6.99999997,-2 H -6.7508276Z", "M 5.2491724,23.249172 a 6,-6 0 0 1 -5.50000003,6.5 H -5.7508276 a 6,-6 0 0 1 -6.0000004,-6.5 z m -5.00000003,2 H -6.7508276 m 6.99999997,2 H -6.7508276Z"] : ["M 0 18 A 6 6 0 0 0 -6.5 23.5 V 29 A 6 6 0 0 0 0 35 Z M -2 23 V 30 M -4 23 V 30Z", "M 0 18 A 6 6 0 0 1 6.5 23.5 V 29 A 6 6 0 0 1 0 35 Z M 2 23 V 30 M 4 23 V 30Z"];
    $$.brush.handle = brush.selectAll("." + customHandleClass).data(isRotated ? [{
      type: "n"
    }, {
      type: "s"
    }] : [{
      type: "w"
    }, {
      type: "e"
    }]).enter().append("path").attr("class", customHandleClass).attr("cursor", (isRotated ? "ns" : "ew") + "-resize").attr("d", function (d) {
      return path[+/[se]/.test(d.type)];
    }).attr("display", initRange ? null : "none");
  },

  /**
   * Update sub chart
   * @param {object} targets $$.data.targets
   * @private
   */
  updateTargetsForSubchart: function updateTargetsForSubchart(targets) {
    var $$ = this,
        config = $$.config,
        state = $$.state,
        main = $$.$el.subchart.main;
    config.subchart_show && (["bar", "line", "bubble", "candlestick", "scatter"].filter(function (v) {
      return $$.hasType(v) || $$.hasTypeOf(capitalize(v));
    }).forEach(function (v) {
      var isPointType = /^(bubble|scatter)$/.test(v),
          name = capitalize(isPointType ? "circle" : v),
          chartClass = $$.getChartClass(name, !0),
          shapeClass = $$.getClass(isPointType ? "circles" : v + "s", !0),
          shapeChart = main.select("." + config_classes["chart" + (name + "s")]);

      if (isPointType) {
        var circle = shapeChart.selectAll("." + config_classes.circles).data(targets.filter($$["is" + capitalize(v) + "Type"].bind($$))).attr("class", shapeClass);
        circle.exit().remove(), circle.enter().append("g").attr("class", shapeClass);
      } else {
        var shapeUpdate = shapeChart.selectAll("." + config_classes["chart" + name]).attr("class", chartClass).data(targets.filter($$["is" + name + "Type"].bind($$))),
            shapeEnter = shapeUpdate.enter().append("g").style("opacity", "0").attr("class", chartClass).append("g").attr("class", shapeClass);
        // Area
        shapeUpdate.exit().remove(), v === "line" && $$.hasTypeOf("Area") && shapeEnter.append("g").attr("class", $$.getClass("areas", !0));
      }
    }), main.selectAll("." + config_classes.brush + " rect").attr(config.axis_rotated ? "width" : "height", config.axis_rotated ? state.width2 : state.height2));
  },

  /**
   * Redraw subchart.
   * @private
   * @param {boolean} withSubchart whether or not to show subchart
   * @param {number} duration duration
   * @param {object} shape Shape's info
   */
  redrawSubchart: function redrawSubchart(withSubchart, duration, shape) {
    var $$ = this,
        config = $$.config,
        main = $$.$el.subchart.main,
        state = $$.state,
        withTransition = !!duration;

    // subchart
    if (main.style("visibility", config.subchart_show ? null : "hidden"), config.subchart_show && (state.event && state.event.type === "zoom" && $$.brush.update(), withSubchart)) // update subchart elements if needed
      {
        var _initRange = config.subchart_init_range; // extent rect

        if (brushEmpty($$) || $$.brush.update(), Object.keys(shape.type).forEach(function (v) {
          var name = capitalize(v),
              drawFn = $$["generateDraw" + name](shape.indices[v], !0);
          $$["update" + name](duration, !0), $$["redraw" + name](drawFn, withTransition, !0);
        }), $$.hasType("bubble") || $$.hasType("scatter")) {
          var cx = shape.pos.cx,
              cy = $$.updateCircleY(!0);
          $$.updateCircle(!0), $$.redrawCircle(cx, cy, withTransition, undefined, !0);
        }

        !state.rendered && _initRange && $$.brush.move($$.brush.getSelection(), _initRange.map($$.scale.x));
      }
  },

  /**
   * Redraw the brush.
   * @private
   */
  redrawForBrush: function redrawForBrush() {
    var $$ = this,
        _$$$config = $$.config,
        onBrush = _$$$config.subchart_onbrush,
        withY = _$$$config.zoom_rescale,
        scale = $$.scale;
    $$.redraw({
      withTransition: !1,
      withY: withY,
      withSubchart: !1,
      withUpdateXDomain: !0,
      withDimension: !1
    }), onBrush.bind($$.api)(scale.x.orgDomain());
  },

  /**
   * Transform context
   * @param {boolean} withTransition indicates transition is enabled
   * @param {object} transitions The return value of the generateTransitions method of Axis.
   * @private
   */
  transformContext: function transformContext(withTransition, transitions) {
    var subXAxis,
        $$ = this,
        main = $$.$el.subchart.main;
    transitions && transitions.axisSubX ? subXAxis = transitions.axisSubX : (subXAxis = main.select("." + config_classes.axisX), withTransition && (subXAxis = subXAxis.transition())), main.attr("transform", $$.getTranslate("context")), subXAxis.attr("transform", $$.getTranslate("subX"));
  },

  /**
   * Get extent value
   * @returns {Array} default extent
   * @private
   */
  getExtent: function getExtent() {
    var $$ = this,
        config = $$.config,
        scale = $$.scale,
        extent = config.axis_x_extent;
    if (extent) if (isFunction(extent)) extent = extent.bind($$.api)($$.getXDomain($$.data.targets), scale.subX);else if ($$.axis.isTimeSeries() && extent.every(isNaN)) {
      var fn = parseDate.bind($$);
      extent = extent.map(function (v) {
        return scale.subX(fn(v));
      });
    }
    return extent;
  }
});
;// CONCATENATED MODULE: ./src/ChartInternal/interactions/zoom.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */




/* harmony default export */ var interactions_zoom = ({
  /**
   * Initialize zoom.
   * @private
   */
  initZoom: function initZoom() {
    var $$ = this;
    $$.scale.zoom = null, $$.generateZoom(), $$.initZoomBehaviour();
  },

  /**
   * Bind zoom event
   * @param {boolean} bind Weather bind or unbound
   * @private
   */
  bindZoomEvent: function bindZoomEvent(bind) {
    bind === void 0 && (bind = !0);
    var $$ = this,
        config = $$.config,
        zoomEnabled = config.zoom_enabled;
    zoomEnabled && bind ? !config.subchart_show && $$.bindZoomOnEventRect() : bind === !1 && ($$.api.unzoom(), $$.unbindZoomEvent());
  },

  /**
   * Unbind zoom events
   * @private
   */
  unbindZoomEvent: function unbindZoomEvent() {
    var _zoomResetBtn,
        $$ = this,
        _$$$$el = $$.$el,
        eventRect = _$$$$el.eventRect,
        zoomResetBtn = _$$$$el.zoomResetBtn;

    eventRect.on(".zoom", null).on(".drag", null), (_zoomResetBtn = zoomResetBtn) == null ? void 0 : _zoomResetBtn.style("display", "none");
  },

  /**
   * Generate zoom
   * @private
   */
  generateZoom: function generateZoom() {
    var $$ = this,
        config = $$.config,
        org = $$.org,
        scale = $$.scale,
        zoom = (0,external_commonjs_d3_zoom_commonjs2_d3_zoom_amd_d3_zoom_root_d3_.zoom)().duration(0).on("start", $$.onZoomStart.bind($$)).on("zoom", $$.onZoom.bind($$)).on("end", $$.onZoomEnd.bind($$));
    // get zoom extent
    // @ts-ignore
    // @ts-ignore

    /**
     * Update scale according zoom transform value
     * @param {object} transform transform object
     * @private
     */
    // @ts-ignore

    /**
     * Get zoom domain
     * @returns {Array} zoom domain
     * @private
     */
    // @ts-ignore
    zoom.orgScaleExtent = function () {
      var extent = config.zoom_extent || [1, 10];
      return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];
    }, zoom.updateScaleExtent = function () {
      var ratio = diffDomain($$.scale.x.orgDomain()) / diffDomain($$.getZoomDomain()),
          extent = this.orgScaleExtent();
      return this.scaleExtent([extent[0] * ratio, extent[1] * ratio]), this;
    }, zoom.updateTransformScale = function (transform) {
      org.xScale && org.xScale.range(scale.x.range());
      // rescale from the original scale
      var newScale = transform[config.axis_rotated ? "rescaleY" : "rescaleX"](org.xScale || scale.x),
          domain = $$.trimXDomain(newScale.domain()),
          rescale = config.zoom_rescale;
      newScale.domain(domain, org.xDomain), $$.state.xTickOffset || ($$.state.xTickOffset = $$.axis.x.tickOffset()), scale.zoom = $$.getCustomizedScale(newScale), $$.axis.x.scale(scale.zoom), rescale && (!org.xScale && (org.xScale = scale.x.copy()), scale.x.domain(domain));
    }, zoom.getDomain = function () {
      var domain = scale[scale.zoom ? "zoom" : "subX"].domain(),
          isCategorized = $$.axis.isCategorized();
      return isCategorized && (domain[1] -= 2), domain;
    }, $$.zoom = zoom;
  },

  /**
   * 'start' event listener
   * @param {object} event Event object
   * @private
   */
  onZoomStart: function onZoomStart(event) {
    var $$ = this,
        sourceEvent = event.sourceEvent;
    sourceEvent && ($$.zoom.startEvent = sourceEvent, $$.state.zooming = !0, callFn($$.config.zoom_onzoomstart, $$.api, event));
  },

  /**
   * 'zoom' event listener
   * @param {object} event Event object
   * @private
   */
  onZoom: function onZoom(event) {
    var _sourceEvent,
        _sourceEvent2,
        _sourceEvent3,
        _sourceEvent4,
        $$ = this,
        config = $$.config,
        scale = $$.scale,
        org = $$.org,
        sourceEvent = event.sourceEvent;

    if (config.zoom_enabled && $$.filterTargetsToShow($$.data.targets).length !== 0 && (scale.zoom || !(((_sourceEvent = sourceEvent) == null ? void 0 : _sourceEvent.type.indexOf("touch")) > -1) || ((_sourceEvent2 = sourceEvent) == null ? void 0 : _sourceEvent2.touches.length) !== 1)) {
      var isMousemove = ((_sourceEvent3 = sourceEvent) == null ? void 0 : _sourceEvent3.type) === "mousemove",
          isZoomOut = ((_sourceEvent4 = sourceEvent) == null ? void 0 : _sourceEvent4.wheelDelta) < 0,
          transform = event.transform;
      !isMousemove && isZoomOut && scale.x.domain().every(function (v, i) {
        return v !== org.xDomain[i];
      }) && scale.x.domain(org.xDomain), $$.zoom.updateTransformScale(transform), $$.redraw({
        withTransition: !1,
        withY: config.zoom_rescale,
        withSubchart: !1,
        withEventRect: !1,
        withDimension: !1
      }), $$.state.cancelClick = isMousemove, callFn(config.zoom_onzoom, $$.api, $$.zoom.getDomain());
    }
  },

  /**
   * 'end' event listener
   * @param {object} event Event object
   * @private
   */
  onZoomEnd: function onZoomEnd(event) {
    var $$ = this,
        config = $$.config,
        startEvent = $$.zoom.startEvent,
        e = event == null ? void 0 : event.sourceEvent;
    startEvent && startEvent.type.indexOf("touch") > -1 && (startEvent = startEvent.changedTouches[0], e = e.changedTouches[0]);
    // if click, do nothing. otherwise, click interaction will be canceled.
    config.zoom_type === "drag" && e && startEvent.clientX === e.clientX && startEvent.clientY === e.clientY || ($$.redrawEventRect(), $$.updateZoom(), $$.state.zooming = !1, callFn(config.zoom_onzoomend, $$.api, $$.zoom.getDomain()));
  },

  /**
   * Update zoom
   * @param {boolean} force Force unzoom
   * @private
   */
  updateZoom: function updateZoom(force) {
    var $$ = this,
        _$$$scale = $$.scale,
        subX = _$$$scale.subX,
        x = _$$$scale.x,
        zoom = _$$$scale.zoom;

    if (zoom) {
      var zoomDomain = zoom.domain(),
          xDomain = subX.domain(),
          delta = .015,
          isfullyShown = (zoomDomain[0] <= xDomain[0] || zoomDomain[0] - delta <= xDomain[0]) && (xDomain[1] <= zoomDomain[1] || xDomain[1] <= zoomDomain[1] - delta);
      (force || isfullyShown) && ($$.axis.x.scale(subX), x.domain(subX.orgDomain()), $$.scale.zoom = null);
    }
  },

  /**
   * Attach zoom event on <rect>
   * @private
   */
  bindZoomOnEventRect: function bindZoomOnEventRect() {
    var $$ = this,
        config = $$.config,
        eventRect = $$.$el.eventRect,
        behaviour = config.zoom_type === "drag" ? $$.zoomBehaviour : $$.zoom;
    // Since Chrome 89, wheel zoom not works properly
    // Applying the workaround: https://github.com/d3/d3-zoom/issues/231#issuecomment-802305692
    $$.$el.svg.on("wheel", function () {}), eventRect.call(behaviour).on("dblclick.zoom", null);
  },

  /**
   * Initialize the drag behaviour used for zooming.
   * @private
   */
  initZoomBehaviour: function initZoomBehaviour() {
    var zoomRect,
        $$ = this,
        config = $$.config,
        state = $$.state,
        isRotated = config.axis_rotated,
        start = 0,
        end = 0,
        prop = {
      axis: isRotated ? "y" : "x",
      attr: isRotated ? "height" : "width",
      index: isRotated ? 1 : 0
    };
    $$.zoomBehaviour = (0,external_commonjs_d3_drag_commonjs2_d3_drag_amd_d3_drag_root_d3_.drag)().clickDistance(4).on("start", function (event) {
      state.event = event, $$.setDragStatus(!0), $$.unselectRect(), zoomRect || (zoomRect = $$.$el.main.append("rect").attr("clip-path", state.clip.path).attr("class", config_classes.zoomBrush).attr("width", isRotated ? state.width : 0).attr("height", isRotated ? 0 : state.height)), start = getPointer(event, this)[prop.index], end = start, zoomRect.attr(prop.axis, start).attr(prop.attr, 0), $$.onZoomStart(event);
    }).on("drag", function (event) {
      end = getPointer(event, this)[prop.index], zoomRect.attr(prop.axis, Math.min(start, end)).attr(prop.attr, Math.abs(end - start));
    }).on("end", function (event) {
      var _ref,
          scale = $$.scale.zoom || $$.scale.x;

      state.event = event, $$.setDragStatus(!1), zoomRect.attr(prop.axis, 0).attr(prop.attr, 0), start > end && (_ref = [end, start], start = _ref[0], end = _ref[1], _ref), start < 0 && (end += Math.abs(start), start = 0), start !== end && ($$.api.zoom([start, end].map(function (v) {
        return scale.invert(v);
      })), $$.onZoomEnd(event));
    });
  },
  setZoomResetButton: function setZoomResetButton() {
    var $$ = this,
        config = $$.config,
        $el = $$.$el,
        resetButton = config.zoom_resetButton;
    resetButton && config.zoom_type === "drag" && ($el.zoomResetBtn ? $el.zoomResetBtn.style("display", null) : $el.zoomResetBtn = $$.$el.chart.append("div").classed(config_classes.button, !0).append("span").on("click", function () {
      isFunction(resetButton.onclick) && resetButton.onclick.bind($$.api)(this), $$.api.unzoom();
    }).classed(config_classes.buttonZoomReset, !0).text(resetButton.text || "Reset Zoom"));
  }
});
;// CONCATENATED MODULE: ./src/config/Options/data/selection.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * data.selection config options
 */
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
  data_selection_enabled: !1,

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
  data_selection_grouped: !1,

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
  data_selection_isselectable: function data_selection_isselectable() {
    return !0;
  },

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
  data_selection_multiple: !0,

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
  data_selection_draggable: !1,

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
  data_onselected: function data_onselected() {},

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
  data_onunselected: function data_onunselected() {}
});
;// CONCATENATED MODULE: ./src/config/Options/interaction/subchart.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * x Axis config options
 */
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
  subchart_show: !1,
  subchart_showHandle: !1,
  subchart_size_height: 60,
  subchart_axis_x_show: !0,
  subchart_axis_x_tick_show: !0,
  subchart_axis_x_tick_text_show: !0,
  subchart_init_range: undefined,
  subchart_onbrush: function subchart_onbrush() {}
});
;// CONCATENATED MODULE: ./src/config/Options/interaction/zoom.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * zoom config options
 */
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
  zoom_enabled: !1,
  zoom_type: "wheel",
  zoom_extent: undefined,
  zoom_privileged: !1,
  zoom_rescale: !1,
  zoom_onzoom: undefined,
  zoom_onzoomstart: undefined,
  zoom_onzoomend: undefined,
  zoom_resetButton: !0,
  zoom_x_min: undefined,
  zoom_x_max: undefined
});
;// CONCATENATED MODULE: ./src/config/resolver/interaction.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */



 // Chart



 // ChartInternal



 // Axis based options






var _selectionModule = function selectionModule() {
  return extend(ChartInternal.prototype, internals_selection), extend(Chart.prototype, selection), Options.setOptions([data_selection]), (_selectionModule = function selectionModule() {
    return !0;
  })();
},
    subchartModule = function () {
  return extend(ChartInternal.prototype, interactions_subchart), extend(Chart.prototype, subchart), Options.setOptions([interaction_subchart]), (subchartModule = function () {
    return !0;
  })();
},
    zoomModule = function () {
  return extend(ChartInternal.prototype, interactions_zoom), extend(Chart.prototype, api_zoom), Options.setOptions([interaction_zoom]), (zoomModule = function () {
    return !0;
  })();
};
;// CONCATENATED MODULE: ./src/core.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */

 // eslint-disable-next-line no-use-before-define


var _defaults = {},
    bb = {
  /**
   * Version information
   * @property {string} version version
   * @example
   *    bb.version;  // "1.0.0"
   * @memberof bb
   */
  version: "3.1.3",

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
  generate: function generate(config) {
    var options = mergeObj({}, _defaults, config),
        inst = new Chart(options);
    return inst.internal.charts = this.instance, this.instance.push(inst), inst;
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
  defaults: function defaults(options) {
    return isObject(options) && (_defaults = options), _defaults;
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
/**
 * @namespace bb
 * @version 3.1.3
 */
;// CONCATENATED MODULE: ./src/index.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */

 // extends shape modules

Object.keys(resolver_shape_namespaceObject).forEach(function (v) {
  return resolver_shape_namespaceObject[v]();
}), Object.keys(resolver_interaction_namespaceObject).forEach(function (v) {
  return resolver_interaction_namespaceObject[v]();
});

}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});