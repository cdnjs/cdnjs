/**
 * DateAxisBreak includes functionality to add breaks on a [[DateAxis]].
 *
 * A "break" can be used to "cut out" specific ranges of the axis scale, e.g.
 * weekends and holidays out of the Date-based axis.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ValueAxisBreak, IValueAxisBreakProperties, IValueAxisBreakAdapters, IValueAxisBreakEvents } from "./ValueAxisBreak";
import { DateAxis } from "./DateAxis";
import { ITimeInterval } from "../../core/defs/ITimeInterval";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[DateAxisBreak]].
 */
export interface IDateAxisBreakProperties extends IValueAxisBreakProperties {
    /**
     * A `Date` break starts on.
     */
    startDate?: Date;
    /**
     * A `Date` break ends on.
     */
    endDate?: Date;
}
/**
 * Defines events for [[DateAxisBreak]]
 */
export interface IDateAxisBreakEvents extends IValueAxisBreakEvents {
}
/**
 * Defines adapters for [[DateAxisBreak]].
 *
 * @see {@link Adapter}
 */
export interface IDateAxisBreakAdapters extends IValueAxisBreakAdapters, IDateAxisBreakProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to define breaks for [[DateAxis]].
 *
 * A "break" can be used to "cut out" specific ranges of the axis scale, e.g.
 * weekends and holidays out of the Date-based axis.
 *
 * @see {@link IDateAxisBreakEvents} for a list of available events
 * @see {@link IDateAxisBreakAdapters} for a list of available Adapters
 * @important
 */
export declare class DateAxisBreak extends ValueAxisBreak {
    /**
     * Defines available properties.
     */
    _properties: IDateAxisBreakProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IDateAxisBreakAdapters;
    /**
     * Defines available events.
     */
    _events: IDateAxisBreakEvents;
    /**
     * Defines the type of the Axis this break is used for.
     */
    _axisType: DateAxis;
    /**
     * [gridInterval description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    gridInterval: ITimeInterval;
    /**
     * [gridDate description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    gridDate: Date;
    /**
     * Constructor
     */
    constructor();
    /**
     * Starting date for the break.
     *
     * @param value Start date
     */
    /**
    * @return Start date
    */
    startDate: Date;
    /**
     * Ending date for the break.
     *
     * @param value End date
     */
    /**
    * @return End date
    */
    endDate: Date;
}
