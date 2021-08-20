/**
 * Map polygon module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapObject } from "./MapObject";
import { Polygon } from "../../core/elements/Polygon";
import { registry } from "../../core/Registry";
import * as $type from "../../core/utils/Type";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import $polylabel from "polylabel";
import * as $mapUtils from "./MapUtils";
import * as d3geo from "d3-geo";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a polygon on the map.
 *
 * @see {@link IMapPolygonEvents} for a list of available events
 * @see {@link IMapPolygonAdapters} for a list of available Adapters
 */
var MapPolygon = /** @class */ (function (_super) {
    __extends(MapPolygon, _super);
    /**
     * Constructor
     */
    function MapPolygon() {
        var _this = _super.call(this) || this;
        _this.className = "MapPolygon";
        _this.polygon = _this.createChild(Polygon);
        _this.polygon.shouldClone = false;
        _this.polygon.applyOnClones = true;
        _this.setPropertyValue("precision", 0.5);
        var interfaceColors = new InterfaceColorSet();
        _this.fill = interfaceColors.getFor("secondaryButton");
        _this.stroke = interfaceColors.getFor("secondaryButtonStroke");
        _this.strokeOpacity = 1;
        _this.tooltipPosition = "pointer";
        _this.nonScalingStroke = true;
        _this.applyTheme();
        return _this;
    }
    /**
     * @ignore
     */
    MapPolygon.prototype.getFeature = function () {
        if (this.multiPolygon && this.multiPolygon.length > 0) {
            return { "type": "Feature", geometry: { type: "MultiPolygon", coordinates: this.multiPolygon } };
        }
    };
    Object.defineProperty(MapPolygon.prototype, "multiGeoPolygon", {
        /**
         * @return Polygon coordinates
         */
        get: function () {
            var multiGeoPolygon = this.getPropertyValue("multiGeoPolygon");
            if (!multiGeoPolygon && this.dataItem) {
                multiGeoPolygon = this.dataItem.multiGeoPolygon;
            }
            return multiGeoPolygon;
        },
        /**
         * Set of coordinates for the polygon.
         *
         * @param multiGeoPolygon  Polygon coordinates
         */
        set: function (multiGeoPolygon) {
            this.setPropertyValue("multiGeoPolygon", multiGeoPolygon, true);
            this.multiPolygon = $mapUtils.multiGeoPolygonToMultipolygon(multiGeoPolygon);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygon.prototype, "multiPolygon", {
        /**
         * @return Coordinates
         */
        get: function () {
            var multiPolygon = this.getPropertyValue("multiPolygon");
            if (!multiPolygon && this.dataItem) {
                multiPolygon = this.dataItem.multiPolygon;
            }
            return multiPolygon;
        },
        /**
         * A collection of X/Y coordinates for a multi-part polygon. E.g.:
         *
         * ```JSON
         * [
         *   // Part 1
         *   [
         *     [
         *       [ 100, 150 ],
         *       [ 120, 200 ],
         *       [ 150, 220 ],
         *       [ 170, 240 ],
         *       [ 100, 150 ]
         *     ]
         *   ],
         *
         *   // Part 2
         *   [
         *     [
         *       [ 300, 350 ],
         *       [ 320, 400 ],
         *       [ 350, 420 ],
         *       [ 370, 440 ],
         *       [ 300, 350 ]
         *     ]
         *   ]
         * ]
         * ```
         *
         * @param multiPolygon  Coordinates
         */
        set: function (multiPolygon) {
            if (this.setPropertyValue("multiPolygon", multiPolygon)) {
                this.updateExtremes();
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * (Re)validates the polygon, effectively redrawing it.
     *
     * @ignore Exclude from docs
     */
    MapPolygon.prototype.validate = function () {
        if (this.series) {
            var projection = this.series.chart.projection;
            var pathGenerator = projection.d3Path;
            if (this.multiPolygon) {
                if (this.series) {
                    var feature = { type: "MultiPolygon", coordinates: this.multiPolygon };
                    projection.d3Projection.precision(this.precision);
                    this.polygon.path = pathGenerator(feature);
                }
                if (this.series.calculateVisualCenter) {
                    var biggestArea = 0;
                    var biggestPolygon = this.multiPolygon[0];
                    if (this.multiPolygon.length > 1) {
                        for (var i = 0; i < this.multiPolygon.length; i++) {
                            var polygon = this.multiPolygon[i];
                            var area = d3geo.geoArea({ type: "Polygon", coordinates: polygon });
                            if (area > biggestArea) {
                                biggestPolygon = polygon;
                                biggestArea = area;
                            }
                        }
                    }
                    var center = $polylabel(biggestPolygon);
                    this._visualLongitude = center[0];
                    this._visualLatitude = center[1];
                }
                else {
                    this._visualLongitude = this.longitude;
                    this._visualLatitude = this.latitude;
                }
            }
        }
        _super.prototype.validate.call(this);
    };
    /**
     * @ignore Exclude from docs
     */
    MapPolygon.prototype.measureElement = function () {
        // Overriding, just to avoid extra measure
    };
    Object.defineProperty(MapPolygon.prototype, "latitude", {
        /**
         * Latitude of the geometrical center of the polygon.
         *
         * @readonly
         * @return Center latitude
         */
        get: function () {
            return this.north + (this.south - this.north) / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygon.prototype, "longitude", {
        /**
         * Longitude of the geometrical center of the polygon.
         *
         * @readonly
         * @return Center longitude
         */
        get: function () {
            return this.east + (this.west - this.east) / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygon.prototype, "visualLatitude", {
        /**
         * @return  Latitude
         */
        get: function () {
            var latitude = this.getPropertyValue("visualLatitude");
            if ($type.isNumber(latitude)) {
                return (latitude);
            }
            if (!this._adapterO) {
                return this._visualLatitude;
            }
            else {
                return this._adapterO.apply("visualLatitude", this._visualLatitude);
            }
        },
        /**
         * Latitude of the visual center of the polygon.
         *
         * It may (and probably won't) coincide with geometrical center.
         *
         * @since 4.3.0
         * @param  value  Latitude
         */
        set: function (value) {
            this.setPropertyValue("visualLatitude", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygon.prototype, "visualLongitude", {
        /**
         * @return  Longitude
         */
        get: function () {
            var longitude = this.getPropertyValue("visualLongitude");
            if ($type.isNumber(longitude)) {
                return (longitude);
            }
            if (!this._adapterO) {
                return this._visualLongitude;
            }
            else {
                return this._adapterO.apply("visualLongitude", this._visualLongitude);
            }
        },
        /**
         * Longitude of the visual center of the polygon.
         *
         * It may (and probably won't) coincide with geometrical center.
         *
         * @since 4.3.0
         * @param  value  Longitude
         */
        set: function (value) {
            this.setPropertyValue("visualLongitude", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygon.prototype, "pixelWidth", {
        /**
         * Not 100% sure about this, as if we add something to MapPolygon this
         * won't be true, but otherwise we will get all 0 and the tooltip won't
         * be positioned properly
         * @hidden
         */
        /**
         * Element's width in pixels.
         *
         * @readonly
         * @return Width (px)
         */
        get: function () {
            return this.polygon.pixelWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygon.prototype, "pixelHeight", {
        /**
         * Element's height in pixels.
         *
         * @readonly
         * @return Width (px)
         */
        get: function () {
            return this.polygon.pixelHeight;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all properties from another instance of [[MapPolygon]].
     *
     * @param source  Source series
     */
    MapPolygon.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.polygon.copyFrom(source.polygon);
    };
    /**
     * @ignore
     */
    MapPolygon.prototype.updateExtremes = function () {
        _super.prototype.updateExtremes.call(this);
    };
    Object.defineProperty(MapPolygon.prototype, "boxArea", {
        /**
         * @ignore
         * used to sorth polygons from big to small
         */
        get: function () {
            return (this.north - this.south) * (this.east - this.west);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * X coordinate for the slice tooltip.
     *
     * @ignore
     * @return X
     */
    MapPolygon.prototype.getTooltipX = function () {
        return this.series.chart.projection.convert({ longitude: this.visualLongitude, latitude: this.visualLatitude }).x;
    };
    /**
     * Y coordinate for the slice tooltip.
     *
     * @ignore
     * @return Y
     */
    MapPolygon.prototype.getTooltipY = function () {
        return this.series.chart.projection.convert({ longitude: this.visualLongitude, latitude: this.visualLatitude }).y;
    };
    Object.defineProperty(MapPolygon.prototype, "precision", {
        get: function () {
            return this.getPropertyValue("precision");
        },
        /**
         * When polygon's sides are plotted, they are bent according to the used
         * projection.
         *
         * `precision` introduces a setting which can control when such bending
         * occurs.
         *
         * If the distance (in degrees) between two points of polygon's side is less
         * than `precision`, no bending will take place and the line will be straight.
         *
         * Set to large number (e.g. 10000) for perfectly straight lines on all
         * polygon's sides.
         *
         * @since 4.9.1
         * @default 0.5
         * @param  value  Precision
         */
        set: function (value) {
            this.setPropertyValue("precision", value, true);
        },
        enumerable: true,
        configurable: true
    });
    return MapPolygon;
}(MapObject));
export { MapPolygon };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapPolygon"] = MapPolygon;
//# sourceMappingURL=MapPolygon.js.map