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
var _MessageFormat_localeMatcher, _MessageFormat_locales, _MessageFormat_message, _MessageFormat_functions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormat = void 0;
const index_js_1 = require("./cst-parser/index.js");
const select_pattern_js_1 = require("./select-pattern.js");
const pattern_1 = require("./pattern");
const value_js_1 = require("./pattern/value.js");
const runtime_1 = require("./runtime");
const errors_js_1 = require("./errors.js");
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
        _MessageFormat_functions.set(this, void 0);
        __classPrivateFieldSet(this, _MessageFormat_localeMatcher, options?.localeMatcher ?? 'best fit', "f");
        __classPrivateFieldSet(this, _MessageFormat_locales, Array.isArray(locales)
            ? locales.slice()
            : locales
                ? [locales]
                : [], "f");
        __classPrivateFieldSet(this, _MessageFormat_message, typeof source === 'string' ? (0, index_js_1.asDataModel)((0, index_js_1.parseMessage)(source)) : source, "f");
        __classPrivateFieldSet(this, _MessageFormat_functions, options?.functions
            ? { ...runtime_1.defaultFunctions, ...options.functions }
            : runtime_1.defaultFunctions, "f");
    }
    format(msgParams, onError) {
        const ctx = this.createContext(msgParams, onError);
        let res = '';
        for (const elem of (0, select_pattern_js_1.selectPattern)(ctx, __classPrivateFieldGet(this, _MessageFormat_message, "f"))) {
            if (elem.type === 'text') {
                res += elem.value;
            }
            else {
                let mv;
                try {
                    mv = ctx.resolveExpression(elem);
                    if (typeof mv.toString === 'function') {
                        res += mv.toString();
                    }
                    else {
                        const msg = 'Message part is not formattable';
                        throw new errors_js_1.MessageError('not-formattable', msg);
                    }
                }
                catch (error) {
                    ctx.onError(error);
                    res += `{${mv?.source ?? '�'}}`;
                }
            }
        }
        return res;
    }
    formatToParts(msgParams, onError) {
        const ctx = this.createContext(msgParams, onError);
        const parts = [];
        for (const elem of (0, select_pattern_js_1.selectPattern)(ctx, __classPrivateFieldGet(this, _MessageFormat_message, "f"))) {
            if (elem.type === 'text') {
                parts.push({ type: 'literal', value: elem.value });
            }
            else {
                let mv;
                try {
                    mv = ctx.resolveExpression(elem);
                    if (typeof mv.toParts === 'function') {
                        parts.push(...mv.toParts());
                    }
                    else {
                        const msg = 'Message part is not formattable';
                        throw new errors_js_1.MessageError('not-formattable', msg);
                    }
                }
                catch (error) {
                    ctx.onError(error);
                    parts.push({ type: 'fallback', source: mv?.source ?? '�' });
                }
            }
        }
        return parts;
    }
    resolvedOptions() {
        return {
            functions: Object.freeze(__classPrivateFieldGet(this, _MessageFormat_functions, "f")),
            localeMatcher: __classPrivateFieldGet(this, _MessageFormat_localeMatcher, "f"),
            locales: __classPrivateFieldGet(this, _MessageFormat_locales, "f").slice(),
            message: Object.freeze(__classPrivateFieldGet(this, _MessageFormat_message, "f"))
        };
    }
    createContext(msgParams, onError = (error) => {
        // Emit warning for errors by default
        try {
            process.emitWarning(error);
        }
        catch {
            console.warn(error);
        }
    }) {
        let scope = { ...msgParams };
        for (const { name, value } of __classPrivateFieldGet(this, _MessageFormat_message, "f").declarations) {
            const ue = new pattern_1.UnresolvedExpression(value, scope);
            if (name in scope)
                scope = { ...scope, [name]: ue };
            else
                scope[name] = ue;
        }
        const ctx = {
            onError,
            resolveExpression(elem) {
                return (0, pattern_1.resolveExpression)(this, elem);
            },
            resolveValue(value) {
                return (0, value_js_1.resolveValue)(this, value);
            },
            localeMatcher: __classPrivateFieldGet(this, _MessageFormat_localeMatcher, "f"),
            locales: __classPrivateFieldGet(this, _MessageFormat_locales, "f"),
            localVars: new WeakSet(),
            functions: __classPrivateFieldGet(this, _MessageFormat_functions, "f"),
            scope
        };
        return ctx;
    }
}
exports.MessageFormat = MessageFormat;
_MessageFormat_localeMatcher = new WeakMap(), _MessageFormat_locales = new WeakMap(), _MessageFormat_message = new WeakMap(), _MessageFormat_functions = new WeakMap();
