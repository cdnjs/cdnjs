/**
 * DateAxis module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ValueAxis, ValueAxisDataItem, IValueAxisProperties, IValueAxisDataFields, IValueAxisAdapters, IValueAxisEvents } from "./ValueAxis";
import { AxisItemLocation } from "./Axis";
import { AxisRenderer } from "./AxisRenderer";
import { List } from "../../core/utils/List";
import { Dictionary } from "../../core/utils/Dictionary";
import { IPoint, IOrientationPoint } from "../../core/defs/IPoint";
import { XYSeries, XYSeriesDataItem } from "../series/XYSeries";
import { LineSeriesDataItem } from "../series/LineSeries";
import { TimeUnit } from "../../core/defs/TimeUnit";
import { ITimeInterval } from "../../core/defs/ITimeInterval";
import { IMinMaxStep } from "./ValueAxis";
import { DateAxisBreak } from "./DateAxisBreak";
import { IRange } from "../../core/defs/IRange";
import { DateFormatter } from "../../core/formatters/DateFormatter";
import { Animation } from "../../core/utils/Animation";
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
export declare class DateAxisDataItem extends ValueAxisDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: DateAxis;
    /**
     * Constructor
     */
    constructor();
    /**
     * Date position of the data item.
     *
     * @param date  Date
     */
    /**
    * @return Date
    */
    date: Date;
    /**
     * End date for data item.
     *
     * @param date End date
     */
    /**
    * @return End date
    */
    endDate: Date;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[DateAxis]].
 */
export interface IDateAxisDataFields extends IValueAxisDataFields {
    /**
     * Date.
     */
    date?: string;
}
/**
 * Defines properties for [[DateAxis]].
 */
export interface IDateAxisProperties extends IValueAxisProperties {
    /**
     * If enabled, axis will automatically collapse empty (without data points)
     * periods of time, i.e. weekends.
     *
     * @default false
     */
    skipEmptyPeriods?: boolean;
    /**
     * Use `periodChangeDateFormats` to apply different formats to the first
     * label in bigger time unit.
     *
     * @default true
     * @param value  Use different format for period beginning?
     */
    markUnitChange?: boolean;
    /**
     * Should the nearest tooltip be shown if no data item is found on the
     * current cursor position.
     *
     * @default true
     */
    snapTooltip?: boolean;
    /**
     * A special date format to apply axis tooltips.
     *
     * Will use same format as for labels, if not set.
     */
    tooltipDateFormat?: string | Intl.DateTimeFormatOptions;
    /**
     * Indicates if data should be aggregated to composide data items if there
     * are more data items in selected range than `groupCount`.
     *
     * @default false
     * @since 4.7.0
     */
    groupData?: boolean;
    /**
     * Indicates threshold of data items in selected range at which to start
     * aggregating data items if `groupData = true`.
     *
     * @default 200
     * @since 4.7.0
     */
    groupCount?: number;
    /**
     * Disables automatic selection of data grouping intervals and always uses
     * `groupInterval` if set. Works only if `groupData = true`.
     *
     * @since 4.9.24
     */
    groupInterval?: ITimeInterval;
    /**
     * If set will recalculate all timestamps in data by applying specific offset
     * in minutes.
     *
     * IMPORTANT: do not set `timezoneOffset` on both `DateAxis` and `dateFormatter`. It
     * will skew your results by applying offset twice.
     *
     * @since 4.8.5
     */
    timezoneOffset?: number;
    /**
     * If set will recalculate all timestamps in data to specific named timezone,
     * e.g. `"America/Vancouver"`, `"Australia/Sydney"`, `"UTC"`, etc.
     *
     * IMPORTANT: do not set `timezone` on both `DateAxis` and `dateFormatter`. It
     * will skew your results by applying timezone twice.
     *
     * @since 4.10.1
     */
    timezone?: string;
}
/**
 * Defines events for [[DateAxis]].
 */
export interface IDateAxisEvents extends IValueAxisEvents {
    /**
     * Invoked when data grouping is on and grouping period is changed. You can find our the period via dateAxis.currentDataSetId property.
     */
    groupperiodchanged: IDateAxisEvents;
}
/**
 * Defines adapters for [[DateAxis]].
 *
 * @see {@link Adapter}
 */
