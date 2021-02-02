/**
 * Module for "Focus" filter.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../../Sprite";
import { Filter, FilterProperties } from "./Filter";
import { AMElement } from "../AMElement";
import { Color } from "../../utils/Color";
import * as $type from "../../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines additional properties relative to the "Focus" filter.
 */
export interface FocusFilterProperties extends FilterProperties {
    /**
     * Opacity of the outline. (0-1)
     */
    opacity?: number;
    /**
     * Stroke (outline) color.
     */
    stroke?: Color;
    /**
     * Stroke (outline) thickness in pixels.
     */
    strokeWidth?: number;
    /**
     * Stroke (outline) opacity. (0-1)
     */
    strokeOpacity?: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a "Focus" filter.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/accessibility/} more about accessibility
 * @see {@link https://www.amcharts.com/docs/v4/tutorials/changing-appearance-of-focused-items/} cusomizing focus appearance
 */
export declare class FocusFilter extends Filter {
    /**
     * Defines property types.
     */
    _properties: FocusFilterProperties;
    /**
     * A storage for Filter property/value pairs.
     * @see [@link FocusFilterProperties]
     */
    /**
     * Reference to the `<feFlood>` element.
     *
     * @ignore Exclude from docs
     */
    feFlood: AMElement;
    /**
     * Reference to the `<feMorphology>` element.
     *
     * @ignore Exclude from docs
     */
    feMorphology: AMElement;
    /**
     * Reference to the `<feFlood>` element.
     *
     * @ignore Exclude from docs
     */
    feColorMatrix: AMElement;
    /**
     * Reference to the `<feComposite>` element.
     *
     * @ignore Exclude from docs
     */
    feComposite: AMElement;
    /**
     * Reference to the `<feFlood>` element.
     *
     * @ignore Exclude from docs
     */
    feBlend: AMElement;
    /**
     * Constructor
     */
    constructor();
    /**
     * Stroke (outline) color.
     *
     * @param value  Color
     */
    /**
    * @return Color
    */
    stroke: $type.Optional<Color>;
    /**
     * Stroke (outline) thickness in pixels.
     *
     * @param value  Outline thickness (px)
     */
    /**
    * @return Outline thickness (px)
    */
    strokeWidth: $type.Optional<number>;
    /**
     * Opacity of the outline. (0-1)
     *
     * @param value  Outline opacity (0-1)
     */
    /**
    * @return Outline opacity (0-1)
    */
    opacity: $type.Optional<number>;
    /**
     * Sets filter's target element.
     *
     * In addition it also disables built-in focus outline on element this
     * filter is applied to.
     *
     * @ignore Exclude from docs
     * @param value  Element filter is being attached to
     */
    protected setSprite(value: Sprite): void;
}
