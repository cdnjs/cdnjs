import { PropSchema, AdditionalPropArgs } from "../api/types";
/**
 * Similar to map, mapAsArray can be used to serialize a map-like collection where the key is
 * contained in the 'value object'. Example: consider Map<id: number, customer: Customer> where the
 * Customer object has the id stored on itself. mapAsArray stores all values from the map into an
 * array which is serialized. Deserialization returns a ES6 Map or plain object object where the
 * `keyPropertyName` of each object is used for keys. For ES6 maps this has the benefit of being
 * allowed to have non-string keys in the map. The serialized json also may be slightly more
 * compact.
 *
 * @param keyPropertyName - the property of stored objects used as key in the map
 * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
 */
export default function mapAsArray(propSchema: PropSchema, keyPropertyName: string, additionalArgs?: AdditionalPropArgs): PropSchema;
