/* *
 *
 *  Solid angular gauge module
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
import LegendSymbol from '../../Core/Legend/LegendSymbol.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var _a = SeriesRegistry.seriesTypes, GaugeSeries = _a.gauge, pieProto = _a.pie.prototype;
import SolidGaugeAxis from '../../Core/Axis/SolidGaugeAxis.js';
import SolidGaugeSeriesDefaults from './SolidGaugeSeriesDefaults.js';
import U from '../../Core/Utilities.js';
var clamp = U.clamp, extend = U.extend, isNumber = U.isNumber, merge = U.merge, pick = U.pick, pInt = U.pInt;
import './SolidGaugeComposition.js';
/* *
 *
 *  Class
 *
 * */
/**
 * SolidGauge series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.solidgauge
 *
 * @augments Highcarts.Series
 */
var SolidGaugeSeries = /** @class */ (function (_super) {
    __extends(SolidGaugeSeries, _super);
    function SolidGaugeSeries() {
        /* *
         *
         *  Static properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* *
         *
         *  Properties
         *
         * */
        _this.data = void 0;
        _this.points = void 0;
        _this.options = void 0;
        _this.axis = void 0;
        _this.yAxis = void 0;
        _this.startAngleRad = void 0;
        _this.thresholdAngleRad = void 0;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    // Extend the translate function to extend the Y axis with the necessary
    // decoration (#5895).
    SolidGaugeSeries.prototype.translate = function () {
        var axis = this.yAxis;
        SolidGaugeAxis.init(axis);
        // Prepare data classes
        if (!axis.dataClasses && axis.options.dataClasses) {
            axis.initDataClasses(axis.options);
        }
        axis.initStops(axis.options);
        // Generate points and inherit data label position
        GaugeSeries.prototype.translate.call(this);
    };
    // Draw the points where each point is one needle.
    SolidGaugeSeries.prototype.drawPoints = function () {
        var series = this, yAxis = series.yAxis, center = yAxis.center, options = series.options, renderer = series.chart.renderer, overshoot = options.overshoot, overshootVal = isNumber(overshoot) ?
            overshoot / 180 * Math.PI :
            0;
        var thresholdAngleRad;
        // Handle the threshold option
        if (isNumber(options.threshold)) {
            thresholdAngleRad = yAxis.startAngleRad + yAxis.translate(options.threshold, void 0, void 0, void 0, true);
        }
        this.thresholdAngleRad = pick(thresholdAngleRad, yAxis.startAngleRad);
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            // #10630 null point should not be draw
            if (!point.isNull) { // condition like in pie chart
                var radius = ((pInt(pick(point.options.radius, options.radius, 100 // %
                )) * center[2]) / 200), innerRadius = ((pInt(pick(point.options.innerRadius, options.innerRadius, 60 // %
                )) * center[2]) / 200), axisMinAngle = Math.min(yAxis.startAngleRad, yAxis.endAngleRad), axisMaxAngle = Math.max(yAxis.startAngleRad, yAxis.endAngleRad);
                var graphic = point.graphic, rotation = (yAxis.startAngleRad +
                    yAxis.translate(point.y, void 0, void 0, void 0, true)), shapeArgs = void 0, d = void 0, toColor = yAxis.toColor(point.y, point), minAngle = void 0, maxAngle = void 0;
                if (toColor === 'none') { // #3708
                    toColor = point.color || series.color || 'none';
                }
                if (toColor !== 'none') {
                    point.color = toColor;
                }
                // Handle overshoot and clipping to axis max/min
                rotation = clamp(rotation, axisMinAngle - overshootVal, axisMaxAngle + overshootVal);
                // Handle the wrap option
                if (options.wrap === false) {
                    rotation = clamp(rotation, axisMinAngle, axisMaxAngle);
                }
                minAngle = Math.min(rotation, series.thresholdAngleRad);
                maxAngle = Math.max(rotation, series.thresholdAngleRad);
                if (maxAngle - minAngle > 2 * Math.PI) {
                    maxAngle = minAngle + 2 * Math.PI;
                }
                point.shapeArgs = shapeArgs = {
                    x: center[0],
                    y: center[1],
                    r: radius,
                    innerR: innerRadius,
                    start: minAngle,
                    end: maxAngle,
                    rounded: options.rounded
                };
                point.startR = radius; // For PieSeries.animate
                if (graphic) {
                    d = shapeArgs.d;
                    graphic.animate(extend({ fill: toColor }, shapeArgs));
                    if (d) {
                        shapeArgs.d = d; // animate alters it
                    }
                }
                else {
                    point.graphic = graphic = renderer.arc(shapeArgs)
                        .attr({
                        fill: toColor,
                        'sweep-flag': 0
                    })
                        .add(series.group);
                }
                if (!series.chart.styledMode) {
                    if (options.linecap !== 'square') {
                        graphic.attr({
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round'
                        });
                    }
                    graphic.attr({
                        stroke: options.borderColor || 'none',
                        'stroke-width': options.borderWidth || 0
                    });
                }
                if (graphic) {
                    graphic.addClass(point.getClassName(), true);
                }
            }
        }
    };
    // Extend the pie slice animation by animating from start angle and up.
    SolidGaugeSeries.prototype.animate = function (init) {
        if (!init) {
            this.startAngleRad = this.thresholdAngleRad;
            pieProto.animate.call(this, init);
        }
    };
    SolidGaugeSeries.defaultOptions = merge(GaugeSeries.defaultOptions, SolidGaugeSeriesDefaults);
    return SolidGaugeSeries;
}(GaugeSeries));
extend(SolidGaugeSeries.prototype, {
    drawLegendSymbol: LegendSymbol.drawRectangle
});
SeriesRegistry.registerSeriesType('solidgauge', SolidGaugeSeries);
/* *
 *
 *  Default Export
 *
 * */
export default SolidGaugeSeries;
