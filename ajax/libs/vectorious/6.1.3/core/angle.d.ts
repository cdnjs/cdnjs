import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function angle
 * @description Determines the angle between the `x` and `y`
 * @param {NDArray} x
 * @param {NDArray} y
 * @returns {number}
 * @example
 * import { angle } from 'vectorious/core/angle';
 *
 * angle([1, 2, 3], [4, 5, 6]); // => 0.22572622788897287
 */
export declare const angle: (x: NDArray | ArrayLike<any>, y: NDArray | ArrayLike<any>) => number;
/**
 * @function angle
 * @memberof NDArray.prototype
 * @description Determines the angle between the current vector and `x`.
 * @param {NDArray} x
 * @returns {number}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]).angle([4, 5, 6]); // <=> 0.22572622788897287
 */
export default function (this: NDArray, x: NDArray | ArrayLike<any>): number;
