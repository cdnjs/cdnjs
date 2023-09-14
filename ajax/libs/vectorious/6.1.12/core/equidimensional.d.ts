import { NDArray } from './';
/**
 * @deprecated
 * @static
 * @memberof module:Globals
 * @function equidimensional
 * @description Asserts if `x` and `y` have the same shape
 * @param {NDArray} x
 * @param {NDArray} y
 * @throws {Error} shapes x and y do not match
 * @example
 * import { equidimensional } from 'vectorious/core/equidimensional';
 *
 * equidimensional([1, 2, 3], [1, 2]); // Error: shapes 3 and 2 do not match
 */
export declare const equidimensional: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>) => void;
/**
 * @deprecated
 * @function equidimensional
 * @memberof NDArray.prototype
 * @description Asserts if current array and `x` have the same shape
 * @param {NDArray} x
 * @throws {Error} shapes x and y do not match
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).equidimensional([1, 2]); // Error: shapes 3 and 2 do not match
 */
export default function (this: NDArray, x: NDArray): void;
