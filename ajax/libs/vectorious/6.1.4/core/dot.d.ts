import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function dot
 * @description
 * Performs dot multiplication with `x` and `y`.
 * Accelerated with BLAS `?dot`.
 * @param {NDArray} x
 * @param {NDArray} y
 * @returns {Number}
 * @example
 * import { dot } from 'vectorious/core/dot';
 *
 * dot([1, 2, 3], [4, 5, 6]); // => 32
 */
export declare const dot: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>) => number;
/**
 * @function dot
 * @memberof NDArray.prototype
 * @description
 * Performs dot multiplication with `x` and current array
 * Accelerated with BLAS `?dot`.
 * @param {NDArray} x
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).dot([4, 5, 6]); // => 32
 */
export default function (this: NDArray, x: NDArray): number;
