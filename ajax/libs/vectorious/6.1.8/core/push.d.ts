import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function push
 * @description Pushes a new `value` into `x`.
 * @param {NDArray} x
 * @param {Number} value
 * @returns {NDArray}
 * @example
 * import { push } from 'vectorious/core/push';
 *
 * push([1, 2, 3], 4); // => array([1, 2, 3, 4])
 */
export declare const push: (x: NDArray | ArrayLike<any>, value: number) => NDArray;
/**
 * @function push
 * @memberof NDArray.prototype
 * @description Pushes a new `value` into current vector.
 * @param {Number} value
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).push(4); // => array([1, 2, 3, 4])
 */
export default function (this: NDArray, value: number): NDArray;
