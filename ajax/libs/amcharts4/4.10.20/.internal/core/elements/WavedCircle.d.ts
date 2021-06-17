/**
 * Functionality for drawing waved circles.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Circle, ICircleProperties, ICircleAdapters, ICircleEvents } from "./Circle";
import { IWavedShape } from "../defs/IWavedShape";
import { IPoint } from "../defs/IPoint";
import { Percent } from "../utils/Percent";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[WavedCircle]].
 */
export interface IWavedCircleProperties extends ICircleProperties {
    /**
     * Wave length in pixels.
     *
     * @default 16
     */
    waveLength?: number;
    /**
     * Wave height in pixels.
     *
     * @default 4
     */
    waveHeight?: number;
    /**
     * Wave tension.
     *
     * @default 0.8
     */
    tension?: number;
    /**
     * Inner radius of the circle in pixels.
     */
    innerRadius?: number | Percent;
}
/**
 * Defines events for [[WavedCircle]].
 */
export interface IWavedCircleEvents extends ICircleEvents {
}
/**
 * Defines adapters for [[WavedCircle]].
 *
 * @see {@link Adapter}
 */
export interface IWavedCircleAdapters extends ICircleAdapters, IWavedCircleProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a waved circle.
 *
 * @see {@link IWavedCircleEvents} for a list of available events
 * @see {@link IWavedCircleAdapters} for a list of available Adapters
 */
export declare class WavedCircle extends Circle implements IWavedShape {
    /**
     * Defines available properties.
     */
    _properties: IWavedCircleProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IWavedCircleAdapters;
    /**
     * Defines available events.
     */
    _events: IWavedCircleEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the waved line.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Returns points that circle consists of.
     *
     * @param radius  Radius (px)
     * @return Points
     */
    protected getPoints(radius: number): IPoint[];
    /**
     * Inner radius of the circle in pixels (absolute) or [[Percent]] (relative).
     *
     * @param value  Inner radius
     */
    /**
    * @return Inner radius
    */
    innerRadius: number | Percent;
    /**
     * Calculated inner radius of the circle in pixels.
     *
     * @readonly
     * @return Inner radius (px)
     */
    readonly pixelInnerRadius: number;
    /**
     * Wave length in pixels.
     *
     * @default 16
     * @param value  Wave length (px)
     */
    /**
    * @return Wave length (px)
    */
    waveLength: number;
    /**
     * Wave height in pixels.
     *
     * @default 4
     * @param value  Wave height (px)
     */
    /**
    * @return Wave height (px)
    */
    waveHeight: number;
    /**
     * Tension of the wave.
     *
     * @default 0.8
     * @param value  Tension
     */
    /**
    * @return Tension
    */
    tension: number;
}
