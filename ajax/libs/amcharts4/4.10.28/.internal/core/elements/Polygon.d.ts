/**
 * Polygon module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../Sprite";
import { IPoint } from "../defs/IPoint";
import { Morpher } from "../utils/Morpher";
import { IMorphable } from "../defs/IMorphable";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Polygon]].
 */
export interface IPolygonProperties extends ISpriteProperties {
    /**
     * An array of X/Y coordinates for each elbow of the polygon.
     */
    points?: Array<Array<Array<IPoint>>>;
}
/**
 * Defines events for [[Polygon]].
 */
export interface IPolygonEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[Polygon]].
 *
 * @see {@link Adapter}
 */
export interface IPolygonAdapters extends ISpriteAdapters, IPolygonProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a polygon.
 *
 * @see {@link IPolygonEvents} for a list of available events
 * @see {@link IPolygonAdapters} for a list of available Adapters
 */
export declare class Polygon extends Sprite implements IMorphable {
    /**
     * Defines available properties.
     */
    _properties: IPolygonProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPolygonAdapters;
    /**
     * Defines available events.
     */
    _events: IPolygonEvents;
    /**
     * A morpher instance that is used to morph polygon into some other shape.
     */
    protected _morpher: $type.Optional<Morpher>;
    /**
     * Current points that morpher uses. This is needed so that we don't
     * overwrite polygons original points.
     */
    protected _currentPoints: Array<Array<Array<IPoint>>>;
    /**
     * Constructor
     */
    constructor();
    /**
     * An array of X/Y coordinates for each elbow of the polygon.
     *
     * @todo Example
     * @param points  Polygon points
     */
    /**
    * @return Polygon points
    */
    points: Array<Array<Array<IPoint>>>;
    /**
     * Current points. Used when morphing the element, so that original `points`
     * are not overwritten.
     *
     * @param points  Polygon points
     */
    /**
    * @return Polygon points
    */
    currentPoints: Array<Array<Array<IPoint>>>;
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * @ignore
     */
    protected setPath(value: string): boolean;
    /**
     * Measures element
     */
    protected measureElement(): void;
    /**
     * A calculated center point for the shape.
     *
     * @readonly
     * @return Center
     */
    readonly centerPoint: IPoint;
    /**
     * A [[Morpher]] instance that is used to morph polygon into some other
     * shape.
     *
     * @readonly
     * @return Morpher instance
     */
    readonly morpher: Morpher;
}
