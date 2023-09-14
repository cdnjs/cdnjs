import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function magic
 * @description Creates a magic square matrix of size `n`
 * @param {Number} n
 * @returns {NDArray}
 * @example
 * import { magic } from 'vectorious/core/magic';
 *
 * magic(3); // => array([[8, 1, 6], [3, 5, 7], [4, 9, 2]])
 */
export declare const magic: (n: number) => NDArray;
