import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function abs
 * @description Returns the absolute value of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { abs } from 'vectorious/core/abs';
 *
 * abs([-1, -2, -3]) // => array([1, 2, 3])
 */
export declare const abs: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function abs
 * @memberof NDArray.prototype
 * @description Returns the absolute value of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([-1, -2, -3]).abs() // <=> array([1, 2, 3])
 */
export default function (this: NDArray): NDArray;
