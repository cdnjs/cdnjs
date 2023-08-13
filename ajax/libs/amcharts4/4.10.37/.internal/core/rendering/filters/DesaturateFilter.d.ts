/**
 * Module for "Desaturate" filter.
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
 * Defines additional properties relative to the "Desaturate" filter
 */
export interface DesaturateFilterProperties extends FilterProperties {
    /**
     * Saturation. (0-1)
     */
    saturation: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creats a "Desaturate" filter
 */
export declare class DesaturateFilter extends Filter {
    /**
     * Defines property types.
     */
    _properties: DesaturateFilterProperties;
    /**
     * A storage for Filter property/value pairs.
     * @see [@link DesaturateFilterProperties]
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
     * Saturation.
     *
     * 0 - completely desaturated.
     * 1 - fully saturated (gray).
     *
     * @param value  Saturation (0-1)
     */
    /**
    * @return Saturation (0-1)
    */
    saturation: number;
}
