import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function cos
 * @description Returns the cosine of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { cos } from 'vectorious/core/cos';
 *
 * cos([0, Math.PI / 2, Math.PI]); // => array([1, 0, -1])
 */
export declare const cos: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function cos
 * @memberof NDArray.prototype
 * @description Returns the cosine of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([0, Math.PI / 2, Math.PI]).cos(); // => array([1, 0, -1])
 */
export default function (this: NDArray): NDArray;
