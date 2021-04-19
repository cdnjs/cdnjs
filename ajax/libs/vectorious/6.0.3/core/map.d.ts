import { TypedArray } from '../types';
import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function map
 * @description Equivalent to `TypedArray.prototype.map`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { map } from 'vectorious/core/map';
 *
 * map([1, 2, 3], value => -value); // => array([-1, -2, -3])
 */
export declare const map: (x: NDArray | ArrayLike<any>, f: (value: number, i: number, src: TypedArray) => number) => NDArray;
/**
 * @function map
 * @memberof NDArray.prototype
 * @description Equivalent to `TypedArray.prototype.map`.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).map(value => -value); // => array([-1, -2, -3])
 */
export default function (this: NDArray, f: (value: number, i: number, src: TypedArray) => number): NDArray;
