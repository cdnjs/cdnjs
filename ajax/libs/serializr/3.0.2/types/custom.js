import { invariant, processAdditionalPropArgs } from "../utils/utils";
export default function custom(serializer, deserializer, additionalArgs) {
    invariant(typeof serializer === "function", "first argument should be function");
    invariant(typeof deserializer === "function", "second argument should be a function or promise");
    var result = {
        serializer: serializer,
        deserializer: function (jsonValue, done, context, oldValue) {
            var result = deserializer(jsonValue, context, oldValue, done);
            // FIXME: checking for result === undefined instead of Function.length
            // would be nicer, but strictly speaking a breaking change.
            if (deserializer.length !== 4) {
                done(null, result);
            }
        },
    };
    result = processAdditionalPropArgs(result, additionalArgs);
    return result;
}
//# sourceMappingURL=custom.js.map