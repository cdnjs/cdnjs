import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function toArray
 * @description Converts `x` into a JavaScript array.
 * @param {NDArray} x
 * @returns {Array}
 * @example
 * import { toArray } from 'vectorious/core/toArray';
 *
 * toArray([1, 2, 3]); // => [1, 2, 3]
 */
export declare const toArray: (x: NDArray | ArrayLike<any>) => any;
/**
 * @function toArray
 * @memberof NDArray.prototype
 * @description Converts current vector into a JavaScript array.
 * @param {Number} index
 * @param {Number} dim
 * @returns {Array}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).toArray(); // => [1, 2, 3]
 */
export default function (this: NDArray, index?: number, dim?: number): any;
