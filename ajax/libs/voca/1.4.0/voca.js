/*! 
 * Voca string library 1.4.0
 * https://vocajs.com
 *
 * Copyright Dmitri Pavlutin and other contributors
 * Released under the MIT license
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.v = factory());
}(this, (function () { 'use strict';

/**
 * Checks if `value` is `null` or `undefined`
 *
 * @ignore
 * @function isNil
 * @param {*} value The object to check
 * @return {boolean} Returns `true` is `value` is `undefined` or `null`, `false` otherwise
 */
function isNil(value) {
  return value === undefined || value === null;
}

/**
 * Converts the `value` to a boolean. If `value` is `undefined` or `null`, returns `defaultValue`.
 *
 * @ignore
 * @function toBoolean
 * @param {*} value The value to convert.
 * @param {boolean} [defaultValue=false] The default value.
 * @return {boolean} Returns the coercion to boolean.
 */
function coerceToBoolean(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isNil(value)) {
    return defaultValue;
  }
  return Boolean(value);
}

/**
 * Checks whether `subject` is a string primitive type.
 *
 * @function isString
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} subject The value to verify.
 * @return {boolean} Returns `true` if `subject` is string primitive type or `false` otherwise.
 * @example
 * v.isString('vacation');
 * // => true
 *
 * v.isString(560);
 * // => false
 */
function isString(subject) {
  return typeof subject === 'string';
}

/**
 * Get the string representation of the `value`.
 * Converts the `value` to string.
 * If `value` is `null` or `undefined`, return `defaultValue`.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @param {*} [defaultValue=''] The default value to return.
 * @return {string|null}        Returns the string representation of `value`. Returns `defaultValue` if `value` is
 *                              `null` or `undefined`.
 */
function coerceToString(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (isNil(value)) {
    return defaultValue;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}

/**
 * Converts the first character of `subject` to upper case. If `restToLower` is `true`, convert the rest of
 * `subject` to lower case.
 *
 * @function capitalize
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string}  [subject='']        The string to capitalize.
 * @param  {boolean} [restToLower=false] Convert the rest of `subject` to lower case.
 * @return {string}                      Returns the capitalized string.
 * @example
 * v.capitalize('apple');
 * // => 'Apple'
 *
 * v.capitalize('aPPle', true);
 * // => 'Apple'
 */
function capitalize(subject, restToLower) {
  var subjectString = coerceToString(subject);
  var restToLowerCaseBoolean = coerceToBoolean(restToLower);
  if (subjectString === '') {
    return '';
  }
  if (restToLowerCaseBoolean) {
    subjectString = subjectString.toLowerCase();
  }
  return subjectString.substr(0, 1).toUpperCase() + subjectString.substr(1);
}

/**
 * Converts the `subject` to lower case.
 *
 * @function lowerCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to lower case.
 * @return {string}              Returns the lower case string.
 * @example
 * v.lowerCase('Green');
 * // => 'green'
 *
 * v.lowerCase('BLUE');
 * // => 'blue'
 */
function lowerCase(subject) {
  var subjectString = coerceToString(subject, '');
  return subjectString.toLowerCase();
}

/**
 * A regular expression string matching digits
 *
 * @type {string}
 * @ignore
 */
var digit = '\\d';

/**
 * A regular expression string matching whitespace
 *
 * @type {string}
 * @ignore
 */
var whitespace = '\\s\\uFEFF\\xA0';

/**
 * A regular expression string matching high surrogate
 *
 * @type {string}
 * @ignore
 */
var highSurrogate = '\\uD800-\\uDBFF';

/**
 * A regular expression string matching low surrogate
 *
 * @type {string}
 * @ignore
 */
var lowSurrogate = '\\uDC00-\\uDFFF';

/**
 * A regular expression string matching diacritical mark
 *
 * @type {string}
 * @ignore
 */
var diacriticalMark = '\\u0300-\\u036F\\u1AB0-\\u1AFF\\u1DC0-\\u1DFF\\u20D0-\\u20FF\\uFE20-\\uFE2F';

/**
 * A regular expression to match the base character for a combining mark
 *
 * @type {string}
 * @ignore
 */
var base = '\\0-\\u02FF\\u0370-\\u1AAF\\u1B00-\\u1DBF\\u1E00-\\u20CF\\u2100-\\uD7FF\\uE000-\\uFE1F\\uFE30-\\uFFFF';

/**
 * Regular expression to match combining marks
 *
 * @see http://unicode.org/faq/char_combmark.html
 * @type {RegExp}
 * @ignore
 */
var REGEXP_COMBINING_MARKS = new RegExp('([' + base + ']|[' + highSurrogate + '][' + lowSurrogate + ']|[' + highSurrogate + '](?![' + lowSurrogate + '])|(?:[^' + highSurrogate + ']|^)[' + lowSurrogate + '])([' + diacriticalMark + ']+)', 'g');

/**
 * Regular expression to match surrogate pairs
 *
 * @see http://www.unicode.org/faq/utf_bom.html#utf16-2
 * @type {RegExp}
 * @ignore
 */
var REGEXP_SURROGATE_PAIRS = new RegExp('([' + highSurrogate + '])([' + lowSurrogate + '])', 'g');

/**
 * Regular expression to match a unicode character
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_UNICODE_CHARACTER = new RegExp('((?:[' + base + ']|[' + highSurrogate + '][' + lowSurrogate + ']|[' + highSurrogate + '](?![' + lowSurrogate + '])|(?:[^' + highSurrogate + ']|^)[' + lowSurrogate + '])(?:[' + diacriticalMark + ']+))|\
([' + highSurrogate + '][' + lowSurrogate + '])|\
([\\n\\r\\u2028\\u2029])|\
(.)', 'g');

/**
 * Regular expression to match whitespaces
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_WHITESPACE = new RegExp('[' + whitespace + ']');

/**
 * Regular expression to match whitespaces from the left side
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_TRIM_LEFT = new RegExp('^[' + whitespace + ']+');

/**
 * Regular expression to match whitespaces from the right side
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_TRIM_RIGHT = new RegExp('[' + whitespace + ']+$');

/**
 * Regular expression to match digit characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_DIGIT = new RegExp('^' + digit + '+$');

/**
 * Regular expression to match regular expression special characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_SPECIAL_CHARACTERS = /[-[\]{}()*+!<=:?./\\^$|#,]/g;

/**
 * Regular expression to match not latin characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_NON_LATIN = /[^A-Za-z0-9]/g;

/**
 * Regular expression to match HTML special characters.
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_HTML_SPECIAL_CHARACTERS = /[<>&"'`]/g;

/**
 * Regular expression to match sprintf format string
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_CONVERSION_SPECIFICATION = /(%{1,2})(?:(\d+)\$)?(\+)?([ 0]|'.{1})?(-)?(\d+)?(?:\.(\d+))?([bcdiouxXeEfgGs])?/g;

/**
 * Regular expression to match trailing zeros in a number
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_TRAILING_ZEROS = /\.?0+$/g;

/**
 * Regular expression to match flags from a regular expression.
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_FLAGS = /[gimuy]*$/;

/**
 * Regular expression to match a list of tags.
 *
 * @see https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-name
 * @type {RegExp}
 * @ignore
 */

var REGEXP_TAG_LIST = /<([A-Za-z0-9]+)>/g;

/**
 * A regular expression to match the General Punctuation Unicode block
 *
 * @type {string}
 * @ignore
 */
var generalPunctuationBlock = '\\u2000-\\u206F';

/**
 * A regular expression to match non characters from from Basic Latin and Latin-1 Supplement Unicode blocks
 *
 * @type {string}
 * @ignore
 */
var nonCharacter = '\\x00-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7b-\\xBF\\xD7\\xF7';

/**
 * A regular expression to match the dingbat Unicode block
 *
 * @type {string}
 * @ignore
 */
var dingbatBlock = '\\u2700-\\u27BF';

/**
 * A regular expression string that matches lower case letters: LATIN
 *
 * @type {string}
 * @ignore
 */
var lowerCaseLetter = 'a-z\\xB5\\xDF-\\xF6\\xF8-\\xFF\\u0101\\u0103\\u0105\\u0107\\u0109\\u010B\\u010D\\u010F\\u0111\\u0113\\u0115\\u0117\\u0119\\u011B\\u011D\\u011F\\u0121\\u0123\\u0125\\u0127\\u0129\\u012B\\u012D\\u012F\\u0131\\u0133\\u0135\\u0137\\u0138\\u013A\\u013C\\u013E\\u0140\\u0142\\u0144\\u0146\\u0148\\u0149\\u014B\\u014D\\u014F\\u0151\\u0153\\u0155\\u0157\\u0159\\u015B\\u015D\\u015F\\u0161\\u0163\\u0165\\u0167\\u0169\\u016B\\u016D\\u016F\\u0171\\u0173\\u0175\\u0177\\u017A\\u017C\\u017E-\\u0180\\u0183\\u0185\\u0188\\u018C\\u018D\\u0192\\u0195\\u0199-\\u019B\\u019E\\u01A1\\u01A3\\u01A5\\u01A8\\u01AA\\u01AB\\u01AD\\u01B0\\u01B4\\u01B6\\u01B9\\u01BA\\u01BD-\\u01BF\\u01C6\\u01C9\\u01CC\\u01CE\\u01D0\\u01D2\\u01D4\\u01D6\\u01D8\\u01DA\\u01DC\\u01DD\\u01DF\\u01E1\\u01E3\\u01E5\\u01E7\\u01E9\\u01EB\\u01ED\\u01EF\\u01F0\\u01F3\\u01F5\\u01F9\\u01FB\\u01FD\\u01FF\\u0201\\u0203\\u0205\\u0207\\u0209\\u020B\\u020D\\u020F\\u0211\\u0213\\u0215\\u0217\\u0219\\u021B\\u021D\\u021F\\u0221\\u0223\\u0225\\u0227\\u0229\\u022B\\u022D\\u022F\\u0231\\u0233-\\u0239\\u023C\\u023F\\u0240\\u0242\\u0247\\u0249\\u024B\\u024D\\u024F';

/**
 * A regular expression string that matches upper case letters: LATIN
 *
 * @type {string}
 * @ignore
 */
var upperCaseLetter = '\\x41-\\x5a\\xc0-\\xd6\\xd8-\\xde\\u0100\\u0102\\u0104\\u0106\\u0108\\u010a\\u010c\\u010e\\u0110\\u0112\\u0114\\u0116\\u0118\\u011a\\u011c\\u011e\\u0120\\u0122\\u0124\\u0126\\u0128\\u012a\\u012c\\u012e\\u0130\\u0132\\u0134\\u0136\\u0139\\u013b\\u013d\\u013f\\u0141\\u0143\\u0145\\u0147\\u014a\\u014c\\u014e\\u0150\\u0152\\u0154\\u0156\\u0158\\u015a\\u015c\\u015e\\u0160\\u0162\\u0164\\u0166\\u0168\\u016a\\u016c\\u016e\\u0170\\u0172\\u0174\\u0176\\u0178\\u0179\\u017b\\u017d\\u0181\\u0182\\u0184\\u0186\\u0187\\u0189-\\u018b\\u018e-\\u0191\\u0193\\u0194\\u0196-\\u0198\\u019c\\u019d\\u019f\\u01a0\\u01a2\\u01a4\\u01a6\\u01a7\\u01a9\\u01ac\\u01ae\\u01af\\u01b1-\\u01b3\\u01b5\\u01b7\\u01b8\\u01bc\\u01c4\\u01c5\\u01c7\\u01c8\\u01ca\\u01cb\\u01cd\\u01cf\\u01d1\\u01d3\\u01d5\\u01d7\\u01d9\\u01db\\u01de\\u01e0\\u01e2\\u01e4\\u01e6\\u01e8\\u01ea\\u01ec\\u01ee\\u01f1\\u01f2\\u01f4\\u01f6-\\u01f8\\u01fa\\u01fc\\u01fe\\u0200\\u0202\\u0204\\u0206\\u0208\\u020a\\u020c\\u020e\\u0210\\u0212\\u0214\\u0216\\u0218\\u021a\\u021c\\u021e\\u0220\\u0222\\u0224\\u0226\\u0228\\u022a\\u022c\\u022e\\u0230\\u0232\\u023a\\u023b\\u023d\\u023e\\u0241\\u0243-\\u0246\\u0248\\u024a\\u024c\\u024e';

/**
 * Regular expression to match Unicode words
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_WORD = new RegExp('(?:[' + upperCaseLetter + '][' + diacriticalMark + ']*)?(?:[' + lowerCaseLetter + '][' + diacriticalMark + ']*)+|\
(?:[' + upperCaseLetter + '][' + diacriticalMark + ']*)+(?![' + lowerCaseLetter + '])|\
[' + digit + ']+|\
[' + dingbatBlock + ']|\
[^' + nonCharacter + generalPunctuationBlock + whitespace + ']+', 'g');

/**
 * Regular expression to match words from Basic Latin and Latin-1 Supplement blocks
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_LATIN_WORD = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;

/**
 * Regular expression to match alpha characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA = new RegExp('^(?:[' + lowerCaseLetter + upperCaseLetter + '][' + diacriticalMark + ']*)+$');

/**
 * Regular expression to match alpha and digit characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA_DIGIT = new RegExp('^((?:[' + lowerCaseLetter + upperCaseLetter + '][' + diacriticalMark + ']*)|[' + digit + '])+$');

/**
 * Regular expression to match Extended ASCII characters, i.e. the first 255
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_EXTENDED_ASCII = /^[\x01-\xFF]*$/;

/**
 * Verifies if `value` is `undefined` or `null` and returns `defaultValue`. In other case returns `value`.
 *
 * @ignore
 * @function nilDefault
 * @param {*} value The value to verify.
 * @param {*} defaultValue The default value.
 * @return {*} Returns `defaultValue` if `value` is `undefined` or `null`, otherwise `defaultValue`.
 */
function nilDefault(value, defaultValue) {
  return value == null ? defaultValue : value;
}

/**
 * Get the string representation of the `value`.
 * Converts the `value` to string.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @return {string|null}        Returns the string representation of `value`.
 */
function toString(value) {
  if (isNil(value)) {
    return null;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}

/**
 * Splits `subject` into an array of words.
 *
 * @function words
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into words.
 * @param {string|RegExp} [pattern] The pattern to watch words. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
 * @return {Array} Returns the array of words.
 * @example
 * v.words('gravity can cross dimensions');
 * // => ['gravity', 'can', 'cross', 'dimensions']
 *
 * v.words('GravityCanCrossDimensions');
 * // => ['Gravity', 'Can', 'Cross', 'Dimensions']
 *
 * v.words('Gravity - can cross dimensions!');
 * // => ['Gravity', 'can', 'cross', 'dimensions']
 *
 * v.words('Earth gravity', /[^\s]+/g);
 * // => ['Earth', 'gravity']
 */
function words(subject, pattern, flags) {
  var subjectString = coerceToString(subject);
  var patternRegExp = void 0;
  if (isNil(pattern)) {
    patternRegExp = REGEXP_EXTENDED_ASCII.test(subjectString) ? REGEXP_LATIN_WORD : REGEXP_WORD;
  } else if (pattern instanceof RegExp) {
    patternRegExp = pattern;
  } else {
    var flagsString = toString(nilDefault(flags, ''));
    patternRegExp = new RegExp(toString(pattern), flagsString);
  }
  return nilDefault(subjectString.match(patternRegExp), []);
}

/**
 * Transforms the `word` into camel case chunk.
 *
 * @param  {string} word  The word string
 * @param  {number} index The index of the word in phrase.
 * @return {string}       The transformed word.
 * @ignore
 */
function wordToCamel(word, index) {
  return index === 0 ? lowerCase(word) : capitalize(word, true);
}

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/CamelCase">camel case</a>.
 *
 * @function camelCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to camel case.
 * @return {string}              The camel case string.
 * @example
 * v.camelCase('bird flight');
 * // => 'birdFlight'
 *
 * v.camelCase('BirdFlight');
 * // => 'birdFlight'
 *
 * v.camelCase('-BIRD-FLIGHT-');
 * // => 'birdFlight'
 */
function camelCase(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return words(subjectString).map(wordToCamel).join('');
}

/**
 * Converts the first character of `subject` to lower case.
 *
 * @function decapitalize
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to decapitalize.
 * @return {string}              Returns the decapitalized string.
 * @example
 * v.decapitalize('Sun');
 * // => 'sun'
 *
 * v.decapitalize('moon');
 * // => 'moon'
 */
function decapitalize(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return subjectString.substr(0, 1).toLowerCase() + subjectString.substr(1);
}

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/Letter_case#cite_ref-13">kebab case</a>,
 * also called <i>spinal case</i> or <i>lisp case</i>.
 *
 * @function kebabCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to kebab case.
 * @return {string}              Returns the kebab case string.
 * @example
 * v.kebabCase('goodbye blue sky');
 * // => 'goodbye-blue-sky'
 *
 * v.kebabCase('GoodbyeBlueSky');
 * // => 'goodbye-blue-sky'
 *
 * v.kebabCase('-Goodbye-Blue-Sky-');
 * // => 'goodbye-blue-sky'
 */
function kebabCase(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return words(subjectString).map(lowerCase).join('-');
}

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/Snake_case">snake case</a>.
 *
 * @function snakeCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to snake case.
 * @return {string}              Returns the snake case string.
 * @example
 * v.snakeCase('learning to fly');
 * // => 'learning_to_fly'
 *
 * v.snakeCase('LearningToFly');
 * // => 'learning_to_fly'
 *
 * v.snakeCase('-Learning-To-Fly-');
 * // => 'learning_to_fly'
 */
function snakeCase(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return words(subjectString).map(lowerCase).join('_');
}

/**
 * Converts the `subject` to upper case.
 *
 * @function upperCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to upper case.
 * @return {string}              Returns the upper case string.
 * @example
 * v.upperCase('school');
 * // => 'SCHOOL'
 */
function upperCase(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.toUpperCase();
}

/**
 * Converts the uppercase alpha caracters of `subject` to lowercase and lowercase 
 * characters to uppercase.
 *
 * @function swapCase
 * @static
 * @since 1.3.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to swap the case.
 * @return {string}              Returns the converted string.
 * @example
 * v.swapCase('League of Shadows');
 * // => 'lEAGUE OF sHADOWS'
 *
 * v.swapCase('2 Bees');
 * // => '2 bEES'
 */
function swapCase(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.split('').reduce(swapAndConcat, '');
}

function swapAndConcat(swapped, character) {
  var lowerCase = character.toLowerCase();
  var upperCase = character.toUpperCase();
  return swapped + (character === lowerCase ? upperCase : lowerCase);
}

/**
 * Converts the subject to title case.
 *
 * @function titleCase
 * @static
 * @since 1.4.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to title case.
 * @param  {Array}  [noSplit]    Do not split words at the specified characters.
 * @return {string}              Returns the title case string.
 * @example
 * v.titleCase('learning to fly');
 * // => 'Learning To Fly'
 *
 * v.titleCase('jean-luc is good-looking', ['-']);
 * // => 'Jean-luc Is Good-looking'
 */
function titleCase(subject, noSplit) {
  var subjectString = coerceToString(subject);
  var noSplitArray = Array.isArray(noSplit) ? noSplit : [];
  var wordsRegExp = REGEXP_EXTENDED_ASCII.test(subjectString) ? REGEXP_LATIN_WORD : REGEXP_WORD;
  return subjectString.replace(wordsRegExp, function (word, index) {
    var isNoSplit = index > 0 && noSplitArray.indexOf(subjectString[index - 1]) >= 0;
    return isNoSplit ? word.toLowerCase() : capitalize(word, true);
  });
}

/**
 * Clip the number to interval `downLimit` to `upLimit`.
 *
 * @ignore
 * @function clipNumber
 * @param {number} value The number to clip
 * @param {number} downLimit The down limit
 * @param {number} upLimit The upper limit
 * @return {number} The clipped number
 */
function clipNumber(value, downLimit, upLimit) {
  if (value <= downLimit) {
    return downLimit;
  }
  if (value >= upLimit) {
    return upLimit;
  }
  return value;
}

/**
 * Max save integer value
 *
 * @ignore
 * @type {number}
 */
var MAX_SAFE_INTEGER = 0x1fffffffffffff;

/**
 * Transforms `value` to an integer.
 *
 * @ignore
 * @function toInteger
 * @param {number} value The number to transform.
 * @returns {number} Returns the transformed integer.
 */
function toInteger(value) {
  if (value === Infinity) {
    return MAX_SAFE_INTEGER;
  }
  if (value === -Infinity) {
    return -MAX_SAFE_INTEGER;
  }
  return ~~value;
}

/**
 * Truncates `subject` to a new `length`.
 *
 * @function truncate
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to truncate.
 * @param  {int}    length       The length to truncate the string.
 * @param  {string} [end='...']  The string to be added at the end.
 * @return {string}              Returns the truncated string.
 * @example
 * v.truncate('Once upon a time', 7);
 * // => 'Once...'
 *
 * v.truncate('Good day, Little Red Riding Hood', 14, ' (...)');
 * // => 'Good day (...)'
 *
 * v.truncate('Once upon', 10);
 * // => 'Once upon'
 */
function truncate(subject, length, end) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var endString = coerceToString(end, '...');
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  return subjectString.substr(0, length - endString.length) + endString;
}

/**
 * Access a character from `subject` at specified `position`.
 *
 * @function charAt
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {numbers} position The position to get the character.
 * @return {string} Returns the character at specified position.
 * @example
 * v.charAt('helicopter', 0);
 * // => 'h'
 *
 * v.charAt('helicopter', 1);
 * // => 'e'
 */
function charAt(subject, position) {
  var subjectString = coerceToString(subject);
  return subjectString.charAt(position);
}

var HIGH_SURROGATE_START = 0xD800;
var HIGH_SURROGATE_END = 0xDBFF;
var LOW_SURROGATE_START = 0xDC00;
var LOW_SURROGATE_END = 0xDFFF;

/**
 * Checks if `codePoint` is a high-surrogate number from range 0xD800 to 0xDBFF.
 *
 * @ignore
 * @param {number} codePoint The code point number to be verified
 * @return {boolean} Returns a boolean whether `codePoint` is a high-surrogate number.
 */
function isHighSurrogate(codePoint) {
  return codePoint >= HIGH_SURROGATE_START && codePoint <= HIGH_SURROGATE_END;
}

/**
 * Checks if `codePoint` is a low-surrogate number from range 0xDC00 to 0xDFFF.
 *
 * @ignore
 * @param {number} codePoint The code point number to be verified
 * @return {boolean} Returns a boolean whether `codePoint` is a low-surrogate number.
 */
function isLowSurrogate(codePoint) {
  return codePoint >= LOW_SURROGATE_START && codePoint <= LOW_SURROGATE_END;
}

/**
 * Get the astral code point number based on surrogate pair numbers.
 *
 * @ignore
 * @param {number} highSurrogate The high-surrogate code point number.
 * @param {number} lowSurrogate The low-surrogate code point number.
 * @return {number} Returns the astral symbol number.
 */
function getAstralNumberFromSurrogatePair(highSurrogate, lowSurrogate) {
  return (highSurrogate - HIGH_SURROGATE_START) * 0x400 + lowSurrogate - LOW_SURROGATE_START + 0x10000;
}

/**
 * Get the number representation of the `value`.
 * Converts the `value` to number.
 * If `value` is `null` or `undefined`, return `defaultValue`.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @param {*} [defaultValue=''] The default value to return.
 * @return {number|null}        Returns the number representation of `value`. Returns `defaultValue` if `value` is
 *                              `null` or `undefined`.
 */
function coerceToNumber(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (isNil(value)) {
    return defaultValue;
  }
  if (typeof value === 'number') {
    return value;
  }
  return Number(value);
}

/**
 * If `value` is `NaN`, return `defaultValue`. In other case returns `value`.
 *
 * @ignore
 * @function nanDefault
 * @param {*} value The value to verify.
 * @param {*} defaultValue The default value.
 * @return {*} Returns `defaultValue` if `value` is `NaN`, otherwise `defaultValue`.
 */
function nanDefault(value, defaultValue) {
  return value !== value ? defaultValue : value;
}

/**
 * Get the Unicode code point value of the character at `position`. <br/>
 * If a valid UTF-16 <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">
 * surrogate pair</a> starts at `position`, the
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#astralplanes">astral code point</a>
 * value at `position` is returned.
 *
 * @function codePointAt
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {number} position The position to get the code point number.
 * @return {number} Returns a non-negative number less than or equal to `0x10FFFF`.
 * @example
 * v.codePointAt('rain', 1);
 * // => 97, or 0x0061
 *
 * v.codePointAt('\uD83D\uDE00 is smile', 0); // or '😀 is smile'
 * // => 128512, or 0x1F600
 */
function codePointAt(subject, position) {
  var subjectString = coerceToString(subject);
  var subjectStringLength = subjectString.length;
  var positionNumber = coerceToNumber(position);
  positionNumber = nanDefault(positionNumber, 0);
  if (positionNumber < 0 || positionNumber >= subjectStringLength) {
    return undefined;
  }
  var firstCodePoint = subjectString.charCodeAt(positionNumber);
  var secondCodePoint = void 0;
  if (isHighSurrogate(firstCodePoint) && subjectStringLength > positionNumber + 1) {
    secondCodePoint = subjectString.charCodeAt(positionNumber + 1);
    if (isLowSurrogate(secondCodePoint)) {
      return getAstralNumberFromSurrogatePair(firstCodePoint, secondCodePoint);
    }
  }
  return firstCodePoint;
}

/**
 * Extracts the first `length` characters from `subject`.
 *
 * @function first
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {int}    [length=1]   The number of characters to extract.
 * @return {string}              Returns the first characters string.
 * @example
 * v.first('helicopter');
 * // => 'h'
 *
 * v.first('vehicle', 2);
 * // => 've'
 *
 * v.first('car', 5);
 * // => 'car'
 */
function first(subject, length) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 1 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(0, lengthInt);
}

