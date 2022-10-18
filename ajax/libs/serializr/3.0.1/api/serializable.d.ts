import { PropDef } from "./types";
/**
 * Decorator that defines a new property mapping on the default model schema for the class
 * it is used in.
 *
 * When using typescript, the decorator can also be used on fields declared as constructor arguments (using the `private` / `protected` / `public` keywords).
 * The default factory will then invoke the constructor with the correct arguments as well.
 *
 * @example
 * class Todo {
 *     \@serializable(primitive())
 *     title // shorthand for primitves
 *
 *     \@serializable
 *     done
 *
 *     constructor(title, done) {
 *         this.title = title
 *         this.done = done
 *     }
 * }
 *
 * const json = serialize(new Todo('Test', false))
 * const todo = deserialize(Todo, json)
 */
export default function serializable(propSchema: PropDef): (target: any, key: string, baseDescriptor?: PropertyDescriptor) => void;
export default function serializable(target: any, key: string, baseDescriptor?: PropertyDescriptor): void;
