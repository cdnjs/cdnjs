/**
 * Module for "Colorize" filter.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
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
 * Defines additional properties relative to the "Colorize" filter.
 */
export interface ColorizeFilterProperties extends FilterProperties {
    /**
     * Color.
     */
    color?: Color;
    /**
     * Intensity. (0-1)
     *
     * @default 1
     */
    intensity: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a "Colorize" filter.
 */
export declare class ColorizeFilter extends Filter {
    /**
     * Defines property types.
     */
    _properties: ColorizeFilterProperties;
    /**
     * A storage for Filter property/value pairs.
     * @see [@link ColorizeFilterProperties]
     */
    /**
     * Reference to the `<feColorMatrix>` element.
     *
     * @ignore Exclude from docs
     */
    feColorMatrix: AMElement;
    /**
     * Constructor
     */
    constructor();
    /**
     * (Re)applies colors to the already existing filter by modifying filyer's
     * color matrix element.
     *
     * @ignore Exclude from docs
     */
    applyFilter(): void;
    /**
     * Target color to apply to the element.
     *
     * Depending on the `intensity`, all colors of the target element will steer
     * towards this color.
     *
     * E.g. setting to `am4core.color("greener")` will make all colors greener.
     *
     * @param value  Color
     */
    /**
    * @return Color
    */
    color: $type.Optional<Color>;
    /**
     * Intensity of the color (0-1).
     *
     * The bigger the number the more of a `color` target's colors will become.
     *
     * 0 means the colors will remain as they are.
     * 1 means all colors will become the target `color`.
     *
     * @default 1
     * @param value  Intensity (0-1)
     */
    /**
    * @return Intensity (0-1)
    */
    intensity: number;
}
