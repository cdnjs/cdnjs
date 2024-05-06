import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function toString
 * @description Converts `x` into a readable formatted string.
 * @param {NDArray} x
 * @returns {String}
 * @example
 * import { toString } from 'vectorious/core/toString';
 *
 * toString([1, 2, 3]); // => '1,2,3'
 */
export declare const toString: (x: NDArray | ArrayLike<any>) => string;
/**
 * @function toString
 * @memberof NDArray.prototype
 * @description Converts current vector into a readable formatted string.
 * @returns {String}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).toString(); // => '1,2,3'
 */
export default function (this: NDArray): string;
