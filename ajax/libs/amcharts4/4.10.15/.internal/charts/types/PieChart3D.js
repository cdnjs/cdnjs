/**
 * 3D Pie chart module.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * Imports
 * ============================================================================
 * @hidden
 */
import { PieChart, PieChartDataItem } from "./PieChart";
import { PieSeries3D } from "../series/PieSeries3D";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[PieChart3D]].
 *
 * @see {@link DataItem}
 */
var PieChart3DDataItem = /** @class */ (function (_super) {
    __extends(PieChart3DDataItem, _super);
    /**
     * Constructor
     */
    function PieChart3DDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "PieChart3DDataItem";
        _this.applyTheme();
        return _this;
    }
    return PieChart3DDataItem;
}(PieChartDataItem));
export { PieChart3DDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a 3D Pie chart.
 *
 *  * ```TypeScript
 * // Includes
 * import * as am4core from "@amcharts/amcharts4/core";
 * import * as am4charts from "@amcharts/amcharts4/charts";
 *
 * // Create chart
 * let chart = am4core.create("chartdiv", am4charts.Pie3DChart);
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
 * let series = chart.series.push(new am4charts.Pie3DSeries());
 * series.dataFields.value = "litres";
 * series.dataFields.category = "country";
 * ```
 * ```JavaScript
 * // Create chart
 * var chart = am4core.create("chartdiv", am4charts.Pie3DChart);
 *
 * // The following would work as well:
 * // var chart = am4core.create("chartdiv", "Pie3DChart");
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
 * var series = chart.series.push(new am4charts.Pie3DSeries());
 * series.dataFields.value = "litres";
 * series.dataFields.category = "country";
 * ```
 * ```JSON
 * var chart = am4core.createFromConfig({
 *
 * 	// Series
 * 	"series": [{
 * 		"type": "Pie3DSeries",
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
 * }, "chartdiv", "Pie3DChart");
 * ```
 *
 * @see {@link IPieChart3DEvents} for a list of available Events
 * @see {@link IPieChart3DAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/pie-chart/} for documentation
 * @important
 */
var PieChart3D = /** @class */ (function (_super) {
    __extends(PieChart3D, _super);
    /**
     * Constructor
     */
    function PieChart3D() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "PieChart3D";
        _this.depth = 20;
        _this.angle = 10;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(PieChart3D.prototype, "depth", {
        /**
         * @return Depth (px)
         */
        get: function () {
            return this.getPropertyValue("depth");
        },
        /**
         * Depth of the 3D pie in pixels.
         *
         * This will determine "height" of the pie.
         *
         * @default 20
         * @param value  Depth (px)
         */
        set: function (value) {
            if (this.setPropertyValue("depth", value)) {
                this.invalidateDataUsers();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PieChart3D.prototype, "angle", {
        /**
         * @return Angle (degrees)
         */
        get: function () {
            return this.getPropertyValue("angle");
        },
        /**
         * An angle of a "point of view" in degrees. Possible range 0 - 90.
         *
         * @default 10
         * @param value  Angle (degrees)
         */
        set: function (value) {
            value = $math.fitToRange(value, 0, 90);
            if (this.setPropertyValue("angle", value)) {
                this.invalidateDataUsers();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates and returns a new Series.
     *
     * @return New series
     */
    PieChart3D.prototype.createSeries = function () {
        return new PieSeries3D();
    };
    return PieChart3D;
}(PieChart));
export { PieChart3D };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["PieChart3D"] = PieChart3D;
//# sourceMappingURL=PieChart3D.js.map