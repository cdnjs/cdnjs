/**
 * A module which defines functionality related to Category Axis Break.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisBreak, IAxisBreakProperties, IAxisBreakAdapters, IAxisBreakEvents } from "./AxisBreak";
import { CategoryAxis } from "./CategoryAxis";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[CategoryAxisBreak]].
 */
export interface ICategoryAxisBreakProperties extends IAxisBreakProperties {
    /**
     * Category break starts on.
     */
    startCategory?: string;
    /**
     * Category break ends on.
     */
    endCategory?: string;
    /**
     * Location where break starts within cell (0-1).
     */
    startLocation?: number;
    /**
     * Location where break ends within cell (0-1).
     */
    endLocation?: number;
}
/**
 * Defines events for [[CategoryAxisBreak]].
 */
export interface ICategoryAxisBreakEvents extends IAxisBreakEvents {
}
/**
 * Defines adapters for [[CategoryAxisBreak]].
 *
 * @see {@link Adapter}
 */
export interface ICategoryAxisBreakAdapters extends IAxisBreakAdapters, ICategoryAxisBreakProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base class to define "breaks" in axes
 * @see {@link ICategoryAxisBreakEvents} for a list of available events
 * @see {@link ICategoryAxisBreakAdapters} for a list of available Adapters
 */
export declare class CategoryAxisBreak extends AxisBreak {
    /**
     * Defines available properties.
     */
    _properties: ICategoryAxisBreakProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICategoryAxisBreakAdapters;
    /**
     * Defines available events.
     */
    _events: ICategoryAxisBreakEvents;
    /**
     * Defines the type of the Axis this break is used for.
     */
    _axisType: CategoryAxis;
    /**
     * Constructor
     */
    constructor();
    /**
     * Pixel position of the break's start.
     *
     * @return Position (px)
     * @readonly
     */
    readonly startPosition: number;
    /**
     * Pixel position of the break's end.
     *
     * @return Position (px)
     * @readonly
     */
    readonly endPosition: number;
    /**
     * A category break starts on.
     *
     * @param value Start category
     */
    /**
    * @return Start category
    */
    startCategory: string;
    /**
     * A category break ends on.
     *
     * @param value  End category
     */
    /**
    * @return End category
    */
    endCategory: string;
    /**
     * An index of start category.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    startValue: number;
    /**
     * An index of end category or a end value.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    endValue: number;
    /**
     * Indicates where within starting category break should begin.
     *
     * Values range from `0` (start) to `1` (end), with default being `0.5` (middle).
     *
     * E.g. if you want to a break to fully encompass start and end categories,
     * you should set `startLocation = 0` and `endLocation = 1`.
     *
     * @since 4.9.17
     * @default 0.5
     * @param  value  Break start location
     */
    /**
    * @return Break start location
    */
    startLocation: number;
    /**
     * Indicates where within ending category break should end.
     *
     * Values range from `0` (start) to `1` (end), with default being `0.5` (middle).
     *
     * E.g. if you want to a break to fully encompass start and end categories,
     * you should set `startLocation = 0` and `endLocation = 1`.
     *
     * @since 4.9.17
     * @default 0.5
     * @param  value  Break end location
     */
    /**
    * @return Break end location
    */
    endLocation: number;
}
