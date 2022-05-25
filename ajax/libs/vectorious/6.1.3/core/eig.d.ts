import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function eig
 * @description
 * Gets eigenvalues and eigenvectors of `x` using the Jacobi method.
 * Accelerated with LAPACK `?geev`.
 * @param {NDArray} x
 * @returns {Array<NDArray>}
 * @example
 * import { eig } from 'vectorious/core/eig';
 *
 * eig([[1, 0, 0], [0, 2, 0], [0, 0, 3]]); // => [array([1, 2, 3]), array([[1, 0, 0], [0, 1, 0], [0, 0, 1]])]
 */
export declare const eig: (x: NDArray | ArrayLike<any>) => [NDArray, NDArray];
/**
 * @function eig
 * @memberof NDArray.prototype
 * @description
 * Gets eigenvalues and eigenvectors of the current matrix using the Jacobi method.
 * Accelerated with LAPACK `?geev`.
 * @returns {Array<NDArray>}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([[1, 0, 0], [0, 2, 0], [0, 0, 3]]).eig(); // => [array([1, 2, 3]), array([[1, 0, 0], [0, 1, 0], [0, 0, 1]])]
 */
export default function (this: NDArray): [NDArray, NDArray];
