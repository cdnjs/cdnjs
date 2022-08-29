/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import BubbleLegendComposition from './BubbleLegendComposition.js';
import BubblePoint from './BubblePoint.js';
import Color from '../../Core/Color/Color.js';
var color = Color.parse;
import H from '../../Core/Globals.js';
var noop = H.noop;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var Series = SeriesRegistry.series, _a = SeriesRegistry.seriesTypes, columnProto = _a.column.prototype, ScatterSeries = _a.scatter;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, arrayMax = U.arrayMax, arrayMin = U.arrayMin, clamp = U.clamp, extend = U.extend, isNumber = U.isNumber, merge = U.merge, pick = U.pick;
/* *
 *
 *  Constants
 *
 * */
var composedClasses = [];
/* *
 *
 *  Functions
 *
 * */
/**
 * Add logic to pad each axis with the amount of pixels necessary to avoid the
 * bubbles to overflow.
 */
function axisBeforePadding() {
    var _this = this;
    var axisLength = this.len, chart = this.chart, isXAxis = this.isXAxis, dataKey = isXAxis ? 'xData' : 'yData', min = this.min, range = this.max - min;
    var pxMin = 0, pxMax = axisLength, transA = axisLength / range, hasActiveSeries;
    // Handle padding on the second pass, or on redraw
    this.series.forEach(function (series) {
        if (series.bubblePadding &&
            (series.visible || !chart.options.chart.ignoreHiddenSeries)) {
            // Correction for #1673
            _this.allowZoomOutside = true;
            hasActiveSeries = true;
            var data = series[dataKey];
            if (isXAxis) {
                (series.onPoint || series).getRadii(0, 0, series);
                if (series.onPoint) {
                    series.radii = series.onPoint.radii;
                }
            }
            if (range > 0) {
                var i = data.length;
                while (i--) {
                    if (isNumber(data[i]) &&
                        _this.dataMin <= data[i] &&
                        data[i] <= _this.max) {
                        var radius = series.radii && series.radii[i] || 0;
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
        ].forEach(function (keys) {
            if (typeof pick(_this.options[keys[0]], _this[keys[1]]) === 'undefined') {
                _this[keys[0]] += keys[2] / transA;
            }
        });
    }
}
/* *
 *
 *  Class
 *
 * */
var BubbleSeries = /** @class */ (function (_super) {
    __extends(BubbleSeries, _super);
    function BubbleSeries() {
        /* *
         *
         *  Static Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* *
         *
         *  Properties
         *
         * */
        _this.data = void 0;
        _this.maxPxSize = void 0;
        _this.minPxSize = void 0;
        _this.options = void 0;
        _this.points = void 0;
        _this.radii = void 0;
        _this.yData = void 0;
        _this.zData = void 0;
        return _this;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    BubbleSeries.compose = function (AxisClass, ChartClass, LegendClass, SeriesClass) {
        BubbleLegendComposition.compose(ChartClass, LegendClass, SeriesClass);
        if (composedClasses.indexOf(AxisClass) === -1) {
            composedClasses.push(AxisClass);
            AxisClass.prototype.beforePadding = axisBeforePadding;
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Perform animation on the bubbles
     * @private
     */
    BubbleSeries.prototype.animate = function (init) {
        if (!init &&
            this.points.length < this.options.animationLimit // #8099
        ) {
            this.points.forEach(function (point) {
                var graphic = point.graphic;
                if (graphic && graphic.width) { // URL symbols don't have width
                    // Start values
                    if (!this.hasRendered) {
                        graphic.attr({
                            x: point.plotX,
                            y: point.plotY,
                            width: 1,
                            height: 1
                        });
                    }
                    // Run animation
                    graphic.animate(this.markerAttribs(point), this.options.animation);
                }
            }, this);
        }
    };
    /**
     * Get the radius for each point based on the minSize, maxSize and each
     * point's Z value. This must be done prior to Series.translate because
     * the axis needs to add padding in accordance with the point sizes.
     * @private
     */
    BubbleSeries.prototype.getRadii = function () {
        var _this = this;
        var zData = this.zData, yData = this.yData, radii = [];
        var len, i, value, zExtremes = this.chart.bubbleZExtremes;
        var _a = this.getPxExtremes(), minPxSize = _a.minPxSize, maxPxSize = _a.maxPxSize;
        // Get the collective Z extremes of all bubblish series. The chart-level
        // `bubbleZExtremes` are only computed once, and reset on `updatedData`
        // in any member series.
        if (!zExtremes) {
            var zMin_1 = Number.MAX_VALUE;
            var zMax_1 = -Number.MAX_VALUE;
            var valid_1;
            this.chart.series.forEach(function (otherSeries) {
                if (otherSeries.bubblePadding && (otherSeries.visible ||
                    !_this.chart.options.chart.ignoreHiddenSeries)) {
                    var zExtremes_1 = (otherSeries.onPoint || otherSeries).getZExtremes();
                    if (zExtremes_1) {
                        zMin_1 = Math.min(zMin_1 || zExtremes_1.zMin, zExtremes_1.zMin);
                        zMax_1 = Math.max(zMax_1 || zExtremes_1.zMax, zExtremes_1.zMax);
                        valid_1 = true;
                    }
                }
            });
            if (valid_1) {
                zExtremes = { zMin: zMin_1, zMax: zMax_1 };
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
    };
    /**
     * Get the individual radius for one point.
     * @private
     */
    BubbleSeries.prototype.getRadius = function (zMin, zMax, minSize, maxSize, value, yValue) {
        var options = this.options, sizeByArea = options.sizeBy !== 'width', zThreshold = options.zThreshold;
        var zRange = zMax - zMin, pos = 0.5;
        // #8608 - bubble should be visible when z is undefined
        if (yValue === null || value === null) {
            return null;
        }
        if (isNumber(value)) {
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
    };
    /**
     * Define hasData function for non-cartesian series.
     * Returns true if the series has points at all.
     * @private
     */
    BubbleSeries.prototype.hasData = function () {
        return !!this.processedXData.length; // != 0
    };
    /**
     * @private
     */
    BubbleSeries.prototype.pointAttribs = function (point, state) {
        var markerOptions = this.options.marker, fillOpacity = markerOptions.fillOpacity, attr = Series.prototype.pointAttribs.call(this, point, state);
        if (fillOpacity !== 1) {
            attr.fill = color(attr.fill)
                .setOpacity(fillOpacity)
                .get('rgba');
        }
        return attr;
    };
    /**
     * Extend the base translate method to handle bubble size
     * @private
     */
    BubbleSeries.prototype.translate = function () {
        // Run the parent method
        _super.prototype.translate.call(this);
        this.getRadii();
        this.translateBubble();
    };
    BubbleSeries.prototype.translateBubble = function () {
        var _a = this, data = _a.data, radii = _a.radii;
        var minPxSize = this.getPxExtremes().minPxSize;
        // Set the shape type and arguments to be picked up in drawPoints
        var i = data.length;
        while (i--) {
            var point = data[i];
            var radius = radii ? radii[i] : 0; // #1737
            if (isNumber(radius) && radius >= minPxSize / 2) {
                // Shape arguments
                point.marker = extend(point.marker, {
                    radius: radius,
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
            else { // below zThreshold
                point.shapeArgs = point.dlBox = void 0; // #1691
                point.plotY = 0; // #17281
                point.marker = {
                    width: 0,
                    height: 0
                };
            }
        }
    };
    BubbleSeries.prototype.getPxExtremes = function () {
        var smallestSize = Math.min(this.chart.plotWidth, this.chart.plotHeight);
        var getPxSize = function (length) {
            var isPercent;
            if (typeof length === 'string') {
                isPercent = /%$/.test(length);
                length = parseInt(length, 10);
            }
            return isPercent ? smallestSize * length / 100 : length;
        };
        var minPxSize = getPxSize(pick(this.options.minSize, 8));
        // Prioritize min size if conflict to make sure bubbles are
        // always visible. #5873
        var maxPxSize = Math.max(getPxSize(pick(this.options.maxSize, '20%')), minPxSize);
        return { minPxSize: minPxSize, maxPxSize: maxPxSize };
    };
    BubbleSeries.prototype.getZExtremes = function () {
        var options = this.options, zData = (this.zData || []).filter(isNumber);
        if (zData.length) {
            var zMin = pick(options.zMin, clamp(arrayMin(zData), options.displayNegative === false ?
                (options.zThreshold || 0) :
                -Number.MAX_VALUE, Number.MAX_VALUE));
            var zMax = pick(options.zMax, arrayMax(zData));
            if (isNumber(zMin) && isNumber(zMax)) {
                return { zMin: zMin, zMax: zMax };
            }
        }
    };
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
    BubbleSeries.defaultOptions = merge(ScatterSeries.defaultOptions, {
        dataLabels: {
            formatter: function () {
                var numberFormatter = this.series.chart.numberFormatter;
                var z = this.point.z;
                return isNumber(z) ? numberFormatter(z, -1) : '';
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
            lineColor: null,
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
    return BubbleSeries;
}(ScatterSeries));
extend(BubbleSeries.prototype, {
    alignDataLabel: columnProto.alignDataLabel,
    applyZones: noop,
    bubblePadding: true,
    buildKDTree: noop,
    directTouch: true,
    isBubble: true,
    pointArrayMap: ['y', 'z'],
    pointClass: BubblePoint,
    parallelArrays: ['x', 'y', 'z'],
    trackerGroups: ['group', 'dataLabelsGroup'],
    specialGroup: 'group',
    zoneAxis: 'z'
});
// On updated data in any series, delete the chart-level Z extremes cache
addEvent(BubbleSeries, 'updatedData', function (e) {
    delete e.target.chart.bubbleZExtremes;
});
// After removing series, delete the chart-level Z extremes cache, #17502.
addEvent(BubbleSeries, 'remove', function (e) {
    delete e.target.chart.bubbleZExtremes;
});
SeriesRegistry.registerSeriesType('bubble', BubbleSeries);
/* *
 *
 *  Default Export
 *
 * */
export default BubbleSeries;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * @typedef {"area"|"width"} Highcharts.BubbleSizeByValue
 */
''; // detach doclets above
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
 * @excluding dataParser, dataURL, stack
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
''; // adds doclets above to transpiled file
