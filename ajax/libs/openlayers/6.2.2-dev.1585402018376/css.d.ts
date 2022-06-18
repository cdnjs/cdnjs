/**
 * @module ol/css
 */
/**
 * @typedef {Object} FontParameters
 * @property {string} style
 * @property {string} variant
 * @property {string} weight
 * @property {string} size
 * @property {string} lineHeight
 * @property {string} family
 * @property {Array<string>} families
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
    style: string;
    variant: string;
    weight: string;
    size: string;
    lineHeight: string;
    family: string;
    families: string[];
};
//# sourceMappingURL=css.d.ts.map