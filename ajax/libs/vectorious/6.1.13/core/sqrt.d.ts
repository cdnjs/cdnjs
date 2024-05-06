import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function sqrt
 * @description Returns the positive square root of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { sqrt } from 'vectorious/core/sqrt';
 *
 * sqrt([1, 4, 9]); // => array([1, 2, 3])
 */
export declare const sqrt: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function sqrt
 * @memberof NDArray.prototype
 * @description Returns the positive square root of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 4, 9]); // <=> array([1, 2, 3])
 */
export default function (this: NDArray): NDArray;
