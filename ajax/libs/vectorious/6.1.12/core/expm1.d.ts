import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function expm1
 * @description Returns subtracting 1 from exp(x) of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { expm1 } from 'vectorious/core/expm1';
 *
 * expm1([1, 2, 3]); // => array([1.7182817459106445, 6.389056205749512, 19.08553695678711])
 */
export declare const expm1: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function expm1
 * @memberof NDArray.prototype
 * @description Returns subtracting 1 from exp(x) of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).expm1(); // <=> array([1.7182817459106445, 6.389056205749512, 19.08553695678711])
 */
export default function (this: NDArray): NDArray;
