"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messageformatFormatters = _interopRequireDefault(require("messageformat-formatters"));

var _compiler = _interopRequireDefault(require("./compiler"));

var _utils = require("./utils");

var _plurals = require("./plurals");

var _runtime = _interopRequireDefault(require("./runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessageFormat {
  /**
   * The default locale
   *
   * Used by the constructor when no `locale` has been set to initialise the value
   * of its instance counterpart, `MessageFormat#defaultLocale`.
   *
   * @memberof MessageFormat
   * @default 'en'
   */

  /** Escape special characaters
   *
   *  Surround the characters `{` and `}` in the input string with 'quotes'.
   *  This will allow those characters to not be considered as MessageFormat
   *  control characters.
   *
   * @memberof MessageFormat
   * @param {string} str - The input string
   * @param {boolean} [octothorpe=false] - Include `#` in the escaped characters
   * @returns {string} The escaped string
   */
  static escape(str, octothorpe) {
    const esc = octothorpe ? /[#{}]/g : /[{}]/g;
    return String(str).replace(esc, "'$&'");
  }

  /**
   * Create a new MessageFormat compiler
   *
   * If set, the `locale` parameter limits the compiler to use a subset of the 204
   * languages' pluralisation rules made available by the Unicode CLDR.
   *
   * Leaving `locale` undefined or using an array of strings will create a
   * MessageFormat instance with multi-language support. To select which to use,
   * use the second parameter of `{@link MessageFormat#compile compile()}`, or use
   * message keys corresponding to your locales. The default locale will be the
   * first entry of the array, or `{@link MessageFormat.defaultLocale defaultLocale}`
   * if not set.
   *
   * A string `locale` will create a single-locale MessageFormat instance.
   *
   * Using an object `locale` with all properties of type `function` allows for
   * the use of custom or externally defined pluralisation rules; in this case
   *
   * @class MessageFormat
   * @classdesc MessageFormat-to-JavaScript compiler
   * @param {string|string[]|Object} [locale] - The locale(s) to use
   * @param {Object} [options] - Compiler options
   * @param {boolean} [options.biDiSupport=false] - Add Unicode control
   *   characters to all input parts to preserve the integrity of the output
   *   when mixing LTR and RTL text
   * @param {Object} [options.customFormatters] - Map of custom formatting
   *   functions to include. See the {@tutorial guide} for more details.
   * @param {boolean} [options.pluralKeyChecks=true] - Validate plural and
   *   selectordinal case keys according to the current locale
   * @param {boolean} [options.strictNumberSign=false] - Allow `#` only directly
   *   within a plural or selectordinal case, rather than in any inner select
   *   case as well.
   *
   * ```
   * import MessageFormat from 'messageformat'
   * ```
   */
  constructor(locale, options) {
    this.options = Object.assign({
      biDiSupport: false,
      customFormatters: null,
      pluralKeyChecks: true,
      strictNumberSign: false
    }, options);
    this.pluralFuncs = {};

    if (typeof locale === 'string') {
      this.pluralFuncs[locale] = (0, _plurals.getPlural)(locale, this.options);
      this.defaultLocale = locale;
    } else if (Array.isArray(locale)) {
      locale.forEach(lc => {
        this.pluralFuncs[lc] = (0, _plurals.getPlural)(lc, this.options);
      });
      this.defaultLocale = locale[0];
    } else {
      if (locale) {
        const lcKeys = Object.keys(locale);

        for (let i = 0; i < lcKeys.length; ++i) {
          const lc = lcKeys[i];

          if (typeof locale[lc] !== 'function') {
            const errMsg = 'Expected function value for locale ' + String(lc);
            throw new Error(errMsg);
          }

          this.pluralFuncs[lc] = locale[lc];
          if (!this.defaultLocale) this.defaultLocale = lc;
        }
      }

      if (this.defaultLocale) {
        this.hasCustomPluralFuncs = true;
      } else {
        this.defaultLocale = MessageFormat.defaultLocale;
        this.hasCustomPluralFuncs = false;
      }
    }

    this.fmt = Object.assign({}, this.options.customFormatters);
    this.runtime = new _runtime.default(this);
  }
  /**
   * Add custom formatter functions to this MessageFormat instance. See the
   * {@tutorial guide} for more details.
   *
   * The general syntax for calling a formatting function in MessageFormat is
   * `{var, fn[, arg]}`, where `var` is the variable that will be set by the
   * user code, `fn` determines the formatting function, and `arg` is an
   * optional string argument.
   *
   * In JavaScript, each formatting function is called with three parameters;
   * the variable value `v`, the current locale `lc`, and `arg` as a string, or
   * undefined if not set. `arg` will be trimmed of surrounding whitespace.
   * Formatting functions should not have side effects.
   *
   * @memberof MessageFormat
   * @instance
   * @param {Object.<string,function>} fmt - A map of formatting functions
   * @returns {MessageFormat} The MessageFormat instance, to allow for chaining
   *
   * @example
   * const mf = new MessageFormat('en-GB')
   * mf.addFormatters({
   *   upcase: function(v) { return v.toUpperCase() },
   *   locale: function(v, lc) { return lc },
   *   prop: function(v, lc, p) { return v[p] }
   * })
   * const messages = mf.compile({
   *   describe: 'This is {VAR, upcase}.',
   *   locale: 'The current locale is {_, locale}.',
   *   answer: 'Answer: {obj, prop, a}'
   * }
   *
   * messages.describe({ VAR: 'big' })        // 'This is BIG.'
   * messages.locale({})                      // 'The current locale is en-GB.'
   * messages.answer({ obj: {q: 3, a: 42} })  // 'Answer: 42'
   */


  addFormatters(fmt) {
    const fmtKeys = Object.keys(fmt);

    for (let i = 0; i < fmtKeys.length; ++i) {
      const name = fmtKeys[i];
      this.fmt[name] = fmt[name];
    }

    return this;
  }
  /**
   * Disable the validation of plural & selectordinal keys
   *
   * Previous versions of messageformat allowed the use of plural &
   * selectordinal statements with any keys; now we throw an error when a
   * statement uses a non-numerical key that will never be matched as a
   * pluralization category for the current locale.
   *
   * Use this method to disable the validation and allow usage as previously.
   * To re-enable, you'll need to create a new MessageFormat instance.
   *
   * @memberof MessageFormat
   * @instance
   * @returns {MessageFormat} The MessageFormat instance, to allow for chaining
   *
   * @example
   * const mf = new MessageFormat('en')
   * const msg = '{X, plural, zero{no answers} one{an answer} other{# answers}}'
   *
   * mf.compile(msg)
   * // Error: Invalid key `zero` for argument `X`. Valid plural keys for this
   * //        locale are `one`, `other`, and explicit keys like `=0`.
   *
   * mf.disablePluralKeyChecks()
   * mf.compile(msg)({ X: 0 })  // '0 answers'
   */


  disablePluralKeyChecks() {
    this.options.pluralKeyChecks = false;

    for (const lc in this.pluralFuncs) {
      const pf = this.pluralFuncs[lc];

      if (pf) {
        pf.cardinal = [];
        pf.ordinal = [];
      }
    }

    return this;
  }
  /**
   * Enable or disable the addition of Unicode control characters to all input
   * to preserve the integrity of the output when mixing LTR and RTL text.
   *
   * @see http://cldr.unicode.org/development/development-process/design-proposals/bidi-handling-of-structured-text
   *
   * @memberof MessageFormat
   * @instance
   * @param {boolean} [enable=true]
   * @returns {MessageFormat} The MessageFormat instance, to allow for chaining
   *
   * @example
   * // upper case stands for RTL characters, output is shown as rendered
   * const mf = new MessageFormat('en')
   *
   * mf.compile('{0} >> {1} >> {2}')(['first', 'SECOND', 'THIRD'])
   *   // 'first >> THIRD << SECOND'
   *
   * mf.setBiDiSupport(true)
   * mf.compile('{0} >> {1} >> {2}')(['first', 'SECOND', 'THIRD'])
   *   // 'first >> SECOND >> THIRD'
   */


  setBiDiSupport(enable) {
    this.options.biDiSupport = !!enable || typeof enable == 'undefined';
    return this;
  }
  /**
   * According to the ICU MessageFormat spec, a `#` character directly inside a
   * `plural` or `selectordinal` statement should be replaced by the number
   * matching the surrounding statement. By default, messageformat will replace
   * `#` signs with the value of the nearest surrounding `plural` or
   * `selectordinal` statement.
   *
   * Set this to true to follow the stricter ICU MessageFormat spec, and to
   * throw a runtime error if `#` is used with non-numeric input.
   *
   * @memberof MessageFormat
   * @instance
   * @param {boolean} [enable=true]
   * @returns {MessageFormat} The MessageFormat instance, to allow for chaining
   *
   * @example
   * const mf = new MessageFormat('en')
   * const src = {
   *   cookie: '#: {X, plural, =0{no cookies} one{a cookie} other{# cookies}}',
   *   pastry: `{X, plural,
   *     one {{P, select, cookie{a cookie} other{a pie}}}
   *     other {{P, select, cookie{# cookies} other{# pies}}}
   *   }`
   * }
   * let messages = mf.compile(src)
   *
   * messages.cookie({ X: 3 })            // '#: 3 cookies'
   * messages.pastry({ X: 3, P: 'pie' })  // '3 pies'
   *
   * mf.setStrictNumberSign(true)
   * messages = mf.compile(src)
   * messages.pastry({ X: 3, P: 'pie' })  // '# pies'
   */


  setStrictNumberSign(enable) {
    this.options.strictNumberSign = !!enable || typeof enable == 'undefined';
    this.runtime.setStrictNumber(this.options.strictNumberSign);
    return this;
  }
  /**
   * Compile messages into storable functions
   *
   * If `messages` is a single string including ICU MessageFormat declarations,
   * the result of `compile()` is a function taking a single Object parameter
   * `d` representing each of the input's defined variables.
   *
   * If `messages` is a hierarchical structure of such strings, the output of
   * `compile()` will match that structure, with each string replaced by its
   * corresponding JavaScript function.
   *
   * If the input `messages` -- and therefore the output -- of `compile()` is an
   * object, the output object will have a `toString(global)` method that may be
   * used to store or cache the compiled functions to disk, for later inclusion
   * in any JS environment, without a local MessageFormat instance required. If
   * its `global` parameter is null or undefined, the result is an ES6 module
   * with a default export. If `global` is a string containing `.`, the result
   * will be a script setting its value. Otherwise, the output defaults to an UMD
   * pattern that sets the value of `global` if used outside of AMD and CommonJS
   * loaders.
   *
   * If `locale` is not set, it will default to
   * `{@link MessageFormat.defaultLocale defaultLocale}`; using a key at any
   * depth of `messages` that is a declared locale will set its child elements to
   * use that locale.
   *
   * If `locale` is set, it is used for all messages, ignoring any otherwise
   * matching locale keys. If the constructor declared any locales, `locale`
   * needs to be one of them.
   *
   * If `compile()` is called with a `messages` object on a MessageFormat
   * instance that does not specify any locales, it will match keys to *all* 204
   * available locales. This is really useful if you want your messages to be
   * completely determined by your data, but may provide surprising results if
   * your input includes any 2-3 letter strings that are not locale identifiers.
   *
   * @memberof MessageFormat
   * @instance
   * @param {string|Object} messages - The input message(s) to be compiled, in ICU MessageFormat
   * @param {string} [locale] - A locale to use for the messages
   * @returns {function|Object} The first match found for the given locale(s)
   *
   * @example
   * const mf = new MessageFormat('en')
   * const msg = mf.compile('A {TYPE} example.')
   *
   * msg({ TYPE: 'simple' })  // 'A simple example.'
   *
   * @example
   * const mf = new MessageFormat(['en', 'fi'])
   * const messages = mf.compile({
   *   en: { a: 'A {TYPE} example.',
   *         b: 'This is the {COUNT, selectordinal, one{#st} two{#nd} few{#rd} other{#th}} example.' },
   *   fi: { a: '{TYPE} esimerkki.',
   *         b: 'Tämä on {COUNT, selectordinal, other{#.}} esimerkki.' }
   * })
   *
   * messages.en.b({ COUNT: 2 })  // 'This is the 2nd example.'
   * messages.fi.b({ COUNT: 2 })  // 'Tämä on 2. esimerkki.'
   *
   * @example
   * const fs = require('fs')
   * const mf = new MessageFormat('en')
   * const msgSet = {
   *   a: 'A {TYPE} example.',
   *   b: 'This has {COUNT, plural, one{one member} other{# members}}.',
   *   c: 'We have {P, number, percent} code coverage.'
   * }
   * const msgStr = mf.compile(msgSet).toString('module.exports')
   * fs.writeFileSync('messages.js', msgStr)
   *
   * ...
   *
   * const messages = require('./messages')
   *
   * messages.a({ TYPE: 'more complex' })  // 'A more complex example.'
   * messages.b({ COUNT: 3 })              // 'This has 3 members.'
   */


  compile(messages, locale) {
    function _stringify(obj, level) {
      if (!level) level = 0;
      if (typeof obj != 'object') return obj;
      let indent = '';

      for (let i = 0; i < level; ++i) indent += '  ';

      const o = [];

      for (const k in obj) {
        const v = _stringify(obj[k], level + 1);

        o.push(`\n${indent}  ${(0, _utils.propname)(k)}: ${v}`);
      }

      return `{${o.join(',')}\n${indent}}`;
    }

    let pf = {};

    if (Object.keys(this.pluralFuncs).length === 0) {
      if (locale) {
        const pfn0 = (0, _plurals.getPlural)(locale, this.options);

        if (!pfn0) {
          const lcs = JSON.stringify(locale);
          throw new Error(`Locale ${lcs} not found!`);
        }

        pf[locale] = pfn0;
      } else {
        locale = this.defaultLocale;
        pf = (0, _plurals.getAllPlurals)(this.options);
      }
    } else if (locale) {
      const pfn1 = this.pluralFuncs[locale];

      if (!pfn1) {
        const lcs = JSON.stringify(locale);
        const pfs = JSON.stringify(this.pluralFuncs);
        throw new Error(`Locale ${lcs} not found in ${pfs}!`);
      }

      pf[locale] = pfn1;
    } else {
      locale = this.defaultLocale;
      pf = this.pluralFuncs;
    }

    const compiler = new _compiler.default(this);
    const obj = compiler.compile(messages, locale, pf);

    if (typeof messages != 'object') {
      const fn = new Function('number, plural, select, fmt', (0, _utils.funcname)(locale), 'return ' + obj);
      const rt = this.runtime;
      return fn(rt.number, rt.plural, rt.select, this.fmt, pf[locale]);
    }

    const rtStr = this.runtime.toString(pf, compiler) + '\n';

    const objStr = _stringify(obj);

    const result = new Function(rtStr + 'return ' + objStr)(); // eslint-disable-next-line no-prototype-builtins

    if (result.hasOwnProperty('toString')) throw new Error('The top-level message key `toString` is reserved');

    result.toString = function (global) {
      if (!global || global === 'export default') {
        return rtStr + 'export default ' + objStr;
      } else if (global.indexOf('.') > -1) {
        return rtStr + global + ' = ' + objStr;
      } else {
        return rtStr + ['(function (root, G) {', '  if (typeof define === "function" && define.amd) { define(G); }', '  else if (typeof exports === "object") { module.exports = G; }', '  else { ' + (0, _utils.propname)(global, 'root') + ' = G; }', '})(this, ' + objStr + ');'].join('\n');
      }
    };

    return result;
  }

}

exports.default = MessageFormat;
MessageFormat.defaultLocale = 'en';
MessageFormat.formatters = _messageformatFormatters.default;