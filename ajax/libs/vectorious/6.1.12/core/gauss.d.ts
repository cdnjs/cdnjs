import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function gauss
 * @description
 * Gauss-Jordan elimination (i.e. returns the reduced row echelon form) of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { gauss } from 'vectorious/core/gauss';
 *
 * gauss([[1, 2, 3], [4, 5, 6]]); // => array([[1, 0, -1], [-0, 1, 2]])
 */
export declare const gauss: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function gauss
 * @memberof NDArray.prototype
 * @description
 * Gauss-Jordan elimination (i.e. returns the reduced row echelon form) of the current matrix.
 * @returns {NDArray}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([[1, 2, 3], [4, 5, 6]]).gauss(); // <=> array([[1, 0, -1], [-0, 1, 2]])
 */
export default function (this: NDArray): NDArray;
