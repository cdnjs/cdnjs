import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function tan
 * @description Returns the tangent of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { tan } from 'vectorious/core/tan';
 *
 * tan([1, 2, 3]); // => array([1.5574077367782593, -2.185039758682251, -0.14254654943943024])
 */
export declare const tan: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function tan
 * @memberof NDArray.prototype
 * @description Returns the tangent of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).tan(); // <=> array([1.5574077367782593, -2.185039758682251, -0.14254654943943024])
 */
export default function (this: NDArray): NDArray;
