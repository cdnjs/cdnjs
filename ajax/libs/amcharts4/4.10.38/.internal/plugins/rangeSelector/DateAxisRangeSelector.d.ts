/**
 * Range selector for [[DateAxis]].
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { RangeSelector, IRangeSelectorEvents } from "./RangeSelector";
import { DateAxis } from "../../charts/axes/DateAxis";
import { AxisRenderer } from "../../charts/axes/AxisRenderer";
import { ITimeInterval } from "../../core/defs/ITimeInterval";
import { DateFormatter } from "../../core/formatters/DateFormatter";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
export interface IDateAxisRangeSelectorPeriod {
    name: string;
    interval: ITimeInterval | "ytd" | "max";
}
/**
 * Defines events for [[RangeSelector]].
 */
export interface IDateAxisRangeSelectorEvents extends IRangeSelectorEvents {
    /**
     * Invoked when pre-defined period is selected (button clicked).
     *
     * @since 4.10.3
     */
    periodselected: {
        interval: ITimeInterval;
        startDate: Date;
    };
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a control used to select date range and preset periods for
 * a [[DateAxis]].
 *
 * ```TypeScript
 * let selector = new am4plugins_rangeSelector.DateAxisRangeSelector()
 * selector.container = document.getElementById("selectordiv");
 * selector.axis = chart.xAxes.getIndex(0);
 * ```
 * ```JavaScript
 * var selector = new am4plugins_rangeSelector.DateAxisRangeSelector()
 * selector.container = document.getElementById("selectordiv");
 * selector.axis = chart.xAxes.getIndex(0);
 * ```
 *
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-range-selector/} for more information on how to use this plugin
 * @important
 * @todo JSON example
 */
export declare class DateAxisRangeSelector extends RangeSelector {
    /**
     * Defines available events.
     */
    _events: IDateAxisRangeSelectorEvents;
    /**
     * Reference to target axis.
     *
     * @ignore
     */
    _axis: DateAxis<AxisRenderer>;
    /**
     * Holds references to various HTML elements control consists of.
     */
    protected _elements: {
        wrapper?: HTMLElement;
        rangeWrapper?: HTMLElement;
        fromTitle?: HTMLElement;
        fromInput?: HTMLInputElement;
        toTitle?: HTMLElement;
        toInput?: HTMLInputElement;
        periodWrapper?: HTMLElement;
        periodTitle?: HTMLElement;
        periodButtons?: HTMLElement[];
    };
    /**
     * List of pre-defined period buttons.
     */
    protected _periods: IDateAxisRangeSelectorPeriod[];
    /**
     * Date format to use for input fields.
     */
    protected _inputDateFormat: string;
    /**
     * Date formatter.
     */
    protected _dateFormatter: DateFormatter;
    /**
     * Timeout to use to delay zooming of axis (so it does not happen on
     * every keystroke in input fields).
     */
    private _zoomTimeout;
    /**
     * Number of milliseconds to wait after last keystroke in date input field
     * before zooming the axis.
     *
     * @default 500
     */
    zoomDelay: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * (Re)draws the control.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Adds events to the axis.
     */
    protected prepAxis(): void;
    /**
     * Draws the control.
     *
     * @ignore
     */
    draw(): void;
    /**
     * Updates input values based on the current zoom selection of the axis.
     *
     * @ignore
     */
    updateRangeInputs(): void;
    /**
     * Zooms axis according to input fields.
     *
     * @ignore
     */
    updateZoom(): void;
    /**
     * Zooms the axis to a preset time interal or `"ytd"` or `"max"`.
     *
     * @param  interval  Interval
     */
    setPeriodInterval(interval: ITimeInterval | "ytd" | "max", simulated?: boolean): void;
    private getGroupInterval;
    /**
     * Zooms the axis using start date.
     *
     * @param  date  Start date
     */
    zoomToDates(date: Date): void;
    /**
     * Getters and setters
     */
    /**
     * A list of pre-defined periods to show buttons for.
     *
     * @param  value  Periods
     */
    /**
    * @return Periods
    */
    periods: IDateAxisRangeSelectorPeriod[];
    /**
     * A [[DateFormatter]] instance to use.
     *
     * If not set, control will inherit one from the target axis.
     *
     * @param  value  Formatter
     */
    /**
    * @return Formatter
    */
    dateFormatter: DateFormatter;
    /**
     * An format to use for the date input fields.
     *
     * If not set, it will use `dateFormat` from the [[DateFormatter]] object.
     *
     * @default "yyyy-MM-dd"
     * @param  value  Date format
     */
    /**
    * @return Date format
    */
    inputDateFormat: string;
}
