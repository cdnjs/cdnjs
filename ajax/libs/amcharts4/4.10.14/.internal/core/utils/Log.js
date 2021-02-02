import { __read, __spread } from "tslib";
import { options } from "../Options";
/**
 * Outputs string to console if `verbose` is `true`.
 */
export function log() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    if (options.verbose) {
        if (console) {
            console.log.apply(console, __spread(messages));
        }
    }
}
/**
 * Outputs a warning to the console.
 */
export function warn() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    if (!options.suppressWarnings) {
        if (console) {
            console.warn.apply(console, __spread(messages));
        }
    }
}
//# sourceMappingURL=Log.js.map