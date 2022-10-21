"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MessageFormat_localeMatcher, _MessageFormat_locales, _MessageFormat_message, _MessageFormat_runtime;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormat = void 0;
const message_value_1 = require("./message-value");
const message_1 = require("./parser/message");
const pattern_1 = require("./pattern");
const runtime_1 = require("./runtime");
/**
 * Create a new message formatter.
 *
 * @beta
 */
class MessageFormat {
    constructor(source, locales, options) {
        _MessageFormat_localeMatcher.set(this, void 0);
        _MessageFormat_locales.set(this, void 0);
        _MessageFormat_message.set(this, void 0);
        _MessageFormat_runtime.set(this, void 0);
        __classPrivateFieldSet(this, _MessageFormat_localeMatcher, options?.localeMatcher ?? 'best fit', "f");
        __classPrivateFieldSet(this, _MessageFormat_locales, Array.isArray(locales)
            ? locales.slice()
            : locales
                ? [locales]
                : [], "f");
        __classPrivateFieldSet(this, _MessageFormat_message, typeof source === 'string' ? (0, message_1.parseMessage)(source) : source, "f");
        const rt = options?.runtime ?? runtime_1.defaultRuntime;
        __classPrivateFieldSet(this, _MessageFormat_runtime, Object.freeze({ ...rt }), "f");
    }
    resolveMessage(msgParams, onError) {
        if (onError && __classPrivateFieldGet(this, _MessageFormat_message, "f").errors)
            for (const pErr of __classPrivateFieldGet(this, _MessageFormat_message, "f").errors) {
                const error = new Error(`Parse error: ${pErr.type} at ${pErr.start}`);
                onError(Object.assign(error, pErr), undefined);
            }
        const ctx = this.createContext(msgParams, onError);
        return new message_value_1.ResolvedMessage(ctx, __classPrivateFieldGet(this, _MessageFormat_message, "f"));
    }
    resolvedOptions() {
        return {
            localeMatcher: __classPrivateFieldGet(this, _MessageFormat_localeMatcher, "f"),
            locales: __classPrivateFieldGet(this, _MessageFormat_locales, "f").slice(),
            message: __classPrivateFieldGet(this, _MessageFormat_message, "f"),
            runtime: __classPrivateFieldGet(this, _MessageFormat_runtime, "f")
        };
    }
    createContext(scope = {}, onError = () => {
        // Ignore errors by default
    }) {
        const { declarations } = __classPrivateFieldGet(this, _MessageFormat_message, "f");
        const ctx = {
            onError,
            resolve: elem => (0, pattern_1.resolvePatternElement)(ctx, elem),
            declarations,
            localeMatcher: __classPrivateFieldGet(this, _MessageFormat_localeMatcher, "f"),
            locales: __classPrivateFieldGet(this, _MessageFormat_locales, "f"),
            runtime: __classPrivateFieldGet(this, _MessageFormat_runtime, "f"),
            // If declarations exist, scope may be modified during formatting
            scope: declarations.length > 0 ? { ...scope } : scope
        };
        return ctx;
    }
}
exports.MessageFormat = MessageFormat;
_MessageFormat_localeMatcher = new WeakMap(), _MessageFormat_locales = new WeakMap(), _MessageFormat_message = new WeakMap(), _MessageFormat_runtime = new WeakMap();
