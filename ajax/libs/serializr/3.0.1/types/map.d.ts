import { PropSchema, AdditionalPropArgs } from "../api/types";
/**
 * Similar to list, but map represents a string keyed dynamic collection.
 * This can be both plain objects (default) or ES6 Map like structures.
 * This will be inferred from the initial value of the targetted attribute.
 *
 * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
 */
export default function map(propSchema: PropSchema, additionalArgs?: AdditionalPropArgs): PropSchema;
