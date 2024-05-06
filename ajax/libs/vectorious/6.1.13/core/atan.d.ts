import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function atan
 * @description Returns the arctangent of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { atan } from 'vectorious/core/atan';
 *
 * atan([1, 2, 3]); // => array([0.7853981852531433, 1.1071487665176392, 1.249045729637146])
 */
export declare const atan: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function atan
 * @memberof NDArray.prototype
 * @description Returns the arctangent of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).atan() // <=> array([0.7853981852531433, 1.1071487665176392, 1.249045729637146])
 */
export default function (this: NDArray): NDArray;
