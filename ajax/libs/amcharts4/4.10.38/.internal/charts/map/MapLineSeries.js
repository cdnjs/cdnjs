/**
 * Map line series module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapSeries, MapSeriesDataItem } from "./MapSeries";
import { MapLine } from "./MapLine";
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
 * Defines a [[DataItem]] for [[MapLineSeries]]
 * @see {@link DataItem}
 */
var MapLineSeriesDataItem = /** @class */ (function (_super) {
    __extends(MapLineSeriesDataItem, _super);
    /**
     * Constructor
     */
    function MapLineSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "MapLineSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    MapLineSeriesDataItem.prototype.getFeature = function () {
        if (this.multiLine && this.multiLine.length > 0) {
            return { "type": "Feature", geometry: { type: "MultiLineString", coordinates: this.multiLine } };
        }
    };
    Object.defineProperty(MapLineSeriesDataItem.prototype, "mapLine", {
        /**
         * A [[MapLine]] element related to this data item.
         *
         * @readonly
         * @return Element
         */
        get: function () {
            var _this = this;
            if (!this._mapLine) {
                var mapLine_1 = this.component.mapLines.create();
                this._mapLine = mapLine_1;
                this.addSprite(mapLine_1);
                this._disposers.push(mapLine_1);
                this._disposers.push(new Disposer(function () {
                    if (_this.component) {
                        _this.component.mapLines.removeValue(mapLine_1);
                    }
                }));
                this.mapObject = mapLine_1;
            }
            return this._mapLine;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLineSeriesDataItem.prototype, "line", {
        /**
         * @return Coordinates
         */
        get: function () {
            return this._line;
        },
        /**
         * A collection of X/Y coordinates for a single-segment line. E.g.:
         *
         * ```JSON
         * [
         *   [ 100, 150 ],
         *   [ 120, 200 ]
         * ]
         * ```
         *
         * @param line  Coordinates
         */
        set: function (line) {
            this._line = line;
            this.multiLine = [line];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLineSeriesDataItem.prototype, "multiLine", {
        /**
         * @return Coordinates
         */
        get: function () {
            return this._multiLine;
        },
        /**
         * A collection of X/Y coordinates for a multi-segment line. E.g.:
         *
         * ```JSON
         * [
         *   // Segment 1
         *   [
         *     [ 100, 150 ],
         *     [ 120, 200 ]
         *   ],
         *
         *   // Segment 2
         *   [
         *     [ 120, 200 ],
         *     [ 150, 100 ]
         *   ]
         * ]
         * ```
         *
         * @param multiLine  Coordinates
         */
        set: function (multiLine) {
            this._multiLine = multiLine;
            this._multiGeoLine = $mapUtils.multiLineToGeo(multiLine);
            this.updateExtremes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLineSeriesDataItem.prototype, "geoLine", {
        /**
         * @return Coordinates
         */
        get: function () {
            return this._geoLine;
        },
        /**
         * A collection of lat/long coordinates for a single-segment line. E.g.:
         *
         * ```JSON
         * [
         *   { longitude: 3.121, latitude: 0.58 },
         *   { longitude: -5.199, latitude: 21.223 }
         * ]
         * ```
         *
         * @see {@link https://tools.ietf.org/html/rfc7946#section-3.1.4} GeoJSON LineString reference
         * @param geoLine  Coordinates
         */
        set: function (geoLine) {
            this._geoLine = geoLine;
            this.multiLine = $mapUtils.multiGeoLineToMultiLine([geoLine]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLineSeriesDataItem.prototype, "multiGeoLine", {
        /**
         * @return Coordinates
         */
        get: function () {
            return this._multiGeoLine;
        },
        /**
         * A collection of X/Y coordinates for a multi-segment line. E.g.:
         *
         * ```JSON
         * [
         *   // Segment 1
         *   [
         *     { longitude: 3.121, latitude: 0.58 },
         *     { longitude: -5.199, latitude: 21.223 }
         *   ],
         *
         *   // Segment 2
         *   [
         *     { longitude: -5.199, latitude: 21.223 },
         *     { longitude: -12.9, latitude: 25.85 }
         *   ]
         * ]
         * ```
         *
         * @see {@link https://tools.ietf.org/html/rfc7946#section-3.1.5} GeoJSON MultiLineString reference
         * @param multiGeoLine  Coordinates
         */
        set: function (multiGeoLine) {
            this._multiGeoLine = multiGeoLine;
            this.multiLine = $mapUtils.multiGeoLineToMultiLine(multiGeoLine);
        },
        enumerable: true,
        configurable: true
    });
    return MapLineSeriesDataItem;
}(MapSeriesDataItem));
export { MapLineSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A series of map line series.
 *
 * @see {@link IMapLineSeriesEvents} for a list of available Events
 * @see {@link IMapLineSeriesAdapters} for a list of available Adapters
 * @important
 */
var MapLineSeries = /** @class */ (function (_super) {
    __extends(MapLineSeries, _super);
    /**
     * Constructor
     */
    function MapLineSeries() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "MapLineSeries";
        // Set data fields
        _this.dataFields.multiLine = "multiLine";
        _this.dataFields.line = "line";
        _this.dataFields.geoLine = "geoLine";
        _this.dataFields.multiGeoLine = "multiGeoLine";
        _this.ignoreBounds = true;
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
    MapLineSeries.prototype.createDataItem = function () {
        return new MapLineSeriesDataItem();
    };
    /**
     * (Re)validates series data, effectively causing the whole series to be
     * redrawn.
     *
     * @ignore Exclude from docs
     */
    MapLineSeries.prototype.validateData = function () {
        // process geoJSON and created map objects
        if (this.useGeodata || this.geodata) {
            var geoJSON = this.chart.geodata;
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
                            if (type == "LineString" || type == "MultiLineString") {
                                if (!this_1.checkInclude(this_1.include, this_1.exclude, id_1)) {
                                    return "continue";
                                }
                                var coordinates = geometry.coordinates;
                                var dataObject = $array.find(this_1.data, function (value, i) {
                                    return value.id == id_1;
                                });
                                if (type == "LineString") {
                                    coordinates = [coordinates];
                                }
                                if (!dataObject) {
                                    dataObject = { multiLine: coordinates, id: id_1, madeFromGeoData: true };
                                    this_1.data.push(dataObject);
                                }
                                else {
                                    if (!dataObject.multiLine) {
                                        dataObject.multiLine = coordinates;
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
    Object.defineProperty(MapLineSeries.prototype, "mapLines", {
        /**
         * A list of lines in the series.
         *
         * @return Lines
         */
        get: function () {
            if (!this._mapLines) {
                var lineTemplate = this.createLine();
                var mapLines = new ListTemplate(lineTemplate);
                this._disposers.push(new ListDisposer(mapLines));
                this._disposers.push(mapLines.template);
                mapLines.events.on("inserted", this.handleObjectAdded, this, false);
                this._mapLines = mapLines;
                this._mapObjects = mapLines;
            }
            return this._mapLines;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a new line instance of suitable type.
     *
     * @return New line
     */
    MapLineSeries.prototype.createLine = function () {
        return new MapLine();
    };
    /**
     * (Re)validates the series
     *
     * @ignore Exclude from docs
     */
    MapLineSeries.prototype.validate = function () {
        this.dataItems.each(function (dataItem) {
            $utils.used(dataItem.mapLine);
        });
        _super.prototype.validate.call(this);
        this.mapLines.each(function (mapLine) {
            mapLine.validate();
        });
    };
    /**
     * Copies all properties from another instance of [[Series]].
     *
     * @param source  Source series
     */
    MapLineSeries.prototype.copyFrom = function (source) {
        this.mapLines.template.copyFrom(source.mapLines.template);
        _super.prototype.copyFrom.call(this, source);
    };
    /**
     * @ignore
     */
    MapLineSeries.prototype.getFeatures = function () {
        var _this = this;
        var features = [];
        this.dataItems.each(function (dataItem) {
            var feature = dataItem.getFeature();
            if (feature) {
                features.push(feature);
            }
        });
        this.mapLines.each(function (mapLine) {
            if (_this.dataItems.indexOf(mapLine._dataItem) == -1) {
                var feature = mapLine.getFeature();
                if (feature) {
                    features.push(feature);
                }
            }
        });
        return features;
    };
    /**
     * returns MapLine by id
     * @param line id
     * @return {MapLine}
     */
    MapLineSeries.prototype.getLineById = function (id) {
        return $iter.find(this.mapLines.iterator(), function (mapLine) {
            var dataContext = mapLine.dataItem.dataContext;
            return dataContext.id == id;
        });
    };
    return MapLineSeries;
}(MapSeries));
export { MapLineSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapLineSeries"] = MapLineSeries;
registry.registeredClasses["MapLineSeriesDataItem"] = MapLineSeriesDataItem;
//# sourceMappingURL=MapLineSeries.js.map