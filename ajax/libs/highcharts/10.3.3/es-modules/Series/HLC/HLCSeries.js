/* *
 *
 *  (c) 2010-2021 Pawel Lysy
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
import HLCPoint from './HLCPoint.js';
import HLCSeriesDefaults from './HLCSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var ColumnSeries = SeriesRegistry.seriesTypes.column;
import U from '../../Core/Utilities.js';
var extend = U.extend, merge = U.merge;
/* *
 *
 *  Class
 *
 * */
/**
 * The hlc series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.hlc
 *
 * @augments Highcharts.Series
 */
var HLCSeries = /** @class */ (function (_super) {
    __extends(HLCSeries, _super);
    function HLCSeries() {
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
        _this.options = void 0;
        _this.points = void 0;
        _this.yData = void 0;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Extend the path if close is not between high and low.
     *
     * @param {SVGPath} path the path array of the point
     * @param {number} halfStrokeWidth
     * @param {number} value value of the point to which the stem should be extended
     */
    HLCSeries.prototype.extendStem = function (path, halfStrokeWidth, value) {
        var start = path[0];
        var end = path[1];
        // We don't need to worry about crisp - close value
        // is already crisped and halfStrokeWidth should remove it.
        if (typeof start[2] === 'number') {
            start[2] = Math.max(value + halfStrokeWidth, start[2]);
        }
        if (typeof end[2] === 'number') {
            end[2] = Math.min(value - halfStrokeWidth, end[2]);
        }
    };
    /**
     * Function to create SVGPath of the point based on the
     * plot positions of this point.
     * @private
     */
    HLCSeries.prototype.getPointPath = function (point, graphic) {
        // crisp vector coordinates
        var strokeWidth = graphic.strokeWidth(), series = point.series, crispCorr = (strokeWidth % 2) / 2, 
        // #2596:
        crispX = Math.round(point.plotX) - crispCorr, halfWidth = Math.round(point.shapeArgs.width / 2);
        var plotClose = point.plotClose;
        // the vertical stem
        var path = [
            ['M', crispX, Math.round(point.yBottom)],
            ['L', crispX, Math.round(point.plotHigh)]
        ];
        // close
        if (point.close !== null) {
            plotClose = Math.round(point.plotClose) + crispCorr;
            path.push(['M', crispX, plotClose], ['L', crispX + halfWidth, plotClose]);
            series.extendStem(path, strokeWidth / 2, plotClose);
        }
        return path;
    };
    /**
     * Draw single point
     * @private
     */
    HLCSeries.prototype.drawSinglePoint = function (point) {
        var series = point.series, chart = series.chart;
        var path, graphic = point.graphic;
        if (typeof point.plotY !== 'undefined') {
            // Create and/or update the graphic
            if (!graphic) {
                point.graphic = graphic = chart.renderer.path()
                    .add(series.group);
            }
            if (!chart.styledMode) {
                graphic.attr(series.pointAttribs(point, (point.selected && 'select'))); // #3897
            }
            // crisp vector coordinates
            path = series.getPointPath(point, graphic);
            graphic[!graphic ? 'attr' : 'animate']({ d: path })
                .addClass(point.getClassName(), true);
        }
    };
    /**
     * Draw the data points
     * @private
     */
    HLCSeries.prototype.drawPoints = function () {
        this.points.forEach(this.drawSinglePoint);
    };
    /**
     * @private
     * @function Highcharts.seriesTypes.hlc#init
     */
    HLCSeries.prototype.init = function () {
        _super.prototype.init.apply(this, arguments);
        this.options.stacking = void 0; // #8817
    };
    /**
     * Postprocess mapping between options and SVG attributes
     * @private
     */
    HLCSeries.prototype.pointAttribs = function (point, state) {
        var attribs = _super.prototype.pointAttribs.call(this, point, state);
        delete attribs.fill;
        return attribs;
    };
    HLCSeries.prototype.toYData = function (point) {
        // return a plain array for speedy calculation
        return [point.high, point.low, point.close];
    };
    /**
     * Translate data points from raw values x and y to plotX and plotY
     *
     * @private
     * @function Highcharts.seriesTypes.hlc#translate
     */
    HLCSeries.prototype.translate = function () {
        var series = this, yAxis = series.yAxis, names = (this.pointArrayMap && this.pointArrayMap.slice()) || [], translated = names.map(function (name) {
            return "plot".concat(name.charAt(0).toUpperCase() + name.slice(1));
        });
        translated.push('yBottom');
        names.push('low');
        _super.prototype.translate.apply(series);
        // Do the translation
        series.points.forEach(function (point) {
            names.forEach(function (name, i) {
                var value = point[name];
                if (value !== null) {
                    if (series.dataModify) {
                        value = series.dataModify.modifyValue(value);
                    }
                    point[translated[i]] =
                        yAxis.toPixels(value, true);
                }
            });
            // Align the tooltip to the high value to avoid covering the
            // point
            point.tooltipPos[1] =
                point.plotHigh + yAxis.pos - series.chart.plotTop;
        });
    };
    HLCSeries.defaultOptions = merge(ColumnSeries.defaultOptions, HLCSeriesDefaults);
    return HLCSeries;
}(ColumnSeries));
extend(HLCSeries.prototype, {
    pointClass: HLCPoint,
    animate: null,
    directTouch: false,
    pointArrayMap: ['high', 'low', 'close'],
    pointAttrToOptions: {
        stroke: 'color',
        'stroke-width': 'lineWidth'
    },
    pointValKey: 'close'
});
SeriesRegistry.registerSeriesType('hlc', HLCSeries);
/* *
 *
 *  Default Export
 *
 * */
export default HLCSeries;
