"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compiler = _interopRequireDefault(require("./compiler"));

var _plurals = require("./plurals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MessageFormat {
  /**
   * Used by the constructor when no `locale` argument is given.
   *
   * @memberof MessageFormat
   * @default 'en'
   */

  /**
   * Escape special characaters by surrounding the characters `{` and `}` in the
   * input string with 'quotes'. This will allow those characters to not be
   * considered as MessageFormat control characters.
   *
   * @memberof MessageFormat
   * @param {string} str - The input string
   * @param {boolean} [octothorpe=false] - Also escape `#`
   * @returns {string} The escaped string
   */
  static escape(str, octothorpe) {
    const esc = octothorpe ? /[#{}]/g : /[{}]/g;
    return String(str).replace(esc, "'$&'");
  }
  /**
   * Returns a subset of `locales` consisting of those for which MessageFormat
   * has built-in plural category support.
   *
   * @memberof MessageFormat
   * @param {(string|string[])} locales
   * @returns {string[]}
   */


  static supportedLocalesOf(locales) {
    const la = Array.isArray(locales) ? locales : [locales];
    return la.filter(_plurals.hasPlural);
  }
  /**
   * @typedef {Object} MessageFormat~Options - The shape of the options object
   *   that may be used as the second argument of the constructor.
   * @property {('string'|'values')} [returnType='string'] - Return type of
   *   compiled functions; either a concatenated string or an array (possibly
   *   hierarchical) of values
   * @property {boolean} [biDiSupport=false] - Add Unicode control characters to
   *   all input parts to preserve the integrity of the output when mixing LTR
   *   and RTL text
   * @property {string} [currency='USD'] - The currency to use when formatting
   *   `{V, number, currency}`
   * @property {Object} [customFormatters] - Map of custom formatting functions
   *   to include. See the {@tutorial guide} for more details.
   * @property {boolean} [strictNumberSign=false] - Allow `#` only directly
   *   within a plural or selectordinal case, rather than in any inner select
   *   case as well.
   */

  /**
   * Create a new MessageFormat compiler
   *
   * ```
   * import MessageFormat from 'messageformat'
   * ```
   *
   * @class MessageFormat
   * @classdesc MessageFormat-to-JavaScript compiler
   * @param {string|Array} [locale]
   *   Define the locale or locales supported by this MessageFormat instance. If
   *   given multiple valid locales, the first will be the default. If `locale`
   *   is empty, it will fall back to `MessageFormat.defaultLocale`.
   *
   *   String `locale` values will be matched to plural categorisation functions
   *   provided by the Unicode CLDR. If defining your own instead, use named
   *   functions instead, optionally providing them with the properties:
   *   `cardinals: string[]`, `ordinals: string[]`, `module: string` (to import
   *   the formatter as a runtime dependency, rather than inlining its source).
   *
   *   If `locale` has the special value `'*'`, it will match *all* available
   *   locales. This may be useful if you want your messages to be completely
   *   determined by your data, but may provide surprising results if your input
   *   message object includes any 2-3 character keys that are not locale
   *   identifiers.
   * @param {MessageFormat~Options} [options] - Compiler options
   */


  constructor(locale, options) {
    this.options = Object.assign({
      biDiSupport: false,
      currency: 'USD',
      customFormatters: {},
      returnType: 'string',
      strictNumberSign: false
    }, options);

    if (locale === '*') {
      this.plurals = (0, _plurals.getAllPlurals)(MessageFormat.defaultLocale);
    } else if (Array.isArray(locale)) {
      this.plurals = locale.map(_plurals.getPlural).filter(Boolean);
    } else if (locale) {
      const pl = (0, _plurals.getPlural)(locale);
      if (pl) this.plurals = [pl];
    }

    if (!this.plurals || this.plurals.length === 0) {
      const pl = (0, _plurals.getPlural)(MessageFormat.defaultLocale);
      this.plurals = [pl];
    }
  }
  /**
   * @typedef {Object} MessageFormat~ResolvedOptions
   * @property {boolean} biDiSupport - Whether Unicode control characters be
   *   added to all input parts to preserve the integrity of the output when
   *   mixing LTR and RTL text
   * @property {object} customFormatters - Map of custom formatting functions
   * @property {string} locale - The default locale
   * @property {object[]} plurals - All of the supported plurals
   * @property {boolean} strictNumberSign - Is `#` only allowed directly within
   *   a plural or selectordinal case
   */

  /**
   * Returns a new object with properties reflecting the default locale,
   * plurals, and other options computed during initialization.
   *
   * @memberof MessageFormat
   * @instance
   * @returns {MessageFormat~ResolvedOptions}
   */


  resolvedOptions() {
    return _objectSpread({}, this.options, {
      locale: this.plurals[0].locale,
      plurals: this.plurals
    });
  }
  /**
   * Compile a message into a function
   *
   * Given a string `message` with ICU MessageFormat declarations, the result is
   * a function taking a single Object parameter representing each of the
   * input's defined variables, using the first valid locale.
   *
   * @memberof MessageFormat
   * @instance
   * @param {string} message - The input message to be compiled, in ICU MessageFormat
   * @returns {function} - The compiled function
   *
   * @example
   * const mf = new MessageFormat('en')
   * const msg = mf.compile('A {TYPE} example.')
   *
   * msg({ TYPE: 'simple' })  // 'A simple example.'
   */


  compile(message) {
    const compiler = new _compiler.default(this.options);
    const fnBody = 'return ' + compiler.compile(message, this.plurals[0]);
    const nfArgs = [];
    const fnArgs = [];

    for (const [key, fmt] of Object.entries(compiler.runtime)) {
      nfArgs.push(key);
      fnArgs.push(fmt);
    }

    const fn = new Function(...nfArgs, fnBody);
    return fn.apply(null, fnArgs);
  }

}

exports.default = MessageFormat;
MessageFormat.defaultLocale = 'en';