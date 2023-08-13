/**
 * Pointed shape module.
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
 * Defines properties for [[PointedShape]].
 */
export interface IPointedShapeProperties extends ISpriteProperties {
    /**
     * A width of the pinter's (stem's) thick end (base) in pixels.
     *
     * @default 15
     */
    pointerBaseWidth?: number;
    /**
     * A length of the pinter (stem) in pixels.
     *
     * @default 10
     */
    pointerLength?: number;
    /**
     * X coordinate the shape is pointing to.
     */
    pointerX?: number;
    /**
     * Y coordinate the shape is pointing to.
     */
    pointerY?: number;
}
/**
 * Defines events for [[PointedShape]].
 */
export interface IPointedShapeEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[PointedShape]].
 *
 * @see {@link Adapter}
 */
export interface IPointedShapeAdapters extends ISpriteAdapters, IPointedShapeProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a shape with a pointer.
 *
 * @see {@link IPointedShapeEvents} for a list of available events
 * @see {@link IPointedShapeAdapters} for a list of available Adapters
 */
export declare class PointedShape extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: IPointedShapeProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPointedShapeAdapters;
    /**
     * Defines available events.
     */
    _events: IPointedShapeEvents;
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
     * A width of the pinter's (stem's) thick end (base) in pixels.
     *
     * @default 15
     * @param value  Width (px)
     */
    /**
    * @return Width (px)
    */
    pointerBaseWidth: number;
    /**
     * A length of the pinter (stem) in pixels.
     *
     * @default 10
     * @param value  Length (px)
     */
    /**
    * @return Length (px)
    */
    pointerLength: number;
    /**
     * X coordinate the shape is pointing to.
     *
     * @param value  X
     */
    /**
    * @return X
    */
    pointerX: number;
    /**
     * Y coordinate the shape is pointing to.
     *
     * @param value  Y
     */
    /**
    * @return Y
    */
    pointerY: number;
}
