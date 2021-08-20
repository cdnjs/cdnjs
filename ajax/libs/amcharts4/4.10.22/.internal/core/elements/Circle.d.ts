/**
 * Functionality for drawing circles.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../Sprite";
import { Percent } from "../utils/Percent";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Circle]].
 */
export interface ICircleProperties extends ISpriteProperties {
    /**
     * Radius of the circle.
     *
     * Can be either absolute (pixels) or relative ([Percent]).
     */
    radius?: number | Percent;
}
/**
 * Defines events for [[Circle]].
 */
export interface ICircleEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[Circle]].
 *
 * @see {@link Adapter}
 */
export interface ICircleAdapters extends ISpriteAdapters, ICircleProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to create a circle
 * @see {@link ICircleEvents} for a list of available events
 * @see {@link ICircleAdapters} for a list of available Adapters
 */
export declare class Circle extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: ICircleProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICircleAdapters;
    /**
     * Defines available events.
     */
    _events: ICircleEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the circle.
     */
    protected draw(): void;
    /**
     * Radius of the circle.
     *
     * Can be either absolute (pixels) or relative ([Percent]).
     *
     * @param value  Radius
     */
    /**
    * @return Radius
    */
    radius: number | Percent;
    /**
     * Radius of the circle in pixels.
     *
     * This is a read-only property. To set radius in pixels, use `radius`
     * property.
     *
     * @readonly
     * @return Radius (px)
     */
    readonly pixelRadius: number;
    /**
     * Updates bounding box.
     *
     * @ignore Exclude from docs
     */
    measureElement(): void;
}
