import { ClazzOrModelSchema } from "../api/types";
type Primitive = string | number | boolean | null | undefined | symbol | bigint;
type FunctionKeys<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type SerializeObjectProperties<T extends object> = {
    [P in keyof Omit<T, FunctionKeys<T>>]: Serialized<T[P]>;
};
/**
 * Recursively defines a type that represents the serialized form of T.
 * - Primitive types remain unchanged.
 * - Functions are omitted.
 * - Array elements are recursively serialized.
 * - Object properties are recursively serialized (excluding functions).
 */
export type Serialized<T> = T extends Primitive ? T : T extends Array<infer U> ? Array<Serialized<U>> : T extends object ? SerializeObjectProperties<T> : T;
/**
 * Serializes an object (graph) into json using the provided model schema.
 * The model schema can be omitted if the object type has a default model schema associated with it.
 * If a list of objects is provided, they should have an uniform type.
 *
 * @param arg1 class or modelschema to use. Optional
 * @param arg2 object(s) to serialize
 * @returns serialized representation of the object
 */
export default function serialize<T>(modelSchema: ClazzOrModelSchema<T>, instance: T): Serialized<T>;
export default function serialize<T>(instance: T): Serialized<T>;
export default function serialize<T>(modelSchema: ClazzOrModelSchema<T>, instance: T[]): Serialized<T>[];
export default function serialize<T>(instance: T[]): Serialized<T>[];
export {};