/**
 * Get a grapheme from `subject` at specified `position` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function graphemeAt
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {number} position The position to get the grapheme.
 * @return {string} Returns the grapheme at specified position.
 * @example
 * v.graphemeAt('\uD835\uDC00\uD835\uDC01', 0); // or '𝐀𝐁'
 * // => 'A'
 *
 * v.graphemeAt('cafe\u0301', 3); // or 'café'
 * // => 'é'
 */
function graphemeAt(subject, position) {
  var subjectString = coerceToString(subject);
  var positionNumber = coerceToNumber(position);
  var graphemeMatch = void 0;
  var graphemeMatchIndex = 0;
  positionNumber = nanDefault(positionNumber, 0);
  while ((graphemeMatch = REGEXP_UNICODE_CHARACTER.exec(subjectString)) !== null) {
    if (graphemeMatchIndex === positionNumber) {
      REGEXP_UNICODE_CHARACTER.lastIndex = 0;
      return graphemeMatch[0];
    }
    graphemeMatchIndex++;
  }
  return '';
}

/**
 * Extracts the last `length` characters from `subject`.
 *
 * @function last
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {int}    [length=1]   The number of characters to extract.
 * @return {string}              Returns the last characters string.
 * @example
 * v.last('helicopter');
 * // => 'r'
 *
 * v.last('vehicle', 2);
 * // => 'le'
 *
 * v.last('car', 5);
 * // => 'car'
 */
function last(subject, length) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 1 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(subjectString.length - lengthInt, lengthInt);
}

/**
 * Truncates `subject` to a new `length` and does not break the words. Guarantees that the truncated string is no longer
 * than `length`.
 *
 * @static
 * @function prune
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to prune.
 * @param  {int}    length       The length to prune the string.
 * @param  {string} [end='...']  The string to be added at the end.
 * @return {string}              Returns the pruned string.
 * @example
 * v.prune('Once upon a time', 7);
 * // => 'Once...'
 *
 * v.prune('Good day, Little Red Riding Hood', 16, ' (more)');
 * // => 'Good day (more)'
 *
 * v.prune('Once upon', 10);
 * // => 'Once upon'
 */
function prune(subject, length, end) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var endString = coerceToString(end, '...');
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  var pattern = REGEXP_EXTENDED_ASCII.test(subjectString) ? REGEXP_LATIN_WORD : REGEXP_WORD;
  var truncatedLength = 0;
  subjectString.replace(pattern, function (word, offset) {
    var wordInsertLength = offset + word.length;
    if (wordInsertLength <= lengthInt - endString.length) {
      truncatedLength = wordInsertLength;
    }
  });
  return subjectString.substr(0, truncatedLength) + endString;
}

/**
 * Extracts from `subject` a string from `start` position up to `end` position. The character at `end` position is not
 * included.
 *
 * @function slice
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject='']         The string to extract from.
 * @param  {number} start                The position to start extraction. If negative use `subject.length + start`.
 * @param  {number} [end=subject.length] The position to end extraction. If negative use `subject.length + end`.
 * @return {string}                      Returns the extracted string.
 * @note Uses native `String.prototype.slice()`
 * @example
 * v.slice('miami', 1);
 * // => 'iami'
 *
 * v.slice('florida', -4);
 * // => 'rida'
 *
 * v.slice('florida', 1, 4);
 * // => "lor"
 */
function slice(subject, start, end) {
  return coerceToString(subject).slice(start, end);
}

