import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function sinh
 * @description Returns the hyperbolic sine of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { sinh } from 'vectorious/core/sinh';
 *
 * sinh([1, 2, 3]); // => array([1.175201177597046, 3.6268603801727295, 10.017874717712402])
 */
export declare const sinh: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function sinh
 * @memberof NDArray.prototype
 * @description Returns the hyperbolic sine of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).sinh(); // <=> array([1.175201177597046, 3.6268603801727295, 10.017874717712402])
 */
export default function (this: NDArray): NDArray;
