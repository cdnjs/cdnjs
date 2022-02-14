/**
 * Ellipse module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Circle, ICircleProperties, ICircleAdapters, ICircleEvents } from "./Circle";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Ellipse]].
 */
export interface IEllipseProperties extends ICircleProperties {
    /**
     * Vertical radius.
     *
     * It's a relative size to the `radius`.
     *
     * E.g. 0.8 will mean the height of the ellipsis will be 80% of it's
     * horizontal radius.
     */
    radiusY?: number;
}
/**
 * Defines events for [[Ellipse]].
 */
export interface IEllipseEvents extends ICircleEvents {
}
/**
 * Defines adapters
 * Includes both the [[Adapter]] definitions and properties
 * @see {@link Adapter}
 */
export interface IEllipseAdapters extends ICircleAdapters, IEllipseProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws an ellipse
 * @see {@link IEllipseEvents} for a list of available events
 * @see {@link IEllipseAdapters} for a list of available Adapters
 */
export declare class Ellipse extends Circle {
    /**
     * Defines available properties.
     */
    _properties: IEllipseProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IEllipseAdapters;
    /**
     * Defines available events.
     */
    _events: IEllipseEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the ellipsis.
     */
    protected draw(): void;
    /**
     * Vertical radius.
     *
     * It's a relative size to the `radius`.
     *
     * E.g. 0.8 will mean the height of the ellipsis will be 80% of it's
     * horizontal radius.
     *
     * @param value  Vertical radius
     */
    /**
    * @return Vertical radius
    */
    radiusY: number;
    /**
     * Horizontal radius.
     *
     * @param value  Horizontal radius
     */
    /**
    * @return Horizontal radius
    */
    radius: number;
}
