/**
 * Pattern module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../../Base";
import { Group } from "../Group";
import { AMElement } from "../AMElement";
import { Paper } from "../Paper";
import { ShapeRendering } from "../../defs/ShapeRendering";
import { List } from "../../utils/List";
import { Animation, IAnimatable, IAnimationOptions } from "../../utils/Animation";
import { Color } from "../../utils/Color";
import * as $type from "../../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines available units to measure patterns.
 */
export declare type PatternUnits = "userSpaceOnUse" | "objectBoundingBox";
/**
 * Defines properties for [[Pattern]].
 */
export interface PatternProperties {
    x: number;
    y: number;
    width: number;
    height: number;
    backgroundOpacity: number;
    backgroundFill: Color;
    fillOpacity: number;
    fill: Color;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
    shapeRendering: ShapeRendering;
    rotation: number;
    rotationX: number;
    rotationY: number;
    patternUnits: PatternUnits;
    strokeDashArray: string;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base class to define patterns.
 */
export declare class Pattern extends BaseObject implements IAnimatable {
    /**
     * List of available animations currently running on a pattern.
     */
    protected _animations: $type.Optional<Array<Animation>>;
    /**
     * An SVG `<group>` element to put sub-elements into.
     */
    element: Group;
    /**
     * Reference to [[Paper]] instance.
     */
    protected _paper: $type.Optional<Paper>;
    /**
     * List of elements the pattern consists of.
     */
    protected _elements: List<AMElement>;
    /**
     * Defines property types.
     */
    _properties: PatternProperties;
    /**
     * A storage for Filter property/value pairs.
     *
     * @ignore Exclude from docs
     * @see {@link PatternProperties}
     */
    properties: this["_properties"];
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the pattern.
     */
    protected draw(): void;
    /**
     * Animate pattern properties.
     *
     * @see {@link Animation}
     * @param animationOptions  Animation options
     * @param duration          Duration (ms)
     * @param easing            Easing function
     * @return Animation instance
     */
    animate(animationOptions: IAnimationOptions[] | IAnimationOptions, duration: number, easing?: (value: number) => number): Animation;
    /**
     * Adds an element to the pattern.
     *
     * @param element  Element
     */
    addElement(element: AMElement): void;
    /**
     * Remove an element from the pattern.
     *
     * @param element  Element
     */
    removeElement(element: AMElement): void;
    /**
     * Returns the list of SVG elements comprising the pattern.
     *
     * @return Pattern elements
     */
    readonly elements: List<AMElement>;
    /**
     * Pattern fill opacity. (0-1)
     *
     * @param value  Opacity (0-1)
     */
    /**
    * @return Opacity (0-1)
    */
    fillOpacity: number;
    /**
     * Fill color of the pattern.
     *
     * @param value  Fill color
     */
    /**
    * @return Fill color
    */
    fill: Color;
    /**
     * Pattern background fill color.
     *
     * @param value  Background color
     */
    /**
    * @return Background color
    */
    backgroundFill: Color;
    /**
     * Pattern backgorund opacity. (0-1)
     *
     * @param value  Background opacity (0-1)
     */
    /**
    * @return Background opacity (0-1)
    */
    backgroundOpacity: number;
    /**
     * Pattern stroke (border) color.
     *
     * @param value  Color
     */
    /**
    * @return Color
    */
    stroke: Color;
    /**
     * Pattern stroke opacity. (0-1)
     *
     * @param value  Opacity (0-1)
     */
    /**
    * @return Opacity (0-1)
    */
    strokeOpacity: number;
    /**
     * Pattern stroke thickness in pixels.
     *
     * @param value  Stroke thickness (px)
     */
    /**
    * @return Stroke thickness (px)
    */
    strokeWidth: number;
    /**
     * Shape rendering
     * @param value [description]
     */
    shapeRendering: ShapeRendering;
    /**
     * Pattern rotation in degrees.
     *
     * @param value  Rotation
     */
    /**
    * @return Rotation
    */
    rotation: number;
    /**
     * Pattern measuring units.
     *
     * Available options: "userSpaceOnUse" | "objectBoundingBox".
     *
     * @param value  Units
     */
    /**
    * @return Units
    */
    patternUnits: "userSpaceOnUse" | "objectBoundingBox";
    /**
     * Pattern width in pixels.
     *
     * @param value  Width (px)
     */
    /**
    * @return Width (px)
    */
    width: number;
    /**
     * Pattern height in pixels.
     *
     * @param value Height (px)
     */
    /**
    * @return Height (px)
    */
    height: number;
    /**
     * X position. (pixels)
     *
     * @param value X (px)
     */
    /**
    * @return X (px)
    */
    x: number;
    /**
     * Y position (px).
     *
     * @param value Y (px)
     */
    /**
    * @return Y (px)
    */
    y: number;
    /**
     * [[Paper]] instance to draw pattern in.
     *
     * @ignore Exclude from docs
     * @param paper  Paper
     */
    /**
    * @ignore Exclude from docs
    * @return Paper
    */
    paper: Paper;
    /**
     * Copies properties from another Pattern instance.
     *
     * @param source  Source pattern
     */
    copyFrom(source: this): void;
    /**
     * A list of animations currently running on the patter.
     *
     * @ignore Exclude from docs
     * @return Animation list
     */
    readonly animations: Array<Animation>;
    /**
     * A `stroke-dasharray` for the stroke (outline).
     *
     * "Dasharray" allows setting rules to make lines dashed, dotted, etc.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more info on `stroke-dasharray`
     * @param value  `stroke-dasharray`
     */
    /**
    * @return `stroke-dasharray`
    */
    strokeDasharray: string;
    /**
     * Processes JSON-based config before it is applied to the object.
     *
     * @ignore Exclude from docs
     * @param config  Config
     */
    processConfig(config?: {
        [index: string]: any;
    }): void;
}
