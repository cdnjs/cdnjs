/*
 * Deserialization
 */
import { invariant, isPrimitive, isModelSchema, parallel, GUARDED_NOOP } from "../utils/utils";
import getDefaultModelSchema from "../api/getDefaultModelSchema";
import { SKIP, _defaultPrimitiveProp } from "../constants";
import Context from "./Context";
function schemaHasAlias(schema, name) {
    for (var key in schema.props) {
        var propSchema = schema.props[key];
        if (typeof propSchema === "object" && propSchema.jsonname === name)
            return true;
    }
    return false;
}
function deserializeStarProps(context, schema, propDef, obj, json) {
    var _loop_1 = function (key) {
        if (!(key in schema.props) && !schemaHasAlias(schema, key)) {
            var jsonValue = json[key];
            if (propDef === true) {
                // when deserializing we don't want to silently ignore 'unparseable data' to avoid
                // confusing bugs
                invariant(isPrimitive(jsonValue), "encountered non primitive value while deserializing '*' properties in property '" +
                    key +
                    "': " +
                    jsonValue);
                obj[key] = jsonValue;
            }
            else if (propDef && (!propDef.pattern || propDef.pattern.test(key))) {
                propDef.deserializer(jsonValue, 
                // for individual props, use root context based callbacks
                // this allows props to complete after completing the object itself
                // enabling reference resolving and such
                context.rootContext.createCallback(function (r) { return r !== SKIP && (obj[key] = r); }), context);
            }
        }
    };
    for (var key in json) {
        _loop_1(key);
    }
}
export default function deserialize(clazzOrModelSchema, json, callback, customArgs) {
    if (callback === void 0) { callback = GUARDED_NOOP; }
    invariant(arguments.length >= 2, "deserialize expects at least 2 arguments");
    var schema = getDefaultModelSchema(clazzOrModelSchema);
    invariant(isModelSchema(schema), "first argument should be model schema");
    if (Array.isArray(json)) {
        var items_1 = [];
        parallel(json, function (childJson, itemDone) {
            var instance = deserializeObjectWithSchema(undefined, schema, childJson, itemDone, customArgs);
            // instance is created synchronously so can be pushed
            items_1.push(instance);
        }, callback);
        return items_1;
    }
    else {
        return deserializeObjectWithSchema(undefined, schema, json, callback, customArgs);
    }
}
export function deserializeObjectWithSchema(parentContext, modelSchema, json, callback, customArgs) {
    if (json === null || json === undefined || typeof json !== "object")
        return void callback(null, null);
    var context = new Context(parentContext, modelSchema, json, callback, customArgs);
    var target = modelSchema.factory(context);
    // todo async invariant
    invariant(!!target, "No object returned from factory");
    // TODO: make invariant?            invariant(schema.extends ||
    // !target.constructor.prototype.constructor.serializeInfo, "object has a serializable
    // supertype, but modelschema did not provide extends clause")
    context.setTarget(target);
    var lock = context.createCallback(GUARDED_NOOP);
    deserializePropsWithSchema(context, modelSchema, json, target);
    lock();
    return target;
}
export function deserializePropsWithSchema(context, modelSchema, json, target) {
    var _a;
    if (modelSchema.extends)
        deserializePropsWithSchema(context, modelSchema.extends, json, target);
    function deserializeProp(propDef, jsonValue, propName) {
        var whenDone = context.rootContext.createCallback(function (r) { return r !== SKIP && (target[propName] = r); });
        propDef.deserializer(jsonValue, 
        // for individual props, use root context based callbacks
        // this allows props to complete after completing the object itself
        // enabling reference resolving and such
        function (err, newValue) {
            return onAfterDeserialize(whenDone, err, newValue, jsonValue, json, propName, context, propDef);
        }, context, target[propName] // initial value
        );
    }
    var _loop_2 = function (key) {
        var propDef = modelSchema.props[key];
        if (!propDef)
            return { value: void 0 };
        if (key === "*") {
            deserializeStarProps(context, modelSchema, propDef, target, json);
            return { value: void 0 };
        }
        if (propDef === true)
            propDef = _defaultPrimitiveProp;
        var jsonAttr = (_a = propDef.jsonname) !== null && _a !== void 0 ? _a : key;
        invariant("symbol" !== typeof jsonAttr, "You must alias symbol properties. prop = %l", key);
        var jsonValue = json[jsonAttr];
        var propSchema = propDef;
        var callbackDeserialize = function (err, jsonValue) {
            if (!err && jsonValue !== undefined) {
                deserializeProp(propSchema, jsonValue, key);
            }
        };
        onBeforeDeserialize(callbackDeserialize, jsonValue, json, jsonAttr, context, propDef);
    };
    for (var _i = 0, _b = Object.keys(modelSchema.props); _i < _b.length; _i++) {
        var key = _b[_i];
        var state_1 = _loop_2(key);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
export var onBeforeDeserialize = function (callback, jsonValue, jsonParentValue, propNameOrIndex, context, propDef) {
    if (propDef && typeof propDef.beforeDeserialize === "function") {
        propDef.beforeDeserialize(callback, jsonValue, jsonParentValue, propNameOrIndex, context, propDef);
    }
    else {
        callback(null, jsonValue);
    }
};
export var onAfterDeserialize = function (callback, err, newValue, jsonValue, jsonParentValue, propNameOrIndex, context, propDef) {
    if (propDef && typeof propDef.afterDeserialize === "function") {
        propDef.afterDeserialize(callback, err, newValue, jsonValue, jsonParentValue, propNameOrIndex, context, propDef);
    }
    else {
        callback(err, newValue);
    }
};
//# sourceMappingURL=deserialize.js.map