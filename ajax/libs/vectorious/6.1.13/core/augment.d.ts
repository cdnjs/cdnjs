import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function augment
 * @description Augments `x` and `y`.
 * @param {NDArray} x
 * @param {NDArray} y
 * @returns {NDArray}
 * @example
 * import { augment } from 'vectorious/core/augment';
 *
 * augment([[1, 2], [3, 4]], [[1], [2]]); // => array([[1, 2, 1], [3, 4, 2]])
 */
export declare const augment: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function augment
 * @memberof NDArray.prototype
 * @description Augments `x` with current matrix.
 * @param {NDArray} x
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([[1, 2], [3, 4]]).augment(array([[1], [2]])); // <=> array([[1, 2, 1], [3, 4, 2]])
 */
export default function (this: NDArray, x: NDArray | ArrayLike<any>): NDArray;
