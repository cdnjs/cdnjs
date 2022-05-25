import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function inv
 * @description
 * Determines the inverse of `x`.
 * Accelerated with LAPACK `?getrf` and `?getri`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { inv } from 'vectorious/core/inv';
 *
 * inv([[2, -1, 0], [-1, 2, -1], [0, -1, 2]]); // => array([[0.75, 0.5, 0.25], [0.5, 1, 0.5], [0.25, 0.5, 0.75]])
 */
export declare const inv: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function inv
 * @memberof NDArray.prototype
 * @description
 * Determines the inverse of current matrix using Gaussian elimination.
 * Accelerated with LAPACK `?getri`.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([[2, -1, 0], [-1, 2, -1], [0, -1, 2]]).inv(); // <=> array([[0.75, 0.5, 0.25], [0.5, 1, 0.5], [0.25, 0.5, 0.75]])
 */
export default function (this: NDArray): NDArray;
