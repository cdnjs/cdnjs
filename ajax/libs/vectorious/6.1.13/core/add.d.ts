import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function add
 * @description
 * Adds `y` multiplied by `alpha` to `x`.
 * Accelerated with BLAS `?axpy`.
 * @param {NDArray} x
 * @param {NDArray} y
 * @param {Number} [1] alpha
 * @returns {NDArray}
 * @example
 * import { add } from 'vectorious/core/add';
 *
 * add([1, 2, 3], [4, 5, 6]); // => array([5, 7, 9])
 */
export declare const add: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>, alpha?: number) => NDArray;
/**
 * @function add
 * @memberof NDArray.prototype
 * @description
 * Adds `x` multiplied by `alpha` to the current array.
 * Accelerated with BLAS `?axpy`.
 * @param {NDArray} x
 * @param {Number} [1] alpha
 * @returns {NDArray}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).add([4, 5, 6]); // <=> array([5, 7, 9])
 */
export default function (this: NDArray, x: NDArray | ArrayLike<any>, alpha?: number): NDArray;
