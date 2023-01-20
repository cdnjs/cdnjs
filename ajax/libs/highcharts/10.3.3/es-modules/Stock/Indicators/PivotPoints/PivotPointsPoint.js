/* *
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
import SeriesRegistry from '../../../Core/Series/SeriesRegistry.js';
var SMAPoint = SeriesRegistry.seriesTypes.sma.prototype.pointClass;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function destroyExtraLabels(point, functionName) {
    var props = point.series.pointArrayMap, prop, i = props.length;
    SeriesRegistry.seriesTypes.sma.prototype.pointClass.prototype[functionName].call(point);
    while (i--) {
        prop = 'dataLabel' + props[i];
        // S4 dataLabel could be removed by parent method:
        if (point[prop] && point[prop].element) {
            point[prop].destroy();
        }
        point[prop] = null;
    }
}
/* *
 *
 *  Class
 *
 * */
var PivotPointsPoint = /** @class */ (function (_super) {
    __extends(PivotPointsPoint, _super);
    function PivotPointsPoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.P = void 0;
        _this.pivotLine = void 0;
        _this.series = void 0;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    PivotPointsPoint.prototype.destroyElements = function () {
        destroyExtraLabels(this, 'destroyElements');
    };
    // This method is called when removing points, e.g. series.update()
    PivotPointsPoint.prototype.destroy = function () {
        destroyExtraLabels(this, 'destroyElements');
    };
    return PivotPointsPoint;
}(SMAPoint));
/* *
 *
 *  Default Export
 *
 * */
export default PivotPointsPoint;
