/**
 * Value Axis module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Axis, AxisDataItem, IAxisProperties, IAxisDataFields, IAxisAdapters, IAxisEvents } from "./Axis";
import { AxisRenderer } from "./AxisRenderer";
import { List } from "../../core/utils/List";
import { IPoint, IOrientationPoint } from "../../core/defs/IPoint";
import { IDisposer } from "../../core/utils/Disposer";
import { XYChart } from "../types/XYChart";
import { XYSeries, XYSeriesDataItem } from "../series/XYSeries";
import { ValueAxisBreak } from "./ValueAxisBreak";
import { Animation } from "../../core/utils/Animation";
import { IRange } from "../../core/defs/IRange";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[ValueAxis]].
 *
 * @see {@link DataItem}
 */
export declare class ValueAxisDataItem extends AxisDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: ValueAxis;
    /**
     * Constructor
     */
    constructor();
    /**
     * A data point's numeric value.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    value: number;
    /**
     * Data point's numeric end value.
     *
     * @param value  End value
     */
    /**
    * @return Value
    */
    endValue: number;
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 */
export interface IMinMaxStep {
    min: number;
    max: number;
    step: number;
}
/**
 * Defines data fields for [[ValueAxis]].
 */
export interface IValueAxisDataFields extends IAxisDataFields {
}
/**
 * Defines properties for [[ValueAxis]].
 */
export interface IValueAxisProperties extends IAxisProperties {
    strictMinMax?: boolean;
    logarithmic?: boolean;
    maxPrecision?: number;
    adjustLabelPrecision?: boolean;
    extraTooltipPrecision?: number;
    extraMin?: number;
    extraMax?: number;
    keepSelection?: boolean;
    includeRangesInMinMax?: boolean;
    syncWithAxis?: ValueAxis;
    treatZeroAs?: number;
}
/**
 * Defines events for [[ValueAxis]].
 */
export interface IValueAxisEvents extends IAxisEvents {
    /**
     * Invoked when selection/zoom on axis occurs and start/end coordinates
     * change.
     */
    selectionextremeschanged: {};
    /**
     * Invoked when start/end coordinates of the axis change.
     */
    extremeschanged: {};
}
/**
 * Defines adapters for [[ValueAxis]].
 *
 * @see {@link Adapter}
 */