/**
 * Extracts from `subject` a string from `start` position a number of `length` characters.
 *
 * @function substr
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject='']                 The string to extract from.
 * @param  {number} start                        The position to start extraction.
 * @param  {number} [length=subject.endOfString] The number of characters to extract. If omitted, extract to the end of `subject`.
 * @return {string}                              Returns the extracted string.
 * @note Uses native `String.prototype.substr()`
 * @example
 * v.substr('infinite loop', 9);
 * // => 'loop'
 *
 * v.substr('dreams', 2, 2);
 * // => 'ea'
 */
function substr(subject, start, length) {
  return coerceToString(subject).substr(start, length);
}

/**
 * Extracts from `subject` a string from `start` position up to `end` position. The character at `end` position is not
 * included.
 *
 * @function substring
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject='']         The string to extract from.
 * @param  {number} start                The position to start extraction.
 * @param  {number} [end=subject.length] The position to end extraction.
 * @return {string}                      Returns the extracted string.
 * @note Uses native `String.prototype.substring()`
 * @example
 * v.substring('beach', 1);
 * // => 'each'
 *
 * v.substring('ocean', 1, 3);
 * // => 'ea'
 */
function substring(subject, start, end) {
  return coerceToString(subject).substring(start, end);
}

/**
 * Counts the characters in `subject`.<br/>
 *
 * @function count
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string} [subject=''] The string to count characters.
 * @return {number}              Returns the number of characters in `subject`.
 * @example
 * v.count('rain');
 * // => 4
 */
function count(subject) {
  return coerceToString(subject).length;
}

/**
 * Counts the graphemes in `subject` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function  countGraphemes
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string} [subject=''] The string to count graphemes.
 * @return {number}              Returns the number of graphemes in `subject`.
 * @example
 * v.countGraphemes('cafe\u0301'); // or 'café'
 * // => 4
 *
 * v.countGraphemes('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => 2
 *
 * v.countGraphemes('rain');
 * // => 4
 */
function countGrapheme(subject) {
  return coerceToString(subject).replace(REGEXP_COMBINING_MARKS, '*').replace(REGEXP_SURROGATE_PAIRS, '*').length;
}

/**
 * Counts the number of `substring` appearances in `subject`.
 *
 * @function countSubstrings
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string} [subject=''] The string where to count.
 * @param  {string} substring    The substring to be counted.
 * @return {number}              Returns the number of `substring` appearances.
 * @example
 * v.countSubstrings('bad boys, bad boys whatcha gonna do?', 'boys');
 * // => 2
 *
 * v.countSubstrings('every dog has its day', 'cat');
 * // => 0
 */
function countSubstrings(subject, substring) {
  var subjectString = coerceToString(subject);
  var substringString = coerceToString(substring);
  var substringLength = substringString.length;
  var count = 0;
  var matchIndex = 0;
  if (subjectString === '' || substringString === '') {
    return count;
  }
  do {
    matchIndex = subjectString.indexOf(substringString, matchIndex);
    if (matchIndex !== -1) {
      count++;
      matchIndex += substringLength;
    }
  } while (matchIndex !== -1);
  return count;
}

var reduce = Array.prototype.reduce;

/**
 * Counts the characters in `subject` for which `predicate` returns truthy.
 *
 * @function  countWhere
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string}   [subject=''] The string to count characters.
 * @param  {Function} predicate    The predicate function invoked on each character with parameters `(character, index, string)`.
 * @param  {Object}   [context]    The context to invoke the `predicate`.
 * @return {number}                Returns the number of characters for which `predicate` returns truthy.
 * @example
 * v.countWhere('hola!', v.isAlpha);
 * // => 4
 *
 * v.countWhere('2022', function(character, index, str) {
 *   return character === '2';
 * });
 * // => 3
 */
function countWhere(subject, predicate, context) {
  var subjectString = coerceToString(subject);
  if (subjectString === '' || typeof predicate !== 'function') {
    return 0;
  }
  var predicateWithContext = predicate.bind(context);
  return reduce.call(subjectString, function (countTruthy, character, index) {
    return predicateWithContext(character, index, subjectString) ? countTruthy + 1 : countTruthy;
  }, 0);
}

/**
 * Counts the number of words in `subject`.
 *
 * @function countWords
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param {string} [subject=''] The string to split into words.
 * @param {string|RegExp} [pattern] The pattern to watch words. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
 * @return {number} Returns the number of words.
 * @example
 * v.countWords('gravity can cross dimensions');
 * // => 4
 *
 * v.countWords('GravityCanCrossDimensions');
 * // => 4
 *
 * v.countWords('Gravity - can cross dimensions!');
 * // => 4
 *
 * v.words('Earth gravity', /[^\s]+/g);
 * // => 2
 */
function countWords(subject, pattern, flags) {
  return words(subject, pattern, flags).length;
}

/**
 * The current index.
 *
 * @ignore
 * @name ReplacementIndex#index
 * @type {number}
 * @return {ReplacementIndex} ReplacementIndex instance.
 */
function ReplacementIndex() {
  this.index = 0;
}

/**
 * Increment the current index.
 *
 * @ignore
 * @return {undefined}
 */
ReplacementIndex.prototype.increment = function () {
  this.index++;
};

/**
 * Increment the current index by position.
 *
 * @ignore
 * @param {number} [position] The replacement position.
 * @return {undefined}
 */
ReplacementIndex.prototype.incrementOnEmptyPosition = function (position) {
  if (isNil(position)) {
    this.increment();
  }
};

/**
 * Get the replacement index by position.
 *
 * @ignore
 * @param {number} [position] The replacement position.
 * @return {number} The replacement index.
 */
ReplacementIndex.prototype.getIndexByPosition = function (position) {
  return isNil(position) ? this.index : position - 1;
};

// Type specifiers
var TYPE_INTEGER = 'i';
var TYPE_INTEGER_BINARY = 'b';
var TYPE_INTEGER_ASCII_CHARACTER = 'c';
var TYPE_INTEGER_DECIMAL = 'd';
var TYPE_INTEGER_OCTAL = 'o';
var TYPE_INTEGER_UNSIGNED_DECIMAL = 'u';
var TYPE_INTEGER_HEXADECIMAL = 'x';
var TYPE_INTEGER_HEXADECIMAL_UPPERCASE = 'X';
var TYPE_FLOAT_SCIENTIFIC = 'e';
var TYPE_FLOAT_SCIENTIFIC_UPPERCASE = 'E';
var TYPE_FLOAT = 'f';
var TYPE_FLOAT_SHORT = 'g';
var TYPE_FLOAT_SHORT_UPPERCASE = 'G';
var TYPE_STRING = 's';

// Simple literals

var LITERAL_SINGLE_QUOTE = "'";
var LITERAL_PLUS = '+';
var LITERAL_MINUS = '-';
var LITERAL_PERCENT_SPECIFIER = '%%';

// Radix constants to format numbers
var RADIX_BINARY = 2;
var RADIX_OCTAL = 8;

var RADIX_HEXADECIMAL = 16;

/**
 * Repeats the `subject` number of `times`.
 *
 * @function repeat
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to repeat.
 * @param {number} [times=1] The number of times to repeat.
 * @return {string} Returns the repeated string.
 * @example
 * v.repeat('w', 3);
 * // => 'www'
 *
 * v.repeat('world', 0);
 * // => ''
 */
function repeat(subject, times) {
  var subjectString = coerceToString(subject);
  var timesInt = isNil(times) ? 1 : clipNumber(toInteger(times), 0, MAX_SAFE_INTEGER);
  var repeatString = '';
  while (timesInt) {
    if (timesInt & 1) {
      repeatString += subjectString;
    }
    if (timesInt > 1) {
      subjectString += subjectString;
    }
    timesInt >>= 1;
  }
  return repeatString;
}

/**
 * Creates the padding string.
 *
 * @ignore
 * @param {string} padCharacters The characters to create padding string.
 * @param {number} length The padding string length.
 * @return {string} The padding string.
 */
function buildPadding(padCharacters, length) {
  var padStringRepeat = toInteger(length / padCharacters.length);
  var padStringRest = length % padCharacters.length;
  return repeat(padCharacters, padStringRepeat + padStringRest).substr(0, length);
}

/**
 * Pads `subject` from left to a new `length`.
 *
 * @function padLeft
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to left pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the left padded string.
 * @example
 * v.padLeft('dog', 5);
 * // => '  dog'
 *
 * v.padLeft('bird', 6, '-');
 * // => '--bird'
 *
 * v.padLeft('cat', 6, '-=');
 * // => '-=-cat'
 */
function padLeft(subject, length, pad) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return buildPadding(padString, lengthInt - subjectString.length) + subjectString;
}

/**
 * Pads `subject` from right to a new `length`.
 *
 * @function padRight
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to right pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the right padded string.
 * @example
 * v.padRight('dog', 5);
 * // => 'dog  '
 *
 * v.padRight('bird', 6, '-');
 * // => 'bird--'
 *
 * v.padRight('cat', 6, '-=');
 * // => 'cat-=-'
 */
function padRight(subject, length, pad) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return subjectString + buildPadding(padString, lengthInt - subjectString.length);
}

/**
 * Aligns and pads `subject` string.
 *
 * @ignore
 * @param {string} subject The subject string.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the aligned and padded string.
 */
function alignAndPad(subject, conversion) {
  var width = conversion.width;
  if (isNil(width) || subject.length >= width) {
    return subject;
  }
  var padType = conversion.alignmentSpecifier === LITERAL_MINUS ? padRight : padLeft;
  return padType(subject, width, conversion.getPaddingCharacter());
}

/**
 * Add sign to the formatted number.
 *
 * @ignore
 * @name addSignToFormattedNumber
 * @param  {number} replacementNumber The number to be replaced.
 * @param  {string} formattedReplacement The formatted version of number.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted number string with a sign.
 */
function addSignToFormattedNumber(replacementNumber, formattedReplacement, conversion) {
  if (conversion.signSpecifier === LITERAL_PLUS && replacementNumber >= 0) {
    formattedReplacement = LITERAL_PLUS + formattedReplacement;
  }
  return formattedReplacement;
}

/**
 * Formats a float type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

function float(replacement, conversion) {
  var replacementNumber = parseFloat(replacement);
  var formattedReplacement = void 0;
  if (isNaN(replacementNumber)) {
    replacementNumber = 0;
  }
  var precision = coerceToNumber(conversion.precision, 6);
  switch (conversion.typeSpecifier) {
    case TYPE_FLOAT:
      formattedReplacement = replacementNumber.toFixed(precision);
      break;
    case TYPE_FLOAT_SCIENTIFIC:
      formattedReplacement = replacementNumber.toExponential(precision);
      break;
    case TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
      formattedReplacement = replacementNumber.toExponential(precision).toUpperCase();
      break;
    case TYPE_FLOAT_SHORT:
    case TYPE_FLOAT_SHORT_UPPERCASE:
      formattedReplacement = formatFloatAsShort(replacementNumber, precision, conversion);
      break;
  }
  formattedReplacement = addSignToFormattedNumber(replacementNumber, formattedReplacement, conversion);
  return coerceToString(formattedReplacement);
}

/**
 * Formats the short float.
 *
 * @ignore
 * @param  {number} replacementNumber The number to format.
 * @param  {number} precision The precision to format the float.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string}  Returns the formatted short float.
 */
function formatFloatAsShort(replacementNumber, precision, conversion) {
  if (replacementNumber === 0) {
    return '0';
  }
  var nonZeroPrecision = precision === 0 ? 1 : precision;
  var formattedReplacement = replacementNumber.toPrecision(nonZeroPrecision).replace(REGEXP_TRAILING_ZEROS, '');
  if (conversion.typeSpecifier === TYPE_FLOAT_SHORT_UPPERCASE) {
    formattedReplacement = formattedReplacement.toUpperCase();
  }
  return formattedReplacement;
}

/**
 * Formats an integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

function integerBase(replacement, conversion) {
  var integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  integer = integer >>> 0;
  switch (conversion.typeSpecifier) {
    case TYPE_INTEGER_ASCII_CHARACTER:
      integer = String.fromCharCode(integer);
      break;
    case TYPE_INTEGER_BINARY:
      integer = integer.toString(RADIX_BINARY);
      break;
    case TYPE_INTEGER_OCTAL:
      integer = integer.toString(RADIX_OCTAL);
      break;
    case TYPE_INTEGER_HEXADECIMAL:
      integer = integer.toString(RADIX_HEXADECIMAL);
      break;
    case TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
      integer = integer.toString(RADIX_HEXADECIMAL).toUpperCase();
      break;
  }
  return coerceToString(integer);
}

/**
 * Formats a decimal integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

function integerDecimal(replacement, conversion) {
  var integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  return addSignToFormattedNumber(integer, toString(integer), conversion);
}

/**
 * Formats a string type according to specifiers.
 *
 * @ignore
 * @param {string} replacement The string to be formatted.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */
function stringFormat(replacement, conversion) {
  var formattedReplacement = replacement;
  var precision = conversion.precision;
  if (!isNil(precision) && formattedReplacement.length > precision) {
    formattedReplacement = truncate(formattedReplacement, precision, '');
  }
  return formattedReplacement;
}

/**
 * Returns the computed string based on format specifiers.
 *
 * @ignore
 * @name computeReplacement
 * @param {string} replacement The replacement value.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the computed string.
 */
function compute(replacement, conversion) {
  var formatFunction = void 0;
  switch (conversion.typeSpecifier) {
    case TYPE_STRING:
      formatFunction = stringFormat;
      break;
    case TYPE_INTEGER_DECIMAL:
    case TYPE_INTEGER:
      formatFunction = integerDecimal;
      break;
    case TYPE_INTEGER_ASCII_CHARACTER:
    case TYPE_INTEGER_BINARY:
    case TYPE_INTEGER_OCTAL:
    case TYPE_INTEGER_HEXADECIMAL:
    case TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
    case TYPE_INTEGER_UNSIGNED_DECIMAL:
      formatFunction = integerBase;
      break;
    case TYPE_FLOAT:
    case TYPE_FLOAT_SCIENTIFIC:
    case TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
    case TYPE_FLOAT_SHORT:
    case TYPE_FLOAT_SHORT_UPPERCASE:
      formatFunction = float;
      break;
  }
  var formattedString = formatFunction(replacement, conversion);
  return alignAndPad(formattedString, conversion);
}

/**
 * Construct the new conversion specification object.
 *
 * @ignore
 * @param {Object} properties An object with properties to initialize.
 * @return {ConversionSpecification} ConversionSpecification instance.
 */
