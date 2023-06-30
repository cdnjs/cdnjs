import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function round
 * @description Returns the value of each element of `x` rounded to the nearest integer.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { round } from 'vectorious/core/round';
 *
 * round([1.2, 2.8, 3.5]); // => array([1, 3, 4])
 */
export declare const round: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function round
 * @memberof NDArray.prototype
 * @description Returns the value of each element of current array rounded to the nearest integer.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1.2, 2.8, 3.5]).round(); // <=> array([1, 3, 4])
 */
export default function (this: NDArray): NDArray;
