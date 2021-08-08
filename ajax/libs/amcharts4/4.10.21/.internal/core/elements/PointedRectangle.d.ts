/**
 * Pointed rectangle module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { PointedShape, IPointedShapeProperties, IPointedShapeAdapters, IPointedShapeEvents } from "./PointedShape";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[PointedRectangle]].
 */
export interface IPointedRectangleProperties extends IPointedShapeProperties {
    /**
     * Radius of rectangle's border in pixels.
     *
     * @default 0
     */
    cornerRadius?: number;
}
/**
 * Defines events for [[PointedRectangle]].
 */
export interface IPointedRectangleEvents extends IPointedShapeEvents {
}
/**
 * Defines adapters for [[PointedRectangle]].
 *
 * @see {@link Adapter}
 */
export interface IPointedRectangleAdapters extends IPointedShapeAdapters, IPointedRectangleProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a rectangle with a pointer.
 *
 * @see {@link IPointedRectangleEvents} for a list of available events
 * @see {@link IPointedRectangleAdapters} for a list of available Adapters
 */
export declare class PointedRectangle extends PointedShape {
    /**
     * Defines available properties.
     */
    _properties: IPointedRectangleProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPointedRectangleAdapters;
    /**
     * Defines available events.
     */
    _events: IPointedRectangleEvents;
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
     * Radius of rectangle's border in pixels.
     *
     * @default 0
     * @param value  Corner radius (px)
     */
    /**
    * @return Corner radius (px)
    */
    cornerRadius: number;
}
