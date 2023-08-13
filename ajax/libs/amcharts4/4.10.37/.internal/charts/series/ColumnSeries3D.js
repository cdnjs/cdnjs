/**
 * 3D column series module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, ColumnSeriesDataItem } from "../series/ColumnSeries";
import { Column3D } from "../elements/Column3D";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
var ColumnSeries3DDataItem = /** @class */ (function (_super) {
    __extends(ColumnSeries3DDataItem, _super);
    /**
     * Constructor
     */
    function ColumnSeries3DDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "ColumnSeries3DDataItem";
        _this.applyTheme();
        return _this;
    }
    return ColumnSeries3DDataItem;
}(ColumnSeriesDataItem));
export { ColumnSeries3DDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a 3D column graph.
 *
 * @see {@link IColumnSeries3DEvents} for a list of available Events
 * @see {@link IColumnSeries3DAdapters} for a list of available Adapters
 * @todo Example
 * @important
 */
var ColumnSeries3D = /** @class */ (function (_super) {
    __extends(ColumnSeries3D, _super);
    /**
     * Constructor
     */
    function ColumnSeries3D() {
        var _this = _super.call(this) || this;
        _this.className = "ColumnSeries3D";
        _this.columns.template.column3D.applyOnClones = true;
        _this.columns.template.hiddenState.properties.visible = true;
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(ColumnSeries3D.prototype, "columnsContainer", {
        /**
         * @ignore
         */
        get: function () {
            var chart = this.chart;
            if (chart && chart.columnsContainer && chart.leftAxesContainer.layout != "vertical" && chart.rightAxesContainer.layout != "vertical" && chart.bottomAxesContainer.layout != "horizontal" && chart.topAxesContainer.layout != "horizontal") {
                return chart.columnsContainer;
            }
            else {
                return this._columnsContainer;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Validates data item's elements.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    ColumnSeries3D.prototype.validateDataElementReal = function (dataItem) {
        _super.prototype.validateDataElementReal.call(this, dataItem);
        if (dataItem.column) {
            dataItem.column.dx = this.dx;
            dataItem.column.dy = this.dy;
            dataItem.column.visible = this.visible;
        }
    };
    /**
     * Validates data item's elements.
     *
     * @ignore Exclude from docs
     */
    ColumnSeries3D.prototype.validateDataElements = function () {
        _super.prototype.validateDataElements.call(this);
        if (this.chart) {
            this.chart.invalidateLayout();
        }
    };
    /**
     * Returns an element to use for 3D bar.
     * @ignore
     * @return Element.
     */
    ColumnSeries3D.prototype.createColumnTemplate = function () {
        return new Column3D();
    };
    Object.defineProperty(ColumnSeries3D.prototype, "depth", {
        /**
         * @ignore Exclude from docs
         * @return Depth (px)
         */
        get: function () {
            return this.getPropertyValue("depth");
        },
        /**
         * Depth (height) of the slices in the series in pixels.
         *
         * @ignore Exclude from docs
         * @param value  Depth (px)
         */
        set: function (value) {
            this.setPropertyValue("depth", value, true);
            var template = this.columns.template; // todo: Cone is not Rectangle3D, maybe we should do some I3DShape?
            template.column3D.depth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnSeries3D.prototype, "angle", {
        /**
         * @ignore Exclude from docs
         * @return Angle (0-360)
         */
        get: function () {
            return this.getPropertyValue("angle");
        },
        /**
         * Angle of view for the slices in series. (0-360)
         *
         * @ignore Exclude from docs
         * @param value  Angle (0-360)
         */
        set: function (value) {
            this.setPropertyValue("angle", value);
            var template = this.columns.template;
            template.column3D.angle = value;
        },
        enumerable: true,
        configurable: true
    });
    return ColumnSeries3D;
}(ColumnSeries));
export { ColumnSeries3D };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["ColumnSeries3D"] = ColumnSeries3D;
registry.registeredClasses["ColumnSeries3DDataItem"] = ColumnSeries3DDataItem;
//# sourceMappingURL=ColumnSeries3D.js.map