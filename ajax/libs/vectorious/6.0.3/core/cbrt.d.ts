import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function cbrt
 * @description Returns the cube root of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { cbrt } from 'vectorious/core/cbrt';
 *
 * cbrt([1, 8, 27]); // => array([1, 2, 3])
 */
export declare const cbrt: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function cbrt
 * @memberof NDArray.prototype
 * @description Returns the cube root of each element of current array.
 * @returns {this}
 * @example
 * import { cbrt } from 'vectorious/core/cbrt';
 *
 * cbrt([1, 8, 27]); // => array([1, 2, 3])
 */
export default function (this: NDArray): NDArray;
