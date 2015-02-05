/*
YUI 3.17.0 (build ce55cc9)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('datatype-number-parse', function (Y, NAME) {

/**
 * Parse number submodule.
 *
 * @module datatype-number
 * @submodule datatype-number-parse
 * @for Number
 */

var safe = Y.Escape.regex,
    SPACES = '\\s*';

Y.mix(Y.namespace("Number"), {
    /**
     * Returns a parsing function for the given configuration.
     * It uses `Y.cached` so it expects the format spec separated into
     * individual values.
     * The method further uses closure to put together and save the
     * regular expresssion just once in the outer function.
     *
     * @method _buildParser
     * @param [prefix] {String} Prefix string to be stripped out.
     * @param [suffix] {String} Suffix string to be stripped out.
     * @param [separator] {String} Thousands separator to be stripped out.
     * @param [decimal] {String} Decimal separator to be replaced by a dot.
     * @return {Function} Parsing function.
     * @private
     */
    _buildParser: Y.cached(function (prefix, suffix, separator, decimal) {
        var regexBits = [],
            regex;

        if (prefix) {
            regexBits.push('^' + SPACES + safe(prefix) + SPACES);
        }
        if (suffix) {
            regexBits.push(SPACES + safe(suffix) + SPACES + '$');
        }
        if (separator) {
            regexBits.push(safe(separator) + '(?=\\d)');
        }

        regex = new RegExp('(?:' + regexBits.join('|') + ')', 'g');

        if (decimal === '.') {
            decimal = null;
        }
        return function (val) {
            val = val.replace(regex, '');

            return decimal ? val.replace(decimal, '.') : val;
        };
    }),
    /**
     * Converts data to type Number.
     * If a `config` argument is used, it will strip the `data` of the prefix,
     * the suffix and the thousands separator, if any of them are found,
     * replace the decimal separator by a dot and parse the resulting string.
     * Extra whitespace around the prefix and suffix will be ignored.
     *
     * @method parse
     * @param data {String | Number | Boolean} Data to convert. The following
     * values return as null: null, undefined, NaN, "".
     * @param [config] {Object} Optional configuration values, same as for [Y.Date.format](#method_format).
     * @param [config.prefix] {String} String to be removed from the start, like a currency designator "$"
     * @param [config.decimalPlaces] {Number} Ignored, it is accepted only for compatibility with [Y.Date.format](#method_format).
     * @param [config.decimalSeparator] {String} Decimal separator.
     * @param [config.thousandsSeparator] {String} Thousands separator.
     * @param [config.suffix] {String} String to be removed from the end of the number, like " items".
     * @return {Number} A number, or null.
     */

    parse: function(data, config) {
        var parser;

        if (config && typeof data === 'string') {
            parser = this._buildParser(config.prefix, config.suffix, config.thousandsSeparator, config.decimalSeparator);

            data = parser(data);
        }

        if (typeof data === 'string' && Y.Lang.trim(data) !== '') {
            data = +data;
        }
        
        // catch NaN and ±Infinity
        if (typeof data !== 'number' || !isFinite(data)) {
            data = null;
        }

        // on the same line to get stripped for raw/min.js by build system

        return data;
    }
});

// Add Parsers shortcut
Y.namespace("Parsers").number = Y.Number.parse;
Y.namespace("DataType");
Y.DataType.Number = Y.Number;


}, '3.17.0', {"requires": ["escape"]});
