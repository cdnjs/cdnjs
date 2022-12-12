import { invariant, processAdditionalPropArgs } from "../utils/utils";
import { _defaultPrimitiveProp } from "../constants";
var defaultRegisterFunction = function (id, value, context) {
    context.rootContext.resolve(context.modelSchema, id, context.target);
};
export default function identifier(arg1, arg2) {
    var registerFn;
    var additionalArgs;
    if (typeof arg1 === "function") {
        registerFn = arg1;
        additionalArgs = arg2;
    }
    else {
        additionalArgs = arg1;
    }
    invariant(!additionalArgs || typeof additionalArgs === "object", "Additional property arguments should be an object, register function should be omitted or a funtion");
    var result = {
        identifier: true,
        serializer: _defaultPrimitiveProp.serializer,
        deserializer: function (jsonValue, done, context) {
            _defaultPrimitiveProp.deserializer(jsonValue, function (err, id) {
                defaultRegisterFunction(id, context.target, context);
                if (registerFn)
                    registerFn(id, context.target, context);
                done(err, id);
            }, context);
        },
    };
    result = processAdditionalPropArgs(result, additionalArgs);
    return result;
}
//# sourceMappingURL=identifier.js.map