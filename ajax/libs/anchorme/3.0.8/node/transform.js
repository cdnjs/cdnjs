"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
function applyOption(string, props, option) {
    // conditional
    if (typeof option === "function") {
        return option(string, props);
    }
    // all
    else {
        return option;
    }
}
function transform(input, options) {
    var protocol = "";
    var truncation = Infinity;
    var attributes = {};
    var truncateFromTheMiddle = false;
    // special transformation
    if (options && options.specialTransform) {
        for (var index = 0; index < options.specialTransform.length; index++) {
            var transformer = options.specialTransform[index];
            if (transformer.test.test(input.string)) {
                return transformer.transform(input.string, input);
            }
        }
    }
    // exclude
    if (options && options.exclude) {
        if (applyOption(input.string, input, options.exclude))
            return input.string;
    }
    // protocol
    if (options && options.protocol) {
        protocol = applyOption(input.string, input, options.protocol);
    }
    if (input.protocol) {
        protocol = "";
    }
    else if (!protocol) {
        protocol = input.isEmail
            ? "mailto:"
            : input.isFile
                ? "file:///"
                : "http://";
    }
    // truncation
    if (options && options.truncate) {
        truncation = applyOption(input.string, input, options.truncate);
    }
    if (options && options.middleTruncation) {
        truncateFromTheMiddle = applyOption(input.string, input, options.middleTruncation);
    }
    // attributes
    if (options && options.attributes) {
        attributes = applyOption(input.string, input, options.attributes);
    }
    return "<a ".concat(Object.keys(attributes)
        .map(function (key) {
        return attributes[key] === true ? key : "".concat(key, "=\"").concat(attributes[key], "\" ");
    })
        .join(" "), "href=\"").concat(protocol).concat(input.string, "\">").concat(input.string.length > truncation
        ? truncateFromTheMiddle
            ? input.string.substring(0, Math.floor(truncation / 2)) +
                "…" +
                input.string.substring(input.string.length - Math.ceil(truncation / 2), input.string.length)
            : input.string.substring(0, truncation) + "…"
        : input.string, "</a>");
}
exports.transform = transform;
