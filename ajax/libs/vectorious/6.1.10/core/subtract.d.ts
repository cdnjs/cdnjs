import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function subtract
 * @description
 * Subtracts `y` from `x`.
 * Accelerated with BLAS `?axpy`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { subtract } from 'vectorious/core/subtract';
 *
 * subtract([1, 2, 3], [1, 1, 1]); // => array([0, 1, 2])
 */
export declare const subtract: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function subtract
 * @memberof NDArray.prototype
 * @description
 * Subtracts `x` from the current array.
 * Accelerated with BLAS `?axpy`.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).subtract([1, 1, 1]); // <=> array([0, 1, 2])
 */
export default function (this: NDArray, x: NDArray): NDArray;
