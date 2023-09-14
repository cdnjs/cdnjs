import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function binOp
 * @description Perform binary operation `f` on `y` in `x`.
 * @param {NDArray} x
 * @param {NDArray} y
 * @returns {NDArray}
 * @example
 * import { binOp } from 'vectorious/core/binOp';
 *
 * binOp([1, 2, 3], [4, 5, 6], (a, b) => a + b); // => array([[5, 7, 9])
 */
export declare const binOp: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>, f: (a: number, b: number, index: number) => number) => NDArray;
/**
 * @function binOp
 * @memberof NDArray.prototype
 * @description Perform binary operation `f` on `x` in the current array.
 * @param {NDArray} x
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).binOp([4, 5, 6], (a, b) => a + b); // => array([[5, 7, 9])
 */
export default function (this: NDArray, x: NDArray | ArrayLike<any>, f: (a: number, b: number, index: number) => number): NDArray;
