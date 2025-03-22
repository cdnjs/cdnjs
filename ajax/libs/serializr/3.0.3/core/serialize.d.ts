import { ClazzOrModelSchema } from "../api/types";
/**
 * Serializes an object (graph) into json using the provided model schema.
 * The model schema can be omitted if the object type has a default model schema associated with it.
 * If a list of objects is provided, they should have an uniform type.
 *
 * @param arg1 class or modelschema to use. Optional
 * @param arg2 object(s) to serialize
 * @returns serialized representation of the object
 */
export default function serialize<T>(modelSchema: ClazzOrModelSchema<T>, instance: T): any;
export default function serialize<T>(instance: T): any;
export default function serialize<T>(modelSchema: ClazzOrModelSchema<T>, instance: T[]): any;
export default function serialize<T>(instance: T[]): any;
