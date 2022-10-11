/**
 * Module for building Gauge charts.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { RadarChart, RadarChartDataItem } from "./RadarChart";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { ClockHand } from "../elements/ClockHand";
import { registry } from "../../core/Registry";
import * as $type from "../../core/utils/Type";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[GaugeChart]].
 *
 * @see {@link DataItem}
 */
var GaugeChartDataItem = /** @class */ (function (_super) {
    __extends(GaugeChartDataItem, _super);
    /**
     * Constructor
     */
    function GaugeChartDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "GaugeChartDataItem";
        _this.applyTheme();
        return _this;
    }
    return GaugeChartDataItem;
}(RadarChartDataItem));
export { GaugeChartDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a Gauge chart.
 *
 * @see {@link IGaugeChartEvents} for a list of available Events
 * @see {@link IGaugeChartAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/chart-types/gauge-chart/} for documentation
 * @important
 */
var GaugeChart = /** @class */ (function (_super) {
    __extends(GaugeChart, _super);
    /**
     * Constructor
     */
    function GaugeChart() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "GaugeChart";
        _this.startAngle = 180;
        _this.endAngle = 360;
        _this.hands = new ListTemplate(new ClockHand());
        _this.hands.events.on("inserted", _this.processHand, _this, false);
        _this._disposers.push(new ListDisposer(_this.hands));
        _this._disposers.push(_this.hands.template);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    GaugeChart.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Add a default screen reader title for accessibility
        // This will be overridden in screen reader if there are any `titles` set
        if (!$type.hasValue(this.readerTitle)) {
            this.readerTitle = this.language.translate("Gauge chart");
        }
    };
    /**
     * Decorates a [[ClockHand]] when it is added to the chart.
     *
     * @param event  Event
     */
    GaugeChart.prototype.processHand = function (event) {
        var hand = event.newValue;
        if (!hand.axis) {
            hand.axis = this.xAxes.getIndex(0);
        }
    };
    /**
     * This function is used to sort element's JSON config properties, so that
     * some properties that absolutely need to be processed last, can be put at
     * the end.
     *
     * @ignore Exclude from docs
     * @param a  Element 1
     * @param b  Element 2
     * @return Sorting number
     */
    GaugeChart.prototype.configOrder = function (a, b) {
        if (a == b) {
            return 0;
        }
        // Must come last
        else if (a == "hands") {
            return 1;
        }
        else if (b == "hands") {
            return -1;
        }
        else {
            return _super.prototype.configOrder.call(this, a, b);
        }
    };
    return GaugeChart;
}(RadarChart));
export { GaugeChart };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["GaugeChart"] = GaugeChart;
//# sourceMappingURL=GaugeChart.js.map