import { invariant, isModelSchema, getIdentifierProp, processAdditionalPropArgs, } from "../utils/utils";
import getDefaultModelSchema from "../api/getDefaultModelSchema";
function createDefaultRefLookup(modelSchema) {
    return function resolve(uuid, cb, context) {
        context.rootContext.await(modelSchema, uuid, cb);
    };
}
export default function reference(target, lookupFnOrAdditionalPropArgs, additionalArgs) {
    invariant(!!target, "No modelSchema provided. If you are importing it from another file be aware of circular dependencies.");
    var lookupFn = "function" === typeof lookupFnOrAdditionalPropArgs
        ? lookupFnOrAdditionalPropArgs
        : undefined;
    additionalArgs =
        additionalArgs ||
            (lookupFn ? undefined : lookupFnOrAdditionalPropArgs);
    var initialized = false;
    var childIdentifierAttribute;
    function initialize() {
        initialized = true;
        invariant(typeof target !== "string" || typeof lookupFn === "function", "if the reference target is specified by attribute name, a lookup function is required");
        invariant(!lookupFn || typeof lookupFn === "function", "second argument should be a lookup function or additional arguments object");
        if (typeof target === "string") {
            childIdentifierAttribute = target;
        }
        else {
            var modelSchema = getDefaultModelSchema(target);
            invariant(isModelSchema(modelSchema), "expected model schema or string as first argument for 'ref', got " + modelSchema);
            lookupFn = lookupFn || createDefaultRefLookup(modelSchema);
            childIdentifierAttribute = getIdentifierProp(modelSchema);
            invariant(!!childIdentifierAttribute, "provided model schema doesn't define an identifier() property and cannot be used by 'ref'.");
        }
    }
    var result = {
        serializer: function (item) {
            if (!initialized)
                initialize();
            return item ? item[childIdentifierAttribute] : null;
        },
        deserializer: function (identifierValue, done, context) {
            if (!initialized)
                initialize();
            if (identifierValue === null || identifierValue === undefined)
                done(null, identifierValue);
            else
                lookupFn(identifierValue, done, context);
        },
    };
    result = processAdditionalPropArgs(result, additionalArgs);
    return result;
}
//# sourceMappingURL=reference.js.map