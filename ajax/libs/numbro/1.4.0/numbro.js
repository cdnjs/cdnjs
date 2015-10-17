/*!
 * numbro.js
 * version : 1.4.0
 * author : Företagsplatsen AB
 * license : MIT
 * http://www.foretagsplatsen.se
 */

(function () {
    'use strict';

    /************************************
        Constants
    ************************************/

    var numbro,
        VERSION = '1.4.0',
        // internal storage for language config files
        languages = {},
        currentLanguage = 'en-US',
        zeroFormat = null,
        defaultFormat = '0,0',
        defaultCurrencyFormat = '0$',
        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports);


    /************************************
        Constructors
    ************************************/


    // Numbro prototype object
    function Numbro(number) {
        this._value = number;
    }

    /**
     * Implementation of toFixed() that treats floats more like decimals
     *
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
     * problems for accounting- and finance-related software.
     */
    function toFixed(value, precision, roundingFunction, optionals) {
        var power = Math.pow(10, precision),
            optionalsRegExp,
            output;

        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
        // Multiply up by precision, round accurately, then divide and use native toFixed():
        output = (roundingFunction(value * power) / power).toFixed(precision);

        if (optionals) {
            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
            output = output.replace(optionalsRegExp, '');
        }

        return output;
    }

    /************************************
        Formatting
    ************************************/

    // determine what type of formatting we need to do
    function formatNumbro(n, format, roundingFunction) {
        var output;

        // figure out what kind of format we are dealing with
        if (format.indexOf('$') > -1) { // currency!!!!!
            output = formatCurrency(n, format, roundingFunction);
        } else if (format.indexOf('%') > -1) { // percentage
            output = formatPercentage(n, format, roundingFunction);
        } else if (format.indexOf(':') > -1) { // time
            output = formatTime(n, format);
        } else { // plain ol' numbers or bytes
            output = formatNumber(n._value, format, roundingFunction);
        }

        // return string
        return output;
    }

    // revert to number
    function unformatNumbro(n, string) {
        var stringOriginal = string,
            thousandRegExp,
            millionRegExp,
            billionRegExp,
            trillionRegExp,
            binarySuffixes = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
            decimalSuffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            bytesMultiplier = false,
            power;

        if (string.indexOf(':') > -1) {
            n._value = unformatTime(string);
        } else {
            if (string === zeroFormat) {
                n._value = 0;
            } else {
                if (languages[currentLanguage].delimiters.decimal !== '.') {
                    string = string.replace(/\./g, '').replace(languages[currentLanguage].delimiters.decimal, '.');
                }

                // see if abbreviations are there so that we can multiply to the correct number
                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand +
                    '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million +
                    '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion +
                    '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion +
                    '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');

                // see if bytes are there so that we can multiply to the correct number
                for (power = 0; power <= binarySuffixes.length && !bytesMultiplier; power++) {
                    if (string.indexOf(binarySuffixes[power]) > -1) {
                        bytesMultiplier = Math.pow(1024, power + 1);
                    } else if (string.indexOf(decimalSuffixes[power]) > -1) {
                        bytesMultiplier = Math.pow(1000, power + 1);
                    }
                }

                // do some math to create our number
                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) *
                    ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) *
                    ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) *
                    ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) *
                    ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) *
                    ((string.indexOf('%') > -1) ? 0.01 : 1) *
                    (((string.split('-').length +
                        Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2) ? 1 : -1) *
                    Number(string.replace(/[^0-9\.]+/g, ''));

                // round if we are talking about bytes
                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
            }
        }
        return n._value;
    }

    function formatCurrency(n, originalFormat, roundingFunction) {
        var format = originalFormat,
            symbolIndex = format.indexOf('$'),
            openParenIndex = format.indexOf('('),
            minusSignIndex = format.indexOf('-'),
            space = '',
            decimalSeparator = '',
            spliceIndex,
            output;


        if(format.indexOf('$') === -1){
            // Use defaults instead of the format provided
            if (languages[currentLanguage].currency.position === 'infix') {
                decimalSeparator = languages[currentLanguage].currency.symbol;
                if (languages[currentLanguage].currency.spaceSeparated) {
                    decimalSeparator = ' ' + decimalSeparator + ' ';
                }
            } else if (languages[currentLanguage].currency.spaceSeparated) {
                space = ' ';
            }
        } else {
            // check for space before or after currency
            if (format.indexOf(' $') > -1) {
                space = ' ';
                format = format.replace(' $', '');
            } else if (format.indexOf('$ ') > -1) {
                space = ' ';
                format = format.replace('$ ', '');
            } else {
                format = format.replace('$', '');
            }
        }

        // Format The Number
        output = formatNumber(n._value, format, roundingFunction, decimalSeparator);

        if (originalFormat.indexOf('$') === -1) {
            // Use defaults instead of the format provided
            switch (languages[currentLanguage].currency.position) {
                case 'postfix':
                    if (output.indexOf(')') > -1) {
                        output = output.split('');
                        output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
                        output = output.join('');
                    } else {
                        output = output + space + languages[currentLanguage].currency.symbol;
                    }
                    break;
                case 'infix':
                    break;
                case 'prefix':
                    if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
                        output = output.split('');
                        spliceIndex = Math.max(openParenIndex, minusSignIndex) + 1;

                        output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
                        output = output.join('');
                    } else {
                        output = languages[currentLanguage].currency.symbol + space + output;
                    }
                    break;
                default:
                    throw Error('Currency position should be among ["prefix", "infix", "postfix"]');
            }
        } else {
            // position the symbol
            if (symbolIndex <= 1) {
                if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
                    output = output.split('');
                    spliceIndex = 1;
                    if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex) {
                        // the symbol appears before the "(" or "-"
                        spliceIndex = 0;
                    }
                    output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
                    output = output.join('');
                } else {
                    output = languages[currentLanguage].currency.symbol + space + output;
                }
            } else {
                if (output.indexOf(')') > -1) {
                    output = output.split('');
                    output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
                    output = output.join('');
                } else {
                    output = output + space + languages[currentLanguage].currency.symbol;
                }
            }
        }

        return output;
    }

    function formatPercentage(n, format, roundingFunction) {
        var space = '',
            output,
            value = n._value * 100;

        // check for space before %
        if (format.indexOf(' %') > -1) {
            space = ' ';
            format = format.replace(' %', '');
        } else {
            format = format.replace('%', '');
        }

        output = formatNumber(value, format, roundingFunction);

        if (output.indexOf(')') > -1) {
            output = output.split('');
            output.splice(-1, 0, space + '%');
            output = output.join('');
        } else {
            output = output + space + '%';
        }

        return output;
    }

    function formatTime(n) {
        var hours = Math.floor(n._value / 60 / 60),
            minutes = Math.floor((n._value - (hours * 60 * 60)) / 60),
            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
        return hours + ':' +
            ((minutes < 10) ? '0' + minutes : minutes) + ':' +
            ((seconds < 10) ? '0' + seconds : seconds);
    }

    function unformatTime(string) {
        var timeArray = string.split(':'),
            seconds = 0;
        // turn hours and minutes into seconds and add them all up
        if (timeArray.length === 3) {
            // hours
            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
            // minutes
            seconds = seconds + (Number(timeArray[1]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[2]);
        } else if (timeArray.length === 2) {
            // minutes
            seconds = seconds + (Number(timeArray[0]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[1]);
        }
        return Number(seconds);
    }

    function formatNumber (value, format, roundingFunction, sep) {
        var negP = false,
            signed = false,
            optDec = false,
            abbr = '',
            i,
            abbrK = false, // force abbreviation to thousands
            abbrM = false, // force abbreviation to millions
            abbrB = false, // force abbreviation to billions
            abbrT = false, // force abbreviation to trillions
            abbrForce = false, // force abbreviation
            bytes = '',
            ord = '',
            abs = Math.abs(value),
            binarySuffixes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
            decimalSuffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            min,
            max,
            power,
            totalLength,
            length,
            minimumPrecision,
            pow,
            w,
            intPrecision,
            precision,
            prefix,
            thousands,
            d = '',
            forcedNeg = false,
            neg = false,
            indexOpenP = -1,
            size,
            indexMinus = -1,
            paren = '';

        // check if number is zero and a custom zero format has been set
        if (value === 0 && zeroFormat !== null) {
            return zeroFormat;
        } else if (!isFinite(value)) {
            return '' + value;
        } else {
            // see if we should use parentheses for negative number or if we should prefix with a sign
            // if both are present we default to parentheses
            if(format.indexOf('-') !== -1){
                forcedNeg = true;
            }
            if (format.indexOf('(') > -1) {
                negP = true;
                format = format.slice(1, -1);
            } else if (format.indexOf('+') > -1) {
                signed = true;
                format = format.replace(/\+/g, '');
            }

            // see if abbreviation is wanted
            if (format.indexOf('a') > -1) {
                intPrecision = format.split('.')[0].match(/[0-9]+/g) || ['0'];
                intPrecision = parseInt(intPrecision[0], 10);

                // check if abbreviation is specified
                abbrK = format.indexOf('aK') >= 0;
                abbrM = format.indexOf('aM') >= 0;
                abbrB = format.indexOf('aB') >= 0;
                abbrT = format.indexOf('aT') >= 0;
                abbrForce = abbrK || abbrM || abbrB || abbrT;

                // check for space before abbreviation
                if (format.indexOf(' a') > -1) {
                    abbr = ' ';
                    format = format.replace(' a', '');
                } else {
                    format = format.replace('a', '');
                }

                totalLength = Math.floor(Math.log(abs) / Math.LN10) + 1;

                minimumPrecision = totalLength % 3;
                minimumPrecision = minimumPrecision === 0 ? 3 : minimumPrecision;

                if(intPrecision) {

                    length = Math.floor(Math.log(abs) / Math.LN10) + 1 - intPrecision;

                    pow = 3 * ~~((Math.min(intPrecision, totalLength) - minimumPrecision) / 3);

                    abs = abs / Math.pow(10, pow);

                    if (format.indexOf('.') === -1 && intPrecision > 3) {
                        format += '[.]';

                        size = length === 0 ? 0 : 3 * ~~(length / 3) - length;
                        size = size < 0 ? size + 3 : size;

                        for (i = 0; i < size; i++) {
                            format += '0';
                        }
                    }
                }

                if (Math.floor(Math.log(Math.abs(value)) / Math.LN10) + 1 !== intPrecision){
                    if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
                        // trillion
                        abbr = abbr + languages[currentLanguage].abbreviations.trillion;
                        value = value / Math.pow(10, 12);
                    } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
                        // billion
                        abbr = abbr + languages[currentLanguage].abbreviations.billion;
                        value = value / Math.pow(10, 9);
                    } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
                        // million
                        abbr = abbr + languages[currentLanguage].abbreviations.million;
                        value = value / Math.pow(10, 6);
                    } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
                        // thousand
                        abbr = abbr + languages[currentLanguage].abbreviations.thousand;
                        value = value / Math.pow(10, 3);
                    }
                }
            }

            // see if we are formatting binary bytes
            if (format.indexOf('b') > -1) {
                // check for space before
                if (format.indexOf(' b') > -1) {
                    bytes = ' ';
                    format = format.replace(' b', '');
                } else {
                    format = format.replace('b', '');
                }

                for (power = 0; power <= binarySuffixes.length; power++) {
                    min = Math.pow(1024, power);
                    max = Math.pow(1024, power + 1);

                    if (value >= min && value < max) {
                        bytes = bytes + binarySuffixes[power];
                        if (min > 0) {
                            value = value / min;
                        }
                        break;
                    }
                }
            }

            // see if we are formatting decimal bytes
            if (format.indexOf('d') > -1) {
                // check for space before
                if (format.indexOf(' d') > -1) {
                    bytes = ' ';
                    format = format.replace(' d', '');
                } else {
                    format = format.replace('d', '');
                }

                for (power = 0; power <= decimalSuffixes.length; power++) {
                    min = Math.pow(1000, power);
                    max = Math.pow(1000, power + 1);

                    if (value >= min && value < max) {
                        bytes = bytes + decimalSuffixes[power];
                        if (min > 0) {
                            value = value / min;
                        }
                        break;
                    }
                }
            }

            // see if ordinal is wanted
            if (format.indexOf('o') > -1) {
                // check for space before
                if (format.indexOf(' o') > -1) {
                    ord = ' ';
                    format = format.replace(' o', '');
                } else {
                    format = format.replace('o', '');
                }

                if (languages[currentLanguage].ordinal){
                    ord = ord + languages[currentLanguage].ordinal(value);
                }
            }

            if (format.indexOf('[.]') > -1) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            w = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');

            if (precision) {
                if (precision.indexOf('[') > -1) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction,
                            precision[1].length);
                } else {
                    d = toFixed(value, precision.length, roundingFunction);
                }

                w = d.split('.')[0];

                if (d.split('.')[1].length) {
                    prefix = sep ? abbr + sep : languages[currentLanguage].delimiters.decimal;
                    d = prefix + d.split('.')[1];
                } else {
                    d = '';
                }

                if (optDec && Number(d.slice(1)) === 0) {
                    d = '';
                }
            } else {
                w = toFixed(value, null, roundingFunction);
            }

            // format number
            if (w.indexOf('-') > -1) {
                w = w.slice(1);
                neg = true;
            }

            if (thousands > -1) {
                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' +
                    languages[currentLanguage].delimiters.thousands);
            }

            if (format.indexOf('.') === 0) {
                w = '';
            }

            indexOpenP = format.indexOf('(');
            indexMinus = format.indexOf('-');

            if(indexOpenP < indexMinus) {
                paren = ((negP && neg) ? '(' : '') + (((forcedNeg && neg) || (!negP && neg)) ? '-' : '');
            } else {
                paren = (((forcedNeg && neg) || (!negP && neg)) ? '-' : '') + ((negP && neg) ? '(' : '');
            }


            return paren + ((!neg && signed) ? '+' : '') +
                w + d +
                ((ord) ? ord : '') +
                ((abbr && !sep) ? abbr : '') +
                ((bytes) ? bytes : '') +
                ((negP && neg) ? ')' : '');
        }
    }

    /************************************
        Top Level Functions
    ************************************/

    numbro = function(input) {
        if (numbro.isNumbro(input)) {
            input = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            input = 0;
        } else if (!Number(input)) {
            input = numbro.fn.unformat(input);
        }

        return new Numbro(Number(input));
    };

    // version number
    numbro.version = VERSION;

    // compare numbro object
    numbro.isNumbro = function(obj) {
        return obj instanceof Numbro;
    };

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    numbro.language = function(key, values) {
        if (!key) {
            return currentLanguage;
        }

        if (key && !values) {
            if (!languages[key]) {
                throw new Error('Unknown language : ' + key);
            }
            currentLanguage = key;
            var defaults = languages[key].defaults;
            if(defaults && defaults.format){
                numbro.defaultFormat(defaults.format);
            }
            if(defaults && defaults.currencyFormat){
                numbro.defaultCurrencyFormat(defaults.currencyFormat);
            }
        }

        if (values || !languages[key]) {
            loadLanguage(key, values);
        }

        return numbro;
    };

    // This function allow the user to set a new language with a fallback if
    // the language does not exist. If no fallback language is provided,
    // it fallbacks to english.
    numbro.setLanguage = function(newLanguage, fallbackLanguage) {
        var key = newLanguage,
            prefix = newLanguage.split('-')[0],
            matchingLanguage = null;
        if (!languages[key]) {
            Object.keys(languages).forEach(function(language) {
                if (!matchingLanguage && language.split('-')[0] === prefix){
                    matchingLanguage = language;
                }
            });
            key = matchingLanguage || fallbackLanguage || 'en-US';
        }
        numbro.language(key);
    };

    // This function provides access to the loaded language data.  If
    // no arguments are passed in, it will simply return the current
    // global language object.
    numbro.languageData = function(key) {
        if (!key) {
            return languages[currentLanguage];
        }

        if (!languages[key]) {
            throw new Error('Unknown language : ' + key);
        }

        return languages[key];
    };

    numbro.language('en-US', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function(number) {
            var b = number % 10;
            return (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$',
            position: 'prefix'
        },
        defaults: {
            currencyFormat: ',0000 a'
        },
        formats: {
            fourDigits: '0000 a',
            fullWithTwoDecimals: '$ ,0.00',
            fullWithTwoDecimalsNoCurrency: ',0.00'
        }
    });

    numbro.languages = function() {
        return languages;
    };

    numbro.zeroFormat = function(format) {
        zeroFormat = typeof(format) === 'string' ? format : null;
    };

    numbro.defaultFormat = function(format) {
        defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };

    numbro.defaultCurrencyFormat = function (format) {
        defaultCurrencyFormat = typeof(format) === 'string' ? format : '0$';
    };

    numbro.validate = function(val, culture) {

        var _decimalSep,
            _thousandSep,
            _currSymbol,
            _valArray,
            _abbrObj,
            _thousandRegEx,
            languageData,
            temp;

        //coerce val to string
        if (typeof val !== 'string') {
            val += '';
            if (console.warn) {
                console.warn('Numbro.js: Value is not string. It has been co-erced to: ', val);
            }
        }

        //trim whitespaces from either sides
        val = val.trim();

        //if val is just digits return true
        if ( !! val.match(/^\d+$/)) {
            return true;
        }

        //if val is empty return false
        if (val === '') {
            return false;
        }

        //get the decimal and thousands separator from numbro.languageData
        try {
            //check if the culture is understood by numbro. if not, default it to current language
            languageData = numbro.languageData(culture);
        } catch (e) {
            languageData = numbro.languageData(numbro.language());
        }

        //setup the delimiters and currency symbol based on culture/language
        _currSymbol = languageData.currency.symbol;
        _abbrObj = languageData.abbreviations;
        _decimalSep = languageData.delimiters.decimal;
        if (languageData.delimiters.thousands === '.') {
            _thousandSep = '\\.';
        } else {
            _thousandSep = languageData.delimiters.thousands;
        }

        // validating currency symbol
        temp = val.match(/^[^\d]+/);
        if (temp !== null) {
            val = val.substr(1);
            if (temp[0] !== _currSymbol) {
                return false;
            }
        }

        //validating abbreviation symbol
        temp = val.match(/[^\d]+$/);
        if (temp !== null) {
            val = val.slice(0, -1);
            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million &&
                    temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
                return false;
            }
        }

        _thousandRegEx = new RegExp(_thousandSep + '{2}');

        if (!val.match(/[^\d.,]/g)) {
            _valArray = val.split(_decimalSep);
            if (_valArray.length > 2) {
                return false;
            } else {
                if (_valArray.length < 2) {
                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
                } else {
                    if (_valArray[0].length === 1) {
                        return ( !! _valArray[0].match(/^\d+$/) &&
                            !_valArray[0].match(_thousandRegEx) &&
                            !! _valArray[1].match(/^\d+$/));
                    } else {
                        return ( !! _valArray[0].match(/^\d+.*\d$/) &&
                            !_valArray[0].match(_thousandRegEx) &&
                            !! _valArray[1].match(/^\d+$/));
                    }
                }
            }
        }

        return false;
    };

    /************************************
        Helpers
    ************************************/

    function loadLanguage(key, values) {
        languages[key] = values;
    }

    /************************************
        Floating-point helpers
    ************************************/

    // The floating-point helper functions and implementation
    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

    /**
     * Array.prototype.reduce for browsers that don't support it
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
     */
    if ('function' !== typeof Array.prototype.reduce) {
        Array.prototype.reduce = function(callback, optInitialValue) {

            if (null === this || 'undefined' === typeof this) {
                // At the moment all modern browsers, that support strict mode, have
                // native implementation of Array.prototype.reduce. For instance, IE8
                // does not support strict mode, so this check is actually useless.
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }

            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }

            var index,
                value,
                length = this.length >>> 0,
                isValueSet = false;

            if (1 < arguments.length) {
                value = optInitialValue;
                isValueSet = true;
            }

            for (index = 0; length > index; ++index) {
                if (this.hasOwnProperty(index)) {
                    if (isValueSet) {
                        value = callback(value, this[index], index, this);
                    } else {
                        value = this[index];
                        isValueSet = true;
                    }
                }
            }

            if (!isValueSet) {
                throw new TypeError('Reduce of empty array with no initial value');
            }

            return value;
        };
    }


    /**
     * Computes the multiplier necessary to make x >= 1,
     * effectively eliminating miscalculations caused by
     * finite precision.
     */
    function multiplier(x) {
        var parts = x.toString().split('.');
        if (parts.length < 2) {
            return 1;
        }
        return Math.pow(10, parts[1].length);
    }

    /**
     * Given a variable number of arguments, returns the maximum
     * multiplier that must be used to normalize an operation involving
     * all of them.
     */
    function correctionFactor() {
        var args = Array.prototype.slice.call(arguments);
        return args.reduce(function(prev, next) {
            var mp = multiplier(prev),
                mn = multiplier(next);
            return mp > mn ? mp : mn;
        }, -Infinity);
    }


    /************************************
        Numbro Prototype
    ************************************/


    numbro.fn = Numbro.prototype = {

        clone: function() {
            return numbro(this);
        },

        format: function(inputString, roundingFunction) {
            return formatNumbro(this,
                inputString ? inputString : defaultFormat,
                (roundingFunction !== undefined) ? roundingFunction : Math.round
            );
        },

        formatCurrency: function(inputString, roundingFunction) {
            return formatCurrency(this,
                inputString ? inputString : defaultCurrencyFormat,
                (roundingFunction !== undefined) ? roundingFunction : Math.round
            );
        },

        unformat: function(inputString) {
            if (Object.prototype.toString.call(inputString) === '[object Number]') {
                return inputString;
            }
            return unformatNumbro(this, inputString ? inputString : defaultFormat);
        },

        value: function() {
            return this._value;
        },

        valueOf: function() {
            return this._value;
        },

        set: function(value) {
            this._value = Number(value);
            return this;
        },

        add: function(value) {
            var corrFactor = correctionFactor.call(null, this._value, value);

            function cback(accum, curr) {
                return accum + corrFactor * curr;
            }
            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
            return this;
        },

        subtract: function(value) {
            var corrFactor = correctionFactor.call(null, this._value, value);

            function cback(accum, curr) {
                return accum - corrFactor * curr;
            }
            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;
            return this;
        },

        multiply: function(value) {
            function cback(accum, curr) {
                var corrFactor = correctionFactor(accum, curr),
                    result = accum * corrFactor;
                result *= curr * corrFactor;
                result /= corrFactor * corrFactor;
                return result;
            }
            this._value = [this._value, value].reduce(cback, 1);
            return this;
        },

        divide: function(value) {
            function cback(accum, curr) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) / (curr * corrFactor);
            }
            this._value = [this._value, value].reduce(cback);
            return this;
        },

        difference: function(value) {
            return Math.abs(numbro(this._value).subtract(value).value());
        }

    };

    /************************************
        Exposing Numbro
    ************************************/

    // CommonJS module is defined
    if (hasModule) {
        module.exports = numbro;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numbro` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this.numbro = numbro;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return numbro;
        });
    }
}.call(typeof window === 'undefined' ? this : window));
