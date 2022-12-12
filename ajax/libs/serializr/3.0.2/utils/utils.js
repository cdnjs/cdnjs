import invariant from "./invariant";
export function GUARDED_NOOP(err) {
    if (err)
        // unguarded error...
        throw new Error(err);
}
export function once(fn) {
    var fired = false;
    return function () {
        if (!fired) {
            fired = true;
            return fn.apply(null, arguments);
        }
        invariant(false, "callback was invoked twice");
    };
}
export function parallel(ar, processor, cb) {
    // TODO: limit parallelization?
    if (ar.length === 0)
        return void cb(null, []);
    var left = ar.filter(function (x) { return true; }).length; // only count items processed by forEach
    var resultArray = [];
    var failed = false;
    ar.forEach(function (value, idx) {
        processor(value, function (err, result) {
            if (err) {
                if (!failed) {
                    failed = true;
                    cb(err);
                }
            }
            else {
                resultArray[idx] = result;
                if (--left === 0)
                    cb(null, resultArray);
            }
        }, idx);
    });
}
export function isPrimitive(value) {
    if (value === null)
        return true;
    return typeof value !== "object" && typeof value !== "function";
}
export function isModelSchema(thing) {
    return thing && thing.factory && thing.props;
}
export function isPropSchema(thing) {
    return thing && thing.serializer && thing.deserializer;
}
export function isAliasedPropSchema(propSchema) {
    return typeof propSchema === "object" && "string" == typeof propSchema.jsonname;
}
export function isIdentifierPropSchema(propSchema) {
    return typeof propSchema === "object" && propSchema.identifier === true;
}
export function isAssignableTo(actualType, expectedType) {
    var currentActualType = actualType;
    while (currentActualType) {
        if (currentActualType === expectedType)
            return true;
        currentActualType = currentActualType.extends;
    }
    return false;
}
export function isMapLike(thing) {
    return thing && typeof thing.keys === "function" && typeof thing.clear === "function";
}
export function getIdentifierProp(modelSchema) {
    invariant(isModelSchema(modelSchema), "modelSchema must be a ModelSchema");
    // optimization: cache this lookup
    var currentModelSchema = modelSchema;
    while (currentModelSchema) {
        for (var propName in currentModelSchema.props)
            if (isIdentifierPropSchema(currentModelSchema.props[propName]))
                return propName;
        currentModelSchema = currentModelSchema.extends;
    }
    return undefined;
}
export function processAdditionalPropArgs(propSchema, additionalArgs) {
    if (additionalArgs) {
        invariant(isPropSchema(propSchema), "expected a propSchema");
        Object.assign(propSchema, additionalArgs);
    }
    return propSchema;
}
export { invariant };
//# sourceMappingURL=utils.js.map