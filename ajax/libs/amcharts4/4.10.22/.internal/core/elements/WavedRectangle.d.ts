/**
 * Functionality for drawing rectangles with waved edges.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Rectangle, IRectangleProperties, IRectangleAdapters, IRectangleEvents } from "./Rectangle";
import { IWavedShape } from "../defs/IWavedShape";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines available properties for [[WavedRectangle]].
 */
export interface IWavedRectangleProperties extends IRectangleProperties {
    /**
     * Wave length in pixels.
     *
     * @default 16
     */
    waveHeight?: number;
    /**
     * Wave height in pixels.
     *
     * @default 4
     */
    waveLength?: number;
    /**
     * Wave tension.
     *
     * @default 0.8
     */
    tension?: number;
    /**
     * If right side of a rectangle should be waved.
     *
     * @default true
     */
    wavedRight?: boolean;
    /**
     * If left side of a rectangle should be waved.
     *
     * @default true
     */
    wavedLeft?: boolean;
    /**
     * If top side of a rectangle should be waved.
     *
     * @default true
     */
    wavedTop?: boolean;
    /**
     * If bottom side of a rectangle should be waved.
     *
     * @default true
     */
    wavedBottom?: boolean;
}
/**
 * Defines events for [[WavedRectangle]].
 */
export interface IWavedRectangleEvents extends IRectangleEvents {
}
/**
 * Defines adapters for [[WavedRectangle]].
 *
 * @see {@link Adapter}
 */
export interface IWavedRectangleAdapters extends IRectangleAdapters, IWavedRectangleProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a rectangle with waved edges.
 *
 * @see {@link IWavedRectangleEvents} for a list of available events
 * @see {@link IWavedRectangleAdapters} for a list of available Adapters
 */
export declare class WavedRectangle extends Rectangle implements IWavedShape {
    /**
     * Defines available properties.
     */
    _properties: IWavedRectangleProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IWavedRectangleAdapters;
    /**
     * Defines available events.
     */
    _events: IWavedRectangleEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the waved rectangle.
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
     * Sets which side should be waved or not. If particular side is set to
     * `false`, a straight line will be drawn on that side.
     *
     * @param top     Top waved?
     * @param right   Right side waved?
     * @param bottom  Bottom Waved?
     * @param left    Left side waved?
     */
    setWavedSides(top: boolean, right: boolean, bottom: boolean, left: boolean): void;
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
    /**
     * Specifies if right side should be waved.
     *
     * @default true
     * @param value Waved?
     */
    /**
    * @return Wave right side?
    */
    wavedRight: boolean;
    /**
     * Specifies if left side should be waved.
     *
     * @default true
     * @param value Waved?
     */
    /**
    * @return Wave left side?
    */
    wavedLeft: boolean;
    /**
     * Specifies if top side should be waved.
     *
     * @default true
     * @param value Waved?
     */
    /**
    * @return Wave top side?
    */
    wavedTop: boolean;
    /**
     * Specifies if bottom side should be waved.
     *
     * @default true
     * @param value Waved?
     */
    /**
    * @return Wave bottom side?
    */
    wavedBottom: boolean;
}
