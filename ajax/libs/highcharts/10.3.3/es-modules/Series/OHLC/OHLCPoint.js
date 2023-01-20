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
var HLCSeries = SeriesRegistry.seriesTypes.hlc;
/* *
 *
 *  Class
 *
 * */
var OHLCPoint = /** @class */ (function (_super) {
    __extends(OHLCPoint, _super);
    function OHLCPoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.open = void 0;
        _this.options = void 0;
        _this.plotOpen = void 0;
        _this.series = void 0;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Extend the parent method by adding up or down to the class name.
     * @private
     * @function Highcharts.seriesTypes.ohlc#getClassName
     */
    OHLCPoint.prototype.getClassName = function () {
        return _super.prototype.getClassName.call(this) +
            (this.open < this.close ?
                ' highcharts-point-up' :
                ' highcharts-point-down');
    };
    /**
     * Save upColor as point color (#14826).
     * @private
     * @function Highcharts.seriesTypes.ohlc#resolveUpColor
     */
    OHLCPoint.prototype.resolveUpColor = function () {
        if (this.open < this.close &&
            !this.options.color &&
            this.series.options.upColor) {
            this.color = this.series.options.upColor;
        }
    };
    /**
     * Extend the parent method by saving upColor.
     * @private
     * @function Highcharts.seriesTypes.ohlc#resolveColor
     */
    OHLCPoint.prototype.resolveColor = function () {
        _super.prototype.resolveColor.call(this);
        this.resolveUpColor();
    };
    /**
     * Extend the parent method by saving upColor.
     * @private
     * @function Highcharts.seriesTypes.ohlc#getZone
     *
     * @return {Highcharts.SeriesZonesOptionsObject}
     *         The zone item.
     */
    OHLCPoint.prototype.getZone = function () {
        var zone = _super.prototype.getZone.call(this);
        this.resolveUpColor();
        return zone;
    };
    /**
     * Extend the parent method by resolving up/down colors (#15849)
     * @private
     **/
    OHLCPoint.prototype.applyOptions = function () {
        _super.prototype.applyOptions.apply(this, arguments);
        if (this.resolveColor) {
            this.resolveColor();
        }
        return this;
    };
    return OHLCPoint;
}(HLCSeries.prototype.pointClass));
/* *
 *
 *  Default Export
 *
 * */
export default OHLCPoint;
