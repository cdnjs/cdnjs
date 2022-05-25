import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function ones
 * @description Creates an array containing ones (`1`) of shape `shape`
 * @param {Number[]} ...shape
 * @returns {NDArray}
 * @example
 * import { ones } from 'vectorious/core/ones';
 *
 * ones(3); // => array([1, 1, 1])
 */
export declare const ones: (...shape: number[]) => NDArray;
