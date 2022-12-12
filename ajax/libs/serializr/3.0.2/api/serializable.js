var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { invariant, isPropSchema, isAliasedPropSchema } from "../utils/utils";
import { _defaultPrimitiveProp } from "../constants";
import primitive from "../types/primitive";
import getDefaultModelSchema from "../api/getDefaultModelSchema";
import createModelSchema from "../api/createModelSchema";
// Ugly way to get the parameter names since they aren't easily retrievable via reflection
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
    var _a;
    var fnStr = func.toString().replace(STRIP_COMMENTS, "");
    return (_a = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES)) !== null && _a !== void 0 ? _a : [];
}
function serializableDecorator(propSchema, target, propName, descriptor) {
    invariant(arguments.length >= 2, "too few arguments. Please use @serializable as property decorator");
    // Fix for @serializable used in class constructor params (typescript)
    var factory;
    if (propName === undefined &&
        typeof target === "function" &&
        target.prototype &&
        descriptor !== undefined &&
        typeof descriptor === "number") {
        invariant(isPropSchema(propSchema), "Constructor params must use alias(name)");
        invariant(isAliasedPropSchema(propSchema), "Constructor params must use alias(name)");
        var paramNames = getParamNames(target);
        if (paramNames.length >= descriptor) {
            propName = paramNames[descriptor];
            propSchema.paramNumber = descriptor;
            descriptor = undefined;
            target = target.prototype;
            // Create a factory so the constructor is called properly
            factory = function (context) {
                var _a;
                var params = [];
                var _loop_1 = function (i) {
                    Object.keys(context.modelSchema.props).forEach(function (key) {
                        var prop = context.modelSchema.props[key];
                        if (prop.paramNumber === i) {
                            params[i] = context.json[prop.jsonname];
                        }
                    });
                };
                for (var i = 0; i < target.constructor.length; i++) {
                    _loop_1(i);
                }
                return (_a = target.constructor).bind.apply(_a, __spreadArrays([undefined], params));
            };
        }
    }
    invariant(typeof propName === "string", "incorrect usage of @serializable decorator");
    var info = getDefaultModelSchema(target);
    if (!info || !target.constructor.hasOwnProperty("serializeInfo"))
        info = createModelSchema(target.constructor, {}, factory);
    if (info && info.targetClass !== target.constructor)
        // fixes typescript issue that tends to copy fields from super constructor to sub constructor in extends
        info = createModelSchema(target.constructor, {}, factory);
    info.props[propName] = propSchema;
    // MWE: why won't babel work without?
    if (descriptor && !descriptor.get && !descriptor.set)
        descriptor.writable = true;
    return descriptor;
}
export default function serializable(targetOrPropSchema, key, baseDescriptor) {
    if (!key) {
        // decorated with propSchema
        var propSchema = targetOrPropSchema === true ? _defaultPrimitiveProp : targetOrPropSchema;
        invariant(isPropSchema(propSchema), "@serializable expects prop schema");
        var result = serializableDecorator.bind(null, propSchema);
        return result;
    }
    else {
        // decorated without arguments, treat as primitive
        serializableDecorator(primitive(), targetOrPropSchema, key, baseDescriptor);
    }
}
//# sourceMappingURL=serializable.js.map