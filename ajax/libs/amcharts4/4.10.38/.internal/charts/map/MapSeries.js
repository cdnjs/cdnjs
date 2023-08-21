/**
 * Map series module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Series, SeriesDataItem } from "../series/Series";
import { registry } from "../../core/Registry";
import * as $type from "../../core/utils/Type";
import * as $math from "../../core/utils/Math";
import * as d3geo from "d3-geo";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapSeries]].
 *
 * @see {@link DataItem}
 */
var MapSeriesDataItem = /** @class */ (function (_super) {
    __extends(MapSeriesDataItem, _super);
    /**
     * Constructor
     */
    function MapSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "MapSeriesDataItem";
        _this.values.value = {};
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(MapSeriesDataItem.prototype, "value", {
        /**
         * @return Value
         */
        get: function () {
            return this.values.value.value;
        },
        /**
         * Numeric value of the data item.
         *
         * Value may be used in heat-map calculations.
         *
         * @param value  Value
         */
        set: function (value) {
            this.setValue("value", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeriesDataItem.prototype, "zoomLevel", {
        /**
         * @return Zoom level
         */
        get: function () {
            return this.properties["zoomLevel"];
        },
        /**
         * When `zoomToMapObject()` is called the map will either calculate suitable
         * zoom level itself or use object's `zoomLevel` if set.
         *
         * @param value  Zoom level
         */
        set: function (value) {
            this.setProperty("zoomLevel", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeriesDataItem.prototype, "zoomGeoPoint", {
        /**
         * @return Zoom geo point
         */
        get: function () {
            return this.properties["zoomGeoPoint"];
        },
        /**
         * When `zoomToMapObject()` is called the map will either calculate suitable
         * center position itself or use object's `zoomGeoPoint` if set.
         *
         * @param value  Zoom geo point
         */
        set: function (value) {
            this.setProperty("zoomGeoPoint", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeriesDataItem.prototype, "east", {
        /**
         * Longitude of the East-most point of the element.
         */
        get: function () {
            return this._east;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeriesDataItem.prototype, "west", {
        /**
         * Longitude of the West-most point of the element.
         */
        get: function () {
            return this._west;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeriesDataItem.prototype, "south", {
        /**
         * Latitude of the South-most point of the element.
         */
        get: function () {
            return this._south;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeriesDataItem.prototype, "north", {
        /**
         * Latitude of the North-most point of the element.
         */
        get: function () {
            return this._north;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates the item's bounding coordinates: coordinates of the East, West,
     * North, and South-most points.
     *
     * @ignore Exclude from docs
     */
    MapSeriesDataItem.prototype.updateExtremes = function () {
        var geometry = this.getFeature().geometry;
        if (geometry) {
            var bounds = d3geo.geoBounds(geometry);
            var west = bounds[0][0];
            var south = bounds[0][1];
            var north = bounds[1][1];
            var east = bounds[1][0];
            var changed = false;
            if (north != this.north) {
                this._north = $math.round(north, 6);
                changed = true;
            }
            if (south != this.south) {
                this._south = $math.round(south, 6);
                changed = true;
            }
            if (east != this.east) {
                this._east = $math.round(east, 6);
                changed = true;
            }
            if (west != this.west) {
                this._west = $math.round(west, 6);
                changed = true;
            }
            // solves single russia prob
            if (this._east < this._west) {
                this._east = 180;
                this._west = -180;
            }
            if (changed) {
                this.component.invalidateDataItems();
            }
        }
    };
    MapSeriesDataItem.prototype.getFeature = function () {
        return {};
    };
    return MapSeriesDataItem;
}(SeriesDataItem));
export { MapSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for series of map objects.
 *
 * @see {@link IMapSeriesEvents} for a list of available Events
 * @see {@link IMapSeriesAdapters} for a list of available Adapters
 * @important
 */
var MapSeries = /** @class */ (function (_super) {
    __extends(MapSeries, _super);
    /**
     * Constructor
     */
    function MapSeries() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "MapSeries";
        // Set defaults
        _this.isMeasured = false;
        _this.nonScalingStroke = true;
        // Set data fields
        _this.dataFields.value = "value";
        _this.ignoreBounds = false;
        if (_this.tooltip) {
            _this.tooltip.showInViewport = true;
        }
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
    MapSeries.prototype.createDataItem = function () {
        return new MapSeriesDataItem();
    };
    /**
     * Checks whether object should be included in series.
     *
     * @param includes  A list of explicitly included ids
     * @param excludes  A list of explicitly excluded ids
     * @param id        Id of the object
     * @return Include?
     */
    MapSeries.prototype.checkInclude = function (includes, excludes, id) {
        if (includes) {
            if (includes.length == 0) {
                return false;
            }
            else {
                if (includes.indexOf(id) == -1) {
                    return false;
                }
            }
        }
        if (excludes && excludes.length > 0) {
            if (excludes.indexOf(id) != -1) {
                return false;
            }
        }
        return true;
    };
    Object.defineProperty(MapSeries.prototype, "useGeodata", {
        /**
         * @return Use GeoJSON data?
         */
        get: function () {
            return this.getPropertyValue("useGeodata");
        },
        /**
         * Should the map extract all the data about element from the GeoJSON?
         *
         * This is especially relevant for [[MapPolygonSeries]]. If not set to `true`
         * polygon series will need to contain geographical data in itself in order
         * to be drawn.
         *
         * If this is set to `true`, series will try to extract data for its objects
         * from either chart-level `geodata` or from series' `geodata` which holds
         * map infor in GeoJSON format.
         *
         * @default false
         * @param value  Use GeoJSON data?
         */
        set: function (value) {
            if (this.setPropertyValue("useGeodata", value)) {
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeries.prototype, "include", {
        /**
         * @return Included objects
         */
        get: function () {
            return this.getPropertyValue("include");
        },
        /**
         * A list of object ids that should be explictly included in the series.
         *
         * If this is not set, the series will automatically include all of the
         * objects, available in the GeoJSON map. (minus the ones listed in
         * `exclude`)
         *
         * If you need to display only specific objects, use `include`. E.g.:
         *
         * `include = ["FR", "ES", "DE"];`
         *
         * The above will show only France, Spain, and Germany out of the whole map.
         *
         * @param value  Included objects
         */
        set: function (value) {
            if (this.setPropertyValue("include", value)) {
                this.processIncExc();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    MapSeries.prototype.processIncExc = function () {
        //this.data = [];
        this.invalidateData();
    };
    Object.defineProperty(MapSeries.prototype, "ignoreBounds", {
        /**
         * @return Ignore bounds?
         */
        get: function () {
            return this.getPropertyValue("ignoreBounds");
        },
        /**
         * Should this series be included when calculating bounds of the map?
         *
         * This affects initial zoom as well as limits for zoom/pan.
         *
         * By default, `MapPolygonSeries` included (true), while `MapImageSeries` and
         * `MapLineSeries` are not (`false`).
         *
         * @since 4.3.0
         * @param  value  Ignore bounds?
         */
        set: function (value) {
            if (this.setPropertyValue("ignoreBounds", value)) {
                if (this.chart) {
                    this.chart.updateExtremes();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeries.prototype, "exclude", {
        /**
         * @return Excluded ids
         */
        get: function () {
            return this.getPropertyValue("exclude");
        },
        /**
         * A list of object ids that should be excluded from the series.
         *
         * E.g. you want to include all of the areas from a GeoJSON map, except
         * Antarctica.
         *
         * You'd leave `include` empty, and set `exclude = ["AQ"]`.
         *
         * @param value  Excluded ids
         */
        set: function (value) {
            if (this.setPropertyValue("exclude", value)) {
                this.processIncExc();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Decorates a newly added object.
     *
     * @param event [description]
     */
    MapSeries.prototype.handleObjectAdded = function (event) {
        var mapObject = event.newValue;
        mapObject.parent = this;
        mapObject.series = this;
        mapObject.strokeWidth = mapObject.strokeWidth;
    };
    Object.defineProperty(MapSeries.prototype, "geodata", {
        /**
         * @return GeoJSON data
         */
        get: function () {
            return this._geodata;
        },
        /**
         * Map data in GeoJSON format.
         *
         * The series supports the following GeoJSON objects: `Point`, `LineString`,
         * `Polygon`, `MultiPoint`, `MultiLineString`, and `MultiPolygon`.
         *
         * @see {@link http://geojson.org/} Official GeoJSON format specification
         * @param geoJSON GeoJSON data
         */
        set: function (geodata) {
            if (geodata != this._geodata) {
                this._geodata = geodata;
                if (this.reverseGeodata) {
                    this.chart.processReverseGeodata(this._geodata);
                }
                for (var i = this.data.length - 1; i >= 0; i--) {
                    if (this.data[i].madeFromGeoData == true) {
                        this.data.splice(i, 1);
                    }
                }
                this.disposeData();
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeries.prototype, "reverseGeodata", {
        /**
         * @returns Reverse the order of geodata coordinates?
         */
        get: function () {
            return this.getPropertyValue("reverseGeodata");
        },
        /**
         * Indicates whether GeoJSON geodata supplied to the chart uses
         * ESRI (clockwise) or non-ESRI (counter-clockwise) order of the polygon
         * coordinates.
         *
         * `MapChart` supports only ESRI standard, so if your custom maps appears
         * garbled, try setting `reverseGeodata = true`.
         *
         * @default false
         * @since 4.10.11
         * @param  value  Reverse the order of geodata coordinates?
         */
        set: function (value) {
            if (this.setPropertyValue("reverseGeodata", value) && this._geodata) {
                this.chart.processReverseGeodata(this._geodata);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeries.prototype, "geodataSource", {
        /**
         * Returns a [[DataSource]] specifically for loading Component's data.
         *
         * @return Data source
         */
        get: function () {
            if (!this._dataSources["geodata"]) {
                this.getDataSource("geodata");
            }
            return this._dataSources["geodata"];
        },
        /**
         * Sets a [[DataSource]] to be used for loading Component's data.
         *
         * @param value Data source
         */
        set: function (value) {
            var _this = this;
            if (this._dataSources["geodata"]) {
                this.removeDispose(this._dataSources["geodata"]);
            }
            this._dataSources["geodata"] = value;
            this._dataSources["geodata"].component = this;
            this.events.on("inited", function () {
                _this.loadData("geodata");
            }, undefined, false);
            this.setDataSourceEvents(value, "geodata");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    MapSeries.prototype.getFeatures = function () {
        return;
    };
    /**
     * @ignore
     */
    MapSeries.prototype.validateDataItems = function () {
        _super.prototype.validateDataItems.call(this);
        this.updateExtremes();
    };
    /**
     * @ignore
     */
    MapSeries.prototype.updateExtremes = function () {
        var north;
        var south;
        var east;
        var west;
        this.dataItems.each(function (dataItem) {
            if (dataItem.north > north || !$type.isNumber(north)) {
                north = dataItem.north;
            }
            if (dataItem.south < south || !$type.isNumber(south)) {
                south = dataItem.south;
            }
            if (dataItem.west < west || !$type.isNumber(west)) {
                west = dataItem.west;
            }
            if (dataItem.east > east || !$type.isNumber(east)) {
                east = dataItem.east;
            }
        });
        if (this._mapObjects) {
            this._mapObjects.each(function (mapObject) {
                if (mapObject.north > north || !$type.isNumber(north)) {
                    north = mapObject.north;
                }
                if (mapObject.south < south || !$type.isNumber(south)) {
                    south = mapObject.south;
                }
                if (mapObject.west < west || !$type.isNumber(west)) {
                    west = mapObject.west;
                }
                if (mapObject.east > east || !$type.isNumber(east)) {
                    east = mapObject.east;
                }
            });
        }
        if (this.north != north || this.east != east || this.south != south || this.west != west) {
            this._north = north;
            this._east = east;
            this._west = west;
            this._south = south;
            this.dispatch("geoBoundsChanged");
            if (!this.ignoreBounds) {
                this.chart.updateExtremes();
            }
        }
    };
    Object.defineProperty(MapSeries.prototype, "north", {
        /**
         * @return Latitude
         */
        get: function () {
            if ($type.isNumber(this._northDefined)) {
                return this._northDefined;
            }
            return this._north;
        },
        /**
         * North-most latitude of the series.
         *
         * By default, this holds auto-calculated latitude of the extremity.
         *
         * It can be overridden manually.
         *
         * @param  value  Latitude
         */
        set: function (value) {
            this._northDefined = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeries.prototype, "south", {
        /**
         * @return Latitude
         */
        get: function () {
            if ($type.isNumber(this._southDefined)) {
                return this._southDefined;
            }
            return this._south;
        },
        /**
         * South-most latitude of the series.
         *
         * By default, this holds auto-calculated latitude of the extremity.
         *
         * It can be overridden manually.
         *
         * @param  value  Latitude
         */
        set: function (value) {
            this._southDefined = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeries.prototype, "west", {
        /**
         * @return Longitude
         */
        get: function () {
            if ($type.isNumber(this._westDefined)) {
                return this._westDefined;
            }
            return this._west;
        },
        /**
         * West-most longitude of the series.
         *
         * By default, this holds auto-calculated longitude of the extremity.
         *
         * It can be overridden manually.
         *
         * @param  value  Longitude
         */
        set: function (value) {
            this._westDefined = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSeries.prototype, "east", {
        /**
         * @return Longitude
         */
        get: function () {
            if ($type.isNumber(this._eastDefined)) {
                return this._eastDefined;
            }
            return this._east;
        },
        /**
         * East-most longitude of the series.
         *
         * By default, this holds auto-calculated longitude of the extremity.
         *
         * It can be overridden manually.
         *
         * @param  value  Longitude
         */
        set: function (value) {
            this._eastDefined = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    MapSeries.prototype.processConfig = function (config) {
        if ($type.hasValue(config["geodata"]) && $type.isString(config["geodata"])) {
            var name_1 = config["geodata"];
            // Check if there's a map loaded by such name
            if ($type.hasValue(window["am4geodata_" + config["geodata"]])) {
                config["geodata"] = window["am4geodata_" + config["geodata"]];
            }
            // Nope. Let's try maybe we got JSON as string?
            else {
                try {
                    config["geodata"] = JSON.parse(config["geodata"]);
                }
                catch (e) {
                    // No go again. Error out.
                    throw Error("MapChart error: Geodata `" + name_1 + "` is not loaded or is incorrect.");
                }
            }
        }
        _super.prototype.processConfig.call(this, config);
    };
    /**
     * Adds `projection` to "as is" fields.
     *
     * @param field  Field name
     * @return Assign as is?
     */
    MapSeries.prototype.asIs = function (field) {
        return field == "geodata" || _super.prototype.asIs.call(this, field);
    };
    /**
     * @ignore
     */
    MapSeries.prototype.updateTooltipBounds = function () {
        if (this.tooltip && this.topParent) {
            this.tooltip.setBounds({ x: 10, y: 10, width: this.topParent.maxWidth - 20, height: this.topParent.maxHeight - 20 });
        }
    };
    return MapSeries;
}(Series));
export { MapSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapSeries"] = MapSeries;
registry.registeredClasses["MapSeriesDataItem"] = MapSeriesDataItem;
//# sourceMappingURL=MapSeries.js.map