function ConversionSpecification(properties) {

  /**
   * The percent characters from conversion specification.
   *
   * @ignore
   * @name ConversionSpecification#percent
   * @type {string}
   */
  this.percent = properties.percent;

  /**
   *  The sign specifier to force a sign to be used on a number.
   *
   * @ignore
   * @name ConversionSpecification#signSpecifier
   * @type {string}
   */
  this.signSpecifier = properties.signSpecifier;

  /**
   * The padding specifier that says what padding character will be used.
   *
   * @ignore
   * @name ConversionSpecification#paddingSpecifier
   * @type {string}
   */
  this.paddingSpecifier = properties.paddingSpecifier;

  /**
   * The alignment specifier that says if the result should be left-justified or right-justified.
   *
   * @ignore
   * @name ConversionSpecification#alignmentSpecifier
   * @type {string}
   */
  this.alignmentSpecifier = properties.alignmentSpecifier;

  /**
   * The width specifier how many characters this conversion should result in.
   *
   * @ignore
   * @name ConversionSpecification#width
   * @type {number}
   */
  this.width = properties.width;

  /**
   * The precision specifier says how many decimal digits should be displayed for floating-point numbers.
   *
   * @ignore
   * @name ConversionSpecification#precision
   * @type {number}
   */
  this.precision = properties.precision;

  /**
   * The type specifier says what type the argument data should be treated as.
   *
   * @ignore
   * @name ConversionSpecification#typeSpecifier
   * @type {string}
   */
  this.typeSpecifier = properties.typeSpecifier;
}

/**
 * Check if the conversion specification is a percent literal "%%".
 *
 * @ignore
 * @return {boolean} Returns true if the conversion is a percent literal, false otherwise.
 */
ConversionSpecification.prototype.isPercentLiteral = function () {
  return LITERAL_PERCENT_SPECIFIER === this.percent;
};

/**
 * Get the padding character from padding specifier.
 *
 * @ignore
 * @returns {string} Returns the padding character.
 */
ConversionSpecification.prototype.getPaddingCharacter = function () {
  var paddingCharacter = nilDefault(this.paddingSpecifier, ' ');
  if (paddingCharacter.length === 2 && paddingCharacter[0] === LITERAL_SINGLE_QUOTE) {
    paddingCharacter = paddingCharacter[1];
  }
  return paddingCharacter;
};

/**
 * Validates the specifier type and replacement position.
 *
 * @ignore
 * @throws {Error} Throws an exception on insufficient arguments or unknown specifier.
 * @param  {number} index The index of the matched specifier.
 * @param  {number} replacementsLength The number of replacements.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {undefined}
 */
function validate(index, replacementsLength, conversion) {
  if (isNil(conversion.typeSpecifier)) {
    throw new Error('sprintf(): Unknown type specifier');
  }
  if (index > replacementsLength - 1) {
    throw new Error('sprintf(): Too few arguments');
  }
  if (index < 0) {
    throw new Error('sprintf(): Argument number must be greater than zero');
  }
}

/**
 * Return the replacement for regular expression match of the conversion specification.
 *
 * @ignore
 * @name matchReplacement
 * @param {ReplacementIndex} replacementIndex The replacement index object.
 * @param {string[]} replacements The array of replacements.
 * @param {string} conversionSpecification The conversion specification.
 * @param {string} percent The percent characters from conversion specification.
 * @param {string} position The position to insert the replacement.
 * @param {string} signSpecifier The sign specifier to force a sign to be used on a number.
 * @param {string} paddingSpecifier The padding specifier that says what padding character will be used.
 * @param {string} alignmentSpecifier The alignment specifier that says if the result should be left-justified or right-justified.
 * @param {string} widthSpecifier The width specifier how many characters this conversion should result in.
 * @param {string} precisionSpecifier The precision specifier says how many decimal digits should be displayed for floating-point numbers.
 * @param {string} typeSpecifier The type specifier says what type the argument data should be treated as.
 * @return {string} Returns the computed replacement.
 */
function match(replacementIndex, replacements, conversionSpecification, percent, position, signSpecifier, paddingSpecifier, alignmentSpecifier, widthSpecifier, precisionSpecifier, typeSpecifier) {
  var conversion = new ConversionSpecification({
    percent: percent,
    signSpecifier: signSpecifier,
    paddingSpecifier: paddingSpecifier,
    alignmentSpecifier: alignmentSpecifier,
    width: coerceToNumber(widthSpecifier, null),
    precision: coerceToNumber(precisionSpecifier, null),
    typeSpecifier: typeSpecifier
  });
  if (conversion.isPercentLiteral()) {
    return conversionSpecification.slice(1);
  }
  var actualReplacementIndex = replacementIndex.getIndexByPosition(position);
  replacementIndex.incrementOnEmptyPosition(position);
  validate(actualReplacementIndex, replacements.length, conversion);
  return compute(replacements[actualReplacementIndex], conversion);
}

/**
 * Produces a string according to `format`.
 *
 * <div id="sprintf-format" class="smaller">
 * `format` string is composed of zero or more directives: ordinary characters (not <code>%</code>), which are  copied  unchanged
 * to  the  output string and <i>conversion specifications</i>, each of which results in fetching zero or more subsequent
 * arguments. <br/> <br/>
 *
 * Each <b>conversion specification</b> is introduced by the character <code>%</code>, and ends with a <b>conversion
 * specifier</b>. In between there may be (in this order) zero or more <b>flags</b>, an optional <b>minimum field width</b>
 * and an optional <b>precision</b>.<br/>
 * The syntax is: <b>ConversionSpecification</b> = <b>"%"</b> { <b>Flags</b> }
 * [ <b>MinimumFieldWidth</b> ] [ <b>Precision</b> ] <b>ConversionSpecifier</b>, where curly braces { } denote repetition
 * and square brackets [ ] optionality. <br/><br/>
 *
 * By default, the arguments are used in the given order.<br/>
 * For argument numbering and swapping, `%m$` (where `m` is a number indicating the argument order)
 * is used instead of `%` to specify explicitly which argument is taken. For instance `%1$s` fetches the 1st argument,
 * `%2$s` the 2nd and so on, no matter what position  the conversion specification has in `format`.
 * <br/><br/>
 *
 * <b>The flags</b><br/>
 * The character <code>%</code> is followed by zero or more of the following flags:<br/>
 * <table class="light-params">
 *   <tr>
 *     <td><code>+</code></td>
 *     <td>
 *       A  sign (<code>+</code> or <code>-</code>) should always be placed before a number produced by a
 *       signed conversion. By default a sign is used only for negative numbers.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td><code>0</code></td>
 *     <td>The value should be zero padded.</td>
 *   </tr>
 *   <tr>
 *     <td><code>&blank;</code></td>
 *     <td>(a space) The value should be space padded.</td>
 *   </tr>
 *   <tr>
 *    <td><code>'</code></td>
 *    <td>Indicates alternate padding character, specified by prefixing it with a single quote <code>'</code>.</td>
 *   </tr>
 *   <tr>
 *     <td><code>-</code></td>
 *     <td>The converted value is to be left adjusted on the field boundary (the default is right justification).</td>
 *   </tr>
 * </table>
 *
 * <b>The minimum field width</b><br/>
 * An  optional decimal digit string (with nonzero first digit) specifying a minimum field width.  If the converted
 * value has fewer characters than the field width, it will be padded with spaces on the left (or right, if the
 * left-adjustment flag has been given).<br/><br/>
 *
 * <b>The precision</b><br/>
 * An optional precision, in the form of a period `.` followed by an optional decimal digit string.<br/>
 * This gives the number of digits to appear after the radix character for `e`, `E`, `f` and `F` conversions, the
 * maximum number of significant digits for `g` and `G` conversions or the maximum number of characters to be printed
 * from a string for `s` conversion.<br/><br/>
 *
 * <b>The conversion specifier</b><br/>
 * A specifier that mentions what type the argument should be treated as:
 *
 * <table class="light-params">
 *   <tr>
 *     <td>`s`</td>
 *     <td>The string argument is treated as and presented as a string.</td>
 *   </tr>
 *   <tr>
 *     <td>`d` `i`</td>
 *     <td>The integer argument is converted to signed decimal notation.</td>
 *   </tr>
 *   <tr>
 *     <td>`b`</td>
 *     <td>The unsigned integer argument is converted to unsigned binary.</td>
 *   </tr>
 *   <tr>
 *     <td>`c`</td>
 *     <td>The unsigned integer argument is converted to an ASCII character with that number.</td>
 *   </tr>
 *   <tr>
 *     <td>`o`</td>
 *     <td>The unsigned integer argument is converted to unsigned octal.</td>
 *   </tr>
 *   <tr>
 *     <td>`u`</td>
 *     <td>The unsigned integer argument is converted to unsigned decimal.</td>
 *   </tr>
 *   <tr>
 *     <td>`x` `X`</td>
 *     <td>The unsigned integer argument is converted to unsigned hexadecimal. The letters `abcdef` are used for `x`
 *     conversions; the letters `ABCDEF` are used for `X` conversions.</td>
 *   </tr>
 *   <tr>
 *     <td>`f`</td>
 *     <td>
 *      The float argument is rounded and converted to decimal notation in the style `[-]ddd.ddd`, where the number of
 *      digits after the decimal-point character is equal to the precision specification. If the precision is missing,
 *      it is taken as 6; if the precision is explicitly zero, no decimal-point character appears.
 *      If a decimal point appears, at least one digit appears before it.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`e` `E`</td>
 *     <td>
 *       The float argument is rounded and converted in the style `[-]d.ddde±dd`, where there is one digit
 *       before the decimal-point character and the number of digits after it is equal to the precision. If
 *       the precision is missing, it is taken as `6`; if the precision is zero, no decimal-point character
 *       appears. An `E` conversion uses the letter `E` (rather than `e`) to introduce the exponent.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`g` `G`</td>
 *     <td>
 *       The float argument is converted in style `f` or `e` (or `F` or `E` for `G` conversions). The precision specifies
 *       the number of significant digits. If the precision is missing, `6` digits are given; if the
 *       precision is zero, it is treated as `1`. Style `e` is used if the exponent from its conversion is less
 *       than `-6` or greater than or equal to the precision. Trailing zeros are removed from the fractional
 *       part of the result; a decimal point appears only if it is followed by at least one digit.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`%`</td>
 *     <td>A literal `%` is written. No argument is converted. The complete conversion specification is `%%`.</td>
 *   </tr>
 *
 * </table>
 * </div>
 *
 * @function sprintf
 * @static
 * @since 1.0.0
 * @memberOf Format
 * @param  {string} [format=''] The format string.
 * @param  {...*}               replacements The replacements to produce the string.
 * @return {string}             Returns the produced string.
 * @example
 * v.sprintf('%s, %s!', 'Hello', 'World');
 * // => 'Hello World!'
 *
 * v.sprintf('%s costs $%d', 'coffee', 2);
 * // => 'coffee costs $2'
 *
 * v.sprintf('%1$s %2$s %1$s %2$s, watcha gonna %3$s', 'bad', 'boys', 'do')
 * // => 'bad boys bad boys, watcha gonna do'
 *
 * v.sprintf('% 6s', 'bird');
 * // => '  bird'
 *
 * v.sprintf('% -6s', 'crab');
 * // => 'crab  '
 *
 * v.sprintf("%'*5s", 'cat');
 * // => '**cat'
 *
 * v.sprintf("%'*-6s", 'duck');
 * // => 'duck**'
 *
 * v.sprintf('%d %i %+d', 15, -2, 25);
 * // => '15 -2 +25'
 *
 * v.sprintf("%06d", 15);
 * // => '000015'
 *
 * v.sprintf('0b%b 0o%o 0x%X', 12, 9, 155);
 * // => '0b1100 0o11 0x9B'
 *
 * v.sprintf('%.2f', 10.469);
 * // => '10.47'
 *
 * v.sprintf('%.2e %g', 100.5, 0.455);
 * // => '1.01e+2 0.455'
 * 
 */
function sprintf(format) {
  var formatString = coerceToString(format);
  if (formatString === '') {
    return formatString;
  }

  for (var _len = arguments.length, replacements = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    replacements[_key - 1] = arguments[_key];
  }

  var boundReplacementMatch = match.bind(undefined, new ReplacementIndex(), replacements);
  return formatString.replace(REGEXP_CONVERSION_SPECIFICATION, boundReplacementMatch);
}

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Produces a string according to `format`. Works exactly like <a href="#sprintf"><code>sprintf()</code></a>,
 * with the only difference that accepts the formatting arguments in an array `values`.<br/>
 * See <a href="#sprintf-format">here</a> `format` string specifications.
 *
 * @function vprintf
 * @static
 * @since 1.0.0
 * @memberOf Format
 * @param  {string} format='']  The format string.
 * @param  {Array} replacements The array of replacements to produce the string.
 * @return {string}             Returns the produced string.
 * @example
 * v.vprintf('%s', ['Welcome'])
 * // => 'Welcome'
 *
 * v.vprintf('%s has %d apples', ['Alexandra', 3]);
 * // => 'Alexandra has 3 apples'
 */
function vprintf(format, replacements) {
  return sprintf.apply(undefined, [format].concat(_toConsumableArray(nilDefault(replacements, []))));
}

var escapeCharactersMap = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};

/**
 * Return the escaped version of `character`.
 *
 * @ignore
 * @param  {string} character The character to be escape.
 * @return {string}           The escaped version of character.
 */
function replaceSpecialCharacter(character) {
  return escapeCharactersMap[character];
}

/**
 * Escapes HTML special characters  <code>< > & ' " `</code> in <code>subject</code>.
 *
 * @function escapeHtml
 * @static
 * @since 1.0.0         
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * v.escapeHtml('<p>wonderful world</p>');
 * // => '&lt;p&gt;wonderful world&lt;/p&gt;'
 */
function escapeHtml(subject) {
  return coerceToString(subject).replace(REGEXP_HTML_SPECIAL_CHARACTERS, replaceSpecialCharacter);
}

/**
 * Escapes the regular expression special characters `- [ ] / { } ( ) * + ? . \ ^ $ |` in `subject`.
 *
 * @function escapeRegExp
 * @static
 * @since 1.0.0
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * v.escapeRegExp('(hours)[minutes]{seconds}');
 * // => '\(hours\)\[minutes\]\{seconds\}'
 */
function escapeRegExp(subject) {
  return coerceToString(subject).replace(REGEXP_SPECIAL_CHARACTERS, '\\$&');
}

