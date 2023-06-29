/**
 * Serial chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Chart, ChartDataItem } from "../Chart";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { Container } from "../../core/Container";
import { Series } from "../series/Series";
import { percent } from "../../core/utils/Percent";
import { ColorSet } from "../../core/utils/ColorSet";
import { registry } from "../../core/Registry";
import * as $iter from "../../core/utils/Iterator";
import * as $type from "../../core/utils/Type";
import * as $array from "../../core/utils/Array";
import { Disposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[SerialChart]].
 *
 * @see {@link DataItem}
 */
var SerialChartDataItem = /** @class */ (function (_super) {
    __extends(SerialChartDataItem, _super);
    /**
     * Constructor
     */
    function SerialChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "SerialChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return SerialChartDataItem;
}(ChartDataItem));
export { SerialChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A base class for all series-based charts, like XY, Pie, etc.
 *
 * Is not useful on its own.
 *
 * @see {@link ISerialChartEvents} for a list of available Events
 * @see {@link ISerialChartAdapters} for a list of available Adapters
 */
var SerialChart = /** @class */ (function (_super) {
    __extends(SerialChart, _super);
    /**
     * Constructor
     */
    function SerialChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this._exitDP = {};
        _this.className = "SerialChart";
        _this.colors = new ColorSet();
        _this._usesData = false;
        // Create a container for series
        var seriesContainer = _this.chartContainer.createChild(Container);
        seriesContainer.shouldClone = false;
        seriesContainer.width = percent(100);
        seriesContainer.height = percent(100);
        seriesContainer.isMeasured = false;
        seriesContainer.layout = "none";
        seriesContainer.zIndex = 2;
        _this.seriesContainer = seriesContainer;
        // Create a container for bullets
        var bulletsContainer = _this.chartContainer.createChild(Container);
        bulletsContainer.shouldClone = false;
        bulletsContainer.width = percent(100);
        bulletsContainer.height = percent(100);
        bulletsContainer.isMeasured = false;
        bulletsContainer.zIndex = 3;
        bulletsContainer.layout = "none";
        _this.bulletsContainer = bulletsContainer;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    SerialChart.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        if (this.colors) {
            this.colors.dispose();
        }
        if (this.patterns) {
            this.patterns.dispose();
        }
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor
     */
    SerialChart.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Serial chart");
        }
    };
    Object.defineProperty(SerialChart.prototype, "series", {
        /**
         * A list of chart's series.
         *
         * @return Chart's series
         */
        get: function () {
            if (!this._series) {
                this._series = new ListTemplate(this.createSeries());
                this._series.events.on("inserted", this.handleSeriesAdded, this, false);
                this._series.events.on("removed", this.handleSeriesRemoved, this, false);
                this._disposers.push(new ListDisposer(this._series, false));
                this._disposers.push(this._series.template);
            }
            return this._series;
        },
        enumerable: true,
        configurable: true
    });
    SerialChart.prototype.handleSeriesRemoved = function (event) {
        var series = event.oldValue;
        this.dataUsers.removeValue(series);
        this.dataUsers.each(function (dataUser) {
            dataUser.invalidateDataItems();
        });
        if (this._exitDP[series.uid]) {
            this._exitDP[series.uid].dispose();
            delete this._exitDP[series.uid];
        }
        if (series.autoDispose) {
            series.dispose();
        }
        else {
            series.parent = undefined;
            series.bulletsContainer.parent = undefined;
        }
        //this.feedLegend();
        var legend = this.legend;
        if (legend) {
            var dataItems = this.legend.dataItems;
            for (var i = dataItems.length - 1; i >= 0; i--) {
                var dataItem = dataItems.getIndex(i);
                if (dataItem && dataItem.dataContext == series) {
                    legend.dataItems.remove(dataItem);
                }
            }
            for (var i = legend.data.length - 1; i >= 0; i--) {
                var di = legend.data[i];
                if (di && di == series) {
                    $array.remove(legend.data, di);
                }
            }
        }
    };
    /**
     * Decorates a new [[Series]] object with required parameters when it is
     * added to the chart.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    SerialChart.prototype.handleSeriesAdded = function (event) {
        var _this = this;
        var series = event.newValue;
        if (series.isDisposed()) {
            return;
        }
        series.chart = this;
        series.parent = this.seriesContainer;
        series.bulletsContainer.parent = this.bulletsContainer;
        this._dataUsers.moveValue(series);
        series.addDisposer(new Disposer(function () {
            _this.dataUsers.removeValue(series);
        }));
        this.handleSeriesAdded2(series);
        this.handleLegendSeriesAdded(series);
    };
    SerialChart.prototype.handleLegendSeriesAdded = function (series) {
        if (!series.hiddenInLegend) {
            if (this.legend) {
                this.legend.addData(series);
            }
        }
    };
    SerialChart.prototype.handleSeriesAdded2 = function (series) {
        var _this = this;
        if (!this.dataInvalid) {
            this._exitDP[series.uid] = registry.events.once("exitframe", function () {
                if (!series.data || series.data.length == 0) {
                    series.data = _this.data;
                    if (series.showOnInit) {
                        series.reinit();
                        series.setPropertyValue("showOnInit", false);
                        series.showOnInit = true;
                    }
                    if (!series.isDisposed()) {
                        series.events.once("datavalidated", function () {
                            if (series.data == _this.data) {
                                series._data = [];
                            }
                        });
                    }
                }
            });
            this._disposers.push(this._exitDP[series.uid]);
        }
    };
    /**
     * Setups the legend to use the chart's data.
     * @ignore
     */
    SerialChart.prototype.feedLegend = function () {
        var legend = this.legend;
        if (legend) {
            var legendData_1 = [];
            $iter.each(this.series.iterator(), function (series) {
                if (!series.hiddenInLegend) {
                    legendData_1.push(series);
                }
            });
            legend.dataFields.name = "name";
            legend.data = legendData_1;
        }
    };
    /**
     * Creates and returns a new Series, suitable for this chart type.
     *
     * @return New series
     */
    SerialChart.prototype.createSeries = function () {
        return new Series();
    };
    Object.defineProperty(SerialChart.prototype, "colors", {
        /**
         * @return Color list
         */
        get: function () {
            return this.getPropertyValue("colors");
        },
        /**
         * Chart's color list.
         *
         * This list can be used by a number of serial items, like applying a new
         * color for each Series added. Or, applying a new color for each slice
         * of a Pie chart.
         *
         * Please see [[ColorSet]] for information on how you can set up to generate
         * unique colors.
         *
         * A theme you are using may override default pre-defined colors.
         *
         * @param value Color list
         */
        set: function (value) {
            this.setPropertyValue("colors", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SerialChart.prototype, "patterns", {
        /**
         * @return Pattern set
         */
        get: function () {
            return this.getPropertyValue("patterns");
        },
        /**
         * A [[PatternSet]] to use when creating patterned fills for slices.
         *
         * @since 4.7.5
         * @param value  Pattern set
         */
        set: function (value) {
            this.setPropertyValue("patterns", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all parameters from another [[SerialChart]].
     *
     * @param source Source SerialChart
     */
    SerialChart.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.series.copyFrom(source.series);
    };
    /**
     * Hides the chart instantly and then shows it. If defaultState.transitionDuration > 0, this will result an animation in which properties of hidden state will animate to properties of visible state.
     */
    SerialChart.prototype.appear = function () {
        _super.prototype.appear.call(this);
        this.series.each(function (series) {
            if (series.showOnInit && series.inited) {
                series.appear();
            }
        });
    };
    return SerialChart;
}(Chart));
export { SerialChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["SerialChart"] = SerialChart;
//# sourceMappingURL=SerialChart.js.map