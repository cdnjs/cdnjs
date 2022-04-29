/* *
 *
 *  Experimental Highcharts module which enables visualization of a Venn
 *  diagram.
 *
 *  (c) 2016-2021 Highsoft AS
 *  Authors: Jon Arild Nygard
 *
 *  Layout algorithm by Ben Frederickson:
 *  https://www.benfrederickson.com/better-venn-diagrams/
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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import DrawPointComposition from '../DrawPointComposition.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var ScatterSeries = SeriesRegistry.seriesTypes.scatter;
import U from '../../Core/Utilities.js';
var extend = U.extend, isNumber = U.isNumber;
/* *
 *
 *  Class
 *
 * */
var VennPoint = /** @class */ (function (_super) {
    __extends(VennPoint, _super);
    function VennPoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = void 0;
        _this.series = void 0;
        return _this;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    VennPoint.prototype.isValid = function () {
        return isNumber(this.value);
    };
    VennPoint.prototype.shouldDraw = function () {
        // Only draw points with single sets.
        return !!this.shapeArgs;
    };
    return VennPoint;
}(ScatterSeries.prototype.pointClass));
DrawPointComposition.compose(VennPoint);
/* *
 *
 *  Default Export
 *
 * */
export default VennPoint;
