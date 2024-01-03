/**
 * Always returns true.
 * @return {boolean} true.
 */
export function TRUE(): boolean;
/**
 * Always returns false.
 * @return {boolean} false.
 */
export function FALSE(): boolean;
/**
 * A reusable function, used e.g. as a default for callbacks.
 *
 * @return {void} Nothing.
 */
export function VOID(): void;
/**
 * Wrap a function in another function that remembers the last return.  If the
 * returned function is called twice in a row with the same arguments and the same
 * this object, it will return the value from the first call in the second call.
 *
 * @param {function(...any): ReturnType} fn The function to memoize.
 * @return {function(...any): ReturnType} The memoized function.
 * @template ReturnType
 */
export function memoizeOne<ReturnType_1>(fn: (...arg0: any[]) => ReturnType_1): (...arg0: any[]) => ReturnType_1;
/**
 * @template T
 * @param {function(): (T | Promise<T>)} getter A function that returns a value or a promise for a value.
 * @return {Promise<T>} A promise for the value.
 */
export function toPromise<T>(getter: () => T | Promise<T>): Promise<T>;
//# sourceMappingURL=functions.d.ts.map