var unescapeCharactersMap = {
  '<': /(&lt;)|(&#x0*3c;)|(&#0*60;)/gi,
  '>': /(&gt;)|(&#x0*3e;)|(&#0*62;)/gi,
  '&': /(&amp;)|(&#x0*26;)|(&#0*38;)/gi,
  '"': /(&quot;)|(&#x0*22;)|(&#0*34;)/gi,
  "'": /(&#x0*27;)|(&#0*39;)/gi,
  '`': /(&#x0*60;)|(&#0*96;)/gi
};
var characters = Object.keys(unescapeCharactersMap);

/**
 * Replaces the HTML entities with corresponding characters.
 *
 * @ignore
 * @param  {string} string The accumulator string.
 * @param  {string} key    The character.
 * @return {string}        The string with replaced HTML entity
 */
function reduceUnescapedString(string, key) {
  return string.replace(unescapeCharactersMap[key], key);
}

/**
 * Unescapes HTML special characters from <code>&amp;lt; &amp;gt; &amp;amp; &amp;quot; &amp;#x27; &amp;#x60;</code>
 * to corresponding <code>< > & ' " `</code> in <code>subject</code>.
 *
 * @function unescapeHtml
 * @static
 * @since 1.0.0
 * @memberOf Escape
 * @param  {string} [subject=''] The string to unescape.
 * @return {string}              Returns the unescaped string.
 * @example
 * v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;');
 * // => '<p>wonderful world</p>'
 */
function unescapeHtml(subject) {
  var subjectString = coerceToString(subject);
  return characters.reduce(reduceUnescapedString, subjectString);
}

/**
 * Returns the first occurrence index of `search` in `subject`.
 *
 * @function indexOf
 * @static
 * @since 1.0.0
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {number} [fromIndex=0] The index to start searching.
 * @return {number} Returns the first occurrence index or `-1` if not found.
 * @example
 * v.indexOf('morning', 'n');
 * // => 3
 *
 * v.indexOf('evening', 'o');
 * // => -1
 */
function indexOf(subject, search, fromIndex) {
  var subjectString = coerceToString(subject);
  return subjectString.indexOf(search, fromIndex);
}

/**
 * Returns the last occurrence index of `search` in `subject`.
 *
 * @function lastIndexOf
 * @static
 * @since 1.0.0
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {number} [fromIndex=subject.length - 1] The index to start searching backward in the string.
 * @return {number} Returns the last occurrence index or `-1` if not found.
 * @example
 * v.lastIndexOf('morning', 'n');
 * // => 5
 *
 * v.lastIndexOf('evening', 'o');
 * // => -1
 */
function lastIndexOf(subject, search, fromIndex) {
  var subjectString = coerceToString(subject);
  return subjectString.lastIndexOf(search, fromIndex);
}

/**
 * Returns the first index of a `pattern` match in `subject`.
 *
 * @function search
 * @static
 * @since 1.0.0
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string|RegExp} pattern The pattern to match. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern)`.
 * @param {number} [fromIndex=0] The index to start searching.
 * @return {number} Returns the first match index or `-1` if not found.
 * @example
 * v.search('morning', /rn/);
 * // => 2
 *
 * v.search('evening', '/\d/');
 * // => -1
 */
function search(subject, pattern, fromIndex) {
  var subjectString = coerceToString(subject);
  var fromIndexNumber = isNil(fromIndex) ? 0 : clipNumber(toInteger(fromIndex), 0, subjectString.length);
  var matchIndex = subjectString.substr(fromIndexNumber).search(pattern);
  if (matchIndex !== -1 && !isNaN(fromIndexNumber)) {
    matchIndex += fromIndexNumber;
  }
  return matchIndex;
}

/**
 * Inserts into `subject` a string `toInsert` at specified `position`.
 *
 * @function insert
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string where to insert.
 * @param {string} [toInsert=''] The string to be inserted.
 * @param {number} [position=0] The position to insert.
 * @return {string} Returns the string after insertion.
 * @example
 * v.insert('ct', 'a', 1);
 * // => 'cat'
 *
 * v.insert('sunny', ' day', 5);
 * // => 'sunny day'
 */
function insert(subject, toInsert, position) {
  var subjectString = coerceToString(subject);
  var toInsertString = coerceToString(toInsert);
  var positionNumber = coerceToNumber(position);
  if (positionNumber < 0 || positionNumber > subjectString.length || toInsertString === '') {
    return subjectString;
  }
  return subjectString.slice(0, positionNumber) + toInsertString + subjectString.slice(positionNumber);
}

/**
 * Generated diacritics map. See bellow the base code.
 * @ignore
 * @see http://stackoverflow.com/a/18391901/1894471
 * @type Object
 */

var diacritics = {
  "3": "\u039e\u03be",
  "8": "\u0398\u03b8",
  "A": "\x41\xc0\xc1\xc2\xc3\xc4\xc5\u0100\u0102\u0104\u01cd\u01de\u01e0\u01fa\u0200\u0202\u0226\u023a\u1e00\u1ea0\u1ea2\u1ea4\u1ea6\u1ea8\u1eaa\u1eac\u1eae\u1eb0\u1eb2\u1eb4\u1eb6\u24b6\u2c6f\uff21\u0386\u0391\u0410",
  "B": "\x42\u0181\u0182\u0243\u1e02\u1e04\u1e06\u24b7\uff22\u0392\u0411",
  "C": "\x43\xc7\u0106\u0108\u010a\u010c\u0187\u023b\u1e08\u24b8\ua73e\uff23\u0426",
  "D": "\x44\u010e\u0110\u0189\u018a\u018b\u1e0a\u1e0c\u1e0e\u1e10\u1e12\u24b9\ua779\uff24\xd0\u0394\u0414",
  "E": "\x45\xc8\xc9\xca\xcb\u0112\u0114\u0116\u0118\u011a\u018e\u0190\u0204\u0206\u0228\u1e14\u1e16\u1e18\u1e1a\u1e1c\u1eb8\u1eba\u1ebc\u1ebe\u1ec0\u1ec2\u1ec4\u1ec6\u24ba\uff25\u0388\u0395\u0415\u042d",
  "F": "\x46\u0191\u1e1e\u24bb\ua77b\uff26\u03a6\u0424",
  "G": "\x47\u011c\u011e\u0120\u0122\u0193\u01e4\u01e6\u01f4\u1e20\u24bc\ua77d\ua77e\ua7a0\uff27\u0393\u0413\u0490",
  "H": "\x48\u0124\u0126\u021e\u1e22\u1e24\u1e26\u1e28\u1e2a\u24bd\u2c67\u2c75\ua78d\uff28\u0389\u0397\u0425",
  "I": "\x49\xcc\xcd\xce\xcf\u0128\u012a\u012c\u012e\u0130\u0197\u01cf\u0208\u020a\u1e2c\u1e2e\u1ec8\u1eca\u24be\uff29\u038a\u0399\u03aa\u0406\u0418",
  "J": "\x4a\u0134\u0248\u24bf\uff2a\u0419",
  "K": "\x4b\u0136\u0198\u01e8\u1e30\u1e32\u1e34\u24c0\u2c69\ua740\ua742\ua744\ua7a2\uff2b\u039a\u041a",
  "L": "\x4c\u0139\u013b\u013d\u013f\u0141\u023d\u1e36\u1e38\u1e3a\u1e3c\u24c1\u2c60\u2c62\ua746\ua748\ua780\uff2c\u039b\u041b",
  "M": "\x4d\u019c\u1e3e\u1e40\u1e42\u24c2\u2c6e\uff2d\u039c\u041c",
  "N": "\x4e\xd1\u0143\u0145\u0147\u019d\u01f8\u0220\u1e44\u1e46\u1e48\u1e4a\u24c3\ua790\ua7a4\uff2e\u039d\u041d",
  "O": "\x4f\xd2\xd3\xd4\xd5\xd6\xd8\u014c\u014e\u0150\u0186\u019f\u01a0\u01d1\u01ea\u01ec\u01fe\u020c\u020e\u022a\u022c\u022e\u0230\u1e4c\u1e4e\u1e50\u1e52\u1ecc\u1ece\u1ed0\u1ed2\u1ed4\u1ed6\u1ed8\u1eda\u1edc\u1ede\u1ee0\u1ee2\u24c4\ua74a\ua74c\uff2f\u038c\u039f\u041e",
  "P": "\x50\u01a4\u1e54\u1e56\u24c5\u2c63\ua750\ua752\ua754\uff30\u03a0\u041f",
  "Q": "\x51\u024a\u24c6\ua756\ua758\uff31",
  "R": "\x52\u0154\u0156\u0158\u0210\u0212\u024c\u1e58\u1e5a\u1e5c\u1e5e\u24c7\u2c64\ua75a\ua782\ua7a6\uff32\u03a1\u0420",
  "S": "\x53\u015a\u015c\u015e\u0160\u0218\u1e60\u1e62\u1e64\u1e66\u1e68\u1e9e\u24c8\u2c7e\ua784\ua7a8\uff33\u03a3\u0421",
  "T": "\x54\u0162\u0164\u0166\u01ac\u01ae\u021a\u023e\u1e6a\u1e6c\u1e6e\u1e70\u24c9\ua786\uff34\u03a4\u0422",
  "U": "\x55\xd9\xda\xdb\xdc\u0168\u016a\u016c\u016e\u0170\u0172\u01af\u01d3\u01d5\u01d7\u01d9\u01db\u0214\u0216\u0244\u1e72\u1e74\u1e76\u1e78\u1e7a\u1ee4\u1ee6\u1ee8\u1eea\u1eec\u1eee\u1ef0\u24ca\uff35\u0423\u042a",
  "V": "\x56\u01b2\u0245\u1e7c\u1e7e\u24cb\ua75e\uff36\u0412",
  "W": "\x57\u0174\u1e80\u1e82\u1e84\u1e86\u1e88\u24cc\u2c72\uff37\u038f\u03a9",
  "X": "\x58\u1e8a\u1e8c\u24cd\uff38\u03a7",
  "Y": "\x59\xdd\u0176\u0178\u01b3\u0232\u024e\u1e8e\u1ef2\u1ef4\u1ef6\u1ef8\u1efe\u24ce\uff39\u038e\u03a5\u03ab\u042b",
  "Z": "\x5a\u0179\u017b\u017d\u01b5\u0224\u1e90\u1e92\u1e94\u24cf\u2c6b\u2c7f\ua762\uff3a\u0396\u0417",
  "a": "\x61\xe0\xe1\xe2\xe3\xe4\xe5\u0101\u0103\u0105\u01ce\u01df\u01e1\u01fb\u0201\u0203\u0227\u0250\u1e01\u1e9a\u1ea1\u1ea3\u1ea5\u1ea7\u1ea9\u1eab\u1ead\u1eaf\u1eb1\u1eb3\u1eb5\u1eb7\u24d0\u2c65\uff41\u03ac\u03b1\u0430",
  "b": "\x62\u0180\u0183\u0253\u1e03\u1e05\u1e07\u24d1\uff42\u03b2\u0431",
  "c": "\x63\xe7\u0107\u0109\u010b\u010d\u0188\u023c\u1e09\u2184\u24d2\ua73f\uff43\u0446",
  "d": "\x64\u010f\u0111\u018c\u0256\u0257\u1e0b\u1e0d\u1e0f\u1e11\u1e13\u24d3\ua77a\uff44\xf0\u03b4\u0434",
  "e": "\x65\xe8\xe9\xea\xeb\u0113\u0115\u0117\u0119\u011b\u01dd\u0205\u0207\u0229\u0247\u025b\u1e15\u1e17\u1e19\u1e1b\u1e1d\u1eb9\u1ebb\u1ebd\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7\u24d4\uff45\u03ad\u03b5\u0435\u044d",
  "f": "\x66\u0192\u1e1f\u24d5\ua77c\uff46\u03c6\u0444",
  "g": "\x67\u011d\u011f\u0121\u0123\u01e5\u01e7\u01f5\u0260\u1d79\u1e21\u24d6\ua77f\ua7a1\uff47\u03b3\u0433\u0491",
  "h": "\x68\u0125\u0127\u021f\u0265\u1e23\u1e25\u1e27\u1e29\u1e2b\u1e96\u24d7\u2c68\u2c76\uff48\u03ae\u03b7\u0445",
  "i": "\x69\xec\xed\xee\xef\u0129\u012b\u012d\u012f\u0131\u01d0\u0209\u020b\u0268\u1e2d\u1e2f\u1ec9\u1ecb\u24d8\uff49\u0390\u03af\u03b9\u03ca\u0438\u0456",
  "j": "\x6a\u0135\u01f0\u0249\u24d9\uff4a\u0439",
  "k": "\x6b\u0137\u0199\u01e9\u1e31\u1e33\u1e35\u24da\u2c6a\ua741\ua743\ua745\ua7a3\uff4b\u03ba\u043a",
  "l": "\x6c\u013a\u013c\u013e\u0140\u0142\u017f\u019a\u026b\u1e37\u1e39\u1e3b\u1e3d\u24db\u2c61\ua747\ua749\ua781\uff4c\u03bb\u043b",
  "m": "\x6d\u026f\u0271\u1e3f\u1e41\u1e43\u24dc\uff4d\u03bc\u043c",
  "n": "\x6e\xf1\u0144\u0146\u0148\u0149\u019e\u01f9\u0272\u1e45\u1e47\u1e49\u1e4b\u24dd\ua791\ua7a5\uff4e\u03bd\u043d",
  "o": "\x6f\xf2\xf3\xf4\xf5\xf6\xf8\u014d\u014f\u0151\u01a1\u01d2\u01eb\u01ed\u01ff\u020d\u020f\u022b\u022d\u022f\u0231\u0254\u0275\u1e4d\u1e4f\u1e51\u1e53\u1ecd\u1ecf\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u1edb\u1edd\u1edf\u1ee1\u1ee3\u24de\ua74b\ua74d\uff4f\u03bf\u03cc\u043e",
  "p": "\x70\u01a5\u1d7d\u1e55\u1e57\u24df\ua751\ua753\ua755\uff50\u03c0\u043f",
  "q": "\x71\u024b\u24e0\ua757\ua759\uff51",
  "r": "\x72\u0155\u0157\u0159\u0211\u0213\u024d\u027d\u1e59\u1e5b\u1e5d\u1e5f\u24e1\ua75b\ua783\ua7a7\uff52\u03c1\u0440",
  "s": "\x73\xdf\u015b\u015d\u015f\u0161\u0219\u023f\u1e61\u1e63\u1e65\u1e67\u1e69\u1e9b\u24e2\ua785\ua7a9\uff53\u03c2\u03c3\u0441",
  "t": "\x74\u0163\u0165\u0167\u01ad\u021b\u0288\u1e6b\u1e6d\u1e6f\u1e71\u1e97\u24e3\u2c66\ua787\uff54\u03c4\u0442",
  "u": "\x75\xf9\xfa\xfb\xfc\u0169\u016b\u016d\u016f\u0171\u0173\u01b0\u01d4\u01d6\u01d8\u01da\u01dc\u0215\u0217\u0289\u1e73\u1e75\u1e77\u1e79\u1e7b\u1ee5\u1ee7\u1ee9\u1eeb\u1eed\u1eef\u1ef1\u24e4\uff55\u0443\u044a",
  "v": "\x76\u028b\u028c\u1e7d\u1e7f\u24e5\ua75f\uff56\u0432",
  "w": "\x77\u0175\u1e81\u1e83\u1e85\u1e87\u1e89\u1e98\u24e6\u2c73\uff57\u03c9\u03ce",
  "x": "\x78\u1e8b\u1e8d\u24e7\uff58\u03c7",
  "y": "\x79\xfd\xff\u0177\u01b4\u0233\u024f\u1e8f\u1e99\u1ef3\u1ef5\u1ef7\u1ef9\u1eff\u24e8\uff59\u03b0\u03c5\u03cb\u03cd\u044b",
  "z": "\x7a\u017a\u017c\u017e\u01b6\u0225\u0240\u1e91\u1e93\u1e95\u24e9\u2c6c\ua763\uff5a\u03b6\u0437",
  "OE": "\x8c\u0152",
  "oe": "\x9c\u0153",
  "AE": "\xc6\u01e2\u01fc",
  "ae": "\xe6\u01e3\u01fd",
  "hv": "\u0195",
  "OI": "\u01a2",
  "oi": "\u01a3",
  "DZ": "\u01c4\u01f1",
  "Dz": "\u01c5\u01f2",
  "dz": "\u01c6\u01f3",
  "LJ": "\u01c7",
  "Lj": "\u01c8",
  "lj": "\u01c9",
  "NJ": "\u01ca",
  "Nj": "\u01cb",
  "nj": "\u01cc",
  "OU": "\u0222",
  "ou": "\u0223",
  "TZ": "\ua728",
  "tz": "\ua729",
  "AA": "\ua732",
  "aa": "\ua733",
  "AO": "\ua734",
  "ao": "\ua735",
  "AU": "\ua736",
  "au": "\ua737",
  "AV": "\ua738\ua73a",
  "av": "\ua739\ua73b",
  "AY": "\ua73c",
  "ay": "\ua73d",
  "OO": "\ua74e",
  "oo": "\ua74f",
  "VY": "\ua760",
  "vy": "\ua761",
  "TH": "\xde",
  "th": "\xfe",
  "PS": "\u03a8",
  "ps": "\u03c8",
  "Yo": "\u0401",
  "Ye": "\u0404",
  "Yi": "\u0407",
  "Zh": "\u0416",
  "Ch": "\u0427",
  "Sh": "\u0428\u0429",
  "": "\u042c\u044c",
  "Yu": "\u042e",
  "Ya": "\u042f",
  "zh": "\u0436",
  "ch": "\u0447",
  "sh": "\u0448\u0449",
  "yu": "\u044e",
  "ya": "\u044f",
  "yo": "\u0451",
  "ye": "\u0454",
  "yi": "\u0457"
};

var diacriticsMap = null;

/**
 * Creates a map of the diacritics.
 *
 * @ignore
 * @returns {Object} Returns the diacritics map.
 */
function getDiacriticsMap() {
  if (diacriticsMap !== null) {
    return diacriticsMap;
  }
  diacriticsMap = {};
  Object.keys(diacritics).forEach(function (key) {
    var characters = diacritics[key];
    for (var index = 0; index < characters.length; index++) {
      var character = characters[index];
      diacriticsMap[character] = key;
    }
  });
  return diacriticsMap;
}

/**
 * Get the latin character from character with diacritics.
 *
 * @ignore
 * @param   {string} character The character with diacritics.
 * @returns {string}           Returns the character without diacritics.
 */
function getLatinCharacter(character) {
  var characterWithoutDiacritic = getDiacriticsMap()[character];
  return characterWithoutDiacritic ? characterWithoutDiacritic : character;
}

/**
 * Returns the `cleanCharacter` from combining marks regular expression match.
 *
 * @ignore
 * @param {string} character The character with combining marks
 * @param {string} cleanCharacter The character without combining marks.
 * @return {string} The character without combining marks.
 */
function removeCombiningMarks(character, cleanCharacter) {
  return cleanCharacter;
}

/**
 * Latinises the `subject` by removing diacritic characters.
 *
 * @function latinise
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to latinise.
 * @return {string} Returns the latinised string.
 * @example
 * v.latinise('cafe\u0301'); // or 'café'
 * // => 'cafe'
 *
 * v.latinise('août décembre');
 * // => 'aout decembre'
 *
 * v.latinise('как прекрасен этот мир');
 * // => 'kak prekrasen etot mir'
 */
function latinise(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return subjectString.replace(REGEXP_NON_LATIN, getLatinCharacter).replace(REGEXP_COMBINING_MARKS, removeCombiningMarks);
}

/**
 * Pads `subject` to a new `length`.
 *
 * @function pad
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the padded string.
 * @example
 * v.pad('dog', 5);
 * // => ' dog '
 *
 * v.pad('bird', 6, '-');
 * // => '-bird-'
 *
 * v.pad('cat', 6, '-=');
 * // => '-cat-='
 */
function pad(subject, length, pad) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  var paddingLength = lengthInt - subjectString.length;
  var paddingSideLength = toInteger(paddingLength / 2);
  var paddingSideRemainingLength = paddingLength % 2;
  return buildPadding(padString, paddingSideLength) + subjectString + buildPadding(padString, paddingSideLength + paddingSideRemainingLength);
}

/**
 * Replaces the matches of `pattern` with `replacement`. <br/>
 *
 * @function replace
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} pattern The pattern which match is replaced. If `pattern` is a string,
 * a simple string match is evaluated and only the first occurrence replaced.
 * @param {string|Function} replacement The string or function which invocation result replaces `pattern` match.
 * @return {string} Returns the replacement result.
 * @example
 * v.replace('swan', 'wa', 'u');
 * // => 'sun'
 *
 * v.replace('domestic duck', /domestic\s/, '');
 * // => 'duck'
 *
 * v.replace('nice duck', /(nice)(duck)/, function(match, nice, duck) {
 *   return 'the ' + duck + ' is ' + nice;
 * });
 * // => 'the duck is nice'
 */
function replace(subject, pattern, replacement) {
  var subjectString = coerceToString(subject);
  return subjectString.replace(pattern, replacement);
}

/**
 * Get the flags string from a regular expression object.
 *
 * @ignore
 * @param {RegExp} regExp The regular expression object.
 * @return {string} Returns the string with flags chars.
 */
function getRegExpFlags(regExp) {
  return regExp.toString().match(REGEXP_FLAGS)[0];
}

/**
 * Checks whether `subject` includes `search` starting from `position`.
 *
 * @function includes
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {number} [position=0] The position to start searching.
 * @return {boolean} Returns `true` if `subject` includes `search` or `false` otherwise.
 * @example
 * v.includes('starship', 'star');
 * // => true
 *
 * v.includes('galaxy', 'g', 1);
 * // => false
 */
function includes(subject, search, position) {
  var subjectString = coerceToString(subject);
  var searchString = toString(search);
  if (searchString === null) {
    return false;
  }
  if (searchString === '') {
    return true;
  }
  position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
  return subjectString.indexOf(searchString, position) !== -1;
}

/**
 * Append flag to a regular expression.
 *
 * @ignore
 * @param {RegExp} pattern The pattern to coerce.
 * @param {string} appendFlag The flag to append to regular expression.
 * @return {RegExp} The regular expression with added flag.
 */
function appendFlagToRegExp(pattern, appendFlag) {
  var regularExpressionFlags = getRegExpFlags(pattern);
  if (!includes(regularExpressionFlags, appendFlag)) {
    return new RegExp(pattern.source, regularExpressionFlags + appendFlag);
  }
  return pattern;
}

/**
 * Replaces all matches of `pattern` with `replacement`. <br/>
 *
 * @function replaceAll
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} pattern The pattern which match is replaced. If `pattern` is a string, a simple string match is evaluated.
 * All matches are replaced.
 * @param {string|Function} replacement The string or function which invocation result replaces `pattern` match.
 * @return {string} Returns the replacement result.
 * @example
 * v.replaceAll('good morning', 'o', '*');
 * // => 'g**d m*rning'
 * v.replaceAll('evening', /n/, 's');
 * // => 'evesisg'
 *
 */
function replaceAll(subject, pattern, replacement) {
  var subjectString = coerceToString(subject);
  var regExp = pattern;
  if (!(pattern instanceof RegExp)) {
    regExp = new RegExp(escapeRegExp(pattern), 'g');
  } else if (!pattern.global) {
    regExp = appendFlagToRegExp(pattern, 'g');
  }
  return subjectString.replace(regExp, replacement);
}

/**
 * Reverses the `subject`.
 *
 * @function reverse
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverse('winter');
 * // => 'retniw'
 */
function reverse(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.split('').reverse().join('');
}

/**
 * Reverses the `subject` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function reverseGrapheme
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverseGrapheme('summer');
 * // => 'remmus'
 *
 * v.reverseGrapheme('𝌆 bar mañana mañana');
 * // => 'anañam anañam rab 𝌆'
 */
function reverseGrapheme(subject) {
  var subjectString = coerceToString(subject);
  /**
   * @see https://github.com/mathiasbynens/esrever
   */
  subjectString = subjectString.replace(REGEXP_COMBINING_MARKS, function ($0, $1, $2) {
    return reverseGrapheme($2) + $1;
  }).replace(REGEXP_SURROGATE_PAIRS, '$2$1');
  var reversedString = '';
  var index = subjectString.length;
  while (index--) {
    reversedString += subjectString.charAt(index);
  }
  return reversedString;
}

/**
 * Slugifies the `subject`. Cleans the `subject` by replacing diacritics with corresponding latin characters.
 *
 * @function slugify
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to slugify.
 * @return {string} Returns the slugified string.
 * @example
 * v.slugify('Italian cappuccino drink');
 * // => 'italian-cappuccino-drink'
 *
 * v.slugify('caffé latté');
 * // => 'caffe-latte'
 *
 * v.slugify('хорошая погода');
 * // => 'horoshaya-pogoda'
 */
function slugify(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  var cleanSubjectString = latinise(subjectString).replace(REGEXP_NON_LATIN, '-');
  return kebabCase(cleanSubjectString);
}

/**
 * Changes `subject` by deleting `deleteCount` of characters starting at position `start`. Places a new string
 * `toAdd` instead of deleted characters.
 *
 * @function splice
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string where to insert.
 * @param {string} start The position to start changing the string. For a negative position will start from the end of
 * the string.
 * @param {number} [deleteCount=subject.length-start] The number of characters to delete from string.
 * @param {string} [toAdd=''] The string to be added instead of deleted characters.
 * @return {string} Returns the modified string.
 * @example
 * v.splice('new year', 0, 4);
 * // => 'year'
 *
 * v.splice('new year', 0, 3, 'happy');
 * // => 'happy year'
 *
 * v.splice('new year', -4, 4, 'day');
 * // => 'new day'
 */
function splice(subject, start, deleteCount, toAdd) {
  var subjectString = coerceToString(subject);
  var toAddString = coerceToString(toAdd);
  var startPosition = coerceToNumber(start);
  if (startPosition < 0) {
    startPosition = subjectString.length + startPosition;
    if (startPosition < 0) {
      startPosition = 0;
    }
  } else if (startPosition > subjectString.length) {
    startPosition = subjectString.length;
  }
  var deleteCountNumber = coerceToNumber(deleteCount, subjectString.length - startPosition);
  if (deleteCountNumber < 0) {
    deleteCountNumber = 0;
  }
  return subjectString.slice(0, startPosition) + toAddString + subjectString.slice(startPosition + deleteCountNumber);
}

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Translates characters or replaces substrings in `subject`.
 *
 * @function tr
 * @static
 * @since 1.3.0
 * @memberOf Manipulate
 * @param  {string} [subject=''] The string to translate.
 * @param  {string|Object} from The string of characters to translate from. Or an object, then the object keys are replaced with corresponding values (longest keys are tried first).
 * @param  {string} to The string of characters to translate to. Ignored when `from` is an object.
 * @return {string} Returns the translated string.
 * @example
 * v.tr('hello', 'el', 'ip');
 * // => 'hippo'
 * 
 * v.tr('légèreté', 'éè', 'ee');
 * // => 'legerete'
 * 
 * v.tr('Yes. The fire rises.', {
 *   'Yes': 'Awesome',
 *   'fire': 'flame'
 * })
 * // => 'Awesome. The flame rises.'
 * 
 * v.tr(':where is the birthplace of :what', {
 *   ':where': 'Africa',
 *   ':what': 'Humanity'
 * });
 * // => 'Africa is the birthplace of Humanity'
 * 
 */
function tr(subject, from, to) {
  var subjectString = coerceToString(subject);
  var keys = void 0;
  var values = void 0;
  if (isString(from) && isString(to)) {
    keys = from.split('');
    values = to.split('');
  } else {
    var _extractKeysAndValues = extractKeysAndValues(nilDefault(from, {}));

    var _extractKeysAndValues2 = _slicedToArray(_extractKeysAndValues, 2);

    keys = _extractKeysAndValues2[0];
    values = _extractKeysAndValues2[1];
  }
  var keysLength = keys.length;
  if (keysLength === 0) {
    return subjectString;
  }
  var result = '';
  var valuesLength = values.length;
  for (var index = 0; index < subjectString.length; index++) {
    var isMatch = false;
    var matchValue = void 0;
    for (var keyIndex = 0; keyIndex < keysLength && keyIndex < valuesLength; keyIndex++) {
      var key = keys[keyIndex];
      if (subjectString.substr(index, key.length) === key) {
        isMatch = true;
        matchValue = values[keyIndex];
        index = index + key.length - 1;
        break;
      }
    }
    result += isMatch ? matchValue : subjectString[index];
  }
  return result;
}

function extractKeysAndValues(object) {
  var keys = Object.keys(object);
  var values = keys.sort(sortStringByLength).map(function (key) {
    return object[key];
  });
  return [keys, values];
}

function sortStringByLength(str1, str2) {
  if (str1.length === str2.length) {
    return 0;
  }
  return str1.length < str2.length ? 1 : -1;
}

var reduce$1 = Array.prototype.reduce;

/**
 * Removes whitespaces from the left side of the `subject`.
 *
 * @function trimLeft
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim. List all characters that you want to be stripped.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trimLeft('  Starship Troopers');
 * // => 'Starship Troopers'
 *
 * v.trimLeft('***Mobile Infantry', '*');
 * // => 'Mobile Infantry'
 */
function trimLeft(subject, whitespace$$1) {
  var subjectString = coerceToString(subject);
  if (whitespace$$1 === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace$$1);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEXP_TRIM_LEFT, '');
  }
  var matchWhitespace = true;
  return reduce$1.call(subjectString, function (trimmed, character) {
    if (matchWhitespace && includes(whitespaceString, character)) {
      return trimmed;
    }
    matchWhitespace = false;
    return trimmed + character;
  }, '');
}

var reduceRight = Array.prototype.reduceRight;

/**
 * Removes whitespaces from the right side of the `subject`.
 *
 * @function trimRight
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim. List all characters that you want to be stripped.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trimRight('the fire rises   ');
 * // => 'the fire rises'
 *
 * v.trimRight('do you feel in charge?!!!', '!');
 * // => 'do you feel in charge?'
 */
function trimRight(subject, whitespace$$1) {
  var subjectString = coerceToString(subject);
  if (whitespace$$1 === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace$$1);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEXP_TRIM_RIGHT, '');
  }
  var matchWhitespace = true;
  return reduceRight.call(subjectString, function (trimmed, character) {
    if (matchWhitespace && includes(whitespaceString, character)) {
      return trimmed;
    }
    matchWhitespace = false;
    return character + trimmed;
  }, '');
}

/**
 * Removes whitespaces from left and right sides of the `subject`.
 *
 * @function trim
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim. List all characters that you want to be stripped.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trim(' Mother nature ');
 * // => 'Mother nature'
 *
 * v.trim('--Earth--', '-');
 * // => 'Earth'
 */
function trim(subject, whitespace) {
  var subjectString = coerceToString(subject);
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.trim();
  }
  return trimRight(trimLeft(subjectString, whitespaceString), whitespaceString);
}

