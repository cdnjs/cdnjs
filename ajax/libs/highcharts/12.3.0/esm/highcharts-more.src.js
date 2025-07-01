/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/highcharts-more
 * @requires highcharts
 *
 * (c) 2009-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__ from "./highcharts.src.js";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/

;// external ["./highcharts.src.js","default"]
const external_highcharts_src_js_default_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__["default"];
var external_highcharts_src_js_default_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_namespaceObject);
;// external ["./highcharts.src.js","default","SeriesRegistry"]
const external_highcharts_src_js_default_SeriesRegistry_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__["default"].SeriesRegistry;
var external_highcharts_src_js_default_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_SeriesRegistry_namespaceObject);
;// external ["./highcharts.src.js","default","Series"]
const external_highcharts_src_js_default_Series_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__["default"].Series;
var external_highcharts_src_js_default_Series_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_Series_namespaceObject);
;// ./code/es-modules/Series/CenteredUtilities.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { deg2rad } = (external_highcharts_src_js_default_default());


const { fireEvent, isNumber, pick, relativeLength } = (external_highcharts_src_js_default_default());
/**
 * @private
 */
var CenteredUtilities;
(function (CenteredUtilities) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Get the center of the pie based on the size and center options relative
     * to the plot area. Borrowed by the polar and gauge series types.
     *
     * @private
     * @function Highcharts.CenteredSeriesMixin.getCenter
     */
    function getCenter() {
        const options = this.options, chart = this.chart, slicingRoom = 2 * (options.slicedOffset || 0), plotWidth = chart.plotWidth - 2 * slicingRoom, plotHeight = chart.plotHeight - 2 * slicingRoom, centerOption = options.center, smallestSize = Math.min(plotWidth, plotHeight), thickness = options.thickness;
        let handleSlicingRoom, size = options.size, innerSize = options.innerSize || 0, i, value;
        if (typeof size === 'string') {
            size = parseFloat(size);
        }
        if (typeof innerSize === 'string') {
            innerSize = parseFloat(innerSize);
        }
        const positions = [
            pick(centerOption?.[0], '50%'),
            pick(centerOption?.[1], '50%'),
            // Prevent from negative values
            pick(size && size < 0 ? void 0 : options.size, '100%'),
            pick(innerSize && innerSize < 0 ? void 0 : options.innerSize || 0, '0%')
        ];
        // No need for inner size in angular (gauges) series but still required
        // for pie series
        if (chart.angular && !(this instanceof (external_highcharts_src_js_default_Series_default()))) {
            positions[3] = 0;
        }
        for (i = 0; i < 4; ++i) {
            value = positions[i];
            handleSlicingRoom = i < 2 || (i === 2 && /%$/.test(value));
            // I == 0: centerX, relative to width
            // i == 1: centerY, relative to height
            // i == 2: size, relative to smallestSize
            // i == 3: innerSize, relative to size
            positions[i] = relativeLength(value, [plotWidth, plotHeight, smallestSize, positions[2]][i]) + (handleSlicingRoom ? slicingRoom : 0);
        }
        // Inner size cannot be larger than size (#3632)
        if (positions[3] > positions[2]) {
            positions[3] = positions[2];
        }
        // Thickness overrides innerSize, need to be less than pie size (#6647)
        if (isNumber(thickness) &&
            thickness * 2 < positions[2] && thickness > 0) {
            positions[3] = positions[2] - thickness * 2;
        }
        fireEvent(this, 'afterGetCenter', { positions });
        return positions;
    }
    CenteredUtilities.getCenter = getCenter;
    /**
     * GetStartAndEndRadians - Calculates start and end angles in radians.
     * Used in series types such as pie and sunburst.
     *
     * @private
     * @function Highcharts.CenteredSeriesMixin.getStartAndEndRadians
     *
     * @param {number} [start]
     *        Start angle in degrees.
     *
     * @param {number} [end]
     *        Start angle in degrees.
     *
     * @return {Highcharts.RadianAngles}
     *         Returns an object containing start and end angles as radians.
     */
    function getStartAndEndRadians(start, end) {
        const startAngle = isNumber(start) ? start : 0, // Must be a number
        endAngle = ((isNumber(end) && // Must be a number
            end > startAngle && // Must be larger than the start angle
            // difference must be less than 360 degrees
            (end - startAngle) < 360) ?
            end :
            startAngle + 360), correction = -90;
        return {
            start: deg2rad * (startAngle + correction),
            end: deg2rad * (endAngle + correction)
        };
    }
    CenteredUtilities.getStartAndEndRadians = getStartAndEndRadians;
})(CenteredUtilities || (CenteredUtilities = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Series_CenteredUtilities = (CenteredUtilities);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @private
 * @interface Highcharts.RadianAngles
 */ /**
* @name Highcharts.RadianAngles#end
* @type {number}
*/ /**
* @name Highcharts.RadianAngles#start
* @type {number}
*/
''; // Keeps doclets above in JS file

;// ./code/es-modules/Extensions/Pane/PaneComposition.js
/* *
 *
 *  Imports
 *
 * */

const { addEvent, correctFloat, defined, pick: PaneComposition_pick } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
/** @private */
function chartGetHoverPane(eventArgs) {
    const chart = this;
    let hoverPane;
    if (eventArgs) {
        chart.pane.forEach((pane) => {
            const x = eventArgs.chartX - chart.plotLeft, y = eventArgs.chartY - chart.plotTop;
            if (isInsidePane(x, y, pane.center)) {
                hoverPane = pane;
            }
        });
    }
    return hoverPane;
}
/** @private */
function compose(ChartClass, PointerClass) {
    const chartProto = ChartClass.prototype;
    if (!chartProto.getHoverPane) {
        chartProto.collectionsWithUpdate.push('pane');
        chartProto.getHoverPane = chartGetHoverPane;
        addEvent(ChartClass, 'afterIsInsidePlot', onChartAfterIsInsiderPlot);
        addEvent(PointerClass, 'afterGetHoverData', onPointerAfterGetHoverData);
        addEvent(PointerClass, 'beforeGetHoverData', onPointerBeforeGetHoverData);
    }
}
/**
 * Check whether element is inside or outside pane.
 * @private
 * @param  {number} x
 * Element's x coordinate
 * @param  {number} y
 * Element's y coordinate
 * @param  {Array<number>} center
 * Pane's center (x, y) and diameter
 * @param  {number} startAngle
 * Pane's normalized start angle in radians (<-PI, PI>)
 * @param  {number} endAngle
 * Pane's normalized end angle in radians (<-PI, PI>)
 */
function isInsidePane(x, y, center, startAngle, endAngle) {
    let insideSlice = true;
    const cx = center[0], cy = center[1];
    const distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
    if (defined(startAngle) && defined(endAngle)) {
        // Round angle to N-decimals to avoid numeric errors
        const angle = Math.atan2(correctFloat(y - cy, 8), correctFloat(x - cx, 8));
        // Ignore full circle panes:
        if (endAngle !== startAngle) {
            // If normalized start angle is bigger than normalized end,
            // it means angles have different signs. In such situation we
            // check the <-PI, startAngle> and <endAngle, PI> ranges.
            if (startAngle > endAngle) {
                insideSlice = (angle >= startAngle &&
                    angle <= Math.PI) || (angle <= endAngle &&
                    angle >= -Math.PI);
            }
            else {
                // In this case, we simple check if angle is within the
                // <startAngle, endAngle> range
                insideSlice = angle >= startAngle &&
                    angle <= correctFloat(endAngle, 8);
            }
        }
    }
    // Round up radius because x and y values are rounded
    return distance <= Math.ceil(center[2] / 2) && insideSlice;
}
/**
 * Check if (x, y) position is within pane for polar.
 * @private
 */
function onChartAfterIsInsiderPlot(e) {
    const chart = this;
    if (chart.polar) {
        if (e.options.inverted) {
            [e.x, e.y] = [e.y, e.x];
        }
        e.isInsidePlot = chart.pane.some((pane) => isInsidePane(e.x, e.y, pane.center, pane.axis && pane.axis.normalizedStartAngleRad, pane.axis && pane.axis.normalizedEndAngleRad));
    }
}
/**
 *
 */
function onPointerAfterGetHoverData(eventArgs) {
    const chart = this.chart;
    if (eventArgs.hoverPoint &&
        eventArgs.hoverPoint.plotX &&
        eventArgs.hoverPoint.plotY &&
        chart.hoverPane &&
        !isInsidePane(eventArgs.hoverPoint.plotX, eventArgs.hoverPoint.plotY, chart.hoverPane.center)) {
        eventArgs.hoverPoint = void 0;
    }
}
/** @private */
function onPointerBeforeGetHoverData(eventArgs) {
    const chart = this.chart;
    if (chart.polar) {
        // Find pane we are currently hovering over.
        chart.hoverPane = chart.getHoverPane(eventArgs);
        // Edit filter method to handle polar
        eventArgs.filter = function (s) {
            return (s.visible &&
                !(!eventArgs.shared && s.directTouch) && // #3821
                PaneComposition_pick(s.options.enableMouseTracking, true) &&
                (!chart.hoverPane || s.xAxis.pane === chart.hoverPane));
        };
    }
    else {
        chart.hoverPane = void 0;
    }
}
/* *
 *
 *  Default Export
 *
 * */
const PaneComposition = {
    compose
};
/* harmony default export */ const Pane_PaneComposition = (PaneComposition);

;// ./code/es-modules/Extensions/Pane/PaneDefaults.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { defaultOptions } = (external_highcharts_src_js_default_default());
/* *
 *
 *  API Options
 *
 * */
/**
 * A background item or an array of such for the pane. When used in
 * `Highcharts.setOptions` for theming, the background must be a single item.
 *
 * @sample {highcharts} highcharts/demo/gauge-speedometer/
 *         Speedometer gauge with multiple backgrounds
 *
 * @type         {Array<*>}
 * @optionparent pane.background
 */
const background = {
    /**
     * The class name for this background.
     *
     * @sample {highcharts} highcharts/css/pane/
     *         Panes styled by CSS
     * @sample {highstock} highcharts/css/pane/
     *         Panes styled by CSS
     * @sample {highmaps} highcharts/css/pane/
     *         Panes styled by CSS
     *
     * @type      {string}
     * @default   highcharts-pane
     * @since     5.0.0
     * @apioption pane.background.className
     */
    /**
     * The shape of the pane background. When `solid`, the background
     * is circular. When `arc`, the background extends only from the min
     * to the max of the value axis.
     *
     * @type    {Highcharts.PaneBackgroundShapeValue}
     * @since   2.3.0
     * @product highcharts
     */
    shape: 'circle',
    /**
     * The border radius of the pane background when the shape is `arc`. Can be
     * a number (pixels) or a percentage string.
     *
     * @since 11.4.2
     * @sample  highcharts/series-solidgauge/pane-borderradius
     *          Circular gauge and pane with equal border radius
     * @product highcharts
     * @type    {number|string}
     */
    borderRadius: 0,
    /**
     * The pixel border width of the pane background.
     *
     * @since 2.3.0
     * @product highcharts
     */
    borderWidth: 1,
    /**
     * The pane background border color.
     *
     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since   2.3.0
     * @product highcharts
     */
    borderColor: "#cccccc" /* Palette.neutralColor20 */,
    /**
     * The background color or gradient for the pane.
     *
     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @default { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, #ffffff], [1, #e6e6e6]] }
     * @since   2.3.0
     * @product highcharts
     */
    backgroundColor: {
        /** @ignore-option */
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        /** @ignore-option */
        stops: [
            [0, "#ffffff" /* Palette.backgroundColor */],
            [1, "#e6e6e6" /* Palette.neutralColor10 */]
        ]
    },
    /** @ignore-option */
    from: -Number.MAX_VALUE, // Corrected to axis min
    /**
     * The inner radius of the pane background. Can be either numeric
     * (pixels) or a percentage string.
     *
     * @type    {number|string}
     * @since   2.3.0
     * @product highcharts
     */
    innerRadius: 0,
    /** @ignore-option */
    to: Number.MAX_VALUE, // Corrected to axis max
    /**
     * The outer radius of the circular pane background. Can be either
     * numeric (pixels) or a percentage string.
     *
     * @type     {number|string}
     * @since    2.3.0
     * @product  highcharts
     */
    outerRadius: '105%'
};
/**
 * The pane serves as a container for axes and backgrounds for circular
 * gauges and polar charts.
 *
 * When used in `Highcharts.setOptions` for theming, the pane must be a single
 * object, otherwise arrays are supported.
 *
 * @type         {*|Array<*>}
 * @since        2.3.0
 * @product      highcharts
 * @requires     highcharts-more
 * @optionparent pane
 */
const pane = {
    background,
    /**
     * The end angle of the polar X axis or gauge value axis, given in
     * degrees where 0 is north. Defaults to [startAngle](#pane.startAngle)
     * + 360.
     *
     * @sample {highcharts} highcharts/demo/gauge-vu-meter/
     *         VU-meter with custom start and end angle
     *
     * @type      {number}
     * @since     2.3.0
     * @product   highcharts
     * @apioption pane.endAngle
     */
    /**
     * The center of a polar chart or angular gauge, given as an array
     * of [x, y] positions. Positions can be given as integers that
     * transform to pixels, or as percentages of the plot area size.
     *
     * @sample {highcharts} highcharts/demo/gauge-vu-meter/
     *         Two gauges with different center
     *
     * @type    {Array<string|number>}
     * @default ["50%", "50%"]
     * @since   2.3.0
     * @product highcharts
     */
    center: ['50%', '50%'],
    /**
     * The size of the pane, either as a number defining pixels, or a
     * percentage defining a percentage of the available plot area (the
     * smallest of the plot height or plot width).
     *
     * @sample {highcharts} highcharts/demo/gauge-vu-meter/
     *         Smaller size
     *
     * @type    {number|string}
     * @product highcharts
     */
    size: '85%',
    /**
     * The inner size of the pane, either as a number defining pixels, or a
     * percentage defining a percentage of the pane's size.
     *
     * @sample {highcharts} highcharts/series-polar/column-inverted-inner
     *         The inner size set to 20%
     *
     * @type    {number|string}
     * @product highcharts
     */
    innerSize: '0%',
    /**
     * The start angle of the polar X axis or gauge axis, given in degrees
     * where 0 is north. Defaults to 0.
     *
     * @sample {highcharts} highcharts/demo/gauge-vu-meter/
     *         VU-meter with custom start and end angle
     *
     * @since   2.3.0
     * @product highcharts
     */
    startAngle: 0
};
defaultOptions.pane = pane;
/* *
 *
 *  Default Export
 *
 * */
const PaneDefaults = {
    pane,
    background
};
/* harmony default export */ const Pane_PaneDefaults = (PaneDefaults);

;// ./code/es-modules/Extensions/Pane/Pane.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { extend, merge, splat } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The Pane object allows options that are common to a set of X and Y axes.
 *
 * In the future, this can be extended to basic Highcharts and Highcharts Stock.
 *
 * @private
 * @class
 * @name Highcharts.Pane
 * @param {Highcharts.PaneOptions} options
 * @param {Highcharts.Chart} chart
 */
class Pane {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(options, chart) {
        this.coll = 'pane'; // Member of chart.pane
        this.init(options, chart);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initialize the Pane object
     *
     * @private
     * @function Highcharts.Pane#init
     *
     * @param {Highcharts.PaneOptions} options
     *
     * @param {Highcharts.Chart} chart
     */
    init(options, chart) {
        this.chart = chart;
        this.background = [];
        chart.pane.push(this);
        this.setOptions(options);
    }
    /**
     * @private
     * @function Highcharts.Pane#setOptions
     *
     * @param {Highcharts.PaneOptions} options
     */
    setOptions(options) {
        // Set options. Angular charts have a default background (#3318)
        this.options = options = merge(Pane_PaneDefaults.pane, { background: this.chart.angular ? {} : void 0 }, options);
    }
    /**
     * Render the pane with its backgrounds.
     *
     * @private
     * @function Highcharts.Pane#render
     */
    render() {
        const options = this.options, renderer = this.chart.renderer;
        if (!this.group) {
            this.group = renderer.g('pane-group')
                .attr({ zIndex: options.zIndex || 0 })
                .add();
        }
        this.updateCenter();
        let backgroundOption = this.options.background;
        // Render the backgrounds
        if (backgroundOption) {
            backgroundOption = splat(backgroundOption);
            const len = Math.max(backgroundOption.length, this.background.length || 0);
            for (let i = 0; i < len; i++) {
                // #6641 - if axis exists, chart is circular and apply
                // background
                if (backgroundOption[i] && this.axis) {
                    this.renderBackground(merge(Pane_PaneDefaults.background, backgroundOption[i]), i);
                }
                else if (this.background[i]) {
                    this.background[i] = this.background[i].destroy();
                    this.background.splice(i, 1);
                }
            }
        }
    }
    /**
     * Render an individual pane background.
     *
     * @private
     * @function Highcharts.Pane#renderBackground
     *
     * @param {Highcharts.PaneBackgroundOptions} backgroundOptions
     *        Background options
     *
     * @param {number} i
     *        The index of the background in this.backgrounds
     */
    renderBackground(backgroundOptions, i) {
        const attribs = {
            'class': 'highcharts-pane ' + (backgroundOptions.className || '')
        };
        let method = 'animate';
        if (!this.chart.styledMode) {
            extend(attribs, {
                'fill': backgroundOptions.backgroundColor,
                'stroke': backgroundOptions.borderColor,
                'stroke-width': backgroundOptions.borderWidth
            });
        }
        if (!this.background[i]) {
            this.background[i] = this.chart.renderer
                .path()
                .add(this.group);
            method = 'attr';
        }
        this.background[i][method]({
            'd': this.axis.getPlotBandPath(backgroundOptions.from, backgroundOptions.to, backgroundOptions)
        }).attr(attribs);
    }
    /**
     * Gets the center for the pane and its axis.
     *
     * @private
     * @function Highcharts.Pane#updateCenter
     * @param {Highcharts.Axis} [axis]
     */
    updateCenter(axis) {
        this.center = (axis ||
            this.axis ||
            {}).center = Series_CenteredUtilities.getCenter.call(this);
    }
    /**
     * Destroy the pane item
     *
     * @ignore
     * @private
     * @function Highcharts.Pane#destroy
     * /
    destroy: function () {
        erase(this.chart.pane, this);
        this.background.forEach(function (background) {
            background.destroy();
        });
        this.background.length = 0;
        this.group = this.group.destroy();
    },
    */
    /**
     * Update the pane item with new options
     *
     * @private
     * @function Highcharts.Pane#update
     * @param {Highcharts.PaneOptions} options
     *        New pane options
     * @param {boolean} [redraw]
     */
    update(options, redraw) {
        merge(true, this.options, options);
        this.setOptions(this.options);
        this.render();
        this.chart.axes.forEach(function (axis) {
            if (axis.pane === this) {
                axis.pane = null;
                axis.update({}, redraw);
            }
        }, this);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
Pane.compose = Pane_PaneComposition.compose;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Pane_Pane = (Pane);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @typedef {"arc"|"circle"|"solid"} Highcharts.PaneBackgroundShapeValue
 */
''; // Keeps doclets above in JS file

;// ./code/es-modules/Series/AreaRange/AreaRangePoint.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { area: { prototype: { pointClass: AreaPoint, pointClass: { prototype: areaProto } } } } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { defined: AreaRangePoint_defined, isNumber: AreaRangePoint_isNumber } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
class AreaRangePoint extends AreaPoint {
    /**
     * Range series only. The high or maximum value for each data point.
     * @name Highcharts.Point#high
     * @type {number|undefined}
     */
    /**
     * Range series only. The low or minimum value for each data point.
     * @name Highcharts.Point#low
     * @type {number|undefined}
     */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    setState() {
        const prevState = this.state, series = this.series, isPolar = series.chart.polar;
        if (!AreaRangePoint_defined(this.plotHigh)) {
            // Boost doesn't calculate plotHigh
            this.plotHigh = series.yAxis.toPixels(this.high, true);
        }
        if (!AreaRangePoint_defined(this.plotLow)) {
            // Boost doesn't calculate plotLow
            this.plotLow = this.plotY = series.yAxis.toPixels(this.low, true);
        }
        series.lowerStateMarkerGraphic = series.stateMarkerGraphic;
        series.stateMarkerGraphic = series.upperStateMarkerGraphic;
        // Change state also for the top marker
        this.graphic = this.graphics && this.graphics[1];
        this.plotY = this.plotHigh;
        if (isPolar && AreaRangePoint_isNumber(this.plotHighX)) {
            this.plotX = this.plotHighX;
        }
        // Top state:
        areaProto.setState.apply(this, arguments);
        this.state = prevState;
        // Now restore defaults
        this.plotY = this.plotLow;
        this.graphic = this.graphics && this.graphics[0];
        if (isPolar && AreaRangePoint_isNumber(this.plotLowX)) {
            this.plotX = this.plotLowX;
        }
        series.upperStateMarkerGraphic = series.stateMarkerGraphic;
        series.stateMarkerGraphic = series.lowerStateMarkerGraphic;
        // Lower marker is stored at stateMarkerGraphic
        // to avoid reference duplication (#7021)
        series.lowerStateMarkerGraphic = void 0;
        const originalSettings = series.modifyMarkerSettings();
        // Bottom state
        areaProto.setState.apply(this, arguments);
        // Restore previous state
        series.restoreMarkerSettings(originalSettings);
    }
    haloPath() {
        const isPolar = this.series.chart.polar;
        let path = [];
        // Bottom halo
        this.plotY = this.plotLow;
        if (isPolar && AreaRangePoint_isNumber(this.plotLowX)) {
            this.plotX = this.plotLowX;
        }
        if (this.isInside) {
            path = areaProto.haloPath.apply(this, arguments);
        }
        // Top halo
        this.plotY = this.plotHigh;
        if (isPolar && AreaRangePoint_isNumber(this.plotHighX)) {
            this.plotX = this.plotHighX;
        }
        if (this.isTopInside) {
            path = path.concat(areaProto.haloPath.apply(this, arguments));
        }
        return path;
    }
    isValid() {
        return AreaRangePoint_isNumber(this.low) && AreaRangePoint_isNumber(this.high);
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const AreaRange_AreaRangePoint = (AreaRangePoint);

;// ./code/es-modules/Series/AreaRange/AreaRangeSeries.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { noop } = (external_highcharts_src_js_default_default());

const { area: AreaSeries, area: { prototype: AreaRangeSeries_areaProto }, column: { prototype: columnProto } } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { addEvent: AreaRangeSeries_addEvent, defined: AreaRangeSeries_defined, extend: AreaRangeSeries_extend, isArray, isNumber: AreaRangeSeries_isNumber, pick: AreaRangeSeries_pick, merge: AreaRangeSeries_merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Constants
 *
 * */
/**
 * The area range series is a carteseian series with higher and lower values for
 * each point along an X axis, where the area between the values is shaded.
 *
 * @sample {highcharts} highcharts/demo/arearange/
 *         Area range chart
 * @sample {highstock} stock/demo/arearange/
 *         Area range chart
 *
 * @extends      plotOptions.area
 * @product      highcharts highstock
 * @excluding    stack, stacking
 * @requires     highcharts-more
 * @optionparent plotOptions.arearange
 *
 * @private
 */
const areaRangeSeriesOptions = {
    /**
     * @see [fillColor](#plotOptions.arearange.fillColor)
     * @see [fillOpacity](#plotOptions.arearange.fillOpacity)
     *
     * @apioption plotOptions.arearange.color
     */
    /**
     * @default   low
     * @apioption plotOptions.arearange.colorKey
     */
    /**
     * @see [color](#plotOptions.arearange.color)
     * @see [fillOpacity](#plotOptions.arearange.fillOpacity)
     *
     * @apioption plotOptions.arearange.fillColor
     */
    /**
     * @see [color](#plotOptions.arearange.color)
     * @see [fillColor](#plotOptions.arearange.fillColor)
     *
     * @default   {highcharts} 0.75
     * @default   {highstock} 0.75
     * @apioption plotOptions.arearange.fillOpacity
     */
    /**
     * Whether to apply a drop shadow to the graph line. Since 2.3 the
     * shadow can be an object configuration containing `color`, `offsetX`,
     * `offsetY`, `opacity` and `width`.
     *
     * @type      {boolean|Highcharts.ShadowOptionsObject}
     * @product   highcharts
     * @apioption plotOptions.arearange.shadow
     */
    /**
     * Pixel width of the arearange graph line.
     *
     * @since 2.3.0
     *
     * @private
     */
    lineWidth: 1,
    /**
     * @type {number|null}
     */
    threshold: null,
    tooltip: {
        pointFormat: '<span style="color:{series.color}">\u25CF</span> ' +
            '{series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
    },
    /**
     * Whether the whole area or just the line should respond to mouseover
     * tooltips and other mouse or touch events.
     *
     * @since 2.3.0
     *
     * @private
     */
    trackByArea: true,
    /**
     * Extended data labels for range series types. Range series data
     * labels use no `x` and `y` options. Instead, they have `xLow`,
     * `xHigh`, `yLow` and `yHigh` options to allow the higher and lower
     * data label sets individually.
     *
     * @declare Highcharts.SeriesAreaRangeDataLabelsOptionsObject
     * @exclude x, y
     * @since   2.3.0
     * @product highcharts highstock
     *
     * @private
     */
    dataLabels: {
        align: void 0,
        verticalAlign: void 0,
        /**
         * X offset of the lower data labels relative to the point value.
         *
         * @sample highcharts/plotoptions/arearange-datalabels/
         *         Data labels on range series
         * @sample highcharts/plotoptions/arearange-datalabels/
         *         Data labels on range series
         */
        xLow: 0,
        /**
         * X offset of the higher data labels relative to the point value.
         *
         * @sample highcharts/plotoptions/arearange-datalabels/
         *         Data labels on range series
         */
        xHigh: 0,
        /**
         * Y offset of the lower data labels relative to the point value.
         *
         * @sample highcharts/plotoptions/arearange-datalabels/
         *         Data labels on range series
         */
        yLow: 0,
        /**
         * Y offset of the higher data labels relative to the point value.
         *
         * @sample highcharts/plotoptions/arearange-datalabels/
         *         Data labels on range series
         */
        yHigh: 0
    }
};
/* *
 *
 *  Class
 *
 * */
/**
 * The AreaRange series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.arearange
 *
 * @augments Highcharts.Series
 */
class AreaRangeSeries extends AreaSeries {
    /* *
     *
     *  Functions
     *
     * */
    toYData(point) {
        return [point.low, point.high];
    }
    /**
     * Translate a point's plotHigh from the internal angle and radius measures
     * to true plotHigh coordinates. This is an addition of the toXY method
     * found in Polar.js, because it runs too early for arearanges to be
     * considered (#3419).
     * @private
     */
    highToXY(point) {
        // Find the polar plotX and plotY
        const chart = this.chart, xy = this.xAxis.postTranslate(point.rectPlotX || 0, this.yAxis.len - (point.plotHigh || 0));
        point.plotHighX = xy.x - chart.plotLeft;
        point.plotHigh = xy.y - chart.plotTop;
        point.plotLowX = point.plotX;
    }
    /**
     * Extend the line series' getSegmentPath method by applying the segment
     * path to both lower and higher values of the range.
     * @private
     */
    getGraphPath(points) {
        const highPoints = [], highAreaPoints = [], getGraphPath = AreaRangeSeries_areaProto.getGraphPath, options = this.options, polar = this.chart.polar, connectEnds = polar && options.connectEnds !== false, connectNulls = options.connectNulls;
        let i, point, pointShim, step = options.step;
        points = points || this.points;
        // Create the top line and the top part of the area fill. The area fill
        // compensates for null points by drawing down to the lower graph,
        // moving across the null gap and starting again at the lower graph.
        i = points.length;
        while (i--) {
            point = points[i];
            // Support for polar
            const highAreaPoint = polar ? {
                plotX: point.rectPlotX,
                plotY: point.yBottom,
                doCurve: false // #5186, gaps in areasplinerange fill
            } : {
                plotX: point.plotX,
                plotY: point.plotY,
                doCurve: false // #5186, gaps in areasplinerange fill
            };
            if (!point.isNull &&
                !connectEnds &&
                !connectNulls &&
                (!points[i + 1] || points[i + 1].isNull)) {
                highAreaPoints.push(highAreaPoint);
            }
            pointShim = {
                polarPlotY: point.polarPlotY,
                rectPlotX: point.rectPlotX,
                yBottom: point.yBottom,
                // `plotHighX` is for polar charts
                plotX: AreaRangeSeries_pick(point.plotHighX, point.plotX),
                plotY: point.plotHigh,
                isNull: point.isNull
            };
            highAreaPoints.push(pointShim);
            highPoints.push(pointShim);
            if (!point.isNull &&
                !connectEnds &&
                !connectNulls &&
                (!points[i - 1] || points[i - 1].isNull)) {
                highAreaPoints.push(highAreaPoint);
            }
        }
        // Get the paths
        const lowerPath = getGraphPath.call(this, points);
        if (step) {
            if (step === true) {
                step = 'left';
            }
            options.step = {
                left: 'right',
                center: 'center',
                right: 'left'
            }[step]; // Swap for reading in getGraphPath
        }
        const higherPath = getGraphPath.call(this, highPoints);
        const higherAreaPath = getGraphPath.call(this, highAreaPoints);
        options.step = step;
        // Create a line on both top and bottom of the range
        const linePath = [].concat(lowerPath, higherPath);
        // For the area path, we need to change the 'move' statement into
        // 'lineTo'
        if (!this.chart.polar &&
            higherAreaPath[0] &&
            higherAreaPath[0][0] === 'M') {
            // This probably doesn't work for spline
            higherAreaPath[0] = [
                'L',
                higherAreaPath[0][1],
                higherAreaPath[0][2]
            ];
        }
        this.graphPath = linePath;
        this.areaPath = lowerPath.concat(higherAreaPath);
        // Prepare for sideways animation
        linePath.isArea = true;
        linePath.xMap = lowerPath.xMap;
        this.areaPath.xMap = lowerPath.xMap;
        return linePath;
    }
    /**
     * Extend the basic drawDataLabels method by running it for both lower and
     * higher values.
     * @private
     */
    drawDataLabels() {
        const data = this.points, length = data.length, originalDataLabels = [], dataLabelOptions = this.options.dataLabels, inverted = this.chart.inverted;
        let i, point, up, upperDataLabelOptions, lowerDataLabelOptions;
        if (dataLabelOptions) {
            // Split into upper and lower options. If data labels is an array,
            // the first element is the upper label, the second is the lower.
            //
            // TODO: We want to change this and allow multiple labels for both
            // upper and lower values in the future - introducing some options
            // for which point value to use as Y for the dataLabel, so that this
            // could be handled in Series.drawDataLabels. This would also
            // improve performance since we now have to loop over all the points
            // multiple times to work around the data label logic.
            if (isArray(dataLabelOptions)) {
                upperDataLabelOptions = dataLabelOptions[0] || {
                    enabled: false
                };
                lowerDataLabelOptions = dataLabelOptions[1] || {
                    enabled: false
                };
            }
            else {
                // Make copies
                upperDataLabelOptions = AreaRangeSeries_extend({}, dataLabelOptions);
                upperDataLabelOptions.x = dataLabelOptions.xHigh;
                upperDataLabelOptions.y = dataLabelOptions.yHigh;
                lowerDataLabelOptions = AreaRangeSeries_extend({}, dataLabelOptions);
                lowerDataLabelOptions.x = dataLabelOptions.xLow;
                lowerDataLabelOptions.y = dataLabelOptions.yLow;
            }
            // Draw upper labels
            if (upperDataLabelOptions.enabled || this.hasDataLabels?.()) {
                // Set preliminary values for plotY and dataLabel
                // and draw the upper labels
                i = length;
                while (i--) {
                    point = data[i];
                    if (point) {
                        const { plotHigh = 0, plotLow = 0 } = point;
                        up = upperDataLabelOptions.inside ?
                            plotHigh < plotLow :
                            plotHigh > plotLow;
                        point.y = point.high;
                        point._plotY = point.plotY;
                        point.plotY = plotHigh;
                        // Store original data labels and set preliminary label
                        // objects to be picked up in the uber method
                        originalDataLabels[i] = point.dataLabel;
                        point.dataLabel = point.dataLabelUpper;
                        // Set the default offset
                        point.below = up;
                        if (inverted) {
                            if (!upperDataLabelOptions.align) {
                                upperDataLabelOptions.align = up ?
                                    'right' : 'left';
                            }
                        }
                        else {
                            if (!upperDataLabelOptions.verticalAlign) {
                                upperDataLabelOptions.verticalAlign = up ?
                                    'top' :
                                    'bottom';
                            }
                        }
                    }
                }
                this.options.dataLabels = upperDataLabelOptions;
                if (AreaRangeSeries_areaProto.drawDataLabels) {
                    // #1209:
                    AreaRangeSeries_areaProto.drawDataLabels.apply(this, arguments);
                }
                // Reset state after the upper labels were created. Move
                // it to point.dataLabelUpper and reassign the originals.
                // We do this here to support not drawing a lower label.
                i = length;
                while (i--) {
                    point = data[i];
                    if (point) {
                        point.dataLabelUpper = point.dataLabel;
                        point.dataLabel = originalDataLabels[i];
                        delete point.dataLabels;
                        point.y = point.low;
                        point.plotY = point._plotY;
                    }
                }
            }
            // Draw lower labels
            if (lowerDataLabelOptions.enabled || this.hasDataLabels?.()) {
                i = length;
                while (i--) {
                    point = data[i];
                    if (point) {
                        const { plotHigh = 0, plotLow = 0 } = point;
                        up = lowerDataLabelOptions.inside ?
                            plotHigh < plotLow :
                            plotHigh > plotLow;
                        // Set the default offset
                        point.below = !up;
                        if (inverted) {
                            if (!lowerDataLabelOptions.align) {
                                lowerDataLabelOptions.align = up ?
                                    'left' : 'right';
                            }
                        }
                        else {
                            if (!lowerDataLabelOptions.verticalAlign) {
                                lowerDataLabelOptions.verticalAlign = up ?
                                    'bottom' :
                                    'top';
                            }
                        }
                    }
                }
                this.options.dataLabels = lowerDataLabelOptions;
                if (AreaRangeSeries_areaProto.drawDataLabels) {
                    AreaRangeSeries_areaProto.drawDataLabels.apply(this, arguments);
                }
            }
            // Merge upper and lower into point.dataLabels for later destroying
            if (upperDataLabelOptions.enabled) {
                i = length;
                while (i--) {
                    point = data[i];
                    if (point) {
                        point.dataLabels = [
                            point.dataLabelUpper,
                            point.dataLabel
                        ].filter(function (label) {
                            return !!label;
                        });
                    }
                }
            }
            // Reset options
            this.options.dataLabels = dataLabelOptions;
        }
    }
    alignDataLabel() {
        columnProto.alignDataLabel.apply(this, arguments);
    }
    modifyMarkerSettings() {
        const series = this, originalMarkerSettings = {
            marker: series.options.marker,
            symbol: series.symbol
        };
        if (series.options.lowMarker) {
            const { options: { marker, lowMarker } } = series;
            series.options.marker = AreaRangeSeries_merge(marker, lowMarker);
            if (lowMarker.symbol) {
                series.symbol = lowMarker.symbol;
            }
        }
        return originalMarkerSettings;
    }
    restoreMarkerSettings(originalSettings) {
        const series = this;
        series.options.marker = originalSettings.marker;
        series.symbol = originalSettings.symbol;
    }
    drawPoints() {
        const series = this, pointLength = series.points.length;
        let i, point;
        const originalSettings = series.modifyMarkerSettings();
        // Draw bottom points
        AreaRangeSeries_areaProto.drawPoints.apply(series, arguments);
        // Restore previous state
        series.restoreMarkerSettings(originalSettings);
        // Prepare drawing top points
        i = 0;
        while (i < pointLength) {
            point = series.points[i];
            /**
             * Array for multiple SVG graphics representing the point in the
             * chart. Only used in cases where the point can not be represented
             * by a single graphic.
             *
             * @see Highcharts.Point#graphic
             *
             * @name Highcharts.Point#graphics
             * @type {Array<Highcharts.SVGElement>|undefined}
             */
            point.graphics = point.graphics || [];
            // Save original props to be overridden by temporary props for top
            // points
            point.origProps = {
                plotY: point.plotY,
                plotX: point.plotX,
                isInside: point.isInside,
                negative: point.negative,
                zone: point.zone,
                y: point.y
            };
            if (point.graphic || point.graphics[0]) {
                point.graphics[0] = point.graphic;
            }
            point.graphic = point.graphics[1];
            point.plotY = point.plotHigh;
            if (AreaRangeSeries_defined(point.plotHighX)) {
                point.plotX = point.plotHighX;
            }
            point.y = AreaRangeSeries_pick(point.high, point.origProps.y); // #15523
            point.negative = point.y < (series.options.threshold || 0);
            if (series.zones.length) {
                point.zone = point.getZone();
            }
            if (!series.chart.polar) {
                point.isInside = point.isTopInside = (typeof point.plotY !== 'undefined' &&
                    point.plotY >= 0 &&
                    point.plotY <= series.yAxis.len && // #3519
                    point.plotX >= 0 &&
                    point.plotX <= series.xAxis.len);
            }
            i++;
        }
        // Draw top points
        AreaRangeSeries_areaProto.drawPoints.apply(series, arguments);
        // Reset top points preliminary modifications
        i = 0;
        while (i < pointLength) {
            point = series.points[i];
            point.graphics = point.graphics || [];
            if (point.graphic || point.graphics[1]) {
                point.graphics[1] = point.graphic;
            }
            point.graphic = point.graphics[0];
            if (point.origProps) {
                AreaRangeSeries_extend(point, point.origProps);
                delete point.origProps;
            }
            i++;
        }
    }
    hasMarkerChanged(options, oldOptions) {
        const lowMarker = options.lowMarker, oldMarker = oldOptions.lowMarker || {};
        return (lowMarker && (lowMarker.enabled === false ||
            oldMarker.symbol !== lowMarker.symbol || // #10870, #15946
            oldMarker.height !== lowMarker.height || // #16274
            oldMarker.width !== lowMarker.width // #16274
        )) || super.hasMarkerChanged(options, oldOptions);
    }
}
/**
 *
 *  Static Properties
 *
 */
AreaRangeSeries.defaultOptions = AreaRangeSeries_merge(AreaSeries.defaultOptions, areaRangeSeriesOptions);
AreaRangeSeries_addEvent(AreaRangeSeries, 'afterTranslate', function () {
    // Set plotLow and plotHigh
    // Rules out lollipop, but lollipop should not inherit range series in the
    // first place
    if (this.pointArrayMap.join(',') === 'low,high') {
        this.points.forEach((point) => {
            const high = point.high, plotY = point.plotY;
            if (point.isNull) {
                point.plotY = void 0;
            }
            else {
                point.plotLow = plotY;
                // Calculate plotHigh value based on each yAxis scale (#15752)
                point.plotHigh = AreaRangeSeries_isNumber(high) ? this.yAxis.translate(this.dataModify ?
                    this.dataModify.modifyValue(high) : high, false, true, void 0, true) : void 0;
                if (this.dataModify) {
                    point.yBottom = point.plotHigh;
                }
            }
        });
    }
}, { order: 0 });
AreaRangeSeries_addEvent(AreaRangeSeries, 'afterTranslate', function () {
    this.points.forEach((point) => {
        // Postprocessing after the PolarComposition's afterTranslate
        if (this.chart.polar) {
            this.highToXY(point);
            point.plotLow = point.plotY;
            point.tooltipPos = [
                ((point.plotHighX || 0) + (point.plotLowX || 0)) / 2,
                ((point.plotHigh || 0) + (point.plotLow || 0)) / 2
            ];
            // Put the tooltip in the middle of the range
        }
        else {
            const tooltipPos = point.pos(false, point.plotLow), posHigh = point.pos(false, point.plotHigh);
            if (tooltipPos && posHigh) {
                tooltipPos[0] = (tooltipPos[0] + posHigh[0]) / 2;
                tooltipPos[1] = (tooltipPos[1] + posHigh[1]) / 2;
            }
            point.tooltipPos = tooltipPos;
        }
    });
}, { order: 3 });
AreaRangeSeries_extend(AreaRangeSeries.prototype, {
    deferTranslatePolar: true,
    pointArrayMap: ['low', 'high'],
    pointClass: AreaRange_AreaRangePoint,
    pointValKey: 'low',
    setStackedPoints: noop
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('arearange', AreaRangeSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const AreaRange_AreaRangeSeries = (AreaRangeSeries);

;// ./code/es-modules/Series/AreaSplineRange/AreaSplineRangeSeries.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { spline: { prototype: splineProto } } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { merge: AreaSplineRangeSeries_merge, extend: AreaSplineRangeSeries_extend } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The areasplinerange series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.areasplinerange
 *
 * @augments Highcharts.Series
 */
class AreaSplineRangeSeries extends AreaRange_AreaRangeSeries {
}
/* *
 *
 *  Static Properties
 *
 * */
AreaSplineRangeSeries.defaultOptions = AreaSplineRangeSeries_merge(AreaRange_AreaRangeSeries.defaultOptions);
AreaSplineRangeSeries_extend(AreaSplineRangeSeries.prototype, {
    getPointSpline: splineProto.getPointSpline
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('areasplinerange', AreaSplineRangeSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const AreaSplineRange_AreaSplineRangeSeries = ((/* unused pure expression or super */ null && (AreaSplineRangeSeries)));
/* *
 *
 *  API Options
 *
 * */
/**
 * The area spline range is a cartesian series type with higher and
 * lower Y values along an X axis. The area inside the range is colored, and
 * the graph outlining the area is a smoothed spline.
 *
 * @sample {highstock|highstock} stock/demo/areasplinerange/
 *         Area spline range
 *
 * @extends   plotOptions.arearange
 * @since     2.3.0
 * @excluding step, boostThreshold, boostBlending
 * @product   highcharts highstock
 * @requires  highcharts-more
 * @apioption plotOptions.areasplinerange
 */
/**
 * @see [fillColor](#plotOptions.areasplinerange.fillColor)
 * @see [fillOpacity](#plotOptions.areasplinerange.fillOpacity)
 *
 * @apioption plotOptions.areasplinerange.color
 */
/**
 * @see [color](#plotOptions.areasplinerange.color)
 * @see [fillOpacity](#plotOptions.areasplinerange.fillOpacity)
 *
 * @apioption plotOptions.areasplinerange.fillColor
 */
/**
 * @see [color](#plotOptions.areasplinerange.color)
 * @see [fillColor](#plotOptions.areasplinerange.fillColor)
 *
 * @default   0.75
 * @apioption plotOptions.areasplinerange.fillOpacity
 */
/**
 * A `areasplinerange` series. If the [type](#series.areasplinerange.type)
 * option is not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.areasplinerange
 * @excluding dataParser, dataURL, stack, step, boostThreshold, boostBlending
 * @product   highcharts highstock
 * @requires  highcharts-more
 * @apioption series.areasplinerange
 */
/**
 * @see [fillColor](#series.areasplinerange.fillColor)
 * @see [fillOpacity](#series.areasplinerange.fillOpacity)
 *
 * @apioption series.areasplinerange.color
 */
/**
 * An array of data points for the series. For the `areasplinerange`
 * series type, points can be given in the following ways:
 *
 * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
 *    to `x,low,high`. If the first value is a string, it is applied as the name
 *    of the point, and the `x` value is inferred. The `x` value can also be
 *    omitted, in which case the inner arrays should be of length 2\. Then the
 *    `x` value is automatically calculated, either starting at 0 and
 *    incremented by 1, or from `pointStart` and `pointInterval` given in the
 *    series options.
 *    ```js
 *    data: [
 *        [0, 0, 5],
 *        [1, 9, 1],
 *        [2, 5, 2]
 *    ]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.areasplinerange.turboThreshold), this option is
 *    not available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        low: 5,
 *        high: 0,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        low: 4,
 *        high: 1,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
 * @extends   series.arearange.data
 * @product   highcharts highstock
 * @apioption series.areasplinerange.data
 */
/**
 * @see [color](#series.areasplinerange.color)
 * @see [fillOpacity](#series.areasplinerange.fillOpacity)
 *
 * @apioption series.areasplinerange.fillColor
 */
/**
 * @see [color](#series.areasplinerange.color)
 * @see [fillColor](#series.areasplinerange.fillColor)
 *
 * @default   0.75
 * @apioption series.areasplinerange.fillOpacity
 */
''; // Adds doclets above to transpiled file

;// ./code/es-modules/Series/BoxPlot/BoxPlotSeriesDefaults.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  API Options
 *
 * */
/**
 * A box plot is a convenient way of depicting groups of data through their
 * five-number summaries: the smallest observation (sample minimum), lower
 * quartile (Q1), median (Q2), upper quartile (Q3), and largest observation
 * (sample maximum).
 *
 * @sample highcharts/demo/box-plot/
 *         Box plot
 * @sample {highcharts} highcharts/css/boxplot/
 *         Box plot in styled mode
 * @sample {highcharts} highcharts/series-scatter/jitter-boxplot
 *         Jittered scatter plot on top of a box plot
 *
 * @extends      plotOptions.column
 * @excluding    borderColor, borderRadius, borderWidth, groupZPadding,
 *               states, boostThreshold, boostBlending
 * @product      highcharts
 * @requires     highcharts-more
 * @optionparent plotOptions.boxplot
 */
const BoxPlotSeriesDefaults = {
    /**
     * @type {number|null}
     */
    threshold: null,
    tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b>' +
            '{series.name}</b><br/>' +
            'Maximum: {point.high}<br/>' +
            'Upper quartile: {point.q3}<br/>' +
            'Median: {point.median}<br/>' +
            'Lower quartile: {point.q1}<br/>' +
            'Minimum: {point.low}<br/>'
    },
    /**
     * The length of the whiskers, the horizontal lines marking low and
     * high values. It can be a numerical pixel value, or a percentage
     * value of the box width. Set `0` to disable whiskers.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     *
     * @type    {number|string}
     * @since   3.0
     * @product highcharts
     */
    whiskerLength: '50%',
    /**
     * The fill color of the box.
     *
     * In styled mode, the fill color can be set with the
     * `.highcharts-boxplot-box` class.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     *
     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @default #ffffff
     * @since   3.0
     * @product highcharts
     */
    fillColor: "#ffffff" /* Palette.backgroundColor */,
    /**
     * The width of the line surrounding the box. If any of
     * [stemWidth](#plotOptions.boxplot.stemWidth),
     * [medianWidth](#plotOptions.boxplot.medianWidth)
     * or [whiskerWidth](#plotOptions.boxplot.whiskerWidth) are `null`,
     * the lineWidth also applies to these lines.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
     *         Error bar styling
     *
     * @since   3.0
     * @product highcharts
     */
    lineWidth: 1,
    /**
     * The color of the median line. If `undefined`, the general series
     * color applies.
     *
     * In styled mode, the median stroke width can be set with the
     * `.highcharts-boxplot-median` class.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/css/boxplot/
     *         Box plot in styled mode
     * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
     *         Error bar styling
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject}
     * @since     3.0
     * @product   highcharts
     * @apioption plotOptions.boxplot.medianColor
     */
    /**
     * The pixel width of the median line. If `null`, the
     * [lineWidth](#plotOptions.boxplot.lineWidth) is used.
     *
     * In styled mode, the median stroke width can be set with the
     * `.highcharts-boxplot-median` class.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/css/boxplot/
     *         Box plot in styled mode
     *
     * @type    {number|null}
     * @since   3.0
     * @product highcharts
     */
    medianWidth: 2,
    /*
    // States are not working and are removed from docs.
    // Refer to: #2340
    states: {
        hover: {
            brightness: -0.3
        }
    },
    */
    /**
     * The color of the stem, the vertical line extending from the box to
     * the whiskers. If `undefined`, the series color is used.
     *
     * In styled mode, the stem stroke can be set with the
     * `.highcharts-boxplot-stem` class.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/css/boxplot/
     *         Box plot in styled mode
     * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
     *         Error bar styling
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since     3.0
     * @product   highcharts
     * @apioption plotOptions.boxplot.stemColor
     */
    /**
     * The dash style of the box.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/css/boxplot/
     *         Box plot in styled mode
     *
     * @type      {Highcharts.DashStyleValue}
     * @default   Solid
     * @since 8.1.0
     * @product   highcharts
     * @apioption plotOptions.boxplot.boxDashStyle
     */
    /**
     * The dash style of the median.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/css/boxplot/
     *         Box plot in styled mode
     *
     * @type      {Highcharts.DashStyleValue}
     * @default   Solid
     * @since 8.1.0
     * @product   highcharts
     * @apioption plotOptions.boxplot.medianDashStyle
     */
    /**
     * The dash style of the stem, the vertical line extending from the
     * box to the whiskers.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/css/boxplot/
     *         Box plot in styled mode
     * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
     *         Error bar styling
     *
     * @type      {Highcharts.DashStyleValue}
     * @default   Solid
     * @since     3.0
     * @product   highcharts
     * @apioption plotOptions.boxplot.stemDashStyle
     */
    /**
     * The dash style of the whiskers.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/css/boxplot/
     *         Box plot in styled mode
     *
     * @type      {Highcharts.DashStyleValue}
     * @default   Solid
     * @since 8.1.0
     * @product   highcharts
     * @apioption plotOptions.boxplot.whiskerDashStyle
     */
    /**
     * The width of the stem, the vertical line extending from the box to
     * the whiskers. If `undefined`, the width is inherited from the
     * [lineWidth](#plotOptions.boxplot.lineWidth) option.
     *
     * In styled mode, the stem stroke width can be set with the
     * `.highcharts-boxplot-stem` class.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/css/boxplot/
     *         Box plot in styled mode
     * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
     *         Error bar styling
     *
     * @type      {number}
     * @since     3.0
     * @product   highcharts
     * @apioption plotOptions.boxplot.stemWidth
     */
    /**
     * @default   high
     * @apioption plotOptions.boxplot.colorKey
     */
    /**
     * The color of the whiskers, the horizontal lines marking low and high
     * values. When `undefined`, the general series color is used.
     *
     * In styled mode, the whisker stroke can be set with the
     * `.highcharts-boxplot-whisker` class .
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/css/boxplot/
     *         Box plot in styled mode
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since     3.0
     * @product   highcharts
     * @apioption plotOptions.boxplot.whiskerColor
     */
    /**
     * The line width of the whiskers, the horizontal lines marking low and
     * high values. When `undefined`, the general
     * [lineWidth](#plotOptions.boxplot.lineWidth) applies.
     *
     * In styled mode, the whisker stroke width can be set with the
     * `.highcharts-boxplot-whisker` class.
     *
     * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
     *         Box plot styling
     * @sample {highcharts} highcharts/css/boxplot/
     *         Box plot in styled mode
     *
     * @since   3.0
     * @product highcharts
     */
    whiskerWidth: 2
};
/**
 * A `boxplot` series. If the [type](#series.boxplot.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.boxplot
 * @excluding dataParser, dataURL, marker, stack, stacking, states,
 *            boostThreshold, boostBlending
 * @product   highcharts
 * @requires  highcharts-more
 * @apioption series.boxplot
 */
/**
 * An array of data points for the series. For the `boxplot` series
 * type, points can be given in the following ways:
 *
 * 1. An array of arrays with 6 or 5 values. In this case, the values correspond
 *    to `x,low,q1,median,q3,high`. If the first value is a string, it is
 *    applied as the name of the point, and the `x` value is inferred. The `x`
 *    value can also be omitted, in which case the inner arrays should be of
 *    length 5. Then the `x` value is automatically calculated, either starting
 *    at 0 and incremented by 1, or from `pointStart` and `pointInterval` given
 *    in the series options.
 *    ```js
 *    data: [
 *        [0, 3, 0, 10, 3, 5],
 *        [1, 7, 8, 7, 2, 9],
 *        [2, 6, 9, 5, 1, 3]
 *    ]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.boxplot.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        low: 4,
 *        q1: 9,
 *        median: 9,
 *        q3: 1,
 *        high: 10,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        low: 5,
 *        q1: 7,
 *        median: 3,
 *        q3: 6,
 *        high: 2,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<Array<(number|string),number,number,number,number>|Array<(number|string),number,number,number,number,number>|*>}
 * @extends   series.line.data
 * @excluding marker
 * @product   highcharts
 * @apioption series.boxplot.data
 */
/**
 * The `high` value for each data point, signifying the highest value
 * in the sample set. The top whisker is drawn here.
 *
 * @type      {number}
 * @product   highcharts
 * @apioption series.boxplot.data.high
 */
/**
 * The `low` value for each data point, signifying the lowest value
 * in the sample set. The bottom whisker is drawn here.
 *
 * @type      {number}
 * @product   highcharts
 * @apioption series.boxplot.data.low
 */
/**
 * The median for each data point. This is drawn as a line through the
 * middle area of the box.
 *
 * @type      {number}
 * @product   highcharts
 * @apioption series.boxplot.data.median
 */
/**
 * The lower quartile for each data point. This is the bottom of the
 * box.
 *
 * @type      {number}
 * @product   highcharts
 * @apioption series.boxplot.data.q1
 */
/**
 * The higher quartile for each data point. This is the top of the box.
 *
 * @type      {number}
 * @product   highcharts
 * @apioption series.boxplot.data.q3
 */
/**
 * The dash style of the box.
 *
 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
 *         Box plot styling
 * @sample {highcharts} highcharts/css/boxplot/
 *         Box plot in styled mode
 *
 * @type      {Highcharts.DashStyleValue}
 * @default   Solid
 * @since 8.1.0
 * @product   highcharts
 * @apioption series.boxplot.data.boxDashStyle
 */
/**
 * The dash style of the median.
 *
 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
 *         Box plot styling
 * @sample {highcharts} highcharts/css/boxplot/
 *         Box plot in styled mode
 *
 * @type      {Highcharts.DashStyleValue}
 * @default   Solid
 * @since 8.1.0
 * @product   highcharts
 * @apioption series.boxplot.data.medianDashStyle
 */
/**
 * The dash style of the stem.
 *
 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
 *         Box plot styling
 * @sample {highcharts} highcharts/css/boxplot/
 *         Box plot in styled mode
 *
 * @type      {Highcharts.DashStyleValue}
 * @default   Solid
 * @since 8.1.0
 * @product   highcharts
 * @apioption series.boxplot.data.stemDashStyle
 */
/**
 * The dash style of the whiskers.
 *
 * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
 *         Box plot styling
 * @sample {highcharts} highcharts/css/boxplot/
 *         Box plot in styled mode
 *
 * @type      {Highcharts.DashStyleValue}
 * @default   Solid
 * @since 8.1.0
 * @product   highcharts
 * @apioption series.boxplot.data.whiskerDashStyle
 */
''; // Keeps doclets above separate
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const BoxPlot_BoxPlotSeriesDefaults = (BoxPlotSeriesDefaults);

;// external ["./highcharts.src.js","default","Series","types","column"]
const external_highcharts_src_js_default_Series_types_column_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__["default"].Series.types.column;
var external_highcharts_src_js_default_Series_types_column_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_Series_types_column_namespaceObject);
;// ./code/es-modules/Series/BoxPlot/BoxPlotSeries.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { noop: BoxPlotSeries_noop } = (external_highcharts_src_js_default_default());


const { crisp, extend: BoxPlotSeries_extend, merge: BoxPlotSeries_merge, pick: BoxPlotSeries_pick, relativeLength: BoxPlotSeries_relativeLength } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The boxplot series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes#boxplot
 *
 * @augments Highcharts.Series
 */
class BoxPlotSeries extends (external_highcharts_src_js_default_Series_types_column_default()) {
    /* *
     *
     *  Functions
     *
     * */
    // Get presentational attributes
    pointAttribs() {
        // No attributes should be set on point.graphic which is the group
        return {};
    }
    // Get an SVGPath object for both whiskers
    getWhiskerPair(halfWidth, stemX, upperWhiskerLength, lowerWhiskerLength, point) {
        const strokeWidth = point.whiskers.strokeWidth(), getWhisker = (xLen, yPos) => {
            const halfLen = BoxPlotSeries_relativeLength(xLen, 2 * halfWidth) / 2, crispedYPos = crisp(yPos, strokeWidth);
            return [
                [
                    'M',
                    crisp(stemX - halfLen),
                    crispedYPos
                ],
                [
                    'L',
                    crisp(stemX + halfLen),
                    crispedYPos
                ]
            ];
        };
        return [
            ...getWhisker(upperWhiskerLength, point.highPlot),
            ...getWhisker(lowerWhiskerLength, point.lowPlot)
        ];
    }
    // Translate data points from raw values x and y to plotX and plotY
    translate() {
        const series = this, yAxis = series.yAxis, pointArrayMap = series.pointArrayMap;
        super.translate.apply(series);
        // Do the translation on each point dimension
        series.points.forEach(function (point) {
            pointArrayMap.forEach(function (key) {
                if (point[key] !== null) {
                    point[key + 'Plot'] = yAxis.translate(point[key], 0, 1, 0, 1);
                }
            });
            point.plotHigh = point.highPlot; // For data label validation
        });
    }
    /**
     * Draw the data points
     * @private
     */
    drawPoints() {
        const series = this, points = series.points, options = series.options, chart = series.chart, renderer = chart.renderer, 
        // Error bar inherits this series type but doesn't do quartiles
        doQuartiles = series.doQuartiles !== false, whiskerLength = series.options.whiskerLength;
        let q1Plot, q3Plot, highPlot, lowPlot, medianPlot, medianPath, boxPath, graphic, width, x, right;
        for (const point of points) {
            graphic = point.graphic;
            const verb = graphic ? 'animate' : 'attr', shapeArgs = point.shapeArgs, boxAttr = {}, stemAttr = {}, whiskersAttr = {}, medianAttr = {}, color = point.color || series.color, pointWhiskerLength = (point.options.whiskerLength ||
                whiskerLength);
            if (typeof point.plotY !== 'undefined') {
                // Vector coordinates
                width = shapeArgs.width;
                x = shapeArgs.x;
                right = x + width;
                q1Plot = doQuartiles ? point.q1Plot : point.lowPlot;
                q3Plot = doQuartiles ? point.q3Plot : point.lowPlot;
                highPlot = point.highPlot;
                lowPlot = point.lowPlot;
                if (!graphic) {
                    point.graphic = graphic = renderer.g('point')
                        .add(series.group);
                    point.stem = renderer.path()
                        .addClass('highcharts-boxplot-stem')
                        .add(graphic);
                    if (whiskerLength) {
                        point.whiskers = renderer.path()
                            .addClass('highcharts-boxplot-whisker')
                            .add(graphic);
                    }
                    if (doQuartiles) {
                        point.box = renderer.path(boxPath)
                            .addClass('highcharts-boxplot-box')
                            .add(graphic);
                    }
                    point.medianShape = renderer.path(medianPath)
                        .addClass('highcharts-boxplot-median')
                        .add(graphic);
                }
                if (!chart.styledMode) {
                    // Stem attributes
                    stemAttr.stroke =
                        point.stemColor || options.stemColor || color;
                    stemAttr['stroke-width'] = BoxPlotSeries_pick(point.stemWidth, options.stemWidth, options.lineWidth);
                    stemAttr.dashstyle = (point.stemDashStyle ||
                        options.stemDashStyle ||
                        options.dashStyle);
                    point.stem.attr(stemAttr);
                    // Whiskers attributes
                    if (pointWhiskerLength) {
                        whiskersAttr.stroke = (point.whiskerColor ||
                            options.whiskerColor ||
                            color);
                        whiskersAttr['stroke-width'] = BoxPlotSeries_pick(point.whiskerWidth, options.whiskerWidth, options.lineWidth);
                        whiskersAttr.dashstyle = (point.whiskerDashStyle ||
                            options.whiskerDashStyle ||
                            options.dashStyle);
                        point.whiskers.attr(whiskersAttr);
                    }
                    if (doQuartiles) {
                        boxAttr.fill = (point.fillColor ||
                            options.fillColor ||
                            color);
                        boxAttr.stroke = options.lineColor || color;
                        boxAttr['stroke-width'] = options.lineWidth || 0;
                        boxAttr.dashstyle = (point.boxDashStyle ||
                            options.boxDashStyle ||
                            options.dashStyle);
                        point.box.attr(boxAttr);
                    }
                    // Median attributes
                    medianAttr.stroke = (point.medianColor ||
                        options.medianColor ||
                        color);
                    medianAttr['stroke-width'] = BoxPlotSeries_pick(point.medianWidth, options.medianWidth, options.lineWidth);
                    medianAttr.dashstyle = (point.medianDashStyle ||
                        options.medianDashStyle ||
                        options.dashStyle);
                    point.medianShape.attr(medianAttr);
                }
                let d;
                // The stem
                const stemX = crisp((point.plotX || 0) + (series.pointXOffset || 0) +
                    ((series.barW || 0) / 2), point.stem.strokeWidth());
                d = [
                    // Stem up
                    ['M', stemX, q3Plot],
                    ['L', stemX, highPlot],
                    // Stem down
                    ['M', stemX, q1Plot],
                    ['L', stemX, lowPlot]
                ];
                point.stem[verb]({ d });
                // The box
                if (doQuartiles) {
                    const boxStrokeWidth = point.box.strokeWidth();
                    q1Plot = crisp(q1Plot, boxStrokeWidth);
                    q3Plot = crisp(q3Plot, boxStrokeWidth);
                    x = crisp(x, boxStrokeWidth);
                    right = crisp(right, boxStrokeWidth);
                    d = [
                        ['M', x, q3Plot],
                        ['L', x, q1Plot],
                        ['L', right, q1Plot],
                        ['L', right, q3Plot],
                        ['L', x, q3Plot],
                        ['Z']
                    ];
                    point.box[verb]({ d });
                }
                // The whiskers
                if (pointWhiskerLength) {
                    const halfWidth = width / 2, whiskers = this.getWhiskerPair(halfWidth, stemX, (point.upperWhiskerLength ??
                        options.upperWhiskerLength ??
                        pointWhiskerLength), (point.lowerWhiskerLength ??
                        options.lowerWhiskerLength ??
                        pointWhiskerLength), point);
                    point.whiskers[verb]({ d: whiskers });
                }
                // The median
                medianPlot = crisp(point.medianPlot, point.medianShape.strokeWidth());
                d = [
                    ['M', x, medianPlot],
                    ['L', right, medianPlot]
                ];
                point.medianShape[verb]({ d });
            }
        }
    }
    // Return a plain array for speedy calculation
    toYData(point) {
        return [point.low, point.q1, point.median, point.q3, point.high];
    }
}
/* *
 *
 *  Static Properties
 *
 * */
BoxPlotSeries.defaultOptions = BoxPlotSeries_merge((external_highcharts_src_js_default_Series_types_column_default()).defaultOptions, BoxPlot_BoxPlotSeriesDefaults);
BoxPlotSeries_extend(BoxPlotSeries.prototype, {
    // Array point configs are mapped to this
    pointArrayMap: ['low', 'q1', 'median', 'q3', 'high'],
    // Defines the top of the tracker
    pointValKey: 'high',
    // Disable data labels for box plot
    drawDataLabels: BoxPlotSeries_noop,
    setStackedPoints: BoxPlotSeries_noop // #3890
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('boxplot', BoxPlotSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const BoxPlot_BoxPlotSeries = (BoxPlotSeries);

;// ./code/es-modules/Series/Bubble/BubbleLegendDefaults.js
/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Paweł Potaczek
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Constants
 *
 * */
/**
 * The bubble legend is an additional element in legend which
 * presents the scale of the bubble series. Individual bubble ranges
 * can be defined by user or calculated from series. In the case of
 * automatically calculated ranges, a 1px margin of error is
 * permitted.
 *
 * @since        7.0.0
 * @product      highcharts highstock highmaps
 * @requires     highcharts-more
 * @optionparent legend.bubbleLegend
 */
const BubbleLegendDefaults = {
    /**
     * The color of the ranges borders, can be also defined for an
     * individual range.
     *
     * @sample highcharts/bubble-legend/similartoseries/
     *         Similar look to the bubble series
     * @sample highcharts/bubble-legend/bordercolor/
     *         Individual bubble border color
     *
     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     */
    borderColor: void 0,
    /**
     * The width of the ranges borders in pixels, can be also
     * defined for an individual range.
     */
    borderWidth: 2,
    /**
     * An additional class name to apply to the bubble legend'
     * circle graphical elements. This option does not replace
     * default class names of the graphical element.
     *
     * @sample {highcharts} highcharts/css/bubble-legend/
     *         Styling by CSS
     *
     * @type {string}
     */
    className: void 0,
    /**
     * The main color of the bubble legend. Applies to ranges, if
     * individual color is not defined.
     *
     * @sample highcharts/bubble-legend/similartoseries/
     *         Similar look to the bubble series
     * @sample highcharts/bubble-legend/color/
     *         Individual bubble color
     *
     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     */
    color: void 0,
    /**
     * An additional class name to apply to the bubble legend's
     * connector graphical elements. This option does not replace
     * default class names of the graphical element.
     *
     * @sample {highcharts} highcharts/css/bubble-legend/
     *         Styling by CSS
     *
     * @type {string}
     */
    connectorClassName: void 0,
    /**
     * The color of the connector, can be also defined
     * for an individual range.
     *
     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     */
    connectorColor: void 0,
    /**
     * The length of the connectors in pixels. If labels are
     * centered, the distance is reduced to 0.
     *
     * @sample highcharts/bubble-legend/connectorandlabels/
     *         Increased connector length
     */
    connectorDistance: 60,
    /**
     * The width of the connectors in pixels.
     *
     * @sample highcharts/bubble-legend/connectorandlabels/
     *         Increased connector width
     */
    connectorWidth: 1,
    /**
     * Enable or disable the bubble legend.
     */
    enabled: false,
    /**
     * Options for the bubble legend labels.
     */
    labels: {
        /**
         * An additional class name to apply to the bubble legend
         * label graphical elements. This option does not replace
         * default class names of the graphical element.
         *
         * @sample {highcharts} highcharts/css/bubble-legend/
         *         Styling by CSS
         *
         * @type {string}
         */
        className: void 0,
        /**
         * Whether to allow data labels to overlap.
         */
        allowOverlap: false,
        /**
         * A format string for the bubble legend labels. Available
         * variables are the same as for `formatter`.
         *
         * @sample highcharts/bubble-legend/format/
         *         Add a unit
         *
         * @type {string}
         */
        format: '',
        /**
         * Available `this` properties are:
         *
         * - `this.value`: The bubble value.
         *
         * - `this.radius`: The radius of the bubble range.
         *
         * - `this.center`: The center y position of the range.
         *
         * @type {Highcharts.FormatterCallbackFunction<Highcharts.BubbleLegendFormatterContextObject>}
         */
        formatter: void 0,
        /**
         * The alignment of the labels compared to the bubble
         * legend. Can be one of `left`, `center` or `right`.
         *
         * @sample highcharts/bubble-legend/connectorandlabels/
         *         Labels on left
         *
         * @type {Highcharts.AlignValue}
         */
        align: 'right',
        /**
         * CSS styles for the labels.
         *
         * @type {Highcharts.CSSObject}
         */
        style: {
            /** @ignore-option */
            fontSize: '0.9em',
            /** @ignore-option */
            color: "#000000" /* Palette.neutralColor100 */
        },
        /**
         * The x position offset of the label relative to the
         * connector.
         */
        x: 0,
        /**
         * The y position offset of the label relative to the
         * connector.
         */
        y: 0
    },
    /**
     * Maximum bubble legend range size. If values for ranges are
     * not specified, the `minSize` and the `maxSize` are calculated
     * from bubble series.
     */
    maxSize: 60, // Number
    /**
     * Minimum bubble legend range size. If values for ranges are
     * not specified, the `minSize` and the `maxSize` are calculated
     * from bubble series.
     */
    minSize: 10, // Number
    /**
     * The position of the bubble legend in the legend.
     * @sample highcharts/bubble-legend/connectorandlabels/
     *         Bubble legend as last item in legend
     */
    legendIndex: 0, // Number
    /**
     * Options for specific range. One range consists of bubble,
     * label and connector.
     *
     * @sample highcharts/bubble-legend/ranges/
     *         Manually defined ranges
     * @sample highcharts/bubble-legend/autoranges/
     *         Auto calculated ranges
     *
     * @type {Array<*>}
     */
    ranges: {
        /**
         * Range size value, similar to bubble Z data.
         * @type {number}
         */
        value: void 0,
        /**
         * The color of the border for individual range.
         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         */
        borderColor: void 0,
        /**
         * The color of the bubble for individual range.
         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         */
        color: void 0,
        /**
         * The color of the connector for individual range.
         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         */
        connectorColor: void 0
    },
    /**
     * Whether the bubble legend range value should be represented
     * by the area or the width of the bubble. The default, area,
     * corresponds best to the human perception of the size of each
     * bubble.
     *
     * @sample highcharts/bubble-legend/ranges/
     *         Size by width
     *
     * @type {Highcharts.BubbleSizeByValue}
     */
    sizeBy: 'area',
    /**
     * When this is true, the absolute value of z determines the
     * size of the bubble. This means that with the default
     * zThreshold of 0, a bubble of value -1 will have the same size
     * as a bubble of value 1, while a bubble of value 0 will have a
     * smaller size according to minSize.
     */
    sizeByAbsoluteValue: false,
    /**
     * Define the visual z index of the bubble legend.
     */
    zIndex: 1,
    /**
     * Ranges with lower value than zThreshold are skipped.
     */
    zThreshold: 0
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Bubble_BubbleLegendDefaults = (BubbleLegendDefaults);

;// external ["./highcharts.src.js","default","Templating"]
const external_highcharts_src_js_default_Templating_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__["default"].Templating;
var external_highcharts_src_js_default_Templating_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_Templating_namespaceObject);
;// ./code/es-modules/Series/Bubble/BubbleLegendItem.js
/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Paweł Potaczek
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { noop: BubbleLegendItem_noop } = (external_highcharts_src_js_default_default());

const { arrayMax, arrayMin, isNumber: BubbleLegendItem_isNumber, merge: BubbleLegendItem_merge, pick: BubbleLegendItem_pick, stableSort } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * BubbleLegend class.
 *
 * @private
 * @class
 * @name Highcharts.BubbleLegend
 * @param {Highcharts.LegendBubbleLegendOptions} options
 * Options of BubbleLegendItem.
 *
 * @param {Highcharts.Legend} legend
 * Legend of item.
 */
class BubbleLegendItem {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(options, legend) {
        this.setState = BubbleLegendItem_noop;
        this.init(options, legend);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Create basic bubbleLegend properties similar to item in legend.
     * @private
     */
    init(options, legend) {
        this.options = options;
        this.visible = true;
        this.chart = legend.chart;
        this.legend = legend;
    }
    /**
     * Depending on the position option, add bubbleLegend to legend items.
     *
     * @private
     *
     * @param {Array<(Highcharts.Point|Highcharts.Series)>} items
     *        All legend items
     */
    addToLegend(items) {
        // Insert bubbleLegend into legend items
        items.splice(this.options.legendIndex, 0, this);
    }
    /**
     * Calculate ranges, sizes and call the next steps of bubbleLegend
     * creation.
     *
     * @private
     *
     * @param {Highcharts.Legend} legend
     *        Legend instance
     */
    drawLegendSymbol(legend) {
        const itemDistance = BubbleLegendItem_pick(legend.options.itemDistance, 20), legendItem = this.legendItem || {}, options = this.options, ranges = options.ranges, connectorDistance = options.connectorDistance;
        let connectorSpace;
        // Do not create bubbleLegend now if ranges or ranges values are not
        // specified or if are empty array.
        if (!ranges || !ranges.length || !BubbleLegendItem_isNumber(ranges[0].value)) {
            legend.options.bubbleLegend.autoRanges = true;
            return;
        }
        // Sort ranges to right render order
        stableSort(ranges, function (a, b) {
            return b.value - a.value;
        });
        this.ranges = ranges;
        this.setOptions();
        this.render();
        // Get max label size
        const maxLabel = this.getMaxLabelSize(), radius = this.ranges[0].radius, size = radius * 2;
        // Space for connectors and labels.
        connectorSpace =
            connectorDistance - radius + maxLabel.width;
        connectorSpace = connectorSpace > 0 ? connectorSpace : 0;
        this.maxLabel = maxLabel;
        this.movementX = options.labels.align === 'left' ?
            connectorSpace : 0;
        legendItem.labelWidth = size + connectorSpace + itemDistance;
        legendItem.labelHeight = size + maxLabel.height / 2;
    }
    /**
     * Set style options for each bubbleLegend range.
     * @private
     */
    setOptions() {
        const ranges = this.ranges, options = this.options, series = this.chart.series[options.seriesIndex], baseline = this.legend.baseline, bubbleAttribs = {
            zIndex: options.zIndex,
            'stroke-width': options.borderWidth
        }, connectorAttribs = {
            zIndex: options.zIndex,
            'stroke-width': options.connectorWidth
        }, labelAttribs = {
            align: (this.legend.options.rtl ||
                options.labels.align === 'left') ? 'right' : 'left',
            zIndex: options.zIndex
        }, fillOpacity = series.options.marker.fillOpacity, styledMode = this.chart.styledMode;
        // Allow to parts of styles be used individually for range
        ranges.forEach(function (range, i) {
            if (!styledMode) {
                bubbleAttribs.stroke = BubbleLegendItem_pick(range.borderColor, options.borderColor, series.color);
                bubbleAttribs.fill = range.color || options.color;
                if (!bubbleAttribs.fill) {
                    bubbleAttribs.fill = series.color;
                    bubbleAttribs['fill-opacity'] = fillOpacity ?? 1;
                }
                connectorAttribs.stroke = BubbleLegendItem_pick(range.connectorColor, options.connectorColor, series.color);
            }
            // Set options needed for rendering each range
            ranges[i].radius = this.getRangeRadius(range.value);
            ranges[i] = BubbleLegendItem_merge(ranges[i], {
                center: (ranges[0].radius - ranges[i].radius +
                    baseline)
            });
            if (!styledMode) {
                BubbleLegendItem_merge(true, ranges[i], {
                    bubbleAttribs: BubbleLegendItem_merge(bubbleAttribs),
                    connectorAttribs: BubbleLegendItem_merge(connectorAttribs),
                    labelAttribs: labelAttribs
                });
            }
        }, this);
    }
    /**
     * Calculate radius for each bubble range,
     * used code from BubbleSeries.js 'getRadius' method.
     *
     * @private
     *
     * @param {number} value
     *        Range value
     *
     * @return {number|null}
     *         Radius for one range
     */
    getRangeRadius(value) {
        const options = this.options, seriesIndex = this.options.seriesIndex, bubbleSeries = this.chart.series[seriesIndex], zMax = options.ranges[0].value, zMin = options.ranges[options.ranges.length - 1].value, minSize = options.minSize, maxSize = options.maxSize;
        return bubbleSeries.getRadius.call(this, zMin, zMax, minSize, maxSize, value);
    }
    /**
     * Render the legendItem group.
     * @private
     */
    render() {
        const legendItem = this.legendItem || {}, renderer = this.chart.renderer, zThreshold = this.options.zThreshold;
        if (!this.symbols) {
            this.symbols = {
                connectors: [],
                bubbleItems: [],
                labels: []
            };
        }
        // Nesting SVG groups to enable handleOverflow
        legendItem.symbol = renderer.g('bubble-legend');
        legendItem.label = renderer.g('bubble-legend-item')
            .css(this.legend.itemStyle || {});
        // To enable default 'hideOverlappingLabels' method
        legendItem.symbol.translateX = 0;
        legendItem.symbol.translateY = 0;
        // To use handleOverflow method
        legendItem.symbol.add(legendItem.label);
        legendItem.label.add(legendItem.group);
        for (const range of this.ranges) {
            if (range.value >= zThreshold) {
                this.renderRange(range);
            }
        }
        this.hideOverlappingLabels();
    }
    /**
     * Render one range, consisting of bubble symbol, connector and label.
     *
     * @private
     *
     * @param {Highcharts.LegendBubbleLegendRangesOptions} range
     *        Range options
     */
    renderRange(range) {
        const mainRange = this.ranges[0], legend = this.legend, options = this.options, labelsOptions = options.labels, chart = this.chart, bubbleSeries = chart.series[options.seriesIndex], renderer = chart.renderer, symbols = this.symbols, labels = symbols.labels, elementCenter = range.center, absoluteRadius = Math.abs(range.radius), connectorDistance = options.connectorDistance || 0, labelsAlign = labelsOptions.align, rtl = legend.options.rtl, borderWidth = options.borderWidth, connectorWidth = options.connectorWidth, posX = mainRange.radius || 0, posY = elementCenter - absoluteRadius -
            borderWidth / 2 + connectorWidth / 2, crispMovement = (posY % 1 ? 1 : 0.5) -
            (connectorWidth % 2 ? 0 : 0.5), styledMode = renderer.styledMode;
        let connectorLength = rtl || labelsAlign === 'left' ?
            -connectorDistance : connectorDistance;
        // Set options for centered labels
        if (labelsAlign === 'center') {
            connectorLength = 0; // Do not use connector
            options.connectorDistance = 0;
            range.labelAttribs.align = 'center';
        }
        // Render bubble symbol
        symbols.bubbleItems.push(renderer
            .circle(posX, elementCenter + crispMovement, absoluteRadius)
            .attr(styledMode ? {} : range.bubbleAttribs)
            .addClass((styledMode ?
            'highcharts-color-' +
                bubbleSeries.colorIndex + ' ' :
            '') +
            'highcharts-bubble-legend-symbol ' +
            (options.className || '')).add(this.legendItem.symbol));
        // Render connector
        symbols.connectors.push(renderer
            .path(renderer.crispLine([
            ['M', posX, posY],
            ['L', posX + connectorLength, posY]
        ], options.connectorWidth))
            .attr((styledMode ? {} : range.connectorAttribs))
            .addClass((styledMode ?
            'highcharts-color-' +
                this.options.seriesIndex + ' ' : '') +
            'highcharts-bubble-legend-connectors ' +
            (options.connectorClassName || '')).add(this.legendItem.symbol));
        // Render label
        const label = renderer
            .text(this.formatLabel(range))
            .attr((styledMode ? {} : range.labelAttribs))
            .css(styledMode ? {} : labelsOptions.style)
            .addClass('highcharts-bubble-legend-labels ' +
            (options.labels.className || '')).add(this.legendItem.symbol);
        // Now that the label is added we can read the bounding box and
        // vertically align
        const position = {
            x: posX + connectorLength + options.labels.x,
            y: posY + options.labels.y + label.getBBox().height * 0.4
        };
        label.attr(position);
        labels.push(label);
        // To enable default 'hideOverlappingLabels' method
        label.placed = true;
        label.alignAttr = position;
    }
    /**
     * Get the label which takes up the most space.
     * @private
     */
    getMaxLabelSize() {
        const labels = this.symbols.labels;
        let maxLabel, labelSize;
        labels.forEach(function (label) {
            labelSize = label.getBBox(true);
            if (maxLabel) {
                maxLabel = labelSize.width > maxLabel.width ?
                    labelSize : maxLabel;
            }
            else {
                maxLabel = labelSize;
            }
        });
        return maxLabel || {};
    }
    /**
     * Get formatted label for range.
     *
     * @private
     *
     * @param {Highcharts.LegendBubbleLegendRangesOptions} range
     *        Range options
     *
     * @return {string}
     *         Range label text
     */
    formatLabel(range) {
        const options = this.options, formatter = options.labels.formatter, format = options.labels.format;
        const { numberFormatter } = this.chart;
        return format ? external_highcharts_src_js_default_Templating_default().format(format, range, this.chart) :
            formatter ? formatter.call(range) :
                numberFormatter(range.value, 1);
    }
    /**
     * By using default chart 'hideOverlappingLabels' method, hide or show
     * labels and connectors.
     * @private
     */
    hideOverlappingLabels() {
        const chart = this.chart, allowOverlap = this.options.labels.allowOverlap, symbols = this.symbols;
        if (!allowOverlap && symbols) {
            chart.hideOverlappingLabels(symbols.labels);
            // Hide or show connectors
            symbols.labels.forEach(function (label, index) {
                if (!label.newOpacity) {
                    symbols.connectors[index].hide();
                }
                else if (label.newOpacity !== label.oldOpacity) {
                    symbols.connectors[index].show();
                }
            });
        }
    }
    /**
     * Calculate ranges from created series.
     *
     * @private
     *
     * @return {Array<Highcharts.LegendBubbleLegendRangesOptions>}
     *         Array of range objects
     */
    getRanges() {
        const bubbleLegend = this.legend.bubbleLegend, series = bubbleLegend.chart.series, rangesOptions = bubbleLegend.options.ranges;
        let ranges, zData, minZ = Number.MAX_VALUE, maxZ = -Number.MAX_VALUE;
        series.forEach(function (s) {
            // Find the min and max Z, like in bubble series
            if (s.isBubble && !s.ignoreSeries) {
                zData = s.getColumn('z').filter(BubbleLegendItem_isNumber);
                if (zData.length) {
                    minZ = BubbleLegendItem_pick(s.options.zMin, Math.min(minZ, Math.max(arrayMin(zData), s.options.displayNegative === false ?
                        s.options.zThreshold :
                        -Number.MAX_VALUE)));
                    maxZ = BubbleLegendItem_pick(s.options.zMax, Math.max(maxZ, arrayMax(zData)));
                }
            }
        });
        // Set values for ranges
        if (minZ === maxZ) {
            // Only one range if min and max values are the same.
            ranges = [{ value: maxZ }];
        }
        else {
            ranges = [
                { value: minZ },
                { value: (minZ + maxZ) / 2 },
                { value: maxZ, autoRanges: true }
            ];
        }
        // Prevent reverse order of ranges after redraw
        if (rangesOptions.length && rangesOptions[0].radius) {
            ranges.reverse();
        }
        // Merge ranges values with user options
        ranges.forEach(function (range, i) {
            if (rangesOptions && rangesOptions[i]) {
                ranges[i] = BubbleLegendItem_merge(rangesOptions[i], range);
            }
        });
        return ranges;
    }
    /**
     * Calculate bubble legend sizes from rendered series.
     *
     * @private
     *
     * @return {Array<number,number>}
     *         Calculated min and max bubble sizes
     */
    predictBubbleSizes() {
        const chart = this.chart, legendOptions = chart.legend.options, floating = legendOptions.floating, horizontal = legendOptions.layout === 'horizontal', lastLineHeight = horizontal ? chart.legend.lastLineHeight : 0, plotSizeX = chart.plotSizeX, plotSizeY = chart.plotSizeY, bubbleSeries = chart.series[this.options.seriesIndex], pxSizes = bubbleSeries.getPxExtremes(), minSize = Math.ceil(pxSizes.minPxSize), maxPxSize = Math.ceil(pxSizes.maxPxSize), plotSize = Math.min(plotSizeY, plotSizeX);
        let calculatedSize, maxSize = bubbleSeries.options.maxSize;
        // Calculate predicted max size of bubble
        if (floating || !(/%$/.test(maxSize))) {
            calculatedSize = maxPxSize;
        }
        else {
            maxSize = parseFloat(maxSize);
            calculatedSize = ((plotSize + lastLineHeight) * maxSize / 100) /
                (maxSize / 100 + 1);
            // Get maxPxSize from bubble series if calculated bubble legend
            // size will not affect to bubbles series.
            if ((horizontal && plotSizeY - calculatedSize >=
                plotSizeX) || (!horizontal && plotSizeX -
                calculatedSize >= plotSizeY)) {
                calculatedSize = maxPxSize;
            }
        }
        return [minSize, Math.ceil(calculatedSize)];
    }
    /**
     * Correct ranges with calculated sizes.
     * @private
     */
    updateRanges(min, max) {
        const bubbleLegendOptions = this.legend.options.bubbleLegend;
        bubbleLegendOptions.minSize = min;
        bubbleLegendOptions.maxSize = max;
        bubbleLegendOptions.ranges = this.getRanges();
    }
    /**
     * Because of the possibility of creating another legend line, predicted
     * bubble legend sizes may differ by a few pixels, so it is necessary to
     * correct them.
     * @private
     */
    correctSizes() {
        const legend = this.legend, chart = this.chart, bubbleSeries = chart.series[this.options.seriesIndex], pxSizes = bubbleSeries.getPxExtremes(), bubbleSeriesSize = pxSizes.maxPxSize, bubbleLegendSize = this.options.maxSize;
        if (Math.abs(Math.ceil(bubbleSeriesSize) - bubbleLegendSize) >
            1) {
            this.updateRanges(this.options.minSize, pxSizes.maxPxSize);
            legend.render();
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Bubble_BubbleLegendItem = (BubbleLegendItem);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @interface Highcharts.BubbleLegendFormatterContextObject
 */ /**
* The center y position of the range.
* @name Highcharts.BubbleLegendFormatterContextObject#center
* @type {number}
*/ /**
* The radius of the bubble range.
* @name Highcharts.BubbleLegendFormatterContextObject#radius
* @type {number}
*/ /**
* The bubble value.
* @name Highcharts.BubbleLegendFormatterContextObject#value
* @type {number}
*/
''; // Detach doclets above

;// ./code/es-modules/Series/Bubble/BubbleLegendComposition.js
/* *
 *
 *  (c) 2010-2025 Highsoft AS
 *
 *  Author: Paweł Potaczek
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { setOptions } = (external_highcharts_src_js_default_default());

const { composed } = (external_highcharts_src_js_default_default());

const { addEvent: BubbleLegendComposition_addEvent, objectEach, pushUnique, wrap } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * If ranges are not specified, determine ranges from rendered bubble series
 * and render legend again.
 */
function chartDrawChartBox(proceed, options, callback) {
    const chart = this, legend = chart.legend, bubbleSeries = getVisibleBubbleSeriesIndex(chart) >= 0;
    let bubbleLegendOptions, bubbleSizes, legendItem;
    if (legend && legend.options.enabled && legend.bubbleLegend &&
        legend.options.bubbleLegend.autoRanges && bubbleSeries) {
        bubbleLegendOptions = legend.bubbleLegend.options;
        bubbleSizes = legend.bubbleLegend.predictBubbleSizes();
        legend.bubbleLegend.updateRanges(bubbleSizes[0], bubbleSizes[1]);
        // Disable animation on init
        if (!bubbleLegendOptions.placed) {
            legend.group.placed = false;
            legend.allItems.forEach((item) => {
                legendItem = item.legendItem || {};
                if (legendItem.group) {
                    legendItem.group.translateY = void 0;
                }
            });
        }
        // Create legend with bubbleLegend
        legend.render();
        // Calculate margins after first rendering the bubble legend
        if (!bubbleLegendOptions.placed) {
            chart.getMargins();
            chart.axes.forEach((axis) => {
                axis.setScale();
                axis.updateNames();
                // Disable axis animation on init
                objectEach(axis.ticks, function (tick) {
                    tick.isNew = true;
                    tick.isNewLabel = true;
                });
            });
            chart.getMargins();
        }
        bubbleLegendOptions.placed = true;
        // Call default 'drawChartBox' method.
        proceed.call(chart, options, callback);
        // Check bubble legend sizes and correct them if necessary.
        legend.bubbleLegend.correctSizes();
        // Correct items positions with different dimensions in legend.
        retranslateItems(legend, getLinesHeights(legend));
    }
    else {
        proceed.call(chart, options, callback);
        // Allow color change on static bubble legend after click on legend
        if (legend && legend.options.enabled && legend.bubbleLegend) {
            legend.render();
            retranslateItems(legend, getLinesHeights(legend));
        }
    }
}
/**
 * Compose classes for use with Bubble series.
 * @private
 *
 * @param {Highcharts.Chart} ChartClass
 * Core chart class to use with Bubble series.
 *
 * @param {Highcharts.Legend} LegendClass
 * Core legend class to use with Bubble series.
 */
function BubbleLegendComposition_compose(ChartClass, LegendClass) {
    if (pushUnique(composed, 'Series.BubbleLegend')) {
        setOptions({
            // Set default bubble legend options
            legend: {
                bubbleLegend: Bubble_BubbleLegendDefaults
            }
        });
        wrap(ChartClass.prototype, 'drawChartBox', chartDrawChartBox);
        BubbleLegendComposition_addEvent(LegendClass, 'afterGetAllItems', onLegendAfterGetAllItems);
        BubbleLegendComposition_addEvent(LegendClass, 'itemClick', onLegendItemClick);
    }
}
/**
 * Check if there is at least one visible bubble series.
 *
 * @private
 * @function getVisibleBubbleSeriesIndex
 * @param {Highcharts.Chart} chart
 * Chart to check.
 * @return {number}
 * First visible bubble series index
 */
function getVisibleBubbleSeriesIndex(chart) {
    const series = chart.series;
    let i = 0;
    while (i < series.length) {
        if (series[i] &&
            series[i].isBubble &&
            series[i].visible &&
            series[i].dataTable.rowCount) {
            return i;
        }
        i++;
    }
    return -1;
}
/**
 * Calculate height for each row in legend.
 *
 * @private
 * @function getLinesHeights
 *
 * @param {Highcharts.Legend} legend
 * Legend to calculate from.
 *
 * @return {Array<Highcharts.Dictionary<number>>}
 * Informations about line height and items amount
 */
function getLinesHeights(legend) {
    const items = legend.allItems, lines = [], length = items.length;
    let lastLine, legendItem, legendItem2, i = 0, j = 0;
    for (i = 0; i < length; i++) {
        legendItem = items[i].legendItem || {};
        legendItem2 = (items[i + 1] || {}).legendItem || {};
        if (legendItem.labelHeight) {
            // For bubbleLegend
            items[i].itemHeight = legendItem.labelHeight;
        }
        if ( // Line break
        items[i] === items[length - 1] ||
            legendItem.y !== legendItem2.y) {
            lines.push({ height: 0 });
            lastLine = lines[lines.length - 1];
            // Find the highest item in line
            for (j; j <= i; j++) {
                if (items[j].itemHeight > lastLine.height) {
                    lastLine.height = items[j].itemHeight;
                }
            }
            lastLine.step = i;
        }
    }
    return lines;
}
/**
 * Start the bubble legend creation process.
 */
function onLegendAfterGetAllItems(e) {
    const legend = this, bubbleLegend = legend.bubbleLegend, legendOptions = legend.options, options = legendOptions.bubbleLegend, bubbleSeriesIndex = getVisibleBubbleSeriesIndex(legend.chart);
    // Remove unnecessary element
    if (bubbleLegend && bubbleLegend.ranges && bubbleLegend.ranges.length) {
        // Allow change the way of calculating ranges in update
        if (options.ranges.length) {
            options.autoRanges =
                !!options.ranges[0].autoRanges;
        }
        // Update bubbleLegend dimensions in each redraw
        legend.destroyItem(bubbleLegend);
    }
    // Create bubble legend
    if (bubbleSeriesIndex >= 0 &&
        legendOptions.enabled &&
        options.enabled) {
        options.seriesIndex = bubbleSeriesIndex;
        legend.bubbleLegend = new Bubble_BubbleLegendItem(options, legend);
        legend.bubbleLegend.addToLegend(e.allItems);
    }
}
/**
 * Toggle bubble legend depending on the visible status of bubble series.
 */
function onLegendItemClick(e) {
    // #14080 don't fire this code if click function is prevented
    if (e.defaultPrevented) {
        return false;
    }
    const legend = this, series = e.legendItem, chart = legend.chart, visible = series.visible;
    let status;
    if (legend && legend.bubbleLegend) {
        // Temporary correct 'visible' property
        series.visible = !visible;
        // Save future status for getRanges method
        series.ignoreSeries = visible;
        // Check if at lest one bubble series is visible
        status = getVisibleBubbleSeriesIndex(chart) >= 0;
        // Hide bubble legend if all bubble series are disabled
        if (legend.bubbleLegend.visible !== status) {
            // Show or hide bubble legend
            legend.update({
                bubbleLegend: { enabled: status }
            });
            legend.bubbleLegend.visible = status; // Restore default status
        }
        series.visible = visible;
    }
}
/**
 * Correct legend items translation in case of different elements heights.
 *
 * @private
 * @function Highcharts.Legend#retranslateItems
 *
 * @param {Highcharts.Legend} legend
 * Legend to translate in.
 *
 * @param {Array<Highcharts.Dictionary<number>>} lines
 * Informations about line height and items amount
 */
function retranslateItems(legend, lines) {
    const items = legend.allItems, rtl = legend.options.rtl;
    let orgTranslateX, orgTranslateY, movementX, legendItem, actualLine = 0;
    items.forEach((item, index) => {
        legendItem = item.legendItem || {};
        if (!legendItem.group) {
            return;
        }
        orgTranslateX = legendItem.group.translateX || 0;
        orgTranslateY = legendItem.y || 0;
        movementX = item.movementX;
        if (movementX || (rtl && item.ranges)) {
            movementX = rtl ?
                orgTranslateX - item.options.maxSize / 2 :
                orgTranslateX + movementX;
            legendItem.group.attr({ translateX: movementX });
        }
        if (index > lines[actualLine].step) {
            actualLine++;
        }
        legendItem.group.attr({
            translateY: Math.round(orgTranslateY + lines[actualLine].height / 2)
        });
        legendItem.y = orgTranslateY + lines[actualLine].height / 2;
    });
}
/* *
 *
 *  Default Export
 *
 * */
const BubbleLegendComposition = {
    compose: BubbleLegendComposition_compose
};
/* harmony default export */ const Bubble_BubbleLegendComposition = (BubbleLegendComposition);

;// external ["./highcharts.src.js","default","Point"]
const external_highcharts_src_js_default_Point_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__["default"].Point;
var external_highcharts_src_js_default_Point_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_Point_namespaceObject);
;// ./code/es-modules/Series/Bubble/BubblePoint.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { seriesTypes: { scatter: { prototype: { pointClass: ScatterPoint } } } } = (external_highcharts_src_js_default_SeriesRegistry_default());

const { extend: BubblePoint_extend } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
class BubblePoint extends ScatterPoint {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    haloPath(size) {
        const computedSize = (size && this.marker ?
            this.marker.radius ||
                0 :
            0) + size;
        if (this.series.chart.inverted) {
            const pos = this.pos() || [0, 0], { xAxis, yAxis, chart } = this.series, diameter = computedSize * 2;
            return chart.renderer.symbols.circle((xAxis?.len || 0) - pos[1] - computedSize, (yAxis?.len || 0) - pos[0] - computedSize, diameter, diameter);
        }
        return external_highcharts_src_js_default_Point_default().prototype.haloPath.call(this, 
        // #6067
        computedSize);
    }
}
/* *
 *
 *  Class Prototype
 *
 * */
BubblePoint_extend(BubblePoint.prototype, {
    ttBelow: false
});
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Bubble_BubblePoint = (BubblePoint);

;// ./code/es-modules/Series/Bubble/BubbleSeries.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { composed: BubbleSeries_composed, noop: BubbleSeries_noop } = (external_highcharts_src_js_default_default());

const { series: Series, seriesTypes: { column: { prototype: BubbleSeries_columnProto }, scatter: ScatterSeries } } = (external_highcharts_src_js_default_SeriesRegistry_default());

const { addEvent: BubbleSeries_addEvent, arrayMax: BubbleSeries_arrayMax, arrayMin: BubbleSeries_arrayMin, clamp, extend: BubbleSeries_extend, isNumber: BubbleSeries_isNumber, merge: BubbleSeries_merge, pick: BubbleSeries_pick, pushUnique: BubbleSeries_pushUnique } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * Add logic to pad each axis with the amount of pixels necessary to avoid the
 * bubbles to overflow.
 */
function onAxisFoundExtremes() {
    const axisLength = this.len, { coll, isXAxis, min } = this, range = (this.max || 0) - (min || 0);
    let pxMin = 0, pxMax = axisLength, transA = axisLength / range, hasActiveSeries;
    if (coll !== 'xAxis' && coll !== 'yAxis') {
        return;
    }
    // Handle padding on the second pass, or on redraw
    this.series.forEach((series) => {
        if (series.bubblePadding && series.reserveSpace()) {
            // Correction for #1673
            this.allowZoomOutside = true;
            hasActiveSeries = true;
            const data = series.getColumn(isXAxis ? 'x' : 'y');
            if (isXAxis) {
                (series.onPoint || series).getRadii(0, 0, series);
                if (series.onPoint) {
                    series.radii = series.onPoint.radii;
                }
            }
            if (range > 0) {
                let i = data.length;
                while (i--) {
                    if (BubbleSeries_isNumber(data[i]) &&
                        this.dataMin <= data[i] &&
                        data[i] <= this.max) {
                        const radius = series.radii && series.radii[i] || 0;
                        pxMin = Math.min(((data[i] - min) * transA) - radius, pxMin);
                        pxMax = Math.max(((data[i] - min) * transA) + radius, pxMax);
                    }
                }
            }
        }
    });
    // Apply the padding to the min and max properties
    if (hasActiveSeries && range > 0 && !this.logarithmic) {
        pxMax -= axisLength;
        transA *= (axisLength +
            Math.max(0, pxMin) - // #8901
            Math.min(pxMax, axisLength)) / axisLength;
        [
            ['min', 'userMin', pxMin],
            ['max', 'userMax', pxMax]
        ].forEach((keys) => {
            if (typeof BubbleSeries_pick(this.options[keys[0]], this[keys[1]]) === 'undefined') {
                this[keys[0]] += keys[2] / transA;
            }
        });
    }
}
/**
 * If a user has defined categories, it is necessary to retroactively hide any
 * ticks added by the 'onAxisFoundExtremes' function above (#21672).
 *
 * Otherwise they can show up on the axis, alongside user-defined categories.
 */
function onAxisAfterRender() {
    const { ticks, tickPositions, dataMin = 0, dataMax = 0, categories } = this, type = this.options.type;
    if ((categories?.length || type === 'category') &&
        this.series.find((s) => s.bubblePadding)) {
        let tickCount = tickPositions.length;
        while (tickCount--) {
            const tick = ticks[tickPositions[tickCount]], pos = tick.pos || 0;
            if (pos > dataMax || pos < dataMin) {
                tick.label?.hide();
            }
        }
    }
}
/* *
 *
 *  Class
 *
 * */
class BubbleSeries extends ScatterSeries {
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(AxisClass, ChartClass, LegendClass) {
        Bubble_BubbleLegendComposition.compose(ChartClass, LegendClass);
        if (BubbleSeries_pushUnique(BubbleSeries_composed, 'Series.Bubble')) {
            BubbleSeries_addEvent(AxisClass, 'foundExtremes', onAxisFoundExtremes);
            BubbleSeries_addEvent(AxisClass, 'afterRender', onAxisAfterRender);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Perform animation on the bubbles
     * @private
     */
    animate(init) {
        if (!init &&
            this.points.length < this.options.animationLimit // #8099
        ) {
            this.points.forEach(function (point) {
                const { graphic, plotX = 0, plotY = 0 } = point;
                if (graphic && graphic.width) { // URL symbols don't have width
                    // Start values
                    if (!this.hasRendered) {
                        graphic.attr({
                            x: plotX,
                            y: plotY,
                            width: 1,
                            height: 1
                        });
                    }
                    graphic.animate(this.markerAttribs(point), this.options.animation);
                }
            }, this);
        }
    }
    /**
     * Get the radius for each point based on the minSize, maxSize and each
     * point's Z value. This must be done prior to Series.translate because
     * the axis needs to add padding in accordance with the point sizes.
     * @private
     */
    getRadii() {
        const zData = this.getColumn('z'), yData = this.getColumn('y'), radii = [];
        let len, i, value, zExtremes = this.chart.bubbleZExtremes;
        const { minPxSize, maxPxSize } = this.getPxExtremes();
        // Get the collective Z extremes of all bubblish series. The chart-level
        // `bubbleZExtremes` are only computed once, and reset on `updatedData`
        // in any member series.
        if (!zExtremes) {
            let zMin = Number.MAX_VALUE;
            let zMax = -Number.MAX_VALUE;
            let valid;
            this.chart.series.forEach((otherSeries) => {
                if (otherSeries.bubblePadding && otherSeries.reserveSpace()) {
                    const zExtremes = (otherSeries.onPoint || otherSeries).getZExtremes();
                    if (zExtremes) {
                        // Changed '||' to 'pick' because min or max can be 0.
                        // #17280
                        zMin = Math.min(BubbleSeries_pick(zMin, zExtremes.zMin), zExtremes.zMin);
                        zMax = Math.max(BubbleSeries_pick(zMax, zExtremes.zMax), zExtremes.zMax);
                        valid = true;
                    }
                }
            });
            if (valid) {
                zExtremes = { zMin, zMax };
                this.chart.bubbleZExtremes = zExtremes;
            }
            else {
                zExtremes = { zMin: 0, zMax: 0 };
            }
        }
        // Set the shape type and arguments to be picked up in drawPoints
        for (i = 0, len = zData.length; i < len; i++) {
            value = zData[i];
            // Separate method to get individual radius for bubbleLegend
            radii.push(this.getRadius(zExtremes.zMin, zExtremes.zMax, minPxSize, maxPxSize, value, yData && yData[i]));
        }
        this.radii = radii;
    }
    /**
     * Get the individual radius for one point.
     * @private
     */
    getRadius(zMin, zMax, minSize, maxSize, value, yValue) {
        const options = this.options, sizeByArea = options.sizeBy !== 'width', zThreshold = options.zThreshold;
        let zRange = zMax - zMin, pos = 0.5;
        // #8608 - bubble should be visible when z is undefined
        if (yValue === null || value === null) {
            return null;
        }
        if (BubbleSeries_isNumber(value)) {
            // When sizing by threshold, the absolute value of z determines
            // the size of the bubble.
            if (options.sizeByAbsoluteValue) {
                value = Math.abs(value - zThreshold);
                zMax = zRange = Math.max(zMax - zThreshold, Math.abs(zMin - zThreshold));
                zMin = 0;
            }
            // Issue #4419 - if value is less than zMin, push a radius that's
            // always smaller than the minimum size
            if (value < zMin) {
                return minSize / 2 - 1;
            }
            // Relative size, a number between 0 and 1
            if (zRange > 0) {
                pos = (value - zMin) / zRange;
            }
        }
        if (sizeByArea && pos >= 0) {
            pos = Math.sqrt(pos);
        }
        return Math.ceil(minSize + pos * (maxSize - minSize)) / 2;
    }
    /**
     * Define hasData function for non-cartesian series.
     * Returns true if the series has points at all.
     * @private
     */
    hasData() {
        return !!this.dataTable.rowCount;
    }
    /**
     * @private
     */
    markerAttribs(point, state) {
        const attr = super.markerAttribs(point, state), { height = 0, width = 0 } = attr;
        // Bubble needs a specific `markerAttribs` override because the markers
        // are rendered into the potentially inverted `series.group`. Unlike
        // regular markers, which are rendered into the `markerGroup` (#21125).
        return this.chart.inverted ? BubbleSeries_extend(attr, {
            x: (point.plotX || 0) - width / 2,
            y: (point.plotY || 0) - height / 2
        }) : attr;
    }
    /**
     * @private
     */
    pointAttribs(point, state) {
        const markerOptions = this.options.marker, fillOpacity = markerOptions?.fillOpacity, attr = Series.prototype.pointAttribs.call(this, point, state);
        attr['fill-opacity'] = fillOpacity ?? 1;
        return attr;
    }
    /**
     * Extend the base translate method to handle bubble size
     * @private
     */
    translate() {
        // Run the parent method
        super.translate.call(this);
        this.getRadii();
        this.translateBubble();
    }
    translateBubble() {
        const { data, options, radii } = this, { minPxSize } = this.getPxExtremes();
        // Set the shape type and arguments to be picked up in drawPoints
        let i = data.length;
        while (i--) {
            const point = data[i], radius = radii ? radii[i] : 0; // #1737
            // Negative points means negative z values (#9728)
            if (this.zoneAxis === 'z') {
                point.negative = (point.z || 0) < (options.zThreshold || 0);
            }
            if (BubbleSeries_isNumber(radius) && radius >= minPxSize / 2) {
                // Shape arguments
                point.marker = BubbleSeries_extend(point.marker, {
                    radius,
                    width: 2 * radius,
                    height: 2 * radius
                });
                // Alignment box for the data label
                point.dlBox = {
                    x: point.plotX - radius,
                    y: point.plotY - radius,
                    width: 2 * radius,
                    height: 2 * radius
                };
            }
            else { // Below zThreshold
                // #1691
                point.shapeArgs = point.plotY = point.dlBox = void 0;
                point.isInside = false; // #17281
            }
        }
    }
    getPxExtremes() {
        const smallestSize = Math.min(this.chart.plotWidth, this.chart.plotHeight);
        const getPxSize = (length) => {
            let isPercent;
            if (typeof length === 'string') {
                isPercent = /%$/.test(length);
                length = parseInt(length, 10);
            }
            return isPercent ? smallestSize * length / 100 : length;
        };
        const minPxSize = getPxSize(BubbleSeries_pick(this.options.minSize, 8));
        // Prioritize min size if conflict to make sure bubbles are
        // always visible. #5873
        const maxPxSize = Math.max(getPxSize(BubbleSeries_pick(this.options.maxSize, '20%')), minPxSize);
        return { minPxSize, maxPxSize };
    }
    getZExtremes() {
        const options = this.options, zData = this.getColumn('z').filter(BubbleSeries_isNumber);
        if (zData.length) {
            const zMin = BubbleSeries_pick(options.zMin, clamp(BubbleSeries_arrayMin(zData), options.displayNegative === false ?
                (options.zThreshold || 0) :
                -Number.MAX_VALUE, Number.MAX_VALUE));
            const zMax = BubbleSeries_pick(options.zMax, BubbleSeries_arrayMax(zData));
            if (BubbleSeries_isNumber(zMin) && BubbleSeries_isNumber(zMax)) {
                return { zMin, zMax };
            }
        }
    }
    /**
     * @private
     * @function Highcharts.Series#searchKDTree
     */
    searchKDTree(point, compareX, e, suppliedPointEvaluator = BubbleSeries_noop, suppliedBSideCheckEvaluator = BubbleSeries_noop) {
        suppliedPointEvaluator = (p1, p2, comparisonProp) => {
            const p1Dist = p1[comparisonProp] || 0;
            const p2Dist = p2[comparisonProp] || 0;
            let ret, flip = false;
            if (p1Dist === p2Dist) {
                ret = p1.index > p2.index ? p1 : p2;
            }
            else if (p1Dist < 0 && p2Dist < 0) {
                ret = (p1Dist - (p1.marker?.radius || 0) >=
                    p2Dist - (p2.marker?.radius || 0)) ?
                    p1 :
                    p2;
                flip = true;
            }
            else {
                ret = p1Dist < p2Dist ? p1 : p2;
            }
            return [ret, flip];
        };
        suppliedBSideCheckEvaluator = (a, b, flip) => !flip && (a > b) || (a < b);
        return super.searchKDTree(point, compareX, e, suppliedPointEvaluator, suppliedBSideCheckEvaluator);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
/**
 * A bubble series is a three dimensional series type where each point
 * renders an X, Y and Z value. Each points is drawn as a bubble where the
 * position along the X and Y axes mark the X and Y values, and the size of
 * the bubble relates to the Z value.
 *
 * @sample {highcharts} highcharts/demo/bubble/
 *         Bubble chart
 *
 * @extends      plotOptions.scatter
 * @excluding    cluster
 * @product      highcharts highstock
 * @requires     highcharts-more
 * @optionparent plotOptions.bubble
 */
BubbleSeries.defaultOptions = BubbleSeries_merge(ScatterSeries.defaultOptions, {
    dataLabels: {
        formatter: function () {
            const { numberFormatter } = this.series.chart;
            const { z } = this.point;
            return BubbleSeries_isNumber(z) ? numberFormatter(z, -1) : '';
        },
        inside: true,
        verticalAlign: 'middle'
    },
    /**
     * If there are more points in the series than the `animationLimit`, the
     * animation won't run. Animation affects overall performance and
     * doesn't work well with heavy data series.
     *
     * @since 6.1.0
     */
    animationLimit: 250,
    /**
     * Whether to display negative sized bubbles. The threshold is given
     * by the [zThreshold](#plotOptions.bubble.zThreshold) option, and negative
     * bubbles can be visualized by setting
     * [negativeColor](#plotOptions.bubble.negativeColor).
     *
     * @sample {highcharts} highcharts/plotoptions/bubble-negative/
     *         Negative bubbles
     *
     * @type      {boolean}
     * @default   true
     * @since     3.0
     * @apioption plotOptions.bubble.displayNegative
     */
    /**
     * @extends   plotOptions.series.marker
     * @excluding enabled, enabledThreshold, height, radius, width
     */
    marker: {
        lineColor: null, // Inherit from series.color
        lineWidth: 1,
        /**
         * The fill opacity of the bubble markers.
         */
        fillOpacity: 0.5,
        /**
         * In bubble charts, the radius is overridden and determined based
         * on the point's data value.
         *
         * @ignore-option
         */
        radius: null,
        states: {
            hover: {
                radiusPlus: 0
            }
        },
        /**
         * A predefined shape or symbol for the marker. Possible values are
         * "circle", "square", "diamond", "triangle" and "triangle-down".
         *
         * Additionally, the URL to a graphic can be given on the form
         * `url(graphic.png)`. Note that for the image to be applied to
         * exported charts, its URL needs to be accessible by the export
         * server.
         *
         * Custom callbacks for symbol path generation can also be added to
         * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
         * used by its method name, as shown in the demo.
         *
         * @sample {highcharts} highcharts/plotoptions/bubble-symbol/
         *         Bubble chart with various symbols
         * @sample {highcharts} highcharts/plotoptions/series-marker-symbol/
         *         General chart with predefined, graphic and custom markers
         *
         * @type  {Highcharts.SymbolKeyValue|string}
         * @since 5.0.11
         */
        symbol: 'circle'
    },
    /**
     * Minimum bubble size. Bubbles will automatically size between the
     * `minSize` and `maxSize` to reflect the `z` value of each bubble.
     * Can be either pixels (when no unit is given), or a percentage of
     * the smallest one of the plot width and height.
     *
     * @sample {highcharts} highcharts/plotoptions/bubble-size/
     *         Bubble size
     *
     * @type    {number|string}
     * @since   3.0
     * @product highcharts highstock
     */
    minSize: 8,
    /**
     * Maximum bubble size. Bubbles will automatically size between the
     * `minSize` and `maxSize` to reflect the `z` value of each bubble.
     * Can be either pixels (when no unit is given), or a percentage of
     * the smallest one of the plot width and height.
     *
     * @sample {highcharts} highcharts/plotoptions/bubble-size/
     *         Bubble size
     *
     * @type    {number|string}
     * @since   3.0
     * @product highcharts highstock
     */
    maxSize: '20%',
    /**
     * When a point's Z value is below the
     * [zThreshold](#plotOptions.bubble.zThreshold)
     * setting, this color is used.
     *
     * @sample {highcharts} highcharts/plotoptions/bubble-negative/
     *         Negative bubbles
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since     3.0
     * @product   highcharts
     * @apioption plotOptions.bubble.negativeColor
     */
    /**
     * Whether the bubble's value should be represented by the area or the
     * width of the bubble. The default, `area`, corresponds best to the
     * human perception of the size of each bubble.
     *
     * @sample {highcharts} highcharts/plotoptions/bubble-sizeby/
     *         Comparison of area and size
     *
     * @type       {Highcharts.BubbleSizeByValue}
     * @default    area
     * @since      3.0.7
     * @apioption  plotOptions.bubble.sizeBy
     */
    /**
     * When this is true, the absolute value of z determines the size of
     * the bubble. This means that with the default `zThreshold` of 0, a
     * bubble of value -1 will have the same size as a bubble of value 1,
     * while a bubble of value 0 will have a smaller size according to
     * `minSize`.
     *
     * @sample    {highcharts} highcharts/plotoptions/bubble-sizebyabsolutevalue/
     *            Size by absolute value, various thresholds
     *
     * @type      {boolean}
     * @default   false
     * @since     4.1.9
     * @product   highcharts
     * @apioption plotOptions.bubble.sizeByAbsoluteValue
     */
    /**
     * When this is true, the series will not cause the Y axis to cross
     * the zero plane (or [threshold](#plotOptions.series.threshold) option)
     * unless the data actually crosses the plane.
     *
     * For example, if `softThreshold` is `false`, a series of 0, 1, 2,
     * 3 will make the Y axis show negative values according to the
     * `minPadding` option. If `softThreshold` is `true`, the Y axis starts
     * at 0.
     *
     * @since   4.1.9
     * @product highcharts
     */
    softThreshold: false,
    states: {
        hover: {
            halo: {
                size: 5
            }
        }
    },
    tooltip: {
        pointFormat: '({point.x}, {point.y}), Size: {point.z}'
    },
    turboThreshold: 0,
    /**
     * The minimum for the Z value range. Defaults to the highest Z value
     * in the data.
     *
     * @see [zMin](#plotOptions.bubble.zMin)
     *
     * @sample {highcharts} highcharts/plotoptions/bubble-zmin-zmax/
     *         Z has a possible range of 0-100
     *
     * @type      {number}
     * @since     4.0.3
     * @product   highcharts
     * @apioption plotOptions.bubble.zMax
     */
    /**
     * @default   z
     * @apioption plotOptions.bubble.colorKey
     */
    /**
     * The minimum for the Z value range. Defaults to the lowest Z value
     * in the data.
     *
     * @see [zMax](#plotOptions.bubble.zMax)
     *
     * @sample {highcharts} highcharts/plotoptions/bubble-zmin-zmax/
     *         Z has a possible range of 0-100
     *
     * @type      {number}
     * @since     4.0.3
     * @product   highcharts
     * @apioption plotOptions.bubble.zMin
     */
    /**
     * When [displayNegative](#plotOptions.bubble.displayNegative) is `false`,
     * bubbles with lower Z values are skipped. When `displayNegative`
     * is `true` and a [negativeColor](#plotOptions.bubble.negativeColor)
     * is given, points with lower Z is colored.
     *
     * @sample {highcharts} highcharts/plotoptions/bubble-negative/
     *         Negative bubbles
     *
     * @since   3.0
     * @product highcharts
     */
    zThreshold: 0,
    zoneAxis: 'z'
});
BubbleSeries_extend(BubbleSeries.prototype, {
    alignDataLabel: BubbleSeries_columnProto.alignDataLabel,
    applyZones: BubbleSeries_noop,
    bubblePadding: true,
    isBubble: true,
    keysAffectYAxis: ['y'],
    pointArrayMap: ['y', 'z'],
    pointClass: Bubble_BubblePoint,
    parallelArrays: ['x', 'y', 'z'],
    trackerGroups: ['group', 'dataLabelsGroup'],
    specialGroup: 'group', // To allow clipping (#6296)
    zoneAxis: 'z'
});
// On updated data in any series, delete the chart-level Z extremes cache
BubbleSeries_addEvent(BubbleSeries, 'updatedData', (e) => {
    delete e.target.chart.bubbleZExtremes;
});
// After removing series, delete the chart-level Z extremes cache, #17502.
BubbleSeries_addEvent(BubbleSeries, 'remove', (e) => {
    delete e.target.chart.bubbleZExtremes;
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('bubble', BubbleSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Bubble_BubbleSeries = (BubbleSeries);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @typedef {"area"|"width"} Highcharts.BubbleSizeByValue
 */
''; // Detach doclets above
/* *
 *
 *  API Options
 *
 * */
/**
 * A `bubble` series. If the [type](#series.bubble.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.bubble
 * @excluding dataParser, dataURL, legendSymbolColor, stack
 * @product   highcharts highstock
 * @requires  highcharts-more
 * @apioption series.bubble
 */
/**
 * An array of data points for the series. For the `bubble` series type,
 * points can be given in the following ways:
 *
 * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
 *    to `x,y,z`. If the first value is a string, it is applied as the name of
 *    the point, and the `x` value is inferred. The `x` value can also be
 *    omitted, in which case the inner arrays should be of length 2\. Then the
 *    `x` value is automatically calculated, either starting at 0 and
 *    incremented by 1, or from `pointStart` and `pointInterval` given in the
 *    series options.
 *    ```js
 *    data: [
 *        [0, 1, 2],
 *        [1, 5, 5],
 *        [2, 0, 2]
 *    ]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.bubble.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        y: 1,
 *        z: 1,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        y: 5,
 *        z: 4,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
 * @extends   series.line.data
 * @product   highcharts
 * @apioption series.bubble.data
 */
/**
 * @extends     series.line.data.marker
 * @excluding   enabledThreshold, height, radius, width
 * @product     highcharts
 * @apioption   series.bubble.data.marker
 */
/**
 * The size value for each bubble. The bubbles' diameters are computed
 * based on the `z`, and controlled by series options like `minSize`,
 * `maxSize`, `sizeBy`, `zMin` and `zMax`.
 *
 * @type      {number|null}
 * @product   highcharts
 * @apioption series.bubble.data.z
 */
/**
 * @excluding enabled, enabledThreshold, height, radius, width
 * @apioption series.bubble.marker
 */
''; // Adds doclets above to transpiled file

;// ./code/es-modules/Series/ColumnRange/ColumnRangePoint.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { seriesTypes: { column: { prototype: { pointClass: { prototype: ColumnRangePoint_columnProto } } }, arearange: { prototype: { pointClass: ColumnRangePoint_AreaRangePoint } } } } = (external_highcharts_src_js_default_SeriesRegistry_default());

const { extend: ColumnRangePoint_extend, isNumber: ColumnRangePoint_isNumber } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
class ColumnRangePoint extends ColumnRangePoint_AreaRangePoint {
    /* *
     *
     *  Functions
     *
     * */
    isValid() {
        return ColumnRangePoint_isNumber(this.low);
    }
}
ColumnRangePoint_extend(ColumnRangePoint.prototype, {
    setState: ColumnRangePoint_columnProto.setState
});
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const ColumnRange_ColumnRangePoint = (ColumnRangePoint);

;// ./code/es-modules/Series/ColumnRange/ColumnRangeSeries.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { noop: ColumnRangeSeries_noop } = (external_highcharts_src_js_default_default());

const { seriesTypes: { arearange: ColumnRangeSeries_AreaRangeSeries, column: ColumnSeries, column: { prototype: ColumnRangeSeries_columnProto } } } = (external_highcharts_src_js_default_SeriesRegistry_default());

const { addEvent: ColumnRangeSeries_addEvent, clamp: ColumnRangeSeries_clamp, extend: ColumnRangeSeries_extend, isNumber: ColumnRangeSeries_isNumber, merge: ColumnRangeSeries_merge, pick: ColumnRangeSeries_pick } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Constants
 *
 * */
/**
 * The column range is a cartesian series type with higher and lower
 * Y values along an X axis. To display horizontal bars, set
 * [chart.inverted](#chart.inverted) to `true`.
 *
 * @sample {highcharts|highstock} highcharts/demo/columnrange/
 *         Inverted column range
 *
 * @extends      plotOptions.column
 * @since        2.3.0
 * @excluding    negativeColor, stacking, softThreshold, threshold
 * @product      highcharts highstock
 * @requires     highcharts-more
 * @optionparent plotOptions.columnrange
 */
const columnRangeOptions = {
    borderRadius: {
        where: 'all'
    },
    /**
     * Extended data labels for range series types. Range series data labels
     * have no `x` and `y` options. Instead, they have `xLow`, `xHigh`,
     * `yLow` and `yHigh` options to allow the higher and lower data label
     * sets individually.
     *
     * @declare   Highcharts.SeriesAreaRangeDataLabelsOptionsObject
     * @extends   plotOptions.arearange.dataLabels
     * @since     2.3.0
     * @product   highcharts highstock
     * @apioption plotOptions.columnrange.dataLabels
     */
    pointRange: null,
    legendSymbol: 'rectangle',
    /** @ignore-option */
    marker: null,
    states: {
        hover: {
            /** @ignore-option */
            halo: false
        }
    }
};
/* *
 *
 *  Class
 *
 * */
/**
 * The ColumnRangeSeries class
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.columnrange
 *
 * @augments Highcharts.Series
 */
class ColumnRangeSeries extends ColumnRangeSeries_AreaRangeSeries {
    /* *
     *
     *  Functions
     *
     * */
    setOptions() {
        // #14359 Prevent side-effect from stacking.
        ColumnRangeSeries_merge(true, arguments[0], { stacking: void 0 });
        return ColumnRangeSeries_AreaRangeSeries.prototype.setOptions.apply(this, arguments);
    }
    // Overrides from modules that may be loaded after this module
    // @todo move to compositions
    translate() {
        return ColumnRangeSeries_columnProto.translate.apply(this);
    }
    // Public crispCol(): BBoxObject {
    //     return columnProto.crispCol.apply(this, arguments as any);
    // }
    // public drawPoints(): void {
    //     return columnProto.drawPoints.apply(this, arguments as any);
    // }
    // public drawTracker(): void {
    //     return columnProto.drawTracker.apply(this, arguments as any);
    // }
    // public getColumnMetrics(): ColumnMetricsObject {
    //     return columnProto.getColumnMetrics.apply(this, arguments as any);
    // }
    pointAttribs() {
        return ColumnRangeSeries_columnProto.pointAttribs.apply(this, arguments);
    }
    // Public adjustForMissingColumns(): number {
    //     return columnProto.adjustForMissingColumns.apply(this, arguments);
    // }
    // public animate(): void {
    //     return columnProto.animate.apply(this, arguments as any);
    // }
    translate3dPoints() {
        return ColumnRangeSeries_columnProto.translate3dPoints.apply(this, arguments);
    }
    translate3dShapes() {
        return ColumnRangeSeries_columnProto.translate3dShapes.apply(this, arguments);
    }
    afterColumnTranslate() {
        /**
         * Translate data points from raw values x and y to plotX and plotY
         * @private
         */
        const yAxis = this.yAxis, xAxis = this.xAxis, startAngleRad = xAxis.startAngleRad, chart = this.chart, isRadial = this.xAxis.isRadial, safeDistance = Math.max(chart.chartWidth, chart.chartHeight) + 999;
        let height, heightDifference, start, y;
        // eslint-disable-next-line valid-jsdoc
        /**
         * Don't draw too far outside plot area (#6835)
         * @private
         */
        function safeBounds(pixelPos) {
            return ColumnRangeSeries_clamp(pixelPos, -safeDistance, safeDistance);
        }
        // Set plotLow and plotHigh
        this.points.forEach((point) => {
            const shapeArgs = point.shapeArgs || {}, minPointLength = this.options.minPointLength, plotY = point.plotY, plotHigh = yAxis.translate(point.high, 0, 1, 0, 1);
            if (ColumnRangeSeries_isNumber(plotHigh) && ColumnRangeSeries_isNumber(plotY)) {
                point.plotHigh = safeBounds(plotHigh);
                point.plotLow = safeBounds(plotY);
                // Adjust shape
                y = point.plotHigh;
                height = ColumnRangeSeries_pick(point.rectPlotY, point.plotY) - point.plotHigh;
                // Adjust for minPointLength
                if (Math.abs(height) < minPointLength) {
                    heightDifference = (minPointLength - height);
                    height += heightDifference;
                    y -= heightDifference / 2;
                    // Adjust for negative ranges or reversed Y axis (#1457)
                }
                else if (height < 0) {
                    height *= -1;
                    y -= height;
                }
                if (isRadial && this.polar) {
                    start = point.barX + startAngleRad;
                    point.shapeType = 'arc';
                    point.shapeArgs = this.polar.arc(y + height, y, start, start + point.pointWidth);
                }
                else {
                    shapeArgs.height = height;
                    shapeArgs.y = y;
                    const { x = 0, width = 0 } = shapeArgs;
                    // #17912, aligning column range points
                    // merge if shapeArgs contains more properties e.g. for 3d
                    point.shapeArgs = ColumnRangeSeries_merge(point.shapeArgs, this.crispCol(x, y, width, height));
                    point.tooltipPos = chart.inverted ?
                        [
                            yAxis.len + yAxis.pos - chart.plotLeft - y -
                                height / 2,
                            xAxis.len + xAxis.pos - chart.plotTop - x -
                                width / 2,
                            height
                        ] : [
                        xAxis.left - chart.plotLeft + x + width / 2,
                        yAxis.pos - chart.plotTop + y + height / 2,
                        height
                    ]; // Don't inherit from column tooltip position - #3372
                }
            }
        });
    }
}
/* *
 *
 *  Static Properties
 *
 * */
ColumnRangeSeries.defaultOptions = ColumnRangeSeries_merge(ColumnSeries.defaultOptions, ColumnRangeSeries_AreaRangeSeries.defaultOptions, columnRangeOptions);
ColumnRangeSeries_addEvent(ColumnRangeSeries, 'afterColumnTranslate', function () {
    ColumnRangeSeries.prototype.afterColumnTranslate.apply(this);
}, { order: 5 });
ColumnRangeSeries_extend(ColumnRangeSeries.prototype, {
    directTouch: true,
    pointClass: ColumnRange_ColumnRangePoint,
    trackerGroups: ['group', 'dataLabelsGroup'],
    adjustForMissingColumns: ColumnRangeSeries_columnProto.adjustForMissingColumns,
    animate: ColumnRangeSeries_columnProto.animate,
    crispCol: ColumnRangeSeries_columnProto.crispCol,
    drawGraph: ColumnRangeSeries_noop,
    drawPoints: ColumnRangeSeries_columnProto.drawPoints,
    getSymbol: ColumnRangeSeries_noop,
    drawTracker: ColumnRangeSeries_columnProto.drawTracker,
    getColumnMetrics: ColumnRangeSeries_columnProto.getColumnMetrics
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('columnrange', ColumnRangeSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const ColumnRange_ColumnRangeSeries = ((/* unused pure expression or super */ null && (ColumnRangeSeries)));
/* *
 *
 *  API Options
 *
 * */
/**
 * A `columnrange` series. If the [type](#series.columnrange.type)
 * option is not specified, it is inherited from
 * [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.columnrange
 * @excluding dataParser, dataURL, stack, stacking
 * @product   highcharts highstock
 * @requires  highcharts-more
 * @apioption series.columnrange
 */
/**
 * An array of data points for the series. For the `columnrange` series
 * type, points can be given in the following ways:
 *
 * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
 *    to `x,low,high`. If the first value is a string, it is applied as the name
 *    of the point, and the `x` value is inferred. The `x` value can also be
 *    omitted, in which case the inner arrays should be of length 2\. Then the
 *    `x` value is automatically calculated, either starting at 0 and
 *    incremented by 1, or from `pointStart` and `pointInterval` given in the
 *    series options.
 *    ```js
 *    data: [
 *        [0, 4, 2],
 *        [1, 2, 1],
 *        [2, 9, 10]
 *    ]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.columnrange.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        low: 0,
 *        high: 4,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        low: 5,
 *        high: 3,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
 * @extends   series.arearange.data
 * @excluding marker
 * @product   highcharts highstock
 * @apioption series.columnrange.data
 */
/**
 * @extends   series.columnrange.dataLabels
 * @product   highcharts highstock
 * @apioption series.columnrange.data.dataLabels
 */
/**
 * @excluding halo, lineWidth, lineWidthPlus, marker
 * @product   highcharts highstock
 * @apioption series.columnrange.states.hover
 */
/**
 * @excluding halo, lineWidth, lineWidthPlus, marker
 * @product   highcharts highstock
 * @apioption series.columnrange.states.select
 */
''; // Adds doclets above into transpiled

;// ./code/es-modules/Series/ColumnPyramid/ColumnPyramidSeriesDefaults.js
/* *
 *
 *  (c) 2010-2025 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  API Options
 *
 * */
/**
 * Column pyramid series display one pyramid per value along an X axis.
 * To display horizontal pyramids, set [chart.inverted](#chart.inverted) to
 * `true`.
 *
 * @sample {highcharts|highstock} highcharts/demo/column-pyramid/
 *         Column pyramid
 * @sample {highcharts|highstock} highcharts/plotoptions/columnpyramid-stacked/
 *         Column pyramid stacked
 * @sample {highcharts|highstock} highcharts/plotoptions/columnpyramid-inverted/
 *         Column pyramid inverted
 *
 * @extends      plotOptions.column
 * @since        7.0.0
 * @product      highcharts highstock
 * @excluding    boostThreshold, borderRadius, crisp, depth, edgeColor,
 *               edgeWidth, groupZPadding, negativeColor, softThreshold,
 *               threshold, zoneAxis, zones, boostBlending
 * @requires     highcharts-more
 * @optionparent plotOptions.columnpyramid
 */
const ColumnPyramidSeriesDefaults = {};
/**
 * A `columnpyramid` series. If the [type](#series.columnpyramid.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.columnpyramid
 * @excluding connectEnds, connectNulls, dashStyle, dataParser, dataURL,
 *            gapSize, gapUnit, linecap, lineWidth, marker, step,
 *            boostThreshold, boostBlending
 * @product   highcharts highstock
 * @requires  highcharts-more
 * @apioption series.columnpyramid
 */
/**
 * @excluding halo, lineWidth, lineWidthPlus, marker
 * @product   highcharts highstock
 * @apioption series.columnpyramid.states.hover
 */
/**
 * @excluding halo, lineWidth, lineWidthPlus, marker
 * @product   highcharts highstock
 * @apioption series.columnpyramid.states.select
 */
/**
 * An array of data points for the series. For the `columnpyramid` series type,
 * points can be given in the following ways:
 *
 * 1. An array of numerical values. In this case, the numerical values will be
 *    interpreted as `y` options. The `x` values will be automatically
 *    calculated, either starting at 0 and incremented by 1, or from
 *    `pointStart` and `pointInterval` given in the series options. If the axis
 *    has categories, these will be used. Example:
 *    ```js
 *    data: [0, 5, 3, 5]
 *    ```
 *
 * 2. An array of arrays with 2 values. In this case, the values correspond to
 *    `x,y`. If the first value is a string, it is applied as the name of the
 *    point, and the `x` value is inferred.
 *    ```js
 *    data: [
 *        [0, 6],
 *        [1, 2],
 *        [2, 6]
 *    ]
 *    ```
 *
 * 3. An array of objects with named values. The objects are point configuration
 *    objects as seen below. If the total number of data points exceeds the
 *    series' [turboThreshold](#series.columnpyramid.turboThreshold), this
 *    option is not available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        y: 9,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        y: 6,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/chart/reflow-true/
 *         Numerical values
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
 * @extends   series.line.data
 * @excluding marker
 * @product   highcharts highstock
 * @apioption series.columnpyramid.data
 */
''; // Keeps doclets above separate
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const ColumnPyramid_ColumnPyramidSeriesDefaults = (ColumnPyramidSeriesDefaults);

;// ./code/es-modules/Series/ColumnPyramid/ColumnPyramidSeries.js
/* *
 *
 *  (c) 2010-2025 Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { column: ColumnPyramidSeries_ColumnSeries } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { clamp: ColumnPyramidSeries_clamp, merge: ColumnPyramidSeries_merge, pick: ColumnPyramidSeries_pick } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * The ColumnPyramidSeries class
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.columnpyramid
 *
 * @augments Highcharts.Series
 */
class ColumnPyramidSeries extends ColumnPyramidSeries_ColumnSeries {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Overrides the column translate method
     * @private
     */
    translate() {
        const series = this, chart = series.chart, options = series.options, dense = series.dense =
            series.closestPointRange * series.xAxis.transA < 2, borderWidth = series.borderWidth = ColumnPyramidSeries_pick(options.borderWidth, dense ? 0 : 1 // #3635
        ), yAxis = series.yAxis, threshold = options.threshold, minPointLength = ColumnPyramidSeries_pick(options.minPointLength, 5), metrics = series.getColumnMetrics(), pointWidth = metrics.width, pointXOffset = series.pointXOffset = metrics.offset;
        let translatedThreshold = series.translatedThreshold =
            yAxis.getThreshold(threshold), 
        // Postprocessed for border width
        seriesBarW = series.barW =
            Math.max(pointWidth, 1 + 2 * borderWidth);
        if (chart.inverted) {
            translatedThreshold -= 0.5; // #3355
        }
        // When the pointPadding is 0,
        // we want the pyramids to be packed tightly,
        // so we allow individual pyramids to have individual sizes.
        // When pointPadding is greater,
        // we strive for equal-width columns (#2694).
        if (options.pointPadding) {
            seriesBarW = Math.ceil(seriesBarW);
        }
        super.translate();
        // Record the new values
        for (const point of series.points) {
            const yBottom = ColumnPyramidSeries_pick(point.yBottom, translatedThreshold), safeDistance = 999 + Math.abs(yBottom), plotY = ColumnPyramidSeries_clamp(point.plotY, -safeDistance, yAxis.len + safeDistance), 
            // Don't draw too far outside plot area
            // (#1303, #2241, #4264)
            barW = seriesBarW / 2, barY = Math.min(plotY, yBottom), barH = Math.max(plotY, yBottom) - barY;
            let barX = point.plotX + pointXOffset, stackTotal, stackHeight, topXwidth, bottomXwidth, invBarPos, x1, x2, x3, x4, y1, y2;
            // Adjust for null or missing points
            if (options.centerInCategory) {
                barX = series.adjustForMissingColumns(barX, pointWidth, point, metrics);
            }
            point.barX = barX;
            point.pointWidth = pointWidth;
            // Fix the tooltip on center of grouped pyramids
            // (#1216, #424, #3648)
            point.tooltipPos = chart.inverted ?
                [
                    yAxis.len + yAxis.pos - chart.plotLeft - plotY,
                    series.xAxis.len - barX - barW,
                    barH
                ] :
                [
                    barX + barW,
                    plotY + yAxis.pos - chart.plotTop,
                    barH
                ];
            stackTotal =
                threshold + (point.total || point.y);
            // Overwrite stacktotal (always 100 / -100)
            if (options.stacking === 'percent') {
                stackTotal =
                    threshold + (point.y < 0) ?
                        -100 :
                        100;
            }
            // Get the highest point (if stack, extract from total)
            const topPointY = yAxis.toPixels((stackTotal), true);
            // Calculate height of stack (in pixels)
            stackHeight =
                chart.plotHeight - topPointY -
                    (chart.plotHeight - translatedThreshold);
            // `topXwidth` and `bottomXwidth` = width of lines from the center
            // calculated from tanges proportion. Cannot be a NaN #12514.
            topXwidth = stackHeight ?
                (barW * (barY - topPointY)) / stackHeight : 0;
            // Like topXwidth, but with height of point
            bottomXwidth = stackHeight ?
                (barW * (barY + barH - topPointY)) / stackHeight :
                0;
            /*
                    /\
                   /  \
            x1,y1,------ x2,y1
                /       \
               -----------
            x4,y2        x3,y2
            */
            x1 = barX - topXwidth + barW;
            x2 = barX + topXwidth + barW;
            x3 = barX + bottomXwidth + barW;
            x4 = barX - bottomXwidth + barW;
            y1 = barY - minPointLength;
            y2 = barY + barH;
            if (point.y < 0) {
                y1 = barY;
                y2 = barY + barH + minPointLength;
            }
            // Inverted chart
            if (chart.inverted) {
                invBarPos = yAxis.width - barY;
                stackHeight =
                    topPointY - (yAxis.width - translatedThreshold);
                // Proportion tanges
                topXwidth = (barW *
                    (topPointY - invBarPos)) / stackHeight;
                bottomXwidth = (barW *
                    (topPointY - (invBarPos - barH))) / stackHeight;
                x1 = barX + barW + topXwidth; // Top bottom
                x2 = x1 - 2 * topXwidth; // Top top
                x3 = barX - bottomXwidth + barW; // Bottom top
                x4 = barX + bottomXwidth + barW; // Bottom bottom
                y1 = barY;
                y2 = barY + barH - minPointLength;
                if (point.y < 0) {
                    y2 = barY + barH + minPointLength;
                }
            }
            // Register shape type and arguments to be used in drawPoints
            point.shapeType = 'path';
            point.shapeArgs = {
                x: x1,
                y: y1,
                width: x2 - x1,
                height: barH,
                // Path of pyramid
                d: [
                    ['M', x1, y1],
                    ['L', x2, y1],
                    ['L', x3, y2],
                    ['L', x4, y2],
                    ['Z']
                ]
            };
        }
    }
}
/* *
 *
 *  Static properties
 *
 * */
ColumnPyramidSeries.defaultOptions = ColumnPyramidSeries_merge(ColumnPyramidSeries_ColumnSeries.defaultOptions, ColumnPyramid_ColumnPyramidSeriesDefaults);
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('columnpyramid', ColumnPyramidSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const ColumnPyramid_ColumnPyramidSeries = ((/* unused pure expression or super */ null && (ColumnPyramidSeries)));

;// ./code/es-modules/Series/ErrorBar/ErrorBarSeriesDefaults.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  API Options
 *
 * */
/**
 * Error bars are a graphical representation of the variability of data and
 * are used on graphs to indicate the error, or uncertainty in a reported
 * measurement.
 *
 * @sample highcharts/demo/error-bar/
 *         Error bars on a column series
 * @sample highcharts/series-errorbar/on-scatter/
 *         Error bars on a scatter series
 * @sample highcharts/series-errorbar/datalabels/
 *         Error bars with data labels
 *
 * @extends      plotOptions.boxplot
 * @excluding    boostBlending, boostThreshold
 * @product      highcharts
 * @requires     highcharts-more
 * @optionparent plotOptions.errorbar
 */
const ErrorBarSeriesDefaults = {
    /**
     * The main color of the bars. This can be overridden by
     * [stemColor](#plotOptions.errorbar.stemColor) and
     * [whiskerColor](#plotOptions.errorbar.whiskerColor) individually.
     *
     * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
     *         Error bar styling
     *
     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @default #000000
     * @since   3.0
     * @product highcharts
     */
    color: "#000000" /* Palette.neutralColor100 */,
    grouping: false,
    /**
     * The parent series of the error bar. The default value links it to
     * the previous series. Otherwise, use the id of the parent series.
     *
     * @since   3.0
     * @product highcharts
     */
    linkedTo: ':previous',
    tooltip: {
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
    },
    /**
     * The line width of the whiskers, the horizontal lines marking
     * low and high values. When `null`, the general
     * [lineWidth](#plotOptions.errorbar.lineWidth) applies.
     *
     * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
     *         Error bar styling
     *
     * @type    {number}
     * @since   3.0
     * @product highcharts
     */
    whiskerWidth: null
};
/**
 * A `errorbar` series. If the [type](#series.errorbar.type) option
 * is not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.errorbar
 * @excluding dataParser, dataURL, stack, stacking, boostThreshold,
 *            boostBlending
 * @product   highcharts
 * @requires  highcharts-more
 * @apioption series.errorbar
 */
/**
 * An array of data points for the series. For the `errorbar` series
 * type, points can be given in the following ways:
 *
 * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
 *    to `x,low,high`. If the first value is a string, it is applied as the name
 *    of the point, and the `x` value is inferred. The `x` value can also be
 *    omitted, in which case the inner arrays should be of length 2\. Then the
 *    `x` value is automatically calculated, either starting at 0 and
 *    incremented by 1, or from `pointStart` and `pointInterval` given in the
 *    series options.
 *    ```js
 *    data: [
 *        [0, 10, 2],
 *        [1, 1, 8],
 *        [2, 4, 5]
 *    ]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.errorbar.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        low: 0,
 *        high: 0,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        low: 5,
 *        high: 5,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
 * @extends   series.arearange.data
 * @excluding dataLabels, drilldown, marker, states
 * @product   highcharts
 * @apioption series.errorbar.data
 */
''; // Adds doclets above to transpiled file
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const ErrorBar_ErrorBarSeriesDefaults = (ErrorBarSeriesDefaults);

;// ./code/es-modules/Series/ErrorBar/ErrorBarSeries.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { arearange: ErrorBarSeries_AreaRangeSeries } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { addEvent: ErrorBarSeries_addEvent, merge: ErrorBarSeries_merge, extend: ErrorBarSeries_extend } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * Errorbar series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.errorbar
 *
 * @augments Highcharts.Series
 */
class ErrorBarSeries extends BoxPlot_BoxPlotSeries {
    /* *
     *
     *  Functions
     *
     * */
    getColumnMetrics() {
        const series = this;
        // Get the width and X offset, either on top of the linked series
        // column or standalone
        return ((series.linkedParent && series.linkedParent.columnMetrics) ||
            external_highcharts_src_js_default_Series_types_column_default().prototype.getColumnMetrics.call(series));
    }
    drawDataLabels() {
        const series = this, valKey = series.pointValKey;
        if (ErrorBarSeries_AreaRangeSeries) {
            ErrorBarSeries_AreaRangeSeries.prototype.drawDataLabels.call(series);
            // Arearange drawDataLabels does not reset point.y to high,
            // but to low after drawing (#4133)
            for (const point of series.points) {
                point.y = point[valKey];
            }
        }
    }
    toYData(point) {
        // Return a plain array for speedy calculation
        return [point.low, point.high];
    }
}
/* *
 *
 *  Static Properties
 *
 * */
ErrorBarSeries.defaultOptions = ErrorBarSeries_merge(BoxPlot_BoxPlotSeries.defaultOptions, ErrorBar_ErrorBarSeriesDefaults);
ErrorBarSeries_addEvent(ErrorBarSeries, 'afterTranslate', function () {
    for (const point of this.points) {
        point.plotLow = point.plotY;
    }
}, { order: 0 });
ErrorBarSeries_extend(ErrorBarSeries.prototype, {
    pointArrayMap: ['low', 'high'], // Array point configs are mapped to this
    pointValKey: 'high', // Defines the top of the tracker
    doQuartiles: false
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('errorbar', ErrorBarSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const ErrorBar_ErrorBarSeries = ((/* unused pure expression or super */ null && (ErrorBarSeries)));

;// ./code/es-modules/Series/Gauge/GaugePoint.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { series: { prototype: { pointClass: Point } } } = (external_highcharts_src_js_default_SeriesRegistry_default());
/* *
 *
 *  Class
 *
 * */
class GaugePoint extends Point {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Don't do any hover colors or anything
     * @private
     */
    setState(state) {
        this.state = state;
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Gauge_GaugePoint = (GaugePoint);

;// ./code/es-modules/Series/Gauge/GaugeSeries.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { noop: GaugeSeries_noop } = (external_highcharts_src_js_default_default());

const { series: GaugeSeries_Series, seriesTypes: { column: GaugeSeries_ColumnSeries } } = (external_highcharts_src_js_default_SeriesRegistry_default());

const { clamp: GaugeSeries_clamp, isNumber: GaugeSeries_isNumber, extend: GaugeSeries_extend, merge: GaugeSeries_merge, pick: GaugeSeries_pick, pInt, defined: GaugeSeries_defined } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 *
 * The `gauge` series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.map
 *
 * @augments Highcharts.Series
 */
class GaugeSeries extends GaugeSeries_Series {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Calculate paths etc
     * @private
     */
    translate() {
        const series = this, yAxis = series.yAxis, options = series.options, center = yAxis.center;
        series.generatePoints();
        series.points.forEach((point) => {
            const dialOptions = GaugeSeries_merge(options.dial, point.dial), radius = (pInt(dialOptions.radius) * center[2]) / 200, baseLength = (pInt(dialOptions.baseLength) * radius) / 100, rearLength = (pInt(dialOptions.rearLength) * radius) / 100, baseWidth = dialOptions.baseWidth, topWidth = dialOptions.topWidth;
            let overshoot = options.overshoot, rotation = yAxis.startAngleRad + yAxis.translate(point.y, void 0, void 0, void 0, true);
            // Handle the wrap and overshoot options
            if (GaugeSeries_isNumber(overshoot) || options.wrap === false) {
                overshoot = GaugeSeries_isNumber(overshoot) ?
                    (overshoot / 180 * Math.PI) : 0;
                rotation = GaugeSeries_clamp(rotation, yAxis.startAngleRad - overshoot, yAxis.endAngleRad + overshoot);
            }
            rotation = rotation * 180 / Math.PI;
            point.shapeType = 'path';
            const d = dialOptions.path || [
                ['M', -rearLength, -baseWidth / 2],
                ['L', baseLength, -baseWidth / 2],
                ['L', radius, -topWidth / 2],
                ['L', radius, topWidth / 2],
                ['L', baseLength, baseWidth / 2],
                ['L', -rearLength, baseWidth / 2],
                ['Z']
            ];
            point.shapeArgs = {
                d,
                translateX: center[0],
                translateY: center[1],
                rotation: rotation
            };
            // Positions for data label
            point.plotX = center[0];
            point.plotY = center[1];
            if (GaugeSeries_defined(point.y) && yAxis.max - yAxis.min) {
                point.percentage =
                    (point.y - yAxis.min) / (yAxis.max - yAxis.min) * 100;
            }
        });
    }
    /**
     * Draw the points where each point is one needle
     * @private
     */
    drawPoints() {
        const series = this, chart = series.chart, center = series.yAxis.center, pivot = series.pivot, options = series.options, pivotOptions = options.pivot, renderer = chart.renderer;
        series.points.forEach((point) => {
            const graphic = point.graphic, shapeArgs = point.shapeArgs, d = shapeArgs.d, dialOptions = GaugeSeries_merge(options.dial, point.dial); // #1233
            if (graphic) {
                graphic.animate(shapeArgs);
                shapeArgs.d = d; // Animate alters it
            }
            else {
                point.graphic =
                    renderer[point.shapeType](shapeArgs)
                        .addClass('highcharts-dial')
                        .add(series.group);
            }
            // Presentational attributes
            if (!chart.styledMode) {
                point.graphic[graphic ? 'animate' : 'attr']({
                    stroke: dialOptions.borderColor,
                    'stroke-width': dialOptions.borderWidth,
                    fill: dialOptions.backgroundColor
                });
            }
        });
        // Add or move the pivot
        if (pivot) {
            pivot.animate({
                translateX: center[0],
                translateY: center[1]
            });
        }
        else if (pivotOptions) {
            series.pivot =
                renderer.circle(0, 0, pivotOptions.radius)
                    .attr({
                    zIndex: 2
                })
                    .addClass('highcharts-pivot')
                    .translate(center[0], center[1])
                    .add(series.group);
            // Presentational attributes
            if (!chart.styledMode) {
                series.pivot.attr({
                    fill: pivotOptions.backgroundColor,
                    stroke: pivotOptions.borderColor,
                    'stroke-width': pivotOptions.borderWidth
                });
            }
        }
    }
    /**
     * Animate the arrow up from startAngle
     * @private
     */
    animate(init) {
        const series = this;
        if (!init) {
            series.points.forEach((point) => {
                const graphic = point.graphic;
                if (graphic) {
                    // Start value
                    graphic.attr({
                        rotation: series.yAxis.startAngleRad * 180 / Math.PI
                    });
                    // Animate
                    graphic.animate({
                        rotation: point.shapeArgs.rotation
                    }, series.options.animation);
                }
            });
        }
    }
    /**
     * @private
     */
    render() {
        this.group = this.plotGroup('group', 'series', this.visible ? 'inherit' : 'hidden', this.options.zIndex, this.chart.seriesGroup);
        GaugeSeries_Series.prototype.render.call(this);
        this.group.clip(this.chart.clipRect);
    }
    /**
     * Extend the basic setData method by running processData and generatePoints
     * immediately, in order to access the points from the legend.
     * @private
     */
    setData(data, redraw) {
        GaugeSeries_Series.prototype.setData.call(this, data, false);
        this.processData();
        this.generatePoints();
        if (GaugeSeries_pick(redraw, true)) {
            this.chart.redraw();
        }
    }
    /**
     * Define hasData function for non-cartesian series.
     * Returns true if the series has points at all.
     * @private
     */
    hasData() {
        return !!this.points.length; // != 0
    }
}
/* *
 *
 *  Static properties
 *
 * */
/**
 * Gauges are circular plots displaying one or more values with a dial
 * pointing to values along the perimeter.
 *
 * @sample highcharts/demo/gauge-speedometer/
 *         Gauge chart
 *
 * @extends      plotOptions.line
 * @excluding    animationLimit, boostThreshold, colorAxis, colorKey,
 *               connectEnds, connectNulls, cropThreshold, dashStyle,
 *               dragDrop, findNearestPointBy, getExtremesFromAll, marker,
 *               negativeColor, pointPlacement, shadow, softThreshold,
 *               stacking, states, step, threshold, turboThreshold, xAxis,
 *               zoneAxis, zones, dataSorting, boostBlending
 * @product      highcharts
 * @requires     highcharts-more
 * @optionparent plotOptions.gauge
 */
GaugeSeries.defaultOptions = GaugeSeries_merge(GaugeSeries_Series.defaultOptions, {
    /**
     * When this option is `true`, the dial will wrap around the axes.
     * For instance, in a full-range gauge going from 0 to 360, a value
     * of 400 will point to 40\. When `wrap` is `false`, the dial stops
     * at 360.
     *
     * @see [overshoot](#plotOptions.gauge.overshoot)
     *
     * @type      {boolean}
     * @default   true
     * @since     3.0
     * @product   highcharts
     * @apioption plotOptions.gauge.wrap
     */
    /**
     * Data labels for the gauge. For gauges, the data labels are
     * enabled by default and shown in a bordered box below the point.
     *
     * @since   2.3.0
     * @product highcharts
     */
    dataLabels: {
        borderColor: "#cccccc" /* Palette.neutralColor20 */,
        borderRadius: 3,
        borderWidth: 1,
        crop: false,
        defer: false,
        enabled: true,
        verticalAlign: 'top',
        y: 15,
        zIndex: 2
    },
    /**
     * Options for the dial or arrow pointer of the gauge.
     *
     * In styled mode, the dial is styled with the
     * `.highcharts-gauge-series .highcharts-dial` rule.
     *
     * @sample {highcharts} highcharts/css/gauge/
     *         Styled mode
     *
     * @type    {*}
     * @since   2.3.0
     * @product highcharts
     */
    dial: {
        /**
         * The background or fill color of the gauge's dial.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-dial/
         *         Dial options demonstrated
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @default   #000000
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.dial.backgroundColor
         */
        backgroundColor: "#000000" /* Palette.neutralColor100 */,
        /**
         * The length of the dial's base part, relative to the total
         * radius or length of the dial.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-dial/
         *         Dial options demonstrated
         *
         * @type      {string}
         * @default   70%
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.dial.baseLength
         */
        baseLength: '70%',
        /**
         * The pixel width of the base of the gauge dial. The base is
         * the part closest to the pivot, defined by baseLength.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-dial/
         *         Dial options demonstrated
         *
         * @type      {number}
         * @default   3
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.dial.baseWidth
         */
        baseWidth: 3,
        /**
         * The border color or stroke of the gauge's dial. By default,
         * the borderWidth is 0, so this must be set in addition to a
         * custom border color.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-dial/
         *         Dial options demonstrated
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @default   #cccccc
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.dial.borderColor
         */
        borderColor: "#cccccc" /* Palette.neutralColor20 */,
        /**
         * The width of the gauge dial border in pixels.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-dial/
         *         Dial options demonstrated
         *
         * @type      {number}
         * @default   0
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.dial.borderWidth
         */
        borderWidth: 0,
        /**
         * An array with an SVG path for the custom dial.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-path/
         *         Dial options demonstrated
         *
         * @type      {Highcharts.SVGPathArray}
         * @since 10.2.0
         * @product   highcharts
         * @apioption plotOptions.gauge.dial.path
         */
        /**
         * The radius or length of the dial, in percentages relative to
         * the radius of the gauge itself.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-dial/
         *         Dial options demonstrated
         *
         * @type      {string}
         * @default   80%
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.dial.radius
         */
        radius: '80%',
        /**
         * The length of the dial's rear end, the part that extends out
         * on the other side of the pivot. Relative to the dial's
         * length.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-dial/
         *         Dial options demonstrated
         *
         * @type      {string}
         * @default   10%
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.dial.rearLength
         */
        rearLength: '10%',
        /**
         * The width of the top of the dial, closest to the perimeter.
         * The pivot narrows in from the base to the top.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-dial/
         *         Dial options demonstrated
         *
         * @type      {number}
         * @default   1
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.dial.topWidth
         */
        topWidth: 1
    },
    /**
     * Allow the dial to overshoot the end of the perimeter axis by
     * this many degrees. Say if the gauge axis goes from 0 to 60, a
     * value of 100, or 1000, will show 5 degrees beyond the end of the
     * axis when this option is set to 5.
     *
     * @see [wrap](#plotOptions.gauge.wrap)
     *
     * @sample {highcharts} highcharts/plotoptions/gauge-overshoot/
     *         Allow 5 degrees overshoot
     *
     * @type      {number}
     * @since     3.0.10
     * @product   highcharts
     * @apioption plotOptions.gauge.overshoot
     */
    /**
     * Options for the pivot or the center point of the gauge.
     *
     * In styled mode, the pivot is styled with the
     * `.highcharts-gauge-series .highcharts-pivot` rule.
     *
     * @sample {highcharts} highcharts/css/gauge/
     *         Styled mode
     *
     * @type    {*}
     * @since   2.3.0
     * @product highcharts
     */
    pivot: {
        /**
         * The pixel radius of the pivot.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
         *         Pivot options demonstrated
         *
         * @type      {number}
         * @default   5
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.pivot.radius
         */
        radius: 5,
        /**
         * The border or stroke width of the pivot.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
         *         Pivot options demonstrated
         *
         * @type      {number}
         * @default   0
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.pivot.borderWidth
         */
        borderWidth: 0,
        /**
         * The border or stroke color of the pivot. In able to change
         * this, the borderWidth must also be set to something other
         * than the default 0.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
         *         Pivot options demonstrated
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @default   #cccccc
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.pivot.borderColor
         */
        borderColor: "#cccccc" /* Palette.neutralColor20 */,
        /**
         * The background color or fill of the pivot.
         *
         * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
         *         Pivot options demonstrated
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @default   #000000
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.gauge.pivot.backgroundColor
         */
        backgroundColor: "#000000" /* Palette.neutralColor100 */
    },
    tooltip: {
        headerFormat: ''
    },
    /**
     * Whether to display this particular series or series type in the
     * legend. Defaults to false for gauge series.
     *
     * @since   2.3.0
     * @product highcharts
     */
    showInLegend: false
    // Prototype members
});
GaugeSeries_extend(GaugeSeries.prototype, {
    // `chart.angular` will be set to true when a gauge series is present, and
    // this will be used on the axes
    angular: true,
    directTouch: true, // #5063
    drawGraph: GaugeSeries_noop,
    drawTracker: GaugeSeries_ColumnSeries.prototype.drawTracker,
    fixedBox: true,
    forceDL: true,
    noSharedTooltip: true,
    pointClass: Gauge_GaugePoint,
    trackerGroups: ['group', 'dataLabelsGroup']
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('gauge', GaugeSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Gauge_GaugeSeries = ((/* unused pure expression or super */ null && (GaugeSeries)));
/* *
 *
 *  API options
 *
 * */
/**
 * A `gauge` series. If the [type](#series.gauge.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.gauge
 * @excluding animationLimit, boostThreshold, connectEnds, connectNulls,
 *            cropThreshold, dashStyle, dataParser, dataURL, findNearestPointBy,
 *            getExtremesFromAll, marker, negativeColor, pointPlacement, shadow,
 *            softThreshold, stack, stacking, states, step, threshold,
 *            turboThreshold, zoneAxis, zones, dataSorting, boostBlending
 * @product   highcharts
 * @requires  highcharts-more
 * @apioption series.gauge
 */
/**
 * An array of data points for the series. For the `gauge` series type,
 * points can be given in the following ways:
 *
 * 1. An array of numerical values. In this case, the numerical values will be
 *    interpreted as `y` options. Example:
 *    ```js
 *    data: [0, 5, 3, 5]
 *    ```
 *
 * 2. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.gauge.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        y: 6,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        y: 8,
 *        name: "Point1",
 *       color: "#FF00FF"
 *    }]
 *    ```
 *
 * The typical gauge only contains a single data value.
 *
 * @sample {highcharts} highcharts/chart/reflow-true/
 *         Numerical values
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<number|null|*>}
 * @extends   series.line.data
 * @excluding drilldown, marker, x
 * @product   highcharts
 * @apioption series.gauge.data
 */
''; // Adds the doclets above in the transpiled file

;// external ["./highcharts.src.js","default","Color"]
const external_highcharts_src_js_default_Color_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__["default"].Color;
var external_highcharts_src_js_default_Color_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_Color_namespaceObject);
;// ./code/es-modules/Series/DragNodesComposition.js
/* *
 *
 *  Networkgraph series
 *
 *  (c) 2010-2025 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { composed: DragNodesComposition_composed } = (external_highcharts_src_js_default_default());

const { addEvent: DragNodesComposition_addEvent, pushUnique: DragNodesComposition_pushUnique } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function DragNodesComposition_compose(ChartClass) {
    if (DragNodesComposition_pushUnique(DragNodesComposition_composed, 'DragNodes')) {
        DragNodesComposition_addEvent(ChartClass, 'load', onChartLoad);
    }
}
/**
 * Draggable mode:
 * @private
 */
function onChartLoad() {
    const chart = this;
    let mousedownUnbinder, mousemoveUnbinder, mouseupUnbinder, point;
    if (chart.container) {
        mousedownUnbinder = DragNodesComposition_addEvent(chart.container, 'mousedown', (event) => {
            if (mousemoveUnbinder) {
                mousemoveUnbinder();
            }
            if (mouseupUnbinder) {
                mouseupUnbinder();
            }
            point = chart.hoverPoint;
            if (point &&
                point.series &&
                point.series.hasDraggableNodes &&
                point.series.options.draggable) {
                point.series.onMouseDown(point, event);
                mousemoveUnbinder = DragNodesComposition_addEvent(chart.container, 'mousemove', (e) => (point &&
                    point.series &&
                    point.series.onMouseMove(point, e)));
                mouseupUnbinder = DragNodesComposition_addEvent(chart.container.ownerDocument, 'mouseup', (e) => {
                    mousemoveUnbinder();
                    mouseupUnbinder();
                    return point &&
                        point.series &&
                        point.series.onMouseUp(point, e);
                });
            }
        });
    }
    DragNodesComposition_addEvent(chart, 'destroy', function () {
        mousedownUnbinder();
    });
}
/**
 * Mouse down action, initializing drag&drop mode.
 *
 * @private
 * @param {Highcharts.Point} point
 *        The point that event occurred.
 * @param {Highcharts.PointerEventObject} event
 *        Browser event, before normalization.
 */
function onMouseDown(point, event) {
    const { panKey } = this.chart.options.chart, panKeyPressed = panKey && event[`${panKey}Key`];
    if (panKeyPressed) {
        return;
    }
    const normalizedEvent = this.chart.pointer?.normalize(event) || event;
    point.fixedPosition = {
        chartX: normalizedEvent.chartX,
        chartY: normalizedEvent.chartY,
        plotX: point.plotX,
        plotY: point.plotY
    };
    point.inDragMode = true;
}
/**
 * Mouse move action during drag&drop.
 *
 * @private
 *
 * @param {Highcharts.Point} point
 *        The point that event occurred.
 * @param {global.Event} event
 *        Browser event, before normalization.
 */
function onMouseMove(point, event) {
    if (point.fixedPosition && point.inDragMode) {
        const series = this, chart = series.chart, normalizedEvent = chart.pointer?.normalize(event) || event, diffX = point.fixedPosition.chartX - normalizedEvent.chartX, diffY = point.fixedPosition.chartY - normalizedEvent.chartY, graphLayoutsLookup = chart.graphLayoutsLookup;
        let newPlotX, newPlotY;
        // At least 5px to apply change (avoids simple click):
        if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
            newPlotX = point.fixedPosition.plotX - diffX;
            newPlotY = point.fixedPosition.plotY - diffY;
            if (chart.isInsidePlot(newPlotX, newPlotY)) {
                point.plotX = newPlotX;
                point.plotY = newPlotY;
                point.hasDragged = true;
                this.redrawHalo(point);
                graphLayoutsLookup.forEach((layout) => {
                    layout.restartSimulation();
                });
            }
        }
    }
}
/**
 * Mouse up action, finalizing drag&drop.
 *
 * @private
 * @param {Highcharts.Point} point
 *        The point that event occurred.
 */
function onMouseUp(point) {
    if (point.fixedPosition) {
        if (point.hasDragged) {
            if (this.layout.enableSimulation) {
                this.layout.start();
            }
            else {
                this.chart.redraw();
            }
        }
        point.inDragMode = point.hasDragged = false;
        if (!this.options.fixedDraggable) {
            delete point.fixedPosition;
        }
    }
}
/**
 * Redraw halo on mousemove during the drag&drop action.
 *
 * @private
 * @param {Highcharts.Point} point
 *        The point that should show halo.
 */
function redrawHalo(point) {
    if (point && this.halo) {
        this.halo.attr({
            d: point.haloPath(this.options.states.hover.halo.size)
        });
    }
}
/* *
 *
 *  Default Export
 *
 * */
const DragNodesComposition = {
    compose: DragNodesComposition_compose,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    redrawHalo
};
/* harmony default export */ const Series_DragNodesComposition = (DragNodesComposition);

;// ./code/es-modules/Series/GraphLayoutComposition.js
/* *
 *
 *  Networkgraph series
 *
 *  (c) 2010-2025 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { setAnimation } = (external_highcharts_src_js_default_default());

const { composed: GraphLayoutComposition_composed } = (external_highcharts_src_js_default_default());

const { addEvent: GraphLayoutComposition_addEvent, pushUnique: GraphLayoutComposition_pushUnique } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Constants
 *
 * */
const integrations = {};
const layouts = {};
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function GraphLayoutComposition_compose(ChartClass) {
    if (GraphLayoutComposition_pushUnique(GraphLayoutComposition_composed, 'GraphLayout')) {
        GraphLayoutComposition_addEvent(ChartClass, 'afterPrint', onChartAfterPrint);
        GraphLayoutComposition_addEvent(ChartClass, 'beforePrint', onChartBeforePrint);
        GraphLayoutComposition_addEvent(ChartClass, 'predraw', onChartPredraw);
        GraphLayoutComposition_addEvent(ChartClass, 'render', onChartRender);
    }
}
/**
 * Re-enable simulation after print.
 * @private
 */
function onChartAfterPrint() {
    if (this.graphLayoutsLookup) {
        this.graphLayoutsLookup.forEach((layout) => {
            // Return to default simulation
            layout.updateSimulation();
        });
        this.redraw();
    }
}
/**
 * Disable simulation before print if enabled.
 * @private
 */
function onChartBeforePrint() {
    if (this.graphLayoutsLookup) {
        this.graphLayoutsLookup.forEach((layout) => {
            layout.updateSimulation(false);
        });
        this.redraw();
    }
}
/**
 * Clear previous layouts.
 * @private
 */
function onChartPredraw() {
    if (this.graphLayoutsLookup) {
        this.graphLayoutsLookup.forEach((layout) => {
            layout.stop();
        });
    }
}
/**
 * @private
 */
function onChartRender() {
    let systemsStable, afterRender = false;
    const layoutStep = (layout) => {
        if (layout.maxIterations-- &&
            isFinite(layout.temperature) &&
            !layout.isStable() &&
            !layout.enableSimulation) {
            // Hook similar to build-in addEvent, but instead of
            // creating whole events logic, use just a function.
            // It's faster which is important for rAF code.
            // Used e.g. in packed-bubble series for bubble radius
            // calculations
            if (layout.beforeStep) {
                layout.beforeStep();
            }
            layout.step();
            systemsStable = false;
            afterRender = true;
        }
    };
    // Don't animate layout when series is dragged
    if (this.graphLayoutsLookup && !this.pointer?.hasDragged) {
        setAnimation(false, this);
        // Start simulation
        this.graphLayoutsLookup.forEach((layout) => layout.start());
        // Just one sync step, to run different layouts similar to
        // async mode.
        while (!systemsStable) {
            systemsStable = true;
            this.graphLayoutsLookup.forEach(layoutStep);
        }
        if (afterRender) {
            this.series.forEach((series) => {
                if (series && series.layout) {
                    series.render();
                }
            });
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
const GraphLayoutComposition = {
    compose: GraphLayoutComposition_compose,
    integrations,
    layouts
};
/* harmony default export */ const Series_GraphLayoutComposition = (GraphLayoutComposition);

;// external ["./highcharts.src.js","default","Chart"]
const external_highcharts_src_js_default_Chart_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__["default"].Chart;
var external_highcharts_src_js_default_Chart_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_Chart_namespaceObject);
;// ./code/es-modules/Series/PackedBubble/PackedBubblePoint.js
/* *
 *
 *  (c) 2010-2025 Grzegorz Blachlinski, Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */




const { seriesTypes: { bubble: { prototype: { pointClass: PackedBubblePoint_BubblePoint } } } } = (external_highcharts_src_js_default_SeriesRegistry_default());
/* *
 *
 *  Class
 *
 * */
class PackedBubblePoint extends PackedBubblePoint_BubblePoint {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Destroy point.
     * Then remove point from the layout.
     * @private
     */
    destroy() {
        if (this.series?.layout) {
            this.series.layout.removeElementFromCollection(this, this.series.layout.nodes);
        }
        return external_highcharts_src_js_default_Point_default().prototype.destroy.apply(this, arguments);
    }
    firePointEvent() {
        const series = this.series, seriesOptions = series.options;
        if (this.isParentNode && seriesOptions.parentNode) {
            const temp = seriesOptions.allowPointSelect;
            seriesOptions.allowPointSelect = (seriesOptions.parentNode.allowPointSelect);
            external_highcharts_src_js_default_Point_default().prototype.firePointEvent.apply(this, arguments);
            seriesOptions.allowPointSelect = temp;
        }
        else {
            external_highcharts_src_js_default_Point_default().prototype.firePointEvent.apply(this, arguments);
        }
    }
    select() {
        const point = this, series = this.series, chart = series.chart;
        if (point.isParentNode) {
            chart.getSelectedPoints = chart.getSelectedParentNodes;
            external_highcharts_src_js_default_Point_default().prototype.select.apply(this, arguments);
            chart.getSelectedPoints = (external_highcharts_src_js_default_Chart_default()).prototype.getSelectedPoints;
        }
        else {
            external_highcharts_src_js_default_Point_default().prototype.select.apply(this, arguments);
        }
    }
    setState(state, move) {
        if (this?.graphic?.parentGroup?.element) {
            super.setState(state, move);
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const PackedBubble_PackedBubblePoint = (PackedBubblePoint);

;// ./code/es-modules/Series/PackedBubble/PackedBubbleSeriesDefaults.js
/* *
 *
 *  Imports
 *
 * */

const { isNumber: PackedBubbleSeriesDefaults_isNumber } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Constants
 *
 * */
/**
 * A packed bubble series is a two dimensional series type, where each point
 * renders a value in X, Y position. Each point is drawn as a bubble
 * where the bubbles don't overlap with each other and the radius
 * of the bubble relates to the value.
 *
 * @sample highcharts/demo/packed-bubble/
 *         Packed bubble chart
 * @sample highcharts/demo/packed-bubble-split/
 *         Split packed bubble chart
 *
 * @extends      plotOptions.bubble
 * @excluding    boostThreshold, boostBlending,connectEnds, connectNulls,
 *               cropThreshold, dataSorting, dragDrop, jitter,
 *               legendSymbolColor, keys, pointPlacement, sizeByAbsoluteValue,
 *               step, xAxis, yAxis, zMax, zMin
 * @product      highcharts
 * @since        7.0.0
 * @requires     highcharts-more
 * @optionparent plotOptions.packedbubble
 *
 * @private
 */
const PackedBubbleSeriesDefaults = {
    /**
     * Minimum bubble size. Bubbles will automatically size between the
     * `minSize` and `maxSize` to reflect the value of each bubble.
     * Can be either pixels (when no unit is given), or a percentage of
     * the smallest one of the plot width and height, divided by the square
     * root of total number of points.
     *
     * @sample highcharts/plotoptions/bubble-size/
     *         Bubble size
     *
     * @type {number|string}
     *
     * @private
     */
    minSize: '10%',
    /**
     * Maximum bubble size. Bubbles will automatically size between the
     * `minSize` and `maxSize` to reflect the value of each bubble.
     * Can be either pixels (when no unit is given), or a percentage of
     * the smallest one of the plot width and height, divided by the square
     * root of total number of points.
     *
     * @sample highcharts/plotoptions/bubble-size/
     *         Bubble size
     *
     * @type {number|string}
     *
     * @private
     */
    maxSize: '50%',
    sizeBy: 'area',
    zoneAxis: 'y',
    crisp: false,
    tooltip: {
        pointFormat: 'Value: {point.value}'
    },
    /**
     * Flag to determine if nodes are draggable or not. Available for
     * graph with useSimulation set to true only.
     *
     * @since 7.1.0
     *
     * @private
     */
    draggable: true,
    /**
     * An option is giving a possibility to choose between using simulation
     * for calculating bubble positions. These reflects in both animation
     * and final position of bubbles. Simulation is also adding options to
     * the series graph based on used layout. In case of big data sets, with
     * any performance issues, it is possible to disable animation and pack
     * bubble in a simple circular way.
     *
     * @sample highcharts/series-packedbubble/spiral/
     *         useSimulation set to false
     *
     * @since 7.1.0
     *
     * @private
     */
    useSimulation: true,
    /**
     * Series options for parent nodes.
     *
     * @since 8.1.1
     *
     * @private
     */
    parentNode: {
        /**
         * Allow this series' parent nodes to be selected
         * by clicking on the graph.
         *
         * @since 8.1.1
         */
        allowPointSelect: false
    },
    /**
     *
     * @declare Highcharts.SeriesPackedBubbleDataLabelsOptionsObject
     *
     * @private
     */
    dataLabels: {
        /**
         * The
         * [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
         * specifying what to show for _node_ in the networkgraph. In v7.0
         * defaults to `{key}`, since v7.1 defaults to `undefined` and
         * `formatter` is used instead.
         *
         * @type      {string}
         * @since     7.0.0
         * @apioption plotOptions.packedbubble.dataLabels.format
         */
        // eslint-disable-next-line valid-jsdoc
        /**
         * Callback JavaScript function to format the data label for a node.
         * Note that if a `format` is defined, the format takes precedence
         * and the formatter is ignored.
         *
         * @since 7.0.0
         */
        formatter: function () {
            const { numberFormatter } = this.series.chart;
            const { value } = this.point;
            return PackedBubbleSeriesDefaults_isNumber(value) ? numberFormatter(value, -1) : '';
        },
        /**
         * @type      {string}
         * @since     7.1.0
         * @apioption plotOptions.packedbubble.dataLabels.parentNodeFormat
         */
        // eslint-disable-next-line valid-jsdoc
        /**
         * @since 7.1.0
         */
        parentNodeFormatter: function () {
            return this.name || '';
        },
        /**
         * @sample {highcharts} highcharts/demo/packed-bubble-project-status/
         *         Dashboard with dataLabels on parentNodes
         *
         * @declare Highcharts.SeriesPackedBubbleDataLabelsTextPathOptionsObject
         * @since   7.1.0
         */
        parentNodeTextPath: {
            /**
             * Presentation attributes for the text path.
             *
             * @type      {Highcharts.SVGAttributes}
             * @since     7.1.0
             * @apioption plotOptions.packedbubble.dataLabels.attributes
             */
            /**
             * Enable or disable `textPath` option for link's or marker's
             * data labels.
             *
             * @since 7.1.0
             */
            enabled: true
        },
        /**
         * Options for a _node_ label text which should follow marker's
         * shape.
         *
         * **Note:** Only SVG-based renderer supports this option.
         *
         * @extends   plotOptions.series.dataLabels.textPath
         * @apioption plotOptions.packedbubble.dataLabels.textPath
         */
        padding: 0,
        style: {
            transition: 'opacity 2000ms'
        }
    },
    /**
     * Options for layout algorithm when simulation is enabled. Inside there
     * are options to change the speed, padding, initial bubbles positions
     * and more.
     *
     * @extends   plotOptions.networkgraph.layoutAlgorithm
     * @excluding approximation, attractiveForce, repulsiveForce, theta
     * @since     7.1.0
     *
     * @private
     */
    layoutAlgorithm: {
        /**
         * Initial layout algorithm for positioning nodes. Can be one of
         * the built-in options ("circle", "random") or a function where
         * positions should be set on each node (`this.nodes`) as
         * `node.plotX` and `node.plotY`.
         *
         * @sample highcharts/series-networkgraph/initial-positions/
         *         Initial positions with callback
         *
         * @type {"circle"|"random"|Function}
         */
        initialPositions: 'circle',
        /**
         * @sample highcharts/series-packedbubble/initial-radius/
         *         Initial radius set to 200
         *
         * @extends   plotOptions.networkgraph.layoutAlgorithm.initialPositionRadius
         * @excluding states
         */
        initialPositionRadius: 20,
        /**
         * The distance between two bubbles, when the algorithm starts to
         * treat two bubbles as overlapping. The `bubblePadding` is also the
         * expected distance between all the bubbles on simulation end.
         */
        bubblePadding: 5,
        /**
         * Whether bubbles should interact with their parentNode to keep
         * them inside.
         */
        parentNodeLimit: false,
        /**
         * Whether series should interact with each other or not. When
         * `parentNodeLimit` is set to true, thi option should be set to
         * false to avoid sticking points in wrong series parentNode.
         */
        seriesInteraction: true,
        /**
         * In case of split series, this option allows user to drag and
         * drop points between series, for changing point related series.
         *
         * @sample highcharts/demo/packed-bubble-project-status/
         *         Example of drag'n drop bubbles for bubble kanban
         */
        dragBetweenSeries: false,
        /**
         * Layout algorithm options for parent nodes.
         *
         * @extends   plotOptions.networkgraph.layoutAlgorithm
         * @excluding approximation, attractiveForce, enableSimulation,
         *            repulsiveForce, theta
         */
        parentNodeOptions: {
            maxIterations: 400,
            gravitationalConstant: 0.03,
            maxSpeed: 50,
            initialPositionRadius: 100,
            seriesInteraction: true,
            /**
             * Styling options for parentNodes markers. Similar to
             * line.marker options.
             *
             * @sample highcharts/series-packedbubble/parentnode-style/
             *         Bubble size
             *
             * @extends   plotOptions.series.marker
             * @excluding states
             */
            marker: {
                fillColor: null,
                fillOpacity: 1,
                lineWidth: null,
                lineColor: null,
                symbol: 'circle'
            }
        },
        enableSimulation: true,
        /**
         * Type of the algorithm used when positioning bubbles.
         * @ignore-option
         */
        type: 'packedbubble',
        /**
         * Integration type. Integration determines how forces are applied
         * on particles. The `packedbubble` integration is based on
         * the networkgraph `verlet` integration, where the new position
         * is based on a previous position without velocity:
         * `newPosition += previousPosition - newPosition`.
         *
         * @sample highcharts/series-networkgraph/forces/
         *
         * @ignore-option
         */
        integration: 'packedbubble',
        maxIterations: 1000,
        /**
         * Whether to split series into individual groups or to mix all
         * series together.
         *
         * @since   7.1.0
         * @default false
         */
        splitSeries: false,
        /**
         * Max speed that node can get in one iteration. In terms of
         * simulation, it's a maximum translation (in pixels) that a node
         * can move (in both, x and y, dimensions). While `friction` is
         * applied on all nodes, max speed is applied only for nodes that
         * move very fast, for example small or disconnected ones.
         *
         * @see [layoutAlgorithm.integration](#series.networkgraph.layoutAlgorithm.integration)
         *
         * @see [layoutAlgorithm.friction](#series.networkgraph.layoutAlgorithm.friction)
         */
        maxSpeed: 5,
        gravitationalConstant: 0.01,
        friction: -0.981
    },
    stickyTracking: false
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const PackedBubble_PackedBubbleSeriesDefaults = (PackedBubbleSeriesDefaults);
/* *
 *
 *  API Options
 *
 * */
/**
 * A `packedbubble` series. If the [type](#series.packedbubble.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @type      {Object}
 * @extends   series,plotOptions.packedbubble
 * @excluding cropThreshold, dataParser, dataSorting, dataURL, dragDrop, stack,
 *            boostThreshold, boostBlending
 * @product   highcharts
 * @requires  highcharts-more
 * @apioption series.packedbubble
 */
/**
 * An array of data points for the series. For the `packedbubble` series type,
 * points can be given in the following ways:
 *
 * 1.  An array of `values`.
 *
 *  ```js
 *     data: [5, 1, 20]
 *  ```
 *
 * 2.  An array of objects with named values. The objects are point
 * configuration objects as seen below. If the total number of data points
 * exceeds the series' [turboThreshold](#series.packedbubble.turboThreshold),
 * this option is not available.
 *
 *  ```js
 *     data: [{
 *         value: 1,
 *         name: "Point2",
 *         color: "#00FF00"
 *     }, {
 *         value: 5,
 *         name: "Point1",
 *         color: "#FF00FF"
 *     }]
 *  ```
 *
 * @type      {Array<Object|Array>}
 * @extends   series.line.data
 * @excluding marker, x, y
 * @sample    {highcharts} highcharts/series/data-array-of-objects/
 *            Config objects
 * @product   highcharts
 * @apioption series.packedbubble.data
 */
/**
 * @type      {Highcharts.SeriesPackedBubbleDataLabelsOptionsObject|Array<Highcharts.SeriesPackedBubbleDataLabelsOptionsObject>}
 * @product   highcharts
 * @apioption series.packedbubble.data.dataLabels
 */
/**
 * @excluding enabled,enabledThreshold,height,radius,width
 * @product   highcharts
 * @apioption series.packedbubble.marker
 */
''; // Adds doclets above to transpiled file

;// ./code/es-modules/Series/Networkgraph/VerletIntegration.js
/* *
 *
 *  Networkgraph series
 *
 *  (c) 2010-2025 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Functions
 *
 * */
/**
 * Attractive force.
 *
 * In Verlet integration, force is applied on a node immediately to it's
 * `plotX` and `plotY` position.
 *
 * @private
 * @param {Highcharts.Point} link
 *        Link that connects two nodes
 * @param {number} force
 *        Force calculated in `repulsiveForceFunction`
 * @param {Highcharts.PositionObject} distanceXY
 *        Distance between two nodes e.g. `{x, y}`
 */
function attractive(link, force, distanceXY) {
    const massFactor = link.getMass(), translatedX = -distanceXY.x * force * this.diffTemperature, translatedY = -distanceXY.y * force * this.diffTemperature;
    if (!link.fromNode.fixedPosition) {
        link.fromNode.plotX -=
            translatedX * massFactor.fromNode / link.fromNode.degree;
        link.fromNode.plotY -=
            translatedY * massFactor.fromNode / link.fromNode.degree;
    }
    if (!link.toNode.fixedPosition) {
        link.toNode.plotX +=
            translatedX * massFactor.toNode / link.toNode.degree;
        link.toNode.plotY +=
            translatedY * massFactor.toNode / link.toNode.degree;
    }
}
/**
 * Attractive force function. Can be replaced by API's
 * `layoutAlgorithm.attractiveForce`
 *
 * @private
 * @param {number} d current distance between two nodes
 * @param {number} k expected distance between two nodes
 * @return {number} force
 */
function attractiveForceFunction(d, k) {
    // Used in API:
    return (k - d) / d;
}
/**
 * Barycenter force. Calculate and applys barycenter forces on the
 * nodes. Making them closer to the center of their barycenter point.
 *
 * In Verlet integration, force is applied on a node immediately to it's
 * `plotX` and `plotY` position.
 *
 * @private
 */
function barycenter() {
    const gravitationalConstant = this.options.gravitationalConstant || 0, xFactor = (this.barycenter.xFactor -
        (this.box.left + this.box.width) / 2) * gravitationalConstant, yFactor = (this.barycenter.yFactor -
        (this.box.top + this.box.height) / 2) * gravitationalConstant;
    this.nodes.forEach(function (node) {
        if (!node.fixedPosition) {
            node.plotX -=
                xFactor / node.mass / node.degree;
            node.plotY -=
                yFactor / node.mass / node.degree;
        }
    });
}
/**
 * Estiamte the best possible distance between two nodes, making graph
 * readable.
 * @private
 */
function getK(layout) {
    return Math.pow(layout.box.width * layout.box.height / layout.nodes.length, 0.5);
}
/**
 * Integration method.
 *
 * In Verlet integration, forces are applied on node immediately to it's
 * `plotX` and `plotY` position.
 *
 * Verlet without velocity:
 *
 *    x(n+1) = 2 * x(n) - x(n-1) + A(T) * deltaT ^ 2
 *
 * where:
 *     - x(n+1) - new position
 *     - x(n) - current position
 *     - x(n-1) - previous position
 *
 * Assuming A(t) = 0 (no acceleration) and (deltaT = 1) we get:
 *
 *     x(n+1) = x(n) + (x(n) - x(n-1))
 *
 * where:
 *     - (x(n) - x(n-1)) - position change
 *
 * TO DO:
 * Consider Verlet with velocity to support additional
 * forces. Or even Time-Corrected Verlet by Jonathan
 * "lonesock" Dummer
 *
 * @private
 * @param {Highcharts.NetworkgraphLayout} layout layout object
 * @param {Highcharts.Point} node node that should be translated
 */
function integrate(layout, node) {
    const friction = -layout.options.friction, maxSpeed = layout.options.maxSpeed, prevX = node.prevX, prevY = node.prevY, 
    // Apply friction:
    frictionX = ((node.plotX + node.dispX -
        prevX) * friction), frictionY = ((node.plotY + node.dispY -
        prevY) * friction), abs = Math.abs, signX = abs(frictionX) / (frictionX || 1), // Need to deal with 0
    signY = abs(frictionY) / (frictionY || 1), 
    // Apply max speed:
    diffX = signX * Math.min(maxSpeed, Math.abs(frictionX)), diffY = signY * Math.min(maxSpeed, Math.abs(frictionY));
    // Store for the next iteration:
    node.prevX = node.plotX + node.dispX;
    node.prevY = node.plotY + node.dispY;
    // Update positions:
    node.plotX += diffX;
    node.plotY += diffY;
    node.temperature = layout.vectorLength({
        x: diffX,
        y: diffY
    });
}
/**
 * Repulsive force.
 *
 * In Verlet integration, force is applied on a node immediately to it's
 * `plotX` and `plotY` position.
 *
 * @private
 * @param {Highcharts.Point} node
 *        Node that should be translated by force.
 * @param {number} force
 *        Force calculated in `repulsiveForceFunction`
 * @param {Highcharts.PositionObject} distanceXY
 *        Distance between two nodes e.g. `{x, y}`
 */
function repulsive(node, force, distanceXY) {
    const factor = force * this.diffTemperature / node.mass / node.degree;
    if (!node.fixedPosition) {
        node.plotX += distanceXY.x * factor;
        node.plotY += distanceXY.y * factor;
    }
}
/**
 * Repulsive force function. Can be replaced by API's
 * `layoutAlgorithm.repulsiveForce`
 *
 * @private
 * @param {number} d current distance between two nodes
 * @param {number} k expected distance between two nodes
 * @return {number} force
 */
function repulsiveForceFunction(d, k) {
    // Used in API:
    return (k - d) / d * (k > d ? 1 : 0); // Force only for close nodes
}
/* *
 *
 *  Default Export
 *
 * */
const VerletIntegration = {
    attractive,
    attractiveForceFunction,
    barycenter,
    getK,
    integrate,
    repulsive,
    repulsiveForceFunction
};
/* harmony default export */ const Networkgraph_VerletIntegration = (VerletIntegration);

;// ./code/es-modules/Series/PackedBubble/PackedBubbleIntegration.js
/* *
 *
 *  (c) 2010-2025 Grzegorz Blachlinski, Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { noop: PackedBubbleIntegration_noop } = (external_highcharts_src_js_default_default());

/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function PackedBubbleIntegration_barycenter() {
    const layout = this, gravitationalConstant = layout.options.gravitationalConstant || 0, box = layout.box, nodes = layout.nodes, nodeCountSqrt = Math.sqrt(nodes.length);
    let centerX, centerY;
    for (const node of nodes) {
        if (!node.fixedPosition) {
            const massTimesNodeCountSqrt = node.mass * nodeCountSqrt, plotX = node.plotX || 0, plotY = node.plotY || 0, series = node.series, parentNode = series.parentNode;
            if (this.resolveSplitSeries(node) &&
                parentNode &&
                !node.isParentNode) {
                centerX = parentNode.plotX || 0;
                centerY = parentNode.plotY || 0;
            }
            else {
                centerX = box.width / 2;
                centerY = box.height / 2;
            }
            node.plotX = plotX - ((plotX - centerX) *
                gravitationalConstant /
                massTimesNodeCountSqrt);
            node.plotY = plotY - ((plotY - centerY) *
                gravitationalConstant /
                massTimesNodeCountSqrt);
            if (series.chart.hoverPoint === node &&
                // If redrawHalo exists we know its a draggable series and any
                // halo present should be redrawn to update its visual position
                series.redrawHalo && series.halo) {
                series.redrawHalo(node);
            }
        }
    }
}
/**
 * @private
 */
function PackedBubbleIntegration_repulsive(node, force, distanceXY, repNode) {
    const factor = (force * this.diffTemperature / node.mass /
        node.degree), x = distanceXY.x * factor, y = distanceXY.y * factor;
    if (!node.fixedPosition) {
        node.plotX += x;
        node.plotY += y;
    }
    if (!repNode.fixedPosition) {
        repNode.plotX -= x;
        repNode.plotY -= y;
    }
}
/**
 * @private
 */
function PackedBubbleIntegration_repulsiveForceFunction(d, k, node, repNode) {
    return Math.min(d, (node.marker.radius +
        repNode.marker.radius) / 2);
}
/* *
 *
 *  Default Export
 *
 * */
const PackedBubbleIntegration = {
    barycenter: PackedBubbleIntegration_barycenter,
    getK: PackedBubbleIntegration_noop,
    integrate: Networkgraph_VerletIntegration.integrate,
    repulsive: PackedBubbleIntegration_repulsive,
    repulsiveForceFunction: PackedBubbleIntegration_repulsiveForceFunction
};
/* harmony default export */ const PackedBubble_PackedBubbleIntegration = (PackedBubbleIntegration);

;// ./code/es-modules/Series/Networkgraph/EulerIntegration.js
/* *
 *
 *  Networkgraph series
 *
 *  (c) 2010-2025 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Functions
 *
 * */
/**
 * Attractive force.
 *
 * In Euler integration, force is stored in a node, not changing it's
 * position. Later, in `integrate()` forces are applied on nodes.
 *
 * @private
 * @param {Highcharts.Point} link
 *        Link that connects two nodes
 * @param {number} force
 *        Force calculated in `repulsiveForceFunction`
 * @param {Highcharts.PositionObject} distanceXY
 *        Distance between two nodes e.g. `{x, y}`
 * @param {number} distanceR
     */
function EulerIntegration_attractive(link, force, distanceXY, distanceR) {
    const massFactor = link.getMass(), translatedX = (distanceXY.x / distanceR) * force, translatedY = (distanceXY.y / distanceR) * force;
    if (!link.fromNode.fixedPosition) {
        link.fromNode.dispX -=
            translatedX * massFactor.fromNode / link.fromNode.degree;
        link.fromNode.dispY -=
            translatedY * massFactor.fromNode / link.fromNode.degree;
    }
    if (!link.toNode.fixedPosition) {
        link.toNode.dispX +=
            translatedX * massFactor.toNode / link.toNode.degree;
        link.toNode.dispY +=
            translatedY * massFactor.toNode / link.toNode.degree;
    }
}
/**
 * Attractive force function. Can be replaced by API's
 * `layoutAlgorithm.attractiveForce`
 *
 * Other forces that can be used:
 *
 * basic, not recommended:
 *    `function (d, k) { return d / k }`
 *
 * @private
 * @param {number} d current distance between two nodes
 * @param {number} k expected distance between two nodes
 * @return {number} force
 */
function EulerIntegration_attractiveForceFunction(d, k) {
    return d * d / k;
}
/**
 * Barycenter force. Calculate and applys barycenter forces on the
 * nodes. Making them closer to the center of their barycenter point.
 *
 * In Euler integration, force is stored in a node, not changing it's
 * position. Later, in `integrate()` forces are applied on nodes.
 *
 * @private
 */
function EulerIntegration_barycenter() {
    const gravitationalConstant = this.options.gravitationalConstant, xFactor = this.barycenter.xFactor, yFactor = this.barycenter.yFactor;
    this.nodes.forEach(function (node) {
        if (!node.fixedPosition) {
            const degree = node.getDegree(), phi = degree * (1 + degree / 2);
            node.dispX += ((xFactor - node.plotX) *
                gravitationalConstant *
                phi / node.degree);
            node.dispY += ((yFactor - node.plotY) *
                gravitationalConstant *
                phi / node.degree);
        }
    });
}
/**
 * Estimate the best possible distance between two nodes, making graph
 * readable.
 * @private
 */
function EulerIntegration_getK(layout) {
    return Math.pow(layout.box.width * layout.box.height / layout.nodes.length, 0.3);
}
/**
 * Integration method.
 *
 * In Euler integration, force were stored in a node, not changing it's
 * position. Now, in the integrator method, we apply changes.
 *
 * Euler:
 *
 * Basic form: `x(n+1) = x(n) + v(n)`
 *
 * With Rengoild-Fruchterman we get:
 * `x(n+1) = x(n) + v(n) / length(v(n)) * min(v(n), temperature(n))`
 * where:
 * - `x(n+1)`: next position
 * - `x(n)`: current position
 * - `v(n)`: velocity (comes from net force)
 * - `temperature(n)`: current temperature
 *
 * Known issues:
 * Oscillations when force vector has the same magnitude but opposite
 * direction in the next step. Potentially solved by decreasing force by
 * `v * (1 / node.degree)`
 *
 * Note:
 * Actually `min(v(n), temperature(n))` replaces simulated annealing.
 *
 * @private
 * @param {Highcharts.NetworkgraphLayout} layout
 *        Layout object
 * @param {Highcharts.Point} node
 *        Node that should be translated
 */
function EulerIntegration_integrate(layout, node) {
    node.dispX +=
        node.dispX * layout.options.friction;
    node.dispY +=
        node.dispY * layout.options.friction;
    const distanceR = node.temperature = layout.vectorLength({
        x: node.dispX,
        y: node.dispY
    });
    if (distanceR !== 0) {
        node.plotX += (node.dispX / distanceR *
            Math.min(Math.abs(node.dispX), layout.temperature));
        node.plotY += (node.dispY / distanceR *
            Math.min(Math.abs(node.dispY), layout.temperature));
    }
}
/**
 * Repulsive force.
 *
 * @private
 * @param {Highcharts.Point} node
 *        Node that should be translated by force.
 * @param {number} force
 *        Force calculated in `repulsiveForceFunction`
 * @param {Highcharts.PositionObject} distanceXY
 *        Distance between two nodes e.g. `{x, y}`
 */
function EulerIntegration_repulsive(node, force, distanceXY, distanceR) {
    node.dispX +=
        (distanceXY.x / distanceR) * force / node.degree;
    node.dispY +=
        (distanceXY.y / distanceR) * force / node.degree;
}
/**
 * Repulsive force function. Can be replaced by API's
 * `layoutAlgorithm.repulsiveForce`.
 *
 * Other forces that can be used:
 *
 * basic, not recommended:
 *    `function (d, k) { return k / d }`
 *
 * standard:
 *    `function (d, k) { return k * k / d }`
 *
 * grid-variant:
 *    `function (d, k) { return k * k / d * (2 * k - d > 0 ? 1 : 0) }`
 *
 * @private
 * @param {number} d current distance between two nodes
 * @param {number} k expected distance between two nodes
 * @return {number} force
 */
function EulerIntegration_repulsiveForceFunction(d, k) {
    return k * k / d;
}
/* *
 *
 *  Default Export
 *
 * */
const EulerIntegration = {
    attractive: EulerIntegration_attractive,
    attractiveForceFunction: EulerIntegration_attractiveForceFunction,
    barycenter: EulerIntegration_barycenter,
    getK: EulerIntegration_getK,
    integrate: EulerIntegration_integrate,
    repulsive: EulerIntegration_repulsive,
    repulsiveForceFunction: EulerIntegration_repulsiveForceFunction
};
/* harmony default export */ const Networkgraph_EulerIntegration = (EulerIntegration);

;// ./code/es-modules/Series/Networkgraph/QuadTreeNode.js
/* *
 *
 *  Networkgraph series
 *
 *  (c) 2010-2025 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Class
 *
 * */
/**
 * The QuadTree node class. Used in Networkgraph chart as a base for Barnes-Hut
 * approximation.
 *
 * @private
 * @class
 * @name Highcharts.QuadTreeNode
 *
 * @param {Highcharts.Dictionary<number>} box
 *        Available space for the node
 */
class QuadTreeNode {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(box) {
        /* *
         *
         *  Properties
         *
         * */
        /**
         * Read only. If QuadTreeNode is an external node, Point is stored in
         * `this.body`.
         *
         * @name Highcharts.QuadTreeNode#body
         * @type {boolean|Highcharts.Point}
         */
        this.body = false;
        /**
         * Read only. Internal nodes when created are empty to reserve the
         * space. If Point is added to this QuadTreeNode, QuadTreeNode is no
         * longer empty.
         *
         * @name Highcharts.QuadTreeNode#isEmpty
         * @type {boolean}
         */
        this.isEmpty = false;
        /**
         * Read only. Flag to determine if QuadTreeNode is internal (and has
         * subnodes with mass and central position) or external (bound to
         * Point).
         *
         * @name Highcharts.QuadTreeNode#isInternal
         * @type {boolean}
         */
        this.isInternal = false;
        /**
         * Read only. Array of subnodes. Empty if QuadTreeNode has just one
         * Point. When added another Point to this QuadTreeNode, array is
         * filled with four subnodes.
         *
         * @name Highcharts.QuadTreeNode#nodes
         * @type {Array<Highcharts.QuadTreeNode>}
         */
        this.nodes = [];
        /**
         * Read only. The available space for node.
         *
         * @name Highcharts.QuadTreeNode#box
         * @type {Highcharts.Dictionary<number>}
         */
        this.box = box;
        /**
         * Read only. The minium of width and height values.
         *
         * @name Highcharts.QuadTreeNode#boxSize
         * @type {number}
         */
        this.boxSize = Math.min(box.width, box.height);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * When inserting another node into the box, that already hove one node,
     * divide the available space into another four quadrants.
     *
     * Indexes of quadrants are:
     * ```
     * -------------               -------------
     * |           |               |     |     |
     * |           |               |  0  |  1  |
     * |           |   divide()    |     |     |
     * |     1     | ----------->  -------------
     * |           |               |     |     |
     * |           |               |  3  |  2  |
     * |           |               |     |     |
     * -------------               -------------
     * ```
     */
    divideBox() {
        const halfWidth = this.box.width / 2, halfHeight = this.box.height / 2;
        // Top left
        this.nodes[0] = new QuadTreeNode({
            left: this.box.left,
            top: this.box.top,
            width: halfWidth,
            height: halfHeight
        });
        // Top right
        this.nodes[1] = new QuadTreeNode({
            left: this.box.left + halfWidth,
            top: this.box.top,
            width: halfWidth,
            height: halfHeight
        });
        // Bottom right
        this.nodes[2] = new QuadTreeNode({
            left: this.box.left + halfWidth,
            top: this.box.top + halfHeight,
            width: halfWidth,
            height: halfHeight
        });
        // Bottom left
        this.nodes[3] = new QuadTreeNode({
            left: this.box.left,
            top: this.box.top + halfHeight,
            width: halfWidth,
            height: halfHeight
        });
    }
    /**
     * Determine which of the quadrants should be used when placing node in
     * the QuadTree. Returned index is always in range `< 0 , 3 >`.
     * @private
     */
    getBoxPosition(point) {
        const left = point.plotX < this.box.left + this.box.width / 2, top = point.plotY < this.box.top + this.box.height / 2;
        let index;
        if (left) {
            if (top) {
                // Top left
                index = 0;
            }
            else {
                // Bottom left
                index = 3;
            }
        }
        else {
            if (top) {
                // Top right
                index = 1;
            }
            else {
                // Bottom right
                index = 2;
            }
        }
        return index;
    }
    /**
     * Insert recursively point(node) into the QuadTree. If the given
     * quadrant is already occupied, divide it into smaller quadrants.
     *
     * @param {Highcharts.Point} point
     *        Point/node to be inserted
     * @param {number} depth
     *        Max depth of the QuadTree
     */
    insert(point, depth) {
        let newQuadTreeNode;
        if (this.isInternal) {
            // Internal node:
            this.nodes[this.getBoxPosition(point)].insert(point, depth - 1);
        }
        else {
            this.isEmpty = false;
            if (!this.body) {
                // First body in a quadrant:
                this.isInternal = false;
                this.body = point;
            }
            else {
                if (depth) {
                    // Every other body in a quadrant:
                    this.isInternal = true;
                    this.divideBox();
                    // Reinsert main body only once:
                    if (this.body !== true) {
                        this.nodes[this.getBoxPosition(this.body)]
                            .insert(this.body, depth - 1);
                        this.body = true;
                    }
                    // Add second body:
                    this.nodes[this.getBoxPosition(point)]
                        .insert(point, depth - 1);
                }
                else {
                    // We are below max allowed depth. That means either:
                    // - really huge number of points
                    // - falling two points into exactly the same position
                    // In this case, create another node in the QuadTree.
                    //
                    // Alternatively we could add some noise to the
                    // position, but that could result in different
                    // rendered chart in exporting.
                    newQuadTreeNode = new QuadTreeNode({
                        top: point.plotX || NaN,
                        left: point.plotY || NaN,
                        // Width/height below 1px
                        width: 0.1,
                        height: 0.1
                    });
                    newQuadTreeNode.body = point;
                    newQuadTreeNode.isInternal = false;
                    this.nodes.push(newQuadTreeNode);
                }
            }
        }
    }
    /**
     * Each quad node requires it's mass and center position. That mass and
     * position is used to imitate real node in the layout by approximation.
     */
    updateMassAndCenter() {
        let mass = 0, plotX = 0, plotY = 0;
        if (this.isInternal) {
            // Calculate weightened mass of the quad node:
            for (const pointMass of this.nodes) {
                if (!pointMass.isEmpty) {
                    mass += pointMass.mass;
                    plotX += pointMass.plotX * pointMass.mass;
                    plotY += pointMass.plotY * pointMass.mass;
                }
            }
            plotX /= mass;
            plotY /= mass;
        }
        else if (this.body) {
            // Just one node, use coordinates directly:
            mass = this.body.mass;
            plotX = this.body.plotX;
            plotY = this.body.plotY;
        }
        // Store details:
        this.mass = mass;
        this.plotX = plotX;
        this.plotY = plotY;
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Networkgraph_QuadTreeNode = (QuadTreeNode);

;// ./code/es-modules/Series/Networkgraph/QuadTree.js
/* *
 *
 *  Networkgraph series
 *
 *  (c) 2010-2025 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


/* *
 *
 *  Class
 *
 * */
/**
 * The QuadTree class. Used in Networkgraph chart as a base for Barnes-Hut
 * approximation.
 *
 * @private
 * @class
 * @name Highcharts.QuadTree
 *
 * @param {number} x
 *        Left position of the plotting area
 * @param {number} y
 *        Top position of the plotting area
 * @param {number} width
 *        Width of the plotting area
 * @param {number} height
 *        Height of the plotting area
 */
class QuadTree {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(x, y, width, height) {
        // Boundary rectangle:
        this.box = {
            left: x,
            top: y,
            width: width,
            height: height
        };
        this.maxDepth = 25;
        this.root = new Networkgraph_QuadTreeNode(this.box);
        this.root.isInternal = true;
        this.root.isRoot = true;
        this.root.divideBox();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Calculate mass of the each QuadNode in the tree.
     */
    calculateMassAndCenter() {
        this.visitNodeRecursive(null, null, function (node) {
            node.updateMassAndCenter();
        });
    }
    /**
     * Insert nodes into the QuadTree
     *
     * @param {Array<Highcharts.Point>} points
     *        Points as nodes
     */
    insertNodes(points) {
        for (const point of points) {
            this.root.insert(point, this.maxDepth);
        }
    }
    /**
     * Depth first treversal (DFS). Using `before` and `after` callbacks,
     * we can get two results: preorder and postorder traversals, reminder:
     *
     * ```
     *     (a)
     *     / \
     *   (b) (c)
     *   / \
     * (d) (e)
     * ```
     *
     * DFS (preorder): `a -> b -> d -> e -> c`
     *
     * DFS (postorder): `d -> e -> b -> c -> a`
     *
     * @param {Highcharts.QuadTreeNode|null} node
     *        QuadTree node
     * @param {Function} [beforeCallback]
     *        Function to be called before visiting children nodes.
     * @param {Function} [afterCallback]
     *        Function to be called after visiting children nodes.
     */
    visitNodeRecursive(node, beforeCallback, afterCallback) {
        let goFurther;
        if (!node) {
            node = this.root;
        }
        if (node === this.root && beforeCallback) {
            goFurther = beforeCallback(node);
        }
        if (goFurther === false) {
            return;
        }
        for (const qtNode of node.nodes) {
            if (qtNode.isInternal) {
                if (beforeCallback) {
                    goFurther = beforeCallback(qtNode);
                }
                if (goFurther === false) {
                    continue;
                }
                this.visitNodeRecursive(qtNode, beforeCallback, afterCallback);
            }
            else if (qtNode.body) {
                if (beforeCallback) {
                    beforeCallback(qtNode.body);
                }
            }
            if (afterCallback) {
                afterCallback(qtNode);
            }
        }
        if (node === this.root && afterCallback) {
            afterCallback(node);
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Networkgraph_QuadTree = (QuadTree);

;// ./code/es-modules/Series/Networkgraph/ReingoldFruchtermanLayout.js
/* *
 *
 *  Networkgraph series
 *
 *  (c) 2010-2025 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { win } = (external_highcharts_src_js_default_default());



const { clamp: ReingoldFruchtermanLayout_clamp, defined: ReingoldFruchtermanLayout_defined, isFunction, fireEvent: ReingoldFruchtermanLayout_fireEvent, pick: ReingoldFruchtermanLayout_pick } = (external_highcharts_src_js_default_default());

/* *
 *
 *  Class
 *
 * */
/**
 * Reingold-Fruchterman algorithm from
 * "Graph Drawing by Force-directed Placement" paper.
 * @private
 */
class ReingoldFruchtermanLayout {
    constructor() {
        /* *
         *
         *  Static Functions
         *
         * */
        this.box = {};
        this.currentStep = 0;
        this.initialRendering = true;
        this.links = [];
        this.nodes = [];
        this.series = [];
        this.simulation = false;
    }
    static compose(ChartClass) {
        Series_GraphLayoutComposition.compose(ChartClass);
        Series_GraphLayoutComposition.integrations.euler = Networkgraph_EulerIntegration;
        Series_GraphLayoutComposition.integrations.verlet = Networkgraph_VerletIntegration;
        Series_GraphLayoutComposition.layouts['reingold-fruchterman'] =
            ReingoldFruchtermanLayout;
    }
    init(options) {
        this.options = options;
        this.nodes = [];
        this.links = [];
        this.series = [];
        this.box = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        this.setInitialRendering(true);
        this.integration =
            Series_GraphLayoutComposition.integrations[options.integration];
        this.enableSimulation = options.enableSimulation;
        this.attractiveForce = ReingoldFruchtermanLayout_pick(options.attractiveForce, this.integration.attractiveForceFunction);
        this.repulsiveForce = ReingoldFruchtermanLayout_pick(options.repulsiveForce, this.integration.repulsiveForceFunction);
        this.approximation = options.approximation;
    }
    updateSimulation(enable) {
        this.enableSimulation = ReingoldFruchtermanLayout_pick(enable, this.options.enableSimulation);
    }
    start() {
        const layout = this, series = this.series, options = this.options;
        layout.currentStep = 0;
        layout.forces = series[0] && series[0].forces || [];
        layout.chart = series[0] && series[0].chart;
        if (layout.initialRendering) {
            layout.initPositions();
            // Render elements in initial positions:
            series.forEach(function (s) {
                s.finishedAnimating = true; // #13169
                s.render();
            });
        }
        layout.setK();
        layout.resetSimulation(options);
        if (layout.enableSimulation) {
            layout.step();
        }
    }
    step() {
        const anyLayout = this, allSeries = this.series;
        // Algorithm:
        this.currentStep++;
        if (this.approximation === 'barnes-hut') {
            this.createQuadTree();
            this.quadTree.calculateMassAndCenter();
        }
        for (const forceName of this.forces || []) {
            anyLayout[forceName + 'Forces'](this.temperature);
        }
        // Limit to the plotting area and cool down:
        this.applyLimits();
        // Cool down the system:
        this.temperature = this.coolDown(this.startTemperature, this.diffTemperature, this.currentStep);
        this.prevSystemTemperature = this.systemTemperature;
        this.systemTemperature = this.getSystemTemperature();
        if (this.enableSimulation) {
            for (const series of allSeries) {
                // Chart could be destroyed during the simulation
                if (series.chart) {
                    series.render();
                }
            }
            if (this.maxIterations-- &&
                isFinite(this.temperature) &&
                !this.isStable()) {
                if (this.simulation) {
                    win.cancelAnimationFrame(this.simulation);
                }
                this.simulation = win.requestAnimationFrame(() => this.step());
            }
            else {
                this.simulation = false;
                this.series.forEach((s) => {
                    ReingoldFruchtermanLayout_fireEvent(s, 'afterSimulation');
                });
            }
        }
    }
    stop() {
        if (this.simulation) {
            win.cancelAnimationFrame(this.simulation);
        }
    }
    setArea(x, y, w, h) {
        this.box = {
            left: x,
            top: y,
            width: w,
            height: h
        };
    }
    setK() {
        // Optimal distance between nodes,
        // available space around the node:
        this.k = this.options.linkLength || this.integration.getK(this);
    }
    addElementsToCollection(elements, collection) {
        for (const element of elements) {
            if (collection.indexOf(element) === -1) {
                collection.push(element);
            }
        }
    }
    removeElementFromCollection(element, collection) {
        const index = collection.indexOf(element);
        if (index !== -1) {
            collection.splice(index, 1);
        }
    }
    clear() {
        this.nodes.length = 0;
        this.links.length = 0;
        this.series.length = 0;
        this.resetSimulation();
    }
    resetSimulation() {
        this.forcedStop = false;
        this.systemTemperature = 0;
        this.setMaxIterations();
        this.setTemperature();
        this.setDiffTemperature();
    }
    restartSimulation() {
        if (!this.simulation) {
            // When dragging nodes, we don't need to calculate
            // initial positions and rendering nodes:
            this.setInitialRendering(false);
            // Start new simulation:
            if (!this.enableSimulation) {
                // Run only one iteration to speed things up:
                this.setMaxIterations(1);
            }
            else {
                this.start();
            }
            if (this.chart) {
                this.chart.redraw();
            }
            // Restore defaults:
            this.setInitialRendering(true);
        }
        else {
            // Extend current simulation:
            this.resetSimulation();
        }
    }
    setMaxIterations(maxIterations) {
        this.maxIterations = ReingoldFruchtermanLayout_pick(maxIterations, this.options.maxIterations);
    }
    setTemperature() {
        this.temperature = this.startTemperature =
            Math.sqrt(this.nodes.length);
    }
    setDiffTemperature() {
        this.diffTemperature = this.startTemperature /
            (this.options.maxIterations + 1);
    }
    setInitialRendering(enable) {
        this.initialRendering = enable;
    }
    createQuadTree() {
        this.quadTree = new Networkgraph_QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
        this.quadTree.insertNodes(this.nodes);
    }
    initPositions() {
        const initialPositions = this.options.initialPositions;
        if (isFunction(initialPositions)) {
            initialPositions.call(this);
            for (const node of this.nodes) {
                if (!ReingoldFruchtermanLayout_defined(node.prevX)) {
                    node.prevX = node.plotX;
                }
                if (!ReingoldFruchtermanLayout_defined(node.prevY)) {
                    node.prevY = node.plotY;
                }
                node.dispX = 0;
                node.dispY = 0;
            }
        }
        else if (initialPositions === 'circle') {
            this.setCircularPositions();
        }
        else {
            this.setRandomPositions();
        }
    }
    setCircularPositions() {
        const box = this.box, nodes = this.nodes, nodesLength = nodes.length + 1, angle = 2 * Math.PI / nodesLength, rootNodes = nodes.filter(function (node) {
            return node.linksTo.length === 0;
        }), visitedNodes = {}, radius = this.options.initialPositionRadius, addToNodes = (node) => {
            for (const link of node.linksFrom || []) {
                if (!visitedNodes[link.toNode.id]) {
                    visitedNodes[link.toNode.id] = true;
                    sortedNodes.push(link.toNode);
                    addToNodes(link.toNode);
                }
            }
        };
        let sortedNodes = [];
        // Start with identified root nodes an sort the nodes by their
        // hierarchy. In trees, this ensures that branches don't cross
        // eachother.
        for (const rootNode of rootNodes) {
            sortedNodes.push(rootNode);
            addToNodes(rootNode);
        }
        // Cyclic tree, no root node found
        if (!sortedNodes.length) {
            sortedNodes = nodes;
            // Dangling, cyclic trees
        }
        else {
            for (const node of nodes) {
                if (sortedNodes.indexOf(node) === -1) {
                    sortedNodes.push(node);
                }
            }
        }
        let node;
        // Initial positions are laid out along a small circle, appearing
        // as a cluster in the middle
        for (let i = 0, iEnd = sortedNodes.length; i < iEnd; ++i) {
            node = sortedNodes[i];
            node.plotX = node.prevX = ReingoldFruchtermanLayout_pick(node.plotX, box.width / 2 + radius * Math.cos(i * angle));
            node.plotY = node.prevY = ReingoldFruchtermanLayout_pick(node.plotY, box.height / 2 + radius * Math.sin(i * angle));
            node.dispX = 0;
            node.dispY = 0;
        }
    }
    setRandomPositions() {
        const box = this.box, nodes = this.nodes, nodesLength = nodes.length + 1, 
        /**
         * Return a repeatable, quasi-random number based on an integer
         * input. For the initial positions
         * @private
         */
        unrandom = (n) => {
            let rand = n * n / Math.PI;
            rand = rand - Math.floor(rand);
            return rand;
        };
        let node;
        // Initial positions:
        for (let i = 0, iEnd = nodes.length; i < iEnd; ++i) {
            node = nodes[i];
            node.plotX = node.prevX = ReingoldFruchtermanLayout_pick(node.plotX, box.width * unrandom(i));
            node.plotY = node.prevY = ReingoldFruchtermanLayout_pick(node.plotY, box.height * unrandom(nodesLength + i));
            node.dispX = 0;
            node.dispY = 0;
        }
    }
    force(name, ...args) {
        this.integration[name].apply(this, args);
    }
    barycenterForces() {
        this.getBarycenter();
        this.force('barycenter');
    }
    getBarycenter() {
        let systemMass = 0, cx = 0, cy = 0;
        for (const node of this.nodes) {
            cx += node.plotX * node.mass;
            cy += node.plotY * node.mass;
            systemMass += node.mass;
        }
        this.barycenter = {
            x: cx,
            y: cy,
            xFactor: cx / systemMass,
            yFactor: cy / systemMass
        };
        return this.barycenter;
    }
    barnesHutApproximation(node, quadNode) {
        const distanceXY = this.getDistXY(node, quadNode), distanceR = this.vectorLength(distanceXY);
        let goDeeper, force;
        if (node !== quadNode && distanceR !== 0) {
            if (quadNode.isInternal) {
                // Internal node:
                if (quadNode.boxSize / distanceR <
                    this.options.theta &&
                    distanceR !== 0) {
                    // Treat as an external node:
                    force = this.repulsiveForce(distanceR, this.k);
                    this.force('repulsive', node, force * quadNode.mass, distanceXY, distanceR);
                    goDeeper = false;
                }
                else {
                    // Go deeper:
                    goDeeper = true;
                }
            }
            else {
                // External node, direct force:
                force = this.repulsiveForce(distanceR, this.k);
                this.force('repulsive', node, force * quadNode.mass, distanceXY, distanceR);
            }
        }
        return goDeeper;
    }
    repulsiveForces() {
        if (this.approximation === 'barnes-hut') {
            for (const node of this.nodes) {
                this.quadTree.visitNodeRecursive(null, (quadNode) => (this.barnesHutApproximation(node, quadNode)));
            }
        }
        else {
            let force, distanceR, distanceXY;
            for (const node of this.nodes) {
                for (const repNode of this.nodes) {
                    if (
                    // Node cannot repulse itself:
                    node !== repNode &&
                        // Only close nodes affect each other:
                        // layout.getDistR(node, repNode) < 2 * k &&
                        // Not dragged:
                        !node.fixedPosition) {
                        distanceXY = this.getDistXY(node, repNode);
                        distanceR = this.vectorLength(distanceXY);
                        if (distanceR !== 0) {
                            force = this.repulsiveForce(distanceR, this.k);
                            this.force('repulsive', node, force * repNode.mass, distanceXY, distanceR);
                        }
                    }
                }
            }
        }
    }
    attractiveForces() {
        let distanceXY, distanceR, force;
        for (const link of this.links) {
            if (link.fromNode && link.toNode) {
                distanceXY = this.getDistXY(link.fromNode, link.toNode);
                distanceR = this.vectorLength(distanceXY);
                if (distanceR !== 0) {
                    force = this.attractiveForce(distanceR, this.k);
                    this.force('attractive', link, force, distanceXY, distanceR);
                }
            }
        }
    }
    applyLimits() {
        const nodes = this.nodes;
        for (const node of nodes) {
            if (node.fixedPosition) {
                continue;
            }
            this.integration.integrate(this, node);
            this.applyLimitBox(node, this.box);
            // Reset displacement:
            node.dispX = 0;
            node.dispY = 0;
        }
    }
    /**
     * External box that nodes should fall. When hitting an edge, node
     * should stop or bounce.
     * @private
     */
    applyLimitBox(node, box) {
        const radius = node.radius;
        /*
        TO DO: Consider elastic collision instead of stopping.
        o' means end position when hitting plotting area edge:

        - "inelastic":
        o
            \
        ______
        |  o'
        |   \
        |    \

        - "elastic"/"bounced":
        o
            \
        ______
        |  ^
        | / \
        |o'  \

        Euler sample:
        if (plotX < 0) {
            plotX = 0;
            dispX *= -1;
        }

        if (plotX > box.width) {
            plotX = box.width;
            dispX *= -1;
        }

        */
        // Limit X-coordinates:
        node.plotX = ReingoldFruchtermanLayout_clamp(node.plotX, box.left + radius, box.width - radius);
        // Limit Y-coordinates:
        node.plotY = ReingoldFruchtermanLayout_clamp(node.plotY, box.top + radius, box.height - radius);
    }
    /**
     * From "A comparison of simulated annealing cooling strategies" by
     * Nourani and Andresen work.
     * @private
     */
    coolDown(temperature, temperatureStep, currentStep) {
        // Logarithmic:
        /*
        return Math.sqrt(this.nodes.length) -
            Math.log(
                currentStep * layout.diffTemperature
            );
        */
        // Exponential:
        /*
        let alpha = 0.1;
        layout.temperature = Math.sqrt(layout.nodes.length) *
            Math.pow(alpha, layout.diffTemperature);
        */
        // Linear:
        return temperature - temperatureStep * currentStep;
    }
    isStable() {
        return Math.abs(this.systemTemperature -
            this.prevSystemTemperature) < 0.00001 || this.temperature <= 0;
    }
    getSystemTemperature() {
        let value = 0;
        for (const node of this.nodes) {
            value += node.temperature;
        }
        return value;
    }
    vectorLength(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    }
    getDistR(nodeA, nodeB) {
        const distance = this.getDistXY(nodeA, nodeB);
        return this.vectorLength(distance);
    }
    getDistXY(nodeA, nodeB) {
        const xDist = nodeA.plotX - nodeB.plotX, yDist = nodeA.plotY - nodeB.plotY;
        return {
            x: xDist,
            y: yDist,
            absX: Math.abs(xDist),
            absY: Math.abs(yDist)
        };
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Networkgraph_ReingoldFruchtermanLayout = (ReingoldFruchtermanLayout);

;// ./code/es-modules/Series/PackedBubble/PackedBubbleLayout.js
/* *
 *
 *  (c) 2010-2025 Grzegorz Blachlinski, Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */





const { addEvent: PackedBubbleLayout_addEvent, defined: PackedBubbleLayout_defined, pick: PackedBubbleLayout_pick } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function chartGetSelectedParentNodes() {
    const allSeries = this.series, selectedParentsNodes = [];
    allSeries.forEach((series) => {
        if (series.parentNode && series.parentNode.selected) {
            selectedParentsNodes.push(series.parentNode);
        }
    });
    return selectedParentsNodes;
}
/**
 * Remove accumulated data points to redistribute all of them again
 * (i.e after hiding series by legend)
 * @private
 */
function onChartBeforeRedraw() {
    if (this.allDataPoints) {
        delete this.allDataPoints;
    }
}
/* *
 *
 *  Class
 *
 * */
class PackedBubbleLayout extends Networkgraph_ReingoldFruchtermanLayout {
    constructor() {
        /* *
         *
         *  Static Functions
         *
         * */
        super(...arguments);
        this.index = NaN;
        this.nodes = [];
        this.series = [];
    }
    static compose(ChartClass) {
        Networkgraph_ReingoldFruchtermanLayout.compose(ChartClass);
        Series_GraphLayoutComposition.integrations.packedbubble = PackedBubble_PackedBubbleIntegration;
        Series_GraphLayoutComposition.layouts.packedbubble = PackedBubbleLayout;
        const chartProto = ChartClass.prototype;
        if (!chartProto.getSelectedParentNodes) {
            PackedBubbleLayout_addEvent(ChartClass, 'beforeRedraw', onChartBeforeRedraw);
            chartProto.getSelectedParentNodes = chartGetSelectedParentNodes;
        }
        if (!chartProto.allParentNodes) {
            chartProto.allParentNodes = [];
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    beforeStep() {
        if (this.options.marker) {
            this.series.forEach((series) => {
                if (series) {
                    series.calculateParentRadius();
                }
            });
        }
    }
    // #14439, new stable check.
    isStable() {
        const tempDiff = Math.abs(this.prevSystemTemperature -
            this.systemTemperature);
        const upScaledTemperature = 10 * this.systemTemperature /
            Math.sqrt(this.nodes.length);
        return Math.abs(upScaledTemperature) < 1 &&
            tempDiff < 0.00001 ||
            this.temperature <= 0;
    }
    setCircularPositions() {
        const layout = this, box = layout.box, nodes = [
            ...layout.nodes,
            ...layout?.chart?.allParentNodes || []
        ], nodesLength = nodes.length + 1, angle = 2 * Math.PI / nodesLength, radius = layout.options.initialPositionRadius;
        let centerX, centerY, index = 0;
        for (const node of nodes) {
            if (this.resolveSplitSeries(node) &&
                !node.isParentNode) {
                centerX = node.series.parentNode.plotX;
                centerY = node.series.parentNode.plotY;
            }
            else {
                centerX = box.width / 2;
                centerY = box.height / 2;
            }
            node.plotX = node.prevX = PackedBubbleLayout_pick(node.plotX, centerX +
                radius * Math.cos(node.index || index * angle));
            node.plotY = node.prevY = PackedBubbleLayout_pick(node.plotY, centerY +
                radius * Math.sin(node.index || index * angle));
            node.dispX = 0;
            node.dispY = 0;
            index++;
        }
    }
    repulsiveForces() {
        const layout = this, { options, k } = layout, { bubblePadding = 0, seriesInteraction } = options, nodes = [
            ...layout.nodes,
            ...layout?.chart?.allParentNodes || []
        ];
        for (const node of nodes) {
            const nodeSeries = node.series, fixedPosition = node.fixedPosition, paddedNodeRadius = ((node.marker?.radius || 0) +
                bubblePadding);
            node.degree = node.mass;
            node.neighbours = 0;
            for (const repNode of nodes) {
                const repNodeSeries = repNode.series;
                if (
                // Node cannot repulse itself:
                node !== repNode &&
                    // Not dragged:
                    !fixedPosition &&
                    (seriesInteraction || nodeSeries === repNodeSeries) &&
                    // Avoiding collision of parentNodes and parented points
                    !(nodeSeries === repNodeSeries &&
                        (repNode.isParentNode || node.isParentNode))) {
                    const distanceXY = layout.getDistXY(node, repNode), distanceR = (layout.vectorLength(distanceXY) -
                        (paddedNodeRadius + (repNode.marker?.radius || 0)));
                    let forceTimesMass;
                    // TODO padding configurable
                    if (distanceR < 0) {
                        node.degree += 0.01;
                        forceTimesMass = (layout.repulsiveForce(-distanceR / Math.sqrt(++(node.neighbours)), k, node, repNode) *
                            repNode.mass);
                    }
                    layout.force('repulsive', node, forceTimesMass || 0, distanceXY, repNode, distanceR);
                }
            }
        }
    }
    resolveSplitSeries(node) {
        const specificSeriesOpt = node
            .series
            ?.options
            ?.layoutAlgorithm
            ?.splitSeries;
        return (!PackedBubbleLayout_defined(specificSeriesOpt) &&
            node.series.chart
                ?.options
                ?.plotOptions
                ?.packedbubble
                ?.layoutAlgorithm
                ?.splitSeries) ||
            specificSeriesOpt ||
            false;
    }
    applyLimitBox(node, box) {
        const layout = this, factor = 0.01;
        let distanceXY, distanceR;
        // `parentNodeLimit` should be used together with seriesInteraction:
        // false
        if (this.resolveSplitSeries(node) &&
            !node.isParentNode &&
            layout.options.parentNodeLimit) {
            distanceXY = layout.getDistXY(node, node.series.parentNode);
            distanceR = (node.series.parentNodeRadius -
                node.marker.radius -
                layout.vectorLength(distanceXY));
            if (distanceR < 0 &&
                distanceR > -2 * node.marker.radius) {
                node.plotX -= distanceXY.x * factor;
                node.plotY -= distanceXY.y * factor;
            }
        }
        super.applyLimitBox(node, box);
    }
}
/* *
 *
 *  Registry
 *
 * */
Series_GraphLayoutComposition.layouts.packedbubble = PackedBubbleLayout;
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const PackedBubble_PackedBubbleLayout = (PackedBubbleLayout);

;// ./code/es-modules/Series/SimulationSeriesUtilities.js
/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { merge: SimulationSeriesUtilities_merge, syncTimeout } = (external_highcharts_src_js_default_default());

const { animObject } = (external_highcharts_src_js_default_default());
/**
 * Create a setTimeout for the first drawDataLabels()
 * based on the dataLabels.animation.defer value
 * for series which have enabled simulation.
 * @private
 */
function initDataLabelsDefer() {
    const dlOptions = this.options.dataLabels;
    // Method drawDataLabels() fires for the first time after
    // dataLabels.animation.defer time unless
    // the dataLabels.animation = false or dataLabels.defer = false
    // or if the simulation is disabled
    if (!dlOptions?.defer ||
        !this.options.layoutAlgorithm?.enableSimulation) {
        this.deferDataLabels = false;
    }
    else {
        syncTimeout(() => {
            this.deferDataLabels = false;
        }, dlOptions ? animObject(dlOptions.animation).defer : 0);
    }
}
/**
 * Initialize the SVG group for the DataLabels with correct opacities
 * and correct styles so that the animation for the series that have
 * simulation enabled works fine.
 * @private
 */
function initDataLabels() {
    const series = this, dlOptions = series.options.dataLabels;
    if (!series.dataLabelsGroup) {
        const dataLabelsGroup = this.initDataLabelsGroup();
        // Apply the dataLabels.style not only to the
        // individual dataLabels but also to the entire group
        if (!series.chart.styledMode && dlOptions?.style) {
            dataLabelsGroup.css(dlOptions.style);
        }
        // Initialize the opacity of the group to 0 (start of animation)
        dataLabelsGroup.attr({ opacity: 0 });
        if (series.visible) { // #2597, #3023, #3024
            dataLabelsGroup.show();
        }
        return dataLabelsGroup;
    }
    // Place it on first and subsequent (redraw) calls
    series.dataLabelsGroup.attr(SimulationSeriesUtilities_merge({ opacity: 1 }, this.getPlotBox('data-labels')));
    return series.dataLabelsGroup;
}
const DataLabelsDeferUtils = {
    initDataLabels,
    initDataLabelsDefer
};
/* harmony default export */ const SimulationSeriesUtilities = (DataLabelsDeferUtils);

;// external ["./highcharts.src.js","default","SVGElement"]
const external_highcharts_src_js_default_SVGElement_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__["default"].SVGElement;
var external_highcharts_src_js_default_SVGElement_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_SVGElement_namespaceObject);
;// ./code/es-modules/Extensions/TextPath.js
/* *
 *
 *  Highcharts module with textPath functionality.
 *
 *  (c) 2009-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { deg2rad: TextPath_deg2rad } = (external_highcharts_src_js_default_default());
const { addEvent: TextPath_addEvent, merge: TextPath_merge, uniqueKey, defined: TextPath_defined, extend: TextPath_extend } = (external_highcharts_src_js_default_default());
/**
 * Set a text path for a `text` or `label` element, allowing the text to
 * flow along a path.
 *
 * In order to unset the path for an existing element, call `setTextPath`
 * with `{ enabled: false }` as the second argument.
 *
 * Text path support is not bundled into `highcharts.js`, and requires the
 * `modules/textpath.js` file. However, it is included in the script files of
 * those series types that use it by default
 *
 * @sample highcharts/members/renderer-textpath/ Text path demonstrated
 *
 * @function Highcharts.SVGElement#setTextPath
 *
 * @param {Highcharts.SVGElement|undefined} path
 *        Path to follow. If undefined, it allows changing options for the
 *        existing path.
 *
 * @param {Highcharts.DataLabelsTextPathOptionsObject} textPathOptions
 *        Options.
 *
 * @return {Highcharts.SVGElement} Returns the SVGElement for chaining.
 */
function setTextPath(path, textPathOptions) {
    // Defaults
    textPathOptions = TextPath_merge(true, {
        enabled: true,
        attributes: {
            dy: -5,
            startOffset: '50%',
            textAnchor: 'middle'
        }
    }, textPathOptions);
    const url = this.renderer.url, textWrapper = this.text || this, textPath = textWrapper.textPath, { attributes, enabled } = textPathOptions;
    path = path || (textPath && textPath.path);
    // Remove previously added event
    if (textPath) {
        textPath.undo();
    }
    if (path && enabled) {
        const undo = TextPath_addEvent(textWrapper, 'afterModifyTree', (e) => {
            if (path && enabled) {
                // Set ID for the path
                let textPathId = path.attr('id');
                if (!textPathId) {
                    path.attr('id', textPathId = uniqueKey());
                }
                // Set attributes for the <text>
                const textAttribs = {
                    // `dx`/`dy` options must by set on <text> (parent), the
                    // rest should be set on <textPath>
                    x: 0,
                    y: 0
                };
                if (TextPath_defined(attributes.dx)) {
                    textAttribs.dx = attributes.dx;
                    delete attributes.dx;
                }
                if (TextPath_defined(attributes.dy)) {
                    textAttribs.dy = attributes.dy;
                    delete attributes.dy;
                }
                textWrapper.attr(textAttribs);
                // Handle label properties
                this.attr({ transform: '' });
                if (this.box) {
                    this.box = this.box.destroy();
                }
                // Wrap the nodes in a textPath
                const children = e.nodes.slice(0);
                e.nodes.length = 0;
                e.nodes[0] = {
                    tagName: 'textPath',
                    attributes: TextPath_extend(attributes, {
                        'text-anchor': attributes.textAnchor,
                        href: `${url}#${textPathId}`
                    }),
                    children
                };
            }
        });
        // Set the reference
        textWrapper.textPath = { path, undo };
    }
    else {
        textWrapper.attr({ dx: 0, dy: 0 });
        delete textWrapper.textPath;
    }
    if (this.added) {
        // Rebuild text after added
        textWrapper.textCache = '';
        this.renderer.buildText(textWrapper);
    }
    return this;
}
/**
 * Attach a polygon to a bounding box if the element contains a textPath.
 *
 * @function Highcharts.SVGElement#setPolygon
 *
 * @param {any} event
 *        An event containing a bounding box object
 *
 * @return {Highcharts.BBoxObject} Returns the bounding box object.
 */
function setPolygon(event) {
    const bBox = event.bBox, tp = this.element?.querySelector('textPath');
    if (tp) {
        const polygon = [], { b, h } = this.renderer.fontMetrics(this.element), descender = h - b, lineCleanerRegex = new RegExp('(<tspan>|' +
            '<tspan(?!\\sclass="highcharts-br")[^>]*>|' +
            '<\\/tspan>)', 'g'), lines = tp
            .innerHTML
            .replace(lineCleanerRegex, '')
            .split(/<tspan class="highcharts-br"[^>]*>/), numOfLines = lines.length;
        // Calculate top and bottom coordinates for
        // either the start or the end of a single
        // character, and append it to the polygon.
        const appendTopAndBottom = (charIndex, positionOfChar) => {
            const { x, y } = positionOfChar, rotation = (tp.getRotationOfChar(charIndex) - 90) * TextPath_deg2rad, cosRot = Math.cos(rotation), sinRot = Math.sin(rotation);
            return [
                [
                    x - descender * cosRot,
                    y - descender * sinRot
                ],
                [
                    x + b * cosRot,
                    y + b * sinRot
                ]
            ];
        };
        for (let i = 0, lineIndex = 0; lineIndex < numOfLines; lineIndex++) {
            const line = lines[lineIndex], lineLen = line.length;
            for (let lineCharIndex = 0; lineCharIndex < lineLen; lineCharIndex += 5) {
                try {
                    const srcCharIndex = (i +
                        lineCharIndex +
                        lineIndex), [lower, upper] = appendTopAndBottom(srcCharIndex, tp.getStartPositionOfChar(srcCharIndex));
                    if (lineCharIndex === 0) {
                        polygon.push(upper);
                        polygon.push(lower);
                    }
                    else {
                        if (lineIndex === 0) {
                            polygon.unshift(upper);
                        }
                        if (lineIndex === numOfLines - 1) {
                            polygon.push(lower);
                        }
                    }
                }
                catch (e) {
                    // Safari fails on getStartPositionOfChar even if the
                    // character is within the `textContent.length`
                    break;
                }
            }
            i += lineLen - 1;
            try {
                const srcCharIndex = i + lineIndex, charPos = tp.getEndPositionOfChar(srcCharIndex), [lower, upper] = appendTopAndBottom(srcCharIndex, charPos);
                polygon.unshift(upper);
                polygon.unshift(lower);
            }
            catch (e) {
                // Safari fails on getStartPositionOfChar even if the character
                // is within the `textContent.length`
                break;
            }
        }
        // Close it
        if (polygon.length) {
            polygon.push(polygon[0].slice());
        }
        bBox.polygon = polygon;
    }
    return bBox;
}
/**
 * Draw text along a textPath for a dataLabel.
 *
 * @function Highcharts.SVGElement#setTextPath
 *
 * @param {any} event
 *        An event containing label options
 *
 * @return {void}
 */
function drawTextPath(event) {
    const labelOptions = event.labelOptions, point = event.point, textPathOptions = (labelOptions[point.formatPrefix + 'TextPath'] ||
        labelOptions.textPath);
    if (textPathOptions && !labelOptions.useHTML) {
        this.setTextPath(point.getDataLabelPath?.(this) || point.graphic, textPathOptions);
        if (point.dataLabelPath &&
            !textPathOptions.enabled) {
            // Clean the DOM
            point.dataLabelPath = (point.dataLabelPath.destroy());
        }
    }
}
function TextPath_compose(SVGElementClass) {
    TextPath_addEvent(SVGElementClass, 'afterGetBBox', setPolygon);
    TextPath_addEvent(SVGElementClass, 'beforeAddingDataLabel', drawTextPath);
    const svgElementProto = SVGElementClass.prototype;
    if (!svgElementProto.setTextPath) {
        svgElementProto.setTextPath = setTextPath;
    }
}
const TextPath = {
    compose: TextPath_compose
};
/* harmony default export */ const Extensions_TextPath = (TextPath);

;// ./code/es-modules/Series/PackedBubble/PackedBubbleSeries.js
/* *
 *
 *  (c) 2010-2025 Grzegorz Blachlinski, Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { parse: color } = (external_highcharts_src_js_default_Color_default());



const { noop: PackedBubbleSeries_noop } = (external_highcharts_src_js_default_default());




const { series: { prototype: seriesProto }, seriesTypes: { bubble: PackedBubbleSeries_BubbleSeries } } = (external_highcharts_src_js_default_SeriesRegistry_default());

const { initDataLabels: PackedBubbleSeries_initDataLabels, initDataLabelsDefer: PackedBubbleSeries_initDataLabelsDefer } = SimulationSeriesUtilities;

const { addEvent: PackedBubbleSeries_addEvent, clamp: PackedBubbleSeries_clamp, defined: PackedBubbleSeries_defined, extend: PackedBubbleSeries_extend, fireEvent: PackedBubbleSeries_fireEvent, isArray: PackedBubbleSeries_isArray, isNumber: PackedBubbleSeries_isNumber, merge: PackedBubbleSeries_merge, pick: PackedBubbleSeries_pick } = (external_highcharts_src_js_default_default());


Extensions_TextPath.compose((external_highcharts_src_js_default_SVGElement_default()));
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.packedbubble
 *
 * @extends Highcharts.Series
 */
class PackedBubbleSeries extends PackedBubbleSeries_BubbleSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        this.parentNodeMass = 0;
        this.deferDataLabels = true;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(AxisClass, ChartClass, LegendClass) {
        PackedBubbleSeries_BubbleSeries.compose(AxisClass, ChartClass, LegendClass);
        Series_DragNodesComposition.compose(ChartClass);
        PackedBubble_PackedBubbleLayout.compose(ChartClass);
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Create a single array of all points from all series
     * @private
     */
    accumulateAllPoints() {
        const chart = this.chart, allDataPoints = [];
        for (const series of chart.series) {
            if (series.is('packedbubble') && // #13574
                series.reserveSpace()) {
                const valueData = series.getColumn('value');
                // Add data to array only if series is visible
                for (let j = 0; j < valueData.length; j++) {
                    allDataPoints.push([
                        null, null,
                        valueData[j],
                        series.index,
                        j,
                        {
                            id: j,
                            marker: {
                                radius: 0
                            }
                        }
                    ]);
                }
            }
        }
        return allDataPoints;
    }
    /**
     * Adding the basic layout to series points.
     * @private
     */
    addLayout() {
        const layoutOptions = this.options.layoutAlgorithm =
            this.options.layoutAlgorithm || {}, layoutType = layoutOptions.type || 'packedbubble', chartOptions = this.chart.options.chart;
        let graphLayoutsStorage = this.chart.graphLayoutsStorage, graphLayoutsLookup = this.chart.graphLayoutsLookup, layout;
        if (!graphLayoutsStorage) {
            this.chart.graphLayoutsStorage = graphLayoutsStorage = {};
            this.chart.graphLayoutsLookup = graphLayoutsLookup = [];
        }
        layout = graphLayoutsStorage[layoutType];
        if (!layout) {
            layoutOptions.enableSimulation =
                !PackedBubbleSeries_defined(chartOptions.forExport) ?
                    layoutOptions.enableSimulation :
                    !chartOptions.forExport;
            graphLayoutsStorage[layoutType] = layout =
                new Series_GraphLayoutComposition.layouts[layoutType]();
            layout.init(layoutOptions);
            graphLayoutsLookup.splice(layout.index, 0, layout);
        }
        this.layout = layout;
        this.points.forEach((node) => {
            node.mass = 2;
            node.degree = 1;
            node.collisionNmb = 1;
        });
        layout.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight);
        layout.addElementsToCollection([this], layout.series);
        layout.addElementsToCollection(this.points, layout.nodes);
    }
    /**
     * Function responsible for adding series layout, used for parent nodes.
     * @private
     */
    addSeriesLayout() {
        const layoutOptions = this.options.layoutAlgorithm =
            this.options.layoutAlgorithm || {}, layoutType = (layoutOptions.type || 'packedbubble'), graphLayoutsStorage = this.chart.graphLayoutsStorage, graphLayoutsLookup = this.chart.graphLayoutsLookup, parentNodeOptions = PackedBubbleSeries_merge(layoutOptions, layoutOptions.parentNodeOptions, {
            enableSimulation: this.layout.options.enableSimulation
        });
        let seriesLayout = graphLayoutsStorage[layoutType + '-series'];
        if (!seriesLayout) {
            graphLayoutsStorage[layoutType + '-series'] = seriesLayout =
                new Series_GraphLayoutComposition.layouts[layoutType]();
            seriesLayout.init(parentNodeOptions);
            graphLayoutsLookup.splice(seriesLayout.index, 0, seriesLayout);
        }
        this.parentNodeLayout = seriesLayout;
        this.createParentNodes();
    }
    /**
     * The function responsible for calculating the parent node radius
     * based on the total surface of inside-bubbles and the group BBox
     * @private
     */
    calculateParentRadius() {
        const bBox = this.seriesBox(), parentPadding = 20, minParentRadius = 20;
        this.parentNodeRadius = PackedBubbleSeries_clamp(Math.sqrt(2 * this.parentNodeMass / Math.PI) + parentPadding, minParentRadius, bBox ?
            Math.max(Math.sqrt(Math.pow(bBox.width, 2) +
                Math.pow(bBox.height, 2)) / 2 + parentPadding, minParentRadius) :
            Math.sqrt(2 * this.parentNodeMass / Math.PI) + parentPadding);
        if (this.parentNode) {
            this.parentNode.marker.radius =
                this.parentNode.radius = this.parentNodeRadius;
        }
    }
    /**
     * Calculate min and max bubble value for radius calculation.
     * @private
     */
    calculateZExtremes() {
        const chart = this.chart, allSeries = chart.series;
        let zMin = this.options.zMin, zMax = this.options.zMax, valMin = Infinity, valMax = -Infinity;
        if (zMin && zMax) {
            return [zMin, zMax];
        }
        // It is needed to deal with null and undefined values
        allSeries.forEach((series) => {
            series.getColumn('value').forEach((y) => {
                if (PackedBubbleSeries_defined(y)) {
                    if (y > valMax) {
                        valMax = y;
                    }
                    if (y < valMin) {
                        valMin = y;
                    }
                }
            });
        });
        zMin = PackedBubbleSeries_pick(zMin, valMin);
        zMax = PackedBubbleSeries_pick(zMax, valMax);
        return [zMin, zMax];
    }
    /**
     * Check if two bubbles overlaps.
     * @private
     */
    checkOverlap(bubble1, bubble2) {
        const diffX = bubble1[0] - bubble2[0], // Diff of X center values
        diffY = bubble1[1] - bubble2[1], // Diff of Y center values
        sumRad = bubble1[2] + bubble2[2]; // Sum of bubble radius
        return (Math.sqrt(diffX * diffX + diffY * diffY) -
            Math.abs(sumRad)) < -0.001;
    }
    /**
     * Creating parent nodes for split series, in which all the bubbles
     * are rendered.
     * @private
     */
    createParentNodes() {
        const PackedBubblePoint = this.pointClass, chart = this.chart, parentNodeLayout = this.parentNodeLayout, layoutOptions = this.layout.options;
        let nodeAdded, parentNode = this.parentNode, parentMarkerOptions = {
            radius: this.parentNodeRadius,
            lineColor: this.color,
            fillColor: color(this.color).brighten(0.4).get()
        };
        if (layoutOptions.parentNodeOptions) {
            parentMarkerOptions = PackedBubbleSeries_merge(layoutOptions.parentNodeOptions.marker || {}, parentMarkerOptions);
        }
        this.parentNodeMass = 0;
        this.points.forEach((p) => {
            this.parentNodeMass +=
                Math.PI * Math.pow(p.marker.radius, 2);
        });
        this.calculateParentRadius();
        parentNodeLayout.nodes
            .forEach((node) => {
            if (node.seriesIndex === this.index) {
                nodeAdded = true;
            }
        });
        parentNodeLayout.setArea(0, 0, chart.plotWidth, chart.plotHeight);
        if (!nodeAdded) {
            if (!parentNode) {
                parentNode = new PackedBubblePoint(this, {
                    mass: this.parentNodeRadius / 2,
                    marker: parentMarkerOptions,
                    dataLabels: {
                        inside: false
                    },
                    states: {
                        normal: {
                            marker: parentMarkerOptions
                        },
                        hover: {
                            marker: parentMarkerOptions
                        }
                    },
                    dataLabelOnNull: true,
                    degree: this.parentNodeRadius,
                    isParentNode: true,
                    seriesIndex: this.index
                });
                this.chart.allParentNodes.push(parentNode);
            }
            if (this.parentNode) {
                parentNode.plotX = this.parentNode.plotX;
                parentNode.plotY = this.parentNode.plotY;
            }
            this.parentNode = parentNode;
            parentNodeLayout.addElementsToCollection([this], parentNodeLayout.series);
            parentNodeLayout.addElementsToCollection([parentNode], parentNodeLayout.nodes);
        }
    }
    /**
     * Function responsible for adding all the layouts to the chart.
     * @private
     */
    deferLayout() {
        // TODO split layouts to independent methods
        const layoutOptions = this.options.layoutAlgorithm;
        if (!this.visible) {
            return;
        }
        // Layout is using nodes for position calculation
        this.addLayout();
        if (layoutOptions.splitSeries) {
            this.addSeriesLayout();
        }
    }
    destroy() {
        // Remove the series from all layouts series collections #11469
        if (this.chart.graphLayoutsLookup) {
            this.chart.graphLayoutsLookup.forEach((layout) => {
                layout.removeElementFromCollection(this, layout.series);
            }, this);
        }
        if (this.parentNode &&
            this.parentNodeLayout) {
            this.parentNodeLayout.removeElementFromCollection(this.parentNode, this.parentNodeLayout.nodes);
            if (this.parentNode.dataLabel) {
                this.parentNode.dataLabel =
                    this.parentNode.dataLabel.destroy();
            }
        }
        seriesProto.destroy.apply(this, arguments);
    }
    /**
     * Packedbubble has two separate collections of nodes if split, render
     * dataLabels for both sets:
     * @private
     */
    drawDataLabels() {
        // We defer drawing the dataLabels
        // until dataLabels.animation.defer time passes
        if (this.deferDataLabels) {
            return;
        }
        seriesProto.drawDataLabels.call(this, this.points);
        // Render parentNode labels:
        if (this.parentNode) {
            this.parentNode.formatPrefix = 'parentNode';
            seriesProto.drawDataLabels.call(this, [this.parentNode]);
        }
    }
    /**
     * Create Background/Parent Nodes for split series.
     * @private
     */
    drawGraph() {
        // If the series is not using layout, don't add parent nodes
        if (!this.layout || !this.layout.options.splitSeries) {
            return;
        }
        const chart = this.chart, nodeMarker = this.layout.options.parentNodeOptions.marker, parentOptions = {
            fill: (nodeMarker.fillColor ||
                color(this.color).brighten(0.4).get()),
            opacity: nodeMarker.fillOpacity,
            stroke: nodeMarker.lineColor || this.color,
            'stroke-width': PackedBubbleSeries_pick(nodeMarker.lineWidth, this.options.lineWidth)
        };
        let parentAttribs = {};
        // Create the group for parent Nodes if doesn't exist
        // If exists it will only be adjusted to the updated plot size (#12063)
        this.parentNodesGroup = this.plotGroup('parentNodesGroup', 'parentNode', this.visible ? 'inherit' : 'hidden', 0.1, chart.seriesGroup);
        this.group?.attr({
            zIndex: 2
        });
        this.calculateParentRadius();
        if (this.parentNode &&
            PackedBubbleSeries_defined(this.parentNode.plotX) &&
            PackedBubbleSeries_defined(this.parentNode.plotY) &&
            PackedBubbleSeries_defined(this.parentNodeRadius)) {
            parentAttribs = PackedBubbleSeries_merge({
                x: this.parentNode.plotX -
                    this.parentNodeRadius,
                y: this.parentNode.plotY -
                    this.parentNodeRadius,
                width: this.parentNodeRadius * 2,
                height: this.parentNodeRadius * 2
            }, parentOptions);
            if (!this.parentNode.graphic) {
                this.graph = this.parentNode.graphic =
                    chart.renderer.symbol(parentOptions.symbol)
                        .add(this.parentNodesGroup);
            }
            this.parentNode.graphic.attr(parentAttribs);
        }
    }
    drawTracker() {
        const parentNode = this.parentNode;
        // Chart = series.chart,
        // pointer = chart.pointer,
        // onMouseOver = function (e: PointerEvent): void {
        //     const point = pointer.getPointFromEvent(e);
        //     // undefined on graph in scatterchart
        //     if (typeof point !== 'undefined') {
        //         pointer.isDirectTouch = true;
        //         point.onMouseOver(e);
        //     }
        // };
        let dataLabels;
        super.drawTracker();
        // Add reference to the point
        if (parentNode) {
            dataLabels = (PackedBubbleSeries_isArray(parentNode.dataLabels) ?
                parentNode.dataLabels :
                (parentNode.dataLabel ? [parentNode.dataLabel] : []));
            if (parentNode.graphic) {
                parentNode.graphic.element.point = parentNode;
            }
            dataLabels.forEach((dataLabel) => {
                (dataLabel.div || dataLabel.element).point = parentNode;
            });
        }
    }
    /**
     * Calculate radius of bubbles in series.
     * @private
     */
    getPointRadius() {
        const chart = this.chart, plotWidth = chart.plotWidth, plotHeight = chart.plotHeight, seriesOptions = this.options, useSimulation = seriesOptions.useSimulation, smallestSize = Math.min(plotWidth, plotHeight), extremes = {}, radii = [], allDataPoints = chart.allDataPoints || [], allDataPointsLength = allDataPoints.length;
        let minSize, maxSize, value, radius;
        ['minSize', 'maxSize'].forEach((prop) => {
            const length = parseInt(seriesOptions[prop], 10), isPercent = /%$/.test(seriesOptions[prop]);
            extremes[prop] = isPercent ?
                smallestSize * length / 100 :
                length * Math.sqrt(allDataPointsLength);
        });
        chart.minRadius = minSize = extremes.minSize /
            Math.sqrt(allDataPointsLength);
        chart.maxRadius = maxSize = extremes.maxSize /
            Math.sqrt(allDataPointsLength);
        const zExtremes = useSimulation ?
            this.calculateZExtremes() :
            [minSize, maxSize];
        allDataPoints.forEach((point, i) => {
            value = useSimulation ?
                PackedBubbleSeries_clamp(point[2], zExtremes[0], zExtremes[1]) :
                point[2];
            radius = this.getRadius(zExtremes[0], zExtremes[1], minSize, maxSize, value);
            if (radius === 0) {
                radius = null;
            }
            allDataPoints[i][2] = radius;
            radii.push(radius);
        });
        this.radii = radii;
    }
    init() {
        seriesProto.init.apply(this, arguments);
        PackedBubbleSeries_initDataLabelsDefer.call(this);
        /* eslint-disable no-invalid-this */
        // When one series is modified, the others need to be recomputed
        this.eventsToUnbind.push(PackedBubbleSeries_addEvent(this, 'updatedData', function () {
            this.chart.series.forEach((s) => {
                if (s.type === this.type) {
                    s.isDirty = true;
                }
            }, this);
        }));
        /* eslint-enable no-invalid-this */
        return this;
    }
    /**
     * Mouse up action, finalizing drag&drop.
     * @private
     * @param {Highcharts.Point} point The point that event occurred.
     */
    onMouseUp(dnPoint) {
        const point = dnPoint;
        if (point.fixedPosition && !point.removed) {
            const layout = this.layout, parentNodeLayout = this.parentNodeLayout;
            let distanceXY, distanceR;
            if (!point.isParentNode &&
                parentNodeLayout &&
                layout.options.dragBetweenSeries) {
                parentNodeLayout.nodes.forEach((node) => {
                    if (point && point.marker &&
                        node !== point.series.parentNode) {
                        distanceXY = layout.getDistXY(point, node);
                        distanceR = (layout.vectorLength(distanceXY) -
                            node.marker.radius -
                            point.marker.radius);
                        if (distanceR < 0) {
                            node.series.addPoint(PackedBubbleSeries_merge(point.options, {
                                plotX: point.plotX,
                                plotY: point.plotY
                            }), false);
                            layout.removeElementFromCollection(point, layout.nodes);
                            point.remove();
                        }
                    }
                });
            }
            Series_DragNodesComposition.onMouseUp.apply(this, arguments);
        }
    }
    /**
     * This is the main function responsible
     * for positioning all of the bubbles
     * allDataPoints - bubble array, in format [pixel x value,
     * pixel y value, radius,
     * related series index, related point index]
     * @private
     * @param {Array<Highcharts.PackedBubbleData>} allDataPoints All points from all series
     * @return {Array<Highcharts.PackedBubbleData>} Positions of all bubbles
     */
    placeBubbles(allDataPoints) {
        const checkOverlap = this.checkOverlap, positionBubble = this.positionBubble, bubblePos = [];
        let stage = 1, j = 0, k = 0, calculatedBubble, arr = [], i;
        // Sort all points
        const sortedArr = allDataPoints.sort((a, b) => b[2] - a[2]);
        if (sortedArr.length) {
            // Create first bubble in the middle of the chart
            bubblePos.push([
                [
                    0, // Starting in 0,0 coordinates
                    0,
                    sortedArr[0][2], // Radius
                    sortedArr[0][3], // Series index
                    sortedArr[0][4]
                ] // Point index
            ]); // 0 level bubble
            if (sortedArr.length > 1) {
                bubblePos.push([
                    [
                        0,
                        (0 - sortedArr[1][2] -
                            sortedArr[0][2]),
                        // Move bubble above first one
                        sortedArr[1][2],
                        sortedArr[1][3],
                        sortedArr[1][4]
                    ]
                ]); // 1 level 1st bubble
                // first two already positioned so starting from 2
                for (i = 2; i < sortedArr.length; i++) {
                    sortedArr[i][2] = sortedArr[i][2] || 1;
                    // In case if radius is calculated as 0.
                    calculatedBubble = positionBubble(bubblePos[stage][j], bubblePos[stage - 1][k], sortedArr[i]); // Calculate initial bubble position
                    if (checkOverlap(calculatedBubble, bubblePos[stage][0])) {
                        /* If new bubble is overlapping with first bubble
                            * in current level (stage)
                            */
                        bubblePos.push([]);
                        k = 0;
                        /* Reset index of bubble, used for
                            * positioning the bubbles around it,
                            * we are starting from first bubble in next
                            * stage because we are changing level to higher
                            */
                        bubblePos[stage + 1].push(positionBubble(bubblePos[stage][j], bubblePos[stage][0], sortedArr[i]));
                        // (last bubble, 1. from curr stage, new bubble)
                        stage++; // The new level is created, above current
                        j = 0; // Set the index of bubble in curr level to 0
                    }
                    else if (stage > 1 &&
                        bubblePos[stage - 1][k + 1] &&
                        checkOverlap(calculatedBubble, bubblePos[stage - 1][k + 1])) {
                        /* If new bubble is overlapping with one of the prev
                            * stage bubbles, it means that - bubble, used for
                            * positioning the bubbles around it has changed
                            * so we need to recalculate it
                            */
                        k++;
                        bubblePos[stage].push(positionBubble(bubblePos[stage][j], bubblePos[stage - 1][k], sortedArr[i]));
                        // (last bubble, prev stage bubble, new bubble)
                        j++;
                    }
                    else { // Simply add calculated bubble
                        j++;
                        bubblePos[stage].push(calculatedBubble);
                    }
                }
            }
            this.chart.stages = bubblePos;
            // It may not be necessary but adding it just in case -
            // it is containing all of the bubble levels
            this.chart.rawPositions =
                []
                    .concat.apply([], bubblePos);
            // Bubble positions merged into one array
            this.resizeRadius();
            arr = this.chart.rawPositions;
        }
        return arr;
    }
    /**
     * Function that checks for a parentMarker and sets the correct opacity.
     * @private
     * @param {Highcharts.Pack} point
     * Candidate point for opacity correction.
     * @param {string} [state]
     * The point state, can be either `hover`, `select` or 'normal'. If
     * undefined, normal state is assumed.
     *
     * @return {Highcharts.SVGAttributes}
     * The presentational attributes to be set on the point.
     */
    pointAttribs(point, state) {
        const options = this.options, hasParentMarker = point && point.isParentNode;
        let markerOptions = options.marker;
        if (hasParentMarker &&
            options.layoutAlgorithm &&
            options.layoutAlgorithm.parentNodeOptions) {
            markerOptions = options.layoutAlgorithm.parentNodeOptions.marker;
        }
        const fillOpacity = markerOptions.fillOpacity, attr = seriesProto.pointAttribs.call(this, point, state);
        if (fillOpacity !== 1) {
            attr['fill-opacity'] = fillOpacity;
        }
        return attr;
    }
    /**
     * Function that is adding one bubble based on positions and sizes of
     * two other bubbles, lastBubble is the last added bubble, newOrigin is
     * the bubble for positioning new bubbles. nextBubble is the currently
     * added bubble for which we are calculating positions
     * @private
     * @param {Array<number>} lastBubble The closest last bubble
     * @param {Array<number>} newOrigin New bubble
     * @param {Array<number>} nextBubble The closest next bubble
     * @return {Array<number>} Bubble with correct positions
     */
    positionBubble(lastBubble, newOrigin, nextBubble) {
        const sqrt = Math.sqrt, asin = Math.asin, acos = Math.acos, pow = Math.pow, abs = Math.abs, distance = sqrt(// Dist between lastBubble and newOrigin
        pow((lastBubble[0] - newOrigin[0]), 2) +
            pow((lastBubble[1] - newOrigin[1]), 2)), alfa = acos(
        // From cosinus theorem: alfa is an angle used for
        // calculating correct position
        (pow(distance, 2) +
            pow(nextBubble[2] + newOrigin[2], 2) -
            pow(nextBubble[2] + lastBubble[2], 2)) / (2 * (nextBubble[2] + newOrigin[2]) * distance)), beta = asin(// From sinus theorem.
        abs(lastBubble[0] - newOrigin[0]) /
            distance), 
        // Providing helping variables, related to angle between
        // lastBubble and newOrigin
        gamma = (lastBubble[1] - newOrigin[1]) < 0 ? 0 : Math.PI, 
        // If new origin y is smaller than last bubble y value
        // (2 and 3 quarter),
        // add Math.PI to final angle
        delta = (lastBubble[0] - newOrigin[0]) *
            (lastBubble[1] - newOrigin[1]) < 0 ?
            1 : -1, // (1st and 3rd quarter)
        finalAngle = gamma + alfa + beta * delta, cosA = Math.cos(finalAngle), sinA = Math.sin(finalAngle), posX = newOrigin[0] + (newOrigin[2] + nextBubble[2]) * sinA, 
        // Center of new origin + (radius1 + radius2) * sinus A
        posY = newOrigin[1] - (newOrigin[2] + nextBubble[2]) * cosA;
        return [
            posX,
            posY,
            nextBubble[2],
            nextBubble[3],
            nextBubble[4]
        ]; // The same as described before
    }
    render() {
        const dataLabels = [];
        seriesProto.render.apply(this, arguments);
        // #10823 - dataLabels should stay visible
        // when enabled allowOverlap.
        if (!this.options.dataLabels.allowOverlap) {
            this.data.forEach((point) => {
                if (PackedBubbleSeries_isArray(point.dataLabels)) {
                    point.dataLabels.forEach((dataLabel) => {
                        dataLabels.push(dataLabel);
                    });
                }
            });
            // Only hide overlapping dataLabels for layouts that
            // use simulation. Spiral packedbubble don't need
            // additional dataLabel hiding on every simulation step
            if (this.options.useSimulation) {
                this.chart.hideOverlappingLabels(dataLabels);
            }
        }
    }
    /**
     * The function responsible for resizing the bubble radius.
     * In shortcut: it is taking the initially
     * calculated positions of bubbles. Then it is calculating the min max
     * of both dimensions, creating something in shape of bBox.
     * The comparison of bBox and the size of plotArea
     * (later it may be also the size set by customer) is giving the
     * value how to recalculate the radius so it will match the size
     * @private
     */
    resizeRadius() {
        const chart = this.chart, positions = chart.rawPositions, min = Math.min, max = Math.max, plotLeft = chart.plotLeft, plotTop = chart.plotTop, chartHeight = chart.plotHeight, chartWidth = chart.plotWidth;
        let minX, maxX, minY, maxY, radius;
        minX = minY = Number.POSITIVE_INFINITY; // Set initial values
        maxX = maxY = Number.NEGATIVE_INFINITY;
        for (const position of positions) {
            radius = position[2];
            minX = min(minX, position[0] - radius);
            // (x center-radius) is the min x value used by specific bubble
            maxX = max(maxX, position[0] + radius);
            minY = min(minY, position[1] - radius);
            maxY = max(maxY, position[1] + radius);
        }
        const bBox = [maxX - minX, maxY - minY], spaceRatio = [
            (chartWidth - plotLeft) / bBox[0],
            (chartHeight - plotTop) / bBox[1]
        ], smallerDimension = min.apply([], spaceRatio);
        if (Math.abs(smallerDimension - 1) > 1e-10) {
            // If bBox is considered not the same width as possible size
            for (const position of positions) {
                position[2] *= smallerDimension;
            }
            this.placeBubbles(positions);
        }
        else {
            /** If no radius recalculation is needed, we need to position
             * the whole bubbles in center of chart plotarea
             * for this, we are adding two parameters,
             * diffY and diffX, that are related to differences
             * between the initial center and the bounding box
             */
            chart.diffY = chartHeight / 2 +
                plotTop - minY - (maxY - minY) / 2;
            chart.diffX = chartWidth / 2 +
                plotLeft - minX - (maxX - minX) / 2;
        }
    }
    /**
     * The function responsible for calculating series bubble' s bBox.
     * Needed because of exporting failure when useSimulation
     * is set to false
     * @private
     */
    seriesBox() {
        const chart = this.chart, data = this.data, max = Math.max, min = Math.min, bBox = [
            chart.plotLeft,
            chart.plotLeft + chart.plotWidth,
            chart.plotTop,
            chart.plotTop + chart.plotHeight
        ];
        let radius;
        data.forEach((p) => {
            if (PackedBubbleSeries_defined(p.plotX) &&
                PackedBubbleSeries_defined(p.plotY) &&
                p.marker.radius) {
                radius = p.marker.radius;
                bBox[0] = min(bBox[0], p.plotX - radius);
                bBox[1] = max(bBox[1], p.plotX + radius);
                bBox[2] = min(bBox[2], p.plotY - radius);
                bBox[3] = max(bBox[3], p.plotY + radius);
            }
        });
        return PackedBubbleSeries_isNumber(bBox.width / bBox.height) ?
            bBox :
            null;
    }
    /**
     * Needed because of z-indexing issue if point is added in series.group
     * @private
     */
    setVisible() {
        const series = this;
        seriesProto.setVisible.apply(series, arguments);
        if (series.parentNodeLayout && series.graph) {
            if (series.visible) {
                series.graph.show();
                if (series.parentNode.dataLabel) {
                    series.parentNode.dataLabel.show();
                }
            }
            else {
                series.graph.hide();
                series.parentNodeLayout.removeElementFromCollection(series.parentNode, series.parentNodeLayout.nodes);
                if (series.parentNode.dataLabel) {
                    series.parentNode.dataLabel.hide();
                }
            }
        }
        else if (series.layout) {
            if (series.visible) {
                series.layout.addElementsToCollection(series.points, series.layout.nodes);
            }
            else {
                series.points.forEach((node) => {
                    series.layout.removeElementFromCollection(node, series.layout.nodes);
                });
            }
        }
    }
    /**
     * Extend the base translate method to handle bubble size,
     * and correct positioning them.
     * @private
     */
    translate() {
        const chart = this.chart, data = this.data, index = this.index, useSimulation = this.options.useSimulation;
        let point, radius, positions;
        this.generatePoints();
        // Merged data is an array with all of the data from all series
        if (!PackedBubbleSeries_defined(chart.allDataPoints)) {
            chart.allDataPoints = this.accumulateAllPoints();
            // Calculate radius for all added data
            this.getPointRadius();
        }
        // After getting initial radius, calculate bubble positions
        if (useSimulation) {
            positions = chart.allDataPoints;
        }
        else {
            positions = this.placeBubbles(chart.allDataPoints);
            this.options.draggable = false;
        }
        // Set the shape and arguments to be picked up in drawPoints
        for (const position of positions) {
            if (position[3] === index) {
                // Update the series points with the val from positions
                // array
                point = data[position[4]];
                radius = PackedBubbleSeries_pick(position[2], void 0);
                if (!useSimulation) {
                    point.plotX = (position[0] - chart.plotLeft +
                        chart.diffX);
                    point.plotY = (position[1] - chart.plotTop +
                        chart.diffY);
                }
                if (PackedBubbleSeries_isNumber(radius)) {
                    point.marker = PackedBubbleSeries_extend(point.marker, {
                        radius,
                        width: 2 * radius,
                        height: 2 * radius
                    });
                    point.radius = radius;
                }
            }
        }
        if (useSimulation) {
            this.deferLayout();
        }
        PackedBubbleSeries_fireEvent(this, 'afterTranslate');
    }
}
PackedBubbleSeries.defaultOptions = PackedBubbleSeries_merge(PackedBubbleSeries_BubbleSeries.defaultOptions, PackedBubble_PackedBubbleSeriesDefaults);
PackedBubbleSeries_extend(PackedBubbleSeries.prototype, {
    pointClass: PackedBubble_PackedBubblePoint,
    axisTypes: [],
    directTouch: true,
    forces: ['barycenter', 'repulsive'],
    hasDraggableNodes: true,
    invertible: false,
    isCartesian: false,
    noSharedTooltip: true,
    pointArrayMap: ['value'],
    pointValKey: 'value',
    requireSorting: false,
    trackerGroups: ['group', 'dataLabelsGroup', 'parentNodesGroup'],
    initDataLabels: PackedBubbleSeries_initDataLabels,
    alignDataLabel: seriesProto.alignDataLabel,
    indexateNodes: PackedBubbleSeries_noop,
    onMouseDown: Series_DragNodesComposition.onMouseDown,
    onMouseMove: Series_DragNodesComposition.onMouseMove,
    redrawHalo: Series_DragNodesComposition.redrawHalo,
    searchPoint: PackedBubbleSeries_noop // Solving #12287
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('packedbubble', PackedBubbleSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const PackedBubble_PackedBubbleSeries = (PackedBubbleSeries);

;// ./code/es-modules/Series/Polygon/PolygonSeriesDefaults.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  API Options
 *
 * */
/**
 * A polygon series can be used to draw any freeform shape in the cartesian
 * coordinate system. A fill is applied with the `color` option, and
 * stroke is applied through `lineWidth` and `lineColor` options.
 *
 * @sample {highcharts} highcharts/demo/polygon/
 *         Polygon
 * @sample {highstock} highcharts/demo/polygon/
 *         Polygon
 *
 * @extends      plotOptions.scatter
 * @since        4.1.0
 * @excluding    jitter, softThreshold, threshold, cluster, boostThreshold,
 *               boostBlending
 * @product      highcharts highstock
 * @requires     highcharts-more
 * @optionparent plotOptions.polygon
 */
const PolygonSeriesDefaults = {
    marker: {
        enabled: false,
        states: {
            hover: {
                enabled: false
            }
        }
    },
    stickyTracking: false,
    tooltip: {
        followPointer: true,
        pointFormat: ''
    },
    trackByArea: true,
    legendSymbol: 'rectangle'
};
/**
 * A `polygon` series. If the [type](#series.polygon.type) option is
 * not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.polygon
 * @excluding dataParser, dataURL, stack, boostThreshold, boostBlending
 * @product   highcharts highstock
 * @requires  highcharts-more
 * @apioption series.polygon
 */
/**
 * An array of data points for the series. For the `polygon` series
 * type, points can be given in the following ways:
 *
 * 1. An array of numerical values. In this case, the numerical values will be
 *    interpreted as `y` options. The `x` values will be automatically
 *    calculated, either starting at 0 and incremented by 1, or from
 *    `pointStart` and `pointInterval` given in the series options. If the axis
 *    has categories, these will be used. Example:
 *    ```js
 *    data: [0, 5, 3, 5]
 *    ```
 *
 * 2. An array of arrays with 2 values. In this case, the values correspond to
 *    `x,y`. If the first value is a string, it is applied as the name of the
 *    point, and the `x` value is inferred.
 *    ```js
 *    data: [
 *        [0, 10],
 *        [1, 3],
 *        [2, 1]
 *    ]
 *    ```
 *
 * 3. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.polygon.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        y: 1,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        y: 8,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/chart/reflow-true/
 *         Numerical values
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
 * @extends   series.line.data
 * @product   highcharts highstock
 * @apioption series.polygon.data
 */
''; // Keeps doclets above separate
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Polygon_PolygonSeriesDefaults = (PolygonSeriesDefaults);

;// ./code/es-modules/Series/Polygon/PolygonSeries.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { noop: PolygonSeries_noop } = (external_highcharts_src_js_default_default());


const { area: PolygonSeries_AreaSeries, line: LineSeries, scatter: PolygonSeries_ScatterSeries } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { extend: PolygonSeries_extend, merge: PolygonSeries_merge } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
class PolygonSeries extends PolygonSeries_ScatterSeries {
    /* *
     *
     *  Functions
     *
     * */
    getGraphPath() {
        const graphPath = LineSeries.prototype.getGraphPath.call(this);
        let i = graphPath.length + 1;
        // Close all segments
        while (i--) {
            if ((i === graphPath.length || graphPath[i][0] === 'M') && i > 0) {
                graphPath.splice(i, 0, ['Z']);
            }
        }
        this.areaPath = graphPath;
        return graphPath;
    }
    drawGraph() {
        // Hack into the fill logic in area.drawGraph
        this.options.fillColor = this.color;
        PolygonSeries_AreaSeries.prototype.drawGraph.call(this);
    }
}
/* *
 *
 *  Static Properties
 *
 * */
PolygonSeries.defaultOptions = PolygonSeries_merge(PolygonSeries_ScatterSeries.defaultOptions, Polygon_PolygonSeriesDefaults);
PolygonSeries_extend(PolygonSeries.prototype, {
    type: 'polygon',
    drawTracker: LineSeries.prototype.drawTracker,
    setStackedPoints: PolygonSeries_noop // No stacking points on polygons (#5310)
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('polygon', PolygonSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Polygon_PolygonSeries = ((/* unused pure expression or super */ null && (PolygonSeries)));

;// ./code/es-modules/Core/Axis/RadialAxisDefaults.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  Extension for radial axes
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/**
     * Circular axis around the perimeter of a polar chart.
     * @private
     */
const defaultCircularOptions = {
    gridLineWidth: 1, // Spokes
    labels: {
        align: void 0, // Auto
        x: 0,
        y: void 0 // Auto
    },
    maxPadding: 0,
    minPadding: 0,
    showLastLabel: false,
    tickLength: 0
};
/**
 * The default options extend defaultYAxisOptions.
 * @private
 */
const defaultRadialGaugeOptions = {
    endOnTick: false,
    gridLineWidth: 0,
    labels: {
        align: 'center',
        distance: -25,
        x: 0,
        y: void 0 // Auto
    },
    lineWidth: 1,
    minorGridLineWidth: 0,
    minorTickInterval: 'auto',
    minorTickLength: 10,
    minorTickPosition: 'inside',
    minorTickWidth: 1,
    startOnTick: false,
    tickLength: 10,
    tickPixelInterval: 100,
    tickPosition: 'inside',
    tickWidth: 2,
    title: {
        rotation: 0,
        text: ''
    },
    zIndex: 2 // Behind dials, points in the series group
};
/**
 * Radial axis, like a spoke in a polar chart.
 * @private
 */
const defaultRadialOptions = {
    /**
     * In a polar chart, this is the angle of the Y axis in degrees, where
     * 0 is up and 90 is right. The angle determines the position of the
     * axis line and the labels, though the coordinate system is unaffected.
     * Since v8.0.0 this option is also applicable for X axis (inverted
     * polar).
     *
     * @sample {highcharts} highcharts/xaxis/angle/
     *         Custom X axis' angle on inverted polar chart
     * @sample {highcharts} highcharts/yaxis/angle/
     *         Dual axis polar chart
     *
     * @type      {number}
     * @default   0
     * @since     4.2.7
     * @product   highcharts
     * @apioption xAxis.angle
     */
    /**
     * Polar charts only. Whether the grid lines should draw as a polygon
     * with straight lines between categories, or as circles. Can be either
     * `circle` or `polygon`. Since v8.0.0 this option is also applicable
     * for X axis (inverted polar).
     *
     * @sample {highcharts} highcharts/demo/polar-spider/
     *         Polygon grid lines
     * @sample {highcharts} highcharts/xaxis/gridlineinterpolation/
     *         Circle and polygon on inverted polar
     * @sample {highcharts} highcharts/yaxis/gridlineinterpolation/
     *         Circle and polygon
     *
     * @type       {string}
     * @product    highcharts
     * @validvalue ["circle", "polygon"]
     * @apioption  xAxis.gridLineInterpolation
     */
    gridLineInterpolation: 'circle',
    gridLineWidth: 1,
    labels: {
        align: 'right',
        padding: 5,
        x: -3,
        y: -2
    },
    showLastLabel: false,
    title: {
        x: 4,
        text: null,
        rotation: 90
    }
};
/* *
 *
 *  Default Export
 *
 * */
const RadialAxisDefaults = {
    circular: defaultCircularOptions,
    radial: defaultRadialOptions,
    radialGauge: defaultRadialGaugeOptions
};
/* harmony default export */ const Axis_RadialAxisDefaults = (RadialAxisDefaults);

;// ./code/es-modules/Core/Axis/RadialAxis.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { defaultOptions: RadialAxis_defaultOptions } = (external_highcharts_src_js_default_default());

const { composed: RadialAxis_composed, noop: RadialAxis_noop } = (external_highcharts_src_js_default_default());

const { addEvent: RadialAxis_addEvent, correctFloat: RadialAxis_correctFloat, defined: RadialAxis_defined, extend: RadialAxis_extend, fireEvent: RadialAxis_fireEvent, isObject, merge: RadialAxis_merge, pick: RadialAxis_pick, pushUnique: RadialAxis_pushUnique, relativeLength: RadialAxis_relativeLength, splat: RadialAxis_splat, wrap: RadialAxis_wrap } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Composition
 *
 * */
var RadialAxis;
(function (RadialAxis) {
    /* *
     *
     *  Declarations
     *
     * */
    RadialAxis.radialDefaultOptions = RadialAxis_merge(Axis_RadialAxisDefaults);
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * In case of auto connect, add one closestPointRange to the max value
     * right before tickPositions are computed, so that ticks will extend
     * passed the real max.
     * @private
     */
    function beforeSetTickPositions() {
        // If autoConnect is true, polygonal grid lines are connected, and
        // one closestPointRange is added to the X axis to prevent the last
        // point from overlapping the first.
        this.autoConnect = (this.isCircular &&
            typeof RadialAxis_pick(this.userMax, this.options.max) === 'undefined' &&
            RadialAxis_correctFloat(this.endAngleRad - this.startAngleRad) ===
                RadialAxis_correctFloat(2 * Math.PI));
        // This will lead to add an extra tick to xAxis in order to display
        // a correct range on inverted polar
        if (!this.isCircular && this.chart.inverted) {
            this.max++;
        }
        if (this.autoConnect) {
            this.max += ((this.categories && 1) ||
                this.pointRange ||
                this.closestPointRange ||
                0); // #1197, #2260
        }
    }
    /**
     * Augments methods for the value axis.
     *
     * @private
     *
     * @param {Highcharts.Axis} AxisClass
     * Axis class to extend.
     *
     * @param {Highcharts.Tick} TickClass
     * Tick class to use.
     *
     * @return {Highcharts.Axis}
     * Axis composition.
     */
    function compose(AxisClass, TickClass) {
        if (RadialAxis_pushUnique(RadialAxis_composed, 'Axis.Radial')) {
            RadialAxis_addEvent(AxisClass, 'afterInit', onAxisAfterInit);
            RadialAxis_addEvent(AxisClass, 'autoLabelAlign', onAxisAutoLabelAlign);
            RadialAxis_addEvent(AxisClass, 'destroy', onAxisDestroy);
            RadialAxis_addEvent(AxisClass, 'init', onAxisInit);
            RadialAxis_addEvent(AxisClass, 'initialAxisTranslation', onAxisInitialAxisTranslation);
            RadialAxis_addEvent(TickClass, 'afterGetLabelPosition', onTickAfterGetLabelPosition);
            RadialAxis_addEvent(TickClass, 'afterGetPosition', onTickAfterGetPosition);
            RadialAxis_addEvent((external_highcharts_src_js_default_default()), 'setOptions', onGlobalSetOptions);
            RadialAxis_wrap(TickClass.prototype, 'getMarkPath', wrapTickGetMarkPath);
        }
        return AxisClass;
    }
    RadialAxis.compose = compose;
    /**
     * Attach and return collecting function for labels in radial axis for
     * anti-collision.
     *
     * @private
     */
    function createLabelCollector() {
        return () => {
            if (this.isRadial &&
                this.tickPositions &&
                // Undocumented option for now, but working
                this.options.labels &&
                this.options.labels.allowOverlap !== true) {
                return this.tickPositions
                    .map((pos) => this.ticks[pos]?.label)
                    .filter((label) => Boolean(label));
            }
        };
    }
    /**
     * Creates an empty collector function.
     * @private
     */
    function createLabelCollectorHidden() {
        return RadialAxis_noop;
    }
    /**
     * Find the correct end values of crosshair in polar.
     * @private
     */
    function getCrosshairPosition(options, x1, y1) {
        const center = this.pane.center;
        let value = options.value, shapeArgs, end, x2, y2;
        if (this.isCircular) {
            if (!RadialAxis_defined(value)) {
                // When the snap is set to false
                x2 = options.chartX || 0;
                y2 = options.chartY || 0;
                value = this.translate(Math.atan2(y2 - y1, x2 - x1) - this.startAngleRad, true);
            }
            else if (options.point) {
                // When the snap is set to true
                shapeArgs = options.point.shapeArgs || {};
                if (shapeArgs.start) {
                    // Find a true value of the point based on the
                    // angle
                    value = this.chart.inverted ?
                        this.translate(options.point.rectPlotY, true) :
                        options.point.x;
                }
            }
            end = this.getPosition(value);
            x2 = end.x;
            y2 = end.y;
        }
        else {
            if (!RadialAxis_defined(value)) {
                x2 = options.chartX;
                y2 = options.chartY;
            }
            if (RadialAxis_defined(x2) && RadialAxis_defined(y2)) {
                // Calculate radius of non-circular axis' crosshair
                y1 = center[1] + this.chart.plotTop;
                value = this.translate(Math.min(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), center[2] / 2) - center[3] / 2, true);
            }
        }
        return [value, x2 || 0, y2 || 0];
    }
    /**
     * Get the path for the axis line. This method is also referenced in the
     * getPlotLinePath method.
     *
     * @private
     * @param {number} _lineWidth
     * Line width is not used.
     * @param {number} [radius]
     * Radius of radial path.
     * @param {number} [innerRadius]
     * Inner radius of radial path.
     */
    function getLinePath(_lineWidth, radius, innerRadius) {
        const center = this.pane.center, chart = this.chart, left = this.left || 0, top = this.top || 0;
        let end, r = RadialAxis_pick(radius, center[2] / 2 - this.offset), path;
        if (typeof innerRadius === 'undefined') {
            innerRadius = this.horiz ? 0 : this.center && -this.center[3] / 2;
        }
        // In case when innerSize of pane is set, it must be included
        if (innerRadius) {
            r += innerRadius;
        }
        if (this.isCircular || typeof radius !== 'undefined') {
            path = this.chart.renderer.symbols.arc(left + center[0], top + center[1], r, r, {
                start: this.startAngleRad,
                end: this.endAngleRad,
                open: true,
                innerR: 0
            });
            // Bounds used to position the plotLine label next to the line
            // (#7117)
            path.xBounds = [left + center[0]];
            path.yBounds = [top + center[1] - r];
        }
        else {
            end = this.postTranslate(this.angleRad, r);
            path = [
                [
                    'M',
                    this.center[0] + chart.plotLeft,
                    this.center[1] + chart.plotTop
                ],
                ['L', end.x, end.y]
            ];
        }
        return path;
    }
    /**
     * Wrap the getOffset method to return zero offset for title or labels
     * in a radial axis.
     */
    function getOffset() {
        const axisProto = this.constructor.prototype;
        // Call the Axis prototype method (the method we're in now is on the
        // instance)
        axisProto.getOffset.call(this);
        // Title or label offsets are not counted
        this.chart.axisOffset[this.side] = 0;
    }
    /**
     * Find the path for plot bands along the radial axis.
     *
     * @private
     */
    function getPlotBandPath(from, to, options) {
        const chart = this.chart, radiusToPixels = (radius) => {
            if (typeof radius === 'string') {
                let r = parseInt(radius, 10);
                if (percentRegex.test(radius)) {
                    r = (r * fullRadius) / 100;
                }
                return r;
            }
            return radius;
        }, center = this.center, startAngleRad = this.startAngleRad, fullRadius = center[2] / 2, offset = Math.min(this.offset, 0), left = this.left || 0, top = this.top || 0, percentRegex = /%$/, isCircular = this.isCircular; // X axis in a polar chart
        let start, end, angle, xOnPerimeter, open, path, outerRadius = RadialAxis_pick(radiusToPixels(options.outerRadius), fullRadius), innerRadius = radiusToPixels(options.innerRadius), thickness = RadialAxis_pick(radiusToPixels(options.thickness), 10);
        // Polygonal plot bands
        if (this.options.gridLineInterpolation === 'polygon') {
            path = this.getPlotLinePath({ value: from }).concat(this.getPlotLinePath({ value: to, reverse: true }));
            // Circular grid bands
        }
        else {
            // Keep within bounds
            from = Math.max(from, this.min);
            to = Math.min(to, this.max);
            const transFrom = this.translate(from), transTo = this.translate(to);
            // Plot bands on Y axis (radial axis) - inner and outer
            // radius depend on to and from
            if (!isCircular) {
                outerRadius = transFrom || 0;
                innerRadius = transTo || 0;
            }
            // Handle full circle
            if (options.shape === 'circle' || !isCircular) {
                start = -Math.PI / 2;
                end = Math.PI * 1.5;
                open = true;
            }
            else {
                start = startAngleRad + (transFrom || 0);
                end = startAngleRad + (transTo || 0);
            }
            outerRadius -= offset; // #5283
            thickness -= offset; // #5283
            path = chart.renderer.symbols.arc(left + center[0], top + center[1], outerRadius, outerRadius, {
                // Math is for reversed yAxis (#3606)
                start: Math.min(start, end),
                end: Math.max(start, end),
                innerR: RadialAxis_pick(innerRadius, outerRadius - thickness),
                open,
                borderRadius: options.borderRadius
            });
            // Provide positioning boxes for the label (#6406)
            if (isCircular) {
                angle = (end + start) / 2;
                xOnPerimeter = (left +
                    center[0] +
                    (center[2] / 2) * Math.cos(angle));
                path.xBounds = angle > -Math.PI / 2 && angle < Math.PI / 2 ?
                    // Right hemisphere
                    [xOnPerimeter, chart.plotWidth] :
                    // Left hemisphere
                    [0, xOnPerimeter];
                path.yBounds = [
                    top + center[1] + (center[2] / 2) * Math.sin(angle)
                ];
                // Shift up or down to get the label clear of the perimeter
                path.yBounds[0] += ((angle > -Math.PI && angle < 0) ||
                    (angle > Math.PI)) ? -10 : 10;
            }
        }
        return path;
    }
    /**
     * Find the path for plot lines perpendicular to the radial axis.
     */
    function getPlotLinePath(options) {
        const center = this.pane.center, chart = this.chart, inverted = chart.inverted, reverse = options.reverse, backgroundOption = this.pane.options.background, background = backgroundOption ?
            RadialAxis_splat(backgroundOption)[0] :
            {}, innerRadius = background.innerRadius || '0%', outerRadius = background.outerRadius || '100%', x1 = center[0] + chart.plotLeft, y1 = center[1] + chart.plotTop, height = this.height, isCrosshair = options.isCrosshair, paneInnerR = center[3] / 2;
        let value = options.value, innerRatio, distance, a, b, otherAxis, xy, tickPositions, crossPos, path;
        const end = this.getPosition(value);
        let x2 = end.x, y2 = end.y;
        // Crosshair logic
        if (isCrosshair) {
            // Find crosshair's position and perform destructuring
            // assignment
            crossPos = this.getCrosshairPosition(options, x1, y1);
            value = crossPos[0];
            x2 = crossPos[1];
            y2 = crossPos[2];
        }
        // Spokes
        if (this.isCircular) {
            distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            a = (typeof innerRadius === 'string') ?
                RadialAxis_relativeLength(innerRadius, 1) :
                (innerRadius / distance);
            b = (typeof outerRadius === 'string') ?
                RadialAxis_relativeLength(outerRadius, 1) :
                (outerRadius / distance);
            // To ensure that gridlines won't be displayed in area
            // defined by innerSize in case of custom radiuses of pane's
            // background
            if (center && paneInnerR) {
                innerRatio = paneInnerR / distance;
                if (a < innerRatio) {
                    a = innerRatio;
                }
                if (b < innerRatio) {
                    b = innerRatio;
                }
            }
            path = [
                ['M', x1 + a * (x2 - x1), y1 - a * (y1 - y2)],
                ['L', x2 - (1 - b) * (x2 - x1), y2 + (1 - b) * (y1 - y2)]
            ];
            // Concentric circles
        }
        else {
            // Pick the right values depending if it is grid line or
            // crosshair
            value = this.translate(value);
            // This is required in case when xAxis is non-circular to
            // prevent grid lines (or crosshairs, if enabled) from
            // rendering above the center after they supposed to be
            // displayed below the center point
            if (value) {
                if (value < 0 || value > height) {
                    value = 0;
                }
            }
            if (this.options.gridLineInterpolation === 'circle') {
                // A value of 0 is in the center, so it won't be
                // visible, but draw it anyway for update and animation
                // (#2366)
                path = this.getLinePath(0, value, paneInnerR);
                // Concentric polygons
            }
            else {
                path = [];
                // Find the other axis (a circular one) in the same pane
                chart[inverted ? 'yAxis' : 'xAxis'].forEach((a) => {
                    if (a.pane === this.pane) {
                        otherAxis = a;
                    }
                });
                if (otherAxis) {
                    tickPositions = otherAxis.tickPositions;
                    if (otherAxis.autoConnect) {
                        tickPositions =
                            tickPositions.concat([tickPositions[0]]);
                    }
                    // Reverse the positions for concatenation of polygonal
                    // plot bands
                    if (reverse) {
                        tickPositions = tickPositions.slice().reverse();
                    }
                    if (value) {
                        value += paneInnerR;
                    }
                    for (let i = 0; i < tickPositions.length; i++) {
                        xy = otherAxis.getPosition(tickPositions[i], value);
                        path.push(i ? ['L', xy.x, xy.y] : ['M', xy.x, xy.y]);
                    }
                }
            }
        }
        return path;
    }
    /**
     * Returns the x, y coordinate of a point given by a value and a pixel
     * distance from center.
     *
     * @private
     * @param {number} value
     * Point value.
     * @param {number} [length]
     * Distance from center.
     */
    function getPosition(value, length) {
        const translatedVal = this.translate(value);
        return this.postTranslate(this.isCircular ? translatedVal : this.angleRad, // #2848
        // In case when translatedVal is negative, the 0 value must be
        // used instead, in order to deal with lines and labels that
        // fall out of the visible range near the center of a pane
        RadialAxis_pick(this.isCircular ?
            length :
            (translatedVal < 0 ? 0 : translatedVal), this.center[2] / 2) - this.offset);
    }
    /**
     * Find the position for the axis title, by default inside the gauge.
     */
    function getTitlePosition() {
        const center = this.center, chart = this.chart, titleOptions = this.options.title;
        return {
            x: chart.plotLeft + center[0] + (titleOptions.x || 0),
            y: (chart.plotTop +
                center[1] -
                ({
                    high: 0.5,
                    middle: 0.25,
                    low: 0
                }[titleOptions.align] *
                    center[2]) +
                (titleOptions.y || 0))
        };
    }
    /**
     * Modify radial axis.
     * @private
     *
     * @param {Highcharts.Axis} radialAxis
     * Radial axis to modify.
     */
    function modify(axis) {
        axis.beforeSetTickPositions = beforeSetTickPositions;
        axis.createLabelCollector = createLabelCollector;
        axis.getCrosshairPosition = getCrosshairPosition;
        axis.getLinePath = getLinePath;
        axis.getOffset = getOffset;
        axis.getPlotBandPath = getPlotBandPath;
        axis.getPlotLinePath = getPlotLinePath;
        axis.getPosition = getPosition;
        axis.getTitlePosition = getTitlePosition;
        axis.postTranslate = postTranslate;
        axis.setAxisSize = setAxisSize;
        axis.setAxisTranslation = setAxisTranslation;
        axis.setOptions = setOptions;
    }
    /**
     * Modify radial axis as hidden.
     * @private
     *
     * @param {Highcharts.Axis} radialAxis
     * Radial axis to modify.
     */
    function modifyAsHidden(radialAxis) {
        radialAxis.isHidden = true;
        radialAxis.createLabelCollector = createLabelCollectorHidden;
        radialAxis.getOffset = RadialAxis_noop;
        radialAxis.redraw = renderHidden;
        radialAxis.render = renderHidden;
        radialAxis.setScale = RadialAxis_noop;
        radialAxis.setCategories = RadialAxis_noop;
        radialAxis.setTitle = RadialAxis_noop;
    }
    /**
     * Finalize modification of axis instance with radial logic.
     */
    function onAxisAfterInit() {
        const chart = this.chart, options = this.options, isHidden = chart.angular && this.isXAxis, pane = this.pane, paneOptions = pane?.options;
        if (!isHidden && pane && (chart.angular || chart.polar)) {
            const fullCircle = Math.PI * 2, 
            // Start and end angle options are given in degrees relative to
            // top, while internal computations are in radians relative to
            // right (like SVG).
            start = (RadialAxis_pick(paneOptions.startAngle, 0) - 90) * Math.PI / 180, end = (RadialAxis_pick(paneOptions.endAngle, RadialAxis_pick(paneOptions.startAngle, 0) + 360) - 90) * Math.PI / 180;
            // Y axis in polar charts
            this.angleRad = (options.angle || 0) * Math.PI / 180;
            // Gauges
            this.startAngleRad = start;
            this.endAngleRad = end;
            this.offset = options.offset || 0;
            // Normalize Start and End to <0, 2*PI> range
            // (in degrees: <0,360>)
            let normalizedStart = (start % fullCircle + fullCircle) %
                fullCircle, normalizedEnd = (end % fullCircle + fullCircle) % fullCircle;
            // Move normalized angles to <-PI, PI> range (<-180, 180>)
            // to match values returned by Math.atan2()
            if (normalizedStart > Math.PI) {
                normalizedStart -= fullCircle;
            }
            if (normalizedEnd > Math.PI) {
                normalizedEnd -= fullCircle;
            }
            this.normalizedStartAngleRad = normalizedStart;
            this.normalizedEndAngleRad = normalizedEnd;
        }
    }
    /**
     * Wrap auto label align to avoid setting axis-wide rotation on radial axes.
     * (#4920)
     */
    function onAxisAutoLabelAlign(e) {
        if (this.isRadial) {
            e.align = void 0;
            e.preventDefault();
        }
    }
    /**
     * Remove label collector function on axis remove/update.
     */
    function onAxisDestroy() {
        if (this.chart?.labelCollectors) {
            const index = (this.labelCollector ?
                this.chart.labelCollectors.indexOf(this.labelCollector) :
                -1);
            if (index >= 0) {
                this.chart.labelCollectors.splice(index, 1);
            }
        }
    }
    /**
     * Modify axis instance with radial logic before common axis init.
     */
    function onAxisInit(e) {
        const chart = this.chart, angular = chart.angular, polar = chart.polar, isX = this.isXAxis, coll = this.coll, isHidden = angular && isX, paneIndex = e.userOptions.pane || 0, pane = this.pane = chart.pane && chart.pane[paneIndex];
        let isCircular;
        // Prevent changes for colorAxis
        if (coll === 'colorAxis') {
            this.isRadial = false;
            return;
        }
        // Before prototype.init
        if (angular) {
            if (isHidden) {
                modifyAsHidden(this);
            }
            else {
                modify(this);
            }
            isCircular = !isX;
        }
        else if (polar) {
            modify(this);
            // Check which axis is circular
            isCircular = this.horiz;
        }
        // Disable certain features on angular and polar axes
        if (angular || polar) {
            this.isRadial = true;
            if (!this.labelCollector) {
                this.labelCollector = this.createLabelCollector();
            }
            if (this.labelCollector) {
                // Prevent overlapping axis labels (#9761)
                chart.labelCollectors.push(this.labelCollector);
            }
        }
        else {
            this.isRadial = false;
        }
        // A pointer back to this axis to borrow geometry
        if (pane && isCircular) {
            pane.axis = this;
        }
        this.isCircular = isCircular;
    }
    /**
     * Prepare axis translation.
     */
    function onAxisInitialAxisTranslation() {
        if (this.isRadial) {
            this.beforeSetTickPositions();
        }
    }
    /**
     * Find the center position of the label based on the distance option.
     */
    function onTickAfterGetLabelPosition(e) {
        const label = this.label;
        if (!label) {
            return;
        }
        const axis = this.axis, labelBBox = label.getBBox(), labelOptions = axis.options.labels, angle = ((axis.translate(this.pos) + axis.startAngleRad +
            Math.PI / 2) / Math.PI * 180) % 360, correctAngle = Math.round(angle), labelYPosCorrection = !RadialAxis_defined(labelOptions.y) ? -labelBBox.height * 0.3 : 0;
        let optionsY = labelOptions.y, ret, centerSlot = 20, // 20 degrees to each side at the top and bottom
        align = labelOptions.align, labelDir = 'end', // Direction of the label 'start' or 'end'
        reducedAngle1 = correctAngle < 0 ?
            correctAngle + 360 : correctAngle, reducedAngle2 = reducedAngle1, translateY = 0, translateX = 0;
        if (axis.isRadial) { // Both X and Y axes in a polar chart
            ret = axis.getPosition(this.pos, (axis.center[2] / 2) +
                RadialAxis_relativeLength(RadialAxis_pick(labelOptions.distance, -25), axis.center[2] / 2, -axis.center[2] / 2));
            // Automatically rotated
            if (labelOptions.rotation === 'auto') {
                label.attr({
                    rotation: angle
                });
                // Vertically centered
            }
            else if (!RadialAxis_defined(optionsY)) {
                optionsY = (axis.chart.renderer.fontMetrics(label).b -
                    labelBBox.height / 2);
            }
            // Automatic alignment
            if (!RadialAxis_defined(align)) {
                if (axis.isCircular) { // Y axis
                    if (labelBBox.width >
                        axis.len * axis.tickInterval / (axis.max - axis.min)) { // #3506
                        centerSlot = 0;
                    }
                    if (angle > centerSlot && angle < 180 - centerSlot) {
                        align = 'left'; // Right hemisphere
                    }
                    else if (angle > 180 + centerSlot &&
                        angle < 360 - centerSlot) {
                        align = 'right'; // Left hemisphere
                    }
                    else {
                        align = 'center'; // Top or bottom
                    }
                }
                else {
                    align = 'center';
                }
                label.attr({
                    align: align
                });
            }
            // Auto alignment for solid-gauges with two labels (#10635)
            if (align === 'auto' &&
                axis.tickPositions.length === 2 &&
                axis.isCircular) {
                // Angles reduced to 0 - 90 or 180 - 270
                if (reducedAngle1 > 90 && reducedAngle1 < 180) {
                    reducedAngle1 = 180 - reducedAngle1;
                }
                else if (reducedAngle1 > 270 && reducedAngle1 <= 360) {
                    reducedAngle1 = 540 - reducedAngle1;
                }
                // Angles reduced to 0 - 180
                if (reducedAngle2 > 180 && reducedAngle2 <= 360) {
                    reducedAngle2 = 360 - reducedAngle2;
                }
                if ((axis.pane.options.startAngle === correctAngle) ||
                    (axis.pane.options.startAngle === correctAngle + 360) ||
                    (axis.pane.options.startAngle === correctAngle - 360)) {
                    labelDir = 'start';
                }
                if ((correctAngle >= -90 && correctAngle <= 90) ||
                    (correctAngle >= -360 && correctAngle <= -270) ||
                    (correctAngle >= 270 && correctAngle <= 360)) {
                    align = (labelDir === 'start') ? 'right' : 'left';
                }
                else {
                    align = (labelDir === 'start') ? 'left' : 'right';
                }
                // For angles between (90 + n * 180) +- 20
                if (reducedAngle2 > 70 && reducedAngle2 < 110) {
                    align = 'center';
                }
                // Auto Y translation
                if (reducedAngle1 < 15 ||
                    (reducedAngle1 >= 180 && reducedAngle1 < 195)) {
                    translateY = labelBBox.height * 0.3;
                }
                else if (reducedAngle1 >= 15 && reducedAngle1 <= 35) {
                    translateY = labelDir === 'start' ?
                        0 : labelBBox.height * 0.75;
                }
                else if (reducedAngle1 >= 195 && reducedAngle1 <= 215) {
                    translateY = labelDir === 'start' ?
                        labelBBox.height * 0.75 : 0;
                }
                else if (reducedAngle1 > 35 && reducedAngle1 <= 90) {
                    translateY = labelDir === 'start' ?
                        -labelBBox.height * 0.25 : labelBBox.height;
                }
                else if (reducedAngle1 > 215 && reducedAngle1 <= 270) {
                    translateY = labelDir === 'start' ?
                        labelBBox.height : -labelBBox.height * 0.25;
                }
                // Auto X translation
                if (reducedAngle2 < 15) {
                    translateX = labelDir === 'start' ?
                        -labelBBox.height * 0.15 : labelBBox.height * 0.15;
                }
                else if (reducedAngle2 > 165 && reducedAngle2 <= 180) {
                    translateX = labelDir === 'start' ?
                        labelBBox.height * 0.15 : -labelBBox.height * 0.15;
                }
                label.attr({ align: align });
                label.translate(translateX, translateY + labelYPosCorrection);
            }
            e.pos.x = ret.x + (labelOptions.x || 0);
            e.pos.y = ret.y + (optionsY || 0);
        }
    }
    /**
     * Add special cases within the Tick class' methods for radial axes.
     */
    function onTickAfterGetPosition(e) {
        if (this.axis.getPosition) {
            RadialAxis_extend(e.pos, this.axis.getPosition(this.pos));
        }
    }
    /**
     * Update default options for radial axes from setOptions method.
     */
    function onGlobalSetOptions({ options }) {
        if (options.xAxis) {
            RadialAxis_merge(true, RadialAxis.radialDefaultOptions.circular, options.xAxis);
        }
        if (options.yAxis) {
            RadialAxis_merge(true, RadialAxis.radialDefaultOptions.radialGauge, options.yAxis);
        }
    }
    /**
     * Translate from intermediate plotX (angle), plotY (axis.len - radius)
     * to final chart coordinates.
     *
     * @private
     * @param {number} angle
     * Translation angle.
     * @param {number} radius
     * Translation radius.
     */
    function postTranslate(angle, radius) {
        const chart = this.chart, center = this.center;
        angle = this.startAngleRad + angle;
        return {
            x: chart.plotLeft + center[0] + Math.cos(angle) * radius,
            y: chart.plotTop + center[1] + Math.sin(angle) * radius
        };
    }
    /**
     * Prevent setting Y axis dirty.
     */
    function renderHidden() {
        this.isDirty = false;
    }
    /**
     * Override the setAxisSize method to use the arc's circumference as
     * length. This allows tickPixelInterval to apply to pixel lengths along
     * the perimeter.
     * @private
     */
    function setAxisSize() {
        const axisProto = this.constructor.prototype;
        let center, start;
        axisProto.setAxisSize.call(this);
        if (this.isRadial) {
            // Set the center array
            this.pane.updateCenter(this);
            // In case when the innerSize is set in a polar chart, the axis'
            // center cannot be a reference to pane's center
            center = this.center = this.pane.center.slice();
            // The sector is used in Axis.translate to compute the
            // translation of reversed axis points (#2570)
            if (this.isCircular) {
                this.sector = this.endAngleRad - this.startAngleRad;
            }
            else {
                // When the pane's startAngle or the axis' angle is set then
                // new x and y values for vertical axis' center must be
                // calculated
                start = this.postTranslate(this.angleRad, center[3] / 2);
                center[0] = start.x - this.chart.plotLeft;
                center[1] = start.y - this.chart.plotTop;
            }
            // Axis len is used to lay out the ticks
            this.len = this.width = this.height =
                (center[2] - center[3]) * RadialAxis_pick(this.sector, 1) / 2;
        }
    }
    /**
     * Override setAxisTranslation by setting the translation to the
     * difference in rotation. This allows the translate method to return
     * angle for any given value.
     *
     * @private
     */
    function setAxisTranslation() {
        const axisProto = this.constructor.prototype;
        // Call uber method
        axisProto.setAxisTranslation.call(this);
        // Set transA and minPixelPadding
        if (this.center) { // It's not defined the first time
            if (this.isCircular) {
                this.transA = (this.endAngleRad - this.startAngleRad) /
                    ((this.max - this.min) || 1);
            }
            else {
                // The transA here is the length of the axis, so in case
                // of inner radius, the length must be decreased by it
                this.transA = ((this.center[2] - this.center[3]) / 2) /
                    ((this.max - this.min) || 1);
            }
            if (this.isXAxis) {
                this.minPixelPadding = this.transA * this.minPointOffset;
            }
            else {
                // This is a workaround for regression #2593, but categories
                // still don't position correctly.
                this.minPixelPadding = 0;
            }
        }
    }
    /**
     * Merge and set options.
     */
    function setOptions(userOptions) {
        const { coll } = this;
        const { angular, inverted, polar } = this.chart;
        let defaultPolarOptions = {};
        if (angular) {
            if (!this.isXAxis) {
                defaultPolarOptions = RadialAxis_merge(RadialAxis_defaultOptions.yAxis, RadialAxis.radialDefaultOptions.radialGauge);
            }
        }
        else if (polar) {
            defaultPolarOptions = this.horiz ?
                RadialAxis_merge(RadialAxis_defaultOptions.xAxis, RadialAxis.radialDefaultOptions.circular) :
                RadialAxis_merge(coll === 'xAxis' ?
                    RadialAxis_defaultOptions.xAxis :
                    RadialAxis_defaultOptions.yAxis, RadialAxis.radialDefaultOptions.radial);
        }
        if (inverted && coll === 'yAxis') {
            defaultPolarOptions.stackLabels = isObject(RadialAxis_defaultOptions.yAxis, true) ? RadialAxis_defaultOptions.yAxis.stackLabels : {};
            defaultPolarOptions.reversedStacks = true;
        }
        const options = this.options = RadialAxis_merge(defaultPolarOptions, userOptions);
        // Make sure the plotBands array is instantiated for each Axis
        // (#2649)
        if (!options.plotBands) {
            options.plotBands = [];
        }
        RadialAxis_fireEvent(this, 'afterSetOptions');
    }
    /**
     * Wrap the getMarkPath function to return the path of the radial marker.
     */
    function wrapTickGetMarkPath(proceed, x, y, tickLength, tickWidth, horiz, renderer) {
        const axis = this.axis;
        let endPoint, ret;
        if (axis.isRadial) {
            endPoint = axis.getPosition(this.pos, axis.center[2] / 2 + tickLength);
            ret = [
                'M',
                x,
                y,
                'L',
                endPoint.x,
                endPoint.y
            ];
        }
        else {
            ret = proceed.call(this, x, y, tickLength, tickWidth, horiz, renderer);
        }
        return ret;
    }
    /* eslint-enable valid-jsdoc */
})(RadialAxis || (RadialAxis = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Axis_RadialAxis = (RadialAxis);

;// ./code/es-modules/Series/PolarComposition.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { animObject: PolarComposition_animObject } = (external_highcharts_src_js_default_default());

const { composed: PolarComposition_composed } = (external_highcharts_src_js_default_default());




const { addEvent: PolarComposition_addEvent, defined: PolarComposition_defined, find, isNumber: PolarComposition_isNumber, merge: PolarComposition_merge, pick: PolarComposition_pick, pushUnique: PolarComposition_pushUnique, relativeLength: PolarComposition_relativeLength, splat: PolarComposition_splat, uniqueKey: PolarComposition_uniqueKey, wrap: PolarComposition_wrap } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function clipCircle(renderer, x, y, r, innerR) {
    const id = PolarComposition_uniqueKey(), clipPath = renderer.createElement('clipPath').attr({
        id: id
    }).add(renderer.defs), wrapper = innerR ?
        renderer.arc(x, y, r, innerR, 0, 2 * Math.PI).add(clipPath) :
        renderer.circle(x, y, r).add(clipPath);
    wrapper.id = id;
    wrapper.clipPath = clipPath;
    return wrapper;
}
/**
 * Find correct align and vertical align based on an angle in polar chart
 * @private
 */
function findAlignments(angle, options) {
    let align, verticalAlign;
    if (options.align === null) {
        if (angle > 20 && angle < 160) {
            align = 'left'; // Right hemisphere
        }
        else if (angle > 200 && angle < 340) {
            align = 'right'; // Left hemisphere
        }
        else {
            align = 'center'; // Top or bottom
        }
        options.align = align;
    }
    if (options.verticalAlign === null) {
        if (angle < 45 || angle > 315) {
            verticalAlign = 'bottom'; // Top part
        }
        else if (angle > 135 && angle < 225) {
            verticalAlign = 'top'; // Bottom part
        }
        else {
            verticalAlign = 'middle'; // Left or right
        }
        options.verticalAlign = verticalAlign;
    }
    return options;
}
/**
 * #6212 Calculate connectors for spline series in polar chart.
 * @private
 * @param {boolean} calculateNeighbours
 *        Check if connectors should be calculated for neighbour points as
 *        well allows short recurrence
 */
function getConnectors(segment, index, calculateNeighbours, connectEnds) {
    const smoothing = 1.5, denom = smoothing + 1, addedNumber = connectEnds ? 1 : 0;
    let i, leftContX, leftContY, rightContX, rightContY, jointAngle;
    // Calculate final index of points depending on the initial index value.
    // Because of calculating neighbours, index may be outside segment
    // array.
    if (index >= 0 && index <= segment.length - 1) {
        i = index;
    }
    else if (index < 0) {
        i = segment.length - 1 + index;
    }
    else {
        i = 0;
    }
    // 1 means control points midway between points, 2 means 1/3 from
    // the point, 3 is 1/4 etc;
    const prevPointInd = ((i - 1 < 0) ? segment.length - (1 + addedNumber) : i - 1), nextPointInd = (i + 1 > segment.length - 1) ? addedNumber : i + 1, previousPoint = segment[prevPointInd], nextPoint = segment[nextPointInd], previousX = previousPoint.plotX, previousY = previousPoint.plotY, nextX = nextPoint.plotX, nextY = nextPoint.plotY, plotX = segment[i].plotX, // Actual point
    plotY = segment[i].plotY;
    leftContX = (smoothing * plotX + previousX) / denom;
    leftContY = (smoothing * plotY + previousY) / denom;
    rightContX = (smoothing * plotX + nextX) / denom;
    rightContY = (smoothing * plotY + nextY) / denom;
    // Distance left control point
    const dLControlPoint = Math.sqrt(Math.pow(leftContX - plotX, 2) + Math.pow(leftContY - plotY, 2)), dRControlPoint = Math.sqrt(Math.pow(rightContX - plotX, 2) + Math.pow(rightContY - plotY, 2)), leftContAngle = Math.atan2(leftContY - plotY, leftContX - plotX), rightContAngle = Math.atan2(rightContY - plotY, rightContX - plotX);
    jointAngle = (Math.PI / 2) + ((leftContAngle + rightContAngle) / 2);
    // Ensure the right direction, jointAngle should be in the same quadrant
    // as leftContAngle
    if (Math.abs(leftContAngle - jointAngle) > Math.PI / 2) {
        jointAngle -= Math.PI;
    }
    // Find the corrected control points for a spline straight through the
    // point
    leftContX = plotX + Math.cos(jointAngle) * dLControlPoint;
    leftContY = plotY + Math.sin(jointAngle) * dLControlPoint;
    rightContX = plotX + Math.cos(Math.PI + jointAngle) * dRControlPoint;
    rightContY = plotY + Math.sin(Math.PI + jointAngle) * dRControlPoint;
    // Push current point's connectors into returned object
    const ret = {
        rightContX: rightContX,
        rightContY: rightContY,
        leftContX: leftContX,
        leftContY: leftContY,
        plotX: plotX,
        plotY: plotY
    };
    // Calculate connectors for previous and next point and push them inside
    // returned object
    if (calculateNeighbours) {
        ret.prevPointCont = getConnectors(segment, prevPointInd, false, connectEnds);
    }
    return ret;
}
/**
 *
 */
function onChartAfterDrawChartBox() {
    (this.pane || []).forEach((pane) => {
        pane.render();
    });
}
/**
 * If polar has polygonal grid lines, force start and endOnTick on radial axis
 * @private
 */
function onChartAfterInit(event) {
    const xAxis = event.args[0].xAxis, yAxis = event.args[0].yAxis, chart = event.args[0].chart;
    if (xAxis && yAxis) {
        if (yAxis.gridLineInterpolation === 'polygon') {
            xAxis.startOnTick = true;
            xAxis.endOnTick = true;
        }
        else if (xAxis.gridLineInterpolation === 'polygon' &&
            chart.inverted) {
            yAxis.startOnTick = true;
            yAxis.endOnTick = true;
        }
    }
}
/**
 *
 */
function onChartCreateAxes() {
    if (!this.pane) {
        this.pane = [];
    }
    this.options.pane = PolarComposition_splat(this.options.pane || {});
    PolarComposition_splat(this.userOptions.pane || {}).forEach((paneOptions) => {
        new Pane_Pane(// eslint-disable-line no-new
        paneOptions, this);
    }, this);
}
/**
 * Get selection dimensions
 * @private
 */
function onPointerGetSelectionBox(event) {
    const marker = event.args.marker, xAxis = this.chart.xAxis[0], yAxis = this.chart.yAxis[0], inverted = this.chart.inverted, radialAxis = inverted ? yAxis : xAxis, linearAxis = inverted ? xAxis : yAxis;
    if (this.chart.polar) {
        event.preventDefault();
        const start = (marker.attr ? marker.attr('start') : marker.start) - radialAxis.startAngleRad, r = (marker.attr ? marker.attr('r') : marker.r), end = (marker.attr ? marker.attr('end') : marker.end) - radialAxis.startAngleRad, innerR = (marker.attr ? marker.attr('innerR') : marker.innerR);
        event.result.x = start + radialAxis.pos;
        event.result.width = end - start;
        // `innerR` goes from pane's center but `toValue` computes values from
        // top
        event.result.y = linearAxis.len + linearAxis.pos - r;
        event.result.height = r - innerR;
    }
}
/**
 * Get attrs for Polar selection marker
 * @private
 */
function onPointerGetSelectionMarkerAttrs(event) {
    const chart = this.chart;
    if (chart.polar && chart.hoverPane && chart.hoverPane.axis) {
        event.preventDefault();
        const center = chart.hoverPane.center, mouseDownX = chart.mouseDownX || 0, mouseDownY = chart.mouseDownY || 0, chartY = event.args.chartY, chartX = event.args.chartX, fullCircle = Math.PI * 2, startAngleRad = chart.hoverPane.axis.startAngleRad, endAngleRad = chart.hoverPane.axis.endAngleRad, linearAxis = chart.inverted ? chart.xAxis[0] : chart.yAxis[0], attrs = {};
        let shapeType = 'arc';
        attrs.x = center[0] + chart.plotLeft;
        attrs.y = center[1] + chart.plotTop;
        // Adjust the width of the selection marker
        if (this.zoomHor) {
            const paneRadRange = startAngleRad > 0 ?
                endAngleRad - startAngleRad :
                Math.abs(startAngleRad) + Math.abs(endAngleRad);
            let startAngle = Math.atan2(mouseDownY - chart.plotTop - center[1], mouseDownX - chart.plotLeft - center[0]) - startAngleRad, endAngle = Math.atan2(chartY - chart.plotTop - center[1], chartX - chart.plotLeft - center[0]) - startAngleRad;
            attrs.r = center[2] / 2;
            attrs.innerR = center[3] / 2;
            if (startAngle <= 0) {
                startAngle += fullCircle;
            }
            if (endAngle <= 0) {
                endAngle += fullCircle;
            }
            if (endAngle < startAngle) {
                // Swapping angles
                endAngle = [startAngle, startAngle = endAngle][0];
            }
            // If pane is not a full circle we need to let users zoom to the min
            // We do this by swapping angles after pointer crosses
            // middle angle (swapAngle) of the missing slice of the pane
            if (paneRadRange < fullCircle) {
                const swapAngle = endAngleRad + (fullCircle - paneRadRange) / 2;
                if (startAngleRad + endAngle > swapAngle) {
                    endAngle = startAngle;
                    startAngle = startAngleRad <= 0 ? startAngleRad : 0;
                }
            }
            const start = attrs.start =
                Math.max(startAngle + startAngleRad, startAngleRad), end = attrs.end =
                Math.min(endAngle + startAngleRad, endAngleRad);
            // Adjust the selection shape for polygon grid lines
            if (linearAxis.options.gridLineInterpolation === 'polygon') {
                const radialAxis = chart.hoverPane.axis, min = start - radialAxis.startAngleRad + radialAxis.pos, max = end - start;
                let path = linearAxis.getPlotLinePath({
                    value: linearAxis.max
                }), pathStart = radialAxis.toValue(min), pathEnd = radialAxis.toValue(min + max);
                if (pathStart < radialAxis.getExtremes().min) {
                    const { min, max } = radialAxis.getExtremes();
                    pathStart = max - (min - pathStart);
                }
                if (pathEnd < radialAxis.getExtremes().min) {
                    const { min, max } = radialAxis.getExtremes();
                    pathEnd = max - (min - pathEnd);
                }
                if (pathEnd < pathStart) {
                    // Swapping angles
                    pathEnd = [pathStart, pathStart = pathEnd][0];
                }
                // Get trimmed path
                path = trimPath(path, pathStart, pathEnd, radialAxis);
                // Add center to the path
                path.push([
                    'L', center[0] + chart.plotLeft,
                    chart.plotTop + center[1]
                ]);
                attrs.d = path;
                shapeType = 'path';
            }
        }
        // Adjust the height of the selection marker
        if (this.zoomVert) {
            const linearAxis = chart.inverted ? chart.xAxis[0] : chart.yAxis[0];
            let innerR = Math.sqrt(Math.pow(mouseDownX - chart.plotLeft - center[0], 2) +
                Math.pow(mouseDownY - chart.plotTop - center[1], 2)), r = Math.sqrt(Math.pow(chartX - chart.plotLeft - center[0], 2) +
                Math.pow(chartY - chart.plotTop - center[1], 2));
            if (r < innerR) {
                // Swapping angles
                innerR = [r, r = innerR][0];
            }
            if (r > center[2] / 2) {
                r = center[2] / 2;
            }
            if (innerR < center[3] / 2) {
                innerR = center[3] / 2;
            }
            if (!this.zoomHor) {
                attrs.start = startAngleRad;
                attrs.end = endAngleRad;
            }
            attrs.r = r;
            attrs.innerR = innerR;
            if (linearAxis.options.gridLineInterpolation === 'polygon') {
                const end = linearAxis.toValue(linearAxis.len + linearAxis.pos - innerR), start = linearAxis.toValue(linearAxis.len + linearAxis.pos - r), path = linearAxis.getPlotLinePath({
                    value: start
                }).concat(linearAxis.getPlotLinePath({
                    value: end,
                    reverse: true
                }));
                attrs.d = path;
                shapeType = 'path';
            }
        }
        if (this.zoomHor &&
            this.zoomVert &&
            linearAxis.options.gridLineInterpolation === 'polygon') {
            const radialAxis = chart.hoverPane.axis, start = attrs.start || 0, end = attrs.end || 0, min = start - radialAxis.startAngleRad + radialAxis.pos, max = end - start, pathStart = radialAxis.toValue(min), pathEnd = radialAxis.toValue(min + max);
            // Trim path
            if (attrs.d instanceof Array) {
                let innerPath = attrs.d.slice(0, attrs.d.length / 2), outerPath = attrs.d.slice(attrs.d.length / 2, attrs.d.length);
                outerPath = [...outerPath].reverse();
                const radialAxis = chart.hoverPane.axis;
                innerPath = trimPath(innerPath, pathStart, pathEnd, radialAxis);
                outerPath = trimPath(outerPath, pathStart, pathEnd, radialAxis);
                if (outerPath) {
                    (outerPath[0][0]) = 'L';
                }
                outerPath = [...outerPath].reverse();
                attrs.d = innerPath.concat(outerPath);
                shapeType = 'path';
            }
        }
        event.attrs = attrs;
        event.shapeType = shapeType;
    }
}
/**
 * @private
 */
function onSeriesAfterInit() {
    const chart = this.chart;
    if (chart.polar) {
        this.polar = new PolarAdditions(this);
        // Add flags that identifies radial inverted series
        if (chart.inverted) {
            this.isRadialSeries = true;
            if (this.is('column')) {
                this.isRadialBar = true;
            }
        }
    }
}
/**
 * Extend translate. The plotX and plotY values are computed as if the polar
 * chart were a cartesian plane, where plotX denotes the angle in radians
 * and (yAxis.len - plotY) is the pixel distance from center.
 * @private
 */
function onSeriesAfterTranslate() {
    if (this.chart.polar && this.xAxis) {
        const series = this, { xAxis, yAxis } = series, chart = series.chart;
        // Prepare k-d-tree handling. It searches by angle (clientX) in
        // case of shared tooltip, and by two dimensional distance in case
        // of non-shared.
        series.kdByAngle = chart.tooltip && chart.tooltip.shared;
        if (series.kdByAngle || chart.inverted) {
            series.searchPoint = searchPointByAngleOrInverted;
        }
        else {
            series.options.findNearestPointBy = 'xy';
        }
        const points = series.points;
        let i = points.length;
        while (i--) {
            // Translate plotX, plotY from angle and radius to true plot
            // coordinates
            if (!series.is('column') && !series.is('columnrange')) {
                series.polar.toXY(points[i]);
            }
            // Treat points below Y axis min as null (#10082)
            if (!chart.hasParallelCoordinates &&
                !series.yAxis.reversed) {
                if (PolarComposition_pick(points[i].y, Number.MIN_VALUE) < yAxis.min ||
                    points[i].x < xAxis.min ||
                    points[i].x > xAxis.max) {
                    // Destroy markers
                    points[i].isNull = true;
                    // Destroy column's graphic
                    points[i].plotY = NaN;
                }
                else {
                    // Restore isNull flag
                    points[i].isNull =
                        points[i].isValid && !points[i].isValid();
                }
            }
        }
        // Perform clip after render
        if (!this.hasClipCircleSetter) {
            this.hasClipCircleSetter = !!series.eventsToUnbind.push(PolarComposition_addEvent(series, 'afterRender', function () {
                let circ;
                if (chart.polar && this.options.clip !== false) {
                    // For clipping purposes there is a need for
                    // coordinates from the absolute center
                    circ = this.yAxis.pane.center;
                    if (!this.clipCircle) {
                        this.clipCircle = clipCircle(chart.renderer, circ[0], circ[1], circ[2] / 2, circ[3] / 2);
                    }
                    else {
                        this.clipCircle.animate({
                            x: circ[0],
                            y: circ[1],
                            r: circ[2] / 2,
                            innerR: circ[3] / 2
                        });
                    }
                    this.group.clip(this.clipCircle);
                    this.setClip = (external_highcharts_src_js_default_default()).noop;
                }
            }));
        }
    }
}
/**
 * Search a k-d tree by the point angle (used for shared tooltips in polar) or
 * the inverted point.
 * charts
 * @private
 */
function searchPointByAngleOrInverted(e) {
    const series = this, chart = series.chart, xAxis = series.xAxis, yAxis = series.yAxis, center = xAxis.pane && xAxis.pane.center, plotX = e.chartX - (center && center[0] || 0) - chart.plotLeft, plotY = e.chartY - (center && center[1] || 0) - chart.plotTop;
    const searchKDTreePoint = chart.inverted ? {
        clientX: e.chartX - yAxis.pos,
        plotY: e.chartY - xAxis.pos
    } : {
        clientX: 180 + (Math.atan2(plotX, plotY) * (-180 / Math.PI))
    };
    return series.searchKDTree(searchKDTreePoint);
}
/**
 * Trim polygonal path
 * @private
 */
function trimPath(path, start, end, radialAxis) {
    const tickInterval = radialAxis.tickInterval, ticks = radialAxis.tickPositions;
    let lastTick = find(ticks, (tick) => tick >= end), firstTick = find([...ticks].reverse(), (tick) => tick <= start);
    if (!PolarComposition_defined(lastTick)) {
        lastTick = ticks[ticks.length - 1];
    }
    if (!PolarComposition_defined(firstTick)) {
        firstTick = ticks[0];
        lastTick += tickInterval;
        path[0][0] = 'L';
        // To do: figure out why -3 or -2
        path.unshift(path[path.length - 3]);
    }
    path = path.slice(ticks.indexOf(firstTick), ticks.indexOf(lastTick) + 1);
    path[0][0] = 'M';
    return path;
}
/**
 * Extend chart.get to also search in panes. Used internally in
 * responsiveness and chart.update.
 * @private
 */
function wrapChartGet(proceed, id) {
    return find(this.pane || [], (pane) => (
    // @todo remove id or define id type:
    pane.options.id === id)) || proceed.call(this, id);
}
/**
 * Align column data labels outside the columns. #1199.
 * @private
 */
function wrapColumnSeriesAlignDataLabel(proceed, point, dataLabel, options, alignTo, isNew) {
    const chart = this.chart, inside = PolarComposition_pick(options.inside, !!this.options.stacking);
    let angle, shapeArgs, labelPos;
    if (chart.polar) {
        angle = point.rectPlotX / Math.PI * 180;
        if (!chart.inverted) {
            // Align nicely outside the perimeter of the columns
            options = findAlignments(angle, options);
        }
        else { // Required corrections for data labels of inverted bars
            // The plotX and plotY are correctly set therefore they
            // don't need to be swapped (inverted argument is false)
            this.forceDL = chart.isInsidePlot(point.plotX, point.plotY);
            // Checks if labels should be positioned inside
            if (inside && point.shapeArgs) {
                shapeArgs = point.shapeArgs;
                // Calculates pixel positions for a data label to be
                // inside
                labelPos =
                    this.yAxis.postTranslate(
                    // Angle
                    ((shapeArgs.start || 0) + (shapeArgs.end || 0)) / 2 -
                        this
                            .xAxis.startAngleRad, 
                    // Radius
                    point.barX +
                        point.pointWidth / 2);
                alignTo = PolarComposition_merge(alignTo, {
                    x: labelPos.x - chart.plotLeft,
                    y: labelPos.y - chart.plotTop
                });
            }
            else if (point.tooltipPos) {
                alignTo = PolarComposition_merge(alignTo, {
                    x: point.tooltipPos[0],
                    y: point.tooltipPos[1]
                });
            }
            options.align = PolarComposition_pick(options.align, 'center');
            options.verticalAlign =
                PolarComposition_pick(options.verticalAlign, 'middle');
        }
        external_highcharts_src_js_default_Series_default().prototype.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
        // Hide label of a point (only inverted) that is outside the
        // visible y range
        if (this.isRadialBar && point.shapeArgs &&
            point.shapeArgs.start === point.shapeArgs.end) {
            dataLabel.hide();
        }
        else {
            dataLabel.show();
        }
    }
    else {
        proceed.call(this, point, dataLabel, options, alignTo, isNew);
    }
}
/**
 * Extend the column prototype's translate method
 * @private
 */
function onAfterColumnTranslate() {
    const series = this, options = series.options, stacking = options.stacking, chart = series.chart, xAxis = series.xAxis, yAxis = series.yAxis, reversed = yAxis.reversed, center = yAxis.center, startAngleRad = xAxis.startAngleRad, endAngleRad = xAxis.endAngleRad, visibleRange = endAngleRad - startAngleRad;
    let threshold = options.threshold, thresholdAngleRad = 0, points, point, i, yMin, yMax, start = 0, end = 0, tooltipPos, pointX, pointY, stackValues, stack, barX, innerR, r;
    // Postprocess plot coordinates
    if (xAxis.isRadial) {
        points = series.points;
        i = points.length;
        yMin = yAxis.translate(yAxis.min);
        yMax = yAxis.translate(yAxis.max);
        threshold = options.threshold || 0;
        if (chart.inverted) {
            // Finding a correct threshold
            if (PolarComposition_isNumber(threshold)) {
                thresholdAngleRad = yAxis.translate(threshold);
                // Checks if threshold is outside the visible range
                if (PolarComposition_defined(thresholdAngleRad)) {
                    if (thresholdAngleRad < 0) {
                        thresholdAngleRad = 0;
                    }
                    else if (thresholdAngleRad > visibleRange) {
                        thresholdAngleRad = visibleRange;
                    }
                    // Adding start angle offset
                    series.translatedThreshold =
                        thresholdAngleRad + startAngleRad;
                }
            }
        }
        while (i--) {
            point = points[i];
            barX = point.barX;
            pointX = point.x;
            pointY = point.y;
            point.shapeType = 'arc';
            if (chart.inverted) {
                point.plotY = yAxis.translate(pointY);
                if (stacking && yAxis.stacking) {
                    stack = yAxis.stacking.stacks[(pointY < 0 ? '-' : '') +
                        series.stackKey];
                    if (series.visible && stack && stack[pointX]) {
                        if (!point.isNull) {
                            stackValues = stack[pointX].points[series.getStackIndicator(void 0, pointX, series.index).key];
                            // Translating to radial values
                            start = yAxis.translate(stackValues[0]);
                            end = yAxis.translate(stackValues[1]);
                            // If starting point is beyond the
                            // range, set it to 0
                            if (PolarComposition_defined(start)) {
                                start = external_highcharts_src_js_default_default().clamp(start, 0, visibleRange);
                            }
                        }
                    }
                }
                else {
                    // Initial start and end angles for radial bar
                    start = thresholdAngleRad;
                    end = point.plotY;
                }
                if (start > end) {
                    // Swapping start and end
                    end = [start, start = end][0];
                }
                // Prevent from rendering point outside the
                // acceptable circular range
                if (!reversed) {
                    if (start < yMin) {
                        start = yMin;
                    }
                    else if (end > yMax) {
                        end = yMax;
                    }
                    else if (end < yMin || start > yMax) {
                        start = end = 0;
                    }
                }
                else {
                    if (end > yMin) {
                        end = yMin;
                    }
                    else if (start < yMax) {
                        start = yMax;
                    }
                    else if (start > yMin || end < yMax) {
                        start = end = visibleRange;
                    }
                }
                if (yAxis.min > yAxis.max) {
                    start = end = reversed ? visibleRange : 0;
                }
                start += startAngleRad;
                end += startAngleRad;
                if (center) {
                    point.barX = barX += center[3] / 2;
                }
                // In case when radius, inner radius or both are negative, a
                // point is rendered but partially or as a center point
                innerR = Math.max(barX, 0);
                r = Math.max(barX + point.pointWidth, 0);
                // Handle border radius
                const brOption = options.borderRadius, brValue = typeof brOption === 'object' ?
                    brOption.radius : brOption, borderRadius = PolarComposition_relativeLength(brValue || 0, r - innerR);
                point.shapeArgs = {
                    x: center[0],
                    y: center[1],
                    r,
                    innerR,
                    start,
                    end,
                    borderRadius
                };
                // Fade out the points if not inside the polar "plot area"
                point.opacity = start === end ? 0 : void 0;
                // A correct value for stacked or not fully visible
                // point
                point.plotY = (PolarComposition_defined(series.translatedThreshold) &&
                    (start < series.translatedThreshold ? start : end)) -
                    startAngleRad;
                // Non-inverted polar columns
            }
            else {
                start = barX + startAngleRad;
                point.shapeArgs = series.polar.arc(point.yBottom, point.plotY, start, start + point.pointWidth);
                // Disallow border radius on polar columns for now. It would
                // take some refactoring to work with the `scope` and the
                // `where` options. Those options would require that only
                // individual corners be rounded, in practice individual calls
                // to applyBorderRadius from the extended `arc` function. That
                // would be a viable solution, though it would not be perfect
                // until we implemented rounding that included the lower points
                // in the stack, like we have for cartesian column.
                point.shapeArgs.borderRadius = 0;
            }
            // Provided a correct coordinates for the tooltip
            series.polar.toXY(point);
            if (chart.inverted) {
                tooltipPos = yAxis.postTranslate(point.rectPlotY, barX + point.pointWidth / 2);
                point.tooltipPos = [
                    tooltipPos.x - chart.plotLeft,
                    tooltipPos.y - chart.plotTop
                ];
            }
            else {
                point.tooltipPos = [point.plotX, point.plotY];
            }
            if (center) {
                point.ttBelow = point.plotY > center[1];
            }
        }
    }
}
/**
 * Extend getSegmentPath to allow connecting ends across 0 to provide a
 * closed circle in line-like series.
 * @private
 */
function wrapLineSeriesGetGraphPath(proceed, points) {
    const series = this;
    let firstValid, popLastPoint;
    // Connect the path
    if (this.chart.polar) {
        points = points || this.points;
        // Append first valid point in order to connect the ends
        for (let i = 0; i < points.length; i++) {
            if (!points[i].isNull) {
                firstValid = i;
                break;
            }
        }
        /**
         * Polar charts only. Whether to connect the ends of a line series
         * plot across the extremes.
         *
         * @sample {highcharts} highcharts/plotoptions/line-connectends-false/
         *         Do not connect
         *
         * @type      {boolean}
         * @since     2.3.0
         * @product   highcharts
         * @apioption plotOptions.series.connectEnds
         */
        if (this.options.connectEnds !== false &&
            typeof firstValid !== 'undefined') {
            this.connectEnds = true; // Re-used in splines
            points.splice(points.length, 0, points[firstValid]);
            popLastPoint = true;
        }
        // For area charts, pseudo points are added to the graph, now we
        // need to translate these
        points.forEach((point) => {
            if (typeof point.polarPlotY === 'undefined') {
                series.polar.toXY(point);
            }
        });
    }
    // Run uber method
    const ret = proceed.apply(this, [].slice.call(arguments, 1));
    // #6212 points.splice method is adding points to an array. In case of
    // areaspline getGraphPath method is used two times and in both times
    // points are added to an array. That is why points.pop is used, to get
    // unmodified points.
    if (popLastPoint) {
        points.pop();
    }
    return ret;
}
/**
 * Extend getCoordinates to prepare for polar axis values
 * @private
 */
function wrapPointerGetCoordinates(proceed, e) {
    const chart = this.chart;
    let ret = {
        xAxis: [],
        yAxis: []
    };
    if (chart.polar) {
        chart.axes.forEach((axis) => {
            // Skip colorAxis
            if (axis.coll === 'colorAxis') {
                return;
            }
            const isXAxis = axis.isXAxis, center = axis.center, x = e.chartX - center[0] - chart.plotLeft, y = e.chartY - center[1] - chart.plotTop;
            ret[isXAxis ? 'xAxis' : 'yAxis'].push({
                axis: axis,
                value: axis.translate(isXAxis ?
                    Math.PI - Math.atan2(x, y) : // Angle
                    // distance from center
                    Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), true)
            });
        });
    }
    else {
        ret = proceed.call(this, e);
    }
    return ret;
}
/**
 * Prevent zooming on mobile devices
 * @private
 */
function wrapPointerPinch(proceed, e) {
    if (this.chart.polar) {
        return;
    }
    proceed.call(this, e);
}
/**
 * Define the animate method for regular series
 * @private
 */
function wrapSeriesAnimate(proceed, init) {
    const series = this, chart = this.chart, group = this.group, markerGroup = this.markerGroup, center = this.xAxis && this.xAxis.center, plotLeft = chart.plotLeft, plotTop = chart.plotTop;
    let animation = this.options.animation, attribs, paneInnerR, graphic, shapeArgs, r, innerR;
    // Specific animation for polar charts
    if (chart.polar) {
        if (series.isRadialBar) {
            if (!init) {
                // Run the pie animation for radial bars
                series.startAngleRad = PolarComposition_pick(series.translatedThreshold, series.xAxis.startAngleRad);
                external_highcharts_src_js_default_default().seriesTypes.pie.prototype.animate.call(series, init);
            }
        }
        else {
            animation = PolarComposition_animObject(animation);
            // A different animation needed for column like series
            if (series.is('column')) {
                if (!init) {
                    paneInnerR = center[3] / 2;
                    series.points.forEach((point) => {
                        graphic = point.graphic;
                        shapeArgs = point.shapeArgs;
                        r = shapeArgs && shapeArgs.r;
                        innerR = shapeArgs && shapeArgs.innerR;
                        if (graphic && shapeArgs) {
                            // Start values
                            graphic.attr({
                                r: paneInnerR,
                                innerR: paneInnerR
                            });
                            // Animate
                            graphic.animate({
                                r: r,
                                innerR: innerR
                            }, series.options.animation);
                        }
                    });
                }
            }
            else {
                // Initialize the animation
                if (init) {
                    // Scale down the group and place it in the center
                    attribs = {
                        translateX: center[0] + plotLeft,
                        translateY: center[1] + plotTop,
                        scaleX: 0.001,
                        scaleY: 0.001
                    };
                    group.attr(attribs);
                    if (markerGroup) {
                        markerGroup.attr(attribs);
                    }
                    // Run the animation
                }
                else {
                    attribs = {
                        translateX: plotLeft,
                        translateY: plotTop,
                        scaleX: 1,
                        scaleY: 1
                    };
                    group.animate(attribs, animation);
                    if (markerGroup) {
                        markerGroup.animate(attribs, animation);
                    }
                }
            }
        }
        // For non-polar charts, revert to the basic animation
    }
    else {
        proceed.call(this, init);
    }
}
/**
 * Overridden method for calculating a spline from one point to the next
 * @private
 */
function wrapSplineSeriesGetPointSpline(proceed, segment, point, i) {
    let ret, connectors;
    if (this.chart.polar) {
        // `moveTo` or `lineTo`
        if (!i) {
            ret = ['M', point.plotX, point.plotY];
        }
        else { // Curve from last point to this
            connectors = getConnectors(segment, i, true, this.connectEnds);
            const rightContX = connectors.prevPointCont &&
                connectors.prevPointCont.rightContX;
            const rightContY = connectors.prevPointCont &&
                connectors.prevPointCont.rightContY;
            ret = [
                'C',
                PolarComposition_isNumber(rightContX) ? rightContX : connectors.plotX,
                PolarComposition_isNumber(rightContY) ? rightContY : connectors.plotY,
                PolarComposition_isNumber(connectors.leftContX) ?
                    connectors.leftContX :
                    connectors.plotX,
                PolarComposition_isNumber(connectors.leftContY) ?
                    connectors.leftContY :
                    connectors.plotY,
                connectors.plotX,
                connectors.plotY
            ];
        }
    }
    else {
        ret = proceed.call(this, segment, point, i);
    }
    return ret;
}
/**
 * Extend the point pos method to calculate point positions for the polar chart.
 * @private
 */
function wrapPointPos(proceed, chartCoordinates, plotY = this.plotY) {
    if (!this.destroyed) {
        const { plotX, series } = this, { chart } = series;
        if (chart.polar &&
            PolarComposition_isNumber(plotX) &&
            PolarComposition_isNumber(plotY)) {
            return [
                plotX + (chartCoordinates ? chart.plotLeft : 0),
                plotY + (chartCoordinates ? chart.plotTop : 0)
            ];
        }
        return proceed.call(this, chartCoordinates, plotY);
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * Extensions for polar charts. Additionally, much of the geometry required
 * for polar charts is gathered in RadialAxes.js.
 * @private
 */
class PolarAdditions {
    /* *
     *
     *  Static Functions
     *
     * */
    static compose(AxisClass, ChartClass, PointerClass, SeriesClass, TickClass, PointClass, AreaSplineRangeSeriesClass, ColumnSeriesClass, LineSeriesClass, SplineSeriesClass) {
        Pane_Pane.compose(ChartClass, PointerClass);
        Axis_RadialAxis.compose(AxisClass, TickClass);
        if (PolarComposition_pushUnique(PolarComposition_composed, 'Polar')) {
            const chartProto = ChartClass.prototype, pointProto = PointClass.prototype, pointerProto = PointerClass.prototype, seriesProto = SeriesClass.prototype;
            PolarComposition_addEvent(ChartClass, 'afterDrawChartBox', onChartAfterDrawChartBox);
            PolarComposition_addEvent(ChartClass, 'createAxes', onChartCreateAxes);
            PolarComposition_addEvent(ChartClass, 'init', onChartAfterInit);
            PolarComposition_wrap(chartProto, 'get', wrapChartGet);
            PolarComposition_wrap(pointerProto, 'getCoordinates', wrapPointerGetCoordinates);
            PolarComposition_wrap(pointerProto, 'pinch', wrapPointerPinch);
            PolarComposition_addEvent(PointerClass, 'getSelectionMarkerAttrs', onPointerGetSelectionMarkerAttrs);
            PolarComposition_addEvent(PointerClass, 'getSelectionBox', onPointerGetSelectionBox);
            PolarComposition_addEvent(SeriesClass, 'afterInit', onSeriesAfterInit);
            PolarComposition_addEvent(SeriesClass, 'afterTranslate', onSeriesAfterTranslate, { order: 2 } // Run after translation of ||-coords
            );
            PolarComposition_addEvent(SeriesClass, 'afterColumnTranslate', onAfterColumnTranslate, { order: 4 });
            PolarComposition_wrap(seriesProto, 'animate', wrapSeriesAnimate);
            PolarComposition_wrap(pointProto, 'pos', wrapPointPos);
            if (ColumnSeriesClass) {
                const columnProto = ColumnSeriesClass.prototype;
                PolarComposition_wrap(columnProto, 'alignDataLabel', wrapColumnSeriesAlignDataLabel);
                PolarComposition_wrap(columnProto, 'animate', wrapSeriesAnimate);
            }
            if (LineSeriesClass) {
                const lineProto = LineSeriesClass.prototype;
                PolarComposition_wrap(lineProto, 'getGraphPath', wrapLineSeriesGetGraphPath);
            }
            if (SplineSeriesClass) {
                const splineProto = SplineSeriesClass.prototype;
                PolarComposition_wrap(splineProto, 'getPointSpline', wrapSplineSeriesGetPointSpline);
                if (AreaSplineRangeSeriesClass) {
                    const areaSplineRangeProto = AreaSplineRangeSeriesClass.prototype;
                    // #6430 Areasplinerange series use unwrapped getPointSpline
                    // method, so we need to set this method again.
                    areaSplineRangeProto.getPointSpline =
                        splineProto.getPointSpline;
                }
            }
        }
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(series) {
        this.series = series;
    }
    /* *
     *
     *  Functions
     *
     * */
    arc(low, high, start, end) {
        const series = this.series, center = series.xAxis.center, len = series.yAxis.len, paneInnerR = center[3] / 2;
        let r = len - high + paneInnerR, innerR = len - PolarComposition_pick(low, len) + paneInnerR;
        // Prevent columns from shooting through the pane's center
        if (series.yAxis.reversed) {
            if (r < 0) {
                r = paneInnerR;
            }
            if (innerR < 0) {
                innerR = paneInnerR;
            }
        }
        // Return a new shapeArgs
        return {
            x: center[0],
            y: center[1],
            r: r,
            innerR: innerR,
            start: start,
            end: end
        };
    }
    /**
     * Translate a point's plotX and plotY from the internal angle and radius
     * measures to true plotX, plotY coordinates
     * @private
     */
    toXY(point) {
        const series = this.series, chart = series.chart, xAxis = series.xAxis, yAxis = series.yAxis, plotX = point.plotX, inverted = chart.inverted, pointY = point.y;
        let plotY = point.plotY, radius = inverted ? plotX : yAxis.len - plotY, clientX;
        // Corrected y position of inverted series other than column
        if (inverted && series && !series.isRadialBar) {
            point.plotY = plotY =
                PolarComposition_isNumber(pointY) ? yAxis.translate(pointY) : 0;
        }
        // Save rectangular plotX, plotY for later computation
        point.rectPlotX = plotX;
        point.rectPlotY = plotY;
        if (yAxis.center) {
            radius += yAxis.center[3] / 2;
        }
        // Find the polar plotX and plotY. Avoid setting plotX and plotY to NaN
        // when plotY is undefined (#15438)
        if (PolarComposition_isNumber(plotY)) {
            const xy = inverted ? yAxis.postTranslate(plotY, radius) :
                xAxis.postTranslate(plotX, radius);
            point.plotX = point.polarPlotX = xy.x - chart.plotLeft;
            point.plotY = point.polarPlotY = xy.y - chart.plotTop;
        }
        // If shared tooltip, record the angle in degrees in order to align X
        // points. Otherwise, use a standard k-d tree to get the nearest point
        // in two dimensions.
        if (series.kdByAngle) {
            clientX = ((plotX / Math.PI * 180) + xAxis.pane.options.startAngle) % 360;
            if (clientX < 0) { // #2665
                clientX += 360;
            }
            point.clientX = clientX;
        }
        else {
            point.clientX = point.plotX;
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const PolarComposition = (PolarAdditions);

;// external ["./highcharts.src.js","default","StackItem"]
const external_highcharts_src_js_default_StackItem_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_c57973fa__["default"].StackItem;
var external_highcharts_src_js_default_StackItem_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_StackItem_namespaceObject);
;// ./code/es-modules/Core/Axis/WaterfallAxis.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { composed: WaterfallAxis_composed } = (external_highcharts_src_js_default_default());


const { addEvent: WaterfallAxis_addEvent, objectEach: WaterfallAxis_objectEach, pushUnique: WaterfallAxis_pushUnique } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Namespace
 *
 * */
var WaterfallAxis;
(function (WaterfallAxis) {
    /* *
     *
     *  Interfaces
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    function compose(AxisClass, ChartClass) {
        if (WaterfallAxis_pushUnique(WaterfallAxis_composed, 'Axis.Waterfall')) {
            WaterfallAxis_addEvent(AxisClass, 'init', onAxisInit);
            WaterfallAxis_addEvent(AxisClass, 'afterBuildStacks', onAxisAfterBuildStacks);
            WaterfallAxis_addEvent(AxisClass, 'afterRender', onAxisAfterRender);
            WaterfallAxis_addEvent(ChartClass, 'beforeRedraw', onChartBeforeRedraw);
        }
    }
    WaterfallAxis.compose = compose;
    /**
     * @private
     */
    function onAxisAfterBuildStacks() {
        const axis = this, stacks = axis.waterfall?.stacks;
        if (stacks) {
            stacks.changed = false;
            delete stacks.alreadyChanged;
        }
    }
    /**
     * @private
     */
    function onAxisAfterRender() {
        const axis = this, stackLabelOptions = axis.options.stackLabels;
        if (stackLabelOptions?.enabled &&
            axis.waterfall?.stacks) {
            axis.waterfall.renderStackTotals();
        }
    }
    /**
     * @private
     */
    function onAxisInit() {
        const axis = this;
        if (!axis.waterfall) {
            axis.waterfall = new Composition(axis);
        }
    }
    /**
     * @private
     */
    function onChartBeforeRedraw() {
        const axes = this.axes, series = this.series;
        for (const serie of series) {
            if (serie.options.stacking) {
                for (const axis of axes) {
                    if (!axis.isXAxis && axis.waterfall) {
                        axis.waterfall.stacks.changed = true;
                    }
                }
                break;
            }
        }
    }
    /* *
     *
     *  Classes
     *
     * */
    class Composition {
        /* *
         *
         *  Constructors
         *
         * */
        constructor(axis) {
            this.axis = axis;
            this.stacks = {
                changed: false
            };
        }
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Calls StackItem.prototype.render function that creates and renders
         * stack total label for each waterfall stack item.
         *
         * @private
         * @function Highcharts.Axis#renderWaterfallStackTotals
         */
        renderStackTotals() {
            const yAxis = this.axis, waterfallStacks = yAxis.waterfall?.stacks, stackTotalGroup = yAxis.stacking?.stackTotalGroup, dummyStackItem = new (external_highcharts_src_js_default_StackItem_default())(yAxis, yAxis.options.stackLabels || {}, false, 0, void 0);
            this.dummyStackItem = dummyStackItem;
            // Render each waterfall stack total
            if (stackTotalGroup) {
                WaterfallAxis_objectEach(waterfallStacks, (type) => {
                    WaterfallAxis_objectEach(type, (stackItem, key) => {
                        dummyStackItem.total = stackItem.stackTotal;
                        dummyStackItem.x = +key;
                        if (stackItem.label) {
                            dummyStackItem.label = stackItem.label;
                        }
                        external_highcharts_src_js_default_StackItem_default().prototype.render.call(dummyStackItem, stackTotalGroup);
                        stackItem.label = dummyStackItem.label;
                        delete dummyStackItem.label;
                    });
                });
            }
            dummyStackItem.total = null;
        }
    }
    WaterfallAxis.Composition = Composition;
})(WaterfallAxis || (WaterfallAxis = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Axis_WaterfallAxis = (WaterfallAxis);

;// ./code/es-modules/Series/Waterfall/WaterfallPoint.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */



const { isNumber: WaterfallPoint_isNumber } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
class WaterfallPoint extends (external_highcharts_src_js_default_Series_types_column_default()).prototype.pointClass {
    /* *
     *
     *  Functions
     *
     * */
    getClassName() {
        let className = external_highcharts_src_js_default_Point_default().prototype.getClassName.call(this);
        if (this.isSum) {
            className += ' highcharts-sum';
        }
        else if (this.isIntermediateSum) {
            className += ' highcharts-intermediate-sum';
        }
        return className;
    }
    // Pass the null test in ColumnSeries.translate.
    isValid() {
        return (WaterfallPoint_isNumber(this.y) ||
            this.isSum ||
            Boolean(this.isIntermediateSum));
    }
}
/* *
 *
 *  Export
 *
 * */
/* harmony default export */ const Waterfall_WaterfallPoint = (WaterfallPoint);

;// ./code/es-modules/Series/Waterfall/WaterfallSeriesDefaults.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  API Options
 *
 * */
/**
 * A waterfall chart displays sequentially introduced positive or negative
 * values in cumulative columns.
 *
 * @sample highcharts/demo/waterfall/
 *         Waterfall chart
 * @sample highcharts/plotoptions/waterfall-inverted/
 *         Horizontal (inverted) waterfall
 * @sample highcharts/plotoptions/waterfall-stacked/
 *         Stacked waterfall chart
 *
 * @extends      plotOptions.column
 * @excluding    boostThreshold, boostBlending
 * @product      highcharts
 * @requires     highcharts-more
 * @optionparent plotOptions.waterfall
 */
const WaterfallSeriesDefaults = {
    /**
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @apioption plotOptions.waterfall.color
     */
    /**
     * The color used specifically for positive point columns. When not
     * specified, the general series color is used.
     *
     * In styled mode, the waterfall colors can be set with the
     * `.highcharts-point-negative`, `.highcharts-sum` and
     * `.highcharts-intermediate-sum` classes.
     *
     * @sample {highcharts} highcharts/demo/waterfall/
     *         Waterfall
     *
     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @product   highcharts
     * @apioption plotOptions.waterfall.upColor
     */
    dataLabels: {
        inside: true
    },
    /**
     * The width of the line connecting waterfall columns.
     *
     * @product highcharts
     */
    lineWidth: 1,
    /**
     * The color of the line that connects columns in a waterfall series.
     *
     * In styled mode, the stroke can be set with the `.highcharts-graph`
     * class.
     *
     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since   3.0
     * @product highcharts
     */
    lineColor: "#333333" /* Palette.neutralColor80 */,
    /**
     * A name for the dash style to use for the line connecting the columns
     * of the waterfall series. Possible values: Dash, DashDot, Dot,
     * LongDash, LongDashDot, LongDashDotDot, ShortDash, ShortDashDot,
     * ShortDashDotDot, ShortDot, Solid
     *
     * In styled mode, the stroke dash-array can be set with the
     * `.highcharts-graph` class.
     *
     * @type    {Highcharts.DashStyleValue}
     * @since   3.0
     * @product highcharts
     */
    dashStyle: 'Dot',
    /**
     * The color of the border of each waterfall column.
     *
     * In styled mode, the border stroke can be set with the
     * `.highcharts-point` class.
     *
     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since   3.0
     * @product highcharts
     */
    borderColor: "#333333" /* Palette.neutralColor80 */,
    states: {
        hover: {
            lineWidthPlus: 0 // #3126
        }
    }
};
/**
 * A `waterfall` series. If the [type](#series.waterfall.type) option
 * is not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.waterfall
 * @excluding dataParser, dataURL, boostThreshold, boostBlending
 * @product   highcharts
 * @requires  highcharts-more
 * @apioption series.waterfall
 */
/**
 * An array of data points for the series. For the `waterfall` series
 * type, points can be given in the following ways:
 *
 * 1. An array of numerical values. In this case, the numerical values will be
 *    interpreted as `y` options. The `x` values will be automatically
 *    calculated, either starting at 0 and incremented by 1, or from
 *    `pointStart` and `pointInterval` given in the series options. If the axis
 *    has categories, these will be used. Example:
 *    ```js
 *    data: [0, 5, 3, 5]
 *    ```
 *
 * 2. An array of arrays with 2 values. In this case, the values correspond to
 *    `x,y`. If the first value is a string, it is applied as the name of the
 *    point, and the `x` value is inferred.
 *    ```js
 *    data: [
 *        [0, 7],
 *        [1, 8],
 *        [2, 3]
 *    ]
 *    ```
 *
 * 3. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.waterfall.turboThreshold), this option is not
 *    available.
 *    ```js
 *    data: [{
 *        x: 1,
 *        y: 8,
 *        name: "Point2",
 *        color: "#00FF00"
 *    }, {
 *        x: 1,
 *        y: 8,
 *        name: "Point1",
 *        color: "#FF00FF"
 *    }]
 *    ```
 *
 * @sample {highcharts} highcharts/chart/reflow-true/
 *         Numerical values
 * @sample {highcharts} highcharts/series/data-array-of-arrays/
 *         Arrays of numeric x and y
 * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
 *         Arrays of datetime x and y
 * @sample {highcharts} highcharts/series/data-array-of-name-value/
 *         Arrays of point.name and y
 * @sample {highcharts} highcharts/series/data-array-of-objects/
 *         Config objects
 *
 * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
 * @extends   series.line.data
 * @excluding marker
 * @product   highcharts
 * @apioption series.waterfall.data
 */
/**
 * When this property is true, the points acts as a summary column for
 * the values added or subtracted since the last intermediate sum,
 * or since the start of the series. The `y` value is ignored.
 *
 * @sample {highcharts} highcharts/demo/waterfall/
 *         Waterfall
 *
 * @type      {boolean}
 * @default   false
 * @product   highcharts
 * @apioption series.waterfall.data.isIntermediateSum
 */
/**
 * When this property is true, the point display the total sum across
 * the entire series. The `y` value is ignored.
 *
 * @sample {highcharts} highcharts/demo/waterfall/
 *         Waterfall
 *
 * @type      {boolean}
 * @default   false
 * @product   highcharts
 * @apioption series.waterfall.data.isSum
 */
''; // Adds doclets above to transpiled file
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const Waterfall_WaterfallSeriesDefaults = (WaterfallSeriesDefaults);

;// ./code/es-modules/Series/Waterfall/WaterfallSeries.js
/* *
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */


const { column: WaterfallSeries_ColumnSeries, line: WaterfallSeries_LineSeries } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { addEvent: WaterfallSeries_addEvent, arrayMax: WaterfallSeries_arrayMax, arrayMin: WaterfallSeries_arrayMin, correctFloat: WaterfallSeries_correctFloat, crisp: WaterfallSeries_crisp, extend: WaterfallSeries_extend, isNumber: WaterfallSeries_isNumber, merge: WaterfallSeries_merge, objectEach: WaterfallSeries_objectEach, pick: WaterfallSeries_pick } = (external_highcharts_src_js_default_default());



/* *
 *
 *  Functions
 *
 * */
/**
 * Returns true if the key is a direct property of the object.
 * @private
 * @param {*} obj
 * Object with property to test
 * @param {string} key
 * Property key to test
 * @return {boolean}
 * Whether it is a direct property
 */
function ownProp(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
}
/* *
 *
 *  Class
 *
 * */
/**
 * Waterfall series type.
 *
 * @private
 */
class WaterfallSeries extends WaterfallSeries_ColumnSeries {
    /* *
     *
     *  Functions
     *
     * */
    // After generating points, set y-values for all sums.
    generatePoints() {
        // Parent call:
        WaterfallSeries_ColumnSeries.prototype.generatePoints.apply(this);
        const processedYData = this.getColumn('y', true);
        for (let i = 0, len = this.points.length; i < len; i++) {
            const point = this.points[i], y = processedYData[i];
            // Override point value for sums. #3710 Update point does not
            // propagate to sum
            if (WaterfallSeries_isNumber(y) && (point.isIntermediateSum || point.isSum)) {
                point.y = WaterfallSeries_correctFloat(y);
            }
        }
    }
    // Call default processData then override yData to reflect waterfall's
    // extremes on yAxis
    processData(force) {
        const series = this, options = series.options, yData = series.getColumn('y'), 
        // #3710 Update point does not propagate to sum
        points = options.data, dataLength = yData.length, threshold = options.threshold || 0;
        let point, subSum, sum, dataMin, dataMax, y;
        sum = subSum = dataMin = dataMax = 0;
        for (let i = 0; i < dataLength; i++) {
            y = yData[i];
            point = points?.[i] || {};
            if (y === 'sum' || point.isSum) {
                yData[i] = WaterfallSeries_correctFloat(sum);
            }
            else if (y === 'intermediateSum' ||
                point.isIntermediateSum) {
                yData[i] = WaterfallSeries_correctFloat(subSum);
                subSum = 0;
            }
            else {
                sum += y;
                subSum += y;
            }
            dataMin = Math.min(sum, dataMin);
            dataMax = Math.max(sum, dataMax);
        }
        super.processData.call(this, force);
        // Record extremes only if stacking was not set:
        if (!options.stacking) {
            series.dataMin = dataMin + threshold;
            series.dataMax = dataMax;
        }
        return;
    }
    // Return y value or string if point is sum
    toYData(pt) {
        if (pt.isSum) {
            return 'sum';
        }
        if (pt.isIntermediateSum) {
            return 'intermediateSum';
        }
        return pt.y;
    }
    // Postprocess mapping between options and SVG attributes
    pointAttribs(point, state) {
        const upColor = this.options.upColor;
        // Set or reset up color (#3710, update to negative)
        if (upColor && !point.options.color && WaterfallSeries_isNumber(point.y)) {
            point.color = point.y > 0 ? upColor : void 0;
        }
        const attr = WaterfallSeries_ColumnSeries.prototype.pointAttribs.call(this, point, state);
        // The dashStyle option in waterfall applies to the graph, not
        // the points
        delete attr.dashstyle;
        return attr;
    }
    // Return an empty path initially, because we need to know the stroke-width
    // in order to set the final path.
    getGraphPath() {
        return [['M', 0, 0]];
    }
    // Draw columns' connector lines
    getCrispPath() {
        const // Skip points where Y is not a number (#18636)
        data = this.data.filter((d) => WaterfallSeries_isNumber(d.y)), yAxis = this.yAxis, length = data.length, graphLineWidth = this.graph?.strokeWidth() || 0, reversedXAxis = this.xAxis.reversed, reversedYAxis = this.yAxis.reversed, stacking = this.options.stacking, path = [];
        for (let i = 1; i < length; i++) {
            if (!( // Skip lines that would pass over the null point (#18636)
            this.options.connectNulls ||
                WaterfallSeries_isNumber(this.data[data[i].index - 1].y))) {
                continue;
            }
            const box = data[i].box, prevPoint = data[i - 1], prevY = prevPoint.y || 0, prevBox = data[i - 1].box;
            if (!box || !prevBox) {
                continue;
            }
            const prevStack = yAxis.waterfall?.stacks[this.stackKey], isPos = prevY > 0 ? -prevBox.height : 0;
            if (prevStack && prevBox && box) {
                const prevStackX = prevStack[i - 1];
                // Y position of the connector is different when series are
                // stacked, yAxis is reversed and it also depends on point's
                // value
                let yPos;
                if (stacking) {
                    const connectorThreshold = prevStackX.connectorThreshold;
                    yPos = WaterfallSeries_crisp(yAxis.translate(connectorThreshold, false, true, false, true) +
                        (reversedYAxis ? isPos : 0), graphLineWidth);
                }
                else {
                    yPos = WaterfallSeries_crisp(prevBox.y + (prevPoint.minPointLengthOffset || 0), graphLineWidth);
                }
                path.push([
                    'M',
                    (prevBox.x || 0) + (reversedXAxis ?
                        0 :
                        (prevBox.width || 0)),
                    yPos
                ], [
                    'L',
                    (box.x || 0) + (reversedXAxis ?
                        (box.width || 0) :
                        0),
                    yPos
                ]);
            }
            if (prevBox &&
                path.length &&
                ((!stacking && prevY < 0 && !reversedYAxis) ||
                    (prevY > 0 && reversedYAxis))) {
                const nextLast = path[path.length - 2];
                if (nextLast && typeof nextLast[2] === 'number') {
                    nextLast[2] += prevBox.height || 0;
                }
                const last = path[path.length - 1];
                if (last && typeof last[2] === 'number') {
                    last[2] += prevBox.height || 0;
                }
            }
        }
        return path;
    }
    // The graph is initially drawn with an empty definition, then updated with
    // crisp rendering.
    drawGraph() {
        WaterfallSeries_LineSeries.prototype.drawGraph.call(this);
        if (this.graph) {
            this.graph.attr({
                d: this.getCrispPath()
            });
        }
    }
    // Waterfall has stacking along the x-values too.
    setStackedPoints(axis) {
        const series = this, options = series.options, waterfallStacks = axis.waterfall?.stacks, seriesThreshold = options.threshold || 0, stackKey = series.stackKey, xData = series.getColumn('x'), yData = series.getColumn('y'), xLength = xData.length;
        let stackThreshold = seriesThreshold, interSum = stackThreshold, actualStackX, totalYVal = 0, actualSum = 0, prevSum = 0, statesLen, posTotal, negTotal, xPoint, yVal, x, alreadyChanged, changed;
        // Function responsible for calculating correct values for stackState
        // array of each stack item. The arguments are: firstS - the value for
        // the first state, nextS - the difference between the previous and the
        // newest state, sInx - counter used in the for that updates each state
        // when necessary, sOff - offset that must be added to each state when
        // they need to be updated (if point isn't a total sum)
        // eslint-disable-next-line require-jsdoc
        const calculateStackState = (firstS, nextS, sInx, sOff) => {
            if (actualStackX) {
                if (!statesLen) {
                    actualStackX.stackState[0] = firstS;
                    statesLen = actualStackX.stackState.length;
                }
                else {
                    for (sInx; sInx < statesLen; sInx++) {
                        actualStackX.stackState[sInx] += sOff;
                    }
                }
                actualStackX.stackState.push(actualStackX.stackState[statesLen - 1] + nextS);
            }
        };
        if (axis.stacking && waterfallStacks) {
            // Code responsible for creating stacks for waterfall series
            if (series.reserveSpace()) {
                changed = waterfallStacks.changed;
                alreadyChanged = waterfallStacks.alreadyChanged;
                // In case of a redraw, stack for each x value must be emptied
                // (only for the first series in a specific stack) and
                // recalculated once more
                if (alreadyChanged &&
                    alreadyChanged.indexOf(stackKey) < 0) {
                    changed = true;
                }
                if (!waterfallStacks[stackKey]) {
                    waterfallStacks[stackKey] = {};
                }
                const actualStack = waterfallStacks[stackKey];
                if (actualStack) {
                    for (let i = 0; i < xLength; i++) {
                        x = xData[i];
                        if (!actualStack[x] || changed) {
                            actualStack[x] = {
                                negTotal: 0,
                                posTotal: 0,
                                stackTotal: 0,
                                threshold: 0,
                                stateIndex: 0,
                                stackState: [],
                                label: ((changed &&
                                    actualStack[x]) ?
                                    actualStack[x].label :
                                    void 0)
                            };
                        }
                        actualStackX = actualStack[x];
                        yVal = yData[i];
                        if (yVal >= 0) {
                            actualStackX.posTotal += yVal;
                        }
                        else {
                            actualStackX.negTotal += yVal;
                        }
                        // Points do not exist yet, so raw data is used
                        xPoint = options.data[i];
                        posTotal = actualStackX.absolutePos =
                            actualStackX.posTotal;
                        negTotal = actualStackX.absoluteNeg =
                            actualStackX.negTotal;
                        actualStackX.stackTotal = posTotal + negTotal;
                        statesLen = actualStackX.stackState.length;
                        if (xPoint?.isIntermediateSum) {
                            calculateStackState(prevSum, actualSum, 0, prevSum);
                            prevSum = actualSum;
                            actualSum = seriesThreshold;
                            // Swapping values
                            stackThreshold ^= interSum;
                            interSum ^= stackThreshold;
                            stackThreshold ^= interSum;
                        }
                        else if (xPoint?.isSum) {
                            calculateStackState(seriesThreshold, totalYVal, statesLen, 0);
                            stackThreshold = seriesThreshold;
                        }
                        else {
                            calculateStackState(stackThreshold, yVal, 0, totalYVal);
                            if (xPoint) {
                                totalYVal += yVal;
                                actualSum += yVal;
                            }
                        }
                        actualStackX.stateIndex++;
                        actualStackX.threshold = stackThreshold;
                        stackThreshold += actualStackX.stackTotal;
                    }
                }
                waterfallStacks.changed = false;
                if (!waterfallStacks.alreadyChanged) {
                    waterfallStacks.alreadyChanged = [];
                }
                waterfallStacks.alreadyChanged.push(stackKey);
            }
        }
    }
    // Extremes for a non-stacked series are recorded in processData.
    // In case of stacking, use Series.stackedYData to calculate extremes.
    getExtremes() {
        const stacking = this.options.stacking, yAxis = this.yAxis, waterfallStacks = yAxis.waterfall?.stacks;
        let stackedYNeg, stackedYPos;
        if (stacking && waterfallStacks) {
            stackedYNeg = this.stackedYNeg = [];
            stackedYPos = this.stackedYPos = [];
            // The visible y range can be different when stacking is set to
            // overlap and different when it's set to normal
            if (stacking === 'overlap') {
                WaterfallSeries_objectEach(waterfallStacks[this.stackKey], function (stackX) {
                    stackedYNeg.push(WaterfallSeries_arrayMin(stackX.stackState));
                    stackedYPos.push(WaterfallSeries_arrayMax(stackX.stackState));
                });
            }
            else {
                WaterfallSeries_objectEach(waterfallStacks[this.stackKey], function (stackX) {
                    stackedYNeg.push(stackX.negTotal + stackX.threshold);
                    stackedYPos.push(stackX.posTotal + stackX.threshold);
                });
            }
            return {
                dataMin: WaterfallSeries_arrayMin(stackedYNeg),
                dataMax: WaterfallSeries_arrayMax(stackedYPos)
            };
        }
        // When not stacking, data extremes have already been computed in the
        // processData function.
        return {
            dataMin: this.dataMin,
            dataMax: this.dataMax
        };
    }
}
/* *
 *
 *  Static Properties
 *
 * */
WaterfallSeries.defaultOptions = WaterfallSeries_merge(WaterfallSeries_ColumnSeries.defaultOptions, Waterfall_WaterfallSeriesDefaults);
WaterfallSeries.compose = Axis_WaterfallAxis.compose;
WaterfallSeries_extend(WaterfallSeries.prototype, {
    pointValKey: 'y',
    // Property needed to prevent lines between the columns from disappearing
    // when negativeColor is used.
    showLine: true,
    pointClass: Waterfall_WaterfallPoint
});
// Translate data points from raw values
WaterfallSeries_addEvent(WaterfallSeries, 'afterColumnTranslate', function () {
    const series = this, { options, points, yAxis } = series, minPointLength = WaterfallSeries_pick(options.minPointLength, 5), halfMinPointLength = minPointLength / 2, threshold = options.threshold || 0, stacking = options.stacking, actualStack = yAxis.waterfall?.stacks[series.stackKey], processedYData = series.getColumn('y', true);
    let previousIntermediate = threshold, previousY = threshold, y, total, yPos, hPos;
    for (let i = 0; i < points.length; i++) {
        const point = points[i], yValue = processedYData[i], shapeArgs = point.shapeArgs, box = WaterfallSeries_extend({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }, shapeArgs || {});
        point.box = box;
        const range = [0, yValue], pointY = point.y || 0;
        // Code responsible for correct positions of stacked points
        // starts here
        if (stacking) {
            if (actualStack) {
                const actualStackX = actualStack[i];
                if (stacking === 'overlap') {
                    total =
                        actualStackX.stackState[actualStackX.stateIndex--];
                    y = pointY >= 0 ? total : total - pointY;
                    if (ownProp(actualStackX, 'absolutePos')) {
                        delete actualStackX.absolutePos;
                    }
                    if (ownProp(actualStackX, 'absoluteNeg')) {
                        delete actualStackX.absoluteNeg;
                    }
                }
                else {
                    if (pointY >= 0) {
                        total = actualStackX.threshold +
                            actualStackX.posTotal;
                        actualStackX.posTotal -= pointY;
                        y = total;
                    }
                    else {
                        total = actualStackX.threshold +
                            actualStackX.negTotal;
                        actualStackX.negTotal -= pointY;
                        y = total - pointY;
                    }
                    if (!actualStackX.posTotal) {
                        if (WaterfallSeries_isNumber(actualStackX.absolutePos) &&
                            ownProp(actualStackX, 'absolutePos')) {
                            actualStackX.posTotal =
                                actualStackX.absolutePos;
                            delete actualStackX.absolutePos;
                        }
                    }
                    if (!actualStackX.negTotal) {
                        if (WaterfallSeries_isNumber(actualStackX.absoluteNeg) &&
                            ownProp(actualStackX, 'absoluteNeg')) {
                            actualStackX.negTotal =
                                actualStackX.absoluteNeg;
                            delete actualStackX.absoluteNeg;
                        }
                    }
                }
                if (!point.isSum) {
                    // The connectorThreshold property is later used in
                    // getCrispPath function to draw a connector line in a
                    // correct place
                    actualStackX.connectorThreshold =
                        actualStackX.threshold + actualStackX.stackTotal;
                }
                if (yAxis.reversed) {
                    yPos = (pointY >= 0) ? (y - pointY) : (y + pointY);
                    hPos = y;
                }
                else {
                    yPos = y;
                    hPos = y - pointY;
                }
                point.below = yPos <= threshold;
                box.y = yAxis.translate(yPos, false, true, false, true);
                box.height = Math.abs(box.y -
                    yAxis.translate(hPos, false, true, false, true));
                const dummyStackItem = yAxis.waterfall?.dummyStackItem;
                if (dummyStackItem) {
                    dummyStackItem.x = i;
                    dummyStackItem.label = actualStack[i].label;
                    dummyStackItem.setOffset(series.pointXOffset || 0, series.barW || 0, series.stackedYNeg[i], series.stackedYPos[i], void 0, this.xAxis);
                }
            }
        }
        else {
            // Up points
            y = Math.max(previousY, previousY + pointY) + range[0];
            box.y = yAxis.translate(y, false, true, false, true);
            // Sum points
            if (point.isSum) {
                box.y = yAxis.translate(range[1], false, true, false, true);
                box.height = Math.min(yAxis.translate(range[0], false, true, false, true), yAxis.len) - box.y; // #4256
                point.below = range[1] <= threshold;
            }
            else if (point.isIntermediateSum) {
                if (pointY >= 0) {
                    yPos = range[1] + previousIntermediate;
                    hPos = previousIntermediate;
                }
                else {
                    yPos = previousIntermediate;
                    hPos = range[1] + previousIntermediate;
                }
                if (yAxis.reversed) {
                    // Swapping values
                    yPos ^= hPos;
                    hPos ^= yPos;
                    yPos ^= hPos;
                }
                box.y = yAxis.translate(yPos, false, true, false, true);
                box.height = Math.abs(box.y -
                    Math.min(yAxis.translate(hPos, false, true, false, true), yAxis.len));
                previousIntermediate += range[1];
                point.below = yPos <= threshold;
                // If it's not the sum point, update previous stack end position
                // and get shape height (#3886)
            }
            else {
                box.height = yValue > 0 ?
                    yAxis.translate(previousY, false, true, false, true) - box.y :
                    yAxis.translate(previousY, false, true, false, true) - yAxis.translate(previousY - yValue, false, true, false, true);
                previousY += yValue;
                point.below = previousY < threshold;
            }
            // #3952 Negative sum or intermediate sum not rendered correctly
            if (box.height < 0) {
                box.y += box.height;
                box.height *= -1;
            }
        }
        point.plotY = box.y;
        point.yBottom = box.y + box.height;
        if (box.height <= minPointLength && !point.isNull) {
            box.height = minPointLength;
            box.y -= halfMinPointLength;
            point.yBottom = box.y + box.height;
            point.plotY = box.y;
            if (pointY < 0) {
                point.minPointLengthOffset = -halfMinPointLength;
            }
            else {
                point.minPointLengthOffset = halfMinPointLength;
            }
        }
        else {
            // #8024, empty gaps in the line for null data
            if (point.isNull) {
                box.width = 0;
            }
            point.minPointLengthOffset = 0;
        }
        // Correct tooltip placement (#3014)
        const tooltipY = point.plotY + (point.negative ? box.height : 0);
        if (point.below) { // #15334
            point.plotY += box.height;
        }
        if (point.tooltipPos) {
            if (series.chart.inverted) {
                point.tooltipPos[0] = yAxis.len - tooltipY;
            }
            else {
                point.tooltipPos[1] = tooltipY;
            }
        }
        // Check point position after recalculation (#16788)
        point.isInside = this.isPointInside(point);
        // Crisp vector coordinates
        const crispBottom = WaterfallSeries_crisp(point.yBottom, series.borderWidth);
        box.y = WaterfallSeries_crisp(box.y, series.borderWidth);
        box.height = crispBottom - box.y;
        WaterfallSeries_merge(true, point.shapeArgs, box);
    }
}, { order: 2 });
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('waterfall', WaterfallSeries);
/* *
 *
 * Export
 *
 * */
/* harmony default export */ const Waterfall_WaterfallSeries = (WaterfallSeries);

;// ./code/es-modules/masters/highcharts-more.src.js


















const G = (external_highcharts_src_js_default_default());
G.RadialAxis = Axis_RadialAxis;
Bubble_BubbleSeries.compose(G.Axis, G.Chart, G.Legend);
PackedBubble_PackedBubbleSeries.compose(G.Axis, G.Chart, G.Legend);
Pane_Pane.compose(G.Chart, G.Pointer);
PolarComposition.compose(G.Axis, G.Chart, G.Pointer, G.Series, G.Tick, G.Point, (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes.areasplinerange, (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes.column, (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes.line, (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes.spline);
Waterfall_WaterfallSeries.compose(G.Axis, G.Chart);
/* harmony default export */ const highcharts_more_src = (G);

export { highcharts_more_src as default };
