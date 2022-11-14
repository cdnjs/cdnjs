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
 * Defines properties for rectangular pattern
 */
export interface RectPatternProperties extends PatternProperties {
    rectWidth: number;
    rectHeight: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Rectangular pattern
 */
export declare class RectPattern extends Pattern {
    /**
     * Reference to `<rect>` element used in pattern.
     */
    protected _rect: $type.Optional<AMElement>;
    /**
     * Defines property types.
     */
    _properties: RectPatternProperties;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the rectangular element.
     */
    protected draw(): void;
    /**
     * Rectangle width in pixels.
     *
     * @param value Width (px)
     */
    /**
    * @return Width (px)
    */
    rectWidth: number;
    /**
     * Rectangle height in pixels.
     *
     * @param value Height (px)
     */
    /**
    * @return Height (px)
    */
    rectHeight: number;
}
