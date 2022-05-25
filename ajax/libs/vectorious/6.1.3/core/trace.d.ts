import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function trace
 * @description Gets the trace of `x` (the sum of all diagonal elements).
 * @param {NDArray} x
 * @returns {Number}
 * @example
 * import { trace } from 'vectorious/core/trace';
 *
 * trace([[1, 2], [3, 4]]); // => 5
 */
export declare const trace: (x: NDArray | ArrayLike<any>) => number;
/**
 * @function trace
 * @memberof NDArray.prototype
 * @description Gets the trace of the matrix (the sum of all diagonal elements).
 * @returns {Number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).trace(); // => 5
 */
export default function (this: NDArray): number;
