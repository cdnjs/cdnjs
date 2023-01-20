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
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var Point = SeriesRegistry.series.prototype.pointClass, _a = SeriesRegistry.seriesTypes, ScatterPoint = _a.scatter.prototype.pointClass, DumbbellPoint = _a.dumbbell.prototype.pointClass;
import U from '../../Core/Utilities.js';
var extend = U.extend;
/* *
 *
 *  Class
 *
 * */
var LollipopPoint = /** @class */ (function (_super) {
    __extends(LollipopPoint, _super);
    function LollipopPoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = void 0;
        _this.series = void 0;
        _this.plotX = void 0;
        return _this;
    }
    return LollipopPoint;
}(Point));
extend(LollipopPoint.prototype, {
    destroy: DumbbellPoint.prototype.destroy,
    pointSetState: ScatterPoint.prototype.setState,
    setState: DumbbellPoint.prototype.setState
});
/* *
 *
 *  Default Export
 *
 * */
export default LollipopPoint;
