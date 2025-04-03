/**
 * CurvedColumnSeries module.
 *
 * Not recommended using if you use scrollbars or your chart is zoomable in some other way.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ColumnSeries, ColumnSeriesDataItem } from "./ColumnSeries";
import { CurvedColumn } from "../elements/CurvedColumn";
import { registry } from "../../core/Registry";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[CurvedColumnSeries]].
 *
 * @see {@link DataItem}
 */
var CurvedColumnSeriesDataItem = /** @class */ (function (_super) {
    __extends(CurvedColumnSeriesDataItem, _super);
    /**
     * Constructor
     */
    function CurvedColumnSeriesDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "CurvedColumnSeriesDataItem";
        _this.applyTheme();
        return _this;
    }
    return CurvedColumnSeriesDataItem;
}(ColumnSeriesDataItem));
export { CurvedColumnSeriesDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[Series]] for a curved columns graph.
 *
 * @see {@link ICurvedColumnSeriesEvents} for a list of available Events
 * @see {@link ICurvedColumnSeriesAdapters} for a list of available Adapters
 * @important
 */
var CurvedColumnSeries = /** @class */ (function (_super) {
    __extends(CurvedColumnSeries, _super);
    /**
     * Constructor
     */
    function CurvedColumnSeries() {
        var _this = _super.call(this) || this;
        _this.className = "CurvedColumnSeries";
        _this.applyTheme();
        return _this;
    }
    /**
     * Returns an element to use for the curved column.
     *
     * @ignore Exclude from docs
     * @return Element.
     */
    CurvedColumnSeries.prototype.createColumnTemplate = function () {
        return new CurvedColumn();
    };
    /**
     * Validates data item's elements.
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    CurvedColumnSeries.prototype.validateDataElementReal = function (dataItem) {
        _super.prototype.validateDataElementReal.call(this, dataItem);
        var column = dataItem.column;
        column = dataItem.column;
        if (column) {
            var curvedColumn = dataItem.column.curvedColumn;
            curvedColumn.fill = dataItem.column.fill;
            if (this.baseAxis == this.yAxis) {
                column.orientation = "horizontal";
            }
            else {
                column.orientation = "vertical";
            }
        }
    };
    return CurvedColumnSeries;
}(ColumnSeries));
export { CurvedColumnSeries };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["CurvedColumnSeries"] = CurvedColumnSeries;
registry.registeredClasses["CurvedColumnSeriesDataItem"] = CurvedColumnSeriesDataItem;
//# sourceMappingURL=CurvedColumnSeries.js.map