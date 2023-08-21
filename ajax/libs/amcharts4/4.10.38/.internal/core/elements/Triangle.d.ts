/**
 * Functionality for drawing triangles.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../Sprite";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Triangle]].
 */
export interface ITriangleProperties extends ISpriteProperties {
    direction: "left" | "right" | "top" | "bottom";
}
/**
 * Defines events for [[Triangle]].
 */
export interface ITriangleEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[Triangle]].
 *
 * @see {@link Adapter}
 */
export interface ITriangleAdapters extends ISpriteAdapters, ITriangleProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a triangle.
 *
 * @see {@link ITriangleEvents} for a list of available events
 * @see {@link ITriangleAdapters} for a list of available Adapters
 */
export declare class Triangle extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: ITriangleProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ITriangleAdapters;
    /**
     * Defines available events.
     */
    _events: ITriangleEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Sets direction of a triangle
     *
     * @param value
     */
    /**
    * Returns direction of a triangle
    *
    * @return value
    */
    direction: "left" | "right" | "top" | "bottom";
}
