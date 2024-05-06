import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function cross
 * @description
 * Computes the cross product of the `x` and the vector `y`
 * This operation can only calculated for vectors with three components.
 * Otherwise it throws an exception.
 * @param {NDArray} x
 * @param {NDArray} y
 * @returns {NDArray}
 * @example
 * import { cross } from 'vectorious/core/cross';
 *
 * cross([1, 2, 3], [4, 5, 6]); // => array([-3, 6, -3])
 */
export declare const cross: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function cross
 * @memberof NDArray.prototype
 * @description
 * Computes the cross product of the current vector and the vector `x`
 * This operation can only calculated for vectors with three components.
 * Otherwise it throws an exception.
 * @param {NDArray} x
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).cross([4, 5, 6]); // <=> array([-3, 6, -3])
 */
export default function (this: NDArray, x: NDArray): NDArray;
