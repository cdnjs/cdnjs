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
/* *
 *
 *  Imports
 *
 * */
import BubblePoint from '../Bubble/BubblePoint.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var mapPointProto = SeriesRegistry.seriesTypes.map.prototype.pointClass.prototype;
import U from '../../Core/Utilities.js';
var extend = U.extend;
/* *
 *
 *  Class
 *
 * */
var MapBubblePoint = /** @class */ (function (_super) {
    __extends(MapBubblePoint, _super);
    function MapBubblePoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* *
     *
     *  Functions
     *
     * */
    MapBubblePoint.prototype.isValid = function () {
        return typeof this.z === 'number';
    };
    return MapBubblePoint;
}(BubblePoint));
extend(MapBubblePoint.prototype, {
    applyOptions: mapPointProto.applyOptions,
    getProjectedBounds: mapPointProto.getProjectedBounds
});
/* *
 *
 *  Default Export
 *
 * */
export default MapBubblePoint;
