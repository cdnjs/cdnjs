import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function asinh
 * @description Returns the hyperbolic arcsine of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { asinh } from 'vectorious/core/asinh';
 *
 * asinh([0, 1, 2]) // => array([0, 0.8813735842704773, 1.4436354637145996])
 */
export declare const asinh: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function asinh
 * @memberof NDArray.prototype
 * @description Returns the hyperbolic arcsine of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([0, 1, 2]).asinh() // <=> array([0, 0.8813735842704773, 1.4436354637145996])
 */
export default function (this: NDArray): NDArray;
