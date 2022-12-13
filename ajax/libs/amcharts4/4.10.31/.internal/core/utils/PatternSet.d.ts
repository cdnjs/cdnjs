/**
 * This module contains PatternSet object definition
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { Color } from "./Color";
import { Pattern } from "../rendering/fills/Pattern";
import { LinePattern } from "../rendering/fills/LinePattern";
import { RectPattern } from "../rendering/fills/RectPattern";
import { CirclePattern } from "../rendering/fills/CirclePattern";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines an interable list of distinctive patterns that can be used in
 * conjunction to colors to generate various fill patterns.
 *
 * @important
 * @since 4.7.5
 * @see {@link https://www.amcharts.com/docs/v4/concepts/colors/} for color-related info
 */
export declare class PatternSet extends BaseObject {
    /**
     * Holds the list of the colors in this set. (preset or auto-generated)
     */
    protected _list: Pattern[];
    /**
     * Current step.
     */
    protected _currentStep: number;
    /**
     * If set to non-zero value, the PatternSet will start iterating patterns from
     * that particular index, not the first pattern in the list.
     */
    protected _startIndex: number;
    /**
     * Current pass in cycle. Once all patterns in the list are iterated,
     * iteration restarts from beginning and currentPass is incremented.
     */
    protected _currentPass: number;
    /**
     * A base color. If there are no colors pre-set in the color list, ColorSet
     * will use this color as a base when generating new ones, applying
     * `stepOptions` and `passOptions` to this base color.
     */
    baseColor: Color;
    /**
     * Constructor
     */
    constructor();
    getLinePattern(size: number, rotation: number, thickness: number, gap?: number, strokeDashArray?: string): LinePattern;
    getRectPattern(size: number, rotation: number, thickness: number, outline?: boolean): RectPattern;
    getCirclePattern(size: number, radius: number, outline: boolean): CirclePattern;
    /**
     * List of pre-defined patterns to be used in set.
     *
     * @param value Pattern list
     */
    /**
    * @return Pattern list
    */
    list: Pattern[];
    /**
     * Returns the next pattern in list.
     *
     * @return Pattern
     */
    next(): Pattern;
    /**
     * Returns a color at specific index in the list.
     *
     * @param  i  Index
     * @return Pattern
     */
    getIndex(i: number): Pattern;
    /**
     * Generates a new set of patterns.
     */
    private generatePatterns;
    /**
     * Resets internal iterator.
     *
     * Calling `next()` after this will return the very first color in the color
     * list, even if it was already returned before.
     */
    reset(): void;
    /**
     * Sets current color iteration. You can use this property to skip some
     * colors from iteration. E.g. setting it to `10` will skip first ten
     * colors.
     *
     * Please note that the number is zero-based.
     *
     * @param value  Step
     */
    /**
    * @return Step
    */
    currentStep: number;
    /**
     * If set to non-zero value, the ColorSet will start iterating colors from
     * that particular index, not the first color in the list.
     *
     * @default 0
     * @param  value  Index
     */
    /**
    * @return Index
    */
    startIndex: number;
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
