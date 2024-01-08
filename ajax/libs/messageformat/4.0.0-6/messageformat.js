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
const parse_cst_js_1 = require("./cst/parse-cst.js");
const from_cst_js_1 = require("./data-model/from-cst.js");
const format_markup_js_1 = require("./data-model/format-markup.js");
const resolve_expression_js_1 = require("./data-model/resolve-expression.js");
const resolve_variable_js_1 = require("./data-model/resolve-variable.js");
const validate_js_1 = require("./data-model/validate.js");
const errors_js_1 = require("./errors.js");
const index_js_1 = require("./functions/index.js");
const select_pattern_js_1 = require("./select-pattern.js");
const defaultFunctions = Object.freeze({
    datetime: index_js_1.datetime,
    integer: index_js_1.integer,
    number: index_js_1.number,
    ordinal: index_js_1.ordinal,
    plural: index_js_1.plural,
    string: index_js_1.string
});
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
        __classPrivateFieldSet(this, _MessageFormat_message, typeof source === 'string' ? (0, from_cst_js_1.messageFromCST)((0, parse_cst_js_1.parseCST)(source)) : source, "f");
        (0, validate_js_1.validate)(__classPrivateFieldGet(this, _MessageFormat_message, "f"), (type, node) => {
            throw new errors_js_1.MessageDataModelError(type, node);
        });
        __classPrivateFieldSet(this, _MessageFormat_functions, options?.functions
            ? { ...defaultFunctions, ...options.functions }
            : defaultFunctions, "f");
    }
    format(msgParams, onError) {
        const ctx = this.createContext(msgParams, onError);
        let res = '';
        for (const elem of (0, select_pattern_js_1.selectPattern)(ctx, __classPrivateFieldGet(this, _MessageFormat_message, "f"))) {
            if (typeof elem === 'string') {
                res += elem;
            }
            else if (elem.type !== 'markup') {
                let mv;
                try {
                    mv = (0, resolve_expression_js_1.resolveExpression)(ctx, elem);
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
            if (typeof elem === 'string') {
                parts.push({ type: 'literal', value: elem });
            }
            else if (elem.type === 'markup') {
                parts.push((0, format_markup_js_1.formatMarkup)(ctx, elem));
            }
            else {
                let mv;
                try {
                    mv = (0, resolve_expression_js_1.resolveExpression)(ctx, elem);
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
        const scope = { ...msgParams };
        for (const decl of __classPrivateFieldGet(this, _MessageFormat_message, "f").declarations) {
            switch (decl.type) {
                case 'input':
                    scope[decl.name] = new resolve_variable_js_1.UnresolvedExpression(decl.value, msgParams);
                    break;
                case 'local':
                    scope[decl.name] = new resolve_variable_js_1.UnresolvedExpression(decl.value);
                    break;
                default: {
                    const source = decl.keyword ?? '�';
                    const msg = `Reserved ${source} annotation is not supported`;
                    onError(new errors_js_1.MessageResolutionError('unsupported-statement', msg, source));
                }
            }
        }
        const ctx = {
            onError,
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
