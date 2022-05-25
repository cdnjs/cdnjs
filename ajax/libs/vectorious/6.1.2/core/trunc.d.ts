import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function trunc
 * @description
 * Returns the integer part of each element of `x`,
 * removing any fractional digits.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { trunc } from 'vectorious/core/trunc';
 *
 * trunc([1.2, 2.8, 3.5]); // => array([1, 2, 3])
 */
export declare const trunc: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function trunc
 * @memberof NDArray.prototype
 * @description
 * Returns the integer part of each element of current array,
 * removing any fractional digits.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1.2, 2.8, 3.5]).trunc(); // => array([1, 2, 3])
 */
export default function (this: NDArray): NDArray;
