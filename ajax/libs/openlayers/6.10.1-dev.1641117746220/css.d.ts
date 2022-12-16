/**
 * @param {number} opacity Opacity (0..1).
 * @return {string} CSS opacity.
 */
export function cssOpacity(opacity: number): string;
/**
 * @module ol/css
 */
/**
 * @typedef {Object} FontParameters
 * @property {string} style Style.
 * @property {string} variant Variant.
 * @property {string} weight Weight.
 * @property {string} size Size.
 * @property {string} lineHeight LineHeight.
 * @property {string} family Family.
 * @property {Array<string>} families Families.
 */
/**
 * The CSS class for hidden feature.
 *
 * @const
 * @type {string}
 */
export const CLASS_HIDDEN: string;
/**
 * The CSS class that we'll give the DOM elements to have them selectable.
 *
 * @const
 * @type {string}
 */
export const CLASS_SELECTABLE: string;
/**
 * The CSS class that we'll give the DOM elements to have them unselectable.
 *
 * @const
 * @type {string}
 */
export const CLASS_UNSELECTABLE: string;
/**
 * The CSS class for unsupported feature.
 *
 * @const
 * @type {string}
 */
export const CLASS_UNSUPPORTED: string;
/**
 * The CSS class for controls.
 *
 * @const
 * @type {string}
 */
export const CLASS_CONTROL: string;
/**
 * The CSS class that we'll give the DOM elements that are collapsed, i.e.
 * to those elements which usually can be expanded.
 *
 * @const
 * @type {string}
 */
export const CLASS_COLLAPSED: string;
export function getFontParameters(fontSpec: string): FontParameters;
export type FontParameters = {
    /**
     * Style.
     */
    style: string;
    /**
     * Variant.
     */
    variant: string;
    /**
     * Weight.
     */
    weight: string;
    /**
     * Size.
     */
    size: string;
    /**
     * LineHeight.
     */
    lineHeight: string;
    /**
     * Family.
     */
    family: string;
    /**
     * Families.
     */
    families: string[];
};
//# sourceMappingURL=css.d.ts.map