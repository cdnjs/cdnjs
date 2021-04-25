import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function det
 * @description Gets the determinant of `x`.
 * @param {NDArray} x
 * @returns {Number}
 * @example
 * import { det } from 'vectorious/core/det';
 *
 * det([[0, 1], [2, 3]]); // => -2
 */
export declare const det: (x: NDArray | ArrayLike<any>) => number;
/**
 * @function det
 * @memberof NDArray.prototype
 * @description Gets the determinant of current matrix using LU factorization.
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([[0, 1], [2, 3]]).det(); // => -2
 */
export default function (this: NDArray): number;
