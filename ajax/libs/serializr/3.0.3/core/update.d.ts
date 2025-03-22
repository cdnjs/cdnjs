import { ClazzOrModelSchema } from "../api/types";
/**
 * Similar to deserialize, but updates an existing object instance.
 * Properties will always updated entirely, but properties not present in the json will be kept as is.
 * Further this method behaves similar to deserialize.
 *
 * @param modelSchema, optional if it can be inferred from the instance type
 * @param target target instance to update
 * @param json the json to deserialize
 * @param callback the callback to invoke once deserialization has completed.
 * @param customArgs custom arguments that are available as `context.args` during the deserialization process. This can be used as dependency injection mechanism to pass in, for example, stores.
 * @returns deserialized object, possibly incomplete.
 */
export default function update<T>(modelschema: ClazzOrModelSchema<T>, instance: T, json: any, callback?: (err: any, result: T) => void, customArgs?: any): void;
export default function update<T>(instance: T, json: any, callback?: (err: any, result: T) => void, customArgs?: any): void;
