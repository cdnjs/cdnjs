import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function lu_factor
 * @description
 * Performs LU factorization on `x`.
 * Accelerated with LAPACK `?getrf`.
 * @param {NDArray} x
 * @returns {Array<NDArray|Int32Array>}
 * @example
 * import { lu_factor } from 'vectorious/core/lu_factor';
 *
 * lu_factor([[1, 3, 5], [2, 4, 7], [1, 1, 0]]); // => [array([[2, 4, 7], [0.5, 1, 1.5], [0.5, -1, -2]]), Int32Array([2, 2, 3])]
 */
export declare const lu_factor: (x: NDArray | ArrayLike<any>) => [NDArray, Int32Array];
/**
 * @function lu_factor
 * @memberof NDArray.prototype
 * @description
 * Performs LU factorization on current matrix.
 * Accelerated with LAPACK `?getrf`.
 * @returns {Array<NDArray|Int32Array>}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([[1, 3, 5], [2, 4, 7], [1, 1, 0]]).lu_factor(); // <=> [array([[2, 4, 7], [0.5, 1, 1.5], [0.5, -1, -2]]), Int32Array([2, 2, 3])]
 */
export default function (this: NDArray): [NDArray, Int32Array];
