import Context from "./Context";
import { ClazzOrModelSchema, AfterDeserializeFunc, BeforeDeserializeFunc, ModelSchema } from "../api/types";
/**
 * Deserializes a json structure into an object graph.
 *
 * This process might be asynchronous (for example if there are references with an asynchronous
 * lookup function). The function returns an object (or array of objects), but the returned object
 * might be incomplete until the callback has fired as well (which might happen immediately)
 *
 * @param schema to use for deserialization
 * @param json data to deserialize
 * @param callback node style callback that is invoked once the deserialization has
 *   finished. First argument is the optional error, second argument is the deserialized object
 *   (same as the return value)
 * @param customArgs custom arguments that are available as `context.args` during the
 *   deserialization process. This can be used as dependency injection mechanism to pass in, for
 *   example, stores.
 * @returns deserialized object, possibly incomplete.
 */
export default function deserialize<T>(modelschema: ClazzOrModelSchema<T>, jsonArray: any[], callback?: (err: any, result: T[]) => void, customArgs?: any): T[];
export default function deserialize<T>(modelschema: ClazzOrModelSchema<T>, json: any, callback?: (err: any, result: T) => void, customArgs?: any): T;
export declare function deserializeObjectWithSchema(parentContext: Context<any> | undefined, modelSchema: ModelSchema<any>, json: any, callback: (err?: any, value?: any) => void, customArgs: any): any;
export declare const onBeforeDeserialize: BeforeDeserializeFunc;
export declare const onAfterDeserialize: AfterDeserializeFunc;
export declare function deserializePropsWithSchema<T>(context: Context<T>, modelSchema: ModelSchema<T>, json: any, target: T): void;
