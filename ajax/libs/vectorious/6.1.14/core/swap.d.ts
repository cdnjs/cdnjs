import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function swap
 * @description Swaps two rows `i` and `j` in `x`.
 * @param {NDArray} x
 * @param {Number} i
 * @param {Number} j
 * @returns {NDArray}
 * @example
 * import { swap } from 'vectorious/core/swap';
 *
 * swap([[1, 2], [3, 4]], 0, 1); // => array([[3, 4], [1, 2]])
 */
export declare const swap: (x: NDArray | ArrayLike<any>, i: number, j: number) => NDArray;
/**
 * @function swap
 * @memberof NDArray.prototype
 * @description Swaps two rows `i` and `j` in current matrix
 * @param {Number} i
 * @param {Number} j
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([[1, 2], [3, 4]]); // <=> array([[3, 4], [1, 2]])
 */
export default function (this: NDArray, i: number, j: number): NDArray;
