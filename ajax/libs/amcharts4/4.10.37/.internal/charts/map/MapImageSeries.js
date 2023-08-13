/**
 * Map image series module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapSeries, MapSeriesDataItem } from "./MapSeries";
import { MapImage } from "./MapImage";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { registry } from "../../core/Registry";
import * as $array from "../../core/utils/Array";
import * as $mapUtils from "./MapUtils";
import * as $utils from "../../core/utils/Utils";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
import { Disposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapImageSeries]]
 * @see {@link DataItem}
 */
var MapImageSeriesDataItem = /** @class */ (function (_super) {
    __extends(MapImageSeriesDataItem, _super);
    /**
     * Constructor
     */
    function MapImageSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "MapImageSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    /**
     * @ignore
     */
    MapImageSeriesDataItem.prototype.getFeature = function () {
        return { "type": "Feature", geometry: { type: "Point", coordinates: this.point } };
    };
    Object.defineProperty(MapImageSeriesDataItem.prototype, "mapImage", {
        /**
         * A [[MapImage]] element related to this data item.
         *
         * @return Element
         */
        get: function () {
            var _this = this;
            if (!this._mapImage) {
                var mapImage_1 = this.component.mapImages.create();
                this.addSprite(mapImage_1);
                this._mapImage = mapImage_1;
                this._disposers.push(mapImage_1);
                this._disposers.push(new Disposer(function () {
                    if (_this.component) {
                        _this.component.mapImages.removeValue(mapImage_1);
                    }
                }));
                this.mapObject = mapImage_1;
            }
            return this._mapImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapImageSeriesDataItem.prototype, "point", {
        /**
         * @return [description]
         */
        get: function () {
            return this._point;
        },
        /**
         * [point description]
         *
         * @todo Description
         * @param point [description]
         */
        set: function (point) {
            this._point = point;
            this._geoPoint = $mapUtils.pointToGeo(point);
            this.updateExtremes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapImageSeriesDataItem.prototype, "multiPoint", {
        /**
         * @return [description]
         */
        get: function () {
            return [this._point];
        },
        /**
         * [point description]
         *
         * @todo Description
         * @param point [description]
         */
        set: function (multiPoint) {
            this._point = multiPoint[0];
            this._geoPoint = $mapUtils.pointToGeo(this._point);
            this.updateExtremes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapImageSeriesDataItem.prototype, "geoPoint", {
        /**
         * @return Image coordinates
         */
        get: function () {
            return this._geoPoint;
        },
        /**
         * Geographical coordinates (lat/long) image is placed at.
         *
         * @param geoPoint Image coordinates
         */
        set: function (geoPoint) {
            this._geoPoint = geoPoint;
            this.point = [geoPoint.longitude, geoPoint.latitude];
        },
        enumerable: true,
        configurable: true
    });
    return MapImageSeriesDataItem;
}(MapSeriesDataItem));
export { MapImageSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A series of map image (marker) elements.
 *
 * @see {@link IMapImageSeriesEvents} for a list of available Events
 * @see {@link IMapImageSeriesAdapters} for a list of available Adapters
 * @important
 */
var MapImageSeries = /** @class */ (function (_super) {
    __extends(MapImageSeries, _super);
    /**
     * Constructor
     */
    function MapImageSeries() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "MapImageSeries";
        // Set data fields
        _this.dataFields.multiPoint = "multiPoint";
        _this.dataFields.point = "point";
        _this.dataFields.geoPoint = "geoPoint";
        _this.dataFields.multiGeoPoint = "multiGeoPoint";
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
    MapImageSeries.prototype.createDataItem = function () {
        return new MapImageSeriesDataItem();
    };
    /**
     * (Re)validates the data of the sries, effectively forcing it to redraw
     * all of its elements.
     *
     * @ignore Exclude from docs
     */
    MapImageSeries.prototype.validateData = function () {
        var _this = this;
        if (this.data.length > 0 && this._parseDataFrom == 0) {
            this.mapImages.clear();
        }
        // process geoJSON and created map objects
        if (this.useGeodata) {
            if (this.useGeodata || this.geodata) {
                var geoJSON = this.chart.geodata;
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
                            if (type == "Point" || type == "MultiPoint") { // todo: we don't support multipoints at the moment actually
                                if (!this_1.checkInclude(this_1.include, this_1.exclude, id_1)) {
                                    return "continue";
                                }
                                var coordinates = geometry.coordinates;
                                // make the same as MultiPoint
                                if (type == "Point") {
                                    coordinates = [coordinates];
                                }
                                var dataObject = $array.find(this_1.data, function (value, i) {
                                    return value.id == id_1;
                                });
                                if (!dataObject) {
                                    dataObject = { multiPoint: coordinates, id: id_1, madeFromGeoData: true };
                                    this_1.data.push(dataObject);
                                }
                                else {
                                    if (!dataObject.multiPoint) {
                                        dataObject.multiPoint = coordinates;
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
        // important! this should go after super.validateData
        // if data is parsed in chunks, images list is corrupted, fix it here
        $iter.each(this.dataItems.iterator(), function (dataItem) {
            var mapImage = dataItem.mapImage;
            if (!mapImage.isDisposed()) {
                _this.mapImages.moveValue(mapImage);
                if ($type.isNumber(mapImage.latitude) && $type.isNumber(mapImage.latitude)) {
                    dataItem.geoPoint = { latitude: mapImage.latitude, longitude: mapImage.longitude };
                }
            }
        });
    };
    Object.defineProperty(MapImageSeries.prototype, "mapImages", {
        /**
         * A list of map images in the series.
         *
         * @return Map images
         */
        get: function () {
            if (!this._mapImages) {
                var template = new MapImage();
                var mapImages = new ListTemplate(template);
                this._disposers.push(new ListDisposer(mapImages));
                this._disposers.push(mapImages.template);
                mapImages.template.focusable = true;
                mapImages.events.on("inserted", this.handleObjectAdded, this, false);
                this._mapImages = mapImages;
                this._mapObjects = mapImages;
            }
            return this._mapImages;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * (Re)validates data element, effectively triggering its redrawal.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    MapImageSeries.prototype.validateDataElement = function (dataItem) {
        _super.prototype.validateDataElement.call(this, dataItem);
        dataItem.mapImage.invalidate();
    };
    /**
     * (Re)validates the series
     *
     * @ignore Exclude from docs
     */
    MapImageSeries.prototype.validate = function () {
        _super.prototype.validate.call(this);
        $iter.each(this.mapImages.iterator(), function (mapImage) {
            mapImage.validatePosition();
        });
    };
    /**
     * Copies all properties from another instance of [[Series]].
     *
     * @param source  Source series
     */
    MapImageSeries.prototype.copyFrom = function (source) {
        this.mapImages.template.copyFrom(source.mapImages.template);
        _super.prototype.copyFrom.call(this, source);
    };
    /**
     * @ignore
     */
    MapImageSeries.prototype.getFeatures = function () {
        var _this = this;
        var features = [];
        this.dataItems.each(function (dataItem) {
            var feature = dataItem.getFeature();
            if (feature) {
                features.push(feature);
            }
        });
        this.mapImages.each(function (mapImage) {
            if (_this.dataItems.indexOf(mapImage._dataItem) == -1) {
                var feature = mapImage.getFeature();
                if (feature) {
                    features.push(feature);
                }
            }
        });
        return features;
    };
    /**
     * returns MapImage by id
     * @param image id
     * @return {MapImage}
     */
    MapImageSeries.prototype.getImageById = function (id) {
        return $iter.find(this.mapImages.iterator(), function (mapImage) {
            var dataContext = mapImage.dataItem.dataContext;
            if (mapImage.id == id || (dataContext && dataContext.id == id)) {
                return true;
            }
        });
    };
    return MapImageSeries;
}(MapSeries));
export { MapImageSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapImageSeries"] = MapImageSeries;
registry.registeredClasses["MapImageSeriesDataItem"] = MapImageSeriesDataItem;
//# sourceMappingURL=MapImageSeries.js.map