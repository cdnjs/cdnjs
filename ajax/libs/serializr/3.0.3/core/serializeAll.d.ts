import { Clazz, PropDef } from "../api/types";
/**
 * The `serializeAll` decorator can used on a class to signal that all primitive properties,
 * or complex properties with a name matching a `pattern`, should be serialized automatically.
 *
 * @example
 * \@serializeAll
 * class Store {
 *     a = 3
 *     b
 * }
 *
 * const store = new Store()
 * store.c = 5
 * store.d = {}
 * serialize(store) // { "c": 5 }
 *
 * @example
 * class DataType {
 *     \@serializable
 *     x
 *     \@serializable
 *     y
 * }
 *
 * \@serializeAll(/^[a-z]$/, DataType)
 * class ComplexStore {
 * }
 *
 * const store = new ComplexStore()
 * store.a = {x: 1, y: 2}
 * store.b = {}
 * store.somethingElse = 5
 * serialize(store) // { a: {x: 1, y: 2}, b: { x: undefined, y: undefined } }
 */
export default function serializeAll<T>(clazz: Clazz<T>): Clazz<T>;
export default function serializeAll(pattern: RegExp, propertyType: PropDef | Clazz<any>): (clazz: Clazz<any>) => Clazz<any>;
