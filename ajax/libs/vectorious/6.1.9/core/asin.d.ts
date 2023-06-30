import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function asin
 * @description Returns the arcsine of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { asin } from 'vectorious/core/asin';
 *
 * asin([-1, 0, 1]) // => array([-1.5707963705062866, 0, 1.5707963705062866])
 */
export declare const asin: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function asin
 * @memberof NDArray.prototype
 * @description Returns the arcsine of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([-1, 0, 1]).asin() // <=> array([-1.5707963705062866, 0, 1.5707963705062866])
 */
export default function (this: NDArray): NDArray;