export interface IDateAxisAdapters extends IValueAxisAdapters, IDateAxisProperties {
}
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
export declare class DateAxis<T extends AxisRenderer = AxisRenderer> extends ValueAxis<T> {
    /**
     * Defines data fields.
     */
    _dataFields: IDateAxisDataFields;
    /**
     * Defines available properties.
     */
    _properties: IDateAxisProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IDateAxisAdapters;
    /**
     * Defines available events.
     */
    _events: IDateAxisEvents;
    /**
     * Defines the type of the Date Items.
     */
    _dataItem: DateAxisDataItem;
    /**
     * Defines the type of the axis breaks.
     */
    _axisBreak: DateAxisBreak;
    protected _gapBreaks: boolean;
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
    gridIntervals: List<ITimeInterval>;
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
    groupIntervals: List<ITimeInterval>;
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
    dateFormats: Dictionary<TimeUnit, string | Intl.DateTimeFormatOptions>;
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
    periodChangeDateFormats: Dictionary<TimeUnit, string | Intl.DateTimeFormatOptions>;
    /**
     * At which intervals grid elements are displayed.
     */
    protected _gridInterval: ITimeInterval;
    /**
     * [_intervalDuration description]
     *
     * @todo Description
     */
    protected _intervalDuration: number;
    /**
     * [_gridDate description]
     *
     * @todo Description
     */
    protected _gridDate: Date;
    /**
     * [_nextGridUnit description]
     *
     * @todo Description
     */
    protected _nextGridUnit: TimeUnit;
    /**
     * User-defined granularity of data.
     */
    protected _baseInterval: ITimeInterval;
    /**
     * This is base interval of the main data set.
     */
    protected _mainBaseInterval: ITimeInterval;
    /**
     * This is base interval of the currently selected data set.
     */
    protected _groupInterval: ITimeInterval;
    /**
     * Actual interval (granularity) derived from the actual data.
     */
    protected _baseIntervalReal: ITimeInterval;
    /**
     */
    protected _prevSeriesTime: {
        [index: string]: number;
    };
    /**
     * [_minDifference description]
     *
     * @todo Description
     */
    protected _minDifference: {
        [index: string]: number;
    };
    /**
     * A function which applies fills to axis cells.
     *
     * Default function fills every second fill. You can set this to a function
     * that follows some other logic.
     *
     * Function should accept a [[DateAxisDataItem]] and modify its `axisFill`
     * property accordingly.
     */
    fillRule(dataItem: this["_dataItem"]): void;
    /**
     * @ignore
     */
    protected _firstWeekDay: number;
    /**
     * @ignore
     */
    protected _df: DateFormatter;
    /**
     * A collection of start timestamps to use as axis' min timestamp for
     * particular data item item periods.
     *
     * @since 4.7.0
     * @readonly
     */
    groupMin: {
        [index: string]: number;
    };
    /**
     * A collection of start timestamps to use as axis' max timestamp for
     * particular data item item periods.
     *
     * @since 4.7.0
     * @readonly
     */
    groupMax: {
        [index: string]: number;
    };
    /**
     * Date of the last shown axis tooltip.
     *
     * @since 4.9.7
     * @readonly
     */
    tooltipDate: Date;
    protected _intervalMax: {
        [index: string]: number;
    };
    protected _intervalMin: {
        [index: string]: number;
    };
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets defaults that instantiate some objects that rely on parent, so they
     * cannot be set in constructor.
     */
    protected applyInternalDefaults(): void;
    /**
     * Returns a new/empty [[DataItem]] of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * Returns a new/empty [[AxisBreak]] of the appropriate type.
     *
     * @return Axis break
     */
    protected createAxisBreak(): this["_axisBreak"];
    /**
     * Validates Axis' data items.
     *
     * @ignore Exclude from docs
     */
    validateDataItems(): void;
    /**
     * Handles process after zoom.
     *
     * @ignore Exclude from docs
     * @todo Does nothing?
     */
    handleSelectionExtremesChange(): void;
    /**
     * @ignore
     */
    getIntervalMax(interval: ITimeInterval): number;
    /**
     * @ignore
     */
    getIntervalMin(interval: ITimeInterval): number;
    /**
     * Calculates all positions, related to axis as per current zoom.
     *
     * @ignore Exclude from docs
     */
    calculateZoom(): void;
    protected findFirst(dataItem: XYSeriesDataItem, time: number, key: string): XYSeriesDataItem;
    /**
     * (Re)validates data.
     *
     * @ignore Exclude from docs
     */
    validateData(): void;
    /**
     * @ignore
     */
    readonly minDifference: number;
    /**
     * [dataChangeUpdate description]
     *
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    seriesDataChangeUpdate(series: XYSeries): void;
    /**
     * [postProcessSeriesDataItems description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    postProcessSeriesDataItems(series?: XYSeries): void;
    protected seriesGroupUpdate(series: XYSeries): void;
    /**
     * Calculates series group data.
     *
     * @param  series  Series
     * @ignore
     */
    groupSeriesData(series: XYSeries): void;
    /**
     * @ignore
     */
    protected getDFFormatter(): void;
    /**
     * [postProcessSeriesDataItem description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem Data item
     */
    postProcessSeriesDataItem(dataItem: XYSeriesDataItem, interval?: ITimeInterval): void;
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
    protected addEmptyUnitsBreaks(): void;
    /**
     * Updates positioning of Axis breaks after something changes.
     *
     * @ignore Exclude from docs
     */
    fixAxisBreaks(): void;
    /**
     * @ignore
     */
    protected getFirstWeekDay(): number;
    /**
     * [getGridDate description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param date           [description]
     * @param intervalCount  [description]
     * @return [description]
     */
    getGridDate(date: Date, intervalCount: number): Date;
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
    getBreaklessDate(axisBreak: DateAxisBreak, timeUnit: TimeUnit, count: number): Date;
    /**
     * (Re)validates all Axis elements.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    validateAxisElements(): void;
    /**
     * Validates Axis data item.
     *
     * @ignore Exclude from docs
     * @param dataItem Data item
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
    /**
     * A duration in milliseconds of the `baseInterval`.
     *
     * @return Duration (ms)
     */
    readonly baseDuration: number;
    /**
     * Adjusts min/max values.
     *
     * @ignore Exclude from docs.
     * @todo Description (review)
     * @param min  Min timestamp
     * @param max  Max timestamp
     * @return Adjusted min/max step
     */
    adjustMinMax(min: number, max: number): IMinMaxStep;
    /**
     * Adjusts the minimum timestamp as per cell start location.
     *
     * @param value  Value
     * @return Adjusted value
     */
    protected fixMin(value: number): number;
    /**
     * Adjusts the maximum timestamp as per cell start location.
     *
     * @param value  Value
     * @return Adjusted value
     */
    protected fixMax(value: number): number;
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
    chooseInterval(index: number, duration: number, gridCount: number, intervals?: List<ITimeInterval>): ITimeInterval;
    /**
     * Formats the value according to axis' own [[DateFormatter]].
     *
     * @param value  Source value
     * @return Formatted value
     */
    formatLabel(value: number): string;
    /**
     * Converts a Date to an asbolute pixel position within Axis.
     *
     * @param date  Date
     * @return Position (px)
     */
    dateToPosition(date: Date): number;
    /**
     * Converts a numeric timestamp or a `Date` to a relative position on axis.
     *
     * @param date  Date or a timestamp
     * @return Relative position
     */
    anyToPosition(date: Date | number): number;
    /**
     * Converts date to orientation point (x, y, angle) on axis
     *
     * @param date Date
     * @return IOrientationPoint
     */
    dateToPoint(date: Date): IOrientationPoint;
    /**
     * Converts a numeric value to orientation (x, y, angle) point on axis
     *
     * @param value  Value
     * @return Orientation point
     */
    anyToPoint(date: Date | number): IOrientationPoint;
    /**
     * Converts pixel position within Axis to a corresponding Date.
     *
     * @param position  Position (px)
     * @return Date
     */
    positionToDate(position: number): Date;
    /**
     * Returns the relative position on axis for series' data item's value.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Data field to get value from
     * @param  location  Location (0-1)
     * @return           Relative position
     */
    getPositionX(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * Returns relative position on axis for series' data item's value.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Data field to get value from
     * @param  location  Location (0-1)
     * @return           Relative position
     */
    getPositionY(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
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
    getAngle(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
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
    protected getTimeByLocation(dataItem: XYSeriesDataItem, key: string, location: number): number;
    /**
     * Processes a related series' data item.
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem  Data item
     */
    processSeriesDataItem(dataItem: XYSeriesDataItem, axisLetter?: string): void;
    /**
     * [updateAxisBySeries description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    updateAxisBySeries(): void;
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
    /**
    * @return Base interval
    */
    baseInterval: ITimeInterval;
    /**
     * Indicates granularity of the data of source (unaggregated) data.
     *
     * @since 4.7.0
     * @return Granularity of the main data set
     */
    readonly mainBaseInterval: ITimeInterval;
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
    /**
    * @return Remove empty stretches of time?
    */
    skipEmptyPeriods: boolean;
    /**
     * A special date format to apply axis tooltips.
     *
     * Will use same format as for labels, if not set.
     *
     * @param value  Date format
     */
    /**
    * @return Date format
    */
    tooltipDateFormat: string | Intl.DateTimeFormatOptions;
    /**
     * Use `periodChangeDateFormats` to apply different formats to the first
     * label in bigger time unit.
     *
     * @default true
     * @param value  Use different format for period beginning?
     */
    /**
    * @return Use different format for period beginning?
    */
    markUnitChange: boolean;
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
    getTooltipText(position: number): string;
    /**
     * Takes an absolute position within axis and adjust it to a specific position within base interval. (cell)
     *
     * @ignore Exclude from docs
     * @param position Source position
     * @param location  Location in the cell
     * @return Adjusted position
     */
    roundPosition(position: number, location?: AxisItemLocation, axisLocation?: number): number;
    /**
     * Returns an relative position of the start of the cell (period), that specific position value falls into.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param position  Relative position
     * @return Cell start relative position
     */
    getCellStartPosition(position: number): number;
    /**
     * Returns an relative position of the end of the cell (period), that specific position value falls into.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param position  Relative position
     * @return Cell end relative position
     */
    getCellEndPosition(position: number): number;
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
    getSeriesDataItem(series: XYSeries, position: number, findNearest?: boolean): XYSeriesDataItem;
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
    getPositionLabel(position: number): string;
    /**
     * Returns label date format based on currently used time units
     *
     * @return Format
     */
    protected getCurrentLabelFormat(): string | Intl.DateTimeFormatOptions;
    /**
     * Initializes an Axis renderer.
     *
     * @ignore Exclude from docs
     */
    initRenderer(): void;
    /**
     * Coordinates of the actual axis start.
     *
     * @ignore Exclude from docs
     * @return Base point
     */
    readonly basePoint: IPoint;
    /**
     * @ignore
     */
    protected animateMinMax(min: number, max: number): Animation;
    /**
     * Invalidates axis data items when series extremes change
     */
    protected handleExtremesChange(): void;
    /**
     * Zooms axis to specific Dates.
     *
     * @param startDate       Start date
     * @param endValue        End date
     * @param skipRangeEvent  Do not invoke events
     * @param instantly       Do not play zoom animations
     */
    zoomToDates(startDate: Date, endDate: Date, skipRangeEvent?: boolean, instantly?: boolean, adjust?: boolean): void;
    /**
     * Zooms axis to specific values.
     *
     * @param startValue      Start value
     * @param endValue        End value
     * @param skipRangeEvent  Do not invoke events
     * @param instantly       Do not play zoom animations
     */
    zoomToValues(startValue: number, endValue: number, skipRangeEvent?: boolean, instantly?: boolean, adjust?: boolean): void;
    /**
     * Adds `baseInterval` to "as is" fields.
     *
     * @param field  Field name
     * @return Assign as is?
     */
    protected asIs(field: string): boolean;
    /**
     * Copies all properties and related data from a different instance of Axis.
     *
     * @param source Source Axis
     */
    copyFrom(source: this): void;
    /**
     * Shows Axis tooltip at specific relative position within Axis. (0-1)
     *
     * @param position Position (0-1)
     * @param local or global position
     */
    showTooltipAtPosition(position: number, local?: boolean): void;
    /**
     * Should the nearest tooltip be shown if no data item is found on the
     * current cursor position.
     *
     * @default true
     * @param value  Should snap?
     */
    /**
    * @return Should snap?
    */
    snapTooltip: boolean;
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
    /**
    * @return Group data points?
    */
    groupData: boolean;
    /**
     * Disables automatic selection of data grouping intervals and always uses
     * `groupInterval` if set. Works only if `groupData = true`.
     *
     * @since 4.9.24
     * @param  value  Interval
     */
    /**
    * @return Interval
    */
    groupInterval: ITimeInterval;
    /**
     * Indicates threshold of data items in selected range at which to start
     * aggregating data items if `groupData = true`.
     *
     * @default 200
     * @since 4.7.0
     * @param  value  Number of data items
     */
    /**
    * @return Number of data items
    */
    groupCount: number;
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
    /**
    * @todo Timezone offset in minutes
    */
    timezoneOffset: number;
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
    /**
    * @return Timezone
    */
    timezone: string;
    /**
     * Current grid interval.
     *
     * @return Grid interval
     */
    readonly gridInterval: ITimeInterval;
    /**
     * @ignore
     */
    makeGap(dataItem: LineSeriesDataItem, previous: LineSeriesDataItem): boolean;
    /**
     * @return base value
     */
    readonly baseValue: number;
    protected _saveMinMax(min: number, max: number): void;
}
