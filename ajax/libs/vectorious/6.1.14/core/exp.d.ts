import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function exp
 * @description
 * Returns e^x of each element of `x`, where x is the argument,
 * and e is Euler's constant (2.718…), the base of the natural logarithm.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { exp } from 'vectorious/core/exp';
 *
 * exp([1, 2, 3]); // => array([2.7182817459106445, 7.389056205749512, 20.08553695678711])
 */
export declare const exp: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function exp
 * @memberof NDArray.prototype
 * @description
 * Returns e^x of each element of current array, where x is the argument,
 * and e is Euler's constant (2.718…), the base of the natural logarithm.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).exp(); // <=> array([2.7182817459106445, 7.389056205749512, 20.08553695678711])
 */
export default function (this: NDArray): NDArray;
