/* *
 *
 *  Highcharts variwide module
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
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var ColumnPoint = SeriesRegistry.seriesTypes.column.prototype.pointClass;
import U from '../../Core/Utilities.js';
var isNumber = U.isNumber;
/* *
 *
 *  Class
 *
 * */
var VariwidePoint = /** @class */ (function (_super) {
    __extends(VariwidePoint, _super);
    function VariwidePoint() {
        /* *
         *
         *  Properites
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.crosshairWidth = void 0;
        _this.options = void 0;
        _this.series = void 0;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    VariwidePoint.prototype.isValid = function () {
        return isNumber(this.y) && isNumber(this.z);
    };
    return VariwidePoint;
}(ColumnPoint));
/* *
 *
 *  Default Export
 *
 * */
export default VariwidePoint;
