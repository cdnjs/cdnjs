import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function set
 * @description Sets the element at `i, j, ..., n` to `value`.
 * @param {NDArray} x
 * @param {Number[]} ...indices
 * @param {Number} value
 * @returns {NDArray}
 * @example
 * import { set } from 'vectorious/core/set';
 *
 * set([1, 2, 3], 1, 0); // => array([1, 0, 3])
 */
export declare const set: (x: NDArray, ...args: number[]) => void;
/**
 * @function set
 * @memberof NDArray.prototype
 * @description Sets the element at `i, j, ..., n` to `value`.
 * @param {Number[]} ...indices
 * @param {Number} value
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).set(1, 0); // <=> array([1, 0, 3])
 */
export default function (this: NDArray, ...args: number[]): void;
