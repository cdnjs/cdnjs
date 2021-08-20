var DebugError = /** @class */ (function () {
    function DebugError(f) {
        var oldValue = Error.stackTraceLimit;
        Error.stackTraceLimit = 100;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, f);
        }
        Error.stackTraceLimit = oldValue;
    }
    return DebugError;
}());
var enabled = true;
export function enable() {
    enabled = true;
}
export function disable() {
    enabled = false;
}
export function debug(value) {
    // TODO better detection for classes which shouldn't be debugged
    if (enabled && value.className !== "InterfaceColorSet") {
        var x_1 = new DebugError(debug);
        setTimeout(function () {
            if (!value.isDisposed()) {
                console.log(value, x_1.stack);
            }
        }, 10000);
    }
}
//# sourceMappingURL=Debug.js.map