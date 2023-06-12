/**
 * Pie chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PercentChart, PercentChartDataItem } from "./PercentChart";
import { percent, Percent } from "../../core/utils/Percent";
import { PieSeries } from "../series/PieSeries";
import { registry } from "../../core/Registry";
import * as $iter from "../../core/utils/Iterator";
import * as $utils from "../../core/utils/Utils";
import * as $math from "../../core/utils/Math";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PieChart]].
 *
 * @see {@link DataItem}
 */
var PieChartDataItem = /** @class */ (function (_super) {
    __extends(PieChartDataItem, _super);
    /**
     * Constructor
     */
    function PieChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "PieChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return PieChartDataItem;
}(PercentChartDataItem));
export { PieChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Pie chart.
 *
 * ```TypeScript
 * // Includes
 * import * as am4core from "@amcharts/amcharts4/core";
 * import * as am4charts from "@amcharts/amcharts4/charts";
 *
 * // Create chart
 * let chart = am4core.create("chartdiv", am4charts.PieChart);
 *
 * // Set data
 * chart.data = [{
 * 	"country": "Lithuania",
 * 	"litres": 501.9
 * }, {
 * 	"country": "Czechia",
 * 	"litres": 301.9
 * }, {
 * 	"country": "Ireland",
 * 	"litres": 201.1
 * }];
 *
 * // Create series
 * let series = chart.series.push(new am4charts.PieSeries());
 * series.dataFields.value = "litres";
 * series.dataFields.category = "country";
 * ```
 * ```JavaScript
 * // Create chart
 * var chart = am4core.create("chartdiv", am4charts.PieChart);
 *
 * // The following would work as well:
 * // var chart = am4core.create("chartdiv", "PieChart");
 *
 * // Set data
 * chart.data = [{
 * 	"country": "Lithuania",
 * 	"litres": 501.9
 * }, {
 * 	"country": "Czechia",
 * 	"litres": 301.9
 * }, {
 * 	"country": "Ireland",
 * 	"litres": 201.1
 * }];
 *
 * // Create series
 * var series = chart.series.push(new am4charts.PieSeries());
 * series.dataFields.value = "litres";
 * series.dataFields.category = "country";
 * ```
 * ```JSON
 * var chart = am4core.createFromConfig({
 *
 * 	// Series
 * 	"series": [{
 * 		"type": "PieSeries",
 * 		"dataFields": {
 * 			"value": "litres",
 * 			"category": "country"
 * 		}
 * 	}],
 *
 * 	// Data
 * 	"data": [{
 * 		"country": "Lithuania",
 * 		"litres": 501.9
 * 	}, {
 * 		"country": "Czechia",
 * 		"litres": 301.9
 * 	}, {
 * 		"country": "Ireland",
 * 		"litres": 201.1
 * 	}]
 *
 * }, "chartdiv", "PieChart");
 * ```
 *
 * @see {@link IPieChartEvents} for a list of available Events
 * @see {@link IPieChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/pie-chart/} for documentation
 * @important
 */
var PieChart = /** @class */ (function (_super) {
    __extends(PieChart, _super);
    /**
     * Constructor
     */
    function PieChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "PieChart";
        // Set defaults
        _this.innerRadius = 0;
        _this.radius = percent(80);
        _this.align = "none";
        _this.valign = "none";
        _this.startAngle = -90;
        _this.endAngle = 270;
        var seriesContainer = _this.seriesContainer;
        seriesContainer.isMeasured = true;
        seriesContainer.valign = "middle";
        seriesContainer.align = "center";
        seriesContainer.layout = "absolute";
        seriesContainer.width = undefined;
        seriesContainer.height = undefined;
        // so that the pie is always drawn, even the legend wants all the space
        _this.chartContainer.minHeight = 50;
        _this.chartContainer.minWidth = 50;
        _this.chartContainer.events.on("maxsizechanged", _this.updateRadius, _this, false); // need this for the chart to change radius if legend is removed/disabled
        _this._disposers.push(_this.seriesContainer.events.on("positionchanged", function () {
            _this.bulletsContainer.x = _this.seriesContainer.x;
            _this.bulletsContainer.y = _this.seriesContainer.y;
        }));
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    PieChart.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Pie chart");
        }
    };
    /**
     * (Re)validates the chart, causing it to redraw.
     *
     * @ignore Exclude from docs
     */
    PieChart.prototype.validateLayout = function () {
        _super.prototype.validateLayout.call(this);
        this.updateRadius();
    };
    /**
     * Decorates a new [[Series]] object with required parameters when it is
     * added to the chart.
     *
     * @ignore Exclude from docs
     * @param event  Event
     */
    PieChart.prototype.handleSeriesAdded = function (event) {
        _super.prototype.handleSeriesAdded.call(this, event);
        this._chartPixelRadius = undefined;
        this.updateSeriesAngles();
    };
    PieChart.prototype.updateSeriesAngles = function () {
        var _this = this;
        this.series.each(function (series) {
            series._startAngleInternal = _this.startAngle;
            series._endAngleInternal = _this.endAngle;
            //series.defaultState.properties.startAngle = this.startAngle;
            //series.defaultState.properties.endAngle = this.endAngle;
        });
    };
    /**
     * Recalculates pie's radius, based on a number of criteria.
     *
     * @ignore Exclude from docs
     */
    PieChart.prototype.updateRadius = function () {
        var chartCont = this.chartContainer;
        var rect = $math.getArcRect(this.startAngle, this.endAngle, 1);
        var innerRect = { x: 0, y: 0, width: 0, height: 0 };
        var innerRadius = this.innerRadius;
        if (innerRadius instanceof Percent) {
            innerRect = $math.getArcRect(this.startAngle, this.endAngle, innerRadius.value);
        }
        // @todo handle this when innerRadius set in pixels (do it for radar also)
        rect = $math.getCommonRectangle([rect, innerRect]);
        var maxRadius = Math.min(chartCont.innerWidth / rect.width, chartCont.innerHeight / rect.height);
        if (!$type.isNumber(maxRadius)) {
            maxRadius = 0;
        }
        var chartRadius = $utils.relativeRadiusToValue(this.radius, maxRadius);
        var chartPixelInnerRadius = $utils.relativeRadiusToValue(this.innerRadius, maxRadius);
        var seriesRadius = (chartRadius - chartPixelInnerRadius) / this.series.length;
        if (chartRadius != this._chartPixelRadius || chartPixelInnerRadius != this._chartPixelInnerRadius) {
            this._chartPixelRadius = chartRadius;
            this._chartPixelInnerRadius = chartPixelInnerRadius;
            //@todo: make it possible to set series radius in percent
            $iter.each($iter.indexed(this.series.iterator()), function (a) {
                var i = a[0];
                var series = a[1];
                var radius = chartPixelInnerRadius + $utils.relativeRadiusToValue(series.radius, chartRadius - chartPixelInnerRadius);
                var innerRadius = chartPixelInnerRadius + $utils.relativeRadiusToValue(series.innerRadius, chartRadius - chartPixelInnerRadius);
                if (!$type.isNumber(radius)) {
                    radius = chartPixelInnerRadius + seriesRadius * (i + 1);
                }
                if (!$type.isNumber(innerRadius)) {
                    innerRadius = chartPixelInnerRadius + seriesRadius * i;
                }
                series.pixelRadius = radius;
                series.pixelInnerRadius = innerRadius;
            });
            this.seriesContainer.definedBBox = { x: chartRadius * rect.x, y: chartRadius * rect.y, width: chartRadius * rect.width, height: chartRadius * rect.height };
            this.seriesContainer.invalidateLayout();
        }
    };
    Object.defineProperty(PieChart.prototype, "radius", {
        /**
         * @return Radius (px or relative)
         */
        get: function () {
            return this.getPropertyValue("radius");
        },
        /**
         * Sets radius of the pie chart.
         *
         * Setting to a number will mean a fixed pixel radius.
         *
         * Setting to an instance of [[Percent]] will mean a relative radius to
         * available space.
         *
         * E.g.:
         *
         * ```TypeScript
         * // Set pie chart to be at 50% of the available space
         * pieChart.radius = am4core.percent(50);
         * ```
         * ```JavaScript
         * // Set pie chart to be at 50% of the available space
         * pieChart.radius = am4core.percent(50);
         * ```
         * ```JSON
         * {
         *   // Set pie chart to be at 50% of the available space
         *   "radius": "50%"
         * }
         * ```
         *
         * @default 80%
         * @param value  Radius (px or relative)
         */
        set: function (value) {
            if (this.setPercentProperty("radius", value, true, false, 10, false)) {
                this.invalidateLayout();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieChart.prototype, "innerRadius", {
        /**
         * @return Relative inner radius (0-1)
         */
        get: function () {
            return this.getPropertyValue("innerRadius");
        },
        /**
         * Sets relative inner radius (to create a donut chart).
         *
         * Setting to a number will mean a fixed pixel radius.
         *
         * Setting to an instance of [[Percent]] will mean a relative radius to
         * available space.
         *
         * NOTE: it's not related to `radius`.
         *
         * E.g.:
         *
         * ```TypeScript
         * // Set pie chart to be at 50% of the available space
         * pieChart.innerRadius = am4core.percent(50);
         * ```
         * ```JavaScript
         * // Set pie chart to be at 50% of the available space
         * pieChart.innerRadius = am4core.percent(50);
         * ```
         * ```JSON
         * {
         *   // Set pie chart to be at 50% of the available space
         *   "innerRadius": "50%"
         * }
         * ```
         *
         * @default 0
         * @param value  Relative inner radius (0-1)
         * @todo Setting things like `innerRadius` modifies `slice.radius` and it then looks like it is not the same value as in default state
         */
        set: function (value) {
            this.setPercentProperty("innerRadius", value, true, false, 10, false);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new [[PieSeries]].
     *
     * @return New series
     */
    PieChart.prototype.createSeries = function () {
        return new PieSeries();
    };
    Object.defineProperty(PieChart.prototype, "startAngle", {
        /**
         * @return Start angle (degrees)
         */
        get: function () {
            return this.getPropertyValue("startAngle");
        },
        /**
         * Starting angle of the Pie circle. (degrees)
         *
         * Normally, a pie chart begins (the left side of the first slice is drawn)
         * at the top center. (at -90 degrees)
         *
         * You can use `startAngle` to change this setting.
         *
         * E.g. setting this to 0 will make the first slice be drawn to the right.
         *
         * For a perfect circle the absolute sum of `startAngle` and `endAngle`
         * needs to be 360.
         *
         * However, it's **not** necessary to do so. You can set to those lesser
         * numbers, to create semi-circles.
         *
         * E.g. `startAngle = -90` with `endAngle = 0` will create a Pie chart that
         * looks like a quarter of a circle.
         *
         * NOTE: This setting is not supported in a 3D pie chart.
         *
         * @default -90
         * @param value  Start angle (degrees)
         */
        set: function (value) {
            if (this.setPropertyValue("startAngle", value)) {
                this.updateRadius();
                this.updateSeriesAngles();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieChart.prototype, "endAngle", {
        /**
         * @return End angle (degrees)
         */
        get: function () {
            return this.getPropertyValue("endAngle");
        },
        /**
         * End angle of the Pie circle. (degrees)
         *
         * Normally, a pie chart ends (the right side of the last slice is drawn)
         * at the top center. (at 270 degrees)
         *
         * You can use `endAngle` to change this setting.
         *
         * For a perfect circle the absolute sum of `startAngle` and `endAngle`
         * needs to be 360.
         *
         * However, it's **not** necessary to do so. You can set to those lesser
         * numbers, to create semi-circles.
         *
         * E.g. `startAngle = -90` with `endAngle = 0` will create a Pie chart that
         * looks like a quarter of a circle.
         *
         * NOTE: This setting is not supported in a 3D pie chart.
         *
         * @default 270
         * @param value  End angle (degrees)
         */
        set: function (value) {
            if (this.setPropertyValue("endAngle", value)) {
                this.updateRadius();
                this.updateSeriesAngles();
            }
        },
        enumerable: true,
        configurable: true
    });
    return PieChart;
}(PercentChart));
export { PieChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PieChart"] = PieChart;
registry.registeredClasses["PieChartDataItem"] = PieChartDataItem;
//# sourceMappingURL=PieChart.js.map