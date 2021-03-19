/**
 * DurationAxis module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ValueAxis, ValueAxisDataItem, IValueAxisProperties, IValueAxisDataFields, IValueAxisAdapters, IValueAxisEvents } from "./ValueAxis";
import { AxisRenderer } from "./AxisRenderer";
import { TimeUnit } from "../../core/defs/TimeUnit";
import { IMinMaxStep } from "./ValueAxis";
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
export declare class DurationAxisDataItem extends ValueAxisDataItem {
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: DurationAxis;
    /**
     * Constructor
     */
    constructor();
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[DurationAxis]].
 */
export interface IDurationAxisDataFields extends IValueAxisDataFields {
}
/**
 * Defines properties for [[DurationAxis]].
 */
export interface IDurationAxisProperties extends IValueAxisProperties {
}
/**
 * Defines events for [[DurationAxis]].
 */
export interface IDurationAxisEvents extends IValueAxisEvents {
}
/**
 * Defines adapters for [[DurationAxis]].
 *
 * @see {@link Adapter}
 */
export interface IDurationAxisAdapters extends IValueAxisAdapters, IDurationAxisProperties {
}
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
export declare class DurationAxis<T extends AxisRenderer = AxisRenderer> extends ValueAxis<T> {
    /**
     * Defines data fields.
     */
    _dataFields: IDurationAxisDataFields;
    /**
     * Defines available properties.
     */
    _properties: IDurationAxisProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IDurationAxisAdapters;
    /**
     * Defines available events.
     */
    _events: IDurationAxisEvents;
    /**
     * Defines the type of the Date Items.
     */
    _dataItem: DurationAxisDataItem;
    /**
     * A base unit (granularity) of data.
     *
     * Used to indicate what are the base units of your data.
     */
    protected _baseUnit: TimeUnit;
    /**
     * A special duration format to apply axis tooltips.
     *
     * Will use same format as for labels, if not set.
     */
    protected _tooltipDurationFormat: string;
    /**
     * Axis date format chosen dynamically based on min/max and baseUnit.
     *
     * @readonly
     */
    axisDurationFormat: string;
    /**
     * Constructor
     */
    constructor();
    /**
     * Formats the value according to axis' own [[DurationFormatter]].
     *
     * @param value  Source value
     * @return Formatted value
     */
    formatLabel(value: number, format?: string): string;
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
     * A special duration format to apply axis tooltips.
     *
     * Will use same format as for labels, if not set.
     *
     * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-duration/} for mor information.
     * @param value  Duration format for axis labels
     */
    /**
    * @return Duration format for axis labels
    */
    tooltipDurationFormat: string;
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
    /**
    * @return Base unit
    */
    baseUnit: TimeUnit;
    /**
     * Copies all properties and related data from a different instance of Axis.
     *
     * @param source Source Axis
     */
    copyFrom(source: this): void;
}
