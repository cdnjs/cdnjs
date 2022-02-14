/**
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapObject } from "./MapObject";
import { registry } from "../../core/Registry";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to place an image on the map.
 *
 * @see {@link IMapImageEvents} for a list of available events
 * @see {@link IMapImageAdapters} for a list of available Adapters
 */
var MapImage = /** @class */ (function (_super) {
    __extends(MapImage, _super);
    /**
     * Constructor
     */
    function MapImage() {
        var _this = _super.call(this) || this;
        _this.className = "MapImage";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(MapImage.prototype, "latitude", {
        /**
         * @return Latitude
         */
        get: function () {
            var latitude = this.getPropertyValue("latitude");
            if (!$type.isNumber(latitude) && this.dataItem && this.dataItem.geoPoint) {
                latitude = this.dataItem.geoPoint.latitude;
            }
            return latitude;
        },
        /**
         * Latitude image is placed at.
         *
         * @param value  Latitude
         */
        set: function (value) {
            this.setPropertyValue("latitude", value, false, true);
            this.updateExtremes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapImage.prototype, "longitude", {
        /**
         * @return Longitude
         */
        get: function () {
            var longitude = this.getPropertyValue("longitude");
            if (!$type.isNumber(longitude) && this.dataItem && this.dataItem.geoPoint) {
                longitude = this.dataItem.geoPoint.longitude;
            }
            return longitude;
        },
        /**
         * Longitude image is placed on.
         *
         * @param value  Longitude
         */
        set: function (value) {
            this.setPropertyValue("longitude", value, false, true);
            this.updateExtremes();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Repositions the image to it's current position.
     *
     * @ignore Exclude from docs
     */
    MapImage.prototype.validatePosition = function () {
        if ($type.isNumber(this.latitude) && $type.isNumber(this.longitude)) {
            //this.moveTo(this.series.chart.projection.convert({ latitude: this.latitude, longitude: this.longitude }));
            var p = this.series.chart.projection.d3Projection([this.longitude, this.latitude]);
            var visible = this.series.chart.projection.d3Path({ type: 'Point', coordinates: [this.longitude, this.latitude] });
            if (!visible) {
                this.__disabled = true;
            }
            else {
                this.__disabled = false;
            }
            this.moveTo({ x: p[0], y: p[1] });
        }
        _super.prototype.validatePosition.call(this);
    };
    /**
     * @ignore
     */
    MapImage.prototype.getFeature = function () {
        return { "type": "Feature", geometry: { type: "Point", coordinates: [this.longitude, this.latitude] } };
    };
    return MapImage;
}(MapObject));
export { MapImage };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapImage"] = MapImage;
//# sourceMappingURL=MapImage.js.map