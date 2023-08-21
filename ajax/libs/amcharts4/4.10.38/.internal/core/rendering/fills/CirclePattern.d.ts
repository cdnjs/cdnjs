/**
 * Rectangular pattern module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Pattern, PatternProperties } from "./Pattern";
import { AMElement } from "../AMElement";
import * as $type from "../../utils/Type";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for circle pattern
 */
export interface CirclePatternProperties extends PatternProperties {
    radius: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Circular pattern
 */
export declare class CirclePattern extends Pattern {
    /**
     * Reference to `<circle>` element used in pattern.
     */
    protected _circle: $type.Optional<AMElement>;
    /**
     * Defines property types.
     */
    _properties: CirclePatternProperties;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the circle element.
     */
    protected draw(): void;
    /**
     * Circle radius in pixels.
     *
     * @param value Radius (px)
     */
    /**
    * @return Radius (px)
    */
    radius: number;
}
