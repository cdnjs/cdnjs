/**
 * A module which defines functionality related to Value Axis Break.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AxisBreak, IAxisBreakProperties, IAxisBreakAdapters, IAxisBreakEvents } from "./AxisBreak";
import { ValueAxis } from "./ValueAxis";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[ValueAxisBreak]].
 */
export interface IValueAxisBreakProperties extends IAxisBreakProperties {
    /**
     * Value break starts on.
     */
    startValue?: number;
    /**
     * Value break ends on.
     */
    endValue?: number;
}
/**
 * Defines events for [[ValueAxisBreak]].
 */
export interface IValueAxisBreakEvents extends IAxisBreakEvents {
}
/**
 * Defines adapters for [[ValueAxisBreak]].
 *
 * @see {@link Adapter}
 */
export interface IValueAxisBreakAdapters extends IAxisBreakAdapters, IValueAxisBreakProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base class to define "breaks" on value axis.
 *
 * A "break" can be used to "cut out" specific ranges of the axis scale, e.g.
 * when comparing columns with relatively similar values, it would make sense
 * to cut out their mid section, so that their tip differences are more
 * prominent.
 *
 * @see {@link IValueAxisBreakEvents} for a list of available events
 * @see {@link IValueAxisBreakAdapters} for a list of available Adapters
 * @important
 */
export declare class ValueAxisBreak extends AxisBreak {
    /**
     * Defines available properties.
     */
    _properties: IValueAxisBreakProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IValueAxisBreakAdapters;
    /**
     * Defines available events.
     */
    _events: IValueAxisBreakEvents;
    /**
     * Defines the type of the Axis this break is used for.
     */
    _axisType: ValueAxis;
    /**
     * [adjustedStep description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    adjustedStep: number;
    /**
     * [adjustedMin description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    adjustedMin: number;
    /**
     * [adjustedMax description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    adjustedMax: number;
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
}
