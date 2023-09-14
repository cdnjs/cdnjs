import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function product
 * @description Hadamard product of `x` and `y`
 * @param {NDArray} x
 * @param {NDArray} y
 * @returns {NDArray}
 * @example
 * import { product } from 'vectorious/core/product';
 *
 * product([1, 2, 3], [4, 5, 6]); // => array([4, 10, 18])
 */
export declare const product: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function product
 * @memberof NDArray.prototype
 * @description Hadamard product of current matrix and `x`
 * @returns {NDArray}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).product([4, 5, 6]); // <=> array([4, 10, 18])
 */
export default function (this: NDArray, x: NDArray): NDArray;
