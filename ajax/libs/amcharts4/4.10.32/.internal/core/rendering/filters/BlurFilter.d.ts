/**
 * Module for "Blur" filter.
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
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines additional properties relative to the "Blur" filter.
 */
export interface BlurFilterProperties extends FilterProperties {
    /**
     * Horizontal offset in pixels.
     *
     * @ignore Deprecated
     * @deprecated ?
     * @todo Remove?
     */
    dx?: number;
    /**
     * Vertical offset in pixels.
     *
     * @ignore Deprecated
     * @deprecated ?
     * @todo Remove?
     */
    dy?: number;
    /**
     * Blur value.
     */
    blur: number;
    /**
     * Opacity. (0-1)
     *
     * @ignore Deprecated
     * @deprecated ?
     * @todo Remove?
     */
    opacity?: number;
    /**
     * Color.
     *
     * @ignore Deprecated
     * @deprecated ?
     * @todo Remove?
     */
    color?: Color;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a "Blur" filter.
 */
export declare class BlurFilter extends Filter {
    /**
     * Defines property types.
     */
    _properties: BlurFilterProperties;
    /**
     * A storage for Filter property/value pairs.
     * @see [@link BlurFilterProperties]
     */
    /**
     * Reference to the `<feGaussianBlur>` element.
     *
     * @ignore Exclude from docs
     */
    feGaussianBlur: AMElement;
    /**
     * Constructor
     */
    constructor();
    /**
     * Blur value.
     *
     * The bigger the value, the blurrier the target element will become.
     *
     * @default 1.5
     * @param value Blur
     */
    /**
    * @return Blur
    */
    blur: number;
}
