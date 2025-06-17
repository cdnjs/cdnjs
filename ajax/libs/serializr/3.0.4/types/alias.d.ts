import { PropSchema, PropDef } from "../api/types";
/**
 * Alias indicates that this model property should be named differently in the generated json.
 * Alias should be the outermost propschema.
 *
 * @example
 * createModelSchema(Todo, {
 *     title: alias('task', primitive()),
 * })
 *
 * serialize(new Todo('test')) // { "task": "test" }
 *
 * @param name name of the json field to be used for this property
 * @param propSchema propSchema to (de)serialize the contents of this field
 */
export default function alias(name: string, propSchema?: PropDef): PropSchema;
