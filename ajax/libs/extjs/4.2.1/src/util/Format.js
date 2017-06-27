/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
// @tag extras,core
// @require ../Ext-more.js
// @define Ext.util.Format

/**
 * @class Ext.util.Format
 *  
 * This class is a centralized place for formatting functions. It includes
 * functions to format various different types of data, such as text, dates and numeric values.
 *  
 * ## Localization
 *
 * This class contains several options for localization. These can be set once the library has loaded,
 * all calls to the functions from that point will use the locale settings that were specified.
 *
 * Options include:
 *
 * - thousandSeparator
 * - decimalSeparator
 * - currenyPrecision
 * - currencySign
 * - currencyAtEnd
 *
 * This class also uses the default date format defined here: {@link Ext.Date#defaultFormat}.
 *
 * ## Using with renderers
 *
 * There are two helper functions that return a new function that can be used in conjunction with
 * grid renderers:
 *  
 *     columns: [{
 *         dataIndex: 'date',
 *         renderer: Ext.util.Format.dateRenderer('Y-m-d')
 *     }, {
 *         dataIndex: 'time',
 *         renderer: Ext.util.Format.numberRenderer('0.000')
 *     }]
 *  
 * Functions that only take a single argument can also be passed directly:
 *
 *     columns: [{
 *         dataIndex: 'cost',
 *         renderer: Ext.util.Format.usMoney
 *     }, {
 *         dataIndex: 'productCode',
 *         renderer: Ext.util.Format.uppercase
 *     }]
 *  
 * ## Using with XTemplates
 *
 * XTemplates can also directly use Ext.util.Format functions:
 *  
 *     new Ext.XTemplate([
 *         'Date: {startDate:date("Y-m-d")}',
 *         'Cost: {cost:usMoney}'
 *     ]);
 *
 * @singleton
 */
