/**
 * Line drawing functionality.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../Sprite";
import { IOrientationPoint } from "../defs/IPoint";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Line]].
 */
export interface ILineProperties extends ISpriteProperties {
    /**
     * X coordinate of first end.
     */
    x1?: number;
    /**
     * Y coordinate of first end.
     */
    y1?: number;
    /**
     * X coordinate of second end.
     */
    x2?: number;
    /**
     * Y coordinate of second end.
     */
    y2?: number;
}
/**
 * Defines events for [[Line]].
 */
export interface ILineEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[Line]].
 *
 * @see {@link Adapter}
 */
export interface ILineAdapters extends ISpriteAdapters, ILineProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a line.
 *
 * @see {@link ILineEvents} for a list of available events
 * @see {@link ILineAdapters} for a list of available Adapters
 */
export declare class Line extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: ILineProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ILineAdapters;
    /**
     * Defines available events.
     */
    _events: ILineEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the line.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * X coordinate of first end.
     *
     * @param value X
     */
    /**
    * @return X
    */
    x1: number;
    /**
     * X coordinate of second end.
     *
     * @param value X
     */
    /**
    * @return X
    */
    x2: number;
    /**
     * Y coordinate of first end.
     *
     * @param value Y
     */
    /**
    * @return Y
    */
    y1: number;
    /**
     * Y coordinate of second end.
     *
     * @param value Y
     */
    /**
    * @return Y
    */
    y2: number;
    /**
     * Converts relative position along the line (0-1) into pixel coordinates.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    positionToPoint(position: number): IOrientationPoint;
}
