/**
 * This module contains a version of ColorSet that can (and should) be used for
 * coloring UI elements.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { Color } from "./Color";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines available color purposes and their relation with the color set color
 * index.
 */
export interface IColorPurpose {
    stroke: Color;
    fill: Color;
    primaryButton: Color;
    primaryButtonHover: Color;
    primaryButtonDown: Color;
    primaryButtonActive: Color;
    primaryButtonText: Color;
    primaryButtonStroke: Color;
    secondaryButton: Color;
    secondaryButtonHover: Color;
    secondaryButtonDown: Color;
    secondaryButtonActive: Color;
    secondaryButtonText: Color;
    secondaryButtonStroke: Color;
    grid: Color;
    background: Color;
    alternativeBackground: Color;
    text: Color;
    alternativeText: Color;
    disabledBackground: Color;
    positive: Color;
    negative: Color;
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This module contains a version of ColorSet that can (and should) be used for
 * coloring UI elements.
 *
 * The main difference from the basic [[ColorSet]] is that instead of sequenced
 * colors, it uses a concept of named colors.
 *
 * This way, every element in the UI can extract an exact color theme author
 * meant for the specific purpose, like strokes, backgrounds, etc.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/colors/} for color-related info
 */
export declare class InterfaceColorSet extends BaseObject {
    /**
     * Maps the list of purposes (like "stroke") to an index of color of the
     * color set.
     */
    protected _purposes: IColorPurpose;
    /**
     * Constructor
     */
    constructor();
    protected debug(): void;
    /**
     * Returns a color to be used for the specific purpose.
     *
     * ```TypeScript
     * let uicolors = new am4core.InterfaceColorSet();
     * console.log(uicolors.getFor("stroke"));
     * ```
     * ```JavaScript
     * var uicolors = new am4core.InterfaceColorSet();
     * console.log(uicolors.getFor("stroke"));
     * ```
     *
     * @param purpose  Color use purpuse
     * @return Color
     */
    getFor(purpose: keyof IColorPurpose): Color;
    /**
     * Sets color to be used for the specific purpose.
     *
     * @param purpose  Color use purpose
     * @param color    Color
     */
    setFor(purpose: keyof IColorPurpose, color: Color): void;
}
