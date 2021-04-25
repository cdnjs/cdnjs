import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function square
 * @description Asserts if `x` is square.
 * @param {NDArray} x
 * @throws {Error} matrix is not square
 * @example
 * import { square } from 'vectorious/core/square';
 *
 * square([1, 2, 3]); // Error: matrix is not square
 */
export declare const square: (x: NDArray | ArrayLike<any>) => void;
/**
 * @function square
 * @memberof NDArray.prototype
 * @description Asserts if current matrix is square.
 * @throws {Error} matrix is not square
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).square(); // Error: matrix is not square
 */
export default function (this: NDArray): void;
