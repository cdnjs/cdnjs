/**
 * Functionality for drawing rectangles.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../Sprite";
import { IRectangle } from "../defs/IRectangle";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Rectangle]].
 */
export interface IRectangleProperties extends ISpriteProperties {
}
/**
 * Defines events for [[Rectangle]].
 */
export interface IRectangleEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[Rectangle]].
 *
 * @see {@link Adapter}
 */
export interface IRectangleAdapters extends ISpriteAdapters, IRectangleProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a rectangle.
 *
 * @see {@link IRectangleEvents} for a list of available events
 * @see {@link IRectangleAdapters} for a list of available Adapters
 */
export declare class Rectangle extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: IRectangleProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IRectangleAdapters;
    /**
     * Defines available events.
     */
    _events: IRectangleEvents;
    /**
     * Constructor
     * * Creates a `<rect>` element
     * * Creates default state
     */
    constructor();
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Measures the element.
     *
     * @ignore Exclude from docs
     */
    measureElement(): void;
    /**
     * Returns bounding box (square) for this element.
     *
     * @ignore Exclude from docs
     */
    readonly bbox: IRectangle;
}