var OPTION_WIDTH = 'width';
var OPTION_NEW_LINE = 'newLine';
var OPTION_INDENT = 'indent';
var OPTION_CUT = 'cut';

/**
 * Wraps `subject` to a given number of characters using a string break character.
 *
 * @function wordWrap
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param  {string} [subject=''] The string to wrap.
 * @param  {Object} [options={}] The wrap options.
 * @param  {number} [options.width=75] The number of characters at which to wrap.
 * @param  {string} [options.newLine='\n'] The string to add at the end of line.
 * @param  {string} [options.indent='']  The string to intend the line.
 * @param  {boolean} [options.cut=false] When `false` (default) does not split the word even if word length is bigger than `width`. <br/>
 *                                       When `true` breaks the word that has length bigger than `width`.
 *
 * @return {string} Returns wrapped string.
 * @example
 * v.wordWrap('Hello world', {
 *   width: 5
 * });
 * // => 'Hello\nworld'
 *
 * v.wordWrap('Hello world', {
 *   width: 5,
 *   newLine: '<br/>',
 *   indent: '__'
 * });
 * // => '__Hello<br/>__world'
 *
 * v.wordWrap('Wonderful world', {
 *   width: 5,
 *   cut: true
 * });
 * // => 'Wonde\nrful\nworld'
 *
 */
