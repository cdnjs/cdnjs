import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function copy
 * @description Makes a copy of `x`
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { copy } from 'vectorious/core/copy';
 *
 * copy([1, 2, 3]); // => array([1, 2, 3])
 */
export declare const copy: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function copy
 * @memberof NDArray.prototype
 * @description Makes a copy of the class and underlying data
 * @returns {NDArray}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).copy(); // => array([1, 2, 3])
 */
export default function (this: NDArray): NDArray;
