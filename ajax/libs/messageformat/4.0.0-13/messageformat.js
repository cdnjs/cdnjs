import { parseMessage } from "./data-model/parse.js";
import { validate } from "./data-model/validate.js";
import { FSI, LRI, PDI, RLI, getLocaleDir } from "./dir-utils.js";
import { MessageFunctionError } from "./errors.js";
import { DefaultFunctions } from "./functions/index.js";
import { BIDI_ISOLATE } from "./message-value.js";
import { formatMarkup } from "./resolve/format-markup.js";
import { resolveExpression } from "./resolve/resolve-expression.js";
import { UnresolvedExpression } from "./resolve/resolve-variable.js";
import { selectPattern } from "./select-pattern.js";
/**
 * A message formatter for that implements the
 * {@link https://www.unicode.org/reports/tr35/tr35-75/tr35-messageFormat.html#contents-of-part-9-messageformat | LDML 47 MessageFormat}
 * specification as well as the {@link https://github.com/tc39/proposal-intl-messageformat/ | TC39 Intl.MessageFormat proposal}.
 *
 * @category Formatting
 * @typeParam T - The `type` used by custom message functions, if any.
 *   These extend the {@link DefaultFunctions | default functions}.
 * @typeParam P - The formatted-parts `type` used by any custom message values.
 */
export class MessageFormat {
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
        this.#dir = options?.dir ?? getLocaleDir(this.#locales[0]);
        this.#message = typeof source === 'string' ? parseMessage(source) : source;
        validate(this.#message);
        this.#functions = options?.functions
            ? Object.assign(Object.create(null), DefaultFunctions, options.functions)
            : DefaultFunctions;
    }
    /**
     * Format a message to a string.
     *
     * ```js
     * import { MessageFormat } from 'messageformat';
     * import { DraftFunctions } from 'messageformat/functions';
     *
     * const msg = 'Hello {$user.name}, today is {$date :date style=long}';
     * const mf = new MessageFormat('en', msg, { functions: DraftFunctions });
     * mf.format({ user: { name: 'Kat' }, date: new Date('2025-03-01') });
     * ```
     *
     * ```js
     * 'Hello Kat, today is March 1, 2025'
     * ```
     *
     * @param msgParams - Values that may be referenced by `$`-prefixed variable references.
     *   To refer to an inner property of an object value,
     *   use `.` as a separator; in case of conflict, the longest starting substring wins.
     * @param onError - Called in case of error.
     *   If not set, errors are by default logged as warnings.
     */
    format(msgParams, onError) {
        const ctx = this.#createContext(msgParams, onError);
        let res = '';
        for (const elem of selectPattern(ctx, this.#message)) {
            if (typeof elem === 'string') {
                res += elem;
            }
            else if (elem.type === 'markup') {
                // Handle errors, but discard results
                formatMarkup(ctx, elem);
            }
            else {
                let mv;
                try {
                    mv = resolveExpression(ctx, elem);
                    if (typeof mv.toString === 'function') {
                        if (this.#bidiIsolation &&
                            (this.#dir !== 'ltr' || mv.dir !== 'ltr' || mv[BIDI_ISOLATE])) {
                            const pre = mv.dir === 'ltr' ? LRI : mv.dir === 'rtl' ? RLI : FSI;
                            res += pre + mv.toString() + PDI;
                        }
                        else {
                            res += mv.toString();
                        }
                    }
                    else {
                        const error = new MessageFunctionError('not-formattable', 'Message part is not formattable');
                        error.source = mv.source;
                        throw error;
                    }
                }
                catch (error) {
                    ctx.onError(error);
                    const errStr = `{${mv?.source ?? '�'}}`;
                    res += this.#bidiIsolation ? FSI + errStr + PDI : errStr;
                }
            }
        }
        return res;
    }
    /**
     * Format a message to a sequence of parts.
     *
     * ```js
     * import { MessageFormat } from 'messageformat';
     * import { DraftFunctions } from 'messageformat/functions';
     *
     * const msg = 'Hello {$user.name}, today is {$date :date style=long}';
     * const mf = new MessageFormat('en', msg, { functions: DraftFunctions });
     * mf.formatToParts({ user: { name: 'Kat' }, date: new Date('2025-03-01') });
     * ```
     *
     * ```js
     * [
     *   { type: 'text', value: 'Hello ' },
     *   { type: 'bidiIsolation', value: '\u2068' },
     *   { type: 'string', locale: 'en', value: 'Kat' },
     *   { type: 'bidiIsolation', value: '\u2069' },
     *   { type: 'text', value: ', today is ' },
     *   {
     *     type: 'datetime',
     *     dir: 'ltr',
     *     locale: 'en',
     *     parts: [
     *       { type: 'month', value: 'March' },
     *       { type: 'literal', value: ' ' },
     *       { type: 'day', value: '1' },
     *       { type: 'literal', value: ', ' },
     *       { type: 'year', value: '2025' }
     *     ]
     *   }
     * ]
     * ```
     *
     * @param msgParams - Values that may be referenced by `$`-prefixed variable references.
     *   To refer to an inner property of an object value,
     *   use `.` as a separator; in case of conflict, the longest starting substring wins.
     * @param onError - Called in case of error.
     *   If not set, errors are by default logged as warnings.
     */
    formatToParts(msgParams, onError) {
        const ctx = this.#createContext(msgParams, onError);
        const parts = [];
        for (const elem of selectPattern(ctx, this.#message)) {
            if (typeof elem === 'string') {
                parts.push({ type: 'text', value: elem });
            }
            else if (elem.type === 'markup') {
                parts.push(formatMarkup(ctx, elem));
            }
            else {
                let mv;
                try {
                    mv = resolveExpression(ctx, elem);
                    if (typeof mv.toParts === 'function') {
                        // Let's presume that parts that look like MessageNumberPart or MessageStringPart are such.
                        const mp = mv.toParts();
                        if (this.#bidiIsolation &&
                            (this.#dir !== 'ltr' || mv.dir !== 'ltr' || mv[BIDI_ISOLATE])) {
                            const pre = mv.dir === 'ltr' ? LRI : mv.dir === 'rtl' ? RLI : FSI;
                            parts.push({ type: 'bidiIsolation', value: pre }, ...mp, {
                                type: 'bidiIsolation',
                                value: PDI
                            });
                        }
                        else {
                            parts.push(...mp);
                        }
                    }
                    else {
                        const error = new MessageFunctionError('not-formattable', 'Message part is not formattable');
                        error.source = mv.source;
                        throw error;
                    }
                }
                catch (error) {
                    ctx.onError(error);
                    const fb = {
                        type: 'fallback',
                        source: mv?.source ?? '�'
                    };
                    if (this.#bidiIsolation) {
                        parts.push({ type: 'bidiIsolation', value: FSI }, fb, {
                            type: 'bidiIsolation',
                            value: PDI
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
    #createContext(msgParams, onError = (error) => {
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
            scope[decl.name] = new UnresolvedExpression(decl.value, decl.type === 'input' ? (msgParams ?? {}) : undefined);
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