function wordWrap(subject) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var subjectString = coerceToString(subject);

  var _determineOptions = determineOptions(options),
      width = _determineOptions.width,
      newLine = _determineOptions.newLine,
      indent = _determineOptions.indent,
      cut = _determineOptions.cut;

  if (subjectString === '' || width <= 0) {
    return indent;
  }
  var subjectLength = subjectString.length;
  var substring = subjectString.substring.bind(subjectString);
  var offset = 0;
  var wrappedLine = '';
  while (subjectLength - offset > width) {
    if (subjectString[offset] === ' ') {
      offset++;
      continue;
    }
    var spaceToWrapAt = subjectString.lastIndexOf(' ', width + offset);
    if (spaceToWrapAt >= offset) {
      wrappedLine += indent + substring(offset, spaceToWrapAt) + newLine;
      offset = spaceToWrapAt + 1;
    } else {
      if (cut) {
        wrappedLine += indent + substring(offset, width + offset) + newLine;
        offset += width;
      } else {
        spaceToWrapAt = subjectString.indexOf(' ', width + offset);
        if (spaceToWrapAt >= 0) {
          wrappedLine += indent + substring(offset, spaceToWrapAt) + newLine;
          offset = spaceToWrapAt + 1;
        } else {
          wrappedLine += indent + substring(offset);
          offset = subjectLength;
        }
      }
    }
  }
  if (offset < subjectLength) {
    wrappedLine += indent + substring(offset);
  }
  return wrappedLine;
}

/**
 * Determine the word wrap options. The missing values are filled with defaults.
 *
 * @param  {Object} options  The options object.
 * @return {Object}          The word wrap options, with default settings if necessary.
 * @ignore
 */
function determineOptions(options) {
  return {
    width: coerceToNumber(options[OPTION_WIDTH], 75),
    newLine: coerceToString(options[OPTION_NEW_LINE], '\n'),
    indent: coerceToString(options[OPTION_INDENT], ''),
    cut: coerceToBoolean(options[OPTION_CUT], false)
  };
}

/**
 * Checks whether `subject` ends with `end`.
 *
 * @function endsWith
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} end The ending string.
 * @param {number} [position=subject.length] Search within `subject` as if the string were only `position` long.
 * @return {boolean} Returns `true` if `subject` ends with `end` or `false` otherwise.
 * @example
 * v.endsWith('red alert', 'alert');
 * // => true
 *
 * v.endsWith('metro south', 'metro');
 * // => false
 *
 * v.endsWith('Murphy', 'ph', 5);
 * // => true
 */
function endsWith(subject, end, position) {
  if (isNil(end)) {
    return false;
  }
  var subjectString = coerceToString(subject);
  var endString = coerceToString(end);
  if (endString === '') {
    return true;
  }
  position = isNil(position) ? subjectString.length : clipNumber(toInteger(position), 0, subjectString.length);
  position -= endString.length;
  var lastIndex = subjectString.indexOf(endString, position);
  return lastIndex !== -1 && lastIndex === position;
}

/**
 * Checks whether `subject` contains only alpha characters.
 *
 * @function isAlpha
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only alpha characters or `false` otherwise.
 * @example
 * v.isAlpha('bart');
 * // => true
 *
 * v.isAlpha('lisa!');
 * // => false
 *
 * v.isAlpha('lisa and bart');
 * // => false
 */
function isAlpha(subject) {
  var subjectString = coerceToString(subject);
  return REGEXP_ALPHA.test(subjectString);
}

/**
 * Checks whether `subject` contains only alpha and digit characters.
 *
 * @function isAlphaDigit
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only alpha and digit characters or `false` otherwise.
 * @example
 * v.isAlphaDigit('year2020');
 * // => true
 *
 * v.isAlphaDigit('1448');
 * // => true
 *
 * v.isAlphaDigit('40-20');
 * // => false
 */
function isAlphaDigit(subject) {
  var subjectString = coerceToString(subject);
  return REGEXP_ALPHA_DIGIT.test(subjectString);
}

/**
 * Checks whether `subject` is empty or contains only whitespaces.
 *
 * @function isBlank
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is empty or contains only whitespaces or `false` otherwise.
 * @example
 * v.isBlank('');
 * // => true
 *
 * v.isBlank('  ');
 * // => true
 *
 * v.isBlank('World');
 * // => false
 */
function isBlank(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.trim().length === 0;
}

/**
 * Checks whether `subject` contains only digit characters.
 *
 * @function isDigit
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only digit characters or `false` otherwise.
 * @example
 * v.isDigit('35');
 * // => true
 *
 * v.isDigit('1.5');
 * // => false
 *
 * v.isDigit('ten');
 * // => false
 */
function isDigit(subject) {
  var subjectString = coerceToString(subject);
  return REGEXP_DIGIT.test(subjectString);
}

/**
 * Checks whether `subject` is empty.
 *
 * @function isEmpty
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is empty or `false` otherwise
 * @example
 * v.isEmpty('');
 * // => true
 *
 * v.isEmpty('  ');
 * // => false
 *
 * v.isEmpty('sun');
 * // => false
 */
function isEmpty(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.length === 0;
}

/**
 * Checks whether `subject` has only lower case characters.
 *
 * @function isLowerCase
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is lower case or `false` otherwise.
 * @example
 * v.isLowerCase('motorcycle');
 * // => true
 *
 * v.isLowerCase('John');
 * // => false
 *
 * v.isLowerCase('T1000');
 * // => false
 */
function isLowerCase(subject) {
  var valueString = coerceToString(subject);
  return isAlpha(valueString) && valueString.toLowerCase() === valueString;
}

/**
 * Checks whether `subject` is numeric.
 *
 * @function isNumeric
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is numeric or `false` otherwise.
 * @example
 * v.isNumeric('350');
 * // => true
 *
 * v.isNumeric('-20.5');
 * // => true
 *
 * v.isNumeric('1.5E+2');
 * // => true
 *
 * v.isNumeric('five');
 * // => false
 */
function isNumeric(subject) {
  var valueNumeric = typeof subject === 'object' && !isNil(subject) ? Number(subject) : subject;
  return (typeof valueNumeric === 'number' || typeof valueNumeric === 'string') && !isNaN(valueNumeric - parseFloat(valueNumeric));
}

/**
 * Checks whether `subject` contains only upper case characters.
 *
 * @function isUpperCase
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is upper case or `false` otherwise.
 * @example
 * v.isUpperCase('ACDC');
 * // => true
 *
 * v.isUpperCase('Morning');
 * // => false
 */
function isUpperCase(subject) {
  var subjectString = coerceToString(subject);
  return isAlpha(subjectString) && subjectString.toUpperCase() === subjectString;
}

/**
 * Checks whether `subject` matches the regular expression `pattern`.
 *
 * @function matches
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {RegExp|string} pattern The pattern to match. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
 * @return {boolean} Returns `true` if `subject` matches `pattern` or `false` otherwise.
 * @example
 * v.matches('pluto', /plu.{2}/);
 * // => true
 *
 * v.matches('sun', 'S', 'i');
 * // => true
 *
 * v.matches('apollo 11', '\\d{3}');
 * // => false
 */
function matches(subject, pattern, flags) {
  var subjectString = coerceToString(subject);
  var flagsString = coerceToString(flags);
  var patternString = void 0;
  if (!(pattern instanceof RegExp)) {
    patternString = toString(pattern);
    if (patternString === null) {
      return false;
    }
    pattern = new RegExp(patternString, flagsString);
  }
  return pattern.test(subjectString);
}

/**
 * Checks whether `subject` starts with `start`.
 *
 * @function startsWith
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} start The starting string.
 * @param {number} [position=0] The position to start searching.
 * @return {boolean} Returns `true` if `subject` starts with `start` or `false` otherwise.
 * @example
 * v.startsWith('say hello to my little friend', 'say hello');
 * // => true
 *
 * v.startsWith('tony', 'on', 1);
 * // => true
 *
 * v.startsWith('the world is yours', 'world');
 * // => false
 */
function startsWith(subject, start, position) {
  var subjectString = coerceToString(subject);
  var startString = toString(start);
  if (startString === null) {
    return false;
  }
  if (startString === '') {
    return true;
  }
  position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
  return subjectString.substr(position, startString.length) === startString;
}

/**
 * Splits `subject` into an array of characters.
 *
 * @function chars
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of characters.
 * @example
 * v.chars('cloud');
 * // => ['c', 'l', 'o', 'u', 'd']
 */
function chars(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.split('');
}

/**
 * Returns an array of Unicode code point values from characters of `subject`.
 *
 * @function codePoints
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param  {string} [subject=''] The string to extract from.
 * @return {Array} Returns an array of non-negative numbers less than or equal to `0x10FFFF`.
 * @example
 * v.codePoints('rain');
 * // => [114, 97, 105, 110], or
 * //    [0x72, 0x61, 0x69, 0x6E]
 *
 * v.codePoints('\uD83D\uDE00 smile'); // or '😀 smile'
 * // => [128512, 32, 115, 109, 105, 108, 101], or
 * //    [0x1F600, 0x20, 0x73, 0x6D, 0x69, 0x6C, 0x65]
 */
function codePoints(subject) {
  var subjectString = coerceToString(subject);
  var subjectStringLength = subjectString.length;
  var codePointArray = [];
  var index = 0;
  var codePointNumber = void 0;
  while (index < subjectStringLength) {
    codePointNumber = codePointAt(subjectString, index);
    codePointArray.push(codePointNumber);
    index += codePointNumber > 0xFFFF ? 2 : 1;
  }
  return codePointArray;
}

/**
 * Splits `subject` into an array of graphemes taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function graphemes
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of graphemes.
 * @example
 * v.graphemes('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => ['\uD835\uDC00', '\uD835\uDC01'], or
 * //    ['𝐀', '𝐁']
 *
 * v.graphemes('cafe\u0301'); // or 'café'
 * // => ['c', 'a', 'f', 'e\u0301'], or
 * //    ['c', 'a', 'f', 'é']
 */
function graphemes(subject) {
  var subjectString = coerceToString(subject);
  return nilDefault(subjectString.match(REGEXP_UNICODE_CHARACTER), []);
}

/**
 * Splits `subject` into an array of chunks by `separator`.
 *
 * @function split
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @param {string|RegExp} [separator] The pattern to match the separator.
 * @param {number} [limit] Limit the number of chunks to be found.
 * @return {Array} Returns the array of chunks.
 * @example
 * v.split('rage against the dying of the light', ' ');
 * // => ['rage', 'against', 'the', 'dying', 'of', 'the', 'light']
 *
 * v.split('the dying of the light', /\s/, 3);
 * // => ['the', 'dying', 'of']
 */
function split(subject, separator, limit) {
  var subjectString = coerceToString(subject);
  return subjectString.split(separator, limit);
}

var BYRE_ORDER_MARK = '\uFEFF';

/**
 * Strips the byte order mark (BOM) from the beginning of `subject`.
 *
 * @function stripBom
 * @static
 * @since 1.2.0
 * @memberOf Strip
 * @param {string} [subject=''] The string to strip from.
 * @return {string} Returns the stripped string.
 * @example
 *
 * v.stripBom('\uFEFFsummertime sadness');
 * // => 'summertime sadness'
 *
 * v.stripBom('summertime happiness');
 * // => 'summertime happiness'
 *
 */
function trim$1(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  if (subjectString[0] === BYRE_ORDER_MARK) {
    return subjectString.substring(1);
  }
  return subjectString;
}

/**
 * Checks whether `subject` contains substring at specific `index`.
 *
 * @ignore
 * @param {string} subject The subject to search in.
 * @param {string} substring The substring to search/
 * @param {number} index The index to search substring.
 * @param {boolean} lookBehind Whether to look behind (true) or ahead (false).
 * @return {boolean} Returns a boolean whether the substring exists.
 */
function hasSubstringAtIndex(subject, substring, index) {
  var lookBehind = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var indexOffset = 0;
  if (lookBehind) {
    indexOffset = -substring.length + 1;
  }
  var extractedSubstring = subject.substr(index + indexOffset, substring.length);
  return extractedSubstring.toLowerCase() === substring;
}

