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
import ColorMapMixin from '../ColorMapMixin.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var ScatterSeries = SeriesRegistry.seriesTypes.scatter;
import U from '../../Core/Utilities.js';
var extend = U.extend;
/* *
 *
 *  Class
 *
 * */
var MapPoint = /** @class */ (function (_super) {
    __extends(MapPoint, _super);
    function MapPoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = void 0;
        _this.path = void 0;
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
    // Get the projected path based on the geometry. May also be called on
    // mapData options (not point instances), hence static.
    MapPoint.getProjectedPath = function (point, projection) {
        if (!point.projectedPath) {
            if (projection && point.geometry) {
                // Always true when given GeoJSON coordinates
                projection.hasCoordinates = true;
                point.projectedPath = projection.path(point.geometry);
                // SVG path given directly in point options
            }
            else {
                point.projectedPath = point.path;
            }
        }
        return point.projectedPath || [];
    };
    /**
     * Extend the Point object to split paths.
     * @private
     */
    MapPoint.prototype.applyOptions = function (options, x) {
        var series = this.series, point = _super.prototype.applyOptions.call(this, options, x), joinBy = series.joinBy, mapPoint;
        if (series.mapData && series.mapMap) {
            var joinKey = joinBy[1];
            var mapKey = _super.prototype.getNestedProperty.call(point, joinKey);
            mapPoint = typeof mapKey !== 'undefined' &&
                series.mapMap[mapKey];
            if (mapPoint) {
                extend(point, mapPoint); // copy over properties
            }
            else {
                point.value = point.value || null;
            }
        }
        return point;
    };
    /**
     * Stop the fade-out
     * @private
     */
    MapPoint.prototype.onMouseOver = function (e) {
        U.clearTimeout(this.colorInterval);
        if (this.value !== null || this.series.options.nullInteraction) {
            _super.prototype.onMouseOver.call(this, e);
        }
        else {
            // #3401 Tooltip doesn't hide when hovering over null points
            this.series.onMouseOut(e);
        }
    };
    /**
     * Highmaps only. Zoom in on the point using the global animation.
     *
     * @sample maps/members/point-zoomto/
     *         Zoom to points from butons
     *
     * @requires modules/map
     *
     * @function Highcharts.Point#zoomTo
     */
    MapPoint.prototype.zoomTo = function () {
        var point = this;
        var chart = point.series.chart;
        if (chart.mapView && point.bounds) {
            chart.mapView.fitToBounds(point.bounds, void 0, false);
            point.series.isDirty = true;
            chart.redraw();
        }
    };
    return MapPoint;
}(ScatterSeries.prototype.pointClass));
extend(MapPoint.prototype, {
    dataLabelOnNull: ColorMapMixin.PointMixin.dataLabelOnNull,
    isValid: ColorMapMixin.PointMixin.isValid,
    moveToTopOnHover: ColorMapMixin.PointMixin.moveToTopOnHover
});
/* *
 *
 *  Default Export
 *
 * */
export default MapPoint;
