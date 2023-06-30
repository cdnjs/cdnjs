import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function min
 * @description Gets the minimum value (smallest) element of `x`.
 * @param {NDArray} x
 * @returns {Number}
 * @example
 * import { min } from 'vectorious/core/min';
 *
 * min([1, 2, 3]); // => 1
 */
export declare const min: (x: NDArray | ArrayLike<any>) => number;
/**
 * @function min
 * @memberof NDArray.prototype
 * @description Gets the minimum value (smallest) element of current array.
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).min(); // 1
 */
export default function (this: NDArray): number;
