/**
 * Graticule (map grid) series functionality.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapLineSeries, MapLineSeriesDataItem } from "./MapLineSeries";
import { Graticule } from "./Graticule";
import { registry } from "../../core/Registry";
import * as d3geo from "d3-geo";
import * as $array from "../../core/utils/Array";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[GraticuleSeries]].
 *
 * @see {@link DataItem}
 */
var GraticuleSeriesDataItem = /** @class */ (function (_super) {
    __extends(GraticuleSeriesDataItem, _super);
    /**
     * Constructor
     */
    function GraticuleSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "GraticuleSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return GraticuleSeriesDataItem;
}(MapLineSeriesDataItem));
export { GraticuleSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class is used to create a set of graticules (map grid).
 *
 * To enable, create like you would create any regular map series:
 *
 * ```TypeScript
 * let graticule = chart.series.push(new am4maps.GraticuleSeries())
 * graticule.mapLines.template.line.stroke = am4core.color("#000000");
 * graticule.mapLines.template.line.strokeOpacity = 0.1;
 * ```
 * ```JavaScript
 * var graticule = chart.series.push(new am4maps.GraticuleSeries())
 * graticule.mapLines.template.line.stroke = am4core.color("#000000");
 * graticule.mapLines.template.line.strokeOpacity = 0.1;
 * ```
 * ```JSON
 * {
 *   // ...
 *   "series": [{
 *     "type": "GraticuleSeries",
 *     "mapLines": {
 *       "line": {
 *         "stroke": "#000000",
 *         "strokeOpacity": 0.1
 *       }
 *     }
 *   }]
 * }
 * ```
 *
 * @since 4.3.0
 * @see {@link IGraticuleSeriesEvents} for a list of available Events
 * @see {@link IGraticuleSeriesAdapters} for a list of available Adapters
 * @important
 */
var GraticuleSeries = /** @class */ (function (_super) {
    __extends(GraticuleSeries, _super);
    /**
     * Constructor
     */
    function GraticuleSeries() {
        var _this = _super.call(this) || this;
        _this.className = "GraticuleSeries";
        _this.longitudeStep = 10;
        _this.latitudeStep = 10;
        _this.north = 90;
        _this.south = -90;
        _this.east = -180;
        _this.west = 180;
        //this.majorLatitudeStep = 90;
        //this.majorLongitudeStep = 360;
        _this.fitExtent = true;
        _this.singleSprite = true;
        _this.events.disableType("geoBoundsChanged");
        _this.mapLines.template.line.strokeOpacity = 0.08;
        _this.ignoreBounds = false;
        _this.hiddenInLegend = true;
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    GraticuleSeries.prototype.createDataItem = function () {
        return new GraticuleSeriesDataItem();
    };
    GraticuleSeries.prototype.validateData = function () {
        var _this = this;
        _super.prototype.validateData.call(this);
        this.mapLines.clear();
        var graticule = d3geo.geoGraticule();
        if (graticule) {
            graticule.stepMinor([this.longitudeStep, this.latitudeStep]);
            graticule.stepMajor([360, 360]);
            var chart = this.chart;
            if (this.fitExtent) {
                graticule.extent([[chart.east, chart.north], [chart.west, chart.south]]);
            }
            else {
                graticule.extent([[this.east, this.north], [this.west, this.south]]);
            }
            if (this.singleSprite) {
                var mapLine = this.mapLines.create();
                mapLine.multiLine = graticule().coordinates;
            }
            else {
                var lineStrings = graticule.lines();
                $array.each(lineStrings, function (lineString) {
                    var mapLine = _this.mapLines.create();
                    mapLine.multiLine = [lineString.coordinates];
                });
            }
        }
    };
    /**
     * Returns a new line instance of suitable type.
     *
     * @return New line
     */
    GraticuleSeries.prototype.createLine = function () {
        return new Graticule();
    };
    Object.defineProperty(GraticuleSeries.prototype, "latitudeStep", {
        /**
         * @return Step
         */
        get: function () {
            return this.getPropertyValue("latitudeStep");
        },
        /**
         * Draw a graticule (grid) every X degrees of latitude.
         *
         * @default 10
         * @param  value Step
         */
        set: function (value) {
            if (this.setPropertyValue("latitudeStep", value)) {
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraticuleSeries.prototype, "longitudeStep", {
        /**
         * @return Step
         */
        get: function () {
            return this.getPropertyValue("longitudeStep");
        },
        /**
         * Draw a graticule (grid) every X degrees of longitude.
         *
         * @default 10
         * @param  value  Step
         */
        set: function (value) {
            if (this.setPropertyValue("longitudeStep", value)) {
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraticuleSeries.prototype, "fitExtent", {
        /**
         * @return Fit?
         */
        get: function () {
            return this.getPropertyValue("fitExtent");
        },
        /**
         * Draw a thicker (major) graticule every X degrees of latitude.
         *
         * @default 90
         * @param  value  Step
         */
        // public set majorLatitudeStep(value: number) {
        // 	if (this.setPropertyValue("majorLatitudeStep", value)) {
        // 		this.invalidateData();
        // 	}
        // }
        /**
         * @return Step
         */
        // public get majorLatitudeStep(): number {
        // 	return this.getPropertyValue("majorLatitudeStep");
        // }
        /**
         * Draw a thicker (major) graticule every X degrees of longitude.
         *
         * @default 360
         * @param  value  Step
         */
        // public set majorLongitudeStep(value: number) {
        // 	if (this.setPropertyValue("majorLongitudeStep", value)) {
        // 		this.invalidateData();
        // 	}
        // }
        /**
         * @return Step
         */
        // public get majorLongitudeStep(): number {
        // 	return this.getPropertyValue("majorLongitudeStep");
        // }
        /**
         * Whether to cap graticules (grid) to actual span of the map (`true`), e.g.
         * where there are polygons, or draw full-world grid (`false`).
         *
         * For world maps, using `false` makes sense. For smaller maps - not so much.
         *
         * If set to `false`, the grid will be drawn from this series `east` to
         * `west`, and from `south` to `north` (default values: `east = -180`;
         * `west = 180`; `south =-90`; `north =90`).
         *
         * These can be overridden by setting `GraticuleSeries`' respective
         * properties.
         *
         * @default true
         * @param  value  Fit?
         */
        set: function (value) {
            if (this.setPropertyValue("fitExtent", value)) {
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraticuleSeries.prototype, "singleSprite", {
        /**
         * @return Use single sprite?
         */
        get: function () {
            return this.getPropertyValue("singleSprite");
        },
        /**
         * Whether to draw all the grid as a single element or as separate lines.
         *
         * Setting `true` (default) will result in better performance, whereas
         * `false` allows setting visual properties of each line individually.
         *
         * @default true
         * @param  value  Use single sprite?
         */
        set: function (value) {
            if (this.setPropertyValue("singleSprite", value)) {
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    return GraticuleSeries;
}(MapLineSeries));
export { GraticuleSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["GraticuleSeries"] = GraticuleSeries;
registry.registeredClasses["GraticuleSeriesDataItem"] = GraticuleSeriesDataItem;
//# sourceMappingURL=GraticuleSeries.js.map