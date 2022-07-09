/**
 * Map object module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../../core/Container";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
import * as d3geo from "d3-geo";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for all map objects: lines, images, etc.
 *
 * @see {@link IMapObjectEvents} for a list of available events
 * @see {@link IMapObjectAdapters} for a list of available Adapters
 */
var MapObject = /** @class */ (function (_super) {
    __extends(MapObject, _super);
    /**
     * Constructor
     */
    function MapObject() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "MapObject";
        // Set defaults
        _this.isMeasured = false;
        _this.layout = "none";
        _this.clickable = true;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * (Re)validates this object, forcing it to redraw.
     *
     * @ignore Exclude from docs
     */
    MapObject.prototype.validate = function () {
        if (this.series && this.series.itemReaderText) {
            this.readerTitle = this.series.itemReaderText;
        }
        _super.prototype.validate.call(this);
    };
    /**
     * Updates the item's bounding coordinates: coordinates of the East, West,
     * North, and South-most points.
     *
     * @ignore Exclude from docs
     */
    MapObject.prototype.updateExtremes = function () {
        var feature = this.getFeature();
        if (feature) {
            var geometry = feature.geometry;
            if (geometry) {
                var bounds = d3geo.geoBounds(geometry);
                var west = bounds[0][0];
                var south = bounds[0][1];
                var north = bounds[1][1];
                var east = bounds[1][0];
                var changed = false;
                if (north != this.north) {
                    this._north = $math.round(north, 8);
                    changed = true;
                }
                if (south != this.south) {
                    this._south = $math.round(south);
                    changed = true;
                }
                if (east != this.east) {
                    this._east = $math.round(east);
                    changed = true;
                }
                if (west != this.west) {
                    this._west = $math.round(west);
                    changed = true;
                }
                if (changed) {
                    this.dispatch("geoBoundsChanged");
                    if (this.series) {
                        this.series.invalidateDataItems();
                    }
                }
            }
        }
    };
    /**
     * @ignore
     */
    MapObject.prototype.getFeature = function () {
        return {};
    };
    Object.defineProperty(MapObject.prototype, "east", {
        /**
         * Longitude of the East-most point of the element.
         */
        get: function () {
            if ($type.isNumber(this._east)) {
                return this._east;
            }
            else if (this.dataItem) {
                return this.dataItem.east;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapObject.prototype, "west", {
        /**
         * Longitude of the West-most point of the element.
         */
        get: function () {
            if ($type.isNumber(this._west)) {
                return this._west;
            }
            else if (this.dataItem) {
                return this.dataItem.west;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapObject.prototype, "south", {
        /**
         * Latitude of the South-most point of the element.
         */
        get: function () {
            if ($type.isNumber(this._south)) {
                return this._south;
            }
            else if (this.dataItem) {
                return this.dataItem.south;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapObject.prototype, "north", {
        /**
         * Latitude of the North-most point of the element.
         */
        get: function () {
            if ($type.isNumber(this._north)) {
                return this._north;
            }
            else if (this.dataItem) {
                return this.dataItem.north;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Shows the element's [[Tooltip]].
     *
     * A tooltip will be populated using text templates in either `tooltipHTML` or
     * `tooltipText` as well as data in `tooltipDataItem`.
     *
     * @see {@link Tooltip}
     * @param optional point (sprite-related) to which tooltip must point.
     * @return returns true if the tooltip was shown and false if it wasn't (no text was found)
     */
    MapObject.prototype.showTooltip = function (point) {
        var res = _super.prototype.showTooltip.call(this, point);
        if (res && this.showTooltipOn == "always" && !this.series.chart.events.has("mappositionchanged", this.handleTooltipMove, this)) {
            this.addDisposer(this.series.chart.events.on("mappositionchanged", this.handleTooltipMove, this));
        }
        return res;
    };
    MapObject.prototype.handleTooltipMove = function (ev) {
        if (!this.tooltip.isHidden) {
            this.showTooltip();
        }
    };
    /**
     * Sets a [[DataItem]].
     * @param dataItem DataItem
     */
    MapObject.prototype.setDataItem = function (dataItem) {
        _super.prototype.setDataItem.call(this, dataItem);
        this.applyAccessibility();
    };
    return MapObject;
}(Container));
export { MapObject };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapObject"] = MapObject;
//# sourceMappingURL=MapObject.js.map