export interface IValueAxisAdapters extends IAxisAdapters, IValueAxisProperties {
    /**
     * Applied to the base value of the axis
     */
    baseValue: number;
    /**
     * Applied to the min value of the axis
     */
    min: number;
    /**
     * Applied to the max value of the axis
     */
    max: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to create a value axis for the chart.
 *
 * ```TypeScript
 * // Create the axis
 * let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
 *
 * // Set settings
 * valueAxis.title.text = "Monthly Sales";
 * ```
 * ```JavaScript
 * // Create the axis
 * var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
 *
 * // Set settings
 * valueAxis.title.text = "Monthly Sales";
 * ```
 * ```JSON
 * "yAxes": [{
 *   "type": "ValueAxis",
 *   "title": {
 *     "text": "Monthly Sales"
 *   }
 * }]
 * ```
 *
 * @see {@link IValueAxisEvents} for a list of available Events
 * @see {@link IValueAxisAdapters} for a list of available Adapters
 * @important
 */
export declare class ValueAxis<T extends AxisRenderer = AxisRenderer> extends Axis<T> {
    /**
     * Defines data fields.
     */
    _dataFields: IValueAxisDataFields;
    /**
     * Defines available properties.
     */
    _properties: IValueAxisProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IValueAxisAdapters;
    /**
     * Defines the type of the Date Items.
     */
    _dataItem: ValueAxisDataItem;
    /**
     * Defines the type of the axis breaks.
     */
    _axisBreak: ValueAxisBreak;
    /**
     * Defines available events.
     */
    _events: IValueAxisEvents;
    /**
     * A reference to chart the axis is for.
     */
    chart: XYChart;
    /**
     * A list of Series that are using this Axis.
     */
    series: List<XYSeries>;
    /**
     * Minimum value for the axis scale.
     */
    protected _min: number;
    /**
     * Maximum value for the axis scale.
     */
    protected _max: number;
    /**
     * User-defined min value for axis.
     */
    protected _minDefined: number;
    /**
     * User-defined max value for axis.
     */
    protected _maxDefined: number;
    /**
     * [_minAdjusted description]
     *
     * @todo Description
     */
    protected _minAdjusted: number;
    /**
     * [_maxAdjusted description]
     *
     * @todo Description
     */
    protected _maxAdjusted: number;
    /**
     * Min real value. (lowest value of all data points)
     */
    protected _minReal: number;
    /**
     * Max real value. (highest value of all data points)
     */
    protected _maxReal: number;
    /**
     * Min value within current zoom.
     */
    protected _minZoomed: number;
    /**
     * Max value within current zoom.
     */
    protected _maxZoomed: number;
    /**
     * [_step description]
     *
     * @todo Description
     */
    protected _step: number;
    /**
     * [_stepDecimalPlaces description]
     *
     * @todo Description
     */
    protected _stepDecimalPlaces: number;
    protected _prevStepDecimalPlaces: number;
    protected _adjustLabelPrecision: boolean;
    /**
     * [_difference description]
     *
     * @todo Description
     */
    protected _difference: number;
    /**
     * Base value for the axis.
     */
    protected _baseValue: number;
    /**
     * [_previousValue description]
     *
     * @todo Description
     */
    protected _previousValue: number;
    /**
     * [_previousPoint description]
     *
     * @todo Description
     */
    protected _previousPoint: IPoint;
    /**
     * Adjusted start in case we have breaks.
     *
     * @todo Description
     */
    protected _adjustedStart: number;
    /**
     * Adjusted end in case we have breaks.
     *
     * @todo Description
     */
    protected _adjustedEnd: number;
    protected _finalMin: number;
    protected _finalMax: number;
    protected _extremesChanged: boolean;
    protected _deltaMinMax: number;
    protected _dsc: boolean;
    /**
     * Holds reference to a function that accepts a DataItem as parameter.
     *
     * It can either return a fill opacity for a fill, or manipulate data item
     * directly, to create various highlighting scenarios.
     */
    fillRule(dataItem: this["_dataItem"]): void;
    /**
     * As calculating totals is expensive operation and not often needed, we
     * don't do it by default.
     *
     * In case you use `totalPercent` or `total` in your charts, this must be set
     * to `true`.
     *
     * @default false
     * @see {@link https://www.amcharts.com/docs/v4/chart-types/xy-chart/#100_stacks} For using `calculateTotals` for 100% stacked series.
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-strings/#Placeholders_for_numeric_values} For using `calculateTotals` in labels.
     */
    calculateTotals: boolean;
    protected _minMaxAnimation: Animation;
    /**
     * Constructor
     */
    constructor();
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
     * [dataChangeUpdate description]
     *
     * This is a placeholder to override for extending classes.
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    dataChangeUpdate(): void;
    /**
     * Processes data items of the related Series.
     *
     * @ignore Exclude from docs
     */
    processSeriesDataItems(): void;
    /**
     * Validates the whole axis. Causes it to redraw.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     */
    validate(): void;
    /**
     * Calculates all positions, related to axis as per current zoom.
     *
     * @ignore Exclude from docs
     */
    calculateZoom(): void;
    protected fixSmallStep(step: number): number;
    /**
     * Validates Axis elements.
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    validateAxisElements(): void;
    /**
     * Validates axis data item.
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param dataItem  Data item
     */
    validateDataElement(dataItem: this["_dataItem"]): void;
    /**
     * Formats the value according to axis' own [[NumberFormatter]].
     *
     * @param value  Source value
     * @return Formatted value
     */
    formatLabel(value: number): string;
    /**
     * Coordinates of the actual axis start.
     *
     * @ignore Exclude from docs
     * @return Base point
     */
    readonly basePoint: IPoint;
    /**
     * A base value.
     *
     * This is a threshold value that will divide "positive" and "negative"
     * value ranges.
     *
     * Other scale-related functionality also depend on base value. E.g. stacks,
     * value-dependent coloring, etc.
     *
     * @param value Base value
     */
    /**
    * @return base value
    */
    baseValue: number;
    /**
     * Converts a numeric value to relative position on axis
     *
     * An alias to `valueToPosition()`.
     *
     * @param value  Value
     * @return Position
     */
    anyToPosition(value: number): number;
    /**
     * Converts a numeric value to orientation point (x, y, angle) on axis
     *
     * @param value  Value
     * @return Orientation point
     */
    valueToPoint(value: number): IOrientationPoint;
    /**
     * Converts a numeric value to orientation (x, y, angle) point on axis
     *
     * @param value  Value
     * @return Orientation point
     */
    anyToPoint(value: number): IOrientationPoint;
    /**
     * Converts a numeric value to relative position on axis.
     *
     * @param value  Value
     * @return relative position
     */
    valueToPosition(value: number): number;
    /**
     * When fontSize of fontFamily changes we need to hard-invalidate all Labels of this container to position them properly.
     */
    invalidateLabels(): void;
    /**
     * Converts an relative position to a corresponding value within
     * axis' scale.
     *
     * @param position  Position (px)
     * @return Value
     */
    positionToValue(position: number): number;
    /**
     * Converts an X coordinate to a relative value in axis' scale.
     *
     * @param x  X (px)
     * @return Value
     */
    xToValue(x: number): number;
    /**
     * Converts an Y coordinate to a relative value in axis' scale.
     *
     * @param y  Y (px)
     * @return Value
     */
    yToValue(y: number): number;
    /**
     * Converts pixel coordinates to a relative position. (0-1)
     *
     * @param point  Coorinates (px)
     * @return Position (0-1)
     */
    pointToPosition(point: IPoint): number;
    /**
     * @ignore
     */
    protected animateMinMax(min: number, max: number): Animation;
    /**
     * Calculates smallest and biggest value for the axis scale.
     * @ignore
     * @todo Description (review)
     */
    getMinMax(): void;
    /**
     * Adjusts the minimum value.
     *
     * This is a placeholder method for extending classes to override.
     *
     * For numeric values this does nothing, however for more complex types, like
     * dates, it may be necessary to adjust.
     *
     * @param value  Value
     * @return Adjusted value
     */
    protected fixMin(value: number): number;
    /**
     * Adjusts the maximum value.
     *
     * This is a placeholder method for extending classes to override.
     *
     * For numeric values this does nothing, however for more complex types, like
     * dates, it may be necessary to adjust.
     *
     * @param value  Value
     * @return Adjusted value
     */
    protected fixMax(value: number): number;
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
    adjustMinMax(min: number, max: number, difference: number, gridCount: number, strictMode?: boolean): IMinMaxStep;
    /**
     * A minimum value for the axis scale.
     *
     * This value might be auto-adjusted by the Axis in order to accomodate the
     * grid nicely, i.e. plot area is divided by grid in nice equal cells.
     *
     * The above might be overridden by `strictMinMax` which will force exact
     * user-defined min and max values to be used for scale.
     *
     * @param value  Min value
     */
    /**
    * @return Min value
    */
    min: number | undefined;
    /**
     * Min value as defined by user's code, not auto-calculated.
     *
     * @readonly
     * @return Min value
     */
    readonly minDefined: number;
    /**
     * Max value as defined by user's code, not auto-calculated.
     *
     * @readonly
     * @return Man value
     */
    readonly maxDefined: number;
    /**
     * Allows relatively adjusting minimum value of the axis' scale.
     *
     * The value is relative to the actual range of values currently displayed
     * on the axis.
     *
     * E.g.: 0.5 will mean half of the current range. If we have axis displaying
     * from 100 to 200, we will now have axis displaying from 50 to 200 because
     * we asked to expand minimum value by 50% (0.5).
     *
     * NOTE: this setting is not compatible with `strictMinMax`.
     *
     * @param {number}
     */
    /**
    * @return {number}
    */
    extraMin: number;
    /**
     * Allows relatively adjusting maximum value of the axis' scale.
     *
     * The value is relative to the actual range of values currently displayed
     * on the axis.
     *
     * E.g.: 0.5 will mean half of the current range. If we have axis displaying
     * from 100 to 200, we will now have axis displaying from 100 to 250 because
     * we asked to expand maximum value by 50% (0.5).
     *
     * NOTE: this setting is not compatible with `strictMinMax`.
     *
     * @param {number}
     */
    /**
    * @return Min multiplier
    */
    extraMax: number;
    /**
     * Current calculated delta in values between two adjacent grid lines (step).
     *
     * This is a read-only value and cannot be used to set actual step.
     *
     * @readonly
     * @see {@link https://www.amcharts.com/docs/v4/concepts/axes/positioning-axis-elements/#Setting_the_density_of_the_the_grid_labels} For more information about modifying density of labels
     * @return [description]
     */
    readonly step: number;
    /**
     * A maximum value for the axis scale.
     *
     * This value might be auto-adjusted by the Axis in order to accomodate the
     * grid nicely, i.e. plot area is divided by grid in nice equal cells.
     *
     * The above might be overridden by `strictMinMax` which will force exact
     * user-defined min and max values to be used for scale.
     *
     * @param value  Max value
     */
    /**
    * @return Max value
    */
    max: number | undefined;
    /**
     * By default the axis will adjust precision of all numbers to match number
     * of decimals in all its labels, e.g.: `1.0`, `1.5`, `2.0`.
     *
     * To disable set `adjustLabelPrecision` to `false`, to use whatever other
     * precision or number format settings are set.
     *
     * IMPORTANT: This setting will be ignored if your number format uses
     * modifiers, e.g. `"#a"`.
     *
     * @default true
     * @since 4.9.14
     * @param  value  Adjust precision
     */
    /**
    * @return Adjust precision
    */
    adjustLabelPrecision: boolean;
    /**
     * Used for the Series to register itself as the user of this Axis.
     *
     * This will also decorate both the Series and Axis with event handlers, used
     * to redraw on Axis position/zoom change.
     *
     * A disposer for those events is returned, so that they can be disposed
     * together with Series.
     *
     * @ignore Exclude from docs
     * @param series  Series
     * @return Disposer for events
     */
    registerSeries(series: XYSeries): IDisposer;
    /**
     * Perform tasks after Axis zoom.
     */
    protected handleSelectionExtremesChange(): void;
    /**
     * Indicates whether to blindly use exact `min` and `max` values set by user
     * when generating Axis scale.
     *
     * If not set, the Axis might slightly adjust those values to accomodate a
     * better looking grid.
     *
     * NOTE: if `min` and `max` are not set, setting `strictMinMax` to `true`
     * will result in fixing the scale of the axis to actual lowest and highest
     * values in the series within currently selected scope.
     *
     * @default false
     * @param value Use exact values?
     */
    /**
    * @return Use exact values?
    */
    strictMinMax: boolean;
    /**
     * Indicates if this axis should use a logarithmic scale.
     *
     * Please note that logarithmic axis can **only** accommodate values bigger
     * than zero.
     *
     * Having zero or negative values will result in error and failure of the
     * whole chart.
     *
     * @param value Logarithmic scale?
     */
    /**
    * @return Logarithmic scale?
    */
    logarithmic: boolean;
    /**
     * Indicates if a current selection (zoom) should be kept across data updates.
     *
     * If your axis is zoomed while chart's data is updated, the axis will try
     * to retain the same start and end values.
     *
     * You can also use this to initially pre-zoom axis:
     *
     * ```TypeScript
     * axis.keepSelection = true;
     * axis.start = 0.5;
     * axis.end = 0.7;
     * ```
     * ```JavaScript
     * axis.keepSelection = true;
     * axis.start = 0.5;
     * axis.end = 0.7;
     * ```
     * ```JSON
     * {
     *   "xAxes": [{
     *     // ...
     *     "keepSelection": true,
     *     "start": 0.5,
     *     "end": 0.7
     *   }]
     * }
     * ```
     *
     * The above will start the chart zoomed from the middle of the actual scope
     * to 70%.
     *
     * @since 4.1.1
     * @default false
     * @param  value  Preseve zoom after data update?
     */
    /**
    * @return Preseve zoom after data update?
    */
    keepSelection: boolean;
    /**
     * If set to `true`, values of axis ranges will be included when calculating
     * range of values / scale of the [[ValueAxis]].
     *
     * @default false
     * @since 4.4.9
     * @param  value  Include ranges?
     */
    /**
    * @return Include ranges?
    */
    includeRangesInMinMax: boolean;
    /**
     * Maximum number of decimals to allow when placing grid lines and labels
     * on axis.
     *
     * Set it to `0` (zero) to force integer-only axis labels.
     *
     * @param {number}
     */
    /**
    * @return max precision
    */
    maxPrecision: number;
    /**
     * This setting allows using bigger precision for numbers displayed in axis
     * tooltip.
     *
     * Please note that this setting indicates additional decimal places to
     * automatically-calculated axis number precision.
     *
     * So if your axis displays numbers like 0.1, 0.2, etc. (one decimal place),
     * and you set `extraTooltipPrecision = 1`, tooltips will display numbers
     * like 0.12, 0.25, etc. (two decimal places).
     *
     * @default 0
     * @since 4.8.3
     * @param  value  Extra decimals
     */
    /**
    * @return Extra decimals
    */
    extraTooltipPrecision: number;
    /**
     * Invalidates axis data items when series extremes change
     */
    protected handleExtremesChange(): void;
    /**
     * Returns relative position on axis for series' data item's value.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Data field to get value from
     * @param location  Location (0-1)
     * @param stackKey  ?
     * @return X coordinate (px)
     */
    getX(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * Returns the X coordinate for series' data item's value.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Data field to get value from
     * @param  location  Location (0-1)
     * @param  stackKey  ?
     * @return           Relative position
     */
    getPositionX(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * Returns the Y coordinate for series' data item's value.
     *
     * @ignore Exclude from docs
     * @todo Description (review)
     * @param dataItem  Data item
     * @param key       Data field to get value from
     * @param location  Location (0-1)
     * @param stackKey  Stack ID
     * @return Y coordinate (px)
     */
    getY(dataItem: XYSeriesDataItem, key: string, location?: number, stackKey?: string, range?: IRange): number;
    /**
     * Returns relative position on axis for series' data item's value.
     *
     * @since 4.5.14
     * @param  dataItem  Data item
     * @param  key       Data field to get value from
     * @param  location  Location (0-1)
     * @param  stackKey  Stack ID
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
     * [getAnyRangePath description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @param start     [description]
     * @param end       [description]
     * @param location  [description]
     * @return [description]
     */
    getAnyRangePath(start: number, end: number, location?: number): string;
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
    getTooltipText(position: number): string;
    /**
     * Zooms axis to specific values.
     *
     * @param startValue      Start value
     * @param endValue        End value
     * @param skipRangeEvent  Do not invoke events
     * @param instantly       Do not play zoom animations
     */
    zoomToValues(startValue: number, endValue: number, skipRangeEvent?: boolean, instantly?: boolean): void;
    /**
     * A smallest value in axis scale within current zoom.
     *
     * @return Min zoom value
     */
    readonly minZoomed: number;
    /**
     * A biggest value in axis scale within current zoom.
     * @return [description]
     */
    readonly maxZoomed: number;
    /**
     * Updates positioning of Axis breaks after something changes.
     *
     * @ignore Exclude from docs
     */
    fixAxisBreaks(): void;
    /**
     * Returns value based on position.
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
     * Shows Axis tooltip at specific value
     *
     * @param value Value
     */
    showTooltipAt(value: number): void;
    /**
     * Copies all properties and related data from a different instance of Axis.
     *
     * @param source Source Axis
     */
    copyFrom(source: this): void;
    /**
     * Enables syncing of grid with another axis.
     *
     * To enable, set to a reference of the other `ValueAxis`. This axis will try
     * to maintain its scale in such way that its grid matches target axis grid.
     *
     * IMPORTANT #1: At this stage it's an experimental feature. Use it at your
     * own risk, as it may not work in 100% of the scenarios.
     *
     * IMPORTANT #2: `syncWithAxis` is not compatible with `strictMinMax` and
     * `sequencedInterpolation` settings.
     *
     * IMPORTANT #3: `syncWithAxis` is not compatible with scrollbars. Make sure
     * you do not add a scrollbar in the same direction as synced axes. For
     * example, if you have vertical synced axes, do not add `scrollbarY` on
     * your chart. It will create anomalies when used.
     *
     * IMPORTANT #4: `syncWithAxis` is not compatible with `XYCursor` if it has
     * its `behavior` set to either `zoomY` or `zoomXY`.
     *
     * @since 4.8.1
     * @param  axis  Target axis
     */
    /**
    * @return Target axis
    */
    syncWithAxis: ValueAxis;
    /**
     * If set, zero values will be treated as this value.
     *
     * It is useful if you need to use data with zero-values on a logarithmic
     * axis scale.
     *
     * @since 4.9.34
     * @param  value  Zero replacement value
     */
    /**
    * @return Zero replacement value
    */
    treatZeroAs: number;
    /**
     * Syncs with a target axis.
     *
     * @param  min  Min
     * @param  max  Max
     * @param  step Step
     */
    protected syncAxes(min: number, max: number, step: number): {
        min: number;
        max: number;
        step: number;
    };
    /**
     * Returns `true` if axis needs to be resunced with some other axis.
     */
    protected checkSync(min: number, max: number, step: number, count: number): boolean;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
    protected _saveMinMax(_min: number, _max: number): void;
}
