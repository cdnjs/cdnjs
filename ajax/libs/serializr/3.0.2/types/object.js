import { invariant, isModelSchema, processAdditionalPropArgs } from "../utils/utils";
import getDefaultModelSchema from "../api/getDefaultModelSchema";
import serialize from "../core/serialize";
import { deserializeObjectWithSchema } from "../core/deserialize";
/**
 * `object` indicates that this property contains an object that needs to be (de)serialized
 * using its own model schema.
 *
 * N.B. mind issues with circular dependencies when importing model schema's from other files! The module resolve algorithm might expose classes before `createModelSchema` is executed for the target class.
 *
 * @example
 * class SubTask {}
 * class Todo {}
 *
 * createModelSchema(SubTask, {
 *     title: true,
 * })
 * createModelSchema(Todo, {
 *     title: true,
 *     subTask: object(SubTask),
 * })
 *
 * const todo = deserialize(Todo, {
 *     title: 'Task',
 *     subTask: {
 *         title: 'Sub task',
 *     },
 * })
 *
 * @param modelSchema to be used to (de)serialize the object
 * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
 */
export default function object(modelSchema, additionalArgs) {
    invariant(typeof modelSchema === "object" || typeof modelSchema === "function", "No modelschema provided. If you are importing it from another file be aware of circular dependencies.");
    var result = {
        serializer: function (item) {
            modelSchema = getDefaultModelSchema(modelSchema);
            invariant(isModelSchema(modelSchema), "expected modelSchema, got " + modelSchema);
            if (item === null || item === undefined)
                return item;
            return serialize(modelSchema, item);
        },
        deserializer: function (childJson, done, context) {
            modelSchema = getDefaultModelSchema(modelSchema);
            invariant(isModelSchema(modelSchema), "expected modelSchema, got " + modelSchema);
            if (childJson === null || childJson === undefined)
                return void done(null, childJson);
            return void deserializeObjectWithSchema(context, modelSchema, childJson, done, undefined);
        },
    };
    result = processAdditionalPropArgs(result, additionalArgs);
    return result;
}
//# sourceMappingURL=object.js.map