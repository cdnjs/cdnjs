/**
 * Percent chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SerialChart, SerialChartDataItem } from "./SerialChart";
import { PercentSeries } from "../series/PercentSeries";
import { registry } from "../../core/Registry";
import * as $iter from "../../core/utils/Iterator";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PercentChart]].
 *
 * @see {@link DataItem}
 */
var PercentChartDataItem = /** @class */ (function (_super) {
    __extends(PercentChartDataItem, _super);
    /**
     * Constructor
     */
    function PercentChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "PercentChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return PercentChartDataItem;
}(SerialChartDataItem));
export { PercentChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This is a base class for "percent-based" chart types like Pie and Funnel.
 *
 * @see {@link IPercentChartEvents} for a list of available Events
 * @see {@link IPercentChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/pie-chart/} for Pie chart documentation
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/sliced-chart/} for Sliced chart documentation
 */
var PercentChart = /** @class */ (function (_super) {
    __extends(PercentChart, _super);
    /**
     * Constructor
     */
    function PercentChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "PercentChart";
        _this.align = "none";
        _this.valign = "none";
        // so that the chart is always drawn, even the legend wants all the space
        _this.chartContainer.minHeight = 50;
        _this.chartContainer.minWidth = 50;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * (Re)validates chart data.
     *
     * @ignore Exclude from docs
     */
    PercentChart.prototype.validateData = function () {
        _super.prototype.validateData.call(this);
        this.feedLegend();
    };
    /**
     * Setups the legend to use the chart's data.
     * @ignore
     */
    PercentChart.prototype.feedLegend = function () {
        var legend = this.legend;
        if (legend) {
            var legendData_1 = [];
            $iter.each(this.series.iterator(), function (series) {
                if (!series.hiddenInLegend) {
                    $iter.each(series.dataItems.iterator(), function (dataItem) {
                        if (!dataItem.hiddenInLegend) {
                            legendData_1.push(dataItem);
                            if (!dataItem.legendSettings) {
                                dataItem.legendSettings = series.legendSettings;
                            }
                        }
                    });
                }
            });
            legend.data = legendData_1;
            legend.dataFields.name = "category";
        }
    };
    /**
     * Creates a new [[PercentSeries]].
     *
     * @return New series
     */
    PercentChart.prototype.createSeries = function () {
        return new PercentSeries();
    };
    /**
     * @ignore
     */
    PercentChart.prototype.setLegend = function (legend) {
        _super.prototype.setLegend.call(this, legend);
        if (legend) {
            legend.labels.template.text = "{category}";
            legend.valueLabels.template.text = "{value.percent.formatNumber('#.0p')}";
            legend.itemContainers.template.events.on("over", function (event) {
                var percentSeriesDataItem = event.target.dataItem.dataContext;
                if (percentSeriesDataItem.visible && !percentSeriesDataItem.isHiding) {
                    var slice = percentSeriesDataItem.slice;
                    slice.dispatchImmediately("over");
                    slice.isHover = true;
                    slice.interactions.isRealHover = true;
                }
            });
            legend.itemContainers.template.events.on("out", function (event) {
                var percentSeriesDataItem = event.target.dataItem.dataContext;
                var slice = percentSeriesDataItem.slice;
                slice.dispatchImmediately("out");
                slice.isHover = false;
            });
        }
    };
    return PercentChart;
}(SerialChart));
export { PercentChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @hidden
 */
registry.registeredClasses["PercentChart"] = PercentChart;
registry.registeredClasses["PercentChartDataItem"] = PercentChartDataItem;
//# sourceMappingURL=PercentChart.js.map