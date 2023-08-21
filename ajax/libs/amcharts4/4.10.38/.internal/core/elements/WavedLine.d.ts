/**
 * Functionality for drawing waved lines.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Line, ILineProperties, ILineAdapters, ILineEvents } from "./Line";
import { IWavedShape } from "../defs/IWavedShape";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines available properties for [[WavedLine]].
 */
export interface IWavedLineProperties extends ILineProperties {
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
}
/**
 * Defines events for [[WavedLine]].
 */
export interface IWavedLineEvents extends ILineEvents {
}
/**
 * Defines adapters for [[WavedLine]].
 *
 * @see {@link Adapter}
 */
export interface IWavedLineAdapters extends ILineAdapters, IWavedLineProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a waved line.
 *
 * @see {@link IWavedLineEvents} for a list of available events
 * @see {@link IWavedLineAdapters} for a list of available Adapters
 */
export declare class WavedLine extends Line implements IWavedShape {
    /**
     * Defines available properties.
     */
    _properties: IWavedLineProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IWavedLineAdapters;
    /**
     * Defines available events.
     */
    _events: IWavedLineEvents;
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
