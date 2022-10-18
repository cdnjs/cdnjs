import { PropSchema, AdditionalPropArgs } from "../api/types";
/**
 * Similar to primitive, serializes instances of Date objects
 *
 * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
 */
export default function date(additionalArgs?: AdditionalPropArgs): PropSchema;
