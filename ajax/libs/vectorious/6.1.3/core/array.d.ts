import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function array
 * @description `array(...args)` is an alias for `new v(...args)`
 * @param {} ...args
 * @returns {NDArray}
 * @example
 * import { array } from 'vectorious/core/array';
 *
 * array([1, 2, 3]); // => array([1, 2, 3])
 */
export declare const array: (...args: any[]) => NDArray;
