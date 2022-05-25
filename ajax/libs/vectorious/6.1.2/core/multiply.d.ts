import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function multiply
 * @description
 * Multiplies two matrices `x` and `y` of matching dimensions.
 * Accelerated with BLAS `?gemm`.
 * @param {NDArray} x
 * @param {NDArray} y
 * @returns {NDArray}
 * @example
 * import { multiply } from 'vectorious/core/multiply';
 *
 * multiply([[1, 2]], [[1], [2]]); // => array([[5]])
 */
export declare const multiply: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function multiply
 * @memberof NDArray.prototype
 * @description
 * Multiplies current matrix with `x`.
 * Accelerated with BLAS `?gemm`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([[1, 2]]).multiply([[1], [2]]); // <=> array([[5]])
 */
export default function (this: NDArray, x: NDArray): NDArray;
