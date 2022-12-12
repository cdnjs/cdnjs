import { invariant, isPropSchema } from "../utils/utils";
import createModelSchema from "../api/createModelSchema";
import getDefaultModelSchema from "../api/getDefaultModelSchema";
import setDefaultModelSchema from "../api/setDefaultModelSchema";
import object from "../types/object";
import { _defaultPrimitiveProp } from "../constants";
export default function serializeAll(targetOrPattern, propertyType) {
    var propSchema;
    if (arguments.length === 1) {
        propSchema = true;
        return decorator(targetOrPattern);
    }
    else {
        invariant(typeof targetOrPattern === "object" && targetOrPattern.test, "@serializeAll pattern doesn't have test");
        if (typeof propertyType === "function") {
            propertyType = object(propertyType);
        }
        if (true === propertyType) {
            propertyType = _defaultPrimitiveProp;
        }
        invariant(isPropSchema(propertyType), "couldn't resolve schema");
        propSchema = Object.assign({}, propertyType, {
            pattern: targetOrPattern,
        });
    }
    function decorator(target) {
        invariant(typeof target === "function", "@serializeAll can only be used as class decorator");
        var info = getDefaultModelSchema(target);
        if (!info) {
            info = createModelSchema(target, {});
            setDefaultModelSchema(target, info);
        }
        info.props["*"] = propSchema;
        return target;
    }
    return decorator;
}
//# sourceMappingURL=serializeAll.js.map