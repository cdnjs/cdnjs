import * as $iter from "./Iterator";
import * as $type from "./Type";
import { Ordering } from "./Order";
/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Returns an iterator for all entries in object.
 *
 * Can be used to safely iterate through all properties of the object.
 *
 * @param object  Source object
 * @returns Iterator
 */
export declare function entries<Object>(object: Object): $iter.Iterator<[$type.Keyof<Object>, Object[$type.Keyof<Object>]]>;
/**
 * Returns an array of object's property names.
 *
 * @param object  Source object
 * @returns Object property names
 */
export declare function keys<Object>(object: Object): Array<$type.Keyof<Object>>;
/**
 * Returns an array of object's property names ordered using specific ordering
 * function.
 *
 * @param object  Source object
 * @param order   Ordering function
 * @returns Object property names
 */
export declare function keysOrdered<Object>(object: Object, order: (a: $type.Keyof<Object>, b: $type.Keyof<Object>) => Ordering): Array<$type.Keyof<Object>>;
/**
 * Checks if `object` has a specific `key`.
 *
 * @param object  Source object
 * @param key     Property name
 * @returns Has key?
 */
export declare function hasKey<Object, Key extends keyof Object>(object: Object, key: Key): boolean;
/**
 * Returns value of the specific `key`.
 *
 * @param object  Source object
 * @param key     Property name
 * @returns Key value
 */
export declare function getKey<Object, Key extends keyof Object>(object: Object, key: Key): Object[Key];
/**
 * Iterates through all properties of the object calling `fn` for each of them.
 *
 * If return value of the function evaluates to `false` further iteration is
 * cancelled.
 *
 * @param object  Source object
 * @param fn      Callback function
 */
export declare function eachContinue<Object>(object: Object, fn: <Key extends $type.Keyof<Object>>(key: Key, value: Object[Key]) => boolean): void;
/**
 * Iterates through all properties of the object calling `fn` for each of them.
 *
 * @param object  Source object
 * @param fn      Callback function
 */
export declare function each<Object>(object: Object, fn: <Key extends $type.Keyof<Object>>(key: Key, value: Object[Key]) => void): void;
/**
 * Orders object properties using custom `ord` function and iterates through
 * them calling `fn` for each of them.
 *
 * @param object  Source object
 * @param fn      Callback function
 * @param order   Ordering function
 */
export declare function eachOrdered<Object>(object: Object, fn: <Key extends $type.Keyof<Object>>(key: Key, value: Object[Key]) => void, ord: (a: $type.Keyof<Object>, b: $type.Keyof<Object>) => Ordering): void;
/**
 * Returns a copy of the object.
 *
 * @param object  Source object
 * @returns Copy of the object
 */
export declare function copy<Object>(object: Object): Object;
/**
 * Merges two objects and returns a new object that contains properties from
 * both source objects.
 *
 * @param object1  Source object #1
 * @param object2  Source object #2
 * @returns Combined object
 */
export declare function merge<Object1, Object2>(object1: Object1, object2: Object2): Object1 & Object2;
/**
 * Returns object clone.
 *
 * @param object  Source object
 * @returns       Clone
 */
export declare function clone<Object>(object: Object): Object;
/**
 * Copies a list of properties from one object to another.
 *
 * Will not copy empty properties.
 *
 * @param source  Source object
 * @param target    Target object
 * @param keys  List of keys to copy
 */
export declare function copyProperties(source: {
    [key: string]: any;
}, target: {
    [key: string]: any;
}, keys: Array<string>): void;
/**
 * Copies a list of properties from one object to another only if target does't have value of the property set.
 *
 * Will not copy empty properties.
 *
 * @param source  Source object
 * @param target    Target object
 * @param keys  List of keys to copy
 */
export declare function softCopyProperties(source: {
    [key: string]: any;
}, target: {
    [key: string]: any;
}, keys: Array<string>): void;
/**
 * Copies a list of properties from one object to another.
 *
 * Will copy empty properties.
 *
 * @param source  Source object
 * @param target    Target object
 * @param keys  List of keys to copy
 */
export declare function forceCopyProperties(source: {
    [key: string]: any;
}, target: {
    [key: string]: any;
}, keys: Array<string>): void;
/**
 * Copies all properties from one object to another.
 *
 * @param from  Source object
 * @param to    Target object
 */
export declare function copyAllProperties(from: {
    [key: string]: any;
}, to: {
    [key: string]: any;
}): void;
