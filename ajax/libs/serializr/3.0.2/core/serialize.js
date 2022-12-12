import { invariant, isPrimitive } from "../utils/utils";
import getDefaultModelSchema from "../api/getDefaultModelSchema";
import { SKIP, _defaultPrimitiveProp } from "../constants";
export default function serialize(modelSchemaOrInstance, arg2) {
    invariant(arguments.length === 1 || arguments.length === 2, "serialize expects one or 2 arguments");
    var instance = (arg2 !== null && arg2 !== void 0 ? arg2 : modelSchemaOrInstance);
    var schema = (arg2 && modelSchemaOrInstance);
    if (Array.isArray(instance)) {
        if (instance.length === 0)
            return [];
        // don't bother finding a schema
        else if (!schema)
            schema = getDefaultModelSchema(instance[0]);
        else if (typeof schema !== "object")
            schema = getDefaultModelSchema(schema);
    }
    else if (!schema) {
        schema = getDefaultModelSchema(instance);
    }
    else if (typeof schema !== "object") {
        schema = getDefaultModelSchema(schema);
    }
    var foundSchema = schema;
    if (!foundSchema) {
        // only call modelSchemaOrInstance.toString() on error
        invariant(foundSchema, "Failed to find default schema for " + modelSchemaOrInstance);
    }
    if (Array.isArray(instance))
        return instance.map(function (item) { return serializeWithSchema(foundSchema, item); });
    return serializeWithSchema(foundSchema, instance);
}
function serializeWithSchema(schema, obj) {
    invariant(schema && typeof schema === "object" && schema.props, "Expected schema");
    invariant(obj && typeof obj === "object", "Expected object");
    var res;
    if (schema.extends)
        res = serializeWithSchema(schema.extends, obj);
    else {
        // TODO: make invariant?:  invariant(!obj.constructor.prototype.constructor.serializeInfo, "object has a serializable supertype, but modelschema did not provide extends clause")
        res = {};
    }
    Object.keys(schema.props).forEach(function (key) {
        var propDef = schema.props[key];
        if (!propDef)
            return;
        if (key === "*") {
            serializeStarProps(schema, propDef, obj, res);
            return;
        }
        if (propDef === true)
            propDef = _defaultPrimitiveProp;
        var jsonValue = propDef.serializer(obj[key], key, obj);
        if (jsonValue === SKIP) {
            return;
        }
        res[propDef.jsonname || key] = jsonValue;
    });
    return res;
}
function serializeStarProps(schema, propDef, obj, target) {
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!(key in schema.props)) {
            if (propDef === true || (propDef && (!propDef.pattern || propDef.pattern.test(key)))) {
                var value = obj[key];
                if (propDef === true) {
                    if (isPrimitive(value)) {
                        target[key] = value;
                    }
                }
                else {
                    var jsonValue = propDef.serializer(value, key, obj);
                    if (jsonValue === SKIP) {
                        return;
                    }
                    // TODO: propDef.jsonname could be a transform function on
                    // key
                    target[key] = jsonValue;
                }
            }
        }
    }
}
//# sourceMappingURL=serialize.js.map