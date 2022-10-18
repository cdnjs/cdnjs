import { PropSchema, AdditionalPropArgs } from "../api/types";
/**
 * Indicates that this field contains a primitive value (or Date) which should be serialized literally to json.
 *
 * @example
 * createModelSchema(Todo, {
 *     title: primitive(),
 * })
 *
 * serialize(new Todo('test')) // { "title": "test" }
 *
 * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
 */
export default function primitive(additionalArgs?: AdditionalPropArgs): PropSchema;
