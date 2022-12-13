/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import * as $array from "./Array";
import * as $type from "./Type";
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
export function entries(object) {
    return function (push) {
        // TODO make this more efficient ?
        for (var key in object) {
            if (hasKey(object, key)) {
                if (!push([key, object[key]])) {
                    break;
                }
            }
        }
    };
}
/**
 * Returns an array of object's property names.
 *
 * @param object  Source object
 * @returns Object property names
 */
export function keys(object) {
    var output = [];
    for (var key in object) {
        if (hasKey(object, key)) {
            output.push(key);
        }
    }
    return output;
}
/**
 * Returns an array of object's property names ordered using specific ordering
 * function.
 *
 * @param object  Source object
 * @param order   Ordering function
 * @returns Object property names
 */
export function keysOrdered(object, order) {
    return keys(object).sort(order);
}
/**
 * Checks if `object` has a specific `key`.
 *
 * @param object  Source object
 * @param key     Property name
 * @returns Has key?
 */
export function hasKey(object, key) {
    return {}.hasOwnProperty.call(object, key);
}
/**
 * Returns value of the specific `key`.
 *
 * @param object  Source object
 * @param key     Property name
 * @returns Key value
 */
export function getKey(object, key) {
    return object[key];
}
/**
 * Iterates through all properties of the object calling `fn` for each of them.
 *
 * If return value of the function evaluates to `false` further iteration is
 * cancelled.
 *
 * @param object  Source object
 * @param fn      Callback function
 */
export function eachContinue(object, fn) {
    for (var key in object) {
        if (hasKey(object, key)) {
            if (!fn(key, object[key])) {
                break;
            }
        }
    }
}
/**
 * Iterates through all properties of the object calling `fn` for each of them.
 *
 * @param object  Source object
 * @param fn      Callback function
 */
export function each(object, fn) {
    eachContinue(object, function (key, value) {
        fn(key, value);
        return true;
    });
}
/**
 * Orders object properties using custom `ord` function and iterates through
 * them calling `fn` for each of them.
 *
 * @param object  Source object
 * @param fn      Callback function
 * @param order   Ordering function
 */
export function eachOrdered(object, fn, ord) {
    $array.each(keysOrdered(object, ord), function (key) {
        fn(key, object[key]);
    });
}
/**
 * Returns a copy of the object.
 *
 * @param object  Source object
 * @returns Copy of the object
 */
export function copy(object) {
    return Object.assign({}, object);
}
/**
 * Merges two objects and returns a new object that contains properties from
 * both source objects.
 *
 * @param object1  Source object #1
 * @param object2  Source object #2
 * @returns Combined object
 */
export function merge(object1, object2) {
    return Object.assign({}, object1, object2);
}
/**
 * Returns object clone.
 *
 * @param object  Source object
 * @returns       Clone
 */
export function clone(object) {
    return JSON.parse(JSON.stringify(object));
}
/**
 * Copies a list of properties from one object to another.
 *
 * Will not copy empty properties.
 *
 * @param source  Source object
 * @param target    Target object
 * @param keys  List of keys to copy
 */
export function copyProperties(source, target, keys) {
    $array.each(keys, function (key) {
        if ($type.hasValue(source[key])) {
            target[key] = source[key];
        }
    });
}
/**
 * Copies a list of properties from one object to another only if target does't have value of the property set.
 *
 * Will not copy empty properties.
 *
 * @param source  Source object
 * @param target    Target object
 * @param keys  List of keys to copy
 */
export function softCopyProperties(source, target, keys) {
    $array.each(keys, function (key) {
        if ($type.hasValue(source[key]) && !($type.hasValue(target[key]))) {
            target[key] = source[key];
        }
    });
}
/**
 * Copies a list of properties from one object to another.
 *
 * Will copy empty properties.
 *
 * @param source  Source object
 * @param target    Target object
 * @param keys  List of keys to copy
 */
export function forceCopyProperties(source, target, keys) {
    $array.each(keys, function (key) {
        target[key] = source[key];
    });
}
/**
 * Copies all properties from one object to another.
 *
 * @param from  Source object
 * @param to    Target object
 */
export function copyAllProperties(from, to) {
    copyProperties(from, to, keys(from));
}
//# sourceMappingURL=Object.js.map