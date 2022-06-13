/**
 * @module ol/css
 */
/**
 * @typedef {Object} FontParameters
 * @property {Array<string>} families
 * @property {string} style
 * @property {string} weight
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
export function getFontParameters(font: any): FontParameters;
export type FontParameters = {
    families: string[];
    style: string;
    weight: string;
};
//# sourceMappingURL=css.d.ts.map