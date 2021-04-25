import { NDArray } from './';
/**
 * @static
 * @memberof module:Globals
 * @function random
 * @description Creates a vector containing random samples from a uniform distribution over `[0, 1)` of shape `shape`
 * @param {Number[]} ...shape
 * @returns {NDArray}
 * @example
 * import { random } from 'vectorious/core/random';
 *
 * random(3); // => array([0.27496153116226196, 0.7581521272659302, 0.3682245910167694])
 */
export declare const random: (...shape: number[]) => NDArray;
