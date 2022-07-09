/**
 * Map polygon series module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapSeries, MapSeriesDataItem } from "./MapSeries";
import { MapPolygon } from "./MapPolygon";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { registry } from "../../core/Registry";
import * as $mapUtils from "./MapUtils";
import * as $array from "../../core/utils/Array";
import * as $utils from "../../core/utils/Utils";
import * as $iter from "../../core/utils/Iterator";
import { Disposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapPolygonSeries]]
 * @see {@link DataItem}
 */
var MapPolygonSeriesDataItem = /** @class */ (function (_super) {
    __extends(MapPolygonSeriesDataItem, _super);
    /**
     * Constructor
     */
    function MapPolygonSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "MapPolygonSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    /**
     * @ignore
     */
    MapPolygonSeriesDataItem.prototype.getFeature = function () {
        if (this.multiPolygon && this.multiPolygon.length > 0) {
            return { "type": "Feature", geometry: { type: "MultiPolygon", coordinates: this.multiPolygon } };
        }
    };
    Object.defineProperty(MapPolygonSeriesDataItem.prototype, "mapPolygon", {
        /**
         * A [[MapPolygon]] element related to this data item.
         *
         * @readonly
         * @return Element
         */
        get: function () {
            var _this = this;
            if (!this._mapPolygon) {
                var mapPolygon_1 = this.component.mapPolygons.create();
                this._mapPolygon = mapPolygon_1;
                this.addSprite(mapPolygon_1);
                this._disposers.push(new Disposer(function () {
                    if (_this.component) {
                        _this.component.mapPolygons.removeValue(mapPolygon_1);
                    }
                }));
                this.mapObject = mapPolygon_1;
            }
            return this._mapPolygon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonSeriesDataItem.prototype, "polygon", {
        /**
         * @return Coordinates
         */
        get: function () {
            return this._polygon;
        },
        /**
         * A collection of X/Y coordinates for a single polygon. E.g.:
         *
         * ```JSON
         * [
         *   [
         *     [ 100, 150 ],
         *     [ 120, 200 ],
         *     [ 150, 200 ],
         *     [ 170, 240 ],
         *     [ 100, 150 ]
         *   ]
         * ]
         * ```
         *
         * @param polygon  Coordinates
         */
        set: function (polygon) {
            this._polygon = polygon;
            this.multiPolygon = [polygon];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonSeriesDataItem.prototype, "multiPolygon", {
        /**
         * @return Coordinates
         */
        get: function () {
            return this._multiPolygon;
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
            this._multiPolygon = multiPolygon;
            this.updateExtremes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonSeriesDataItem.prototype, "geoPolygon", {
        /**
         * @return Coordinates
         */
        get: function () {
            return this._geoPolygon;
        },
        /**
         * A collection of lat/long coordinates for a single polygon. E.g.:
         *
         * ```JSON
         * [
         *   [
         *     { latitude: -10.0, longitude: -10.0 },
         *     { latitude: 10.0, longitude: -10.0 },
         *     { latitude: 10.0, longitude: 10.0 },
         *     { latitude: -10.0, longitude: -10.0 }
         *   ]
         * ]
         * ```
         *
         * @see {@link https://tools.ietf.org/html/rfc7946#section-3.1.6} GeoJSON Polygon reference
         * @param geoPolygon  Coordinates
         */
        set: function (geoPolygon) {
            this._geoPolygon = geoPolygon;
            this.multiGeoPolygon = [geoPolygon];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonSeriesDataItem.prototype, "multiGeoPolygon", {
        /**
         * @return Coordinates
         */
        get: function () {
            return this._multiGeoPolygon;
        },
        /**
         * A collection of lat/long coordinates for a multi-part polygon. E.g.:
         *
         * ```JSON
         * [
         *   [
         *     [
         *       { longitude: 180.0, latitude: 40.0 },
         *       { longitude: 180.0, latitude: 50.0 },
         *       { longitude: 170.0, latitude: 50.0 },
         *       { longitude: 170.0, latitude: 40.0 },
         *       { longitude: 180.0, latitude: 40.0 }
         *     ]
         *   ],
         *   [
         *     [
         *       { longitude: -170.0, latitude: 40.0 },
         *       { longitude: -170.0, latitude: 50.0 },
         *       { longitude: -180.0, latitude: 50.0 },
         *       { longitude: -180.0, latitude: 40.0 },
         *       { longitude: -170.0, latitude: 40.0 }
         *     ]
         *   ]
         * ]
         * ```
         *
         * @see {@link https://tools.ietf.org/html/rfc7946#section-3.1.7} GeoJSON MultiPolygon reference
         * @param multiGeoPolygon  Coordinates
         */
        set: function (multiGeoPolygon) {
            this._multiGeoPolygon = multiGeoPolygon;
            this.multiPolygon = $mapUtils.multiGeoPolygonToMultipolygon(multiGeoPolygon);
        },
        enumerable: true,
        configurable: true
    });
    return MapPolygonSeriesDataItem;
}(MapSeriesDataItem));
export { MapPolygonSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A series of map polygon elements.
 *
 * @see {@link IMapPolygonSeriesEvents} for a list of available Events
 * @see {@link IMapPolygonSeriesAdapters} for a list of available Adapters
 * @important
 */
var MapPolygonSeries = /** @class */ (function (_super) {
    __extends(MapPolygonSeries, _super);
    /**
     * Constructor
     */
    function MapPolygonSeries() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Indicates if series should automatically calculate visual center of the
         * polygons (accessible via `visualLongitude` and `visualLatitude` properties
         * of the [[MapPolygon]]).
         *
         * @default false
         * @since 4.3.0
         */
        _this.calculateVisualCenter = false;
        _this.className = "MapPolygonSeries";
        // Set data fields
        _this.dataFields.multiPolygon = "multiPolygon";
        _this.dataFields.polygon = "polygon";
        _this.dataFields.geoPolygon = "geoPolygon";
        _this.dataFields.multiGeoPolygon = "multiGeoPolygon";
        _this.setPropertyValue("sortPolygonsBy", "area");
        _this.setPropertyValue("sortPolygonsReversed", false);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    MapPolygonSeries.prototype.createDataItem = function () {
        return new MapPolygonSeriesDataItem();
    };
    /**
     * @ignore
     */
    MapPolygonSeries.prototype.processIncExc = function () {
        this.mapPolygons.clear();
        _super.prototype.processIncExc.call(this);
    };
    /**
     * (Re)validates series data, effectively causing the whole series to be
     * redrawn.
     *
     * @ignore Exclude from docs
     */
    MapPolygonSeries.prototype.validateData = function () {
        // process geoJSON and created map objects
        if (this.useGeodata || this.geodata) {
            var geoJSON = !this._dataSources["geodata"] ? this.chart.geodata : undefined;
            if (this.geodata) {
                geoJSON = this.geodata;
            }
            if (geoJSON) {
                var features = void 0;
                if (geoJSON.type == "FeatureCollection") {
                    features = geoJSON.features;
                }
                else if (geoJSON.type == "Feature") {
                    features = [geoJSON];
                }
                else if (["Point", "LineString", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon"].indexOf(geoJSON.type) != -1) {
                    features = [{ geometry: geoJSON }];
                }
                else {
                    console.log("nothing found in geoJSON");
                }
                if (features) {
                    var _loop_1 = function (i, len) {
                        var feature = features[i];
                        var geometry = feature.geometry;
                        if (geometry) {
                            var type = geometry.type;
                            var id_1 = feature.id;
                            if (this_1.chart.geodataNames && this_1.chart.geodataNames[id_1]) {
                                feature.properties.name = this_1.chart.geodataNames[id_1];
                            }
                            if (type == "Polygon" || type == "MultiPolygon") {
                                if (!this_1.checkInclude(this_1.include, this_1.exclude, id_1)) {
                                    return "continue";
                                }
                                var coordinates = geometry.coordinates;
                                if (coordinates) {
                                    // make the same as MultiPolygon
                                    if (type == "Polygon") {
                                        coordinates = [coordinates];
                                    }
                                }
                                // find data object in user-provided data
                                var dataObject = $array.find(this_1.data, function (value, i) {
                                    return value.id == id_1;
                                });
                                // create one if not found
                                if (!dataObject) {
                                    dataObject = { multiPolygon: coordinates, id: id_1, madeFromGeoData: true };
                                    this_1.data.push(dataObject);
                                }
                                // in case found
                                else {
                                    // if user-provided object doesn't have points data provided in any way:
                                    if (!dataObject.multiPolygon) {
                                        dataObject.multiPolygon = coordinates;
                                    }
                                }
                                // copy properties data to datacontext
                                $utils.softCopyProperties(feature.properties, dataObject);
                            }
                        }
                    };
                    var this_1 = this;
                    for (var i = 0, len = features.length; i < len; i++) {
                        _loop_1(i, len);
                    }
                }
            }
        }
        _super.prototype.validateData.call(this);
    };
    /**
     * (Re)validates the series
     *
     * @ignore Exclude from docs
     */
    MapPolygonSeries.prototype.validate = function () {
        _super.prototype.validate.call(this);
        this.dataItems.each(function (dataItem) {
            $utils.used(dataItem.mapPolygon);
        });
        if (this.sortPolygonsBy != "none") {
            var sortBy_1 = this.sortPolygonsBy;
            var reversed_1 = this.sortPolygonsReversed;
            this.mapPolygons.sort(function (a, b) {
                var valA = "";
                var valB = "";
                var dirA = -1;
                var dirB = 1;
                switch (sortBy_1) {
                    case "area":
                        valA = a.boxArea;
                        valB = b.boxArea;
                        dirA = -1;
                        dirB = 1;
                        break;
                    case "name":
                        valA = a.dataItem.dataContext.name || "";
                        valB = b.dataItem.dataContext.name || "";
                        dirA = 1;
                        dirB = -1;
                        break;
                    case "id":
                        valA = a.dataItem.dataContext.id || "";
                        valB = b.dataItem.dataContext.id || "";
                        dirA = 1;
                        dirB = -1;
                        break;
                    case "latitude":
                        valA = reversed_1 ? a.south : a.north;
                        valB = reversed_1 ? b.south : b.north;
                        dirA = -1;
                        dirB = 1;
                        break;
                    case "longitude":
                        valA = reversed_1 ? a.east : a.west;
                        valB = reversed_1 ? b.east : b.west;
                        dirA = 1;
                        dirB = -1;
                        break;
                }
                if (valA < valB) {
                    return reversed_1 ? dirB : dirA;
                }
                if (valA > valB) {
                    return reversed_1 ? dirA : dirB;
                }
                return 0;
            });
            this.mapPolygons.each(function (mapPolygon, index) {
                mapPolygon.validate();
                // makes small go first to avoid hover problems with IE
                if (!mapPolygon.zIndex && !mapPolygon.propertyFields.zIndex) {
                    mapPolygon.zIndex = 1000000 - index;
                }
            });
        }
    };
    Object.defineProperty(MapPolygonSeries.prototype, "mapPolygons", {
        /**
         * List of polygon elements in the series.
         *
         * @return Polygon list
         */
        get: function () {
            if (!this._mapPolygons) {
                var polygonTemplate = new MapPolygon();
                var mapPolygons = new ListTemplate(polygonTemplate);
                this._disposers.push(new ListDisposer(mapPolygons));
                this._disposers.push(mapPolygons.template);
                mapPolygons.template.focusable = true;
                mapPolygons.events.on("inserted", this.handleObjectAdded, this, false);
                this._mapPolygons = mapPolygons;
                this._mapObjects = mapPolygons;
            }
            return this._mapPolygons;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * returns MapPolygon by id in geoJSON file
     * @param polygon id
     * @return {MapPolygon}
     */
    MapPolygonSeries.prototype.getPolygonById = function (id) {
        return $iter.find(this.mapPolygons.iterator(), function (mapPolygon) {
            var dataContext = mapPolygon.dataItem.dataContext;
            return dataContext.id == id;
        });
    };
    /**
     * Copies all properties from another instance of [[Series]].
     *
     * @param source  Source series
     */
    MapPolygonSeries.prototype.copyFrom = function (source) {
        this.mapPolygons.template.copyFrom(source.mapPolygons.template);
        _super.prototype.copyFrom.call(this, source);
    };
    /**
     * @ignore
     */
    MapPolygonSeries.prototype.getFeatures = function () {
        var _this = this;
        var features = [];
        this.dataItems.each(function (dataItem) {
            var feature = dataItem.getFeature();
            if (feature) {
                features.push(feature);
            }
        });
        this.mapPolygons.each(function (mapPolygon) {
            if (_this.dataItems.indexOf(mapPolygon._dataItem) == -1) {
                var feature = mapPolygon.getFeature();
                if (feature) {
                    features.push(feature);
                }
            }
        });
        return features;
    };
    Object.defineProperty(MapPolygonSeries.prototype, "sortPolygonsBy", {
        /**
         * @return How to sort map polygons
         */
        get: function () {
            return this.getPropertyValue("sortPolygonsBy");
        },
        /**
         * How to order polygons in actual SVG document. Affects selection order
         * using TAB key.
         *
         * Available options: `"area"` (default), `"name"`, `"longitude"`,
         * `"latitude"`, `"id"`, and `"none"`.
         *
         * @default area
         * @since 4.9.36
         * @param value  How to sort map polygons
         */
        set: function (value) {
            if (this.setPropertyValue("sortPolygonsBy", value)) {
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapPolygonSeries.prototype, "sortPolygonsReversed", {
        /**
         * @return Reverse polygon sort direction
         */
        get: function () {
            return this.getPropertyValue("sortPolygonsReversed");
        },
        /**
         * If `sortPolygonsBy` is set to something other than `"none"`, polygons
         * will be sorted by the given parameter, using natural sort direction.
         *
         * Setting `sortPolygonsReversed = true` will reverse this direction.
         *
         * @default false
         * @since 4.9.36
         * @param value  Reverse polygon sort direction
         */
        set: function (value) {
            if (this.setPropertyValue("sortPolygonsReversed", value)) {
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    return MapPolygonSeries;
}(MapSeries));
export { MapPolygonSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapPolygonSeries"] = MapPolygonSeries;
registry.registeredClasses["MapPolygonSeriesDataItem"] = MapPolygonSeriesDataItem;
//# sourceMappingURL=MapPolygonSeries.js.map