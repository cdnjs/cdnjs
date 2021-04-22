import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function norm
 * @description
 * Calculates the norm of current array (also called L2 norm or Euclidean length).
 * Accelerated with BLAS `?nrm2`.
 * @param {NDArray} x
 * @returns {Number}
 * @example
 * import { norm } from 'vectorious/core/norm';
 *
 * norm([1, 2, 3]); // => 3.7416574954986572
 */
export declare const norm: (x: NDArray | ArrayLike<any>) => number;
/**
 * @function norm
 * @memberof NDArray.prototype
 * @description
 * Calculates the norm of current array (also called L2 norm or Euclidean length).
 * Accelerated with BLAS `?nrm2`.
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).norm(); // => 3.7416574954986572
 */
export default function (this: NDArray): number;
