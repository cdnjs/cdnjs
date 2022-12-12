import { invariant, isPropSchema } from "../utils/utils";
import { _defaultPrimitiveProp, SKIP } from "../constants";
/**
 * Optional indicates that this model property shouldn't be serialized if it isn't present.
 *
 * Note that if we use `optional` together with another prop schema such as `custom`,
 * the prop schema for `custom` will be applied first and the result of that serialization
 * will be used to feed into `optional`. As such, it might be better to just use `custom`
 * with `SKIP` to achieve the same goal.
 *
 * @example
 * createModelSchema(Todo, {
 *     title: optional(primitive()),
 *     user: optional(custom(value => value?.name, () => SKIP))
 * })
 *
 * serialize(new Todo()) // {}
 *
 * @param propSchema propSchema to (de)serialize the contents of this field
 */
export default function optional(propSchema) {
    propSchema = !propSchema || propSchema === true ? _defaultPrimitiveProp : propSchema;
    invariant(isPropSchema(propSchema), "expected prop schema as second argument");
    var propSerializer = propSchema.serializer;
    invariant(typeof propSerializer === "function", "expected prop schema to have a callable serializer");
    var serializer = function (sourcePropertyValue, key, sourceObject) {
        var result = propSerializer(sourcePropertyValue, key, sourceObject);
        if (result === undefined) {
            return SKIP;
        }
        return result;
    };
    return Object.assign({}, propSchema, { serializer: serializer });
}
//# sourceMappingURL=optional.js.map