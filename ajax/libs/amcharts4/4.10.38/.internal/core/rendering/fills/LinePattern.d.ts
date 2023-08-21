/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Pattern, PatternProperties } from "./Pattern";
import { AMElement } from "../AMElement";
export interface LinePatternProperties extends PatternProperties {
    gap: number;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Line pattern.
 */
export declare class LinePattern extends Pattern {
    /**
     * SVG `<line>` element used for pattern.
     */
    protected _line: AMElement;
    /**
     * Defines property types.
     */
    _properties: LinePatternProperties;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the pattern.
     */
    protected draw(): void;
    /**
     * Number of pixels between pattern lines.
     *
     * The pattern will automatically draw required number of lines to fill
     * pattern area maintaining `gap` distance between them.
     *
     * 0 (zero) means only single line will be drawn.
     *
     * @default 0
     * @since 4.7.7
     */
    /**
    * @return gap
    */
    gap: number;
}
