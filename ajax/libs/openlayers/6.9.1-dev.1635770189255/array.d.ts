/**
 * @module ol/array
 */
/**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 *
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function} [opt_comparator] Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */
export function binarySearch(haystack: any[], needle: any, opt_comparator?: Function | undefined): number;
/**
 * Compare function for array sort that is safe for numbers.
 * @param {*} a The first object to be compared.
 * @param {*} b The second object to be compared.
 * @return {number} A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */
export function numberSafeCompareFunction(a: any, b: any): number;
/**
 * Whether the array contains the given object.
 * @param {Array<*>} arr The array to test for the presence of the element.
 * @param {*} obj The object for which to test.
 * @return {boolean} The object is in the array.
 */
export function includes(arr: any[], obj: any): boolean;
/**
 * {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution} can use a function
 * of this type to determine which nearest resolution to use.
 *
 * This function takes a `{number}` representing a value between two array entries,
 * a `{number}` representing the value of the nearest higher entry and
 * a `{number}` representing the value of the nearest lower entry
 * as arguments and returns a `{number}`. If a negative number or zero is returned
 * the lower value will be used, if a positive number is returned the higher value
 * will be used.
 * @typedef {function(number, number, number): number} NearestDirectionFunction
 * @api
 */
/**
 * @param {Array<number>} arr Array in descending order.
 * @param {number} target Target.
 * @param {number|NearestDirectionFunction} direction
 *    0 means return the nearest,
 *    > 0 means return the largest nearest,
 *    < 0 means return the smallest nearest.
 * @return {number} Index.
 */
export function linearFindNearest(arr: number[], target: number, direction: number | ((arg0: number, arg1: number, arg2: number) => number)): number;
/**
 * @param {Array<*>} arr Array.
 * @param {number} begin Begin index.
 * @param {number} end End index.
 */
export function reverseSubArray(arr: any[], begin: number, end: number): void;
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
 * @template VALUE
 */
export function extend<VALUE>(arr: VALUE[], data: VALUE | VALUE[]): void;
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {VALUE} obj The element to remove.
 * @template VALUE
 * @return {boolean} If the element was removed.
 */
export function remove<VALUE>(arr: VALUE[], obj: VALUE): boolean;
/**
 * @param {Array<VALUE>} arr The array to search in.
 * @param {function(VALUE, number, ?) : boolean} func The function to compare.
 * @template VALUE
 * @return {VALUE|null} The element found or null.
 */
export function find<VALUE>(arr: VALUE[], func: (arg0: VALUE, arg1: number, arg2: any) => boolean): VALUE | null;
/**
 * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */
export function equals(arr1: any[] | Uint8ClampedArray, arr2: any[] | Uint8ClampedArray): boolean;
/**
 * Sort the passed array such that the relative order of equal elements is preserved.
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 * @param {Array<*>} arr The array to sort (modifies original).
 * @param {!function(*, *): number} compareFnc Comparison function.
 * @api
 */
export function stableSort(arr: any[], compareFnc: (arg0: any, arg1: any) => number): void;
/**
 * @param {Array<*>} arr The array to search in.
 * @param {Function} func Comparison function.
 * @return {number} Return index.
 */
export function findIndex(arr: any[], func: Function): number;
/**
 * @param {Array<*>} arr The array to test.
 * @param {Function} [opt_func] Comparison function.
 * @param {boolean} [opt_strict] Strictly sorted (default false).
 * @return {boolean} Return index.
 */
export function isSorted(arr: any[], opt_func?: Function | undefined, opt_strict?: boolean | undefined): boolean;
/**
 * {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution} can use a function
 * of this type to determine which nearest resolution to use.
 *
 * This function takes a `{number}` representing a value between two array entries,
 * a `{number}` representing the value of the nearest higher entry and
 * a `{number}` representing the value of the nearest lower entry
 * as arguments and returns a `{number}`. If a negative number or zero is returned
 * the lower value will be used, if a positive number is returned the higher value
 * will be used.
 */
export type NearestDirectionFunction = (arg0: number, arg1: number, arg2: number) => number;
//# sourceMappingURL=array.d.ts.map