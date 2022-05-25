import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function eye
 * @description Creates an identity matrix of size `n` and type `type`.
 * @param {Number} n
 * @returns {NDArray}
 * @example
 * import { eye } from 'vectorious/core/eye';
 *
 * eye(2); // => array([[1, 0], [0, 1]])
 */
export declare const eye: (n: number) => NDArray;
