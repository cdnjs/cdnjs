/**
 * Module for "Lighten" filter.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Filter, FilterProperties } from "./Filter";
import { AMElement } from "../AMElement";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines additional properties relative to the "Lighten" filter
 */
export interface LightenFilterProperties extends FilterProperties {
    /**
     * Lightness.
     */
    lightness: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a "Lighten" filter.
 */
export declare class LightenFilter extends Filter {
    /**
     * Defines property types.
     */
    _properties: LightenFilterProperties;
    /**
     * A storage for Filter property/value pairs.
     * @see [@link LightenFilterProperties]
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
     * Lightness of the target colors.
     *
     * If `lightness` is a positive number, the filter will make all colors
     * lighter.
     *
     * If `lightness` is negative, colors will be darkened.
     *
     * @param value  Lightness
     */
    /**
    * @return Lightness
    */
    lightness: number;
}
