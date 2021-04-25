import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function prod
 * @description Product of all elements of `x`.
 * @param {NDArray} x
 * @returns {Number}
 * @example
 * import { prod } from 'vectorious/core/prod';
 *
 * prod([1, 2, 3]); // => 6
 */
export declare const prod: (x: NDArray | ArrayLike<any>) => number;
/**
 * @function prod
 * @memberof NDArray.prototype
 * @description Product of all elements of current array
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).prod(); // => 6
 */
export default function (this: NDArray): number;
