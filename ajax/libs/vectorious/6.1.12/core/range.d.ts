import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function range
 * @description
 * Creates an array containing a range (can be either ascending or descending)
 * of numbers specified by the arguments provided (e.g. `NDArray.range(0, .5, 2)`
 * gives an array containing all numbers in the interval `[0, 2)` separated by
 * steps of `0.5`)
 * @param {Number} start
 * @param {Number} step
 * @param {Number} stop
 * @returns {NDArray}
 * @example
 * import { range } from 'vectorious/core/range';
 *
 * range(1, 2, 9); // => array([1, 3, 5, 7])
 */
export declare const range: (...args: number[]) => NDArray;
