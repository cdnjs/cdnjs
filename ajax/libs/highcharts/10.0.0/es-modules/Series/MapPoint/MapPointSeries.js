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
import H from '../../Core/Globals.js';
var noop = H.noop;
import MapPointPoint from './MapPointPoint.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var ScatterSeries = SeriesRegistry.seriesTypes.scatter;
import U from '../../Core/Utilities.js';
var extend = U.extend, fireEvent = U.fireEvent, isNumber = U.isNumber, merge = U.merge;
import '../../Core/DefaultOptions.js';
import '../Scatter/ScatterSeries.js';
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.mappoint
 *
 * @augments Highcharts.Series
 */
var MapPointSeries = /** @class */ (function (_super) {
    __extends(MapPointSeries, _super);
    function MapPointSeries() {
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
        _this.chart = void 0;
        _this.data = void 0;
        _this.options = void 0;
        _this.points = void 0;
        return _this;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    MapPointSeries.prototype.drawDataLabels = function () {
        _super.prototype.drawDataLabels.call(this);
        if (this.dataLabelsGroup) {
            this.dataLabelsGroup.clip(this.chart.clipRect);
        }
    };
    /**
     * Resolve `lon`, `lat` or `geometry` options and project the resulted
     * coordinates.
     *
     * @private
     */
    MapPointSeries.prototype.projectPoint = function (pointOptions) {
        var mapView = this.chart.mapView;
        if (mapView) {
            var geometry = pointOptions.geometry, lon = pointOptions.lon, lat = pointOptions.lat;
            var coordinates = (geometry &&
                geometry.type === 'Point' &&
                geometry.coordinates);
            if (isNumber(lon) && isNumber(lat)) {
                coordinates = [lon, lat];
            }
            if (coordinates) {
                return mapView.lonLatToProjectedUnits({
                    lon: coordinates[0],
                    lat: coordinates[1]
                });
            }
        }
    };
    MapPointSeries.prototype.translate = function () {
        var _this = this;
        var mapView = this.chart.mapView;
        if (!this.processedXData) {
            this.processData();
        }
        this.generatePoints();
        // Create map based translation
        if (mapView) {
            var hasCoordinates_1 = mapView.projection.hasCoordinates;
            this.points.forEach(function (p) {
                var _a = p.x, x = _a === void 0 ? void 0 : _a, _b = p.y, y = _b === void 0 ? void 0 : _b;
                var xy = _this.projectPoint(p.options);
                if (xy) {
                    x = xy.x;
                    y = xy.y;
                    // Map bubbles getting geometry from shape
                }
                else if (p.bounds) {
                    x = p.bounds.midX;
                    y = p.bounds.midY;
                }
                if (isNumber(x) && isNumber(y)) {
                    // Establish plotX and plotY
                    var plotCoords = mapView.projectedUnitsToPixels({ x: x, y: y });
                    p.plotX = plotCoords.x;
                    p.plotY = hasCoordinates_1 ?
                        plotCoords.y :
                        _this.chart.plotHeight - plotCoords.y;
                }
                else {
                    p.y = p.plotX = p.plotY = void 0;
                }
                p.isInside = _this.isPointInside(p);
                // Find point zone
                p.zone = _this.zones.length ? p.getZone() : void 0;
            });
        }
        fireEvent(this, 'afterTranslate');
    };
    /**
     * A mappoint series is a special form of scatter series where the points
     * can be laid out in map coordinates on top of a map.
     *
     * @sample maps/demo/mapline-mappoint/
     *         Map-line and map-point series.
     *
     * @extends      plotOptions.scatter
     * @product      highmaps
     * @optionparent plotOptions.mappoint
     */
    MapPointSeries.defaultOptions = merge(ScatterSeries.defaultOptions, {
        dataLabels: {
            crop: false,
            defer: false,
            enabled: true,
            formatter: function () {
                return this.point.name;
            },
            overflow: false,
            style: {
                /** @internal */
                color: "#000000" /* neutralColor100 */
            }
        }
    });
    return MapPointSeries;
}(ScatterSeries));
extend(MapPointSeries.prototype, {
    type: 'mappoint',
    axisTypes: ['colorAxis'],
    forceDL: true,
    isCartesian: false,
    pointClass: MapPointPoint,
    searchPoint: noop,
    useMapGeometry: true // #16534
});
SeriesRegistry.registerSeriesType('mappoint', MapPointSeries);
/* *
 *
 *  Default Export
 *
 * */
export default MapPointSeries;
/* *
 *
 *  API Options
 *
 * */
/**
 * A `mappoint` series. If the [type](#series.mappoint.type) option
 * is not specified, it is inherited from [chart.type](#chart.type).
 *
 *
 * @extends   series,plotOptions.mappoint
 * @excluding dataParser, dataURL
 * @product   highmaps
 * @apioption series.mappoint
 */
/**
 * An array of data points for the series. For the `mappoint` series
 * type, points can be given in the following ways:
 *
 * 1. An array of numerical values. In this case, the numerical values will be
 *    interpreted as `y` options. The `x` values will be automatically
 *    calculated, either starting at 0 and incremented by 1, or from
 *    `pointStart` and `pointInterval` given in the series options. If the axis
 *    has categories, these will be used. Example:
 *    ```js
 *    data: [0, 5, 3, 5]
 *    ```
 *
 * 2. An array of arrays with 2 values. In this case, the values correspond
 * to `[hc-key, value]`. Example:
 *
 *  ```js
 *     data: [
 *         ['us-ny', 0],
 *         ['us-mi', 5],
 *         ['us-tx', 3],
 *         ['us-ak', 5]
 *     ]
 *  ```
 *
 * 3. An array of objects with named values. The following snippet shows only a
 *    few settings, see the complete options set below. If the total number of
 *    data points exceeds the series'
 *    [turboThreshold](#series.mappoint.turboThreshold),
 *    this option is not available.
 *    ```js
 *        data: [{
 *            x: 1,
 *            y: 7,
 *            name: "Point2",
 *            color: "#00FF00"
 *        }, {
 *            x: 1,
 *            y: 4,
 *            name: "Point1",
 *            color: "#FF00FF"
 *        }]
 *    ```
 *
 * @type      {Array<number|Array<number,(number|null)>|null|*>}
 * @extends   series.map.data
 * @excluding labelrank, middleX, middleY, path, value
 * @product   highmaps
 * @apioption series.mappoint.data
 */
/**
 * The geometry of a point.
 *
 * To achieve a better separation between the structure and the data,
 * it is recommended to use `mapData` to define the geometry instead
 * of defining it on the data points themselves.
 *
 * The geometry object is compatible to that of a `feature` in geoJSON, so
 * features of geoJSON can be passed directly into the `data`, optionally
 * after first filtering and processing it.
 *
 * @sample maps/series/data-geometry/
 *         geometry defined in data
 *
 * @type      {Object}
 * @since 9.3.0
 * @product   highmaps
 * @apioption series.mappoint.data.geometry
 */
/**
 * The geometry type, which in case of the `mappoint` series is always `Point`.
 *
 * @type      {string}
 * @since 9.3.0
 * @product   highmaps
 * @validvalue ["Point"]
 * @apioption series.mappoint.data.geometry.type
 */
/**
 * The geometry coordinates in terms of `[longitude, latitude]`.
 *
 * @type      {Highcharts.LonLatArray}
 * @since 9.3.0
 * @product   highmaps
 * @apioption series.mappoint.data.geometry.coordinates
 */
/**
 * The latitude of the point. Must be combined with the `lon` option
 * to work. Overrides `x` and `y` values.
 *
 * @sample {highmaps} maps/demo/mappoint-latlon/
 *         Point position by lat/lon
 *
 * @type      {number}
 * @since     1.1.0
 * @product   highmaps
 * @apioption series.mappoint.data.lat
 */
/**
 * The longitude of the point. Must be combined with the `lon` option
 * to work. Overrides `x` and `y` values.
 *
 * @sample {highmaps} maps/demo/mappoint-latlon/
 *         Point position by lat/lon
 *
 * @type      {number}
 * @since     1.1.0
 * @product   highmaps
 * @apioption series.mappoint.data.lon
 */
/**
 * The x coordinate of the point in terms of projected units.
 *
 * @sample {highmaps} maps/series/mapline-mappoint-path-xy/
 *         Map point demo
 *
 * @type      {number}
 * @product   highmaps
 * @apioption series.mappoint.data.x
 */
/**
 * The x coordinate of the point in terms of projected units.
 *
 * @sample {highmaps} maps/series/mapline-mappoint-path-xy/
 *         Map point demo
 *
 * @type      {number|null}
 * @product   highmaps
 * @apioption series.mappoint.data.y
 */
''; // adds doclets above to transpiled file
