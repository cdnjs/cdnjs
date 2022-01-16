/**
 * Rounded rectangle module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../Sprite";
import { Percent } from "../utils/Percent";
import { IRectangle } from "../defs/IRectangle";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[RoundedRectangle]].
 */
export interface IRoundedRectangleProperties extends ISpriteProperties {
    /**
     * Radius of the top-left corner in pixels.
     *
     * @default 3
     */
    cornerRadiusTopLeft?: number;
    /**
     * Radius of the top-right corner in pixels.
     *
     * @default 3
     */
    cornerRadiusTopRight?: number;
    /**
     * Radius of the bottom-right corner in pixels.
     *
     * @default 3
     */
    cornerRadiusBottomRight?: number;
    /**
     * Radius of the bottom-left corner in pixels.
     *
     * @default 3
     */
    cornerRadiusBottomLeft?: number;
}
/**
 * Defines events for [[RoundedRectangle]].
 */
export interface IRoundedRectangleEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[RoundedRectangle]].
 *
 * @see {@link Adapter}
 */
export interface IRoundedRectangleAdapters extends ISpriteAdapters, IRoundedRectangleProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a rectangle with rounded corners.
 *
 * @see {@link IRoundedRectangleEvents} for a list of available events
 * @see {@link IRoundedRectangleAdapters} for a list of available Adapters
 */
export declare class RoundedRectangle extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: IRoundedRectangleProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IRoundedRectangleAdapters;
    /**
     * Defines available events.
     */
    _events: IRoundedRectangleEvents;
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
     * Sets radius for all four corners at ones.
     *
     * All numbers are in pixels.
     *
     * @param tl  Top-left corner
     * @param tr  Top-right corner
     * @param bl  Bottom-left corner
     * @param br  Bottom-right corner
     */
    cornerRadius(tl: number | Percent, tr: number | Percent, bl: number | Percent, br: number | Percent): void;
    /**
     * Radius of the top-left corner in pixels.
     *
     * @default 3
     * @param value  Radius (px or Percent)
     */
    /**
    * @return Radius (px or Percent)
    */
    cornerRadiusTopLeft: number | Percent;
    /**
     * Radius of the top-right corner in pixels.
     *
     * @default 3
     * @param value  Radius (px or Percent)
     */
    /**
    * @return Radius (px or Percent)
    */
    cornerRadiusTopRight: number | Percent;
    /**
     * Radius of the bottom-right corner in pixels.
     *
     * @default 3
     * @param value  Radius (px or Percent)
     */
    /**
    * @return Radius (px or Percent)
    */
    cornerRadiusBottomRight: number | Percent;
    /**
     * Radius of the bottom-left corner in pixels.
     *
     * @default 3
     * @param value  Radius (px or Percent)
     */
    /**
    * @return Radius (px or Percent)
    */
    cornerRadiusBottomLeft: number | Percent;
    /**
     * Measures the element.
     *
     * @ignore Exclude from docs
     */
    measureElement(): void;
    /**
     * Returns bounding box (square) for this element.
     *
     * @ignore Exclude from docs
     */
    readonly bbox: IRectangle;
}
