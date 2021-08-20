/**
 * Functionality for drawing simple ClockHands
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../../core/Container";
import { Circle } from "../../core/elements/Circle";
import { Trapezoid } from "../../core/elements/Trapezoid";
import { Axis } from "../axes/Axis";
import { MutableValueDisposer } from "../../core/utils/Disposer";
import { Percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[ClockHand]].
 */
export interface IClockHandProperties extends IContainerProperties {
    /**
     * Radius of the hand's outer end. (tip)
     *
     * Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(100)
     */
    radius: number | Percent;
    /**
     * Radius of the hand's inner end. (base)
     *
     * Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(0)
     */
    innerRadius: number | Percent;
    /**
     * Width, in pixels, of the clock hand's tip.
     *
     * @default 1
     */
    endWidth: number;
    /**
     * Width, in pixels, of the clock hand's base.
     *
     * @default 5
     */
    startWidth: number;
    /**
     * rotation direction
     * @default "any"
     */
    rotationDirection: "any" | "clockWise" | "counterClockWise";
}
/**
 * Defines events for [[ClockHand]].
 */
export interface IClockHandEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[ClockHand]].
 *
 * @see {@link Adapter}
 */
export interface IClockHandAdapters extends IContainerAdapters, IClockHandProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * ClockHand class is capable of drawing a simple pointy shape with optionally
 * rounderd corners and an icon.
 *
 * @see {@link IClockHandEvents} for a list of available events
 * @see {@link IClockHandAdapters} for a list of available Adapters
 * @todo Improve
 * @important
 */
export declare class ClockHand extends Container {
    /**
     * Defines available properties.
     */
    _properties: IClockHandProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IClockHandAdapters;
    /**
     * Defines available events.
     */
    _events: IClockHandEvents;
    /**
     * A circle element used as hand's base.
     */
    protected _pin: Circle;
    /**
     * A trapezoid shape used for hand itself.
     */
    protected _hand: Trapezoid;
    /**
     * An Axis hand is related to.
     */
    protected _axis: MutableValueDisposer<Axis>;
    /**
     * Hand's current value.
     */
    protected _value: any;
    /**
     * Constructor
     */
    constructor();
    /**
     * Re(validates) the clock hand, effectively redrawing it.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * A circle element used as hand's base. (pin)
     *
     * @param pin  Pin element
     */
    /**
    * @return Pin element
    */
    pin: Circle;
    /**
     * A trapezoid shape used for hand itself.
     *
     * The shape of the trapezoid is controlled by ClockHand's `startWidth` and
     * `endWidth` properties.
     *
     * Set `endWidth` to 1 (px) to make it pointy.
     *
     * @param hand  Hand element
     */
    /**
    * @return Hand element
    */
    hand: Trapezoid;
    /**
     * Radius of the hand's outer end. (tip)
     *
     * Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(0)
     * @param value  Radius
     */
    /**
    * @return Radius
    */
    radius: number | Percent;
    /**
     * Radius of the hand's inner end. (base)
     *
     * Absolute (px) or relative ([[Percent]]).
     *
     * @default Percent(0)
     * @param value  Radius
     */
    /**
    * @return Radius
    */
    innerRadius: number | Percent;
    /**
     * Width, in pixels, of the clock hand's inner end. (base)
     *
     * @default 5
     * @param value  Width (px)
     */
    /**
    * @return Width (px)
    */
    startWidth: number;
    /**
     * Width, in pixels, of the clock hand's outer end. (tip)
     *
     * @default 1
     * @param value  Width (px)
     */
    /**
    * @return Width (px)
    */
    endWidth: number;
    /**
     * Rotation direction
     *
     * @default any
     * @param value
     */
    /**
    * @return rotationDirection
    */
    rotationDirection: "any" | "clockWise" | "counterClockWise";
    /**
     * Moves clock hand to particular value.
     *
     * If `duration` is set to a number in milliseconds, the hand will move
     * to the new position gracefully, rather than jumping rigth to it.
     *
     * Alternatively, you can also set `value` directly.
     *
     * @param value     New value
     * @param duration  Animation duration (ms)
     * @param easing  Animation easing function
     */
    showValue(value: any, duration?: number, easing?: (value: number) => number): void;
    /**
     * Returns hand's relative position on axis
     */
    readonly currentPosition: number;
    /**
     * A current value clock hand is pointing to.
     *
     * @param value  Value
     */
    /**
    * @return Value
    */
    value: any;
    /**
     * An Axis clock hand is associated with.
     *
     * Hand's `value` relates to values on the Axis.
     *
     * @param axis  Axis
     */
    /**
    * @return Axis
    */
    axis: Axis;
    /**
     * Triggers `value` accessor, so that Hand animates to new position, in case
     * value has changed.
     *
     * @ignore Exclude from docs
     */
    protected updateValue(): void;
    /**
 * Processes JSON-based config before it is applied to the object.
 *
 * @ignore Exclude from docs
 * @param config  Config
 */
    processConfig(config?: {
        [index: string]: any;
    }): void;
}