/**
 * Parses the tags from the string '<tag1><tag2>...<tagN>'.
 *
 * @ignore
 * @param {string} tags The string that contains the tags.
 * @return {string[]} Returns the array of tag names.
 */
function parseTagList(tags) {
  var tagsList = [];
  var match = void 0;
  while ((match = REGEXP_TAG_LIST.exec(tags)) !== null) {
    tagsList.push(match[1]);
  }
  return tagsList;
}

var STATE_START_TAG = 0;
var STATE_NON_WHITESPACE = 1;
var STATE_DONE = 2;

/**
 * Parses the tag name from html content.
 *
 * @ignore
 * @param {string} tagContent The tag content.
 * @return {string} Returns the tag name.
 */
function parseTagName(tagContent) {
  var state = STATE_START_TAG;
  var tagName = '';
  var index = 0;
  while (state !== STATE_DONE) {
    var char = tagContent[index++].toLowerCase();
    switch (char) {
      case '<':
        break;
      case '>':
        state = STATE_DONE;
        break;
      default:
        if (REGEXP_WHITESPACE.test(char)) {
          if (state === STATE_NON_WHITESPACE) {
            state = STATE_DONE;
          }
        } else {
          if (state === STATE_START_TAG) {
            state = STATE_NON_WHITESPACE;
          }
          if (char !== '/') {
            tagName += char;
          }
        }
        break;
    }
  }
  return tagName;
}

var STATE_OUTPUT = 0;
var STATE_HTML = 1;
var STATE_EXCLAMATION = 2;
var STATE_COMMENT = 3;

/**
 * Strips HTML tags from `subject`.
 *
 * @function stripTags
 * @static
 * @since 1.1.0
 * @memberOf Strip
 * @param {string} [subject=''] The string to strip from.
 * @param {string|Array} [allowableTags] The string `'<tag1><tag2>'` or array `['tag1', 'tag2']` of tags that should not be stripped.
 * @param {string} [replacement=''] The string to replace the stripped tag.
 * @return {string} Returns the stripped string.
 * @example
 *
 * v.stripTags('<span><a href="#">Summer</a> is nice</span>');
 * // => 'Summer is nice'
 *
 * v.stripTags('<span><i>Winter</i> is <b>cold</b></span>', ['b', 'i']);
 * // => '<i>Winter</i> is <b>cold</b>'
 *
 * v.stripTags('Sun<br/>set', '', '-');
 * // => 'Sun-set'
 */
function trim$2(subject, allowableTags, replacement) {
  subject = coerceToString(subject);
  if (subject === '') {
    return '';
  }
  if (!Array.isArray(allowableTags)) {
    var allowableTagsString = coerceToString(allowableTags);
    allowableTags = allowableTagsString === '' ? [] : parseTagList(allowableTagsString);
  }
  var replacementString = coerceToString(replacement);
  var length = subject.length;
  var hasAllowableTags = allowableTags.length > 0;
  var hasSubstring = hasSubstringAtIndex.bind(null, subject);
  var state = STATE_OUTPUT;
  var depth = 0;
  var output = '';
  var tagContent = '';
  var quote = null;
  for (var index = 0; index < length; index++) {
    var char = subject[index];
    var advance = false;
    switch (char) {
      case '<':
        if (quote) {
          break;
        }
        if (hasSubstring('< ', index, false)) {
          advance = true;
          break;
        }
        if (state === STATE_OUTPUT) {
          advance = true;
          state = STATE_HTML;
          break;
        }
        if (state === STATE_HTML) {
          depth++;
          break;
        }
        advance = true;
        break;
      case '!':
        if (state === STATE_HTML && hasSubstring('<!', index)) {
          state = STATE_EXCLAMATION;
          break;
        }
        advance = true;
        break;
      case '-':
        if (state === STATE_EXCLAMATION && hasSubstring('!--', index)) {
          state = STATE_COMMENT;
          break;
        }
        advance = true;
        break;
      case '"':
      case "'":
        if (state === STATE_HTML) {
          if (quote === char) {
            quote = null;
          } else if (!quote) {
            quote = char;
          }
        }
        advance = true;
        break;
      case 'E':
      case 'e':
        if (state === STATE_EXCLAMATION && hasSubstring('doctype', index)) {
          state = STATE_HTML;
          break;
        }
        advance = true;
        break;
      case '>':
        if (depth > 0) {
          depth--;
          break;
        }
        if (quote) {
          break;
        }
        if (state === STATE_HTML) {
          quote = null;
          state = STATE_OUTPUT;
          if (hasAllowableTags) {
            tagContent += '>';
            var tagName = parseTagName(tagContent);
            if (allowableTags.indexOf(tagName.toLowerCase()) !== -1) {
              output += tagContent;
            } else {
              output += replacementString;
            }
            tagContent = '';
          } else {
            output += replacementString;
          }
          break;
        }
        if (state === STATE_EXCLAMATION || state === STATE_COMMENT && hasSubstring('-->', index)) {
          quote = null;
          state = STATE_OUTPUT;
          tagContent = '';
          break;
        }
        advance = true;
        break;
      default:
        advance = true;
    }
    if (advance) {
      switch (state) {
        case STATE_OUTPUT:
          output += char;
          break;
        case STATE_HTML:
          if (hasAllowableTags) {
            tagContent += char;
          }
          break;
      }
    }
  }
  return output;
}

var globalObject$1 = null;

function getGlobalObject() {
  if (globalObject$1 !== null) {
    return globalObject$1;
  }
  /* istanbul ignore next */
  // It's hard to mock the global variables. This code surely works fine. I hope :)
  if (typeof global === 'object' && global.Object === Object) {
    // NodeJS global object
    globalObject$1 = global;
  } else if (typeof self === 'object' && self.Object === Object) {
    // self property from Window object
    globalObject$1 = self;
  } else {
    // Other cases. Function constructor always has the context as global object
    globalObject$1 = new Function('return this')();
  }
  return globalObject$1;
}

var globalObject = getGlobalObject();
var previousV = globalObject.v;

/**
 * Restores `v` variable to previous value and returns Voca library instance.
 *
 * @function noConflict
 * @static
 * @since 1.0.0
 * @memberOf Util
 * @return {Object} Returns Voca library instance.
 * @example
 * var voca = v.noConflict();
 * voca.isAlpha('Hello');
 * // => true
 */
function noConflict() {
  if (this === globalObject.v) {
    globalObject.v = previousV;
  }
  return this;
}

/**
 * A property that contains the library <a href="http://semver.org/">semantic version number</a>.
 * @name version
 * @static
 * @since 1.0.0
 * @memberOf Util
 * @type string
 * @example
 * v.version
 * // => '1.4.0'
 */
var version = '1.4.0';

/* eslint sort-imports: "off" */

/**
 * Functions to change the case
 * @namespace Case
 */
/**
 * Chain functions
 * @namespace Chain
 */

/**
 * Functions to cut a string
 * @namespace Chop
 */
/**
 * Functions to count characters in a string
 * @namespace Count
 */
/**
 * Functions to format
 * @namespace Format
 */
/**
 * Functions to escape RegExp special characters
 * @namespace Escape
 */
/**
 * Functions to find index
 * @namespace Index
 */
/**
 * Functions to manipulate a string
 * @namespace Manipulate
 */
/**
 * Functions to query a string
 * @namespace Query
 */
/**
 * Functions to split a string
 * @namespace Split
 */
/**
 * Functions to strip a string
 * @namespace Strip
 */
/**
 * Util functions and properties
 * @namespace Util
 */
var functions = {
  camelCase: camelCase,
  capitalize: capitalize,
  decapitalize: decapitalize,
  kebabCase: kebabCase,
  lowerCase: lowerCase,
  snakeCase: snakeCase,
  swapCase: swapCase,
  titleCase: titleCase,
  upperCase: upperCase,

  count: count,
  countGraphemes: countGrapheme,
  countSubstrings: countSubstrings,
  countWhere: countWhere,
  countWords: countWords,

  escapeHtml: escapeHtml,
  escapeRegExp: escapeRegExp,
  unescapeHtml: unescapeHtml,

  sprintf: sprintf,
  vprintf: vprintf,

  indexOf: indexOf,
  lastIndexOf: lastIndexOf,
  search: search,

  charAt: charAt,
  codePointAt: codePointAt,
  first: first,
  graphemeAt: graphemeAt,
  last: last,
  prune: prune,
  slice: slice,
  substr: substr,
  substring: substring,
  truncate: truncate,

  insert: insert,
  latinise: latinise,
  pad: pad,
  padLeft: padLeft,
  padRight: padRight,
  repeat: repeat,
  replace: replace,
  replaceAll: replaceAll,
  reverse: reverse,
  reverseGrapheme: reverseGrapheme,
  slugify: slugify,
  splice: splice,
  tr: tr,
  trim: trim,
  trimLeft: trimLeft,
  trimRight: trimRight,
  wordWrap: wordWrap,

  endsWith: endsWith,
  includes: includes,
  isAlpha: isAlpha,
  isAlphaDigit: isAlphaDigit,
  isBlank: isBlank,
  isDigit: isDigit,
  isEmpty: isEmpty,
  isLowerCase: isLowerCase,
  isNumeric: isNumeric,
  isString: isString,
  isUpperCase: isUpperCase,
  matches: matches,
  startsWith: startsWith,

  chars: chars,
  codePoints: codePoints,
  graphemes: graphemes,
  split: split,
  words: words,

  stripBom: trim$1,
  stripTags: trim$2,

  noConflict: noConflict,
  version: version
};

/**
 * The chain wrapper constructor.
 *
 * @ignore
 * @param  {string}       subject               The string to be wrapped.
 * @param  {boolean}      [explicitChain=false] A boolean that indicates if the chain sequence is explicit or implicit.
 * @return {ChainWrapper}                       Returns a new instance of `ChainWrapper`
 * @constructor
 */
function ChainWrapper(subject, explicitChain) {
  this._wrappedValue = subject;
  this._explicitChain = explicitChain;
}

/**
 * Unwraps the chain sequence wrapped value.
 *
 * @memberof Chain
 * @since 1.0.0
 * @function __proto__value
 * @return {*} Returns the unwrapped value.
 * @example
 * v
 *  .chain('Hello world')
 *  .replace('Hello', 'Hi')
 *  .lowerCase()
 *  .slugify()
 *  .value()
 * // => 'hi-world'
 *
 * v(' Space travel ')
 *  .trim()
 *  .truncate(8)
 *  .value()
 * // => 'Space...'
 */
ChainWrapper.prototype.value = function () {
  return this._wrappedValue;
};

/**
 * Override the default object valueOf().
 *
 * @ignore
 * @return {*} Returns the wrapped value.
 */
ChainWrapper.prototype.valueOf = function () {
  return this.value();
};

/**
 * Returns the wrapped value to be used in JSON.stringify().
 *
 * @ignore
 * @return {*} Returns the wrapped value.
 */
ChainWrapper.prototype.toJSON = function () {
  return this.value();
};

/**
 * Returns the string representation of the wrapped value.
 *
 * @ignore
 * @return {string} Returns the string representation.
 */
ChainWrapper.prototype.toString = function () {
  return String(this.value());
};

/**
 * Creates a new chain object that enables <i>explicit</i> chain sequences.
 * Use `v.prototype.value()` to unwrap the result. <br/>
 * Does not modify the wrapped value.
 *
 * @memberof Chain
 * @since 1.0.0
 * @function __proto__chain
 * @return {Object} Returns the wrapper in <i>explicit</i> mode.
 * @example
 * v('Back to School')
 *  .chain()
 *  .lowerCase()
 *  .words()
 *  .value()
 * // => ['back', 'to', 'school']
 *
 * v(" Back to School ")
 *  .chain()
 *  .trim()
 *  .truncate(7)
 *  .value()
 * // => 'Back...'
 */
ChainWrapper.prototype.chain = function () {
  return new ChainWrapper(this._wrappedValue, true);
};

/**
 * Modifies the wrapped value with the invocation result of `changer` function. The current wrapped value is the
 * argument of `changer` invocation.
 *
 * @memberof Chain
 * @since 1.0.0
 * @function __proto__thru
 * @param  {Function} changer The function to invoke.
 * @return {Object}           Returns the new wrapper that wraps the invocation result of `changer`.
 * @example
 * v
 *  .chain('sun is shining')
 *  .words()
 *  .thru(function(words) {
 *    return words[0];
 *  })
 *  .value()
 * // => 'sun'
 *
 */
ChainWrapper.prototype.thru = function (changer) {
  if (typeof changer === 'function') {
    return new ChainWrapper(changer(this._wrappedValue), this._explicitChain);
  }
  return this;
};

/**
 * A boolean that indicates if the chain sequence is explicit or implicit.
 * @ignore
 * @type {boolean}
 * @private
 */
ChainWrapper.prototype._explicitChain = true;

/**
 * Make a voca function chainable.
 *
 * @ignore
 * @param  {Function} functionInstance The function to make chainable
 * @return {Function}                  Returns the chainable function
 */
function makeFunctionChainable(functionInstance) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var result = functionInstance.apply(undefined, [this._wrappedValue].concat(args));
    if (this._explicitChain || typeof result === 'string') {
      return new ChainWrapper(result, this._explicitChain);
    } else {
      return result;
    }
  };
}

Object.keys(functions).forEach(function (name) {
  ChainWrapper.prototype[name] = makeFunctionChainable(functions[name]);
});

/**
 * Creates a chain object that wraps `subject`, enabling <i>explicit</i> chain sequences. <br/>
 * Use `v.prototype.value()` to unwrap the result.
 *
 * @memberOf Chain
 * @since 1.0.0
 * @function chain
 * @param  {string} subject The string to wrap.
 * @return {Object}         Returns the new wrapper object.
 * @example
 * v
 *  .chain('Back to School')
 *  .lowerCase()
 *  .words()
 *  .value()
 * // => ['back', 'to', 'school']
 */
function chain(subject) {
  return new ChainWrapper(subject, true);
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Creates a chain object that wraps `subject`, enabling <i>implicit</i> chain sequences.<br/>
 * A function that returns `number`, `boolean` or `array` type <i>terminates</i> the chain sequence and returns the unwrapped value.
 * Otherwise use `v.prototype.value()` to unwrap the result.
 *
 * @memberOf Chain
 * @since 1.0.0
 * @function v
 * @param {string} subject The string to wrap.
 * @return {Object}  Returns the new wrapper object.
 * @example
 * v('Back to School')
 *  .lowerCase()
 *  .words()
 * // => ['back', 'to', 'school']
 *
 * v(" Back to School ")
 *  .trim()
 *  .truncate(7)
 *  .value()
 * // => 'Back...'
 */
function Voca(subject) {
  return new ChainWrapper(subject, false);
}

_extends(Voca, functions, {
  chain: chain
});

return Voca;

})));
