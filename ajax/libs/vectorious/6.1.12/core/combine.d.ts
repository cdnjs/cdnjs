import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function combine
 * @description Combines the vector `x` with `y`
 * @param {NDArray} x
 * @param {NDArray} y
 * @returns {NDArray}
 * @example
 * import { combine } from 'vectorious/core/combine';
 *
 * combine([1, 2, 3], [4, 5, 6]); // => array([1, 2, 3, 4, 5, 6])
 */
export declare const combine: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function combine
 * @memberof NDArray.prototype
 * @description Combines the current vector with `x`
 * @param {NDArray} x
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).combine([4, 5, 6]); // => array([1, 2, 3, 4, 5, 6])
 */
export default function (this: NDArray, x: NDArray): NDArray;
