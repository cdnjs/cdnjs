"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormat = void 0;
const format_markup_js_1 = require("./data-model/format-markup.js");
const resolve_expression_js_1 = require("./data-model/resolve-expression.js");
const resolve_variable_js_1 = require("./data-model/resolve-variable.js");
const validate_js_1 = require("./data-model/validate.js");
const errors_js_1 = require("./errors.js");
const index_js_1 = require("./functions/index.js");
const parse_js_1 = require("./data-model/parse.js");
const select_pattern_js_1 = require("./select-pattern.js");
const defaultFunctions = Object.freeze({
    date: index_js_1.date,
    datetime: index_js_1.datetime,
    integer: index_js_1.integer,
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
    #localeMatcher;
    #locales;
    #message;
    #functions;
    constructor(locales, source, options) {
        this.#localeMatcher = options?.localeMatcher ?? 'best fit';
        this.#locales = Array.isArray(locales)
            ? locales.slice()
            : locales
                ? [locales]
                : [];
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
            scope[decl.name] = new resolve_variable_js_1.UnresolvedExpression(decl.value, decl.type === 'input' ? msgParams ?? {} : undefined);
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
