import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function cosh
 * @description Returns the hyperbolic cosine of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { cosh } from 'vectorious/core/cosh';
 *
 * cosh([0, 1, 2]); // => array([1, 1.5430806875228882, 3.762195587158203])
 */
export declare const cosh: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function cosh
 * @memberof NDArray.prototype
 * @description Returns the hyperbolic cosine of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([0, 1, 2]).cosh(); // => array([1, 1.5430806875228882, 3.762195587158203])
 */
export default function (this: NDArray): NDArray;
