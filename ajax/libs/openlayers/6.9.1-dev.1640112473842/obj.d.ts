/**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */
export function clear(object: any): void;
/**
 * Determine if an object has any properties.
 * @param {Object} object The object to check.
 * @return {boolean} The object is empty.
 */
export function isEmpty(object: any): boolean;
export function assign(target: any, var_sources: any, ...args: any[]): any;
/**
 * Polyfill for Object.values().  Get an array of property values from an object.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 *
 * @param {!Object<K,V>} object The object from which to get the values.
 * @return {!Array<V>} The property values.
 * @template K,V
 */
export const getValues: {
    <T>(o: {
        [s: string]: T;
    } | ArrayLike<T>): T[];
    (o: {}): any[];
};
//# sourceMappingURL=obj.d.ts.map