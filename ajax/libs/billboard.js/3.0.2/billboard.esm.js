/*!
* Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 3.0.2
*/
import { timeParse, utcParse, timeFormat, utcFormat } from 'd3-time-format';
import { pointer, select, namespaces, selectAll } from 'd3-selection';
import { brushSelection, brushY, brushX } from 'd3-brush';
import { csvParseRows, csvParse, tsvParseRows, tsvParse } from 'd3-dsv';
import { drag as drag$1 } from 'd3-drag';
import { scaleOrdinal, scaleLinear, scaleSymlog, scaleLog, scaleTime } from 'd3-scale';
import { transition } from 'd3-transition';
import { curveBasis, curveBasisClosed, curveBasisOpen, curveBundle, curveCardinal, curveCardinalClosed, curveCardinalOpen, curveCatmullRom, curveCatmullRomClosed, curveCatmullRomOpen, curveMonotoneX, curveMonotoneY, curveNatural, curveLinearClosed, curveLinear, curveStep, curveStepAfter, curveStepBefore, pie as pie$1, arc, area as area$1, line as line$1 } from 'd3-shape';
import { axisLeft, axisBottom, axisTop, axisRight } from 'd3-axis';
import { easeLinear } from 'd3-ease';
import { interpolate } from 'd3-interpolate';
import { zoomIdentity, zoomTransform, zoom as zoom$2 } from 'd3-zoom';
import { rgb } from 'd3-color';

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * CSS class names definition
 * @private
 */
var CLASS = {
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
};

/**
 * Elements class.
 * @class Elements
 * @ignore
 * @private
 */
var Element = /** @class */ (function () {
    function Element() {
        var element = {
            chart: null,
            main: null,
            svg: null,
            axis: {
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
                bar: null,
                line: null,
                area: null // $$.contextArea
            },
            arcs: null,
            bar: null,
            candlestick: null,
            line: null,
            area: null,
            circle: null,
            radar: null,
            text: null,
            grid: {
                main: null,
                x: null,
                y: null
            },
            gridLines: {
                main: null,
                x: null,
                y: null
            },
            region: {
                main: null,
                list: null // mainRegion
            },
            eventRect: null
        };
        return element;
    }
    return Element;
}());

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
var State = /** @class */ (function () {
    function State() {
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
            hasAxis: false,
            hasRadar: false,
            current: {
                width: 0,
                height: 0,
                dataMax: 0,
                maxTickWidths: {
                    x: { size: 0, ticks: [], clipPath: 0, domain: "" },
                    y: { size: 0, domain: "" },
                    y2: { size: 0, domain: "" }
                },
                // current used chart type list
                types: []
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
                rect: {},
                data: [],
                coords: [] // coordination value of previous eventRect
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
                path: "",
                pathXAxis: "",
                pathYAxis: "",
                pathXAxisTickTexts: "",
                pathGrid: ""
            },
            // status
            event: null,
            dragStart: null,
            dragging: false,
            flowing: false,
            cancelClick: false,
            mouseover: false,
            rendered: false,
            transiting: false,
            redrawing: false,
            resizing: false,
            toggling: false,
            zooming: false,
            hasNegativeValue: false,
            hasPositiveValue: true,
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
    }
    return State;
}());

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
var Store = /** @class */ (function () {
    function Store() {
        var _this = this;
        Object.keys(classes).forEach(function (v) {
            _this[v] = new classes[v]();
        });
    }
    Store.prototype.getStore = function (name) {
        return this[name];
    };
    return Store;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var _assign = function __assign() {
  return _assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) for (var p in s = arguments[i], s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);

    return t;
  }, _assign.apply(this, arguments);
};
function __spreadArray(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

  return to;
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * main config options
 */
var main = {
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
    resize_auto: true,
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
};

/**
 * data config options
 */
var data$2 = {
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
    data_idConverter: function (id) { return id; },
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
    data_onclick: function () { },
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
    data_onover: function () { },
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
    data_onout: function () { },
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
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * color config options
 */
var color$1 = {
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
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * interaction config options
 */
var interaction$1 = {
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
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * legend config options
 */
var legend$2 = {
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
    legend_show: true,
    legend_hide: false,
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
    legend_equally: false,
    legend_padding: 0,
    legend_item_tile_width: 10,
    legend_item_tile_height: 10,
    legend_usePoint: false
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * title config options
 */
var title$1 = {
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
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * tooltip config options
 */
var tooltip$2 = {
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
    tooltip_show: true,
    tooltip_doNotHide: false,
    tooltip_grouped: true,
    tooltip_format_title: undefined,
    tooltip_format_name: undefined,
    tooltip_format_value: undefined,
    tooltip_position: undefined,
    tooltip_contents: {},
    tooltip_init_show: false,
    tooltip_init_x: 0,
    tooltip_init_position: {
        top: "0px",
        left: "50px"
    },
    tooltip_linked: false,
    tooltip_linked_name: "",
    tooltip_onshow: function () { },
    tooltip_onhide: function () { },
    tooltip_onshown: function () { },
    tooltip_onhidden: function () { },
    tooltip_order: null
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var win = (function () {
    var root = (typeof globalThis === "object" && globalThis !== null && globalThis.Object === Object && globalThis) ||
        (typeof global === "object" && global !== null && global.Object === Object && global) ||
        (typeof self === "object" && self !== null && self.Object === Object && self);
    return root || Function("return this")();
})();
/* eslint-enable no-new-func, no-undef */
var doc = win && win.document;

var isValue = function (v) { return v || v === 0; };
var isFunction = function (v) { return typeof v === "function"; };
var isString = function (v) { return typeof v === "string"; };
var isNumber = function (v) { return typeof v === "number"; };
var isUndefined = function (v) { return typeof v === "undefined"; };
var isDefined = function (v) { return typeof v !== "undefined"; };
var isboolean = function (v) { return typeof v === "boolean"; };
var ceil10 = function (v) { return Math.ceil(v / 10) * 10; };
var asHalfPixel = function (n) { return Math.ceil(n) + 0.5; };
var diffDomain = function (d) { return d[1] - d[0]; };
var isObjectType = function (v) { return typeof v === "object"; };
var isEmpty = function (o) { return (isUndefined(o) || o === null ||
    (isString(o) && o.length === 0) ||
    (isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0) ||
    (isNumber(o) && isNaN(o))); };
var notEmpty = function (o) { return !isEmpty(o); };
/**
 * Check if is array
 * @param {Array} arr Data to be checked
 * @returns {boolean}
 * @private
 */
var isArray = function (arr) { return Array.isArray(arr); };
/**
 * Check if is object
 * @param {object} obj Data to be checked
 * @returns {boolean}
 * @private
 */
var isObject = function (obj) { return obj && !obj.nodeType && isObjectType(obj) && !isArray(obj); };
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
    var found = false;
    Object.keys(dict).forEach(function (key) { return (dict[key] === value) && (found = true); });
    return found;
}
/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} args Arguments
 * @returns {boolean} true: fn is function, false: fn is not function
 * @private
 */
function callFn(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var isFn = isFunction(fn);
    isFn && fn.call.apply(fn, args);
    return isFn;
}
/**
 * Call function after all transitions ends
 * @param {d3.transition} transition Transition
 * @param {Fucntion} cb Callback function
 * @private
 */
function endall(transition, cb) {
    var n = 0;
    transition
        .each(function () { return ++n; })
        .on("end", function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        !--n && cb.apply.apply(cb, __spreadArray([this], args));
    });
}
/**
 * Replace tag sign to html entity
 * @param {string} str Target string value
 * @returns {string}
 * @private
 */
function sanitise(str) {
    return isString(str) ?
        str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
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
    if (dy === void 0) { dy = [-1, 1]; }
    if (toMiddle === void 0) { toMiddle = false; }
    if (!node || !isString(text)) {
        return;
    }
    if (text.indexOf("\n") === -1) {
        node.text(text);
    }
    else {
        var diff = [node.text(), text].map(function (v) { return v.replace(/[\s\n]/g, ""); });
        if (diff[0] !== diff[1]) {
            var multiline = text.split("\n");
            var len_1 = toMiddle ? multiline.length - 1 : 1;
            // reset possible text
            node.html("");
            multiline.forEach(function (v, i) {
                node.append("tspan")
                    .attr("x", 0)
                    .attr("dy", (i === 0 ? dy[0] * len_1 : dy[1]) + "em")
                    .text(v);
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
    var _a = path.getBBox(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    return [
        { x: x, y: y + height },
        { x: x, y: y },
        { x: x + width, y: y },
        { x: x + width, y: y + height } // seg3
    ];
}
/**
 * Get svg bounding path box dimension
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {object}
 * @private
 */
function getPathBox(path) {
    var _a = path.getBoundingClientRect(), width = _a.width, height = _a.height;
    var items = getRectSegList(path);
    var x = items[0].x;
    var y = Math.min(items[0].y, items[1].y);
    return {
        x: x, y: y, width: width, height: height
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
    var touches = event && (event.touches || (event.sourceEvent && event.sourceEvent.touches));
    var pointer$1 = event ?
        pointer(touches ? touches[0] : event, element) :
        [0, 0];
    return pointer$1;
}
/**
 * Return brush selection array
 * @param {object} ctx Current instance
 * @returns {d3.brushSelection}
 * @private
 */
function getBrushSelection(ctx) {
    var event = ctx.event, $el = ctx.$el;
    var main = $el.subchart.main || $el.main;
    var selection;
    // check from event
    if (event && event.type === "brush") {
        selection = event.selection;
        // check from brush area selection
    }
    else if (main && (selection = main.select("." + CLASS.brush).node())) {
        selection = brushSelection(selection);
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
    var needEvaluate = !("rect" in node) || ("rect" in node && node.hasAttribute("width") && node.rect.width !== +node.getAttribute("width"));
    return needEvaluate ?
        (node.rect = node.getBoundingClientRect()) : node.rect;
}
/**
 * Retrun random number
 * @param {boolean} asStr Convert returned value as string
 * @returns {number|string}
 * @private
 */
function getRandom(asStr) {
    if (asStr === void 0) { asStr = true; }
    var rand = Math.random();
    return asStr ? String(rand) : rand;
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
    var _a = arr[mid], x = _a.x, _b = _a.w, w = _b === void 0 ? 0 : _b;
    if (isRotated) {
        x = arr[mid].y;
        w = arr[mid].h;
    }
    if (v >= x && v <= x + w) {
        return mid;
    }
    return v < x ?
        findIndex(arr, v, start, mid - 1, isRotated) :
        findIndex(arr, v, mid + 1, end, isRotated);
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
    return true;
}
/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */
function deepClone() {
    var objectN = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objectN[_i] = arguments[_i];
    }
    var clone = function (v) {
        if (isObject(v) && v.constructor) {
            var r = new v.constructor();
            for (var k in v) {
                r[k] = clone(v[k]);
            }
            return r;
        }
        return v;
    };
    return objectN.map(function (v) { return clone(v); })
        .reduce(function (a, c) { return (_assign(_assign({}, a), c)); });
}
/**
 * Extend target from source object
 * @param {object} target Target object
 * @param {object|Array} source Source object
 * @returns {object}
 * @private
 */
function extend(target, source) {
    if (target === void 0) { target = {}; }
    if (isArray(source)) {
        source.forEach(function (v) { return extend(target, v); });
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
var capitalize = function (str) { return str.charAt(0).toUpperCase() + str.slice(1); };
/**
 * Convert to array
 * @param {object} v Target to be converted
 * @returns {Array}
 * @private
 */
var toArray = function (v) { return [].slice.call(v); };
/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
function getCssRules(styleSheets) {
    var rules = [];
    styleSheets.forEach(function (sheet) {
        try {
            if (sheet.cssRules && sheet.cssRules.length) {
                rules = rules.concat(toArray(sheet.cssRules));
            }
        }
        catch (e) {
            console.error("Error while reading rules from " + sheet.href + ": " + e.toString());
        }
    });
    return rules;
}
/**
 * Gets the SVGMatrix of an SVGGElement
 * @param {SVGElement} node Node element
 * @returns {SVGMatrix} matrix
 * @private
 */
var getTranslation = function (node) {
    var transform = node ? node.transform : null;
    var baseVal = transform && transform.baseVal;
    return baseVal && baseVal.numberOfItems ?
        baseVal.getItem(0).matrix :
        { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };
};
/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */
function getUnique(data) {
    var isDate = data[0] instanceof Date;
    var d = (isDate ? data.map(Number) : data)
        .filter(function (v, i, self) { return self.indexOf(v) === i; });
    return isDate ? d.map(function (v) { return new Date(v); }) : d;
}
/**
 * Merge array
 * @param {Array} arr Source array
 * @returns {Array}
 * @private
 */
function mergeArray(arr) {
    return arr && arr.length ? arr.reduce(function (p, c) { return p.concat(c); }) : [];
}
/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */
function mergeObj(target) {
    var objectN = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objectN[_i - 1] = arguments[_i];
    }
    if (!objectN.length || (objectN.length === 1 && !objectN[0])) {
        return target;
    }
    var source = objectN.shift();
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(function (key) {
            var value = source[key];
            if (isObject(value)) {
                !target[key] && (target[key] = {});
                target[key] = mergeObj(target[key], value);
            }
            else {
                target[key] = isArray(value) ?
                    value.concat() : value;
            }
        });
    }
    return mergeObj.apply(void 0, __spreadArray([target], objectN));
}
/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {boolean} isAsc true: asc, false: desc
 * @returns {number|string|Date} sorted date
 * @private
 */
function sortValue(data, isAsc) {
    if (isAsc === void 0) { isAsc = true; }
    var fn;
    if (data[0] instanceof Date) {
        fn = isAsc ? function (a, b) { return a - b; } : function (a, b) { return b - a; };
    }
    else {
        if (isAsc && !data.every(isNaN)) {
            fn = function (a, b) { return a - b; };
        }
        else if (!isAsc) {
            fn = function (a, b) { return (a > b && -1) || (a < b && 1) || (a === b && 0); };
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
function getMinMax$1(type, data) {
    var res = data.filter(function (v) { return notEmpty(v); });
    if (res.length) {
        if (isNumber(res[0])) {
            res = Math[type].apply(Math, res);
        }
        else if (res[0] instanceof Date) {
            res = sortValue(res, type === "min")[0];
        }
    }
    else {
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
    if (step === void 0) { step = 1; }
    var res = [];
    var n = Math.max(0, Math.ceil((end - start) / step)) | 0;
    for (var i = start; i < n; i++) {
        res.push(start + i * step);
    }
    return res;
};
// emulate event
var emulateEvent = {
    mouse: (function () {
        var getParams = function () { return ({
            bubbles: false, cancelable: false, screenX: 0, screenY: 0, clientX: 0, clientY: 0
        }); };
        try {
            // eslint-disable-next-line no-new
            new MouseEvent("t");
            return function (el, eventType, params) {
                if (params === void 0) { params = getParams(); }
                el.dispatchEvent(new MouseEvent(eventType, params));
            };
        }
        catch (e) {
            // Polyfills DOM4 MouseEvent
            return function (el, eventType, params) {
                if (params === void 0) { params = getParams(); }
                var mouseEvent = doc.createEvent("MouseEvent");
                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
                mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0, // the event's mouse click count
                params.screenX, params.screenY, params.clientX, params.clientY, false, false, false, false, 0, null);
                el.dispatchEvent(mouseEvent);
            };
        }
    })(),
    touch: function (el, eventType, params) {
        var touchObj = new Touch(mergeObj({
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
    }
    else if (isString(date)) {
        var _a = this, config = _a.config, format = _a.format;
        parsedDate = format.dataTime(config.data_xFormat)(date);
    }
    else if (isNumber(date) && !isNaN(date)) {
        parsedDate = new Date(+date);
    }
    if (!parsedDate || isNaN(+parsedDate)) {
        console && console.error &&
            console.error("Failed to parse x '" + date + "' to Date object");
    }
    return parsedDate;
}
/**
 * Return if the current doc is visible or not
 * @returns {boolean}
 * @private
 */
function isTabVisible() {
    return !doc.hidden;
}
/**
 * Get the current input type
 * @param {boolean} mouse Config value: interaction.inputType.mouse
 * @param {boolean} touch Config value: interaction.inputType.touch
 * @returns {string} "mouse" | "touch" | null
 * @private
 */
function convertInputType(mouse, touch) {
    var isMobile = false;
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop
    if (/Mobi/.test(win.navigator.userAgent) && touch) {
        // Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
        var hasTouchPoints = win.navigator && "maxTouchPoints" in win.navigator && win.navigator.maxTouchPoints > 0;
        // Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
        // On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true
        var hasTouch = ("ontouchmove" in win || (win.DocumentTouch && doc instanceof win.DocumentTouch));
        isMobile = hasTouchPoints || hasTouch;
    }
    var hasMouse = mouse && !isMobile ? ("onmouseover" in win) : false;
    return (hasMouse && "mouse") || (isMobile && "touch") || null;
}

/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bb.generate} to use these options on generating the chart
 */
var Options = /** @class */ (function () {
    function Options() {
        return deepClone(main, data$2, color$1, interaction$1, legend$2, title$1, tooltip$2, Options.data);
    }
    Options.setOptions = function (options) {
        this.data = options
            .reduce(function (a, c) { return (_assign(_assign({}, a), c)); }, this.data);
    };
    Options.data = {};
    return Options;
}());

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
var Cache = /** @class */ (function () {
    function Cache() {
        this.cache = {};
    }
    /**
     * Add cache
     * @param {string} key Cache key
     * @param {*} value Value to be stored
     * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
     * @returns {*} Added data value
     * @private
     */
    Cache.prototype.add = function (key, value, isDataType) {
        if (isDataType === void 0) { isDataType = false; }
        this.cache[key] = isDataType ? this.cloneTarget(value) : value;
        return this.cache[key];
    };
    /**
     * Remove cache
     * @param {string|Array} key Cache key
     * @private
     */
    Cache.prototype.remove = function (key) {
        var _this = this;
        toArray(key).forEach(function (v) { return delete _this.cache[v]; });
    };
    /**
     * Get cahce
     * @param {string|Array} key Cache key
     * @param {boolean} isDataType Weather the cache is data typed '{id:'data', id_org: 'data', values: [{x:0, index:0,...}, ...]}'
     * @returns {*}
     * @private
     */
    Cache.prototype.get = function (key, isDataType) {
        if (isDataType === void 0) { isDataType = false; }
        if (isDataType) {
            var targets = [];
            for (var i = 0, id = void 0; (id = key[i]); i++) {
                if (id in this.cache) {
                    targets.push(this.cloneTarget(this.cache[id]));
                }
            }
            return targets;
        }
        else {
            var value = this.cache[key];
            return isValue(value) ? value : null;
        }
    };
    /**
     * Reset cached data
     * @param {boolean} all true: reset all data, false: reset only '$' prefixed key data
     * @private
     */
    Cache.prototype.reset = function (all) {
        var $$ = this;
        for (var x in $$.cache) {
            // reset the prefixed '$' key(which is internal use data) only.
            if (all || /^\$/.test(x)) {
                $$.cache[x] = null;
            }
        }
    };
    /**
     * Clone data target object
     * @param {object} target Data object
     * @returns {object}
     * @private
     */
    // eslint-disable-next-line camelcase
    Cache.prototype.cloneTarget = function (target) {
        return {
            id: target.id,
            id_org: target.id_org,
            values: target.values.map(function (d) { return ({ x: d.x, value: d.value, id: d.id }); })
        };
    };
    return Cache;
}());

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var setTimeout$1 = win.setTimeout, clearTimeout$1 = win.clearTimeout;
/**
 * Generate resize queue function
 * @returns {Fucntion}
 * @private
 */
function generateResize() {
    var fn = [];
    var timeout;
    var callResizeFn = function () {
        // Delay all resize functions call, to prevent unintended excessive call from resize event
        callResizeFn.clear();
        timeout = setTimeout$1(function () {
            fn.forEach(function (f) { return f(); });
        }, 200);
    };
    callResizeFn.clear = function () {
        if (timeout) {
            clearTimeout$1(timeout);
            timeout = null;
        }
    };
    callResizeFn.add = function (f) { return fn.push(f); };
    callResizeFn.remove = function (f) { return fn.splice(fn.indexOf(f), 1); };
    return callResizeFn;
}
/**
 * Generate transition queue function
 * @returns {Function}
 * @private
 */
function generateWait() {
    var transitionsToWait = [];
    var f = function (t, callback) {
        var timer;
        // eslint-disable-next-line
        function loop() {
            var done = 0;
            for (var i = 0, t_1; (t_1 = transitionsToWait[i]); i++) {
                if (t_1 === true || (t_1.empty && t_1.empty())) {
                    done++;
                    continue;
                }
                try {
                    t_1.transition();
                }
                catch (e) {
                    done++;
                }
            }
            timer && clearTimeout$1(timer);
            if (done === transitionsToWait.length) {
                callback && callback();
            }
            else {
                timer = setTimeout$1(loop, 50);
            }
        }
        loop();
    };
    f.add = function (t) {
        isArray(t) ?
            (transitionsToWait = transitionsToWait.concat(t)) :
            transitionsToWait.push(t);
    };
    return f;
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Data convert
 * @memberof ChartInternal
 * @private
 */
var dataConvert = {
    /**
     * Convert data according its type
     * @param {object} args data object
     * @param {Function} [callback] callback for url(XHR) type loading
     * @returns {object}
     * @private
     */
    convertData: function (args, callback) {
        var data;
        if (args.bindto) {
            data = {};
            ["url", "mimeType", "headers", "keys", "json", "keys", "rows", "columns"]
                .forEach(function (v) {
                var key = "data_" + v;
                if (key in args) {
                    data[v] = args[key];
                }
            });
        }
        else {
            data = args;
        }
        if (data.url && callback) {
            this.convertUrlToData(data.url, data.mimeType, data.headers, data.keys, callback);
        }
        else if (data.json) {
            data = this.convertJsonToData(data.json, data.keys);
        }
        else if (data.rows) {
            data = this.convertRowsToData(data.rows);
        }
        else if (data.columns) {
            data = this.convertColumnsToData(data.columns);
        }
        else if (args.bindto) {
            throw Error("url or json or rows or columns is required.");
        }
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
    convertUrlToData: function (url, mimeType, headers, keys, done) {
        var _this = this;
        if (mimeType === void 0) { mimeType = "csv"; }
        var req = new XMLHttpRequest();
        req.open("GET", url);
        if (headers) {
            Object.keys(headers).forEach(function (key) {
                req.setRequestHeader(key, headers[key]);
            });
        }
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    var response = req.responseText;
                    response && done.call(_this, _this["convert" + capitalize(mimeType) + "ToData"](mimeType === "json" ? JSON.parse(response) : response, keys));
                }
                else {
                    throw new Error(url + ": Something went wrong loading!");
                }
            }
        };
        req.send();
    },
    /**
     * Convert CSV/TSV data
     * @param {object} parser Parser object
     * @param {object} xsv Data
     * @private
     * @returns {object}
     */
    convertCsvTsvToData: function (parser, xsv) {
        var rows = parser.rows(xsv);
        var d;
        if (rows.length === 1) {
            d = [{}];
            rows[0].forEach(function (id) {
                d[0][id] = null;
            });
        }
        else {
            d = parser.parse(xsv);
        }
        return d;
    },
    convertCsvToData: function (xsv) {
        return this.convertCsvTsvToData({
            rows: csvParseRows,
            parse: csvParse
        }, xsv);
    },
    convertTsvToData: function (tsv) {
        return this.convertCsvTsvToData({
            rows: tsvParseRows,
            parse: tsvParse
        }, tsv);
    },
    convertJsonToData: function (json, keysParam) {
        var _this = this;
        var config = this.config;
        var newRows = [];
        var targetKeys;
        var data;
        if (isArray(json)) {
            var keys = keysParam || config.data_keys;
            if (keys.x) {
                targetKeys = keys.value.concat(keys.x);
                config.data_x = keys.x;
            }
            else {
                targetKeys = keys.value;
            }
            newRows.push(targetKeys);
            json.forEach(function (o) {
                var newRow = targetKeys.map(function (key) {
                    // convert undefined to null because undefined data will be removed in convertDataToTargets()
                    var v = _this.findValueInJson(o, key);
                    if (isUndefined(v)) {
                        v = null;
                    }
                    return v;
                });
                newRows.push(newRow);
            });
            data = this.convertRowsToData(newRows);
        }
        else {
            Object.keys(json).forEach(function (key) {
                var tmp = json[key].concat();
                tmp.unshift(key);
                newRows.push(tmp);
            });
            data = this.convertColumnsToData(newRows);
        }
        return data;
    },
    findValueInJson: function (object, path) {
        if (object[path] !== undefined) {
            return object[path];
        }
        var convertedPath = path.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties (replace [] with .)
        var pathArray = convertedPath.replace(/^\./, "").split("."); // strip a leading dot
        var target = object;
        pathArray.some(function (k) { return !(target = target && k in target ?
            target[k] : undefined); });
        return target;
    },
    convertRowsToData: function (rows) {
        var keys = rows[0];
        var newRows = [];
        rows.forEach(function (row, i) {
            if (i > 0) {
                var newRow_1 = {};
                row.forEach(function (v, j) {
                    if (isUndefined(v)) {
                        throw new Error("Source data is missing a component at (" + i + ", " + j + ")!");
                    }
                    newRow_1[keys[j]] = v;
                });
                newRows.push(newRow_1);
            }
        });
        return newRows;
    },
    convertColumnsToData: function (columns) {
        var newRows = [];
        columns.forEach(function (col, i) {
            var key = col[0];
            col.forEach(function (v, j) {
                if (j > 0) {
                    if (isUndefined(newRows[j - 1])) {
                        newRows[j - 1] = {};
                    }
                    if (isUndefined(v)) {
                        throw new Error("Source data is missing a component at (" + i + ", " + j + ")!");
                    }
                    newRows[j - 1][key] = v;
                }
            });
        });
        return newRows;
    },
    convertDataToTargets: function (data, appendXs) {
        var _this = this;
        var $$ = this;
        var axis = $$.axis, config = $$.config, state = $$.state;
        var isCategorized = false;
        var isTimeSeries = false;
        var isCustomX = false;
        if (axis) {
            isCategorized = axis.isCategorized();
            isTimeSeries = axis.isTimeSeries();
            isCustomX = axis.isCustomX();
        }
        var dataKeys = Object.keys(data[0] || {});
        var ids = dataKeys.length ? dataKeys.filter($$.isNotX, $$) : [];
        var xs = dataKeys.length ? dataKeys.filter($$.isX, $$) : [];
        var xsData;
        // save x for update data by load when custom x and bb.x API
        ids.forEach(function (id) {
            var xKey = _this.getXKey(id);
            if (isCustomX || isTimeSeries) {
                // if included in input data
                if (xs.indexOf(xKey) >= 0) {
                    xsData = ((appendXs && $$.data.xs[id]) || [])
                        .concat(data.map(function (d) { return d[xKey]; })
                        .filter(isValue)
                        .map(function (rawX, i) { return $$.generateTargetX(rawX, id, i); }));
                }
                else if (config.data_x) {
                    // if not included in input data, find from preloaded data of other id's x
                    xsData = _this.getOtherTargetXs();
                }
                else if (notEmpty(config.data_xs)) {
                    // if not included in input data, find from preloaded data
                    xsData = $$.getXValuesOfXKey(xKey, $$.data.targets);
                }
                // MEMO: if no x included, use same x of current will be used
            }
            else {
                xsData = data.map(function (d, i) { return i; });
            }
            xsData && (_this.data.xs[id] = xsData);
        });
        // check x is defined
        ids.forEach(function (id) {
            if (!_this.data.xs[id]) {
                throw new Error("x is not defined for id = \"" + id + "\".");
            }
        });
        // convert to target
        var targets = ids.map(function (id, index) {
            var convertedId = config.data_idConverter.bind($$.api)(id);
            var xKey = $$.getXKey(id);
            var isCategory = isCustomX && isCategorized;
            var hasCategory = isCategory && data.map(function (v) { return v.x; })
                .every(function (v) { return config.axis_x_categories.indexOf(v) > -1; });
            return {
                id: convertedId,
                id_org: id,
                values: data.map(function (d, i) {
                    var rawX = d[xKey];
                    var value = d[id];
                    var x;
                    value = value !== null && !isNaN(value) && !isObject(value) ?
                        +value : (isArray(value) || isObject(value) ? value : null);
                    // use x as categories if custom x and categorized
                    if ((isCategory || state.hasRadar) && index === 0 && !isUndefined(rawX)) {
                        if (!hasCategory && index === 0 && i === 0) {
                            config.axis_x_categories = [];
                        }
                        x = config.axis_x_categories.indexOf(rawX);
                        if (x === -1) {
                            x = config.axis_x_categories.length;
                            config.axis_x_categories.push(rawX);
                        }
                    }
                    else {
                        x = $$.generateTargetX(rawX, id, i);
                    }
                    // mark as x = undefined if value is undefined and filter to remove after mapped
                    if (isUndefined(value) || $$.data.xs[id].length <= i) {
                        x = undefined;
                    }
                    return { x: x, value: value, id: convertedId };
                }).filter(function (v) { return isDefined(v.x); })
            };
        });
        // finish targets
        targets.forEach(function (t) {
            // sort values by its x
            if (config.data_xSort) {
                t.values = t.values.sort(function (v1, v2) {
                    var x1 = v1.x || v1.x === 0 ? v1.x : Infinity;
                    var x2 = v2.x || v2.x === 0 ? v2.x : Infinity;
                    return x1 - x2;
                });
            }
            // indexing each value
            t.values.forEach(function (v, i) { return (v.index = i); });
            // this needs to be sorted because its index and value.index is identical
            $$.data.xs[t.id].sort(function (v1, v2) { return v1 - v2; });
        });
        // cache information about values
        state.hasNegativeValue = $$.hasNegativeValueInTargets(targets);
        state.hasPositiveValue = $$.hasPositiveValueInTargets(targets);
        // set target types
        if (config.data_type) {
            $$.setTargetType($$.mapToIds(targets)
                .filter(function (id) { return !(id in config.data_types); }), config.data_type);
        }
        // cache as original id keyed
        targets.forEach(function (d) { return $$.cache.add(d.id_org, d, true); });
        return targets;
    }
};

var data$1 = {
    isX: function (key) {
        var $$ = this;
        var config = $$.config;
        var dataKey = config.data_x && key === config.data_x;
        var existValue = notEmpty(config.data_xs) && hasValue(config.data_xs, key);
        return dataKey || existValue;
    },
    isNotX: function (key) {
        return !this.isX(key);
    },
    isStackNormalized: function () {
        var config = this.config;
        return !!(config.data_stack_normalize && config.data_groups.length);
    },
    isGrouped: function (id) {
        var groups = this.config.data_groups;
        return id ?
            groups.some(function (v) { return v.indexOf(id) >= 0 && v.length > 1; }) :
            groups.length > 0;
    },
    getXKey: function (id) {
        var $$ = this;
        var config = $$.config;
        return config.data_x ?
            config.data_x : (notEmpty(config.data_xs) ? config.data_xs[id] : null);
    },
    getXValuesOfXKey: function (key, targets) {
        var $$ = this;
        var ids = targets && notEmpty(targets) ? $$.mapToIds(targets) : [];
        var xValues;
        ids.forEach(function (id) {
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
    getIndexByX: function (x, basedX) {
        var $$ = this;
        return basedX ?
            basedX.indexOf(isString(x) ? x : +x) :
            ($$.filterByX($$.data.targets, x)[0] || { index: null }).index;
    },
    getXValue: function (id, i) {
        var $$ = this;
        return id in $$.data.xs &&
            $$.data.xs[id] &&
            isValue($$.data.xs[id][i]) ? $$.data.xs[id][i] : i;
    },
    getOtherTargetXs: function () {
        var $$ = this;
        var idsForX = Object.keys($$.data.xs);
        return idsForX.length ? $$.data.xs[idsForX[0]] : null;
    },
    getOtherTargetX: function (index) {
        var xs = this.getOtherTargetXs();
        return xs && index < xs.length ? xs[index] : null;
    },
    addXs: function (xs) {
        var $$ = this;
        var config = $$.config;
        Object.keys(xs).forEach(function (id) {
            config.data_xs[id] = xs[id];
        });
    },
    isMultipleX: function () {
        return notEmpty(this.config.data_xs) ||
            !this.config.data_xSort ||
            this.hasType("bubble") ||
            this.hasType("scatter");
    },
    addName: function (data) {
        var $$ = this;
        var config = $$.config;
        var name;
        if (data) {
            name = config.data_names[data.id];
            data.name = name !== undefined ? name : data.id;
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
    getAllValuesOnIndex: function (index, filterNull) {
        if (filterNull === void 0) { filterNull = false; }
        var $$ = this;
        var value = $$.filterTargetsToShow($$.data.targets)
            .map(function (t) { return $$.addName($$.getValueOnIndex(t.values, index)); });
        if (filterNull) {
            value = value.filter(function (v) { return isValue(v.value); });
        }
        return value;
    },
    getValueOnIndex: function (values, index) {
        var valueOnIndex = values.filter(function (v) { return v.index === index; });
        return valueOnIndex.length ? valueOnIndex[0] : null;
    },
    updateTargetX: function (targets, x) {
        var $$ = this;
        targets.forEach(function (t) {
            t.values.forEach(function (v, i) {
                v.x = $$.generateTargetX(x[i], t.id, i);
            });
            $$.data.xs[t.id] = x;
        });
    },
    updateTargetXs: function (targets, xs) {
        var $$ = this;
        targets.forEach(function (t) {
            xs[t.id] && $$.updateTargetX([t], xs[t.id]);
        });
    },
    generateTargetX: function (rawX, id, index) {
        var $$ = this;
        var axis = $$.axis;
        var x = axis && axis.isCategorized() ? index : (rawX || index);
        if (axis && axis.isTimeSeries()) {
            var fn = parseDate.bind($$);
            x = rawX ? fn(rawX) : fn($$.getXValue(id, index));
        }
        else if (axis && axis.isCustomX() && !axis.isCategorized()) {
            x = isValue(rawX) ? +rawX : $$.getXValue(id, index);
        }
        return x;
    },
    updateXs: function (values) {
        if (values.length) {
            this.axis.xs = values.map(function (v) { return v.x; });
        }
    },
    getPrevX: function (i) {
        var x = this.axis.xs[i - 1];
        return isDefined(x) ? x : null;
    },
    getNextX: function (i) {
        var x = this.axis.xs[i + 1];
        return isDefined(x) ? x : null;
    },
    /**
     * Get base value isAreaRangeType
     * @param {object} data Data object
     * @returns {number}
     * @private
     */
    getBaseValue: function (data) {
        var $$ = this;
        var hasAxis = $$.state.hasAxis;
        var value = data.value;
        // In case of area-range, data is given as: [low, mid, high] or {low, mid, high}
        // will take the 'mid' as the base value
        if (value && hasAxis) {
            if ($$.isAreaRangeType(data)) {
                value = $$.getRangedData(data, "mid");
            }
            else if ($$.isBubbleZType(data)) {
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
    getMinMaxValue: function (data) {
        var getBaseValue = this.getBaseValue.bind(this);
        var min;
        var max;
        (data || this.data.targets.map(function (t) { return t.values; }))
            .forEach(function (v, i) {
            var value = v.map(getBaseValue).filter(isNumber);
            min = Math.min.apply(Math, __spreadArray([i ? min : Infinity], value));
            max = Math.max.apply(Math, __spreadArray([i ? max : -Infinity], value));
        });
        return { min: min, max: max };
    },
    /**
     * Get the min/max data
     * @private
     * @returns {{min: Array, max: Array}}
     */
    getMinMaxData: function () {
        var $$ = this;
        var cacheKey = KEY.dataMinMax;
        var minMaxData = $$.cache.get(cacheKey);
        if (!minMaxData) {
            var data = $$.data.targets.map(function (t) { return t.values; });
            var minMax_1 = $$.getMinMaxValue(data);
            var min_1 = [];
            var max_1 = [];
            data.forEach(function (v) {
                var minData = $$.getFilteredDataByValue(v, minMax_1.min);
                var maxData = $$.getFilteredDataByValue(v, minMax_1.max);
                if (minData.length) {
                    min_1 = min_1.concat(minData);
                }
                if (maxData.length) {
                    max_1 = max_1.concat(maxData);
                }
            });
            // update the cached data
            $$.cache.add(cacheKey, minMaxData = { min: min_1, max: max_1 });
        }
        return minMaxData;
    },
    /**
     * Get sum of data per index
     * @private
     * @returns {Array}
     */
    getTotalPerIndex: function () {
        var $$ = this;
        var cacheKey = KEY.dataTotalPerIndex;
        var sum = $$.cache.get(cacheKey);
        if ($$.isStackNormalized() && !sum) {
            sum = [];
            $$.data.targets.forEach(function (row) {
                row.values.forEach(function (v, i) {
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
    getTotalDataSum: function (subtractHidden) {
        var $$ = this;
        var cacheKey = KEY.dataTotalSum;
        var total = $$.cache.get(cacheKey);
        if (!isNumber(total)) {
            var sum = mergeArray($$.data.targets.map(function (t) { return t.values; }))
                .map(function (v) { return v.value; })
                .reduce(function (p, c) { return p + c; });
            $$.cache.add(cacheKey, total = sum);
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
    getHiddenTotalDataSum: function () {
        var $$ = this;
        var api = $$.api, hiddenTargetIds = $$.state.hiddenTargetIds;
        var total = 0;
        if (hiddenTargetIds.length) {
            total = api.data.values.bind(api)(hiddenTargetIds)
                .reduce(function (p, c) { return p + c; });
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
    getFilteredDataByValue: function (data, value) {
        var _this = this;
        return data.filter(function (t) { return _this.getBaseValue(t) === value; });
    },
    /**
     * Return the max length of the data
     * @returns {number} max data length
     * @private
     */
    getMaxDataCount: function () {
        return Math.max.apply(Math, this.data.targets.map(function (t) { return t.values.length; }));
    },
    getMaxDataCountTarget: function () {
        var target = this.filterTargetsToShow() || [];
        var length = target.length;
        if (length > 1) {
            target = target.map(function (t) { return t.values; })
                .reduce(function (a, b) { return a.concat(b); })
                .map(function (v) { return v.x; });
            target = sortValue(getUnique(target))
                .map(function (x, index) { return ({ x: x, index: index }); });
        }
        else if (length) {
            target = target[0].values;
        }
        return target;
    },
    mapToIds: function (targets) {
        return targets.map(function (d) { return d.id; });
    },
    mapToTargetIds: function (ids) {
        var $$ = this;
        return ids ? (isArray(ids) ? ids.concat() : [ids]) : $$.mapToIds($$.data.targets);
    },
    hasTarget: function (targets, id) {
        var ids = this.mapToIds(targets);
        for (var i = 0, val = void 0; (val = ids[i]); i++) {
            if (val === id) {
                return true;
            }
        }
        return false;
    },
    isTargetToShow: function (targetId) {
        return this.state.hiddenTargetIds.indexOf(targetId) < 0;
    },
    isLegendToShow: function (targetId) {
        return this.state.hiddenLegendIds.indexOf(targetId) < 0;
    },
    filterTargetsToShow: function (targets) {
        var $$ = this;
        return (targets || $$.data.targets).filter(function (t) { return $$.isTargetToShow(t.id); });
    },
    mapTargetsToUniqueXs: function (targets) {
        var $$ = this;
        var axis = $$.axis;
        var xs = [];
        if (targets && targets.length) {
            xs = getUnique(mergeArray(targets.map(function (t) { return t.values.map(function (v) { return +v.x; }); })));
            xs = axis && axis.isTimeSeries() ? xs.map(function (x) { return new Date(+x); }) : xs.map(function (x) { return +x; });
        }
        return sortValue(xs);
    },
    addHiddenTargetIds: function (targetIds) {
        this.state.hiddenTargetIds = this.state.hiddenTargetIds.concat(targetIds);
    },
    removeHiddenTargetIds: function (targetIds) {
        this.state.hiddenTargetIds = this.state.hiddenTargetIds.filter(function (id) { return targetIds.indexOf(id) < 0; });
    },
    addHiddenLegendIds: function (targetIds) {
        this.state.hiddenLegendIds = this.state.hiddenLegendIds.concat(targetIds);
    },
    removeHiddenLegendIds: function (targetIds) {
        this.state.hiddenLegendIds = this.state.hiddenLegendIds.filter(function (id) { return targetIds.indexOf(id) < 0; });
    },
    getValuesAsIdKeyed: function (targets) {
        var $$ = this;
        var hasAxis = $$.state.hasAxis;
        var ys = {};
        var isMultipleX = $$.isMultipleX();
        var xs = isMultipleX ? $$.mapTargetsToUniqueXs(targets)
            .map(function (v) { return (isString(v) ? v : +v); }) : null;
        targets.forEach(function (t) {
            var data = [];
            t.values
                .filter(function (v) { return isValue(v.value); })
                .forEach(function (v) {
                var value = v.value;
                // exclude 'volume' value to correct mis domain calculation
                if ($$.isCandlestickType(v)) {
                    value = isArray(value) ? value.slice(0, 4) : [value.open, value.high, value.low, value.close];
                }
                if (isArray(value)) {
                    data.push.apply(data, value);
                }
                else if (isObject(value) && "high" in value) {
                    data.push.apply(data, Object.values(value));
                }
                else if ($$.isBubbleZType(v)) {
                    data.push(hasAxis && $$.getBubbleZData(value, "y"));
                }
                else {
                    if (isMultipleX) {
                        data[$$.getIndexByX(v.x, xs)] = value;
                    }
                    else {
                        data.push(value);
                    }
                }
            });
            ys[t.id] = data;
        });
        return ys;
    },
    checkValueInTargets: function (targets, checker) {
        var ids = Object.keys(targets);
        var values;
        for (var i = 0; i < ids.length; i++) {
            values = targets[ids[i]].values;
            for (var j = 0; j < values.length; j++) {
                if (checker(values[j].value)) {
                    return true;
                }
            }
        }
        return false;
    },
    hasMultiTargets: function () {
        return this.filterTargetsToShow().length > 1;
    },
    hasNegativeValueInTargets: function (targets) {
        return this.checkValueInTargets(targets, function (v) { return v < 0; });
    },
    hasPositiveValueInTargets: function (targets) {
        return this.checkValueInTargets(targets, function (v) { return v > 0; });
    },
    _checkOrder: function (type) {
        var config = this.config;
        var order = config.data_order;
        return isString(order) && order.toLowerCase() === type;
    },
    isOrderDesc: function () {
        return this._checkOrder("desc");
    },
    isOrderAsc: function () {
        return this._checkOrder("asc");
    },
    /**
     * Sort targets data
     * @param {Array} targetsValue Target value
     * @returns {Array}
     * @private
     */
    orderTargets: function (targetsValue) {
        var $$ = this;
        var targets = __spreadArray([], targetsValue);
        var fn = $$.getSortCompareFn();
        fn && targets.sort(fn);
        return targets;
    },
    /**
     * Get data.order compare function
     * @param {boolean} isArc Is for Arc type sort or not
     * @returns {Function} compare function
     * @private
     */
    getSortCompareFn: function (isArc) {
        if (isArc === void 0) { isArc = false; }
        var $$ = this;
        var config = $$.config;
        var orderAsc = $$.isOrderAsc();
        var orderDesc = $$.isOrderDesc();
        var fn;
        if (orderAsc || orderDesc) {
            fn = function (t1, t2) {
                var reducer = function (p, c) { return p + Math.abs(c.value); };
                var t1Sum = t1.values.reduce(reducer, 0);
                var t2Sum = t2.values.reduce(reducer, 0);
                return isArc ?
                    (orderAsc ? t1Sum - t2Sum : t2Sum - t1Sum) :
                    (orderAsc ? t2Sum - t1Sum : t1Sum - t2Sum);
            };
        }
        else if (isFunction(config.data_order)) {
            fn = config.data_order.bind($$.api);
        }
        return fn || null;
    },
    filterByX: function (targets, x) {
        return mergeArray(targets.map(function (t) { return t.values; })).filter(function (v) { return v.x - x === 0; });
    },
    filterRemoveNull: function (data) {
        var _this = this;
        return data.filter(function (d) { return isValue(_this.getBaseValue(d)); });
    },
    filterByXDomain: function (targets, xDomain) {
        return targets.map(function (t) { return ({
            id: t.id,
            id_org: t.id_org,
            values: t.values.filter(function (v) { return xDomain[0] <= v.x && v.x <= xDomain[1]; })
        }); });
    },
    hasDataLabel: function () {
        var dataLabels = this.config.data_labels;
        return (isboolean(dataLabels) && dataLabels) ||
            (isObjectType(dataLabels) && notEmpty(dataLabels));
    },
    /**
     * Get data index from the event coodinates
     * @param {Event} event Event object
     * @returns {number}
     */
    getDataIndexFromEvent: function (event) {
        var $$ = this;
        var config = $$.config, _a = $$.state, inputType = _a.inputType, _b = _a.eventReceiver, coords = _b.coords, rect = _b.rect;
        var isRotated = config.axis_rotated;
        // get data based on the mouse coords
        var e = inputType === "touch" && event.changedTouches ? event.changedTouches[0] : event;
        var index = findIndex(coords, isRotated ? e.clientY - rect.top : e.clientX - rect.left, 0, coords.length - 1, isRotated);
        return index;
    },
    getDataLabelLength: function (min, max, key) {
        var $$ = this;
        var lengths = [0, 0];
        var paddingCoef = 1.3;
        $$.$el.chart.select("svg").selectAll(".dummy")
            .data([min, max])
            .enter()
            .append("text")
            .text(function (d) { return $$.dataLabelFormat(d.id)(d); })
            .each(function (d, i) {
            lengths[i] = this.getBoundingClientRect()[key] * paddingCoef;
        })
            .remove();
        return lengths;
    },
    isNoneArc: function (d) {
        return this.hasTarget(this.data.targets, d.id);
    },
    isArc: function (d) {
        return "data" in d && this.hasTarget(this.data.targets, d.data.id);
    },
    findSameXOfValues: function (values, index) {
        var targetX = values[index].x;
        var sames = [];
        var i;
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
    findClosestFromTargets: function (targets, pos) {
        var $$ = this;
        var candidates = targets.map(function (target) { return $$.findClosest(target.values, pos); }); // map to array of closest points of each target
        // decide closest point and return
        return $$.findClosest(candidates, pos);
    },
    findClosest: function (values, pos) {
        var $$ = this;
        var config = $$.config, main = $$.$el.main;
        var data = values.filter(function (v) { return v && isValue(v.value); });
        var minDist = config.point_sensitivity;
        var closest;
        // find mouseovering bar
        data
            .filter(function (v) { return $$.isBarType(v.id); })
            .forEach(function (v) {
            var shape = main.select("." + CLASS.bars + $$.getTargetSelectorSuffix(v.id) + " ." + CLASS.bar + "-" + v.index).node();
            if (!closest && $$.isWithinBar(shape)) {
                closest = v;
            }
        });
        // find closest point from non-bar
        data
            .filter(function (v) { return !$$.isBarType(v.id); })
            .forEach(function (v) {
            var d = $$.dist(v, pos);
            if (d < minDist) {
                minDist = d;
                closest = v;
            }
        });
        return closest;
    },
    dist: function (data, pos) {
        var $$ = this;
        var isRotated = $$.config.axis_rotated, scale = $$.scale;
        var xIndex = isRotated ? 1 : 0;
        var yIndex = isRotated ? 0 : 1;
        var y = $$.circleY(data, data.index);
        var x = (scale.zoom || scale.x)(data.x);
        return Math.sqrt(Math.pow(x - pos[xIndex], 2) + Math.pow(y - pos[yIndex], 2));
    },
    /**
     * Convert data for step type
     * @param {Array} values Object data values
     * @returns {Array}
     * @private
     */
    convertValuesToStep: function (values) {
        var $$ = this;
        var axis = $$.axis, config = $$.config;
        var stepType = config.line_step_type;
        var isCategorized = axis ? axis.isCategorized() : false;
        var converted = isArray(values) ? values.concat() : [values];
        if (!(isCategorized || /step\-(after|before)/.test(stepType))) {
            return values;
        }
        // insert & append cloning first/last value to be fully rendered covering on each gap sides
        var head = converted[0];
        var tail = converted[converted.length - 1];
        var id = head.id;
        var x = head.x;
        // insert head
        converted.unshift({ x: --x, value: head.value, id: id });
        isCategorized && stepType === "step-after" &&
            converted.unshift({ x: --x, value: head.value, id: id });
        // append tail
        x = tail.x;
        converted.push({ x: ++x, value: tail.value, id: id });
        isCategorized && stepType === "step-before" &&
            converted.push({ x: ++x, value: tail.value, id: id });
        return converted;
    },
    convertValuesToRange: function (values) {
        var converted = isArray(values) ? values.concat() : [values];
        var ranges = [];
        converted.forEach(function (range) {
            var x = range.x, id = range.id;
            ranges.push({
                x: x,
                id: id,
                value: range.value[0]
            });
            ranges.push({
                x: x,
                id: id,
                value: range.value[2]
            });
        });
        return ranges;
    },
    updateDataAttributes: function (name, attrs) {
        var $$ = this;
        var config = $$.config;
        var current = config["data_" + name];
        if (isUndefined(attrs)) {
            return current;
        }
        Object.keys(attrs).forEach(function (id) {
            current[id] = attrs[id];
        });
        $$.redraw({ withLegend: true });
        return current;
    },
    getRangedData: function (d, key, type) {
        if (key === void 0) { key = ""; }
        if (type === void 0) { type = "areaRange"; }
        var value = d === null || d === void 0 ? void 0 : d.value;
        if (isArray(value)) {
            // @ts-ignore
            var index = {
                areaRange: ["high", "mid", "low"],
                candlestick: ["open", "high", "low", "close", "volume"]
            }[type].indexOf(key);
            return index >= 0 && value ? value[index] : undefined;
        }
        else if (value) {
            return value[key];
        }
        return value;
    },
    /**
     * Get ratio value
     * @param {string} type Ratio for given type
     * @param {object} d Data value object
     * @param {boolean} asPercent Convert the return as percent or not
     * @returns {number} Ratio value
     * @private
     */
    getRatio: function (type, d, asPercent) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var api = $$.api;
        var ratio = 0;
        if (d && api.data.shown().length) {
            ratio = d.ratio || d.value;
            if (type === "arc") {
                // if has padAngle set, calculate rate based on value
                if ($$.pie.padAngle()()) {
                    ratio = d.value / $$.getTotalDataSum(true);
                    // otherwise, based on the rendered angle value
                }
                else {
                    var gaugeArcLength = config.gauge_fullCircle ? $$.getArcLength() : $$.getStartAngle() * -2;
                    var arcLength = $$.hasType("gauge") ? gaugeArcLength : Math.PI * 2;
                    ratio = (d.endAngle - d.startAngle) / arcLength;
                }
            }
            else if (type === "index") {
                var dataValues = api.data.values.bind(api);
                var total = this.getTotalPerIndex();
                if (state.hiddenTargetIds.length) {
                    var hiddenSum_1 = dataValues(state.hiddenTargetIds, false);
                    if (hiddenSum_1.length) {
                        hiddenSum_1 = hiddenSum_1
                            .reduce(function (acc, curr) { return acc.map(function (v, i) { return (isNumber(v) ? v : 0) + curr[i]; }); });
                        total = total.map(function (v, i) { return v - hiddenSum_1[i]; });
                    }
                }
                d.ratio = isNumber(d.value) && total && total[d.index] > 0 ?
                    d.value / total[d.index] : 0;
                ratio = d.ratio;
            }
            else if (type === "radar") {
                ratio = (parseFloat(String(Math.max(d.value, 0))) / state.current.dataMax) * config.radar_size_ratio;
            }
            else if (type === "bar") {
                var yScale = $$.getYScaleById.bind($$)(d.id);
                var max = yScale.domain().reduce(function (a, c) { return c - a; });
                ratio = Math.abs(d.value) / max;
            }
        }
        return asPercent && ratio ? ratio * 100 : ratio;
    },
    /**
     * Sort data index to be aligned with x axis.
     * @param {Array} tickValues Tick array values
     * @private
     */
    updateDataIndexByX: function (tickValues) {
        var $$ = this;
        var tickValueMap = tickValues.reduce(function (out, tick, index) {
            out[Number(tick.x)] = index;
            return out;
        }, {});
        $$.data.targets.forEach(function (t) {
            t.values.forEach(function (value, valueIndex) {
                var index = tickValueMap[Number(value.x)];
                if (index === undefined) {
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
    isBubbleZType: function (d) {
        var $$ = this;
        return $$.isBubbleType(d) && ((isObject(d.value) && ("z" in d.value || "y" in d.value)) ||
            (isArray(d.value) && d.value.length === 2));
    },
    /**
     * Get data object by id
     * @param {string} id data id
     * @returns {object}
     * @private
     */
    getDataById: function (id) {
        var d = this.cache.get(id) || this.api.data(id);
        return isArray(d) ? d[0] : d;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var dataLoad = {
    load: function (rawTargets, args) {
        var $$ = this;
        var targets = rawTargets;
        if (targets) {
            // filter loading targets if needed
            if (args.filter) {
                targets = targets.filter(args.filter);
            }
            // set type if args.types || args.type specified
            if (args.type || args.types) {
                targets.forEach(function (t) {
                    var type = (args.types && args.types[t.id]) || args.type;
                    $$.setTargetType(t.id, type);
                });
            }
            // Update/Add data
            $$.data.targets.forEach(function (d) {
                for (var i = 0; i < targets.length; i++) {
                    if (d.id === targets[i].id) {
                        d.values = targets[i].values;
                        targets.splice(i, 1);
                        break;
                    }
                }
            });
            $$.data.targets = $$.data.targets.concat(targets); // add remained
        }
        // Set targets
        $$.updateTargets($$.data.targets);
        // Redraw with new targets
        $$.redraw({
            withUpdateOrgXDomain: true,
            withUpdateXDomain: true,
            withLegend: true
        });
        // Update current state chart type and elements list after redraw
        $$.updateTypesElements();
        args.done && args.done.call($$.api);
    },
    loadFromArgs: function (args) {
        var $$ = this;
        // prevent load when chart is already destroyed
        if (!$$.config) {
            return;
        }
        // reset internally cached data
        $$.cache.reset();
        var data = args.data || $$.convertData(args, function (d) { return $$.load($$.convertDataToTargets(d), args); });
        data && $$.load($$.convertDataToTargets(data), args);
    },
    unload: function (rawTargetIds, customDoneCb) {
        var $$ = this;
        var state = $$.state, $el = $$.$el;
        var done = customDoneCb;
        var targetIds = rawTargetIds;
        // reset internally cached data
        $$.cache.reset();
        if (!done) {
            done = function () { };
        }
        // filter existing target
        targetIds = targetIds.filter(function (id) { return $$.hasTarget($$.data.targets, id); });
        // If no target, call done and return
        if (!targetIds || targetIds.length === 0) {
            done();
            return;
        }
        $el.svg.selectAll(targetIds.map(function (id) { return $$.selectorTarget(id); }))
            .transition()
            .style("opacity", "0")
            .remove()
            .call(endall, done);
        targetIds.forEach(function (id) {
            // Reset fadein for future load
            state.withoutFadeIn[id] = false;
            // Remove target's elements
            if ($el.legend) {
                $el.legend.selectAll("." + CLASS.legendItem + $$.getTargetSelectorSuffix(id)).remove();
            }
            // Remove target
            $$.data.targets = $$.data.targets.filter(function (t) { return t.id !== id; });
        });
        // Update current state chart type and elements list after redraw
        $$.updateTypesElements();
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var interaction = {
    selectRectForSingle: function (context, eventRect, index) {
        var $$ = this;
        var config = $$.config, main = $$.$el.main;
        var isSelectionEnabled = config.data_selection_enabled;
        var isSelectionGrouped = config.data_selection_grouped;
        var isSelectable = config.data_selection_isselectable;
        var isTooltipGrouped = config.tooltip_grouped;
        var selectedData = $$.getAllValuesOnIndex(index);
        if (isTooltipGrouped) {
            $$.showTooltip(selectedData, context);
            $$.showGridFocus && $$.showGridFocus(selectedData);
            if (!isSelectionEnabled || isSelectionGrouped) {
                return;
            }
        }
        main.selectAll("." + CLASS.shape + "-" + index)
            .each(function () {
            select(this).classed(CLASS.EXPANDED, true);
            if (isSelectionEnabled) {
                eventRect.style("cursor", isSelectionGrouped ? "pointer" : null);
            }
            if (!isTooltipGrouped) {
                $$.hideGridFocus && $$.hideGridFocus();
                $$.hideTooltip();
                !isSelectionGrouped && $$.expandCirclesBars(index);
            }
        })
            .filter(function (d) {
            return $$.isWithinShape(this, d);
        })
            .call(function (selected) {
            var d = selected.data();
            if (isSelectionEnabled &&
                (isSelectionGrouped || (isSelectable && isSelectable.bind($$.api)(d)))) {
                eventRect.style("cursor", "pointer");
            }
            if (!isTooltipGrouped) {
                $$.showTooltip(d, context);
                $$.showGridFocus && $$.showGridFocus(d);
                $$.unexpandCircles && $$.unexpandCircles();
                selected.each(function (d) { return $$.expandCirclesBars(index, d.id); });
            }
        });
    },
    expandCirclesBars: function (index, id, reset) {
        var $$ = this;
        var config = $$.config, _a = $$.$el, bar = _a.bar, circle = _a.circle;
        circle && config.point_focus_expand_enabled &&
            $$.expandCircles(index, id, reset);
        bar && $$.expandBars(index, id, reset);
    },
    /**
     * Handle data.onover/out callback options
     * @param {boolean} isOver Over or not
     * @param {number|object} d data object
     * @private
     */
    setOverOut: function (isOver, d) {
        var $$ = this;
        var config = $$.config, hasRadar = $$.state.hasRadar, main = $$.$el.main;
        var isArc = isObject(d);
        // Call event handler
        if (isArc || d !== -1) {
            var callback_1 = config[isOver ? "data_onover" : "data_onout"].bind($$.api);
            config.color_onover && $$.setOverColor(isOver, d, isArc);
            if (isArc) {
                callback_1(d, main.select("." + CLASS.arc + $$.getTargetSelectorSuffix(d.id)).node());
            }
            else if (!config.tooltip_grouped) {
                var last_1 = $$.cache.get(KEY.setOverOut) || [];
                var shape = main.selectAll("." + CLASS.shape + "-" + d)
                    .filter(function (d) {
                    return $$.isWithinShape(this, d);
                });
                shape
                    .each(function (d) {
                    var _this = this;
                    if (last_1.length === 0 || last_1.every(function (v) { return v !== _this; })) {
                        callback_1(d, this);
                        last_1.push(this);
                    }
                });
                if (last_1.length > 0 && shape.empty()) {
                    callback_1 = config.data_onout.bind($$.api);
                    last_1.forEach(function (v) { return callback_1(select(v).datum(), v); });
                    last_1 = [];
                }
                $$.cache.add(KEY.setOverOut, last_1);
            }
            else {
                if (isOver) {
                    config.point_focus_only && hasRadar ?
                        $$.showCircleFocus($$.getAllValuesOnIndex(d, true)) :
                        $$.expandCirclesBars(d, null, true);
                }
                !$$.isMultipleX() && main.selectAll("." + CLASS.shape + "-" + d)
                    .each(function (d) {
                    callback_1(d, this);
                });
            }
        }
    },
    /**
     * Call data.onover/out callback for touch event
     * @param {number|object} d target index or data object for Arc type
     * @private
     */
    callOverOutForTouch: function (d) {
        var $$ = this;
        var last = $$.cache.get(KEY.callOverOutForTouch);
        if (isObject(d) && last ? d.id !== last.id : (d !== last)) {
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
    getDraggableSelection: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        return config.interaction_enabled && config.data_selection_draggable && $$.drag ?
            drag$1()
                .on("drag", function (event) {
                state.event = event;
                $$.drag(getPointer(event, this));
            })
                .on("start", function (event) {
                state.event = event;
                $$.dragstart(getPointer(event, this));
            })
                .on("end", function (event) {
                state.event = event;
                $$.dragend();
            }) : function () { };
    },
    /**
     * Dispatch a mouse event.
     * @private
     * @param {string} type event type
     * @param {number} index Index of eventRect
     * @param {Array} mouse x and y coordinate value
     */
    dispatchEvent: function (type, index, mouse) {
        var $$ = this;
        var config = $$.config, _a = $$.state, eventReceiver = _a.eventReceiver, hasAxis = _a.hasAxis, hasRadar = _a.hasRadar, _b = $$.$el, eventRect = _b.eventRect, arcs = _b.arcs, radar = _b.radar;
        var isMultipleX = $$.isMultipleX();
        var element = (hasRadar ? radar.axes.select("." + CLASS.axis + "-" + index + " text") : (eventRect || arcs.selectAll("." + CLASS.target + " path").filter(function (d, i) { return i === index; }))).node();
        var _c = element.getBoundingClientRect(), width = _c.width, left = _c.left, top = _c.top;
        if (hasAxis && !hasRadar && !isMultipleX) {
            var coords = eventReceiver.coords[index];
            width = coords.w;
            left += coords.x;
            top += coords.y;
        }
        var x = left + (mouse ? mouse[0] : 0) + (isMultipleX || config.axis_rotated ? 0 : (width / 2));
        var y = top + (mouse ? mouse[1] : 0);
        var params = {
            screenX: x,
            screenY: y,
            clientX: x,
            clientY: y
        };
        emulateEvent[/^(mouse|click)/.test(type) ? "mouse" : "touch"](element, type, params);
    },
    setDragStatus: function (isDragging) {
        this.state.dragging = isDragging;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var classModule = {
    generateClass: function (prefix, targetId) {
        return " " + prefix + " " + (prefix + this.getTargetSelectorSuffix(targetId));
    },
    /**
     * Get class string
     * @param {string} type Shape type
     * @param {boolean} withShape Get with shape prefix
     * @returns {string} Class string
     * @private
     */
    getClass: function (type, withShape) {
        var _this = this;
        var isPlural = /s$/.test(type);
        var useIdKey = /^(area|arc|line)s?$/.test(type);
        var key = isPlural ? "id" : "index";
        return function (d) {
            var data = d.data || d;
            var result = (withShape ? _this.generateClass(CLASS[isPlural ? "shapes" : "shape"], data[key]) : "") + _this.generateClass(CLASS[type], data[useIdKey ? "id" : key]);
            return result.trim();
        };
    },
    /**
     * Get chart class string
     * @param {string} type Shape type
     * @returns {string} Class string
     * @private
     */
    getChartClass: function (type) {
        var _this = this;
        return function (d) { return CLASS["chart" + type] + _this.classTarget((d.data ? d.data : d).id); };
    },
    generateExtraLineClass: function () {
        var $$ = this;
        var classes = $$.config.line_classes || [];
        var ids = [];
        return function (d) {
            var id = d.id || (d.data && d.data.id) || d;
            if (ids.indexOf(id) < 0) {
                ids.push(id);
            }
            return classes[ids.indexOf(id) % classes.length];
        };
    },
    classRegion: function (d, i) {
        return this.generateClass(CLASS.region, i) + " " + ("class" in d ? d["class"] : "");
    },
    classTarget: function (id) {
        var additionalClassSuffix = this.config.data_classes[id];
        var additionalClass = "";
        if (additionalClassSuffix) {
            additionalClass = " " + CLASS.target + "-" + additionalClassSuffix;
        }
        return this.generateClass(CLASS.target, id) + additionalClass;
    },
    classFocus: function (d) {
        return this.classFocused(d) + this.classDefocused(d);
    },
    classFocused: function (d) {
        return " " + (this.state.focusedTargetIds.indexOf(d.id) >= 0 ? CLASS.focused : "");
    },
    classDefocused: function (d) {
        return " " + (this.state.defocusedTargetIds.indexOf(d.id) >= 0 ? CLASS.defocused : "");
    },
    getTargetSelectorSuffix: function (targetId) {
        return targetId || targetId === 0 ?
            ("-" + targetId).replace(/[\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g, "-") : "";
    },
    selectorTarget: function (id, prefix) {
        var pfx = prefix || "";
        var target = this.getTargetSelectorSuffix(id);
        // select target & circle
        return pfx + "." + (CLASS.target + target) + ", " + pfx + "." + (CLASS.circles + target);
    },
    selectorTargets: function (idsValue, prefix) {
        var _this = this;
        var ids = idsValue || [];
        return ids.length ?
            ids.map(function (id) { return _this.selectorTarget(id, prefix); }) : null;
    },
    selectorLegend: function (id) {
        return "." + (CLASS.legendItem + this.getTargetSelectorSuffix(id));
    },
    selectorLegends: function (ids) {
        var _this = this;
        return ids && ids.length ?
            ids.map(function (id) { return _this.selectorLegend(id); }) : null;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var category = {
    /**
     * Category Name
     * @param {number} i Index number
     * @returns {string} category Name
     * @private
     */
    categoryName: function (i) {
        var categories = this.config.axis_x_categories;
        return categories && i < categories.length ? categories[i] : i;
    }
};

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
    var node = select(pattern.cloneNode(true));
    node
        .attr("id", id)
        .insert("rect", ":first-child")
        .attr("width", node.attr("width"))
        .attr("height", node.attr("height"))
        .style("fill", color);
    return {
        id: id,
        node: node.node()
    };
};
// Replacement of d3.schemeCategory10.
// Contained differently depend on d3 version: v4(d3-scale), v5(d3-scale-chromatic)
var schemeCategory10 = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
var color = {
    /**
     * Get color pattern from CSS file
     * CSS should be defined as: background-image: url("#00c73c;#fa7171; ...");
     * @returns {Array}
     * @private
     */
    getColorFromCss: function () {
        var cacheKey = KEY.colorPattern;
        var body = doc.body;
        var pattern = body[cacheKey];
        if (!pattern) {
            var delimiter = ";";
            var span = doc.createElement("span");
            span.className = CLASS.colorPattern;
            span.style.display = "none";
            body.appendChild(span);
            var content = win.getComputedStyle(span).backgroundImage;
            span.parentNode.removeChild(span);
            if (content.indexOf(delimiter) > -1) {
                pattern = content
                    .replace(/url[^#]*|["'()]|(\s|%20)/g, "")
                    .split(delimiter)
                    .map(function (v) { return v.trim().replace(/[\"'\s]/g, ""); })
                    .filter(Boolean);
                body[cacheKey] = pattern;
            }
        }
        return pattern;
    },
    generateColor: function () {
        var $$ = this;
        var config = $$.config;
        var colors = config.data_colors;
        var callback = config.data_color;
        var ids = [];
        var pattern = notEmpty(config.color_pattern) ? config.color_pattern :
            scaleOrdinal($$.getColorFromCss() || schemeCategory10).range();
        var originalColorPattern = pattern;
        if (isFunction(config.color_tiles)) {
            var tiles_1 = config.color_tiles.bind($$.api)();
            // Add background color to patterns
            var colorizedPatterns = pattern.map(function (p, index) {
                var color = p.replace(/[#\(\)\s,]/g, "");
                var id = $$.state.datetimeId + "-pattern-" + color + "-" + index;
                return colorizePattern(tiles_1[index % tiles_1.length], p, id);
            });
            pattern = colorizedPatterns.map(function (p) { return "url(#" + p.id + ")"; });
            $$.patterns = colorizedPatterns;
        }
        return function (d) {
            var id = d.id || (d.data && d.data.id) || d;
            var isLine = $$.isTypeOf(id, ["line", "spline", "step"]) || !config.data_types[id];
            var color;
            // if callback function is provided
            if (isFunction(colors[id])) {
                color = colors[id].bind($$.api)(d);
                // if specified, choose that color
            }
            else if (colors[id]) {
                color = colors[id];
                // if not specified, choose from pattern
            }
            else {
                if (ids.indexOf(id) < 0) {
                    ids.push(id);
                }
                color = isLine ? originalColorPattern[ids.indexOf(id) % originalColorPattern.length] :
                    pattern[ids.indexOf(id) % pattern.length];
                colors[id] = color;
            }
            return isFunction(callback) ?
                callback.bind($$.api)(color, d) : color;
        };
    },
    generateLevelColor: function () {
        var $$ = this;
        var config = $$.config;
        var colors = config.color_pattern;
        var threshold = config.color_threshold;
        var asValue = threshold.unit === "value";
        var max = threshold.max || 100;
        var values = threshold.values &&
            threshold.values.length ? threshold.values : [];
        return notEmpty(threshold) ? function (value) {
            var v = asValue ? value : (value * 100 / max);
            var color = colors[colors.length - 1];
            for (var i = 0, l = values.length; i < l; i++) {
                if (v <= values[i]) {
                    color = colors[i];
                    break;
                }
            }
            return color;
        } : null;
    },
    /**
     * Set the data over color.
     * When is out, will restate in its previous color value
     * @param {boolean} isOver true: set overed color, false: restore
     * @param {number|object} d target index or data object for Arc type
     * @private
     */
    setOverColor: function (isOver, d) {
        var $$ = this;
        var config = $$.config, main = $$.$el.main;
        var onover = config.color_onover;
        var color = isOver ? onover : $$.color;
        if (isObject(color)) {
            color = function (_a) {
                var id = _a.id;
                return (id in onover ? onover[id] : $$.color(id));
            };
        }
        else if (isString(color)) {
            color = function () { return onover; };
        }
        else if (isFunction(onover)) {
            color = color.bind($$.api);
        }
        main.selectAll(isObject(d) ?
            // when is Arc type
            "." + CLASS.arc + $$.getTargetSelectorSuffix(d.id) :
            "." + CLASS.shape + "-" + d).style("fill", color);
    }
};

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
    Area: [
        TYPE.AREA,
        TYPE.AREA_SPLINE,
        TYPE.AREA_SPLINE_RANGE,
        TYPE.AREA_LINE_RANGE,
        TYPE.AREA_STEP
    ],
    AreaRange: [
        TYPE.AREA_SPLINE_RANGE,
        TYPE.AREA_LINE_RANGE
    ],
    Arc: [
        TYPE.PIE,
        TYPE.DONUT,
        TYPE.GAUGE,
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
        TYPE.AREA_STEP
    ],
    Step: [
        TYPE.STEP,
        TYPE.AREA_STEP
    ],
    Spline: [
        TYPE.SPLINE,
        TYPE.AREA_SPLINE,
        TYPE.AREA_SPLINE_RANGE
    ]
};

var domain = {
    getYDomainMinMax: function (targets, type) {
        var $$ = this;
        var axis = $$.axis, config = $$.config;
        var isMin = type === "min";
        var dataGroups = config.data_groups;
        var ids = $$.mapToIds(targets);
        var ys = $$.getValuesAsIdKeyed(targets);
        if (dataGroups.length > 0) {
            var hasValue_1 = $$["has" + (isMin ? "Negative" : "Positive") + "ValueInTargets"](targets);
            var _loop_1 = function (j, idsInGroup) {
                // Determine baseId
                idsInGroup = idsInGroup.filter(function (v) { return ids.indexOf(v) >= 0; });
                if (idsInGroup.length === 0) {
                    return out_idsInGroup_1 = idsInGroup, "continue";
                }
                var baseId = idsInGroup[0];
                var baseAxisId = axis.getId(baseId);
                // Initialize base value. Set to 0 if not match with the condition
                if (hasValue_1 && ys[baseId]) {
                    ys[baseId] = ys[baseId].map(function (v) { return ((isMin ? v < 0 : v > 0) ? v : 0); });
                }
                var _loop_2 = function (k, id) {
                    if (!ys[id]) {
                        return "continue";
                    }
                    var axisId = axis.getId(id);
                    ys[id].forEach(function (v, i) {
                        var val = +v;
                        var meetCondition = isMin ? val > 0 : val < 0;
                        if (axisId === baseAxisId && !(hasValue_1 && meetCondition)) {
                            ys[baseId][i] += val;
                        }
                    });
                };
                for (var k = 1, id = void 0; (id = idsInGroup[k]); k++) {
                    _loop_2(k, id);
                }
                out_idsInGroup_1 = idsInGroup;
            };
            var out_idsInGroup_1;
            for (var j = 0, idsInGroup = void 0; (idsInGroup = dataGroups[j]); j++) {
                _loop_1(j, idsInGroup);
                idsInGroup = out_idsInGroup_1;
            }
        }
        return getMinMax$1(type, Object.keys(ys).map(function (key) { return getMinMax$1(type, ys[key]); }));
    },
    getYDomainMin: function (targets) {
        return this.getYDomainMinMax(targets, "min");
    },
    getYDomainMax: function (targets) {
        return this.getYDomainMinMax(targets, "max");
    },
    /**
     * Check if hidden targets bound to the given axis id
     * @param {string} id ID to be checked
     * @returns {boolean}
     * @private
     */
    isHiddenTargetWithYDomain: function (id) {
        var $$ = this;
        return $$.state.hiddenTargetIds
            .some(function (v) { return $$.axis.getId(v) === id; });
    },
    getYDomain: function (targets, axisId, xDomain) {
        var $$ = this;
        var axis = $$.axis, config = $$.config, scale = $$.scale;
        var pfx = "axis_" + axisId;
        if ($$.isStackNormalized()) {
            return [0, 100];
        }
        var isLog = scale && scale[axisId] && scale[axisId].type === "log";
        var targetsByAxisId = targets.filter(function (t) { return axis.getId(t.id) === axisId; });
        var yTargets = xDomain ? $$.filterByXDomain(targetsByAxisId, xDomain) : targetsByAxisId;
        if (yTargets.length === 0) { // use domain of the other axis if target of axisId is none
            if ($$.isHiddenTargetWithYDomain(axisId)) {
                return scale[axisId].domain();
            }
            else {
                return axisId === "y2" ?
                    scale.y.domain() :
                    // When all data bounds to y2, y Axis domain is called prior y2.
                    // So, it needs to call to get y2 domain here
                    $$.getYDomain(targets, "y2", xDomain);
            }
        }
        var yMin = config[pfx + "_min"];
        var yMax = config[pfx + "_max"];
        var yDomainMin = $$.getYDomainMin(yTargets);
        var yDomainMax = $$.getYDomainMax(yTargets);
        var center = config[pfx + "_center"];
        var isZeroBased = __spreadArray([TYPE.BAR, TYPE.BUBBLE, TYPE.SCATTER], TYPE_BY_CATEGORY.Line).some(function (v) {
            var type = v.indexOf("area") > -1 ? "area" : v;
            return $$.hasType(v, yTargets) && config[type + "_zerobased"];
        });
        var isInverted = config[pfx + "_inverted"];
        var showHorizontalDataLabel = $$.hasDataLabel() && config.axis_rotated;
        var showVerticalDataLabel = $$.hasDataLabel() && !config.axis_rotated;
        // MEMO: avoid inverting domain unexpectedly
        yDomainMin = isValue(yMin) ? yMin :
            (isValue(yMax) ? (yDomainMin < yMax ? yDomainMin : yMax - 10) : yDomainMin);
        yDomainMax = isValue(yMax) ? yMax :
            (isValue(yMin) ? (yMin < yDomainMax ? yDomainMax : yMin + 10) : yDomainMax);
        if (isNaN(yDomainMin)) { // set minimum to zero when not number
            yDomainMin = 0;
        }
        if (isNaN(yDomainMax)) { // set maximum to have same value as yDomainMin
            yDomainMax = yDomainMin;
        }
        if (yDomainMin === yDomainMax) {
            yDomainMin < 0 ? yDomainMax = 0 : yDomainMin = 0;
        }
        var isAllPositive = yDomainMin >= 0 && yDomainMax >= 0;
        var isAllNegative = yDomainMin <= 0 && yDomainMax <= 0;
        // Cancel zerobased if axis_*_min / axis_*_max specified
        if ((isValue(yMin) && isAllPositive) || (isValue(yMax) && isAllNegative)) {
            isZeroBased = false;
        }
        // Bar/Area chart should be 0-based if all positive|negative
        if (isZeroBased) {
            isAllPositive && (yDomainMin = 0);
            isAllNegative && (yDomainMax = 0);
        }
        var domainLength = Math.abs(yDomainMax - yDomainMin);
        var padding = { top: domainLength * 0.1, bottom: domainLength * 0.1 };
        if (isDefined(center)) {
            var yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));
            yDomainMax = center + yDomainAbs;
            yDomainMin = center - yDomainAbs;
        }
        // add padding for data label
        if (showHorizontalDataLabel) {
            var diff_1 = diffDomain(scale.y.range());
            var ratio_1 = $$.getDataLabelLength(yDomainMin, yDomainMax, "width")
                .map(function (v) { return v / diff_1; });
            ["bottom", "top"].forEach(function (v, i) {
                padding[v] += domainLength * (ratio_1[i] / (1 - ratio_1[0] - ratio_1[1]));
            });
        }
        else if (showVerticalDataLabel) {
            var lengths_1 = $$.getDataLabelLength(yDomainMin, yDomainMax, "height");
            ["bottom", "top"].forEach(function (v, i) {
                padding[v] += axis.convertPixelsToAxisPadding(lengths_1[i], domainLength);
            });
        }
        // if padding is set, the domain will be updated relative the current domain value
        // ex) $$.height=300, padding.top=150, domainLength=4  --> domain=6
        var p = config[pfx + "_padding"];
        if (notEmpty(p)) {
            ["bottom", "top"].forEach(function (v) {
                padding[v] = axis.getPadding(p, v, padding[v], domainLength);
            });
        }
        // Bar/Area chart should be 0-based if all positive|negative
        if (isZeroBased) {
            isAllPositive && (padding.bottom = yDomainMin);
            isAllNegative && (padding.top = -yDomainMax);
        }
        var domain = isLog ? [yDomainMin, yDomainMax].map(function (v) { return (v < 0 ? 0 : v); }) :
            [yDomainMin - padding.bottom, yDomainMax + padding.top];
        return isInverted ? domain.reverse() : domain;
    },
    getXDomainMinMax: function (targets, type) {
        var $$ = this;
        var configValue = $$.config["axis_x_" + type];
        var dataValue = getMinMax$1(type, targets.map(function (t) { return getMinMax$1(type, t.values.map(function (v) { return v.x; })); }));
        var value = isObject(configValue) ? configValue.value : configValue;
        value = isDefined(value) && $$.axis.isTimeSeries() ? parseDate.bind(this)(value) : value;
        if (isObject(configValue) && configValue.fit && ((type === "min" && value < dataValue) || (type === "max" && value > dataValue))) {
            value = undefined;
        }
        return isDefined(value) ? value : dataValue;
    },
    getXDomainMin: function (targets) {
        return this.getXDomainMinMax(targets, "min");
    },
    getXDomainMax: function (targets) {
        return this.getXDomainMinMax(targets, "max");
    },
    getXDomainPadding: function (domain) {
        var $$ = this;
        var axis = $$.axis, config = $$.config;
        var diff = domain[1] - domain[0];
        var xPadding = config.axis_x_padding;
        var maxDataCount;
        var padding;
        if (axis.isCategorized()) {
            padding = 0;
        }
        else if ($$.hasType("bar")) {
            maxDataCount = $$.getMaxDataCount();
            padding = maxDataCount > 1 ? (diff / (maxDataCount - 1)) / 2 : 0.5;
        }
        else {
            padding = diff * 0.01;
        }
        var left = padding;
        var right = padding;
        if (isObject(xPadding) && notEmpty(xPadding)) {
            left = isValue(xPadding.left) ? xPadding.left : padding;
            right = isValue(xPadding.right) ? xPadding.right : padding;
        }
        else if (isNumber(config.axis_x_padding)) {
            left = xPadding;
            right = xPadding;
        }
        return { left: left, right: right };
    },
    getXDomain: function (targets) {
        var $$ = this;
        var isLog = $$.scale.x.type === "log";
        var xDomain = [$$.getXDomainMin(targets), $$.getXDomainMax(targets)];
        var min = 0;
        var max = 0;
        if (isLog) {
            min = xDomain[0];
            max = xDomain[1];
        }
        else {
            var isCategorized = $$.axis.isCategorized();
            var isTimeSeries = $$.axis.isTimeSeries();
            var padding = $$.getXDomainPadding(xDomain);
            var firstX = xDomain[0], lastX = xDomain[1];
            // show center of x domain if min and max are the same
            if ((firstX - lastX) === 0 && !isCategorized) {
                if (isTimeSeries) {
                    firstX = new Date(firstX.getTime() * 0.5);
                    lastX = new Date(lastX.getTime() * 1.5);
                }
                else {
                    firstX = firstX === 0 ? 1 : (firstX * 0.5);
                    lastX = lastX === 0 ? -1 : (lastX * 1.5);
                }
            }
            if (firstX || firstX === 0) {
                min = isTimeSeries ? new Date(firstX.getTime() - padding.left) : firstX - padding.left;
            }
            if (lastX || lastX === 0) {
                max = isTimeSeries ? new Date(lastX.getTime() + padding.right) : lastX + padding.right;
            }
        }
        return [min, max];
    },
    updateXDomain: function (targets, withUpdateXDomain, withUpdateOrgXDomain, withTrim, domain) {
        var $$ = this;
        var config = $$.config, org = $$.org, _a = $$.scale, x = _a.x, subX = _a.subX;
        var zoomEnabled = config.zoom_enabled;
        if (withUpdateOrgXDomain) {
            x.domain(domain || sortValue($$.getXDomain(targets)));
            org.xDomain = x.domain();
            zoomEnabled && $$.zoom.updateScaleExtent();
            subX.domain(x.domain());
            $$.brush && $$.brush.scale(subX);
        }
        if (withUpdateXDomain) {
            var domainValue = domain || (!$$.brush || brushEmpty($$)) ?
                org.xDomain : getBrushSelection($$).map(subX.invert);
            x.domain(domainValue);
            zoomEnabled && $$.zoom.updateScaleExtent();
        }
        // Trim domain when too big by zoom mousemove event
        withTrim && x.domain($$.trimXDomain(x.orgDomain()));
        return x.domain();
    },
    trimXDomain: function (domain) {
        var zoomDomain = this.getZoomDomain();
        var min = zoomDomain[0], max = zoomDomain[1];
        if (domain[0] <= min) {
            domain[1] = +domain[1] + (min - domain[0]);
            domain[0] = min;
        }
        if (max <= domain[1]) {
            domain[0] = +domain[0] - (domain[1] - max);
            domain[1] = max;
        }
        return domain;
    },
    /**
     * Get zoom domain
     * @returns {Array} zoom domain
     * @private
     */
    getZoomDomain: function () {
        var $$ = this;
        var config = $$.config, org = $$.org;
        var _a = org.xDomain, min = _a[0], max = _a[1];
        if (isDefined(config.zoom_x_min)) {
            min = getMinMax$1("min", [min, config.zoom_x_min]);
        }
        if (isDefined(config.zoom_x_max)) {
            max = getMinMax$1("max", [max, config.zoom_x_max]);
        }
        return [min, max];
    }
};

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
    var config = $$.config;
    var type = "axis_" + typeValue + "_tick_format";
    var format = config[type] ?
        config[type] : $$.defaultValueFormat;
    return format(v);
}
var format = {
    getYFormat: function (forArc) {
        var $$ = this;
        var yFormat = $$.yFormat, y2Format = $$.y2Format;
        if (forArc && !$$.hasType("gauge")) {
            yFormat = $$.defaultArcValueFormat;
            y2Format = $$.defaultArcValueFormat;
        }
        return function (v, ratio, id) {
            var format = $$.axis && $$.axis.getId(id) === "y2" ?
                y2Format : yFormat;
            return format.call($$, v, ratio);
        };
    },
    yFormat: function (v) {
        return getFormat(this, "y", v);
    },
    y2Format: function (v) {
        return getFormat(this, "y2", v);
    },
    defaultValueFormat: function (v) {
        return isValue(v) ? +v : "";
    },
    defaultArcValueFormat: function (v, ratio) {
        return (ratio * 100).toFixed(1) + "%";
    },
    dataLabelFormat: function (targetId) {
        var $$ = this;
        var dataLabels = $$.config.data_labels;
        var defaultFormat = function (v) { return (isValue(v) ? +v : ""); };
        var format = defaultFormat;
        // find format according to axis id
        if (isFunction(dataLabels.format)) {
            format = dataLabels.format;
        }
        else if (isObjectType(dataLabels.format)) {
            if (dataLabels.format[targetId]) {
                format = dataLabels.format[targetId] === true ?
                    defaultFormat : dataLabels.format[targetId];
            }
            else {
                format = function () { return ""; };
            }
        }
        return format.bind($$.api);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var legend$1 = {
    /**
     * Initialize the legend.
     * @private
     */
    initLegend: function () {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        $$.legendItemTextBox = {};
        $$.state.legendHasRendered = false;
        if (config.legend_show) {
            if (!config.legend_contents_bindto) {
                $el.legend = $$.$el.svg.append("g")
                    .classed(CLASS.legend, true)
                    .attr("transform", $$.getTranslate("legend"));
            }
            // MEMO: call here to update legend box and translate for all
            // MEMO: translate will be updated by this, so transform not needed in updateLegend()
            $$.updateLegend();
        }
        else {
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
    updateLegend: function (targetIds, options, transitions) {
        var $$ = this;
        var config = $$.config, state = $$.state, scale = $$.scale, $el = $$.$el;
        var optionz = options || {
            withTransform: false,
            withTransitionForTransform: false,
            withTransition: false
        };
        optionz.withTransition = getOption(optionz, "withTransition", true);
        optionz.withTransitionForTransform = getOption(optionz, "withTransitionForTransform", true);
        if (config.legend_contents_bindto && config.legend_contents_template) {
            $$.updateLegendTemplate();
        }
        else {
            $$.updateLegendElement(targetIds || $$.mapToIds($$.data.targets), optionz, transitions);
        }
        // toggle legend state
        $el.legend.selectAll("." + CLASS.legendItem)
            .classed(CLASS.legendItemHidden, function (id) {
            var hide = !$$.isTargetToShow(id);
            if (hide) {
                this.style.opacity = null;
            }
            return hide;
        });
        // Update size and scale
        $$.updateScales(false, !scale.zoom);
        $$.updateSvgSize();
        // Update g positions
        $$.transformAll(optionz.withTransitionForTransform, transitions);
        state.legendHasRendered = true;
    },
    /**
     * Update legend using template option
     * @private
     */
    updateLegendTemplate: function () {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        var wrapper = select(config.legend_contents_bindto);
        var template = config.legend_contents_template;
        if (!wrapper.empty()) {
            var targets = $$.mapToIds($$.data.targets);
            var ids_1 = [];
            var html_1 = "";
            targets.forEach(function (v) {
                var content = isFunction(template) ?
                    template.bind($$.api)(v, $$.color(v), $$.api.data(v)[0].values) :
                    tplProcess(template, {
                        COLOR: $$.color(v),
                        TITLE: v
                    });
                if (content) {
                    ids_1.push(v);
                    html_1 += content;
                }
            });
            var legendItem = wrapper.html(html_1)
                .selectAll(function () { return this.childNodes; })
                .data(ids_1);
            $$.setLegendItem(legendItem);
            $el.legend = wrapper;
        }
    },
    /**
     * Update the size of the legend.
     * @param {Obejct} size Size object
     * @private
     */
    updateSizeForLegend: function (size) {
        var $$ = this;
        var config = $$.config, _a = $$.state, isLegendTop = _a.isLegendTop, isLegendLeft = _a.isLegendLeft, isLegendRight = _a.isLegendRight, isLegendInset = _a.isLegendInset, current = _a.current;
        var width = size.width, height = size.height;
        var insetLegendPosition = {
            top: isLegendTop ?
                $$.getCurrentPaddingTop() + config.legend_inset_y + 5.5 :
                current.height - height - $$.getCurrentPaddingBottom() - config.legend_inset_y,
            left: isLegendLeft ?
                $$.getCurrentPaddingLeft() + config.legend_inset_x + 0.5 :
                current.width - width - $$.getCurrentPaddingRight() - config.legend_inset_x + 0.5
        };
        $$.state.margin3 = {
            top: isLegendRight ?
                0 : isLegendInset ? insetLegendPosition.top : current.height - height,
            right: NaN,
            bottom: 0,
            left: isLegendRight ?
                current.width - width : isLegendInset ? insetLegendPosition.left : 0
        };
    },
    /**
     * Transform Legend
     * @param {boolean} withTransition whether or not to transition.
     * @private
     */
    transformLegend: function (withTransition) {
        var $$ = this;
        var legend = $$.$el.legend;
        (withTransition ? legend.transition() : legend)
            .attr("transform", $$.getTranslate("legend"));
    },
    /**
     * Update the legend step
     * @param {number} step Step value
     * @private
     */
    updateLegendStep: function (step) {
        this.state.legendStep = step;
    },
    /**
     * Update legend item width
     * @param {number} width Width value
     * @private
     */
    updateLegendItemWidth: function (width) {
        this.state.legendItemWidth = width;
    },
    /**
     * Update legend item height
     * @param {number} height Height value
     * @private
     */
    updateLegendItemHeight: function (height) {
        this.state.legendItemHeight = height;
    },
    /**
     * Update legend item color
     * @param {string} id Corresponding data ID value
     * @param {string} color Color value
     * @private
     */
    updateLegendItemColor: function (id, color) {
        var legend = this.$el.legend;
        if (legend) {
            legend.select("." + CLASS.legendItem + "-" + id + " line")
                .style("stroke", color);
        }
    },
    /**
     * Get the width of the legend
     * @returns {number} width
     * @private
     */
    getLegendWidth: function () {
        var $$ = this;
        var _a = $$.state, width = _a.current.width, isLegendRight = _a.isLegendRight, isLegendInset = _a.isLegendInset, legendItemWidth = _a.legendItemWidth, legendStep = _a.legendStep;
        return $$.config.legend_show ? (isLegendRight || isLegendInset ?
            legendItemWidth * (legendStep + 1) : width) : 0;
    },
    /**
     * Get the height of the legend
     * @returns {number} height
     * @private
     */
    getLegendHeight: function () {
        var $$ = this;
        var _a = $$.state, current = _a.current, isLegendRight = _a.isLegendRight, legendItemHeight = _a.legendItemHeight, legendStep = _a.legendStep;
        return $$.config.legend_show ? (isLegendRight ?
            current.height : Math.max(20, legendItemHeight) * (legendStep + 1)) : 0;
    },
    /**
     * Get the opacity of the legend
     * @param {d3.selection} legendItem Legend item node
     * @returns {string|null} opacity
     * @private
     */
    opacityForLegend: function (legendItem) {
        return legendItem.classed(CLASS.legendItemHidden) ? null : "1";
    },
    /**
     * Get the opacity of the legend that is unfocused
     * @param {d3.selection} legendItem Legend item node
     * @returns {string|null} opacity
     * @private
     */
    opacityForUnfocusedLegend: function (legendItem) {
        return legendItem.classed(CLASS.legendItemHidden) ? null : "0.3";
    },
    /**
     * Toggles the focus of the legend
     * @param {Array} targetIds ID's of target
     * @param {boolean} focus whether or not to focus.
     * @private
     */
    toggleFocusLegend: function (targetIds, focus) {
        var $$ = this;
        var legend = $$.$el.legend;
        var targetIdz = $$.mapToTargetIds(targetIds);
        legend && legend.selectAll("." + CLASS.legendItem)
            .filter(function (id) { return targetIdz.indexOf(id) >= 0; })
            .classed(CLASS.legendItemFocused, focus)
            .transition()
            .duration(100)
            .style("opacity", function () {
            return (focus ? $$.opacityForLegend : $$.opacityForUnfocusedLegend)
                .call($$, select(this));
        });
    },
    /**
     * Revert the legend to its default state
     * @private
     */
    revertLegend: function () {
        var $$ = this;
        var legend = $$.$el.legend;
        legend && legend.selectAll("." + CLASS.legendItem)
            .classed(CLASS.legendItemFocused, false)
            .transition()
            .duration(100)
            .style("opacity", function () {
            return $$.opacityForLegend(select(this));
        });
    },
    /**
     * Shows the legend
     * @param {Array} targetIds ID's of target
     * @private
     */
    showLegend: function (targetIds) {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        if (!config.legend_show) {
            config.legend_show = true;
            $el.legend ?
                $el.legend.style("visibility", "visible") :
                $$.initLegend();
            !$$.state.legendHasRendered && $$.updateLegend();
        }
        $$.removeHiddenLegendIds(targetIds);
        $el.legend.selectAll($$.selectorLegends(targetIds))
            .style("visibility", "visible")
            .transition()
            .style("opacity", function () {
            return $$.opacityForLegend(select(this));
        });
    },
    /**
     * Hide the legend
     * @param {Array} targetIds ID's of target
     * @private
     */
    hideLegend: function (targetIds) {
        var $$ = this;
        var config = $$.config, legend = $$.$el.legend;
        if (config.legend_show && isEmpty(targetIds)) {
            config.legend_show = false;
            legend.style("visibility", "hidden");
        }
        $$.addHiddenLegendIds(targetIds);
        legend.selectAll($$.selectorLegends(targetIds))
            .style("opacity", "0")
            .style("visibility", "hidden");
    },
    /**
     * Get legend item textbox dimension
     * @param {string} id Data ID
     * @param {HTMLElement|d3.selection} textElement Text node element
     * @returns {object} Bounding rect
     * @private
     */
    getLegendItemTextBox: function (id, textElement) {
        var $$ = this;
        var cache = $$.cache, state = $$.state;
        var data;
        // do not prefix w/'$', to not be resetted cache in .load() call
        var cacheKey = KEY.legendItemTextBox;
        if (id) {
            data = (!state.redrawing && cache.get(cacheKey)) || {};
            if (!data[id]) {
                data[id] = $$.getTextRect(textElement, CLASS.legendItem);
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
    setLegendItem: function (item) {
        var $$ = this;
        var api = $$.api, config = $$.config, state = $$.state;
        var isTouch = state.inputType === "touch";
        var hasGauge = $$.hasType("gauge");
        item
            .attr("class", function (id) {
            var node = select(this);
            var itemClass = (!node.empty() && node.attr("class")) || "";
            return itemClass + $$.generateClass(CLASS.legendItem, id);
        })
            .style("visibility", function (id) { return ($$.isLegendToShow(id) ? "visible" : "hidden"); });
        if (config.interaction_enabled) {
            item
                .style("cursor", "pointer")
                .on("click", function (event, id) {
                if (!callFn(config.legend_item_onclick, api, id)) {
                    if (event.altKey) {
                        api.hide();
                        api.show(id);
                    }
                    else {
                        api.toggle(id);
                        select(this)
                            .classed(CLASS.legendItemFocused, false)
                            .style("opacity", null);
                    }
                }
                isTouch && $$.hideTooltip();
            });
            !isTouch && item
                .on("mouseout", function (event, id) {
                if (!callFn(config.legend_item_onout, api, id)) {
                    select(this).classed(CLASS.legendItemFocused, false);
                    if (hasGauge) {
                        $$.undoMarkOverlapped($$, "." + CLASS.gaugeValue);
                    }
                    $$.api.revert();
                }
            })
                .on("mouseover", function (event, id) {
                if (!callFn(config.legend_item_onover, api, id)) {
                    select(this).classed(CLASS.legendItemFocused, true);
                    if (hasGauge) {
                        $$.markOverlapped(id, $$, "." + CLASS.gaugeValue);
                    }
                    if (!state.transiting && $$.isTargetToShow(id)) {
                        api.focus(id);
                    }
                }
            });
        }
    },
    /**
     * Update the legend
     * @param {Array} targetIds ID's of target
     * @param {object} options withTransform : Whether to use the transform property / withTransitionForTransform: Whether transition is used when using the transform property / withTransition : whether or not to transition.
     * @private
     */
    updateLegendElement: function (targetIds, options) {
        var $$ = this;
        var config = $$.config, state = $$.state, legend = $$.$el.legend;
        var paddingTop = 4;
        var paddingRight = 10;
        var posMin = 10;
        var tileWidth = config.legend_item_tile_width + 5;
        var maxWidth = 0;
        var maxHeight = 0;
        var xForLegend;
        var yForLegend;
        var totalLength = 0;
        var offsets = {};
        var widths = {};
        var heights = {};
        var margins = [0];
        var steps = {};
        var step = 0;
        var background;
        var isLegendRightOrInset = state.isLegendRight || state.isLegendInset;
        // Skip elements when their name is set to null
        var targetIdz = targetIds
            .filter(function (id) { return !isDefined(config.data_names[id]) || config.data_names[id] !== null; });
        var withTransition = options.withTransition;
        var updatePositions = function (textElement, id, index) {
            var reset = index === 0;
            var isLast = index === targetIdz.length - 1;
            var box = $$.getLegendItemTextBox(id, textElement);
            var itemWidth = box.width + tileWidth +
                (isLast && !isLegendRightOrInset ? 0 : paddingRight) + config.legend_padding;
            var itemHeight = box.height + paddingTop;
            var itemLength = isLegendRightOrInset ? itemHeight : itemWidth;
            var areaLength = isLegendRightOrInset ? $$.getLegendHeight() : $$.getLegendWidth();
            var margin;
            // MEMO: care about condifion of step, totalLength
            var updateValues = function (id2, withoutStep) {
                if (!withoutStep) {
                    margin = (areaLength - totalLength - itemLength) / 2;
                    if (margin < posMin) {
                        margin = (areaLength - itemLength) / 2;
                        totalLength = 0;
                        step++;
                    }
                }
                steps[id2] = step;
                margins[step] = state.isLegendInset ? 10 : margin;
                offsets[id2] = totalLength;
                totalLength += itemLength;
            };
            if (reset) {
                totalLength = 0;
                step = 0;
                maxWidth = 0;
                maxHeight = 0;
            }
            if (config.legend_show && !$$.isLegendToShow(id)) {
                widths[id] = 0;
                heights[id] = 0;
                steps[id] = 0;
                offsets[id] = 0;
                return;
            }
            widths[id] = itemWidth;
            heights[id] = itemHeight;
            if (!maxWidth || itemWidth >= maxWidth) {
                maxWidth = itemWidth;
            }
            if (!maxHeight || itemHeight >= maxHeight) {
                maxHeight = itemHeight;
            }
            var maxLength = isLegendRightOrInset ? maxHeight : maxWidth;
            if (config.legend_equally) {
                Object.keys(widths).forEach(function (id2) { return (widths[id2] = maxWidth); });
                Object.keys(heights).forEach(function (id2) { return (heights[id2] = maxHeight); });
                margin = (areaLength - maxLength * targetIdz.length) / 2;
                if (margin < posMin) {
                    totalLength = 0;
                    step = 0;
                    targetIdz.forEach(function (id2) { return updateValues(id2); });
                }
                else {
                    updateValues(id, true);
                }
            }
            else {
                updateValues(id);
            }
        };
        if (state.isLegendInset) {
            step = config.legend_inset_step ? config.legend_inset_step : targetIdz.length;
            $$.updateLegendStep(step);
        }
        if (state.isLegendRight) {
            xForLegend = function (id) { return maxWidth * steps[id]; };
            yForLegend = function (id) { return margins[steps[id]] + offsets[id]; };
        }
        else if (state.isLegendInset) {
            xForLegend = function (id) { return maxWidth * steps[id] + 10; };
            yForLegend = function (id) { return margins[steps[id]] + offsets[id]; };
        }
        else {
            xForLegend = function (id) { return margins[steps[id]] + offsets[id]; };
            yForLegend = function (id) { return maxHeight * steps[id]; };
        }
        var xForLegendText = function (id, i) { return xForLegend(id, i) + 4 + config.legend_item_tile_width; };
        var xForLegendRect = function (id, i) { return xForLegend(id, i); };
        var x1ForLegendTile = function (id, i) { return xForLegend(id, i) - 2; };
        var x2ForLegendTile = function (id, i) { return xForLegend(id, i) - 2 + config.legend_item_tile_width; };
        var yForLegendText = function (id, i) { return yForLegend(id, i) + 9; };
        var yForLegendRect = function (id, i) { return yForLegend(id, i) - 5; };
        var yForLegendTile = function (id, i) { return yForLegend(id, i) + 4; };
        var pos = -200;
        // Define g for legend area
        var l = legend.selectAll("." + CLASS.legendItem)
            .data(targetIdz)
            .enter()
            .append("g");
        $$.setLegendItem(l);
        l.append("text")
            .text(function (id) { return (isDefined(config.data_names[id]) ? config.data_names[id] : id); })
            .each(function (id, i) {
            updatePositions(this, id, i);
        })
            .style("pointer-events", "none")
            .attr("x", isLegendRightOrInset ? xForLegendText : pos)
            .attr("y", isLegendRightOrInset ? pos : yForLegendText);
        l.append("rect")
            .attr("class", CLASS.legendItemEvent)
            .style("fill-opacity", "0")
            .attr("x", isLegendRightOrInset ? xForLegendRect : pos)
            .attr("y", isLegendRightOrInset ? pos : yForLegendRect);
        var getColor = function (id) {
            var data = $$.getDataById(id);
            return $$.levelColor ?
                $$.levelColor(data.values[0].value) :
                $$.color(data);
        };
        var usePoint = config.legend_usePoint;
        if (usePoint) {
            var ids_2 = [];
            l.append(function (d) {
                var pattern = notEmpty(config.point_pattern) ?
                    config.point_pattern : [config.point_type];
                ids_2.indexOf(d) === -1 && ids_2.push(d);
                var point = pattern[ids_2.indexOf(d) % pattern.length];
                if (point === "rectangle") {
                    point = "rect";
                }
                return doc.createElementNS(namespaces.svg, ("hasValidPointType" in $$) && $$.hasValidPointType(point) ? point : "use");
            })
                .attr("class", CLASS.legendItemPoint)
                .style("fill", getColor)
                .style("pointer-events", "none")
                .attr("href", function (data, idx, selection) {
                var node = selection[idx];
                var nodeName = node.nodeName.toLowerCase();
                return nodeName === "use" ? "#" + state.datetimeId + "-point-" + data : undefined;
            });
        }
        else {
            l.append("line")
                .attr("class", CLASS.legendItemTile)
                .style("stroke", getColor)
                .style("pointer-events", "none")
                .attr("x1", isLegendRightOrInset ? x1ForLegendTile : pos)
                .attr("y1", isLegendRightOrInset ? pos : yForLegendTile)
                .attr("x2", isLegendRightOrInset ? x2ForLegendTile : pos)
                .attr("y2", isLegendRightOrInset ? pos : yForLegendTile)
                .attr("stroke-width", config.legend_item_tile_height);
        }
        // Set background for inset legend
        background = legend.select("." + CLASS.legendBackground + " rect");
        if (state.isLegendInset && maxWidth > 0 && background.size() === 0) {
            background = legend.insert("g", "." + CLASS.legendItem)
                .attr("class", CLASS.legendBackground)
                .append("rect");
        }
        var texts = legend.selectAll("text")
            .data(targetIdz)
            .text(function (id) { return (isDefined(config.data_names[id]) ? config.data_names[id] : id); }) // MEMO: needed for update
            .each(function (id, i) {
            updatePositions(this, id, i);
        });
        (withTransition ? texts.transition() : texts)
            .attr("x", xForLegendText)
            .attr("y", yForLegendText);
        var rects = legend.selectAll("rect." + CLASS.legendItemEvent)
            .data(targetIdz);
        (withTransition ? rects.transition() : rects)
            .attr("width", function (id) { return widths[id]; })
            .attr("height", function (id) { return heights[id]; })
            .attr("x", xForLegendRect)
            .attr("y", yForLegendRect);
        if (usePoint) {
            var tiles = legend.selectAll("." + CLASS.legendItemPoint)
                .data(targetIdz);
            (withTransition ? tiles.transition() : tiles)
                .each(function () {
                var nodeName = this.nodeName.toLowerCase();
                var pointR = config.point_r;
                var x = "x";
                var y = "y";
                var xOffset = 2;
                var yOffset = 2.5;
                var radius;
                var width;
                var height;
                if (nodeName === "circle") {
                    var size = pointR * 0.2;
                    x = "cx";
                    y = "cy";
                    radius = pointR + size;
                    xOffset = pointR * 2;
                    yOffset = -size;
                }
                else if (nodeName === "rect") {
                    var size = pointR * 2.5;
                    width = size;
                    height = size;
                    yOffset = 3;
                }
                select(this)
                    .attr(x, function (d) { return x1ForLegendTile(d) + xOffset; })
                    .attr(y, function (d) { return yForLegendTile(d) - yOffset; })
                    .attr("r", radius)
                    .attr("width", width)
                    .attr("height", height);
            });
        }
        else {
            var tiles = legend.selectAll("line." + CLASS.legendItemTile)
                .data(targetIdz);
            (withTransition ? tiles.transition() : tiles)
                .style("stroke", getColor)
                .attr("x1", x1ForLegendTile)
                .attr("y1", yForLegendTile)
                .attr("x2", x2ForLegendTile)
                .attr("y2", yForLegendTile);
        }
        if (background) {
            (withTransition ? background.transition() : background)
                .attr("height", $$.getLegendHeight() - 12)
                .attr("width", maxWidth * (step + 1) + 10);
        }
        // Update all to reflect change of legend
        $$.updateLegendItemWidth(maxWidth);
        $$.updateLegendItemHeight(maxHeight);
        $$.updateLegendStep(step);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var redraw = {
    redraw: function (options) {
        if (options === void 0) { options = {}; }
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var main = $el.main;
        state.redrawing = true;
        var targetsToShow = $$.filterTargetsToShow($$.data.targets);
        var initializing = options.initializing;
        var flow = options.flow;
        var wth = $$.getWithOption(options);
        var duration = wth.Transition ? config.transition_duration : 0;
        var durationForExit = wth.TransitionForExit ? duration : 0;
        var durationForAxis = wth.TransitionForAxis ? duration : 0;
        var transitions = $$.axis && $$.axis.generateTransitions(durationForAxis);
        $$.updateSizes(initializing);
        // update legend and transform each g
        if (wth.Legend && config.legend_show) {
            options.withTransition = !!duration;
            $$.updateLegend($$.mapToIds($$.data.targets), options, transitions);
        }
        else if (wth.Dimension) {
            // need to update dimension (e.g. axis.y.tick.values) because y tick values should change
            // no need to update axis in it because they will be updated in redraw()
            $$.updateDimension(true);
        }
        // update circleY based on updated parameters
        if (!$$.hasArcType() || state.hasRadar) {
            $$.updateCircleY && ($$.circleY = $$.updateCircleY());
        }
        // update axis
        if (state.hasAxis) {
            // @TODO: Make 'init' state to be accessible everywhere not passing as argument.
            $$.axis.redrawAxis(targetsToShow, wth, transitions, flow, initializing);
            // Data empty label positioning and text.
            config.data_empty_label_text && main.select("text." + CLASS.text + "." + CLASS.empty)
                .attr("x", state.width / 2)
                .attr("y", state.height / 2)
                .text(config.data_empty_label_text)
                .style("display", targetsToShow.length ? "none" : null);
            // grid
            $$.hasGrid() && $$.updateGrid(duration);
            // rect for regions
            config.regions.length && $$.updateRegion(duration);
            ["bar", "candlestick", "line", "area"].forEach(function (v) {
                var name = capitalize(v);
                if ((/^(line|area)$/.test(v) && $$.hasTypeOf(name)) || $$.hasType(v)) {
                    $$["update" + name](durationForExit);
                }
            });
            // circles for select
            $el.text && main.selectAll("." + CLASS.selectedCircles)
                .filter($$.isBarType.bind($$))
                .selectAll("circle")
                .remove();
            // event rects will redrawn when flow called
            if (config.interaction_enabled && !flow && wth.EventRect) {
                $$.redrawEventRect();
                $$.bindZoomEvent && $$.bindZoomEvent();
            }
        }
        else {
            // arc
            $el.arcs && $$.redrawArc(duration, durationForExit, wth.Transform);
            // radar
            $el.radar && $$.redrawRadar(durationForExit);
        }
        // @TODO: Axis & Radar type
        if (!state.resizing && ($$.hasPointType() || state.hasRadar)) {
            $$.updateCircle();
        }
        // text
        $$.hasDataLabel() && !$$.hasArcType(null, ["radar"]) && $$.updateText(durationForExit);
        // title
        $$.redrawTitle && $$.redrawTitle();
        initializing && $$.updateTypesElements();
        $$.generateRedrawList(targetsToShow, flow, duration, wth.Subchart);
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
    generateRedrawList: function (targets, flow, duration, withSubchart) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var shape = $$.getDrawShape();
        if (state.hasAxis) {
            // subchart
            config.subchart_show && $$.redrawSubchart(withSubchart, duration, shape);
        }
        // generate flow
        var flowFn = flow && $$.generateFlow({
            targets: targets,
            flow: flow,
            duration: flow.duration,
            shape: shape,
            xv: $$.xv.bind($$)
        });
        var isTransition = (duration || flowFn) && isTabVisible();
        // redraw list
        var redrawList = $$.getRedrawList(shape, flow, flowFn, isTransition);
        // callback function after redraw ends
        var afterRedraw = flow || config.onrendered ? function () {
            flowFn && flowFn();
            state.redrawing = false;
            callFn(config.onrendered, $$.api);
        } : null;
        if (afterRedraw) {
            // Only use transition when current tab is visible.
            if (isTransition && redrawList.length) {
                // Wait for end of transitions for callback
                var waitForDraw_1 = generateWait();
                // transition should be derived from one transition
                transition().duration(duration)
                    .each(function () {
                    redrawList
                        .reduce(function (acc, t1) { return acc.concat(t1); }, [])
                        .forEach(function (t) { return waitForDraw_1.add(t); });
                })
                    .call(waitForDraw_1, afterRedraw);
            }
            else if (!state.transiting) {
                afterRedraw();
            }
        }
        // update fadein condition
        $$.mapToIds($$.data.targets).forEach(function (id) {
            state.withoutFadeIn[id] = true;
        });
    },
    getRedrawList: function (shape, flow, flowFn, isTransition) {
        var $$ = this;
        var config = $$.config, _a = $$.state, hasAxis = _a.hasAxis, hasRadar = _a.hasRadar, grid = $$.$el.grid;
        var _b = shape.pos, cx = _b.cx, cy = _b.cy, xForText = _b.xForText, yForText = _b.yForText;
        var list = [];
        if (hasAxis) {
            if (config.grid_x_lines.length || config.grid_y_lines.length) {
                list.push($$.redrawGrid(isTransition));
            }
            if (config.regions.length) {
                list.push($$.redrawRegion(isTransition));
            }
            Object.keys(shape.type).forEach(function (v) {
                var name = capitalize(v);
                var drawFn = shape.type[v];
                if ((/^(area|line)$/.test(v) && $$.hasTypeOf(name)) || $$.hasType(v)) {
                    list.push($$["redraw" + name](drawFn, isTransition));
                }
            });
            !flow && grid.main && list.push($$.updateGridFocus());
        }
        if (!$$.hasArcType() || hasRadar) {
            notEmpty(config.data_labels) && config.data_labels !== false &&
                list.push($$.redrawText(xForText, yForText, flow, isTransition));
        }
        if (($$.hasPointType() || hasRadar) && !config.point_focus_only) {
            $$.redrawCircle && list.push($$.redrawCircle(cx, cy, isTransition, flowFn));
        }
        return list;
    },
    updateAndRedraw: function (options) {
        if (options === void 0) { options = {}; }
        var $$ = this;
        var config = $$.config, state = $$.state;
        var transitions;
        // same with redraw
        options.withTransition = getOption(options, "withTransition", true);
        options.withTransform = getOption(options, "withTransform", false);
        options.withLegend = getOption(options, "withLegend", false);
        // NOT same with redraw
        options.withUpdateXDomain = true;
        options.withUpdateOrgXDomain = true;
        options.withTransitionForExit = false;
        options.withTransitionForTransform = getOption(options, "withTransitionForTransform", options.withTransition);
        // MEMO: called in updateLegend in redraw if withLegend
        if (!(options.withLegend && config.legend_show)) {
            if (state.hasAxis) {
                transitions = $$.axis.generateTransitions(options.withTransitionForAxis ? config.transition_duration : 0);
            }
            // Update scales
            $$.updateScales();
            $$.updateSvgSize();
            // Update g positions
            $$.transformAll(options.withTransitionForTransform, transitions);
        }
        // Draw with new sizes & scales
        $$.redraw(options, transitions);
    },
    redrawWithoutRescale: function () {
        this.redraw({
            withY: false,
            withSubchart: false,
            withEventRect: false,
            withTransitionForAxis: false
        });
    }
};

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
    if (type === void 0) { type = "linear"; }
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    var scale = ({
        linear: scaleLinear,
        log: scaleSymlog,
        _log: scaleLog,
        time: scaleTime
    })[type]();
    scale.type = type;
    /_?log/.test(type) && scale.clamp(true);
    return scale.range([min, max]);
}
var scale = {
    /**
     * Get x Axis scale function
     * @param {number} min Min value
     * @param {number} max Max value
     * @param {Array} domain Domain value
     * @param {Function} offset The offset getter to be sum
     * @returns {Function} scale
     * @private
     */
    getXScale: function (min, max, domain, offset) {
        var $$ = this;
        var scale = $$.scale.zoom || getScale($$.axis.getAxisType("x"), min, max);
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
    getYScale: function (id, min, max, domain) {
        var $$ = this;
        var scale = getScale($$.axis.getAxisType(id), min, max);
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
    getYScaleById: function (id, isSub) {
        if (isSub === void 0) { isSub = false; }
        var isY2 = this.axis.getId(id) === "y2";
        var key = isSub ? (isY2 ? "subY2" : "subY") : (isY2 ? "y2" : "y");
        return this.scale[key];
    },
    /**
     * Get customized scale
     * @param {d3.scaleLinear|d3.scaleTime} scaleValue Scale function
     * @param {Function} offsetValue Offset getter to be sum
     * @returns {Function} Scale function
     * @private
     */
    getCustomizedScale: function (scaleValue, offsetValue) {
        var $$ = this;
        var offset = offsetValue || (function () { return $$.axis.x.tickOffset(); });
        var scale = function (d, raw) {
            var v = scaleValue(d) + offset();
            return raw ? v : Math.ceil(v);
        };
        // copy original scale methods
        for (var key in scaleValue) {
            scale[key] = scaleValue[key];
        }
        scale.orgDomain = function () { return scaleValue.domain(); };
        scale.orgScale = function () { return scaleValue; };
        // define custom domain() for categorized axis
        if ($$.axis.isCategorized()) {
            scale.domain = function (domainValue) {
                var domain = domainValue;
                if (!arguments.length) {
                    domain = this.orgDomain();
                    return [domain[0], domain[1] + 1];
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
    updateScales: function (isInit, updateXDomain) {
        if (updateXDomain === void 0) { updateXDomain = true; }
        var $$ = this;
        var axis = $$.axis, config = $$.config, format = $$.format, org = $$.org, scale = $$.scale, _a = $$.state, width = _a.width, height = _a.height, width2 = _a.width2, height2 = _a.height2, hasAxis = _a.hasAxis;
        if (hasAxis) {
            var isRotated = config.axis_rotated;
            // update edges
            var min = {
                x: isRotated ? 1 : 0,
                y: isRotated ? 0 : height,
                subX: isRotated ? 1 : 0,
                subY: isRotated ? 0 : height2
            };
            var max = {
                x: isRotated ? height : width,
                y: isRotated ? width : 1,
                subX: isRotated ? height : width,
                subY: isRotated ? width2 : 1
            };
            // update scales
            // x Axis
            var xDomain = updateXDomain && scale.x && scale.x.orgDomain();
            var xSubDomain = updateXDomain && org.xDomain;
            scale.x = $$.getXScale(min.x, max.x, xDomain, function () { return axis.x.tickOffset(); });
            scale.subX = $$.getXScale(min.x, max.x, xSubDomain, function (d) { return (d % 1 ? 0 : axis.subX.tickOffset()); });
            format.xAxisTick = axis.getXAxisTickFormat();
            axis.setAxis("x", scale.x, config.axis_x_tick_outer, isInit);
            if (config.subchart_show) {
                axis.setAxis("subX", scale.subX, config.axis_x_tick_outer, isInit);
            }
            // y Axis
            scale.y = $$.getYScale("y", min.y, max.y, scale.y ? scale.y.domain() : config.axis_y_default);
            scale.subY = $$.getYScale("y", min.subY, max.subY, scale.subY ? scale.subY.domain() : config.axis_y_default);
            axis.setAxis("y", scale.y, config.axis_y_tick_outer, isInit);
            // y2 Axis
            if (config.axis_y2_show) {
                scale.y2 = $$.getYScale("y2", min.y, max.y, scale.y2 ? scale.y2.domain() : config.axis_y2_default);
                scale.subY2 = $$.getYScale("y2", min.subY, max.subY, scale.subY2 ? scale.subY2.domain() : config.axis_y2_default);
                axis.setAxis("y2", scale.y2, config.axis_y2_tick_outer, isInit);
            }
        }
        else {
            // update for arc
            $$.updateArc && $$.updateArc();
        }
    },
    /**
     * Get the zoom or unzoomed scaled value
     * @param {Date|number|object} d Data value
     * @returns {number|null}
     * @private
     */
    xx: function (d) {
        var $$ = this;
        var config = $$.config, _a = $$.scale, x = _a.x, zoom = _a.zoom;
        var fn = config.zoom_enabled && zoom ?
            zoom : x;
        return d ? fn(isValue(d.x) ? d.x : d) : null;
    },
    xv: function (d) {
        var $$ = this;
        var axis = $$.axis, config = $$.config, x = $$.scale.x;
        var value = $$.getBaseValue(d);
        if (axis.isTimeSeries()) {
            value = parseDate.call($$, value);
        }
        else if (axis.isCategorized() && isString(value)) {
            value = config.axis_x_categories.indexOf(value);
        }
        return Math.ceil(x(value));
    },
    yv: function (d) {
        var $$ = this;
        var _a = $$.scale, y = _a.y, y2 = _a.y2;
        var yScale = d.axis && d.axis === "y2" ? y2 : y;
        return Math.ceil(yScale($$.getBaseValue(d)));
    },
    subxx: function (d) {
        return d ? this.scale.subX(d.x) : null;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shape = {
    /**
     * Get the shape draw function
     * @returns {object}
     * @private
     */
    getDrawShape: function () {
        var $$ = this;
        var isRotated = $$.config.axis_rotated;
        var hasRadar = $$.state.hasRadar;
        var shape = { type: {}, indices: {}, pos: {} };
        ["bar", "candlestick", "line", "area"].forEach(function (v) {
            var name = capitalize(/^(bubble|scatter)$/.test(v) ? "line" : v);
            if ($$.hasType(v) || $$.hasTypeOf(name) || (v === "line" && ($$.hasType("bubble") || $$.hasType("scatter")))) {
                var indices = $$.getShapeIndices($$["is" + name + "Type"]);
                var drawFn = $$["generateDraw" + name];
                shape.indices[v] = indices;
                shape.type[v] = drawFn ? drawFn.bind($$)(indices, false) : undefined;
            }
        });
        if (!$$.hasArcType() || hasRadar) {
            // generate circle x/y functions depending on updated params
            var cx = hasRadar ? $$.radarCircleX : (isRotated ? $$.circleY : $$.circleX);
            var cy = hasRadar ? $$.radarCircleY : (isRotated ? $$.circleX : $$.circleY);
            shape.pos = {
                xForText: $$.generateXYForText(shape.indices, true),
                yForText: $$.generateXYForText(shape.indices, false),
                cx: (cx || function () { }).bind($$),
                cy: (cy || function () { }).bind($$)
            };
        }
        return shape;
    },
    getShapeIndices: function (typeFilter) {
        var $$ = this;
        var config = $$.config;
        var xs = config.data_xs;
        var hasXs = notEmpty(xs);
        var indices = {};
        var i = hasXs ? {} : 0;
        if (hasXs) {
            getUnique(Object.keys(xs).map(function (v) { return xs[v]; }))
                .forEach(function (v) {
                i[v] = 0;
                indices[v] = {};
            });
        }
        $$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$))
            .forEach(function (d) {
            var xKey = d.id in xs ? xs[d.id] : "";
            var ind = xKey ? indices[xKey] : indices;
            for (var j = 0, groups = void 0; (groups = config.data_groups[j]); j++) {
                if (groups.indexOf(d.id) < 0) {
                    continue;
                }
                for (var k = 0, row = void 0; (row = groups[k]); k++) {
                    if (row in ind) {
                        ind[d.id] = ind[row];
                        break;
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
     * @param {string} id Data id value
     * @returns {object} Indices object
     * @private
     */
    getIndices: function (indices, id) {
        var xs = this.config.data_xs;
        return notEmpty(xs) ?
            indices[xs[id]] : indices;
    },
    /**
     * Get indices max number
     * @param {object} indices Indices object
     * @returns {number} Max number
     * @private
     */
    getIndicesMax: function (indices) {
        return notEmpty(this.config.data_xs) ?
            // if is multiple xs, return total sum of xs' __max__ value
            Object.keys(indices)
                .map(function (v) { return indices[v].__max__ || 0; })
                .reduce(function (acc, curr) { return acc + curr; }) : indices.__max__;
    },
    getShapeX: function (offset, indices, isSub) {
        var $$ = this;
        var config = $$.config, scale = $$.scale;
        var currScale = isSub ? scale.subX : (scale.zoom || scale.x);
        var barPadding = config.bar_padding;
        var sum = function (p, c) { return p + c; };
        var halfWidth = isObjectType(offset) && (offset._$total.length ? offset._$total.reduce(sum) / 2 : 0);
        return function (d) {
            var ind = $$.getIndices(indices, d.id);
            var index = d.id in ind ? ind[d.id] : 0;
            var targetsNum = (ind.__max__ || 0) + 1;
            var x = 0;
            if (notEmpty(d.x)) {
                var xPos = currScale(d.x, true);
                if (halfWidth) {
                    x = xPos - (offset[d.id] || offset._$width) +
                        offset._$total.slice(0, index + 1).reduce(sum) -
                        halfWidth;
                }
                else {
                    x = xPos - (isNumber(offset) ? offset : offset._$width) * (targetsNum / 2 - index);
                }
            }
            // adjust x position for bar.padding optionq
            if (offset && x && targetsNum > 1 && barPadding) {
                if (index) {
                    x += barPadding * index;
                }
                if (targetsNum > 2) {
                    x -= (targetsNum - 1) * barPadding / 2;
                }
                else if (targetsNum === 2) {
                    x -= barPadding / 2;
                }
            }
            return x;
        };
    },
    getShapeY: function (isSub) {
        var $$ = this;
        var isStackNormalized = $$.isStackNormalized();
        return function (d) {
            var value = d.value;
            if (isNumber(d)) {
                value = d;
            }
            else if (isStackNormalized) {
                value = $$.getRatio("index", d, true);
            }
            else if ($$.isBubbleZType(d)) {
                value = $$.getBubbleZData(d.value, "y");
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
    getShapeYMin: function (id) {
        var $$ = this;
        var scale = $$.scale[$$.axis.getId(id)];
        var yMin = scale.domain()[0];
        return !$$.isGrouped(id) && yMin > 0 ? yMin : 0;
    },
    /**
     * Get Shape's offset data
     * @param {Function} typeFilter Type filter function
     * @returns {object}
     * @private
     */
    getShapeOffsetData: function (typeFilter) {
        var $$ = this;
        var targets = $$.orderTargets($$.filterTargetsToShow($$.data.targets.filter(typeFilter, $$)));
        var isStackNormalized = $$.isStackNormalized();
        var shapeOffsetTargets = targets.map(function (target) {
            var rowValues = target.values;
            var values = {};
            if ($$.isStepType(target)) {
                rowValues = $$.convertValuesToStep(rowValues);
            }
            var rowValueMapByXValue = rowValues.reduce(function (out, d) {
                var key = Number(d.x);
                out[key] = d;
                values[key] = isStackNormalized ? $$.getRatio("index", d, true) : d.value;
                return out;
            }, {});
            return {
                id: target.id,
                rowValues: rowValues,
                rowValueMapByXValue: rowValueMapByXValue,
                values: values
            };
        });
        var indexMapByTargetId = targets.reduce(function (out, _a, index) {
            var id = _a.id;
            out[id] = index;
            return out;
        }, {});
        return { indexMapByTargetId: indexMapByTargetId, shapeOffsetTargets: shapeOffsetTargets };
    },
    getShapeOffset: function (typeFilter, indices, isSub) {
        var $$ = this;
        var _a = $$.getShapeOffsetData(typeFilter), shapeOffsetTargets = _a.shapeOffsetTargets, indexMapByTargetId = _a.indexMapByTargetId;
        return function (d, idx) {
            var ind = $$.getIndices(indices, d.id);
            var scale = $$.getYScaleById(d.id, isSub);
            var y0 = scale($$.getShapeYMin(d.id));
            var dataXAsNumber = Number(d.x);
            var offset = y0;
            shapeOffsetTargets
                .filter(function (t) { return t.id !== d.id; })
                .forEach(function (t) {
                if (ind[t.id] === ind[d.id] && indexMapByTargetId[t.id] < indexMapByTargetId[d.id]) {
                    var row = t.rowValues[idx];
                    // check if the x values line up
                    if (!row || Number(row.x) !== dataXAsNumber) {
                        row = t.rowValueMapByXValue[dataXAsNumber];
                    }
                    if (row && row.value * d.value >= 0) {
                        offset += scale(t.values[dataXAsNumber]) - y0;
                    }
                }
            });
            return offset;
        };
    },
    getBarW: function (type, axis, targetsNum) {
        var $$ = this;
        var config = $$.config, org = $$.org, scale = $$.scale;
        var maxDataCount = $$.getMaxDataCount();
        var isGrouped = type === "bar" && config.data_groups.length;
        var configName = type + "_width";
        var tickInterval = scale.zoom && !$$.axis.isCategorized() ?
            (org.xDomain.map(function (v) { return scale.zoom(v); })
                .reduce(function (a, c) { return Math.abs(a) + c; }) / maxDataCount) : axis.tickInterval(maxDataCount);
        var getWidth = function (id) {
            var width = id ? config[configName][id] : config[configName];
            var ratio = id ? width.ratio : config[configName + "_ratio"];
            var max = id ? width.max : config[configName + "_max"];
            var w = isNumber(width) ?
                width : targetsNum ? (tickInterval * ratio) / targetsNum : 0;
            return max && w > max ? max : w;
        };
        var result = getWidth();
        if (!isGrouped && isObjectType(config[configName])) {
            result = { _$width: result, _$total: [] };
            $$.filterTargetsToShow($$.data.targets).forEach(function (v) {
                if (config[configName][v.id]) {
                    result[v.id] = getWidth(v.id);
                    result._$total.push(result[v.id] || result._$width);
                }
            });
        }
        return result;
    },
    isWithinShape: function (that, d) {
        var $$ = this;
        var shape = select(that);
        var isWithin;
        if (!$$.isTargetToShow(d.id)) {
            isWithin = false;
        }
        else if (("hasValidPointType" in $$) && $$.hasValidPointType(that.nodeName)) {
            isWithin = $$.isStepType(d) ?
                $$.isWithinStep(that, $$.getYScaleById(d.id)(d.value)) :
                $$.isWithinCircle(that, $$.isBubbleType(d) ? $$.pointSelectR(d) * 1.5 : 0);
        }
        else if (that.nodeName === "path") {
            isWithin = shape.classed(CLASS.bar) ? $$.isWithinBar(that) : true;
        }
        return isWithin;
    },
    getInterpolate: function (d) {
        var $$ = this;
        var interpolation = $$.getInterpolateType(d);
        return {
            "basis": curveBasis,
            "basis-closed": curveBasisClosed,
            "basis-open": curveBasisOpen,
            "bundle": curveBundle,
            "cardinal": curveCardinal,
            "cardinal-closed": curveCardinalClosed,
            "cardinal-open": curveCardinalOpen,
            "catmull-rom": curveCatmullRom,
            "catmull-rom-closed": curveCatmullRomClosed,
            "catmull-rom-open": curveCatmullRomOpen,
            "monotone-x": curveMonotoneX,
            "monotone-y": curveMonotoneY,
            "natural": curveNatural,
            "linear-closed": curveLinearClosed,
            "linear": curveLinear,
            "step": curveStep,
            "step-after": curveStepAfter,
            "step-before": curveStepBefore
        }[interpolation];
    },
    getInterpolateType: function (d) {
        var $$ = this;
        var config = $$.config;
        var type = config.spline_interpolation_type;
        var interpolation = $$.isInterpolationType(type) ? type : "cardinal";
        return $$.isSplineType(d) ?
            interpolation : ($$.isStepType(d) ?
            config.line_step_type : "linear");
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var size = {
    /**
     * Update container size
     * @private
     */
    setContainerSize: function () {
        var $$ = this;
        var state = $$.state;
        state.current.width = $$.getCurrentWidth();
        state.current.height = $$.getCurrentHeight();
    },
    getCurrentWidth: function () {
        var $$ = this;
        return $$.config.size_width || $$.getParentWidth();
    },
    getCurrentHeight: function () {
        var $$ = this;
        var config = $$.config;
        var h = config.size_height || $$.getParentHeight();
        return h > 0 ? h : 320 / ($$.hasType("gauge") && !config.gauge_fullCircle ? 2 : 1);
    },
    getCurrentPaddingTop: function () {
        var $$ = this;
        var config = $$.config, hasAxis = $$.state.hasAxis, $el = $$.$el;
        var axesLen = hasAxis ? config.axis_y2_axes.length : 0;
        var padding = isValue(config.padding_top) ?
            config.padding_top : 0;
        if ($el.title && $el.title.node()) {
            padding += $$.getTitlePadding();
        }
        if (axesLen && config.axis_rotated) {
            padding += $$.getHorizontalAxisHeight("y2") * axesLen;
        }
        return padding;
    },
    getCurrentPaddingBottom: function () {
        var $$ = this;
        var config = $$.config, hasAxis = $$.state.hasAxis;
        var axisId = config.axis_rotated ? "y" : "x";
        var axesLen = hasAxis ? config["axis_" + axisId + "_axes"].length : 0;
        var padding = isValue(config.padding_bottom) ?
            config.padding_bottom : 0;
        return padding + (axesLen ? $$.getHorizontalAxisHeight(axisId) * axesLen : 0);
    },
    getCurrentPaddingLeft: function (withoutRecompute) {
        var $$ = this;
        var config = $$.config, hasAxis = $$.state.hasAxis;
        var isRotated = config.axis_rotated;
        var axisId = isRotated ? "x" : "y";
        var axesLen = hasAxis ? config["axis_" + axisId + "_axes"].length : 0;
        var axisWidth = hasAxis ? $$.getAxisWidthByAxisId(axisId, withoutRecompute) : 0;
        var padding;
        if (isValue(config.padding_left)) {
            padding = config.padding_left;
        }
        else if (hasAxis && isRotated) {
            padding = !config.axis_x_show ?
                1 : Math.max(ceil10(axisWidth), 40);
        }
        else if (hasAxis && (!config.axis_y_show || config.axis_y_inner)) { // && !config.axis_rotated
            padding = $$.axis.getAxisLabelPosition("y").isOuter ? 30 : 1;
        }
        else {
            padding = ceil10(axisWidth);
        }
        return padding + (axisWidth * axesLen);
    },
    getCurrentPaddingRight: function (withXAxisTickTextOverflow) {
        if (withXAxisTickTextOverflow === void 0) { withXAxisTickTextOverflow = false; }
        var $$ = this;
        var config = $$.config, hasAxis = $$.state.hasAxis;
        var defaultPadding = 10;
        var legendWidthOnRight = $$.state.isLegendRight ? $$.getLegendWidth() + 20 : 0;
        var axesLen = hasAxis ? config.axis_y2_axes.length : 0;
        var axisWidth = hasAxis ? $$.getAxisWidthByAxisId("y2") : 0;
        var xAxisTickTextOverflow = withXAxisTickTextOverflow ?
            $$.axis.getXAxisTickTextY2Overflow(defaultPadding) : 0;
        var padding;
        if (isValue(config.padding_right)) {
            padding = config.padding_right + 1; // 1 is needed not to hide tick line
        }
        else if ($$.axis && config.axis_rotated) {
            padding = defaultPadding + legendWidthOnRight;
        }
        else if ($$.axis && (!config.axis_y2_show || config.axis_y2_inner)) { // && !config.axis_rotated
            padding = Math.max(2 + legendWidthOnRight + ($$.axis.getAxisLabelPosition("y2").isOuter ? 20 : 0), xAxisTickTextOverflow);
        }
        else {
            padding = Math.max(ceil10(axisWidth) + legendWidthOnRight, xAxisTickTextOverflow);
        }
        return padding + (axisWidth * axesLen);
    },
    /**
     * Get the parent rect element's size
     * @param {string} key property/attribute name
     * @returns {number}
     * @private
     */
    getParentRectValue: function (key) {
        var offsetName = "offset" + capitalize(key);
        var parent = this.$el.chart.node();
        var v;
        while (!v && parent && parent.tagName !== "BODY") {
            try {
                v = parent.getBoundingClientRect()[key];
            }
            catch (e) {
                if (offsetName in parent) {
                    // In IE in certain cases getBoundingClientRect
                    // will cause an "unspecified error"
                    v = parent[offsetName];
                }
            }
            parent = parent.parentNode;
        }
        if (key === "width") {
            // Sometimes element's width value is incorrect(ex. flex container)
            // In this case, use body's offsetWidth instead.
            var bodyWidth = doc.body.offsetWidth;
            v > bodyWidth && (v = bodyWidth);
        }
        return v;
    },
    getParentWidth: function () {
        return this.getParentRectValue("width");
    },
    getParentHeight: function () {
        var h = this.$el.chart.style("height");
        return h.indexOf("px") > 0 ? parseInt(h, 10) : 0;
    },
    getSvgLeft: function (withoutRecompute) {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        var hasLeftAxisRect = config.axis_rotated || (!config.axis_rotated && !config.axis_y_inner);
        var leftAxisClass = config.axis_rotated ? CLASS.axisX : CLASS.axisY;
        var leftAxis = $el.main.select("." + leftAxisClass).node();
        var svgRect = leftAxis && hasLeftAxisRect ? leftAxis.getBoundingClientRect() : { right: 0 };
        var chartRect = $el.chart.node().getBoundingClientRect();
        var hasArc = $$.hasArcType();
        var svgLeft = svgRect.right - chartRect.left -
            (hasArc ? 0 : $$.getCurrentPaddingLeft(withoutRecompute));
        return svgLeft > 0 ? svgLeft : 0;
    },
    updateDimension: function (withoutAxis) {
        var $$ = this;
        var config = $$.config, hasAxis = $$.state.hasAxis, $el = $$.$el;
        if (hasAxis && !withoutAxis && $$.axis.x && config.axis_rotated) {
            $$.axis.subX && $$.axis.subX.create($el.axis.subX);
        }
        // pass 'withoutAxis' param to not animate at the init rendering
        $$.updateScales(withoutAxis);
        $$.updateSvgSize();
        $$.transformAll(false);
    },
    updateSvgSize: function () {
        var $$ = this;
        var _a = $$.state, clip = _a.clip, current = _a.current, hasAxis = _a.hasAxis, width = _a.width, height = _a.height, svg = $$.$el.svg;
        svg
            .attr("width", current.width)
            .attr("height", current.height);
        if (hasAxis) {
            var brush = svg.select("." + CLASS.brush + " .overlay");
            var brushSize = { width: 0, height: 0 };
            if (brush.size()) {
                brushSize.width = +brush.attr("width");
                brushSize.height = +brush.attr("height");
            }
            svg.selectAll(["#" + clip.id, "#" + clip.idGrid])
                .select("rect")
                .attr("width", width)
                .attr("height", height);
            svg.select("#" + clip.idXAxis)
                .select("rect")
                .call($$.setXAxisClipPath.bind($$));
            svg.select("#" + clip.idYAxis)
                .select("rect")
                .call($$.setYAxisClipPath.bind($$));
            clip.idSubchart && svg.select("#" + clip.idSubchart)
                .select("rect")
                .attr("width", width)
                .attr("height", brushSize.height);
        }
    },
    /**
     * Update size values
     * @param {boolean} isInit If is called at initialization
     * @private
     */
    updateSizes: function (isInit) {
        var $$ = this;
        var config = $$.config, state = $$.state, legend = $$.$el.legend;
        var isRotated = config.axis_rotated;
        var hasArc = $$.hasArcType();
        !isInit && $$.setContainerSize();
        var currLegend = {
            width: legend ? $$.getLegendWidth() : 0,
            height: legend ? $$.getLegendHeight() : 0
        };
        if (!hasArc && config.axis_x_show && config.axis_x_tick_autorotate) {
            $$.updateXAxisTickClip();
        }
        var legendHeightForBottom = state.isLegendRight || state.isLegendInset ? 0 : currLegend.height;
        var xAxisHeight = isRotated || hasArc ? 0 : $$.getHorizontalAxisHeight("x");
        var subchartXAxisHeight = config.subchart_axis_x_show && config.subchart_axis_x_tick_text_show ?
            xAxisHeight : 30;
        var subchartHeight = config.subchart_show && !hasArc ?
            (config.subchart_size_height + subchartXAxisHeight) : 0;
        // for main
        state.margin = !hasArc && isRotated ? {
            top: $$.getHorizontalAxisHeight("y2") + $$.getCurrentPaddingTop(),
            right: hasArc ? 0 : $$.getCurrentPaddingRight(true),
            bottom: $$.getHorizontalAxisHeight("y") + legendHeightForBottom + $$.getCurrentPaddingBottom(),
            left: subchartHeight + (hasArc ? 0 : $$.getCurrentPaddingLeft())
        } : {
            top: 4 + $$.getCurrentPaddingTop(),
            right: hasArc ? 0 : $$.getCurrentPaddingRight(true),
            bottom: xAxisHeight + subchartHeight + legendHeightForBottom + $$.getCurrentPaddingBottom(),
            left: hasArc ? 0 : $$.getCurrentPaddingLeft()
        };
        // for subchart
        state.margin2 = isRotated ? {
            top: state.margin.top,
            right: NaN,
            bottom: 20 + legendHeightForBottom,
            left: $$.state.rotatedPadding.left
        } : {
            top: state.current.height - subchartHeight - legendHeightForBottom,
            right: NaN,
            bottom: subchartXAxisHeight + legendHeightForBottom,
            left: state.margin.left
        };
        // for legend
        state.margin3 = {
            top: 0,
            right: NaN,
            bottom: 0,
            left: 0
        };
        $$.updateSizeForLegend && $$.updateSizeForLegend(currLegend);
        state.width = state.current.width - state.margin.left - state.margin.right;
        state.height = state.current.height - state.margin.top - state.margin.bottom;
        if (state.width < 0) {
            state.width = 0;
        }
        if (state.height < 0) {
            state.height = 0;
        }
        state.width2 = isRotated ?
            state.margin.left - state.rotatedPadding.left - state.rotatedPadding.right : state.width;
        state.height2 = isRotated ?
            state.height : state.current.height - state.margin2.top - state.margin2.bottom;
        if (state.width2 < 0) {
            state.width2 = 0;
        }
        if (state.height2 < 0) {
            state.height2 = 0;
        }
        // for arc
        var hasGauge = $$.hasType("gauge");
        var isLegendRight = config.legend_show && state.isLegendRight;
        state.arcWidth = state.width - (isLegendRight ? currLegend.width + 10 : 0);
        state.arcHeight = state.height - (isLegendRight && !hasGauge ? 0 : 10);
        if (hasGauge && !config.gauge_fullCircle) {
            state.arcHeight += state.height - $$.getPaddingBottomForGauge();
        }
        $$.updateRadius && $$.updateRadius();
        if (state.isLegendRight && hasArc) {
            state.margin3.left = state.arcWidth / 2 + state.radiusExpanded * 1.1;
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var text = {
    opacityForText: function (d) {
        var $$ = this;
        return $$.isBarType(d) && !$$.meetsLabelThreshold(Math.abs($$.getRatio("bar", d)), "bar") ? "0" : ($$.hasDataLabel ? "1" : "0");
    },
    /**
     * Initializes the text
     * @private
     */
    initText: function () {
        var $el = this.$el;
        $el.main.select("." + CLASS.chart).append("g")
            .attr("class", CLASS.chartTexts);
    },
    /**
     * Update chartText
     * @param {object} targets $$.data.targets
     * @private
     */
    updateTargetsForText: function (targets) {
        var $$ = this;
        var classChartText = $$.getChartClass("Text");
        var classTexts = $$.getClass("texts", "id");
        var classFocus = $$.classFocus.bind($$);
        var mainTextUpdate = $$.$el.main.select("." + CLASS.chartTexts).selectAll("." + CLASS.chartText)
            .data(targets)
            .attr("class", function (d) { return classChartText(d) + classFocus(d); });
        var mainTextEnter = mainTextUpdate.enter().append("g")
            .style("opacity", "0")
            .attr("class", classChartText)
            .style("pointer-events", "none");
        mainTextEnter.append("g")
            .attr("class", classTexts);
    },
    /**
     * Update text
     * @param {number} durationForExit Fade-out transition duration
     * @private
     */
    updateText: function (durationForExit) {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        var classText = $$.getClass("text", "index");
        var text = $el.main.selectAll("." + CLASS.texts)
            .selectAll("." + CLASS.text)
            .data($$.labelishData.bind($$));
        text.exit()
            .transition()
            .duration(durationForExit)
            .style("fill-opacity", "0")
            .remove();
        $el.text = text.enter()
            .append("text")
            .merge(text)
            .attr("class", classText)
            .attr("text-anchor", function (d) {
            // when value is negative or
            var isEndAnchor = d.value < 0;
            if ($$.isCandlestickType(d)) {
                var data = $$.getCandlestickData(d);
                isEndAnchor = data && !data._isUp;
            }
            return (config.axis_rotated ? (isEndAnchor ? "end" : "start") : "middle");
        })
            .style("fill", $$.updateTextColor.bind($$))
            .style("fill-opacity", "0")
            .each(function (d, i, j) {
            var node = select(this);
            var value = d.value;
            if ($$.isBubbleZType(d)) {
                value = $$.getBubbleZData(value, "z");
            }
            else if ($$.isCandlestickType(d)) {
                var data = $$.getCandlestickData(d);
                if (data) {
                    value = data.close;
                }
            }
            value = $$.dataLabelFormat(d.id)(value, d.id, i, j);
            if (isNumber(value)) {
                this.textContent = value;
            }
            else {
                setTextValue(node, value);
            }
        });
    },
    updateTextColor: function (d) {
        var $$ = this;
        var config = $$.config;
        var labelColors = config.data_labels_colors;
        var defaultColor = $$.isArcType(d) && !$$.isRadarType(d) ? null : $$.color(d);
        var color;
        if (isString(labelColors)) {
            color = labelColors;
        }
        else if (isObject(labelColors)) {
            var id = (d.data || d).id;
            color = labelColors[id];
        }
        else if (isFunction(labelColors)) {
            color = labelColors.bind($$.api)(defaultColor, d);
        }
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
     * Redraw chartText
     * @param {Function} x Positioning function for x
     * @param {Function} y Positioning function for y
     * @param {boolean} forFlow Weather is flow
     * @param {boolean} withTransition transition is enabled
     * @returns {Array}
     * @private
     */
    redrawText: function (x, y, forFlow, withTransition) {
        var $$ = this;
        var t = getRandom(true);
        $$.$el.text
            .style("fill", $$.updateTextColor.bind($$))
            .style("fill-opacity", forFlow ? 0 : $$.opacityForText.bind($$))
            .each(function (d, i) {
            // do not apply transition for newly added text elements
            var node = withTransition && this.getAttribute("x") ?
                select(this).transition(t) : select(this);
            var posX = x.bind(this)(d, i);
            var posY = y.bind(this)(d, i);
            // when is multiline
            if (this.childElementCount) {
                node.attr("transform", "translate(" + posX + " " + posY + ")");
            }
            else {
                node.attr("x", posX).attr("y", posY);
            }
        });
        // need to return 'true' as of being pushed to the redraw list
        // ref: getRedrawList()
        return true;
    },
    /**
     * Gets the getBoundingClientRect value of the element
     * @param {HTMLElement|d3.selection} element Target element
     * @param {string} className Class name
     * @returns {object} value of element.getBoundingClientRect()
     * @private
     */
    getTextRect: function (element, className) {
        var $$ = this;
        var base = (element.node ? element.node() : element);
        if (!/text/i.test(base.tagName)) {
            base = base.querySelector("text");
        }
        var text = base.textContent;
        var cacheKey = KEY.textRect + "-" + text.replace(/\W/g, "_");
        var rect = $$.cache.get(cacheKey);
        if (!rect) {
            $$.$el.svg.append("text")
                .style("visibility", "hidden")
                .style("font", select(base).style("font"))
                .classed(className, true)
                .text(text)
                .call(function (v) {
                rect = getBoundingRect(v.node());
            })
                .remove();
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
    generateXYForText: function (indices, forX) {
        var $$ = this;
        var types = Object.keys(indices);
        var points = {};
        var getter = forX ? $$.getXForText : $$.getYForText;
        $$.hasType("radar") && types.push("radar");
        types.forEach(function (v) {
            points[v] = $$["generateGet" + capitalize(v) + "Points"](indices[v], false);
        });
        return function (d, i) {
            var type = ($$.isAreaType(d) && "area") ||
                ($$.isBarType(d) && "bar") ||
                ($$.isCandlestickType(d) && "candlestick") ||
                ($$.isRadarType(d) && "radar") || "line";
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
    getCenteredTextPos: function (d, points, textElement) {
        var $$ = this;
        var config = $$.config;
        var isRotated = config.axis_rotated;
        if (config.data_labels.centered && $$.isBarType(d)) {
            var rect = getBoundingRect(textElement);
            var isPositive = d.value >= 0;
            if (isRotated) {
                var w = (isPositive ?
                    points[1][1] - points[0][1] :
                    points[0][1] - points[1][1]) / 2 + (rect.width / 2);
                return isPositive ? -w - 3 : w + 2;
            }
            else {
                var h = (isPositive ?
                    points[0][1] - points[1][1] :
                    points[1][1] - points[0][1]) / 2 + (rect.height / 2);
                return isPositive ? h : -h - 2;
            }
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
    getTextPos: function (id, type) {
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
    getXForText: function (points, d, textElement) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var isRotated = config.axis_rotated;
        var xPos = points[0][0];
        if ($$.hasType("candlestick")) {
            if (isRotated) {
                xPos = $$.getCandlestickData(d)._isUp ?
                    points[2][2] + 4 : points[2][1] - 4;
            }
            else {
                xPos += (points[1][0] - xPos) / 2;
            }
        }
        else {
            if (isRotated) {
                var padding = $$.isBarType(d) ? 4 : 6;
                xPos = points[2][1] + padding * (d.value < 0 ? -1 : 1);
            }
            else {
                xPos = $$.hasType("bar") ? (points[2][0] + points[0][0]) / 2 : xPos;
            }
        }
        // show labels regardless of the domain if value is null
        if (d.value === null) {
            if (xPos > state.width) {
                var width = getBoundingRect(textElement).width;
                xPos = state.width - width;
            }
            else if (xPos < 0) {
                xPos = 4;
            }
        }
        if (isRotated) {
            xPos += $$.getCenteredTextPos(d, points, textElement);
        }
        return xPos + $$.getTextPos(d.id, "x");
    },
    /**
     * Gets the y coordinate of the text
     * @param {object} points Data points position
     * @param {object} d Data object
     * @param {HTMLElement} textElement Data label text element
     * @returns {number} y coordinate
     * @private
     */
    getYForText: function (points, d, textElement) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var isRotated = config.axis_rotated;
        var r = config.point_r;
        var rect = getBoundingRect(textElement);
        var value = d.value;
        var baseY = 3;
        var yPos;
        if ($$.isCandlestickType(d)) {
            value = $$.getCandlestickData(d);
            if (isRotated) {
                yPos = points[0][0];
                yPos += ((points[1][0] - yPos) / 2) + baseY;
            }
            else {
                yPos = value && value._isUp ?
                    points[2][2] - baseY :
                    points[2][1] + (baseY * 4);
            }
        }
        else {
            if (isRotated) {
                yPos = (points[0][0] + points[2][0] + rect.height * 0.6) / 2;
            }
            else {
                yPos = points[2][1];
                if (isNumber(r) && r > 5 && ($$.isLineType(d) || $$.isScatterType(d))) {
                    baseY += config.point_r / 2.3;
                }
                if (value < 0 || (value === 0 && !state.hasPositiveValue && state.hasNegativeValue)) {
                    yPos += rect.height + ($$.isBarType(d) ? -baseY : baseY);
                }
                else {
                    var diff = -baseY * 2;
                    if ($$.isBarType(d)) {
                        diff = -baseY;
                    }
                    else if ($$.isBubbleType(d)) {
                        diff = baseY;
                    }
                    yPos += diff;
                }
            }
        }
        // show labels regardless of the domain if value is null
        if (d.value === null && !isRotated) {
            var boxHeight = rect.height;
            if (yPos < boxHeight) {
                yPos = boxHeight;
            }
            else if (yPos > state.height) {
                yPos = state.height - 4;
            }
        }
        if (!isRotated) {
            yPos += $$.getCenteredTextPos(d, points, textElement);
        }
        return yPos + $$.getTextPos(d.id, "y");
    },
    /**
     * Calculate if two or more text nodes are overlapping
     * Mark overlapping text nodes with "text-overlapping" class
     * @param {string} id Axis id
     * @param {ChartInternal} $$ ChartInternal context
     * @param {string} selector Selector string
     * @private
     */
    markOverlapped: function (id, $$, selector) {
        var textNodes = $$.$el.arcs.selectAll(selector);
        var filteredTextNodes = textNodes.filter(function (node) { return node.data.id !== id; });
        var textNode = textNodes.filter(function (node) { return node.data.id === id; });
        var translate = getTranslation(textNode.node());
        // Calculates the length of the hypotenuse
        var calcHypo = function (x, y) { return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); };
        textNode.node() && filteredTextNodes.each(function () {
            var coordinate = getTranslation(this);
            var filteredTextNode = select(this);
            var nodeForWidth = calcHypo(translate.e, translate.f) > calcHypo(coordinate.e, coordinate.f) ?
                textNode : filteredTextNode;
            var overlapsX = Math.ceil(Math.abs(translate.e - coordinate.e)) <
                Math.ceil(nodeForWidth.node().getComputedTextLength());
            var overlapsY = Math.ceil(Math.abs(translate.f - coordinate.f)) <
                parseInt(textNode.style("font-size"), 10);
            filteredTextNode.classed(CLASS.TextOverlapping, overlapsX && overlapsY);
        });
    },
    /**
     * Calculate if two or more text nodes are overlapping
     * Remove "text-overlapping" class on selected text nodes
     * @param {ChartInternal} $$ ChartInternal context
     * @param {string} selector Selector string
     * @private
     */
    undoMarkOverlapped: function ($$, selector) {
        $$.$el.arcs.selectAll(selector)
            .each(function () {
            selectAll([this, this.previousSibling])
                .classed(CLASS.TextOverlapping, false);
        });
    },
    /**
     * Check if meets the ratio to show data label text
     * @param {number} ratio ratio to meet
     * @param {string} type chart type
     * @returns {boolean}
     * @private
     */
    meetsLabelThreshold: function (ratio, type) {
        if (ratio === void 0) { ratio = 0; }
        var $$ = this;
        var config = $$.config;
        var threshold = config[type + "_label_threshold"] || 0;
        return ratio >= threshold;
    }
};

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
    if (pos === void 0) { pos = "left"; }
    var isNum = isNumber(width);
    var position;
    if (pos.indexOf("center") > -1) {
        position = isNum ? width / 2 : "middle";
    }
    else if (pos.indexOf("right") > -1) {
        position = isNum ? width : "end";
    }
    else {
        position = isNum ? 0 : "start";
    }
    return position;
}
var title = {
    /**
     * Initializes the title
     * @private
     */
    initTitle: function () {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        if (config.title_text) {
            $el.title = $el.svg.append("g");
            var text = $el.title
                .append("text")
                .style("text-anchor", getTextPos(config.title_position))
                .attr("class", CLASS.title);
            setTextValue(text, config.title_text, [0.3, 1.5]);
        }
    },
    /**
     * Redraw title
     * @private
     */
    redrawTitle: function () {
        var $$ = this;
        var config = $$.config, current = $$.state.current, title = $$.$el.title;
        if (title) {
            var y = $$.yForTitle.call($$);
            if (/g/i.test(title.node().tagName)) {
                title.attr("transform", "translate(" + getTextPos(config.title_position, current.width) + ", " + y + ")");
            }
            else {
                title.attr("x", $$.xForTitle.call($$)).attr("y", y);
            }
        }
    },
    /**
     * Returns the x attribute value of the title
     * @returns {number} x attribute value
     * @private
     */
    xForTitle: function () {
        var $$ = this;
        var config = $$.config, current = $$.state.current;
        var position = config.title_position || "left";
        var textRectWidth = $$.getTextRect($$.$el.title, CLASS.title).width;
        var x;
        if (/(right|center)/.test(position)) {
            x = current.width - textRectWidth;
            if (position.indexOf("right") >= 0) {
                x = current.width - textRectWidth - config.title_padding.right;
            }
            else if (position.indexOf("center") >= 0) {
                x = (current.width - textRectWidth) / 2;
            }
        }
        else { // left
            x = (config.title_padding.left || 0);
        }
        return x;
    },
    /**
     * Returns the y attribute value of the title
     * @returns {number} y attribute value
     * @private
     */
    yForTitle: function () {
        var $$ = this;
        return ($$.config.title_padding.top || 0) +
            $$.getTextRect($$.$el.title, CLASS.title).height;
    },
    /**
     * Get title padding
     * @returns {number} padding value
     * @private
     */
    getTitlePadding: function () {
        var $$ = this;
        return $$.yForTitle() + ($$.config.title_padding.bottom || 0);
    }
};

var tooltip$1 = {
    /**
     * Initializes the tooltip
     * @private
     */
    initTooltip: function () {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        $el.tooltip = select(config.tooltip_contents.bindto);
        if ($el.tooltip.empty()) {
            $el.tooltip = $el.chart
                .style("position", "relative")
                .append("div")
                .attr("class", CLASS.tooltipContainer)
                .style("position", "absolute")
                .style("pointer-events", "none")
                .style("display", "none");
        }
        $$.bindTooltipResizePos();
    },
    initShowTooltip: function () {
        var $$ = this;
        var config = $$.config, $el = $$.$el, _a = $$.state, hasAxis = _a.hasAxis, hasRadar = _a.hasRadar;
        // Show tooltip if needed
        if (config.tooltip_init_show) {
            var isArc_1 = !(hasAxis && hasRadar);
            if ($$.axis && $$.axis.isTimeSeries() && isString(config.tooltip_init_x)) {
                var targets = $$.data.targets[0];
                var i = void 0;
                var val = void 0;
                config.tooltip_init_x = parseDate.call($$, config.tooltip_init_x);
                for (i = 0; (val = targets.values[i]); i++) {
                    if ((val.x - config.tooltip_init_x) === 0) {
                        break;
                    }
                }
                config.tooltip_init_x = i;
            }
            var data = $$.data.targets.map(function (d) {
                var x = isArc_1 ? 0 : config.tooltip_init_x;
                return $$.addName(d.values[x]);
            });
            if (isArc_1) {
                data = [data[config.tooltip_init_x]];
            }
            $el.tooltip.html($$.getTooltipHTML(data, $$.axis && $$.axis.getXAxisTickFormat(), $$.getYFormat($$.hasArcType(null, ["radar"])), $$.color));
            if (!config.tooltip_contents.bindto) {
                $el.tooltip.style("top", config.tooltip_init_position.top)
                    .style("left", config.tooltip_init_position.left)
                    .style("display", "block");
            }
        }
    },
    /**
     * Get the tooltip HTML string
     * @param  {Array} args Arguments
     * @returns {string} Formatted HTML string
     * @private
     */
    getTooltipHTML: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var $$ = this;
        var api = $$.api, config = $$.config;
        return isFunction(config.tooltip_contents) ? config.tooltip_contents.bind(api).apply(void 0, args) : $$.getTooltipContent.apply($$, args);
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
    getTooltipContent: function (d, defaultTitleFormat, defaultValueFormat, color) {
        var $$ = this;
        var api = $$.api, config = $$.config, state = $$.state;
        var _a = ["title", "name", "value"].map(function (v) {
            var fn = config["tooltip_format_" + v];
            return isFunction(fn) ? fn.bind(api) : fn;
        }), titleFormat = _a[0], nameFormat = _a[1], valueFormat = _a[2];
        titleFormat = titleFormat || defaultTitleFormat;
        nameFormat = nameFormat || (function (name) { return name; });
        valueFormat = valueFormat || ($$.isStackNormalized() ? function (v, ratio) { return (ratio * 100).toFixed(2) + "%"; } : defaultValueFormat);
        var order = config.tooltip_order;
        var getRowValue = function (row) { return ($$.axis && $$.isBubbleZType(row) ? $$.getBubbleZData(row.value, "z") : $$.getBaseValue(row)); };
        var getBgColor = $$.levelColor ? function (row) { return $$.levelColor(row.value); } : function (row) { return color(row); };
        var contents = config.tooltip_contents;
        var tplStr = contents.template;
        var targetIds = $$.mapToTargetIds();
        if (order === null && config.data_groups.length) {
            // for stacked data, order should aligned with the visually displayed data
            var ids_1 = $$.orderTargets($$.data.targets)
                .map(function (i2) { return i2.id; })
                .reverse();
            d.sort(function (a, b) {
                var v1 = a ? a.value : null;
                var v2 = b ? b.value : null;
                if (v1 > 0 && v2 > 0) {
                    v1 = a.id ? ids_1.indexOf(a.id) : null;
                    v2 = b.id ? ids_1.indexOf(b.id) : null;
                }
                return v1 - v2;
            });
        }
        else if (/^(asc|desc)$/.test(order)) {
            var isAscending_1 = order === "asc";
            d.sort(function (a, b) {
                var v1 = a ? getRowValue(a) : null;
                var v2 = b ? getRowValue(b) : null;
                return isAscending_1 ? v1 - v2 : v2 - v1;
            });
        }
        else if (isFunction(order)) {
            d.sort(order.bind(api));
        }
        var tpl = $$.getTooltipContentTemplate(tplStr);
        var len = d.length;
        var text;
        var row;
        var param;
        var value;
        var i;
        var _loop_1 = function () {
            row = d[i];
            if (!row || !(getRowValue(row) || getRowValue(row) === 0)) {
                return "continue";
            }
            if (isUndefined(text)) {
                var title = (state.hasAxis || state.hasRadar) &&
                    sanitise(titleFormat ? titleFormat(row.x) : row.x);
                text = tplProcess(tpl[0], {
                    CLASS_TOOLTIP: CLASS.tooltip,
                    TITLE: isValue(title) ? (tplStr ? title : "<tr><th colspan=\"2\">" + title + "</th></tr>") : ""
                });
            }
            if (!row.ratio && $$.$el.arcs) {
                row.ratio = $$.getRatio("arc", $$.$el.arcs.select("path." + CLASS.arc + "-" + row.id).data()[0]);
            }
            param = [row.ratio, row.id, row.index, d];
            value = sanitise(valueFormat.apply(void 0, __spreadArray([getRowValue(row)], param)));
            if ($$.isAreaRangeType(row)) {
                var _b = ["high", "low"].map(function (v) { return sanitise(valueFormat.apply(void 0, __spreadArray([$$.getRangedData(row, v)], param))); }), high = _b[0], low = _b[1];
                value = "<b>Mid:</b> " + value + " <b>High:</b> " + high + " <b>Low:</b> " + low;
            }
            else if ($$.isCandlestickType(row)) {
                var _c = ["open", "high", "low", "close", "volume"].map(function (v) { return sanitise(valueFormat.apply(void 0, __spreadArray([$$.getRangedData(row, v, "candlestick")], param))); }), open_1 = _c[0], high = _c[1], low = _c[2], close_1 = _c[3], volume = _c[4];
                value = "<b>Open:</b> " + open_1 + " <b>High:</b> " + high + " <b>Low:</b> " + low + " <b>Close:</b> " + close_1 + (volume ? " <b>Volume:</b> " + volume : "");
            }
            if (value !== undefined) {
                // Skip elements when their name is set to null
                if (row.name === null) {
                    return "continue";
                }
                var name_1 = sanitise(nameFormat.apply(void 0, __spreadArray([row.name], param)));
                var color_1 = getBgColor(row);
                var contentValue_1 = {
                    CLASS_TOOLTIP_NAME: CLASS.tooltipName + $$.getTargetSelectorSuffix(row.id),
                    COLOR: (tplStr || !$$.patterns) ? color_1 : "<svg><rect style=\"fill:" + color_1 + "\" width=\"10\" height=\"10\"></rect></svg>",
                    NAME: name_1,
                    VALUE: value
                };
                if (tplStr && isObject(contents.text)) {
                    var index_1 = targetIds.indexOf(row.id);
                    Object.keys(contents.text).forEach(function (key) {
                        contentValue_1[key] = contents.text[key][index_1];
                    });
                }
                text += tplProcess(tpl[1], contentValue_1);
            }
        };
        for (i = 0; i < len; i++) {
            _loop_1();
        }
        return text + "</table>";
    },
    /**
     * Get the content template string
     * @param {string} tplStr Tempalte string
     * @returns {Array} Template string
     * @private
     */
    getTooltipContentTemplate: function (tplStr) {
        return (tplStr || "<table class=\"{=CLASS_TOOLTIP}\"><tbody>\n\t\t\t\t{=TITLE}\n\t\t\t\t{{<tr class=\"{=CLASS_TOOLTIP_NAME}\">\n\t\t\t\t\t<td class=\"name\">" + (this.patterns ? "{=COLOR}" : "<span style=\"background-color:{=COLOR}\"></span>") + "{=NAME}</td>\n\t\t\t\t\t<td class=\"value\">{=VALUE}</td>\n\t\t\t\t</tr>}}\n\t\t\t</tbody></table>")
            .replace(/(\r?\n|\t)/g, "")
            .split(/{{(.*)}}/);
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
    tooltipPosition: function (dataToShow, tWidth, tHeight, element) {
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state;
        var width = state.width, height = state.height, current = state.current, isLegendRight = state.isLegendRight, inputType = state.inputType, event = state.event;
        var hasGauge = $$.hasType("gauge") && !config.gauge_fullCircle;
        var svgLeft = $$.getSvgLeft(true);
        var chartRight = svgLeft + current.width - $$.getCurrentPaddingRight();
        var chartLeft = $$.getCurrentPaddingLeft(true);
        var size = 20;
        var _a = getPointer(event, element), x = _a[0], y = _a[1];
        // Determine tooltip position
        if ($$.hasArcType()) {
            var raw = inputType === "touch" || $$.hasType("radar");
            if (!raw) {
                y += hasGauge ? height : height / 2;
                x += (width - (isLegendRight ? $$.getLegendWidth() : 0)) / 2;
            }
        }
        else {
            var dataScale = scale.x(dataToShow[0].x);
            if (config.axis_rotated) {
                y = dataScale + size;
                x += svgLeft + 100;
                chartRight -= svgLeft;
            }
            else {
                y -= 5;
                x = svgLeft + chartLeft + size + ($$.zoomScale ? x : dataScale);
            }
        }
        // when tooltip left + tWidth > chart's width
        if ((x + tWidth + 15) > chartRight) {
            x -= tWidth + chartLeft;
        }
        if (y + tHeight > current.height) {
            y -= hasGauge ? tHeight * 3 : tHeight + 30;
        }
        var pos = { top: y, left: x };
        // make sure to not be positioned out of viewport
        Object.keys(pos).forEach(function (v) {
            if (pos[v] < 0) {
                pos[v] = 0;
            }
        });
        return pos;
    },
    /**
     * Show the tooltip
     * @param {object} selectedData Data object
     * @param {HTMLElement} element Tooltip element
     * @private
     */
    showTooltip: function (selectedData, element) {
        var $$ = this;
        var config = $$.config, state = $$.state, tooltip = $$.$el.tooltip;
        var bindto = config.tooltip_contents.bindto;
        var forArc = $$.hasArcType(null, ["radar"]);
        var dataToShow = selectedData.filter(function (d) { return d && isValue($$.getBaseValue(d)); });
        if (!tooltip || dataToShow.length === 0 || !config.tooltip_show) {
            return;
        }
        var datum = tooltip.datum();
        var _a = datum || {}, _b = _a.width, width = _b === void 0 ? 0 : _b, _c = _a.height, height = _c === void 0 ? 0 : _c;
        var dataStr = JSON.stringify(selectedData);
        if (!datum || datum.current !== dataStr) {
            var index = selectedData.concat().sort()[0].index;
            callFn(config.tooltip_onshow, $$.api, selectedData);
            // set tooltip content
            tooltip
                .html($$.getTooltipHTML(selectedData, // data
            $$.axis ? $$.axis.getXAxisTickFormat() : $$.categoryName.bind($$), // defaultTitleFormat
            $$.getYFormat(forArc), // defaultValueFormat
            $$.color // color
            ))
                .style("display", null)
                .style("visibility", null) // for IE9
                .datum(datum = {
                index: index,
                current: dataStr,
                width: width = tooltip.property("offsetWidth"),
                height: height = tooltip.property("offsetHeight")
            });
            callFn(config.tooltip_onshown, $$.api, selectedData);
            $$._handleLinkedCharts(true, index);
        }
        if (!bindto) {
            var fnPos = config.tooltip_position || $$.tooltipPosition;
            // Get tooltip dimensions
            var pos_1 = fnPos.call(this, dataToShow, width, height, element);
            ["top", "left"].forEach(function (v) {
                var value = pos_1[v];
                tooltip.style(v, value + "px");
                // Remember left pos in percentage to be used on resize call
                if (v === "left" && !datum.xPosInPercent) {
                    datum.xPosInPercent = value / state.current.width * 100;
                }
            });
        }
    },
    /**
     * Adjust tooltip position on resize event
     * @private
     */
    bindTooltipResizePos: function () {
        var $$ = this;
        var resizeFunction = $$.resizeFunction, state = $$.state, tooltip = $$.$el.tooltip;
        resizeFunction.add(function () {
            if (tooltip.style("display") === "block") {
                var current = state.current;
                var _a = tooltip.datum(), width = _a.width, xPosInPercent = _a.xPosInPercent;
                var value = current.width / 100 * xPosInPercent;
                var diff = current.width - (value + width);
                // if tooltip size overs current viewport size
                if (diff < 0) {
                    value += diff;
                }
                tooltip.style("left", value + "px");
            }
        });
    },
    /**
     * Hide the tooltip
     * @param {boolean} force Force to hide
     * @private
     */
    hideTooltip: function (force) {
        var $$ = this;
        var api = $$.api, config = $$.config, tooltip = $$.$el.tooltip;
        if (tooltip && tooltip.style("display") !== "none" && (!config.tooltip_doNotHide || force)) {
            var selectedData = JSON.parse(tooltip.datum().current);
            callFn(config.tooltip_onhide, api, selectedData);
            // hide tooltip
            tooltip
                .style("display", "none")
                .style("visibility", "hidden") // for IE9
                .datum(null);
            callFn(config.tooltip_onhidden, api, selectedData);
        }
    },
    /**
     * Toggle display for linked chart instances
     * @param {boolean} show true: show, false: hide
     * @param {number} index x Axis index
     * @private
     */
    _handleLinkedCharts: function (show, index) {
        var $$ = this;
        var charts = $$.charts, config = $$.config, event = $$.state.event;
        // Prevent propagation among instances if isn't instantiated from the user's event
        // https://github.com/naver/billboard.js/issues/1979
        if (event && event.isTrusted && config.tooltip_linked && charts.length > 1) {
            var linkedName_1 = config.tooltip_linked_name;
            charts
                .filter(function (c) { return c !== $$.api; })
                .forEach(function (c) {
                var _a = c.internal, config = _a.config, $el = _a.$el;
                var isLinked = config.tooltip_linked;
                var name = config.tooltip_linked_name;
                var isInDom = doc.body.contains($el.chart.node());
                if (isLinked && linkedName_1 === name && isInDom) {
                    var data = $el.tooltip.data()[0];
                    var isNotSameIndex = index !== (data && data.index);
                    try {
                        c.tooltip[show && isNotSameIndex ? "show" : "hide"]({ index: index });
                    }
                    catch (e) { }
                }
            });
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var transform = {
    getTranslate: function (target, index) {
        if (index === void 0) { index = 0; }
        var $$ = this;
        var config = $$.config, state = $$.state;
        var isRotated = config.axis_rotated;
        var padding = 0;
        var x;
        var y;
        if (index && /^(x|y2?)$/.test(target)) {
            padding = $$.getAxisSize(target) * index;
        }
        if (target === "main") {
            x = asHalfPixel(state.margin.left);
            y = asHalfPixel(state.margin.top);
        }
        else if (target === "context") {
            x = asHalfPixel(state.margin2.left);
            y = asHalfPixel(state.margin2.top);
        }
        else if (target === "legend") {
            x = state.margin3.left;
            y = state.margin3.top;
        }
        else if (target === "x") {
            x = isRotated ? -padding : 0;
            y = isRotated ? 0 : state.height + padding;
        }
        else if (target === "y") {
            x = isRotated ? 0 : -padding;
            y = isRotated ? state.height + padding : 0;
        }
        else if (target === "y2") {
            x = isRotated ? 0 : state.width + padding;
            y = isRotated ? 1 - padding : 0;
        }
        else if (target === "subX") {
            x = 0;
            y = isRotated ? 0 : state.height2;
        }
        else if (target === "arc") {
            x = state.arcWidth / 2;
            y = state.arcHeight / 2;
        }
        else if (target === "radar") {
            var width = $$.getRadarSize()[0];
            x = state.width / 2 - width;
            y = asHalfPixel(state.margin.top);
        }
        return "translate(" + x + ", " + y + ")";
    },
    transformMain: function (withTransition, transitions) {
        var $$ = this;
        var main = $$.$el.main;
        var xAxis;
        var yAxis;
        var y2Axis;
        if (transitions && transitions.axisX) {
            xAxis = transitions.axisX;
        }
        else {
            xAxis = main.select("." + CLASS.axisX);
            if (withTransition) {
                xAxis = xAxis.transition();
            }
        }
        if (transitions && transitions.axisY) {
            yAxis = transitions.axisY;
        }
        else {
            yAxis = main.select("." + CLASS.axisY);
            if (withTransition) {
                yAxis = yAxis.transition();
            }
        }
        if (transitions && transitions.axisY2) {
            y2Axis = transitions.axisY2;
        }
        else {
            y2Axis = main.select("." + CLASS.axisY2);
            if (withTransition) {
                y2Axis = y2Axis.transition();
            }
        }
        (withTransition ? main.transition() : main)
            .attr("transform", $$.getTranslate("main"));
        xAxis.attr("transform", $$.getTranslate("x"));
        yAxis.attr("transform", $$.getTranslate("y"));
        y2Axis.attr("transform", $$.getTranslate("y2"));
        main.select("." + CLASS.chartArcs)
            .attr("transform", $$.getTranslate("arc"));
    },
    transformAll: function (withTransition, transitions) {
        var $$ = this;
        var config = $$.config, hasAxis = $$.state.hasAxis, $el = $$.$el;
        $$.transformMain(withTransition, transitions);
        hasAxis && config.subchart_show &&
            $$.transformContext(withTransition, transitions);
        $el.legend && $$.transformLegend(withTransition);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var type = {
    setTargetType: function (targetIds, type) {
        var $$ = this;
        var config = $$.config, withoutFadeIn = $$.state.withoutFadeIn;
        $$.mapToTargetIds(targetIds).forEach(function (id) {
            withoutFadeIn[id] = (type === config.data_types[id]);
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
    updateTypesElements: function () {
        var $$ = this;
        var current = $$.state.current;
        Object.keys(TYPE).forEach(function (v) {
            var t = TYPE[v];
            var has = $$.hasType(t, null, true);
            var idx = current.types.indexOf(t);
            if (idx === -1 && has) {
                current.types.push(t);
            }
            else if (idx > -1 && !has) {
                current.types.splice(idx, 1);
            }
        });
        // Update current chart elements reference
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
    hasType: function (type, targetsValue, checkFromData) {
        if (checkFromData === void 0) { checkFromData = false; }
        var $$ = this;
        var config = $$.config, current = $$.state.current;
        var types = config.data_types;
        var targets = targetsValue || $$.data.targets;
        var has = false;
        if (!checkFromData && current.types.length && current.types.indexOf(type) > -1) {
            has = true;
        }
        else if (targets && targets.length) {
            targets.forEach(function (target) {
                var t = types[target.id];
                if (t === type || (!t && type === "line")) {
                    has = true;
                }
            });
        }
        else if (Object.keys(types).length) {
            Object.keys(types).forEach(function (id) {
                if (types[id] === type) {
                    has = true;
                }
            });
        }
        else {
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
    hasTypeOf: function (type, targets, exclude) {
        var _this = this;
        if (exclude === void 0) { exclude = []; }
        if (type in TYPE_BY_CATEGORY) {
            return !TYPE_BY_CATEGORY[type]
                .filter(function (v) { return exclude.indexOf(v) === -1; })
                .every(function (v) { return !_this.hasType(v, targets); });
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
    isTypeOf: function (d, type) {
        var id = isString(d) ? d : d.id;
        var dataType = this.config.data_types[id] || this.config.data_type;
        return isArray(type) ?
            type.indexOf(dataType) >= 0 : dataType === type;
    },
    hasPointType: function () {
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
    hasArcType: function (targets, exclude) {
        return this.hasTypeOf("Arc", targets, exclude);
    },
    hasMultiArcGauge: function () {
        return this.hasType("gauge") && this.config.gauge_type === "multi";
    },
    isLineType: function (d) {
        var id = isString(d) ? d : d.id;
        return !this.config.data_types[id] ||
            this.isTypeOf(id, TYPE_BY_CATEGORY.Line);
    },
    isStepType: function (d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.Step);
    },
    isSplineType: function (d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.Spline);
    },
    isAreaType: function (d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.Area);
    },
    isAreaRangeType: function (d) {
        return this.isTypeOf(d, TYPE_BY_CATEGORY.AreaRange);
    },
    isBarType: function (d) {
        return this.isTypeOf(d, "bar");
    },
    isBubbleType: function (d) {
        return this.isTypeOf(d, "bubble");
    },
    isCandlestickType: function (d) {
        return this.isTypeOf(d, "candlestick");
    },
    isScatterType: function (d) {
        return this.isTypeOf(d, "scatter");
    },
    isPieType: function (d) {
        return this.isTypeOf(d, "pie");
    },
    isGaugeType: function (d) {
        return this.isTypeOf(d, "gauge");
    },
    isDonutType: function (d) {
        return this.isTypeOf(d, "donut");
    },
    isRadarType: function (d) {
        return this.isTypeOf(d, "radar");
    },
    isArcType: function (d) {
        return this.isPieType(d) ||
            this.isDonutType(d) ||
            this.isGaugeType(d) ||
            this.isRadarType(d);
    },
    // determine if is 'circle' data point
    isCirclePoint: function (node) {
        var config = this.config;
        var pattern = config.point_pattern;
        var isCircle = false;
        if (node && node.tagName === "circle") {
            isCircle = true;
        }
        else {
            isCircle = config.point_type === "circle" &&
                (!pattern || (isArray(pattern) && pattern.length === 0));
        }
        return isCircle;
    },
    lineData: function (d) {
        return this.isLineType(d) ? [d] : [];
    },
    arcData: function (d) {
        return this.isArcType(d.data) ? [d] : [];
    },
    /**
     * Get data adapt for data label showing
     * @param {object} d Data object
     * @returns {Array}
     * @private
     */
    labelishData: function (d) {
        return this.isBarType(d) ||
            this.isLineType(d) ||
            this.isScatterType(d) ||
            this.isBubbleType(d) ||
            this.isCandlestickType(d) ||
            this.isRadarType(d) ? d.values.filter(function (v) { return isNumber(v.value) || Boolean(v.value); }) : [];
    },
    barLineBubbleData: function (d) {
        return this.isBarType(d) || this.isLineType(d) || this.isBubbleType(d) ?
            d.values : [];
    },
    // https://github.com/d3/d3-shape#curves
    isInterpolationType: function (type) {
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
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
/**
 * Internal chart class.
 * - Note: Instantiated internally, not exposed for public.
 * @class ChartInternal
 * @ignore
 * @private
 */
var ChartInternal = /** @class */ (function () {
    function ChartInternal(api) {
        // data object
        this.data = {
            xs: {},
            targets: []
        };
        // scales
        this.scale = {
            x: null,
            y: null,
            y2: null,
            subX: null,
            subY: null,
            subY2: null,
            zoom: null
        };
        // original values
        this.org = {
            xScale: null,
            xDomain: null
        };
        // format function
        this.format = {
            extraLineClasses: null,
            xAxisTick: null,
            dataTime: null,
            defaultAxisTime: null,
            axisTime: null // axisTimeFormat
        };
        var $$ = this;
        $$.api = api; // Chart class instance alias
        $$.config = new Options();
        $$.cache = new Cache();
        var store = new Store();
        $$.$el = store.getStore("element");
        $$.state = store.getStore("state");
    }
    ChartInternal.prototype.beforeInit = function () {
        var $$ = this;
        $$.callPluginHook("$beforeInit");
        // can do something
        callFn($$.config.onbeforeinit, $$.api);
    };
    ChartInternal.prototype.afterInit = function () {
        var $$ = this;
        $$.callPluginHook("$afterInit");
        // can do something
        callFn($$.config.onafterinit, $$.api);
    };
    ChartInternal.prototype.init = function () {
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        state.hasAxis = !$$.hasArcType();
        state.hasRadar = !state.hasAxis && $$.hasType("radar");
        $$.initParams();
        var bindto = {
            element: config.bindto,
            classname: "bb"
        };
        if (isObject(config.bindto)) {
            bindto.element = config.bindto.element || "#chart";
            bindto.classname = config.bindto.classname || bindto.classname;
        }
        // select bind element
        $el.chart = isFunction(bindto.element.node) ?
            config.bindto.element : select(bindto.element || []);
        if ($el.chart.empty()) {
            $el.chart = select(doc.body.appendChild(doc.createElement("div")));
        }
        $el.chart.html("").classed(bindto.classname, true);
        $$.initToRender();
    };
    /**
     * Initialize the rendering process
     * @param {boolean} forced Force to render process
     * @private
     */
    ChartInternal.prototype.initToRender = function (forced) {
        var $$ = this;
        var config = $$.config, state = $$.state, chart = $$.$el.chart;
        var isHidden = function () { return chart.style("display") === "none" || chart.style("visibility") === "hidden"; };
        var isLazy = config.render.lazy || isHidden();
        var MutationObserver = win.MutationObserver;
        if (isLazy && MutationObserver && config.render.observe !== false && !forced) {
            new MutationObserver(function (mutation, observer) {
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
            var convertedData = $$.convertData(config, $$.initWithData);
            convertedData && $$.initWithData(convertedData);
            $$.afterInit();
        }
    };
    ChartInternal.prototype.initParams = function () {
        var $$ = this;
        var _a = $$, config = _a.config, format = _a.format, state = _a.state;
        var isRotated = config.axis_rotated;
        // datetime to be used for uniqueness
        state.datetimeId = "bb-" + +new Date();
        $$.color = $$.generateColor();
        $$.levelColor = $$.generateLevelColor();
        if ($$.hasPointType()) {
            $$.point = $$.generatePoint();
        }
        if (state.hasAxis) {
            $$.initClip();
            format.extraLineClasses = $$.generateExtraLineClass();
            format.dataTime = config.data_xLocaltime ? timeParse : utcParse;
            format.axisTime = config.axis_x_localtime ? timeFormat : utcFormat;
            var isDragZoom_1 = $$.config.zoom_enabled && $$.config.zoom_type === "drag";
            format.defaultAxisTime = function (d) {
                var _a = $$.scale, x = _a.x, zoom = _a.zoom;
                var isZoomed = isDragZoom_1 ? zoom :
                    zoom && x.orgDomain().toString() !== zoom.domain().toString();
                var specifier = (d.getMilliseconds() && ".%L") ||
                    (d.getSeconds() && ".:%S") ||
                    (d.getMinutes() && "%I:%M") ||
                    (d.getHours() && "%I %p") ||
                    (d.getDate() !== 1 && "%b %d") ||
                    (isZoomed && d.getDate() === 1 && "%b\'%y") ||
                    (d.getMonth() && "%-m/%-d") || "%Y";
                return format.axisTime(specifier)(d);
            };
        }
        state.isLegendRight = config.legend_position === "right";
        state.isLegendInset = config.legend_position === "inset";
        state.isLegendTop = config.legend_inset_anchor === "top-left" ||
            config.legend_inset_anchor === "top-right";
        state.isLegendLeft = config.legend_inset_anchor === "top-left" ||
            config.legend_inset_anchor === "bottom-left";
        state.rotatedPaddingRight = isRotated && !config.axis_x_show ? 0 : 30;
        state.inputType = convertInputType(config.interaction_inputType_mouse, config.interaction_inputType_touch);
    };
    ChartInternal.prototype.initWithData = function (data) {
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state, $el = $$.$el, org = $$.org;
        var hasAxis = state.hasAxis;
        var hasInteraction = config.interaction_enabled;
        // for arc type, set axes to not be shown
        // $$.hasArcType() && ["x", "y", "y2"].forEach(id => (config[`axis_${id}_show`] = false));
        if (hasAxis) {
            $$.axis = $$.getAxisInstance();
            config.zoom_enabled && $$.initZoom();
        }
        // Init data as targets
        $$.data.xs = {};
        $$.data.targets = $$.convertDataToTargets(data);
        if (config.data_filter) {
            $$.data.targets = $$.data.targets.filter(config.data_filter.bind($$.api));
        }
        // Set targets to hide if needed
        if (config.data_hide) {
            $$.addHiddenTargetIds(config.data_hide === true ?
                $$.mapToIds($$.data.targets) : config.data_hide);
        }
        if (config.legend_hide) {
            $$.addHiddenLegendIds(config.legend_hide === true ?
                $$.mapToIds($$.data.targets) : config.legend_hide);
        }
        // Init sizes and scales
        $$.updateSizes();
        $$.updateScales(true);
        // retrieve scale after the 'updateScales()' is called
        var x = scale.x, y = scale.y, y2 = scale.y2, subX = scale.subX, subY = scale.subY, subY2 = scale.subY2;
        // Set domains for each scale
        if (x) {
            x.domain(sortValue($$.getXDomain($$.data.targets)));
            subX.domain(x.domain());
            // Save original x domain for zoom update
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
        // -- Basic Elements --
        $el.svg = $el.chart.append("svg")
            .style("overflow", "hidden")
            .style("display", "block");
        if (hasInteraction && state.inputType) {
            var isTouch = state.inputType === "touch";
            $el.svg.on(isTouch ? "touchstart" : "mouseenter", function () { return callFn(config.onover, $$.api); })
                .on(isTouch ? "touchend" : "mouseleave", function () { return callFn(config.onout, $$.api); });
        }
        config.svg_classname && $el.svg.attr("class", config.svg_classname);
        // Define defs
        var hasColorPatterns = (isFunction(config.color_tiles) && $$.patterns);
        if (hasAxis || hasColorPatterns) {
            $el.defs = $el.svg.append("defs");
            if (hasAxis) {
                ["id", "idXAxis", "idYAxis", "idGrid"].forEach(function (v) {
                    $$.appendClip($el.defs, state.clip[v]);
                });
            }
            // set color patterns
            if (hasColorPatterns) {
                $$.patterns.forEach(function (p) { return $el.defs.append(function () { return p.node; }); });
            }
        }
        $$.updateSvgSize();
        // Bind resize event
        $$.bindResize();
        // Define regions
        var main = $el.svg.append("g")
            .classed(CLASS.main, true)
            .attr("transform", $$.getTranslate("main"));
        $el.main = main;
        // initialize subchart when subchart show option is set
        config.subchart_show && $$.initSubchart();
        config.tooltip_show && $$.initTooltip();
        config.title_text && $$.initTitle();
        config.legend_show && $$.initLegend();
        // -- Main Region --
        // text when empty
        if (config.data_empty_label_text) {
            main.append("text")
                .attr("class", CLASS.text + " " + CLASS.empty)
                .attr("text-anchor", "middle") // horizontal centering of text at x position in all browsers.
                .attr("dominant-baseline", "middle"); // vertical centering of text at y position in all browsers, except IE.
        }
        if (hasAxis) {
            // Regions
            config.regions.length && $$.initRegion();
            // Add Axis here, when clipPath is 'false'
            !config.clipPath && $$.axis.init();
        }
        // Define g for chart area
        main.append("g").attr("class", CLASS.chart)
            .attr("clip-path", state.clip.path);
        $$.callPluginHook("$init");
        if (hasAxis) {
            // Cover whole with rects for events
            hasInteraction && $$.initEventRect && $$.initEventRect();
            // Grids
            $$.initGrid();
            // Add Axis here, when clipPath is 'true'
            config.clipPath && $$.axis && $$.axis.init();
        }
        $$.initChartElements();
        // Set targets
        $$.updateTargets($$.data.targets);
        // Draw with targets
        $$.updateDimension();
        // oninit callback
        callFn(config.oninit, $$.api);
        // Set background
        $$.setBackground();
        $$.redraw({
            withTransition: false,
            withTransform: true,
            withUpdateXDomain: true,
            withUpdateOrgXDomain: true,
            withTransitionForAxis: false,
            initializing: true
        });
        // data.onmin/max callback
        if (config.data_onmin || config.data_onmax) {
            var minMax = $$.getMinMaxData();
            callFn(config.data_onmin, $$.api, minMax.min);
            callFn(config.data_onmax, $$.api, minMax.max);
        }
        config.tooltip_show && $$.initShowTooltip();
        state.rendered = true;
    };
    ChartInternal.prototype.initChartElements = function () {
        var $$ = this;
        var _a = $$.state, hasAxis = _a.hasAxis, hasRadar = _a.hasRadar;
        var types = [];
        if (hasAxis) {
            ["bar", "bubble", "candlestick", "line"].forEach(function (v) {
                var name = capitalize(v);
                if ((v === "line" && $$.hasTypeOf(name)) || $$.hasType(v)) {
                    types.push(name);
                }
            });
        }
        else {
            if (!hasRadar) {
                types.push("Arc", "Pie");
            }
            if ($$.hasType("gauge")) {
                types.push("Gauge");
            }
            else if (hasRadar) {
                types.push("Radar");
            }
        }
        types.forEach(function (v) {
            $$["init" + v]();
        });
        notEmpty($$.config.data_labels) && !$$.hasArcType(null, ["radar"]) && $$.initText();
    };
    ChartInternal.prototype.setChartElements = function () {
        var $$ = this;
        var _a = $$.$el, chart = _a.chart, svg = _a.svg, defs = _a.defs, main = _a.main, tooltip = _a.tooltip, legend = _a.legend, title = _a.title, grid = _a.grid, arc = _a.arcs, circles = _a.circle, bars = _a.bar, candlestick = _a.candlestick, lines = _a.line, areas = _a.area, texts = _a.text;
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
            bar: { bars: bars },
            candlestick: candlestick,
            line: { lines: lines, areas: areas },
            text: { texts: texts }
        };
    };
    /**
     * Set background element/image
     * @private
     */
    ChartInternal.prototype.setBackground = function () {
        var $$ = this;
        var bg = $$.config.background, state = $$.state, svg = $$.$el.svg;
        if (notEmpty(bg)) {
            var element = svg.select("g")
                .insert(bg.imgUrl ? "image" : "rect", ":first-child");
            if (bg.imgUrl) {
                element.attr("href", bg.imgUrl);
            }
            else if (bg.color) {
                element
                    .style("fill", bg.color)
                    .attr("clip-path", state.clip.path);
            }
            element
                .attr("class", bg["class"] || null)
                .attr("width", "100%")
                .attr("height", "100%");
        }
    };
    /**
     * Update targeted element with given data
     * @param {object} targets Data object formatted as 'target'
     * @private
     */
    ChartInternal.prototype.updateTargets = function (targets) {
        var $$ = this;
        var _a = $$.state, hasAxis = _a.hasAxis, hasRadar = _a.hasRadar;
        // Text
        $$.updateTargetsForText(targets);
        if (hasAxis) {
            ["bar", "candlestick", "line"].forEach(function (v) {
                var name = capitalize(v);
                if ((v === "line" && $$.hasTypeOf(name)) || $$.hasType(v)) {
                    $$["updateTargetsFor" + name](targets.filter($$["is" + name + "Type"].bind($$)));
                }
            });
            // Sub Chart
            $$.updateTargetsForSubchart &&
                $$.updateTargetsForSubchart(targets);
        }
        else {
            // Arc & Radar
            $$.hasArcType(targets) && (hasRadar ?
                $$.updateTargetsForRadar(targets.filter($$.isRadarType.bind($$))) :
                $$.updateTargetsForArc(targets.filter($$.isArcType.bind($$))));
        }
        // circle
        if ($$.hasType("bubble") || $$.hasType("scatter")) {
            $$.updateTargetForCircle && $$.updateTargetForCircle();
        }
        // Fade-in each chart
        $$.showTargets();
    };
    /**
     * Display targeted elements
     * @private
     */
    ChartInternal.prototype.showTargets = function () {
        var $$ = this;
        var config = $$.config, svg = $$.$el.svg;
        svg.selectAll("." + CLASS.target)
            .filter(function (d) { return $$.isTargetToShow(d.id); })
            .transition()
            .duration(config.transition_duration)
            .style("opacity", "1");
    };
    ChartInternal.prototype.getWithOption = function (options) {
        var withOptions = {
            Y: true,
            Subchart: true,
            Transition: true,
            EventRect: true,
            Dimension: true,
            TrimXDomain: true,
            Transform: false,
            UpdateXDomain: false,
            UpdateOrgXDomain: false,
            Legend: false,
            UpdateXAxis: "UpdateXDomain",
            TransitionForExit: "Transition",
            TransitionForAxis: "Transition"
        };
        Object.keys(withOptions).forEach(function (key) {
            var defVal = withOptions[key];
            if (isString(defVal)) {
                defVal = withOptions[defVal];
            }
            withOptions[key] = getOption(options, "with" + key, defVal);
        });
        return withOptions;
    };
    ChartInternal.prototype.initialOpacity = function (d) {
        var $$ = this;
        var withoutFadeIn = $$.state.withoutFadeIn;
        return $$.getBaseValue(d) !== null &&
            withoutFadeIn[d.id] ? "1" : "0";
    };
    ChartInternal.prototype.bindResize = function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var resizeFunction = generateResize();
        var list = [];
        list.push(function () { return callFn(config.onresize, $$, $$.api); });
        if (config.resize_auto) {
            list.push(function () {
                state.resizing = true;
                $$.api.flush(false);
            });
        }
        list.push(function () {
            callFn(config.onresized, $$, $$.api);
            state.resizing = false;
        });
        // add resize functions
        list.forEach(function (v) { return resizeFunction.add(v); });
        $$.resizeFunction = resizeFunction;
        // attach resize event
        win.addEventListener("resize", $$.resizeFunction = resizeFunction);
    };
    /**
     * Call plugin hook
     * @param {string} phase The lifecycle phase
     * @param {Array} args Arguments
     * @private
     */
    ChartInternal.prototype.callPluginHook = function (phase) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.config.plugins.forEach(function (v) {
            if (phase === "$beforeInit") {
                v.$$ = _this;
                _this.api.plugins.push(v);
            }
            v[phase].apply(v, args);
        });
    };
    return ChartInternal;
}());
extend(ChartInternal.prototype, [
    // common
    dataConvert,
    data$1,
    dataLoad,
    category,
    classModule,
    color,
    domain,
    interaction,
    format,
    legend$1,
    redraw,
    scale,
    shape,
    size,
    text,
    title,
    tooltip$1,
    transform,
    type
]);

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
    var thisConfig = this.config;
    var target;
    var keys;
    var read;
    var find = function () {
        var key = keys.shift();
        if (key && target && isObjectType(target) && key in target) {
            target = target[key];
            return find();
        }
        else if (!key) {
            return target;
        }
        return undefined;
    };
    Object.keys(thisConfig).forEach(function (key) {
        target = config;
        keys = key.split("_");
        read = find();
        if (isDefined(read)) {
            thisConfig[key] = read;
        }
    });
}

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiChart = {
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
    resize: function (size) {
        var $$ = this.internal;
        var config = $$.config, state = $$.state;
        if (state.rendered) {
            config.size_width = size ? size.width : null;
            config.size_height = size ? size.height : null;
            state.resizing = true;
            this.flush(false, true);
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
    flush: function (soft) {
        var $$ = this.internal;
        var state = $$.state;
        if (state.rendered) {
            // reset possible zoom scale when is called from resize event
            // eslint-disable-next-line prefer-rest-params
            if (state.resizing) { // arguments[1] is given when is called from resize
                $$.brush && $$.brush.updateResize();
            }
            else {
                // re-update config info
                $$.axis && $$.axis.setOrient();
            }
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
            // reset subchart selection & selection state
            if (!state.resizing && $$.brush) {
                $$.brush.getSelection().call($$.brush.move);
                $$.unselectRect();
            }
        }
        else {
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
    destroy: function () {
        var _this = this;
        var $$ = this.internal;
        var _a = $$.$el, chart = _a.chart, svg = _a.svg;
        if (notEmpty($$)) {
            $$.callPluginHook("$willDestroy");
            $$.charts.splice($$.charts.indexOf(this), 1);
            // clear timers && pending transition
            svg.select("*").interrupt();
            $$.resizeFunction.clear();
            win.removeEventListener("resize", $$.resizeFunction);
            chart.classed("bb", false).html("");
            // releasing own references
            Object.keys(this).forEach(function (key) {
                key === "internal" && Object.keys($$).forEach(function (k) {
                    $$[k] = null;
                });
                _this[key] = null;
                delete _this[key];
            });
            // release prototype chains
            for (var key in this) {
                this[key] = function () { };
            }
        }
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
        var $$ = this.internal;
        var config = $$.config;
        var key = name && name.replace(/\./g, "_");
        var res;
        if (key in config) {
            if (isDefined(value)) {
                config[key] = value;
                res = value;
                redraw && this.flush();
            }
            else {
                res = config[key];
            }
        }
        return res;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiColor = {
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
    color: function (id) {
        return this.internal.color(id); // more patterns
    }
};

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
function data(targetIds) {
    var targets = this.internal.data.targets;
    if (!isUndefined(targetIds)) {
        var ids_1 = isArray(targetIds) ? targetIds : [targetIds];
        return targets.filter(function (t) { return ids_1.some(function (v) { return v === t.id; }); });
    }
    return targets;
}
extend(data, {
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
    shown: function (targetIds) {
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
        if (flat === void 0) { flat = true; }
        var values = null;
        if (targetIds) {
            var targets = this.data(targetIds);
            if (targets && isArray(targets)) {
                values = [];
                targets.forEach(function (v) {
                    var dataValue = v.values.map(function (d) { return d.value; });
                    flat ? (values = values.concat(dataValue)) : values.push(dataValue);
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
    names: function (names) {
        var $$ = this.internal;
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
    colors: function (colors) {
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
    axes: function (axes) {
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
    min: function () {
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
    max: function () {
        return this.internal.getMinMaxData().max;
    }
});
var apiData = { data: data };

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
var b64EncodeUnicode = function (str) { return btoa(encodeURIComponent(str)
    .replace(/%([0-9A-F]{2})/g, function (match, p) { return String.fromCharCode(Number("0x" + p)); })); };
/**
 * Convert svg node to data url
 * @param {HTMLElement} node target node
 * @param {object} option object containing {width, height, preserveAspectRatio}
 * @param {object} orgSize object containing {width, height}
 * @returns {string}
 * @private
 */
function nodeToSvgDataUrl(node, option, orgSize) {
    var _a = option || orgSize, width = _a.width, height = _a.height;
    var serializer = new XMLSerializer();
    var clone = node.cloneNode(true);
    var cssText = getCssRules(toArray(doc.styleSheets))
        .filter(function (r) { return r.cssText; })
        .map(function (r) { return r.cssText; });
    clone.setAttribute("xmlns", namespaces.xhtml);
    var nodeXml = serializer.serializeToString(clone);
    // escape css for XML
    var style = doc.createElement("style");
    style.appendChild(doc.createTextNode(cssText.join("\n")));
    var styleXml = serializer.serializeToString(style);
    // foreignObject not supported in IE11 and below
    // https://msdn.microsoft.com/en-us/library/hh834675(v=vs.85).aspx
    var dataStr = ("<svg xmlns=\"" + namespaces.svg + "\" width=\"" + width + "\" height=\"" + height + "\" \n\t\tviewBox=\"0 0 " + orgSize.width + " " + orgSize.height + "\" \n\t\tpreserveAspectRatio=\"" + (option && option.preserveAspectRatio === false ? "none" : "xMinYMid meet") + "\">\n\t\t\t<foreignObject width=\"100%\" height=\"100%\">\n\t\t\t\t" + styleXml + "\n\t\t\t\t" + nodeXml.replace(/(url\()[^#]+/g, "$1") + "\n\t\t\t</foreignObject></svg>")
        .replace("/\n/g", "%0A");
    return "data:image/svg+xml;base64," + b64EncodeUnicode(dataStr);
}
var apiExport = {
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
    "export": function (option, callback) {
        var _this = this;
        var $$ = this.internal;
        var state = $$.state, chart = $$.$el.chart;
        var _a = state.current, width = _a.width, height = _a.height;
        var opt = mergeObj({
            width: width,
            height: height,
            preserveAspectRatio: true,
            mimeType: "image/png"
        }, option);
        var svgDataUrl = nodeToSvgDataUrl(chart.node(), opt, { width: width, height: height });
        if (callback && isFunction(callback)) {
            var img_1 = new Image();
            img_1.crossOrigin = "Anonymous";
            img_1.onload = function () {
                var canvas = doc.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = opt.width || width;
                canvas.height = opt.height || height;
                ctx.drawImage(img_1, 0, 0);
                callback.bind(_this)(canvas.toDataURL(opt.mimeType));
            };
            img_1.src = svgDataUrl;
        }
        return svgDataUrl;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiFocus = {
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
    focus: function (targetIdsValue) {
        var $$ = this.internal;
        var state = $$.state;
        var targetIds = $$.mapToTargetIds(targetIdsValue);
        var candidates = $$.$el.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$)));
        this.revert();
        this.defocus();
        candidates.classed(CLASS.focused, true).classed(CLASS.defocused, false);
        if ($$.hasArcType() && !state.hasRadar) {
            $$.expandArc(targetIds);
            $$.hasType("gauge") &&
                $$.markOverlapped(targetIdsValue, $$, "." + CLASS.gaugeValue);
        }
        $$.toggleFocusLegend(targetIds, true);
        state.focusedTargetIds = targetIds;
        state.defocusedTargetIds = state.defocusedTargetIds.filter(function (id) { return targetIds.indexOf(id) < 0; });
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
    defocus: function (targetIdsValue) {
        var $$ = this.internal;
        var state = $$.state;
        var targetIds = $$.mapToTargetIds(targetIdsValue);
        var candidates = $$.$el.svg.selectAll($$.selectorTargets(targetIds.filter($$.isTargetToShow, $$)));
        candidates.classed(CLASS.focused, false).classed(CLASS.defocused, true);
        if ($$.hasArcType()) {
            $$.unexpandArc(targetIds);
            $$.hasType("gauge") &&
                $$.undoMarkOverlapped($$, "." + CLASS.gaugeValue);
        }
        $$.toggleFocusLegend(targetIds, false);
        state.focusedTargetIds = state.focusedTargetIds.filter(function (id) { return targetIds.indexOf(id) < 0; });
        state.defocusedTargetIds = targetIds;
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
    revert: function (targetIdsValue) {
        var $$ = this.internal;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var targetIds = $$.mapToTargetIds(targetIdsValue);
        var candidates = $el.svg.selectAll($$.selectorTargets(targetIds)); // should be for all targets
        candidates.classed(CLASS.focused, false).classed(CLASS.defocused, false);
        $$.hasArcType() && $$.unexpandArc(targetIds);
        if (config.legend_show) {
            $$.showLegend(targetIds.filter($$.isLegendToShow.bind($$)));
            $el.legend.selectAll($$.selectorLegends(targetIds))
                .filter(function () {
                return select(this).classed(CLASS.legendItemFocused);
            })
                .classed(CLASS.legendItemFocused, false);
        }
        state.focusedTargetIds = [];
        state.defocusedTargetIds = [];
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Define legend
 * @ignore
 */
var legend = {
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
    show: function (targetIds) {
        var $$ = this.internal;
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
    hide: function (targetIds) {
        var $$ = this.internal;
        $$.hideLegend($$.mapToTargetIds(targetIds));
        $$.updateAndRedraw({ withLegend: true });
    }
};
var apiLegend = { legend: legend };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiLoad = {
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
    load: function (args) {
        var $$ = this.internal;
        var config = $$.config;
        // update xs if specified
        args.xs && $$.addXs(args.xs);
        // update names if exists
        "names" in args && this.data.names(args.names);
        // update classes if exists
        "classes" in args && Object.keys(args.classes).forEach(function (id) {
            config.data_classes[id] = args.classes[id];
        });
        // update categories if exists
        if ("categories" in args && $$.axis.isCategorized()) {
            config.axis_x_categories = args.categories;
        }
        // update axes if exists
        "axes" in args && Object.keys(args.axes).forEach(function (id) {
            config.data_axes[id] = args.axes[id];
        });
        // update colors if exists
        "colors" in args && Object.keys(args.colors).forEach(function (id) {
            config.data_colors[id] = args.colors[id];
        });
        // unload if needed
        if ("unload" in args && args.unload !== false) {
            // TODO: do not unload if target will load (included in url/rows/columns)
            $$.unload($$.mapToTargetIds(args.unload === true ? null : args.unload), function () {
                return $$.loadFromArgs(args);
            });
        }
        else {
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
     * @example
     *  // Unload data2 and data3
     *  chart.unload({
     *    ids: ["data2", "data3"],
     *    done: function() {
     *       // called after the unloaded
     *    }
     *  });
     */
    unload: function (argsValue) {
        var _this = this;
        var $$ = this.internal;
        var args = argsValue || {};
        if (isArray(args)) {
            args = { ids: args };
        }
        else if (isString(args)) {
            args = { ids: [args] };
        }
        var ids = $$.mapToTargetIds(args.ids);
        $$.unload(ids, function () {
            $$.redraw({
                withUpdateOrgXDomain: true,
                withUpdateXDomain: true,
                withLegend: true
            });
            $$.cache.remove(ids);
            args.done && args.done.call(_this);
        });
    }
};

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
    var $$ = this.internal;
    var targetIds = $$.mapToTargetIds(targetIdsValue);
    $$.state.toggling = true;
    $$[(show ? "remove" : "add") + "HiddenTargetIds"](targetIds);
    var targets = $$.$el.svg.selectAll($$.selectorTargets(targetIds));
    var opacity = show ? "1" : "0";
    show && targets.style("display", null);
    targets.transition()
        .style("opacity", opacity, "important")
        .call(endall, function () {
        // https://github.com/naver/billboard.js/issues/1758
        !show && targets.style("display", "none");
        targets.style("opacity", opacity);
    });
    options.withLegend && $$[(show ? "show" : "hide") + "Legend"](targetIds);
    $$.redraw({
        withUpdateOrgXDomain: true,
        withUpdateXDomain: true,
        withLegend: true
    });
    $$.state.toggling = false;
}
var apiShow = {
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
    show: function (targetIdsValue, options) {
        if (options === void 0) { options = {}; }
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
    hide: function (targetIdsValue, options) {
        if (options === void 0) { options = {}; }
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
    toggle: function (targetIds, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var $$ = this.internal;
        var targets = { show: [], hide: [] };
        // sort show & hide target ids
        $$.mapToTargetIds(targetIds)
            .forEach(function (id) { return targets[$$.isTargetToShow(id) ? "hide" : "show"].push(id); });
        // perform show & hide task separately
        // https://github.com/naver/billboard.js/issues/454
        targets.show.length && this.show(targets.show, options);
        targets.hide.length && setTimeout(function () { return _this.hide(targets.hide, options); }, 0);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Define tooltip
 * @ignore
 */
var tooltip = {
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
    show: function (args) {
        var $$ = this.internal;
        var config = $$.config, inputType = $$.state.inputType;
        var index;
        var mouse;
        // determine mouse position on the chart
        if (args.mouse) {
            mouse = args.mouse;
        }
        // determine focus data
        if (args.data) {
            var data = args.data;
            var y = $$.getYScaleById(data.id)(data.value);
            if ($$.isMultipleX()) {
                // if multiple xs, target point will be determined by mouse
                mouse = [$$.scale.x(data.x), y];
            }
            else {
                if (!config.tooltip_grouped) {
                    mouse = [0, y];
                }
                index = isValue(data.index) ? data.index : $$.getIndexByX(data.x);
            }
        }
        else if (isDefined(args.x)) {
            index = $$.getIndexByX(args.x);
        }
        else if (isDefined(args.index)) {
            index = args.index;
        }
        (inputType === "mouse" ?
            ["mouseover", "mousemove"] : ["touchstart"]).forEach(function (eventName) {
            $$.dispatchEvent(eventName, index, mouse);
        });
    },
    /**
     * Hide tooltip
     * @function tooltip․hide
     * @instance
     * @memberof Chart
     */
    hide: function () {
        var $$ = this.internal;
        var inputType = $$.state.inputType, tooltip = $$.$el.tooltip;
        var data = tooltip && tooltip.datum();
        if (data) {
            var index_1 = JSON.parse(data.current)[0].index;
            // make to finalize, possible pending event flow set from '.tooltip.show()' call
            (inputType === "mouse" ?
                ["mouseout"] : ["touchend"]).forEach(function (eventName) {
                $$.dispatchEvent(eventName, index_1);
            });
        }
        // reset last touch point index
        inputType === "touch" && $$.callOverOutForTouch();
        $$.hideTooltip(true);
        $$.hideGridFocus();
        $$.unexpandCircles && $$.unexpandCircles();
        $$.unexpandBars && $$.unexpandBars();
    }
};
var apiTooltip = { tooltip: tooltip };

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
var Chart = /** @class */ (function () {
    function Chart(options) {
        this.plugins = [];
        var $$ = new ChartInternal(this);
        this.internal = $$;
        // bind to namespaced APIs
        (function bindThis(fn, target, argThis) {
            Object.keys(fn).forEach(function (key) {
                var isFunc = isFunction(fn[key]);
                var isChild = target !== argThis;
                var hasChild = Object.keys(fn[key]).length > 0;
                if (isFunc && ((!isChild && hasChild) || isChild)) {
                    target[key] = fn[key].bind(argThis);
                }
                else if (!isFunc) {
                    target[key] = {};
                }
                hasChild && bindThis(fn[key], target[key], argThis);
            });
        })(Chart.prototype, this, this);
        loadConfig.call($$, options);
        $$.beforeInit();
        $$.init();
    }
    return Chart;
}());
// extend common APIs as part of Chart class
extend(Chart.prototype, [
    apiChart,
    apiColor,
    apiData,
    apiExport,
    apiFocus,
    apiLegend,
    apiLoad,
    apiShow,
    apiTooltip
]);

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
    var config = $$.config;
    var axisX = "axis_x_" + type;
    var axisY = "axis_y_" + type;
    var axisY2 = "axis_y2_" + type;
    if (isDefined(value)) {
        if (isObjectType(value)) {
            isValue(value.x) && (config[axisX] = value.x);
            isValue(value.y) && (config[axisY] = value.y);
            isValue(value.y2) && (config[axisY2] = value.y2);
        }
        else {
            config[axisY] = value;
            config[axisY2] = value;
        }
        $$.redraw({
            withUpdateOrgXDomain: true,
            withUpdateXDomain: true
        });
    }
}
/**
 * Get the min/max value
 * @param {Chart} $$ Chart instance
 * @param {string} type Set type 'min' or 'max'
 * @returns {{x, y, y2}}
 * @private
 */
function getMinMax($$, type) {
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
var axis$1 = {
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
    labels: function (labels) {
        var $$ = this.internal;
        var labelText;
        if (labels) {
            Object.keys(labels).forEach(function (axisId) {
                $$.axis.setLabelText(axisId, labels[axisId]);
            });
            $$.axis.updateLabels();
        }
        ["x", "y", "y2"].forEach(function (v) {
            var text = $$.axis.getLabelText(v);
            if (text) {
                !labelText && (labelText = {});
                labelText[v] = text;
            }
        });
        return labelText;
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
    min: function (min) {
        var $$ = this.internal;
        return isValue(min) ?
            setMinMax($$, "min", min) :
            getMinMax($$, "min");
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
    max: function (max) {
        var $$ = this.internal;
        return arguments.length ?
            setMinMax($$, "max", max) :
            getMinMax($$, "max");
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
    range: function (range) {
        var axis = this.axis;
        if (arguments.length) {
            isDefined(range.max) && axis.max(range.max);
            isDefined(range.min) && axis.min(range.min);
        }
        else {
            return {
                max: axis.max(),
                min: axis.min()
            };
        }
        return undefined;
    }
};
var apiAxis = { axis: axis$1 };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiCategory = {
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
    category: function (i, category) {
        var $$ = this.internal;
        var config = $$.config;
        if (arguments.length > 1) {
            config.axis_x_categories[i] = category;
            $$.redraw();
        }
        return config.axis_x_categories[i];
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
    categories: function (categories) {
        var $$ = this.internal;
        var config = $$.config;
        if (!arguments.length) {
            return config.axis_x_categories;
        }
        config.axis_x_categories = categories;
        $$.redraw();
        return config.axis_x_categories;
    }
};

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
    var $$ = this.internal;
    var config = $$.config;
    if (!grids) {
        return config.grid_x_lines;
    }
    config.grid_x_lines = grids;
    $$.redrawWithoutRescale();
    return config.grid_x_lines;
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
    add: function (grids) {
        return this.xgrids(this.internal.config.grid_x_lines
            .concat(grids || []));
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
    remove: function (params) {
        this.internal.removeGridLines(params, true);
    }
});
var apiXGrid = { xgrids: xgrids };

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
    var $$ = this.internal;
    var config = $$.config;
    if (!grids) {
        return config.grid_y_lines;
    }
    config.grid_y_lines = grids;
    $$.redrawWithoutRescale();
    return config.grid_y_lines;
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
    add: function (grids) {
        return this.ygrids(this.internal.config.grid_y_lines
            .concat(grids || []));
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
    remove: function (params) {
        this.internal.removeGridLines(params, false);
    }
});
var apiYGrid = { ygrids: ygrids };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiGroup = {
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
    groups: function (groups) {
        var $$ = this.internal;
        var config = $$.config;
        if (isUndefined(groups)) {
            return config.data_groups;
        }
        config.data_groups = groups;
        $$.redraw();
        return config.data_groups;
    }
};

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
    var $$ = this.internal;
    var config = $$.config;
    if (!regions) {
        return config.regions;
    }
    config.regions = regions;
    $$.redrawWithoutRescale();
    return regions;
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
    add: function (regions) {
        var $$ = this.internal;
        var config = $$.config;
        if (!regions) {
            return config.regions;
        }
        config.regions = config.regions.concat(regions);
        $$.redrawWithoutRescale();
        return config.regions;
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
    remove: function (optionsValue) {
        var $$ = this.internal;
        var config = $$.config;
        var options = optionsValue || {};
        var duration = getOption(options, "duration", config.transition_duration);
        var classes = getOption(options, "classes", [CLASS.region]);
        var regions = $$.$el.main.select("." + CLASS.regions)
            .selectAll(classes.map(function (c) { return "." + c; }));
        (duration ? regions.transition().duration(duration) : regions)
            .style("opacity", "0")
            .remove();
        regions = config.regions;
        if (Object.keys(options).length) {
            regions = regions.filter(function (region) {
                var found = false;
                if (!region["class"]) {
                    return true;
                }
                region["class"].split(" ").forEach(function (c) {
                    if (classes.indexOf(c) >= 0) {
                        found = true;
                    }
                });
                return !found;
            });
            config.regions = regions;
        }
        else {
            config.regions = [];
        }
        return regions;
    }
});
var apiRegion = { regions: regions };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiX = {
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
    x: function (x) {
        var $$ = this.internal;
        var axis = $$.axis, data = $$.data;
        var isCategorized = axis.isCustomX() && axis.isCategorized();
        if (isArray(x)) {
            if (isCategorized) {
                this.categories(x);
            }
            else {
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
    xs: function (xs) {
        var $$ = this.internal;
        if (isObject(xs)) {
            $$.updateTargetXs($$.data.targets, xs);
            $$.redraw({
                withUpdateOrgXDomain: true,
                withUpdateXDomain: true
            });
        }
        return $$.data.xs;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiFlow = {
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
    flow: function (args) {
        var $$ = this.internal;
        var data;
        var domain;
        var length = 0;
        var tail = 0;
        var diff;
        var to;
        if (args.json || args.rows || args.columns) {
            data = $$.convertData(args);
        }
        if (!data || !isTabVisible()) {
            return;
        }
        var notfoundIds = [];
        var orgDataCount = $$.getMaxDataCount();
        var targets = $$.convertDataToTargets(data, true);
        var isTimeSeries = $$.axis.isTimeSeries();
        // Update/Add data
        $$.data.targets.forEach(function (t) {
            var found = false;
            for (var i = 0; i < targets.length; i++) {
                if (t.id === targets[i].id) {
                    found = true;
                    if (t.values[t.values.length - 1]) {
                        tail = t.values[t.values.length - 1].index + 1;
                    }
                    length = targets[i].values.length;
                    for (var j = 0; j < length; j++) {
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
        // Append null for not found targets
        $$.data.targets.forEach(function (t) {
            for (var i = 0; i < notfoundIds.length; i++) {
                if (t.id === notfoundIds[i]) {
                    tail = t.values[t.values.length - 1].index + 1;
                    for (var j = 0; j < length; j++) {
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
        // Generate null values for new target
        if ($$.data.targets.length) {
            targets.forEach(function (t) {
                var missing = [];
                for (var i = $$.data.targets[0].values[0].index; i < tail; i++) {
                    missing.push({
                        id: t.id,
                        index: i,
                        x: isTimeSeries ? $$.getOtherTargetX(i) : i,
                        value: null
                    });
                }
                t.values.forEach(function (v) {
                    v.index += tail;
                    if (!isTimeSeries) {
                        v.x += tail;
                    }
                });
                t.values = missing.concat(t.values);
            });
        }
        $$.data.targets = $$.data.targets.concat(targets); // add remained
        // check data count because behavior needs to change when it"s only one
        // const dataCount = $$.getMaxDataCount();
        var baseTarget = $$.data.targets[0];
        var baseValue = baseTarget.values[0];
        // Update length to flow if needed
        if (isDefined(args.to)) {
            length = 0;
            to = isTimeSeries ? parseDate.call($$, args.to) : args.to;
            baseTarget.values.forEach(function (v) {
                v.x < to && length++;
            });
        }
        else if (isDefined(args.length)) {
            length = args.length;
        }
        // If only one data, update the domain to flow from left edge of the chart
        if (!orgDataCount) {
            if (isTimeSeries) {
                diff = baseTarget.values.length > 1 ?
                    baseTarget.values[baseTarget.values.length - 1].x - baseValue.x :
                    baseValue.x - $$.getXDomain($$.data.targets)[0];
            }
            else {
                diff = 1;
            }
            domain = [baseValue.x - diff, baseValue.x];
        }
        else if (orgDataCount === 1 && isTimeSeries) {
            diff = (baseTarget.values[baseTarget.values.length - 1].x - baseValue.x) / 2;
            domain = [new Date(+baseValue.x - diff), new Date(+baseValue.x + diff)];
        }
        domain && $$.updateXDomain(null, true, true, false, domain);
        // Set targets
        $$.updateTargets($$.data.targets);
        // Redraw with new targets
        $$.redraw({
            flow: {
                index: baseValue.index,
                length: length,
                duration: isValue(args.duration) ? args.duration : $$.config.transition_duration,
                done: args.done,
                orgDataCount: orgDataCount
            },
            withLegend: true,
            withTransition: orgDataCount > 1,
            withTrimXDomain: false,
            withUpdateXAxis: true
        });
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */
var AxisRendererHelper = /** @class */ (function () {
    function AxisRendererHelper(owner) {
        var scale = getScale();
        var config = owner.config, params = owner.params;
        this.owner = owner;
        this.config = config;
        this.scale = scale;
        if (config.noTransition || !params.config.transition_duration) {
            config.withoutTransition = true;
        }
        // set range
        config.range = this.scaleExtent((params.orgXScale || scale).range());
    }
    /**
     * Compute a character dimension
     * @param {d3.selection} node <g class=tick> node
     * @returns {{w: number, h: number}}
     * @private
     */
    AxisRendererHelper.getSizeFor1Char = function (node) {
        // default size for one character
        var size = {
            w: 5.5,
            h: 11.5
        };
        !node.empty() && node.select("text")
            .text("0")
            .call(function (el) {
            try {
                var _a = el.node().getBBox(), width = _a.width, height = _a.height;
                if (width && height) {
                    size.w = width;
                    size.h = height;
                }
            }
            catch (e) {
            }
            finally {
                el.text("");
            }
        });
        this.getSizeFor1Char = function () { return size; };
        return size;
    };
    /**
     * Get tick transform setter function
     * @param {string} id Axis id
     * @returns {Function} transfrom setter function
     * @private
     */
    AxisRendererHelper.prototype.getTickTransformSetter = function (id) {
        var config = this.config;
        var fn = id === "x" ?
            function (value) { return "translate(" + (value + config.tickOffset) + ",0)"; } :
            function (value) { return "translate(0," + value + ")"; };
        return function (selection, scale) {
            selection.attr("transform", function (d) { return fn(Math.ceil(scale(d))); });
        };
    };
    AxisRendererHelper.prototype.scaleExtent = function (domain) {
        var start = domain[0];
        var stop = domain[domain.length - 1];
        return start < stop ? [start, stop] : [stop, start];
    };
    AxisRendererHelper.prototype.generateTicks = function (scale, isYAxes) {
        var tickStepSize = this.owner.params.tickStepSize;
        var _a = scale.domain(), start = _a[0], end = _a[1];
        var ticks = [];
        // When 'axis[y|y2].tick.stepSize' option is set
        if (isYAxes && tickStepSize) {
            var interval = start;
            while (interval <= end) {
                ticks.push(interval);
                interval += tickStepSize;
            }
        }
        else if (scale.ticks) {
            var tickArguments = this.config.tickArguments;
            // adjust excessive tick count show
            if (scale.type === "log" && !tickArguments) {
                // nicer symlog ticks didn't implemented yet: https://github.com/d3/d3-scale/issues/162
                // get ticks values from logScale
                var s = getScale("_log")
                    .domain([start > 0 ? start : 1, end])
                    .range(scale.range());
                ticks = s.ticks();
                for (var cnt = end.toFixed().length; ticks.length > 15; cnt--) {
                    ticks = s.ticks(cnt);
                }
                ticks.splice(0, 1, start);
                ticks.splice(ticks.length - 1, 1, end);
            }
            else {
                ticks = scale
                    .ticks.apply(scale, (this.config.tickArguments || []));
            }
            ticks = ticks
                .map(function (v) {
                // round the tick value if is number
                var r = (isString(v) && isNumber(v) && !isNaN(v) &&
                    Math.round(v * 10) / 10) || v;
                return r;
            });
        }
        else {
            for (var i = Math.ceil(start); i < end; i++) {
                ticks.push(i);
            }
            if (ticks.length > 0 && ticks[0] > 0) {
                ticks.unshift(ticks[0] - (ticks[1] - ticks[0]));
            }
        }
        return ticks;
    };
    AxisRendererHelper.prototype.copyScale = function () {
        var newScale = this.scale.copy();
        if (!newScale.domain().length) {
            newScale.domain(this.scale.domain());
        }
        newScale.type = this.scale.type;
        return newScale;
    };
    AxisRendererHelper.prototype.textFormatted = function (v) {
        var tickFormat = this.config.tickFormat;
        // to round float numbers from 'binary floating point'
        // https://en.wikipedia.org/wiki/Double-precision_floating-point_format
        // https://stackoverflow.com/questions/17849101/laymans-explanation-for-why-javascript-has-weird-floating-math-ieee-754-stand
        var value = /\d+\.\d+0{5,}\d$/.test(v) ? +String(v).replace(/0+\d$/, "") : v;
        var formatted = tickFormat ? tickFormat(value) : value;
        return isDefined(formatted) ? formatted : "";
    };
    AxisRendererHelper.prototype.transitionise = function (selection) {
        var config = this.config;
        return config.withoutTransition ?
            selection.interrupt() : selection.transition(config.transition);
    };
    return AxisRendererHelper;
}());

var AxisRenderer = /** @class */ (function () {
    function AxisRenderer(params) {
        if (params === void 0) { params = {}; }
        var config = {
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
    AxisRenderer.prototype.create = function (g) {
        var ctx = this;
        var _a = this, config = _a.config, helper = _a.helper, params = _a.params;
        var scale = helper.scale;
        var orient = config.orient;
        var splitTickText = this.splitTickText.bind(this);
        var isLeftRight = /^(left|right)$/.test(orient);
        var isTopBottom = /^(top|bottom)$/.test(orient);
        // line/text enter and path update
        var tickTransform = helper.getTickTransformSetter(isTopBottom ? "x" : "y");
        var axisPx = tickTransform === helper.axisX ? "y" : "x";
        var sign = /^(top|left)$/.test(orient) ? -1 : 1;
        // tick text helpers
        var rotate = params.tickTextRotate;
        this.config.range = scale.rangeExtent ?
            scale.rangeExtent() :
            helper.scaleExtent((params.orgXScale || scale).range());
        var innerTickSize = config.innerTickSize, tickLength = config.tickLength, range = config.range;
        // // get the axis' tick position configuration
        var id = params.id;
        var tickTextPos = id && /^(x|y|y2)$/.test(id) ?
            params.config["axis_" + id + "_tick_text_position"] : { x: 0, y: 0 };
        // tick visiblity
        var prefix = id === "subX" ? "subchart_axis_x" : "axis_" + id;
        var axisShow = params.config[prefix + "_show"];
        var tickShow = {
            tick: axisShow ? params.config[prefix + "_tick_show"] : false,
            text: axisShow ? params.config[prefix + "_tick_text_show"] : false
        };
        var $g;
        g.each(function () {
            var g = select(this);
            var scale0 = this.__chart__ || scale;
            var scale1 = helper.copyScale();
            $g = g;
            this.__chart__ = scale1;
            config.tickOffset = params.isCategory ?
                Math.ceil((scale1(1) - scale1(0)) / 2) : 0;
            // update selection - data join
            var path = g.selectAll(".domain").data([0]);
            // enter + update selection
            path.enter().append("path")
                .attr("class", "domain")
                // https://observablehq.com/@d3/d3-selection-2-0
                .merge(helper.transitionise(path).selection())
                .attr("d", function () {
                var outerTickSized = config.outerTickSize * sign;
                return isTopBottom ?
                    "M" + range[0] + "," + outerTickSized + "V0H" + range[1] + "V" + outerTickSized :
                    "M" + outerTickSized + "," + range[0] + "H0V" + range[1] + "H" + outerTickSized;
            });
            if (tickShow.tick || tickShow.text) {
                // count of tick data in array
                var ticks_1 = config.tickValues || helper.generateTicks(scale1, isLeftRight);
                // update selection
                var tick = g.selectAll(".tick")
                    .data(ticks_1, scale1);
                // enter selection
                var tickEnter = tick
                    .enter()
                    .insert("g", ".domain")
                    .attr("class", "tick")
                    .style("opacity", "1");
                // MEMO: No exit transition. The reason is this transition affects max tick width calculation because old tick will be included in the ticks.
                var tickExit = tick.exit().remove();
                // enter + update selection
                tick = tickEnter.merge(tick);
                tickShow.tick && tickEnter.append("line");
                tickShow.text && tickEnter.append("text");
                var sizeFor1Char_1 = AxisRendererHelper.getSizeFor1Char(tick);
                var counts_1 = [];
                var tspan = tick.select("text")
                    .selectAll("tspan")
                    .data(function (d, index) {
                    var split = params.tickMultiline ?
                        splitTickText(d, scale1, ticks_1, isLeftRight, sizeFor1Char_1.w) : (isArray(helper.textFormatted(d)) ?
                        helper.textFormatted(d).concat() : [helper.textFormatted(d)]);
                    counts_1[index] = split.length;
                    return split.map(function (splitted) { return ({ index: index, splitted: splitted }); });
                });
                tspan.exit().remove();
                tspan = tspan
                    .enter()
                    .append("tspan")
                    .merge(tspan)
                    .text(function (d) { return d.splitted; });
                // set <tspan>'s position
                tspan
                    .attr("x", isTopBottom ? 0 : tickLength * sign)
                    .attr("dx", (function () {
                    var dx = 0;
                    if (/(top|bottom)/.test(orient) && rotate) {
                        dx = 8 * Math.sin(Math.PI * (rotate / 180)) * (orient === "top" ? -1 : 1);
                    }
                    return dx + (tickTextPos.x || 0);
                })())
                    .attr("dy", function (d, i) {
                    var defValue = ".71em";
                    var dy = 0;
                    if (orient !== "top") {
                        dy = sizeFor1Char_1.h;
                        if (i === 0) {
                            dy = isLeftRight ? -((counts_1[d.index] - 1) * (sizeFor1Char_1.h / 2) - 3) :
                                (tickTextPos.y === 0 ? defValue : 0);
                        }
                    }
                    return isNumber(dy) && tickTextPos.y ?
                        dy + tickTextPos.y : dy || defValue;
                });
                var lineUpdate = tick.select("line");
                var textUpdate = tick.select("text");
                tickEnter.select("line").attr(axisPx + "2", innerTickSize * sign);
                tickEnter.select("text").attr(axisPx, tickLength * sign);
                ctx.setTickLineTextPosition(lineUpdate, textUpdate);
                // Append <title> for tooltip display
                if (params.tickTitle) {
                    var title = textUpdate.select("title");
                    (title.empty() ? textUpdate.append("title") : title)
                        .text(function (index) { return params.tickTitle[index]; });
                }
                if (scale1.bandwidth) {
                    var x_1 = scale1;
                    var dx_1 = x_1.bandwidth() / 2;
                    scale0 = function (d) { return x_1(d) + dx_1; };
                    scale1 = scale0;
                }
                else if (scale0.bandwidth) {
                    scale0 = scale1;
                }
                else {
                    tickTransform(tickExit, scale1);
                }
                tickTransform(tickEnter, scale0);
                tickTransform(helper.transitionise(tick).style("opacity", "1"), scale1);
            }
        });
        this.g = $g;
    };
    /**
     * Get tick x/y coordinate
     * @returns {{x: number, y: number}}
     * @private
     */
    AxisRenderer.prototype.getTickXY = function () {
        var config = this.config;
        var pos = { x: 0, y: 0 };
        if (this.params.isCategory) {
            pos.x = config.tickCentered ? 0 : config.tickOffset;
            pos.y = config.tickCentered ? config.tickOffset : 0;
        }
        return pos;
    };
    /**
     * Get tick size
     * @param {object} d data object
     * @returns {number}
     * @private
     */
    AxisRenderer.prototype.getTickSize = function (d) {
        var scale = this.helper.scale;
        var config = this.config;
        var innerTickSize = config.innerTickSize, range = config.range;
        var tickPosition = scale(d) +
            (config.tickCentered ? 0 : config.tickOffset);
        return range[0] < tickPosition && tickPosition < range[1] ? innerTickSize : 0;
    };
    /**
     * Set tick's line & text position
     * @param {d3.selection} lineUpdate Line selection
     * @param {d3.selection} textUpdate Text selection
     * @private
     */
    AxisRenderer.prototype.setTickLineTextPosition = function (lineUpdate, textUpdate) {
        var tickPos = this.getTickXY();
        var _a = this.config, innerTickSize = _a.innerTickSize, orient = _a.orient, tickLength = _a.tickLength, tickOffset = _a.tickOffset;
        var rotate = this.params.tickTextRotate;
        var textAnchorForText = function (r) {
            var value = ["start", "end"];
            orient === "top" && value.reverse();
            return !r ? "middle" : (r > 0 ? value[0] : value[1]);
        };
        var textTransform = function (r) { return (r ? "rotate(" + r + ")" : null); };
        var yForText = function (r) {
            var r2 = r / (orient === "bottom" ? 15 : 23);
            return r ? 11.5 - 2.5 * r2 * (r > 0 ? 1 : -1) : tickLength;
        };
        switch (orient) {
            case "bottom":
                lineUpdate
                    .attr("x1", tickPos.x)
                    .attr("x2", tickPos.x)
                    .attr("y2", this.getTickSize.bind(this));
                textUpdate
                    .attr("x", 0)
                    .attr("y", yForText(rotate))
                    .style("text-anchor", textAnchorForText(rotate))
                    .attr("transform", textTransform(rotate));
                break;
            case "top":
                lineUpdate
                    .attr("x2", 0)
                    .attr("y2", -innerTickSize);
                textUpdate
                    .attr("x", 0)
                    .attr("y", -yForText(rotate) * 2)
                    .style("text-anchor", textAnchorForText(rotate))
                    .attr("transform", textTransform(rotate));
                break;
            case "left":
                lineUpdate
                    .attr("x2", -innerTickSize)
                    .attr("y1", tickPos.y)
                    .attr("y2", tickPos.y);
                textUpdate
                    .attr("x", -tickLength)
                    .attr("y", tickOffset)
                    .style("text-anchor", "end");
                break;
            case "right":
                lineUpdate
                    .attr("x2", innerTickSize)
                    .attr("y2", 0);
                textUpdate
                    .attr("x", tickLength)
                    .attr("y", 0)
                    .style("text-anchor", "start");
        }
    };
    // this should be called only when category axis
    AxisRenderer.prototype.splitTickText = function (d, scale, ticks, isLeftRight, charWidth) {
        var params = this.params;
        var tickText = this.helper.textFormatted(d);
        var splitted = isString(tickText) && tickText.indexOf("\n") > -1 ?
            tickText.split("\n") : [];
        if (splitted.length) {
            return splitted;
        }
        if (isArray(tickText)) {
            return tickText;
        }
        var tickWidth = params.tickWidth;
        if (!tickWidth || tickWidth <= 0) {
            tickWidth = isLeftRight ? 95 : (params.isCategory ?
                (Math.ceil(scale(ticks[1]) - scale(ticks[0])) - 12) : 110);
        }
        // split given text by tick width size
        // eslint-disable-next-line
        function split(splitted, text) {
            var subtext;
            var spaceIndex;
            var textWidth;
            for (var i = 1; i < text.length; i++) {
                if (text.charAt(i) === " ") {
                    spaceIndex = i;
                }
                subtext = text.substr(0, i + 1);
                textWidth = charWidth * subtext.length;
                // if text width gets over tick width, split by space index or current index
                if (tickWidth < textWidth) {
                    return split(splitted.concat(text.substr(0, spaceIndex || i)), text.slice(spaceIndex ? spaceIndex + 1 : i));
                }
            }
            return splitted.concat(text);
        }
        return split(splitted, String(tickText));
    };
    AxisRenderer.prototype.scale = function (x) {
        if (!arguments.length) {
            return this.helper.scale;
        }
        this.helper.scale = x;
        return this;
    };
    AxisRenderer.prototype.orient = function (x) {
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
    };
    AxisRenderer.prototype.tickFormat = function (format) {
        var config = this.config;
        if (!arguments.length) {
            return config.tickFormat;
        }
        config.tickFormat = format;
        return this;
    };
    AxisRenderer.prototype.tickCentered = function (isCentered) {
        var config = this.config;
        if (!arguments.length) {
            return config.tickCentered;
        }
        config.tickCentered = isCentered;
        return this;
    };
    /**
     * Return tick's offset value.
     * The value will be set for 'category' axis type.
     * @returns {number}
     * @private
     */
    AxisRenderer.prototype.tickOffset = function () {
        return this.config.tickOffset;
    };
    /**
     * Get tick interval count
     * @private
     * @param {number} size Total data size
     * @returns {number}
     */
    AxisRenderer.prototype.tickInterval = function (size) {
        var _this = this;
        var interval;
        if (this.params.isCategory) {
            interval = this.config.tickOffset * 2;
        }
        else {
            var length_1 = this.g.select("path.domain")
                .node()
                .getTotalLength() - this.config.outerTickSize * 2;
            interval = length_1 / (size || this.g.selectAll("line").size());
            // get the interval by its values
            var intervalByValue = this.config.tickValues
                .map(function (v, i, arr) {
                var next = i + 1;
                return next < arr.length ?
                    _this.helper.scale(arr[next]) - _this.helper.scale(v) : null;
            }).filter(Boolean);
            interval = Math.min.apply(Math, __spreadArray(__spreadArray([], intervalByValue), [interval]));
        }
        return interval === Infinity ? 0 : interval;
    };
    AxisRenderer.prototype.ticks = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var config = this.config;
        if (!args.length) {
            return config.tickArguments;
        }
        config.tickArguments = toArray(args);
        return this;
    };
    AxisRenderer.prototype.tickCulling = function (culling) {
        var config = this.config;
        if (!arguments.length) {
            return config.tickCulling;
        }
        config.tickCulling = culling;
        return this;
    };
    AxisRenderer.prototype.tickValues = function (x) {
        var _this = this;
        var config = this.config;
        if (isFunction(x)) {
            config.tickValues = function () { return x(_this.helper.scale.domain()); };
        }
        else {
            if (!arguments.length) {
                return config.tickValues;
            }
            config.tickValues = x;
        }
        return this;
    };
    AxisRenderer.prototype.setTransition = function (t) {
        this.config.transition = t;
        return this;
    };
    return AxisRenderer;
}());

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var axis = {
    getAxisInstance: function () {
        return this.axis || new Axis(this);
    }
};
var Axis = /** @class */ (function () {
    function Axis(owner) {
        this.axesList = {};
        this.tick = {
            x: null, y: null, y2: null
        };
        this.xs = [];
        this.orient = {
            x: "bottom",
            y: "left",
            y2: "right",
            subX: "bottom"
        };
        this.owner = owner;
        this.setOrient();
    }
    Axis.prototype.getAxisClassName = function (id) {
        return CLASS.axis + " " + CLASS["axis" + capitalize(id)];
    };
    Axis.prototype.isHorizontal = function ($$, forHorizontal) {
        var isRotated = $$.config.axis_rotated;
        return forHorizontal ? isRotated : !isRotated;
    };
    Axis.prototype.isCategorized = function () {
        var _a = this.owner, config = _a.config, state = _a.state;
        return config.axis_x_type.indexOf("category") >= 0 || state.hasRadar;
    };
    Axis.prototype.isCustomX = function () {
        var config = this.owner.config;
        return !this.isTimeSeries() && (config.data_x || notEmpty(config.data_xs));
    };
    Axis.prototype.isTimeSeries = function (id) {
        if (id === void 0) { id = "x"; }
        return this.owner.config["axis_" + id + "_type"] === "timeseries";
    };
    Axis.prototype.isLog = function (id) {
        if (id === void 0) { id = "x"; }
        return this.owner.config["axis_" + id + "_type"] === "log";
    };
    Axis.prototype.isTimeSeriesY = function () {
        return this.isTimeSeries("y");
    };
    Axis.prototype.getAxisType = function (id) {
        if (id === void 0) { id = "x"; }
        var type = "linear";
        if (this.isTimeSeries(id)) {
            type = "time";
        }
        else if (this.isLog(id)) {
            type = "log";
        }
        return type;
    };
    Axis.prototype.init = function () {
        var _this = this;
        var $$ = this.owner;
        var config = $$.config, _a = $$.$el, main = _a.main, axis = _a.axis, clip = $$.state.clip;
        var isRotated = config.axis_rotated;
        var target = ["x", "y"];
        config.axis_y2_show && target.push("y2");
        target.forEach(function (v) {
            var classAxis = _this.getAxisClassName(v);
            var classLabel = CLASS["axis" + v.toUpperCase() + "Label"];
            axis[v] = main.append("g")
                .attr("class", classAxis)
                .attr("clip-path", function () {
                var res = null;
                if (v === "x") {
                    res = clip.pathXAxis;
                }
                else if (v === "y") { // && config.axis_y_inner) {
                    res = clip.pathYAxis;
                }
                return res;
            })
                .attr("transform", $$.getTranslate(v))
                .style("visibility", config["axis_" + v + "_show"] ? "visible" : "hidden");
            axis[v].append("text")
                .attr("class", classLabel)
                .attr("transform", ["rotate(-90)", null][v === "x" ? +!isRotated : +isRotated])
                .style("text-anchor", function () { return _this.textAnchorForAxisLabel(v); });
            _this.generateAxes(v);
        });
    };
    /**
     * Set axis orient according option value
     * @private
     */
    Axis.prototype.setOrient = function () {
        var $$ = this.owner;
        var _a = $$.config, isRotated = _a.axis_rotated, yInner = _a.axis_y_inner, y2Inner = _a.axis_y2_inner;
        this.orient = {
            x: isRotated ? "left" : "bottom",
            y: isRotated ? (yInner ? "top" : "bottom") : (yInner ? "right" : "left"),
            y2: isRotated ? (y2Inner ? "bottom" : "top") : (y2Inner ? "left" : "right"),
            subX: isRotated ? "left" : "bottom"
        };
    };
    /**
     * Generate axes
     * It's used when axis' axes option is set
     * @param {string} id Axis id
     * @private
     */
    Axis.prototype.generateAxes = function (id) {
        var $$ = this.owner;
        var config = $$.config;
        var axes = [];
        var axesConfig = config["axis_" + id + "_axes"];
        var isRotated = config.axis_rotated;
        var d3Axis;
        if (id === "x") {
            d3Axis = isRotated ? axisLeft : axisBottom;
        }
        else if (id === "y") {
            d3Axis = isRotated ? axisBottom : axisLeft;
        }
        else if (id === "y2") {
            d3Axis = isRotated ? axisTop : axisRight;
        }
        if (axesConfig.length) {
            axesConfig.forEach(function (v) {
                var tick = v.tick || {};
                var scale = $$.scale[id].copy();
                v.domain && scale.domain(v.domain);
                axes.push(d3Axis(scale)
                    .ticks(tick.count)
                    .tickFormat(isFunction(tick.format) ? tick.format.bind($$.api) : (function (x) { return x; }))
                    .tickValues(tick.values)
                    .tickSizeOuter(tick.outer === false ? 0 : 6));
            });
        }
        this.axesList[id] = axes;
    };
    /**
     * Update axes nodes
     * @private
     */
    Axis.prototype.updateAxes = function () {
        var _this = this;
        var $$ = this.owner;
        var config = $$.config, main = $$.$el.main;
        Object.keys(this.axesList).forEach(function (id) {
            var axesConfig = config["axis_" + id + "_axes"];
            var scale = $$.scale[id].copy();
            var range = scale.range();
            _this.axesList[id].forEach(function (v, i) {
                var axisRange = v.scale().range();
                // adjust range value with the current
                // https://github.com/naver/billboard.js/issues/859
                if (!range.every(function (v, i) { return v === axisRange[i]; })) {
                    v.scale().range(range);
                }
                var className = _this.getAxisClassName(id) + "-" + (i + 1);
                var g = main.select("." + className.replace(/\s/, "."));
                if (g.empty()) {
                    g = main.append("g")
                        .attr("class", className)
                        .style("visibility", config["axis_" + id + "_show"] ? "visible" : "hidden")
                        .call(v);
                }
                else {
                    axesConfig[i].domain && scale.domain(axesConfig[i].domain);
                    _this.x.helper.transitionise(g)
                        .call(v.scale(scale));
                }
                g.attr("transform", $$.getTranslate(id, i + 1));
            });
        });
    };
    /**
     * Set Axis & tick values
     * called from: updateScales()
     * @param {string} id Axis id string
     * @param {d3Scale} scale Scale
     * @param {boolean} outerTick If show outer tick
     * @param {boolean} noTransition If with no transition
     * @private
     */
    Axis.prototype.setAxis = function (id, scale, outerTick, noTransition) {
        var $$ = this.owner;
        if (id !== "subX") {
            this.tick[id] = this.getTickValues(id);
        }
        // @ts-ignore
        this[id] = this.getAxis(id, scale, outerTick, 
        // do not transit x Axis on zoom and resizing
        // https://github.com/naver/billboard.js/issues/1949
        id === "x" && ($$.scale.zoom || $$.config.subchart_show || $$.state.resizing) ? true : noTransition);
    };
    // called from : getMaxTickWidth()
    Axis.prototype.getAxis = function (id, scale, outerTick, noTransition, noTickTextRotate) {
        var $$ = this.owner;
        var config = $$.config;
        var isX = /^(x|subX)$/.test(id);
        var type = isX ? "x" : id;
        var isCategory = isX && this.isCategorized();
        var orient = this.orient[id];
        var tickTextRotate = noTickTextRotate ? 0 : $$.getAxisTickRotate(type);
        var tickFormat;
        if (isX) {
            tickFormat = $$.format.xAxisTick;
        }
        else {
            var fn = config["axis_" + id + "_tick_format"];
            if (isFunction(fn)) {
                tickFormat = fn.bind($$.api);
            }
        }
        var tickValues = this.tick[type];
        var axisParams = mergeObj({
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
        if (!isX) {
            axisParams.tickStepSize = config["axis_" + type + "_tick_stepSize"];
        }
        var axis = new AxisRenderer(axisParams)
            .scale((isX && $$.scale.zoom) || scale)
            .orient(orient);
        if (isX && this.isTimeSeries() && tickValues && !isFunction(tickValues)) {
            var fn_1 = parseDate.bind($$);
            tickValues = tickValues.map(function (v) { return fn_1(v); });
        }
        else if (!isX && this.isTimeSeriesY()) {
            // https://github.com/d3/d3/blob/master/CHANGES.md#time-intervals-d3-time
            axis.ticks(config.axis_y_tick_time_value);
            tickValues = null;
        }
        tickValues && axis.tickValues(tickValues);
        // Set tick
        axis.tickFormat(tickFormat || (!isX && ($$.isStackNormalized() && (function (x) { return x + "%"; }))));
        if (isCategory) {
            axis.tickCentered(config.axis_x_tick_centered);
            if (isEmpty(config.axis_x_tick_culling)) {
                config.axis_x_tick_culling = false;
            }
        }
        var tickCount = config["axis_" + type + "_tick_count"];
        tickCount && axis.ticks(tickCount);
        return axis;
    };
    Axis.prototype.updateXAxisTickValues = function (targets, axis) {
        var $$ = this.owner;
        var config = $$.config;
        var fit = config.axis_x_tick_fit;
        var count = config.axis_x_tick_count;
        var values;
        if (fit || (count && fit)) {
            values = $$.mapTargetsToUniqueXs(targets);
            // if given count is greater than the value length, then limit the count.
            if (this.isCategorized() && count > values.length) {
                count = values.length;
            }
            values = this.generateTickValues(values, count, this.isTimeSeries());
        }
        if (axis) {
            axis.tickValues(values);
        }
        else if (this.x) {
            this.x.tickValues(values);
            this.subX && this.subX.tickValues(values);
        }
        return values;
    };
    Axis.prototype.getId = function (id) {
        var _a = this.owner, config = _a.config, scale = _a.scale;
        var axis = config.data_axes[id];
        // when data.axes option has 'y2', but 'axis.y2.show=true' isn't set will return 'y'
        if (!axis || !scale[axis]) {
            axis = "y";
        }
        return axis;
    };
    Axis.prototype.getXAxisTickFormat = function () {
        var $$ = this.owner;
        var config = $$.config, format = $$.format;
        var tickFormat = config.axis_x_tick_format;
        var isTimeSeries = this.isTimeSeries();
        var isCategorized = this.isCategorized();
        var currFormat;
        if (tickFormat) {
            if (isFunction(tickFormat)) {
                currFormat = tickFormat.bind($$.api);
            }
            else if (isTimeSeries) {
                currFormat = function (date) { return (date ? format.axisTime(tickFormat)(date) : ""); };
            }
        }
        else {
            currFormat = isTimeSeries ? format.defaultAxisTime : (isCategorized ?
                $$.categoryName : function (v) { return (v < 0 ? v.toFixed(0) : v); });
        }
        return isFunction(currFormat) ? function (v) {
            return currFormat.apply($$, isCategorized ?
                [v, $$.categoryName(v)] : [v]);
        } : currFormat;
    };
    Axis.prototype.getTickValues = function (id) {
        var $$ = this.owner;
        var tickValues = $$.config["axis_" + id + "_tick_values"];
        var axis = $$[id + "Axis"];
        return (isFunction(tickValues) ? tickValues.call($$.api) : tickValues) ||
            (axis ? axis.tickValues() : undefined);
    };
    Axis.prototype.getLabelOptionByAxisId = function (id) {
        return this.owner.config["axis_" + id + "_label"];
    };
    Axis.prototype.getLabelText = function (id) {
        var option = this.getLabelOptionByAxisId(id);
        return isString(option) ? option : (option ? option.text : null);
    };
    Axis.prototype.setLabelText = function (id, text) {
        var $$ = this.owner;
        var config = $$.config;
        var option = this.getLabelOptionByAxisId(id);
        if (isString(option)) {
            config["axis_" + id + "_label"] = text;
        }
        else if (option) {
            option.text = text;
        }
    };
    Axis.prototype.getLabelPosition = function (id, defaultPosition) {
        var isRotated = this.owner.config.axis_rotated;
        var option = this.getLabelOptionByAxisId(id);
        var position = (isObjectType(option) && option.position) ?
            option.position : defaultPosition[+!isRotated];
        var has = function (v) { return !!~position.indexOf(v); };
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
    };
    Axis.prototype.getAxisLabelPosition = function (id) {
        return this.getLabelPosition(id, id === "x" ? ["inner-top", "inner-right"] : ["inner-right", "inner-top"]);
    };
    Axis.prototype.getLabelPositionById = function (id) {
        return this.getAxisLabelPosition(id);
    };
    Axis.prototype.xForAxisLabel = function (id) {
        var $$ = this.owner;
        var _a = $$.state, width = _a.width, height = _a.height;
        var position = this.getAxisLabelPosition(id);
        var x = position.isMiddle ? -height / 2 : 0;
        if (this.isHorizontal($$, id !== "x")) {
            x = position.isLeft ? 0 : (position.isCenter ? width / 2 : width);
        }
        else if (position.isBottom) {
            x = -height;
        }
        return x;
    };
    Axis.prototype.dxForAxisLabel = function (id) {
        var $$ = this.owner;
        var position = this.getAxisLabelPosition(id);
        var dx = position.isBottom ? "0.5em" : "0";
        if (this.isHorizontal($$, id !== "x")) {
            dx = position.isLeft ? "0.5em" : (position.isRight ? "-0.5em" : "0");
        }
        else if (position.isTop) {
            dx = "-0.5em";
        }
        return dx;
    };
    Axis.prototype.textAnchorForAxisLabel = function (id) {
        var $$ = this.owner;
        var position = this.getAxisLabelPosition(id);
        var anchor = position.isMiddle ? "middle" : "end";
        if (this.isHorizontal($$, id !== "x")) {
            anchor = position.isLeft ? "start" : (position.isCenter ? "middle" : "end");
        }
        else if (position.isBottom) {
            anchor = "start";
        }
        return anchor;
    };
    Axis.prototype.dyForAxisLabel = function (id) {
        var $$ = this.owner;
        var config = $$.config;
        var isRotated = config.axis_rotated;
        var isInner = this.getAxisLabelPosition(id).isInner;
        var tickRotate = config["axis_" + id + "_tick_rotate"] ? $$.getHorizontalAxisHeight(id) : 0;
        var maxTickWidth = this.getMaxTickWidth(id);
        var dy;
        if (id === "x") {
            var xHeight = config.axis_x_height;
            if (isRotated) {
                dy = isInner ? "1.2em" : -25 - maxTickWidth;
            }
            else if (isInner) {
                dy = "-0.5em";
            }
            else if (xHeight) {
                dy = xHeight - 10;
            }
            else if (tickRotate) {
                dy = tickRotate - 10;
            }
            else {
                dy = "3em";
            }
        }
        else {
            dy = {
                y: ["-0.5em", 10, "3em", "1.2em", 10],
                y2: ["1.2em", -20, "-2.2em", "-0.5em", 15]
            }[id];
            if (isRotated) {
                if (isInner) {
                    dy = dy[0];
                }
                else if (tickRotate) {
                    dy = tickRotate * (id === "y2" ? -1 : 1) - dy[1];
                }
                else {
                    dy = dy[2];
                }
            }
            else {
                dy = isInner ?
                    dy[3] : (dy[4] + (config["axis_" + id + "_inner"] ? 0 : (maxTickWidth + dy[4]))) * (id === "y" ? -1 : 1);
            }
        }
        return dy;
    };
    Axis.prototype.getMaxTickWidth = function (id, withoutRecompute) {
        var $$ = this.owner;
        var config = $$.config, current = $$.state.current, _a = $$.$el, svg = _a.svg, chart = _a.chart;
        var currentTickMax = current.maxTickWidths[id];
        var maxWidth = 0;
        if (withoutRecompute || !config["axis_" + id + "_show"] || $$.filterTargetsToShow().length === 0) {
            return currentTickMax.size;
        }
        if (svg) {
            var isYAxis_1 = /^y2?$/.test(id);
            var targetsToShow = $$.filterTargetsToShow($$.data.targets);
            var scale = $$.scale[id].copy().domain($$["get" + (isYAxis_1 ? "Y" : "X") + "Domain"](targetsToShow, id));
            var domain = scale.domain();
            var isDomainSame = domain[0] === domain[1] && domain.every(function (v) { return v > 0; });
            var isCurrentMaxTickDomainSame = isArray(currentTickMax.domain) &&
                currentTickMax.domain[0] === currentTickMax.domain[1] &&
                currentTickMax.domain.every(function (v) { return v > 0; });
            // do not compute if domain or currentMaxTickDomain is same
            if (isDomainSame || isCurrentMaxTickDomainSame) {
                return currentTickMax.size;
            }
            else {
                currentTickMax.domain = domain;
            }
            // reset old max state value to prevent from new data loading
            if (!isYAxis_1) {
                currentTickMax.ticks.splice(0);
            }
            var axis = this.getAxis(id, scale, false, false, true);
            var tickCount = config["axis_" + id + "_tick_count"];
            var tickValues = config["axis_" + id + "_tick_values"];
            // Make to generate the final tick text to be rendered
            // https://github.com/naver/billboard.js/issues/920
            // Do not generate if 'tick values' option is given
            // https://github.com/naver/billboard.js/issues/1251
            if (!tickValues && tickCount) {
                axis.tickValues(this.generateTickValues(domain, tickCount, isYAxis_1 ? this.isTimeSeriesY() : this.isTimeSeries()));
            }
            !isYAxis_1 && this.updateXAxisTickValues(targetsToShow, axis);
            var dummy = chart.append("svg")
                .style("visibility", "hidden")
                .style("position", "fixed")
                .style("top", "0px")
                .style("left", "0px");
            axis.create(dummy);
            dummy.selectAll("text")
                .each(function (d, i) {
                var currentTextWidth = this.getBoundingClientRect().width;
                maxWidth = Math.max(maxWidth, currentTextWidth);
                // cache tick text width for getXAxisTickTextY2Overflow()
                if (!isYAxis_1) {
                    currentTickMax.ticks[i] = currentTextWidth;
                }
            });
            dummy.remove();
        }
        if (maxWidth > 0) {
            currentTickMax.size = maxWidth;
        }
        return currentTickMax.size;
    };
    Axis.prototype.getXAxisTickTextY2Overflow = function (defaultPadding) {
        var $$ = this.owner;
        var axis = $$.axis, config = $$.config, state = $$.state;
        var xAxisTickRotate = $$.getAxisTickRotate("x");
        var positiveRotation = xAxisTickRotate > 0 && xAxisTickRotate < 90;
        if ((axis.isCategorized() || axis.isTimeSeries()) &&
            config.axis_x_tick_fit &&
            !config.axis_x_tick_culling &&
            !config.axis_x_tick_multiline &&
            positiveRotation) {
            var widthWithoutCurrentPaddingLeft = state.current.width - $$.getCurrentPaddingLeft();
            var maxOverflow = this.getXAxisTickMaxOverflow(xAxisTickRotate, widthWithoutCurrentPaddingLeft - defaultPadding);
            var xAxisTickTextY2Overflow = Math.max(0, maxOverflow) +
                defaultPadding; // for display inconsistencies between browsers
            return Math.min(xAxisTickTextY2Overflow, widthWithoutCurrentPaddingLeft / 2);
        }
        return 0;
    };
    Axis.prototype.getXAxisTickMaxOverflow = function (xAxisTickRotate, widthWithoutCurrentPaddingLeft) {
        var $$ = this.owner;
        var axis = $$.axis, config = $$.config, state = $$.state;
        var isTimeSeries = axis.isTimeSeries();
        var tickTextWidths = state.current.maxTickWidths.x.ticks;
        var tickCount = tickTextWidths.length;
        var _a = state.axis.x.padding, left = _a.left, right = _a.right;
        var maxOverflow = 0;
        var remaining = tickCount - (isTimeSeries && config.axis_x_tick_fit ? 0.5 : 0);
        for (var i = 0; i < tickCount; i++) {
            var tickIndex = i + 1;
            var rotatedTickTextWidth = Math.cos(Math.PI * xAxisTickRotate / 180) * tickTextWidths[i];
            var ticksBeforeTickText = tickIndex - (isTimeSeries ? 1 : 0.5) + left;
            // Skip ticks if there are no ticks before them
            if (ticksBeforeTickText <= 0) {
                continue;
            }
            var xAxisLengthWithoutTickTextWidth = widthWithoutCurrentPaddingLeft - rotatedTickTextWidth;
            var tickLength = xAxisLengthWithoutTickTextWidth / ticksBeforeTickText;
            var remainingTicks = remaining - tickIndex;
            var paddingRightLength = right * tickLength;
            var remainingTickWidth = (remainingTicks * tickLength) + paddingRightLength;
            var overflow = rotatedTickTextWidth - (tickLength / 2) - remainingTickWidth;
            maxOverflow = Math.max(maxOverflow, overflow);
        }
        var filteredTargets = $$.filterTargetsToShow($$.data.targets);
        var tickOffset = 0;
        if (!isTimeSeries &&
            config.axis_x_tick_count <= filteredTargets.length && filteredTargets[0].values.length) {
            var scale = getScale($$.axis.getAxisType("x"), 0, widthWithoutCurrentPaddingLeft - maxOverflow)
                .domain([
                left * -1,
                $$.getXDomainMax($$.data.targets) + 1 + right
            ]);
            tickOffset = (Math.ceil((scale(1) - scale(0)) / 2));
        }
        return maxOverflow + tickOffset;
    };
    /**
     * Get x Axis padding
     * @param {number} tickCount Tick count
     * @returns {object} Padding object values with 'left' & 'right' key
     * @private
     */
    Axis.prototype.getXAxisPadding = function (tickCount) {
        var $$ = this.owner;
        var padding = $$.config.axis_x_padding;
        if (isEmpty(padding)) {
            padding = { left: 0, right: 0 };
        }
        else {
            padding.left = padding.left || 0;
            padding.right = padding.right || 0;
        }
        if ($$.axis.isTimeSeries()) {
            var firstX = +$$.getXDomainMin($$.data.targets);
            var lastX = +$$.getXDomainMax($$.data.targets);
            var timeDiff = lastX - firstX;
            var range = timeDiff + padding.left + padding.right;
            var left = 0;
            var right = 0;
            if (tickCount && range) {
                var relativeTickWidth = (timeDiff / tickCount) / range;
                left = padding.left / range / relativeTickWidth;
                right = padding.right / range / relativeTickWidth;
            }
            padding = { left: left, right: right };
        }
        return padding;
    };
    Axis.prototype.updateLabels = function (withTransition) {
        var _this = this;
        var $$ = this.owner;
        var main = $$.$el.main;
        var labels = {
            x: main.select("." + CLASS.axisX + " ." + CLASS.axisXLabel),
            y: main.select("." + CLASS.axisY + " ." + CLASS.axisYLabel),
            y2: main.select("." + CLASS.axisY2 + " ." + CLASS.axisY2Label)
        };
        Object.keys(labels).filter(function (id) { return !labels[id].empty(); })
            .forEach(function (v) {
            var node = labels[v];
            (withTransition ? node.transition() : node)
                .attr("x", function () { return _this.xForAxisLabel(v); })
                .attr("dx", function () { return _this.dxForAxisLabel(v); })
                .attr("dy", function () { return _this.dyForAxisLabel(v); })
                .text(function () { return _this.getLabelText(v); });
        });
    };
    Axis.prototype.getPadding = function (padding, key, defaultValue, domainLength) {
        var p = isNumber(padding) ? padding : padding[key];
        if (!isValue(p)) {
            return defaultValue;
        }
        return this.convertPixelsToAxisPadding(p, domainLength);
    };
    Axis.prototype.convertPixelsToAxisPadding = function (pixels, domainLength) {
        var $$ = this.owner;
        var config = $$.config, _a = $$.state, width = _a.width, height = _a.height;
        var length = config.axis_rotated ? width : height;
        return domainLength * (pixels / length);
    };
    Axis.prototype.generateTickValues = function (values, tickCount, forTimeSeries) {
        var tickValues = values;
        if (tickCount) {
            var targetCount = isFunction(tickCount) ? tickCount() : tickCount;
            // compute ticks according to tickCount
            if (targetCount === 1) {
                tickValues = [values[0]];
            }
            else if (targetCount === 2) {
                tickValues = [values[0], values[values.length - 1]];
            }
            else if (targetCount > 2) {
                var isCategorized = this.isCategorized();
                var count = targetCount - 2;
                var start = values[0];
                var end = values[values.length - 1];
                var interval = (end - start) / (count + 1);
                var tickValue = void 0;
                // re-construct unique values
                tickValues = [start];
                for (var i = 0; i < count; i++) {
                    tickValue = +start + interval * (i + 1);
                    tickValues.push(forTimeSeries ? new Date(tickValue) : (isCategorized ? Math.round(tickValue) : tickValue));
                }
                tickValues.push(end);
            }
        }
        if (!forTimeSeries) {
            tickValues = tickValues.sort(function (a, b) { return a - b; });
        }
        return tickValues;
    };
    Axis.prototype.generateTransitions = function (duration) {
        var $$ = this.owner;
        var axis = $$.$el.axis;
        var _a = ["x", "y", "y2", "subX"]
            .map(function (v) {
            var ax = axis[v];
            if (ax && duration) {
                ax = ax.transition().duration(duration);
            }
            return ax;
        }), axisX = _a[0], axisY = _a[1], axisY2 = _a[2], axisSubX = _a[3];
        return { axisX: axisX, axisY: axisY, axisY2: axisY2, axisSubX: axisSubX };
    };
    Axis.prototype.redraw = function (transitions, isHidden, isInit) {
        var _this = this;
        var $$ = this.owner;
        var config = $$.config, $el = $$.$el;
        var opacity = isHidden ? "0" : "1";
        ["x", "y", "y2", "subX"].forEach(function (id) {
            var axis = _this[id];
            var $axis = $el.axis[id];
            if (axis && $axis) {
                if (!isInit && !config.transition_duration) {
                    axis.config.withoutTransition = true;
                }
                $axis.style("opacity", opacity);
                axis.create(transitions["axis" + capitalize(id)]);
            }
        });
        this.updateAxes();
    };
    /**
     * Redraw axis
     * @param {Array} targetsToShow targets data to be shown
     * @param {object} wth option object
     * @param {d3.Transition} transitions Transition object
     * @param {object} flow flow object
     * @param {boolean} isInit called from initialization
     * @private
     */
    Axis.prototype.redrawAxis = function (targetsToShow, wth, transitions, flow, isInit) {
        var _this = this;
        var $$ = this.owner;
        var config = $$.config, scale = $$.scale, $el = $$.$el;
        var hasZoom = !!scale.zoom;
        var xDomainForZoom;
        if (!hasZoom && this.isCategorized() && targetsToShow.length === 0) {
            scale.x.domain([0, $el.axis.x.selectAll(".tick").size()]);
        }
        if (scale.x && targetsToShow.length) {
            !hasZoom &&
                $$.updateXDomain(targetsToShow, wth.UpdateXDomain, wth.UpdateOrgXDomain, wth.TrimXDomain);
            if (!config.axis_x_tick_values) {
                this.updateXAxisTickValues(targetsToShow);
            }
        }
        else if (this.x) {
            this.x.tickValues([]);
            this.subX && this.subX.tickValues([]);
        }
        if (config.zoom_rescale && !flow) {
            xDomainForZoom = scale.x.orgDomain();
        }
        ["y", "y2"].forEach(function (key) {
            var axisScale = scale[key];
            if (axisScale) {
                var tickValues = config["axis_" + key + "_tick_values"];
                var tickCount = config["axis_" + key + "_tick_count"];
                axisScale.domain($$.getYDomain(targetsToShow, key, xDomainForZoom));
                if (!tickValues && tickCount) {
                    var axis = $$.axis[key];
                    var domain = axisScale.domain();
                    axis.tickValues(_this.generateTickValues(domain, domain.every(function (v) { return v === 0; }) ? 1 : tickCount, _this.isTimeSeriesY()));
                }
            }
        });
        // axes
        this.redraw(transitions, $$.hasArcType(), isInit);
        // Update axis label
        this.updateLabels(wth.Transition);
        // show/hide if manual culling needed
        if ((wth.UpdateXDomain || wth.UpdateXAxis || wth.Y) && targetsToShow.length) {
            this.setCulling();
        }
        // Update sub domain
        if (wth.Y) {
            scale.subY && scale.subY.domain($$.getYDomain(targetsToShow, "y"));
            scale.subY2 && scale.subY2.domain($$.getYDomain(targetsToShow, "y2"));
        }
    };
    /**
     * Set manual culling
     * @private
     */
    Axis.prototype.setCulling = function () {
        var $$ = this.owner;
        var config = $$.config, _a = $$.state, clip = _a.clip, current = _a.current, $el = $$.$el;
        ["subX", "x", "y", "y2"].forEach(function (type) {
            var axis = $el.axis[type];
            // subchart x axis should be aligned with x axis culling
            var id = type === "subX" ? "x" : type;
            var toCull = config["axis_" + id + "_tick_culling"];
            if (axis && toCull) {
                var tickText = axis.selectAll(".tick text");
                var tickValues_1 = sortValue(tickText.data());
                var tickSize = tickValues_1.length;
                var cullingMax = config["axis_" + id + "_tick_culling_max"];
                var intervalForCulling_1;
                if (tickSize) {
                    for (var i = 1; i < tickSize; i++) {
                        if (tickSize / i < cullingMax) {
                            intervalForCulling_1 = i;
                            break;
                        }
                    }
                    tickText.each(function (d) {
                        this.style.display = tickValues_1.indexOf(d) % intervalForCulling_1 ? "none" : "block";
                    });
                }
                else {
                    tickText.style("display", "block");
                }
                // set/unset x_axis_tick_clippath
                if (type === "x") {
                    var clipPath = current.maxTickWidths.x.clipPath ? clip.pathXAxisTickTexts : null;
                    $el.svg.selectAll("." + CLASS.axisX + " .tick text")
                        .attr("clip-path", clipPath);
                }
            }
        });
    };
    return Axis;
}());

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var eventrect = {
    /**
     * Initialize the area that detects the event.
     * Add a container for the zone that detects the event.
     * @private
     */
    initEventRect: function () {
        var $$ = this;
        $$.$el.main.select("." + CLASS.chart)
            .append("g")
            .attr("class", CLASS.eventRects)
            .style("fill-opacity", "0");
    },
    /**
     * Redraws the area that detects the event.
     * @private
     */
    redrawEventRect: function () {
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var isMultipleX = $$.isMultipleX();
        if ($el.eventRect) {
            $$.updateEventRect($el.eventRect, true);
        }
        else {
            var eventRects = $$.$el.main.select("." + CLASS.eventRects)
                .style("cursor", config.zoom_enabled && config.zoom_type !== "drag" ? (config.axis_rotated ? "ns-resize" : "ew-resize") : null)
                .classed(CLASS.eventRectsMultiple, isMultipleX)
                .classed(CLASS.eventRectsSingle, !isMultipleX);
            // append event <rect>
            var eventRectUpdate = eventRects.selectAll("." + CLASS.eventRect)
                .data([0])
                .enter()
                .append("rect");
            $$.updateEventRect(eventRectUpdate);
            // bind event to <rect> element
            isMultipleX ?
                $$.generateEventRectsForMultipleXs(eventRectUpdate) :
                $$.generateEventRectsForSingleX(eventRectUpdate);
            // bind draggable selection
            eventRectUpdate.call($$.getDraggableSelection());
            $el.eventRect = eventRectUpdate;
            if ($$.state.inputType === "touch" && !$el.svg.on("touchstart.eventRect") && !$$.hasArcType()) {
                $$.bindTouchOnEventRect(isMultipleX);
            }
        }
        if (!isMultipleX) {
            // Set data and update eventReceiver.data
            var xAxisTickValues = $$.getMaxDataCountTarget();
            // update data's index value to be alinged with the x Axis
            $$.updateDataIndexByX(xAxisTickValues);
            $$.updateXs(xAxisTickValues);
            $$.updatePointClass && $$.updatePointClass(true);
            state.eventReceiver.data = xAxisTickValues;
        }
        $$.updateEventRectData();
    },
    bindTouchOnEventRect: function (isMultipleX) {
        var $$ = this;
        var config = $$.config, state = $$.state, _a = $$.$el, eventRect = _a.eventRect, svg = _a.svg;
        var selectRect = function (context) {
            if (isMultipleX) {
                $$.selectRectForMultipleXs(context);
            }
            else {
                var index = $$.getDataIndexFromEvent(state.event);
                $$.callOverOutForTouch(index);
                index === -1 ?
                    $$.unselectRect() :
                    $$.selectRectForSingle(context, eventRect, index);
            }
        };
        var unselectRect = function () {
            $$.unselectRect();
            $$.callOverOutForTouch();
        };
        // call event.preventDefault()
        // according 'interaction.inputType.touch.preventDefault' option
        var preventDefault = config.interaction_inputType_touch.preventDefault;
        var isPrevented = (isboolean(preventDefault) && preventDefault) || false;
        var preventThreshold = (!isNaN(preventDefault) && preventDefault) || null;
        var startPx;
        var preventEvent = function (event) {
            var eventType = event.type;
            var touch = event.changedTouches[0];
            var currentXY = touch["client" + (config.axis_rotated ? "Y" : "X")];
            // prevent document scrolling
            if (eventType === "touchstart") {
                if (isPrevented) {
                    event.preventDefault();
                }
                else if (preventThreshold !== null) {
                    startPx = currentXY;
                }
            }
            else if (eventType === "touchmove") {
                if (isPrevented || startPx === true || (preventThreshold !== null && Math.abs(startPx - currentXY) >= preventThreshold)) {
                    // once prevented, keep prevented during whole 'touchmove' context
                    startPx = true;
                    event.preventDefault();
                }
            }
        };
        // bind touch events
        eventRect
            .on("touchstart", function (event) {
            state.event = event;
            $$.updateEventRect();
        })
            .on("touchstart.eventRect touchmove.eventRect", function (event) {
            state.event = event;
            if (!eventRect.empty() && eventRect.classed(CLASS.eventRect)) {
                // if touch points are > 1, means doing zooming interaction. In this case do not execute tooltip codes.
                if (state.dragging || state.flowing || $$.hasArcType() || event.touches.length > 1) {
                    return;
                }
                preventEvent(event);
                selectRect(eventRect.node());
            }
            else {
                unselectRect();
            }
        }, true)
            .on("touchend.eventRect", function (event) {
            state.event = event;
            if (!eventRect.empty() && eventRect.classed(CLASS.eventRect)) {
                if ($$.hasArcType() || !$$.toggleShape || state.cancelClick) {
                    state.cancelClick && (state.cancelClick = false);
                }
            }
        }, true);
        svg.on("touchstart", function (event) {
            state.event = event;
            var target = event.target;
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
    updateEventRect: function (eventRect, force) {
        if (force === void 0) { force = false; }
        var $$ = this;
        var state = $$.state, $el = $$.$el;
        var eventReceiver = state.eventReceiver, width = state.width, height = state.height, rendered = state.rendered, resizing = state.resizing;
        var rectElement = eventRect || $el.eventRect;
        var updateClientRect = function () {
            eventReceiver && (eventReceiver.rect = rectElement.node().getBoundingClientRect());
        };
        if (!rendered || resizing || force) {
            rectElement
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", width)
                .attr("height", height);
            // only for init
            if (!rendered) {
                rectElement.attr("class", CLASS.eventRect);
            }
        }
        updateClientRect();
    },
    /**
     * Updates the location and size of the eventRect.
     * @private
     */
    updateEventRectData: function () {
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state;
        var xScale = scale.zoom || scale.x;
        var isRotated = config.axis_rotated;
        var x;
        var y;
        var w;
        var h;
        if ($$.isMultipleX()) {
            // TODO: rotated not supported yet
            x = 0;
            y = 0;
            w = state.width;
            h = state.height;
        }
        else {
            var rectW_1;
            var rectX = void 0;
            if ($$.axis.isCategorized()) {
                rectW_1 = $$.getEventRectWidth();
                rectX = function (d) { return xScale(d.x) - (rectW_1 / 2); };
            }
            else {
                var getPrevNextX_1 = function (_a) {
                    var index = _a.index;
                    return ({
                        prev: $$.getPrevX(index),
                        next: $$.getNextX(index)
                    });
                };
                rectW_1 = function (d) {
                    var x = getPrevNextX_1(d);
                    // if there this is a single data point make the eventRect full width (or height)
                    if (x.prev === null && x.next === null) {
                        return isRotated ? state.height : state.width;
                    }
                    if (x.prev === null) {
                        x.prev = xScale.domain()[0];
                    }
                    if (x.next === null) {
                        x.next = xScale.domain()[1];
                    }
                    return Math.max(0, (xScale(x.next) - xScale(x.prev)) / 2);
                };
                rectX = function (d) {
                    var x = getPrevNextX_1(d);
                    var thisX = d.x;
                    // if there this is a single data point position the eventRect at 0
                    if (x.prev === null && x.next === null) {
                        return 0;
                    }
                    if (x.prev === null) {
                        x.prev = xScale.domain()[0];
                    }
                    return (xScale(thisX) + xScale(x.prev)) / 2;
                };
            }
            x = isRotated ? 0 : rectX;
            y = isRotated ? rectX : 0;
            w = isRotated ? state.width : rectW_1;
            h = isRotated ? rectW_1 : state.height;
        }
        var eventReceiver = state.eventReceiver;
        var call = function (fn, v) { return (isFunction(fn) ? fn(v) : fn); };
        // reset for possible remains coords data before the data loading
        eventReceiver.coords.splice(eventReceiver.data.length);
        eventReceiver.data.forEach(function (d, i) {
            eventReceiver.coords[i] = {
                x: call(x, d),
                y: call(y, d),
                w: call(w, d),
                h: call(h, d)
            };
        });
    },
    selectRectForMultipleXs: function (context) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var targetsToShow = $$.filterTargetsToShow($$.data.targets);
        // do nothing when dragging
        if (state.dragging || $$.hasArcType(targetsToShow)) {
            return;
        }
        var mouse = getPointer(state.event, context);
        var closest = $$.findClosestFromTargets(targetsToShow, mouse);
        if (state.mouseover && (!closest || closest.id !== state.mouseover.id)) {
            config.data_onout.call($$.api, state.mouseover);
            state.mouseover = undefined;
        }
        if (!closest) {
            $$.unselectRect();
            return;
        }
        var sameXData = ($$.isBubbleType(closest) || $$.isScatterType(closest) || !config.tooltip_grouped) ? [closest] : $$.filterByX(targetsToShow, closest.x);
        // show tooltip when cursor is close to some point
        var selectedData = sameXData.map(function (d) { return $$.addName(d); });
        $$.showTooltip(selectedData, context);
        // expand points
        $$.expandCirclesBars(closest.index, closest.id, true);
        // Show xgrid focus line
        $$.showGridFocus(selectedData);
        // Show cursor as pointer if point is close to mouse position
        if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) {
            $$.$el.svg.select("." + CLASS.eventRect).style("cursor", "pointer");
            if (!state.mouseover) {
                config.data_onover.call($$.api, closest);
                state.mouseover = closest;
            }
        }
    },
    /**
     * Unselect EventRect.
     * @private
     */
    unselectRect: function () {
        var $$ = this;
        var config = $$.config, _a = $$.$el, bar = _a.bar, circle = _a.circle, tooltip = _a.tooltip;
        $$.$el.svg.select("." + CLASS.eventRect).style("cursor", null);
        $$.hideGridFocus();
        if (tooltip) {
            $$.hideTooltip();
            $$._handleLinkedCharts(false);
        }
        circle && !config.point_focus_only && $$.unexpandCircles();
        bar && $$.unexpandBars();
    },
    /**
     * Create eventRect for each data on the x-axis.
     * Register touch and drag events.
     * @param {object} eventRectEnter d3.select(CLASS.eventRects) object.
     * @returns {object} d3.select(CLASS.eventRects) object.
     * @private
     */
    generateEventRectsForSingleX: function (eventRectEnter) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var eventReceiver = state.eventReceiver;
        var rect = eventRectEnter
            .style("cursor", config.data_selection_enabled && config.data_selection_grouped ? "pointer" : null)
            .on("click", function (event) {
            state.event = event;
            var currentIdx = eventReceiver.currentIdx, data = eventReceiver.data;
            var d = data[currentIdx === -1 ?
                $$.getDataIndexFromEvent(event) : currentIdx];
            $$.clickHandlerForSingleX.bind(this)(d, $$);
        });
        if (state.inputType === "mouse") {
            var getData_1 = function (event) {
                var index = event ? $$.getDataIndexFromEvent(event) : eventReceiver.currentIdx;
                return index > -1 ? eventReceiver.data[index] : null;
            };
            rect
                .on("mouseover", function (event) {
                state.event = event;
                $$.updateEventRect();
            })
                .on("mousemove", function (event) {
                var d = getData_1(event);
                state.event = event;
                // do nothing while dragging/flowing
                if (state.dragging || state.flowing || $$.hasArcType() ||
                    !d || (config.tooltip_grouped && d && d.index === eventReceiver.currentIdx)) {
                    return;
                }
                var index = d.index;
                if ($$.isStepType(d) &&
                    config.line_step_type === "step-after" &&
                    getPointer(event, this)[0] < $$.scale.x($$.getXValue(d.id, index))) {
                    index -= 1;
                }
                if (index !== eventReceiver.currentIdx) {
                    $$.setOverOut(false, eventReceiver.currentIdx);
                    eventReceiver.currentIdx = index;
                }
                index === -1 ?
                    $$.unselectRect() : $$.selectRectForSingle(this, rect, index);
                // As of individual data point(or <path>) element can't bind mouseover/out event
                // to determine current interacting element, so use 'mousemove' event instead.
                $$.setOverOut(index !== -1, index);
            })
                .on("mouseout", function (event) {
                state.event = event;
                // chart is destroyed
                if (!config || $$.hasArcType() || eventReceiver.currentIdx === -1) {
                    return;
                }
                $$.unselectRect();
                $$.setOverOut(false, eventReceiver.currentIdx);
                // reset the event current index
                eventReceiver.currentIdx = -1;
            });
        }
        return rect;
    },
    clickHandlerForSingleX: function (d, ctx) {
        var $$ = ctx;
        var config = $$.config, state = $$.state, main = $$.$el.main;
        if (!d || $$.hasArcType() || state.cancelClick) {
            state.cancelClick && (state.cancelClick = false);
            return;
        }
        var index = d.index;
        main.selectAll("." + CLASS.shape + "-" + index)
            .each(function (d2) {
            if (config.data_selection_grouped || $$.isWithinShape(this, d2)) {
                $$.toggleShape && $$.toggleShape(this, d2, index);
                config.data_onclick.bind($$.api)(d2, this);
            }
        });
    },
    /**
     * Create an eventRect,
     * Register touch and drag events.
     * @param {object} eventRectEnter d3.select(CLASS.eventRects) object.
     * @private
     */
    generateEventRectsForMultipleXs: function (eventRectEnter) {
        var $$ = this;
        var state = $$.state;
        eventRectEnter
            .on("click", function (event) {
            state.event = event;
            $$.clickHandlerForMultipleXS.bind(this)($$);
        });
        if (state.inputType === "mouse") {
            eventRectEnter
                .on("mouseover mousemove", function (event) {
                state.event = event;
                $$.selectRectForMultipleXs(this);
            })
                .on("mouseout", function (event) {
                state.event = event;
                // chart is destroyed
                if (!$$.config || $$.hasArcType()) {
                    return;
                }
                $$.unselectRect();
            });
        }
    },
    clickHandlerForMultipleXS: function (ctx) {
        var $$ = ctx;
        var config = $$.config, state = $$.state;
        var targetsToShow = $$.filterTargetsToShow($$.data.targets);
        if ($$.hasArcType(targetsToShow)) {
            return;
        }
        var mouse = getPointer(state.event, this);
        var closest = $$.findClosestFromTargets(targetsToShow, mouse);
        if (!closest) {
            return;
        }
        // select if selection enabled
        if ($$.isBarType(closest.id) || $$.dist(closest, mouse) < config.point_sensitivity) {
            $$.$el.main.selectAll("." + CLASS.shapes + $$.getTargetSelectorSuffix(closest.id))
                .selectAll("." + CLASS.shape + "-" + closest.index)
                .each(function () {
                if (config.data_selection_grouped || $$.isWithinShape(this, closest)) {
                    $$.toggleShape && $$.toggleShape(this, closest, closest.index);
                    config.data_onclick.bind($$.api)(closest, this);
                }
            });
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var flow = {
    /**
     * Generate flow
     * @param {object} args option object
     * @returns {Function}
     * @private
     */
    generateFlow: function (args) {
        var $$ = this;
        var data = $$.data, state = $$.state, $el = $$.$el;
        return function () {
            var flowLength = args.flow.length;
            // set flag
            state.flowing = true;
            // remove head data after rendered
            data.targets.forEach(function (d) {
                d.values.splice(0, flowLength);
            });
            // update elements related to x scale
            if ($$.updateXGrid) {
                $$.updateXGrid(true);
            }
            // target elements
            var elements = {};
            ["axis.x", "grid.x", "gridLines.x", "region.list", "text", "bar", "line", "area", "circle"]
                .forEach(function (v) {
                var name = v.split(".");
                var node = $el[name[0]];
                if (node && name.length > 1) {
                    node = node[name[1]];
                }
                if (node && node.size()) {
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
    setFlowList: function (elements, args) {
        var $$ = this;
        var flow = args.flow, targets = args.targets;
        var _a = flow.duration, duration = _a === void 0 ? args.duration : _a, flowIndex = flow.index, flowLength = flow.length, orgDataCount = flow.orgDataCount;
        var transform = $$.getFlowTransform(targets, orgDataCount, flowIndex, flowLength);
        var wait = generateWait();
        var n;
        wait.add(Object.keys(elements).map(function (v) {
            n = elements[v]
                .transition()
                .ease(easeLinear)
                .duration(duration);
            if (v === "axis.x") {
                n = n.call(function (g) {
                    $$.axis.x.setTransition(g).create(g);
                });
            }
            else if (v === "region.list") {
                n = n.filter($$.isRegionOnX)
                    .attr("transform", transform);
            }
            else {
                n = n.attr("transform", transform);
            }
            return n;
        }));
        n.call(wait, function () {
            $$.cleanUpFlow(elements, args);
        });
    },
    /**
     * Clean up flow
     * @param {object} elements Target elements
     * @param {object} args option object
     * @private
     */
    cleanUpFlow: function (elements, args) {
        var $$ = this;
        var config = $$.config, state = $$.state, svg = $$.$el.svg;
        var isRotated = config.axis_rotated;
        var flow = args.flow, shape = args.shape, xv = args.xv;
        var _a = shape.pos, cx = _a.cx, cy = _a.cy, xForText = _a.xForText, yForText = _a.yForText;
        var _b = flow.done, done = _b === void 0 ? function () { } : _b, flowLength = flow.length;
        // Remove flowed elements
        if (flowLength) {
            ["circle", "text", "shape", "eventRect"].forEach(function (v) {
                var target = [];
                for (var i = 0; i < flowLength; i++) {
                    target.push("." + CLASS[v] + "-" + i);
                }
                svg.selectAll("." + CLASS[v + "s"]) // circles, shapes, texts, eventRects
                    .selectAll(target)
                    .remove();
            });
            svg.select("." + CLASS.xgrid)
                .remove();
        }
        // draw again for removing flowed elements and reverting attr
        Object.keys(elements).forEach(function (v) {
            var n = elements[v];
            if (v !== "axis.x") {
                n.attr("transform", null);
            }
            if (v === "grid.x") {
                n.attr(state.xgridAttr);
            }
            else if (v === "gridLines.x") {
                n.attr("x1", isRotated ? 0 : xv)
                    .attr("x2", isRotated ? state.width : xv);
            }
            else if (v === "gridLines.x") {
                n.select("line").attr("x1", isRotated ? 0 : xv)
                    .attr("x2", isRotated ? state.width : xv);
                n.select("text")
                    .attr("x", isRotated ? state.width : 0)
                    .attr("y", xv);
            }
            else if (/^(area|bar|line)$/.test(v)) {
                n.attr("d", shape.type[v]);
            }
            else if (v === "text") {
                n.attr("x", xForText)
                    .attr("y", yForText)
                    .style("fill-opacity", $$.opacityForText.bind($$));
            }
            else if (v === "circle") {
                if ($$.isCirclePoint()) {
                    n.attr("cx", cx).attr("cy", cy);
                }
                else {
                    var xFunc = function (d) { return cx(d) - config.point_r; };
                    var yFunc = function (d) { return cy(d) - config.point_r; };
                    n.attr("x", xFunc)
                        .attr("y", yFunc)
                        .attr("cx", cx) // when pattern is used, it possibly contain 'circle' also.
                        .attr("cy", cy);
                }
            }
            else if (v === "region.list") {
                n.select("rect").filter($$.isRegionOnX)
                    .attr("x", $$.regionX.bind($$))
                    .attr("width", $$.regionWidth.bind($$));
            }
        });
        config.interaction_enabled && $$.redrawEventRect();
        // callback for end of flow
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
    getFlowTransform: function (targets, orgDataCount, flowIndex, flowLength) {
        var $$ = this;
        var data = $$.data, x = $$.scale.x;
        var dataValues = data.targets[0].values;
        var flowStart = $$.getValueOnIndex(dataValues, flowIndex);
        var flowEnd = $$.getValueOnIndex(dataValues, flowIndex + flowLength);
        var translateX;
        // update x domain to generate axis elements for flow
        var orgDomain = x.domain();
        var domain = $$.updateXDomain(targets, true, true);
        // generate transform to flow
        if (!orgDataCount) { // if empty
            if (dataValues.length !== 1) {
                translateX = x(orgDomain[0]) - x(domain[0]);
            }
            else {
                if ($$.axis.isTimeSeries()) {
                    flowStart = $$.getValueOnIndex(dataValues, 0);
                    flowEnd = $$.getValueOnIndex(dataValues, dataValues.length - 1);
                    translateX = x(flowStart.x) - x(flowEnd.x);
                }
                else {
                    translateX = diffDomain(domain) / 2;
                }
            }
        }
        else if (orgDataCount === 1 || (flowStart && flowStart.x) === (flowEnd && flowEnd.x)) {
            translateX = x(orgDomain[0]) - x(domain[0]);
        }
        else {
            translateX = $$.axis.isTimeSeries() ?
                x(orgDomain[0]) - x(domain[0]) :
                x(flowStart.x) - x(flowEnd.x);
        }
        var scaleX = (diffDomain(orgDomain) / diffDomain(domain));
        return "translate(" + translateX + ",0) scale(" + scaleX + ",1)";
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var clip = {
    initClip: function () {
        var $$ = this;
        var clip = $$.state.clip;
        // MEMO: clipId needs to be unique because it conflicts when multiple charts exist
        clip.id = $$.state.datetimeId + "-clip";
        clip.idXAxis = clip.id + "-xaxis";
        clip.idYAxis = clip.id + "-yaxis";
        clip.idGrid = clip.id + "-grid";
        // Define 'clip-path' attribute values
        clip.path = $$.getClipPath(clip.id);
        clip.pathXAxis = $$.getClipPath(clip.idXAxis);
        clip.pathYAxis = $$.getClipPath(clip.idYAxis);
        clip.pathGrid = $$.getClipPath(clip.idGrid);
    },
    getClipPath: function (id) {
        var $$ = this;
        var config = $$.config;
        if ((!config.clipPath && /-clip$/.test(id)) ||
            (!config.axis_x_clipPath && /-clip-xaxis$/.test(id)) ||
            (!config.axis_y_clipPath && /-clip-yaxis$/.test(id))) {
            return null;
        }
        var isIE9 = win.navigator ?
            win.navigator.appVersion
                .toLowerCase().indexOf("msie 9.") >= 0 : false;
        return "url(" + (isIE9 ? "" : doc.URL.split("#")[0]) + "#" + id + ")";
    },
    appendClip: function (parent, id) {
        id && parent.append("clipPath")
            .attr("id", id)
            .append("rect");
    },
    /**
     * Set x Axis clipPath dimension
     * @param {d3Selecton} node clipPath <rect> selection
     * @private
     */
    setXAxisClipPath: function (node) {
        var $$ = this;
        var config = $$.config, _a = $$.state, margin = _a.margin, width = _a.width, height = _a.height;
        var isRotated = config.axis_rotated;
        var left = Math.max(30, margin.left) - (isRotated ? 0 : 20);
        var x = isRotated ? -(1 + left) : -(left - 1);
        var y = -Math.max(15, margin.top);
        var w = isRotated ? margin.left + 20 : width + 10 + left;
        // less than 20 is not enough to show the axis label 'outer' without legend
        var h = (isRotated ? (margin.top + height) + 10 : margin.bottom) + 20;
        node
            .attr("x", x)
            .attr("y", y)
            .attr("width", w)
            .attr("height", h);
    },
    /**
     * Set y Axis clipPath dimension
     * @param {d3Selecton} node clipPath <rect> selection
     * @private
     */
    setYAxisClipPath: function (node) {
        var $$ = this;
        var config = $$.config, _a = $$.state, margin = _a.margin, width = _a.width, height = _a.height;
        var isRotated = config.axis_rotated;
        var left = Math.max(30, margin.left) - (isRotated ? 20 : 0);
        var isInner = config.axis_y_inner;
        var x = isInner ? -1 : (isRotated ? -(1 + left) : -(left - 1));
        var y = -(isRotated ? 20 : margin.top);
        var w = (isRotated ? width + 15 + left : margin.left + 20) + (isInner ? 20 : 0);
        var h = (isRotated ? margin.bottom : (margin.top + height)) + 10;
        node
            .attr("x", x)
            .attr("y", y)
            .attr("width", w)
            .attr("height", h);
    },
    updateXAxisTickClip: function () {
        var $$ = this;
        var config = $$.config, _a = $$.state, clip = _a.clip, xAxisHeight = _a.xAxisHeight, defs = $$.$el.defs;
        var newXAxisHeight = $$.getHorizontalAxisHeight("x");
        if (defs && !clip.idXAxisTickTexts) {
            var clipId = clip.id + "-xaxisticktexts";
            $$.appendClip(defs, clipId);
            clip.pathXAxisTickTexts = $$.getClipPath(clip.idXAxisTickTexts);
            clip.idXAxisTickTexts = clipId;
        }
        if (!config.axis_x_tick_multiline &&
            $$.getAxisTickRotate("x") &&
            newXAxisHeight !== xAxisHeight) {
            $$.setXAxisTickClipWidth();
            $$.setXAxisTickTextClipPathWidth();
        }
        $$.state.xAxisHeight = newXAxisHeight;
    },
    setXAxisTickClipWidth: function () {
        var $$ = this;
        var config = $$.config, maxTickWidths = $$.state.current.maxTickWidths;
        var xAxisTickRotate = $$.getAxisTickRotate("x");
        if (!config.axis_x_tick_multiline && xAxisTickRotate) {
            var sinRotation = Math.sin(Math.PI / 180 * Math.abs(xAxisTickRotate));
            maxTickWidths.x.clipPath = ($$.getHorizontalAxisHeight("x") - 20) / sinRotation;
        }
        else {
            maxTickWidths.x.clipPath = null;
        }
    },
    setXAxisTickTextClipPathWidth: function () {
        var $$ = this;
        var _a = $$.state, clip = _a.clip, current = _a.current, svg = $$.$el.svg;
        if (svg) {
            svg.select("#" + clip.idXAxisTickTexts + " rect")
                .attr("width", current.maxTickWidths.x.clipPath)
                .attr("height", 30);
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// Grid position and text anchor helpers
var getGridTextAnchor = function (d) { return isValue(d.position) || "end"; };
var getGridTextDx = function (d) { return (d.position === "start" ? 4 : (d.position === "middle" ? 0 : -4)); };
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
        if (d.position === "start") {
            x = isX ? -height : 0;
        }
        else if (d.position === "middle") {
            x = (isX ? -height : width) / 2;
        }
        return x;
    };
}
/**
 * Update coordinate attributes value
 * @param {d3.selection} el Target node
 * @param {string} type Type
 * @private
 */
function smoothLines(el, type) {
    if (type === "grid") {
        el.each(function () {
            var g = select(this);
            ["x1", "x2", "y1", "y2"]
                .forEach(function (v) { return g.attr(v, Math.ceil(+g.attr(v))); });
        });
    }
}
var grid = {
    hasGrid: function () {
        var config = this.config;
        return ["x", "y"]
            .some(function (v) { return config["grid_" + v + "_show"] || config["grid_" + v + "_lines"].length; });
    },
    initGrid: function () {
        var $$ = this;
        $$.hasGrid() && $$.initGridLines();
        $$.initFocusGrid();
    },
    initGridLines: function () {
        var $$ = this;
        var config = $$.config, clip = $$.state.clip, $el = $$.$el;
        if (config.grid_x_lines.length || config.grid_y_lines.length) {
            $el.gridLines.main = $el.main.insert("g", "." + CLASS.chart + (config.grid_lines_front ? " + *" : ""))
                .attr("clip-path", clip.pathGrid)
                .attr("class", CLASS.grid + " " + CLASS.gridLines);
            $el.gridLines.main.append("g").attr("class", CLASS.xgridLines);
            $el.gridLines.main.append("g").attr("class", CLASS.ygridLines);
            $el.gridLines.x = selectAll([]);
        }
    },
    updateXGrid: function (withoutUpdate) {
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state, _a = $$.$el, main = _a.main, grid = _a.grid;
        var isRotated = config.axis_rotated;
        var xgridData = $$.generateGridData(config.grid_x_type, scale.x);
        var tickOffset = $$.axis.isCategorized() ? $$.axis.x.tickOffset() : 0;
        var pos = function (d) { return ((scale.zoom || scale.x)(d) + (tickOffset * (isRotated ? -1 : 1))); };
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
        };
        grid.x = main.select("." + CLASS.xgrids)
            .selectAll("." + CLASS.xgrid)
            .data(xgridData);
        grid.x.exit().remove();
        grid.x = grid.x.enter()
            .append("line")
            .attr("class", CLASS.xgrid)
            .merge(grid.x);
        if (!withoutUpdate) {
            grid.x.each(function () {
                var grid = select(this);
                Object.keys(state.xgridAttr).forEach(function (id) {
                    grid.attr(id, state.xgridAttr[id])
                        .style("opacity", function () { return (grid.attr(isRotated ? "y1" : "x1") === (isRotated ? state.height : 0) ?
                        "0" : "1"); });
                });
            });
        }
    },
    updateYGrid: function () {
        var $$ = this;
        var config = $$.config, state = $$.state, _a = $$.$el, grid = _a.grid, main = _a.main;
        var isRotated = config.axis_rotated;
        var gridValues = $$.axis.y.tickValues() || $$.scale.y.ticks(config.grid_y_ticks);
        var pos = function (d) { return Math.ceil($$.scale.y(d)); };
        grid.y = main.select("." + CLASS.ygrids)
            .selectAll("." + CLASS.ygrid)
            .data(gridValues);
        grid.y.exit().remove();
        grid.y = grid.y
            .enter()
            .append("line")
            .attr("class", CLASS.ygrid)
            .merge(grid.y);
        grid.y.attr("x1", isRotated ? pos : 0)
            .attr("x2", isRotated ? pos : state.width)
            .attr("y1", isRotated ? 0 : pos)
            .attr("y2", isRotated ? state.height : pos);
        smoothLines(grid.y, "grid");
    },
    updateGrid: function (duration) {
        var $$ = this;
        var _a = $$.$el, grid = _a.grid, gridLines = _a.gridLines;
        !gridLines.main && $$.initGridLines();
        // hide if arc type
        grid.main.style("visibility", $$.hasArcType() ? "hidden" : "visible");
        $$.hideGridFocus();
        $$.updateXGridLines(duration);
        $$.updateYGridLines(duration);
    },
    /**
     * Update X Grid lines
     * @param {number} duration Dration value
     * @private
     */
    updateXGridLines: function (duration) {
        var $$ = this;
        var config = $$.config, _a = $$.$el, gridLines = _a.gridLines, main = _a.main;
        var isRotated = config.axis_rotated;
        config.grid_x_show && $$.updateXGrid();
        var xLines = main.select("." + CLASS.xgridLines)
            .selectAll("." + CLASS.xgridLine)
            .data(config.grid_x_lines);
        // exit
        xLines.exit().transition()
            .duration(duration)
            .style("opacity", "0")
            .remove();
        // enter
        var xgridLine = xLines.enter().append("g");
        xgridLine.append("line")
            .style("opacity", "0");
        xgridLine.append("text")
            .attr("transform", isRotated ? "" : "rotate(-90)")
            .attr("dy", -5)
            .style("opacity", "0");
        xLines = xgridLine.merge(xLines);
        xLines
            .attr("class", function (d) { return (CLASS.xgridLine + " " + (d["class"] || "")).trim(); })
            .select("text")
            .attr("text-anchor", getGridTextAnchor)
            .attr("dx", getGridTextDx)
            .transition()
            .duration(duration)
            .text(function (d) { return d.text; })
            .transition()
            .style("opacity", "1");
        gridLines.x = xLines;
    },
    /**
     * Update Y Grid lines
     * @param {number} duration Duration value
     * @private
     */
    updateYGridLines: function (duration) {
        var $$ = this;
        var config = $$.config, _a = $$.state, width = _a.width, height = _a.height, $el = $$.$el;
        var isRotated = config.axis_rotated;
        config.grid_y_show && $$.updateYGrid();
        var ygridLines = $el.main.select("." + CLASS.ygridLines)
            .selectAll("." + CLASS.ygridLine)
            .data(config.grid_y_lines);
        // exit
        ygridLines.exit()
            .transition()
            .duration(duration)
            .style("opacity", "0")
            .remove();
        // enter
        var ygridLine = ygridLines.enter().append("g");
        ygridLine.append("line")
            .style("opacity", "0");
        ygridLine.append("text")
            .attr("transform", isRotated ? "rotate(-90)" : "")
            .style("opacity", "0");
        ygridLines = ygridLine.merge(ygridLines);
        // update
        var yv = $$.yv.bind($$);
        ygridLines
            .attr("class", function (d) { return (CLASS.ygridLine + " " + (d["class"] || "")).trim(); })
            .select("line")
            .transition()
            .duration(duration)
            .attr("x1", isRotated ? yv : 0)
            .attr("x2", isRotated ? yv : width)
            .attr("y1", isRotated ? 0 : yv)
            .attr("y2", isRotated ? height : yv)
            .transition()
            .style("opacity", "1");
        ygridLines.select("text")
            .attr("text-anchor", getGridTextAnchor)
            .attr("dx", getGridTextDx)
            .transition()
            .duration(duration)
            .attr("dy", -5)
            .attr("x", getGridTextX(isRotated, width, height))
            .attr("y", yv)
            .text(function (d) { return d.text; })
            .transition()
            .style("opacity", "1");
        $el.gridLines.y = ygridLines;
    },
    redrawGrid: function (withTransition) {
        var $$ = this;
        var isRotated = $$.config.axis_rotated, _a = $$.state, width = _a.width, height = _a.height, gridLines = $$.$el.gridLines;
        var xv = $$.xv.bind($$);
        var lines = gridLines.x.select("line");
        var texts = gridLines.x.select("text");
        lines = (withTransition ? lines.transition() : lines)
            .attr("x1", isRotated ? 0 : xv)
            .attr("x2", isRotated ? width : xv)
            .attr("y1", isRotated ? xv : 0)
            .attr("y2", isRotated ? xv : height);
        texts = (withTransition ? texts.transition() : texts)
            .attr("x", getGridTextX(!isRotated, width, height))
            .attr("y", xv)
            .text(function (d) { return d.text; });
        return [
            lines.style("opacity", "1"),
            texts.style("opacity", "1")
        ];
    },
    initFocusGrid: function () {
        var $$ = this;
        var config = $$.config, clip = $$.state.clip, $el = $$.$el;
        var isFront = config.grid_front;
        var className = "." + CLASS[isFront && $el.gridLines.main ? "gridLines" : "chart"] + (isFront ? " + *" : "");
        var grid = $el.main.insert("g", className)
            .attr("clip-path", clip.pathGrid)
            .attr("class", CLASS.grid);
        $el.grid.main = grid;
        config.grid_x_show &&
            grid.append("g").attr("class", CLASS.xgrids);
        config.grid_y_show &&
            grid.append("g").attr("class", CLASS.ygrids);
        if (config.interaction_enabled && config.grid_focus_show) {
            grid.append("g")
                .attr("class", CLASS.xgridFocus)
                .append("line")
                .attr("class", CLASS.xgridFocus);
            // to show xy focus grid line, should be 'tooltip.grouped=false'
            if (config.grid_focus_y && !config.tooltip_grouped) {
                grid.append("g")
                    .attr("class", CLASS.ygridFocus)
                    .append("line")
                    .attr("class", CLASS.ygridFocus);
            }
        }
    },
    /**
     * Show grid focus line
     * @param {Array} data Selected data
     * @private
     */
    showGridFocus: function (data) {
        var $$ = this;
        var config = $$.config, _a = $$.state, width = _a.width, height = _a.height;
        var isRotated = config.axis_rotated;
        var focusEl = $$.$el.main.selectAll("line." + CLASS.xgridFocus + ", line." + CLASS.ygridFocus);
        var dataToShow = (data || [focusEl.datum()]).filter(function (d) { return d && isValue($$.getBaseValue(d)); });
        // Hide when bubble/scatter/stanford plot exists
        if (!config.tooltip_show || dataToShow.length === 0 || $$.hasType("bubble") || $$.hasArcType()) {
            return;
        }
        var isEdge = config.grid_focus_edge && !config.tooltip_grouped;
        var xx = $$.xx.bind($$);
        focusEl
            .style("visibility", "visible")
            .data(dataToShow.concat(dataToShow))
            .each(function (d) {
            var el = select(this);
            var pos = {
                x: xx(d),
                y: $$.getYScaleById(d.id)(d.value)
            };
            var xy;
            if (el.classed(CLASS.xgridFocus)) {
                // will contain 'x1, y1, x2, y2' order
                xy = isRotated ?
                    [
                        null,
                        pos.x,
                        isEdge ? pos.y : width,
                        pos.x // y2
                    ] : [
                    pos.x,
                    isEdge ? pos.y : null,
                    pos.x,
                    height
                ];
            }
            else {
                var isY2 = $$.axis.getId(d.id) === "y2";
                xy = isRotated ?
                    [
                        pos.y,
                        isEdge && !isY2 ? pos.x : null,
                        pos.y,
                        isEdge && isY2 ? pos.x : height // y2
                    ] : [
                    isEdge && isY2 ? pos.x : null,
                    pos.y,
                    isEdge && !isY2 ? pos.x : width,
                    pos.y
                ];
            }
            ["x1", "y1", "x2", "y2"]
                .forEach(function (v, i) { return el.attr(v, xy[i]); });
        });
        smoothLines(focusEl, "grid");
        $$.showCircleFocus && $$.showCircleFocus(data);
    },
    hideGridFocus: function () {
        var $$ = this;
        var _a = $$.state, inputType = _a.inputType, resizing = _a.resizing, main = $$.$el.main;
        if (inputType === "mouse" || !resizing) {
            main.selectAll("line." + CLASS.xgridFocus + ", line." + CLASS.ygridFocus)
                .style("visibility", "hidden");
            $$.hideCircleFocus && $$.hideCircleFocus();
        }
    },
    updateGridFocus: function () {
        var $$ = this;
        var _a = $$.state, inputType = _a.inputType, width = _a.width, height = _a.height, resizing = _a.resizing, grid = $$.$el.grid;
        var xgridFocus = grid.main.select("line." + CLASS.xgridFocus);
        if (inputType === "touch") {
            if (xgridFocus.empty()) {
                resizing && $$.showCircleFocus();
            }
            else {
                $$.showGridFocus();
            }
        }
        else {
            var isRotated = $$.config.axis_rotated;
            xgridFocus
                .attr("x1", isRotated ? 0 : -10)
                .attr("x2", isRotated ? width : -10)
                .attr("y1", isRotated ? -10 : 0)
                .attr("y2", isRotated ? -10 : height);
        }
        // need to return 'true' as of being pushed to the redraw list
        // ref: getRedrawList()
        return true;
    },
    generateGridData: function (type, scale) {
        var $$ = this;
        var tickNum = $$.$el.main.select("." + CLASS.axisX)
            .selectAll(".tick")
            .size();
        var gridData = [];
        if (type === "year") {
            var xDomain = $$.getXDomain();
            var firstYear = xDomain[0].getFullYear();
            var lastYear = xDomain[1].getFullYear();
            for (var i = firstYear; i <= lastYear; i++) {
                gridData.push(new Date(i + "-01-01 00:00:00"));
            }
        }
        else {
            gridData = scale.ticks(10);
            if (gridData.length > tickNum) { // use only int
                gridData = gridData.filter(function (d) { return String(d).indexOf(".") < 0; });
            }
        }
        return gridData;
    },
    getGridFilterToRemove: function (params) {
        return params ? function (line) {
            var found = false;
            (isArray(params) ? params.concat() : [params]).forEach(function (param) {
                if ((("value" in param && line.value === param.value) || ("class" in param && line["class"] === param["class"]))) {
                    found = true;
                }
            });
            return found;
        } : function () { return true; };
    },
    removeGridLines: function (params, forX) {
        var $$ = this;
        var config = $$.config;
        var toRemove = $$.getGridFilterToRemove(params);
        var toShow = function (line) { return !toRemove(line); };
        var classLines = forX ? CLASS.xgridLines : CLASS.ygridLines;
        var classLine = forX ? CLASS.xgridLine : CLASS.ygridLine;
        $$.$el.main.select("." + classLines)
            .selectAll("." + classLine)
            .filter(toRemove)
            .transition()
            .duration(config.transition_duration)
            .style("opacity", "0")
            .remove();
        var gridLines = "grid_" + (forX ? "x" : "y") + "_lines";
        config[gridLines] = config[gridLines].filter(toShow);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var region = {
    initRegion: function () {
        var $$ = this;
        var $el = $$.$el;
        $el.region.main = $el.main.append("g")
            .attr("clip-path", $$.state.clip.path)
            .attr("class", CLASS.regions);
    },
    updateRegion: function (duration) {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        if (!$el.region.main) {
            $$.initRegion();
        }
        // hide if arc type
        $el.region.main.style("visibility", $$.hasArcType() ? "hidden" : "visible");
        // select <g> element
        var list = $el.main.select("." + CLASS.regions)
            .selectAll("." + CLASS.region)
            .data(config.regions);
        list.exit()
            .transition()
            .duration(duration)
            .style("opacity", "0")
            .remove();
        list = list.enter()
            .append("g")
            .merge(list)
            .attr("class", $$.classRegion.bind($$));
        list
            .append("rect")
            .style("fill-opacity", "0");
        $el.region.list = list;
    },
    redrawRegion: function (withTransition) {
        var $$ = this;
        var regions = $$.$el.region.list.select("rect");
        regions = (withTransition ? regions.transition() : regions)
            .attr("x", $$.regionX.bind($$))
            .attr("y", $$.regionY.bind($$))
            .attr("width", $$.regionWidth.bind($$))
            .attr("height", $$.regionHeight.bind($$));
        return [
            (withTransition ? regions.transition() : regions)
                .style("fill-opacity", function (d) { return (isValue(d.opacity) ? d.opacity : "0.1"); })
                .on("end", function () {
                // remove unnecessary rect after transition
                select(this.parentNode)
                    .selectAll("rect:not([x])")
                    .remove();
            })
        ];
    },
    getRegionXY: function (type, d) {
        var $$ = this;
        var config = $$.config, scale = $$.scale;
        var isRotated = config.axis_rotated;
        var isX = type === "x";
        var key = "start";
        var currScale;
        var pos = 0;
        if (d.axis === "y" || d.axis === "y2") {
            if (!isX) {
                key = "end";
            }
            if ((isX ? isRotated : !isRotated) && key in d) {
                currScale = scale[d.axis];
                pos = currScale(d[key]);
            }
        }
        else if ((isX ? !isRotated : isRotated) && key in d) {
            currScale = scale.zoom || scale.x;
            pos = currScale($$.axis.isTimeSeries() ? parseDate.call($$, d[key]) : d[key]);
        }
        return pos;
    },
    regionX: function (d) {
        return this.getRegionXY("x", d);
    },
    regionY: function (d) {
        return this.getRegionXY("y", d);
    },
    getRegionSize: function (type, d) {
        var $$ = this;
        var config = $$.config, scale = $$.scale, state = $$.state;
        var isRotated = config.axis_rotated;
        var isWidth = type === "width";
        var start = $$[isWidth ? "regionX" : "regionY"](d);
        var currScale;
        var key = "end";
        var end = state[type];
        if (d.axis === "y" || d.axis === "y2") {
            if (!isWidth) {
                key = "start";
            }
            if ((isWidth ? isRotated : !isRotated) && key in d) {
                currScale = scale[d.axis];
                end = currScale(d[key]);
            }
        }
        else if ((isWidth ? !isRotated : isRotated) && key in d) {
            currScale = scale.zoom || scale.x;
            end = currScale($$.axis.isTimeSeries() ? parseDate.call($$, d[key]) : d[key]);
        }
        return end < start ? 0 : end - start;
    },
    regionWidth: function (d) {
        return this.getRegionSize("width", d);
    },
    regionHeight: function (d) {
        return this.getRegionSize("height", d);
    },
    isRegionOnX: function (d) {
        return !d.axis || d.axis === "x";
    }
};

var sizeAxis = {
    /**
     * Get Axis size according its position
     * @param {string} id Axis id value - x, y or y2
     * @returns {number} size Axis size value
     * @private
     */
    getAxisSize: function (id) {
        var $$ = this;
        var isRotated = $$.config.axis_rotated;
        return (isRotated && id === "x") || (!isRotated && /y2?/.test(id)) ?
            $$.getAxisWidthByAxisId(id, true) :
            $$.getHorizontalAxisHeight(id);
    },
    getAxisWidthByAxisId: function (id, withoutRecompute) {
        var $$ = this;
        if ($$.axis) {
            var position = $$.axis && $$.axis.getLabelPositionById(id);
            return $$.axis.getMaxTickWidth(id, withoutRecompute) +
                (position.isInner ? 20 : 40);
        }
        else {
            return 40;
        }
    },
    getHorizontalAxisHeight: function (id) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var current = state.current, rotatedPadding = state.rotatedPadding, isLegendRight = state.isLegendRight, isLegendInset = state.isLegendInset;
        var isRotated = config.axis_rotated;
        var h = 30;
        if (id === "x" && !config.axis_x_show) {
            return 8;
        }
        if (id === "x" && config.axis_x_height) {
            return config.axis_x_height;
        }
        if (id === "y" && !config.axis_y_show) {
            return config.legend_show &&
                !isLegendRight &&
                !isLegendInset ? 10 : 1;
        }
        if (id === "y2" && !config.axis_y2_show) {
            return rotatedPadding.top;
        }
        var rotate = $$.getAxisTickRotate(id);
        // Calculate x/y axis height when tick rotated
        if (((id === "x" && !isRotated) || (/y2?/.test(id) && isRotated)) && rotate) {
            h = 30 +
                $$.axis.getMaxTickWidth(id) *
                    Math.cos(Math.PI * (90 - Math.abs(rotate)) / 180);
            if (!config.axis_x_tick_multiline && current.height) {
                if (h > current.height / 2) {
                    h = current.height / 2;
                }
            }
        }
        return h +
            ($$.axis.getLabelPositionById(id).isInner ? 0 : 10) +
            (id === "y2" && !isRotated ? -10 : 0);
    },
    getEventRectWidth: function () {
        return Math.max(0, this.axis.x.tickInterval());
    },
    /**
     * Get axis tick test rotate value
     * @param {string} id Axis id
     * @returns {number} rotate value
     * @private
     */
    getAxisTickRotate: function (id) {
        var $$ = this;
        var axis = $$.axis, config = $$.config, state = $$.state, $el = $$.$el;
        var rotate = config["axis_" + id + "_tick_rotate"];
        if (id === "x") {
            var allowedXAxisTypes = axis.isCategorized() || axis.isTimeSeries();
            if (config.axis_x_tick_fit && allowedXAxisTypes) {
                var xTickCount = config.axis_x_tick_count;
                var currentXTicksLength = state.current.maxTickWidths.x.ticks.length;
                var tickCount = 0;
                if (xTickCount) {
                    tickCount = xTickCount > currentXTicksLength ? currentXTicksLength : xTickCount;
                }
                else if (currentXTicksLength) {
                    tickCount = currentXTicksLength;
                }
                if (tickCount !== state.axis.x.tickCount) {
                    state.axis.x.padding = $$.axis.getXAxisPadding(tickCount);
                }
                state.axis.x.tickCount = tickCount;
            }
            if ($el.svg &&
                config.axis_x_tick_fit &&
                !config.axis_x_tick_multiline &&
                !config.axis_x_tick_culling &&
                config.axis_x_tick_autorotate &&
                allowedXAxisTypes) {
                rotate = $$.needToRotateXAxisTickTexts() ?
                    config.axis_x_tick_rotate : 0;
            }
        }
        return rotate;
    },
    /**
     * Check weather axis tick text needs to be rotated
     * @returns {boolean}
     * @private
     */
    needToRotateXAxisTickTexts: function () {
        var $$ = this;
        var _a = $$.state, axis = _a.axis, current = _a.current;
        var xAxisLength = current.width -
            $$.getCurrentPaddingLeft(false) - $$.getCurrentPaddingRight();
        var tickCountWithPadding = axis.x.tickCount +
            axis.x.padding.left + axis.x.padding.right;
        var maxTickWidth = $$.axis.getMaxTickWidth("x");
        var tickLength = tickCountWithPadding ? xAxisLength / tickCountWithPadding : 0;
        return maxTickWidth > tickLength;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Axis based chart data config options
 */
var optDataAxis = {
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
    data_xLocaltime: true,
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
    data_stack_normalize: false
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * x Axis config options
 */
var x = {
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
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * y Axis  config options
 */
var y = {
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
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * y2 Axis  config options
 */
var y2 = {
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
};

/**
 * y Axis  config options
 */
var optAxis = _assign(_assign(_assign({ 
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
    axis_rotated: false }, x), y), y2);

var optGrid = {
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
    grid_x_show: false,
    grid_x_type: "tick",
    grid_x_lines: [],
    grid_y_show: false,
    grid_y_lines: [],
    grid_y_ticks: 10,
    grid_focus_edge: false,
    grid_focus_show: true,
    grid_focus_y: false,
    grid_front: false,
    grid_lines_front: true
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var api = [
    apiAxis,
    apiCategory,
    apiXGrid,
    apiYGrid,
    apiFlow,
    apiGroup,
    apiRegion,
    apiX
];
var internal = [
    axis,
    clip,
    eventrect,
    flow,
    grid,
    region,
    sizeAxis,
];
var options = [
    optDataAxis,
    optAxis,
    optGrid,
];

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeArc = {
    initPie: function () {
        var $$ = this;
        var config = $$.config;
        var dataType = config.data_type;
        var padding = config.pie_padding;
        var startingAngle = config[dataType + "_startingAngle"] || 0;
        var padAngle = ($$.hasType("pie") && padding ? padding * 0.01 :
            config[dataType + "_padAngle"]) || 0;
        $$.pie = pie$1()
            .startAngle(startingAngle)
            .endAngle(startingAngle + (2 * Math.PI))
            .padAngle(padAngle)
            .value(function (d) { return d.values.reduce(function (a, b) { return a + b.value; }, 0); })
            .sort($$.getSortCompareFn.bind($$)(true));
    },
    updateRadius: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var padding = config.pie_padding;
        var w = config.gauge_width || config.donut_width;
        var gaugeArcWidth = $$.filterTargetsToShow($$.data.targets).length *
            config.gauge_arcs_minWidth;
        // determine radius
        state.radiusExpanded = Math.min(state.arcWidth, state.arcHeight) / 2 * ($$.hasMultiArcGauge() ? 0.85 : 1);
        state.radius = state.radiusExpanded * 0.95;
        state.innerRadiusRatio = w ? (state.radius - w) / state.radius : 0.6;
        state.gaugeArcWidth = w || (gaugeArcWidth <= state.radius - state.innerRadius ?
            state.radius - state.innerRadius :
            (gaugeArcWidth <= state.radius ? gaugeArcWidth : state.radius));
        var innerRadius = config.pie_innerRadius || (padding ? padding * (state.innerRadiusRatio + 0.1) : 0);
        // NOTE: inner/outerRadius can be an object by user setting, only for 'pie' type
        state.outerRadius = config.pie_outerRadius;
        state.innerRadius = $$.hasType("donut") || $$.hasType("gauge") ?
            state.radius * state.innerRadiusRatio : innerRadius;
    },
    /**
     * Get pie's inner & outer radius value
     * @param {object|undefined} d Data object
     * @returns {object}
     * @private
     */
    getRadius: function (d) {
        var $$ = this;
        var data = d && d.data;
        var _a = $$.state, innerRadius = _a.innerRadius, outerRadius = _a.outerRadius;
        if (!isNumber(innerRadius) && data) {
            innerRadius = innerRadius[data.id] || 0;
        }
        if (isObject(outerRadius) && data && data.id in outerRadius) {
            outerRadius = outerRadius[data.id];
        }
        else if (!isNumber(outerRadius)) {
            outerRadius = $$.state.radius;
        }
        return { innerRadius: innerRadius, outerRadius: outerRadius };
    },
    updateArc: function () {
        var $$ = this;
        $$.updateRadius();
        $$.svgArc = $$.getSvgArc();
        $$.svgArcExpanded = $$.getSvgArcExpanded();
    },
    getArcLength: function () {
        var $$ = this;
        var config = $$.config;
        var arcLengthInPercent = config.gauge_arcLength * 3.6;
        var len = (2 * (arcLengthInPercent / 360));
        if (arcLengthInPercent < -360) {
            len = -2;
        }
        else if (arcLengthInPercent > 360) {
            len = 2;
        }
        return len * Math.PI;
    },
    getStartAngle: function () {
        var $$ = this;
        var config = $$.config;
        var isFullCircle = config.gauge_fullCircle;
        var defaultStartAngle = -1 * Math.PI / 2;
        var defaultEndAngle = Math.PI / 2;
        var startAngle = config.gauge_startingAngle;
        if (!isFullCircle && startAngle <= defaultStartAngle) {
            startAngle = defaultStartAngle;
        }
        else if (!isFullCircle && startAngle >= defaultEndAngle) {
            startAngle = defaultEndAngle;
        }
        else if (startAngle > Math.PI || startAngle < -1 * Math.PI) {
            startAngle = Math.PI;
        }
        return startAngle;
    },
    updateAngle: function (dValue) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var pie = $$.pie;
        var d = dValue;
        var found = false;
        if (!config) {
            return null;
        }
        var gStart = $$.getStartAngle();
        var radius = config.gauge_fullCircle ? $$.getArcLength() : gStart * -2;
        if (d.data && $$.isGaugeType(d.data) && !$$.hasMultiArcGauge()) {
            // to prevent excluding total data sum during the init(when data.hide option is used), use $$.rendered state value
            var totalSum = $$.getTotalDataSum(state.rendered);
            var gEnd = radius * (totalSum / (config.gauge_max - config.gauge_min));
            pie = pie
                .startAngle(gStart)
                .endAngle(gEnd + gStart);
        }
        pie($$.filterTargetsToShow())
            .forEach(function (t, i) {
            if (!found && t.data.id === d.data.id) {
                found = true;
                d = t;
                d.index = i;
            }
        });
        if (isNaN(d.startAngle)) {
            d.startAngle = 0;
        }
        if (isNaN(d.endAngle)) {
            d.endAngle = d.startAngle;
        }
        if (d.data && $$.hasMultiArcGauge()) {
            var gMin = config.gauge_min;
            var gMax = config.gauge_max;
            var gTic = radius / (gMax - gMin);
            var gValue = d.value < gMin ? 0 : d.value < gMax ? d.value - gMin : (gMax - gMin);
            d.startAngle = gStart;
            d.endAngle = gStart + gTic * gValue;
        }
        return found ? d : null;
    },
    getSvgArc: function () {
        var $$ = this;
        var state = $$.state;
        var singleArcWidth = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length;
        var hasMultiArcGauge = $$.hasMultiArcGauge();
        var arc$1 = arc()
            .innerRadius(function (d) {
            var innerRadius = $$.getRadius(d).innerRadius;
            return hasMultiArcGauge ?
                state.radius - singleArcWidth * (d.index + 1) :
                isNumber(innerRadius) ? innerRadius : 0;
        })
            .outerRadius(function (d) {
            var outerRadius = $$.getRadius(d).outerRadius;
            return hasMultiArcGauge ? (state.radius - singleArcWidth * d.index) : outerRadius;
        });
        var newArc = function (d, withoutUpdate) {
            var path = "M 0 0";
            if (d.value || d.data) {
                var updated = !withoutUpdate && $$.updateAngle(d);
                if (withoutUpdate) {
                    path = arc$1(d);
                }
                else if (updated) {
                    path = arc$1(updated);
                }
            }
            return path;
        };
        // TODO: extends all function
        newArc.centroid = arc$1.centroid;
        return newArc;
    },
    getSvgArcExpanded: function (rate) {
        var $$ = this;
        var state = $$.state;
        var newRate = rate || 1;
        var singleArcWidth = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length;
        var hasMultiArcGauge = $$.hasMultiArcGauge();
        var expandWidth = Math.min(state.radiusExpanded * newRate - state.radius, singleArcWidth * 0.8 - (1 - newRate) * 100);
        var arc$1 = arc()
            .innerRadius(function (d) { return (hasMultiArcGauge ?
            state.radius - singleArcWidth * (d.index + 1) : $$.getRadius(d).innerRadius); })
            .outerRadius(function (d) {
            var radius;
            if (hasMultiArcGauge) {
                radius = state.radius - singleArcWidth * d.index + expandWidth;
            }
            else {
                var outerRadius = $$.getRadius(d).outerRadius;
                var radiusExpanded = state.radiusExpanded;
                if (state.radius !== outerRadius) {
                    radiusExpanded -= Math.abs(state.radius - outerRadius);
                }
                radius = radiusExpanded * newRate;
            }
            return radius;
        });
        return function (d) {
            var updated = $$.updateAngle(d);
            return updated ? arc$1(updated) : "M 0 0";
        };
    },
    getArc: function (d, withoutUpdate, force) {
        return force || this.isArcType(d.data) ? this.svgArc(d, withoutUpdate) : "M 0 0";
    },
    transformForArcLabel: function (d) {
        var $$ = this;
        var config = $$.config, radiusExpanded = $$.state.radiusExpanded;
        var updated = $$.updateAngle(d);
        var translate = "";
        if (updated) {
            if ($$.hasMultiArcGauge()) {
                var y1 = Math.sin(updated.endAngle - Math.PI / 2);
                var x = Math.cos(updated.endAngle - Math.PI / 2) * (radiusExpanded + 25);
                var y = y1 * (radiusExpanded + 15 - Math.abs(y1 * 10)) + 3;
                translate = "translate(" + x + "," + y + ")";
            }
            else if (!$$.hasType("gauge") || $$.data.targets.length > 1) {
                var outerRadius = $$.getRadius(d).outerRadius;
                var c = this.svgArc.centroid(updated);
                var x = isNaN(c[0]) ? 0 : c[0];
                var y = isNaN(c[1]) ? 0 : c[1];
                var h = Math.sqrt(x * x + y * y);
                var ratio = ($$.hasType("donut") && config.donut_label_ratio) ||
                    ($$.hasType("pie") && config.pie_label_ratio);
                if (ratio) {
                    ratio = isFunction(ratio) ? ratio.bind($$.api)(d, outerRadius, h) : ratio;
                }
                else {
                    ratio = outerRadius && (h ? (36 / outerRadius > 0.375 ? 1.175 - 36 / outerRadius : 0.8) * outerRadius / h : 0);
                }
                translate = "translate(" + x * ratio + "," + y * ratio + ")";
            }
        }
        return translate;
    },
    convertToArcData: function (d) {
        return this.addName({
            id: d.data ? d.data.id : d.id,
            value: d.value,
            ratio: this.getRatio("arc", d),
            index: d.index
        });
    },
    textForArcLabel: function (selection) {
        var $$ = this;
        var hasGauge = $$.hasType("gauge");
        if ($$.shouldShowArcLabel()) {
            selection
                .style("fill", $$.updateTextColor.bind($$))
                .each(function (d) {
                var node = select(this);
                var updated = $$.updateAngle(d);
                var ratio = $$.getRatio("arc", updated);
                var isUnderThreshold = $$.meetsLabelThreshold(ratio, ($$.hasType("donut") && "donut") || ($$.hasType("gauge") && "gauge") || ($$.hasType("pie") && "pie"));
                if (isUnderThreshold) {
                    var value = (updated || d).value;
                    var text = ($$.getArcLabelFormat() || $$.defaultArcValueFormat)(value, ratio, d.data.id).toString();
                    setTextValue(node, text, [-1, 1], hasGauge);
                }
                else {
                    node.text("");
                }
            });
        }
    },
    expandArc: function (targetIds) {
        var $$ = this;
        var transiting = $$.state.transiting, $el = $$.$el;
        // MEMO: avoid to cancel transition
        if (transiting) {
            var interval_1 = setInterval(function () {
                if (!transiting) {
                    clearInterval(interval_1);
                    $el.legend.selectAll("." + CLASS.legendItemFocused).size() > 0 &&
                        $$.expandArc(targetIds);
                }
            }, 10);
            return;
        }
        var newTargetIds = $$.mapToTargetIds(targetIds);
        $el.svg.selectAll($$.selectorTargets(newTargetIds, "." + CLASS.chartArc))
            .each(function (d) {
            if (!$$.shouldExpand(d.data.id)) {
                return;
            }
            var expandDuration = $$.getExpandConfig(d.data.id, "duration");
            var svgArcExpandedSub = $$.getSvgArcExpanded($$.getExpandConfig(d.data.id, "rate"));
            select(this).selectAll("path")
                .transition()
                .duration(expandDuration)
                .attr("d", $$.svgArcExpanded)
                .transition()
                .duration(expandDuration * 2)
                .attr("d", svgArcExpandedSub);
        });
    },
    unexpandArc: function (targetIds) {
        var $$ = this;
        var transiting = $$.state.transiting, svg = $$.$el.svg;
        if (transiting) {
            return;
        }
        var newTargetIds = $$.mapToTargetIds(targetIds);
        svg.selectAll($$.selectorTargets(newTargetIds, "." + CLASS.chartArc))
            .selectAll("path")
            .transition()
            .duration(function (d) { return $$.getExpandConfig(d.data.id, "duration"); })
            .attr("d", $$.svgArc);
        svg.selectAll("" + CLASS.arc)
            .style("opacity", "1");
    },
    /**
     * Get expand config value
     * @param {string} id data ID
     * @param {string} key config key: 'duration | rate'
     * @returns {number}
     * @private
     */
    getExpandConfig: function (id, key) {
        var $$ = this;
        var config = $$.config;
        var def = {
            duration: 50,
            rate: 0.98
        };
        var type;
        if ($$.isDonutType(id)) {
            type = "donut";
        }
        else if ($$.isGaugeType(id)) {
            type = "gauge";
        }
        else if ($$.isPieType(id)) {
            type = "pie";
        }
        return type ? config[type + "_expand_" + key] : def[key];
    },
    shouldExpand: function (id) {
        var $$ = this;
        var config = $$.config;
        return ($$.isDonutType(id) && config.donut_expand) ||
            ($$.isGaugeType(id) && config.gauge_expand) ||
            ($$.isPieType(id) && config.pie_expand);
    },
    shouldShowArcLabel: function () {
        var $$ = this;
        var config = $$.config;
        return ["pie", "donut", "gauge"]
            .some(function (v) { return $$.hasType(v) && config[v + "_label_show"]; });
    },
    getArcLabelFormat: function () {
        var $$ = this;
        var config = $$.config;
        var format = config.pie_label_format;
        if ($$.hasType("gauge")) {
            format = config.gauge_label_format;
        }
        else if ($$.hasType("donut")) {
            format = config.donut_label_format;
        }
        return isFunction(format) ? format.bind($$.api) : format;
    },
    getArcTitle: function () {
        var $$ = this;
        var type = ($$.hasType("donut") && "donut") || ($$.hasType("gauge") && "gauge");
        return type ? $$.config[type + "_title"] : "";
    },
    updateTargetsForArc: function (targets) {
        var $$ = this;
        var $el = $$.$el;
        var hasGauge = $$.hasType("gauge");
        var classChartArc = $$.getChartClass("Arc");
        var classArcs = $$.getClass("arcs", true);
        var classFocus = $$.classFocus.bind($$);
        var chartArcs = $el.main.select("." + CLASS.chartArcs);
        var mainPieUpdate = chartArcs
            .selectAll("." + CLASS.chartArc)
            .data($$.pie(targets))
            .attr("class", function (d) { return classChartArc(d) + classFocus(d.data); });
        var mainPieEnter = mainPieUpdate.enter().append("g")
            .attr("class", classChartArc);
        mainPieEnter.append("g")
            .attr("class", classArcs)
            .merge(mainPieUpdate);
        mainPieEnter.append("text")
            .attr("dy", hasGauge && !$$.hasMultiTargets() ? "-.1em" : ".35em")
            .style("opacity", "0")
            .style("text-anchor", "middle")
            .style("pointer-events", "none");
        $el.text = chartArcs.selectAll("." + CLASS.target + " text");
        // MEMO: can not keep same color..., but not bad to update color in redraw
        // mainPieUpdate.exit().remove();
    },
    initArc: function () {
        var $$ = this;
        var $el = $$.$el;
        $el.arcs = $el.main.select("." + CLASS.chart)
            .append("g")
            .attr("class", CLASS.chartArcs)
            .attr("transform", $$.getTranslate("arc"));
        $$.setArcTitle();
    },
    /**
     * Set arc title text
     * @private
     */
    setArcTitle: function () {
        var $$ = this;
        var title = $$.getArcTitle();
        var hasGauge = $$.hasType("gauge");
        if (title) {
            var text = $$.$el.arcs.append("text")
                .attr("class", CLASS[hasGauge ? "chartArcsGaugeTitle" : "chartArcsTitle"])
                .style("text-anchor", "middle");
            if (hasGauge) {
                text
                    .attr("dy", "-0.3em")
                    .style("font-size", "27px");
            }
            setTextValue(text, title, hasGauge ? undefined : [-0.6, 1.35], true);
        }
    },
    redrawArc: function (duration, durationForExit, withTransform) {
        var $$ = this;
        var config = $$.config, state = $$.state, main = $$.$el.main;
        var hasInteraction = config.interaction_enabled;
        var isSelectable = hasInteraction && config.data_selection_isselectable;
        var mainArc = main.selectAll("." + CLASS.arcs)
            .selectAll("." + CLASS.arc)
            .data($$.arcData.bind($$));
        mainArc.exit().transition()
            .duration(durationForExit)
            .style("opacity", "0")
            .remove();
        mainArc = mainArc.enter().append("path")
            .attr("class", $$.getClass("arc", true))
            .style("fill", function (d) { return $$.color(d.data); })
            .style("cursor", function (d) { return (isSelectable && isSelectable.bind($$.api)(d) ? "pointer" : null); })
            .style("opacity", "0")
            .each(function (d) {
            if ($$.isGaugeType(d.data)) {
                d.startAngle = config.gauge_startingAngle;
                d.endAngle = config.gauge_startingAngle;
            }
            this._current = d;
        })
            .merge(mainArc);
        if ($$.hasType("gauge")) {
            $$.updateGaugeMax();
            $$.hasMultiArcGauge() && $$.redrawMultiArcGauge();
        }
        mainArc
            .attr("transform", function (d) { return (!$$.isGaugeType(d.data) && withTransform ? "scale(0)" : ""); })
            .style("opacity", function (d) {
            return d === this._current ? "0" : "1";
        })
            .each(function () {
            state.transiting = true;
        })
            .transition()
            .duration(duration)
            .attrTween("d", function (d) {
            var updated = $$.updateAngle(d);
            if (!updated) {
                return function () { return "M 0 0"; };
            }
            if (isNaN(this._current.startAngle)) {
                this._current.startAngle = 0;
            }
            if (isNaN(this._current.endAngle)) {
                this._current.endAngle = this._current.startAngle;
            }
            var interpolate$1 = interpolate(this._current, updated);
            this._current = interpolate$1(0);
            return function (t) {
                var interpolated = interpolate$1(t);
                interpolated.data = d.data; // data.id will be updated by interporator
                return $$.getArc(interpolated, true);
            };
        })
            .attr("transform", withTransform ? "scale(1)" : "")
            .style("fill", function (d) {
            var color;
            if ($$.levelColor) {
                color = $$.levelColor(d.data.values[0].value);
                // update data's color
                config.data_colors[d.data.id] = color;
            }
            else {
                color = $$.color(d.data);
            }
            return color;
        })
            // Where gauge reading color would receive customization.
            .style("opacity", "1")
            .call(endall, function () {
            if ($$.levelColor) {
                var path = select(this);
                var d = path.datum();
                $$.updateLegendItemColor(d.data.id, path.style("fill"));
            }
            state.transiting = false;
            callFn(config.onrendered, $$.api);
        });
        // bind arc events
        hasInteraction && $$.bindArcEvent(mainArc);
        $$.hasType("gauge") && $$.redrawBackgroundArcs();
        $$.redrawArcText(duration);
    },
    redrawBackgroundArcs: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var hasMultiArcGauge = $$.hasMultiArcGauge();
        var isFullCircle = config.gauge_fullCircle;
        var startAngle = $$.getStartAngle();
        var endAngle = isFullCircle ? startAngle + $$.getArcLength() : startAngle * -1;
        var backgroundArc = $$.$el.arcs.select((hasMultiArcGauge ? "g" : "") + "." + CLASS.chartArcsBackground);
        if (hasMultiArcGauge) {
            var index_1 = 0;
            backgroundArc = backgroundArc
                .selectAll("path." + CLASS.chartArcsBackground)
                .data($$.data.targets);
            backgroundArc.enter()
                .append("path")
                .attr("class", function (d, i) { return CLASS.chartArcsBackground + " " + CLASS.chartArcsBackground + "-" + i; })
                .merge(backgroundArc)
                .style("fill", (config.gauge_background) || null)
                .attr("d", function (_a) {
                var id = _a.id;
                if (state.hiddenTargetIds.indexOf(id) >= 0) {
                    return "M 0 0";
                }
                var d = {
                    data: [{ value: config.gauge_max }],
                    startAngle: startAngle,
                    endAngle: endAngle,
                    index: index_1++
                };
                return $$.getArc(d, true, true);
            });
            backgroundArc.exit().remove();
        }
        else {
            backgroundArc.attr("d", function () {
                var d = {
                    data: [{ value: config.gauge_max }],
                    startAngle: startAngle,
                    endAngle: endAngle
                };
                return $$.getArc(d, true, true);
            });
        }
    },
    bindArcEvent: function (arc) {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var isTouch = state.inputType === "touch";
        var isMouse = state.inputType === "mouse";
        // eslint-disable-next-line
        function selectArc(_this, arcData, id) {
            // transitions
            $$.expandArc(id);
            $$.api.focus(id);
            $$.toggleFocusLegend(id, true);
            $$.showTooltip([arcData], _this);
        }
        // eslint-disable-next-line
        function unselectArc(arcData) {
            var id = (arcData && arcData.id) || undefined;
            $$.unexpandArc(id);
            $$.api.revert();
            $$.revertLegend();
            $$.hideTooltip();
        }
        arc
            .on("click", function (event, d, i) {
            var updated = $$.updateAngle(d);
            var arcData;
            if (updated) {
                arcData = $$.convertToArcData(updated);
                $$.toggleShape && $$.toggleShape(this, arcData, i);
                config.data_onclick.bind($$.api)(arcData, this);
            }
        });
        // mouse events
        if (isMouse) {
            arc
                .on("mouseover", function (event, d) {
                if (state.transiting) { // skip while transiting
                    return;
                }
                state.event = event;
                var updated = $$.updateAngle(d);
                var arcData = updated ? $$.convertToArcData(updated) : null;
                var id = (arcData && arcData.id) || undefined;
                selectArc(this, arcData, id);
                $$.setOverOut(true, arcData);
            })
                .on("mouseout", function (event, d) {
                if (state.transiting) { // skip while transiting
                    return;
                }
                state.event = event;
                var updated = $$.updateAngle(d);
                var arcData = updated ? $$.convertToArcData(updated) : null;
                unselectArc();
                $$.setOverOut(false, arcData);
            })
                .on("mousemove", function (event, d) {
                var updated = $$.updateAngle(d);
                var arcData = updated ? $$.convertToArcData(updated) : null;
                state.event = event;
                $$.showTooltip([arcData], this);
            });
        }
        // touch events
        if (isTouch && $$.hasArcType() && !$$.radars) {
            var getEventArc_1 = function (event) {
                var touch = event.changedTouches[0];
                var eventArc = select(doc.elementFromPoint(touch.clientX, touch.clientY));
                return eventArc;
            };
            $$.$el.svg
                .on("touchstart touchmove", function (event) {
                if (state.transiting) { // skip while transiting
                    return;
                }
                var eventArc = getEventArc_1(event);
                var datum = eventArc.datum();
                var updated = (datum && datum.data && datum.data.id) ? $$.updateAngle(datum) : null;
                var arcData = updated ? $$.convertToArcData(updated) : null;
                var id = (arcData && arcData.id) || undefined;
                $$.callOverOutForTouch(arcData);
                isUndefined(id) ?
                    unselectArc() : selectArc(this, arcData, id);
            });
        }
    },
    redrawArcText: function (duration) {
        var $$ = this;
        var config = $$.config, state = $$.state, _a = $$.$el, main = _a.main, arcs = _a.arcs;
        var hasGauge = $$.hasType("gauge");
        var hasMultiArcGauge = $$.hasMultiArcGauge();
        var text;
        // for gauge type, update text when has no title & multi data
        if (!(hasGauge && $$.data.targets.length === 1 && config.gauge_title)) {
            text = main.selectAll("." + CLASS.chartArc)
                .select("text")
                .style("opacity", "0")
                .attr("class", function (d) { return ($$.isGaugeType(d.data) ? CLASS.gaugeValue : null); })
                .call($$.textForArcLabel.bind($$))
                .attr("transform", $$.transformForArcLabel.bind($$))
                .style("font-size", function (d) { return ($$.isGaugeType(d.data) && $$.data.targets.length === 1 && !hasMultiArcGauge ?
                Math.round(state.radius / 5) + "px" : null); })
                .transition()
                .duration(duration)
                .style("opacity", function (d) { return ($$.isTargetToShow(d.data.id) && $$.isArcType(d.data) ? "1" : "0"); });
            hasMultiArcGauge && text.attr("dy", "-.1em");
        }
        main.select("." + CLASS.chartArcsTitle)
            .style("opacity", $$.hasType("donut") || hasGauge ? "1" : "0");
        if (hasGauge) {
            var isFullCircle = config.gauge_fullCircle;
            isFullCircle && text && text.attr("dy", "" + (hasMultiArcGauge ? 0 : Math.round(state.radius / 14)));
            if (config.gauge_label_show) {
                arcs.select("." + CLASS.chartArcsGaugeUnit)
                    .attr("dy", (isFullCircle ? 1.5 : 0.75) + "em")
                    .text(config.gauge_units);
                arcs.select("." + CLASS.chartArcsGaugeMin)
                    .attr("dx", -1 * (state.innerRadius + ((state.radius - state.innerRadius) / (isFullCircle ? 1 : 2))) + "px")
                    .attr("dy", "1.2em")
                    .text($$.textForGaugeMinMax(config.gauge_min, false));
                // show max text when isn't fullCircle
                !isFullCircle && arcs.select("." + CLASS.chartArcsGaugeMax)
                    .attr("dx", state.innerRadius + ((state.radius - state.innerRadius) / 2) + "px")
                    .attr("dy", "1.2em")
                    .text($$.textForGaugeMinMax(config.gauge_max, true));
            }
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeArea = {
    initArea: function (mainLine) {
        var $$ = this;
        var config = $$.config;
        mainLine
            .insert("g", "." + CLASS[config.area_front ? "circles" : "lines"])
            .attr("class", $$.getClass("areas", true));
    },
    updateAreaGradient: function () {
        var $$ = this;
        var config = $$.config, datetimeId = $$.state.datetimeId, defs = $$.$el.defs;
        $$.data.targets.forEach(function (d) {
            var id = datetimeId + "-areaGradient" + $$.getTargetSelectorSuffix(d.id);
            if ($$.isAreaType(d) && defs.select("#" + id).empty()) {
                var color_1 = $$.color(d);
                var _a = config.area_linearGradient, _b = _a.x, x = _b === void 0 ? [0, 0] : _b, _c = _a.y, y = _c === void 0 ? [0, 1] : _c, _d = _a.stops, stops = _d === void 0 ? [[0, color_1, 1], [1, color_1, 0]] : _d;
                var linearGradient_1 = defs.append("linearGradient")
                    .attr("id", "" + id)
                    .attr("x1", x[0])
                    .attr("x2", x[1])
                    .attr("y1", y[0])
                    .attr("y2", y[1]);
                stops.forEach(function (v) {
                    var stopColor = isFunction(v[1]) ? v[1].bind($$.api)(d.id) : v[1];
                    linearGradient_1.append("stop")
                        .attr("offset", v[0])
                        .attr("stop-color", stopColor || color_1)
                        .attr("stop-opacity", v[2]);
                });
            }
        });
    },
    updateAreaColor: function (d) {
        var $$ = this;
        return $$.config.area_linearGradient ?
            "url(#" + $$.state.datetimeId + "-areaGradient" + $$.getTargetSelectorSuffix(d.id) + ")" :
            $$.color(d);
    },
    /**
     * Generate/Update elements
     * @param {number} durationForExit Transition duration for exit elements
     * @param {boolean} isSub Subchart draw
     * @private
     */
    updateArea: function (durationForExit, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var $root = isSub ? $el.subchart : $el;
        config.area_linearGradient && $$.updateAreaGradient();
        var area = $root.main.selectAll("." + CLASS.areas)
            .selectAll("." + CLASS.area)
            .data($$.lineData.bind($$));
        area.exit().transition()
            .duration(durationForExit)
            .style("opacity", "0")
            .remove();
        $root.area = area.enter().append("path")
            .attr("class", $$.getClass("area", true))
            .style("fill", $$.updateAreaColor.bind($$))
            .style("opacity", function () {
            state.orgAreaOpacity = select(this).style("opacity");
            return "0";
        })
            .merge(area);
        area.style("opacity", state.orgAreaOpacity);
    },
    /**
     * Redraw function
     * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
     * @param {boolean} withTransition With or without transition
     * @param {boolean} isSub Subchart draw
     * @returns {Array}
     */
    redrawArea: function (drawFn, withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var area = (isSub ? this.$el.subchart : this.$el).area;
        var orgAreaOpacity = $$.state.orgAreaOpacity;
        return [
            (withTransition ? area.transition(getRandom()) : area)
                .attr("d", drawFn)
                .style("fill", $$.updateAreaColor.bind($$))
                .style("opacity", function (d) { return String($$.isAreaRangeType(d) ? orgAreaOpacity / 1.75 : orgAreaOpacity); })
        ];
    },
    /**
     * Generate area path data
     * @param {object} areaIndices Indices
     * @param {boolean} isSub Weather is sub axis
     * @returns {Function}
     * @private
     */
    generateDrawArea: function (areaIndices, isSub) {
        var $$ = this;
        var config = $$.config;
        var lineConnectNull = config.line_connectNull;
        var isRotated = config.axis_rotated;
        var getPoints = $$.generateGetAreaPoints(areaIndices, isSub);
        var yScale = $$.getYScaleById.bind($$);
        var xValue = function (d) { return (isSub ? $$.subxx : $$.xx).call($$, d); };
        var value0 = function (d, i) { return ($$.isGrouped(d.id) ?
            getPoints(d, i)[0][1] :
            yScale(d.id, isSub)($$.isAreaRangeType(d) ?
                $$.getRangedData(d, "high") : $$.getShapeYMin(d.id))); };
        var value1 = function (d, i) { return ($$.isGrouped(d.id) ?
            getPoints(d, i)[1][1] :
            yScale(d.id, isSub)($$.isAreaRangeType(d) ?
                $$.getRangedData(d, "low") : d.value)); };
        return function (d) {
            var values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
            var x0 = 0;
            var y0 = 0;
            var path;
            if ($$.isAreaType(d)) {
                var area = area$1();
                area = isRotated ?
                    area.y(xValue)
                        .x0(value0)
                        .x1(value1) :
                    area.x(xValue)
                        // @ts-ignore
                        .y0(config.area_above ? 0 : value0)
                        .y1(value1);
                if (!lineConnectNull) {
                    area = area.defined(function (d) { return $$.getBaseValue(d) !== null; });
                }
                if ($$.isStepType(d)) {
                    values = $$.convertValuesToStep(values);
                }
                path = area.curve($$.getCurve(d))(values);
            }
            else {
                if (values[0]) {
                    x0 = $$.scale.x(values[0].x);
                    y0 = $$.getYScaleById(d.id)(values[0].value);
                }
                path = isRotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;
            }
            return path || "M 0 0";
        };
    },
    generateGetAreaPoints: function (areaIndices, isSub) {
        // partial duplication of generateGetBarPoints
        var $$ = this;
        var config = $$.config;
        var x = $$.getShapeX(0, areaIndices, isSub);
        var y = $$.getShapeY(!!isSub);
        var areaOffset = $$.getShapeOffset($$.isAreaType, areaIndices, isSub);
        var yScale = $$.getYScaleById.bind($$);
        return function (d, i) {
            var y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
            var offset = areaOffset(d, i) || y0; // offset is for stacked area chart
            var posX = x(d);
            var posY = y(d);
            // fix posY not to overflow opposite quadrant
            if (config.axis_rotated && ((d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY))) {
                posY = y0;
            }
            // 1 point that marks the area position
            return [
                [posX, offset],
                [posX, posY - (y0 - offset)],
                [posX, posY - (y0 - offset)],
                [posX, offset] // needed for compatibility
            ];
        };
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeBar = {
    initBar: function () {
        var $el = this.$el;
        $el.bar = $el.main.select("." + CLASS.chart)
            // should positioned at the beginning of the shape node to not overlap others
            .insert("g", ":first-child")
            .attr("class", CLASS.chartBars);
    },
    updateTargetsForBar: function (targets) {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        var classChartBar = $$.getChartClass("Bar");
        var classBars = $$.getClass("bars", true);
        var classFocus = $$.classFocus.bind($$);
        var isSelectable = config.interaction_enabled && config.data_selection_isselectable;
        if (!$el.bar) {
            $$.initBar();
        }
        var mainBarUpdate = $$.$el.main.select("." + CLASS.chartBars)
            .selectAll("." + CLASS.chartBar)
            .data(targets)
            .attr("class", function (d) { return classChartBar(d) + classFocus(d); });
        var mainBarEnter = mainBarUpdate.enter().append("g")
            .attr("class", classChartBar)
            .style("opacity", "0")
            .style("pointer-events", "none");
        // Bars for each data
        mainBarEnter.append("g")
            .attr("class", classBars)
            .style("cursor", function (d) { return (isSelectable && isSelectable.bind($$.api)(d) ? "pointer" : null); });
    },
    /**
     * Generate/Update elements
     * @param {number} durationForExit Transition duration for exit elements
     * @param {boolean} isSub Subchart draw
     * @private
     */
    updateBar: function (durationForExit, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var $root = isSub ? $$.$el.subchart : $$.$el;
        var classBar = $$.getClass("bar", true);
        var initialOpacity = $$.initialOpacity.bind($$);
        var bar = $root.main.selectAll("." + CLASS.bars)
            .selectAll("." + CLASS.bar)
            .data($$.labelishData.bind($$));
        bar.exit().transition()
            .duration(durationForExit)
            .style("opacity", "0")
            .remove();
        $root.bar = bar.enter().append("path")
            .attr("class", classBar)
            .style("fill", $$.color)
            .merge(bar)
            .style("opacity", initialOpacity);
    },
    /**
     * Redraw function
     * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
     * @param {boolean} withTransition With or without transition
     * @param {boolean} isSub Subchart draw
     * @returns {Array}
     */
    redrawBar: function (drawFn, withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var bar = (isSub ? this.$el.subchart : this.$el).bar;
        return [
            (withTransition ? bar.transition(getRandom()) : bar)
                .attr("d", drawFn)
                .style("fill", this.color)
                .style("opacity", "1")
        ];
    },
    getBars: function (i, id) {
        var $$ = this;
        var main = $$.$el.main;
        var suffix = (isValue(i) ? "-" + i : "");
        return (id ? main
            .selectAll("." + CLASS.bars + $$.getTargetSelectorSuffix(id)) : main)
            .selectAll("." + CLASS.bar + suffix);
    },
    expandBars: function (i, id, reset) {
        var $$ = this;
        reset && $$.unexpandBars();
        $$.getBars(i, id).classed(CLASS.EXPANDED, true);
    },
    unexpandBars: function (i) {
        this.getBars(i).classed(CLASS.EXPANDED, false);
    },
    generateDrawBar: function (barIndices, isSub) {
        var $$ = this;
        var config = $$.config;
        var getPoints = $$.generateGetBarPoints(barIndices, isSub);
        var isRotated = config.axis_rotated;
        var isGrouped = config.data_groups.length;
        var barRadius = config.bar_radius;
        var barRadiusRatio = config.bar_radius_ratio;
        // get the bar radius
        var getRadius = isNumber(barRadius) && barRadius > 0 ?
            function () { return barRadius; } : (isNumber(barRadiusRatio) ? function (w) { return w * barRadiusRatio; } : null);
        return function (d, i) {
            // 4 points that make a bar
            var points = getPoints(d, i);
            // switch points if axis is rotated, not applicable for sub chart
            var indexX = +isRotated;
            var indexY = +!indexX;
            var isNegative = d.value < 0;
            var pathRadius = ["", ""];
            var radius = 0;
            if (getRadius && !isGrouped) {
                var index = isRotated ? indexY : indexX;
                var barW = points[2][index] - points[0][index];
                radius = getRadius(barW);
                var arc = "a" + radius + "," + radius + " " + (isNegative ? "1 0 0" : "0 0 1") + " ";
                pathRadius[+!isRotated] = "" + arc + radius + "," + radius;
                pathRadius[+isRotated] = "" + arc + [-radius, radius][isRotated ? "sort" : "reverse"]();
                isNegative && pathRadius.reverse();
            }
            // path string data shouldn't be containing new line chars
            // https://github.com/naver/billboard.js/issues/530
            var path = isRotated ?
                "H" + (points[1][indexX] - radius) + " " + pathRadius[0] + "V" + (points[2][indexY] - radius) + " " + pathRadius[1] + "H" + points[3][indexX] :
                "V" + (points[1][indexY] + (isNegative ? -radius : radius)) + " " + pathRadius[0] + "H" + (points[2][indexX] - radius) + " " + pathRadius[1] + "V" + points[3][indexY];
            return "M" + points[0][indexX] + "," + points[0][indexY] + path + "z";
        };
    },
    generateGetBarPoints: function (barIndices, isSub) {
        var $$ = this;
        var config = $$.config;
        var axis = isSub ? $$.axis.subX : $$.axis.x;
        var barTargetsNum = $$.getIndicesMax(barIndices) + 1;
        var barW = $$.getBarW("bar", axis, barTargetsNum);
        var barX = $$.getShapeX(barW, barIndices, !!isSub);
        var barY = $$.getShapeY(!!isSub);
        var barOffset = $$.getShapeOffset($$.isBarType, barIndices, !!isSub);
        var yScale = $$.getYScaleById.bind($$);
        return function (d, i) {
            var y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
            var offset = barOffset(d, i) || y0; // offset is for stacked bar chart
            var width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
            var posX = barX(d);
            var posY = barY(d);
            // fix posY not to overflow opposite quadrant
            if (config.axis_rotated && ((d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY))) {
                posY = y0;
            }
            posY -= (y0 - offset);
            var startPosX = posX + width;
            // 4 points that make a bar
            return [
                [posX, offset],
                [posX, posY],
                [startPosX, posY],
                [startPosX, offset]
            ];
        };
    },
    isWithinBar: function (that) {
        var mouse = getPointer(this.state.event, that);
        var list = getRectSegList(that);
        var seg0 = list[0], seg1 = list[1];
        var x = Math.min(seg0.x, seg1.x);
        var y = Math.min(seg0.y, seg1.y);
        var offset = this.config.bar_sensitivity;
        var _a = that.getBBox(), width = _a.width, height = _a.height;
        var sx = x - offset;
        var ex = x + width + offset;
        var sy = y + height + offset;
        var ey = y - offset;
        var isWithin = sx < mouse[0] &&
            mouse[0] < ex &&
            ey < mouse[1] &&
            mouse[1] < sy;
        return isWithin;
    }
};

var shapeCandlestick = {
    initCandlestick: function () {
        var $el = this.$el;
        $el.candlestick = $el.main.select("." + CLASS.chart)
            // should positioned at the beginning of the shape node to not overlap others
            .append("g")
            .attr("class", CLASS.chartCandlesticks);
    },
    /**
     * Update targets by its data
     * called from: ChartInternal.updateTargets()
     * @param {Array} targets Filtered target by type
     * @private
     */
    updateTargetsForCandlestick: function (targets) {
        var $$ = this;
        var $el = $$.$el;
        var classChart = $$.getChartClass("Candlestick");
        var classFocus = $$.classFocus.bind($$);
        if (!$el.candlestick) {
            $$.initCandlestick();
        }
        var mainUpdate = $$.$el.main.select("." + CLASS.chartCandlesticks)
            .selectAll("." + CLASS.chartCandlestick)
            .data(targets)
            .attr("class", function (d) { return classChart(d) + classFocus(d); });
        mainUpdate.enter().append("g")
            .attr("class", classChart)
            .style("pointer-events", "none");
    },
    /**
     * Generate/Update elements
     * @param {number} durationForExit Transition duration for exit elements
     * @param {boolean} isSub Subchart draw
     * @private
     */
    updateCandlestick: function (durationForExit, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var $el = $$.$el;
        var $root = isSub ? $el.subchart : $el;
        var classSetter = $$.getClass("candlestick", true);
        var initialOpacity = $$.initialOpacity.bind($$);
        var candlestick = $root.main.selectAll("." + CLASS.chartCandlestick)
            .selectAll("." + CLASS.candlestick)
            .data($$.labelishData.bind($$));
        candlestick.exit().transition()
            .duration(durationForExit)
            .style("opacity", "0")
            .remove();
        var candlestickEnter = candlestick.enter()
            .filter(function (d) { return d.value; })
            .append("g")
            .attr("class", classSetter);
        candlestickEnter.append("line");
        candlestickEnter.append("path");
        if (!$root.candlestick) {
            $root.candlestick = {};
        }
        $root.candlestick = candlestick.merge(candlestickEnter)
            .style("opacity", initialOpacity);
    },
    /**
     * Get draw function
     * @param {object} indices Indice data
     * @param {boolean} isSub Subchart draw
     * @returns {Function}
     * @private
     */
    generateDrawCandlestick: function (indices, isSub) {
        var $$ = this;
        var config = $$.config;
        var getPoints = $$.generateGetCandlestickPoints(indices, isSub);
        var isRotated = config.axis_rotated;
        var downColor = config.candlestick_color_down;
        return function (d, i, g) {
            var points = getPoints(d, i);
            var value = $$.getCandlestickData(d);
            var isUp = value === null || value === void 0 ? void 0 : value._isUp;
            // switch points if axis is rotated, not applicable for sub chart
            var indexX = +isRotated;
            var indexY = +!indexX;
            if (g.classed) {
                g.classed(CLASS[isUp ? "valueUp" : "valueDown"], true);
            }
            var path = isRotated ?
                "H" + points[1][1] + " V" + points[1][0] + " H" + points[0][1] :
                "V" + points[1][1] + " H" + points[1][0] + " V" + points[0][1];
            g.select("path")
                .attr("d", "M" + points[0][indexX] + "," + points[0][indexY] + path + "z")
                .style("fill", function (d) {
                var color = isUp ? $$.color(d) : (isObject(downColor) ? downColor[d.id] : downColor);
                return color || $$.color(d);
            });
            // set line position
            var line = g.select("line");
            var pos = isRotated ? {
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
            for (var x in pos) {
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
    generateGetCandlestickPoints: function (indices, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var config = $$.config;
        var axis = isSub ? $$.axis.subX : $$.axis.x;
        var targetsNum = $$.getIndicesMax(indices) + 1;
        var barW = $$.getBarW("candlestick", axis, targetsNum);
        var x = $$.getShapeX(barW, indices, !!isSub);
        var y = $$.getShapeY(!!isSub);
        var shapeOffset = $$.getShapeOffset($$.isBarType, indices, !!isSub);
        var yScale = $$.getYScaleById.bind($$);
        return function (d, i) {
            var y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
            var offset = shapeOffset(d, i) || y0; // offset is for stacked bar chart
            var width = isNumber(barW) ? barW : barW[d.id] || barW._$width;
            var value = $$.getCandlestickData(d);
            var points;
            if (value) {
                var posX = {
                    start: x(d),
                    end: 0
                };
                posX.end = posX.start + width;
                var posY = {
                    start: y(value.open),
                    end: y(value.close)
                };
                var posLine = {
                    x: posX.start + (width / 2),
                    high: y(value.high),
                    low: y(value.low)
                };
                // fix posY not to overflow opposite quadrant
                if (config.axis_rotated && ((d.value > 0 && posY.start < y0) || (d.value < 0 && y0 < posY.start))) {
                    posY.start = y0;
                }
                posY.start -= (y0 - offset);
                points = [
                    [posX.start, posY.start],
                    [posX.end, posY.end],
                    [posLine.x, posLine.low, posLine.high]
                ];
            }
            else {
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
    redrawCandlestick: function (drawFn, withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var candlestick = (isSub ? this.$el.subchart : this.$el).candlestick;
        var rand = getRandom(true);
        return [
            candlestick
                .each(function (d, i) {
                var g = withTransition ?
                    select(this).transition(rand) : select(this);
                drawFn(d, i, g);
            })
                .style("opacity", "1")
        ];
    },
    /**
     * Get candlestick data as object
     * @param {object} param Data object
     * @param {Array|object} param.value Data value
     * @returns {object|null} Converted data object
     * @private
     */
    getCandlestickData: function (_a) {
        var value = _a.value;
        var d;
        if (isArray(value)) {
            var open_1 = value[0], high = value[1], low = value[2], close_1 = value[3], _b = value[4], volume = _b === void 0 ? false : _b;
            d = { open: open_1, high: high, low: low, close: close_1 };
            if (volume !== false) {
                d.volume = volume;
            }
        }
        else if (isObject(value)) {
            d = _assign({}, value);
        }
        if (d) {
            d._isUp = d.close >= d.open;
        }
        return d || null;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeGauge = {
    initGauge: function () {
        var $$ = this;
        var config = $$.config, arcs = $$.$el.arcs;
        var appendText = function (className) {
            arcs.append("text")
                .attr("class", className)
                .style("text-anchor", "middle")
                .style("pointer-events", "none");
        };
        if ($$.hasType("gauge")) {
            var hasMulti = $$.hasMultiArcGauge();
            arcs.append(hasMulti ? "g" : "path")
                .attr("class", CLASS.chartArcsBackground)
                .style("fill", (!hasMulti && config.gauge_background) || null);
            config.gauge_units && appendText(CLASS.chartArcsGaugeUnit);
            if (config.gauge_label_show) {
                appendText(CLASS.chartArcsGaugeMin);
                !config.gauge_fullCircle && appendText(CLASS.chartArcsGaugeMax);
            }
        }
    },
    updateGaugeMax: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var hasMultiGauge = $$.hasMultiArcGauge();
        // to prevent excluding total data sum during the init(when data.hide option is used), use $$.rendered state value
        var max = hasMultiGauge ?
            $$.getMinMaxData().max[0].value : $$.getTotalDataSum(state.rendered);
        // if gauge_max less than max, make max to max value
        if (max > config.gauge_max) {
            config.gauge_max = max;
        }
    },
    redrawMultiArcGauge: function () {
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var hiddenTargetIds = $$.state.hiddenTargetIds;
        var arcLabelLines = $el.main.selectAll("." + CLASS.arcs)
            .selectAll("." + CLASS.arcLabelLine)
            .data($$.arcData.bind($$));
        var mainArcLabelLine = arcLabelLines.enter()
            .append("rect")
            .attr("class", function (d) { return CLASS.arcLabelLine + " " + CLASS.target + " " + CLASS.target + "-" + d.data.id; })
            .merge(arcLabelLines);
        mainArcLabelLine
            .style("fill", function (d) { return ($$.levelColor ? $$.levelColor(d.data.values[0].value) : $$.color(d.data)); })
            .style("display", config.gauge_label_show ? "" : "none")
            .each(function (d) {
            var lineLength = 0;
            var lineThickness = 2;
            var x = 0;
            var y = 0;
            var transform = "";
            if (hiddenTargetIds.indexOf(d.data.id) < 0) {
                var updated = $$.updateAngle(d);
                var innerLineLength = state.gaugeArcWidth / $$.filterTargetsToShow($$.data.targets).length *
                    (updated.index + 1);
                var lineAngle = updated.endAngle - Math.PI / 2;
                var arcInnerRadius = state.radius - innerLineLength;
                var linePositioningAngle = lineAngle - (arcInnerRadius === 0 ? 0 : (1 / arcInnerRadius));
                lineLength = state.radiusExpanded - state.radius + innerLineLength;
                x = Math.cos(linePositioningAngle) * arcInnerRadius;
                y = Math.sin(linePositioningAngle) * arcInnerRadius;
                transform = "rotate(" + lineAngle * 180 / Math.PI + ", " + x + ", " + y + ")";
            }
            select(this)
                .attr("x", x)
                .attr("y", y)
                .attr("width", lineLength)
                .attr("height", lineThickness)
                .attr("transform", transform)
                .style("stroke-dasharray", "0, " + (lineLength + lineThickness) + ", 0");
        });
    },
    textForGaugeMinMax: function (value, isMax) {
        var $$ = this;
        var config = $$.config;
        var format = config.gauge_label_extents;
        return isFunction(format) ? format.bind($$.api)(value, isMax) : value;
    },
    getGaugeLabelHeight: function () {
        var config = this.config;
        return this.config.gauge_label_show && !config.gauge_fullCircle ? 20 : 0;
    },
    getPaddingBottomForGauge: function () {
        var $$ = this;
        return $$.getGaugeLabelHeight() * ($$.config.gauge_label_show ? 2 : 2.5);
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeBubble = {
    /**
     * Initializer
     * @private
     */
    initBubble: function () {
        var $$ = this;
        var config = $$.config;
        if ($$.hasType("bubble")) {
            config.point_show = true;
            config.point_type = "circle";
            config.point_sensitivity = 25;
        }
    },
    /**
     * Get user agent's computed value
     * @returns {number}
     * @private
     */
    getBaseLength: function () {
        var $$ = this;
        var _a = $$.state, width = _a.width, height = _a.height;
        var cacheKey = KEY.bubbleBaseLength;
        var baseLength = $$.cache.get(cacheKey);
        if (!baseLength) {
            $$.cache.add(cacheKey, baseLength = getMinMax$1("min", [width, height]));
        }
        return baseLength;
    },
    /**
     * Get the radius value for bubble circle
     * @param {object} d Data object
     * @returns {number}
     * @private
     */
    getBubbleR: function (d) {
        var $$ = this;
        var maxR = $$.config.bubble_maxR;
        if (isFunction(maxR)) {
            maxR = maxR.bind($$.api)(d);
        }
        else if (!isNumber(maxR)) {
            maxR = ($$.getBaseLength() / ($$.getMaxDataCount() * 2)) + 12;
        }
        var max = getMinMax$1("max", $$.getMinMaxData().max.map(function (d) { return ($$.isBubbleZType(d) ?
            $$.getBubbleZData(d.value, "y") : (isObject(d.value) ? d.value.mid : d.value)); }));
        var maxArea = maxR * maxR * Math.PI;
        var area = ($$.isBubbleZType(d) ? $$.getBubbleZData(d.value, "z") : d.value) * (maxArea / max);
        return Math.sqrt(area / Math.PI);
    },
    /**
     * Get bubble dimension data
     * @param {object|Array} d data value
     * @param {string} type - y or z
     * @returns {number}
     * @private
     */
    getBubbleZData: function (d, type) {
        return isObject(d) ? d[type] : d[type === "y" ? 0 : 1];
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var shapeLine = {
    initLine: function () {
        var $el = this.$el;
        $el.line = $el.main.select("." + CLASS.chart).append("g")
            .attr("class", CLASS.chartLines);
    },
    updateTargetsForLine: function (t) {
        var $$ = this;
        var _a = $$.$el, area = _a.area, line = _a.line, main = _a.main;
        var classChartLine = $$.getChartClass("Line");
        var classLines = $$.getClass("lines", true);
        var classFocus = $$.classFocus.bind($$);
        if (!line) {
            $$.initLine();
        }
        var targets = t.filter(function (d) { return !($$.isScatterType(d) || $$.isBubbleType(d)); });
        var mainLineUpdate = main.select("." + CLASS.chartLines)
            .selectAll("." + CLASS.chartLine)
            .data(targets)
            .attr("class", function (d) { return classChartLine(d) + classFocus(d); });
        var mainLineEnter = mainLineUpdate.enter().append("g")
            .attr("class", classChartLine)
            .style("opacity", "0")
            .style("pointer-events", "none");
        // Lines for each data
        mainLineEnter.append("g")
            .attr("class", classLines);
        // Areas
        if ($$.hasTypeOf("Area")) {
            $$.initArea(!area && mainLineEnter.empty() ? mainLineUpdate : mainLineEnter);
        }
        $$.updateTargetForCircle(targets, mainLineEnter);
    },
    /**
     * Generate/Update elements
     * @param {number} durationForExit Transition duration for exit elements
     * @param {boolean} isSub Subchart draw
     * @private
     */
    updateLine: function (durationForExit, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var extraLineClasses = $$.format.extraLineClasses, $el = $$.$el;
        var $root = isSub ? $el.subchart : $el;
        var line = $root.main
            .selectAll("." + CLASS.lines)
            .selectAll("." + CLASS.line)
            .data($$.lineData.bind($$));
        line.exit().transition()
            .duration(durationForExit)
            .style("opacity", "0")
            .remove();
        $root.line = line.enter()
            .append("path")
            .attr("class", function (d) { return $$.getClass("line", true)(d) + " " + (extraLineClasses(d) || ""); })
            .style("stroke", $$.color)
            .merge(line)
            .style("opacity", $$.initialOpacity.bind($$))
            .style("shape-rendering", function (d) { return ($$.isStepType(d) ? "crispEdges" : ""); })
            .attr("transform", null);
    },
    /**
     * Redraw function
     * @param {Function} drawFn Retuned functino from .generateDrawCandlestick()
     * @param {boolean} withTransition With or without transition
     * @param {boolean} isSub Subchart draw
     * @returns {Array}
     */
    redrawLine: function (drawFn, withTransition, isSub) {
        if (isSub === void 0) { isSub = false; }
        var line = (isSub ? this.$el.subchart : this.$el).line;
        return [
            (withTransition ? line.transition(getRandom()) : line)
                .attr("d", drawFn)
                .style("stroke", this.color)
                .style("opacity", "1")
        ];
    },
    /**
     * Get the curve interpolate
     * @param {Array} d Data object
     * @returns {Function}
     * @private
     */
    getCurve: function (d) {
        var $$ = this;
        var isRotatedStepType = $$.config.axis_rotated && $$.isStepType(d);
        // when is step & rotated, should be computed in different way
        // https://github.com/naver/billboard.js/issues/471
        return isRotatedStepType ? function (context) {
            var step = $$.getInterpolate(d)(context);
            // keep the original method
            step.orgPoint = step.point;
            // to get rotated path data
            step.pointRotated = function (x, y) {
                this._point === 1 && (this._point = 2);
                var y1 = this._y * (1 - this._t) + y * this._t;
                this._context.lineTo(this._x, y1);
                this._context.lineTo(x, y1);
                this._x = x;
                this._y = y;
            };
            step.point = function (x, y) {
                this._point === 0 ? this.orgPoint(x, y) : this.pointRotated(x, y);
            };
            return step;
        } : $$.getInterpolate(d);
    },
    generateDrawLine: function (lineIndices, isSub) {
        var $$ = this;
        var config = $$.config, scale = $$.scale;
        var lineConnectNull = config.line_connectNull;
        var isRotated = config.axis_rotated;
        var getPoints = $$.generateGetLinePoints(lineIndices, isSub);
        var yScale = $$.getYScaleById.bind($$);
        var xValue = function (d) { return (isSub ? $$.subxx : $$.xx).call($$, d); };
        var yValue = function (d, i) { return ($$.isGrouped(d.id) ?
            getPoints(d, i)[0][1] :
            yScale(d.id, isSub)($$.getBaseValue(d))); };
        var line = line$1();
        line = isRotated ?
            line.x(yValue).y(xValue) : line.x(xValue).y(yValue);
        if (!lineConnectNull) {
            line = line.defined(function (d) { return $$.getBaseValue(d) !== null; });
        }
        var x = isSub ? scale.subX : scale.x;
        return function (d) {
            var y = yScale(d.id, isSub);
            var values = lineConnectNull ? $$.filterRemoveNull(d.values) : d.values;
            var x0 = 0;
            var y0 = 0;
            var path;
            if ($$.isLineType(d)) {
                var regions = config.data_regions[d.id];
                if (regions) {
                    path = $$.lineWithRegions(values, x, y, regions);
                }
                else {
                    if ($$.isStepType(d)) {
                        values = $$.convertValuesToStep(values);
                    }
                    path = line.curve($$.getCurve(d))(values);
                }
            }
            else {
                if (values[0]) {
                    x0 = x(values[0].x);
                    y0 = y(values[0].value);
                }
                path = isRotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;
            }
            return path || "M 0 0";
        };
    },
    lineWithRegions: function (d, x, y, _regions) {
        var $$ = this;
        var config = $$.config;
        var isRotated = config.axis_rotated;
        var isTimeSeries = $$.axis.isTimeSeries();
        var xOffset = $$.axis.isCategorized() ? 0.5 : 0;
        var regions = [];
        var dasharray = "2 2"; // default value
        var xp;
        var yp;
        var diff;
        var diffx2;
        // check weather data is within region
        var isWithinRegions = function (withinX, withinRegions) {
            for (var i = 0, reg = void 0; (reg = withinRegions[i]); i++) {
                if (reg.start < withinX && withinX <= reg.end) {
                    return reg.style;
                }
            }
            return false;
        };
        // Check start/end of regions
        if (isDefined(_regions)) {
            var getValue = function (v, def) { return (isUndefined(v) ? def : (isTimeSeries ? parseDate.call($$, v) : v)); };
            for (var i = 0, reg = void 0; (reg = _regions[i]); i++) {
                var start = getValue(reg.start, d[0].x);
                var end = getValue(reg.end, d[d.length - 1].x);
                var style = reg.style || { dasharray: dasharray };
                regions[i] = { start: start, end: end, style: style };
            }
        }
        // Set scales
        var xValue = isRotated ? function (dt) { return y(dt.value); } : function (dt) { return x(dt.x); };
        var yValue = isRotated ? function (dt) { return x(dt.x); } : function (dt) { return y(dt.value); };
        // Define svg generator function for region
        var generateM = function (points) { return "M" + points[0][0] + "," + points[0][1] + "L" + points[1][0] + "," + points[1][1]; };
        var sWithRegion = isTimeSeries ? function (d0, d1, k, timeseriesDiff) {
            var x0 = d0.x.getTime();
            var xDiff = d1.x - d0.x;
            var xv0 = new Date(x0 + xDiff * k);
            var xv1 = new Date(x0 + xDiff * (k + timeseriesDiff));
            var points = isRotated ?
                [[y(yp(k)), x(xv0)], [y(yp(k + diff)), x(xv1)]] :
                [[x(xv0), y(yp(k))], [x(xv1), y(yp(k + diff))]];
            return generateM(points);
        } : function (d0, d1, k, otherDiff) {
            var points = isRotated ?
                [[y(yp(k), true), x(xp(k))], [y(yp(k + otherDiff), true), x(xp(k + otherDiff))]] :
                [[x(xp(k), true), y(yp(k))], [x(xp(k + otherDiff), true), y(yp(k + otherDiff))]];
            return generateM(points);
        };
        // Generate
        var axisType = { x: $$.axis.getAxisType("x"), y: $$.axis.getAxisType("y") };
        var path = "";
        for (var i = 0, data = void 0; (data = d[i]); i++) {
            var prevData = d[i - 1];
            var hasPrevData = prevData && isValue(prevData.value);
            var style = isWithinRegions(data.x, regions);
            // https://github.com/naver/billboard.js/issues/1172
            if (!isValue(data.value)) {
                continue;
            }
            // Draw as normal
            if (isUndefined(regions) || !style || !hasPrevData) {
                path += "" + (i && hasPrevData ? "L" : "M") + xValue(data) + "," + yValue(data);
            }
            else if (hasPrevData) {
                try {
                    style = style.dasharray.split(" ");
                }
                catch (e) {
                    style = dasharray.split(" ");
                }
                // Draw with region // TODO: Fix for horizotal charts
                xp = getScale(axisType.x, prevData.x + xOffset, data.x + xOffset);
                yp = getScale(axisType.y, prevData.value, data.value);
                var dx = x(data.x) - x(prevData.x);
                var dy = y(data.value) - y(prevData.value);
                var dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                diff = style[0] / dd;
                diffx2 = diff * style[1];
                for (var j = diff; j <= 1; j += diffx2) {
                    path += sWithRegion(prevData, data, j, diff);
                    // to make sure correct line drawing
                    if (j + diffx2 >= 1) {
                        path += sWithRegion(prevData, data, 1, 0);
                    }
                }
            }
        }
        return path;
    },
    isWithinStep: function (that, y) {
        return Math.abs(y - getPointer(this.state.event, that)[1]) < 30;
    },
    shouldDrawPointsForLine: function (d) {
        var linePoint = this.config.line_point;
        return linePoint === true ||
            (isArray(linePoint) && linePoint.indexOf(d.id) !== -1);
    }
};

var getTransitionName = function () { return getRandom(); };
var shapePoint = {
    hasValidPointType: function (type) {
        return /^(circle|rect(angle)?|polygon|ellipse|use)$/i.test(type || this.config.point_type);
    },
    hasValidPointDrawMethods: function (type) {
        var pointType = type || this.config.point_type;
        return isObjectType(pointType) &&
            isFunction(pointType.create) && isFunction(pointType.update);
    },
    initialOpacityForCircle: function (d) {
        var _a = this, config = _a.config, withoutFadeIn = _a.state.withoutFadeIn;
        var opacity = config.point_opacity;
        if (isUndefined(opacity)) {
            opacity = this.getBaseValue(d) !== null &&
                withoutFadeIn[d.id] ? this.opacityForCircle(d) : "0";
        }
        return opacity;
    },
    opacityForCircle: function (d) {
        var config = this.config;
        var opacity = config.point_opacity;
        if (isUndefined(opacity)) {
            opacity = config.point_show && !config.point_focus_only ? "1" : "0";
            opacity = isValue(this.getBaseValue(d)) ?
                (this.isBubbleType(d) || this.isScatterType(d) ?
                    "0.5" : opacity) : "0";
        }
        return opacity;
    },
    initCircle: function () {
        var $$ = this;
        var main = $$.$el.main;
        $$.point = $$.generatePoint();
        if (($$.hasType("bubble") || $$.hasType("scatter")) && main.select("." + CLASS.chartCircles).empty()) {
            main.select("." + CLASS.chart)
                .append("g")
                .attr("class", CLASS.chartCircles);
        }
    },
    updateTargetForCircle: function (targetsValue, enterNodeValue) {
        var _this = this;
        var $$ = this;
        var config = $$.config, data = $$.data, $el = $$.$el;
        var selectionEnabled = config.interaction_enabled && config.data_selection_enabled;
        var isSelectable = selectionEnabled && config.data_selection_isselectable;
        var classCircles = $$.getClass("circles", true);
        if (!config.point_show) {
            return;
        }
        !$el.circle && $$.initCircle();
        var targets = targetsValue;
        var enterNode = enterNodeValue;
        // only for scatter & bubble type should generate seprate <g> node
        if (!targets) {
            targets = (data.targets)
                .filter(function (d) { return _this.isScatterType(d) || _this.isBubbleType(d); });
            var mainCircle = $el.main.select("." + CLASS.chartCircles)
                .style("pointer-events", "none")
                .selectAll("." + CLASS.circles)
                .data(targets)
                .attr("class", classCircles);
            mainCircle.exit().remove();
            enterNode = mainCircle.enter();
        }
        // Circles for each data point on lines
        selectionEnabled && enterNode.append("g")
            .attr("class", function (d) { return $$.generateClass(CLASS.selectedCircles, d.id); });
        enterNode.append("g")
            .attr("class", classCircles)
            .style("cursor", function (d) { return (isSelectable && isSelectable(d) ? "pointer" : null); });
        // Update date for selected circles
        selectionEnabled && targets.forEach(function (t) {
            $el.main.selectAll("." + CLASS.selectedCircles + $$.getTargetSelectorSuffix(t.id))
                .selectAll("" + CLASS.selectedCircle)
                .each(function (d) {
                d.value = t.values[d.index].value;
            });
        });
    },
    updateCircle: function (isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var config = $$.config, state = $$.state, $el = $$.$el;
        var focusOnly = config.point_focus_only;
        var $root = isSub ? $el.subchart : $el;
        if (config.point_show && !state.toggling) {
            var circles = $root.main.selectAll("." + CLASS.circles)
                .selectAll("." + CLASS.circle)
                .data(function (d) { return (($$.isLineType(d) && $$.shouldDrawPointsForLine(d)) ||
                $$.isBubbleType(d) || $$.isRadarType(d) || $$.isScatterType(d) ?
                (focusOnly ? [d.values[0]] : d.values) : []); });
            circles.exit().remove();
            circles.enter()
                .filter(Boolean)
                .append($$.point("create", this, $$.pointR.bind($$), $$.color));
            $root.circle = $root.main.selectAll("." + CLASS.circles + " ." + CLASS.circle)
                .style("stroke", $$.color)
                .style("opacity", $$.initialOpacityForCircle.bind($$));
        }
    },
    redrawCircle: function (cx, cy, withTransition, flow, isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var rendered = $$.state.rendered, $el = $$.$el;
        var $root = isSub ? $el.subchart : $el;
        var selectedCircles = $root.main.selectAll("." + CLASS.selectedCircle);
        if (!$$.config.point_show) {
            return [];
        }
        var fn = $$.point("update", $$, cx, cy, $$.color, withTransition, flow, selectedCircles);
        var posAttr = $$.isCirclePoint() ? "c" : "";
        var t = getRandom();
        var opacityStyleFn = $$.opacityForCircle.bind($$);
        var mainCircles = [];
        $root.circle.each(function (d) {
            var result = fn.bind(this)(d);
            result = ((withTransition || !rendered) ? result.transition(t) : result)
                .style("opacity", opacityStyleFn);
            mainCircles.push(result);
        });
        return [
            mainCircles,
            (withTransition ? selectedCircles.transition() : selectedCircles)
                .attr(posAttr + "x", cx)
                .attr(posAttr + "y", cy)
        ];
    },
    /**
     * Show focused data point circle
     * @param {object} d Selected data
     * @private
     */
    showCircleFocus: function (d) {
        var $$ = this;
        var config = $$.config, _a = $$.state, hasRadar = _a.hasRadar, resizing = _a.resizing, toggling = _a.toggling, transiting = _a.transiting, $el = $$.$el;
        var circle = $el.circle;
        if (transiting === false && config.point_focus_only && circle) {
            var cx = (hasRadar ? $$.radarCircleX : $$.circleX).bind($$);
            var cy = (hasRadar ? $$.radarCircleY : $$.circleY).bind($$);
            var withTransition = toggling || isUndefined(d);
            var fn_1 = $$.point("update", $$, cx, cy, $$.color, resizing ? false : withTransition);
            if (d) {
                circle = circle
                    .filter(function (t) {
                    var data = d.filter(function (v) { return v.id === t.id; });
                    return data.length ?
                        select(this).datum(data[0]) : false;
                });
            }
            circle
                .attr("class", this.updatePointClass.bind(this))
                .style("opacity", "1")
                .each(function (d) {
                var id = d.id, index = d.index, value = d.value;
                var visibility = "hidden";
                if (isValue(value)) {
                    fn_1.bind(this)(d);
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
    hideCircleFocus: function () {
        var $$ = this;
        var config = $$.config, circle = $$.$el.circle;
        if (config.point_focus_only && circle) {
            $$.unexpandCircles();
            circle.style("visibility", "hidden");
        }
    },
    circleX: function (d) {
        return this.xx(d);
    },
    updateCircleY: function (isSub) {
        if (isSub === void 0) { isSub = false; }
        var $$ = this;
        var getPoints = $$.generateGetLinePoints($$.getShapeIndices($$.isLineType), isSub);
        return function (d, i) {
            var id = d.id;
            return $$.isGrouped(id) ?
                getPoints(d, i)[0][1] :
                $$.getYScaleById(id, isSub)($$.getBaseValue(d));
        };
    },
    getCircles: function (i, id) {
        var $$ = this;
        var suffix = (isValue(i) ? "-" + i : "");
        return (id ? $$.$el.main.selectAll("." + CLASS.circles + $$.getTargetSelectorSuffix(id)) : $$.$el.main)
            .selectAll("." + CLASS.circle + suffix);
    },
    expandCircles: function (i, id, reset) {
        var $$ = this;
        var r = $$.pointExpandedR.bind($$);
        reset && $$.unexpandCircles();
        var circles = $$.getCircles(i, id).classed(CLASS.EXPANDED, true);
        var scale = r(circles) / $$.config.point_r;
        var ratio = 1 - scale;
        if ($$.isCirclePoint()) {
            circles.attr("r", r);
        }
        else {
            // transform must be applied to each node individually
            circles.each(function () {
                var point = select(this);
                if (this.tagName === "circle") {
                    point.attr("r", r);
                }
                else {
                    var _a = this.getBBox(), width = _a.width, height = _a.height;
                    var x = ratio * (+point.attr("x") + width / 2);
                    var y = ratio * (+point.attr("y") + height / 2);
                    point.attr("transform", "translate(" + x + " " + y + ") scale(" + scale + ")");
                }
            });
        }
    },
    unexpandCircles: function (i) {
        var $$ = this;
        var r = $$.pointR.bind($$);
        var circles = $$.getCircles(i)
            .filter(function () {
            return select(this).classed(CLASS.EXPANDED);
        })
            .classed(CLASS.EXPANDED, false);
        circles.attr("r", r);
        !$$.isCirclePoint() &&
            circles.attr("transform", "scale(" + r(circles) / $$.config.point_r + ")");
    },
    pointR: function (d) {
        var $$ = this;
        var config = $$.config;
        var pointR = config.point_r;
        var r = pointR;
        if ($$.isBubbleType(d)) {
            r = $$.getBubbleR(d);
        }
        else if (isFunction(pointR)) {
            r = pointR.bind($$.api)(d);
        }
        return r;
    },
    pointExpandedR: function (d) {
        var $$ = this;
        var config = $$.config;
        var scale = $$.isBubbleType(d) ? 1.15 : 1.75;
        return config.point_focus_expand_enabled ?
            (config.point_focus_expand_r || $$.pointR(d) * scale) : $$.pointR(d);
    },
    pointSelectR: function (d) {
        var $$ = this;
        var selectR = $$.config.point_select_r;
        return isFunction(selectR) ?
            selectR(d) : (selectR || $$.pointR(d) * 4);
    },
    isWithinCircle: function (node, r) {
        var mouse = getPointer(this.state.event, node);
        var element = select(node);
        var prefix = this.isCirclePoint(node) ? "c" : "";
        var cx = +element.attr(prefix + "x");
        var cy = +element.attr(prefix + "y");
        // if node don't have cx/y or x/y attribute value
        if (!(cx || cy) && node.nodeType === 1) {
            var _a = getBoundingRect(node), x = _a.x, y = _a.y;
            cx = x;
            cy = y;
        }
        return Math.sqrt(Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)) < (r || this.config.point_sensitivity);
    },
    insertPointInfoDefs: function (point, id) {
        var $$ = this;
        var copyAttr = function (from, target) {
            var attribs = from.attributes;
            for (var i = 0, name_1; (name_1 = attribs[i]); i++) {
                name_1 = name_1.name;
                target.setAttribute(name_1, from.getAttribute(name_1));
            }
        };
        var doc$1 = new DOMParser().parseFromString(point, "image/svg+xml");
        var node = doc$1.documentElement;
        var clone = doc.createElementNS(namespaces.svg, node.nodeName.toLowerCase());
        clone.id = id;
        clone.style.fill = "inherit";
        clone.style.stroke = "inherit";
        copyAttr(node, clone);
        if (node.childNodes && node.childNodes.length) {
            var parent_1 = select(clone);
            if ("innerHTML" in clone) {
                parent_1.html(node.innerHTML);
            }
            else {
                toArray(node.childNodes).forEach(function (v) {
                    copyAttr(v, parent_1.append(v.tagName).node());
                });
            }
        }
        $$.$el.defs.node().appendChild(clone);
    },
    pointFromDefs: function (id) {
        return this.$el.defs.select("#" + id);
    },
    updatePointClass: function (d) {
        var $$ = this;
        var circle = $$.$el.circle;
        var pointClass = false;
        if (isObject(d) || circle) {
            pointClass = d === true ?
                circle.each(function (d) {
                    var className = $$.getClass("circle", true)(d);
                    if (this.getAttribute("class").indexOf(CLASS.EXPANDED) > -1) {
                        className += " " + CLASS.EXPANDED;
                    }
                    this.setAttribute("class", className);
                }) : $$.getClass("circle", true)(d);
        }
        return pointClass;
    },
    generateGetLinePoints: function (lineIndices, isSub) {
        var $$ = this;
        var config = $$.config;
        var x = $$.getShapeX(0, lineIndices, isSub);
        var y = $$.getShapeY(isSub);
        var lineOffset = $$.getShapeOffset($$.isLineType, lineIndices, isSub);
        var yScale = $$.getYScaleById.bind($$);
        return function (d, i) {
            var y0 = yScale.call($$, d.id, isSub)($$.getShapeYMin(d.id));
            var offset = lineOffset(d, i) || y0; // offset is for stacked area chart
            var posX = x(d);
            var posY = y(d);
            // fix posY not to overflow opposite quadrant
            if (config.axis_rotated && ((d.value > 0 && posY < y0) || (d.value < 0 && y0 < posY))) {
                posY = y0;
            }
            // 1 point that marks the line position
            var point = [posX, posY - (y0 - offset)];
            return [
                point,
                point,
                point,
                point
            ];
        };
    },
    generatePoint: function () {
        var $$ = this;
        var config = $$.config, datetimeId = $$.state.datetimeId;
        var ids = [];
        var pattern = notEmpty(config.point_pattern) ? config.point_pattern : [config.point_type];
        return function (method, context) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return function (d) {
                var id = $$.getTargetSelectorSuffix(d.id || (d.data && d.data.id) || d);
                var element = select(this);
                ids.indexOf(id) < 0 && ids.push(id);
                var point = pattern[ids.indexOf(id) % pattern.length];
                if ($$.hasValidPointType(point)) {
                    point = $$[point];
                }
                else if (!$$.hasValidPointDrawMethods(point)) {
                    var pointId = datetimeId + "-point" + id;
                    var pointFromDefs = $$.pointFromDefs(pointId);
                    if (pointFromDefs.size() < 1) {
                        $$.insertPointInfoDefs(point, pointId);
                    }
                    if (method === "create") {
                        return $$.custom.create.bind(context).apply(void 0, __spreadArray([element, pointId], args));
                    }
                    else if (method === "update") {
                        return $$.custom.update.bind(context).apply(void 0, __spreadArray([element], args));
                    }
                }
                return point[method].bind(context).apply(void 0, __spreadArray([element], args));
            };
        };
    },
    custom: {
        create: function (element, id, sizeFn, fillStyleFn) {
            return element.append("use")
                .attr("xlink:href", "#" + id)
                .attr("class", this.updatePointClass.bind(this))
                .style("fill", fillStyleFn)
                .node();
        },
        update: function (element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
            var _a = element.node().getBBox(), width = _a.width, height = _a.height;
            var xPosFn2 = function (d) { return xPosFn(d) - width / 2; };
            var yPosFn2 = function (d) { return yPosFn(d) - height / 2; };
            var mainCircles = element;
            if (withTransition) {
                var transitionName = getTransitionName();
                flow && mainCircles.attr("x", xPosFn2);
                mainCircles = mainCircles.transition(transitionName);
                selectedCircles && selectedCircles.transition(getTransitionName());
            }
            return mainCircles
                .attr("x", xPosFn2)
                .attr("y", yPosFn2)
                .style("fill", fillStyleFn);
        }
    },
    // 'circle' data point
    circle: {
        create: function (element, sizeFn, fillStyleFn) {
            return element.append("circle")
                .attr("class", this.updatePointClass.bind(this))
                .attr("r", sizeFn)
                .style("fill", fillStyleFn)
                .node();
        },
        update: function (element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
            var $$ = this;
            var mainCircles = element;
            // when '.load()' called, bubble size should be updated
            if ($$.hasType("bubble")) {
                mainCircles.attr("r", $$.pointR.bind($$));
            }
            if (withTransition) {
                var transitionName = getTransitionName();
                flow && mainCircles.attr("cx", xPosFn);
                if (mainCircles.attr("cx")) {
                    mainCircles = mainCircles.transition(transitionName);
                }
                selectedCircles && selectedCircles.transition(getTransitionName());
            }
            return mainCircles
                .attr("cx", xPosFn)
                .attr("cy", yPosFn)
                .style("fill", fillStyleFn);
        }
    },
    // 'rectangle' data point
    rectangle: {
        create: function (element, sizeFn, fillStyleFn) {
            var rectSizeFn = function (d) { return sizeFn(d) * 2.0; };
            return element.append("rect")
                .attr("class", this.updatePointClass.bind(this))
                .attr("width", rectSizeFn)
                .attr("height", rectSizeFn)
                .style("fill", fillStyleFn)
                .node();
        },
        update: function (element, xPosFn, yPosFn, fillStyleFn, withTransition, flow, selectedCircles) {
            var $$ = this;
            var r = $$.config.point_r;
            var rectXPosFn = function (d) { return xPosFn(d) - r; };
            var rectYPosFn = function (d) { return yPosFn(d) - r; };
            var mainCircles = element;
            if (withTransition) {
                var transitionName = getTransitionName();
                flow && mainCircles.attr("x", rectXPosFn);
                mainCircles = mainCircles.transition(transitionName);
                selectedCircles && selectedCircles.transition(getTransitionName());
            }
            return mainCircles
                .attr("x", rectXPosFn)
                .attr("y", rectYPosFn)
                .style("fill", fillStyleFn);
        }
    }
};

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
    var index = isClockwise && pos > 0 ? edge - pos : pos;
    var r = 2 * Math.PI;
    var func = type === "x" ? Math.sin : Math.cos;
    return range * (1 - ratio * func(index * r / edge));
}
// cache key
var cacheKey = KEY.radarPoints;
var shapeRadar = {
    initRadar: function () {
        var $$ = this;
        var config = $$.config, current = $$.state.current, $el = $$.$el;
        if ($$.hasType("radar")) {
            $el.radar = $el.main.select("." + CLASS.chart).append("g")
                .attr("class", CLASS.chartRadars);
            // level
            $el.radar.levels = $el.radar.append("g")
                .attr("class", CLASS.levels);
            // axis
            $el.radar.axes = $el.radar.append("g")
                .attr("class", CLASS.axis);
            // shapes
            $el.radar.shapes = $el.radar.append("g")
                .attr("class", CLASS.shapes);
            current.dataMax = config.radar_axis_max || $$.getMinMaxData().max[0].value;
        }
    },
    getRadarSize: function () {
        var $$ = this;
        var config = $$.config, _a = $$.state, arcWidth = _a.arcWidth, arcHeight = _a.arcHeight;
        var padding = config.axis_x_categories.length < 4 ? -20 : 10;
        var size = (Math.min(arcWidth, arcHeight) - padding) / 2;
        return [size, size];
    },
    updateTargetsForRadar: function (targets) {
        var $$ = this;
        var config = $$.config;
        if (isEmpty(config.axis_x_categories)) {
            config.axis_x_categories = getRange(0, getMinMax$1("max", targets.map(function (v) { return v.values.length; })));
        }
        $$.generateRadarPoints();
    },
    getRadarPosition: function (type, index, range, ratio) {
        var $$ = this;
        var config = $$.config;
        var _a = $$.getRadarSize(), width = _a[0], height = _a[1];
        var edge = config.axis_x_categories.length;
        var isClockwise = config.radar_direction_clockwise;
        var pos = toArray(type).map(function (v) { return getPosition(isClockwise, v, edge, index, isDefined(range) ? range : (type === "x" ? width : height), isNumber(ratio) ? ratio : config.radar_size_ratio); });
        return pos.length === 1 ? pos[0] : pos;
    },
    /**
     * Generate data points
     * @private
     */
    generateRadarPoints: function () {
        var $$ = this;
        var targets = $$.data.targets;
        var _a = $$.getRadarSize(), width = _a[0], height = _a[1];
        var points = $$.cache.get(cacheKey) || {};
        var size = points._size;
        // recalculate position only when the previous dimension has been changed
        if (!size || (size.width !== width && size.height !== height)) {
            targets.forEach(function (d) {
                points[d.id] = d.values.map(function (v, i) { return ($$.getRadarPosition(["x", "y"], i, undefined, $$.getRatio("radar", v))); });
            });
            points._size = { width: width, height: height };
            $$.cache.add(cacheKey, points);
        }
    },
    redrawRadar: function (durationForExit) {
        var $$ = this;
        var _a = $$.$el, radar = _a.radar, main = _a.main;
        var translate = $$.getTranslate("radar");
        // Adjust radar, circles and texts' position
        if (translate) {
            radar.attr("transform", translate);
            main.select("." + CLASS.chartTexts).attr("transform", translate);
            $$.generateRadarPoints();
            $$.updateRadarLevel();
            $$.updateRadarAxes();
            $$.updateRadarShape(durationForExit);
        }
    },
    generateGetRadarPoints: function () {
        var points = this.cache.get(cacheKey);
        return function (d, i) {
            var point = points[d.id][i];
            return [
                point,
                point,
                point,
                point
            ];
        };
    },
    updateRadarLevel: function () {
        var $$ = this;
        var config = $$.config, state = $$.state, radar = $$.$el.radar;
        var _a = $$.getRadarSize(), width = _a[0], height = _a[1];
        var depth = config.radar_level_depth;
        var edge = config.axis_x_categories.length;
        var showText = config.radar_level_text_show;
        var radarLevels = radar.levels;
        var levelData = getRange(0, depth);
        var radius = config.radar_size_ratio * Math.min(width, height);
        var levelRatio = levelData.map(function (l) { return radius * ((l + 1) / depth); });
        var levelTextFormat = (config.radar_level_text_format || function () { }).bind($$.api);
        // Generate points
        var points = levelData.map(function (v) {
            var range = levelRatio[v];
            var pos = getRange(0, edge).map(function (i) { return ($$.getRadarPosition(["x", "y"], i, range, 1)).join(","); });
            return pos.join(" ");
        });
        var level = radarLevels
            .selectAll("." + CLASS.level)
            .data(levelData);
        level.exit().remove();
        var levelEnter = level.enter().append("g")
            .attr("class", function (d, i) { return CLASS.level + " " + CLASS.level + "-" + i; });
        levelEnter.append("polygon")
            .style("visibility", config.radar_level_show ? null : "hidden");
        if (showText) {
            if (radarLevels.select("text").empty()) {
                radarLevels
                    .append("text")
                    .attr("dx", "-.5em")
                    .attr("dy", "-.7em")
                    .style("text-anchor", "end")
                    .text(function () { return levelTextFormat(0); });
            }
            levelEnter.append("text")
                .attr("dx", "-.5em")
                .style("text-anchor", "end")
                .text(function (d) { return levelTextFormat(state.current.dataMax / levelData.length * (d + 1)); });
        }
        levelEnter
            .merge(level)
            .attr("transform", function (d) { return "translate(" + (width - levelRatio[d]) + ", " + (height - levelRatio[d]) + ")"; })
            .selectAll("polygon")
            .attr("points", function (d) { return points[d]; });
        // update level text position
        if (showText) {
            radarLevels.selectAll("text")
                .attr("x", function (d) { return (isUndefined(d) ? width : points[d].split(",")[0]); })
                .attr("y", function (d) { return (isUndefined(d) ? height : 0); });
        }
    },
    updateRadarAxes: function () {
        var $$ = this;
        var config = $$.config, radar = $$.$el.radar;
        var _a = $$.getRadarSize(), width = _a[0], height = _a[1];
        var categories = config.axis_x_categories;
        var axis = radar.axes.selectAll("g")
            .data(categories);
        axis.exit().remove();
        var axisEnter = axis.enter().append("g")
            .attr("class", function (d, i) { return CLASS.axis + "-" + i; });
        config.radar_axis_line_show && axisEnter.append("line");
        config.radar_axis_text_show && axisEnter.append("text");
        axis = axisEnter.merge(axis);
        // axis line
        if (config.radar_axis_line_show) {
            axis.select("line")
                .attr("x1", width)
                .attr("y1", height)
                .attr("x2", function (d, i) { return $$.getRadarPosition("x", i); })
                .attr("y2", function (d, i) { return $$.getRadarPosition("y", i); });
        }
        // axis text
        if (config.radar_axis_text_show) {
            var _b = config.radar_axis_text_position, _c = _b.x, x_1 = _c === void 0 ? 0 : _c, _d = _b.y, y_1 = _d === void 0 ? 0 : _d;
            axis.select("text")
                .style("text-anchor", "middle")
                .attr("dy", ".5em")
                .call(function (selection) {
                selection.each(function (d) {
                    setTextValue(select(this), String(d), [-0.6, 1.2]);
                });
            })
                .datum(function (d, i) { return ({ index: i }); })
                .attr("transform", function (d) {
                if (isUndefined(this.width)) {
                    // cache evaluated axis text width
                    this.width = this.getBoundingClientRect().width / 2;
                }
                var posX = $$.getRadarPosition("x", d.index, undefined, 1);
                var posY = Math.round($$.getRadarPosition("y", d.index, undefined, 1));
                if (posX > width) {
                    posX += this.width + x_1;
                }
                else if (Math.round(posX) < width) {
                    posX -= this.width + x_1;
                }
                if (posY > height) {
                    // update vertical centered edge axis text dy position
                    if (posY / 2 === height && this.firstChild.tagName === "tspan") {
                        this.firstChild.setAttribute("dy", "0em");
                    }
                    posY += y_1;
                }
                else if (posY < height) {
                    posY -= y_1;
                }
                return "translate(" + posX + " " + posY + ")";
            });
        }
        $$.bindEvent();
    },
    bindEvent: function () {
        var $$ = this;
        var config = $$.config, state = $$.state, _a = $$.$el, radar = _a.radar, svg = _a.svg;
        var focusOnly = config.point_focus_only;
        var inputType = state.inputType, transiting = state.transiting;
        if (config.interaction_enabled) {
            var isMouse_1 = inputType === "mouse";
            var getIndex_1 = function (event) {
                var target = event.target;
                // in case of multilined axis text
                if (/tspan/i.test(target.tagName)) {
                    target = target.parentNode;
                }
                var d = select(target).datum();
                return d && Object.keys(d).length === 1 ? d.index : undefined;
            };
            var hide = function (event) {
                var index = getIndex_1(event);
                var noIndex = isUndefined(index);
                if (isMouse_1 || noIndex) {
                    $$.hideTooltip();
                    focusOnly ?
                        $$.hideCircleFocus() :
                        $$.unexpandCircles();
                    if (isMouse_1) {
                        $$.setOverOut(false, index);
                    }
                    else if (noIndex) {
                        $$.callOverOutForTouch();
                    }
                }
            };
            radar.axes.selectAll("text")
                .on(isMouse_1 ? "mouseover " : "touchstart", function (event) {
                if (transiting) { // skip while transiting
                    return;
                }
                state.event = event;
                var index = getIndex_1(event);
                $$.selectRectForSingle(svg.node(), null, index);
                isMouse_1 ? $$.setOverOut(true, index) : $$.callOverOutForTouch(index);
            })
                .on("mouseout", isMouse_1 ? hide : null);
            if (!isMouse_1) {
                svg.on("touchstart", hide);
            }
        }
    },
    updateRadarShape: function (durationForExit) {
        var $$ = this;
        var targets = $$.data.targets.filter(function (d) { return $$.isRadarType(d); });
        var points = $$.cache.get(cacheKey);
        var areas = $$.$el.radar.shapes
            .selectAll("polygon")
            .data(targets);
        var areasEnter = areas.enter().append("g")
            .attr("class", $$.getChartClass("Radar"));
        areas.exit().transition()
            .duration(durationForExit)
            .remove();
        areasEnter
            .append("polygon")
            .merge(areas)
            .style("fill", $$.color)
            .style("stroke", $$.color)
            .attr("points", function (d) { return points[d.id].join(" "); });
        $$.updateTargetForCircle(targets, areasEnter);
    },
    /**
     * Get data point x coordinate
     * @param {object} d Data object
     * @returns {number}
     * @private
     */
    radarCircleX: function (d) {
        return this.cache.get(cacheKey)[d.id][d.index][0];
    },
    /**
     * Get data point y coordinate
     * @param {object} d Data object
     * @returns {number}
     * @private
     */
    radarCircleY: function (d) {
        return this.cache.get(cacheKey)[d.id][d.index][1];
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * point config options
 */
var optPoint = {
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
    point_show: true,
    point_r: 2.5,
    point_sensitivity: 10,
    point_focus_expand_enabled: true,
    point_focus_expand_r: undefined,
    point_focus_only: false,
    point_opacity: undefined,
    point_pattern: [],
    point_select_r: undefined,
    point_type: "circle"
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * area config options
 */
var optArea = {
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
    area_above: false,
    area_front: true,
    area_linearGradient: false,
    area_zerobased: true
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * bar config options
 */
var optBar = {
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
    bar_width_ratio: 0.6,
    bar_width_max: undefined,
    bar_zerobased: true
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * bubble config options
 */
var optBubble = {
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
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * candlestick config options
 */
var optCandlestick = {
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
    candlestick_width_ratio: 0.6,
    candlestick_width_max: undefined,
    candlestick_color_down: "red"
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * line config options
 */
var optLine = {
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
    line_connectNull: false,
    line_step_type: "step",
    line_zerobased: false,
    line_classes: undefined,
    line_point: true
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * scatter config options
 */
var optScatter = {
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
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * x Axis config options
 */
var optSpline = {
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
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * donut config options
 */
var optDonut = {
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
    donut_label_show: true,
    donut_label_format: undefined,
    donut_label_threshold: 0.05,
    donut_label_ratio: undefined,
    donut_width: undefined,
    donut_title: "",
    donut_expand: {},
    donut_expand_rate: 0.98,
    donut_expand_duration: 50,
    donut_padAngle: 0,
    donut_startingAngle: 0
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * gauge config options
 */
var optGauge = {
    /**
     * Set gauge options
     * @name gauge
     * @memberof Options
     * @type {object}
     * @property {object} gauge Gauge object
     * @property {boolean} [gauge.background=""] Set background color. (The `.bb-chart-arcs-background` element)
     * @property {boolean} [gauge.fullCircle=false] Show full circle as donut. When set to 'true', the max label will not be showed due to start and end points are same location.
     * @property {boolean} [gauge.label.show=true] Show or hide label on gauge.
     * @property {Function} [gauge.label.format] Set formatter for the label on gauge. Label text can be multilined with `\n` character.
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
     *          format: function(value, ratio) {
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
    gauge_fullCircle: false,
    gauge_label_show: true,
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
    gauge_expand_rate: 0.98,
    gauge_expand_duration: 50
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * x Axis config options
 */
var optPie = {
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
    pie_label_show: true,
    pie_label_format: undefined,
    pie_label_threshold: 0.05,
    pie_label_ratio: undefined,
    pie_expand: {},
    pie_expand_rate: 0.98,
    pie_expand_duration: 50,
    pie_innerRadius: 0,
    pie_outerRadius: undefined,
    pie_padAngle: 0,
    pie_padding: 0,
    pie_startingAngle: 0
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * x Axis config options
 */
var optRadar = {
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
    radar_axis_line_show: true,
    radar_axis_text_show: true,
    radar_axis_text_position: {},
    radar_level_depth: 3,
    radar_level_show: true,
    radar_level_text_format: function (x) { return (x % 1 === 0 ? x : x.toFixed(2)); },
    radar_level_text_show: true,
    radar_size_ratio: 0.87,
    radar_direction_clockwise: false
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Extend Axis
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendAxis(module, option) {
    extend(ChartInternal.prototype, internal.concat(module));
    extend(Chart.prototype, api);
    Options.setOptions(options.concat(option || []));
}
/**
 * Extend Line type modules
 * @param {object} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendLine(module, option) {
    extendAxis([shapePoint, shapeLine].concat(module || []));
    Options.setOptions([optPoint, optLine].concat(option || []));
}
/**
 * Extend Arc type modules
 * @param {Array} module Module to be extended
 * @param {Array} option Option object to be extended
 * @private
 */
function extendArc(module, option) {
    extend(ChartInternal.prototype, [shapeArc].concat(module || []));
    Options.setOptions(option);
}
// Area types
var area = function () { return (extendLine(shapeArea, [optArea]), (area = function () { return TYPE.AREA; })()); };
var areaLineRange = function () { return (extendLine(shapeArea, [optArea]), (areaLineRange = function () { return TYPE.AREA_LINE_RANGE; })()); };
var areaSpline = function () { return (extendLine(shapeArea, [optArea, optSpline]), (areaSpline = function () { return TYPE.AREA_SPLINE; })()); };
var areaSplineRange = function () { return (extendLine(shapeArea, [optArea, optSpline]), (areaSplineRange = function () { return TYPE.AREA_SPLINE_RANGE; })()); };
var areaStep = function () { return (extendLine(shapeArea, [optArea]), (areaStep = function () { return TYPE.AREA_STEP; })()); };
// Line types
var line = function () { return (extendLine(), (line = function () { return TYPE.LINE; })()); };
var spline = function () { return (extendLine(undefined, [optSpline]), (spline = function () { return TYPE.SPLINE; })()); };
var step = function () { return (extendLine(), (step = function () { return TYPE.STEP; })()); };
// Arc types
var donut = function () { return (extendArc(undefined, [optDonut]), (donut = function () { return TYPE.DONUT; })()); };
var gauge = function () { return (extendArc([shapeGauge], [optGauge]), (gauge = function () { return TYPE.GAUGE; })()); };
var pie = function () { return (extendArc(undefined, [optPie]), (pie = function () { return TYPE.PIE; })()); };
var radar = function () { return (extendArc([shapePoint, shapeRadar], [optPoint, optRadar]), (radar = function () { return TYPE.RADAR; })()); };
// Axis based types
var bar = function () { return (extendAxis([shapeBar], optBar), (bar = function () { return TYPE.BAR; })()); };
var bubble = function () { return (extendAxis([shapePoint, shapeBubble], [optBubble, optPoint]), (bubble = function () { return TYPE.BUBBLE; })()); };
var candlestick = function () { return (extendAxis([shapeCandlestick], [optCandlestick]), (candlestick = function () { return TYPE.CANDLESTICK; })()); };
var scatter = function () { return (extendAxis([shapePoint], [optPoint, optScatter]), (scatter = function () { return TYPE.SCATTER; })()); };

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiSelection = {
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
    selected: function (targetId) {
        var $$ = this.internal;
        var dataPoint = [];
        $$.$el.main.selectAll("." + (CLASS.shapes + $$.getTargetSelectorSuffix(targetId)))
            .selectAll("." + CLASS.shape)
            .filter(function () {
            return select(this).classed(CLASS.SELECTED);
        })
            .each(function (d) { return dataPoint.push(d); });
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
    select: function (ids, indices, resetOther) {
        var $$ = this.internal;
        var config = $$.config, $el = $$.$el;
        if (!config.data_selection_enabled) {
            return;
        }
        $el.main.selectAll("." + CLASS.shapes)
            .selectAll("." + CLASS.shape)
            .each(function (d, i) {
            var shape = select(this);
            var id = d.data ? d.data.id : d.id;
            var toggle = $$.getToggle(this, d).bind($$);
            var isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0;
            var isTargetIndex = !indices || indices.indexOf(i) >= 0;
            var isSelected = shape.classed(CLASS.SELECTED);
            // line/area selection not supported yet
            if (shape.classed(CLASS.line) || shape.classed(CLASS.area)) {
                return;
            }
            if (isTargetId && isTargetIndex) {
                if (config.data_selection_isselectable.bind($$.api)(d) && !isSelected) {
                    toggle(true, shape.classed(CLASS.SELECTED, true), d, i);
                }
            }
            else if (isDefined(resetOther) && resetOther && isSelected) {
                toggle(false, shape.classed(CLASS.SELECTED, false), d, i);
            }
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
    unselect: function (ids, indices) {
        var $$ = this.internal;
        var config = $$.config, $el = $$.$el;
        if (!config.data_selection_enabled) {
            return;
        }
        $el.main.selectAll("." + CLASS.shapes)
            .selectAll("." + CLASS.shape)
            .each(function (d, i) {
            var shape = select(this);
            var id = d.data ? d.data.id : d.id;
            var toggle = $$.getToggle(this, d).bind($$);
            var isTargetId = config.data_selection_grouped || !ids || ids.indexOf(id) >= 0;
            var isTargetIndex = !indices || indices.indexOf(i) >= 0;
            var isSelected = shape.classed(CLASS.SELECTED);
            // line/area selection not supported yet
            if (shape.classed(CLASS.line) || shape.classed(CLASS.area)) {
                return;
            }
            if (isTargetId &&
                isTargetIndex &&
                config.data_selection_isselectable.bind($$.api)(d) &&
                isSelected) {
                toggle(false, shape.classed(CLASS.SELECTED, false), d, i);
            }
        });
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var apiSubchart = {
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
            var $$ = this.internal;
            var subchart = $$.$el.subchart, config = $$.config;
            var show = config.subchart_show;
            if (!show) {
                config.subchart_show = !show;
                !subchart.main && $$.initSubchart();
                var $target = subchart.main.selectAll("." + CLASS.target);
                // need to cover when new data has been loaded
                if ($$.data.targets.length !== $target.size()) {
                    $$.updateSizes();
                    $$.updateTargetsForSubchart($$.data.targets);
                    $target = subchart.main.selectAll("." + CLASS.target);
                }
                $target.style("opacity", "1");
                subchart.main.style("display", null);
                this.flush();
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
        hide: function () {
            var $$ = this.internal;
            var subchart = $$.$el.subchart, config = $$.config;
            if (config.subchart_show && subchart.main.style("display") !== "none") {
                config.subchart_show = false;
                subchart.main.style("display", "none");
                this.flush();
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
        toggle: function () {
            var $$ = this.internal;
            var config = $$.config;
            this.subchart[config.subchart_show ? "hide" : "show"]();
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Check if the given domain is within zoom range
 * @param {Array} domain domain value
 * @param {Array} range zoom range value
 * @returns {boolean}
 * @private
 */
function withinRange(domain, range) {
    var min = range[0], max = range[1];
    return domain.every(function (v, i) { return (i === 0 ? (v >= min) : (v <= max)); });
}
/**
 * Zoom by giving x domain.
 * - **NOTE:**
 *  - For `wheel` type zoom, the minimum zoom range will be set as the given domain. To get the initial state, [.unzoom()](#unzoom) should be called.
 *  - To be used [zoom.enabled](Options.html#.zoom) option should be set as `truthy`.
 * @function zoom
 * @instance
 * @memberof Chart
 * @param {Array} domainValue If domain is given, the chart will be zoomed to the given domain. If no argument is given, the current zoomed domain will be returned.
 * @returns {Array} domain value in array
 * @example
 *  // Zoom to specified domain
 *  chart.zoom([10, 20]);
 *
 *  // Get the current zoomed domain
 *  chart.zoom();
 */
var zoom$1 = function (domainValue) {
    var $$ = this.internal;
    var config = $$.config, scale = $$.scale;
    var domain = domainValue;
    var resultDomain;
    if (config.zoom_enabled && domain) {
        if ($$.axis.isTimeSeries()) {
            domain = domain.map(function (x) { return parseDate.bind($$)(x); });
        }
        if (withinRange(domain, $$.getZoomDomain())) {
            // hide any possible tooltip show before the zoom
            $$.api.tooltip.hide();
            if (config.subchart_show) {
                var xScale = scale.zoom || scale.x;
                $$.brush.getSelection().call($$.brush.move, [xScale(domain[0]), xScale(domain[1])]);
                resultDomain = domain;
            }
            else {
                scale.x.domain(domain);
                scale.zoom = scale.x;
                $$.axis.x.scale(scale.zoom);
                resultDomain = scale.zoom.orgDomain();
            }
            $$.redraw({
                withTransition: true,
                withY: config.zoom_rescale,
                withDimension: false
            });
            $$.setZoomResetButton();
            callFn(config.zoom_onzoom, $$.api, resultDomain);
        }
    }
    else {
        resultDomain = scale.zoom ?
            scale.zoom.domain() : scale.x.orgDomain();
    }
    return resultDomain;
};
extend(zoom$1, {
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
    enable: function (enabled) {
        var $$ = this.internal;
        var config = $$.config;
        if (/^(drag|wheel)$/.test(enabled)) {
            config.zoom_type = enabled;
        }
        config.zoom_enabled = !!enabled;
        if (!$$.zoom) {
            $$.initZoom();
            $$.bindZoomEvent();
        }
        else if (enabled === false) {
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
    max: function (max) {
        var $$ = this.internal;
        var config = $$.config, xDomain = $$.org.xDomain;
        if (max === 0 || max) {
            config.zoom_x_max = getMinMax$1("max", [xDomain[1], max]);
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
    min: function (min) {
        var $$ = this.internal;
        var config = $$.config, xDomain = $$.org.xDomain;
        if (min === 0 || min) {
            config.zoom_x_min = getMinMax$1("min", [xDomain[0], min]);
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
    range: function (range) {
        var zoom = this.zoom;
        if (isObject(range)) {
            var min = range.min, max = range.max;
            isDefined(min) && zoom.min(min);
            isDefined(max) && zoom.max(max);
        }
        return {
            min: zoom.min(),
            max: zoom.max()
        };
    }
});
var apiZoom = {
    zoom: zoom$1,
    /**
     * Unzoom zoomed area
     * @function unzoom
     * @instance
     * @memberof Chart
     * @example
     *  chart.unzoom();
     */
    unzoom: function () {
        var $$ = this.internal;
        var config = $$.config;
        if ($$.scale.zoom) {
            config.subchart_show ?
                $$.brush.getSelection().call($$.brush.move, null) :
                $$.zoom.updateTransformScale(zoomIdentity);
            $$.updateZoom(true);
            $$.zoom.resetBtn && $$.zoom.resetBtn.style("display", "none");
            // reset transform
            var eventRects = $$.$el.main.select("." + CLASS.eventRects);
            if (zoomTransform(eventRects.node()) !== zoomIdentity) {
                $$.zoom.transform(eventRects, zoomIdentity);
            }
            $$.redraw({
                withTransition: true,
                withUpdateXDomain: true,
                withUpdateOrgXDomain: true,
                withY: config.zoom_rescale
            });
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Module used for data.selection.draggable option
 */
var drag = {
    /**
     * Called when dragging.
     * Data points can be selected.
     * @private
     * @param {object} mouse Object
     */
    drag: function (mouse) {
        var $$ = this;
        var config = $$.config, state = $$.state, main = $$.$el.main;
        var isSelectionGrouped = config.data_selection_grouped;
        var isSelectable = config.interaction_enabled && config.data_selection_isselectable;
        if ($$.hasArcType() ||
            !config.data_selection_enabled || // do nothing if not selectable
            (config.zoom_enabled && !$$.zoom.altDomain) || // skip if zoomable because of conflict drag behavior
            !config.data_selection_multiple // skip when single selection because drag is used for multiple selection
        ) {
            return;
        }
        var _a = state.dragStart || [0, 0], sx = _a[0], sy = _a[1];
        var mx = mouse[0], my = mouse[1];
        var minX = Math.min(sx, mx);
        var maxX = Math.max(sx, mx);
        var minY = isSelectionGrouped ? state.margin.top : Math.min(sy, my);
        var maxY = isSelectionGrouped ? state.height : Math.max(sy, my);
        main.select("." + CLASS.dragarea)
            .attr("x", minX)
            .attr("y", minY)
            .attr("width", maxX - minX)
            .attr("height", maxY - minY);
        // TODO: binary search when multiple xs
        main.selectAll("." + CLASS.shapes)
            .selectAll("." + CLASS.shape)
            .filter(function (d) { return isSelectable && isSelectable.bind($$.api)(d); })
            .each(function (d, i) {
            var shape = select(this);
            var isSelected = shape.classed(CLASS.SELECTED);
            var isIncluded = shape.classed(CLASS.INCLUDED);
            var isWithin = false;
            var toggle;
            if (shape.classed(CLASS.circle)) {
                var x = +shape.attr("cx") * 1;
                var y = +shape.attr("cy") * 1;
                toggle = $$.togglePoint;
                isWithin = minX < x && x < maxX && minY < y && y < maxY;
            }
            else if (shape.classed(CLASS.bar)) {
                var _a = getPathBox(this), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                toggle = $$.togglePath;
                isWithin = !(maxX < x || x + width < minX) && !(maxY < y || y + height < minY);
            }
            else {
                // line/area selection not supported yet
                return;
            }
            // @ts-ignore
            if (isWithin ^ isIncluded) {
                shape.classed(CLASS.INCLUDED, !isIncluded);
                // TODO: included/unincluded callback here
                shape.classed(CLASS.SELECTED, !isSelected);
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
    dragstart: function (mouse) {
        var $$ = this;
        var config = $$.config, state = $$.state, main = $$.$el.main;
        if ($$.hasArcType() || !config.data_selection_enabled) {
            return;
        }
        state.dragStart = mouse;
        main.select("." + CLASS.chart)
            .append("rect")
            .attr("class", CLASS.dragarea)
            .style("opacity", "0.1");
        $$.setDragStatus(true);
    },
    /**
     * Called when the drag finishes.
     * Removes the drag area.
     * @private
     */
    dragend: function () {
        var $$ = this;
        var config = $$.config, main = $$.$el.main;
        if ($$.hasArcType() || !config.data_selection_enabled) { // do nothing if not selectable
            return;
        }
        main.select("." + CLASS.dragarea)
            .transition()
            .duration(100)
            .style("opacity", "0")
            .remove();
        main.selectAll("." + CLASS.shape)
            .classed(CLASS.INCLUDED, false);
        $$.setDragStatus(false);
    }
};

var selection = _assign(_assign({}, drag), { 
    /**
     * Select a point
     * @param {object} target Target point
     * @param {object} d Data object
     * @param {number} i Index number
     * @private
     */
    selectPoint: function (target, d, i) {
        var $$ = this;
        var config = $$.config, main = $$.$el.main;
        var isRotated = config.axis_rotated;
        var cx = (isRotated ? $$.circleY : $$.circleX).bind($$);
        var cy = (isRotated ? $$.circleX : $$.circleY).bind($$);
        var r = $$.pointSelectR.bind($$);
        callFn(config.data_onselected, $$.api, d, target.node());
        // add selected-circle on low layer g
        main.select("." + CLASS.selectedCircles + $$.getTargetSelectorSuffix(d.id))
            .selectAll("." + CLASS.selectedCircle + "-" + i)
            .data([d])
            .enter()
            .append("circle")
            .attr("class", function () { return $$.generateClass(CLASS.selectedCircle, i); })
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("stroke", $$.color)
            .attr("r", function (d2) { return $$.pointSelectR(d2) * 1.4; })
            .transition()
            .duration(100)
            .attr("r", r);
    },
    /**
     * Unelect a point
     * @param {object} target Target point
     * @param {object} d Data object
     * @param {number} i Index number
     * @private
     */
    unselectPoint: function (target, d, i) {
        var $$ = this;
        var config = $$.config, $el = $$.$el;
        callFn(config.data_onunselected, $$.api, d, target.node());
        // remove selected-circle from low layer g
        $el.main.select("." + CLASS.selectedCircles + $$.getTargetSelectorSuffix(d.id))
            .selectAll("." + CLASS.selectedCircle + "-" + i)
            .transition()
            .duration(100)
            .attr("r", 0)
            .remove();
    },
    /**
     * Toggles the selection of points
     * @param {boolean} selected whether or not to select.
     * @param {object} target Target object
     * @param {object} d Data object
     * @param {number} i Index number
     * @private
     */
    togglePoint: function (selected, target, d, i) {
        var method = (selected ? "" : "un") + "selectPoint";
        this[method](target, d, i);
    },
    /**
     * Select a path
     * @param {object} target Target path
     * @param {object} d Data object
     * @private
     */
    selectPath: function (target, d) {
        var $$ = this;
        var config = $$.config;
        callFn(config.data_onselected, $$.api, d, target.node());
        if (config.interaction_brighten) {
            target.transition().duration(100)
                .style("fill", function () { return rgb($$.color(d)).brighter(0.75); });
        }
    },
    /**
     * Unelect a path
     * @private
     * @param {object} target Target path
     * @param {object} d Data object
     */
    unselectPath: function (target, d) {
        var $$ = this;
        var config = $$.config;
        callFn(config.data_onunselected, $$.api, d, target.node());
        if (config.interaction_brighten) {
            target.transition().duration(100)
                .style("fill", function () { return $$.color(d); });
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
    togglePath: function (selected, target, d, i) {
        this[(selected ? "" : "un") + "selectPath"](target, d, i);
    },
    /**
     * Returns the toggle method of the target
     * @param {object} that shape
     * @param {object} d Data object
     * @returns {Function} toggle method
     * @private
     */
    getToggle: function (that, d) {
        var $$ = this;
        return that.nodeName === "path" ?
            $$.togglePath : ($$.isStepType(d) ?
            function () { } : // circle is hidden in step chart, so treat as within the click area
            $$.togglePoint);
    },
    /**
     * Toggles the selection of shapes
     * @param {object} that shape
     * @param {object} d Data object
     * @param {number} i Index number
     * @private
     */
    toggleShape: function (that, d, i) {
        var $$ = this;
        var config = $$.config, main = $$.$el.main;
        var shape = select(that);
        var isSelected = shape.classed(CLASS.SELECTED);
        var toggle = $$.getToggle(that, d).bind($$);
        var toggledShape;
        if (config.data_selection_enabled && config.data_selection_isselectable.bind($$.api)(d)) {
            if (!config.data_selection_multiple) {
                var selector = "." + CLASS.shapes;
                if (config.data_selection_grouped) {
                    selector += $$.getTargetSelectorSuffix(d.id);
                }
                main.selectAll(selector)
                    .selectAll("." + CLASS.shape)
                    .each(function (d, i) {
                    var shape = select(this);
                    if (shape.classed(CLASS.SELECTED)) {
                        toggledShape = shape;
                        toggle(false, shape.classed(CLASS.SELECTED, false), d, i);
                    }
                });
            }
            if (!toggledShape || toggledShape.node() !== shape.node()) {
                shape.classed(CLASS.SELECTED, !isSelected);
                toggle(!isSelected, shape, d, i);
            }
        }
    } });

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var subchart = {
    /**
     * Initialize the brush.
     * @private
     */
    initBrush: function () {
        var $$ = this;
        var config = $$.config, scale = $$.scale, subchart = $$.$el.subchart;
        var isRotated = config.axis_rotated;
        // set the brush
        $$.brush = isRotated ? brushY() : brushX();
        // set "brush" event
        var brushHandler = function () {
            $$.redrawForBrush();
        };
        var getBrushSize = function () {
            var brush = $$.$el.svg.select("." + CLASS.brush + " .overlay");
            var brushSize = { width: 0, height: 0 };
            if (brush.size()) {
                brushSize.width = +brush.attr("width");
                brushSize.height = +brush.attr("height");
            }
            return brushSize[isRotated ? "width" : "height"];
        };
        var lastDomain;
        var timeout;
        $$.brush
            .on("start", function () {
            $$.state.inputType === "touch" && $$.hideTooltip();
            brushHandler();
        })
            .on("brush", brushHandler)
            .on("end", function () {
            lastDomain = scale.x.orgDomain();
        });
        $$.brush.updateResize = function () {
            var _this = this;
            timeout && clearTimeout(timeout);
            timeout = setTimeout(function () {
                var selection = _this.getSelection();
                lastDomain && brushSelection(selection.node()) &&
                    _this.move(selection, lastDomain.map(scale.subX.orgScale()));
            }, 0);
        };
        $$.brush.update = function () {
            var extent = this.extent()();
            if (extent[1].filter(function (v) { return isNaN(v); }).length === 0) {
                subchart.main && subchart.main.select("." + CLASS.brush).call(this);
            }
            return this;
        };
        // set the brush extent
        $$.brush.scale = function (scale) {
            var h = config.subchart_size_height || getBrushSize();
            var extent = $$.getExtent();
            if (!extent && scale.range) {
                extent = [[0, 0], [scale.range()[1], h]];
            }
            else if (isArray(extent)) {
                extent = extent.map(function (v, i) { return [v, i > 0 ? h : i]; });
            }
            // [[x0, y0], [x1, y1]], where [x0, y0] is the top-left corner and [x1, y1] is the bottom-right corner
            isRotated && extent[1].reverse();
            this.extent(extent);
            // when extent updates, brush selection also be re-applied
            // https://github.com/d3/d3/issues/2918
            this.update();
        };
        $$.brush.getSelection = function () { return (
        // @ts-ignore
        subchart.main ? subchart.main.select("." + CLASS.brush) : select([])); };
    },
    /**
     * Initialize the subchart.
     * @private
     */
    initSubchart: function () {
        var $$ = this;
        var config = $$.config, _a = $$.state, clip = _a.clip, hasAxis = _a.hasAxis, _b = $$.$el, defs = _b.defs, svg = _b.svg, subchart = _b.subchart, axis = _b.axis;
        if (!hasAxis) {
            return;
        }
        var visibility = config.subchart_show ? "visible" : "hidden";
        var clipId = clip.id + "-subchart";
        var clipPath = $$.getClipPath(clipId);
        clip.idSubchart = clipId;
        $$.appendClip(defs, clipId);
        $$.initBrush();
        subchart.main = svg.append("g")
            .classed(CLASS.subchart, true)
            .attr("transform", $$.getTranslate("context"));
        var main = subchart.main;
        main.style("visibility", visibility);
        // Define g for chart area
        main.append("g")
            .attr("clip-path", clipPath)
            .attr("class", CLASS.chart);
        // Define g for chart types area
        ["bar", "line", "bubble", "candlestick", "scatter"].forEach(function (v) {
            var type = capitalize(/^(bubble|scatter)$/.test(v) ? "circle" : v);
            if ($$.hasType(v) || $$.hasTypeOf(type)) {
                var chart = main.select("." + CLASS.chart);
                var chartClassName = CLASS["chart" + type + "s"];
                if (chart.select("." + chartClassName).empty()) {
                    chart
                        .append("g")
                        .attr("class", chartClassName);
                }
            }
        });
        // Add extent rect for Brush
        main.append("g")
            .attr("clip-path", clipPath)
            .attr("class", CLASS.brush)
            .call($$.brush);
        // ATTENTION: This must be called AFTER chart added
        // Add Axis
        axis.subX = main.append("g")
            .attr("class", CLASS.axisX)
            .attr("transform", $$.getTranslate("subX"))
            .attr("clip-path", config.axis_rotated ? "" : clip.pathXAxis)
            .style("visibility", config.subchart_axis_x_show ? visibility : "hidden");
    },
    /**
     * Update sub chart
     * @param {object} targets $$.data.targets
     * @private
     */
    updateTargetsForSubchart: function (targets) {
        var $$ = this;
        var config = $$.config, state = $$.state, main = $$.$el.subchart.main;
        if (config.subchart_show) {
            ["bar", "line", "bubble", "candlestick", "scatter"]
                .filter(function (v) { return $$.hasType(v) || $$.hasTypeOf(capitalize(v)); })
                .forEach(function (v) {
                var isPointType = /^(bubble|scatter)$/.test(v);
                var name = capitalize(isPointType ? "circle" : v);
                var chartClass = $$.getChartClass(name, true);
                var shapeClass = $$.getClass(isPointType ? "circles" : v + "s", true);
                var shapeChart = main.select("." + CLASS["chart" + (name + "s")]);
                if (isPointType) {
                    var circle = shapeChart
                        .selectAll("." + CLASS.circles)
                        .data(targets.filter($$["is" + capitalize(v) + "Type"].bind($$)))
                        .attr("class", shapeClass);
                    circle.exit().remove();
                    circle.enter().append("g")
                        .attr("class", shapeClass);
                }
                else {
                    var shapeUpdate = shapeChart
                        .selectAll("." + CLASS["chart" + name])
                        .attr("class", chartClass)
                        .data(targets.filter($$["is" + name + "Type"].bind($$)));
                    var shapeEnter = shapeUpdate.enter()
                        .append("g")
                        .style("opacity", "0")
                        .attr("class", chartClass)
                        .append("g")
                        .attr("class", shapeClass);
                    shapeUpdate.exit().remove();
                    // Area
                    v === "line" && $$.hasTypeOf("Area") &&
                        shapeEnter.append("g").attr("class", $$.getClass("areas", true));
                }
            });
            // -- Brush --//
            main.selectAll("." + CLASS.brush + " rect")
                .attr(config.axis_rotated ? "width" : "height", config.axis_rotated ? state.width2 : state.height2);
        }
    },
    /**
     * Redraw subchart.
     * @private
     * @param {boolean} withSubchart whether or not to show subchart
     * @param {number} duration duration
     * @param {object} shape Shape's info
     */
    redrawSubchart: function (withSubchart, duration, shape) {
        var $$ = this;
        var config = $$.config, main = $$.$el.subchart.main, state = $$.state;
        var withTransition = !!duration;
        main.style("visibility", config.subchart_show ? "visible" : "hidden");
        // subchart
        if (config.subchart_show) {
            // reflect main chart to extent on subchart if zoomed
            if (state.event && state.event.type === "zoom") {
                $$.brush.update();
            }
            // update subchart elements if needed
            if (withSubchart) {
                // extent rect
                !brushEmpty($$) && $$.brush.update();
                Object.keys(shape.type).forEach(function (v) {
                    var name = capitalize(v);
                    var drawFn = $$["generateDraw" + name](shape.indices[v], true);
                    // call shape's update & redraw method
                    $$["update" + name](duration, true);
                    $$["redraw" + name](drawFn, withTransition, true);
                });
                if ($$.hasType("bubble") || $$.hasType("scatter")) {
                    var cx = shape.pos.cx;
                    var cy = $$.updateCircleY(true);
                    $$.updateCircle(true);
                    $$.redrawCircle(cx, cy, withTransition, undefined, true);
                }
            }
        }
    },
    /**
     * Redraw the brush.
     * @private
     */
    redrawForBrush: function () {
        var $$ = this;
        var _a = $$.config, onBrush = _a.subchart_onbrush, withY = _a.zoom_rescale, scale = $$.scale;
        $$.redraw({
            withTransition: false,
            withY: withY,
            withSubchart: false,
            withUpdateXDomain: true,
            withDimension: false
        });
        onBrush.bind($$.api)(scale.x.orgDomain());
    },
    /**
     * Transform context
     * @param {boolean} withTransition indicates transition is enabled
     * @param {object} transitions The return value of the generateTransitions method of Axis.
     * @private
     */
    transformContext: function (withTransition, transitions) {
        var $$ = this;
        var main = $$.$el.subchart.main;
        var subXAxis;
        if (transitions && transitions.axisSubX) {
            subXAxis = transitions.axisSubX;
        }
        else {
            subXAxis = main.select("." + CLASS.axisX);
            if (withTransition) {
                subXAxis = subXAxis.transition();
            }
        }
        main.attr("transform", $$.getTranslate("context"));
        subXAxis.attr("transform", $$.getTranslate("subX"));
    },
    /**
     * Get extent value
     * @returns {Array} default extent
     * @private
     */
    getExtent: function () {
        var $$ = this;
        var config = $$.config, scale = $$.scale;
        var extent = config.axis_x_extent;
        if (extent) {
            if (isFunction(extent)) {
                extent = extent.bind($$.api)($$.getXDomain($$.data.targets), scale.subX);
            }
            else if ($$.axis.isTimeSeries() && extent.every(isNaN)) {
                var fn_1 = parseDate.bind($$);
                extent = extent.map(function (v) { return scale.subX(fn_1(v)); });
            }
        }
        return extent;
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var zoom = {
    /**
     * Initialize zoom.
     * @private
     */
    initZoom: function () {
        var $$ = this;
        $$.scale.zoom = null;
        $$.generateZoom();
        $$.initZoomBehaviour();
    },
    /**
     * Bind zoom event
     * @param {boolean} bind Weather bind or unbound
     * @private
     */
    bindZoomEvent: function (bind) {
        if (bind === void 0) { bind = true; }
        var $$ = this;
        var config = $$.config, main = $$.$el.main;
        var zoomEnabled = config.zoom_enabled;
        var eventRects = main.select("." + CLASS.eventRects);
        if (zoomEnabled && bind) {
            // Do not bind zoom event when subchart is shown
            !config.subchart_show &&
                $$.bindZoomOnEventRect(eventRects, config.zoom_type);
        }
        else if (bind === false) {
            $$.api.unzoom();
            eventRects
                .on(".zoom", null)
                .on(".drag", null);
        }
    },
    /**
     * Generate zoom
     * @private
     */
    generateZoom: function () {
        var $$ = this;
        var config = $$.config, org = $$.org, scale = $$.scale;
        var zoom = zoom$2().duration(0)
            .on("start", $$.onZoomStart.bind($$))
            .on("zoom", $$.onZoom.bind($$))
            .on("end", $$.onZoomEnd.bind($$));
        // get zoom extent
        // @ts-ignore
        zoom.orgScaleExtent = function () {
            var extent = config.zoom_extent || [1, 10];
            return [extent[0], Math.max($$.getMaxDataCount() / extent[1], extent[1])];
        };
        // @ts-ignore
        zoom.updateScaleExtent = function () {
            var ratio = diffDomain($$.scale.x.orgDomain()) / diffDomain($$.getZoomDomain());
            var extent = this.orgScaleExtent();
            this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);
            return this;
        };
        /**
         * Update scale according zoom transform value
         * @param {object} transform transform object
         * @private
         */
        // @ts-ignore
        zoom.updateTransformScale = function (transform) {
            // in case of resize, update range of orgXScale
            org.xScale && org.xScale.range(scale.x.range());
            // rescale from the original scale
            var newScale = transform[config.axis_rotated ? "rescaleY" : "rescaleX"](org.xScale || scale.x);
            var domain = $$.trimXDomain(newScale.domain());
            var rescale = config.zoom_rescale;
            newScale.domain(domain, org.xDomain);
            scale.zoom = $$.getCustomizedScale(newScale);
            $$.axis.x.scale(scale.zoom);
            if (rescale) {
                // copy current initial x scale in case of rescale option is used
                !org.xScale && (org.xScale = scale.x.copy());
                scale.x.domain(domain);
            }
        };
        $$.zoom = zoom;
    },
    /**
     * 'start' event listener
     * @param {object} event Event object
     * @private
     */
    onZoomStart: function (event) {
        var $$ = this;
        var sourceEvent = event.sourceEvent;
        if (!sourceEvent) {
            return;
        }
        $$.zoom.startEvent = sourceEvent;
        $$.state.zooming = true;
        callFn($$.config.zoom_onzoomstart, $$.api, event);
    },
    /**
     * 'zoom' event listener
     * @param {object} event Event object
     * @private
     */
    onZoom: function (event) {
        var $$ = this;
        var config = $$.config, scale = $$.scale, org = $$.org;
        var sourceEvent = event.sourceEvent;
        if (!config.zoom_enabled ||
            !event.sourceEvent ||
            $$.filterTargetsToShow($$.data.targets).length === 0 ||
            (!scale.zoom && sourceEvent.type.indexOf("touch") > -1 && sourceEvent.touches.length === 1)) {
            return;
        }
        var isMousemove = sourceEvent.type === "mousemove";
        var isZoomOut = sourceEvent.wheelDelta < 0;
        var transform = event.transform;
        if (!isMousemove && isZoomOut && scale.x.domain().every(function (v, i) { return v !== org.xDomain[i]; })) {
            scale.x.domain(org.xDomain);
        }
        $$.zoom.updateTransformScale(transform);
        if ($$.axis.isCategorized() && scale.x.orgDomain()[0] === org.xDomain[0]) {
            scale.x.domain([org.xDomain[0] - 1e-10, scale.x.orgDomain()[1]]);
        }
        $$.redraw({
            withTransition: false,
            withY: config.zoom_rescale,
            withSubchart: false,
            withEventRect: false,
            withDimension: false
        });
        $$.state.cancelClick = isMousemove;
        callFn(config.zoom_onzoom, $$.api, scale.zoom.domain());
    },
    /**
     * 'end' event listener
     * @param {object} event Event object
     * @private
     */
    onZoomEnd: function (event) {
        var $$ = this;
        var config = $$.config, scale = $$.scale;
        var startEvent = $$.zoom.startEvent;
        var e = event && event.sourceEvent;
        if ((startEvent && startEvent.type.indexOf("touch") > -1)) {
            startEvent = startEvent.changedTouches[0];
            e = e.changedTouches[0];
        }
        // if click, do nothing. otherwise, click interaction will be canceled.
        if (!startEvent ||
            (e && startEvent.clientX === e.clientX && startEvent.clientY === e.clientY)) {
            return;
        }
        $$.redrawEventRect();
        $$.updateZoom();
        $$.state.zooming = false;
        callFn(config.zoom_onzoomend, $$.api, scale[scale.zoom ? "zoom" : "subX"].domain());
    },
    /**
     * Get zoom domain
     * @returns {Array} zoom domain
     * @private
     */
    getZoomDomain: function () {
        var $$ = this;
        var config = $$.config, org = $$.org;
        var _a = org.xDomain, min = _a[0], max = _a[1];
        if (isDefined(config.zoom_x_min)) {
            min = getMinMax$1("min", [min, config.zoom_x_min]);
        }
        if (isDefined(config.zoom_x_max)) {
            max = getMinMax$1("max", [max, config.zoom_x_max]);
        }
        return [min, max];
    },
    /**
     * Update zoom
     * @param {boolean} force Force unzoom
     * @private
     */
    updateZoom: function (force) {
        var $$ = this;
        var _a = $$.scale, subX = _a.subX, x = _a.x, zoom = _a.zoom;
        if (zoom) {
            var zoomDomain = zoom.domain();
            var xDomain = subX.domain();
            var delta = 0.015; // arbitrary value
            var isfullyShown = (zoomDomain[0] <= xDomain[0] || (zoomDomain[0] - delta) <= xDomain[0]) &&
                (xDomain[1] <= zoomDomain[1] || xDomain[1] <= (zoomDomain[1] - delta));
            // check if the zoomed chart is fully shown, then reset scale when zoom is out as initial
            if (force || isfullyShown) {
                $$.axis.x.scale(subX);
                x.domain(subX.orgDomain());
                $$.scale.zoom = null;
            }
        }
    },
    /**
     * Attach zoom event on <rect>
     * @param {d3.selection} eventRects evemt <rect> element
     * @param {string} type zoom type
     * @private
     */
    bindZoomOnEventRect: function (eventRects, type) {
        var $$ = this;
        var behaviour = type === "drag" ? $$.zoomBehaviour : $$.zoom;
        // Since Chrome 89, wheel zoom not works properly
        // Applying the workaround: https://github.com/d3/d3-zoom/issues/231#issuecomment-802305692
        $$.$el.svg.on("wheel", function () { });
        eventRects
            .call(behaviour)
            .on("dblclick.zoom", null);
    },
    /**
     * Initialize the drag behaviour used for zooming.
     * @private
     */
    initZoomBehaviour: function () {
        var $$ = this;
        var config = $$.config, state = $$.state;
        var isRotated = config.axis_rotated;
        var start = 0;
        var end = 0;
        var zoomRect;
        var prop = {
            axis: isRotated ? "y" : "x",
            attr: isRotated ? "height" : "width",
            index: isRotated ? 1 : 0
        };
        $$.zoomBehaviour = drag$1()
            .clickDistance(4)
            .on("start", function (event) {
            state.event = event;
            $$.setDragStatus(true);
            $$.unselectRect();
            if (!zoomRect) {
                zoomRect = $$.$el.main.append("rect")
                    .attr("clip-path", state.clip.path)
                    .attr("class", CLASS.zoomBrush)
                    .attr("width", isRotated ? state.width : 0)
                    .attr("height", isRotated ? 0 : state.height);
            }
            start = getPointer(event, this)[prop.index];
            end = start;
            zoomRect
                .attr(prop.axis, start)
                .attr(prop.attr, 0);
            $$.onZoomStart(event);
        })
            .on("drag", function (event) {
            end = getPointer(event, this)[prop.index];
            zoomRect
                .attr(prop.axis, Math.min(start, end))
                .attr(prop.attr, Math.abs(end - start));
        })
            .on("end", function (event) {
            var _a;
            var scale = $$.scale.zoom || $$.scale.x;
            state.event = event;
            $$.setDragStatus(false);
            zoomRect
                .attr(prop.axis, 0)
                .attr(prop.attr, 0);
            if (start > end) {
                _a = [end, start], start = _a[0], end = _a[1];
            }
            if (start < 0) {
                end += Math.abs(start);
                start = 0;
            }
            if (start !== end) {
                $$.api.zoom([start, end].map(function (v) { return scale.invert(v); }));
                $$.onZoomEnd(event);
            }
            else {
                if ($$.isMultipleX()) {
                    $$.clickHandlerForMultipleXS.bind(this)($$);
                }
                else {
                    var _b = getPointer(event), x = _b[0], y = _b[1];
                    var target = doc.elementFromPoint(x, y);
                    $$.clickHandlerForSingleX.bind(target)(select(target).datum(), $$);
                }
            }
        });
    },
    setZoomResetButton: function () {
        var $$ = this;
        var config = $$.config;
        var resetButton = config.zoom_resetButton;
        if (resetButton && config.zoom_type === "drag") {
            if (!$$.zoom.resetBtn) {
                $$.zoom.resetBtn = $$.$el.chart.append("div")
                    .classed(CLASS.button, true)
                    .append("span")
                    .on("click", function () {
                    isFunction(resetButton.onclick) && resetButton.onclick.bind($$.api)(this);
                    $$.api.unzoom();
                })
                    .classed(CLASS.buttonZoomReset, true)
                    .text(resetButton.text || "Reset Zoom");
            }
            else {
                $$.zoom.resetBtn.style("display", null);
            }
        }
    }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * data.selection config options
 */
var optDataSelection = {
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
    data_selection_isselectable: function () { return true; },
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
    data_onselected: function () { },
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
    data_onunselected: function () { }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * x Axis config options
 */
var optSubchart = {
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
     * @property {boolean} [subchart.axis.x.show=true] Show or hide x axis.
     * @property {boolean} [subchart.axis.x.tick.show=true] Show or hide x axis tick line.
     * @property {boolean} [subchart.axis.x.tick.text.show=true] Show or hide x axis tick text.
     * @property {number} [subchart.size.height] Change the height of the subchart.
     * @property {Function} [subchart.onbrush] Set callback for brush event.<br>
     *  Specified function receives the current zoomed x domain.
     * @see [Demo](https://naver.github.io/billboard.js/demo/#Interaction.SubChart)
     * @example
     *  subchart: {
     *      show: true,
     *      size: {
     *          height: 20
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
    subchart_show: false,
    subchart_size_height: 60,
    subchart_axis_x_show: true,
    subchart_axis_x_tick_show: true,
    subchart_axis_x_tick_text_show: true,
    subchart_onbrush: function () { }
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * zoom config options
 */
var optZoom = {
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
    zoom_extent: undefined,
    zoom_privileged: false,
    zoom_rescale: false,
    zoom_onzoom: undefined,
    zoom_onzoomstart: undefined,
    zoom_onzoomend: undefined,
    zoom_resetButton: true,
    zoom_x_min: undefined,
    zoom_x_max: undefined
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
var selectionModule = function () {
    extend(ChartInternal.prototype, selection);
    extend(Chart.prototype, apiSelection);
    Options.setOptions([optDataSelection]);
    return (selectionModule = function () { return true; })();
};
var subchartModule = function () {
    extend(ChartInternal.prototype, subchart);
    extend(Chart.prototype, apiSubchart);
    Options.setOptions([optSubchart]);
    return (subchartModule = function () { return true; })();
};
var zoomModule = function () {
    extend(ChartInternal.prototype, zoom);
    extend(Chart.prototype, apiZoom);
    Options.setOptions([optZoom]);
    return (zoomModule = function () { return true; })();
};

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard project is licensed under the MIT license
 */
var defaults = {};
/**
 * @namespace bb
 * @version 3.0.2
 */
var bb = {
    /**
     * Version information
     * @property {string} version version
     * @example
     *    bb.version;  // "1.0.0"
     * @memberof bb
     */
    version: "3.0.2",
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
    generate: function (config) {
        var options = mergeObj({}, defaults, config);
        var inst = new Chart(options);
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
    defaults: function (options) {
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

export default bb;
export { area, areaLineRange, areaSpline, areaSplineRange, areaStep, bar, bb, bubble, candlestick, donut, gauge, line, pie, radar, scatter, selectionModule as selection, spline, step, subchartModule as subchart, zoomModule as zoom };
