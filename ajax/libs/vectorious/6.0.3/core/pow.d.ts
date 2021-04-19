import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function pow
 * @description Returns each element of `x` to the exponent power, that is, element^exponent.
 * @param {NDArray} x
 * @param {Number} exponent
 * @returns {NDArray}
 * @example
 * import { pow } from 'vectorious/core/pow';
 *
 * pow([1, 2, 3], 2); // => array([1, 4, 9])
 */
export declare const pow: (x: NDArray | ArrayLike<any>, exponent: number) => NDArray;
/**
 * @function pow
 * @memberof NDArray.prototype
 * @description Returns each element of current array to the exponent power, that is, element^exponent.
 * @param {Number} exponent
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).pow(2); // <=> array([1, 4, 9])
 */
export default function (this: NDArray, exponent: number): NDArray;
