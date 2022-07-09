/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Ordering } from "./Order";
import { Optional } from "./Type";
/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Searches `array` for `value`.
 *
 * Returns -1 if not found.
 *
 * @param array  Source array
 * @param value  Value to search
 * @returns Index
 */
export declare function indexOf<A>(array: ArrayLike<A>, value: A): number;
/**
 * Calls `test` for each element in `array`.
 *
 * If `test` returns `true` then it immediately returns `true`.
 *
 * If `test` returns `false` for all of the elements in `array` then it returns `false`.
 *
 * @param array  Source array
 * @param test   Function which is called on each element
 * @returns Whether `test` returned true or not
 */
export declare function any<A>(array: ArrayLike<A>, test: (value: A) => boolean): boolean;
/**
 * Calls `fn` function for every member of array and returns a new array out
 * of all outputs.
 *
 * @param array  Source array
 * @param fn     Callback function
 * @returns New array
 */
export declare function map<A, B>(array: ArrayLike<A>, fn: (value: A, index: number) => B): Array<B>;
/**
 * Iterates through all items in array and calls `fn` function for each of
 * them.
 *
 * @param array  Source array
 * @param fn     Callback function
 */
export declare function each<A>(array: ArrayLike<A>, fn: (value: A, index: number) => void): void;
/**
 * Iterates through all items in array in reverse order and calls `fn` function for each of
 * them.
 *
 * @param array  Source array
 * @param fn     Callback function
 */
export declare function eachReverse<A>(array: ArrayLike<A>, fn: (value: A, index: number) => void): void;
/**
 * Iterates through all items in array and calls `fn` function for each of
 * them.
 *
 * If `fn` call evaluates to `false`, further iteration is cancelled.
 *
 * @param array  Source array
 * @param fn     Callback function
 */
export declare function eachContinue<A>(array: ArrayLike<A>, fn: (value: A, index: number) => boolean): void;
/**
 * Shifts an item at `index` towards beginning of the array.
 *
 * @param array  Source array
 * @param index  Target element index
 */
export declare function shiftLeft<A>(array: Array<A>, index: number): void;
/**
 * Returns the last item of the array.
 *
 * @param array  Source array
 * @returns Last item
 */
export declare function last<A>(array: Array<A>): Optional<A>;
/**
 * Returns the first item of the array.
 *
 * @param array  Source array
 * @returns Last item
 */
export declare function first<A>(array: Array<A>): Optional<A>;
/**
 * Inserts `element` into `array` at `index`.
 *
 * Caps `index` to be between `0` and `array.length`
 *
 * @param array    Source array
 * @param element  Item to insert
 * @param array    Index to insert item at
 */
export declare function insert<A>(array: Array<A>, element: A, index: number): void;
/**
 * Removes all copies of `element` from `array` (if they exist) and then
 * inserts `element` at `index`.
 *
 * @param array    Source array
 * @param element  Item
 * @param array    Index to move item to
 */
export declare function setIndex<A>(array: Array<A>, element: A, index: number): void;
/**
 * Pushes all of the elements from `input` into `array`.
 *
 * @param array  Output array
 * @param input  Input array
 */
export declare function pushAll<A>(array: Array<A>, input: Array<A>): void;
/**
 * Removes `element` from `array`.
 *
 * If there are multiple copies of `element`, they are all removed.
 *
 * @param array    Source array
 * @param element  Item to remove
 */
export declare function remove<A>(array: Array<A>, element: A): boolean;
/**
 * Adds an `element` to `array`.
 *
 * If array already contains and item like this, it is removed before adding
 * it again.
 *
 * Optionally `toIndex` can be specified to add element at specific index.
 *
 * @param array    Source array
 * @param element  Item to add
 * @param array    Index to move item to
 */
export declare function move<A>(array: Array<A>, element: A, toIndex?: number): void;
/**
 * Inserts `element` into `array` at `index`.
 *
 * If `index` is not provided, it will insert `element` at the end of `array`.
 *
 * @param array    Source array
 * @param element  Item to add
 * @param array    Index to add item at
 */
export declare function add<A>(array: Array<A>, element: A, index?: number): void;
/**
 * Removes `element` from `array` (if it exists) and then inserts `element` at
 * `index`.
 *
 * If `index` is not provided, it will insert `element` at the end of `array`.
 *
 * @param array    Source array
 * @param element  Item to remove
 * @param array    Index to move item to
 */
export declare function replace<A>(array: Array<A>, element: A, index?: number): void;
/**
 * Wraps `input` in an array, if it isn't already an array.
 *
 * @param input  Source value
 * @return An array
 */
export declare function toArray<A>(input: Array<A> | A): Array<A>;
/**
 * Returns `true` if `element` exists in `array`.
 *
 * @param array    Source array
 * @param element  Item to search for
 * @returns Item in array?
 */
export declare function has<A>(array: ArrayLike<A>, element: A): boolean;
/**
 * Returns a shallow copy of `array`.
 *
 * @param array  Source array
 * @returns Copy of the array
 */
export declare function copy<A>(array: ArrayLike<A>): Array<A>;
/**
 * Returns a copy of `array` which contains all the elements between `start`
 * and `end`. (including `start` and excluding `end`)
 *
 * If `end` is not provided, it defaults to `array.length`.
 *
 * @param array  Source array
 * @param start  Start index
 * @param end    End index
 * @returns Part of the array
 */
export declare function slice<A>(array: ArrayLike<A>, start: number, end?: number): Array<A>;
/**
 * Inserts a value into array at specific index.
 *
 * @param array  Source array
 * @param index  Index
 * @param value  Value to insert
 */
export declare function insertIndex<A>(array: Array<A>, index: number, value: A): void;
/**
 * Removes a value from array at specific index.
 *
 * @param array  Source array
 * @param index  Index
 */
export declare function removeIndex<A>(array: Array<A>, index: number): void;
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export interface SortResult {
    found: boolean;
    index: number;
}
/**
 * Orders an array using specific `ordering` function and returns index of
 * the `value`.
 *
 * @ignore Exclude from docs
 * @param array     Source array
 * @param ordering  An ordering function
 * @param value     Value to search for
 * @returns Result of the search
 */
export declare function getSortedIndex<A>(array: ArrayLike<A>, ordering: (left: A, right: A) => Ordering, value: A): SortResult;
/**
 * Searches the array using custom function and returns index of the item if
 * found.
 *
 * Will call `matches` function on all items of the array. If return value
 * evaluates to `true`, index is returned.
 *
 * Otherwise returns -1.
 *
 * @param array    Source array
 * @param matches  Search function
 * @returns Index of the item if found
 */
export declare function findIndex<A>(array: ArrayLike<A>, matches: (value: A, index: number) => boolean): number;
/**
 * Searches the array using custom function and returns item if found.
 *
 * Will call `matches` function on all items of the array. If return value
 * evaluates to `true`, index is returned.
 *
 * Otherwise returns `undefined`.
 *
 * @param array    Source array
 * @param matches  Search function
 * @returns Item if found
 */
export declare function find<A>(array: ArrayLike<A>, matches: (value: A, index: number) => boolean): A | undefined;
/**
 * Iterates through all items in array and calls `fn` function for each of
 * them.
 *
 * @param array  Source array
 * @param fn     Callback function
 */
export declare function shuffle<A>(array: Array<A>): void;
export declare function keepIf<A>(array: Array<A>, keep: (value: A) => boolean): void;
