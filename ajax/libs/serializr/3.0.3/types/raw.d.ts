import { PropSchema, AdditionalPropArgs } from "../api/types";
/**
 * Indicates that this field is only need to putted in the serialized json or
 * deserialized instance, without any transformations. Stay with its original value
 *
 * @example
 * createModelSchema(Model, {
 *     rawData: raw(),
 * })
 *
 * serialize(new Model({ rawData: { a: 1, b: [], c: {} } } }))
 * // { "rawData": { a: 1, b: [], c: {} } } }
 *
 * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
 */
export default function raw(additionalArgs?: AdditionalPropArgs): PropSchema;
