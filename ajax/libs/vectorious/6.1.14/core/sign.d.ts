import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function sign
 * @description
 * Returns the sign of each element of `x`, indicating
 * whether it is positive, negative or zero.
 * @param {Number} x
 * @returns {NDArray}
 * @example
 * import { sign } from 'vectorious/core/sign';
 *
 * sign([1, 2, 3]); // => array([1, 1, 1])
 */
export declare const sign: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function sign
 * @memberof NDArray.prototype
 * @description
 * Returns the sign of each element of current array, indicating
 * whether it is positive, negative or zero.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).sign(); // <=> array([1, 1, 1])
 */
export default function (this: NDArray): NDArray;
