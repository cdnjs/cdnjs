"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormat = void 0;
const parse_js_1 = require("./data-model/parse.js");
const validate_js_1 = require("./data-model/validate.js");
const dir_utils_js_1 = require("./dir-utils.js");
const errors_js_1 = require("./errors.js");
const index_js_1 = require("./functions/index.js");
const message_value_js_1 = require("./message-value.js");
const format_markup_js_1 = require("./resolve/format-markup.js");
const resolve_expression_js_1 = require("./resolve/resolve-expression.js");
const resolve_variable_js_1 = require("./resolve/resolve-variable.js");
const select_pattern_js_1 = require("./select-pattern.js");
const defaultFunctions = Object.freeze({
    currency: index_js_1.currency,
    date: index_js_1.date,
    datetime: index_js_1.datetime,
    integer: index_js_1.integer,
    math: index_js_1.math,
    number: index_js_1.number,
    string: index_js_1.string,
    time: index_js_1.time
});
/**
 * Create a new message formatter.
 *
 * @beta
 */
class MessageFormat {
    #bidiIsolation;
    #dir;
    #localeMatcher;
    #locales;
    #message;
    #functions;
    constructor(locales, source, options) {
        this.#bidiIsolation = options?.bidiIsolation !== 'none';
        this.#localeMatcher = options?.localeMatcher ?? 'best fit';
        this.#locales = Array.isArray(locales)
            ? locales.map(lc => new Intl.Locale(lc))
            : locales
                ? [new Intl.Locale(locales)]
                : [];
        this.#dir = options?.dir ?? (0, dir_utils_js_1.getLocaleDir)(this.#locales[0]);
        this.#message = typeof source === 'string' ? (0, parse_js_1.parseMessage)(source) : source;
        (0, validate_js_1.validate)(this.#message, (type, node) => {
            throw new errors_js_1.MessageDataModelError(type, node);
        });
        this.#functions = options?.functions
            ? { ...defaultFunctions, ...options.functions }
            : defaultFunctions;
    }
    format(msgParams, onError) {
        const ctx = this.createContext(msgParams, onError);
        let res = '';
        for (const elem of (0, select_pattern_js_1.selectPattern)(ctx, this.#message)) {
            if (typeof elem === 'string') {
                res += elem;
            }
            else if (elem.type === 'markup') {
                // Handle errors, but discard results
                (0, format_markup_js_1.formatMarkup)(ctx, elem);
            }
            else {
                let mv;
                try {
                    mv = (0, resolve_expression_js_1.resolveExpression)(ctx, elem);
                    if (typeof mv.toString === 'function') {
                        if (this.#bidiIsolation &&
                            (this.#dir !== 'ltr' || mv.dir !== 'ltr' || mv[message_value_js_1.BIDI_ISOLATE])) {
                            const pre = mv.dir === 'ltr' ? dir_utils_js_1.LRI : mv.dir === 'rtl' ? dir_utils_js_1.RLI : dir_utils_js_1.FSI;
                            res += pre + mv.toString() + dir_utils_js_1.PDI;
                        }
                        else {
                            res += mv.toString();
                        }
                    }
                    else {
                        const msg = 'Message part is not formattable';
                        throw new errors_js_1.MessageError('not-formattable', msg);
                    }
                }
                catch (error) {
                    ctx.onError(error);
                    const errStr = `{${mv?.source ?? '�'}}`;
                    res += this.#bidiIsolation ? dir_utils_js_1.FSI + errStr + dir_utils_js_1.PDI : errStr;
                }
            }
        }
        return res;
    }
    formatToParts(msgParams, onError) {
        const ctx = this.createContext(msgParams, onError);
        const parts = [];
        for (const elem of (0, select_pattern_js_1.selectPattern)(ctx, this.#message)) {
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
                        const mp = mv.toParts();
                        if (this.#bidiIsolation &&
                            (this.#dir !== 'ltr' || mv.dir !== 'ltr' || mv[message_value_js_1.BIDI_ISOLATE])) {
                            const pre = mv.dir === 'ltr' ? dir_utils_js_1.LRI : mv.dir === 'rtl' ? dir_utils_js_1.RLI : dir_utils_js_1.FSI;
                            parts.push({ type: 'bidiIsolation', value: pre }, ...mp, {
                                type: 'bidiIsolation',
                                value: dir_utils_js_1.PDI
                            });
                        }
                        else {
                            parts.push(...mp);
                        }
                    }
                    else {
                        const msg = 'Message part is not formattable';
                        throw new errors_js_1.MessageError('not-formattable', msg);
                    }
                }
                catch (error) {
                    ctx.onError(error);
                    const fb = { type: 'fallback', source: mv?.source ?? '�' };
                    if (this.#bidiIsolation) {
                        parts.push({ type: 'bidiIsolation', value: dir_utils_js_1.FSI }, fb, {
                            type: 'bidiIsolation',
                            value: dir_utils_js_1.PDI
                        });
                    }
                    else {
                        parts.push(fb);
                    }
                }
            }
        }
        return parts;
    }
    resolvedOptions() {
        return {
            bidiIsolation: this.#bidiIsolation,
            dir: this.#dir,
            functions: Object.freeze(this.#functions),
            localeMatcher: this.#localeMatcher
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
        for (const decl of this.#message.declarations) {
            scope[decl.name] = new resolve_variable_js_1.UnresolvedExpression(decl.value, decl.type === 'input' ? (msgParams ?? {}) : undefined);
        }
        const ctx = {
            onError,
            localeMatcher: this.#localeMatcher,
            locales: this.#locales,
            localVars: new WeakSet(),
            functions: this.#functions,
            scope
        };
        return ctx;
    }
}
exports.MessageFormat = MessageFormat;
