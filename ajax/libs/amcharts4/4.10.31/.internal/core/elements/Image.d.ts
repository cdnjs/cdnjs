/**
 * Functionality for adding images in SVG tree.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../Sprite";
import { IRectangle } from "../defs/IRectangle";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Image]].
 */
export interface IImageProperties extends ISpriteProperties {
    /**
     * A URI of the image.
     */
    href?: string;
    /**
     * Sets image `width` in relation to its `height`.
     */
    widthRatio?: number;
    /**
     * Sets image `height` in relation to its `width`.
     */
    heightRatio?: number;
}
/**
 * Defines events for [[Image]].
 */
export interface IImageEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[Image]].
 *
 * @see {@link Adapter}
 */
export interface IImageAdapters extends ISpriteAdapters, IImageProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to add `<image>` elements to SVG.
 *
 * @see {@link IImageEvents} for a list of available events
 * @see {@link IImageAdapters} for a list of available Adapters
 */
export declare class Image extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: IImageProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IImageAdapters;
    /**
     * Defines available events.
     */
    _events: IImageEvents;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws an `<image>` element.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * An image URI.
     *
     * @param value  Image URI
     */
    /**
    * @return Image URI
    */
    href: string;
    /**
     * Sets image `width` relatively to its `height`.
     *
     * If image's `height = 100` and `widthRatio = 0.5` the actual width will be
     * `50`.
     *
     * @param value  Ratio
     */
    /**
    * @return Ratio
    */
    widthRatio: number;
    /**
     * Sets image `height` relatively to its `width`.
     *
     * If image's `width = 100` and `heightRatio = 0.5` the actual height will be
     * `50`.
     *
     * @param value  Ratio
     */
    /**
    * @return Ratio
    */
    heightRatio: number;
    /**
     * Returns bounding box (square) for this element.
     *
     * @ignore Exclude from docs
     */
    readonly bbox: IRectangle;
}
