/**
 * Functionality for drawing Stars.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../../core/Sprite";
import { Percent } from "../../core/utils/Percent";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Star]].
 */
export interface IStarProperties extends ISpriteProperties {
    /**
     * Radius of the star in pixels.
     *
     * @default 100
     */
    radius?: number;
    /**
     * Vertical radius for creating skewed star.
     *
     * This is relevant to `radius`, e.g. 0.5 will set vertical radius to half
     * the `radius`.
     */
    radiusY?: number;
    /**
     * Inner radius of the star, in px or %.
     */
    innerRadius?: number | Percent;
    /**
     * The angle at which left edge of the star is drawn. (0-360)
     *
     * 0 is to the right of the center.
     *
     * @default -90
     */
    startAngle?: number;
    /**
     * Radius of stars's outer corners in pixels.
     *
     * @default 0
     */
    cornerRadius?: number;
    /**
     * Radius of stars's inner corners in pixels.
     *
     * @default 0
     */
    innerCornerRadius?: number;
    /**
     * How much of a complete circle the star will complete.
     *
     * A complete circle is 350 degrees. If set to 180, only half a star will
     * be drawn
     *
     * @default 360
     */
    arc?: number;
    /**
     * Number of points (tips).
     *
     * @default 5
     */
    pointCount?: number;
}
/**
 * Defines events for [[Star]].
 */
export interface IStarEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[Star]].
 *
 * @see {@link Adapter}
 */
export interface IStarAdapters extends ISpriteAdapters, IStarProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a Star shape.
 *
 * @since 4.5.7
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/plugin-bullets/} for usage instructions.
 * @see {@link IStarEvents} for a list of available events
 * @see {@link IStarAdapters} for a list of available Adapters
 */
export declare class Star extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: IStarProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IStarAdapters;
    /**
     * Defines available events.
     */
    _events: IStarEvents;
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
     * The angle at which left edge of the star is drawn. (0-360)
     *
     * 0 is to the right of the center.
     *
     * @default -90
     * @param value  Angle (0-360)
     */
    /**
    * @return Angle (0-360)
    */
    startAngle: number;
    /**
     * How much of a complete circle the star will complete.
     *
     * A complete circle is 350 degrees. If set to 180, only half a star will
     * be drawn
     *
     * @default 360
     * @param  value  Arc scope
     */
    /**
    * @return Arc scope
    */
    arc: number;
    /**
     * Radius of the star in pixels.
     *
     * @default 100
     * @param value  Radius (px)
     */
    /**
    * @return Radius (px)
    */
    radius: number;
    /**
     * Vertical radius for creating skewed star shapes.
     *
     * This is relevant to `radius`, e.g. 0.5 will set vertical radius to half
     * the `radius`.
     *
     * @param value Vertical radius (0-1)
     */
    /**
    * @return Vertical radius (0-1)
    */
    radiusY: number;
    /**
     * Inner radius of the star (cutout).
     *
     * It can be set either by absolute pixel value or relative to radius in
     * percent.
     *
     * @default 0
     * @param value  Radius (px or %)
     */
    /**
    * @return Radius (px or %)
    */
    innerRadius: number | Percent;
    /**
     * @return Radius px
     */
    readonly pixelInnerRadius: number;
    /**
     * Radius of star's outer corners in pixels.
     *
     * @default 0
     * @param value  Radius (px)
     */
    /**
    * @return Radius (px)
    */
    cornerRadius: number;
    /**
     * Radius of star's inner corners in pixels.
     *
     * @default 0
     * @param value  Radius (px)
     */
    /**
    * @return Radius (px)
    */
    innerCornerRadius: number;
    /**
     * Number of start points
     *
     * @default 5
     * @param value
     */
    /**
    * @return Number of star points
    */
    pointCount: number;
}
