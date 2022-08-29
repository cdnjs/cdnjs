/* *
 *
 *  Dependency wheel module
 *
 *  (c) 2018-2021 Torstein Honsi
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
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var SankeyPoint = SeriesRegistry.seriesTypes.sankey.prototype.pointClass;
import U from '../../Core/Utilities.js';
var wrap = U.wrap;
/* *
 *
 *  Class
 *
 * */
var DependencyWheelPoint = /** @class */ (function (_super) {
    __extends(DependencyWheelPoint, _super);
    function DependencyWheelPoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.angle = void 0;
        _this.fromNode = void 0;
        _this.index = void 0;
        _this.linksFrom = void 0;
        _this.linksTo = void 0;
        _this.options = void 0;
        _this.series = void 0;
        _this.shapeArgs = void 0;
        _this.toNode = void 0;
        return _this;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Return a text path that the data label uses.
     * @private
     */
    DependencyWheelPoint.prototype.getDataLabelPath = function (label) {
        var _this = this;
        var renderer = this.series.chart.renderer, shapeArgs = this.shapeArgs, upperHalf = this.angle < 0 || this.angle > Math.PI, start = shapeArgs.start || 0, end = shapeArgs.end || 0;
        // First time
        if (!this.dataLabelPath) {
            // Destroy the path with the label
            wrap(label, 'destroy', function (proceed) {
                if (_this.dataLabelPath) {
                    _this.dataLabelPath = _this.dataLabelPath.destroy();
                }
                return proceed.call(label);
            });
            // Subsequent times
        }
        else {
            this.dataLabelPath = this.dataLabelPath.destroy();
            delete this.dataLabelPath;
        }
        // All times
        this.dataLabelPath = renderer
            .arc({
            open: true,
            longArc: Math.abs(Math.abs(start) - Math.abs(end)) < Math.PI ? 0 : 1
        })
            .attr({
            x: shapeArgs.x,
            y: shapeArgs.y,
            r: (shapeArgs.r +
                (this.dataLabel.options.distance || 0)),
            start: (upperHalf ? start : end),
            end: (upperHalf ? end : start),
            clockwise: +upperHalf
        })
            .add(renderer.defs);
        return this.dataLabelPath;
    };
    DependencyWheelPoint.prototype.isValid = function () {
        // No null points here
        return true;
    };
    return DependencyWheelPoint;
}(SankeyPoint));
/* *
 *
 *  Default Export
 *
 * */
export default DependencyWheelPoint;
