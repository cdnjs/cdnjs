var formatters = {
    j: function json(v) {
        try {
            return JSON.stringify(v);
        }
        catch (error) {
            return "[UnexpectedJSONParseError]: " + error.message;
        }
    },
    l: function symbol(s) {
        return s.toString();
    },
};
export default function invariant(condition, message) {
    var variables = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        variables[_i - 2] = arguments[_i];
    }
    if (!condition) {
        var variablesToLog_1 = [];
        var index_1 = 0;
        var formattedMessage = message.replace(/%([a-zA-Z%])/g, function (match, format) {
            if (match === "%%")
                return match;
            var formatter = formatters[format];
            if (typeof formatter === "function") {
                var variable = variables[index_1++];
                variablesToLog_1.push(variable);
                return formatter(variable);
            }
            return match;
        });
        if (console && variablesToLog_1.length > 0) {
            // eslint-disable-next-line no-console
            console.log.apply(console, variablesToLog_1);
        }
        throw new Error("[serializr] " + (formattedMessage || "Illegal State"));
    }
}
//# sourceMappingURL=invariant.js.map