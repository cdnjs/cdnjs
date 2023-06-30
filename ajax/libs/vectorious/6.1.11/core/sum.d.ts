import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function sum
 * @description Sum of `x`
 * @param {NDArray} x
 * @returns {Number}
 * @example
 * import { sum } from 'vectorious/core/sum';
 *
 * sum([1, 2, 3]); // => 6
 */
export declare const sum: (x: NDArray | ArrayLike<any>) => number;
/**
 * @function sum
 * @memberof NDArray.prototype
 * @description Sum of array elements
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).sum(); // => 6
 */
export default function (this: NDArray): number;
