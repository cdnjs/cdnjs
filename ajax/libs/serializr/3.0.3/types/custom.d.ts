import { AdditionalPropArgs, PropSchema, PropSerializer } from "../api/types";
import { SKIP } from "../constants";
import Context from "../core/Context";
/**
 * Can be used to create simple custom propSchema. Multiple things can be done inside of a custom
 * propSchema, like deserializing and serializing other (polymorphic) objects, skipping the
 * serialization of something or checking the context of the obj being (de)serialized.
 *
 * The `custom` function takes two parameters, the `serializer` function and the `deserializer`
 * function.
 *
 * The `serializer` function has the signature:
 * `(value, key, obj) => void`
 *
 * When serializing the object `{a: 1}` the `serializer` function will be called with
 * `serializer(1, 'a', {a: 1})`.
 *
 * The `deserializer` function has the following signature for synchronous processing
 * `(value, context, oldValue) => void`
 *
 * For asynchronous processing the function expects the following signature
 * `(value, context, oldValue, callback) => void`
 *
 * When deserializing the object `{b: 2}` the `deserializer` function will be called with
 * `deserializer(2, contextObj)`
 * ([contextObj reference](https://github.com/mobxjs/serializr#deserialization-context)).
 *
 * @example
 * const schemaDefault = createSimpleSchema({
 *     a: custom(
 *         v => v + 2,
 *         v => v - 2
 *     )
 * })
 * serialize(schemaDefault, { a: 4 }) // { "a": 6 }
 * deserialize(schemaDefault, { "a": 6 }) // { a: 4 }
 *
 * const schemaWithAsyncProps = createSimpleSchema({
 *     a: custom(
 *         v => v + 2,
 *         (v, context, oldValue, callback) =>
 *             somePromise(v, context, oldValue)
 *                 .then(result => callback(null, result - 2))
 *                 .catch(err => callback(err))
 *     )
 * })
 * serialize(schemaWithAsyncProps, { a: 4 }) // { "a": 6 }
 * deserialize(schemaWithAsyncProps, { "a": 6 }, (err, res) => {
 *   res // { a: 4 }
 * }

 *
 * @param serializer function that takes a model value and turns it into a json value
 * @param deserializer function that takes a json value and turns it into a model value.
 * It also takes context argument, which can allow you to deserialize based on the context of other
 * parameters.
 * @param additionalArgs optional object that contains beforeDeserialize and/or
 * afterDeserialize handlers
 */
export default function custom(serializer: PropSerializer, deserializer: (jsonValue: any, context: Context, oldValue: any, callback: (err: any, result: any | typeof SKIP) => void) => void, additionalArgs?: AdditionalPropArgs): PropSchema;
export default function custom(serializer: PropSerializer, deserializer: (jsonValue: any, context: Context, oldValue: any) => any | typeof SKIP, additionalArgs?: AdditionalPropArgs): PropSchema;
