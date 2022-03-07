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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* *
 *
 *  Imports
 *
 * */
import MapPoint from '../Map/MapPoint.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var _a = SeriesRegistry.seriesTypes, BubbleSeries = _a.bubble, MapSeries = _a.map;
/* *
 *
 *  Class
 *
 * */
var MapBubblePoint = /** @class */ (function (_super) {
    __extends(MapBubblePoint, _super);
    function MapBubblePoint() {
        /* *
         *
         *  Functions
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.applyOptions = MapSeries.prototype.pointClass.prototype.applyOptions;
        _this.getProjectedBounds = MapPoint.prototype.getProjectedBounds;
        return _this;
        /* eslint-enable valid-jsdoc */
    }
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    MapBubblePoint.prototype.isValid = function () {
        return typeof this.z === 'number';
    };
    return MapBubblePoint;
}(BubbleSeries.prototype.pointClass));
/* *
 *
 *  Default Export
 *
 * */
export default MapBubblePoint;
