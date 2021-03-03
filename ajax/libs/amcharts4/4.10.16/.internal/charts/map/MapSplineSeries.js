/**
 * Map spline series module
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { MapLineSeries, MapLineSeriesDataItem } from "./MapLineSeries";
import { MapSpline } from "./MapSpline";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[MapSplineSeries]]
 * @see {@link DataItem}
 */
var MapSplineSeriesDataItem = /** @class */ (function (_super) {
    __extends(MapSplineSeriesDataItem, _super);
    /**
     * Constructor
     */
    function MapSplineSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "MapSplineSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return MapSplineSeriesDataItem;
}(MapLineSeriesDataItem));
export { MapSplineSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A series of map spline elements.
 *
 * @see {@link IMapSplineSeriesEvents} for a list of available Events
 * @see {@link IMapSplineSeriesAdapters} for a list of available Adapters
 * @important
 */
var MapSplineSeries = /** @class */ (function (_super) {
    __extends(MapSplineSeries, _super);
    /**
     * Constructor
     */
    function MapSplineSeries() {
        var _this = _super.call(this) || this;
        _this.className = "MapSplineSeries";
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    MapSplineSeries.prototype.createDataItem = function () {
        return new MapSplineSeriesDataItem();
    };
    /**
     * Returns a new line instance of suitable type.
     *
     * @return New line
     */
    MapSplineSeries.prototype.createLine = function () {
        return new MapSpline();
    };
    return MapSplineSeries;
}(MapLineSeries));
export { MapSplineSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["MapSplineSeries"] = MapSplineSeries;
registry.registeredClasses["MapSplineSeriesDataItem"] = MapSplineSeriesDataItem;
//# sourceMappingURL=MapSplineSeries.js.map