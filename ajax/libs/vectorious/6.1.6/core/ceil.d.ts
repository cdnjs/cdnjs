import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function ceil
 * @description Returns smallest integer greater than or equal to of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { ceil } from 'vectorious/core/ceil';
 *
 * ceil([0.5, 1.5, 2.5]); // => array([1, 2, 3])
 */
export declare const ceil: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function ceil
 * @memberof NDArray.prototype
 * @description Returns smallest integer greater than or equal to of each element of current array.
 * @returns {NDArray}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([0.5, 1.5, 2.5]).ceil(); // <=> array([1, 2, 3])
 */
export default function (this: NDArray): NDArray;
