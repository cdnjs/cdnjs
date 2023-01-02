/**
 * Slice module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container, IContainerProperties, IContainerAdapters, IContainerEvents } from "../Container";
import { Sprite } from "../Sprite";
import { Percent } from "../utils/Percent";
import { IRectangle } from "../defs/IRectangle";
import { RadialGradient } from "../rendering/fills/RadialGradient";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[Slice]].
 */
export interface ISliceProperties extends IContainerProperties {
    /**
     * Radius of the slice in pixels.
     */
    radius?: number;
    /**
     * Vertical radius for creating skewed slices.
     *
     * This is relevant to `radius`, e.g. 0.5 will set vertical radius to half
     * the `radius`.
     */
    radiusY?: number;
    /**
     * Inner radius of the slice for creating cut out (donut) slices, in px or %
     */
    innerRadius?: number | Percent;
    /**
     * The angle at which left edge of the slice is drawn. (0-360)
     *
     * 0 is to the right of the center.
     */
    startAngle?: number;
    /**
     * [arc description]
     *
     * @todo Description
     */
    arc?: number;
    /**
     * [shiftRadius description]
     *
     * @todo Description
     */
    shiftRadius?: number;
    /**
     * Radius of slice's outer corners in pixels.
     *
     * @default 0
     */
    cornerRadius?: number;
    /**
     * Radius of slice's inner corners in pixels.
     *
     * @default 0
     */
    innerCornerRadius?: number;
}
/**
 * Defines events for [[Slice]].
 */
export interface ISliceEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[Slice]].
 *
 * @see {@link Adapter}
 */
export interface ISliceAdapters extends IContainerAdapters, ISliceProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws a wedged semi-circle - slice. Usually used for Pie/Donut charts.
 *
 * @see {@link ISliceEvents} for a list of available events
 * @see {@link ISliceAdapters} for a list of available Adapters
 */
export declare class Slice extends Container {
    /**
     * Defines available properties.
     */
    _properties: ISliceProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISliceAdapters;
    /**
     * Defines available events.
     */
    _events: ISliceEvents;
    /**
     * Main slice element.
     *
     * Slice itself is a [[Container]] so that [[Slice3D]] could extend it and
     * add 3D elements to it.
     */
    slice: Sprite;
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
    protected updateGradient(gradient: RadialGradient): void;
    /**
     * Returns bounding box (square) for this element.
     *
     * @ignore Exclude from docs
     */
    readonly bbox: IRectangle;
    /**
     * The angle at which left edge of the slice is drawn. (0-360)
     *
     * 0 is to the right of the center.
     *
     * @param value  Angle (0-360)
     */
    /**
    * @return Angle (0-360)
    */
    startAngle: number;
    /**
     * [arc description]
     *
     * @todo Description
     * @param value [description]
     */
    /**
    * @return [description]
    */
    arc: number;
    /**
     * Radius of the slice in pixels.
     *
     * @param value  Radius (px)
     */
    /**
    * @return Radius (px)
    */
    radius: number;
    /**
     * Vertical radius for creating skewed slices.
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
     * Inner radius of the slice for creating cut out (donut) slices.
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
     * Radius of slice's outer corners in pixels.
     *
     * @default 0
     * @param value  Radius (px)
     */
    /**
    * @return Radius (px)
    */
    cornerRadius: number;
    /**
     * Radius of slice's inner corners in pixels.
     *
     * @default 0
     * @param value  Radius (px)
     */
    /**
    * @return Radius (px)
    */
    innerCornerRadius: number;
    /**
     * Indicates how far (relatively to center) a slice should be moved.
     *
     * The value is relative to the radius of the slice. Meaning 0 no shift,
     * 1 - slice shifted outside by whole of its radius.
     *
     * @param  value  Radius shift
     */
    /**
    * @return Radius shift
    */
    shiftRadius: number;
    /**
     * [ix description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @return [description]
     */
    readonly ix: number;
    /**
     * [iy description]
     *
     * @ignore Exclude from docs
     * @todo Description
     * @return [description]
     */
    readonly iy: number;
    /**
     * An angle of the slice's middle.
     *
     * @ignore Exclude from docs
     * @return Angle
     */
    readonly middleAngle: number;
    /**
     * X coordinate for the slice tooltip.
     *
     * @return X
     */
    getTooltipX(): number;
    /**
     * Y coordinate for the slice tooltip.
     *
     * @return Y
     */
    getTooltipY(): number;
}
