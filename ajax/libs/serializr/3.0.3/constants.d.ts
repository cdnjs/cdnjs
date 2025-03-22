/**
 * If you want to skip serialization or deserialization, you can use SKIP.
 *
 * @example
 * const schema = createSimpleSchema({
 *     a: custom(
 *         () => SKIP,
 *         v => v,
 *     ),
 * })
 * serialize(s, { a: 4 }) // {}
 * deserialize(s, { "a": 4 }) // { a: 4 }
 *
 * @example
 * // Skipping deserialization with computed mobx property.
 *
 * class TodoState {
 *     // Todo.category is @serializable(reference(...))
 *     \@serializable(list(object(Todo)))
 *     \@observable
 *     todos: Todo[]
 *
 *     // we want to serialize the categories, so that the references in
 *     // this.todos can be resolved, but we don't want to set this property
 *     \@serializable(
 *         list(object(TodoCategory),
 *         { afterDeserialize: callback => callback(undefined, SKIP) }))
 *     \@computed
 *     get categories() {
 *         return this.todos.map(todo => todo.category)
 *     }
 * }
 */
export declare const SKIP: symbol | {
    SKIP: boolean;
};
/**
 * When using the decorator shorthand we store the given value in
 * a specific attribute of the result structure. This constant contains
 * the attribute name used in such scenario.
 */
export declare const DEFAULT_DISCRIMINATOR_ATTR = "_type";
export declare const _defaultPrimitiveProp: import("./serializr").PropSchema;
