import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function scale
 * @description
 * Multiplies all elements of `x` with a specified `scalar`.
 * Accelerated with BLAS `?scal`.
 * @param {NDArray} x
 * @param {Number} scalar
 * @returns {NDArray}
 * @example
 * import { scale } from 'vectorious/core/scale';
 *
 * scale([1, 2, 3], 2); // => array([2, 4, 6])
 */
export declare const scale: (x: NDArray | ArrayLike<any>, scalar: number) => NDArray;
/**
 * @function scale
 * @memberof NDArray.prototype
 * @description
 * Multiplies all elements of current array with a specified `scalar`.
 * Accelerated with BLAS `?scal`.
 * @param {Number} scalar
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).scale(2); // <=> array([2, 4, 6])
 */
export default function (this: NDArray, scalar: number): NDArray;
