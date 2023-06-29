/**
 * DateAxis module
 */
import { __assign, __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ValueAxis, ValueAxisDataItem } from "./ValueAxis";
import { List } from "../../core/utils/List";
import { Dictionary } from "../../core/utils/Dictionary";
import { DateAxisBreak } from "./DateAxisBreak";
import { registry } from "../../core/Registry";
import * as $time from "../../core/utils/Time";
import * as $type from "../../core/utils/Type";
import * as $iter from "../../core/utils/Iterator";
import * as $math from "../../core/utils/Math";
import * as $array from "../../core/utils/Array";
import * as $object from "../../core/utils/Object";
import * as $utils from "../../core/utils/Utils";
import { OrderedListTemplate } from "../../core/utils/SortedList";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines data item for [[DateAxis]].
 *
 * @see {@link DataItem}
 */
var DateAxisDataItem = /** @class */ (function (_super) {
    __extends(DateAxisDataItem, _super);
    /**
     * Constructor
     */
    function DateAxisDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "DateAxisDataItem";
        _this.applyTheme();
        _this.values.date = {};
        _this.values.endDate = {};
        return _this;
    }
    Object.defineProperty(DateAxisDataItem.prototype, "date", {
        /**
         * @return Date
         */
        get: function () {
            return this.dates["date"];
        },
        /**
         * Date position of the data item.
         *
         * @param date  Date
         */
        set: function (date) {
            this.setDate("date", date);
            this.value = date.getTime();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxisDataItem.prototype, "endDate", {
        /**
         * @return End date
         */
        get: function () {
            return this.dates["endDate"];
        },
        /**
         * End date for data item.
         *
         * @param date End date
         */
        set: function (date) {
            this.setDate("endDate", date);
            this.endValue = date.getTime();
        },
        enumerable: true,
        configurable: true
    });
    return DateAxisDataItem;
}(ValueAxisDataItem));
export { DateAxisDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to create a date/time-based axis for the chart.
 *
 * ```TypeScript
 * // Create the axis
 * let xAxis = chart.xAxes.push(new am4charts.DateAxis());
 *
 * // Set settings
 * xAxis.title.text = "Time";
 * ```
 * ```JavaScript
 * // Create the axis
 * var valueAxis = chart.xAxes.push(new am4charts.DateAxis());
 *
 * // Set settings
 * valueAxis.title.text = "Time";
 * ```
 * ```JSON
 * "xAxes": [{
 *   "type": "DateAxis",
 *   "title": {
 *     "text": "Time"
 *   }
 * }]
 * ```
 *
 * @see {@link IDateAxisEvents} for a list of available Events
 * @see {@link IDateAxisAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/date-axis/} got `DateAxis` documention
 * @important
 */
var DateAxis = /** @class */ (function (_super) {
    __extends(DateAxis, _super);
    /**
     * Constructor
     */
    function DateAxis() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this._gapBreaks = false;
        /**
         * A list of date/time intervals for Date axis.
         *
         * This define various granularities available for the axis. For example
         * if you have an axis spanning an hour, and space for 6 grid lines / labels
         * the axis will choose the granularity of 10 minutes, displaying a label
         * every 10 minutes.
         *
         * Default intervals:
         *
         * ```JSON
         * [
         *  { timeUnit: "millisecond", count: 1 },
         *  { timeUnit: "millisecond", count: 5 },
         *  { timeUnit: "millisecond", count: 10 },
         *  { timeUnit: "millisecond", count: 50 },
         *  { timeUnit: "millisecond", count: 100 },
         *  { timeUnit: "millisecond", count: 500 },
         *  { timeUnit: "second", count: 1 },
         *  { timeUnit: "second", count: 5 },
         *  { timeUnit: "second", count: 10 },
         *  { timeUnit: "second", count: 30 },
         *  { timeUnit: "minute", count: 1 },
         *  { timeUnit: "minute", count: 5 },
         *  { timeUnit: "minute", count: 10 },
         *  { timeUnit: "minute", count: 30 },
         *  { timeUnit: "hour", count: 1 },
         *  { timeUnit: "hour", count: 3 },
         *  { timeUnit: "hour", count: 6 },
         *  { timeUnit: "hour", count: 12 },
         *  { timeUnit: "day", count: 1 },
         *  { timeUnit: "day", count: 2 },
         *  { timeUnit: "day", count: 3 },
         *  { timeUnit: "day", count: 4 },
         *  { timeUnit: "day", count: 5 },
         *  { timeUnit: "week", count: 1 },
         *  { timeUnit: "month", count: 1 },
         *  { timeUnit: "month", count: 2 },
         *  { timeUnit: "month", count: 3 },
         *  { timeUnit: "month", count: 6 },
         *  { timeUnit: "year", count: 1 },
         *  { timeUnit: "year", count: 2 },
         *  { timeUnit: "year", count: 5 },
         *  { timeUnit: "year", count: 10 },
         *  { timeUnit: "year", count: 50 },
         *  { timeUnit: "year", count: 100 }
         * ]
         * ```
         */
        _this.gridIntervals = new List();
        /**
         * If data aggregation is enabled by setting Axis' `groupData = true`, the
         * chart will try to aggregate data items into grouped data items.
         *
         * If there are more data items in selected period than `groupCount`, it will
         * group data items into bigger period.
         *
         * For example seconds might be grouped into 10-second aggregate data items.
         *
         * This setting indicates what group intervals can the chart group to.
         *
         * Default intervals:
         *
         * ```JSON
         * [
         *   { timeUnit: "millisecond", count: 1},
         *   { timeUnit: "millisecond", count: 10 },
         *   { timeUnit: "millisecond", count: 100 },
         *   { timeUnit: "second", count: 1 },
         *   { timeUnit: "second", count: 10 },
         *   { timeUnit: "minute", count: 1 },
         *   { timeUnit: "minute", count: 10 },
         *   { timeUnit: "hour", count: 1 },
         *   { timeUnit: "day", count: 1 },
         *   { timeUnit: "week", count: 1 },
         *   { timeUnit: "month", count: 1 },
         *   { timeUnit: "year", count: 1 }
         * ]
         * ```
         * `groupData = true` does not work in combination with `skipEmptyPeriods = true`.
         *
         * @since 4.7.0
         * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/date-axis/#Dynamic_data_item_grouping} for more information about dynamic data item grouping.
         */
        _this.groupIntervals = new List();
        /**
         * A collection of date formats to use when formatting different time units
         * on Date/time axis.
         *
         * Actual defaults will depend on the language locale set for the chart.
         *
         * To override format for a specific time unit, say days, you need to set
         * the appropriate key to a format string. E.g.:
         *
         * ```TypeScript
         * axis.dateFormats.setKey("day", "MMMM d, yyyy");
         * ```
         * ```JavaScript
         * axis.dateFormats.setKey("day", "MMMM d, yyyy");
         * ```
         * ```JSON
         * "xAxes": [{
         *   "type": "DateAxis",
         *   "dateFormats": {
         *     "day": "MMMM d, yyyy"
         *   }
         * }]
         * ```
         *
         * @see {@link DateFormatter}
         */
        _this.dateFormats = new Dictionary();
        /**
         * These formats are applied to labels that are first in a larger unit.
         *
         * For example, if we have a DateAxis with days on it, the first day of month
         * indicates a break in month - a start of the bigger period.
         *
         * For those labels, `periodChangeDateFormats` are applied instead of
         * `dateFormats`.
         *
         * This allows us implement convenient structures, like instead of:
         *
         * `Jan 1 - Jan 2 - Jan 3 - ...`
         *
         * We can have:
         *
         * `Jan - 1 - 2 - 3 - ...`
         *
         * This can be disabled by setting `markUnitChange = false`.
         */
        _this.periodChangeDateFormats = new Dictionary();
        /**
         * Actual interval (granularity) derived from the actual data.
         */
        _this._baseIntervalReal = { timeUnit: "day", count: 1 };
        /**
         */
        _this._prevSeriesTime = {};
        /**
         * [_minDifference description]
         *
         * @todo Description
         */
        _this._minDifference = {};
        /**
         * @ignore
         */
        _this._firstWeekDay = 1;
        /**
         * A collection of start timestamps to use as axis' min timestamp for
         * particular data item item periods.
         *
         * @since 4.7.0
         * @readonly
         */
        _this.groupMin = {};
        /**
         * A collection of start timestamps to use as axis' max timestamp for
         * particular data item item periods.
         *
         * @since 4.7.0
         * @readonly
         */
        _this.groupMax = {};
        _this._intervalMax = {};
        _this._intervalMin = {};
        _this.className = "DateAxis";
        _this.setPropertyValue("markUnitChange", true);
        _this.snapTooltip = true;
        _this.tooltipPosition = "pointer";
        _this.setPropertyValue("groupData", false);
        _this.groupCount = 200;
        _this.events.on("parentset", _this.getDFFormatter, _this, false);
        // Translatable defaults are applied in `applyInternalDefaults()`
        // ...
        // Define default intervals
        _this.gridIntervals.pushAll([
            { timeUnit: "millisecond", count: 1 },
            { timeUnit: "millisecond", count: 5 },
            { timeUnit: "millisecond", count: 10 },
            { timeUnit: "millisecond", count: 50 },
            { timeUnit: "millisecond", count: 100 },
            { timeUnit: "millisecond", count: 500 },
            { timeUnit: "second", count: 1 },
            { timeUnit: "second", count: 5 },
            { timeUnit: "second", count: 10 },
            { timeUnit: "second", count: 30 },
            { timeUnit: "minute", count: 1 },
            { timeUnit: "minute", count: 5 },
            { timeUnit: "minute", count: 10 },
            { timeUnit: "minute", count: 15 },
            { timeUnit: "minute", count: 30 },
            { timeUnit: "hour", count: 1 },
            { timeUnit: "hour", count: 3 },
            { timeUnit: "hour", count: 6 },
            { timeUnit: "hour", count: 12 },
            { timeUnit: "day", count: 1 },
            { timeUnit: "day", count: 2 },
            { timeUnit: "day", count: 3 },
            { timeUnit: "day", count: 4 },
            { timeUnit: "day", count: 5 },
            { timeUnit: "week", count: 1 },
            { timeUnit: "month", count: 1 },
            { timeUnit: "month", count: 2 },
            { timeUnit: "month", count: 3 },
            { timeUnit: "month", count: 6 },
            { timeUnit: "year", count: 1 },
            { timeUnit: "year", count: 2 },
            { timeUnit: "year", count: 5 },
            { timeUnit: "year", count: 10 },
            { timeUnit: "year", count: 50 },
            { timeUnit: "year", count: 100 },
            { timeUnit: "year", count: 200 },
            { timeUnit: "year", count: 500 },
            { timeUnit: "year", count: 1000 },
            { timeUnit: "year", count: 2000 },
            { timeUnit: "year", count: 5000 },
            { timeUnit: "year", count: 10000 },
            { timeUnit: "year", count: 100000 }
        ]);
        _this.groupIntervals.pushAll([
            { timeUnit: "millisecond", count: 1 },
            { timeUnit: "millisecond", count: 10 },
            { timeUnit: "millisecond", count: 100 },
            { timeUnit: "second", count: 1 },
            { timeUnit: "second", count: 10 },
            { timeUnit: "minute", count: 1 },
            { timeUnit: "minute", count: 10 },
            { timeUnit: "hour", count: 1 },
            { timeUnit: "day", count: 1 },
            { timeUnit: "week", count: 1 },
            { timeUnit: "month", count: 1 },
            { timeUnit: "year", count: 1 }
        ]);
        // Set field name
        _this.axisFieldName = "date";
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * A function which applies fills to axis cells.
     *
     * Default function fills every second fill. You can set this to a function
     * that follows some other logic.
     *
     * Function should accept a [[DateAxisDataItem]] and modify its `axisFill`
     * property accordingly.
     */
    DateAxis.prototype.fillRule = function (dataItem) {
        var value = dataItem.value;
        var axis = dataItem.component;
        var gridInterval = axis._gridInterval;
        var gridDuration = $time.getDuration(gridInterval.timeUnit, gridInterval.count);
        if (Math.round((value - axis.min) / gridDuration) / 2 == Math.round(Math.round((value - axis.min) / gridDuration) / 2)) {
            dataItem.axisFill.__disabled = true;
        }
        else {
            dataItem.axisFill.__disabled = false;
        }
    };
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    DateAxis.prototype.applyInternalDefaults = function () {
        _super.prototype.applyInternalDefaults.call(this);
        // Set default date formats
        if (!this.dateFormats.hasKey("millisecond")) {
            this.dateFormats.setKey("millisecond", this.language.translate("_date_millisecond"));
        }
        if (!this.dateFormats.hasKey("second")) {
            this.dateFormats.setKey("second", this.language.translate("_date_second"));
        }
        if (!this.dateFormats.hasKey("minute")) {
            this.dateFormats.setKey("minute", this.language.translate("_date_minute"));
        }
        if (!this.dateFormats.hasKey("hour")) {
            this.dateFormats.setKey("hour", this.language.translate("_date_hour"));
        }
        if (!this.dateFormats.hasKey("day")) {
            this.dateFormats.setKey("day", this.language.translate("_date_day"));
        }
        if (!this.dateFormats.hasKey("week")) {
            this.dateFormats.setKey("week", this.language.translate("_date_day")); // not a mistake
        }
        if (!this.dateFormats.hasKey("month")) {
            this.dateFormats.setKey("month", this.language.translate("_date_month"));
        }
        if (!this.dateFormats.hasKey("year")) {
            this.dateFormats.setKey("year", this.language.translate("_date_year"));
        }
        if (!this.periodChangeDateFormats.hasKey("millisecond")) {
            this.periodChangeDateFormats.setKey("millisecond", this.language.translate("_date_millisecond"));
        }
        if (!this.periodChangeDateFormats.hasKey("second")) {
            this.periodChangeDateFormats.setKey("second", this.language.translate("_date_second"));
        }
        if (!this.periodChangeDateFormats.hasKey("minute")) {
            this.periodChangeDateFormats.setKey("minute", this.language.translate("_date_minute"));
        }
        if (!this.periodChangeDateFormats.hasKey("hour")) {
            this.periodChangeDateFormats.setKey("hour", this.language.translate("_date_day"));
        }
        if (!this.periodChangeDateFormats.hasKey("day")) {
            this.periodChangeDateFormats.setKey("day", this.language.translate("_date_day"));
        }
        if (!this.periodChangeDateFormats.hasKey("week")) {
            this.periodChangeDateFormats.setKey("week", this.language.translate("_date_day"));
        }
        if (!this.periodChangeDateFormats.hasKey("month")) {
            this.periodChangeDateFormats.setKey("month", this.language.translate("_date_month") + " " + this.language.translate("_date_year"));
        }
    };
    /**
     * Returns a new/empty [[DataItem]] of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    DateAxis.prototype.createDataItem = function () {
        return new DateAxisDataItem();
    };
    /**
     * Returns a new/empty [[AxisBreak]] of the appropriate type.
     *
     * @return Axis break
     */
    DateAxis.prototype.createAxisBreak = function () {
        return new DateAxisBreak();
    };
    /**
     * Validates Axis' data items.
     *
     * @ignore Exclude from docs
     */
    DateAxis.prototype.validateDataItems = function () {
        // allows to keep selection of the same size
        var start = this.start;
        var end = this.end;
        var baseDuration = this.baseDuration;
        var periodCount = (this.max - this.min) / baseDuration;
        this._firstWeekDay = this.getFirstWeekDay();
        this.getDFFormatter();
        _super.prototype.validateDataItems.call(this);
        var mainBaseDuration = $time.getDuration(this.mainBaseInterval.timeUnit, this.mainBaseInterval.count);
        this.maxZoomFactor = Math.max(1, (this.max - this.min) / mainBaseDuration);
        this._deltaMinMax = this.baseDuration / 2;
        // allows to keep selection of the same size
        var newPeriodCount = (this.max - this.min) / baseDuration;
        start = start + (end - start) * (1 - periodCount / newPeriodCount);
        this.zoom({ start: start, end: end }, false, true); // added instantlyto solve zoomout problem when we have axes gaps. @todo: check how this affects maxZoomFactor
    };
    /**
     * Handles process after zoom.
     *
     * @ignore Exclude from docs
     * @todo Does nothing?
     */
    DateAxis.prototype.handleSelectionExtremesChange = function () {
    };
    /**
     * @ignore
     */
    DateAxis.prototype.getIntervalMax = function (interval) {
        return this._intervalMax[interval.timeUnit + interval.count];
    };
    /**
     * @ignore
     */
    DateAxis.prototype.getIntervalMin = function (interval) {
        return this._intervalMin[interval.timeUnit + interval.count];
    };
    /**
     * Calculates all positions, related to axis as per current zoom.
     *
     * @ignore Exclude from docs
     */
    DateAxis.prototype.calculateZoom = function () {
        var _this = this;
        _super.prototype.calculateZoom.call(this);
        var difference = this.adjustDifference(this._minZoomed, this._maxZoomed);
        var dataSetChanged = false;
        // if data has to be grouped, choose interval and set dataset
        if (this.groupData && $type.hasValue(difference)) {
            var mainBaseInterval = this.mainBaseInterval;
            var min = this.getIntervalMin(mainBaseInterval);
            var max = this.getIntervalMax(mainBaseInterval);
            var selectionMin = min + (max - min) * this.start;
            var selectionMax = min + (max - min) * this.end;
            var diff = this.adjustDifference(selectionMin, selectionMax);
            var modifiedDifference = diff + (this.startLocation + (1 - this.endLocation)) * this.baseDuration;
            var groupInterval = void 0;
            if (this.groupInterval) {
                groupInterval = __assign({}, this.groupInterval);
            }
            else {
                groupInterval = this.chooseInterval(0, modifiedDifference, this.groupCount, this.groupIntervals);
                if ($time.getDuration(groupInterval.timeUnit, groupInterval.count) < $time.getDuration(mainBaseInterval.timeUnit, mainBaseInterval.count)) {
                    groupInterval = __assign({}, mainBaseInterval);
                }
            }
            this._groupInterval = groupInterval;
            var newId = groupInterval.timeUnit + groupInterval.count;
            if (this._currentDataSetId != newId) {
                this._currentDataSetId = newId;
                this.dispatch("groupperiodchanged");
            }
            this.series.each(function (series) {
                if (series.baseAxis == _this) {
                    if (series.setDataSet(_this._currentDataSetId)) {
                        dataSetChanged = true;
                    }
                }
            });
        }
        var gridInterval = this.chooseInterval(0, difference, this._gridCount);
        if ($time.getDuration(gridInterval.timeUnit, gridInterval.count) < this.baseDuration) {
            gridInterval = __assign({}, this.baseInterval);
        }
        this._gridInterval = gridInterval;
        this._nextGridUnit = $time.getNextUnit(gridInterval.timeUnit);
        // the following is needed to avoid grid flickering while scrolling
        this._intervalDuration = $time.getDuration(gridInterval.timeUnit, gridInterval.count);
        this._gridDate = $time.round(new Date(this.minZoomed - $time.getDuration(gridInterval.timeUnit, gridInterval.count)), gridInterval.timeUnit, gridInterval.count, this._firstWeekDay, this._df.utc, new Date(this.min), this._df.timezoneMinutes, this._df.timezone);
        // tell series start/end
        $iter.each(this.series.iterator(), function (series) {
            if (series.baseAxis == _this) {
                var field_1 = series.getAxisField(_this);
                var minZoomed = $time.round(new Date(_this._minZoomed + _this.baseDuration * 0.05), _this.baseInterval.timeUnit, _this.baseInterval.count, _this._firstWeekDay, _this._df.utc, undefined, _this._df.timezoneMinutes, _this._df.timezone).getTime();
                var minZoomedStr = minZoomed.toString();
                var startDataItem = series.dataItemsByAxis.getKey(_this.uid).getKey(minZoomedStr + series.currentDataSetId);
                var startIndex = 0;
                if (_this.start != 0) {
                    if (startDataItem) {
                        startDataItem = _this.findFirst(startDataItem, minZoomed, field_1);
                        startIndex = startDataItem.index;
                    }
                    else {
                        startIndex = series.dataItems.findClosestIndex(_this._minZoomed, function (x) { return x[field_1]; }, "left");
                    }
                }
                // 1 millisecond is removed so that if only first item is selected, it would not count in the second.
                var baseInterval = _this.baseInterval;
                var maxZoomed = $time.add($time.round(new Date(_this._maxZoomed), baseInterval.timeUnit, baseInterval.count, _this._firstWeekDay, _this._df.utc, undefined, _this._df.timezoneMinutes, _this._df.timezone), baseInterval.timeUnit, baseInterval.count, _this._df.utc).getTime();
                var maxZoomedStr = maxZoomed.toString();
                var endDataItem = series.dataItemsByAxis.getKey(_this.uid).getKey(maxZoomedStr + series.currentDataSetId);
                var endIndex = series.dataItems.length;
                if (_this.end != 1) {
                    if (endDataItem) {
                        endIndex = endDataItem.index;
                    }
                    else {
                        maxZoomed -= 1;
                        endIndex = series.dataItems.findClosestIndex(maxZoomed, function (x) { return x[field_1]; }, "right");
                        // not good - if end is in the gap, indexes go like 5,4,3,4,2,1
                        //if (endIndex < series.dataItems.length) {
                        endIndex++;
                        //}
                    }
                }
                if (series.max(_this) < minZoomed) {
                    series.startIndex = series.dataItems.length;
                    series.endIndex = series.dataItems.length;
                    series.outOfRange = true;
                }
                else if (series.min(_this) > maxZoomed) {
                    series.startIndex = 0;
                    series.endIndex = 0;
                    series.outOfRange = true;
                }
                else {
                    series.outOfRange = false;
                    series.startIndex = startIndex;
                    series.endIndex = endIndex;
                }
                //	console.log(series.name, startIndex, endIndex);
                if (!dataSetChanged && series.dataRangeInvalid) {
                    series.validateDataRange();
                }
            }
        });
    };
    DateAxis.prototype.findFirst = function (dataItem, time, key) {
        var index = dataItem.index;
        if (index > 0) {
            var series = dataItem.component;
            var previousDataItem = series.dataItems.getIndex(index - 1);
            var previousDate = previousDataItem[key];
            if (!previousDate || previousDate.getTime() < time) {
                return dataItem;
            }
            else {
                return this.findFirst(previousDataItem, time, key);
            }
        }
        else {
            return dataItem;
        }
    };
    /**
     * (Re)validates data.
     *
     * @ignore Exclude from docs
     */
    DateAxis.prototype.validateData = function () {
        _super.prototype.validateData.call(this);
        if (!$type.isNumber(this.baseInterval.count)) {
            this.baseInterval.count = 1;
        }
    };
    Object.defineProperty(DateAxis.prototype, "minDifference", {
        /**
         * @ignore
         */
        get: function () {
            var _this = this;
            var minDifference = Number.MAX_VALUE;
            this.series.each(function (series) {
                if (minDifference > _this._minDifference[series.uid]) {
                    minDifference = _this._minDifference[series.uid];
                }
            });
            if (minDifference == Number.MAX_VALUE || minDifference == 0) {
                minDifference = $time.getDuration("day");
            }
            return minDifference;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * [dataChangeUpdate description]
     *
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    DateAxis.prototype.seriesDataChangeUpdate = function (series) {
        this._minDifference[series.uid] = Number.MAX_VALUE;
    };
    /**
     * [postProcessSeriesDataItems description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    DateAxis.prototype.postProcessSeriesDataItems = function (series) {
        var _this = this;
        this._firstWeekDay = this.getFirstWeekDay();
        if (series) {
            this.seriesGroupUpdate(series);
        }
        else {
            this.series.each(function (series) {
                _this.seriesGroupUpdate(series);
            });
        }
        this.addEmptyUnitsBreaks();
    };
    DateAxis.prototype.seriesGroupUpdate = function (series) {
        var _this = this;
        if (JSON.stringify(series._baseInterval[this.uid]) != JSON.stringify(this.mainBaseInterval)) {
            series._baseInterval[this.uid] = this.mainBaseInterval;
            series.mainDataSet.each(function (dataItem) {
                _this.postProcessSeriesDataItem(dataItem);
            });
            if (this.groupData) {
                this.groupSeriesData(series);
            }
        }
    };
    /**
     * Calculates series group data.
     *
     * @param  series  Series
     * @ignore
     */
    DateAxis.prototype.groupSeriesData = function (series) {
        var _this = this;
        if (series.baseAxis == this && series.dataItems.length > 0 && !series.dataGrouped) {
            series.bulletsContainer.removeChildren();
            // make array of intervals which will be used;
            var intervals_1 = [];
            var mainBaseInterval = this.mainBaseInterval;
            var mainIntervalDuration_1 = $time.getDuration(mainBaseInterval.timeUnit, mainBaseInterval.count);
            this.groupIntervals.each(function (interval) {
                var intervalDuration = $time.getDuration(interval.timeUnit, interval.count);
                if ((intervalDuration > mainIntervalDuration_1 && intervalDuration < (_this.max - _this.min)) || _this.groupInterval) {
                    intervals_1.push(interval);
                }
            });
            if (series._dataSets) {
                series._dataSets.each(function (key, dataItems) {
                    dataItems.each(function (dataItem) {
                        dataItem.dispose();
                    });
                    dataItems.clear();
                });
                series._dataSets.clear();
            }
            series.dataGrouped = true;
            $array.each(intervals_1, function (interval) {
                //let mainBaseInterval = this._mainBaseInterval;
                var key = "date" + _this.axisLetter;
                // create data set
                var dataSetId = interval.timeUnit + interval.count;
                // todo: check where this clone goes
                var dataSet = new OrderedListTemplate(series.mainDataSet.template.clone());
                series.dataSets.setKey(dataSetId, dataSet);
                var dataItems = series.mainDataSet;
                var previousTime = Number.NEGATIVE_INFINITY;
                var i = 0;
                var newDataItem;
                var dataFields = [];
                $object.each(series.dataFields, function (dfkey, df) {
                    var dfk = dfkey;
                    if (dfk != key && dfk.indexOf("Show") == -1) {
                        dataFields.push(dfk);
                    }
                });
                var roundedDate;
                dataItems.each(function (dataItem) {
                    var date = dataItem.getDate(key);
                    if (date) {
                        var time = date.getTime();
                        roundedDate = $time.round(new Date(time), interval.timeUnit, interval.count, _this._df.firstDayOfWeek, _this._df.utc, undefined, _this._df.timezoneMinutes, _this._df.timezone);
                        var currentTime = roundedDate.getTime();
                        // changed period								
                        if (previousTime < currentTime) {
                            if (newDataItem && series._adapterO) {
                                $array.each(dataFields, function (vkey) {
                                    newDataItem.values[vkey].value = series._adapterO.apply("groupDataItem", {
                                        dataItem: newDataItem,
                                        interval: interval,
                                        dataField: vkey,
                                        date: roundedDate,
                                        value: newDataItem.values[vkey].value
                                    }).value;
                                    newDataItem.values[vkey].workingValue = newDataItem.values[vkey].value;
                                });
                            }
                            newDataItem = dataSet.create();
                            newDataItem.dataContext = {};
                            newDataItem.setWorkingLocation("dateX", series.dataItems.template.locations.dateX, 0);
                            newDataItem.setWorkingLocation("openDateX", series.dataItems.template.locations.openDateX, 0);
                            newDataItem.setWorkingLocation("dateY", series.dataItems.template.locations.dateY, 0);
                            newDataItem.setWorkingLocation("openDateY", series.dataItems.template.locations.openDateY, 0);
                            newDataItem.component = series;
                            // other Dates?
                            newDataItem.setDate(key, roundedDate);
                            newDataItem._index = i;
                            i++;
                            $array.each(dataFields, function (vkey) {
                                //let groupFieldName = vkey + "Group";
                                var dvalues = dataItem.values[vkey];
                                if (dvalues) {
                                    var value = dvalues.value;
                                    if (series._adapterO) {
                                        value = series._adapterO.apply("groupValue", {
                                            dataItem: dataItem,
                                            interval: interval,
                                            dataField: vkey,
                                            date: roundedDate,
                                            value: value
                                        }).value;
                                    }
                                    var values = newDataItem.values[vkey];
                                    if ($type.isNumber(value)) {
                                        values.value = value;
                                        values.workingValue = value;
                                        values.open = value;
                                        values.close = value;
                                        values.low = value;
                                        values.high = value;
                                        values.sum = value;
                                        values.average = value;
                                        values.count = 1;
                                    }
                                    else {
                                        values.count = 0;
                                    }
                                }
                            });
                            _this.postProcessSeriesDataItem(newDataItem, interval);
                            $object.each(series.propertyFields, function (key, fieldValue) {
                                var f = key;
                                var value = dataItem.properties[key];
                                if ($type.hasValue(value)) {
                                    newDataItem.hasProperties = true;
                                    newDataItem.setProperty(f, value);
                                }
                            });
                            newDataItem.groupDataItems = [dataItem];
                            previousTime = currentTime;
                        }
                        else {
                            if (newDataItem) {
                                $array.each(dataFields, function (vkey) {
                                    var groupFieldName = series.groupFields[vkey];
                                    var dvalues = dataItem.values[vkey];
                                    if (dvalues) {
                                        var value = dvalues.value;
                                        if (series._adapterO) {
                                            value = series._adapterO.apply("groupValue", {
                                                dataItem: dataItem,
                                                interval: interval,
                                                dataField: vkey,
                                                date: roundedDate,
                                                value: value
                                            }).value;
                                        }
                                        if ($type.isNumber(value)) {
                                            var values = newDataItem.values[vkey];
                                            if (!$type.isNumber(values.open)) {
                                                values.open = value;
                                            }
                                            values.close = value;
                                            if (values.low > value || !$type.isNumber(values.low)) {
                                                values.low = value;
                                            }
                                            if (values.high < value || !$type.isNumber(values.high)) {
                                                values.high = value;
                                            }
                                            if ($type.isNumber(values.sum)) {
                                                values.sum += value;
                                            }
                                            else {
                                                values.sum = value;
                                            }
                                            values.count++;
                                            values.average = values.sum / values.count;
                                            if ($type.isNumber(values[groupFieldName])) {
                                                values.value = values[groupFieldName];
                                                values.workingValue = values.value;
                                            }
                                        }
                                    }
                                });
                                $utils.copyProperties(dataItem.properties, newDataItem.properties);
                                $object.each(series.propertyFields, function (key, fieldValue) {
                                    var f = key;
                                    var value = dataItem.properties[key];
                                    if ($type.hasValue(value)) {
                                        newDataItem.hasProperties = true;
                                        newDataItem.setProperty(f, value);
                                    }
                                });
                                newDataItem.groupDataItems.push(dataItem);
                            }
                        }
                    }
                    if (newDataItem) {
                        $utils.copyProperties(dataItem.dataContext, newDataItem.dataContext);
                    }
                });
                if (newDataItem && series._adapterO) {
                    $array.each(dataFields, function (vkey) {
                        newDataItem.values[vkey].value = series._adapterO.apply("groupDataItem", {
                            dataItem: newDataItem,
                            interval: interval,
                            dataField: vkey,
                            date: roundedDate,
                            value: newDataItem.values[vkey].value
                        }).value;
                        newDataItem.values[vkey].workingValue = newDataItem.values[vkey].value;
                    });
                }
            });
            this.calculateZoom();
        }
    };
    /**
     * @ignore
     */
    DateAxis.prototype.getDFFormatter = function () {
        this._df = this.dateFormatter;
    };
    /**
     * [postProcessSeriesDataItem description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem Data item
     */
    DateAxis.prototype.postProcessSeriesDataItem = function (dataItem, interval) {
        var _this = this;
        // we need to do this for all series data items not only added recently, as baseInterval might change
        var intervalID = "";
        if (interval) {
            intervalID = interval.timeUnit + interval.count;
        }
        else {
            interval = this.mainBaseInterval;
        }
        var series = dataItem.component;
        var dataItemsByAxis = series.dataItemsByAxis.getKey(this.uid);
        $object.each(dataItem.dates, function (key) {
            var date = dataItem.getDate(key);
            var time = date.getTime();
            var startDate = $time.round(new Date(time), interval.timeUnit, interval.count, _this._firstWeekDay, _this._df.utc, undefined, _this._df.timezoneMinutes, _this._df.timezone);
            var startTime = startDate.getTime();
            var endDate = $time.add(new Date(startTime), interval.timeUnit, interval.count, _this._df.utc);
            dataItem.setCalculatedValue(key, startTime, "open");
            dataItem.setCalculatedValue(key, endDate.getTime(), "close");
            dataItemsByAxis.setKey(startTime + intervalID, dataItem);
        });
    };
    /**
     * Collapses empty stretches of date/time scale by creating [[AxisBreak]]
     * elements for them.
     *
     * Can be used to automatically remove strethes without data, like weekends.
     *
     * No, need to call this manually. It will automatically be done if
     * `skipEmptyPeriods = true`.
     *
     * @ignore Exclude from docs
     */
    DateAxis.prototype.addEmptyUnitsBreaks = function () {
        var _this = this;
        if (this.skipEmptyPeriods && $type.isNumber(this.min) && $type.isNumber(this.max)) {
            var timeUnit = this.baseInterval.timeUnit;
            var count = this.baseInterval.count;
            if (this._axisBreaks) {
                this._axisBreaks.clear(); // TODO: what about breaks added by user?
            }
            var date = $time.round(new Date(this.min), timeUnit, count, this._firstWeekDay, this._df.utc, undefined, this._df.timezoneMinutes, this._df.timezone);
            var axisBreak = void 0;
            var _loop_1 = function () {
                $time.add(date, timeUnit, count, this_1._df.utc);
                var startTime = date.getTime();
                var startTimeStr = startTime.toString();
                var hasData = $iter.contains(this_1.series.iterator(), function (series) {
                    return !!series.dataItemsByAxis.getKey(_this.uid).getKey(startTimeStr + series.currentDataSetId);
                });
                // open break if not yet opened
                if (!hasData) {
                    if (!axisBreak) {
                        axisBreak = this_1.axisBreaks.create();
                        axisBreak.startDate = new Date(startTime);
                        this_1._gapBreaks = true;
                    }
                }
                else {
                    // close if already opened
                    if (axisBreak) {
                        // close at end time minus one millisecond
                        axisBreak.endDate = new Date(startTime - 1);
                        axisBreak = undefined;
                    }
                }
            };
            var this_1 = this;
            while (date.getTime() < this.max - this.baseDuration) {
                _loop_1();
            }
        }
    };
    /**
     * Updates positioning of Axis breaks after something changes.
     *
     * @ignore Exclude from docs
     */
    DateAxis.prototype.fixAxisBreaks = function () {
        var _this = this;
        _super.prototype.fixAxisBreaks.call(this);
        var axisBreaks = this._axisBreaks;
        if (axisBreaks) {
            if (axisBreaks.length > 0) {
                // process breaks
                axisBreaks.each(function (axisBreak) {
                    var breakGridCount = Math.ceil(_this._gridCount * (Math.min(_this.end, axisBreak.endPosition) - Math.max(_this.start, axisBreak.startPosition)) / (_this.end - _this.start));
                    axisBreak.gridInterval = _this.chooseInterval(0, axisBreak.adjustedEndValue - axisBreak.adjustedStartValue, breakGridCount);
                    var gridDate = $time.round(new Date(axisBreak.adjustedStartValue), axisBreak.gridInterval.timeUnit, axisBreak.gridInterval.count, _this._firstWeekDay, _this._df.utc, undefined, _this._df.timezoneMinutes, _this._df.timezone);
                    if (gridDate.getTime() > axisBreak.startDate.getTime()) {
                        $time.add(gridDate, axisBreak.gridInterval.timeUnit, axisBreak.gridInterval.count, _this._df.utc);
                    }
                    axisBreak.gridDate = gridDate;
                });
            }
        }
    };
    /**
     * @ignore
     */
    DateAxis.prototype.getFirstWeekDay = function () {
        if (this._df) {
            return this._df.firstDayOfWeek;
        }
        return 1;
    };
    /**
     * [getGridDate description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param date           [description]
     * @param intervalCount  [description]
     * @return [description]
     */
    DateAxis.prototype.getGridDate = function (date, intervalCount) {
        var timeUnit = this._gridInterval.timeUnit;
        var realIntervalCount = this._gridInterval.count;
        // round date
        $time.round(date, timeUnit, 1, this._firstWeekDay, this._df.utc, undefined, this._df.timezoneMinutes, this._df.timezone);
        var prevTimestamp = date.getTime();
        var newDate = $time.copy(date);
        // modify date by adding intervalcount
        var timestamp = $time.add(newDate, timeUnit, intervalCount, this._df.utc).getTime();
        // if it's axis break, get first rounded date which is not in a break
        var axisBreak = this.isInBreak(timestamp);
        if (axisBreak && axisBreak.endDate) {
            newDate = new Date(axisBreak.endDate.getTime());
            $time.round(newDate, timeUnit, realIntervalCount, this._firstWeekDay, this._df.utc, undefined, this._df.timezoneMinutes, this._df.timezone);
            if (newDate.getTime() < axisBreak.endDate.getTime()) {
                $time.add(newDate, timeUnit, realIntervalCount, this._df.utc);
            }
            timestamp = newDate.getTime();
        }
        // get duration between grid lines with break duration removed
        var durationBreaksRemoved = this.adjustDifference(prevTimestamp, timestamp);
        // calculate how many time units fit to this duration
        var countBreaksRemoved = Math.round(durationBreaksRemoved / $time.getDuration(timeUnit));
        // if less units fit, add one and repeat
        if (countBreaksRemoved < realIntervalCount) {
            return this.getGridDate(date, intervalCount + realIntervalCount);
        }
        return newDate;
    };
    /**
     * [getBreaklessDate description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param axisBreak  [description]
     * @param timeUnit   [description]
     * @param count      [description]
     * @return [description]
     */
    DateAxis.prototype.getBreaklessDate = function (axisBreak, timeUnit, count) {
        var date = new Date(axisBreak.endValue);
        $time.round(date, timeUnit, count, this._firstWeekDay, this._df.utc, undefined, this._df.timezoneMinutes, this._df.timezone);
        $time.add(date, timeUnit, count, this._df.utc);
        var timestamp = date.getTime();
        axisBreak = this.isInBreak(timestamp);
        if (axisBreak) {
            return this.getBreaklessDate(axisBreak, timeUnit, count);
        }
        return date;
    };
    /**
     * (Re)validates all Axis elements.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    DateAxis.prototype.validateAxisElements = function () {
        var _this = this;
        if ($type.isNumber(this.max) && $type.isNumber(this.min)) {
            this.calculateZoom();
            // first regular items
            var timestamp = this._gridDate.getTime();
            var timeUnit = this._gridInterval.timeUnit;
            var intervalCount = this._gridInterval.count;
            var prevGridDate = $time.copy(this._gridDate);
            var dataItemsIterator_1 = this._dataItemsIterator;
            this.resetIterators();
            var _loop_2 = function () {
                var date = this_2.getGridDate($time.copy(prevGridDate), intervalCount);
                timestamp = date.getTime();
                var endDate = $time.copy(date); // you might think it's easier to add intervalduration to timestamp, however it won't work for months or years which are not of the same length
                endDate = $time.add(endDate, timeUnit, intervalCount, this_2._df.utc);
                var format = this_2.dateFormats.getKey(timeUnit);
                if (this_2.markUnitChange && prevGridDate) {
                    if ($time.checkChange(date, prevGridDate, this_2._nextGridUnit, this_2._df.utc)) {
                        if (timeUnit !== "year") {
                            format = this_2.periodChangeDateFormats.getKey(timeUnit);
                        }
                    }
                }
                var text = this_2._df.format(date, format);
                var dataItem = dataItemsIterator_1.find(function (x) { return x.text === text; });
                if (dataItem.__disabled) {
                    dataItem.__disabled = false;
                }
                this_2.appendDataItem(dataItem);
                dataItem.axisBreak = undefined;
                dataItem.date = date;
                dataItem.endDate = endDate;
                dataItem.text = text;
                this_2.validateDataElement(dataItem);
                prevGridDate = date;
            };
            var this_2 = this;
            while (timestamp <= this._maxZoomed) {
                _loop_2();
            }
            // breaks later
            var renderer_1 = this.renderer;
            if (this._axisBreaks) {
                $iter.each(this._axisBreaks.iterator(), function (axisBreak) {
                    if (axisBreak.breakSize > 0) {
                        var timeUnit_1 = axisBreak.gridInterval.timeUnit;
                        var intervalCount_1 = axisBreak.gridInterval.count;
                        // only add grid if gap is bigger then minGridDistance
                        if ($math.getDistance(axisBreak.startPoint, axisBreak.endPoint) > renderer_1.minGridDistance * 4) {
                            var timestamp_1 = axisBreak.gridDate.getTime();
                            var prevGridDate_1;
                            var count = 0;
                            var _loop_3 = function () {
                                var date = $time.copy(axisBreak.gridDate);
                                timestamp_1 = $time.add(date, timeUnit_1, intervalCount_1 * count, _this._df.utc).getTime();
                                count++;
                                if (timestamp_1 > axisBreak.adjustedStartValue && timestamp_1 < axisBreak.adjustedEndValue) {
                                    var endDate = $time.copy(date); // you might think it's easier to add intervalduration to timestamp, however it won't work for months or years which are not of the same length
                                    endDate = $time.add(endDate, timeUnit_1, intervalCount_1, _this._df.utc);
                                    var format = _this.dateFormats.getKey(timeUnit_1);
                                    if (_this.markUnitChange && prevGridDate_1) {
                                        if ($time.checkChange(date, prevGridDate_1, _this._nextGridUnit, _this._df.utc)) {
                                            if (timeUnit_1 !== "year") {
                                                format = _this.periodChangeDateFormats.getKey(timeUnit_1);
                                            }
                                        }
                                    }
                                    var text_1 = _this._df.format(date, format);
                                    var dataItem = dataItemsIterator_1.find(function (x) { return x.text === text_1; });
                                    if (dataItem.__disabled) {
                                        dataItem.__disabled = false;
                                    }
                                    //this.processDataItem(dataItem);
                                    _this.appendDataItem(dataItem);
                                    dataItem.axisBreak = axisBreak;
                                    axisBreak.dataItems.moveValue(dataItem);
                                    dataItem.date = date;
                                    dataItem.endDate = endDate;
                                    dataItem.text = text_1;
                                    prevGridDate_1 = date;
                                    _this.validateDataElement(dataItem);
                                }
                            };
                            while (timestamp_1 <= axisBreak.adjustedMax) {
                                _loop_3();
                            }
                        }
                    }
                });
            }
        }
    };
    /**
     * Validates Axis data item.
     *
     * @ignore Exclude from docs
     * @param dataItem Data item
     */
    DateAxis.prototype.validateDataElement = function (dataItem) {
        dataItem.itemIndex = this._axisItemCount;
        this._axisItemCount++;
        if ($type.isNumber(this.max) && $type.isNumber(this.min)) {
            var renderer = this.renderer;
            var timestamp = dataItem.value;
            var endTimestamp = dataItem.endValue;
            if (!$type.isNumber(endTimestamp)) {
                endTimestamp = timestamp;
            }
            var position = this.valueToPosition(timestamp);
            var endPosition = this.valueToPosition(endTimestamp);
            var fillEndPosition = endPosition;
            if (!dataItem.isRange && this._gridInterval.count > this.baseInterval.count) {
                endPosition = position + (endPosition - position) / (this._gridInterval.count / this.baseInterval.count);
            }
            dataItem.position = position;
            var tick = dataItem.tick;
            if (tick && !tick.disabled) {
                renderer.updateTickElement(tick, position, endPosition);
            }
            var grid = dataItem.grid;
            if (grid && !grid.disabled) {
                renderer.updateGridElement(grid, position, endPosition);
            }
            var fill = dataItem.axisFill;
            if (fill && !fill.disabled) {
                renderer.updateFillElement(fill, position, fillEndPosition);
                if (!dataItem.isRange) {
                    this.fillRule(dataItem);
                }
            }
            var mask = dataItem.mask;
            if (mask) {
                renderer.updateFillElement(mask, position, endPosition);
            }
            if (dataItem.bullet) {
                renderer.updateBullet(dataItem.bullet, position, endPosition);
            }
            var label = dataItem.label;
            if (label && !label.disabled) {
                var location_1 = label.location;
                if (location_1 == 0) {
                    if (this._gridInterval.count == 1 && this._gridInterval.timeUnit != "week" && !dataItem.isRange) {
                        location_1 = 0.5;
                    }
                    else {
                        location_1 = 0;
                    }
                }
                renderer.updateLabelElement(label, position, endPosition, location_1);
            }
        }
    };
    Object.defineProperty(DateAxis.prototype, "baseDuration", {
        /**
         * A duration in milliseconds of the `baseInterval`.
         *
         * @return Duration (ms)
         */
        get: function () {
            return $time.getDuration(this.baseInterval.timeUnit, this.baseInterval.count);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adjusts min/max values.
     *
     * @ignore Exclude from docs.
     * @todo Description (review)
     * @param min  Min timestamp
     * @param max  Max timestamp
     * @return Adjusted min/max step
     */
    DateAxis.prototype.adjustMinMax = function (min, max) {
        return { min: min, max: max, step: this.baseDuration };
    };
    /**
     * Adjusts the minimum timestamp as per cell start location.
     *
     * @param value  Value
     * @return Adjusted value
     */
    DateAxis.prototype.fixMin = function (value) {
        // like this because months are not equal
        var interval = this.baseInterval;
        var startTime = $time.round(new Date(value), interval.timeUnit, interval.count, this._firstWeekDay, this._df.utc, undefined, this._df.timezoneMinutes, this._df.timezone).getTime();
        var endTime = $time.add(new Date(startTime), interval.timeUnit, interval.count, this._df.utc).getTime();
        return startTime + (endTime - startTime) * this.startLocation;
    };
    /**
     * Adjusts the maximum timestamp as per cell start location.
     *
     * @param value  Value
     * @return Adjusted value
     */
    DateAxis.prototype.fixMax = function (value) {
        // like this because months are not equal
        var interval = this.baseInterval;
        var startTime = $time.round(new Date(value), interval.timeUnit, interval.count, this._firstWeekDay, this._df.utc, undefined, this._df.timezoneMinutes, this._df.timezone).getTime();
        var endTime = $time.add(new Date(startTime), interval.timeUnit, interval.count, this._df.utc).getTime();
        return startTime + (endTime - startTime) * this.endLocation;
    };
    /**
     * [chooseInterval description]
     *
     * @ignore Exclude from docs.
     * @todo Description
     * @param index      [description]
     * @param duration   [description]
     * @param gridCount  [description]
     * @return [description]
     */
    DateAxis.prototype.chooseInterval = function (index, duration, gridCount, intervals) {
        if (!intervals) {
            intervals = this.gridIntervals;
        }
        var gridInterval = intervals.getIndex(index);
        var intervalDuration = $time.getDuration(gridInterval.timeUnit, gridInterval.count);
        var lastIndex = intervals.length - 1;
        if (index >= lastIndex) {
            return __assign({}, intervals.getIndex(lastIndex));
        }
        var count = Math.ceil(duration / intervalDuration);
        if (duration < intervalDuration && index > 0) {
            return __assign({}, intervals.getIndex(index - 1));
        }
        if (count <= gridCount) {
            return __assign({}, intervals.getIndex(index));
        }
        else {
            if (index + 1 < intervals.length) {
                return this.chooseInterval(index + 1, duration, gridCount, intervals);
            }
            else {
                return __assign({}, intervals.getIndex(index));
            }
        }
    };
    /**
     * Formats the value according to axis' own [[DateFormatter]].
     *
     * @param value  Source value
     * @return Formatted value
     */
    DateAxis.prototype.formatLabel = function (value) {
        return this._df.format(value);
    };
    /**
     * Converts a Date to an asbolute pixel position within Axis.
     *
     * @param date  Date
     * @return Position (px)
     */
    DateAxis.prototype.dateToPosition = function (date) {
        return this.valueToPosition(date.getTime());
    };
    /**
     * Converts a numeric timestamp or a `Date` to a relative position on axis.
     *
     * @param date  Date or a timestamp
     * @return Relative position
     */
    DateAxis.prototype.anyToPosition = function (date) {
        if (date instanceof Date) {
            return this.dateToPosition(date);
        }
        else {
            return this.valueToPosition(date);
        }
    };
    /**
     * Converts date to orientation point (x, y, angle) on axis
     *
     * @param date Date
     * @return IOrientationPoint
     */
    DateAxis.prototype.dateToPoint = function (date) {
        var position = this.dateToPosition(date);
        var point = this.renderer.positionToPoint(position);
        var angle = this.renderer.positionToAngle(position);
        return { x: point.x, y: point.y, angle: angle };
    };
    /**
     * Converts a numeric value to orientation (x, y, angle) point on axis
     *
     * @param value  Value
     * @return Orientation point
     */
    DateAxis.prototype.anyToPoint = function (date) {
        if (date instanceof Date) {
            return this.dateToPoint(date);
        }
        else {
            return this.valueToPoint(date);
        }
    };
    /**
     * Converts pixel position within Axis to a corresponding Date.
     *
     * @param position  Position (px)
     * @return Date
     */
    DateAxis.prototype.positionToDate = function (position) {
        return new Date(this.positionToValue(position));
    };
    /**
     * Returns the relative position on axis for series' data item's value.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Data field to get value from
     * @param  location  Location (0-1)
     * @return           Relative position
     */
    DateAxis.prototype.getPositionX = function (dataItem, key, location, stackKey, range) {
        var value = this.getTimeByLocation(dataItem, key, location);
        //let stack: number = dataItem.getValue("valueX", "stack");
        if (!$type.isNumber(value)) {
            value = this.baseValue;
        }
        var position = this.valueToPosition(value);
        if (range) {
            position = $math.fitToRange(position, range.start, range.end);
        }
        return position;
    };
    /**
     * Returns relative position on axis for series' data item's value.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Data field to get value from
     * @param  location  Location (0-1)
     * @return           Relative position
     */
    DateAxis.prototype.getPositionY = function (dataItem, key, location, stackKey, range) {
        var value = this.getTimeByLocation(dataItem, key, location);
        var stack = dataItem.getValue("valueX", "stack");
        if (!$type.isNumber(value)) {
            value = this.baseValue;
        }
        var position = this.valueToPosition(value + stack);
        if (range) {
            position = $math.fitToRange(position, range.start, range.end);
        }
        return position;
    };
    /**
     * Returns an angle for series data item.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Data field to get value from
     * @param location  Location (0-1)
     * @param stackKey  Stack ID
     * @param range Range to fit in
     * @return Angle
     */
    DateAxis.prototype.getAngle = function (dataItem, key, location, stackKey, range) {
        var value = this.getTimeByLocation(dataItem, key, location);
        var stack = dataItem.getValue(stackKey, "stack");
        if (!$type.isNumber(value)) {
            value = this.baseValue;
        }
        var position = this.valueToPosition(value + stack);
        if (range) {
            position = $math.fitToRange(position, range.start, range.end);
        }
        return this.positionToAngle(position);
    };
    /**
     * [getTimeByLocation description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem  [description]
     * @param key       [description]
     * @param location  [description]
     * @return [description]
     */
    DateAxis.prototype.getTimeByLocation = function (dataItem, key, location) {
        if (!$type.hasValue(key)) {
            return;
        }
        if (!$type.isNumber(location)) {
            location = dataItem.workingLocations[key];
            if (!$type.isNumber(location)) {
                location = 0;
            }
        }
        var startTime = dataItem.values[key]["open"];
        var endTime = dataItem.values[key]["close"];
        var workingValue = dataItem.values[key].workingValue;
        var value = dataItem.values[key].value;
        var difference = value - workingValue;
        startTime -= difference;
        endTime -= difference;
        if ($type.isNumber(startTime) && $type.isNumber(endTime)) {
            return startTime + (endTime - startTime) * location;
        }
    };
    /**
     * Processes a related series' data item.
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem  Data item
     */
    DateAxis.prototype.processSeriesDataItem = function (dataItem, axisLetter) {
        var series = dataItem.component;
        var time;
        var date = dataItem["date" + axisLetter];
        if ($type.isNumber(this.timezoneOffset)) {
            date.setTime(date.getTime() + (date.getTimezoneOffset() - this.timezoneOffset) * 60000);
            dataItem.setValue("date" + axisLetter, date.getTime(), 0);
        }
        else if ($type.hasValue(this.timezone)) {
            date = $time.setTimezone(date, this.timezone);
            dataItem.setValue("date" + axisLetter, date.getTime(), 0);
            dataItem["date" + axisLetter] = date;
        }
        if (date) {
            time = date.getTime();
        }
        else {
            return;
        }
        var openDate = dataItem["openDate" + axisLetter];
        var prevSeriesTime = this._prevSeriesTime[series.uid];
        var openTime;
        if (openDate) {
            openTime = openDate.getTime();
        }
        if ($type.isNumber(openTime)) {
            var difference = Math.abs(time - openTime);
            if (this._minDifference[series.uid] > difference) {
                this._minDifference[series.uid] = difference;
            }
        }
        var differece = time - prevSeriesTime;
        if (differece > 0) {
            if (this._minDifference[series.uid] > differece) {
                this._minDifference[series.uid] = differece;
            }
        }
        this._prevSeriesTime[series.uid] = time;
        if (series._baseInterval[this.uid]) {
            this.postProcessSeriesDataItem(dataItem);
        }
    };
    /**
     * [updateAxisBySeries description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    DateAxis.prototype.updateAxisBySeries = function () {
        _super.prototype.updateAxisBySeries.call(this);
        var baseInterval = this.chooseInterval(0, this.minDifference, 1);
        if (this.minDifference >= $time.getDuration("day", 27) && baseInterval.timeUnit == "week") {
            baseInterval.timeUnit = "month";
            baseInterval.count = 1;
        }
        if (baseInterval.timeUnit == "month") {
            if (this.minDifference >= $time.getDuration("day", 29 * 2) && baseInterval.count == 1) {
                baseInterval.count = 2;
            }
            if (this.minDifference >= $time.getDuration("day", 29 * 3) && baseInterval.count == 2) {
                baseInterval.count = 3;
            }
            if (this.minDifference >= $time.getDuration("day", 29 * 6) && baseInterval.count == 5) {
                baseInterval.count = 6;
            }
        }
        // handle daylight saving
        if (this.minDifference >= $time.getDuration("hour", 23) && baseInterval.timeUnit == "hour") {
            baseInterval.timeUnit = "day";
            baseInterval.count = 1;
        }
        if (this.minDifference >= $time.getDuration("week", 1) - $time.getDuration("hour", 1) && baseInterval.timeUnit == "day") {
            baseInterval.timeUnit = "week";
            baseInterval.count = 1;
        }
        if (this.minDifference >= $time.getDuration("year", 1) - $time.getDuration("day", 1.01) && baseInterval.timeUnit == "month") {
            baseInterval.timeUnit = "year";
            baseInterval.count = 1;
        }
        this._baseIntervalReal = baseInterval;
        this._mainBaseInterval = baseInterval;
        // no need to invalidate
    };
    Object.defineProperty(DateAxis.prototype, "baseInterval", {
        /**
         * @return Base interval
         */
        get: function () {
            if (this._groupInterval) {
                return this._groupInterval;
            }
            else if (this._baseInterval) {
                return this._baseInterval;
            }
            else {
                return this._baseIntervalReal;
            }
        },
        /**
         * A base interval (granularity) of data.
         *
         * Used to indicate what are the base units of your data.
         *
         * For example, if you have a data set that has a data point every 5 minutes,
         * you may want to set this to `{ timeUnit: "minute", count: 5 }`.
         *
         * If not set, the Axis will try to determine the setting by its own, looking
         * at actual data.
         *
         * For best results, try to follow these values for `count`:
         *
         * When unit is "month", use 12 / count = round number
         * When unit is "hour", use 24 / count = round number
         * When unit is "second" and "minute", use 60 / count = round number
         *
         * @param timeInterval base interval
         */
        set: function (timeInterval) {
            if (JSON.stringify(this._baseInterval) != JSON.stringify(timeInterval)) {
                this._baseInterval = timeInterval;
                this._mainBaseInterval = timeInterval;
                if (!$type.isNumber(timeInterval.count)) {
                    timeInterval.count = 1;
                }
                this.invalidate();
                this.postProcessSeriesDataItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxis.prototype, "mainBaseInterval", {
        /**
         * Indicates granularity of the data of source (unaggregated) data.
         *
         * @since 4.7.0
         * @return Granularity of the main data set
         */
        get: function () {
            if (this._baseInterval) {
                return this._baseInterval;
            }
            else if (this._mainBaseInterval) {
                return this._mainBaseInterval;
            }
            else {
                return this._baseIntervalReal;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxis.prototype, "skipEmptyPeriods", {
        /**
         * @return Remove empty stretches of time?
         */
        get: function () {
            return this.getPropertyValue("skipEmptyPeriods");
        },
        /**
         * If enabled, axis will automatically collapse empty (without data points)
         * periods of time, i.e. weekends.
         *
         * An "empty" period is considered a stretch of time in the length of current
         * `baseInterval` without a single data point in it.
         *
         * For each such empty period, axis will automatically create an
         * [[AxisBreak]]. By default they will be invisible. You can still configure
         * them by accessing `axis.breaks.template`.
         *
         * [More info about breaks](https://www.amcharts.com/docs/v4/concepts/axes/#Breaks).
         *
         * Important notes:
         * * If you set this property to `true`, you can not add your custom axis breaks to this axis anymore.
         * * Using this feature affects performance. Use only if you need it.
         * * Setting this to `true` will reset appearance of breaks. If you want to modify appearance, do it *after* you set `skipEmptyPeriods`.
         * * Some axis label overlapping might happen.
         * * This setting is not compatible with `groupData = true`.
         *
         * @default false
         * @param value  Remove empty stretches of time?
         */
        set: function (value) {
            if (value) {
                var breakTemplate = this.axisBreaks.template;
                breakTemplate.startLine.disabled = true;
                breakTemplate.endLine.disabled = true;
                breakTemplate.fillShape.disabled = true;
                breakTemplate.breakSize = 0;
            }
            else {
                if (this._gapBreaks) {
                    this.axisBreaks.clear();
                    this._gapBreaks = false;
                }
            }
            if (this.setPropertyValue("skipEmptyPeriods", value)) {
                this.invalidate();
                this.postProcessSeriesDataItems();
                this.invalidateSeries();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxis.prototype, "tooltipDateFormat", {
        /**
         * @return Date format
         */
        get: function () {
            return this.getPropertyValue("tooltipDateFormat");
        },
        /**
         * A special date format to apply axis tooltips.
         *
         * Will use same format as for labels, if not set.
         *
         * @param value  Date format
         */
        set: function (value) {
            this.setPropertyValue("tooltipDateFormat", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxis.prototype, "markUnitChange", {
        /**
         * @return Use different format for period beginning?
         */
        get: function () {
            return this.getPropertyValue("markUnitChange");
        },
        /**
         * Use `periodChangeDateFormats` to apply different formats to the first
         * label in bigger time unit.
         *
         * @default true
         * @param value  Use different format for period beginning?
         */
        set: function (value) {
            if (this.setPropertyValue("markUnitChange", value)) {
                this.invalidateData();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns text to show in a tooltip, based on specific relative position
     * within axis.
     *
     * The label will be formatted as per [[DateFormatter]] set for the whole
     * chart, or explicitly for this Axis.
     *
     * @ignore Exclude from docs
     * @param position  Position
     * @return Label (formatted date)
     */
    DateAxis.prototype.getTooltipText = function (position) {
        var text;
        var date = this.positionToDate(position);
        date = $time.round(date, this.baseInterval.timeUnit, this.baseInterval.count, this._firstWeekDay, this._df.utc, new Date(this.min), this._df.timezoneMinutes, this._df.timezone);
        this.tooltipDate = date;
        if ($type.hasValue(this.tooltipDateFormat)) {
            text = this._df.format(date, this.tooltipDateFormat, ["day", "month", "week", "year"].indexOf(this.baseInterval.timeUnit) == -1);
        }
        else {
            var dateFormat = this.dateFormats.getKey(this.baseInterval.timeUnit);
            if (dateFormat) {
                text = this._df.format(date, dateFormat);
            }
            else {
                text = this.getPositionLabel(position);
            }
        }
        if (!this._adapterO) {
            return text;
        }
        else {
            return this._adapterO.apply("getTooltipText", text);
        }
    };
    /**
     * Takes an absolute position within axis and adjust it to a specific position within base interval. (cell)
     *
     * @ignore Exclude from docs
     * @param position Source position
     * @param location  Location in the cell
     * @return Adjusted position
     */
    DateAxis.prototype.roundPosition = function (position, location, axisLocation) {
        var baseInterval = this.baseInterval;
        var timeUnit = baseInterval.timeUnit;
        var count = baseInterval.count;
        var date = this.positionToDate(position);
        $time.round(date, timeUnit, count, this._firstWeekDay, this._df.utc, undefined, this._df.timezoneMinutes, this._df.timezone);
        if (location > 0) {
            $time.add(date, timeUnit, location * count, this._df.utc);
        }
        if (axisLocation > 0 && axisLocation < 1) {
            date.setTime(date.getTime() + this.baseDuration * axisLocation);
        }
        if (this.isInBreak(date.getTime())) {
            while (date.getTime() < this.max) {
                $time.add(date, timeUnit, count, this._df.utc);
                if (!this.isInBreak(date.getTime())) {
                    break;
                }
            }
        }
        return this.dateToPosition(date);
    };
    /**
     * Returns an relative position of the start of the cell (period), that specific position value falls into.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param position  Relative position
     * @return Cell start relative position
     */
    DateAxis.prototype.getCellStartPosition = function (position) {
        return this.roundPosition(position, 0);
    };
    /**
     * Returns an relative position of the end of the cell (period), that specific position value falls into.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param position  Relative position
     * @return Cell end relative position
     */
    DateAxis.prototype.getCellEndPosition = function (position) {
        return this.roundPosition(position, 1);
        //return this.dateToPosition($time.add(this.positionToDate(this.roundPosition(position, 1)), this.baseInterval.timeUnit, this.baseInterval.count));
    };
    /**
     * Returns a Series data item that corresponds to the specific pixel position
     * of the Axis.
     *
     * If `findNearest` (third parameter) is set to `true`, the method will try
     * to locate nearest available data item if none is found directly under
     * `position`.
     *
     * @param series       Series
     * @param position     Position (px)
     * @param findNearest  Should axis try to find nearest tooltip if there is no data item at exact position
     * @return Data item
     */
    DateAxis.prototype.getSeriesDataItem = function (series, position, findNearest) {
        var value = this.positionToValue(position);
        var location = 0.5;
        if (this.axisLetter == "Y") {
            location = series.dataItems.template.locations.dateY;
        }
        else {
            location = series.dataItems.template.locations.dateX;
        }
        var deltaValue = value - location * this.baseDuration;
        var date = $time.round(new Date(value), this.baseInterval.timeUnit, this.baseInterval.count, this._firstWeekDay, this._df.utc, undefined, this._df.timezoneMinutes, this._df.timezone);
        var nextDate = $time.round(new Date(value + this.baseDuration), this.baseInterval.timeUnit, this.baseInterval.count, this._firstWeekDay, this._df.utc, undefined, this._df.timezoneMinutes, this._df.timezone);
        if (nextDate.getTime() > date.getTime()) {
            if (Math.abs(nextDate.getTime() - deltaValue) < Math.abs(deltaValue - date.getTime())) {
                date = nextDate;
            }
        }
        var dataItemsByAxis = series.dataItemsByAxis.getKey(this.uid);
        var dataItem = dataItemsByAxis.getKey(date.getTime() + series.currentDataSetId);
        // todo:  alternatively we can find closiest here
        if (!dataItem && findNearest) {
            var key_1;
            if (this.axisLetter == "Y") {
                key_1 = "dateY";
            }
            else {
                key_1 = "dateX";
            }
            dataItem = series.dataItems.getIndex(series.dataItems.findClosestIndex(date.getTime(), function (x) {
                if (x[key_1]) {
                    return x[key_1].getTime();
                }
                else {
                    return -Infinity;
                }
            }, "any"));
        }
        return dataItem;
    };
    /**
     * Returns a formatted date based on position in axis scale.
     *
     * Please note that `position` represents position within axis which may be
     * zoomed and not correspond to Cursor's `position`.
     *
     * To convert Cursor's `position` to Axis' `position` use `toAxisPosition()` method.
     *
     * @see {@link https://www.amcharts.com/docs/v4/tutorials/tracking-cursors-position-via-api/#Tracking_Cursor_s_position} For more information about cursor tracking.
     * @param position  Relative position on axis (0-1)
     * @return Position label
     */
    DateAxis.prototype.getPositionLabel = function (position) {
        // @todo Better format recognition
        var date = this.positionToDate(position);
        return this._df.format(date, this.getCurrentLabelFormat());
    };
    /**
     * Returns label date format based on currently used time units
     *
     * @return Format
     */
    DateAxis.prototype.getCurrentLabelFormat = function () {
        return this.dateFormats.getKey(this._gridInterval ? this._gridInterval.timeUnit : "day");
    };
    /**
     * Initializes an Axis renderer.
     *
     * @ignore Exclude from docs
     */
    DateAxis.prototype.initRenderer = function () {
        _super.prototype.initRenderer.call(this);
        var renderer = this.renderer;
        if (renderer) {
            // Set defaults
            renderer.ticks.template.location = 0;
            renderer.grid.template.location = 0;
            renderer.labels.template.location = 0;
            renderer.baseGrid.disabled = true;
        }
    };
    Object.defineProperty(DateAxis.prototype, "basePoint", {
        /**
         * Coordinates of the actual axis start.
         *
         * @ignore Exclude from docs
         * @return Base point
         */
        get: function () {
            return { x: 0, y: 0 };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    DateAxis.prototype.animateMinMax = function (min, max) {
        var _this = this;
        var animation = this.animate([{ property: "_minAdjusted", from: this._minAdjusted, to: min }, { property: "_maxAdjusted", from: this._maxAdjusted, to: max }], this.rangeChangeDuration, this.rangeChangeEasing);
        animation.events.on("animationprogress", function () {
            _this.dispatch("extremeschanged");
        });
        return animation;
    };
    /**
     * Invalidates axis data items when series extremes change
     */
    DateAxis.prototype.handleExtremesChange = function () {
        _super.prototype.handleExtremesChange.call(this);
        if (this.groupData) {
            var id = this.baseInterval.timeUnit + this.baseInterval.count;
            this.groupMin[id] = this._finalMin;
            this.groupMax[id] = this._finalMax;
        }
    };
    /**
     * Zooms axis to specific Dates.
     *
     * @param startDate       Start date
     * @param endValue        End date
     * @param skipRangeEvent  Do not invoke events
     * @param instantly       Do not play zoom animations
     */
    DateAxis.prototype.zoomToDates = function (startDate, endDate, skipRangeEvent, instantly, adjust) {
        startDate = this._df.parse(startDate);
        endDate = this._df.parse(endDate);
        this.zoomToValues(startDate.getTime(), endDate.getTime(), skipRangeEvent, instantly, adjust);
    };
    /**
     * Zooms axis to specific values.
     *
     * @param startValue      Start value
     * @param endValue        End value
     * @param skipRangeEvent  Do not invoke events
     * @param instantly       Do not play zoom animations
     */
    DateAxis.prototype.zoomToValues = function (startValue, endValue, skipRangeEvent, instantly, adjust) {
        var _this = this;
        if (!this.groupData) {
            //let start: number = (startValue - this.min) / (this.max - this.min);
            //let end: number = (endValue - this.min) / (this.max - this.min);
            var start = this.valueToPosition(startValue);
            var end = this.valueToPosition(endValue);
            this.zoom({ start: start, end: end }, skipRangeEvent, instantly);
        }
        else {
            var difference = this.adjustDifference(startValue, endValue);
            var isEnd = false;
            if (endValue == this.max) {
                isEnd = true;
            }
            var isStart = false;
            if (startValue == this.min) {
                isStart = true;
            }
            if ($type.hasValue(difference)) {
                var mainBaseInterval = this.mainBaseInterval;
                var groupInterval_1 = this.chooseInterval(0, difference, this.groupCount, this.groupIntervals);
                if ((groupInterval_1.timeUnit == mainBaseInterval.timeUnit && groupInterval_1.count < mainBaseInterval.count) || $time.getDuration(groupInterval_1.timeUnit, 1) < $time.getDuration(mainBaseInterval.timeUnit, 1)) {
                    groupInterval_1 = __assign({}, mainBaseInterval);
                }
                var id = groupInterval_1.timeUnit + groupInterval_1.count;
                var min_1 = this.groupMin[id];
                var max_1 = this.groupMax[id];
                if (!$type.isNumber(min_1) || !$type.isNumber(max_1)) {
                    min_1 = Number.POSITIVE_INFINITY;
                    max_1 = Number.NEGATIVE_INFINITY;
                    this.series.each(function (series) {
                        var seriesMin = series.min(_this);
                        var seriesMax = series.max(_this);
                        if (series._dataSets) {
                            var ds = series._dataSets.getKey(groupInterval_1.timeUnit + groupInterval_1.count);
                            if (ds) {
                                var mindi = ds.getIndex(0);
                                var maxdi = ds.getIndex(ds.length - 1);
                                if (mindi) {
                                    if (series.xAxis == _this) {
                                        seriesMin = mindi.dateX.getTime();
                                    }
                                    else if (series.yAxis == _this) {
                                        seriesMin = mindi.dateY.getTime();
                                    }
                                }
                                if (maxdi) {
                                    if (series.xAxis == _this) {
                                        seriesMax = maxdi.dateX.getTime();
                                    }
                                    else if (series.yAxis == _this) {
                                        seriesMax = maxdi.dateY.getTime();
                                    }
                                }
                            }
                        }
                        seriesMax = $time.round($time.add(new Date(seriesMax), groupInterval_1.timeUnit, 1, _this._df.utc), groupInterval_1.timeUnit, 1, _this._df.firstDayOfWeek, _this._df.utc, undefined, _this._df.timezoneMinutes, _this._df.timezone).getTime();
                        if (seriesMin < min_1) {
                            min_1 = seriesMin;
                        }
                        if (seriesMax > max_1) {
                            max_1 = seriesMax;
                        }
                    });
                    this.groupMin[id] = min_1;
                    this.groupMax[id] = max_1;
                }
                startValue = $math.fitToRange(startValue, min_1, max_1);
                endValue = $math.fitToRange(endValue, min_1, max_1);
                if (adjust) {
                    if (isEnd) {
                        startValue = endValue - difference;
                        startValue = $math.fitToRange(startValue, min_1, max_1);
                    }
                    if (isStart) {
                        endValue = startValue + difference;
                        endValue = $math.fitToRange(endValue, min_1, max_1);
                    }
                }
                var start = (startValue - min_1) / (max_1 - min_1);
                var end = (endValue - min_1) / (max_1 - min_1);
                this.zoom({ start: start, end: end }, skipRangeEvent, instantly);
            }
        }
    };
    /**
     * Adds `baseInterval` to "as is" fields.
     *
     * @param field  Field name
     * @return Assign as is?
     */
    DateAxis.prototype.asIs = function (field) {
        return field == "baseInterval" || _super.prototype.asIs.call(this, field);
    };
    /**
     * Copies all properties and related data from a different instance of Axis.
     *
     * @param source Source Axis
     */
    DateAxis.prototype.copyFrom = function (source) {
        var _this = this;
        _super.prototype.copyFrom.call(this, source);
        this.dateFormats = source.dateFormats;
        this.periodChangeDateFormats = source.periodChangeDateFormats;
        this.groupIntervals.clear();
        source.groupIntervals.each(function (interval) {
            _this.groupIntervals.push(__assign({}, interval));
        });
        this.gridIntervals.clear();
        source.gridIntervals.each(function (interval) {
            _this.gridIntervals.push(__assign({}, interval));
        });
        if (source._baseInterval) {
            this.baseInterval = source._baseInterval;
        }
    };
    /**
     * Shows Axis tooltip at specific relative position within Axis. (0-1)
     *
     * @param position Position (0-1)
     * @param local or global position
     */
    DateAxis.prototype.showTooltipAtPosition = function (position, local) {
        var _this = this;
        if (!local) {
            position = this.toAxisPosition(position);
        }
        if (this.snapTooltip) {
            // rounding is not good, pen/aac4e7f66f019d36b2447f050c600c13 (no last tootltip shown)
            var actualDate = this.positionToDate(position); //$time.round(this.positionToDate(position), this.baseInterval.timeUnit, 1, this.getFirstWeekDay(), this.dateFormatter.utc, undefined, this._df.timezoneMinutes, this._df.timezone);
            var actualTime_1 = actualDate.getTime();
            var closestDate_1;
            this.series.each(function (series) {
                if (series.baseAxis == _this) {
                    var dataItem = _this.getSeriesDataItem(series, position, true);
                    if (dataItem) {
                        var date = void 0;
                        if (series.xAxis == _this) {
                            date = dataItem.dateX;
                        }
                        if (series.yAxis == _this) {
                            date = dataItem.dateY;
                        }
                        if (!closestDate_1) {
                            closestDate_1 = date;
                        }
                        else {
                            if (Math.abs(closestDate_1.getTime() - actualTime_1) > Math.abs(date.getTime() - actualTime_1)) {
                                closestDate_1 = date;
                            }
                        }
                    }
                }
            });
            if (closestDate_1) {
                var closestTime_1 = closestDate_1.getTime();
                closestDate_1 = $time.round(new Date(closestTime_1), this.baseInterval.timeUnit, this.baseInterval.count, this._firstWeekDay, this._df.utc, undefined, this._df.timezoneMinutes, this._df.timezone);
                closestTime_1 = closestDate_1.getTime();
                var tooltipLocation = this.renderer.tooltipLocation;
                if (tooltipLocation == 0) {
                    tooltipLocation = 0.0001;
                }
                closestDate_1 = new Date(closestDate_1.getTime() + this.baseDuration * tooltipLocation);
                position = this.dateToPosition(closestDate_1);
                if (this.chart.cursor && this.chart.cursor.snapToSeries) {
                    //void
                }
                else {
                    this.series.each(function (series) {
                        var dataItem = series.dataItemsByAxis.getKey(_this.uid).getKey(closestTime_1 + series.currentDataSetId);
                        var point = series.showTooltipAtDataItem(dataItem);
                        if (point) {
                            _this.chart._seriesPoints.push({ series: series, point: point });
                        }
                        else {
                            // check, otherwise column tooltip will be hidden
                            if (series.tooltipText || series.tooltipHTML) {
                                series.hideTooltip();
                            }
                        }
                    });
                }
                //this.chart.sortSeriesTooltips(seriesPoints);
            }
        }
        _super.prototype.showTooltipAtPosition.call(this, position, true);
    };
    Object.defineProperty(DateAxis.prototype, "snapTooltip", {
        /**
         * @return Should snap?
         */
        get: function () {
            return this.getPropertyValue("snapTooltip");
        },
        /**
         * Should the nearest tooltip be shown if no data item is found on the
         * current cursor position.
         *
         * @default true
         * @param value  Should snap?
         */
        set: function (value) {
            this.setPropertyValue("snapTooltip", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxis.prototype, "groupData", {
        /**
         * @return Group data points?
         */
        get: function () {
            return this.getPropertyValue("groupData");
        },
        /**
         * Indicates if data should be aggregated to composide data items if there
         * are more data items in selected range than `groupCount`.
         *
         * Grouping will occur automatically, based on current selection range, and
         * will change dynamically when user zooms in/out the chart.
         *
         * NOTE: This works only if [[DateAxis]] is base axis of an [[XYSeries]].
         *
         * The related [[XYSeries]] also needs to be set up to take advantage of, by
         * setting its [`groupFields`](https://www.amcharts.com/docs/v4/reference/xyseries/#groupFields_property).
         *
         * The group intervals to aggregate data to is defined by `groupIntervals`
         * property.
         *
         * ```TypeScript
         * let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
         * dateAxis.groupData = true;
         *
         * let valueAxis = chart.xAxes.push(new am4charts.valueAxis());
         *
         * let series = chart.series.push(new am4charts.LineSeries());
         * series.dataFields.dateX = "date";
         * series.dataFields.valueY = "value";
         * series.groupFields.valueY = "average";
         * ```
         * ```JavaScript
         * var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
         * dateAxis.groupData = true;
         *
         * var valueAxis = chart.xAxes.push(new am4charts.valueAxis());
         *
         * var series = chart.series.push(new am4charts.LineSeries());
         * series.dataFields.dateX = "date";
         * series.dataFields.valueY = "value";
         * series.groupFields.valueY = "average";
         * ```
         * ```JSON
         * {
         *   // ...
         *   "xAxes": [{
         *     "type": "DateAxis",
         *     "groupData": true
         *   }],
         *   "yAxes": [{
         *     "type": "ValueAxis"
         *   }],
         *   "series": [{
         *     "type": "LineSeries",
         *     "dataFields": {
         *       "dateX": "date",
         *       "valueY": "value"
         *     },
         *     "groupFields": {
         *       "valueY": "average"
         *     }
         *   }]
         * }
         * ```
         *
         * @default false
         * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/date-axis/#Dynamic_data_item_grouping} for more information about dynamic data item grouping.
         * @since 4.7.0
         * @param  value  Group data points?
         */
        set: function (value) {
            var _this = this;
            if (this.setPropertyValue("groupData", value)) {
                this.series.each(function (series) {
                    series.setDataSet("");
                    if (value && !series.dataGrouped && series.inited) {
                        series._baseInterval[_this.uid] = _this.mainBaseInterval;
                        _this.groupSeriesData(series);
                    }
                });
                this._currentDataSetId = "";
                this._groupInterval = undefined;
                this.invalidate();
                this.invalidateSeries();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxis.prototype, "groupInterval", {
        /**
         * @return Interval
         */
        get: function () {
            return this.getPropertyValue("groupInterval");
        },
        /**
         * Disables automatic selection of data grouping intervals and always uses
         * `groupInterval` if set. Works only if `groupData = true`.
         *
         * @since 4.9.24
         * @param  value  Interval
         */
        set: function (value) {
            if (this.setPropertyValue("groupInterval", value)) {
                this.invalidate();
                this.invalidateSeries();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxis.prototype, "groupCount", {
        /**
         * @return Number of data items
         */
        get: function () {
            return this.getPropertyValue("groupCount");
        },
        /**
         * Indicates threshold of data items in selected range at which to start
         * aggregating data items if `groupData = true`.
         *
         * @default 200
         * @since 4.7.0
         * @param  value  Number of data items
         */
        set: function (value) {
            this.setPropertyValue("groupCount", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxis.prototype, "timezoneOffset", {
        /**
         * @todo Timezone offset in minutes
         */
        get: function () {
            return this.getPropertyValue("timezoneOffset");
        },
        /**
         * If set will recalculate all timestamps in data by applying specific offset
         * in minutes.
         *
         * IMPORTANT: do not set `timezoneOffset` on both `DateAxis` and `dateFormatter`. It
         * will skew your results by applying offset twice.
         *
         * @since 4.8.5
         * @param  value Time zone offset in minutes
         */
        set: function (value) {
            this.setPropertyValue("timezoneOffset", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxis.prototype, "timezone", {
        /**
         * @return Timezone
         */
        get: function () {
            return this.getPropertyValue("timezone");
        },
        /**
         * If set will recalculate all timestamps in data to specific named timezone,
         * e.g. `"America/Vancouver"`, `"Australia/Sydney"`, `"UTC"`, etc.
         *
         * IMPORTANT: it is no longer recommended to use this setting. Please
         * set`timezone` on `dateFormatter`.
         *
         * @deprecated
         * @since 4.10.1
         * @param  value Time zone
         */
        set: function (value) {
            this.setPropertyValue("timezone", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateAxis.prototype, "gridInterval", {
        /**
         * Current grid interval.
         *
         * @return Grid interval
         */
        get: function () {
            return this._gridInterval;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @ignore
     */
    DateAxis.prototype.makeGap = function (dataItem, previous) {
        var series = dataItem.component;
        if (dataItem && previous) {
            if (!series.connect && $type.isNumber(series.autoGapCount)) {
                if (series.baseAxis == this) {
                    var date = dataItem.dates["date" + this.axisLetter];
                    var prevDate = previous.dates["date" + this.axisLetter];
                    if (date && prevDate) {
                        var time = date.getTime();
                        var prevTime = prevDate.getTime();
                        if (time - prevTime > series.autoGapCount * this.baseDuration) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    Object.defineProperty(DateAxis.prototype, "baseValue", {
        /**
         * @return base value
         */
        get: function () {
            return this.min;
        },
        enumerable: true,
        configurable: true
    });
    DateAxis.prototype._saveMinMax = function (min, max) {
        var groupInterval = this.groupInterval;
        if (!groupInterval) {
            groupInterval = this.mainBaseInterval;
        }
        var id = groupInterval.timeUnit + groupInterval.count;
        this._intervalMin[id] = min;
        this._intervalMax[id] = max;
    };
    return DateAxis;
}(ValueAxis));
export { DateAxis };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["DateAxis"] = DateAxis;
registry.registeredClasses["DateAxisDataItem"] = DateAxisDataItem;
//# sourceMappingURL=DateAxis.js.map