/**
 * DurationAxis module
 */
import { __extends, __values } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ValueAxis, ValueAxisDataItem } from "./ValueAxis";
import { registry } from "../../core/Registry";
import * as $math from "../../core/utils/Math";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines data item for [[DurationAxis]].
 *
 * @see {@link DataItem}
 */
var DurationAxisDataItem = /** @class */ (function (_super) {
    __extends(DurationAxisDataItem, _super);
    /**
     * Constructor
     */
    function DurationAxisDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "DurationAxisDataItem";
        _this.applyTheme();
        return _this;
    }
    return DurationAxisDataItem;
}(ValueAxisDataItem));
export { DurationAxisDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to create an axis that shows time durations.
 *
 * ```TypeScript
 * // Create the axis
 * let xAxis = chart.xAxes.push(new am4charts.DurationAxis());
 *
 * // Set settings
 * xAxis.title.text = "Time";
 * ```
 * ```JavaScript
 * // Create the axis
 * var valueAxis = chart.xAxes.push(new am4charts.DurationAxis());
 *
 * // Set settings
 * valueAxis.title.text = "Time";
 * ```
 * ```JSON
 * "xAxes": [{
 *   "type": "DurationAxis",
 *   "title": {
 *     "text": "Time"
 *   }
 * }]
 * ```
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/} for mor information about duration formatters.
 * @see {@link IDurationAxisEvents} for a list of available Events
 * @see {@link IDurationAxisAdapters} for a list of available Adapters
 * @important
 */
var DurationAxis = /** @class */ (function (_super) {
    __extends(DurationAxis, _super);
    /**
     * Constructor
     */
    function DurationAxis() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * A base unit (granularity) of data.
         *
         * Used to indicate what are the base units of your data.
         */
        _this._baseUnit = "second";
        _this.className = "DurationAxis";
        _this.setPropertyValue("maxZoomFactor", 1000000);
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Formats the value according to axis' own [[DurationFormatter]].
     *
     * @param value  Source value
     * @return Formatted value
     */
    DurationAxis.prototype.formatLabel = function (value, format) {
        return this.durationFormatter.format(value, format || this.axisDurationFormat);
    };
    /**
     * Adjusts actual min and max scale values so that the axis starts and ends
     * at "nice" values, unless `strictMinMax` is set.
     *
     * The `difference` can be something else than `max - min`, because of the
     * axis breaks.
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param min        [description]
     * @param max        [description]
     * @param difference [description]
     * @param gridCount  [description]
     * @param strictMode [description]
     * @return [description]
     */
    DurationAxis.prototype.adjustMinMax = function (min, max, difference, gridCount, strictMode) {
        var e_1, _a;
        var minMaxStep;
        var timeUnit = this.baseUnit;
        // we don't allow to go to smaller units, setting so to avoid invalidation
        this.setPropertyValue("maxPrecision", 0);
        if (timeUnit == "millisecond" || timeUnit == "second" || timeUnit == "minute" || timeUnit == "hour") {
            // will fail if 0
            if (gridCount <= 1) {
                gridCount = 1;
            }
            gridCount = Math.round(gridCount);
            var initialMin = min;
            var initialMax = max;
            // in case min and max is the same, use max
            if (difference === 0) {
                difference = Math.abs(max);
            }
            var step = difference / gridCount;
            var divisors = [60, 30, 20, 15, 10, 2, 1];
            var realDivisor = 1;
            if (timeUnit == "hour") {
                divisors = [24, 12, 6, 4, 2, 1];
            }
            try {
                for (var divisors_1 = __values(divisors), divisors_1_1 = divisors_1.next(); !divisors_1_1.done; divisors_1_1 = divisors_1.next()) {
                    var divisor = divisors_1_1.value;
                    if (difference / divisor > gridCount) {
                        realDivisor = divisor;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (divisors_1_1 && !divisors_1_1.done && (_a = divisors_1.return)) _a.call(divisors_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var count = Math.ceil(((max - min) / realDivisor) / gridCount);
            var exponent = Math.log(Math.abs(count)) * Math.LOG10E;
            var power = Math.pow(10, Math.floor(exponent)) / 10;
            var reducedCount = count / power;
            // find closest to divisor
            var closest = $math.closest(divisors, reducedCount);
            count = closest * power;
            step = realDivisor * count;
            // TODO can this be removed ?
            this.durationFormatter.getValueUnit(step, this.baseUnit);
            min = Math.floor(min / step) * step;
            max = Math.ceil(max / step) * step;
            if (strictMode) {
                min -= step;
                if (min < 0 && initialMin >= 0) {
                    min = 0;
                }
                max += step;
                if (max > 0 && initialMax <= 0) {
                    max = 0;
                }
            }
            minMaxStep = { min: min, max: max, step: step };
        }
        else {
            minMaxStep = _super.prototype.adjustMinMax.call(this, min, max, difference, gridCount, strictMode);
        }
        // choose duration formatter based on step
        this.axisDurationFormat = this.durationFormatter.getFormat(minMaxStep.step, minMaxStep.max, this.baseUnit);
        return minMaxStep;
    };
    Object.defineProperty(DurationAxis.prototype, "tooltipDurationFormat", {
        /**
         * @return Duration format for axis labels
         */
        get: function () {
            return this._tooltipDurationFormat;
        },
        /**
         * A special duration format to apply axis tooltips.
         *
         * Will use same format as for labels, if not set.
         *
         * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/} for mor information.
         * @param value  Duration format for axis labels
         */
        set: function (value) {
            this._tooltipDurationFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns text to show in a axis tooltip, based on specific position within
     * axis.
     *
     * The label will be formatted as per [[NumberFormatter]] set for the whole
     * chart, or explicitly for this Axis.
     *
     * @ignore Exclude from docs
     * @param position  Position (px)
     * @return Label (numeric value)
     */
    DurationAxis.prototype.getTooltipText = function (position) {
        var value = $math.round(this.positionToValue(position), this._stepDecimalPlaces);
        var valueStr = this.formatLabel(value, this.tooltipDurationFormat);
        if (!this._adapterO) {
            return valueStr;
        }
        else {
            return this._adapterO.apply("getTooltipText", valueStr);
        }
    };
    Object.defineProperty(DurationAxis.prototype, "baseUnit", {
        /**
         * @return Base unit
         */
        get: function () {
            return this._baseUnit;
        },
        /**
         * A base unit (granularity) of data.
         *
         * Used to indicate what are the base units of your data.
         *
         * Available options: "millisecond", "second" (default), "minute", "hour",
         * "day", "week", "month", "year".
         *
         * @default "second"
         * @param timeUnit
         */
        set: function (timeUnit) {
            if (this._baseUnit != timeUnit) {
                this._baseUnit = timeUnit;
                this.durationFormatter.baseUnit = timeUnit;
                this.invalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies all properties and related data from a different instance of Axis.
     *
     * @param source Source Axis
     */
    DurationAxis.prototype.copyFrom = function (source) {
        _super.prototype.copyFrom.call(this, source);
        this.baseUnit = source.baseUnit;
    };
    return DurationAxis;
}(ValueAxis));
export { DurationAxis };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["DurationAxis"] = DurationAxis;
registry.registeredClasses["DurationAxisDataItem"] = DurationAxisDataItem;
//# sourceMappingURL=DurationAxis.js.map