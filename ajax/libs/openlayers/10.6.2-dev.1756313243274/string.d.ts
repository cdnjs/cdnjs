/**
 * @module ol/string
 */
/**
 * @param {number} number Number to be formatted
 * @param {number} width The desired width
 * @param {number} [precision] Precision of the output string (i.e. number of decimal places)
 * @return {string} Formatted string
 */
export function padNumber(number: number, width: number, precision?: number): string;
/**
 * Adapted from https://github.com/omichelsen/compare-versions/blob/master/index.js
 * @param {string|number} v1 First version
 * @param {string|number} v2 Second version
 * @return {number} Value
 */
export function compareVersions(v1: string | number, v2: string | number): number;
//# sourceMappingURL=string.d.ts.map