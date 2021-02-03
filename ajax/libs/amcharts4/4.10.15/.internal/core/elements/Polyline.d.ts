/**
 * Polyline module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../Sprite";
import { IPoint, IOrientationPoint } from "../defs/IPoint";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Polyline]].
 */
export interface IPolylineProperties extends ISpriteProperties {
    /**
     * A list of segment coordinates for the multi-part line.
     */
    segments?: Array<Array<IPoint>>;
}
/**
 * Defines events for [[Polyline]].
 */
export interface IPolylineEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[Polyline]].
 *
 * @see {@link Adapter}
 */
export interface IPolylineAdapters extends ISpriteAdapters, IPolylineProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a polyline.
 *
 * @see {@link IPolylineEvents} for a list of available events
 * @see {@link IPolylineAdapters} for a list of available Adapters
 */
export declare class Polyline extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: IPolylineProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPolylineAdapters;
    /**
     * Defines available events.
     */
    _events: IPolylineEvents;
    /**
     * [_distance description]
     *
     * @todo Description
     */
    protected _distance: number;
    /**
     * [_realSegments]
     *
     * @todo Description
     */
    protected _realSegments: $type.Optional<Array<Array<IPoint>>>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Creats and adds an SVG path for the arc.
     *
     * @ignore Exclude from docs
     */
    makePath(): void;
    /**
     * A list of segment coordinates for the multi-part line.
     *
     * @todo Example
     * @param segments  Segments
     */
    /**
    * @return Segments
    */
    segments: $type.Optional<Array<Array<IPoint>>>;
    /**
     * [distance description]
     *
     * @todo Description
     * @return [description]
     */
    readonly distance: number;
    /**
     * Converts relative position along the line (0-1) into pixel coordinates.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    positionToPoint(position: number): IOrientationPoint;
    /**
     * @ignore
     */
    readonly realSegments: IPoint[][];
}
