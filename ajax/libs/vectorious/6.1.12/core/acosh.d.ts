import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function acosh
 * @description Returns the hyperbolic arccosine of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { acosh } from 'vectorious/core/acosh';
 *
 * acosh([1, 2, 3]); // => array([0, 1.316957950592041, 1.7627471685409546])
 */
export declare const acosh: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function acosh
 * @memberof NDArray.prototype
 * @description Returns the hyperbolic arccosine of each element of current array.
 * @param {NDArray} x
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).acosh(); // <=> array([0, 1.316957950592041, 1.7627471685409546])
 */
export default function (this: NDArray): NDArray;
