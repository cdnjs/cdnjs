import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function acos
 * @description Returns the arccosine of each element of `x`.
 * @param {NDArray} x
 * @returns {NDArray}
 * @example
 * import { acos } from 'vectorious/core/acos';
 *
 * acos([-1, 0, 1]); // => array([3.141592653589793, 1.5707963267948966, 0])
 */
export declare const acos: (x: NDArray | ArrayLike<any>) => NDArray;
/**
 * @function acos
 * @memberof NDArray.prototype
 * @description Returns the arccosine of each element of current array.
 * @returns {this}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([-1, 0, 1]).acos(); // <=> array([3.141592653589793, 1.5707963267948966, 0])
 */
export default function (this: NDArray): NDArray;
