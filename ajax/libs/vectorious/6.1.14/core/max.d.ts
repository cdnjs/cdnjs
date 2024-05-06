import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function max
 * @description
 * Gets the maximum value (largest) element of `x`.
 * Accelerated with BLAS `i?amax`.
 * @param {NDArray} x
 * @returns {Number}
 * @example
 * import { max } from 'vectorious/core/max';
 *
 * max([1, 2, 3]); // => 3
 */
export declare const max: (x: NDArray | ArrayLike<any>) => number;
/**
 * @function max
 * @memberof NDArray.prototype
 * @description
 * Gets the maximum value (smallest) element of current array.
 * Accelerated with BLAS `i?amax`.
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).max(); // => 3
 */
export default function (this: NDArray): number;
