import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function diagonal
 * @description Gets the diagonal of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { diagonal } from 'vectorious/core/diagonal';
 *
 * diagonal([[1, 2], [3, 4]]); // => array([1, 4])
 */
export declare const diagonal: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function diagonal
 * @memberof NDArray.prototype
 * @description Gets the diagonal of current matrix.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).diagonal(); // => array([1, 4])
 */
export default function (this: NDArray): NDArray;