(function() {
    Ext.ns('Ext.util');

    var UtilFormat     = Ext.util.Format = {},
        stripTagsRE    = /<\/?[^>]+>/gi,
        stripScriptsRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
        nl2brRe        = /\r?\n/g,
        allHashes      = /^#+$/,

        // Match a format string characters to be able to detect remaining "literal" characters
        formatPattern = /[\d,\.#]+/,

        // A RegExp to remove from a number format string, all characters except digits and '.'
        formatCleanRe  = /[^\d\.#]/g,

        // A RegExp to remove from a number format string, all characters except digits and the local decimal separator.
        // Created on first use. The local decimal separator character must be initialized for this to be created.
        I18NFormatCleanRe,

        // Cache ofg number formatting functions keyed by format string
        formatFns = {};

    Ext.apply(UtilFormat, {
        //<locale>
        /**
         * @property {String} thousandSeparator
         * The character that the {@link #number} function uses as a thousand separator.
         *
         * This may be overridden in a locale file.
         */
        thousandSeparator: ',',
        //</locale>

        //<locale>
        /**
         * @property {String} decimalSeparator
         * The character that the {@link #number} function uses as a decimal point.
         *
         * This may be overridden in a locale file.
         */
        decimalSeparator: '.',
        //</locale>

        //<locale>
        /**
         * @property {Number} currencyPrecision
         * The number of decimal places that the {@link #currency} function displays.
         *
         * This may be overridden in a locale file.
         */
        currencyPrecision: 2,
        //</locale>

         //<locale>
        /**
         * @property {String} currencySign
         * The currency sign that the {@link #currency} function displays.
         *
         * This may be overridden in a locale file.
         */
        currencySign: '$',
        //</locale>

        //<locale>
        /**
         * @property {Boolean} currencyAtEnd
         * This may be set to <code>true</code> to make the {@link #currency} function
         * append the currency sign to the formatted value.
         *
         * This may be overridden in a locale file.
         */
        currencyAtEnd: false,
        //</locale>

        /**
         * Checks a reference and converts it to empty string if it is undefined.
         * @param {Object} value Reference to check
         * @return {Object} Empty string if converted, otherwise the original value
         */
        undef : function(value) {
            return value !== undefined ? value : "";
        },

        /**
         * Checks a reference and converts it to the default value if it's empty.
         * @param {Object} value Reference to check
         * @param {String} [defaultValue=""] The value to insert of it's undefined.
         * @return {String}
         */
        defaultValue : function(value, defaultValue) {
            return value !== undefined && value !== '' ? value : defaultValue;
        },

        /**
         * Returns a substring from within an original string.
         * @param {String} value The original text
         * @param {Number} start The start index of the substring
         * @param {Number} length The length of the substring
         * @return {String} The substring
         * @method
         */
        substr : 'ab'.substr(-1) != 'b'
        ? function (value, start, length) {
            var str = String(value);
            return (start < 0)
                ? str.substr(Math.max(str.length + start, 0), length)
                : str.substr(start, length);
        }
        : function(value, start, length) {
            return String(value).substr(start, length);
        },

        /**
         * Converts a string to all lower case letters.
         * @param {String} value The text to convert
         * @return {String} The converted text
         */
        lowercase : function(value) {
            return String(value).toLowerCase();
        },

        /**
         * Converts a string to all upper case letters.
         * @param {String} value The text to convert
         * @return {String} The converted text
         */
        uppercase : function(value) {
            return String(value).toUpperCase();
        },

        /**
         * Format a number as US currency.
         * @param {Number/String} value The numeric value to format
         * @return {String} The formatted currency string
         */
        usMoney : function(v) {
            return UtilFormat.currency(v, '$', 2);
        },

        /**
         * Format a number as a currency.
         * @param {Number/String} value The numeric value to format
         * @param {String} [sign] The currency sign to use (defaults to {@link #currencySign})
         * @param {Number} [decimals] The number of decimals to use for the currency
         * (defaults to {@link #currencyPrecision})
         * @param {Boolean} [end] True if the currency sign should be at the end of the string
         * (defaults to {@link #currencyAtEnd})
         * @return {String} The formatted currency string
         */
        currency: function(v, currencySign, decimals, end) {
            var negativeSign = '',
                format = ",0",
                i = 0;
            v = v - 0;
            if (v < 0) {
                v = -v;
                negativeSign = '-';
            }
            decimals = Ext.isDefined(decimals) ? decimals : UtilFormat.currencyPrecision;
            format += (decimals > 0 ? '.' : '');
            for (; i < decimals; i++) {
                format += '0';
            }
            v = UtilFormat.number(v, format);
            if ((end || UtilFormat.currencyAtEnd) === true) {
                return Ext.String.format("{0}{1}{2}", negativeSign, v, currencySign || UtilFormat.currencySign);
            } else {
                return Ext.String.format("{0}{1}{2}", negativeSign, currencySign || UtilFormat.currencySign, v);
            }
        },

        /**
         * Formats the passed date using the specified format pattern.
         * @param {String/Date} value The value to format. If a string is passed, it is converted to a Date
         * by the Javascript's built-in Date#parse method.
         * @param {String} [format] Any valid date format string. Defaults to {@link Ext.Date#defaultFormat}.
         * @return {String} The formatted date string.
         */
        date: function(v, format) {
            if (!v) {
                return "";
            }
            if (!Ext.isDate(v)) {
                v = new Date(Date.parse(v));
            }
            return Ext.Date.dateFormat(v, format || Ext.Date.defaultFormat);
        },

        /**
         * Returns a date rendering function that can be reused to apply a date format multiple times efficiently.
         * @param {String} format Any valid date format string. Defaults to {@link Ext.Date#defaultFormat}.
         * @return {Function} The date formatting function
         */
        dateRenderer : function(format) {
            return function(v) {
                return UtilFormat.date(v, format);
            };
        },

        /**
         * Strips all HTML tags.
         * @param {Object} value The text from which to strip tags
         * @return {String} The stripped text
         */
        stripTags : function(v) {
            return !v ? v : String(v).replace(stripTagsRE, "");
        },

        /**
         * Strips all script tags.
         * @param {Object} value The text from which to strip script tags
         * @return {String} The stripped text
         */
        stripScripts : function(v) {
            return !v ? v : String(v).replace(stripScriptsRe, "");
        },

        /**
         * Simple format for a file size (xxx bytes, xxx KB, xxx MB).
         * @param {Number/String} size The numeric value to format
         * @return {String} The formatted file size
         */
        fileSize : (function(){
            var byteLimit = 1024,
                kbLimit = 1048576,
                mbLimit = 1073741824;
                
            return function(size) {
                var out;
                if (size < byteLimit) {
                    if (size === 1) {
                        out = '1 byte';    
                    } else {
                        out = size + ' bytes';
                    }
                } else if (size < kbLimit) {
                    out = (Math.round(((size*10) / byteLimit))/10) + ' KB';
                } else if (size < mbLimit) {
                    out = (Math.round(((size*10) / kbLimit))/10) + ' MB';
                } else {
                    out = (Math.round(((size*10) / mbLimit))/10) + ' GB';
                }
                return out;
            };
        })(),

        /**
         * It does simple math for use in a template, for example:
         *
         *     var tpl = new Ext.Template('{value} * 10 = {value:math("* 10")}');
         *
         * @return {Function} A function that operates on the passed value.
         * @method
         */
        math : (function(){
            var fns = {};

            return function(v, a){
                if (!fns[a]) {
                    fns[a] = Ext.functionFactory('v', 'return v ' + a + ';');
                }
                return fns[a](v);
            };
        }()),

        /**
         * Rounds the passed number to the required decimal precision.
         * @param {Number/String} value The numeric value to round.
         * @param {Number} precision The number of decimal places to which to round the first parameter's value.
         * @return {Number} The rounded value.
         */
        round : function(value, precision) {
            var result = Number(value);
            if (typeof precision == 'number') {
                precision = Math.pow(10, precision);
                result = Math.round(value * precision) / precision;
            }
            return result;
        },

        /**
         * Formats the passed number according to the passed format string.
         *
         * The number of digits after the decimal separator character specifies the number of
         * decimal places in the resulting string. The *local-specific* decimal character is
         * used in the result.
         *
         * The *presence* of a thousand separator character in the format string specifies that
         * the *locale-specific* thousand separator (if any) is inserted separating thousand groups.
         *
         * By default, "," is expected as the thousand separator, and "." is expected as the decimal separator.
         *
         * ## New to Ext JS 4
         *
         * Locale-specific characters are always used in the formatted output when inserting
         * thousand and decimal separators.
         *
         * The format string must specify separator characters according to US/UK conventions ("," as the
         * thousand separator, and "." as the decimal separator)
         *
         * To allow specification of format strings according to local conventions for separator characters, add
         * the string `/i` to the end of the format string.
         *
         * examples (123456.789):
         * 
         * - `0` - (123456) show only digits, no precision
         * - `0.00` - (123456.78) show only digits, 2 precision
         * - `0.0000` - (123456.7890) show only digits, 4 precision
         * - `0,000` - (123,456) show comma and digits, no precision
         * - `0,000.00` - (123,456.78) show comma and digits, 2 precision
         * - `0,0.00` - (123,456.78) shortcut method, show comma and digits, 2 precision
         * - `0.####` - (123,456,789) Allow maximum 4 decimal places, but do not right pad with zeroes
         *
         * @param {Number} v The number to format.
         * @param {String} format The way you would like to format this text.
         * @return {String} The formatted number.
         */
        number : function(v, formatString) {
            if (!formatString) {
                return v;
            }
            var formatFn = formatFns[formatString];

            // Generate formatting function to be cached and reused keyed by the format string.
            // This results in a 100% performance increase over analyzing the format string each invocation.
            if (!formatFn) {

                var originalFormatString = formatString,
                    comma = UtilFormat.thousandSeparator,
                    decimalSeparator = UtilFormat.decimalSeparator,
                    hasComma,
                    splitFormat,
                    extraChars,
                    precision = 0,
                    multiplier,
                    trimTrailingZeroes,
                    code;

                // The "/i" suffix allows caller to use a locale-specific formatting string.
                // Clean the format string by removing all but numerals and the decimal separator.
                // Then split the format string into pre and post decimal segments according to *what* the
                // decimal separator is. If they are specifying "/i", they are using the local convention in the format string.
                if (formatString.substr(formatString.length - 2) == '/i') {
                    if (!I18NFormatCleanRe) {
                        I18NFormatCleanRe = new RegExp('[^\\d\\' + UtilFormat.decimalSeparator + ']','g');
                    }
                    formatString = formatString.substr(0, formatString.length - 2);
                    hasComma = formatString.indexOf(comma) != -1;
                    splitFormat = formatString.replace(I18NFormatCleanRe, '').split(decimalSeparator);
                } else {
                    hasComma = formatString.indexOf(',') != -1;
                    splitFormat = formatString.replace(formatCleanRe, '').split('.');
                }
                extraChars = formatString.replace(formatPattern, '');

                if (splitFormat.length > 2) {
                    //<debug>
                    Ext.Error.raise({
                        sourceClass: "Ext.util.Format",
                        sourceMethod: "number",
                        value: v,
                        formatString: formatString,
                        msg: "Invalid number format, should have no more than 1 decimal"
                    });
                    //</debug>
                } else if (splitFormat.length === 2) {
                    precision = splitFormat[1].length;

                    // Formatting ending in .##### means maximum 5 trailing significant digits
                    trimTrailingZeroes = allHashes.test(splitFormat[1]);
                }
                
                // The function we create is called immediately and returns a closure which has access to vars and some fixed values; RegExes and the format string.
                code = [
                    'var utilFormat=Ext.util.Format,extNumber=Ext.Number,neg,fnum,parts' +
                        (hasComma ? ',thousandSeparator,thousands=[],j,n,i' : '') +
                        (extraChars  ? ',formatString="' + formatString + '",formatPattern=/[\\d,\\.#]+/' : '') +
                        (trimTrailingZeroes ? ',trailingZeroes=/\\.?0+$/;' : ';') +
                    'return function(v){' +
                    'if(typeof v!=="number"&&isNaN(v=extNumber.from(v,NaN)))return"";' +
                    'neg=v<0;',
                    'fnum=Ext.Number.toFixed(Math.abs(v), ' + precision + ');'
                ];

                if (hasComma) {
                    // If we have to insert commas...
                    
                    // split the string up into whole and decimal parts if there are decimals
                    if (precision) {
                        code[code.length] = 'parts=fnum.split(".");';
                        code[code.length] = 'fnum=parts[0];';
                    }
                    code[code.length] =
                        'if(v>=1000) {';
                            code[code.length] = 'thousandSeparator=utilFormat.thousandSeparator;' +
                            'thousands.length=0;' +
                            'j=fnum.length;' +
                            'n=fnum.length%3||3;' +
                            'for(i=0;i<j;i+=n){' +
                                'if(i!==0){' +
                                    'n=3;' +
                                '}' +
                                'thousands[thousands.length]=fnum.substr(i,n);' +
                            '}' +
                            'fnum=thousands.join(thousandSeparator);' + 
                        '}';
                    if (precision) {
                        code[code.length] = 'fnum += utilFormat.decimalSeparator+parts[1];';
                    }
                    
                } else if (precision) {
                    // If they are using a weird decimal separator, split and concat using it
                    code[code.length] = 'if(utilFormat.decimalSeparator!=="."){' +
                        'parts=fnum.split(".");' +
                        'fnum=parts[0]+utilFormat.decimalSeparator+parts[1];' +
                    '}';
                }

                if (trimTrailingZeroes) {
                    code[code.length] = 'fnum=fnum.replace(trailingZeroes,"");';
                }

                /*
                 * Edge case. If we have a very small negative number it will get rounded to 0,
                 * however the initial check at the top will still report as negative. Replace
                 * everything but 1-9 and check if the string is empty to determine a 0 value.
                 */
                code[code.length] = 'if(neg&&fnum!=="' + (precision ? '0.' + Ext.String.repeat('0', precision) : '0') + '")fnum="-"+fnum;';

                code[code.length] = 'return ';

                // If there were extra characters around the formatting string, replace the format string part with the formatted number.
                if (extraChars) {
                    code[code.length] = 'formatString.replace(formatPattern, fnum);';
                } else {
                    code[code.length] = 'fnum;';
                }
                code[code.length] = '};'

                formatFn = formatFns[originalFormatString] = Ext.functionFactory('Ext', code.join(''))(Ext);
            }
            return formatFn(v);
        },

        /**
         * Returns a number rendering function that can be reused to apply a number format multiple
         * times efficiently.
         *
         * @param {String} format Any valid number format string for {@link #number}
         * @return {Function} The number formatting function
         */
        numberRenderer : function(format) {
            return function(v) {
                return UtilFormat.number(v, format);
            };
        },

        /**
         * Formats an object of name value properties as HTML element attribute values suitable for using when creating textual markup.
         * @param {Object} attributes An object containing the HTML attributes as properties eg: `{height:40, vAlign:'top'}`
         */
        attributes: function(attributes) {
            if (typeof attributes === 'object') {
                var result = [],
                    name;

                for (name in attributes) {
                    result.push(name, '="', name === 'style' ? Ext.DomHelper.generateStyles(attributes[name]) : Ext.htmlEncode(attributes[name]), '"');
                }
                attributes = result.join('');
            }
            return attributes||'';
        },

        /**
         * Selectively do a plural form of a word based on a numeric value. For example, in a template,
         * `{commentCount:plural("Comment")}`  would result in `"1 Comment"` if commentCount was 1 or
         * would be `"x Comments"` if the value is 0 or greater than 1.
         *
         * @param {Number} value The value to compare against
         * @param {String} singular The singular form of the word
         * @param {String} [plural] The plural form of the word (defaults to the singular with an "s")
         */
        plural : function(v, s, p) {
            return v +' ' + (v == 1 ? s : (p ? p : s+'s'));
        },

        /**
         * Converts newline characters to the HTML tag `<br/>`
         *
         * @param {String} v The string value to format.
         * @return {String} The string with embedded `<br/>` tags in place of newlines.
         */
        nl2br : function(v) {
            return Ext.isEmpty(v) ? '' : v.replace(nl2brRe, '<br/>');
        },

        /**
         * Alias for {@link Ext.String#capitalize}.
         * @method
         * @inheritdoc Ext.String#capitalize
         */
        capitalize: Ext.String.capitalize,

        /**
         * Alias for {@link Ext.String#ellipsis}.
         * @method
         * @inheritdoc Ext.String#ellipsis
         */
        ellipsis: Ext.String.ellipsis,

        /**
         * Alias for {@link Ext.String#format}.
         * @method
         * @inheritdoc Ext.String#format
         */
        format: Ext.String.format,

        /**
         * Alias for {@link Ext.String#htmlDecode}.
         * @method
         * @inheritdoc Ext.String#htmlDecode
         */
        htmlDecode: Ext.String.htmlDecode,

        /**
         * Alias for {@link Ext.String#htmlEncode}.
         * @method
         * @inheritdoc Ext.String#htmlEncode
         */
        htmlEncode: Ext.String.htmlEncode,

        /**
         * Alias for {@link Ext.String#leftPad}.
         * @method
         * @inheritdoc Ext.String#leftPad
         */
        leftPad: Ext.String.leftPad,

        /**
         * Alias for {@link Ext.String#trim}.
         * @method
         * @inheritdoc Ext.String#trim
         */
        trim : Ext.String.trim,

        /**
         * Parses a number or string representing margin sizes into an object.
         * Supports CSS-style margin declarations (e.g. 10, "10", "10 10", "10 10 10" and
         * "10 10 10 10" are all valid options and would return the same result).
         *
         * @param {Number/String} v The encoded margins
         * @return {Object} An object with margin sizes for top, right, bottom and left
         */
        parseBox : function(box) {
            box = box || 0;

            if (typeof box === 'number') {
                return {
                    top   : box,
                    right : box,
                    bottom: box,
                    left  : box
                };
             }

            var parts  = box.split(' '),
                ln = parts.length;

            if (ln == 1) {
                parts[1] = parts[2] = parts[3] = parts[0];
            }
            else if (ln == 2) {
                parts[2] = parts[0];
                parts[3] = parts[1];
            }
            else if (ln == 3) {
                parts[3] = parts[1];
            }

            return {
                top   :parseInt(parts[0], 10) || 0,
                right :parseInt(parts[1], 10) || 0,
                bottom:parseInt(parts[2], 10) || 0,
                left  :parseInt(parts[3], 10) || 0
            };
        },

        /**
         * Escapes the passed string for use in a regular expression.
         * @param {String} str
         * @return {String}
         */
        escapeRegex : function(s) {
            return s.replace(/([\-.*+?\^${}()|\[\]\/\\])/g, "\\$1");
        }
    });
}());
