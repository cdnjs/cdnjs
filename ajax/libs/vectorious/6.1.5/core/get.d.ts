import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function get
 * @description Gets the element at `i, j, ..., n` from `x`
 * @param {NDArray} x
 * @param {Number[]} ...indices
 * @returns {Number}
 * @example
 * import { get } from 'vectorious/core/get';
 *
 * get([1, 2, 3], 2); // 3
 */
export declare const get: (x: NDArray | ArrayLike<any>, ...indices: number[]) => number;
/**
 * @function get
 * @memberof NDArray.prototype
 * @description Gets the element at `i, j, ..., n` from current vector.
 * @param {Number[]} ...indices
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).get(2); // 3
 */
export default function (this: NDArray, ...indices: number[]): number;
