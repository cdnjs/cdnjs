/**
 * Sliced chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PercentChart, PercentChartDataItem } from "./PercentChart";
import { registry } from "../../core/Registry";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SlicedChart]].
 *
 * @see {@link DataItem}
 */
var SlicedChartDataItem = /** @class */ (function (_super) {
    __extends(SlicedChartDataItem, _super);
    /**
     * Constructor
     */
    function SlicedChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "SlicedChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return SlicedChartDataItem;
}(PercentChartDataItem));
export { SlicedChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Sliced chart.
 *
 * @see {@link ISlicedChartEvents} for a list of available Events
 * @see {@link ISlicedChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sliced-chart/} for documentation
 * @important
 */
var SlicedChart = /** @class */ (function (_super) {
    __extends(SlicedChart, _super);
    /**
     * Constructor
     */
    function SlicedChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "SlicedChart";
        _this.seriesContainer.layout = "horizontal";
        _this.padding(15, 15, 15, 15);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    SlicedChart.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Sliced chart");
        }
    };
    /**
     * (Re)validates the chart, causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    SlicedChart.prototype.validate = function () {
        _super.prototype.validate.call(this);
    };
    return SlicedChart;
}(PercentChart));
export { SlicedChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SlicedChart"] = SlicedChart;
registry.registeredClasses["SlicedChartDataItem"] = SlicedChartDataItem;
//# sourceMappingURL=SlicedChart.js.map