import { ModelSchema, Clazz, Props } from "./types";
import Context from "../core/Context";
/**
 * Creates a model schema that (de)serializes an object created by a constructor function (class).
 * The created model schema is associated by the targeted type as default model schema, see setDefaultModelSchema.
 * Its factory method is `() => new clazz()` (unless overriden, see third arg).
 *
 * @example
 * function Todo(title, done) {
 *     this.title = title
 *     this.done = done
 * }
 *
 * createModelSchema(Todo, {
 *     title: true,
 *     done: true,
 * })
 *
 * const json = serialize(new Todo('Test', false))
 * const todo = deserialize(Todo, json)
 *
 * @param clazz class or constructor function
 * @param props property mapping
 * @param factory optional custom factory. Receives context as first arg
 * @returns model schema
 */
export default function createModelSchema<T extends object>(clazz: Clazz<T>, props: Props, factory?: (context: Context) => T): ModelSchema<T>;
