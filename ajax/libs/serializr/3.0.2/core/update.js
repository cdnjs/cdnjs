/*
 * Update
 */
import { invariant, isModelSchema, GUARDED_NOOP } from "../utils/utils";
import getDefaultModelSchema from "../api/getDefaultModelSchema";
import Context from "./Context";
import { deserializePropsWithSchema } from "./deserialize";
export default function update(modelSchema, target, json, callback, customArgs) {
    var inferModelSchema = arguments.length === 2 || typeof arguments[2] === "function"; // only target and json // callback as third arg
    if (inferModelSchema) {
        target = arguments[0];
        modelSchema = getDefaultModelSchema(target);
        json = arguments[1];
        callback = arguments[2];
        customArgs = arguments[3];
    }
    else {
        modelSchema = getDefaultModelSchema(modelSchema);
    }
    invariant(isModelSchema(modelSchema), "update failed to determine schema");
    invariant(typeof target === "object" && target && !Array.isArray(target), "update needs an object");
    var context = new Context(undefined, modelSchema, json, callback || GUARDED_NOOP, customArgs);
    context.setTarget(target);
    var lock = context.createCallback(GUARDED_NOOP);
    var result = deserializePropsWithSchema(context, modelSchema, json, target);
    lock();
    return result;
}
//# sourceMappingURL=update.js.map