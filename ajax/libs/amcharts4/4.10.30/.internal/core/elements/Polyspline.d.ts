/**
 * Polyspline (smoothed line) module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Polyline, IPolylineProperties, IPolylineAdapters, IPolylineEvents } from "./Polyline";
import { IPoint, IOrientationPoint } from "../../core/defs/IPoint";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Polyspline]].
 */
export interface IPolysplineProperties extends IPolylineProperties {
    /**
     * Horizontal tension for the spline.
     *
     * Used by the line smoothing algorithm.
     *
     * @default 0.5
     */
    tensionX: number;
    /**
     * Vertical tension for the spline.
     *
     * Used by the line smoothing algorithm.
     *
     * @default 0.5
     */
    tensionY: number;
}
/**
 * Defines events for [[Polyspline]].
 */
export interface IPolysplineEvents extends IPolylineEvents {
}
/**
 * Defines adapters
 * Includes both the [[Adapter]] definitions and properties
 * @see {@link Adapter}
 */
export interface IPolysplineAdapters extends IPolylineAdapters, IPolysplineProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a polysline. (smoothed multi-sigment line)
 *
 * @see {@link IPolysplineEvents} for a list of available events
 * @see {@link IPolysplineAdapters} for a list of available Adapters
 */
export declare class Polyspline extends Polyline {
    /**
     * Defines available properties.
     *
     * @todo Description
     */
    _properties: IPolysplineProperties;
    /**
     * Defines available adapters.
     *
     * @todo Description
     */
    _adapter: IPolysplineAdapters;
    /**
     * Defines available events.
     */
    _events: IPolysplineEvents;
    /**
     * Array of points of a spline with 1 px increment. used to get point by position
     */
    allPoints: IOrientationPoint[];
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
     * Returns an index of the point that is closest to specified coordinates.
     *
     * @param   point  Reference point
     * @return         Index
     */
    getClosestPointIndex(point: IPoint): number;
    /**
     * Horizontal tension for the spline.
     *
     * Used by the line smoothing algorithm.
     *
     * @default 0.5
     * @param value  Tension
     */
    /**
    * @return Tension
    */
    tensionX: number;
    /**
     * Vertical tension for the spline.
     *
     * Used by the line smoothing algorithm.
     *
     * @default 0.5
     * @param value  Tensions
     */
    /**
    * @return Tension
    */
    tensionY: number;
    /**
     * Converts relative position along the line (0-1) into pixel coordinates.
     *
     * @param position  Position (0-1)
     * @return Coordinates
     */
    positionToPoint(position: number, extend?: boolean): IOrientationPoint;
}
