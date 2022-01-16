/**
 * 3D slice module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Slice, ISliceProperties, ISliceAdapters, ISliceEvents } from "../Slice";
import { Sprite } from "../../Sprite";
import * as $type from "../../utils/Type";
import { Color } from "../../utils/Color";
import { RadialGradient } from "../../rendering/fills/RadialGradient";
import { LinearGradient } from "../../rendering/fills/LinearGradient";
import { Pattern } from "../../rendering/fills/Pattern";
/**
 * Defines properties for [[Slice3D]].
 */
export interface ISlice3DProperties extends ISliceProperties {
    /**
     * Depth (height) of the 3D slice in pixels.
     *
     * @default 20
     */
    depth?: number;
    /**
     * Angle of the point of view to the 3D element. (0-360)
     *
     * @default 30
     */
    angle?: number;
}
/**
 * Defines events for [[Slice3D]].
 */
export interface ISlice3DEvents extends ISliceEvents {
}
/**
 * Defines adapters for [[Slice3D]].
 *
 * @see {@link Adapter}
 */
export interface ISlice3DAdapters extends ISliceAdapters, ISlice3DProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Used to draw a 3D slice of a Pie chart.
 *
 * @see {@link ISlice3DEvents} for a list of available events
 * @see {@link ISlice3DAdapters} for a list of available Adapters
 */
export declare class Slice3D extends Slice {
    /**
     * Defines available properties.
     */
    _properties: ISlice3DProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISlice3DAdapters;
    /**
     * Defines available events.
     */
    _events: ISlice3DEvents;
    /**
     *
     * @ignore Exclude from docs
     */
    edge: Sprite;
    /**
     * Side element.
     *
     * @ignore Exclude from docs
     */
    sideA: Sprite;
    /**
     * Side element.
     *
     * @ignore Exclude from docs
     */
    sideB: Sprite;
    /**
     * Constructor
     */
    constructor();
    /**
     * Sets actual `fill` property on the SVG element, including applicable color
     * modifiers.
     *
     * @ignore Exclude from docs
     * @param value  Fill
     */
    protected setFill(value: $type.Optional<Color | Pattern | LinearGradient | RadialGradient>): void;
    /**
     * Draws the element.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Depth (height) of the 3D slice in pixels.
     *
     * @default 20
     * @param depth  Depth (px)
     */
    /**
    * @return Depth (px)
    */
    depth: number;
    /**
     * Angle of the point of view to the 3D element. (0-360)
     *
     * @default 30
     * @param value  Angle
     */
    /**
    * @return Angle
    */
    angle: number;
    /**
     * @return Vertical radius (0-1)
     */
    /**
    * Vertical radius for creating skewed slices.
    *
    * This is relevant to `radius`, e.g. 0.5 will set vertical radius to half
    * the `radius`.
    *
    * @param value Vertical radius (0-1)
    */
    radiusY: number;
    /**
     * Copies all properties and related data from a different instance of Axis.
     *
     * @param source Source Axis
     */
    copyFrom(source: this): void;
}
