/**
 * Module that defines everything related to building Curved Columns.
 * It is a container which has CurvedColumn element which is a Sprite.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Column, IColumnProperties, IColumnAdapters, IColumnEvents } from "./Column";
import { Sprite } from "../../core/Sprite";
import { Orientation } from "../../core/defs/Orientation";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[CurvedColumn]].
 */
export interface ICurvedColumnProperties extends IColumnProperties {
    /**
     * Horizontal tension setting of the line (0-1).
     *
     * Used for smoothed lines.
     *
     * @default 1
     */
    tensionX?: number;
    /**
     * Tension
     */
    tension?: number;
    /**
     * Orientation of the column
     *
     * @default "vertical"
     */
    orientation?: Orientation;
}
/**
 * Defines events for [[CurvedColumn]].
 */
export interface ICurvedColumnEvents extends IColumnEvents {
}
/**
 * Defines adapters for [[CurvedColumn]].
 *
 * @see {@link Adapter}
 */
export interface ICurvedColumnAdapters extends IColumnAdapters, ICurvedColumnProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Class used to creates CurvedColumns.
 *
 * @see {@link ICurvedColumnEvents} for a list of available events
 * @see {@link ICurvedColumnAdapters} for a list of available Adapters
 * @important
 */
export declare class CurvedColumn extends Column {
    /**
     * Defines available properties.
     */
    _properties: ICurvedColumnProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ICurvedColumnAdapters;
    /**
     * Defines available events.
     */
    _events: ICurvedColumnEvents;
    /**
     * The element that holds curved column shape.
     */
    curvedColumn: Sprite;
    /**
     * Constructor
     */
    constructor();
    /**
     * [createAssets description]
     *
     * @todo Description
     * @ignore Exclude from docs
     */
    protected createAssets(): void;
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Copies all parameters from another [[CurvedColumn]].
     *
     * @param source  Source CurvedColumn
     */
    copyFrom(source: this): void;
    /**
     * Horizontal tension of the curve.
     *
     * Tension defines how "lose" the line will be.
     *
     * 1 is the maximum tension which would result in pointy columns with
     * straight edges.
     *
     * The smaller the tension th wider the column will be.
     *
     * @default 0.7
     * @param value tension (0-1)
     */
    /**
    * @return Tension (0-1)
    */
    tension: number;
    /**
     * Orientation of the column.
     *
     * Available options: "vertical" (default) and "horizontal".
     *
     * @default "vertical"
     * @param value  Orientation
     */
    /**
    * Orientation
    */
    orientation: Orientation;
}
