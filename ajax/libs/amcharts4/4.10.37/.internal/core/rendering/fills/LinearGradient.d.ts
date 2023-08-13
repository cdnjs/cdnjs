/**
 * Contains code and logic for generating linear gradients.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../../Base";
import { List } from "../../utils/List";
import { Group } from "../Group";
import { Paper } from "../Paper";
import { Color } from "../../utils/Color";
import * as $type from "../../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Represents an object describing color switching point in a gradiend.
 */
export interface IGradientStop {
    /**
     * Color.
     */
    color: Color;
    /**
     * Offset defines where in the gradient the color should kick in. Values
     * from 0 to 1 are possible with 0 meaning start, 0.5 half-way through the
     * gradient, etc.
     */
    offset?: number;
    /**
     * Transparency of the color. 0 - completely transparent, 1 - fully opaque.
     */
    opacity?: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Linear gradient class.
 */
export declare class LinearGradient extends BaseObject {
    /**
     * List of colors switch definitions in a gradient.
     */
    protected _stops: List<IGradientStop>;
    /**
     * An SVG `<group>` element used to draw gradient.
     */
    element: Group;
    /**
     * Reference to Paper to add element to.
     */
    protected _paper: $type.Optional<Paper>;
    /**
     * Gradient direction.
     */
    protected _rotation: number;
    /**
     * Constructor.
     */
    constructor();
    /**
     * Draws gradient.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Clears the gradient.
     *
     * @ignore Exclude from docs
     */
    clear(): void;
    /**
     * Adds a color step to the gradient.
     *
     * @param color    Color (hex code or named color)
     * @param opacity  Opacity (value from 0 to 1; 0 completely transaprent, 1 fully opaque)
     * @param offset   Position of color in the gradient (value 0 to 1; 0 meaning start of the gradient and 1 end)
     */
    addColor(color: Color, opacity?: number, offset?: number): void;
    /**
     * A list of color stops in the gradient.
     *
     * @return Stops
     */
    readonly stops: List<IGradientStop>;
    /**
     * [[Paper]] instace to use for the gradient.
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
     * Rotation (direction) of the gradient in degrees.
     *
     * @param value  Rotation
     */
    /**
    * @return Rotation
    */
    rotation: number;
    copyFrom(source: this): void;
    /**
     * Which units are used when drawing gradient filter.
     *
     * Use `"userSpaceOnUse"` when applying gradient on a perfectly straight line.
     *
     * @since 4.9.17
     * @default objectBoundingBox
     * @param value Filter units
     */
    gradientUnits: "objectBoundingBox" | "userSpaceOnUse";
}
